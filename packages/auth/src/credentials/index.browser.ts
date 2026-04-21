/**
 * Browser entry point for credential implementations. Excludes credentials
 * that depend on Node.js-only APIs (e.g. `databricks-cli` auth which spawns
 * the CLI binary).
 */

export {M2mCredentialsError} from './errors';
export type {M2mCredentialsErrorCode} from './errors';
export {newM2mCredentials} from './m2m';
export type {M2mCredentialsOptions} from './m2m';
export {newPatCredentials} from './pat';
