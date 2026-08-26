import type {Stats} from 'node:fs';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import type {U2mCredentialsErrorCode} from '../../src/credentials';
import {
  U2mCredentialsError,
  defaultCredentials,
  newU2mCredentials,
} from '../../src/credentials';

type ExecFileCallback = (
  err: Error | null,
  result: {stdout: string; stderr: string}
) => void;

type ExecFileFn = (cmd: string, args: string[], cb: ExecFileCallback) => void;

const execFileMock = vi.hoisted(() => vi.fn<ExecFileFn>());
const statMock = vi.hoisted(() => vi.fn<(path: string) => Promise<Stats>>());

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

const MODERN_CLI_SIZE = 5 * 1024 * 1024;
const LEGACY_CLI_SIZE = 100 * 1024;
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

function stubCliRun(stub: CliStub): void {
  execFileMock.mockImplementationOnce((_cmd, _args, cb) => {
    if (stub.kind === 'err') {
      const err = new Error('command failed') as Error & {stderr: string};
      err.stderr = stub.stderr;
      cb(err, {stdout: '', stderr: stub.stderr});
      return;
    }
    cb(null, {stdout: stub.stdout, stderr: ''});
  });
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
  });

  afterEach(() => {
    execFileMock.mockReset();
    statMock.mockReset();
    vi.unstubAllEnvs();
  });

  it('rejects grouped explicit CLI auth before invoking the CLI', async () => {
    const credentials = defaultCredentials({
      profile: {
        name: DEFAULT_PROFILE,
        host: 'https://workspace.example',
        authType: 'databricks-cli',
        groupId: 'group-123',
      },
    });

    await expect(credentials.authHeaders()).rejects.toMatchObject({
      code: 'GROUP_ROLE_UNSUPPORTED',
    });
    expect(statMock).not.toHaveBeenCalled();
    expect(execFileMock).not.toHaveBeenCalled();
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
    statReturnsModernFile();
    stubCliRun(cliStub);

    const creds = newU2mCredentials({
      profile,
      ...(cliPath !== undefined && {cliPath}),
    });
    expect(creds.name()).toBe('databricks-cli');
    const headers = await creds.authHeaders();

    expect(headers).toEqual([{key: 'Authorization', value: want.authHeader}]);
    expect(execFileMock).toHaveBeenCalledOnce();
    const [calledCliPath, args] = execFileMock.mock.calls[0];
    expect(calledCliPath).toBe(want.cliPath);
    expect(args).toEqual(['auth', 'token', '--profile', profile]);
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
      name: 'only legacy (undersized) binary available',
      setup: (): void => {
        statReturnsFile(LEGACY_CLI_SIZE);
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'LEGACY_CLI_DETECTED',
      wantMessage: /legacy databricks CLI detected/,
    },
    {
      name: 'CLI invocation surfaces stderr',
      setup: (): void => {
        statReturnsModernFile();
        stubCliRun({kind: 'err', stderr: 'not logged in'});
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'TOKEN_FETCH_FAILED',
      wantMessage: /not logged in/,
    },
    {
      name: 'CLI output is not valid JSON',
      setup: (): void => {
        statReturnsModernFile();
        stubCliRun({kind: 'ok', stdout: 'not json'});
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'INVALID_RESPONSE',
      wantMessage: /cannot parse CLI response/,
    },
    {
      name: 'CLI response is missing access_token',
      setup: (): void => {
        statReturnsModernFile();
        stubCliRun({
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
        statReturnsModernFile();
        stubCliRun(okResponse({expiry: 'totally-not-a-date'}));
      },
      profile: DEFAULT_PROFILE,
      wantCode: 'INVALID_RESPONSE',
      wantMessage: /cannot parse token expiry/,
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
