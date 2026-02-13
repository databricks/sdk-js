/**
 * Token caching utilities for the Databricks SDK.
 */

import type {Token, TokenProvider} from './auth';

/**
 * Default duration for the stale period (3 minutes in milliseconds).
 * The number has been set arbitrarily and might be changed in the future.
 */
const DEFAULT_STALE_DURATION_MS = 3 * 60 * 1000;

/**
 * Options for creating a cached token provider.
 */
export interface CachedTokenProviderOptions {
  /**
   * Initial token to be used by the cached token provider.
   */
  cachedToken?: Token;

  /**
   * Enables or disables the asynchronous token refresh. Default is true.
   */
  asyncRefresh?: boolean;
}

/**
 * Token state represents the state of the token.
 * - fresh: The token is valid.
 * - stale: The token is valid but will expire soon.
 * - expired: The token has expired and cannot be used.
 *
 * Token state through time:
 *
 *   issue time     expiry time
 *       v               v
 *       | fresh | stale | expired -> time
 *       |     valid     |
 */
enum TokenState {
  FRESH = 0,
  STALE = 1,
  EXPIRED = 2,
}

/**
 * Symbol to identify cached token providers.
 */
const CACHED_TOKEN_PROVIDER_SYMBOL = Symbol('CachedTokenProvider');

/**
 * Wraps a TokenProvider to cache the tokens it returns.
 * By default, the cache will refresh tokens asynchronously a few minutes before
 * they expire.
 *
 * The token cache is safe for concurrent use and will guarantee that only one
 * token refresh is triggered at a time.
 *
 * The token cache does not take care of retries in case the token source
 * returns an error; it is the responsibility of the provided token source to
 * handle retries appropriately.
 *
 * If the TokenProvider is already a cached token provider (obtained by calling this
 * function), it is returned as is.
 */
export function newCachedTokenProvider(
  provider: TokenProvider,
  options?: CachedTokenProviderOptions
): TokenProvider {
  // Avoid double caching of the token source.
  if (isCachedTokenProvider(provider)) {
    return provider;
  }

  return new CachedTokenProvider(provider, options);
}

function isCachedTokenProvider(provider: TokenProvider): boolean {
  return (
    typeof provider === 'object' && CACHED_TOKEN_PROVIDER_SYMBOL in provider
  );
}

class CachedTokenProvider implements TokenProvider {
  // Symbol to identify this as a cached token provider.
  readonly [CACHED_TOKEN_PROVIDER_SYMBOL] = true;

  private readonly provider: TokenProvider;
  private readonly disableAsync: boolean;
  private readonly staleDurationMs: number;

  private cachedToken: Token | null;

  // Indicates that an async refresh is in progress.
  private isRefreshing = false;

  // Error returned by the last refresh. Async refreshes are disabled if this
  // value is not null so that the cache does not continue sending requests to
  // a potentially failing server.
  private refreshError: Error | null = null;

  // Promise for the current blocking token fetch, if any.
  private blockingPromise: Promise<Token> | null = null;

  // For testing purposes.
  private timeNow: () => Date;

  constructor(provider: TokenProvider, options?: CachedTokenProviderOptions) {
    this.provider = provider;
    this.staleDurationMs = DEFAULT_STALE_DURATION_MS;
    this.disableAsync = options?.asyncRefresh === false;
    this.cachedToken = options?.cachedToken ?? null;
    this.timeNow = (): Date => new Date();
  }

  async token(): Promise<Token> {
    if (this.disableAsync) {
      return this.blockingToken();
    }
    return this.asyncToken();
  }

  private getTokenState(): TokenState {
    if (!this.cachedToken) {
      return TokenState.EXPIRED;
    }
    if (!this.cachedToken.expiry) {
      return TokenState.FRESH; // No expiry means valid indefinitely.
    }
    const lifeSpanMs =
      this.cachedToken.expiry.getTime() - this.timeNow().getTime();
    if (lifeSpanMs <= 0) {
      return TokenState.EXPIRED;
    }
    if (lifeSpanMs <= this.staleDurationMs) {
      return TokenState.STALE;
    }
    return TokenState.FRESH;
  }

  private async asyncToken(): Promise<Token> {
    const state = this.getTokenState();

    // If token is FRESH or STALE, cachedToken is guaranteed to be non-null
    // because getTokenState() returns EXPIRED when cachedToken is null.
    if (state === TokenState.FRESH) {
      return this.getCachedTokenOrThrow();
    }
    if (state === TokenState.STALE) {
      this.triggerAsyncRefresh();
      return this.getCachedTokenOrThrow();
    }
    // Expired.
    return this.blockingToken();
  }

  /**
   * Returns the cached token or throws if it's null.
   * This should only be called when the token state is FRESH or STALE.
   */
  private getCachedTokenOrThrow(): Token {
    if (this.cachedToken === null) {
      throw new Error('cachedToken is null but state is not EXPIRED');
    }
    return this.cachedToken;
  }

  private async blockingToken(): Promise<Token> {
    // Reset error state to recover from previous failed attempts.
    this.isRefreshing = false;
    this.refreshError = null;

    // Check if token was refreshed while waiting.
    const state = this.getTokenState();
    if (state !== TokenState.EXPIRED) {
      // Token is FRESH or STALE, so cachedToken is guaranteed to be non-null.
      return this.getCachedTokenOrThrow();
    }

    // Use existing promise if one is in progress to avoid multiple simultaneous fetches.
    if (this.blockingPromise) {
      return this.blockingPromise;
    }

    this.blockingPromise = this.provider
      .token()
      .then(token => {
        this.cachedToken = token;
        this.blockingPromise = null;
        return token;
      })
      .catch((error: unknown) => {
        this.blockingPromise = null;
        throw error;
      });

    return this.blockingPromise;
  }

  private triggerAsyncRefresh(): void {
    if (this.isRefreshing || this.refreshError) {
      return;
    }

    this.isRefreshing = true;

    // Fire and forget async refresh.
    this.provider
      .token()
      .then(token => {
        this.cachedToken = token;
        this.isRefreshing = false;
      })
      .catch((error: unknown) => {
        this.refreshError =
          error instanceof Error ? error : new Error(String(error));
        this.isRefreshing = false;
      });
  }

  /**
   * For testing: allows injecting a custom time function.
   * @internal
   */
  setTimeNow(fn: () => Date): void {
    this.timeNow = fn;
  }
}
