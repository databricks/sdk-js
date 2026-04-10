/**
 * Node.js implementation of profile resolution.
 *
 * @module
 */

import {access, readFile} from 'node:fs/promises';
import {homedir} from 'node:os';
import {join} from 'node:path';

import {ProfileError} from './errors';
import {parseIni} from './ini';
import type {Profile, ResolveOptions} from './profile';
import {PROPERTY_DEFS, SETTINGS_SECTION} from './profile';

/**
 * Reports whether a section is an empty DEFAULT section that should be
 * treated as non-existent.
 *
 * In the INI format, DEFAULT is typically a special fallback section, not a
 * regular section. Databricks historically treats DEFAULT as a regular
 * profile name. An intentionally empty [DEFAULT] section is silently ignored.
 */
function isPhantomDefault(name: string, section: Map<string, string>): boolean {
  return name === 'DEFAULT' && section.size === 0;
}

/**
 * Returns ~/.databrickscfg without checking environment variables.
 */
function defaultConfigFilePath(): string {
  try {
    return join(homedir(), '.databrickscfg');
  } catch {
    return '';
  }
}

/** Returns true if the file at the given path exists. */
async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads a profile from a databrickscfg file. If filePath is undefined,
 * reads DATABRICKS_CONFIG_FILE from the environment, falling back to
 * ~/.databrickscfg.
 */
async function loadFile(
  filePath: string | undefined,
  profileName: string | undefined
): Promise<Profile> {
  // Determine file path.
  let explicitFile = filePath !== undefined;
  let path: string;

  if (filePath !== undefined) {
    path = filePath;
  } else {
    const envPath = process.env.DATABRICKS_CONFIG_FILE ?? '';
    if (envPath !== '') {
      path = envPath;
      explicitFile = true;
    } else {
      path = defaultConfigFilePath();
    }
  }

  // A missing default file is silently skipped.
  if (!(await fileExists(path))) {
    if (explicitFile) {
      throw new ProfileError(
        'CONFIG_FILE_NOT_FOUND',
        `config file not found: ${path}`
      );
    }
    return {};
  }

  const content = await readFile(path, 'utf8');
  const data = parseIni(content);

  // Profile name resolution chain:
  // 1. Explicit profile name (from option).
  // 2. DATABRICKS_CONFIG_PROFILE environment variable.
  // 3. default_profile key in __settings__ section.
  // 4. DEFAULT section (fallback).
  let resolved = profileName;

  if (resolved === undefined) {
    const envProfile = process.env.DATABRICKS_CONFIG_PROFILE ?? '';
    if (envProfile !== '') {
      resolved = envProfile;
    }
  }

  if (resolved === undefined) {
    const settings = data.get(SETTINGS_SECTION);
    if (settings !== undefined) {
      const dp = settings.get('default_profile') ?? '';
      if (dp !== '') {
        resolved = dp;
      }
    }
  }

  if (resolved === SETTINGS_SECTION) {
    throw new ProfileError(
      'INVALID_PROFILE_NAME',
      `invalid profile name: "${resolved}" is a reserved section`
    );
  }

  const explicitProfile = resolved !== undefined;
  resolved ??= 'DEFAULT';

  const section = data.get(resolved);
  if (section === undefined || isPhantomDefault(resolved, section)) {
    if (explicitProfile) {
      throw new ProfileError(
        'PROFILE_NOT_FOUND',
        `profile not found: "${resolved}" in ${path}`
      );
    }
    return {};
  }

  // Build profile from section values.
  const profile: Profile = {name: resolved};

  const knownKeys = new Set<string>();
  for (const def of PROPERTY_DEFS) {
    knownKeys.add(def.iniKey);
    const value = section.get(def.iniKey);
    if (value !== undefined) {
      def.set(profile, value);
    }
  }

  // Collect extra keys that are not in the property mapping.
  for (const [key, value] of section) {
    if (!knownKeys.has(key)) {
      profile.extra ??= {};
      profile.extra[key] = value;
    }
  }

  return profile;
}

/**
 * Builds a profile from environment variables. Empty environment variables
 * are treated as unset. Returns only the fields that were found.
 */
function loadEnv(): Profile {
  const profile: Profile = {};
  for (const def of PROPERTY_DEFS) {
    const value = process.env[def.envVar] ?? '';
    if (value !== '') {
      def.set(profile, value);
    }
  }
  return profile;
}

/**
 * Creates a {@link Profile} from a databrickscfg file and/or environment
 * variables.
 *
 * With no options, the defaults are used: read the default config file and
 * overlay environment variables.
 *
 * When any explicit option is provided, only the requested behaviors are
 * enabled.
 */
export async function resolve(options?: ResolveOptions): Promise<Profile> {
  if (options?.filePath === '') {
    throw new ProfileError('EMPTY_PATH', 'empty path');
  }
  if (options?.profile === '') {
    throw new ProfileError('EMPTY_PROFILE', 'empty profile');
  }

  const shouldReadFile =
    options === undefined ||
    options.filePath !== undefined ||
    options.profile !== undefined ||
    (options.withFile ?? false);
  const shouldReadEnv = options === undefined || (options.withEnv ?? false);

  const fileProfile = shouldReadFile
    ? await loadFile(options?.filePath, options?.profile)
    : {};
  const envProfile = shouldReadEnv ? loadEnv() : {};

  return {...fileProfile, ...envProfile};
}

/**
 * Returns the path to the default databrickscfg file. Reads
 * DATABRICKS_CONFIG_FILE from the environment, falling back to
 * ~/.databrickscfg.
 */
export function defaultConfigFile(): string {
  const envPath = process.env.DATABRICKS_CONFIG_FILE ?? '';
  if (envPath !== '') {
    return envPath;
  }
  return defaultConfigFilePath();
}
