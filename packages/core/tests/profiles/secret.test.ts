import {describe, it, expect} from 'vitest';
import {Secret} from '../../src/profiles/secret';

describe('Secret', () => {
  const obfuscationCases: {
    name: string;
    convert: (s: Secret) => string;
    want: string;
  }[] = [
    {name: 'toString', convert: s => s.toString(), want: '********'},
    {name: 'toJSON', convert: s => s.toJSON(), want: '********'},
    {name: 'String() conversion', convert: s => String(s), want: '********'},
    {
      name: 'JSON.stringify',
      convert: s => JSON.stringify(s),
      want: '"********"',
    },
    {
      name: 'JSON.stringify in an object',
      convert: s => JSON.stringify({token: s}),
      want: '{"token":"********"}',
    },
  ];

  it.each(obfuscationCases)(
    'should return obfuscated placeholder from $name',
    ({convert, want}) => {
      const s = new Secret('my-secret-token');
      expect(convert(s)).toBe(want);
    }
  );

  const valueCases: {
    name: string;
    input: string;
  }[] = [
    {name: 'regular value', input: 'my-secret-token'},
    {name: 'empty string', input: ''},
    {name: 'special characters', input: 'abc#def#ghi'},
  ];

  it.each(valueCases)(
    'should preserve the underlying value for $name',
    ({input}) => {
      const s = new Secret(input);
      expect(s.value).toBe(input);
      expect(s.toString()).toBe('********');
    }
  );
});
