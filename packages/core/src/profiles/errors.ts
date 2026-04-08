/**
 * Error types for Databricks configuration profile operations.
 *
 * @module
 */

/** Discriminant codes for {@link ProfileError}. */
export type ProfileErrorCode =
  | 'CONFIG_FILE_NOT_FOUND'
  | 'PROFILE_NOT_FOUND'
  | 'EMPTY_PATH'
  | 'EMPTY_PROFILE'
  | 'INVALID_PROFILE_NAME';

/**
 * Error thrown by profile operations.
 *
 * Use the {@link ProfileError.code} field to distinguish between error causes
 * without needing separate catch clauses for each.
 */
export class ProfileError extends Error {
  readonly code: ProfileErrorCode;

  constructor(code: ProfileErrorCode, message: string) {
    super(message);
    this.name = 'ProfileError';
    this.code = code;
  }
}
