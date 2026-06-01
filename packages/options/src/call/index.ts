/**
 * Options used to configure individual calls against the Databricks API.
 *
 * @packageDocumentation
 */

import type {Limiter, Retrier} from '@databricks/sdk-core/ops';

/** Options that configure a single call against the Databricks API. */
export interface CallOptions {
  /**
   * Cancels the call when aborted. If {@link CallOptions.timeout} is also
   * set, the call is cancelled when either the signal aborts or the timeout
   * elapses, whichever happens first.
   */
  signal?: AbortSignal;

  /**
   * Provides a fresh {@link Retrier} for each call. The function is invoked
   * once per call and must be safe to invoke concurrently. The returned
   * retrier must be fresh within the context of a single call (e.g. no need
   * to reset a backoff policy).
   *
   * If omitted, the call is not retried.
   */
  retrier?: () => Retrier;

  /**
   * Rate limiter applied before each call attempt. If omitted, the call is
   * not rate limited.
   */
  rateLimiter?: Limiter;

  /**
   * Timeout, in milliseconds, that covers the entire execution including
   * retries. If the signal already has a deadline, it is updated to the
   * minimum of the signal's deadline and this timeout.
   */
  timeout?: number;
}
