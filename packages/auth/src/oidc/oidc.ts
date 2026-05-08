/**
 * Package oidc provides utilities for working with OIDC ID tokens.
 *
 * This package is experimental and subject to change.
 */

/**
 * IDToken represents an OIDC ID token that can be exchanged for a Databricks
 * access token.
 */
export interface IDToken {
  value: string;
}

/**
 * IDTokenProvider is anything that returns an IDToken given an audience.
 */
export interface IDTokenProvider {
  idToken(audience: string): Promise<IDToken>;
}

/**
 * Adapter to allow the use of ordinary functions as IDTokenProvider.
 *
 * @example
 * const provider = idTokenProviderFn(async () => ({ value: 'my-id-token' }));
 */
export function idTokenProviderFn(
  fn: (audience: string) => Promise<IDToken>
): IDTokenProvider {
  return {idToken: fn};
}
