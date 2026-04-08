/**
 * Node.js implementation of profile resolution, listing, and persistence.
 *
 * @module
 */

import {constants} from 'node:fs';
import {access, chmod, open, readFile, writeFile} from 'node:fs/promises';
import {homedir} from 'node:os';
import {join} from 'node:path';

import {ProfileError} from './errors';
import {formatIni, parseIni} from './ini';
import type {Profile, ResolveOptions} from './profile';
import {PROPERTY_DEFS, SETTINGS_SECTION, setProfileField} from './profile';

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
      setProfileField(profile, def, value);
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
      setProfileField(profile, def, value);
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
 * @example
 * ```typescript
 * // Use defaults: default profile + env overlay.
 * const p = await resolve();
 *
 * // Specific file and profile, no env overlay.
 * const p = await resolve({
 *   filePath: '/path/to/databrickscfg',
 *   profile: 'staging',
 *   withEnv: false,
 * });
 *
 * // Only env vars, no config file.
 * const p = await resolve({withFile: false});
 * ```
 */
export async function resolve(options?: ResolveOptions): Promise<Profile> {
  if (options?.filePath === '') {
    throw new ProfileError('EMPTY_PATH', 'empty path');
  }
  if (options?.profile === '') {
    throw new ProfileError('EMPTY_PROFILE', 'empty profile');
  }

  // Setting filePath or profile implies withFile: true.
  const shouldReadFile =
    options?.filePath !== undefined ||
    options?.profile !== undefined ||
    (options?.withFile ?? true);
  const shouldReadEnv = options?.withEnv ?? true;

  const fileProfile = shouldReadFile
    ? await loadFile(options?.filePath, options?.profile)
    : {};
  const envProfile = shouldReadEnv ? loadEnv() : {};

  return {...fileProfile, ...envProfile};
}

/**
 * Returns the names of all profiles (INI sections) in the given config
 * file. The DEFAULT section is included if it has any keys.
 */
export async function listProfiles(path: string): Promise<string[]> {
  if (path === '') {
    throw new ProfileError(
      'CONFIG_FILE_NOT_FOUND',
      'config file not found: empty path'
    );
  }

  if (!(await fileExists(path))) {
    throw new ProfileError(
      'CONFIG_FILE_NOT_FOUND',
      `config file not found: ${path}`
    );
  }

  const content = await readFile(path, 'utf8');
  const data = parseIni(content);

  const names: string[] = [];
  for (const [name, keys] of data) {
    if (name === SETTINGS_SECTION) {
      continue;
    }
    if (isPhantomDefault(name, keys)) {
      continue;
    }
    names.push(name);
  }

  return names;
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

/**
 * Writes a profile to the given section of a databrickscfg file. The profile
 * must have a non-empty {@link Profile.name}. If the file exists, other
 * sections are preserved; the named section is replaced entirely. If the
 * file does not exist, it is created with mode 0600.
 *
 * Both known fields and {@link Profile.extra} entries are written, so a
 * resolve/saveToFile round-trip never loses unknown keys. Fields that are
 * undefined or empty are omitted from the output.
 */
export async function saveToFile(
  profile: Profile,
  path: string
): Promise<void> {
  if (path === '') {
    throw new ProfileError('EMPTY_PATH', 'empty path');
  }
  const name = profile.name;
  if (name === undefined || name === '') {
    throw new ProfileError('EMPTY_PROFILE', 'empty profile');
  }
  if (name === SETTINGS_SECTION) {
    throw new ProfileError(
      'INVALID_PROFILE_NAME',
      `invalid profile name: "${name}" is a reserved section`
    );
  }

  // Ensure the file exists with restrictive permissions before writing
  // secrets into it. O_CREAT|O_EXCL is atomic: it creates the file only if
  // it does not already exist, avoiding a stat/write TOCTOU race.
  try {
    const handle = await open(
      path,
      // eslint-disable-next-line no-bitwise
      constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY,
      0o600
    );
    await handle.close();
  } catch (err: unknown) {
    // EEXIST is expected: the file already exists.
    if (
      !(
        err instanceof Error &&
        'code' in err &&
        (err as NodeJS.ErrnoException).code === 'EEXIST'
      )
    ) {
      throw new Error(
        `creating config file "${path}": ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  // Load the existing file.
  const content = await readFile(path, 'utf8');
  const data = parseIni(content);

  // Delete the section first to ensure a clean replacement.
  data.delete(name);
  const section = new Map<string, string>();

  // Write known properties.
  const knownKeys = new Set<string>();
  for (const def of PROPERTY_DEFS) {
    knownKeys.add(def.iniKey);
    const value = def.serialize(profile[def.field]);
    if (value !== undefined) {
      section.set(def.iniKey, value);
    }
  }

  // Write extra properties in sorted order for deterministic output.
  if (profile.extra !== undefined) {
    const sortedKeys = Object.keys(profile.extra).sort();
    for (const key of sortedKeys) {
      if (!knownKeys.has(key)) {
        section.set(key, profile.extra[key]);
      }
    }
  }

  data.set(name, section);

  // Re-apply restrictive permissions after writing.
  await writeFile(path, formatIni(data), 'utf8');
  await chmod(path, 0o600);
}
