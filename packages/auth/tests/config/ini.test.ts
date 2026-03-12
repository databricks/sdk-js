import {describe, it, expect} from 'vitest';
import {parseIni} from '../../src/config';

describe('parseIni', () => {
  it('should parse sections with key-value pairs', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://default.cloud.databricks.com
token = dapiXYZ
`);
    expect(Object.keys(ini)).toHaveLength(1);
    const section = ini.DEFAULT;
    expect(section).toBeDefined();
    expect(section.host).toBe('https://default.cloud.databricks.com');
    expect(section.token).toBe('dapiXYZ');
  });

  it('should parse multiple sections', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://default.cloud.databricks.com

[staging]
host = https://staging.cloud.databricks.com
`);
    expect(Object.keys(ini)).toHaveLength(2);
    expect(ini.DEFAULT.host).toBe('https://default.cloud.databricks.com');
    expect(ini.staging.host).toBe('https://staging.cloud.databricks.com');
  });

  it('should skip comment lines starting with # or ;', () => {
    const ini = parseIni(`
[DEFAULT]
# This is a comment.
host = https://default.cloud.databricks.com
; Another comment.
token = dapiXYZ
`);
    const section = ini.DEFAULT;
    expect(Object.keys(section)).toHaveLength(2);
    expect(section.host).toBe('https://default.cloud.databricks.com');
    expect(section.token).toBe('dapiXYZ');
  });

  it('should skip empty lines', () => {
    const ini = parseIni(`
[DEFAULT]

host = https://default.cloud.databricks.com

token = dapiXYZ
`);
    const section = ini.DEFAULT;
    expect(Object.keys(section)).toHaveLength(2);
  });

  it('should trim whitespace from keys and values', () => {
    const ini = parseIni(`
[DEFAULT]
  host  =  https://default.cloud.databricks.com
  token  =  dapiXYZ
`);
    const section = ini.DEFAULT;
    expect(section.host).toBe('https://default.cloud.databricks.com');
    expect(section.token).toBe('dapiXYZ');
  });

  it('should handle values containing equals signs', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://host.com?param=value
`);
    const section = ini.DEFAULT;
    expect(section.host).toBe('https://host.com?param=value');
  });

  it('should return empty record for empty input', () => {
    const ini = parseIni('');
    expect(Object.keys(ini)).toHaveLength(0);
  });

  it('should handle section with no keys', () => {
    const ini = parseIni(`
[empty]

[DEFAULT]
host = https://default.cloud.databricks.com
`);
    expect(Object.keys(ini.empty)).toHaveLength(0);
    expect(ini.DEFAULT.host).toBe('https://default.cloud.databricks.com');
  });

  // Edge case: Windows line endings.
  it('should handle Windows line endings (CRLF)', () => {
    const ini = parseIni(
      '[DEFAULT]\r\nhost = https://default.cloud.databricks.com\r\ntoken = dapiXYZ\r\n'
    );
    const section = ini.DEFAULT;
    expect(section.host).toBe('https://default.cloud.databricks.com');
    expect(section.token).toBe('dapiXYZ');
  });

  // Edge case: key-value pairs before any section header are excluded.
  it('should exclude global key-value pairs before any section', () => {
    const ini = parseIni(`
orphan_key = orphan_value
[DEFAULT]
host = https://default.cloud.databricks.com
`);
    // Global keys are not sections and should be excluded.
    expect(ini.DEFAULT).toBeDefined();
    expect(ini.DEFAULT.host).toBe('https://default.cloud.databricks.com');
    // The orphan key should not appear as a section.
    expect(Object.keys(ini)).toEqual(['DEFAULT']);
  });

  // Edge case: duplicate section names (last one wins).
  it('should use last occurrence when sections are duplicated', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://first.cloud.databricks.com

[DEFAULT]
host = https://second.cloud.databricks.com
`);
    expect(ini.DEFAULT.host).toBe('https://second.cloud.databricks.com');
  });

  // Edge case: inline comments are stripped by the ini library.
  it('should strip inline comments', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://default.cloud.databricks.com # my workspace
`);
    const section = ini.DEFAULT;
    expect(section.host).toBe('https://default.cloud.databricks.com');
  });
});
