import type {Stats} from 'node:fs';

import {ProfileError} from '@databricks/sdk-core/profiles';
import type {Profile, ResolveOptions} from '@databricks/sdk-core/profiles';
import type * as profiles from '@databricks/sdk-core/profiles';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import type {U2mCredentialsErrorCode} from '../../src/credentials';
import {U2mCredentialsError, newU2mCredentials} from '../../src/credentials';

type ExecFileCallback = (
  err: Error | null,
  result: {stdout: string; stderr: string}
) => void;

type ExecFileFn = (cmd: string, args: string[], cb: ExecFileCallback) => void;

const execFileMock = vi.hoisted(() => vi.fn<ExecFileFn>());
const statMock = vi.hoisted(() => vi.fn<(path: string) => Promise<Stats>>());
const resolveMock = vi.hoisted(() =>
  vi.fn<(options?: ResolveOptions) => Promise<Profile>>()
);

// Mock node:child_process to intercept CLI invocations. The hoisted mock is
// invoked via util.promisify, so it must accept a node-style callback.
vi.mock('node:child_process', () => ({
  execFile: (cmd: string, args: string[], cb: ExecFileCallback): void => {
    execFileMock(cmd, args, cb);
  },
}));

vi.mock('node:fs/promises', () => ({
  stat: (p: string): Promise<Stats> => statMock(p),
}));

// Mock the profile resolver so the profile pre-check is deterministic and does
// not read the developer's ~/.databrickscfg.
vi.mock('@databricks/sdk-core/profiles', async importOriginal => {
  const actual = await importOriginal<typeof profiles>();
  return {
    ...actual,
    resolve: (options?: ResolveOptions): Promise<Profile> =>
      resolveMock(options),
  };
});

const MODERN_CLI_SIZE = 5 * 1024 * 1024;
const LEGACY_CLI_SIZE = 100 * 1024;
const MODERN_CLI_VERSION = 'Databricks CLI v0.221.0\n';
const DEFAULT_PROFILE = 'DEFAULT';
const DEFAULT_RESOLVED_CLI_PATH = '/usr/local/bin/databricks';

function statReturnsFile(size: number): void {
  statMock.mockResolvedValue({
    isDirectory: () => false,
    size,
  } as Stats);
}

function statReturnsModernFile(): void {
  statReturnsFile(MODERN_CLI_SIZE);
}

type CliStub = {kind: 'ok'; stdout: string} | {kind: 'err'; stderr: string};

// Routes mocked CLI invocations by sub-command: `databricks version` reports
// versionStub, while `databricks auth token` reports tokenStub. A missing stub
// fails the invocation, surfacing unexpected calls.
function stubCli(opts: {versionStub?: CliStub; tokenStub?: CliStub}): void {
  execFileMock.mockImplementation((_cmd, args, cb) => {
    const stub = args[0] === 'version' ? opts.versionStub : opts.tokenStub;
    if (stub === undefined) {
      const err = new Error('command failed') as Error & {stderr: string};
      err.stderr = '';
      cb(err, {stdout: '', stderr: ''});
      return;
    }
    if (stub.kind === 'err') {
      const err = new Error('command failed') as Error & {stderr: string};
      err.stderr = stub.stderr;
      cb(err, {stdout: '', stderr: stub.stderr});
      return;
    }
    cb(null, {stdout: stub.stdout, stderr: ''});
  });
}

function modernVersionStub(): CliStub {
  return {kind: 'ok', stdout: MODERN_CLI_VERSION};
}

// Configures the version probe to report a modern CLI and routes the token
// invocation to the given stub.
function stubModernCliWithToken(tokenStub: CliStub): void {
  statReturnsModernFile();
  stubCli({versionStub: modernVersionStub(), tokenStub});
}

function okResponse(partial: {
  access_token?: string;
  token_type?: string;
  expiry?: string;
}): CliStub {
  return {
    kind: 'ok',
    stdout: JSON.stringify({
      access_token: partial.access_token ?? 'cli-token',
      ...(partial.token_type !== undefined && {token_type: partial.token_type}),
      expiry: partial.expiry ?? '2026-12-31T00:00:00Z',
    }),
  };
}

describe('newU2mCredentials', () => {
  beforeEach(() => {
    vi.stubEnv('PATH', '/usr/local/bin:/usr/bin');
    // By default the profile exists, so the pre-check passes.
    resolveMock.mockResolvedValue({name: DEFAULT_PROFILE});
  });

  afterEach(() => {
    execFileMock.mockReset();
    statMock.mockReset();
    resolveMock.mockReset();
    vi.unstubAllEnvs();
  });

  const successCases: {
    name: string;
    profile: string;
    cliPath?: string;
    cliStub: CliStub;
    want: {
      authHeader: string;
      cliPath: string;
    };
  }[] = [
    {
      name: 'Bearer token with expiry from the profile',
      profile: DEFAULT_PROFILE,
      cliStub: okResponse({
        access_token: 'cli-token',
        token_type: 'Bearer',
        expiry: '2026-12-31T00:00:00Z',
      }),
      want: {
        authHeader: 'Bearer cli-token',
        cliPath: DEFAULT_RESOLVED_CLI_PATH,
      },
    },
    {
      name: 'non-Bearer token_type is preserved in the Authorization header',
      profile: DEFAULT_PROFILE,
      cliStub: okResponse({access_token: 'cde', token_type: 'Some'}),
      want: {
        authHeader: 'Some cde',
        cliPath: DEFAULT_RESOLVED_CLI_PATH,
      },
    },
    {
      name: 'omitted token_type defaults to Bearer',
      profile: DEFAULT_PROFILE,
      cliStub: okResponse({access_token: 'no-type-token'}),
      want: {
        authHeader: 'Bearer no-type-token',
        cliPath: DEFAULT_RESOLVED_CLI_PATH,
      },
    },
    {
      name: 'explicit cliPath skips PATH lookup',
      profile: DEFAULT_PROFILE,
      cliPath: '/custom/path/to/databricks',
      cliStub: okResponse({access_token: 'custom-token'}),
      want: {
        authHeader: 'Bearer custom-token',
        cliPath: '/custom/path/to/databricks',
      },
    },
  ];

  it.each(successCases)('$name', async ({profile, cliPath, cliStub, want}) => {
    stubModernCliWithToken(cliStub);

    const creds = newU2mCredentials({
      profile,
      ...(cliPath !== undefined && {cliPath}),
    });
    expect(creds.name()).toBe('databricks-cli');
    const headers = await creds.authHeaders();

    expect(headers).toEqual([{key: 'Authorization', value: want.authHeader}]);
    expect(resolveMock).toHaveBeenCalledWith({profile});

    // The version probe and the token request both target the resolved path.
    const versionCall = execFileMock.mock.calls.find(
      ([, args]) => args[0] === 'version'
    );
    if (versionCall === undefined) {
      expect.fail('expected a `databricks version` probe');
    }
    expect(versionCall[0]).toBe(want.cliPath);

    const tokenCall = execFileMock.mock.calls.find(
      ([, args]) => args[0] === 'auth'
    );
    if (tokenCall === undefined) {
      expect.fail('expected a `databricks auth token` invocation');
    }
    expect(tokenCall[0]).toBe(want.cliPath);
    expect(tokenCall[1]).toEqual(['auth', 'token', '--profile', profile]);
  });

  const errorCases: {
    name: string;
    setup?: () => void;
    profile: string;
    wantCode: U2mCredentialsErrorCode;
    wantMessage: RegExp;
  }[] = [
    {
      name: 'empty profile',
      profile: '',
      wantCode: 'PROFILE_REQUIRED',
      wantMessage: /profile is required/,
    },
    {
      name: 'binary missing from PATH',
      setup: (): void => {
        statMock.mockRejectedValue(
          Object.assign(new Error('ENOENT'), {code: 'ENOENT'})
        );
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'CLI_NOT_FOUND',
      wantMessage: /databricks CLI not found/,
    },
    {
      name: 'undersized binary whose version cannot be read is legacy',
      setup: (): void => {
        statReturnsFile(LEGACY_CLI_SIZE);
        // The version probe fails, so detection falls back to file size.
        stubCli({});
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'LEGACY_CLI_DETECTED',
      wantMessage: /legacy databricks CLI detected/,
    },
    {
      name: 'binary reporting a pre-0.100.0 version is legacy',
      setup: (): void => {
        statReturnsModernFile();
        stubCli({
          versionStub: {kind: 'ok', stdout: 'Databricks CLI v0.99.0\n'},
        });
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'LEGACY_CLI_DETECTED',
      wantMessage: /legacy databricks CLI detected/,
    },
    {
      name: 'CLI invocation surfaces stderr',
      setup: (): void => {
        stubModernCliWithToken({kind: 'err', stderr: 'not logged in'});
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'TOKEN_FETCH_FAILED',
      wantMessage: /not logged in/,
    },
    {
      name: 'CLI stderr already prefixed with Error: is not doubled',
      setup: (): void => {
        stubModernCliWithToken({
          kind: 'err',
          stderr: 'Error: cannot configure default credentials',
        });
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'TOKEN_FETCH_FAILED',
      wantMessage: /cannot get access token: cannot configure default/,
    },
    {
      name: 'CLI output is not valid JSON',
      setup: (): void => {
        stubModernCliWithToken({kind: 'ok', stdout: 'not json'});
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'INVALID_RESPONSE',
      wantMessage: /cannot parse CLI response/,
    },
    {
      name: 'CLI response is missing access_token',
      setup: (): void => {
        stubModernCliWithToken({
          kind: 'ok',
          stdout: JSON.stringify({
            token_type: 'Bearer',
            expiry: '2026-12-31T00:00:00Z',
          }),
        });
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'INVALID_RESPONSE',
      wantMessage: /invalid CLI response/,
    },
    {
      name: 'expiry cannot be parsed as a date',
      setup: (): void => {
        stubModernCliWithToken(okResponse({expiry: 'totally-not-a-date'}));
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'INVALID_RESPONSE',
      wantMessage: /cannot parse token expiry/,
    },
    {
      name: 'profile not found in the config file',
      setup: (): void => {
        resolveMock.mockRejectedValue(
          new ProfileError(
            'PROFILE_NOT_FOUND',
            'profile not found: "ghost" in /home/u/.databrickscfg'
          )
        );
      },
      profile: 'ghost',
      wantCode: 'PROFILE_NOT_FOUND',
      wantMessage: /profile "ghost" was not found/,
    },
  ];

  it.each(errorCases)(
    'rejects on $name',
    async ({setup, profile, wantCode, wantMessage}) => {
      setup?.();

      let caught: unknown;
      try {
        const creds = newU2mCredentials({profile});
        await creds.token();
      } catch (e) {
        caught = e;
      }
      if (!(caught instanceof U2mCredentialsError)) {
        expect.fail(`expected U2mCredentialsError, got ${String(caught)}`);
      }
      expect(caught.code).toBe(wantCode);
      expect(caught.message).toMatch(wantMessage);
    }
  );
});
