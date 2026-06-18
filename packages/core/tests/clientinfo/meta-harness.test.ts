import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import {
  metaHarnessProvider,
  clearMetaHarnessCache,
  lookupMetaHarnessProvider,
} from '../../src/clientinfo/meta-harness';

describe('lookupMetaHarnessProvider', () => {
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    clearMetaHarnessCache();
    savedEnv = process.env;
    process.env = {};
  });

  afterEach(() => {
    process.env = savedEnv;
    clearMetaHarnessCache();
  });

  const testCases: {
    name: string;
    env: Record<string, string>;
    want: string;
  }[] = [
    {
      name: 'no meta-harness',
      env: {},
      want: '',
    },
    {
      name: 'omnigent',
      env: {OMNIGENT: '1'},
      want: 'omnigent',
    },
    {
      name: 'empty value still counts as set',
      env: {OMNIGENT: ''},
      want: 'omnigent',
    },
    {
      name: 'an agent env var does not affect meta-harness detection',
      env: {CLAUDECODE: '1'},
      want: '',
    },
  ];

  it.each(testCases)('$name', ({env, want}) => {
    process.env = env;
    expect(lookupMetaHarnessProvider()).toBe(want);
  });
});

describe('metaHarnessProvider', () => {
  let savedEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    clearMetaHarnessCache();
    savedEnv = process.env;
    process.env = {};
  });

  afterEach(() => {
    process.env = savedEnv;
    clearMetaHarnessCache();
  });

  it('caches the detection result for the process lifetime', () => {
    process.env = {OMNIGENT: '1'};
    expect(metaHarnessProvider()).toBe('omnigent');

    // Changing the environment after the first call must not change the
    // cached result.
    process.env = {};
    expect(metaHarnessProvider()).toBe('omnigent');
  });
});
