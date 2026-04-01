/**
 * Node.js implementation of profile resolution, listing, and persistence.
 *
 * @module
 */

import * as fs from 'node:fs';
import {homedir} from 'node:os';
import {join} from 'node:path';

import {
  ConfigFileNotFoundError,
  EmptyPathError,
  EmptyProfileError,
  InvalidProfileNameError,
  ProfileNotFoundError,
} from './errors';
import {formatIni, parseIni} from './ini';
import type {Profile, ResolveOptions} from './profile';
import {PROPERTIES, SETTINGS_SECTION} from './profile';

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

/**
 * Populates a profile from a databrickscfg file. If filePath is undefined,
 * checks DATABRICKS_CONFIG_FILE, falling back to ~/.databrickscfg.
 */
function loadFile(
  profile: Profile,
  filePath: string | undefined,
  profileName: string | undefined
): void {
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
  if (!fs.existsSync(path)) {
    if (explicitFile) {
      throw new ConfigFileNotFoundError(path);
    }
    return;
  }

  const content = fs.readFileSync(path, 'utf8');
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
    throw new InvalidProfileNameError(resolved);
  }

  const explicitProfile = resolved !== undefined;
  resolved ??= 'DEFAULT';

  const section = data.get(resolved);
  if (section === undefined || isPhantomDefault(resolved, section)) {
    if (explicitProfile) {
      throw new ProfileNotFoundError(resolved, path);
    }
    return;
  }

  profile.name = resolved;

  const knownKeys = new Set<string>();
  for (const prop of PROPERTIES) {
    knownKeys.add(prop.iniKey);
    const value = section.get(prop.iniKey);
    if (value !== undefined) {
      prop.set(profile, value);
    }
  }

  // Populate extra keys that are not in the property mapping.
  for (const [key, value] of section) {
    if (!knownKeys.has(key)) {
      profile.extra ??= {};
      profile.extra[key] = value;
    }
  }
}

/**
 * Populates a profile from environment variables. Empty environment variables
 * are treated as unset and do not override existing values.
 */
function loadEnv(profile: Profile): void {
  for (const prop of PROPERTIES) {
    const value = process.env[prop.envVar] ?? '';
    if (value !== '') {
      prop.set(profile, value);
    }
  }
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
 * const p = resolve();
 *
 * // Specific file and profile, no env overlay.
 * const p = resolve({
 *   filePath: '/path/to/databrickscfg',
 *   profile: 'staging',
 *   withEnv: false,
 * });
 *
 * // Only env vars, no config file.
 * const p = resolve({withFile: false});
 * ```
 */
export function resolve(options?: ResolveOptions): Profile {
  if (options?.filePath === '') {
    throw new EmptyPathError();
  }
  if (options?.profile === '') {
    throw new EmptyProfileError();
  }

  // Setting filePath or profile implies withFile: true.
  const shouldReadFile =
    options?.filePath !== undefined ||
    options?.profile !== undefined ||
    (options?.withFile ?? true);
  const shouldReadEnv = options?.withEnv ?? true;

  const result: Profile = {};

  if (shouldReadFile) {
    loadFile(result, options?.filePath, options?.profile);
  }
  if (shouldReadEnv) {
    loadEnv(result);
  }

  return result;
}

/**
 * Returns the names of all profiles (INI sections) in the given config
 * file. The DEFAULT section is included if it has any keys.
 */
export function listProfiles(path: string): string[] {
  if (path === '') {
    throw new ConfigFileNotFoundError('empty path');
  }

  if (!fs.existsSync(path)) {
    throw new ConfigFileNotFoundError(path);
  }

  const content = fs.readFileSync(path, 'utf8');
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
export function saveToFile(profile: Profile, path: string): void {
  if (path === '') {
    throw new EmptyPathError();
  }
  if (profile.name === undefined || profile.name === '') {
    throw new EmptyProfileError();
  }
  if (profile.name === SETTINGS_SECTION) {
    throw new InvalidProfileNameError(profile.name);
  }

  // Ensure the file exists with restrictive permissions before writing
  // secrets into it. O_CREAT|O_EXCL is atomic: it creates the file only if
  // it does not already exist, avoiding a stat/write TOCTOU race.
  try {
    const fd = fs.openSync(
      path,
      // eslint-disable-next-line no-bitwise
      fs.constants.O_CREAT | fs.constants.O_EXCL | fs.constants.O_WRONLY,
      0o600
    );
    fs.closeSync(fd);
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
  const content = fs.readFileSync(path, 'utf8');
  const data = parseIni(content);

  // Delete the section first to ensure a clean replacement.
  data.delete(profile.name);
  const section = new Map<string, string>();

  // Write known properties.
  const knownKeys = new Set<string>();
  for (const prop of PROPERTIES) {
    knownKeys.add(prop.iniKey);
    const value = prop.get(profile);
    if (value !== '') {
      section.set(prop.iniKey, value);
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

  data.set(profile.name, section);

  // Re-apply restrictive permissions after writing.
  fs.writeFileSync(path, formatIni(data), 'utf8');
  fs.chmodSync(path, 0o600);
}
