import {afterEach, describe, expect, it, vi} from 'vitest';
import {ZodError} from 'zod';

// Import from specific modules rather than the barrel because the barrel
// re-exports Node-only credentials (`newU2mCredentials`) that can't load in
// browser test runs.
import type {M2mCredentialsErrorCode} from '../../src/credentials/errors';
import {M2mCredentialsError} from '../../src/credentials/errors';
import {newM2mCredentials} from '../../src/credentials/m2m';

interface CapturedRequest {
  url: string;
  init: RequestInit | undefined;
}

function urlOf(input: string | URL | Request): string {
  if (typeof input === 'string') {
    return input;
  }
  if (input instanceof URL) {
    return input.href;
  }
  return input.url;
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {'Content-Type': 'application/json'},
  });
}

function textResponse(status: number, text: string): Response {
  return new Response(text, {status});
}

function requestParams(request: CapturedRequest): URLSearchParams {
  const body = request.init?.body;
  if (typeof body !== 'string') {
    expect.fail('expected body to be a string');
  }
  return new URLSearchParams(body);
}

const HOST = 'https://workspace.example';
const HOST_METADATA_URL = `${HOST}/.well-known/databricks-config`;
const OIDC_ROOT = `${HOST}/oidc`;
const OAUTH_SERVER_URL = `${OIDC_ROOT}/.well-known/oauth-authorization-server`;
const TOKEN_ENDPOINT = `${OIDC_ROOT}/v1/token`;

interface FetchStubs {
  hostMetadata?: () => Response;
  oauthServer?: () => Response;
  token?: (request: CapturedRequest) => Response;
}

function stubFetch(stubs: FetchStubs): {
  captured: CapturedRequest[];
  mock: ReturnType<typeof vi.fn>;
} {
  const captured: CapturedRequest[] = [];
  const defaultHostMetadata = (): Response =>
    jsonResponse(200, {oidc_endpoint: OIDC_ROOT});
  const defaultOauthServer = (): Response =>
    jsonResponse(200, {token_endpoint: TOKEN_ENDPOINT});
  const mock = vi.fn<typeof fetch>((input, init) => {
    const url = urlOf(input);
    captured.push({url, init});
    if (url === HOST_METADATA_URL) {
      return Promise.resolve((stubs.hostMetadata ?? defaultHostMetadata)());
    }
    if (url === OAUTH_SERVER_URL) {
      return Promise.resolve((stubs.oauthServer ?? defaultOauthServer)());
    }
    if (url === TOKEN_ENDPOINT && stubs.token !== undefined) {
      return Promise.resolve(stubs.token({url, init}));
    }
    return Promise.resolve(textResponse(599, `unexpected url: ${url}`));
  });
  vi.stubGlobal('fetch', mock);
  return {captured, mock};
}

describe('newM2mCredentials', () => {
  const NOW = 1_700_000_000_000;
  const DEFAULT_CLIENT_ID = 'b';
  const DEFAULT_CLIENT_SECRET = 'c';

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  const successCases: {
    name: string;
    clientId?: string;
    clientSecret?: string;
    scopes?: string[];
    groupId?: string;
    tokenResponseBody: Record<string, unknown>;
    want: {
      basicAuth: string;
      scope: string;
      tokenValue: string;
      tokenType: string | undefined;
      expiry: Date | undefined;
      assumeGroup: string | null;
    };
  }[] = [
    {
      name: 'Bearer token with expiry and default scopes',
      tokenResponseBody: {
        token_type: 'Bearer',
        access_token: 'test-token',
        expires_in: 3600,
      },
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'all-apis',
        tokenValue: 'test-token',
        tokenType: 'Bearer',
        expiry: new Date(NOW + 3600 * 1000),
        assumeGroup: null,
      },
    },
    {
      name: 'non-Bearer token_type is preserved',
      tokenResponseBody: {token_type: 'Some', access_token: 'cde'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'all-apis',
        tokenValue: 'cde',
        tokenType: 'Some',
        expiry: undefined,
        assumeGroup: null,
      },
    },
    {
      name: 'omitted token_type and expires_in',
      tokenResponseBody: {access_token: 'no-type-token'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'all-apis',
        tokenValue: 'no-type-token',
        tokenType: undefined,
        expiry: undefined,
        assumeGroup: null,
      },
    },
    {
      name: 'special-character creds are URL-encoded',
      clientId: 'client@id',
      clientSecret: 'secret with spaces',
      tokenResponseBody: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa(`${encodeURIComponent('client@id')}:${encodeURIComponent('secret with spaces')}`)}`,
        scope: 'all-apis',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
        assumeGroup: null,
      },
    },
    {
      name: 'empty scopes fall back to the default',
      scopes: [],
      tokenResponseBody: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'all-apis',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
        assumeGroup: null,
      },
    },
    {
      name: 'a single scope is sent as-is',
      scopes: ['dashboards'],
      tokenResponseBody: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'dashboards',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
        assumeGroup: null,
      },
    },
    {
      name: 'multiple scopes are space-joined',
      scopes: ['files:read', 'jobs', 'mlflow'],
      tokenResponseBody: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'files:read jobs mlflow',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
        assumeGroup: null,
      },
    },
    {
      name: 'group role is included in the token grant',
      groupId: 'group-123',
      tokenResponseBody: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'all-apis',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
        assumeGroup: 'group-123',
      },
    },
    {
      name: 'empty group ID omits group role from the token grant',
      groupId: '',
      tokenResponseBody: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'all-apis',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
        assumeGroup: null,
      },
    },
  ];

  it.each(successCases)(
    '$name',
    async ({
      clientId,
      clientSecret,
      scopes,
      groupId,
      tokenResponseBody,
      want,
    }) => {
      vi.setSystemTime(NOW);
      const {captured} = stubFetch({
        token: () => jsonResponse(200, tokenResponseBody),
      });

      const creds = newM2mCredentials({
        host: HOST,
        clientId: clientId ?? DEFAULT_CLIENT_ID,
        clientSecret: clientSecret ?? DEFAULT_CLIENT_SECRET,
        ...(scopes !== undefined && {scopes}),
        ...(groupId !== undefined && {groupId}),
      });
      expect(creds.name()).toBe('oauth-m2m');
      const token = await creds.token();

      expect(token.value).toBe(want.tokenValue);
      expect(token.type).toBe(want.tokenType);
      expect(token.expiry).toEqual(want.expiry);

      expect(captured.map(c => c.url)).toStrictEqual([
        HOST_METADATA_URL,
        OAUTH_SERVER_URL,
        TOKEN_ENDPOINT,
      ]);
      const tokenRequest = captured[2];
      const init = tokenRequest.init;
      if (init === undefined) {
        expect.fail('expected fetch init to be provided');
      }
      expect(init.method).toBe('POST');
      const headers = new Headers(init.headers);
      expect(headers.get('Authorization')).toBe(want.basicAuth);
      expect(headers.get('Content-Type')).toBe(
        'application/x-www-form-urlencoded'
      );
      const body = init.body;
      if (typeof body !== 'string') {
        expect.fail('expected body to be a string');
      }
      const params = new URLSearchParams(body);
      expect(params.get('grant_type')).toBe('client_credentials');
      expect(params.get('scope')).toBe(want.scope);
      expect(params.get('assume_group')).toBe(want.assumeGroup);
    }
  );

  it('caches a successful token-endpoint discovery across token() calls', async () => {
    const {captured} = stubFetch({
      token: () => jsonResponse(200, {access_token: 't'}),
    });
    const creds = newM2mCredentials({
      host: HOST,
      clientId: DEFAULT_CLIENT_ID,
      clientSecret: DEFAULT_CLIENT_SECRET,
    });
    await creds.token();
    await creds.token();
    // Discovery (2 fetches) happens once; the token grant runs per call.
    expect(captured.map(c => c.url)).toStrictEqual([
      HOST_METADATA_URL,
      OAUTH_SERVER_URL,
      TOKEN_ENDPOINT,
      TOKEN_ENDPOINT,
    ]);
  });

  it('retains the group role across repeated token grants', async () => {
    const {captured} = stubFetch({
      token: () => jsonResponse(200, {access_token: 't'}),
    });
    const creds = newM2mCredentials({
      host: HOST,
      clientId: DEFAULT_CLIENT_ID,
      clientSecret: DEFAULT_CLIENT_SECRET,
      groupId: 'group-123',
    });

    await creds.token();
    await creds.token();

    const tokenRequests = captured.filter(c => c.url === TOKEN_ENDPOINT);
    expect(tokenRequests).toHaveLength(2);
    for (const request of tokenRequests) {
      expect(requestParams(request).get('assume_group')).toBe('group-123');
    }
  });

  it('keeps group roles isolated between credential providers', async () => {
    const {captured} = stubFetch({
      token: request => {
        const group = requestParams(request).get('assume_group') ?? 'normal';
        return jsonResponse(200, {access_token: `${group}-token`});
      },
    });
    const first = newM2mCredentials({
      host: HOST,
      clientId: DEFAULT_CLIENT_ID,
      clientSecret: DEFAULT_CLIENT_SECRET,
      groupId: 'group-a',
    });
    const second = newM2mCredentials({
      host: HOST,
      clientId: DEFAULT_CLIENT_ID,
      clientSecret: DEFAULT_CLIENT_SECRET,
      groupId: 'group-b',
    });

    await expect(first.token()).resolves.toMatchObject({
      value: 'group-a-token',
    });
    await expect(second.token()).resolves.toMatchObject({
      value: 'group-b-token',
    });

    const groups = captured
      .filter(c => c.url === TOKEN_ENDPOINT)
      .map(c => requestParams(c).get('assume_group'));
    expect(groups).toEqual(['group-a', 'group-b']);
  });

  it('does not retry a rejected grouped token grant without the group', async () => {
    const {captured} = stubFetch({token: () => textResponse(403, 'denied')});
    const creds = newM2mCredentials({
      host: HOST,
      clientId: DEFAULT_CLIENT_ID,
      clientSecret: DEFAULT_CLIENT_SECRET,
      groupId: 'group-123',
    });

    await expect(creds.token()).rejects.toMatchObject({
      code: 'TOKEN_REQUEST_FAILED',
      message: 'token request failed with status 403: denied',
    });
    const tokenRequests = captured.filter(c => c.url === TOKEN_ENDPOINT);
    expect(tokenRequests).toHaveLength(1);
    expect(requestParams(tokenRequests[0]).get('assume_group')).toBe(
      'group-123'
    );
  });

  it('retries discovery after a failed first call', async () => {
    let hostMetadataCalls = 0;
    const {captured} = stubFetch({
      hostMetadata: () => {
        hostMetadataCalls++;
        if (hostMetadataCalls === 1) {
          return textResponse(500, 'boom');
        }
        return jsonResponse(200, {oidc_endpoint: OIDC_ROOT});
      },
      token: () => jsonResponse(200, {access_token: 't'}),
    });
    const creds = newM2mCredentials({
      host: HOST,
      clientId: DEFAULT_CLIENT_ID,
      clientSecret: DEFAULT_CLIENT_SECRET,
    });
    await expect(creds.token()).rejects.toBeInstanceOf(M2mCredentialsError);
    await creds.token();
    expect(captured.map(c => c.url)).toStrictEqual([
      HOST_METADATA_URL,
      HOST_METADATA_URL,
      OAUTH_SERVER_URL,
      TOKEN_ENDPOINT,
    ]);
  });

  const substitutionCases: {
    name: string;
    optionsAccountId?: string;
    metaAccountId?: string;
    wantAccountId: string;
  }[] = [
    {
      name: 'metadata-provided account_id is used when options.accountId is unset',
      metaAccountId: 'acct-from-metadata',
      wantAccountId: 'acct-from-metadata',
    },
    {
      name: 'options.accountId is used when the metadata response omits account_id',
      optionsAccountId: 'acct-from-user',
      wantAccountId: 'acct-from-user',
    },
    {
      name: 'options.accountId wins over metadata-provided account_id',
      optionsAccountId: 'acct-from-user',
      metaAccountId: 'acct-from-metadata',
      wantAccountId: 'acct-from-user',
    },
  ];

  it.each(substitutionCases)(
    '$name',
    async ({optionsAccountId, metaAccountId, wantAccountId}) => {
      const accountHost = 'https://accounts.example';
      const oidcTemplate = `${accountHost}/oidc/accounts/{account_id}`;
      const resolvedOidc = `${accountHost}/oidc/accounts/${wantAccountId}`;
      const resolvedTokenEndpoint = `${resolvedOidc}/v1/token`;
      const captured: CapturedRequest[] = [];
      const mock = vi.fn<typeof fetch>((input, init) => {
        const url = urlOf(input);
        captured.push({url, init});
        if (url === `${accountHost}/.well-known/databricks-config`) {
          return Promise.resolve(
            jsonResponse(200, {
              oidc_endpoint: oidcTemplate,
              ...(metaAccountId !== undefined && {account_id: metaAccountId}),
            })
          );
        }
        if (url === `${resolvedOidc}/.well-known/oauth-authorization-server`) {
          return Promise.resolve(
            jsonResponse(200, {token_endpoint: resolvedTokenEndpoint})
          );
        }
        if (url === resolvedTokenEndpoint) {
          return Promise.resolve(jsonResponse(200, {access_token: 't'}));
        }
        return Promise.resolve(textResponse(599, `unexpected url: ${url}`));
      });
      vi.stubGlobal('fetch', mock);
      const creds = newM2mCredentials({
        host: accountHost,
        clientId: DEFAULT_CLIENT_ID,
        clientSecret: DEFAULT_CLIENT_SECRET,
        ...(optionsAccountId !== undefined && {accountId: optionsAccountId}),
      });
      const token = await creds.token();
      expect(token.value).toBe('t');
      expect(captured.map(c => c.url)).toStrictEqual([
        `${accountHost}/.well-known/databricks-config`,
        `${resolvedOidc}/.well-known/oauth-authorization-server`,
        resolvedTokenEndpoint,
      ]);
    }
  );

  const groupedEndpointCases: {
    name: string;
    host: string;
    oidcRoot: string;
    hostMetadata: Record<string, string>;
  }[] = [
    {
      name: 'workspace',
      host: 'https://workspace.example',
      oidcRoot: 'https://workspace.example/oidc',
      hostMetadata: {oidc_endpoint: 'https://workspace.example/oidc'},
    },
    {
      name: 'account or unified',
      host: 'https://accounts.example',
      oidcRoot: 'https://accounts.example/oidc/accounts/account-id',
      hostMetadata: {
        oidc_endpoint: 'https://accounts.example/oidc/accounts/{account_id}',
        account_id: 'account-id',
      },
    },
  ];

  it.each(groupedEndpointCases)(
    'sends group role to the $name token endpoint shape',
    async ({host, oidcRoot, hostMetadata}) => {
      const metadataUrl = `${host}/.well-known/databricks-config`;
      const oauthServerUrl = `${oidcRoot}/.well-known/oauth-authorization-server`;
      const tokenEndpoint = `${oidcRoot}/v1/token`;
      const captured: CapturedRequest[] = [];
      const fetchMock = vi.fn<typeof fetch>((input, init) => {
        const request = {url: urlOf(input), init};
        captured.push(request);
        if (request.url === metadataUrl) {
          return Promise.resolve(jsonResponse(200, hostMetadata));
        }
        if (request.url === oauthServerUrl) {
          return Promise.resolve(
            jsonResponse(200, {token_endpoint: tokenEndpoint})
          );
        }
        if (request.url === tokenEndpoint) {
          return Promise.resolve(jsonResponse(200, {access_token: 'token'}));
        }
        return Promise.resolve(
          textResponse(599, `unexpected url: ${request.url}`)
        );
      });
      vi.stubGlobal('fetch', fetchMock);
      const credentials = newM2mCredentials({
        host,
        clientId: DEFAULT_CLIENT_ID,
        clientSecret: DEFAULT_CLIENT_SECRET,
        groupId: 'group-123',
      });

      await expect(credentials.token()).resolves.toMatchObject({
        value: 'token',
      });

      expect(captured.map(request => request.url)).toEqual([
        metadataUrl,
        oauthServerUrl,
        tokenEndpoint,
      ]);
      expect(requestParams(captured[2]).get('assume_group')).toBe('group-123');
    }
  );

  type ExpectedError =
    | {kind: 'm2m'; code: M2mCredentialsErrorCode; message: RegExp}
    | {kind: 'zod'};

  const errorCases: {
    name: string;
    trigger: () => Promise<unknown>;
    want: ExpectedError;
  }[] = [
    {
      name: 'token endpoint returns non-2xx',
      trigger: async (): Promise<unknown> => {
        stubFetch({token: () => textResponse(500, 'boom')});
        return newM2mCredentials({
          host: HOST,
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
        }).token();
      },
      want: {
        kind: 'm2m',
        code: 'TOKEN_REQUEST_FAILED',
        message: /token request failed with status 500: boom/,
      },
    },
    {
      name: 'token response missing access_token',
      trigger: async (): Promise<unknown> => {
        stubFetch({token: () => jsonResponse(200, {token_type: 'Bearer'})});
        return newM2mCredentials({
          host: HOST,
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
        }).token();
      },
      want: {kind: 'zod'},
    },
    {
      name: 'host metadata returns non-2xx',
      trigger: async (): Promise<unknown> => {
        stubFetch({hostMetadata: () => textResponse(500, 'boom')});
        return newM2mCredentials({
          host: HOST,
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
        }).token();
      },
      want: {
        kind: 'm2m',
        code: 'DISCOVERY_FAILED',
        message: /fetching host metadata from .* failed with status 500/,
      },
    },
    {
      name: 'host metadata missing oidc_endpoint',
      trigger: async (): Promise<unknown> => {
        stubFetch({hostMetadata: () => jsonResponse(200, {})});
        return newM2mCredentials({
          host: HOST,
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
        }).token();
      },
      want: {
        kind: 'm2m',
        code: 'DISCOVERY_FAILED',
        message: /discovering token endpoint failed/,
      },
    },
    {
      name: 'oauth server metadata returns non-2xx',
      trigger: async (): Promise<unknown> => {
        stubFetch({oauthServer: () => textResponse(404, 'nope')});
        return newM2mCredentials({
          host: HOST,
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
        }).token();
      },
      want: {
        kind: 'm2m',
        code: 'DISCOVERY_FAILED',
        message:
          /fetching oauth authorization server metadata from .* failed with status 404/,
      },
    },
    {
      name: 'oauth server response missing token_endpoint',
      trigger: async (): Promise<unknown> => {
        stubFetch({oauthServer: () => jsonResponse(200, {})});
        return newM2mCredentials({
          host: HOST,
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
        }).token();
      },
      want: {
        kind: 'm2m',
        code: 'DISCOVERY_FAILED',
        message: /discovering token endpoint failed/,
      },
    },
    {
      name: 'oidc_endpoint contains {account_id} but account_id is missing',
      trigger: async (): Promise<unknown> => {
        stubFetch({
          hostMetadata: () =>
            jsonResponse(200, {
              oidc_endpoint: 'https://x/oidc/accounts/{account_id}',
            }),
        });
        return newM2mCredentials({
          host: HOST,
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
        }).token();
      },
      want: {
        kind: 'm2m',
        code: 'DISCOVERY_FAILED',
        message: /\{account_id\} placeholder but no account_id was provided/,
      },
    },
    {
      name: 'empty clientId',
      trigger: async (): Promise<unknown> => {
        newM2mCredentials({
          host: HOST,
          clientId: '',
          clientSecret: DEFAULT_CLIENT_SECRET,
        });
        return Promise.resolve();
      },
      want: {
        kind: 'm2m',
        code: 'CLIENT_ID_REQUIRED',
        message: /clientId is required/,
      },
    },
    {
      name: 'empty clientSecret',
      trigger: async (): Promise<unknown> => {
        newM2mCredentials({
          host: HOST,
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: '',
        });
        return Promise.resolve();
      },
      want: {
        kind: 'm2m',
        code: 'CLIENT_SECRET_REQUIRED',
        message: /clientSecret is required/,
      },
    },
    {
      name: 'empty host',
      trigger: async (): Promise<unknown> => {
        newM2mCredentials({
          host: '',
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
        });
        return Promise.resolve();
      },
      want: {
        kind: 'm2m',
        code: 'HOST_REQUIRED',
        message: /host is required/,
      },
    },
  ];

  it.each(errorCases)('rejects on $name', async ({trigger, want}) => {
    let caught: unknown;
    try {
      await trigger();
    } catch (e) {
      caught = e;
    }
    if (want.kind === 'zod') {
      expect(caught).toBeInstanceOf(ZodError);
      return;
    }
    if (!(caught instanceof M2mCredentialsError)) {
      expect.fail(`expected M2mCredentialsError, got ${String(caught)}`);
    }
    expect(caught.code).toBe(want.code);
    expect(caught.message).toMatch(want.message);
  });
});
