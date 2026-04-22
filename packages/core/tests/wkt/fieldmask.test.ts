import {describe, it, expect} from 'vitest';
import {FieldMask} from '../../src/wkt';
import type {FieldMaskSchema} from '../../src/wkt';

// Alert-like non-cyclic schema with nested Condition + Operand, used to drive FieldMask through its `@internal` build entry point.
const operandSchema: FieldMaskSchema = {
  column: {wire: 'column'},
  value: {wire: 'value'},
};
const conditionSchema: FieldMaskSchema = {
  op: {wire: 'op'},
  operand: {wire: 'operand', children: () => operandSchema},
};
const alertSchema: FieldMaskSchema = {
  displayName: {wire: 'display_name'},
  condition: {wire: 'condition', children: () => conditionSchema},
};

// Self-referential schema used to verify cycle-safe construction.
const nodeSchema: FieldMaskSchema = {
  label: {wire: 'label'},
  child: {wire: 'child', children: () => nodeSchema},
};

describe('FieldMask.build', () => {
  describe('valid paths translate and serialize', () => {
    const cases: {
      name: string;
      schema: FieldMaskSchema;
      input: string[];
      want: string;
    }[] = [
      {
        name: 'flat path',
        schema: alertSchema,
        input: ['displayName'],
        want: 'display_name',
      },
      {
        name: 'nested path',
        schema: alertSchema,
        input: ['condition.op'],
        want: 'condition.op',
      },
      {
        name: 'deeply nested path',
        schema: alertSchema,
        input: ['condition.operand.column'],
        want: 'condition.operand.column',
      },
      {
        name: 'multiple paths joined in sorted order',
        schema: alertSchema,
        input: ['displayName', 'condition.op'],
        want: 'condition.op,display_name',
      },
      {
        name: 'duplicates collapse before translation',
        schema: alertSchema,
        input: ['displayName', 'displayName'],
        want: 'display_name',
      },
      {
        name: 'children subsumed by a parent are dropped',
        schema: alertSchema,
        input: ['condition.op', 'condition'],
        want: 'condition',
      },
      {
        name: 'empty input serializes to empty string',
        schema: alertSchema,
        input: [],
        want: '',
      },
      {
        name: 'arbitrary depth through a self-cycle',
        schema: nodeSchema,
        input: ['child.child.child.label'],
        want: 'child.child.child.label',
      },
    ];

    it.each(cases)('$name', ({schema, input, want}) => {
      const mask = FieldMask.build<unknown>(input, schema);
      expect(mask.toString()).toBe(want);
    });
  });

  describe('invalid paths throw', () => {
    const cases: {
      name: string;
      schema: FieldMaskSchema;
      input: string[];
      msg: string;
    }[] = [
      {
        name: 'unknown top-level field',
        schema: alertSchema,
        input: ['bogus'],
        msg: 'Unknown field path "bogus"',
      },
      {
        name: 'unknown nested field',
        schema: alertSchema,
        input: ['condition.bogus'],
        msg: 'Unknown field path "condition.bogus"',
      },
      {
        name: 'descent past a scalar leaf',
        schema: alertSchema,
        input: ['displayName.nope'],
        msg: 'Unknown field path "displayName.nope"',
      },
    ];

    it.each(cases)('$name', ({schema, input, msg}) => {
      expect(() => FieldMask.build<unknown>(input, schema)).toThrowError(msg);
    });
  });
});
