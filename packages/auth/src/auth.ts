/**
 * Core authentication interfaces and types for the Databricks SDK.
 *
 * This module is not meant to be used directly by consumers of the SDK
 * and is subject to change without notice.
 *
 * @packageDocumentation
 */

/**
 * Represents a header that can be used to sign requests.
 */
export interface Header {
  key: string;
  value: string;
}

/**
 * Anything that can return authentication headers.
 */
export interface Credentials {
  /**
   * Returns headers to authenticate requests.
   */
  authHeaders(): Promise<Header[]>;
}

/**
 * Represents a token that can be used to sign requests.
 */
export interface Token {
  /**
   * The raw value to sign requests with.
   * It typically is an access token but can represent other types of tokens
   * (e.g., ID tokens).
   */
  value: string;

  /**
   * The type of token. If empty, the token type is assumed to be "Bearer".
   */
  type?: string;

  /**
   * The time at which the token expires.
   * If undefined, the token is considered to be valid indefinitely.
   */
  expiry?: Date;
}

/**
 * Anything that can return a token.
 */
export interface TokenProvider {
  /**
   * Returns a token or throws an error.
   * The returned Token should be considered immutable and should not be
   * modified.
   */
  token(): Promise<Token>;
}

/**
 * Adapter to allow the use of ordinary functions as TokenProvider.
 *
 * @example
 * const provider = tokenProviderFn(async () => ({ value: 'my-token' }));
 */
export function tokenProviderFn(fn: () => Promise<Token>): TokenProvider {
  return {token: fn};
}

/**
 * Combines TokenProvider and Credentials interfaces.
 */
export interface TokenCredentials extends TokenProvider, Credentials {}

/**
 * Creates a TokenCredentials that uses the given TokenProvider to return
 * authentication headers.
 */
export function newTokenCredentials(provider: TokenProvider): TokenCredentials {
  return new TokenCredentialsImpl(provider);
}

class TokenCredentialsImpl implements TokenCredentials {
  private readonly provider: TokenProvider;

  constructor(provider: TokenProvider) {
    this.provider = provider;
  }

  async token(): Promise<Token> {
    return this.provider.token();
  }

  async authHeaders(): Promise<Header[]> {
    const t = await this.token();
    const scheme = t.type ?? 'Bearer';
    return [{key: 'Authorization', value: `${scheme} ${t.value}`}];
  }
}
