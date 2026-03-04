/**
 * Limiter is anything that can wait. It is typically used to implement
 * client-side rate limiting. Implementations of this interface must be
 * safe to call concurrently.
 */
export interface Limiter {
  wait(signal?: AbortSignal): Promise<void>;
}
