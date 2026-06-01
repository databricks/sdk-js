import {describe, expect, it} from 'vitest';

import type {LroOptions} from '../../src/lro';

describe('LroOptions', () => {
  it('accepts every documented field', () => {
    const signal = new AbortController().signal;

    const opts: LroOptions = {
      signal,
      timeout: 60_000,
    };

    expect(opts.signal).toBe(signal);
    expect(opts.timeout).toBe(60_000);
  });

  it('defaults to an empty object', () => {
    const opts: LroOptions = {};

    expect(opts.signal).toBeUndefined();
    expect(opts.timeout).toBeUndefined();
  });
});
