/**
 * Code is the error code carried by an API error.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Code = {
  /**
   * Unknown indicates an error that cannot be classified. It is used for
   * malformed error responses and for responses that carry no string error
   * code (missing or an integer).
   */
  UNKNOWN: 'UNKNOWN',

  /** OK indicates the operation completed successfully. */
  OK: 'OK',

  /** Cancelled indicates the operation was cancelled (typically by the caller). */
  CANCELLED: 'CANCELLED',

  /**
   * InvalidArgument indicates the client specified an invalid argument.
   *
   * By contrast with FailedPrecondition, InvalidArgument indicates arguments
   * that are problematic regardless of the state of the system. For example,
   * a malformed request parameter.
   */
  INVALID_ARGUMENT: 'INVALID_ARGUMENT',

  /**
   * DeadlineExceeded means the operation expired before completion.
   *
   * For operations that modify the state of the system, this error may be
   * returned even if the operation has completed successfully. For
   * example, a successful response from a server could have been delayed
   * long enough for the deadline to expire.
   */
  DEADLINE_EXCEEDED: 'DEADLINE_EXCEEDED',

  /**
   * NotFound means a requested entity (e.g. a resource or a file) was
   * not found.
   */
  NOT_FOUND: 'NOT_FOUND',

  /**
   * AlreadyExists means an attempt to create an entity failed because one
   * already exists.
   */
  ALREADY_EXISTS: 'ALREADY_EXISTS',

  /**
   * PermissionDenied indicates the caller does not have permission to
   * execute the specified operation.
   *
   * This is different from an error returned when the user has exhausted
   * some resource (e.g. too many requests) which is a ResourceExhausted
   * error.
   */
  PERMISSION_DENIED: 'PERMISSION_DENIED',

  /**
   * ResourceExhausted indicates some resource has been exhausted, perhaps
   * a per-user quota, or perhaps the entire file system is out of space.
   */
  RESOURCE_EXHAUSTED: 'RESOURCE_EXHAUSTED',

  /**
   * FailedPrecondition indicates the operation was rejected because the
   * system is not in a state required for the operation's execution.
   * For example, directory to be deleted may be non-empty, an rmdir
   * operation is applied to a non-directory, etc.
   */
  FAILED_PRECONDITION: 'FAILED_PRECONDITION',

  /**
   * Aborted indicates the operation was aborted, typically due to a
   * concurrency issue like sequencer check failures, transaction aborts,
   * etc.
   */
  ABORTED: 'ABORTED',

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
  OUT_OF_RANGE: 'OUT_OF_RANGE',

  /**
   * Unimplemented indicates the operation is not implemented or not
   * supported/enabled in this service.
   */
  UNIMPLEMENTED: 'UNIMPLEMENTED',

  /**
   * Internal indicates an internal error. This means some invariants
   * expected by the underlying system have been broken. If you see
   * this error, something is very broken.
   */
  INTERNAL: 'INTERNAL',

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
  UNAVAILABLE: 'UNAVAILABLE',

  /** DataLoss indicates unrecoverable data loss or corruption. */
  DATA_LOSS: 'DATA_LOSS',

  /**
   * Unauthenticated indicates the request does not have valid
   * authentication credentials for the operation.
   */
  UNAUTHENTICATED: 'UNAUTHENTICATED',
} as const;

export type Code = (typeof Code)[keyof typeof Code] | (string & {});
