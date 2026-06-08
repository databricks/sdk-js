/**
 * Personal Access Token (PAT) credentials for the Databricks SDK.
 */

import type {Credentials, Header} from '../auth';

import {PatCredentialsError} from './errors';

/**
 * Creates a Credentials that can be used to authenticate with a Personal
 * Access Token.
 *
 * @param token - The personal access token.
 * @returns Credentials for PAT authentication.
 * @throws PatCredentialsError with code `TOKEN_REQUIRED` if the token is empty
 *   after trimming, or `TOKEN_MALFORMED` if it contains internal whitespace.
 */
export function newPatCredentials(token: string): Credentials {
  const trimmed = token.trim();
  if (trimmed === '') {
    throw new PatCredentialsError('TOKEN_REQUIRED', 'token is required');
  }
  // Internal whitespace would corrupt the header even after trimming, so
  // reject it rather than silently producing a malformed `Bearer` value.
  if (/\s/.test(trimmed)) {
    throw new PatCredentialsError(
      'TOKEN_MALFORMED',
      'token must not contain whitespace'
    );
  }
  return new PatCredentials(trimmed);
}

class PatCredentials implements Credentials {
  constructor(private readonly token: string) {}

  name(): string {
    return 'pat';
  }

  authHeaders(): Promise<Header[]> {
    return Promise.resolve([
      {key: 'Authorization', value: `Bearer ${this.token}`},
    ]);
  }
}
