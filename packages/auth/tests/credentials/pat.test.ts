import {describe, it, expect} from 'vitest';
import type {Header} from '../../src/auth';
// Import from the specific module rather than the barrel because the barrel
// re-exports Node-only credentials (`newU2mCredentials`) that can't load in
// browser test runs.
import {newPatCredentials} from '../../src/credentials/pat';

describe('newPatCredentials', () => {
  const validCases: {name: string; token: string; expected: Header[]}[] = [
    {
      name: 'databricks PAT',
      token: 'dapi1234567890abcdef',
      expected: [{key: 'Authorization', value: 'Bearer dapi1234567890abcdef'}],
    },
    {
      name: 'generic token',
      token: 'some-other-token',
      expected: [{key: 'Authorization', value: 'Bearer some-other-token'}],
    },
  ];

  it.each(validCases)(
    'should return correct Authorization header for $name',
    async ({token, expected}) => {
      const credentials = newPatCredentials(token);
      const headers = await credentials.authHeaders();
      expect(headers).toEqual(expected);
    }
  );

  it('should return consistent headers on multiple calls', async () => {
    const credentials = newPatCredentials('test-token');
    const headers1 = await credentials.authHeaders();
    const headers2 = await credentials.authHeaders();
    expect(headers1).toEqual(headers2);
  });

  it('exposes the pat strategy name', () => {
    expect(newPatCredentials('test-token').name()).toBe('pat');
  });

  it('should throw for empty token with correct error name and message', () => {
    let caught: Error | undefined;
    try {
      newPatCredentials('');
    } catch (e) {
      caught = e as Error;
    }
    expect(caught).toBeInstanceOf(Error);
    expect(caught?.name).toBe('TokenRequiredError');
    expect(caught?.message).toBe('token is required');
  });
});
