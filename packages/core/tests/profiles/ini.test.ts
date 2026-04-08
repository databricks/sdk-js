import {describe, it, expect} from 'vitest';
// The INI module is internal and not exported from the barrel. We import
// directly because these tests verify the parser/writer in isolation.
import {parseIni, formatIni} from '../../src/profiles/ini';

describe('parseIni', () => {
  it('should parse sections and key-value pairs', () => {
    const input = [
      '[DEFAULT]',
      'host = https://default.cloud.databricks.com',
      'token = default-token',
      '',
      '[workspace]',
      'host = https://workspace.cloud.databricks.com',
    ].join('\n');

    const result = parseIni(input);

    expect(result.get('DEFAULT')?.get('host')).toBe(
      'https://default.cloud.databricks.com'
    );
    expect(result.get('DEFAULT')?.get('token')).toBe('default-token');
    expect(result.get('workspace')?.get('host')).toBe(
      'https://workspace.cloud.databricks.com'
    );
  });

  it('should handle inline comments with space before #', () => {
    const input = ['[test]', 'token = abc #this is a comment'].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.get('token')).toBe('abc');
  });

  it('should preserve # in values without preceding space', () => {
    const input = ['[test]', 'token = abc#def#ghi'].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.get('token')).toBe('abc#def#ghi');
  });

  it('should handle mixed # in values and inline comments', () => {
    const input = ['[test]', 'token = abc#def #comment'].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.get('token')).toBe('abc#def');
  });

  it('should handle ; as inline comment with space', () => {
    const input = ['[test]', 'host = value ;comment'].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.get('host')).toBe('value');
  });

  it('should skip full-line comments', () => {
    const input = [
      '[test]',
      '# This is a comment',
      '; This is also a comment',
      'host = value',
    ].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.size).toBe(1);
    expect(result.get('test')?.get('host')).toBe('value');
  });

  it('should skip blank lines', () => {
    const input = ['[test]', '', 'host = value', '', 'token = tok'].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.size).toBe(2);
  });

  it('should handle = in values', () => {
    const input = ['[test]', 'host = https://example.com?a=1&b=2'].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.get('host')).toBe('https://example.com?a=1&b=2');
  });

  it('should trim whitespace from keys and values', () => {
    const input = ['[test]', '  host  =  https://example.com  '].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.get('host')).toBe('https://example.com');
  });

  it('should create empty section entries for section headers', () => {
    const input = ['[empty]'].join('\n');

    const result = parseIni(input);

    expect(result.has('empty')).toBe(true);
    expect(result.get('empty')?.size).toBe(0);
  });

  it('should return empty map for empty input', () => {
    const result = parseIni('');

    expect(result.size).toBe(0);
  });

  it('should handle Windows-style line endings', () => {
    const input = '[test]\r\nhost = value\r\n';

    const result = parseIni(input);

    expect(result.get('test')?.get('host')).toBe('value');
  });

  it('should throw on lines without a key-value delimiter', () => {
    const input = ['[test]', 'invalid line', 'host = value'].join('\n');

    expect(() => parseIni(input)).toThrow(
      'key-value delimiter not found: invalid line'
    );
  });

  it('should support colon as key-value delimiter', () => {
    const input = ['[test]', 'host : https://example.com'].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.get('host')).toBe('https://example.com');
  });

  it('should strip matching quotes from values', () => {
    const input = [
      '[test]',
      'host = "https://example.com"',
      "token = 'my-token'",
    ].join('\n');

    const result = parseIni(input);

    expect(result.get('test')?.get('host')).toBe('https://example.com');
    expect(result.get('test')?.get('token')).toBe('my-token');
  });

  it('should join backslash-continued lines', () => {
    const input = ['[test]', 'desc = line1\\', 'line2', 'host = value'].join(
      '\n'
    );

    const result = parseIni(input);

    expect(result.get('test')?.size).toBe(2);
    expect(result.get('test')?.get('desc')).toBe('line1line2');
    expect(result.get('test')?.get('host')).toBe('value');
  });

  it('should preserve spaces in section names', () => {
    const input = ['[ my profile ]', 'host = value'].join('\n');

    const result = parseIni(input);

    expect(result.has(' my profile ')).toBe(true);
    expect(result.get(' my profile ')?.get('host')).toBe('value');
  });
});

describe('formatIni', () => {
  it('should format a single section', () => {
    const data = new Map([
      ['test', new Map([['host', 'https://example.com']])],
    ]);

    const result = formatIni(data);

    expect(result).toBe('[test]\nhost = https://example.com\n');
  });

  it('should align keys within a section', () => {
    const data = new Map([
      [
        'test',
        new Map([
          ['host', 'https://example.com'],
          ['token', 'my-token'],
          ['client_id', 'my-client'],
        ]),
      ],
    ]);

    const result = formatIni(data);

    const expected = [
      '[test]',
      'host      = https://example.com',
      'token     = my-token',
      'client_id = my-client',
      '',
    ].join('\n');
    expect(result).toBe(expected);
  });

  it('should separate multiple sections with blank lines', () => {
    const data = new Map([
      ['first', new Map([['host', 'https://first.com']])],
      ['second', new Map([['host', 'https://second.com']])],
    ]);

    const result = formatIni(data);

    const expected = [
      '[first]',
      'host = https://first.com',
      '',
      '[second]',
      'host = https://second.com',
      '',
    ].join('\n');
    expect(result).toBe(expected);
  });

  it('should handle empty sections', () => {
    const data = new Map([['empty', new Map<string, string>()]]);

    const result = formatIni(data);

    expect(result).toBe('[empty]\n');
  });

  it('should round-trip through parse and format', () => {
    const original = [
      '[DEFAULT]',
      'host  = https://default.com',
      'token = default-token',
      '',
      '[workspace]',
      'host = https://workspace.com',
    ].join('\n');

    const parsed = parseIni(original);
    const formatted = formatIni(parsed);
    const reparsed = parseIni(formatted);

    // Values should be identical after round-trip.
    expect(reparsed.get('DEFAULT')?.get('host')).toBe(
      parsed.get('DEFAULT')?.get('host')
    );
    expect(reparsed.get('DEFAULT')?.get('token')).toBe(
      parsed.get('DEFAULT')?.get('token')
    );
    expect(reparsed.get('workspace')?.get('host')).toBe(
      parsed.get('workspace')?.get('host')
    );
  });
});
