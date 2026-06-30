// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ComputeSize = {
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
  XLARGE: 'XLARGE',
} as const;
export type ComputeSize =
  | (typeof ComputeSize)[keyof typeof ComputeSize]
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SpaceUpdateState = {
  SPACE_UPDATE_STATE_UNSPECIFIED: 'SPACE_UPDATE_STATE_UNSPECIFIED',
  NOT_UPDATED: 'NOT_UPDATED',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
} as const;
export type SpaceUpdateState =
  | (typeof SpaceUpdateState)[keyof typeof SpaceUpdateState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppDeployment_Mode = {
  MODE_UNSPECIFIED: 'MODE_UNSPECIFIED',
  SNAPSHOT: 'SNAPSHOT',
  AUTO_SYNC: 'AUTO_SYNC',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppDeployment_Mode =
  | (typeof AppDeployment_Mode)[keyof typeof AppDeployment_Mode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppDeployment_State = {
  STATE_UNSPECIFIED: 'STATE_UNSPECIFIED',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  IN_PROGRESS: 'IN_PROGRESS',
  CANCELLED: 'CANCELLED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppDeployment_State =
  | (typeof AppDeployment_State)[keyof typeof AppDeployment_State]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppManifest_AppResourceExperimentSpec_ExperimentPermission = {
  CAN_MANAGE: 'CAN_MANAGE',
  CAN_EDIT: 'CAN_EDIT',
  CAN_READ: 'CAN_READ',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppManifest_AppResourceExperimentSpec_ExperimentPermission =
  | (typeof AppManifest_AppResourceExperimentSpec_ExperimentPermission)[keyof typeof AppManifest_AppResourceExperimentSpec_ExperimentPermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppManifest_AppResourceJobSpec_JobPermission = {
  CAN_MANAGE: 'CAN_MANAGE',
  IS_OWNER: 'IS_OWNER',
  CAN_MANAGE_RUN: 'CAN_MANAGE_RUN',
  CAN_VIEW: 'CAN_VIEW',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppManifest_AppResourceJobSpec_JobPermission =
  | (typeof AppManifest_AppResourceJobSpec_JobPermission)[keyof typeof AppManifest_AppResourceJobSpec_JobPermission]
  | (string & {});

/** Permission to grant on the secret scope. Supported permissions are: "READ", "WRITE", "MANAGE". */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppManifest_AppResourceSecretSpec_SecretPermission = {
  READ: 'READ',
  WRITE: 'WRITE',
  MANAGE: 'MANAGE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppManifest_AppResourceSecretSpec_SecretPermission =
  | (typeof AppManifest_AppResourceSecretSpec_SecretPermission)[keyof typeof AppManifest_AppResourceSecretSpec_SecretPermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppManifest_AppResourceServingEndpointSpec_ServingEndpointPermission =
  {
    CAN_MANAGE: 'CAN_MANAGE',
    CAN_QUERY: 'CAN_QUERY',
    CAN_VIEW: 'CAN_VIEW',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppManifest_AppResourceServingEndpointSpec_ServingEndpointPermission =

    | (typeof AppManifest_AppResourceServingEndpointSpec_ServingEndpointPermission)[keyof typeof AppManifest_AppResourceServingEndpointSpec_ServingEndpointPermission]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppManifest_AppResourceSqlWarehouseSpec_SqlWarehousePermission = {
  CAN_MANAGE: 'CAN_MANAGE',
  CAN_USE: 'CAN_USE',
  IS_OWNER: 'IS_OWNER',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppManifest_AppResourceSqlWarehouseSpec_SqlWarehousePermission =
  | (typeof AppManifest_AppResourceSqlWarehouseSpec_SqlWarehousePermission)[keyof typeof AppManifest_AppResourceSqlWarehouseSpec_SqlWarehousePermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppManifest_AppResourceUcSecurableSpec_UcSecurablePermission = {
  READ_VOLUME: 'READ_VOLUME',
  WRITE_VOLUME: 'WRITE_VOLUME',
  MANAGE: 'MANAGE',
  SELECT: 'SELECT',
  EXECUTE: 'EXECUTE',
  USE_CONNECTION: 'USE_CONNECTION',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppManifest_AppResourceUcSecurableSpec_UcSecurablePermission =
  | (typeof AppManifest_AppResourceUcSecurableSpec_UcSecurablePermission)[keyof typeof AppManifest_AppResourceUcSecurableSpec_UcSecurablePermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppManifest_AppResourceUcSecurableSpec_UcSecurableType = {
  VOLUME: 'VOLUME',
  TABLE: 'TABLE',
  FUNCTION: 'FUNCTION',
  CONNECTION: 'CONNECTION',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppManifest_AppResourceUcSecurableSpec_UcSecurableType =
  | (typeof AppManifest_AppResourceUcSecurableSpec_UcSecurableType)[keyof typeof AppManifest_AppResourceUcSecurableSpec_UcSecurableType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceApp_AppPermission = {
  CAN_USE: 'CAN_USE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceApp_AppPermission =
  | (typeof AppResourceApp_AppPermission)[keyof typeof AppResourceApp_AppPermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceDatabase_DatabasePermission = {
  CAN_CONNECT_AND_CREATE: 'CAN_CONNECT_AND_CREATE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceDatabase_DatabasePermission =
  | (typeof AppResourceDatabase_DatabasePermission)[keyof typeof AppResourceDatabase_DatabasePermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceExperiment_ExperimentPermission = {
  CAN_MANAGE: 'CAN_MANAGE',
  CAN_EDIT: 'CAN_EDIT',
  CAN_READ: 'CAN_READ',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceExperiment_ExperimentPermission =
  | (typeof AppResourceExperiment_ExperimentPermission)[keyof typeof AppResourceExperiment_ExperimentPermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceGenieSpace_GenieSpacePermission = {
  CAN_MANAGE: 'CAN_MANAGE',
  CAN_EDIT: 'CAN_EDIT',
  CAN_RUN: 'CAN_RUN',
  CAN_VIEW: 'CAN_VIEW',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceGenieSpace_GenieSpacePermission =
  | (typeof AppResourceGenieSpace_GenieSpacePermission)[keyof typeof AppResourceGenieSpace_GenieSpacePermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceJob_JobPermission = {
  CAN_MANAGE: 'CAN_MANAGE',
  IS_OWNER: 'IS_OWNER',
  CAN_MANAGE_RUN: 'CAN_MANAGE_RUN',
  CAN_VIEW: 'CAN_VIEW',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceJob_JobPermission =
  | (typeof AppResourceJob_JobPermission)[keyof typeof AppResourceJob_JobPermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourcePostgres_PostgresPermission = {
  CAN_CONNECT_AND_CREATE: 'CAN_CONNECT_AND_CREATE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourcePostgres_PostgresPermission =
  | (typeof AppResourcePostgres_PostgresPermission)[keyof typeof AppResourcePostgres_PostgresPermission]
  | (string & {});

/** Permission to grant on the secret scope. Supported permissions are: "READ", "WRITE", "MANAGE". */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceSecret_SecretPermission = {
  READ: 'READ',
  WRITE: 'WRITE',
  MANAGE: 'MANAGE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceSecret_SecretPermission =
  | (typeof AppResourceSecret_SecretPermission)[keyof typeof AppResourceSecret_SecretPermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceServingEndpoint_ServingEndpointPermission = {
  CAN_MANAGE: 'CAN_MANAGE',
  CAN_QUERY: 'CAN_QUERY',
  CAN_VIEW: 'CAN_VIEW',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceServingEndpoint_ServingEndpointPermission =
  | (typeof AppResourceServingEndpoint_ServingEndpointPermission)[keyof typeof AppResourceServingEndpoint_ServingEndpointPermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceSqlWarehouse_SqlWarehousePermission = {
  CAN_MANAGE: 'CAN_MANAGE',
  CAN_USE: 'CAN_USE',
  IS_OWNER: 'IS_OWNER',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceSqlWarehouse_SqlWarehousePermission =
  | (typeof AppResourceSqlWarehouse_SqlWarehousePermission)[keyof typeof AppResourceSqlWarehouse_SqlWarehousePermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceUcSecurable_UcSecurablePermission = {
  READ_VOLUME: 'READ_VOLUME',
  WRITE_VOLUME: 'WRITE_VOLUME',
  SELECT: 'SELECT',
  EXECUTE: 'EXECUTE',
  USE_CONNECTION: 'USE_CONNECTION',
  MODIFY: 'MODIFY',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceUcSecurable_UcSecurablePermission =
  | (typeof AppResourceUcSecurable_UcSecurablePermission)[keyof typeof AppResourceUcSecurable_UcSecurablePermission]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppResourceUcSecurable_UcSecurableType = {
  VOLUME: 'VOLUME',
  TABLE: 'TABLE',
  FUNCTION: 'FUNCTION',
  CONNECTION: 'CONNECTION',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppResourceUcSecurable_UcSecurableType =
  | (typeof AppResourceUcSecurable_UcSecurableType)[keyof typeof AppResourceUcSecurable_UcSecurableType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AppUpdate_UpdateStatus_UpdateState = {
  UPDATE_STATE_UNSPECIFIED: 'UPDATE_STATE_UNSPECIFIED',
  NOT_UPDATED: 'NOT_UPDATED',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AppUpdate_UpdateStatus_UpdateState =
  | (typeof AppUpdate_UpdateStatus_UpdateState)[keyof typeof AppUpdate_UpdateStatus_UpdateState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ApplicationStatus_ApplicationState = {
  APPLICATION_STATE_UNSPECIFIED: 'APPLICATION_STATE_UNSPECIFIED',
  DEPLOYING: 'DEPLOYING',
  RUNNING: 'RUNNING',
  CRASHED: 'CRASHED',
  UNAVAILABLE: 'UNAVAILABLE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ApplicationStatus_ApplicationState =
  | (typeof ApplicationStatus_ApplicationState)[keyof typeof ApplicationStatus_ApplicationState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ComputeStatus_ComputeState = {
  COMPUTE_STATE_UNSPECIFIED: 'COMPUTE_STATE_UNSPECIFIED',
  ERROR: 'ERROR',
  DELETING: 'DELETING',
  STARTING: 'STARTING',
  STOPPING: 'STOPPING',
  UPDATING: 'UPDATING',
  STOPPED: 'STOPPED',
  ACTIVE: 'ACTIVE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ComputeStatus_ComputeState =
  | (typeof ComputeStatus_ComputeState)[keyof typeof ComputeStatus_ComputeState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SpaceStatus_SpaceState = {
  SPACE_STATE_UNSPECIFIED: 'SPACE_STATE_UNSPECIFIED',
  SPACE_CREATING: 'SPACE_CREATING',
  SPACE_ACTIVE: 'SPACE_ACTIVE',
  SPACE_ERROR: 'SPACE_ERROR',
  SPACE_DELETING: 'SPACE_DELETING',
  SPACE_DELETED: 'SPACE_DELETED',
  SPACE_UPDATING: 'SPACE_UPDATING',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SpaceStatus_SpaceState =
  | (typeof SpaceStatus_SpaceState)[keyof typeof SpaceStatus_SpaceState]
  | (string & {});

/** Databricks Error that is returned by all Databricks APIs. */
export interface ApiError {
  errorCode?: ErrorCode | undefined;
  message?: string | undefined;
  stackTrace?: string | undefined;
  details?: Record<string, unknown>[] | undefined;
}

export interface App {
  /**
   * The name of the app. The name must contain only lowercase alphanumeric characters and hyphens.
   * It must be unique within the workspace.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /** The description of the app. */
  description?: string | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  computeStatus?: ComputeStatus | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  appStatus?: ApplicationStatus | undefined;
  /**
   * The URL of the app once it is deployed.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  url?: string | undefined;
  /**
   * The active deployment of the app. A deployment is considered active when it has been deployed
   * to the app compute.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  activeDeployment?: AppDeployment | undefined;
  /**
   * The creation time of the app. Formatted timestamp in ISO 6801.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  createTime?: Temporal.Instant | undefined;
  /**
   * The email of the user that created the app.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  creator?: string | undefined;
  /**
   * The update time of the app. Formatted timestamp in ISO 6801.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  updateTime?: Temporal.Instant | undefined;
  /**
   * The email of the user that last updated the app.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  updater?: string | undefined;
  /**
   * The pending deployment of the app. A deployment is considered pending when it is being prepared
   * for deployment to the app compute.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  pendingDeployment?: AppDeployment | undefined;
  /** Resources for the app. */
  resources?: AppResource[] | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  servicePrincipalId?: bigint | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  servicePrincipalName?: string | undefined;
  /**
   * The default workspace file system path of the source code from which app deployment are
   * created. This field tracks the workspace source code path of the last active deployment.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  defaultSourceCodePath?: string | undefined;
  budgetPolicyId?: string | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  effectiveBudgetPolicyId?: string | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  servicePrincipalClientId?: string | undefined;
  userApiScopes?: string[] | undefined;
  /**
   * The unique identifier of the app.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  id?: string | undefined;
  /**
   * The effective api scopes granted to the user access token.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  effectiveUserApiScopes?: string[] | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  oauth2AppIntegrationId?: string | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  oauth2AppClientId?: string | undefined;
  computeSize?: ComputeSize | undefined;
  usagePolicyId?: string | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  effectiveUsagePolicyId?: string | undefined;
  /** Minimum number of app instances. Must be set together with `compute_max_instances`. */
  computeMinInstances?: number | undefined;
  /** Maximum number of app instances. Must be set together with `compute_min_instances`. */
  computeMaxInstances?: number | undefined;
  /**
   * Git repository configuration for app deployments. When specified, deployments can
   * reference code from this repository by providing only the git reference (branch, tag, or commit).
   */
  gitRepository?: GitRepository | undefined;
  telemetryExportDestinations?: TelemetryExportDestination[] | undefined;
  /**
   * The URL of the thumbnail image for the app.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  thumbnailUrl?: string | undefined;
  /** Name of the space this app belongs to. */
  space?: string | undefined;
}

export interface AppDeployment {
  /** The unique id of the deployment. */
  deploymentId?: string | undefined;
  /**
   * The workspace file system path of the source code used to create the app deployment. This is different from
   * `deployment_artifacts.source_code_path`, which is the path used by the deployed app. The former refers
   * to the original source code location of the app in the workspace during deployment creation, whereas
   * the latter provides a system generated stable snapshotted source code path used by the deployment.
   */
  sourceCodePath?: string | undefined;
  /** Git repository to use as the source for the app deployment. */
  gitSource?: GitSource | undefined;
  /** The mode of which the deployment will manage the source code. */
  mode?: AppDeployment_Mode | undefined;
  /**
   * The deployment artifacts for an app.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  deploymentArtifacts?: AppDeploymentArtifacts | undefined;
  /**
   * Status and status message of the deployment
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  status?: AppDeploymentStatus | undefined;
  /**
   * The creation time of the deployment. Formatted timestamp in ISO 6801.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  createTime?: Temporal.Instant | undefined;
  /**
   * The email of the user creates the deployment.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  creator?: string | undefined;
  /**
   * The update time of the deployment. Formatted timestamp in ISO 6801.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  updateTime?: Temporal.Instant | undefined;
  /** The command with which to run the app. This will override the command specified in the app.yaml file. */
  command?: string[] | undefined;
  /** The environment variables to set in the app runtime environment. This will override the environment variables specified in the app.yaml file. */
  envVars?: EnvVar[] | undefined;
}

export interface AppDeploymentArtifacts {
  /** The snapshotted workspace file system path of the source code loaded by the deployed app. */
  sourceCodePath?: string | undefined;
}

export interface AppDeploymentStatus {
  /**
   * State of the deployment.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  state?: AppDeployment_State | undefined;
  /**
   * Message corresponding with the deployment state.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  message?: string | undefined;
}

/** App manifest definition */
export interface AppManifest {
  /**
   * The manifest schema version, for now only 1 is allowed
   *
   * Required. This field must be set in requests.
   */
  version?: number | undefined;
  /**
   * Name of the app defined by manifest author / publisher
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /** Description of the app defined by manifest author / publisher */
  description?: string | undefined;
  resourceSpecs?: AppManifest_AppResourceSpec[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AppManifest_AppResourceExperimentSpec {
  /** Required. This field must be set in requests. */
  permission?:
    | AppManifest_AppResourceExperimentSpec_ExperimentPermission
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AppManifest_AppResourceJobSpec {
  /**
   * Permissions to grant on the Job. Supported permissions are: "CAN_MANAGE", "IS_OWNER", "CAN_MANAGE_RUN", "CAN_VIEW".
   *
   * Required. This field must be set in requests.
   */
  permission?: AppManifest_AppResourceJobSpec_JobPermission | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AppManifest_AppResourceSecretSpec {
  /**
   * Permission to grant on the secret scope. For secrets, only one permission is allowed. Permission must be one of: "READ", "WRITE", "MANAGE".
   *
   * Required. This field must be set in requests.
   */
  permission?: AppManifest_AppResourceSecretSpec_SecretPermission | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AppManifest_AppResourceServingEndpointSpec {
  /**
   * Permission to grant on the serving endpoint. Supported permissions are: "CAN_MANAGE", "CAN_QUERY", "CAN_VIEW".
   *
   * Required. This field must be set in requests.
   */
  permission?:
    | AppManifest_AppResourceServingEndpointSpec_ServingEndpointPermission
    | undefined;
}

/** AppResource related fields are copied from app.proto but excludes resource identifiers (e.g. name, id, key, scope, etc.) */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AppManifest_AppResourceSpec {
  /**
   * Name of the App Resource.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /** Description of the App Resource. */
  description?: string | undefined;
  resource?:
    | {$case: 'secretSpec'; secretSpec: AppManifest_AppResourceSecretSpec}
    | {
        $case: 'sqlWarehouseSpec';
        sqlWarehouseSpec: AppManifest_AppResourceSqlWarehouseSpec;
      }
    | {
        $case: 'servingEndpointSpec';
        servingEndpointSpec: AppManifest_AppResourceServingEndpointSpec;
      }
    | {$case: 'jobSpec'; jobSpec: AppManifest_AppResourceJobSpec}
    | {
        $case: 'ucSecurableSpec';
        ucSecurableSpec: AppManifest_AppResourceUcSecurableSpec;
      }
    | {
        $case: 'experimentSpec';
        experimentSpec: AppManifest_AppResourceExperimentSpec;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AppManifest_AppResourceSqlWarehouseSpec {
  /**
   * Permission to grant on the SQL warehouse. Supported permissions are: "CAN_MANAGE", "CAN_USE", "IS_OWNER".
   *
   * Required. This field must be set in requests.
   */
  permission?:
    | AppManifest_AppResourceSqlWarehouseSpec_SqlWarehousePermission
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AppManifest_AppResourceUcSecurableSpec {
  /** Required. This field must be set in requests. */
  securableType?:
    | AppManifest_AppResourceUcSecurableSpec_UcSecurableType
    | undefined;
  /** Required. This field must be set in requests. */
  permission?:
    | AppManifest_AppResourceUcSecurableSpec_UcSecurablePermission
    | undefined;
}

export interface AppResource {
  /**
   * Name of the App Resource.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /** Description of the App Resource. */
  description?: string | undefined;
  resource?:
    | {$case: 'secret'; secret: AppResourceSecret}
    | {$case: 'sqlWarehouse'; sqlWarehouse: AppResourceSqlWarehouse}
    | {$case: 'servingEndpoint'; servingEndpoint: AppResourceServingEndpoint}
    | {$case: 'job'; job: AppResourceJob}
    | {$case: 'ucSecurable'; ucSecurable: AppResourceUcSecurable}
    | {$case: 'database'; database: AppResourceDatabase}
    | {$case: 'genieSpace'; genieSpace: AppResourceGenieSpace}
    | {$case: 'experiment'; experiment: AppResourceExperiment}
    | {$case: 'app'; app: AppResourceApp}
    | {$case: 'postgres'; postgres: AppResourcePostgres}
    | undefined;
}

export interface AppResourceApp {
  name?: string | undefined;
  permission?: AppResourceApp_AppPermission | undefined;
}

export interface AppResourceDatabase {
  /** Required. This field must be set in requests. */
  instanceName?: string | undefined;
  /** Required. This field must be set in requests. */
  databaseName?: string | undefined;
  /** Required. This field must be set in requests. */
  permission?: AppResourceDatabase_DatabasePermission | undefined;
}

export interface AppResourceExperiment {
  /** Required. This field must be set in requests. */
  experimentId?: string | undefined;
  /** Required. This field must be set in requests. */
  permission?: AppResourceExperiment_ExperimentPermission | undefined;
}

export interface AppResourceGenieSpace {
  /** Required. This field must be set in requests. */
  name?: string | undefined;
  /** Required. This field must be set in requests. */
  spaceId?: string | undefined;
  /** Required. This field must be set in requests. */
  permission?: AppResourceGenieSpace_GenieSpacePermission | undefined;
}

export interface AppResourceJob {
  /**
   * Id of the job to grant permission on.
   *
   * Required. This field must be set in requests.
   */
  id?: string | undefined;
  /**
   * Permissions to grant on the Job. Supported permissions are: "CAN_MANAGE", "IS_OWNER", "CAN_MANAGE_RUN", "CAN_VIEW".
   *
   * Required. This field must be set in requests.
   */
  permission?: AppResourceJob_JobPermission | undefined;
}

export interface AppResourcePostgres {
  branch?: string | undefined;
  database?: string | undefined;
  permission?: AppResourcePostgres_PostgresPermission | undefined;
}

export interface AppResourceSecret {
  /**
   * Scope of the secret to grant permission on.
   *
   * Required. This field must be set in requests.
   */
  scope?: string | undefined;
  /**
   * Key of the secret to grant permission on.
   *
   * Required. This field must be set in requests.
   */
  key?: string | undefined;
  /**
   * Permission to grant on the secret scope. For secrets, only one permission is allowed. Permission must be one of: "READ", "WRITE", "MANAGE".
   *
   * Required. This field must be set in requests.
   */
  permission?: AppResourceSecret_SecretPermission | undefined;
}

export interface AppResourceServingEndpoint {
  /**
   * Name of the serving endpoint to grant permission on.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /**
   * Permission to grant on the serving endpoint. Supported permissions are: "CAN_MANAGE", "CAN_QUERY", "CAN_VIEW".
   *
   * Required. This field must be set in requests.
   */
  permission?: AppResourceServingEndpoint_ServingEndpointPermission | undefined;
}

export interface AppResourceSqlWarehouse {
  /**
   * Id of the SQL warehouse to grant permission on.
   *
   * Required. This field must be set in requests.
   */
  id?: string | undefined;
  /**
   * Permission to grant on the SQL warehouse. Supported permissions are: "CAN_MANAGE", "CAN_USE", "IS_OWNER".
   *
   * Required. This field must be set in requests.
   */
  permission?: AppResourceSqlWarehouse_SqlWarehousePermission | undefined;
}

export interface AppResourceUcSecurable {
  /** Required. This field must be set in requests. */
  securableFullName?: string | undefined;
  /** Required. This field must be set in requests. */
  securableType?: AppResourceUcSecurable_UcSecurableType | undefined;
  /** Required. This field must be set in requests. */
  permission?: AppResourceUcSecurable_UcSecurablePermission | undefined;
  /**
   * The securable kind from Unity Catalog.
   * See https://docs.databricks.com/api/workspace/tables/get#securable_kind_manifest-securable_kind.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  securableKind?: string | undefined;
}

/** The thumbnail for an app. */
export interface AppThumbnail {
  /** The thumbnail image bytes. */
  thumbnail?: Uint8Array | undefined;
}

export interface AppUpdate {
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  status?: AppUpdate_UpdateStatus | undefined;
  description?: string | undefined;
  budgetPolicyId?: string | undefined;
  resources?: AppResource[] | undefined;
  userApiScopes?: string[] | undefined;
  computeSize?: ComputeSize | undefined;
  usagePolicyId?: string | undefined;
  /** Minimum number of app instances. Must be set together with `compute_max_instances`. */
  computeMinInstances?: number | undefined;
  /** Maximum number of app instances. Must be set together with `compute_min_instances`. */
  computeMaxInstances?: number | undefined;
  gitRepository?: GitRepository | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AppUpdate_UpdateStatus {
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  state?: AppUpdate_UpdateStatus_UpdateState | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  message?: string | undefined;
}

export interface ApplicationStatus {
  /**
   * State of the application.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  state?: ApplicationStatus_ApplicationState | undefined;
  /**
   * Application status message
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  message?: string | undefined;
  /**
   * The number of running instances of this application.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  runningInstances?: number | undefined;
}

export interface AsyncUpdateAppRequest {
  app?: App | undefined;
  /** Required. This field must be set in requests. */
  updateMask?: FieldMask<App> | undefined;
  appName?: string | undefined;
}

export interface ComputeStatus {
  /**
   * State of the app compute.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  state?: ComputeStatus_ComputeState | undefined;
  /**
   * Compute status message
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  message?: string | undefined;
  /**
   * The number of compute instances currently serving requests for this
   * application. An instance is considered active if it is reachable and ready
   * to handle requests.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  activeInstances?: number | undefined;
}

export interface CreateAppDeploymentRequest {
  /** The name of the app. */
  appName?: string | undefined;
  /** The app deployment configuration. */
  appDeployment?: AppDeployment | undefined;
}

export interface CreateAppRequest {
  app?: App | undefined;
  /** If true, the app will not be started after creation. */
  noCompute?: boolean | undefined;
}

export interface CreateCustomTemplateRequest {
  template?: CustomTemplate | undefined;
}

export interface CreateSpaceRequest {
  /** Required. This field must be set in requests. */
  space?: Space | undefined;
}

export interface CustomTemplate {
  /**
   * The name of the template. It must contain only alphanumeric characters, hyphens, underscores, and whitespaces.
   * It must be unique within the workspace.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /** The description of the template. */
  description?: string | undefined;
  /**
   * The Git repository URL that the template resides in.
   *
   * Required. This field must be set in requests.
   */
  gitRepo?: string | undefined;
  /**
   * The path to the template within the Git repository.
   *
   * Required. This field must be set in requests.
   */
  path?: string | undefined;
  /**
   * The manifest of the template. It defines fields and default values when installing the template.
   *
   * Required. This field must be set in requests.
   */
  manifest?: AppManifest | undefined;
  /**
   * The Git provider of the template.
   *
   * Required. This field must be set in requests.
   */
  gitProvider?: string | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  creator?: string | undefined;
}

export interface DeleteAppRequest {
  /** The name of the app. */
  name?: string | undefined;
}

export interface DeleteAppThumbnailRequest {
  /** The name of the app. */
  name?: string | undefined;
}

export interface DeleteCustomTemplateRequest {
  /**
   * The name of the custom template.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
}

export interface DeleteSpaceRequest {
  /**
   * The name of the app space.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
}

export interface EnvVar {
  /** The name of the environment variable. */
  name?: string | undefined;
  source?:
    | {
        $case: 'value';
        /** The value for the environment variable. */
        value: string;
      }
    | {
        $case: 'valueFrom';
        /** The name of an external <Databricks> resource that contains the value, such as a secret or a database table. */
        valueFrom: string;
      }
    | undefined;
}

export interface GetAppDeploymentRequest {
  /** The name of the app. */
  appName?: string | undefined;
  /** The unique id of the deployment. */
  deploymentId?: string | undefined;
}

export interface GetAppRequest {
  /** The name of the app. */
  name?: string | undefined;
}

export interface GetAppUpdateRequest {
  /** The name of the app. */
  appName?: string | undefined;
}

export interface GetCustomTemplateRequest {
  /**
   * The name of the custom template.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
}

/** The request message for `GetOperation` method. */
export interface GetOperationRequest {
  /** The name of the operation resource. */
  name?: string | undefined;
}

export interface GetSpaceRequest {
  /** The name of the app space. */
  name?: string | undefined;
}

/** Git repository configuration specifying the location of the repository. */
export interface GitRepository {
  /**
   * URL of the Git repository.
   *
   * Required. This field must be set in requests.
   */
  url?: string | undefined;
  /**
   * Git provider. Case insensitive. Supported values: gitHub, gitHubEnterprise, bitbucketCloud,
   * bitbucketServer, azureDevOpsServices, gitLab, gitLabEnterpriseEdition, awsCodeCommit.
   *
   * Required. This field must be set in requests.
   */
  provider?: string | undefined;
}

/** Complete git source specification including repository location and reference. */
export interface GitSource {
  /**
   * Git repository configuration. Populated from the app's git_repository configuration.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  gitRepository?: GitRepository | undefined;
  /** Git reference to checkout. Mutually exclusive: branch, tag, or commit. */
  reference?:
    | {
        $case: 'branch';
        /** Git branch to checkout. */
        branch: string;
      }
    | {
        $case: 'tag';
        /** Git tag to checkout. */
        tag: string;
      }
    | {
        $case: 'commit';
        /** Git commit SHA to checkout. */
        commit: string;
      }
    | undefined;
  /**
   * Relative path to the app source code within the Git repository. If not specified, the root
   * of the repository is used.
   */
  sourceCodePath?: string | undefined;
  /**
   * The resolved commit SHA that was actually used for the deployment. This is populated by the
   * system after resolving the reference (branch, tag, or commit). If commit is specified
   * directly, this will match commit. If a branch or tag is specified, this contains the
   * commit SHA that the branch or tag pointed to at deployment time.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  resolvedCommit?: string | undefined;
}

export interface ListAppDeploymentsRequest {
  /** The name of the app. */
  appName?: string | undefined;
  /** Pagination token to go to the next page of apps. Requests first page if absent. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. */
  pageSize?: number | undefined;
}

export interface ListAppDeploymentsResponse {
  /** Deployment history of the app. */
  appDeployments?: AppDeployment[] | undefined;
  /** Pagination token to request the next page of apps. */
  nextPageToken?: string | undefined;
}

/** Request to list all apps deployed in the workspace */
export interface ListAppsRequest {
  /** Pagination token to go to the next page of apps. Requests first page if absent. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. */
  pageSize?: number | undefined;
  /** Filter apps by app space name. When specified, only apps belonging to this space are returned. */
  space?: string | undefined;
}

export interface ListAppsResponse {
  apps?: App[] | undefined;
  /** Pagination token to request the next page of apps. */
  nextPageToken?: string | undefined;
}

export interface ListCustomTemplatesRequest {
  /** Pagination token to go to the next page of custom templates. Requests first page if absent. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. */
  pageSize?: number | undefined;
}

export interface ListCustomTemplatesResponse {
  templates?: CustomTemplate[] | undefined;
  /** Pagination token to request the next page of custom templates. */
  nextPageToken?: string | undefined;
}

export interface ListSpacesRequest {
  /** Pagination token to go to the next page of app spaces. Requests first page if absent. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. */
  pageSize?: number | undefined;
}

export interface ListSpacesResponse {
  spaces?: Space[] | undefined;
  /** Pagination token to request the next page of app spaces. */
  nextPageToken?: string | undefined;
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

export interface Space {
  /**
   * The name of the app space. The name must contain only lowercase alphanumeric characters and hyphens.
   * It must be unique within the workspace.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /** The description of the app space. */
  description?: string | undefined;
  /**
   * The status of the app space.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  status?: SpaceStatus | undefined;
  /**
   * The unique identifier of the app space.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  id?: string | undefined;
  /**
   * The creation time of the app space. Formatted timestamp in ISO 6801.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  createTime?: Temporal.Instant | undefined;
  /**
   * The email of the user that created the app space.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  creator?: string | undefined;
  /**
   * The update time of the app space. Formatted timestamp in ISO 6801.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  updateTime?: Temporal.Instant | undefined;
  /**
   * The email of the user that last updated the app space.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  updater?: string | undefined;
  /** Resources for the app space. Resources configured at the space level are available to all apps in the space. */
  resources?: AppResource[] | undefined;
  /** OAuth scopes for apps in the space. */
  userApiScopes?: string[] | undefined;
  /**
   * The effective api scopes granted to the user access token.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  effectiveUserApiScopes?: string[] | undefined;
  /**
   * The service principal ID for the app space.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  servicePrincipalId?: bigint | undefined;
  /**
   * The service principal name for the app space.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  servicePrincipalName?: string | undefined;
  /**
   * The service principal client ID for the app space.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  servicePrincipalClientId?: string | undefined;
  /** The usage policy ID for managing cost at the space level. */
  usagePolicyId?: string | undefined;
  /**
   * The effective usage policy ID used by apps in the space.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  effectiveUsagePolicyId?: string | undefined;
}

export interface SpaceStatus {
  /**
   * The state of the app space.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  state?: SpaceStatus_SpaceState | undefined;
  /**
   * Message providing context about the current state.
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  message?: string | undefined;
}

/** Tracks app space update information. */
export interface SpaceUpdate {
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  status?: SpaceUpdateStatus | undefined;
  description?: string | undefined;
  resources?: AppResource[] | undefined;
  userApiScopes?: string[] | undefined;
  usagePolicyId?: string | undefined;
}

/** Status of an app space update operation */
export interface SpaceUpdateStatus {
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  state?: SpaceUpdateState | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  message?: string | undefined;
}

export interface StartAppRequest {
  /** The name of the app. */
  name?: string | undefined;
}

export interface StopAppRequest {
  /** The name of the app. */
  name?: string | undefined;
}

/** A single telemetry export destination with its configuration and status. */
export interface TelemetryExportDestination {
  /** Destination type and configuration (writable). */
  destination?: {$case: 'unityCatalog'; unityCatalog: UnityCatalog} | undefined;
}

/** Unity Catalog Destinations for OTEL telemetry export. */
export interface UnityCatalog {
  /**
   * Unity Catalog table for OTEL logs.
   *
   * Required. This field must be set in requests.
   */
  logsTable?: string | undefined;
  /**
   * Unity Catalog table for OTEL metrics.
   *
   * Required. This field must be set in requests.
   */
  metricsTable?: string | undefined;
  /**
   * Unity Catalog table for OTEL traces (spans).
   *
   * Required. This field must be set in requests.
   */
  tracesTable?: string | undefined;
}

export interface UpdateAppRequest {
  app?: App | undefined;
}

export interface UpdateAppThumbnailRequest {
  /** The name of the app. */
  name?: string | undefined;
  /** The app thumbnail to set. */
  appThumbnail?: AppThumbnail | undefined;
}

export interface UpdateCustomTemplateRequest {
  template?: CustomTemplate | undefined;
}

export interface UpdateSpaceRequest {
  /** Required. This field must be set in requests. */
  space?: Space | undefined;
  /** Required. This field must be set in requests. */
  updateMask?: FieldMask<Space> | undefined;
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

export const unmarshalAppSchema: z.ZodType<App> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    compute_status: z.lazy(() => unmarshalComputeStatusSchema).optional(),
    app_status: z.lazy(() => unmarshalApplicationStatusSchema).optional(),
    url: z.string().optional(),
    active_deployment: z.lazy(() => unmarshalAppDeploymentSchema).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    creator: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updater: z.string().optional(),
    pending_deployment: z.lazy(() => unmarshalAppDeploymentSchema).optional(),
    resources: z.array(z.lazy(() => unmarshalAppResourceSchema)).optional(),
    service_principal_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    service_principal_name: z.string().optional(),
    default_source_code_path: z.string().optional(),
    budget_policy_id: z.string().optional(),
    effective_budget_policy_id: z.string().optional(),
    service_principal_client_id: z.string().optional(),
    user_api_scopes: z.array(z.string()).optional(),
    id: z.string().optional(),
    effective_user_api_scopes: z.array(z.string()).optional(),
    oauth2_app_integration_id: z.string().optional(),
    oauth2_app_client_id: z.string().optional(),
    compute_size: z.string().optional(),
    usage_policy_id: z.string().optional(),
    effective_usage_policy_id: z.string().optional(),
    compute_min_instances: z.number().optional(),
    compute_max_instances: z.number().optional(),
    git_repository: z.lazy(() => unmarshalGitRepositorySchema).optional(),
    telemetry_export_destinations: z
      .array(z.lazy(() => unmarshalTelemetryExportDestinationSchema))
      .optional(),
    thumbnail_url: z.string().optional(),
    space: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    computeStatus: d.compute_status,
    appStatus: d.app_status,
    url: d.url,
    activeDeployment: d.active_deployment,
    createTime: d.create_time,
    creator: d.creator,
    updateTime: d.update_time,
    updater: d.updater,
    pendingDeployment: d.pending_deployment,
    resources: d.resources,
    servicePrincipalId: d.service_principal_id,
    servicePrincipalName: d.service_principal_name,
    defaultSourceCodePath: d.default_source_code_path,
    budgetPolicyId: d.budget_policy_id,
    effectiveBudgetPolicyId: d.effective_budget_policy_id,
    servicePrincipalClientId: d.service_principal_client_id,
    userApiScopes: d.user_api_scopes,
    id: d.id,
    effectiveUserApiScopes: d.effective_user_api_scopes,
    oauth2AppIntegrationId: d.oauth2_app_integration_id,
    oauth2AppClientId: d.oauth2_app_client_id,
    computeSize: d.compute_size,
    usagePolicyId: d.usage_policy_id,
    effectiveUsagePolicyId: d.effective_usage_policy_id,
    computeMinInstances: d.compute_min_instances,
    computeMaxInstances: d.compute_max_instances,
    gitRepository: d.git_repository,
    telemetryExportDestinations: d.telemetry_export_destinations,
    thumbnailUrl: d.thumbnail_url,
    space: d.space,
  }));

export const unmarshalAppDeploymentSchema: z.ZodType<AppDeployment> = z
  .object({
    deployment_id: z.string().optional(),
    source_code_path: z.string().optional(),
    git_source: z.lazy(() => unmarshalGitSourceSchema).optional(),
    mode: z.string().optional(),
    deployment_artifacts: z
      .lazy(() => unmarshalAppDeploymentArtifactsSchema)
      .optional(),
    status: z.lazy(() => unmarshalAppDeploymentStatusSchema).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    creator: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    command: z.array(z.string()).optional(),
    env_vars: z.array(z.lazy(() => unmarshalEnvVarSchema)).optional(),
  })
  .transform(d => ({
    deploymentId: d.deployment_id,
    sourceCodePath: d.source_code_path,
    gitSource: d.git_source,
    mode: d.mode,
    deploymentArtifacts: d.deployment_artifacts,
    status: d.status,
    createTime: d.create_time,
    creator: d.creator,
    updateTime: d.update_time,
    command: d.command,
    envVars: d.env_vars,
  }));

export const unmarshalAppDeploymentArtifactsSchema: z.ZodType<AppDeploymentArtifacts> =
  z
    .object({
      source_code_path: z.string().optional(),
    })
    .transform(d => ({
      sourceCodePath: d.source_code_path,
    }));

export const unmarshalAppDeploymentStatusSchema: z.ZodType<AppDeploymentStatus> =
  z
    .object({
      state: z.string().optional(),
      message: z.string().optional(),
    })
    .transform(d => ({
      state: d.state,
      message: d.message,
    }));

export const unmarshalAppManifestSchema: z.ZodType<AppManifest> = z
  .object({
    version: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    resource_specs: z
      .array(z.lazy(() => unmarshalAppManifest_AppResourceSpecSchema))
      .optional(),
  })
  .transform(d => ({
    version: d.version,
    name: d.name,
    description: d.description,
    resourceSpecs: d.resource_specs,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAppManifest_AppResourceExperimentSpecSchema: z.ZodType<AppManifest_AppResourceExperimentSpec> =
  z
    .object({
      permission: z.string().optional(),
    })
    .transform(d => ({
      permission: d.permission,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAppManifest_AppResourceJobSpecSchema: z.ZodType<AppManifest_AppResourceJobSpec> =
  z
    .object({
      permission: z.string().optional(),
    })
    .transform(d => ({
      permission: d.permission,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAppManifest_AppResourceSecretSpecSchema: z.ZodType<AppManifest_AppResourceSecretSpec> =
  z
    .object({
      permission: z.string().optional(),
    })
    .transform(d => ({
      permission: d.permission,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAppManifest_AppResourceServingEndpointSpecSchema: z.ZodType<AppManifest_AppResourceServingEndpointSpec> =
  z
    .object({
      permission: z.string().optional(),
    })
    .transform(d => ({
      permission: d.permission,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAppManifest_AppResourceSpecSchema: z.ZodType<AppManifest_AppResourceSpec> =
  z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      secret_spec: z
        .lazy(() => unmarshalAppManifest_AppResourceSecretSpecSchema)
        .optional(),
      sql_warehouse_spec: z
        .lazy(() => unmarshalAppManifest_AppResourceSqlWarehouseSpecSchema)
        .optional(),
      serving_endpoint_spec: z
        .lazy(() => unmarshalAppManifest_AppResourceServingEndpointSpecSchema)
        .optional(),
      job_spec: z
        .lazy(() => unmarshalAppManifest_AppResourceJobSpecSchema)
        .optional(),
      uc_securable_spec: z
        .lazy(() => unmarshalAppManifest_AppResourceUcSecurableSpecSchema)
        .optional(),
      experiment_spec: z
        .lazy(() => unmarshalAppManifest_AppResourceExperimentSpecSchema)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      description: d.description,
      resource:
        d.secret_spec !== undefined
          ? {$case: 'secretSpec' as const, secretSpec: d.secret_spec}
          : d.sql_warehouse_spec !== undefined
            ? {
                $case: 'sqlWarehouseSpec' as const,
                sqlWarehouseSpec: d.sql_warehouse_spec,
              }
            : d.serving_endpoint_spec !== undefined
              ? {
                  $case: 'servingEndpointSpec' as const,
                  servingEndpointSpec: d.serving_endpoint_spec,
                }
              : d.job_spec !== undefined
                ? {$case: 'jobSpec' as const, jobSpec: d.job_spec}
                : d.uc_securable_spec !== undefined
                  ? {
                      $case: 'ucSecurableSpec' as const,
                      ucSecurableSpec: d.uc_securable_spec,
                    }
                  : d.experiment_spec !== undefined
                    ? {
                        $case: 'experimentSpec' as const,
                        experimentSpec: d.experiment_spec,
                      }
                    : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAppManifest_AppResourceSqlWarehouseSpecSchema: z.ZodType<AppManifest_AppResourceSqlWarehouseSpec> =
  z
    .object({
      permission: z.string().optional(),
    })
    .transform(d => ({
      permission: d.permission,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAppManifest_AppResourceUcSecurableSpecSchema: z.ZodType<AppManifest_AppResourceUcSecurableSpec> =
  z
    .object({
      securable_type: z.string().optional(),
      permission: z.string().optional(),
    })
    .transform(d => ({
      securableType: d.securable_type,
      permission: d.permission,
    }));

export const unmarshalAppResourceSchema: z.ZodType<AppResource> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    secret: z.lazy(() => unmarshalAppResourceSecretSchema).optional(),
    sql_warehouse: z
      .lazy(() => unmarshalAppResourceSqlWarehouseSchema)
      .optional(),
    serving_endpoint: z
      .lazy(() => unmarshalAppResourceServingEndpointSchema)
      .optional(),
    job: z.lazy(() => unmarshalAppResourceJobSchema).optional(),
    uc_securable: z
      .lazy(() => unmarshalAppResourceUcSecurableSchema)
      .optional(),
    database: z.lazy(() => unmarshalAppResourceDatabaseSchema).optional(),
    genie_space: z.lazy(() => unmarshalAppResourceGenieSpaceSchema).optional(),
    experiment: z.lazy(() => unmarshalAppResourceExperimentSchema).optional(),
    app: z.lazy(() => unmarshalAppResourceAppSchema).optional(),
    postgres: z.lazy(() => unmarshalAppResourcePostgresSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    resource:
      d.secret !== undefined
        ? {$case: 'secret' as const, secret: d.secret}
        : d.sql_warehouse !== undefined
          ? {$case: 'sqlWarehouse' as const, sqlWarehouse: d.sql_warehouse}
          : d.serving_endpoint !== undefined
            ? {
                $case: 'servingEndpoint' as const,
                servingEndpoint: d.serving_endpoint,
              }
            : d.job !== undefined
              ? {$case: 'job' as const, job: d.job}
              : d.uc_securable !== undefined
                ? {$case: 'ucSecurable' as const, ucSecurable: d.uc_securable}
                : d.database !== undefined
                  ? {$case: 'database' as const, database: d.database}
                  : d.genie_space !== undefined
                    ? {$case: 'genieSpace' as const, genieSpace: d.genie_space}
                    : d.experiment !== undefined
                      ? {$case: 'experiment' as const, experiment: d.experiment}
                      : d.app !== undefined
                        ? {$case: 'app' as const, app: d.app}
                        : d.postgres !== undefined
                          ? {$case: 'postgres' as const, postgres: d.postgres}
                          : undefined,
  }));

export const unmarshalAppResourceAppSchema: z.ZodType<AppResourceApp> = z
  .object({
    name: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    permission: d.permission,
  }));

export const unmarshalAppResourceDatabaseSchema: z.ZodType<AppResourceDatabase> =
  z
    .object({
      instance_name: z.string().optional(),
      database_name: z.string().optional(),
      permission: z.string().optional(),
    })
    .transform(d => ({
      instanceName: d.instance_name,
      databaseName: d.database_name,
      permission: d.permission,
    }));

export const unmarshalAppResourceExperimentSchema: z.ZodType<AppResourceExperiment> =
  z
    .object({
      experiment_id: z.string().optional(),
      permission: z.string().optional(),
    })
    .transform(d => ({
      experimentId: d.experiment_id,
      permission: d.permission,
    }));

export const unmarshalAppResourceGenieSpaceSchema: z.ZodType<AppResourceGenieSpace> =
  z
    .object({
      name: z.string().optional(),
      space_id: z.string().optional(),
      permission: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      spaceId: d.space_id,
      permission: d.permission,
    }));

export const unmarshalAppResourceJobSchema: z.ZodType<AppResourceJob> = z
  .object({
    id: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    permission: d.permission,
  }));

export const unmarshalAppResourcePostgresSchema: z.ZodType<AppResourcePostgres> =
  z
    .object({
      branch: z.string().optional(),
      database: z.string().optional(),
      permission: z.string().optional(),
    })
    .transform(d => ({
      branch: d.branch,
      database: d.database,
      permission: d.permission,
    }));

export const unmarshalAppResourceSecretSchema: z.ZodType<AppResourceSecret> = z
  .object({
    scope: z.string().optional(),
    key: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    key: d.key,
    permission: d.permission,
  }));

export const unmarshalAppResourceServingEndpointSchema: z.ZodType<AppResourceServingEndpoint> =
  z
    .object({
      name: z.string().optional(),
      permission: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      permission: d.permission,
    }));

export const unmarshalAppResourceSqlWarehouseSchema: z.ZodType<AppResourceSqlWarehouse> =
  z
    .object({
      id: z.string().optional(),
      permission: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      permission: d.permission,
    }));

export const unmarshalAppResourceUcSecurableSchema: z.ZodType<AppResourceUcSecurable> =
  z
    .object({
      securable_full_name: z.string().optional(),
      securable_type: z.string().optional(),
      permission: z.string().optional(),
      securable_kind: z.string().optional(),
    })
    .transform(d => ({
      securableFullName: d.securable_full_name,
      securableType: d.securable_type,
      permission: d.permission,
      securableKind: d.securable_kind,
    }));

export const unmarshalAppThumbnailSchema: z.ZodType<AppThumbnail> = z
  .object({
    thumbnail: z
      .string()
      .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
      .optional(),
  })
  .transform(d => ({
    thumbnail: d.thumbnail,
  }));

export const unmarshalAppUpdateSchema: z.ZodType<AppUpdate> = z
  .object({
    status: z.lazy(() => unmarshalAppUpdate_UpdateStatusSchema).optional(),
    description: z.string().optional(),
    budget_policy_id: z.string().optional(),
    resources: z.array(z.lazy(() => unmarshalAppResourceSchema)).optional(),
    user_api_scopes: z.array(z.string()).optional(),
    compute_size: z.string().optional(),
    usage_policy_id: z.string().optional(),
    compute_min_instances: z.number().optional(),
    compute_max_instances: z.number().optional(),
    git_repository: z.lazy(() => unmarshalGitRepositorySchema).optional(),
  })
  .transform(d => ({
    status: d.status,
    description: d.description,
    budgetPolicyId: d.budget_policy_id,
    resources: d.resources,
    userApiScopes: d.user_api_scopes,
    computeSize: d.compute_size,
    usagePolicyId: d.usage_policy_id,
    computeMinInstances: d.compute_min_instances,
    computeMaxInstances: d.compute_max_instances,
    gitRepository: d.git_repository,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAppUpdate_UpdateStatusSchema: z.ZodType<AppUpdate_UpdateStatus> =
  z
    .object({
      state: z.string().optional(),
      message: z.string().optional(),
    })
    .transform(d => ({
      state: d.state,
      message: d.message,
    }));

export const unmarshalApplicationStatusSchema: z.ZodType<ApplicationStatus> = z
  .object({
    state: z.string().optional(),
    message: z.string().optional(),
    running_instances: z.number().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
    runningInstances: d.running_instances,
  }));

export const unmarshalComputeStatusSchema: z.ZodType<ComputeStatus> = z
  .object({
    state: z.string().optional(),
    message: z.string().optional(),
    active_instances: z.number().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
    activeInstances: d.active_instances,
  }));

export const unmarshalCustomTemplateSchema: z.ZodType<CustomTemplate> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    git_repo: z.string().optional(),
    path: z.string().optional(),
    manifest: z.lazy(() => unmarshalAppManifestSchema).optional(),
    git_provider: z.string().optional(),
    creator: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    gitRepo: d.git_repo,
    path: d.path,
    manifest: d.manifest,
    gitProvider: d.git_provider,
    creator: d.creator,
  }));

export const unmarshalEnvVarSchema: z.ZodType<EnvVar> = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
    value_from: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    source:
      d.value !== undefined
        ? {$case: 'value' as const, value: d.value}
        : d.value_from !== undefined
          ? {$case: 'valueFrom' as const, valueFrom: d.value_from}
          : undefined,
  }));

export const unmarshalGitRepositorySchema: z.ZodType<GitRepository> = z
  .object({
    url: z.string().optional(),
    provider: z.string().optional(),
  })
  .transform(d => ({
    url: d.url,
    provider: d.provider,
  }));

export const unmarshalGitSourceSchema: z.ZodType<GitSource> = z
  .object({
    git_repository: z.lazy(() => unmarshalGitRepositorySchema).optional(),
    branch: z.string().optional(),
    tag: z.string().optional(),
    commit: z.string().optional(),
    source_code_path: z.string().optional(),
    resolved_commit: z.string().optional(),
  })
  .transform(d => ({
    gitRepository: d.git_repository,
    reference:
      d.branch !== undefined
        ? {$case: 'branch' as const, branch: d.branch}
        : d.tag !== undefined
          ? {$case: 'tag' as const, tag: d.tag}
          : d.commit !== undefined
            ? {$case: 'commit' as const, commit: d.commit}
            : undefined,
    sourceCodePath: d.source_code_path,
    resolvedCommit: d.resolved_commit,
  }));

export const unmarshalListAppDeploymentsResponseSchema: z.ZodType<ListAppDeploymentsResponse> =
  z
    .object({
      app_deployments: z
        .array(z.lazy(() => unmarshalAppDeploymentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      appDeployments: d.app_deployments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListAppsResponseSchema: z.ZodType<ListAppsResponse> = z
  .object({
    apps: z.array(z.lazy(() => unmarshalAppSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    apps: d.apps,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListCustomTemplatesResponseSchema: z.ZodType<ListCustomTemplatesResponse> =
  z
    .object({
      templates: z
        .array(z.lazy(() => unmarshalCustomTemplateSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      templates: d.templates,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSpacesResponseSchema: z.ZodType<ListSpacesResponse> =
  z
    .object({
      spaces: z.array(z.lazy(() => unmarshalSpaceSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      spaces: d.spaces,
      nextPageToken: d.next_page_token,
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

export const unmarshalSpaceSchema: z.ZodType<Space> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    status: z.lazy(() => unmarshalSpaceStatusSchema).optional(),
    id: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    creator: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updater: z.string().optional(),
    resources: z.array(z.lazy(() => unmarshalAppResourceSchema)).optional(),
    user_api_scopes: z.array(z.string()).optional(),
    effective_user_api_scopes: z.array(z.string()).optional(),
    service_principal_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    service_principal_name: z.string().optional(),
    service_principal_client_id: z.string().optional(),
    usage_policy_id: z.string().optional(),
    effective_usage_policy_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    status: d.status,
    id: d.id,
    createTime: d.create_time,
    creator: d.creator,
    updateTime: d.update_time,
    updater: d.updater,
    resources: d.resources,
    userApiScopes: d.user_api_scopes,
    effectiveUserApiScopes: d.effective_user_api_scopes,
    servicePrincipalId: d.service_principal_id,
    servicePrincipalName: d.service_principal_name,
    servicePrincipalClientId: d.service_principal_client_id,
    usagePolicyId: d.usage_policy_id,
    effectiveUsagePolicyId: d.effective_usage_policy_id,
  }));

export const unmarshalSpaceStatusSchema: z.ZodType<SpaceStatus> = z
  .object({
    state: z.string().optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
  }));

export const unmarshalSpaceUpdateSchema: z.ZodType<SpaceUpdate> = z
  .object({
    status: z.lazy(() => unmarshalSpaceUpdateStatusSchema).optional(),
    description: z.string().optional(),
    resources: z.array(z.lazy(() => unmarshalAppResourceSchema)).optional(),
    user_api_scopes: z.array(z.string()).optional(),
    usage_policy_id: z.string().optional(),
  })
  .transform(d => ({
    status: d.status,
    description: d.description,
    resources: d.resources,
    userApiScopes: d.user_api_scopes,
    usagePolicyId: d.usage_policy_id,
  }));

export const unmarshalSpaceUpdateStatusSchema: z.ZodType<SpaceUpdateStatus> = z
  .object({
    state: z.string().optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
  }));

export const unmarshalTelemetryExportDestinationSchema: z.ZodType<TelemetryExportDestination> =
  z
    .object({
      unity_catalog: z.lazy(() => unmarshalUnityCatalogSchema).optional(),
    })
    .transform(d => ({
      destination:
        d.unity_catalog !== undefined
          ? {$case: 'unityCatalog' as const, unityCatalog: d.unity_catalog}
          : undefined,
    }));

export const unmarshalUnityCatalogSchema: z.ZodType<UnityCatalog> = z
  .object({
    logs_table: z.string().optional(),
    metrics_table: z.string().optional(),
    traces_table: z.string().optional(),
  })
  .transform(d => ({
    logsTable: d.logs_table,
    metricsTable: d.metrics_table,
    tracesTable: d.traces_table,
  }));

export const marshalAppSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    computeStatus: z.lazy(() => marshalComputeStatusSchema).optional(),
    appStatus: z.lazy(() => marshalApplicationStatusSchema).optional(),
    url: z.string().optional(),
    activeDeployment: z.lazy(() => marshalAppDeploymentSchema).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    creator: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updater: z.string().optional(),
    pendingDeployment: z.lazy(() => marshalAppDeploymentSchema).optional(),
    resources: z.array(z.lazy(() => marshalAppResourceSchema)).optional(),
    servicePrincipalId: z.bigint().optional(),
    servicePrincipalName: z.string().optional(),
    defaultSourceCodePath: z.string().optional(),
    budgetPolicyId: z.string().optional(),
    effectiveBudgetPolicyId: z.string().optional(),
    servicePrincipalClientId: z.string().optional(),
    userApiScopes: z.array(z.string()).optional(),
    id: z.string().optional(),
    effectiveUserApiScopes: z.array(z.string()).optional(),
    oauth2AppIntegrationId: z.string().optional(),
    oauth2AppClientId: z.string().optional(),
    computeSize: z.string().optional(),
    usagePolicyId: z.string().optional(),
    effectiveUsagePolicyId: z.string().optional(),
    computeMinInstances: z.number().optional(),
    computeMaxInstances: z.number().optional(),
    gitRepository: z.lazy(() => marshalGitRepositorySchema).optional(),
    telemetryExportDestinations: z
      .array(z.lazy(() => marshalTelemetryExportDestinationSchema))
      .optional(),
    thumbnailUrl: z.string().optional(),
    space: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    compute_status: d.computeStatus,
    app_status: d.appStatus,
    url: d.url,
    active_deployment: d.activeDeployment,
    create_time: d.createTime,
    creator: d.creator,
    update_time: d.updateTime,
    updater: d.updater,
    pending_deployment: d.pendingDeployment,
    resources: d.resources,
    service_principal_id: d.servicePrincipalId,
    service_principal_name: d.servicePrincipalName,
    default_source_code_path: d.defaultSourceCodePath,
    budget_policy_id: d.budgetPolicyId,
    effective_budget_policy_id: d.effectiveBudgetPolicyId,
    service_principal_client_id: d.servicePrincipalClientId,
    user_api_scopes: d.userApiScopes,
    id: d.id,
    effective_user_api_scopes: d.effectiveUserApiScopes,
    oauth2_app_integration_id: d.oauth2AppIntegrationId,
    oauth2_app_client_id: d.oauth2AppClientId,
    compute_size: d.computeSize,
    usage_policy_id: d.usagePolicyId,
    effective_usage_policy_id: d.effectiveUsagePolicyId,
    compute_min_instances: d.computeMinInstances,
    compute_max_instances: d.computeMaxInstances,
    git_repository: d.gitRepository,
    telemetry_export_destinations: d.telemetryExportDestinations,
    thumbnail_url: d.thumbnailUrl,
    space: d.space,
  }));

export const marshalAppDeploymentSchema: z.ZodType = z
  .object({
    deploymentId: z.string().optional(),
    sourceCodePath: z.string().optional(),
    gitSource: z.lazy(() => marshalGitSourceSchema).optional(),
    mode: z.string().optional(),
    deploymentArtifacts: z
      .lazy(() => marshalAppDeploymentArtifactsSchema)
      .optional(),
    status: z.lazy(() => marshalAppDeploymentStatusSchema).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    creator: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    command: z.array(z.string()).optional(),
    envVars: z.array(z.lazy(() => marshalEnvVarSchema)).optional(),
  })
  .transform(d => ({
    deployment_id: d.deploymentId,
    source_code_path: d.sourceCodePath,
    git_source: d.gitSource,
    mode: d.mode,
    deployment_artifacts: d.deploymentArtifacts,
    status: d.status,
    create_time: d.createTime,
    creator: d.creator,
    update_time: d.updateTime,
    command: d.command,
    env_vars: d.envVars,
  }));

export const marshalAppDeploymentArtifactsSchema: z.ZodType = z
  .object({
    sourceCodePath: z.string().optional(),
  })
  .transform(d => ({
    source_code_path: d.sourceCodePath,
  }));

export const marshalAppDeploymentStatusSchema: z.ZodType = z
  .object({
    state: z.string().optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
  }));

export const marshalAppManifestSchema: z.ZodType = z
  .object({
    version: z.number().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    resourceSpecs: z
      .array(z.lazy(() => marshalAppManifest_AppResourceSpecSchema))
      .optional(),
  })
  .transform(d => ({
    version: d.version,
    name: d.name,
    description: d.description,
    resource_specs: d.resourceSpecs,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAppManifest_AppResourceExperimentSpecSchema: z.ZodType = z
  .object({
    permission: z.string().optional(),
  })
  .transform(d => ({
    permission: d.permission,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAppManifest_AppResourceJobSpecSchema: z.ZodType = z
  .object({
    permission: z.string().optional(),
  })
  .transform(d => ({
    permission: d.permission,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAppManifest_AppResourceSecretSpecSchema: z.ZodType = z
  .object({
    permission: z.string().optional(),
  })
  .transform(d => ({
    permission: d.permission,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAppManifest_AppResourceServingEndpointSpecSchema: z.ZodType =
  z
    .object({
      permission: z.string().optional(),
    })
    .transform(d => ({
      permission: d.permission,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAppManifest_AppResourceSpecSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    resource: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('secretSpec'),
          secretSpec: z.lazy(
            () => marshalAppManifest_AppResourceSecretSpecSchema
          ),
        }),
        z.object({
          $case: z.literal('sqlWarehouseSpec'),
          sqlWarehouseSpec: z.lazy(
            () => marshalAppManifest_AppResourceSqlWarehouseSpecSchema
          ),
        }),
        z.object({
          $case: z.literal('servingEndpointSpec'),
          servingEndpointSpec: z.lazy(
            () => marshalAppManifest_AppResourceServingEndpointSpecSchema
          ),
        }),
        z.object({
          $case: z.literal('jobSpec'),
          jobSpec: z.lazy(() => marshalAppManifest_AppResourceJobSpecSchema),
        }),
        z.object({
          $case: z.literal('ucSecurableSpec'),
          ucSecurableSpec: z.lazy(
            () => marshalAppManifest_AppResourceUcSecurableSpecSchema
          ),
        }),
        z.object({
          $case: z.literal('experimentSpec'),
          experimentSpec: z.lazy(
            () => marshalAppManifest_AppResourceExperimentSpecSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    ...(d.resource?.$case === 'secretSpec' && {
      secret_spec: d.resource.secretSpec,
    }),
    ...(d.resource?.$case === 'sqlWarehouseSpec' && {
      sql_warehouse_spec: d.resource.sqlWarehouseSpec,
    }),
    ...(d.resource?.$case === 'servingEndpointSpec' && {
      serving_endpoint_spec: d.resource.servingEndpointSpec,
    }),
    ...(d.resource?.$case === 'jobSpec' && {job_spec: d.resource.jobSpec}),
    ...(d.resource?.$case === 'ucSecurableSpec' && {
      uc_securable_spec: d.resource.ucSecurableSpec,
    }),
    ...(d.resource?.$case === 'experimentSpec' && {
      experiment_spec: d.resource.experimentSpec,
    }),
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAppManifest_AppResourceSqlWarehouseSpecSchema: z.ZodType = z
  .object({
    permission: z.string().optional(),
  })
  .transform(d => ({
    permission: d.permission,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAppManifest_AppResourceUcSecurableSpecSchema: z.ZodType = z
  .object({
    securableType: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    securable_type: d.securableType,
    permission: d.permission,
  }));

export const marshalAppResourceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    resource: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('secret'),
          secret: z.lazy(() => marshalAppResourceSecretSchema),
        }),
        z.object({
          $case: z.literal('sqlWarehouse'),
          sqlWarehouse: z.lazy(() => marshalAppResourceSqlWarehouseSchema),
        }),
        z.object({
          $case: z.literal('servingEndpoint'),
          servingEndpoint: z.lazy(
            () => marshalAppResourceServingEndpointSchema
          ),
        }),
        z.object({
          $case: z.literal('job'),
          job: z.lazy(() => marshalAppResourceJobSchema),
        }),
        z.object({
          $case: z.literal('ucSecurable'),
          ucSecurable: z.lazy(() => marshalAppResourceUcSecurableSchema),
        }),
        z.object({
          $case: z.literal('database'),
          database: z.lazy(() => marshalAppResourceDatabaseSchema),
        }),
        z.object({
          $case: z.literal('genieSpace'),
          genieSpace: z.lazy(() => marshalAppResourceGenieSpaceSchema),
        }),
        z.object({
          $case: z.literal('experiment'),
          experiment: z.lazy(() => marshalAppResourceExperimentSchema),
        }),
        z.object({
          $case: z.literal('app'),
          app: z.lazy(() => marshalAppResourceAppSchema),
        }),
        z.object({
          $case: z.literal('postgres'),
          postgres: z.lazy(() => marshalAppResourcePostgresSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    ...(d.resource?.$case === 'secret' && {secret: d.resource.secret}),
    ...(d.resource?.$case === 'sqlWarehouse' && {
      sql_warehouse: d.resource.sqlWarehouse,
    }),
    ...(d.resource?.$case === 'servingEndpoint' && {
      serving_endpoint: d.resource.servingEndpoint,
    }),
    ...(d.resource?.$case === 'job' && {job: d.resource.job}),
    ...(d.resource?.$case === 'ucSecurable' && {
      uc_securable: d.resource.ucSecurable,
    }),
    ...(d.resource?.$case === 'database' && {database: d.resource.database}),
    ...(d.resource?.$case === 'genieSpace' && {
      genie_space: d.resource.genieSpace,
    }),
    ...(d.resource?.$case === 'experiment' && {
      experiment: d.resource.experiment,
    }),
    ...(d.resource?.$case === 'app' && {app: d.resource.app}),
    ...(d.resource?.$case === 'postgres' && {postgres: d.resource.postgres}),
  }));

export const marshalAppResourceAppSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    permission: d.permission,
  }));

export const marshalAppResourceDatabaseSchema: z.ZodType = z
  .object({
    instanceName: z.string().optional(),
    databaseName: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    instance_name: d.instanceName,
    database_name: d.databaseName,
    permission: d.permission,
  }));

export const marshalAppResourceExperimentSchema: z.ZodType = z
  .object({
    experimentId: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    experiment_id: d.experimentId,
    permission: d.permission,
  }));

export const marshalAppResourceGenieSpaceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    spaceId: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    space_id: d.spaceId,
    permission: d.permission,
  }));

export const marshalAppResourceJobSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    permission: d.permission,
  }));

export const marshalAppResourcePostgresSchema: z.ZodType = z
  .object({
    branch: z.string().optional(),
    database: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    branch: d.branch,
    database: d.database,
    permission: d.permission,
  }));

export const marshalAppResourceSecretSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    key: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    key: d.key,
    permission: d.permission,
  }));

export const marshalAppResourceServingEndpointSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    permission: d.permission,
  }));

export const marshalAppResourceSqlWarehouseSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    permission: d.permission,
  }));

export const marshalAppResourceUcSecurableSchema: z.ZodType = z
  .object({
    securableFullName: z.string().optional(),
    securableType: z.string().optional(),
    permission: z.string().optional(),
    securableKind: z.string().optional(),
  })
  .transform(d => ({
    securable_full_name: d.securableFullName,
    securable_type: d.securableType,
    permission: d.permission,
    securable_kind: d.securableKind,
  }));

export const marshalAppThumbnailSchema: z.ZodType = z
  .object({
    thumbnail: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
  })
  .transform(d => ({
    thumbnail: d.thumbnail,
  }));

export const marshalApplicationStatusSchema: z.ZodType = z
  .object({
    state: z.string().optional(),
    message: z.string().optional(),
    runningInstances: z.number().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
    running_instances: d.runningInstances,
  }));

export const marshalAsyncUpdateAppRequestSchema: z.ZodType = z
  .object({
    app: z.lazy(() => marshalAppSchema).optional(),
    updateMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
    appName: z.string().optional(),
  })
  .transform(d => ({
    app: d.app,
    update_mask: d.updateMask,
    app_name: d.appName,
  }));

export const marshalComputeStatusSchema: z.ZodType = z
  .object({
    state: z.string().optional(),
    message: z.string().optional(),
    activeInstances: z.number().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
    active_instances: d.activeInstances,
  }));

export const marshalCustomTemplateSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    gitRepo: z.string().optional(),
    path: z.string().optional(),
    manifest: z.lazy(() => marshalAppManifestSchema).optional(),
    gitProvider: z.string().optional(),
    creator: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    git_repo: d.gitRepo,
    path: d.path,
    manifest: d.manifest,
    git_provider: d.gitProvider,
    creator: d.creator,
  }));

export const marshalEnvVarSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    source: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('value'), value: z.string()}),
        z.object({$case: z.literal('valueFrom'), valueFrom: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    ...(d.source?.$case === 'value' && {value: d.source.value}),
    ...(d.source?.$case === 'valueFrom' && {value_from: d.source.valueFrom}),
  }));

export const marshalGitRepositorySchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    provider: z.string().optional(),
  })
  .transform(d => ({
    url: d.url,
    provider: d.provider,
  }));

export const marshalGitSourceSchema: z.ZodType = z
  .object({
    gitRepository: z.lazy(() => marshalGitRepositorySchema).optional(),
    reference: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('branch'), branch: z.string()}),
        z.object({$case: z.literal('tag'), tag: z.string()}),
        z.object({$case: z.literal('commit'), commit: z.string()}),
      ])
      .optional(),
    sourceCodePath: z.string().optional(),
    resolvedCommit: z.string().optional(),
  })
  .transform(d => ({
    git_repository: d.gitRepository,
    ...(d.reference?.$case === 'branch' && {branch: d.reference.branch}),
    ...(d.reference?.$case === 'tag' && {tag: d.reference.tag}),
    ...(d.reference?.$case === 'commit' && {commit: d.reference.commit}),
    source_code_path: d.sourceCodePath,
    resolved_commit: d.resolvedCommit,
  }));

export const marshalSpaceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    status: z.lazy(() => marshalSpaceStatusSchema).optional(),
    id: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    creator: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updater: z.string().optional(),
    resources: z.array(z.lazy(() => marshalAppResourceSchema)).optional(),
    userApiScopes: z.array(z.string()).optional(),
    effectiveUserApiScopes: z.array(z.string()).optional(),
    servicePrincipalId: z.bigint().optional(),
    servicePrincipalName: z.string().optional(),
    servicePrincipalClientId: z.string().optional(),
    usagePolicyId: z.string().optional(),
    effectiveUsagePolicyId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    status: d.status,
    id: d.id,
    create_time: d.createTime,
    creator: d.creator,
    update_time: d.updateTime,
    updater: d.updater,
    resources: d.resources,
    user_api_scopes: d.userApiScopes,
    effective_user_api_scopes: d.effectiveUserApiScopes,
    service_principal_id: d.servicePrincipalId,
    service_principal_name: d.servicePrincipalName,
    service_principal_client_id: d.servicePrincipalClientId,
    usage_policy_id: d.usagePolicyId,
    effective_usage_policy_id: d.effectiveUsagePolicyId,
  }));

export const marshalSpaceStatusSchema: z.ZodType = z
  .object({
    state: z.string().optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
  }));

export const marshalStartAppRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalStopAppRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalTelemetryExportDestinationSchema: z.ZodType = z
  .object({
    destination: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('unityCatalog'),
          unityCatalog: z.lazy(() => marshalUnityCatalogSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.destination?.$case === 'unityCatalog' && {
      unity_catalog: d.destination.unityCatalog,
    }),
  }));

export const marshalUnityCatalogSchema: z.ZodType = z
  .object({
    logsTable: z.string().optional(),
    metricsTable: z.string().optional(),
    tracesTable: z.string().optional(),
  })
  .transform(d => ({
    logs_table: d.logsTable,
    metrics_table: d.metricsTable,
    traces_table: d.tracesTable,
  }));

export const marshalUpdateAppThumbnailRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    appThumbnail: z.lazy(() => marshalAppThumbnailSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    app_thumbnail: d.appThumbnail,
  }));

const appFieldMaskSchema: FieldMaskSchema = {
  activeDeployment: {
    wire: 'active_deployment',
    children: () => appDeploymentFieldMaskSchema,
  },
  appStatus: {
    wire: 'app_status',
    children: () => applicationStatusFieldMaskSchema,
  },
  budgetPolicyId: {wire: 'budget_policy_id'},
  computeMaxInstances: {wire: 'compute_max_instances'},
  computeMinInstances: {wire: 'compute_min_instances'},
  computeSize: {wire: 'compute_size'},
  computeStatus: {
    wire: 'compute_status',
    children: () => computeStatusFieldMaskSchema,
  },
  createTime: {wire: 'create_time'},
  creator: {wire: 'creator'},
  defaultSourceCodePath: {wire: 'default_source_code_path'},
  description: {wire: 'description'},
  effectiveBudgetPolicyId: {wire: 'effective_budget_policy_id'},
  effectiveUsagePolicyId: {wire: 'effective_usage_policy_id'},
  effectiveUserApiScopes: {wire: 'effective_user_api_scopes'},
  gitRepository: {
    wire: 'git_repository',
    children: () => gitRepositoryFieldMaskSchema,
  },
  id: {wire: 'id'},
  name: {wire: 'name'},
  oauth2AppClientId: {wire: 'oauth2_app_client_id'},
  oauth2AppIntegrationId: {wire: 'oauth2_app_integration_id'},
  pendingDeployment: {
    wire: 'pending_deployment',
    children: () => appDeploymentFieldMaskSchema,
  },
  resources: {wire: 'resources'},
  servicePrincipalClientId: {wire: 'service_principal_client_id'},
  servicePrincipalId: {wire: 'service_principal_id'},
  servicePrincipalName: {wire: 'service_principal_name'},
  space: {wire: 'space'},
  telemetryExportDestinations: {wire: 'telemetry_export_destinations'},
  thumbnailUrl: {wire: 'thumbnail_url'},
  updateTime: {wire: 'update_time'},
  updater: {wire: 'updater'},
  url: {wire: 'url'},
  usagePolicyId: {wire: 'usage_policy_id'},
  userApiScopes: {wire: 'user_api_scopes'},
};

export function appFieldMask(...paths: string[]): FieldMask<App> {
  return FieldMask.build<App>(paths, appFieldMaskSchema);
}

const appDeploymentFieldMaskSchema: FieldMaskSchema = {
  command: {wire: 'command'},
  createTime: {wire: 'create_time'},
  creator: {wire: 'creator'},
  deploymentArtifacts: {
    wire: 'deployment_artifacts',
    children: () => appDeploymentArtifactsFieldMaskSchema,
  },
  deploymentId: {wire: 'deployment_id'},
  envVars: {wire: 'env_vars'},
  gitSource: {wire: 'git_source', children: () => gitSourceFieldMaskSchema},
  mode: {wire: 'mode'},
  sourceCodePath: {wire: 'source_code_path'},
  status: {wire: 'status', children: () => appDeploymentStatusFieldMaskSchema},
  updateTime: {wire: 'update_time'},
};

const appDeploymentArtifactsFieldMaskSchema: FieldMaskSchema = {
  sourceCodePath: {wire: 'source_code_path'},
};

const appDeploymentStatusFieldMaskSchema: FieldMaskSchema = {
  message: {wire: 'message'},
  state: {wire: 'state'},
};

const applicationStatusFieldMaskSchema: FieldMaskSchema = {
  message: {wire: 'message'},
  runningInstances: {wire: 'running_instances'},
  state: {wire: 'state'},
};

const computeStatusFieldMaskSchema: FieldMaskSchema = {
  activeInstances: {wire: 'active_instances'},
  message: {wire: 'message'},
  state: {wire: 'state'},
};

const gitRepositoryFieldMaskSchema: FieldMaskSchema = {
  provider: {wire: 'provider'},
  url: {wire: 'url'},
};

const gitSourceFieldMaskSchema: FieldMaskSchema = {
  branch: {wire: 'branch'},
  commit: {wire: 'commit'},
  gitRepository: {
    wire: 'git_repository',
    children: () => gitRepositoryFieldMaskSchema,
  },
  resolvedCommit: {wire: 'resolved_commit'},
  sourceCodePath: {wire: 'source_code_path'},
  tag: {wire: 'tag'},
};

const spaceFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  creator: {wire: 'creator'},
  description: {wire: 'description'},
  effectiveUsagePolicyId: {wire: 'effective_usage_policy_id'},
  effectiveUserApiScopes: {wire: 'effective_user_api_scopes'},
  id: {wire: 'id'},
  name: {wire: 'name'},
  resources: {wire: 'resources'},
  servicePrincipalClientId: {wire: 'service_principal_client_id'},
  servicePrincipalId: {wire: 'service_principal_id'},
  servicePrincipalName: {wire: 'service_principal_name'},
  status: {wire: 'status', children: () => spaceStatusFieldMaskSchema},
  updateTime: {wire: 'update_time'},
  updater: {wire: 'updater'},
  usagePolicyId: {wire: 'usage_policy_id'},
  userApiScopes: {wire: 'user_api_scopes'},
};

export function spaceFieldMask(...paths: string[]): FieldMask<Space> {
  return FieldMask.build<Space>(paths, spaceFieldMaskSchema);
}

const spaceStatusFieldMaskSchema: FieldMaskSchema = {
  message: {wire: 'message'},
  state: {wire: 'state'},
};
