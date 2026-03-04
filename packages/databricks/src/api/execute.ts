import type {Option, Options} from './options';
import type {Retrier} from './retrier';

/** Call represents a call to a Databricks API. */
export type Call = (signal?: AbortSignal) => Promise<void>;

// Coerces an unknown value to an Error instance.
function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

/**
 * Sleeps for the given duration. It is mostly equivalent to setTimeout, but
 * can be interrupted by the AbortSignal if the signal aborts before the
 * duration elapses.
 */
function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted === true) {
      reject(toError(signal.reason));
      return;
    }
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer);
        reject(toError(signal.reason));
      },
      {once: true}
    );
  });
}

// Sleeper is a convenience type for readability.
type Sleeper = (ms: number, signal?: AbortSignal) => Promise<void>;

/** Makes a call to a Databricks API using the given options. */
export async function execute(
  signal: AbortSignal | undefined,
  call: Call,
  ...opts: Option[]
): Promise<void> {
  const options: Options = {};
  for (const opt of opts) {
    opt.apply(options);
  }
  return executeImpl(signal, call, options, sleep);
}

/**
 * The actual implementation of execute. Its purpose is to ease testing by
 * providing a convenient way to mock the sleeping logic.
 */
async function executeImpl(
  signal: AbortSignal | undefined,
  apiCall: Call,
  opts: Options,
  sleep: Sleeper
): Promise<void> {
  // Optionally combine the signal with a timeout signal. If the signal
  // already has a deadline, that deadline is updated to the minimum of the
  // signal's deadline and the timeout.
  if (opts.timeout !== undefined && opts.timeout > 0) {
    const timeoutSignal = AbortSignal.timeout(opts.timeout);
    signal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
  }

  // Get a new retrier for this specific execution. This is instantiated
  // lazily if and when the first call execution returns an error.
  let retrier: Retrier | undefined;

  for (;;) {
    if (opts.rateLimiter) {
      await opts.rateLimiter.wait(signal);
    }

    try {
      await apiCall(signal);
      return; // Nothing to retry.
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));

      if (retrier === undefined) {
        if (opts.retrier) {
          retrier = opts.retrier(); // Lazily instantiate the retrier.
        }
        if (retrier === undefined) {
          throw error; // No retrier == no retry.
        }
      }

      const delay = retrier.isRetriable(error);
      if (delay === undefined) {
        throw error; // Not retriable.
      }

      await sleep(delay, signal);
    }
  }
}
