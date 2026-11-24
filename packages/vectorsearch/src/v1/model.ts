// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import type {JsonValue} from '@databricks/sdk-core/wkt';
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

/** Type of endpoint. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointType = {
  STORAGE_OPTIMIZED: 'STORAGE_OPTIMIZED',
  STANDARD: 'STANDARD',
} as const;
export type EndpointType =
  | (typeof EndpointType)[keyof typeof EndpointType]
  | (string & {});

/** Lifecycle and ingestion state of an index. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IndexStatus = {
  /** Provisioning the index; a more specific state is not yet available. */
  PROVISIONING: 'PROVISIONING',
  /** Provisioning the serving endpoint. */
  PROVISIONING_ENDPOINT: 'PROVISIONING_ENDPOINT',
  /** Setting up a direct access index. */
  PROVISIONING_INDEX: 'PROVISIONING_INDEX',
  /** Acquiring compute resources for the ingestion pipeline. */
  PROVISIONING_PIPELINE_RESOURCES: 'PROVISIONING_PIPELINE_RESOURCES',
  /** Syncing the initial snapshot of the source Delta table. */
  PROVISIONING_INITIAL_SNAPSHOT: 'PROVISIONING_INITIAL_SNAPSHOT',
  /** The index can serve queries; more specific ingestion status is unavailable. */
  ONLINE: 'ONLINE',
  /** The index can serve queries while the continuous pipeline processes updates. */
  ONLINE_CONTINUOUS_UPDATE: 'ONLINE_CONTINUOUS_UPDATE',
  /** The index can serve queries while a triggered update is in progress. */
  ONLINE_TRIGGERED_UPDATE: 'ONLINE_TRIGGERED_UPDATE',
  /** The index can serve queries and no triggered update is currently reported as active. */
  ONLINE_NO_PENDING_UPDATE: 'ONLINE_NO_PENDING_UPDATE',
  /** The direct access index can serve queries. */
  ONLINE_DIRECT_ACCESS: 'ONLINE_DIRECT_ACCESS',
  /** The index cannot currently serve queries. */
  OFFLINE: 'OFFLINE',
  /** The index cannot serve queries because of a failure. */
  OFFLINE_FAILED: 'OFFLINE_FAILED',
  /** The latest pipeline update failed, but the index can still serve previously indexed data. */
  ONLINE_PIPELINE_FAILED: 'ONLINE_PIPELINE_FAILED',
  /** The index can serve queries while its pipeline restarts and acquires compute resources. */
  ONLINE_UPDATING_PIPELINE_RESOURCES: 'ONLINE_UPDATING_PIPELINE_RESOURCES',
  /** Downloading index data onto serving compute. */
  DOWNLOADING: 'DOWNLOADING',
} as const;
export type IndexStatus =
  | (typeof IndexStatus)[keyof typeof IndexStatus]
  | (string & {});

/**
 * The subtype of the AI Search index, determining the indexing and retrieval strategy.
 * - `VECTOR`: Not supported. Use `HYBRID` instead.
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
 * Pipeline execution mode.
 * - `TRIGGERED`: If the pipeline uses the triggered execution mode, the system stops processing after successfully refreshing the source table in the pipeline once, ensuring the table is updated based on the data available when the update started.
 * - `CONTINUOUS`: If the pipeline uses continuous execution, the pipeline processes new data as it arrives in the source table to keep vector index fresh.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PipelineType = {
  TRIGGERED: 'TRIGGERED',
  CONTINUOUS: 'CONTINUOUS',
} as const;
export type PipelineType =
  | (typeof PipelineType)[keyof typeof PipelineType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ScalingChangeState = {
  SCALING_CHANGE_UNSPECIFIED: 'SCALING_CHANGE_UNSPECIFIED',
  SCALING_CHANGE_APPLIED: 'SCALING_CHANGE_APPLIED',
  SCALING_CHANGE_IN_PROGRESS: 'SCALING_CHANGE_IN_PROGRESS',
} as const;
export type ScalingChangeState =
  | (typeof ScalingChangeState)[keyof typeof ScalingChangeState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const UpsertDeleteDataStatus = {
  SUCCESS: 'SUCCESS',
  PARTIAL_SUCCESS: 'PARTIAL_SUCCESS',
  FAILURE: 'FAILURE',
} as const;
export type UpsertDeleteDataStatus =
  | (typeof UpsertDeleteDataStatus)[keyof typeof UpsertDeleteDataStatus]
  | (string & {});

/**
 * There are 2 types of AI Search indexes:
 * - `DELTA_SYNC`: An index that automatically syncs with a source Delta Table, automatically and incrementally updating the index as the underlying data in the Delta Table changes.
 * - `DIRECT_ACCESS`: An index that supports direct read and write of vectors and metadata through our REST and SDK APIs. With this model, the user manages index updates.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const VectorIndexType = {
  DELTA_SYNC: 'DELTA_SYNC',
  DIRECT_ACCESS: 'DIRECT_ACCESS',
} as const;
export type VectorIndexType =
  | (typeof VectorIndexType)[keyof typeof VectorIndexType]
  | (string & {});

/** Reason an in-progress scaling change is delayed. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointScalingInfo_ScalingDelayReason = {
  /** The delay reason is not specified. */
  SCALING_DELAY_REASON_UNSPECIFIED: 'SCALING_DELAY_REASON_UNSPECIFIED',
  /** The additional capacity required for the change is not currently available. */
  CAPACITY_UNAVAILABLE: 'CAPACITY_UNAVAILABLE',
  /** The endpoint cannot be scaled down safely right now, so it remains at its current size. */
  SCALE_DOWN_BLOCKED: 'SCALE_DOWN_BLOCKED',
  /** The change is taking longer than expected. */
  TAKING_LONGER_THAN_EXPECTED: 'TAKING_LONGER_THAN_EXPECTED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EndpointScalingInfo_ScalingDelayReason =
  | (typeof EndpointScalingInfo_ScalingDelayReason)[keyof typeof EndpointScalingInfo_ScalingDelayReason]
  | (string & {});

/** Phase of an in-progress scaling change. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointScalingInfo_ScalingPhase = {
  /** The phase is not specified. */
  SCALING_PHASE_UNSPECIFIED: 'SCALING_PHASE_UNSPECIFIED',
  /** Capacity is being added to or removed from the endpoint. */
  ADJUSTING_CAPACITY: 'ADJUSTING_CAPACITY',
  /** The new capacity is in place and index replicas are being initialized on it. */
  INITIALIZING_INDEX: 'INITIALIZING_INDEX',
  /** The completion time is being estimated, for example just after the change is requested or updated. */
  ESTIMATING: 'ESTIMATING',
  /** The new capacity and index replicas are in place, and the change is being finalized. */
  FINALIZING: 'FINALIZING',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EndpointScalingInfo_ScalingPhase =
  | (typeof EndpointScalingInfo_ScalingPhase)[keyof typeof EndpointScalingInfo_ScalingPhase]
  | (string & {});

/** Current state of the endpoint */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointStatus_State = {
  PROVISIONING: 'PROVISIONING',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  /**
   * After the endpoint is ready, it can be in one of the following states:
   * - RED_STATE: The endpoint is unhealthy and needs to be investigated.
   * - YELLOW_STATE: The endpoint is healthy but needs to be monitored.
   * - ONLINE: The endpoint is healthy and ready to serve traffic.
   */
  RED_STATE: 'RED_STATE',
  YELLOW_STATE: 'YELLOW_STATE',
  /**
   * The endpoint is being deleted or has been deleted. Associated resources
   * are being cleaned up; once cleanup completes the endpoint will no longer
   * be retrievable.
   */
  DELETED: 'DELETED',
  /** Serving compute is being removed. Indexes and their data are retained. */
  STOPPING: 'STOPPING',
  /** The endpoint has no serving compute. Start it to serve queries again. */
  STOPPED: 'STOPPED',
  /** Serving compute is being restored; the endpoint becomes ONLINE when ready. */
  STARTING: 'STARTING',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EndpointStatus_State =
  | (typeof EndpointStatus_State)[keyof typeof EndpointStatus_State]
  | (string & {});

export interface ColumnInfo {
  /** Name of the column. */
  name?: string | undefined;
  /** Data type of the column (e.g., "string", "int", "array<float>") */
  typeText?: string | undefined;
}

export interface CreateEndpointRequest {
  /**
   * Name of the AI Search endpoint. The name must be unique within the workspace, have at most 50
   * characters, contain only lowercase letters, digits, hyphens, underscores and periods, and start
   * and end with a letter or digit.
   */
  name?: string | undefined;
  /**
   * Type of endpoint to create. STANDARD endpoints are optimized for low-latency queries and support
   * Target QPS scaling. STORAGE_OPTIMIZED endpoints hold much larger indexes and index faster, with
   * higher query latency. See https://docs.databricks.com/aws/en/ai-search/ai-search#endpoint-options.
   */
  endpointType?: EndpointType | undefined;
  /** Budget policy to attribute the endpoint's usage to. If omitted, the default budget policy applies. */
  budgetPolicyId?: string | undefined;
  /** The usage policy id to be applied once we've migrated to usage policies */
  usagePolicyId?: string | undefined;
  /**
   * Target queries per second (QPS) for the endpoint. Supported for STANDARD endpoints only.
   * The actual replica count is calculated at index creation/sync time based on this value.
   * Best-effort target; the system does not guarantee this QPS will be achieved.
   */
  targetQps?: bigint | undefined;
}

export interface CreateVectorIndexRequest {
  /** Three-level Unity Catalog name of the index to create. */
  name?: string | undefined;
  /** Name of the endpoint to be used for serving the index */
  endpointName?: string | undefined;
  /**
   * Name of the column that uniquely identifies each row. For a Delta Sync index it is a column of
   * the source table; for a Direct Vector Access index it must be declared in `schema_json`. It
   * cannot be the embedding source or embedding vector column.
   */
  primaryKey?: string | undefined;
  /** Type of index to create, which determines which spec field is required. */
  indexType?: VectorIndexType | undefined;
  indexSpec?:
    | {
        $case: 'directAccessIndexSpec';
        /** Specification for Direct Vector Access Index. Required if `index_type` is `DIRECT_ACCESS`. */
        directAccessIndexSpec: DirectAccessVectorIndexSpec;
      }
    | {
        $case: 'deltaSyncIndexSpec';
        /** Specification for Delta Sync Index. Required if `index_type` is `DELTA_SYNC`. */
        deltaSyncIndexSpec: DeltaSyncVectorIndexSpecRequest;
      }
    | undefined;
  /** The subtype of the index. Use `HYBRID` or `FULL_TEXT`. `VECTOR` is not supported. */
  indexSubtype?: IndexSubtype | undefined;
}

export interface CustomTag {
  /** Key field for an AI Search endpoint tag. */
  key?: string | undefined;
  /** [Optional] Value field for an AI Search endpoint tag. */
  value?: string | undefined;
}

/** Request payload for deleting data from a vector index. */
export interface DeleteDataVectorIndexRequest {
  /** Name of the vector index where data is to be deleted. Must be a Direct Vector Access Index. */
  name?: string | undefined;
  /** Primary keys of the rows to delete. At least one key is required. */
  primaryKeys?: string[] | undefined;
}

export interface DeleteDataVectorIndexResponse {
  /** Status of the delete operation. */
  status?: UpsertDeleteDataStatus | undefined;
  /** Result of the upsert or delete operation. */
  result?: UpsertDeleteDataResult | undefined;
}

export interface DeleteEndpointRequest {
  /** Name of the AI Search endpoint */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteEndpointResponse {}

export interface DeleteVectorIndexRequest {
  /** Three-level Unity Catalog name of the index. */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteVectorIndexResponse {}

export interface DeltaSyncVectorIndexSpec {
  /** Three-level Unity Catalog name of the source table that the index is synced from. */
  sourceTable?: string | undefined;
  /**
   * The source table column whose text Databricks embeds, together with the embedding model
   * endpoint to use. Set this for an index with Databricks-managed embeddings. Exactly one of
   * `embedding_source_columns` or `embedding_vector_columns` must be specified unless the index
   * subtype is `FULL_TEXT`, and only one column is supported.
   */
  embeddingSourceColumns?: EmbeddingSourceColumn[] | undefined;
  /**
   * The source table column that contains precomputed embedding vectors. Set this instead of
   * `embedding_source_columns` for an index with self-managed embeddings.
   */
  embeddingVectorColumns?: EmbeddingVectorColumn[] | undefined;
  /**
   * Pipeline execution mode.
   * - `TRIGGERED`: If the pipeline uses the triggered execution mode, the system stops processing after successfully refreshing the source table in the pipeline once, ensuring the table is updated based on the data available when the update started.
   * - `CONTINUOUS`: If the pipeline uses continuous execution, the pipeline processes new data as it arrives in the source table to keep vector index fresh.
   */
  pipelineType?: PipelineType | undefined;
  /** The ID of the pipeline that is used to sync the index. */
  pipelineId?: string | undefined;
  /** [Optional] Name of the Delta table to sync the vector index contents and computed embeddings to. */
  embeddingWritebackTable?: string | undefined;
  /**
   * [Optional] Select the columns to sync with the vector index. If you leave this field blank, all columns
   * from the source table are synced with the index. The primary key column and embedding source column or
   * embedding vector column are always synced.
   */
  columnsToSync?: string[] | undefined;
  /**
   * [Optional] Alias for columns_to_sync. Select the columns to include in the vector index.
   * If you leave this field blank, all columns from the source table are included.
   * The primary key column and embedding source column or embedding vector column are always included.
   * Only one of columns_to_sync or columns_to_index may be specified.
   */
  columnsToIndex?: string[] | undefined;
}

export interface DeltaSyncVectorIndexSpecRequest {
  /** Three-level Unity Catalog name of the source table that the index is synced from. */
  sourceTable?: string | undefined;
  /**
   * The source table column whose text Databricks embeds, together with the embedding model
   * endpoint to use. Set this for an index with Databricks-managed embeddings. Exactly one of
   * `embedding_source_columns` or `embedding_vector_columns` must be specified unless the index
   * subtype is `FULL_TEXT`, and only one column is supported.
   */
  embeddingSourceColumns?: EmbeddingSourceColumn[] | undefined;
  /**
   * The source table column that contains precomputed embedding vectors. Set this instead of
   * `embedding_source_columns` for an index with self-managed embeddings.
   */
  embeddingVectorColumns?: EmbeddingVectorColumn[] | undefined;
  /**
   * Pipeline execution mode.
   * - `TRIGGERED`: If the pipeline uses the triggered execution mode, the system stops processing after successfully refreshing the source table in the pipeline once, ensuring the table is updated based on the data available when the update started.
   * - `CONTINUOUS`: If the pipeline uses continuous execution, the pipeline processes new data as it arrives in the source table to keep vector index fresh.
   */
  pipelineType?: PipelineType | undefined;
  /** The ID of the pipeline that is used to sync the index. */
  pipelineId?: string | undefined;
  /** [Optional] Name of the Delta table to sync the vector index contents and computed embeddings to. */
  embeddingWritebackTable?: string | undefined;
  /**
   * [Optional] Select the columns to sync with the vector index. If you leave this field blank, all columns
   * from the source table are synced with the index. The primary key column and embedding source column or
   * embedding vector column are always synced.
   */
  columnsToSync?: string[] | undefined;
  /**
   * [Optional] Alias for columns_to_sync. Select the columns to include in the vector index.
   * If you leave this field blank, all columns from the source table are included.
   * The primary key column and embedding source column or embedding vector column are always included.
   * Only one of columns_to_sync or columns_to_index may be specified.
   */
  columnsToIndex?: string[] | undefined;
}

export interface DirectAccessVectorIndexSpec {
  /**
   * The column that holds the embedding vectors you write to the index. Exactly one column must be
   * specified, and `schema_json` must declare it as `array<float>` or `array<double>`.
   */
  embeddingVectorColumns?: EmbeddingVectorColumn[] | undefined;
  /**
   * JSON object that maps each column name of the index to its type, serialized to a string. The
   * primary key and the embedding vector column must be present.
   * Supported types are `integer`, `long`, `float`, `double`, `boolean`, `string`, `date`, `timestamp`.
   * Supported types for vector column: `array<float>`, `array<double>`.
   */
  schemaJson?: string | undefined;
  /**
   * Embedding source configuration used to embed `query_text` when the index is queried with text,
   * naming the embedding model endpoint to use. The index stores the vectors you supply through
   * upsert; this setting never computes embeddings for them.
   */
  embeddingSourceColumns?: EmbeddingSourceColumn[] | undefined;
}

export interface EmbeddingSourceColumn {
  /** Name of the column that contains the text to embed. */
  name?: string | undefined;
  /** TODO: clean up ai gateway related code. It's deprecated on ModelServing side. */
  embeddingConfig?:
    | {
        $case: 'embeddingModelEndpointName';
        /** Name of the embedding model endpoint, used by default for both ingestion and querying. */
        embeddingModelEndpointName: string;
      }
    | undefined;
  /** Name of the embedding model endpoint which, if specified, is used for querying (not ingestion). */
  modelEndpointNameForQuery?: string | undefined;
}

export interface EmbeddingVectorColumn {
  /** Name of the column that contains the embedding vectors. */
  name?: string | undefined;
  /** Dimension of the embedding vector */
  embeddingDimension?: number | undefined;
}

export interface Endpoint {
  /** Name of the AI Search endpoint */
  name?: string | undefined;
  /**
   * User or service principal that created the endpoint. Users are identified by username and
   * service principals by application ID.
   */
  creator?: string | undefined;
  /** Time at which the endpoint was created, in milliseconds since the Unix epoch. */
  creationTimestamp?: bigint | undefined;
  /** Time at which the endpoint was last updated, in milliseconds since the Unix epoch. */
  lastUpdatedTimestamp?: bigint | undefined;
  /**
   * Type of the endpoint. See https://docs.databricks.com/aws/en/ai-search/ai-search#endpoint-options
   * for how the types differ.
   */
  endpointType?: EndpointType | undefined;
  /** User or service principal that last updated the endpoint, in the same form as creator. */
  lastUpdatedUser?: string | undefined;
  /** Unique identifier of the endpoint */
  id?: string | undefined;
  /** Current status of the endpoint */
  endpointStatus?: EndpointStatus | undefined;
  /** Number of indexes on the endpoint */
  numIndexes?: number | undefined;
  /** The user-selected budget policy id for the endpoint. */
  budgetPolicyId?: string | undefined;
  /**
   * Budget policy ID in effect for the endpoint. This is the policy set on the endpoint when one was
   * set, and otherwise the default budget policy.
   */
  effectiveBudgetPolicyId?: string | undefined;
  /** The custom tags assigned to the endpoint */
  customTags?: CustomTag[] | undefined;
  /**
   * Scaling information for the endpoint. Present only for STANDARD endpoints that have a Target QPS
   * set.
   */
  scalingInfo?: EndpointScalingInfo | undefined;
}

/**
 * Scaling information for a Standard endpoint: the current scaling state, the requested QPS
 * target, and the progress of an in-progress scaling change.
 */
export interface EndpointScalingInfo {
  /** The current state of the scaling change request. */
  state?: ScalingChangeState | undefined;
  /**
   * The requested QPS target for the endpoint. Best-effort; the system does not
   * guarantee this QPS will be achieved.
   */
  requestedTargetQps?: bigint | undefined;
  /**
   * Estimated time at which the in-progress scaling change will complete, in milliseconds
   * since the Unix epoch. The estimate may change as the scaling change progresses. Unset
   * when no scaling change is in progress, when no estimate is available, or when the change
   * is delayed (see `delayed_reason`).
   */
  estimatedCompletionTimestamp?: bigint | undefined;
  /**
   * Current phase of the in-progress scaling change. Unset when no scaling change is in
   * progress or the phase is not available.
   */
  phase?: EndpointScalingInfo_ScalingPhase | undefined;
  /**
   * Percentage of index initialization completed, from 0 to 100. Set only during the
   * `INITIALIZING_INDEX` phase; unset in other phases or when progress is not available.
   */
  indexInitializationPercentage?: number | undefined;
  /**
   * Reason the in-progress scaling change is delayed. When set, `estimated_completion_timestamp`
   * is unset. Unset when the change is not delayed or no scaling change is in progress.
   */
  delayedReason?: EndpointScalingInfo_ScalingDelayReason | undefined;
  /**
   * Earliest time a new Target QPS change is accepted, in milliseconds since the Unix epoch. Set
   * only while a scaling change is in progress, the change lock is on, and the endpoint has a
   * recorded last throughput change; may be in the past once the lock has expired.
   */
  targetQpsChangeAllowedAfterTimestamp?: bigint | undefined;
}

/** Status information of an endpoint */
export interface EndpointStatus {
  /** Current state of the endpoint */
  state?: EndpointStatus_State | undefined;
  /**
   * Additional detail about the state, such as the reason the endpoint is OFFLINE. Absent when there
   * is nothing to report.
   */
  message?: string | undefined;
}

/** Facet aggregation rows returned by a query. */
export interface FacetResultData {
  /** Number of facet rows returned. */
  facetRowCount?: number | undefined;
  /** Facet rows. Each row is `[facet_column_name, value_or_range, count]`. */
  facetArray?: JsonValue[][] | undefined;
}

/** Failure details for an index or its latest ingestion update. */
export interface FailedStatus {
  /** Error message, when available. */
  errorMessage?: string | undefined;
  /** Last source Delta table version fully processed while the index is still queryable. */
  lastProcessedCommitVersion?: bigint | undefined;
  /**
   * [Standard endpoint] timestamp when the last processed commit was committed to the source table.
   * [Storage Optimized endpoint] timestamp when the last processed commit was processed by the pipeline.
   */
  lastProcessedCommitTimestamp?: Temporal.Instant | undefined;
  /** Error code associated with the error message, when available. */
  errorCode?: string | undefined;
}

export interface GetEndpointRequest {
  /** Name of the endpoint */
  name?: string | undefined;
}

export interface GetVectorIndexRequest {
  /** Three-level Unity Catalog name of the index. */
  name?: string | undefined;
  /**
   * If true, the URL returned for the index is guaranteed to be compatible with the reranker.
   * Currently this means we return the CP URL regardless of how the index is being accessed.
   * If not set or set to false, the URL may still be compatible with the reranker depending on
   * what URL we return.
   */
  ensureRerankerCompatible?: boolean | undefined;
}

export interface ListEndpointResponse {
  /** An array of Endpoint objects */
  endpoints?: Endpoint[] | undefined;
  /** A token that can be used to get the next page of results. If not present, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface ListEndpointsRequest {
  /** Token for pagination */
  pageToken?: string | undefined;
}

export interface ListValue {
  /** Repeated field of dynamically typed values. */
  values?: Value[] | undefined;
}

export interface ListVectorIndexRequest {
  /** Name of the endpoint whose indexes to list. */
  endpointName?: string | undefined;
  /** Page token returned by a previous call, used to get the next page of results. */
  pageToken?: string | undefined;
}

export interface ListVectorIndexResponse {
  /**
   * Indexes served by the endpoint. Each entry is a summary without the index specification and
   * status; use Get an index to retrieve them.
   */
  vectorIndexes?: MiniVectorIndex[] | undefined;
  /** A token that can be used to get the next page of results. If not present, there are no more results to show. */
  nextPageToken?: string | undefined;
}

/** Key-value pair. */
export interface MapStringValueEntry {
  /** Column name. */
  key?: string | undefined;
  /** Column value, nullable. */
  value?: Value | undefined;
}

/** Metric specification */
export interface Metric {
  /**
   * Metric name. Supported metrics include: `EndpointHealthStatus`, `EndpointConcurrency`,
   * `IndexRequestCount`, `IndexRequestLatency`, `IndexRequestErrorSourceCount`,
   * `IndexRequestGuidanceCount`, `IndexRequestGuidancePeakRate`, `IndexIngestedRows`, and
   * `IndexEmbeddedRows`.
   * An unknown name is rejected with an error that lists the available metric names.
   */
  name?: string | undefined;
  /**
   * Labels that restrict the metric to matching series, for example to a single index.
   * Endpoint-level metrics do not accept labels.
   */
  labels?: MetricLabel[] | undefined;
  /**
   * Percentile for latency metrics, such as `IndexRequestLatency`, which require it. One of 0.5,
   * 0.75, 0.9, 0.95, or 0.99.
   */
  percentile?: number | undefined;
}

/** Label for a metric */
export interface MetricLabel {
  /**
   * Label name, such as `error_source`, `failure_cause`, `operation`, `request_path`,
   * `query_type`, `response_code`, or `index_name`. Supported labels depend on the metric.
   */
  name?: string | undefined;
  /**
   * Label value, as an RE2 regular expression. The label also splits the result by its values,
   * so `.+` returns one series per value. Some labels, such as `operation`, accept only `.+`,
   * `.*`, or listed values joined by `|`.
   */
  value?: string | undefined;
}

/** Single metric value at a specific timestamp */
export interface MetricValue {
  /** Timestamp of the metric value, in seconds since the Unix epoch. */
  timestamp?: bigint | undefined;
  /** Value of the metric at `timestamp`. */
  value?: number | undefined;
}

/** Collection of metric values for a specific metric */
export interface MetricValues {
  /** The metric this time series was computed for, including the labels that identify the series. */
  metric?: Metric | undefined;
  /** Each entry is one data point of the time series. */
  values?: MetricValue[] | undefined;
}

/**
 * An AI Search index stores vectors and metadata on an endpoint and serves vector similarity,
 * full-text and hybrid search queries over them. A Delta Sync index is kept in sync with a source
 * table, with embeddings either computed by Databricks from a text column or supplied by you in a
 * vector column; a Direct Vector Access index holds rows that you write through the upsert and
 * delete data APIs. See https://docs.databricks.com/aws/en/ai-search/create-ai-search for how to
 * choose between them.
 */
export interface MiniVectorIndex {
  /** Three-level Unity Catalog name of the index. */
  name?: string | undefined;
  /** Name of the endpoint that serves the index. */
  endpointName?: string | undefined;
  /** Name of the column that uniquely identifies each row of the index. */
  primaryKey?: string | undefined;
  /**
   * Type of the index, which determines whether `delta_sync_index_spec` or
   * `direct_access_index_spec` describes it.
   */
  indexType?: VectorIndexType | undefined;
  indexSpec?:
    | {
        $case: 'directAccessIndexSpec';
        /**
         * Specification of a Direct Vector Access index. Present only when `index_type` is
         * `DIRECT_ACCESS`.
         */
        directAccessIndexSpec: DirectAccessVectorIndexSpec;
      }
    | {
        $case: 'deltaSyncIndexSpec';
        /** Specification of a Delta Sync index. Present only when `index_type` is `DELTA_SYNC`. */
        deltaSyncIndexSpec: DeltaSyncVectorIndexSpec;
      }
    | undefined;
  /**
   * Current status of the index, including whether it is ready to serve queries and how many rows
   * it holds.
   */
  status?: VectorIndexStatus | undefined;
  /** The user who created the index. */
  creator?: string | undefined;
  /**
   * Subtype of the index. A `HYBRID` index supports vector similarity, full-text and hybrid
   * queries; a `FULL_TEXT` index has no embeddings and supports only full-text queries.
   */
  indexSubtype?: IndexSubtype | undefined;
  /** ID of the endpoint associated with the index. */
  endpointId?: string | undefined;
}

export interface PatchEndpointBudgetPolicyRequest {
  /** Name of the AI Search endpoint */
  name?: string | undefined;
  /** The budget policy id to be applied */
  budgetPolicyId?: string | undefined;
}

export interface PatchEndpointBudgetPolicyResponse {
  /** The requested budget policy ID, returned when the endpoint was already using it. */
  budgetPolicyId?: string | undefined;
  /** The budget policy applied to the AI Search endpoint. */
  effectiveBudgetPolicyId?: string | undefined;
}

export interface PatchEndpointRequest {
  /** Name of the AI Search endpoint */
  name?: string | undefined;
  /**
   * Target QPS for the endpoint. Best-effort; the system does not guarantee this QPS
   * will be achieved. Set to -1 to clear the Target QPS, as if it had never been set.
   */
  targetQps?: bigint | undefined;
}

/** Request payload for getting next page of results. */
export interface QueryVectorIndexNextPageRequest {
  /** Name of the vector index to query. */
  name?: string | undefined;
  /** Name of the endpoint that serves the index. */
  endpointName?: string | undefined;
  /** Page token returned from previous `QueryVectorIndex` or `QueryVectorIndexNextPage` API. */
  pageToken?: string | undefined;
}

export interface QueryVectorIndexRequest {
  /** Name of the vector index to query. */
  name?: string | undefined;
  /**
   * Maximum number of results to return. It must be greater than 0 and defaults to 10. By default,
   * a `HYBRID` query can return at most 200 results.
   */
  numResults?: number | undefined;
  /**
   * Names of the columns to return for each result. At least one column is required, and only
   * columns that are part of the index can be returned.
   */
  columns?: string[] | undefined;
  /**
   * Filters to apply to the results, as a JSON object serialized to a string. Each key is a column
   * name, optionally followed by a space and an operator, and each value is the value or list of
   * values to compare the column against. A key without an operator matches the value exactly, or
   * any of the listed values. Supported operators are `NOT`, `<`, `<=`, `>`, `>=`, `OR` and `LIKE`;
   * see https://docs.databricks.com/aws/en/ai-search/query-ai-search for their semantics. This
   * field is not supported on storage-optimized endpoints.
   */
  filtersJson?: string | undefined;
  /**
   * Embedding vector to search for. Use it for an index whose embeddings you compute yourself: a
   * Direct Vector Access index or a Delta Sync index with `embedding_vector_columns`. A `HYBRID`
   * query on a Delta Sync index with `embedding_vector_columns`, or on a Direct Vector Access index
   * without `embedding_source_columns`, requires both `query_vector` and `query_text`. A Direct
   * Vector Access index with `embedding_source_columns` can be queried with `query_text` alone.
   */
  queryVector?: number[] | undefined;
  /**
   * Text to search for. Use it for an index with Databricks-managed embeddings, which embeds the
   * text with the index's embedding model endpoint, and for `FULL_TEXT` queries on any index. A
   * `HYBRID` query on an index with managed embeddings requires only `query_text`.
   */
  queryText?: string | undefined;
  /** Threshold for the approximate nearest neighbor search. Defaults to 0.0. */
  scoreThreshold?: number | undefined;
  /** The query type to use. Choices are `ANN` and `HYBRID` and `FULL_TEXT`. Defaults to `ANN`. */
  queryType?: string | undefined;
  /** Column names used to retrieve data to send to the reranker. */
  columnsToRerank?: string[] | undefined;
  /**
   * If set, the top 50 results are reranked with the Databricks Reranker model before returning the `num_results` results to the user.
   * The setting `columns_to_rerank` selects which columns are used for reranking. For each datapoint, the columns selected are concatenated before
   * being sent to the reranking model. See https://docs.databricks.com/aws/en/vector-search/query-vector-search#rerank for more information.
   */
  reranker?: RerankerConfig | undefined;
  /** Text columns to search for `query_text`. When empty, all text columns are searched. */
  queryColumns?: string[] | undefined;
  /**
   * Sort results by column values instead of the default relevance ordering.
   * Each clause has the form `"<column> ASC"` or `"<column> DESC"`, for example
   * `["rating DESC", "price ASC"]`.
   */
  sortColumns?: string[] | undefined;
  /**
   * Facets to compute over the matched results. Each entry has one of these forms:
   * `"<column>"`                         - top 10 distinct values by count
   * `"<column> TOP <n>"`                 - top n distinct values, where n > 0
   * `"<column> BUCKETS [[from,to],...]"` - inclusive numeric ranges
   * `TOP` and `BUCKETS` are case-insensitive. A column may appear at most once.
   */
  facets?: string[] | undefined;
}

export interface QueryVectorIndexResponse {
  /** Metadata about the result set. */
  manifest?: ResultManifest | undefined;
  /** Data returned in the query result. */
  result?: ResultData | undefined;
  /**
   * [Optional] Token that can be used in `QueryVectorIndexNextPage` API to get next page of results.
   * If more than 1000 results satisfy the query, they are returned in groups of 1000.
   * Empty value means no more results. The maximum number of results that can be returned is 10,000.
   */
  nextPageToken?: string | undefined;
  /** Facet aggregation rows returned by a query. */
  facetResult?: FacetResultData | undefined;
}

export interface RerankerConfig {
  /**
   * Reranker identifier:
   * - When model_type=BASE/UNSPECIFIED: must be "databricks_reranker".
   * - When model_type=FINETUNED: the Model Serving endpoint name hosting a finetuned reranker.
   */
  model?: string | undefined;
  /** Parameters that control how the reranker processes the query results. */
  parameters?: RerankerConfig_RerankerParameters | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface RerankerConfig_RerankerParameters {
  /**
   * Names of the columns whose values are sent to the reranker. List the most relevant column
   * first, since the order affects the ranking.
   */
  columnsToRerank?: string[] | undefined;
}

/** Data returned in the query result. */
export interface ResultData {
  /** Number of rows in the result set. */
  rowCount?: number | undefined;
  /** Data rows returned in the query. */
  dataArray?: JsonValue[][] | undefined;
}

/** Metadata about the result set. */
export interface ResultManifest {
  /** Number of columns in the result set. */
  columnCount?: number | undefined;
  /** Information about each column in the result set. */
  columns?: ColumnInfo[] | undefined;
  /** Number of columns in `facet_result`. */
  facetColumnCount?: number | undefined;
  /** Information about each column in `facet_result`. */
  facetColumns?: ColumnInfo[] | undefined;
}

/** Request to retrieve user-visible metrics */
export interface RetrieveUserVisibleMetricsRequest {
  /** Name of the endpoint whose metrics to retrieve. */
  name?: string | undefined;
  /** Start of the time range. Required. Must be within the last 169 hours. */
  startTime?: Temporal.Instant | undefined;
  /** End of the time range. Defaults to the current time. Must be later than `start_time`. */
  endTime?: Temporal.Instant | undefined;
  /**
   * Requested interval between data points, in seconds. Defaults to 60, which is also the minimum.
   * The server may return a finer or coarser interval: 60 seconds only for time ranges of 1 hour or
   * less, otherwise 300 seconds or more. Read the interval from the returned timestamps.
   */
  granularityInSeconds?: number | undefined;
  /**
   * Metrics to retrieve. Each entry names a metric and optionally narrows it with labels or a
   * percentile. An unknown metric name fails the whole request, and an empty list returns no series.
   */
  metrics?: Metric[] | undefined;
  /** Not used. The response returns all data points in one page. */
  pageToken?: string | undefined;
}

/** Response containing user-visible metrics */
export interface RetrieveUserVisibleMetricsResponse {
  /**
   * One time series for each requested metric and each combination of label values it was broken
   * down by.
   */
  metricValues?: MetricValues[] | undefined;
  /** Not set. The response returns all data points in one page. */
  nextPageToken?: string | undefined;
}

export interface ScanVectorIndexRequest {
  /** Name of the vector index to scan. */
  name?: string | undefined;
  /** Number of results to return. Defaults to 10. */
  numResults?: number | undefined;
  /** Primary key of the last entry returned in the previous scan. */
  lastPrimaryKey?: string | undefined;
}

/** Response to a scan vector index request. */
export interface ScanVectorIndexResponse {
  /** List of data entries */
  data?: Struct[] | undefined;
  /** Primary key of the last entry. */
  lastPrimaryKey?: string | undefined;
}

export interface StartEndpointRequest {
  /** Name of the AI Search endpoint */
  name?: string | undefined;
}

export interface StopEndpointRequest {
  /** Name of the AI Search endpoint */
  name?: string | undefined;
}

export interface Struct {
  /** Data entry, corresponding to a row in a vector index. */
  fields?: MapStringValueEntry[] | undefined;
}

export interface SyncVectorIndexRequest {
  /** Name of the vector index to synchronize. Must be a Delta Sync Index. */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SyncVectorIndexResponse {}

export interface UpdateEndpointCustomTagsRequest {
  /** Name of the AI Search endpoint */
  name?: string | undefined;
  /** The new custom tags for the AI Search endpoint */
  customTags?: CustomTag[] | undefined;
}

export interface UpdateEndpointCustomTagsResponse {
  /** The name of the AI Search endpoint whose custom tags were updated. */
  name?: string | undefined;
  /** All the custom tags that are applied to the AI Search endpoint. */
  customTags?: CustomTag[] | undefined;
}

export interface UpsertDataVectorIndexRequest {
  /** Name of the vector index where data is to be upserted. Must be a Direct Vector Access Index. */
  name?: string | undefined;
  /**
   * Rows to upsert, as a JSON array of objects serialized to a string. Each object maps column
   * names from `schema_json` to values and must include the primary key. A row whose primary key
   * already exists in the index is replaced.
   */
  inputsJson?: string | undefined;
}

export interface UpsertDataVectorIndexResponse {
  /** Status of the upsert operation. */
  status?: UpsertDeleteDataStatus | undefined;
  /** Result of the upsert or delete operation. */
  result?: UpsertDeleteDataResult | undefined;
}

export interface UpsertDeleteDataResult {
  /** Count of successfully processed rows. */
  successRowCount?: bigint | undefined;
  /** List of primary keys for rows that failed to process. */
  failedPrimaryKeys?: string[] | undefined;
}

export interface Value {
  /** (--The kind of value.--) */
  kind?:
    | {$case: 'numberValue'; numberValue: number}
    | {$case: 'stringValue'; stringValue: string}
    | {$case: 'boolValue'; boolValue: boolean}
    | {$case: 'structValue'; structValue: Struct}
    | {$case: 'listValue'; listValue: ListValue}
    | undefined;
}

/**
 * An AI Search index stores vectors and metadata on an endpoint and serves vector similarity,
 * full-text and hybrid search queries over them. A Delta Sync index is kept in sync with a source
 * table, with embeddings either computed by Databricks from a text column or supplied by you in a
 * vector column; a Direct Vector Access index holds rows that you write through the upsert and
 * delete data APIs. See https://docs.databricks.com/aws/en/ai-search/create-ai-search for how to
 * choose between them.
 */
export interface VectorIndex {
  /** Three-level Unity Catalog name of the index. */
  name?: string | undefined;
  /** Name of the endpoint that serves the index. */
  endpointName?: string | undefined;
  /** Name of the column that uniquely identifies each row of the index. */
  primaryKey?: string | undefined;
  /**
   * Type of the index, which determines whether `delta_sync_index_spec` or
   * `direct_access_index_spec` describes it.
   */
  indexType?: VectorIndexType | undefined;
  indexSpec?:
    | {
        $case: 'directAccessIndexSpec';
        /**
         * Specification of a Direct Vector Access index. Present only when `index_type` is
         * `DIRECT_ACCESS`.
         */
        directAccessIndexSpec: DirectAccessVectorIndexSpec;
      }
    | {
        $case: 'deltaSyncIndexSpec';
        /** Specification of a Delta Sync index. Present only when `index_type` is `DELTA_SYNC`. */
        deltaSyncIndexSpec: DeltaSyncVectorIndexSpec;
      }
    | undefined;
  /**
   * Current status of the index, including whether it is ready to serve queries and how many rows
   * it holds.
   */
  status?: VectorIndexStatus | undefined;
  /** The user who created the index. */
  creator?: string | undefined;
  /**
   * Subtype of the index. A `HYBRID` index supports vector similarity, full-text and hybrid
   * queries; a `FULL_TEXT` index has no embeddings and supports only full-text queries.
   */
  indexSubtype?: IndexSubtype | undefined;
  /** ID of the endpoint associated with the index. */
  endpointId?: string | undefined;
}

export interface VectorIndexStatus {
  /** Lifecycle and ingestion state. An online index can still have a failed update. */
  detailedState?: IndexStatus | undefined;
  /** Human-readable description of the current status. */
  message?: string | undefined;
  /** Number of rows indexed */
  indexedRowCount?: bigint | undefined;
  detailedStatus?:
    | {
        $case: 'failedStatus';
        /** Failure details, when available, for OFFLINE_FAILED or ONLINE_PIPELINE_FAILED. */
        failedStatus: FailedStatus;
      }
    | undefined;
  /**
   * Whether the index can serve queries. This does not mean the latest update succeeded
   * or that all source-table changes have been indexed; check detailed_state for update failures.
   */
  ready?: boolean | undefined;
  /** Index API Url to be used to perform operations on the index */
  indexUrl?: string | undefined;
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

export const unmarshalDeleteDataVectorIndexResponseSchema: z.ZodType<DeleteDataVectorIndexResponse> =
  z
    .object({
      status: z.string().optional(),
      result: z
        .lazy(() => unmarshalUpsertDeleteDataResultSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      status: d.status,
      result: d.result,
    }));

export const unmarshalDeleteEndpointResponseSchema: z.ZodType<DeleteEndpointResponse> =
  z.object({});

export const unmarshalDeleteVectorIndexResponseSchema: z.ZodType<DeleteVectorIndexResponse> =
  z.object({});

export const unmarshalDeltaSyncVectorIndexSpecSchema: z.ZodType<DeltaSyncVectorIndexSpec> =
  z
    .object({
      source_table: z.string().optional(),
      embedding_source_columns: z
        .array(z.lazy(() => unmarshalEmbeddingSourceColumnSchema))
        .optional(),
      embedding_vector_columns: z
        .array(z.lazy(() => unmarshalEmbeddingVectorColumnSchema))
        .optional(),
      pipeline_type: z.string().optional(),
      pipeline_id: z.string().optional(),
      embedding_writeback_table: z.string().optional(),
      columns_to_sync: z.array(z.string()).optional(),
      columns_to_index: z.array(z.string()).optional(),
    })
    .transform(d => ({
      sourceTable: d.source_table,
      embeddingSourceColumns: d.embedding_source_columns,
      embeddingVectorColumns: d.embedding_vector_columns,
      pipelineType: d.pipeline_type,
      pipelineId: d.pipeline_id,
      embeddingWritebackTable: d.embedding_writeback_table,
      columnsToSync: d.columns_to_sync,
      columnsToIndex: d.columns_to_index,
    }));

export const unmarshalDirectAccessVectorIndexSpecSchema: z.ZodType<DirectAccessVectorIndexSpec> =
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
      embedding_model_endpoint_name: z.string().optional(),
      model_endpoint_name_for_query: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      embeddingConfig:
        d.embedding_model_endpoint_name !== undefined
          ? {
              $case: 'embeddingModelEndpointName' as const,
              embeddingModelEndpointName: d.embedding_model_endpoint_name,
            }
          : undefined,
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
    creation_timestamp: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    last_updated_timestamp: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    endpoint_type: z.string().optional(),
    last_updated_user: z.string().optional(),
    id: z.string().optional(),
    endpoint_status: z
      .lazy(() => unmarshalEndpointStatusSchema)
      .nullish()
      .transform(v => v ?? undefined),
    num_indexes: z.number().optional(),
    budget_policy_id: z.string().optional(),
    effective_budget_policy_id: z.string().optional(),
    custom_tags: z.array(z.lazy(() => unmarshalCustomTagSchema)).optional(),
    scaling_info: z
      .lazy(() => unmarshalEndpointScalingInfoSchema)
      .nullish()
      .transform(v => v ?? undefined),
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
    scalingInfo: d.scaling_info,
  }));

export const unmarshalEndpointScalingInfoSchema: z.ZodType<EndpointScalingInfo> =
  z
    .object({
      state: z.string().optional(),
      requested_target_qps: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      estimated_completion_timestamp: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      phase: z.string().optional(),
      index_initialization_percentage: z.number().optional(),
      delayed_reason: z.string().optional(),
      target_qps_change_allowed_after_timestamp: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      state: d.state,
      requestedTargetQps: d.requested_target_qps,
      estimatedCompletionTimestamp: d.estimated_completion_timestamp,
      phase: d.phase,
      indexInitializationPercentage: d.index_initialization_percentage,
      delayedReason: d.delayed_reason,
      targetQpsChangeAllowedAfterTimestamp:
        d.target_qps_change_allowed_after_timestamp,
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

export const unmarshalFacetResultDataSchema: z.ZodType<FacetResultData> = z
  .object({
    facet_row_count: z.number().optional(),
    facet_array: z.array(z.array(jsonValueSchema)).optional(),
  })
  .transform(d => ({
    facetRowCount: d.facet_row_count,
    facetArray: d.facet_array,
  }));

export const unmarshalFailedStatusSchema: z.ZodType<FailedStatus> = z
  .object({
    error_message: z.string().optional(),
    last_processed_commit_version: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    last_processed_commit_timestamp: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    error_code: z.string().optional(),
  })
  .transform(d => ({
    errorMessage: d.error_message,
    lastProcessedCommitVersion: d.last_processed_commit_version,
    lastProcessedCommitTimestamp: d.last_processed_commit_timestamp,
    errorCode: d.error_code,
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

export const unmarshalListValueSchema: z.ZodType<ListValue> = z
  .object({
    values: z.array(z.lazy(() => unmarshalValueSchema)).optional(),
  })
  .transform(d => ({
    values: d.values,
  }));

export const unmarshalListVectorIndexResponseSchema: z.ZodType<ListVectorIndexResponse> =
  z
    .object({
      vector_indexes: z
        .array(z.lazy(() => unmarshalMiniVectorIndexSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      vectorIndexes: d.vector_indexes,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMapStringValueEntrySchema: z.ZodType<MapStringValueEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z
        .lazy(() => unmarshalValueSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalMetricSchema: z.ZodType<Metric> = z
  .object({
    name: z.string().optional(),
    labels: z.array(z.lazy(() => unmarshalMetricLabelSchema)).optional(),
    percentile: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    labels: d.labels,
    percentile: d.percentile,
  }));

export const unmarshalMetricLabelSchema: z.ZodType<MetricLabel> = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    value: d.value,
  }));

export const unmarshalMetricValueSchema: z.ZodType<MetricValue> = z
  .object({
    timestamp: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    value: z.number().optional(),
  })
  .transform(d => ({
    timestamp: d.timestamp,
    value: d.value,
  }));

export const unmarshalMetricValuesSchema: z.ZodType<MetricValues> = z
  .object({
    metric: z
      .lazy(() => unmarshalMetricSchema)
      .nullish()
      .transform(v => v ?? undefined),
    values: z.array(z.lazy(() => unmarshalMetricValueSchema)).optional(),
  })
  .transform(d => ({
    metric: d.metric,
    values: d.values,
  }));

export const unmarshalMiniVectorIndexSchema: z.ZodType<MiniVectorIndex> = z
  .object({
    name: z.string().optional(),
    endpoint_name: z.string().optional(),
    primary_key: z.string().optional(),
    index_type: z.string().optional(),
    direct_access_index_spec: z
      .lazy(() => unmarshalDirectAccessVectorIndexSpecSchema)
      .optional(),
    delta_sync_index_spec: z
      .lazy(() => unmarshalDeltaSyncVectorIndexSpecSchema)
      .optional(),
    status: z
      .lazy(() => unmarshalVectorIndexStatusSchema)
      .nullish()
      .transform(v => v ?? undefined),
    creator: z.string().optional(),
    index_subtype: z.string().optional(),
    endpoint_id: z.string().optional(),
  })
  .refine(
    d =>
      [d.direct_access_index_spec, d.delta_sync_index_spec].filter(
        v => v !== undefined
      ).length <= 1,
    {message: 'MiniVectorIndex.IndexSpec: multiple oneof members set'}
  )
  .transform(d => ({
    name: d.name,
    endpointName: d.endpoint_name,
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
    endpointId: d.endpoint_id,
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

export const unmarshalQueryVectorIndexResponseSchema: z.ZodType<QueryVectorIndexResponse> =
  z
    .object({
      manifest: z
        .lazy(() => unmarshalResultManifestSchema)
        .nullish()
        .transform(v => v ?? undefined),
      result: z
        .lazy(() => unmarshalResultDataSchema)
        .nullish()
        .transform(v => v ?? undefined),
      next_page_token: z.string().optional(),
      facet_result: z
        .lazy(() => unmarshalFacetResultDataSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      manifest: d.manifest,
      result: d.result,
      nextPageToken: d.next_page_token,
      facetResult: d.facet_result,
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

export const unmarshalRetrieveUserVisibleMetricsResponseSchema: z.ZodType<RetrieveUserVisibleMetricsResponse> =
  z
    .object({
      metric_values: z
        .array(z.lazy(() => unmarshalMetricValuesSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      metricValues: d.metric_values,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalScanVectorIndexResponseSchema: z.ZodType<ScanVectorIndexResponse> =
  z
    .object({
      data: z.array(z.lazy(() => unmarshalStructSchema)).optional(),
      last_primary_key: z.string().optional(),
    })
    .transform(d => ({
      data: d.data,
      lastPrimaryKey: d.last_primary_key,
    }));

export const unmarshalStructSchema: z.ZodType<Struct> = z
  .object({
    fields: z
      .array(z.lazy(() => unmarshalMapStringValueEntrySchema))
      .optional(),
  })
  .transform(d => ({
    fields: d.fields,
  }));

export const unmarshalSyncVectorIndexResponseSchema: z.ZodType<SyncVectorIndexResponse> =
  z.object({});

export const unmarshalUpdateEndpointCustomTagsResponseSchema: z.ZodType<UpdateEndpointCustomTagsResponse> =
  z
    .object({
      name: z.string().optional(),
      custom_tags: z.array(z.lazy(() => unmarshalCustomTagSchema)).optional(),
    })
    .transform(d => ({
      name: d.name,
      customTags: d.custom_tags,
    }));

export const unmarshalUpsertDataVectorIndexResponseSchema: z.ZodType<UpsertDataVectorIndexResponse> =
  z
    .object({
      status: z.string().optional(),
      result: z
        .lazy(() => unmarshalUpsertDeleteDataResultSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      status: d.status,
      result: d.result,
    }));

export const unmarshalUpsertDeleteDataResultSchema: z.ZodType<UpsertDeleteDataResult> =
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

export const unmarshalValueSchema: z.ZodType<Value> = z
  .object({
    number_value: z.number().optional(),
    string_value: z.string().optional(),
    bool_value: z.boolean().optional(),
    struct_value: z.lazy(() => unmarshalStructSchema).optional(),
    list_value: z.lazy(() => unmarshalListValueSchema).optional(),
  })
  .refine(
    d =>
      [
        d.number_value,
        d.string_value,
        d.bool_value,
        d.struct_value,
        d.list_value,
      ].filter(v => v !== undefined).length <= 1,
    {message: 'Value.Kind: multiple oneof members set'}
  )
  .transform(d => ({
    kind:
      d.number_value !== undefined
        ? {$case: 'numberValue' as const, numberValue: d.number_value}
        : d.string_value !== undefined
          ? {$case: 'stringValue' as const, stringValue: d.string_value}
          : d.bool_value !== undefined
            ? {$case: 'boolValue' as const, boolValue: d.bool_value}
            : d.struct_value !== undefined
              ? {$case: 'structValue' as const, structValue: d.struct_value}
              : d.list_value !== undefined
                ? {$case: 'listValue' as const, listValue: d.list_value}
                : undefined,
  }));

export const unmarshalVectorIndexSchema: z.ZodType<VectorIndex> = z
  .object({
    name: z.string().optional(),
    endpoint_name: z.string().optional(),
    primary_key: z.string().optional(),
    index_type: z.string().optional(),
    direct_access_index_spec: z
      .lazy(() => unmarshalDirectAccessVectorIndexSpecSchema)
      .optional(),
    delta_sync_index_spec: z
      .lazy(() => unmarshalDeltaSyncVectorIndexSpecSchema)
      .optional(),
    status: z
      .lazy(() => unmarshalVectorIndexStatusSchema)
      .nullish()
      .transform(v => v ?? undefined),
    creator: z.string().optional(),
    index_subtype: z.string().optional(),
    endpoint_id: z.string().optional(),
  })
  .refine(
    d =>
      [d.direct_access_index_spec, d.delta_sync_index_spec].filter(
        v => v !== undefined
      ).length <= 1,
    {message: 'VectorIndex.IndexSpec: multiple oneof members set'}
  )
  .transform(d => ({
    name: d.name,
    endpointName: d.endpoint_name,
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
    endpointId: d.endpoint_id,
  }));

export const unmarshalVectorIndexStatusSchema: z.ZodType<VectorIndexStatus> = z
  .object({
    detailed_state: z.string().optional(),
    message: z.string().optional(),
    indexed_row_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    failed_status: z.lazy(() => unmarshalFailedStatusSchema).optional(),
    ready: z.boolean().optional(),
    index_url: z.string().optional(),
  })
  .transform(d => ({
    detailedState: d.detailed_state,
    message: d.message,
    indexedRowCount: d.indexed_row_count,
    detailedStatus:
      d.failed_status !== undefined
        ? {$case: 'failedStatus' as const, failedStatus: d.failed_status}
        : undefined,
    ready: d.ready,
    indexUrl: d.index_url,
  }));

export const marshalCreateEndpointRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    endpointType: z.string().optional(),
    budgetPolicyId: z.string().optional(),
    usagePolicyId: z.string().optional(),
    targetQps: z.bigint().optional(),
  })
  .transform(d => ({
    name: d.name,
    endpoint_type: d.endpointType,
    budget_policy_id: d.budgetPolicyId,
    usage_policy_id: d.usagePolicyId,
    target_qps: d.targetQps,
  }));

export const marshalCreateVectorIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    endpointName: z.string().optional(),
    primaryKey: z.string().optional(),
    indexType: z.string().optional(),
    indexSpec: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('directAccessIndexSpec'),
          directAccessIndexSpec: z.lazy(
            () => marshalDirectAccessVectorIndexSpecSchema
          ),
        }),
        z.object({
          $case: z.literal('deltaSyncIndexSpec'),
          deltaSyncIndexSpec: z.lazy(
            () => marshalDeltaSyncVectorIndexSpecRequestSchema
          ),
        }),
      ])
      .optional(),
    indexSubtype: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    endpoint_name: d.endpointName,
    primary_key: d.primaryKey,
    index_type: d.indexType,
    ...(d.indexSpec?.$case === 'directAccessIndexSpec' && {
      direct_access_index_spec: d.indexSpec.directAccessIndexSpec,
    }),
    ...(d.indexSpec?.$case === 'deltaSyncIndexSpec' && {
      delta_sync_index_spec: d.indexSpec.deltaSyncIndexSpec,
    }),
    index_subtype: d.indexSubtype,
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

export const marshalDeltaSyncVectorIndexSpecRequestSchema: z.ZodType = z
  .object({
    sourceTable: z.string().optional(),
    embeddingSourceColumns: z
      .array(z.lazy(() => marshalEmbeddingSourceColumnSchema))
      .optional(),
    embeddingVectorColumns: z
      .array(z.lazy(() => marshalEmbeddingVectorColumnSchema))
      .optional(),
    pipelineType: z.string().optional(),
    pipelineId: z.string().optional(),
    embeddingWritebackTable: z.string().optional(),
    columnsToSync: z.array(z.string()).optional(),
    columnsToIndex: z.array(z.string()).optional(),
  })
  .transform(d => ({
    source_table: d.sourceTable,
    embedding_source_columns: d.embeddingSourceColumns,
    embedding_vector_columns: d.embeddingVectorColumns,
    pipeline_type: d.pipelineType,
    pipeline_id: d.pipelineId,
    embedding_writeback_table: d.embeddingWritebackTable,
    columns_to_sync: d.columnsToSync,
    columns_to_index: d.columnsToIndex,
  }));

export const marshalDirectAccessVectorIndexSpecSchema: z.ZodType = z
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
    embeddingConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('embeddingModelEndpointName'),
          embeddingModelEndpointName: z.string(),
        }),
      ])
      .optional(),
    modelEndpointNameForQuery: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    ...(d.embeddingConfig?.$case === 'embeddingModelEndpointName' && {
      embedding_model_endpoint_name:
        d.embeddingConfig.embeddingModelEndpointName,
    }),
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

export const marshalMetricSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    labels: z.array(z.lazy(() => marshalMetricLabelSchema)).optional(),
    percentile: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    labels: d.labels,
    percentile: d.percentile,
  }));

export const marshalMetricLabelSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    value: d.value,
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
    targetQps: z.bigint().optional(),
  })
  .transform(d => ({
    name: d.name,
    target_qps: d.targetQps,
  }));

export const marshalQueryVectorIndexNextPageRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    endpointName: z.string().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    endpoint_name: d.endpointName,
    page_token: d.pageToken,
  }));

export const marshalQueryVectorIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    numResults: z.number().optional(),
    columns: z.array(z.string()).optional(),
    filtersJson: z.string().optional(),
    queryVector: z.array(z.number()).optional(),
    queryText: z.string().optional(),
    scoreThreshold: z.number().optional(),
    queryType: z.string().optional(),
    columnsToRerank: z.array(z.string()).optional(),
    reranker: z.lazy(() => marshalRerankerConfigSchema).optional(),
    queryColumns: z.array(z.string()).optional(),
    sortColumns: z.array(z.string()).optional(),
    facets: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    num_results: d.numResults,
    columns: d.columns,
    filters_json: d.filtersJson,
    query_vector: d.queryVector,
    query_text: d.queryText,
    score_threshold: d.scoreThreshold,
    query_type: d.queryType,
    columns_to_rerank: d.columnsToRerank,
    reranker: d.reranker,
    query_columns: d.queryColumns,
    sort_columns: d.sortColumns,
    facets: d.facets,
  }));

export const marshalRerankerConfigSchema: z.ZodType = z
  .object({
    model: z.string().optional(),
    parameters: z
      .lazy(() => marshalRerankerConfig_RerankerParametersSchema)
      .optional(),
  })
  .transform(d => ({
    model: d.model,
    parameters: d.parameters,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRerankerConfig_RerankerParametersSchema: z.ZodType = z
  .object({
    columnsToRerank: z.array(z.string()).optional(),
  })
  .transform(d => ({
    columns_to_rerank: d.columnsToRerank,
  }));

export const marshalRetrieveUserVisibleMetricsRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    startTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    endTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    granularityInSeconds: z.number().optional(),
    metrics: z.array(z.lazy(() => marshalMetricSchema)).optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    start_time: d.startTime,
    end_time: d.endTime,
    granularity_in_seconds: d.granularityInSeconds,
    metrics: d.metrics,
    page_token: d.pageToken,
  }));

export const marshalScanVectorIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    numResults: z.number().optional(),
    lastPrimaryKey: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    num_results: d.numResults,
    last_primary_key: d.lastPrimaryKey,
  }));

export const marshalStartEndpointRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalStopEndpointRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalSyncVectorIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalUpdateEndpointCustomTagsRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    customTags: z.array(z.lazy(() => marshalCustomTagSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    custom_tags: d.customTags,
  }));

export const marshalUpsertDataVectorIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    inputsJson: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    inputs_json: d.inputsJson,
  }));
