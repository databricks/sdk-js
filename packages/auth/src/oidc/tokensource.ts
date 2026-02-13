/**
 * Databricks OIDC token provider for the Databricks SDK.
 */

import type {Token, TokenProvider} from '../auth';
import type {IdTokenProvider} from './oidc';

/**
 * OAuth authorization server endpoints.
 */
export interface OAuthAuthorizationServer {
  tokenEndpoint: string;
}

/**
 * Configuration for a Databricks OIDC TokenProvider.
 */
export interface DatabricksOidcTokenProviderConfig {
  /**
   * ClientID of the Databricks OIDC application.
   * Corresponds to the Application ID of the Databricks Service Principal.
   *
   * This field is only required for Workload Identity Federation and should
   * be empty for Account-wide token federation.
   */
  clientId?: string;

  /**
   * AccountID is the account ID of the Databricks Account.
   * This field is only required for Account-wide token federation.
   */
  accountId?: string;

  /**
   * Host is the host of the Databricks account or workspace.
   */
  host: string;

  /**
   * Returns the token endpoint for the Databricks OIDC application.
   */
  tokenEndpointProvider(): Promise<OAuthAuthorizationServer>;

  /**
   * Audience of the Databricks OIDC application.
   * This is only used for Workspace level tokens.
   */
  audience?: string;

  /**
   * Returns the IdToken to be used for the token exchange.
   */
  idTokenProvider: IdTokenProvider;

  /**
   * HTTP client for making requests (injectable for testing).
   */
  httpClient?: HttpClient;
}

/**
 * HTTP client interface for token exchange.
 */
export interface HttpClient {
  post(
    url: string,
    params: URLSearchParams
  ): Promise<{access_token: string; token_type: string; expires_in?: number}>;
}

/**
 * Creates a new Databricks OIDC TokenProvider.
 */
export function newDatabricksOidcTokenProvider(
  config: DatabricksOidcTokenProviderConfig
): TokenProvider {
  return new DatabricksOidcTokenProvider(config);
}

class DatabricksOidcTokenProvider implements TokenProvider {
  private readonly config: DatabricksOidcTokenProviderConfig;

  constructor(config: DatabricksOidcTokenProviderConfig) {
    this.config = config;
  }

  async token(): Promise<Token> {
    if (!this.config.host) {
      throw new Error('missing Host');
    }

    const endpoints = await this.config.tokenEndpointProvider();
    const audience = this.determineAudience(endpoints);
    const idToken = await this.config.idTokenProvider.idToken(audience);

    const params = new URLSearchParams({
      client_id: this.config.clientId ?? '',
      subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
      subject_token: idToken.value,
      grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
      scope: 'all-apis',
    });

    const client = this.config.httpClient ?? this.getDefaultHttpClient();
    const response = await client.post(endpoints.tokenEndpoint, params);

    return {
      value: response.access_token,
      type: response.token_type,
      expiry:
        response.expires_in !== undefined
          ? new Date(Date.now() + response.expires_in * 1000)
          : undefined,
    };
  }

  private determineAudience(endpoints: OAuthAuthorizationServer): string {
    if (this.config.audience !== undefined && this.config.audience !== '') {
      return this.config.audience;
    }
    // For Databricks Accounts, the account id is the default audience.
    if (this.config.accountId !== undefined && this.config.accountId !== '') {
      return this.config.accountId;
    }
    // For Databricks Workspaces, the auth endpoint is the default audience.
    return endpoints.tokenEndpoint;
  }

  private getDefaultHttpClient(): HttpClient {
    return {
      async post(
        url: string,
        params: URLSearchParams
      ): Promise<{
        access_token: string;
        token_type: string;
        expires_in?: number;
      }> {
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: params.toString(),
        });
        if (!response.ok) {
          throw new Error(`Token exchange failed: ${response.statusText}`);
        }
        return response.json() as Promise<{
          access_token: string;
          token_type: string;
          expires_in?: number;
        }>;
      },
    };
  }
}
