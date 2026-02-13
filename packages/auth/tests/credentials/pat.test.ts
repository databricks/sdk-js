import {describe, it, expect} from 'vitest';
import {newPatCredentials, TokenRequiredError} from '../../src/credentials/pat';
import type {Header} from '../../src/auth';

describe('newPatCredentials', () => {
  it('should return credentials with valid token', async () => {
    const token = 'dapi1234567890abcdef';
    const credentials = newPatCredentials(token);

    const headers = await credentials.authHeaders();
    expect(headers).toEqual<Header[]>([
      {key: 'Authorization', value: `Bearer ${token}`},
    ]);
  });

  it('should throw TokenRequiredError for empty token', () => {
    expect(() => newPatCredentials('')).toThrow(TokenRequiredError);
  });

  it('should throw TokenRequiredError with correct message', () => {
    expect(() => newPatCredentials('')).toThrow('token is required');
  });

  it('should return consistent headers on multiple calls', async () => {
    const token = 'test-token';
    const credentials = newPatCredentials(token);

    const headers1 = await credentials.authHeaders();
    const headers2 = await credentials.authHeaders();

    expect(headers1).toEqual(headers2);
  });
});

describe('TokenRequiredError', () => {
  it('should have correct name', () => {
    const error = new TokenRequiredError();
    expect(error.name).toBe('TokenRequiredError');
  });

  it('should have correct message', () => {
    const error = new TokenRequiredError();
    expect(error.message).toBe('token is required');
  });

  it('should be instanceof Error', () => {
    const error = new TokenRequiredError();
    expect(error).toBeInstanceOf(Error);
  });
});
