import {mkdtempSync, readFileSync, statSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {
  Secret,
  defaultConfigFile,
  listProfiles,
  resolve,
  saveToFile,
} from '../../src/profiles';
import type {Profile, ProfileErrorCode} from '../../src/profiles';

const TEST_DIR = dirname(fileURLToPath(import.meta.url));
const TESTDATA = join(TEST_DIR, 'testdata');
const CFG = join(TESTDATA, 'databrickscfg');
const CFG_NO_DEFAULT = join(TESTDATA, 'databrickscfg_no_default');
const CFG_SETTINGS = join(TESTDATA, 'databrickscfg_settings');
const CFG_SETTINGS_EMPTY = join(TESTDATA, 'databrickscfg_settings_empty');
const CFG_SETTINGS_NONEXISTENT = join(
  TESTDATA,
  'databrickscfg_settings_nonexistent'
);
const CFG_SETTINGS_SELF_REF = join(TESTDATA, 'databrickscfg_settings_self_ref');

/** Environment variables that affect profile resolution. */
const PROFILE_ENV_VARS = [
  'DATABRICKS_HOST',
  'DATABRICKS_WORKSPACE_ID',
  'DATABRICKS_ACCOUNT_ID',
  'DATABRICKS_TOKEN',
  'DATABRICKS_USERNAME',
  'DATABRICKS_PASSWORD',
  'DATABRICKS_AUTH_TYPE',
  'DATABRICKS_CLIENT_ID',
  'DATABRICKS_CLIENT_SECRET',
  'DATABRICKS_CLI_PATH',
  'DATABRICKS_METADATA_SERVICE_URL',
  'ACTIONS_ID_TOKEN_REQUEST_URL',
  'ACTIONS_ID_TOKEN_REQUEST_TOKEN',
  'DATABRICKS_OIDC_TOKEN_ENV',
  'DATABRICKS_OIDC_TOKEN_FILEPATH',
  'DATABRICKS_TOKEN_AUDIENCE',
  'DATABRICKS_DISCOVERY_URL',
  'ARM_CLIENT_ID',
  'ARM_CLIENT_SECRET',
  'ARM_TENANT_ID',
  'DATABRICKS_AZURE_RESOURCE_ID',
  'ARM_ENVIRONMENT',
  'DATABRICKS_AZURE_LOGIN_APP_ID',
  'ARM_USE_MSI',
  'GOOGLE_CREDENTIALS',
  'DATABRICKS_GOOGLE_SERVICE_ACCOUNT',
  'DATABRICKS_CLUSTER_ID',
  'DATABRICKS_WAREHOUSE_ID',
  'DATABRICKS_SERVERLESS_COMPUTE_ID',
];

/** Clears all environment variables that could affect profile resolution. */
function resetEnv(): void {
  vi.stubEnv('HOME', mkdtempSync(join(tmpdir(), 'profiles-test-')));
  vi.stubEnv('DATABRICKS_CONFIG_FILE', '');
  vi.stubEnv('DATABRICKS_CONFIG_PROFILE', '');
  for (const name of PROFILE_ENV_VARS) {
    vi.stubEnv(name, '');
  }
}

describe('resolve', () => {
  beforeEach(() => {
    resetEnv();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const resolveCases: {
    name: string;
    options?: Parameters<typeof resolve>[0];
    env?: Record<string, string>;
    want: Profile;
    wantErr?: ProfileErrorCode;
  }[] = [
    {
      name: 'file and profile',
      options: {filePath: CFG, profile: 'workspace'},
      want: {
        name: 'workspace',
        host: 'https://workspace.cloud.databricks.com',
        token: new Secret('workspace-token'),
        accountId: 'acc-123',
        clientId: 'client-abc',
        clientSecret: new Secret('secret-xyz'),
        clusterId: '0123-456789-abcdef',
        warehouseId: 'abc123def456',
      },
    },
    {
      name: 'default section',
      options: {filePath: CFG},
      want: {
        name: 'DEFAULT',
        host: 'https://default.cloud.databricks.com',
        token: new Secret('default-token'),
      },
    },
    {
      name: 'missing explicit file',
      options: {
        filePath: join(TESTDATA, 'nonexistent'),
      },
      want: {},
      wantErr: 'CONFIG_FILE_NOT_FOUND',
    },
    {
      name: 'missing env config file',
      env: {DATABRICKS_CONFIG_FILE: join(TESTDATA, 'nonexistent')},
      want: {},
      wantErr: 'CONFIG_FILE_NOT_FOUND',
    },
    {
      name: 'missing default file is silently skipped',
      env: {DATABRICKS_HOST: 'https://env.cloud.databricks.com'},
      want: {host: 'https://env.cloud.databricks.com'},
    },
    {
      name: 'missing explicit profile',
      options: {filePath: CFG, profile: 'nonexistent'},
      want: {},
      wantErr: 'PROFILE_NOT_FOUND',
    },
    {
      name: 'missing default section',
      options: {filePath: CFG_NO_DEFAULT},
      want: {},
    },
    {
      name: 'hash in values',
      options: {filePath: CFG, profile: 'hash-in-value'},
      want: {
        name: 'hash-in-value',
        host: 'https://hash.cloud.databricks.com',
        token: new Secret('abc#def#ghi'),
        clientSecret: new Secret('secret#with#hashes'),
      },
    },
    {
      name: 'azure',
      options: {filePath: CFG, profile: 'azure'},
      want: {
        name: 'azure',
        host: 'https://adb-123.azuredatabricks.net',
        azureClientId: 'az-client-id',
        azureClientSecret: new Secret('az-client-secret'),
        azureTenantId: 'az-tenant-id',
        azureResourceId:
          '/subscriptions/sub-id/resourceGroups/rg/providers/Microsoft.Databricks/workspaces/ws',
      },
    },
    {
      name: 'empty section',
      options: {filePath: CFG, profile: 'empty'},
      want: {name: 'empty'},
    },
    {
      name: 'env only',
      options: {withEnv: true},
      env: {
        DATABRICKS_HOST: 'https://env.cloud.databricks.com',
        DATABRICKS_TOKEN: 'env-token',
        DATABRICKS_CLIENT_ID: 'env-client-id',
      },
      want: {
        host: 'https://env.cloud.databricks.com',
        token: new Secret('env-token'),
        clientId: 'env-client-id',
      },
    },
    {
      name: 'file only without env overlay',
      options: {filePath: CFG},
      env: {
        DATABRICKS_HOST: 'https://should-be-ignored.cloud.databricks.com',
      },
      want: {
        name: 'DEFAULT',
        host: 'https://default.cloud.databricks.com',
        token: new Secret('default-token'),
      },
    },
    {
      name: 'env overrides file',
      options: {filePath: CFG, profile: 'workspace', withEnv: true},
      env: {
        DATABRICKS_HOST: 'https://env-override.cloud.databricks.com',
        DATABRICKS_TOKEN: 'env-override-token',
      },
      want: {
        name: 'workspace',
        host: 'https://env-override.cloud.databricks.com',
        token: new Secret('env-override-token'),
        accountId: 'acc-123',
        clientId: 'client-abc',
        clientSecret: new Secret('secret-xyz'),
        clusterId: '0123-456789-abcdef',
        warehouseId: 'abc123def456',
      },
    },
    {
      name: 'no options uses defaults',
      env: {
        DATABRICKS_CONFIG_FILE: CFG,
        DATABRICKS_CONFIG_PROFILE: 'workspace',
      },
      want: {
        name: 'workspace',
        host: 'https://workspace.cloud.databricks.com',
        token: new Secret('workspace-token'),
        accountId: 'acc-123',
        clientId: 'client-abc',
        clientSecret: new Secret('secret-xyz'),
        clusterId: '0123-456789-abcdef',
        warehouseId: 'abc123def456',
      },
    },
    {
      name: 'no options with env override',
      env: {
        DATABRICKS_CONFIG_FILE: CFG,
        DATABRICKS_CONFIG_PROFILE: 'workspace',
        DATABRICKS_HOST: 'https://override.cloud.databricks.com',
      },
      want: {
        name: 'workspace',
        host: 'https://override.cloud.databricks.com',
        token: new Secret('workspace-token'),
        accountId: 'acc-123',
        clientId: 'client-abc',
        clientSecret: new Secret('secret-xyz'),
        clusterId: '0123-456789-abcdef',
        warehouseId: 'abc123def456',
      },
    },
    {
      name: 'env ignored without withEnv',
      options: {filePath: CFG, profile: 'workspace'},
      env: {
        DATABRICKS_HOST: 'https://should-be-ignored.cloud.databricks.com',
      },
      want: {
        name: 'workspace',
        host: 'https://workspace.cloud.databricks.com',
        token: new Secret('workspace-token'),
        accountId: 'acc-123',
        clientId: 'client-abc',
        clientSecret: new Secret('secret-xyz'),
        clusterId: '0123-456789-abcdef',
        warehouseId: 'abc123def456',
      },
    },
    {
      name: 'extra keys',
      options: {filePath: CFG, profile: 'extra-keys'},
      want: {
        name: 'extra-keys',
        host: 'https://extra.cloud.databricks.com',
        extra: {
          custom_key: 'custom-value',
          another_key: 'another-value',
        },
      },
    },
    {
      name: 'empty filePath is an error',
      options: {filePath: ''},
      want: {},
      wantErr: 'EMPTY_PATH',
    },
    {
      name: 'empty profile is an error',
      options: {profile: ''},
      want: {},
      wantErr: 'EMPTY_PROFILE',
    },
    {
      name: 'settings default_profile resolves',
      options: {filePath: CFG_SETTINGS},
      want: {
        name: 'my-workspace',
        host: 'https://my-workspace.cloud.databricks.com',
        token: new Secret('my-workspace-token'),
      },
    },
    {
      name: 'settings empty default_profile falls back to DEFAULT',
      options: {filePath: CFG_SETTINGS_EMPTY},
      want: {
        name: 'DEFAULT',
        host: 'https://default.cloud.databricks.com',
        token: new Secret('default-token'),
      },
    },
    {
      name: 'explicit profile overrides settings default_profile',
      options: {filePath: CFG_SETTINGS, profile: 'DEFAULT'},
      want: {
        name: 'DEFAULT',
        host: 'https://default.cloud.databricks.com',
        token: new Secret('default-token'),
      },
    },
    {
      name: 'env profile overrides settings default_profile',
      options: {filePath: CFG_SETTINGS},
      env: {DATABRICKS_CONFIG_PROFILE: 'DEFAULT'},
      want: {
        name: 'DEFAULT',
        host: 'https://default.cloud.databricks.com',
        token: new Secret('default-token'),
      },
    },
    {
      name: 'settings self-reference is rejected',
      options: {filePath: CFG_SETTINGS_SELF_REF},
      want: {},
      wantErr: 'INVALID_PROFILE_NAME',
    },
    {
      name: 'settings nonexistent profile is rejected',
      options: {filePath: CFG_SETTINGS_NONEXISTENT},
      want: {},
      wantErr: 'PROFILE_NOT_FOUND',
    },
    {
      name: 'explicit __settings__ profile is rejected',
      options: {
        filePath: CFG_SETTINGS,
        profile: '__settings__',
      },
      want: {},
      wantErr: 'INVALID_PROFILE_NAME',
    },
  ];

  it.each(resolveCases)('$name', async ({options, env, want, wantErr}) => {
    if (env) {
      for (const [key, value] of Object.entries(env)) {
        vi.stubEnv(key, value);
      }
    }

    if (wantErr !== undefined) {
      await expect(resolve(options)).rejects.toMatchObject({
        code: wantErr,
      });
    } else {
      const got = await resolve(options);
      expectProfileEqual(got, want);
    }
  });
});

describe('listProfiles', () => {
  const cases: {
    name: string;
    path: string;
    want?: string[];
    wantErr?: ProfileErrorCode;
  }[] = [
    {
      name: 'all profiles',
      path: CFG,
      want: [
        'DEFAULT',
        'workspace',
        'azure',
        'hash-in-value',
        'extra-keys',
        'empty',
      ],
    },
    {
      name: 'no default',
      path: CFG_NO_DEFAULT,
      want: ['workspace'],
    },
    {
      name: 'settings section excluded',
      path: CFG_SETTINGS,
      want: ['DEFAULT', 'my-workspace'],
    },
    {
      name: 'missing file',
      path: join(TESTDATA, 'nonexistent'),
      wantErr: 'CONFIG_FILE_NOT_FOUND',
    },
    {
      name: 'empty path',
      path: '',
      wantErr: 'CONFIG_FILE_NOT_FOUND',
    },
  ];

  it.each(cases)('$name', async ({path, want, wantErr}) => {
    if (wantErr !== undefined) {
      await expect(listProfiles(path)).rejects.toMatchObject({
        code: wantErr,
      });
    } else {
      const result = await listProfiles(path);
      expect(result).toEqual(want);
    }
  });
});

describe('defaultConfigFile', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return env value when DATABRICKS_CONFIG_FILE is set', () => {
    vi.stubEnv('DATABRICKS_CONFIG_FILE', '/custom/path/databrickscfg');

    expect(defaultConfigFile()).toBe('/custom/path/databrickscfg');
  });

  it('should fall back to ~/.databrickscfg', () => {
    vi.stubEnv('DATABRICKS_CONFIG_FILE', '');

    const result = defaultConfigFile();

    expect(result).toMatch(/\.databrickscfg$/);
    expect(result.length).toBeGreaterThan('.databrickscfg'.length);
  });
});

describe('saveToFile', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'profiles-save-'));
  });

  const saveCases: {
    desc: string;
    existing?: string;
    profile: Profile;
    want?: string;
    wantErr?: ProfileErrorCode;
  }[] = [
    {
      desc: 'known fields are written to the ini file',
      profile: {
        name: 'test',
        host: 'https://saved.cloud.databricks.com',
        token: new Secret('saved-token'),
        clientId: 'saved-client-id',
      },
      want: [
        '[test]',
        'host      = https://saved.cloud.databricks.com',
        'token     = saved-token',
        'client_id = saved-client-id',
        '',
      ].join('\n'),
    },
    {
      desc: 'extra keys are written to the ini file',
      profile: {
        name: 'test',
        host: 'https://extra.cloud.databricks.com',
        extra: {
          custom_key: 'custom-value',
          another_key: 'another-value',
        },
      },
      want: [
        '[test]',
        'host        = https://extra.cloud.databricks.com',
        'another_key = another-value',
        'custom_key  = custom-value',
        '',
      ].join('\n'),
    },
    {
      desc: 'extra keys that collide with known fields are skipped',
      profile: {
        name: 'test',
        host: 'https://real.cloud.databricks.com',
        extra: {host: 'https://evil.cloud.databricks.com'},
      },
      want: ['[test]', 'host = https://real.cloud.databricks.com', ''].join(
        '\n'
      ),
    },
    {
      desc: 'empty fields are omitted',
      profile: {
        name: 'my-profile',
        host: 'https://host.cloud.databricks.com',
      },
      want: [
        '[my-profile]',
        'host = https://host.cloud.databricks.com',
        '',
      ].join('\n'),
    },
    {
      desc: 'other sections in the file are preserved',
      existing: [
        '[other]',
        'host  = https://other.cloud.databricks.com',
        'token = other-token',
        '',
      ].join('\n'),
      profile: {
        name: 'new',
        host: 'https://new.cloud.databricks.com',
      },
      want: [
        '[other]',
        'host  = https://other.cloud.databricks.com',
        'token = other-token',
        '',
        '[new]',
        'host = https://new.cloud.databricks.com',
        '',
      ].join('\n'),
    },
    {
      desc: 'existing section is replaced entirely',
      existing: [
        '[test]',
        'host  = https://old.cloud.databricks.com',
        'token = old-token',
        '',
      ].join('\n'),
      profile: {
        name: 'test',
        host: 'https://new.cloud.databricks.com',
      },
      want: ['[test]', 'host = https://new.cloud.databricks.com', ''].join(
        '\n'
      ),
    },
    {
      desc: 'empty name returns an error',
      profile: {host: 'https://test.cloud.databricks.com'},
      wantErr: 'EMPTY_PROFILE',
    },
  ];

  it.each(saveCases)('$desc', async ({existing, profile, want, wantErr}) => {
    const path = join(tempDir, 'databrickscfg');
    if (existing !== undefined) {
      writeFileSync(path, existing, {mode: 0o600});
    }

    if (wantErr !== undefined) {
      await expect(saveToFile(profile, path)).rejects.toMatchObject({
        code: wantErr,
      });
    } else {
      await saveToFile(profile, path);
      const got = readFileSync(path, 'utf8');
      expect(got).toBe(want);
    }
  });

  it('should create file with 0600 permissions', async () => {
    const path = join(tempDir, 'new-databrickscfg');
    const profile: Profile = {name: 'test', token: new Secret('secret')};

    await saveToFile(profile, path);

    const info = statSync(path);
    // eslint-disable-next-line no-bitwise
    expect(info.mode & 0o777).toBe(0o600);
  });

  it('should throw ProfileError for empty path', async () => {
    const profile: Profile = {
      name: 'my-profile',
      host: 'https://test.cloud.databricks.com',
    };

    await expect(saveToFile(profile, '')).rejects.toMatchObject({
      code: 'EMPTY_PATH',
    });
  });

  it('should round-trip through resolve and saveToFile', async () => {
    resetEnv();

    const original = await resolve({
      filePath: CFG,
      profile: 'workspace',
    });

    const path = join(tempDir, 'round-trip-cfg');
    await saveToFile(original, path);

    const reloaded = await resolve({
      filePath: path,
      profile: 'workspace',
    });

    expectProfileEqual(reloaded, original);

    vi.unstubAllEnvs();
  });

  it('should reject __settings__ as profile name', async () => {
    const profile: Profile = {
      name: '__settings__',
      host: 'https://test.cloud.databricks.com',
    };

    await expect(
      saveToFile(profile, join(tempDir, 'databrickscfg'))
    ).rejects.toMatchObject({code: 'INVALID_PROFILE_NAME'});
  });
});

/**
 * Verifies that every property in the mapping table round-trips correctly
 * through INI file loading and env var loading. This catches copy-paste bugs
 * in the property definitions.
 */
describe('allProperties round-trip', () => {
  beforeEach(() => {
    resetEnv();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should round-trip all properties through INI file', async () => {
    // Build an INI file with every known key set to a unique value.
    const lines = ['[all-fields]'];
    for (let i = 0; i < PROFILE_ENV_VARS.length; i++) {
      // The azure_use_msi field requires a valid boolean value.
      const val = INI_KEYS[i] === 'azure_use_msi' ? 'true' : 'f'.repeat(i + 1);
      lines.push(`${INI_KEYS[i]} = ${val}`);
    }
    const dir = mkdtempSync(join(tmpdir(), 'profiles-allprops-'));
    const cfgPath = join(dir, 'databrickscfg');
    writeFileSync(cfgPath, lines.join('\n') + '\n', {mode: 0o600});

    const profile = await resolve({
      filePath: cfgPath,
      profile: 'all-fields',
    });

    for (let i = 0; i < INI_KEYS.length; i++) {
      const want = INI_KEYS[i] === 'azure_use_msi' ? 'true' : 'f'.repeat(i + 1);
      const field = PROFILE_FIELDS[i];
      const raw = profile[field];
      const got =
        raw instanceof Secret
          ? raw.value
          : typeof raw === 'boolean'
            ? String(raw)
            : typeof raw === 'string'
              ? raw
              : '';
      expect(got, `file: field=${field} iniKey=${INI_KEYS[i]}`).toBe(want);
    }
  });

  it('should round-trip all properties through env vars', async () => {
    for (let i = 0; i < PROFILE_ENV_VARS.length; i++) {
      // The ARM_USE_MSI env var requires a valid boolean value.
      const val =
        PROFILE_ENV_VARS[i] === 'ARM_USE_MSI' ? 'true' : 'e'.repeat(i + 1);
      vi.stubEnv(PROFILE_ENV_VARS[i], val);
    }
    // Use an empty config file so only env values are used.
    const dir = mkdtempSync(join(tmpdir(), 'profiles-allprops-'));
    const cfgPath = join(dir, 'databrickscfg');
    writeFileSync(cfgPath, '[DEFAULT]\n', {mode: 0o600});

    const profile = await resolve({filePath: cfgPath, withEnv: true});

    for (let i = 0; i < PROFILE_ENV_VARS.length; i++) {
      const want =
        PROFILE_ENV_VARS[i] === 'ARM_USE_MSI' ? 'true' : 'e'.repeat(i + 1);
      const field = PROFILE_FIELDS[i];
      const raw = profile[field];
      const got =
        raw instanceof Secret
          ? raw.value
          : typeof raw === 'boolean'
            ? String(raw)
            : typeof raw === 'string'
              ? raw
              : '';
      expect(got, `env: field=${field} envVar=${PROFILE_ENV_VARS[i]}`).toBe(
        want
      );
    }
  });
});

/**
 * INI key names for all 29 properties, in the same order as PROFILE_ENV_VARS
 * and PROFILE_FIELDS.
 */
const INI_KEYS = [
  'host',
  'workspace_id',
  'account_id',
  'token',
  'username',
  'password',
  'auth_type',
  'client_id',
  'client_secret',
  'databricks_cli_path',
  'metadata_service_url',
  'actions_id_token_request_url',
  'actions_id_token_request_token',
  'oidc_token_env',
  'databricks_id_token_filepath',
  'audience',
  'discovery_url',
  'azure_client_id',
  'azure_client_secret',
  'azure_tenant_id',
  'azure_workspace_resource_id',
  'azure_environment',
  'azure_login_app_id',
  'azure_use_msi',
  'google_credentials',
  'google_service_account',
  'cluster_id',
  'warehouse_id',
  'serverless_compute_id',
];

/** Profile field names corresponding to each property, same order. */
const PROFILE_FIELDS: (keyof Profile)[] = [
  'host',
  'workspaceId',
  'accountId',
  'token',
  'username',
  'password',
  'authType',
  'clientId',
  'clientSecret',
  'databricksCliPath',
  'metadataServiceUrl',
  'actionsIdTokenRequestUrl',
  'actionsIdTokenRequestToken',
  'oidcTokenEnv',
  'oidcTokenFilePath',
  'tokenAudience',
  'discoveryUrl',
  'azureClientId',
  'azureClientSecret',
  'azureTenantId',
  'azureResourceId',
  'azureEnvironment',
  'azureLoginAppId',
  'azureUseMsi',
  'googleCredentials',
  'googleServiceAccount',
  'clusterId',
  'warehouseId',
  'serverlessComputeId',
];

/**
 * Asserts that two profiles are deeply equal, comparing Secret values by
 * their underlying value rather than by reference identity.
 */
function expectProfileEqual(got: Profile, want: Profile): void {
  const normalize = (p: Profile): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(p)) {
      if (value instanceof Secret) {
        result[key] = value.value;
      } else {
        result[key] = value;
      }
    }
    return result;
  };
  expect(normalize(got)).toEqual(normalize(want));
}
