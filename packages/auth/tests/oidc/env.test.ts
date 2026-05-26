import {afterEach, describe, expect, it, vi} from 'vitest';

import {newEnvIdTokenProvider} from '../../src/oidc/env';

describe('newEnvIdTokenProvider', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const successCases: {
    name: string;
    envName: string;
    envValue: string;
    want: string;
  }[] = [
    {
      name: 'success',
      envName: 'OIDC_TEST_TOKEN_SUCCESS',
      envValue: 'test-token-123',
      want: 'test-token-123',
    },
    {
      name: 'different variable name',
      envName: 'ANOTHER_OIDC_TOKEN',
      envValue: 'another-token-456',
      want: 'another-token-456',
    },
  ];

  it.each(successCases)('$name', async ({envName, envValue, want}) => {
    vi.stubEnv(envName, envValue);
    const provider = newEnvIdTokenProvider(envName);
    const token = await provider.idToken('any-audience');
    expect(token.value).toBe(want);
  });

  it('does not cache and re-reads the environment variable each call', async () => {
    const envName = 'OIDC_TEST_TOKEN_REREAD';
    const provider = newEnvIdTokenProvider(envName);

    vi.stubEnv(envName, 'first');
    expect((await provider.idToken('')).value).toBe('first');

    vi.stubEnv(envName, 'second');
    expect((await provider.idToken('')).value).toBe('second');
  });

  it('ignores the audience argument', async () => {
    const envName = 'OIDC_TEST_TOKEN_AUDIENCE';
    vi.stubEnv(envName, 'tok');
    const provider = newEnvIdTokenProvider(envName);
    expect((await provider.idToken('audience-a')).value).toBe('tok');
    expect((await provider.idToken('audience-b')).value).toBe('tok');
  });

  const errorCases: {
    name: string;
    envName: string;
    envValue?: string;
  }[] = [
    {
      name: 'missing env var',
      envName: 'OIDC_TEST_TOKEN_MISSING',
    },
    {
      name: 'empty env var',
      envName: 'OIDC_TEST_TOKEN_EMPTY',
      envValue: '',
    },
  ];

  it.each(errorCases)('rejects on $name', async ({envName, envValue}) => {
    if (envValue !== undefined) {
      vi.stubEnv(envName, envValue);
    }
    const provider = newEnvIdTokenProvider(envName);
    await expect(provider.idToken('')).rejects.toThrow(
      `missing env var "${envName}"`
    );
  });
});
