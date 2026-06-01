/** Options for configuring a {@link BackoffPolicy}. */
export interface BackoffPolicyOptions {
  /** Initial delay in milliseconds; defaults to 1000. */
  initial?: number;

  /** Maximum delay in milliseconds; defaults to 60000. */
  maximum?: number;

  /**
   * Factor by which the delay is multiplied after each retry. The value must
   * be greater or equal to 1. If not, it defaults to 2.
   */
  factor?: number;
}

// Random number generation, wrapped in an object for testability.
export const rand = {
  // Returns a random integer in [0, n).
  int(n: number): number {
    return Math.floor(Math.random() * n);
  },
};

/**
 * BackoffPolicy implements an exponential backoff policy. The delay between
 * retries is randomly computed between 0 and the "exponential delay" as
 * recommended in [Exponential Backoff And Jitter]. The retry delay starts from
 * initial and grows exponentially by factor at every retry. The maximum retry
 * delay is capped by maximum.
 *
 * There is no parameter to limit the number of retries. This is intended as
 * such logic should be implemented upstream (e.g. in a Retrier).
 *
 * [Exponential Backoff And Jitter]: https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/
 */
export class BackoffPolicy {
  /** Initial delay in milliseconds. */
  readonly initial: number;

  /** Maximum delay in milliseconds. */
  readonly maximum: number;

  /** Factor by which the delay is multiplied after each retry. */
  readonly factor: number;

  // Current delay before the next retry.
  private current: number;

  constructor(options?: BackoffPolicyOptions) {
    let initial = options?.initial ?? 1000; // Default initial delay of 1 second.
    const maximum = options?.maximum ?? 60000; // Default maximum delay of 60 seconds.

    if (initial > maximum) {
      // Initial cannot be greater than maximum.
      initial = maximum;
    }

    this.initial = initial;
    this.maximum = maximum;
    this.factor =
      options?.factor !== undefined && options.factor >= 1 ? options.factor : 2;
    this.current = this.initial;
  }

  /** Returns a random delay in [0, current] and grows the current delay. */
  delay(): number {
    // Random duration in the range [0, this.current].
    const d = rand.int(this.current + 1);

    // Grow delay for the next call.
    this.current = Math.min(this.current * this.factor, this.maximum);

    return d;
  }
}

/** Retrier defines a retry behavior. */
export interface Retrier {
  /**
   * Returns the delay in milliseconds before the next retry, or undefined if
   * the error is not retriable. Implementations should assume that the given
   * error is never undefined.
   */
  isRetriable(err: Error): number | undefined;
}

/**
 * Returns a Retrier that retries based on the isRetriable predicate and relies
 * on an internal backoff policy to decide how long to wait between retries.
 *
 * Important: the retrier has its own backoff policy which cannot be trivially
 * reset by design. Users who need to reset the backoff policy should rather
 * create a new retrier.
 */
export function retryOn(
  options: BackoffPolicyOptions,
  isRetriable: (err: Error) => boolean
): Retrier {
  const bp = new BackoffPolicy(options);
  return {
    isRetriable(err: Error): number | undefined {
      if (!isRetriable(err)) {
        return undefined;
      }
      return bp.delay();
    },
  };
}
