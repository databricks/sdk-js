// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Type of endpoint. */
export enum EndpointType {
  STORAGE_OPTIMIZED = 'STORAGE_OPTIMIZED',
  STANDARD = 'STANDARD',
  /** Standard endpoint backed by Orion infrastructure with endpoint-scoped reconciliation. */
  STANDARD_ON_ORION = 'STANDARD_ON_ORION',
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
   * The endpoint is being deleted or has been deleted. Associated resources
   * are being cleaned up; once cleanup completes the endpoint will no longer
   * be retrievable.
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
  /** Name of the AI Search endpoint */
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
   * Target QPS for the endpoint. Mutually exclusive with num_replicas.
   * The actual replica count is calculated at index creation/sync time based on this value.
   * Best-effort target; the system does not guarantee this QPS will be achieved.
   */
  targetQps?: number | undefined;
}

export interface CustomTag {
  /** Key field for an AI Search endpoint tag. */
  key?: string | undefined;
  /** [Optional] Value field for an AI Search endpoint tag. */
  value?: string | undefined;
}

export interface DeleteEndpointRequest {
  /** Name of the AI Search endpoint */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteEndpointResponse {}

export interface Endpoint {
  /** Name of the AI Search endpoint */
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
  /** The user-selected budget policy id for the endpoint. */
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
  /** The current state of the scaling change request. */
  state?: ScalingChangeState | undefined;
  /**
   * The requested QPS target for the endpoint. Best-effort; the system does not
   * guarantee this QPS will be achieved.
   */
  requestedTargetQps?: number | undefined;
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
  /** Name of the AI Search endpoint */
  name?: string | undefined;
  /** The budget policy id to be applied */
  budgetPolicyId?: string | undefined;
}

export interface PatchEndpointBudgetPolicyResponse {
  budgetPolicyId?: string | undefined;
  /** The budget policy applied to the AI Search endpoint. */
  effectiveBudgetPolicyId?: string | undefined;
}

export interface PatchEndpointRequest {
  /** Name of the AI Search endpoint */
  name?: string | undefined;
  /**
   * OpenSearch replication factor. Directly sets userThroughputSettings.replicationFactor.
   * Mutually exclusive with target_qps (and the deprecated min_qps alias). Must be
   * non-negative (0 = no replication).
   * The autoscaler caps the effective value based on endpoint scaling settings.
   * Note: This is the raw replication factor, not "total data copies". For the
   * user-facing replica count (which uses total-copies semantics), see
   * PatchEndpointThroughputRequest.num_replicas.
   */
  replicationFactor?: number | undefined;
  /**
   * Target QPS for the endpoint. Best-effort; the system does not guarantee this QPS
   * will be achieved.
   */
  targetQps?: number | undefined;
}

export interface PatchEndpointThroughputRequest {
  /** Name of the AI Search endpoint */
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

export const unmarshalCustomTagSchema: z.ZodType<CustomTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
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
      state: z.enum(ScalingChangeState).optional(),
      requested_target_qps: z.number().optional(),
    })
    .transform(d => ({
      state: d.state,
      requestedTargetQps: d.requested_target_qps,
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

export const marshalCreateEndpointRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    endpointType: z.enum(EndpointType).optional(),
    budgetPolicyId: z.string().optional(),
    usagePolicyId: z.string().optional(),
    numReplicas: z.number().optional(),
    targetQps: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    endpoint_type: d.endpointType,
    budget_policy_id: d.budgetPolicyId,
    usage_policy_id: d.usagePolicyId,
    num_replicas: d.numReplicas,
    target_qps: d.targetQps,
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

export const marshalPatchEndpointRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    replicationFactor: z.number().optional(),
    targetQps: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    replication_factor: d.replicationFactor,
    target_qps: d.targetQps,
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
