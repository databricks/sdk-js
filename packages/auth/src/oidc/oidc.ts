/**
 * IdToken represents an OIDC ID token that can be exchanged for a Databricks
 * access token.
 */
export interface IdToken {
  value: string;
}

/**
 * IdTokenProvider is anything that returns an IdToken given an audience.
 */
export interface IdTokenProvider {
  idToken(audience: string): Promise<IdToken>;
}

/**
 * Adapter to allow the use of ordinary functions as IdTokenProvider.
 *
 * @example
 * const provider = idTokenProviderFn(async () => ({ value: 'my-id-token' }));
 */
export function idTokenProviderFn(
  fn: (audience: string) => Promise<IdToken>
): IdTokenProvider {
  return {idToken: fn};
}
