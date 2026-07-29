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

/** Deprecated: Use the function-specific messages in AggregationFunction.function_type oneof instead. Kept for backwards compatibility. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Function_FunctionType = {
  FUNCTION_TYPE_UNSPECIFIED: 'FUNCTION_TYPE_UNSPECIFIED',
  AVG: 'AVG',
  COUNT: 'COUNT',
  SUM: 'SUM',
  MIN: 'MIN',
  MAX: 'MAX',
  FIRST: 'FIRST',
  LAST: 'LAST',
  APPROX_COUNT_DISTINCT: 'APPROX_COUNT_DISTINCT',
  APPROX_PERCENTILE: 'APPROX_PERCENTILE',
  STDDEV_POP: 'STDDEV_POP',
  STDDEV_SAMP: 'STDDEV_SAMP',
  VAR_POP: 'VAR_POP',
  VAR_SAMP: 'VAR_SAMP',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type Function_FunctionType =
  | (typeof Function_FunctionType)[keyof typeof Function_FunctionType]
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
    | {$case: 'firstDistinctN'; firstDistinctN: FirstDistinctNFunction}
    | {$case: 'lastDistinctN'; lastDistinctN: LastDistinctNFunction}
    | undefined;
  /** The time window over which the aggregation is computed. */
  timeWindow?: TimeWindow | undefined;
}

/** Computes the approximate count of distinct values. */
export interface ApproxCountDistinctFunction {
  /** The input column from which the approximate count of distinct values is computed. */
  input?: string | undefined;
  /** The maximum relative standard deviation allowed (default defined by Spark). */
  relativeSd?: number | undefined;
}

/** Computes the approximate percentile of values. */
export interface ApproxPercentileFunction {
  /** The input column from which the approximate percentile is computed. */
  input?: string | undefined;
  /** The percentile value to compute (between 0 and 1). */
  percentile?: number | undefined;
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
  input?: string | undefined;
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

export interface ColumnIdentifier {
  /**
   * String representation of the column name using dot-prefixed path notation. For nested fields, the leaf value is what will be present in materialized tables
   * and expected to match at query time. For example, the leaf node of value.trip_details.location_details.pickup_zip is pickup_zip.
   */
  variantExprPath?: string | undefined;
}

/** A ColumnSelection function, equivalent to the LAST() record of an entity over a lifetime ContinuousWindow */
export interface ColumnSelection {
  /** Column name from source to select as the feature value. */
  column?: string | undefined;
}

/** Deprecated: use RollingWindow with `delay` instead. */
export interface ContinuousWindow {
  /** The duration of the continuous window (must be positive). */
  windowDuration?: Temporal.Duration | undefined;
  /** The offset of the continuous window (must be non-positive). */
  offset?: Temporal.Duration | undefined;
}

/** Computes the count of values. */
export interface CountFunction {
  /**
   * The input column from which the count is computed. For Kafka sources, use dot-prefixed path
   * notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input?: string | undefined;
}

/** An aggregation function applied over a time window. */
export interface CreateAggregationFunction {
  /** The type of the aggregation function. */
  operation?:
    | {$case: 'avg'; avg: CreateAvgFunction}
    | {$case: 'countFunction'; countFunction: CreateCountFunction}
    | {$case: 'sum'; sum: CreateSumFunction}
    | {$case: 'min'; min: CreateMinFunction}
    | {$case: 'max'; max: CreateMaxFunction}
    | {$case: 'first'; first: CreateFirstFunction}
    | {$case: 'last'; last: CreateLastFunction}
    | {
        $case: 'approxCountDistinct';
        approxCountDistinct: CreateApproxCountDistinctFunction;
      }
    | {
        $case: 'approxPercentile';
        approxPercentile: CreateApproxPercentileFunction;
      }
    | {$case: 'stddevPop'; stddevPop: CreateStddevPopFunction}
    | {$case: 'stddevSamp'; stddevSamp: CreateStddevSampFunction}
    | {$case: 'varPop'; varPop: CreateVarPopFunction}
    | {$case: 'varSamp'; varSamp: CreateVarSampFunction}
    | {$case: 'firstN'; firstN: CreateFirstNFunction}
    | {$case: 'lastN'; lastN: CreateLastNFunction}
    | {$case: 'firstDistinctN'; firstDistinctN: CreateFirstDistinctNFunction}
    | {$case: 'lastDistinctN'; lastDistinctN: CreateLastDistinctNFunction}
    | undefined;
  /** The time window over which the aggregation is computed. */
  timeWindow?: CreateTimeWindow | undefined;
}

/** Computes the approximate count of distinct values. */
export interface CreateApproxCountDistinctFunction {
  /** The input column from which the approximate count of distinct values is computed. */
  input: string;
  /** The maximum relative standard deviation allowed (default defined by Spark). */
  relativeSd?: number | undefined;
}

/** Computes the approximate percentile of values. */
export interface CreateApproxPercentileFunction {
  /** The input column from which the approximate percentile is computed. */
  input: string;
  /** The percentile value to compute (between 0 and 1). */
  percentile: number;
  /** The accuracy parameter (higher is more accurate but slower). */
  accuracy?: bigint | undefined;
}

export interface CreateAuthConfig {
  authConfig?:
    | {
        $case: 'ucServiceCredentialName';
        /** Name of the Unity Catalog service credential. This value will be set under the option databricks.serviceCredential */
        ucServiceCredentialName: string;
      }
    | {
        $case: 'mtlsConfig';
        /** Mutual-TLS authentication. See MtlsConfig. */
        mtlsConfig: CreateMtlsConfig;
      }
    | undefined;
}

/** Computes the average of values. */
export interface CreateAvgFunction {
  /**
   * The input column from which the average is computed. For Kafka sources, use dot-prefixed path
   * notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input: string;
}

export interface CreateBackfillSource {
  backfillSource?:
    | {
        $case: 'deltaTableSource';
        /**
         * Deprecated: Use delta_table_name instead. Kept for backwards compatibility.
         * The Delta table source containing the historical data to backfill.
         * Only the delta table name is used for backfill, other fields are ignored.
         */
        deltaTableSource: CreateDeltaTableSource;
      }
    | {
        $case: 'deltaTableName';
        /** The full three-part name (catalog, schema, name) of the Delta table containing the historical data to backfill. */
        deltaTableName: string;
      }
    | undefined;
}

export interface CreateColumnIdentifier {
  /**
   * String representation of the column name using dot-prefixed path notation. For nested fields, the leaf value is what will be present in materialized tables
   * and expected to match at query time. For example, the leaf node of value.trip_details.location_details.pickup_zip is pickup_zip.
   */
  variantExprPath: string;
}

/** A ColumnSelection function, equivalent to the LAST() record of an entity over a lifetime ContinuousWindow */
export interface CreateColumnSelection {
  /** Column name from source to select as the feature value. */
  column: string;
}

/** Deprecated: use RollingWindow with `delay` instead. */
export interface CreateContinuousWindow {
  /** The duration of the continuous window (must be positive). */
  windowDuration: Temporal.Duration;
  /** The offset of the continuous window (must be non-positive). */
  offset?: Temporal.Duration | undefined;
}

/** Computes the count of values. */
export interface CreateCountFunction {
  /**
   * The input column from which the count is computed. For Kafka sources, use dot-prefixed path
   * notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input: string;
}

/** A cron-based schedule trigger for the materialization pipeline. */
export interface CreateCronSchedule {
  /** The cron expression defining the schedule (e.g., "0 0 * * *" for daily at midnight). */
  cronExpression?: string | undefined;
}

/** Specifies the data source backing a feature. Exactly one source type must be set. */
export interface CreateDataSource {
  dataSource?:
    | {
        $case: 'deltaTableSource';
        /** A Delta table data source. */
        deltaTableSource: CreateDeltaTableSource;
      }
    | {
        $case: 'kafkaSource';
        /** A Kafka stream data source. */
        kafkaSource: CreateKafkaSource;
      }
    | {
        $case: 'requestSource';
        /** A request-time data source. */
        requestSource: CreateRequestSource;
      }
    | {
        $case: 'streamSource';
        /** A Stream data source. */
        streamSource: CreateStreamSource;
      }
    | undefined;
}

export interface CreateDeltaTableSource {
  /** The full three-part (catalog, schema, table) name of the Delta table. */
  fullName: string;
  /**
   * Deprecated: Use Feature.entity instead. Kept for backwards compatibility.
   * The entity columns of the Delta table.
   */
  entityColumns?: string[] | undefined;
  /**
   * Deprecated: Use Feature.timeseries_column instead. Kept for backwards compatibility.
   * The timeseries column of the Delta table.
   */
  timeseriesColumn?: string | undefined;
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
export interface CreateDirectMtlsConfig {
  /** A comma-separated list of host:port pairs for the Kafka bootstrap servers. */
  bootstrapServers: string;
  /** Mutual-TLS authentication configuration. */
  mtlsConfig: CreateMtlsConfig;
}

/**
 * Schema definitions provided directly on the Stream, as opposed to referencing a schema registry.
 * In a future milestone, we will support schema registries through a UC Connection.
 */
export interface CreateDirectSchemas {
  /**
   * Schema for the message payload. For Kafka, this is the value schema.
   * Unless the platform supports another schema (e.g. keys for Kafka), this must be specified.
   */
  payloadSchema?: CreateSchemaConfig | undefined;
  /**
   * Schema for the message key. This is only used for Kafka streams.
   * For Kafka, at least one of payload_schema or key_schema must be specified.
   */
  keySchema?: CreateSchemaConfig | undefined;
}

export interface CreateEntityColumn {
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

export interface CreateFeature {
  /**
   * The full three-part name (catalog, schema, name) of the feature. This is the
   * feature's resource identifier; the catalog_name, schema_name, and name fields
   * below are OUTPUT_ONLY decomposed views of this value.
   */
  fullName: string;
  /** The data source of the feature. */
  source: CreateDataSource;
  /**
   * Deprecated: Use AggregationFunction.inputs instead. Kept for backwards compatibility.
   * The input columns from which the feature is computed.
   */
  inputs?: string[] | undefined;
  /** The function by which the feature is computed. */
  function: CreateFunction;
  /**
   * Deprecated: Use Function.aggregation_function.time_window instead. Kept for backwards compatibility.
   * The time window in which the feature is computed.
   */
  timeWindow?: CreateTimeWindow | undefined;
  /** The description of the feature. */
  description?: string | undefined;
  /**
   * Deprecated: Use DeltaTableSource.filter_condition or KafkaSource.filter_condition instead. Kept for backwards compatibility.
   * The filter condition applied to the source data before aggregation.
   */
  filterCondition?: string | undefined;
  /**
   * Lineage context information for this feature.
   * WARNING: This field is primarily intended for internal use by <Databricks> systems and
   * is automatically populated when features are created through <Databricks> notebooks or jobs.
   * Users should not manually set this field as incorrect values may lead to inaccurate lineage tracking or unexpected behavior.
   * This field will be set by feature-engineering client and should be left unset by SDK and terraform users.
   */
  lineageContext?: CreateLineageContext | undefined;
  /** The entity columns for the feature, used as aggregation keys and for query-time lookup. */
  entities?: CreateEntityColumn[] | undefined;
  /** Column recording time, used for point-in-time joins, backfills, and aggregations. */
  timeseriesColumn?: CreateTimeseriesColumn | undefined;
}

export interface CreateFeatureRequest {
  /** Feature to create. */
  feature: CreateFeature;
}

/**
 * A single field definition within a FlatSchema, specifying the field name and its scalar data type.
 * Does not support nested or complex types (arrays, maps, structs).
 */
export interface CreateFieldDefinition {
  /** The name of the field. */
  name: string;
  /** The scalar data type of the field. */
  dataType: ScalarDataType;
}

/** Returns the first N distinct values, ordered by the feature's timeseries column. */
export interface CreateFirstDistinctNFunction {
  /** The input column from which the first N distinct values are returned. */
  input: string;
  /** The number of distinct values to return. */
  n: bigint;
}

/** Returns the first value. */
export interface CreateFirstFunction {
  /** The input column from which the first value is returned. */
  input: string;
}

/** Returns the first N values, ordered by the feature's timeseries column. */
export interface CreateFirstNFunction {
  /** The input column from which the first N values are returned. */
  input: string;
  /** The number of values to return. */
  n: bigint;
}

/**
 * A flat (non-nested) schema for request-time fields, defined as an ordered list of field definitions.
 * This schema only supports scalar types.
 */
export interface CreateFlatSchema {
  /** The list of fields in this schema. */
  fields: CreateFieldDefinition[];
}

export interface CreateFunction {
  /**
   * Deprecated: Use the function oneof with AggregationFunction instead. Kept for backwards compatibility.
   * The type of the function.
   */
  functionType?: Function_FunctionType | undefined;
  /**
   * Deprecated: Use the function oneof with AggregationFunction instead. Kept for backwards compatibility.
   * Extra parameters for parameterized functions.
   */
  extraParameters?: Function_CreateExtraParameter[] | undefined;
  function?:
    | {
        $case: 'aggregationFunction';
        /** An aggregation function applied over a time window. */
        aggregationFunction: CreateAggregationFunction;
      }
    | {
        $case: 'columnSelection';
        /** Selects the latest value of a single column in a data source */
        columnSelection: CreateColumnSelection;
      }
    | undefined;
}

/**
 * Configuration for the <Databricks>-managed ingestion pipeline.
 * Groups the ingestion destination (required) and optional backfill source.
 */
export interface CreateIngestionConfig {
  /**
   * Destination for the <Databricks>-managed Delta table that holds an offline copy of the streaming data for querying and training.
   * This table contains both 1) forward-filled data from the Stream and 2) backfilled data from the BackfillSource (if provided).
   * This table is created and managed by <Databricks> and is deleted when the Stream is deleted.
   */
  ingestionDestination: CreateIngestionDestination;
  /**
   * A user-provided source for backfilling data. Historical data is used when creating a training set from streaming features linked to this Stream.
   * The backfill data stored in this location will be copied into the ingestion table for offline querying and training.
   * The schema for this source must match exactly that of the key and payload schemas specified for this Stream.
   */
  backfillSource?: CreateBackfillSource | undefined;
  /**
   * Column paths used to identify duplicate rows during ingestion; only one row per
   * distinct combination of these values is kept. Use dot notation for nested fields
   * (e.g. `value.user_id`). Empty list means every column is compared.
   */
  deduplicationColumns?: string[] | undefined;
}

/** Destination for the <Databricks>-managed Delta table that holds an offline copy of the streaming data for querying and training. */
export interface CreateIngestionDestination {
  ingestionDestination?:
    | {
        $case: 'deltaTableName';
        /** The full three-part name (catalog, schema, name) of the Delta table to be created for ingestion. */
        deltaTableName: string;
      }
    | undefined;
}

export interface CreateJobContext {
  /** The job ID where this API invoked. */
  jobId?: bigint | undefined;
  /** The job run ID where this API was invoked. */
  jobRunId?: bigint | undefined;
}

export interface CreateKafkaConfig {
  /**
   * Name that uniquely identifies this Kafka config within the metastore. This will be the identifier used from the Feature object to reference these configs for a feature.
   * Can be distinct from topic name.
   */
  name: string;
  /** A comma-separated list of host/port pairs pointing to Kafka cluster. */
  bootstrapServers: string;
  /** Options to configure which Kafka topics to pull data from. */
  subscriptionMode: CreateSubscriptionMode;
  /** Authentication configuration for connection to topics. */
  authConfig: CreateAuthConfig;
  /** Schema configuration for extracting message keys from topics. At least one of key_schema and value_schema must be provided. */
  keySchema?: CreateSchemaConfig | undefined;
  /** Schema configuration for extracting message values from topics. At least one of key_schema and value_schema must be provided. */
  valueSchema?: CreateSchemaConfig | undefined;
  /** Catch-all for miscellaneous options. Keys should be source options or Kafka consumer options (kafka.*) */
  extraOptions?: Record<string, string> | undefined;
  /**
   * A user-provided and managed source for backfilling data. Historical data is used when creating a training set from streaming features linked to this Kafka config.
   * In the future, a separate table will be maintained by <Databricks> for forward filling data.
   * The schema for this source must match exactly that of the key and value schemas specified for this Kafka config.
   */
  backfillSource?: CreateBackfillSource | undefined;
  /**
   * Configuration for ingesting Kafka data into a <Databricks>-managed
   * Delta table.
   */
  ingestionConfig?: CreateIngestionConfig | undefined;
}

export interface CreateKafkaConfigRequest {
  kafkaConfig: CreateKafkaConfig;
}

export interface CreateKafkaSource {
  /** Name of the Kafka source, used to identify it. This is used to look up the corresponding KafkaConfig object. Can be distinct from topic name. */
  name: string;
  /**
   * Deprecated: Use Feature.entity instead. Kept for backwards compatibility.
   * The entity column identifiers of the Kafka source.
   */
  entityColumnIdentifiers?: CreateColumnIdentifier[] | undefined;
  /**
   * Deprecated: Use Feature.timeseries_column instead. Kept for backwards compatibility.
   * The timeseries column identifier of the Kafka source.
   */
  timeseriesColumnIdentifier?: CreateColumnIdentifier | undefined;
  /** The filter condition applied to the source data before aggregation. */
  filterCondition?: string | undefined;
}

/** Kafka-specific configuration for a Stream. */
export interface CreateKafkaStreamConfig {
  /** Options to configure which Kafka topics to pull data from. */
  subscriptionMode: CreateKafkaSubscriptionMode;
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
export interface CreateKafkaSubscriptionMode {
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

/** Returns the last N distinct values, ordered by the feature's timeseries column. */
export interface CreateLastDistinctNFunction {
  /** The input column from which the last N distinct values are returned. */
  input: string;
  /** The number of distinct values to return. */
  n: bigint;
}

/** Returns the last value. */
export interface CreateLastFunction {
  /** The input column from which the last value is returned. */
  input: string;
}

/** Returns the last N values, ordered by the feature's timeseries column. */
export interface CreateLastNFunction {
  /** The input column from which the last N values are returned. */
  input: string;
  /** The number of values to return. */
  n: bigint;
}

/** Lineage context information for tracking where an API was invoked. This will allow us to track lineage, which currently uses caller entity information for use across the Lineage Client and Observability in Lumberjack. */
export interface CreateLineageContext {
  /** The notebook ID where this API was invoked. */
  notebookId?: bigint | undefined;
  /** Job context information including job ID and run ID. */
  jobContext?: CreateJobContext | undefined;
}

/** A materialized feature represents a feature that is continuously computed and stored. */
export interface CreateMaterializedFeature {
  /** Server-assigned unique identifier for the materialized feature. */
  materializedFeatureId?: string | undefined;
  /** The full name of the feature in Unity Catalog. */
  featureName: string;
  destination?:
    | {
        $case: 'offlineStoreConfig';
        /** Destination for writing feature values to an offline Delta table. */
        offlineStoreConfig: CreateOfflineStoreConfig;
      }
    | {
        $case: 'onlineStoreConfig';
        /** Destination for writing feature values to an online Lakebase table. */
        onlineStoreConfig: CreateOnlineStoreConfig;
      }
    | undefined;
  /**
   * The schedule state of the materialization pipeline.
   * Hidden from GraphQL: being deprecated, so not exposed to Catalog Explorer.
   */
  pipelineScheduleState?: MaterializedFeature_PipelineScheduleState | undefined;
  /**
   * The quartz cron expression that defines the schedule of the materialization pipeline. The schedule is evaluated in the UTC timezone.
   * Hidden from GraphQL: superseded by the `trigger` oneof (cron_schedule_trigger), so not exposed to Catalog Explorer.
   */
  cronSchedule?: string | undefined;
  /** The trigger configuration for the materialization pipeline. */
  trigger?:
    | {
        $case: 'cronScheduleTrigger';
        /** A cron-based schedule trigger for the materialization pipeline. */
        cronScheduleTrigger: CreateCronSchedule;
      }
    | {
        $case: 'tableTrigger';
        /** A trigger that fires when the upstream source table changes. */
        tableTrigger: CreateTableTrigger;
      }
    | {
        $case: 'streamingMode';
        /**
         * The Structured Streaming trigger mode used for materialization. Real-time mode (RTM) targets
         * sub-second latency for operational workloads; micro-batch mode (MBM) favors cost efficiency
         * for ETL and analytics workloads.
         */
        streamingMode: CreateStreamingMode;
      }
    | undefined;
}

export interface CreateMaterializedFeatureRequest {
  /** The materialized feature to create. */
  materializedFeature: CreateMaterializedFeature;
}

/** Computes the maximum value. */
export interface CreateMaxFunction {
  /** The input column from which the maximum is computed. */
  input: string;
}

/** Computes the minimum value. */
export interface CreateMinFunction {
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
export interface CreateMtlsConfig {
  /**
   * Unity Catalog volume path to the JKS keystore file containing the client certificate
   * and private key. e.g. "/Volumes/<catalog>/<schema>/<volume>/client.jks". The
   * materialization compute must have read permission on this volume.
   */
  keystoreLocation: string;
  /** Secret-scope reference for the JKS keystore password. */
  keystorePasswordRef: CreateSecretScopeReference;
  /**
   * Secret-scope reference for the private key password. Often the same value as the
   * keystore password (keytool's default), but provided as a separate field because
   * Apache Kafka requires it as a distinct option (kafka.ssl.key.password).
   */
  keyPasswordRef: CreateSecretScopeReference;
  /**
   * Unity Catalog volume path to the JKS truststore file containing the CA certificate(s)
   * trusted to verify the Kafka broker's server certificate.
   * e.g. "/Volumes/<catalog>/<schema>/<volume>/truststore.jks".
   */
  truststoreLocation: string;
  /** Secret-scope reference for the JKS truststore password. */
  truststorePasswordRef: CreateSecretScopeReference;
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
export interface CreateOfflineStoreConfig {
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
export interface CreateOnlineStoreConfig {
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

/** A request-time data source whose value is provided at inference time: offline batch scoring or online serving endpoint */
export interface CreateRequestSource {
  /** The schema describing the request-time fields. Currently only flat schemas are supported. */
  schema?:
    | {
        $case: 'flatSchema';
        /** A flat schema with scalar-typed fields only. */
        flatSchema: CreateFlatSchema;
      }
    | undefined;
}

/**
 * A rolling time window with an optional delay. This is the SQL-spec-aligned
 * replacement for ContinuousWindow: `delay` is the non-negative counterpart
 * of the legacy non-positive `ContinuousWindow.offset`.
 */
export interface CreateRollingWindow {
  /** The duration of the rolling window (must be positive). */
  windowDuration: Temporal.Duration;
  /**
   * The delay applied to the end of the rolling window (must be non-negative).
   * For example, delay=1d shifts the window end 1 day before the evaluation time.
   */
  delay?: Temporal.Duration | undefined;
}

export interface CreateSchemaConfig {
  schema?:
    | {
        $case: 'jsonSchema';
        /** Schema of the JSON object in standard IETF JSON schema format (https://json-schema.org/). */
        jsonSchema: string;
      }
    | undefined;
}

/**
 * Reference to an entry in a <Databricks> secret scope. The referenced value is fetched
 * on the Spark cluster at materialization time via dbutils.secrets.get(scope, key).
 */
export interface CreateSecretScopeReference {
  /** The <Databricks> secret scope name. */
  scope: string;
  /** The key within the scope. */
  key: string;
}

export interface CreateSlidingWindow {
  /** The duration of the sliding window. */
  windowDuration: Temporal.Duration;
  /** The slide duration (interval by which windows advance, must be positive and less than duration). */
  slideDuration: Temporal.Duration;
}

/** Computes the population standard deviation. */
export interface CreateStddevPopFunction {
  /**
   * The input column from which the population standard deviation is computed. For Kafka sources,
   * use dot-prefixed path notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input: string;
}

/** Computes the sample standard deviation. */
export interface CreateStddevSampFunction {
  /** The input column from which the sample standard deviation is computed. */
  input: string;
}

/**
 * A Stream is a governed UC entity representing an external streaming data source.
 * The source_config oneof determines the streaming platform source (e.g. Kafka, Kinesis, etc.).
 */
export interface CreateStream {
  /** Full three-part (catalog.schema.stream) name of the stream. */
  name: string;
  /** User-provided description. */
  description?: string | undefined;
  /** Source-specific configuration. Determines the streaming platform source. */
  sourceConfig: CreateStreamSourceConfig;
  /** Specifies how to connect and authenticate to the stream platform. */
  connectionConfig: CreateStreamConnectionConfig;
  /**
   * Schema definitions for the stream. Currently only direct schemas are supported.
   * In a future milestone, we will support schema registries through a UC Connection.
   */
  schemaConfig: CreateStreamSchemaConfig;
  /** Configuration for streaming data ingestion: the managed table storing an offline copy of forward fill data and optional historical backfill. */
  ingestionConfig: CreateIngestionConfig;
}

/** Specifies how to connect and authenticate to the stream platform. */
export interface CreateStreamConnectionConfig {
  connectionConfig?:
    | {
        $case: 'ucConnectionName';
        /**
         * Name of an existing UC Connection for stream platform access.
         * Must be the correct type for the streaming platform (e.g. a Kafka Connection for a Kafka Stream).
         */
        ucConnectionName: string;
      }
    | {
        $case: 'directMtlsConfig';
        /**
         * Direct mTLS configuration for stream platform access. This is only used in the short term until UC Kafka Connections support mTLS .
         * Once UC Kafka Connections support mTLS, this will be deprecated.
         */
        directMtlsConfig: CreateDirectMtlsConfig;
      }
    | undefined;
}

/** Create a Stream, a governed UC entity representing an external streaming data source. */
export interface CreateStreamRequest {
  /** The Stream to create. */
  stream: CreateStream;
}

/**
 * Schema definitions for the stream. Currently only direct schemas are supported.
 * In a future milestone, we will support schema registries through a UC Connection.
 */
export interface CreateStreamSchemaConfig {
  schemaConfig?:
    | {
        $case: 'directSchemas';
        /** Schema definitions provided directly on the Stream. */
        directSchemas: CreateDirectSchemas;
      }
    | undefined;
}

/** A Stream entity used as a data source for a feature. */
export interface CreateStreamSource {
  /** Three-part full name of the Stream (catalog.schema.stream). */
  fullName: string;
  /** The filter condition applied to the source data before aggregation. */
  filterCondition?: string | undefined;
}

/** Source-specific configuration. Determines the streaming platform source. */
export interface CreateStreamSourceConfig {
  sourceConfig?:
    | {
        $case: 'kafkaStreamConfig';
        /** Configuration for Apache Kafka streams. */
        kafkaStreamConfig: CreateKafkaStreamConfig;
      }
    | undefined;
}

/** The streaming mode configuration for a streaming materialization pipeline. */
export interface CreateStreamingMode {
  /** The type of streaming mode used by the materialization pipeline. */
  mode?: StreamingMode_StreamingModeType | undefined;
}

/** Deprecated: Use KafkaSubscriptionMode instead. */
export interface CreateSubscriptionMode {
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
export interface CreateSumFunction {
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
export interface CreateTableTrigger {}

export interface CreateTimeWindow {
  windowType?:
    | {$case: 'continuous'; continuous: CreateContinuousWindow}
    | {$case: 'tumbling'; tumbling: CreateTumblingWindow}
    | {$case: 'sliding'; sliding: CreateSlidingWindow}
    | {$case: 'rolling'; rolling: CreateRollingWindow}
    | undefined;
}

export interface CreateTimeseriesColumn {
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

export interface CreateTumblingWindow {
  /** The duration of each tumbling window (non-overlapping, fixed-duration windows). */
  windowDuration: Temporal.Duration;
}

/** Computes the population variance. */
export interface CreateVarPopFunction {
  /** The input column from which the population variance is computed. */
  input: string;
}

/** Computes the sample variance. */
export interface CreateVarSampFunction {
  /** The input column from which the sample variance is computed. */
  input: string;
}

/** A cron-based schedule trigger for the materialization pipeline. */
export interface CronSchedule {
  /** The cron expression defining the schedule (e.g., "0 0 * * *" for daily at midnight). */
  cronExpression?: string | undefined;
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
}

export interface DeleteFeatureRequest {
  /** Name of the feature to delete. */
  fullName?: string | undefined;
}

export interface DeleteKafkaConfigRequest {
  /** Name of the Kafka config to delete. */
  name?: string | undefined;
}

export interface DeleteMaterializedFeatureRequest {
  /** The ID of the materialized feature to delete. */
  materializedFeatureId?: string | undefined;
}

/** Delete a Stream by its full three-part name (catalog.schema.stream). */
export interface DeleteStreamRequest {
  /** Full three-part name (catalog.schema.stream) of the Stream to delete. */
  name?: string | undefined;
}

export interface DeltaTableSource {
  /** The full three-part (catalog, schema, table) name of the Delta table. */
  fullName?: string | undefined;
  /**
   * Deprecated: Use Feature.entity instead. Kept for backwards compatibility.
   * The entity columns of the Delta table.
   */
  entityColumns?: string[] | undefined;
  /**
   * Deprecated: Use Feature.timeseries_column instead. Kept for backwards compatibility.
   * The timeseries column of the Delta table.
   */
  timeseriesColumn?: string | undefined;
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
  bootstrapServers?: string | undefined;
  /** Mutual-TLS authentication configuration. */
  mtlsConfig?: MtlsConfig | undefined;
}

/**
 * Schema definitions provided directly on the Stream, as opposed to referencing a schema registry.
 * In a future milestone, we will support schema registries through a UC Connection.
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
  name?: string | undefined;
}

export interface Feature {
  /**
   * The full three-part name (catalog, schema, name) of the feature. This is the
   * feature's resource identifier; the catalog_name, schema_name, and name fields
   * below are OUTPUT_ONLY decomposed views of this value.
   */
  fullName?: string | undefined;
  /** The data source of the feature. */
  source?: DataSource | undefined;
  /**
   * Deprecated: Use AggregationFunction.inputs instead. Kept for backwards compatibility.
   * The input columns from which the feature is computed.
   */
  inputs?: string[] | undefined;
  /** The function by which the feature is computed. */
  function?: Function | undefined;
  /**
   * Deprecated: Use Function.aggregation_function.time_window instead. Kept for backwards compatibility.
   * The time window in which the feature is computed.
   */
  timeWindow?: TimeWindow | undefined;
  /** The description of the feature. */
  description?: string | undefined;
  /**
   * Deprecated: Use DeltaTableSource.filter_condition or KafkaSource.filter_condition instead. Kept for backwards compatibility.
   * The filter condition applied to the source data before aggregation.
   */
  filterCondition?: string | undefined;
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
  name?: string | undefined;
  /** The scalar data type of the field. */
  dataType?: ScalarDataType | undefined;
}

/** Returns the first N distinct values, ordered by the feature's timeseries column. */
export interface FirstDistinctNFunction {
  /** The input column from which the first N distinct values are returned. */
  input?: string | undefined;
  /** The number of distinct values to return. */
  n?: bigint | undefined;
}

/** Returns the first value. */
export interface FirstFunction {
  /** The input column from which the first value is returned. */
  input?: string | undefined;
}

/** Returns the first N values, ordered by the feature's timeseries column. */
export interface FirstNFunction {
  /** The input column from which the first N values are returned. */
  input?: string | undefined;
  /** The number of values to return. */
  n?: bigint | undefined;
}

/**
 * A flat (non-nested) schema for request-time fields, defined as an ordered list of field definitions.
 * This schema only supports scalar types.
 */
export interface FlatSchema {
  /** The list of fields in this schema. */
  fields?: FieldDefinition[] | undefined;
}

export interface Function {
  /**
   * Deprecated: Use the function oneof with AggregationFunction instead. Kept for backwards compatibility.
   * The type of the function.
   */
  functionType?: Function_FunctionType | undefined;
  /**
   * Deprecated: Use the function oneof with AggregationFunction instead. Kept for backwards compatibility.
   * Extra parameters for parameterized functions.
   */
  extraParameters?: Function_ExtraParameter[] | undefined;
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
    | undefined;
}

/**
 * Deprecated: Use typed fields on function-specific messages (e.g. ApproxPercentileFunction.percentile)
 * or AggregationFunction.ExtraParameter instead. Kept for backwards compatibility.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Function_CreateExtraParameter {
  /** The name of the parameter. */
  key: string;
  /** The value of the parameter. */
  value: string;
}

/**
 * Deprecated: Use typed fields on function-specific messages (e.g. ApproxPercentileFunction.percentile)
 * or AggregationFunction.ExtraParameter instead. Kept for backwards compatibility.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Function_ExtraParameter {
  /** The name of the parameter. */
  key?: string | undefined;
  /** The value of the parameter. */
  value?: string | undefined;
}

/**
 * Deprecated: Use typed fields on function-specific messages (e.g. ApproxPercentileFunction.percentile)
 * or AggregationFunction.ExtraParameter instead. Kept for backwards compatibility.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Function_UpdateExtraParameter {
  /** The name of the parameter. */
  key?: string | undefined;
  /** The value of the parameter. */
  value?: string | undefined;
}

export interface GetFeatureRequest {
  /** Name of the feature to get. */
  fullName?: string | undefined;
}

export interface GetKafkaConfigRequest {
  /** Name of the Kafka config to get. */
  name?: string | undefined;
}

export interface GetMaterializedFeatureRequest {
  /** The ID of the materialized feature. */
  materializedFeatureId?: string | undefined;
}

/** Get a Stream by its full three-part name (catalog.schema.stream). */
export interface GetStreamRequest {
  /** Full three-part name (catalog.schema.stream) of the Stream to get. */
  name?: string | undefined;
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
  ingestionDestination?: IngestionDestination | undefined;
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
  name?: string | undefined;
  /** A comma-separated list of host/port pairs pointing to Kafka cluster. */
  bootstrapServers?: string | undefined;
  /** Options to configure which Kafka topics to pull data from. */
  subscriptionMode?: SubscriptionMode | undefined;
  /** Authentication configuration for connection to topics. */
  authConfig?: AuthConfig | undefined;
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
  name?: string | undefined;
  /**
   * Deprecated: Use Feature.entity instead. Kept for backwards compatibility.
   * The entity column identifiers of the Kafka source.
   */
  entityColumnIdentifiers?: ColumnIdentifier[] | undefined;
  /**
   * Deprecated: Use Feature.timeseries_column instead. Kept for backwards compatibility.
   * The timeseries column identifier of the Kafka source.
   */
  timeseriesColumnIdentifier?: ColumnIdentifier | undefined;
  /** The filter condition applied to the source data before aggregation. */
  filterCondition?: string | undefined;
}

/** Kafka-specific configuration for a Stream. */
export interface KafkaStreamConfig {
  /** Options to configure which Kafka topics to pull data from. */
  subscriptionMode?: KafkaSubscriptionMode | undefined;
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

/** Returns the last N distinct values, ordered by the feature's timeseries column. */
export interface LastDistinctNFunction {
  /** The input column from which the last N distinct values are returned. */
  input?: string | undefined;
  /** The number of distinct values to return. */
  n?: bigint | undefined;
}

/** Returns the last value. */
export interface LastFunction {
  /** The input column from which the last value is returned. */
  input?: string | undefined;
}

/** Returns the last N values, ordered by the feature's timeseries column. */
export interface LastNFunction {
  /** The input column from which the last N values are returned. */
  input?: string | undefined;
  /** The number of values to return. */
  n?: bigint | undefined;
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
  catalogName?: string | undefined;
  /** Name of parent schema relative to its parent catalog. */
  schemaName?: string | undefined;
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
  kafkaConfigs?: KafkaConfig[] | undefined;
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
  featureName?: string | undefined;
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
  /**
   * The quartz cron expression that defines the schedule of the materialization pipeline. The schedule is evaluated in the UTC timezone.
   * Hidden from GraphQL: superseded by the `trigger` oneof (cron_schedule_trigger), so not exposed to Catalog Explorer.
   */
  cronSchedule?: string | undefined;
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
  input?: string | undefined;
}

/** Computes the minimum value. */
export interface MinFunction {
  /** The input column from which the minimum is computed. */
  input?: string | undefined;
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
  keystoreLocation?: string | undefined;
  /** Secret-scope reference for the JKS keystore password. */
  keystorePasswordRef?: SecretScopeReference | undefined;
  /**
   * Secret-scope reference for the private key password. Often the same value as the
   * keystore password (keytool's default), but provided as a separate field because
   * Apache Kafka requires it as a distinct option (kafka.ssl.key.password).
   */
  keyPasswordRef?: SecretScopeReference | undefined;
  /**
   * Unity Catalog volume path to the JKS truststore file containing the CA certificate(s)
   * trusted to verify the Kafka broker's server certificate.
   * e.g. "/Volumes/<catalog>/<schema>/<volume>/truststore.jks".
   */
  truststoreLocation?: string | undefined;
  /** Secret-scope reference for the JKS truststore password. */
  truststorePasswordRef?: SecretScopeReference | undefined;
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
  catalogName?: string | undefined;
  /** The Unity Catalog schema name. */
  schemaName?: string | undefined;
  /**
   * Prefix for Unity Catalog table name.
   * The materialized feature will be stored in a table with this prefix and a generated postfix.
   */
  tableNamePrefix?: string | undefined;
}

/** Configuration for online store destination. */
export interface OnlineStoreConfig {
  /**
   * The Unity Catalog catalog name. This name is also used as the Lakebase logical database name.
   * Quoting is handled by the backend where needed, do not pre-quote it.
   */
  catalogName?: string | undefined;
  /**
   * The Unity Catalog schema name. This name is also used as the Lakebase schema name under the database.
   * Quoting is handled by the backend where needed, do not pre-quote it.
   */
  schemaName?: string | undefined;
  /**
   * Prefix for Unity Catalog table name.
   * The materialized feature will be stored in a Lakebase table with this prefix and a generated postfix.
   */
  tableNamePrefix?: string | undefined;
  /** The name of the target online store. */
  onlineStoreName?: string | undefined;
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

/**
 * A rolling time window with an optional delay. This is the SQL-spec-aligned
 * replacement for ContinuousWindow: `delay` is the non-negative counterpart
 * of the legacy non-positive `ContinuousWindow.offset`.
 */
export interface RollingWindow {
  /** The duration of the rolling window (must be positive). */
  windowDuration?: Temporal.Duration | undefined;
  /**
   * The delay applied to the end of the rolling window (must be non-negative).
   * For example, delay=1d shifts the window end 1 day before the evaluation time.
   */
  delay?: Temporal.Duration | undefined;
}

export interface SchemaConfig {
  schema?:
    | {
        $case: 'jsonSchema';
        /** Schema of the JSON object in standard IETF JSON schema format (https://json-schema.org/). */
        jsonSchema: string;
      }
    | undefined;
}

/**
 * Reference to an entry in a <Databricks> secret scope. The referenced value is fetched
 * on the Spark cluster at materialization time via dbutils.secrets.get(scope, key).
 */
export interface SecretScopeReference {
  /** The <Databricks> secret scope name. */
  scope?: string | undefined;
  /** The key within the scope. */
  key?: string | undefined;
}

export interface SlidingWindow {
  /** The duration of the sliding window. */
  windowDuration?: Temporal.Duration | undefined;
  /** The slide duration (interval by which windows advance, must be positive and less than duration). */
  slideDuration?: Temporal.Duration | undefined;
}

/** Computes the population standard deviation. */
export interface StddevPopFunction {
  /**
   * The input column from which the population standard deviation is computed. For Kafka sources,
   * use dot-prefixed path notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input?: string | undefined;
}

/** Computes the sample standard deviation. */
export interface StddevSampFunction {
  /** The input column from which the sample standard deviation is computed. */
  input?: string | undefined;
}

/**
 * A Stream is a governed UC entity representing an external streaming data source.
 * The source_config oneof determines the streaming platform source (e.g. Kafka, Kinesis, etc.).
 */
export interface Stream {
  /** Full three-part (catalog.schema.stream) name of the stream. */
  name?: string | undefined;
  /** User-provided description. */
  description?: string | undefined;
  /** Source-specific configuration. Determines the streaming platform source. */
  sourceConfig?: StreamSourceConfig | undefined;
  /** Specifies how to connect and authenticate to the stream platform. */
  connectionConfig?: StreamConnectionConfig | undefined;
  /**
   * Schema definitions for the stream. Currently only direct schemas are supported.
   * In a future milestone, we will support schema registries through a UC Connection.
   */
  schemaConfig?: StreamSchemaConfig | undefined;
  /** Configuration for streaming data ingestion: the managed table storing an offline copy of forward fill data and optional historical backfill. */
  ingestionConfig?: IngestionConfig | undefined;
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

/** Specifies how to connect and authenticate to the stream platform. */
export interface StreamConnectionConfig {
  connectionConfig?:
    | {
        $case: 'ucConnectionName';
        /**
         * Name of an existing UC Connection for stream platform access.
         * Must be the correct type for the streaming platform (e.g. a Kafka Connection for a Kafka Stream).
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

/**
 * Schema definitions for the stream. Currently only direct schemas are supported.
 * In a future milestone, we will support schema registries through a UC Connection.
 */
export interface StreamSchemaConfig {
  schemaConfig?:
    | {
        $case: 'directSchemas';
        /** Schema definitions provided directly on the Stream. */
        directSchemas: DirectSchemas;
      }
    | undefined;
}

/** A Stream entity used as a data source for a feature. */
export interface StreamSource {
  /** Three-part full name of the Stream (catalog.schema.stream). */
  fullName?: string | undefined;
  /** The filter condition applied to the source data before aggregation. */
  filterCondition?: string | undefined;
}

/** Source-specific configuration. Determines the streaming platform source. */
export interface StreamSourceConfig {
  sourceConfig?:
    | {
        $case: 'kafkaStreamConfig';
        /** Configuration for Apache Kafka streams. */
        kafkaStreamConfig: KafkaStreamConfig;
      }
    | undefined;
}

/** The streaming mode configuration for a streaming materialization pipeline. */
export interface StreamingMode {
  /** The type of streaming mode used by the materialization pipeline. */
  mode?: StreamingMode_StreamingModeType | undefined;
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
  input?: string | undefined;
}

/** A trigger that fires when the upstream source table changes. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TableTrigger {}

export interface TimeWindow {
  windowType?:
    | {$case: 'continuous'; continuous: ContinuousWindow}
    | {$case: 'tumbling'; tumbling: TumblingWindow}
    | {$case: 'sliding'; sliding: SlidingWindow}
    | {$case: 'rolling'; rolling: RollingWindow}
    | undefined;
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
  name?: string | undefined;
}

export interface TumblingWindow {
  /** The duration of each tumbling window (non-overlapping, fixed-duration windows). */
  windowDuration?: Temporal.Duration | undefined;
}

/** An aggregation function applied over a time window. */
export interface UpdateAggregationFunction {
  /** The type of the aggregation function. */
  operation?:
    | {$case: 'avg'; avg: UpdateAvgFunction}
    | {$case: 'countFunction'; countFunction: UpdateCountFunction}
    | {$case: 'sum'; sum: UpdateSumFunction}
    | {$case: 'min'; min: UpdateMinFunction}
    | {$case: 'max'; max: UpdateMaxFunction}
    | {$case: 'first'; first: UpdateFirstFunction}
    | {$case: 'last'; last: UpdateLastFunction}
    | {
        $case: 'approxCountDistinct';
        approxCountDistinct: UpdateApproxCountDistinctFunction;
      }
    | {
        $case: 'approxPercentile';
        approxPercentile: UpdateApproxPercentileFunction;
      }
    | {$case: 'stddevPop'; stddevPop: UpdateStddevPopFunction}
    | {$case: 'stddevSamp'; stddevSamp: UpdateStddevSampFunction}
    | {$case: 'varPop'; varPop: UpdateVarPopFunction}
    | {$case: 'varSamp'; varSamp: UpdateVarSampFunction}
    | {$case: 'firstN'; firstN: UpdateFirstNFunction}
    | {$case: 'lastN'; lastN: UpdateLastNFunction}
    | {$case: 'firstDistinctN'; firstDistinctN: UpdateFirstDistinctNFunction}
    | {$case: 'lastDistinctN'; lastDistinctN: UpdateLastDistinctNFunction}
    | undefined;
  /** The time window over which the aggregation is computed. */
  timeWindow?: UpdateTimeWindow | undefined;
}

/** Computes the approximate count of distinct values. */
export interface UpdateApproxCountDistinctFunction {
  /** The input column from which the approximate count of distinct values is computed. */
  input?: string | undefined;
  /** The maximum relative standard deviation allowed (default defined by Spark). */
  relativeSd?: number | undefined;
}

/** Computes the approximate percentile of values. */
export interface UpdateApproxPercentileFunction {
  /** The input column from which the approximate percentile is computed. */
  input?: string | undefined;
  /** The percentile value to compute (between 0 and 1). */
  percentile?: number | undefined;
  /** The accuracy parameter (higher is more accurate but slower). */
  accuracy?: bigint | undefined;
}

export interface UpdateAuthConfig {
  authConfig?:
    | {
        $case: 'ucServiceCredentialName';
        /** Name of the Unity Catalog service credential. This value will be set under the option databricks.serviceCredential */
        ucServiceCredentialName: string;
      }
    | {
        $case: 'mtlsConfig';
        /** Mutual-TLS authentication. See MtlsConfig. */
        mtlsConfig: UpdateMtlsConfig;
      }
    | undefined;
}

/** Computes the average of values. */
export interface UpdateAvgFunction {
  /**
   * The input column from which the average is computed. For Kafka sources, use dot-prefixed path
   * notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input?: string | undefined;
}

export interface UpdateBackfillSource {
  backfillSource?:
    | {
        $case: 'deltaTableSource';
        /**
         * Deprecated: Use delta_table_name instead. Kept for backwards compatibility.
         * The Delta table source containing the historical data to backfill.
         * Only the delta table name is used for backfill, other fields are ignored.
         */
        deltaTableSource: UpdateDeltaTableSource;
      }
    | {
        $case: 'deltaTableName';
        /** The full three-part name (catalog, schema, name) of the Delta table containing the historical data to backfill. */
        deltaTableName: string;
      }
    | undefined;
}

export interface UpdateColumnIdentifier {
  /**
   * String representation of the column name using dot-prefixed path notation. For nested fields, the leaf value is what will be present in materialized tables
   * and expected to match at query time. For example, the leaf node of value.trip_details.location_details.pickup_zip is pickup_zip.
   */
  variantExprPath?: string | undefined;
}

/** A ColumnSelection function, equivalent to the LAST() record of an entity over a lifetime ContinuousWindow */
export interface UpdateColumnSelection {
  /** Column name from source to select as the feature value. */
  column?: string | undefined;
}

/** Deprecated: use RollingWindow with `delay` instead. */
export interface UpdateContinuousWindow {
  /** The duration of the continuous window (must be positive). */
  windowDuration?: Temporal.Duration | undefined;
  /** The offset of the continuous window (must be non-positive). */
  offset?: Temporal.Duration | undefined;
}

/** Computes the count of values. */
export interface UpdateCountFunction {
  /**
   * The input column from which the count is computed. For Kafka sources, use dot-prefixed path
   * notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input?: string | undefined;
}

/** A cron-based schedule trigger for the materialization pipeline. */
export interface UpdateCronSchedule {
  /** The cron expression defining the schedule (e.g., "0 0 * * *" for daily at midnight). */
  cronExpression?: string | undefined;
}

/** Specifies the data source backing a feature. Exactly one source type must be set. */
export interface UpdateDataSource {
  dataSource?:
    | {
        $case: 'deltaTableSource';
        /** A Delta table data source. */
        deltaTableSource: UpdateDeltaTableSource;
      }
    | {
        $case: 'kafkaSource';
        /** A Kafka stream data source. */
        kafkaSource: UpdateKafkaSource;
      }
    | {
        $case: 'requestSource';
        /** A request-time data source. */
        requestSource: UpdateRequestSource;
      }
    | {
        $case: 'streamSource';
        /** A Stream data source. */
        streamSource: UpdateStreamSource;
      }
    | undefined;
}

export interface UpdateDeltaTableSource {
  /** The full three-part (catalog, schema, table) name of the Delta table. */
  fullName?: string | undefined;
  /**
   * Deprecated: Use Feature.entity instead. Kept for backwards compatibility.
   * The entity columns of the Delta table.
   */
  entityColumns?: string[] | undefined;
  /**
   * Deprecated: Use Feature.timeseries_column instead. Kept for backwards compatibility.
   * The timeseries column of the Delta table.
   */
  timeseriesColumn?: string | undefined;
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
export interface UpdateDirectMtlsConfig {
  /** A comma-separated list of host:port pairs for the Kafka bootstrap servers. */
  bootstrapServers?: string | undefined;
  /** Mutual-TLS authentication configuration. */
  mtlsConfig?: UpdateMtlsConfig | undefined;
}

/**
 * Schema definitions provided directly on the Stream, as opposed to referencing a schema registry.
 * In a future milestone, we will support schema registries through a UC Connection.
 */
export interface UpdateDirectSchemas {
  /**
   * Schema for the message payload. For Kafka, this is the value schema.
   * Unless the platform supports another schema (e.g. keys for Kafka), this must be specified.
   */
  payloadSchema?: UpdateSchemaConfig | undefined;
  /**
   * Schema for the message key. This is only used for Kafka streams.
   * For Kafka, at least one of payload_schema or key_schema must be specified.
   */
  keySchema?: UpdateSchemaConfig | undefined;
}

export interface UpdateEntityColumn {
  /**
   * The name of the entity column. For Kafka sources, use dot-prefixed path notation to reference
   * fields within the key or value schema (e.g., "value.user_id", "key.partition_key"). For nested
   * fields, the leaf node name (e.g., "user_id" from "value.trip_details.user_id") is what will
   * be present in materialized tables and expected to match at query time.
   * Colon-prefixed notation (e.g., "value:user_id") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  name?: string | undefined;
}

export interface UpdateFeature {
  /**
   * The full three-part name (catalog, schema, name) of the feature. This is the
   * feature's resource identifier; the catalog_name, schema_name, and name fields
   * below are OUTPUT_ONLY decomposed views of this value.
   */
  fullName?: string | undefined;
  /** The data source of the feature. */
  source?: UpdateDataSource | undefined;
  /**
   * Deprecated: Use AggregationFunction.inputs instead. Kept for backwards compatibility.
   * The input columns from which the feature is computed.
   */
  inputs?: string[] | undefined;
  /** The function by which the feature is computed. */
  function?: UpdateFunction | undefined;
  /**
   * Deprecated: Use Function.aggregation_function.time_window instead. Kept for backwards compatibility.
   * The time window in which the feature is computed.
   */
  timeWindow?: UpdateTimeWindow | undefined;
  /** The description of the feature. */
  description?: string | undefined;
  /**
   * Deprecated: Use DeltaTableSource.filter_condition or KafkaSource.filter_condition instead. Kept for backwards compatibility.
   * The filter condition applied to the source data before aggregation.
   */
  filterCondition?: string | undefined;
  /**
   * Lineage context information for this feature.
   * WARNING: This field is primarily intended for internal use by <Databricks> systems and
   * is automatically populated when features are created through <Databricks> notebooks or jobs.
   * Users should not manually set this field as incorrect values may lead to inaccurate lineage tracking or unexpected behavior.
   * This field will be set by feature-engineering client and should be left unset by SDK and terraform users.
   */
  lineageContext?: UpdateLineageContext | undefined;
  /** The entity columns for the feature, used as aggregation keys and for query-time lookup. */
  entities?: UpdateEntityColumn[] | undefined;
  /** Column recording time, used for point-in-time joins, backfills, and aggregations. */
  timeseriesColumn?: UpdateTimeseriesColumn | undefined;
}

export interface UpdateFeatureRequest {
  /** Feature to update. */
  feature?: UpdateFeature | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<UpdateFeature> | undefined;
}

/**
 * A single field definition within a FlatSchema, specifying the field name and its scalar data type.
 * Does not support nested or complex types (arrays, maps, structs).
 */
export interface UpdateFieldDefinition {
  /** The name of the field. */
  name?: string | undefined;
  /** The scalar data type of the field. */
  dataType?: ScalarDataType | undefined;
}

/** Returns the first N distinct values, ordered by the feature's timeseries column. */
export interface UpdateFirstDistinctNFunction {
  /** The input column from which the first N distinct values are returned. */
  input?: string | undefined;
  /** The number of distinct values to return. */
  n?: bigint | undefined;
}

/** Returns the first value. */
export interface UpdateFirstFunction {
  /** The input column from which the first value is returned. */
  input?: string | undefined;
}

/** Returns the first N values, ordered by the feature's timeseries column. */
export interface UpdateFirstNFunction {
  /** The input column from which the first N values are returned. */
  input?: string | undefined;
  /** The number of values to return. */
  n?: bigint | undefined;
}

/**
 * A flat (non-nested) schema for request-time fields, defined as an ordered list of field definitions.
 * This schema only supports scalar types.
 */
export interface UpdateFlatSchema {
  /** The list of fields in this schema. */
  fields?: UpdateFieldDefinition[] | undefined;
}

export interface UpdateFunction {
  /**
   * Deprecated: Use the function oneof with AggregationFunction instead. Kept for backwards compatibility.
   * The type of the function.
   */
  functionType?: Function_FunctionType | undefined;
  /**
   * Deprecated: Use the function oneof with AggregationFunction instead. Kept for backwards compatibility.
   * Extra parameters for parameterized functions.
   */
  extraParameters?: Function_UpdateExtraParameter[] | undefined;
  function?:
    | {
        $case: 'aggregationFunction';
        /** An aggregation function applied over a time window. */
        aggregationFunction: UpdateAggregationFunction;
      }
    | {
        $case: 'columnSelection';
        /** Selects the latest value of a single column in a data source */
        columnSelection: UpdateColumnSelection;
      }
    | undefined;
}

/**
 * Configuration for the <Databricks>-managed ingestion pipeline.
 * Groups the ingestion destination (required) and optional backfill source.
 */
export interface UpdateIngestionConfig {
  /**
   * Destination for the <Databricks>-managed Delta table that holds an offline copy of the streaming data for querying and training.
   * This table contains both 1) forward-filled data from the Stream and 2) backfilled data from the BackfillSource (if provided).
   * This table is created and managed by <Databricks> and is deleted when the Stream is deleted.
   */
  ingestionDestination?: UpdateIngestionDestination | undefined;
  /**
   * A user-provided source for backfilling data. Historical data is used when creating a training set from streaming features linked to this Stream.
   * The backfill data stored in this location will be copied into the ingestion table for offline querying and training.
   * The schema for this source must match exactly that of the key and payload schemas specified for this Stream.
   */
  backfillSource?: UpdateBackfillSource | undefined;
  /**
   * Column paths used to identify duplicate rows during ingestion; only one row per
   * distinct combination of these values is kept. Use dot notation for nested fields
   * (e.g. `value.user_id`). Empty list means every column is compared.
   */
  deduplicationColumns?: string[] | undefined;
}

/** Destination for the <Databricks>-managed Delta table that holds an offline copy of the streaming data for querying and training. */
export interface UpdateIngestionDestination {
  ingestionDestination?:
    | {
        $case: 'deltaTableName';
        /** The full three-part name (catalog, schema, name) of the Delta table to be created for ingestion. */
        deltaTableName: string;
      }
    | undefined;
}

export interface UpdateJobContext {
  /** The job ID where this API invoked. */
  jobId?: bigint | undefined;
  /** The job run ID where this API was invoked. */
  jobRunId?: bigint | undefined;
}

export interface UpdateKafkaConfig {
  /**
   * Name that uniquely identifies this Kafka config within the metastore. This will be the identifier used from the Feature object to reference these configs for a feature.
   * Can be distinct from topic name.
   */
  name?: string | undefined;
  /** A comma-separated list of host/port pairs pointing to Kafka cluster. */
  bootstrapServers?: string | undefined;
  /** Options to configure which Kafka topics to pull data from. */
  subscriptionMode?: UpdateSubscriptionMode | undefined;
  /** Authentication configuration for connection to topics. */
  authConfig?: UpdateAuthConfig | undefined;
  /** Schema configuration for extracting message keys from topics. At least one of key_schema and value_schema must be provided. */
  keySchema?: UpdateSchemaConfig | undefined;
  /** Schema configuration for extracting message values from topics. At least one of key_schema and value_schema must be provided. */
  valueSchema?: UpdateSchemaConfig | undefined;
  /** Catch-all for miscellaneous options. Keys should be source options or Kafka consumer options (kafka.*) */
  extraOptions?: Record<string, string> | undefined;
  /**
   * A user-provided and managed source for backfilling data. Historical data is used when creating a training set from streaming features linked to this Kafka config.
   * In the future, a separate table will be maintained by <Databricks> for forward filling data.
   * The schema for this source must match exactly that of the key and value schemas specified for this Kafka config.
   */
  backfillSource?: UpdateBackfillSource | undefined;
  /**
   * Configuration for ingesting Kafka data into a <Databricks>-managed
   * Delta table.
   */
  ingestionConfig?: UpdateIngestionConfig | undefined;
}

export interface UpdateKafkaConfigRequest {
  /** The Kafka config to update. */
  kafkaConfig?: UpdateKafkaConfig | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<UpdateKafkaConfig> | undefined;
}

export interface UpdateKafkaSource {
  /** Name of the Kafka source, used to identify it. This is used to look up the corresponding KafkaConfig object. Can be distinct from topic name. */
  name?: string | undefined;
  /**
   * Deprecated: Use Feature.entity instead. Kept for backwards compatibility.
   * The entity column identifiers of the Kafka source.
   */
  entityColumnIdentifiers?: UpdateColumnIdentifier[] | undefined;
  /**
   * Deprecated: Use Feature.timeseries_column instead. Kept for backwards compatibility.
   * The timeseries column identifier of the Kafka source.
   */
  timeseriesColumnIdentifier?: UpdateColumnIdentifier | undefined;
  /** The filter condition applied to the source data before aggregation. */
  filterCondition?: string | undefined;
}

/** Kafka-specific configuration for a Stream. */
export interface UpdateKafkaStreamConfig {
  /** Options to configure which Kafka topics to pull data from. */
  subscriptionMode?: UpdateKafkaSubscriptionMode | undefined;
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
export interface UpdateKafkaSubscriptionMode {
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

/** Returns the last N distinct values, ordered by the feature's timeseries column. */
export interface UpdateLastDistinctNFunction {
  /** The input column from which the last N distinct values are returned. */
  input?: string | undefined;
  /** The number of distinct values to return. */
  n?: bigint | undefined;
}

/** Returns the last value. */
export interface UpdateLastFunction {
  /** The input column from which the last value is returned. */
  input?: string | undefined;
}

/** Returns the last N values, ordered by the feature's timeseries column. */
export interface UpdateLastNFunction {
  /** The input column from which the last N values are returned. */
  input?: string | undefined;
  /** The number of values to return. */
  n?: bigint | undefined;
}

/** Lineage context information for tracking where an API was invoked. This will allow us to track lineage, which currently uses caller entity information for use across the Lineage Client and Observability in Lumberjack. */
export interface UpdateLineageContext {
  /** The notebook ID where this API was invoked. */
  notebookId?: bigint | undefined;
  /** Job context information including job ID and run ID. */
  jobContext?: UpdateJobContext | undefined;
}

/** A materialized feature represents a feature that is continuously computed and stored. */
export interface UpdateMaterializedFeature {
  /** Server-assigned unique identifier for the materialized feature. */
  materializedFeatureId?: string | undefined;
  /** The full name of the feature in Unity Catalog. */
  featureName?: string | undefined;
  destination?:
    | {
        $case: 'offlineStoreConfig';
        /** Destination for writing feature values to an offline Delta table. */
        offlineStoreConfig: UpdateOfflineStoreConfig;
      }
    | {
        $case: 'onlineStoreConfig';
        /** Destination for writing feature values to an online Lakebase table. */
        onlineStoreConfig: UpdateOnlineStoreConfig;
      }
    | undefined;
  /**
   * The schedule state of the materialization pipeline.
   * Hidden from GraphQL: being deprecated, so not exposed to Catalog Explorer.
   */
  pipelineScheduleState?: MaterializedFeature_PipelineScheduleState | undefined;
  /**
   * The quartz cron expression that defines the schedule of the materialization pipeline. The schedule is evaluated in the UTC timezone.
   * Hidden from GraphQL: superseded by the `trigger` oneof (cron_schedule_trigger), so not exposed to Catalog Explorer.
   */
  cronSchedule?: string | undefined;
  /** The trigger configuration for the materialization pipeline. */
  trigger?:
    | {
        $case: 'cronScheduleTrigger';
        /** A cron-based schedule trigger for the materialization pipeline. */
        cronScheduleTrigger: UpdateCronSchedule;
      }
    | {
        $case: 'tableTrigger';
        /** A trigger that fires when the upstream source table changes. */
        tableTrigger: UpdateTableTrigger;
      }
    | {
        $case: 'streamingMode';
        /**
         * The Structured Streaming trigger mode used for materialization. Real-time mode (RTM) targets
         * sub-second latency for operational workloads; micro-batch mode (MBM) favors cost efficiency
         * for ETL and analytics workloads.
         */
        streamingMode: UpdateStreamingMode;
      }
    | undefined;
}

export interface UpdateMaterializedFeatureRequest {
  /** The materialized feature to update. */
  materializedFeature?: UpdateMaterializedFeature | undefined;
  /**
   * Provide the materialization feature fields which should be updated.
   * Currently, only the pipeline_state field can be updated.
   */
  updateMask?: FieldMask<UpdateMaterializedFeature> | undefined;
}

/** Computes the maximum value. */
export interface UpdateMaxFunction {
  /** The input column from which the maximum is computed. */
  input?: string | undefined;
}

/** Computes the minimum value. */
export interface UpdateMinFunction {
  /** The input column from which the minimum is computed. */
  input?: string | undefined;
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
export interface UpdateMtlsConfig {
  /**
   * Unity Catalog volume path to the JKS keystore file containing the client certificate
   * and private key. e.g. "/Volumes/<catalog>/<schema>/<volume>/client.jks". The
   * materialization compute must have read permission on this volume.
   */
  keystoreLocation?: string | undefined;
  /** Secret-scope reference for the JKS keystore password. */
  keystorePasswordRef?: UpdateSecretScopeReference | undefined;
  /**
   * Secret-scope reference for the private key password. Often the same value as the
   * keystore password (keytool's default), but provided as a separate field because
   * Apache Kafka requires it as a distinct option (kafka.ssl.key.password).
   */
  keyPasswordRef?: UpdateSecretScopeReference | undefined;
  /**
   * Unity Catalog volume path to the JKS truststore file containing the CA certificate(s)
   * trusted to verify the Kafka broker's server certificate.
   * e.g. "/Volumes/<catalog>/<schema>/<volume>/truststore.jks".
   */
  truststoreLocation?: string | undefined;
  /** Secret-scope reference for the JKS truststore password. */
  truststorePasswordRef?: UpdateSecretScopeReference | undefined;
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
export interface UpdateOfflineStoreConfig {
  /** The Unity Catalog catalog name. */
  catalogName?: string | undefined;
  /** The Unity Catalog schema name. */
  schemaName?: string | undefined;
  /**
   * Prefix for Unity Catalog table name.
   * The materialized feature will be stored in a table with this prefix and a generated postfix.
   */
  tableNamePrefix?: string | undefined;
}

/** Configuration for online store destination. */
export interface UpdateOnlineStoreConfig {
  /**
   * The Unity Catalog catalog name. This name is also used as the Lakebase logical database name.
   * Quoting is handled by the backend where needed, do not pre-quote it.
   */
  catalogName?: string | undefined;
  /**
   * The Unity Catalog schema name. This name is also used as the Lakebase schema name under the database.
   * Quoting is handled by the backend where needed, do not pre-quote it.
   */
  schemaName?: string | undefined;
  /**
   * Prefix for Unity Catalog table name.
   * The materialized feature will be stored in a Lakebase table with this prefix and a generated postfix.
   */
  tableNamePrefix?: string | undefined;
  /** The name of the target online store. */
  onlineStoreName?: string | undefined;
}

/** A request-time data source whose value is provided at inference time: offline batch scoring or online serving endpoint */
export interface UpdateRequestSource {
  /** The schema describing the request-time fields. Currently only flat schemas are supported. */
  schema?:
    | {
        $case: 'flatSchema';
        /** A flat schema with scalar-typed fields only. */
        flatSchema: UpdateFlatSchema;
      }
    | undefined;
}

/**
 * A rolling time window with an optional delay. This is the SQL-spec-aligned
 * replacement for ContinuousWindow: `delay` is the non-negative counterpart
 * of the legacy non-positive `ContinuousWindow.offset`.
 */
export interface UpdateRollingWindow {
  /** The duration of the rolling window (must be positive). */
  windowDuration?: Temporal.Duration | undefined;
  /**
   * The delay applied to the end of the rolling window (must be non-negative).
   * For example, delay=1d shifts the window end 1 day before the evaluation time.
   */
  delay?: Temporal.Duration | undefined;
}

export interface UpdateSchemaConfig {
  schema?:
    | {
        $case: 'jsonSchema';
        /** Schema of the JSON object in standard IETF JSON schema format (https://json-schema.org/). */
        jsonSchema: string;
      }
    | undefined;
}

/**
 * Reference to an entry in a <Databricks> secret scope. The referenced value is fetched
 * on the Spark cluster at materialization time via dbutils.secrets.get(scope, key).
 */
export interface UpdateSecretScopeReference {
  /** The <Databricks> secret scope name. */
  scope?: string | undefined;
  /** The key within the scope. */
  key?: string | undefined;
}

export interface UpdateSlidingWindow {
  /** The duration of the sliding window. */
  windowDuration?: Temporal.Duration | undefined;
  /** The slide duration (interval by which windows advance, must be positive and less than duration). */
  slideDuration?: Temporal.Duration | undefined;
}

/** Computes the population standard deviation. */
export interface UpdateStddevPopFunction {
  /**
   * The input column from which the population standard deviation is computed. For Kafka sources,
   * use dot-prefixed path notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input?: string | undefined;
}

/** Computes the sample standard deviation. */
export interface UpdateStddevSampFunction {
  /** The input column from which the sample standard deviation is computed. */
  input?: string | undefined;
}

/**
 * A Stream is a governed UC entity representing an external streaming data source.
 * The source_config oneof determines the streaming platform source (e.g. Kafka, Kinesis, etc.).
 */
export interface UpdateStream {
  /** Full three-part (catalog.schema.stream) name of the stream. */
  name?: string | undefined;
  /** User-provided description. */
  description?: string | undefined;
  /** Source-specific configuration. Determines the streaming platform source. */
  sourceConfig?: UpdateStreamSourceConfig | undefined;
  /** Specifies how to connect and authenticate to the stream platform. */
  connectionConfig?: UpdateStreamConnectionConfig | undefined;
  /**
   * Schema definitions for the stream. Currently only direct schemas are supported.
   * In a future milestone, we will support schema registries through a UC Connection.
   */
  schemaConfig?: UpdateStreamSchemaConfig | undefined;
  /** Configuration for streaming data ingestion: the managed table storing an offline copy of forward fill data and optional historical backfill. */
  ingestionConfig?: UpdateIngestionConfig | undefined;
}

/** Specifies how to connect and authenticate to the stream platform. */
export interface UpdateStreamConnectionConfig {
  connectionConfig?:
    | {
        $case: 'ucConnectionName';
        /**
         * Name of an existing UC Connection for stream platform access.
         * Must be the correct type for the streaming platform (e.g. a Kafka Connection for a Kafka Stream).
         */
        ucConnectionName: string;
      }
    | {
        $case: 'directMtlsConfig';
        /**
         * Direct mTLS configuration for stream platform access. This is only used in the short term until UC Kafka Connections support mTLS .
         * Once UC Kafka Connections support mTLS, this will be deprecated.
         */
        directMtlsConfig: UpdateDirectMtlsConfig;
      }
    | undefined;
}

/** Update a Stream. Only fields listed in `update_mask` are mutated. */
export interface UpdateStreamRequest {
  /** The Stream to update. */
  stream?: UpdateStream | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<UpdateStream> | undefined;
}

/**
 * Schema definitions for the stream. Currently only direct schemas are supported.
 * In a future milestone, we will support schema registries through a UC Connection.
 */
export interface UpdateStreamSchemaConfig {
  schemaConfig?:
    | {
        $case: 'directSchemas';
        /** Schema definitions provided directly on the Stream. */
        directSchemas: UpdateDirectSchemas;
      }
    | undefined;
}

/** A Stream entity used as a data source for a feature. */
export interface UpdateStreamSource {
  /** Three-part full name of the Stream (catalog.schema.stream). */
  fullName?: string | undefined;
  /** The filter condition applied to the source data before aggregation. */
  filterCondition?: string | undefined;
}

/** Source-specific configuration. Determines the streaming platform source. */
export interface UpdateStreamSourceConfig {
  sourceConfig?:
    | {
        $case: 'kafkaStreamConfig';
        /** Configuration for Apache Kafka streams. */
        kafkaStreamConfig: UpdateKafkaStreamConfig;
      }
    | undefined;
}

/** The streaming mode configuration for a streaming materialization pipeline. */
export interface UpdateStreamingMode {
  /** The type of streaming mode used by the materialization pipeline. */
  mode?: StreamingMode_StreamingModeType | undefined;
}

/** Deprecated: Use KafkaSubscriptionMode instead. */
export interface UpdateSubscriptionMode {
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
export interface UpdateSumFunction {
  /**
   * The input column from which the sum is computed. For Kafka sources, use dot-prefixed path
   * notation (e.g., "value.amount"). For nested fields, the leaf node name is used.
   * Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input?: string | undefined;
}

/** A trigger that fires when the upstream source table changes. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateTableTrigger {}

export interface UpdateTimeWindow {
  windowType?:
    | {$case: 'continuous'; continuous: UpdateContinuousWindow}
    | {$case: 'tumbling'; tumbling: UpdateTumblingWindow}
    | {$case: 'sliding'; sliding: UpdateSlidingWindow}
    | {$case: 'rolling'; rolling: UpdateRollingWindow}
    | undefined;
}

export interface UpdateTimeseriesColumn {
  /**
   * The name of the timeseries column. For Kafka sources, use dot-prefixed path notation to
   * reference fields within the key or value schema (e.g., "value.event_timestamp"). For nested
   * fields, the leaf node name (e.g., "event_timestamp" from "value.event_details.event_timestamp")
   * is what will be present in materialized tables and expected to match at query time.
   * Colon-prefixed notation (e.g., "value:event_timestamp") is supported for
   * backwards compatibility but is deprecated; migrate to dot notation.
   */
  name?: string | undefined;
}

export interface UpdateTumblingWindow {
  /** The duration of each tumbling window (non-overlapping, fixed-duration windows). */
  windowDuration?: Temporal.Duration | undefined;
}

/** Computes the population variance. */
export interface UpdateVarPopFunction {
  /** The input column from which the population variance is computed. */
  input?: string | undefined;
}

/** Computes the sample variance. */
export interface UpdateVarSampFunction {
  /** The input column from which the sample variance is computed. */
  input?: string | undefined;
}

/** Computes the population variance. */
export interface VarPopFunction {
  /** The input column from which the population variance is computed. */
  input?: string | undefined;
}

/** Computes the sample variance. */
export interface VarSampFunction {
  /** The input column from which the sample variance is computed. */
  input?: string | undefined;
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
      first_distinct_n: z
        .lazy(() => unmarshalFirstDistinctNFunctionSchema)
        .optional(),
      last_distinct_n: z
        .lazy(() => unmarshalLastDistinctNFunctionSchema)
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
                                      : d.first_distinct_n !== undefined
                                        ? {
                                            $case: 'firstDistinctN' as const,
                                            firstDistinctN: d.first_distinct_n,
                                          }
                                        : d.last_distinct_n !== undefined
                                          ? {
                                              $case: 'lastDistinctN' as const,
                                              lastDistinctN: d.last_distinct_n,
                                            }
                                          : undefined,
      timeWindow: d.time_window,
    }));

export const unmarshalApproxCountDistinctFunctionSchema: z.ZodType<ApproxCountDistinctFunction> =
  z
    .object({
      input: z.string().optional(),
      relative_sd: z.number().optional(),
    })
    .transform(d => ({
      input: d.input,
      relativeSd: d.relative_sd,
    }));

export const unmarshalApproxPercentileFunctionSchema: z.ZodType<ApproxPercentileFunction> =
  z
    .object({
      input: z.string().optional(),
      percentile: z.number().optional(),
      accuracy: z
        .union([z.number(), z.bigint()])
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
    input: z.string().optional(),
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

export const unmarshalColumnIdentifierSchema: z.ZodType<ColumnIdentifier> = z
  .object({
    variant_expr_path: z.string().optional(),
  })
  .transform(d => ({
    variantExprPath: d.variant_expr_path,
  }));

export const unmarshalColumnSelectionSchema: z.ZodType<ColumnSelection> = z
  .object({
    column: z.string().optional(),
  })
  .transform(d => ({
    column: d.column,
  }));

export const unmarshalContinuousWindowSchema: z.ZodType<ContinuousWindow> = z
  .object({
    window_duration: z
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
    offset: d.offset,
  }));

export const unmarshalCountFunctionSchema: z.ZodType<CountFunction> = z
  .object({
    input: z.string().optional(),
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

export const unmarshalDataSourceSchema: z.ZodType<DataSource> = z
  .object({
    delta_table_source: z
      .lazy(() => unmarshalDeltaTableSourceSchema)
      .optional(),
    kafka_source: z.lazy(() => unmarshalKafkaSourceSchema).optional(),
    request_source: z.lazy(() => unmarshalRequestSourceSchema).optional(),
    stream_source: z.lazy(() => unmarshalStreamSourceSchema).optional(),
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
  }));

export const unmarshalDeltaTableSourceSchema: z.ZodType<DeltaTableSource> = z
  .object({
    full_name: z.string().optional(),
    entity_columns: z.array(z.string()).optional(),
    timeseries_column: z.string().optional(),
    filter_condition: z.string().optional(),
    transformation_sql: z.string().optional(),
    dataframe_schema: z.string().optional(),
  })
  .transform(d => ({
    fullName: d.full_name,
    entityColumns: d.entity_columns,
    timeseriesColumn: d.timeseries_column,
    filterCondition: d.filter_condition,
    transformationSql: d.transformation_sql,
    dataframeSchema: d.dataframe_schema,
  }));

export const unmarshalDirectMtlsConfigSchema: z.ZodType<DirectMtlsConfig> = z
  .object({
    bootstrap_servers: z.string().optional(),
    mtls_config: z.lazy(() => unmarshalMtlsConfigSchema).optional(),
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
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalFeatureSchema: z.ZodType<Feature> = z
  .object({
    full_name: z.string().optional(),
    source: z.lazy(() => unmarshalDataSourceSchema).optional(),
    inputs: z.array(z.string()).optional(),
    function: z.lazy(() => unmarshalFunctionSchema).optional(),
    time_window: z.lazy(() => unmarshalTimeWindowSchema).optional(),
    description: z.string().optional(),
    filter_condition: z.string().optional(),
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
    inputs: d.inputs,
    function: d.function,
    timeWindow: d.time_window,
    description: d.description,
    filterCondition: d.filter_condition,
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
    name: z.string().optional(),
    data_type: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    dataType: d.data_type,
  }));

export const unmarshalFirstDistinctNFunctionSchema: z.ZodType<FirstDistinctNFunction> =
  z
    .object({
      input: z.string().optional(),
      n: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      input: d.input,
      n: d.n,
    }));

export const unmarshalFirstFunctionSchema: z.ZodType<FirstFunction> = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalFirstNFunctionSchema: z.ZodType<FirstNFunction> = z
  .object({
    input: z.string().optional(),
    n: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const unmarshalFlatSchemaSchema: z.ZodType<FlatSchema> = z
  .object({
    fields: z.array(z.lazy(() => unmarshalFieldDefinitionSchema)).optional(),
  })
  .transform(d => ({
    fields: d.fields,
  }));

export const unmarshalFunctionSchema: z.ZodType<Function> = z
  .object({
    function_type: z.string().optional(),
    extra_parameters: z
      .array(z.lazy(() => unmarshalFunction_ExtraParameterSchema))
      .optional(),
    aggregation_function: z
      .lazy(() => unmarshalAggregationFunctionSchema)
      .optional(),
    column_selection: z.lazy(() => unmarshalColumnSelectionSchema).optional(),
  })
  .transform(d => ({
    functionType: d.function_type,
    extraParameters: d.extra_parameters,
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
          : undefined,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalFunction_ExtraParameterSchema: z.ZodType<Function_ExtraParameter> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalIngestionConfigSchema: z.ZodType<IngestionConfig> = z
  .object({
    ingestion_destination: z
      .lazy(() => unmarshalIngestionDestinationSchema)
      .optional(),
    backfill_source: z.lazy(() => unmarshalBackfillSourceSchema).optional(),
    deduplication_columns: z.array(z.string()).optional(),
    ingestion_pipeline_id: z.string().optional(),
    ingestion_job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    backfill_job_id: z
      .union([z.number(), z.bigint()])
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

export const unmarshalJobContextSchema: z.ZodType<JobContext> = z
  .object({
    job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    job_run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    jobId: d.job_id,
    jobRunId: d.job_run_id,
  }));

export const unmarshalKafkaConfigSchema: z.ZodType<KafkaConfig> = z
  .object({
    name: z.string().optional(),
    bootstrap_servers: z.string().optional(),
    subscription_mode: z.lazy(() => unmarshalSubscriptionModeSchema).optional(),
    auth_config: z.lazy(() => unmarshalAuthConfigSchema).optional(),
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
    name: z.string().optional(),
    entity_column_identifiers: z
      .array(z.lazy(() => unmarshalColumnIdentifierSchema))
      .optional(),
    timeseries_column_identifier: z
      .lazy(() => unmarshalColumnIdentifierSchema)
      .optional(),
    filter_condition: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    entityColumnIdentifiers: d.entity_column_identifiers,
    timeseriesColumnIdentifier: d.timeseries_column_identifier,
    filterCondition: d.filter_condition,
  }));

export const unmarshalKafkaStreamConfigSchema: z.ZodType<KafkaStreamConfig> = z
  .object({
    subscription_mode: z
      .lazy(() => unmarshalKafkaSubscriptionModeSchema)
      .optional(),
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

export const unmarshalLastDistinctNFunctionSchema: z.ZodType<LastDistinctNFunction> =
  z
    .object({
      input: z.string().optional(),
      n: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      input: d.input,
      n: d.n,
    }));

export const unmarshalLastFunctionSchema: z.ZodType<LastFunction> = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalLastNFunctionSchema: z.ZodType<LastNFunction> = z
  .object({
    input: z.string().optional(),
    n: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const unmarshalLineageContextSchema: z.ZodType<LineageContext> = z
  .object({
    notebook_id: z
      .union([z.number(), z.bigint()])
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
      kafka_configs: z
        .array(z.lazy(() => unmarshalKafkaConfigSchema))
        .optional(),
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
      feature_name: z.string().optional(),
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
      cron_schedule: z.string().optional(),
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
      cronSchedule: d.cron_schedule,
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
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalMinFunctionSchema: z.ZodType<MinFunction> = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalMtlsConfigSchema: z.ZodType<MtlsConfig> = z
  .object({
    keystore_location: z.string().optional(),
    keystore_password_ref: z
      .lazy(() => unmarshalSecretScopeReferenceSchema)
      .optional(),
    key_password_ref: z
      .lazy(() => unmarshalSecretScopeReferenceSchema)
      .optional(),
    truststore_location: z.string().optional(),
    truststore_password_ref: z
      .lazy(() => unmarshalSecretScopeReferenceSchema)
      .optional(),
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
      catalog_name: z.string().optional(),
      schema_name: z.string().optional(),
      table_name_prefix: z.string().optional(),
    })
    .transform(d => ({
      catalogName: d.catalog_name,
      schemaName: d.schema_name,
      tableNamePrefix: d.table_name_prefix,
    }));

export const unmarshalOnlineStoreConfigSchema: z.ZodType<OnlineStoreConfig> = z
  .object({
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    table_name_prefix: z.string().optional(),
    online_store_name: z.string().optional(),
  })
  .transform(d => ({
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    tableNamePrefix: d.table_name_prefix,
    onlineStoreName: d.online_store_name,
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

export const unmarshalSchemaConfigSchema: z.ZodType<SchemaConfig> = z
  .object({
    json_schema: z.string().optional(),
  })
  .transform(d => ({
    schema:
      d.json_schema !== undefined
        ? {$case: 'jsonSchema' as const, jsonSchema: d.json_schema}
        : undefined,
  }));

export const unmarshalSecretScopeReferenceSchema: z.ZodType<SecretScopeReference> =
  z
    .object({
      scope: z.string().optional(),
      key: z.string().optional(),
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
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
  })
  .transform(d => ({
    windowDuration: d.window_duration,
    slideDuration: d.slide_duration,
  }));

export const unmarshalStddevPopFunctionSchema: z.ZodType<StddevPopFunction> = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalStddevSampFunctionSchema: z.ZodType<StddevSampFunction> =
  z
    .object({
      input: z.string().optional(),
    })
    .transform(d => ({
      input: d.input,
    }));

export const unmarshalStreamSchema: z.ZodType<Stream> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    source_config: z.lazy(() => unmarshalStreamSourceConfigSchema).optional(),
    connection_config: z
      .lazy(() => unmarshalStreamConnectionConfigSchema)
      .optional(),
    schema_config: z.lazy(() => unmarshalStreamSchemaConfigSchema).optional(),
    ingestion_config: z.lazy(() => unmarshalIngestionConfigSchema).optional(),
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

export const unmarshalStreamSchemaConfigSchema: z.ZodType<StreamSchemaConfig> =
  z
    .object({
      direct_schemas: z.lazy(() => unmarshalDirectSchemasSchema).optional(),
    })
    .transform(d => ({
      schemaConfig:
        d.direct_schemas !== undefined
          ? {$case: 'directSchemas' as const, directSchemas: d.direct_schemas}
          : undefined,
    }));

export const unmarshalStreamSourceSchema: z.ZodType<StreamSource> = z
  .object({
    full_name: z.string().optional(),
    filter_condition: z.string().optional(),
  })
  .transform(d => ({
    fullName: d.full_name,
    filterCondition: d.filter_condition,
  }));

export const unmarshalStreamSourceConfigSchema: z.ZodType<StreamSourceConfig> =
  z
    .object({
      kafka_stream_config: z
        .lazy(() => unmarshalKafkaStreamConfigSchema)
        .optional(),
    })
    .transform(d => ({
      sourceConfig:
        d.kafka_stream_config !== undefined
          ? {
              $case: 'kafkaStreamConfig' as const,
              kafkaStreamConfig: d.kafka_stream_config,
            }
          : undefined,
    }));

export const unmarshalStreamingModeSchema: z.ZodType<StreamingMode> = z
  .object({
    mode: z.string().optional(),
  })
  .transform(d => ({
    mode: d.mode,
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
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalTableTriggerSchema: z.ZodType<TableTrigger> = z.object(
  {}
);

export const unmarshalTimeWindowSchema: z.ZodType<TimeWindow> = z
  .object({
    continuous: z.lazy(() => unmarshalContinuousWindowSchema).optional(),
    tumbling: z.lazy(() => unmarshalTumblingWindowSchema).optional(),
    sliding: z.lazy(() => unmarshalSlidingWindowSchema).optional(),
    rolling: z.lazy(() => unmarshalRollingWindowSchema).optional(),
  })
  .transform(d => ({
    windowType:
      d.continuous !== undefined
        ? {$case: 'continuous' as const, continuous: d.continuous}
        : d.tumbling !== undefined
          ? {$case: 'tumbling' as const, tumbling: d.tumbling}
          : d.sliding !== undefined
            ? {$case: 'sliding' as const, sliding: d.sliding}
            : d.rolling !== undefined
              ? {$case: 'rolling' as const, rolling: d.rolling}
              : undefined,
  }));

export const unmarshalTimeseriesColumnSchema: z.ZodType<TimeseriesColumn> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalTumblingWindowSchema: z.ZodType<TumblingWindow> = z
  .object({
    window_duration: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
  })
  .transform(d => ({
    windowDuration: d.window_duration,
  }));

export const unmarshalVarPopFunctionSchema: z.ZodType<VarPopFunction> = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalVarSampFunctionSchema: z.ZodType<VarSampFunction> = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
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

export const marshalCreateAggregationFunctionSchema: z.ZodType = z
  .object({
    operation: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('avg'),
          avg: z.lazy(() => marshalCreateAvgFunctionSchema),
        }),
        z.object({
          $case: z.literal('countFunction'),
          countFunction: z.lazy(() => marshalCreateCountFunctionSchema),
        }),
        z.object({
          $case: z.literal('sum'),
          sum: z.lazy(() => marshalCreateSumFunctionSchema),
        }),
        z.object({
          $case: z.literal('min'),
          min: z.lazy(() => marshalCreateMinFunctionSchema),
        }),
        z.object({
          $case: z.literal('max'),
          max: z.lazy(() => marshalCreateMaxFunctionSchema),
        }),
        z.object({
          $case: z.literal('first'),
          first: z.lazy(() => marshalCreateFirstFunctionSchema),
        }),
        z.object({
          $case: z.literal('last'),
          last: z.lazy(() => marshalCreateLastFunctionSchema),
        }),
        z.object({
          $case: z.literal('approxCountDistinct'),
          approxCountDistinct: z.lazy(
            () => marshalCreateApproxCountDistinctFunctionSchema
          ),
        }),
        z.object({
          $case: z.literal('approxPercentile'),
          approxPercentile: z.lazy(
            () => marshalCreateApproxPercentileFunctionSchema
          ),
        }),
        z.object({
          $case: z.literal('stddevPop'),
          stddevPop: z.lazy(() => marshalCreateStddevPopFunctionSchema),
        }),
        z.object({
          $case: z.literal('stddevSamp'),
          stddevSamp: z.lazy(() => marshalCreateStddevSampFunctionSchema),
        }),
        z.object({
          $case: z.literal('varPop'),
          varPop: z.lazy(() => marshalCreateVarPopFunctionSchema),
        }),
        z.object({
          $case: z.literal('varSamp'),
          varSamp: z.lazy(() => marshalCreateVarSampFunctionSchema),
        }),
        z.object({
          $case: z.literal('firstN'),
          firstN: z.lazy(() => marshalCreateFirstNFunctionSchema),
        }),
        z.object({
          $case: z.literal('lastN'),
          lastN: z.lazy(() => marshalCreateLastNFunctionSchema),
        }),
        z.object({
          $case: z.literal('firstDistinctN'),
          firstDistinctN: z.lazy(
            () => marshalCreateFirstDistinctNFunctionSchema
          ),
        }),
        z.object({
          $case: z.literal('lastDistinctN'),
          lastDistinctN: z.lazy(() => marshalCreateLastDistinctNFunctionSchema),
        }),
      ])
      .optional(),
    timeWindow: z.lazy(() => marshalCreateTimeWindowSchema).optional(),
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
    ...(d.operation?.$case === 'firstDistinctN' && {
      first_distinct_n: d.operation.firstDistinctN,
    }),
    ...(d.operation?.$case === 'lastDistinctN' && {
      last_distinct_n: d.operation.lastDistinctN,
    }),
    time_window: d.timeWindow,
  }));

export const marshalCreateApproxCountDistinctFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    relativeSd: z.number().optional(),
  })
  .transform(d => ({
    input: d.input,
    relative_sd: d.relativeSd,
  }));

export const marshalCreateApproxPercentileFunctionSchema: z.ZodType = z
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

export const marshalCreateAuthConfigSchema: z.ZodType = z
  .object({
    authConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('ucServiceCredentialName'),
          ucServiceCredentialName: z.string(),
        }),
        z.object({
          $case: z.literal('mtlsConfig'),
          mtlsConfig: z.lazy(() => marshalCreateMtlsConfigSchema),
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

export const marshalCreateAvgFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateBackfillSourceSchema: z.ZodType = z
  .object({
    backfillSource: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('deltaTableSource'),
          deltaTableSource: z.lazy(() => marshalCreateDeltaTableSourceSchema),
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

export const marshalCreateColumnIdentifierSchema: z.ZodType = z
  .object({
    variantExprPath: z.string(),
  })
  .transform(d => ({
    variant_expr_path: d.variantExprPath,
  }));

export const marshalCreateColumnSelectionSchema: z.ZodType = z
  .object({
    column: z.string(),
  })
  .transform(d => ({
    column: d.column,
  }));

export const marshalCreateContinuousWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase()),
    offset: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
    offset: d.offset,
  }));

export const marshalCreateCountFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateCronScheduleSchema: z.ZodType = z
  .object({
    cronExpression: z.string().optional(),
  })
  .transform(d => ({
    cron_expression: d.cronExpression,
  }));

export const marshalCreateDataSourceSchema: z.ZodType = z
  .object({
    dataSource: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('deltaTableSource'),
          deltaTableSource: z.lazy(() => marshalCreateDeltaTableSourceSchema),
        }),
        z.object({
          $case: z.literal('kafkaSource'),
          kafkaSource: z.lazy(() => marshalCreateKafkaSourceSchema),
        }),
        z.object({
          $case: z.literal('requestSource'),
          requestSource: z.lazy(() => marshalCreateRequestSourceSchema),
        }),
        z.object({
          $case: z.literal('streamSource'),
          streamSource: z.lazy(() => marshalCreateStreamSourceSchema),
        }),
      ])
      .optional(),
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
  }));

export const marshalCreateDeltaTableSourceSchema: z.ZodType = z
  .object({
    fullName: z.string(),
    entityColumns: z.array(z.string()).optional(),
    timeseriesColumn: z.string().optional(),
    filterCondition: z.string().optional(),
    transformationSql: z.string().optional(),
    dataframeSchema: z.string().optional(),
  })
  .transform(d => ({
    full_name: d.fullName,
    entity_columns: d.entityColumns,
    timeseries_column: d.timeseriesColumn,
    filter_condition: d.filterCondition,
    transformation_sql: d.transformationSql,
    dataframe_schema: d.dataframeSchema,
  }));

export const marshalCreateDirectMtlsConfigSchema: z.ZodType = z
  .object({
    bootstrapServers: z.string(),
    mtlsConfig: z.lazy(() => marshalCreateMtlsConfigSchema),
  })
  .transform(d => ({
    bootstrap_servers: d.bootstrapServers,
    mtls_config: d.mtlsConfig,
  }));

export const marshalCreateDirectSchemasSchema: z.ZodType = z
  .object({
    payloadSchema: z.lazy(() => marshalCreateSchemaConfigSchema).optional(),
    keySchema: z.lazy(() => marshalCreateSchemaConfigSchema).optional(),
  })
  .transform(d => ({
    payload_schema: d.payloadSchema,
    key_schema: d.keySchema,
  }));

export const marshalCreateEntityColumnSchema: z.ZodType = z
  .object({
    name: z.string(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalCreateFeatureSchema: z.ZodType = z
  .object({
    fullName: z.string(),
    source: z.lazy(() => marshalCreateDataSourceSchema),
    inputs: z.array(z.string()).optional(),
    function: z.lazy(() => marshalCreateFunctionSchema),
    timeWindow: z.lazy(() => marshalCreateTimeWindowSchema).optional(),
    description: z.string().optional(),
    filterCondition: z.string().optional(),
    lineageContext: z.lazy(() => marshalCreateLineageContextSchema).optional(),
    entities: z.array(z.lazy(() => marshalCreateEntityColumnSchema)).optional(),
    timeseriesColumn: z
      .lazy(() => marshalCreateTimeseriesColumnSchema)
      .optional(),
  })
  .transform(d => ({
    full_name: d.fullName,
    source: d.source,
    inputs: d.inputs,
    function: d.function,
    time_window: d.timeWindow,
    description: d.description,
    filter_condition: d.filterCondition,
    lineage_context: d.lineageContext,
    entities: d.entities,
    timeseries_column: d.timeseriesColumn,
  }));

export const marshalCreateFieldDefinitionSchema: z.ZodType = z
  .object({
    name: z.string(),
    dataType: z.string(),
  })
  .transform(d => ({
    name: d.name,
    data_type: d.dataType,
  }));

export const marshalCreateFirstDistinctNFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    n: z.bigint(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalCreateFirstFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateFirstNFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    n: z.bigint(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalCreateFlatSchemaSchema: z.ZodType = z
  .object({
    fields: z.array(z.lazy(() => marshalCreateFieldDefinitionSchema)),
  })
  .transform(d => ({
    fields: d.fields,
  }));

export const marshalCreateFunctionSchema: z.ZodType = z
  .object({
    functionType: z.string().optional(),
    extraParameters: z
      .array(z.lazy(() => marshalFunction_CreateExtraParameterSchema))
      .optional(),
    function: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('aggregationFunction'),
          aggregationFunction: z.lazy(
            () => marshalCreateAggregationFunctionSchema
          ),
        }),
        z.object({
          $case: z.literal('columnSelection'),
          columnSelection: z.lazy(() => marshalCreateColumnSelectionSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    function_type: d.functionType,
    extra_parameters: d.extraParameters,
    ...(d.function?.$case === 'aggregationFunction' && {
      aggregation_function: d.function.aggregationFunction,
    }),
    ...(d.function?.$case === 'columnSelection' && {
      column_selection: d.function.columnSelection,
    }),
  }));

export const marshalCreateIngestionConfigSchema: z.ZodType = z
  .object({
    ingestionDestination: z.lazy(() => marshalCreateIngestionDestinationSchema),
    backfillSource: z.lazy(() => marshalCreateBackfillSourceSchema).optional(),
    deduplicationColumns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    ingestion_destination: d.ingestionDestination,
    backfill_source: d.backfillSource,
    deduplication_columns: d.deduplicationColumns,
  }));

export const marshalCreateIngestionDestinationSchema: z.ZodType = z
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

export const marshalCreateJobContextSchema: z.ZodType = z
  .object({
    jobId: z.bigint().optional(),
    jobRunId: z.bigint().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    job_run_id: d.jobRunId,
  }));

export const marshalCreateKafkaConfigSchema: z.ZodType = z
  .object({
    name: z.string(),
    bootstrapServers: z.string(),
    subscriptionMode: z.lazy(() => marshalCreateSubscriptionModeSchema),
    authConfig: z.lazy(() => marshalCreateAuthConfigSchema),
    keySchema: z.lazy(() => marshalCreateSchemaConfigSchema).optional(),
    valueSchema: z.lazy(() => marshalCreateSchemaConfigSchema).optional(),
    extraOptions: z.record(z.string(), z.string()).optional(),
    backfillSource: z.lazy(() => marshalCreateBackfillSourceSchema).optional(),
    ingestionConfig: z
      .lazy(() => marshalCreateIngestionConfigSchema)
      .optional(),
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

export const marshalCreateKafkaSourceSchema: z.ZodType = z
  .object({
    name: z.string(),
    entityColumnIdentifiers: z
      .array(z.lazy(() => marshalCreateColumnIdentifierSchema))
      .optional(),
    timeseriesColumnIdentifier: z
      .lazy(() => marshalCreateColumnIdentifierSchema)
      .optional(),
    filterCondition: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    entity_column_identifiers: d.entityColumnIdentifiers,
    timeseries_column_identifier: d.timeseriesColumnIdentifier,
    filter_condition: d.filterCondition,
  }));

export const marshalCreateKafkaStreamConfigSchema: z.ZodType = z
  .object({
    subscriptionMode: z.lazy(() => marshalCreateKafkaSubscriptionModeSchema),
    extraOptions: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    subscription_mode: d.subscriptionMode,
    extra_options: d.extraOptions,
  }));

export const marshalCreateKafkaSubscriptionModeSchema: z.ZodType = z
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

export const marshalCreateLastDistinctNFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    n: z.bigint(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalCreateLastFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateLastNFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
    n: z.bigint(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalCreateLineageContextSchema: z.ZodType = z
  .object({
    notebookId: z.bigint().optional(),
    jobContext: z.lazy(() => marshalCreateJobContextSchema).optional(),
  })
  .transform(d => ({
    notebook_id: d.notebookId,
    job_context: d.jobContext,
  }));

export const marshalCreateMaterializedFeatureSchema: z.ZodType = z
  .object({
    materializedFeatureId: z.string().optional(),
    featureName: z.string(),
    destination: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('offlineStoreConfig'),
          offlineStoreConfig: z.lazy(
            () => marshalCreateOfflineStoreConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('onlineStoreConfig'),
          onlineStoreConfig: z.lazy(() => marshalCreateOnlineStoreConfigSchema),
        }),
      ])
      .optional(),
    pipelineScheduleState: z.string().optional(),
    cronSchedule: z.string().optional(),
    trigger: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('cronScheduleTrigger'),
          cronScheduleTrigger: z.lazy(() => marshalCreateCronScheduleSchema),
        }),
        z.object({
          $case: z.literal('tableTrigger'),
          tableTrigger: z.lazy(() => marshalCreateTableTriggerSchema),
        }),
        z.object({
          $case: z.literal('streamingMode'),
          streamingMode: z.lazy(() => marshalCreateStreamingModeSchema),
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
    pipeline_schedule_state: d.pipelineScheduleState,
    cron_schedule: d.cronSchedule,
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

export const marshalCreateMaterializedFeatureRequestSchema: z.ZodType = z
  .object({
    materializedFeature: z.lazy(() => marshalCreateMaterializedFeatureSchema),
  })
  .transform(d => ({
    materialized_feature: d.materializedFeature,
  }));

export const marshalCreateMaxFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateMinFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateMtlsConfigSchema: z.ZodType = z
  .object({
    keystoreLocation: z.string(),
    keystorePasswordRef: z.lazy(() => marshalCreateSecretScopeReferenceSchema),
    keyPasswordRef: z.lazy(() => marshalCreateSecretScopeReferenceSchema),
    truststoreLocation: z.string(),
    truststorePasswordRef: z.lazy(
      () => marshalCreateSecretScopeReferenceSchema
    ),
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

export const marshalCreateOfflineStoreConfigSchema: z.ZodType = z
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

export const marshalCreateOnlineStoreConfigSchema: z.ZodType = z
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

export const marshalCreateRequestSourceSchema: z.ZodType = z
  .object({
    schema: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('flatSchema'),
          flatSchema: z.lazy(() => marshalCreateFlatSchemaSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.schema?.$case === 'flatSchema' && {flat_schema: d.schema.flatSchema}),
  }));

export const marshalCreateRollingWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase()),
    delay: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
    delay: d.delay,
  }));

export const marshalCreateSchemaConfigSchema: z.ZodType = z
  .object({
    schema: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('jsonSchema'), jsonSchema: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.schema?.$case === 'jsonSchema' && {json_schema: d.schema.jsonSchema}),
  }));

export const marshalCreateSecretScopeReferenceSchema: z.ZodType = z
  .object({
    scope: z.string(),
    key: z.string(),
  })
  .transform(d => ({
    scope: d.scope,
    key: d.key,
  }));

export const marshalCreateSlidingWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase()),
    slideDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase()),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
    slide_duration: d.slideDuration,
  }));

export const marshalCreateStddevPopFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateStddevSampFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateStreamSchema: z.ZodType = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    sourceConfig: z.lazy(() => marshalCreateStreamSourceConfigSchema),
    connectionConfig: z.lazy(() => marshalCreateStreamConnectionConfigSchema),
    schemaConfig: z.lazy(() => marshalCreateStreamSchemaConfigSchema),
    ingestionConfig: z.lazy(() => marshalCreateIngestionConfigSchema),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    source_config: d.sourceConfig,
    connection_config: d.connectionConfig,
    schema_config: d.schemaConfig,
    ingestion_config: d.ingestionConfig,
  }));

export const marshalCreateStreamConnectionConfigSchema: z.ZodType = z
  .object({
    connectionConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('ucConnectionName'),
          ucConnectionName: z.string(),
        }),
        z.object({
          $case: z.literal('directMtlsConfig'),
          directMtlsConfig: z.lazy(() => marshalCreateDirectMtlsConfigSchema),
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

export const marshalCreateStreamSchemaConfigSchema: z.ZodType = z
  .object({
    schemaConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('directSchemas'),
          directSchemas: z.lazy(() => marshalCreateDirectSchemasSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.schemaConfig?.$case === 'directSchemas' && {
      direct_schemas: d.schemaConfig.directSchemas,
    }),
  }));

export const marshalCreateStreamSourceSchema: z.ZodType = z
  .object({
    fullName: z.string(),
    filterCondition: z.string().optional(),
  })
  .transform(d => ({
    full_name: d.fullName,
    filter_condition: d.filterCondition,
  }));

export const marshalCreateStreamSourceConfigSchema: z.ZodType = z
  .object({
    sourceConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('kafkaStreamConfig'),
          kafkaStreamConfig: z.lazy(() => marshalCreateKafkaStreamConfigSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.sourceConfig?.$case === 'kafkaStreamConfig' && {
      kafka_stream_config: d.sourceConfig.kafkaStreamConfig,
    }),
  }));

export const marshalCreateStreamingModeSchema: z.ZodType = z
  .object({
    mode: z.string().optional(),
  })
  .transform(d => ({
    mode: d.mode,
  }));

export const marshalCreateSubscriptionModeSchema: z.ZodType = z
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

export const marshalCreateSumFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateTableTriggerSchema: z.ZodType = z.object({});

export const marshalCreateTimeWindowSchema: z.ZodType = z
  .object({
    windowType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('continuous'),
          continuous: z.lazy(() => marshalCreateContinuousWindowSchema),
        }),
        z.object({
          $case: z.literal('tumbling'),
          tumbling: z.lazy(() => marshalCreateTumblingWindowSchema),
        }),
        z.object({
          $case: z.literal('sliding'),
          sliding: z.lazy(() => marshalCreateSlidingWindowSchema),
        }),
        z.object({
          $case: z.literal('rolling'),
          rolling: z.lazy(() => marshalCreateRollingWindowSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.windowType?.$case === 'continuous' && {
      continuous: d.windowType.continuous,
    }),
    ...(d.windowType?.$case === 'tumbling' && {
      tumbling: d.windowType.tumbling,
    }),
    ...(d.windowType?.$case === 'sliding' && {sliding: d.windowType.sliding}),
    ...(d.windowType?.$case === 'rolling' && {rolling: d.windowType.rolling}),
  }));

export const marshalCreateTimeseriesColumnSchema: z.ZodType = z
  .object({
    name: z.string(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalCreateTumblingWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase()),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
  }));

export const marshalCreateVarPopFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateVarSampFunctionSchema: z.ZodType = z
  .object({
    input: z.string(),
  })
  .transform(d => ({
    input: d.input,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalFunction_CreateExtraParameterSchema: z.ZodType = z
  .object({
    key: z.string(),
    value: z.string(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalFunction_UpdateExtraParameterSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalUpdateAggregationFunctionSchema: z.ZodType = z
  .object({
    operation: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('avg'),
          avg: z.lazy(() => marshalUpdateAvgFunctionSchema),
        }),
        z.object({
          $case: z.literal('countFunction'),
          countFunction: z.lazy(() => marshalUpdateCountFunctionSchema),
        }),
        z.object({
          $case: z.literal('sum'),
          sum: z.lazy(() => marshalUpdateSumFunctionSchema),
        }),
        z.object({
          $case: z.literal('min'),
          min: z.lazy(() => marshalUpdateMinFunctionSchema),
        }),
        z.object({
          $case: z.literal('max'),
          max: z.lazy(() => marshalUpdateMaxFunctionSchema),
        }),
        z.object({
          $case: z.literal('first'),
          first: z.lazy(() => marshalUpdateFirstFunctionSchema),
        }),
        z.object({
          $case: z.literal('last'),
          last: z.lazy(() => marshalUpdateLastFunctionSchema),
        }),
        z.object({
          $case: z.literal('approxCountDistinct'),
          approxCountDistinct: z.lazy(
            () => marshalUpdateApproxCountDistinctFunctionSchema
          ),
        }),
        z.object({
          $case: z.literal('approxPercentile'),
          approxPercentile: z.lazy(
            () => marshalUpdateApproxPercentileFunctionSchema
          ),
        }),
        z.object({
          $case: z.literal('stddevPop'),
          stddevPop: z.lazy(() => marshalUpdateStddevPopFunctionSchema),
        }),
        z.object({
          $case: z.literal('stddevSamp'),
          stddevSamp: z.lazy(() => marshalUpdateStddevSampFunctionSchema),
        }),
        z.object({
          $case: z.literal('varPop'),
          varPop: z.lazy(() => marshalUpdateVarPopFunctionSchema),
        }),
        z.object({
          $case: z.literal('varSamp'),
          varSamp: z.lazy(() => marshalUpdateVarSampFunctionSchema),
        }),
        z.object({
          $case: z.literal('firstN'),
          firstN: z.lazy(() => marshalUpdateFirstNFunctionSchema),
        }),
        z.object({
          $case: z.literal('lastN'),
          lastN: z.lazy(() => marshalUpdateLastNFunctionSchema),
        }),
        z.object({
          $case: z.literal('firstDistinctN'),
          firstDistinctN: z.lazy(
            () => marshalUpdateFirstDistinctNFunctionSchema
          ),
        }),
        z.object({
          $case: z.literal('lastDistinctN'),
          lastDistinctN: z.lazy(() => marshalUpdateLastDistinctNFunctionSchema),
        }),
      ])
      .optional(),
    timeWindow: z.lazy(() => marshalUpdateTimeWindowSchema).optional(),
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
    ...(d.operation?.$case === 'firstDistinctN' && {
      first_distinct_n: d.operation.firstDistinctN,
    }),
    ...(d.operation?.$case === 'lastDistinctN' && {
      last_distinct_n: d.operation.lastDistinctN,
    }),
    time_window: d.timeWindow,
  }));

export const marshalUpdateApproxCountDistinctFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
    relativeSd: z.number().optional(),
  })
  .transform(d => ({
    input: d.input,
    relative_sd: d.relativeSd,
  }));

export const marshalUpdateApproxPercentileFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
    percentile: z.number().optional(),
    accuracy: z.bigint().optional(),
  })
  .transform(d => ({
    input: d.input,
    percentile: d.percentile,
    accuracy: d.accuracy,
  }));

export const marshalUpdateAuthConfigSchema: z.ZodType = z
  .object({
    authConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('ucServiceCredentialName'),
          ucServiceCredentialName: z.string(),
        }),
        z.object({
          $case: z.literal('mtlsConfig'),
          mtlsConfig: z.lazy(() => marshalUpdateMtlsConfigSchema),
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

export const marshalUpdateAvgFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateBackfillSourceSchema: z.ZodType = z
  .object({
    backfillSource: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('deltaTableSource'),
          deltaTableSource: z.lazy(() => marshalUpdateDeltaTableSourceSchema),
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

export const marshalUpdateColumnIdentifierSchema: z.ZodType = z
  .object({
    variantExprPath: z.string().optional(),
  })
  .transform(d => ({
    variant_expr_path: d.variantExprPath,
  }));

export const marshalUpdateColumnSelectionSchema: z.ZodType = z
  .object({
    column: z.string().optional(),
  })
  .transform(d => ({
    column: d.column,
  }));

export const marshalUpdateContinuousWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
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
    offset: d.offset,
  }));

export const marshalUpdateCountFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateCronScheduleSchema: z.ZodType = z
  .object({
    cronExpression: z.string().optional(),
  })
  .transform(d => ({
    cron_expression: d.cronExpression,
  }));

export const marshalUpdateDataSourceSchema: z.ZodType = z
  .object({
    dataSource: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('deltaTableSource'),
          deltaTableSource: z.lazy(() => marshalUpdateDeltaTableSourceSchema),
        }),
        z.object({
          $case: z.literal('kafkaSource'),
          kafkaSource: z.lazy(() => marshalUpdateKafkaSourceSchema),
        }),
        z.object({
          $case: z.literal('requestSource'),
          requestSource: z.lazy(() => marshalUpdateRequestSourceSchema),
        }),
        z.object({
          $case: z.literal('streamSource'),
          streamSource: z.lazy(() => marshalUpdateStreamSourceSchema),
        }),
      ])
      .optional(),
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
  }));

export const marshalUpdateDeltaTableSourceSchema: z.ZodType = z
  .object({
    fullName: z.string().optional(),
    entityColumns: z.array(z.string()).optional(),
    timeseriesColumn: z.string().optional(),
    filterCondition: z.string().optional(),
    transformationSql: z.string().optional(),
    dataframeSchema: z.string().optional(),
  })
  .transform(d => ({
    full_name: d.fullName,
    entity_columns: d.entityColumns,
    timeseries_column: d.timeseriesColumn,
    filter_condition: d.filterCondition,
    transformation_sql: d.transformationSql,
    dataframe_schema: d.dataframeSchema,
  }));

export const marshalUpdateDirectMtlsConfigSchema: z.ZodType = z
  .object({
    bootstrapServers: z.string().optional(),
    mtlsConfig: z.lazy(() => marshalUpdateMtlsConfigSchema).optional(),
  })
  .transform(d => ({
    bootstrap_servers: d.bootstrapServers,
    mtls_config: d.mtlsConfig,
  }));

export const marshalUpdateDirectSchemasSchema: z.ZodType = z
  .object({
    payloadSchema: z.lazy(() => marshalUpdateSchemaConfigSchema).optional(),
    keySchema: z.lazy(() => marshalUpdateSchemaConfigSchema).optional(),
  })
  .transform(d => ({
    payload_schema: d.payloadSchema,
    key_schema: d.keySchema,
  }));

export const marshalUpdateEntityColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalUpdateFeatureSchema: z.ZodType = z
  .object({
    fullName: z.string().optional(),
    source: z.lazy(() => marshalUpdateDataSourceSchema).optional(),
    inputs: z.array(z.string()).optional(),
    function: z.lazy(() => marshalUpdateFunctionSchema).optional(),
    timeWindow: z.lazy(() => marshalUpdateTimeWindowSchema).optional(),
    description: z.string().optional(),
    filterCondition: z.string().optional(),
    lineageContext: z.lazy(() => marshalUpdateLineageContextSchema).optional(),
    entities: z.array(z.lazy(() => marshalUpdateEntityColumnSchema)).optional(),
    timeseriesColumn: z
      .lazy(() => marshalUpdateTimeseriesColumnSchema)
      .optional(),
  })
  .transform(d => ({
    full_name: d.fullName,
    source: d.source,
    inputs: d.inputs,
    function: d.function,
    time_window: d.timeWindow,
    description: d.description,
    filter_condition: d.filterCondition,
    lineage_context: d.lineageContext,
    entities: d.entities,
    timeseries_column: d.timeseriesColumn,
  }));

export const marshalUpdateFieldDefinitionSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    dataType: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    data_type: d.dataType,
  }));

export const marshalUpdateFirstDistinctNFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
    n: z.bigint().optional(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalUpdateFirstFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateFirstNFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
    n: z.bigint().optional(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalUpdateFlatSchemaSchema: z.ZodType = z
  .object({
    fields: z
      .array(z.lazy(() => marshalUpdateFieldDefinitionSchema))
      .optional(),
  })
  .transform(d => ({
    fields: d.fields,
  }));

export const marshalUpdateFunctionSchema: z.ZodType = z
  .object({
    functionType: z.string().optional(),
    extraParameters: z
      .array(z.lazy(() => marshalFunction_UpdateExtraParameterSchema))
      .optional(),
    function: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('aggregationFunction'),
          aggregationFunction: z.lazy(
            () => marshalUpdateAggregationFunctionSchema
          ),
        }),
        z.object({
          $case: z.literal('columnSelection'),
          columnSelection: z.lazy(() => marshalUpdateColumnSelectionSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    function_type: d.functionType,
    extra_parameters: d.extraParameters,
    ...(d.function?.$case === 'aggregationFunction' && {
      aggregation_function: d.function.aggregationFunction,
    }),
    ...(d.function?.$case === 'columnSelection' && {
      column_selection: d.function.columnSelection,
    }),
  }));

export const marshalUpdateIngestionConfigSchema: z.ZodType = z
  .object({
    ingestionDestination: z
      .lazy(() => marshalUpdateIngestionDestinationSchema)
      .optional(),
    backfillSource: z.lazy(() => marshalUpdateBackfillSourceSchema).optional(),
    deduplicationColumns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    ingestion_destination: d.ingestionDestination,
    backfill_source: d.backfillSource,
    deduplication_columns: d.deduplicationColumns,
  }));

export const marshalUpdateIngestionDestinationSchema: z.ZodType = z
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

export const marshalUpdateJobContextSchema: z.ZodType = z
  .object({
    jobId: z.bigint().optional(),
    jobRunId: z.bigint().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    job_run_id: d.jobRunId,
  }));

export const marshalUpdateKafkaConfigSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    bootstrapServers: z.string().optional(),
    subscriptionMode: z
      .lazy(() => marshalUpdateSubscriptionModeSchema)
      .optional(),
    authConfig: z.lazy(() => marshalUpdateAuthConfigSchema).optional(),
    keySchema: z.lazy(() => marshalUpdateSchemaConfigSchema).optional(),
    valueSchema: z.lazy(() => marshalUpdateSchemaConfigSchema).optional(),
    extraOptions: z.record(z.string(), z.string()).optional(),
    backfillSource: z.lazy(() => marshalUpdateBackfillSourceSchema).optional(),
    ingestionConfig: z
      .lazy(() => marshalUpdateIngestionConfigSchema)
      .optional(),
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

export const marshalUpdateKafkaSourceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    entityColumnIdentifiers: z
      .array(z.lazy(() => marshalUpdateColumnIdentifierSchema))
      .optional(),
    timeseriesColumnIdentifier: z
      .lazy(() => marshalUpdateColumnIdentifierSchema)
      .optional(),
    filterCondition: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    entity_column_identifiers: d.entityColumnIdentifiers,
    timeseries_column_identifier: d.timeseriesColumnIdentifier,
    filter_condition: d.filterCondition,
  }));

export const marshalUpdateKafkaStreamConfigSchema: z.ZodType = z
  .object({
    subscriptionMode: z
      .lazy(() => marshalUpdateKafkaSubscriptionModeSchema)
      .optional(),
    extraOptions: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    subscription_mode: d.subscriptionMode,
    extra_options: d.extraOptions,
  }));

export const marshalUpdateKafkaSubscriptionModeSchema: z.ZodType = z
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

export const marshalUpdateLastDistinctNFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
    n: z.bigint().optional(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalUpdateLastFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateLastNFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
    n: z.bigint().optional(),
  })
  .transform(d => ({
    input: d.input,
    n: d.n,
  }));

export const marshalUpdateLineageContextSchema: z.ZodType = z
  .object({
    notebookId: z.bigint().optional(),
    jobContext: z.lazy(() => marshalUpdateJobContextSchema).optional(),
  })
  .transform(d => ({
    notebook_id: d.notebookId,
    job_context: d.jobContext,
  }));

export const marshalUpdateMaterializedFeatureSchema: z.ZodType = z
  .object({
    materializedFeatureId: z.string().optional(),
    featureName: z.string().optional(),
    destination: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('offlineStoreConfig'),
          offlineStoreConfig: z.lazy(
            () => marshalUpdateOfflineStoreConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('onlineStoreConfig'),
          onlineStoreConfig: z.lazy(() => marshalUpdateOnlineStoreConfigSchema),
        }),
      ])
      .optional(),
    pipelineScheduleState: z.string().optional(),
    cronSchedule: z.string().optional(),
    trigger: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('cronScheduleTrigger'),
          cronScheduleTrigger: z.lazy(() => marshalUpdateCronScheduleSchema),
        }),
        z.object({
          $case: z.literal('tableTrigger'),
          tableTrigger: z.lazy(() => marshalUpdateTableTriggerSchema),
        }),
        z.object({
          $case: z.literal('streamingMode'),
          streamingMode: z.lazy(() => marshalUpdateStreamingModeSchema),
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
    pipeline_schedule_state: d.pipelineScheduleState,
    cron_schedule: d.cronSchedule,
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

export const marshalUpdateMaxFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateMinFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateMtlsConfigSchema: z.ZodType = z
  .object({
    keystoreLocation: z.string().optional(),
    keystorePasswordRef: z
      .lazy(() => marshalUpdateSecretScopeReferenceSchema)
      .optional(),
    keyPasswordRef: z
      .lazy(() => marshalUpdateSecretScopeReferenceSchema)
      .optional(),
    truststoreLocation: z.string().optional(),
    truststorePasswordRef: z
      .lazy(() => marshalUpdateSecretScopeReferenceSchema)
      .optional(),
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

export const marshalUpdateOfflineStoreConfigSchema: z.ZodType = z
  .object({
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    tableNamePrefix: z.string().optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    table_name_prefix: d.tableNamePrefix,
  }));

export const marshalUpdateOnlineStoreConfigSchema: z.ZodType = z
  .object({
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    tableNamePrefix: z.string().optional(),
    onlineStoreName: z.string().optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    table_name_prefix: d.tableNamePrefix,
    online_store_name: d.onlineStoreName,
  }));

export const marshalUpdateRequestSourceSchema: z.ZodType = z
  .object({
    schema: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('flatSchema'),
          flatSchema: z.lazy(() => marshalUpdateFlatSchemaSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.schema?.$case === 'flatSchema' && {flat_schema: d.schema.flatSchema}),
  }));

export const marshalUpdateRollingWindowSchema: z.ZodType = z
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

export const marshalUpdateSchemaConfigSchema: z.ZodType = z
  .object({
    schema: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('jsonSchema'), jsonSchema: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.schema?.$case === 'jsonSchema' && {json_schema: d.schema.jsonSchema}),
  }));

export const marshalUpdateSecretScopeReferenceSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    key: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    key: d.key,
  }));

export const marshalUpdateSlidingWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
    slideDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
    slide_duration: d.slideDuration,
  }));

export const marshalUpdateStddevPopFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateStddevSampFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateStreamSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    sourceConfig: z
      .lazy(() => marshalUpdateStreamSourceConfigSchema)
      .optional(),
    connectionConfig: z
      .lazy(() => marshalUpdateStreamConnectionConfigSchema)
      .optional(),
    schemaConfig: z
      .lazy(() => marshalUpdateStreamSchemaConfigSchema)
      .optional(),
    ingestionConfig: z
      .lazy(() => marshalUpdateIngestionConfigSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    source_config: d.sourceConfig,
    connection_config: d.connectionConfig,
    schema_config: d.schemaConfig,
    ingestion_config: d.ingestionConfig,
  }));

export const marshalUpdateStreamConnectionConfigSchema: z.ZodType = z
  .object({
    connectionConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('ucConnectionName'),
          ucConnectionName: z.string(),
        }),
        z.object({
          $case: z.literal('directMtlsConfig'),
          directMtlsConfig: z.lazy(() => marshalUpdateDirectMtlsConfigSchema),
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

export const marshalUpdateStreamSchemaConfigSchema: z.ZodType = z
  .object({
    schemaConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('directSchemas'),
          directSchemas: z.lazy(() => marshalUpdateDirectSchemasSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.schemaConfig?.$case === 'directSchemas' && {
      direct_schemas: d.schemaConfig.directSchemas,
    }),
  }));

export const marshalUpdateStreamSourceSchema: z.ZodType = z
  .object({
    fullName: z.string().optional(),
    filterCondition: z.string().optional(),
  })
  .transform(d => ({
    full_name: d.fullName,
    filter_condition: d.filterCondition,
  }));

export const marshalUpdateStreamSourceConfigSchema: z.ZodType = z
  .object({
    sourceConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('kafkaStreamConfig'),
          kafkaStreamConfig: z.lazy(() => marshalUpdateKafkaStreamConfigSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.sourceConfig?.$case === 'kafkaStreamConfig' && {
      kafka_stream_config: d.sourceConfig.kafkaStreamConfig,
    }),
  }));

export const marshalUpdateStreamingModeSchema: z.ZodType = z
  .object({
    mode: z.string().optional(),
  })
  .transform(d => ({
    mode: d.mode,
  }));

export const marshalUpdateSubscriptionModeSchema: z.ZodType = z
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

export const marshalUpdateSumFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateTableTriggerSchema: z.ZodType = z.object({});

export const marshalUpdateTimeWindowSchema: z.ZodType = z
  .object({
    windowType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('continuous'),
          continuous: z.lazy(() => marshalUpdateContinuousWindowSchema),
        }),
        z.object({
          $case: z.literal('tumbling'),
          tumbling: z.lazy(() => marshalUpdateTumblingWindowSchema),
        }),
        z.object({
          $case: z.literal('sliding'),
          sliding: z.lazy(() => marshalUpdateSlidingWindowSchema),
        }),
        z.object({
          $case: z.literal('rolling'),
          rolling: z.lazy(() => marshalUpdateRollingWindowSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.windowType?.$case === 'continuous' && {
      continuous: d.windowType.continuous,
    }),
    ...(d.windowType?.$case === 'tumbling' && {
      tumbling: d.windowType.tumbling,
    }),
    ...(d.windowType?.$case === 'sliding' && {sliding: d.windowType.sliding}),
    ...(d.windowType?.$case === 'rolling' && {rolling: d.windowType.rolling}),
  }));

export const marshalUpdateTimeseriesColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalUpdateTumblingWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
  }));

export const marshalUpdateVarPopFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalUpdateVarSampFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

const updateAggregationFunctionFieldMaskSchema: FieldMaskSchema = {
  approxCountDistinct: {
    wire: 'approx_count_distinct',
    children: () => updateApproxCountDistinctFunctionFieldMaskSchema,
  },
  approxPercentile: {
    wire: 'approx_percentile',
    children: () => updateApproxPercentileFunctionFieldMaskSchema,
  },
  avg: {wire: 'avg', children: () => updateAvgFunctionFieldMaskSchema},
  countFunction: {
    wire: 'count_function',
    children: () => updateCountFunctionFieldMaskSchema,
  },
  first: {wire: 'first', children: () => updateFirstFunctionFieldMaskSchema},
  firstDistinctN: {
    wire: 'first_distinct_n',
    children: () => updateFirstDistinctNFunctionFieldMaskSchema,
  },
  firstN: {
    wire: 'first_n',
    children: () => updateFirstNFunctionFieldMaskSchema,
  },
  last: {wire: 'last', children: () => updateLastFunctionFieldMaskSchema},
  lastDistinctN: {
    wire: 'last_distinct_n',
    children: () => updateLastDistinctNFunctionFieldMaskSchema,
  },
  lastN: {wire: 'last_n', children: () => updateLastNFunctionFieldMaskSchema},
  max: {wire: 'max', children: () => updateMaxFunctionFieldMaskSchema},
  min: {wire: 'min', children: () => updateMinFunctionFieldMaskSchema},
  stddevPop: {
    wire: 'stddev_pop',
    children: () => updateStddevPopFunctionFieldMaskSchema,
  },
  stddevSamp: {
    wire: 'stddev_samp',
    children: () => updateStddevSampFunctionFieldMaskSchema,
  },
  sum: {wire: 'sum', children: () => updateSumFunctionFieldMaskSchema},
  timeWindow: {
    wire: 'time_window',
    children: () => updateTimeWindowFieldMaskSchema,
  },
  varPop: {
    wire: 'var_pop',
    children: () => updateVarPopFunctionFieldMaskSchema,
  },
  varSamp: {
    wire: 'var_samp',
    children: () => updateVarSampFunctionFieldMaskSchema,
  },
};

const updateApproxCountDistinctFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  relativeSd: {wire: 'relative_sd'},
};

const updateApproxPercentileFunctionFieldMaskSchema: FieldMaskSchema = {
  accuracy: {wire: 'accuracy'},
  input: {wire: 'input'},
  percentile: {wire: 'percentile'},
};

const updateAuthConfigFieldMaskSchema: FieldMaskSchema = {
  mtlsConfig: {
    wire: 'mtls_config',
    children: () => updateMtlsConfigFieldMaskSchema,
  },
  ucServiceCredentialName: {wire: 'uc_service_credential_name'},
};

const updateAvgFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateBackfillSourceFieldMaskSchema: FieldMaskSchema = {
  deltaTableName: {wire: 'delta_table_name'},
  deltaTableSource: {
    wire: 'delta_table_source',
    children: () => updateDeltaTableSourceFieldMaskSchema,
  },
};

const updateColumnIdentifierFieldMaskSchema: FieldMaskSchema = {
  variantExprPath: {wire: 'variant_expr_path'},
};

const updateColumnSelectionFieldMaskSchema: FieldMaskSchema = {
  column: {wire: 'column'},
};

const updateContinuousWindowFieldMaskSchema: FieldMaskSchema = {
  offset: {wire: 'offset'},
  windowDuration: {wire: 'window_duration'},
};

const updateCountFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateCronScheduleFieldMaskSchema: FieldMaskSchema = {
  cronExpression: {wire: 'cron_expression'},
};

const updateDataSourceFieldMaskSchema: FieldMaskSchema = {
  deltaTableSource: {
    wire: 'delta_table_source',
    children: () => updateDeltaTableSourceFieldMaskSchema,
  },
  kafkaSource: {
    wire: 'kafka_source',
    children: () => updateKafkaSourceFieldMaskSchema,
  },
  requestSource: {
    wire: 'request_source',
    children: () => updateRequestSourceFieldMaskSchema,
  },
  streamSource: {
    wire: 'stream_source',
    children: () => updateStreamSourceFieldMaskSchema,
  },
};

const updateDeltaTableSourceFieldMaskSchema: FieldMaskSchema = {
  dataframeSchema: {wire: 'dataframe_schema'},
  entityColumns: {wire: 'entity_columns'},
  filterCondition: {wire: 'filter_condition'},
  fullName: {wire: 'full_name'},
  timeseriesColumn: {wire: 'timeseries_column'},
  transformationSql: {wire: 'transformation_sql'},
};

const updateDirectMtlsConfigFieldMaskSchema: FieldMaskSchema = {
  bootstrapServers: {wire: 'bootstrap_servers'},
  mtlsConfig: {
    wire: 'mtls_config',
    children: () => updateMtlsConfigFieldMaskSchema,
  },
};

const updateDirectSchemasFieldMaskSchema: FieldMaskSchema = {
  keySchema: {
    wire: 'key_schema',
    children: () => updateSchemaConfigFieldMaskSchema,
  },
  payloadSchema: {
    wire: 'payload_schema',
    children: () => updateSchemaConfigFieldMaskSchema,
  },
};

const updateFeatureFieldMaskSchema: FieldMaskSchema = {
  description: {wire: 'description'},
  entities: {wire: 'entities'},
  filterCondition: {wire: 'filter_condition'},
  fullName: {wire: 'full_name'},
  function: {wire: 'function', children: () => updateFunctionFieldMaskSchema},
  inputs: {wire: 'inputs'},
  lineageContext: {
    wire: 'lineage_context',
    children: () => updateLineageContextFieldMaskSchema,
  },
  source: {wire: 'source', children: () => updateDataSourceFieldMaskSchema},
  timeWindow: {
    wire: 'time_window',
    children: () => updateTimeWindowFieldMaskSchema,
  },
  timeseriesColumn: {
    wire: 'timeseries_column',
    children: () => updateTimeseriesColumnFieldMaskSchema,
  },
};

export function updateFeatureFieldMask(
  ...paths: string[]
): FieldMask<UpdateFeature> {
  return FieldMask.build<UpdateFeature>(paths, updateFeatureFieldMaskSchema);
}

const updateFirstDistinctNFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  n: {wire: 'n'},
};

const updateFirstFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateFirstNFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  n: {wire: 'n'},
};

const updateFlatSchemaFieldMaskSchema: FieldMaskSchema = {
  fields: {wire: 'fields'},
};

const updateFunctionFieldMaskSchema: FieldMaskSchema = {
  aggregationFunction: {
    wire: 'aggregation_function',
    children: () => updateAggregationFunctionFieldMaskSchema,
  },
  columnSelection: {
    wire: 'column_selection',
    children: () => updateColumnSelectionFieldMaskSchema,
  },
  extraParameters: {wire: 'extra_parameters'},
  functionType: {wire: 'function_type'},
};

const updateIngestionConfigFieldMaskSchema: FieldMaskSchema = {
  backfillSource: {
    wire: 'backfill_source',
    children: () => updateBackfillSourceFieldMaskSchema,
  },
  deduplicationColumns: {wire: 'deduplication_columns'},
  ingestionDestination: {
    wire: 'ingestion_destination',
    children: () => updateIngestionDestinationFieldMaskSchema,
  },
};

const updateIngestionDestinationFieldMaskSchema: FieldMaskSchema = {
  deltaTableName: {wire: 'delta_table_name'},
};

const updateJobContextFieldMaskSchema: FieldMaskSchema = {
  jobId: {wire: 'job_id'},
  jobRunId: {wire: 'job_run_id'},
};

const updateKafkaConfigFieldMaskSchema: FieldMaskSchema = {
  authConfig: {
    wire: 'auth_config',
    children: () => updateAuthConfigFieldMaskSchema,
  },
  backfillSource: {
    wire: 'backfill_source',
    children: () => updateBackfillSourceFieldMaskSchema,
  },
  bootstrapServers: {wire: 'bootstrap_servers'},
  extraOptions: {wire: 'extra_options'},
  ingestionConfig: {
    wire: 'ingestion_config',
    children: () => updateIngestionConfigFieldMaskSchema,
  },
  keySchema: {
    wire: 'key_schema',
    children: () => updateSchemaConfigFieldMaskSchema,
  },
  name: {wire: 'name'},
  subscriptionMode: {
    wire: 'subscription_mode',
    children: () => updateSubscriptionModeFieldMaskSchema,
  },
  valueSchema: {
    wire: 'value_schema',
    children: () => updateSchemaConfigFieldMaskSchema,
  },
};

export function updateKafkaConfigFieldMask(
  ...paths: string[]
): FieldMask<UpdateKafkaConfig> {
  return FieldMask.build<UpdateKafkaConfig>(
    paths,
    updateKafkaConfigFieldMaskSchema
  );
}

const updateKafkaSourceFieldMaskSchema: FieldMaskSchema = {
  entityColumnIdentifiers: {wire: 'entity_column_identifiers'},
  filterCondition: {wire: 'filter_condition'},
  name: {wire: 'name'},
  timeseriesColumnIdentifier: {
    wire: 'timeseries_column_identifier',
    children: () => updateColumnIdentifierFieldMaskSchema,
  },
};

const updateKafkaStreamConfigFieldMaskSchema: FieldMaskSchema = {
  extraOptions: {wire: 'extra_options'},
  subscriptionMode: {
    wire: 'subscription_mode',
    children: () => updateKafkaSubscriptionModeFieldMaskSchema,
  },
};

const updateKafkaSubscriptionModeFieldMaskSchema: FieldMaskSchema = {
  assign: {wire: 'assign'},
  subscribe: {wire: 'subscribe'},
  subscribePattern: {wire: 'subscribe_pattern'},
};

const updateLastDistinctNFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  n: {wire: 'n'},
};

const updateLastFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateLastNFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
  n: {wire: 'n'},
};

const updateLineageContextFieldMaskSchema: FieldMaskSchema = {
  jobContext: {
    wire: 'job_context',
    children: () => updateJobContextFieldMaskSchema,
  },
  notebookId: {wire: 'notebook_id'},
};

const updateMaterializedFeatureFieldMaskSchema: FieldMaskSchema = {
  cronSchedule: {wire: 'cron_schedule'},
  cronScheduleTrigger: {
    wire: 'cron_schedule_trigger',
    children: () => updateCronScheduleFieldMaskSchema,
  },
  featureName: {wire: 'feature_name'},
  materializedFeatureId: {wire: 'materialized_feature_id'},
  offlineStoreConfig: {
    wire: 'offline_store_config',
    children: () => updateOfflineStoreConfigFieldMaskSchema,
  },
  onlineStoreConfig: {
    wire: 'online_store_config',
    children: () => updateOnlineStoreConfigFieldMaskSchema,
  },
  pipelineScheduleState: {wire: 'pipeline_schedule_state'},
  streamingMode: {
    wire: 'streaming_mode',
    children: () => updateStreamingModeFieldMaskSchema,
  },
  tableTrigger: {
    wire: 'table_trigger',
    children: () => updateTableTriggerFieldMaskSchema,
  },
};

export function updateMaterializedFeatureFieldMask(
  ...paths: string[]
): FieldMask<UpdateMaterializedFeature> {
  return FieldMask.build<UpdateMaterializedFeature>(
    paths,
    updateMaterializedFeatureFieldMaskSchema
  );
}

const updateMaxFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateMinFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateMtlsConfigFieldMaskSchema: FieldMaskSchema = {
  disableHostnameVerification: {wire: 'disable_hostname_verification'},
  keyPasswordRef: {
    wire: 'key_password_ref',
    children: () => updateSecretScopeReferenceFieldMaskSchema,
  },
  keystoreLocation: {wire: 'keystore_location'},
  keystorePasswordRef: {
    wire: 'keystore_password_ref',
    children: () => updateSecretScopeReferenceFieldMaskSchema,
  },
  truststoreLocation: {wire: 'truststore_location'},
  truststorePasswordRef: {
    wire: 'truststore_password_ref',
    children: () => updateSecretScopeReferenceFieldMaskSchema,
  },
};

const updateOfflineStoreConfigFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  schemaName: {wire: 'schema_name'},
  tableNamePrefix: {wire: 'table_name_prefix'},
};

const updateOnlineStoreConfigFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  onlineStoreName: {wire: 'online_store_name'},
  schemaName: {wire: 'schema_name'},
  tableNamePrefix: {wire: 'table_name_prefix'},
};

const updateRequestSourceFieldMaskSchema: FieldMaskSchema = {
  flatSchema: {
    wire: 'flat_schema',
    children: () => updateFlatSchemaFieldMaskSchema,
  },
};

const updateRollingWindowFieldMaskSchema: FieldMaskSchema = {
  delay: {wire: 'delay'},
  windowDuration: {wire: 'window_duration'},
};

const updateSchemaConfigFieldMaskSchema: FieldMaskSchema = {
  jsonSchema: {wire: 'json_schema'},
};

const updateSecretScopeReferenceFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  scope: {wire: 'scope'},
};

const updateSlidingWindowFieldMaskSchema: FieldMaskSchema = {
  slideDuration: {wire: 'slide_duration'},
  windowDuration: {wire: 'window_duration'},
};

const updateStddevPopFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateStddevSampFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateStreamFieldMaskSchema: FieldMaskSchema = {
  connectionConfig: {
    wire: 'connection_config',
    children: () => updateStreamConnectionConfigFieldMaskSchema,
  },
  description: {wire: 'description'},
  ingestionConfig: {
    wire: 'ingestion_config',
    children: () => updateIngestionConfigFieldMaskSchema,
  },
  name: {wire: 'name'},
  schemaConfig: {
    wire: 'schema_config',
    children: () => updateStreamSchemaConfigFieldMaskSchema,
  },
  sourceConfig: {
    wire: 'source_config',
    children: () => updateStreamSourceConfigFieldMaskSchema,
  },
};

export function updateStreamFieldMask(
  ...paths: string[]
): FieldMask<UpdateStream> {
  return FieldMask.build<UpdateStream>(paths, updateStreamFieldMaskSchema);
}

const updateStreamConnectionConfigFieldMaskSchema: FieldMaskSchema = {
  directMtlsConfig: {
    wire: 'direct_mtls_config',
    children: () => updateDirectMtlsConfigFieldMaskSchema,
  },
  ucConnectionName: {wire: 'uc_connection_name'},
};

const updateStreamSchemaConfigFieldMaskSchema: FieldMaskSchema = {
  directSchemas: {
    wire: 'direct_schemas',
    children: () => updateDirectSchemasFieldMaskSchema,
  },
};

const updateStreamSourceFieldMaskSchema: FieldMaskSchema = {
  filterCondition: {wire: 'filter_condition'},
  fullName: {wire: 'full_name'},
};

const updateStreamSourceConfigFieldMaskSchema: FieldMaskSchema = {
  kafkaStreamConfig: {
    wire: 'kafka_stream_config',
    children: () => updateKafkaStreamConfigFieldMaskSchema,
  },
};

const updateStreamingModeFieldMaskSchema: FieldMaskSchema = {
  mode: {wire: 'mode'},
};

const updateSubscriptionModeFieldMaskSchema: FieldMaskSchema = {
  assign: {wire: 'assign'},
  subscribe: {wire: 'subscribe'},
  subscribePattern: {wire: 'subscribe_pattern'},
};

const updateSumFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateTableTriggerFieldMaskSchema: FieldMaskSchema = {};

const updateTimeWindowFieldMaskSchema: FieldMaskSchema = {
  continuous: {
    wire: 'continuous',
    children: () => updateContinuousWindowFieldMaskSchema,
  },
  rolling: {
    wire: 'rolling',
    children: () => updateRollingWindowFieldMaskSchema,
  },
  sliding: {
    wire: 'sliding',
    children: () => updateSlidingWindowFieldMaskSchema,
  },
  tumbling: {
    wire: 'tumbling',
    children: () => updateTumblingWindowFieldMaskSchema,
  },
};

const updateTimeseriesColumnFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

const updateTumblingWindowFieldMaskSchema: FieldMaskSchema = {
  windowDuration: {wire: 'window_duration'},
};

const updateVarPopFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const updateVarSampFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};
