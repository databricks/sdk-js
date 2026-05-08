import {afterEach, describe, expect, it, vi} from 'vitest';
import {ZodError} from 'zod';

import {idTokenProviderFn} from '../../src/oidc/oidc';
import type {OAuthAuthorizationServer} from '../../src/oidc/tokensource';
import {newDatabricksOIDCTokenProvider} from '../../src/oidc/tokensource';

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

const TOKEN_ENDPOINT = 'https://host.com/oidc/v1/token';
const ID_TOKEN = 'id-token-42';

function fixedEndpointProvider(): () => Promise<OAuthAuthorizationServer> {
  return () => Promise.resolve({tokenEndpoint: TOKEN_ENDPOINT});
}

function staticIdTokenProvider(value: string): {
  provider: ReturnType<typeof idTokenProviderFn>;
  audiences: string[];
} {
  const audiences: string[] = [];
  const provider = idTokenProviderFn(audience => {
    audiences.push(audience);
    return Promise.resolve({value});
  });
  return {provider, audiences};
}

describe('newDatabricksOIDCTokenProvider', () => {
  const NOW = 1_700_000_000_000;

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('rejects with "missing Host" when host is empty', async () => {
    const {provider} = staticIdTokenProvider(ID_TOKEN);
    const ts = newDatabricksOIDCTokenProvider({
      host: '',
      tokenEndpointProvider: fixedEndpointProvider(),
      idTokenProvider: provider,
    });
    await expect(ts.token()).rejects.toThrow('missing Host');
  });

  it('propagates errors from the IDTokenProvider', async () => {
    const provider = idTokenProviderFn(() =>
      Promise.reject(new Error('error getting id token'))
    );
    const ts = newDatabricksOIDCTokenProvider({
      host: 'http://host.com',
      tokenEndpointProvider: fixedEndpointProvider(),
      idTokenProvider: provider,
    });
    await expect(ts.token()).rejects.toThrow('error getting id token');
  });

  it('rejects when the token endpoint returns a non-2xx response', async () => {
    stubFetchText(500, 'Internal Server Error');
    const {provider} = staticIdTokenProvider(ID_TOKEN);
    const ts = newDatabricksOIDCTokenProvider({
      host: 'http://host.com',
      tokenEndpointProvider: fixedEndpointProvider(),
      idTokenProvider: provider,
      audience: 'token-audience',
    });
    await expect(ts.token()).rejects.toThrow(
      /token request failed with status 500/
    );
  });

  it('rejects when the token endpoint returns a malformed body', async () => {
    stubFetchJson(200, {foo: 'bar'});
    const {provider} = staticIdTokenProvider(ID_TOKEN);
    const ts = newDatabricksOIDCTokenProvider({
      host: 'http://host.com',
      tokenEndpointProvider: fixedEndpointProvider(),
      idTokenProvider: provider,
      audience: 'token-audience',
    });
    await expect(ts.token()).rejects.toBeInstanceOf(ZodError);
  });

  const audienceCases: {
    name: string;
    clientId?: string;
    accountId?: string;
    audience?: string;
    wantAudience: string;
    wantClientIdInBody: boolean;
  }[] = [
    {
      name: 'WIF workspace uses configured audience and sends client_id',
      clientId: 'client-id',
      audience: 'token-audience',
      wantAudience: 'token-audience',
      wantClientIdInBody: true,
    },
    {
      name: 'WIF account uses configured audience and sends client_id',
      clientId: 'client-id',
      accountId: 'ac123',
      audience: 'token-audience',
      wantAudience: 'token-audience',
      wantClientIdInBody: true,
    },
    {
      name: 'account default audience falls back to accountId',
      clientId: 'client-id',
      accountId: 'ac123',
      wantAudience: 'ac123',
      wantClientIdInBody: true,
    },
    {
      name: 'workspace default audience falls back to the token endpoint',
      clientId: 'client-id',
      wantAudience: TOKEN_ENDPOINT,
      wantClientIdInBody: true,
    },
    {
      name: 'account-wide federation omits client_id from the body',
      audience: 'token-audience',
      wantAudience: 'token-audience',
      wantClientIdInBody: false,
    },
  ];

  it.each(audienceCases)(
    '$name',
    async ({
      clientId,
      accountId,
      audience,
      wantAudience,
      wantClientIdInBody,
    }) => {
      vi.setSystemTime(NOW);
      const {captured} = stubFetchJson(200, {
        token_type: 'access-token',
        access_token: 'test-auth-token',
        expires_in: 3600,
      });
      const {provider, audiences} = staticIdTokenProvider(ID_TOKEN);

      const ts = newDatabricksOIDCTokenProvider({
        host: 'http://host.com',
        tokenEndpointProvider: fixedEndpointProvider(),
        idTokenProvider: provider,
        ...(clientId !== undefined && {clientId}),
        ...(accountId !== undefined && {accountId}),
        ...(audience !== undefined && {audience}),
      });

      const token = await ts.token();
      expect(token.value).toBe('test-auth-token');
      expect(token.type).toBe('access-token');
      expect(token.expiry).toEqual(new Date(NOW + 3600 * 1000));

      expect(audiences).toEqual([wantAudience]);

      expect(captured).toHaveLength(1);
      const first = captured[0];
      expect(first.url).toBe(TOKEN_ENDPOINT);
      const init = first.init;
      if (init === undefined) {
        expect.fail('expected fetch init to be provided');
      }
      expect(init.method).toBe('POST');
      const headers = new Headers(init.headers);
      expect(headers.get('Content-Type')).toBe(
        'application/x-www-form-urlencoded'
      );
      const body = init.body;
      if (typeof body !== 'string') {
        expect.fail('expected body to be a string');
      }
      const params = new URLSearchParams(body);
      if (wantClientIdInBody) {
        expect(params.get('client_id')).toBe(clientId);
      } else {
        expect(params.has('client_id')).toBe(false);
      }
      expect(params.get('scope')).toBe('all-apis');
      expect(params.get('subject_token_type')).toBe(
        'urn:ietf:params:oauth:token-type:jwt'
      );
      expect(params.get('subject_token')).toBe(ID_TOKEN);
      expect(params.get('grant_type')).toBe(
        'urn:ietf:params:oauth:grant-type:token-exchange'
      );
    }
  );

  it('omits expiry when expires_in is not in the response', async () => {
    stubFetchJson(200, {access_token: 'test-auth-token'});
    const {provider} = staticIdTokenProvider(ID_TOKEN);
    const ts = newDatabricksOIDCTokenProvider({
      host: 'http://host.com',
      tokenEndpointProvider: fixedEndpointProvider(),
      idTokenProvider: provider,
      audience: 'token-audience',
    });
    const token = await ts.token();
    expect(token.value).toBe('test-auth-token');
    expect(token.type).toBeUndefined();
    expect(token.expiry).toBeUndefined();
  });
});
