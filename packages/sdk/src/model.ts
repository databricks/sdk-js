// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

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
  /** Offset-based pagination settings. */
  offsetInfo?: Pagination_OffsetInfo | undefined;
  /** Token-based pagination settings. */
  tokenInfo?: Pagination_PageTokenInfo | undefined;
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
  /** Field name in the annotated method's request. */
  requestField?: string | undefined;
  /** Field name in the annotated method's response. */
  responseField?: string | undefined;
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

export const unmarshalFieldMetadataSchema: z.ZodType<FieldMetadata> = z
  .object({
    is_multi_segment: z.boolean().optional(),
  })
  .transform(d => ({
    isMultiSegment: d.is_multi_segment,
  }));

export const unmarshalLongRunningOperationSchema: z.ZodType<LongRunningOperation> =
  z
    .object({
      operation_info: z
        .lazy(() => unmarshalLongRunningOperation_OperationInfoSchema)
        .optional(),
      operation_methods: z
        .lazy(() => unmarshalLongRunningOperation_OperationMethodsSchema)
        .optional(),
    })
    .transform(d => ({
      operationInfo: d.operation_info,
      operationMethods: d.operation_methods,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalLongRunningOperation_OperationInfoSchema: z.ZodType<LongRunningOperation_OperationInfo> =
  z
    .object({
      response_type: z.string().optional(),
      metadata_type: z.string().optional(),
    })
    .transform(d => ({
      responseType: d.response_type,
      metadataType: d.metadata_type,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalLongRunningOperation_OperationMethodsSchema: z.ZodType<LongRunningOperation_OperationMethods> =
  z
    .object({
      get: z.string().optional(),
      list: z.string().optional(),
      wait: z.string().optional(),
      delete: z.string().optional(),
      cancel: z.string().optional(),
    })
    .transform(d => ({
      get: d.get,
      list: d.list,
      wait: d.wait,
      delete: d.delete,
      cancel: d.cancel,
    }));

export const unmarshalMethodMetadataSchema: z.ZodType<MethodMetadata> = z
  .object({
    response_headers: z.array(z.string()).optional(),
    request_headers: z.array(z.string()).optional(),
  })
  .transform(d => ({
    responseHeaders: d.response_headers,
    requestHeaders: d.request_headers,
  }));

export const unmarshalPaginationSchema: z.ZodType<Pagination> = z
  .object({
    offset_info: z.lazy(() => unmarshalPagination_OffsetInfoSchema).optional(),
    token_info: z
      .lazy(() => unmarshalPagination_PageTokenInfoSchema)
      .optional(),
    results: z.string().optional(),
  })
  .transform(d => ({
    offsetInfo: d.offset_info,
    tokenInfo: d.token_info,
    results: d.results,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPagination_OffsetInfoSchema: z.ZodType<Pagination_OffsetInfo> =
  z
    .object({
      offset: z.string().optional(),
      max_results: z.string().optional(),
      default_max_results: z.number().optional(),
    })
    .transform(d => ({
      offset: d.offset,
      maxResults: d.max_results,
      defaultMaxResults: d.default_max_results,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPagination_PageTokenInfoSchema: z.ZodType<Pagination_PageTokenInfo> =
  z
    .object({
      request: z.string().optional(),
      response: z.string().optional(),
      max_results: z.string().optional(),
      default_max_results: z.number().optional(),
    })
    .transform(d => ({
      request: d.request,
      response: d.response,
      maxResults: d.max_results,
      defaultMaxResults: d.default_max_results,
    }));

export const unmarshalWaitForStateSchema: z.ZodType<WaitForState> = z
  .object({
    method_to_poll: z.string().optional(),
    binding: z.lazy(() => unmarshalWaitForState_BindingSchema).optional(),
    state_info: z.lazy(() => unmarshalWaitForState_StateInfoSchema).optional(),
  })
  .transform(d => ({
    methodToPoll: d.method_to_poll,
    binding: d.binding,
    stateInfo: d.state_info,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalWaitForState_BindingSchema: z.ZodType<WaitForState_Binding> =
  z
    .object({
      pairs: z
        .array(z.lazy(() => unmarshalWaitForState_Binding_BindingPairSchema))
        .optional(),
    })
    .transform(d => ({
      pairs: d.pairs,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalWaitForState_Binding_BindingPairSchema: z.ZodType<WaitForState_Binding_BindingPair> =
  z
    .object({
      poll_method_field: z.string().optional(),
      request_field: z.string().optional(),
      response_field: z.string().optional(),
    })
    .transform(d => ({
      pollMethodField: d.poll_method_field,
      requestField: d.request_field,
      responseField: d.response_field,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalWaitForState_StateInfoSchema: z.ZodType<WaitForState_StateInfo> =
  z
    .object({
      state_path: z.array(z.string()).optional(),
      success_states: z.array(z.string()).optional(),
      failure_states: z.array(z.string()).optional(),
      message_path: z.array(z.string()).optional(),
    })
    .transform(d => ({
      statePath: d.state_path,
      successStates: d.success_states,
      failureStates: d.failure_states,
      messagePath: d.message_path,
    }));

export const marshalFieldMetadataSchema: z.ZodType = z
  .object({
    isMultiSegment: z.boolean().optional(),
  })
  .transform(d => ({
    is_multi_segment: d.isMultiSegment,
  }));

export const marshalLongRunningOperationSchema: z.ZodType = z
  .object({
    operationInfo: z
      .lazy(() => marshalLongRunningOperation_OperationInfoSchema)
      .optional(),
    operationMethods: z
      .lazy(() => marshalLongRunningOperation_OperationMethodsSchema)
      .optional(),
  })
  .transform(d => ({
    operation_info: d.operationInfo,
    operation_methods: d.operationMethods,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalLongRunningOperation_OperationInfoSchema: z.ZodType = z
  .object({
    responseType: z.string().optional(),
    metadataType: z.string().optional(),
  })
  .transform(d => ({
    response_type: d.responseType,
    metadata_type: d.metadataType,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalLongRunningOperation_OperationMethodsSchema: z.ZodType = z
  .object({
    get: z.string().optional(),
    list: z.string().optional(),
    wait: z.string().optional(),
    delete: z.string().optional(),
    cancel: z.string().optional(),
  })
  .transform(d => ({
    get: d.get,
    list: d.list,
    wait: d.wait,
    delete: d.delete,
    cancel: d.cancel,
  }));

export const marshalMethodMetadataSchema: z.ZodType = z
  .object({
    responseHeaders: z.array(z.string()).optional(),
    requestHeaders: z.array(z.string()).optional(),
  })
  .transform(d => ({
    response_headers: d.responseHeaders,
    request_headers: d.requestHeaders,
  }));

export const marshalPaginationSchema: z.ZodType = z
  .object({
    offsetInfo: z.lazy(() => marshalPagination_OffsetInfoSchema).optional(),
    tokenInfo: z.lazy(() => marshalPagination_PageTokenInfoSchema).optional(),
    results: z.string().optional(),
  })
  .transform(d => ({
    offset_info: d.offsetInfo,
    token_info: d.tokenInfo,
    results: d.results,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPagination_OffsetInfoSchema: z.ZodType = z
  .object({
    offset: z.string().optional(),
    maxResults: z.string().optional(),
    defaultMaxResults: z.number().optional(),
  })
  .transform(d => ({
    offset: d.offset,
    max_results: d.maxResults,
    default_max_results: d.defaultMaxResults,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPagination_PageTokenInfoSchema: z.ZodType = z
  .object({
    request: z.string().optional(),
    response: z.string().optional(),
    maxResults: z.string().optional(),
    defaultMaxResults: z.number().optional(),
  })
  .transform(d => ({
    request: d.request,
    response: d.response,
    max_results: d.maxResults,
    default_max_results: d.defaultMaxResults,
  }));

export const marshalWaitForStateSchema: z.ZodType = z
  .object({
    methodToPoll: z.string().optional(),
    binding: z.lazy(() => marshalWaitForState_BindingSchema).optional(),
    stateInfo: z.lazy(() => marshalWaitForState_StateInfoSchema).optional(),
  })
  .transform(d => ({
    method_to_poll: d.methodToPoll,
    binding: d.binding,
    state_info: d.stateInfo,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalWaitForState_BindingSchema: z.ZodType = z
  .object({
    pairs: z
      .array(z.lazy(() => marshalWaitForState_Binding_BindingPairSchema))
      .optional(),
  })
  .transform(d => ({
    pairs: d.pairs,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalWaitForState_Binding_BindingPairSchema: z.ZodType = z
  .object({
    pollMethodField: z.string().optional(),
    requestField: z.string().optional(),
    responseField: z.string().optional(),
  })
  .transform(d => ({
    poll_method_field: d.pollMethodField,
    request_field: d.requestField,
    response_field: d.responseField,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalWaitForState_StateInfoSchema: z.ZodType = z
  .object({
    statePath: z.array(z.string()).optional(),
    successStates: z.array(z.string()).optional(),
    failureStates: z.array(z.string()).optional(),
    messagePath: z.array(z.string()).optional(),
  })
  .transform(d => ({
    state_path: d.statePath,
    success_states: d.successStates,
    failure_states: d.failureStates,
    message_path: d.messagePath,
  }));
