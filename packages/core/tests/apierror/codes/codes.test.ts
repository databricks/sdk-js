import {describe, it, expect} from 'vitest';
import {Code} from '../../../src/apierror/codes/codes';

describe('Code', () => {
  it('exposes the canonical gRPC codes as their string names', () => {
    expect(Code.UNKNOWN).toBe('UNKNOWN');
    expect(Code.OK).toBe('OK');
    expect(Code.CANCELLED).toBe('CANCELLED');
    expect(Code.NOT_FOUND).toBe('NOT_FOUND');
    expect(Code.INVALID_ARGUMENT).toBe('INVALID_ARGUMENT');
    expect(Code.UNAUTHENTICATED).toBe('UNAUTHENTICATED');
  });

  it('is an open enum that also accepts product-specific codes', () => {
    // A Databricks-specific code that is not a named member is still a Code.
    const code: Code = 'CATALOG_DOES_NOT_EXIST';
    expect(code).toBe('CATALOG_DOES_NOT_EXIST');
  });
});
