import {describe, it, expect} from 'vitest';
import {parseIni} from '../../src/config/ini';
import {
  resolveProfileName,
  loadProfile,
  listProfiles,
  loadProfileFromString,
} from '../../src/config/config-file';

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
    expect(profile.values.get('host')).toBe(
      'https://my-workspace.cloud.databricks.com'
    );
    expect(profile.values.get('token')).toBe('dapiXYZ');
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
    expect(profile.values.get('host')).toBe(
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
    expect(profile.values.get('host')).toBe(
      'https://default.cloud.databricks.com'
    );
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
    expect(profile.values.get('host')).toBe(
      'https://default.cloud.databricks.com'
    );
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
    expect(profile.values.get('host')).toBe(
      'https://other.cloud.databricks.com'
    );
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

describe('resolveProfileName', () => {
  it('should return explicit profile when provided', () => {
    const ini = parseIni(`
[__settings__]
default_profile = my-workspace
`);
    expect(resolveProfileName(ini, 'explicit')).toBe('explicit');
  });

  it('should return DEFAULT when no settings and no explicit profile', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://default.cloud.databricks.com
`);
    expect(resolveProfileName(ini)).toBe('DEFAULT');
  });
});

describe('loadProfileFromString', () => {
  it('should parse and load a profile in one call', () => {
    const content = `
[__settings__]
default_profile = ws

[ws]
host = https://ws.cloud.databricks.com
token = dapiABC
`;
    const profile = loadProfileFromString(content);
    expect(profile.name).toBe('ws');
    expect(profile.values.get('token')).toBe('dapiABC');
  });

  it('should accept an explicit profile override', () => {
    const content = `
[__settings__]
default_profile = ws

[ws]
host = https://ws.cloud.databricks.com

[alt]
host = https://alt.cloud.databricks.com
`;
    const profile = loadProfileFromString(content, 'alt');
    expect(profile.name).toBe('alt');
  });
});
