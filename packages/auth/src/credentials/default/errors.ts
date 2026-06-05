/** Discriminant codes for {@link DefaultCredentialsError}. */
export type DefaultCredentialsErrorCode =
  | 'NO_AUTH_CONFIGURED'
  | 'AUTH_TYPE_NOT_FOUND';

/**
 * Error thrown when the default credentials chain cannot resolve a
 * strategy to authenticate with.
 *
 * Use the `code` field to distinguish between error causes.
 */
export class DefaultCredentialsError extends Error {
  readonly code: DefaultCredentialsErrorCode;

  constructor(code: DefaultCredentialsErrorCode, message: string) {
    super(message);
    this.name = 'DefaultCredentialsError';
    this.code = code;
  }
}
