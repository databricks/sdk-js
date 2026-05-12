// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

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

/**
 * The subtype of the AI Search index, determining the indexing and retrieval strategy.
 * - `VECTOR`: Not supported. Use `HYBRID` instead.
 * - `FULL_TEXT`: An index that uses full-text search without vector embeddings.
 * - `HYBRID`: An index that uses vector embeddings for similarity search and hybrid search.
 */
export enum IndexSubtype {
  VECTOR = 'VECTOR',
  FULL_TEXT = 'FULL_TEXT',
  HYBRID = 'HYBRID',
}

/**
 * Pipeline execution mode.
 * - `TRIGGERED`: If the pipeline uses the triggered execution mode, the system stops processing after successfully refreshing the source table in the pipeline once, ensuring the table is updated based on the data available when the update started.
 * - `CONTINUOUS`: If the pipeline uses continuous execution, the pipeline processes new data as it arrives in the source table to keep vector index fresh.
 */
export enum PipelineType {
  TRIGGERED = 'TRIGGERED',
  CONTINUOUS = 'CONTINUOUS',
}

export enum UpsertDeleteDataStatus {
  SUCCESS = 'SUCCESS',
  PARTIAL_SUCCESS = 'PARTIAL_SUCCESS',
  FAILURE = 'FAILURE',
}

/**
 * There are 2 types of AI Search indexes:
 * - `DELTA_SYNC`: An index that automatically syncs with a source Delta Table, automatically and incrementally updating the index as the underlying data in the Delta Table changes.
 * - `DIRECT_ACCESS`: An index that supports direct read and write of vectors and metadata through our REST and SDK APIs. With this model, the user manages index updates.
 */
export enum VectorIndexType {
  DELTA_SYNC = 'DELTA_SYNC',
  DIRECT_ACCESS = 'DIRECT_ACCESS',
}

export interface ColumnInfo {
  /** Name of the column. */
  name?: string | undefined;
  /** Data type of the column (e.g., "string", "int", "array<float>") */
  typeText?: string | undefined;
}

export interface CreateVectorIndexRequest {
  /** Name of the index */
  name?: string | undefined;
  /** Name of the endpoint to be used for serving the index */
  endpointName?: string | undefined;
  /** Primary key of the index */
  primaryKey?: string | undefined;
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

/** Request payload for deleting data from a vector index. */
export interface DeleteDataVectorIndexRequest {
  /** Name of the vector index where data is to be deleted. Must be a Direct Vector Access Index. */
  name?: string | undefined;
  /** List of primary keys for the data to be deleted. */
  primaryKeys?: string[] | undefined;
}

export interface DeleteDataVectorIndexResponse {
  /** Status of the delete operation. */
  status?: UpsertDeleteDataStatus | undefined;
  /** Result of the upsert or delete operation. */
  result?: UpsertDeleteDataResult | undefined;
}

export interface DeleteVectorIndexRequest {
  /** Name of the index */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteVectorIndexResponse {}

export interface DeltaSyncVectorIndexSpec {
  /** The name of the source table. */
  sourceTable?: string | undefined;
  /** The columns that contain the embedding source. */
  embeddingSourceColumns?: EmbeddingSourceColumn[] | undefined;
  /** The columns that contain the embedding vectors. */
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
  /** The budget policy id applied to the AI Search index */
  effectiveBudgetPolicyId?: string | undefined;
  effectiveUsagePolicyId?: string | undefined;
  /**
   * [Optional] Alias for columns_to_sync. Select the columns to include in the vector index.
   * If you leave this field blank, all columns from the source table are included.
   * The primary key column and embedding source column or embedding vector column are always included.
   * Only one of columns_to_sync or columns_to_index may be specified.
   */
  columnsToIndex?: string[] | undefined;
}

export interface DeltaSyncVectorIndexSpecRequest {
  /** The name of the source table. */
  sourceTable?: string | undefined;
  /** The columns that contain the embedding source. */
  embeddingSourceColumns?: EmbeddingSourceColumn[] | undefined;
  /** The columns that contain the embedding vectors. */
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
  /** The budget policy id applied to the AI Search index */
  effectiveBudgetPolicyId?: string | undefined;
  effectiveUsagePolicyId?: string | undefined;
  /**
   * [Optional] Alias for columns_to_sync. Select the columns to include in the vector index.
   * If you leave this field blank, all columns from the source table are included.
   * The primary key column and embedding source column or embedding vector column are always included.
   * Only one of columns_to_sync or columns_to_index may be specified.
   */
  columnsToIndex?: string[] | undefined;
}

export interface DirectAccessVectorIndexSpec {
  /** The columns that contain the embedding vectors. The format should be array[double]. */
  embeddingVectorColumns?: EmbeddingVectorColumn[] | undefined;
  /**
   * The schema of the index in JSON format.
   * Supported types are `integer`, `long`, `float`, `double`, `boolean`, `string`, `date`, `timestamp`.
   * Supported types for vector column: `array<float>`, `array<double>`,`.
   */
  schemaJson?: string | undefined;
  /** The columns that contain the embedding source. The format should be array[double]. */
  embeddingSourceColumns?: EmbeddingSourceColumn[] | undefined;
}

export interface EmbeddingSourceColumn {
  /** Name of the column */
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
  /** Name of the column */
  name?: string | undefined;
  /** Dimension of the embedding vector */
  embeddingDimension?: number | undefined;
}

export interface GetVectorIndexRequest {
  /** Name of the index */
  name?: string | undefined;
  /**
   * If true, the URL returned for the index is guaranteed to be compatible with the reranker.
   * Currently this means we return the CP URL regardless of how the index is being accessed.
   * If not set or set to false, the URL may still be compatible with the reranker depending on
   * what URL we return.
   */
  ensureRerankerCompatible?: boolean | undefined;
}

export interface ListValue {
  /** Repeated field of dynamically typed values. */
  values?: Value[] | undefined;
}

export interface ListVectorIndexRequest {
  /** Name of the endpoint */
  endpointName?: string | undefined;
  /** Token for pagination */
  pageToken?: string | undefined;
}

export interface ListVectorIndexResponse {
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

export interface MiniVectorIndex {
  /** Name of the index */
  name?: string | undefined;
  /** Name of the endpoint associated with the index */
  endpointName?: string | undefined;
  /** Primary key of the index */
  primaryKey?: string | undefined;
  indexType?: VectorIndexType | undefined;
  indexSpec?:
    | {
        $case: 'directAccessIndexSpec';
        directAccessIndexSpec: DirectAccessVectorIndexSpec;
      }
    | {
        $case: 'deltaSyncIndexSpec';
        deltaSyncIndexSpec: DeltaSyncVectorIndexSpec;
      }
    | undefined;
  status?: VectorIndexStatus | undefined;
  /** The user who created the index. */
  creator?: string | undefined;
  /** The subtype of the index. */
  indexSubtype?: IndexSubtype | undefined;
}

/** Request payload for getting next page of results. */
export interface QueryVectorIndexNextPageRequest {
  /** Name of the vector index to query. */
  name?: string | undefined;
  /** Name of the endpoint. */
  endpointName?: string | undefined;
  /** Page token returned from previous `QueryVectorIndex` or `QueryVectorIndexNextPage` API. */
  pageToken?: string | undefined;
}

export interface QueryVectorIndexRequest {
  /** Name of the vector index to query. */
  name?: string | undefined;
  /** Number of results to return. Defaults to 10. */
  numResults?: number | undefined;
  /** List of column names to include in the response. */
  columns?: string[] | undefined;
  /**
   * JSON string representing query filters.
   *
   * Example filters:
   *
   * - `{"id <": 5}`: Filter for id less than 5.
   * - `{"id >": 5}`: Filter for id greater than 5.
   * - `{"id <=": 5}`: Filter for id less than equal to 5.
   * - `{"id >=": 5}`: Filter for id greater than equal to 5.
   * - `{"id": 5}`: Filter for id equal to 5.
   */
  filtersJson?: string | undefined;
  /** Query vector. Required for Direct Vector Access Index and Delta Sync Index using self-managed vectors. */
  queryVector?: number[] | undefined;
  /** Query text. Required for Delta Sync Index using model endpoint. */
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
}

export interface RerankerConfig {
  model?: string | undefined;
  parameters?: RerankerConfig_RerankerParameters | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface RerankerConfig_RerankerParameters {
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

export interface UpsertDataVectorIndexRequest {
  /** Name of the vector index where data is to be upserted. Must be a Direct Vector Access Index. */
  name?: string | undefined;
  /** JSON string representing the data to be upserted. */
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
  successRowCount?: number | undefined;
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

export interface VectorIndex {
  /** Name of the index */
  name?: string | undefined;
  /** Name of the endpoint associated with the index */
  endpointName?: string | undefined;
  /** Primary key of the index */
  primaryKey?: string | undefined;
  indexType?: VectorIndexType | undefined;
  indexSpec?:
    | {
        $case: 'directAccessIndexSpec';
        directAccessIndexSpec: DirectAccessVectorIndexSpec;
      }
    | {
        $case: 'deltaSyncIndexSpec';
        deltaSyncIndexSpec: DeltaSyncVectorIndexSpec;
      }
    | undefined;
  status?: VectorIndexStatus | undefined;
  /** The user who created the index. */
  creator?: string | undefined;
  /** The subtype of the index. */
  indexSubtype?: IndexSubtype | undefined;
}

export interface VectorIndexStatus {
  /** Message associated with the index status */
  message?: string | undefined;
  /** Number of rows indexed */
  indexedRowCount?: number | undefined;
  /** Whether the index is ready for search */
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

export const unmarshalDeleteDataVectorIndexResponseSchema: z.ZodType<DeleteDataVectorIndexResponse> =
  z
    .object({
      status: z.enum(UpsertDeleteDataStatus).optional(),
      result: z.lazy(() => unmarshalUpsertDeleteDataResultSchema).optional(),
    })
    .transform(d => ({
      status: d.status,
      result: d.result,
    }));

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
      pipeline_type: z.enum(PipelineType).optional(),
      pipeline_id: z.string().optional(),
      embedding_writeback_table: z.string().optional(),
      columns_to_sync: z.array(z.string()).optional(),
      effective_budget_policy_id: z.string().optional(),
      effective_usage_policy_id: z.string().optional(),
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
      effectiveBudgetPolicyId: d.effective_budget_policy_id,
      effectiveUsagePolicyId: d.effective_usage_policy_id,
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
      value: z.lazy(() => unmarshalValueSchema).optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalMiniVectorIndexSchema: z.ZodType<MiniVectorIndex> = z
  .object({
    name: z.string().optional(),
    endpoint_name: z.string().optional(),
    primary_key: z.string().optional(),
    index_type: z.enum(VectorIndexType).optional(),
    direct_access_index_spec: z
      .lazy(() => unmarshalDirectAccessVectorIndexSpecSchema)
      .optional(),
    delta_sync_index_spec: z
      .lazy(() => unmarshalDeltaSyncVectorIndexSpecSchema)
      .optional(),
    status: z.lazy(() => unmarshalVectorIndexStatusSchema).optional(),
    creator: z.string().optional(),
    index_subtype: z.enum(IndexSubtype).optional(),
  })
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
  }));

export const unmarshalQueryVectorIndexResponseSchema: z.ZodType<QueryVectorIndexResponse> =
  z
    .object({
      manifest: z.lazy(() => unmarshalResultManifestSchema).optional(),
      result: z.lazy(() => unmarshalResultDataSchema).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      manifest: d.manifest,
      result: d.result,
      nextPageToken: d.next_page_token,
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
  })
  .transform(d => ({
    columnCount: d.column_count,
    columns: d.columns,
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

export const unmarshalUpsertDataVectorIndexResponseSchema: z.ZodType<UpsertDataVectorIndexResponse> =
  z
    .object({
      status: z.enum(UpsertDeleteDataStatus).optional(),
      result: z.lazy(() => unmarshalUpsertDeleteDataResultSchema).optional(),
    })
    .transform(d => ({
      status: d.status,
      result: d.result,
    }));

export const unmarshalUpsertDeleteDataResultSchema: z.ZodType<UpsertDeleteDataResult> =
  z
    .object({
      success_row_count: z.number().optional(),
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
    index_type: z.enum(VectorIndexType).optional(),
    direct_access_index_spec: z
      .lazy(() => unmarshalDirectAccessVectorIndexSpecSchema)
      .optional(),
    delta_sync_index_spec: z
      .lazy(() => unmarshalDeltaSyncVectorIndexSpecSchema)
      .optional(),
    status: z.lazy(() => unmarshalVectorIndexStatusSchema).optional(),
    creator: z.string().optional(),
    index_subtype: z.enum(IndexSubtype).optional(),
  })
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
  }));

export const unmarshalVectorIndexStatusSchema: z.ZodType<VectorIndexStatus> = z
  .object({
    message: z.string().optional(),
    indexed_row_count: z.number().optional(),
    ready: z.boolean().optional(),
    index_url: z.string().optional(),
  })
  .transform(d => ({
    message: d.message,
    indexedRowCount: d.indexed_row_count,
    ready: d.ready,
    indexUrl: d.index_url,
  }));

export const marshalCreateVectorIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    endpointName: z.string().optional(),
    primaryKey: z.string().optional(),
    indexType: z.enum(VectorIndexType).optional(),
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
    indexSubtype: z.enum(IndexSubtype).optional(),
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

export const marshalDeltaSyncVectorIndexSpecRequestSchema: z.ZodType = z
  .object({
    sourceTable: z.string().optional(),
    embeddingSourceColumns: z
      .array(z.lazy(() => marshalEmbeddingSourceColumnSchema))
      .optional(),
    embeddingVectorColumns: z
      .array(z.lazy(() => marshalEmbeddingVectorColumnSchema))
      .optional(),
    pipelineType: z.enum(PipelineType).optional(),
    pipelineId: z.string().optional(),
    embeddingWritebackTable: z.string().optional(),
    columnsToSync: z.array(z.string()).optional(),
    effectiveBudgetPolicyId: z.string().optional(),
    effectiveUsagePolicyId: z.string().optional(),
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
    effective_budget_policy_id: d.effectiveBudgetPolicyId,
    effective_usage_policy_id: d.effectiveUsagePolicyId,
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

export const marshalSyncVectorIndexRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
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
