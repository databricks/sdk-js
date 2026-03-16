import type {Limiter} from './limiter';
import type {Retrier} from './retrier';

/**
 * Option is an option used by execute to control the behavior of an API call.
 * An Option essentially acts as a convenient way to configure Options.
 */
export interface Option {
  apply(options: Options): void;
}

/** Options to control the behavior of an API call. */
export interface Options {
  // Provides a new Retrier to be used to execute a Call. The function is
  // called for each Call and must be safe to call concurrently. The retrier
  // must be fresh within the context of an execute call (e.g. no need to
  // reset a BackoffPolicy).
  retrier?: (() => Retrier) | undefined;
  rateLimiter?: Limiter | undefined;
  timeout?: number | undefined;
}

/**
 * Configures the retrier provider. If no retrier is provided, the API call
 * is not retried.
 *
 * The provider function must be safe to call concurrently.
 */
export function withRetrier(provider: () => Retrier): Option {
  return {
    apply(opts: Options): void {
      opts.retrier = provider;
    },
  };
}

/** Convenience option to disable retries. */
export function withDisableRetry(): Option {
  return {
    apply(opts: Options): void {
      opts.retrier = undefined;
    },
  };
}

/**
 * Convenience option to set the timeout duration. If the signal already has a
 * deadline, that deadline is updated to the minimum of the signal's deadline
 * and the timeout.
 *
 * The timeout covers the whole Call execution; it is not a timeout for each
 * intermediary API call.
 */
export function withTimeout(ms: number): Option {
  return {
    apply(opts: Options): void {
      opts.timeout = ms;
    },
  };
}

/**
 * Configures the rate limiter. The limiter is used to potentially rate limit
 * the API call. If no limiter is provided, the API call is not rate limited.
 */
export function withLimiter(l: Limiter): Option {
  return {
    apply(opts: Options): void {
      opts.rateLimiter = l;
    },
  };
}

/** Convenience option to disable rate limiting for a call. */
export function withNoLimiter(): Option {
  return {
    apply(opts: Options): void {
      opts.rateLimiter = undefined;
    },
  };
}
