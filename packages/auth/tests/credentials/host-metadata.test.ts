import {afterEach, describe, expect, it, vi} from 'vitest';
import {ZodError} from 'zod';

import type {HostMetadata} from '../../src/credentials/host-metadata';
import {
  getHostMetadata,
  resolveTokenEndpoint,
} from '../../src/credentials/host-metadata';

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

function stubFetch(handler: (url: string) => Response | Promise<Response>): {
  captured: CapturedRequest[];
} {
  const captured: CapturedRequest[] = [];
  const mock = vi.fn<typeof fetch>((input, init) => {
    const url = urlOf(input);
    captured.push({url, init});
    return Promise.resolve(handler(url));
  });
  vi.stubGlobal('fetch', mock);
  return {captured};
}

type ExpectedError =
  | {kind: 'message'; regex: RegExp}
  | {kind: 'instance'; ctor: new (...args: never[]) => Error};

async function assertThrows(
  promise: Promise<unknown>,
  want: ExpectedError
): Promise<void> {
  let caught: unknown;
  try {
    await promise;
  } catch (e) {
    caught = e;
  }
  if (want.kind === 'instance') {
    expect(caught).toBeInstanceOf(want.ctor);
    return;
  }
  if (!(caught instanceof Error)) {
    expect.fail(`expected Error, got ${String(caught)}`);
  }
  expect(caught.message).toMatch(want.regex);
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getHostMetadata', () => {
  const HOST = 'https://workspace.example';
  const HOST_METADATA_URL = `${HOST}/.well-known/databricks-config`;

  const parseCases: {
    name: string;
    response: Record<string, unknown>;
    want: HostMetadata;
  }[] = [
    {
      name: 'returns all fields when present',
      response: {
        oidc_endpoint: `${HOST}/oidc`,
        account_id: 'acct-1',
        workspace_id: 'ws-1',
      },
      want: {
        oidcEndpoint: `${HOST}/oidc`,
        accountId: 'acct-1',
        workspaceId: 'ws-1',
      },
    },
    {
      name: 'omits accountId and workspaceId when the response leaves them out',
      response: {oidc_endpoint: `${HOST}/oidc`},
      want: {oidcEndpoint: `${HOST}/oidc`},
    },
    {
      name: 'ignores unknown fields in the response',
      response: {
        oidc_endpoint: `${HOST}/oidc`,
        cloud: 'AWS',
        host_type: 'workspace',
      },
      want: {oidcEndpoint: `${HOST}/oidc`},
    },
  ];

  it.each(parseCases)('$name', async ({response, want}) => {
    const {captured} = stubFetch(() => jsonResponse(200, response));
    const meta = await getHostMetadata(HOST);
    expect(meta).toStrictEqual(want);
    expect(captured[0].url).toBe(HOST_METADATA_URL);
  });

  it('trims trailing slashes from the host before requesting', async () => {
    const {captured} = stubFetch(() =>
      jsonResponse(200, {oidc_endpoint: `${HOST}/oidc`})
    );
    await getHostMetadata(`${HOST}///`);
    expect(captured[0].url).toBe(HOST_METADATA_URL);
  });

  const errorCases: {
    name: string;
    stub: () => void;
    want: ExpectedError;
  }[] = [
    {
      name: 'rejects when the response is non-2xx',
      stub: (): void => {
        stubFetch(() => textResponse(500, 'boom'));
      },
      want: {
        kind: 'message',
        regex: /fetching host metadata from .* failed with status 500: boom/,
      },
    },
    {
      name: 'rejects when fetch itself rejects',
      stub: (): void => {
        vi.stubGlobal(
          'fetch',
          vi.fn<typeof fetch>(() => Promise.reject(new Error('network down')))
        );
      },
      want: {
        kind: 'message',
        regex: /fetching host metadata from .* failed: network down/,
      },
    },
    {
      name: 'rejects with ZodError when oidc_endpoint is missing',
      stub: (): void => {
        stubFetch(() => jsonResponse(200, {account_id: 'acct-1'}));
      },
      want: {kind: 'instance', ctor: ZodError},
    },
    {
      name: 'rejects when the response body is not valid JSON',
      stub: (): void => {
        stubFetch(() => textResponse(200, 'not json'));
      },
      want: {
        kind: 'message',
        regex: /parsing host metadata from .* failed/,
      },
    },
  ];

  it.each(errorCases)('$name', async ({stub, want}) => {
    stub();
    await assertThrows(getHostMetadata(HOST), want);
  });
});

describe('resolveTokenEndpoint', () => {
  const HOST = 'https://workspace.example';
  const OIDC_ROOT = `${HOST}/oidc`;
  const OAUTH_SERVER_URL = `${OIDC_ROOT}/.well-known/oauth-authorization-server`;
  const TOKEN_ENDPOINT = `${OIDC_ROOT}/v1/token`;
  const HOST_METADATA_URL = `${HOST}/.well-known/databricks-config`;

  const ACCOUNT_HOST = 'https://accounts.example';
  const ACCOUNT_ID_META = 'acct-from-metadata';
  const ACCOUNT_ID_USER = 'acct-from-user';
  const ACCOUNT_OIDC_TEMPLATE = `${ACCOUNT_HOST}/oidc/accounts/{account_id}`;
  const accountOidcRoot = (id: string): string =>
    `${ACCOUNT_HOST}/oidc/accounts/${id}`;
  const accountTokenEndpoint = (id: string): string =>
    `${accountOidcRoot(id)}/v1/token`;
  const accountOauthServerUrl = (id: string): string =>
    `${accountOidcRoot(id)}/.well-known/oauth-authorization-server`;

  const successCases: {
    name: string;
    host: string;
    configAccountId?: string;
    hostMetadataBody: Record<string, unknown>;
    wantDiscoveryUrl: string;
    wantTokenEndpoint: string;
  }[] = [
    {
      name: 'resolves a static oidc_endpoint via two-step discovery',
      host: HOST,
      hostMetadataBody: {oidc_endpoint: OIDC_ROOT},
      wantDiscoveryUrl: OAUTH_SERVER_URL,
      wantTokenEndpoint: TOKEN_ENDPOINT,
    },
    {
      name: 'substitutes {account_id} from the host metadata response',
      host: ACCOUNT_HOST,
      hostMetadataBody: {
        oidc_endpoint: ACCOUNT_OIDC_TEMPLATE,
        account_id: ACCOUNT_ID_META,
      },
      wantDiscoveryUrl: accountOauthServerUrl(ACCOUNT_ID_META),
      wantTokenEndpoint: accountTokenEndpoint(ACCOUNT_ID_META),
    },
    {
      name: 'substitutes {account_id} from the caller-supplied configAccountId',
      host: ACCOUNT_HOST,
      configAccountId: ACCOUNT_ID_USER,
      hostMetadataBody: {oidc_endpoint: ACCOUNT_OIDC_TEMPLATE},
      wantDiscoveryUrl: accountOauthServerUrl(ACCOUNT_ID_USER),
      wantTokenEndpoint: accountTokenEndpoint(ACCOUNT_ID_USER),
    },
    {
      name: 'caller-supplied configAccountId wins over the host metadata account_id',
      host: ACCOUNT_HOST,
      configAccountId: ACCOUNT_ID_USER,
      hostMetadataBody: {
        oidc_endpoint: ACCOUNT_OIDC_TEMPLATE,
        account_id: ACCOUNT_ID_META,
      },
      wantDiscoveryUrl: accountOauthServerUrl(ACCOUNT_ID_USER),
      wantTokenEndpoint: accountTokenEndpoint(ACCOUNT_ID_USER),
    },
    {
      name: 'strips trailing slashes from the OIDC root before building the discovery URL',
      host: HOST,
      hostMetadataBody: {oidc_endpoint: `${OIDC_ROOT}//`},
      wantDiscoveryUrl: OAUTH_SERVER_URL,
      wantTokenEndpoint: TOKEN_ENDPOINT,
    },
  ];

  it.each(successCases)(
    '$name',
    async ({
      host,
      configAccountId,
      hostMetadataBody,
      wantDiscoveryUrl,
      wantTokenEndpoint,
    }) => {
      const {captured} = stubFetch(url => {
        if (url === `${host}/.well-known/databricks-config`) {
          return jsonResponse(200, hostMetadataBody);
        }
        if (url === wantDiscoveryUrl) {
          return jsonResponse(200, {token_endpoint: wantTokenEndpoint});
        }
        return textResponse(599, `unexpected url: ${url}`);
      });
      const tokenEndpoint = await resolveTokenEndpoint(host, configAccountId);
      expect(tokenEndpoint).toBe(wantTokenEndpoint);
      expect(captured.map(c => c.url)).toStrictEqual([
        `${host}/.well-known/databricks-config`,
        wantDiscoveryUrl,
      ]);
    }
  );

  const errorCases: {
    name: string;
    host: string;
    configAccountId?: string;
    stub: () => void;
    want: ExpectedError;
  }[] = [
    {
      name: 'rejects when {account_id} is in oidc_endpoint and no account_id is available',
      host: HOST,
      stub: (): void => {
        stubFetch(() =>
          jsonResponse(200, {
            oidc_endpoint: 'https://x/oidc/accounts/{account_id}',
          })
        );
      },
      want: {
        kind: 'message',
        regex: /\{account_id\} placeholder but no account_id was provided/,
      },
    },
    {
      name: 'rejects when {account_id} is in oidc_endpoint and configAccountId is empty',
      host: HOST,
      configAccountId: '',
      stub: (): void => {
        stubFetch(() =>
          jsonResponse(200, {
            oidc_endpoint: 'https://x/oidc/accounts/{account_id}',
          })
        );
      },
      want: {
        kind: 'message',
        regex: /\{account_id\} placeholder but no account_id was provided/,
      },
    },
    {
      name: 'rejects when the oauth server metadata returns non-2xx',
      host: HOST,
      stub: (): void => {
        stubFetch(url => {
          if (url === HOST_METADATA_URL) {
            return jsonResponse(200, {oidc_endpoint: OIDC_ROOT});
          }
          return textResponse(404, 'nope');
        });
      },
      want: {
        kind: 'message',
        regex:
          /fetching oauth authorization server metadata from .* failed with status 404: nope/,
      },
    },
    {
      name: 'rejects with ZodError when oauth server metadata is missing token_endpoint',
      host: HOST,
      stub: (): void => {
        stubFetch(url => {
          if (url === HOST_METADATA_URL) {
            return jsonResponse(200, {oidc_endpoint: OIDC_ROOT});
          }
          return jsonResponse(200, {});
        });
      },
      want: {kind: 'instance', ctor: ZodError},
    },
  ];

  it.each(errorCases)('$name', async ({host, configAccountId, stub, want}) => {
    stub();
    await assertThrows(resolveTokenEndpoint(host, configAccountId), want);
  });
});
