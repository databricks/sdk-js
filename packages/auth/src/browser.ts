/**
 * Browser-compatible subset of the Databricks authentication library.
 *
 * This entry point only exports modules that work in browser environments.
 * For Node.js-only features (file-based tokens, environment variables),
 * use the main entry point instead.
 *
 * @example
 * ```typescript
 * // Browser-safe imports
 * import { newPatCredentials, newDatabricksOidcTokenProvider } from '@databricks/sdk-auth/browser';
 * ```
 *
 * @packageDocumentation
 */

// Core authentication types and utilities - all browser compatible.
export type {
  Header,
  Token,
  Credentials,
  TokenProvider,
  TokenCredentials,
} from './auth';
export {tokenProviderFn, newTokenCredentials} from './auth';

// Token caching - browser compatible.
export type {CachedTokenProviderOptions} from './cache';
export {newCachedTokenProvider} from './cache';

// PAT credentials - browser compatible.
export {newPatCredentials, TokenRequiredError} from './credentials';

// OIDC utilities - browser compatible subset only.
export type {IdToken, IdTokenProvider} from './oidc/oidc';
export {idTokenProviderFn} from './oidc/oidc';

// Databricks OIDC token provider - browser compatible.
export type {
  OAuthAuthorizationServer,
  DatabricksOidcTokenProviderConfig,
  HttpClient as OidcHttpClient,
} from './oidc/tokensource';
export {newDatabricksOidcTokenProvider} from './oidc/tokensource';

// GitHub OIDC - browser compatible (requires injected HTTP client).
export type {HttpClient as GithubHttpClient} from './oidc/github';
export {newGithubIdTokenProvider} from './oidc/github';

// Data plane - browser compatible.
export type {OAuthClient, EndpointTokenProvider} from './dataplane';
export {newEndpointTokenProvider} from './dataplane';

// NOTE: The following are NOT exported from browser entry point:
// - newEnvIdTokenProvider (uses process.env)
// - newFileTokenProvider (uses fs/promises)
// - newAzureDevOpsIdTokenProvider (uses process.env)
