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

// Configuration file parsing and profile resolution.
export {
  parseIni,
  resolveProfileName,
  loadProfile,
  listProfiles,
  loadProfileFromString,
} from './config';
export type {IniFile, Profile} from './config';
