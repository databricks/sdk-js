import {describe, it, expect} from 'vitest';
import type {Token, Header} from '../src/auth';
import {newTokenCredentials, tokenProviderFn} from '../src/auth';

describe('tokenProviderFn', () => {
  const cases: {name: string; token: Token}[] = [
    {name: 'bearer token', token: {value: 'test-token', type: 'Bearer'}},
    {name: 'token without type', token: {value: 'abc123'}},
    {name: 'token with expiry', token: {value: 'x', expiry: new Date()}},
  ];

  it.each(cases)(
    'should return the expected token for $name',
    async ({token}) => {
      const provider = tokenProviderFn(() => Promise.resolve(token));
      const result = await provider.token();
      expect(result).toEqual(token);
    }
  );

  it('should propagate errors from the function', async () => {
    const error = new Error('token fetch failed');
    const provider = tokenProviderFn(() => Promise.reject(error));
    await expect(provider.token()).rejects.toThrow(error);
  });
});

describe('newTokenCredentials', () => {
  const headerCases: {name: string; token: Token; expected: Header[]}[] = [
    {
      name: 'defaults to Bearer scheme',
      token: {value: 'my-token'},
      expected: [{key: 'Authorization', value: 'Bearer my-token'}],
    },
    {
      name: 'uses custom token type as scheme',
      token: {value: 'custom-token', type: 'Basic'},
      expected: [{key: 'Authorization', value: 'Basic custom-token'}],
    },
    {
      name: 'uses DPoP scheme when specified',
      token: {value: 'dpop-token', type: 'DPoP'},
      expected: [{key: 'Authorization', value: 'DPoP dpop-token'}],
    },
  ];

  it.each(headerCases)(
    'should produce correct auth header when $name',
    async ({token, expected}) => {
      const provider = tokenProviderFn(() => Promise.resolve(token));
      const credentials = newTokenCredentials('test-strategy', provider);
      const headers = await credentials.authHeaders();
      expect(headers).toEqual(expected);
    }
  );

  it('should delegate token() to the underlying provider', async () => {
    const expectedToken: Token = {value: 'test-token', expiry: new Date()};
    const provider = tokenProviderFn(() => Promise.resolve(expectedToken));
    const credentials = newTokenCredentials('test-strategy', provider);
    const token = await credentials.token();
    expect(token).toEqual(expectedToken);
  });

  it('exposes the strategy name on the credentials', () => {
    const provider = tokenProviderFn(() => Promise.resolve({value: 'v'}));
    const credentials = newTokenCredentials('oauth-m2m', provider);
    expect(credentials.name()).toBe('oauth-m2m');
  });

  it('should propagate errors from the underlying provider', async () => {
    const error = new Error('provider error');
    const provider = tokenProviderFn(() => Promise.reject(error));
    const credentials = newTokenCredentials('test-strategy', provider);
    await expect(credentials.authHeaders()).rejects.toThrow(error);
  });
});
