/**
 * Error types for Databricks configuration profile operations.
 *
 * @module
 */

/** Thrown when an explicitly requested config file does not exist. */
export class ConfigFileNotFoundError extends Error {
  constructor(path: string) {
    super(`config file not found: ${path}`);
    this.name = 'ConfigFileNotFoundError';
  }
}

/** Thrown when the requested profile does not exist in the config file. */
export class ProfileNotFoundError extends Error {
  constructor(profile: string, path: string) {
    super(`profile not found: "${profile}" in ${path}`);
    this.name = 'ProfileNotFoundError';
  }
}

/** Thrown when an empty path is provided where a path is required. */
export class EmptyPathError extends Error {
  constructor() {
    super('empty path');
    this.name = 'EmptyPathError';
  }
}

/** Thrown when an empty profile name is provided where a name is required. */
export class EmptyProfileError extends Error {
  constructor() {
    super('empty profile');
    this.name = 'EmptyProfileError';
  }
}

/** Thrown when a profile name is reserved or otherwise not usable. */
export class InvalidProfileNameError extends Error {
  constructor(name: string) {
    super(`invalid profile name: "${name}" is a reserved section`);
    this.name = 'InvalidProfileNameError';
  }
}
