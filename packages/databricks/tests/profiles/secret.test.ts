import {describe, it, expect} from 'vitest';
import {Secret} from '../../src/profiles/secret';

describe('Secret', () => {
  it('should return the underlying value via the value getter', () => {
    const s = new Secret('my-secret-token');
    expect(s.value).toBe('my-secret-token');
  });

  it('should return obfuscated placeholder from toString', () => {
    const s = new Secret('my-secret-token');
    expect(s.toString()).toBe('********');
  });

  it('should return obfuscated placeholder from toJSON', () => {
    const s = new Secret('my-secret-token');
    expect(s.toJSON()).toBe('********');
  });

  it('should return obfuscated placeholder from String() conversion', () => {
    const s = new Secret('my-secret-token');
    expect(String(s)).toBe('********');
  });

  it('should return obfuscated placeholder from JSON.stringify', () => {
    const s = new Secret('my-secret-token');
    expect(JSON.stringify(s)).toBe('"********"');
  });

  it('should return obfuscated placeholder from JSON.stringify in an object', () => {
    const obj = {token: new Secret('my-secret-token')};
    expect(JSON.stringify(obj)).toBe('{"token":"********"}');
  });

  it('should handle empty string values', () => {
    const s = new Secret('');
    expect(s.value).toBe('');
    expect(s.toString()).toBe('********');
  });

  it('should handle values containing special characters', () => {
    const s = new Secret('abc#def#ghi');
    expect(s.value).toBe('abc#def#ghi');
    expect(s.toString()).toBe('********');
  });
});
