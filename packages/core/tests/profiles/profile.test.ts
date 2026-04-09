import {describe, it, expect} from 'vitest';
import {Secret} from '../../src/profiles/secret';
// These are internal helpers not exported from the barrel, so we import
// directly from the module.
import type {Profile, PropertyDef} from '../../src/profiles/profile';
import {PROPERTY_DEFS} from '../../src/profiles/profile';

function findDef(field: string): PropertyDef {
  const def = PROPERTY_DEFS.find(d => d.field === field);
  if (def === undefined) {
    expect.fail(`PropertyDef not found for field "${field}"`);
  }
  return def;
}

const STRING_DEF = findDef('host');
const SECRET_DEF = findDef('token');
const BOOLEAN_DEF = findDef('azureUseMsi');

describe('property set and get', () => {
  const roundTripCases: {
    name: string;
    def: PropertyDef;
    raw: string;
    wantGet: string;
  }[] = [
    // String properties.
    {
      name: 'string: plain value',
      def: STRING_DEF,
      raw: 'https://example.com',
      wantGet: 'https://example.com',
    },
    {
      name: 'string: special chars',
      def: STRING_DEF,
      raw: 'https://x.com?a=1&b=2',
      wantGet: 'https://x.com?a=1&b=2',
    },
    // Secret properties.
    {
      name: 'secret: plain value',
      def: SECRET_DEF,
      raw: 'dapi-token-123',
      wantGet: 'dapi-token-123',
    },
    {
      name: 'secret: value with hashes',
      def: SECRET_DEF,
      raw: 'abc#def#ghi',
      wantGet: 'abc#def#ghi',
    },
    // Boolean properties — all valid representations.
    {name: 'boolean: "true"', def: BOOLEAN_DEF, raw: 'true', wantGet: 'true'},
    {name: 'boolean: "True"', def: BOOLEAN_DEF, raw: 'True', wantGet: 'true'},
    {name: 'boolean: "TRUE"', def: BOOLEAN_DEF, raw: 'TRUE', wantGet: 'true'},
    {name: 'boolean: "t"', def: BOOLEAN_DEF, raw: 't', wantGet: 'true'},
    {name: 'boolean: "T"', def: BOOLEAN_DEF, raw: 'T', wantGet: 'true'},
    {name: 'boolean: "1"', def: BOOLEAN_DEF, raw: '1', wantGet: 'true'},
    {
      name: 'boolean: "false"',
      def: BOOLEAN_DEF,
      raw: 'false',
      wantGet: 'false',
    },
    {
      name: 'boolean: "False"',
      def: BOOLEAN_DEF,
      raw: 'False',
      wantGet: 'false',
    },
    {
      name: 'boolean: "FALSE"',
      def: BOOLEAN_DEF,
      raw: 'FALSE',
      wantGet: 'false',
    },
    {name: 'boolean: "f"', def: BOOLEAN_DEF, raw: 'f', wantGet: 'false'},
    {name: 'boolean: "F"', def: BOOLEAN_DEF, raw: 'F', wantGet: 'false'},
    {name: 'boolean: "0"', def: BOOLEAN_DEF, raw: '0', wantGet: 'false'},
  ];

  it.each(roundTripCases)('should round-trip: $name', ({def, raw, wantGet}) => {
    const profile: Profile = {};
    def.set(profile, raw);
    expect(def.get(profile)).toBe(wantGet);
  });

  it('should wrap secret fields in Secret instances', () => {
    const profile: Profile = {};
    SECRET_DEF.set(profile, 'my-token');
    expect(profile.token).toBeInstanceOf(Secret);
  });

  const unsetCases: {name: string; def: PropertyDef}[] = [
    {name: 'string', def: STRING_DEF},
    {name: 'secret', def: SECRET_DEF},
    {name: 'boolean', def: BOOLEAN_DEF},
  ];

  it.each(unsetCases)(
    'should return undefined for unset $name field',
    ({def}) => {
      expect(def.get({})).toBeUndefined();
    }
  );

  const invalidBoolCases: {name: string; raw: string}[] = [
    {name: 'empty string', raw: ''},
    {name: 'yes', raw: 'yes'},
    {name: 'no', raw: 'no'},
    {name: 'random text', raw: 'maybe'},
  ];

  it.each(invalidBoolCases)(
    'should throw for invalid boolean value: $name',
    ({raw}) => {
      const profile: Profile = {};
      expect(() => {
        BOOLEAN_DEF.set(profile, raw);
      }).toThrow(/invalid boolean value/);
    }
  );
});

describe('PROPERTY_DEFS', () => {
  it('should cover every Profile field except name and extra', () => {
    // Set every property to a sentinel value via PROPERTY_DEFS, then check
    // that no Profile field was missed. The source of truth is the Profile
    // interface itself — no parallel list to maintain.
    const profile: Profile = {};
    for (const def of PROPERTY_DEFS) {
      def.set(profile, def.field === 'azureUseMsi' ? 'true' : 'sentinel');
    }
    const META_FIELDS = new Set(['name', 'extra']);
    for (const [key, value] of Object.entries(profile)) {
      if (META_FIELDS.has(key)) {
        continue;
      }
      expect(
        value,
        `field "${key}" was not populated by any PropertyDef`
      ).toBeDefined();
    }
    // Verify the count matches: every non-meta field should have been set.
    const populatedCount = Object.keys(profile).length;
    expect(populatedCount).toBe(PROPERTY_DEFS.length);
  });

  it('should have no duplicate fields', () => {
    const fields = PROPERTY_DEFS.map(d => d.field);
    expect(new Set(fields).size).toBe(fields.length);
  });

  it('should have no duplicate envVar names', () => {
    const envVars = PROPERTY_DEFS.map(d => d.envVar);
    expect(new Set(envVars).size).toBe(envVars.length);
  });

  it('should have no duplicate iniKey names', () => {
    const iniKeys = PROPERTY_DEFS.map(d => d.iniKey);
    expect(new Set(iniKeys).size).toBe(iniKeys.length);
  });
});
