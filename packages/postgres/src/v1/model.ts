// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** The replication state of a single replicated table (CdfStatus). */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CdfState = {
  /** Default value. Returned when the replication state is unknown or not set. */
  CDF_STATE_UNSPECIFIED: 'CDF_STATE_UNSPECIFIED',
  /**
   * Taking the initial snapshot: the table's existing rows are being written
   * to the Delta table.
   */
  CDF_STATE_SNAPSHOTTING: 'CDF_STATE_SNAPSHOTTING',
  /** Continuously streaming WAL changes to the Delta table. */
  CDF_STATE_STREAMING: 'CDF_STATE_STREAMING',
  /**
   * Reserved: replication for this table was superseded by a newer one.
   * Not currently returned by the API.
   */
  CDF_STATE_TERMINATED: 'CDF_STATE_TERMINATED',
  /**
   * The table is not being replicated: it was skipped because it is not
   * eligible for replication, or replication errored. See status_detail for
   * the specific reason.
   */
  CDF_STATE_SKIPPED: 'CDF_STATE_SKIPPED',
} as const;
export type CdfState = (typeof CdfState)[keyof typeof CdfState] | (string & {});

/** The day of the week on which a weekly snapshot is taken. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DayOfWeek = {
  /**
   * Default value; a WeeklySchedule with this value is rejected with
   * INVALID_PARAMETER_VALUE.
   */
  DAY_OF_WEEK_UNSPECIFIED: 'DAY_OF_WEEK_UNSPECIFIED',
  /** Monday. */
  MONDAY: 'MONDAY',
  /** Tuesday. */
  TUESDAY: 'TUESDAY',
  /** Wednesday. */
  WEDNESDAY: 'WEDNESDAY',
  /** Thursday. */
  THURSDAY: 'THURSDAY',
  /** Friday. */
  FRIDAY: 'FRIDAY',
  /** Saturday. */
  SATURDAY: 'SATURDAY',
  /** Sunday. */
  SUNDAY: 'SUNDAY',
} as const;
export type DayOfWeek =
  | (typeof DayOfWeek)[keyof typeof DayOfWeek]
  | (string & {});

/** The compute endpoint type. Either `read_write` or `read_only`. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointType = {
  /** Default value, not used */
  ENDPOINT_TYPE_UNSPECIFIED: 'ENDPOINT_TYPE_UNSPECIFIED',
  ENDPOINT_TYPE_READ_WRITE: 'ENDPOINT_TYPE_READ_WRITE',
  ENDPOINT_TYPE_READ_ONLY: 'ENDPOINT_TYPE_READ_ONLY',
} as const;
export type EndpointType =
  | (typeof EndpointType)[keyof typeof EndpointType]
  | (string & {});

/** Error codes returned by Databricks APIs to indicate specific failure conditions. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ErrorCode = {
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
  UNKNOWN: 'UNKNOWN',
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
  INTERNAL_ERROR: 'INTERNAL_ERROR',
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
  TEMPORARILY_UNAVAILABLE: 'TEMPORARILY_UNAVAILABLE',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * Indicates that an IOException has been internally thrown.
   */
  IO_ERROR: 'IO_ERROR',
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
  BAD_REQUEST: 'BAD_REQUEST',
  /**
   * An external service is unavailable temporarily as it is being updated/re-deployed. Indicates
   * gateway proxy to safely retry the request.
   */
  SERVICE_UNDER_MAINTENANCE: 'SERVICE_UNDER_MAINTENANCE',
  /** A workspace is temporarily unavailable as the workspace is being re-assigned. */
  WORKSPACE_TEMPORARILY_UNAVAILABLE: 'WORKSPACE_TEMPORARILY_UNAVAILABLE',
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
  DEADLINE_EXCEEDED: 'DEADLINE_EXCEEDED',
  /**
   * The operation was canceled by the caller. An example - client closed the connection without
   * waiting for a response.
   *
   * Maps to:
   * - google.rpc.Code: CANCELLED = 1;
   * - HTTP code: 499 Client Closed Request
   */
  CANCELLED: 'CANCELLED',
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
  RESOURCE_EXHAUSTED: 'RESOURCE_EXHAUSTED',
  /**
   * The operation was aborted, typically due to a concurrency issue such as a sequencer
   * check failure, transaction abort, or transaction conflict.
   *
   * Maps to:
   * - google.rpc.Code: ABORTED = 10;
   * - HTTP code: 409 Conflict
   */
  ABORTED: 'ABORTED',
  /**
   * Operation was performed on a resource that does not exist,
   * e.g. file or directory was not found.
   *
   * Maps to:
   * - google.rpc.Code: NOT_FOUND = 5;
   * - HTTP code: 404 Not Found
   */
  NOT_FOUND: 'NOT_FOUND',
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
  ALREADY_EXISTS: 'ALREADY_EXISTS',
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
  UNAUTHENTICATED: 'UNAUTHENTICATED',
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
  UNAVAILABLE: 'UNAVAILABLE',
  /**
   * Supplied value for a parameter was invalid (e.g., giving a number for a string parameter).
   *
   * Maps to:
   * - google.rpc.Code: INVALID_ARGUMENT = 3;
   * - HTTP code: 400 Bad Request
   */
  INVALID_PARAMETER_VALUE: 'INVALID_PARAMETER_VALUE',
  /**
   * Indicates that the given API endpoint does not exist. Legacy, when possible - NOT_IMPLEMENTED
   * should be used instead to indicate that API doesn't exist.
   *
   * Maps to:
   * - google.rpc.Code: NOT_FOUND = 5;
   * - HTTP code: 404 Not Found
   */
  ENDPOINT_NOT_FOUND: 'ENDPOINT_NOT_FOUND',
  /** Indicates that the given API request was malformed. */
  MALFORMED_REQUEST: 'MALFORMED_REQUEST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * If one or more of the inputs to a given RPC are not in a valid state for the action.
   */
  INVALID_STATE: 'INVALID_STATE',
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
  PERMISSION_DENIED: 'PERMISSION_DENIED',
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
  FEATURE_DISABLED: 'FEATURE_DISABLED',
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
  CUSTOMER_UNAUTHORIZED: 'CUSTOMER_UNAUTHORIZED',
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
  REQUEST_LIMIT_EXCEEDED: 'REQUEST_LIMIT_EXCEEDED',
  /** Indicates API request was rejected due a conflict with an existing resource. */
  RESOURCE_CONFLICT: 'RESOURCE_CONFLICT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * Indicates that the HTTP response cannot be correctly deserialized.
   * This currently is only used in DUST test clients, and not by any real service code.
   */
  UNPARSEABLE_HTTP_ERROR: 'UNPARSEABLE_HTTP_ERROR',
  /**
   * The operation is not implemented or is not supported/enabled in this service.
   *
   * Maps to:
   * - google.rpc.Code: UNIMPLEMENTED = 12;
   * - HTTP code: 501 Not Implemented
   */
  NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
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
  DATA_LOSS: 'DATA_LOSS',
  /** If the user attempts to perform an invalid state transition on a shard. */
  INVALID_STATE_TRANSITION: 'INVALID_STATE_TRANSITION',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * Unable to perform the operation because the shard was locked by some other operation.
   */
  COULD_NOT_ACQUIRE_LOCK: 'COULD_NOT_ACQUIRE_LOCK',
  /**
   * NOTE: Deprecated, prefer using ALREADY_EXISTS.
   * Unlike ALREADY_EXISTS - this maps to HTTP code 400 Bad Request due to legacy reasons,
   * remapping will be a backwards incompatible change.
   *
   * Operation was performed on a resource that already exists.
   */
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated, prefer using NOT_FOUND - see the note for the RESOURCE_ALREADY_EXISTS,
   * because this pair of codes is related and RESOURCE_ALREADY_EXISTS has bad mapping to the HTTP
   * codes we added new error codes NOT_FOUND and ALREADY_EXISTS, and recommend to use them instead.
   *
   * Operation was performed on a resource that does not exist.
   */
  RESOURCE_DOES_NOT_EXIST: 'RESOURCE_DOES_NOT_EXIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MAX_BLOCK_SIZE_EXCEEDED: 'MAX_BLOCK_SIZE_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MAX_READ_SIZE_EXCEEDED: 'MAX_READ_SIZE_EXCEEDED',
  PARTIAL_DELETE: 'PARTIAL_DELETE',
  MAX_LIST_SIZE_EXCEEDED: 'MAX_LIST_SIZE_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DRY_RUN_FAILED: 'DRY_RUN_FAILED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   * Cluster request was rejected because it would exceed a resource limit.
   */
  RESOURCE_LIMIT_EXCEEDED: 'RESOURCE_LIMIT_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DIRECTORY_NOT_EMPTY: 'DIRECTORY_NOT_EMPTY',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DIRECTORY_PROTECTED: 'DIRECTORY_PROTECTED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MAX_NOTEBOOK_SIZE_EXCEEDED: 'MAX_NOTEBOOK_SIZE_EXCEEDED',
  MAX_CHILD_NODE_SIZE_EXCEEDED: 'MAX_CHILD_NODE_SIZE_EXCEEDED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SEARCH_QUERY_TOO_LONG: 'SEARCH_QUERY_TOO_LONG',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SEARCH_QUERY_TOO_SHORT: 'SEARCH_QUERY_TOO_SHORT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MANAGED_RESOURCE_GROUP_DOES_NOT_EXIST:
    'MANAGED_RESOURCE_GROUP_DOES_NOT_EXIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  PERMISSION_NOT_PROPAGATED: 'PERMISSION_NOT_PROPAGATED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DEPLOYMENT_TIMEOUT: 'DEPLOYMENT_TIMEOUT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_CONFLICT: 'GIT_CONFLICT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_UNKNOWN_REF: 'GIT_UNKNOWN_REF',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_SENSITIVE_TOKEN_DETECTED: 'GIT_SENSITIVE_TOKEN_DETECTED',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_URL_NOT_ON_ALLOW_LIST: 'GIT_URL_NOT_ON_ALLOW_LIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  GIT_REMOTE_ERROR: 'GIT_REMOTE_ERROR',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  PROJECTS_OPERATION_TIMEOUT: 'PROJECTS_OPERATION_TIMEOUT',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  IPYNB_FILE_IN_REPO: 'IPYNB_FILE_IN_REPO',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  INSECURE_PARTNER_RESPONSE: 'INSECURE_PARTNER_RESPONSE',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  MALFORMED_PARTNER_RESPONSE: 'MALFORMED_PARTNER_RESPONSE',
  METASTORE_DOES_NOT_EXIST: 'METASTORE_DOES_NOT_EXIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DAC_DOES_NOT_EXIST: 'DAC_DOES_NOT_EXIST',
  CATALOG_DOES_NOT_EXIST: 'CATALOG_DOES_NOT_EXIST',
  SCHEMA_DOES_NOT_EXIST: 'SCHEMA_DOES_NOT_EXIST',
  TABLE_DOES_NOT_EXIST: 'TABLE_DOES_NOT_EXIST',
  SHARE_DOES_NOT_EXIST: 'SHARE_DOES_NOT_EXIST',
  RECIPIENT_DOES_NOT_EXIST: 'RECIPIENT_DOES_NOT_EXIST',
  STORAGE_CREDENTIAL_DOES_NOT_EXIST: 'STORAGE_CREDENTIAL_DOES_NOT_EXIST',
  EXTERNAL_LOCATION_DOES_NOT_EXIST: 'EXTERNAL_LOCATION_DOES_NOT_EXIST',
  PRINCIPAL_DOES_NOT_EXIST: 'PRINCIPAL_DOES_NOT_EXIST',
  PROVIDER_DOES_NOT_EXIST: 'PROVIDER_DOES_NOT_EXIST',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  METASTORE_ALREADY_EXISTS: 'METASTORE_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  DAC_ALREADY_EXISTS: 'DAC_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  CATALOG_ALREADY_EXISTS: 'CATALOG_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SCHEMA_ALREADY_EXISTS: 'SCHEMA_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  TABLE_ALREADY_EXISTS: 'TABLE_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SHARE_ALREADY_EXISTS: 'SHARE_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  RECIPIENT_ALREADY_EXISTS: 'RECIPIENT_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  STORAGE_CREDENTIAL_ALREADY_EXISTS: 'STORAGE_CREDENTIAL_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  EXTERNAL_LOCATION_ALREADY_EXISTS: 'EXTERNAL_LOCATION_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  PROVIDER_ALREADY_EXISTS: 'PROVIDER_ALREADY_EXISTS',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  CATALOG_NOT_EMPTY: 'CATALOG_NOT_EMPTY',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  SCHEMA_NOT_EMPTY: 'SCHEMA_NOT_EMPTY',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  METASTORE_NOT_EMPTY: 'METASTORE_NOT_EMPTY',
  /**
   * NOTE: Deprecated and kept to maintain backwards compatibility for public APIs that use it,
   * avoid using it in the new APIs, refer error codes listed in the http://go/error-codes.
   */
  PROVIDER_SHARE_NOT_ACCESSIBLE: 'PROVIDER_SHARE_NOT_ACCESSIBLE',
} as const;
export type ErrorCode =
  | (typeof ErrorCode)[keyof typeof ErrorCode]
  | (string & {});

/**
 * Controls how the Data API exposes the OpenAPI documentation endpoint.
 * Only IGNORE_PRIVILEGES and DISABLED are supported today; "follow-privileges"
 * is not implemented yet (it may be added later as value 3 — adding new enum
 * values is backward-compatible).
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const OpenApiMode = {
  /** Unspecified; the server applies its default mode. */
  OPEN_API_MODE_UNSPECIFIED: 'OPEN_API_MODE_UNSPECIFIED',
  /** Generate OpenAPI output ignoring the privileges of the requesting role. */
  OPEN_API_MODE_IGNORE_PRIVILEGES: 'OPEN_API_MODE_IGNORE_PRIVILEGES',
  /** Disable the OpenAPI documentation endpoint entirely. */
  OPEN_API_MODE_DISABLED: 'OPEN_API_MODE_DISABLED',
} as const;
export type OpenApiMode =
  | (typeof OpenApiMode)[keyof typeof OpenApiMode]
  | (string & {});

/** The current phase of the data synchronization pipeline. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ProvisioningPhase = {
  /** The default phase. It should not be reported by any synced tables. */
  PROVISIONING_PHASE_UNSPECIFIED: 'PROVISIONING_PHASE_UNSPECIFIED',
  /** Ingestion phase of the synced table. This is when the synced table is ingesting data from the delta table. */
  PROVISIONING_PHASE_MAIN: 'PROVISIONING_PHASE_MAIN',
  /** Index scan phase of the synced table. This is when the synced table is creating indexes on the ingested data. */
  PROVISIONING_PHASE_INDEX_SCAN: 'PROVISIONING_PHASE_INDEX_SCAN',
  /** Index sort phase of the synced table. This is when the synced table is creating indexes on the ingested data. */
  PROVISIONING_PHASE_INDEX_SORT: 'PROVISIONING_PHASE_INDEX_SORT',
} as const;
export type ProvisioningPhase =
  | (typeof ProvisioningPhase)[keyof typeof ProvisioningPhase]
  | (string & {});

/** The state of a synced table. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SyncedTableState = {
  /** The default state. It should not be reported by any synced tables. */
  SYNCED_TABLE_STATE_UNSPECIFIED: 'SYNCED_TABLE_STATE_UNSPECIFIED',
  /**
   * The synced table has just been created and resources are being provisioned. This is also the
   * catch-all state if there is not a more suitable state to report for the synced table.
   */
  SYNCED_TABLE_PROVISIONING: 'SYNCED_TABLE_PROVISIONING',
  /** The synced table is provisioning resources for the data synchronization pipeline. */
  SYNCED_TABLE_PROVISIONING_PIPELINE_RESOURCES:
    'SYNCED_TABLE_PROVISIONING_PIPELINE_RESOURCES',
  /** The synced table is executing the initial data synchronization. */
  SYNCED_TABLE_PROVISIONING_INITIAL_SNAPSHOT:
    'SYNCED_TABLE_PROVISIONING_INITIAL_SNAPSHOT',
  /** The synced table is ready to serve data. */
  SYNCED_TABLE_ONLINE: 'SYNCED_TABLE_ONLINE',
  /**
   * The synced table is ready to serve data and is continuously updating. Only shown for synced
   * tables using the "Continuous" sync mode.
   */
  SYNCED_TABLE_ONLINE_CONTINUOUS_UPDATE:
    'SYNCED_TABLE_ONLINE_CONTINUOUS_UPDATE',
  /**
   * The synced table is ready to serve data and an active update is in progress. Only shown for
   * synced tables using the "Triggered" sync mode.
   */
  SYNCED_TABLE_ONLINE_TRIGGERED_UPDATE: 'SYNCED_TABLE_ONLINE_TRIGGERED_UPDATE',
  /**
   * The synced table is ready to serve data and there are no active updates. Only shown for synced
   * tables using the "Triggered" sync mode.
   */
  SYNCED_TABLE_ONLINE_NO_PENDING_UPDATE:
    'SYNCED_TABLE_ONLINE_NO_PENDING_UPDATE',
  /** The synced table has encountered an internal error and is not available for serving. */
  SYNCED_TABLE_OFFLINE: 'SYNCED_TABLE_OFFLINE',
  /**
   * The synced table is not available for serving because the data synchronization pipeline has
   * failed. Please review the pipeline event logs to troubleshoot.
   */
  SYNCED_TABLE_OFFLINE_FAILED: 'SYNCED_TABLE_OFFLINE_FAILED',
  /**
   * The data synchronization pipeline has encountered an error but the synced table is still
   * available for serving (potentially stale) data. Please review the pipeline event logs to
   * troubleshoot.
   */
  SYNCED_TABLE_ONLINE_PIPELINE_FAILED: 'SYNCED_TABLE_ONLINE_PIPELINE_FAILED',
  /**
   * The synced table is available for serving, and is provisioning resources for a newly started
   * data synchronization pipeline.
   */
  SYNCED_TABLE_ONLINE_UPDATING_PIPELINE_RESOURCES:
    'SYNCED_TABLE_ONLINE_UPDATING_PIPELINE_RESOURCES',
} as const;
export type SyncedTableState =
  | (typeof SyncedTableState)[keyof typeof SyncedTableState]
  | (string & {});

/** The state of the branch. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const BranchStatus_State = {
  /** Default value, not used. */
  STATE_UNSPECIFIED: 'STATE_UNSPECIFIED',
  /** The branch is being created but is not yet available for querying. */
  INIT: 'INIT',
  /** The branch is being imported and is not yet available for querying. */
  IMPORTING: 'IMPORTING',
  /** The branch is being reset to a specific point in time or LSN and is not yet available for querying. */
  RESETTING: 'RESETTING',
  /** The branch is fully operational and ready for querying. */
  READY: 'READY',
  /** The branch is stored in cost-effective archival storage. Expect slow query response times. */
  ARCHIVED: 'ARCHIVED',
  /** The branch is deleted and is not available for querying, but can be undeleted. */
  DELETED: 'DELETED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type BranchStatus_State =
  | (typeof BranchStatus_State)[keyof typeof BranchStatus_State]
  | (string & {});

/** The state of the compute endpoint. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointStatus_State = {
  /** Default value, not used */
  STATE_UNSPECIFIED: 'STATE_UNSPECIFIED',
  INIT: 'INIT',
  ACTIVE: 'ACTIVE',
  IDLE: 'IDLE',
  DEGRADED: 'DEGRADED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EndpointStatus_State =
  | (typeof EndpointStatus_State)[keyof typeof EndpointStatus_State]
  | (string & {});

/**
 * Release channel of the underlying pipeline's runtime.
 * PREVIEW provides early access to the latest features but may be less stable.
 * Some source table configurations (e.g., read-time CDF) require PREVIEW.
 * Defaults to CURRENT if not specified.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const NewPipelineSpec_PipelineChannel = {
  /** Default value; the pipeline channel is not specified and defaults to CURRENT. */
  PIPELINE_CHANNEL_UNSPECIFIED: 'PIPELINE_CHANNEL_UNSPECIFIED',
  /** Uses the stable, generally available runtime. */
  CURRENT: 'CURRENT',
  /** Uses the latest preview runtime. Required for Auto CDF (read-time CDF) sources. */
  PREVIEW: 'PREVIEW',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type NewPipelineSpec_PipelineChannel =
  | (typeof NewPipelineSpec_PipelineChannel)[keyof typeof NewPipelineSpec_PipelineChannel]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ProvisioningInfo_State = {
  STATE_UNSPECIFIED: 'STATE_UNSPECIFIED',
  PROVISIONING: 'PROVISIONING',
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  DELETING: 'DELETING',
  UPDATING: 'UPDATING',
  DEGRADED: 'DEGRADED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ProvisioningInfo_State =
  | (typeof ProvisioningInfo_State)[keyof typeof ProvisioningInfo_State]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RequestedClaims_PermissionSet = {
  PERMISSION_SET_UNSPECIFIED: 'PERMISSION_SET_UNSPECIFIED',
  READ_ONLY: 'READ_ONLY',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type RequestedClaims_PermissionSet =
  | (typeof RequestedClaims_PermissionSet)[keyof typeof RequestedClaims_PermissionSet]
  | (string & {});

/** How the role is authenticated when connecting to Postgres. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Role_AuthMethod = {
  AUTH_METHOD_UNSPECIFIED: 'AUTH_METHOD_UNSPECIFIED',
  /** NO_LOGIN means this role cannot be used for interactive access */
  NO_LOGIN: 'NO_LOGIN',
  /** PG_PASSWORD_SCRAM_SHA_256 is a password-based authentication */
  PG_PASSWORD_SCRAM_SHA_256: 'PG_PASSWORD_SCRAM_SHA_256',
  /**
   * LAKEBASE_OAUTH_V1 is for logging in with the managed identities like
   * the <Databricks> service principal, <Databricks> Group or <Databricks> user.
   */
  LAKEBASE_OAUTH_V1: 'LAKEBASE_OAUTH_V1',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type Role_AuthMethod =
  | (typeof Role_AuthMethod)[keyof typeof Role_AuthMethod]
  | (string & {});

/**
 * The type of the <Databricks> managed identity that this Role represents.
 * Leave empty if you wish to create a regular Postgres role not associated with a <Databricks> identity.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Role_IdentityType = {
  /** Default value, not used */
  IDENTITY_TYPE_UNSPECIFIED: 'IDENTITY_TYPE_UNSPECIFIED',
  /** A user in a <Databricks> workspace. */
  USER: 'USER',
  /** A service principal in a <Databricks> workspace. */
  SERVICE_PRINCIPAL: 'SERVICE_PRINCIPAL',
  /** A group in a <Databricks> workspace. */
  GROUP: 'GROUP',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type Role_IdentityType =
  | (typeof Role_IdentityType)[keyof typeof Role_IdentityType]
  | (string & {});

/** Roles that the DatabaseInstanceRole can be a member of. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Role_MembershipRole = {
  /** Indicates that the DatabaseInstanceRole is not a member of any standard, managed roles. */
  MEMBERSHIP_ROLE_UNSPECIFIED: 'MEMBERSHIP_ROLE_UNSPECIFIED',
  /** Indicates membership in DATABRICKS_SUPERUSER, the highest set of privileges exposed to customers. */
  DATABRICKS_SUPERUSER: 'DATABRICKS_SUPERUSER',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type Role_MembershipRole =
  | (typeof Role_MembershipRole)[keyof typeof Role_MembershipRole]
  | (string & {});

/** How the column's value is populated and kept up to date. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SyncedTable_SyncedTableSpec_ExtraColumn_Maintenance = {
  /** A plain column with no computed value. */
  MAINTENANCE_UNSPECIFIED: 'MAINTENANCE_UNSPECIFIED',
  /** The value is computed by PostgreSQL and stored. */
  STORED_GENERATED: 'STORED_GENERATED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SyncedTable_SyncedTableSpec_ExtraColumn_Maintenance =
  | (typeof SyncedTable_SyncedTableSpec_ExtraColumn_Maintenance)[keyof typeof SyncedTable_SyncedTableSpec_ExtraColumn_Maintenance]
  | (string & {});

/** PostgreSQL-specific target types that can override the default Delta-to-PG mapping. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SyncedTable_SyncedTableSpec_PgSpecificType = {
  /** Default value. Indicates that no type override was selected. */
  PG_SPECIFIC_TYPE_UNSPECIFIED: 'PG_SPECIFIC_TYPE_UNSPECIFIED',
  /** Maps the column to the pgvector vector type. */
  PG_SPECIFIC_TYPE_VECTOR: 'PG_SPECIFIC_TYPE_VECTOR',
  /** Maps the column to the pgvector half-precision halfvec type. */
  PG_SPECIFIC_TYPE_HALFVEC: 'PG_SPECIFIC_TYPE_HALFVEC',
  /** Maps the column to a length-bounded character varying(N) type. */
  PG_SPECIFIC_TYPE_VARCHAR: 'PG_SPECIFIC_TYPE_VARCHAR',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SyncedTable_SyncedTableSpec_PgSpecificType =
  | (typeof SyncedTable_SyncedTableSpec_PgSpecificType)[keyof typeof SyncedTable_SyncedTableSpec_PgSpecificType]
  | (string & {});

/** Scheduling policy of the synced table's underlying pipeline. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SyncedTable_SyncedTableSpec_SyncedTableSchedulingPolicy = {
  SYNCED_TABLE_SCHEDULING_POLICY_UNSPECIFIED:
    'SYNCED_TABLE_SCHEDULING_POLICY_UNSPECIFIED',
  /**
   * Pipeline runs continuously after generating the initial data.
   * Requires the source table to have Change Data Feed (CDF) enabled.
   */
  CONTINUOUS: 'CONTINUOUS',
  /**
   * Pipeline stops after generating the initial data and can be triggered later (manually, through a cron job or through data triggers).
   * Requires the source table to have Change Data Feed (CDF) enabled.
   */
  TRIGGERED: 'TRIGGERED',
  /**
   * Pipeline stops after generating the initial data and can be triggered later (manually, through a cron job or through data triggers).
   * Successive updates always perform a full copy of the source table data (no incremental updates).
   * Does not require the source table to have Change Data Feed (CDF) enabled.
   */
  SNAPSHOT: 'SNAPSHOT',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SyncedTable_SyncedTableSpec_SyncedTableSchedulingPolicy =
  | (typeof SyncedTable_SyncedTableSpec_SyncedTableSchedulingPolicy)[keyof typeof SyncedTable_SyncedTableSpec_SyncedTableSchedulingPolicy]
  | (string & {});

/** Databricks Error that is returned by all Databricks APIs. */
export interface ApiError {
  errorCode?: ErrorCode | undefined;
  message?: string | undefined;
  stackTrace?: string | undefined;
  details?: Record<string, unknown>[] | undefined;
}

export interface Branch {
  /**
   * Output only. The full resource path of the branch.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  name?: string | undefined;
  /** System-generated unique ID for the branch. */
  uid?: string | undefined;
  /**
   * The project containing this branch (API resource hierarchy).
   * Format: projects/{project_id}
   *
   * Note: This field indicates where the branch exists in the resource hierarchy.
   * For point-in-time branching from another branch, see `status.source_branch`.
   */
  parent?: string | undefined;
  /** A timestamp indicating when the branch was created. */
  createTime?: Temporal.Instant | undefined;
  /** A timestamp indicating when the branch was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The spec contains the branch configuration. */
  spec?: BranchSpec | undefined;
  /** The current status of a Branch. */
  status?: BranchStatus | undefined;
  /** The part of the name, chosen by the user when the resource was created. */
  branchId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface BranchOperationMetadata {}

export interface BranchSpec {
  /**
   * The name of the source branch from which this branch was created (data lineage for point-in-time recovery).
   * If not specified, defaults to the project's default branch.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  sourceBranch?: string | undefined;
  /** The Log Sequence Number (LSN) on the source branch from which this branch was created. */
  sourceBranchLsn?: string | undefined;
  /** The point in time on the source branch from which this branch was created. */
  sourceBranchTime?: Temporal.Instant | undefined;
  /** When set to true, protects the branch from deletion and reset. Associated compute endpoints and the project cannot be deleted while the branch is protected. */
  isProtected?: boolean | undefined;
  /**
   * Expiration configuration for the branch. One of expire_time, ttl, or no_expiry must be provided.
   * To disable expiration, set no_expiry to true.
   *
   * When updating this field, use "spec.expiration" in the update_mask.
   */
  expiration?:
    | {
        $case: 'expireTime';
        /**
         * Absolute expiration timestamp. When set, the branch will expire at this time.
         * Mutually exclusive with `ttl` and `no_expiry`. When updating, use `spec.expiration` in the update_mask.
         */
        expireTime: Temporal.Instant;
      }
    | {
        $case: 'ttl';
        /**
         * Relative time-to-live duration. When set, the branch will expire at creation_time + ttl.
         * Mutually exclusive with `expire_time` and `no_expiry`. When updating, use `spec.expiration` in the update_mask.
         */
        ttl: Temporal.Duration;
      }
    | {
        $case: 'noExpiry';
        /**
         * Explicitly disable expiration. When set to true, the branch will not expire.
         * If set to false, the request is invalid; provide either ttl or expire_time instead.
         * Mutually exclusive with `expire_time` and `ttl`. When updating, use `spec.expiration` in the update_mask.
         */
        noExpiry: boolean;
      }
    | undefined;
  /**
   * The snapshot this branch was created from. When set, the branch's data
   * comes from the snapshot rather than a source branch, so source_branch,
   * source_branch_lsn, and source_branch_time must be empty. The snapshot must
   * be AVAILABLE and belong to this branch's project.
   * Format: projects/{project_id}/snapshots/{snapshot_id}
   */
  sourceSnapshot?: string | undefined;
}

export interface BranchStatus {
  /**
   * The name of the source branch from which this branch was created.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  sourceBranch?: string | undefined;
  /** The Log Sequence Number (LSN) on the source branch from which this branch was created. */
  sourceBranchLsn?: string | undefined;
  /** The point in time on the source branch from which this branch was created. */
  sourceBranchTime?: Temporal.Instant | undefined;
  /** Whether the branch is the project's default branch. */
  default?: boolean | undefined;
  /** Whether the branch is protected. */
  isProtected?: boolean | undefined;
  /** The branch's state, indicating if it is initializing, ready for use, or archived. */
  currentState?: BranchStatus_State | undefined;
  /** The pending state of the branch, if a state transition is in progress. */
  pendingState?: BranchStatus_State | undefined;
  /** A timestamp indicating when the `current_state` began. */
  stateChangeTime?: Temporal.Instant | undefined;
  /** The logical size of the branch. */
  logicalSizeBytes?: bigint | undefined;
  /** Absolute expiration time for the branch. Empty if expiration is disabled. */
  expireTime?: Temporal.Instant | undefined;
  /** Part of the resource name. */
  branchId?: string | undefined;
  /**
   * A timestamp indicating when the branch was deleted.
   * Empty if the branch is not deleted.
   */
  deleteTime?: Temporal.Instant | undefined;
  /**
   * A timestamp indicating when the branch is scheduled to be purged.
   * Empty if the branch is not deleted, otherwise set to a timestamp in the future.
   */
  purgeTime?: Temporal.Instant | undefined;
  /**
   * The snapshot this branch was restored from. Set only for branches created by
   * restoring a snapshot; unset for all other branches.
   * Format: projects/{project_id}/snapshots/{snapshot_id}
   */
  sourceSnapshot?: string | undefined;
}

export interface Catalog {
  /**
   * Output only. The full resource path of the catalog.
   *
   * Format: "catalogs/{catalog_id}".
   */
  name?: string | undefined;
  /** System-generated unique identifier for the catalog. */
  uid?: string | undefined;
  /** The desired state of the Catalog. */
  spec?: Catalog_CatalogSpec | undefined;
  /** The observed state of the Catalog. */
  status?: Catalog_CatalogStatus | undefined;
  /** A timestamp indicating when the catalog was created. */
  createTime?: Temporal.Instant | undefined;
  /** A timestamp indicating when the catalog was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The part of the name, chosen by the user when the resource was created. */
  catalogId?: string | undefined;
}

/** The desired state of the Catalog. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Catalog_CatalogSpec {
  /**
   * The name of the Postgres database inside the specified Lakebase project and branch to be associated with the UC catalog.
   * This database must already exist, unless create_database_if_missing is set to true on creation.
   *
   * A database can only be registered with one UC catalog at a time.
   * To re-register a database with a different catalog, the existing catalog must be deleted first.
   *
   * A child branch inherits the fact of parent's registration. This means the same-named database
   * in a child branch cannot be registered with a second catalog
   * while the parent's registration exists. To allow registering the database of a child branch,
   * drop and recreate the database on the child branch.
   * This removes the fact of parent's registration from this branch only.
   *
   * Doing Point In Time Restore (PITR) prior to the moment before the Postgres DB was registered
   * in the Catalog drops the fact of registration of the database. So the user should avoid doing so.
   */
  postgresDatabase?: string | undefined;
  /**
   * If set to true, the specified postgres_database is created on behalf of the calling user
   * if it does not already exist. In this case, the calling user has a role created for
   * them in Postgres if they do not already have one.
   *
   * Defaults to false, meaning that the request fails if the specified postgres_database does not already exist.
   */
  createDatabaseIfMissing?: boolean | undefined;
  /**
   * The resource path of the branch associated with the catalog.
   *
   * Format: projects/{project_id}/branches/{branch_id}.
   */
  branch?: string | undefined;
}

/** The observed state of the Catalog. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Catalog_CatalogStatus {
  /** The name of the Postgres database associated with the catalog. */
  postgresDatabase?: string | undefined;
  /**
   * The resource path of the project associated with the catalog.
   *
   * Format: projects/{project_id}.
   */
  project?: string | undefined;
  /**
   * The resource path of the branch associated with the catalog.
   *
   * Format: projects/{project_id}/branches/{branch_id}.
   */
  branch?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CatalogOperationMetadata {}

/**
 * A Lakebase CDF configuration (CdfConfig): one per Postgres schema per
 * database, replicating that schema's tables into a Unity Catalog schema.
 * Immutable once created.
 */
export interface CdfConfig {
  /**
   * Output only. The full resource name of the CdfConfig.
   * Format: projects/{project}/branches/{branch}/databases/{database}/cdf-configs/{cdf_config}
   */
  name?: string | undefined;
  /**
   * The Unity Catalog catalog that replicated tables are written into.
   * Set at creation; the CdfConfig is immutable.
   */
  catalog?: string | undefined;
  /**
   * The Unity Catalog schema that replicated tables are written into.
   * Set at creation; the CdfConfig is immutable.
   */
  schema?: string | undefined;
  /** When the CdfConfig was created. */
  createTime?: Temporal.Instant | undefined;
  /**
   * The user-specified id; equals the final segment of `name`. Defaults to the
   * Postgres schema name for configs without an explicit id.
   */
  cdfConfigId?: string | undefined;
  /**
   * The Postgres schema this CdfConfig replicates from. Unique within the
   * parent database. Set at creation; the CdfConfig is immutable.
   */
  postgresSchema?: string | undefined;
}

/**
 * Metadata for CdfConfig long-running operations. Intentionally empty today;
 * fields (e.g. progress) may be added as the operation contract grows.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CdfConfigOperationMetadata {}

/**
 * The read-only replication status of a single Postgres table replicated
 * under a CdfConfig. One status exists per replicated table.
 * It is created automatically and cannot be modified.
 */
export interface CdfStatus {
  /**
   * Output only. The full resource name of the CdfStatus.
   * Format: projects/{project}/branches/{branch}/databases/{database}/cdf-configs/{cdf_config}/cdf-statuses/{cdf_status}
   * The {cdf_status} segment is the Postgres table name.
   */
  name?: string | undefined;
  /** The Postgres table being replicated. */
  postgresTable?: string | undefined;
  /** The Unity Catalog table receiving replicated data. */
  ucTable?: string | undefined;
  /** The current replication state of this table. */
  state?: CdfState | undefined;
  /** The high-watermark Log Sequence Number (LSN) committed to Delta Lake. */
  committedLsn?: string | undefined;
  /** The last time changes for this table were written to Delta Lake. */
  lastSyncTime?: Temporal.Instant | undefined;
  /** When replication for this table was first established. */
  createTime?: Temporal.Instant | undefined;
  /**
   * Human-readable detail for the current state (e.g. the skip/error reason).
   * Empty for healthy states.
   */
  statusDetail?: string | undefined;
}

export interface CreateBranchRequest {
  /**
   * The Project where this Branch will be created.
   * Format: projects/{project_id}
   */
  parent?: string | undefined;
  /**
   * The ID to use for the Branch. This becomes the final component of the branch's resource name.
   * The ID is required and must be 1-63 characters long, start with a lowercase letter, and contain only lowercase letters, numbers, and hyphens.
   * For example, `development` becomes `projects/my-app/branches/development`.
   */
  branchId?: string | undefined;
  /** The Branch to create. */
  branch?: Branch | undefined;
  /** If true, update the branch if it already exists instead of returning an error. */
  replaceExisting?: boolean | undefined;
}

export interface CreateCatalogRequest {
  /**
   * The ID in the Unity Catalog.
   * It becomes the full resource name, for example "my_catalog" becomes "catalogs/my_catalog".
   */
  catalogId?: string | undefined;
  catalog?: Catalog | undefined;
}

/** Request to create a Lakebase CDF configuration (CdfConfig). */
export interface CreateCdfConfigRequest {
  /**
   * The parent database under which to create the CdfConfig.
   * Format: projects/{project}/branches/{branch}/databases/{database}
   */
  parent?: string | undefined;
  /**
   * The CdfConfig to create. The catalog, schema, and postgres_schema fields are
   * required; all other fields are output only and ignored on input.
   */
  cdfConfig?: CdfConfig | undefined;
  /**
   * The user-specified id for the CdfConfig, forming the final segment of its
   * resource name. Must match the pattern `[a-z][a-z0-9_]{0,62}`. Defaults to
   * the Postgres schema name when omitted.
   */
  cdfConfigId?: string | undefined;
}

/** Enable Data API for a database. */
export interface CreateDataApiRequest {
  /** Parent database: projects/{project_id}/branches/{branch_id}/databases/{database_id} */
  parent?: string | undefined;
  /** The Data API configuration to create. */
  dataApi?: DataApi | undefined;
}

export interface CreateDatabaseRequest {
  /**
   * The Branch where this Database will be created.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /**
   * The ID to use for the Database, which will become the final component of
   * the database's resource name.
   * This ID becomes the database name in postgres.
   *
   * This value should be 4-63 characters, and only use characters available in DNS names,
   * as defined by RFC-1123
   *
   * If database_id is not specified in the request, it is generated automatically.
   */
  databaseId?: string | undefined;
  /** The desired specification of a Database. */
  database?: Database | undefined;
  /**
   * If true, update the database if it already exists instead of returning an
   * error.
   */
  replaceExisting?: boolean | undefined;
}

export interface CreateEndpointRequest {
  /**
   * The Branch where this Endpoint will be created.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /**
   * The ID to use for the Endpoint. This becomes the final component of the endpoint's resource name.
   * The ID is required and must be 1-63 characters long, start with a lowercase letter, and contain only lowercase letters, numbers, and hyphens.
   * For example, `primary` becomes `projects/my-app/branches/development/endpoints/primary`.
   */
  endpointId?: string | undefined;
  /** The Endpoint to create. */
  endpoint?: Endpoint | undefined;
  /** If true, update the endpoint if it already exists instead of returning an error. */
  replaceExisting?: boolean | undefined;
}

export interface CreateProjectRequest {
  /**
   * The ID to use for the Project. This becomes the final component of the project's resource name.
   * The ID is required and must be 1-63 characters long, start with a lowercase letter, and contain only lowercase letters, numbers, and hyphens.
   * For example, `my-app` becomes `projects/my-app`.
   */
  projectId?: string | undefined;
  /** The Project to create. */
  project?: Project | undefined;
}

export interface CreateRoleRequest {
  /**
   * The Branch where this Role is created.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /**
   * The ID to use for the Role, which will become the final component of
   * the role's resource name.
   * This ID becomes the role in Postgres.
   *
   * This value should be 4-63 characters, and valid characters
   * are lowercase letters, numbers, and hyphens, as defined by RFC 1123.
   *
   * If role_id is not specified in the request, it is generated automatically.
   */
  roleId?: string | undefined;
  /** The desired specification of a Role. */
  role?: Role | undefined;
  /**
   * If true, update the role if it already exists instead of returning an
   * error.
   *
   * When the role already exists, the provided `role` spec fully replaces the
   * existing one: `membership_roles` is overwritten, not merged. Leaving
   * `membership_roles` empty clears all of the role's existing memberships,
   * including `DATABRICKS_SUPERUSER`. Always send the complete desired list of
   * memberships when using this field.
   */
  replaceExisting?: boolean | undefined;
}

export interface CreateSnapshotRequest {
  /**
   * The project in which to create the snapshot.
   * Format: projects/{project_id}
   */
  parent?: string | undefined;
  /** The snapshot to create. */
  snapshot?: Snapshot | undefined;
  /**
   * Client-chosen ID for the snapshot. It becomes the final segment of the
   * snapshot resource name and cannot be changed after creation.
   */
  snapshotId?: string | undefined;
}

/** Establish a synchronisation to the Postgres database for Reverse ETL for the source table selected from the Unity Catalog. */
export interface CreateSyncedTableRequest {
  /**
   * The ID to use for the Synced Table. This becomes the final component of the SyncedTable's resource name.
   * ID is required and is the synced table name, containing (catalog, schema, table) tuple.
   * Elements of the tuple are the UC entity names.
   *
   * Example: "{catalog}.{schema}.{table}"
   *
   * synced_table_id represents both of the following:
   *
   * 1. An online VIEW virtual table in the Unity Catalog accessible via the Lakehouse Federation.
   * 2. Postgres table named "{table}" in schema "{schema}" in the connected Postgres database
   */
  syncedTableId?: string | undefined;
  syncedTable?: SyncedTable | undefined;
}

/** Take a snapshot once per day, at the configured hour. */
export interface DailySchedule {
  /** The hour of the day, in UTC, at which to take the snapshot, in [0, 23]. */
  hour?: number | undefined;
}

/**
 * DataApi represents the Data API (PostgREST) configuration for a Database.
 * At most one DataApi per database. Create enables Data API, Delete disables it.
 */
export interface DataApi {
  /** Resource name: projects/{project_id}/branches/{branch_id}/databases/{database_id}/data-api */
  name?: string | undefined;
  /**
   * The database containing this Data API configuration.
   * Format: projects/{project_id}/branches/{branch_id}/databases/{database_id}
   */
  parent?: string | undefined;
  /** A timestamp indicating when the Data API was first enabled. */
  createTime?: Temporal.Instant | undefined;
  /** A timestamp indicating when the Data API configuration was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The desired Data API configuration. */
  spec?: DataApi_DataApiSpec | undefined;
  /** The observed Data API state (read-only). */
  status?: DataApi_DataApiStatus | undefined;
}

/** Desired PostgREST configuration (input). */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DataApi_DataApiSpec {
  /**
   * Enable aggregate functions (count, sum, avg, etc.) in Data API responses.
   * Default: true.
   */
  dbAggregatesEnabled?: boolean | undefined;
  /**
   * Additional schemas to include in the PostgreSQL search path.
   * Each entry must be a valid PostgreSQL schema name.
   */
  dbExtraSearchPath?: string[] | undefined;
  /**
   * Maximum number of rows returned in a single Data API response.
   * Must be a positive integer.
   */
  dbMaxRows?: number | undefined;
  /**
   * Database schemas exposed through the Data API.
   * Each entry must be a valid PostgreSQL schema name (1-63 chars, [a-zA-Z_][a-zA-Z0-9_$]*).
   * Maximum 100 entries. Default: ["public"].
   */
  dbSchemas?: string[] | undefined;
  /**
   * JSON path to the role claim in JWT tokens (e.g., ".sub").
   * Default: ".sub".
   */
  jwtRoleClaimKey?: string | undefined;
  /** Maximum lifetime for cached JWT tokens. Zero duration disables caching. */
  jwtCacheMaxLifetime?: Temporal.Duration | undefined;
  /** OpenAPI documentation mode for the Data API endpoint. */
  openapiMode?: OpenApiMode | undefined;
  /**
   * Allowed origins for CORS requests.
   * Each entry should be a valid origin URL, or use "*" to allow all origins.
   */
  serverCorsAllowedOrigins?: string[] | undefined;
  /** Enable the Server-Timing header in Data API responses. */
  serverTimingEnabled?: boolean | undefined;
}

/** Observed state (output-only). */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DataApi_DataApiStatus {
  /** Actual aggregate function setting read from the database. */
  dbAggregatesEnabled?: boolean | undefined;
  /** Actual extra search path schemas read from the database. */
  dbExtraSearchPath?: string[] | undefined;
  /** Actual max rows setting read from the database. */
  dbMaxRows?: number | undefined;
  /** Actual exposed schemas read from the database. */
  dbSchemas?: string[] | undefined;
  /** Actual JWT role claim key read from the database. */
  jwtRoleClaimKey?: string | undefined;
  /** Actual JWT cache max lifetime read from the database. */
  jwtCacheMaxLifetime?: Temporal.Duration | undefined;
  /** Actual OpenAPI mode read from the database. */
  openapiMode?: OpenApiMode | undefined;
  /** Actual CORS allowed origins read from the database. */
  serverCorsAllowedOrigins?: string[] | undefined;
  /** Actual Server-Timing header setting read from the database. */
  serverTimingEnabled?: boolean | undefined;
  /** Data API endpoint URL. */
  url?: string | undefined;
  /** Schemas available in the database (for reference when configuring db_schemas). */
  availableSchemas?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DataApiOperationMetadata {}

/** Database represents a Postgres database within a Branch. */
export interface Database {
  /**
   * The resource name of the database.
   * Format: projects/{project_id}/branches/{branch_id}/databases/{database_id}
   */
  name?: string | undefined;
  /**
   * The branch containing this database.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /** A timestamp indicating when the database was created. */
  createTime?: Temporal.Instant | undefined;
  /** A timestamp indicating when the database was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The desired state of the Database. */
  spec?: Database_DatabaseSpec | undefined;
  /** The observed state of the Database. */
  status?: Database_DatabaseStatus | undefined;
  /** The part of the name, chosen by the user when the resource was created. */
  databaseId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Database_DatabaseSpec {
  /**
   * The name of the role that owns the database.
   * Format: projects/{project_id}/branches/{branch_id}/roles/{role_id}
   *
   * To change the owner, pass valid existing Role name when updating the Database
   *
   * A database always has an owner.
   */
  role?: string | undefined;
  /**
   * The name of the Postgres database.
   *
   * This expects a valid Postgres identifier as specified in the link below.
   * https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS
   * Required when creating the Database.
   *
   * To rename, pass a valid postgres identifier when updating the Database.
   */
  postgresDatabase?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Database_DatabaseStatus {
  /**
   * The name of the role that owns the database.
   * Format: projects/{project_id}/branches/{branch_id}/roles/{role_id}
   */
  role?: string | undefined;
  /** The name of the Postgres database. */
  postgresDatabase?: string | undefined;
  /** Part of the resource name. */
  databaseId?: string | undefined;
}

export interface DatabaseCredential {
  /** The OAuth token that can be used as a password when connecting to a database. */
  token?: string | undefined;
  /** Timestamp in UTC of when this credential expires. */
  expireTime?: Temporal.Instant | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DatabaseOperationMetadata {}

export interface DeleteBranchRequest {
  /**
   * The full resource path of the branch to delete.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  name?: string | undefined;
  /** If true, permanently delete the branch; if false, soft delete. */
  purge?: boolean | undefined;
}

export interface DeleteCatalogRequest {
  /**
   * The full resource path of the catalog to delete.
   *
   * Format: "catalogs/{catalog_id}".
   */
  name?: string | undefined;
}

/** Request to delete a Lakebase CDF configuration (CdfConfig). */
export interface DeleteCdfConfigRequest {
  /**
   * The resource name of the CdfConfig to delete.
   * Format: projects/{project}/branches/{branch}/databases/{database}/cdf-configs/{cdf_config}
   */
  name?: string | undefined;
  /**
   * When true, also drops the replicated Delta tables in Unity Catalog. When
   * false (the default), the replicated tables are preserved at their last
   * synced state.
   */
  force?: boolean | undefined;
}

/** Disable Data API for a database. */
export interface DeleteDataApiRequest {
  /** Resource name: projects/{project_id}/branches/{branch_id}/databases/{database_id}/data-api */
  name?: string | undefined;
}

export interface DeleteDatabaseRequest {
  /**
   * The resource name of the postgres database.
   * Format: projects/{project_id}/branches/{branch_id}/databases/{database_id}
   */
  name?: string | undefined;
}

export interface DeleteEndpointRequest {
  /**
   * The full resource path of the endpoint to delete.
   * Format: projects/{project_id}/branches/{branch_id}/endpoints/{endpoint_id}
   */
  name?: string | undefined;
}

export interface DeleteProjectRequest {
  /**
   * The full resource path of the project to delete.
   * Format: projects/{project_id}
   */
  name?: string | undefined;
  /**
   * If true, permanently deletes the project (hard delete).
   * If false or unset, performs a soft delete.
   */
  purge?: boolean | undefined;
}

export interface DeleteRoleRequest {
  /**
   * The full resource path of the role to delete.
   * Format: projects/{project_id}/branches/{branch_id}/roles/{role_id}
   */
  name?: string | undefined;
  /**
   * Reassign objects. If this is set, all objects owned by the role are
   * reassigned to the role specified in this parameter.
   *
   * NOTE: setting this requires spinning up a compute to succeed, since it involves running
   * SQL queries.
   */
  reassignOwnedTo?: string | undefined;
}

export interface DeleteSnapshotRequest {
  /**
   * The resource name of the snapshot to delete.
   * Format: projects/{project_id}/snapshots/{snapshot_id}
   */
  name?: string | undefined;
}

export interface DeleteSyncedTableRequest {
  /**
   * The Full resource name of the synced table, of the format "synced_tables/{catalog}.{schema}.{table}",
   * where (catalog, schema, table) are the UC entity names.
   */
  name?: string | undefined;
}

export interface DeltaTableSyncInfo {
  /** The Delta Lake commit version that was last successfully synced. */
  deltaCommitVersion?: bigint | undefined;
  /**
   * The timestamp when the above Delta version was committed in the source Delta table.
   * Note: This is the Delta commit time, not the time the data was written to the synced table.
   */
  deltaCommitTime?: Temporal.Instant | undefined;
}

export interface Endpoint {
  /**
   * Output only. The full resource path of the endpoint.
   * Format: projects/{project_id}/branches/{branch_id}/endpoints/{endpoint_id}
   */
  name?: string | undefined;
  /** System-generated unique ID for the endpoint. */
  uid?: string | undefined;
  /**
   * The branch containing this endpoint (API resource hierarchy).
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /** A timestamp indicating when the compute endpoint was created. */
  createTime?: Temporal.Instant | undefined;
  /** A timestamp indicating when the compute endpoint was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The spec contains the compute endpoint configuration, including autoscaling limits, suspend timeout, and disabled state. */
  spec?: EndpointSpec | undefined;
  /** Current operational status of the compute endpoint. */
  status?: EndpointStatus | undefined;
  /** The part of the name, chosen by the user when the resource was created. */
  endpointId?: string | undefined;
}

export interface EndpointGroupSpec {
  /**
   * The minimum number of computes in the endpoint group. Currently, this must be equal to max. This must be greater
   * than or equal to 1.
   */
  min?: number | undefined;
  /**
   * The maximum number of computes in the endpoint group. Currently, this must be equal to min. Set to 1 for single
   * compute endpoints, to disable HA. To manually suspend all computes in an endpoint group, set disabled to
   * true on the EndpointSpec.
   */
  max?: number | undefined;
  /**
   * Whether to allow read-only connections to read-write endpoints. Only relevant for read-write endpoints where
   * size.max > 1.
   */
  enableReadableSecondaries?: boolean | undefined;
}

export interface EndpointGroupStatus {
  /**
   * The minimum number of computes in the endpoint group. Currently, this must be equal to max. This must be greater
   * than or equal to 1.
   */
  min?: number | undefined;
  /**
   * The maximum number of computes in the endpoint group. Currently, this must be equal to min. Set to 1 for single
   * compute endpoints, to disable HA. To manually suspend all computes in an endpoint group, set disabled to
   * true on the EndpointSpec.
   */
  max?: number | undefined;
  /**
   * Whether read-only connections to read-write endpoints are allowed. Only relevant if read replicas are configured
   * by specifying size.max > 1.
   */
  enableReadableSecondaries?: boolean | undefined;
}

/** Encapsulates various hostnames (r/w or r/o, pooled or not) for an endpoint. */
export interface EndpointHosts {
  /**
   * The hostname to connect to this endpoint. For read-write endpoints, this is a read-write hostname which connects
   * to the primary compute. For read-only endpoints, this is a read-only hostname which allows read-only operations.
   */
  host?: string | undefined;
  /**
   * An optionally defined read-only host for the endpoint, without pooling. For read-only endpoints,
   * this attribute is always defined and is equivalent to host. For read-write endpoints, this attribute is defined
   * if the enclosing endpoint is a group with greater than 1 computes configured, and has readable secondaries enabled.
   */
  readOnlyHost?: string | undefined;
  /** The read-write hostname of the compute endpoint, with pooling. This attribute is only defined for read-write endpoints. */
  readWritePooledHost?: string | undefined;
  /**
   * The read-only hostname of the compute endpoint, with pooling. This attribute is always defined for read-only endpoints,
   * and may be defined for read-write endpoints if configured with read replicas and allow read-only connections.
   */
  readOnlyPooledHost?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EndpointOperationMetadata {}

/** A collection of settings for a compute endpoint. */
export interface EndpointSettings {
  /** A raw representation of Postgres settings. */
  pgSettings?: Record<string, string> | undefined;
}

export interface EndpointSpec {
  /** The endpoint type. A branch can only have one READ_WRITE endpoint. */
  endpointType?: EndpointType | undefined;
  /** The minimum number of Compute Units. Minimum value is 0.5. */
  autoscalingLimitMinCu?: number | undefined;
  /**
   * The maximum number of Compute Units. The maximum value is 64.
   * The difference between the minimum and maximum Compute Units (max - min) must not exceed 16.
   */
  autoscalingLimitMaxCu?: number | undefined;
  /**
   * Whether to restrict connections to the compute endpoint.
   * Enabling this option schedules a suspend compute operation.
   * A disabled compute endpoint cannot be enabled by a connection or
   * console action.
   */
  disabled?: boolean | undefined;
  /**
   * Duration of inactivity after which the compute endpoint is automatically suspended. One of suspend_timeout_duration or no_suspension can be provided.
   * When not specified default suspension behavior will be used (consult with documentation).
   *
   * When updating this field, use "spec.suspension" in the update_mask.
   */
  suspension?:
    | {
        $case: 'suspendTimeoutDuration';
        /**
         * Duration of inactivity after which the compute endpoint is automatically suspended.
         * If specified should be between 60s and 604800s (1 minute to 1 week).
         * Mutually exclusive with `no_suspension`. When updating, use `spec.suspension` in the update_mask.
         */
        suspendTimeoutDuration: Temporal.Duration;
      }
    | {
        $case: 'noSuspension';
        /**
         * When set to true, explicitly disables automatic suspension (never suspend).
         * Should be set to true when provided.
         * Mutually exclusive with `suspend_timeout_duration`. When updating, use `spec.suspension` in the update_mask.
         */
        noSuspension: boolean;
      }
    | undefined;
  settings?: EndpointSettings | undefined;
  /**
   * Settings for optional HA configuration of the endpoint. If unspecified, the endpoint defaults
   * to non HA settings, with a single compute backing the endpoint (and no readable secondaries
   * for Read/Write endpoints).
   */
  group?: EndpointGroupSpec | undefined;
}

export interface EndpointStatus {
  /** The endpoint type. A branch can only have one READ_WRITE endpoint. */
  endpointType?: EndpointType | undefined;
  /** Contains host information for connecting to the endpoint. */
  hosts?: EndpointHosts | undefined;
  /** A timestamp indicating when the compute endpoint was last active. */
  lastActiveTime?: Temporal.Instant | undefined;
  /** The minimum number of Compute Units. */
  autoscalingLimitMinCu?: number | undefined;
  /**
   * The maximum number of Compute Units. The maximum value is 64.
   * The difference between the minimum and maximum Compute Units (max - min) must not exceed 16.
   */
  autoscalingLimitMaxCu?: number | undefined;
  currentState?: EndpointStatus_State | undefined;
  pendingState?: EndpointStatus_State | undefined;
  /**
   * Whether to restrict connections to the compute endpoint.
   * Enabling this option schedules a suspend compute operation.
   * A disabled compute endpoint cannot be enabled by a connection or
   * console action.
   */
  disabled?: boolean | undefined;
  /** Duration of inactivity after which the compute endpoint is automatically suspended. */
  suspendTimeoutDuration?: Temporal.Duration | undefined;
  settings?: EndpointSettings | undefined;
  /** Details on the HA configuration of the endpoint. */
  group?: EndpointGroupStatus | undefined;
  /** Part of the resource name. */
  endpointId?: string | undefined;
}

export interface GenerateDatabaseCredentialRequest {
  /** The returned token will be scoped to UC tables with the specified permissions. */
  claims?: RequestedClaims[] | undefined;
  /**
   * The endpoint resource name for which this credential will be generated.
   * Format: projects/{project_id}/branches/{branch_id}/endpoints/{endpoint_id}
   */
  endpoint?: string | undefined;
  /**
   * Expiration information for the credential.
   * Users can specify either expire_time or ttl.
   * If unspecified, maximum allowed duration (1 hour) is used.
   */
  expiration?:
    | {
        $case: 'ttl';
        /**
         * The requested time-to-live for the generated credential token.
         * Must be at least 300 seconds (5 minutes) and at most 3600 seconds (1 hour).
         */
        ttl: Temporal.Duration;
      }
    | {
        $case: 'expireTime';
        /**
         * Timestamp in UTC of when this credential should expire.
         * Must be at least 300 seconds (5 minutes) and at most 1 hour from the current time.
         */
        expireTime: Temporal.Instant;
      }
    | undefined;
}

export interface GetBranchRequest {
  /**
   * The full resource path of the branch to retrieve.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  name?: string | undefined;
}

export interface GetCatalogRequest {
  /**
   * The full resource path of the catalog to retrieve.
   *
   * Format: "catalogs/{catalog_id}".
   */
  name?: string | undefined;
}

/** Request to retrieve a single CdfConfig. */
export interface GetCdfConfigRequest {
  /**
   * The resource name of the CdfConfig to retrieve.
   * Format: projects/{project}/branches/{branch}/databases/{database}/cdf-configs/{cdf_config}
   */
  name?: string | undefined;
}

/** Request to retrieve the status of a single replicated table (CdfStatus). */
export interface GetCdfStatusRequest {
  /**
   * The resource name of the CdfStatus to retrieve.
   * Format: projects/{project}/branches/{branch}/databases/{database}/cdf-configs/{cdf_config}/cdf-statuses/{cdf_status}
   */
  name?: string | undefined;
}

/** Get Data API configuration for a database. */
export interface GetDataApiRequest {
  /** Resource name: projects/{project_id}/branches/{branch_id}/databases/{database_id}/data-api */
  name?: string | undefined;
}

export interface GetDatabaseRequest {
  /**
   * The name of the Database to retrieve.
   * Format: projects/{project_id}/branches/{branch_id}/databases/{database_id}
   */
  name?: string | undefined;
}

export interface GetEndpointRequest {
  /**
   * The full resource path of the endpoint to retrieve.
   * Format: projects/{project_id}/branches/{branch_id}/endpoints/{endpoint_id}
   */
  name?: string | undefined;
}

/** The request message for `GetOperation` method. */
export interface GetOperationRequest {
  /** The name of the operation resource. */
  name?: string | undefined;
}

export interface GetProjectRequest {
  /**
   * The full resource path of the project to retrieve.
   * Format: projects/{project_id}
   */
  name?: string | undefined;
}

export interface GetRoleRequest {
  /**
   * The full resource path of the role to retrieve.
   * Format: projects/{project_id}/branches/{branch_id}/roles/{role_id}
   */
  name?: string | undefined;
}

export interface GetSnapshotRequest {
  /**
   * The resource name of the snapshot to retrieve.
   * Format: projects/{project_id}/snapshots/{snapshot_id}
   */
  name?: string | undefined;
}

/** Request to retrieve the snapshot schedule for a branch. */
export interface GetSnapshotScheduleRequest {
  /**
   * The resource name of the branch's snapshot schedule.
   * Format: projects/{project_id}/branches/{branch_id}/snapshot-schedule
   */
  name?: string | undefined;
}

export interface GetSyncedTableRequest {
  /**
   * The Full resource name of the synced table.
   * Format: "synced_tables/{catalog}.{schema}.{table}",
   * where (catalog, schema, table) are the entity names in the Unity Catalog.
   */
  name?: string | undefined;
}

/** Configuration for the initial default branch created during project creation. */
export interface InitialBranchSpec {
  /** Whether the initial default branch should be protected from deletion. */
  isProtected?: boolean | undefined;
}

/** Configuration for the initial Read/Write endpoint created during project creation. */
export interface InitialEndpointSpec {
  /** Settings for HA configuration of the endpoint. */
  group?: EndpointGroupSpec | undefined;
  /** The minimum number of Compute Units for the initial endpoint. */
  autoscalingLimitMinCu?: number | undefined;
  /** The maximum number of Compute Units for the initial endpoint. */
  autoscalingLimitMaxCu?: number | undefined;
  suspension?:
    | {
        $case: 'suspendTimeoutDuration';
        /**
         * Duration of inactivity after which the initial endpoint is automatically suspended.
         * If specified, should be between 60s and 604800s (1 minute to 1 week).
         * Mutually exclusive with `no_suspension`.
         */
        suspendTimeoutDuration: Temporal.Duration;
      }
    | {
        $case: 'noSuspension';
        /**
         * When set to true, explicitly disables automatic suspension (never suspend).
         * Should be set to true when provided.
         * Mutually exclusive with `suspend_timeout_duration`.
         */
        noSuspension: boolean;
      }
    | undefined;
}

export interface ListBranchesRequest {
  /**
   * The Project that owns this collection of branches.
   * Format: projects/{project_id}
   */
  parent?: string | undefined;
  /** Page token from a previous response. If not provided, returns the first page. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. Cannot be negative. */
  pageSize?: number | undefined;
  /**
   * Whether to include soft-deleted branches in the response.
   * When true, deleted branches are included alongside active branches.
   * Purged branches are never returned.
   */
  showDeleted?: boolean | undefined;
}

export interface ListBranchesResponse {
  /** List of branches in the project. */
  branches?: Branch[] | undefined;
  /** Token to request the next page of branches. */
  nextPageToken?: string | undefined;
}

/** Request to list the Lakebase CDF configurations (CdfConfigs) under a database. */
export interface ListCdfConfigsRequest {
  /**
   * The parent database to list CdfConfigs for.
   * Format: projects/{project}/branches/{branch}/databases/{database}
   */
  parent?: string | undefined;
  /** Maximum number of CdfConfigs to return. */
  pageSize?: number | undefined;
  /**
   * Pagination token returned by a previous ListCdfConfigs call. Empty on the
   * first page.
   */
  pageToken?: string | undefined;
}

/**
 * Response to a ListCdfConfigs request, containing a page of CdfConfigs and a
 * token for fetching the next page.
 */
export interface ListCdfConfigsResponse {
  /** The CdfConfigs under the parent database. */
  cdfConfigs?: CdfConfig[] | undefined;
  /** Token to retrieve the next page of results; empty when there are no more. */
  nextPageToken?: string | undefined;
}

/**
 * Request to list the statuses of all tables replicated under a Lakebase CDF
 * configuration (CdfConfig).
 */
export interface ListCdfStatusesRequest {
  /**
   * The parent CdfConfig to list CdfStatuses for.
   * Format: projects/{project}/branches/{branch}/databases/{database}/cdf-configs/{cdf_config}
   */
  parent?: string | undefined;
  /** Maximum number of CdfStatuses to return. */
  pageSize?: number | undefined;
  /**
   * Pagination token returned by a previous ListCdfStatuses call. Empty on the
   * first page.
   */
  pageToken?: string | undefined;
}

/**
 * Response to a ListCdfStatuses request, containing a page of replicated table
 * statuses and a token for fetching the next page.
 */
export interface ListCdfStatusesResponse {
  /** The replicated tables under the parent CdfConfig. */
  cdfStatuses?: CdfStatus[] | undefined;
  /** Token to retrieve the next page of results; empty when there are no more. */
  nextPageToken?: string | undefined;
}

/** List Databases. */
export interface ListDatabasesRequest {
  /**
   * The Branch that owns this collection of databases.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /** Pagination token to go to the next page of Databases. Requests first page if absent. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. */
  pageSize?: number | undefined;
}

export interface ListDatabasesResponse {
  /** List of databases. */
  databases?: Database[] | undefined;
  /** Pagination token to request the next page of databases. */
  nextPageToken?: string | undefined;
}

export interface ListEndpointsRequest {
  /**
   * The Branch that owns this collection of endpoints.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /** Page token from a previous response. If not provided, returns the first page. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. Cannot be negative. */
  pageSize?: number | undefined;
}

export interface ListEndpointsResponse {
  /** List of compute endpoints in the branch. */
  endpoints?: Endpoint[] | undefined;
  /** Token to request the next page of compute endpoints. */
  nextPageToken?: string | undefined;
}

export interface ListProjectsRequest {
  /** Page token from a previous response. If not provided, returns the first page. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. Cannot be negative. The maximum value is 100. */
  pageSize?: number | undefined;
  /**
   * Whether to include soft-deleted projects in the response.
   * When true, soft-deleted projects are included alongside active projects.
   * Hard-deleted and already-purged projects are never returned.
   */
  showDeleted?: boolean | undefined;
}

export interface ListProjectsResponse {
  /** List of all projects in the workspace that the user has permission to access. */
  projects?: Project[] | undefined;
  /** Token to request the next page of projects. */
  nextPageToken?: string | undefined;
}

export interface ListRolesRequest {
  /**
   * The Branch that owns this collection of roles.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /** Page token from a previous response. If not provided, returns the first page. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. Cannot be negative. */
  pageSize?: number | undefined;
}

export interface ListRolesResponse {
  /** List of Postgres roles in the branch. */
  roles?: Role[] | undefined;
  /** Token to request the next page of Postgres roles. */
  nextPageToken?: string | undefined;
}

export interface ListSnapshotsRequest {
  /**
   * The project that owns the snapshots.
   * Format: projects/{project_id}
   */
  parent?: string | undefined;
  /** Page token from a previous response; omit for the first page. */
  pageToken?: string | undefined;
  /** Maximum number of snapshots to return per page. */
  pageSize?: number | undefined;
}

export interface ListSnapshotsResponse {
  /** The snapshots in the project. */
  snapshots?: Snapshot[] | undefined;
  /** Token to retrieve the next page; empty if there are no more pages. */
  nextPageToken?: string | undefined;
}

/** Take a snapshot once per month, on the configured day at the configured hour. */
export interface MonthlySchedule {
  /**
   * The day of the month on which to take the snapshot, in [1, 31]. In shorter
   * months the snapshot is taken on the last day instead (day 31 runs on Feb 28
   * or 29, and on Apr 30), so every month gets exactly one snapshot.
   */
  day?: number | undefined;
  /** The hour of the day, in UTC, at which to take the snapshot, in [0, 23]. */
  hour?: number | undefined;
}

export interface NewPipelineSpec {
  /**
   * UC catalog for the pipeline to store intermediate files (checkpoints, event logs etc).
   * This needs to be a standard catalog where the user has permissions to create Delta tables.
   */
  storageCatalog?: string | undefined;
  /**
   * UC schema for the pipeline to store intermediate files (checkpoints, event logs etc).
   * This needs to be in the standard catalog where the user has permissions to create Delta tables.
   */
  storageSchema?: string | undefined;
  /** Budget policy to set on the newly created pipeline. */
  budgetPolicyId?: string | undefined;
  /**
   * Release channel of the underlying pipeline's runtime.
   * Some source table configurations (e.g., read-time CDF) require PREVIEW.
   * Defaults to CURRENT if not specified.
   */
  pipelineChannel?: NewPipelineSpec_PipelineChannel | undefined;
}

/**
 * This resource represents a long-running operation that is the result of a
 * network API call.
 */
export interface Operation {
  /**
   * The server-assigned name, which is only unique within the same service that
   * originally returns it. If you use the default HTTP mapping, the
   * `name` should be a resource name ending with `operations/{unique_id}`.
   */
  name?: string | undefined;
  /**
   * Service-specific metadata associated with the operation.  It typically
   * contains progress information and common metadata such as create time.
   * Some services might not provide such metadata.
   */
  metadata?: Record<string, unknown> | undefined;
  /**
   * If the value is `false`, it means the operation is still in progress.
   * If `true`, the operation is completed, and either `error` or `response` is
   * available.
   */
  done?: boolean | undefined;
  /**
   * The operation result, which can be either an `error` or a valid `response`.
   * If `done` == `false`, neither `error` nor `response` is set.
   * If `done` == `true`, exactly one of `error` or `response` can be set.
   * Some services might not provide the result.
   */
  result?:
    | {
        $case: 'error';
        /** The error result of the operation in case of failure or cancellation. */
        error: ApiError;
      }
    | {
        $case: 'response';
        /** The normal, successful response of the operation. */
        response: Record<string, unknown>;
      }
    | undefined;
}

export interface Project {
  /**
   * Output only. The full resource path of the project.
   * Format: projects/{project_id}
   */
  name?: string | undefined;
  /** System-generated unique ID for the project. */
  uid?: string | undefined;
  /** A timestamp indicating when the project was created. */
  createTime?: Temporal.Instant | undefined;
  /** A timestamp indicating when the project was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The spec contains the project configuration, including display_name, pg_version (Postgres version), history_retention_duration, and default_endpoint_settings. */
  spec?: ProjectSpec | undefined;
  /** The current status of a Project. */
  status?: ProjectStatus | undefined;
  /**
   * Configuration settings for the initial Read/Write endpoint created inside the initial branch for a newly
   * created project. If omitted, the initial endpoint created will have default settings, without high availability
   * configured. This field does not apply to any endpoints created after project creation. Use
   * spec.default_endpoint_settings to configure default settings for endpoints created after project creation.
   */
  initialEndpointSpec?: InitialEndpointSpec | undefined;
  /**
   * A timestamp indicating when the project was soft-deleted.
   * Empty if the project is not deleted, otherwise set to a timestamp in the past.
   */
  deleteTime?: Temporal.Instant | undefined;
  /**
   * A timestamp indicating when the project is scheduled for permanent deletion.
   * Empty if the project is not deleted, otherwise set to a timestamp in the future.
   */
  purgeTime?: Temporal.Instant | undefined;
  /**
   * Configuration for the initial default branch created as part of project creation.
   * Allows overriding branch protection. These settings only apply at creation time
   * and do not affect resources created after project creation.
   */
  initialBranchSpec?: InitialBranchSpec | undefined;
  /** The part of the name, chosen by the user when the resource was created. */
  projectId?: string | undefined;
}

export interface ProjectCustomTag {
  /** The key of the custom tag. */
  key?: string | undefined;
  /** The value of the custom tag. */
  value?: string | undefined;
}

/** A collection of settings for a compute endpoint. */
export interface ProjectDefaultEndpointSettings {
  /** The minimum number of Compute Units. Minimum value is 0.5. */
  autoscalingLimitMinCu?: number | undefined;
  /** The maximum number of Compute Units. Minimum value is 0.5. */
  autoscalingLimitMaxCu?: number | undefined;
  suspension?:
    | {
        $case: 'suspendTimeoutDuration';
        /**
         * Duration of inactivity after which the compute endpoint is automatically suspended.
         * If specified should be between 60s and 604800s (1 minute to 1 week).
         * Mutually exclusive with `no_suspension`. When updating, use `spec.project_default_settings.suspension` in the update_mask.
         */
        suspendTimeoutDuration: Temporal.Duration;
      }
    | {
        $case: 'noSuspension';
        /**
         * When set to true, explicitly disables automatic suspension (never suspend).
         * Should be set to true when provided.
         * Mutually exclusive with `suspend_timeout_duration`. When updating, use `spec.project_default_settings.suspension` in the update_mask.
         */
        noSuspension: boolean;
      }
    | undefined;
  /** A raw representation of Postgres settings. */
  pgSettings?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProjectOperationMetadata {}

export interface ProjectSpec {
  /** Human-readable project name. Length should be between 1 and 256 characters. */
  displayName?: string | undefined;
  /** The major Postgres version number. The set of supported versions may vary; consult the API documentation for currently accepted values. */
  pgVersion?: number | undefined;
  /** The number of seconds to retain the shared history for point in time recovery for all branches in this project. Value should be between 172800s (2 days) and 3024000s (35 days). */
  historyRetentionDuration?: Temporal.Duration | undefined;
  defaultEndpointSettings?: ProjectDefaultEndpointSettings | undefined;
  /**
   * The desired budget policy to associate with the project.
   * See status.budget_policy_id for the policy that is actually applied to the project.
   */
  budgetPolicyId?: string | undefined;
  /**
   * Custom tags to associate with the project. Forwarded to LBM for billing and cost tracking.
   * To update tags, provide the new tag list and include "spec.custom_tags" in the update_mask.
   * To clear all tags, provide an empty list and include "spec.custom_tags" in the update_mask.
   * To preserve existing tags, omit this field from the update_mask (or use wildcard "*" which auto-excludes empty tags).
   */
  customTags?: ProjectCustomTag[] | undefined;
  /** Whether to enable PG native password login on all endpoints in this project. Defaults to false. */
  enablePgNativeLogin?: boolean | undefined;
  /**
   * The full resource path for the default branch of the project
   * Format: projects/{project_id}/branches/{branch_id}
   */
  defaultBranch?: string | undefined;
}

export interface ProjectStatus {
  /** The effective human-readable project name. */
  displayName?: string | undefined;
  /** The effective major Postgres version number. */
  pgVersion?: number | undefined;
  /** The effective number of seconds to retain the shared history for point in time recovery. */
  historyRetentionDuration?: Temporal.Duration | undefined;
  /** The effective default endpoint settings. */
  defaultEndpointSettings?: ProjectDefaultEndpointSettings | undefined;
  /** The logical size limit for a branch. */
  branchLogicalSizeLimitBytes?: bigint | undefined;
  /** The current space occupied by the project in storage. */
  syntheticStorageSizeBytes?: bigint | undefined;
  /** The most recent time when any endpoint of this project was active. */
  computeLastActiveTime?: Temporal.Instant | undefined;
  /** The budget policy that is applied to the project. */
  budgetPolicyId?: string | undefined;
  /** The effective custom tags associated with the project. */
  customTags?: ProjectCustomTag[] | undefined;
  /** The email of the project owner. */
  owner?: string | undefined;
  /** Whether to enable PG native password login on all endpoints in this project. */
  enablePgNativeLogin?: boolean | undefined;
  /** The full resource path of the default branch of the project */
  defaultBranch?: string | undefined;
  /** Part of the resource name. */
  projectId?: string | undefined;
}

/** The provisioning state of a resource in Unity Catalog. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProvisioningInfo {}

export interface RequestedClaims {
  permissionSet?: RequestedClaims_PermissionSet | undefined;
  resources?: RequestedResource[] | undefined;
}

export interface RequestedResource {
  resourceName?:
    | {
        $case: 'tableName';
        /** The full Unity Catalog table name. */
        tableName: string;
      }
    | undefined;
}

/** Role represents a Postgres role within a Branch. */
export interface Role {
  /**
   * Output only. The full resource path of the role.
   * Format: projects/{project_id}/branches/{branch_id}/roles/{role_id}
   */
  name?: string | undefined;
  /**
   * The Branch where this Role exists.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  createTime?: Temporal.Instant | undefined;
  updateTime?: Temporal.Instant | undefined;
  /** The spec contains the role configuration, including identity type, authentication method, and role attributes. */
  spec?: Role_RoleSpec | undefined;
  /** Current status of the role, including its identity type, authentication method, and role attributes. */
  status?: Role_RoleStatus | undefined;
  /** The part of the name, chosen by the user when the resource was created. */
  roleId?: string | undefined;
}

/**
 * Attributes that can be granted to a Postgres role. We are only implementing a subset for now, see xref:
 * https://www.postgresql.org/docs/16/sql-createrole.html
 * The values follow Postgres keyword naming e.g. CREATEDB, BYPASSRLS, etc. which is why they don't include typical
 * underscores between words.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Role_Attributes {
  createdb?: boolean | undefined;
  createrole?: boolean | undefined;
  bypassrls?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Role_RoleSpec {
  /** An enum value for a standard role that this role is a member of. */
  membershipRoles?: Role_MembershipRole[] | undefined;
  /**
   * The type of role.
   * When specifying a managed-identity, the chosen role_id must be a valid:
   *
   * * application ID for SERVICE_PRINCIPAL
   * * user email for USER
   * * group name for GROUP
   */
  identityType?: Role_IdentityType | undefined;
  /** The desired API-exposed Postgres role attribute to associate with the role. Optional. */
  attributes?: Role_Attributes | undefined;
  /**
   * Controls how the Postgres role authenticates when a client opens a database
   * connection. Supported values:
   *
   * * LAKEBASE_OAUTH_V1: the role authenticates by presenting a Databricks
   * OAuth access token derived from the backing managed identity (the
   * <Databricks> user, service principal, or group named by the role's
   * `postgres_role`). No static password exists for roles using this method.
   * * PG_PASSWORD_SCRAM_SHA_256: the role authenticates with a Postgres
   * password verified server-side using the SCRAM-SHA-256 mechanism.
   * Lakebase generates a password for the role.
   * * NO_LOGIN: the role cannot open a Postgres session at all. Useful for
   * roles that exist only to own objects or to aggregate privileges that
   * are then granted to other, loginable roles.
   *
   * If auth_method is left unspecified, a meaningful authentication method is derived from the identity_type:
   * * For the managed identities, OAUTH is used.
   * * For the regular postgres roles, authentication based on postgres passwords is used.
   *
   * NOTE: for the <Databricks> identity type GROUP, LAKEBASE_OAUTH_V1
   * is the default auth method (group can login as well).
   */
  authMethod?: Role_AuthMethod | undefined;
  /**
   * The name of the Postgres role.
   *
   * This expects a valid Postgres identifier as specified in the link below.
   * https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS
   *
   * Required when creating the Role.
   *
   * If you wish to create a Postgres Role backed by a managed <Databricks> identity, then postgres_role
   * must be one of the following:
   *
   * 1. user email for IdentityType.USER
   * 2. app ID for IdentityType.SERVICE_PRINCIPAL
   * 2. group name for IdentityType.GROUP
   */
  postgresRole?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Role_RoleStatus {
  /** An enum value for a standard role that this role is a member of. */
  membershipRoles?: Role_MembershipRole[] | undefined;
  /** The type of the role. */
  identityType?: Role_IdentityType | undefined;
  /** The PG role attributes associated with the role. */
  attributes?: Role_Attributes | undefined;
  authMethod?: Role_AuthMethod | undefined;
  /** The name of the Postgres role. */
  postgresRole?: string | undefined;
  /** Part of the resource name. */
  roleId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RoleOperationMetadata {}

/** One cadence at which automatic snapshots are taken. */
export interface ScheduleCadence {
  /**
   * The recurrence pattern. Exactly one arm must be set; an unset cadence is
   * rejected with INVALID_PARAMETER_VALUE.
   */
  schedule?:
    | {
        $case: 'dailySchedule';
        /** Take a snapshot once per day. */
        dailySchedule: DailySchedule;
      }
    | {
        $case: 'weeklySchedule';
        /** Take a snapshot once per week. */
        weeklySchedule: WeeklySchedule;
      }
    | {
        $case: 'monthlySchedule';
        /** Take a snapshot once per month. */
        monthlySchedule: MonthlySchedule;
      }
    | undefined;
  /**
   * How long snapshots from this cadence are kept before automatic deletion.
   * Must be at least 1 hour. Applied when a snapshot is taken; not retroactive,
   * so changing it affects only later snapshots.
   */
  retention?: Temporal.Duration | undefined;
}

/**
 * An immutable, point-in-time copy of a branch's data within a project. It
 * remains available after the source branch is deleted.
 */
export interface Snapshot {
  /**
   * The resource name of the snapshot.
   * Format: projects/{project_id}/snapshots/{snapshot_id}
   */
  name?: string | undefined;
  /** Unique system-generated ID for the snapshot. */
  uid?: string | undefined;
  /** When the snapshot was created. */
  createTime?: Temporal.Instant | undefined;
  /** Client-provided configuration of the snapshot. */
  spec?: SnapshotSpec | undefined;
  /** Server-observed state of the snapshot. */
  status?: SnapshotStatus | undefined;
  /** The user-chosen ID; the final segment of `name`. */
  snapshotId?: string | undefined;
}

/** Metadata for the long-running snapshot Create and Delete operations. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SnapshotOperationMetadata {}

/**
 * The automatic snapshot cadences for a branch. There is exactly one schedule
 * per branch (singleton); it is configured in place, not created or deleted.
 *
 * Name: projects/{project_id}/branches/{branch_id}/snapshot-schedule
 */
export interface SnapshotSchedule {
  /**
   * The resource name of the branch's snapshot schedule.
   * Format: projects/{project_id}/branches/{branch_id}/snapshot-schedule
   */
  name?: string | undefined;
  /**
   * The cadences at which automatic snapshots are taken. Update replaces the
   * whole set; an empty set disables automatic snapshots. Order is not
   * significant. When several cadences fire together, one snapshot is taken,
   * retained for the longest of their retentions.
   */
  schedule?: ScheduleCadence[] | undefined;
}

/** Metadata for the long-running snapshot schedule Update operation. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SnapshotScheduleOperationMetadata {}

/** Client-provided configuration of the snapshot. */
export interface SnapshotSpec {
  /**
   * The source branch to snapshot.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  sourceBranch?: string | undefined;
  /**
   * The point in time to snapshot from. If unset, the current head of the
   * source branch is used. The chosen LSN or timestamp must fall within the
   * project's point-in-time-recovery window (its history_retention_duration);
   * otherwise the request returns INVALID_PARAMETER_VALUE.
   */
  pointInTime?:
    | {
        $case: 'sourceBranchLsn';
        /**
         * LSN to snapshot from, e.g. `16/B374D848`.
         * Mutually exclusive with `source_branch_time`.
         */
        sourceBranchLsn: string;
      }
    | {
        $case: 'sourceBranchTime';
        /**
         * Timestamp to snapshot from.
         * Mutually exclusive with `source_branch_lsn`.
         */
        sourceBranchTime: Temporal.Instant;
      }
    | undefined;
  /** Expiration policy. If unset, the snapshot is kept until deleted. */
  expiration?:
    | {
        $case: 'expireTime';
        /**
         * Absolute time at which the snapshot is deleted.
         * Mutually exclusive with `ttl` and `no_expiry`.
         */
        expireTime: Temporal.Instant;
      }
    | {
        $case: 'ttl';
        /**
         * Time-to-live. The snapshot expires this long after it is created.
         * Mutually exclusive with `expire_time` and `no_expiry`. Reads report the
         * resolved absolute `expire_time` instead.
         */
        ttl: Temporal.Duration;
      }
    | {
        $case: 'noExpiry';
        /**
         * If true, the snapshot never expires.
         * Mutually exclusive with `ttl` and `expire_time`.
         */
        noExpiry: boolean;
      }
    | undefined;
}

/** Server-observed state of a snapshot. */
export interface SnapshotStatus {
  /**
   * The source branch the snapshot was taken from.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  sourceBranch?: string | undefined;
  /** Observed expiration state of the snapshot. */
  expiration?:
    | {
        $case: 'expireTime';
        /** Absolute time at which the snapshot is deleted. */
        expireTime: Temporal.Instant;
      }
    | {
        $case: 'noExpiry';
        /** True if the snapshot never expires. */
        noExpiry: boolean;
      }
    | undefined;
  /** Full logical size of the snapshot, in bytes. */
  fullSizeBytes?: bigint | undefined;
  /**
   * Incremental storage size in bytes since the previous snapshot. Unset when
   * the snapshot is not billed on incremental usage.
   */
  diffSizeBytes?: bigint | undefined;
}

export interface SyncedTable {
  /**
   * Output only. The Full resource name of the synced table in Postgres
   * where (catalog, schema, table) are the UC entity names.
   *
   * Format "synced_tables/{catalog}.{schema}.{table}"
   *
   * For the corresponding source table in the Unity catalog look for the "source_table_full_name" attribute.
   */
  name?: string | undefined;
  /** The Unity Catalog table ID for this synced table. */
  uid?: string | undefined;
  /**
   * Configuration details of the synced table, such as the source table, scheduling policy, etc.
   * This attribute is specified at creation time and most fields are returned as is on subsequent queries.
   */
  spec?: SyncedTable_SyncedTableSpec | undefined;
  /** Synced Table data synchronization status. */
  status?: SyncedTable_SyncedTableStatus | undefined;
  createTime?: Temporal.Instant | undefined;
  /** The part of the name, chosen by the user when the resource was created. */
  syncedTableId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SyncedTable_SyncedTableSpec {
  /**
   * The Postgres database name where the synced table will be created in.
   *
   * If this synced table is created inside a Lakebase Catalog, this attribute can be omitted on creation and is inferred
   * from the postgres_database associated with the Lakebase Catalog. If specified when inside a Lakebase Catalog, the value must match.
   *
   * A value must be specified when creating a synced table inside a Standard Catalog.
   */
  postgresDatabase?: string | undefined;
  /**
   * The full resource name the branch associated with the table.
   *
   * Format: "projects/{project_id}/branches/{branch_id}".
   */
  branch?: string | undefined;
  /** Scheduling policy of the underlying pipeline. */
  schedulingPolicy?:
    | SyncedTable_SyncedTableSpec_SyncedTableSchedulingPolicy
    | undefined;
  /**
   * Three-part (catalog, schema, table) name of the source Delta table.
   *
   * For the corresponding destination table, use any of the two:
   *
   * * synced_table_id used at the creation of the SyncedTable
   * * "name" consisting of "synced_tables/" prefix and the full name of the destination table.
   */
  sourceTableFullName?: string | undefined;
  /** Primary Key columns to be used for data insert/update in the destination. */
  primaryKeyColumns?: string[] | undefined;
  /** Time series key to deduplicate (tie-break) rows with the same primary key. */
  timeseriesKey?: string | undefined;
  /**
   * ID of an existing pipeline to bin-pack this synced table into.
   * At most one of existing_pipeline_id and new_pipeline_spec should be defined.
   *
   * The pipeline used for the synced table is returned via the top level pipeline_id attribute.
   */
  existingPipelineId?: string | undefined;
  /**
   * If true, the synced table's logical database and schema resources in PG
   * will be created if they do not already exist.
   * The request will fail if this is false and the database/schema do not exist.
   *
   * Defaults to true if omitted.
   */
  createDatabaseObjectsIfMissing?: boolean | undefined;
  /**
   * Specification for creating a new pipeline.
   * At most one of existing_pipeline_id and new_pipeline_spec should be defined.
   *
   * The pipeline used for the synced table is returned via the top level pipeline_id attribute.
   */
  newPipelineSpec?: NewPipelineSpec | undefined;
  /**
   * When true, enables accelerated sync mode for the initial data load.
   * This significantly improves performance for large tables.
   * Requires workspace-level enablement through Lakebase Accelerated Sync preview.
   */
  acceleratedSync?: boolean | undefined;
  /**
   * Override the default Delta->PG type mapping for specific columns.
   * A TypeOverride with PG_SPECIFIC_TYPE_UNSPECIFIED is rejected; a valid pg_type must be set.
   */
  typeOverrides?: SyncedTable_SyncedTableSpec_TypeOverride[] | undefined;
  /** Extra PostgreSQL-only columns to add to the synced table. */
  extraColumns?: SyncedTable_SyncedTableSpec_ExtraColumn[] | undefined;
}

/** An extra PostgreSQL column to add to the synced table. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SyncedTable_SyncedTableSpec_ExtraColumn {
  /** Name of the column. */
  columnName?: string | undefined;
  /** PostgreSQL type of the column, for example "tsvector" or "vector(1024)". */
  columnType?: string | undefined;
  maintenance?: SyncedTable_SyncedTableSpec_ExtraColumn_Maintenance | undefined;
  /**
   * SQL expression used to compute the column's value, for example
   * "to_tsvector('english', content)".
   */
  compute?: string | undefined;
}

/** Overrides the default Delta-to-PostgreSQL type mapping for a single column. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SyncedTable_SyncedTableSpec_TypeOverride {
  /** Name of the source column whose target PostgreSQL type should be overridden. */
  columnName?: string | undefined;
  /** PostgreSQL-specific target type to use for the column. */
  pgType?: SyncedTable_SyncedTableSpec_PgSpecificType | undefined;
  /**
   * Size parameter for the target type, for types that take one (e.g. vector
   * dimension, varchar length). Required when the chosen pg_type needs a size.
   */
  size?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SyncedTable_SyncedTableStatus {
  /** A text description of the current state of the synced table. */
  message?: string | undefined;
  /** The state of the synced table. */
  detailedState?: SyncedTableState | undefined;
  /** Summary of the last successful synchronization from source to destination. */
  lastSync?: SyncedTablePosition | undefined;
  ongoingSyncProgress?: SyncedTablePipelineProgress | undefined;
  /** The current phase of the data synchronization pipeline. */
  provisioningPhase?: ProvisioningPhase | undefined;
  /** The last source table Delta version that was successfully synced to the synced table. */
  lastProcessedCommitVersion?: bigint | undefined;
  /**
   * The end timestamp of the last time any data was synchronized from the source table to the synced
   * table. This is when the data is available in the synced table.
   */
  lastSyncTime?: Temporal.Instant | undefined;
  /** ID of the associated pipeline. */
  pipelineId?: string | undefined;
  /** The provisioning state of the synced table entity in Unity Catalog. */
  unityCatalogProvisioningState?: ProvisioningInfo_State | undefined;
  /**
   * The full resource name of the project associated with the table.
   *
   * Format: "projects/{project_id}".
   */
  project?: string | undefined;
}

/** Metadata for SyncedTable long-running operations. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SyncedTableOperationMetadata {}

/** Progress information of the Synced Table data synchronization pipeline. */
export interface SyncedTablePipelineProgress {
  /**
   * The source table Delta version that was last processed by the pipeline. The pipeline may not
   * have completely processed this version yet.
   */
  latestVersionCurrentlyProcessing?: bigint | undefined;
  /** The number of rows that have been synced in this update. */
  syncedRowCount?: bigint | undefined;
  /** The total number of rows that need to be synced in this update. This number may be an estimate. */
  totalRowCount?: bigint | undefined;
  /** The completion ratio of this update. This is a number between 0 and 1. */
  syncProgressCompletion?: number | undefined;
  /** The estimated time remaining to complete this update in seconds. */
  estimatedCompletionTimeSeconds?: number | undefined;
}

export interface SyncedTablePosition {
  /**
   * The starting timestamp of the most recent successful synchronization from the source table
   * to the destination (synced) table.
   * Note this is the starting timestamp of the sync operation, not the end time.
   * E.g., for a batch, this is the time when the sync operation started.
   */
  syncStartTime?: Temporal.Instant | undefined;
  /**
   * The end timestamp of the most recent successful synchronization.
   * This is the time when the data is available in the synced table.
   */
  syncEndTime?: Temporal.Instant | undefined;
  /** Information about the source system at the time of the last sync. */
  sourceSyncInfo?:
    | {$case: 'deltaTableSyncInfo'; deltaTableSyncInfo: DeltaTableSyncInfo}
    | undefined;
}

export interface UndeleteBranchRequest {
  /**
   * The full resource path of the branch to undelete.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  name?: string | undefined;
}

/** Request to restore a soft-deleted project within its retention period. */
export interface UndeleteProjectRequest {
  /**
   * The full resource path of the project to undelete.
   * Format: projects/{project_id}
   */
  name?: string | undefined;
}

export interface UpdateBranchRequest {
  /**
   * The Branch to update.
   *
   * The branch's `name` field is used to identify the branch to update.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  branch?: Branch | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<Branch> | undefined;
}

/** Update Data API configuration for a database. */
export interface UpdateDataApiRequest {
  /**
   * The Data API configuration to update.
   * The data_api's `name` field identifies the resource.
   */
  dataApi?: DataApi | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<DataApi> | undefined;
}

export interface UpdateDatabaseRequest {
  /**
   * The Database to update.
   *
   * The database's `name` field is used to identify the database to update.
   * Format: projects/{project_id}/branches/{branch_id}/databases/{database_id}
   */
  database?: Database | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<Database> | undefined;
}

export interface UpdateEndpointRequest {
  /**
   * The Endpoint to update.
   *
   * The endpoint's `name` field is used to identify the endpoint to update.
   * Format: projects/{project_id}/branches/{branch_id}/endpoints/{endpoint_id}
   */
  endpoint?: Endpoint | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<Endpoint> | undefined;
}

export interface UpdateProjectRequest {
  /**
   * The Project to update.
   *
   * The project's `name` field is used to identify the project to update.
   * Format: projects/{project_id}
   */
  project?: Project | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<Project> | undefined;
}

export interface UpdateRoleRequest {
  /**
   * The Postgres Role to update.
   *
   * The role's `name` field is used to identify the role to update.
   * Format: projects/{project_id}/branches/{branch_id}/roles/{role_id}
   */
  role?: Role | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<Role> | undefined;
}

/**
 * Request to set the snapshot schedule for a branch. Returns a completed
 * long-running operation whose response is the persisted snapshot schedule.
 */
export interface UpdateSnapshotScheduleRequest {
  /**
   * The snapshot schedule to set. Its `name` identifies the branch.
   * Format: projects/{project_id}/branches/{branch_id}/snapshot-schedule
   */
  snapshotSchedule?: SnapshotSchedule | undefined;
  /**
   * Fields to update. The only updatable path is `schedule`, which replaces the
   * entire set of cadences.
   */
  updateMask?: FieldMask<SnapshotSchedule> | undefined;
}

/** Take a snapshot once per week, on the configured day at the configured hour. */
export interface WeeklySchedule {
  /** The day of the week on which to take the snapshot. */
  dayOfWeek?: DayOfWeek | undefined;
  /** The hour of the day, in UTC, at which to take the snapshot, in [0, 23]. */
  hour?: number | undefined;
}

export const unmarshalApiErrorSchema: z.ZodType<ApiError> = z
  .object({
    error_code: z.string().optional(),
    message: z.string().optional(),
    stack_trace: z.string().optional(),
    details: z.array(z.record(z.string(), z.unknown())).optional(),
  })
  .transform(d => ({
    errorCode: d.error_code,
    message: d.message,
    stackTrace: d.stack_trace,
    details: d.details,
  }));

export const unmarshalBranchSchema: z.ZodType<Branch> = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    parent: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    spec: z.lazy(() => unmarshalBranchSpecSchema).optional(),
    status: z.lazy(() => unmarshalBranchStatusSchema).optional(),
    branch_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    parent: d.parent,
    createTime: d.create_time,
    updateTime: d.update_time,
    spec: d.spec,
    status: d.status,
    branchId: d.branch_id,
  }));

export const unmarshalBranchOperationMetadataSchema: z.ZodType<BranchOperationMetadata> =
  z.object({});

export const unmarshalBranchSpecSchema: z.ZodType<BranchSpec> = z
  .object({
    source_branch: z.string().optional(),
    source_branch_lsn: z.string().optional(),
    source_branch_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    is_protected: z.boolean().optional(),
    expire_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    ttl: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    no_expiry: z.boolean().optional(),
    source_snapshot: z.string().optional(),
  })
  .transform(d => ({
    sourceBranch: d.source_branch,
    sourceBranchLsn: d.source_branch_lsn,
    sourceBranchTime: d.source_branch_time,
    isProtected: d.is_protected,
    expiration:
      d.expire_time !== undefined
        ? {$case: 'expireTime' as const, expireTime: d.expire_time}
        : d.ttl !== undefined
          ? {$case: 'ttl' as const, ttl: d.ttl}
          : d.no_expiry !== undefined
            ? {$case: 'noExpiry' as const, noExpiry: d.no_expiry}
            : undefined,
    sourceSnapshot: d.source_snapshot,
  }));

export const unmarshalBranchStatusSchema: z.ZodType<BranchStatus> = z
  .object({
    source_branch: z.string().optional(),
    source_branch_lsn: z.string().optional(),
    source_branch_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    default: z.boolean().optional(),
    is_protected: z.boolean().optional(),
    current_state: z.string().optional(),
    pending_state: z.string().optional(),
    state_change_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    logical_size_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    expire_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    branch_id: z.string().optional(),
    delete_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    purge_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    source_snapshot: z.string().optional(),
  })
  .transform(d => ({
    sourceBranch: d.source_branch,
    sourceBranchLsn: d.source_branch_lsn,
    sourceBranchTime: d.source_branch_time,
    default: d.default,
    isProtected: d.is_protected,
    currentState: d.current_state,
    pendingState: d.pending_state,
    stateChangeTime: d.state_change_time,
    logicalSizeBytes: d.logical_size_bytes,
    expireTime: d.expire_time,
    branchId: d.branch_id,
    deleteTime: d.delete_time,
    purgeTime: d.purge_time,
    sourceSnapshot: d.source_snapshot,
  }));

export const unmarshalCatalogSchema: z.ZodType<Catalog> = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    spec: z.lazy(() => unmarshalCatalog_CatalogSpecSchema).optional(),
    status: z.lazy(() => unmarshalCatalog_CatalogStatusSchema).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    catalog_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    spec: d.spec,
    status: d.status,
    createTime: d.create_time,
    updateTime: d.update_time,
    catalogId: d.catalog_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCatalog_CatalogSpecSchema: z.ZodType<Catalog_CatalogSpec> =
  z
    .object({
      postgres_database: z.string().optional(),
      create_database_if_missing: z.boolean().optional(),
      branch: z.string().optional(),
    })
    .transform(d => ({
      postgresDatabase: d.postgres_database,
      createDatabaseIfMissing: d.create_database_if_missing,
      branch: d.branch,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCatalog_CatalogStatusSchema: z.ZodType<Catalog_CatalogStatus> =
  z
    .object({
      postgres_database: z.string().optional(),
      project: z.string().optional(),
      branch: z.string().optional(),
    })
    .transform(d => ({
      postgresDatabase: d.postgres_database,
      project: d.project,
      branch: d.branch,
    }));

export const unmarshalCatalogOperationMetadataSchema: z.ZodType<CatalogOperationMetadata> =
  z.object({});

export const unmarshalCdfConfigSchema: z.ZodType<CdfConfig> = z
  .object({
    name: z.string().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    cdf_config_id: z.string().optional(),
    postgres_schema: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog: d.catalog,
    schema: d.schema,
    createTime: d.create_time,
    cdfConfigId: d.cdf_config_id,
    postgresSchema: d.postgres_schema,
  }));

export const unmarshalCdfConfigOperationMetadataSchema: z.ZodType<CdfConfigOperationMetadata> =
  z.object({});

export const unmarshalCdfStatusSchema: z.ZodType<CdfStatus> = z
  .object({
    name: z.string().optional(),
    postgres_table: z.string().optional(),
    uc_table: z.string().optional(),
    state: z.string().optional(),
    committed_lsn: z.string().optional(),
    last_sync_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    status_detail: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    postgresTable: d.postgres_table,
    ucTable: d.uc_table,
    state: d.state,
    committedLsn: d.committed_lsn,
    lastSyncTime: d.last_sync_time,
    createTime: d.create_time,
    statusDetail: d.status_detail,
  }));

export const unmarshalDailyScheduleSchema: z.ZodType<DailySchedule> = z
  .object({
    hour: z.number().optional(),
  })
  .transform(d => ({
    hour: d.hour,
  }));

export const unmarshalDataApiSchema: z.ZodType<DataApi> = z
  .object({
    name: z.string().optional(),
    parent: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    spec: z.lazy(() => unmarshalDataApi_DataApiSpecSchema).optional(),
    status: z.lazy(() => unmarshalDataApi_DataApiStatusSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    parent: d.parent,
    createTime: d.create_time,
    updateTime: d.update_time,
    spec: d.spec,
    status: d.status,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDataApi_DataApiSpecSchema: z.ZodType<DataApi_DataApiSpec> =
  z
    .object({
      db_aggregates_enabled: z.boolean().optional(),
      db_extra_search_path: z.array(z.string()).optional(),
      db_max_rows: z.number().optional(),
      db_schemas: z.array(z.string()).optional(),
      jwt_role_claim_key: z.string().optional(),
      jwt_cache_max_lifetime: z
        .string()
        .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
        .optional(),
      openapi_mode: z.string().optional(),
      server_cors_allowed_origins: z.array(z.string()).optional(),
      server_timing_enabled: z.boolean().optional(),
    })
    .transform(d => ({
      dbAggregatesEnabled: d.db_aggregates_enabled,
      dbExtraSearchPath: d.db_extra_search_path,
      dbMaxRows: d.db_max_rows,
      dbSchemas: d.db_schemas,
      jwtRoleClaimKey: d.jwt_role_claim_key,
      jwtCacheMaxLifetime: d.jwt_cache_max_lifetime,
      openapiMode: d.openapi_mode,
      serverCorsAllowedOrigins: d.server_cors_allowed_origins,
      serverTimingEnabled: d.server_timing_enabled,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDataApi_DataApiStatusSchema: z.ZodType<DataApi_DataApiStatus> =
  z
    .object({
      db_aggregates_enabled: z.boolean().optional(),
      db_extra_search_path: z.array(z.string()).optional(),
      db_max_rows: z.number().optional(),
      db_schemas: z.array(z.string()).optional(),
      jwt_role_claim_key: z.string().optional(),
      jwt_cache_max_lifetime: z
        .string()
        .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
        .optional(),
      openapi_mode: z.string().optional(),
      server_cors_allowed_origins: z.array(z.string()).optional(),
      server_timing_enabled: z.boolean().optional(),
      url: z.string().optional(),
      available_schemas: z.array(z.string()).optional(),
    })
    .transform(d => ({
      dbAggregatesEnabled: d.db_aggregates_enabled,
      dbExtraSearchPath: d.db_extra_search_path,
      dbMaxRows: d.db_max_rows,
      dbSchemas: d.db_schemas,
      jwtRoleClaimKey: d.jwt_role_claim_key,
      jwtCacheMaxLifetime: d.jwt_cache_max_lifetime,
      openapiMode: d.openapi_mode,
      serverCorsAllowedOrigins: d.server_cors_allowed_origins,
      serverTimingEnabled: d.server_timing_enabled,
      url: d.url,
      availableSchemas: d.available_schemas,
    }));

export const unmarshalDataApiOperationMetadataSchema: z.ZodType<DataApiOperationMetadata> =
  z.object({});

export const unmarshalDatabaseSchema: z.ZodType<Database> = z
  .object({
    name: z.string().optional(),
    parent: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    spec: z.lazy(() => unmarshalDatabase_DatabaseSpecSchema).optional(),
    status: z.lazy(() => unmarshalDatabase_DatabaseStatusSchema).optional(),
    database_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    parent: d.parent,
    createTime: d.create_time,
    updateTime: d.update_time,
    spec: d.spec,
    status: d.status,
    databaseId: d.database_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDatabase_DatabaseSpecSchema: z.ZodType<Database_DatabaseSpec> =
  z
    .object({
      role: z.string().optional(),
      postgres_database: z.string().optional(),
    })
    .transform(d => ({
      role: d.role,
      postgresDatabase: d.postgres_database,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDatabase_DatabaseStatusSchema: z.ZodType<Database_DatabaseStatus> =
  z
    .object({
      role: z.string().optional(),
      postgres_database: z.string().optional(),
      database_id: z.string().optional(),
    })
    .transform(d => ({
      role: d.role,
      postgresDatabase: d.postgres_database,
      databaseId: d.database_id,
    }));

export const unmarshalDatabaseCredentialSchema: z.ZodType<DatabaseCredential> =
  z
    .object({
      token: z.string().optional(),
      expire_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      token: d.token,
      expireTime: d.expire_time,
    }));

export const unmarshalDatabaseOperationMetadataSchema: z.ZodType<DatabaseOperationMetadata> =
  z.object({});

export const unmarshalDeltaTableSyncInfoSchema: z.ZodType<DeltaTableSyncInfo> =
  z
    .object({
      delta_commit_version: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      delta_commit_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      deltaCommitVersion: d.delta_commit_version,
      deltaCommitTime: d.delta_commit_time,
    }));

export const unmarshalEndpointSchema: z.ZodType<Endpoint> = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    parent: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    spec: z.lazy(() => unmarshalEndpointSpecSchema).optional(),
    status: z.lazy(() => unmarshalEndpointStatusSchema).optional(),
    endpoint_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    parent: d.parent,
    createTime: d.create_time,
    updateTime: d.update_time,
    spec: d.spec,
    status: d.status,
    endpointId: d.endpoint_id,
  }));

export const unmarshalEndpointGroupSpecSchema: z.ZodType<EndpointGroupSpec> = z
  .object({
    min: z.number().optional(),
    max: z.number().optional(),
    enable_readable_secondaries: z.boolean().optional(),
  })
  .transform(d => ({
    min: d.min,
    max: d.max,
    enableReadableSecondaries: d.enable_readable_secondaries,
  }));

export const unmarshalEndpointGroupStatusSchema: z.ZodType<EndpointGroupStatus> =
  z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      enable_readable_secondaries: z.boolean().optional(),
    })
    .transform(d => ({
      min: d.min,
      max: d.max,
      enableReadableSecondaries: d.enable_readable_secondaries,
    }));

export const unmarshalEndpointHostsSchema: z.ZodType<EndpointHosts> = z
  .object({
    host: z.string().optional(),
    read_only_host: z.string().optional(),
    read_write_pooled_host: z.string().optional(),
    read_only_pooled_host: z.string().optional(),
  })
  .transform(d => ({
    host: d.host,
    readOnlyHost: d.read_only_host,
    readWritePooledHost: d.read_write_pooled_host,
    readOnlyPooledHost: d.read_only_pooled_host,
  }));

export const unmarshalEndpointOperationMetadataSchema: z.ZodType<EndpointOperationMetadata> =
  z.object({});

export const unmarshalEndpointSettingsSchema: z.ZodType<EndpointSettings> = z
  .object({
    pg_settings: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    pgSettings: d.pg_settings,
  }));

export const unmarshalEndpointSpecSchema: z.ZodType<EndpointSpec> = z
  .object({
    endpoint_type: z.string().optional(),
    autoscaling_limit_min_cu: z.number().optional(),
    autoscaling_limit_max_cu: z.number().optional(),
    disabled: z.boolean().optional(),
    suspend_timeout_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    no_suspension: z.boolean().optional(),
    settings: z.lazy(() => unmarshalEndpointSettingsSchema).optional(),
    group: z.lazy(() => unmarshalEndpointGroupSpecSchema).optional(),
  })
  .transform(d => ({
    endpointType: d.endpoint_type,
    autoscalingLimitMinCu: d.autoscaling_limit_min_cu,
    autoscalingLimitMaxCu: d.autoscaling_limit_max_cu,
    disabled: d.disabled,
    suspension:
      d.suspend_timeout_duration !== undefined
        ? {
            $case: 'suspendTimeoutDuration' as const,
            suspendTimeoutDuration: d.suspend_timeout_duration,
          }
        : d.no_suspension !== undefined
          ? {$case: 'noSuspension' as const, noSuspension: d.no_suspension}
          : undefined,
    settings: d.settings,
    group: d.group,
  }));

export const unmarshalEndpointStatusSchema: z.ZodType<EndpointStatus> = z
  .object({
    endpoint_type: z.string().optional(),
    hosts: z.lazy(() => unmarshalEndpointHostsSchema).optional(),
    last_active_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    autoscaling_limit_min_cu: z.number().optional(),
    autoscaling_limit_max_cu: z.number().optional(),
    current_state: z.string().optional(),
    pending_state: z.string().optional(),
    disabled: z.boolean().optional(),
    suspend_timeout_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    settings: z.lazy(() => unmarshalEndpointSettingsSchema).optional(),
    group: z.lazy(() => unmarshalEndpointGroupStatusSchema).optional(),
    endpoint_id: z.string().optional(),
  })
  .transform(d => ({
    endpointType: d.endpoint_type,
    hosts: d.hosts,
    lastActiveTime: d.last_active_time,
    autoscalingLimitMinCu: d.autoscaling_limit_min_cu,
    autoscalingLimitMaxCu: d.autoscaling_limit_max_cu,
    currentState: d.current_state,
    pendingState: d.pending_state,
    disabled: d.disabled,
    suspendTimeoutDuration: d.suspend_timeout_duration,
    settings: d.settings,
    group: d.group,
    endpointId: d.endpoint_id,
  }));

export const unmarshalInitialBranchSpecSchema: z.ZodType<InitialBranchSpec> = z
  .object({
    is_protected: z.boolean().optional(),
  })
  .transform(d => ({
    isProtected: d.is_protected,
  }));

export const unmarshalInitialEndpointSpecSchema: z.ZodType<InitialEndpointSpec> =
  z
    .object({
      group: z.lazy(() => unmarshalEndpointGroupSpecSchema).optional(),
      autoscaling_limit_min_cu: z.number().optional(),
      autoscaling_limit_max_cu: z.number().optional(),
      suspend_timeout_duration: z
        .string()
        .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
        .optional(),
      no_suspension: z.boolean().optional(),
    })
    .transform(d => ({
      group: d.group,
      autoscalingLimitMinCu: d.autoscaling_limit_min_cu,
      autoscalingLimitMaxCu: d.autoscaling_limit_max_cu,
      suspension:
        d.suspend_timeout_duration !== undefined
          ? {
              $case: 'suspendTimeoutDuration' as const,
              suspendTimeoutDuration: d.suspend_timeout_duration,
            }
          : d.no_suspension !== undefined
            ? {$case: 'noSuspension' as const, noSuspension: d.no_suspension}
            : undefined,
    }));

export const unmarshalListBranchesResponseSchema: z.ZodType<ListBranchesResponse> =
  z
    .object({
      branches: z.array(z.lazy(() => unmarshalBranchSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      branches: d.branches,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListCdfConfigsResponseSchema: z.ZodType<ListCdfConfigsResponse> =
  z
    .object({
      cdf_configs: z.array(z.lazy(() => unmarshalCdfConfigSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      cdfConfigs: d.cdf_configs,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListCdfStatusesResponseSchema: z.ZodType<ListCdfStatusesResponse> =
  z
    .object({
      cdf_statuses: z.array(z.lazy(() => unmarshalCdfStatusSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      cdfStatuses: d.cdf_statuses,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListDatabasesResponseSchema: z.ZodType<ListDatabasesResponse> =
  z
    .object({
      databases: z.array(z.lazy(() => unmarshalDatabaseSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      databases: d.databases,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListEndpointsResponseSchema: z.ZodType<ListEndpointsResponse> =
  z
    .object({
      endpoints: z.array(z.lazy(() => unmarshalEndpointSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      endpoints: d.endpoints,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListProjectsResponseSchema: z.ZodType<ListProjectsResponse> =
  z
    .object({
      projects: z.array(z.lazy(() => unmarshalProjectSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      projects: d.projects,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListRolesResponseSchema: z.ZodType<ListRolesResponse> = z
  .object({
    roles: z.array(z.lazy(() => unmarshalRoleSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    roles: d.roles,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListSnapshotsResponseSchema: z.ZodType<ListSnapshotsResponse> =
  z
    .object({
      snapshots: z.array(z.lazy(() => unmarshalSnapshotSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      snapshots: d.snapshots,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMonthlyScheduleSchema: z.ZodType<MonthlySchedule> = z
  .object({
    day: z.number().optional(),
    hour: z.number().optional(),
  })
  .transform(d => ({
    day: d.day,
    hour: d.hour,
  }));

export const unmarshalNewPipelineSpecSchema: z.ZodType<NewPipelineSpec> = z
  .object({
    storage_catalog: z.string().optional(),
    storage_schema: z.string().optional(),
    budget_policy_id: z.string().optional(),
    pipeline_channel: z.string().optional(),
  })
  .transform(d => ({
    storageCatalog: d.storage_catalog,
    storageSchema: d.storage_schema,
    budgetPolicyId: d.budget_policy_id,
    pipelineChannel: d.pipeline_channel,
  }));

export const unmarshalOperationSchema: z.ZodType<Operation> = z
  .object({
    name: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    done: z.boolean().optional(),
    error: z.lazy(() => unmarshalApiErrorSchema).optional(),
    response: z.record(z.string(), z.unknown()).optional(),
  })
  .transform(d => ({
    name: d.name,
    metadata: d.metadata,
    done: d.done,
    result:
      d.error !== undefined
        ? {$case: 'error' as const, error: d.error}
        : d.response !== undefined
          ? {$case: 'response' as const, response: d.response}
          : undefined,
  }));

export const unmarshalProjectSchema: z.ZodType<Project> = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    spec: z.lazy(() => unmarshalProjectSpecSchema).optional(),
    status: z.lazy(() => unmarshalProjectStatusSchema).optional(),
    initial_endpoint_spec: z
      .lazy(() => unmarshalInitialEndpointSpecSchema)
      .optional(),
    delete_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    purge_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    initial_branch_spec: z
      .lazy(() => unmarshalInitialBranchSpecSchema)
      .optional(),
    project_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    createTime: d.create_time,
    updateTime: d.update_time,
    spec: d.spec,
    status: d.status,
    initialEndpointSpec: d.initial_endpoint_spec,
    deleteTime: d.delete_time,
    purgeTime: d.purge_time,
    initialBranchSpec: d.initial_branch_spec,
    projectId: d.project_id,
  }));

export const unmarshalProjectCustomTagSchema: z.ZodType<ProjectCustomTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalProjectDefaultEndpointSettingsSchema: z.ZodType<ProjectDefaultEndpointSettings> =
  z
    .object({
      autoscaling_limit_min_cu: z.number().optional(),
      autoscaling_limit_max_cu: z.number().optional(),
      suspend_timeout_duration: z
        .string()
        .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
        .optional(),
      no_suspension: z.boolean().optional(),
      pg_settings: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      autoscalingLimitMinCu: d.autoscaling_limit_min_cu,
      autoscalingLimitMaxCu: d.autoscaling_limit_max_cu,
      suspension:
        d.suspend_timeout_duration !== undefined
          ? {
              $case: 'suspendTimeoutDuration' as const,
              suspendTimeoutDuration: d.suspend_timeout_duration,
            }
          : d.no_suspension !== undefined
            ? {$case: 'noSuspension' as const, noSuspension: d.no_suspension}
            : undefined,
      pgSettings: d.pg_settings,
    }));

export const unmarshalProjectOperationMetadataSchema: z.ZodType<ProjectOperationMetadata> =
  z.object({});

export const unmarshalProjectSpecSchema: z.ZodType<ProjectSpec> = z
  .object({
    display_name: z.string().optional(),
    pg_version: z.number().optional(),
    history_retention_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    default_endpoint_settings: z
      .lazy(() => unmarshalProjectDefaultEndpointSettingsSchema)
      .optional(),
    budget_policy_id: z.string().optional(),
    custom_tags: z
      .array(z.lazy(() => unmarshalProjectCustomTagSchema))
      .optional(),
    enable_pg_native_login: z.boolean().optional(),
    default_branch: z.string().optional(),
  })
  .transform(d => ({
    displayName: d.display_name,
    pgVersion: d.pg_version,
    historyRetentionDuration: d.history_retention_duration,
    defaultEndpointSettings: d.default_endpoint_settings,
    budgetPolicyId: d.budget_policy_id,
    customTags: d.custom_tags,
    enablePgNativeLogin: d.enable_pg_native_login,
    defaultBranch: d.default_branch,
  }));

export const unmarshalProjectStatusSchema: z.ZodType<ProjectStatus> = z
  .object({
    display_name: z.string().optional(),
    pg_version: z.number().optional(),
    history_retention_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    default_endpoint_settings: z
      .lazy(() => unmarshalProjectDefaultEndpointSettingsSchema)
      .optional(),
    branch_logical_size_limit_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    synthetic_storage_size_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    compute_last_active_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    budget_policy_id: z.string().optional(),
    custom_tags: z
      .array(z.lazy(() => unmarshalProjectCustomTagSchema))
      .optional(),
    owner: z.string().optional(),
    enable_pg_native_login: z.boolean().optional(),
    default_branch: z.string().optional(),
    project_id: z.string().optional(),
  })
  .transform(d => ({
    displayName: d.display_name,
    pgVersion: d.pg_version,
    historyRetentionDuration: d.history_retention_duration,
    defaultEndpointSettings: d.default_endpoint_settings,
    branchLogicalSizeLimitBytes: d.branch_logical_size_limit_bytes,
    syntheticStorageSizeBytes: d.synthetic_storage_size_bytes,
    computeLastActiveTime: d.compute_last_active_time,
    budgetPolicyId: d.budget_policy_id,
    customTags: d.custom_tags,
    owner: d.owner,
    enablePgNativeLogin: d.enable_pg_native_login,
    defaultBranch: d.default_branch,
    projectId: d.project_id,
  }));

export const unmarshalRoleSchema: z.ZodType<Role> = z
  .object({
    name: z.string().optional(),
    parent: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    spec: z.lazy(() => unmarshalRole_RoleSpecSchema).optional(),
    status: z.lazy(() => unmarshalRole_RoleStatusSchema).optional(),
    role_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    parent: d.parent,
    createTime: d.create_time,
    updateTime: d.update_time,
    spec: d.spec,
    status: d.status,
    roleId: d.role_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRole_AttributesSchema: z.ZodType<Role_Attributes> = z
  .object({
    createdb: z.boolean().optional(),
    createrole: z.boolean().optional(),
    bypassrls: z.boolean().optional(),
  })
  .transform(d => ({
    createdb: d.createdb,
    createrole: d.createrole,
    bypassrls: d.bypassrls,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRole_RoleSpecSchema: z.ZodType<Role_RoleSpec> = z
  .object({
    membership_roles: z.array(z.string()).optional(),
    identity_type: z.string().optional(),
    attributes: z.lazy(() => unmarshalRole_AttributesSchema).optional(),
    auth_method: z.string().optional(),
    postgres_role: z.string().optional(),
  })
  .transform(d => ({
    membershipRoles: d.membership_roles,
    identityType: d.identity_type,
    attributes: d.attributes,
    authMethod: d.auth_method,
    postgresRole: d.postgres_role,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRole_RoleStatusSchema: z.ZodType<Role_RoleStatus> = z
  .object({
    membership_roles: z.array(z.string()).optional(),
    identity_type: z.string().optional(),
    attributes: z.lazy(() => unmarshalRole_AttributesSchema).optional(),
    auth_method: z.string().optional(),
    postgres_role: z.string().optional(),
    role_id: z.string().optional(),
  })
  .transform(d => ({
    membershipRoles: d.membership_roles,
    identityType: d.identity_type,
    attributes: d.attributes,
    authMethod: d.auth_method,
    postgresRole: d.postgres_role,
    roleId: d.role_id,
  }));

export const unmarshalRoleOperationMetadataSchema: z.ZodType<RoleOperationMetadata> =
  z.object({});

export const unmarshalScheduleCadenceSchema: z.ZodType<ScheduleCadence> = z
  .object({
    daily_schedule: z.lazy(() => unmarshalDailyScheduleSchema).optional(),
    weekly_schedule: z.lazy(() => unmarshalWeeklyScheduleSchema).optional(),
    monthly_schedule: z.lazy(() => unmarshalMonthlyScheduleSchema).optional(),
    retention: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
  })
  .transform(d => ({
    schedule:
      d.daily_schedule !== undefined
        ? {$case: 'dailySchedule' as const, dailySchedule: d.daily_schedule}
        : d.weekly_schedule !== undefined
          ? {
              $case: 'weeklySchedule' as const,
              weeklySchedule: d.weekly_schedule,
            }
          : d.monthly_schedule !== undefined
            ? {
                $case: 'monthlySchedule' as const,
                monthlySchedule: d.monthly_schedule,
              }
            : undefined,
    retention: d.retention,
  }));

export const unmarshalSnapshotSchema: z.ZodType<Snapshot> = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    spec: z.lazy(() => unmarshalSnapshotSpecSchema).optional(),
    status: z.lazy(() => unmarshalSnapshotStatusSchema).optional(),
    snapshot_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    createTime: d.create_time,
    spec: d.spec,
    status: d.status,
    snapshotId: d.snapshot_id,
  }));

export const unmarshalSnapshotOperationMetadataSchema: z.ZodType<SnapshotOperationMetadata> =
  z.object({});

export const unmarshalSnapshotScheduleSchema: z.ZodType<SnapshotSchedule> = z
  .object({
    name: z.string().optional(),
    schedule: z.array(z.lazy(() => unmarshalScheduleCadenceSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    schedule: d.schedule,
  }));

export const unmarshalSnapshotScheduleOperationMetadataSchema: z.ZodType<SnapshotScheduleOperationMetadata> =
  z.object({});

export const unmarshalSnapshotSpecSchema: z.ZodType<SnapshotSpec> = z
  .object({
    source_branch: z.string().optional(),
    source_branch_lsn: z.string().optional(),
    source_branch_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    expire_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    ttl: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    no_expiry: z.boolean().optional(),
  })
  .transform(d => ({
    sourceBranch: d.source_branch,
    pointInTime:
      d.source_branch_lsn !== undefined
        ? {
            $case: 'sourceBranchLsn' as const,
            sourceBranchLsn: d.source_branch_lsn,
          }
        : d.source_branch_time !== undefined
          ? {
              $case: 'sourceBranchTime' as const,
              sourceBranchTime: d.source_branch_time,
            }
          : undefined,
    expiration:
      d.expire_time !== undefined
        ? {$case: 'expireTime' as const, expireTime: d.expire_time}
        : d.ttl !== undefined
          ? {$case: 'ttl' as const, ttl: d.ttl}
          : d.no_expiry !== undefined
            ? {$case: 'noExpiry' as const, noExpiry: d.no_expiry}
            : undefined,
  }));

export const unmarshalSnapshotStatusSchema: z.ZodType<SnapshotStatus> = z
  .object({
    source_branch: z.string().optional(),
    expire_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    no_expiry: z.boolean().optional(),
    full_size_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    diff_size_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    sourceBranch: d.source_branch,
    expiration:
      d.expire_time !== undefined
        ? {$case: 'expireTime' as const, expireTime: d.expire_time}
        : d.no_expiry !== undefined
          ? {$case: 'noExpiry' as const, noExpiry: d.no_expiry}
          : undefined,
    fullSizeBytes: d.full_size_bytes,
    diffSizeBytes: d.diff_size_bytes,
  }));

export const unmarshalSyncedTableSchema: z.ZodType<SyncedTable> = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    spec: z.lazy(() => unmarshalSyncedTable_SyncedTableSpecSchema).optional(),
    status: z
      .lazy(() => unmarshalSyncedTable_SyncedTableStatusSchema)
      .optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    synced_table_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    spec: d.spec,
    status: d.status,
    createTime: d.create_time,
    syncedTableId: d.synced_table_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSyncedTable_SyncedTableSpecSchema: z.ZodType<SyncedTable_SyncedTableSpec> =
  z
    .object({
      postgres_database: z.string().optional(),
      branch: z.string().optional(),
      scheduling_policy: z.string().optional(),
      source_table_full_name: z.string().optional(),
      primary_key_columns: z.array(z.string()).optional(),
      timeseries_key: z.string().optional(),
      existing_pipeline_id: z.string().optional(),
      create_database_objects_if_missing: z.boolean().optional(),
      new_pipeline_spec: z
        .lazy(() => unmarshalNewPipelineSpecSchema)
        .optional(),
      accelerated_sync: z.boolean().optional(),
      type_overrides: z
        .array(
          z.lazy(() => unmarshalSyncedTable_SyncedTableSpec_TypeOverrideSchema)
        )
        .optional(),
      extra_columns: z
        .array(
          z.lazy(() => unmarshalSyncedTable_SyncedTableSpec_ExtraColumnSchema)
        )
        .optional(),
    })
    .transform(d => ({
      postgresDatabase: d.postgres_database,
      branch: d.branch,
      schedulingPolicy: d.scheduling_policy,
      sourceTableFullName: d.source_table_full_name,
      primaryKeyColumns: d.primary_key_columns,
      timeseriesKey: d.timeseries_key,
      existingPipelineId: d.existing_pipeline_id,
      createDatabaseObjectsIfMissing: d.create_database_objects_if_missing,
      newPipelineSpec: d.new_pipeline_spec,
      acceleratedSync: d.accelerated_sync,
      typeOverrides: d.type_overrides,
      extraColumns: d.extra_columns,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSyncedTable_SyncedTableSpec_ExtraColumnSchema: z.ZodType<SyncedTable_SyncedTableSpec_ExtraColumn> =
  z
    .object({
      column_name: z.string().optional(),
      column_type: z.string().optional(),
      maintenance: z.string().optional(),
      compute: z.string().optional(),
    })
    .transform(d => ({
      columnName: d.column_name,
      columnType: d.column_type,
      maintenance: d.maintenance,
      compute: d.compute,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSyncedTable_SyncedTableSpec_TypeOverrideSchema: z.ZodType<SyncedTable_SyncedTableSpec_TypeOverride> =
  z
    .object({
      column_name: z.string().optional(),
      pg_type: z.string().optional(),
      size: z.number().optional(),
    })
    .transform(d => ({
      columnName: d.column_name,
      pgType: d.pg_type,
      size: d.size,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSyncedTable_SyncedTableStatusSchema: z.ZodType<SyncedTable_SyncedTableStatus> =
  z
    .object({
      message: z.string().optional(),
      detailed_state: z.string().optional(),
      last_sync: z.lazy(() => unmarshalSyncedTablePositionSchema).optional(),
      ongoing_sync_progress: z
        .lazy(() => unmarshalSyncedTablePipelineProgressSchema)
        .optional(),
      provisioning_phase: z.string().optional(),
      last_processed_commit_version: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      last_sync_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      pipeline_id: z.string().optional(),
      unity_catalog_provisioning_state: z.string().optional(),
      project: z.string().optional(),
    })
    .transform(d => ({
      message: d.message,
      detailedState: d.detailed_state,
      lastSync: d.last_sync,
      ongoingSyncProgress: d.ongoing_sync_progress,
      provisioningPhase: d.provisioning_phase,
      lastProcessedCommitVersion: d.last_processed_commit_version,
      lastSyncTime: d.last_sync_time,
      pipelineId: d.pipeline_id,
      unityCatalogProvisioningState: d.unity_catalog_provisioning_state,
      project: d.project,
    }));

export const unmarshalSyncedTableOperationMetadataSchema: z.ZodType<SyncedTableOperationMetadata> =
  z.object({});

export const unmarshalSyncedTablePipelineProgressSchema: z.ZodType<SyncedTablePipelineProgress> =
  z
    .object({
      latest_version_currently_processing: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      synced_row_count: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      total_row_count: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      sync_progress_completion: z.number().optional(),
      estimated_completion_time_seconds: z.number().optional(),
    })
    .transform(d => ({
      latestVersionCurrentlyProcessing: d.latest_version_currently_processing,
      syncedRowCount: d.synced_row_count,
      totalRowCount: d.total_row_count,
      syncProgressCompletion: d.sync_progress_completion,
      estimatedCompletionTimeSeconds: d.estimated_completion_time_seconds,
    }));

export const unmarshalSyncedTablePositionSchema: z.ZodType<SyncedTablePosition> =
  z
    .object({
      sync_start_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      sync_end_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      delta_table_sync_info: z
        .lazy(() => unmarshalDeltaTableSyncInfoSchema)
        .optional(),
    })
    .transform(d => ({
      syncStartTime: d.sync_start_time,
      syncEndTime: d.sync_end_time,
      sourceSyncInfo:
        d.delta_table_sync_info !== undefined
          ? {
              $case: 'deltaTableSyncInfo' as const,
              deltaTableSyncInfo: d.delta_table_sync_info,
            }
          : undefined,
    }));

export const unmarshalWeeklyScheduleSchema: z.ZodType<WeeklySchedule> = z
  .object({
    day_of_week: z.string().optional(),
    hour: z.number().optional(),
  })
  .transform(d => ({
    dayOfWeek: d.day_of_week,
    hour: d.hour,
  }));

export const marshalBranchSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    parent: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    spec: z.lazy(() => marshalBranchSpecSchema).optional(),
    status: z.lazy(() => marshalBranchStatusSchema).optional(),
    branchId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    parent: d.parent,
    create_time: d.createTime,
    update_time: d.updateTime,
    spec: d.spec,
    status: d.status,
    branch_id: d.branchId,
  }));

export const marshalBranchSpecSchema: z.ZodType = z
  .object({
    sourceBranch: z.string().optional(),
    sourceBranchLsn: z.string().optional(),
    sourceBranchTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    isProtected: z.boolean().optional(),
    expiration: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('expireTime'),
          expireTime: z.any().transform((d: Temporal.Instant) => d.toString()),
        }),
        z.object({
          $case: z.literal('ttl'),
          ttl: z
            .any()
            .transform((d: Temporal.Duration) =>
              d.toString().slice(2).toLowerCase()
            ),
        }),
        z.object({$case: z.literal('noExpiry'), noExpiry: z.boolean()}),
      ])
      .optional(),
    sourceSnapshot: z.string().optional(),
  })
  .transform(d => ({
    source_branch: d.sourceBranch,
    source_branch_lsn: d.sourceBranchLsn,
    source_branch_time: d.sourceBranchTime,
    is_protected: d.isProtected,
    ...(d.expiration?.$case === 'expireTime' && {
      expire_time: d.expiration.expireTime,
    }),
    ...(d.expiration?.$case === 'ttl' && {ttl: d.expiration.ttl}),
    ...(d.expiration?.$case === 'noExpiry' && {
      no_expiry: d.expiration.noExpiry,
    }),
    source_snapshot: d.sourceSnapshot,
  }));

export const marshalBranchStatusSchema: z.ZodType = z
  .object({
    sourceBranch: z.string().optional(),
    sourceBranchLsn: z.string().optional(),
    sourceBranchTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    default: z.boolean().optional(),
    isProtected: z.boolean().optional(),
    currentState: z.string().optional(),
    pendingState: z.string().optional(),
    stateChangeTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    logicalSizeBytes: z.bigint().optional(),
    expireTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    branchId: z.string().optional(),
    deleteTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    purgeTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    sourceSnapshot: z.string().optional(),
  })
  .transform(d => ({
    source_branch: d.sourceBranch,
    source_branch_lsn: d.sourceBranchLsn,
    source_branch_time: d.sourceBranchTime,
    default: d.default,
    is_protected: d.isProtected,
    current_state: d.currentState,
    pending_state: d.pendingState,
    state_change_time: d.stateChangeTime,
    logical_size_bytes: d.logicalSizeBytes,
    expire_time: d.expireTime,
    branch_id: d.branchId,
    delete_time: d.deleteTime,
    purge_time: d.purgeTime,
    source_snapshot: d.sourceSnapshot,
  }));

export const marshalCatalogSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    spec: z.lazy(() => marshalCatalog_CatalogSpecSchema).optional(),
    status: z.lazy(() => marshalCatalog_CatalogStatusSchema).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    catalogId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    spec: d.spec,
    status: d.status,
    create_time: d.createTime,
    update_time: d.updateTime,
    catalog_id: d.catalogId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCatalog_CatalogSpecSchema: z.ZodType = z
  .object({
    postgresDatabase: z.string().optional(),
    createDatabaseIfMissing: z.boolean().optional(),
    branch: z.string().optional(),
  })
  .transform(d => ({
    postgres_database: d.postgresDatabase,
    create_database_if_missing: d.createDatabaseIfMissing,
    branch: d.branch,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCatalog_CatalogStatusSchema: z.ZodType = z
  .object({
    postgresDatabase: z.string().optional(),
    project: z.string().optional(),
    branch: z.string().optional(),
  })
  .transform(d => ({
    postgres_database: d.postgresDatabase,
    project: d.project,
    branch: d.branch,
  }));

export const marshalCdfConfigSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    cdfConfigId: z.string().optional(),
    postgresSchema: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog: d.catalog,
    schema: d.schema,
    create_time: d.createTime,
    cdf_config_id: d.cdfConfigId,
    postgres_schema: d.postgresSchema,
  }));

export const marshalDailyScheduleSchema: z.ZodType = z
  .object({
    hour: z.number().optional(),
  })
  .transform(d => ({
    hour: d.hour,
  }));

export const marshalDataApiSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    parent: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    spec: z.lazy(() => marshalDataApi_DataApiSpecSchema).optional(),
    status: z.lazy(() => marshalDataApi_DataApiStatusSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    parent: d.parent,
    create_time: d.createTime,
    update_time: d.updateTime,
    spec: d.spec,
    status: d.status,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDataApi_DataApiSpecSchema: z.ZodType = z
  .object({
    dbAggregatesEnabled: z.boolean().optional(),
    dbExtraSearchPath: z.array(z.string()).optional(),
    dbMaxRows: z.number().optional(),
    dbSchemas: z.array(z.string()).optional(),
    jwtRoleClaimKey: z.string().optional(),
    jwtCacheMaxLifetime: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    openapiMode: z.string().optional(),
    serverCorsAllowedOrigins: z.array(z.string()).optional(),
    serverTimingEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    db_aggregates_enabled: d.dbAggregatesEnabled,
    db_extra_search_path: d.dbExtraSearchPath,
    db_max_rows: d.dbMaxRows,
    db_schemas: d.dbSchemas,
    jwt_role_claim_key: d.jwtRoleClaimKey,
    jwt_cache_max_lifetime: d.jwtCacheMaxLifetime,
    openapi_mode: d.openapiMode,
    server_cors_allowed_origins: d.serverCorsAllowedOrigins,
    server_timing_enabled: d.serverTimingEnabled,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDataApi_DataApiStatusSchema: z.ZodType = z
  .object({
    dbAggregatesEnabled: z.boolean().optional(),
    dbExtraSearchPath: z.array(z.string()).optional(),
    dbMaxRows: z.number().optional(),
    dbSchemas: z.array(z.string()).optional(),
    jwtRoleClaimKey: z.string().optional(),
    jwtCacheMaxLifetime: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    openapiMode: z.string().optional(),
    serverCorsAllowedOrigins: z.array(z.string()).optional(),
    serverTimingEnabled: z.boolean().optional(),
    url: z.string().optional(),
    availableSchemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    db_aggregates_enabled: d.dbAggregatesEnabled,
    db_extra_search_path: d.dbExtraSearchPath,
    db_max_rows: d.dbMaxRows,
    db_schemas: d.dbSchemas,
    jwt_role_claim_key: d.jwtRoleClaimKey,
    jwt_cache_max_lifetime: d.jwtCacheMaxLifetime,
    openapi_mode: d.openapiMode,
    server_cors_allowed_origins: d.serverCorsAllowedOrigins,
    server_timing_enabled: d.serverTimingEnabled,
    url: d.url,
    available_schemas: d.availableSchemas,
  }));

export const marshalDatabaseSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    parent: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    spec: z.lazy(() => marshalDatabase_DatabaseSpecSchema).optional(),
    status: z.lazy(() => marshalDatabase_DatabaseStatusSchema).optional(),
    databaseId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    parent: d.parent,
    create_time: d.createTime,
    update_time: d.updateTime,
    spec: d.spec,
    status: d.status,
    database_id: d.databaseId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDatabase_DatabaseSpecSchema: z.ZodType = z
  .object({
    role: z.string().optional(),
    postgresDatabase: z.string().optional(),
  })
  .transform(d => ({
    role: d.role,
    postgres_database: d.postgresDatabase,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDatabase_DatabaseStatusSchema: z.ZodType = z
  .object({
    role: z.string().optional(),
    postgresDatabase: z.string().optional(),
    databaseId: z.string().optional(),
  })
  .transform(d => ({
    role: d.role,
    postgres_database: d.postgresDatabase,
    database_id: d.databaseId,
  }));

export const marshalDeltaTableSyncInfoSchema: z.ZodType = z
  .object({
    deltaCommitVersion: z.bigint().optional(),
    deltaCommitTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    delta_commit_version: d.deltaCommitVersion,
    delta_commit_time: d.deltaCommitTime,
  }));

export const marshalEndpointSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    parent: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    spec: z.lazy(() => marshalEndpointSpecSchema).optional(),
    status: z.lazy(() => marshalEndpointStatusSchema).optional(),
    endpointId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    parent: d.parent,
    create_time: d.createTime,
    update_time: d.updateTime,
    spec: d.spec,
    status: d.status,
    endpoint_id: d.endpointId,
  }));

export const marshalEndpointGroupSpecSchema: z.ZodType = z
  .object({
    min: z.number().optional(),
    max: z.number().optional(),
    enableReadableSecondaries: z.boolean().optional(),
  })
  .transform(d => ({
    min: d.min,
    max: d.max,
    enable_readable_secondaries: d.enableReadableSecondaries,
  }));

export const marshalEndpointGroupStatusSchema: z.ZodType = z
  .object({
    min: z.number().optional(),
    max: z.number().optional(),
    enableReadableSecondaries: z.boolean().optional(),
  })
  .transform(d => ({
    min: d.min,
    max: d.max,
    enable_readable_secondaries: d.enableReadableSecondaries,
  }));

export const marshalEndpointHostsSchema: z.ZodType = z
  .object({
    host: z.string().optional(),
    readOnlyHost: z.string().optional(),
    readWritePooledHost: z.string().optional(),
    readOnlyPooledHost: z.string().optional(),
  })
  .transform(d => ({
    host: d.host,
    read_only_host: d.readOnlyHost,
    read_write_pooled_host: d.readWritePooledHost,
    read_only_pooled_host: d.readOnlyPooledHost,
  }));

export const marshalEndpointSettingsSchema: z.ZodType = z
  .object({
    pgSettings: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    pg_settings: d.pgSettings,
  }));

export const marshalEndpointSpecSchema: z.ZodType = z
  .object({
    endpointType: z.string().optional(),
    autoscalingLimitMinCu: z.number().optional(),
    autoscalingLimitMaxCu: z.number().optional(),
    disabled: z.boolean().optional(),
    suspension: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('suspendTimeoutDuration'),
          suspendTimeoutDuration: z
            .any()
            .transform((d: Temporal.Duration) =>
              d.toString().slice(2).toLowerCase()
            ),
        }),
        z.object({$case: z.literal('noSuspension'), noSuspension: z.boolean()}),
      ])
      .optional(),
    settings: z.lazy(() => marshalEndpointSettingsSchema).optional(),
    group: z.lazy(() => marshalEndpointGroupSpecSchema).optional(),
  })
  .transform(d => ({
    endpoint_type: d.endpointType,
    autoscaling_limit_min_cu: d.autoscalingLimitMinCu,
    autoscaling_limit_max_cu: d.autoscalingLimitMaxCu,
    disabled: d.disabled,
    ...(d.suspension?.$case === 'suspendTimeoutDuration' && {
      suspend_timeout_duration: d.suspension.suspendTimeoutDuration,
    }),
    ...(d.suspension?.$case === 'noSuspension' && {
      no_suspension: d.suspension.noSuspension,
    }),
    settings: d.settings,
    group: d.group,
  }));

export const marshalEndpointStatusSchema: z.ZodType = z
  .object({
    endpointType: z.string().optional(),
    hosts: z.lazy(() => marshalEndpointHostsSchema).optional(),
    lastActiveTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    autoscalingLimitMinCu: z.number().optional(),
    autoscalingLimitMaxCu: z.number().optional(),
    currentState: z.string().optional(),
    pendingState: z.string().optional(),
    disabled: z.boolean().optional(),
    suspendTimeoutDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    settings: z.lazy(() => marshalEndpointSettingsSchema).optional(),
    group: z.lazy(() => marshalEndpointGroupStatusSchema).optional(),
    endpointId: z.string().optional(),
  })
  .transform(d => ({
    endpoint_type: d.endpointType,
    hosts: d.hosts,
    last_active_time: d.lastActiveTime,
    autoscaling_limit_min_cu: d.autoscalingLimitMinCu,
    autoscaling_limit_max_cu: d.autoscalingLimitMaxCu,
    current_state: d.currentState,
    pending_state: d.pendingState,
    disabled: d.disabled,
    suspend_timeout_duration: d.suspendTimeoutDuration,
    settings: d.settings,
    group: d.group,
    endpoint_id: d.endpointId,
  }));

export const marshalGenerateDatabaseCredentialRequestSchema: z.ZodType = z
  .object({
    claims: z.array(z.lazy(() => marshalRequestedClaimsSchema)).optional(),
    endpoint: z.string().optional(),
    expiration: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('ttl'),
          ttl: z
            .any()
            .transform((d: Temporal.Duration) =>
              d.toString().slice(2).toLowerCase()
            ),
        }),
        z.object({
          $case: z.literal('expireTime'),
          expireTime: z.any().transform((d: Temporal.Instant) => d.toString()),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    claims: d.claims,
    endpoint: d.endpoint,
    ...(d.expiration?.$case === 'ttl' && {ttl: d.expiration.ttl}),
    ...(d.expiration?.$case === 'expireTime' && {
      expire_time: d.expiration.expireTime,
    }),
  }));

export const marshalInitialBranchSpecSchema: z.ZodType = z
  .object({
    isProtected: z.boolean().optional(),
  })
  .transform(d => ({
    is_protected: d.isProtected,
  }));

export const marshalInitialEndpointSpecSchema: z.ZodType = z
  .object({
    group: z.lazy(() => marshalEndpointGroupSpecSchema).optional(),
    autoscalingLimitMinCu: z.number().optional(),
    autoscalingLimitMaxCu: z.number().optional(),
    suspension: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('suspendTimeoutDuration'),
          suspendTimeoutDuration: z
            .any()
            .transform((d: Temporal.Duration) =>
              d.toString().slice(2).toLowerCase()
            ),
        }),
        z.object({$case: z.literal('noSuspension'), noSuspension: z.boolean()}),
      ])
      .optional(),
  })
  .transform(d => ({
    group: d.group,
    autoscaling_limit_min_cu: d.autoscalingLimitMinCu,
    autoscaling_limit_max_cu: d.autoscalingLimitMaxCu,
    ...(d.suspension?.$case === 'suspendTimeoutDuration' && {
      suspend_timeout_duration: d.suspension.suspendTimeoutDuration,
    }),
    ...(d.suspension?.$case === 'noSuspension' && {
      no_suspension: d.suspension.noSuspension,
    }),
  }));

export const marshalMonthlyScheduleSchema: z.ZodType = z
  .object({
    day: z.number().optional(),
    hour: z.number().optional(),
  })
  .transform(d => ({
    day: d.day,
    hour: d.hour,
  }));

export const marshalNewPipelineSpecSchema: z.ZodType = z
  .object({
    storageCatalog: z.string().optional(),
    storageSchema: z.string().optional(),
    budgetPolicyId: z.string().optional(),
    pipelineChannel: z.string().optional(),
  })
  .transform(d => ({
    storage_catalog: d.storageCatalog,
    storage_schema: d.storageSchema,
    budget_policy_id: d.budgetPolicyId,
    pipeline_channel: d.pipelineChannel,
  }));

export const marshalProjectSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    spec: z.lazy(() => marshalProjectSpecSchema).optional(),
    status: z.lazy(() => marshalProjectStatusSchema).optional(),
    initialEndpointSpec: z
      .lazy(() => marshalInitialEndpointSpecSchema)
      .optional(),
    deleteTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    purgeTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    initialBranchSpec: z.lazy(() => marshalInitialBranchSpecSchema).optional(),
    projectId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    create_time: d.createTime,
    update_time: d.updateTime,
    spec: d.spec,
    status: d.status,
    initial_endpoint_spec: d.initialEndpointSpec,
    delete_time: d.deleteTime,
    purge_time: d.purgeTime,
    initial_branch_spec: d.initialBranchSpec,
    project_id: d.projectId,
  }));

export const marshalProjectCustomTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalProjectDefaultEndpointSettingsSchema: z.ZodType = z
  .object({
    autoscalingLimitMinCu: z.number().optional(),
    autoscalingLimitMaxCu: z.number().optional(),
    suspension: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('suspendTimeoutDuration'),
          suspendTimeoutDuration: z
            .any()
            .transform((d: Temporal.Duration) =>
              d.toString().slice(2).toLowerCase()
            ),
        }),
        z.object({$case: z.literal('noSuspension'), noSuspension: z.boolean()}),
      ])
      .optional(),
    pgSettings: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    autoscaling_limit_min_cu: d.autoscalingLimitMinCu,
    autoscaling_limit_max_cu: d.autoscalingLimitMaxCu,
    ...(d.suspension?.$case === 'suspendTimeoutDuration' && {
      suspend_timeout_duration: d.suspension.suspendTimeoutDuration,
    }),
    ...(d.suspension?.$case === 'noSuspension' && {
      no_suspension: d.suspension.noSuspension,
    }),
    pg_settings: d.pgSettings,
  }));

export const marshalProjectSpecSchema: z.ZodType = z
  .object({
    displayName: z.string().optional(),
    pgVersion: z.number().optional(),
    historyRetentionDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    defaultEndpointSettings: z
      .lazy(() => marshalProjectDefaultEndpointSettingsSchema)
      .optional(),
    budgetPolicyId: z.string().optional(),
    customTags: z.array(z.lazy(() => marshalProjectCustomTagSchema)).optional(),
    enablePgNativeLogin: z.boolean().optional(),
    defaultBranch: z.string().optional(),
  })
  .transform(d => ({
    display_name: d.displayName,
    pg_version: d.pgVersion,
    history_retention_duration: d.historyRetentionDuration,
    default_endpoint_settings: d.defaultEndpointSettings,
    budget_policy_id: d.budgetPolicyId,
    custom_tags: d.customTags,
    enable_pg_native_login: d.enablePgNativeLogin,
    default_branch: d.defaultBranch,
  }));

export const marshalProjectStatusSchema: z.ZodType = z
  .object({
    displayName: z.string().optional(),
    pgVersion: z.number().optional(),
    historyRetentionDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    defaultEndpointSettings: z
      .lazy(() => marshalProjectDefaultEndpointSettingsSchema)
      .optional(),
    branchLogicalSizeLimitBytes: z.bigint().optional(),
    syntheticStorageSizeBytes: z.bigint().optional(),
    computeLastActiveTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    budgetPolicyId: z.string().optional(),
    customTags: z.array(z.lazy(() => marshalProjectCustomTagSchema)).optional(),
    owner: z.string().optional(),
    enablePgNativeLogin: z.boolean().optional(),
    defaultBranch: z.string().optional(),
    projectId: z.string().optional(),
  })
  .transform(d => ({
    display_name: d.displayName,
    pg_version: d.pgVersion,
    history_retention_duration: d.historyRetentionDuration,
    default_endpoint_settings: d.defaultEndpointSettings,
    branch_logical_size_limit_bytes: d.branchLogicalSizeLimitBytes,
    synthetic_storage_size_bytes: d.syntheticStorageSizeBytes,
    compute_last_active_time: d.computeLastActiveTime,
    budget_policy_id: d.budgetPolicyId,
    custom_tags: d.customTags,
    owner: d.owner,
    enable_pg_native_login: d.enablePgNativeLogin,
    default_branch: d.defaultBranch,
    project_id: d.projectId,
  }));

export const marshalRequestedClaimsSchema: z.ZodType = z
  .object({
    permissionSet: z.string().optional(),
    resources: z.array(z.lazy(() => marshalRequestedResourceSchema)).optional(),
  })
  .transform(d => ({
    permission_set: d.permissionSet,
    resources: d.resources,
  }));

export const marshalRequestedResourceSchema: z.ZodType = z
  .object({
    resourceName: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('tableName'), tableName: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.resourceName?.$case === 'tableName' && {
      table_name: d.resourceName.tableName,
    }),
  }));

export const marshalRoleSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    parent: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    spec: z.lazy(() => marshalRole_RoleSpecSchema).optional(),
    status: z.lazy(() => marshalRole_RoleStatusSchema).optional(),
    roleId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    parent: d.parent,
    create_time: d.createTime,
    update_time: d.updateTime,
    spec: d.spec,
    status: d.status,
    role_id: d.roleId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRole_AttributesSchema: z.ZodType = z
  .object({
    createdb: z.boolean().optional(),
    createrole: z.boolean().optional(),
    bypassrls: z.boolean().optional(),
  })
  .transform(d => ({
    createdb: d.createdb,
    createrole: d.createrole,
    bypassrls: d.bypassrls,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRole_RoleSpecSchema: z.ZodType = z
  .object({
    membershipRoles: z.array(z.string()).optional(),
    identityType: z.string().optional(),
    attributes: z.lazy(() => marshalRole_AttributesSchema).optional(),
    authMethod: z.string().optional(),
    postgresRole: z.string().optional(),
  })
  .transform(d => ({
    membership_roles: d.membershipRoles,
    identity_type: d.identityType,
    attributes: d.attributes,
    auth_method: d.authMethod,
    postgres_role: d.postgresRole,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRole_RoleStatusSchema: z.ZodType = z
  .object({
    membershipRoles: z.array(z.string()).optional(),
    identityType: z.string().optional(),
    attributes: z.lazy(() => marshalRole_AttributesSchema).optional(),
    authMethod: z.string().optional(),
    postgresRole: z.string().optional(),
    roleId: z.string().optional(),
  })
  .transform(d => ({
    membership_roles: d.membershipRoles,
    identity_type: d.identityType,
    attributes: d.attributes,
    auth_method: d.authMethod,
    postgres_role: d.postgresRole,
    role_id: d.roleId,
  }));

export const marshalScheduleCadenceSchema: z.ZodType = z
  .object({
    schedule: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dailySchedule'),
          dailySchedule: z.lazy(() => marshalDailyScheduleSchema),
        }),
        z.object({
          $case: z.literal('weeklySchedule'),
          weeklySchedule: z.lazy(() => marshalWeeklyScheduleSchema),
        }),
        z.object({
          $case: z.literal('monthlySchedule'),
          monthlySchedule: z.lazy(() => marshalMonthlyScheduleSchema),
        }),
      ])
      .optional(),
    retention: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    ...(d.schedule?.$case === 'dailySchedule' && {
      daily_schedule: d.schedule.dailySchedule,
    }),
    ...(d.schedule?.$case === 'weeklySchedule' && {
      weekly_schedule: d.schedule.weeklySchedule,
    }),
    ...(d.schedule?.$case === 'monthlySchedule' && {
      monthly_schedule: d.schedule.monthlySchedule,
    }),
    retention: d.retention,
  }));

export const marshalSnapshotSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    spec: z.lazy(() => marshalSnapshotSpecSchema).optional(),
    status: z.lazy(() => marshalSnapshotStatusSchema).optional(),
    snapshotId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    create_time: d.createTime,
    spec: d.spec,
    status: d.status,
    snapshot_id: d.snapshotId,
  }));

export const marshalSnapshotScheduleSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    schedule: z.array(z.lazy(() => marshalScheduleCadenceSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    schedule: d.schedule,
  }));

export const marshalSnapshotSpecSchema: z.ZodType = z
  .object({
    sourceBranch: z.string().optional(),
    pointInTime: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('sourceBranchLsn'),
          sourceBranchLsn: z.string(),
        }),
        z.object({
          $case: z.literal('sourceBranchTime'),
          sourceBranchTime: z
            .any()
            .transform((d: Temporal.Instant) => d.toString()),
        }),
      ])
      .optional(),
    expiration: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('expireTime'),
          expireTime: z.any().transform((d: Temporal.Instant) => d.toString()),
        }),
        z.object({
          $case: z.literal('ttl'),
          ttl: z
            .any()
            .transform((d: Temporal.Duration) =>
              d.toString().slice(2).toLowerCase()
            ),
        }),
        z.object({$case: z.literal('noExpiry'), noExpiry: z.boolean()}),
      ])
      .optional(),
  })
  .transform(d => ({
    source_branch: d.sourceBranch,
    ...(d.pointInTime?.$case === 'sourceBranchLsn' && {
      source_branch_lsn: d.pointInTime.sourceBranchLsn,
    }),
    ...(d.pointInTime?.$case === 'sourceBranchTime' && {
      source_branch_time: d.pointInTime.sourceBranchTime,
    }),
    ...(d.expiration?.$case === 'expireTime' && {
      expire_time: d.expiration.expireTime,
    }),
    ...(d.expiration?.$case === 'ttl' && {ttl: d.expiration.ttl}),
    ...(d.expiration?.$case === 'noExpiry' && {
      no_expiry: d.expiration.noExpiry,
    }),
  }));

export const marshalSnapshotStatusSchema: z.ZodType = z
  .object({
    sourceBranch: z.string().optional(),
    expiration: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('expireTime'),
          expireTime: z.any().transform((d: Temporal.Instant) => d.toString()),
        }),
        z.object({$case: z.literal('noExpiry'), noExpiry: z.boolean()}),
      ])
      .optional(),
    fullSizeBytes: z.bigint().optional(),
    diffSizeBytes: z.bigint().optional(),
  })
  .transform(d => ({
    source_branch: d.sourceBranch,
    ...(d.expiration?.$case === 'expireTime' && {
      expire_time: d.expiration.expireTime,
    }),
    ...(d.expiration?.$case === 'noExpiry' && {
      no_expiry: d.expiration.noExpiry,
    }),
    full_size_bytes: d.fullSizeBytes,
    diff_size_bytes: d.diffSizeBytes,
  }));

export const marshalSyncedTableSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    uid: z.string().optional(),
    spec: z.lazy(() => marshalSyncedTable_SyncedTableSpecSchema).optional(),
    status: z.lazy(() => marshalSyncedTable_SyncedTableStatusSchema).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    syncedTableId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    spec: d.spec,
    status: d.status,
    create_time: d.createTime,
    synced_table_id: d.syncedTableId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSyncedTable_SyncedTableSpecSchema: z.ZodType = z
  .object({
    postgresDatabase: z.string().optional(),
    branch: z.string().optional(),
    schedulingPolicy: z.string().optional(),
    sourceTableFullName: z.string().optional(),
    primaryKeyColumns: z.array(z.string()).optional(),
    timeseriesKey: z.string().optional(),
    existingPipelineId: z.string().optional(),
    createDatabaseObjectsIfMissing: z.boolean().optional(),
    newPipelineSpec: z.lazy(() => marshalNewPipelineSpecSchema).optional(),
    acceleratedSync: z.boolean().optional(),
    typeOverrides: z
      .array(
        z.lazy(() => marshalSyncedTable_SyncedTableSpec_TypeOverrideSchema)
      )
      .optional(),
    extraColumns: z
      .array(z.lazy(() => marshalSyncedTable_SyncedTableSpec_ExtraColumnSchema))
      .optional(),
  })
  .transform(d => ({
    postgres_database: d.postgresDatabase,
    branch: d.branch,
    scheduling_policy: d.schedulingPolicy,
    source_table_full_name: d.sourceTableFullName,
    primary_key_columns: d.primaryKeyColumns,
    timeseries_key: d.timeseriesKey,
    existing_pipeline_id: d.existingPipelineId,
    create_database_objects_if_missing: d.createDatabaseObjectsIfMissing,
    new_pipeline_spec: d.newPipelineSpec,
    accelerated_sync: d.acceleratedSync,
    type_overrides: d.typeOverrides,
    extra_columns: d.extraColumns,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSyncedTable_SyncedTableSpec_ExtraColumnSchema: z.ZodType = z
  .object({
    columnName: z.string().optional(),
    columnType: z.string().optional(),
    maintenance: z.string().optional(),
    compute: z.string().optional(),
  })
  .transform(d => ({
    column_name: d.columnName,
    column_type: d.columnType,
    maintenance: d.maintenance,
    compute: d.compute,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSyncedTable_SyncedTableSpec_TypeOverrideSchema: z.ZodType =
  z
    .object({
      columnName: z.string().optional(),
      pgType: z.string().optional(),
      size: z.number().optional(),
    })
    .transform(d => ({
      column_name: d.columnName,
      pg_type: d.pgType,
      size: d.size,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSyncedTable_SyncedTableStatusSchema: z.ZodType = z
  .object({
    message: z.string().optional(),
    detailedState: z.string().optional(),
    lastSync: z.lazy(() => marshalSyncedTablePositionSchema).optional(),
    ongoingSyncProgress: z
      .lazy(() => marshalSyncedTablePipelineProgressSchema)
      .optional(),
    provisioningPhase: z.string().optional(),
    lastProcessedCommitVersion: z.bigint().optional(),
    lastSyncTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    pipelineId: z.string().optional(),
    unityCatalogProvisioningState: z.string().optional(),
    project: z.string().optional(),
  })
  .transform(d => ({
    message: d.message,
    detailed_state: d.detailedState,
    last_sync: d.lastSync,
    ongoing_sync_progress: d.ongoingSyncProgress,
    provisioning_phase: d.provisioningPhase,
    last_processed_commit_version: d.lastProcessedCommitVersion,
    last_sync_time: d.lastSyncTime,
    pipeline_id: d.pipelineId,
    unity_catalog_provisioning_state: d.unityCatalogProvisioningState,
    project: d.project,
  }));

export const marshalSyncedTablePipelineProgressSchema: z.ZodType = z
  .object({
    latestVersionCurrentlyProcessing: z.bigint().optional(),
    syncedRowCount: z.bigint().optional(),
    totalRowCount: z.bigint().optional(),
    syncProgressCompletion: z.number().optional(),
    estimatedCompletionTimeSeconds: z.number().optional(),
  })
  .transform(d => ({
    latest_version_currently_processing: d.latestVersionCurrentlyProcessing,
    synced_row_count: d.syncedRowCount,
    total_row_count: d.totalRowCount,
    sync_progress_completion: d.syncProgressCompletion,
    estimated_completion_time_seconds: d.estimatedCompletionTimeSeconds,
  }));

export const marshalSyncedTablePositionSchema: z.ZodType = z
  .object({
    syncStartTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    syncEndTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    sourceSyncInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('deltaTableSyncInfo'),
          deltaTableSyncInfo: z.lazy(() => marshalDeltaTableSyncInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    sync_start_time: d.syncStartTime,
    sync_end_time: d.syncEndTime,
    ...(d.sourceSyncInfo?.$case === 'deltaTableSyncInfo' && {
      delta_table_sync_info: d.sourceSyncInfo.deltaTableSyncInfo,
    }),
  }));

export const marshalUndeleteBranchRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalUndeleteProjectRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalWeeklyScheduleSchema: z.ZodType = z
  .object({
    dayOfWeek: z.string().optional(),
    hour: z.number().optional(),
  })
  .transform(d => ({
    day_of_week: d.dayOfWeek,
    hour: d.hour,
  }));

const branchFieldMaskSchema: FieldMaskSchema = {
  branchId: {wire: 'branch_id'},
  createTime: {wire: 'create_time'},
  name: {wire: 'name'},
  parent: {wire: 'parent'},
  spec: {wire: 'spec', children: () => branchSpecFieldMaskSchema},
  status: {wire: 'status', children: () => branchStatusFieldMaskSchema},
  uid: {wire: 'uid'},
  updateTime: {wire: 'update_time'},
};

export function branchFieldMask(...paths: string[]): FieldMask<Branch> {
  return FieldMask.build<Branch>(paths, branchFieldMaskSchema);
}

const branchSpecFieldMaskSchema: FieldMaskSchema = {
  expireTime: {wire: 'expire_time'},
  isProtected: {wire: 'is_protected'},
  noExpiry: {wire: 'no_expiry'},
  sourceBranch: {wire: 'source_branch'},
  sourceBranchLsn: {wire: 'source_branch_lsn'},
  sourceBranchTime: {wire: 'source_branch_time'},
  sourceSnapshot: {wire: 'source_snapshot'},
  ttl: {wire: 'ttl'},
};

const branchStatusFieldMaskSchema: FieldMaskSchema = {
  branchId: {wire: 'branch_id'},
  currentState: {wire: 'current_state'},
  default: {wire: 'default'},
  deleteTime: {wire: 'delete_time'},
  expireTime: {wire: 'expire_time'},
  isProtected: {wire: 'is_protected'},
  logicalSizeBytes: {wire: 'logical_size_bytes'},
  pendingState: {wire: 'pending_state'},
  purgeTime: {wire: 'purge_time'},
  sourceBranch: {wire: 'source_branch'},
  sourceBranchLsn: {wire: 'source_branch_lsn'},
  sourceBranchTime: {wire: 'source_branch_time'},
  sourceSnapshot: {wire: 'source_snapshot'},
  stateChangeTime: {wire: 'state_change_time'},
};

const dataApiFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  name: {wire: 'name'},
  parent: {wire: 'parent'},
  spec: {wire: 'spec', children: () => dataApi_DataApiSpecFieldMaskSchema},
  status: {
    wire: 'status',
    children: () => dataApi_DataApiStatusFieldMaskSchema,
  },
  updateTime: {wire: 'update_time'},
};

export function dataApiFieldMask(...paths: string[]): FieldMask<DataApi> {
  return FieldMask.build<DataApi>(paths, dataApiFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const dataApi_DataApiSpecFieldMaskSchema: FieldMaskSchema = {
  dbAggregatesEnabled: {wire: 'db_aggregates_enabled'},
  dbExtraSearchPath: {wire: 'db_extra_search_path'},
  dbMaxRows: {wire: 'db_max_rows'},
  dbSchemas: {wire: 'db_schemas'},
  jwtCacheMaxLifetime: {wire: 'jwt_cache_max_lifetime'},
  jwtRoleClaimKey: {wire: 'jwt_role_claim_key'},
  openapiMode: {wire: 'openapi_mode'},
  serverCorsAllowedOrigins: {wire: 'server_cors_allowed_origins'},
  serverTimingEnabled: {wire: 'server_timing_enabled'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const dataApi_DataApiStatusFieldMaskSchema: FieldMaskSchema = {
  availableSchemas: {wire: 'available_schemas'},
  dbAggregatesEnabled: {wire: 'db_aggregates_enabled'},
  dbExtraSearchPath: {wire: 'db_extra_search_path'},
  dbMaxRows: {wire: 'db_max_rows'},
  dbSchemas: {wire: 'db_schemas'},
  jwtCacheMaxLifetime: {wire: 'jwt_cache_max_lifetime'},
  jwtRoleClaimKey: {wire: 'jwt_role_claim_key'},
  openapiMode: {wire: 'openapi_mode'},
  serverCorsAllowedOrigins: {wire: 'server_cors_allowed_origins'},
  serverTimingEnabled: {wire: 'server_timing_enabled'},
  url: {wire: 'url'},
};

const databaseFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  databaseId: {wire: 'database_id'},
  name: {wire: 'name'},
  parent: {wire: 'parent'},
  spec: {wire: 'spec', children: () => database_DatabaseSpecFieldMaskSchema},
  status: {
    wire: 'status',
    children: () => database_DatabaseStatusFieldMaskSchema,
  },
  updateTime: {wire: 'update_time'},
};

export function databaseFieldMask(...paths: string[]): FieldMask<Database> {
  return FieldMask.build<Database>(paths, databaseFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const database_DatabaseSpecFieldMaskSchema: FieldMaskSchema = {
  postgresDatabase: {wire: 'postgres_database'},
  role: {wire: 'role'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const database_DatabaseStatusFieldMaskSchema: FieldMaskSchema = {
  databaseId: {wire: 'database_id'},
  postgresDatabase: {wire: 'postgres_database'},
  role: {wire: 'role'},
};

const endpointFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  endpointId: {wire: 'endpoint_id'},
  name: {wire: 'name'},
  parent: {wire: 'parent'},
  spec: {wire: 'spec', children: () => endpointSpecFieldMaskSchema},
  status: {wire: 'status', children: () => endpointStatusFieldMaskSchema},
  uid: {wire: 'uid'},
  updateTime: {wire: 'update_time'},
};

export function endpointFieldMask(...paths: string[]): FieldMask<Endpoint> {
  return FieldMask.build<Endpoint>(paths, endpointFieldMaskSchema);
}

const endpointGroupSpecFieldMaskSchema: FieldMaskSchema = {
  enableReadableSecondaries: {wire: 'enable_readable_secondaries'},
  max: {wire: 'max'},
  min: {wire: 'min'},
};

const endpointGroupStatusFieldMaskSchema: FieldMaskSchema = {
  enableReadableSecondaries: {wire: 'enable_readable_secondaries'},
  max: {wire: 'max'},
  min: {wire: 'min'},
};

const endpointHostsFieldMaskSchema: FieldMaskSchema = {
  host: {wire: 'host'},
  readOnlyHost: {wire: 'read_only_host'},
  readOnlyPooledHost: {wire: 'read_only_pooled_host'},
  readWritePooledHost: {wire: 'read_write_pooled_host'},
};

const endpointSettingsFieldMaskSchema: FieldMaskSchema = {
  pgSettings: {wire: 'pg_settings'},
};

const endpointSpecFieldMaskSchema: FieldMaskSchema = {
  autoscalingLimitMaxCu: {wire: 'autoscaling_limit_max_cu'},
  autoscalingLimitMinCu: {wire: 'autoscaling_limit_min_cu'},
  disabled: {wire: 'disabled'},
  endpointType: {wire: 'endpoint_type'},
  group: {wire: 'group', children: () => endpointGroupSpecFieldMaskSchema},
  noSuspension: {wire: 'no_suspension'},
  settings: {wire: 'settings', children: () => endpointSettingsFieldMaskSchema},
  suspendTimeoutDuration: {wire: 'suspend_timeout_duration'},
};

const endpointStatusFieldMaskSchema: FieldMaskSchema = {
  autoscalingLimitMaxCu: {wire: 'autoscaling_limit_max_cu'},
  autoscalingLimitMinCu: {wire: 'autoscaling_limit_min_cu'},
  currentState: {wire: 'current_state'},
  disabled: {wire: 'disabled'},
  endpointId: {wire: 'endpoint_id'},
  endpointType: {wire: 'endpoint_type'},
  group: {wire: 'group', children: () => endpointGroupStatusFieldMaskSchema},
  hosts: {wire: 'hosts', children: () => endpointHostsFieldMaskSchema},
  lastActiveTime: {wire: 'last_active_time'},
  pendingState: {wire: 'pending_state'},
  settings: {wire: 'settings', children: () => endpointSettingsFieldMaskSchema},
  suspendTimeoutDuration: {wire: 'suspend_timeout_duration'},
};

const initialBranchSpecFieldMaskSchema: FieldMaskSchema = {
  isProtected: {wire: 'is_protected'},
};

const initialEndpointSpecFieldMaskSchema: FieldMaskSchema = {
  autoscalingLimitMaxCu: {wire: 'autoscaling_limit_max_cu'},
  autoscalingLimitMinCu: {wire: 'autoscaling_limit_min_cu'},
  group: {wire: 'group', children: () => endpointGroupSpecFieldMaskSchema},
  noSuspension: {wire: 'no_suspension'},
  suspendTimeoutDuration: {wire: 'suspend_timeout_duration'},
};

const projectFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  deleteTime: {wire: 'delete_time'},
  initialBranchSpec: {
    wire: 'initial_branch_spec',
    children: () => initialBranchSpecFieldMaskSchema,
  },
  initialEndpointSpec: {
    wire: 'initial_endpoint_spec',
    children: () => initialEndpointSpecFieldMaskSchema,
  },
  name: {wire: 'name'},
  projectId: {wire: 'project_id'},
  purgeTime: {wire: 'purge_time'},
  spec: {wire: 'spec', children: () => projectSpecFieldMaskSchema},
  status: {wire: 'status', children: () => projectStatusFieldMaskSchema},
  uid: {wire: 'uid'},
  updateTime: {wire: 'update_time'},
};

export function projectFieldMask(...paths: string[]): FieldMask<Project> {
  return FieldMask.build<Project>(paths, projectFieldMaskSchema);
}

const projectDefaultEndpointSettingsFieldMaskSchema: FieldMaskSchema = {
  autoscalingLimitMaxCu: {wire: 'autoscaling_limit_max_cu'},
  autoscalingLimitMinCu: {wire: 'autoscaling_limit_min_cu'},
  noSuspension: {wire: 'no_suspension'},
  pgSettings: {wire: 'pg_settings'},
  suspendTimeoutDuration: {wire: 'suspend_timeout_duration'},
};

const projectSpecFieldMaskSchema: FieldMaskSchema = {
  budgetPolicyId: {wire: 'budget_policy_id'},
  customTags: {wire: 'custom_tags'},
  defaultBranch: {wire: 'default_branch'},
  defaultEndpointSettings: {
    wire: 'default_endpoint_settings',
    children: () => projectDefaultEndpointSettingsFieldMaskSchema,
  },
  displayName: {wire: 'display_name'},
  enablePgNativeLogin: {wire: 'enable_pg_native_login'},
  historyRetentionDuration: {wire: 'history_retention_duration'},
  pgVersion: {wire: 'pg_version'},
};

const projectStatusFieldMaskSchema: FieldMaskSchema = {
  branchLogicalSizeLimitBytes: {wire: 'branch_logical_size_limit_bytes'},
  budgetPolicyId: {wire: 'budget_policy_id'},
  computeLastActiveTime: {wire: 'compute_last_active_time'},
  customTags: {wire: 'custom_tags'},
  defaultBranch: {wire: 'default_branch'},
  defaultEndpointSettings: {
    wire: 'default_endpoint_settings',
    children: () => projectDefaultEndpointSettingsFieldMaskSchema,
  },
  displayName: {wire: 'display_name'},
  enablePgNativeLogin: {wire: 'enable_pg_native_login'},
  historyRetentionDuration: {wire: 'history_retention_duration'},
  owner: {wire: 'owner'},
  pgVersion: {wire: 'pg_version'},
  projectId: {wire: 'project_id'},
  syntheticStorageSizeBytes: {wire: 'synthetic_storage_size_bytes'},
};

const roleFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  name: {wire: 'name'},
  parent: {wire: 'parent'},
  roleId: {wire: 'role_id'},
  spec: {wire: 'spec', children: () => role_RoleSpecFieldMaskSchema},
  status: {wire: 'status', children: () => role_RoleStatusFieldMaskSchema},
  updateTime: {wire: 'update_time'},
};

export function roleFieldMask(...paths: string[]): FieldMask<Role> {
  return FieldMask.build<Role>(paths, roleFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const role_AttributesFieldMaskSchema: FieldMaskSchema = {
  bypassrls: {wire: 'bypassrls'},
  createdb: {wire: 'createdb'},
  createrole: {wire: 'createrole'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const role_RoleSpecFieldMaskSchema: FieldMaskSchema = {
  attributes: {
    wire: 'attributes',
    children: () => role_AttributesFieldMaskSchema,
  },
  authMethod: {wire: 'auth_method'},
  identityType: {wire: 'identity_type'},
  membershipRoles: {wire: 'membership_roles'},
  postgresRole: {wire: 'postgres_role'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const role_RoleStatusFieldMaskSchema: FieldMaskSchema = {
  attributes: {
    wire: 'attributes',
    children: () => role_AttributesFieldMaskSchema,
  },
  authMethod: {wire: 'auth_method'},
  identityType: {wire: 'identity_type'},
  membershipRoles: {wire: 'membership_roles'},
  postgresRole: {wire: 'postgres_role'},
  roleId: {wire: 'role_id'},
};

const snapshotScheduleFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
  schedule: {wire: 'schedule'},
};

export function snapshotScheduleFieldMask(
  ...paths: string[]
): FieldMask<SnapshotSchedule> {
  return FieldMask.build<SnapshotSchedule>(
    paths,
    snapshotScheduleFieldMaskSchema
  );
}
