/**
 * GitHub Actions OIDC token provider for the Databricks SDK.
 */

import type {IdToken, IdTokenProvider} from './oidc';

/**
 * HTTP client interface for GitHub Actions.
 */
export interface HttpClient {
  get<T>(url: string, headers: Record<string, string>): Promise<T>;
}

/**
 * Creates a new IdTokenProvider that retrieves an IdToken from the GitHub Actions environment.
 * This IdTokenProvider is only valid when running in GitHub Actions with OIDC enabled.
 *
 * @param httpClient - HTTP client for making requests.
 * @param actionsIdTokenRequestUrl - The URL to request the ID token from (ACTIONS_ID_TOKEN_REQUEST_URL).
 * @param actionsIdTokenRequestToken - The token for authenticating the request (ACTIONS_ID_TOKEN_REQUEST_TOKEN).
 */
export function newGithubIdTokenProvider(
  httpClient: HttpClient,
  actionsIdTokenRequestUrl: string,
  actionsIdTokenRequestToken: string
): IdTokenProvider {
  return new GithubIdTokenProvider(
    httpClient,
    actionsIdTokenRequestUrl,
    actionsIdTokenRequestToken
  );
}

class GithubIdTokenProvider implements IdTokenProvider {
  private readonly httpClient: HttpClient;
  private readonly actionsIdTokenRequestUrl: string;
  private readonly actionsIdTokenRequestToken: string;

  constructor(
    httpClient: HttpClient,
    actionsIdTokenRequestUrl: string,
    actionsIdTokenRequestToken: string
  ) {
    this.httpClient = httpClient;
    this.actionsIdTokenRequestUrl = actionsIdTokenRequestUrl;
    this.actionsIdTokenRequestToken = actionsIdTokenRequestToken;
  }

  async idToken(audience: string): Promise<IdToken> {
    if (!this.actionsIdTokenRequestUrl) {
      throw new Error(
        'missing ActionsIdTokenRequestUrl, likely not calling from a GitHub action'
      );
    }
    if (!this.actionsIdTokenRequestToken) {
      throw new Error(
        'missing ActionsIdTokenRequestToken, likely not calling from a GitHub action'
      );
    }

    let requestUrl = this.actionsIdTokenRequestUrl;
    if (audience) {
      requestUrl = `${requestUrl}&audience=${encodeURIComponent(audience)}`;
    }

    const response = await this.httpClient.get<IdToken>(requestUrl, {
      Authorization: `Bearer ${this.actionsIdTokenRequestToken}`,
    });

    return response;
  }
}
