// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

/**
 * LaunchStage represent the lifecycle stage of an API component. Every API
 * component is expected to progress through these stages in the following
 * order: DEVELOPMENT -> PRIVATE_PREVIEW -> PUBLIC_BETA -> PUBLIC_PREVIEW -> GA.
 */
export enum LaunchStage {
  /**
   * LAUNCH_STAGE_UNSPECIFIED indicates that the launch stage is inherited
   * from the parent component(s).
   *
   * If the component has multiple parents, it inherits the parent launch stage that
   * is the further along in the DEVELOPMENT -> PRIVATE_PREVIEW -> PUBLIC_PREVIEW -> GA order.
   *
   * Example: A message without an explicit launch stage, used by a GA method
   * and a PRIVATE_PREVIEW method, will inherit the GA launch stage.
   */
  LAUNCH_STAGE_UNSPECIFIED = 'LAUNCH_STAGE_UNSPECIFIED',
  /**
   * DEVELOPMENT represents the initial stage for API components. This stage is
   * intended for internal testing and early validation.
   *
   * - API documentation: disabled
   * - Ecosystem tools:   disabled
   * - Breaking changes:  allowed
   */
  DEVELOPMENT = 'DEVELOPMENT',
  /**
   * PRIVATE_PREVIEW indicates a stage where the API is available for selected
   * customers and early feedback.
   *
   * - API documentation: disabled
   * - Ecosystem tools:   enabled
   * - Breaking changes:  allowed
   */
  PRIVATE_PREVIEW = 'PRIVATE_PREVIEW',
  /**
   * PUBLIC_BETA indicates a stage where the API is available for all customers
   * but stability is not guaranteed.
   *
   * - API documentation: enabled
   * - Ecosystem tools:   enabled
   * - Breaking changes:  allowed
   */
  PUBLIC_BETA = 'PUBLIC_BETA',
  /**
   * PUBLIC_PREVIEW signifies a stage where the API is stable and ready for
   * production use.
   *
   * - API documentation: enabled
   * - Ecosystem tools:   enabled
   * - Breaking changes:  forbidden
   */
  PUBLIC_PREVIEW = 'PUBLIC_PREVIEW',
  /**
   * GA (General Availability) indicates that the API is stable and ready
   * for production use.
   *
   * - API documentation: enabled
   * - Ecosystem tools:   enabled
   * - Breaking changes:  forbidden
   */
  GA = 'GA',
}

/**
 * SDK generation hints for a proto field.
 *
 * These annotations guide SDK code generators in producing correct
 * client code. They do not affect wire format or server behavior.
 */
export interface FieldMetadata {
  /**
   * When true, the field value may contain path separators (e.g., "/a/b/c")
   * and should be treated as a multi-segment path parameter rather than a
   * single path segment.
   */
  isMultiSegment?: boolean | undefined;
  /**
   * When true, the field carries a raw byte stream (e.g., file contents)
   * rather than a small binary blob. SDK generators use this to send/receive
   * the data as a streaming body (application/octet-stream) instead of
   * base64-encoding it into JSON.
   */
  isStream?: boolean | undefined;
  /**
   * For google.protobuf.FieldMask fields used in update requests, the name of
   * the sibling field in the request message that the mask paths are relative
   * to. SDK generators use this to scope mask paths to the nested resource
   * rather than the request envelope.
   */
  updateMaskRoot?: string | undefined;
}

/**
 * Long-Running Operation (LRO) configuration for API methods.
 *
 * This annotation is used to mark methods that return a long-running operation
 * and specify the associated operation management methods and types.
 *
 * Long-running operations are asynchronous operations that may take an
 * extended period of time to complete. Instead of blocking until completion,
 * these methods immediately return an operation handle that can be used to
 * track progress and retrieve results.
 */
export interface LongRunningOperation {
  /**
   * Type information for the operation.
   *
   * Specifies what response and metadata types are used by this operation.
   */
  operationInfo?: LongRunningOperation_OperationInfo | undefined;
  /**
   * Operation management methods.
   *
   * References to the methods that clients can use to interact with
   * the long-running operation after it has been initiated.
   */
  operationMethods?: LongRunningOperation_OperationMethods | undefined;
}

/** Specifies the response and metadata types for the operation. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface LongRunningOperation_OperationInfo {
  /**
   * The message type name for the operation's final response.
   *
   * This is the type that will be returned when the operation completes
   * successfully. Use the simple message name (not fully-qualified).
   *
   * Example: "CreateClusterResponse"
   */
  responseType?: string | undefined;
  /**
   * The message type name for the operation's metadata.
   *
   * This type contains intermediate status and progress information
   * during operation execution. Use the simple message name (not fully-qualified).
   *
   * Example: "CreateClusterMetadata"
   */
  metadataType?: string | undefined;
}

/**
 * References to methods that manage the long-running operation.
 *
 * These methods allow clients to check status, wait for completion,
 * list operations, and cancel or delete operations.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface LongRunningOperation_OperationMethods {
  /**
   * Method name to retrieve the current status of an operation.
   *
   * This method is required and should accept an operation ID and
   * return the current operation state.
   *
   * Example: "GetOperation"
   */
  get?: string | undefined;
  /**
   * Method name to list all operations (optional).
   *
   * This method allows clients to enumerate operations, typically
   * filtered by resource or other criteria.
   *
   * Example: "ListOperations"
   */
  list?: string | undefined;
  /**
   * Method name to wait for operation completion (optional).
   *
   * This method blocks until the operation finishes or a timeout
   * is reached, then returns the final operation state.
   *
   * Example: "WaitForOperation"
   */
  wait?: string | undefined;
  /**
   * Method name to delete an operation (optional).
   *
   * This method removes the operation record. It does not cancel
   * the underlying work if it's still running.
   *
   * Example: "DeleteOperation"
   */
  delete?: string | undefined;
  /**
   * Method name to cancel a running operation (optional).
   *
   * This method attempts to stop the operation's execution.
   * The operation may still complete or may transition to a
   * cancelled state.
   *
   * Example: "CancelOperation"
   */
  cancel?: string | undefined;
}

/**
 * SDK generation hints for an RPC method.
 *
 * These annotations guide SDK code generators in producing correct
 * client code. They do not affect wire format or server behavior.
 */
export interface MethodMetadata {
  /**
   * Fields in the response message that are populated from HTTP response
   * headers rather than the JSON response body. Each entry is the proto
   * field name in the response message; the field's json_name gives the
   * corresponding HTTP header name.
   */
  responseHeaders?: string[] | undefined;
  /**
   * Fields in the request message that are sent as HTTP request headers
   * rather than in the request body or query string. Each entry is the
   * proto field name in the request message; the field's json_name gives
   * the corresponding HTTP header name.
   */
  requestHeaders?: string[] | undefined;
}

/**
 * Indicates that an API method returns paginated results.
 *
 * Methods annotated with this option may not return all results in a single
 * call. Multiple requests are required to retrieve the complete dataset.
 */
export interface Pagination {
  /** Defines the pagination method used by this API. */
  paginationInfo?:
    | {
        $case: 'offsetInfo';
        /** Offset-based pagination settings. */
        offsetInfo: Pagination_OffsetInfo;
      }
    | {
        $case: 'tokenInfo';
        /** Token-based pagination settings. */
        tokenInfo: Pagination_PageTokenInfo;
      }
    | undefined;
  /**
   * Specifies the name of the `repeated` field in the response message
   * that holds the page's results.
   */
  results?: string | undefined;
}

/**
 * Offset-based pagination.
 *
 * To retrieve results:
 * 1. Set the offset field to 0 (or omit it) for the first page.
 * 2. Set max_results to control how many items per page.
 * 3. For subsequent pages, increment offset by the page size.
 *
 * Example: To get items 0-99, set offset=0 and max_results=100.
 * To get items 100-199, set offset=100 and max_results=100.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Pagination_OffsetInfo {
  /**
   * Specifies the request field name for the starting offset.
   *
   * This field skips the first N items in the result set.
   * For the first page, this should be 0 or unset.
   */
  offset?: string | undefined;
  /**
   * Specifies the request field name for the page size.
   *
   * The API may return fewer items than requested (for example, on the
   * last page, or due to access permissions).
   */
  maxResults?: string | undefined;
  /**
   * A server-recommended page size for optimal performance.
   *
   * Clients should use this value if they don't have a specific
   * page size requirement.
   */
  defaultMaxResults?: number | undefined;
}

/**
 * Token-based pagination.
 *
 * To retrieve results:
 * 1. Make the first request without a page token (or with an empty token).
 * 2. Check the response for a next page token.
 * 3. If present, include that token in the next request.
 * 4. Repeat until the response contains no next page token.
 *
 * Note: Page tokens are opaque strings and should not be parsed or
 * constructed by clients. Always use the exact token returned by the API.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Pagination_PageTokenInfo {
  /**
   * Specifies the request field name for the page token.
   *
   * This field should be empty or unset for the first page.
   * For subsequent pages, it should contain the token from the previous response.
   */
  request?: string | undefined;
  /**
   * Specifies the response field name for the next page token.
   *
   * When this field is empty or absent in the response, there are no
   * more pages to fetch.
   */
  response?: string | undefined;
  /**
   * Specifies the request field name for the page size.
   *
   * The API may return fewer items than requested.
   */
  maxResults?: string | undefined;
  /**
   * A server-recommended page size for optimal performance.
   *
   * Clients should use this value if they don't have a specific
   * page size requirement.
   */
  defaultMaxResults?: number | undefined;
}

/**
 * Annotation used to describe legacy Long Running Operations.
 * WaitForState contains 4 key components:
 * * method_to_poll: the method which returns the status of the operations.
 * * binding: a mapping of fields used to construct the request to such method.
 * * state_info: a message describing how to find and interpret the operation's state.
 *
 * The following example demonstrates how to annotate an RPC, `Create`, which initiates a long-running operation.
 *
 * 1.  A client calls `Create(CreateRequest)`, which returns an `Object` response immediately.
 * 2.  The `wait_for_state` annotation tells the client generator that this operation isn't finished and must be polled.
 * 3.  To check the status, the client will poll the `Get` method (specified by `method_to_poll: "Get"`).
 * 4.  To build the `GetRequest` for polling, the client uses the `binding`. This example maps the `object_id` field from the initial `Create` *response* to the `id` field in the `Get` *request* (as defined by `poll_method_field: "id"` and `response_field: "object_id"`).
 * 5.  When the client receives the `Object` response from polling `Get`, it inspects the `state` field (defined by `state_info.state_path: "state"`). If the path were nested (e.g., `state_path: ["status", "phase"]`), it would inspect `object.status.phase`.
 * 6.  If the `state` field's value is `"RUNNING"`, the operation is complete and successful (per `state_info.success_states: "RUNNING"`).
 * 7.  If the `state` is `"STOPPED"` or `"FAILED"`, the operation is complete and has failed (per `state_info.failure_states: ["STOPPED", "FAILED"]`).
 * 8.  If the state is anything else, the client continues to poll the `Get` method until the timeout is reached.
 *
 * rpc Create(CreateRequest) returns Object {
 * option (databricks.sdk.wait_for_state) = {
 * method_to_poll: "Get"
 * binding: {
 * binding_pairs: {
 * poll_method_field: "id"
 * response_field: "object_id"
 * }
 * }
 * state_info: {
 * state_path: "state"
 * success_states: "RUNNING"
 * failure_states: ["STOPPED", "FAILED"]
 * }
 * }
 * }
 * rpc Get(GetRequest) returns Object {
 * }
 *
 * message Object {
 * optional string object_id = 1;
 * optional State state = 2;
 * }
 * message GetRequest {
 * optional string id = 1;
 * }
 */
export interface WaitForState {
  /**
   * Name of the method to repeatedly call until
   * one of the success_states is reached.
   * This method must be part of the same service.
   */
  methodToPoll?: string | undefined;
  /**
   * How to bind fields from annotated method request or response with
   * fields of method_to_poll.
   */
  binding?: WaitForState_Binding | undefined;
  /**
   * How to find and interpret the operation's state from
   * the poll method's response.
   */
  stateInfo?: WaitForState_StateInfo | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface WaitForState_Binding {
  /** List of pairs, each of one representing a field mapping. */
  pairs?: WaitForState_Binding_BindingPair[] | undefined;
}

/**
 * A BindingPair maps a single field in either the request or response of the annotated method
 * to a field of the method_to_poll operation.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface WaitForState_Binding_BindingPair {
  /** Field name in the method_to_poll operation. */
  pollMethodField?: string | undefined;
  originalField?:
    | {
        $case: 'requestField';
        /** Field name in the annotated method's request. */
        requestField: string;
      }
    | {
        $case: 'responseField';
        /** Field name in the annotated method's response. */
        responseField: string;
      }
    | undefined;
}

/** Groups fields used to find and interpret the operation's state. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface WaitForState_StateInfo {
  /**
   * Path to the field that holds the operation status (machine-readable).
   * E.g. ["status", "state"] -> response.status.state
   */
  statePath?: string[] | undefined;
  /** Possible terminal states of the operation, that indicate the completion of the operation. */
  successStates?: string[] | undefined;
  /** Possible terminal states of the operation, which indicate that the operation has failed. */
  failureStates?: string[] | undefined;
  /**
   * Path for the field which contains a readable description
   * of the current state (human-readable).
   */
  messagePath?: string[] | undefined;
}
