/**
 * Databricks OIDC token-exchange provider. Exchanges an OIDC ID token for a
 * Databricks access token using the OAuth 2.0 token-exchange grant.
 */

import {z} from 'zod';

import type {Token, TokenProvider} from '../auth';
import {tokenProviderFn} from '../auth';

import type {IDTokenProvider} from './oidc';

/**
 * OAuthAuthorizationServer describes the OAuth endpoints used to mint
 * Databricks access tokens.
 */
export interface OAuthAuthorizationServer {
  tokenEndpoint: string;
}

/**
 * DatabricksOIDCTokenProviderConfig is the configuration for a Databricks OIDC
 * TokenProvider.
 */
export interface DatabricksOIDCTokenProviderConfig {
  /**
   * ClientID of the Databricks OIDC application. It corresponds to the
   * Application ID of the Databricks Service Principal.
   *
   * This field is only required for Workload Identity Federation and should
   * be empty for Account-wide token federation.
   */
  clientId?: string;

  /**
   * AccountID is the account ID of the Databricks Account. This field is
   * only required for Account-wide token federation.
   */
  accountId?: string;

  /**
   * Host is the host of the Databricks account or workspace.
   */
  host: string;

  /**
   * TokenEndpointProvider returns the token endpoint for the Databricks OIDC
   * application.
   */
  tokenEndpointProvider: () => Promise<OAuthAuthorizationServer>;

  /**
   * Audience is the audience of the Databricks OIDC application.
   * This is only used for Workspace level tokens.
   */
  audience?: string;

  /**
   * IDTokenProvider returns the IDToken to be used for the token exchange.
   */
  idTokenProvider: IDTokenProvider;
}

/**
 * Returns a new Databricks OIDC TokenProvider that exchanges an OIDC ID token
 * for a Databricks access token using the OAuth 2.0 token-exchange grant.
 */
export function newDatabricksOIDCTokenProvider(
  config: DatabricksOIDCTokenProviderConfig
): TokenProvider {
  return tokenProviderFn(() => exchangeIdToken(config));
}

async function exchangeIdToken(
  config: DatabricksOIDCTokenProviderConfig
): Promise<Token> {
  if (config.host === '') {
    throw new Error('missing Host');
  }
  const endpoints = await config.tokenEndpointProvider();
  const audience = determineAudience(config, endpoints);
  const idToken = await config.idTokenProvider.idToken(audience);

  const params = new URLSearchParams();
  if (config.clientId !== undefined && config.clientId !== '') {
    params.set('client_id', config.clientId);
  }
  params.set('scope', 'all-apis');
  params.set('subject_token_type', 'urn:ietf:params:oauth:token-type:jwt');
  params.set('subject_token', idToken.value);
  params.set('grant_type', 'urn:ietf:params:oauth:grant-type:token-exchange');

  const response = await fetch(endpoints.tokenEndpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: params.toString(),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(
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

function determineAudience(
  config: DatabricksOIDCTokenProviderConfig,
  endpoints: OAuthAuthorizationServer
): string {
  if (config.audience !== undefined && config.audience !== '') {
    return config.audience;
  }
  if (config.accountId !== undefined && config.accountId !== '') {
    return config.accountId;
  }
  return endpoints.tokenEndpoint;
}

const tokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string().optional(),
  expires_in: z.number().optional(),
});
