import {describe, it, expect} from 'vitest';
import {
  DEFAULT_DEBUG_TRUNCATE_BYTES,
  onlyNBytes,
  redactedDumpBody,
  redactHeaders,
} from '../../src/logger/debug';

describe('DEFAULT_DEBUG_TRUNCATE_BYTES', () => {
  it('matches the Go SDK default of 96', () => {
    expect(DEFAULT_DEBUG_TRUNCATE_BYTES).toBe(96);
  });
});

describe('onlyNBytes', () => {
  it('returns the string unchanged when within the budget', () => {
    expect(onlyNBytes('hello', 96)).toBe('hello');
  });

  it('truncates and appends the remaining byte count', () => {
    expect(onlyNBytes('abcdef', 3)).toBe('abc... (3 more bytes)');
  });

  it('truncates on a UTF-8 byte boundary without splitting code points', () => {
    // "é" is two UTF-8 bytes; a budget of 2 keeps exactly one character.
    const result = onlyNBytes('éé', 2);
    expect(result).toBe('é... (2 more bytes)');
  });
});

describe('redactedDumpBody', () => {
  it('returns an empty string for an empty body', () => {
    expect(redactedDumpBody('', 96)).toBe('');
  });

  it('redacts every known secret field by key', () => {
    const keys = [
      'string_value',
      'token_value',
      'content',
      'access_token',
      'refresh_token',
      'id_token',
      'token',
      'password',
    ];
    for (const key of keys) {
      const out = redactedDumpBody(JSON.stringify({[key]: 'super-secret'}), 96);
      expect(out).toContain('**REDACTED**');
      expect(out).not.toContain('super-secret');
    }
  });

  it('keeps non-secret fields and truncates long string values', () => {
    const text = JSON.stringify({name: 'a'.repeat(200)});
    const out = redactedDumpBody(text, 10);
    expect(out).toContain('more bytes');
    expect(out).not.toContain('a'.repeat(200));
  });

  it('redacts secrets in nested objects', () => {
    const text = JSON.stringify({outer: {password: 'p'}});
    const out = redactedDumpBody(text, 96);
    expect(out).toContain('**REDACTED**');
    expect(out).not.toContain('"p"');
  });

  it('emits an array trailer once the budget is spent', () => {
    const big = Array.from({length: 50}, (_, i) => 'x'.repeat(40) + String(i));
    const out = redactedDumpBody(JSON.stringify(big), 8);
    expect(out).toContain('additional elements');
  });

  it('truncates a non-JSON body wholesale', () => {
    const out = redactedDumpBody('not json '.repeat(50), 10);
    expect(out).toContain('more bytes');
  });
});

describe('redactHeaders', () => {
  it('redacts authorization-family headers regardless of case', () => {
    const headers = new Headers({
      Authorization: 'Bearer secret-token',
      'X-Databricks-Azure-SP-Management-Token': 'azure-secret',
      'X-Databricks-GCP-SA-Access-Token': 'gcp-secret',
    });
    const out = redactHeaders(headers, 96);
    expect(out.authorization).toBe('REDACTED');
    expect(out['x-databricks-azure-sp-management-token']).toBe('REDACTED');
    expect(out['x-databricks-gcp-sa-access-token']).toBe('REDACTED');
    const serialized = JSON.stringify(out);
    expect(serialized).not.toContain('secret-token');
    expect(serialized).not.toContain('azure-secret');
  });

  it('truncates non-secret header values', () => {
    const headers = new Headers({'X-Custom': 'v'.repeat(200)});
    const out = redactHeaders(headers, 10);
    expect(out['x-custom']).toContain('more bytes');
  });

  it('returns header names sorted for deterministic output', () => {
    const headers = new Headers({'X-Zed': '1', 'X-Abc': '2'});
    expect(Object.keys(redactHeaders(headers, 96))).toEqual(['x-abc', 'x-zed']);
  });
});
