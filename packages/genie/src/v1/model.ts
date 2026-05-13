// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum ColumnTypeName {
  BOOLEAN = 'BOOLEAN',
  BYTE = 'BYTE',
  SHORT = 'SHORT',
  INT = 'INT',
  LONG = 'LONG',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',
  DATE = 'DATE',
  TIMESTAMP = 'TIMESTAMP',
  STRING = 'STRING',
  BINARY = 'BINARY',
  DECIMAL = 'DECIMAL',
  INTERVAL = 'INTERVAL',
  ARRAY = 'ARRAY',
  STRUCT = 'STRUCT',
  MAP = 'MAP',
  CHAR = 'CHAR',
  NULL = 'NULL',
  USER_DEFINED_TYPE = 'USER_DEFINED_TYPE',
  TIMESTAMP_NTZ = 'TIMESTAMP_NTZ',
  VARIANT = 'VARIANT',
  GEOMETRY = 'GEOMETRY',
  GEOGRAPHY = 'GEOGRAPHY',
  TIME = 'TIME',
  FILE = 'FILE',
  TABLE_TYPE = 'TABLE_TYPE',
  TABLEREF_TYPE = 'TABLEREF_TYPE',
}

/** Error codes returned by Databricks APIs to indicate specific failure conditions. */
export enum ErrorCode {
  /**
   * Unknown error. This error generally should not be returned explicitly, but will be used
   * as a fallback if the error enum is missing from the message for some reason.
   *
   * It's assigned tag 0 to follow the best practice from
   * https://developers.google.com/protocol-buffers/docs/style#enums
   *
   * TODO(PLAT-55898): Add custom option to declare HTTP and gRPC mappings.
   * Maps to:
   * - google.rpc.Code: UNKNOWN = 2;
   * - HTTP code: 500 Internal Server Error
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * Internal error. This means that some invariants expected by the underlying system have been
   * broken. This error code is reserved for serious errors, which generally cannot be resolved
   * by the user.
   *
   * Prefer this over all kinds of detailed error messages (e.g IO_ERROR), unless there's some
   * automation that relies on the custom error code.
   *
   * Maps to:
   * - google.rpc.Code: INTERNAL = 13;
   * - HTTP code: 500 Internal Server Error
   */
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  /**
   * The service is currently unavailable. This is most likely a transient condition, which can be
   * corrected by retrying with a backoff. Note that it is not always safe to retry non-idempotent
   * operations.
   *
   * Prefer this over SERVICE_UNDER_MAINTENANCE, WORKSPACE_TEMPORARILY_UNAVAILABLE.
   *
   * See https://docs.google.com/document/d/1FL8p2sbYWqBPL-UvhzI7uXAw4EoLG7Rj6PAOQWZRSOk/edit#
   * for guideline on how to pick this vs RESOURCE_EXHAUSTED.
   *
   * Maps to:
   * - google.rpc.Code: UNAVAILABLE = 14;
   * - HTTP code: 503 Service Unavailable
   */
  TEMPORARILY_UNAVAILABLE = 'TEMPORARILY_UNAVAILABLE',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * Indicates that an IOException has been internally thrown.
   */
  IO_ERROR = 'IO_ERROR',
  /**
   * The request is invalid. Prefer more specific error code whenever possible.
   * Also see similar recommendation for the google.rpc.Code.FAILED_PRECONDITION.
   *
   * Prefer this error code over MALFORMED_REQUEST, INVALID_STATE, UNPARSEABLE_HTTP_ERROR.
   *
   * Maps to:
   * - google.rpc.Code: FAILED_PRECONDITION = 9;
   * - HTTP code: 400 Bad Request
   */
  BAD_REQUEST = 'BAD_REQUEST',
  /**
   * An external service is unavailable temporarily as it is being updated/re-deployed. Indicates
   * gateway proxy to safely retry the request.
   */
  SERVICE_UNDER_MAINTENANCE = 'SERVICE_UNDER_MAINTENANCE',
  /** A workspace is temporarily unavailable as the workspace is being re-assigned. */
  WORKSPACE_TEMPORARILY_UNAVAILABLE = 'WORKSPACE_TEMPORARILY_UNAVAILABLE',
  /**
   * The deadline expired before the operation could complete. For operations that change the state
   * of the system, this error may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been delayed long enough for
   * the deadline to expire. When possible - implementations should make sure further processing of
   * the request is aborted, e.g. by throwing an exception instead of making the RPC request,
   * making the database query, etc.
   *
   * Maps to:
   * - google.rpc.Code: DEADLINE_EXCEEDED = 4;
   * - HTTP code: 504 Gateway Timeout
   */
  DEADLINE_EXCEEDED = 'DEADLINE_EXCEEDED',
  /**
   * The operation was canceled by the caller. An example - client closed the connection without
   * waiting for a response.
   *
   * Maps to:
   * - google.rpc.Code: CANCELLED = 1;
   * - HTTP code: 499 Client Closed Request
   */
  CANCELLED = 'CANCELLED',
  /**
   * The operation is rejected because of either rate limiting or resource quota,
   * such as the client has sent too many requests recently or the client has allocated too many
   * resources.
   *
   * See https://docs.google.com/document/d/1FL8p2sbYWqBPL-UvhzI7uXAw4EoLG7Rj6PAOQWZRSOk/edit#
   * for guideline on how to pick this vs TEMPORARILY_UNAVAILABLE.
   *
   * Maps to:
   * - google.rpc.Code: RESOURCE_EXHAUSTED = 8;
   * - HTTP code: 429 Too Many Requests
   */
  RESOURCE_EXHAUSTED = 'RESOURCE_EXHAUSTED',
  /**
   * The operation was aborted, typically due to a concurrency issue such as a sequencer
   * check failure, transaction abort, or transaction conflict.
   *
   * Maps to:
   * - google.rpc.Code: ABORTED = 10;
   * - HTTP code: 409 Conflict
   */
  ABORTED = 'ABORTED',
  /**
   * Operation was performed on a resource that does not exist,
   * e.g. file or directory was not found.
   *
   * Maps to:
   * - google.rpc.Code: NOT_FOUND = 5;
   * - HTTP code: 404 Not Found
   */
  NOT_FOUND = 'NOT_FOUND',
  /**
   * Operation was rejected due a conflict with an existing resource, e.g. attempted to create
   * file or directory that already exists.
   *
   * Prefer this over RESOURCE_CONFLICT.
   *
   * Maps to:
   * - google.rpc.Code: ALREADY_EXISTS = 6;
   * - HTTP code: 409 Conflict
   */
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  /**
   * The request does not have valid authentication (AuthN) credentials for the operation.
   *
   * Prefer this over CUSTOMER_UNAUTHORIZED, unless you need to keep consistent behavior with legacy
   * code.
   * For authorization (AuthZ) errors use PERMISSION_DENIED.
   *
   * Maps to:
   * - google.rpc.Code: UNAUTHENTICATED = 16;
   * - HTTP code: 401 Unauthorized
   */
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  /**
   * The service is currently unavailable. Please note that the unavailability may or may not be transient.
   * That means if this is a non-transient condition, retrying it does not work. If the unavailability
   * is certainly a transient condition, pleases use `TEMPORARILY_UNAVAILABLE` which signals its transient
   * nature explicitly.
   * An example of this error code’s use case is that when DNS resolution fails, the DNS resolver does
   * not know whether it is because the domain name is completely wrong (non-transient situation) or
   * the domain name is valid but the DNS server does not have an entry for this domain name yet (transient
   * situation). Hence, `UNAVAILABLE`  is suitable for this case.
   *
   * Maps to:
   * - google.rpc.Code: UNAVAILABLE = 14;
   * - HTTP code: 503 Service Unavailable
   */
  UNAVAILABLE = 'UNAVAILABLE',
  /**
   * Supplied value for a parameter was invalid (e.g., giving a number for a string parameter).
   *
   * Maps to:
   * - google.rpc.Code: INVALID_ARGUMENT = 3;
   * - HTTP code: 400 Bad Request
   */
  INVALID_PARAMETER_VALUE = 'INVALID_PARAMETER_VALUE',
  /**
   * Indicates that the given API endpoint does not exist. Legacy, when possible - NOT_IMPLEMENTED
   * should be used instead to indicate that API doesn't exist.
   *
   * Maps to:
   * - google.rpc.Code: NOT_FOUND = 5;
   * - HTTP code: 404 Not Found
   */
  ENDPOINT_NOT_FOUND = 'ENDPOINT_NOT_FOUND',
  /** Indicates that the given API request was malformed. */
  MALFORMED_REQUEST = 'MALFORMED_REQUEST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * If one or more of the inputs to a given RPC are not in a valid state for the action.
   */
  INVALID_STATE = 'INVALID_STATE',
  /**
   * The caller does not have permission to execute the specified operation.
   * PERMISSION_DENIED must not be used for rejections caused by exhausting some resource,
   * use RESOURCE_EXHAUSTED instead for those errors.
   * PERMISSION_DENIED must not be used if the caller can not be identified,
   * use CUSTOMER_UNAUTHORIZED instead for those errors.
   * This error code does not imply the request is valid or the requested entity exists or
   * satisfies other pre-conditions.
   *
   * Maps to:
   * - google.rpc.Code: PERMISSION_DENIED = 7;
   * - HTTP code: 403 Forbidden
   */
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  /**
   * NOTE: Deprecated due to inconsistent mapping in legacy code, see
   * https://docs.google.com/document/d/17TZIKX_Y39cJMBr333lc-d5dTvvBLSu3DPUyGU5eMJg/edit?disco=AAAAzVGt6FA.
   * Prefer using NOT_FOUND or PERMISSION_DENIED.
   *
   * If a given user/entity is trying to use a feature which has been disabled.
   *
   * Maps to:
   * - google.rpc.Code: NOT_FOUND = 5;
   * - HTTP code: 404 Not Found
   */
  FEATURE_DISABLED = 'FEATURE_DISABLED',
  /**
   * The request does not have valid authentication (AuthN) credentials for the operation.
   *
   * For authentication (AuthN) errors prefer using UNAUTHENTICATED, unless you need to keep
   * consistent behavior with legacy code.
   * For authorization (AuthZ) errors use PERMISSION_DENIED.
   *
   * Important: name is confusing, this error code is for authentication (AuthN) errors, not
   * authorization (AuthZ) errors. It maps to 401 Unauthorized and suffers from the same confusing
   * naming. See https://datatracker.ietf.org/doc/html/rfc7235#section-3.1 - "[...] status code
   * indicates that the request has not been applied because it lacks valid authentication
   * credentials for the target resource. [...] If the request included authentication credentials,
   * then the 401 response indicates that authorization has been refused for those credentials."
   *
   * Also, see https://stackoverflow.com/a/6937030/16352922, it covers it pretty well.
   *
   * Maps to:
   * - google.rpc.Code: UNAUTHENTICATED = 16;
   * - HTTP code: 401 Unauthorized
   */
  CUSTOMER_UNAUTHORIZED = 'CUSTOMER_UNAUTHORIZED',
  /**
   * The operation is rejected because of request rate limit, for example rate limiting applied to
   * users, workspaces, IP addresses, etc.
   *
   * Prefer a more generic RESOURCE_EXHAUSTED for the new use cases.
   *
   * See https://docs.google.com/document/d/1FL8p2sbYWqBPL-UvhzI7uXAw4EoLG7Rj6PAOQWZRSOk/edit#
   * for guideline on the rate limiting vs throttling.
   *
   * Maps to:
   * - google.rpc.Code: RESOURCE_EXHAUSTED = 8;
   * - HTTP code: 429 Too Many Requests
   */
  REQUEST_LIMIT_EXCEEDED = 'REQUEST_LIMIT_EXCEEDED',
  /** Indicates API request was rejected due a conflict with an existing resource. */
  RESOURCE_CONFLICT = 'RESOURCE_CONFLICT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * Indicates that the HTTP response cannot be correctly deserialized.
   * This currently is only used in DUST test clients, and not by any real service code.
   */
  UNPARSEABLE_HTTP_ERROR = 'UNPARSEABLE_HTTP_ERROR',
  /**
   * The operation is not implemented or is not supported/enabled in this service.
   *
   * Maps to:
   * - google.rpc.Code: UNIMPLEMENTED = 12;
   * - HTTP code: 501 Not Implemented
   */
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  /**
   * Unrecoverable data loss or corruption.
   *
   * One of the major use cases is to indicate that server failed to validate the integrity of
   * the request. This error can occur when the checksum specified in the `X-Databricks-Checksum`
   * request header (or trailer) doesn't match the actual request content checksum.
   *
   * Note, in case of the severe corruption that results in a malformed request, the server may
   * send a generic `400 Bad Request` response rather than sending this error code.
   *
   * Maps to:
   * - google.rpc.Code: DATA_LOSS = 15;
   * - HTTP code: 500 Internal Server Error
   */
  DATA_LOSS = 'DATA_LOSS',
  /** If the user attempts to perform an invalid state transition on a shard. */
  INVALID_STATE_TRANSITION = 'INVALID_STATE_TRANSITION',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * Unable to perform the operation because the shard was locked by some other operation.
   */
  COULD_NOT_ACQUIRE_LOCK = 'COULD_NOT_ACQUIRE_LOCK',
  /**
   * NOTE: Deprecated, prefer using ALREADY_EXISTS.
   * Unlike ALREADY_EXISTS - this maps to HTTP code 400 Bad Request due to legacy reasons,
   * remapping will be a backwards incompatible change.
   *
   * Operation was performed on a resource that already exists.
   */
  RESOURCE_ALREADY_EXISTS = 'RESOURCE_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated, prefer using NOT_FOUND - see the note for the RESOURCE_ALREADY_EXISTS,
   * because this pair of codes is related and RESOURCE_ALREADY_EXISTS has bad mapping to the HTTP
   * codes we added new error codes NOT_FOUND and ALREADY_EXISTS, and recommend to use them instead.
   *
   * Operation was performed on a resource that does not exist.
   */
  RESOURCE_DOES_NOT_EXIST = 'RESOURCE_DOES_NOT_EXIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MAX_BLOCK_SIZE_EXCEEDED = 'MAX_BLOCK_SIZE_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MAX_READ_SIZE_EXCEEDED = 'MAX_READ_SIZE_EXCEEDED',
  PARTIAL_DELETE = 'PARTIAL_DELETE',
  MAX_LIST_SIZE_EXCEEDED = 'MAX_LIST_SIZE_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DRY_RUN_FAILED = 'DRY_RUN_FAILED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * Cluster request was rejected because it would exceed a resource limit.
   */
  RESOURCE_LIMIT_EXCEEDED = 'RESOURCE_LIMIT_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DIRECTORY_NOT_EMPTY = 'DIRECTORY_NOT_EMPTY',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DIRECTORY_PROTECTED = 'DIRECTORY_PROTECTED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MAX_NOTEBOOK_SIZE_EXCEEDED = 'MAX_NOTEBOOK_SIZE_EXCEEDED',
  MAX_CHILD_NODE_SIZE_EXCEEDED = 'MAX_CHILD_NODE_SIZE_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SEARCH_QUERY_TOO_LONG = 'SEARCH_QUERY_TOO_LONG',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SEARCH_QUERY_TOO_SHORT = 'SEARCH_QUERY_TOO_SHORT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MANAGED_RESOURCE_GROUP_DOES_NOT_EXIST = 'MANAGED_RESOURCE_GROUP_DOES_NOT_EXIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  PERMISSION_NOT_PROPAGATED = 'PERMISSION_NOT_PROPAGATED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DEPLOYMENT_TIMEOUT = 'DEPLOYMENT_TIMEOUT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_CONFLICT = 'GIT_CONFLICT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_UNKNOWN_REF = 'GIT_UNKNOWN_REF',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_SENSITIVE_TOKEN_DETECTED = 'GIT_SENSITIVE_TOKEN_DETECTED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_URL_NOT_ON_ALLOW_LIST = 'GIT_URL_NOT_ON_ALLOW_LIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_REMOTE_ERROR = 'GIT_REMOTE_ERROR',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  PROJECTS_OPERATION_TIMEOUT = 'PROJECTS_OPERATION_TIMEOUT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  IPYNB_FILE_IN_REPO = 'IPYNB_FILE_IN_REPO',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  INSECURE_PARTNER_RESPONSE = 'INSECURE_PARTNER_RESPONSE',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MALFORMED_PARTNER_RESPONSE = 'MALFORMED_PARTNER_RESPONSE',
  METASTORE_DOES_NOT_EXIST = 'METASTORE_DOES_NOT_EXIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DAC_DOES_NOT_EXIST = 'DAC_DOES_NOT_EXIST',
  CATALOG_DOES_NOT_EXIST = 'CATALOG_DOES_NOT_EXIST',
  SCHEMA_DOES_NOT_EXIST = 'SCHEMA_DOES_NOT_EXIST',
  TABLE_DOES_NOT_EXIST = 'TABLE_DOES_NOT_EXIST',
  SHARE_DOES_NOT_EXIST = 'SHARE_DOES_NOT_EXIST',
  RECIPIENT_DOES_NOT_EXIST = 'RECIPIENT_DOES_NOT_EXIST',
  STORAGE_CREDENTIAL_DOES_NOT_EXIST = 'STORAGE_CREDENTIAL_DOES_NOT_EXIST',
  EXTERNAL_LOCATION_DOES_NOT_EXIST = 'EXTERNAL_LOCATION_DOES_NOT_EXIST',
  PRINCIPAL_DOES_NOT_EXIST = 'PRINCIPAL_DOES_NOT_EXIST',
  PROVIDER_DOES_NOT_EXIST = 'PROVIDER_DOES_NOT_EXIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  METASTORE_ALREADY_EXISTS = 'METASTORE_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DAC_ALREADY_EXISTS = 'DAC_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  CATALOG_ALREADY_EXISTS = 'CATALOG_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SCHEMA_ALREADY_EXISTS = 'SCHEMA_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  TABLE_ALREADY_EXISTS = 'TABLE_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SHARE_ALREADY_EXISTS = 'SHARE_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  RECIPIENT_ALREADY_EXISTS = 'RECIPIENT_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  STORAGE_CREDENTIAL_ALREADY_EXISTS = 'STORAGE_CREDENTIAL_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  EXTERNAL_LOCATION_ALREADY_EXISTS = 'EXTERNAL_LOCATION_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  PROVIDER_ALREADY_EXISTS = 'PROVIDER_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  CATALOG_NOT_EMPTY = 'CATALOG_NOT_EMPTY',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SCHEMA_NOT_EMPTY = 'SCHEMA_NOT_EMPTY',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  METASTORE_NOT_EMPTY = 'METASTORE_NOT_EMPTY',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  PROVIDER_SHARE_NOT_ACCESSIBLE = 'PROVIDER_SHARE_NOT_ACCESSIBLE',
}

export enum EvaluationStatusType {
  EVALUATION_STATUS_TYPE_UNSPECIFIED = 'EVALUATION_STATUS_TYPE_UNSPECIFIED',
  RUNNING = 'RUNNING',
  DONE = 'DONE',
  NOT_STARTED = 'NOT_STARTED',
  EVALUATION_FAILED = 'EVALUATION_FAILED',
  EVALUATION_CANCELLED = 'EVALUATION_CANCELLED',
  EVALUATION_TIMEOUT = 'EVALUATION_TIMEOUT',
}

export enum Format {
  FORMAT_UNSPECIFIED = 'FORMAT_UNSPECIFIED',
  JSON_ARRAY = 'JSON_ARRAY',
  ARROW_STREAM = 'ARROW_STREAM',
  CSV = 'CSV',
}

export enum GenieEvalAssessment {
  GENIE_EVAL_ASSESSMENT_UNSPECIFIED = 'GENIE_EVAL_ASSESSMENT_UNSPECIFIED',
  GOOD = 'GOOD',
  BAD = 'BAD',
  NEEDS_REVIEW = 'NEEDS_REVIEW',
}

export enum GenieEvalResponseType {
  GENIE_EVAL_RESPONSE_TYPE_UNSPECIFIED = 'GENIE_EVAL_RESPONSE_TYPE_UNSPECIFIED',
  TEXT = 'TEXT',
  SQL = 'SQL',
}

/** Feedback rating for Genie messages */
export enum GenieFeedbackRating {
  GENIE_FEEDBACK_RATING_UNSPECIFIED = 'GENIE_FEEDBACK_RATING_UNSPECIFIED',
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NONE = 'NONE',
}

/**
 * copied from proto3 / Google Well Known Types, source:
 * https://github.com/protocolbuffers/protobuf/blob/450d24ca820750c5db5112a6f0b0c2efb9758021/src/google/protobuf/struct.proto
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 * The JSON representation for `NullValue` is JSON `null`.
 */
export enum NullValue {
  /** Null value. */
  NULL_VALUE = 'NULL_VALUE',
}

export enum ResponsePhase {
  RESPONSE_PHASE_UNSPECIFIED = 'RESPONSE_PHASE_UNSPECIFIED',
  RESPONSE_PHASE_THINKING = 'RESPONSE_PHASE_THINKING',
  RESPONSE_PHASE_VERIFYING = 'RESPONSE_PHASE_VERIFYING',
}

export enum ScoreReason {
  SCORE_REASON_UNSPECIFIED = 'SCORE_REASON_UNSPECIFIED',
  EMPTY_RESULT = 'EMPTY_RESULT',
  RESULT_MISSING_ROWS = 'RESULT_MISSING_ROWS',
  RESULT_EXTRA_ROWS = 'RESULT_EXTRA_ROWS',
  RESULT_MISSING_COLUMNS = 'RESULT_MISSING_COLUMNS',
  RESULT_EXTRA_COLUMNS = 'RESULT_EXTRA_COLUMNS',
  SINGLE_CELL_DIFFERENCE = 'SINGLE_CELL_DIFFERENCE',
  EMPTY_GOOD_SQL = 'EMPTY_GOOD_SQL',
  COLUMN_TYPE_DIFFERENCE = 'COLUMN_TYPE_DIFFERENCE',
  /** Deprecated LLM Judge error categories - kept for backward compatibility */
  LLM_JUDGE_MISSING_JOIN = 'LLM_JUDGE_MISSING_JOIN',
  LLM_JUDGE_WRONG_FILTER = 'LLM_JUDGE_WRONG_FILTER',
  LLM_JUDGE_WRONG_AGGREGATION = 'LLM_JUDGE_WRONG_AGGREGATION',
  LLM_JUDGE_WRONG_COLUMNS = 'LLM_JUDGE_WRONG_COLUMNS',
  LLM_JUDGE_SYNTAX_ERROR = 'LLM_JUDGE_SYNTAX_ERROR',
  LLM_JUDGE_SEMANTIC_ERROR = 'LLM_JUDGE_SEMANTIC_ERROR',
  /** New LLM Judge error categories - aligned with LlmJudgeFunctionSpec */
  LLM_JUDGE_OTHER = 'LLM_JUDGE_OTHER',
  LLM_JUDGE_MISSING_OR_INCORRECT_FILTER = 'LLM_JUDGE_MISSING_OR_INCORRECT_FILTER',
  LLM_JUDGE_INCOMPLETE_OR_PARTIAL_OUTPUT = 'LLM_JUDGE_INCOMPLETE_OR_PARTIAL_OUTPUT',
  LLM_JUDGE_MISINTERPRETATION_OF_USER_REQUEST = 'LLM_JUDGE_MISINTERPRETATION_OF_USER_REQUEST',
  LLM_JUDGE_INSTRUCTION_COMPLIANCE_OR_MISSING_BUSINESS_LOGIC = 'LLM_JUDGE_INSTRUCTION_COMPLIANCE_OR_MISSING_BUSINESS_LOGIC',
  LLM_JUDGE_INCORRECT_METRIC_CALCULATION = 'LLM_JUDGE_INCORRECT_METRIC_CALCULATION',
  LLM_JUDGE_INCORRECT_TABLE_OR_FIELD_USAGE = 'LLM_JUDGE_INCORRECT_TABLE_OR_FIELD_USAGE',
  LLM_JUDGE_INCORRECT_FUNCTION_USAGE = 'LLM_JUDGE_INCORRECT_FUNCTION_USAGE',
  LLM_JUDGE_MISSING_OR_INCORRECT_JOIN = 'LLM_JUDGE_MISSING_OR_INCORRECT_JOIN',
  LLM_JUDGE_MISSING_OR_INCORRECT_AGGREGATION = 'LLM_JUDGE_MISSING_OR_INCORRECT_AGGREGATION',
  LLM_JUDGE_FORMATTING_ERROR = 'LLM_JUDGE_FORMATTING_ERROR',
}

/** Purpose/intent of a text attachment */
export enum TextAttachmentPurpose {
  TEXT_ATTACHMENT_PURPOSE_UNSPECIFIED = 'TEXT_ATTACHMENT_PURPOSE_UNSPECIFIED',
  FOLLOW_UP_QUESTION = 'FOLLOW_UP_QUESTION',
}

/**
 * ThoughtType.
 * The possible values are:
 * * `THOUGHT_TYPE_UNSPECIFIED`: Default value that should not be used.
 * * `THOUGHT_TYPE_DESCRIPTION`: A high-level description of how the question was interpreted.
 * * `THOUGHT_TYPE_UNDERSTANDING`: How ambiguous parts of the question were resolved.
 * * `THOUGHT_TYPE_DATA_SOURCING`: Which tables or datasets were identified as relevant.
 * * `THOUGHT_TYPE_INSTRUCTIONS`: Which author-defined instructions were referenced.
 * * `THOUGHT_TYPE_STEPS`: The logical steps taken to compute the answer.
 * The category of a Thought.
 * Additional values may be added in the future.
 */
export enum ThoughtType {
  THOUGHT_TYPE_UNSPECIFIED = 'THOUGHT_TYPE_UNSPECIFIED',
  /** A high-level description of how the question was interpreted. */
  THOUGHT_TYPE_DESCRIPTION = 'THOUGHT_TYPE_DESCRIPTION',
  /** How ambiguous parts of the question were resolved. */
  THOUGHT_TYPE_UNDERSTANDING = 'THOUGHT_TYPE_UNDERSTANDING',
  /** Which tables or datasets were identified as relevant. */
  THOUGHT_TYPE_DATA_SOURCING = 'THOUGHT_TYPE_DATA_SOURCING',
  /** Which author-defined instructions were referenced. */
  THOUGHT_TYPE_INSTRUCTIONS = 'THOUGHT_TYPE_INSTRUCTIONS',
  /** The logical steps taken to compute the answer. */
  THOUGHT_TYPE_STEPS = 'THOUGHT_TYPE_STEPS',
}

/**
 * Verification workflow section - indicates which stage of verification this attachment belongs to
 * These sections are used for grouping and ordering attachments in the frontend UI
 */
export enum VerificationSection {
  VERIFICATION_SECTION_UNSPECIFIED = 'VERIFICATION_SECTION_UNSPECIFIED',
  VERIFICATION_SECTION_SQL_EXAMPLES_VALIDATION = 'VERIFICATION_SECTION_SQL_EXAMPLES_VALIDATION',
  VERIFICATION_SECTION_VERIFICATION_QUERIES = 'VERIFICATION_SECTION_VERIFICATION_QUERIES',
  VERIFICATION_SECTION_PROPOSED_IMPROVEMENT = 'VERIFICATION_SECTION_PROPOSED_IMPROVEMENT',
  VERIFICATION_SECTION_FINAL_DECISION = 'VERIFICATION_SECTION_FINAL_DECISION',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum MessageError_Type {
  TYPE_UNSPECIFIED = 'TYPE_UNSPECIFIED',
  UNEXPECTED_REPLY_PROCESS_EXCEPTION = 'UNEXPECTED_REPLY_PROCESS_EXCEPTION',
  GENERIC_CHAT_COMPLETION_EXCEPTION = 'GENERIC_CHAT_COMPLETION_EXCEPTION',
  /** TokenCounter estimates were off and OpenAi responds with an error due to the token limit. */
  CONTEXT_EXCEEDED_EXCEPTION = 'CONTEXT_EXCEEDED_EXCEPTION',
  DEPLOYMENT_NOT_FOUND_EXCEPTION = 'DEPLOYMENT_NOT_FOUND_EXCEPTION',
  FUNCTIONS_NOT_AVAILABLE_EXCEPTION = 'FUNCTIONS_NOT_AVAILABLE_EXCEPTION',
  INVALID_COMPLETION_REQUEST_EXCEPTION = 'INVALID_COMPLETION_REQUEST_EXCEPTION',
  CONTENT_FILTER_EXCEPTION = 'CONTENT_FILTER_EXCEPTION',
  FUNCTION_ARGUMENTS_INVALID_JSON_EXCEPTION = 'FUNCTION_ARGUMENTS_INVALID_JSON_EXCEPTION',
  RETRYABLE_PROCESSING_EXCEPTION = 'RETRYABLE_PROCESSING_EXCEPTION',
  INVALID_FUNCTION_CALL_EXCEPTION = 'INVALID_FUNCTION_CALL_EXCEPTION',
  /** Request can not fit into model or the configured limits and TokenCounter registers token limit exceeded. */
  LOCAL_CONTEXT_EXCEEDED_EXCEPTION = 'LOCAL_CONTEXT_EXCEEDED_EXCEPTION',
  CHAT_COMPLETION_NETWORK_EXCEPTION = 'CHAT_COMPLETION_NETWORK_EXCEPTION',
  INVALID_CHAT_COMPLETION_JSON_EXCEPTION = 'INVALID_CHAT_COMPLETION_JSON_EXCEPTION',
  GENERIC_CHAT_COMPLETION_SERVICE_EXCEPTION = 'GENERIC_CHAT_COMPLETION_SERVICE_EXCEPTION',
  WAREHOUSE_ACCESS_MISSING_EXCEPTION = 'WAREHOUSE_ACCESS_MISSING_EXCEPTION',
  WAREHOUSE_NOT_FOUND_EXCEPTION = 'WAREHOUSE_NOT_FOUND_EXCEPTION',
  NO_TABLES_TO_QUERY_EXCEPTION = 'NO_TABLES_TO_QUERY_EXCEPTION',
  SQL_EXECUTION_EXCEPTION = 'SQL_EXECUTION_EXCEPTION',
  REPLY_PROCESS_TIMEOUT_EXCEPTION = 'REPLY_PROCESS_TIMEOUT_EXCEPTION',
  COULD_NOT_GET_UC_SCHEMA_EXCEPTION = 'COULD_NOT_GET_UC_SCHEMA_EXCEPTION',
  INVALID_TABLE_IDENTIFIER_EXCEPTION = 'INVALID_TABLE_IDENTIFIER_EXCEPTION',
  TOO_MANY_TABLES_EXCEPTION = 'TOO_MANY_TABLES_EXCEPTION',
  FUNCTION_ARGUMENTS_INVALID_EXCEPTION = 'FUNCTION_ARGUMENTS_INVALID_EXCEPTION',
  GENERIC_SQL_EXEC_API_CALL_EXCEPTION = 'GENERIC_SQL_EXEC_API_CALL_EXCEPTION',
  CHAT_COMPLETION_CLIENT_EXCEPTION = 'CHAT_COMPLETION_CLIENT_EXCEPTION',
  CHAT_COMPLETION_CLIENT_TIMEOUT_EXCEPTION = 'CHAT_COMPLETION_CLIENT_TIMEOUT_EXCEPTION',
  UNKNOWN_AI_MODEL = 'UNKNOWN_AI_MODEL',
  TABLES_MISSING_EXCEPTION = 'TABLES_MISSING_EXCEPTION',
  MESSAGE_DELETED_WHILE_EXECUTING_EXCEPTION = 'MESSAGE_DELETED_WHILE_EXECUTING_EXCEPTION',
  MESSAGE_UPDATED_WHILE_EXECUTING_EXCEPTION = 'MESSAGE_UPDATED_WHILE_EXECUTING_EXCEPTION',
  BLOCK_MULTIPLE_EXECUTIONS_EXCEPTION = 'BLOCK_MULTIPLE_EXECUTIONS_EXCEPTION',
  INVALID_CERTIFIED_ANSWER_IDENTIFIER_EXCEPTION = 'INVALID_CERTIFIED_ANSWER_IDENTIFIER_EXCEPTION',
  TOO_MANY_CERTIFIED_ANSWERS_EXCEPTION = 'TOO_MANY_CERTIFIED_ANSWERS_EXCEPTION',
  RATE_LIMIT_EXCEEDED_GENERIC_EXCEPTION = 'RATE_LIMIT_EXCEEDED_GENERIC_EXCEPTION',
  RATE_LIMIT_EXCEEDED_SPECIFIED_WAIT_EXCEPTION = 'RATE_LIMIT_EXCEEDED_SPECIFIED_WAIT_EXCEPTION',
  FUNCTION_CALL_MISSING_PARAMETER_EXCEPTION = 'FUNCTION_CALL_MISSING_PARAMETER_EXCEPTION',
  INVALID_CERTIFIED_ANSWER_FUNCTION_EXCEPTION = 'INVALID_CERTIFIED_ANSWER_FUNCTION_EXCEPTION',
  ILLEGAL_PARAMETER_DEFINITION_EXCEPTION = 'ILLEGAL_PARAMETER_DEFINITION_EXCEPTION',
  NO_QUERY_TO_VISUALIZE_EXCEPTION = 'NO_QUERY_TO_VISUALIZE_EXCEPTION',
  NO_DEPLOYMENTS_AVAILABLE_TO_WORKSPACE = 'NO_DEPLOYMENTS_AVAILABLE_TO_WORKSPACE',
  STOP_PROCESS_DUE_TO_AUTO_REGENERATE = 'STOP_PROCESS_DUE_TO_AUTO_REGENERATE',
  FUNCTION_ARGUMENTS_INVALID_TYPE_EXCEPTION = 'FUNCTION_ARGUMENTS_INVALID_TYPE_EXCEPTION',
  MESSAGE_CANCELLED_WHILE_EXECUTING_EXCEPTION = 'MESSAGE_CANCELLED_WHILE_EXECUTING_EXCEPTION',
  COULD_NOT_GET_MODEL_DEPLOYMENTS_EXCEPTION = 'COULD_NOT_GET_MODEL_DEPLOYMENTS_EXCEPTION',
  GENERATED_SQL_QUERY_TOO_LONG_EXCEPTION = 'GENERATED_SQL_QUERY_TOO_LONG_EXCEPTION',
  MISSING_SQL_QUERY_EXCEPTION = 'MISSING_SQL_QUERY_EXCEPTION',
  DESCRIBE_QUERY_UNEXPECTED_FAILURE = 'DESCRIBE_QUERY_UNEXPECTED_FAILURE',
  DESCRIBE_QUERY_TIMEOUT = 'DESCRIBE_QUERY_TIMEOUT',
  DESCRIBE_QUERY_INVALID_SQL_ERROR = 'DESCRIBE_QUERY_INVALID_SQL_ERROR',
  INVALID_SQL_UNKNOWN_TABLE_EXCEPTION = 'INVALID_SQL_UNKNOWN_TABLE_EXCEPTION',
  INVALID_SQL_MULTIPLE_STATEMENTS_EXCEPTION = 'INVALID_SQL_MULTIPLE_STATEMENTS_EXCEPTION',
  INVALID_SQL_MULTIPLE_DATASET_REFERENCES_EXCEPTION = 'INVALID_SQL_MULTIPLE_DATASET_REFERENCES_EXCEPTION',
  INVALID_CHAT_COMPLETION_ARGUMENTS_JSON_EXCEPTION = 'INVALID_CHAT_COMPLETION_ARGUMENTS_JSON_EXCEPTION',
  MESSAGE_ATTACHMENT_TOO_LONG_ERROR = 'MESSAGE_ATTACHMENT_TOO_LONG_ERROR',
  INTERNAL_CATALOG_PATH_OVERLAP_EXCEPTION = 'INTERNAL_CATALOG_PATH_OVERLAP_EXCEPTION',
  INTERNAL_CATALOG_MISSING_UC_PATH_EXCEPTION = 'INTERNAL_CATALOG_MISSING_UC_PATH_EXCEPTION',
  EXCEEDED_MAX_TOKEN_LENGTH_EXCEPTION = 'EXCEEDED_MAX_TOKEN_LENGTH_EXCEPTION',
  INTERNAL_CATALOG_ASSET_CREATION_ONGOING_EXCEPTION = 'INTERNAL_CATALOG_ASSET_CREATION_ONGOING_EXCEPTION',
  INTERNAL_CATALOG_ASSET_CREATION_FAILED_EXCEPTION = 'INTERNAL_CATALOG_ASSET_CREATION_FAILED_EXCEPTION',
  INTERNAL_CATALOG_ASSET_CREATION_UNSUPPORTED_EXCEPTION = 'INTERNAL_CATALOG_ASSET_CREATION_UNSUPPORTED_EXCEPTION',
  UNSUPPORTED_CONVERSATION_TYPE_EXCEPTION = 'UNSUPPORTED_CONVERSATION_TYPE_EXCEPTION',
  COULD_NOT_GET_DASHBOARD_SCHEMA_EXCEPTION = 'COULD_NOT_GET_DASHBOARD_SCHEMA_EXCEPTION',
  DELEGATION_NOT_FOUND_EXCEPTION = 'DELEGATION_NOT_FOUND_EXCEPTION',
}

/**
 * MessageStatus.
 * The possible values are:
 * * `FETCHING_METADATA`: Fetching metadata from the data sources.
 * * `FILTERING_CONTEXT`: Running smart context step to determine relevant context.
 * * `ASKING_AI`: Waiting for the LLM to respond to the user's question.
 * * `PENDING_WAREHOUSE`: Waiting for warehouse before the SQL query can start executing.
 * * `EXECUTING_QUERY`: Executing a generated SQL query. Get the SQL query result by calling [getMessageAttachmentQueryResult](:method:genie/getMessageAttachmentQueryResult) API.
 * * `FAILED`: The response generation or query execution failed. See `error` field.
 * * `COMPLETED`: Message processing is completed. Results are in the `attachments` field. Get the SQL query result by calling [getMessageAttachmentQueryResult](:method:genie/getMessageAttachmentQueryResult) API.
 * * `SUBMITTED`: Message has been submitted.
 * * `QUERY_RESULT_EXPIRED`: SQL result is not available anymore. The user needs to rerun the query. Rerun the SQL query result by calling [executeMessageAttachmentQuery](:method:genie/executeMessageAttachmentQuery) API.
 * * `CANCELLED`: Message has been cancelled.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum MessageStatus_MessageStatus {
  FETCHING_METADATA = 'FETCHING_METADATA',
  FILTERING_CONTEXT = 'FILTERING_CONTEXT',
  ASKING_AI = 'ASKING_AI',
  PENDING_WAREHOUSE = 'PENDING_WAREHOUSE',
  EXECUTING_QUERY = 'EXECUTING_QUERY',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
  SUBMITTED = 'SUBMITTED',
  QUERY_RESULT_EXPIRED = 'QUERY_RESULT_EXPIRED',
  CANCELLED = 'CANCELLED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum StatementStatus_State {
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
  CLOSED = 'CLOSED',
}

export interface ChunkInfo {
  /** The position within the sequence of result set chunks. */
  chunkIndex?: number | undefined;
  /** The starting row offset within the result set. */
  rowOffset?: number | undefined;
  /** The number of rows within the result chunk. */
  rowCount?: number | undefined;
  /**
   * The number of bytes in the result chunk. This field is not available when using `INLINE`
   * disposition.
   */
  byteCount?: number | undefined;
  /**
   * When fetching, provides the `chunk_index` for the _next_ chunk. If absent, indicates there are no
   * more chunks. The next chunk can be fetched with a
   * :method:statementexecution/getstatementresultchunkn request.
   */
  nextChunkIndex?: number | undefined;
  /**
   * When fetching, provides a link to fetch the _next_ chunk. If absent, indicates there are no more
   * chunks. This link is an absolute `path` to be joined with your `$DATABRICKS_HOST`, and should be
   * treated as an opaque link. This is an alternative to using `next_chunk_index`.
   */
  nextChunkInternalLink?: string | undefined;
}

export interface ColumnInfo {
  /** Name of Column. */
  name?: string | undefined;
  /** Full data type specification as SQL/catalogString text. */
  typeText?: string | undefined;
  typeName?: ColumnTypeName | undefined;
  /** Ordinal position of column (starting at position 0). */
  position?: number | undefined;
  /** Digits of precision; required for DecimalTypes. */
  typePrecision?: number | undefined;
  /** Digits to right of decimal; Required for DecimalTypes. */
  typeScale?: number | undefined;
  /** Format of IntervalType. */
  typeIntervalType?: string | undefined;
  /** Full data type specification, JSON-serialized. */
  typeJson?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Whether field may be Null (default: true). */
  nullable?: boolean | undefined;
  /** Partition index for column. */
  partitionIndex?: number | undefined;
  mask?: ColumnMask | undefined;
}

export interface ColumnMask {
  /** The full name of the column mask SQL UDF. */
  functionName?: string | undefined;
  /**
   * The list of additional table columns to be passed as input to the column mask function. The
   * first arg of the mask function should be of the type of the column being masked and the
   * types of the rest of the args should match the types of columns in 'using_column_names'.
   */
  usingColumnNames?: string[] | undefined;
  /**
   * The list of additional table columns or literals to be passed as additional arguments to
   * a column mask function. This is the replacement of the deprecated using_column_names field and
   * carries information about the types (alias or constant) of the arguments to the mask function.
   */
  usingArguments?: PolicyFunctionArgument[] | undefined;
}

/**
 * Serialization format for DatabricksServiceException.
 * Note the definition of this message should be in sync with DatabricksServiceExceptionWithDetailsProto
 * defined in /api-base/proto/exception_with_details.proto except the later one has an extra error
 * details field defined.
 */
export interface DatabricksServiceExceptionProto {
  errorCode?: ErrorCode | undefined;
  message?: string | undefined;
  stackTrace?: string | undefined;
}

export interface ExternalLink {
  /**
   * A  URL pointing to a
   * chunk of result data, hosted by an external service, with a short expiration time
   * (<= 15 minutes). As this URL contains a temporary credential, it should be considered sensitive
   * and the client should not expose this URL in a log.
   */
  externalLink?: string | undefined;
  /**
   * Indicates the date-time that the given external link will expire and
   * becomes invalid, after which point a new `external_link` must be requested.
   */
  expiration?: string | undefined;
  /**
   * HTTP headers that must be included with a GET request to the `external_link`.
   * Each header is provided as a key-value pair.
   * Headers are typically used to pass a decryption key to the external service.
   * The values of these headers should be considered sensitive and the client should not expose
   * these values in a log.
   */
  httpHeaders?: Record<string, string> | undefined;
  /** The position within the sequence of result set chunks. */
  chunkIndex?: number | undefined;
  /** The starting row offset within the result set. */
  rowOffset?: number | undefined;
  /** The number of rows within the result chunk. */
  rowCount?: number | undefined;
  /**
   * The number of bytes in the result chunk. This field is not available when using `INLINE`
   * disposition.
   */
  byteCount?: number | undefined;
  /**
   * When fetching, provides the `chunk_index` for the _next_ chunk. If absent, indicates there are no
   * more chunks. The next chunk can be fetched with a
   * :method:statementexecution/getstatementresultchunkn request.
   */
  nextChunkIndex?: number | undefined;
  /**
   * When fetching, provides a link to fetch the _next_ chunk. If absent, indicates there are no more
   * chunks. This link is an absolute `path` to be joined with your `$DATABRICKS_HOST`, and should be
   * treated as an opaque link. This is an alternative to using `next_chunk_index`.
   */
  nextChunkInternalLink?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ExternalLink_HttpHeadersEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Genie AI Response */
export interface GenieAttachment {
  attachment?:
    | {
        $case: 'text';
        /**
         * Text Attachment if Genie responds with text
         * This also contains the final summary when available.
         */
        text: TextAttachment;
      }
    | {
        $case: 'query';
        /** Query Attachment if Genie responds with a SQL query */
        query: GenieQueryAttachment;
      }
    | {
        $case: 'suggestedQuestions';
        /** Follow-up questions suggested by Genie */
        suggestedQuestions: GenieSuggestedQuestionsAttachment;
      }
    | undefined;
  /** Attachment ID */
  attachmentId?: string | undefined;
}

export interface GenieConversation {
  /**
   * Conversation ID.
   * Legacy identifier, use conversation_id instead
   */
  id?: string | undefined;
  /** Genie space ID */
  spaceId?: string | undefined;
  /** ID of the user who created the conversation */
  userId?: number | undefined;
  /** Timestamp when the message was created */
  createdTimestamp?: number | undefined;
  /** Timestamp when the message was last updated */
  lastUpdatedTimestamp?: number | undefined;
  /** Conversation title */
  title?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
}

export interface GenieConversationSummary {
  conversationId?: string | undefined;
  title?: string | undefined;
  createdTimestamp?: number | undefined;
}

export interface GenieCreateConversationMessageRequest {
  /** The ID associated with the Genie space where the conversation is started. */
  spaceId?: string | undefined;
  /** The ID associated with the conversation. */
  conversationId?: string | undefined;
  /** User message content. */
  content?: string | undefined;
}

export interface GenieCreateEvalRunRequest {
  /** The ID associated with the Genie space where the evaluations will be executed. */
  spaceId?: string | undefined;
  /** List of benchmark question IDs to evaluate. These questions must exist in the specified Genie space. If none are specified, then all benchmark questions are evaluated. */
  benchmarkQuestionIds?: string[] | undefined;
}

export interface GenieCreateMessageCommentRequest {
  /** The ID associated with the Genie space. */
  spaceId?: string | undefined;
  /** The ID associated with the conversation. */
  conversationId?: string | undefined;
  /** The ID associated with the message. */
  messageId?: string | undefined;
  /** Comment text content. */
  content?: string | undefined;
}

export interface GenieCreateSpaceRequest {
  /** Warehouse to associate with the new space */
  warehouseId?: string | undefined;
  /** Parent folder path where the space will be registered */
  parentPath?: string | undefined;
  /**
   * The contents of the Genie Space in serialized string form.
   * Use the [Get Genie Space](:method:genie/getspace) API to retrieve an example response, which includes the `serialized_space` field.
   * This field provides the structure of the JSON string that represents the space's layout and components.
   */
  serializedSpace?: string | undefined;
  /** Optional title override */
  title?: string | undefined;
  /** Optional description */
  description?: string | undefined;
}

export interface GenieDeleteConversationMessageRequest {
  /** The ID associated with the Genie space where the message is located. */
  spaceId?: string | undefined;
  /** The ID associated with the conversation. */
  conversationId?: string | undefined;
  /** The ID associated with the message to delete. */
  messageId?: string | undefined;
}

export interface GenieDeleteConversationRequest {
  /** The ID associated with the Genie space where the conversation is located. */
  spaceId?: string | undefined;
  /** The ID of the conversation to delete. */
  conversationId?: string | undefined;
}

export interface GenieEvalResponse {
  /** The response content (either text or SQL query). */
  response?: string | undefined;
  /** SQL Statement Execution response. */
  sqlExecutionResult?: StatementResponse | undefined;
  /** Type of response */
  responseType?: GenieEvalResponseType | undefined;
}

/**
 * Shows summary information for an evaluation result.
 * For detailed information including SQL execution results, actual/expected responses, and assessment scores, use GenieGetEvalResultDetails.
 */
export interface GenieEvalResult {
  /** Unique identifier for this evaluation result. */
  resultId?: string | undefined;
  /** The ID of the space the evaluation result belongs to. */
  spaceId?: string | undefined;
  /** The ID of the benchmark question that was evaluated. */
  benchmarkQuestionId?: string | undefined;
  /** Current status of this evaluation result. */
  status?: EvaluationStatusType | undefined;
  /** Stored snapshot of original benchmark question text. */
  question?: string | undefined;
  /** Stored snapshot of original benchmark answer text. */
  benchmarkAnswer?: string | undefined;
  /** User ID who created evaluation result. */
  createdByUser?: number | undefined;
}

/** Shows detailed information for an evaluation result. */
export interface GenieEvalResultDetails {
  /** The unique identifier for the evaluation result. */
  resultId?: string | undefined;
  /** The ID of the space the evaluation result belongs to. */
  spaceId?: string | undefined;
  /** The ID of the benchmark question that was evaluated. */
  benchmarkQuestionId?: string | undefined;
  /** Current status of the evaluation run. */
  evalRunStatus?: EvaluationStatusType | undefined;
  /** Assessment of the evaluation result: good, bad, or needs review */
  assessment?: GenieEvalAssessment | undefined;
  /** Whether this evaluation was manually assessed. */
  manualAssessment?: boolean | undefined;
  /**
   * Reasons for the assessment score.
   *
   * Assessment reasons describe why a Genie response was scored as BAD.
   *
   * Deterministic values (compared against the ground truth result):
   * - EMPTY_RESULT: Genie's generated SQL results were empty for this benchmark question.
   * - RESULT_MISSING_ROWS: Genie's generated SQL response is missing rows from the provided ground truth SQL.
   * - RESULT_EXTRA_ROWS: Genie's generated SQL response has more rows than the provided ground truth SQL.
   * - RESULT_MISSING_COLUMNS: Genie's generated SQL response is missing columns from the provided ground truth SQL.
   * - RESULT_EXTRA_COLUMNS: Genie's generated SQL response has more columns than the provided ground truth SQL.
   * - SINGLE_CELL_DIFFERENCE: Single value result was produced but differs from ground truth result.
   * - EMPTY_GOOD_SQL: The benchmark SQL returned an empty result.
   * - COLUMN_TYPE_DIFFERENCE: The values between the results match but the column type is different.
   *
   * LLM judge ratings explain the factors driving BAD results:
   * - LLM_JUDGE_MISSING_OR_INCORRECT_FILTER: Genie's generated SQL is missing a WHERE clause condition or has incorrect filter logic that excludes/includes wrong data.
   * - LLM_JUDGE_INCOMPLETE_OR_PARTIAL_OUTPUT: Genie's generated SQL returns only some of the requested data or columns, missing parts of what the ground truth SQL returns.
   * - LLM_JUDGE_MISINTERPRETATION_OF_USER_REQUEST: Genie's generated SQL fundamentally misunderstands what the user is asking for, addressing the wrong question or goal.
   * - LLM_JUDGE_INSTRUCTION_COMPLIANCE_OR_MISSING_BUSINESS_LOGIC: Genie's generated SQL fails to apply specified instructions or business logic that should be followed.
   * - LLM_JUDGE_INCORRECT_METRIC_CALCULATION: Genie's generated SQL uses incorrect logic or makes wrong assumptions when calculating metrics.
   * - LLM_JUDGE_INCORRECT_TABLE_OR_FIELD_USAGE: Genie's generated SQL references wrong tables, columns, or uses fields that don't match the ground truth SQL's intent.
   * - LLM_JUDGE_INCORRECT_FUNCTION_USAGE: Genie's generated SQL uses SQL functions incorrectly or inappropriately (wrong parameters, wrong function for the task, etc.).
   * - LLM_JUDGE_MISSING_OR_INCORRECT_JOIN: Genie's generated SQL is missing necessary joins between tables or has incorrect join conditions/types that produce wrong results.
   * - LLM_JUDGE_MISSING_OR_INCORRECT_AGGREGATION: Genie's generated SQL is missing GROUP BY clauses or has incorrect grouping that doesn't match the requested aggregation level.
   * - LLM_JUDGE_FORMATTING_ERROR: Genie's generated SQL output has incorrect formatting, ordering (ORDER BY), or presentation issues that don't match expectations.
   * - LLM_JUDGE_OTHER: LLM judge identified an error that doesn't fall into other categories.
   *
   * Deprecated LLM judge values (kept for backward compatibility, do not use):
   * - LLM_JUDGE_MISSING_JOIN (deprecated)
   * - LLM_JUDGE_WRONG_FILTER (deprecated)
   * - LLM_JUDGE_WRONG_AGGREGATION (deprecated)
   * - LLM_JUDGE_WRONG_COLUMNS (deprecated)
   * - LLM_JUDGE_SYNTAX_ERROR (deprecated)
   * - LLM_JUDGE_SEMANTIC_ERROR (deprecated)
   */
  assessmentReasons?: ScoreReason[] | undefined;
  /** The actual response generated by Genie. */
  actualResponse?: GenieEvalResponse[] | undefined;
  /** The expected responses from the benchmark. */
  expectedResponse?: GenieEvalResponse[] | undefined;
}

export interface GenieEvalRunResponse {
  /** The unique identifier for the evaluation run. */
  evalRunId?: string | undefined;
  /** Current status of the evaluation run. */
  evalRunStatus?: EvaluationStatusType | undefined;
  /** User ID who initiated the evaluation run. */
  runByUser?: number | undefined;
  /** Timestamp when the evaluation run was created (milliseconds since epoch). */
  createdTimestamp?: number | undefined;
  /** Total number of questions in the evaluation run. */
  numQuestions?: number | undefined;
  /** Number of questions answered correctly. */
  numCorrect?: number | undefined;
  /** Number of questions that need manual review. */
  numNeedsReview?: number | undefined;
  /** Number of questions that have been completed. */
  numDone?: number | undefined;
  /** Timestamp when the evaluation run was last updated (milliseconds since epoch). */
  lastUpdatedTimestamp?: number | undefined;
}

export interface GenieExecuteMessageAttachmentQueryRequest {
  /** Message ID */
  messageId?: string | undefined;
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
  /** Attachment ID */
  attachmentId?: string | undefined;
}

export interface GenieExecuteMessageQueryRequest {
  /** Message ID */
  messageId?: string | undefined;
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
}

/** Feedback containing rating and optional comment */
export interface GenieFeedback {
  /** The feedback rating */
  rating?: GenieFeedbackRating | undefined;
  /** Optional feedback comment text */
  comment?: string | undefined;
}

export interface GenieGenerateDownloadFullQueryResultRequest {
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
  /** Message ID */
  messageId?: string | undefined;
  /** Attachment ID */
  attachmentId?: string | undefined;
}

export interface GenieGenerateDownloadFullQueryResultResponse {
  /** Download ID. Use this ID to track the download request in subsequent polling calls */
  downloadId?: string | undefined;
  /** JWT signature for the download_id to ensure secure access to query results */
  downloadIdSignature?: string | undefined;
}

export interface GenieGetConversationMessageRequest {
  /** The ID associated with the Genie space where the target conversation is located. */
  spaceId?: string | undefined;
  /** The ID associated with the target conversation. */
  conversationId?: string | undefined;
  /** The ID associated with the target message from the identified conversation. */
  messageId?: string | undefined;
}

export interface GenieGetDownloadFullQueryResultRequest {
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
  /** Message ID */
  messageId?: string | undefined;
  /** Attachment ID */
  attachmentId?: string | undefined;
  /** Download ID. This ID is provided by the [Generate Download endpoint](:method:genie/generateDownloadFullQueryResult) */
  downloadId?: string | undefined;
  /** JWT signature for the download_id to ensure secure access to query results */
  downloadIdSignature?: string | undefined;
}

export interface GenieGetDownloadFullQueryResultResponse {
  /** SQL Statement Execution response. See [Get status, manifest, and result first chunk](:method:statementexecution/getstatement) for more details. */
  statementResponse?: StatementResponse | undefined;
}

export interface GenieGetEvalResultDetailsRequest {
  /** The ID associated with the Genie space where the evaluation run is located. */
  spaceId?: string | undefined;
  /** The unique identifier for the evaluation run. */
  evalRunId?: string | undefined;
  /** The unique identifier for the evaluation result. */
  resultId?: string | undefined;
}

export interface GenieGetEvalRunRequest {
  /** The ID associated with the Genie space where the evaluation run is located. */
  spaceId?: string | undefined;
  evalRunId?: string | undefined;
}

export interface GenieGetMessageAttachmentQueryResultRequest {
  /** Message ID */
  messageId?: string | undefined;
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
  /** Attachment ID */
  attachmentId?: string | undefined;
}

export interface GenieGetMessageQueryResultRequest {
  /** Message ID */
  messageId?: string | undefined;
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
}

export interface GenieGetMessageQueryResultResponse {
  /** SQL Statement Execution response. See [Get status, manifest, and result first chunk](:method:statementexecution/getstatement) for more details. */
  statementResponse?: StatementResponse | undefined;
}

export interface GenieGetQueryResultByAttachmentRequest {
  /** Message ID */
  messageId?: string | undefined;
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
  /** Attachment ID */
  attachmentId?: string | undefined;
}

export interface GenieGetSpaceRequest {
  /** The ID associated with the Genie space */
  spaceId?: string | undefined;
  /**
   * Whether to include the serialized space export in the response.
   * Requires at least CAN EDIT permission on the space.
   */
  includeSerializedSpace?: boolean | undefined;
}

export interface GenieListConversationCommentsRequest {
  /** The ID associated with the Genie space. */
  spaceId?: string | undefined;
  /** The ID associated with the conversation. */
  conversationId?: string | undefined;
  /** Maximum number of comments to return per page. */
  pageSize?: number | undefined;
  /** Pagination token for getting the next page of results. */
  pageToken?: string | undefined;
}

export interface GenieListConversationCommentsResponse {
  /** List of comments in the conversation. */
  comments?: GenieMessageComment[] | undefined;
  /** Token to get the next page of results. */
  nextPageToken?: string | undefined;
}

export interface GenieListConversationMessagesRequest {
  /** The ID associated with the Genie space where the conversation is located */
  spaceId?: string | undefined;
  /** The ID of the conversation to list messages from */
  conversationId?: string | undefined;
  /** Maximum number of messages to return per page */
  pageSize?: number | undefined;
  /** Token to get the next page of results */
  pageToken?: string | undefined;
}

export interface GenieListConversationMessagesResponse {
  /** List of messages in the conversation. */
  messages?: GenieMessage[] | undefined;
  /** The token to use for retrieving the next page of results. */
  nextPageToken?: string | undefined;
}

export interface GenieListConversationsRequest {
  /** The ID of the Genie space to retrieve conversations from. */
  spaceId?: string | undefined;
  /** Maximum number of conversations to return per page */
  pageSize?: number | undefined;
  /** Token to get the next page of results */
  pageToken?: string | undefined;
  /**
   * Include all conversations in the space across all users.
   * Requires at least CAN MANAGE permission on the space.
   */
  includeAll?: boolean | undefined;
}

export interface GenieListConversationsResponse {
  /** List of conversations in the Genie space */
  conversations?: GenieConversationSummary[] | undefined;
  /** Token to get the next page of results */
  nextPageToken?: string | undefined;
}

export interface GenieListEvalResultsRequest {
  /** The ID associated with the Genie space where the evaluation run is located. */
  spaceId?: string | undefined;
  /** The unique identifier for the evaluation run. */
  evalRunId?: string | undefined;
  /** Maximum number of eval results to return per page. */
  pageSize?: number | undefined;
  /** Opaque token to retrieve the next page of results. */
  pageToken?: string | undefined;
}

export interface GenieListEvalResultsResponse {
  /** List of evaluation results for the specified run. */
  evalResults?: GenieEvalResult[] | undefined;
  /** The token to use for retrieving the next page of results. */
  nextPageToken?: string | undefined;
}

export interface GenieListEvalRunsRequest {
  /** The ID associated with the Genie space where the evaluation run is located. */
  spaceId?: string | undefined;
  /** Maximum number of evaluation runs to return per page */
  pageSize?: number | undefined;
  /** Token to get the next page of results */
  pageToken?: string | undefined;
}

export interface GenieListEvalRunsResponse {
  /** List of evaluation runs for a space on provided page token and page size */
  evalRuns?: GenieEvalRunResponse[] | undefined;
  /** The token to use for retrieving the next page of results. */
  nextPageToken?: string | undefined;
}

export interface GenieListMessageCommentsRequest {
  /** The ID associated with the Genie space. */
  spaceId?: string | undefined;
  /** The ID associated with the conversation. */
  conversationId?: string | undefined;
  /** The ID associated with the message. */
  messageId?: string | undefined;
  /** Maximum number of comments to return per page. */
  pageSize?: number | undefined;
  /** Pagination token for getting the next page of results. */
  pageToken?: string | undefined;
}

export interface GenieListMessageCommentsResponse {
  /** List of comments on the message. */
  comments?: GenieMessageComment[] | undefined;
  /** Token to get the next page of results. */
  nextPageToken?: string | undefined;
}

export interface GenieListSpacesRequest {
  /** Maximum number of spaces to return per page */
  pageSize?: number | undefined;
  /** Pagination token for getting the next page of results */
  pageToken?: string | undefined;
}

export interface GenieListSpacesResponse {
  /** List of Genie spaces */
  spaces?: GenieSpace[] | undefined;
  /** Token to get the next page of results */
  nextPageToken?: string | undefined;
}

export interface GenieMessage {
  /**
   * Message ID.
   * Legacy identifier, use message_id instead
   */
  id?: string | undefined;
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
  /** ID of the user who created the message */
  userId?: number | undefined;
  /** Timestamp when the message was created */
  createdTimestamp?: number | undefined;
  /** Timestamp when the message was last updated */
  lastUpdatedTimestamp?: number | undefined;
  status?: MessageStatus_MessageStatus | undefined;
  /** User message content */
  content?: string | undefined;
  /** AI-generated response to the message */
  attachments?: GenieAttachment[] | undefined;
  /**
   * The result of SQL query if the message includes a query attachment.
   * Deprecated. Use `query_result_metadata` in `GenieQueryAttachment` instead.
   */
  queryResult?: Result | undefined;
  /** Error message if Genie failed to respond to the message */
  error?: MessageError | undefined;
  /** Message ID */
  messageId?: string | undefined;
  /** User feedback for the message if provided */
  feedback?: GenieFeedback | undefined;
}

/** A comment on a Genie conversation message. */
export interface GenieMessageComment {
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
  /** Message ID */
  messageId?: string | undefined;
  /** Comment ID */
  messageCommentId?: string | undefined;
  /** ID of the user who created the comment */
  userId?: number | undefined;
  /** Comment text content */
  content?: string | undefined;
  /** Timestamp when the comment was created */
  createdTimestamp?: number | undefined;
}

export interface GenieQueryAttachment {
  /** Name of the query */
  title?: string | undefined;
  /** AI generated SQL query */
  query?: string | undefined;
  /** Description of the query */
  description?: string | undefined;
  /** Time when the user updated the query last */
  lastUpdatedTimestamp?: number | undefined;
  parameters?: QueryAttachmentParameter[] | undefined;
  id?: string | undefined;
  /** Statement Execution API statement id. Use [Get status, manifest, and result first chunk](:method:statementexecution/getstatement) to get the full result data. */
  statementId?: string | undefined;
  /** Metadata associated with the query result. */
  queryResultMetadata?: GenieResultMetadata | undefined;
  /** Insights into how Genie came to generate the SQL. */
  thoughts?: Thought[] | undefined;
}

export interface GenieResultMetadata {
  /** The number of rows in the result set. */
  rowCount?: number | undefined;
  /** Indicates whether the result set is truncated. */
  isTruncated?: boolean | undefined;
}

export interface GenieSendMessageFeedbackRequest {
  /** The ID associated with the Genie space where the message is located. */
  spaceId?: string | undefined;
  /** The ID associated with the conversation. */
  conversationId?: string | undefined;
  /** The ID associated with the message to provide feedback for. */
  messageId?: string | undefined;
  /** The rating (POSITIVE, NEGATIVE, or NONE). */
  rating?: GenieFeedbackRating | undefined;
  /** Optional text feedback that will be stored as a comment. */
  comment?: string | undefined;
}

export interface GenieSpace {
  /** Genie space ID */
  spaceId?: string | undefined;
  /** Title of the Genie Space */
  title?: string | undefined;
  /** Description of the Genie Space */
  description?: string | undefined;
  /** Warehouse associated with the Genie Space */
  warehouseId?: string | undefined;
  /** Parent folder path of the Genie Space */
  parentPath?: string | undefined;
  /**
   * The contents of the Genie Space in serialized string form.
   * This field is excluded in List Genie spaces responses.
   * Use the [Get Genie Space](:method:genie/getspace) API to retrieve an example response, which includes the `serialized_space` field.
   * This field provides the structure of the JSON string that represents the space's layout and components.
   */
  serializedSpace?: string | undefined;
  /**
   * ETag for this space. Pass this value back in the update request to prevent overwriting
   * concurrent changes.
   */
  etag?: string | undefined;
}

export interface GenieStartConversationMessageRequest {
  /** The ID associated with the Genie space where you want to start a conversation. */
  spaceId?: string | undefined;
  /** The text of the message that starts the conversation. */
  content?: string | undefined;
}

export interface GenieStartConversationResponse {
  /** Message ID */
  messageId?: string | undefined;
  message?: GenieMessage | undefined;
  /** Conversation ID */
  conversationId?: string | undefined;
  conversation?: GenieConversation | undefined;
}

/** Follow-up questions suggested by Genie */
export interface GenieSuggestedQuestionsAttachment {
  /** The suggested follow-up questions */
  questions?: string[] | undefined;
}

export interface GenieTrashSpaceRequest {
  /** The ID associated with the Genie space to be sent to the trash. */
  spaceId?: string | undefined;
}

export interface GenieUpdateSpaceRequest {
  /** Genie space ID */
  spaceId?: string | undefined;
  /**
   * The contents of the Genie Space in serialized string form (full replacement).
   * Use the [Get Genie Space](:method:genie/getspace) API to retrieve an example response, which includes the `serialized_space` field.
   * This field provides the structure of the JSON string that represents the space's layout and components.
   */
  serializedSpace?: string | undefined;
  /** Optional title override */
  title?: string | undefined;
  /** Optional description */
  description?: string | undefined;
  /** Optional warehouse override */
  warehouseId?: string | undefined;
  /**
   * ETag returned by a previous GET or UPDATE. When set, the update will fail if the space
   * has been modified since. Omit to apply the update unconditionally.
   */
  etag?: string | undefined;
  /** Parent workspace folder path to move this Genie space under. */
  parentPath?: string | undefined;
}

/**
 * copied from proto3 / Google Well Known Types, source:
 * https://github.com/protocolbuffers/protobuf/blob/450d24ca820750c5db5112a6f0b0c2efb9758021/src/google/protobuf/struct.proto
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValue {
  /** Repeated field of dynamically typed values. */
  values?: Value[] | undefined;
}

/**
 * <Databricks> proto compiler is too old and does not support map.
 * This is wire compatible with map<string,string>.
 * See https://developers.google.com/protocol-buffers/docs/proto#backwards_compatibility.
 */
export interface MapStringValueEntry {
  key?: string | undefined;
  value?: Value | undefined;
}

export interface MessageError {
  error?: string | undefined;
  type?: MessageError_Type | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MessageStatus {}

/**
 * A positional argument passed to a row filter or column mask function.
 * Distinguishes between column references and literals.
 */
export interface PolicyFunctionArgument {
  arg?:
    | {
        $case: 'column';
        /** A column reference. */
        column: string;
      }
    | {
        $case: 'constant';
        /** A constant literal. */
        constant: string;
      }
    | undefined;
}

export interface QueryAttachmentParameter {
  keyword?: string | undefined;
  value?: string | undefined;
  sqlType?: string | undefined;
}

export interface Result {
  /** Statement Execution API statement id. Use [Get status, manifest, and result first chunk](:method:statementexecution/getstatement) to get the full result data. */
  statementId?: string | undefined;
  /** Row count of the result */
  rowCount?: number | undefined;
  /** If result is truncated */
  isTruncated?: boolean | undefined;
  /** JWT corresponding to the statement contained in this result */
  statementIdSignature?: string | undefined;
}

/**
 * Contains the result data of a single chunk when using `INLINE` disposition. When using
 * `EXTERNAL_LINKS` disposition, the array `external_links` is used instead to provide
 * URLs to the result data
 * in cloud storage. Exactly one of these alternatives is used. (While the `external_links`
 * array prepares the API to return multiple links in a single response. Currently only a single
 * link is returned.)
 */
export interface ResultData {
  externalLinks?: ExternalLink[] | undefined;
  /**
   * The `JSON_ARRAY` format is an array of arrays of values, where each non-null value is
   * formatted as a string. Null values are encoded as JSON `null`.
   */
  dataArray?: ListValue[] | undefined;
  /** The position within the sequence of result set chunks. */
  chunkIndex?: number | undefined;
  /** The starting row offset within the result set. */
  rowOffset?: number | undefined;
  /** The number of rows within the result chunk. */
  rowCount?: number | undefined;
  /**
   * The number of bytes in the result chunk. This field is not available when using `INLINE`
   * disposition.
   */
  byteCount?: number | undefined;
  /**
   * When fetching, provides the `chunk_index` for the _next_ chunk. If absent, indicates there are no
   * more chunks. The next chunk can be fetched with a
   * :method:statementexecution/getstatementresultchunkn request.
   */
  nextChunkIndex?: number | undefined;
  /**
   * When fetching, provides a link to fetch the _next_ chunk. If absent, indicates there are no more
   * chunks. This link is an absolute `path` to be joined with your `$DATABRICKS_HOST`, and should be
   * treated as an opaque link. This is an alternative to using `next_chunk_index`.
   */
  nextChunkInternalLink?: string | undefined;
}

/** The result manifest provides schema and metadata for the result set. */
export interface ResultManifest {
  format?: Format | undefined;
  schema?: Schema | undefined;
  /** The total number of chunks that the result set has been divided into. */
  totalChunkCount?: number | undefined;
  /** Array of result set chunk metadata. */
  chunks?: ChunkInfo[] | undefined;
  /** The total number of rows in the result set. */
  totalRowCount?: number | undefined;
  /**
   * The total number of bytes in the result set. This field is not available when using `INLINE`
   * disposition.
   */
  totalByteCount?: number | undefined;
  /** Indicates whether the result is truncated due to `row_limit` or `byte_limit`. */
  truncated?: boolean | undefined;
}

export interface Schema {
  columnCount?: number | undefined;
  columns?: ColumnInfo[] | undefined;
}

export interface StatementResponse {
  /**
   * The statement ID is returned upon successfully submitting a SQL statement, and is a required
   * reference for all subsequent calls.
   */
  statementId?: string | undefined;
  status?: StatementStatus | undefined;
  manifest?: ResultManifest | undefined;
  result?: ResultData | undefined;
}

/** The status response includes execution state and if relevant, error information. */
export interface StatementStatus {
  /**
   * Statement execution state:
   * - `PENDING`: waiting for warehouse
   * - `RUNNING`: running
   * - `SUCCEEDED`: execution was successful, result data available for fetch
   * - `FAILED`: execution failed; reason for failure described in accompanying error message
   * - `CANCELED`: user canceled; can come from explicit cancel call, or timeout with
   * `on_wait_timeout=CANCEL`
   * - `CLOSED`: execution successful, and statement closed; result no longer available for fetch
   */
  state?: StatementStatus_State | undefined;
  error?: DatabricksServiceExceptionProto | undefined;
  /**
   * SQLSTATE error code returned when the statement execution fails.
   * Only populated when the statement status is `FAILED`.
   */
  sqlState?: string | undefined;
}

/**
 * copied from proto3 / Google Well Known Types, source:
 * https://github.com/protocolbuffers/protobuf/blob/450d24ca820750c5db5112a6f0b0c2efb9758021/src/google/protobuf/struct.proto
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 */
export interface Struct {
  /** Unordered map of dynamically typed values. */
  fields?: MapStringValueEntry[] | undefined;
}

export interface TextAttachment {
  /** AI generated message */
  content?: string | undefined;
  id?: string | undefined;
  phase?: ResponsePhase | undefined;
  /** Metadata for verification phase attachments. Only set when phase = RESPONSE_PHASE_VERIFYING. */
  verificationMetadata?: VerificationMetadata | undefined;
  /** Purpose/intent of this text attachment */
  purpose?: TextAttachmentPurpose | undefined;
}

/** A single thought in the AI's reasoning process for a query. */
export interface Thought {
  /**
   * The category of this thought.
   * The possible values are:
   * * `THOUGHT_TYPE_DESCRIPTION`: A high-level description of how the question was interpreted.
   * * `THOUGHT_TYPE_UNDERSTANDING`: How ambiguous parts of the question were resolved.
   * * `THOUGHT_TYPE_DATA_SOURCING`: Which tables or datasets were identified as relevant.
   * * `THOUGHT_TYPE_INSTRUCTIONS`: Which author-defined instructions were referenced.
   * * `THOUGHT_TYPE_STEPS`: The logical steps taken to compute the answer.
   */
  thoughtType?: ThoughtType | undefined;
  /** The md formatted content for this thought. */
  content?: string | undefined;
}

/**
 * copied from proto3 / Google Well Known Types, source:
 * https://github.com/protocolbuffers/protobuf/blob/450d24ca820750c5db5112a6f0b0c2efb9758021/src/google/protobuf/struct.proto
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 */
export interface Value {
  /** The kind of value. */
  kind?:
    | {
        $case: 'nullValue';
        /** Represents a null value. */
        nullValue: NullValue;
      }
    | {
        $case: 'numberValue';
        /** Represents a double value. */
        numberValue: number;
      }
    | {
        $case: 'stringValue';
        /** Represents a string value. */
        stringValue: string;
      }
    | {
        $case: 'boolValue';
        /** Represents a boolean value. */
        boolValue: boolean;
      }
    | {
        $case: 'structValue';
        /** Represents a structured value. */
        structValue: Struct;
      }
    | {
        $case: 'listValue';
        /** Represents a repeated `Value`. */
        listValue: ListValue;
      }
    | undefined;
}

/** Metadata for verification phase attachments */
export interface VerificationMetadata {
  section?: VerificationSection | undefined;
  /** Optional index to help order attachments within the same section */
  index?: number | undefined;
}

export const unmarshalChunkInfoSchema: z.ZodType<ChunkInfo> = z
  .object({
    chunk_index: z.number().optional(),
    row_offset: z.number().optional(),
    row_count: z.number().optional(),
    byte_count: z.number().optional(),
    next_chunk_index: z.number().optional(),
    next_chunk_internal_link: z.string().optional(),
  })
  .transform(d => ({
    chunkIndex: d.chunk_index,
    rowOffset: d.row_offset,
    rowCount: d.row_count,
    byteCount: d.byte_count,
    nextChunkIndex: d.next_chunk_index,
    nextChunkInternalLink: d.next_chunk_internal_link,
  }));

export const unmarshalColumnInfoSchema: z.ZodType<ColumnInfo> = z
  .object({
    name: z.string().optional(),
    type_text: z.string().optional(),
    type_name: z.enum(ColumnTypeName).optional(),
    position: z.number().optional(),
    type_precision: z.number().optional(),
    type_scale: z.number().optional(),
    type_interval_type: z.string().optional(),
    type_json: z.string().optional(),
    comment: z.string().optional(),
    nullable: z.boolean().optional(),
    partition_index: z.number().optional(),
    mask: z.lazy(() => unmarshalColumnMaskSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    typeText: d.type_text,
    typeName: d.type_name,
    position: d.position,
    typePrecision: d.type_precision,
    typeScale: d.type_scale,
    typeIntervalType: d.type_interval_type,
    typeJson: d.type_json,
    comment: d.comment,
    nullable: d.nullable,
    partitionIndex: d.partition_index,
    mask: d.mask,
  }));

export const unmarshalColumnMaskSchema: z.ZodType<ColumnMask> = z
  .object({
    function_name: z.string().optional(),
    using_column_names: z.array(z.string()).optional(),
    using_arguments: z
      .array(z.lazy(() => unmarshalPolicyFunctionArgumentSchema))
      .optional(),
  })
  .transform(d => ({
    functionName: d.function_name,
    usingColumnNames: d.using_column_names,
    usingArguments: d.using_arguments,
  }));

export const unmarshalDatabricksServiceExceptionProtoSchema: z.ZodType<DatabricksServiceExceptionProto> =
  z
    .object({
      error_code: z.enum(ErrorCode).optional(),
      message: z.string().optional(),
      stack_trace: z.string().optional(),
    })
    .transform(d => ({
      errorCode: d.error_code,
      message: d.message,
      stackTrace: d.stack_trace,
    }));

export const unmarshalExternalLinkSchema: z.ZodType<ExternalLink> = z
  .object({
    external_link: z.string().optional(),
    expiration: z.string().optional(),
    http_headers: z.record(z.string(), z.string()).optional(),
    chunk_index: z.number().optional(),
    row_offset: z.number().optional(),
    row_count: z.number().optional(),
    byte_count: z.number().optional(),
    next_chunk_index: z.number().optional(),
    next_chunk_internal_link: z.string().optional(),
  })
  .transform(d => ({
    externalLink: d.external_link,
    expiration: d.expiration,
    httpHeaders: d.http_headers,
    chunkIndex: d.chunk_index,
    rowOffset: d.row_offset,
    rowCount: d.row_count,
    byteCount: d.byte_count,
    nextChunkIndex: d.next_chunk_index,
    nextChunkInternalLink: d.next_chunk_internal_link,
  }));

export const unmarshalGenieAttachmentSchema: z.ZodType<GenieAttachment> = z
  .object({
    text: z.lazy(() => unmarshalTextAttachmentSchema).optional(),
    query: z.lazy(() => unmarshalGenieQueryAttachmentSchema).optional(),
    suggested_questions: z
      .lazy(() => unmarshalGenieSuggestedQuestionsAttachmentSchema)
      .optional(),
    attachment_id: z.string().optional(),
  })
  .transform(d => ({
    attachment:
      d.text !== undefined
        ? {$case: 'text' as const, text: d.text}
        : d.query !== undefined
          ? {$case: 'query' as const, query: d.query}
          : d.suggested_questions !== undefined
            ? {
                $case: 'suggestedQuestions' as const,
                suggestedQuestions: d.suggested_questions,
              }
            : undefined,
    attachmentId: d.attachment_id,
  }));

export const unmarshalGenieConversationSchema: z.ZodType<GenieConversation> = z
  .object({
    id: z.string().optional(),
    space_id: z.string().optional(),
    user_id: z.number().optional(),
    created_timestamp: z.number().optional(),
    last_updated_timestamp: z.number().optional(),
    title: z.string().optional(),
    conversation_id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    spaceId: d.space_id,
    userId: d.user_id,
    createdTimestamp: d.created_timestamp,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    title: d.title,
    conversationId: d.conversation_id,
  }));

export const unmarshalGenieConversationSummarySchema: z.ZodType<GenieConversationSummary> =
  z
    .object({
      conversation_id: z.string().optional(),
      title: z.string().optional(),
      created_timestamp: z.number().optional(),
    })
    .transform(d => ({
      conversationId: d.conversation_id,
      title: d.title,
      createdTimestamp: d.created_timestamp,
    }));

export const unmarshalGenieEvalResponseSchema: z.ZodType<GenieEvalResponse> = z
  .object({
    response: z.string().optional(),
    sql_execution_result: z
      .lazy(() => unmarshalStatementResponseSchema)
      .optional(),
    response_type: z.enum(GenieEvalResponseType).optional(),
  })
  .transform(d => ({
    response: d.response,
    sqlExecutionResult: d.sql_execution_result,
    responseType: d.response_type,
  }));

export const unmarshalGenieEvalResultSchema: z.ZodType<GenieEvalResult> = z
  .object({
    result_id: z.string().optional(),
    space_id: z.string().optional(),
    benchmark_question_id: z.string().optional(),
    status: z.enum(EvaluationStatusType).optional(),
    question: z.string().optional(),
    benchmark_answer: z.string().optional(),
    created_by_user: z.number().optional(),
  })
  .transform(d => ({
    resultId: d.result_id,
    spaceId: d.space_id,
    benchmarkQuestionId: d.benchmark_question_id,
    status: d.status,
    question: d.question,
    benchmarkAnswer: d.benchmark_answer,
    createdByUser: d.created_by_user,
  }));

export const unmarshalGenieEvalResultDetailsSchema: z.ZodType<GenieEvalResultDetails> =
  z
    .object({
      result_id: z.string().optional(),
      space_id: z.string().optional(),
      benchmark_question_id: z.string().optional(),
      eval_run_status: z.enum(EvaluationStatusType).optional(),
      assessment: z.enum(GenieEvalAssessment).optional(),
      manual_assessment: z.boolean().optional(),
      assessment_reasons: z.array(z.enum(ScoreReason)).optional(),
      actual_response: z
        .array(z.lazy(() => unmarshalGenieEvalResponseSchema))
        .optional(),
      expected_response: z
        .array(z.lazy(() => unmarshalGenieEvalResponseSchema))
        .optional(),
    })
    .transform(d => ({
      resultId: d.result_id,
      spaceId: d.space_id,
      benchmarkQuestionId: d.benchmark_question_id,
      evalRunStatus: d.eval_run_status,
      assessment: d.assessment,
      manualAssessment: d.manual_assessment,
      assessmentReasons: d.assessment_reasons,
      actualResponse: d.actual_response,
      expectedResponse: d.expected_response,
    }));

export const unmarshalGenieEvalRunResponseSchema: z.ZodType<GenieEvalRunResponse> =
  z
    .object({
      eval_run_id: z.string().optional(),
      eval_run_status: z.enum(EvaluationStatusType).optional(),
      run_by_user: z.number().optional(),
      created_timestamp: z.number().optional(),
      num_questions: z.number().optional(),
      num_correct: z.number().optional(),
      num_needs_review: z.number().optional(),
      num_done: z.number().optional(),
      last_updated_timestamp: z.number().optional(),
    })
    .transform(d => ({
      evalRunId: d.eval_run_id,
      evalRunStatus: d.eval_run_status,
      runByUser: d.run_by_user,
      createdTimestamp: d.created_timestamp,
      numQuestions: d.num_questions,
      numCorrect: d.num_correct,
      numNeedsReview: d.num_needs_review,
      numDone: d.num_done,
      lastUpdatedTimestamp: d.last_updated_timestamp,
    }));

export const unmarshalGenieFeedbackSchema: z.ZodType<GenieFeedback> = z
  .object({
    rating: z.enum(GenieFeedbackRating).optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    rating: d.rating,
    comment: d.comment,
  }));

export const unmarshalGenieGenerateDownloadFullQueryResultResponseSchema: z.ZodType<GenieGenerateDownloadFullQueryResultResponse> =
  z
    .object({
      download_id: z.string().optional(),
      download_id_signature: z.string().optional(),
    })
    .transform(d => ({
      downloadId: d.download_id,
      downloadIdSignature: d.download_id_signature,
    }));

export const unmarshalGenieGetDownloadFullQueryResultResponseSchema: z.ZodType<GenieGetDownloadFullQueryResultResponse> =
  z
    .object({
      statement_response: z
        .lazy(() => unmarshalStatementResponseSchema)
        .optional(),
    })
    .transform(d => ({
      statementResponse: d.statement_response,
    }));

export const unmarshalGenieGetMessageQueryResultResponseSchema: z.ZodType<GenieGetMessageQueryResultResponse> =
  z
    .object({
      statement_response: z
        .lazy(() => unmarshalStatementResponseSchema)
        .optional(),
    })
    .transform(d => ({
      statementResponse: d.statement_response,
    }));

export const unmarshalGenieListConversationCommentsResponseSchema: z.ZodType<GenieListConversationCommentsResponse> =
  z
    .object({
      comments: z
        .array(z.lazy(() => unmarshalGenieMessageCommentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      comments: d.comments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalGenieListConversationMessagesResponseSchema: z.ZodType<GenieListConversationMessagesResponse> =
  z
    .object({
      messages: z.array(z.lazy(() => unmarshalGenieMessageSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      messages: d.messages,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalGenieListConversationsResponseSchema: z.ZodType<GenieListConversationsResponse> =
  z
    .object({
      conversations: z
        .array(z.lazy(() => unmarshalGenieConversationSummarySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      conversations: d.conversations,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalGenieListEvalResultsResponseSchema: z.ZodType<GenieListEvalResultsResponse> =
  z
    .object({
      eval_results: z
        .array(z.lazy(() => unmarshalGenieEvalResultSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      evalResults: d.eval_results,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalGenieListEvalRunsResponseSchema: z.ZodType<GenieListEvalRunsResponse> =
  z
    .object({
      eval_runs: z
        .array(z.lazy(() => unmarshalGenieEvalRunResponseSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      evalRuns: d.eval_runs,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalGenieListMessageCommentsResponseSchema: z.ZodType<GenieListMessageCommentsResponse> =
  z
    .object({
      comments: z
        .array(z.lazy(() => unmarshalGenieMessageCommentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      comments: d.comments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalGenieListSpacesResponseSchema: z.ZodType<GenieListSpacesResponse> =
  z
    .object({
      spaces: z.array(z.lazy(() => unmarshalGenieSpaceSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      spaces: d.spaces,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalGenieMessageSchema: z.ZodType<GenieMessage> = z
  .object({
    id: z.string().optional(),
    space_id: z.string().optional(),
    conversation_id: z.string().optional(),
    user_id: z.number().optional(),
    created_timestamp: z.number().optional(),
    last_updated_timestamp: z.number().optional(),
    status: z.enum(MessageStatus_MessageStatus).optional(),
    content: z.string().optional(),
    attachments: z
      .array(z.lazy(() => unmarshalGenieAttachmentSchema))
      .optional(),
    query_result: z.lazy(() => unmarshalResultSchema).optional(),
    error: z.lazy(() => unmarshalMessageErrorSchema).optional(),
    message_id: z.string().optional(),
    feedback: z.lazy(() => unmarshalGenieFeedbackSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    spaceId: d.space_id,
    conversationId: d.conversation_id,
    userId: d.user_id,
    createdTimestamp: d.created_timestamp,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    status: d.status,
    content: d.content,
    attachments: d.attachments,
    queryResult: d.query_result,
    error: d.error,
    messageId: d.message_id,
    feedback: d.feedback,
  }));

export const unmarshalGenieMessageCommentSchema: z.ZodType<GenieMessageComment> =
  z
    .object({
      space_id: z.string().optional(),
      conversation_id: z.string().optional(),
      message_id: z.string().optional(),
      message_comment_id: z.string().optional(),
      user_id: z.number().optional(),
      content: z.string().optional(),
      created_timestamp: z.number().optional(),
    })
    .transform(d => ({
      spaceId: d.space_id,
      conversationId: d.conversation_id,
      messageId: d.message_id,
      messageCommentId: d.message_comment_id,
      userId: d.user_id,
      content: d.content,
      createdTimestamp: d.created_timestamp,
    }));

export const unmarshalGenieQueryAttachmentSchema: z.ZodType<GenieQueryAttachment> =
  z
    .object({
      title: z.string().optional(),
      query: z.string().optional(),
      description: z.string().optional(),
      last_updated_timestamp: z.number().optional(),
      parameters: z
        .array(z.lazy(() => unmarshalQueryAttachmentParameterSchema))
        .optional(),
      id: z.string().optional(),
      statement_id: z.string().optional(),
      query_result_metadata: z
        .lazy(() => unmarshalGenieResultMetadataSchema)
        .optional(),
      thoughts: z.array(z.lazy(() => unmarshalThoughtSchema)).optional(),
    })
    .transform(d => ({
      title: d.title,
      query: d.query,
      description: d.description,
      lastUpdatedTimestamp: d.last_updated_timestamp,
      parameters: d.parameters,
      id: d.id,
      statementId: d.statement_id,
      queryResultMetadata: d.query_result_metadata,
      thoughts: d.thoughts,
    }));

export const unmarshalGenieResultMetadataSchema: z.ZodType<GenieResultMetadata> =
  z
    .object({
      row_count: z.number().optional(),
      is_truncated: z.boolean().optional(),
    })
    .transform(d => ({
      rowCount: d.row_count,
      isTruncated: d.is_truncated,
    }));

export const unmarshalGenieSpaceSchema: z.ZodType<GenieSpace> = z
  .object({
    space_id: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    warehouse_id: z.string().optional(),
    parent_path: z.string().optional(),
    serialized_space: z.string().optional(),
    etag: z.string().optional(),
  })
  .transform(d => ({
    spaceId: d.space_id,
    title: d.title,
    description: d.description,
    warehouseId: d.warehouse_id,
    parentPath: d.parent_path,
    serializedSpace: d.serialized_space,
    etag: d.etag,
  }));

export const unmarshalGenieStartConversationResponseSchema: z.ZodType<GenieStartConversationResponse> =
  z
    .object({
      message_id: z.string().optional(),
      message: z.lazy(() => unmarshalGenieMessageSchema).optional(),
      conversation_id: z.string().optional(),
      conversation: z.lazy(() => unmarshalGenieConversationSchema).optional(),
    })
    .transform(d => ({
      messageId: d.message_id,
      message: d.message,
      conversationId: d.conversation_id,
      conversation: d.conversation,
    }));

export const unmarshalGenieSuggestedQuestionsAttachmentSchema: z.ZodType<GenieSuggestedQuestionsAttachment> =
  z
    .object({
      questions: z.array(z.string()).optional(),
    })
    .transform(d => ({
      questions: d.questions,
    }));

export const unmarshalListValueSchema: z.ZodType<ListValue> = z
  .object({
    values: z.array(z.lazy(() => unmarshalValueSchema)).optional(),
  })
  .transform(d => ({
    values: d.values,
  }));

export const unmarshalMapStringValueEntrySchema: z.ZodType<MapStringValueEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.lazy(() => unmarshalValueSchema).optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalMessageErrorSchema: z.ZodType<MessageError> = z
  .object({
    error: z.string().optional(),
    type: z.enum(MessageError_Type).optional(),
  })
  .transform(d => ({
    error: d.error,
    type: d.type,
  }));

export const unmarshalPolicyFunctionArgumentSchema: z.ZodType<PolicyFunctionArgument> =
  z
    .object({
      column: z.string().optional(),
      constant: z.string().optional(),
    })
    .transform(d => ({
      arg:
        d.column !== undefined
          ? {$case: 'column' as const, column: d.column}
          : d.constant !== undefined
            ? {$case: 'constant' as const, constant: d.constant}
            : undefined,
    }));

export const unmarshalQueryAttachmentParameterSchema: z.ZodType<QueryAttachmentParameter> =
  z
    .object({
      keyword: z.string().optional(),
      value: z.string().optional(),
      sql_type: z.string().optional(),
    })
    .transform(d => ({
      keyword: d.keyword,
      value: d.value,
      sqlType: d.sql_type,
    }));

export const unmarshalResultSchema: z.ZodType<Result> = z
  .object({
    statement_id: z.string().optional(),
    row_count: z.number().optional(),
    is_truncated: z.boolean().optional(),
    statement_id_signature: z.string().optional(),
  })
  .transform(d => ({
    statementId: d.statement_id,
    rowCount: d.row_count,
    isTruncated: d.is_truncated,
    statementIdSignature: d.statement_id_signature,
  }));

export const unmarshalResultDataSchema: z.ZodType<ResultData> = z
  .object({
    external_links: z
      .array(z.lazy(() => unmarshalExternalLinkSchema))
      .optional(),
    data_array: z.array(z.lazy(() => unmarshalListValueSchema)).optional(),
    chunk_index: z.number().optional(),
    row_offset: z.number().optional(),
    row_count: z.number().optional(),
    byte_count: z.number().optional(),
    next_chunk_index: z.number().optional(),
    next_chunk_internal_link: z.string().optional(),
  })
  .transform(d => ({
    externalLinks: d.external_links,
    dataArray: d.data_array,
    chunkIndex: d.chunk_index,
    rowOffset: d.row_offset,
    rowCount: d.row_count,
    byteCount: d.byte_count,
    nextChunkIndex: d.next_chunk_index,
    nextChunkInternalLink: d.next_chunk_internal_link,
  }));

export const unmarshalResultManifestSchema: z.ZodType<ResultManifest> = z
  .object({
    format: z.enum(Format).optional(),
    schema: z.lazy(() => unmarshalSchemaSchema).optional(),
    total_chunk_count: z.number().optional(),
    chunks: z.array(z.lazy(() => unmarshalChunkInfoSchema)).optional(),
    total_row_count: z.number().optional(),
    total_byte_count: z.number().optional(),
    truncated: z.boolean().optional(),
  })
  .transform(d => ({
    format: d.format,
    schema: d.schema,
    totalChunkCount: d.total_chunk_count,
    chunks: d.chunks,
    totalRowCount: d.total_row_count,
    totalByteCount: d.total_byte_count,
    truncated: d.truncated,
  }));

export const unmarshalSchemaSchema: z.ZodType<Schema> = z
  .object({
    column_count: z.number().optional(),
    columns: z.array(z.lazy(() => unmarshalColumnInfoSchema)).optional(),
  })
  .transform(d => ({
    columnCount: d.column_count,
    columns: d.columns,
  }));

export const unmarshalStatementResponseSchema: z.ZodType<StatementResponse> = z
  .object({
    statement_id: z.string().optional(),
    status: z.lazy(() => unmarshalStatementStatusSchema).optional(),
    manifest: z.lazy(() => unmarshalResultManifestSchema).optional(),
    result: z.lazy(() => unmarshalResultDataSchema).optional(),
  })
  .transform(d => ({
    statementId: d.statement_id,
    status: d.status,
    manifest: d.manifest,
    result: d.result,
  }));

export const unmarshalStatementStatusSchema: z.ZodType<StatementStatus> = z
  .object({
    state: z.enum(StatementStatus_State).optional(),
    error: z
      .lazy(() => unmarshalDatabricksServiceExceptionProtoSchema)
      .optional(),
    sql_state: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
    error: d.error,
    sqlState: d.sql_state,
  }));

export const unmarshalStructSchema: z.ZodType<Struct> = z
  .object({
    fields: z
      .array(z.lazy(() => unmarshalMapStringValueEntrySchema))
      .optional(),
  })
  .transform(d => ({
    fields: d.fields,
  }));

export const unmarshalTextAttachmentSchema: z.ZodType<TextAttachment> = z
  .object({
    content: z.string().optional(),
    id: z.string().optional(),
    phase: z.enum(ResponsePhase).optional(),
    verification_metadata: z
      .lazy(() => unmarshalVerificationMetadataSchema)
      .optional(),
    purpose: z.enum(TextAttachmentPurpose).optional(),
  })
  .transform(d => ({
    content: d.content,
    id: d.id,
    phase: d.phase,
    verificationMetadata: d.verification_metadata,
    purpose: d.purpose,
  }));

export const unmarshalThoughtSchema: z.ZodType<Thought> = z
  .object({
    thought_type: z.enum(ThoughtType).optional(),
    content: z.string().optional(),
  })
  .transform(d => ({
    thoughtType: d.thought_type,
    content: d.content,
  }));

export const unmarshalValueSchema: z.ZodType<Value> = z
  .object({
    null_value: z.enum(NullValue).optional(),
    number_value: z.number().optional(),
    string_value: z.string().optional(),
    bool_value: z.boolean().optional(),
    struct_value: z.lazy(() => unmarshalStructSchema).optional(),
    list_value: z.lazy(() => unmarshalListValueSchema).optional(),
  })
  .transform(d => ({
    kind:
      d.null_value !== undefined
        ? {$case: 'nullValue' as const, nullValue: d.null_value}
        : d.number_value !== undefined
          ? {$case: 'numberValue' as const, numberValue: d.number_value}
          : d.string_value !== undefined
            ? {$case: 'stringValue' as const, stringValue: d.string_value}
            : d.bool_value !== undefined
              ? {$case: 'boolValue' as const, boolValue: d.bool_value}
              : d.struct_value !== undefined
                ? {$case: 'structValue' as const, structValue: d.struct_value}
                : d.list_value !== undefined
                  ? {$case: 'listValue' as const, listValue: d.list_value}
                  : undefined,
  }));

export const unmarshalVerificationMetadataSchema: z.ZodType<VerificationMetadata> =
  z
    .object({
      section: z.enum(VerificationSection).optional(),
      index: z.number().optional(),
    })
    .transform(d => ({
      section: d.section,
      index: d.index,
    }));

export const marshalGenieCreateConversationMessageRequestSchema: z.ZodType = z
  .object({
    spaceId: z.string().optional(),
    conversationId: z.string().optional(),
    content: z.string().optional(),
  })
  .transform(d => ({
    space_id: d.spaceId,
    conversation_id: d.conversationId,
    content: d.content,
  }));

export const marshalGenieCreateEvalRunRequestSchema: z.ZodType = z
  .object({
    spaceId: z.string().optional(),
    benchmarkQuestionIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    space_id: d.spaceId,
    benchmark_question_ids: d.benchmarkQuestionIds,
  }));

export const marshalGenieCreateMessageCommentRequestSchema: z.ZodType = z
  .object({
    spaceId: z.string().optional(),
    conversationId: z.string().optional(),
    messageId: z.string().optional(),
    content: z.string().optional(),
  })
  .transform(d => ({
    space_id: d.spaceId,
    conversation_id: d.conversationId,
    message_id: d.messageId,
    content: d.content,
  }));

export const marshalGenieCreateSpaceRequestSchema: z.ZodType = z
  .object({
    warehouseId: z.string().optional(),
    parentPath: z.string().optional(),
    serializedSpace: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    warehouse_id: d.warehouseId,
    parent_path: d.parentPath,
    serialized_space: d.serializedSpace,
    title: d.title,
    description: d.description,
  }));

export const marshalGenieExecuteMessageAttachmentQueryRequestSchema: z.ZodType =
  z
    .object({
      messageId: z.string().optional(),
      spaceId: z.string().optional(),
      conversationId: z.string().optional(),
      attachmentId: z.string().optional(),
    })
    .transform(d => ({
      message_id: d.messageId,
      space_id: d.spaceId,
      conversation_id: d.conversationId,
      attachment_id: d.attachmentId,
    }));

export const marshalGenieExecuteMessageQueryRequestSchema: z.ZodType = z
  .object({
    messageId: z.string().optional(),
    spaceId: z.string().optional(),
    conversationId: z.string().optional(),
  })
  .transform(d => ({
    message_id: d.messageId,
    space_id: d.spaceId,
    conversation_id: d.conversationId,
  }));

export const marshalGenieGenerateDownloadFullQueryResultRequestSchema: z.ZodType =
  z
    .object({
      spaceId: z.string().optional(),
      conversationId: z.string().optional(),
      messageId: z.string().optional(),
      attachmentId: z.string().optional(),
    })
    .transform(d => ({
      space_id: d.spaceId,
      conversation_id: d.conversationId,
      message_id: d.messageId,
      attachment_id: d.attachmentId,
    }));

export const marshalGenieSendMessageFeedbackRequestSchema: z.ZodType = z
  .object({
    spaceId: z.string().optional(),
    conversationId: z.string().optional(),
    messageId: z.string().optional(),
    rating: z.enum(GenieFeedbackRating).optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    space_id: d.spaceId,
    conversation_id: d.conversationId,
    message_id: d.messageId,
    rating: d.rating,
    comment: d.comment,
  }));

export const marshalGenieStartConversationMessageRequestSchema: z.ZodType = z
  .object({
    spaceId: z.string().optional(),
    content: z.string().optional(),
  })
  .transform(d => ({
    space_id: d.spaceId,
    content: d.content,
  }));

export const marshalGenieUpdateSpaceRequestSchema: z.ZodType = z
  .object({
    spaceId: z.string().optional(),
    serializedSpace: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    warehouseId: z.string().optional(),
    etag: z.string().optional(),
    parentPath: z.string().optional(),
  })
  .transform(d => ({
    space_id: d.spaceId,
    serialized_space: d.serializedSpace,
    title: d.title,
    description: d.description,
    warehouse_id: d.warehouseId,
    etag: d.etag,
    parent_path: d.parentPath,
  }));
