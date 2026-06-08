import {mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {
  Secret,
  defaultConfigFile,
  listProfiles,
  resolve,
} from '../../src/profiles';
import type {Profile, ProfileErrorCode} from '../../src/profiles';
import {PROPERTY_DEFS} from '../../src/profiles/profile';

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

/** Clears all environment variables that could affect profile resolution. */
function resetEnv(): void {
  vi.stubEnv('HOME', mkdtempSync(join(tmpdir(), 'profiles-test-')));
  vi.stubEnv('DATABRICKS_CONFIG_FILE', '');
  vi.stubEnv('DATABRICKS_CONFIG_PROFILE', '');
  for (const {envVar: name} of PROPERTY_DEFS) {
    vi.stubEnv(name, '');
  }
}

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
      options: {configFile: CFG, profile: 'workspace'},
      want: {
        name: 'workspace',
        host: 'https://workspace.cloud.databricks.com',
        token: new Secret('workspace-token'),
        accountId: 'acc-123',
        clientId: 'client-abc',
        clientSecret: new Secret('secret-xyz'),
      },
    },
    {
      name: 'default section',
      options: {configFile: CFG},
      want: {
        name: 'DEFAULT',
        host: 'https://default.cloud.databricks.com',
        token: new Secret('default-token'),
      },
    },
    {
      name: 'missing explicit file',
      options: {configFile: join(TESTDATA, 'nonexistent')},
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
      options: {configFile: CFG, profile: 'nonexistent'},
      want: {},
      wantErr: 'PROFILE_NOT_FOUND',
    },
    {
      name: 'missing default section',
      options: {configFile: CFG_NO_DEFAULT},
      want: {},
    },
    {
      name: 'hash in values',
      options: {configFile: CFG, profile: 'hash-in-value'},
      want: {
        name: 'hash-in-value',
        host: 'https://hash.cloud.databricks.com',
        token: new Secret('abc#def#ghi'),
        clientSecret: new Secret('secret#with#hashes'),
      },
    },
    {
      name: 'empty section',
      options: {configFile: CFG, profile: 'empty'},
      want: {name: 'empty'},
    },
    {
      name: 'env only via noProfile',
      options: {noProfile: true},
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
      name: 'noProfile skips an existing config file',
      options: {noProfile: true},
      env: {
        DATABRICKS_CONFIG_FILE: CFG,
        DATABRICKS_HOST: 'https://env.cloud.databricks.com',
      },
      want: {host: 'https://env.cloud.databricks.com'},
    },
    {
      name: 'file only via disableEnv',
      options: {configFile: CFG, disableEnv: true},
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
      name: 'noProfile and disableEnv resolve nothing',
      options: {noProfile: true, disableEnv: true},
      env: {DATABRICKS_HOST: 'https://ignored.cloud.databricks.com'},
      want: {},
    },
    {
      name: 'noProfile with profile is rejected',
      options: {noProfile: true, profile: 'workspace'},
      want: {},
      wantErr: 'CONFLICTING_OPTIONS',
    },
    {
      name: 'noProfile with configFile is rejected',
      options: {noProfile: true, configFile: CFG},
      want: {},
      wantErr: 'CONFLICTING_OPTIONS',
    },
    {
      name: 'explicit profile overlays env by default',
      options: {configFile: CFG, profile: 'workspace'},
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
      },
    },
    {
      name: 'no options uses defaults (file + env)',
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
      },
    },
    {
      name: 'extra keys',
      options: {configFile: CFG, profile: 'extra-keys'},
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
      name: 'empty configFile is an error',
      options: {configFile: ''},
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
      options: {configFile: CFG_SETTINGS},
      want: {
        name: 'my-workspace',
        host: 'https://my-workspace.cloud.databricks.com',
        token: new Secret('my-workspace-token'),
      },
    },
    {
      name: 'settings empty default_profile falls back to DEFAULT',
      options: {configFile: CFG_SETTINGS_EMPTY},
      want: {
        name: 'DEFAULT',
        host: 'https://default.cloud.databricks.com',
        token: new Secret('default-token'),
      },
    },
    {
      name: 'explicit profile overrides settings default_profile',
      options: {configFile: CFG_SETTINGS, profile: 'DEFAULT'},
      want: {
        name: 'DEFAULT',
        host: 'https://default.cloud.databricks.com',
        token: new Secret('default-token'),
      },
    },
    {
      name: 'env profile overrides settings default_profile',
      options: {configFile: CFG_SETTINGS},
      env: {DATABRICKS_CONFIG_PROFILE: 'DEFAULT'},
      want: {
        name: 'DEFAULT',
        host: 'https://default.cloud.databricks.com',
        token: new Secret('default-token'),
      },
    },
    {
      name: 'settings self-reference is rejected',
      options: {configFile: CFG_SETTINGS_SELF_REF},
      want: {},
      wantErr: 'INVALID_PROFILE_NAME',
    },
    {
      name: 'settings nonexistent profile is rejected',
      options: {configFile: CFG_SETTINGS_NONEXISTENT},
      want: {},
      wantErr: 'PROFILE_NOT_FOUND',
    },
    {
      name: 'explicit __settings__ profile is rejected',
      options: {configFile: CFG_SETTINGS, profile: '__settings__'},
      want: {},
      wantErr: 'INVALID_PROFILE_NAME',
    },
  ];

  it.each(resolveCases)('$name', async ({options, env, want, wantErr}) => {
    if (env !== undefined) {
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
      want: ['DEFAULT', 'workspace', 'hash-in-value', 'extra-keys', 'empty'],
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
