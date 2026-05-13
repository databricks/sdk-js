// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/**
 * Scalar data types for request-time field definitions.
 * Only flat (non-nested) types are supported.
 */
export enum ScalarDataType {
  SCALAR_DATA_TYPE_UNSPECIFIED = 'SCALAR_DATA_TYPE_UNSPECIFIED',
  INTEGER = 'INTEGER',
  FLOAT = 'FLOAT',
  BOOLEAN = 'BOOLEAN',
  STRING = 'STRING',
  DOUBLE = 'DOUBLE',
  LONG = 'LONG',
  TIMESTAMP = 'TIMESTAMP',
  DATE = 'DATE',
  SHORT = 'SHORT',
  BINARY = 'BINARY',
  DECIMAL = 'DECIMAL',
}

/** Deprecated: Use the function-specific messages in AggregationFunction.function_type oneof instead. Kept for backwards compatibility. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum Function_FunctionType {
  FUNCTION_TYPE_UNSPECIFIED = 'FUNCTION_TYPE_UNSPECIFIED',
  AVG = 'AVG',
  COUNT = 'COUNT',
  SUM = 'SUM',
  MIN = 'MIN',
  MAX = 'MAX',
  FIRST = 'FIRST',
  LAST = 'LAST',
  APPROX_COUNT_DISTINCT = 'APPROX_COUNT_DISTINCT',
  APPROX_PERCENTILE = 'APPROX_PERCENTILE',
  STDDEV_POP = 'STDDEV_POP',
  STDDEV_SAMP = 'STDDEV_SAMP',
  VAR_POP = 'VAR_POP',
  VAR_SAMP = 'VAR_SAMP',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum MaterializedFeature_PipelineScheduleState {
  /** Default value, not used. */
  PIPELINE_SCHEDULE_STATE_UNSPECIFIED = 'PIPELINE_SCHEDULE_STATE_UNSPECIFIED',
  /** Pipeline was configured to run once then stop. */
  SNAPSHOT = 'SNAPSHOT',
  /** Pipeline is actively running and computing features. */
  ACTIVE = 'ACTIVE',
  /** Pipeline is paused and not computing features. */
  PAUSED = 'PAUSED',
}

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
  accuracy?: number | undefined;
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
   * TODO(FS-939): Colon-prefixed notation (e.g., "value:amount") is supported for backwards
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
  requests?: CreateMaterializedFeatureRequest[] | undefined;
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
   * TODO(FS-939): Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input?: string | undefined;
}

export interface CreateFeatureRequest {
  /** Feature to create. */
  feature?: Feature | undefined;
}

export interface CreateKafkaConfigRequest {
  kafkaConfig?: KafkaConfig | undefined;
}

export interface CreateMaterializedFeatureRequest {
  /** The materialized feature to create. */
  materializedFeature?: MaterializedFeature | undefined;
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

export interface EntityColumn {
  /**
   * The name of the entity column. For Kafka sources, use dot-prefixed path notation to reference
   * fields within the key or value schema (e.g., "value.user_id", "key.partition_key"). For nested
   * fields, the leaf node name (e.g., "user_id" from "value.trip_details.user_id") is what will
   * be present in materialized tables and expected to match at query time.
   * TODO(FS-939): Colon-prefixed notation (e.g., "value:user_id") is supported for backwards
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

/** Returns the first value. */
export interface FirstFunction {
  /** The input column from which the first value is returned. */
  input?: string | undefined;
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
export interface Function_ExtraParameter {
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

export interface JobContext {
  /** The job ID where this API invoked. */
  jobId?: number | undefined;
  /** The job run ID where this API was invoked. */
  jobRunId?: number | undefined;
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
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface KafkaConfig_ExtraOptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
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
  /** The pipeline runs these SQL statements immediately after conversion into the schema specified on the KafkaConfig object. */
  transformationSql?: string | undefined;
  /**
   * Schema of the resulting dataframe after transformations, in Spark StructType JSON format (from df.schema.json()).
   * Any subsequent functions operate against this dataframe.
   */
  dataframeSchema?: string | undefined;
}

/** Returns the last value. */
export interface LastFunction {
  /** The input column from which the last value is returned. */
  input?: string | undefined;
}

/** Lineage context information for tracking where an API was invoked. This will allow us to track lineage, which currently uses caller entity information for use across the Lineage Client and Observability in Lumberjack. */
export interface LineageContext {
  /** The notebook ID where this API was invoked. */
  notebookId?: number | undefined;
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

/** A materialized feature represents a feature that is continuously computed and stored. */
export interface MaterializedFeature {
  /** Unique identifier for the materialized feature. */
  materializedFeatureId?: string | undefined;
  /** The full name of the feature in Unity Catalog. */
  featureName?: string | undefined;
  /** The destination configuration for the materialized feature. Required on create, not returned in responses. */
  destination?:
    | {$case: 'offlineStoreConfig'; offlineStoreConfig: OfflineStoreConfig}
    | {$case: 'onlineStoreConfig'; onlineStoreConfig: OnlineStoreConfig}
    | undefined;
  /** The fully qualified Unity Catalog path to the table containing the materialized feature (Delta table or Lakebase table). Output only. */
  tableName?: string | undefined;
  /** The schedule state of the materialization pipeline. */
  pipelineScheduleState?: MaterializedFeature_PipelineScheduleState | undefined;
  /**
   * The timestamp when the pipeline last ran and updated the materialized feature values.
   * If the pipeline has not run yet, this field will be null.
   */
  lastMaterializationTime?: Temporal.Instant | undefined;
  /** The quartz cron expression that defines the schedule of the materialization pipeline. The schedule is evaluated in the UTC timezone. */
  cronSchedule?: string | undefined;
  /** True if this is an online materialized feature. False if it is an offline materialized feature. */
  isOnline?: boolean | undefined;
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

/**
 * A Protocol Buffer schema paired with the name of the message within it that describes the
 * Kafka payload. A .proto file may declare multiple messages; message_name disambiguates.
 * Fields below are semantically required and enforced server-side. They are marked OPTIONAL
 * (not REQUIRED) to work around an OpenAPI normalization bug: the tool strips DEVELOPMENT-stage
 * fields from `properties` but not from `required`, producing invalid specs.
 */
export interface ProtoSchemaSpec {
  /**
   * The raw .proto file text (proto2 and proto3 syntax supported, see
   * https://protobuf.dev/programming-guides/proto3/ and https://protobuf.dev/programming-guides/proto2/).
   */
  schemaText?: string | undefined;
  /**
   * The fully-qualified name of the message within schema_text that describes the Kafka payload
   * (e.g. "Event" or "com.example.Event" if schema_text declares a package). Identifies which
   * message is used to decode each Kafka record — a .proto file may declare multiple messages
   * but only one represents the payload. Must not be empty.
   */
  messageName?: string | undefined;
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
   * TODO(FS-939): Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input?: string | undefined;
}

/** Computes the sample standard deviation. */
export interface StddevSampFunction {
  /** The input column from which the sample standard deviation is computed. */
  input?: string | undefined;
}

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
   * TODO(FS-939): Colon-prefixed notation (e.g., "value:amount") is supported for backwards
   * compatibility but is deprecated; migrate to dot notation.
   */
  input?: string | undefined;
}

export interface TimeWindow {
  windowType?:
    | {$case: 'continuous'; continuous: ContinuousWindow}
    | {$case: 'tumbling'; tumbling: TumblingWindow}
    | {$case: 'sliding'; sliding: SlidingWindow}
    | undefined;
}

export interface TimeseriesColumn {
  /**
   * The name of the timeseries column. For Kafka sources, use dot-prefixed path notation to
   * reference fields within the key or value schema (e.g., "value.event_timestamp"). For nested
   * fields, the leaf node name (e.g., "event_timestamp" from "value.event_details.event_timestamp")
   * is what will be present in materialized tables and expected to match at query time.
   * TODO(FS-939): Colon-prefixed notation (e.g., "value:event_timestamp") is supported for
   * backwards compatibility but is deprecated; migrate to dot notation.
   */
  name?: string | undefined;
}

export interface TumblingWindow {
  /** The duration of each tumbling window (non-overlapping, fixed-duration windows). */
  windowDuration?: Temporal.Duration | undefined;
}

export interface UpdateFeatureRequest {
  /** Feature to update. */
  feature?: Feature | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<Feature> | undefined;
}

export interface UpdateKafkaConfigRequest {
  /** The Kafka config to update. */
  kafkaConfig?: KafkaConfig | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<KafkaConfig> | undefined;
}

export interface UpdateMaterializedFeatureRequest {
  /** The materialized feature to update. */
  materializedFeature?: MaterializedFeature | undefined;
  /**
   * Provide the materialization feature fields which should be updated.
   * Currently, only the pipeline_state field can be updated.
   */
  updateMask?: FieldMask<MaterializedFeature> | undefined;
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
      accuracy: z.number().optional(),
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

export const unmarshalDataSourceSchema: z.ZodType<DataSource> = z
  .object({
    delta_table_source: z
      .lazy(() => unmarshalDeltaTableSourceSchema)
      .optional(),
    kafka_source: z.lazy(() => unmarshalKafkaSourceSchema).optional(),
    request_source: z.lazy(() => unmarshalRequestSourceSchema).optional(),
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
    data_type: z.enum(ScalarDataType).optional(),
  })
  .transform(d => ({
    name: d.name,
    dataType: d.data_type,
  }));

export const unmarshalFirstFunctionSchema: z.ZodType<FirstFunction> = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
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
    function_type: z.enum(Function_FunctionType).optional(),
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

export const unmarshalJobContextSchema: z.ZodType<JobContext> = z
  .object({
    job_id: z.number().optional(),
    job_run_id: z.number().optional(),
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
    transformation_sql: z.string().optional(),
    dataframe_schema: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    entityColumnIdentifiers: d.entity_column_identifiers,
    timeseriesColumnIdentifier: d.timeseries_column_identifier,
    filterCondition: d.filter_condition,
    transformationSql: d.transformation_sql,
    dataframeSchema: d.dataframe_schema,
  }));

export const unmarshalLastFunctionSchema: z.ZodType<LastFunction> = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const unmarshalLineageContextSchema: z.ZodType<LineageContext> = z
  .object({
    notebook_id: z.number().optional(),
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
      pipeline_schedule_state: z
        .enum(MaterializedFeature_PipelineScheduleState)
        .optional(),
      last_materialization_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      cron_schedule: z.string().optional(),
      is_online: z.boolean().optional(),
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

export const unmarshalProtoSchemaSpecSchema: z.ZodType<ProtoSchemaSpec> = z
  .object({
    schema_text: z.string().optional(),
    message_name: z.string().optional(),
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

export const unmarshalTimeWindowSchema: z.ZodType<TimeWindow> = z
  .object({
    continuous: z.lazy(() => unmarshalContinuousWindowSchema).optional(),
    tumbling: z.lazy(() => unmarshalTumblingWindowSchema).optional(),
    sliding: z.lazy(() => unmarshalSlidingWindowSchema).optional(),
  })
  .transform(d => ({
    windowType:
      d.continuous !== undefined
        ? {$case: 'continuous' as const, continuous: d.continuous}
        : d.tumbling !== undefined
          ? {$case: 'tumbling' as const, tumbling: d.tumbling}
          : d.sliding !== undefined
            ? {$case: 'sliding' as const, sliding: d.sliding}
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
    time_window: d.timeWindow,
  }));

export const marshalApproxCountDistinctFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
    relativeSd: z.number().optional(),
  })
  .transform(d => ({
    input: d.input,
    relative_sd: d.relativeSd,
  }));

export const marshalApproxPercentileFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
    percentile: z.number().optional(),
    accuracy: z.number().optional(),
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
    input: z.string().optional(),
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
    requests: z
      .array(z.lazy(() => marshalCreateMaterializedFeatureRequestSchema))
      .optional(),
  })
  .transform(d => ({
    requests: d.requests,
  }));

export const marshalColumnIdentifierSchema: z.ZodType = z
  .object({
    variantExprPath: z.string().optional(),
  })
  .transform(d => ({
    variant_expr_path: d.variantExprPath,
  }));

export const marshalColumnSelectionSchema: z.ZodType = z
  .object({
    column: z.string().optional(),
  })
  .transform(d => ({
    column: d.column,
  }));

export const marshalContinuousWindowSchema: z.ZodType = z
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

export const marshalCountFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalCreateMaterializedFeatureRequestSchema: z.ZodType = z
  .object({
    materializedFeature: z
      .lazy(() => marshalMaterializedFeatureSchema)
      .optional(),
  })
  .transform(d => ({
    materialized_feature: d.materializedFeature,
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
  }));

export const marshalDeltaTableSourceSchema: z.ZodType = z
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

export const marshalEntityColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalFeatureSchema: z.ZodType = z
  .object({
    fullName: z.string().optional(),
    source: z.lazy(() => marshalDataSourceSchema).optional(),
    inputs: z.array(z.string()).optional(),
    function: z.lazy(() => marshalFunctionSchema).optional(),
    timeWindow: z.lazy(() => marshalTimeWindowSchema).optional(),
    description: z.string().optional(),
    filterCondition: z.string().optional(),
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
    inputs: d.inputs,
    function: d.function,
    time_window: d.timeWindow,
    description: d.description,
    filter_condition: d.filterCondition,
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
    name: z.string().optional(),
    dataType: z.enum(ScalarDataType).optional(),
  })
  .transform(d => ({
    name: d.name,
    data_type: d.dataType,
  }));

export const marshalFirstFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalFlatSchemaSchema: z.ZodType = z
  .object({
    fields: z.array(z.lazy(() => marshalFieldDefinitionSchema)).optional(),
  })
  .transform(d => ({
    fields: d.fields,
  }));

export const marshalFunctionSchema: z.ZodType = z
  .object({
    functionType: z.enum(Function_FunctionType).optional(),
    extraParameters: z
      .array(z.lazy(() => marshalFunction_ExtraParameterSchema))
      .optional(),
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalFunction_ExtraParameterSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalJobContextSchema: z.ZodType = z
  .object({
    jobId: z.number().optional(),
    jobRunId: z.number().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    job_run_id: d.jobRunId,
  }));

export const marshalKafkaConfigSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    bootstrapServers: z.string().optional(),
    subscriptionMode: z.lazy(() => marshalSubscriptionModeSchema).optional(),
    authConfig: z.lazy(() => marshalAuthConfigSchema).optional(),
    keySchema: z.lazy(() => marshalSchemaConfigSchema).optional(),
    valueSchema: z.lazy(() => marshalSchemaConfigSchema).optional(),
    extraOptions: z.record(z.string(), z.string()).optional(),
    backfillSource: z.lazy(() => marshalBackfillSourceSchema).optional(),
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
  }));

export const marshalKafkaSourceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    entityColumnIdentifiers: z
      .array(z.lazy(() => marshalColumnIdentifierSchema))
      .optional(),
    timeseriesColumnIdentifier: z
      .lazy(() => marshalColumnIdentifierSchema)
      .optional(),
    filterCondition: z.string().optional(),
    transformationSql: z.string().optional(),
    dataframeSchema: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    entity_column_identifiers: d.entityColumnIdentifiers,
    timeseries_column_identifier: d.timeseriesColumnIdentifier,
    filter_condition: d.filterCondition,
    transformation_sql: d.transformationSql,
    dataframe_schema: d.dataframeSchema,
  }));

export const marshalLastFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalLineageContextSchema: z.ZodType = z
  .object({
    notebookId: z.number().optional(),
    jobContext: z.lazy(() => marshalJobContextSchema).optional(),
  })
  .transform(d => ({
    notebook_id: d.notebookId,
    job_context: d.jobContext,
  }));

export const marshalMaterializedFeatureSchema: z.ZodType = z
  .object({
    materializedFeatureId: z.string().optional(),
    featureName: z.string().optional(),
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
    pipelineScheduleState: z
      .enum(MaterializedFeature_PipelineScheduleState)
      .optional(),
    lastMaterializationTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    cronSchedule: z.string().optional(),
    isOnline: z.boolean().optional(),
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
    cron_schedule: d.cronSchedule,
    is_online: d.isOnline,
  }));

export const marshalMaxFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalMinFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalMtlsConfigSchema: z.ZodType = z
  .object({
    keystoreLocation: z.string().optional(),
    keystorePasswordRef: z
      .lazy(() => marshalSecretScopeReferenceSchema)
      .optional(),
    keyPasswordRef: z.lazy(() => marshalSecretScopeReferenceSchema).optional(),
    truststoreLocation: z.string().optional(),
    truststorePasswordRef: z
      .lazy(() => marshalSecretScopeReferenceSchema)
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

export const marshalOfflineStoreConfigSchema: z.ZodType = z
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

export const marshalOnlineStoreConfigSchema: z.ZodType = z
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

export const marshalProtoSchemaSpecSchema: z.ZodType = z
  .object({
    schemaText: z.string().optional(),
    messageName: z.string().optional(),
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

export const marshalSecretScopeReferenceSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    key: z.string().optional(),
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
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
    slide_duration: d.slideDuration,
  }));

export const marshalStddevPopFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalStddevSampFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
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
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalTimeWindowSchema: z.ZodType = z
  .object({
    windowType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('continuous'),
          continuous: z.lazy(() => marshalContinuousWindowSchema),
        }),
        z.object({
          $case: z.literal('tumbling'),
          tumbling: z.lazy(() => marshalTumblingWindowSchema),
        }),
        z.object({
          $case: z.literal('sliding'),
          sliding: z.lazy(() => marshalSlidingWindowSchema),
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
  }));

export const marshalTimeseriesColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalTumblingWindowSchema: z.ZodType = z
  .object({
    windowDuration: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    window_duration: d.windowDuration,
  }));

export const marshalVarPopFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
  })
  .transform(d => ({
    input: d.input,
  }));

export const marshalVarSampFunctionSchema: z.ZodType = z
  .object({
    input: z.string().optional(),
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
  last: {wire: 'last', children: () => lastFunctionFieldMaskSchema},
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

const columnIdentifierFieldMaskSchema: FieldMaskSchema = {
  variantExprPath: {wire: 'variant_expr_path'},
};

const columnSelectionFieldMaskSchema: FieldMaskSchema = {
  column: {wire: 'column'},
};

const continuousWindowFieldMaskSchema: FieldMaskSchema = {
  offset: {wire: 'offset'},
  windowDuration: {wire: 'window_duration'},
};

const countFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
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
  requestSource: {
    wire: 'request_source',
    children: () => requestSourceFieldMaskSchema,
  },
};

const deltaTableSourceFieldMaskSchema: FieldMaskSchema = {
  dataframeSchema: {wire: 'dataframe_schema'},
  entityColumns: {wire: 'entity_columns'},
  filterCondition: {wire: 'filter_condition'},
  fullName: {wire: 'full_name'},
  timeseriesColumn: {wire: 'timeseries_column'},
  transformationSql: {wire: 'transformation_sql'},
};

const featureFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  createdAt: {wire: 'created_at'},
  createdBy: {wire: 'created_by'},
  description: {wire: 'description'},
  entities: {wire: 'entities'},
  filterCondition: {wire: 'filter_condition'},
  fullName: {wire: 'full_name'},
  function: {wire: 'function', children: () => functionFieldMaskSchema},
  inputs: {wire: 'inputs'},
  lineageContext: {
    wire: 'lineage_context',
    children: () => lineageContextFieldMaskSchema,
  },
  name: {wire: 'name'},
  schemaName: {wire: 'schema_name'},
  source: {wire: 'source', children: () => dataSourceFieldMaskSchema},
  timeWindow: {wire: 'time_window', children: () => timeWindowFieldMaskSchema},
  timeseriesColumn: {
    wire: 'timeseries_column',
    children: () => timeseriesColumnFieldMaskSchema,
  },
};

export function featureFieldMask(...paths: string[]): FieldMask<Feature> {
  return FieldMask.build<Feature>(paths, featureFieldMaskSchema);
}

const firstFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
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
  extraParameters: {wire: 'extra_parameters'},
  functionType: {wire: 'function_type'},
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
  dataframeSchema: {wire: 'dataframe_schema'},
  entityColumnIdentifiers: {wire: 'entity_column_identifiers'},
  filterCondition: {wire: 'filter_condition'},
  name: {wire: 'name'},
  timeseriesColumnIdentifier: {
    wire: 'timeseries_column_identifier',
    children: () => columnIdentifierFieldMaskSchema,
  },
  transformationSql: {wire: 'transformation_sql'},
};

const lastFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const lineageContextFieldMaskSchema: FieldMaskSchema = {
  jobContext: {wire: 'job_context', children: () => jobContextFieldMaskSchema},
  notebookId: {wire: 'notebook_id'},
};

const materializedFeatureFieldMaskSchema: FieldMaskSchema = {
  cronSchedule: {wire: 'cron_schedule'},
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
  tableName: {wire: 'table_name'},
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

const schemaConfigFieldMaskSchema: FieldMaskSchema = {
  avroSchema: {wire: 'avro_schema'},
  jsonSchema: {wire: 'json_schema'},
  protoSchema: {
    wire: 'proto_schema',
    children: () => protoSchemaSpecFieldMaskSchema,
  },
};

const secretScopeReferenceFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  scope: {wire: 'scope'},
};

const slidingWindowFieldMaskSchema: FieldMaskSchema = {
  slideDuration: {wire: 'slide_duration'},
  windowDuration: {wire: 'window_duration'},
};

const stddevPopFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const stddevSampFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const subscriptionModeFieldMaskSchema: FieldMaskSchema = {
  assign: {wire: 'assign'},
  subscribe: {wire: 'subscribe'},
  subscribePattern: {wire: 'subscribe_pattern'},
};

const sumFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const timeWindowFieldMaskSchema: FieldMaskSchema = {
  continuous: {
    wire: 'continuous',
    children: () => continuousWindowFieldMaskSchema,
  },
  sliding: {wire: 'sliding', children: () => slidingWindowFieldMaskSchema},
  tumbling: {wire: 'tumbling', children: () => tumblingWindowFieldMaskSchema},
};

const timeseriesColumnFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

const tumblingWindowFieldMaskSchema: FieldMaskSchema = {
  windowDuration: {wire: 'window_duration'},
};

const varPopFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};

const varSampFunctionFieldMaskSchema: FieldMaskSchema = {
  input: {wire: 'input'},
};
