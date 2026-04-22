// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** The compute endpoint type. Either `read_write` or `read_only`. */
export enum EndpointType {
  /** Default value, not used */
  ENDPOINT_TYPE_UNSPECIFIED = 'ENDPOINT_TYPE_UNSPECIFIED',
  ENDPOINT_TYPE_READ_WRITE = 'ENDPOINT_TYPE_READ_WRITE',
  ENDPOINT_TYPE_READ_ONLY = 'ENDPOINT_TYPE_READ_ONLY',
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

/** Copied from database_table_statuses.proto to decouple SDK packages. */
export enum ProvisioningPhase {
  /** The default phase. It should not be reported by any synced tables. */
  PROVISIONING_PHASE_UNSPECIFIED = 'PROVISIONING_PHASE_UNSPECIFIED',
  /** Ingestion phase of the synced table. This is when the synced table is ingesting data from the delta table. */
  PROVISIONING_PHASE_MAIN = 'PROVISIONING_PHASE_MAIN',
  /** Index scan phase of the synced table. This is when the synced table is creating indexes on the ingested data. */
  PROVISIONING_PHASE_INDEX_SCAN = 'PROVISIONING_PHASE_INDEX_SCAN',
  /** Index sort phase of the synced table. This is when the synced table is creating indexes on the ingested data. */
  PROVISIONING_PHASE_INDEX_SORT = 'PROVISIONING_PHASE_INDEX_SORT',
}

/**
 * The state of a synced table.
 * Copied from database_table_statuses.proto to decouple SDK packages.
 */
export enum SyncedTableState {
  /** The default state. It should not be reported by any synced tables. */
  SYNCED_TABLE_STATE_UNSPECIFIED = 'SYNCED_TABLE_STATE_UNSPECIFIED',
  /**
   * The synced table has just been created and resources are being provisioned. This is also the
   * catch-all state if there is not a more suitable state to report for the synced table.
   */
  SYNCED_TABLE_PROVISIONING = 'SYNCED_TABLE_PROVISIONING',
  /** The synced table is provisioning resources for the data synchronization pipeline. */
  SYNCED_TABLE_PROVISIONING_PIPELINE_RESOURCES = 'SYNCED_TABLE_PROVISIONING_PIPELINE_RESOURCES',
  /** The synced table is executing the initial data synchronization. */
  SYNCED_TABLE_PROVISIONING_INITIAL_SNAPSHOT = 'SYNCED_TABLE_PROVISIONING_INITIAL_SNAPSHOT',
  /** The synced table is ready to serve data. */
  SYNCED_TABLE_ONLINE = 'SYNCED_TABLE_ONLINE',
  /**
   * The synced table is ready to serve data and is continuously updating. Only shown for synced
   * tables using the "Continuous" sync mode.
   */
  SYNCED_TABLE_ONLINE_CONTINUOUS_UPDATE = 'SYNCED_TABLE_ONLINE_CONTINUOUS_UPDATE',
  /**
   * The synced table is ready to serve data and an active update is in progress. Only shown for
   * synced tables using the "Triggered" sync mode.
   */
  SYNCED_TABLE_ONLINE_TRIGGERED_UPDATE = 'SYNCED_TABLE_ONLINE_TRIGGERED_UPDATE',
  /**
   * The synced table is ready to serve data and there are no active updates. Only shown for synced
   * tables using the "Triggered" sync mode.
   */
  SYNCED_TABLE_ONLINE_NO_PENDING_UPDATE = 'SYNCED_TABLE_ONLINE_NO_PENDING_UPDATE',
  /** The synced table has encountered an internal error and is not available for serving. */
  SYNCED_TABLE_OFFLINE = 'SYNCED_TABLE_OFFLINE',
  /**
   * The synced table is not available for serving because the data synchronization pipeline has
   * failed. Please review the pipeline event logs to troubleshoot.
   */
  SYNCED_TABLE_OFFLINE_FAILED = 'SYNCED_TABLE_OFFLINE_FAILED',
  /**
   * The data synchronization pipeline has encountered an error but the synced table is still
   * available for serving (potentially stale) data. Please review the pipeline event logs to
   * troubleshoot.
   */
  SYNCED_TABLE_ONLINE_PIPELINE_FAILED = 'SYNCED_TABLE_ONLINE_PIPELINE_FAILED',
  /**
   * The synced table is available for serving, and is provisioning resources for a newly started
   * data synchronization pipeline.
   */
  SYNCED_TABLE_ONLINE_UPDATING_PIPELINE_RESOURCES = 'SYNCED_TABLE_ONLINE_UPDATING_PIPELINE_RESOURCES',
}

/** The state of the branch. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum BranchStatus_State {
  /** Default value, not used. */
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  /** The branch is being created but is not yet available for querying. */
  INIT = 'INIT',
  /** The branch is being imported and is not yet available for querying. */
  IMPORTING = 'IMPORTING',
  /** The branch is being reset to a specific point in time or LSN and is not yet available for querying. */
  RESETTING = 'RESETTING',
  /** The branch is fully operational and ready for querying. */
  READY = 'READY',
  /** The branch is stored in cost-effective archival storage. Expect slow query response times. */
  ARCHIVED = 'ARCHIVED',
  /** The branch is deleted and is not available for querying, but can be undeleted. */
  DELETED = 'DELETED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ComputeInstance_ComputeState {
  COMPUTE_STATE_UNSPECIFIED = 'COMPUTE_STATE_UNSPECIFIED',
  INIT = 'INIT',
  IDLE = 'IDLE',
  ACTIVE = 'ACTIVE',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ComputeInstance_ComputeType {
  COMPUTE_TYPE_UNSPECIFIED = 'COMPUTE_TYPE_UNSPECIFIED',
  /**
   * Indicates the compute is serving read-write traffic as part of a read-write endpoint. There will only be 1
   * Read-Write compute per endpoint.
   */
  READ_WRITE = 'READ_WRITE',
  /**
   * Indicates the compute is serving read-only traffic; either as part of a read-only endpoint, or as a read-replica
   * of a read-write endpoint. There can be multiple read-only computes per endpoint.
   */
  READ_ONLY = 'READ_ONLY',
  /**
   * Indicates the compute is a hot standby for a read-write endpoint, ready to be promoted to read-write if needed.
   * There can be multiple hot standbys per read-write endpoint and they do not serve traffic unless promoted.
   */
  HOT_STANDBY = 'HOT_STANDBY',
}

/** The state of the compute endpoint. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EndpointStatus_State {
  /** Default value, not used */
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  INIT = 'INIT',
  ACTIVE = 'ACTIVE',
  IDLE = 'IDLE',
  DEGRADED = 'DEGRADED',
}

/**
 * Release channel of the underlying pipeline's runtime.
 * PREVIEW provides early access to the latest features but may be less stable.
 * Some source table configurations (e.g., read-time CDF) require PREVIEW.
 * Defaults to CURRENT if not specified.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum NewPipelineSpec_PipelineChannel {
  /** Default value; the pipeline channel is not specified and defaults to CURRENT. */
  PIPELINE_CHANNEL_UNSPECIFIED = 'PIPELINE_CHANNEL_UNSPECIFIED',
  /** Uses the stable, generally available runtime. */
  CURRENT = 'CURRENT',
  /** Uses the latest preview runtime. Required for Auto CDF (read-time CDF) sources. */
  PREVIEW = 'PREVIEW',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ProvisioningInfo_State {
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  PROVISIONING = 'PROVISIONING',
  ACTIVE = 'ACTIVE',
  FAILED = 'FAILED',
  DELETING = 'DELETING',
  UPDATING = 'UPDATING',
  DEGRADED = 'DEGRADED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum RequestedClaims_PermissionSet {
  PERMISSION_SET_UNSPECIFIED = 'PERMISSION_SET_UNSPECIFIED',
  READ_ONLY = 'READ_ONLY',
}

/** How the role is authenticated when connecting to Postgres. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum Role_AuthMethod {
  AUTH_METHOD_UNSPECIFIED = 'AUTH_METHOD_UNSPECIFIED',
  /** NO_LOGIN means this role cannot be used for interactive access */
  NO_LOGIN = 'NO_LOGIN',
  /** PG_PASSWORD_SCRAM_SHA_256 is a password-based authentication */
  PG_PASSWORD_SCRAM_SHA_256 = 'PG_PASSWORD_SCRAM_SHA_256',
  /**
   * LAKEBASE_OAUTH_V1 is for logging in with the managed identities like
   * the <Databricks> service principal, <Databricks> Group or <Databricks> user.
   */
  LAKEBASE_OAUTH_V1 = 'LAKEBASE_OAUTH_V1',
}

/**
 * The type of the <Databricks> managed identity that this Role represents.
 * Leave empty if you wish to create a regular Postgres role not associated with a <Databricks> identity.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum Role_IdentityType {
  /** Default value, not used */
  IDENTITY_TYPE_UNSPECIFIED = 'IDENTITY_TYPE_UNSPECIFIED',
  /** A user in a <Databricks> workspace. */
  USER = 'USER',
  /** A service principal in a <Databricks> workspace. */
  SERVICE_PRINCIPAL = 'SERVICE_PRINCIPAL',
  /** A group in a <Databricks> workspace. */
  GROUP = 'GROUP',
}

/** Roles that the DatabaseInstanceRole can be a member of. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum Role_MembershipRole {
  /** Indicates that the DatabaseInstanceRole is not a member of any standard, managed roles. */
  MEMBERSHIP_ROLE_UNSPECIFIED = 'MEMBERSHIP_ROLE_UNSPECIFIED',
  /** Indicates membership in DATABRICKS_SUPERUSER, the highest set of privileges exposed to customers. */
  DATABRICKS_SUPERUSER = 'DATABRICKS_SUPERUSER',
}

/** Scheduling policy of the synced table's underlying pipeline. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum SyncedTable_SyncedTableSpec_SyncedTableSchedulingPolicy {
  SYNCED_TABLE_SCHEDULING_POLICY_UNSPECIFIED = 'SYNCED_TABLE_SCHEDULING_POLICY_UNSPECIFIED',
  /**
   * Pipeline runs continuously after generating the initial data.
   * Requires the source table to have Change Data Feed (CDF) enabled.
   */
  CONTINUOUS = 'CONTINUOUS',
  /**
   * Pipeline stops after generating the initial data and can be triggered later (manually, through a cron job or through data triggers).
   * Requires the source table to have Change Data Feed (CDF) enabled.
   */
  TRIGGERED = 'TRIGGERED',
  /**
   * Pipeline stops after generating the initial data and can be triggered later (manually, through a cron job or through data triggers).
   * Successive updates always perform a full copy of the source table data (no incremental updates).
   * Does not require the source table to have Change Data Feed (CDF) enabled.
   */
  SNAPSHOT = 'SNAPSHOT',
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
  /** Absolute expiration timestamp. When set, the branch will expire at this time. */
  expireTime?: Temporal.Instant | undefined;
  /** Relative time-to-live duration. When set, the branch will expire at creation_time + ttl. */
  ttl?: Temporal.Duration | undefined;
  /**
   * Explicitly disable expiration. When set to true, the branch will not expire.
   * If set to false, the request is invalid; provide either ttl or expire_time instead.
   */
  noExpiry?: boolean | undefined;
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
  logicalSizeBytes?: number | undefined;
  /** Absolute expiration time for the branch. Empty if expiration is disabled. */
  expireTime?: Temporal.Instant | undefined;
  /**
   * The short identifier of the branch, suitable for showing to the users.
   * For a branch with name `projects/my-project/branches/my-branch`, the branch_id is `my-branch`.
   *
   * Use this field when building UI components that display branches to users (e.g., a drop-down
   * selector). Prefer showing `branch_id` instead of the full resource name from `Branch.name`,
   * which follows the `projects/{project_id}/branches/{branch_id}` format and is not user-friendly.
   */
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
  /**
   * The short identifier of the catalog, suitable for showing to the users.
   * For a catalog with name `catalogs/my-catalog`, the catalog_id is `my-catalog`.
   *
   * Use this field when building UI components that display catalogs to users (e.g., a drop-down
   * selector). Prefer showing `catalog_id` instead of the full resource name from `Catalog.name`,
   * which follows the `catalogs/{catalog_id}` format and is not user-friendly.
   */
  catalogId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CatalogOperationMetadata {}

export interface ComputeInstance {
  /**
   * The fully qualified name for this compute instance.
   * Format: projects/\*\/branches/\*\/endpoints/\*\/compute-instances/\*
   */
  name?: string | undefined;
  /** The unique ID for this compute. */
  computeInstanceId?: string | undefined;
  /** The current state of the compute. */
  currentState?: ComputeInstance_ComputeState | undefined;
  /** The desired pending state of the compute, if a state transition is in progress. */
  pendingState?: ComputeInstance_ComputeState | undefined;
  /** The role of this compute within the endpoint. */
  role?: ComputeInstance_ComputeType | undefined;
  /** A host scoped directly to the enclosing compute. This host is guaranteed to resolve to the specific compute instance. */
  computeHost?: string | undefined;
  /** A timestamp indicating when the compute was last started. */
  startTime?: Temporal.Instant | undefined;
  /** A timestamp indicating when the compute was last suspended. */
  suspendTime?: Temporal.Instant | undefined;
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
}

export interface CreateCatalogRequest {
  /**
   * The ID in the Unity Catalog.
   * It becomes the full resource name, for example "my_catalog" becomes "catalogs/my_catalog".
   */
  catalogId?: string | undefined;
  catalog?: Catalog | undefined;
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

export interface CreateTableRequest {
  table?: Table | undefined;
}

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
  /**
   * The short identifier of the database, suitable for showing to the users.
   * For a database with name `projects/my-project/branches/my-branch/databases/my-db`,
   * the database_id is `my-db`.
   *
   * Use this field when building UI components that display databases to users (e.g., a drop-down
   * selector). Prefer showing `database_id` instead of the full resource name from `Database.name`,
   * which follows the `projects/{project_id}/branches/{branch_id}/databases/{database_id}` format
   * and is not user-friendly.
   */
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

/** Databricks Error that is returned by all Databricks APIs. */
export interface DatabricksServiceExceptionWithDetailsProto {
  errorCode?: ErrorCode | undefined;
  message?: string | undefined;
  stackTrace?: string | undefined;
  details?: Record<string, unknown>[] | undefined;
}

export interface DeleteBranchRequest {
  /**
   * The full resource path of the branch to delete.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  name?: string | undefined;
  /**
   * If true, permanently delete the branch; if false, soft delete.
   * Soft deletion (purge=false) is not supported yet.
   */
  purge?: boolean | undefined;
  /**
   * If true, if branch does not exists, the request will succeed and no action will be taken.
   * If false (default value) and branch does not exists, the request will fail with NOT_FOUND error.
   */
  allowMissing?: boolean | undefined;
}

export interface DeleteCatalogRequest {
  /**
   * The full resource path of the catalog to delete.
   *
   * Format: "catalogs/{catalog_id}".
   */
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

/** Request to hard delete a Forward ETL configuration and all associated table mappings. */
export interface DeleteForwardEtlConfigurationRequest {
  /**
   * The Branch to delete Forward ETL configuration for.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /** Tenant ID (dashless UUID format). */
  tenantId?: string | undefined;
  /** Timeline ID (dashless UUID format). */
  timelineId?: string | undefined;
  /** PostgreSQL database OID to delete configuration for. */
  pgDatabaseOid?: number | undefined;
  /** PostgreSQL schema OID to delete configuration for. */
  pgSchemaOid?: number | undefined;
}

/** Response to delete Forward ETL configuration. */
export interface DeleteForwardEtlConfigurationResponse {
  /** Number of configuration rows deleted (0 or 1). */
  deletedConfigs?: number | undefined;
  /** Number of table mapping rows deleted. */
  deletedMappings?: number | undefined;
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

export interface DeleteSyncedTableRequest {
  /**
   * The Full resource name of the synced table, of the format "synced_tables/{catalog}.{schema}.{table}",
   * where (catalog, schema, table) are the UC entity names.
   */
  name?: string | undefined;
}

export interface DeleteTableRequest {
  /** Full three-part (catalog, schema, table) name of the table. */
  name?: string | undefined;
}

export interface DeltaTableSyncInfo {
  /** The Delta Lake commit version that was last successfully synced. */
  deltaCommitVersion?: number | undefined;
  /**
   * The timestamp when the above Delta version was committed in the source Delta table.
   * Note: This is the Delta commit time, not the time the data was written to the synced table.
   */
  deltaCommitTime?: Temporal.Instant | undefined;
}

/** Request to disable Forward ETL */
export interface DisableForwardEtlRequest {
  /**
   * The Branch to disable Forward ETL for.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /** Tenant ID (dashless UUID format). */
  tenantId?: string | undefined;
  /** Timeline ID (dashless UUID format). */
  timelineId?: string | undefined;
  /** PostgreSQL database OID to disable. */
  pgDatabaseOid?: number | undefined;
  /** PostgreSQL schema OID to disable. */
  pgSchemaOid?: number | undefined;
}

/** Response to disable Forward ETL */
export interface DisableForwardEtlResponse {
  /** Whether Forward ETL was successfully disabled. */
  disabled?: boolean | undefined;
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EndpointSettings_PgSettingsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface EndpointSpec {
  /** The endpoint type. A branch can only have one READ_WRITE endpoint. */
  endpointType?: EndpointType | undefined;
  /** The minimum number of Compute Units. Minimum value is 0.5. */
  autoscalingLimitMinCu?: number | undefined;
  /** The maximum number of Compute Units. Minimum value is 0.5. */
  autoscalingLimitMaxCu?: number | undefined;
  /**
   * Whether to restrict connections to the compute endpoint.
   * Enabling this option schedules a suspend compute operation.
   * A disabled compute endpoint cannot be enabled by a connection or
   * console action.
   */
  disabled?: boolean | undefined;
  /**
   * Duration of inactivity after which the compute endpoint is automatically suspended.
   * If specified should be between 60s and 604800s (1 minute to 1 week).
   */
  suspendTimeoutDuration?: Temporal.Duration | undefined;
  /**
   * When set to true, explicitly disables automatic suspension (never suspend).
   * Should be set to true when provided.
   */
  noSuspension?: boolean | undefined;
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
  /** The maximum number of Compute Units. */
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
  /**
   * The short identifier of the endpoint, suitable for showing to the users.
   * For an endpoint with name `projects/my-project/branches/my-branch/endpoints/my-endpoint`,
   * the endpoint_id is `my-endpoint`.
   *
   * Use this field when building UI components that display endpoints to users (e.g., a drop-down
   * selector). Prefer showing `endpoint_id` instead of the full resource name from `Endpoint.name`,
   * which follows the `projects/{project_id}/branches/{branch_id}/endpoints/{endpoint_id}` format
   * and is not user-friendly.
   */
  endpointId?: string | undefined;
}

/** Forward ETL configuration */
export interface ForwardEtlConfig {
  /** Workspace ID. */
  workspaceId?: number | undefined;
  /** Tenant ID (dashless UUID format). */
  tenantId?: string | undefined;
  /** Timeline ID (dashless UUID format). */
  timelineId?: string | undefined;
  /** PostgreSQL database OID. */
  pgDatabaseOid?: number | undefined;
  /** PostgreSQL schema OID. */
  pgSchemaOid?: number | undefined;
  /** Unity Catalog catalog ID. */
  ucCatalogId?: string | undefined;
  /** Unity Catalog schema ID. */
  ucSchemaId?: string | undefined;
  /** Whether Forward ETL is enabled. */
  enabled?: boolean | undefined;
  /** Configuration creation timestamp in milliseconds since epoch. */
  createTimeMillis?: number | undefined;
  /** Configuration last update timestamp in milliseconds since epoch. */
  updateTimeMillis?: number | undefined;
}

/** Database metadata */
export interface ForwardEtlDatabase {
  /** Database name. */
  name?: string | undefined;
  /** PostgreSQL database OID. */
  oid?: number | undefined;
}

/** Forward ETL metadata response */
export interface ForwardEtlMetadata {
  /** List of databases with their PostgreSQL OIDs. */
  databases?: ForwardEtlDatabase[] | undefined;
  /** List of schemas with their PostgreSQL OIDs. */
  schemas?: ForwardEtlSchema[] | undefined;
}

/** Schema metadata */
export interface ForwardEtlSchema {
  /** Schema name. */
  name?: string | undefined;
  /** PostgreSQL schema OID. */
  oid?: number | undefined;
}

/** Forward ETL status response */
export interface ForwardEtlStatus {
  /** List of Forward ETL configurations. */
  configurations?: ForwardEtlConfig[] | undefined;
  /** Per-table replication mappings. */
  tableMappings?: ForwardEtlTableMapping[] | undefined;
}

/** Per-table replication mapping */
export interface ForwardEtlTableMapping {
  /** PostgreSQL table OID. */
  pgTableOid?: number | undefined;
  /** Unity Catalog table ID. */
  ucTableId?: string | undefined;
  /** Last synced LSN (Log Sequence Number) for this table. */
  lastSyncedLsn?: string | undefined;
  /** PostgreSQL table name. */
  pgTableName?: string | undefined;
  /** Unity Catalog table name. */
  ucTableName?: string | undefined;
  /** Whether replication is enabled for this table. */
  enabled?: boolean | undefined;
}

export interface GenerateDatabaseCredentialRequest {
  /** The returned token will be scoped to UC tables with the specified permissions. */
  claims?: RequestedClaims[] | undefined;
  /**
   * This field is not yet supported.
   * The endpoint for which this credential will be generated.
   * Format: projects/{project_id}/branches/{branch_id}/endpoints/{endpoint_id}
   */
  endpoint?: string | undefined;
  /**
   * <Databricks> workspace group name. When provided, credentials are generated
   * with permissions scoped to this group.
   */
  groupName?: string | undefined;
  /**
   * The requested time-to-live for the generated credential token.
   * Maximum allowed duration is 1 hour.
   */
  ttl?: Temporal.Duration | undefined;
  /**
   * Timestamp in UTC of when this credential should expire.
   * Expire time should be within 1 hour of the current time.
   */
  expireTime?: Temporal.Instant | undefined;
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

export interface GetComputeInstanceRequest {
  /**
   * The full resource path of the compute instance to retrieve.
   * Format: projects/{project_id}/branches/{branch_id}/endpoints/{endpoint_id}/compute-instances/{compute_instance_id}
   */
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

/** Request to get Forward ETL metadata */
export interface GetForwardEtlMetadataRequest {
  /**
   * The Branch to get metadata for.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /** Tenant ID (dashless UUID format). */
  tenantId?: string | undefined;
  /** Timeline ID (dashless UUID format). */
  timelineId?: string | undefined;
}

/** Request to get Forward ETL status */
export interface GetForwardEtlStatusRequest {
  /**
   * The Branch to get Forward ETL status for.
   * Format: projects/{project_id}/branches/{branch_id}
   */
  parent?: string | undefined;
  /** Tenant ID (dashless UUID format). */
  tenantId?: string | undefined;
  /** Timeline ID (dashless UUID format). */
  timelineId?: string | undefined;
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

export interface GetSyncedTableRequest {
  /**
   * Format: "synced_tables/{catalog}.{schema}.{table}",
   * where (catalog, schema, table) are the entity names in the Unity Catalog.
   */
  name?: string | undefined;
}

export interface GetTableRequest {
  /** Full three-part (catalog, schema, table) name of the table. */
  name?: string | undefined;
}

export interface InitialEndpointSpec {
  /** Settings for HA configuration of the endpoint */
  group?: EndpointGroupSpec | undefined;
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

export interface ListComputeInstancesRequest {
  /** The parent, which owns the compute instances. */
  parent?: string | undefined;
  /**
   * The maximum number of compute instances to return. The service may
   * return fewer than this value.
   *
   * If unspecified, at most 50 compute instances will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListInstances` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListInstances` must
   * match the call that provided the page token.
   */
  pageToken?: string | undefined;
}

export interface ListComputeInstancesResponse {
  /** The compute instances from the specified endpoint. */
  computeInstances?: ComputeInstance[] | undefined;
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
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
  /** The error result of the operation in case of failure or cancellation. */
  error?: DatabricksServiceExceptionWithDetailsProto | undefined;
  /** The normal, successful response of the operation. */
  response?: Record<string, unknown> | undefined;
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
   * Configuration settings for the initial Read/Write endpoint created inside the default branch for a newly
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
  /**
   * Duration of inactivity after which the compute endpoint is automatically suspended.
   * If specified should be between 60s and 604800s (1 minute to 1 week).
   */
  suspendTimeoutDuration?: Temporal.Duration | undefined;
  /**
   * When set to true, explicitly disables automatic suspension (never suspend).
   * Should be set to true when provided.
   */
  noSuspension?: boolean | undefined;
  /** A raw representation of Postgres settings. */
  pgSettings?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ProjectDefaultEndpointSettings_PgSettingsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProjectOperationMetadata {}

export interface ProjectSpec {
  /** Human-readable project name. Length should be between 1 and 256 characters. */
  displayName?: string | undefined;
  /** The major Postgres version number. Supported versions are 16 and 17. */
  pgVersion?: number | undefined;
  /** The number of seconds to retain the shared history for point in time recovery for all branches in this project. Value should be between 172800s (2 days) and 2592000s (30 days). */
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
  /**
   * Indicates if this project should be created with workspace-scoped customer managed key (CMK) encryption enabled.
   * Since we need to do an end to end perf bench using BSS API to A/B test the performance impact of CMK encryption,
   * we need to be able to control this flag in the API. This flag will be removed once we find a better way to
   * separate the tenants or enforce workspace-level CMK encryption or migrate everyone to CMK.
   */
  workspaceKeyEncrypted?: boolean | undefined;
  /** Whether to enable PG native password login on all endpoints in this project. Defaults to true. */
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
  branchLogicalSizeLimitBytes?: number | undefined;
  /** The current space occupied by the project in storage. */
  syntheticStorageSizeBytes?: number | undefined;
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
  /**
   * The short identifier of the project, suitable for showing to the users.
   * For a project with name `projects/my-project`, the project_id is `my-project`.
   *
   * Use this field when building UI components that display projects to users (e.g., a drop-down
   * selector). Prefer showing `project_id` instead of the full resource name from `Project.name`,
   * which follows the `projects/{project_id}` format and is not user-friendly.
   */
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
  unspecifiedResourceName?: string | undefined;
  tableName?: string | undefined;
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
  /**
   * The short identifier of the role, suitable for showing to the users.
   * For a role with name `projects/my-project/branches/my-branch/roles/my-role`,
   * the role_id is `my-role`.
   *
   * Use this field when building UI components that display roles to users (e.g., a drop-down
   * selector). Prefer showing `role_id` instead of the full resource name from `Role.name`,
   * which follows the `projects/{project_id}/branches/{branch_id}/roles/{role_id}` format
   * and is not user-friendly.
   */
  roleId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RoleOperationMetadata {}

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
  lastProcessedCommitVersion?: number | undefined;
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
  latestVersionCurrentlyProcessing?: number | undefined;
  /** The number of rows that have been synced in this update. */
  syncedRowCount?: number | undefined;
  /** The total number of rows that need to be synced in this update. This number may be an estimate. */
  totalRowCount?: number | undefined;
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
  deltaTableSyncInfo?: DeltaTableSyncInfo | undefined;
}

/**
 * Table represents a non-synced database table in a Lakebase project.
 * Unlike SyncedTable, this does not have a data synchronization pipeline.
 */
export interface Table {
  /** Full three-part (catalog, schema, table) name of the table. */
  name?: string | undefined;
  /**
   * The project and branch scoped database to which this table belongs. Of the format:
   * projects/{project_id}/branches/{branch_id}/databases/{database_id}
   * where database_id is the name of the logical database in Postgres.
   */
  database?: string | undefined;
  /** The id of the database project associated with the table. Of the format projects/{project_id}. */
  project?: string | undefined;
  /** The id of the database branch associated with the table. Of the format projects/{project_id}/branches/{branch_id}. */
  branch?: string | undefined;
  /** REST API URL for serving data from this table. */
  tableServingUrl?: string | undefined;
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
  /** The list of fields to update. If unspecified, all fields will be updated when possible. */
  updateMask?: string | undefined;
}

export interface UpdateDatabaseRequest {
  /**
   * The Database to update.
   *
   * The database's `name` field is used to identify the database to update.
   * Format: projects/{project_id}/branches/{branch_id}/databases/{database_id}
   */
  database?: Database | undefined;
  /** The list of fields to update. If unspecified, all fields will be updated when possible. */
  updateMask?: string | undefined;
}

export interface UpdateEndpointRequest {
  /**
   * The Endpoint to update.
   *
   * The endpoint's `name` field is used to identify the endpoint to update.
   * Format: projects/{project_id}/branches/{branch_id}/endpoints/{endpoint_id}
   */
  endpoint?: Endpoint | undefined;
  /** The list of fields to update. If unspecified, all fields will be updated when possible. */
  updateMask?: string | undefined;
}

export interface UpdateProjectRequest {
  /**
   * The Project to update.
   *
   * The project's `name` field is used to identify the project to update.
   * Format: projects/{project_id}
   */
  project?: Project | undefined;
  /** The list of fields to update. If unspecified, all fields will be updated when possible. */
  updateMask?: string | undefined;
}

export interface UpdateRoleRequest {
  /**
   * The Postgres Role to update.
   *
   * The role's `name` field is used to identify the role to update.
   * Format: projects/{project_id}/branches/{branch_id}/roles/{role_id}
   */
  role?: Role | undefined;
  /**
   * The list of fields to update in Postgres Role.
   * If unspecified, all fields will be updated when possible.
   */
  updateMask?: string | undefined;
}

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
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    parent: d.parent,
    createTime: d.create_time,
    updateTime: d.update_time,
    spec: d.spec,
    status: d.status,
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
  })
  .transform(d => ({
    sourceBranch: d.source_branch,
    sourceBranchLsn: d.source_branch_lsn,
    sourceBranchTime: d.source_branch_time,
    isProtected: d.is_protected,
    expireTime: d.expire_time,
    ttl: d.ttl,
    noExpiry: d.no_expiry,
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
    current_state: z.enum(BranchStatus_State).optional(),
    pending_state: z.enum(BranchStatus_State).optional(),
    state_change_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    logical_size_bytes: z.number().optional(),
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
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    spec: d.spec,
    status: d.status,
    createTime: d.create_time,
    updateTime: d.update_time,
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
      catalog_id: z.string().optional(),
    })
    .transform(d => ({
      postgresDatabase: d.postgres_database,
      project: d.project,
      branch: d.branch,
      catalogId: d.catalog_id,
    }));

export const unmarshalCatalogOperationMetadataSchema: z.ZodType<CatalogOperationMetadata> =
  z.object({});

export const unmarshalComputeInstanceSchema: z.ZodType<ComputeInstance> = z
  .object({
    name: z.string().optional(),
    compute_instance_id: z.string().optional(),
    current_state: z.enum(ComputeInstance_ComputeState).optional(),
    pending_state: z.enum(ComputeInstance_ComputeState).optional(),
    role: z.enum(ComputeInstance_ComputeType).optional(),
    compute_host: z.string().optional(),
    start_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    suspend_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    computeInstanceId: d.compute_instance_id,
    currentState: d.current_state,
    pendingState: d.pending_state,
    role: d.role,
    computeHost: d.compute_host,
    startTime: d.start_time,
    suspendTime: d.suspend_time,
  }));

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

export const unmarshalDeleteForwardEtlConfigurationResponseSchema: z.ZodType<DeleteForwardEtlConfigurationResponse> =
  z
    .object({
      deleted_configs: z.number().optional(),
      deleted_mappings: z.number().optional(),
    })
    .transform(d => ({
      deletedConfigs: d.deleted_configs,
      deletedMappings: d.deleted_mappings,
    }));

export const unmarshalDeltaTableSyncInfoSchema: z.ZodType<DeltaTableSyncInfo> =
  z
    .object({
      delta_commit_version: z.number().optional(),
      delta_commit_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      deltaCommitVersion: d.delta_commit_version,
      deltaCommitTime: d.delta_commit_time,
    }));

export const unmarshalDisableForwardEtlResponseSchema: z.ZodType<DisableForwardEtlResponse> =
  z
    .object({
      disabled: z.boolean().optional(),
    })
    .transform(d => ({
      disabled: d.disabled,
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
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    parent: d.parent,
    createTime: d.create_time,
    updateTime: d.update_time,
    spec: d.spec,
    status: d.status,
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
    endpoint_type: z.enum(EndpointType).optional(),
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
    suspendTimeoutDuration: d.suspend_timeout_duration,
    noSuspension: d.no_suspension,
    settings: d.settings,
    group: d.group,
  }));

export const unmarshalEndpointStatusSchema: z.ZodType<EndpointStatus> = z
  .object({
    endpoint_type: z.enum(EndpointType).optional(),
    hosts: z.lazy(() => unmarshalEndpointHostsSchema).optional(),
    last_active_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    autoscaling_limit_min_cu: z.number().optional(),
    autoscaling_limit_max_cu: z.number().optional(),
    current_state: z.enum(EndpointStatus_State).optional(),
    pending_state: z.enum(EndpointStatus_State).optional(),
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

export const unmarshalForwardEtlConfigSchema: z.ZodType<ForwardEtlConfig> = z
  .object({
    workspace_id: z.number().optional(),
    tenant_id: z.string().optional(),
    timeline_id: z.string().optional(),
    pg_database_oid: z.number().optional(),
    pg_schema_oid: z.number().optional(),
    uc_catalog_id: z.string().optional(),
    uc_schema_id: z.string().optional(),
    enabled: z.boolean().optional(),
    create_time_millis: z.number().optional(),
    update_time_millis: z.number().optional(),
  })
  .transform(d => ({
    workspaceId: d.workspace_id,
    tenantId: d.tenant_id,
    timelineId: d.timeline_id,
    pgDatabaseOid: d.pg_database_oid,
    pgSchemaOid: d.pg_schema_oid,
    ucCatalogId: d.uc_catalog_id,
    ucSchemaId: d.uc_schema_id,
    enabled: d.enabled,
    createTimeMillis: d.create_time_millis,
    updateTimeMillis: d.update_time_millis,
  }));

export const unmarshalForwardEtlDatabaseSchema: z.ZodType<ForwardEtlDatabase> =
  z
    .object({
      name: z.string().optional(),
      oid: z.number().optional(),
    })
    .transform(d => ({
      name: d.name,
      oid: d.oid,
    }));

export const unmarshalForwardEtlMetadataSchema: z.ZodType<ForwardEtlMetadata> =
  z
    .object({
      databases: z
        .array(z.lazy(() => unmarshalForwardEtlDatabaseSchema))
        .optional(),
      schemas: z
        .array(z.lazy(() => unmarshalForwardEtlSchemaSchema))
        .optional(),
    })
    .transform(d => ({
      databases: d.databases,
      schemas: d.schemas,
    }));

export const unmarshalForwardEtlSchemaSchema: z.ZodType<ForwardEtlSchema> = z
  .object({
    name: z.string().optional(),
    oid: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    oid: d.oid,
  }));

export const unmarshalForwardEtlStatusSchema: z.ZodType<ForwardEtlStatus> = z
  .object({
    configurations: z
      .array(z.lazy(() => unmarshalForwardEtlConfigSchema))
      .optional(),
    table_mappings: z
      .array(z.lazy(() => unmarshalForwardEtlTableMappingSchema))
      .optional(),
  })
  .transform(d => ({
    configurations: d.configurations,
    tableMappings: d.table_mappings,
  }));

export const unmarshalForwardEtlTableMappingSchema: z.ZodType<ForwardEtlTableMapping> =
  z
    .object({
      pg_table_oid: z.number().optional(),
      uc_table_id: z.string().optional(),
      last_synced_lsn: z.string().optional(),
      pg_table_name: z.string().optional(),
      uc_table_name: z.string().optional(),
      enabled: z.boolean().optional(),
    })
    .transform(d => ({
      pgTableOid: d.pg_table_oid,
      ucTableId: d.uc_table_id,
      lastSyncedLsn: d.last_synced_lsn,
      pgTableName: d.pg_table_name,
      ucTableName: d.uc_table_name,
      enabled: d.enabled,
    }));

export const unmarshalGenerateDatabaseCredentialRequestSchema: z.ZodType<GenerateDatabaseCredentialRequest> =
  z
    .object({
      claims: z.array(z.lazy(() => unmarshalRequestedClaimsSchema)).optional(),
      endpoint: z.string().optional(),
      group_name: z.string().optional(),
      ttl: z
        .string()
        .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
        .optional(),
      expire_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      claims: d.claims,
      endpoint: d.endpoint,
      groupName: d.group_name,
      ttl: d.ttl,
      expireTime: d.expire_time,
    }));

export const unmarshalInitialEndpointSpecSchema: z.ZodType<InitialEndpointSpec> =
  z
    .object({
      group: z.lazy(() => unmarshalEndpointGroupSpecSchema).optional(),
    })
    .transform(d => ({
      group: d.group,
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

export const unmarshalListComputeInstancesResponseSchema: z.ZodType<ListComputeInstancesResponse> =
  z
    .object({
      compute_instances: z
        .array(z.lazy(() => unmarshalComputeInstanceSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      computeInstances: d.compute_instances,
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

export const unmarshalNewPipelineSpecSchema: z.ZodType<NewPipelineSpec> = z
  .object({
    storage_catalog: z.string().optional(),
    storage_schema: z.string().optional(),
    budget_policy_id: z.string().optional(),
    pipeline_channel: z.enum(NewPipelineSpec_PipelineChannel).optional(),
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
      suspendTimeoutDuration: d.suspend_timeout_duration,
      noSuspension: d.no_suspension,
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
    workspace_key_encrypted: z.boolean().optional(),
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
    workspaceKeyEncrypted: d.workspace_key_encrypted,
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
    branch_logical_size_limit_bytes: z.number().optional(),
    synthetic_storage_size_bytes: z.number().optional(),
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

export const unmarshalRequestedClaimsSchema: z.ZodType<RequestedClaims> = z
  .object({
    permission_set: z.enum(RequestedClaims_PermissionSet).optional(),
    resources: z
      .array(z.lazy(() => unmarshalRequestedResourceSchema))
      .optional(),
  })
  .transform(d => ({
    permissionSet: d.permission_set,
    resources: d.resources,
  }));

export const unmarshalRequestedResourceSchema: z.ZodType<RequestedResource> = z
  .object({
    unspecified_resource_name: z.string().optional(),
    table_name: z.string().optional(),
  })
  .transform(d => ({
    unspecifiedResourceName: d.unspecified_resource_name,
    tableName: d.table_name,
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
    membership_roles: z.array(z.enum(Role_MembershipRole)).optional(),
    identity_type: z.enum(Role_IdentityType).optional(),
    attributes: z.lazy(() => unmarshalRole_AttributesSchema).optional(),
    auth_method: z.enum(Role_AuthMethod).optional(),
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
    membership_roles: z.array(z.enum(Role_MembershipRole)).optional(),
    identity_type: z.enum(Role_IdentityType).optional(),
    attributes: z.lazy(() => unmarshalRole_AttributesSchema).optional(),
    auth_method: z.enum(Role_AuthMethod).optional(),
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
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    spec: d.spec,
    status: d.status,
    createTime: d.create_time,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSyncedTable_SyncedTableSpecSchema: z.ZodType<SyncedTable_SyncedTableSpec> =
  z
    .object({
      postgres_database: z.string().optional(),
      branch: z.string().optional(),
      scheduling_policy: z
        .enum(SyncedTable_SyncedTableSpec_SyncedTableSchedulingPolicy)
        .optional(),
      source_table_full_name: z.string().optional(),
      primary_key_columns: z.array(z.string()).optional(),
      timeseries_key: z.string().optional(),
      existing_pipeline_id: z.string().optional(),
      create_database_objects_if_missing: z.boolean().optional(),
      new_pipeline_spec: z
        .lazy(() => unmarshalNewPipelineSpecSchema)
        .optional(),
      accelerated_sync: z.boolean().optional(),
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
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSyncedTable_SyncedTableStatusSchema: z.ZodType<SyncedTable_SyncedTableStatus> =
  z
    .object({
      message: z.string().optional(),
      detailed_state: z.enum(SyncedTableState).optional(),
      last_sync: z.lazy(() => unmarshalSyncedTablePositionSchema).optional(),
      ongoing_sync_progress: z
        .lazy(() => unmarshalSyncedTablePipelineProgressSchema)
        .optional(),
      provisioning_phase: z.enum(ProvisioningPhase).optional(),
      last_processed_commit_version: z.number().optional(),
      last_sync_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      pipeline_id: z.string().optional(),
      unity_catalog_provisioning_state: z
        .enum(ProvisioningInfo_State)
        .optional(),
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
      latest_version_currently_processing: z.number().optional(),
      synced_row_count: z.number().optional(),
      total_row_count: z.number().optional(),
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
      deltaTableSyncInfo: d.delta_table_sync_info,
    }));

export const unmarshalTableSchema: z.ZodType<Table> = z
  .object({
    name: z.string().optional(),
    database: z.string().optional(),
    project: z.string().optional(),
    branch: z.string().optional(),
    table_serving_url: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    database: d.database,
    project: d.project,
    branch: d.branch,
    tableServingUrl: d.table_serving_url,
  }));

export const unmarshalUndeleteBranchRequestSchema: z.ZodType<UndeleteBranchRequest> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalUndeleteProjectRequestSchema: z.ZodType<UndeleteProjectRequest> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
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
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    parent: d.parent,
    create_time: d.createTime,
    update_time: d.updateTime,
    spec: d.spec,
    status: d.status,
  }));

export const marshalBranchOperationMetadataSchema: z.ZodType = z.object({});

export const marshalBranchSpecSchema: z.ZodType = z
  .object({
    sourceBranch: z.string().optional(),
    sourceBranchLsn: z.string().optional(),
    sourceBranchTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    isProtected: z.boolean().optional(),
    expireTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    ttl: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    noExpiry: z.boolean().optional(),
  })
  .transform(d => ({
    source_branch: d.sourceBranch,
    source_branch_lsn: d.sourceBranchLsn,
    source_branch_time: d.sourceBranchTime,
    is_protected: d.isProtected,
    expire_time: d.expireTime,
    ttl: d.ttl,
    no_expiry: d.noExpiry,
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
    currentState: z.enum(BranchStatus_State).optional(),
    pendingState: z.enum(BranchStatus_State).optional(),
    stateChangeTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    logicalSizeBytes: z.number().optional(),
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
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    spec: d.spec,
    status: d.status,
    create_time: d.createTime,
    update_time: d.updateTime,
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
    catalogId: z.string().optional(),
  })
  .transform(d => ({
    postgres_database: d.postgresDatabase,
    project: d.project,
    branch: d.branch,
    catalog_id: d.catalogId,
  }));

export const marshalCatalogOperationMetadataSchema: z.ZodType = z.object({});

export const marshalComputeInstanceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    computeInstanceId: z.string().optional(),
    currentState: z.enum(ComputeInstance_ComputeState).optional(),
    pendingState: z.enum(ComputeInstance_ComputeState).optional(),
    role: z.enum(ComputeInstance_ComputeType).optional(),
    computeHost: z.string().optional(),
    startTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    suspendTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    compute_instance_id: d.computeInstanceId,
    current_state: d.currentState,
    pending_state: d.pendingState,
    role: d.role,
    compute_host: d.computeHost,
    start_time: d.startTime,
    suspend_time: d.suspendTime,
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

export const marshalDatabaseCredentialSchema: z.ZodType = z
  .object({
    token: z.string().optional(),
    expireTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    token: d.token,
    expire_time: d.expireTime,
  }));

export const marshalDatabaseOperationMetadataSchema: z.ZodType = z.object({});

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

export const marshalDeleteForwardEtlConfigurationResponseSchema: z.ZodType = z
  .object({
    deletedConfigs: z.number().optional(),
    deletedMappings: z.number().optional(),
  })
  .transform(d => ({
    deleted_configs: d.deletedConfigs,
    deleted_mappings: d.deletedMappings,
  }));

export const marshalDeltaTableSyncInfoSchema: z.ZodType = z
  .object({
    deltaCommitVersion: z.number().optional(),
    deltaCommitTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    delta_commit_version: d.deltaCommitVersion,
    delta_commit_time: d.deltaCommitTime,
  }));

export const marshalDisableForwardEtlResponseSchema: z.ZodType = z
  .object({
    disabled: z.boolean().optional(),
  })
  .transform(d => ({
    disabled: d.disabled,
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
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    parent: d.parent,
    create_time: d.createTime,
    update_time: d.updateTime,
    spec: d.spec,
    status: d.status,
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

export const marshalEndpointOperationMetadataSchema: z.ZodType = z.object({});

export const marshalEndpointSettingsSchema: z.ZodType = z
  .object({
    pgSettings: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    pg_settings: d.pgSettings,
  }));

export const marshalEndpointSpecSchema: z.ZodType = z
  .object({
    endpointType: z.enum(EndpointType).optional(),
    autoscalingLimitMinCu: z.number().optional(),
    autoscalingLimitMaxCu: z.number().optional(),
    disabled: z.boolean().optional(),
    suspendTimeoutDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    noSuspension: z.boolean().optional(),
    settings: z.lazy(() => marshalEndpointSettingsSchema).optional(),
    group: z.lazy(() => marshalEndpointGroupSpecSchema).optional(),
  })
  .transform(d => ({
    endpoint_type: d.endpointType,
    autoscaling_limit_min_cu: d.autoscalingLimitMinCu,
    autoscaling_limit_max_cu: d.autoscalingLimitMaxCu,
    disabled: d.disabled,
    suspend_timeout_duration: d.suspendTimeoutDuration,
    no_suspension: d.noSuspension,
    settings: d.settings,
    group: d.group,
  }));

export const marshalEndpointStatusSchema: z.ZodType = z
  .object({
    endpointType: z.enum(EndpointType).optional(),
    hosts: z.lazy(() => marshalEndpointHostsSchema).optional(),
    lastActiveTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    autoscalingLimitMinCu: z.number().optional(),
    autoscalingLimitMaxCu: z.number().optional(),
    currentState: z.enum(EndpointStatus_State).optional(),
    pendingState: z.enum(EndpointStatus_State).optional(),
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

export const marshalForwardEtlConfigSchema: z.ZodType = z
  .object({
    workspaceId: z.number().optional(),
    tenantId: z.string().optional(),
    timelineId: z.string().optional(),
    pgDatabaseOid: z.number().optional(),
    pgSchemaOid: z.number().optional(),
    ucCatalogId: z.string().optional(),
    ucSchemaId: z.string().optional(),
    enabled: z.boolean().optional(),
    createTimeMillis: z.number().optional(),
    updateTimeMillis: z.number().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    tenant_id: d.tenantId,
    timeline_id: d.timelineId,
    pg_database_oid: d.pgDatabaseOid,
    pg_schema_oid: d.pgSchemaOid,
    uc_catalog_id: d.ucCatalogId,
    uc_schema_id: d.ucSchemaId,
    enabled: d.enabled,
    create_time_millis: d.createTimeMillis,
    update_time_millis: d.updateTimeMillis,
  }));

export const marshalForwardEtlDatabaseSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    oid: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    oid: d.oid,
  }));

export const marshalForwardEtlMetadataSchema: z.ZodType = z
  .object({
    databases: z
      .array(z.lazy(() => marshalForwardEtlDatabaseSchema))
      .optional(),
    schemas: z.array(z.lazy(() => marshalForwardEtlSchemaSchema)).optional(),
  })
  .transform(d => ({
    databases: d.databases,
    schemas: d.schemas,
  }));

export const marshalForwardEtlSchemaSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    oid: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    oid: d.oid,
  }));

export const marshalForwardEtlStatusSchema: z.ZodType = z
  .object({
    configurations: z
      .array(z.lazy(() => marshalForwardEtlConfigSchema))
      .optional(),
    tableMappings: z
      .array(z.lazy(() => marshalForwardEtlTableMappingSchema))
      .optional(),
  })
  .transform(d => ({
    configurations: d.configurations,
    table_mappings: d.tableMappings,
  }));

export const marshalForwardEtlTableMappingSchema: z.ZodType = z
  .object({
    pgTableOid: z.number().optional(),
    ucTableId: z.string().optional(),
    lastSyncedLsn: z.string().optional(),
    pgTableName: z.string().optional(),
    ucTableName: z.string().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    pg_table_oid: d.pgTableOid,
    uc_table_id: d.ucTableId,
    last_synced_lsn: d.lastSyncedLsn,
    pg_table_name: d.pgTableName,
    uc_table_name: d.ucTableName,
    enabled: d.enabled,
  }));

export const marshalGenerateDatabaseCredentialRequestSchema: z.ZodType = z
  .object({
    claims: z.array(z.lazy(() => marshalRequestedClaimsSchema)).optional(),
    endpoint: z.string().optional(),
    groupName: z.string().optional(),
    ttl: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    expireTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    claims: d.claims,
    endpoint: d.endpoint,
    group_name: d.groupName,
    ttl: d.ttl,
    expire_time: d.expireTime,
  }));

export const marshalInitialEndpointSpecSchema: z.ZodType = z
  .object({
    group: z.lazy(() => marshalEndpointGroupSpecSchema).optional(),
  })
  .transform(d => ({
    group: d.group,
  }));

export const marshalListBranchesResponseSchema: z.ZodType = z
  .object({
    branches: z.array(z.lazy(() => marshalBranchSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    branches: d.branches,
    next_page_token: d.nextPageToken,
  }));

export const marshalListComputeInstancesResponseSchema: z.ZodType = z
  .object({
    computeInstances: z
      .array(z.lazy(() => marshalComputeInstanceSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    compute_instances: d.computeInstances,
    next_page_token: d.nextPageToken,
  }));

export const marshalListDatabasesResponseSchema: z.ZodType = z
  .object({
    databases: z.array(z.lazy(() => marshalDatabaseSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    databases: d.databases,
    next_page_token: d.nextPageToken,
  }));

export const marshalListEndpointsResponseSchema: z.ZodType = z
  .object({
    endpoints: z.array(z.lazy(() => marshalEndpointSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    endpoints: d.endpoints,
    next_page_token: d.nextPageToken,
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

export const marshalListRolesResponseSchema: z.ZodType = z
  .object({
    roles: z.array(z.lazy(() => marshalRoleSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    roles: d.roles,
    next_page_token: d.nextPageToken,
  }));

export const marshalNewPipelineSpecSchema: z.ZodType = z
  .object({
    storageCatalog: z.string().optional(),
    storageSchema: z.string().optional(),
    budgetPolicyId: z.string().optional(),
    pipelineChannel: z.enum(NewPipelineSpec_PipelineChannel).optional(),
  })
  .transform(d => ({
    storage_catalog: d.storageCatalog,
    storage_schema: d.storageSchema,
    budget_policy_id: d.budgetPolicyId,
    pipeline_channel: d.pipelineChannel,
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
    suspendTimeoutDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    noSuspension: z.boolean().optional(),
    pgSettings: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    autoscaling_limit_min_cu: d.autoscalingLimitMinCu,
    autoscaling_limit_max_cu: d.autoscalingLimitMaxCu,
    suspend_timeout_duration: d.suspendTimeoutDuration,
    no_suspension: d.noSuspension,
    pg_settings: d.pgSettings,
  }));

export const marshalProjectOperationMetadataSchema: z.ZodType = z.object({});

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
    workspaceKeyEncrypted: z.boolean().optional(),
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
    workspace_key_encrypted: d.workspaceKeyEncrypted,
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
    branchLogicalSizeLimitBytes: z.number().optional(),
    syntheticStorageSizeBytes: z.number().optional(),
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
    permissionSet: z.enum(RequestedClaims_PermissionSet).optional(),
    resources: z.array(z.lazy(() => marshalRequestedResourceSchema)).optional(),
  })
  .transform(d => ({
    permission_set: d.permissionSet,
    resources: d.resources,
  }));

export const marshalRequestedResourceSchema: z.ZodType = z
  .object({
    unspecifiedResourceName: z.string().optional(),
    tableName: z.string().optional(),
  })
  .transform(d => ({
    unspecified_resource_name: d.unspecifiedResourceName,
    table_name: d.tableName,
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
    membershipRoles: z.array(z.enum(Role_MembershipRole)).optional(),
    identityType: z.enum(Role_IdentityType).optional(),
    attributes: z.lazy(() => marshalRole_AttributesSchema).optional(),
    authMethod: z.enum(Role_AuthMethod).optional(),
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
    membershipRoles: z.array(z.enum(Role_MembershipRole)).optional(),
    identityType: z.enum(Role_IdentityType).optional(),
    attributes: z.lazy(() => marshalRole_AttributesSchema).optional(),
    authMethod: z.enum(Role_AuthMethod).optional(),
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

export const marshalRoleOperationMetadataSchema: z.ZodType = z.object({});

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
  })
  .transform(d => ({
    name: d.name,
    uid: d.uid,
    spec: d.spec,
    status: d.status,
    create_time: d.createTime,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSyncedTable_SyncedTableSpecSchema: z.ZodType = z
  .object({
    postgresDatabase: z.string().optional(),
    branch: z.string().optional(),
    schedulingPolicy: z
      .enum(SyncedTable_SyncedTableSpec_SyncedTableSchedulingPolicy)
      .optional(),
    sourceTableFullName: z.string().optional(),
    primaryKeyColumns: z.array(z.string()).optional(),
    timeseriesKey: z.string().optional(),
    existingPipelineId: z.string().optional(),
    createDatabaseObjectsIfMissing: z.boolean().optional(),
    newPipelineSpec: z.lazy(() => marshalNewPipelineSpecSchema).optional(),
    acceleratedSync: z.boolean().optional(),
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
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSyncedTable_SyncedTableStatusSchema: z.ZodType = z
  .object({
    message: z.string().optional(),
    detailedState: z.enum(SyncedTableState).optional(),
    lastSync: z.lazy(() => marshalSyncedTablePositionSchema).optional(),
    ongoingSyncProgress: z
      .lazy(() => marshalSyncedTablePipelineProgressSchema)
      .optional(),
    provisioningPhase: z.enum(ProvisioningPhase).optional(),
    lastProcessedCommitVersion: z.number().optional(),
    lastSyncTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    pipelineId: z.string().optional(),
    unityCatalogProvisioningState: z.enum(ProvisioningInfo_State).optional(),
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

export const marshalSyncedTableOperationMetadataSchema: z.ZodType = z.object(
  {}
);

export const marshalSyncedTablePipelineProgressSchema: z.ZodType = z
  .object({
    latestVersionCurrentlyProcessing: z.number().optional(),
    syncedRowCount: z.number().optional(),
    totalRowCount: z.number().optional(),
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
    deltaTableSyncInfo: z
      .lazy(() => marshalDeltaTableSyncInfoSchema)
      .optional(),
  })
  .transform(d => ({
    sync_start_time: d.syncStartTime,
    sync_end_time: d.syncEndTime,
    delta_table_sync_info: d.deltaTableSyncInfo,
  }));

export const marshalTableSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    database: z.string().optional(),
    project: z.string().optional(),
    branch: z.string().optional(),
    tableServingUrl: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    database: d.database,
    project: d.project,
    branch: d.branch,
    table_serving_url: d.tableServingUrl,
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

const branchFieldMaskSchema: FieldMaskSchema = {
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

const branchOperationMetadataFieldMaskSchema: FieldMaskSchema = {};

export function branchOperationMetadataFieldMask(
  ...paths: string[]
): FieldMask<BranchOperationMetadata> {
  return FieldMask.build<BranchOperationMetadata>(
    paths,
    branchOperationMetadataFieldMaskSchema
  );
}

const branchSpecFieldMaskSchema: FieldMaskSchema = {
  expireTime: {wire: 'expire_time'},
  isProtected: {wire: 'is_protected'},
  noExpiry: {wire: 'no_expiry'},
  sourceBranch: {wire: 'source_branch'},
  sourceBranchLsn: {wire: 'source_branch_lsn'},
  sourceBranchTime: {wire: 'source_branch_time'},
  ttl: {wire: 'ttl'},
};

export function branchSpecFieldMask(...paths: string[]): FieldMask<BranchSpec> {
  return FieldMask.build<BranchSpec>(paths, branchSpecFieldMaskSchema);
}

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
  stateChangeTime: {wire: 'state_change_time'},
};

export function branchStatusFieldMask(
  ...paths: string[]
): FieldMask<BranchStatus> {
  return FieldMask.build<BranchStatus>(paths, branchStatusFieldMaskSchema);
}

const catalogFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  name: {wire: 'name'},
  spec: {wire: 'spec', children: () => catalog_CatalogSpecFieldMaskSchema},
  status: {
    wire: 'status',
    children: () => catalog_CatalogStatusFieldMaskSchema,
  },
  uid: {wire: 'uid'},
  updateTime: {wire: 'update_time'},
};

export function catalogFieldMask(...paths: string[]): FieldMask<Catalog> {
  return FieldMask.build<Catalog>(paths, catalogFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const catalog_CatalogSpecFieldMaskSchema: FieldMaskSchema = {
  branch: {wire: 'branch'},
  createDatabaseIfMissing: {wire: 'create_database_if_missing'},
  postgresDatabase: {wire: 'postgres_database'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function catalog_CatalogSpecFieldMask(
  ...paths: string[]
): FieldMask<Catalog_CatalogSpec> {
  return FieldMask.build<Catalog_CatalogSpec>(
    paths,
    catalog_CatalogSpecFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const catalog_CatalogStatusFieldMaskSchema: FieldMaskSchema = {
  branch: {wire: 'branch'},
  catalogId: {wire: 'catalog_id'},
  postgresDatabase: {wire: 'postgres_database'},
  project: {wire: 'project'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function catalog_CatalogStatusFieldMask(
  ...paths: string[]
): FieldMask<Catalog_CatalogStatus> {
  return FieldMask.build<Catalog_CatalogStatus>(
    paths,
    catalog_CatalogStatusFieldMaskSchema
  );
}

const catalogOperationMetadataFieldMaskSchema: FieldMaskSchema = {};

export function catalogOperationMetadataFieldMask(
  ...paths: string[]
): FieldMask<CatalogOperationMetadata> {
  return FieldMask.build<CatalogOperationMetadata>(
    paths,
    catalogOperationMetadataFieldMaskSchema
  );
}

const computeInstanceFieldMaskSchema: FieldMaskSchema = {
  computeHost: {wire: 'compute_host'},
  computeInstanceId: {wire: 'compute_instance_id'},
  currentState: {wire: 'current_state'},
  name: {wire: 'name'},
  pendingState: {wire: 'pending_state'},
  role: {wire: 'role'},
  startTime: {wire: 'start_time'},
  suspendTime: {wire: 'suspend_time'},
};

export function computeInstanceFieldMask(
  ...paths: string[]
): FieldMask<ComputeInstance> {
  return FieldMask.build<ComputeInstance>(
    paths,
    computeInstanceFieldMaskSchema
  );
}

const createBranchRequestFieldMaskSchema: FieldMaskSchema = {
  branch: {wire: 'branch', children: () => branchFieldMaskSchema},
  branchId: {wire: 'branch_id'},
  parent: {wire: 'parent'},
};

export function createBranchRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateBranchRequest> {
  return FieldMask.build<CreateBranchRequest>(
    paths,
    createBranchRequestFieldMaskSchema
  );
}

const createCatalogRequestFieldMaskSchema: FieldMaskSchema = {
  catalog: {wire: 'catalog', children: () => catalogFieldMaskSchema},
  catalogId: {wire: 'catalog_id'},
};

export function createCatalogRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateCatalogRequest> {
  return FieldMask.build<CreateCatalogRequest>(
    paths,
    createCatalogRequestFieldMaskSchema
  );
}

const createDatabaseRequestFieldMaskSchema: FieldMaskSchema = {
  database: {wire: 'database', children: () => databaseFieldMaskSchema},
  databaseId: {wire: 'database_id'},
  parent: {wire: 'parent'},
};

export function createDatabaseRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateDatabaseRequest> {
  return FieldMask.build<CreateDatabaseRequest>(
    paths,
    createDatabaseRequestFieldMaskSchema
  );
}

const createEndpointRequestFieldMaskSchema: FieldMaskSchema = {
  endpoint: {wire: 'endpoint', children: () => endpointFieldMaskSchema},
  endpointId: {wire: 'endpoint_id'},
  parent: {wire: 'parent'},
};

export function createEndpointRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateEndpointRequest> {
  return FieldMask.build<CreateEndpointRequest>(
    paths,
    createEndpointRequestFieldMaskSchema
  );
}

const createProjectRequestFieldMaskSchema: FieldMaskSchema = {
  project: {wire: 'project', children: () => projectFieldMaskSchema},
  projectId: {wire: 'project_id'},
};

export function createProjectRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateProjectRequest> {
  return FieldMask.build<CreateProjectRequest>(
    paths,
    createProjectRequestFieldMaskSchema
  );
}

const createRoleRequestFieldMaskSchema: FieldMaskSchema = {
  parent: {wire: 'parent'},
  role: {wire: 'role', children: () => roleFieldMaskSchema},
  roleId: {wire: 'role_id'},
};

export function createRoleRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateRoleRequest> {
  return FieldMask.build<CreateRoleRequest>(
    paths,
    createRoleRequestFieldMaskSchema
  );
}

const createSyncedTableRequestFieldMaskSchema: FieldMaskSchema = {
  syncedTable: {
    wire: 'synced_table',
    children: () => syncedTableFieldMaskSchema,
  },
  syncedTableId: {wire: 'synced_table_id'},
};

export function createSyncedTableRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateSyncedTableRequest> {
  return FieldMask.build<CreateSyncedTableRequest>(
    paths,
    createSyncedTableRequestFieldMaskSchema
  );
}

const createTableRequestFieldMaskSchema: FieldMaskSchema = {
  table: {wire: 'table', children: () => tableFieldMaskSchema},
};

export function createTableRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateTableRequest> {
  return FieldMask.build<CreateTableRequest>(
    paths,
    createTableRequestFieldMaskSchema
  );
}

const databaseFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
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
export function database_DatabaseSpecFieldMask(
  ...paths: string[]
): FieldMask<Database_DatabaseSpec> {
  return FieldMask.build<Database_DatabaseSpec>(
    paths,
    database_DatabaseSpecFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const database_DatabaseStatusFieldMaskSchema: FieldMaskSchema = {
  databaseId: {wire: 'database_id'},
  postgresDatabase: {wire: 'postgres_database'},
  role: {wire: 'role'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function database_DatabaseStatusFieldMask(
  ...paths: string[]
): FieldMask<Database_DatabaseStatus> {
  return FieldMask.build<Database_DatabaseStatus>(
    paths,
    database_DatabaseStatusFieldMaskSchema
  );
}

const databaseCredentialFieldMaskSchema: FieldMaskSchema = {
  expireTime: {wire: 'expire_time'},
  token: {wire: 'token'},
};

export function databaseCredentialFieldMask(
  ...paths: string[]
): FieldMask<DatabaseCredential> {
  return FieldMask.build<DatabaseCredential>(
    paths,
    databaseCredentialFieldMaskSchema
  );
}

const databaseOperationMetadataFieldMaskSchema: FieldMaskSchema = {};

export function databaseOperationMetadataFieldMask(
  ...paths: string[]
): FieldMask<DatabaseOperationMetadata> {
  return FieldMask.build<DatabaseOperationMetadata>(
    paths,
    databaseOperationMetadataFieldMaskSchema
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

const deleteBranchRequestFieldMaskSchema: FieldMaskSchema = {
  allowMissing: {wire: 'allow_missing'},
  name: {wire: 'name'},
  purge: {wire: 'purge'},
};

export function deleteBranchRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteBranchRequest> {
  return FieldMask.build<DeleteBranchRequest>(
    paths,
    deleteBranchRequestFieldMaskSchema
  );
}

const deleteCatalogRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function deleteCatalogRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteCatalogRequest> {
  return FieldMask.build<DeleteCatalogRequest>(
    paths,
    deleteCatalogRequestFieldMaskSchema
  );
}

const deleteDatabaseRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function deleteDatabaseRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteDatabaseRequest> {
  return FieldMask.build<DeleteDatabaseRequest>(
    paths,
    deleteDatabaseRequestFieldMaskSchema
  );
}

const deleteEndpointRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function deleteEndpointRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteEndpointRequest> {
  return FieldMask.build<DeleteEndpointRequest>(
    paths,
    deleteEndpointRequestFieldMaskSchema
  );
}

const deleteForwardEtlConfigurationRequestFieldMaskSchema: FieldMaskSchema = {
  parent: {wire: 'parent'},
  pgDatabaseOid: {wire: 'pg_database_oid'},
  pgSchemaOid: {wire: 'pg_schema_oid'},
  tenantId: {wire: 'tenant_id'},
  timelineId: {wire: 'timeline_id'},
};

export function deleteForwardEtlConfigurationRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteForwardEtlConfigurationRequest> {
  return FieldMask.build<DeleteForwardEtlConfigurationRequest>(
    paths,
    deleteForwardEtlConfigurationRequestFieldMaskSchema
  );
}

const deleteForwardEtlConfigurationResponseFieldMaskSchema: FieldMaskSchema = {
  deletedConfigs: {wire: 'deleted_configs'},
  deletedMappings: {wire: 'deleted_mappings'},
};

export function deleteForwardEtlConfigurationResponseFieldMask(
  ...paths: string[]
): FieldMask<DeleteForwardEtlConfigurationResponse> {
  return FieldMask.build<DeleteForwardEtlConfigurationResponse>(
    paths,
    deleteForwardEtlConfigurationResponseFieldMaskSchema
  );
}

const deleteProjectRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
  purge: {wire: 'purge'},
};

export function deleteProjectRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteProjectRequest> {
  return FieldMask.build<DeleteProjectRequest>(
    paths,
    deleteProjectRequestFieldMaskSchema
  );
}

const deleteRoleRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
  reassignOwnedTo: {wire: 'reassign_owned_to'},
};

export function deleteRoleRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteRoleRequest> {
  return FieldMask.build<DeleteRoleRequest>(
    paths,
    deleteRoleRequestFieldMaskSchema
  );
}

const deleteSyncedTableRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function deleteSyncedTableRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteSyncedTableRequest> {
  return FieldMask.build<DeleteSyncedTableRequest>(
    paths,
    deleteSyncedTableRequestFieldMaskSchema
  );
}

const deleteTableRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function deleteTableRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteTableRequest> {
  return FieldMask.build<DeleteTableRequest>(
    paths,
    deleteTableRequestFieldMaskSchema
  );
}

const deltaTableSyncInfoFieldMaskSchema: FieldMaskSchema = {
  deltaCommitTime: {wire: 'delta_commit_time'},
  deltaCommitVersion: {wire: 'delta_commit_version'},
};

export function deltaTableSyncInfoFieldMask(
  ...paths: string[]
): FieldMask<DeltaTableSyncInfo> {
  return FieldMask.build<DeltaTableSyncInfo>(
    paths,
    deltaTableSyncInfoFieldMaskSchema
  );
}

const disableForwardEtlRequestFieldMaskSchema: FieldMaskSchema = {
  parent: {wire: 'parent'},
  pgDatabaseOid: {wire: 'pg_database_oid'},
  pgSchemaOid: {wire: 'pg_schema_oid'},
  tenantId: {wire: 'tenant_id'},
  timelineId: {wire: 'timeline_id'},
};

export function disableForwardEtlRequestFieldMask(
  ...paths: string[]
): FieldMask<DisableForwardEtlRequest> {
  return FieldMask.build<DisableForwardEtlRequest>(
    paths,
    disableForwardEtlRequestFieldMaskSchema
  );
}

const disableForwardEtlResponseFieldMaskSchema: FieldMaskSchema = {
  disabled: {wire: 'disabled'},
};

export function disableForwardEtlResponseFieldMask(
  ...paths: string[]
): FieldMask<DisableForwardEtlResponse> {
  return FieldMask.build<DisableForwardEtlResponse>(
    paths,
    disableForwardEtlResponseFieldMaskSchema
  );
}

const endpointFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
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

export function endpointGroupSpecFieldMask(
  ...paths: string[]
): FieldMask<EndpointGroupSpec> {
  return FieldMask.build<EndpointGroupSpec>(
    paths,
    endpointGroupSpecFieldMaskSchema
  );
}

const endpointGroupStatusFieldMaskSchema: FieldMaskSchema = {
  enableReadableSecondaries: {wire: 'enable_readable_secondaries'},
  max: {wire: 'max'},
  min: {wire: 'min'},
};

export function endpointGroupStatusFieldMask(
  ...paths: string[]
): FieldMask<EndpointGroupStatus> {
  return FieldMask.build<EndpointGroupStatus>(
    paths,
    endpointGroupStatusFieldMaskSchema
  );
}

const endpointHostsFieldMaskSchema: FieldMaskSchema = {
  host: {wire: 'host'},
  readOnlyHost: {wire: 'read_only_host'},
  readOnlyPooledHost: {wire: 'read_only_pooled_host'},
  readWritePooledHost: {wire: 'read_write_pooled_host'},
};

export function endpointHostsFieldMask(
  ...paths: string[]
): FieldMask<EndpointHosts> {
  return FieldMask.build<EndpointHosts>(paths, endpointHostsFieldMaskSchema);
}

const endpointOperationMetadataFieldMaskSchema: FieldMaskSchema = {};

export function endpointOperationMetadataFieldMask(
  ...paths: string[]
): FieldMask<EndpointOperationMetadata> {
  return FieldMask.build<EndpointOperationMetadata>(
    paths,
    endpointOperationMetadataFieldMaskSchema
  );
}

const endpointSettingsFieldMaskSchema: FieldMaskSchema = {
  pgSettings: {wire: 'pg_settings'},
};

export function endpointSettingsFieldMask(
  ...paths: string[]
): FieldMask<EndpointSettings> {
  return FieldMask.build<EndpointSettings>(
    paths,
    endpointSettingsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const endpointSettings_PgSettingsEntryFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function endpointSettings_PgSettingsEntryFieldMask(
  ...paths: string[]
): FieldMask<EndpointSettings_PgSettingsEntry> {
  return FieldMask.build<EndpointSettings_PgSettingsEntry>(
    paths,
    endpointSettings_PgSettingsEntryFieldMaskSchema
  );
}

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

export function endpointSpecFieldMask(
  ...paths: string[]
): FieldMask<EndpointSpec> {
  return FieldMask.build<EndpointSpec>(paths, endpointSpecFieldMaskSchema);
}

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

export function endpointStatusFieldMask(
  ...paths: string[]
): FieldMask<EndpointStatus> {
  return FieldMask.build<EndpointStatus>(paths, endpointStatusFieldMaskSchema);
}

const forwardEtlConfigFieldMaskSchema: FieldMaskSchema = {
  createTimeMillis: {wire: 'create_time_millis'},
  enabled: {wire: 'enabled'},
  pgDatabaseOid: {wire: 'pg_database_oid'},
  pgSchemaOid: {wire: 'pg_schema_oid'},
  tenantId: {wire: 'tenant_id'},
  timelineId: {wire: 'timeline_id'},
  ucCatalogId: {wire: 'uc_catalog_id'},
  ucSchemaId: {wire: 'uc_schema_id'},
  updateTimeMillis: {wire: 'update_time_millis'},
  workspaceId: {wire: 'workspace_id'},
};

export function forwardEtlConfigFieldMask(
  ...paths: string[]
): FieldMask<ForwardEtlConfig> {
  return FieldMask.build<ForwardEtlConfig>(
    paths,
    forwardEtlConfigFieldMaskSchema
  );
}

const forwardEtlDatabaseFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
  oid: {wire: 'oid'},
};

export function forwardEtlDatabaseFieldMask(
  ...paths: string[]
): FieldMask<ForwardEtlDatabase> {
  return FieldMask.build<ForwardEtlDatabase>(
    paths,
    forwardEtlDatabaseFieldMaskSchema
  );
}

const forwardEtlMetadataFieldMaskSchema: FieldMaskSchema = {
  databases: {wire: 'databases'},
  schemas: {wire: 'schemas'},
};

export function forwardEtlMetadataFieldMask(
  ...paths: string[]
): FieldMask<ForwardEtlMetadata> {
  return FieldMask.build<ForwardEtlMetadata>(
    paths,
    forwardEtlMetadataFieldMaskSchema
  );
}

const forwardEtlSchemaFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
  oid: {wire: 'oid'},
};

export function forwardEtlSchemaFieldMask(
  ...paths: string[]
): FieldMask<ForwardEtlSchema> {
  return FieldMask.build<ForwardEtlSchema>(
    paths,
    forwardEtlSchemaFieldMaskSchema
  );
}

const forwardEtlStatusFieldMaskSchema: FieldMaskSchema = {
  configurations: {wire: 'configurations'},
  tableMappings: {wire: 'table_mappings'},
};

export function forwardEtlStatusFieldMask(
  ...paths: string[]
): FieldMask<ForwardEtlStatus> {
  return FieldMask.build<ForwardEtlStatus>(
    paths,
    forwardEtlStatusFieldMaskSchema
  );
}

const forwardEtlTableMappingFieldMaskSchema: FieldMaskSchema = {
  enabled: {wire: 'enabled'},
  lastSyncedLsn: {wire: 'last_synced_lsn'},
  pgTableName: {wire: 'pg_table_name'},
  pgTableOid: {wire: 'pg_table_oid'},
  ucTableId: {wire: 'uc_table_id'},
  ucTableName: {wire: 'uc_table_name'},
};

export function forwardEtlTableMappingFieldMask(
  ...paths: string[]
): FieldMask<ForwardEtlTableMapping> {
  return FieldMask.build<ForwardEtlTableMapping>(
    paths,
    forwardEtlTableMappingFieldMaskSchema
  );
}

const generateDatabaseCredentialRequestFieldMaskSchema: FieldMaskSchema = {
  claims: {wire: 'claims'},
  endpoint: {wire: 'endpoint'},
  expireTime: {wire: 'expire_time'},
  groupName: {wire: 'group_name'},
  ttl: {wire: 'ttl'},
};

export function generateDatabaseCredentialRequestFieldMask(
  ...paths: string[]
): FieldMask<GenerateDatabaseCredentialRequest> {
  return FieldMask.build<GenerateDatabaseCredentialRequest>(
    paths,
    generateDatabaseCredentialRequestFieldMaskSchema
  );
}

const getBranchRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getBranchRequestFieldMask(
  ...paths: string[]
): FieldMask<GetBranchRequest> {
  return FieldMask.build<GetBranchRequest>(
    paths,
    getBranchRequestFieldMaskSchema
  );
}

const getCatalogRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getCatalogRequestFieldMask(
  ...paths: string[]
): FieldMask<GetCatalogRequest> {
  return FieldMask.build<GetCatalogRequest>(
    paths,
    getCatalogRequestFieldMaskSchema
  );
}

const getComputeInstanceRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getComputeInstanceRequestFieldMask(
  ...paths: string[]
): FieldMask<GetComputeInstanceRequest> {
  return FieldMask.build<GetComputeInstanceRequest>(
    paths,
    getComputeInstanceRequestFieldMaskSchema
  );
}

const getDatabaseRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getDatabaseRequestFieldMask(
  ...paths: string[]
): FieldMask<GetDatabaseRequest> {
  return FieldMask.build<GetDatabaseRequest>(
    paths,
    getDatabaseRequestFieldMaskSchema
  );
}

const getEndpointRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getEndpointRequestFieldMask(
  ...paths: string[]
): FieldMask<GetEndpointRequest> {
  return FieldMask.build<GetEndpointRequest>(
    paths,
    getEndpointRequestFieldMaskSchema
  );
}

const getForwardEtlMetadataRequestFieldMaskSchema: FieldMaskSchema = {
  parent: {wire: 'parent'},
  tenantId: {wire: 'tenant_id'},
  timelineId: {wire: 'timeline_id'},
};

export function getForwardEtlMetadataRequestFieldMask(
  ...paths: string[]
): FieldMask<GetForwardEtlMetadataRequest> {
  return FieldMask.build<GetForwardEtlMetadataRequest>(
    paths,
    getForwardEtlMetadataRequestFieldMaskSchema
  );
}

const getForwardEtlStatusRequestFieldMaskSchema: FieldMaskSchema = {
  parent: {wire: 'parent'},
  tenantId: {wire: 'tenant_id'},
  timelineId: {wire: 'timeline_id'},
};

export function getForwardEtlStatusRequestFieldMask(
  ...paths: string[]
): FieldMask<GetForwardEtlStatusRequest> {
  return FieldMask.build<GetForwardEtlStatusRequest>(
    paths,
    getForwardEtlStatusRequestFieldMaskSchema
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

const getProjectRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getProjectRequestFieldMask(
  ...paths: string[]
): FieldMask<GetProjectRequest> {
  return FieldMask.build<GetProjectRequest>(
    paths,
    getProjectRequestFieldMaskSchema
  );
}

const getRoleRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getRoleRequestFieldMask(
  ...paths: string[]
): FieldMask<GetRoleRequest> {
  return FieldMask.build<GetRoleRequest>(paths, getRoleRequestFieldMaskSchema);
}

const getSyncedTableRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getSyncedTableRequestFieldMask(
  ...paths: string[]
): FieldMask<GetSyncedTableRequest> {
  return FieldMask.build<GetSyncedTableRequest>(
    paths,
    getSyncedTableRequestFieldMaskSchema
  );
}

const getTableRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function getTableRequestFieldMask(
  ...paths: string[]
): FieldMask<GetTableRequest> {
  return FieldMask.build<GetTableRequest>(
    paths,
    getTableRequestFieldMaskSchema
  );
}

const initialEndpointSpecFieldMaskSchema: FieldMaskSchema = {
  group: {wire: 'group', children: () => endpointGroupSpecFieldMaskSchema},
};

export function initialEndpointSpecFieldMask(
  ...paths: string[]
): FieldMask<InitialEndpointSpec> {
  return FieldMask.build<InitialEndpointSpec>(
    paths,
    initialEndpointSpecFieldMaskSchema
  );
}

const listBranchesRequestFieldMaskSchema: FieldMaskSchema = {
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
  parent: {wire: 'parent'},
  showDeleted: {wire: 'show_deleted'},
};

export function listBranchesRequestFieldMask(
  ...paths: string[]
): FieldMask<ListBranchesRequest> {
  return FieldMask.build<ListBranchesRequest>(
    paths,
    listBranchesRequestFieldMaskSchema
  );
}

const listBranchesResponseFieldMaskSchema: FieldMaskSchema = {
  branches: {wire: 'branches'},
  nextPageToken: {wire: 'next_page_token'},
};

export function listBranchesResponseFieldMask(
  ...paths: string[]
): FieldMask<ListBranchesResponse> {
  return FieldMask.build<ListBranchesResponse>(
    paths,
    listBranchesResponseFieldMaskSchema
  );
}

const listComputeInstancesRequestFieldMaskSchema: FieldMaskSchema = {
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
  parent: {wire: 'parent'},
};

export function listComputeInstancesRequestFieldMask(
  ...paths: string[]
): FieldMask<ListComputeInstancesRequest> {
  return FieldMask.build<ListComputeInstancesRequest>(
    paths,
    listComputeInstancesRequestFieldMaskSchema
  );
}

const listComputeInstancesResponseFieldMaskSchema: FieldMaskSchema = {
  computeInstances: {wire: 'compute_instances'},
  nextPageToken: {wire: 'next_page_token'},
};

export function listComputeInstancesResponseFieldMask(
  ...paths: string[]
): FieldMask<ListComputeInstancesResponse> {
  return FieldMask.build<ListComputeInstancesResponse>(
    paths,
    listComputeInstancesResponseFieldMaskSchema
  );
}

const listDatabasesRequestFieldMaskSchema: FieldMaskSchema = {
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
  parent: {wire: 'parent'},
};

export function listDatabasesRequestFieldMask(
  ...paths: string[]
): FieldMask<ListDatabasesRequest> {
  return FieldMask.build<ListDatabasesRequest>(
    paths,
    listDatabasesRequestFieldMaskSchema
  );
}

const listDatabasesResponseFieldMaskSchema: FieldMaskSchema = {
  databases: {wire: 'databases'},
  nextPageToken: {wire: 'next_page_token'},
};

export function listDatabasesResponseFieldMask(
  ...paths: string[]
): FieldMask<ListDatabasesResponse> {
  return FieldMask.build<ListDatabasesResponse>(
    paths,
    listDatabasesResponseFieldMaskSchema
  );
}

const listEndpointsRequestFieldMaskSchema: FieldMaskSchema = {
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
  parent: {wire: 'parent'},
};

export function listEndpointsRequestFieldMask(
  ...paths: string[]
): FieldMask<ListEndpointsRequest> {
  return FieldMask.build<ListEndpointsRequest>(
    paths,
    listEndpointsRequestFieldMaskSchema
  );
}

const listEndpointsResponseFieldMaskSchema: FieldMaskSchema = {
  endpoints: {wire: 'endpoints'},
  nextPageToken: {wire: 'next_page_token'},
};

export function listEndpointsResponseFieldMask(
  ...paths: string[]
): FieldMask<ListEndpointsResponse> {
  return FieldMask.build<ListEndpointsResponse>(
    paths,
    listEndpointsResponseFieldMaskSchema
  );
}

const listProjectsRequestFieldMaskSchema: FieldMaskSchema = {
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
  showDeleted: {wire: 'show_deleted'},
};

export function listProjectsRequestFieldMask(
  ...paths: string[]
): FieldMask<ListProjectsRequest> {
  return FieldMask.build<ListProjectsRequest>(
    paths,
    listProjectsRequestFieldMaskSchema
  );
}

const listProjectsResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  projects: {wire: 'projects'},
};

export function listProjectsResponseFieldMask(
  ...paths: string[]
): FieldMask<ListProjectsResponse> {
  return FieldMask.build<ListProjectsResponse>(
    paths,
    listProjectsResponseFieldMaskSchema
  );
}

const listRolesRequestFieldMaskSchema: FieldMaskSchema = {
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
  parent: {wire: 'parent'},
};

export function listRolesRequestFieldMask(
  ...paths: string[]
): FieldMask<ListRolesRequest> {
  return FieldMask.build<ListRolesRequest>(
    paths,
    listRolesRequestFieldMaskSchema
  );
}

const listRolesResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  roles: {wire: 'roles'},
};

export function listRolesResponseFieldMask(
  ...paths: string[]
): FieldMask<ListRolesResponse> {
  return FieldMask.build<ListRolesResponse>(
    paths,
    listRolesResponseFieldMaskSchema
  );
}

const newPipelineSpecFieldMaskSchema: FieldMaskSchema = {
  budgetPolicyId: {wire: 'budget_policy_id'},
  pipelineChannel: {wire: 'pipeline_channel'},
  storageCatalog: {wire: 'storage_catalog'},
  storageSchema: {wire: 'storage_schema'},
};

export function newPipelineSpecFieldMask(
  ...paths: string[]
): FieldMask<NewPipelineSpec> {
  return FieldMask.build<NewPipelineSpec>(
    paths,
    newPipelineSpecFieldMaskSchema
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

const projectFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  deleteTime: {wire: 'delete_time'},
  initialEndpointSpec: {
    wire: 'initial_endpoint_spec',
    children: () => initialEndpointSpecFieldMaskSchema,
  },
  name: {wire: 'name'},
  purgeTime: {wire: 'purge_time'},
  spec: {wire: 'spec', children: () => projectSpecFieldMaskSchema},
  status: {wire: 'status', children: () => projectStatusFieldMaskSchema},
  uid: {wire: 'uid'},
  updateTime: {wire: 'update_time'},
};

export function projectFieldMask(...paths: string[]): FieldMask<Project> {
  return FieldMask.build<Project>(paths, projectFieldMaskSchema);
}

const projectCustomTagFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

export function projectCustomTagFieldMask(
  ...paths: string[]
): FieldMask<ProjectCustomTag> {
  return FieldMask.build<ProjectCustomTag>(
    paths,
    projectCustomTagFieldMaskSchema
  );
}

const projectDefaultEndpointSettingsFieldMaskSchema: FieldMaskSchema = {
  autoscalingLimitMaxCu: {wire: 'autoscaling_limit_max_cu'},
  autoscalingLimitMinCu: {wire: 'autoscaling_limit_min_cu'},
  noSuspension: {wire: 'no_suspension'},
  pgSettings: {wire: 'pg_settings'},
  suspendTimeoutDuration: {wire: 'suspend_timeout_duration'},
};

export function projectDefaultEndpointSettingsFieldMask(
  ...paths: string[]
): FieldMask<ProjectDefaultEndpointSettings> {
  return FieldMask.build<ProjectDefaultEndpointSettings>(
    paths,
    projectDefaultEndpointSettingsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const projectDefaultEndpointSettings_PgSettingsEntryFieldMaskSchema: FieldMaskSchema =
  {
    key: {wire: 'key'},
    value: {wire: 'value'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function projectDefaultEndpointSettings_PgSettingsEntryFieldMask(
  ...paths: string[]
): FieldMask<ProjectDefaultEndpointSettings_PgSettingsEntry> {
  return FieldMask.build<ProjectDefaultEndpointSettings_PgSettingsEntry>(
    paths,
    projectDefaultEndpointSettings_PgSettingsEntryFieldMaskSchema
  );
}

const projectOperationMetadataFieldMaskSchema: FieldMaskSchema = {};

export function projectOperationMetadataFieldMask(
  ...paths: string[]
): FieldMask<ProjectOperationMetadata> {
  return FieldMask.build<ProjectOperationMetadata>(
    paths,
    projectOperationMetadataFieldMaskSchema
  );
}

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
  workspaceKeyEncrypted: {wire: 'workspace_key_encrypted'},
};

export function projectSpecFieldMask(
  ...paths: string[]
): FieldMask<ProjectSpec> {
  return FieldMask.build<ProjectSpec>(paths, projectSpecFieldMaskSchema);
}

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

export function projectStatusFieldMask(
  ...paths: string[]
): FieldMask<ProjectStatus> {
  return FieldMask.build<ProjectStatus>(paths, projectStatusFieldMaskSchema);
}

const provisioningInfoFieldMaskSchema: FieldMaskSchema = {};

export function provisioningInfoFieldMask(
  ...paths: string[]
): FieldMask<ProvisioningInfo> {
  return FieldMask.build<ProvisioningInfo>(
    paths,
    provisioningInfoFieldMaskSchema
  );
}

const requestedClaimsFieldMaskSchema: FieldMaskSchema = {
  permissionSet: {wire: 'permission_set'},
  resources: {wire: 'resources'},
};

export function requestedClaimsFieldMask(
  ...paths: string[]
): FieldMask<RequestedClaims> {
  return FieldMask.build<RequestedClaims>(
    paths,
    requestedClaimsFieldMaskSchema
  );
}

const requestedResourceFieldMaskSchema: FieldMaskSchema = {
  tableName: {wire: 'table_name'},
  unspecifiedResourceName: {wire: 'unspecified_resource_name'},
};

export function requestedResourceFieldMask(
  ...paths: string[]
): FieldMask<RequestedResource> {
  return FieldMask.build<RequestedResource>(
    paths,
    requestedResourceFieldMaskSchema
  );
}

const roleFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  name: {wire: 'name'},
  parent: {wire: 'parent'},
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
export function role_AttributesFieldMask(
  ...paths: string[]
): FieldMask<Role_Attributes> {
  return FieldMask.build<Role_Attributes>(
    paths,
    role_AttributesFieldMaskSchema
  );
}

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
export function role_RoleSpecFieldMask(
  ...paths: string[]
): FieldMask<Role_RoleSpec> {
  return FieldMask.build<Role_RoleSpec>(paths, role_RoleSpecFieldMaskSchema);
}

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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function role_RoleStatusFieldMask(
  ...paths: string[]
): FieldMask<Role_RoleStatus> {
  return FieldMask.build<Role_RoleStatus>(
    paths,
    role_RoleStatusFieldMaskSchema
  );
}

const roleOperationMetadataFieldMaskSchema: FieldMaskSchema = {};

export function roleOperationMetadataFieldMask(
  ...paths: string[]
): FieldMask<RoleOperationMetadata> {
  return FieldMask.build<RoleOperationMetadata>(
    paths,
    roleOperationMetadataFieldMaskSchema
  );
}

const syncedTableFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  name: {wire: 'name'},
  spec: {
    wire: 'spec',
    children: () => syncedTable_SyncedTableSpecFieldMaskSchema,
  },
  status: {
    wire: 'status',
    children: () => syncedTable_SyncedTableStatusFieldMaskSchema,
  },
  uid: {wire: 'uid'},
};

export function syncedTableFieldMask(
  ...paths: string[]
): FieldMask<SyncedTable> {
  return FieldMask.build<SyncedTable>(paths, syncedTableFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const syncedTable_SyncedTableSpecFieldMaskSchema: FieldMaskSchema = {
  acceleratedSync: {wire: 'accelerated_sync'},
  branch: {wire: 'branch'},
  createDatabaseObjectsIfMissing: {wire: 'create_database_objects_if_missing'},
  existingPipelineId: {wire: 'existing_pipeline_id'},
  newPipelineSpec: {
    wire: 'new_pipeline_spec',
    children: () => newPipelineSpecFieldMaskSchema,
  },
  postgresDatabase: {wire: 'postgres_database'},
  primaryKeyColumns: {wire: 'primary_key_columns'},
  schedulingPolicy: {wire: 'scheduling_policy'},
  sourceTableFullName: {wire: 'source_table_full_name'},
  timeseriesKey: {wire: 'timeseries_key'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function syncedTable_SyncedTableSpecFieldMask(
  ...paths: string[]
): FieldMask<SyncedTable_SyncedTableSpec> {
  return FieldMask.build<SyncedTable_SyncedTableSpec>(
    paths,
    syncedTable_SyncedTableSpecFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const syncedTable_SyncedTableStatusFieldMaskSchema: FieldMaskSchema = {
  detailedState: {wire: 'detailed_state'},
  lastProcessedCommitVersion: {wire: 'last_processed_commit_version'},
  lastSync: {
    wire: 'last_sync',
    children: () => syncedTablePositionFieldMaskSchema,
  },
  lastSyncTime: {wire: 'last_sync_time'},
  message: {wire: 'message'},
  ongoingSyncProgress: {
    wire: 'ongoing_sync_progress',
    children: () => syncedTablePipelineProgressFieldMaskSchema,
  },
  pipelineId: {wire: 'pipeline_id'},
  project: {wire: 'project'},
  provisioningPhase: {wire: 'provisioning_phase'},
  unityCatalogProvisioningState: {wire: 'unity_catalog_provisioning_state'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function syncedTable_SyncedTableStatusFieldMask(
  ...paths: string[]
): FieldMask<SyncedTable_SyncedTableStatus> {
  return FieldMask.build<SyncedTable_SyncedTableStatus>(
    paths,
    syncedTable_SyncedTableStatusFieldMaskSchema
  );
}

const syncedTableOperationMetadataFieldMaskSchema: FieldMaskSchema = {};

export function syncedTableOperationMetadataFieldMask(
  ...paths: string[]
): FieldMask<SyncedTableOperationMetadata> {
  return FieldMask.build<SyncedTableOperationMetadata>(
    paths,
    syncedTableOperationMetadataFieldMaskSchema
  );
}

const syncedTablePipelineProgressFieldMaskSchema: FieldMaskSchema = {
  estimatedCompletionTimeSeconds: {wire: 'estimated_completion_time_seconds'},
  latestVersionCurrentlyProcessing: {
    wire: 'latest_version_currently_processing',
  },
  syncProgressCompletion: {wire: 'sync_progress_completion'},
  syncedRowCount: {wire: 'synced_row_count'},
  totalRowCount: {wire: 'total_row_count'},
};

export function syncedTablePipelineProgressFieldMask(
  ...paths: string[]
): FieldMask<SyncedTablePipelineProgress> {
  return FieldMask.build<SyncedTablePipelineProgress>(
    paths,
    syncedTablePipelineProgressFieldMaskSchema
  );
}

const syncedTablePositionFieldMaskSchema: FieldMaskSchema = {
  deltaTableSyncInfo: {
    wire: 'delta_table_sync_info',
    children: () => deltaTableSyncInfoFieldMaskSchema,
  },
  syncEndTime: {wire: 'sync_end_time'},
  syncStartTime: {wire: 'sync_start_time'},
};

export function syncedTablePositionFieldMask(
  ...paths: string[]
): FieldMask<SyncedTablePosition> {
  return FieldMask.build<SyncedTablePosition>(
    paths,
    syncedTablePositionFieldMaskSchema
  );
}

const tableFieldMaskSchema: FieldMaskSchema = {
  branch: {wire: 'branch'},
  database: {wire: 'database'},
  name: {wire: 'name'},
  project: {wire: 'project'},
  tableServingUrl: {wire: 'table_serving_url'},
};

export function tableFieldMask(...paths: string[]): FieldMask<Table> {
  return FieldMask.build<Table>(paths, tableFieldMaskSchema);
}

const undeleteBranchRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function undeleteBranchRequestFieldMask(
  ...paths: string[]
): FieldMask<UndeleteBranchRequest> {
  return FieldMask.build<UndeleteBranchRequest>(
    paths,
    undeleteBranchRequestFieldMaskSchema
  );
}

const undeleteProjectRequestFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function undeleteProjectRequestFieldMask(
  ...paths: string[]
): FieldMask<UndeleteProjectRequest> {
  return FieldMask.build<UndeleteProjectRequest>(
    paths,
    undeleteProjectRequestFieldMaskSchema
  );
}

const updateBranchRequestFieldMaskSchema: FieldMaskSchema = {
  branch: {wire: 'branch', children: () => branchFieldMaskSchema},
  updateMask: {wire: 'update_mask'},
};

export function updateBranchRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateBranchRequest> {
  return FieldMask.build<UpdateBranchRequest>(
    paths,
    updateBranchRequestFieldMaskSchema
  );
}

const updateDatabaseRequestFieldMaskSchema: FieldMaskSchema = {
  database: {wire: 'database', children: () => databaseFieldMaskSchema},
  updateMask: {wire: 'update_mask'},
};

export function updateDatabaseRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateDatabaseRequest> {
  return FieldMask.build<UpdateDatabaseRequest>(
    paths,
    updateDatabaseRequestFieldMaskSchema
  );
}

const updateEndpointRequestFieldMaskSchema: FieldMaskSchema = {
  endpoint: {wire: 'endpoint', children: () => endpointFieldMaskSchema},
  updateMask: {wire: 'update_mask'},
};

export function updateEndpointRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateEndpointRequest> {
  return FieldMask.build<UpdateEndpointRequest>(
    paths,
    updateEndpointRequestFieldMaskSchema
  );
}

const updateProjectRequestFieldMaskSchema: FieldMaskSchema = {
  project: {wire: 'project', children: () => projectFieldMaskSchema},
  updateMask: {wire: 'update_mask'},
};

export function updateProjectRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateProjectRequest> {
  return FieldMask.build<UpdateProjectRequest>(
    paths,
    updateProjectRequestFieldMaskSchema
  );
}

const updateRoleRequestFieldMaskSchema: FieldMaskSchema = {
  role: {wire: 'role', children: () => roleFieldMaskSchema},
  updateMask: {wire: 'update_mask'},
};

export function updateRoleRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateRoleRequest> {
  return FieldMask.build<UpdateRoleRequest>(
    paths,
    updateRoleRequestFieldMaskSchema
  );
}
