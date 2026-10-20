import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import type {Token} from '../src';
import {newCachedTokenProvider, tokenProviderFn} from '../src';
import {
  ASYNC_REFRESH_RETRY_BACKOFF_MS,
  CachedTokenProvider,
  MAX_ASYNC_REFRESH_LEAD_TIME_MS,
} from '../src/cache';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

// Mock value for the current time.
const NOW = 1337 * SECOND;

// Fails the test if the cache asks it for a token.
const unusedProvider = tokenProviderFn(() =>
  Promise.reject(new Error('unexpected token request'))
);

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForAsyncRefreshToComplete(
  cts: CachedTokenProvider
): Promise<void> {
  const deadline = performance.now() + 2 * SECOND;
  while (performance.now() < deadline) {
    if (!cts.isRefreshing) {
      return;
    }
    await sleep(1);
  }
  expect.fail('timed out waiting for async refresh to complete');
}

beforeEach(() => {
  // Only Date is faked, so sleeps still use real timers.
  vi.useFakeTimers({toFake: ['Date']});
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('newCachedTokenProvider', () => {
  it('returns an already cached token provider as is', () => {
    const want = new CachedTokenProvider(unusedProvider);

    expect(newCachedTokenProvider(want)).toBe(want);
  });

  it('enables async refresh and caches no token by default', () => {
    const got = newCachedTokenProvider(unusedProvider);

    if (!(got instanceof CachedTokenProvider)) {
      expect.fail('expected a CachedTokenProvider');
    }
    expect(got.nextAsyncRefresh).toBeUndefined();
    expect(got.disableAsync).toBe(false);
    expect(got.cachedToken).toBeUndefined();
  });

  it('applies the asyncRefresh and cachedToken options', () => {
    const wantDisableAsync = false;
    const wantCachedToken: Token = {value: '', expiry: new Date(42 * SECOND)};

    const got = newCachedTokenProvider(unusedProvider, {
      asyncRefresh: !wantDisableAsync,
      cachedToken: wantCachedToken,
    });

    if (!(got instanceof CachedTokenProvider)) {
      expect.fail('expected a CachedTokenProvider');
    }
    expect(got.disableAsync).toBe(wantDisableAsync);
    expect(got.cachedToken).toBe(wantCachedToken);
  });
});

describe('CachedTokenProvider', () => {
  describe('updateNextAsyncRefresh', () => {
    const testCases: {
      name: string;
      tokenTtlMs: number;
      wantAllowedAfterMs: number;
    }[] = [
      {
        name: 'standard OAuth token with 60-minute TTL',
        tokenTtlMs: 60 * MINUTE,
        wantAllowedAfterMs: 40 * MINUTE,
      },
      {
        name: 'short-lived token with 10-minute TTL',
        tokenTtlMs: 10 * MINUTE,
        wantAllowedAfterMs: 5 * MINUTE,
      },
      {
        name: 'very short token with 90-second TTL',
        tokenTtlMs: 90 * SECOND,
        wantAllowedAfterMs: 45 * SECOND,
      },
    ];

    it.each(testCases)('$name', ({tokenTtlMs, wantAllowedAfterMs}) => {
      const cts = Object.assign(new CachedTokenProvider(unusedProvider), {
        cachedToken: {value: '', expiry: new Date(NOW + tokenTtlMs)},
      });

      cts.updateNextAsyncRefresh();

      expect(cts.nextAsyncRefresh).toStrictEqual(
        new Date(NOW + wantAllowedAfterMs)
      );
    });
  });

  describe('tokenExpired', () => {
    const testCases: {name: string; token?: Token; want: boolean}[] = [
      {
        name: 'undefined token',
        want: true,
      },
      {
        name: 'expired token',
        token: {value: '', expiry: new Date(NOW - SECOND)},
        want: true,
      },
      {
        name: 'token expiring now',
        token: {value: '', expiry: new Date(NOW)},
        want: false,
      },
      {
        name: 'future token',
        token: {value: '', expiry: new Date(NOW + HOUR)},
        want: false,
      },
      {
        name: 'token without expiry',
        token: {value: ''},
        want: false,
      },
    ];

    it.each(testCases)('$name', ({token, want}) => {
      const cts = Object.assign(new CachedTokenProvider(unusedProvider), {
        cachedToken: token,
      });

      expect(cts.tokenExpired()).toBe(want);
    });
  });

  describe('canRefreshAsync', () => {
    const testCases: {
      name: string;
      token?: Token;
      nextAsyncRefresh?: Date;
      want: boolean;
    }[] = [
      {
        name: 'undefined token',
        want: false,
      },
      {
        name: 'token without expiry',
        token: {value: ''},
        want: false,
      },
      {
        name: 'before async refresh window',
        token: {value: '', expiry: new Date(NOW + HOUR)},
        nextAsyncRefresh: new Date(NOW + MINUTE),
        want: false,
      },
      {
        name: 'exactly at async refresh boundary',
        token: {value: '', expiry: new Date(NOW + HOUR)},
        nextAsyncRefresh: new Date(NOW),
        want: false,
      },
      {
        name: 'after async refresh boundary',
        token: {value: '', expiry: new Date(NOW + HOUR)},
        nextAsyncRefresh: new Date(NOW - SECOND),
        want: true,
      },
    ];

    it.each(testCases)('$name', ({token, nextAsyncRefresh, want}) => {
      const cts = Object.assign(new CachedTokenProvider(unusedProvider), {
        cachedToken: token,
        nextAsyncRefresh,
      });

      expect(cts.canRefreshAsync()).toBe(want);
    });
  });

  describe('async refresh retry', () => {
    const failTime = NOW;
    const currentToken: Token = {
      value: 'current-token',
      expiry: new Date(failTime + 5 * MINUTE),
    };
    const refreshedToken: Token = {
      value: 'refreshed-token',
      expiry: new Date(failTime + HOUR),
    };

    const testCases: {
      name: string;
      now: number;
      wantCalls: number;
      wantCache: Token;
    }[] = [
      {
        name: 'no async refresh allowed during backoff',
        now: failTime + ASYNC_REFRESH_RETRY_BACKOFF_MS - SECOND,
        wantCalls: 0,
        wantCache: currentToken,
      },
      {
        name: 'async refresh allowed after backoff',
        now: failTime + ASYNC_REFRESH_RETRY_BACKOFF_MS + SECOND,
        wantCalls: 1,
        wantCache: refreshedToken,
      },
    ];

    it.each(testCases)('$name', async ({now, wantCalls, wantCache}) => {
      vi.setSystemTime(now);
      let gotCalls = 0;
      const provider = tokenProviderFn(() => {
        gotCalls++;
        return Promise.resolve(refreshedToken);
      });
      const cts = Object.assign(new CachedTokenProvider(provider), {
        cachedToken: currentToken,
        nextAsyncRefresh: new Date(failTime + ASYNC_REFRESH_RETRY_BACKOFF_MS),
      });

      const gotToken = await cts.token();
      expect(gotToken).toBe(currentToken);

      await waitForAsyncRefreshToComplete(cts);

      expect(gotCalls).toBe(wantCalls);
      expect(cts.cachedToken).toBe(wantCache);
    });

    it('backs off after a failed async refresh', async () => {
      let gotCalls = 0;
      const provider = tokenProviderFn(() => {
        gotCalls++;
        return Promise.reject(new Error('test error'));
      });
      const cts = Object.assign(new CachedTokenProvider(provider), {
        cachedToken: currentToken,
        nextAsyncRefresh: new Date(failTime - SECOND),
      });

      expect(await cts.token()).toBe(currentToken);
      await waitForAsyncRefreshToComplete(cts);

      expect(cts.nextAsyncRefresh).toStrictEqual(
        new Date(failTime + ASYNC_REFRESH_RETRY_BACKOFF_MS)
      );

      // A call during the backoff keeps the cached token without refreshing.
      expect(await cts.token()).toBe(currentToken);
      await waitForAsyncRefreshToComplete(cts);

      expect(gotCalls).toBe(1);
      expect(cts.cachedToken).toBe(currentToken);
    });
  });

  describe('token', () => {
    const nTokenCalls = 10; // Number of concurrent calls to token().
    const testCases: {
      desc: string; // Description of the test case.
      cachedToken?: Token; // Token cached before calling token().
      disableAsync?: boolean; // Whether async refreshes are disabled.
      nextAsyncRefresh?: Date;

      returnedToken?: Token; // Token returned by the token source.
      returnedError?: Error; // Error thrown by the token source.

      wantCalls: number; // Expected number of calls to the token source.
      wantToken?: Token; // Expected token in the cache.
    }[] = [
      {
        desc: '[Blocking] no cached token',
        disableAsync: true,
        returnedToken: {value: '', expiry: new Date(NOW + HOUR)},
        wantCalls: 1,
        wantToken: {value: '', expiry: new Date(NOW + HOUR)},
      },
      {
        desc: '[Blocking] expired cached token',
        disableAsync: true,
        cachedToken: {value: '', expiry: new Date(NOW - SECOND)},
        returnedToken: {value: '', expiry: new Date(NOW + HOUR)},
        wantCalls: 1,
        wantToken: {value: '', expiry: new Date(NOW + HOUR)},
      },
      {
        desc: '[Blocking] fresh cached token',
        disableAsync: true,
        cachedToken: {value: '', expiry: new Date(NOW + HOUR)},
        wantCalls: 0,
        wantToken: {value: '', expiry: new Date(NOW + HOUR)},
      },
      {
        desc: '[Blocking] stale cached token',
        disableAsync: true,
        cachedToken: {value: '', expiry: new Date(NOW + MINUTE)},
        wantCalls: 0,
        wantToken: {value: '', expiry: new Date(NOW + MINUTE)},
      },
      {
        desc: '[Blocking] refresh error',
        disableAsync: true,
        returnedError: new Error('test error'),
        wantCalls: 10,
      },
      {
        desc: '[Blocking] recover from error',
        disableAsync: true,
        cachedToken: {value: '', expiry: new Date(NOW - MINUTE)},
        returnedToken: {value: '', expiry: new Date(NOW - HOUR)},
        wantCalls: 10,
        wantToken: {value: '', expiry: new Date(NOW - HOUR)},
      },
      {
        desc: '[Async] no cached token',
        returnedToken: {value: '', expiry: new Date(NOW + HOUR)},
        wantCalls: 1,
        wantToken: {value: '', expiry: new Date(NOW + HOUR)},
      },
      {
        desc: '[Async] expired cached token',
        cachedToken: {value: '', expiry: new Date(NOW - SECOND)},
        returnedToken: {value: '', expiry: new Date(NOW + HOUR)},
        wantCalls: 1,
        wantToken: {value: '', expiry: new Date(NOW + HOUR)},
      },
      {
        desc: '[Async] fresh cached token',
        cachedToken: {value: '', expiry: new Date(NOW + HOUR)},
        nextAsyncRefresh: new Date(NOW + MINUTE),
        wantCalls: 0,
        wantToken: {value: '', expiry: new Date(NOW + HOUR)},
      },
      {
        desc: '[Async] stale cached token',
        cachedToken: {value: '', expiry: new Date(NOW + MINUTE)},
        nextAsyncRefresh: new Date(NOW - SECOND),
        returnedToken: {value: '', expiry: new Date(NOW + HOUR)},
        wantCalls: 1,
        wantToken: {value: '', expiry: new Date(NOW + HOUR)},
      },
      {
        desc: '[Async] refresh error',
        cachedToken: {value: '', expiry: new Date(NOW + MINUTE)},
        nextAsyncRefresh: new Date(NOW - SECOND),
        returnedError: new Error('test error'),
        wantCalls: 1,
        wantToken: {value: '', expiry: new Date(NOW + MINUTE)},
      },
      {
        desc: '[Async] stale cached token, expired token returned',
        cachedToken: {value: '', expiry: new Date(NOW + MINUTE)},
        nextAsyncRefresh: new Date(NOW - SECOND),
        returnedToken: {value: '', expiry: new Date(NOW - SECOND)},
        wantCalls: 1,
        wantToken: {value: '', expiry: new Date(NOW - SECOND)},
      },
      {
        desc: '[Async] recover from error',
        cachedToken: {value: '', expiry: new Date(NOW - MINUTE)},
        returnedToken: {value: '', expiry: new Date(NOW - HOUR)},
        wantCalls: 10,
        wantToken: {value: '', expiry: new Date(NOW - HOUR)},
      },
    ];

    it.each(testCases)(
      '$desc',
      async ({
        cachedToken,
        disableAsync,
        nextAsyncRefresh,
        returnedToken,
        returnedError,
        wantCalls,
        wantToken,
      }) => {
        let gotCalls = 0;
        const provider = tokenProviderFn(async () => {
          gotCalls++;
          await sleep(10);
          if (returnedError !== undefined) {
            throw returnedError;
          }
          if (returnedToken === undefined) {
            expect.fail('unexpected token request');
          }
          return returnedToken;
        });
        const cts = Object.assign(new CachedTokenProvider(provider), {
          disableAsync: disableAsync ?? false,
          cachedToken,
          nextAsyncRefresh,
        });

        await Promise.allSettled(
          Array.from({length: nTokenCalls}, () => cts.token())
        );

        await waitForAsyncRefreshToComplete(cts);

        expect(gotCalls).toBe(wantCalls);
        expect(cts.cachedToken).toStrictEqual(wantToken);
      }
    );
  });

  it('updates nextAsyncRefresh after a blocking refresh', async () => {
    const refreshedToken: Token = {value: '', expiry: new Date(NOW + HOUR)};
    const cts = Object.assign(
      new CachedTokenProvider(
        tokenProviderFn(() => Promise.resolve(refreshedToken))
      ),
      {
        disableAsync: true,
        nextAsyncRefresh: new Date(NOW - 2 * MINUTE),
        cachedToken: {value: '', expiry: new Date(NOW - SECOND)}, // Expired.
      }
    );

    await cts.token();

    expect(cts.nextAsyncRefresh).toStrictEqual(
      new Date(NOW + HOUR - MAX_ASYNC_REFRESH_LEAD_TIME_MS)
    );
  });

  it('skips an async refresh result older than the cached token', async () => {
    const cachedToken: Token = {
      value: 'fresh-from-blocking',
      expiry: new Date(NOW + HOUR),
    };
    const olderToken: Token = {
      value: 'stale-from-async',
      expiry: new Date(NOW + 30 * MINUTE),
    };
    const cts: CachedTokenProvider = Object.assign(
      new CachedTokenProvider(
        tokenProviderFn(() => {
          // Simulate blocking refresh completing first by swapping in the
          // fresh token and bumping the generation before this refresh
          // returns.
          cts.cachedToken = cachedToken;
          cts.tokenGeneration++;
          return Promise.resolve(olderToken);
        })
      ),
      {
        cachedToken: {value: 'original', expiry: new Date(NOW + 2 * MINUTE)},
        nextAsyncRefresh: new Date(NOW - SECOND),
      }
    );

    await cts.token();

    await waitForAsyncRefreshToComplete(cts);

    expect(cts.cachedToken).toBe(cachedToken);
  });

  it('accepts a shorter-TTL token from an async refresh', async () => {
    const originalToken: Token = {
      value: 'original',
      expiry: new Date(NOW + 5 * MINUTE),
    };
    const shorterTtlToken: Token = {
      value: 'shorter-ttl',
      expiry: new Date(NOW + 2 * MINUTE),
    };
    const cts = Object.assign(
      new CachedTokenProvider(
        tokenProviderFn(() => Promise.resolve(shorterTtlToken))
      ),
      {
        cachedToken: originalToken,
        nextAsyncRefresh: new Date(NOW - SECOND),
      }
    );

    const gotToken = await cts.token();
    // The stale token is returned immediately.
    expect(gotToken).toBe(originalToken);

    await waitForAsyncRefreshToComplete(cts);

    // The shorter-TTL token should be accepted.
    expect(cts.cachedToken).toBe(shorterTtlToken);
  });

  it('does not back off after a late async refresh failure', async () => {
    const staleToken: Token = {
      value: 'stale',
      expiry: new Date(NOW + 5 * MINUTE),
    };
    const blockingResult: Token = {
      value: 'blocking-new',
      expiry: new Date(NOW + HOUR),
    };
    const cts: CachedTokenProvider = Object.assign(
      new CachedTokenProvider(
        tokenProviderFn(() => {
          // Simulate a blocking refresh completing first: update the token
          // and bump the generation before this async refresh throws.
          cts.cachedToken = blockingResult;
          cts.tokenGeneration++;
          cts.updateNextAsyncRefresh();
          return Promise.reject(new Error('late async failure'));
        })
      ),
      {
        cachedToken: staleToken,
        nextAsyncRefresh: new Date(NOW - SECOND),
      }
    );

    await cts.token();

    await waitForAsyncRefreshToComplete(cts);

    // The late async failure must not have pushed nextAsyncRefresh forward
    // because the token generation changed while it was in flight.
    expect(cts.nextAsyncRefresh).toStrictEqual(
      new Date(NOW + HOUR - MAX_ASYNC_REFRESH_LEAD_TIME_MS)
    );
    expect(cts.cachedToken).toBe(blockingResult);
  });
});
