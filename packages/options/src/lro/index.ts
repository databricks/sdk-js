/**
 * Options used to configure waiting on a long-running operation.
 *
 * @packageDocumentation
 */

/**
 * Options that configure waiting on a long-running operation.
 *
 * A wait may issue many polling calls under the hood; these options apply to
 * the entire wait, not to any single poll. Per-poll knobs (rate limiting,
 * retry strategy) are intentionally omitted to keep the surface focused on
 * the only thing callers reliably need: bounding how long to wait.
 */
export interface LroOptions {
  /**
   * Cancels the wait when aborted. If {@link LroOptions.timeout} is also
   * set, the wait is cancelled when either the signal aborts or the timeout
   * elapses, whichever happens first.
   */
  signal?: AbortSignal;

  /**
   * Total timeout, in milliseconds, that bounds the entire wait, including
   * all polling attempts. If the signal already has a deadline, it is
   * updated to the minimum of the signal's deadline and this timeout.
   */
  timeout?: number;
}
