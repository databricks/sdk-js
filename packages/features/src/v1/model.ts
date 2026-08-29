// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/**
 * Scalar data types for request-time field definitions.
 * Only flat (non-nested) types are supported.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ScalarDataType = {
  SCALAR_DATA_TYPE_UNSPECIFIED: 'SCALAR_DATA_TYPE_UNSPECIFIED',
  INTEGER: 'INTEGER',
  FLOAT: 'FLOAT',
  BOOLEAN: 'BOOLEAN',
  STRING: 'STRING',
  DOUBLE: 'DOUBLE',
  LONG: 'LONG',
  TIMESTAMP: 'TIMESTAMP',
  DATE: 'DATE',
  SHORT: 'SHORT',
  BINARY: 'BINARY',
  DECIMAL: 'DECIMAL',
} as const;
export type ScalarDataType =
  | (typeof ScalarDataType)[keyof typeof ScalarDataType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const MaterializedFeature_PipelineScheduleState = {
  /** Default value, not used. */
  PIPELINE_SCHEDULE_STATE_UNSPECIFIED: 'PIPELINE_SCHEDULE_STATE_UNSPECIFIED',
  /** Pipeline was configured to run once then stop. */
  SNAPSHOT: 'SNAPSHOT',
  /** Pipeline is actively running and computing features. */
  ACTIVE: 'ACTIVE',
  /** Pipeline is paused and not computing features. */
  PAUSED: 'PAUSED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type MaterializedFeature_PipelineScheduleState =
  | (typeof MaterializedFeature_PipelineScheduleState)[keyof typeof MaterializedFeature_PipelineScheduleState]
  | (string & {});

/** Supported serialization formats for a schema registry schema. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SchemaLocator_Format = {
  /** Default value. Format is not set; the request will be rejected. */
  FORMAT_UNSPECIFIED: 'FORMAT_UNSPECIFIED',
  /** Avro-encoded schema. */
  FORMAT_AVRO: 'FORMAT_AVRO',
  /** Protobuf-encoded schema. */
  FORMAT_PROTOBUF: 'FORMAT_PROTOBUF',
  /** JSON-encoded schema. */
  FORMAT_JSON: 'FORMAT_JSON',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SchemaLocator_Format =
  | (typeof SchemaLocator_Format)[keyof typeof SchemaLocator_Format]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const StreamingMode_StreamingModeType = {
  /** Default value, not used. */
  STREAMING_MODE_TYPE_UNSPECIFIED: 'STREAMING_MODE_TYPE_UNSPECIFIED',
  /**
   * Real-time mode. Ultra-low-latency trigger intended for operational workloads
   * that need responses in milliseconds or sub-second latency.
   */
  STREAMING_MODE_TYPE_RTM: 'STREAMING_MODE_TYPE_RTM',
  /**
   * Micro-batch mode in Structured Streaming. Better suited for ETL and analytics
   * workloads where latency is measured in seconds or minutes and cost efficiency
   * matters more.
   */
  STREAMING_MODE_TYPE_MBM: 'STREAMING_MODE_TYPE_MBM',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type StreamingMode_StreamingModeType =
  | (typeof StreamingMode_StreamingModeType)[keyof typeof StreamingMode_StreamingModeType]
  | (string & {});

/** An aggregation function applied over a time window. */
export interface AggregationFunction {
  /** The type of the aggregation function. */
  operation?:
    | {$case: 'avg'; avg: AvgFunction}
    | {$case: 'countFunction'; countFunction: CountFunction}
    | {$case: 'sum'; sum: SumFunction}
    | {$case: 'min'; min: MinFunction}
    | {$case: 'max'; max: MaxFunction}
    | {$case: 'first'; first: FirstFunction}
    | {$case: 'last'; last: LastFunction}
    | {
        $case: 'approxCountDistinct';
        approxCountDistinct: ApproxCountDistinctFunction;
      }
    | {$case: 'approxPercentile'; approxPercentile: ApproxPercentileFunction}
    | {$case: 'stddevPop'; stddevPop: StddevPopFunction}
    | {$case: 'stddevSamp'; stddevSamp: StddevSampFunction}
    | {$case: 'varPop'; varPop: VarPopFunction}
    | {$case: 'varSamp'; varSamp: VarSampFunction}
    | {$case: 'firstN'; firstN: FirstNFunction}
    | {$case: 'lastN'; lastN: LastNFunction}
    | {$case: 'firstDistinct'; firstDistinct: FirstDistinctFunction}
    | {$case: 'lastDistinct'; lastDistinct: LastDistinctFunction}
    | undefined;
  /** The time window over which the aggregation is computed. */
  timeWindow?: TimeWindow | undefined;
}

/** Computes the approximate count of distinct values. */
export interface ApproxCountDistinctFunction {
  /** The input column from which the approximate count of distinct values is computed. */
  input: string;
  /** The maximum relative standard deviation allowed (default defined by Spark). */
  relativeSd?: number | undefined;
}

/** Computes the approximate percentile of values. */
export interface ApproxPercentileFunction {
  /** The input column from which the approximate percentile is computed. */
  input: string;
  /** The percentile value to compute (between 0 and 1). */
  percentile: number;
  /** The accuracy parameter (higher is more accurate but slower). */
  accuracy?: bigint | undefined;
}

export interface AuthConfig {
  authConfig?:
    | {
        $case: 'ucServiceCredentialName';
        /** Name of the Unity Catalog service credential. This value will be set under the option databricks.serviceCredential */
        ucServiceCredentialName: string;
      }
    | {
        $case: 'mtlsConfig';
        /** Mutual-TLS authentication. See MtlsConfig. */
        mtlsConfig: MtlsConfig;
      }
    | undefined;
}

/** Computes the average of values. */
export interface AvgFunction {
  /**
   * The input column from which the average is computed. For Kafka sources, use dot-prefixed path
   * notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input: string;
}

export interface BackfillSource {
  backfillSource?:
    | {
        $case: 'deltaTableSource';
        /**
         * Deprecated: Use delta_table_name instead. Kept for backwards compatibility.
         * The Delta table source containing the historical data to backfill.
         * Only the delta table name is used for backfill, other fields are ignored.
         */
        deltaTableSource: DeltaTableSource;
      }
    | {
        $case: 'deltaTableName';
        /** The full three-part name (catalog, schema, name) of the Delta table containing the historical data to backfill. */
        deltaTableName: string;
      }
    | undefined;
}

export interface BatchCreateMaterializedFeaturesRequest {
  /** The requests to create materialized features. */
  requests: CreateMaterializedFeatureRequest[];
}

export interface BatchCreateMaterializedFeaturesResponse {
  /** The created materialized features with assigned IDs. */
  materializedFeatures?: MaterializedFeature[] | undefined;
}

/** A ColumnSelection function, equivalent to the LAST() record of an entity over a lifetime window */
export interface ColumnSelection {
  /** Column name from source to select as the feature value. */
  column: string;
}

/** Computes the count of values. */
export interface CountFunction {
  /**
   * The input column from which the count is computed. For Kafka sources, use dot-prefixed path
   * notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input: string;
}

export interface CreateFeatureRequest {
  /** Feature to create. */
  feature: Feature;
}

export interface CreateKafkaConfigRequest {
  kafkaConfig: KafkaConfig;
}

export interface CreateMaterializedFeatureRequest {
  /** The materialized feature to create. */
  materializedFeature: MaterializedFeature;
}

/** Create a Stream, a governed UC entity representing an external streaming data source. */
export interface CreateStreamRequest {
  /** The Stream to create. */
  stream: Stream;
}

/** A cron-based schedule trigger for the materialization pipeline. */
export interface CronSchedule {
  /** The cron expression defining the schedule (e.g., "0 0 * * *" for daily at midnight). */
  cronExpression?: string | undefined;
}

/**
 * A CustomUdf function applies a registered Unity Catalog function row-wise to
 * source columns, producing a single output column per row.
 */
export interface CustomUdf {
  /** Fully qualified 3-part Unity Catalog path of the function to apply. */
  functionPath: string;
  /**
   * Binds each UC function parameter to a source column.
   * May be empty for zero-argument functions (e.g. a timestamp generator).
   */
  inputBindings?: InputBinding[] | undefined;
}

/** Specifies the data source backing a feature. Exactly one source type must be set. */
export interface DataSource {
  dataSource?:
    | {
        $case: 'deltaTableSource';
        /** A Delta table data source. */
        deltaTableSource: DeltaTableSource;
      }
    | {
        $case: 'kafkaSource';
        /** A Kafka stream data source. */
        kafkaSource: KafkaSource;
      }
    | {
        $case: 'requestSource';
        /** A request-time data source. */
        requestSource: RequestSource;
      }
    | {
        $case: 'streamSource';
        /** A Stream data source. */
        streamSource: StreamSource;
      }
    | undefined;
  /**
   * Completeness timing for this Feature's use of the source. This configuration is part of the
   * Feature definition; it does not modify the underlying table or stream.
   */
  lateness?: SourceLateness | undefined;
}

export interface DeleteFeatureRequest {
  /** Name of the feature to delete. */
  fullName: string;
}

export interface DeleteKafkaConfigRequest {
  /** Name of the Kafka config to delete. */
  name: string;
}

export interface DeleteMaterializedFeatureRequest {
  /** The ID of the materialized feature to delete. */
  materializedFeatureId: string;
}

/** Delete a Stream by its full three-part name (catalog.schema.stream). */
export interface DeleteStreamRequest {
  /** Full three-part name (catalog.schema.stream) of the Stream to delete. */
  name: string;
}

export interface DeltaTableSource {
  /** The full three-part (catalog, schema, table) name of the Delta table. */
  fullName: string;
  /** Single WHERE clause to filter delta table before applying transformations. Will be row-wise evaluated, so should only include conditionals and projections. */
  filterCondition?: string | undefined;
  /**
   * A single SQL SELECT expression applied after filter_condition.
   * Should contains all the columns needed (eg. "SELECT *, col_a + col_b AS col_c FROM x.y.z WHERE col_a > 0" would have `transformation_sql` "*, col_a + col_b AS col_c")
   * If transformation_sql is not provided, all columns of the delta table are present in the DataSource dataframe.
   */
  transformationSql?: string | undefined;
  /**
   * Schema of the resulting dataframe after transformations, in Spark StructType JSON format (from df.schema.json()).
   * Required if transformation_sql is specified.
   * Example: {"type":"struct","fields":[{"name":"col_a","type":"integer","nullable":true,"metadata":{}},{"name":"col_c","type":"integer","nullable":true,"metadata":{}}]}
   */
  dataframeSchema?: string | undefined;
}

/**
 * Direct connection configs for mTLS, as Kafka Connections do not support mTLS yet .
 * Temporarily used until UC Kafka Connections gain mTLS support.
 */
export interface DirectMtlsConfig {
  /** A comma-separated list of host:port pairs for the Kafka bootstrap servers. */
  bootstrapServers: string;
  /** Mutual-TLS authentication configuration. */
  mtlsConfig: MtlsConfig;
}

/**
 * Schema definitions provided directly on the Stream, as opposed to referencing a schema registry.
 * To resolve schemas from a registry instead, use SchemaRegistryConfig.
 */
export interface DirectSchemas {
  /**
   * Schema for the message payload. For Kafka, this is the value schema.
   * Unless the platform supports another schema (e.g. keys for Kafka), this must be specified.
   */
  payloadSchema?: SchemaConfig | undefined;
  /**
   * Schema for the message key. This is only used for Kafka streams.
   * For Kafka, at least one of payload_schema or key_schema must be specified.
   */
  keySchema?: SchemaConfig | undefined;
}

export interface EntityColumn {
  /**
   * The name of the entity column. For Kafka sources, use dot-prefixed path notation to reference
   * fields within the key or value schema (e.g., "value.user_id", "key.partition_key"). For nested
   * fields, the leaf node name (e.g., "user_id" from "value.trip_details.user_id") is what will
   * be present in materialized tables and expected to match at query time.
   * Colon-prefixed notation (e.g., "value:user_id") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  name: string;
}

export interface Feature {
  /**
   * The full three-part name (catalog, schema, name) of the feature. This is the
   * feature's resource identifier; the catalog_name, schema_name, and name fields
   * below are OUTPUT_ONLY decomposed views of this value.
   */
  fullName: string;
  /** The data source of the feature. */
  source: DataSource;
  /** The function by which the feature is computed. */
  function: Function;
  /** The description of the feature. */
  description?: string | undefined;
  /**
   * Lineage context information for this feature.
   * WARNING: This field is primarily intended for internal use by <Databricks> systems and
   * is automatically populated when features are created through <Databricks> notebooks or jobs.
   * Users should not manually set this field as incorrect values may lead to inaccurate lineage tracking or unexpected behavior.
   * This field will be set by feature-engineering client and should be left unset by SDK and terraform users.
   */
  lineageContext?: LineageContext | undefined;
  /** The entity columns for the feature, used as aggregation keys and for query-time lookup. */
  entities?: EntityColumn[] | undefined;
  /** Column recording time, used for point-in-time joins, backfills, and aggregations. */
  timeseriesColumn?: TimeseriesColumn | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /** Name of parent schema relative to its parent catalog. */
  schemaName?: string | undefined;
  /** Name of the feature, extracted from the full three-part name (catalog.schema.name). */
  name?: string | undefined;
  /** Time at which this feature was created. */
  createdAt?: Temporal.Instant | undefined;
  /** Username of the feature creator. */
  createdBy?: string | undefined;
}

/**
 * A single field definition within a FlatSchema, specifying the field name and its scalar data type.
 * Does not support nested or complex types (arrays, maps, structs).
 */
export interface FieldDefinition {
  /** The name of the field. */
  name: string;
  /** The scalar data type of the field. */
  dataType: ScalarDataType;
}

/** Returns the first N distinct values, ordered by the feature's timeseries column. */
export interface FirstDistinctFunction {
  /** The input column from which the first N distinct values are returned. */
  input: string;
  /** The number of distinct values to return. */
  n: bigint;
}

/** Returns the first value. */
export interface FirstFunction {
  /** The input column from which the first value is returned. */
  input: string;
}

/** Returns the first N values, ordered by the feature's timeseries column. */
export interface FirstNFunction {
  /** The input column from which the first N values are returned. */
  input: string;
  /** The number of values to return. */
  n: bigint;
}

/**
 * A flat (non-nested) schema for request-time fields, defined as an ordered list of field definitions.
 * This schema only supports scalar types.
 */
export interface FlatSchema {
  /** The list of fields in this schema. */
  fields: FieldDefinition[];
}

export interface Function {
  function?:
    | {
        $case: 'aggregationFunction';
        /** An aggregation function applied over a time window. */
        aggregationFunction: AggregationFunction;
      }
    | {
        $case: 'columnSelection';
        /** Selects the latest value of a single column in a data source */
        columnSelection: ColumnSelection;
      }
    | {
        $case: 'customUdf';
        /** Applies a registered Unity Catalog function row-wise to source columns. */
        customUdf: CustomUdf;
      }
    | undefined;
}

export interface GetFeatureRequest {
  /** Name of the feature to get. */
  fullName: string;
}

export interface GetKafkaConfigRequest {
  /** Name of the Kafka config to get. */
  name: string;
}

export interface GetMaterializedFeatureRequest {
  /** The ID of the materialized feature. */
  materializedFeatureId: string;
}

/** Get a Stream by its full three-part name (catalog.schema.stream). */
export interface GetStreamRequest {
  /** Full three-part name (catalog.schema.stream) of the Stream to get. */
  name: string;
}

/**
 * Configuration for the <Databricks>-managed ingestion pipeline.
 * Groups the ingestion destination (required) and optional backfill source.
 */
export interface IngestionConfig {
  /**
   * Destination for the <Databricks>-managed Delta table that holds an offline copy of the streaming data for querying and training.
   * This table contains both 1) forward-filled data from the Stream and 2) backfilled data from the BackfillSource (if provided).
   * This table is created and managed by <Databricks> and is deleted when the Stream is deleted.
   */
  ingestionDestination: IngestionDestination;
  /**
   * A user-provided source for backfilling data. Historical data is used when creating a training set from streaming features linked to this Stream.
   * The backfill data stored in this location will be copied into the ingestion table for offline querying and training.
   * The schema for this source must match exactly that of the key and payload schemas specified for this Stream.
   */
  backfillSource?: BackfillSource | undefined;
  /**
   * Column paths used to identify duplicate rows during ingestion; only one row per
   * distinct combination of these values is kept. Use dot notation for nested fields
   * (e.g. `value.user_id`). Empty list means every column is compared.
   */
  deduplicationColumns?: string[] | undefined;
  /**
   * The ID of the SDP pipeline that continuously copies new events from the streaming source
   * into the ingestion Delta table.
   */
  ingestionPipelineId?: string | undefined;
  /** The ID of the Databricks Job that performs the forward-fill ingestion. */
  ingestionJobId?: bigint | undefined;
  /** The ID of the Databricks Job that performs the historical backfill of the ingestion Delta table. */
  backfillJobId?: bigint | undefined;
}

/** Destination for the <Databricks>-managed Delta table that holds an offline copy of the streaming data for querying and training. */
export interface IngestionDestination {
  ingestionDestination?:
    | {
        $case: 'deltaTableName';
        /** The full three-part name (catalog, schema, name) of the Delta table to be created for ingestion. */
        deltaTableName: string;
      }
    | undefined;
}

/** Binds a single UC function parameter to a source column. */
export interface InputBinding {
  /** Name of the UC function parameter. */
  parameter: string;
  /** Source column whose value is passed for this parameter at execution time. */
  column: string;
}

export interface JobContext {
  /** The job ID where this API invoked. */
  jobId?: bigint | undefined;
  /** The job run ID where this API was invoked. */
  jobRunId?: bigint | undefined;
}

export interface KafkaConfig {
  /**
   * Name that uniquely identifies this Kafka config within the metastore. This will be the identifier used from the Feature object to reference these configs for a feature.
   * Can be distinct from topic name.
   */
  name: string;
  /** A comma-separated list of host/port pairs pointing to Kafka cluster. */
  bootstrapServers: string;
  /** Options to configure which Kafka topics to pull data from. */
  subscriptionMode: SubscriptionMode;
  /** Authentication configuration for connection to topics. */
  authConfig: AuthConfig;
  /** Schema configuration for extracting message keys from topics. At least one of key_schema and value_schema must be provided. */
  keySchema?: SchemaConfig | undefined;
  /** Schema configuration for extracting message values from topics. At least one of key_schema and value_schema must be provided. */
  valueSchema?: SchemaConfig | undefined;
  /** Catch-all for miscellaneous options. Keys should be source options or Kafka consumer options (kafka.*) */
  extraOptions?: Record<string, string> | undefined;
  /**
   * A user-provided and managed source for backfilling data. Historical data is used when creating a training set from streaming features linked to this Kafka config.
   * In the future, a separate table will be maintained by <Databricks> for forward filling data.
   * The schema for this source must match exactly that of the key and value schemas specified for this Kafka config.
   */
  backfillSource?: BackfillSource | undefined;
  /**
   * Configuration for ingesting Kafka data into a <Databricks>-managed
   * Delta table.
   */
  ingestionConfig?: IngestionConfig | undefined;
}

export interface KafkaSource {
  /** Name of the Kafka source, used to identify it. This is used to look up the corresponding KafkaConfig object. Can be distinct from topic name. */
  name: string;
  /** The filter condition applied to the source data before aggregation. */
  filterCondition?: string | undefined;
}

/** Kafka-specific configuration for a Stream. */
export interface KafkaStreamConfig {
  /** Options to configure which Kafka topics to pull data from. */
  subscriptionMode: KafkaSubscriptionMode;
  /**
   * Optional Kafka source or consumer options, validated against a server-side
   * allowlist at request time. Allowed keys:
   * - `maxOffsetsPerTrigger`
   * - `startingOffsets`
   * - `includeHeaders`
   * - `kafka.request.timeout.ms`
   * - `kafka.session.timeout.ms`
   * - `kafka.max.partition.fetch.bytes`
   * The following keys are ingestion-only and are stripped before being forwarded to the materialization pipeline:
   * - `maxOffsetsPerTrigger`
   * - `startingOffsets`
   * Auth and connection details belong on the parent Stream's `connection_config`, not here.
   */
  extraOptions?: Record<string, string> | undefined;
}

/** Subscription mode for Kafka topic selection, matching standard Spark Structured Streaming options. */
export interface KafkaSubscriptionMode {
  /** These match the settings from https://spark.apache.org/docs/latest/streaming/structured-streaming-kafka-integration.html */
  subscriptionMode?:
    | {
        $case: 'assign';
        /**
         * A JSON string that contains the specific topic-partitions to consume from.
         * For example, for '{"topicA":[0,1],"topicB":[2,4]}', topicA's 0'th and 1st partitions will be consumed from.
         */
        assign: string;
      }
    | {
        $case: 'subscribe';
        /** A comma-separated list of Kafka topics to read from. For example, 'topicA,topicB,topicC'. */
        subscribe: string;
      }
    | {
        $case: 'subscribePattern';
        /** A regular expression matching topics to subscribe to. For example, 'topic.*' will subscribe to all topics starting with 'topic'. */
        subscribePattern: string;
      }
    | undefined;
}

/**
 * Kinesis-specific configuration for a Stream. For the underlying connector and its source
 * options, see the <Databricks> documentation on connecting to Amazon Kinesis
 * (https://docs.databricks.com/aws/en/connect/streaming/kinesis).
 */
export interface KinesisStreamConfig {
  /**
   * Identifies the Kinesis data stream(s) to read from. Set exactly one of stream_names or
   * stream_arns (identify the streams by name or by ARN, but not both). A single Stream may
   * read from one or more Kinesis streams.
   */
  streamIdentifier?:
    | {
        $case: 'streamNames';
        /** Kinesis stream names to read from. */
        streamNames: StreamNameList;
      }
    | {
        $case: 'streamArns';
        /** Kinesis stream ARNs to read from. */
        streamArns: StreamArnList;
      }
    | undefined;
  /**
   * Optional Kinesis source options, validated against a server-side allowlist at request time.
   * Auth and connection details belong on the parent Stream's `connection_config`, not here.
   */
  extraOptions?: Record<string, string> | undefined;
}

/** Returns the last N distinct values, ordered by the feature's timeseries column. */
export interface LastDistinctFunction {
  /** The input column from which the last N distinct values are returned. */
  input: string;
  /** The number of distinct values to return. */
  n: bigint;
}

/** Returns the last value. */
export interface LastFunction {
  /** The input column from which the last value is returned. */
  input: string;
}

/** Returns the last N values, ordered by the feature's timeseries column. */
export interface LastNFunction {
  /** The input column from which the last N values are returned. */
  input: string;
  /** The number of values to return. */
  n: bigint;
}

/** Lineage context information for tracking where an API was invoked. This will allow us to track lineage, which currently uses caller entity information for use across the Lineage Client and Observability in Lumberjack. */
export interface LineageContext {
  /** The notebook ID where this API was invoked. */
  notebookId?: bigint | undefined;
  /** Job context information including job ID and run ID. */
  jobContext?: JobContext | undefined;
}

/**
 * Request to list features. Listing is always scoped to a single catalog and schema;
 * catalog_name and schema_name are required.
 */
export interface ListFeaturesRequest {
  /** Pagination token to go to the next page based on a previous query. */
  pageToken?: string | undefined;
  /** The maximum number of results to return. */
  pageSize?: number | undefined;
  /** Name of parent catalog for features of interest. */
  catalogName: string;
  /** Name of parent schema relative to its parent catalog. */
  schemaName: string;
}

export interface ListFeaturesResponse {
  /** List of features. */
  features?: Feature[] | undefined;
  /** Pagination token to request the next page of results for this query. */
  nextPageToken?: string | undefined;
}

export interface ListKafkaConfigsRequest {
  /** Pagination token to go to the next page based on a previous query. */
  pageToken?: string | undefined;
  /** The maximum number of results to return. */
  pageSize?: number | undefined;
}

export interface ListKafkaConfigsResponse {
  /** List of Kafka configs. Schemas are not included in the response. */
  kafkaConfigs: KafkaConfig[];
  /** Pagination token to request the next page of results for this query. */
  nextPageToken?: string | undefined;
}

export interface ListMaterializedFeaturesRequest {
  /** Filter by feature name. If specified, only materialized features materialized from this feature will be returned. */
  featureName?: string | undefined;
  /** Pagination token to go to the next page based on a previous query. */
  pageToken?: string | undefined;
  /** The maximum number of results to return. Defaults to 100 if not specified. Cannot be greater than 1000. */
  pageSize?: number | undefined;
}

export interface ListMaterializedFeaturesResponse {
  /** List of materialized features. */
  materializedFeatures?: MaterializedFeature[] | undefined;
  /** Pagination token to request the next page of results for this query. */
  nextPageToken?: string | undefined;
}

/**
 * List Streams under a given parent.
 *
 * NOTE: Results are post-filtered by access permission on each stream's ingestion
 * table. This means:
 * - Returned results may be fewer than page_size (including zero)
 * - Page token points to next unfiltered batch, not next filtered batch, and may
 * point to an item that will be filtered out
 * - Callers should paginate until next_page_token is empty to retrieve all
 * accessible streams
 */
export interface ListStreamsRequest {
  /** Two-part name (catalog.schema) of the parent under which to list Streams. */
  parent?: string | undefined;
  /** The maximum number of results to return. */
  pageSize?: number | undefined;
  /** Pagination token to go to the next page based on a previous query. */
  pageToken?: string | undefined;
}

/**
 * Response to a ListStreamsRequest.
 *
 * NOTE: Results are post-filtered by access permission on each stream's ingestion
 * table. This means:
 * - Returned results may be fewer than page_size (including zero)
 * - Page token points to next unfiltered batch, not next filtered batch, and may
 * point to an item that will be filtered out
 * Callers should paginate until next_page_token is empty to retrieve all
 * accessible streams.
 */
export interface ListStreamsResponse {
  /** List of Streams. */
  streams?: Stream[] | undefined;
  /** Pagination token to request the next page of results for this query. */
  nextPageToken?: string | undefined;
}

/** A materialized feature represents a feature that is continuously computed and stored. */
export interface MaterializedFeature {
  /** Server-assigned unique identifier for the materialized feature. */
  materializedFeatureId?: string | undefined;
  /** The full name of the feature in Unity Catalog. */
  featureName: string;
  destination?:
    | {
        $case: 'offlineStoreConfig';
        /** Destination for writing feature values to an offline Delta table. */
        offlineStoreConfig: OfflineStoreConfig;
      }
    | {
        $case: 'onlineStoreConfig';
        /** Destination for writing feature values to an online Lakebase table. */
        onlineStoreConfig: OnlineStoreConfig;
      }
    | undefined;
  /** The fully qualified Unity Catalog path to the table containing the materialized feature (Delta table or Lakebase table). Output only. */
  tableName?: string | undefined;
  /**
   * The schedule state of the materialization pipeline.
   * Hidden from GraphQL: being deprecated, so not exposed to Catalog Explorer.
   */
  pipelineScheduleState?: MaterializedFeature_PipelineScheduleState | undefined;
  /**
   * The timestamp when the pipeline last ran and updated the materialized feature values.
   * If the pipeline has not run yet, this field will be null.
   */
  lastMaterializationTime?: Temporal.Instant | undefined;
  /** True if this is an online materialized feature. False if it is an offline materialized feature. */
  isOnline?: boolean | undefined;
  /** The trigger configuration for the materialization pipeline. */
  trigger?:
    | {
        $case: 'cronScheduleTrigger';
        /** A cron-based schedule trigger for the materialization pipeline. */
        cronScheduleTrigger: CronSchedule;
      }
    | {
        $case: 'tableTrigger';
        /** A trigger that fires when the upstream source table changes. */
        tableTrigger: TableTrigger;
      }
    | {
        $case: 'streamingMode';
        /**
         * The Structured Streaming trigger mode used for materialization. Real-time mode (RTM) targets
         * sub-second latency for operational workloads; micro-batch mode (MBM) favors cost efficiency
         * for ETL and analytics workloads.
         */
        streamingMode: StreamingMode;
      }
    | undefined;
}

/** Computes the maximum value. */
export interface MaxFunction {
  /** The input column from which the maximum is computed. */
  input: string;
}

/** Computes the minimum value. */
export interface MinFunction {
  /** The input column from which the minimum is computed. */
  input: string;
}

/**
 * Mutual-TLS (mTLS) authentication configuration. The keystore (client certificate +
 * private key) and truststore (CAs trusted to verify the broker) live as JKS files on
 * Unity Catalog volumes, with their passwords stored in <Databricks> secret scopes. This
 * matches the SSL setup pattern documented at
 * https://docs.databricks.com/en/connect/streaming/kafka/authentication#use-ssl-to-connect-databricks-to-kafka.
 *
 * At materialization time, the generated PySpark code passes the JKS file paths and
 * resolved passwords through to the Kafka SSL options (kafka.ssl.keystore.location,
 * kafka.ssl.keystore.password, kafka.ssl.key.password, kafka.ssl.truststore.location,
 * kafka.ssl.truststore.password). Passwords are resolved on the Spark cluster via
 * dbutils.secrets.get; this message stores only references, never password values.
 */
export interface MtlsConfig {
  /**
   * Unity Catalog volume path to the JKS keystore file containing the client certificate
   * and private key. e.g. "/Volumes/<catalog>/<schema>/<volume>/client.jks". The
   * materialization compute must have read permission on this volume.
   */
  keystoreLocation: string;
  /** Secret-scope reference for the JKS keystore password. */
  keystorePasswordRef: SecretScopeReference;
  /**
   * Secret-scope reference for the private key password. Often the same value as the
   * keystore password (keytool's default), but provided as a separate field because
   * Apache Kafka requires it as a distinct option (kafka.ssl.key.password).
   */
  keyPasswordRef: SecretScopeReference;
  /**
   * Unity Catalog volume path to the JKS truststore file containing the CA certificate(s)
   * trusted to verify the Kafka broker's server certificate.
   * e.g. "/Volumes/<catalog>/<schema>/<volume>/truststore.jks".
   */
  truststoreLocation: string;
  /** Secret-scope reference for the JKS truststore password. */
  truststorePasswordRef: SecretScopeReference;
  /**
   * Set to true only when the broker certificate's SAN intentionally does not match
   * the connection endpoint — for example when reaching the cluster through a
   * PrivateLink endpoint whose DNS name is not in the broker certificate. Skipping
   * the hostname check removes a defense against man-in-the-middle attacks; do not
   * enable casually. mTLS client authentication is unaffected by this option.
   *
   * See the Apache Kafka SSL security guide for background on this check:
   * https://kafka.apache.org/42/security/encryption-and-authentication-using-ssl/#host-name-verification
   */
  disableHostnameVerification?: boolean | undefined;
}

/** Configuration for offline store destination. */
export interface OfflineStoreConfig {
  /** The Unity Catalog catalog name. */
  catalogName: string;
  /** The Unity Catalog schema name. */
  schemaName: string;
  /**
   * Prefix for Unity Catalog table name.
   * The materialized feature will be stored in a table with this prefix and a generated postfix.
   */
  tableNamePrefix: string;
}

/** Configuration for online store destination. */
export interface OnlineStoreConfig {
  /**
   * The Unity Catalog catalog name. This name is also used as the Lakebase logical database name.
   * Quoting is handled by the backend where needed, do not pre-quote it.
   */
  catalogName: string;
  /**
   * The Unity Catalog schema name. This name is also used as the Lakebase schema name under the database.
   * Quoting is handled by the backend where needed, do not pre-quote it.
   */
  schemaName: string;
  /**
   * Prefix for Unity Catalog table name.
   * The materialized feature will be stored in a Lakebase table with this prefix and a generated postfix.
   */
  tableNamePrefix: string;
  /** The name of the target online store. */
  onlineStoreName: string;
}

/**
 * A Protocol Buffer schema paired with the name of the message within it that describes the
 * Kafka payload. A .proto file may declare multiple messages; message_name disambiguates.
 */
export interface ProtoSchemaSpec {
  /**
   * The raw .proto file text (proto2 and proto3 syntax supported, see
   * https://protobuf.dev/programming-guides/proto3/ and https://protobuf.dev/programming-guides/proto2/).
   */
  schemaText: string;
  /**
   * The fully-qualified name of the message within schema_text that describes the Kafka payload
   * (e.g. "Event" or "com.example.Event" if schema_text declares a package). Identifies which
   * message is used to decode each Kafka record — a .proto file may declare multiple messages
   * but only one represents the payload. Must not be empty.
   */
  messageName: string;
}

/** A request-time data source whose value is provided at inference time: offline batch scoring or online serving endpoint */
export interface RequestSource {
  /** The schema describing the request-time fields. Currently only flat schemas are supported. */
  schema?:
    | {
        $case: 'flatSchema';
        /** A flat schema with scalar-typed fields only. */
        flatSchema: FlatSchema;
      }
    | undefined;
}

/** A rolling time window with an optional non-negative delay. */
export interface RollingWindow {
  /**
   * The duration of the rolling window. Must be positive when set; absent means lifetime
   * (aggregate over the entity's entire history).
   */
  windowDuration?: Temporal.Duration | undefined;
  /**
   * Non-negative analytic lag that evaluates the window this far in the past. Use this for timing
   * variations unrelated to source lateness, such as a 30-day count as of one week ago. If unset,
   * the analytic lag is zero. It composes with source.lateness when both are set.
   */
  delay?: Temporal.Duration | undefined;
}

/**
 * A sawtooth window served via the hybrid batch + streaming path. The batch pipeline maintains
 * daily partial aggregates for the bulk of the window while the streaming pipeline maintains the
 * most recent day(s), and serving merges them on read. Same field shape as RollingWindow, but a
 * distinct type so the control plane can explicitly identify hybrid (sawtooth) features rather
 * than inferring hybrid behavior from window_duration.
 */
export interface SawtoothWindow {
  /**
   * The duration of the window. Must be positive and span more than two days when set, so that both
   * the batch (N-1 day) and stale-path (N-2 day) partial aggregates are well defined. The duration
   * need not be a whole number of days (e.g. 3 days 15 minutes is allowed). Absent means lifetime
   * (aggregate over the entity's entire history).
   */
  windowDuration?: Temporal.Duration | undefined;
  /** Delay is not currently supported for Sawtooth windows. */
  delay?: Temporal.Duration | undefined;
}

export interface SchemaConfig {
  schema?:
    | {
        $case: 'jsonSchema';
        /** Schema of the JSON object in standard IETF JSON schema format (https://json-schema.org/). */
        jsonSchema: string;
      }
    | {
        $case: 'avroSchema';
        /** Avro schema in JSON format (https://avro.apache.org/docs/current/specification/). */
        avroSchema: string;
      }
    | {
        $case: 'protoSchema';
        /** Protocol Buffer schema with its payload message name. */
        protoSchema: ProtoSchemaSpec;
      }
    | undefined;
}

/**
 * Schema locator for one side (payload or key) of a message.
 * Identifies which schema to use in the schema registry and the serialization format.
 */
export interface SchemaLocator {
  /** Registry-specific schema locator. */
  registrySchema?:
    | {
        $case: 'confluentSchema';
        /** Confluent Schema Registry schema locator. */
        confluentSchema: SchemaLocator_ConfluentSchema;
      }
    | undefined;
  /** Serialization format for this schema. */
  format: SchemaLocator_Format;
}

/**
 * Confluent Schema Registry schema locator.
 * The value to provide for `subject` depends on the naming strategy configured in your registry:
 * - TopicNameStrategy (default): "{topic}-key" or "{topic}-value"
 * e.g. for topic "transactions" use "transactions-value" for the payload and "transactions-key" for the key.
 * - RecordNameStrategy: the fully-qualified record name
 * e.g. "com.example.Payment" for Avro, the bare message name (without package) for Protobuf,
 * or the `title` field value for JSON.
 * - TopicRecordNameStrategy: "{topic}-{fully-qualified-record-name}"
 * e.g. "transactions-com.example.Payment".
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SchemaLocator_ConfluentSchema {
  /** The Confluent schema registry subject name. */
  subject: string;
}

/** Configuration for resolving a Stream's schema from an external schema registry (e.g. Confluent). */
export interface SchemaRegistryConfig {
  /** A Schema Registry UC Connection object. */
  ucConnection?: string | undefined;
  /** Reference to the schema registry API secret in a <Databricks> secret scope. */
  apiSecretRef: SecretScopeReference;
  /**
   * Schema locator for the message payload. For Kafka this is the value.
   * At least one of payload_schema_locator or key_schema_locator must be set.
   */
  payloadSchemaLocator?: SchemaLocator | undefined;
  /**
   * Schema locator for the message key. Only used for Kafka streams.
   * At least one of payload_schema_locator or key_schema_locator must be set.
   */
  keySchemaLocator?: SchemaLocator | undefined;
}

/**
 * Reference to an entry in a <Databricks> secret scope. The referenced value is fetched
 * on the Spark cluster at materialization time via dbutils.secrets.get(scope, key).
 */
export interface SecretScopeReference {
  /** The <Databricks> secret scope name. */
  scope: string;
  /** The key within the scope. */
  key: string;
}

export interface SlidingWindow {
  /**
   * The duration of the sliding window. Must be positive when set; absent means lifetime
   * (aggregate over the entity's entire history).
   */
  windowDuration?: Temporal.Duration | undefined;
  /** The slide duration (interval by which windows advance, must be positive and less than duration). */
  slideDuration: Temporal.Duration;
  /**
   * Non-negative analytic lag that evaluates the window this far in the past. Use this for timing
   * variations unrelated to source lateness, such as a 30-day count as of one week ago. If unset,
   * the analytic lag is zero. It composes with source.lateness when both are set.
   */
  delay?: Temporal.Duration | undefined;
  /**
   * Non-negative phase shift from the default midnight UTC alignment. For example, offset=22h on
   * a 24h slide produces boundaries at 22:00 UTC (17:00 New York in standard time) instead of
   * midnight UTC. If unset, the offset is zero. Must be shorter than slide_duration (and therefore
   * window_duration).
   */
  offset?: Temporal.Duration | undefined;
}

/** Configures when event-time data from this source is considered complete for a Feature. */
export interface SourceLateness {
  /**
   * Non-negative time to wait after a window ends before treating its source data as complete.
   * Training shifts the eligible evaluation time backwards by this duration so it does not join
   * data that would still have been settling online. Materialization waits for the duration to
   * elapse before publishing the window. If unset, source data is considered settled immediately.
   */
  settlingDelay?: Temporal.Duration | undefined;
}

/** Computes the population standard deviation. */
export interface StddevPopFunction {
  /**
   * The input column from which the population standard deviation is computed. For Kafka sources,
   * use dot-prefixed path notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input: string;
}

/** Computes the sample standard deviation. */
export interface StddevSampFunction {
  /** The input column from which the sample standard deviation is computed. */
  input: string;
}

/**
 * A Stream is a governed UC entity representing an external streaming data source.
 * The source_config oneof determines the streaming platform source (e.g. Kafka, Kinesis, etc.).
 */
export interface Stream {
  /** Full three-part (catalog.schema.stream) name of the stream. */
  name: string;
  /** User-provided description. */
  description?: string | undefined;
  /** Source-specific configuration. Determines the streaming platform source. */
  sourceConfig: StreamSourceConfig;
  /** Specifies how to connect and authenticate to the stream platform. */
  connectionConfig: StreamConnectionConfig;
  /**
   * Schema definitions for the stream, provided either directly on the Stream or
   * resolved from an external schema registry through a UC Connection.
   */
  schemaConfig: StreamSchemaConfig;
  /** Configuration for streaming data ingestion: the managed table storing an offline copy of forward fill data and optional historical backfill. */
  ingestionConfig: IngestionConfig;
  /** Time at which this Stream was created. */
  createTime?: Temporal.Instant | undefined;
  /** Username of the Stream creator. */
  createdBy?: string | undefined;
  /** Time at which this Stream was last modified. */
  updateTime?: Temporal.Instant | undefined;
  /** Username of user who last modified the Stream. */
  updatedBy?: string | undefined;
  /**
   * Indicates whether the principal is limited to retrieving metadata for the
   * associated object through the BROWSE privilege when include_browse is enabled in the request.
   */
  browseOnly?: boolean | undefined;
}

/** A list of Kinesis stream ARNs to read from. */
export interface StreamArnList {
  /**
   * Kinesis stream ARNs to read from. For example,
   * 'arn:aws:kinesis:us-west-2:111122223333:stream/stream-a'.
   */
  arns?: string[] | undefined;
}

/** Specifies how to connect and authenticate to the stream platform. */
export interface StreamConnectionConfig {
  connectionConfig?:
    | {
        $case: 'ucConnectionName';
        /**
         * Name of an existing UC Connection for stream platform access.
         * Must be the correct type for the streaming platform (e.g. a Kafka Connection for a Kafka
         * Stream, or a Kinesis Connection for a Kinesis Stream).
         */
        ucConnectionName: string;
      }
    | {
        $case: 'directMtlsConfig';
        /**
         * Direct mTLS configuration for stream platform access. This is only used in the short term until UC Kafka Connections support mTLS .
         * Once UC Kafka Connections support mTLS, this will be deprecated.
         */
        directMtlsConfig: DirectMtlsConfig;
      }
    | undefined;
}

/** A list of Kinesis stream names to read from. */
export interface StreamNameList {
  /** Kinesis stream names to read from. */
  names?: string[] | undefined;
}

/**
 * Schema definitions for the stream.
 * Feature store supports both direct schemas and schema registries.
 */
export interface StreamSchemaConfig {
  schemaConfig?:
    | {
        $case: 'directSchemas';
        /** Schema definitions provided directly on the Stream. */
        directSchemas: DirectSchemas;
      }
    | {
        $case: 'schemaRegistryConfig';
        /** Resolve schemas from an external schema registry. */
        schemaRegistryConfig: SchemaRegistryConfig;
      }
    | undefined;
}

/** A Stream entity used as a data source for a feature. */
export interface StreamSource {
  /** Three-part full name of the Stream (catalog.schema.stream). */
  fullName: string;
  /** The filter condition applied to the source data before aggregation. */
  filterCondition?: string | undefined;
  /**
   * The pipeline runs these SQL statements immediately after conversion into
   * the schema specified on the Stream object.
   */
  transformationSql?: string | undefined;
  /**
   * Schema of the resulting dataframe after transformations, in Spark StructType
   * JSON format (from df.schema.json()).
   * Any subsequent functions operate against this dataframe.
   */
  dataframeSchema?: string | undefined;
}

/** Source-specific configuration. Determines the streaming platform source. */
export interface StreamSourceConfig {
  sourceConfig?:
    | {
        $case: 'kafkaStreamConfig';
        /** Configuration for Apache Kafka streams. */
        kafkaStreamConfig: KafkaStreamConfig;
      }
    | {
        $case: 'kinesisStreamConfig';
        /** Configuration for AWS Kinesis Data Streams. */
        kinesisStreamConfig: KinesisStreamConfig;
      }
    | undefined;
}

/** The streaming mode configuration for a streaming materialization pipeline. */
export interface StreamingMode {
  /** The type of streaming mode used by the materialization pipeline. */
  mode?: StreamingMode_StreamingModeType | undefined;
  /**
   * The desired data freshness for feature materialization, expressed as a
   * duration string (e.g. "1 minute").
   */
  freshnessTarget?: string | undefined;
}

/** Deprecated: Use KafkaSubscriptionMode instead. */
export interface SubscriptionMode {
  /** These match the settings from https://spark.apache.org/docs/latest/streaming/structured-streaming-kafka-integration.html */
  subscriptionMode?:
    | {
        $case: 'assign';
        /**
         * A JSON string that contains the specific topic-partitions to consume from.
         * For example, for '{"topicA":[0,1],"topicB":[2,4]}', topicA's 0'th and 1st partitions will be consumed from.
         */
        assign: string;
      }
    | {
        $case: 'subscribe';
        /** A comma-separated list of Kafka topics to read from. For example, 'topicA,topicB,topicC'. */
        subscribe: string;
      }
    | {
        $case: 'subscribePattern';
        /** A regular expression matching topics to subscribe to. For example, 'topic.*' will subscribe to all topics starting with 'topic'. */
        subscribePattern: string;
      }
    | undefined;
}

/** Computes the sum of values. */
export interface SumFunction {
  /**
   * The input column from which the sum is computed. For Kafka sources, use dot-prefixed path
   * notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input: string;
}

/** A trigger that fires when the upstream source table changes. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableTrigger {}

export interface TimeWindow {
  windowType?:
    | {$case: 'tumbling'; tumbling: TumblingWindow}
    | {$case: 'sliding'; sliding: SlidingWindow}
    | {$case: 'rolling'; rolling: RollingWindow}
    | {
        $case: 'sawtooth';
        /** A sawtooth window served via the hybrid batch + streaming path. */
        sawtooth: SawtoothWindow;
      }
    | undefined;
  /**
   * Earliest event-time boundary at which the Feature may emit an output. This gates outputs, not
   * the historical inputs read by a window. For example, a 365-day window with
   * start_time=2026-01-01 begins emitting partial-window values on that date instead of waiting
   * for 365 days of data; a lifetime window produces no output before start_time. If unset,
   * tumbling and fixed-duration sliding windows first emit at an offset-aligned boundary after a
   * full window can be formed. If unset, lifetime sliding windows and rolling windows emit as soon as
   * eligible source data exists.
   */
  startTime?: Temporal.Instant | undefined;
}

export interface TimeseriesColumn {
  /**
   * The name of the timeseries column. For Kafka sources, use dot-prefixed path notation to
   * reference fields within the key or value schema (e.g., "value.event_timestamp"). For nested
   * fields, the leaf node name (e.g., "event_timestamp" from "value.event_details.event_timestamp")
   * is what will be present in materialized tables and expected to match at query time.
   * Colon-prefixed notation (e.g., "value:event_timestamp") is supported for
   * backwards compatibility but is deprecated; migrate to dot notation.
   */
  name: string;
}

export interface TumblingWindow {
  /** The duration of each tumbling window (non-overlapping, fixed-duration windows). */
  windowDuration: Temporal.Duration;
  /**
   * Non-negative analytic lag that evaluates the window this far in the past. Use this for timing
   * variations unrelated to source lateness, such as a 30-day count as of one week ago. If unset,
   * the analytic lag is zero. It composes with source.lateness when both are set.
   */
  delay?: Temporal.Duration | undefined;
  /**
   * Non-negative phase shift from the default midnight UTC alignment. For example, offset=22h on
   * a 24h window produces boundaries at 22:00 UTC (17:00 New York in standard time) instead of
   * midnight UTC. If unset, the offset is zero. Must be shorter than window_duration.
   */
  offset?: Temporal.Duration | undefined;
}

export interface UpdateFeatureRequest {
  /** Feature to update. */
  feature: Feature;
  /** The list of fields to update. */
  updateMask: FieldMask<Feature>;
}

export interface UpdateKafkaConfigRequest {
  /** The Kafka config to update. */
  kafkaConfig: KafkaConfig;
  /** The list of fields to update. */
  updateMask: FieldMask<KafkaConfig>;
}

export interface UpdateMaterializedFeatureRequest {
  /** The materialized feature to update. */
  materializedFeature: MaterializedFeature;
  /**
   * Provide the materialization feature fields which should be updated.
   * Currently, only the pipeline_state field can be updated.
   */
  updateMask: FieldMask<MaterializedFeature>;
}

/** Update a Stream. Only fields listed in `update_mask` are mutated. */
export interface UpdateStreamRequest {
  /** The Stream to update. */
  stream: Stream;
  /** The list of fields to update. */
  updateMask: FieldMask<Stream>;
}

/** Computes the population variance. */
export interface VarPopFunction {
  /** The input column from which the population variance is computed. */
  input: string;
}

/** Computes the sample variance. */
export interface VarSampFunction {
  /** The input column from which the sample variance is computed. */
  input: string;
}

export const unmarshalAggregationFunctionSchema: z.ZodType<AggregationFunction> =
  z
    .object({
      avg: z.lazy(() => unmarshalAvgFunctionSchema).optional(),
      count_function: z.lazy(() => unmarshalCountFunctionSchema).optional(),
      sum: z.lazy(() => unmarshalSumFunctionSchema).optional(),
      min: z.lazy(() => unmarshalMinFunctionSchema).optional(),
      max: z.lazy(() => unmarshalMaxFunctionSchema).optional(),
      first: z.lazy(() => unmarshalFirstFunctionSchema).optional(),
      last: z.lazy(() => unmarshalLastFunctionSchema).optional(),
      approx_count_distinct: z
        .lazy(() => unmarshalApproxCountDistinctFunctionSchema)
        .optional(),
      approx_percentile: z
        .lazy(() => unmarshalApproxPercentileFunctionSchema)
        .optional(),
      stddev_pop: z.lazy(() => unmarshalStddevPopFunctionSchema).optional(),
      stddev_samp: z.lazy(() => unmarshalStddevSampFunctionSchema).optional(),
      var_pop: z.lazy(() => unmarshalVarPopFunctionSchema).optional(),
      var_samp: z.lazy(() => unmarshalVarSampFunctionSchema).optional(),
      first_n: z.lazy(() => unmarshalFirstNFunctionSchema).optional(),
      last_n: z.lazy(() => unmarshalLastNFunctionSchema).optional(),
      first_distinct: z
        .lazy(() => unmarshalFirstDistinctFunctionSchema)
        .optional(),
      last_distinct: z
        .lazy(() => unmarshalLastDistinctFunctionSchema)
        .optional(),
      time_window: z.lazy(() => unmarshalTimeWindowSchema).optional(),
    })
    .transform(d => ({
      operation:
        d.avg !== undefined
          ? {$case: 'avg' as const, avg: d.avg}
          : d.count_function !== undefined
            ? {$case: 'countFunction' as const, countFunction: d.count_function}
            : d.sum !== undefined
              ? {$case: 'sum' as const, sum: d.sum}
              : d.min !== undefined
                ? {$case: 'min' as const, min: d.min}
                : d.max !== undefined
                  ? {$case: 'max' as const, max: d.max}
                  : d.first !== undefined
                    ? {$case: 'first' as const, first: d.first}
                    : d.last !== undefined
                      ? {$case: 'last' as const, last: d.last}
                      : d.approx_count_distinct !== undefined
                        ? {
                            $case: 'approxCountDistinct' as const,
                            approxCountDistinct: d.approx_count_distinct,
                          }
                        : d.approx_percentile !== undefined
                          ? {
                              $case: 'approxPercentile' as const,
                              approxPercentile: d.approx_percentile,
                            }
                          : d.stddev_pop !== undefined
                            ? {
                                $case: 'stddevPop' as const,
                                stddevPop: d.stddev_pop,
                              }
                            : d.stddev_samp !== undefined
                              ? {
                                  $case: 'stddevSamp' as const,
                                  stddevSamp: d.stddev_samp,
                                }
                              : d.var_pop !== undefined
                                ? {$case: 'varPop' as const, varPop: d.var_pop}
                                : d.var_samp !== undefined
                                  ? {
                                      $case: 'varSamp' as const,
                                      varSamp: d.var_samp,
                                    }
                                  : d.first_n !== undefined
                                    ? {
                                        $case: 'firstN' as const,
                                        firstN: d.first_n,
                                      }
                                    : d.last_n !== undefined
                                      ? {
                                          $case: 'lastN' as const,
                                          lastN: d.last_n,
                                        }
                                      : d.first_distinct !== undefined
                                        ? {
                                            $case: 'firstDistinct' as const,
                                            firstDistinct: d.first_distinct,
                                          }
                                        : d.last_distinct !== undefined
                                          ? {
                                              $case: 'lastDistinct' as const,
                                              lastDistinct: d.last_distinct,
                                            }
                                          : undefined,
      timeWindow: d.time_window,
    }));

export const unmarshalApproxCountDistinctFunctionSchema: z.ZodType<ApproxCountDistinctFunction> =
  z
    .object({
      input: z.string(),
      relative_sd: z.number().optional(),
    })
    .transform(d => ({
      input: d.input,
      relativeSd: d.relative_sd,
    }));

export const unmarshalApproxPercentileFunctionSchema: z.ZodType<ApproxPercentileFunction> =
  z
    .object({
      input: z.string(),
      percentile: z.number(),
      accuracy: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      input: d.input,
      percentile: d.percentile,
      accuracy: d.accuracy,
    }));

export const unmarshalAuthConfigSchema: z.ZodType<AuthConfig> = z
  .object({
    uc_service_credential_name: z.string().optional(),
    mtls_config: z.lazy(() => unmarshalMtlsConfigSchema).optional(),
  })
  .transform(d => ({
    authConfig:
      d.uc_service_credential_name !== undefined
        ? {
            $case: 'ucServiceCredentialName' as const,
            ucServiceCredentialName: d.uc_service_credential_name,
          }
        : d.mtls_config !== undefined
          ? {$case: 'mtlsConfig' as const, mtlsConfig: d.mtls_config}
          : undefined,
  }));

export const unmarshalAvgFunctionSchema: z.ZodType<AvgFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalBackfillSourceSchema: z.ZodType<BackfillSource> = z
  .object({
    delta_table_source: z
      .lazy(() => unmarshalDeltaTableSourceSchema)
      .optional(),
    delta_table_name: z.string().optional(),
  })
  .transform(d => ({
    backfillSource:
      d.delta_table_source !== undefined
        ? {
            $case: 'deltaTableSource' as const,
            deltaTableSource: d.delta_table_source,
          }
        : d.delta_table_name !== undefined
          ? {
              $case: 'deltaTableName' as const,
              deltaTableName: d.delta_table_name,
            }
          : undefined,
  }));

export const unmarshalBatchCreateMaterializedFeaturesResponseSchema: z.ZodType<BatchCreateMaterializedFeaturesResponse> =
  z
    .object({
      materialized_features: z
        .array(z.lazy(() => unmarshalMaterializedFeatureSchema))
        .optional(),
    })
    .transform(d => ({
      materializedFeatures: d.materialized_features,
    }));

export const unmarshalColumnSelectionSchema: z.ZodType<ColumnSelection> = z
  .object({
    column: z.string(),
  })
  .transform(d => ({
    column: d.column,
  }));

export const unmarshalCountFunctionSchema: z.ZodType<CountFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalCronScheduleSchema: z.ZodType<CronSchedule> = z
  .object({
    cron_expression: z.string().optional(),
  })
  .transform(d => ({
    cronExpression: d.cron_expression,
  }));

export const unmarshalCustomUdfSchema: z.ZodType<CustomUdf> = z
  .object({
    function_path: z.string(),
    input_bindings: z
      .array(z.lazy(() => unmarshalInputBindingSchema))
      .optional(),
  })
  .transform(d => ({
    functionPath: d.function_path,
    inputBindings: d.input_bindings,
  }));

export const unmarshalDataSourceSchema: z.ZodType<DataSource> = z
  .object({
    delta_table_source: z
      .lazy(() => unmarshalDeltaTableSourceSchema)
      .optional(),
    kafka_source: z.lazy(() => unmarshalKafkaSourceSchema).optional(),
    request_source: z.lazy(() => unmarshalRequestSourceSchema).optional(),
    stream_source: z.lazy(() => unmarshalStreamSourceSchema).optional(),
    lateness: z.lazy(() => unmarshalSourceLatenessSchema).optional(),
  })
  .transform(d => ({
    dataSource:
      d.delta_table_source !== undefined
        ? {
            $case: 'deltaTableSource' as const,
            deltaTableSource: d.delta_table_source,
          }
        : d.kafka_source !== undefined
          ? {$case: 'kafkaSource' as const, kafkaSource: d.kafka_source}
          : d.request_source !== undefined
            ? {$case: 'requestSource' as const, requestSource: d.request_source}
            : d.stream_source !== undefined
              ? {$case: 'streamSource' as const, streamSource: d.stream_source}
              : undefined,
    lateness: d.lateness,
  }));

export const unmarshalDeltaTableSourceSchema: z.ZodType<DeltaTableSource> = z
  .object({
    full_name: z.string(),
    filter_condition: z.string().optional(),
    transformation_sql: z.string().optional(),
    dataframe_schema: z.string().optional(),
  })
  .transform(d => ({
    fullName: d.full_name,
    filterCondition: d.filter_condition,
    transformationSql: d.transformation_sql,
    dataframeSchema: d.dataframe_schema,
  }));

export const unmarshalDirectMtlsConfigSchema: z.ZodType<DirectMtlsConfig> = z
  .object({
    bootstrap_servers: z.string(),
    mtls_config: z.lazy(() => unmarshalMtlsConfigSchema),
  })
  .transform(d => ({
    bootstrapServers: d.bootstrap_servers,
    mtlsConfig: d.mtls_config,
  }));

export const unmarshalDirectSchemasSchema: z.ZodType<DirectSchemas> = z
  .object({
    payload_schema: z.lazy(() => unmarshalSchemaConfigSchema).optional(),
    key_schema: z.lazy(() => unmarshalSchemaConfigSchema).optional(),
  })
  .transform(d => ({
    payloadSchema: d.payload_schema,
    keySchema: d.key_schema,
  }));

export const unmarshalEntityColumnSchema: z.ZodType<EntityColumn> = z
  .object({
    name: z.string(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalFeatureSchema: z.ZodType<Feature> = z
  .object({
    full_name: z.string(),
    source: z.lazy(() => unmarshalDataSourceSchema),
    function: z.lazy(() => unmarshalFunctionSchema),
    description: z.string().optional(),
    lineage_context: z.lazy(() => unmarshalLineageContextSchema).optional(),
    entities: z.array(z.lazy(() => unmarshalEntityColumnSchema)).optional(),
    timeseries_column: z.lazy(() => unmarshalTimeseriesColumnSchema).optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    name: z.string().optional(),
    created_at: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    created_by: z.string().optional(),
  })
  .transform(d => ({
    fullName: d.full_name,
    source: d.source,
    function: d.function,
    description: d.description,
    lineageContext: d.lineage_context,
    entities: d.entities,
    timeseriesColumn: d.timeseries_column,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    name: d.name,
    createdAt: d.created_at,
    createdBy: d.created_by,
  }));

export const unmarshalFieldDefinitionSchema: z.ZodType<FieldDefinition> = z
  .object({
    name: z.string(),
    data_type: z.string(),
  })
  .transform(d => ({
    name: d.name,
    dataType: d.data_type,
  }));

export const unmarshalFirstDistinctFunctionSchema: z.ZodType<FirstDistinctFunction> =
  z
    .object({
      input: z.string(),
      n: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v)),
    })
    .transform(d => ({
      input: d.input,
      n: d.n,
    }));

export const unmarshalFirstFunctionSchema: z.ZodType<FirstFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalFirstNFunctionSchema: z.ZodType<FirstNFunction> = z
  .object({
    input: z.string(),
    n: z.union([z.number(), z.bigint(), z.string()]).transform(v => BigInt(v)),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const unmarshalFlatSchemaSchema: z.ZodType<FlatSchema> = z
  .object({
    fields: z.array(z.lazy(() => unmarshalFieldDefinitionSchema)),
  })
  .transform(d => ({
    fields: d.fields,
  }));

export const unmarshalFunctionSchema: z.ZodType<Function> = z
  .object({
    aggregation_function: z
      .lazy(() => unmarshalAggregationFunctionSchema)
      .optional(),
    column_selection: z.lazy(() => unmarshalColumnSelectionSchema).optional(),
    custom_udf: z.lazy(() => unmarshalCustomUdfSchema).optional(),
  })
  .transform(d => ({
    function:
      d.aggregation_function !== undefined
        ? {
            $case: 'aggregationFunction' as const,
            aggregationFunction: d.aggregation_function,
          }
        : d.column_selection !== undefined
          ? {
              $case: 'columnSelection' as const,
              columnSelection: d.column_selection,
            }
          : d.custom_udf !== undefined
            ? {$case: 'customUdf' as const, customUdf: d.custom_udf}
            : undefined,
  }));

export const unmarshalIngestionConfigSchema: z.ZodType<IngestionConfig> = z
  .object({
    ingestion_destination: z.lazy(() => unmarshalIngestionDestinationSchema),
    backfill_source: z.lazy(() => unmarshalBackfillSourceSchema).optional(),
    deduplication_columns: z.array(z.string()).optional(),
    ingestion_pipeline_id: z.string().optional(),
    ingestion_job_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    backfill_job_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    ingestionDestination: d.ingestion_destination,
    backfillSource: d.backfill_source,
    deduplicationColumns: d.deduplication_columns,
    ingestionPipelineId: d.ingestion_pipeline_id,
    ingestionJobId: d.ingestion_job_id,
    backfillJobId: d.backfill_job_id,
  }));

export const unmarshalIngestionDestinationSchema: z.ZodType<IngestionDestination> =
  z
    .object({
      delta_table_name: z.string().optional(),
    })
    .transform(d => ({
      ingestionDestination:
        d.delta_table_name !== undefined
          ? {
              $case: 'deltaTableName' as const,
              deltaTableName: d.delta_table_name,
            }
          : undefined,
    }));

export const unmarshalInputBindingSchema: z.ZodType<InputBinding> = z
  .object({
    parameter: z.string(),
    column: z.string(),
  })
  .transform(d => ({
    parameter: d.parameter,
    column: d.column,
  }));

export const unmarshalJobContextSchema: z.ZodType<JobContext> = z
  .object({
    job_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    job_run_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    jobId: d.job_id,
    jobRunId: d.job_run_id,
  }));

export const unmarshalKafkaConfigSchema: z.ZodType<KafkaConfig> = z
  .object({
    name: z.string(),
    bootstrap_servers: z.string(),
    subscription_mode: z.lazy(() => unmarshalSubscriptionModeSchema),
    auth_config: z.lazy(() => unmarshalAuthConfigSchema),
    key_schema: z.lazy(() => unmarshalSchemaConfigSchema).optional(),
    value_schema: z.lazy(() => unmarshalSchemaConfigSchema).optional(),
    extra_options: z.record(z.string(), z.string()).optional(),
    backfill_source: z.lazy(() => unmarshalBackfillSourceSchema).optional(),
    ingestion_config: z.lazy(() => unmarshalIngestionConfigSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    bootstrapServers: d.bootstrap_servers,
    subscriptionMode: d.subscription_mode,
    authConfig: d.auth_config,
    keySchema: d.key_schema,
    valueSchema: d.value_schema,
    extraOptions: d.extra_options,
    backfillSource: d.backfill_source,
    ingestionConfig: d.ingestion_config,
  }));

export const unmarshalKafkaSourceSchema: z.ZodType<KafkaSource> = z
  .object({
    name: z.string(),
    filter_condition: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    filterCondition: d.filter_condition,
  }));

export const unmarshalKafkaStreamConfigSchema: z.ZodType<KafkaStreamConfig> = z
  .object({
    subscription_mode: z.lazy(() => unmarshalKafkaSubscriptionModeSchema),
    extra_options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    subscriptionMode: d.subscription_mode,
    extraOptions: d.extra_options,
  }));

export const unmarshalKafkaSubscriptionModeSchema: z.ZodType<KafkaSubscriptionMode> =
  z
    .object({
      assign: z.string().optional(),
      subscribe: z.string().optional(),
      subscribe_pattern: z.string().optional(),
    })
    .transform(d => ({
      subscriptionMode:
        d.assign !== undefined
          ? {$case: 'assign' as const, assign: d.assign}
          : d.subscribe !== undefined
            ? {$case: 'subscribe' as const, subscribe: d.subscribe}
            : d.subscribe_pattern !== undefined
              ? {
                  $case: 'subscribePattern' as const,
                  subscribePattern: d.subscribe_pattern,
                }
              : undefined,
    }));

export const unmarshalKinesisStreamConfigSchema: z.ZodType<KinesisStreamConfig> =
  z
    .object({
      stream_names: z.lazy(() => unmarshalStreamNameListSchema).optional(),
      stream_arns: z.lazy(() => unmarshalStreamArnListSchema).optional(),
      extra_options: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      streamIdentifier:
        d.stream_names !== undefined
          ? {$case: 'streamNames' as const, streamNames: d.stream_names}
          : d.stream_arns !== undefined
            ? {$case: 'streamArns' as const, streamArns: d.stream_arns}
            : undefined,
      extraOptions: d.extra_options,
    }));

export const unmarshalLastDistinctFunctionSchema: z.ZodType<LastDistinctFunction> =
  z
    .object({
      input: z.string(),
      n: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v)),
    })
    .transform(d => ({
      input: d.input,
      n: d.n,
    }));

export const unmarshalLastFunctionSchema: z.ZodType<LastFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalLastNFunctionSchema: z.ZodType<LastNFunction> = z
  .object({
    input: z.string(),
    n: z.union([z.number(), z.bigint(), z.string()]).transform(v => BigInt(v)),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const unmarshalLineageContextSchema: z.ZodType<LineageContext> = z
  .object({
    notebook_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    job_context: z.lazy(() => unmarshalJobContextSchema).optional(),
  })
  .transform(d => ({
    notebookId: d.notebook_id,
    jobContext: d.job_context,
  }));

export const unmarshalListFeaturesResponseSchema: z.ZodType<ListFeaturesResponse> =
  z
    .object({
      features: z.array(z.lazy(() => unmarshalFeatureSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      features: d.features,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListKafkaConfigsResponseSchema: z.ZodType<ListKafkaConfigsResponse> =
  z
    .object({
      kafka_configs: z.array(z.lazy(() => unmarshalKafkaConfigSchema)),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      kafkaConfigs: d.kafka_configs,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListMaterializedFeaturesResponseSchema: z.ZodType<ListMaterializedFeaturesResponse> =
  z
    .object({
      materialized_features: z
        .array(z.lazy(() => unmarshalMaterializedFeatureSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      materializedFeatures: d.materialized_features,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListStreamsResponseSchema: z.ZodType<ListStreamsResponse> =
  z
    .object({
      streams: z.array(z.lazy(() => unmarshalStreamSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      streams: d.streams,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMaterializedFeatureSchema: z.ZodType<MaterializedFeature> =
  z
    .object({
      materialized_feature_id: z.string().optional(),
      feature_name: z.string(),
      offline_store_config: z
        .lazy(() => unmarshalOfflineStoreConfigSchema)
        .optional(),
      online_store_config: z
        .lazy(() => unmarshalOnlineStoreConfigSchema)
        .optional(),
      table_name: z.string().optional(),
      pipeline_schedule_state: z.string().optional(),
      last_materialization_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      is_online: z.boolean().optional(),
      cron_schedule_trigger: z
        .lazy(() => unmarshalCronScheduleSchema)
        .optional(),
      table_trigger: z.lazy(() => unmarshalTableTriggerSchema).optional(),
      streaming_mode: z.lazy(() => unmarshalStreamingModeSchema).optional(),
    })
    .transform(d => ({
      materializedFeatureId: d.materialized_feature_id,
      featureName: d.feature_name,
      destination:
        d.offline_store_config !== undefined
          ? {
              $case: 'offlineStoreConfig' as const,
              offlineStoreConfig: d.offline_store_config,
            }
          : d.online_store_config !== undefined
            ? {
                $case: 'onlineStoreConfig' as const,
                onlineStoreConfig: d.online_store_config,
              }
            : undefined,
      tableName: d.table_name,
      pipelineScheduleState: d.pipeline_schedule_state,
      lastMaterializationTime: d.last_materialization_time,
      isOnline: d.is_online,
      trigger:
        d.cron_schedule_trigger !== undefined
          ? {
              $case: 'cronScheduleTrigger' as const,
              cronScheduleTrigger: d.cron_schedule_trigger,
            }
          : d.table_trigger !== undefined
            ? {$case: 'tableTrigger' as const, tableTrigger: d.table_trigger}
            : d.streaming_mode !== undefined
              ? {
                  $case: 'streamingMode' as const,
                  streamingMode: d.streaming_mode,
                }
              : undefined,
    }));

export const unmarshalMaxFunctionSchema: z.ZodType<MaxFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalMinFunctionSchema: z.ZodType<MinFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalMtlsConfigSchema: z.ZodType<MtlsConfig> = z
  .object({
    keystore_location: z.string(),
    keystore_password_ref: z.lazy(() => unmarshalSecretScopeReferenceSchema),
    key_password_ref: z.lazy(() => unmarshalSecretScopeReferenceSchema),
    truststore_location: z.string(),
    truststore_password_ref: z.lazy(() => unmarshalSecretScopeReferenceSchema),
    disable_hostname_verification: z.boolean().optional(),
  })
  .transform(d => ({
    keystoreLocation: d.keystore_location,
    keystorePasswordRef: d.keystore_password_ref,
    keyPasswordRef: d.key_password_ref,
    truststoreLocation: d.truststore_location,
    truststorePasswordRef: d.truststore_password_ref,
    disableHostnameVerification: d.disable_hostname_verification,
  }));

export const unmarshalOfflineStoreConfigSchema: z.ZodType<OfflineStoreConfig> =
  z
    .object({
      catalog_name: z.string(),
      schema_name: z.string(),
      table_name_prefix: z.string(),
    })
    .transform(d => ({
      catalogName: d.catalog_name,
      schemaName: d.schema_name,
      tableNamePrefix: d.table_name_prefix,
    }));

export const unmarshalOnlineStoreConfigSchema: z.ZodType<OnlineStoreConfig> = z
  .object({
    catalog_name: z.string(),
    schema_name: z.string(),
    table_name_prefix: z.string(),
    online_store_name: z.string(),
  })
  .transform(d => ({
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    tableNamePrefix: d.table_name_prefix,
    onlineStoreName: d.online_store_name,
  }));

export const unmarshalProtoSchemaSpecSchema: z.ZodType<ProtoSchemaSpec> = z
  .object({
    schema_text: z.string(),
    message_name: z.string(),
  })
  .transform(d => ({
    schemaText: d.schema_text,
    messageName: d.message_name,
  }));

export const unmarshalRequestSourceSchema: z.ZodType<RequestSource> = z
  .object({
    flat_schema: z.lazy(() => unmarshalFlatSchemaSchema).optional(),
  })
  .transform(d => ({
    schema:
      d.flat_schema !== undefined
        ? {$case: 'flatSchema' as const, flatSchema: d.flat_schema}
        : undefined,
  }));

export const unmarshalRollingWindowSchema: z.ZodType<RollingWindow> = z
  .object({
    window_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    delay: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
  })
  .transform(d => ({
    windowDuration: d.window_duration,
    delay: d.delay,
  }));

export const unmarshalSawtoothWindowSchema: z.ZodType<SawtoothWindow> = z
  .object({
    window_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    delay: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
  })
  .transform(d => ({
    windowDuration: d.window_duration,
    delay: d.delay,
  }));

export const unmarshalSchemaConfigSchema: z.ZodType<SchemaConfig> = z
  .object({
    json_schema: z.string().optional(),
    avro_schema: z.string().optional(),
    proto_schema: z.lazy(() => unmarshalProtoSchemaSpecSchema).optional(),
  })
  .transform(d => ({
    schema:
      d.json_schema !== undefined
        ? {$case: 'jsonSchema' as const, jsonSchema: d.json_schema}
        : d.avro_schema !== undefined
          ? {$case: 'avroSchema' as const, avroSchema: d.avro_schema}
          : d.proto_schema !== undefined
            ? {$case: 'protoSchema' as const, protoSchema: d.proto_schema}
            : undefined,
  }));

export const unmarshalSchemaLocatorSchema: z.ZodType<SchemaLocator> = z
  .object({
    confluent_schema: z
      .lazy(() => unmarshalSchemaLocator_ConfluentSchemaSchema)
      .optional(),
    format: z.string(),
  })
  .transform(d => ({
    registrySchema:
      d.confluent_schema !== undefined
        ? {
            $case: 'confluentSchema' as const,
            confluentSchema: d.confluent_schema,
          }
        : undefined,
    format: d.format,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSchemaLocator_ConfluentSchemaSchema: z.ZodType<SchemaLocator_ConfluentSchema> =
  z
    .object({
      subject: z.string(),
    })
    .transform(d => ({
      subject: d.subject,
    }));

export const unmarshalSchemaRegistryConfigSchema: z.ZodType<SchemaRegistryConfig> =
  z
    .object({
      uc_connection: z.string().optional(),
      api_secret_ref: z.lazy(() => unmarshalSecretScopeReferenceSchema),
      payload_schema_locator: z
        .lazy(() => unmarshalSchemaLocatorSchema)
        .optional(),
      key_schema_locator: z.lazy(() => unmarshalSchemaLocatorSchema).optional(),
    })
    .transform(d => ({
      ucConnection: d.uc_connection,
      apiSecretRef: d.api_secret_ref,
      payloadSchemaLocator: d.payload_schema_locator,
      keySchemaLocator: d.key_schema_locator,
    }));

export const unmarshalSecretScopeReferenceSchema: z.ZodType<SecretScopeReference> =
  z
    .object({
      scope: z.string(),
      key: z.string(),
    })
    .transform(d => ({
      scope: d.scope,
      key: d.key,
    }));

export const unmarshalSlidingWindowSchema: z.ZodType<SlidingWindow> = z
  .object({
    window_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    slide_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase())),
    delay: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    offset: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
  })
  .transform(d => ({
    windowDuration: d.window_duration,
    slideDuration: d.slide_duration,
    delay: d.delay,
    offset: d.offset,
  }));

export const unmarshalSourceLatenessSchema: z.ZodType<SourceLateness> = z
  .object({
    settling_delay: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
  })
  .transform(d => ({
    settlingDelay: d.settling_delay,
  }));

export const unmarshalStddevPopFunctionSchema: z.ZodType<StddevPopFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalStddevSampFunctionSchema: z.ZodType<StddevSampFunction> =
  z
    .object({
      input: z.string(),
    })
    .transform(d => ({
      input: d.input,
    }));

export const unmarshalStreamSchema: z.ZodType<Stream> = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    source_config: z.lazy(() => unmarshalStreamSourceConfigSchema),
    connection_config: z.lazy(() => unmarshalStreamConnectionConfigSchema),
    schema_config: z.lazy(() => unmarshalStreamSchemaConfigSchema),
    ingestion_config: z.lazy(() => unmarshalIngestionConfigSchema),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    created_by: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updated_by: z.string().optional(),
    browse_only: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    sourceConfig: d.source_config,
    connectionConfig: d.connection_config,
    schemaConfig: d.schema_config,
    ingestionConfig: d.ingestion_config,
    createTime: d.create_time,
    createdBy: d.created_by,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
    browseOnly: d.browse_only,
  }));

export const unmarshalStreamArnListSchema: z.ZodType<StreamArnList> = z
  .object({
    arns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    arns: d.arns,
  }));

export const unmarshalStreamConnectionConfigSchema: z.ZodType<StreamConnectionConfig> =
  z
    .object({
      uc_connection_name: z.string().optional(),
      direct_mtls_config: z
        .lazy(() => unmarshalDirectMtlsConfigSchema)
        .optional(),
    })
    .transform(d => ({
      connectionConfig:
        d.uc_connection_name !== undefined
          ? {
              $case: 'ucConnectionName' as const,
              ucConnectionName: d.uc_connection_name,
            }
          : d.direct_mtls_config !== undefined
            ? {
                $case: 'directMtlsConfig' as const,
                directMtlsConfig: d.direct_mtls_config,
              }
            : undefined,
    }));

export const unmarshalStreamNameListSchema: z.ZodType<StreamNameList> = z
  .object({
    names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    names: d.names,
  }));

export const unmarshalStreamSchemaConfigSchema: z.ZodType<StreamSchemaConfig> =
  z
    .object({
      direct_schemas: z.lazy(() => unmarshalDirectSchemasSchema).optional(),
      schema_registry_config: z
        .lazy(() => unmarshalSchemaRegistryConfigSchema)
        .optional(),
    })
    .transform(d => ({
      schemaConfig:
        d.direct_schemas !== undefined
          ? {$case: 'directSchemas' as const, directSchemas: d.direct_schemas}
          : d.schema_registry_config !== undefined
            ? {
                $case: 'schemaRegistryConfig' as const,
                schemaRegistryConfig: d.schema_registry_config,
              }
            : undefined,
    }));

export const unmarshalStreamSourceSchema: z.ZodType<StreamSource> = z
  .object({
    full_name: z.string(),
    filter_condition: z.string().optional(),
    transformation_sql: z.string().optional(),
    dataframe_schema: z.string().optional(),
  })
  .transform(d => ({
    fullName: d.full_name,
    filterCondition: d.filter_condition,
    transformationSql: d.transformation_sql,
    dataframeSchema: d.dataframe_schema,
  }));

export const unmarshalStreamSourceConfigSchema: z.ZodType<StreamSourceConfig> =
  z
    .object({
      kafka_stream_config: z
        .lazy(() => unmarshalKafkaStreamConfigSchema)
        .optional(),
      kinesis_stream_config: z
        .lazy(() => unmarshalKinesisStreamConfigSchema)
        .optional(),
    })
    .transform(d => ({
      sourceConfig:
        d.kafka_stream_config !== undefined
          ? {
              $case: 'kafkaStreamConfig' as const,
              kafkaStreamConfig: d.kafka_stream_config,
            }
          : d.kinesis_stream_config !== undefined
            ? {
                $case: 'kinesisStreamConfig' as const,
                kinesisStreamConfig: d.kinesis_stream_config,
              }
            : undefined,
    }));

export const unmarshalStreamingModeSchema: z.ZodType<StreamingMode> = z
  .object({
    mode: z.string().optional(),
    freshness_target: z.string().optional(),
  })
  .transform(d => ({
    mode: d.mode,
    freshnessTarget: d.freshness_target,
  }));

export const unmarshalSubscriptionModeSchema: z.ZodType<SubscriptionMode> = z
  .object({
    assign: z.string().optional(),
    subscribe: z.string().optional(),
    subscribe_pattern: z.string().optional(),
  })
  .transform(d => ({
    subscriptionMode:
      d.assign !== undefined
        ? {$case: 'assign' as const, assign: d.assign}
        : d.subscribe !== undefined
          ? {$case: 'subscribe' as const, subscribe: d.subscribe}
          : d.subscribe_pattern !== undefined
            ? {
                $case: 'subscribePattern' as const,
                subscribePattern: d.subscribe_pattern,
              }
            : undefined,
  }));

export const unmarshalSumFunctionSchema: z.ZodType<SumFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalTableTriggerSchema: z.ZodType<TableTrigger> = z.object(
  {}
);

export const unmarshalTimeWindowSchema: z.ZodType<TimeWindow> = z
  .object({
    tumbling: z.lazy(() => unmarshalTumblingWindowSchema).optional(),
    sliding: z.lazy(() => unmarshalSlidingWindowSchema).optional(),
    rolling: z.lazy(() => unmarshalRollingWindowSchema).optional(),
    sawtooth: z.lazy(() => unmarshalSawtoothWindowSchema).optional(),
    start_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    windowType:
      d.tumbling !== undefined
        ? {$case: 'tumbling' as const, tumbling: d.tumbling}
        : d.sliding !== undefined
          ? {$case: 'sliding' as const, sliding: d.sliding}
          : d.rolling !== undefined
            ? {$case: 'rolling' as const, rolling: d.rolling}
            : d.sawtooth !== undefined
              ? {$case: 'sawtooth' as const, sawtooth: d.sawtooth}
              : undefined,
    startTime: d.start_time,
  }));

export const unmarshalTimeseriesColumnSchema: z.ZodType<TimeseriesColumn> = z
  .object({
    name: z.string(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalTumblingWindowSchema: z.ZodType<TumblingWindow> = z
  .object({
    window_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase())),
    delay: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
    offset: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
  })
  .transform(d => ({
    windowDuration: d.window_duration,
    delay: d.delay,
    offset: d.offset,
  }));

export const unmarshalVarPopFunctionSchema: z.ZodType<VarPopFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalVarSampFunctionSchema: z.ZodType<VarSampFunction> = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalAggregationFunctionSchema: z.ZodType = z
  .object({
    operation: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('avg'),
          avg: z.lazy(() => marshalAvgFunctionSchema),
        }),
        z.object({
          $case: z.literal('countFunction'),
          countFunction: z.lazy(() => marshalCountFunctionSchema),
        }),
        z.object({
          $case: z.literal('sum'),
          sum: z.lazy(() => marshalSumFunctionSchema),
        }),
        z.object({
          $case: z.literal('min'),
          min: z.lazy(() => marshalMinFunctionSchema),
        }),
        z.object({
          $case: z.literal('max'),
          max: z.lazy(() => marshalMaxFunctionSchema),
        }),
        z.object({
          $case: z.literal('first'),
          first: z.lazy(() => marshalFirstFunctionSchema),
        }),
        z.object({
          $case: z.literal('last'),
          last: z.lazy(() => marshalLastFunctionSchema),
        }),
        z.object({
          $case: z.literal('approxCountDistinct'),
          approxCountDistinct: z.lazy(
            () => marshalApproxCountDistinctFunctionSchema
          ),
        }),
        z.object({
          $case: z.literal('approxPercentile'),
          approxPercentile: z.lazy(() => marshalApproxPercentileFunctionSchema),
        }),
        z.object({
          $case: z.literal('stddevPop'),
          stddevPop: z.lazy(() => marshalStddevPopFunctionSchema),
        }),
        z.object({
          $case: z.literal('stddevSamp'),
          stddevSamp: z.lazy(() => marshalStddevSampFunctionSchema),
        }),
        z.object({
          $case: z.literal('varPop'),
          varPop: z.lazy(() => marshalVarPopFunctionSchema),
        }),
        z.object({
          $case: z.literal('varSamp'),
          varSamp: z.lazy(() => marshalVarSampFunctionSchema),
        }),
        z.object({
          $case: z.literal('firstN'),
          firstN: z.lazy(() => marshalFirstNFunctionSchema),
        }),
        z.object({
          $case: z.literal('lastN'),
          lastN: z.lazy(() => marshalLastNFunctionSchema),
        }),
        z.object({
          $case: z.literal('firstDistinct'),
          firstDistinct: z.lazy(() => marshalFirstDistinctFunctionSchema),
        }),
        z.object({
          $case: z.literal('lastDistinct'),
          lastDistinct: z.lazy(() => marshalLastDistinctFunctionSchema),
        }),
      ])
      .optional(),
    timeWindow: z.lazy(() => marshalTimeWindowSchema).optional(),
  })
  .transform(d => ({
    ...(d.operation?.$case === 'avg' && {avg: d.operation.avg}),
    ...(d.operation?.$case === 'countFunction' && {
      count_function: d.operation.countFunction,
    }),
    ...(d.operation?.$case === 'sum' && {sum: d.operation.sum}),
    ...(d.operation?.$case === 'min' && {min: d.operation.min}),
    ...(d.operation?.$case === 'max' && {max: d.operation.max}),
    ...(d.operation?.$case === 'first' && {first: d.operation.first}),
    ...(d.operation?.$case === 'last' && {last: d.operation.last}),
    ...(d.operation?.$case === 'approxCountDistinct' && {
      approx_count_distinct: d.operation.approxCountDistinct,
    }),
    ...(d.operation?.$case === 'approxPercentile' && {
      approx_percentile: d.operation.approxPercentile,
    }),
    ...(d.operation?.$case === 'stddevPop' && {
      stddev_pop: d.operation.stddevPop,
    }),
    ...(d.operation?.$case === 'stddevSamp' && {
      stddev_samp: d.operation.stddevSamp,
    }),
    ...(d.operation?.$case === 'varPop' && {var_pop: d.operation.varPop}),
    ...(d.operation?.$case === 'varSamp' && {var_samp: d.operation.varSamp}),
    ...(d.operation?.$case === 'firstN' && {first_n: d.operation.firstN}),
    ...(d.operation?.$case === 'lastN' && {last_n: d.operation.lastN}),
    ...(d.operation?.$case === 'firstDistinct' && {
      first_distinct: d.operation.firstDistinct,
    }),
    ...(d.operation?.$case === 'lastDistinct' && {
      last_distinct: d.operation.lastDistinct,
    }),
    time_window: d.timeWindow,
  }));

export const marshalApproxCountDistinctFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    relativeSd: z.number().optional(),
  })
  .transform(d => ({
    input: d.input,
    relative_sd: d.relativeSd,
  }));

export const marshalApproxPercentileFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    percentile: z.number(),
    accuracy: z.bigint().optional(),
  })
  .transform(d => ({
    input: d.input,
    percentile: d.percentile,
    accuracy: d.accuracy,
  }));

export const marshalAuthConfigSchema: z.ZodType = z
  .object({
    authConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('ucServiceCredentialName'),
          ucServiceCredentialName: z.string(),
        }),
        z.object({
          $case: z.literal('mtlsConfig'),
          mtlsConfig: z.lazy(() => marshalMtlsConfigSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.authConfig?.$case === 'ucServiceCredentialName' && {
      uc_service_credential_name: d.authConfig.ucServiceCredentialName,
    }),
    ...(d.authConfig?.$case === 'mtlsConfig' && {
      mtls_config: d.authConfig.mtlsConfig,
    }),
  }));

export const marshalAvgFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalBackfillSourceSchema: z.ZodType = z
  .object({
    backfillSource: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('deltaTableSource'),
          deltaTableSource: z.lazy(() => marshalDeltaTableSourceSchema),
        }),
        z.object({
          $case: z.literal('deltaTableName'),
          deltaTableName: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.backfillSource?.$case === 'deltaTableSource' && {
      delta_table_source: d.backfillSource.deltaTableSource,
    }),
    ...(d.backfillSource?.$case === 'deltaTableName' && {
      delta_table_name: d.backfillSource.deltaTableName,
    }),
  }));

export const marshalBatchCreateMaterializedFeaturesRequestSchema: z.ZodType = z
  .object({
    requests: z.array(
      z.lazy(() => marshalCreateMaterializedFeatureRequestSchema)
    ),
  })
  .transform(d => ({
    requests: d.requests,
  }));

export const marshalColumnSelectionSchema: z.ZodType = z
  .object({
    column: z.string(),
  })
  .transform(d => ({
    column: d.column,
  }));

export const marshalCountFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateMaterializedFeatureRequestSchema: z.ZodType = z
  .object({
    materializedFeature: z.lazy(() => marshalMaterializedFeatureSchema),
  })
  .transform(d => ({
    materialized_feature: d.materializedFeature,
  }));

export const marshalCronScheduleSchema: z.ZodType = z
  .object({
    cronExpression: z.string().optional(),
  })
  .transform(d => ({
    cron_expression: d.cronExpression,
  }));

export const marshalCustomUdfSchema: z.ZodType = z
  .object({
    functionPath: z.string(),
    inputBindings: z.array(z.lazy(() => marshalInputBindingSchema)).optional(),
  })
  .transform(d => ({
    function_path: d.functionPath,
    input_bindings: d.inputBindings,
  }));

export const marshalDataSourceSchema: z.ZodType = z
  .object({
    dataSource: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('deltaTableSource'),
          deltaTableSource: z.lazy(() => marshalDeltaTableSourceSchema),
        }),
        z.object({
          $case: z.literal('kafkaSource'),
          kafkaSource: z.lazy(() => marshalKafkaSourceSchema),
        }),
        z.object({
          $case: z.literal('requestSource'),
          requestSource: z.lazy(() => marshalRequestSourceSchema),
        }),
        z.object({
          $case: z.literal('streamSource'),
          streamSource: z.lazy(() => marshalStreamSourceSchema),
        }),
      ])
      .optional(),
    lateness: z.lazy(() => marshalSourceLatenessSchema).optional(),
  })
  .transform(d => ({
    ...(d.dataSource?.$case === 'deltaTableSource' && {
      delta_table_source: d.dataSource.deltaTableSource,
    }),
    ...(d.dataSource?.$case === 'kafkaSource' && {
      kafka_source: d.dataSource.kafkaSource,
    }),
    ...(d.dataSource?.$case === 'requestSource' && {
      request_source: d.dataSource.requestSource,
    }),
    ...(d.dataSource?.$case === 'streamSource' && {
      stream_source: d.dataSource.streamSource,
    }),
    lateness: d.lateness,
  }));

export const marshalDeltaTableSourceSchema: z.ZodType = z
  .object({
    fullName: z.string(),
    filterCondition: z.string().optional(),
    transformationSql: z.string().optional(),
    dataframeSchema: z.string().optional(),
  })
  .transform(d => ({
    full_name: d.fullName,
    filter_condition: d.filterCondition,
    transformation_sql: d.transformationSql,
    dataframe_schema: d.dataframeSchema,
  }));

export const marshalDirectMtlsConfigSchema: z.ZodType = z
  .object({
    bootstrapServers: z.string(),
    mtlsConfig: z.lazy(() => marshalMtlsConfigSchema),
  })
  .transform(d => ({
    bootstrap_servers: d.bootstrapServers,
    mtls_config: d.mtlsConfig,
  }));

export const marshalDirectSchemasSchema: z.ZodType = z
  .object({
    payloadSchema: z.lazy(() => marshalSchemaConfigSchema).optional(),
    keySchema: z.lazy(() => marshalSchemaConfigSchema).optional(),
  })
  .transform(d => ({
    payload_schema: d.payloadSchema,
    key_schema: d.keySchema,
  }));

export const marshalEntityColumnSchema: z.ZodType = z
  .object({
    name: z.string(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalFeatureSchema: z.ZodType = z
  .object({
    fullName: z.string(),
    source: z.lazy(() => marshalDataSourceSchema),
    function: z.lazy(() => marshalFunctionSchema),
    description: z.string().optional(),
    lineageContext: z.lazy(() => marshalLineageContextSchema).optional(),
    entities: z.array(z.lazy(() => marshalEntityColumnSchema)).optional(),
    timeseriesColumn: z.lazy(() => marshalTimeseriesColumnSchema).optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    name: z.string().optional(),
    createdAt: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    createdBy: z.string().optional(),
  })
  .transform(d => ({
    full_name: d.fullName,
    source: d.source,
    function: d.function,
    description: d.description,
    lineage_context: d.lineageContext,
    entities: d.entities,
    timeseries_column: d.timeseriesColumn,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    name: d.name,
    created_at: d.createdAt,
    created_by: d.createdBy,
  }));

export const marshalFieldDefinitionSchema: z.ZodType = z
  .object({
    name: z.string(),
    dataType: z.string(),
  })
  .transform(d => ({
    name: d.name,
    data_type: d.dataType,
  }));

export const marshalFirstDistinctFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    n: z.bigint(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalFirstFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalFirstNFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    n: z.bigint(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalFlatSchemaSchema: z.ZodType = z
  .object({
    fields: z.array(z.lazy(() => marshalFieldDefinitionSchema)),
  })
  .transform(d => ({
    fields: d.fields,
  }));

export const marshalFunctionSchema: z.ZodType = z
  .object({
    function: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('aggregationFunction'),
          aggregationFunction: z.lazy(() => marshalAggregationFunctionSchema),
        }),
        z.object({
          $case: z.literal('columnSelection'),
          columnSelection: z.lazy(() => marshalColumnSelectionSchema),
        }),
        z.object({
          $case: z.literal('customUdf'),
          customUdf: z.lazy(() => marshalCustomUdfSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.function?.$case === 'aggregationFunction' && {
      aggregation_function: d.function.aggregationFunction,
    }),
    ...(d.function?.$case === 'columnSelection' && {
      column_selection: d.function.columnSelection,
    }),
    ...(d.function?.$case === 'customUdf' && {
      custom_udf: d.function.customUdf,
    }),
  }));

export const marshalIngestionConfigSchema: z.ZodType = z
  .object({
    ingestionDestination: z.lazy(() => marshalIngestionDestinationSchema),
    backfillSource: z.lazy(() => marshalBackfillSourceSchema).optional(),
    deduplicationColumns: z.array(z.string()).optional(),
    ingestionPipelineId: z.string().optional(),
    ingestionJobId: z.bigint().optional(),
    backfillJobId: z.bigint().optional(),
  })
  .transform(d => ({
    ingestion_destination: d.ingestionDestination,
    backfill_source: d.backfillSource,
    deduplication_columns: d.deduplicationColumns,
    ingestion_pipeline_id: d.ingestionPipelineId,
    ingestion_job_id: d.ingestionJobId,
    backfill_job_id: d.backfillJobId,
  }));

export const marshalIngestionDestinationSchema: z.ZodType = z
  .object({
    ingestionDestination: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('deltaTableName'),
          deltaTableName: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.ingestionDestination?.$case === 'deltaTableName' && {
      delta_table_name: d.ingestionDestination.deltaTableName,
    }),
  }));

export const marshalInputBindingSchema: z.ZodType = z
  .object({
    parameter: z.string(),
    column: z.string(),
  })
  .transform(d => ({
    parameter: d.parameter,
    column: d.column,
  }));

export const marshalJobContextSchema: z.ZodType = z
  .object({
    jobId: z.bigint().optional(),
    jobRunId: z.bigint().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    job_run_id: d.jobRunId,
  }));

export const marshalKafkaConfigSchema: z.ZodType = z
  .object({
    name: z.string(),
    bootstrapServers: z.string(),
    subscriptionMode: z.lazy(() => marshalSubscriptionModeSchema),
    authConfig: z.lazy(() => marshalAuthConfigSchema),
    keySchema: z.lazy(() => marshalSchemaConfigSchema).optional(),
    valueSchema: z.lazy(() => marshalSchemaConfigSchema).optional(),
    extraOptions: z.record(z.string(), z.string()).optional(),
    backfillSource: z.lazy(() => marshalBackfillSourceSchema).optional(),
    ingestionConfig: z.lazy(() => marshalIngestionConfigSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    bootstrap_servers: d.bootstrapServers,
    subscription_mode: d.subscriptionMode,
    auth_config: d.authConfig,
    key_schema: d.keySchema,
    value_schema: d.valueSchema,
    extra_options: d.extraOptions,
    backfill_source: d.backfillSource,
    ingestion_config: d.ingestionConfig,
  }));

export const marshalKafkaSourceSchema: z.ZodType = z
  .object({
    name: z.string(),
    filterCondition: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    filter_condition: d.filterCondition,
  }));

export const marshalKafkaStreamConfigSchema: z.ZodType = z
  .object({
    subscriptionMode: z.lazy(() => marshalKafkaSubscriptionModeSchema),
    extraOptions: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    subscription_mode: d.subscriptionMode,
    extra_options: d.extraOptions,
  }));

export const marshalKafkaSubscriptionModeSchema: z.ZodType = z
  .object({
    subscriptionMode: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('assign'), assign: z.string()}),
        z.object({$case: z.literal('subscribe'), subscribe: z.string()}),
        z.object({
          $case: z.literal('subscribePattern'),
          subscribePattern: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriptionMode?.$case === 'assign' && {
      assign: d.subscriptionMode.assign,
    }),
    ...(d.subscriptionMode?.$case === 'subscribe' && {
      subscribe: d.subscriptionMode.subscribe,
    }),
    ...(d.subscriptionMode?.$case === 'subscribePattern' && {
      subscribe_pattern: d.subscriptionMode.subscribePattern,
    }),
  }));

export const marshalKinesisStreamConfigSchema: z.ZodType = z
  .object({
    streamIdentifier: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('streamNames'),
          streamNames: z.lazy(() => marshalStreamNameListSchema),
        }),
        z.object({
          $case: z.literal('streamArns'),
          streamArns: z.lazy(() => marshalStreamArnListSchema),
        }),
      ])
      .optional(),
    extraOptions: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    ...(d.streamIdentifier?.$case === 'streamNames' && {
      stream_names: d.streamIdentifier.streamNames,
    }),
    ...(d.streamIdentifier?.$case === 'streamArns' && {
      stream_arns: d.streamIdentifier.streamArns,
    }),
    extra_options: d.extraOptions,
  }));

export const marshalLastDistinctFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    n: z.bigint(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalLastFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalLastNFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    n: z.bigint(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalLineageContextSchema: z.ZodType = z
  .object({
    notebookId: z.bigint().optional(),
    jobContext: z.lazy(() => marshalJobContextSchema).optional(),
  })
  .transform(d => ({
    notebook_id: d.notebookId,
    job_context: d.jobContext,
  }));

export const marshalMaterializedFeatureSchema: z.ZodType = z
  .object({
    materializedFeatureId: z.string().optional(),
    featureName: z.string(),
    destination: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('offlineStoreConfig'),
          offlineStoreConfig: z.lazy(() => marshalOfflineStoreConfigSchema),
        }),
        z.object({
          $case: z.literal('onlineStoreConfig'),
          onlineStoreConfig: z.lazy(() => marshalOnlineStoreConfigSchema),
        }),
      ])
      .optional(),
    tableName: z.string().optional(),
    pipelineScheduleState: z.string().optional(),
    lastMaterializationTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    isOnline: z.boolean().optional(),
    trigger: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('cronScheduleTrigger'),
          cronScheduleTrigger: z.lazy(() => marshalCronScheduleSchema),
        }),
        z.object({
          $case: z.literal('tableTrigger'),
          tableTrigger: z.lazy(() => marshalTableTriggerSchema),
        }),
        z.object({
          $case: z.literal('streamingMode'),
          streamingMode: z.lazy(() => marshalStreamingModeSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    materialized_feature_id: d.materializedFeatureId,
    feature_name: d.featureName,
    ...(d.destination?.$case === 'offlineStoreConfig' && {
      offline_store_config: d.destination.offlineStoreConfig,
    }),
    ...(d.destination?.$case === 'onlineStoreConfig' && {
      online_store_config: d.destination.onlineStoreConfig,
    }),
    table_name: d.tableName,
    pipeline_schedule_state: d.pipelineScheduleState,
    last_materialization_time: d.lastMaterializationTime,
    is_online: d.isOnline,
    ...(d.trigger?.$case === 'cronScheduleTrigger' && {
      cron_schedule_trigger: d.trigger.cronScheduleTrigger,
    }),
    ...(d.trigger?.$case === 'tableTrigger' && {
      table_trigger: d.trigger.tableTrigger,
    }),
    ...(d.trigger?.$case === 'streamingMode' && {
      streaming_mode: d.trigger.streamingMode,
    }),
  }));

export const marshalMaxFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalMinFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalMtlsConfigSchema: z.ZodType = z
  .object({
    keystoreLocation: z.string(),
    keystorePasswordRef: z.lazy(() => marshalSecretScopeReferenceSchema),
    keyPasswordRef: z.lazy(() => marshalSecretScopeReferenceSchema),
    truststoreLocation: z.string(),
    truststorePasswordRef: z.lazy(() => marshalSecretScopeReferenceSchema),
    disableHostnameVerification: z.boolean().optional(),
  })
  .transform(d => ({
    keystore_location: d.keystoreLocation,
    keystore_password_ref: d.keystorePasswordRef,
    key_password_ref: d.keyPasswordRef,
    truststore_location: d.truststoreLocation,
    truststore_password_ref: d.truststorePasswordRef,
    disable_hostname_verification: d.disableHostnameVerification,
  }));

export const marshalOfflineStoreConfigSchema: z.ZodType = z
  .object({
    catalogName: z.string(),
    schemaName: z.string(),
    tableNamePrefix: z.string(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    table_name_prefix: d.tableNamePrefix,
  }));

export const marshalOnlineStoreConfigSchema: z.ZodType = z
  .object({
    catalogName: z.string(),
    schemaName: z.string(),
    tableNamePrefix: z.string(),
    onlineStoreName: z.string(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    table_name_prefix: d.tableNamePrefix,
    online_store_name: d.onlineStoreName,
  }));

export const marshalProtoSchemaSpecSchema: z.ZodType = z
  .object({
    schemaText: z.string(),
    messageName: z.string(),
  })
  .transform(d => ({
    schema_text: d.schemaText,
    message_name: d.messageName,
  }));

export const marshalRequestSourceSchema: z.ZodType = z
  .object({
    schema: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('flatSchema'),
          flatSchema: z.lazy(() => marshalFlatSchemaSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.schema?.$case === 'flatSchema' && {flat_schema: d.schema.flatSchema}),
  }));

export const marshalRollingWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    delay: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
    delay: d.delay,
  }));

export const marshalSawtoothWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    delay: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
    delay: d.delay,
  }));

export const marshalSchemaConfigSchema: z.ZodType = z
  .object({
    schema: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('jsonSchema'), jsonSchema: z.string()}),
        z.object({$case: z.literal('avroSchema'), avroSchema: z.string()}),
        z.object({
          $case: z.literal('protoSchema'),
          protoSchema: z.lazy(() => marshalProtoSchemaSpecSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.schema?.$case === 'jsonSchema' && {json_schema: d.schema.jsonSchema}),
    ...(d.schema?.$case === 'avroSchema' && {avro_schema: d.schema.avroSchema}),
    ...(d.schema?.$case === 'protoSchema' && {
      proto_schema: d.schema.protoSchema,
    }),
  }));

export const marshalSchemaLocatorSchema: z.ZodType = z
  .object({
    registrySchema: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('confluentSchema'),
          confluentSchema: z.lazy(
            () => marshalSchemaLocator_ConfluentSchemaSchema
          ),
        }),
      ])
      .optional(),
    format: z.string(),
  })
  .transform(d => ({
    ...(d.registrySchema?.$case === 'confluentSchema' && {
      confluent_schema: d.registrySchema.confluentSchema,
    }),
    format: d.format,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSchemaLocator_ConfluentSchemaSchema: z.ZodType = z
  .object({
    subject: z.string(),
  })
  .transform(d => ({
    subject: d.subject,
  }));

export const marshalSchemaRegistryConfigSchema: z.ZodType = z
  .object({
    ucConnection: z.string().optional(),
    apiSecretRef: z.lazy(() => marshalSecretScopeReferenceSchema),
    payloadSchemaLocator: z.lazy(() => marshalSchemaLocatorSchema).optional(),
    keySchemaLocator: z.lazy(() => marshalSchemaLocatorSchema).optional(),
  })
  .transform(d => ({
    uc_connection: d.ucConnection,
    api_secret_ref: d.apiSecretRef,
    payload_schema_locator: d.payloadSchemaLocator,
    key_schema_locator: d.keySchemaLocator,
  }));

export const marshalSecretScopeReferenceSchema: z.ZodType = z
  .object({
    scope: z.string(),
    key: z.string(),
  })
  .transform(d => ({
    scope: d.scope,
    key: d.key,
  }));

export const marshalSlidingWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    slideDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase()),
    delay: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    offset: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
    slide_duration: d.slideDuration,
    delay: d.delay,
    offset: d.offset,
  }));

export const marshalSourceLatenessSchema: z.ZodType = z
  .object({
    settlingDelay: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    settling_delay: d.settlingDelay,
  }));

export const marshalStddevPopFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalStddevSampFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalStreamSchema: z.ZodType = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    sourceConfig: z.lazy(() => marshalStreamSourceConfigSchema),
    connectionConfig: z.lazy(() => marshalStreamConnectionConfigSchema),
    schemaConfig: z.lazy(() => marshalStreamSchemaConfigSchema),
    ingestionConfig: z.lazy(() => marshalIngestionConfigSchema),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    createdBy: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.string().optional(),
    browseOnly: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    source_config: d.sourceConfig,
    connection_config: d.connectionConfig,
    schema_config: d.schemaConfig,
    ingestion_config: d.ingestionConfig,
    create_time: d.createTime,
    created_by: d.createdBy,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    browse_only: d.browseOnly,
  }));

export const marshalStreamArnListSchema: z.ZodType = z
  .object({
    arns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    arns: d.arns,
  }));

export const marshalStreamConnectionConfigSchema: z.ZodType = z
  .object({
    connectionConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('ucConnectionName'),
          ucConnectionName: z.string(),
        }),
        z.object({
          $case: z.literal('directMtlsConfig'),
          directMtlsConfig: z.lazy(() => marshalDirectMtlsConfigSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.connectionConfig?.$case === 'ucConnectionName' && {
      uc_connection_name: d.connectionConfig.ucConnectionName,
    }),
    ...(d.connectionConfig?.$case === 'directMtlsConfig' && {
      direct_mtls_config: d.connectionConfig.directMtlsConfig,
    }),
  }));

export const marshalStreamNameListSchema: z.ZodType = z
  .object({
    names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    names: d.names,
  }));

export const marshalStreamSchemaConfigSchema: z.ZodType = z
  .object({
    schemaConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('directSchemas'),
          directSchemas: z.lazy(() => marshalDirectSchemasSchema),
        }),
        z.object({
          $case: z.literal('schemaRegistryConfig'),
          schemaRegistryConfig: z.lazy(() => marshalSchemaRegistryConfigSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.schemaConfig?.$case === 'directSchemas' && {
      direct_schemas: d.schemaConfig.directSchemas,
    }),
    ...(d.schemaConfig?.$case === 'schemaRegistryConfig' && {
      schema_registry_config: d.schemaConfig.schemaRegistryConfig,
    }),
  }));

export const marshalStreamSourceSchema: z.ZodType = z
  .object({
    fullName: z.string(),
    filterCondition: z.string().optional(),
    transformationSql: z.string().optional(),
    dataframeSchema: z.string().optional(),
  })
  .transform(d => ({
    full_name: d.fullName,
    filter_condition: d.filterCondition,
    transformation_sql: d.transformationSql,
    dataframe_schema: d.dataframeSchema,
  }));

export const marshalStreamSourceConfigSchema: z.ZodType = z
  .object({
    sourceConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('kafkaStreamConfig'),
          kafkaStreamConfig: z.lazy(() => marshalKafkaStreamConfigSchema),
        }),
        z.object({
          $case: z.literal('kinesisStreamConfig'),
          kinesisStreamConfig: z.lazy(() => marshalKinesisStreamConfigSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.sourceConfig?.$case === 'kafkaStreamConfig' && {
      kafka_stream_config: d.sourceConfig.kafkaStreamConfig,
    }),
    ...(d.sourceConfig?.$case === 'kinesisStreamConfig' && {
      kinesis_stream_config: d.sourceConfig.kinesisStreamConfig,
    }),
  }));

export const marshalStreamingModeSchema: z.ZodType = z
  .object({
    mode: z.string().optional(),
    freshnessTarget: z.string().optional(),
  })
  .transform(d => ({
    mode: d.mode,
    freshness_target: d.freshnessTarget,
  }));

export const marshalSubscriptionModeSchema: z.ZodType = z
  .object({
    subscriptionMode: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('assign'), assign: z.string()}),
        z.object({$case: z.literal('subscribe'), subscribe: z.string()}),
        z.object({
          $case: z.literal('subscribePattern'),
          subscribePattern: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriptionMode?.$case === 'assign' && {
      assign: d.subscriptionMode.assign,
    }),
    ...(d.subscriptionMode?.$case === 'subscribe' && {
      subscribe: d.subscriptionMode.subscribe,
    }),
    ...(d.subscriptionMode?.$case === 'subscribePattern' && {
      subscribe_pattern: d.subscriptionMode.subscribePattern,
    }),
  }));

export const marshalSumFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalTableTriggerSchema: z.ZodType = z.object({});

export const marshalTimeWindowSchema: z.ZodType = z
  .object({
    windowType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('tumbling'),
          tumbling: z.lazy(() => marshalTumblingWindowSchema),
        }),
        z.object({
          $case: z.literal('sliding'),
          sliding: z.lazy(() => marshalSlidingWindowSchema),
        }),
        z.object({
          $case: z.literal('rolling'),
          rolling: z.lazy(() => marshalRollingWindowSchema),
        }),
        z.object({
          $case: z.literal('sawtooth'),
          sawtooth: z.lazy(() => marshalSawtoothWindowSchema),
        }),
      ])
      .optional(),
    startTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    ...(d.windowType?.$case === 'tumbling' && {
      tumbling: d.windowType.tumbling,
    }),
    ...(d.windowType?.$case === 'sliding' && {sliding: d.windowType.sliding}),
    ...(d.windowType?.$case === 'rolling' && {rolling: d.windowType.rolling}),
    ...(d.windowType?.$case === 'sawtooth' && {
      sawtooth: d.windowType.sawtooth,
    }),
    start_time: d.startTime,
  }));

export const marshalTimeseriesColumnSchema: z.ZodType = z
  .object({
    name: z.string(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalTumblingWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase()),
    delay: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    offset: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
    delay: d.delay,
    offset: d.offset,
  }));

export const marshalVarPopFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalVarSampFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

const aggregationFunctionFieldMaskSchema: FieldMaskSchema = {
  approxCountDistinct: {
    wire: 'approx_count_distinct',
    children: () => approxCountDistinctFunctionFieldMaskSchema,
  },
  approxPercentile: {
    wire: 'approx_percentile',
    children: () => approxPercentileFunctionFieldMaskSchema,
  },
  avg: {wire: 'avg', children: () => avgFunctionFieldMaskSchema},
  countFunction: {
    wire: 'count_function',
    children: () => countFunctionFieldMaskSchema,
  },
  first: {wire: 'first', children: () => firstFunctionFieldMaskSchema},
  firstDistinct: {
    wire: 'first_distinct',
    children: () => firstDistinctFunctionFieldMaskSchema,
  },
  firstN: {wire: 'first_n', children: () => firstNFunctionFieldMaskSchema},
  last: {wire: 'last', children: () => lastFunctionFieldMaskSchema},
  lastDistinct: {
    wire: 'last_distinct',
    children: () => lastDistinctFunctionFieldMaskSchema,
  },
  lastN: {wire: 'last_n', children: () => lastNFunctionFieldMaskSchema},
  max: {wire: 'max', children: () => maxFunctionFieldMaskSchema},
  min: {wire: 'min', children: () => minFunctionFieldMaskSchema},
  stddevPop: {
    wire: 'stddev_pop',
    children: () => stddevPopFunctionFieldMaskSchema,
  },
  stddevSamp: {
    wire: 'stddev_samp',
    children: () => stddevSampFunctionFieldMaskSchema,
  },
  sum: {wire: 'sum', children: () => sumFunctionFieldMaskSchema},
  timeWindow: {wire: 'time_window', children: () => timeWindowFieldMaskSchema},
  varPop: {wire: 'var_pop', children: () => varPopFunctionFieldMaskSchema},
  varSamp: {wire: 'var_samp', children: () => varSampFunctionFieldMaskSchema},
};

const approxCountDistinctFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  relativeSd: {wire: 'relative_sd'},
};

const approxPercentileFunctionFieldMaskSchema: FieldMaskSchema = {
  accuracy: {wire: 'accuracy'},
  input: {wire: 'input'},
  percentile: {wire: 'percentile'},
};

const authConfigFieldMaskSchema: FieldMaskSchema = {
  mtlsConfig: {wire: 'mtls_config', children: () => mtlsConfigFieldMaskSchema},
  ucServiceCredentialName: {wire: 'uc_service_credential_name'},
};

const avgFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const backfillSourceFieldMaskSchema: FieldMaskSchema = {
  deltaTableName: {wire: 'delta_table_name'},
  deltaTableSource: {
    wire: 'delta_table_source',
    children: () => deltaTableSourceFieldMaskSchema,
  },
};

const columnSelectionFieldMaskSchema: FieldMaskSchema = {
  column: {wire: 'column'},
};

const countFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const cronScheduleFieldMaskSchema: FieldMaskSchema = {
  cronExpression: {wire: 'cron_expression'},
};

const customUdfFieldMaskSchema: FieldMaskSchema = {
  functionPath: {wire: 'function_path'},
  inputBindings: {wire: 'input_bindings'},
};

const dataSourceFieldMaskSchema: FieldMaskSchema = {
  deltaTableSource: {
    wire: 'delta_table_source',
    children: () => deltaTableSourceFieldMaskSchema,
  },
  kafkaSource: {
    wire: 'kafka_source',
    children: () => kafkaSourceFieldMaskSchema,
  },
  lateness: {wire: 'lateness', children: () => sourceLatenessFieldMaskSchema},
  requestSource: {
    wire: 'request_source',
    children: () => requestSourceFieldMaskSchema,
  },
  streamSource: {
    wire: 'stream_source',
    children: () => streamSourceFieldMaskSchema,
  },
};

const deltaTableSourceFieldMaskSchema: FieldMaskSchema = {
  dataframeSchema: {wire: 'dataframe_schema'},
  filterCondition: {wire: 'filter_condition'},
  fullName: {wire: 'full_name'},
  transformationSql: {wire: 'transformation_sql'},
};

const directMtlsConfigFieldMaskSchema: FieldMaskSchema = {
  bootstrapServers: {wire: 'bootstrap_servers'},
  mtlsConfig: {wire: 'mtls_config', children: () => mtlsConfigFieldMaskSchema},
};

const directSchemasFieldMaskSchema: FieldMaskSchema = {
  keySchema: {wire: 'key_schema', children: () => schemaConfigFieldMaskSchema},
  payloadSchema: {
    wire: 'payload_schema',
    children: () => schemaConfigFieldMaskSchema,
  },
};

const featureFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  createdAt: {wire: 'created_at'},
  createdBy: {wire: 'created_by'},
  description: {wire: 'description'},
  entities: {wire: 'entities'},
  fullName: {wire: 'full_name'},
  function: {wire: 'function', children: () => functionFieldMaskSchema},
  lineageContext: {
    wire: 'lineage_context',
    children: () => lineageContextFieldMaskSchema,
  },
  name: {wire: 'name'},
  schemaName: {wire: 'schema_name'},
  source: {wire: 'source', children: () => dataSourceFieldMaskSchema},
  timeseriesColumn: {
    wire: 'timeseries_column',
    children: () => timeseriesColumnFieldMaskSchema,
  },
};

export function featureFieldMask(...paths: string[]): FieldMask<Feature> {
  return FieldMask.build<Feature>(paths, featureFieldMaskSchema);
}

const firstDistinctFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  n: {wire: 'n'},
};

const firstFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const firstNFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  n: {wire: 'n'},
};

const flatSchemaFieldMaskSchema: FieldMaskSchema = {
  fields: {wire: 'fields'},
};

const functionFieldMaskSchema: FieldMaskSchema = {
  aggregationFunction: {
    wire: 'aggregation_function',
    children: () => aggregationFunctionFieldMaskSchema,
  },
  columnSelection: {
    wire: 'column_selection',
    children: () => columnSelectionFieldMaskSchema,
  },
  customUdf: {wire: 'custom_udf', children: () => customUdfFieldMaskSchema},
};

const ingestionConfigFieldMaskSchema: FieldMaskSchema = {
  backfillJobId: {wire: 'backfill_job_id'},
  backfillSource: {
    wire: 'backfill_source',
    children: () => backfillSourceFieldMaskSchema,
  },
  deduplicationColumns: {wire: 'deduplication_columns'},
  ingestionDestination: {
    wire: 'ingestion_destination',
    children: () => ingestionDestinationFieldMaskSchema,
  },
  ingestionJobId: {wire: 'ingestion_job_id'},
  ingestionPipelineId: {wire: 'ingestion_pipeline_id'},
};

const ingestionDestinationFieldMaskSchema: FieldMaskSchema = {
  deltaTableName: {wire: 'delta_table_name'},
};

const jobContextFieldMaskSchema: FieldMaskSchema = {
  jobId: {wire: 'job_id'},
  jobRunId: {wire: 'job_run_id'},
};

const kafkaConfigFieldMaskSchema: FieldMaskSchema = {
  authConfig: {wire: 'auth_config', children: () => authConfigFieldMaskSchema},
  backfillSource: {
    wire: 'backfill_source',
    children: () => backfillSourceFieldMaskSchema,
  },
  bootstrapServers: {wire: 'bootstrap_servers'},
  extraOptions: {wire: 'extra_options'},
  ingestionConfig: {
    wire: 'ingestion_config',
    children: () => ingestionConfigFieldMaskSchema,
  },
  keySchema: {wire: 'key_schema', children: () => schemaConfigFieldMaskSchema},
  name: {wire: 'name'},
  subscriptionMode: {
    wire: 'subscription_mode',
    children: () => subscriptionModeFieldMaskSchema,
  },
  valueSchema: {
    wire: 'value_schema',
    children: () => schemaConfigFieldMaskSchema,
  },
};

export function kafkaConfigFieldMask(
  ...paths: string[]
): FieldMask<KafkaConfig> {
  return FieldMask.build<KafkaConfig>(paths, kafkaConfigFieldMaskSchema);
}

const kafkaSourceFieldMaskSchema: FieldMaskSchema = {
  filterCondition: {wire: 'filter_condition'},
  name: {wire: 'name'},
};

const kafkaStreamConfigFieldMaskSchema: FieldMaskSchema = {
  extraOptions: {wire: 'extra_options'},
  subscriptionMode: {
    wire: 'subscription_mode',
    children: () => kafkaSubscriptionModeFieldMaskSchema,
  },
};

const kafkaSubscriptionModeFieldMaskSchema: FieldMaskSchema = {
  assign: {wire: 'assign'},
  subscribe: {wire: 'subscribe'},
  subscribePattern: {wire: 'subscribe_pattern'},
};

const kinesisStreamConfigFieldMaskSchema: FieldMaskSchema = {
  extraOptions: {wire: 'extra_options'},
  streamArns: {
    wire: 'stream_arns',
    children: () => streamArnListFieldMaskSchema,
  },
  streamNames: {
    wire: 'stream_names',
    children: () => streamNameListFieldMaskSchema,
  },
};

const lastDistinctFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  n: {wire: 'n'},
};

const lastFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const lastNFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  n: {wire: 'n'},
};

const lineageContextFieldMaskSchema: FieldMaskSchema = {
  jobContext: {wire: 'job_context', children: () => jobContextFieldMaskSchema},
  notebookId: {wire: 'notebook_id'},
};

const materializedFeatureFieldMaskSchema: FieldMaskSchema = {
  cronScheduleTrigger: {
    wire: 'cron_schedule_trigger',
    children: () => cronScheduleFieldMaskSchema,
  },
  featureName: {wire: 'feature_name'},
  isOnline: {wire: 'is_online'},
  lastMaterializationTime: {wire: 'last_materialization_time'},
  materializedFeatureId: {wire: 'materialized_feature_id'},
  offlineStoreConfig: {
    wire: 'offline_store_config',
    children: () => offlineStoreConfigFieldMaskSchema,
  },
  onlineStoreConfig: {
    wire: 'online_store_config',
    children: () => onlineStoreConfigFieldMaskSchema,
  },
  pipelineScheduleState: {wire: 'pipeline_schedule_state'},
  streamingMode: {
    wire: 'streaming_mode',
    children: () => streamingModeFieldMaskSchema,
  },
  tableName: {wire: 'table_name'},
  tableTrigger: {
    wire: 'table_trigger',
    children: () => tableTriggerFieldMaskSchema,
  },
};

export function materializedFeatureFieldMask(
  ...paths: string[]
): FieldMask<MaterializedFeature> {
  return FieldMask.build<MaterializedFeature>(
    paths,
    materializedFeatureFieldMaskSchema
  );
}

const maxFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const minFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const mtlsConfigFieldMaskSchema: FieldMaskSchema = {
  disableHostnameVerification: {wire: 'disable_hostname_verification'},
  keyPasswordRef: {
    wire: 'key_password_ref',
    children: () => secretScopeReferenceFieldMaskSchema,
  },
  keystoreLocation: {wire: 'keystore_location'},
  keystorePasswordRef: {
    wire: 'keystore_password_ref',
    children: () => secretScopeReferenceFieldMaskSchema,
  },
  truststoreLocation: {wire: 'truststore_location'},
  truststorePasswordRef: {
    wire: 'truststore_password_ref',
    children: () => secretScopeReferenceFieldMaskSchema,
  },
};

const offlineStoreConfigFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  schemaName: {wire: 'schema_name'},
  tableNamePrefix: {wire: 'table_name_prefix'},
};

const onlineStoreConfigFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  onlineStoreName: {wire: 'online_store_name'},
  schemaName: {wire: 'schema_name'},
  tableNamePrefix: {wire: 'table_name_prefix'},
};

const protoSchemaSpecFieldMaskSchema: FieldMaskSchema = {
  messageName: {wire: 'message_name'},
  schemaText: {wire: 'schema_text'},
};

const requestSourceFieldMaskSchema: FieldMaskSchema = {
  flatSchema: {wire: 'flat_schema', children: () => flatSchemaFieldMaskSchema},
};

const rollingWindowFieldMaskSchema: FieldMaskSchema = {
  delay: {wire: 'delay'},
  windowDuration: {wire: 'window_duration'},
};

const sawtoothWindowFieldMaskSchema: FieldMaskSchema = {
  delay: {wire: 'delay'},
  windowDuration: {wire: 'window_duration'},
};

const schemaConfigFieldMaskSchema: FieldMaskSchema = {
  avroSchema: {wire: 'avro_schema'},
  jsonSchema: {wire: 'json_schema'},
  protoSchema: {
    wire: 'proto_schema',
    children: () => protoSchemaSpecFieldMaskSchema,
  },
};

const schemaLocatorFieldMaskSchema: FieldMaskSchema = {
  confluentSchema: {
    wire: 'confluent_schema',
    children: () => schemaLocator_ConfluentSchemaFieldMaskSchema,
  },
  format: {wire: 'format'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const schemaLocator_ConfluentSchemaFieldMaskSchema: FieldMaskSchema = {
  subject: {wire: 'subject'},
};

const schemaRegistryConfigFieldMaskSchema: FieldMaskSchema = {
  apiSecretRef: {
    wire: 'api_secret_ref',
    children: () => secretScopeReferenceFieldMaskSchema,
  },
  keySchemaLocator: {
    wire: 'key_schema_locator',
    children: () => schemaLocatorFieldMaskSchema,
  },
  payloadSchemaLocator: {
    wire: 'payload_schema_locator',
    children: () => schemaLocatorFieldMaskSchema,
  },
  ucConnection: {wire: 'uc_connection'},
};

const secretScopeReferenceFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  scope: {wire: 'scope'},
};

const slidingWindowFieldMaskSchema: FieldMaskSchema = {
  delay: {wire: 'delay'},
  offset: {wire: 'offset'},
  slideDuration: {wire: 'slide_duration'},
  windowDuration: {wire: 'window_duration'},
};

const sourceLatenessFieldMaskSchema: FieldMaskSchema = {
  settlingDelay: {wire: 'settling_delay'},
};

const stddevPopFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const stddevSampFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const streamFieldMaskSchema: FieldMaskSchema = {
  browseOnly: {wire: 'browse_only'},
  connectionConfig: {
    wire: 'connection_config',
    children: () => streamConnectionConfigFieldMaskSchema,
  },
  createTime: {wire: 'create_time'},
  createdBy: {wire: 'created_by'},
  description: {wire: 'description'},
  ingestionConfig: {
    wire: 'ingestion_config',
    children: () => ingestionConfigFieldMaskSchema,
  },
  name: {wire: 'name'},
  schemaConfig: {
    wire: 'schema_config',
    children: () => streamSchemaConfigFieldMaskSchema,
  },
  sourceConfig: {
    wire: 'source_config',
    children: () => streamSourceConfigFieldMaskSchema,
  },
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by'},
};

export function streamFieldMask(...paths: string[]): FieldMask<Stream> {
  return FieldMask.build<Stream>(paths, streamFieldMaskSchema);
}

const streamArnListFieldMaskSchema: FieldMaskSchema = {
  arns: {wire: 'arns'},
};

const streamConnectionConfigFieldMaskSchema: FieldMaskSchema = {
  directMtlsConfig: {
    wire: 'direct_mtls_config',
    children: () => directMtlsConfigFieldMaskSchema,
  },
  ucConnectionName: {wire: 'uc_connection_name'},
};

const streamNameListFieldMaskSchema: FieldMaskSchema = {
  names: {wire: 'names'},
};

const streamSchemaConfigFieldMaskSchema: FieldMaskSchema = {
  directSchemas: {
    wire: 'direct_schemas',
    children: () => directSchemasFieldMaskSchema,
  },
  schemaRegistryConfig: {
    wire: 'schema_registry_config',
    children: () => schemaRegistryConfigFieldMaskSchema,
  },
};

const streamSourceFieldMaskSchema: FieldMaskSchema = {
  dataframeSchema: {wire: 'dataframe_schema'},
  filterCondition: {wire: 'filter_condition'},
  fullName: {wire: 'full_name'},
  transformationSql: {wire: 'transformation_sql'},
};

const streamSourceConfigFieldMaskSchema: FieldMaskSchema = {
  kafkaStreamConfig: {
    wire: 'kafka_stream_config',
    children: () => kafkaStreamConfigFieldMaskSchema,
  },
  kinesisStreamConfig: {
    wire: 'kinesis_stream_config',
    children: () => kinesisStreamConfigFieldMaskSchema,
  },
};

const streamingModeFieldMaskSchema: FieldMaskSchema = {
  freshnessTarget: {wire: 'freshness_target'},
  mode: {wire: 'mode'},
};

const subscriptionModeFieldMaskSchema: FieldMaskSchema = {
  assign: {wire: 'assign'},
  subscribe: {wire: 'subscribe'},
  subscribePattern: {wire: 'subscribe_pattern'},
};

const sumFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const tableTriggerFieldMaskSchema: FieldMaskSchema = {};

const timeWindowFieldMaskSchema: FieldMaskSchema = {
  rolling: {wire: 'rolling', children: () => rollingWindowFieldMaskSchema},
  sawtooth: {wire: 'sawtooth', children: () => sawtoothWindowFieldMaskSchema},
  sliding: {wire: 'sliding', children: () => slidingWindowFieldMaskSchema},
  startTime: {wire: 'start_time'},
  tumbling: {wire: 'tumbling', children: () => tumblingWindowFieldMaskSchema},
};

const timeseriesColumnFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

const tumblingWindowFieldMaskSchema: FieldMaskSchema = {
  delay: {wire: 'delay'},
  offset: {wire: 'offset'},
  windowDuration: {wire: 'window_duration'},
};

const varPopFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const varSampFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};
