import {describe, it, expect} from 'vitest';
import {FieldMask} from '../src';
import type {FieldPaths} from '../src';

// Simulates a class instance with methods (e.g. Temporal.Instant).
interface ClassLike {
  epochMilliseconds: number;
  toString(): string;
}

// Test interface for FieldPaths derivation.
interface Cluster {
  name: string;
  displayName: string;
  state: string;
  config: {
    numWorkers: number;
    scaling: {
      minReplicas: number;
      maxReplicas: number;
    };
  };
  tags: string[];
  labels: Record<string, string>;
  createTime?: ClassLike;
}

// Verify FieldPaths derives correct paths at compile time.
type ClusterPaths = FieldPaths<Cluster>;
const _checkPaths: ClusterPaths[] = [
  'name',
  'displayName',
  'state',
  'config',
  'config.numWorkers',
  'config.scaling',
  'config.scaling.minReplicas',
  'config.scaling.maxReplicas',
  'tags',
  'labels',
  'createTime', // Leaf — ClassLike has methods, so no recursion.
];
// Suppress unused variable warning.
void _checkPaths;

// Verify that ClassLike properties are NOT included as paths.
// If FieldPaths recursed into ClassLike, "createTime.epochMilliseconds" would
// be a valid path. This assignment must fail at compile time.
// @ts-expect-error - ClassLike is a leaf; its properties are not valid paths.
const _badPath: ClusterPaths = 'createTime.epochMilliseconds';
void _badPath;

describe('FieldMask', () => {
  describe('of', () => {
    const testCases: {name: string; input: string[]; want: string[]}[] = [
      {name: 'single path', input: ['name'], want: ['name']},
      {
        name: 'multiple paths',
        input: ['displayName', 'name'],
        want: ['displayName', 'name'],
      },
      {
        name: 'deduplicates paths',
        input: ['name', 'name', 'state'],
        want: ['name', 'state'],
      },
      {
        name: 'removes paths subsumed by a parent',
        input: ['config.numWorkers', 'config', 'name'],
        want: ['config', 'name'],
      },
      {
        name: 'removes deeply subsumed paths',
        input: ['config.scaling.minReplicas', 'config.scaling', 'config'],
        want: ['config'],
      },
      {
        name: 'does not subsume paths sharing a prefix without a dot boundary',
        input: ['foo', 'foobar'],
        want: ['foo', 'foobar'],
      },
      {name: 'empty mask', input: [], want: []},
    ];

    it.each(testCases)('$name', ({input, want}) => {
      const mask = FieldMask.of(...input);
      expect(mask.paths).toStrictEqual(want);
    });
  });

  describe('append', () => {
    const testCases: {
      name: string;
      initial: string[];
      append: string[];
      want: string[];
    }[] = [
      {
        name: 'adds new paths',
        initial: ['name'],
        append: ['state'],
        want: ['name', 'state'],
      },
      {
        name: 'deduplicates when appending existing paths',
        initial: ['name', 'state'],
        append: ['name'],
        want: ['name', 'state'],
      },
      {
        name: 'subsumes child when parent is appended',
        initial: ['config.numWorkers'],
        append: ['config'],
        want: ['config'],
      },
    ];

    it.each(testCases)('$name', ({initial, append, want}) => {
      const mask = FieldMask.of(...initial).append(...append);
      expect(mask.paths).toStrictEqual(want);
    });
  });

  describe('type safety with FieldPaths', () => {
    it('works with derived FieldPaths type', () => {
      const mask = FieldMask.of<FieldPaths<Cluster>>(
        'displayName',
        'config.numWorkers'
      );
      expect(mask.paths).toStrictEqual(['config.numWorkers', 'displayName']);
    });
  });
});
