import {describe, it, expect} from 'vitest';
import {Secret} from '../../src/profiles';
// These are internal helpers not exported from the barrel, so we import
// directly from the module.
import type {Profile, PropertyDef} from '../../src/profiles/profile';
import {
  PROPERTY_DEFS,
  getProfileField,
  setProfileField,
} from '../../src/profiles/profile';

// Pick one representative PropertyDef for each converter type so we test
// through the real code path rather than reimplementing the converters.
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

describe('setProfileField and getProfileField', () => {
  const stringCases: {name: string; raw: string; want: string}[] = [
    {
      name: 'plain value',
      raw: 'https://example.com',
      want: 'https://example.com',
    },
    {
      name: 'value with special chars',
      raw: 'https://x.com?a=1&b=2',
      want: 'https://x.com?a=1&b=2',
    },
  ];

  it.each(stringCases)(
    'should round-trip string property: $name',
    ({raw, want}) => {
      const profile: Profile = {};
      setProfileField(profile, STRING_DEF, raw);
      expect(profile.host).toBe(want);
      expect(getProfileField(profile, STRING_DEF)).toBe(want);
    }
  );

  const secretCases: {name: string; raw: string; wantValue: string}[] = [
    {name: 'plain secret', raw: 'dapi-token-123', wantValue: 'dapi-token-123'},
    {name: 'secret with hashes', raw: 'abc#def#ghi', wantValue: 'abc#def#ghi'},
  ];

  it.each(secretCases)(
    'should round-trip secret property: $name',
    ({raw, wantValue}) => {
      const profile: Profile = {};
      setProfileField(profile, SECRET_DEF, raw);
      expect(profile.token).toBeInstanceOf(Secret);
      if (profile.token === undefined) {
        expect.fail('expected token to be set');
      }
      expect(profile.token.value).toBe(wantValue);
      expect(getProfileField(profile, SECRET_DEF)).toBe(wantValue);
    }
  );

  const boolParseCases: {name: string; raw: string; want: boolean}[] = [
    {name: '"true"', raw: 'true', want: true},
    {name: '"True"', raw: 'True', want: true},
    {name: '"TRUE"', raw: 'TRUE', want: true},
    {name: '"t"', raw: 't', want: true},
    {name: '"T"', raw: 'T', want: true},
    {name: '"1"', raw: '1', want: true},
    {name: '"false"', raw: 'false', want: false},
    {name: '"False"', raw: 'False', want: false},
    {name: '"FALSE"', raw: 'FALSE', want: false},
    {name: '"f"', raw: 'f', want: false},
    {name: '"F"', raw: 'F', want: false},
    {name: '"0"', raw: '0', want: false},
  ];

  it.each(boolParseCases)(
    'should parse boolean property: $name',
    ({raw, want}) => {
      const profile: Profile = {};
      setProfileField(profile, BOOLEAN_DEF, raw);
      expect(profile.azureUseMsi).toBe(want);
      expect(getProfileField(profile, BOOLEAN_DEF)).toBe(String(want));
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
        setProfileField(profile, BOOLEAN_DEF, raw);
      }).toThrow(/invalid boolean value/);
    }
  );
});

describe('getProfileField serialization edge cases', () => {
  const cases: {
    name: string;
    def: PropertyDef;
    profile: Profile;
    want: string | undefined;
  }[] = [
    {
      name: 'missing string field returns undefined',
      def: STRING_DEF,
      profile: {},
      want: undefined,
    },
    {
      name: 'empty string field returns undefined',
      def: STRING_DEF,
      profile: {host: ''},
      want: undefined,
    },
    {
      name: 'missing secret field returns undefined',
      def: SECRET_DEF,
      profile: {},
      want: undefined,
    },
    {
      name: 'empty secret field returns undefined',
      def: SECRET_DEF,
      profile: {token: new Secret('')},
      want: undefined,
    },
    {
      name: 'missing boolean field returns undefined',
      def: BOOLEAN_DEF,
      profile: {},
      want: undefined,
    },
  ];

  it.each(cases)('$name', ({def, profile, want}) => {
    expect(getProfileField(profile, def)).toBe(want);
  });
});

describe('PROPERTY_DEFS', () => {
  // Meta-fields that are not backed by a PropertyDef entry.
  const META_FIELDS = new Set<keyof Profile>(['name', 'extra']);

  it('should cover every Profile field except meta-fields', () => {
    const mappedFields = new Set(PROPERTY_DEFS.map(d => d.field));
    // Build the set of expected fields from the Profile interface by
    // round-tripping a fully populated profile through Object.keys.
    const allFields: (keyof Profile)[] = [
      'host',
      'workspaceId',
      'accountId',
      'token',
      'username',
      'password',
      'authType',
      'clientId',
      'clientSecret',
      'databricksCliPath',
      'metadataServiceUrl',
      'actionsIdTokenRequestUrl',
      'actionsIdTokenRequestToken',
      'oidcTokenEnv',
      'oidcTokenFilePath',
      'tokenAudience',
      'discoveryUrl',
      'azureClientId',
      'azureClientSecret',
      'azureTenantId',
      'azureResourceId',
      'azureEnvironment',
      'azureLoginAppId',
      'azureUseMsi',
      'googleCredentials',
      'googleServiceAccount',
      'clusterId',
      'warehouseId',
      'serverlessComputeId',
    ];
    for (const field of allFields) {
      if (!META_FIELDS.has(field)) {
        expect(mappedFields, `missing PropertyDef for "${field}"`).toContain(
          field
        );
      }
    }
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
