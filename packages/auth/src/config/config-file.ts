/**
 * Databricks configuration file (`~/.databrickscfg`) loader and profile
 * resolution.
 */

import type {IniFile} from './ini';
import {parseIni} from './ini';

/** The reserved section name for tool settings (not a profile). */
const SETTINGS_SECTION = '__settings__';

/** The key within `[__settings__]` that names the default profile. */
const DEFAULT_PROFILE_KEY = 'default_profile';

/** The legacy default profile section name. */
const LEGACY_DEFAULT_PROFILE = 'DEFAULT';

/**
 * A profile extracted from a `.databrickscfg` file.
 */
export interface Profile {
  /** The section name (e.g. "my-workspace", "DEFAULT"). */
  name: string;
  /** Key-value pairs from the section. */
  values: Map<string, string>;
}

/**
 * Resolves which profile name to load from the given INI file.
 *
 * Resolution order:
 * 1. If `explicitProfile` is non-empty, use it directly.
 * 2. If `[__settings__].default_profile` is set and non-empty, use it.
 * 3. Fall back to `"DEFAULT"`.
 */
export function resolveProfileName(
  ini: IniFile,
  explicitProfile?: string
): string {
  if (explicitProfile !== undefined && explicitProfile !== '') {
    return explicitProfile;
  }

  const settings = ini.get(SETTINGS_SECTION);
  if (settings !== undefined) {
    const defaultProfile = settings.get(DEFAULT_PROFILE_KEY);
    if (defaultProfile !== undefined && defaultProfile !== '') {
      return defaultProfile;
    }
  }

  return LEGACY_DEFAULT_PROFILE;
}

/**
 * Loads a single profile from the parsed INI file.
 *
 * Uses {@link resolveProfileName} to determine which profile to load,
 * then returns the matching section. Throws if the resolved profile
 * does not exist in the file.
 *
 * @param ini - Parsed INI file contents.
 * @param explicitProfile - An explicitly requested profile name (e.g. from
 *   `--profile` or `DATABRICKS_CONFIG_PROFILE`). When set, it takes
 *   precedence over `[__settings__].default_profile`.
 * @returns The resolved profile.
 * @throws Error if the resolved profile section does not exist.
 */
export function loadProfile(ini: IniFile, explicitProfile?: string): Profile {
  const name = resolveProfileName(ini, explicitProfile);
  const section = ini.get(name);
  if (section === undefined) {
    throw new Error(
      `profile "${name}" not found in configuration file`
    );
  }
  return {name, values: section};
}

/**
 * Lists all profiles in the INI file.
 *
 * A section is considered a profile if:
 * - Its name is not `__settings__` (reserved for tool settings).
 * - It contains a non-empty `host` key.
 */
export function listProfiles(ini: IniFile): Profile[] {
  const profiles: Profile[] = [];
  for (const [name, values] of ini) {
    if (name === SETTINGS_SECTION) {
      continue;
    }
    const host = values.get('host');
    if (host !== undefined && host !== '') {
      profiles.push({name, values});
    }
  }
  return profiles;
}

/**
 * Parses a `.databrickscfg` file from its raw string content and loads
 * the requested (or default) profile.
 *
 * This is a convenience function combining {@link parseIni} and
 * {@link loadProfile}.
 */
export function loadProfileFromString(
  content: string,
  explicitProfile?: string
): Profile {
  const ini = parseIni(content);
  return loadProfile(ini, explicitProfile);
}
