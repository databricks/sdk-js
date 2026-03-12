/**
 * Databricks authentication library for JavaScript/TypeScript.
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

// Credential implementations.
export {newPatCredentials} from './credentials';
