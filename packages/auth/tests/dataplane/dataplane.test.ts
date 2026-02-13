import {describe, it, expect, vi} from 'vitest';
import {newEndpointTokenProvider} from '../../src/dataplane/dataplane';
import type {Token} from '../../src/auth';
import {tokenProviderFn} from '../../src/auth';

describe('newEndpointTokenProvider', () => {
  it('should fetch data plane token using control plane token', async () => {
    const controlPlaneToken: Token = {
      value: 'cp-token',
      expiry: new Date(Date.now() + 3600000),
    };
    const dataPlaneToken: Token = {
      value: 'dp-token',
      expiry: new Date(Date.now() + 3600000),
    };

    const mockOAuthClient = {
      getOAuthToken: vi.fn().mockResolvedValue(dataPlaneToken),
    };

    const controlPlaneProvider = tokenProviderFn(() =>
      Promise.resolve(controlPlaneToken)
    );

    const provider = newEndpointTokenProvider(
      mockOAuthClient,
      controlPlaneProvider
    );

    const token = await provider.token(
      'https://dataplane.databricks.com',
      'auth-details'
    );

    expect(token.value).toBe('dp-token');
    expect(mockOAuthClient.getOAuthToken).toHaveBeenCalledWith(
      'auth-details',
      controlPlaneToken
    );
  });

  it('should cache token providers per endpoint and auth details', async () => {
    let callCount = 0;
    const dataPlaneToken: Token = {
      value: 'dp-token',
      expiry: new Date(Date.now() + 3600000),
    };

    const mockOAuthClient = {
      getOAuthToken: vi.fn().mockImplementation(() => {
        callCount++;
        return Promise.resolve(dataPlaneToken);
      }),
    };

    const controlPlaneProvider = tokenProviderFn(() =>
      Promise.resolve({
        value: 'cp-token',
        expiry: new Date(Date.now() + 3600000),
      })
    );

    const provider = newEndpointTokenProvider(
      mockOAuthClient,
      controlPlaneProvider
    );

    // Same endpoint and auth details should use cached provider.
    await provider.token('endpoint1', 'auth1');
    await provider.token('endpoint1', 'auth1');
    expect(callCount).toBe(1);

    // Different auth details should create new provider.
    await provider.token('endpoint1', 'auth2');
    expect(callCount).toBe(2);

    // Different endpoint should create new provider.
    await provider.token('endpoint2', 'auth1');
    expect(callCount).toBe(3);
  });

  it('should cache control plane token provider', async () => {
    let controlPlaneCallCount = 0;
    const controlPlaneToken: Token = {
      value: 'cp-token',
      expiry: new Date(Date.now() + 3600000),
    };

    const mockOAuthClient = {
      getOAuthToken: vi.fn().mockResolvedValue({
        value: 'dp-token',
        expiry: new Date(Date.now() + 3600000),
      }),
    };

    const controlPlaneProvider = tokenProviderFn(() => {
      controlPlaneCallCount++;
      return Promise.resolve(controlPlaneToken);
    });

    const provider = newEndpointTokenProvider(
      mockOAuthClient,
      controlPlaneProvider
    );

    // Multiple calls should only fetch control plane token once due to caching.
    await provider.token('endpoint1', 'auth1');
    await provider.token('endpoint2', 'auth2');

    // Control plane token provider is cached, so even with two different endpoints,
    // the control plane token is only fetched once (due to caching).
    expect(controlPlaneCallCount).toBe(1);
  });

  it('should propagate errors from OAuth client', async () => {
    const expectedError = new Error('OAuth error');
    const mockOAuthClient = {
      getOAuthToken: vi.fn().mockRejectedValue(expectedError),
    };

    const controlPlaneProvider = tokenProviderFn(() =>
      Promise.resolve({
        value: 'cp-token',
        expiry: new Date(Date.now() + 3600000),
      })
    );

    const provider = newEndpointTokenProvider(
      mockOAuthClient,
      controlPlaneProvider
    );

    await expect(provider.token('endpoint', 'auth')).rejects.toThrow(
      expectedError
    );
  });

  it('should propagate errors from control plane provider', async () => {
    const expectedError = new Error('Control plane error');
    const mockOAuthClient = {
      getOAuthToken: vi.fn(),
    };

    const controlPlaneProvider = tokenProviderFn(() =>
      Promise.reject(expectedError)
    );

    const provider = newEndpointTokenProvider(
      mockOAuthClient,
      controlPlaneProvider
    );

    await expect(provider.token('endpoint', 'auth')).rejects.toThrow(
      expectedError
    );
  });
});
