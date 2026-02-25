/**
 * Defines error codes for API errors and their retry semantics.
 *
 * @packageDocumentation
 */

/**
 * Code is a numeric code for an error.
 *
 * The numeric values are stable and can be relied upon across SDK versions.
 */
enum Code {
  /**
   * Unknown indicates an error that cannot be classified.
   *
   * This code might be used for malformed error responses or error responses
   * using an error code that cannot be mapped to a code in this package.
   */
  UNKNOWN = 0,

  /** OK indicates the operation completed successfully. */
  OK = 1,

  /** Canceled indicates the operation was canceled (typically by the caller). */
  CANCELED = 2,

  /**
   * InvalidArgument indicates the client specified an invalid argument.
   *
   * By contrast with FailedPrecondition, InvalidArgument indicates arguments
   * that are problematic regardless of the state of the system. For example,
   * a malformed request parameter.
   */
  INVALID_ARGUMENT = 3,

  /**
   * DeadlineExceeded means the operation expired before completion.
   *
   * For operations that modify the state of the system, this error may be
   * returned even if the operation has completed successfully. For
   * example, a successful response from a server could have been delayed
   * long enough for the deadline to expire.
   */
  DEADLINE_EXCEEDED = 4,

  /**
   * NotFound means a requested entity (e.g. a resource or a file) was
   * not found.
   */
  NOT_FOUND = 5,

  /**
   * AlreadyExists means an attempt to create an entity failed because one
   * already exists.
   */
  ALREADY_EXISTS = 6,

  /**
   * PermissionDenied indicates the caller does not have permission to
   * execute the specified operation.
   *
   * This is different from an error returned when the user has exhausted
   * some resource (e.g. too many requests) which is a ResourceExhausted
   * error.
   */
  PERMISSION_DENIED = 7,

  /**
   * ResourceExhausted indicates some resource has been exhausted, perhaps
   * a per-user quota, or perhaps the entire file system is out of space.
   */
  RESOURCE_EXHAUSTED = 8,

  /**
   * FailedPrecondition indicates the operation was rejected because the
   * system is not in a state required for the operation's execution.
   * For example, directory to be deleted may be non-empty, an rmdir
   * operation is applied to a non-directory, etc.
   */
  FAILED_PRECONDITION = 9,

  /**
   * Aborted indicates the operation was aborted, typically due to a
   * concurrency issue like sequencer check failures, transaction aborts,
   * etc.
   */
  ABORTED = 10,

  /**
   * OutOfRange means the operation was attempted past the valid range.
   * E.g., seeking or reading past end of file.
   *
   * Unlike InvalidArgument, this error indicates a problem that may
   * be fixed if the system state changes. For example, a 32-bit file
   * system will generate InvalidArgument if asked to read at an
   * offset that is not in the range [0,2^32-1], but it will generate
   * OutOfRange if asked to read from an offset past the current
   * file size.
   *
   * There is a fair bit of overlap between FailedPrecondition and
   * OutOfRange. We recommend using OutOfRange (the more specific
   * error) when it applies so that callers who are iterating through
   * a space can easily look for an OutOfRange error to detect when
   * they are done.
   */
  OUT_OF_RANGE = 11,

  /**
   * Unimplemented indicates the operation is not implemented or not
   * supported/enabled in this service.
   */
  UNIMPLEMENTED = 12,

  /**
   * Internal indicates an internal error. This means some invariants
   * expected by the underlying system have been broken. If you see
   * this error, something is very broken.
   */
  INTERNAL = 13,

  /**
   * Unavailable indicates the service is currently unavailable.
   *
   * This is most likely a transient condition and may be corrected by
   * retrying. Though, this might not always be safe to retry if the
   * operation is non-idempotent.
   *
   * The Databricks SDK will generally automatically retry the request
   * with a backoff when encountering this error.
   */
  UNAVAILABLE = 14,

  /** DataLoss indicates unrecoverable data loss or corruption. */
  DATA_LOSS = 15,

  /**
   * Unauthenticated indicates the request does not have valid
   * authentication credentials for the operation.
   */
  UNAUTHENTICATED = 16,
}

// Maps Code values to their canonical string representation.
const CODE_TO_STRING: ReadonlyMap<Code, string> = new Map([
  [Code.UNKNOWN, 'UNKNOWN'],
  [Code.OK, 'OK'],
  [Code.CANCELED, 'CANCELLED'],
  [Code.INVALID_ARGUMENT, 'INVALID_ARGUMENT'],
  [Code.DEADLINE_EXCEEDED, 'DEADLINE_EXCEEDED'],
  [Code.NOT_FOUND, 'NOT_FOUND'],
  [Code.ALREADY_EXISTS, 'ALREADY_EXISTS'],
  [Code.PERMISSION_DENIED, 'PERMISSION_DENIED'],
  [Code.RESOURCE_EXHAUSTED, 'RESOURCE_EXHAUSTED'],
  [Code.FAILED_PRECONDITION, 'FAILED_PRECONDITION'],
  [Code.ABORTED, 'ABORTED'],
  [Code.OUT_OF_RANGE, 'OUT_OF_RANGE'],
  [Code.UNIMPLEMENTED, 'UNIMPLEMENTED'],
  [Code.INTERNAL, 'INTERNAL'],
  [Code.UNAVAILABLE, 'UNAVAILABLE'],
  [Code.DATA_LOSS, 'DATA_LOSS'],
  [Code.UNAUTHENTICATED, 'UNAUTHENTICATED'],
]);

// Maps canonical strings back to Code values.
const STRING_TO_CODE: ReadonlyMap<string, Code> = new Map(
  [...CODE_TO_STRING.entries()].map(([code, str]) => [str, code])
);

/**
 * Returns the canonical string representation of an error code.
 *
 * If the code is not recognized, "UNKNOWN" is returned. Note that
 * Code.CANCELED maps to "CANCELLED" (British spelling) to match the gRPC
 * convention.
 */
function codeToString(code: Code): string {
  return CODE_TO_STRING.get(code) ?? 'UNKNOWN';
}

/**
 * Converts a string representation of an error code to its corresponding
 * Code value. If the string does not match any known code, Code.UNKNOWN is
 * returned.
 */
function codeFromString(s: string): Code {
  return STRING_TO_CODE.get(s) ?? Code.UNKNOWN;
}

export {Code, codeToString, codeFromString};
