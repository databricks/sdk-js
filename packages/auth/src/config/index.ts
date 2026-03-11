/**
 * Configuration file parsing and profile resolution.
 */

export {parseIni} from './ini';
export type {IniFile} from './ini';
export {
  resolveProfileName,
  loadProfile,
  listProfiles,
  loadProfileFromString,
} from './config-file';
export type {Profile} from './config-file';
