/**
 * Data plane token provider for the Databricks SDK.
 *
 * This module is experimental and subject to change.
 */

import type {Token, TokenProvider} from '../auth';
import {newCachedTokenProvider} from '../cache';

/**
 * OAuth client interface for Databricks data plane.
 */
export interface OAuthClient {
  getOAuthToken(authDetails: string, token: Token): Promise<Token>;
}

/**
 * Anything that returns tokens given a data plane endpoint and authentication details.
 */
export interface EndpointTokenProvider {
  token(endpoint: string, authDetails: string): Promise<Token>;
}

/**
 * Creates a new EndpointTokenProvider that uses the given OAuthClient and control plane TokenProvider.
 */
export function newEndpointTokenProvider(
  client: OAuthClient,
  controlPlaneTokenProvider: TokenProvider
): EndpointTokenProvider {
  return new DataPlaneTokenProvider(client, controlPlaneTokenProvider);
}

class DataPlaneTokenProvider implements EndpointTokenProvider {
  private readonly client: OAuthClient;
  private readonly controlPlaneTokenProvider: TokenProvider;
  private readonly sources = new Map<string, TokenProvider>();

  constructor(client: OAuthClient, controlPlaneTokenProvider: TokenProvider) {
    this.client = client;
    this.controlPlaneTokenProvider = newCachedTokenProvider(
      controlPlaneTokenProvider
    );
  }

  async token(endpoint: string, authDetails: string): Promise<Token> {
    const key = this.makeKey(endpoint, authDetails);

    const existing = this.sources.get(key);
    if (existing) {
      return existing.token();
    }

    const provider = newCachedTokenProvider(
      new InnerTokenProvider(
        this.client,
        this.controlPlaneTokenProvider,
        authDetails
      )
    );
    this.sources.set(key, provider);

    return provider.token();
  }

  private makeKey(endpoint: string, authDetails: string): string {
    return `${endpoint}::${authDetails}`;
  }
}

class InnerTokenProvider implements TokenProvider {
  private readonly client: OAuthClient;
  private readonly controlPlaneTokenProvider: TokenProvider;
  private readonly authDetails: string;

  constructor(
    client: OAuthClient,
    controlPlaneTokenProvider: TokenProvider,
    authDetails: string
  ) {
    this.client = client;
    this.controlPlaneTokenProvider = controlPlaneTokenProvider;
    this.authDetails = authDetails;
  }

  async token(): Promise<Token> {
    const innerToken = await this.controlPlaneTokenProvider.token();
    return this.client.getOAuthToken(this.authDetails, innerToken);
  }
}
