import type {Limiter} from './limiter';
import type {Retrier} from './retrier';

/** Options that control the behavior of an operation. */
export interface Options {
  /**
   * Provides a new Retrier to be used to execute an operation. The function
   * is called for each operation and must be safe to call concurrently. The
   * retrier must be fresh within the context of an execute call (e.g. no
   * need to reset a BackoffPolicy).
   */
  retrier?: (() => Retrier) | undefined;
  /** The rate limiter used to potentially rate limit the operation. */
  rateLimiter?: Limiter | undefined;
  /**
   * Timeout duration in milliseconds. If the signal already has a deadline,
   * that deadline is updated to the minimum of the signal's deadline and the
   * timeout. The timeout covers the whole operation execution; it is not a
   * timeout for each intermediary call.
   */
  timeout?: number | undefined;
}
