// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/**
 * The target resources that are supported by Network Connectivity Config.
 * Note: some egress types can support general types that are not defined in EgressResourceType.
 * E.g.: Azure private endpoint supports private link enabled Azure services.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressResourceType = {
  EGRESS_RESOURCE_TYPE_UNSPECIFIED: 'EGRESS_RESOURCE_TYPE_UNSPECIFIED',
  AZURE_BLOB_STORAGE: 'AZURE_BLOB_STORAGE',
} as const;
export type EgressResourceType =
  | (typeof EgressResourceType)[keyof typeof EgressResourceType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointState = {
  /** The endpoint is pending approval. */
  PENDING: 'PENDING',
  /** The endpoint has been approved and is ready for use. */
  APPROVED: 'APPROVED',
  /** The endpoint encountered some issues during setup. */
  FAILED: 'FAILED',
  /** The endpoint was once established but later disconnected. This endpoint doesn't provide connectivity. */
  DISCONNECTED: 'DISCONNECTED',
} as const;
export type EndpointState =
  | (typeof EndpointState)[keyof typeof EndpointState]
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
 * Type of IP access list. Valid values are as follows and are case-sensitive:
 *
 * * `ALLOW`: An allow list. Include this IP or range.
 * * `BLOCK`: A block list. Exclude this IP or range. IP addresses in the block list are excluded even if they are included in an allow list.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IpAccessListType = {
  ALLOW: 'ALLOW',
  /** Blocks the associated CIDRs. */
  BLOCK: 'BLOCK',
} as const;
export type IpAccessListType =
  | (typeof IpAccessListType)[keyof typeof IpAccessListType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PrivateAccessLevel = {
  /** Only specifically listed endpoints can access my workspace */
  ENDPOINT: 'ENDPOINT',
  /** Only endpoints in the same account can access my workspace */
  ACCOUNT: 'ACCOUNT',
} as const;
export type PrivateAccessLevel =
  | (typeof PrivateAccessLevel)[keyof typeof PrivateAccessLevel]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const VpcEndpointUseCase = {
  WORKSPACE_ACCESS: 'WORKSPACE_ACCESS',
  DATAPLANE_RELAY_ACCESS: 'DATAPLANE_RELAY_ACCESS',
  /** General access, replaces WORKSPACE_ACCESS in customer-facing API. */
  GENERAL_ACCESS: 'GENERAL_ACCESS',
} as const;
export type VpcEndpointUseCase =
  | (typeof VpcEndpointUseCase)[keyof typeof VpcEndpointUseCase]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const VpcStatus = {
  VALID: 'VALID',
  BROKEN: 'BROKEN',
  UNATTACHED: 'UNATTACHED',
  /** Some optional tests are failing for this Vpc, see NetworkWarning for more information */
  WARNED: 'WARNED',
} as const;
export type VpcStatus =
  | (typeof VpcStatus)[keyof typeof VpcStatus]
  | (string & {});

/**
 * Type of IP access list. Valid values are as follows and are case-sensitive:
 *
 * * `ALLOW`: An allow list. Include this IP or range.
 * * `BLOCK`: A block list. Exclude this IP or range. IP addresses in the block list are excluded even if they are included in an allow list.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AccountIpAccessListType_IpAccessListType = {
  /** Allows the associated CIDRs. */
  ALLOW: 'ALLOW',
  /** Blocks the associated CIDRs. */
  BLOCK: 'BLOCK',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AccountIpAccessListType_IpAccessListType =
  | (typeof AccountIpAccessListType_IpAccessListType)[keyof typeof AccountIpAccessListType_IpAccessListType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType =
  {
    INTERNET_DESTINATION_TYPE_UNSPECIFIED:
      'INTERNET_DESTINATION_TYPE_UNSPECIFIED',
    /** This is defined as `FQDN` in settings-policy/api/proto/messages.proto. Translation is done in accounts-lake-net-manager/src/util/NetworkPolicySettingUtil.scala. */
    DNS_NAME: 'DNS_NAME',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType =

    | (typeof EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType]
    | (string & {});

/** The values should match the list of workloads used in networkconfig.proto */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter =
  {
    DRY_RUN_MODE_PRODUCT_FILTER_UNSPECIFIED:
      'DRY_RUN_MODE_PRODUCT_FILTER_UNSPECIFIED',
    /** SQL Warehouse product */
    DBSQL: 'DBSQL',
    /** Machine Learning serving product */
    ML_SERVING: 'ML_SERVING',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter =

    | (typeof EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode =
  {
    ENFORCEMENT_MODE_UNSPECIFIED: 'ENFORCEMENT_MODE_UNSPECIFIED',
    /** Blocks traffic that violates network policy. This is the default mode. */
    ENFORCED: 'ENFORCED',
    /** Logs violations without blocking traffic. Useful for testing policies before enforcement. */
    DRY_RUN: 'DRY_RUN',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode =

    | (typeof EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode]
    | (string & {});

/**
 * At which level can <Databricks> and <Databricks> managed compute access Internet.
 * FULL_ACCESS: <Databricks> can access Internet. No blocking rules will apply.
 * RESTRICTED_ACCESS: <Databricks> can only access explicitly allowed internet and storage destinations,
 * as well as UC connections and external locations.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode = {
  RESTRICTION_MODE_UNSPECIFIED: 'RESTRICTION_MODE_UNSPECIFIED',
  FULL_ACCESS: 'FULL_ACCESS',
  RESTRICTED_ACCESS: 'RESTRICTED_ACCESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode =
  | (typeof EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType =
  {
    STORAGE_DESTINATION_TYPE_UNSPECIFIED:
      'STORAGE_DESTINATION_TYPE_UNSPECIFIED',
    /**
     * AWS_S3 can be used both for direct AWS S3 access and for cross-cloud access from Azure and GCP
     * When used in an Azure/GCP context, this indicates cross-cloud access from Azure/GCP to the specified S3 bucket
     */
    AWS_S3: 'AWS_S3',
    AZURE_STORAGE: 'AZURE_STORAGE',
    GOOGLE_CLOUD_STORAGE: 'GOOGLE_CLOUD_STORAGE',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType =

    | (typeof EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointUseCase_EndpointUseCase = {
  /** service-direct frontend private link connectivity. */
  SERVICE_DIRECT: 'SERVICE_DIRECT',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EndpointUseCase_EndpointUseCase =
  | (typeof EndpointUseCase_EndpointUseCase)[keyof typeof EndpointUseCase_EndpointUseCase]
  | (string & {});

/**
 * Qualifies the breadth of API access permitted by an ingress network policy rule.
 * API_SCOPE_QUALIFIER_READ narrows matching to read-only variants of the listed scopes;
 * API_SCOPE_QUALIFIER_ALL matches any scope. When unset, scopes match exactly as listed.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_ApiScopeQualifier = {
  /** Narrows matching to read-only variants of the listed scopes (e.g. GET/HEAD requests). */
  API_SCOPE_QUALIFIER_READ: 'API_SCOPE_QUALIFIER_READ',
  /** Matches any scope regardless of access level. */
  API_SCOPE_QUALIFIER_ALL: 'API_SCOPE_QUALIFIER_ALL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_ApiScopeQualifier =
  | (typeof IngressNetworkPolicy_ApiScopeQualifier)[keyof typeof IngressNetworkPolicy_ApiScopeQualifier]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_Authentication_IdentityType = {
  IDENTITY_TYPE_UNSPECIFIED: 'IDENTITY_TYPE_UNSPECIFIED',
  IDENTITY_TYPE_ALL_USERS: 'IDENTITY_TYPE_ALL_USERS',
  IDENTITY_TYPE_ALL_SERVICE_PRINCIPALS: 'IDENTITY_TYPE_ALL_SERVICE_PRINCIPALS',
  IDENTITY_TYPE_SELECTED_IDENTITIES: 'IDENTITY_TYPE_SELECTED_IDENTITIES',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_Authentication_IdentityType =
  | (typeof IngressNetworkPolicy_Authentication_IdentityType)[keyof typeof IngressNetworkPolicy_Authentication_IdentityType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_AuthenticationIdentity_PrincipalType = {
  PRINCIPAL_TYPE_UNSPECIFIED: 'PRINCIPAL_TYPE_UNSPECIFIED',
  PRINCIPAL_TYPE_USER: 'PRINCIPAL_TYPE_USER',
  PRINCIPAL_TYPE_SERVICE_PRINCIPAL: 'PRINCIPAL_TYPE_SERVICE_PRINCIPAL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_AuthenticationIdentity_PrincipalType =
  | (typeof IngressNetworkPolicy_AuthenticationIdentity_PrincipalType)[keyof typeof IngressNetworkPolicy_AuthenticationIdentity_PrincipalType]
  | (string & {});

/**
 * The restriction mode for cross-workspace access. In FULL_ACCESS mode, requests from any
 * source workspace (in any account) are allowed, and deny rules and allow rules cannot be set.
 * In RESTRICTED_ACCESS mode, access is restricted based on deny rules and allow rules;
 * requests that do not match any allow rule are denied. In LEGACY_MODE, cross-workspace
 * ingress is not governed by this policy.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode = {
  /**
   * Allows requests from any source workspace, regardless of account. Deny rules and allow
   * rules cannot be set in this mode.
   */
  FULL_ACCESS: 'FULL_ACCESS',
  /**
   * Restricts access based on deny rules and allow rules. Requests that do not match any
   * allow rule are denied.
   */
  RESTRICTED_ACCESS: 'RESTRICTED_ACCESS',
  /**
   * Cross-workspace ingress is not governed by this policy. Traffic from other workspaces is
   * subject only to the workspace's pre-existing network controls, not to the allow and deny
   * rules configured here.
   */
  LEGACY_MODE: 'LEGACY_MODE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode =
  | (typeof IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode)[keyof typeof IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode]
  | (string & {});

/**
 * The restriction mode for private access. In ALLOW_ALL_REGISTERED_ENDPOINTS mode,
 * requests arriving through any endpoint registered to the account are allowed, and
 * deny rules and allow rules cannot be set. In RESTRICTED_ACCESS mode, access is
 * restricted based on deny rules and allow rules; requests that do not match any
 * allow rule are denied.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_PrivateAccess_RestrictionMode = {
  /**
   * Allows requests arriving through any endpoint registered to the account.
   * Deny rules and allow rules cannot be set in this mode.
   */
  ALLOW_ALL_REGISTERED_ENDPOINTS: 'ALLOW_ALL_REGISTERED_ENDPOINTS',
  /**
   * Restricts access based on deny rules and allow rules. Requests that do not
   * match any allow rule are denied.
   */
  RESTRICTED_ACCESS: 'RESTRICTED_ACCESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_PrivateAccess_RestrictionMode =
  | (typeof IngressNetworkPolicy_PrivateAccess_RestrictionMode)[keyof typeof IngressNetworkPolicy_PrivateAccess_RestrictionMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_PublicAccess_RestrictionMode = {
  FULL_ACCESS: 'FULL_ACCESS',
  RESTRICTED_ACCESS: 'RESTRICTED_ACCESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_PublicAccess_RestrictionMode =
  | (typeof IngressNetworkPolicy_PublicAccess_RestrictionMode)[keyof typeof IngressNetworkPolicy_PublicAccess_RestrictionMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const NccPrivateEndpointRule_PrivateLinkConnectionState = {
  PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED:
    'PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED',
  /** The endpoint has been approved and is ready to use in your serverless compute resources. */
  ESTABLISHED: 'ESTABLISHED',
  /** Connection was rejected by the private link resource owner. */
  REJECTED: 'REJECTED',
  /**
   * Connection was removed by the private link resource owner, the private endpoint becomes informative and should
   * be deleted for clean-up.
   */
  DISCONNECTED: 'DISCONNECTED',
  /** If the endpoint was created but not approved in 14 days, it will be EXPIRED. */
  EXPIRED: 'EXPIRED',
  /** The endpoint has been created and pending approval. */
  PENDING: 'PENDING',
  /** The endpoint creation is in progress. */
  CREATING: 'CREATING',
  /** The endpoint creation failed. */
  CREATE_FAILED: 'CREATE_FAILED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type NccPrivateEndpointRule_PrivateLinkConnectionState =
  | (typeof NccPrivateEndpointRule_PrivateLinkConnectionState)[keyof typeof NccPrivateEndpointRule_PrivateLinkConnectionState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState =
  {
    PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED:
      'PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED',
    /** The endpoint has been approved and is ready to use in your serverless compute resources. */
    ESTABLISHED: 'ESTABLISHED',
    /** Connection was rejected by the private link resource owner. */
    REJECTED: 'REJECTED',
    /**
     * Connection was removed by the private link resource owner, the private endpoint becomes informative and should
     * be deleted for clean-up.
     */
    DISCONNECTED: 'DISCONNECTED',
    /** If the endpoint is created but not approved in 14 days, it is EXPIRED. */
    EXPIRED: 'EXPIRED',
    /** The endpoint has been created and pending approval. */
    PENDING: 'PENDING',
    /** The endpoint creation is in progress. */
    CREATING: 'CREATING',
    /** The endpoint creation failed. */
    CREATE_FAILED: 'CREATE_FAILED',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState =

    | (typeof NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState)[keyof typeof NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState =
  {
    PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED:
      'PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED',
    /** The endpoint has been created and pending approval. */
    INIT: 'INIT',
    /** The endpoint has been approved and is ready to use in your serverless compute resources. */
    ESTABLISHED: 'ESTABLISHED',
    /** Connection was rejected by the private link resource owner. */
    REJECTED: 'REJECTED',
    /**
     * Connection was removed by the private link resource owner, the private endpoint becomes informative and should
     * be deleted for clean-up.
     */
    DISCONNECTED: 'DISCONNECTED',
    /** If the endpoint was created but not approved in 14 days, it will be EXPIRED. */
    EXPIRED: 'EXPIRED',
    /** The endpoint has been created and pending approval. */
    PENDING: 'PENDING',
    /** The endpoint creation is in progress. */
    CREATING: 'CREATING',
    /** The endpoint creation failed. */
    CREATE_FAILED: 'CREATE_FAILED',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState =

    | (typeof NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState)[keyof typeof NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState]
    | (string & {});

/** The supported destination types. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PrivateNetworkGateway_Destination_DestinationType = {
  /** No destination type was specified. */
  DESTINATION_TYPE_UNSPECIFIED: 'DESTINATION_TYPE_UNSPECIFIED',
  /** A DNS name such as `database.internal`. */
  DNS_NAME: 'DNS_NAME',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PrivateNetworkGateway_Destination_DestinationType =
  | (typeof PrivateNetworkGateway_Destination_DestinationType)[keyof typeof PrivateNetworkGateway_Destination_DestinationType]
  | (string & {});

/** The lifecycle state of the gateway. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PrivateNetworkGateway_GatewayState = {
  /** The gateway lifecycle state is not specified. */
  GATEWAY_STATE_UNSPECIFIED: 'GATEWAY_STATE_UNSPECIFIED',
  /** The gateway is being provisioned. */
  CREATING: 'CREATING',
  /** The gateway is ready to route traffic. */
  ESTABLISHED: 'ESTABLISHED',
  /** The gateway could not be provisioned or encountered an unrecoverable error. */
  FAILED: 'FAILED',
  /** The gateway is being permanently deleted. */
  DELETING: 'DELETING',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PrivateNetworkGateway_GatewayState =
  | (typeof PrivateNetworkGateway_GatewayState)[keyof typeof PrivateNetworkGateway_GatewayState]
  | (string & {});

/** The supported resolver types. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PrivateNetworkGateway_PrivateDnsResolver_ResolverType = {
  /** No DNS resolver type was specified. */
  RESOLVER_TYPE_UNSPECIFIED: 'RESOLVER_TYPE_UNSPECIFIED',
  /** An IPv4 address. */
  IP_ADDRESS: 'IP_ADDRESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PrivateNetworkGateway_PrivateDnsResolver_ResolverType =
  | (typeof PrivateNetworkGateway_PrivateDnsResolver_ResolverType)[keyof typeof PrivateNetworkGateway_PrivateDnsResolver_ResolverType]
  | (string & {});

/** The traffic routed through the gateway. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PrivateNetworkGateway_TrafficMode = {
  /** No traffic routing mode was specified. */
  TRAFFIC_MODE_UNSPECIFIED: 'TRAFFIC_MODE_UNSPECIFIED',
  /** Route only the destinations configured on the gateway. */
  SPECIFIC_DESTINATIONS: 'SPECIFIC_DESTINATIONS',
  /** Route all traffic through the gateway. */
  ALL_TRAFFIC: 'ALL_TRAFFIC',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PrivateNetworkGateway_TrafficMode =
  | (typeof PrivateNetworkGateway_TrafficMode)[keyof typeof PrivateNetworkGateway_TrafficMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PrivateNetworkGatewayOperationMetadata_OperationType = {
  /** The operation type is not specified. */
  OPERATION_TYPE_UNSPECIFIED: 'OPERATION_TYPE_UNSPECIFIED',
  /** A gateway create operation. */
  CREATE: 'CREATE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PrivateNetworkGatewayOperationMetadata_OperationType =
  | (typeof PrivateNetworkGatewayOperationMetadata_OperationType)[keyof typeof PrivateNetworkGatewayOperationMetadata_OperationType]
  | (string & {});

/** Definition of an IP Access list */
export interface AccountIpAccessList {
  /** Universally unique identifier (UUID) of the IP access list. */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  /** IP addresses or CIDR ranges in the IP access list. */
  ipAddresses?: string[] | undefined;
  /** Total number of IP or CIDR values. */
  addressCount?: number | undefined;
  /** Whether the list allows or blocks its IP addresses. */
  listType?: AccountIpAccessListType_IpAccessListType | undefined;
  /** Creation timestamp in milliseconds. */
  createdAt?: bigint | undefined;
  /** The ID of the user that created this list. */
  createdBy?: bigint | undefined;
  /** Update timestamp in milliseconds. */
  updatedAt?: bigint | undefined;
  /** The ID of the user that last updated this list. */
  updatedBy?: bigint | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountIpAccessListType {}

export interface AccountNetworkPolicy {
  /** The unique identifier for the network policy. */
  networkPolicyId?: string | undefined;
  /** The associated account ID for this Network Policy object. */
  accountId?: string | undefined;
  /** The network policies applying for egress traffic. */
  egress?: EgressNetworkPolicy | undefined;
  /** The network policies applying for ingress traffic. */
  ingress?: IngressNetworkPolicy | undefined;
  /**
   * The ingress policy for dry run mode. Dry run will always run even if the request
   * is allowed by the ingress policy. When this field is set, the policy will be evaluated
   * and emit logs only without blocking requests.
   */
  ingressDryRun?: IngressNetworkPolicy | undefined;
}

/** Databricks Error that is returned by all Databricks APIs. */
export interface ApiError {
  errorCode?: ErrorCode | undefined;
  message?: string | undefined;
  stackTrace?: string | undefined;
  details?: Record<string, unknown>[] | undefined;
}

export interface AwsVpcEndpointInfo {
  /**
   * The ID of the underlying VPC endpoint in AWS. Provided by the customer when
   * registering an existing AWS VPC endpoint.
   */
  awsVpcEndpointId?: string | undefined;
  /** The ID of the Databricks VPC endpoint service that this endpoint connects to. */
  awsEndpointServiceId?: string | undefined;
  /** The AWS account ID in which this VPC endpoint lives. */
  awsAccountId?: string | undefined;
}

export interface AzurePrivateEndpointInfo {
  /** The name of the Private Endpoint in the Azure subscription. */
  privateEndpointName?: string | undefined;
  /**
   * The GUID of the Private Endpoint resource in the Azure subscription.
   * This is assigned by Azure when the user sets up the Private Endpoint.
   */
  privateEndpointResourceGuid?: string | undefined;
  /** The full resource ID of the Private Endpoint. */
  privateEndpointResourceId?: string | undefined;
  /** The resource ID of the Databricks Private Link Service that this Private Endpoint connects to. */
  privateLinkServiceId?: string | undefined;
}

/** Details required to configure a block list or allow list. */
export interface CreateAccountIpAccessListRequest {
  accountId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  /** Whether the list allows or blocks its IP addresses. */
  listType?: AccountIpAccessListType_IpAccessListType | undefined;
  /** IP addresses or CIDR ranges to include in the IP access list. */
  ipAddresses?: string[] | undefined;
}

/** An IP access list was successfully created. */
export interface CreateAccountIpAccessListResponse {
  /** The IP access list that was created. */
  ipAccessList?: AccountIpAccessList | undefined;
}

export interface CreateEndpointRequest {
  /**
   * The parent resource name of the account under which the endpoint is created.
   * Format: `accounts/{account_id}`.
   */
  parent?: string | undefined;
  endpoint?: Endpoint | undefined;
}

/** Details required to configure a block list or allow list. */
export interface CreateIpAccessListRequest {
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
}

/** An IP access list was successfully created. */
export interface CreateIpAccessListResponse {
  ipAccessList?: IpAccessList | undefined;
}

/** Properties of the new private endpoint rule. */
export interface CreateNccPrivateEndpointRuleRequest {
  /** Your Network Connectivity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  privateEndpointRule?: CreatePrivateEndpointRule | undefined;
}

/** Properties of the new network connectivity configuration. */
export interface CreateNetworkConnectivityConfigRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  networkConnectivityConfig?:
    | CreateNetworkConnectivityConfiguration
    | undefined;
}

/** Properties of the new network connectivity configuration. */
export interface CreateNetworkConnectivityConfiguration {
  /** <Databricks> network connectivity configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /**
   * The name of the network connectivity configuration. The name can contain alphanumeric characters, hyphens,
   * and underscores. The length must be between 3 and 30 characters. The name must match the regular
   * expression ^[0-9a-zA-Z-_]{3,30}$
   */
  name?: string | undefined;
  /**
   * The region for the network connectivity configuration.
   * Only workspaces in the same region can be attached to the network connectivity configuration.
   */
  region?: string | undefined;
  /** The network connectivity rules that apply to network traffic from your serverless compute resources. */
  egressConfig?:
    | CustomerFacingNetworkConnectivityConfigEgressConfig
    | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
}

export interface CreateNetworkPolicyRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Network policy configuration details. */
  networkPolicy?: AccountNetworkPolicy | undefined;
}

export interface CreateNetworkRequest {
  accountId?: string | undefined;
  /** The human-readable name of the network configuration. */
  networkName?: string | undefined;
  /** The ID of the VPC associated with this network configuration. VPC IDs can be used in multiple networks. */
  vpcId?: string | undefined;
  /** IDs of at least two subnets associated with this network. Subnet IDs **cannot** be used in multiple network configurations. */
  subnetIds?: string[] | undefined;
  /** IDs of one to five security groups associated with this network. Security group IDs **cannot** be used in multiple network configurations. */
  securityGroupIds?: string[] | undefined;
  vpcEndpoints?: NetworkVpcEndpoints | undefined;
  gcpNetworkInfo?: GcpNetworkInfo | undefined;
}

export interface CreatePrivateAccessSettingsRequest {
  accountId?: string | undefined;
  /** The human-readable name of the private access settings object. */
  privateAccessSettingsName?: string | undefined;
  /** The AWS region for workspaces attached to this private access settings object. */
  region?: string | undefined;
  /** Determines if the workspace can be accessed over public internet. For fully private workspaces, you can optionally specify false, but only if you implement both the front-end and the back-end PrivateLink connections. Otherwise, specify true, which means that public access is enabled. */
  publicAccessEnabled?: boolean | undefined;
  /**
   * The private access level controls which VPC endpoints can connect to the UI or API of any workspace that attaches this private access settings object.
   * `ACCOUNT` level access (the default) allows only VPC endpoints that are registered in your <Databricks> account connect to your workspace.
   * `ENDPOINT` level access allows only specified VPC endpoints connect to your workspace. For details, see allowed_vpc_endpoint_ids.
   */
  privateAccessLevel?: PrivateAccessLevel | undefined;
  /**
   * An array of Databricks VPC endpoint IDs. This is the <Databricks> ID returned when registering the VPC endpoint configuration in your <Databricks> account. This is not the ID of the VPC endpoint in AWS.
   * Only used when private_access_level is set to ENDPOINT. This is an allow list of VPC endpoints registered in your <Databricks> account that can connect to your workspace over AWS PrivateLink.
   * Note: If hybrid access to your workspace is enabled by setting public_access_enabled to true, this control only works for PrivateLink connections. To control how your workspace is accessed via public internet, see IP access lists.
   */
  allowedVpcEndpointIds?: string[] | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that you must approve the endpoint in Azure portal after initialization.
 */
export interface CreatePrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the Cloud console
   * before they take effect.
   * The possible values are:
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint was created but not approved in 14 days, it will be EXPIRED.
   * - CREATING: The endpoint creation is in progress. Once successfully created, the state will transition to PENDING.
   * - CREATE_FAILED: The endpoint creation failed. You can check the error_message field for more details.
   */
  connectionState?:
    | NccPrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /**
   * Only used by private endpoints to customer-managed private endpoint services.
   *
   * Domain names of target private link service.
   * When updating this field, the full list of target domain_names must be specified.
   */
  domainNames?: string[] | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  errorMessage?: string | undefined;
  /** The Azure resource ID of the target resource. */
  resourceId?: string | undefined;
  /**
   * Not used by customer-managed private endpoint services.
   *
   * The sub-resource type (group ID) of the target resource.
   * Note that to connect to workspace root storage (root DBFS), you need two endpoints, one for blob and one for dfs.
   */
  groupId?: string | undefined;
  /** The name of the Azure private endpoint resource. */
  endpointName?: string | undefined;
  /** <Databricks> account ID. You can find your account ID from the Accounts Console. */
  accountId?: string | undefined;
  /** The full target AWS endpoint service name that connects to the destination resources of the private endpoint. */
  endpointService?: string | undefined;
  /**
   * Only used by private endpoints towards AWS S3 service.
   *
   * The globally unique S3 bucket names that will be accessed via the VPC endpoint.
   * The bucket names must be in the same region as the NCC/endpoint service.
   * When updating this field, we perform full update on this field. Please ensure a full list of desired
   * resource_names is provided.
   */
  resourceNames?: string[] | undefined;
  /** The AWS VPC endpoint ID. You can use this ID to identify the VPC endpoint created by <Databricks>. */
  vpcEndpointId?: string | undefined;
  /**
   * Update this field to activate/deactivate this private endpoint to allow egress access from
   * serverless compute resources. Only honored for first-party services on each cloud (e.g. AWS S3).
   */
  enabled?: boolean | undefined;
  endpoint?: {$case: 'gcpEndpoint'; gcpEndpoint: GcpEndpoint} | undefined;
}

export interface CreatePrivateNetworkGatewayRequest {
  /** The network connectivity configuration that will contain the gateway. */
  parent?: string | undefined;
  /** The gateway to create. */
  privateNetworkGateway?: PrivateNetworkGateway | undefined;
  /** A unique identifier for this request. The request is idempotent when this is provided. */
  requestId?: string | undefined;
}

export interface CreateVpcEndpointRequest {
  accountId?: string | undefined;
  /** The human-readable name of the storage configuration. */
  vpcEndpointName?: string | undefined;
  /** The region in which this VPC endpoint object exists. */
  region?: string | undefined;
  /** The ID of the VPC endpoint object in AWS. */
  awsVpcEndpointId?: string | undefined;
  vpcEndpointInfo?:
    | {
        $case: 'gcpVpcEndpointInfo';
        /** The cloud info of this vpc endpoint. */
        gcpVpcEndpointInfo: GcpVpcEndpointInfo;
      }
    | undefined;
}

export interface CustomerFacingNetworkConnectivityConfigEgressConfig {
  /**
   * The network connectivity rules that are applied by default without resource specific configurations.
   * You can find the stable network information of your serverless compute resources here.
   */
  defaultRules?: NetworkConnectivityConfigEgressConfig_DefaultRule | undefined;
  /** The network connectivity rules that configured for each destinations. These rules override default rules. */
  targetRules?:
    | CustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRule
    | undefined;
}

/** Target rule controls the egress rules that are dedicated to specific resources. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRule {
  azurePrivateEndpointRules?:
    | NetworkConnectivityConfigAzurePrivateEndpointRule[]
    | undefined;
  /** AWS private endpoint rule controls the AWS private endpoint based egress rules. */
  awsPrivateEndpointRules?:
    | NetworkConnectivityConfigAwsPrivateEndpointRule[]
    | undefined;
}

export interface DeleteAccountIpAccessListRequest {
  accountId?: string | undefined;
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
}

/** The IP access list was successfully deleted. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteAccountIpAccessListResponse {}

export interface DeleteEndpointRequest {
  name?: string | undefined;
}

export interface DeleteIpAccessListRequest {
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
}

/** The IP access list was successfully deleted. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteIpAccessListResponse {}

/**
 * Initiates deleting a private endpoint rule. If the connection state is PENDING or EXPIRED, the private endpoint is
 * immediately deleted. Otherwise, the private endpoint is deactivated and will be deleted after one day of
 * deactivation. When a private endpoint is deactivated, the deactivated field is set to true and the private endpoint
 * is not available to your serverless compute resources.
 */
export interface DeleteNccPrivateEndpointRuleRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectvity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your private endpoint rule ID. */
  privateEndpointRuleId?: string | undefined;
}

export interface DeleteNetworkConnectivityConfigRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectivity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
}

export interface DeleteNetworkPolicyRequest {
  /** The unique identifier of the network policy to delete. */
  networkPolicyId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
}

export interface DeleteNetworkRequest {
  /** Databricks Account API network configuration ID. */
  networkId?: string | undefined;
  accountId?: string | undefined;
}

export interface DeletePrivateAccessSettingsRequest {
  privateAccessSettingsId?: string | undefined;
  accountId?: string | undefined;
}

export interface DeletePrivateNetworkGatewayRequest {
  /** The canonical resource name of the gateway. */
  name?: string | undefined;
}

export interface DeleteVpcEndpointRequest {
  vpcEndpointId?: string | undefined;
  accountId?: string | undefined;
}

/** The network policies applying for egress traffic. */
export interface EgressNetworkPolicy {
  /** The access policy enforced for egress traffic to the internet. */
  networkAccess?: EgressNetworkPolicy_NetworkAccessPolicy | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy {
  /** The restriction mode that controls how serverless workloads can access the internet. */
  restrictionMode?:
    | EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode
    | undefined;
  /** List of internet destinations that serverless workloads are allowed to access when in RESTRICTED_ACCESS mode. */
  allowedInternetDestinations?:
    | EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination[]
    | undefined;
  /** List of storage destinations that serverless workloads are allowed to access when in RESTRICTED_ACCESS mode. */
  allowedStorageDestinations?:
    | EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination[]
    | undefined;
  /** Optional. When policy_enforcement is not provided, we default to ENFORCE_MODE_ALL_SERVICES */
  policyEnforcement?:
    | EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement
    | undefined;
  /**
   * List of internet destinations that serverless workloads are blocked from accessing.
   * These destinations are enforced when restriction mode is RESTRICTED_ACCESS or DRY_RUN.
   * Currently supports DNS_NAME type only; IP_RANGE support is planned.
   */
  blockedInternetDestinations?:
    | EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination[]
    | undefined;
  /**
   * List of <Databricks> workspace destinations that serverless workloads are
   * allowed to access when in RESTRICTED_ACCESS mode.
   */
  allowedDatabricksDestinations?:
    | EgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestination[]
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestination {
  /** The workspace IDs to allow egress traffic to. */
  workspaceIds?: bigint[] | undefined;
}

/**
 * Users can specify accessible internet destinations when outbound access is restricted.
 * We only support DNS_NAME (FQDN format) destinations for the time being.
 * Going forward we may extend support to host names and IP addresses.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination {
  /** The internet destination to which access will be allowed. Format dependent on the destination type. */
  destination?: string | undefined;
  /** The type of internet destination. Currently only DNS_NAME is supported. */
  internetDestinationType?:
    | EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement {
  /**
   * The mode of policy enforcement. ENFORCED blocks traffic that violates policy,
   * while DRY_RUN only logs violations without blocking. When not specified,
   * defaults to ENFORCED.
   */
  enforcementMode?:
    | EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode
    | undefined;
  /**
   * When empty, it means dry run for all products.
   * When non-empty, it means dry run for specific products and for the other products, they will run in enforced mode.
   */
  dryRunModeProductFilter?:
    | EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter[]
    | undefined;
}

/** Users can specify accessible storage destinations. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination {
  bucketName?: string | undefined;
  region?: string | undefined;
  /** The type of storage destination. */
  storageDestinationType?:
    | EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType
    | undefined;
  /** The Azure storage account name. */
  azureStorageAccount?: string | undefined;
  /** The Azure storage service type (blob, dfs, etc.). */
  azureStorageService?: string | undefined;
}

/** Endpoint represents a cloud networking resource in a user's cloud account and binds it to the <Databricks> account. */
export interface Endpoint {
  /** The resource name of the endpoint, which uniquely identifies the endpoint. */
  name?: string | undefined;
  /** The unique identifier for this endpoint under the account. This field is a UUID generated by <Databricks>. */
  endpointId?: string | undefined;
  /** The Databricks Account in which the endpoint object exists. */
  accountId?: string | undefined;
  /**
   * The human-readable display name of this endpoint.
   * The input should conform to RFC-1034, which restricts to letters, numbers, and hyphens,
   * with the first character a letter, the last a letter or a number, and a 63 character maximum.
   */
  displayName?: string | undefined;
  /**
   * The use case that determines the type of network connectivity this endpoint provides.
   * This field is automatically determined based on the endpoint configuration and cloud-specific settings.
   */
  useCase?: EndpointUseCase_EndpointUseCase | undefined;
  /** The cloud provider region where this endpoint is located. */
  region?: string | undefined;
  /** The state of the endpoint. The endpoint can only be used if the state is `APPROVED`. */
  state?: EndpointState | undefined;
  /**
   * The cloud info of this endpoint.
   * (-- Azure is GA; AWS and GCP added for PLAT-165656 (Private Preview). --)
   */
  endpointInfo?:
    | {
        $case: 'azurePrivateEndpointInfo';
        /** Info for an Azure private endpoint. */
        azurePrivateEndpointInfo: AzurePrivateEndpointInfo;
      }
    | {
        $case: 'awsVpcEndpointInfo';
        /** Info for an AWS VPC endpoint. */
        awsVpcEndpointInfo: AwsVpcEndpointInfo;
      }
    | {
        $case: 'gcpPscEndpointInfo';
        /** Info for a GCP Private Service Connect endpoint. */
        gcpPscEndpointInfo: GcpPscEndpointInfo;
      }
    | undefined;
  /** The timestamp when the endpoint was created. The timestamp is in RFC 3339 format in UTC timezone. */
  createTime?: Temporal.Instant | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EndpointUseCase {}

export interface GcpEndpoint {
  /** Output only. The URI of the created PSC endpoint. */
  pscEndpointUri?: string | undefined;
  /** Selects which target services this private endpoint reaches. */
  targetServices?:
    | {
        $case: 'serviceAttachment';
        /**
         * The full url of the target service attachment.
         * Example:
         * projects/my-gcp-project/regions/us-east4/serviceAttachments/my-service-attachment
         */
        serviceAttachment: string;
      }
    | {
        $case: 'googleApiEndpoints';
        /** Selected Google API hostnames, e.g. "storage.googleapis.com", "bigquery.googleapis.com". */
        googleApiEndpoints: GoogleApiEndpoints;
      }
    | {
        $case: 'allVpcScServices';
        /** All Google APIs that support VPC Service Controls (a subset of all Google APIs). */
        allVpcScServices: boolean;
      }
    | undefined;
}

export interface GcpNetworkInfo {
  /** The GCP project ID for network resources. This project is where the VPC and subnet resides. */
  networkProjectId?: string | undefined;
  /** The customer-provided VPC ID. */
  vpcId?: string | undefined;
  /**
   * The customer-provided Subnet ID that will be available to Clusters in Workspaces using this
   * Network.
   */
  subnetId?: string | undefined;
  subnetRegion?: string | undefined;
  /**
   * Name of the secondary range within the subnet that will be used by GKE as Pod IP range.
   * This is BYO VPC specific. DB VPC uses network.getGcpManagedNetworkConfig.getGkeClusterPodIpRange
   */
  podIpRangeName?: string | undefined;
  /** Name of the secondary range within the subnet that will be used by GKE as Service IP range. */
  serviceIpRangeName?: string | undefined;
}

export interface GcpPscEndpointInfo {
  /**
   * The ID of the underlying Private Service Connect connection in the GCP consumer project,
   * assigned by GCP when the PSC connection is created.
   */
  pscConnectionId?: string | undefined;
  /**
   * The GCP consumer project ID in which this PSC endpoint is created. Provided by the customer
   * when registering an existing PSC endpoint.
   */
  projectId?: string | undefined;
  /**
   * The name of this PSC connection in the GCP consumer project. Provided by the customer when
   * registering an existing PSC endpoint.
   */
  pscEndpoint?: string | undefined;
  /**
   * The GCP region of the PSC connection endpoint. Provided by the customer when registering an
   * existing PSC endpoint. GCP supports only same-region PSC, so this must match the workspace
   * region.
   */
  endpointRegion?: string | undefined;
  /** The ID of the <Databricks> service attachment this PSC endpoint connects to. */
  serviceAttachmentId?: string | undefined;
}

export interface GcpVpcEndpointInfo {
  pscConnectionId?: string | undefined;
  projectId?: string | undefined;
  pscEndpointName?: string | undefined;
  endpointRegion?: string | undefined;
  serviceAttachmentId?: string | undefined;
}

export interface GetAccountIpAccessListRequest {
  accountId?: string | undefined;
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
}

export interface GetAccountIpAccessListResponse {
  ipAccessList?: AccountIpAccessList | undefined;
}

export interface GetEndpointRequest {
  name?: string | undefined;
}

export interface GetIpAccessListRequest {
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
}

/** An IP access list was successfully returned. */
export interface GetIpAccessListResponse {
  ipAccessList?: IpAccessList | undefined;
}

export interface GetNccPrivateEndpointRuleRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectvity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your private endpoint rule ID. */
  privateEndpointRuleId?: string | undefined;
}

/** ***************************** Public facing RPC requests and responses *****************************\// */
export interface GetNetworkConnectivityConfigRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectivity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
}

export interface GetNetworkPolicyRequest {
  /** The unique identifier of the network policy to retrieve. */
  networkPolicyId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
}

export interface GetNetworkRequest {
  /** Databricks Account API network configuration ID. */
  networkId?: string | undefined;
  accountId?: string | undefined;
}

/** The request message for `GetOperation` method. */
export interface GetOperationRequest {
  /** The name of the operation resource. */
  name?: string | undefined;
}

export interface GetPrivateAccessSettingsRequest {
  privateAccessSettingsId?: string | undefined;
  accountId?: string | undefined;
}

export interface GetPrivateNetworkGatewayRequest {
  /** The canonical resource name of the gateway. */
  name?: string | undefined;
}

export interface GetVpcEndpointRequest {
  /** Databricks VPC endpoint ID. */
  vpcEndpointId?: string | undefined;
  accountId?: string | undefined;
}

export interface GetWorkspaceNetworkOptionRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: bigint | undefined;
}

/**
 * Wrapper for a list of Google API hostnames. Wrapped in a message because
 * proto3 oneof does not support repeated fields directly.
 */
export interface GoogleApiEndpoints {
  /**
   * Google API hostnames, e.g. "storage.googleapis.com",
   * "bigquery.googleapis.com". Use "googleapis.com" to cover all Google APIs.
   */
  endpoints?: string[] | undefined;
}

/** The network policies applying for ingress traffic. */
export interface IngressNetworkPolicy {
  /**
   * The network policy restrictions for public access to the workspace.
   * Configures how public internet traffic is allowed or denied access.
   */
  publicAccess?: IngressNetworkPolicy_PublicAccess | undefined;
  /**
   * The network policy restrictions for private access.
   * Configures how requests arriving over private connectivity are governed.
   */
  privateAccess?: IngressNetworkPolicy_PrivateAccess | undefined;
  /**
   * The network policy restrictions for cross-workspace access: which other workspaces may
   * access this workspace.
   */
  crossWorkspaceAccess?: IngressNetworkPolicy_CrossWorkspaceAccess | undefined;
}

/** Matches account-level Databricks API endpoints for an ingress network policy rule. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AccountApiDestination {
  /** The API scopes to match. Use "all-apis" to match any account-level API. */
  scopes?: string[] | undefined;
  /** Qualifies the breadth of API access for the listed scopes. See ApiScopeQualifier. */
  scopeQualifier?: IngressNetworkPolicy_ApiScopeQualifier | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AccountDatabricksOneDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

/** The account console UI destination. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AccountUiDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AppsRuntimeDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_Authentication {
  identityType?: IngressNetworkPolicy_Authentication_IdentityType | undefined;
  /** Valid only when IdentityType is IDENTITY_TYPE_SELECTED_IDENTITIES. */
  identities?: IngressNetworkPolicy_AuthenticationIdentity[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AuthenticationIdentity {
  principalType?:
    | IngressNetworkPolicy_AuthenticationIdentity_PrincipalType
    | undefined;
  principalId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_CrossWorkspaceAccess {
  /** The restriction mode for cross-workspace access. */
  restrictionMode?:
    | IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode
    | undefined;
  /**
   * Deny rules are evaluated first. A request matching any deny rule is denied,
   * regardless of allow rules. Only applies when restriction_mode is RESTRICTED_ACCESS.
   */
  denyRules?: IngressNetworkPolicy_CrossWorkspaceIngressRule[] | undefined;
  /**
   * Allow rules are evaluated after deny rules. A request matching any allow rule is
   * allowed; a request matching no rule is denied by default. Only applies when
   * restriction_mode is RESTRICTED_ACCESS.
   */
  allowRules?: IngressNetworkPolicy_CrossWorkspaceIngressRule[] | undefined;
}

/**
 * An ingress rule is enforced when a request satisfies all
 * specified attributes — including request origin, destination, and authentication.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_CrossWorkspaceIngressRule {
  /**
   * The origin the request must match — the source workspace the request comes from,
   * either specific source workspaces or any source workspace in any account. See
   * CrossWorkspaceRequestOrigin.
   */
  origin?: IngressNetworkPolicy_CrossWorkspaceRequestOrigin | undefined;
  /**
   * The destination the request must match — the resource being accessed, for example
   * the workspace UI or workspace APIs. See RequestDestination.
   */
  destination?: IngressNetworkPolicy_RequestDestination | undefined;
  /**
   * The authenticated identity the request must match. When unset, the rule matches
   * all users and service principals.
   */
  authentication?: IngressNetworkPolicy_Authentication | undefined;
  /** The label for this ingress rule. */
  label?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_CrossWorkspaceRequestOrigin {
  source?:
    | {
        $case: 'allSourceWorkspaces';
        /** Matches all source workspaces. */
        allSourceWorkspaces: boolean;
      }
    | {
        $case: 'selectedWorkspaces';
        /** Specific source workspace IDs to match. */
        selectedWorkspaces: IngressNetworkPolicy_WorkspaceIdList;
      }
    | undefined;
}

/** A set of registered endpoints, identified by their endpoint IDs. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_Endpoints {
  /** The IDs of the registered endpoints. Must contain at least one endpoint ID. */
  endpointIds?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_IpRanges {
  /** We only support IPv4 and IPv4 CIDR notation for now. */
  ipRanges?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_LakebaseRuntimeDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

/**
 * Configures how requests arriving over private connectivity, such as
 * registered endpoints, are allowed or denied access.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PrivateAccess {
  /** The restriction mode for private access. */
  restrictionMode?:
    | IngressNetworkPolicy_PrivateAccess_RestrictionMode
    | undefined;
  /**
   * Deny rules are evaluated first. A request matching any deny rule is denied,
   * regardless of allow rules. Only applies when restriction_mode is RESTRICTED_ACCESS.
   */
  denyRules?: IngressNetworkPolicy_PrivateIngressRule[] | undefined;
  /**
   * Allow rules are evaluated after deny rules. A request matching any allow rule is
   * allowed; a request matching no rule is denied by default. Only applies when
   * restriction_mode is RESTRICTED_ACCESS.
   */
  allowRules?: IngressNetworkPolicy_PrivateIngressRule[] | undefined;
}

/**
 * An ingress rule is enforced when a request satisfies all
 * specified attributes — including request origin, destination, and authentication.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PrivateIngressRule {
  /**
   * The origin the request must match — the private connectivity the request arrives
   * through, for example a specific set of registered endpoints or any endpoint
   * registered to the account. See PrivateRequestOrigin.
   */
  origin?: IngressNetworkPolicy_PrivateRequestOrigin | undefined;
  /**
   * The destination the request must match — the resource being accessed, for example
   * the workspace UI, workspace APIs, or account-level APIs. See RequestDestination.
   */
  destination?: IngressNetworkPolicy_RequestDestination | undefined;
  /**
   * The authenticated identity the request must match. When unset, the rule matches
   * all users and service principals.
   * On the account-level network policy, scoping to specific identities is not
   * currently supported, so this field must be unset (the rule matches all users
   * and service principals).
   */
  authentication?: IngressNetworkPolicy_Authentication | undefined;
  /** The label for this ingress rule. */
  label?: string | undefined;
}

/**
 * The origin of a private access request, identified by the endpoint
 * through which the request arrives.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PrivateRequestOrigin {
  source?:
    | {
        $case: 'endpoints';
        /** Matches requests arriving through any of the specified registered endpoints. */
        endpoints: IngressNetworkPolicy_Endpoints;
      }
    | {
        $case: 'allRegisteredEndpoints';
        /**
         * Matches requests arriving through any endpoint registered to the account.
         * Must be set to true when specified.
         */
        allRegisteredEndpoints: boolean;
      }
    | {
        $case: 'azureWorkspacePrivateLink';
        /**
         * Matches requests arriving through the workspace's Azure Private Link (ui-api)
         * endpoints. Can only be used in deny rules of workspace-level network policies.
         * Must be set to true when specified.
         */
        azureWorkspacePrivateLink: boolean;
      }
    | {
        $case: 'allPrivateAccess';
        /**
         * Matches requests arriving over any private connectivity, including registered
         * endpoints and the workspace's Azure Private Link (ui-api) endpoints.
         * Can only be used in deny rules of workspace-level network policies.
         * Must be set to true when specified.
         */
        allPrivateAccess: boolean;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PublicAccess {
  restrictionMode?:
    | IngressNetworkPolicy_PublicAccess_RestrictionMode
    | undefined;
  denyRules?: IngressNetworkPolicy_PublicIngressRule[] | undefined;
  allowRules?: IngressNetworkPolicy_PublicIngressRule[] | undefined;
}

/**
 * An ingress rule is enforced when a request satisfies all
 * specified attributes — including request origin, destination, and authentication.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PublicIngressRule {
  origin?: IngressNetworkPolicy_PublicRequestOrigin | undefined;
  destination?: IngressNetworkPolicy_RequestDestination | undefined;
  authentication?: IngressNetworkPolicy_Authentication | undefined;
  /** The label for this ingress rule. */
  label?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PublicRequestOrigin {
  source?:
    | {
        $case: 'allIpRanges';
        /** Matches all IPv4 and IPv6 ranges (both public and private). */
        allIpRanges: boolean;
      }
    | {
        $case: 'includedIpRanges';
        /** Will not allow IP ranges with private IPs. */
        includedIpRanges: IngressNetworkPolicy_IpRanges;
      }
    | {
        $case: 'excludedIpRanges';
        /** Excluded means: all public IP ranges except this one. */
        excludedIpRanges: IngressNetworkPolicy_IpRanges;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_RequestDestination {
  /**
   * When true, match all destinations, no other destination fields can be set.
   * When not set or false, at least one specific destination must be provided.
   */
  allDestinations?: boolean | undefined;
  workspaceUi?: IngressNetworkPolicy_WorkspaceUiDestination | undefined;
  workspaceApi?: IngressNetworkPolicy_WorkspaceApiDestination | undefined;
  appsRuntime?: IngressNetworkPolicy_AppsRuntimeDestination | undefined;
  lakebaseRuntime?: IngressNetworkPolicy_LakebaseRuntimeDestination | undefined;
  /**
   * Matches requests to the account console UI.
   * Can only be used in the account-level network policy.
   */
  accountUi?: IngressNetworkPolicy_AccountUiDestination | undefined;
  /**
   * Matches requests to account-level APIs.
   * Can only be used in the account-level network policy.
   */
  accountApi?: IngressNetworkPolicy_AccountApiDestination | undefined;
  /** Account DatabricksOne destination is not supported. */
  accountDatabricksOne?:
    | IngressNetworkPolicy_AccountDatabricksOneDestination
    | undefined;
}

/** Matches workspace-level Databricks API endpoints for an ingress network policy rule. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_WorkspaceApiDestination {
  scopes?: string[] | undefined;
  /** Qualifies the breadth of API access for the listed scopes. See ApiScopeQualifier. */
  scopeQualifier?: IngressNetworkPolicy_ApiScopeQualifier | undefined;
  /**
   * Inverse of `scopes`: matches every API scope EXCEPT those listed here
   * ("allow all except"). Mutually exclusive with `scopes` — a single
   * destination may set at most one of the two.
   */
  excludedScopes?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_WorkspaceIdList {
  workspaceIds?: bigint[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_WorkspaceUiDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

/** Definition of an IP Access list */
export interface IpAccessList {
  /** Universally unique identifier (UUID) of the IP access list. */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  ipAddresses?: string[] | undefined;
  /** Total number of IP or CIDR values. */
  addressCount?: number | undefined;
  listType?: IpAccessListType | undefined;
  /** Creation timestamp in milliseconds. */
  createdAt?: bigint | undefined;
  /** User ID of the user who created this list. */
  createdBy?: bigint | undefined;
  /** Update timestamp in milliseconds. */
  updatedAt?: bigint | undefined;
  /** User ID of the user who updated this list. */
  updatedBy?: bigint | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

export interface ListAccountIpAccessListsRequest {
  accountId?: string | undefined;
}

/** IP access lists were successfully returned. */
export interface ListAccountIpAccessListsResponse {
  ipAccessLists?: AccountIpAccessList[] | undefined;
}

export interface ListEndpointsRequest {
  /**
   * The parent resource name of the account to list endpoints for.
   * Format: `accounts/{account_id}`.
   */
  parent?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListEndpointsResponse {
  items?: Endpoint[] | undefined;
  nextPageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListIpAccessLists {}

/** IP access lists were successfully returned. */
export interface ListIpAccessListsResponse {
  ipAccessLists?: IpAccessList[] | undefined;
}

/** Gets an array of private endpoint rules. */
export interface ListNccPrivateEndpointRulesRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectvity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

/** The private endpoint rule list was successfully retrieved. */
export interface ListNccPrivateEndpointRulesResponse {
  items?: NccPrivateEndpointRule[] | undefined;
  /** A token that can be used to get the next page of results. If null, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface ListNetworkConnectivityConfigsRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

/** The network connectivity configuration list was successfully retrieved. */
export interface ListNetworkConnectivityConfigsResponse {
  items?: NetworkConnectivityConfig[] | undefined;
  /** A token that can be used to get the next page of results. If null, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface ListNetworkPoliciesRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListNetworkPoliciesResponse {
  /** List of network policies. */
  items?: AccountNetworkPolicy[] | undefined;
  /** A token that can be used to get the next page of results. If null, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface ListNetworkRequest {
  accountId?: string | undefined;
}

export interface ListNetworkResponse {
  networks?: Network[] | undefined;
}

export interface ListPrivateAccessSettingsRequest {
  accountId?: string | undefined;
}

export interface ListPrivateAccessSettingsResponse {
  privateAccessSettings?: PrivateAccessSettings[] | undefined;
}

export interface ListPrivateNetworkGatewaysRequest {
  /** The network connectivity configuration containing the gateways. */
  parent?: string | undefined;
  /** An opaque token returned by a previous list request. */
  pageToken?: string | undefined;
}

export interface ListPrivateNetworkGatewaysResponse {
  privateNetworkGateways?: PrivateNetworkGateway[] | undefined;
  /** An opaque token for the next page, or empty when there are no more results. */
  nextPageToken?: string | undefined;
}

export interface ListVpcEndpointRequest {
  accountId?: string | undefined;
}

export interface ListVpcEndpointResponse {
  vpcEndpoints?: VpcEndpoint[] | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that you must approve the endpoint in Azure portal after initialization.
 */
export interface NccPrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the Cloud console
   * before they take effect.
   * The possible values are:
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint was created but not approved in 14 days, it will be EXPIRED.
   * - CREATING: The endpoint creation is in progress. Once successfully created, the state will transition to PENDING.
   * - CREATE_FAILED: The endpoint creation failed. You can check the error_message field for more details.
   */
  connectionState?:
    | NccPrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /**
   * Only used by private endpoints to customer-managed private endpoint services.
   *
   * Domain names of target private link service.
   * When updating this field, the full list of target domain_names must be specified.
   */
  domainNames?: string[] | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  errorMessage?: string | undefined;
  /** The Azure resource ID of the target resource. */
  resourceId?: string | undefined;
  /**
   * Not used by customer-managed private endpoint services.
   *
   * The sub-resource type (group ID) of the target resource.
   * Note that to connect to workspace root storage (root DBFS), you need two endpoints, one for blob and one for dfs.
   */
  groupId?: string | undefined;
  /** The name of the Azure private endpoint resource. */
  endpointName?: string | undefined;
  /** <Databricks> account ID. You can find your account ID from the Accounts Console. */
  accountId?: string | undefined;
  /** The full target AWS endpoint service name that connects to the destination resources of the private endpoint. */
  endpointService?: string | undefined;
  /**
   * Only used by private endpoints towards AWS S3 service.
   *
   * The globally unique S3 bucket names that will be accessed via the VPC endpoint.
   * The bucket names must be in the same region as the NCC/endpoint service.
   * When updating this field, we perform full update on this field. Please ensure a full list of desired
   * resource_names is provided.
   */
  resourceNames?: string[] | undefined;
  /** The AWS VPC endpoint ID. You can use this ID to identify the VPC endpoint created by <Databricks>. */
  vpcEndpointId?: string | undefined;
  /**
   * Update this field to activate/deactivate this private endpoint to allow egress access from
   * serverless compute resources. Only honored for first-party services on each cloud (e.g. AWS S3).
   */
  enabled?: boolean | undefined;
  endpoint?: {$case: 'gcpEndpoint'; gcpEndpoint: GcpEndpoint} | undefined;
}

export interface Network {
  /** The <Databricks> network configuration ID. */
  networkId?: string | undefined;
  /** The <Databricks> account ID associated with this network configuration. */
  accountId?: string | undefined;
  /** Workspace ID associated with this network configuration. */
  workspaceId?: bigint | undefined;
  /** The ID of the VPC associated with this network configuration. VPC IDs can be used in multiple networks. */
  vpcId?: string | undefined;
  /** IDs of at least two subnets associated with this network. Subnet IDs **cannot** be used in multiple network configurations. */
  subnetIds?: string[] | undefined;
  /** IDs of one to five security groups associated with this network. Security group IDs **cannot** be used in multiple network configurations. */
  securityGroupIds?: string[] | undefined;
  vpcStatus?: VpcStatus | undefined;
  /** Array of error messages about the network configuration. */
  errorMessages?: NetworkHealth[] | undefined;
  /** The human-readable name of the network configuration. */
  networkName?: string | undefined;
  /** Time in epoch milliseconds when the network was created. */
  creationTime?: bigint | undefined;
  /** Array of warning messages about the network configuration. */
  warningMessages?: NetworkWarning[] | undefined;
  vpcEndpoints?: NetworkVpcEndpoints | undefined;
  networkInfo?:
    | {$case: 'gcpNetworkInfo'; gcpNetworkInfo: GcpNetworkInfo}
    | undefined;
}

/** Properties of the new network connectivity configuration. */
export interface NetworkConnectivityConfig {
  /** <Databricks> network connectivity configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /**
   * The name of the network connectivity configuration. The name can contain alphanumeric characters, hyphens,
   * and underscores. The length must be between 3 and 30 characters. The name must match the regular
   * expression ^[0-9a-zA-Z-_]{3,30}$
   */
  name?: string | undefined;
  /**
   * The region for the network connectivity configuration.
   * Only workspaces in the same region can be attached to the network connectivity configuration.
   */
  region?: string | undefined;
  /** The network connectivity rules that apply to network traffic from your serverless compute resources. */
  egressConfig?:
    | CustomerFacingNetworkConnectivityConfigEgressConfig
    | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /**
   * The workspace to which charges for this network connectivity configuration are attributed.
   * The workspace must be active and attached to this network connectivity configuration when set.
   */
  billingWorkspaceId?: bigint | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that for private endpoints towards a VPC endpoint service behind a customer-managed NLB,
 * you must approve the endpoint in AWS console after initialization.
 */
export interface NetworkConnectivityConfigAwsPrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /** <Databricks> account ID. You can find your account ID from the Accounts Console. */
  accountId?: string | undefined;
  /** The full target AWS endpoint service name that connects to the destination resources of the private endpoint. */
  endpointService?: string | undefined;
  /**
   * Only used by private endpoints towards a VPC endpoint service for customer-managed VPC endpoint service.
   *
   * The target AWS resource FQDNs accessible via the VPC endpoint service.
   * When updating this field, we perform full update on this field. Please ensure a full list of desired domain_names is provided.
   */
  domainNames?: string[] | undefined;
  /**
   * Only used by private endpoints towards AWS S3 service.
   *
   * The globally unique S3 bucket names that will be accessed via the VPC endpoint.
   * The bucket names must be in the same region as the NCC/endpoint service.
   * When updating this field, we perform full update on this field.
   * Please ensure a full list of desired resource_names is provided.
   */
  resourceNames?: string[] | undefined;
  /** The AWS VPC endpoint ID. You can use this ID to identify VPC endpoint created by <Databricks>. */
  vpcEndpointId?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the AWS console
   * before they take effect.
   * The possible values are:
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint is created but not approved in 14 days, it is EXPIRED.
   */
  connectionState?:
    | NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  /**
   * Only used by private endpoints towards an AWS S3 service.
   *
   * Update this field to activate/deactivate this private endpoint to allow egress access from serverless compute resources.
   */
  enabled?: boolean | undefined;
  errorMessage?: string | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that you must approve the endpoint in Azure portal after initialization.
 */
export interface NetworkConnectivityConfigAzurePrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /** The Azure resource ID of the target resource. */
  resourceId?: string | undefined;
  /**
   * Only used by private endpoints to Azure first-party services.
   *
   * The sub-resource type (group ID) of the target resource.
   * Note that to connect to workspace root storage (root DBFS), you need two endpoints, one for blob and one for dfs.
   */
  groupId?: string | undefined;
  /** The name of the Azure private endpoint resource. */
  endpointName?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the Azure portal
   * before they take effect.
   * The possible values are:
   * - INIT: (deprecated) The endpoint has been created and pending approval.
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint was created but not approved in 14 days, it will be EXPIRED.
   */
  connectionState?:
    | NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  /**
   * Not used by customer-managed private endpoint services.
   *
   * Domain names of target private link service.
   * When updating this field, the full list of target domain_names must be specified.
   */
  domainNames?: string[] | undefined;
  errorMessage?: string | undefined;
}

/**
 * Egress network configurations. Provides network configurations for Databricks -> Customer
 * traffic.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NetworkConnectivityConfigEgressConfig {}

/** Default rules don't have specific targets. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface NetworkConnectivityConfigEgressConfig_DefaultRule {
  azureServiceEndpointRule?:
    | NetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRule
    | undefined;
  awsStableIpRule?:
    | NetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRule
    | undefined;
}

/** The stable AWS IP CIDR blocks. You can use these to configure the firewall of your resources to allow traffic from your <Databricks> workspace. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface NetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRule {
  /** The list of stable IP CIDR blocks from which <Databricks> network traffic originates when accessing your resources. */
  cidrBlocks?: string[] | undefined;
}

/**
 * The stable Azure service endpoints. You can configure the firewall of your Azure resources
 * to allow traffic from your <Databricks> serverless compute resources.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface NetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRule {
  /** The Azure region in which this service endpoint rule applies.. */
  targetRegion?: string | undefined;
  /** The Azure services to which this service endpoint rule applies to. */
  targetServices?: EgressResourceType[] | undefined;
  /** The list of subnets from which <Databricks> network traffic originates when accessing your Azure resources. */
  subnets?: string[] | undefined;
}

export interface NetworkHealth {
  errorType?: string | undefined;
  /** Details of the error. */
  errorMessage?: string | undefined;
}

export interface NetworkVpcEndpoints {
  /** The VPC endpoint ID used by this network to access the Databricks REST API. */
  restApi?: string[] | undefined;
  /** The VPC endpoint ID used by this network to access the <Databricks> secure cluster connectivity relay. */
  dataplaneRelay?: string[] | undefined;
}

export interface NetworkWarning {
  warningType?: string | undefined;
  /** Details of the warning. */
  warningMessage?: string | undefined;
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

/** * */
export interface PrivateAccessSettings {
  /** <Databricks> private access settings ID. */
  privateAccessSettingsId?: string | undefined;
  /** The <Databricks> account ID that hosts the private access settings. */
  accountId?: string | undefined;
  /** The human-readable name of the private access settings object. */
  privateAccessSettingsName?: string | undefined;
  /** The AWS region for workspaces attached to this private access settings object. */
  region?: string | undefined;
  /** Determines if the workspace can be accessed over public internet. For fully private workspaces, you can optionally specify false, but only if you implement both the front-end and the back-end PrivateLink connections. Otherwise, specify true, which means that public access is enabled. */
  publicAccessEnabled?: boolean | undefined;
  /**
   * The private access level controls which VPC endpoints can connect to the UI or API of any workspace that attaches this private access settings object.
   * `ACCOUNT` level access (the default) allows only VPC endpoints that are registered in your <Databricks> account connect to your workspace.
   * `ENDPOINT` level access allows only specified VPC endpoints connect to your workspace. For details, see allowed_vpc_endpoint_ids.
   */
  privateAccessLevel?: PrivateAccessLevel | undefined;
  /**
   * An array of Databricks VPC endpoint IDs. This is the <Databricks> ID that is returned when registering the VPC endpoint configuration in your <Databricks> account. This is not the ID of the VPC endpoint in AWS.
   * Only used when private_access_level is set to ENDPOINT. This is an allow list of VPC endpoints that in your account that can connect to your workspace over AWS PrivateLink.
   * If hybrid access to your workspace is enabled by setting public_access_enabled to true, this control only works for PrivateLink connections. To control how your workspace is accessed via public internet, see IP access lists.
   */
  allowedVpcEndpointIds?: string[] | undefined;
}

/**
 * A private network gateway connects serverless compute to destinations in a
 * customer-managed VPC or VNet.
 */
export interface PrivateNetworkGateway {
  /**
   * The canonical resource name of the gateway, in the form
   * `accounts/{account_id}/network-connectivity-configs/{ncc_id}/private-network-gateways/{gateway_id}`.
   */
  name?: string | undefined;
  /** The human-readable name of the gateway. */
  displayName?: string | undefined;
  /** Exactly one cloud connection must be provided when creating a gateway. */
  cloudConnection?:
    | {
        $case: 'azureCloudConnection';
        /** The Azure connection used by the gateway. */
        azureCloudConnection: PrivateNetworkGateway_AzureCloudConnection;
      }
    | {
        $case: 'awsCloudConnection';
        /** The AWS connection used by the gateway. */
        awsCloudConnection: PrivateNetworkGateway_AwsCloudConnection;
      }
    | undefined;
  /** The destinations routed through this gateway. */
  destinations?: PrivateNetworkGateway_Destination[] | undefined;
  /** The DNS resolvers used for private name resolution. */
  privateDnsResolvers?: PrivateNetworkGateway_PrivateDnsResolver[] | undefined;
  /** The traffic routed through this gateway. */
  trafficMode?: PrivateNetworkGateway_TrafficMode | undefined;
  /** The time when the gateway was created. */
  createTime?: Temporal.Instant | undefined;
  /** The time when the gateway was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The current lifecycle state of the gateway. */
  state?: PrivateNetworkGateway_GatewayState | undefined;
  /** The failure reason when the gateway is in the FAILED state. */
  errorMessage?: string | undefined;
  /**
   * The provisioned bandwidth tier for an Azure gateway, in gigabits per second.
   * Required when creating an Azure gateway.
   */
  bandwidthTierGigabitsPerSecond?: number | undefined;
}

/** AWS connection configuration. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PrivateNetworkGateway_AwsCloudConnection {
  /** The subnets where the gateway establishes connectivity. */
  gatewaySubnets?:
    | PrivateNetworkGateway_AwsCloudConnection_AwsGatewaySubnet[]
    | undefined;
  /** The IAM role that <Databricks> assumes to manage gateway resources. */
  crossAccountRole?:
    | PrivateNetworkGateway_AwsCloudConnection_CrossAccountRole
    | undefined;
  /** The security groups attached to the gateway network interface. */
  securityGroupIds?: string[] | undefined;
}

/** An AWS subnet used by the gateway. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PrivateNetworkGateway_AwsCloudConnection_AwsGatewaySubnet {
  /** The AWS subnet ID. */
  subnetId?: string | undefined;
}

/** A cross-account IAM role used to manage gateway resources. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PrivateNetworkGateway_AwsCloudConnection_CrossAccountRole {
  /** The ARN of the IAM role. */
  roleArn?: string | undefined;
}

/** Azure connection configuration. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PrivateNetworkGateway_AzureCloudConnection {
  /** The subnet where the gateway establishes connectivity. */
  gatewaySubnet?:
    | PrivateNetworkGateway_AzureCloudConnection_AzureGatewaySubnet
    | undefined;
}

/** An Azure subnet used by the gateway. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PrivateNetworkGateway_AzureCloudConnection_AzureGatewaySubnet {
  /** The full Azure resource ID of the subnet. */
  resourceId?: string | undefined;
}

/** A destination routed through the gateway. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PrivateNetworkGateway_Destination {
  /** The destination type. */
  destinationType?:
    | PrivateNetworkGateway_Destination_DestinationType
    | undefined;
  /** The destination value. */
  value?: string | undefined;
}

/** A private DNS resolver used by the gateway. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PrivateNetworkGateway_PrivateDnsResolver {
  /** The resolver type. */
  resolverType?:
    | PrivateNetworkGateway_PrivateDnsResolver_ResolverType
    | undefined;
  /** The resolver value. */
  value?: string | undefined;
}

export interface PrivateNetworkGatewayOperationMetadata {
  /** The operation performed on the gateway. */
  operationType?:
    | PrivateNetworkGatewayOperationMetadata_OperationType
    | undefined;
}

/** Details required to replace an IP access list. */
export interface ReplaceAccountIpAccessListRequest {
  accountId?: string | undefined;
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: AccountIpAccessListType_IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

/** The IP access list was successfully replaced. */
export interface ReplaceAccountIpAccessListResponse {
  ipAccessList?: AccountIpAccessList | undefined;
}

/** Details required to replace an IP access list. */
export interface ReplaceIpAccessListRequest {
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

/** The IP access list was successfully replaced. */
export interface ReplaceIpAccessListResponse {
  ipAccessList?: IpAccessList | undefined;
}

/** Details required to update an IP access list. */
export interface UpdateAccountIpAccessListRequest {
  accountId?: string | undefined;
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: AccountIpAccessListType_IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

/** The IP access list was successfully updated. */
export interface UpdateAccountIpAccessListResponse {
  ipAccessList?: AccountIpAccessList | undefined;
}

/** Details required to update an IP access list. */
export interface UpdateIpAccessListRequest {
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

/** The IP access list was successfully updated. */
export interface UpdateIpAccessListResponse {
  ipAccessList?: IpAccessList | undefined;
}

/** Your Network Connectivity Configuration ID. */
export interface UpdateNccPrivateEndpointRuleRequest {
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your private endpoint rule ID. */
  privateEndpointRuleId?: string | undefined;
  privateEndpointRule?: UpdatePrivateEndpointRule | undefined;
  updateMask?: FieldMask<UpdatePrivateEndpointRule> | undefined;
}

/** Request to update a network connectivity configuration. */
export interface UpdateNetworkConnectivityConfigRequest {
  /** Your <Databricks> account ID. */
  accountId?: string | undefined;
  /** Your Network Connectivity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** The network connectivity configuration fields to update. */
  networkConnectivityConfig?: NetworkConnectivityConfig | undefined;
  /** Must contain at least one of `name` or `billing_workspace_id`. */
  updateMask?: FieldMask<NetworkConnectivityConfig> | undefined;
}

export interface UpdateNetworkPolicyRequest {
  /** The unique identifier for the network policy. */
  networkPolicyId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Updated network policy configuration details. */
  networkPolicy?: AccountNetworkPolicy | undefined;
}

export interface UpdatePrivateAccessSettingsRequest {
  /** Properties of the new private access settings object. */
  customerFacingPrivateAccessSettings?: PrivateAccessSettings | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that you must approve the endpoint in Azure portal after initialization.
 */
export interface UpdatePrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the Cloud console
   * before they take effect.
   * The possible values are:
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint was created but not approved in 14 days, it will be EXPIRED.
   * - CREATING: The endpoint creation is in progress. Once successfully created, the state will transition to PENDING.
   * - CREATE_FAILED: The endpoint creation failed. You can check the error_message field for more details.
   */
  connectionState?:
    | NccPrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /**
   * Only used by private endpoints to customer-managed private endpoint services.
   *
   * Domain names of target private link service.
   * When updating this field, the full list of target domain_names must be specified.
   */
  domainNames?: string[] | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  errorMessage?: string | undefined;
  /** The Azure resource ID of the target resource. */
  resourceId?: string | undefined;
  /**
   * Not used by customer-managed private endpoint services.
   *
   * The sub-resource type (group ID) of the target resource.
   * Note that to connect to workspace root storage (root DBFS), you need two endpoints, one for blob and one for dfs.
   */
  groupId?: string | undefined;
  /** The name of the Azure private endpoint resource. */
  endpointName?: string | undefined;
  /** <Databricks> account ID. You can find your account ID from the Accounts Console. */
  accountId?: string | undefined;
  /** The full target AWS endpoint service name that connects to the destination resources of the private endpoint. */
  endpointService?: string | undefined;
  /**
   * Only used by private endpoints towards AWS S3 service.
   *
   * The globally unique S3 bucket names that will be accessed via the VPC endpoint.
   * The bucket names must be in the same region as the NCC/endpoint service.
   * When updating this field, we perform full update on this field. Please ensure a full list of desired
   * resource_names is provided.
   */
  resourceNames?: string[] | undefined;
  /** The AWS VPC endpoint ID. You can use this ID to identify the VPC endpoint created by <Databricks>. */
  vpcEndpointId?: string | undefined;
  /**
   * Update this field to activate/deactivate this private endpoint to allow egress access from
   * serverless compute resources. Only honored for first-party services on each cloud (e.g. AWS S3).
   */
  enabled?: boolean | undefined;
  endpoint?: {$case: 'gcpEndpoint'; gcpEndpoint: GcpEndpoint} | undefined;
}

export interface UpdatePrivateNetworkGatewayRequest {
  /** The gateway containing the desired mutable field values. */
  privateNetworkGateway?: PrivateNetworkGateway | undefined;
  /** The fields to update. */
  updateMask?: FieldMask<PrivateNetworkGateway> | undefined;
}

export interface UpdateWorkspaceNetworkOptionRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: bigint | undefined;
  /** The network option details for the workspace. */
  workspaceNetworkOption?: WorkspaceNetworkOption | undefined;
}

/** * */
export interface VpcEndpoint {
  /** Databricks VPC endpoint ID. This is the <Databricks>-specific name of the VPC endpoint. Do not confuse this with the `aws_vpc_endpoint_id`, which is the ID within AWS of the VPC endpoint. */
  vpcEndpointId?: string | undefined;
  /** The <Databricks> account ID that hosts the VPC endpoint configuration. */
  accountId?: string | undefined;
  /** The human-readable name of the storage configuration. */
  vpcEndpointName?: string | undefined;
  /** The ID of the VPC endpoint object in AWS. */
  awsVpcEndpointId?: string | undefined;
  /** The ID of the <Databricks> [endpoint service](https://docs.aws.amazon.com/vpc/latest/privatelink/endpoint-service.html) that this VPC endpoint is connected to. For a list of endpoint service IDs for each supported AWS region, see the [Databricks PrivateLink documentation](https://docs.databricks.com/administration-guide/cloud-configurations/aws/privatelink.html). */
  awsEndpointServiceId?: string | undefined;
  /**
   * This enumeration represents the type of Databricks VPC endpoint service that was used when creating this VPC endpoint.
   * If the VPC endpoint connects to the <Databricks> control plane for either the front-end connection or the back-end REST API connection, the value is GENERAL_ACCESS.
   * If the VPC endpoint connects to the <Databricks> workspace for the back-end secure cluster connectivity relay, the value is DATAPLANE_RELAY_ACCESS.
   */
  useCase?: VpcEndpointUseCase | undefined;
  /** The AWS region in which this VPC endpoint object exists. */
  region?: string | undefined;
  /** The AWS Account in which the VPC endpoint object exists. */
  awsAccountId?: string | undefined;
  /** The current state (such as `available` or `rejected`) of the VPC endpoint. Derived from AWS. For the full set of values, see [AWS DescribeVpcEndpoint documentation](https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-vpc-endpoints.html). */
  state?: string | undefined;
  vpcEndpointInfo?:
    | {
        $case: 'gcpVpcEndpointInfo';
        /**
         * The cloud info of this vpc endpoint.
         * Info for a GCP vpc endpoint.
         */
        gcpVpcEndpointInfo: GcpVpcEndpointInfo;
      }
    | undefined;
}

export interface WorkspaceNetworkOption {
  /**
   * The network policy ID to apply to the workspace. This controls the network access rules
   * for all serverless compute resources in the workspace. Each workspace can only be
   * linked to one policy at a time. If no policy is explicitly assigned,
   * the workspace will use 'default-policy'.
   */
  networkPolicyId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: bigint | undefined;
}

export const unmarshalAccountIpAccessListSchema: z.ZodType<AccountIpAccessList> =
  z
    .object({
      list_id: z.string().optional(),
      label: z.string().optional(),
      ip_addresses: z.array(z.string()).optional(),
      address_count: z.number().optional(),
      list_type: z.string().optional(),
      created_at: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      created_by: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      updated_at: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      updated_by: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      enabled: z.boolean().optional(),
    })
    .transform(d => ({
      listId: d.list_id,
      label: d.label,
      ipAddresses: d.ip_addresses,
      addressCount: d.address_count,
      listType: d.list_type,
      createdAt: d.created_at,
      createdBy: d.created_by,
      updatedAt: d.updated_at,
      updatedBy: d.updated_by,
      enabled: d.enabled,
    }));

export const unmarshalAccountNetworkPolicySchema: z.ZodType<AccountNetworkPolicy> =
  z
    .object({
      network_policy_id: z.string().optional(),
      account_id: z.string().optional(),
      egress: z
        .lazy(() => unmarshalEgressNetworkPolicySchema)
        .nullish()
        .transform(v => v ?? undefined),
      ingress: z
        .lazy(() => unmarshalIngressNetworkPolicySchema)
        .nullish()
        .transform(v => v ?? undefined),
      ingress_dry_run: z
        .lazy(() => unmarshalIngressNetworkPolicySchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      networkPolicyId: d.network_policy_id,
      accountId: d.account_id,
      egress: d.egress,
      ingress: d.ingress,
      ingressDryRun: d.ingress_dry_run,
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

export const unmarshalAwsVpcEndpointInfoSchema: z.ZodType<AwsVpcEndpointInfo> =
  z
    .object({
      aws_vpc_endpoint_id: z.string().optional(),
      aws_endpoint_service_id: z.string().optional(),
      aws_account_id: z.string().optional(),
    })
    .transform(d => ({
      awsVpcEndpointId: d.aws_vpc_endpoint_id,
      awsEndpointServiceId: d.aws_endpoint_service_id,
      awsAccountId: d.aws_account_id,
    }));

export const unmarshalAzurePrivateEndpointInfoSchema: z.ZodType<AzurePrivateEndpointInfo> =
  z
    .object({
      private_endpoint_name: z.string().optional(),
      private_endpoint_resource_guid: z.string().optional(),
      private_endpoint_resource_id: z.string().optional(),
      private_link_service_id: z.string().optional(),
    })
    .transform(d => ({
      privateEndpointName: d.private_endpoint_name,
      privateEndpointResourceGuid: d.private_endpoint_resource_guid,
      privateEndpointResourceId: d.private_endpoint_resource_id,
      privateLinkServiceId: d.private_link_service_id,
    }));

export const unmarshalCreateAccountIpAccessListResponseSchema: z.ZodType<CreateAccountIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalAccountIpAccessListSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalCreateIpAccessListResponseSchema: z.ZodType<CreateIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalIpAccessListSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalCustomerFacingNetworkConnectivityConfigEgressConfigSchema: z.ZodType<CustomerFacingNetworkConnectivityConfigEgressConfig> =
  z
    .object({
      default_rules: z
        .lazy(
          () => unmarshalNetworkConnectivityConfigEgressConfig_DefaultRuleSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
      target_rules: z
        .lazy(
          () =>
            unmarshalCustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      defaultRules: d.default_rules,
      targetRules: d.target_rules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleSchema: z.ZodType<CustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRule> =
  z
    .object({
      azure_private_endpoint_rules: z
        .array(
          z.lazy(
            () =>
              unmarshalNetworkConnectivityConfigAzurePrivateEndpointRuleSchema
          )
        )
        .optional(),
      aws_private_endpoint_rules: z
        .array(
          z.lazy(
            () => unmarshalNetworkConnectivityConfigAwsPrivateEndpointRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      azurePrivateEndpointRules: d.azure_private_endpoint_rules,
      awsPrivateEndpointRules: d.aws_private_endpoint_rules,
    }));

export const unmarshalDeleteAccountIpAccessListResponseSchema: z.ZodType<DeleteAccountIpAccessListResponse> =
  z.object({});

export const unmarshalDeleteIpAccessListResponseSchema: z.ZodType<DeleteIpAccessListResponse> =
  z.object({});

export const unmarshalEgressNetworkPolicySchema: z.ZodType<EgressNetworkPolicy> =
  z
    .object({
      network_access: z
        .lazy(() => unmarshalEgressNetworkPolicy_NetworkAccessPolicySchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      networkAccess: d.network_access,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicySchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy> =
  z
    .object({
      restriction_mode: z.string().optional(),
      allowed_internet_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema
          )
        )
        .optional(),
      allowed_storage_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_NetworkAccessPolicy_StorageDestinationSchema
          )
        )
        .optional(),
      policy_enforcement: z
        .lazy(
          () =>
            unmarshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
      blocked_internet_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema
          )
        )
        .optional(),
      allowed_databricks_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestinationSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      restrictionMode: d.restriction_mode,
      allowedInternetDestinations: d.allowed_internet_destinations,
      allowedStorageDestinations: d.allowed_storage_destinations,
      policyEnforcement: d.policy_enforcement,
      blockedInternetDestinations: d.blocked_internet_destinations,
      allowedDatabricksDestinations: d.allowed_databricks_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestinationSchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestination> =
  z
    .object({
      workspace_ids: z
        .array(
          z
            .union([z.number(), z.bigint(), z.string()])
            .transform(v => BigInt(v))
        )
        .optional(),
    })
    .transform(d => ({
      workspaceIds: d.workspace_ids,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination> =
  z
    .object({
      destination: z.string().optional(),
      internet_destination_type: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
      internetDestinationType: d.internet_destination_type,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement> =
  z
    .object({
      enforcement_mode: z.string().optional(),
      dry_run_mode_product_filter: z.array(z.string()).optional(),
    })
    .transform(d => ({
      enforcementMode: d.enforcement_mode,
      dryRunModeProductFilter: d.dry_run_mode_product_filter,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicy_StorageDestinationSchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination> =
  z
    .object({
      bucket_name: z.string().optional(),
      region: z.string().optional(),
      storage_destination_type: z.string().optional(),
      azure_storage_account: z.string().optional(),
      azure_storage_service: z.string().optional(),
    })
    .transform(d => ({
      bucketName: d.bucket_name,
      region: d.region,
      storageDestinationType: d.storage_destination_type,
      azureStorageAccount: d.azure_storage_account,
      azureStorageService: d.azure_storage_service,
    }));

export const unmarshalEndpointSchema: z.ZodType<Endpoint> = z
  .object({
    name: z.string().optional(),
    endpoint_id: z.string().optional(),
    account_id: z.string().optional(),
    display_name: z.string().optional(),
    use_case: z.string().optional(),
    region: z.string().optional(),
    state: z.string().optional(),
    azure_private_endpoint_info: z
      .lazy(() => unmarshalAzurePrivateEndpointInfoSchema)
      .optional(),
    aws_vpc_endpoint_info: z
      .lazy(() => unmarshalAwsVpcEndpointInfoSchema)
      .optional(),
    gcp_psc_endpoint_info: z
      .lazy(() => unmarshalGcpPscEndpointInfoSchema)
      .optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    endpointId: d.endpoint_id,
    accountId: d.account_id,
    displayName: d.display_name,
    useCase: d.use_case,
    region: d.region,
    state: d.state,
    endpointInfo:
      d.azure_private_endpoint_info !== undefined
        ? {
            $case: 'azurePrivateEndpointInfo' as const,
            azurePrivateEndpointInfo: d.azure_private_endpoint_info,
          }
        : d.aws_vpc_endpoint_info !== undefined
          ? {
              $case: 'awsVpcEndpointInfo' as const,
              awsVpcEndpointInfo: d.aws_vpc_endpoint_info,
            }
          : d.gcp_psc_endpoint_info !== undefined
            ? {
                $case: 'gcpPscEndpointInfo' as const,
                gcpPscEndpointInfo: d.gcp_psc_endpoint_info,
              }
            : undefined,
    createTime: d.create_time,
  }));

export const unmarshalGcpEndpointSchema: z.ZodType<GcpEndpoint> = z
  .object({
    psc_endpoint_uri: z.string().optional(),
    service_attachment: z.string().optional(),
    google_api_endpoints: z
      .lazy(() => unmarshalGoogleApiEndpointsSchema)
      .optional(),
    all_vpc_sc_services: z.boolean().optional(),
  })
  .transform(d => ({
    pscEndpointUri: d.psc_endpoint_uri,
    targetServices:
      d.service_attachment !== undefined
        ? {
            $case: 'serviceAttachment' as const,
            serviceAttachment: d.service_attachment,
          }
        : d.google_api_endpoints !== undefined
          ? {
              $case: 'googleApiEndpoints' as const,
              googleApiEndpoints: d.google_api_endpoints,
            }
          : d.all_vpc_sc_services !== undefined
            ? {
                $case: 'allVpcScServices' as const,
                allVpcScServices: d.all_vpc_sc_services,
              }
            : undefined,
  }));

export const unmarshalGcpNetworkInfoSchema: z.ZodType<GcpNetworkInfo> = z
  .object({
    network_project_id: z.string().optional(),
    vpc_id: z.string().optional(),
    subnet_id: z.string().optional(),
    subnet_region: z.string().optional(),
    pod_ip_range_name: z.string().optional(),
    service_ip_range_name: z.string().optional(),
  })
  .transform(d => ({
    networkProjectId: d.network_project_id,
    vpcId: d.vpc_id,
    subnetId: d.subnet_id,
    subnetRegion: d.subnet_region,
    podIpRangeName: d.pod_ip_range_name,
    serviceIpRangeName: d.service_ip_range_name,
  }));

export const unmarshalGcpPscEndpointInfoSchema: z.ZodType<GcpPscEndpointInfo> =
  z
    .object({
      psc_connection_id: z.string().optional(),
      project_id: z.string().optional(),
      psc_endpoint: z.string().optional(),
      endpoint_region: z.string().optional(),
      service_attachment_id: z.string().optional(),
    })
    .transform(d => ({
      pscConnectionId: d.psc_connection_id,
      projectId: d.project_id,
      pscEndpoint: d.psc_endpoint,
      endpointRegion: d.endpoint_region,
      serviceAttachmentId: d.service_attachment_id,
    }));

export const unmarshalGcpVpcEndpointInfoSchema: z.ZodType<GcpVpcEndpointInfo> =
  z
    .object({
      psc_connection_id: z.string().optional(),
      project_id: z.string().optional(),
      psc_endpoint_name: z.string().optional(),
      endpoint_region: z.string().optional(),
      service_attachment_id: z.string().optional(),
    })
    .transform(d => ({
      pscConnectionId: d.psc_connection_id,
      projectId: d.project_id,
      pscEndpointName: d.psc_endpoint_name,
      endpointRegion: d.endpoint_region,
      serviceAttachmentId: d.service_attachment_id,
    }));

export const unmarshalGetAccountIpAccessListResponseSchema: z.ZodType<GetAccountIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalAccountIpAccessListSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalGetIpAccessListResponseSchema: z.ZodType<GetIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalIpAccessListSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalGoogleApiEndpointsSchema: z.ZodType<GoogleApiEndpoints> =
  z
    .object({
      endpoints: z.array(z.string()).optional(),
    })
    .transform(d => ({
      endpoints: d.endpoints,
    }));

export const unmarshalIngressNetworkPolicySchema: z.ZodType<IngressNetworkPolicy> =
  z
    .object({
      public_access: z
        .lazy(() => unmarshalIngressNetworkPolicy_PublicAccessSchema)
        .nullish()
        .transform(v => v ?? undefined),
      private_access: z
        .lazy(() => unmarshalIngressNetworkPolicy_PrivateAccessSchema)
        .nullish()
        .transform(v => v ?? undefined),
      cross_workspace_access: z
        .lazy(() => unmarshalIngressNetworkPolicy_CrossWorkspaceAccessSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      publicAccess: d.public_access,
      privateAccess: d.private_access,
      crossWorkspaceAccess: d.cross_workspace_access,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AccountApiDestinationSchema: z.ZodType<IngressNetworkPolicy_AccountApiDestination> =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scope_qualifier: z.string().optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scopeQualifier: d.scope_qualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AccountDatabricksOneDestinationSchema: z.ZodType<IngressNetworkPolicy_AccountDatabricksOneDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AccountUiDestinationSchema: z.ZodType<IngressNetworkPolicy_AccountUiDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AppsRuntimeDestinationSchema: z.ZodType<IngressNetworkPolicy_AppsRuntimeDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AuthenticationSchema: z.ZodType<IngressNetworkPolicy_Authentication> =
  z
    .object({
      identity_type: z.string().optional(),
      identities: z
        .array(
          z.lazy(
            () => unmarshalIngressNetworkPolicy_AuthenticationIdentitySchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      identityType: d.identity_type,
      identities: d.identities,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AuthenticationIdentitySchema: z.ZodType<IngressNetworkPolicy_AuthenticationIdentity> =
  z
    .object({
      principal_type: z.string().optional(),
      principal_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      principalType: d.principal_type,
      principalId: d.principal_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_CrossWorkspaceAccessSchema: z.ZodType<IngressNetworkPolicy_CrossWorkspaceAccess> =
  z
    .object({
      restriction_mode: z.string().optional(),
      deny_rules: z
        .array(
          z.lazy(
            () => unmarshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
      allow_rules: z
        .array(
          z.lazy(
            () => unmarshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      restrictionMode: d.restriction_mode,
      denyRules: d.deny_rules,
      allowRules: d.allow_rules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema: z.ZodType<IngressNetworkPolicy_CrossWorkspaceIngressRule> =
  z
    .object({
      origin: z
        .lazy(
          () => unmarshalIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
      destination: z
        .lazy(() => unmarshalIngressNetworkPolicy_RequestDestinationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      authentication: z
        .lazy(() => unmarshalIngressNetworkPolicy_AuthenticationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      label: z.string().optional(),
    })
    .transform(d => ({
      origin: d.origin,
      destination: d.destination,
      authentication: d.authentication,
      label: d.label,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema: z.ZodType<IngressNetworkPolicy_CrossWorkspaceRequestOrigin> =
  z
    .object({
      all_source_workspaces: z.boolean().optional(),
      selected_workspaces: z
        .lazy(() => unmarshalIngressNetworkPolicy_WorkspaceIdListSchema)
        .optional(),
    })
    .transform(d => ({
      source:
        d.all_source_workspaces !== undefined
          ? {
              $case: 'allSourceWorkspaces' as const,
              allSourceWorkspaces: d.all_source_workspaces,
            }
          : d.selected_workspaces !== undefined
            ? {
                $case: 'selectedWorkspaces' as const,
                selectedWorkspaces: d.selected_workspaces,
              }
            : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_EndpointsSchema: z.ZodType<IngressNetworkPolicy_Endpoints> =
  z
    .object({
      endpoint_ids: z.array(z.string()).optional(),
    })
    .transform(d => ({
      endpointIds: d.endpoint_ids,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_IpRangesSchema: z.ZodType<IngressNetworkPolicy_IpRanges> =
  z
    .object({
      ip_ranges: z.array(z.string()).optional(),
    })
    .transform(d => ({
      ipRanges: d.ip_ranges,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_LakebaseRuntimeDestinationSchema: z.ZodType<IngressNetworkPolicy_LakebaseRuntimeDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PrivateAccessSchema: z.ZodType<IngressNetworkPolicy_PrivateAccess> =
  z
    .object({
      restriction_mode: z.string().optional(),
      deny_rules: z
        .array(
          z.lazy(() => unmarshalIngressNetworkPolicy_PrivateIngressRuleSchema)
        )
        .optional(),
      allow_rules: z
        .array(
          z.lazy(() => unmarshalIngressNetworkPolicy_PrivateIngressRuleSchema)
        )
        .optional(),
    })
    .transform(d => ({
      restrictionMode: d.restriction_mode,
      denyRules: d.deny_rules,
      allowRules: d.allow_rules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PrivateIngressRuleSchema: z.ZodType<IngressNetworkPolicy_PrivateIngressRule> =
  z
    .object({
      origin: z
        .lazy(() => unmarshalIngressNetworkPolicy_PrivateRequestOriginSchema)
        .nullish()
        .transform(v => v ?? undefined),
      destination: z
        .lazy(() => unmarshalIngressNetworkPolicy_RequestDestinationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      authentication: z
        .lazy(() => unmarshalIngressNetworkPolicy_AuthenticationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      label: z.string().optional(),
    })
    .transform(d => ({
      origin: d.origin,
      destination: d.destination,
      authentication: d.authentication,
      label: d.label,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PrivateRequestOriginSchema: z.ZodType<IngressNetworkPolicy_PrivateRequestOrigin> =
  z
    .object({
      endpoints: z
        .lazy(() => unmarshalIngressNetworkPolicy_EndpointsSchema)
        .optional(),
      all_registered_endpoints: z.boolean().optional(),
      azure_workspace_private_link: z.boolean().optional(),
      all_private_access: z.boolean().optional(),
    })
    .transform(d => ({
      source:
        d.endpoints !== undefined
          ? {$case: 'endpoints' as const, endpoints: d.endpoints}
          : d.all_registered_endpoints !== undefined
            ? {
                $case: 'allRegisteredEndpoints' as const,
                allRegisteredEndpoints: d.all_registered_endpoints,
              }
            : d.azure_workspace_private_link !== undefined
              ? {
                  $case: 'azureWorkspacePrivateLink' as const,
                  azureWorkspacePrivateLink: d.azure_workspace_private_link,
                }
              : d.all_private_access !== undefined
                ? {
                    $case: 'allPrivateAccess' as const,
                    allPrivateAccess: d.all_private_access,
                  }
                : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PublicAccessSchema: z.ZodType<IngressNetworkPolicy_PublicAccess> =
  z
    .object({
      restriction_mode: z.string().optional(),
      deny_rules: z
        .array(
          z.lazy(() => unmarshalIngressNetworkPolicy_PublicIngressRuleSchema)
        )
        .optional(),
      allow_rules: z
        .array(
          z.lazy(() => unmarshalIngressNetworkPolicy_PublicIngressRuleSchema)
        )
        .optional(),
    })
    .transform(d => ({
      restrictionMode: d.restriction_mode,
      denyRules: d.deny_rules,
      allowRules: d.allow_rules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PublicIngressRuleSchema: z.ZodType<IngressNetworkPolicy_PublicIngressRule> =
  z
    .object({
      origin: z
        .lazy(() => unmarshalIngressNetworkPolicy_PublicRequestOriginSchema)
        .nullish()
        .transform(v => v ?? undefined),
      destination: z
        .lazy(() => unmarshalIngressNetworkPolicy_RequestDestinationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      authentication: z
        .lazy(() => unmarshalIngressNetworkPolicy_AuthenticationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      label: z.string().optional(),
    })
    .transform(d => ({
      origin: d.origin,
      destination: d.destination,
      authentication: d.authentication,
      label: d.label,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PublicRequestOriginSchema: z.ZodType<IngressNetworkPolicy_PublicRequestOrigin> =
  z
    .object({
      all_ip_ranges: z.boolean().optional(),
      included_ip_ranges: z
        .lazy(() => unmarshalIngressNetworkPolicy_IpRangesSchema)
        .optional(),
      excluded_ip_ranges: z
        .lazy(() => unmarshalIngressNetworkPolicy_IpRangesSchema)
        .optional(),
    })
    .transform(d => ({
      source:
        d.all_ip_ranges !== undefined
          ? {$case: 'allIpRanges' as const, allIpRanges: d.all_ip_ranges}
          : d.included_ip_ranges !== undefined
            ? {
                $case: 'includedIpRanges' as const,
                includedIpRanges: d.included_ip_ranges,
              }
            : d.excluded_ip_ranges !== undefined
              ? {
                  $case: 'excludedIpRanges' as const,
                  excludedIpRanges: d.excluded_ip_ranges,
                }
              : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_RequestDestinationSchema: z.ZodType<IngressNetworkPolicy_RequestDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
      workspace_ui: z
        .lazy(() => unmarshalIngressNetworkPolicy_WorkspaceUiDestinationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      workspace_api: z
        .lazy(() => unmarshalIngressNetworkPolicy_WorkspaceApiDestinationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      apps_runtime: z
        .lazy(() => unmarshalIngressNetworkPolicy_AppsRuntimeDestinationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      lakebase_runtime: z
        .lazy(
          () => unmarshalIngressNetworkPolicy_LakebaseRuntimeDestinationSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
      account_ui: z
        .lazy(() => unmarshalIngressNetworkPolicy_AccountUiDestinationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      account_api: z
        .lazy(() => unmarshalIngressNetworkPolicy_AccountApiDestinationSchema)
        .nullish()
        .transform(v => v ?? undefined),
      account_databricks_one: z
        .lazy(
          () =>
            unmarshalIngressNetworkPolicy_AccountDatabricksOneDestinationSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
      workspaceUi: d.workspace_ui,
      workspaceApi: d.workspace_api,
      appsRuntime: d.apps_runtime,
      lakebaseRuntime: d.lakebase_runtime,
      accountUi: d.account_ui,
      accountApi: d.account_api,
      accountDatabricksOne: d.account_databricks_one,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_WorkspaceApiDestinationSchema: z.ZodType<IngressNetworkPolicy_WorkspaceApiDestination> =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scope_qualifier: z.string().optional(),
      excluded_scopes: z.array(z.string()).optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scopeQualifier: d.scope_qualifier,
      excludedScopes: d.excluded_scopes,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_WorkspaceIdListSchema: z.ZodType<IngressNetworkPolicy_WorkspaceIdList> =
  z
    .object({
      workspace_ids: z
        .array(
          z
            .union([z.number(), z.bigint(), z.string()])
            .transform(v => BigInt(v))
        )
        .optional(),
    })
    .transform(d => ({
      workspaceIds: d.workspace_ids,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_WorkspaceUiDestinationSchema: z.ZodType<IngressNetworkPolicy_WorkspaceUiDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

export const unmarshalIpAccessListSchema: z.ZodType<IpAccessList> = z
  .object({
    list_id: z.string().optional(),
    label: z.string().optional(),
    ip_addresses: z.array(z.string()).optional(),
    address_count: z.number().optional(),
    list_type: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    updated_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    listId: d.list_id,
    label: d.label,
    ipAddresses: d.ip_addresses,
    addressCount: d.address_count,
    listType: d.list_type,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    enabled: d.enabled,
  }));

export const unmarshalListAccountIpAccessListsResponseSchema: z.ZodType<ListAccountIpAccessListsResponse> =
  z
    .object({
      ip_access_lists: z
        .array(z.lazy(() => unmarshalAccountIpAccessListSchema))
        .optional(),
    })
    .transform(d => ({
      ipAccessLists: d.ip_access_lists,
    }));

export const unmarshalListEndpointsResponseSchema: z.ZodType<ListEndpointsResponse> =
  z
    .object({
      items: z.array(z.lazy(() => unmarshalEndpointSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      items: d.items,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListIpAccessListsResponseSchema: z.ZodType<ListIpAccessListsResponse> =
  z
    .object({
      ip_access_lists: z
        .array(z.lazy(() => unmarshalIpAccessListSchema))
        .optional(),
    })
    .transform(d => ({
      ipAccessLists: d.ip_access_lists,
    }));

export const unmarshalListNccPrivateEndpointRulesResponseSchema: z.ZodType<ListNccPrivateEndpointRulesResponse> =
  z
    .object({
      items: z
        .array(z.lazy(() => unmarshalNccPrivateEndpointRuleSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      items: d.items,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListNetworkConnectivityConfigsResponseSchema: z.ZodType<ListNetworkConnectivityConfigsResponse> =
  z
    .object({
      items: z
        .array(z.lazy(() => unmarshalNetworkConnectivityConfigSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      items: d.items,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListNetworkPoliciesResponseSchema: z.ZodType<ListNetworkPoliciesResponse> =
  z
    .object({
      items: z
        .array(z.lazy(() => unmarshalAccountNetworkPolicySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      items: d.items,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListPrivateNetworkGatewaysResponseSchema: z.ZodType<ListPrivateNetworkGatewaysResponse> =
  z
    .object({
      private_network_gateways: z
        .array(z.lazy(() => unmarshalPrivateNetworkGatewaySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      privateNetworkGateways: d.private_network_gateways,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalNccPrivateEndpointRuleSchema: z.ZodType<NccPrivateEndpointRule> =
  z
    .object({
      rule_id: z.string().optional(),
      network_connectivity_config_id: z.string().optional(),
      connection_state: z.string().optional(),
      domain_names: z.array(z.string()).optional(),
      creation_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      updated_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      deactivated: z.boolean().optional(),
      deactivated_at: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      error_message: z.string().optional(),
      resource_id: z.string().optional(),
      group_id: z.string().optional(),
      endpoint_name: z.string().optional(),
      account_id: z.string().optional(),
      endpoint_service: z.string().optional(),
      resource_names: z.array(z.string()).optional(),
      vpc_endpoint_id: z.string().optional(),
      enabled: z.boolean().optional(),
      gcp_endpoint: z.lazy(() => unmarshalGcpEndpointSchema).optional(),
    })
    .transform(d => ({
      ruleId: d.rule_id,
      networkConnectivityConfigId: d.network_connectivity_config_id,
      connectionState: d.connection_state,
      domainNames: d.domain_names,
      creationTime: d.creation_time,
      updatedTime: d.updated_time,
      deactivated: d.deactivated,
      deactivatedAt: d.deactivated_at,
      errorMessage: d.error_message,
      resourceId: d.resource_id,
      groupId: d.group_id,
      endpointName: d.endpoint_name,
      accountId: d.account_id,
      endpointService: d.endpoint_service,
      resourceNames: d.resource_names,
      vpcEndpointId: d.vpc_endpoint_id,
      enabled: d.enabled,
      endpoint:
        d.gcp_endpoint !== undefined
          ? {$case: 'gcpEndpoint' as const, gcpEndpoint: d.gcp_endpoint}
          : undefined,
    }));

export const unmarshalNetworkSchema: z.ZodType<Network> = z
  .object({
    network_id: z.string().optional(),
    account_id: z.string().optional(),
    workspace_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    vpc_id: z.string().optional(),
    subnet_ids: z.array(z.string()).optional(),
    security_group_ids: z.array(z.string()).optional(),
    vpc_status: z.string().optional(),
    error_messages: z
      .array(z.lazy(() => unmarshalNetworkHealthSchema))
      .optional(),
    network_name: z.string().optional(),
    creation_time: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    warning_messages: z
      .array(z.lazy(() => unmarshalNetworkWarningSchema))
      .optional(),
    vpc_endpoints: z
      .lazy(() => unmarshalNetworkVpcEndpointsSchema)
      .nullish()
      .transform(v => v ?? undefined),
    gcp_network_info: z.lazy(() => unmarshalGcpNetworkInfoSchema).optional(),
  })
  .transform(d => ({
    networkId: d.network_id,
    accountId: d.account_id,
    workspaceId: d.workspace_id,
    vpcId: d.vpc_id,
    subnetIds: d.subnet_ids,
    securityGroupIds: d.security_group_ids,
    vpcStatus: d.vpc_status,
    errorMessages: d.error_messages,
    networkName: d.network_name,
    creationTime: d.creation_time,
    warningMessages: d.warning_messages,
    vpcEndpoints: d.vpc_endpoints,
    networkInfo:
      d.gcp_network_info !== undefined
        ? {$case: 'gcpNetworkInfo' as const, gcpNetworkInfo: d.gcp_network_info}
        : undefined,
  }));

export const unmarshalNetworkConnectivityConfigSchema: z.ZodType<NetworkConnectivityConfig> =
  z
    .object({
      network_connectivity_config_id: z.string().optional(),
      account_id: z.string().optional(),
      name: z.string().optional(),
      region: z.string().optional(),
      egress_config: z
        .lazy(
          () =>
            unmarshalCustomerFacingNetworkConnectivityConfigEgressConfigSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
      updated_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      creation_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      billing_workspace_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      networkConnectivityConfigId: d.network_connectivity_config_id,
      accountId: d.account_id,
      name: d.name,
      region: d.region,
      egressConfig: d.egress_config,
      updatedTime: d.updated_time,
      creationTime: d.creation_time,
      billingWorkspaceId: d.billing_workspace_id,
    }));

export const unmarshalNetworkConnectivityConfigAwsPrivateEndpointRuleSchema: z.ZodType<NetworkConnectivityConfigAwsPrivateEndpointRule> =
  z
    .object({
      rule_id: z.string().optional(),
      network_connectivity_config_id: z.string().optional(),
      account_id: z.string().optional(),
      endpoint_service: z.string().optional(),
      domain_names: z.array(z.string()).optional(),
      resource_names: z.array(z.string()).optional(),
      vpc_endpoint_id: z.string().optional(),
      connection_state: z.string().optional(),
      creation_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      updated_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      deactivated: z.boolean().optional(),
      deactivated_at: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      enabled: z.boolean().optional(),
      error_message: z.string().optional(),
    })
    .transform(d => ({
      ruleId: d.rule_id,
      networkConnectivityConfigId: d.network_connectivity_config_id,
      accountId: d.account_id,
      endpointService: d.endpoint_service,
      domainNames: d.domain_names,
      resourceNames: d.resource_names,
      vpcEndpointId: d.vpc_endpoint_id,
      connectionState: d.connection_state,
      creationTime: d.creation_time,
      updatedTime: d.updated_time,
      deactivated: d.deactivated,
      deactivatedAt: d.deactivated_at,
      enabled: d.enabled,
      errorMessage: d.error_message,
    }));

export const unmarshalNetworkConnectivityConfigAzurePrivateEndpointRuleSchema: z.ZodType<NetworkConnectivityConfigAzurePrivateEndpointRule> =
  z
    .object({
      rule_id: z.string().optional(),
      network_connectivity_config_id: z.string().optional(),
      resource_id: z.string().optional(),
      group_id: z.string().optional(),
      endpoint_name: z.string().optional(),
      connection_state: z.string().optional(),
      creation_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      updated_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      deactivated: z.boolean().optional(),
      deactivated_at: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      domain_names: z.array(z.string()).optional(),
      error_message: z.string().optional(),
    })
    .transform(d => ({
      ruleId: d.rule_id,
      networkConnectivityConfigId: d.network_connectivity_config_id,
      resourceId: d.resource_id,
      groupId: d.group_id,
      endpointName: d.endpoint_name,
      connectionState: d.connection_state,
      creationTime: d.creation_time,
      updatedTime: d.updated_time,
      deactivated: d.deactivated,
      deactivatedAt: d.deactivated_at,
      domainNames: d.domain_names,
      errorMessage: d.error_message,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalNetworkConnectivityConfigEgressConfig_DefaultRuleSchema: z.ZodType<NetworkConnectivityConfigEgressConfig_DefaultRule> =
  z
    .object({
      azure_service_endpoint_rule: z
        .lazy(
          () =>
            unmarshalNetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
      aws_stable_ip_rule: z
        .lazy(
          () =>
            unmarshalNetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      azureServiceEndpointRule: d.azure_service_endpoint_rule,
      awsStableIpRule: d.aws_stable_ip_rule,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalNetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleSchema: z.ZodType<NetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRule> =
  z
    .object({
      cidr_blocks: z.array(z.string()).optional(),
    })
    .transform(d => ({
      cidrBlocks: d.cidr_blocks,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalNetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleSchema: z.ZodType<NetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRule> =
  z
    .object({
      target_region: z.string().optional(),
      target_services: z.array(z.string()).optional(),
      subnets: z.array(z.string()).optional(),
    })
    .transform(d => ({
      targetRegion: d.target_region,
      targetServices: d.target_services,
      subnets: d.subnets,
    }));

export const unmarshalNetworkHealthSchema: z.ZodType<NetworkHealth> = z
  .object({
    error_type: z.string().optional(),
    error_message: z.string().optional(),
  })
  .transform(d => ({
    errorType: d.error_type,
    errorMessage: d.error_message,
  }));

export const unmarshalNetworkVpcEndpointsSchema: z.ZodType<NetworkVpcEndpoints> =
  z
    .object({
      rest_api: z.array(z.string()).optional(),
      dataplane_relay: z.array(z.string()).optional(),
    })
    .transform(d => ({
      restApi: d.rest_api,
      dataplaneRelay: d.dataplane_relay,
    }));

export const unmarshalNetworkWarningSchema: z.ZodType<NetworkWarning> = z
  .object({
    warning_type: z.string().optional(),
    warning_message: z.string().optional(),
  })
  .transform(d => ({
    warningType: d.warning_type,
    warningMessage: d.warning_message,
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

export const unmarshalPrivateAccessSettingsSchema: z.ZodType<PrivateAccessSettings> =
  z
    .object({
      private_access_settings_id: z.string().optional(),
      account_id: z.string().optional(),
      private_access_settings_name: z.string().optional(),
      region: z.string().optional(),
      public_access_enabled: z.boolean().optional(),
      private_access_level: z.string().optional(),
      allowed_vpc_endpoint_ids: z.array(z.string()).optional(),
    })
    .transform(d => ({
      privateAccessSettingsId: d.private_access_settings_id,
      accountId: d.account_id,
      privateAccessSettingsName: d.private_access_settings_name,
      region: d.region,
      publicAccessEnabled: d.public_access_enabled,
      privateAccessLevel: d.private_access_level,
      allowedVpcEndpointIds: d.allowed_vpc_endpoint_ids,
    }));

export const unmarshalPrivateNetworkGatewaySchema: z.ZodType<PrivateNetworkGateway> =
  z
    .object({
      name: z.string().optional(),
      display_name: z.string().optional(),
      azure_cloud_connection: z
        .lazy(() => unmarshalPrivateNetworkGateway_AzureCloudConnectionSchema)
        .optional(),
      aws_cloud_connection: z
        .lazy(() => unmarshalPrivateNetworkGateway_AwsCloudConnectionSchema)
        .optional(),
      destinations: z
        .array(z.lazy(() => unmarshalPrivateNetworkGateway_DestinationSchema))
        .optional(),
      private_dns_resolvers: z
        .array(
          z.lazy(() => unmarshalPrivateNetworkGateway_PrivateDnsResolverSchema)
        )
        .optional(),
      traffic_mode: z.string().optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      state: z.string().optional(),
      error_message: z.string().optional(),
      bandwidth_tier_gigabits_per_second: z.number().optional(),
    })
    .transform(d => ({
      name: d.name,
      displayName: d.display_name,
      cloudConnection:
        d.azure_cloud_connection !== undefined
          ? {
              $case: 'azureCloudConnection' as const,
              azureCloudConnection: d.azure_cloud_connection,
            }
          : d.aws_cloud_connection !== undefined
            ? {
                $case: 'awsCloudConnection' as const,
                awsCloudConnection: d.aws_cloud_connection,
              }
            : undefined,
      destinations: d.destinations,
      privateDnsResolvers: d.private_dns_resolvers,
      trafficMode: d.traffic_mode,
      createTime: d.create_time,
      updateTime: d.update_time,
      state: d.state,
      errorMessage: d.error_message,
      bandwidthTierGigabitsPerSecond: d.bandwidth_tier_gigabits_per_second,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPrivateNetworkGateway_AwsCloudConnectionSchema: z.ZodType<PrivateNetworkGateway_AwsCloudConnection> =
  z
    .object({
      gateway_subnets: z
        .array(
          z.lazy(
            () =>
              unmarshalPrivateNetworkGateway_AwsCloudConnection_AwsGatewaySubnetSchema
          )
        )
        .optional(),
      cross_account_role: z
        .lazy(
          () =>
            unmarshalPrivateNetworkGateway_AwsCloudConnection_CrossAccountRoleSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
      security_group_ids: z.array(z.string()).optional(),
    })
    .transform(d => ({
      gatewaySubnets: d.gateway_subnets,
      crossAccountRole: d.cross_account_role,
      securityGroupIds: d.security_group_ids,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPrivateNetworkGateway_AwsCloudConnection_AwsGatewaySubnetSchema: z.ZodType<PrivateNetworkGateway_AwsCloudConnection_AwsGatewaySubnet> =
  z
    .object({
      subnet_id: z.string().optional(),
    })
    .transform(d => ({
      subnetId: d.subnet_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPrivateNetworkGateway_AwsCloudConnection_CrossAccountRoleSchema: z.ZodType<PrivateNetworkGateway_AwsCloudConnection_CrossAccountRole> =
  z
    .object({
      role_arn: z.string().optional(),
    })
    .transform(d => ({
      roleArn: d.role_arn,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPrivateNetworkGateway_AzureCloudConnectionSchema: z.ZodType<PrivateNetworkGateway_AzureCloudConnection> =
  z
    .object({
      gateway_subnet: z
        .lazy(
          () =>
            unmarshalPrivateNetworkGateway_AzureCloudConnection_AzureGatewaySubnetSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      gatewaySubnet: d.gateway_subnet,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPrivateNetworkGateway_AzureCloudConnection_AzureGatewaySubnetSchema: z.ZodType<PrivateNetworkGateway_AzureCloudConnection_AzureGatewaySubnet> =
  z
    .object({
      resource_id: z.string().optional(),
    })
    .transform(d => ({
      resourceId: d.resource_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPrivateNetworkGateway_DestinationSchema: z.ZodType<PrivateNetworkGateway_Destination> =
  z
    .object({
      destination_type: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      destinationType: d.destination_type,
      value: d.value,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPrivateNetworkGateway_PrivateDnsResolverSchema: z.ZodType<PrivateNetworkGateway_PrivateDnsResolver> =
  z
    .object({
      resolver_type: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      resolverType: d.resolver_type,
      value: d.value,
    }));

export const unmarshalPrivateNetworkGatewayOperationMetadataSchema: z.ZodType<PrivateNetworkGatewayOperationMetadata> =
  z
    .object({
      operation_type: z.string().optional(),
    })
    .transform(d => ({
      operationType: d.operation_type,
    }));

export const unmarshalReplaceAccountIpAccessListResponseSchema: z.ZodType<ReplaceAccountIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalAccountIpAccessListSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalReplaceIpAccessListResponseSchema: z.ZodType<ReplaceIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalIpAccessListSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalUpdateAccountIpAccessListResponseSchema: z.ZodType<UpdateAccountIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalAccountIpAccessListSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalUpdateIpAccessListResponseSchema: z.ZodType<UpdateIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalIpAccessListSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalVpcEndpointSchema: z.ZodType<VpcEndpoint> = z
  .object({
    vpc_endpoint_id: z.string().optional(),
    account_id: z.string().optional(),
    vpc_endpoint_name: z.string().optional(),
    aws_vpc_endpoint_id: z.string().optional(),
    aws_endpoint_service_id: z.string().optional(),
    use_case: z.string().optional(),
    region: z.string().optional(),
    aws_account_id: z.string().optional(),
    state: z.string().optional(),
    gcp_vpc_endpoint_info: z
      .lazy(() => unmarshalGcpVpcEndpointInfoSchema)
      .optional(),
  })
  .transform(d => ({
    vpcEndpointId: d.vpc_endpoint_id,
    accountId: d.account_id,
    vpcEndpointName: d.vpc_endpoint_name,
    awsVpcEndpointId: d.aws_vpc_endpoint_id,
    awsEndpointServiceId: d.aws_endpoint_service_id,
    useCase: d.use_case,
    region: d.region,
    awsAccountId: d.aws_account_id,
    state: d.state,
    vpcEndpointInfo:
      d.gcp_vpc_endpoint_info !== undefined
        ? {
            $case: 'gcpVpcEndpointInfo' as const,
            gcpVpcEndpointInfo: d.gcp_vpc_endpoint_info,
          }
        : undefined,
  }));

export const unmarshalWorkspaceNetworkOptionSchema: z.ZodType<WorkspaceNetworkOption> =
  z
    .object({
      network_policy_id: z.string().optional(),
      workspace_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      networkPolicyId: d.network_policy_id,
      workspaceId: d.workspace_id,
    }));

export const marshalAccountNetworkPolicySchema: z.ZodType = z
  .object({
    networkPolicyId: z.string().optional(),
    accountId: z.string().optional(),
    egress: z.lazy(() => marshalEgressNetworkPolicySchema).optional(),
    ingress: z.lazy(() => marshalIngressNetworkPolicySchema).optional(),
    ingressDryRun: z.lazy(() => marshalIngressNetworkPolicySchema).optional(),
  })
  .transform(d => ({
    network_policy_id: d.networkPolicyId,
    account_id: d.accountId,
    egress: d.egress,
    ingress: d.ingress,
    ingress_dry_run: d.ingressDryRun,
  }));

export const marshalAwsVpcEndpointInfoSchema: z.ZodType = z
  .object({
    awsVpcEndpointId: z.string().optional(),
    awsEndpointServiceId: z.string().optional(),
    awsAccountId: z.string().optional(),
  })
  .transform(d => ({
    aws_vpc_endpoint_id: d.awsVpcEndpointId,
    aws_endpoint_service_id: d.awsEndpointServiceId,
    aws_account_id: d.awsAccountId,
  }));

export const marshalAzurePrivateEndpointInfoSchema: z.ZodType = z
  .object({
    privateEndpointName: z.string().optional(),
    privateEndpointResourceGuid: z.string().optional(),
    privateEndpointResourceId: z.string().optional(),
    privateLinkServiceId: z.string().optional(),
  })
  .transform(d => ({
    private_endpoint_name: d.privateEndpointName,
    private_endpoint_resource_guid: d.privateEndpointResourceGuid,
    private_endpoint_resource_id: d.privateEndpointResourceId,
    private_link_service_id: d.privateLinkServiceId,
  }));

export const marshalCreateAccountIpAccessListRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
  }));

export const marshalCreateIpAccessListRequestSchema: z.ZodType = z
  .object({
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
  }));

export const marshalCreateNetworkConnectivityConfigurationSchema: z.ZodType = z
  .object({
    networkConnectivityConfigId: z.string().optional(),
    accountId: z.string().optional(),
    name: z.string().optional(),
    region: z.string().optional(),
    egressConfig: z
      .lazy(
        () => marshalCustomerFacingNetworkConnectivityConfigEgressConfigSchema
      )
      .optional(),
    updatedTime: z.bigint().optional(),
    creationTime: z.bigint().optional(),
  })
  .transform(d => ({
    network_connectivity_config_id: d.networkConnectivityConfigId,
    account_id: d.accountId,
    name: d.name,
    region: d.region,
    egress_config: d.egressConfig,
    updated_time: d.updatedTime,
    creation_time: d.creationTime,
  }));

export const marshalCreateNetworkRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    networkName: z.string().optional(),
    vpcId: z.string().optional(),
    subnetIds: z.array(z.string()).optional(),
    securityGroupIds: z.array(z.string()).optional(),
    vpcEndpoints: z.lazy(() => marshalNetworkVpcEndpointsSchema).optional(),
    gcpNetworkInfo: z.lazy(() => marshalGcpNetworkInfoSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    network_name: d.networkName,
    vpc_id: d.vpcId,
    subnet_ids: d.subnetIds,
    security_group_ids: d.securityGroupIds,
    vpc_endpoints: d.vpcEndpoints,
    gcp_network_info: d.gcpNetworkInfo,
  }));

export const marshalCreatePrivateAccessSettingsRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    privateAccessSettingsName: z.string().optional(),
    region: z.string().optional(),
    publicAccessEnabled: z.boolean().optional(),
    privateAccessLevel: z.string().optional(),
    allowedVpcEndpointIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    private_access_settings_name: d.privateAccessSettingsName,
    region: d.region,
    public_access_enabled: d.publicAccessEnabled,
    private_access_level: d.privateAccessLevel,
    allowed_vpc_endpoint_ids: d.allowedVpcEndpointIds,
  }));

export const marshalCreatePrivateEndpointRuleSchema: z.ZodType = z
  .object({
    ruleId: z.string().optional(),
    networkConnectivityConfigId: z.string().optional(),
    connectionState: z.string().optional(),
    domainNames: z.array(z.string()).optional(),
    creationTime: z.bigint().optional(),
    updatedTime: z.bigint().optional(),
    deactivated: z.boolean().optional(),
    deactivatedAt: z.bigint().optional(),
    errorMessage: z.string().optional(),
    resourceId: z.string().optional(),
    groupId: z.string().optional(),
    endpointName: z.string().optional(),
    accountId: z.string().optional(),
    endpointService: z.string().optional(),
    resourceNames: z.array(z.string()).optional(),
    vpcEndpointId: z.string().optional(),
    enabled: z.boolean().optional(),
    endpoint: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('gcpEndpoint'),
          gcpEndpoint: z.lazy(() => marshalGcpEndpointSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    rule_id: d.ruleId,
    network_connectivity_config_id: d.networkConnectivityConfigId,
    connection_state: d.connectionState,
    domain_names: d.domainNames,
    creation_time: d.creationTime,
    updated_time: d.updatedTime,
    deactivated: d.deactivated,
    deactivated_at: d.deactivatedAt,
    error_message: d.errorMessage,
    resource_id: d.resourceId,
    group_id: d.groupId,
    endpoint_name: d.endpointName,
    account_id: d.accountId,
    endpoint_service: d.endpointService,
    resource_names: d.resourceNames,
    vpc_endpoint_id: d.vpcEndpointId,
    enabled: d.enabled,
    ...(d.endpoint?.$case === 'gcpEndpoint' && {
      gcp_endpoint: d.endpoint.gcpEndpoint,
    }),
  }));

export const marshalCreateVpcEndpointRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    vpcEndpointName: z.string().optional(),
    region: z.string().optional(),
    awsVpcEndpointId: z.string().optional(),
    vpcEndpointInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('gcpVpcEndpointInfo'),
          gcpVpcEndpointInfo: z.lazy(() => marshalGcpVpcEndpointInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    vpc_endpoint_name: d.vpcEndpointName,
    region: d.region,
    aws_vpc_endpoint_id: d.awsVpcEndpointId,
    ...(d.vpcEndpointInfo?.$case === 'gcpVpcEndpointInfo' && {
      gcp_vpc_endpoint_info: d.vpcEndpointInfo.gcpVpcEndpointInfo,
    }),
  }));

export const marshalCustomerFacingNetworkConnectivityConfigEgressConfigSchema: z.ZodType =
  z
    .object({
      defaultRules: z
        .lazy(
          () => marshalNetworkConnectivityConfigEgressConfig_DefaultRuleSchema
        )
        .optional(),
      targetRules: z
        .lazy(
          () =>
            marshalCustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleSchema
        )
        .optional(),
    })
    .transform(d => ({
      default_rules: d.defaultRules,
      target_rules: d.targetRules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleSchema: z.ZodType =
  z
    .object({
      azurePrivateEndpointRules: z
        .array(
          z.lazy(
            () => marshalNetworkConnectivityConfigAzurePrivateEndpointRuleSchema
          )
        )
        .optional(),
      awsPrivateEndpointRules: z
        .array(
          z.lazy(
            () => marshalNetworkConnectivityConfigAwsPrivateEndpointRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      azure_private_endpoint_rules: d.azurePrivateEndpointRules,
      aws_private_endpoint_rules: d.awsPrivateEndpointRules,
    }));

export const marshalEgressNetworkPolicySchema: z.ZodType = z
  .object({
    networkAccess: z
      .lazy(() => marshalEgressNetworkPolicy_NetworkAccessPolicySchema)
      .optional(),
  })
  .transform(d => ({
    network_access: d.networkAccess,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicySchema: z.ZodType = z
  .object({
    restrictionMode: z.string().optional(),
    allowedInternetDestinations: z
      .array(
        z.lazy(
          () =>
            marshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema
        )
      )
      .optional(),
    allowedStorageDestinations: z
      .array(
        z.lazy(
          () =>
            marshalEgressNetworkPolicy_NetworkAccessPolicy_StorageDestinationSchema
        )
      )
      .optional(),
    policyEnforcement: z
      .lazy(
        () =>
          marshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema
      )
      .optional(),
    blockedInternetDestinations: z
      .array(
        z.lazy(
          () =>
            marshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema
        )
      )
      .optional(),
    allowedDatabricksDestinations: z
      .array(
        z.lazy(
          () =>
            marshalEgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestinationSchema
        )
      )
      .optional(),
  })
  .transform(d => ({
    restriction_mode: d.restrictionMode,
    allowed_internet_destinations: d.allowedInternetDestinations,
    allowed_storage_destinations: d.allowedStorageDestinations,
    policy_enforcement: d.policyEnforcement,
    blocked_internet_destinations: d.blockedInternetDestinations,
    allowed_databricks_destinations: d.allowedDatabricksDestinations,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestinationSchema: z.ZodType =
  z
    .object({
      workspaceIds: z.array(z.bigint()).optional(),
    })
    .transform(d => ({
      workspace_ids: d.workspaceIds,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema: z.ZodType =
  z
    .object({
      destination: z.string().optional(),
      internetDestinationType: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
      internet_destination_type: d.internetDestinationType,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema: z.ZodType =
  z
    .object({
      enforcementMode: z.string().optional(),
      dryRunModeProductFilter: z.array(z.string()).optional(),
    })
    .transform(d => ({
      enforcement_mode: d.enforcementMode,
      dry_run_mode_product_filter: d.dryRunModeProductFilter,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicy_StorageDestinationSchema: z.ZodType =
  z
    .object({
      bucketName: z.string().optional(),
      region: z.string().optional(),
      storageDestinationType: z.string().optional(),
      azureStorageAccount: z.string().optional(),
      azureStorageService: z.string().optional(),
    })
    .transform(d => ({
      bucket_name: d.bucketName,
      region: d.region,
      storage_destination_type: d.storageDestinationType,
      azure_storage_account: d.azureStorageAccount,
      azure_storage_service: d.azureStorageService,
    }));

export const marshalEndpointSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    endpointId: z.string().optional(),
    accountId: z.string().optional(),
    displayName: z.string().optional(),
    useCase: z.string().optional(),
    region: z.string().optional(),
    state: z.string().optional(),
    endpointInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('azurePrivateEndpointInfo'),
          azurePrivateEndpointInfo: z.lazy(
            () => marshalAzurePrivateEndpointInfoSchema
          ),
        }),
        z.object({
          $case: z.literal('awsVpcEndpointInfo'),
          awsVpcEndpointInfo: z.lazy(() => marshalAwsVpcEndpointInfoSchema),
        }),
        z.object({
          $case: z.literal('gcpPscEndpointInfo'),
          gcpPscEndpointInfo: z.lazy(() => marshalGcpPscEndpointInfoSchema),
        }),
      ])
      .optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    endpoint_id: d.endpointId,
    account_id: d.accountId,
    display_name: d.displayName,
    use_case: d.useCase,
    region: d.region,
    state: d.state,
    ...(d.endpointInfo?.$case === 'azurePrivateEndpointInfo' && {
      azure_private_endpoint_info: d.endpointInfo.azurePrivateEndpointInfo,
    }),
    ...(d.endpointInfo?.$case === 'awsVpcEndpointInfo' && {
      aws_vpc_endpoint_info: d.endpointInfo.awsVpcEndpointInfo,
    }),
    ...(d.endpointInfo?.$case === 'gcpPscEndpointInfo' && {
      gcp_psc_endpoint_info: d.endpointInfo.gcpPscEndpointInfo,
    }),
    create_time: d.createTime,
  }));

export const marshalGcpEndpointSchema: z.ZodType = z
  .object({
    pscEndpointUri: z.string().optional(),
    targetServices: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('serviceAttachment'),
          serviceAttachment: z.string(),
        }),
        z.object({
          $case: z.literal('googleApiEndpoints'),
          googleApiEndpoints: z.lazy(() => marshalGoogleApiEndpointsSchema),
        }),
        z.object({
          $case: z.literal('allVpcScServices'),
          allVpcScServices: z.boolean(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    psc_endpoint_uri: d.pscEndpointUri,
    ...(d.targetServices?.$case === 'serviceAttachment' && {
      service_attachment: d.targetServices.serviceAttachment,
    }),
    ...(d.targetServices?.$case === 'googleApiEndpoints' && {
      google_api_endpoints: d.targetServices.googleApiEndpoints,
    }),
    ...(d.targetServices?.$case === 'allVpcScServices' && {
      all_vpc_sc_services: d.targetServices.allVpcScServices,
    }),
  }));

export const marshalGcpNetworkInfoSchema: z.ZodType = z
  .object({
    networkProjectId: z.string().optional(),
    vpcId: z.string().optional(),
    subnetId: z.string().optional(),
    subnetRegion: z.string().optional(),
    podIpRangeName: z.string().optional(),
    serviceIpRangeName: z.string().optional(),
  })
  .transform(d => ({
    network_project_id: d.networkProjectId,
    vpc_id: d.vpcId,
    subnet_id: d.subnetId,
    subnet_region: d.subnetRegion,
    pod_ip_range_name: d.podIpRangeName,
    service_ip_range_name: d.serviceIpRangeName,
  }));

export const marshalGcpPscEndpointInfoSchema: z.ZodType = z
  .object({
    pscConnectionId: z.string().optional(),
    projectId: z.string().optional(),
    pscEndpoint: z.string().optional(),
    endpointRegion: z.string().optional(),
    serviceAttachmentId: z.string().optional(),
  })
  .transform(d => ({
    psc_connection_id: d.pscConnectionId,
    project_id: d.projectId,
    psc_endpoint: d.pscEndpoint,
    endpoint_region: d.endpointRegion,
    service_attachment_id: d.serviceAttachmentId,
  }));

export const marshalGcpVpcEndpointInfoSchema: z.ZodType = z
  .object({
    pscConnectionId: z.string().optional(),
    projectId: z.string().optional(),
    pscEndpointName: z.string().optional(),
    endpointRegion: z.string().optional(),
    serviceAttachmentId: z.string().optional(),
  })
  .transform(d => ({
    psc_connection_id: d.pscConnectionId,
    project_id: d.projectId,
    psc_endpoint_name: d.pscEndpointName,
    endpoint_region: d.endpointRegion,
    service_attachment_id: d.serviceAttachmentId,
  }));

export const marshalGoogleApiEndpointsSchema: z.ZodType = z
  .object({
    endpoints: z.array(z.string()).optional(),
  })
  .transform(d => ({
    endpoints: d.endpoints,
  }));

export const marshalIngressNetworkPolicySchema: z.ZodType = z
  .object({
    publicAccess: z
      .lazy(() => marshalIngressNetworkPolicy_PublicAccessSchema)
      .optional(),
    privateAccess: z
      .lazy(() => marshalIngressNetworkPolicy_PrivateAccessSchema)
      .optional(),
    crossWorkspaceAccess: z
      .lazy(() => marshalIngressNetworkPolicy_CrossWorkspaceAccessSchema)
      .optional(),
  })
  .transform(d => ({
    public_access: d.publicAccess,
    private_access: d.privateAccess,
    cross_workspace_access: d.crossWorkspaceAccess,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AccountApiDestinationSchema: z.ZodType =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scopeQualifier: z.string().optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scope_qualifier: d.scopeQualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AccountDatabricksOneDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AccountUiDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AppsRuntimeDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AuthenticationSchema: z.ZodType = z
  .object({
    identityType: z.string().optional(),
    identities: z
      .array(
        z.lazy(() => marshalIngressNetworkPolicy_AuthenticationIdentitySchema)
      )
      .optional(),
  })
  .transform(d => ({
    identity_type: d.identityType,
    identities: d.identities,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AuthenticationIdentitySchema: z.ZodType =
  z
    .object({
      principalType: z.string().optional(),
      principalId: z.bigint().optional(),
    })
    .transform(d => ({
      principal_type: d.principalType,
      principal_id: d.principalId,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_CrossWorkspaceAccessSchema: z.ZodType =
  z
    .object({
      restrictionMode: z.string().optional(),
      denyRules: z
        .array(
          z.lazy(
            () => marshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
      allowRules: z
        .array(
          z.lazy(
            () => marshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      restriction_mode: d.restrictionMode,
      deny_rules: d.denyRules,
      allow_rules: d.allowRules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema: z.ZodType =
  z
    .object({
      origin: z
        .lazy(
          () => marshalIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema
        )
        .optional(),
      destination: z
        .lazy(() => marshalIngressNetworkPolicy_RequestDestinationSchema)
        .optional(),
      authentication: z
        .lazy(() => marshalIngressNetworkPolicy_AuthenticationSchema)
        .optional(),
      label: z.string().optional(),
    })
    .transform(d => ({
      origin: d.origin,
      destination: d.destination,
      authentication: d.authentication,
      label: d.label,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema: z.ZodType =
  z
    .object({
      source: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('allSourceWorkspaces'),
            allSourceWorkspaces: z.boolean(),
          }),
          z.object({
            $case: z.literal('selectedWorkspaces'),
            selectedWorkspaces: z.lazy(
              () => marshalIngressNetworkPolicy_WorkspaceIdListSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.source?.$case === 'allSourceWorkspaces' && {
        all_source_workspaces: d.source.allSourceWorkspaces,
      }),
      ...(d.source?.$case === 'selectedWorkspaces' && {
        selected_workspaces: d.source.selectedWorkspaces,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_EndpointsSchema: z.ZodType = z
  .object({
    endpointIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    endpoint_ids: d.endpointIds,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_IpRangesSchema: z.ZodType = z
  .object({
    ipRanges: z.array(z.string()).optional(),
  })
  .transform(d => ({
    ip_ranges: d.ipRanges,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_LakebaseRuntimeDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PrivateAccessSchema: z.ZodType = z
  .object({
    restrictionMode: z.string().optional(),
    denyRules: z
      .array(z.lazy(() => marshalIngressNetworkPolicy_PrivateIngressRuleSchema))
      .optional(),
    allowRules: z
      .array(z.lazy(() => marshalIngressNetworkPolicy_PrivateIngressRuleSchema))
      .optional(),
  })
  .transform(d => ({
    restriction_mode: d.restrictionMode,
    deny_rules: d.denyRules,
    allow_rules: d.allowRules,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PrivateIngressRuleSchema: z.ZodType = z
  .object({
    origin: z
      .lazy(() => marshalIngressNetworkPolicy_PrivateRequestOriginSchema)
      .optional(),
    destination: z
      .lazy(() => marshalIngressNetworkPolicy_RequestDestinationSchema)
      .optional(),
    authentication: z
      .lazy(() => marshalIngressNetworkPolicy_AuthenticationSchema)
      .optional(),
    label: z.string().optional(),
  })
  .transform(d => ({
    origin: d.origin,
    destination: d.destination,
    authentication: d.authentication,
    label: d.label,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PrivateRequestOriginSchema: z.ZodType =
  z
    .object({
      source: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('endpoints'),
            endpoints: z.lazy(
              () => marshalIngressNetworkPolicy_EndpointsSchema
            ),
          }),
          z.object({
            $case: z.literal('allRegisteredEndpoints'),
            allRegisteredEndpoints: z.boolean(),
          }),
          z.object({
            $case: z.literal('azureWorkspacePrivateLink'),
            azureWorkspacePrivateLink: z.boolean(),
          }),
          z.object({
            $case: z.literal('allPrivateAccess'),
            allPrivateAccess: z.boolean(),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.source?.$case === 'endpoints' && {endpoints: d.source.endpoints}),
      ...(d.source?.$case === 'allRegisteredEndpoints' && {
        all_registered_endpoints: d.source.allRegisteredEndpoints,
      }),
      ...(d.source?.$case === 'azureWorkspacePrivateLink' && {
        azure_workspace_private_link: d.source.azureWorkspacePrivateLink,
      }),
      ...(d.source?.$case === 'allPrivateAccess' && {
        all_private_access: d.source.allPrivateAccess,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PublicAccessSchema: z.ZodType = z
  .object({
    restrictionMode: z.string().optional(),
    denyRules: z
      .array(z.lazy(() => marshalIngressNetworkPolicy_PublicIngressRuleSchema))
      .optional(),
    allowRules: z
      .array(z.lazy(() => marshalIngressNetworkPolicy_PublicIngressRuleSchema))
      .optional(),
  })
  .transform(d => ({
    restriction_mode: d.restrictionMode,
    deny_rules: d.denyRules,
    allow_rules: d.allowRules,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PublicIngressRuleSchema: z.ZodType = z
  .object({
    origin: z
      .lazy(() => marshalIngressNetworkPolicy_PublicRequestOriginSchema)
      .optional(),
    destination: z
      .lazy(() => marshalIngressNetworkPolicy_RequestDestinationSchema)
      .optional(),
    authentication: z
      .lazy(() => marshalIngressNetworkPolicy_AuthenticationSchema)
      .optional(),
    label: z.string().optional(),
  })
  .transform(d => ({
    origin: d.origin,
    destination: d.destination,
    authentication: d.authentication,
    label: d.label,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PublicRequestOriginSchema: z.ZodType =
  z
    .object({
      source: z
        .discriminatedUnion('$case', [
          z.object({$case: z.literal('allIpRanges'), allIpRanges: z.boolean()}),
          z.object({
            $case: z.literal('includedIpRanges'),
            includedIpRanges: z.lazy(
              () => marshalIngressNetworkPolicy_IpRangesSchema
            ),
          }),
          z.object({
            $case: z.literal('excludedIpRanges'),
            excludedIpRanges: z.lazy(
              () => marshalIngressNetworkPolicy_IpRangesSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.source?.$case === 'allIpRanges' && {
        all_ip_ranges: d.source.allIpRanges,
      }),
      ...(d.source?.$case === 'includedIpRanges' && {
        included_ip_ranges: d.source.includedIpRanges,
      }),
      ...(d.source?.$case === 'excludedIpRanges' && {
        excluded_ip_ranges: d.source.excludedIpRanges,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_RequestDestinationSchema: z.ZodType = z
  .object({
    allDestinations: z.boolean().optional(),
    workspaceUi: z
      .lazy(() => marshalIngressNetworkPolicy_WorkspaceUiDestinationSchema)
      .optional(),
    workspaceApi: z
      .lazy(() => marshalIngressNetworkPolicy_WorkspaceApiDestinationSchema)
      .optional(),
    appsRuntime: z
      .lazy(() => marshalIngressNetworkPolicy_AppsRuntimeDestinationSchema)
      .optional(),
    lakebaseRuntime: z
      .lazy(() => marshalIngressNetworkPolicy_LakebaseRuntimeDestinationSchema)
      .optional(),
    accountUi: z
      .lazy(() => marshalIngressNetworkPolicy_AccountUiDestinationSchema)
      .optional(),
    accountApi: z
      .lazy(() => marshalIngressNetworkPolicy_AccountApiDestinationSchema)
      .optional(),
    accountDatabricksOne: z
      .lazy(
        () => marshalIngressNetworkPolicy_AccountDatabricksOneDestinationSchema
      )
      .optional(),
  })
  .transform(d => ({
    all_destinations: d.allDestinations,
    workspace_ui: d.workspaceUi,
    workspace_api: d.workspaceApi,
    apps_runtime: d.appsRuntime,
    lakebase_runtime: d.lakebaseRuntime,
    account_ui: d.accountUi,
    account_api: d.accountApi,
    account_databricks_one: d.accountDatabricksOne,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_WorkspaceApiDestinationSchema: z.ZodType =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scopeQualifier: z.string().optional(),
      excludedScopes: z.array(z.string()).optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scope_qualifier: d.scopeQualifier,
      excluded_scopes: d.excludedScopes,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_WorkspaceIdListSchema: z.ZodType = z
  .object({
    workspaceIds: z.array(z.bigint()).optional(),
  })
  .transform(d => ({
    workspace_ids: d.workspaceIds,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_WorkspaceUiDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

export const marshalNetworkConnectivityConfigSchema: z.ZodType = z
  .object({
    networkConnectivityConfigId: z.string().optional(),
    accountId: z.string().optional(),
    name: z.string().optional(),
    region: z.string().optional(),
    egressConfig: z
      .lazy(
        () => marshalCustomerFacingNetworkConnectivityConfigEgressConfigSchema
      )
      .optional(),
    updatedTime: z.bigint().optional(),
    creationTime: z.bigint().optional(),
    billingWorkspaceId: z.bigint().optional(),
  })
  .transform(d => ({
    network_connectivity_config_id: d.networkConnectivityConfigId,
    account_id: d.accountId,
    name: d.name,
    region: d.region,
    egress_config: d.egressConfig,
    updated_time: d.updatedTime,
    creation_time: d.creationTime,
    billing_workspace_id: d.billingWorkspaceId,
  }));

export const marshalNetworkConnectivityConfigAwsPrivateEndpointRuleSchema: z.ZodType =
  z
    .object({
      ruleId: z.string().optional(),
      networkConnectivityConfigId: z.string().optional(),
      accountId: z.string().optional(),
      endpointService: z.string().optional(),
      domainNames: z.array(z.string()).optional(),
      resourceNames: z.array(z.string()).optional(),
      vpcEndpointId: z.string().optional(),
      connectionState: z.string().optional(),
      creationTime: z.bigint().optional(),
      updatedTime: z.bigint().optional(),
      deactivated: z.boolean().optional(),
      deactivatedAt: z.bigint().optional(),
      enabled: z.boolean().optional(),
      errorMessage: z.string().optional(),
    })
    .transform(d => ({
      rule_id: d.ruleId,
      network_connectivity_config_id: d.networkConnectivityConfigId,
      account_id: d.accountId,
      endpoint_service: d.endpointService,
      domain_names: d.domainNames,
      resource_names: d.resourceNames,
      vpc_endpoint_id: d.vpcEndpointId,
      connection_state: d.connectionState,
      creation_time: d.creationTime,
      updated_time: d.updatedTime,
      deactivated: d.deactivated,
      deactivated_at: d.deactivatedAt,
      enabled: d.enabled,
      error_message: d.errorMessage,
    }));

export const marshalNetworkConnectivityConfigAzurePrivateEndpointRuleSchema: z.ZodType =
  z
    .object({
      ruleId: z.string().optional(),
      networkConnectivityConfigId: z.string().optional(),
      resourceId: z.string().optional(),
      groupId: z.string().optional(),
      endpointName: z.string().optional(),
      connectionState: z.string().optional(),
      creationTime: z.bigint().optional(),
      updatedTime: z.bigint().optional(),
      deactivated: z.boolean().optional(),
      deactivatedAt: z.bigint().optional(),
      domainNames: z.array(z.string()).optional(),
      errorMessage: z.string().optional(),
    })
    .transform(d => ({
      rule_id: d.ruleId,
      network_connectivity_config_id: d.networkConnectivityConfigId,
      resource_id: d.resourceId,
      group_id: d.groupId,
      endpoint_name: d.endpointName,
      connection_state: d.connectionState,
      creation_time: d.creationTime,
      updated_time: d.updatedTime,
      deactivated: d.deactivated,
      deactivated_at: d.deactivatedAt,
      domain_names: d.domainNames,
      error_message: d.errorMessage,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalNetworkConnectivityConfigEgressConfig_DefaultRuleSchema: z.ZodType =
  z
    .object({
      azureServiceEndpointRule: z
        .lazy(
          () =>
            marshalNetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleSchema
        )
        .optional(),
      awsStableIpRule: z
        .lazy(
          () =>
            marshalNetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleSchema
        )
        .optional(),
    })
    .transform(d => ({
      azure_service_endpoint_rule: d.azureServiceEndpointRule,
      aws_stable_ip_rule: d.awsStableIpRule,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalNetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleSchema: z.ZodType =
  z
    .object({
      cidrBlocks: z.array(z.string()).optional(),
    })
    .transform(d => ({
      cidr_blocks: d.cidrBlocks,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalNetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleSchema: z.ZodType =
  z
    .object({
      targetRegion: z.string().optional(),
      targetServices: z.array(z.string()).optional(),
      subnets: z.array(z.string()).optional(),
    })
    .transform(d => ({
      target_region: d.targetRegion,
      target_services: d.targetServices,
      subnets: d.subnets,
    }));

export const marshalNetworkVpcEndpointsSchema: z.ZodType = z
  .object({
    restApi: z.array(z.string()).optional(),
    dataplaneRelay: z.array(z.string()).optional(),
  })
  .transform(d => ({
    rest_api: d.restApi,
    dataplane_relay: d.dataplaneRelay,
  }));

export const marshalPrivateAccessSettingsSchema: z.ZodType = z
  .object({
    privateAccessSettingsId: z.string().optional(),
    accountId: z.string().optional(),
    privateAccessSettingsName: z.string().optional(),
    region: z.string().optional(),
    publicAccessEnabled: z.boolean().optional(),
    privateAccessLevel: z.string().optional(),
    allowedVpcEndpointIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    private_access_settings_id: d.privateAccessSettingsId,
    account_id: d.accountId,
    private_access_settings_name: d.privateAccessSettingsName,
    region: d.region,
    public_access_enabled: d.publicAccessEnabled,
    private_access_level: d.privateAccessLevel,
    allowed_vpc_endpoint_ids: d.allowedVpcEndpointIds,
  }));

export const marshalPrivateNetworkGatewaySchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    displayName: z.string().optional(),
    cloudConnection: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('azureCloudConnection'),
          azureCloudConnection: z.lazy(
            () => marshalPrivateNetworkGateway_AzureCloudConnectionSchema
          ),
        }),
        z.object({
          $case: z.literal('awsCloudConnection'),
          awsCloudConnection: z.lazy(
            () => marshalPrivateNetworkGateway_AwsCloudConnectionSchema
          ),
        }),
      ])
      .optional(),
    destinations: z
      .array(z.lazy(() => marshalPrivateNetworkGateway_DestinationSchema))
      .optional(),
    privateDnsResolvers: z
      .array(
        z.lazy(() => marshalPrivateNetworkGateway_PrivateDnsResolverSchema)
      )
      .optional(),
    trafficMode: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    state: z.string().optional(),
    errorMessage: z.string().optional(),
    bandwidthTierGigabitsPerSecond: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    display_name: d.displayName,
    ...(d.cloudConnection?.$case === 'azureCloudConnection' && {
      azure_cloud_connection: d.cloudConnection.azureCloudConnection,
    }),
    ...(d.cloudConnection?.$case === 'awsCloudConnection' && {
      aws_cloud_connection: d.cloudConnection.awsCloudConnection,
    }),
    destinations: d.destinations,
    private_dns_resolvers: d.privateDnsResolvers,
    traffic_mode: d.trafficMode,
    create_time: d.createTime,
    update_time: d.updateTime,
    state: d.state,
    error_message: d.errorMessage,
    bandwidth_tier_gigabits_per_second: d.bandwidthTierGigabitsPerSecond,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPrivateNetworkGateway_AwsCloudConnectionSchema: z.ZodType =
  z
    .object({
      gatewaySubnets: z
        .array(
          z.lazy(
            () =>
              marshalPrivateNetworkGateway_AwsCloudConnection_AwsGatewaySubnetSchema
          )
        )
        .optional(),
      crossAccountRole: z
        .lazy(
          () =>
            marshalPrivateNetworkGateway_AwsCloudConnection_CrossAccountRoleSchema
        )
        .optional(),
      securityGroupIds: z.array(z.string()).optional(),
    })
    .transform(d => ({
      gateway_subnets: d.gatewaySubnets,
      cross_account_role: d.crossAccountRole,
      security_group_ids: d.securityGroupIds,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPrivateNetworkGateway_AwsCloudConnection_AwsGatewaySubnetSchema: z.ZodType =
  z
    .object({
      subnetId: z.string().optional(),
    })
    .transform(d => ({
      subnet_id: d.subnetId,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPrivateNetworkGateway_AwsCloudConnection_CrossAccountRoleSchema: z.ZodType =
  z
    .object({
      roleArn: z.string().optional(),
    })
    .transform(d => ({
      role_arn: d.roleArn,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPrivateNetworkGateway_AzureCloudConnectionSchema: z.ZodType =
  z
    .object({
      gatewaySubnet: z
        .lazy(
          () =>
            marshalPrivateNetworkGateway_AzureCloudConnection_AzureGatewaySubnetSchema
        )
        .optional(),
    })
    .transform(d => ({
      gateway_subnet: d.gatewaySubnet,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPrivateNetworkGateway_AzureCloudConnection_AzureGatewaySubnetSchema: z.ZodType =
  z
    .object({
      resourceId: z.string().optional(),
    })
    .transform(d => ({
      resource_id: d.resourceId,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPrivateNetworkGateway_DestinationSchema: z.ZodType = z
  .object({
    destinationType: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    destination_type: d.destinationType,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPrivateNetworkGateway_PrivateDnsResolverSchema: z.ZodType =
  z
    .object({
      resolverType: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      resolver_type: d.resolverType,
      value: d.value,
    }));

export const marshalReplaceAccountIpAccessListRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    list_id: d.listId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
    enabled: d.enabled,
  }));

export const marshalReplaceIpAccessListRequestSchema: z.ZodType = z
  .object({
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    list_id: d.listId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
    enabled: d.enabled,
  }));

export const marshalUpdateAccountIpAccessListRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    list_id: d.listId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
    enabled: d.enabled,
  }));

export const marshalUpdateIpAccessListRequestSchema: z.ZodType = z
  .object({
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    list_id: d.listId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
    enabled: d.enabled,
  }));

export const marshalUpdatePrivateEndpointRuleSchema: z.ZodType = z
  .object({
    ruleId: z.string().optional(),
    networkConnectivityConfigId: z.string().optional(),
    connectionState: z.string().optional(),
    domainNames: z.array(z.string()).optional(),
    creationTime: z.bigint().optional(),
    updatedTime: z.bigint().optional(),
    deactivated: z.boolean().optional(),
    deactivatedAt: z.bigint().optional(),
    errorMessage: z.string().optional(),
    resourceId: z.string().optional(),
    groupId: z.string().optional(),
    endpointName: z.string().optional(),
    accountId: z.string().optional(),
    endpointService: z.string().optional(),
    resourceNames: z.array(z.string()).optional(),
    vpcEndpointId: z.string().optional(),
    enabled: z.boolean().optional(),
    endpoint: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('gcpEndpoint'),
          gcpEndpoint: z.lazy(() => marshalGcpEndpointSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    rule_id: d.ruleId,
    network_connectivity_config_id: d.networkConnectivityConfigId,
    connection_state: d.connectionState,
    domain_names: d.domainNames,
    creation_time: d.creationTime,
    updated_time: d.updatedTime,
    deactivated: d.deactivated,
    deactivated_at: d.deactivatedAt,
    error_message: d.errorMessage,
    resource_id: d.resourceId,
    group_id: d.groupId,
    endpoint_name: d.endpointName,
    account_id: d.accountId,
    endpoint_service: d.endpointService,
    resource_names: d.resourceNames,
    vpc_endpoint_id: d.vpcEndpointId,
    enabled: d.enabled,
    ...(d.endpoint?.$case === 'gcpEndpoint' && {
      gcp_endpoint: d.endpoint.gcpEndpoint,
    }),
  }));

export const marshalWorkspaceNetworkOptionSchema: z.ZodType = z
  .object({
    networkPolicyId: z.string().optional(),
    workspaceId: z.bigint().optional(),
  })
  .transform(d => ({
    network_policy_id: d.networkPolicyId,
    workspace_id: d.workspaceId,
  }));

const customerFacingNetworkConnectivityConfigEgressConfigFieldMaskSchema: FieldMaskSchema =
  {
    defaultRules: {
      wire: 'default_rules',
      children: () =>
        networkConnectivityConfigEgressConfig_DefaultRuleFieldMaskSchema,
    },
    targetRules: {
      wire: 'target_rules',
      children: () =>
        customerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const customerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleFieldMaskSchema: FieldMaskSchema =
  {
    awsPrivateEndpointRules: {wire: 'aws_private_endpoint_rules'},
    azurePrivateEndpointRules: {wire: 'azure_private_endpoint_rules'},
  };

const gcpEndpointFieldMaskSchema: FieldMaskSchema = {
  allVpcScServices: {wire: 'all_vpc_sc_services'},
  googleApiEndpoints: {
    wire: 'google_api_endpoints',
    children: () => googleApiEndpointsFieldMaskSchema,
  },
  pscEndpointUri: {wire: 'psc_endpoint_uri'},
  serviceAttachment: {wire: 'service_attachment'},
};

const googleApiEndpointsFieldMaskSchema: FieldMaskSchema = {
  endpoints: {wire: 'endpoints'},
};

const networkConnectivityConfigFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  billingWorkspaceId: {wire: 'billing_workspace_id'},
  creationTime: {wire: 'creation_time'},
  egressConfig: {
    wire: 'egress_config',
    children: () =>
      customerFacingNetworkConnectivityConfigEgressConfigFieldMaskSchema,
  },
  name: {wire: 'name'},
  networkConnectivityConfigId: {wire: 'network_connectivity_config_id'},
  region: {wire: 'region'},
  updatedTime: {wire: 'updated_time'},
};

export function networkConnectivityConfigFieldMask(
  ...paths: string[]
): FieldMask<NetworkConnectivityConfig> {
  return FieldMask.build<NetworkConnectivityConfig>(
    paths,
    networkConnectivityConfigFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const networkConnectivityConfigEgressConfig_DefaultRuleFieldMaskSchema: FieldMaskSchema =
  {
    awsStableIpRule: {
      wire: 'aws_stable_ip_rule',
      children: () =>
        networkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleFieldMaskSchema,
    },
    azureServiceEndpointRule: {
      wire: 'azure_service_endpoint_rule',
      children: () =>
        networkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const networkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleFieldMaskSchema: FieldMaskSchema =
  {
    cidrBlocks: {wire: 'cidr_blocks'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const networkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleFieldMaskSchema: FieldMaskSchema =
  {
    subnets: {wire: 'subnets'},
    targetRegion: {wire: 'target_region'},
    targetServices: {wire: 'target_services'},
  };

const privateNetworkGatewayFieldMaskSchema: FieldMaskSchema = {
  awsCloudConnection: {
    wire: 'aws_cloud_connection',
    children: () => privateNetworkGateway_AwsCloudConnectionFieldMaskSchema,
  },
  azureCloudConnection: {
    wire: 'azure_cloud_connection',
    children: () => privateNetworkGateway_AzureCloudConnectionFieldMaskSchema,
  },
  bandwidthTierGigabitsPerSecond: {wire: 'bandwidth_tier_gigabits_per_second'},
  createTime: {wire: 'create_time'},
  destinations: {wire: 'destinations'},
  displayName: {wire: 'display_name'},
  errorMessage: {wire: 'error_message'},
  name: {wire: 'name'},
  privateDnsResolvers: {wire: 'private_dns_resolvers'},
  state: {wire: 'state'},
  trafficMode: {wire: 'traffic_mode'},
  updateTime: {wire: 'update_time'},
};

export function privateNetworkGatewayFieldMask(
  ...paths: string[]
): FieldMask<PrivateNetworkGateway> {
  return FieldMask.build<PrivateNetworkGateway>(
    paths,
    privateNetworkGatewayFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const privateNetworkGateway_AwsCloudConnectionFieldMaskSchema: FieldMaskSchema =
  {
    crossAccountRole: {
      wire: 'cross_account_role',
      children: () =>
        privateNetworkGateway_AwsCloudConnection_CrossAccountRoleFieldMaskSchema,
    },
    gatewaySubnets: {wire: 'gateway_subnets'},
    securityGroupIds: {wire: 'security_group_ids'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const privateNetworkGateway_AwsCloudConnection_CrossAccountRoleFieldMaskSchema: FieldMaskSchema =
  {
    roleArn: {wire: 'role_arn'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const privateNetworkGateway_AzureCloudConnectionFieldMaskSchema: FieldMaskSchema =
  {
    gatewaySubnet: {
      wire: 'gateway_subnet',
      children: () =>
        privateNetworkGateway_AzureCloudConnection_AzureGatewaySubnetFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const privateNetworkGateway_AzureCloudConnection_AzureGatewaySubnetFieldMaskSchema: FieldMaskSchema =
  {
    resourceId: {wire: 'resource_id'},
  };

const updatePrivateEndpointRuleFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  connectionState: {wire: 'connection_state'},
  creationTime: {wire: 'creation_time'},
  deactivated: {wire: 'deactivated'},
  deactivatedAt: {wire: 'deactivated_at'},
  domainNames: {wire: 'domain_names'},
  enabled: {wire: 'enabled'},
  endpointName: {wire: 'endpoint_name'},
  endpointService: {wire: 'endpoint_service'},
  errorMessage: {wire: 'error_message'},
  gcpEndpoint: {
    wire: 'gcp_endpoint',
    children: () => gcpEndpointFieldMaskSchema,
  },
  groupId: {wire: 'group_id'},
  networkConnectivityConfigId: {wire: 'network_connectivity_config_id'},
  resourceId: {wire: 'resource_id'},
  resourceNames: {wire: 'resource_names'},
  ruleId: {wire: 'rule_id'},
  updatedTime: {wire: 'updated_time'},
  vpcEndpointId: {wire: 'vpc_endpoint_id'},
};

export function updatePrivateEndpointRuleFieldMask(
  ...paths: string[]
): FieldMask<UpdatePrivateEndpointRule> {
  return FieldMask.build<UpdatePrivateEndpointRule>(
    paths,
    updatePrivateEndpointRuleFieldMaskSchema
  );
}
