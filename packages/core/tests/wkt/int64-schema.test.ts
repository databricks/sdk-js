import {describe, it, expect} from 'vitest';
import JSONBig from 'json-bigint';
import {z} from 'zod';

// Replicas of the marshal / unmarshal schemas the generator emits for any
// proto int64 field. If the generator's template changes, these need to
// change in lockstep — that's intentional: this test exists to catch a
// drift between the codec config and the schema shape.
const marshalInt64Schema = z.bigint();
const unmarshalInt64Schema = z
  .union([z.number(), z.bigint()])
  .transform(v => BigInt(v));

// The exact json-bigint configuration the generator emits in utils.ts.
const jsonBigint = JSONBig({useNativeBigInt: true});

// Marshals through the same pipeline as the generated marshalRequest:
//   schema.parse(data) → jsonBigint.stringify
function marshalBody(value: bigint): string {
  return jsonBigint.stringify({v: marshalInt64Schema.parse(value)});
}

// Unmarshals through the same pipeline as the generated parseResponse:
//   jsonBigint.parse → schema.parse
function unmarshalBody(json: string): bigint {
  const parsed = jsonBigint.parse(json) as {v: unknown};
  return unmarshalInt64Schema.parse(parsed.v);
}

describe('int64 marshal schema (generator-emitted shape)', () => {
  it('accepts a bigint and emits a raw JSON number on the wire', () => {
    expect(marshalBody(42n)).toBe('{"v":42}');
    expect(marshalBody(9007199254740993n)).toBe('{"v":9007199254740993}');
    expect(marshalBody(9223372036854775807n)).toBe(
      '{"v":9223372036854775807}',
    );
    expect(marshalBody(-9223372036854775808n)).toBe(
      '{"v":-9223372036854775808}',
    );
  });

  it('rejects a JS number (caller must pass bigint)', () => {
    expect(() => marshalInt64Schema.parse(42)).toThrow();
  });

  it('rejects a string', () => {
    expect(() => marshalInt64Schema.parse('42')).toThrow();
  });
});

describe('int64 unmarshal schema (generator-emitted shape)', () => {
  it('accepts a small JSON number and normalises to bigint', () => {
    expect(unmarshalBody('{"v":42}')).toBe(42n);
  });

  it('accepts a JSON number that json-bigint already upgraded to bigint', () => {
    expect(unmarshalBody('{"v":9007199254740993}')).toBe(9007199254740993n);
  });

  it('preserves int64 max', () => {
    expect(unmarshalBody('{"v":9223372036854775807}')).toBe(
      9223372036854775807n,
    );
  });

  it('preserves int64 min', () => {
    expect(unmarshalBody('{"v":-9223372036854775808}')).toBe(
      -9223372036854775808n,
    );
  });

  it('rejects a string on the wire', () => {
    // The unmarshal union is z.number() | z.bigint() — string is not
    // permitted. If any service ever does emit int64 as a JSON string
    // we will see this failure in a test like this one.
    expect(() => unmarshalBody('{"v":"42"}')).toThrow();
  });
});

describe('round-trip via marshal → wire bytes → unmarshal', () => {
  const cases: bigint[] = [
    0n,
    1n,
    -1n,
    9007199254740991n, // Number.MAX_SAFE_INTEGER
    9007199254740992n, // 2^53
    9007199254740993n, // 2^53 + 1, JS Number precision break
    9223372036854775806n,
    9223372036854775807n, // int64 max
    -9223372036854775807n,
    -9223372036854775808n, // int64 min
    833780805664346n, // representative real workspace/job id
  ];

  it.each(cases)('preserves %s through marshal → unmarshal', value => {
    const wire = marshalBody(value);
    const back = unmarshalBody(wire);
    expect(back).toBe(value);
  });
});
