/**
 * Databricks authentication library for JavaScript/TypeScript.
 *
 * @packageDocumentation
 */

import pkgJson from '../package.json' with {type: 'json'};

export type {
  Header,
  Token,
  Credentials,
  TokenProvider,
  TokenCredentials,
} from './auth';
export {newTokenCredentials, tokenProviderFn} from './auth';

/** Version of this auth library, sourced from package.json. */
export const VERSION: string = pkgJson.version;
