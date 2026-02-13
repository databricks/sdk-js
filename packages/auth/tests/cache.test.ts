import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import type {Token} from '../src/auth';
import {tokenProviderFn} from '../src/auth';
import {newCachedTokenProvider} from '../src/cache';

describe('newCachedTokenProvider', () => {
  it('should return same instance if already cached', () => {
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => Promise.resolve({value: 'test'}))
    );
    const cached = newCachedTokenProvider(provider);
    expect(cached).toBe(provider);
  });

  it('should use default options when none provided', async () => {
    let callCount = 0;
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => {
        callCount++;
        return Promise.resolve({
          value: 'token',
          expiry: new Date(Date.now() + 3600000),
        });
      })
    );

    await provider.token();
    await provider.token();

    // Should only call once due to caching.
    expect(callCount).toBe(1);
  });

  it('should use initial cached token when provided', async () => {
    let callCount = 0;
    const cachedToken: Token = {
      value: 'cached',
      expiry: new Date(Date.now() + 3600000),
    };
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => {
        callCount++;
        return Promise.resolve({value: 'new-token'});
      }),
      {cachedToken}
    );

    const token = await provider.token();

    expect(token.value).toBe('cached');
    expect(callCount).toBe(0);
  });
});

describe('CachedTokenProvider token states', () => {
  const now = new Date('2024-01-01T00:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return fresh token without refresh', async () => {
    let callCount = 0;
    const freshToken: Token = {
      value: 'fresh',
      expiry: new Date(now.getTime() + 3600000), // 1 hour from now.
    };
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => {
        callCount++;
        return Promise.resolve({value: 'new'});
      }),
      {cachedToken: freshToken}
    );

    const token = await provider.token();

    expect(token.value).toBe('fresh');
    expect(callCount).toBe(0);
  });

  it('should refresh expired token with blocking call', async () => {
    let callCount = 0;
    const expiredToken: Token = {
      value: 'expired',
      expiry: new Date(now.getTime() - 1000), // 1 second ago.
    };
    const newToken: Token = {
      value: 'new',
      expiry: new Date(now.getTime() + 3600000),
    };
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => {
        callCount++;
        return Promise.resolve(newToken);
      }),
      {cachedToken: expiredToken}
    );

    const token = await provider.token();

    expect(token.value).toBe('new');
    expect(callCount).toBe(1);
  });

  it('should trigger async refresh for stale token and return cached', async () => {
    vi.useRealTimers(); // Use real timers for this test.

    let callCount = 0;
    const realNow = new Date();
    const staleToken: Token = {
      value: 'stale',
      expiry: new Date(realNow.getTime() + 60000), // 1 minute from now (within 3min stale period).
    };
    const newToken: Token = {
      value: 'new',
      expiry: new Date(realNow.getTime() + 3600000),
    };
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => {
        callCount++;
        return Promise.resolve(newToken);
      }),
      {cachedToken: staleToken}
    );

    // First call returns stale token immediately.
    const token = await provider.token();
    expect(token.value).toBe('stale');

    // Wait for async refresh to complete.
    await new Promise(resolve => setTimeout(resolve, 50));

    // Async refresh should have been triggered.
    expect(callCount).toBe(1);
  });

  it('should treat token with no expiry as fresh', async () => {
    let callCount = 0;
    const noExpiryToken: Token = {value: 'no-expiry'};
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => {
        callCount++;
        return Promise.resolve({value: 'new'});
      }),
      {cachedToken: noExpiryToken}
    );

    const token = await provider.token();

    expect(token.value).toBe('no-expiry');
    expect(callCount).toBe(0);
  });
});

describe('CachedTokenProvider blocking mode', () => {
  it('should only refresh when expired in blocking mode', async () => {
    const now = new Date('2024-01-01T00:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    let callCount = 0;
    const staleToken: Token = {
      value: 'stale',
      expiry: new Date(now.getTime() + 60000), // Stale but not expired.
    };
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => {
        callCount++;
        return Promise.resolve({
          value: 'new',
          expiry: new Date(now.getTime() + 3600000),
        });
      }),
      {cachedToken: staleToken, asyncRefresh: false}
    );

    // In blocking mode, stale tokens are not refreshed.
    const token = await provider.token();

    expect(token.value).toBe('stale');
    expect(callCount).toBe(0);

    vi.useRealTimers();
  });

  it('should refresh expired token in blocking mode', async () => {
    const now = new Date('2024-01-01T00:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(now);

    let callCount = 0;
    const expiredToken: Token = {
      value: 'expired',
      expiry: new Date(now.getTime() - 1000),
    };
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => {
        callCount++;
        return Promise.resolve({
          value: 'new',
          expiry: new Date(now.getTime() + 3600000),
        });
      }),
      {cachedToken: expiredToken, asyncRefresh: false}
    );

    const token = await provider.token();

    expect(token.value).toBe('new');
    expect(callCount).toBe(1);

    vi.useRealTimers();
  });
});

describe('CachedTokenProvider error handling', () => {
  it('should propagate errors from underlying provider', async () => {
    const expectedError = new Error('token fetch failed');
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => Promise.reject(expectedError))
    );

    await expect(provider.token()).rejects.toThrow(expectedError);
  });

  it('should recover from previous errors on next blocking call', async () => {
    let callCount = 0;
    let shouldFail = true;
    const provider = newCachedTokenProvider(
      tokenProviderFn(() => {
        callCount++;
        if (shouldFail) {
          return Promise.reject(new Error('temporary error'));
        }
        return Promise.resolve({value: 'success'});
      })
    );

    // First call fails.
    await expect(provider.token()).rejects.toThrow('temporary error');
    expect(callCount).toBe(1);

    // Second call should retry and succeed.
    shouldFail = false;
    const token = await provider.token();
    expect(token.value).toBe('success');
    expect(callCount).toBe(2);
  });
});

describe('CachedTokenProvider concurrent access', () => {
  it('should only make one blocking request when multiple calls are made', async () => {
    let callCount = 0;
    const provider = newCachedTokenProvider(
      tokenProviderFn(async () => {
        callCount++;
        // Simulate slow token fetch.
        await new Promise(resolve => setTimeout(resolve, 50));
        return {value: 'token', expiry: new Date(Date.now() + 3600000)};
      })
    );

    // Make multiple concurrent calls.
    const promises = Array.from({length: 10}, () => provider.token());
    const tokens = await Promise.all(promises);

    // All should get the same token.
    expect(tokens.every(t => t.value === 'token')).toBe(true);
    // Only one call should have been made.
    expect(callCount).toBe(1);
  });
});
