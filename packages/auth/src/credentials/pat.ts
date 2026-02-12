/**
 * Personal Access Token (PAT) credentials for the Databricks SDK.
 */

import type {Credentials, Header} from '../auth';

/**
 * Error thrown when a token is required but not provided.
 */
class TokenRequiredError extends Error {
  constructor() {
    super('token is required');
    this.name = 'TokenRequiredError';
  }
}

/**
 * Creates a Credentials that can be used to authenticate with a Personal
 * Access Token.
 *
 * @param token - The personal access token.
 * @returns Credentials for PAT authentication.
 * @throws TokenRequiredError if token is empty.
 */
export function newPatCredentials(token: string): Credentials {
  if (token === '') {
    throw new TokenRequiredError();
  }
  return new PatCredentials(token);
}

class PatCredentials implements Credentials {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  authHeaders(): Promise<Header[]> {
    return Promise.resolve([
      {key: 'Authorization', value: `Bearer ${this.token}`},
    ]);
  }
}
