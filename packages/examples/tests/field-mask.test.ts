import {describe, expect, it} from 'vitest';

import {projectFieldMask} from '@databricks/sdk-postgres/v1';

import {main} from '../src/field-mask';

describe('field-mask example', () => {
  it('serializes camelCase paths to comma-joined snake_case', () => {
    const mask = projectFieldMask(
      'spec.displayName',
      'spec.historyRetentionDuration'
    );
    expect(mask.toString()).toBe(
      'spec.display_name,spec.history_retention_duration'
    );
  });

  it('normalizes so a parent subsumes its children', () => {
    expect(projectFieldMask('spec', 'spec.displayName').toString()).toBe(
      'spec'
    );
  });

  it('rejects an unknown field path at build time', () => {
    expect(() => projectFieldMask('spec.bogus')).toThrow(/Unknown field path/);
  });

  it('runs the example without throwing', () => {
    expect(() => {
      main();
    }).not.toThrow();
  });
});
