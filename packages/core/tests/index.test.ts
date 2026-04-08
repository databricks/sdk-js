import {describe, it, expect} from 'vitest';
import * as core from '../src/index';

describe('@databricks/sdk-core', () => {
  it('should be importable', () => {
    expect(core).toBeDefined();
  });
});
