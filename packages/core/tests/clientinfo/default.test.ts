import {describe, it, expect, beforeEach, afterEach} from 'vitest';
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
import {
  CACHED_NODE_VERSION,
  normalizeNodeVersion,
} from '../../src/clientinfo/default';
import {clearAgentCache} from '../../src/clientinfo/agent';

describe('createDefault', () => {
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    resetBase();
    clearAgentCache();
    savedEnv = process.env;
    process.env = {...savedEnv};
  });

  afterEach(() => {
    process.env = savedEnv;
    clearAgentCache();
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
      name: 'multiple agents report the multiple sentinel',
      env: {CLAUDECODE: '1', CURSOR_AGENT: '1'},
      want: `${prefix} agent/multiple`,
    },
    {
      name: 'AGENT fallback to known product',
      env: {AGENT: 'goose'},
      want: `${prefix} agent/goose`,
    },
    {
      name: 'AGENT fallback to unknown',
      env: {AGENT: 'somethingweird'},
      want: `${prefix} agent/unknown`,
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
    process.env = env;
    expect(createDefault().toString()).toBe(want);
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
