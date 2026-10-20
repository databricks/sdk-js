import type {Token, TokenProvider} from './auth';

// Maximum time before expiry when async refreshes may start. This value is
// chosen to provide robustness for standard OAuth tokens, supporting 99.95%
// availability, adding breathing room over the existing 99.99% SLA.
export const MAX_ASYNC_REFRESH_LEAD_TIME_MS = 20 * 60 * 1000;

// Minimum wait time before retrying a failed async refresh. This prevents
// hammering a failing server while still recovering quickly from transient
// errors (e.g., brief network issues). With a 20-minute max refresh window,
// this allows up to ~20 retries before the token expires and forces a
// blocking call.
export const ASYNC_REFRESH_RETRY_BACKOFF_MS = 60 * 1000;

// computeAsyncRefreshLeadTime calculates how long before expiry async
// refreshes may start for a token with the given remaining TTL.
//
// Formula: min(TTL × 0.5, MAX_ASYNC_REFRESH_LEAD_TIME_MS)
//
// Edge cases:
//   - TTL <= 0 (expired or no expiry): returns 0.
//   - Very short TTL (e.g., 2 seconds): returns TTL / 2 without minimum enforcement.
//   - Standard OAuth (60 minutes): returns 20 minutes (capped at max).
//   - FastPath (10 minutes): returns 5 minutes.
function computeAsyncRefreshLeadTime(ttlMs: number): number {
  if (ttlMs <= 0) {
    return 0;
  }

  const leadTimeMs = ttlMs / 2;
  if (leadTimeMs > MAX_ASYNC_REFRESH_LEAD_TIME_MS) {
    return MAX_ASYNC_REFRESH_LEAD_TIME_MS;
  }
  return leadTimeMs;
}

export interface CachedTokenProviderOptions {
  /** Sets the initial token to be used by a cached token source. */
  cachedToken?: Token;

  /** Enables or disables the asynchronous token refresh. */
  asyncRefresh?: boolean;
}

/**
 * Wraps a {@link TokenProvider} to cache the tokens it returns. By default,
 * the cache will refresh tokens asynchronously a few minutes before they
 * expire.
 *
 * The token cache is safe for concurrent use by multiple callers and will
 * guarantee that only one token refresh is triggered at a time.
 *
 * The token cache does not take care of retries in case the token source
 * throws an error; it is the responsibility of the provided token source to
 * handle retries appropriately.
 *
 * If the TokenProvider is already a cached token source (obtained by calling
 * this function), it is returned as is.
 */
export function newCachedTokenProvider(
  ts: TokenProvider,
  options?: CachedTokenProviderOptions
): TokenProvider {
  // This is meant as a niche optimization to avoid double caching of the
  // token source in situations where the caller needs caching guarantees
  // but does not know if the token source is already cached.
  if (ts instanceof CachedTokenProvider) {
    return ts;
  }

  const cts = new CachedTokenProvider(ts);
  cts.disableAsync = options?.asyncRefresh === false;
  cts.cachedToken = options?.cachedToken;

  // If an initial token was provided via the cachedToken option, compute the
  // time after which async refreshes may be attempted based on the token TTL
  // available at construction time.
  if (cts.cachedToken !== undefined) {
    cts.updateNextAsyncRefresh();
  }

  return cts;
}

export class CachedTokenProvider implements TokenProvider {
  // If true, only refresh the token with a blocking call when it is expired.
  disableAsync = false;

  // Earliest time when an async refresh may be attempted for cachedToken.
  // Computed from the token TTL at the moment the token is cached. If an
  // async refresh fails, this timestamp is pushed forward by
  // ASYNC_REFRESH_RETRY_BACKOFF_MS to delay the next retry.
  nextAsyncRefresh: Date | undefined;

  cachedToken: Token | undefined;

  // Indicates that an async refresh is in progress. This is used to prevent
  // multiple async refreshes from being triggered at the same time.
  isRefreshing = false;

  // Monotonic counter incremented each time cachedToken is replaced at
  // runtime. Async refreshes snapshot this value before starting and skip
  // their result if it has changed, indicating that another path (e.g. a
  // blocking refresh) already updated the token.
  tokenGeneration = 0;

  // Held for the whole of a blocking refresh, and while an async refresh
  // stores its result.
  private readonly mu = new Mutex();

  constructor(
    // The token source to obtain tokens from.
    readonly tokenProvider: TokenProvider
  ) {}

  /**
   * Returns a token from the cache or fetches a new one if the current token
   * is expired.
   */
  token(): Promise<Token> {
    if (this.disableAsync) {
      return this.blockingToken();
    }
    return this.asyncToken();
  }

  // updateNextAsyncRefresh recomputes nextAsyncRefresh from the current
  // cachedToken's TTL. It must be called immediately after cachedToken is set.
  updateNextAsyncRefresh(): void {
    const expiry = this.cachedToken?.expiry;
    if (expiry === undefined) {
      this.nextAsyncRefresh = undefined;
      return;
    }
    const ttlMs = expiry.getTime() - Date.now();
    this.nextAsyncRefresh = new Date(
      expiry.getTime() - computeAsyncRefreshLeadTime(ttlMs)
    );
  }

  // tokenExpired reports whether the current token is missing or unusable.
  tokenExpired(): boolean {
    if (this.cachedToken === undefined) {
      return true;
    }
    if (this.cachedToken.expiry === undefined) {
      return false; // An undefined expiry means that the token is permanently valid.
    }
    return Date.now() > this.cachedToken.expiry.getTime();
  }

  // canRefreshAsync reports whether the current token has entered the async
  // refresh window.
  canRefreshAsync(): boolean {
    if (this.cachedToken?.expiry === undefined) {
      return false;
    }
    return (
      this.nextAsyncRefresh === undefined ||
      Date.now() > this.nextAsyncRefresh.getTime()
    );
  }

  private asyncToken(): Promise<Token> {
    const t = this.cachedToken;
    const tokenExpired = this.tokenExpired();
    const canRefreshAsync = !tokenExpired && this.canRefreshAsync();

    if (t === undefined || tokenExpired) {
      return this.blockingToken();
    }
    if (canRefreshAsync) {
      this.triggerAsyncRefresh();
    }
    return Promise.resolve(t);
  }

  private async blockingToken(): Promise<Token> {
    // The lock is kept for the entire operation to ensure that only one
    // blockingToken operation is running at a time.
    const unlock = await this.mu.lock();
    try {
      // It's possible that the token got refreshed (either by a blockingToken
      // or an asyncRefresh call) while this particular call was waiting to
      // acquire the mutex. This check avoids refreshing the token again in
      // such cases.
      const cached = this.cachedToken;
      if (cached !== undefined && !this.tokenExpired()) {
        return cached;
      }

      const t = await this.tokenProvider.token();
      this.cachedToken = t;
      this.tokenGeneration++;
      this.updateNextAsyncRefresh();
      return t;
    } finally {
      unlock();
    }
  }

  private triggerAsyncRefresh(): void {
    if (this.isRefreshing || this.tokenExpired() || !this.canRefreshAsync()) {
      return;
    }

    const genAtSubmit = this.tokenGeneration;
    this.isRefreshing = true;
    void this.asyncRefresh(genAtSubmit);
  }

  private async asyncRefresh(genAtSubmit: number): Promise<void> {
    let t: Token | undefined;
    try {
      t = await this.tokenProvider.token();
    } catch {
      t = undefined;
    }

    const unlock = await this.mu.lock();
    try {
      this.isRefreshing = false;
      if (this.tokenGeneration !== genAtSubmit) {
        return; // Token was already updated by another path.
      }
      if (t === undefined) {
        this.nextAsyncRefresh = new Date(
          Date.now() + ASYNC_REFRESH_RETRY_BACKOFF_MS
        );
        return;
      }
      this.cachedToken = t;
      this.tokenGeneration++;
      this.updateNextAsyncRefresh();
    } finally {
      unlock();
    }
  }
}

// A mutual exclusion lock for async code. Callers acquire the lock in the
// order in which they call lock().
class Mutex {
  private tail: Promise<undefined> = Promise.resolve(undefined);

  // Resolves once the lock is held, to a function that releases it.
  async lock(): Promise<() => void> {
    const previous = this.tail;
    const {promise, resolve} = Promise.withResolvers<undefined>();
    this.tail = promise;
    await previous;
    return () => {
      resolve(undefined);
    };
  }
}
