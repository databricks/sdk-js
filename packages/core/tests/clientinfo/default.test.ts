import {describe, it, expect, beforeEach} from 'vitest';
import {
  ClientInfoError,
  addToDefault,
  createDefault,
  setPartner,
  setProduct,
} from '../../src/clientinfo';
import type {ClientInfoErrorCode} from '../../src/clientinfo';
import {
  MODULE_NAME,
  VERSION,
  resetBase,
  baseToString,
} from '../../src/clientinfo/base';
import type {LookupEnv} from '../../src/clientinfo/default';
import {
  CACHED_NODE_VERSION,
  defaultWithEnv,
  normalizeNodeVersion,
} from '../../src/clientinfo/default';

// Returns a LookupEnv backed by a map. Keys not in the map are
// treated as unset.
function mockEnv(env: Record<string, string>): LookupEnv {
  return (key: string): string | undefined => env[key];
}

describe('createDefault', () => {
  beforeEach(() => {
    resetBase();
  });

  it('reads from process.env', () => {
    const key1 = 'DATABRICKS_SDK_UPSTREAM';
    const key2 = 'DATABRICKS_SDK_UPSTREAM_VERSION';
    const orig1 = process.env[key1];
    const orig2 = process.env[key2];
    process.env[key1] = 'test-foo';
    process.env[key2] = '42.13.37';
    try {
      const got = createDefault().toString();
      expect(got).toContain('upstream/test-foo upstream-version/42.13.37');
    } finally {
      if (orig1 === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete process.env[key1];
      } else {
        process.env[key1] = orig1;
      }
      if (orig2 === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete process.env[key2];
      } else {
        process.env[key2] = orig2;
      }
    }
  });
});

describe('defaultWithEnv', () => {
  beforeEach(() => {
    resetBase();
  });

  const prefix = `${MODULE_NAME}/${VERSION} node/${CACHED_NODE_VERSION} os/${process.platform}`;

  const testCases: {
    name: string;
    env: Record<string, string>;
    want: string;
  }[] = [
    {
      name: 'base segments only',
      env: {},
      want: prefix,
    },
    {
      name: 'github actions',
      env: {GITHUB_ACTIONS: 'true'},
      want: `${prefix} cicd/github`,
    },
    {
      name: 'gitlab ci',
      env: {GITLAB_CI: 'true'},
      want: `${prefix} cicd/gitlab`,
    },
    {
      name: 'google cloud build requires all four vars',
      env: {
        PROJECT_ID: 'my-project',
        BUILD_ID: '123',
        PROJECT_NUMBER: '456',
        LOCATION: 'us-central1',
      },
      want: `${prefix} cicd/google-cloud-build`,
    },
    {
      name: 'single agent',
      env: {CLAUDECODE: '1'},
      want: `${prefix} agent/claude-code`,
    },
    {
      name: 'multiple agents omitted',
      env: {CLAUDECODE: '1', CURSOR_AGENT: '1'},
      want: prefix,
    },
    {
      name: 'databricks runtime',
      env: {DATABRICKS_RUNTIME_VERSION: '15.5'},
      want: `${prefix} runtime/15.5`,
    },
    {
      name: 'databricks runtime sanitized',
      env: {DATABRICKS_RUNTIME_VERSION: '15.5 beta/2'},
      want: `${prefix} runtime/15.5-beta-2`,
    },
    {
      name: 'upstream both vars',
      env: {
        DATABRICKS_SDK_UPSTREAM: 'terraform',
        DATABRICKS_SDK_UPSTREAM_VERSION: '1.5.0',
      },
      want: `${prefix} upstream/terraform upstream-version/1.5.0`,
    },
    {
      name: 'upstream omitted when only product set',
      env: {DATABRICKS_SDK_UPSTREAM: 'terraform'},
      want: prefix,
    },
    {
      name: 'empty runtime ignored',
      env: {DATABRICKS_RUNTIME_VERSION: ''},
      want: prefix,
    },
    {
      name: 'all env detection combined',
      env: {
        DATABRICKS_SDK_UPSTREAM: 'terraform',
        DATABRICKS_SDK_UPSTREAM_VERSION: '1.5.0',
        GITHUB_ACTIONS: 'true',
        DATABRICKS_RUNTIME_VERSION: '15.5',
        CLAUDECODE: '1',
      },
      want: `${prefix} upstream/terraform upstream-version/1.5.0 cicd/github runtime/15.5 agent/claude-code`,
    },
  ];

  it.each(testCases)('$name', ({env, want}) => {
    expect(defaultWithEnv(mockEnv(env)).toString()).toBe(want);
  });
});

describe('setProduct', () => {
  beforeEach(() => {
    resetBase();
  });

  const testCases: {
    name: string;
    productName: string;
    version: string;
    wantInBase: string;
    wantErrorCode?: ClientInfoErrorCode;
  }[] = [
    {
      name: 'valid product',
      productName: 'my-app',
      version: '1.2.3',
      wantInBase: 'my-app/1.2.3',
    },
    {
      name: 'invalid name with space',
      productName: 'invalid name',
      version: '1.0.0',
      wantInBase: '',
      wantErrorCode: 'INVALID_KEY',
    },
    {
      name: 'invalid version not semver',
      productName: 'valid-name',
      version: 'not-semver',
      wantInBase: '',
      wantErrorCode: 'INVALID_VERSION',
    },
  ];

  it.each(testCases)(
    '$name',
    ({productName, version, wantInBase, wantErrorCode}) => {
      if (wantErrorCode !== undefined) {
        try {
          setProduct(productName, version);
          expect.fail('Expected ClientInfoError to be thrown.');
        } catch (e: unknown) {
          if (e instanceof ClientInfoError) {
            expect(e.code).toBe(wantErrorCode);
          } else {
            throw e;
          }
        }
      } else {
        setProduct(productName, version);
      }
      expect(baseToString()).toBe(wantInBase);
    }
  );
});

describe('setPartner', () => {
  beforeEach(() => {
    resetBase();
  });

  const testCases: {
    name: string;
    partner: string;
    wantInBase: string;
    wantErrorCode?: ClientInfoErrorCode;
  }[] = [
    {
      name: 'valid partner',
      partner: 'acme',
      wantInBase: 'partner/acme',
    },
    {
      name: 'invalid partner with space',
      partner: 'bad partner',
      wantInBase: '',
      wantErrorCode: 'INVALID_VALUE',
    },
  ];

  it.each(testCases)('$name', ({partner, wantInBase, wantErrorCode}) => {
    if (wantErrorCode !== undefined) {
      try {
        setPartner(partner);
        expect.fail('Expected ClientInfoError to be thrown.');
      } catch (e: unknown) {
        if (e instanceof ClientInfoError) {
          expect(e.code).toBe(wantErrorCode);
        } else {
          throw e;
        }
      }
    } else {
      setPartner(partner);
    }
    expect(baseToString()).toBe(wantInBase);
  });
});

describe('addToDefault', () => {
  beforeEach(() => {
    resetBase();
  });

  const testCases: {
    name: string;
    setup: [string, string][];
    key: string;
    value: string;
    wantInBase: string;
    wantErrorCode?: ClientInfoErrorCode;
  }[] = [
    {
      name: 'valid pair',
      setup: [],
      key: 'test-key',
      value: 'test-value',
      wantInBase: 'test-key/test-value',
    },
    {
      name: 'invalid key with space',
      setup: [],
      key: 'bad key',
      value: 'value',
      wantInBase: '',
      wantErrorCode: 'INVALID_KEY',
    },
    {
      name: 'exact duplicate silently ignored',
      setup: [['dup', 'value']],
      key: 'dup',
      value: 'value',
      wantInBase: 'dup/value',
    },
    {
      name: 'same key different value allowed',
      setup: [['partner', 'acme']],
      key: 'partner',
      value: 'contoso',
      wantInBase: 'partner/acme partner/contoso',
    },
  ];

  it.each(testCases)(
    '$name',
    ({setup, key, value, wantInBase, wantErrorCode}) => {
      for (const [k, v] of setup) {
        addToDefault(k, v);
      }
      if (wantErrorCode !== undefined) {
        try {
          addToDefault(key, value);
          expect.fail('Expected ClientInfoError to be thrown.');
        } catch (e: unknown) {
          if (e instanceof ClientInfoError) {
            expect(e.code).toBe(wantErrorCode);
          } else {
            throw e;
          }
        }
      } else {
        addToDefault(key, value);
      }
      expect(baseToString()).toBe(wantInBase);
    }
  );
});

describe('normalizeNodeVersion', () => {
  const testCases: {name: string; input: string; want: string}[] = [
    {name: 'v22.0.0', input: 'v22.0.0', want: '22.0.0'},
    {name: 'v22.11.0', input: 'v22.11.0', want: '22.11.0'},
    {name: 'v18.19.1', input: 'v18.19.1', want: '18.19.1'},
    {name: 'v0.12.0', input: 'v0.12.0', want: '0.12.0'},
    {name: 'unknown', input: 'unknown', want: '0.0.0-dev'},
    {name: 'empty string', input: '', want: '0.0.0-dev'},
  ];

  it.each(testCases)('$name', ({input, want}) => {
    expect(normalizeNodeVersion(input)).toBe(want);
  });
});
