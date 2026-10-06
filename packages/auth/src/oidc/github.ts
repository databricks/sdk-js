import type {HttpClient} from '@databricks/sdk-core/http';
import {newFetchHttpClient} from '@databricks/sdk-core/http';
import {z} from 'zod';

import type {IdTokenProvider} from './oidc';
import {idTokenProviderFn} from './oidc';

/** Configures {@link newGithubIdTokenProvider}. */
export interface GithubIdTokenProviderOptions {
  requestUrl: string;
  requestToken: string;

  /** Uses the Fetch API when omitted. */
  httpClient?: HttpClient;
}

/**
 * Returns a new IdTokenProvider that retrieves an IdToken from the Github
 * Actions environment. This IdTokenProvider is only valid when running in
 * Github Actions with OIDC enabled.
 */
export function newGithubIdTokenProvider(
  options: GithubIdTokenProviderOptions
): IdTokenProvider {
  const requestUrl = options.requestUrl;
  const requestToken = options.requestToken;
  const client = options.httpClient ?? newFetchHttpClient();

  return idTokenProviderFn(async audience => {
    if (requestUrl === '') {
      throw new Error('missing ActionsIDTokenRequestURL');
    }
    if (requestToken === '') {
      throw new Error('missing ActionsIDTokenRequestToken');
    }

    try {
      const url = new URL(requestUrl);
      if (audience !== '') {
        url.searchParams.set('audience', audience);
      }
      const response = await client.send({
        url: url.href,
        method: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${requestToken}`,
          Accept: 'application/json',
        }),
      });
      if (response.statusCode < 200 || response.statusCode >= 300) {
        await response.body?.cancel();
        throw new Error(`HTTP ${response.statusCode.toString()}`);
      }
      const raw: unknown = await new Response(response.body).json();
      return idTokenSchema.parse(raw);
    } catch (cause: unknown) {
      throw new Error(`failed to request ID token from ${requestUrl}`, {cause});
    }
  });
}

const idTokenSchema = z.object({value: z.string().min(1)});
