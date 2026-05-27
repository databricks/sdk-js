import {describe, it, expect} from 'vitest';
import JSONBig from 'json-bigint';

// Mirror of the json-bigint config the generator emits in every package's
// utils.ts. Pinned here so a regression in either the dependency or our
// configuration breaks this test.
const jsonBigint = JSONBig({useNativeBigInt: true});

describe('json-bigint codec used by generated utils.ts', () => {
  describe('parse', () => {
    it('keeps small integers as JS number', () => {
      const result = jsonBigint.parse('{"x":42}') as {x: unknown};
      expect(typeof result.x).toBe('number');
      expect(result.x).toBe(42);
    });

    it('keeps comfortably-small integers as JS number', () => {
      // 833780805664346 is a real Databricks job id (~2^50); well under
      // Number.MAX_SAFE_INTEGER and parsed without precision loss.
      const result = jsonBigint.parse('{"x":833780805664346}') as {x: unknown};
      expect(typeof result.x).toBe('number');
      expect(result.x).toBe(833780805664346);
    });

    it('upgrades integers near Number.MAX_SAFE_INTEGER to bigint', () => {
      // json-bigint conservatively switches to bigint as values approach
      // 2^53. The exact threshold is library-defined; we only care that
      // anything that *could* lose precision comes back as bigint.
      const result = jsonBigint.parse('{"x":9007199254740993}') as {x: unknown};
      expect(typeof result.x).toBe('bigint');
      expect(result.x).toBe(9007199254740993n);
    });

    it('preserves the full int64 positive range', () => {
      const result = jsonBigint.parse('{"x":9223372036854775807}') as {
        x: unknown;
      };
      expect(result.x).toBe(9223372036854775807n);
    });

    it('preserves the full int64 negative range', () => {
      const result = jsonBigint.parse('{"x":-9223372036854775808}') as {
        x: unknown;
      };
      expect(result.x).toBe(-9223372036854775808n);
    });

    it('leaves floats as JS number', () => {
      const result = jsonBigint.parse('{"x":1.5}') as {x: unknown};
      expect(typeof result.x).toBe('number');
      expect(result.x).toBe(1.5);
    });

    it('does not touch string fields', () => {
      const result = jsonBigint.parse('{"x":"hello"}') as {x: unknown};
      expect(result.x).toBe('hello');
    });
  });

  describe('stringify', () => {
    it('emits a small bigint as a raw JSON number (no quotes)', () => {
      expect(jsonBigint.stringify({x: 42n})).toBe('{"x":42}');
    });

    it('emits a bigint > Number.MAX_SAFE_INTEGER as a raw JSON number', () => {
      expect(jsonBigint.stringify({x: 9007199254740993n})).toBe(
        '{"x":9007199254740993}',
      );
    });

    it('emits the full positive int64 range', () => {
      expect(jsonBigint.stringify({x: 9223372036854775807n})).toBe(
        '{"x":9223372036854775807}',
      );
    });

    it('emits the full negative int64 range', () => {
      expect(jsonBigint.stringify({x: -9223372036854775808n})).toBe(
        '{"x":-9223372036854775808}',
      );
    });

    it('handles JS numbers alongside bigints', () => {
      expect(jsonBigint.stringify({a: 1, b: 2n, c: 'x'})).toBe(
        '{"a":1,"b":2,"c":"x"}',
      );
    });
  });

  describe('round-trip', () => {
    const cases: bigint[] = [
      0n,
      1n,
      -1n,
      BigInt(Number.MAX_SAFE_INTEGER) - 1n,
      BigInt(Number.MAX_SAFE_INTEGER),
      BigInt(Number.MAX_SAFE_INTEGER) + 1n,
      BigInt(Number.MAX_SAFE_INTEGER) + 2n,
      9223372036854775806n,
      9223372036854775807n, // 2^63 - 1
      -9223372036854775807n,
      -9223372036854775808n, // -2^63
    ];

    it.each(cases)('preserves %s through stringify → parse', value => {
      const json = jsonBigint.stringify({v: value});
      const back = jsonBigint.parse(json) as {v: bigint | number};
      // Small magnitudes come back as number, larger as bigint — normalise.
      expect(BigInt(back.v)).toBe(value);
    });
  });
});
