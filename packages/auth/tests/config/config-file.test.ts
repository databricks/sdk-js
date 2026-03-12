import {describe, it, expect} from 'vitest';
import {parseIni, loadProfile, listProfiles} from '../../src/config';

describe('default_profile resolution', () => {
  // Scenario 1: default_profile resolves correctly.
  it('should resolve default_profile from [__settings__]', () => {
    const ini = parseIni(`
[__settings__]
default_profile = my-workspace

[my-workspace]
host = https://my-workspace.cloud.databricks.com
token = dapiXYZ
`);
    const profile = loadProfile(ini);
    expect(profile.name).toBe('my-workspace');
    expect(profile.values.host).toBe(
      'https://my-workspace.cloud.databricks.com'
    );
    expect(profile.values.token).toBe('dapiXYZ');
  });

  // Scenario 2: default_profile takes precedence over [DEFAULT].
  it('should prefer default_profile over [DEFAULT]', () => {
    const ini = parseIni(`
[__settings__]
default_profile = my-workspace

[DEFAULT]
host = https://default.cloud.databricks.com
token = dapiOLD

[my-workspace]
host = https://my-workspace.cloud.databricks.com
token = dapiXYZ
`);
    const profile = loadProfile(ini);
    expect(profile.name).toBe('my-workspace');
    expect(profile.values.host).toBe(
      'https://my-workspace.cloud.databricks.com'
    );
  });

  // Scenario 3: Legacy fallback when no [__settings__].
  it('should fall back to DEFAULT when no [__settings__] section exists', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://default.cloud.databricks.com
token = dapiXYZ
`);
    const profile = loadProfile(ini);
    expect(profile.name).toBe('DEFAULT');
    expect(profile.values.host).toBe('https://default.cloud.databricks.com');
  });

  // Scenario 4: Legacy fallback when default_profile is empty.
  it('should fall back to DEFAULT when [__settings__] has no default_profile', () => {
    const ini = parseIni(`
[__settings__]

[DEFAULT]
host = https://default.cloud.databricks.com
token = dapiXYZ
`);
    const profile = loadProfile(ini);
    expect(profile.name).toBe('DEFAULT');
    expect(profile.values.host).toBe('https://default.cloud.databricks.com');
  });

  // Scenario 5: [__settings__] is not a profile.
  it('should not include __settings__ in profile enumeration', () => {
    const ini = parseIni(`
[__settings__]
default_profile = my-workspace

[my-workspace]
host = https://my-workspace.cloud.databricks.com
`);
    const profiles = listProfiles(ini);
    const names = profiles.map(p => p.name);
    expect(names).not.toContain('__settings__');
    expect(names).toEqual(['my-workspace']);
  });

  // Scenario 6: Explicit --profile overrides default_profile.
  it('should use explicit profile over default_profile', () => {
    const ini = parseIni(`
[__settings__]
default_profile = my-workspace

[my-workspace]
host = https://my-workspace.cloud.databricks.com

[other]
host = https://other.cloud.databricks.com
`);
    const profile = loadProfile(ini, 'other');
    expect(profile.name).toBe('other');
    expect(profile.values.host).toBe('https://other.cloud.databricks.com');
  });

  // Scenario 7: default_profile = __settings__ is rejected.
  it('should reject default_profile pointing to __settings__', () => {
    const ini = parseIni(`
[__settings__]
default_profile = __settings__

[my-workspace]
host = https://my-workspace.cloud.databricks.com
`);
    expect(() => loadProfile(ini)).toThrow(
      '"__settings__" is a reserved section and cannot be used as a profile'
    );
  });

  // Scenario 8: explicit profile = __settings__ is rejected.
  it('should reject explicit profile __settings__', () => {
    const ini = parseIni(`
[__settings__]
default_profile = my-workspace

[my-workspace]
host = https://my-workspace.cloud.databricks.com
`);
    expect(() => loadProfile(ini, '__settings__')).toThrow(
      '"__settings__" is a reserved section and cannot be used as a profile'
    );
  });

  // Scenario 9: default_profile pointing to nonexistent section.
  it('should throw when default_profile points to a nonexistent section', () => {
    const ini = parseIni(`
[__settings__]
default_profile = deleted-profile

[my-workspace]
host = https://my-workspace.cloud.databricks.com
`);
    expect(() => loadProfile(ini)).toThrow(
      'profile "deleted-profile" not found in configuration file'
    );
  });
});

describe('profile resolution order', () => {
  const resolutionCases = [
    {
      name: 'should use explicit profile when provided',
      ini: '[__settings__]\ndefault_profile = my-workspace\n\n[my-workspace]\nhost = h',
      explicit: 'my-workspace',
      want: 'my-workspace',
    },
    {
      name: 'should trim explicit profile before using it',
      ini: '[__settings__]\ndefault_profile = ws\n\n[explicit]\nhost = h',
      explicit: ' explicit ',
      want: 'explicit',
    },
    {
      name: 'should treat whitespace-only explicit profile as unset',
      ini: '[__settings__]\ndefault_profile = my-workspace\n\n[my-workspace]\nhost = h',
      explicit: '   ',
      want: 'my-workspace',
    },
    {
      name: 'should return DEFAULT when no settings and no explicit profile',
      ini: '[DEFAULT]\nhost = https://default.cloud.databricks.com',
      explicit: undefined,
      want: 'DEFAULT',
    },
  ];

  it.each(resolutionCases)('$name', ({ini: raw, explicit, want}) => {
    const ini = parseIni(raw);
    const profile = loadProfile(ini, explicit);
    expect(profile.name).toBe(want);
  });
});
