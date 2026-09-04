// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ColumnTypeName = {
  BOOLEAN: 'BOOLEAN',
  BYTE: 'BYTE',
  SHORT: 'SHORT',
  INT: 'INT',
  LONG: 'LONG',
  FLOAT: 'FLOAT',
  DOUBLE: 'DOUBLE',
  DATE: 'DATE',
  TIMESTAMP: 'TIMESTAMP',
  STRING: 'STRING',
  BINARY: 'BINARY',
  DECIMAL: 'DECIMAL',
  INTERVAL: 'INTERVAL',
  ARRAY: 'ARRAY',
  STRUCT: 'STRUCT',
  MAP: 'MAP',
  CHAR: 'CHAR',
  NULL: 'NULL',
  USER_DEFINED_TYPE: 'USER_DEFINED_TYPE',
  TIMESTAMP_NTZ: 'TIMESTAMP_NTZ',
  VARIANT: 'VARIANT',
  GEOMETRY: 'GEOMETRY',
  GEOGRAPHY: 'GEOGRAPHY',
  TABLE_TYPE: 'TABLE_TYPE',
} as const;
export type ColumnTypeName =
  | (typeof ColumnTypeName)[keyof typeof ColumnTypeName]
  | (string & {});

/** Data source format */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DataSourceFormat = {
  DELTA: 'DELTA',
  CSV: 'CSV',
  JSON: 'JSON',
  AVRO: 'AVRO',
  PARQUET: 'PARQUET',
  ORC: 'ORC',
  TEXT: 'TEXT',
  UNITY_CATALOG: 'UNITY_CATALOG',
  /** A table shared through Delta Sharing protocol. */
  DELTASHARING: 'DELTASHARING',
  /** BEGIN - Query federation data source formats. */
  DATABRICKS_FORMAT: 'DATABRICKS_FORMAT',
  MYSQL_FORMAT: 'MYSQL_FORMAT',
  ORACLE_FORMAT: 'ORACLE_FORMAT',
  POSTGRESQL_FORMAT: 'POSTGRESQL_FORMAT',
  REDSHIFT_FORMAT: 'REDSHIFT_FORMAT',
  SNOWFLAKE_FORMAT: 'SNOWFLAKE_FORMAT',
  SQLDW_FORMAT: 'SQLDW_FORMAT',
  SQLSERVER_FORMAT: 'SQLSERVER_FORMAT',
  SALESFORCE_FORMAT: 'SALESFORCE_FORMAT',
  SALESFORCE_DATA_CLOUD_FORMAT: 'SALESFORCE_DATA_CLOUD_FORMAT',
  TERADATA_FORMAT: 'TERADATA_FORMAT',
  BIGQUERY_FORMAT: 'BIGQUERY_FORMAT',
  NETSUITE_FORMAT: 'NETSUITE_FORMAT',
  WORKDAY_RAAS_FORMAT: 'WORKDAY_RAAS_FORMAT',
  MONGODB_FORMAT: 'MONGODB_FORMAT',
  /** datasource format used for hive tables. */
  HIVE: 'HIVE',
  /**
   * END - Query federation data source formats.
   * Vector search managed index format
   */
  VECTOR_INDEX_FORMAT: 'VECTOR_INDEX_FORMAT',
  /** Brickstore managed online row-oriented storage format. */
  DATABRICKS_ROW_STORE_FORMAT: 'DATABRICKS_ROW_STORE_FORMAT',
  /** Uniform storage format for Hudi */
  DELTA_UNIFORM_HUDI: 'DELTA_UNIFORM_HUDI',
  /** Uniform storage format for Iceberg */
  DELTA_UNIFORM_ICEBERG: 'DELTA_UNIFORM_ICEBERG',
  /** Apache Iceberg DataFormat */
  ICEBERG: 'ICEBERG',
} as const;
export type DataSourceFormat =
  | (typeof DataSourceFormat)[keyof typeof DataSourceFormat]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SecurableKind = {
  TABLE_STANDARD: 'TABLE_STANDARD',
  TABLE_EXTERNAL: 'TABLE_EXTERNAL',
  TABLE_DELTA: 'TABLE_DELTA',
  TABLE_DELTA_EXTERNAL: 'TABLE_DELTA_EXTERNAL',
  TABLE_VIEW: 'TABLE_VIEW',
  TABLE_METRIC_VIEW: 'TABLE_METRIC_VIEW',
  TABLE_DELTASHARING: 'TABLE_DELTASHARING',
  TABLE_DELTASHARING_MUTABLE: 'TABLE_DELTASHARING_MUTABLE',
  TABLE_VIEW_DELTASHARING: 'TABLE_VIEW_DELTASHARING',
  TABLE_METRIC_VIEW_DELTASHARING: 'TABLE_METRIC_VIEW_DELTASHARING',
  TABLE_MATERIALIZED_VIEW_DELTASHARING: 'TABLE_MATERIALIZED_VIEW_DELTASHARING',
  TABLE_STREAMING_LIVE_TABLE_DELTASHARING:
    'TABLE_STREAMING_LIVE_TABLE_DELTASHARING',
  TABLE_FOREIGN_DELTASHARING: 'TABLE_FOREIGN_DELTASHARING',
  TABLE_DELTA_ICEBERG_DELTASHARING: 'TABLE_DELTA_ICEBERG_DELTASHARING',
  TABLE_DELTASHARING_OPEN_DIR_BASED: 'TABLE_DELTASHARING_OPEN_DIR_BASED',
  /** TABLE_FEATURE_STORE and TABLE_FEATURE_STORE_EXTERNAL are deprecated. */
  TABLE_FEATURE_STORE: 'TABLE_FEATURE_STORE',
  TABLE_FEATURE_STORE_EXTERNAL: 'TABLE_FEATURE_STORE_EXTERNAL',
  TABLE_STREAMING_LIVE_TABLE: 'TABLE_STREAMING_LIVE_TABLE',
  TABLE_SYSTEM: 'TABLE_SYSTEM',
  TABLE_SYSTEM_DELTASHARING: 'TABLE_SYSTEM_DELTASHARING',
  TABLE_MATERIALIZED_VIEW: 'TABLE_MATERIALIZED_VIEW',
  TABLE_INTERNAL: 'TABLE_INTERNAL',
  TABLE_FOREIGN_BIGQUERY: 'TABLE_FOREIGN_BIGQUERY',
  TABLE_FOREIGN_MYSQL: 'TABLE_FOREIGN_MYSQL',
  TABLE_FOREIGN_ORACLE: 'TABLE_FOREIGN_ORACLE',
  TABLE_FOREIGN_POSTGRESQL: 'TABLE_FOREIGN_POSTGRESQL',
  TABLE_FOREIGN_SQLDW: 'TABLE_FOREIGN_SQLDW',
  TABLE_FOREIGN_REDSHIFT: 'TABLE_FOREIGN_REDSHIFT',
  TABLE_FOREIGN_SNOWFLAKE: 'TABLE_FOREIGN_SNOWFLAKE',
  TABLE_FOREIGN_SQLSERVER: 'TABLE_FOREIGN_SQLSERVER',
  TABLE_FOREIGN_SALESFORCE: 'TABLE_FOREIGN_SALESFORCE',
  TABLE_FOREIGN_SALESFORCE_DATA_CLOUD: 'TABLE_FOREIGN_SALESFORCE_DATA_CLOUD',
  TABLE_FOREIGN_SALESFORCE_DATA_CLOUD_FILE_SHARING:
    'TABLE_FOREIGN_SALESFORCE_DATA_CLOUD_FILE_SHARING',
  TABLE_FOREIGN_SALESFORCE_DATA_CLOUD_FILE_SHARING_VIEW:
    'TABLE_FOREIGN_SALESFORCE_DATA_CLOUD_FILE_SHARING_VIEW',
  TABLE_FOREIGN_TERADATA: 'TABLE_FOREIGN_TERADATA',
  TABLE_FOREIGN_NETSUITE: 'TABLE_FOREIGN_NETSUITE',
  TABLE_FOREIGN_DATABRICKS: 'TABLE_FOREIGN_DATABRICKS',
  TABLE_FOREIGN_WORKDAY_RAAS: 'TABLE_FOREIGN_WORKDAY_RAAS',
  /** Deprecated in favor of more specific types below */
  TABLE_FOREIGN_HIVE_METASTORE: 'TABLE_FOREIGN_HIVE_METASTORE',
  TABLE_FOREIGN_HIVE_METASTORE_MANAGED: 'TABLE_FOREIGN_HIVE_METASTORE_MANAGED',
  TABLE_FOREIGN_HIVE_METASTORE_DBFS_MANAGED:
    'TABLE_FOREIGN_HIVE_METASTORE_DBFS_MANAGED',
  TABLE_FOREIGN_HIVE_METASTORE_EXTERNAL:
    'TABLE_FOREIGN_HIVE_METASTORE_EXTERNAL',
  TABLE_FOREIGN_HIVE_METASTORE_DBFS_EXTERNAL:
    'TABLE_FOREIGN_HIVE_METASTORE_DBFS_EXTERNAL',
  TABLE_FOREIGN_HIVE_METASTORE_VIEW: 'TABLE_FOREIGN_HIVE_METASTORE_VIEW',
  TABLE_FOREIGN_HIVE_METASTORE_DBFS_VIEW:
    'TABLE_FOREIGN_HIVE_METASTORE_DBFS_VIEW',
  TABLE_FOREIGN_HIVE_METASTORE_SHALLOW_CLONE_MANAGED:
    'TABLE_FOREIGN_HIVE_METASTORE_SHALLOW_CLONE_MANAGED',
  TABLE_FOREIGN_HIVE_METASTORE_DBFS_SHALLOW_CLONE_MANAGED:
    'TABLE_FOREIGN_HIVE_METASTORE_DBFS_SHALLOW_CLONE_MANAGED',
  TABLE_FOREIGN_HIVE_METASTORE_SHALLOW_CLONE_EXTERNAL:
    'TABLE_FOREIGN_HIVE_METASTORE_SHALLOW_CLONE_EXTERNAL',
  TABLE_FOREIGN_HIVE_METASTORE_DBFS_SHALLOW_CLONE_EXTERNAL:
    'TABLE_FOREIGN_HIVE_METASTORE_DBFS_SHALLOW_CLONE_EXTERNAL',
  TABLE_FOREIGN_MONGODB: 'TABLE_FOREIGN_MONGODB',
  TABLE_DELTA_UNIFORM_HUDI_EXTERNAL: 'TABLE_DELTA_UNIFORM_HUDI_EXTERNAL',
  TABLE_DELTA_UNIFORM_ICEBERG_EXTERNAL: 'TABLE_DELTA_UNIFORM_ICEBERG_EXTERNAL',
  TABLE_DELTA_UNIFORM_ICEBERG_FOREIGN_HIVE_METASTORE_EXTERNAL:
    'TABLE_DELTA_UNIFORM_ICEBERG_FOREIGN_HIVE_METASTORE_EXTERNAL',
  TABLE_DELTA_UNIFORM_ICEBERG_FOREIGN_HIVE_METASTORE_MANAGED:
    'TABLE_DELTA_UNIFORM_ICEBERG_FOREIGN_HIVE_METASTORE_MANAGED',
  TABLE_DELTA_UNIFORM_ICEBERG_FOREIGN_SNOWFLAKE:
    'TABLE_DELTA_UNIFORM_ICEBERG_FOREIGN_SNOWFLAKE',
  /**
   * The above uniform securableKinds come from different data sources,
   * each creating a foreign catalog in Databricks with its own capabilities.
   * UC uses these attributes to interact with remote connections.
   * For shared foreign iceberg tables, all are under the Delta Sharing catalog
   * with the same capabilities, so the recipient UC does not need to connect
   * to the remote source.
   */
  TABLE_DELTA_UNIFORM_ICEBERG_FOREIGN_DELTASHARING:
    'TABLE_DELTA_UNIFORM_ICEBERG_FOREIGN_DELTASHARING',
  /**
   * This is the delta sharing version of TABLE_DELTA_UNIFORM_ICEBERG_EXTERNAL.
   * Unlike the above foreign iceberg kinds which originate from external catalogs,
   * this represents an external uniform iceberg table shared via Delta Sharing.
   */
  TABLE_DELTA_UNIFORM_ICEBERG_EXTERNAL_DELTASHARING:
    'TABLE_DELTA_UNIFORM_ICEBERG_EXTERNAL_DELTASHARING',
  /** These represent 2 variations of Managed Iceberg tables. See ManagedIcebergTableUtils.scala for more details. */
  TABLE_ICEBERG_UNIFORM_MANAGED: 'TABLE_ICEBERG_UNIFORM_MANAGED',
  TABLE_DELTA_ICEBERG_MANAGED: 'TABLE_DELTA_ICEBERG_MANAGED',
  TABLE_ONLINE_VECTOR_INDEX_REPLICA: 'TABLE_ONLINE_VECTOR_INDEX_REPLICA',
  TABLE_ONLINE_VECTOR_INDEX_DIRECT: 'TABLE_ONLINE_VECTOR_INDEX_DIRECT',
  TABLE_ONLINE_VIEW: 'TABLE_ONLINE_VIEW',
  TABLE_DB_STORAGE: 'TABLE_DB_STORAGE',
  TABLE_MANAGED_POSTGRESQL: 'TABLE_MANAGED_POSTGRESQL',
} as const;
export type SecurableKind =
  | (typeof SecurableKind)[keyof typeof SecurableKind]
  | (string & {});

/** The type of Unity Catalog securable. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SecurableType = {
  CATALOG: 'CATALOG',
  SCHEMA: 'SCHEMA',
  TABLE: 'TABLE',
  STORAGE_CREDENTIAL: 'STORAGE_CREDENTIAL',
  EXTERNAL_LOCATION: 'EXTERNAL_LOCATION',
  FUNCTION: 'FUNCTION',
  SHARE: 'SHARE',
  PROVIDER: 'PROVIDER',
  RECIPIENT: 'RECIPIENT',
  CLEAN_ROOM: 'CLEAN_ROOM',
  METASTORE: 'METASTORE',
  PIPELINE: 'PIPELINE',
  VOLUME: 'VOLUME',
  CONNECTION: 'CONNECTION',
  CREDENTIAL: 'CREDENTIAL',
  EXTERNAL_METADATA: 'EXTERNAL_METADATA',
  /** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */
  STAGING_TABLE: 'STAGING_TABLE',
  MODEL: 'MODEL',
  MODEL_SERVICE: 'MODEL_SERVICE',
  MCP_SERVICE: 'MCP_SERVICE',
  MODEL_PROVIDER_SERVICE: 'MODEL_PROVIDER_SERVICE',
} as const;
export type SecurableType =
  | (typeof SecurableType)[keyof typeof SecurableType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SseEncryptionAlgorithm = {
  SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED: 'SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED',
  AWS_SSE_S3: 'AWS_SSE_S3',
  AWS_SSE_KMS: 'AWS_SSE_KMS',
} as const;
export type SseEncryptionAlgorithm =
  | (typeof SseEncryptionAlgorithm)[keyof typeof SseEncryptionAlgorithm]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TableType = {
  MANAGED: 'MANAGED',
  EXTERNAL: 'EXTERNAL',
  VIEW: 'VIEW',
  MATERIALIZED_VIEW: 'MATERIALIZED_VIEW',
  STREAMING_TABLE: 'STREAMING_TABLE',
  MANAGED_SHALLOW_CLONE: 'MANAGED_SHALLOW_CLONE',
  FOREIGN: 'FOREIGN',
  EXTERNAL_SHALLOW_CLONE: 'EXTERNAL_SHALLOW_CLONE',
  METRIC_VIEW: 'METRIC_VIEW',
} as const;
export type TableType =
  | (typeof TableType)[keyof typeof TableType]
  | (string & {});

/**
 * During the OAuth flow, specifies which stage the option should be displayed in the UI.
 * OAUTH_STAGE_UNSPECIFIED is the default value for options unrelated to the OAuth flow.
 * BEFORE_AUTHORIZATION_CODE corresponds to options necessary to initiate the OAuth process.
 * BEFORE_ACCESS_TOKEN corresponds to options that are necessary to create a foreign connection,
 * but that should be displayed after the authorization code has already been received.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const OptionSpec_OauthStage = {
  OAUTH_STAGE_UNSPECIFIED: 'OAUTH_STAGE_UNSPECIFIED',
  BEFORE_AUTHORIZATION_CODE: 'BEFORE_AUTHORIZATION_CODE',
  BEFORE_ACCESS_TOKEN: 'BEFORE_ACCESS_TOKEN',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type OptionSpec_OauthStage =
  | (typeof OptionSpec_OauthStage)[keyof typeof OptionSpec_OauthStage]
  | (string & {});

/**
 * Type of the option, we purposely follow JavaScript types so that
 * the UI can map the options to JS types.
 * https://www.w3schools.com/js/js_datatypes.asp
 * Enum is a special case that it's just string with selections.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const OptionSpec_OptionType = {
  OPTION_TYPE_UNSPECIFIED: 'OPTION_TYPE_UNSPECIFIED',
  OPTION_BOOLEAN: 'OPTION_BOOLEAN',
  OPTION_NUMBER: 'OPTION_NUMBER',
  OPTION_BIGINT: 'OPTION_BIGINT',
  OPTION_STRING: 'OPTION_STRING',
  OPTION_ENUM: 'OPTION_ENUM',
  OPTION_SERVICE_CREDENTIAL: 'OPTION_SERVICE_CREDENTIAL',
  OPTION_MULTILINE_STRING: 'OPTION_MULTILINE_STRING',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type OptionSpec_OptionType =
  | (typeof OptionSpec_OptionType)[keyof typeof OptionSpec_OptionType]
  | (string & {});

export interface ColumnInfo {
  /** Name of Column. */
  name?: string | undefined;
  /** Full data type specification as SQL/catalogString text. */
  typeText?: string | undefined;
  typeName?: ColumnTypeName | undefined;
  /** Ordinal position of column (starting at position 0). */
  position?: number | undefined;
  /** Digits of precision; required for DecimalTypes. */
  typePrecision?: number | undefined;
  /** Digits to right of decimal; Required for DecimalTypes. */
  typeScale?: number | undefined;
  /** Format of IntervalType. */
  typeIntervalType?: string | undefined;
  /** Full data type specification, JSON-serialized. */
  typeJson?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Whether field may be Null (default: true). */
  nullable?: boolean | undefined;
  /** Partition index for column. */
  partitionIndex?: number | undefined;
  mask?: ColumnMask | undefined;
}

export interface ColumnMask {
  /** The full name of the column mask SQL UDF. */
  functionName?: string | undefined;
  /**
   * The list of additional table columns to be passed as input to the column mask function. The
   * first arg of the mask function should be of the type of the column being masked and the
   * types of the rest of the args should match the types of columns in 'using_column_names'.
   */
  usingColumnNames?: string[] | undefined;
  /**
   * The list of table columns or literals to be passed as additional arguments to a column mask
   * function, carrying the type (column reference vs constant literal) of each argument.
   * Deprecated: use using_column_names instead.
   */
  usingArguments?: PolicyFunctionArgument[] | undefined;
}

/** A connection that is dependent on a SQL object. */
export interface ConnectionDependency {
  /** Full name of the dependent connection, in the form of __connection_name__. */
  connectionName?: string | undefined;
}

export interface CreateTableConstraintRequest {
  /** The full name of the table referenced by the constraint. */
  fullNameArg: string;
  constraint: TableConstraint;
}

export interface CreateTableRequest {
  /** Name of table, relative to parent schema. */
  name?: string | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /** Name of parent schema relative to its parent catalog. */
  schemaName?: string | undefined;
  tableType?: TableType | undefined;
  dataSourceFormat?: DataSourceFormat | undefined;
  /** Storage root URL for table (for **MANAGED**, **EXTERNAL** tables). */
  storageLocation?: string | undefined;
  /** View definition SQL (when __table_type__ is **VIEW**, **MATERIALIZED_VIEW**, or **STREAMING_TABLE**) */
  viewDefinition?: string | undefined;
  /**
   * View dependencies (when table_type == **VIEW** or **MATERIALIZED_VIEW**, **STREAMING_TABLE**)
   * - when DependencyList is None, the dependency is not provided;
   * - when DependencyList is an empty list, the dependency is provided but is empty;
   * - when DependencyList is not an empty list, dependencies are provided and recorded.
   * Note: this field is not set in the output of the __listTables__ API.
   */
  viewDependencies?: DependencyList | undefined;
  /** List of schemes whose objects can be referenced without qualification. */
  sqlPath?: string | undefined;
  /** Username of current owner of table. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Name of the storage credential, when a storage credential is configured for use with this table. */
  storageCredentialName?: string | undefined;
  /** List of table constraints. Note: this field is not set in the output of the __listTables__ API. */
  tableConstraints?: TableConstraint[] | undefined;
  rowFilter?: RowFilter | undefined;
  /** The pipeline ID of the table. Applicable for tables created by pipelines (Materialized View, Streaming Table, etc.). */
  pipelineId?: string | undefined;
  enablePredictiveOptimization?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of table, in form of __catalog_name__.__schema_name__.__table_name__ */
  fullName?: string | undefined;
  /** Unique ID of the Data Access Configuration to use with the table data. */
  dataAccessConfigurationId?: string | undefined;
  /** Time at which this table was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of table creator. */
  createdBy?: string | undefined;
  /** Time at which this table was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified the table. */
  updatedBy?: string | undefined;
  /** The unique identifier of the table. */
  tableId?: string | undefined;
  /** Information pertaining to current state of the delta table. */
  deltaRuntimePropertiesKvpairs?: DeltaRuntimePropertiesKvPairs | undefined;
  /** Time at which this table was deleted, in epoch milliseconds. Field is omitted if table is not deleted. */
  deletedAt?: bigint | undefined;
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** The AWS access point to use when accesing s3 for this external location. */
  accessPoint?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  encryptionDetails?: EncryptionDetails | undefined;
  /** SecurableKindManifest of table, including capabilities the table has. */
  securableKindManifest?: SecurableKindManifest | undefined;
  /** The array of __ColumnInfo__ definitions of the table's columns. */
  columns?: ColumnInfo[] | undefined;
  /** A map of key-value properties attached to the securable. */
  properties: Record<string, string>;
}

/** A credential that is dependent on a SQL object. */
export interface CredentialDependency {
  /** Full name of the dependent credential, in the form of __credential_name__. */
  credentialName?: string | undefined;
}

export interface DeleteTableConstraintRequest {
  /** Full name of the table referenced by the constraint. */
  fullNameArg: string;
  /** The name of the constraint to delete. */
  constraintName: string;
  /**
   * If true, try deleting all child constraints of the current constraint.
   * If false, reject this operation if the current constraint has any child constraints.
   */
  cascade: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteTableConstraintResponse {}

export interface DeleteTableRequest {
  /** Full name of the table. */
  fullNameArg: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteTableResponse {}

/**
 * Properties pertaining to the current state of the delta table as given by the commit server.
 * This does not contain **delta.*** (input) properties in __TableInfo.properties__.
 */
export interface DeltaRuntimePropertiesKvPairs {
  /** A map of key-value properties attached to the securable. */
  deltaRuntimeProperties: Record<string, string>;
}

/**
 * A dependency of a SQL object. One of the following fields must be defined:
 * __table__, __function__, __connection__, __credential__, __volume__, or __secret__.
 */
export interface Dependency {
  value?:
    | {$case: 'table'; table: TableDependency}
    | {$case: 'function'; function: FunctionDependency}
    | {$case: 'connection'; connection: ConnectionDependency}
    | {$case: 'credential'; credential: CredentialDependency}
    | undefined;
}

/** A list of dependencies. */
export interface DependencyList {
  /** Array of dependencies. */
  dependencies?: Dependency[] | undefined;
}

export interface EffectivePredictiveOptimizationFlag {
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  value: string;
  /** The type of the object from which the flag was inherited. If there was no inheritance, this field is left blank. */
  inheritedFromType?: string | undefined;
  /** The name of the object from which the flag was inherited. If there was no inheritance, this field is left blank. */
  inheritedFromName?: string | undefined;
}

/** Encryption options that apply to clients connecting to cloud storage. */
export interface EncryptionDetails {
  encryptionDetailsType?:
    | {
        $case: 'sseEncryptionDetails';
        /** Server-Side Encryption properties for clients communicating with AWS s3. */
        sseEncryptionDetails: SseEncryptionDetails;
      }
    | undefined;
}

export interface ForeignKeyConstraint {
  /** The name of the constraint. */
  name: string;
  /** Column names for this constraint. */
  childColumns: string[];
  /** The full name of the parent constraint. */
  parentTable: string;
  /** Column names for this constraint. */
  parentColumns: string[];
  /** True if the constraint is RELY, false or unset if NORELY. */
  rely?: boolean | undefined;
}

/** A function that is dependent on a SQL object. */
export interface FunctionDependency {
  /** Full name of the dependent function, in the form of __catalog_name__.__schema_name__.__function_name__. */
  functionFullName: string;
}

export interface GetTableRequest {
  /** Full name of the table. */
  fullNameArg: string;
  /** Whether delta metadata should be included in the response. */
  includeDeltaMetadata?: boolean | undefined;
  /** Whether to include tables in the response for which the principal can only access selective metadata for. */
  includeBrowse?: boolean | undefined;
  /** Whether to include a manifest containing table capabilities in the response. */
  includeManifestCapabilities?: boolean | undefined;
}

export interface ListTableSummariesRequest {
  /** Name of parent catalog for tables of interest. */
  catalogName: string;
  /**
   * A sql LIKE pattern (% and _) for schema names.
   * All schemas will be returned if not set or empty.
   */
  schemaNamePattern?: string | undefined;
  /**
   * A sql LIKE pattern (% and _) for table names.
   * All tables will be returned if not set or empty.
   */
  tableNamePattern?: string | undefined;
  /**
   * Maximum number of summaries for tables to return.
   * If not set, the page length is set to a server configured value (10000, as of 1/5/2024).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value (10000, as of 1/5/2024);
   * - when set to 0, the page length is set to a server configured value (10000, as of 1/5/2024) (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
  /** Whether to include a manifest containing table capabilities in the response. */
  includeManifestCapabilities?: boolean | undefined;
}

export interface ListTableSummariesResponse {
  /** List of table summaries. */
  tables?: TableSummary[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListTablesRequest {
  /** Name of parent catalog for tables of interest. */
  catalogName: string;
  /** Parent schema of tables. */
  schemaName: string;
  /**
   * Maximum number of tables to return.
   * If not set, all the tables are returned (not recommended).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: number | undefined;
  /** Opaque token to send for the next page of results (pagination). */
  pageToken?: string | undefined;
  /** Whether to omit the columns of the table from the response or not. */
  omitColumns?: boolean | undefined;
  /** Whether to omit the properties of the table from the response or not. */
  omitProperties?: boolean | undefined;
  /** Whether to omit the username of the table (e.g. owner, updated_by, created_by) from the response or not. */
  omitUsername?: boolean | undefined;
  /** Whether to include tables in the response for which the principal can only access selective metadata for. */
  includeBrowse?: boolean | undefined;
  /** Whether to include a manifest containing table capabilities in the response. */
  includeManifestCapabilities?: boolean | undefined;
}

export interface ListTablesResponse {
  /** An array of table information objects. */
  tables?: TableInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface NamedTableConstraint {
  /** The name of the constraint. */
  name: string;
}

/**
 * Spec of an allowed option on a securable kind and its attributes.
 * This is mostly used by UI to provide user friendly hints and descriptions
 * in order to facilitate the securable creation process.
 */
export interface OptionSpec {
  /** The unique name of the option. */
  name?: string | undefined;
  /** The type of the option. */
  type?: OptionSpec_OptionType | undefined;
  /** The default value of the option, for example, value '443' for 'port' option. */
  defaultValue?: string | undefined;
  /**
   * For drop down / radio button selections, UI will want to know the possible
   * input values, it can also be used by other option types to limit input selections.
   */
  allowedValues?: string[] | undefined;
  /**
   * The hint is used on the UI to suggest what the input value
   * can possibly be like, for example: example.com for 'host' option.
   * Unlike default value, it will not be applied automatically without user input.
   */
  hint?: string | undefined;
  /** A concise user facing description of what the input value of this option should look like. */
  description?: string | undefined;
  /** Is the option required. */
  isRequired?: boolean | undefined;
  /** Is the option value considered secret and thus redacted on the UI. */
  isSecret?: boolean | undefined;
  /** Is the option value not user settable and is thus not shown on the UI. */
  isHidden?: boolean | undefined;
  /** Is the option updatable by users. */
  isUpdatable?: boolean | undefined;
  /** Specifies when the option value is displayed on the UI within the OAuth flow. */
  oauthStage?: OptionSpec_OauthStage | undefined;
  /** Specifies whether this option is safe to log, i.e. no sensitive information. */
  isLoggable?: boolean | undefined;
  /** Indicates whether an option can be provided by users in the create/update path of an entity. */
  isCreatable?: boolean | undefined;
  /** Indicates whether an option should be displayed with copy button on the UI. */
  isCopiable?: boolean | undefined;
}

/**
 * A positional argument passed to a row filter or column mask function.
 * Distinguishes between column references and literals.
 */
export interface PolicyFunctionArgument {
  arg?:
    | {
        $case: 'column';
        /** A column reference. */
        column: string;
      }
    | {
        $case: 'constant';
        /** A constant literal. */
        constant: string;
      }
    | undefined;
}

export interface PrimaryKeyConstraint {
  /** The name of the constraint. */
  name: string;
  /** Column names for this constraint. */
  childColumns: string[];
  /** Column names that represent a timeseries. */
  timeseriesColumns?: string[] | undefined;
  /** True if the constraint is RELY, false or unset if NORELY. */
  rely?: boolean | undefined;
}

export interface RowFilter {
  /** The full name of the row filter SQL UDF. */
  functionName: string;
  /**
   * The list of table columns to be passed as input to the row filter function. The column types
   * should match the types of the filter function arguments.
   */
  inputColumnNames: string[];
  /**
   * The list of table columns or literals to be passed as additional arguments to a row filter
   * function, carrying the type (column reference vs constant literal) of each argument.
   * Deprecated: use input_column_names instead.
   */
  inputArguments?: PolicyFunctionArgument[] | undefined;
}

/** Manifest of a specific securable kind. */
export interface SecurableKindManifest {
  /** Securable Type of the kind. */
  securableType?: SecurableType | undefined;
  /** Securable kind to get manifest of. */
  securableKind?: SecurableKind | undefined;
  /** Privileges that can be assigned to the securable. */
  assignablePrivileges?: string[] | undefined;
  /** Detailed specs of allowed options. */
  options?: OptionSpec[] | undefined;
  /** A list of capabilities in the securable kind. */
  capabilities?: string[] | undefined;
}

/** Server-Side Encryption properties for clients communicating with AWS s3. */
export interface SseEncryptionDetails {
  /** Sets the value of the 'x-amz-server-side-encryption' header in S3 request. */
  algorithm?: SseEncryptionAlgorithm | undefined;
  /**
   * Optional. The ARN of the SSE-KMS key used with the S3 location, when algorithm = "SSE-KMS".
   * Sets the value of the 'x-amz-server-side-encryption-aws-kms-key-id' header.
   */
  awsKmsKeyArn?: string | undefined;
}

/**
 * A table constraint, as defined by *one* of the following fields being set:
 * __primary_key_constraint__, __foreign_key_constraint__, __named_table_constraint__.
 */
export interface TableConstraint {
  constraint?:
    | {
        $case: 'primaryKeyConstraint';
        primaryKeyConstraint: PrimaryKeyConstraint;
      }
    | {
        $case: 'foreignKeyConstraint';
        foreignKeyConstraint: ForeignKeyConstraint;
      }
    | {
        $case: 'namedTableConstraint';
        namedTableConstraint: NamedTableConstraint;
      }
    | undefined;
}

/** A table that is dependent on a SQL object. */
export interface TableDependency {
  /** Full name of the dependent table, in the form of __catalog_name__.__schema_name__.__table_name__. */
  tableFullName: string;
}

export interface TableExistsRequest {
  /** Full name of the table. */
  fullNameArg: string;
}

export interface TableExistsResponse {
  /** Whether the table exists or not. */
  tableExists?: boolean | undefined;
}

export interface TableInfo {
  /** Name of table, relative to parent schema. */
  name?: string | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /** Name of parent schema relative to its parent catalog. */
  schemaName?: string | undefined;
  tableType?: TableType | undefined;
  dataSourceFormat?: DataSourceFormat | undefined;
  /** Storage root URL for table (for **MANAGED**, **EXTERNAL** tables). */
  storageLocation?: string | undefined;
  /** View definition SQL (when __table_type__ is **VIEW**, **MATERIALIZED_VIEW**, or **STREAMING_TABLE**) */
  viewDefinition?: string | undefined;
  /**
   * View dependencies (when table_type == **VIEW** or **MATERIALIZED_VIEW**, **STREAMING_TABLE**)
   * - when DependencyList is None, the dependency is not provided;
   * - when DependencyList is an empty list, the dependency is provided but is empty;
   * - when DependencyList is not an empty list, dependencies are provided and recorded.
   * Note: this field is not set in the output of the __listTables__ API.
   */
  viewDependencies?: DependencyList | undefined;
  /** List of schemes whose objects can be referenced without qualification. */
  sqlPath?: string | undefined;
  /** Username of current owner of table. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Name of the storage credential, when a storage credential is configured for use with this table. */
  storageCredentialName?: string | undefined;
  /** List of table constraints. Note: this field is not set in the output of the __listTables__ API. */
  tableConstraints?: TableConstraint[] | undefined;
  rowFilter?: RowFilter | undefined;
  /** The pipeline ID of the table. Applicable for tables created by pipelines (Materialized View, Streaming Table, etc.). */
  pipelineId?: string | undefined;
  enablePredictiveOptimization?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of table, in form of __catalog_name__.__schema_name__.__table_name__ */
  fullName?: string | undefined;
  /** Unique ID of the Data Access Configuration to use with the table data. */
  dataAccessConfigurationId?: string | undefined;
  /** Time at which this table was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of table creator. */
  createdBy?: string | undefined;
  /** Time at which this table was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified the table. */
  updatedBy?: string | undefined;
  /** The unique identifier of the table. */
  tableId?: string | undefined;
  /** Information pertaining to current state of the delta table. */
  deltaRuntimePropertiesKvpairs?: DeltaRuntimePropertiesKvPairs | undefined;
  /** Time at which this table was deleted, in epoch milliseconds. Field is omitted if table is not deleted. */
  deletedAt?: bigint | undefined;
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** The AWS access point to use when accesing s3 for this external location. */
  accessPoint?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  encryptionDetails?: EncryptionDetails | undefined;
  /** SecurableKindManifest of table, including capabilities the table has. */
  securableKindManifest?: SecurableKindManifest | undefined;
  /** The array of __ColumnInfo__ definitions of the table's columns. */
  columns?: ColumnInfo[] | undefined;
  /** A map of key-value properties attached to the securable. */
  properties: Record<string, string>;
}

export interface TableSummary {
  /** The full name of the table. */
  fullName?: string | undefined;
  tableType?: TableType | undefined;
  /** SecurableKindManifest of table, including capabilities the table has. */
  securableKindManifest?: SecurableKindManifest | undefined;
}

export interface UpdateTableRequest {
  /** Full name of the table. */
  fullNameArg: string;
  /** Name of table, relative to parent schema. */
  name?: string | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /** Name of parent schema relative to its parent catalog. */
  schemaName?: string | undefined;
  tableType?: TableType | undefined;
  dataSourceFormat?: DataSourceFormat | undefined;
  /** Storage root URL for table (for **MANAGED**, **EXTERNAL** tables). */
  storageLocation?: string | undefined;
  /** View definition SQL (when __table_type__ is **VIEW**, **MATERIALIZED_VIEW**, or **STREAMING_TABLE**) */
  viewDefinition?: string | undefined;
  /**
   * View dependencies (when table_type == **VIEW** or **MATERIALIZED_VIEW**, **STREAMING_TABLE**)
   * - when DependencyList is None, the dependency is not provided;
   * - when DependencyList is an empty list, the dependency is provided but is empty;
   * - when DependencyList is not an empty list, dependencies are provided and recorded.
   * Note: this field is not set in the output of the __listTables__ API.
   */
  viewDependencies?: DependencyList | undefined;
  /** List of schemes whose objects can be referenced without qualification. */
  sqlPath?: string | undefined;
  /** Username of current owner of table. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Name of the storage credential, when a storage credential is configured for use with this table. */
  storageCredentialName?: string | undefined;
  /** List of table constraints. Note: this field is not set in the output of the __listTables__ API. */
  tableConstraints?: TableConstraint[] | undefined;
  rowFilter?: RowFilter | undefined;
  /** The pipeline ID of the table. Applicable for tables created by pipelines (Materialized View, Streaming Table, etc.). */
  pipelineId?: string | undefined;
  enablePredictiveOptimization?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of table, in form of __catalog_name__.__schema_name__.__table_name__ */
  fullName?: string | undefined;
  /** Unique ID of the Data Access Configuration to use with the table data. */
  dataAccessConfigurationId?: string | undefined;
  /** Time at which this table was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of table creator. */
  createdBy?: string | undefined;
  /** Time at which this table was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified the table. */
  updatedBy?: string | undefined;
  /** The unique identifier of the table. */
  tableId?: string | undefined;
  /** Information pertaining to current state of the delta table. */
  deltaRuntimePropertiesKvpairs?: DeltaRuntimePropertiesKvPairs | undefined;
  /** Time at which this table was deleted, in epoch milliseconds. Field is omitted if table is not deleted. */
  deletedAt?: bigint | undefined;
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** The AWS access point to use when accesing s3 for this external location. */
  accessPoint?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  encryptionDetails?: EncryptionDetails | undefined;
  /** SecurableKindManifest of table, including capabilities the table has. */
  securableKindManifest?: SecurableKindManifest | undefined;
  /** The array of __ColumnInfo__ definitions of the table's columns. */
  columns?: ColumnInfo[] | undefined;
  /** A map of key-value properties attached to the securable. */
  properties: Record<string, string>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateTableResponse {}

export const unmarshalColumnInfoSchema: z.ZodType<ColumnInfo> = z
  .object({
    name: z.string().optional(),
    type_text: z.string().optional(),
    type_name: z.string().optional(),
    position: z.number().optional(),
    type_precision: z.number().optional(),
    type_scale: z.number().optional(),
    type_interval_type: z.string().optional(),
    type_json: z.string().optional(),
    comment: z.string().optional(),
    nullable: z.boolean().optional(),
    partition_index: z.number().optional(),
    mask: z.lazy(() => unmarshalColumnMaskSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    typeText: d.type_text,
    typeName: d.type_name,
    position: d.position,
    typePrecision: d.type_precision,
    typeScale: d.type_scale,
    typeIntervalType: d.type_interval_type,
    typeJson: d.type_json,
    comment: d.comment,
    nullable: d.nullable,
    partitionIndex: d.partition_index,
    mask: d.mask,
  }));

export const unmarshalColumnMaskSchema: z.ZodType<ColumnMask> = z
  .object({
    function_name: z.string().optional(),
    using_column_names: z.array(z.string()).optional(),
    using_arguments: z
      .array(z.lazy(() => unmarshalPolicyFunctionArgumentSchema))
      .optional(),
  })
  .transform(d => ({
    functionName: d.function_name,
    usingColumnNames: d.using_column_names,
    usingArguments: d.using_arguments,
  }));

export const unmarshalConnectionDependencySchema: z.ZodType<ConnectionDependency> =
  z
    .object({
      connection_name: z.string().optional(),
    })
    .transform(d => ({
      connectionName: d.connection_name,
    }));

export const unmarshalCredentialDependencySchema: z.ZodType<CredentialDependency> =
  z
    .object({
      credential_name: z.string().optional(),
    })
    .transform(d => ({
      credentialName: d.credential_name,
    }));

export const unmarshalDeleteTableConstraintResponseSchema: z.ZodType<DeleteTableConstraintResponse> =
  z.object({});

export const unmarshalDeleteTableResponseSchema: z.ZodType<DeleteTableResponse> =
  z.object({});

export const unmarshalDeltaRuntimePropertiesKvPairsSchema: z.ZodType<DeltaRuntimePropertiesKvPairs> =
  z
    .object({
      delta_runtime_properties: z.record(z.string(), z.string()),
    })
    .transform(d => ({
      deltaRuntimeProperties: d.delta_runtime_properties,
    }));

export const unmarshalDependencySchema: z.ZodType<Dependency> = z
  .object({
    table: z.lazy(() => unmarshalTableDependencySchema).optional(),
    function: z.lazy(() => unmarshalFunctionDependencySchema).optional(),
    connection: z.lazy(() => unmarshalConnectionDependencySchema).optional(),
    credential: z.lazy(() => unmarshalCredentialDependencySchema).optional(),
  })
  .transform(d => ({
    value:
      d.table !== undefined
        ? {$case: 'table' as const, table: d.table}
        : d.function !== undefined
          ? {$case: 'function' as const, function: d.function}
          : d.connection !== undefined
            ? {$case: 'connection' as const, connection: d.connection}
            : d.credential !== undefined
              ? {$case: 'credential' as const, credential: d.credential}
              : undefined,
  }));

export const unmarshalDependencyListSchema: z.ZodType<DependencyList> = z
  .object({
    dependencies: z.array(z.lazy(() => unmarshalDependencySchema)).optional(),
  })
  .transform(d => ({
    dependencies: d.dependencies,
  }));

export const unmarshalEffectivePredictiveOptimizationFlagSchema: z.ZodType<EffectivePredictiveOptimizationFlag> =
  z
    .object({
      value: z.string(),
      inherited_from_type: z.string().optional(),
      inherited_from_name: z.string().optional(),
    })
    .transform(d => ({
      value: d.value,
      inheritedFromType: d.inherited_from_type,
      inheritedFromName: d.inherited_from_name,
    }));

export const unmarshalEncryptionDetailsSchema: z.ZodType<EncryptionDetails> = z
  .object({
    sse_encryption_details: z
      .lazy(() => unmarshalSseEncryptionDetailsSchema)
      .optional(),
  })
  .transform(d => ({
    encryptionDetailsType:
      d.sse_encryption_details !== undefined
        ? {
            $case: 'sseEncryptionDetails' as const,
            sseEncryptionDetails: d.sse_encryption_details,
          }
        : undefined,
  }));

export const unmarshalForeignKeyConstraintSchema: z.ZodType<ForeignKeyConstraint> =
  z
    .object({
      name: z.string(),
      child_columns: z.array(z.string()),
      parent_table: z.string(),
      parent_columns: z.array(z.string()),
      rely: z.boolean().optional(),
    })
    .transform(d => ({
      name: d.name,
      childColumns: d.child_columns,
      parentTable: d.parent_table,
      parentColumns: d.parent_columns,
      rely: d.rely,
    }));

export const unmarshalFunctionDependencySchema: z.ZodType<FunctionDependency> =
  z
    .object({
      function_full_name: z.string(),
    })
    .transform(d => ({
      functionFullName: d.function_full_name,
    }));

export const unmarshalListTableSummariesResponseSchema: z.ZodType<ListTableSummariesResponse> =
  z
    .object({
      tables: z.array(z.lazy(() => unmarshalTableSummarySchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      tables: d.tables,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListTablesResponseSchema: z.ZodType<ListTablesResponse> =
  z
    .object({
      tables: z.array(z.lazy(() => unmarshalTableInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      tables: d.tables,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalNamedTableConstraintSchema: z.ZodType<NamedTableConstraint> =
  z
    .object({
      name: z.string(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalOptionSpecSchema: z.ZodType<OptionSpec> = z
  .object({
    name: z.string().optional(),
    type: z.string().optional(),
    default_value: z.string().optional(),
    allowed_values: z.array(z.string()).optional(),
    hint: z.string().optional(),
    description: z.string().optional(),
    is_required: z.boolean().optional(),
    is_secret: z.boolean().optional(),
    is_hidden: z.boolean().optional(),
    is_updatable: z.boolean().optional(),
    oauth_stage: z.string().optional(),
    is_loggable: z.boolean().optional(),
    is_creatable: z.boolean().optional(),
    is_copiable: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    type: d.type,
    defaultValue: d.default_value,
    allowedValues: d.allowed_values,
    hint: d.hint,
    description: d.description,
    isRequired: d.is_required,
    isSecret: d.is_secret,
    isHidden: d.is_hidden,
    isUpdatable: d.is_updatable,
    oauthStage: d.oauth_stage,
    isLoggable: d.is_loggable,
    isCreatable: d.is_creatable,
    isCopiable: d.is_copiable,
  }));

export const unmarshalPolicyFunctionArgumentSchema: z.ZodType<PolicyFunctionArgument> =
  z
    .object({
      column: z.string().optional(),
      constant: z.string().optional(),
    })
    .transform(d => ({
      arg:
        d.column !== undefined
          ? {$case: 'column' as const, column: d.column}
          : d.constant !== undefined
            ? {$case: 'constant' as const, constant: d.constant}
            : undefined,
    }));

export const unmarshalPrimaryKeyConstraintSchema: z.ZodType<PrimaryKeyConstraint> =
  z
    .object({
      name: z.string(),
      child_columns: z.array(z.string()),
      timeseries_columns: z.array(z.string()).optional(),
      rely: z.boolean().optional(),
    })
    .transform(d => ({
      name: d.name,
      childColumns: d.child_columns,
      timeseriesColumns: d.timeseries_columns,
      rely: d.rely,
    }));

export const unmarshalRowFilterSchema: z.ZodType<RowFilter> = z
  .object({
    function_name: z.string(),
    input_column_names: z.array(z.string()),
    input_arguments: z
      .array(z.lazy(() => unmarshalPolicyFunctionArgumentSchema))
      .optional(),
  })
  .transform(d => ({
    functionName: d.function_name,
    inputColumnNames: d.input_column_names,
    inputArguments: d.input_arguments,
  }));

export const unmarshalSecurableKindManifestSchema: z.ZodType<SecurableKindManifest> =
  z
    .object({
      securable_type: z.string().optional(),
      securable_kind: z.string().optional(),
      assignable_privileges: z.array(z.string()).optional(),
      options: z.array(z.lazy(() => unmarshalOptionSpecSchema)).optional(),
      capabilities: z.array(z.string()).optional(),
    })
    .transform(d => ({
      securableType: d.securable_type,
      securableKind: d.securable_kind,
      assignablePrivileges: d.assignable_privileges,
      options: d.options,
      capabilities: d.capabilities,
    }));

export const unmarshalSseEncryptionDetailsSchema: z.ZodType<SseEncryptionDetails> =
  z
    .object({
      algorithm: z.string().optional(),
      aws_kms_key_arn: z.string().optional(),
    })
    .transform(d => ({
      algorithm: d.algorithm,
      awsKmsKeyArn: d.aws_kms_key_arn,
    }));

export const unmarshalTableConstraintSchema: z.ZodType<TableConstraint> = z
  .object({
    primary_key_constraint: z
      .lazy(() => unmarshalPrimaryKeyConstraintSchema)
      .optional(),
    foreign_key_constraint: z
      .lazy(() => unmarshalForeignKeyConstraintSchema)
      .optional(),
    named_table_constraint: z
      .lazy(() => unmarshalNamedTableConstraintSchema)
      .optional(),
  })
  .transform(d => ({
    constraint:
      d.primary_key_constraint !== undefined
        ? {
            $case: 'primaryKeyConstraint' as const,
            primaryKeyConstraint: d.primary_key_constraint,
          }
        : d.foreign_key_constraint !== undefined
          ? {
              $case: 'foreignKeyConstraint' as const,
              foreignKeyConstraint: d.foreign_key_constraint,
            }
          : d.named_table_constraint !== undefined
            ? {
                $case: 'namedTableConstraint' as const,
                namedTableConstraint: d.named_table_constraint,
              }
            : undefined,
  }));

export const unmarshalTableDependencySchema: z.ZodType<TableDependency> = z
  .object({
    table_full_name: z.string(),
  })
  .transform(d => ({
    tableFullName: d.table_full_name,
  }));

export const unmarshalTableExistsResponseSchema: z.ZodType<TableExistsResponse> =
  z
    .object({
      table_exists: z.boolean().optional(),
    })
    .transform(d => ({
      tableExists: d.table_exists,
    }));

export const unmarshalTableInfoSchema: z.ZodType<TableInfo> = z
  .object({
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    table_type: z.string().optional(),
    data_source_format: z.string().optional(),
    storage_location: z.string().optional(),
    view_definition: z.string().optional(),
    view_dependencies: z.lazy(() => unmarshalDependencyListSchema).optional(),
    sql_path: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_credential_name: z.string().optional(),
    table_constraints: z
      .array(z.lazy(() => unmarshalTableConstraintSchema))
      .optional(),
    row_filter: z.lazy(() => unmarshalRowFilterSchema).optional(),
    pipeline_id: z.string().optional(),
    enable_predictive_optimization: z.string().optional(),
    metastore_id: z.string().optional(),
    full_name: z.string().optional(),
    data_access_configuration_id: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z.string().optional(),
    updated_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z.string().optional(),
    table_id: z.string().optional(),
    delta_runtime_properties_kvpairs: z
      .lazy(() => unmarshalDeltaRuntimePropertiesKvPairsSchema)
      .optional(),
    deleted_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    effective_predictive_optimization_flag: z
      .lazy(() => unmarshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    access_point: z.string().optional(),
    browse_only: z.boolean().optional(),
    encryption_details: z
      .lazy(() => unmarshalEncryptionDetailsSchema)
      .optional(),
    securable_kind_manifest: z
      .lazy(() => unmarshalSecurableKindManifestSchema)
      .optional(),
    columns: z.array(z.lazy(() => unmarshalColumnInfoSchema)).optional(),
    properties: z.record(z.string(), z.string()),
  })
  .transform(d => ({
    name: d.name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    tableType: d.table_type,
    dataSourceFormat: d.data_source_format,
    storageLocation: d.storage_location,
    viewDefinition: d.view_definition,
    viewDependencies: d.view_dependencies,
    sqlPath: d.sql_path,
    owner: d.owner,
    comment: d.comment,
    storageCredentialName: d.storage_credential_name,
    tableConstraints: d.table_constraints,
    rowFilter: d.row_filter,
    pipelineId: d.pipeline_id,
    enablePredictiveOptimization: d.enable_predictive_optimization,
    metastoreId: d.metastore_id,
    fullName: d.full_name,
    dataAccessConfigurationId: d.data_access_configuration_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    tableId: d.table_id,
    deltaRuntimePropertiesKvpairs: d.delta_runtime_properties_kvpairs,
    deletedAt: d.deleted_at,
    effectivePredictiveOptimizationFlag:
      d.effective_predictive_optimization_flag,
    accessPoint: d.access_point,
    browseOnly: d.browse_only,
    encryptionDetails: d.encryption_details,
    securableKindManifest: d.securable_kind_manifest,
    columns: d.columns,
    properties: d.properties,
  }));

export const unmarshalTableSummarySchema: z.ZodType<TableSummary> = z
  .object({
    full_name: z.string().optional(),
    table_type: z.string().optional(),
    securable_kind_manifest: z
      .lazy(() => unmarshalSecurableKindManifestSchema)
      .optional(),
  })
  .transform(d => ({
    fullName: d.full_name,
    tableType: d.table_type,
    securableKindManifest: d.securable_kind_manifest,
  }));

export const unmarshalUpdateTableResponseSchema: z.ZodType<UpdateTableResponse> =
  z.object({});

export const marshalColumnInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    typeText: z.string().optional(),
    typeName: z.string().optional(),
    position: z.number().optional(),
    typePrecision: z.number().optional(),
    typeScale: z.number().optional(),
    typeIntervalType: z.string().optional(),
    typeJson: z.string().optional(),
    comment: z.string().optional(),
    nullable: z.boolean().optional(),
    partitionIndex: z.number().optional(),
    mask: z.lazy(() => marshalColumnMaskSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    type_text: d.typeText,
    type_name: d.typeName,
    position: d.position,
    type_precision: d.typePrecision,
    type_scale: d.typeScale,
    type_interval_type: d.typeIntervalType,
    type_json: d.typeJson,
    comment: d.comment,
    nullable: d.nullable,
    partition_index: d.partitionIndex,
    mask: d.mask,
  }));

export const marshalColumnMaskSchema: z.ZodType = z
  .object({
    functionName: z.string().optional(),
    usingColumnNames: z.array(z.string()).optional(),
    usingArguments: z
      .array(z.lazy(() => marshalPolicyFunctionArgumentSchema))
      .optional(),
  })
  .transform(d => ({
    function_name: d.functionName,
    using_column_names: d.usingColumnNames,
    using_arguments: d.usingArguments,
  }));

export const marshalConnectionDependencySchema: z.ZodType = z
  .object({
    connectionName: z.string().optional(),
  })
  .transform(d => ({
    connection_name: d.connectionName,
  }));

export const marshalCreateTableConstraintRequestSchema: z.ZodType = z
  .object({
    fullNameArg: z.string(),
    constraint: z.lazy(() => marshalTableConstraintSchema),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    constraint: d.constraint,
  }));

export const marshalCreateTableRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    tableType: z.string().optional(),
    dataSourceFormat: z.string().optional(),
    storageLocation: z.string().optional(),
    viewDefinition: z.string().optional(),
    viewDependencies: z.lazy(() => marshalDependencyListSchema).optional(),
    sqlPath: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageCredentialName: z.string().optional(),
    tableConstraints: z
      .array(z.lazy(() => marshalTableConstraintSchema))
      .optional(),
    rowFilter: z.lazy(() => marshalRowFilterSchema).optional(),
    pipelineId: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    dataAccessConfigurationId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    tableId: z.string().optional(),
    deltaRuntimePropertiesKvpairs: z
      .lazy(() => marshalDeltaRuntimePropertiesKvPairsSchema)
      .optional(),
    deletedAt: z.bigint().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    accessPoint: z.string().optional(),
    browseOnly: z.boolean().optional(),
    encryptionDetails: z.lazy(() => marshalEncryptionDetailsSchema).optional(),
    securableKindManifest: z
      .lazy(() => marshalSecurableKindManifestSchema)
      .optional(),
    columns: z.array(z.lazy(() => marshalColumnInfoSchema)).optional(),
    properties: z.record(z.string(), z.string()),
  })
  .transform(d => ({
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    table_type: d.tableType,
    data_source_format: d.dataSourceFormat,
    storage_location: d.storageLocation,
    view_definition: d.viewDefinition,
    view_dependencies: d.viewDependencies,
    sql_path: d.sqlPath,
    owner: d.owner,
    comment: d.comment,
    storage_credential_name: d.storageCredentialName,
    table_constraints: d.tableConstraints,
    row_filter: d.rowFilter,
    pipeline_id: d.pipelineId,
    enable_predictive_optimization: d.enablePredictiveOptimization,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    data_access_configuration_id: d.dataAccessConfigurationId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    table_id: d.tableId,
    delta_runtime_properties_kvpairs: d.deltaRuntimePropertiesKvpairs,
    deleted_at: d.deletedAt,
    effective_predictive_optimization_flag:
      d.effectivePredictiveOptimizationFlag,
    access_point: d.accessPoint,
    browse_only: d.browseOnly,
    encryption_details: d.encryptionDetails,
    securable_kind_manifest: d.securableKindManifest,
    columns: d.columns,
    properties: d.properties,
  }));

export const marshalCredentialDependencySchema: z.ZodType = z
  .object({
    credentialName: z.string().optional(),
  })
  .transform(d => ({
    credential_name: d.credentialName,
  }));

export const marshalDeltaRuntimePropertiesKvPairsSchema: z.ZodType = z
  .object({
    deltaRuntimeProperties: z.record(z.string(), z.string()),
  })
  .transform(d => ({
    delta_runtime_properties: d.deltaRuntimeProperties,
  }));

export const marshalDependencySchema: z.ZodType = z
  .object({
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('table'),
          table: z.lazy(() => marshalTableDependencySchema),
        }),
        z.object({
          $case: z.literal('function'),
          function: z.lazy(() => marshalFunctionDependencySchema),
        }),
        z.object({
          $case: z.literal('connection'),
          connection: z.lazy(() => marshalConnectionDependencySchema),
        }),
        z.object({
          $case: z.literal('credential'),
          credential: z.lazy(() => marshalCredentialDependencySchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.value?.$case === 'table' && {table: d.value.table}),
    ...(d.value?.$case === 'function' && {function: d.value.function}),
    ...(d.value?.$case === 'connection' && {connection: d.value.connection}),
    ...(d.value?.$case === 'credential' && {credential: d.value.credential}),
  }));

export const marshalDependencyListSchema: z.ZodType = z
  .object({
    dependencies: z.array(z.lazy(() => marshalDependencySchema)).optional(),
  })
  .transform(d => ({
    dependencies: d.dependencies,
  }));

export const marshalEffectivePredictiveOptimizationFlagSchema: z.ZodType = z
  .object({
    value: z.string(),
    inheritedFromType: z.string().optional(),
    inheritedFromName: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
    inherited_from_type: d.inheritedFromType,
    inherited_from_name: d.inheritedFromName,
  }));

export const marshalEncryptionDetailsSchema: z.ZodType = z
  .object({
    encryptionDetailsType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('sseEncryptionDetails'),
          sseEncryptionDetails: z.lazy(() => marshalSseEncryptionDetailsSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.encryptionDetailsType?.$case === 'sseEncryptionDetails' && {
      sse_encryption_details: d.encryptionDetailsType.sseEncryptionDetails,
    }),
  }));

export const marshalForeignKeyConstraintSchema: z.ZodType = z
  .object({
    name: z.string(),
    childColumns: z.array(z.string()),
    parentTable: z.string(),
    parentColumns: z.array(z.string()),
    rely: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    child_columns: d.childColumns,
    parent_table: d.parentTable,
    parent_columns: d.parentColumns,
    rely: d.rely,
  }));

export const marshalFunctionDependencySchema: z.ZodType = z
  .object({
    functionFullName: z.string(),
  })
  .transform(d => ({
    function_full_name: d.functionFullName,
  }));

export const marshalNamedTableConstraintSchema: z.ZodType = z
  .object({
    name: z.string(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalOptionSpecSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    type: z.string().optional(),
    defaultValue: z.string().optional(),
    allowedValues: z.array(z.string()).optional(),
    hint: z.string().optional(),
    description: z.string().optional(),
    isRequired: z.boolean().optional(),
    isSecret: z.boolean().optional(),
    isHidden: z.boolean().optional(),
    isUpdatable: z.boolean().optional(),
    oauthStage: z.string().optional(),
    isLoggable: z.boolean().optional(),
    isCreatable: z.boolean().optional(),
    isCopiable: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    type: d.type,
    default_value: d.defaultValue,
    allowed_values: d.allowedValues,
    hint: d.hint,
    description: d.description,
    is_required: d.isRequired,
    is_secret: d.isSecret,
    is_hidden: d.isHidden,
    is_updatable: d.isUpdatable,
    oauth_stage: d.oauthStage,
    is_loggable: d.isLoggable,
    is_creatable: d.isCreatable,
    is_copiable: d.isCopiable,
  }));

export const marshalPolicyFunctionArgumentSchema: z.ZodType = z
  .object({
    arg: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('column'), column: z.string()}),
        z.object({$case: z.literal('constant'), constant: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.arg?.$case === 'column' && {column: d.arg.column}),
    ...(d.arg?.$case === 'constant' && {constant: d.arg.constant}),
  }));

export const marshalPrimaryKeyConstraintSchema: z.ZodType = z
  .object({
    name: z.string(),
    childColumns: z.array(z.string()),
    timeseriesColumns: z.array(z.string()).optional(),
    rely: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    child_columns: d.childColumns,
    timeseries_columns: d.timeseriesColumns,
    rely: d.rely,
  }));

export const marshalRowFilterSchema: z.ZodType = z
  .object({
    functionName: z.string(),
    inputColumnNames: z.array(z.string()),
    inputArguments: z
      .array(z.lazy(() => marshalPolicyFunctionArgumentSchema))
      .optional(),
  })
  .transform(d => ({
    function_name: d.functionName,
    input_column_names: d.inputColumnNames,
    input_arguments: d.inputArguments,
  }));

export const marshalSecurableKindManifestSchema: z.ZodType = z
  .object({
    securableType: z.string().optional(),
    securableKind: z.string().optional(),
    assignablePrivileges: z.array(z.string()).optional(),
    options: z.array(z.lazy(() => marshalOptionSpecSchema)).optional(),
    capabilities: z.array(z.string()).optional(),
  })
  .transform(d => ({
    securable_type: d.securableType,
    securable_kind: d.securableKind,
    assignable_privileges: d.assignablePrivileges,
    options: d.options,
    capabilities: d.capabilities,
  }));

export const marshalSseEncryptionDetailsSchema: z.ZodType = z
  .object({
    algorithm: z.string().optional(),
    awsKmsKeyArn: z.string().optional(),
  })
  .transform(d => ({
    algorithm: d.algorithm,
    aws_kms_key_arn: d.awsKmsKeyArn,
  }));

export const marshalTableConstraintSchema: z.ZodType = z
  .object({
    constraint: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('primaryKeyConstraint'),
          primaryKeyConstraint: z.lazy(() => marshalPrimaryKeyConstraintSchema),
        }),
        z.object({
          $case: z.literal('foreignKeyConstraint'),
          foreignKeyConstraint: z.lazy(() => marshalForeignKeyConstraintSchema),
        }),
        z.object({
          $case: z.literal('namedTableConstraint'),
          namedTableConstraint: z.lazy(() => marshalNamedTableConstraintSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.constraint?.$case === 'primaryKeyConstraint' && {
      primary_key_constraint: d.constraint.primaryKeyConstraint,
    }),
    ...(d.constraint?.$case === 'foreignKeyConstraint' && {
      foreign_key_constraint: d.constraint.foreignKeyConstraint,
    }),
    ...(d.constraint?.$case === 'namedTableConstraint' && {
      named_table_constraint: d.constraint.namedTableConstraint,
    }),
  }));

export const marshalTableDependencySchema: z.ZodType = z
  .object({
    tableFullName: z.string(),
  })
  .transform(d => ({
    table_full_name: d.tableFullName,
  }));

export const marshalUpdateTableRequestSchema: z.ZodType = z
  .object({
    fullNameArg: z.string(),
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    tableType: z.string().optional(),
    dataSourceFormat: z.string().optional(),
    storageLocation: z.string().optional(),
    viewDefinition: z.string().optional(),
    viewDependencies: z.lazy(() => marshalDependencyListSchema).optional(),
    sqlPath: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageCredentialName: z.string().optional(),
    tableConstraints: z
      .array(z.lazy(() => marshalTableConstraintSchema))
      .optional(),
    rowFilter: z.lazy(() => marshalRowFilterSchema).optional(),
    pipelineId: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    dataAccessConfigurationId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    tableId: z.string().optional(),
    deltaRuntimePropertiesKvpairs: z
      .lazy(() => marshalDeltaRuntimePropertiesKvPairsSchema)
      .optional(),
    deletedAt: z.bigint().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    accessPoint: z.string().optional(),
    browseOnly: z.boolean().optional(),
    encryptionDetails: z.lazy(() => marshalEncryptionDetailsSchema).optional(),
    securableKindManifest: z
      .lazy(() => marshalSecurableKindManifestSchema)
      .optional(),
    columns: z.array(z.lazy(() => marshalColumnInfoSchema)).optional(),
    properties: z.record(z.string(), z.string()),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    table_type: d.tableType,
    data_source_format: d.dataSourceFormat,
    storage_location: d.storageLocation,
    view_definition: d.viewDefinition,
    view_dependencies: d.viewDependencies,
    sql_path: d.sqlPath,
    owner: d.owner,
    comment: d.comment,
    storage_credential_name: d.storageCredentialName,
    table_constraints: d.tableConstraints,
    row_filter: d.rowFilter,
    pipeline_id: d.pipelineId,
    enable_predictive_optimization: d.enablePredictiveOptimization,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    data_access_configuration_id: d.dataAccessConfigurationId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    table_id: d.tableId,
    delta_runtime_properties_kvpairs: d.deltaRuntimePropertiesKvpairs,
    deleted_at: d.deletedAt,
    effective_predictive_optimization_flag:
      d.effectivePredictiveOptimizationFlag,
    access_point: d.accessPoint,
    browse_only: d.browseOnly,
    encryption_details: d.encryptionDetails,
    securable_kind_manifest: d.securableKindManifest,
    columns: d.columns,
    properties: d.properties,
  }));
