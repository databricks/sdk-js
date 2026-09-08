// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {
  FieldMaskSchema,
  JsonValue,
  JsonObject,
} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.number(),
    z.string(),
    z.boolean(),
    z.record(z.string(), jsonValueSchema),
    z.array(jsonValueSchema),
  ])
);
const jsonObjectSchema: z.ZodType<JsonObject> = z.record(
  z.string(),
  jsonValueSchema
);

/**
 * Overall outcome of a data-plane upsert or delete. Mirrors the legacy
 * `databricks.brickindexscheduler.UpsertDeleteDataStatus` value-for-value.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DataModificationStatus = {
  /** All rows in the request were processed successfully. */
  SUCCESS: 'SUCCESS',
  /** Some rows were processed and some failed; see `failed_primary_keys`. */
  PARTIAL_SUCCESS: 'PARTIAL_SUCCESS',
  /** The operation failed. */
  FAILURE: 'FAILURE',
} as const;
export type DataModificationStatus =
  | (typeof DataModificationStatus)[keyof typeof DataModificationStatus]
  | (string & {});

/** Type of endpoint. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointType = {
  /** Storage Optimized endpoint backed by Orion. Lower per-query cost; higher tail latency. */
  STORAGE_OPTIMIZED: 'STORAGE_OPTIMIZED',
  /** Standard endpoint backed by OpenSearch. Lower latency; standard cost. */
  STANDARD: 'STANDARD',
} as const;
export type EndpointType =
  | (typeof EndpointType)[keyof typeof EndpointType]
  | (string & {});

/**
 * The subtype of the AI Search index, determining the indexing and retrieval strategy.
 * - `VECTOR`: Not a supported create value — do not select it. Use `HYBRID` (vector + hybrid
 * search) or `FULL_TEXT` (full-text only). It is the proto2 default (`= 0`) solely to mirror
 * the legacy `index_v2.proto` enum value-for-value; it is not an offered index subtype.
 * - `FULL_TEXT`: An index that uses full-text search without vector embeddings.
 * - `HYBRID`: An index that uses vector embeddings for similarity search and hybrid search.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IndexSubtype = {
  VECTOR: 'VECTOR',
  FULL_TEXT: 'FULL_TEXT',
  HYBRID: 'HYBRID',
} as const;
export type IndexSubtype =
  | (typeof IndexSubtype)[keyof typeof IndexSubtype]
  | (string & {});

/**
 * There are 2 types of AI Search indexes:
 * - `DELTA_SYNC`: An index that automatically syncs with a source Delta Table,
 * automatically and incrementally updating the index as the underlying data in
 * the Delta Table changes.
 * - `DIRECT_ACCESS`: An index that supports direct read and write of vectors and
 * metadata through our REST and SDK APIs. With this model, the user manages
 * index updates.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IndexType = {
  DELTA_SYNC: 'DELTA_SYNC',
  DIRECT_ACCESS: 'DIRECT_ACCESS',
} as const;
export type IndexType =
  | (typeof IndexType)[keyof typeof IndexType]
  | (string & {});

/**
 * Pipeline execution mode for a Delta Sync index. Required on create for Delta Sync
 * indexes; the legacy backend rejects an unset value with INVALID_PARAMETER_VALUE.
 * - `TRIGGERED`: the pipeline stops after refreshing the source table once, using the
 * data available when the update started.
 * - `CONTINUOUS`: the pipeline processes new data as it arrives in the source table to
 * keep the index fresh.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PipelineType = {
  /**
   * Default value; unset. Rejected by the backend on create — callers must pick
   * TRIGGERED or CONTINUOUS. Distinct from the legacy enum's `TRIGGERED = 0` default so
   * an unset wire value is not silently coerced to TRIGGERED.
   */
  PIPELINE_TYPE_UNSPECIFIED: 'PIPELINE_TYPE_UNSPECIFIED',
  /** The pipeline runs once per trigger, refreshing the source table a single time. */
  TRIGGERED: 'TRIGGERED',
  /** The pipeline processes new source-table data continuously to keep the index fresh. */
  CONTINUOUS: 'CONTINUOUS',
} as const;
export type PipelineType =
  | (typeof PipelineType)[keyof typeof PipelineType]
  | (string & {});

/** State of the most recent scaling change request for a Storage Optimized endpoint. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ScalingChangeState = {
  /** Default value; the endpoint has no recorded scaling state. */
  SCALING_CHANGE_UNSPECIFIED: 'SCALING_CHANGE_UNSPECIFIED',
  /** The most recent scaling change request has been fully applied. */
  SCALING_CHANGE_APPLIED: 'SCALING_CHANGE_APPLIED',
  /** A scaling change request is currently being applied by the system. */
  SCALING_CHANGE_IN_PROGRESS: 'SCALING_CHANGE_IN_PROGRESS',
} as const;
export type ScalingChangeState =
  | (typeof ScalingChangeState)[keyof typeof ScalingChangeState]
  | (string & {});

/**
 * State of the most recent throughput change request issued against a Storage Optimized
 * endpoint. Surfaced on `EndpointThroughputInfo.change_request_state`.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ThroughputChangeRequestState = {
  /** The change request was successfully applied. */
  CHANGE_SUCCESS: 'CHANGE_SUCCESS',
  /** The change request failed. */
  CHANGE_FAILED: 'CHANGE_FAILED',
  /** The endpoint is already at the minimum allowed concurrency. */
  CHANGE_REACHED_MINIMUM: 'CHANGE_REACHED_MINIMUM',
  /** The endpoint is already at the maximum allowed concurrency. */
  CHANGE_REACHED_MAXIMUM: 'CHANGE_REACHED_MAXIMUM',
  /** The change request is being processed. */
  CHANGE_IN_PROGRESS: 'CHANGE_IN_PROGRESS',
  /** The change request was accepted but adjusted to fit within limits. */
  CHANGE_ADJUSTED: 'CHANGE_ADJUSTED',
} as const;
export type ThroughputChangeRequestState =
  | (typeof ThroughputChangeRequestState)[keyof typeof ThroughputChangeRequestState]
  | (string & {});

/** Lifecycle state of an AI Search endpoint, used by both Standard and Storage Optimized SKUs. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointStatus_State = {
  /** The endpoint is being provisioned. This is the initial state after creation. */
  PROVISIONING: 'PROVISIONING',
  /** The endpoint is fully operational and serving queries. */
  ONLINE: 'ONLINE',
  /** The endpoint has been shut down and is not serving queries. */
  OFFLINE: 'OFFLINE',
  /**
   * The endpoint is unhealthy and needs to be investigated. After the endpoint
   * is ready, it can be in one of: RED_STATE (unhealthy), YELLOW_STATE
   * (degraded; needs monitoring), or ONLINE (healthy).
   */
  RED_STATE: 'RED_STATE',
  /** The endpoint is healthy but needs to be monitored. */
  YELLOW_STATE: 'YELLOW_STATE',
  /**
   * The endpoint is being deleted or has been deleted. Associated resources
   * are being cleaned up; once cleanup completes the endpoint will no longer
   * be retrievable.
   */
  DELETED: 'DELETED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EndpointStatus_State =
  | (typeof EndpointStatus_State)[keyof typeof EndpointStatus_State]
  | (string & {});

/** How the `model` field is interpreted. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RerankerConfig_ModelType = {
  /** Treated as MODEL_TYPE_BASE. */
  MODEL_TYPE_UNSPECIFIED: 'MODEL_TYPE_UNSPECIFIED',
  /** `model` must be "databricks_reranker". */
  MODEL_TYPE_BASE: 'MODEL_TYPE_BASE',
  /** `model` is a Model Serving endpoint name in the caller's workspace. */
  MODEL_TYPE_FINETUNED: 'MODEL_TYPE_FINETUNED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type RerankerConfig_ModelType =
  | (typeof RerankerConfig_ModelType)[keyof typeof RerankerConfig_ModelType]
  | (string & {});

/** Column information (name and data type) for an index column. Surfaced on `Index.column_info`. */
export interface ColumnInfo {
  /** Name of the column. */
  name?: string | undefined;
  /** Data type of the column (e.g., "string", "int", "array<float>"). */
  typeText?: string | undefined;
}

/**
 * AIP-133 conformant Create. The endpoint is nested under `endpoint`; `parent` carries the
 * workspace path; `endpoint_id` is the user-supplied short name. The server composes
 * `Endpoint.name` from `parent` and `endpoint_id`; any client-supplied `endpoint.name`
 * is ignored.
 */
export interface CreateEndpointRequest {
  /**
   * The Workspace where this Endpoint will be created.
   * Format: `workspaces/{workspace_id}`
   */
  parent?: string | undefined;
  /**
   * The Endpoint resource to create. Fields other than `endpoint.name` carry the desired
   * configuration; `endpoint.name` is server-assigned from `parent` and `endpoint_id`.
   */
  endpoint?: Endpoint | undefined;
  /**
   * The user-supplied short name for the Endpoint, per AIP-133. The server composes the
   * full `Endpoint.name` as `{parent}/endpoints/{endpoint_id}`. AIP-133 does not list
   * `endpoint_id` as a fields-may-be-required entry, so we annotate it OPTIONAL on the
   * wire; the server still rejects empty values with INVALID_PARAMETER_VALUE.
   */
  endpointId?: string | undefined;
}

/**
 * AIP-133 conformant Create. The index is nested under `index`; `parent` carries the
 * endpoint path; `index_id` is the user-supplied Unity Catalog table name. The server
 * composes `Index.name` from `parent` and `index_id`; any client-supplied `index.name`
 * is ignored.
 */
export interface CreateIndexRequest {
  /**
   * The Endpoint where this Index will be created.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}`
   */
  parent?: string | undefined;
  /**
   * The Index resource to create. Fields other than `index.name` carry the desired
   * configuration; `index.name` is server-assigned from `parent` and `index_id`.
   */
  index?: Index | undefined;
  /**
   * The user-supplied Unity Catalog table name for the Index, per AIP-133. The server
   * composes the full `Index.name` as `{parent}/indexes/{index_id}`. AIP-133 does not
   * list `index_id` as a fields-may-be-required entry, so we annotate it OPTIONAL on the
   * wire; the server still rejects empty values with INVALID_PARAMETER_VALUE.
   */
  indexId?: string | undefined;
}

/** User-defined key/value tag attached to an AI Search endpoint for cost attribution and access control. */
export interface CustomTag {
  /** Key field for an AI Search endpoint tag. */
  key?: string | undefined;
  /** [Optional] Value field for an AI Search endpoint tag. */
  value?: string | undefined;
}

/** Per-row outcome of a data-plane upsert or delete operation. */
export interface DataModificationResult {
  /** Count of rows processed successfully. */
  successRowCount?: bigint | undefined;
  /** Primary keys of rows that failed to process. */
  failedPrimaryKeys?: string[] | undefined;
}

/** Request to delete an AI Search endpoint by its full resource name. */
export interface DeleteEndpointRequest {
  /**
   * Full resource name of the endpoint to delete.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}`
   */
  name?: string | undefined;
}

/** Request to delete an AI Search index by its full resource name. */
export interface DeleteIndexRequest {
  /**
   * Full resource name of the index to delete.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}/indexes/{index_id}`
   */
  name?: string | undefined;
}

/** Specification for a Delta Sync index — the index is kept in sync with a source Delta table. */
export interface DeltaSyncIndexSpec {
  /** The full name of the source Delta table. */
  sourceTable?: string | undefined;
  /** The columns that contain the embedding source. */
  embeddingSourceColumns?: EmbeddingSourceColumn[] | undefined;
  /** The columns that contain the embedding vectors. */
  embeddingVectorColumns?: EmbeddingVectorColumn[] | undefined;
  /** [Optional] Name of the Delta table to sync the index contents and computed embeddings to. */
  embeddingWritebackTable?: string | undefined;
  /**
   * [Optional] Select the columns to sync with the index. If left blank, all columns
   * from the source table are synced. The primary key column and embedding source or
   * vector column are always synced.
   */
  columnsToSync?: string[] | undefined;
  /** The ID of the pipeline that is used to sync the index. */
  pipelineId?: string | undefined;
  /**
   * Pipeline execution mode. Required on create — the backend rejects an unset value.
   * Storage Optimized endpoints accept only `TRIGGERED`; Standard endpoints accept both.
   * No explicit `stage` — a REQUIRED field staged below its service would be dropped from
   * combined specs while remaining in `required`, tripping the OpenAPI required-vs-properties
   * consistency check. The field inherits the service's launch stage.
   */
  pipelineType?: PipelineType | undefined;
}

/** Specification for a Direct Access index — the customer manages vectors and metadata directly. */
export interface DirectAccessIndexSpec {
  /** The columns that contain the embedding vectors. */
  embeddingVectorColumns?: EmbeddingVectorColumn[] | undefined;
  /**
   * The schema of the index in JSON format. Supported types are `integer`, `long`,
   * `float`, `double`, `boolean`, `string`, `date`, `timestamp`. Supported types for
   * vector columns: `array<float>`, `array<double>`.
   */
  schemaJson?: string | undefined;
  /** The columns that contain the embedding source. */
  embeddingSourceColumns?: EmbeddingSourceColumn[] | undefined;
}

/** Name of an embedding source column and its associated embedding model endpoint. */
export interface EmbeddingSourceColumn {
  /** Name of the source column. */
  name?: string | undefined;
  /** Name of the embedding model endpoint, used by default for both ingestion and querying. */
  embeddingModelEndpoint?: string | undefined;
  /** Name of the embedding model endpoint which, if specified, is used for querying (not ingestion). */
  modelEndpointNameForQuery?: string | undefined;
}

/** Name and dimension of an embedding vector column. */
export interface EmbeddingVectorColumn {
  /** Name of the column. */
  name?: string | undefined;
  /** Dimension of the embedding vector. */
  embeddingDimension?: number | undefined;
}

/**
 * An AI Search endpoint — compute infrastructure that hosts AI Search indexes
 * and serves queries against them. Customers create, query, and delete endpoints;
 * the system manages provisioning, scaling, and health status.
 */
export interface Endpoint {
  /**
   * Name of the AI Search endpoint. Server-assigned full resource path
   * (`workspaces/{workspace}/endpoints/{endpoint}`) on output. On create, the
   * user-supplied short name is conveyed via `CreateEndpointRequest.endpoint_id`;
   * the server composes the full `name` and returns it on the response.
   */
  name?: string | undefined;
  /** Creator of the endpoint */
  creator?: string | undefined;
  /** Time the endpoint was created. */
  createTime?: Temporal.Instant | undefined;
  /** Time the endpoint was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Type of endpoint. Required on create and immutable thereafter. */
  endpointType?: EndpointType | undefined;
  /** User who last updated the endpoint */
  lastUpdatedUser?: string | undefined;
  /** Unique identifier of the endpoint */
  id?: string | undefined;
  /** Current status of the endpoint */
  endpointStatus?: EndpointStatus | undefined;
  /** Number of indexes on the endpoint */
  indexCount?: number | undefined;
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
  /** The usage policy id applied to the endpoint. */
  usagePolicyId?: string | undefined;
  /**
   * The client-supplied desired number of replicas for the endpoint, applied at
   * create/update time. Mutually exclusive with `target_qps`.
   */
  replicaCount?: number | undefined;
  /**
   * Target QPS for the endpoint. Mutually exclusive with `replica_count`. Best-effort;
   * the system does not guarantee this QPS will be achieved.
   */
  targetQps?: number | undefined;
}

/**
 * Scaling information for a Storage Optimized endpoint — current scaling state and the
 * requested QPS target the system is scaling toward.
 */
export interface EndpointScalingInfo {
  /** The current state of the scaling change request. */
  state?: ScalingChangeState | undefined;
  /**
   * The requested QPS target for the endpoint. Best-effort; the system does not
   * guarantee this QPS will be achieved.
   */
  requestedTargetQps?: bigint | undefined;
}

/**
 * Lifecycle and health state of an AI Search endpoint, along with any human-readable detail
 * about that state.
 */
export interface EndpointStatus {
  /** Current lifecycle state of the endpoint. See `State` for the meaning of each value. */
  state?: EndpointStatus_State | undefined;
  /** Human-readable detail about the endpoint's current state or the reason for a state transition. */
  message?: string | undefined;
}

/** Throughput information for an AI Search endpoint, including requested and current concurrency settings. */
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

/** Facet aggregation rows returned by a query. */
export interface FacetResultData {
  /** Number of facet rows returned. */
  facetRowCount?: number | undefined;
  /** Facet rows; each row is `[facet_column_name, value_or_range, count]`. */
  facetArray?: JsonValue[][] | undefined;
}

/** Request to retrieve a single AI Search endpoint by its full resource name. */
export interface GetEndpointRequest {
  /**
   * Full resource name of the endpoint.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}`
   */
  name?: string | undefined;
}

/** Request to retrieve a single AI Search index by its full resource name. */
export interface GetIndexRequest {
  /**
   * Full resource name of the index.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}/indexes/{index_id}`
   */
  name?: string | undefined;
}

/**
 * An AI Search index — a searchable collection of vectors and metadata hosted on an
 * AI Search endpoint. Indexes are children of endpoints; customers create, get, list,
 * and delete them. The `{index}` segment of the resource name is the index's Unity
 * Catalog table name.
 */
export interface Index {
  /**
   * Name of the AI Search index. Server-assigned full resource path
   * (`workspaces/{workspace}/endpoints/{endpoint}/indexes/{index}`) on output, where
   * `{index}` is the index's Unity Catalog table name. On create, the user-supplied UC
   * table name is conveyed via `CreateIndexRequest.index_id`; the server composes the
   * full `name` and returns it on the response.
   */
  name?: string | undefined;
  /**
   * Name of the endpoint associated with the index. Ignored on create — the endpoint is
   * taken from `CreateIndexRequest.parent`; populated only on output.
   */
  endpoint?: string | undefined;
  /** Primary key of the index. Set on create and immutable thereafter. */
  primaryKey?: string | undefined;
  /** Type of index. Required on create and immutable thereafter. */
  indexType?: IndexType | undefined;
  /**
   * Configuration of the index, dependent on `index_type`. Set on create and immutable
   * thereafter.
   */
  indexSpec?:
    | {
        $case: 'directAccessIndexSpec';
        /** Specification for a Direct Access index. Set when `index_type` is `DIRECT_ACCESS`. */
        directAccessIndexSpec: DirectAccessIndexSpec;
      }
    | {
        $case: 'deltaSyncIndexSpec';
        /** Specification for a Delta Sync index. Set when `index_type` is `DELTA_SYNC`. */
        deltaSyncIndexSpec: DeltaSyncIndexSpec;
      }
    | undefined;
  /** Current status of the index. */
  status?: IndexStatus | undefined;
  /** Creator of the index. */
  creator?: string | undefined;
  /** The subtype of the index. Set on create and immutable thereafter. */
  indexSubtype?: IndexSubtype | undefined;
}

/**
 * Lifecycle and health state of an AI Search index, along with human-readable
 * detail about that state and basic indexing progress.
 */
export interface IndexStatus {
  /** Human-readable detail about the index's current state. */
  message?: string | undefined;
  /** Number of rows indexed. */
  indexedRowCount?: bigint | undefined;
  /** Whether the index is ready for search. */
  ready?: boolean | undefined;
  /** Index API URL used to perform operations on the index. */
  indexUrl?: string | undefined;
}

/** Request to list AI Search endpoints in a workspace, with optional pagination. */
export interface ListEndpointsRequest {
  /**
   * The Workspace that owns this collection of endpoints.
   * Format: `workspaces/{workspace_id}`
   */
  parent?: string | undefined;
  /**
   * Best-effort upper bound on the number of results to return. Honored as an upper
   * bound by the shim: `page_size` only narrows the legacy backend's response, never
   * widens it, so the practical cap is `min(page_size, legacy_fixed_page_size)`.
   */
  pageSize?: number | undefined;
  /** Page token from a previous response. If not provided, returns the first page. */
  pageToken?: string | undefined;
}

/** Response for ListEndpoints carrying the page of endpoints and an optional continuation token. */
export interface ListEndpointsResponse {
  /** The endpoints in the workspace. */
  endpoints?: Endpoint[] | undefined;
  /** A token that can be used to get the next page of results. Empty when there are no more results. */
  nextPageToken?: string | undefined;
}

/** Request to list AI Search indexes on an endpoint, with optional pagination. */
export interface ListIndexesRequest {
  /**
   * The Endpoint that owns this collection of indexes.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}`
   */
  parent?: string | undefined;
  /**
   * Best-effort upper bound on the number of results to return. Honored as an upper
   * bound by the shim: `page_size` only narrows the legacy backend's response, never
   * widens it, so the practical cap is `min(page_size, legacy_fixed_page_size)`.
   */
  pageSize?: number | undefined;
  /** Page token from a previous response. If not provided, returns the first page. */
  pageToken?: string | undefined;
}

/** Response for ListIndexes carrying the page of indexes and an optional continuation token. */
export interface ListIndexesResponse {
  /**
   * The indexes on the endpoint. The field is named `indexes` (not the irregular plural
   * `indices`) to satisfy core::0132, which derives the response field name from the
   * ListIndexes method. core::0158::response-plural-first-field independently computes the
   * resource plural as `indices` and is satisfied via a scoped field exception below.
   */
  indexes?: Index[] | undefined;
  /** A token that can be used to get the next page of results. Empty when there are no more results. */
  nextPageToken?: string | undefined;
}

/**
 * Request to query (search) an AI Search index. The legacy `num_results` count is exposed as
 * `max_results`; v1 returns up to `max_results` rows in a single response (no cursor pagination
 * — see the note on `max_results` below).
 */
export interface QueryIndexRequest {
  /**
   * Full resource name of the index to query.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}/indexes/{index_id}`
   */
  name?: string | undefined;
  /** Column names to include in each result row. */
  columns?: string[] | undefined;
  /**
   * Query vector. Required for Direct Access indexes and Delta Sync indexes with self-managed
   * vectors.
   */
  queryVector?: number[] | undefined;
  /** Query text. Required for Delta Sync indexes that compute embeddings from a model endpoint. */
  queryText?: string | undefined;
  /** JSON string describing query filters (e.g. `{"id >": 5}`). */
  filtersJson?: string | undefined;
  /** Score threshold for the approximate nearest-neighbor search. Defaults to 0.0. */
  scoreThreshold?: number | undefined;
  /** Query type: `ANN`, `HYBRID`, or `FULL_TEXT`. Defaults to `ANN`. */
  queryType?: string | undefined;
  /** Columns whose values are sent to the reranker. */
  columnsToRerank?: string[] | undefined;
  /** If set, results are reranked before being returned. */
  reranker?: RerankerConfig | undefined;
  /** Text columns to search for `query_text`. When empty, all text columns are searched. */
  queryColumns?: string[] | undefined;
  /** Sort clauses, e.g. `["rating DESC", "price ASC"]`. Overrides relevance ordering. */
  sortColumns?: string[] | undefined;
  /** Facets to compute over the matched results (e.g. `"category TOP 5"`). */
  facets?: string[] | undefined;
  /** Maximum number of results to return (the legacy `num_results`). Defaults to 10. */
  maxResults?: number | undefined;
}

/** Response for QueryIndex carrying the matched rows and their column metadata. */
export interface QueryIndexResponse {
  /** Metadata describing the result columns. */
  manifest?: ResultManifest | undefined;
  /** The matched result rows. */
  result?: ResultData | undefined;
  /** Facet aggregation rows, when facets were requested. */
  facetResult?: FacetResultData | undefined;
}

/**
 * Request to remove rows by primary key from a Direct Access AI Search index.
 * Named RemoveData (not DeleteData) so the linter does not classify it as a standard
 * AIP-135 Delete method — it deletes rows within an index, not the index resource.
 */
export interface RemoveDataRequest {
  /**
   * Full resource name of the index. Must be a Direct Access index.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}/indexes/{index_id}`
   */
  name?: string | undefined;
  /** Primary keys of the rows to remove. */
  primaryKeys?: string[] | undefined;
}

/** Response for RemoveData. */
export interface RemoveDataResponse {
  /** Overall status of the delete. */
  status?: DataModificationStatus | undefined;
  /** Per-row outcome of the delete. */
  result?: DataModificationResult | undefined;
}

/** Configuration for reranking query results with a reranker model. */
export interface RerankerConfig {
  /**
   * Reranker identifier: "databricks_reranker" for the base model, or a Model Serving
   * endpoint name when `model_type` is MODEL_TYPE_FINETUNED.
   */
  model?: string | undefined;
  /** Parameters controlling reranking. */
  parameters?: RerankerConfig_RerankerParameters | undefined;
  /** Discriminator for how `model` is interpreted. */
  modelType?: RerankerConfig_ModelType | undefined;
}

/** Parameters controlling how the reranker processes results. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface RerankerConfig_RerankerParameters {
  /** Columns whose values are concatenated and sent to the reranker. */
  columnsToRerank?: string[] | undefined;
}

/** The rows of a query result set. */
export interface ResultData {
  /** Number of rows in the result set. */
  rowCount?: number | undefined;
  /** Result rows; each row is a list of column values aligned with the manifest columns. */
  dataArray?: JsonValue[][] | undefined;
}

/** Metadata describing the columns of a query result set. */
export interface ResultManifest {
  /** Number of columns in the result set. */
  columnCount?: number | undefined;
  /** Information about each column in the result set. */
  columns?: ColumnInfo[] | undefined;
  /** Number of columns in the facet result. */
  facetColumnCount?: number | undefined;
  /** Information about each facet column. */
  facetColumns?: ColumnInfo[] | undefined;
}

/**
 * Request to scan (paginate over) the rows of an AI Search index. Models the legacy
 * `num_results` / `last_primary_key` cursor as AIP-158 `page_size` / `page_token`.
 */
export interface ScanIndexRequest {
  /**
   * Full resource name of the index to scan.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}/indexes/{index_id}`
   */
  name?: string | undefined;
  /** Maximum number of rows to return in this page. */
  pageSize?: number | undefined;
  /** Page token from a previous response; if unset, scanning starts from the beginning. */
  pageToken?: string | undefined;
}

/** Response for ScanIndex carrying a page of rows and an optional continuation token. */
export interface ScanIndexResponse {
  /** The rows in this page, each a struct of column name to value. */
  data?: JsonObject[] | undefined;
  /** Token for the next page; empty when the scan is exhausted. */
  nextPageToken?: string | undefined;
}

/** Request to synchronize a Delta Sync AI Search index with its source Delta table. */
export interface SyncIndexRequest {
  /**
   * Full resource name of the index to synchronize. Must be a Delta Sync index.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}/indexes/{index_id}`
   */
  name?: string | undefined;
}

/**
 * Response for SyncIndex. Empty today; reserved so future sync metadata (e.g. an
 * operation handle) can be added without breaking the wire contract.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SyncIndexResponse {}

/**
 * AIP-134 conformant Update. The endpoint is nested under `endpoint`; the resource is
 * identified by `endpoint.name` (the full resource path). `update_mask` selects which
 * fields to update. Multi-bucket masks (mixing fields that target different legacy
 * mutation handlers — e.g. `budget_policy_id` + `custom_tags`) are supported: the
 * server issues one legacy backend call per bucket, applied in deterministic order.
 * Per-bucket failures are not atomic; if a later bucket fails the earlier mutations
 * have already been applied. Callers wanting strict atomicity should issue separate
 * requests.
 */
export interface UpdateEndpointRequest {
  /** The Endpoint resource to update. `endpoint.name` carries the full resource path. */
  endpoint?: Endpoint | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<Endpoint> | undefined;
}

/** Request to upsert rows into a Direct Access AI Search index. */
export interface UpsertDataRequest {
  /**
   * Full resource name of the index. Must be a Direct Access index.
   * Format: `workspaces/{workspace_id}/endpoints/{endpoint_id}/indexes/{index_id}`
   */
  name?: string | undefined;
  /** JSON document describing the rows to upsert. */
  inputsJson?: string | undefined;
}

/** Response for UpsertData. */
export interface UpsertDataResponse {
  /** Overall status of the upsert. */
  status?: DataModificationStatus | undefined;
  /** Per-row outcome of the upsert. */
  result?: DataModificationResult | undefined;
}

export const unmarshalColumnInfoSchema: z.ZodType<ColumnInfo> = z
  .object({
    name: z.string().optional(),
    type_text: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    typeText: d.type_text,
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

export const unmarshalDataModificationResultSchema: z.ZodType<DataModificationResult> =
  z
    .object({
      success_row_count: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      failed_primary_keys: z.array(z.string()).optional(),
    })
    .transform(d => ({
      successRowCount: d.success_row_count,
      failedPrimaryKeys: d.failed_primary_keys,
    }));

export const unmarshalDeltaSyncIndexSpecSchema: z.ZodType<DeltaSyncIndexSpec> =
  z
    .object({
      source_table: z.string().optional(),
      embedding_source_columns: z
        .array(z.lazy(() => unmarshalEmbeddingSourceColumnSchema))
        .optional(),
      embedding_vector_columns: z
        .array(z.lazy(() => unmarshalEmbeddingVectorColumnSchema))
        .optional(),
      embedding_writeback_table: z.string().optional(),
      columns_to_sync: z.array(z.string()).optional(),
      pipeline_id: z.string().optional(),
      pipeline_type: z.string().optional(),
    })
    .transform(d => ({
      sourceTable: d.source_table,
      embeddingSourceColumns: d.embedding_source_columns,
      embeddingVectorColumns: d.embedding_vector_columns,
      embeddingWritebackTable: d.embedding_writeback_table,
      columnsToSync: d.columns_to_sync,
      pipelineId: d.pipeline_id,
      pipelineType: d.pipeline_type,
    }));

export const unmarshalDirectAccessIndexSpecSchema: z.ZodType<DirectAccessIndexSpec> =
  z
    .object({
      embedding_vector_columns: z
        .array(z.lazy(() => unmarshalEmbeddingVectorColumnSchema))
        .optional(),
      schema_json: z.string().optional(),
      embedding_source_columns: z
        .array(z.lazy(() => unmarshalEmbeddingSourceColumnSchema))
        .optional(),
    })
    .transform(d => ({
      embeddingVectorColumns: d.embedding_vector_columns,
      schemaJson: d.schema_json,
      embeddingSourceColumns: d.embedding_source_columns,
    }));

export const unmarshalEmbeddingSourceColumnSchema: z.ZodType<EmbeddingSourceColumn> =
  z
    .object({
      name: z.string().optional(),
      embedding_model_endpoint: z.string().optional(),
      model_endpoint_name_for_query: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      embeddingModelEndpoint: d.embedding_model_endpoint,
      modelEndpointNameForQuery: d.model_endpoint_name_for_query,
    }));

export const unmarshalEmbeddingVectorColumnSchema: z.ZodType<EmbeddingVectorColumn> =
  z
    .object({
      name: z.string().optional(),
      embedding_dimension: z.number().optional(),
    })
    .transform(d => ({
      name: d.name,
      embeddingDimension: d.embedding_dimension,
    }));

export const unmarshalEndpointSchema: z.ZodType<Endpoint> = z
  .object({
    name: z.string().optional(),
    creator: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    endpoint_type: z.string().optional(),
    last_updated_user: z.string().optional(),
    id: z.string().optional(),
    endpoint_status: z.lazy(() => unmarshalEndpointStatusSchema).optional(),
    index_count: z.number().optional(),
    budget_policy_id: z.string().optional(),
    effective_budget_policy_id: z.string().optional(),
    custom_tags: z.array(z.lazy(() => unmarshalCustomTagSchema)).optional(),
    throughput_info: z
      .lazy(() => unmarshalEndpointThroughputInfoSchema)
      .optional(),
    scaling_info: z.lazy(() => unmarshalEndpointScalingInfoSchema).optional(),
    usage_policy_id: z.string().optional(),
    replica_count: z.number().optional(),
    target_qps: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    creator: d.creator,
    createTime: d.create_time,
    updateTime: d.update_time,
    endpointType: d.endpoint_type,
    lastUpdatedUser: d.last_updated_user,
    id: d.id,
    endpointStatus: d.endpoint_status,
    indexCount: d.index_count,
    budgetPolicyId: d.budget_policy_id,
    effectiveBudgetPolicyId: d.effective_budget_policy_id,
    customTags: d.custom_tags,
    throughputInfo: d.throughput_info,
    scalingInfo: d.scaling_info,
    usagePolicyId: d.usage_policy_id,
    replicaCount: d.replica_count,
    targetQps: d.target_qps,
  }));

export const unmarshalEndpointScalingInfoSchema: z.ZodType<EndpointScalingInfo> =
  z
    .object({
      state: z.string().optional(),
      requested_target_qps: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      state: d.state,
      requestedTargetQps: d.requested_target_qps,
    }));

export const unmarshalEndpointStatusSchema: z.ZodType<EndpointStatus> = z
  .object({
    state: z.string().optional(),
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
      change_request_state: z.string().optional(),
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

export const unmarshalFacetResultDataSchema: z.ZodType<FacetResultData> = z
  .object({
    facet_row_count: z.number().optional(),
    facet_array: z.array(z.array(jsonValueSchema)).optional(),
  })
  .transform(d => ({
    facetRowCount: d.facet_row_count,
    facetArray: d.facet_array,
  }));

export const unmarshalIndexSchema: z.ZodType<Index> = z
  .object({
    name: z.string().optional(),
    endpoint: z.string().optional(),
    primary_key: z.string().optional(),
    index_type: z.string().optional(),
    direct_access_index_spec: z
      .lazy(() => unmarshalDirectAccessIndexSpecSchema)
      .optional(),
    delta_sync_index_spec: z
      .lazy(() => unmarshalDeltaSyncIndexSpecSchema)
      .optional(),
    status: z.lazy(() => unmarshalIndexStatusSchema).optional(),
    creator: z.string().optional(),
    index_subtype: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    endpoint: d.endpoint,
    primaryKey: d.primary_key,
    indexType: d.index_type,
    indexSpec:
      d.direct_access_index_spec !== undefined
        ? {
            $case: 'directAccessIndexSpec' as const,
            directAccessIndexSpec: d.direct_access_index_spec,
          }
        : d.delta_sync_index_spec !== undefined
          ? {
              $case: 'deltaSyncIndexSpec' as const,
              deltaSyncIndexSpec: d.delta_sync_index_spec,
            }
          : undefined,
    status: d.status,
    creator: d.creator,
    indexSubtype: d.index_subtype,
  }));

export const unmarshalIndexStatusSchema: z.ZodType<IndexStatus> = z
  .object({
    message: z.string().optional(),
    indexed_row_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    ready: z.boolean().optional(),
    index_url: z.string().optional(),
  })
  .transform(d => ({
    message: d.message,
    indexedRowCount: d.indexed_row_count,
    ready: d.ready,
    indexUrl: d.index_url,
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

export const unmarshalListIndexesResponseSchema: z.ZodType<ListIndexesResponse> =
  z
    .object({
      indexes: z.array(z.lazy(() => unmarshalIndexSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      indexes: d.indexes,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalQueryIndexResponseSchema: z.ZodType<QueryIndexResponse> =
  z
    .object({
      manifest: z.lazy(() => unmarshalResultManifestSchema).optional(),
      result: z.lazy(() => unmarshalResultDataSchema).optional(),
      facet_result: z.lazy(() => unmarshalFacetResultDataSchema).optional(),
    })
    .transform(d => ({
      manifest: d.manifest,
      result: d.result,
      facetResult: d.facet_result,
    }));

export const unmarshalRemoveDataResponseSchema: z.ZodType<RemoveDataResponse> =
  z
    .object({
      status: z.string().optional(),
      result: z.lazy(() => unmarshalDataModificationResultSchema).optional(),
    })
    .transform(d => ({
      status: d.status,
      result: d.result,
    }));

export const unmarshalResultDataSchema: z.ZodType<ResultData> = z
  .object({
    row_count: z.number().optional(),
    data_array: z.array(z.array(jsonValueSchema)).optional(),
  })
  .transform(d => ({
    rowCount: d.row_count,
    dataArray: d.data_array,
  }));

export const unmarshalResultManifestSchema: z.ZodType<ResultManifest> = z
  .object({
    column_count: z.number().optional(),
    columns: z.array(z.lazy(() => unmarshalColumnInfoSchema)).optional(),
    facet_column_count: z.number().optional(),
    facet_columns: z.array(z.lazy(() => unmarshalColumnInfoSchema)).optional(),
  })
  .transform(d => ({
    columnCount: d.column_count,
    columns: d.columns,
    facetColumnCount: d.facet_column_count,
    facetColumns: d.facet_columns,
  }));

export const unmarshalScanIndexResponseSchema: z.ZodType<ScanIndexResponse> = z
  .object({
    data: z.array(jsonObjectSchema).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    data: d.data,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalSyncIndexResponseSchema: z.ZodType<SyncIndexResponse> =
  z.object({});

export const unmarshalUpsertDataResponseSchema: z.ZodType<UpsertDataResponse> =
  z
    .object({
      status: z.string().optional(),
      result: z.lazy(() => unmarshalDataModificationResultSchema).optional(),
    })
    .transform(d => ({
      status: d.status,
      result: d.result,
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

export const marshalDeltaSyncIndexSpecSchema: z.ZodType = z
  .object({
    sourceTable: z.string().optional(),
    embeddingSourceColumns: z
      .array(z.lazy(() => marshalEmbeddingSourceColumnSchema))
      .optional(),
    embeddingVectorColumns: z
      .array(z.lazy(() => marshalEmbeddingVectorColumnSchema))
      .optional(),
    embeddingWritebackTable: z.string().optional(),
    columnsToSync: z.array(z.string()).optional(),
    pipelineId: z.string().optional(),
    pipelineType: z.string().optional(),
  })
  .transform(d => ({
    source_table: d.sourceTable,
    embedding_source_columns: d.embeddingSourceColumns,
    embedding_vector_columns: d.embeddingVectorColumns,
    embedding_writeback_table: d.embeddingWritebackTable,
    columns_to_sync: d.columnsToSync,
    pipeline_id: d.pipelineId,
    pipeline_type: d.pipelineType,
  }));

export const marshalDirectAccessIndexSpecSchema: z.ZodType = z
  .object({
    embeddingVectorColumns: z
      .array(z.lazy(() => marshalEmbeddingVectorColumnSchema))
      .optional(),
    schemaJson: z.string().optional(),
    embeddingSourceColumns: z
      .array(z.lazy(() => marshalEmbeddingSourceColumnSchema))
      .optional(),
  })
  .transform(d => ({
    embedding_vector_columns: d.embeddingVectorColumns,
    schema_json: d.schemaJson,
    embedding_source_columns: d.embeddingSourceColumns,
  }));

export const marshalEmbeddingSourceColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    embeddingModelEndpoint: z.string().optional(),
    modelEndpointNameForQuery: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    embedding_model_endpoint: d.embeddingModelEndpoint,
    model_endpoint_name_for_query: d.modelEndpointNameForQuery,
  }));

export const marshalEmbeddingVectorColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    embeddingDimension: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    embedding_dimension: d.embeddingDimension,
  }));

export const marshalEndpointSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    creator: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    endpointType: z.string().optional(),
    lastUpdatedUser: z.string().optional(),
    id: z.string().optional(),
    endpointStatus: z.lazy(() => marshalEndpointStatusSchema).optional(),
    indexCount: z.number().optional(),
    budgetPolicyId: z.string().optional(),
    effectiveBudgetPolicyId: z.string().optional(),
    customTags: z.array(z.lazy(() => marshalCustomTagSchema)).optional(),
    throughputInfo: z
      .lazy(() => marshalEndpointThroughputInfoSchema)
      .optional(),
    scalingInfo: z.lazy(() => marshalEndpointScalingInfoSchema).optional(),
    usagePolicyId: z.string().optional(),
    replicaCount: z.number().optional(),
    targetQps: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    creator: d.creator,
    create_time: d.createTime,
    update_time: d.updateTime,
    endpoint_type: d.endpointType,
    last_updated_user: d.lastUpdatedUser,
    id: d.id,
    endpoint_status: d.endpointStatus,
    index_count: d.indexCount,
    budget_policy_id: d.budgetPolicyId,
    effective_budget_policy_id: d.effectiveBudgetPolicyId,
    custom_tags: d.customTags,
    throughput_info: d.throughputInfo,
    scaling_info: d.scalingInfo,
    usage_policy_id: d.usagePolicyId,
    replica_count: d.replicaCount,
    target_qps: d.targetQps,
  }));

export const marshalEndpointScalingInfoSchema: z.ZodType = z
  .object({
    state: z.string().optional(),
    requestedTargetQps: z.bigint().optional(),
  })
  .transform(d => ({
    state: d.state,
    requested_target_qps: d.requestedTargetQps,
  }));

export const marshalEndpointStatusSchema: z.ZodType = z
  .object({
    state: z.string().optional(),
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
    changeRequestState: z.string().optional(),
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

export const marshalIndexSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    endpoint: z.string().optional(),
    primaryKey: z.string().optional(),
    indexType: z.string().optional(),
    indexSpec: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('directAccessIndexSpec'),
          directAccessIndexSpec: z.lazy(
            () => marshalDirectAccessIndexSpecSchema
          ),
        }),
        z.object({
          $case: z.literal('deltaSyncIndexSpec'),
          deltaSyncIndexSpec: z.lazy(() => marshalDeltaSyncIndexSpecSchema),
        }),
      ])
      .optional(),
    status: z.lazy(() => marshalIndexStatusSchema).optional(),
    creator: z.string().optional(),
    indexSubtype: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    endpoint: d.endpoint,
    primary_key: d.primaryKey,
    index_type: d.indexType,
    ...(d.indexSpec?.$case === 'directAccessIndexSpec' && {
      direct_access_index_spec: d.indexSpec.directAccessIndexSpec,
    }),
    ...(d.indexSpec?.$case === 'deltaSyncIndexSpec' && {
      delta_sync_index_spec: d.indexSpec.deltaSyncIndexSpec,
    }),
    status: d.status,
    creator: d.creator,
    index_subtype: d.indexSubtype,
  }));

export const marshalIndexStatusSchema: z.ZodType = z
  .object({
    message: z.string().optional(),
    indexedRowCount: z.bigint().optional(),
    ready: z.boolean().optional(),
    indexUrl: z.string().optional(),
  })
  .transform(d => ({
    message: d.message,
    indexed_row_count: d.indexedRowCount,
    ready: d.ready,
    index_url: d.indexUrl,
  }));

export const marshalQueryIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    columns: z.array(z.string()).optional(),
    queryVector: z.array(z.number()).optional(),
    queryText: z.string().optional(),
    filtersJson: z.string().optional(),
    scoreThreshold: z.number().optional(),
    queryType: z.string().optional(),
    columnsToRerank: z.array(z.string()).optional(),
    reranker: z.lazy(() => marshalRerankerConfigSchema).optional(),
    queryColumns: z.array(z.string()).optional(),
    sortColumns: z.array(z.string()).optional(),
    facets: z.array(z.string()).optional(),
    maxResults: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    columns: d.columns,
    query_vector: d.queryVector,
    query_text: d.queryText,
    filters_json: d.filtersJson,
    score_threshold: d.scoreThreshold,
    query_type: d.queryType,
    columns_to_rerank: d.columnsToRerank,
    reranker: d.reranker,
    query_columns: d.queryColumns,
    sort_columns: d.sortColumns,
    facets: d.facets,
    max_results: d.maxResults,
  }));

export const marshalRemoveDataRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    primaryKeys: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    primary_keys: d.primaryKeys,
  }));

export const marshalRerankerConfigSchema: z.ZodType = z
  .object({
    model: z.string().optional(),
    parameters: z
      .lazy(() => marshalRerankerConfig_RerankerParametersSchema)
      .optional(),
    modelType: z.string().optional(),
  })
  .transform(d => ({
    model: d.model,
    parameters: d.parameters,
    model_type: d.modelType,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRerankerConfig_RerankerParametersSchema: z.ZodType = z
  .object({
    columnsToRerank: z.array(z.string()).optional(),
  })
  .transform(d => ({
    columns_to_rerank: d.columnsToRerank,
  }));

export const marshalScanIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalSyncIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalUpsertDataRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    inputsJson: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    inputs_json: d.inputsJson,
  }));

const endpointFieldMaskSchema: FieldMaskSchema = {
  budgetPolicyId: {wire: 'budget_policy_id'},
  createTime: {wire: 'create_time'},
  creator: {wire: 'creator'},
  customTags: {wire: 'custom_tags'},
  effectiveBudgetPolicyId: {wire: 'effective_budget_policy_id'},
  endpointStatus: {
    wire: 'endpoint_status',
    children: () => endpointStatusFieldMaskSchema,
  },
  endpointType: {wire: 'endpoint_type'},
  id: {wire: 'id'},
  indexCount: {wire: 'index_count'},
  lastUpdatedUser: {wire: 'last_updated_user'},
  name: {wire: 'name'},
  replicaCount: {wire: 'replica_count'},
  scalingInfo: {
    wire: 'scaling_info',
    children: () => endpointScalingInfoFieldMaskSchema,
  },
  targetQps: {wire: 'target_qps'},
  throughputInfo: {
    wire: 'throughput_info',
    children: () => endpointThroughputInfoFieldMaskSchema,
  },
  updateTime: {wire: 'update_time'},
  usagePolicyId: {wire: 'usage_policy_id'},
};

export function endpointFieldMask(...paths: string[]): FieldMask<Endpoint> {
  return FieldMask.build<Endpoint>(paths, endpointFieldMaskSchema);
}

const endpointScalingInfoFieldMaskSchema: FieldMaskSchema = {
  requestedTargetQps: {wire: 'requested_target_qps'},
  state: {wire: 'state'},
};

const endpointStatusFieldMaskSchema: FieldMaskSchema = {
  message: {wire: 'message'},
  state: {wire: 'state'},
};

const endpointThroughputInfoFieldMaskSchema: FieldMaskSchema = {
  changeRequestMessage: {wire: 'change_request_message'},
  changeRequestState: {wire: 'change_request_state'},
  currentConcurrency: {wire: 'current_concurrency'},
  currentConcurrencyUtilizationPercentage: {
    wire: 'current_concurrency_utilization_percentage',
  },
  currentNumReplicas: {wire: 'current_num_replicas'},
  maximumConcurrencyAllowed: {wire: 'maximum_concurrency_allowed'},
  minimalConcurrencyAllowed: {wire: 'minimal_concurrency_allowed'},
  requestedConcurrency: {wire: 'requested_concurrency'},
  requestedNumReplicas: {wire: 'requested_num_replicas'},
};
