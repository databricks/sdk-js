import {describe, expect, it} from 'vitest';

import type {Limiter, Retrier} from '@databricks/sdk-core/ops';

import type {CallOptions} from '../../src/call';

describe('CallOptions', () => {
  it('accepts every documented field', () => {
    const retrier: Retrier = {
      isRetriable: () => undefined,
    };
    const provider = (): Retrier => retrier;
    const rateLimiter: Limiter = {
      wait: () => Promise.resolve(),
    };
    const signal = new AbortController().signal;

    const opts: CallOptions = {
      signal,
      retrier: provider,
      rateLimiter,
      timeout: 3_000,
    };

    expect(opts.signal).toBe(signal);
    expect(opts.retrier).toBe(provider);
    expect(opts.rateLimiter).toBe(rateLimiter);
    expect(opts.timeout).toBe(3_000);
  });

  it('defaults to an empty object', () => {
    const opts: CallOptions = {};

    expect(opts.signal).toBeUndefined();
    expect(opts.retrier).toBeUndefined();
    expect(opts.rateLimiter).toBeUndefined();
    expect(opts.timeout).toBeUndefined();
  });

  it('returns a fresh Retrier from the provider on every invocation', () => {
    let invocations = 0;
    const provider = (): Retrier => {
      invocations += 1;
      return {isRetriable: () => undefined};
    };
    const opts: CallOptions = {retrier: provider};

    opts.retrier?.();
    opts.retrier?.();

    expect(invocations).toBe(2);
  });
});
