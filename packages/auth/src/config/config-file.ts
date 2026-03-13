/**
 * Databricks configuration file (`~/.databrickscfg`) loader and profile
 * resolution.
 */

import type {IniFile} from './ini';

/** The reserved section name for tool settings (not a profile). */
const SETTINGS_SECTION = '__settings__';

/** The key within `[__settings__]` that names the default profile. */
const DEFAULT_PROFILE_KEY = 'default_profile';

/** The legacy default profile section name. */
const LEGACY_DEFAULT_PROFILE = 'DEFAULT';

/**
 * A profile parsed from a `.databrickscfg` file or constructed
 * programmatically.
 *
 * Values are stored as a generic read-only map because profiles can contain
 * arbitrary keys depending on the authentication method configured.
 */
export interface Profile {
  /** The section name (e.g. "my-workspace", "DEFAULT"). */
  readonly name: string;
  /** Key-value pairs from the section. */
  readonly values: Readonly<Record<string, string>>;
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
  if (explicitProfile !== undefined) {
    const trimmedExplicitProfile = explicitProfile.trim();
    if (trimmedExplicitProfile !== '') {
      return trimmedExplicitProfile;
    }
  }

  if (Object.hasOwn(ini, SETTINGS_SECTION)) {
    const settings = ini[SETTINGS_SECTION];
    if (
      Object.hasOwn(settings, DEFAULT_PROFILE_KEY) &&
      settings[DEFAULT_PROFILE_KEY] !== ''
    ) {
      return settings[DEFAULT_PROFILE_KEY];
    }
  }

  return LEGACY_DEFAULT_PROFILE;
}

/**
 * Validates that the resolved profile name is not a reserved section name.
 *
 * @throws Error if the profile name is `__settings__`.
 */
function assertValidProfileName(name: string): void {
  if (name === SETTINGS_SECTION) {
    throw new Error(
      `"${SETTINGS_SECTION}" is a reserved section and cannot be used as a profile`
    );
  }
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
  assertValidProfileName(name);
  if (!Object.hasOwn(ini, name)) {
    throw new Error(`profile "${name}" not found in configuration file`);
  }
  return {name, values: ini[name]};
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
  for (const [name, values] of Object.entries(ini)) {
    if (name === SETTINGS_SECTION) {
      continue;
    }
    if (Object.hasOwn(values, 'host') && values.host !== '') {
      profiles.push({name, values});
    }
  }
  return profiles;
}
