import {afterEach, describe, expect, it, vi} from 'vitest';
import {ZodError} from 'zod';

import {idTokenProviderFn} from '../../src/oidc/oidc';
import type {OAuthAuthorizationServer} from '../../src/oidc/tokensource';
import {newDatabricksOidcTokenProvider} from '../../src/oidc/tokensource';

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

function requestParams(request: CapturedRequest): URLSearchParams {
  const body = request.init?.body;
  if (typeof body !== 'string') {
    expect.fail('expected body to be a string');
  }
  return new URLSearchParams(body);
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

describe('newDatabricksOidcTokenProvider', () => {
  const NOW = 1_700_000_000_000;

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  const rejectCases: {
    name: string;
    host?: string;
    idTokenError?: string;
    fetchStub?: () => void;
    wantError: string | RegExp | typeof ZodError;
  }[] = [
    {
      name: 'rejects with "missing Host" when host is empty',
      host: '',
      wantError: 'missing Host',
    },
    {
      name: 'propagates errors from the IdTokenProvider',
      idTokenError: 'error getting id token',
      wantError: 'error getting id token',
    },
    {
      name: 'rejects when the token endpoint returns a non-2xx response',
      fetchStub: (): void => {
        stubFetchText(500, 'Internal Server Error');
      },
      wantError: /token request failed with status 500/,
    },
    {
      name: 'rejects when the token endpoint returns a malformed body',
      fetchStub: (): void => {
        stubFetchJson(200, {foo: 'bar'});
      },
      wantError: ZodError,
    },
  ];

  it.each(rejectCases)(
    '$name',
    async ({host, idTokenError, fetchStub, wantError}) => {
      fetchStub?.();
      const idTokenProvider =
        idTokenError !== undefined
          ? idTokenProviderFn(() => Promise.reject(new Error(idTokenError)))
          : staticIdTokenProvider(ID_TOKEN).provider;
      const ts = newDatabricksOidcTokenProvider({
        host: host ?? 'http://host.com',
        tokenEndpointProvider: fixedEndpointProvider(),
        idTokenProvider,
        audience: 'token-audience',
      });
      await expect(ts.token()).rejects.toThrow(wantError);
    }
  );

  const audienceCases: {
    name: string;
    clientId?: string;
    accountId?: string;
    audience?: string;
    groupId?: string;
    wantAudience: string;
    wantClientIdInBody: boolean;
    wantGroupId: string | null;
  }[] = [
    {
      name: 'WIF workspace uses configured audience and sends client_id',
      clientId: 'client-id',
      audience: 'token-audience',
      wantAudience: 'token-audience',
      wantClientIdInBody: true,
      wantGroupId: null,
    },
    {
      name: 'WIF account uses configured audience and sends client_id',
      clientId: 'client-id',
      accountId: 'ac123',
      audience: 'token-audience',
      wantAudience: 'token-audience',
      wantClientIdInBody: true,
      wantGroupId: null,
    },
    {
      name: 'account default audience falls back to accountId',
      clientId: 'client-id',
      accountId: 'ac123',
      wantAudience: 'ac123',
      wantClientIdInBody: true,
      wantGroupId: null,
    },
    {
      name: 'workspace default audience falls back to the token endpoint',
      clientId: 'client-id',
      wantAudience: TOKEN_ENDPOINT,
      wantClientIdInBody: true,
      wantGroupId: null,
    },
    {
      name: 'account-wide federation omits client_id from the body',
      audience: 'token-audience',
      wantAudience: 'token-audience',
      wantClientIdInBody: false,
      wantGroupId: null,
    },
    {
      name: 'WIF sends the requested group role',
      clientId: 'client-id',
      audience: 'token-audience',
      groupId: 'group-123',
      wantAudience: 'token-audience',
      wantClientIdInBody: true,
      wantGroupId: 'group-123',
    },
    {
      name: 'empty group ID omits group role from WIF',
      clientId: 'client-id',
      audience: 'token-audience',
      groupId: '',
      wantAudience: 'token-audience',
      wantClientIdInBody: true,
      wantGroupId: null,
    },
  ];

  it.each(audienceCases)(
    '$name',
    async ({
      clientId,
      accountId,
      audience,
      groupId,
      wantAudience,
      wantClientIdInBody,
      wantGroupId,
    }) => {
      vi.setSystemTime(NOW);
      const {captured} = stubFetchJson(200, {
        token_type: 'access-token',
        access_token: 'test-auth-token',
        expires_in: 3600,
      });
      const {provider, audiences} = staticIdTokenProvider(ID_TOKEN);

      const ts = newDatabricksOidcTokenProvider({
        host: 'http://host.com',
        tokenEndpointProvider: fixedEndpointProvider(),
        idTokenProvider: provider,
        ...(clientId !== undefined && {clientId}),
        ...(accountId !== undefined && {accountId}),
        ...(audience !== undefined && {audience}),
        ...(groupId !== undefined && {groupId}),
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
      expect(params.get('assume_group')).toBe(wantGroupId);
    }
  );

  it('retains the group role across repeated token exchanges', async () => {
    const {captured} = stubFetchJson(200, {access_token: 'token'});
    const {provider} = staticIdTokenProvider(ID_TOKEN);
    const ts = newDatabricksOidcTokenProvider({
      host: 'http://host.com',
      tokenEndpointProvider: fixedEndpointProvider(),
      idTokenProvider: provider,
      audience: 'token-audience',
      groupId: 'group-123',
    });

    await ts.token();
    await ts.token();

    expect(captured).toHaveLength(2);
    for (const request of captured) {
      expect(requestParams(request).get('assume_group')).toBe('group-123');
    }
  });

  it('keeps group roles isolated between OIDC providers', async () => {
    const captured: CapturedRequest[] = [];
    const fetchMock = vi.fn<typeof fetch>((input, init) => {
      const request = {url: urlOf(input), init};
      captured.push(request);
      const group = requestParams(request).get('assume_group') ?? 'normal';
      return Promise.resolve(
        new Response(JSON.stringify({access_token: `${group}-token`}), {
          status: 200,
          headers: {'Content-Type': 'application/json'},
        })
      );
    });
    vi.stubGlobal('fetch', fetchMock);
    const first = newDatabricksOidcTokenProvider({
      host: 'http://host.com',
      tokenEndpointProvider: fixedEndpointProvider(),
      idTokenProvider: staticIdTokenProvider(ID_TOKEN).provider,
      audience: 'token-audience',
      groupId: 'group-a',
    });
    const second = newDatabricksOidcTokenProvider({
      host: 'http://host.com',
      tokenEndpointProvider: fixedEndpointProvider(),
      idTokenProvider: staticIdTokenProvider(ID_TOKEN).provider,
      audience: 'token-audience',
      groupId: 'group-b',
    });

    await expect(first.token()).resolves.toMatchObject({
      value: 'group-a-token',
    });
    await expect(second.token()).resolves.toMatchObject({
      value: 'group-b-token',
    });

    expect(
      captured.map(request => requestParams(request).get('assume_group'))
    ).toEqual(['group-a', 'group-b']);
  });

  it('does not retry a rejected grouped exchange without the group', async () => {
    const {captured} = stubFetchText(
      400,
      '{"error":"invalid_request","error_description":"assume_group is not supported"}'
    );
    const {provider} = staticIdTokenProvider(ID_TOKEN);
    const ts = newDatabricksOidcTokenProvider({
      host: 'http://host.com',
      tokenEndpointProvider: fixedEndpointProvider(),
      idTokenProvider: provider,
      audience: 'token-audience',
      groupId: 'group-123',
    });

    let caught: unknown;
    try {
      await ts.token();
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(Error);
    expect((caught as Error).message).toContain('invalid_request');
    expect((caught as Error).message).toContain(
      'assume_group is not supported'
    );
    expect(captured).toHaveLength(1);
    expect(requestParams(captured[0]).get('assume_group')).toBe('group-123');
  });

  const groupedEndpointCases: {
    name: string;
    tokenEndpoint: string;
    clientId?: string;
  }[] = [
    {
      name: 'workspace WIF with client_id',
      tokenEndpoint: 'https://host.com/oidc/v1/token',
      clientId: 'client-id',
    },
    {
      name: 'account or unified WIF with client_id',
      tokenEndpoint: 'https://host.com/oidc/accounts/account-id/v1/token',
      clientId: 'client-id',
    },
    {
      name: 'account-wide federation without client_id',
      tokenEndpoint: 'https://host.com/oidc/accounts/account-id/v1/token',
    },
  ];

  it.each(groupedEndpointCases)(
    'sends group role to the $name endpoint shape',
    async ({tokenEndpoint, clientId}) => {
      const {captured} = stubFetchJson(200, {access_token: 'token'});
      const ts = newDatabricksOidcTokenProvider({
        host: 'https://host.com',
        tokenEndpointProvider: () => Promise.resolve({tokenEndpoint}),
        idTokenProvider: staticIdTokenProvider(ID_TOKEN).provider,
        audience: 'token-audience',
        groupId: 'group-123',
        ...(clientId !== undefined && {clientId}),
      });

      await ts.token();

      expect(captured).toHaveLength(1);
      expect(captured[0].url).toBe(tokenEndpoint);
      const params = requestParams(captured[0]);
      expect(params.get('assume_group')).toBe('group-123');
      expect(params.has('client_id')).toBe(clientId !== undefined);
    }
  );

  it('omits expiry when expires_in is not in the response', async () => {
    stubFetchJson(200, {access_token: 'test-auth-token'});
    const {provider} = staticIdTokenProvider(ID_TOKEN);
    const ts = newDatabricksOidcTokenProvider({
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
