import {describe, it, expect} from 'vitest';
import {parseIni} from '../../src/config/ini';

describe('parseIni', () => {
  it('should parse sections with key-value pairs', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://default.cloud.databricks.com
token = dapiXYZ
`);
    expect(ini.size).toBe(1);
    const section = ini.get('DEFAULT');
    expect(section).toBeDefined();
    expect(section?.get('host')).toBe('https://default.cloud.databricks.com');
    expect(section?.get('token')).toBe('dapiXYZ');
  });

  it('should parse multiple sections', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://default.cloud.databricks.com

[staging]
host = https://staging.cloud.databricks.com
`);
    expect(ini.size).toBe(2);
    expect(ini.get('DEFAULT')?.get('host')).toBe(
      'https://default.cloud.databricks.com'
    );
    expect(ini.get('staging')?.get('host')).toBe(
      'https://staging.cloud.databricks.com'
    );
  });

  it('should skip comment lines starting with # or ;', () => {
    const ini = parseIni(`
[DEFAULT]
# This is a comment.
host = https://default.cloud.databricks.com
; Another comment.
token = dapiXYZ
`);
    const section = ini.get('DEFAULT');
    expect(section?.size).toBe(2);
    expect(section?.get('host')).toBe('https://default.cloud.databricks.com');
    expect(section?.get('token')).toBe('dapiXYZ');
  });

  it('should skip empty lines', () => {
    const ini = parseIni(`
[DEFAULT]

host = https://default.cloud.databricks.com

token = dapiXYZ
`);
    const section = ini.get('DEFAULT');
    expect(section?.size).toBe(2);
  });

  it('should trim whitespace from keys and values', () => {
    const ini = parseIni(`
[DEFAULT]
  host  =  https://default.cloud.databricks.com
  token  =  dapiXYZ
`);
    const section = ini.get('DEFAULT');
    expect(section?.get('host')).toBe('https://default.cloud.databricks.com');
    expect(section?.get('token')).toBe('dapiXYZ');
  });

  it('should handle values containing equals signs', () => {
    const ini = parseIni(`
[DEFAULT]
host = https://host.com?param=value
`);
    const section = ini.get('DEFAULT');
    expect(section?.get('host')).toBe('https://host.com?param=value');
  });

  it('should return empty map for empty input', () => {
    const ini = parseIni('');
    expect(ini.size).toBe(0);
  });

  it('should handle section with no keys', () => {
    const ini = parseIni(`
[empty]

[DEFAULT]
host = https://default.cloud.databricks.com
`);
    expect(ini.get('empty')?.size).toBe(0);
    expect(ini.get('DEFAULT')?.get('host')).toBe(
      'https://default.cloud.databricks.com'
    );
  });
});
