// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** If changed, also update estore/namespaces/defaultbaseenvironments/latest.proto */
export enum BaseEnvironmentType {
  BASE_ENVIRONMENT_TYPE_UNSPECIFIED = 'BASE_ENVIRONMENT_TYPE_UNSPECIFIED',
  CPU = 'CPU',
  GPU = 'GPU',
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

/** Identifies who provides and manages a WorkspaceBaseEnvironment. */
export enum WorkspaceBaseEnvironmentProvider {
  WORKSPACE_BASE_ENVIRONMENT_PROVIDER_UNSPECIFIED = 'WORKSPACE_BASE_ENVIRONMENT_PROVIDER_UNSPECIFIED',
  /** Created and managed by workspace admins. */
  ADMIN = 'ADMIN',
  /** Provided by Databricks. Read-only; cannot be created, updated, or deleted. */
  DATABRICKS = 'DATABRICKS',
}

/** Status of the environment materialization. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum WorkspaceBaseEnvironmentCache_Status {
  STATUS_UNSPECIFIED = 'STATUS_UNSPECIFIED',
  /** Materialized environment creation is pending. */
  PENDING = 'PENDING',
  /** Materialized environment has been successfully created. */
  CREATED = 'CREATED',
  /** Materialized environment creation failed. */
  FAILED = 'FAILED',
  /** Materialized environment has expired. */
  EXPIRED = 'EXPIRED',
  /** Materialized environment is invalid. */
  INVALID = 'INVALID',
  /** Materialized environment is being refreshed. */
  REFRESHING = 'REFRESHING',
}

/** Request message for CreateWorkspaceBaseEnvironment. */
export interface CreateWorkspaceBaseEnvironmentRequest {
  /** Required. The workspace base environment to create. */
  workspaceBaseEnvironment?: WorkspaceBaseEnvironment | undefined;
  /**
   * The ID to use for the workspace base environment, which will become the final component of
   * the resource name.
   * This value should be 4-63 characters, and valid characters are /[a-z][0-9]-/.
   */
  workspaceBaseEnvironmentId?: string | undefined;
  /**
   * A unique identifier for this request. A random UUID is recommended.
   * This request is only idempotent if a request_id is provided.
   */
  requestId?: string | undefined;
}

/** Databricks Error that is returned by all Databricks APIs. */
export interface DatabricksServiceExceptionWithDetailsProto {
  errorCode?: ErrorCode | undefined;
  message?: string | undefined;
  stackTrace?: string | undefined;
  details?: Record<string, unknown>[] | undefined;
}

/**
 * A singleton resource representing the default workspace base environment configuration.
 * This resource contains the workspace base environments that are used as defaults
 * for serverless notebooks and jobs in the workspace, for both CPU and GPU compute types.
 */
export interface DefaultWorkspaceBaseEnvironment {
  /**
   * The resource name of this singleton resource.
   * Format: default-workspace-base-environment
   */
  name?: string | undefined;
  /**
   * The default workspace base environment for CPU compute.
   * Format: workspace-base-environments/{workspace_base_environment}
   */
  cpuWorkspaceBaseEnvironment?: string | undefined;
  /**
   * The default workspace base environment for GPU compute.
   * Format: workspace-base-environments/{workspace_base_environment}
   */
  gpuWorkspaceBaseEnvironment?: string | undefined;
}

/** Request message for DeleteWorkspaceBaseEnvironment. */
export interface DeleteWorkspaceBaseEnvironmentRequest {
  /**
   * Required. The resource name of the workspace base environment to delete.
   * Format: workspace-base-environments/{workspace_base_environment}
   */
  name?: string | undefined;
}

/** Request message for GetDefaultWorkspaceBaseEnvironment. */
export interface GetDefaultWorkspaceBaseEnvironmentRequest {
  /**
   * A static resource name of the default workspace base environment.
   * Format: default-workspace-base-environment
   */
  name?: string | undefined;
}

/** The request message for `GetOperation` method. */
export interface GetOperationRequest {
  /** The name of the operation resource. */
  name?: string | undefined;
}

/** Request message for GetWorkspaceBaseEnvironment. */
export interface GetWorkspaceBaseEnvironmentRequest {
  /**
   * Required. The resource name of the workspace base environment to retrieve.
   * Format: workspace-base-environments/{workspace_base_environment}
   */
  name?: string | undefined;
}

/** Request message for ListWorkspaceBaseEnvironments. */
export interface ListWorkspaceBaseEnvironmentsRequest {
  /**
   * The maximum number of environments to return per page.
   * Default is 1000.
   */
  pageSize?: number | undefined;
  /** Page token for pagination. Received from a previous ListWorkspaceBaseEnvironments call. */
  pageToken?: string | undefined;
}

/** Response message for ListWorkspaceBaseEnvironments. */
export interface ListWorkspaceBaseEnvironmentsResponse {
  /** The list of workspace base environments. */
  workspaceBaseEnvironments?: WorkspaceBaseEnvironment[] | undefined;
  /**
   * Token to retrieve the next page of results.
   * Empty if there are no more results.
   */
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
  /** The error result of the operation in case of failure or cancellation. */
  error?: DatabricksServiceExceptionWithDetailsProto | undefined;
  /** The normal, successful response of the operation. */
  response?: Record<string, unknown> | undefined;
}

/** Request message for RefreshWorkspaceBaseEnvironments. */
export interface RefreshWorkspaceBaseEnvironmentRequest {
  /**
   * Required. The resource name of the workspace base environment to delete.
   * Format: workspace-base-environments/{workspace_base_environment}
   */
  name?: string | undefined;
}

/** Request message for UpdateDefaultWorkspaceBaseEnvironment. */
export interface UpdateDefaultWorkspaceBaseEnvironmentRequest {
  /** Required. The default workspace base environment configuration to update. */
  defaultWorkspaceBaseEnvironment?: DefaultWorkspaceBaseEnvironment | undefined;
  /**
   * Field mask specifying which fields to update. Use comma as the separator for multiple fields (no space).
   * The special value '*' indicates that all fields should be updated (full replacement).
   * Valid field paths: cpu_workspace_base_environment, gpu_workspace_base_environment
   *
   * To unset one or both defaults, include the field path(s) in the mask and omit them from the request body.
   * To unset both, you must list both paths explicitly — the wildcard '*' cannot be used to unset fields.
   */
  updateMask?: string | undefined;
}

/** Request message for UpdateWorkspaceBaseEnvironment. */
export interface UpdateWorkspaceBaseEnvironmentRequest {
  name?: string | undefined;
  /**
   * Required. The workspace base environment with updated fields.
   * The name field is used to identify the environment to update.
   */
  workspaceBaseEnvironment?: WorkspaceBaseEnvironment | undefined;
}

/**
 * A WorkspaceBaseEnvironment defines a workspace-level environment configuration
 * consisting of an environment version and a list of dependencies.
 */
export interface WorkspaceBaseEnvironment {
  /**
   * The resource name of the workspace base environment.
   * Format: workspace-base-environments/{workspace-base-environment}
   */
  name?: string | undefined;
  /** Human-readable display name for the workspace base environment. */
  displayName?: string | undefined;
  /** The WSFS or UC Volumes path to the environment YAML file. */
  filepath?: string | undefined;
  /** User ID of the creator. */
  creatorUserId?: string | undefined;
  /** Timestamp when the environment was created. */
  createTime?: Temporal.Instant | undefined;
  /** User ID of the last user who updated the environment. */
  lastUpdatedUserId?: string | undefined;
  /** Timestamp when the environment was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The status of the materialized workspace base environment. */
  status?: WorkspaceBaseEnvironmentCache_Status | undefined;
  /** Status message providing additional details about the environment status. */
  message?: string | undefined;
  /** Whether this is the default environment for the workspace. */
  isDefault?: boolean | undefined;
  /** The type of base environment (CPU or GPU). */
  baseEnvironmentType?: BaseEnvironmentType | undefined;
  /** The provider of this workspace base environment. */
  baseEnvironmentProvider?: WorkspaceBaseEnvironmentProvider | undefined;
}

/** Materialized environment information for a WorkspaceBaseEnvironment. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkspaceBaseEnvironmentCache {}

/**
 * Metadata for the WorkspaceBaseEnvironment long-running operations.
 * This message tracks the progress of the workspace base environment long-running process.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkspaceBaseEnvironmentOperationMetadata {}

export const unmarshalDatabricksServiceExceptionWithDetailsProtoSchema: z.ZodType<DatabricksServiceExceptionWithDetailsProto> =
  z
    .object({
      error_code: z.enum(ErrorCode).optional(),
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

export const unmarshalDefaultWorkspaceBaseEnvironmentSchema: z.ZodType<DefaultWorkspaceBaseEnvironment> =
  z
    .object({
      name: z.string().optional(),
      cpu_workspace_base_environment: z.string().optional(),
      gpu_workspace_base_environment: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      cpuWorkspaceBaseEnvironment: d.cpu_workspace_base_environment,
      gpuWorkspaceBaseEnvironment: d.gpu_workspace_base_environment,
    }));

export const unmarshalListWorkspaceBaseEnvironmentsResponseSchema: z.ZodType<ListWorkspaceBaseEnvironmentsResponse> =
  z
    .object({
      workspace_base_environments: z
        .array(z.lazy(() => unmarshalWorkspaceBaseEnvironmentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      workspaceBaseEnvironments: d.workspace_base_environments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalOperationSchema: z.ZodType<Operation> = z
  .object({
    name: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    done: z.boolean().optional(),
    error: z
      .lazy(() => unmarshalDatabricksServiceExceptionWithDetailsProtoSchema)
      .optional(),
    response: z.record(z.string(), z.unknown()).optional(),
  })
  .transform(d => ({
    name: d.name,
    metadata: d.metadata,
    done: d.done,
    error: d.error,
    response: d.response,
  }));

export const unmarshalRefreshWorkspaceBaseEnvironmentRequestSchema: z.ZodType<RefreshWorkspaceBaseEnvironmentRequest> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalWorkspaceBaseEnvironmentSchema: z.ZodType<WorkspaceBaseEnvironment> =
  z
    .object({
      name: z.string().optional(),
      display_name: z.string().optional(),
      filepath: z.string().optional(),
      creator_user_id: z.string().optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      last_updated_user_id: z.string().optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      status: z.enum(WorkspaceBaseEnvironmentCache_Status).optional(),
      message: z.string().optional(),
      is_default: z.boolean().optional(),
      base_environment_type: z.enum(BaseEnvironmentType).optional(),
      base_environment_provider: z
        .enum(WorkspaceBaseEnvironmentProvider)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      displayName: d.display_name,
      filepath: d.filepath,
      creatorUserId: d.creator_user_id,
      createTime: d.create_time,
      lastUpdatedUserId: d.last_updated_user_id,
      updateTime: d.update_time,
      status: d.status,
      message: d.message,
      isDefault: d.is_default,
      baseEnvironmentType: d.base_environment_type,
      baseEnvironmentProvider: d.base_environment_provider,
    }));

export const unmarshalWorkspaceBaseEnvironmentOperationMetadataSchema: z.ZodType<WorkspaceBaseEnvironmentOperationMetadata> =
  z.object({});

export const marshalDatabricksServiceExceptionWithDetailsProtoSchema: z.ZodType =
  z
    .object({
      errorCode: z.enum(ErrorCode).optional(),
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

export const marshalDefaultWorkspaceBaseEnvironmentSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    cpuWorkspaceBaseEnvironment: z.string().optional(),
    gpuWorkspaceBaseEnvironment: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    cpu_workspace_base_environment: d.cpuWorkspaceBaseEnvironment,
    gpu_workspace_base_environment: d.gpuWorkspaceBaseEnvironment,
  }));

export const marshalListWorkspaceBaseEnvironmentsResponseSchema: z.ZodType = z
  .object({
    workspaceBaseEnvironments: z
      .array(z.lazy(() => marshalWorkspaceBaseEnvironmentSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    workspace_base_environments: d.workspaceBaseEnvironments,
    next_page_token: d.nextPageToken,
  }));

export const marshalOperationSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
    done: z.boolean().optional(),
    error: z
      .lazy(() => marshalDatabricksServiceExceptionWithDetailsProtoSchema)
      .optional(),
    response: z.record(z.string(), z.unknown()).optional(),
  })
  .transform(d => ({
    name: d.name,
    metadata: d.metadata,
    done: d.done,
    error: d.error,
    response: d.response,
  }));

export const marshalRefreshWorkspaceBaseEnvironmentRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalWorkspaceBaseEnvironmentSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    displayName: z.string().optional(),
    filepath: z.string().optional(),
    creatorUserId: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    lastUpdatedUserId: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    status: z.enum(WorkspaceBaseEnvironmentCache_Status).optional(),
    message: z.string().optional(),
    isDefault: z.boolean().optional(),
    baseEnvironmentType: z.enum(BaseEnvironmentType).optional(),
    baseEnvironmentProvider: z
      .enum(WorkspaceBaseEnvironmentProvider)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    display_name: d.displayName,
    filepath: d.filepath,
    creator_user_id: d.creatorUserId,
    create_time: d.createTime,
    last_updated_user_id: d.lastUpdatedUserId,
    update_time: d.updateTime,
    status: d.status,
    message: d.message,
    is_default: d.isDefault,
    base_environment_type: d.baseEnvironmentType,
    base_environment_provider: d.baseEnvironmentProvider,
  }));

export const marshalWorkspaceBaseEnvironmentOperationMetadataSchema: z.ZodType =
  z.object({});

const createWorkspaceBaseEnvironmentRequestFieldMaskSchema: FieldMaskSchema = {
  requestId: {wire: 'request_id'},
  workspaceBaseEnvironment: {
    wire: 'workspace_base_environment',
    children: () => workspaceBaseEnvironmentFieldMaskSchema,
  },
  workspaceBaseEnvironmentId: {wire: 'workspace_base_environment_id'},
};

export function createWorkspaceBaseEnvironmentRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateWorkspaceBaseEnvironmentRequest> {
  return FieldMask.build<CreateWorkspaceBaseEnvironmentRequest>(
    paths,
    createWorkspaceBaseEnvironmentRequestFieldMaskSchema
  );
}

const databricksServiceExceptionWithDetailsProtoFieldMaskSchema: FieldMaskSchema =
  {
    details: {wire: 'details'},
    errorCode: {wire: 'error_code'},
    message: {wire: 'message'},
    stackTrace: {wire: 'stack_trace'},
  };

export function databricksServiceExceptionWithDetailsProtoFieldMask(
  ...paths: string[]
): FieldMask<DatabricksServiceExceptionWithDetailsProto> {
  return FieldMask.build<DatabricksServiceExceptionWithDetailsProto>(
    paths,
    databricksServiceExceptionWithDetailsProtoFieldMaskSchema
  );
}

const defaultWorkspaceBaseEnvironmentFieldMaskSchema: FieldMaskSchema = {
  cpuWorkspaceBaseEnvironment: {wire: 'cpu_workspace_base_environment'},
  gpuWorkspaceBaseEnvironment: {wire: 'gpu_workspace_base_environment'},
  name: {wire: 'name'},
};

export function defaultWorkspaceBaseEnvironmentFieldMask(
  ...paths: string[]
): FieldMask<DefaultWorkspaceBaseEnvironment> {
  return FieldMask.build<DefaultWorkspaceBaseEnvironment>(
    paths,
    defaultWorkspaceBaseEnvironmentFieldMaskSchema
  );
}

const deleteWorkspaceBaseEnvironmentRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function deleteWorkspaceBaseEnvironmentRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteWorkspaceBaseEnvironmentRequest> {
  return FieldMask.build<DeleteWorkspaceBaseEnvironmentRequest>(
    paths,
    deleteWorkspaceBaseEnvironmentRequestFieldMaskSchema
  );
}

const getDefaultWorkspaceBaseEnvironmentRequestFieldMaskSchema: FieldMaskSchema =
  {
    name: {wire: 'name'},
  };

export function getDefaultWorkspaceBaseEnvironmentRequestFieldMask(
  ...paths: string[]
): FieldMask<GetDefaultWorkspaceBaseEnvironmentRequest> {
  return FieldMask.build<GetDefaultWorkspaceBaseEnvironmentRequest>(
    paths,
    getDefaultWorkspaceBaseEnvironmentRequestFieldMaskSchema
  );
}

const getOperationRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getOperationRequestFieldMask(
  ...paths: string[]
): FieldMask<GetOperationRequest> {
  return FieldMask.build<GetOperationRequest>(
    paths,
    getOperationRequestFieldMaskSchema
  );
}

const getWorkspaceBaseEnvironmentRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getWorkspaceBaseEnvironmentRequestFieldMask(
  ...paths: string[]
): FieldMask<GetWorkspaceBaseEnvironmentRequest> {
  return FieldMask.build<GetWorkspaceBaseEnvironmentRequest>(
    paths,
    getWorkspaceBaseEnvironmentRequestFieldMaskSchema
  );
}

const listWorkspaceBaseEnvironmentsRequestFieldMaskSchema: FieldMaskSchema = {
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
};

export function listWorkspaceBaseEnvironmentsRequestFieldMask(
  ...paths: string[]
): FieldMask<ListWorkspaceBaseEnvironmentsRequest> {
  return FieldMask.build<ListWorkspaceBaseEnvironmentsRequest>(
    paths,
    listWorkspaceBaseEnvironmentsRequestFieldMaskSchema
  );
}

const listWorkspaceBaseEnvironmentsResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  workspaceBaseEnvironments: {wire: 'workspace_base_environments'},
};

export function listWorkspaceBaseEnvironmentsResponseFieldMask(
  ...paths: string[]
): FieldMask<ListWorkspaceBaseEnvironmentsResponse> {
  return FieldMask.build<ListWorkspaceBaseEnvironmentsResponse>(
    paths,
    listWorkspaceBaseEnvironmentsResponseFieldMaskSchema
  );
}

const operationFieldMaskSchema: FieldMaskSchema = {
  done: {wire: 'done'},
  error: {
    wire: 'error',
    children: () => databricksServiceExceptionWithDetailsProtoFieldMaskSchema,
  },
  metadata: {wire: 'metadata'},
  name: {wire: 'name'},
  response: {wire: 'response'},
};

export function operationFieldMask(...paths: string[]): FieldMask<Operation> {
  return FieldMask.build<Operation>(paths, operationFieldMaskSchema);
}

const refreshWorkspaceBaseEnvironmentRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function refreshWorkspaceBaseEnvironmentRequestFieldMask(
  ...paths: string[]
): FieldMask<RefreshWorkspaceBaseEnvironmentRequest> {
  return FieldMask.build<RefreshWorkspaceBaseEnvironmentRequest>(
    paths,
    refreshWorkspaceBaseEnvironmentRequestFieldMaskSchema
  );
}

const updateDefaultWorkspaceBaseEnvironmentRequestFieldMaskSchema: FieldMaskSchema =
  {
    defaultWorkspaceBaseEnvironment: {
      wire: 'default_workspace_base_environment',
      children: () => defaultWorkspaceBaseEnvironmentFieldMaskSchema,
    },
    updateMask: {wire: 'update_mask'},
  };

export function updateDefaultWorkspaceBaseEnvironmentRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateDefaultWorkspaceBaseEnvironmentRequest> {
  return FieldMask.build<UpdateDefaultWorkspaceBaseEnvironmentRequest>(
    paths,
    updateDefaultWorkspaceBaseEnvironmentRequestFieldMaskSchema
  );
}

const updateWorkspaceBaseEnvironmentRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
  workspaceBaseEnvironment: {
    wire: 'workspace_base_environment',
    children: () => workspaceBaseEnvironmentFieldMaskSchema,
  },
};

export function updateWorkspaceBaseEnvironmentRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateWorkspaceBaseEnvironmentRequest> {
  return FieldMask.build<UpdateWorkspaceBaseEnvironmentRequest>(
    paths,
    updateWorkspaceBaseEnvironmentRequestFieldMaskSchema
  );
}

const workspaceBaseEnvironmentFieldMaskSchema: FieldMaskSchema = {
  baseEnvironmentProvider: {wire: 'base_environment_provider'},
  baseEnvironmentType: {wire: 'base_environment_type'},
  createTime: {wire: 'create_time'},
  creatorUserId: {wire: 'creator_user_id'},
  displayName: {wire: 'display_name'},
  filepath: {wire: 'filepath'},
  isDefault: {wire: 'is_default'},
  lastUpdatedUserId: {wire: 'last_updated_user_id'},
  message: {wire: 'message'},
  name: {wire: 'name'},
  status: {wire: 'status'},
  updateTime: {wire: 'update_time'},
};

export function workspaceBaseEnvironmentFieldMask(
  ...paths: string[]
): FieldMask<WorkspaceBaseEnvironment> {
  return FieldMask.build<WorkspaceBaseEnvironment>(
    paths,
    workspaceBaseEnvironmentFieldMaskSchema
  );
}

const workspaceBaseEnvironmentCacheFieldMaskSchema: FieldMaskSchema = {};

export function workspaceBaseEnvironmentCacheFieldMask(
  ...paths: string[]
): FieldMask<WorkspaceBaseEnvironmentCache> {
  return FieldMask.build<WorkspaceBaseEnvironmentCache>(
    paths,
    workspaceBaseEnvironmentCacheFieldMaskSchema
  );
}

const workspaceBaseEnvironmentOperationMetadataFieldMaskSchema: FieldMaskSchema =
  {};

export function workspaceBaseEnvironmentOperationMetadataFieldMask(
  ...paths: string[]
): FieldMask<WorkspaceBaseEnvironmentOperationMetadata> {
  return FieldMask.build<WorkspaceBaseEnvironmentOperationMetadata>(
    paths,
    workspaceBaseEnvironmentOperationMetadataFieldMaskSchema
  );
}
