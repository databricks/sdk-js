import {describe, it, expect} from 'vitest';
import type {Token, Header} from '../src/auth';
import {tokenProviderFn, newTokenCredentials} from '../src/auth';

describe('tokenProviderFn', () => {
  it('should adapt a function to TokenProvider interface', async () => {
    const expectedToken: Token = {value: 'test-token', type: 'Bearer'};
    const provider = tokenProviderFn(() => Promise.resolve(expectedToken));

    const token = await provider.token();
    expect(token).toEqual(expectedToken);
  });

  it('should propagate errors from the function', async () => {
    const expectedError = new Error('token fetch failed');
    const provider = tokenProviderFn(() => Promise.reject(expectedError));

    await expect(provider.token()).rejects.toThrow(expectedError);
  });
});

describe('newTokenCredentials', () => {
  it('should return Bearer authorization header by default', async () => {
    const provider = tokenProviderFn(() =>
      Promise.resolve({value: 'my-token'})
    );
    const credentials = newTokenCredentials(provider);

    const headers = await credentials.authHeaders();
    expect(headers).toEqual<Header[]>([
      {key: 'Authorization', value: 'Bearer my-token'},
    ]);
  });

  it('should use custom token type when provided', async () => {
    const provider = tokenProviderFn(() =>
      Promise.resolve({
        value: 'custom-token',
        type: 'Basic',
      })
    );
    const credentials = newTokenCredentials(provider);

    const headers = await credentials.authHeaders();
    expect(headers).toEqual<Header[]>([
      {key: 'Authorization', value: 'Basic custom-token'},
    ]);
  });

  it('should also implement TokenProvider interface', async () => {
    const expectedToken: Token = {value: 'test-token', expiry: new Date()};
    const provider = tokenProviderFn(() => Promise.resolve(expectedToken));
    const credentials = newTokenCredentials(provider);

    const token = await credentials.token();
    expect(token).toEqual(expectedToken);
  });

  it('should propagate errors from the underlying provider', async () => {
    const expectedError = new Error('provider error');
    const provider = tokenProviderFn(() => Promise.reject(expectedError));
    const credentials = newTokenCredentials(provider);

    await expect(credentials.authHeaders()).rejects.toThrow(expectedError);
  });
});
