import {describe, it, expect} from 'vitest';
import {
  Code,
  codeToString,
  codeFromString,
} from '../../../src/apierror/codes/codes';

const ALL_CODES = Object.values(Code).filter(
  (v): v is Code => typeof v === 'number'
);

describe('Code', () => {
  describe('round-trip', () => {
    it.each(ALL_CODES)(
      'should round-trip code %i through string conversion',
      code => {
        expect(codeFromString(codeToString(code))).toBe(code);
      }
    );
  });

  describe('codeToString', () => {
    it('should return "UNKNOWN" for unrecognized code values', () => {
      // Numeric enums accept arbitrary numbers at runtime.
      expect(codeToString(999 as Code)).toBe('UNKNOWN');
      expect(codeToString(-1 as Code)).toBe('UNKNOWN');
    });
  });

  describe('codeFromString', () => {
    it('should return Code.UNKNOWN for unrecognized strings', () => {
      expect(codeFromString('NONEXISTENT')).toBe(Code.UNKNOWN);
      expect(codeFromString('')).toBe(Code.UNKNOWN);
      expect(codeFromString('not_found')).toBe(Code.UNKNOWN);
    });
  });
});
