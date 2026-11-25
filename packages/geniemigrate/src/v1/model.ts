// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Why a conversion run failed. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ConversionRunErrorCode = {
  /** Default. The run didn't fail. */
  CONVERSION_RUN_ERROR_CODE_UNSPECIFIED:
    'CONVERSION_RUN_ERROR_CODE_UNSPECIFIED',
  /** The background job couldn't be started. */
  CONVERSION_RUN_ERROR_CODE_SUBMIT_REJECTED:
    'CONVERSION_RUN_ERROR_CODE_SUBMIT_REJECTED',
  /** The background job ended with files still not converted. */
  CONVERSION_RUN_ERROR_CODE_JOB_FAILED: 'CONVERSION_RUN_ERROR_CODE_JOB_FAILED',
  /** The run could no longer be tracked to completion. Its operation record remains available. */
  CONVERSION_RUN_ERROR_CODE_EXPIRED: 'CONVERSION_RUN_ERROR_CODE_EXPIRED',
} as const;
export type ConversionRunErrorCode =
  | (typeof ConversionRunErrorCode)[keyof typeof ConversionRunErrorCode]
  | (string & {});

/** State of a conversion run. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ConversionRunState = {
  /** Default. Returned when the state is unknown or not set. */
  CONVERSION_RUN_STATE_UNSPECIFIED: 'CONVERSION_RUN_STATE_UNSPECIFIED',
  /** The run is in progress. */
  CONVERSION_RUN_STATE_ACTIVE: 'CONVERSION_RUN_STATE_ACTIVE',
  /** The run ended. Each file's outcome is in `files`. */
  CONVERSION_RUN_STATE_COMPLETED: 'CONVERSION_RUN_STATE_COMPLETED',
  /** The run was cancelled. */
  CONVERSION_RUN_STATE_CANCELLED: 'CONVERSION_RUN_STATE_CANCELLED',
  /** The run ended without converting all its files. See `error_code`. */
  CONVERSION_RUN_STATE_FAILED: 'CONVERSION_RUN_STATE_FAILED',
} as const;
export type ConversionRunState =
  | (typeof ConversionRunState)[keyof typeof ConversionRunState]
  | (string & {});

/** Destination asset kind for a converted file. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DestinationKind = {
  /** Default. Returned when the destination kind is unknown or not set. */
  DESTINATION_KIND_UNSPECIFIED: 'DESTINATION_KIND_UNSPECIFIED',
  /** A Databricks notebook. */
  DESTINATION_KIND_NOTEBOOK: 'DESTINATION_KIND_NOTEBOOK',
  /** A Databricks SQL query. */
  DESTINATION_KIND_QUERY: 'DESTINATION_KIND_QUERY',
  /** A workspace file. */
  DESTINATION_KIND_FILE: 'DESTINATION_KIND_FILE',
  /** A Lakeflow Designer file. */
  DESTINATION_KIND_DESIGNER_FILE: 'DESTINATION_KIND_DESIGNER_FILE',
} as const;
export type DestinationKind =
  | (typeof DestinationKind)[keyof typeof DestinationKind]
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

/** Conversion status of a file in a migration project. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FileStatus = {
  /** Default. Returned when the per-file status is unknown or not set. */
  FILE_STATUS_UNSPECIFIED: 'FILE_STATUS_UNSPECIFIED',
  /** Conversion is running for this file. */
  FILE_STATUS_IN_PROGRESS: 'FILE_STATUS_IN_PROGRESS',
  /** Conversion completed successfully for this file. */
  FILE_STATUS_SUCCESS: 'FILE_STATUS_SUCCESS',
  /** Conversion completed with warnings or partial results for this file. */
  FILE_STATUS_PARTIAL_SUCCESS: 'FILE_STATUS_PARTIAL_SUCCESS',
  /** Conversion failed for this file. */
  FILE_STATUS_ERROR: 'FILE_STATUS_ERROR',
  /** Conversion has been stopped for this file. */
  FILE_STATUS_STOPPED: 'FILE_STATUS_STOPPED',
  /** The file is waiting for the conversion job to start converting it. */
  FILE_STATUS_QUEUED: 'FILE_STATUS_QUEUED',
  /**
   * A user reviewed and accepted the converted output. Unreviewing the file restores its previous
   * status.
   */
  FILE_STATUS_REVIEWED: 'FILE_STATUS_REVIEWED',
} as const;
export type FileStatus =
  | (typeof FileStatus)[keyof typeof FileStatus]
  | (string & {});

/** Source dialect of the files in a migration project. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SourceDialect = {
  /** Default. Returned when the source dialect is unknown or not set. */
  SOURCE_DIALECT_UNSPECIFIED: 'SOURCE_DIALECT_UNSPECIFIED',
  /** Microsoft Transact-SQL (SQL Server, Azure SQL). */
  SOURCE_DIALECT_T_SQL: 'SOURCE_DIALECT_T_SQL',
  /** Snowflake SQL. */
  SOURCE_DIALECT_SNOWFLAKE: 'SOURCE_DIALECT_SNOWFLAKE',
  /** Teradata SQL. */
  SOURCE_DIALECT_TERADATA: 'SOURCE_DIALECT_TERADATA',
  /** Amazon Redshift SQL. */
  SOURCE_DIALECT_REDSHIFT: 'SOURCE_DIALECT_REDSHIFT',
  /** Google BigQuery SQL. */
  SOURCE_DIALECT_BIGQUERY: 'SOURCE_DIALECT_BIGQUERY',
  /** Informatica mapping XML and scripts. */
  SOURCE_DIALECT_INFORMATICA: 'SOURCE_DIALECT_INFORMATICA',
  /** Oracle PL/SQL. */
  SOURCE_DIALECT_ORACLE: 'SOURCE_DIALECT_ORACLE',
  /** Microsoft SQL Server Integration Services (SSIS) packages. */
  SOURCE_DIALECT_SSIS: 'SOURCE_DIALECT_SSIS',
  /** Alteryx Designer workflows, macros and apps. */
  SOURCE_DIALECT_ALTERYX: 'SOURCE_DIALECT_ALTERYX',
} as const;
export type SourceDialect =
  | (typeof SourceDialect)[keyof typeof SourceDialect]
  | (string & {});

/** Output framework of the converted files in a migration project. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TargetFramework = {
  /** Default. Returned when the target framework is unknown or not set. */
  TARGET_FRAMEWORK_UNSPECIFIED: 'TARGET_FRAMEWORK_UNSPECIFIED',
  /** Databricks SQL. */
  TARGET_FRAMEWORK_SQL: 'TARGET_FRAMEWORK_SQL',
  /** PySpark. */
  TARGET_FRAMEWORK_PYSPARK: 'TARGET_FRAMEWORK_PYSPARK',
  /** Lakeflow Spark Declarative Pipelines. */
  TARGET_FRAMEWORK_SPARK_DECLARATIVE_PIPELINES:
    'TARGET_FRAMEWORK_SPARK_DECLARATIVE_PIPELINES',
  /** Lakeflow Designer files. */
  TARGET_FRAMEWORK_DESIGNER: 'TARGET_FRAMEWORK_DESIGNER',
} as const;
export type TargetFramework =
  | (typeof TargetFramework)[keyof typeof TargetFramework]
  | (string & {});

/** The request to add workspace files to a migration project. */
export interface AddProjectFilesRequest {
  /**
   * The resource name of the project, in the format `projects/{project_id}`. For example,
   * `projects/123`.
   */
  name?: string | undefined;
  /**
   * The files to add, each identified by `workspace.path` or `workspace.object_id`. Send at most
   * 500 files per request. Duplicate files, and requests that exceed a file-count limit, return
   * `INVALID_PARAMETER_VALUE`. Files already in the project aren't overwritten. An empty list
   * changes nothing.
   */
  sources?: SourceFileRef[] | undefined;
}

/**
 * Lists the files from an `AddProjectFiles` request, including files that were already in the
 * project.
 */
export interface AddProjectFilesResponse {
  /**
   * The requested files, in request order, without conversion results. Call `ListProjectFiles` or
   * `GetProjectFile` to read their state.
   */
  files?: ProjectFile[] | undefined;
}

/** Databricks Error that is returned by all Databricks APIs. */
export interface ApiError {
  errorCode?: ErrorCode | undefined;
  message?: string | undefined;
  stackTrace?: string | undefined;
  details?: Record<string, unknown>[] | undefined;
}

/** The request message for `CancelOperation` method. */
export interface CancelOperationRequest {
  /** The name of the operation resource to be cancelled. */
  name?: string | undefined;
}

/** A conversion of a migration project's files, with its state and the status of each file. */
export interface ConversionRun {
  /** The resource name of the project being converted, in the format `projects/{project_id}`. */
  project?: string | undefined;
  /** The state of the run. */
  state?: ConversionRunState | undefined;
  /** Why the run failed. Set only when `state` is `CONVERSION_RUN_STATE_FAILED`. */
  errorCode?: ConversionRunErrorCode | undefined;
  /**
   * The files in this run, at most 500, each with its status in this run. Later conversions and
   * reviews can change `ProjectFile.status` but don't change this list.
   */
  files?: ConversionRunFile[] | undefined;
  /** The time the run was accepted, before its background job started. */
  createTime?: Temporal.Instant | undefined;
  /** The time the run ended. Absent while the run is active. */
  endTime?: Temporal.Instant | undefined;
  /**
   * The skill folders that the run was started with. Empty if the run discovers skills
   * automatically.
   */
  skillPaths?: string[] | undefined;
}

/** A file in a conversion run. */
export interface ConversionRunFile {
  /** The resource name of the file, in the format `projects/{project_id}/files/{file_id}`. */
  name?: string | undefined;
  /**
   * The status of the file in this run. `ProjectFile.status` has the file's latest status across
   * all runs.
   */
  status?: FileStatus | undefined;
}

/** The request to convert files of a migration project. */
export interface ConvertProjectFilesRequest {
  /**
   * The resource name of the project whose files to convert, in the format `projects/{project_id}`.
   * For example, `projects/123`.
   */
  parent?: string | undefined;
  /**
   * Whether to convert each selected file from scratch instead of continuing from its previous
   * results (changes, to-do items, blockers, and notes). Supported only for projects whose target
   * framework is `TARGET_FRAMEWORK_SQL`; other projects return `INVALID_PARAMETER_VALUE`. Defaults
   * to `false`.
   */
  startOver?: boolean | undefined;
  /**
   * The files to convert, in the format `projects/{project_id}/files/{file_id}`. For example,
   * `projects/123/files/789`. All files must belong to `parent`. At most 500 files; a workspace can
   * set a lower limit, and requests over it return `INVALID_PARAMETER_VALUE`.
   */
  names?: string[] | undefined;
  /**
   * Custom skills that the conversion can use, as workspace paths of skill folders. Each folder
   * must contain a `SKILL.md` file and be directly inside a skills folder:
   * `<home>/.assistant/skills`, `/Workspace/.assistant/skills`, or another configured skills
   * folder. At most 10 paths, which together must fit in 1000 bytes when encoded as a JSON array.
   * Larger values return `INVALID_PARAMETER_VALUE`. If empty, the conversion discovers skills
   * automatically.
   */
  skillPaths?: string[] | undefined;
}

/** The result of a completed conversion. */
export interface ConvertProjectFilesResponse {
  /**
   * The completed conversion run. Each file's outcome is in `run.files`; a completed run can
   * include files that failed to convert.
   */
  run?: ConversionRun | undefined;
}

/** The request to create a migration project. Set the target workspace folder in `project.folder`. */
export interface CreateProjectRequest {
  /** The project to create. The server sets `name` in the response. */
  project?: Project | undefined;
}

/** The request to move a migration project to the trash. */
export interface DeleteProjectRequest {
  /**
   * The resource name of the project, in the format `projects/{project_id}`. For example,
   * `projects/123`.
   */
  name?: string | undefined;
}

/** A Databricks job or pipeline created during conversion. */
export interface DestinationResource {
  /** The ID of the job that conversion created, if any. */
  jobId?: bigint | undefined;
  /** The ID (a UUID) of the pipeline that conversion created, if any. */
  pipelineId?: string | undefined;
}

/** The request message for `GetOperation` method. */
export interface GetOperationRequest {
  /** The name of the operation resource. */
  name?: string | undefined;
}

/** The request to get a file of a migration project. */
export interface GetProjectFileRequest {
  /**
   * The resource name of the file, in the format `projects/{project_id}/files/{file_id}`. For
   * example, `projects/123/files/789`.
   */
  name?: string | undefined;
}

/** The request to get a migration project. */
export interface GetProjectRequest {
  /**
   * The resource name of the project, in the format `projects/{project_id}`. For example,
   * `projects/123`.
   */
  name?: string | undefined;
}

/** The request to list the files of a migration project. */
export interface ListProjectFilesRequest {
  /**
   * The resource name of the project, in the format `projects/{project_id}`. For example,
   * `projects/123`.
   */
  parent?: string | undefined;
  /**
   * The maximum number of files to return, at most 500. If omitted, zero, or negative, the server
   * chooses. The server can return a different number of files than requested, so keep requesting
   * pages until `next_page_token` is empty.
   */
  pageSize?: number | undefined;
  /**
   * The `next_page_token` from a previous response. Omit it for the first page. Use it only with
   * the same `parent`.
   */
  pageToken?: string | undefined;
}

/** The response to `ListProjectFiles`. */
export interface ListProjectFilesResponse {
  /** The files in this page. */
  projectFiles?: ProjectFile[] | undefined;
  /** The token for the next page. Empty when there are no more pages. */
  nextPageToken?: string | undefined;
}

/** The request to list the migration projects in a workspace folder. */
export interface ListProjectsRequest {
  /**
   * The maximum number of projects to return, at most 500. Defaults to 100 if omitted, zero, or
   * negative. A page can have fewer projects than requested, or none, even when more pages follow.
   */
  pageSize?: number | undefined;
  /**
   * The `next_page_token` from a previous response. Omit it for the first page. Use the same
   * `filter` for every page.
   */
  pageToken?: string | undefined;
  /**
   * The folder to list, as `folder = "folders/{folder_id}"`. For example, `folder = "folders/456"`.
   * No other filter is supported. Defaults to the caller's home folder.
   */
  filter?: string | undefined;
}

/** The response to `ListProjects`. */
export interface ListProjectsResponse {
  /**
   * The projects in this page, without `project_config` or `changes_locked`. Call `GetProject` for
   * the full project.
   */
  projects?: Project[] | undefined;
  /** The token for the next page. Empty when there are no more pages. */
  nextPageToken?: string | undefined;
}

/**
 * The location of a file or folder. Exactly one location type is set. More location types can be
 * added later, so clients should ignore types they don't recognize.
 */
export interface Location {
  location?:
    | {
        $case: 'workspace';
        /** A file or folder in the workspace. */
        workspace: WorkspaceLocation;
      }
    | undefined;
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

/** A migration project: the conversion settings and source files of one migration. */
export interface Project {
  /**
   * The resource name of the project, in the format `projects/{project_id}`. For example,
   * `projects/123`. The server assigns it when the project is created.
   */
  name?: string | undefined;
  /**
   * The workspace folder that contains the project, in the format `folders/{folder_id}`. For
   * example, `folders/456`. If omitted on create, defaults to the caller's home folder.
   * `UpdateProject` can't change it, but moving the project in the workspace does. Returned when
   * available. Converted files are written to `project_config.destination_location`, which can be a
   * different folder.
   */
  folder?: string | undefined;
  /**
   * The conversion settings of the project. Required on create. Returned by `CreateProject`,
   * `GetProject`, and `UpdateProject`, but not by `ListProjects`.
   */
  projectConfig?: ProjectConfig | undefined;
  /**
   * The display name of the project. Required on create, and can't be blank. Changing it renames
   * the project.
   */
  displayName?: string | undefined;
  /**
   * The time the project was created, if available. Can be absent from `CreateProject` and
   * `UpdateProject` responses.
   */
  createTime?: Temporal.Instant | undefined;
  /**
   * The time the project was last modified, if available. Can be absent from `CreateProject` and
   * `UpdateProject` responses.
   */
  updateTime?: Temporal.Instant | undefined;
  /**
   * Whether the source dialect and target framework are locked. They lock after a conversion or
   * analysis runs on the project. Other settings stay editable.
   */
  changesLocked?: boolean | undefined;
}

/** Conversion settings of a migration project. */
export interface ProjectConfig {
  /**
   * The dialect of the project's source files. Can't be changed when `Project.changes_locked` is
   * `true`.
   */
  sourceDialect?: SourceDialect | undefined;
  /**
   * The framework that source files are converted to. Required on create, and can't be
   * `TARGET_FRAMEWORK_UNSPECIFIED`. Can't be changed when `Project.changes_locked` is `true`.
   */
  targetFramework?: TargetFramework | undefined;
  /**
   * The workspace folder where converted files are written. Required on create; set
   * `workspace.path` or `workspace.object_id`. `UpdateProject` can't change it.
   */
  destinationLocation?: Location | undefined;
  /**
   * The workspace JSON file that holds the project's lineage report. Optional. To clear it, include
   * `project_config.lineage_location` in `update_mask` and leave this field unset.
   */
  lineageLocation?: Location | undefined;
}

/**
 * A source file in a migration project, with its latest conversion results. The service sets the
 * conversion results. To accept the converted output, call `ReviewProjectFiles`; to undo that, call
 * `UnreviewProjectFiles`. Neither method changes the conversion results.
 */
export interface ProjectFile {
  /**
   * The file's latest conversion status across all runs. For its status in a specific run, read
   * `ConversionRun.files` in that run's operation metadata.
   */
  status?: FileStatus | undefined;
  /** The kind of the converted file, when recorded. */
  destinationKind?: DestinationKind | undefined;
  /**
   * The changes made during conversion. Returned only by `GetProjectFile`, which reads them from
   * the converted file.
   */
  changes?: string[] | undefined;
  /**
   * Follow-up work (to-do items) identified during conversion. Returned only by `GetProjectFile`,
   * which reads them from the converted file.
   */
  todos?: string[] | undefined;
  /**
   * Issues that block the conversion. Returned only by `GetProjectFile`, which reads them from the
   * converted file.
   */
  blockers?: string[] | undefined;
  /**
   * The error reported for this file, if any. `GetProjectFile` returns the error stored with the
   * converted file when available, and otherwise the latest error recorded for the project file.
   */
  errorMessage?: string | undefined;
  /**
   * The resource name of the file, in the format `projects/{project_id}/files/{file_id}`. For
   * example, `projects/123/files/789`. The server assigns `file_id`, an opaque value of at most 63
   * characters.
   */
  name?: string | undefined;
  /** The Databricks job or pipeline that conversion created for this file, if any. */
  destinationResource?: DestinationResource | undefined;
  /**
   * Informational notes about the conversion that need no decision. Returned only by
   * `GetProjectFile`, which reads them from the converted file.
   */
  notes?: string[] | undefined;
  /**
   * Whether the file has conversion notes. Returned by `ListProjectFiles`; call `GetProjectFile` to
   * read the notes.
   */
  hasNotes?: boolean | undefined;
  /** The location of the source file. */
  source?: Location | undefined;
  /** The location of the converted file. Absent until a conversion writes it. */
  destination?: Location | undefined;
  /**
   * The location of the asset that this file was derived from. Absent if the file wasn't derived
   * from another asset.
   */
  derivedFrom?: Location | undefined;
}

/** The request to remove files from a migration project. */
export interface RemoveProjectFilesRequest {
  /**
   * The resource name of the project, in the format `projects/{project_id}`. For example,
   * `projects/123`.
   */
  name?: string | undefined;
  /**
   * The files to remove, by `ProjectFile.name`. For example, `projects/123/files/789`. Every file
   * must belong to the project in `name`. An empty list changes nothing. Send at most 10 files per
   * request, the default limit. Requests over a project's limit return `INVALID_PARAMETER_VALUE`.
   */
  names?: string[] | undefined;
}

/** Lists the files from a `RemoveProjectFiles` request. */
export interface RemoveProjectFilesResponse {
  /**
   * The requested files, in request order. Each entry identifies a source file and has no
   * conversion results.
   */
  files?: ProjectFile[] | undefined;
}

/** The request to mark files of a migration project as reviewed. */
export interface ReviewProjectFilesRequest {
  /**
   * The resource name of the project, in the format `projects/{project_id}`. For example,
   * `projects/123`. Every file in `names` must belong to this project.
   */
  parent?: string | undefined;
  /**
   * The files to review: 1 to 100 distinct file resource names, in the format
   * `projects/{project_id}/files/{file_id}`. For example, `projects/123/files/789`.
   */
  names?: string[] | undefined;
}

/** The files reviewed by `ReviewProjectFiles`, in request order. */
export interface ReviewProjectFilesResponse {
  /**
   * The reviewed files, in request order. To read a file's changes, to-do items, blockers, and
   * notes, call `GetProjectFile`.
   */
  projectFiles?: ProjectFile[] | undefined;
}

/**
 * A reference to a source file in the workspace. Set `workspace.path` or `workspace.object_id`.
 * For example, `{"workspace": {"path": "/Workspace/Shared/migration/source.sql"}}`.
 */
export interface SourceFileRef {
  ref?:
    | {
        $case: 'workspace';
        /** The source file in the workspace. Must identify an existing file the caller can read. */
        workspace: WorkspaceLocation;
      }
    | undefined;
  /**
   * The location of the asset that this file was derived from, if any. Used only by
   * `AddProjectFiles`, and can't be changed after the file is added.
   */
  derivedFrom?: Location | undefined;
}

/** The request to remove the reviewed status from files of a migration project. */
export interface UnreviewProjectFilesRequest {
  /**
   * The resource name of the project, in the format `projects/{project_id}`. For example,
   * `projects/123`. Every file in `names` must belong to this project.
   */
  parent?: string | undefined;
  /**
   * The files to unreview: 1 to 100 distinct file resource names, in the format
   * `projects/{project_id}/files/{file_id}`. For example, `projects/123/files/789`.
   */
  names?: string[] | undefined;
}

/** The files unreviewed by `UnreviewProjectFiles`, in request order. */
export interface UnreviewProjectFilesResponse {
  /**
   * The unreviewed files, in request order. To read a file's changes, to-do items, blockers, and
   * notes, call `GetProjectFile`.
   */
  projectFiles?: ProjectFile[] | undefined;
}

/** The request to update a migration project. */
export interface UpdateProjectRequest {
  /** The project to update, identified by `name`. */
  project?: Project | undefined;
  /**
   * The fields to update. Supported fields are `display_name`, `project_config.source_dialect`,
   * `project_config.target_framework`, and `project_config.lineage_location`. `project_config` and
   * `*` update all three `project_config` fields and can't be combined with `display_name`.
   */
  updateMask?: FieldMask<Project> | undefined;
}

/**
 * A file or folder in the workspace. On input, set `path` or `object_id`; if both are set,
 * `object_id` is used. Responses set both when known.
 */
export interface WorkspaceLocation {
  /** The absolute workspace path. For example, `/Workspace/Shared/migration/source.sql`. */
  path?: string | undefined;
  /** The workspace object ID, as returned in `object_id` by the Workspace API. For example, `12345`. */
  objectId?: bigint | undefined;
}

export const unmarshalAddProjectFilesResponseSchema: z.ZodType<AddProjectFilesResponse> =
  z
    .object({
      files: z.array(z.lazy(() => unmarshalProjectFileSchema)).optional(),
    })
    .transform(d => ({
      files: d.files,
    }));

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

export const unmarshalConversionRunSchema: z.ZodType<ConversionRun> = z
  .object({
    project: z.string().optional(),
    state: z.string().optional(),
    error_code: z.string().optional(),
    files: z.array(z.lazy(() => unmarshalConversionRunFileSchema)).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    end_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    skill_paths: z.array(z.string()).optional(),
  })
  .transform(d => ({
    project: d.project,
    state: d.state,
    errorCode: d.error_code,
    files: d.files,
    createTime: d.create_time,
    endTime: d.end_time,
    skillPaths: d.skill_paths,
  }));

export const unmarshalConversionRunFileSchema: z.ZodType<ConversionRunFile> = z
  .object({
    name: z.string().optional(),
    status: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    status: d.status,
  }));

export const unmarshalConvertProjectFilesResponseSchema: z.ZodType<ConvertProjectFilesResponse> =
  z
    .object({
      run: z
        .lazy(() => unmarshalConversionRunSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      run: d.run,
    }));

export const unmarshalDestinationResourceSchema: z.ZodType<DestinationResource> =
  z
    .object({
      job_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      pipeline_id: z.string().optional(),
    })
    .transform(d => ({
      jobId: d.job_id,
      pipelineId: d.pipeline_id,
    }));

export const unmarshalListProjectFilesResponseSchema: z.ZodType<ListProjectFilesResponse> =
  z
    .object({
      project_files: z
        .array(z.lazy(() => unmarshalProjectFileSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      projectFiles: d.project_files,
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

export const unmarshalLocationSchema: z.ZodType<Location> = z
  .object({
    workspace: z.lazy(() => unmarshalWorkspaceLocationSchema).optional(),
  })
  .transform(d => ({
    location:
      d.workspace !== undefined
        ? {$case: 'workspace' as const, workspace: d.workspace}
        : undefined,
  }));

export const unmarshalOperationSchema: z.ZodType<Operation> = z
  .object({
    name: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    done: z.boolean().optional(),
    error: z.lazy(() => unmarshalApiErrorSchema).optional(),
    response: z.record(z.string(), z.unknown()).optional(),
  })
  .refine(d => [d.error, d.response].filter(v => v !== undefined).length <= 1, {
    message: 'Operation.Result: multiple oneof members set',
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
    folder: z.string().optional(),
    project_config: z
      .lazy(() => unmarshalProjectConfigSchema)
      .nullish()
      .transform(v => v ?? undefined),
    display_name: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    changes_locked: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    folder: d.folder,
    projectConfig: d.project_config,
    displayName: d.display_name,
    createTime: d.create_time,
    updateTime: d.update_time,
    changesLocked: d.changes_locked,
  }));

export const unmarshalProjectConfigSchema: z.ZodType<ProjectConfig> = z
  .object({
    source_dialect: z.string().optional(),
    target_framework: z.string().optional(),
    destination_location: z
      .lazy(() => unmarshalLocationSchema)
      .nullish()
      .transform(v => v ?? undefined),
    lineage_location: z
      .lazy(() => unmarshalLocationSchema)
      .nullish()
      .transform(v => v ?? undefined),
  })
  .transform(d => ({
    sourceDialect: d.source_dialect,
    targetFramework: d.target_framework,
    destinationLocation: d.destination_location,
    lineageLocation: d.lineage_location,
  }));

export const unmarshalProjectFileSchema: z.ZodType<ProjectFile> = z
  .object({
    status: z.string().optional(),
    destination_kind: z.string().optional(),
    changes: z.array(z.string()).optional(),
    todos: z.array(z.string()).optional(),
    blockers: z.array(z.string()).optional(),
    error_message: z.string().optional(),
    name: z.string().optional(),
    destination_resource: z
      .lazy(() => unmarshalDestinationResourceSchema)
      .nullish()
      .transform(v => v ?? undefined),
    notes: z.array(z.string()).optional(),
    has_notes: z.boolean().optional(),
    source: z
      .lazy(() => unmarshalLocationSchema)
      .nullish()
      .transform(v => v ?? undefined),
    destination: z
      .lazy(() => unmarshalLocationSchema)
      .nullish()
      .transform(v => v ?? undefined),
    derived_from: z
      .lazy(() => unmarshalLocationSchema)
      .nullish()
      .transform(v => v ?? undefined),
  })
  .transform(d => ({
    status: d.status,
    destinationKind: d.destination_kind,
    changes: d.changes,
    todos: d.todos,
    blockers: d.blockers,
    errorMessage: d.error_message,
    name: d.name,
    destinationResource: d.destination_resource,
    notes: d.notes,
    hasNotes: d.has_notes,
    source: d.source,
    destination: d.destination,
    derivedFrom: d.derived_from,
  }));

export const unmarshalRemoveProjectFilesResponseSchema: z.ZodType<RemoveProjectFilesResponse> =
  z
    .object({
      files: z.array(z.lazy(() => unmarshalProjectFileSchema)).optional(),
    })
    .transform(d => ({
      files: d.files,
    }));

export const unmarshalReviewProjectFilesResponseSchema: z.ZodType<ReviewProjectFilesResponse> =
  z
    .object({
      project_files: z
        .array(z.lazy(() => unmarshalProjectFileSchema))
        .optional(),
    })
    .transform(d => ({
      projectFiles: d.project_files,
    }));

export const unmarshalUnreviewProjectFilesResponseSchema: z.ZodType<UnreviewProjectFilesResponse> =
  z
    .object({
      project_files: z
        .array(z.lazy(() => unmarshalProjectFileSchema))
        .optional(),
    })
    .transform(d => ({
      projectFiles: d.project_files,
    }));

export const unmarshalWorkspaceLocationSchema: z.ZodType<WorkspaceLocation> = z
  .object({
    path: z.string().optional(),
    object_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    path: d.path,
    objectId: d.object_id,
  }));

export const marshalAddProjectFilesRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    sources: z.array(z.lazy(() => marshalSourceFileRefSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    sources: d.sources,
  }));

export const marshalAddProjectFilesResponseSchema: z.ZodType = z
  .object({
    files: z.array(z.lazy(() => marshalProjectFileSchema)).optional(),
  })
  .transform(d => ({
    files: d.files,
  }));

export const marshalApiErrorSchema: z.ZodType = z
  .object({
    errorCode: z.string().optional(),
    message: z.string().optional(),
    stackTrace: z.string().optional(),
    details: z.array(z.record(z.string(), z.unknown())).optional(),
  })
  .transform(d => ({
    error_code: d.errorCode,
    message: d.message,
    stack_trace: d.stackTrace,
    details: d.details,
  }));

export const marshalCancelOperationRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalConversionRunSchema: z.ZodType = z
  .object({
    project: z.string().optional(),
    state: z.string().optional(),
    errorCode: z.string().optional(),
    files: z.array(z.lazy(() => marshalConversionRunFileSchema)).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    endTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    skillPaths: z.array(z.string()).optional(),
  })
  .transform(d => ({
    project: d.project,
    state: d.state,
    error_code: d.errorCode,
    files: d.files,
    create_time: d.createTime,
    end_time: d.endTime,
    skill_paths: d.skillPaths,
  }));

export const marshalConversionRunFileSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    status: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    status: d.status,
  }));

export const marshalConvertProjectFilesRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
    startOver: z.boolean().optional(),
    names: z.array(z.string()).optional(),
    skillPaths: z.array(z.string()).optional(),
  })
  .transform(d => ({
    parent: d.parent,
    start_over: d.startOver,
    names: d.names,
    skill_paths: d.skillPaths,
  }));

export const marshalConvertProjectFilesResponseSchema: z.ZodType = z
  .object({
    run: z.lazy(() => marshalConversionRunSchema).optional(),
  })
  .transform(d => ({
    run: d.run,
  }));

export const marshalCreateProjectRequestSchema: z.ZodType = z
  .object({
    project: z.lazy(() => marshalProjectSchema).optional(),
  })
  .transform(d => ({
    project: d.project,
  }));

export const marshalDeleteProjectRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalDestinationResourceSchema: z.ZodType = z
  .object({
    jobId: z.bigint().optional(),
    pipelineId: z.string().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    pipeline_id: d.pipelineId,
  }));

export const marshalGetOperationRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalGetProjectFileRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalGetProjectRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalListProjectFilesRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    parent: d.parent,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListProjectFilesResponseSchema: z.ZodType = z
  .object({
    projectFiles: z.array(z.lazy(() => marshalProjectFileSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    project_files: d.projectFiles,
    next_page_token: d.nextPageToken,
  }));

export const marshalListProjectsRequestSchema: z.ZodType = z
  .object({
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    page_size: d.pageSize,
    page_token: d.pageToken,
    filter: d.filter,
  }));

export const marshalListProjectsResponseSchema: z.ZodType = z
  .object({
    projects: z.array(z.lazy(() => marshalProjectSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    projects: d.projects,
    next_page_token: d.nextPageToken,
  }));

export const marshalLocationSchema: z.ZodType = z
  .object({
    location: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('workspace'),
          workspace: z.lazy(() => marshalWorkspaceLocationSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.location?.$case === 'workspace' && {workspace: d.location.workspace}),
  }));

export const marshalOperationSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    done: z.boolean().optional(),
    result: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('error'),
          error: z.lazy(() => marshalApiErrorSchema),
        }),
        z.object({
          $case: z.literal('response'),
          response: z.record(z.string(), z.unknown()),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    metadata: d.metadata,
    done: d.done,
    ...(d.result?.$case === 'error' && {error: d.result.error}),
    ...(d.result?.$case === 'response' && {response: d.result.response}),
  }));

export const marshalProjectSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    folder: z.string().optional(),
    projectConfig: z.lazy(() => marshalProjectConfigSchema).optional(),
    displayName: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    changesLocked: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    folder: d.folder,
    project_config: d.projectConfig,
    display_name: d.displayName,
    create_time: d.createTime,
    update_time: d.updateTime,
    changes_locked: d.changesLocked,
  }));

export const marshalProjectConfigSchema: z.ZodType = z
  .object({
    sourceDialect: z.string().optional(),
    targetFramework: z.string().optional(),
    destinationLocation: z.lazy(() => marshalLocationSchema).optional(),
    lineageLocation: z.lazy(() => marshalLocationSchema).optional(),
  })
  .transform(d => ({
    source_dialect: d.sourceDialect,
    target_framework: d.targetFramework,
    destination_location: d.destinationLocation,
    lineage_location: d.lineageLocation,
  }));

export const marshalProjectFileSchema: z.ZodType = z
  .object({
    status: z.string().optional(),
    destinationKind: z.string().optional(),
    changes: z.array(z.string()).optional(),
    todos: z.array(z.string()).optional(),
    blockers: z.array(z.string()).optional(),
    errorMessage: z.string().optional(),
    name: z.string().optional(),
    destinationResource: z
      .lazy(() => marshalDestinationResourceSchema)
      .optional(),
    notes: z.array(z.string()).optional(),
    hasNotes: z.boolean().optional(),
    source: z.lazy(() => marshalLocationSchema).optional(),
    destination: z.lazy(() => marshalLocationSchema).optional(),
    derivedFrom: z.lazy(() => marshalLocationSchema).optional(),
  })
  .transform(d => ({
    status: d.status,
    destination_kind: d.destinationKind,
    changes: d.changes,
    todos: d.todos,
    blockers: d.blockers,
    error_message: d.errorMessage,
    name: d.name,
    destination_resource: d.destinationResource,
    notes: d.notes,
    has_notes: d.hasNotes,
    source: d.source,
    destination: d.destination,
    derived_from: d.derivedFrom,
  }));

export const marshalRemoveProjectFilesRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    names: d.names,
  }));

export const marshalRemoveProjectFilesResponseSchema: z.ZodType = z
  .object({
    files: z.array(z.lazy(() => marshalProjectFileSchema)).optional(),
  })
  .transform(d => ({
    files: d.files,
  }));

export const marshalReviewProjectFilesRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
    names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    parent: d.parent,
    names: d.names,
  }));

export const marshalReviewProjectFilesResponseSchema: z.ZodType = z
  .object({
    projectFiles: z.array(z.lazy(() => marshalProjectFileSchema)).optional(),
  })
  .transform(d => ({
    project_files: d.projectFiles,
  }));

export const marshalSourceFileRefSchema: z.ZodType = z
  .object({
    ref: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('workspace'),
          workspace: z.lazy(() => marshalWorkspaceLocationSchema),
        }),
      ])
      .optional(),
    derivedFrom: z.lazy(() => marshalLocationSchema).optional(),
  })
  .transform(d => ({
    ...(d.ref?.$case === 'workspace' && {workspace: d.ref.workspace}),
    derived_from: d.derivedFrom,
  }));

export const marshalUnreviewProjectFilesRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
    names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    parent: d.parent,
    names: d.names,
  }));

export const marshalUnreviewProjectFilesResponseSchema: z.ZodType = z
  .object({
    projectFiles: z.array(z.lazy(() => marshalProjectFileSchema)).optional(),
  })
  .transform(d => ({
    project_files: d.projectFiles,
  }));

export const marshalUpdateProjectRequestSchema: z.ZodType = z
  .object({
    project: z.lazy(() => marshalProjectSchema).optional(),
    updateMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    project: d.project,
    update_mask: d.updateMask,
  }));

export const marshalWorkspaceLocationSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    objectId: z.bigint().optional(),
  })
  .transform(d => ({
    path: d.path,
    object_id: d.objectId,
  }));

const locationFieldMaskSchema: FieldMaskSchema = {
  workspace: {
    wire: 'workspace',
    children: () => workspaceLocationFieldMaskSchema,
  },
};

const projectFieldMaskSchema: FieldMaskSchema = {
  changesLocked: {wire: 'changes_locked'},
  createTime: {wire: 'create_time'},
  displayName: {wire: 'display_name'},
  folder: {wire: 'folder'},
  name: {wire: 'name'},
  projectConfig: {
    wire: 'project_config',
    children: () => projectConfigFieldMaskSchema,
  },
  updateTime: {wire: 'update_time'},
};

export function projectFieldMask(...paths: string[]): FieldMask<Project> {
  return FieldMask.build<Project>(paths, projectFieldMaskSchema);
}

const projectConfigFieldMaskSchema: FieldMaskSchema = {
  destinationLocation: {
    wire: 'destination_location',
    children: () => locationFieldMaskSchema,
  },
  lineageLocation: {
    wire: 'lineage_location',
    children: () => locationFieldMaskSchema,
  },
  sourceDialect: {wire: 'source_dialect'},
  targetFramework: {wire: 'target_framework'},
};

const workspaceLocationFieldMaskSchema: FieldMaskSchema = {
  objectId: {wire: 'object_id'},
  path: {wire: 'path'},
};
