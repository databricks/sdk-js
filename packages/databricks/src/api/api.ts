/**
 * Utilities to make API calls against the Databricks API with retry, timeout,
 * and rate limiting support.
 */

import type {Option, Options} from './options';
import type {Retrier} from './retrier';

/**
 * A function representing a single API call attempt. Throw an error to
 * indicate failure; return normally to indicate success.
 */
export type Call = (signal: AbortSignal) => Promise<void>;

/**
 * Makes an API call using the given options for retry, timeout, and rate
 * limiting behavior.
 */
export async function execute(call: Call, ...opts: Option[]): Promise<void> {
  const options: Options = {};
  for (const opt of opts) {
    opt.apply(options);
  }

  await executeImpl(call, options, sleepMs);
}

/**
 * Sleeps for the given duration in milliseconds. Rejects with an
 * AbortError if the signal is aborted before the sleep completes.
 */
function sleepMs(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason as Error);
      return;
    }

    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort);
      resolve();
    }, ms);

    function onAbort(): void {
      clearTimeout(timer);
      reject(signal.reason as Error);
    }

    signal.addEventListener('abort', onAbort, {once: true});
  });
}

// Convenience type for readability and testability.
type Sleeper = (ms: number, signal: AbortSignal) => Promise<void>;

/**
 * The actual implementation of execute, separated for testability.
 */
async function executeImpl(
  apiCall: Call,
  opts: Options,
  sleep: Sleeper
): Promise<void> {
  // Set up abort controller with optional timeout.
  const controller = new AbortController();
  const {signal} = controller;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  if (opts.timeoutMs !== undefined && opts.timeoutMs > 0) {
    timeoutId = setTimeout(() => {
      controller.abort(
        new DOMException('The operation timed out.', 'TimeoutError')
      );
    }, opts.timeoutMs);
  }

  try {
    // Lazily instantiated retrier.
    let retrier: Retrier | undefined;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
    while (true) {
      if (opts.rateLimiter !== undefined) {
        await opts.rateLimiter.wait(signal);
      }

      try {
        await apiCall(signal);
        return; // Success — nothing to retry.
      } catch (err: unknown) {
        if (retrier === undefined) {
          if (opts.retrier !== undefined) {
            retrier = opts.retrier();
          }
          if (retrier === undefined) {
            throw err; // No retrier — no retry.
          }
        }

        const decision = retrier.isRetriable(err);
        if (!decision.retriable) {
          throw err; // Not retriable.
        }

        await sleep(decision.delayMs, signal);
      }
    }
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }
}
