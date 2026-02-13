import {describe, it, expect, vi} from 'vitest';
import {newDatabricksOidcTokenProvider} from '../../src/oidc/tokensource';
import {idTokenProviderFn} from '../../src/oidc/oidc';

describe('newDatabricksOidcTokenProvider', () => {
  it('should throw error when host is missing', async () => {
    const provider = newDatabricksOidcTokenProvider({
      host: '',
      tokenEndpointProvider: () =>
        Promise.resolve({
          tokenEndpoint: 'https://example.com/token',
        }),
      idTokenProvider: idTokenProviderFn(() =>
        Promise.resolve({value: 'id-token'})
      ),
    });

    await expect(provider.token()).rejects.toThrow('missing Host');
  });

  it('should exchange id token for access token', async () => {
    const mockHttpClient = {
      post: vi.fn().mockResolvedValue({
        access_token: 'access-token-123',
        token_type: 'Bearer',
        expires_in: 3600,
      }),
    };

    const provider = newDatabricksOidcTokenProvider({
      host: 'https://workspace.databricks.com',
      clientId: 'client-123',
      tokenEndpointProvider: () =>
        Promise.resolve({
          tokenEndpoint: 'https://accounts.databricks.com/oidc/token',
        }),
      idTokenProvider: idTokenProviderFn(() =>
        Promise.resolve({value: 'my-id-token'})
      ),
      httpClient: mockHttpClient,
    });

    const token = await provider.token();

    expect(token.value).toBe('access-token-123');
    expect(token.type).toBe('Bearer');
    expect(token.expiry).toBeDefined();
    expect(mockHttpClient.post).toHaveBeenCalledWith(
      'https://accounts.databricks.com/oidc/token',
      expect.any(URLSearchParams)
    );
  });

  it('should use custom audience when provided', async () => {
    let capturedAudience = '';
    const mockHttpClient = {
      post: vi.fn().mockResolvedValue({
        access_token: 'token',
        token_type: 'Bearer',
      }),
    };

    const provider = newDatabricksOidcTokenProvider({
      host: 'https://workspace.databricks.com',
      audience: 'custom-audience',
      tokenEndpointProvider: () =>
        Promise.resolve({
          tokenEndpoint: 'https://accounts.databricks.com/oidc/token',
        }),
      idTokenProvider: idTokenProviderFn(audience => {
        capturedAudience = audience;
        return Promise.resolve({value: 'id-token'});
      }),
      httpClient: mockHttpClient,
    });

    await provider.token();

    expect(capturedAudience).toBe('custom-audience');
  });

  it('should use accountId as audience when no custom audience', async () => {
    let capturedAudience = '';
    const mockHttpClient = {
      post: vi.fn().mockResolvedValue({
        access_token: 'token',
        token_type: 'Bearer',
      }),
    };

    const provider = newDatabricksOidcTokenProvider({
      host: 'https://accounts.databricks.com',
      accountId: 'account-123',
      tokenEndpointProvider: () =>
        Promise.resolve({
          tokenEndpoint: 'https://accounts.databricks.com/oidc/token',
        }),
      idTokenProvider: idTokenProviderFn(audience => {
        capturedAudience = audience;
        return Promise.resolve({value: 'id-token'});
      }),
      httpClient: mockHttpClient,
    });

    await provider.token();

    expect(capturedAudience).toBe('account-123');
  });

  it('should use token endpoint as audience when no other audience', async () => {
    let capturedAudience = '';
    const mockHttpClient = {
      post: vi.fn().mockResolvedValue({
        access_token: 'token',
        token_type: 'Bearer',
      }),
    };

    const provider = newDatabricksOidcTokenProvider({
      host: 'https://workspace.databricks.com',
      tokenEndpointProvider: () =>
        Promise.resolve({
          tokenEndpoint: 'https://accounts.databricks.com/oidc/token',
        }),
      idTokenProvider: idTokenProviderFn(audience => {
        capturedAudience = audience;
        return Promise.resolve({value: 'id-token'});
      }),
      httpClient: mockHttpClient,
    });

    await provider.token();

    expect(capturedAudience).toBe('https://accounts.databricks.com/oidc/token');
  });

  it('should handle token without expiry', async () => {
    const mockHttpClient = {
      post: vi.fn().mockResolvedValue({
        access_token: 'token',
        token_type: 'Bearer',
      }),
    };

    const provider = newDatabricksOidcTokenProvider({
      host: 'https://workspace.databricks.com',
      tokenEndpointProvider: () =>
        Promise.resolve({
          tokenEndpoint: 'https://accounts.databricks.com/oidc/token',
        }),
      idTokenProvider: idTokenProviderFn(() =>
        Promise.resolve({value: 'id-token'})
      ),
      httpClient: mockHttpClient,
    });

    const token = await provider.token();

    expect(token.expiry).toBeUndefined();
  });
});
