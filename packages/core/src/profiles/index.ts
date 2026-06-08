/**
 * Utility to resolve Databricks configuration profiles.
 *
 * A profile is a named collection of configuration values. It is typically
 * stored in a file called ~/.databrickscfg. Profiles can be resolved from the
 * file and/or environment variables using the {@link resolve} function.
 *
 * @packageDocumentation
 */

export {ProfileError} from './errors';
export type {ProfileErrorCode} from './errors';
export type {Profile, ProfileOptions} from './profile';
export {defaultConfigFile, listProfiles, resolve} from './resolve';
export {Secret} from './secret';
