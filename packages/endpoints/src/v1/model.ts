// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Type of endpoint. */
export enum EndpointType {
  STORAGE_OPTIMIZED = 'STORAGE_OPTIMIZED',
  STANDARD = 'STANDARD',
}

export enum ScalingChangeState {
  SCALING_CHANGE_UNSPECIFIED = 'SCALING_CHANGE_UNSPECIFIED',
  SCALING_CHANGE_APPLIED = 'SCALING_CHANGE_APPLIED',
  SCALING_CHANGE_IN_PROGRESS = 'SCALING_CHANGE_IN_PROGRESS',
}

/** Throughput change request state */
export enum ThroughputChangeRequestState {
  /** The change request was successfully applied */
  CHANGE_SUCCESS = 'CHANGE_SUCCESS',
  /** The change request failed */
  CHANGE_FAILED = 'CHANGE_FAILED',
  /** The endpoint is already at the minimum allowed concurrency */
  CHANGE_REACHED_MINIMUM = 'CHANGE_REACHED_MINIMUM',
  /** The endpoint is already at the maximum allowed concurrency */
  CHANGE_REACHED_MAXIMUM = 'CHANGE_REACHED_MAXIMUM',
  /** The change request is being processed */
  CHANGE_IN_PROGRESS = 'CHANGE_IN_PROGRESS',
  /** The change request was accepted but adjusted to fit within limits */
  CHANGE_ADJUSTED = 'CHANGE_ADJUSTED',
}

/** Response status for throughput change requests */
export enum ThroughputPatchStatus {
  /** The request was accepted and will be processed */
  PATCH_ACCEPTED = 'PATCH_ACCEPTED',
  /** The request was rejected */
  PATCH_REJECTED = 'PATCH_REJECTED',
  /** The request processing failed */
  PATCH_FAILED = 'PATCH_FAILED',
}

/** Current state of the endpoint */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EndpointStatus_State {
  PROVISIONING = 'PROVISIONING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  /**
   * After the endpoint is ready, it can be in one of the following states:
   * - RED_STATE: The endpoint is unhealthy and needs to be investigated.
   * - YELLOW_STATE: The endpoint is healthy but needs to be monitored.
   * - ONLINE: The endpoint is healthy and ready to serve traffic.
   */
  RED_STATE = 'RED_STATE',
  YELLOW_STATE = 'YELLOW_STATE',
  /**
   * DELETED: The endpoint is being deleted or has been deleted.
   * K8s resources are being cleaned up. Once K8s cleanup completes,
   * the endpoint entity will be removed from the entity store.
   */
  DELETED = 'DELETED',
}

/** Adjusted throughput request parameters */
export interface AdjustedThroughputRequest {
  /** Adjusted concurrency (total CPU) for the endpoint */
  concurrency?: number | undefined;
  /** Adjusted minimum concurrency allowed for the endpoint */
  minimalConcurrencyAllowed?: number | undefined;
  /** Adjusted maximum concurrency allowed for the endpoint */
  maximumConcurrencyAllowed?: number | undefined;
}

export interface CreateEndpointRequest {
  /** Name of the vector search endpoint */
  name?: string | undefined;
  /** Type of endpoint */
  endpointType?: EndpointType | undefined;
  /** The budget policy id to be applied */
  budgetPolicyId?: string | undefined;
  /** The usage policy id to be applied once we've migrated to usage policies */
  usagePolicyId?: string | undefined;
  /** Initial number of replicas for the endpoint. If not specified, defaults to 1. */
  numReplicas?: number | undefined;
  /**
   * Min QPS for the endpoint. Mutually exclusive with num_replicas.
   * The actual replica count is calculated at index creation/sync time based on this value.
   */
  minQps?: number | undefined;
}

export interface CustomTag {
  /** Key field for a vector search endpoint tag. */
  key?: string | undefined;
  /** [Optional] Value field for a vector search endpoint tag. */
  value?: string | undefined;
}

export interface DeleteEndpointRequest {
  /** Name of the vector search endpoint */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteEndpointResponse {}

export interface Endpoint {
  /** Name of the vector search endpoint */
  name?: string | undefined;
  /** Creator of the endpoint */
  creator?: string | undefined;
  /** Timestamp of endpoint creation */
  creationTimestamp?: number | undefined;
  /** Timestamp of last update to the endpoint */
  lastUpdatedTimestamp?: number | undefined;
  /** Type of endpoint */
  endpointType?: EndpointType | undefined;
  /** User who last updated the endpoint */
  lastUpdatedUser?: string | undefined;
  /** Unique identifier of the endpoint */
  id?: string | undefined;
  /** Current status of the endpoint */
  endpointStatus?: EndpointStatus | undefined;
  /** Number of indexes on the endpoint */
  numIndexes?: number | undefined;
  /**
   * Discussed here: https://databricks.atlassian.net/wiki/x/OQDlCQE
   * Additional documentation: https://aip.dev.databricks.com/129
   * the user selected budget policy id for the endpoint (client-side)
   */
  budgetPolicyId?: string | undefined;
  /** The budget policy id applied to the endpoint */
  effectiveBudgetPolicyId?: string | undefined;
  /** The custom tags assigned to the endpoint */
  customTags?: CustomTag[] | undefined;
  /** Throughput information for the endpoint */
  throughputInfo?: EndpointThroughputInfo | undefined;
  /** Scaling information for the endpoint */
  scalingInfo?: EndpointScalingInfo | undefined;
}

export interface EndpointScalingInfo {
  /** The minimum QPS target requested for the endpoint. */
  requestedMinQps?: number | undefined;
  /** The current state of the scaling change request. */
  state?: ScalingChangeState | undefined;
}

/** Status information of an endpoint */
export interface EndpointStatus {
  /** Current state of the endpoint */
  state?: EndpointStatus_State | undefined;
  /** Additional status message */
  message?: string | undefined;
}

/** Throughput information for an endpoint */
export interface EndpointThroughputInfo {
  /** The requested concurrency (total CPU) for the endpoint */
  requestedConcurrency?: number | undefined;
  /** The current concurrency (total CPU) allocated to the endpoint */
  currentConcurrency?: number | undefined;
  /** The current utilization of concurrency as a percentage (0-100) */
  currentConcurrencyUtilizationPercentage?: number | undefined;
  /** The minimum concurrency allowed for this endpoint */
  minimalConcurrencyAllowed?: number | undefined;
  /** The maximum concurrency allowed for this endpoint */
  maximumConcurrencyAllowed?: number | undefined;
  /** The state of the most recent throughput change request */
  changeRequestState?: ThroughputChangeRequestState | undefined;
  /** Additional information about the throughput change request */
  changeRequestMessage?: string | undefined;
  /** The requested number of replicas for the endpoint */
  requestedNumReplicas?: number | undefined;
  /** The current number of replicas allocated to the endpoint */
  currentNumReplicas?: number | undefined;
}

export interface GetEndpointRequest {
  /** Name of the endpoint */
  name?: string | undefined;
}

export interface ListEndpointRequest {
  /** Token for pagination */
  pageToken?: string | undefined;
}

export interface ListEndpointResponse {
  /** An array of Endpoint objects */
  endpoints?: Endpoint[] | undefined;
  /** A token that can be used to get the next page of results. If not present, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface PatchEndpointBudgetPolicyRequest {
  /** Name of the vector search endpoint */
  name?: string | undefined;
  /** The budget policy id to be applied */
  budgetPolicyId?: string | undefined;
}

export interface PatchEndpointBudgetPolicyResponse {
  budgetPolicyId?: string | undefined;
  /** The budget policy applied to the vector search endpoint. */
  effectiveBudgetPolicyId?: string | undefined;
}

export interface PatchEndpointRequest {
  /** Name of the vector search endpoint */
  name?: string | undefined;
  /** Min QPS for the endpoint. Positive integer sets QPS target; -1 resets to default scaling behavior. */
  minQps?: number | undefined;
}

export interface PatchEndpointThroughputRequest {
  /** Name of the vector search endpoint */
  name?: string | undefined;
  /** Requested concurrency (total CPU) for the endpoint. If not specified, the current concurrency is maintained. */
  concurrency?: number | undefined;
  /** Minimum concurrency allowed for the endpoint. If not specified, the current minimum is maintained. */
  minimalConcurrencyAllowed?: number | undefined;
  /** Maximum concurrency allowed for the endpoint. If not specified, the current maximum is maintained. */
  maximumConcurrencyAllowed?: number | undefined;
  /**
   * If true, the request will fail if the requested concurrency or limits cannot be exactly met.
   * If false, the request will be adjusted to the closest possible value.
   */
  allOrNothing?: boolean | undefined;
  /**
   * Requested number of data copies for the endpoint (including primary).
   * For example: num_replicas=2 means 2 total copies of the data (1 primary + 1 replica).
   * If not specified, the current replication factor is maintained.
   * Valid range: 1-6 (where 1 = no replication, 6 = 1 primary + 5 replicas).
   */
  numReplicas?: number | undefined;
}

export interface PatchEndpointThroughputResponse {
  /** The status of the throughput change request */
  status?: ThroughputPatchStatus | undefined;
  /** Message explaining the status or any adjustments made */
  message?: string | undefined;
  /**
   * The adjusted request if the original request could not be fully fulfilled.
   * This is only populated when the request was adjusted.
   */
  adjustedRequest?: AdjustedThroughputRequest | undefined;
}

export const unmarshalAdjustedThroughputRequestSchema: z.ZodType<AdjustedThroughputRequest> =
  z
    .object({
      concurrency: z.number().optional(),
      minimal_concurrency_allowed: z.number().optional(),
      maximum_concurrency_allowed: z.number().optional(),
    })
    .transform(d => ({
      concurrency: d.concurrency,
      minimalConcurrencyAllowed: d.minimal_concurrency_allowed,
      maximumConcurrencyAllowed: d.maximum_concurrency_allowed,
    }));

export const unmarshalCreateEndpointRequestSchema: z.ZodType<CreateEndpointRequest> =
  z
    .object({
      name: z.string().optional(),
      endpoint_type: z.enum(EndpointType).optional(),
      budget_policy_id: z.string().optional(),
      usage_policy_id: z.string().optional(),
      num_replicas: z.number().optional(),
      min_qps: z.number().optional(),
    })
    .transform(d => ({
      name: d.name,
      endpointType: d.endpoint_type,
      budgetPolicyId: d.budget_policy_id,
      usagePolicyId: d.usage_policy_id,
      numReplicas: d.num_replicas,
      minQps: d.min_qps,
    }));

export const unmarshalCustomTagSchema: z.ZodType<CustomTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalDeleteEndpointRequestSchema: z.ZodType<DeleteEndpointRequest> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalDeleteEndpointResponseSchema: z.ZodType<DeleteEndpointResponse> =
  z.object({});

export const unmarshalEndpointSchema: z.ZodType<Endpoint> = z
  .object({
    name: z.string().optional(),
    creator: z.string().optional(),
    creation_timestamp: z.number().optional(),
    last_updated_timestamp: z.number().optional(),
    endpoint_type: z.enum(EndpointType).optional(),
    last_updated_user: z.string().optional(),
    id: z.string().optional(),
    endpoint_status: z.lazy(() => unmarshalEndpointStatusSchema).optional(),
    num_indexes: z.number().optional(),
    budget_policy_id: z.string().optional(),
    effective_budget_policy_id: z.string().optional(),
    custom_tags: z.array(z.lazy(() => unmarshalCustomTagSchema)).optional(),
    throughput_info: z
      .lazy(() => unmarshalEndpointThroughputInfoSchema)
      .optional(),
    scaling_info: z.lazy(() => unmarshalEndpointScalingInfoSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    creator: d.creator,
    creationTimestamp: d.creation_timestamp,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    endpointType: d.endpoint_type,
    lastUpdatedUser: d.last_updated_user,
    id: d.id,
    endpointStatus: d.endpoint_status,
    numIndexes: d.num_indexes,
    budgetPolicyId: d.budget_policy_id,
    effectiveBudgetPolicyId: d.effective_budget_policy_id,
    customTags: d.custom_tags,
    throughputInfo: d.throughput_info,
    scalingInfo: d.scaling_info,
  }));

export const unmarshalEndpointScalingInfoSchema: z.ZodType<EndpointScalingInfo> =
  z
    .object({
      requested_min_qps: z.number().optional(),
      state: z.enum(ScalingChangeState).optional(),
    })
    .transform(d => ({
      requestedMinQps: d.requested_min_qps,
      state: d.state,
    }));

export const unmarshalEndpointStatusSchema: z.ZodType<EndpointStatus> = z
  .object({
    state: z.enum(EndpointStatus_State).optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
  }));

export const unmarshalEndpointThroughputInfoSchema: z.ZodType<EndpointThroughputInfo> =
  z
    .object({
      requested_concurrency: z.number().optional(),
      current_concurrency: z.number().optional(),
      current_concurrency_utilization_percentage: z.number().optional(),
      minimal_concurrency_allowed: z.number().optional(),
      maximum_concurrency_allowed: z.number().optional(),
      change_request_state: z.enum(ThroughputChangeRequestState).optional(),
      change_request_message: z.string().optional(),
      requested_num_replicas: z.number().optional(),
      current_num_replicas: z.number().optional(),
    })
    .transform(d => ({
      requestedConcurrency: d.requested_concurrency,
      currentConcurrency: d.current_concurrency,
      currentConcurrencyUtilizationPercentage:
        d.current_concurrency_utilization_percentage,
      minimalConcurrencyAllowed: d.minimal_concurrency_allowed,
      maximumConcurrencyAllowed: d.maximum_concurrency_allowed,
      changeRequestState: d.change_request_state,
      changeRequestMessage: d.change_request_message,
      requestedNumReplicas: d.requested_num_replicas,
      currentNumReplicas: d.current_num_replicas,
    }));

export const unmarshalGetEndpointRequestSchema: z.ZodType<GetEndpointRequest> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalListEndpointRequestSchema: z.ZodType<ListEndpointRequest> =
  z
    .object({
      page_token: z.string().optional(),
    })
    .transform(d => ({
      pageToken: d.page_token,
    }));

export const unmarshalListEndpointResponseSchema: z.ZodType<ListEndpointResponse> =
  z
    .object({
      endpoints: z.array(z.lazy(() => unmarshalEndpointSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      endpoints: d.endpoints,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalPatchEndpointBudgetPolicyRequestSchema: z.ZodType<PatchEndpointBudgetPolicyRequest> =
  z
    .object({
      name: z.string().optional(),
      budget_policy_id: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      budgetPolicyId: d.budget_policy_id,
    }));

export const unmarshalPatchEndpointBudgetPolicyResponseSchema: z.ZodType<PatchEndpointBudgetPolicyResponse> =
  z
    .object({
      budget_policy_id: z.string().optional(),
      effective_budget_policy_id: z.string().optional(),
    })
    .transform(d => ({
      budgetPolicyId: d.budget_policy_id,
      effectiveBudgetPolicyId: d.effective_budget_policy_id,
    }));

export const unmarshalPatchEndpointRequestSchema: z.ZodType<PatchEndpointRequest> =
  z
    .object({
      name: z.string().optional(),
      min_qps: z.number().optional(),
    })
    .transform(d => ({
      name: d.name,
      minQps: d.min_qps,
    }));

export const unmarshalPatchEndpointThroughputRequestSchema: z.ZodType<PatchEndpointThroughputRequest> =
  z
    .object({
      name: z.string().optional(),
      concurrency: z.number().optional(),
      minimal_concurrency_allowed: z.number().optional(),
      maximum_concurrency_allowed: z.number().optional(),
      all_or_nothing: z.boolean().optional(),
      num_replicas: z.number().optional(),
    })
    .transform(d => ({
      name: d.name,
      concurrency: d.concurrency,
      minimalConcurrencyAllowed: d.minimal_concurrency_allowed,
      maximumConcurrencyAllowed: d.maximum_concurrency_allowed,
      allOrNothing: d.all_or_nothing,
      numReplicas: d.num_replicas,
    }));

export const unmarshalPatchEndpointThroughputResponseSchema: z.ZodType<PatchEndpointThroughputResponse> =
  z
    .object({
      status: z.enum(ThroughputPatchStatus).optional(),
      message: z.string().optional(),
      adjusted_request: z
        .lazy(() => unmarshalAdjustedThroughputRequestSchema)
        .optional(),
    })
    .transform(d => ({
      status: d.status,
      message: d.message,
      adjustedRequest: d.adjusted_request,
    }));

export const marshalAdjustedThroughputRequestSchema: z.ZodType = z
  .object({
    concurrency: z.number().optional(),
    minimalConcurrencyAllowed: z.number().optional(),
    maximumConcurrencyAllowed: z.number().optional(),
  })
  .transform(d => ({
    concurrency: d.concurrency,
    minimal_concurrency_allowed: d.minimalConcurrencyAllowed,
    maximum_concurrency_allowed: d.maximumConcurrencyAllowed,
  }));

export const marshalCreateEndpointRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    endpointType: z.enum(EndpointType).optional(),
    budgetPolicyId: z.string().optional(),
    usagePolicyId: z.string().optional(),
    numReplicas: z.number().optional(),
    minQps: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    endpoint_type: d.endpointType,
    budget_policy_id: d.budgetPolicyId,
    usage_policy_id: d.usagePolicyId,
    num_replicas: d.numReplicas,
    min_qps: d.minQps,
  }));

export const marshalCustomTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalDeleteEndpointRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalDeleteEndpointResponseSchema: z.ZodType = z.object({});

export const marshalEndpointSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    creator: z.string().optional(),
    creationTimestamp: z.number().optional(),
    lastUpdatedTimestamp: z.number().optional(),
    endpointType: z.enum(EndpointType).optional(),
    lastUpdatedUser: z.string().optional(),
    id: z.string().optional(),
    endpointStatus: z.lazy(() => marshalEndpointStatusSchema).optional(),
    numIndexes: z.number().optional(),
    budgetPolicyId: z.string().optional(),
    effectiveBudgetPolicyId: z.string().optional(),
    customTags: z.array(z.lazy(() => marshalCustomTagSchema)).optional(),
    throughputInfo: z
      .lazy(() => marshalEndpointThroughputInfoSchema)
      .optional(),
    scalingInfo: z.lazy(() => marshalEndpointScalingInfoSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    creator: d.creator,
    creation_timestamp: d.creationTimestamp,
    last_updated_timestamp: d.lastUpdatedTimestamp,
    endpoint_type: d.endpointType,
    last_updated_user: d.lastUpdatedUser,
    id: d.id,
    endpoint_status: d.endpointStatus,
    num_indexes: d.numIndexes,
    budget_policy_id: d.budgetPolicyId,
    effective_budget_policy_id: d.effectiveBudgetPolicyId,
    custom_tags: d.customTags,
    throughput_info: d.throughputInfo,
    scaling_info: d.scalingInfo,
  }));

export const marshalEndpointScalingInfoSchema: z.ZodType = z
  .object({
    requestedMinQps: z.number().optional(),
    state: z.enum(ScalingChangeState).optional(),
  })
  .transform(d => ({
    requested_min_qps: d.requestedMinQps,
    state: d.state,
  }));

export const marshalEndpointStatusSchema: z.ZodType = z
  .object({
    state: z.enum(EndpointStatus_State).optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
    message: d.message,
  }));

export const marshalEndpointThroughputInfoSchema: z.ZodType = z
  .object({
    requestedConcurrency: z.number().optional(),
    currentConcurrency: z.number().optional(),
    currentConcurrencyUtilizationPercentage: z.number().optional(),
    minimalConcurrencyAllowed: z.number().optional(),
    maximumConcurrencyAllowed: z.number().optional(),
    changeRequestState: z.enum(ThroughputChangeRequestState).optional(),
    changeRequestMessage: z.string().optional(),
    requestedNumReplicas: z.number().optional(),
    currentNumReplicas: z.number().optional(),
  })
  .transform(d => ({
    requested_concurrency: d.requestedConcurrency,
    current_concurrency: d.currentConcurrency,
    current_concurrency_utilization_percentage:
      d.currentConcurrencyUtilizationPercentage,
    minimal_concurrency_allowed: d.minimalConcurrencyAllowed,
    maximum_concurrency_allowed: d.maximumConcurrencyAllowed,
    change_request_state: d.changeRequestState,
    change_request_message: d.changeRequestMessage,
    requested_num_replicas: d.requestedNumReplicas,
    current_num_replicas: d.currentNumReplicas,
  }));

export const marshalGetEndpointRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalListEndpointRequestSchema: z.ZodType = z
  .object({
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    page_token: d.pageToken,
  }));

export const marshalListEndpointResponseSchema: z.ZodType = z
  .object({
    endpoints: z.array(z.lazy(() => marshalEndpointSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    endpoints: d.endpoints,
    next_page_token: d.nextPageToken,
  }));

export const marshalPatchEndpointBudgetPolicyRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    budgetPolicyId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    budget_policy_id: d.budgetPolicyId,
  }));

export const marshalPatchEndpointBudgetPolicyResponseSchema: z.ZodType = z
  .object({
    budgetPolicyId: z.string().optional(),
    effectiveBudgetPolicyId: z.string().optional(),
  })
  .transform(d => ({
    budget_policy_id: d.budgetPolicyId,
    effective_budget_policy_id: d.effectiveBudgetPolicyId,
  }));

export const marshalPatchEndpointRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    minQps: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    min_qps: d.minQps,
  }));

export const marshalPatchEndpointThroughputRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    concurrency: z.number().optional(),
    minimalConcurrencyAllowed: z.number().optional(),
    maximumConcurrencyAllowed: z.number().optional(),
    allOrNothing: z.boolean().optional(),
    numReplicas: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    concurrency: d.concurrency,
    minimal_concurrency_allowed: d.minimalConcurrencyAllowed,
    maximum_concurrency_allowed: d.maximumConcurrencyAllowed,
    all_or_nothing: d.allOrNothing,
    num_replicas: d.numReplicas,
  }));

export const marshalPatchEndpointThroughputResponseSchema: z.ZodType = z
  .object({
    status: z.enum(ThroughputPatchStatus).optional(),
    message: z.string().optional(),
    adjustedRequest: z
      .lazy(() => marshalAdjustedThroughputRequestSchema)
      .optional(),
  })
  .transform(d => ({
    status: d.status,
    message: d.message,
    adjusted_request: d.adjustedRequest,
  }));
