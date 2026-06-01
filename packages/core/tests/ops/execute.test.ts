import {describe, it, expect, vi} from 'vitest';
import {execute, sleep} from '../../src/ops/execute';
import type {Retrier} from '../../src/ops/retrier';
import type {Limiter} from '../../src/ops/limiter';
import type {Options} from '../../src/ops/options';

describe('execute retries', () => {
  const retriableError = new Error('retriable error');
  const nonRetriableError = new Error('non-retriable error');
  const retrier: Retrier = {
    isRetriable(err: Error): number | undefined {
      return err === retriableError ? 0 : undefined;
    },
  };

  const testCases: {
    name: string;
    callErrors: (Error | undefined)[];
    options: Options;
    wantErr: Error | undefined;
    wantCallCount: number;
  }[] = [
    {
      name: 'no retrier - fail immediately',
      callErrors: [retriableError],
      options: {},
      wantErr: retriableError,
      wantCallCount: 1,
    },
    {
      name: 'non-retriable error - fail immediately',
      callErrors: [nonRetriableError],
      options: {retrier: () => retrier},
      wantErr: nonRetriableError,
      wantCallCount: 1,
    },
    {
      name: 'retriable error - retry once then succeed',
      callErrors: [retriableError, undefined],
      options: {retrier: () => retrier},
      wantErr: undefined,
      wantCallCount: 2,
    },
    {
      name: 'retriable error - retry multiple times then succeed',
      callErrors: [retriableError, retriableError, retriableError, undefined],
      options: {retrier: () => retrier},
      wantErr: undefined,
      wantCallCount: 4,
    },
    {
      name: 'retriable error - retry then fail with non-retriable',
      callErrors: [retriableError, nonRetriableError],
      options: {retrier: () => retrier},
      wantErr: nonRetriableError,
      wantCallCount: 2,
    },
  ];

  it.each(testCases)(
    '$name',
    async ({callErrors, options, wantErr, wantCallCount}) => {
      let gotCallCount = 0;
      const call = (): Promise<void> => {
        const err = callErrors[gotCallCount];
        gotCallCount++;
        if (err) {
          return Promise.reject(err);
        }
        return Promise.resolve();
      };

      if (wantErr) {
        await expect(execute(undefined, call, options)).rejects.toBe(wantErr);
      } else {
        await execute(undefined, call, options);
      }

      expect(gotCallCount).toBe(wantCallCount);
    }
  );
});

describe('execute timeout', () => {
  const testCases: {
    name: string;
    ctxTimeout: number;
    optTimeout: number;
    callDelay: number;
    wantTimeout: boolean;
  }[] = [
    {
      name: 'no timeout - call succeeds',
      ctxTimeout: 0,
      optTimeout: 0,
      callDelay: 10,
      wantTimeout: false,
    },
    {
      name: 'context timeout - call times out',
      ctxTimeout: 10,
      optTimeout: 0,
      callDelay: 50,
      wantTimeout: true,
    },
    {
      name: 'option timeout - call times out',
      ctxTimeout: 0,
      optTimeout: 10,
      callDelay: 50,
      wantTimeout: true,
    },
    {
      name: 'minimum timeout - context timeout',
      ctxTimeout: 10,
      optTimeout: 100,
      callDelay: 50,
      wantTimeout: true,
    },
    {
      name: 'minimum timeout - option timeout',
      ctxTimeout: 100,
      optTimeout: 10,
      callDelay: 50,
      wantTimeout: true,
    },
  ];

  it.each(testCases)(
    '$name',
    async ({ctxTimeout, optTimeout, callDelay, wantTimeout}) => {
      // Cancellable call that succeeds after the call delay or throws the
      // abort reason if the signal is aborted.
      const call = async (signal?: AbortSignal): Promise<void> => {
        await sleep(callDelay, signal);
      };

      const signal =
        ctxTimeout > 0 ? AbortSignal.timeout(ctxTimeout) : undefined;

      const opts: Options = optTimeout > 0 ? {timeout: optTimeout} : {};

      if (wantTimeout) {
        await expect(execute(signal, call, opts)).rejects.toMatchObject({
          name: 'TimeoutError',
        });
      } else {
        await execute(signal, call, opts);
      }
    }
  );
});

describe('execute rate limiting', () => {
  const testError = new Error('rate limited');

  const testCases: {
    name: string;
    limiter: Limiter | undefined;
    wantErr: Error | undefined;
    wantCalls: number;
  }[] = [
    {
      name: 'no limiter - call proceeds',
      limiter: undefined,
      wantErr: undefined,
      wantCalls: 1,
    },
    {
      name: 'limiter allows - call proceeds',
      limiter: {
        wait(): Promise<void> {
          // No-op limiter that always allows.
          return Promise.resolve();
        },
      },
      wantErr: undefined,
      wantCalls: 1,
    },
    {
      name: 'limiter blocks - call fails',
      limiter: {
        wait(): Promise<void> {
          return Promise.reject(testError);
        },
      },
      wantErr: testError,
      wantCalls: 0,
    },
  ];

  it.each(testCases)('$name', async ({limiter, wantErr, wantCalls}) => {
    let gotCalls = 0;
    const call = (): Promise<void> => {
      gotCalls++;
      return Promise.resolve();
    };

    const opts: Options = limiter ? {rateLimiter: limiter} : {};

    if (wantErr) {
      await expect(execute(undefined, call, opts)).rejects.toBe(wantErr);
    } else {
      await execute(undefined, call, opts);
    }

    expect(gotCalls).toBe(wantCalls);
  });
});

describe('sleep listener cleanup', () => {
  it('should not leave stale listeners on the signal after resolution', async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const ctSpy = vi.spyOn(globalThis, 'clearTimeout');

    // Simulate 5 retries, each sleeping 0 ms with the same signal.
    for (let i = 0; i < 5; i++) {
      await sleep(0, signal);
    }

    // Abort the signal. If any stale listeners remained, they would call
    // clearTimeout. Zero calls means every listener was properly removed.
    controller.abort();

    expect(ctSpy).toHaveBeenCalledTimes(0);

    ctSpy.mockRestore();
  });
});

describe('execute context cancellation', () => {
  it('should stop retrying when the signal is aborted', async () => {
    const testErr = new Error('test error');
    const call = (): Promise<void> => Promise.reject(testErr); // Always fail.
    const retrier: Retrier = {
      isRetriable(): number | undefined {
        return 5; // Always retry after 5ms.
      },
    };

    const controller = new AbortController();
    setTimeout(() => {
      controller.abort();
    }, 10);

    await expect(
      execute(controller.signal, call, {retrier: () => retrier})
    ).rejects.toMatchObject({name: 'AbortError'});
  });
});
