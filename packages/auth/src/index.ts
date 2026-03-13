/**
 * Databricks authentication library for JavaScript/TypeScript.
 *
 * This library provides authentication utilities for the Databricks SDK,
 * including token providers, credentials, and OIDC support.
 *
 * ## Browser vs Node.js
 *
 * This entry point includes all features, some of which are Node.js-only.
 * For browser environments, use the browser-specific entry point:
 *
 * ```typescript
 * // Browser-safe imports
 * import { newPatCredentials, newCachedTokenProvider } from '@databricks/sdk-auth/browser';
 *
 * // Full API (Node.js only)
 * import { newFileTokenProvider, newEnvIdTokenProvider } from '@databricks/sdk-auth';
 * ```
 *
 * ### Node.js-only exports:
 * - `newEnvIdTokenProvider` - Uses `process.env`
 * - `newFileTokenProvider` - Uses `fs/promises`
 * - `newAzureDevOpsIdTokenProvider` - Uses `process.env`
 *
 * @packageDocumentation
 */

// Core authentication types and utilities.
export type {
  Header,
  Token,
  Credentials,
  TokenProvider,
  TokenCredentials,
} from './auth';
export {tokenProviderFn, newTokenCredentials} from './auth';

// Token caching.
export type {CachedTokenProviderOptions} from './cache';
export {newCachedTokenProvider} from './cache';

// Credential implementations.
export {newPatCredentials, TokenRequiredError} from './credentials';

// OIDC utilities.
export type {IdToken, IdTokenProvider} from './oidc/oidc';
export {
  idTokenProviderFn,
  /**
   * Creates an IdTokenProvider that reads the ID token from an environment variable.
   *
   * **Node.js only** - Uses `process.env`.
   *
   * @param envVar - The name of the environment variable containing the token.
   */
  newEnvIdTokenProvider,
  /**
   * Creates an IdTokenProvider that reads the ID token from a file.
   *
   * **Node.js only** - Uses `fs/promises`.
   *
   * @param path - The path to the file containing the token.
   */
  newFileTokenProvider,
} from './oidc/oidc';

export type {
  OAuthAuthorizationServer,
  DatabricksOidcTokenProviderConfig,
  HttpClient as OidcHttpClient,
} from './oidc/tokensource';
export {newDatabricksOidcTokenProvider} from './oidc/tokensource';

export type {HttpClient as GithubHttpClient} from './oidc/github';
export {newGithubIdTokenProvider} from './oidc/github';

export type {HttpClient as AzureDevOpsHttpClient} from './oidc/azure_devops';
export {
  MissingAccessTokenError,
  NotInAzureDevOpsError,
  /**
   * Creates an IdTokenProvider for Azure DevOps Pipelines.
   *
   * **Node.js only** - Uses `process.env` for Azure DevOps environment variables.
   *
   * @param httpClient - HTTP client for making requests.
   */
  newAzureDevOpsIdTokenProvider,
} from './oidc/azure_devops';

// Data plane utilities.
export type {OAuthClient, EndpointTokenProvider} from './dataplane';
export {newEndpointTokenProvider} from './dataplane';
