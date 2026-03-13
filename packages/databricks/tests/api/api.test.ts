import {describe, it, expect} from 'vitest';
import {execute} from '../../src/api/api';
import {
  withRetrier,
  withDisableRetry,
  withTimeout,
  withLimiter,
} from '../../src/api/options';
import {BackoffPolicy, retryOn} from '../../src/api/retrier';
import type {Limiter} from '../../src/api/limiter';
import type {Retrier, RetryDecision} from '../../src/api/retrier';

describe('execute', () => {
  it('should succeed when call succeeds on first attempt', async () => {
    let called = false;
    await execute(() => {
      called = true;
      return Promise.resolve();
    });
    expect(called).toBe(true);
  });

  it('should propagate errors when no retrier is configured', async () => {
    const testError = new Error('test error');
    await expect(execute(() => Promise.reject(testError))).rejects.toBe(
      testError
    );
  });

  it('should disable retries with withDisableRetry', async () => {
    const testError = new Error('test error');
    let callCount = 0;
    await expect(
      execute(() => {
        callCount++;
        return Promise.reject(testError);
      }, withDisableRetry())
    ).rejects.toBe(testError);
    expect(callCount).toBe(1);
  });

  it('should retry on retriable errors then succeed', async () => {
    const retriableError = new Error('retriable');
    let callCount = 0;
    const errors: (Error | null)[] = [retriableError, retriableError, null];

    const retrier = retryOn(
      new BackoffPolicy({initialMs: 1, randomInt: (): number => 0}),
      err => err === retriableError
    );

    await execute(
      () => {
        const err = errors[callCount];
        callCount++;
        if (err !== null) {
          return Promise.reject(err);
        }
        return Promise.resolve();
      },
      withRetrier(() => retrier)
    );

    expect(callCount).toBe(3);
  });

  it('should stop retrying on non-retriable errors', async () => {
    const retriableError = new Error('retriable');
    const fatalError = new Error('fatal');
    let callCount = 0;
    const errors = [retriableError, fatalError];

    const retrier = retryOn(
      new BackoffPolicy({initialMs: 1, randomInt: (): number => 0}),
      err => err === retriableError
    );

    await expect(
      execute(
        () => {
          const err = errors[callCount];
          callCount++;
          return Promise.reject(err);
        },
        withRetrier(() => retrier)
      )
    ).rejects.toBe(fatalError);

    expect(callCount).toBe(2);
  });

  it('should respect timeout option', async () => {
    await expect(
      execute(
        signal =>
          new Promise<void>((resolve, reject) => {
            const timer = setTimeout(resolve, 200);
            signal.addEventListener('abort', () => {
              clearTimeout(timer);
              reject(signal.reason as Error);
            });
          }),
        withTimeout(10)
      )
    ).rejects.toThrow('timed out');
  });

  it('should call rate limiter before each attempt', async () => {
    let limiterCalls = 0;
    const limiter: Limiter = {
      wait(): Promise<void> {
        limiterCalls++;
        return Promise.resolve();
      },
    };

    await execute(() => Promise.resolve(), withLimiter(limiter));

    expect(limiterCalls).toBe(1);
  });

  it('should propagate rate limiter errors', async () => {
    const limiterError = new Error('rate limited');
    const limiter: Limiter = {
      wait(): Promise<void> {
        return Promise.reject(limiterError);
      },
    };

    await expect(
      execute(() => Promise.resolve(), withLimiter(limiter))
    ).rejects.toBe(limiterError);
  });

  it('should lazily instantiate retrier on first error', async () => {
    let retrierCreated = false;
    const mockRetrier: Retrier = {
      isRetriable(): RetryDecision {
        return {retriable: false, delayMs: 0};
      },
    };

    await execute(
      () => Promise.resolve(),
      withRetrier(() => {
        retrierCreated = true;
        return mockRetrier;
      })
    );

    expect(retrierCreated).toBe(false);
  });
});
