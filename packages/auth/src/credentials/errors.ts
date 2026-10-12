/**
 * Error types for credential operations.
 *
 * @module
 */

/** Discriminant codes for {@link PatCredentialsError}. */
export type PatCredentialsErrorCode = 'TOKEN_REQUIRED' | 'TOKEN_MALFORMED';

/**
 * Error thrown by personal access token (PAT) credential operations.
 *
 * Use the `code` field to distinguish between error causes.
 */
export class PatCredentialsError extends Error {
  readonly code: PatCredentialsErrorCode;

  constructor(code: PatCredentialsErrorCode, message: string) {
    super(message);
    this.name = 'PatCredentialsError';
    this.code = code;
  }
}

/** Discriminant codes for {@link M2mCredentialsError}. */
export type M2mCredentialsErrorCode =
  | 'CLIENT_ID_REQUIRED'
  | 'CLIENT_SECRET_REQUIRED'
  | 'HOST_REQUIRED'
  | 'DISCOVERY_FAILED'
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

/** Discriminant codes for {@link U2mCredentialsError}. */
export type U2mCredentialsErrorCode =
  | 'PROFILE_REQUIRED'
  | 'CLI_NOT_FOUND'
  | 'LEGACY_CLI_DETECTED'
  | 'TOKEN_FETCH_FAILED'
  | 'INVALID_RESPONSE';

/**
 * Error thrown by U2M (databricks-cli) credential operations.
 *
 * Use the `code` field to distinguish between error causes.
 */
export class U2mCredentialsError extends Error {
  readonly code: U2mCredentialsErrorCode;

  constructor(code: U2mCredentialsErrorCode, message: string) {
    super(message);
    this.name = 'U2mCredentialsError';
    this.code = code;
  }
}

/** Identifies why Azure CLI credentials failed. */
export type AzureCliCredentialsErrorCode =
  | 'TOKEN_FETCH_FAILED'
  | 'INVALID_RESPONSE';

/** Reports a failed Azure CLI token request or an unusable token response. */
export class AzureCliCredentialsError extends Error {
  readonly code: AzureCliCredentialsErrorCode;

  constructor(
    code: AzureCliCredentialsErrorCode,
    message: string,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'AzureCliCredentialsError';
    this.code = code;
  }
}
