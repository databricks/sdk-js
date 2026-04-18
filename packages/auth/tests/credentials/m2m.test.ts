import {afterEach, describe, expect, it, vi} from 'vitest';
import {ZodError} from 'zod';

import type {M2mCredentialsErrorCode} from '../../src/credentials';
import {M2mCredentialsError, newM2mCredentials} from '../../src/credentials';

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

function stubFetchJson(
  status: number,
  body: unknown
): {captured: CapturedRequest[]; mock: ReturnType<typeof vi.fn>} {
  const captured: CapturedRequest[] = [];
  const mock = vi.fn<typeof fetch>((input, init) => {
    captured.push({url: urlOf(input), init});
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status,
        headers: {'Content-Type': 'application/json'},
      })
    );
  });
  vi.stubGlobal('fetch', mock);
  return {captured, mock};
}

function stubFetchText(
  status: number,
  text: string
): {captured: CapturedRequest[]; mock: ReturnType<typeof vi.fn>} {
  const captured: CapturedRequest[] = [];
  const mock = vi.fn<typeof fetch>((input, init) => {
    captured.push({url: urlOf(input), init});
    return Promise.resolve(new Response(text, {status}));
  });
  vi.stubGlobal('fetch', mock);
  return {captured, mock};
}

describe('newM2mCredentials', () => {
  const NOW = 1_700_000_000_000;
  const DEFAULT_CLIENT_ID = 'b';
  const DEFAULT_CLIENT_SECRET = 'c';
  const TOKEN_ENDPOINT = 'https://localhost/token';

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  const successCases: {
    name: string;
    clientId?: string;
    clientSecret?: string;
    scopes?: string[];
    response: Record<string, unknown>;
    want: {
      basicAuth: string;
      scope: string;
      tokenValue: string;
      tokenType: string | undefined;
      expiry: Date | undefined;
    };
  }[] = [
    {
      name: 'Bearer token with expiry and default scopes',
      response: {
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
      },
    },
    {
      name: 'non-Bearer token_type is preserved',
      response: {token_type: 'Some', access_token: 'cde'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'all-apis',
        tokenValue: 'cde',
        tokenType: 'Some',
        expiry: undefined,
      },
    },
    {
      name: 'omitted token_type and expires_in',
      response: {access_token: 'no-type-token'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'all-apis',
        tokenValue: 'no-type-token',
        tokenType: undefined,
        expiry: undefined,
      },
    },
    {
      name: 'special-character creds are URL-encoded',
      clientId: 'client@id',
      clientSecret: 'secret with spaces',
      response: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa(`${encodeURIComponent('client@id')}:${encodeURIComponent('secret with spaces')}`)}`,
        scope: 'all-apis',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
      },
    },
    {
      name: 'empty scopes fall back to the default',
      scopes: [],
      response: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'all-apis',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
      },
    },
    {
      name: 'a single scope is sent as-is',
      scopes: ['dashboards'],
      response: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'dashboards',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
      },
    },
    {
      name: 'multiple scopes are space-joined',
      scopes: ['files:read', 'jobs', 'mlflow'],
      response: {token_type: 'Bearer', access_token: 't'},
      want: {
        basicAuth: `Basic ${btoa('b:c')}`,
        scope: 'files:read jobs mlflow',
        tokenValue: 't',
        tokenType: 'Bearer',
        expiry: undefined,
      },
    },
  ];

  it.each(successCases)(
    '$name',
    async ({clientId, clientSecret, scopes, response, want}) => {
      vi.setSystemTime(NOW);
      const {captured} = stubFetchJson(200, response);

      const creds = newM2mCredentials({
        clientId: clientId ?? DEFAULT_CLIENT_ID,
        clientSecret: clientSecret ?? DEFAULT_CLIENT_SECRET,
        tokenEndpoint: TOKEN_ENDPOINT,
        ...(scopes !== undefined && {scopes}),
      });
      expect(creds.name()).toBe('oauth-m2m');
      const token = await creds.token();

      expect(token.value).toBe(want.tokenValue);
      expect(token.type).toBe(want.tokenType);
      expect(token.expiry).toEqual(want.expiry);

      expect(captured).toHaveLength(1);
      const first = captured[0];
      expect(first.url).toBe(TOKEN_ENDPOINT);
      const init = first.init;
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
        stubFetchText(500, 'boom');
        return newM2mCredentials({
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
          tokenEndpoint: TOKEN_ENDPOINT,
        }).token();
      },
      want: {
        kind: 'm2m',
        code: 'TOKEN_REQUEST_FAILED',
        message: /token request failed with status 500: boom/,
      },
    },
    {
      name: 'response missing access_token',
      trigger: async (): Promise<unknown> => {
        stubFetchJson(200, {token_type: 'Bearer'});
        return newM2mCredentials({
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
          tokenEndpoint: TOKEN_ENDPOINT,
        }).token();
      },
      want: {kind: 'zod'},
    },
    {
      name: 'empty clientId',
      trigger: async (): Promise<unknown> => {
        newM2mCredentials({
          clientId: '',
          clientSecret: DEFAULT_CLIENT_SECRET,
          tokenEndpoint: TOKEN_ENDPOINT,
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
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: '',
          tokenEndpoint: TOKEN_ENDPOINT,
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
      name: 'empty tokenEndpoint',
      trigger: async (): Promise<unknown> => {
        newM2mCredentials({
          clientId: DEFAULT_CLIENT_ID,
          clientSecret: DEFAULT_CLIENT_SECRET,
          tokenEndpoint: '',
        });
        return Promise.resolve();
      },
      want: {
        kind: 'm2m',
        code: 'TOKEN_ENDPOINT_REQUIRED',
        message: /tokenEndpoint is required/,
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
