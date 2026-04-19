/**
 * Error types for credential operations.
 *
 * @module
 */

/** Discriminant codes for {@link M2mCredentialsError}. */
export type M2mCredentialsErrorCode =
  | 'CLIENT_ID_REQUIRED'
  | 'CLIENT_SECRET_REQUIRED'
  | 'TOKEN_ENDPOINT_REQUIRED'
  | 'TOKEN_REQUEST_FAILED';

/**
 * Error thrown by M2M credential operations.
 *
 * Use the `code` field to distinguish between error causes.
 */
export class M2mCredentialsError extends Error {
  readonly code: M2mCredentialsErrorCode;

  constructor(code: M2mCredentialsErrorCode, message: string) {
    super(message);
    this.name = 'M2mCredentialsError';
    this.code = code;
  }
}
