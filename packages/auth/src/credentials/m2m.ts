/**
 * Machine-to-machine (M2M) OAuth credentials for the Databricks SDK.
 */

import {z} from 'zod';

import type {Token, TokenCredentials} from '../auth';
import {newTokenCredentials, tokenProviderFn} from '../auth';

import {M2mCredentialsError} from './errors';

/** Options for {@link newM2mCredentials}. */
export interface M2mCredentialsOptions {
  /**
   * OAuth client ID issued to the service principal.
   */
  clientId: string;

  /**
   * OAuth client secret issued to the service principal.
   */
  clientSecret: string;

  /**
   * The OAuth token endpoint to request access tokens from.
   */
  tokenEndpoint: string;

  /**
   * OAuth scopes to request. When omitted or empty, defaults to
   * `['all-apis']`.
   */
  scopes?: string[];
}

const DEFAULT_SCOPES: readonly string[] = ['all-apis'];

/**
 * Creates a TokenCredentials that authenticates as a Databricks service
 * principal using the OAuth client credentials grant.
 *
 * @param options - Client credentials and token endpoint.
 * @throws M2mCredentialsError when clientId, clientSecret, or tokenEndpoint
 * is empty, or when the token endpoint returns an error.
 */
export function newM2mCredentials(
  options: M2mCredentialsOptions
): TokenCredentials {
  if (options.clientId === '') {
    throw new M2mCredentialsError('CLIENT_ID_REQUIRED', 'clientId is required');
  }
  if (options.clientSecret === '') {
    throw new M2mCredentialsError(
      'CLIENT_SECRET_REQUIRED',
      'clientSecret is required'
    );
  }
  if (options.tokenEndpoint === '') {
    throw new M2mCredentialsError(
      'TOKEN_ENDPOINT_REQUIRED',
      'tokenEndpoint is required'
    );
  }

  const scopes =
    options.scopes !== undefined && options.scopes.length > 0
      ? options.scopes
      : DEFAULT_SCOPES;

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: scopes.join(' '),
  }).toString();

  // Client ID and secret are URL-encoded before Basic auth encoding to
  // avoid ambiguity with special characters in either value, matching the
  // behavior of golang.org/x/oauth2.
  const basicAuth = btoa(
    `${encodeURIComponent(options.clientId)}:${encodeURIComponent(options.clientSecret)}`
  );

  const provider = tokenProviderFn(() =>
    fetchAccessToken(options.tokenEndpoint, basicAuth, body)
  );

  return newTokenCredentials(provider);
}

async function fetchAccessToken(
  tokenEndpoint: string,
  basicAuth: string,
  body: string
): Promise<Token> {
  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new M2mCredentialsError(
      'TOKEN_REQUEST_FAILED',
      `token request failed with status ${response.status.toString()}: ${text}`
    );
  }
  const parsed = tokenResponseSchema.parse(await response.json());
  const expiry =
    parsed.expires_in !== undefined
      ? new Date(Date.now() + parsed.expires_in * 1000)
      : undefined;
  return {
    value: parsed.access_token,
    ...(parsed.token_type !== undefined && {type: parsed.token_type}),
    ...(expiry !== undefined && {expiry}),
  };
}

const tokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string().optional(),
  expires_in: z.number().optional(),
});
