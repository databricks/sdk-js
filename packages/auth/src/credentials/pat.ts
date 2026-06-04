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
 * @throws PatCredentialsError if token is empty.
 */
export function newPatCredentials(token: string): Credentials {
  if (token === '') {
    throw new PatCredentialsError('TOKEN_REQUIRED', 'token is required');
  }
  return new PatCredentials(token);
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
