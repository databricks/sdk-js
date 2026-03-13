/**
 * OIDC ID token utilities for the Databricks SDK.
 *
 * This module is experimental and subject to change.
 */

/**
 * Represents an OIDC ID token that can be exchanged for a Databricks access token.
 */
export interface IdToken {
  value: string;
}

/**
 * Anything that returns an IdToken given an audience.
 */
export interface IdTokenProvider {
  /**
   * Returns an ID token for the specified audience.
   * @param audience - The audience for the ID token.
   */
  idToken(audience: string): Promise<IdToken>;
}

/**
 * Adapter to allow the use of ordinary functions as IdTokenProvider.
 *
 * @example
 * const provider = idTokenProviderFn(async (audience) => ({ value: 'my-token' }));
 */
export function idTokenProviderFn(
  fn: (audience: string) => Promise<IdToken>
): IdTokenProvider {
  return {idToken: fn};
}

/**
 * Creates an IdTokenProvider that reads the ID token from an environment variable.
 *
 * Note that the IdTokenProvider does not cache the token and will read the token
 * from the environment variable each time.
 *
 * @param envVar - The name of the environment variable containing the token.
 */
export function newEnvIdTokenProvider(envVar: string): IdTokenProvider {
  return idTokenProviderFn((_audience: string): Promise<IdToken> => {
    const token = process.env[envVar];
    if (token === undefined || token === '') {
      return Promise.reject(new Error(`missing env var "${envVar}"`));
    }
    return Promise.resolve({value: token});
  });
}

/**
 * Creates an IdTokenProvider that reads the ID token from a file.
 * The file should contain the token as text.
 *
 * @param path - The path to the file containing the token.
 */
export function newFileTokenProvider(path: string): IdTokenProvider {
  return idTokenProviderFn(async (_audience: string): Promise<IdToken> => {
    if (!path) {
      throw new Error('missing path');
    }

    const fs = await import('fs/promises');

    let content: string;
    try {
      content = await fs.readFile(path, 'utf-8');
    } catch (error: unknown) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new Error(`file "${path}" does not exist`);
      }
      throw error;
    }

    if (!content || content.length === 0) {
      throw new Error(`file "${path}" is empty`);
    }

    return {value: content};
  });
}
