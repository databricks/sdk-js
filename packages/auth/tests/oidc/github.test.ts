import type {HttpClient, HttpRequest} from '@databricks/sdk-core/http';
import {afterEach, describe, expect, it, vi} from 'vitest';

import {newTokenCredentials} from '../../src';
import type {GithubIdTokenProviderOptions} from '../../src/oidc/index.browser';
import {
  newDatabricksOidcTokenProvider,
  newGithubIdTokenProvider,
} from '../../src/oidc/index.browser';

const REQUEST_URL = 'https://actions.example/token?version=1';

function responseClient(
  body: string,
  statusCode = 200
): {
  client: HttpClient;
  send: ReturnType<typeof vi.fn<HttpClient['send']>>;
} {
  const send = vi.fn<HttpClient['send']>(() =>
    Promise.resolve({
      statusCode,
      headers: new Headers({'Content-Type': 'application/json'}),
      body: new Response(body).body,
    })
  );
  return {client: {send}, send};
}

describe('newGithubIdTokenProvider', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    {url: '', token: 'request-token', error: 'ActionsIDTokenRequestURL'},
    {url: REQUEST_URL, token: '', error: 'ActionsIDTokenRequestToken'},
  ])('rejects missing $error before HTTP', async ({url, token, error}) => {
    const {client, send} = responseClient('{"value":"id-token"}');
    const provider = newGithubIdTokenProvider({
      httpClient: client,
      requestUrl: url,
      requestToken: token,
    });
    await expect(provider.idToken('')).rejects.toThrow(`missing ${error}`);
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    {url: REQUEST_URL, audience: '', want: REQUEST_URL},
    {
      url: REQUEST_URL,
      audience: 'account-id',
      want: `${REQUEST_URL}&audience=account-id`,
    },
    {
      url: 'https://actions.example/token',
      audience: 'https://workspace.example/token?a=1&b=two words',
      want:
        'https://actions.example/token?audience=' +
        'https%3A%2F%2Fworkspace.example%2Ftoken%3Fa%3D1%26b%3Dtwo+words',
    },
    {
      url: `${REQUEST_URL}&audience=old`,
      audience: 'new',
      want: `${REQUEST_URL}&audience=new`,
    },
  ])(
    'requests the encoded audience $audience',
    async ({url, audience, want}) => {
      const {client, send} = responseClient(
        '{"value":"id-token","extra":true}'
      );
      const options: GithubIdTokenProviderOptions = {
        httpClient: client,
        requestUrl: url,
        requestToken: 'request-token',
      };
      const provider = newGithubIdTokenProvider(options);

      await expect(provider.idToken(audience)).resolves.toStrictEqual({
        value: 'id-token',
      });
      const request: HttpRequest = {
        url: want,
        method: 'GET',
        headers: new Headers({
          Authorization: 'Bearer request-token',
          Accept: 'application/json',
        }),
      };
      expect(send).toHaveBeenCalledExactlyOnceWith(request);
    }
  );

  it.each([
    {name: 'server error', body: '{}', status: 500},
    {name: 'unauthorized', body: '{}', status: 401},
    {name: 'redirect', body: '{}', status: 302},
    {name: 'invalid JSON', body: '{', status: 200},
    {name: 'missing value', body: '{}', status: 200},
    {name: 'wrong value type', body: '{"value":42}', status: 200},
    {name: 'empty value', body: '{"value":""}', status: 200},
  ])('rejects $name', async ({body, status}) => {
    const {client, send} = responseClient(body, status);
    const provider = newGithubIdTokenProvider({
      httpClient: client,
      requestUrl: REQUEST_URL,
      requestToken: 'request-token',
    });
    await expect(provider.idToken('')).rejects.toThrow(
      `failed to request ID token from ${REQUEST_URL}`
    );
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('preserves transport failures as causes', async () => {
    const cause = new Error('connection failed');
    const send = vi.fn<HttpClient['send']>(() => Promise.reject(cause));
    const provider = newGithubIdTokenProvider({
      httpClient: {send},
      requestUrl: REQUEST_URL,
      requestToken: 'request-token',
    });
    await expect(provider.idToken('')).rejects.toMatchObject({cause});
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('fetches a new ID token for each call', async () => {
    const {client, send} = responseClient('{"value":"first"}');
    const provider = newGithubIdTokenProvider({
      httpClient: client,
      requestUrl: REQUEST_URL,
      requestToken: 'request-token',
    });
    await expect(provider.idToken('')).resolves.toStrictEqual({value: 'first'});
    send.mockImplementationOnce(() =>
      Promise.resolve({
        statusCode: 200,
        headers: new Headers(),
        body: new Response('{"value":"second"}').body,
      })
    );
    await expect(provider.idToken('')).resolves.toStrictEqual({
      value: 'second',
    });
    expect(send).toHaveBeenCalledTimes(2);
  });

  it('exchanges the Actions ID token for Databricks bearer credentials', async () => {
    const tokenEndpoint = 'https://workspace.example/oidc/v1/token';
    const fetchMock = vi.fn<typeof fetch>((input, init) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url.startsWith(REQUEST_URL)) {
        expect(new URL(url).searchParams.get('audience')).toBe(tokenEndpoint);
        expect(init?.method).toBe('GET');
        expect(new Headers(init?.headers).get('Authorization')).toBe(
          'Bearer request-token'
        );
        return Promise.resolve(new Response('{"value":"actions-id-token"}'));
      }
      expect(url).toBe(tokenEndpoint);
      expect(init?.method).toBe('POST');
      if (typeof init?.body !== 'string') {
        expect.fail('Expected a form-encoded exchange request.');
      }
      expect(Object.fromEntries(new URLSearchParams(init.body))).toStrictEqual({
        client_id: 'client-id',
        scope: 'all-apis',
        subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
        subject_token: 'actions-id-token',
        grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
        assume_group: 'group-id',
      });
      return Promise.resolve(
        new Response('{"access_token":"databricks-access-token"}')
      );
    });
    vi.stubGlobal('fetch', fetchMock);
    const credentials = newTokenCredentials(
      'github-oidc',
      newDatabricksOidcTokenProvider({
        host: 'https://workspace.example',
        clientId: 'client-id',
        groupId: 'group-id',
        tokenEndpointProvider: () => Promise.resolve({tokenEndpoint}),
        idTokenProvider: newGithubIdTokenProvider({
          requestUrl: REQUEST_URL,
          requestToken: 'request-token',
        }),
      })
    );
    expect(credentials.name()).toBe('github-oidc');
    await expect(credentials.authHeaders()).resolves.toStrictEqual([
      {key: 'Authorization', value: 'Bearer databricks-access-token'},
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
