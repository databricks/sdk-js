import {describe, it, expect, vi} from 'vitest';
import {newGithubIdTokenProvider} from '../../src/oidc/github';

describe('newGithubIdTokenProvider', () => {
  it('should throw error when ActionsIdTokenRequestUrl is missing', async () => {
    const mockHttpClient = {
      get: vi.fn(),
    };

    const provider = newGithubIdTokenProvider(mockHttpClient, '', 'token');

    await expect(provider.idToken('audience')).rejects.toThrow(
      'missing ActionsIdTokenRequestUrl, likely not calling from a GitHub action'
    );
  });

  it('should throw error when ActionsIdTokenRequestToken is missing', async () => {
    const mockHttpClient = {
      get: vi.fn(),
    };

    const provider = newGithubIdTokenProvider(
      mockHttpClient,
      'https://actions.github.com/token',
      ''
    );

    await expect(provider.idToken('audience')).rejects.toThrow(
      'missing ActionsIdTokenRequestToken, likely not calling from a GitHub action'
    );
  });

  it('should fetch token from GitHub Actions', async () => {
    const mockHttpClient = {
      get: vi.fn().mockResolvedValue({value: 'github-id-token'}),
    };

    const provider = newGithubIdTokenProvider(
      mockHttpClient,
      'https://actions.github.com/token',
      'request-token'
    );

    const token = await provider.idToken('my-audience');

    expect(token.value).toBe('github-id-token');
    expect(mockHttpClient.get).toHaveBeenCalledWith(
      'https://actions.github.com/token&audience=my-audience',
      {Authorization: 'Bearer request-token'}
    );
  });

  it('should not append audience when empty', async () => {
    const mockHttpClient = {
      get: vi.fn().mockResolvedValue({value: 'github-id-token'}),
    };

    const provider = newGithubIdTokenProvider(
      mockHttpClient,
      'https://actions.github.com/token',
      'request-token'
    );

    await provider.idToken('');

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      'https://actions.github.com/token',
      {Authorization: 'Bearer request-token'}
    );
  });

  it('should encode audience in URL', async () => {
    const mockHttpClient = {
      get: vi.fn().mockResolvedValue({value: 'token'}),
    };

    const provider = newGithubIdTokenProvider(
      mockHttpClient,
      'https://actions.github.com/token',
      'request-token'
    );

    await provider.idToken('https://example.com/audience');

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      'https://actions.github.com/token&audience=https%3A%2F%2Fexample.com%2Faudience',
      expect.any(Object)
    );
  });
});
