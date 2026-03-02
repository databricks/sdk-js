import {describe, it, expect, vi} from 'vitest';
import {BackoffPolicy, rand, retryOn} from '../../src/api/retrier';

// Always returns the maximum value (n - 1) for deterministic tests.
function deterministicRand(n: number): number {
  return n - 1;
}

describe('retryOn isRetriable', () => {
  const testCases: {
    name: string;
    fn: (err: Error) => boolean;
    wantDelay: number | undefined;
  }[] = [
    {
      name: 'retriable returns delay',
      fn: () => true,
      wantDelay: 99,
    },
    {
      name: 'not retriable returns undefined',
      fn: () => false,
      wantDelay: undefined,
    },
  ];

  it.each(testCases)('$name', ({fn, wantDelay}) => {
    vi.spyOn(rand, 'int').mockImplementation(deterministicRand);
    const r = retryOn({initial: wantDelay ?? 0}, fn);

    const got = r.isRetriable(new Error('an error'));
    if (wantDelay === undefined) {
      expect(got).toBeUndefined();
    } else {
      expect(got).toBe(wantDelay);
    }
    vi.restoreAllMocks();
  });
});

describe('BackoffPolicy defaults', () => {
  const testCases: {
    name: string;
    options?: {
      initial?: number;
      maximum?: number;
      factor?: number;
    };
    wantInitial: number;
    wantMaximum: number;
    wantFactor: number;
  }[] = [
    {
      name: 'default',
      wantInitial: 1000,
      wantMaximum: 60000,
      wantFactor: 2,
    },
    {
      name: 'custom initial smaller than maximum',
      options: {initial: 100},
      wantInitial: 100,
      wantMaximum: 60000,
      wantFactor: 2,
    },
    {
      name: 'custom initial greater than maximum',
      options: {initial: 10000, maximum: 1000},
      wantInitial: 1000,
      wantMaximum: 1000,
      wantFactor: 2,
    },
    {
      name: 'custom factor less than 1',
      options: {factor: 0.5},
      wantInitial: 1000,
      wantMaximum: 60000,
      wantFactor: 2,
    },
    {
      name: 'custom factor greater than 1',
      options: {factor: 1.5},
      wantInitial: 1000,
      wantMaximum: 60000,
      wantFactor: 1.5,
    },
  ];

  it.each(testCases)(
    '$name',
    ({options, wantInitial, wantMaximum, wantFactor}) => {
      const bp = new BackoffPolicy(options);

      expect(bp.initial).toBe(wantInitial);
      expect(bp.maximum).toBe(wantMaximum);
      expect(bp.factor).toBe(wantFactor);
    }
  );
});

describe('BackoffPolicy exponential delay', () => {
  it('should grow exponentially and cap at maximum', () => {
    vi.spyOn(rand, 'int').mockImplementation(deterministicRand);
    const bp = new BackoffPolicy({
      initial: 100,
      maximum: 10000,
      factor: 2.0,
    });

    const wantDelays = [
      100,
      200,
      400,
      800,
      1600,
      3200,
      6400,
      10000, // Capped by maximum.
    ];

    for (const want of wantDelays) {
      expect(bp.delay()).toBe(want);
    }
    vi.restoreAllMocks();
  });
});
