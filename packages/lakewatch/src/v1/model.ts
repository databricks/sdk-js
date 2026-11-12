// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Compute mode for the datasource's ingestion job. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DatasourceComputeMode = {
  /**
   * Runs the ingestion job in serverless standard performance mode, which
   * enables cost-efficient execution.
   */
  DS_COMPUTE_STANDARD: 'DS_COMPUTE_STANDARD',
  /**
   * Runs the ingestion job in serverless performance-optimized mode, which
   * prioritizes fast startup and execution times.
   */
  DS_COMPUTE_PERFORMANCE_OPTIMIZED: 'DS_COMPUTE_PERFORMANCE_OPTIMIZED',
} as const;
export type DatasourceComputeMode =
  | (typeof DatasourceComputeMode)[keyof typeof DatasourceComputeMode]
  | (string & {});

/** Which fields list responses return for each datasource. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DatasourceView = {
  /**
   * Unset is treated as `DATASOURCE_VIEW_FULL`, preserving the behavior of
   * callers that do not request a view.
   */
  DATASOURCE_VIEW_UNSPECIFIED: 'DATASOURCE_VIEW_UNSPECIFIED',
  /**
   * Returns only the identity and Unity Catalog location fields: `name`, `datasource_id`,
   * `catalog_name`, `schema_name`, `datasource_name`, and `owner`. Other fields, such as
   * `etag`, the ingestion method, `schedule`, and `status`, are omitted.
   */
  DATASOURCE_VIEW_BASIC: 'DATASOURCE_VIEW_BASIC',
  /** Returns the full datasource, including its ingestion method, schedule, and status. */
  DATASOURCE_VIEW_FULL: 'DATASOURCE_VIEW_FULL',
} as const;
export type DatasourceView =
  | (typeof DatasourceView)[keyof typeof DatasourceView]
  | (string & {});

/** Type of a principal (user / SP / system). */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PrincipalType = {
  /** A human user account. */
  REGULAR_USER: 'REGULAR_USER',
  /** A service principal (non-human automation identity). */
  SERVICE_PRINCIPAL: 'SERVICE_PRINCIPAL',
  /** A Databricks-internal system identity acting on the user's behalf. */
  SYSTEM_USER: 'SYSTEM_USER',
} as const;
export type PrincipalType =
  | (typeof PrincipalType)[keyof typeof PrincipalType]
  | (string & {});

/** Signal deduplication mode for a detection rule. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RuleDeduplication = {
  /** Use the default behavior, which deduplicates this rule's signals. */
  DEDUPLICATION_DEFAULT: 'DEDUPLICATION_DEFAULT',
  /** Always deduplicate this rule's signals. */
  DEDUPLICATION_ENABLED: 'DEDUPLICATION_ENABLED',
  /** Never deduplicate this rule's signals. */
  DEDUPLICATION_DISABLED: 'DEDUPLICATION_DISABLED',
} as const;
export type RuleDeduplication =
  | (typeof RuleDeduplication)[keyof typeof RuleDeduplication]
  | (string & {});

/** Maturity of a detection rule. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RuleFidelity = {
  /** Rule is being developed or tested. */
  FIDELITY_DEVELOPMENT: 'FIDELITY_DEVELOPMENT',
  /** Rule is useful for investigation but not yet high-confidence alerting. */
  FIDELITY_INVESTIGATIVE: 'FIDELITY_INVESTIGATIVE',
  /** Rule has medium-confidence signal quality. */
  FIDELITY_MEDIUM: 'FIDELITY_MEDIUM',
  /** Rule has high-confidence signal quality. */
  FIDELITY_HIGH: 'FIDELITY_HIGH',
} as const;
export type RuleFidelity =
  | (typeof RuleFidelity)[keyof typeof RuleFidelity]
  | (string & {});

/** Selects how much of each rule a list response returns. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RuleView = {
  /** Treated as `RULE_VIEW_FULL`. */
  RULE_VIEW_UNSPECIFIED: 'RULE_VIEW_UNSPECIFIED',
  /**
   * Only the rule's identity and Unity Catalog location: `name`, `rule_id`, `catalog_name`,
   * `schema_name`, `rule_name`, and `owner`. The `etag`, detection query, schedule, and status
   * are omitted. Only fully provisioned rules are listed; rules that are still being created or
   * deleted are omitted.
   */
  RULE_VIEW_BASIC: 'RULE_VIEW_BASIC',
  /** The complete `Rule`, including the detection query, schedule, and status. */
  RULE_VIEW_FULL: 'RULE_VIEW_FULL',
} as const;
export type RuleView = (typeof RuleView)[keyof typeof RuleView] | (string & {});

/** File format of the source files that Auto Loader reads. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AutoLoader_Format = {
  /** One JSON document per file, which can span multiple lines. */
  AUTOLOADER_FORMAT_JSON: 'AUTOLOADER_FORMAT_JSON',
  /** Newline-delimited JSON — one document per line. */
  AUTOLOADER_FORMAT_JSONL: 'AUTOLOADER_FORMAT_JSONL',
  /** Comma-separated values. Parsing options are supplied via `format_options`. */
  AUTOLOADER_FORMAT_CSV: 'AUTOLOADER_FORMAT_CSV',
  /** Apache Parquet. */
  AUTOLOADER_FORMAT_PARQUET: 'AUTOLOADER_FORMAT_PARQUET',
  /** XML. Parsing options are supplied via `format_options`. */
  AUTOLOADER_FORMAT_XML: 'AUTOLOADER_FORMAT_XML',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AutoLoader_Format =
  | (typeof AutoLoader_Format)[keyof typeof AutoLoader_Format]
  | (string & {});

/** Configured scheduling / existence of the job or pipeline. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ResourceStatus_Lifecycle = {
  /** Exists but is not scheduled (disabled). */
  UNSCHEDULED: 'UNSCHEDULED',
  /** Scheduled / enabled. */
  SCHEDULED: 'SCHEDULED',
  /** Pipeline paused / wrapping job removed, but the definition is preserved. */
  STOPPED: 'STOPPED',
  /** The job or pipeline has been deleted. */
  DELETED: 'DELETED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ResourceStatus_Lifecycle =
  | (typeof ResourceStatus_Lifecycle)[keyof typeof ResourceStatus_Lifecycle]
  | (string & {});

/** Outcome / progress of the most recent (or in-flight) run. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ResourceStatus_RunState = {
  /** The most recent run is currently in progress. */
  RUNNING: 'RUNNING',
  /** The most recent run completed successfully. */
  SUCCEEDED: 'SUCCEEDED',
  /** The most recent run finished with a failure. */
  FAILED: 'FAILED',
  /** The most recent run was canceled before completing. */
  CANCELED: 'CANCELED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ResourceStatus_RunState =
  | (typeof ResourceStatus_RunState)[keyof typeof ResourceStatus_RunState]
  | (string & {});

/**
 * Per-catalog alert-related config. Singleton.
 * Name format: `catalogs/{catalog}/alertConfig`.
 */
export interface AlertConfig {
  name?: string | undefined;
  /**
   * Monotonic version, bumped on each update. Informational; use `etag` for
   * optimistic concurrency.
   */
  version?: bigint | undefined;
  updateTime?: Temporal.Instant | undefined;
  updatedBy?: Principal | undefined;
  /**
   * Opaque entity tag for optimistic concurrency. Returned on every read;
   * pass it back as the Update request's `etag` to make the update
   * conditional on the resource being unchanged.
   */
  etag?: string | undefined;
  /**
   * Window for collating Signals into security alerts. Duration
   * string — compact day/hour/minute/second components, e.g. `1d`, `12h`
   * (see `Schedule.at_least_every` in common.proto for the grammar). Reads
   * return the value as supplied. When unset or empty, the window is `1h`; the window in
   * effect is reported in `effective_default_security_alert_collation_window`.
   */
  defaultSecurityAlertCollationWindow?: string | undefined;
  /**
   * Window for collating SystemEvents into system alerts. Duration
   * string — compact day/hour/minute/second components, e.g. `1d`, `12h`
   * (see `Schedule.at_least_every` in common.proto for the grammar). Reads
   * return the value as supplied. When unset or empty, the window is `1d`; the window in
   * effect is reported in `effective_default_system_alert_collation_window`.
   */
  defaultSystemAlertCollationWindow?: string | undefined;
  /**
   * Export destination for security alerts. When unset, export is off and reads
   * return `{"enabled": false}`.
   */
  securityAlertExportConfig?: ExportConfig | undefined;
  /**
   * Export destination for system alerts. When unset, export is off and reads
   * return `{"enabled": false}`.
   */
  systemAlertExportConfig?: ExportConfig | undefined;
  /**
   * The security alert collation window in effect:
   * `default_security_alert_collation_window` when set, otherwise `1h`.
   */
  effectiveDefaultSecurityAlertCollationWindow?: string | undefined;
  /**
   * The system alert collation window in effect:
   * `default_system_alert_collation_window` when set, otherwise `1d`.
   */
  effectiveDefaultSystemAlertCollationWindow?: string | undefined;
}

/**
 * Ingests files from cloud storage with Auto Loader. Mutually exclusive with
 * `unity_catalog_connection` and `existing_table`.
 */
export interface AutoLoader {
  /** File format of the source files. Required. */
  format?: AutoLoader_Format | undefined;
  /**
   * URI of the source files: a path in a Unity Catalog volume or external location, or a
   * cloud storage URL such as an Amazon S3 path. Required, including when new files are
   * discovered through `queue_url`. Cannot be changed after creation.
   */
  location?: string | undefined;
  /**
   * Format-specific parsing options, passed to Auto Loader. Supported for the CSV, JSON, JSONL,
   * and XML formats, each of which accepts a fixed set of options. The XML format requires the
   * `rowTag` option.
   */
  formatOptions?: Record<string, string> | undefined;
  /**
   * AWS credentials for accessing the source files in Amazon S3, the Amazon SQS queue set in
   * `queue_url`, or both. Set at most one.
   */
  credentials?:
    | {
        $case: 'serviceCredentials';
        /** Name of the Unity Catalog service credential to use. */
        serviceCredentials: string;
      }
    | {
        $case: 'awsSecretScope';
        /**
         * Name of the workspace secret scope that holds the AWS access key ID and secret access key,
         * under the keys `awsAccessKeyId` and `awsSecretAccessKey`.
         */
        awsSecretScope: string;
      }
    | undefined;
  /**
   * Hive-style partition columns to derive from the source file paths. If unset, no partition
   * columns are derived.
   */
  overridePartitionColumns?: string[] | undefined;
  /**
   * Table that stores the raw data before parsers schematize it. Every Auto Loader datasource
   * writes its raw rows to this table before any parser reads them. The table must be in the
   * datasource's catalog and schema; an omitted `catalog_name` or `schema_name` defaults to
   * them. Cannot be changed after creation. Reads return the value as supplied; the table the
   * data is written to is reported in `effective_raw_table`.
   */
  rawTable?: TableName | undefined;
  /**
   * How to unwrap a transport envelope around the source records before parsing. Supported only
   * for the JSON and JSONL formats. If unset, each source record is treated as one event.
   */
  envelope?: Envelope | undefined;
  /**
   * URL of a customer-managed Amazon SQS queue that receives file-arrival notifications. Set it
   * to discover new files through the queue. If unset, new files are discovered through the
   * file events of the source's Unity Catalog external location when it has them configured,
   * and by directory listing otherwise. Cannot be changed after creation.
   */
  queueUrl?: string | undefined;
  /**
   * The table that the raw data is written to: `raw_table` in the datasource's catalog and
   * schema, under their current Unity Catalog names. Populated on get, create, and update
   * responses.
   */
  effectiveRawTable?: TableName | undefined;
  /**
   * Whether to ingest the files already present at `location` when ingestion
   * first starts. Set true to ingest the existing files and then every new file.
   * Set false, or leave unset, to ingest only files that arrive after the
   * datasource starts. Defaults to false. Cannot be changed after creation.
   * Reads return the value as supplied; the setting in effect is reported in
   * `effective_include_existing_files`.
   */
  includeExistingFiles?: boolean | undefined;
  /**
   * Whether ingestion started with the files already present at `location`. Populated on get,
   * create, and update responses.
   */
  effectiveIncludeExistingFiles?: boolean | undefined;
}

/**
 * Unwraps an AWS CloudWatch Logs delivery envelope: each element of `logEvents`
 * becomes its own row, with the element's `message` parsed as the event body.
 */
export interface CloudWatchLogsEnvelope {
  /**
   * Whether to keep the envelope's `owner`, `logGroup`, and `logStream` values in
   * the `data.lw_header` field of each unwrapped row. Must be set explicitly to
   * `true` or `false`.
   */
  headerRetention?: boolean | undefined;
}

/**
 * Catch-all per-catalog config — settings that don't belong to any one
 * resource family. Singleton. Name format: `catalogs/{catalog}/commonConfig`.
 */
export interface CommonConfig {
  name?: string | undefined;
  /**
   * Monotonic version, bumped on each update. Informational; use `etag` for
   * optimistic concurrency.
   */
  version?: bigint | undefined;
  updateTime?: Temporal.Instant | undefined;
  updatedBy?: Principal | undefined;
  /**
   * Opaque entity tag for optimistic concurrency. Returned on every read;
   * pass it back as the Update request's `etag` to make the update
   * conditional on the resource being unchanged.
   */
  etag?: string | undefined;
  /**
   * Whether users may grant permissions on individual resources rather than
   * only at the Folder level.
   */
  perResourcePermissionsEnabled?: boolean | undefined;
}

/**
 * Reference to the ContentPack (and pack version) a resource was originally
 * installed from.
 */
export interface ContentPackReference {
  /** UUID of the content pack. */
  uuid?: string | undefined;
  /** Pack version the resource was installed from. */
  version?: string | undefined;
}

export interface CreateDatasourceRequest {
  datasource?: Datasource | undefined;
}

export interface CreateRuleRequest {
  /**
   * The rule to create. Server-assigned fields (`name`, `rule_id`, timestamps,
   * `etag`, …) are ignored on the request.
   */
  rule?: Rule | undefined;
}

/**
 * A Lakewatch datasource: a pipeline that ingests security data and writes it to Unity
 * Catalog tables.
 *
 * What a datasource ingests is defined by its ingestion method (`autoloader`,
 * `unity_catalog_connection`, or `existing_table`), which sets how the data arrives,
 * together with its `parsers`, which define the schemas that the arriving data is matched
 * against and written as.
 */
export interface Datasource {
  /**
   * Resource name of the datasource, in the format `datasources/{datasource_id}`. Unlike the
   * datasource's Unity Catalog location (`catalog_name`, `schema_name`, and `datasource_name`),
   * the name does not change when the datasource or its catalog or schema is renamed in Unity
   * Catalog.
   */
  name?: string | undefined;
  /**
   * Unity Catalog securable ID (a UUID) of the datasource. It never changes, including when the
   * datasource is renamed in Unity Catalog, and is the final segment of `name`.
   */
  datasourceId?: string | undefined;
  /**
   * Name of the Unity Catalog catalog that contains the datasource. Required on create and
   * cannot be changed afterward. Reads return the value as supplied; the catalog's current name
   * is reported in `effective_catalog_name`.
   */
  catalogName?: string | undefined;
  /**
   * Name of the Unity Catalog schema that contains the datasource. Required on create and
   * cannot be changed afterward. Reads return the value as supplied; the schema's current name
   * is reported in `effective_schema_name`.
   */
  schemaName?: string | undefined;
  /**
   * Current name of the Unity Catalog catalog that contains the datasource, which reflects
   * catalog renames without a change to `catalog_name`. Populated on get, create, and update
   * responses; list responses omit it.
   */
  effectiveCatalogName?: string | undefined;
  /**
   * Current name of the Unity Catalog schema that contains the datasource, which reflects
   * schema renames without a change to `schema_name`. Populated on get, create, and update
   * responses; list responses omit it.
   */
  effectiveSchemaName?: string | undefined;
  /**
   * Name of the datasource in Unity Catalog, unique within its schema. Required on create and
   * can be updated within the same catalog and schema. Get synchronizes this field with the
   * current Unity Catalog name, also reported in `effective_datasource_name`.
   */
  datasourceName?: string | undefined;
  /**
   * Current UC leaf name of the datasource (server-owned). Tracks UC renames so
   * callers can observe the live name without having to update the client-owned
   * `datasource_name`; unset until resolved.
   */
  effectiveDatasourceName?: string | undefined;
  /** Free-form description of the datasource. */
  description?: string | undefined;
  /**
   * Version number of the datasource, incremented on each update. Informational only; use
   * `etag` for optimistic concurrency control.
   */
  version?: bigint | undefined;
  createTime?: Temporal.Instant | undefined;
  updateTime?: Temporal.Instant | undefined;
  createdBy?: Principal | undefined;
  updatedBy?: Principal | undefined;
  /**
   * Opaque entity tag for optimistic concurrency control. Returned by get, create, and update
   * responses and by list responses in the `DATASOURCE_VIEW_FULL` view. To make an update
   * conditional on the datasource not having changed since it was read, pass this value as the
   * update request's `etag`. Changes to `status` do not change the etag.
   */
  etag?: string | undefined;
  /** Free-form key-value annotations on the datasource, managed by the client. */
  annotations?: Record<string, string> | undefined;
  /** Unity Catalog owner of the datasource, assigned by the server. Create responses omit it. */
  owner?: Principal | undefined;
  /**
   * The user or service principal that the datasource runs as, given as a user email or
   * service principal application ID. When it is supplied on create or update, the requester
   * must be authorized to run the datasource as that principal, or the request is rejected.
   * When it is omitted on create, the datasource runs as the requester. On update, a mask that
   * includes `run_as_principal` without a value clears it, so the datasource runs as the
   * requester; a mask that omits it keeps the current identity. Reads return the value as
   * supplied; the identity the datasource runs as is reported in `effective_run_as_principal`.
   */
  runAsPrincipal?: string | undefined;
  /**
   * The identity the datasource runs as: the resolved `run_as_principal`, or the requester's
   * identity if `run_as_principal` was omitted on create or cleared on update. Given as a user
   * email or service principal application ID, or as the numeric principal ID if the identity
   * can no longer be resolved. Populated on get, create, and update responses; list responses
   * omit it.
   */
  effectiveRunAsPrincipal?: string | undefined;
  /**
   * How the datasource ingests data. Exactly one ingestion method is required, and it cannot be
   * changed after creation.
   */
  ingestionMethod?:
    | {$case: 'autoloader'; autoloader: AutoLoader}
    | {
        $case: 'unityCatalogConnection';
        unityCatalogConnection: UnityCatalogConnection;
      }
    | {$case: 'existingTable'; existingTable: ExistingTable}
    | undefined;
  /**
   * Parsers that schematize the ingested data. Each record is matched against the parsers in
   * order and written to the parsed table of the first parser that it matches. Existing-table
   * and Unity Catalog connection datasources require at least one parser; an Auto Loader
   * datasource with no parsers writes only its raw table.
   */
  parsers?: ParserRef[] | undefined;
  /**
   * Schedule on which the datasource's ingestion job runs. A datasource cannot be paused, so a
   * request that sets `schedule.enabled` to `false` is rejected. Continuous schedules are not
   * supported for Unity Catalog connection datasources.
   */
  schedule?: Schedule | undefined;
  /**
   * Compute mode for the datasource's ingestion job. If unset, the `default_compute_mode` of
   * the catalog's datasource configuration applies, or `DS_COMPUTE_PERFORMANCE_OPTIMIZED` if
   * the catalog has none.
   */
  computeMode?: DatasourceComputeMode | undefined;
  /** Runtime status of the jobs and pipelines that run this datasource. */
  status?: DatasourceStatus | undefined;
  /**
   * ID of the SQL warehouse that runs the checks Lakewatch performs to validate a create or update
   * request, such as source and destination access checks. Required and non-blank on every create
   * and update request except a rename-only PATCH; there is no default warehouse. The requester
   * must be able to use the warehouse. It is not stored, is not returned on reads, and does
   * not affect the compute that runs the ingestion job.
   */
  warehouseId?: string | undefined;
  /**
   * ID of the workspace whose compute runs this datasource's ingestion job and
   * owns its associated resources, such as the storage the ingested data lands
   * in. Server-assigned.
   */
  computeWorkspaceId?: string | undefined;
}

/**
 * Per-catalog datasource-related config. Singleton.
 * Name format: `catalogs/{catalog}/datasourceConfig`.
 */
export interface DatasourceConfig {
  name?: string | undefined;
  /**
   * Monotonic version, bumped on each update. Informational; use `etag` for
   * optimistic concurrency.
   */
  version?: bigint | undefined;
  updateTime?: Temporal.Instant | undefined;
  updatedBy?: Principal | undefined;
  /**
   * Opaque entity tag for optimistic concurrency. Returned on every read;
   * pass it back as the Update request's `etag` to make the update
   * conditional on the resource being unchanged.
   */
  etag?: string | undefined;
  /**
   * Default compute mode applied to datasource ingestion jobs when the
   * individual datasource doesn't override it. v1
   * `datasources.defaultComputeMode`.
   */
  defaultComputeMode?: DatasourceComputeMode | undefined;
  /**
   * Schema name of the registered folder (in this catalog) that a new datasource
   * is placed in when the request does not specify a schema. Must name a schema
   * registered as a folder. Omit to clear. Reads return the value as supplied; the
   * folder's current schema name is reported in `effective_default_folder`.
   */
  defaultFolder?: string | undefined;
  /**
   * The current schema name of the `default_folder` folder. Tracks UC schema
   * renames. Unset when no default is configured, or when the folder's schema no
   * longer exists or is not visible to the caller.
   */
  effectiveDefaultFolder?: string | undefined;
}

/**
 * Read-only runtime status of a datasource, with the status of each job and pipeline that
 * runs it.
 */
export interface DatasourceStatus {
  /** Status of the datasource's ingestion job. */
  ingestionJob?: ResourceStatus | undefined;
  /**
   * Status of the managed ingestion pipeline. Populated only when `unity_catalog_connection`
   * is set, with `pipeline_id` identifying the pipeline.
   */
  ingestionPipeline?: ResourceStatus | undefined;
}

export interface DeleteDatasourceRequest {
  name?: string | undefined;
}

export interface DeleteRuleRequest {
  /** Resource name of the rule to delete. Format: `rules/{rule_id}`. */
  name?: string | undefined;
}

/**
 * Unwraps a transport envelope from the source data so that each contained event becomes
 * its own row. Applied when the source data is read, before parsing.
 */
export interface Envelope {
  /** Type of envelope to unwrap. Exactly one type must be set. */
  kind?:
    | {$case: 'jsonArray'; jsonArray: JsonArrayEnvelope}
    | {$case: 'cloudWatchLogs'; cloudWatchLogs: CloudWatchLogsEnvelope}
    | undefined;
}

/**
 * Uses an existing Unity Catalog Delta table or view as the datasource's source. Mutually
 * exclusive with `autoloader` and `unity_catalog_connection`.
 */
export interface ExistingTable {
  /**
   * Name of the source table or view. Required on create and cannot be changed.
   * Reads return the value as supplied; the table's current name is reported in
   * `effective_name`.
   */
  name?: string | undefined;
  /**
   * Name of the catalog the existing table lives in. Optional on create and
   * defaults to the datasource's own catalog. Cannot be changed. Reads return
   * the value as supplied; the catalog in use is reported in `effective_catalog`.
   */
  catalog?: string | undefined;
  /**
   * Name of the schema the existing table lives in. Optional, but required when
   * `catalog` is set; supplying `catalog` without `schema` is rejected. Defaults
   * to the datasource's own schema. Cannot be changed. Reads return the value as
   * supplied; the schema in use is reported in `effective_schema`.
   */
  schema?: string | undefined;
  /**
   * Whether to ingest the rows already present in the source table when
   * ingestion first starts. Set true to ingest the existing rows and then every
   * new commit. Set false, or leave unset, to ingest only rows written after the
   * datasource starts. Defaults to false, and must be true for a Delta Sharing
   * source table. Takes effect only at first start and cannot be changed. Reads
   * return the value as supplied.
   */
  includeExistingRows?: boolean | undefined;
  /**
   * Current Unity Catalog catalog name of the source table, resolved from its
   * stable table ID, so a rename of the source table is reported here without
   * changing `catalog`.
   */
  effectiveCatalog?: string | undefined;
  /**
   * Current Unity Catalog schema name of the source table, resolved from its
   * stable table ID.
   */
  effectiveSchema?: string | undefined;
  /**
   * Current Unity Catalog name of the source table, resolved from its stable
   * table ID.
   */
  effectiveName?: string | undefined;
}

/**
 * Configuration for delivering events / alerts to an external destination.
 *
 * Exactly one of the destination variants is set; the server picks it via
 * the `oneof`.
 */
export interface ExportConfig {
  /** Whether export is currently active. */
  enabled?: boolean | undefined;
  destination?:
    | {$case: 'webhook'; webhook: WebhookExportConfig}
    | {$case: 'jira'; jira: JiraExportConfig}
    | {$case: 'slack'; slack: SlackExportConfig}
    | {$case: 'tines'; tines: TinesExportConfig}
    | {$case: 'serviceNow'; serviceNow: ServiceNowExportConfig}
    | undefined;
  /**
   * Deprecated and ignored: exports always egress through the request's own
   * workspace. Kept so configs stored by older builds still round-trip.
   */
  workspaceId?: string | undefined;
}

export interface GetAlertConfigRequest {
  name?: string | undefined;
}

export interface GetCommonConfigRequest {
  name?: string | undefined;
}

export interface GetDatasourceConfigRequest {
  name?: string | undefined;
}

export interface GetDatasourceRequest {
  name?: string | undefined;
}

export interface GetRuleConfigRequest {
  name?: string | undefined;
}

export interface GetRuleRequest {
  /** Full resource name of the detection rule, in the form `rules/{rule_id}`. */
  name?: string | undefined;
}

export interface JiraExportConfig {
  /** Jira instance URL (e.g. `https://acme.atlassian.net`). */
  instanceUrl?: string | undefined;
  /** Jira project key the exported issues are created under. */
  projectKey?: string | undefined;
  /** User email paired with the API token for Jira Cloud basic auth. */
  userEmail?: string | undefined;
  /**
   * Default issue type for created tickets (e.g. `Task`, `Incident`). Jira issue creation
   * requires an issue type, so it is validated at config-save time rather than failing the
   * export at Jira later.
   */
  defaultIssueType?: string | undefined;
  /**
   * Three-level Unity Catalog name (`catalog.schema.secret`) of the secret holding
   * the Jira API token, paired with `user_email` as the Jira Cloud basic-auth
   * credential (`email:token`). Only the name is stored; the token is read when an
   * alert is exported, so rotating the secret takes effect without editing this config.
   */
  apiTokenUcSecret?: string | undefined;
}

/** Unwraps a JSON array of events into one row per array element. */
export interface JsonArrayEnvelope {
  /**
   * Name of the root-level key that holds the array of events, for example
   * `Records`. Nested paths are not supported.
   */
  path?: string | undefined;
}

export interface ListDatasourcesRequest {
  /**
   * Maximum number of results to return in one page. This is a best-effort upper
   * bound, not a guarantee: the server may return fewer items than requested (even
   * zero) while more results still exist. If unset or 0, the server picks a default.
   */
  pageSize?: number | undefined;
  pageToken?: string | undefined;
  /**
   * Filter expression that restricts the results to datasources with a given name, for example
   * `datasource_name = "my_source"`. Only a single exact-match comparison on `datasource_name`
   * is supported, and it matches the datasource's current Unity Catalog name, which reads report
   * in `effective_datasource_name`. Filtered results are returned in a single page.
   */
  filter?: string | undefined;
  /**
   * Name of the Unity Catalog catalog to list datasources from. Required; each request lists the
   * datasources of a single catalog.
   */
  catalogName?: string | undefined;
  /**
   * Name of a Unity Catalog schema in `catalog_name`. Optional; if set, only the datasources in
   * this schema are returned, and if omitted, the datasources in all schemas of the catalog are
   * returned.
   */
  schemaName?: string | undefined;
  /**
   * Which fields to return for each datasource. Defaults to `DATASOURCE_VIEW_FULL`.
   * `DATASOURCE_VIEW_BASIC` returns only the identity and Unity Catalog location fields.
   */
  view?: DatasourceView | undefined;
}

export interface ListDatasourcesResponse {
  datasources?: Datasource[] | undefined;
  /**
   * Opaque token for fetching the next page; pass it as `page_token` on the next
   * call. It is empty only when there are no more results. Page size is best-effort,
   * so a short or even empty page does not mean the end; keep paging until this
   * token is empty, which is the only reliable end-of-results signal.
   */
  nextPageToken?: string | undefined;
}

export interface ListRulesRequest {
  /**
   * Maximum number of rules to return. The server may return fewer. If unset
   * or 0, the server picks a default page size.
   */
  pageSize?: number | undefined;
  /**
   * Page token from a previous `ListRules` response, used to fetch the next
   * page of results.
   */
  pageToken?: string | undefined;
  /**
   * Filter expression that restricts the results, such as `rule_name = "my_rule"` to return
   * only the rule with that name. The name is matched against the current UC name, which
   * reads report in `effective_rule_name`.
   */
  filter?: string | undefined;
  /** Name of the Unity Catalog catalog to list rules from. Required. */
  catalogName?: string | undefined;
  /**
   * Name of a Unity Catalog schema in `catalog_name`. If set, only rules in this schema are
   * returned. If unset, rules in all schemas of the catalog are returned.
   */
  schemaName?: string | undefined;
  /**
   * How much of each rule to return. Defaults to `RULE_VIEW_FULL`. `RULE_VIEW_BASIC` returns
   * only each rule's identity and Unity Catalog location.
   */
  view?: RuleView | undefined;
}

export interface ListRulesResponse {
  /** The rules in this page of results. */
  rules?: Rule[] | undefined;
  /**
   * Token to pass as `page_token` in a subsequent `ListRules` call to fetch the
   * next page, or empty when there are no more results.
   */
  nextPageToken?: string | undefined;
}

/**
 * Reference to a parser that the datasource uses. Each parser defines the schema of the
 * parsed table that it writes.
 */
export interface ParserRef {
  /** Identifier of the parser. Stable across renames, unlike a parser name. */
  id?: string | undefined;
  /** Version of the parser to use, given as an explicit version number. */
  version?: string | undefined;
  /**
   * Table that this parser's data is written to. The table must be in the datasource's catalog
   * and schema. If unset, the table name is derived from the parser name. Reads return the value
   * as supplied; the table the data is written to is reported in `effective_target_table`.
   */
  targetTable?: TableName | undefined;
  /**
   * The table this parser's data is written to: `target_table` when supplied, otherwise the
   * table derived from the datasource's catalog and schema and the parser name. Fixed once
   * resolved, so a later parser rename does not move it. Populated on get, create, and update
   * responses with the resolved table.
   */
  effectiveTargetTable?: TableName | undefined;
}

/**
 * A principal — user or service-principal — used as the value type for
 * `created_by` / `updated_by` / `assignee` etc. across v2 resources.
 */
export interface Principal {
  /** User / service-principal ID. */
  id?: string | undefined;
  /** Whether this principal is a regular user, service principal, or system principal. */
  principalType?: PrincipalType | undefined;
  /** Email (regular users only). */
  email?: string | undefined;
  /** Display name (user or SP name). */
  displayName?: string | undefined;
}

/**
 * Read-only runtime status of one job or pipeline backing a resource.
 *
 * Shared across resources: a Rule's single job, a Datasource's main / health /
 * historical-ingestion jobs, and a Datasource's ingestion pipeline (the
 * `pipeline_id` field is set only for the pipeline). For a datasource's
 * historical ingestion, the shard count is simply the number of
 * `historical_job_statuses` entries — there is no separate count field.
 *
 * Two orthogonal axes are modeled separately (v1 conflated them into a single
 * `jobStatus` enum): `lifecycle` (is it configured / does it still exist) and
 * `run_state` (what the most recent or in-flight run did).
 *
 * Every field that holds a `ResourceStatus` is OUTPUT_ONLY at its use site
 * (Datasource ingest/health/historical/pipeline statuses, Rule status), so the
 * inner fields don't repeat the annotation.
 */
export interface ResourceStatus {
  /** Databricks Jobs API job ID. Unset for a pure ingestion pipeline. */
  jobId?: string | undefined;
  /**
   * Scheduling lifecycle of the resource's underlying job/pipeline: whether it
   * is unscheduled, scheduled, stopped, or deleted. Distinct from `run_state`,
   * which reports the outcome of the most recent run.
   */
  lifecycleState?: ResourceStatus_Lifecycle | undefined;
  runState?: ResourceStatus_RunState | undefined;
  /** Most recent error message, if any. Pairs with `run_state = FAILED`. */
  lastErrorMessage?: string | undefined;
  createTime?: Temporal.Instant | undefined;
  /** When the most recent run started. Pairs with `run_state = RUNNING`. */
  lastStartTime?: Temporal.Instant | undefined;
  /** When the most recent run completed. Pairs with `run_state = SUCCEEDED`. */
  lastCompleteTime?: Temporal.Instant | undefined;
  lastStatusChangeTime?: Temporal.Instant | undefined;
  /**
   * DLT ingestion-pipeline ID. Set only when this status represents the
   * datasource's ingestion pipeline (unset for job statuses).
   */
  pipelineId?: string | undefined;
}

/**
 * A Lakewatch detection rule: a query that evaluates ingested data and generates a signal for
 * each match. Each rule is a securable in a Unity Catalog schema.
 */
export interface Rule {
  /**
   * Resource name, in the form `rules/{rule_id}`. Assigned by the server on create; required
   * on update.
   */
  name?: string | undefined;
  /**
   * Unity Catalog securable UUID of the rule, and the last segment of `name`. Never changes,
   * including when the rule's catalog or schema is renamed.
   */
  ruleId?: string | undefined;
  /**
   * Name of the Unity Catalog catalog that contains the rule. Required. Cannot be changed after
   * creation. Reads return the value as supplied; the catalog's current name is reported in
   * `effective_catalog_name`.
   */
  catalogName?: string | undefined;
  /**
   * Name of the Unity Catalog schema that contains the rule. Required. Cannot be changed after
   * creation. Reads return the value as supplied; the schema's current name is reported in
   * `effective_schema_name`.
   */
  schemaName?: string | undefined;
  /**
   * Current name of the Unity Catalog catalog that contains the rule. Reflects catalog renames,
   * which do not change `catalog_name`. Unset until resolved.
   */
  effectiveCatalogName?: string | undefined;
  /**
   * Current name of the Unity Catalog schema that contains the rule. Reflects schema renames,
   * which do not change `schema_name`. Unset until resolved.
   */
  effectiveSchemaName?: string | undefined;
  /**
   * Name of the rule within its Unity Catalog schema. Required on create; can be updated
   * within the same catalog and schema. Get synchronizes this field with the current Unity Catalog
   * name, also reported in `effective_rule_name`.
   */
  ruleName?: string | undefined;
  /**
   * Current UC leaf name of the rule (server-owned). Tracks UC renames so callers
   * can observe the live name without having to update the client-owned
   * `rule_name`; unset until resolved.
   */
  effectiveRuleName?: string | undefined;
  /** Free-form description. */
  description?: string | undefined;
  /**
   * Monotonic version, bumped on each update. Informational; use `etag` for
   * optimistic concurrency.
   */
  version?: bigint | undefined;
  /** Time the rule was created. */
  createTime?: Temporal.Instant | undefined;
  /** Time the rule was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Principal that created the rule. */
  createdBy?: Principal | undefined;
  /** Principal that last updated the rule. */
  updatedBy?: Principal | undefined;
  /**
   * Opaque entity tag for optimistic concurrency. Content-version ETags change on
   * user edits and remain stable across runtime status updates.
   */
  etag?: string | undefined;
  /** Free-form client-managed key/value annotations. */
  annotations?: Record<string, string> | undefined;
  /** Unity Catalog owner of the rule. Assigned by the server. Populated by `GetRule`. */
  owner?: Principal | undefined;
  /**
   * The principal whose identity this rule's job runs as, given as a
   * user email or service-principal application ID. When supplied on
   * create/update, Lakewatch resolves the principal, records it on the rule, and
   * creates the delegation to run as that principal — the requester must be
   * authorized to delegate to it, or the request is rejected. When omitted on
   * create, the requester's own identity is used. An update whose mask does not
   * include `run_as_principal` keeps the current identity, and the requester must
   * still be authorized to delegate to it; an editor who is not must supply a
   * run_as_principal they can delegate to (for example, their own identity), or
   * clear it, either of which reassigns the rule. An update whose mask includes
   * `run_as_principal` but supplies no value clears it: the rule then runs as the
   * requester, exactly as when it is omitted on create. Reads return the value as
   * supplied; the identity the rule runs as is reported in
   * `effective_run_as_principal`.
   */
  runAsPrincipal?: string | undefined;
  /**
   * The identity this rule's job runs as: the resolved `run_as_principal`, or the
   * requester's identity when it was omitted on create or cleared on update. The value is a user
   * email or service-principal application ID, falling back to the numeric principal ID if that
   * identity can no longer be resolved. Populated on single-rule reads (get/create/update); list
   * responses omit it.
   */
  effectiveRunAsPrincipal?: string | undefined;
  /** Free-form rule category. */
  category?: string | undefined;
  /**
   * Free-form severity label, such as `Informational`, `Medium`, `High`, or
   * `Critical`.
   */
  severity?: string | undefined;
  /** Signal quality for this rule. */
  fidelity?: RuleFidelity | undefined;
  /** Long-form description of what this rule detects. */
  objective?: string | undefined;
  /** Up to 64 MITRE ATT&CK mappings, producing at most 192 flattened alert tags. */
  mitre?: RuleMitreMapping[] | undefined;
  /** Signal deduplication mode. */
  deduplication?: RuleDeduplication | undefined;
  /** Time window for deduplication, such as `1h`, `24h`, `7d`, or `automatic`. */
  deduplicationTimeWindow?: string | undefined;
  /** When the rule executes. */
  schedule?: RuleSchedule | undefined;
  /** The input data the rule operates on. Exactly one source is required. */
  source?:
    | {
        $case: 'batch';
        /** Batch SQL rule input. */
        batch: RuleInputBatch;
      }
    | undefined;
  /** What to record in each signal. */
  output?: RuleOutput | undefined;
  /** Read-only lifecycle status. */
  status?: ResourceStatus | undefined;
  /** If set, this rule's signals do not open new alerts until the given time. */
  suppressUntilTime?: Temporal.Instant | undefined;
  /** Reference to the content pack this rule was originally installed from. */
  originalContentPack?: ContentPackReference | undefined;
  /**
   * ID of the workspace whose compute runs this rule's jobs and owns its
   * associated resources, such as the SQL warehouse a scheduled rule runs on.
   * Server-assigned; a rule's warehouse can only be changed from this workspace.
   */
  computeWorkspaceId?: string | undefined;
  /** Immutable UUIDv4 identifying the authored content resource installed as this rule. */
  contentResourceId?: string | undefined;
  /**
   * Ordered reference URLs carried from the authored rule metadata. A maximum of three references
   * of up to 512 characters each is supported. Requests exceeding these limits are rejected.
   */
  references?: string[] | undefined;
  /**
   * Long-form operational guidance carried from the authored rule metadata. Supports up to 4096
   * characters. Requests exceeding this limit are rejected. Supports Markdown; analysts and the
   * investigation agent follow it when triaging this rule's alerts.
   */
  runbook?: string | undefined;
  /**
   * Time-range configuration for batch rules. If unset, the execution time range is extended by
   * a fixed `15m` lookback.
   */
  timerange?: RuleTimeRange | undefined;
}

/**
 * Per-catalog rule-related config. Singleton.
 * Name format: `catalogs/{catalog}/ruleConfig`.
 */
export interface RuleConfig {
  name?: string | undefined;
  /**
   * Monotonic version, bumped on each update. Informational; use `etag` for
   * optimistic concurrency.
   */
  version?: bigint | undefined;
  updateTime?: Temporal.Instant | undefined;
  updatedBy?: Principal | undefined;
  /**
   * Opaque entity tag for optimistic concurrency. Returned on every read;
   * pass it back as the Update request's `etag` to make the update
   * conditional on the resource being unchanged.
   */
  etag?: string | undefined;
  /** Default schedule for rules that don't specify one. */
  defaultSchedule?: RuleSchedule | undefined;
  /**
   * Available detection categories a rule can be tagged with. Reads return the
   * value as supplied. When empty, rules can be tagged with the default categories:
   * `Static Signature`, `Fuzzy Signature`, `Behavioral`, `Statistical`, and
   * `Learning (AI/ML)`. The categories in effect are reported in
   * `effective_detection_categories`.
   */
  detectionCategories?: string[] | undefined;
  /**
   * Default duration string for signal deduplication when a rule
   * doesn't override it — compact day/hour/minute/second components, e.g.
   * `5d`, `1h`. Reads return the value as supplied; there is no server default,
   * so it is unset until set. An empty value clears it.
   */
  defaultSignalCollationWindow?: string | undefined;
  /**
   * Schema name of the registered folder (in this catalog) that a new rule is
   * placed in when the request does not specify a schema. Must name a schema
   * registered as a folder. Omit to clear. Reads return the value as supplied; the
   * folder's current schema name is reported in `effective_default_folder`.
   */
  defaultFolder?: string | undefined;
  /**
   * The detection categories in effect: `detection_categories` when set,
   * otherwise the default categories.
   */
  effectiveDetectionCategories?: string[] | undefined;
  /**
   * The current schema name of the `default_folder` folder. Tracks UC schema
   * renames. Unset when no default is configured, or when the folder's schema no
   * longer exists or is not visible to the caller.
   */
  effectiveDefaultFolder?: string | undefined;
}

/** Batch input for a detection rule. */
export interface RuleInputBatch {
  /** How the batch input is produced. Exactly one shape is required. */
  shape?:
    | {
        $case: 'sql';
        /** SQL query evaluated as the rule input. */
        sql: RuleInputBatchSql;
      }
    | {
        $case: 'custom';
        /**
         * Custom-notebook user function. The output is used as input data for the
         * rule.
         */
        custom: RuleInputCustomNotebook;
      }
    | undefined;
  /** SQL warehouse used to run this batch rule. */
  warehouseId?: string | undefined;
}

/** Batch SQL input for a detection rule. */
export interface RuleInputBatchSql {
  /**
   * Default catalog used to resolve unqualified identifiers in `query`. If
   * unset, the rule's `catalog_name` is used.
   */
  defaultCatalogName?: string | undefined;
  /**
   * Default schema used to resolve unqualified identifiers in `query`. If
   * unset, the rule's `schema_name` is used.
   */
  defaultSchemaName?: string | undefined;
  /** SQL query evaluated as the rule input. */
  query?: string | undefined;
}

/** Reference to a custom-user-function notebook for stream or batch input. */
export interface RuleInputCustomNotebook {
  /**
   * Fully-qualified notebook path, or a path relative to the configured base
   * notebook directory.
   */
  notebook?: string | undefined;
  /** Optional arguments supplied when invoking the custom function. */
  options?: Record<string, string> | undefined;
}

/** MITRE ATT&CK mapping for a detection rule. */
export interface RuleMitreMapping {
  /**
   * Structured framework that organizes adversary behaviors, such as
   * `mitre-attack`.
   */
  taxonomy?: string | undefined;
  /** Adversary objective during this attack, such as `Command and Control`. */
  tactic?: string | undefined;
  /** MITRE technique ID, such as `T1078`. */
  techniqueId?: string | undefined;
  /** Human-readable MITRE technique name. */
  technique?: string | undefined;
  /** MITRE sub-technique ID, such as `T1078.001`. */
  subTechniqueId?: string | undefined;
  /** Human-readable MITRE sub-technique name. */
  subTechnique?: string | undefined;
}

/** What to record in each signal that this rule generates. */
export interface RuleOutput {
  /**
   * Signal summary. May contain SQL expressions in braces that the
   * server substitutes from the input row.
   */
  summary?: string | undefined;
  /**
   * Key/value context to record from the input row. Values may contain SQL
   * expressions in braces.
   */
  context?: Record<string, string> | undefined;
  /**
   * If true, also record every column of the triggering input row. Custom
   * context wins on key collision.
   */
  defaultContext?: boolean | undefined;
  /** Column in the rule output that holds the event timestamp. */
  eventTimeColumn?: string | undefined;
}

/**
 * Defines when a detection rule executes.
 *
 * A batch rule sets exactly one of `at_least_every` or `cron_expression`. A streaming rule runs
 * continuously and sets no timing; it accepts only `enabled`, and an omitted schedule means
 * enabled. The server rejects any other combination. `enabled` is orthogonal to the timing.
 */
export interface RuleSchedule {
  timing?:
    | {
        $case: 'atLeastEvery';
        /**
         * Defines the minimum cadence as a duration string. It may contain components
         * for days, hours, minutes, and seconds (e.g. `5d`, `5d3h`, `3d2h5m12s`,
         * `12m16s`).
         */
        atLeastEvery: string;
      }
    | {
        $case: 'cronExpression';
        /** Defines the schedule using a Quartz cron expression. */
        cronExpression: string;
      }
    | {
        $case: 'continuous';
        /**
         * Runs the rule continuously. Detection rules do not accept it: batch rules reject it, and
         * streaming rules run continuously without it.
         */
        continuous: boolean;
      }
    | undefined;
  /** Sets whether the job is scheduled to run. Defaults to true. */
  enabled?: boolean | undefined;
}

/** Time-range configuration for a batch detection rule. */
export interface RuleTimeRange {
  /**
   * Extends the start of the execution time range by a compact duration with integer
   * days, hours, minutes, and seconds in that order, such as `1h30m` or `15m`.
   * Zero duration disables extension. Unset or empty uses a fixed `15m` at execution
   * time. Only the start moves; the end is unchanged. Has no effect on batch SQL
   * that does not use `IN_TIMERANGE`. Values must fit signed 64-bit microseconds.
   */
  extendLookback?: string | undefined;
}

/**
 * Defines when a recurring job executes.
 *
 * Exactly one of the timing modes (`at_least_every`, `cron_expression`,
 * `continuous`) must be set; combining them or setting none is rejected by the
 * server. `compute_group` and `enabled` are orthogonal to the timing.
 */
export interface Schedule {
  timing?:
    | {
        $case: 'atLeastEvery';
        /**
         * Duration string defining the minimum cadence. May contain components
         * for days, hours, minutes, seconds (e.g. `5d`, `5d3h`, `3d2h5m12s`,
         * `12m16s`).
         */
        atLeastEvery: string;
      }
    | {
        $case: 'cronExpression';
        /** Quartz cron expression. */
        cronExpression: string;
      }
    | {
        $case: 'continuous';
        /** Run continuously (sentinel — must be `true` when set in this branch). */
        continuous: boolean;
      }
    | undefined;
  /**
   * `dedicated`, `inherited`, `automatic`, or a custom group name. Reads return
   * the value as supplied. A rule whose schedule omits it runs on `dedicated`.
   */
  computeGroup?: string | undefined;
  /** Whether the job is scheduled to run. Defaults to true. */
  enabled?: boolean | undefined;
}

/**
 * ServiceNow destination. Alerts are delivered to the instance's Table API,
 * authorized by an OAuth 2.0 client-credentials token minted from the registered
 * application's client ID and secret.
 */
export interface ServiceNowExportConfig {
  /**
   * ServiceNow instance ID — the host label only, not the full URL. For an
   * instance reachable at `https://acme.service-now.com`, this is `acme`.
   */
  instanceId?: string | undefined;
  /**
   * OAuth client ID of the registered ServiceNow application. An identifier rather
   * than secret material — ServiceNow shows it on the application record — so it
   * is stored and read back verbatim.
   */
  clientId?: string | undefined;
  /**
   * Three-level Unity Catalog name (`catalog.schema.secret`) of the secret holding
   * the OAuth client secret. Only the name is stored; the secret is read when an alert
   * is exported, so rotating it takes effect without editing this config.
   */
  clientSecretUcSecret?: string | undefined;
}

export interface SlackExportConfig {
  /**
   * Channel the alert is posted to: a channel ID (e.g. `C0123456789`) or a channel
   * name without the leading `#` (e.g. `soc-alerts`). The value is stored as sent, so
   * a leading `#`, surrounding whitespace, or a value naming more than one channel is
   * rejected. For private channels, prefer the channel ID — Slack does not guarantee
   * name resolution for those.
   *
   * The Slack app must be a member of the channel and hold the `chat:write` scope.
   */
  channel?: string | undefined;
  /**
   * Three-level Unity Catalog name (`catalog.schema.secret`) of the secret holding
   * the Slack bot token. Only the name is stored; the token is read when an alert is
   * exported, so rotating the secret takes effect without editing this config.
   */
  botTokenUcSecret?: string | undefined;
}

/**
 * A fully-qualified Unity Catalog table reference by catalog / schema / table
 * name.
 */
export interface TableName {
  /** Name of the parent Unity Catalog catalog. */
  catalogName?: string | undefined;
  /** Name of the parent Unity Catalog schema. */
  schemaName?: string | undefined;
  /** Unity Catalog table name. */
  tableName?: string | undefined;
}

/**
 * Tines destination. Alerts are delivered to a Tines webhook action, authorized
 * by a secret sent in the `Authorization` header.
 */
export interface TinesExportConfig {
  /**
   * Tines webhook action URL, typically of the form
   * `https://<tenant>.tines.com/webhook/<path>`. Any HTTPS host is accepted, so
   * that a Tines tenant on a custom domain works.
   *
   * The secret is sent as a header, so it must not be embedded in the URL: a
   * trailing secret path segment (`/webhook/<path>/<secret>`) and a `secret`
   * query parameter are both rejected. API-path-prefix URLs (`/api/public/...`)
   * are not supported.
   */
  webhookUri?: string | undefined;
  /**
   * Three-level Unity Catalog name (`catalog.schema.secret`) of the secret holding the Tines
   * webhook secret. Only the name is stored; the secret is read when an alert is exported, so
   * rotating it takes effect without editing this config. Required: without it the destination
   * would be an unauthenticated endpoint.
   */
  webhookSecretUcSecret?: string | undefined;
  /**
   * Whether a later change to an already-exported alert is delivered too, as a second
   * `lakewatch.alert.updated` event to the same webhook action (a close is such an update,
   * carrying a terminal `alert_state`). Creation export is unaffected either way.
   *
   * Opt-in, and unset means off: Tines is an event transport rather than a system whose record is
   * edited in place, so an update is an extra event the receiving story has to correlate to the
   * alert it already handled. A destination configured before this event existed must not start
   * receiving more without its owner asking.
   */
  exportUpdates?: boolean | undefined;
}

/**
 * Ingests data through a managed connector that uses a Unity Catalog connection. Mutually
 * exclusive with `autoloader` and `existing_table`.
 */
export interface UnityCatalogConnection {
  /** Name of the Unity Catalog connection to ingest through. */
  connectionName?: string | undefined;
  /**
   * Connector type of the connection, such as `SLACK_AUDIT_LOGS`. Resolved by the server from
   * `connection_name` through Unity Catalog; not accepted as input.
   */
  connector?: string | undefined;
  /** Free-form key-value configuration for the managed ingestion pipeline. */
  configuration?: Record<string, string> | undefined;
  /**
   * Earliest source event time to ingest. Leave unset to start at creation time, with no
   * history backfilled. Rejected if in the future, beyond the connector's history window, or
   * for a connector without start-time support. Takes effect only at first start and cannot
   * be changed. Reads return the value as supplied; the start time ingestion uses is reported
   * in `effective_start_time`.
   */
  startTime?: Temporal.Instant | undefined;
  /**
   * The start time ingestion uses: the supplied `start_time`, or the creation time when it was
   * omitted. Always populated.
   */
  effectiveStartTime?: Temporal.Instant | undefined;
}

export interface UpdateAlertConfigRequest {
  alertConfig?: AlertConfig | undefined;
  updateMask?: FieldMask<AlertConfig> | undefined;
  /**
   * Optimistic-concurrency precondition: if set and it does not match the
   * resource's current `etag`, the update is rejected as a conflict (HTTP 409).
   */
  etag?: string | undefined;
}

export interface UpdateCommonConfigRequest {
  commonConfig?: CommonConfig | undefined;
  updateMask?: FieldMask<CommonConfig> | undefined;
  /**
   * Optimistic-concurrency precondition: if set and it does not match the
   * resource's current `etag`, the update is rejected as a conflict (HTTP 409).
   */
  etag?: string | undefined;
}

export interface UpdateDatasourceConfigRequest {
  datasourceConfig?: DatasourceConfig | undefined;
  updateMask?: FieldMask<DatasourceConfig> | undefined;
  /**
   * Optimistic-concurrency precondition: if set and it does not match the
   * resource's current `etag`, the update is rejected as a conflict (HTTP 409).
   */
  etag?: string | undefined;
}

export interface UpdateDatasourceRequest {
  datasource?: Datasource | undefined;
  updateMask?: FieldMask<Datasource> | undefined;
  /**
   * Optimistic-concurrency precondition: if set to a non-empty value that does
   * not match the resource's current `etag`, the update is rejected as a
   * conflict (HTTP 409). Omit this field or send an empty string to update
   * unconditionally.
   */
  etag?: string | undefined;
}

export interface UpdateRuleConfigRequest {
  ruleConfig?: RuleConfig | undefined;
  updateMask?: FieldMask<RuleConfig> | undefined;
  /**
   * Optimistic-concurrency precondition: if set and it does not match the
   * resource's current `etag`, the update is rejected as a conflict (HTTP 409).
   */
  etag?: string | undefined;
}

export interface UpdateRuleRequest {
  /**
   * The rule with its new field values. `rule.name` identifies the rule to
   * update.
   */
  rule?: Rule | undefined;
  /** The set of fields to update. Only fields named in the mask are modified. */
  updateMask?: FieldMask<Rule> | undefined;
  /**
   * Optimistic-concurrency token from the latest read. A non-empty token that
   * does not match the current `etag` rejects the update as a conflict (HTTP 409).
   * Omit this field or provide an empty string to update unconditionally.
   */
  etag?: string | undefined;
}

export interface WebhookExportConfig {
  /**
   * Webhook destination the server POSTs payloads to, in plaintext. Userinfo
   * (`user:password@`) is sent as HTTP Basic auth.
   */
  url?: string | undefined;
  /**
   * Whether a later change to an already-exported alert is delivered too, as a second
   * `lakewatch.alert.updated` event to the same webhook URL (a close is such an update, carrying a
   * terminal `alert_state`). Creation export is unaffected either way.
   *
   * Opt-in, and unset means off: a webhook is an event transport rather than a system whose record
   * is edited in place, so an update is an extra event the receiving consumer has to correlate to
   * the alert it already handled. A destination configured before this event existed must not start
   * receiving more without its owner asking.
   */
  exportUpdates?: boolean | undefined;
}

export const unmarshalAlertConfigSchema: z.ZodType<AlertConfig> = z
  .object({
    name: z.string().optional(),
    version: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updated_by: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    etag: z.string().optional(),
    default_security_alert_collation_window: z.string().optional(),
    default_system_alert_collation_window: z.string().optional(),
    security_alert_export_config: z
      .lazy(() => unmarshalExportConfigSchema)
      .nullish()
      .transform(v => v ?? undefined),
    system_alert_export_config: z
      .lazy(() => unmarshalExportConfigSchema)
      .nullish()
      .transform(v => v ?? undefined),
    effective_default_security_alert_collation_window: z.string().optional(),
    effective_default_system_alert_collation_window: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
    etag: d.etag,
    defaultSecurityAlertCollationWindow:
      d.default_security_alert_collation_window,
    defaultSystemAlertCollationWindow: d.default_system_alert_collation_window,
    securityAlertExportConfig: d.security_alert_export_config,
    systemAlertExportConfig: d.system_alert_export_config,
    effectiveDefaultSecurityAlertCollationWindow:
      d.effective_default_security_alert_collation_window,
    effectiveDefaultSystemAlertCollationWindow:
      d.effective_default_system_alert_collation_window,
  }));

export const unmarshalAutoLoaderSchema: z.ZodType<AutoLoader> = z
  .object({
    format: z.string().optional(),
    location: z.string().optional(),
    format_options: z.record(z.string(), z.string()).optional(),
    service_credentials: z.string().optional(),
    aws_secret_scope: z.string().optional(),
    override_partition_columns: z.array(z.string()).optional(),
    raw_table: z
      .lazy(() => unmarshalTableNameSchema)
      .nullish()
      .transform(v => v ?? undefined),
    envelope: z
      .lazy(() => unmarshalEnvelopeSchema)
      .nullish()
      .transform(v => v ?? undefined),
    queue_url: z.string().optional(),
    effective_raw_table: z
      .lazy(() => unmarshalTableNameSchema)
      .nullish()
      .transform(v => v ?? undefined),
    include_existing_files: z.boolean().optional(),
    effective_include_existing_files: z.boolean().optional(),
  })
  .transform(d => ({
    format: d.format,
    location: d.location,
    formatOptions: d.format_options,
    credentials:
      d.service_credentials !== undefined
        ? {
            $case: 'serviceCredentials' as const,
            serviceCredentials: d.service_credentials,
          }
        : d.aws_secret_scope !== undefined
          ? {
              $case: 'awsSecretScope' as const,
              awsSecretScope: d.aws_secret_scope,
            }
          : undefined,
    overridePartitionColumns: d.override_partition_columns,
    rawTable: d.raw_table,
    envelope: d.envelope,
    queueUrl: d.queue_url,
    effectiveRawTable: d.effective_raw_table,
    includeExistingFiles: d.include_existing_files,
    effectiveIncludeExistingFiles: d.effective_include_existing_files,
  }));

export const unmarshalCloudWatchLogsEnvelopeSchema: z.ZodType<CloudWatchLogsEnvelope> =
  z
    .object({
      header_retention: z.boolean().optional(),
    })
    .transform(d => ({
      headerRetention: d.header_retention,
    }));

export const unmarshalCommonConfigSchema: z.ZodType<CommonConfig> = z
  .object({
    name: z.string().optional(),
    version: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updated_by: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    etag: z.string().optional(),
    per_resource_permissions_enabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
    etag: d.etag,
    perResourcePermissionsEnabled: d.per_resource_permissions_enabled,
  }));

export const unmarshalContentPackReferenceSchema: z.ZodType<ContentPackReference> =
  z
    .object({
      uuid: z.string().optional(),
      version: z.string().optional(),
    })
    .transform(d => ({
      uuid: d.uuid,
      version: d.version,
    }));

export const unmarshalDatasourceSchema: z.ZodType<Datasource> = z
  .object({
    name: z.string().optional(),
    datasource_id: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    effective_catalog_name: z.string().optional(),
    effective_schema_name: z.string().optional(),
    datasource_name: z.string().optional(),
    effective_datasource_name: z.string().optional(),
    description: z.string().optional(),
    version: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    created_by: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    updated_by: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    etag: z.string().optional(),
    annotations: z.record(z.string(), z.string()).optional(),
    owner: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    run_as_principal: z.string().optional(),
    effective_run_as_principal: z.string().optional(),
    autoloader: z.lazy(() => unmarshalAutoLoaderSchema).optional(),
    unity_catalog_connection: z
      .lazy(() => unmarshalUnityCatalogConnectionSchema)
      .optional(),
    existing_table: z.lazy(() => unmarshalExistingTableSchema).optional(),
    parsers: z.array(z.lazy(() => unmarshalParserRefSchema)).optional(),
    schedule: z
      .lazy(() => unmarshalScheduleSchema)
      .nullish()
      .transform(v => v ?? undefined),
    compute_mode: z.string().optional(),
    status: z
      .lazy(() => unmarshalDatasourceStatusSchema)
      .nullish()
      .transform(v => v ?? undefined),
    warehouse_id: z.string().optional(),
    compute_workspace_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    datasourceId: d.datasource_id,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    effectiveCatalogName: d.effective_catalog_name,
    effectiveSchemaName: d.effective_schema_name,
    datasourceName: d.datasource_name,
    effectiveDatasourceName: d.effective_datasource_name,
    description: d.description,
    version: d.version,
    createTime: d.create_time,
    updateTime: d.update_time,
    createdBy: d.created_by,
    updatedBy: d.updated_by,
    etag: d.etag,
    annotations: d.annotations,
    owner: d.owner,
    runAsPrincipal: d.run_as_principal,
    effectiveRunAsPrincipal: d.effective_run_as_principal,
    ingestionMethod:
      d.autoloader !== undefined
        ? {$case: 'autoloader' as const, autoloader: d.autoloader}
        : d.unity_catalog_connection !== undefined
          ? {
              $case: 'unityCatalogConnection' as const,
              unityCatalogConnection: d.unity_catalog_connection,
            }
          : d.existing_table !== undefined
            ? {$case: 'existingTable' as const, existingTable: d.existing_table}
            : undefined,
    parsers: d.parsers,
    schedule: d.schedule,
    computeMode: d.compute_mode,
    status: d.status,
    warehouseId: d.warehouse_id,
    computeWorkspaceId: d.compute_workspace_id,
  }));

export const unmarshalDatasourceConfigSchema: z.ZodType<DatasourceConfig> = z
  .object({
    name: z.string().optional(),
    version: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updated_by: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    etag: z.string().optional(),
    default_compute_mode: z.string().optional(),
    default_folder: z.string().optional(),
    effective_default_folder: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
    etag: d.etag,
    defaultComputeMode: d.default_compute_mode,
    defaultFolder: d.default_folder,
    effectiveDefaultFolder: d.effective_default_folder,
  }));

export const unmarshalDatasourceStatusSchema: z.ZodType<DatasourceStatus> = z
  .object({
    ingestion_job: z
      .lazy(() => unmarshalResourceStatusSchema)
      .nullish()
      .transform(v => v ?? undefined),
    ingestion_pipeline: z
      .lazy(() => unmarshalResourceStatusSchema)
      .nullish()
      .transform(v => v ?? undefined),
  })
  .transform(d => ({
    ingestionJob: d.ingestion_job,
    ingestionPipeline: d.ingestion_pipeline,
  }));

export const unmarshalEnvelopeSchema: z.ZodType<Envelope> = z
  .object({
    json_array: z.lazy(() => unmarshalJsonArrayEnvelopeSchema).optional(),
    cloud_watch_logs: z
      .lazy(() => unmarshalCloudWatchLogsEnvelopeSchema)
      .optional(),
  })
  .transform(d => ({
    kind:
      d.json_array !== undefined
        ? {$case: 'jsonArray' as const, jsonArray: d.json_array}
        : d.cloud_watch_logs !== undefined
          ? {
              $case: 'cloudWatchLogs' as const,
              cloudWatchLogs: d.cloud_watch_logs,
            }
          : undefined,
  }));

export const unmarshalExistingTableSchema: z.ZodType<ExistingTable> = z
  .object({
    name: z.string().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
    include_existing_rows: z.boolean().optional(),
    effective_catalog: z.string().optional(),
    effective_schema: z.string().optional(),
    effective_name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog: d.catalog,
    schema: d.schema,
    includeExistingRows: d.include_existing_rows,
    effectiveCatalog: d.effective_catalog,
    effectiveSchema: d.effective_schema,
    effectiveName: d.effective_name,
  }));

export const unmarshalExportConfigSchema: z.ZodType<ExportConfig> = z
  .object({
    enabled: z.boolean().optional(),
    webhook: z.lazy(() => unmarshalWebhookExportConfigSchema).optional(),
    jira: z.lazy(() => unmarshalJiraExportConfigSchema).optional(),
    slack: z.lazy(() => unmarshalSlackExportConfigSchema).optional(),
    tines: z.lazy(() => unmarshalTinesExportConfigSchema).optional(),
    service_now: z.lazy(() => unmarshalServiceNowExportConfigSchema).optional(),
    workspace_id: z.string().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
    destination:
      d.webhook !== undefined
        ? {$case: 'webhook' as const, webhook: d.webhook}
        : d.jira !== undefined
          ? {$case: 'jira' as const, jira: d.jira}
          : d.slack !== undefined
            ? {$case: 'slack' as const, slack: d.slack}
            : d.tines !== undefined
              ? {$case: 'tines' as const, tines: d.tines}
              : d.service_now !== undefined
                ? {$case: 'serviceNow' as const, serviceNow: d.service_now}
                : undefined,
    workspaceId: d.workspace_id,
  }));

export const unmarshalJiraExportConfigSchema: z.ZodType<JiraExportConfig> = z
  .object({
    instance_url: z.string().optional(),
    project_key: z.string().optional(),
    user_email: z.string().optional(),
    default_issue_type: z.string().optional(),
    api_token_uc_secret: z.string().optional(),
  })
  .transform(d => ({
    instanceUrl: d.instance_url,
    projectKey: d.project_key,
    userEmail: d.user_email,
    defaultIssueType: d.default_issue_type,
    apiTokenUcSecret: d.api_token_uc_secret,
  }));

export const unmarshalJsonArrayEnvelopeSchema: z.ZodType<JsonArrayEnvelope> = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

export const unmarshalListDatasourcesResponseSchema: z.ZodType<ListDatasourcesResponse> =
  z
    .object({
      datasources: z.array(z.lazy(() => unmarshalDatasourceSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      datasources: d.datasources,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListRulesResponseSchema: z.ZodType<ListRulesResponse> = z
  .object({
    rules: z.array(z.lazy(() => unmarshalRuleSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    rules: d.rules,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalParserRefSchema: z.ZodType<ParserRef> = z
  .object({
    id: z.string().optional(),
    version: z.string().optional(),
    target_table: z
      .lazy(() => unmarshalTableNameSchema)
      .nullish()
      .transform(v => v ?? undefined),
    effective_target_table: z
      .lazy(() => unmarshalTableNameSchema)
      .nullish()
      .transform(v => v ?? undefined),
  })
  .transform(d => ({
    id: d.id,
    version: d.version,
    targetTable: d.target_table,
    effectiveTargetTable: d.effective_target_table,
  }));

export const unmarshalPrincipalSchema: z.ZodType<Principal> = z
  .object({
    id: z.string().optional(),
    principal_type: z.string().optional(),
    email: z.string().optional(),
    display_name: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    principalType: d.principal_type,
    email: d.email,
    displayName: d.display_name,
  }));

export const unmarshalResourceStatusSchema: z.ZodType<ResourceStatus> = z
  .object({
    job_id: z.string().optional(),
    lifecycle_state: z.string().optional(),
    run_state: z.string().optional(),
    last_error_message: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    last_start_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    last_complete_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    last_status_change_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    pipeline_id: z.string().optional(),
  })
  .transform(d => ({
    jobId: d.job_id,
    lifecycleState: d.lifecycle_state,
    runState: d.run_state,
    lastErrorMessage: d.last_error_message,
    createTime: d.create_time,
    lastStartTime: d.last_start_time,
    lastCompleteTime: d.last_complete_time,
    lastStatusChangeTime: d.last_status_change_time,
    pipelineId: d.pipeline_id,
  }));

export const unmarshalRuleSchema: z.ZodType<Rule> = z
  .object({
    name: z.string().optional(),
    rule_id: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    effective_catalog_name: z.string().optional(),
    effective_schema_name: z.string().optional(),
    rule_name: z.string().optional(),
    effective_rule_name: z.string().optional(),
    description: z.string().optional(),
    version: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    created_by: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    updated_by: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    etag: z.string().optional(),
    annotations: z.record(z.string(), z.string()).optional(),
    owner: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    run_as_principal: z.string().optional(),
    effective_run_as_principal: z.string().optional(),
    category: z.string().optional(),
    severity: z.string().optional(),
    fidelity: z.string().optional(),
    objective: z.string().optional(),
    mitre: z.array(z.lazy(() => unmarshalRuleMitreMappingSchema)).optional(),
    deduplication: z.string().optional(),
    deduplication_time_window: z.string().optional(),
    schedule: z
      .lazy(() => unmarshalRuleScheduleSchema)
      .nullish()
      .transform(v => v ?? undefined),
    batch: z.lazy(() => unmarshalRuleInputBatchSchema).optional(),
    output: z
      .lazy(() => unmarshalRuleOutputSchema)
      .nullish()
      .transform(v => v ?? undefined),
    status: z
      .lazy(() => unmarshalResourceStatusSchema)
      .nullish()
      .transform(v => v ?? undefined),
    suppress_until_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    original_content_pack: z
      .lazy(() => unmarshalContentPackReferenceSchema)
      .nullish()
      .transform(v => v ?? undefined),
    compute_workspace_id: z.string().optional(),
    content_resource_id: z.string().optional(),
    references: z.array(z.string()).optional(),
    runbook: z.string().optional(),
    timerange: z
      .lazy(() => unmarshalRuleTimeRangeSchema)
      .nullish()
      .transform(v => v ?? undefined),
  })
  .transform(d => ({
    name: d.name,
    ruleId: d.rule_id,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    effectiveCatalogName: d.effective_catalog_name,
    effectiveSchemaName: d.effective_schema_name,
    ruleName: d.rule_name,
    effectiveRuleName: d.effective_rule_name,
    description: d.description,
    version: d.version,
    createTime: d.create_time,
    updateTime: d.update_time,
    createdBy: d.created_by,
    updatedBy: d.updated_by,
    etag: d.etag,
    annotations: d.annotations,
    owner: d.owner,
    runAsPrincipal: d.run_as_principal,
    effectiveRunAsPrincipal: d.effective_run_as_principal,
    category: d.category,
    severity: d.severity,
    fidelity: d.fidelity,
    objective: d.objective,
    mitre: d.mitre,
    deduplication: d.deduplication,
    deduplicationTimeWindow: d.deduplication_time_window,
    schedule: d.schedule,
    source:
      d.batch !== undefined
        ? {$case: 'batch' as const, batch: d.batch}
        : undefined,
    output: d.output,
    status: d.status,
    suppressUntilTime: d.suppress_until_time,
    originalContentPack: d.original_content_pack,
    computeWorkspaceId: d.compute_workspace_id,
    contentResourceId: d.content_resource_id,
    references: d.references,
    runbook: d.runbook,
    timerange: d.timerange,
  }));

export const unmarshalRuleConfigSchema: z.ZodType<RuleConfig> = z
  .object({
    name: z.string().optional(),
    version: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updated_by: z
      .lazy(() => unmarshalPrincipalSchema)
      .nullish()
      .transform(v => v ?? undefined),
    etag: z.string().optional(),
    default_schedule: z
      .lazy(() => unmarshalRuleScheduleSchema)
      .nullish()
      .transform(v => v ?? undefined),
    detection_categories: z.array(z.string()).optional(),
    default_signal_collation_window: z.string().optional(),
    default_folder: z.string().optional(),
    effective_detection_categories: z.array(z.string()).optional(),
    effective_default_folder: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
    etag: d.etag,
    defaultSchedule: d.default_schedule,
    detectionCategories: d.detection_categories,
    defaultSignalCollationWindow: d.default_signal_collation_window,
    defaultFolder: d.default_folder,
    effectiveDetectionCategories: d.effective_detection_categories,
    effectiveDefaultFolder: d.effective_default_folder,
  }));

export const unmarshalRuleInputBatchSchema: z.ZodType<RuleInputBatch> = z
  .object({
    sql: z.lazy(() => unmarshalRuleInputBatchSqlSchema).optional(),
    custom: z.lazy(() => unmarshalRuleInputCustomNotebookSchema).optional(),
    warehouse_id: z.string().optional(),
  })
  .transform(d => ({
    shape:
      d.sql !== undefined
        ? {$case: 'sql' as const, sql: d.sql}
        : d.custom !== undefined
          ? {$case: 'custom' as const, custom: d.custom}
          : undefined,
    warehouseId: d.warehouse_id,
  }));

export const unmarshalRuleInputBatchSqlSchema: z.ZodType<RuleInputBatchSql> = z
  .object({
    default_catalog_name: z.string().optional(),
    default_schema_name: z.string().optional(),
    query: z.string().optional(),
  })
  .transform(d => ({
    defaultCatalogName: d.default_catalog_name,
    defaultSchemaName: d.default_schema_name,
    query: d.query,
  }));

export const unmarshalRuleInputCustomNotebookSchema: z.ZodType<RuleInputCustomNotebook> =
  z
    .object({
      notebook: z.string().optional(),
      options: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      notebook: d.notebook,
      options: d.options,
    }));

export const unmarshalRuleMitreMappingSchema: z.ZodType<RuleMitreMapping> = z
  .object({
    taxonomy: z.string().optional(),
    tactic: z.string().optional(),
    technique_id: z.string().optional(),
    technique: z.string().optional(),
    sub_technique_id: z.string().optional(),
    sub_technique: z.string().optional(),
  })
  .transform(d => ({
    taxonomy: d.taxonomy,
    tactic: d.tactic,
    techniqueId: d.technique_id,
    technique: d.technique,
    subTechniqueId: d.sub_technique_id,
    subTechnique: d.sub_technique,
  }));

export const unmarshalRuleOutputSchema: z.ZodType<RuleOutput> = z
  .object({
    summary: z.string().optional(),
    context: z.record(z.string(), z.string()).optional(),
    default_context: z.boolean().optional(),
    event_time_column: z.string().optional(),
  })
  .transform(d => ({
    summary: d.summary,
    context: d.context,
    defaultContext: d.default_context,
    eventTimeColumn: d.event_time_column,
  }));

export const unmarshalRuleScheduleSchema: z.ZodType<RuleSchedule> = z
  .object({
    at_least_every: z.string().optional(),
    cron_expression: z.string().optional(),
    continuous: z.boolean().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    timing:
      d.at_least_every !== undefined
        ? {$case: 'atLeastEvery' as const, atLeastEvery: d.at_least_every}
        : d.cron_expression !== undefined
          ? {
              $case: 'cronExpression' as const,
              cronExpression: d.cron_expression,
            }
          : d.continuous !== undefined
            ? {$case: 'continuous' as const, continuous: d.continuous}
            : undefined,
    enabled: d.enabled,
  }));

export const unmarshalRuleTimeRangeSchema: z.ZodType<RuleTimeRange> = z
  .object({
    extend_lookback: z.string().optional(),
  })
  .transform(d => ({
    extendLookback: d.extend_lookback,
  }));

export const unmarshalScheduleSchema: z.ZodType<Schedule> = z
  .object({
    at_least_every: z.string().optional(),
    cron_expression: z.string().optional(),
    continuous: z.boolean().optional(),
    compute_group: z.string().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    timing:
      d.at_least_every !== undefined
        ? {$case: 'atLeastEvery' as const, atLeastEvery: d.at_least_every}
        : d.cron_expression !== undefined
          ? {
              $case: 'cronExpression' as const,
              cronExpression: d.cron_expression,
            }
          : d.continuous !== undefined
            ? {$case: 'continuous' as const, continuous: d.continuous}
            : undefined,
    computeGroup: d.compute_group,
    enabled: d.enabled,
  }));

export const unmarshalServiceNowExportConfigSchema: z.ZodType<ServiceNowExportConfig> =
  z
    .object({
      instance_id: z.string().optional(),
      client_id: z.string().optional(),
      client_secret_uc_secret: z.string().optional(),
    })
    .transform(d => ({
      instanceId: d.instance_id,
      clientId: d.client_id,
      clientSecretUcSecret: d.client_secret_uc_secret,
    }));

export const unmarshalSlackExportConfigSchema: z.ZodType<SlackExportConfig> = z
  .object({
    channel: z.string().optional(),
    bot_token_uc_secret: z.string().optional(),
  })
  .transform(d => ({
    channel: d.channel,
    botTokenUcSecret: d.bot_token_uc_secret,
  }));

export const unmarshalTableNameSchema: z.ZodType<TableName> = z
  .object({
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    table_name: z.string().optional(),
  })
  .transform(d => ({
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    tableName: d.table_name,
  }));

export const unmarshalTinesExportConfigSchema: z.ZodType<TinesExportConfig> = z
  .object({
    webhook_uri: z.string().optional(),
    webhook_secret_uc_secret: z.string().optional(),
    export_updates: z.boolean().optional(),
  })
  .transform(d => ({
    webhookUri: d.webhook_uri,
    webhookSecretUcSecret: d.webhook_secret_uc_secret,
    exportUpdates: d.export_updates,
  }));

export const unmarshalUnityCatalogConnectionSchema: z.ZodType<UnityCatalogConnection> =
  z
    .object({
      connection_name: z.string().optional(),
      connector: z.string().optional(),
      configuration: z.record(z.string(), z.string()).optional(),
      start_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      effective_start_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      connectionName: d.connection_name,
      connector: d.connector,
      configuration: d.configuration,
      startTime: d.start_time,
      effectiveStartTime: d.effective_start_time,
    }));

export const unmarshalWebhookExportConfigSchema: z.ZodType<WebhookExportConfig> =
  z
    .object({
      url: z.string().optional(),
      export_updates: z.boolean().optional(),
    })
    .transform(d => ({
      url: d.url,
      exportUpdates: d.export_updates,
    }));

export const marshalAlertConfigSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.bigint().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.lazy(() => marshalPrincipalSchema).optional(),
    etag: z.string().optional(),
    defaultSecurityAlertCollationWindow: z.string().optional(),
    defaultSystemAlertCollationWindow: z.string().optional(),
    securityAlertExportConfig: z
      .lazy(() => marshalExportConfigSchema)
      .optional(),
    systemAlertExportConfig: z.lazy(() => marshalExportConfigSchema).optional(),
    effectiveDefaultSecurityAlertCollationWindow: z.string().optional(),
    effectiveDefaultSystemAlertCollationWindow: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    etag: d.etag,
    default_security_alert_collation_window:
      d.defaultSecurityAlertCollationWindow,
    default_system_alert_collation_window: d.defaultSystemAlertCollationWindow,
    security_alert_export_config: d.securityAlertExportConfig,
    system_alert_export_config: d.systemAlertExportConfig,
    effective_default_security_alert_collation_window:
      d.effectiveDefaultSecurityAlertCollationWindow,
    effective_default_system_alert_collation_window:
      d.effectiveDefaultSystemAlertCollationWindow,
  }));

export const marshalAutoLoaderSchema: z.ZodType = z
  .object({
    format: z.string().optional(),
    location: z.string().optional(),
    formatOptions: z.record(z.string(), z.string()).optional(),
    credentials: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('serviceCredentials'),
          serviceCredentials: z.string(),
        }),
        z.object({
          $case: z.literal('awsSecretScope'),
          awsSecretScope: z.string(),
        }),
      ])
      .optional(),
    overridePartitionColumns: z.array(z.string()).optional(),
    rawTable: z.lazy(() => marshalTableNameSchema).optional(),
    envelope: z.lazy(() => marshalEnvelopeSchema).optional(),
    queueUrl: z.string().optional(),
    effectiveRawTable: z.lazy(() => marshalTableNameSchema).optional(),
    includeExistingFiles: z.boolean().optional(),
    effectiveIncludeExistingFiles: z.boolean().optional(),
  })
  .transform(d => ({
    format: d.format,
    location: d.location,
    format_options: d.formatOptions,
    ...(d.credentials?.$case === 'serviceCredentials' && {
      service_credentials: d.credentials.serviceCredentials,
    }),
    ...(d.credentials?.$case === 'awsSecretScope' && {
      aws_secret_scope: d.credentials.awsSecretScope,
    }),
    override_partition_columns: d.overridePartitionColumns,
    raw_table: d.rawTable,
    envelope: d.envelope,
    queue_url: d.queueUrl,
    effective_raw_table: d.effectiveRawTable,
    include_existing_files: d.includeExistingFiles,
    effective_include_existing_files: d.effectiveIncludeExistingFiles,
  }));

export const marshalCloudWatchLogsEnvelopeSchema: z.ZodType = z
  .object({
    headerRetention: z.boolean().optional(),
  })
  .transform(d => ({
    header_retention: d.headerRetention,
  }));

export const marshalCommonConfigSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.bigint().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.lazy(() => marshalPrincipalSchema).optional(),
    etag: z.string().optional(),
    perResourcePermissionsEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    etag: d.etag,
    per_resource_permissions_enabled: d.perResourcePermissionsEnabled,
  }));

export const marshalContentPackReferenceSchema: z.ZodType = z
  .object({
    uuid: z.string().optional(),
    version: z.string().optional(),
  })
  .transform(d => ({
    uuid: d.uuid,
    version: d.version,
  }));

export const marshalDatasourceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    datasourceId: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    effectiveCatalogName: z.string().optional(),
    effectiveSchemaName: z.string().optional(),
    datasourceName: z.string().optional(),
    effectiveDatasourceName: z.string().optional(),
    description: z.string().optional(),
    version: z.bigint().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    createdBy: z.lazy(() => marshalPrincipalSchema).optional(),
    updatedBy: z.lazy(() => marshalPrincipalSchema).optional(),
    etag: z.string().optional(),
    annotations: z.record(z.string(), z.string()).optional(),
    owner: z.lazy(() => marshalPrincipalSchema).optional(),
    runAsPrincipal: z.string().optional(),
    effectiveRunAsPrincipal: z.string().optional(),
    ingestionMethod: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('autoloader'),
          autoloader: z.lazy(() => marshalAutoLoaderSchema),
        }),
        z.object({
          $case: z.literal('unityCatalogConnection'),
          unityCatalogConnection: z.lazy(
            () => marshalUnityCatalogConnectionSchema
          ),
        }),
        z.object({
          $case: z.literal('existingTable'),
          existingTable: z.lazy(() => marshalExistingTableSchema),
        }),
      ])
      .optional(),
    parsers: z.array(z.lazy(() => marshalParserRefSchema)).optional(),
    schedule: z.lazy(() => marshalScheduleSchema).optional(),
    computeMode: z.string().optional(),
    status: z.lazy(() => marshalDatasourceStatusSchema).optional(),
    warehouseId: z.string().optional(),
    computeWorkspaceId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    datasource_id: d.datasourceId,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    effective_catalog_name: d.effectiveCatalogName,
    effective_schema_name: d.effectiveSchemaName,
    datasource_name: d.datasourceName,
    effective_datasource_name: d.effectiveDatasourceName,
    description: d.description,
    version: d.version,
    create_time: d.createTime,
    update_time: d.updateTime,
    created_by: d.createdBy,
    updated_by: d.updatedBy,
    etag: d.etag,
    annotations: d.annotations,
    owner: d.owner,
    run_as_principal: d.runAsPrincipal,
    effective_run_as_principal: d.effectiveRunAsPrincipal,
    ...(d.ingestionMethod?.$case === 'autoloader' && {
      autoloader: d.ingestionMethod.autoloader,
    }),
    ...(d.ingestionMethod?.$case === 'unityCatalogConnection' && {
      unity_catalog_connection: d.ingestionMethod.unityCatalogConnection,
    }),
    ...(d.ingestionMethod?.$case === 'existingTable' && {
      existing_table: d.ingestionMethod.existingTable,
    }),
    parsers: d.parsers,
    schedule: d.schedule,
    compute_mode: d.computeMode,
    status: d.status,
    warehouse_id: d.warehouseId,
    compute_workspace_id: d.computeWorkspaceId,
  }));

export const marshalDatasourceConfigSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.bigint().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.lazy(() => marshalPrincipalSchema).optional(),
    etag: z.string().optional(),
    defaultComputeMode: z.string().optional(),
    defaultFolder: z.string().optional(),
    effectiveDefaultFolder: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    etag: d.etag,
    default_compute_mode: d.defaultComputeMode,
    default_folder: d.defaultFolder,
    effective_default_folder: d.effectiveDefaultFolder,
  }));

export const marshalDatasourceStatusSchema: z.ZodType = z
  .object({
    ingestionJob: z.lazy(() => marshalResourceStatusSchema).optional(),
    ingestionPipeline: z.lazy(() => marshalResourceStatusSchema).optional(),
  })
  .transform(d => ({
    ingestion_job: d.ingestionJob,
    ingestion_pipeline: d.ingestionPipeline,
  }));

export const marshalEnvelopeSchema: z.ZodType = z
  .object({
    kind: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('jsonArray'),
          jsonArray: z.lazy(() => marshalJsonArrayEnvelopeSchema),
        }),
        z.object({
          $case: z.literal('cloudWatchLogs'),
          cloudWatchLogs: z.lazy(() => marshalCloudWatchLogsEnvelopeSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.kind?.$case === 'jsonArray' && {json_array: d.kind.jsonArray}),
    ...(d.kind?.$case === 'cloudWatchLogs' && {
      cloud_watch_logs: d.kind.cloudWatchLogs,
    }),
  }));

export const marshalExistingTableSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
    includeExistingRows: z.boolean().optional(),
    effectiveCatalog: z.string().optional(),
    effectiveSchema: z.string().optional(),
    effectiveName: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog: d.catalog,
    schema: d.schema,
    include_existing_rows: d.includeExistingRows,
    effective_catalog: d.effectiveCatalog,
    effective_schema: d.effectiveSchema,
    effective_name: d.effectiveName,
  }));

export const marshalExportConfigSchema: z.ZodType = z
  .object({
    enabled: z.boolean().optional(),
    destination: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('webhook'),
          webhook: z.lazy(() => marshalWebhookExportConfigSchema),
        }),
        z.object({
          $case: z.literal('jira'),
          jira: z.lazy(() => marshalJiraExportConfigSchema),
        }),
        z.object({
          $case: z.literal('slack'),
          slack: z.lazy(() => marshalSlackExportConfigSchema),
        }),
        z.object({
          $case: z.literal('tines'),
          tines: z.lazy(() => marshalTinesExportConfigSchema),
        }),
        z.object({
          $case: z.literal('serviceNow'),
          serviceNow: z.lazy(() => marshalServiceNowExportConfigSchema),
        }),
      ])
      .optional(),
    workspaceId: z.string().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
    ...(d.destination?.$case === 'webhook' && {webhook: d.destination.webhook}),
    ...(d.destination?.$case === 'jira' && {jira: d.destination.jira}),
    ...(d.destination?.$case === 'slack' && {slack: d.destination.slack}),
    ...(d.destination?.$case === 'tines' && {tines: d.destination.tines}),
    ...(d.destination?.$case === 'serviceNow' && {
      service_now: d.destination.serviceNow,
    }),
    workspace_id: d.workspaceId,
  }));

export const marshalJiraExportConfigSchema: z.ZodType = z
  .object({
    instanceUrl: z.string().optional(),
    projectKey: z.string().optional(),
    userEmail: z.string().optional(),
    defaultIssueType: z.string().optional(),
    apiTokenUcSecret: z.string().optional(),
  })
  .transform(d => ({
    instance_url: d.instanceUrl,
    project_key: d.projectKey,
    user_email: d.userEmail,
    default_issue_type: d.defaultIssueType,
    api_token_uc_secret: d.apiTokenUcSecret,
  }));

export const marshalJsonArrayEnvelopeSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

export const marshalParserRefSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    version: z.string().optional(),
    targetTable: z.lazy(() => marshalTableNameSchema).optional(),
    effectiveTargetTable: z.lazy(() => marshalTableNameSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    version: d.version,
    target_table: d.targetTable,
    effective_target_table: d.effectiveTargetTable,
  }));

export const marshalPrincipalSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    principalType: z.string().optional(),
    email: z.string().optional(),
    displayName: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    principal_type: d.principalType,
    email: d.email,
    display_name: d.displayName,
  }));

export const marshalResourceStatusSchema: z.ZodType = z
  .object({
    jobId: z.string().optional(),
    lifecycleState: z.string().optional(),
    runState: z.string().optional(),
    lastErrorMessage: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    lastStartTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    lastCompleteTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    lastStatusChangeTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    pipelineId: z.string().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    lifecycle_state: d.lifecycleState,
    run_state: d.runState,
    last_error_message: d.lastErrorMessage,
    create_time: d.createTime,
    last_start_time: d.lastStartTime,
    last_complete_time: d.lastCompleteTime,
    last_status_change_time: d.lastStatusChangeTime,
    pipeline_id: d.pipelineId,
  }));

export const marshalRuleSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    ruleId: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    effectiveCatalogName: z.string().optional(),
    effectiveSchemaName: z.string().optional(),
    ruleName: z.string().optional(),
    effectiveRuleName: z.string().optional(),
    description: z.string().optional(),
    version: z.bigint().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    createdBy: z.lazy(() => marshalPrincipalSchema).optional(),
    updatedBy: z.lazy(() => marshalPrincipalSchema).optional(),
    etag: z.string().optional(),
    annotations: z.record(z.string(), z.string()).optional(),
    owner: z.lazy(() => marshalPrincipalSchema).optional(),
    runAsPrincipal: z.string().optional(),
    effectiveRunAsPrincipal: z.string().optional(),
    category: z.string().optional(),
    severity: z.string().optional(),
    fidelity: z.string().optional(),
    objective: z.string().optional(),
    mitre: z.array(z.lazy(() => marshalRuleMitreMappingSchema)).optional(),
    deduplication: z.string().optional(),
    deduplicationTimeWindow: z.string().optional(),
    schedule: z.lazy(() => marshalRuleScheduleSchema).optional(),
    source: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('batch'),
          batch: z.lazy(() => marshalRuleInputBatchSchema),
        }),
      ])
      .optional(),
    output: z.lazy(() => marshalRuleOutputSchema).optional(),
    status: z.lazy(() => marshalResourceStatusSchema).optional(),
    suppressUntilTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    originalContentPack: z
      .lazy(() => marshalContentPackReferenceSchema)
      .optional(),
    computeWorkspaceId: z.string().optional(),
    contentResourceId: z.string().optional(),
    references: z.array(z.string()).optional(),
    runbook: z.string().optional(),
    timerange: z.lazy(() => marshalRuleTimeRangeSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    rule_id: d.ruleId,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    effective_catalog_name: d.effectiveCatalogName,
    effective_schema_name: d.effectiveSchemaName,
    rule_name: d.ruleName,
    effective_rule_name: d.effectiveRuleName,
    description: d.description,
    version: d.version,
    create_time: d.createTime,
    update_time: d.updateTime,
    created_by: d.createdBy,
    updated_by: d.updatedBy,
    etag: d.etag,
    annotations: d.annotations,
    owner: d.owner,
    run_as_principal: d.runAsPrincipal,
    effective_run_as_principal: d.effectiveRunAsPrincipal,
    category: d.category,
    severity: d.severity,
    fidelity: d.fidelity,
    objective: d.objective,
    mitre: d.mitre,
    deduplication: d.deduplication,
    deduplication_time_window: d.deduplicationTimeWindow,
    schedule: d.schedule,
    ...(d.source?.$case === 'batch' && {batch: d.source.batch}),
    output: d.output,
    status: d.status,
    suppress_until_time: d.suppressUntilTime,
    original_content_pack: d.originalContentPack,
    compute_workspace_id: d.computeWorkspaceId,
    content_resource_id: d.contentResourceId,
    references: d.references,
    runbook: d.runbook,
    timerange: d.timerange,
  }));

export const marshalRuleConfigSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.bigint().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.lazy(() => marshalPrincipalSchema).optional(),
    etag: z.string().optional(),
    defaultSchedule: z.lazy(() => marshalRuleScheduleSchema).optional(),
    detectionCategories: z.array(z.string()).optional(),
    defaultSignalCollationWindow: z.string().optional(),
    defaultFolder: z.string().optional(),
    effectiveDetectionCategories: z.array(z.string()).optional(),
    effectiveDefaultFolder: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    etag: d.etag,
    default_schedule: d.defaultSchedule,
    detection_categories: d.detectionCategories,
    default_signal_collation_window: d.defaultSignalCollationWindow,
    default_folder: d.defaultFolder,
    effective_detection_categories: d.effectiveDetectionCategories,
    effective_default_folder: d.effectiveDefaultFolder,
  }));

export const marshalRuleInputBatchSchema: z.ZodType = z
  .object({
    shape: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('sql'),
          sql: z.lazy(() => marshalRuleInputBatchSqlSchema),
        }),
        z.object({
          $case: z.literal('custom'),
          custom: z.lazy(() => marshalRuleInputCustomNotebookSchema),
        }),
      ])
      .optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    ...(d.shape?.$case === 'sql' && {sql: d.shape.sql}),
    ...(d.shape?.$case === 'custom' && {custom: d.shape.custom}),
    warehouse_id: d.warehouseId,
  }));

export const marshalRuleInputBatchSqlSchema: z.ZodType = z
  .object({
    defaultCatalogName: z.string().optional(),
    defaultSchemaName: z.string().optional(),
    query: z.string().optional(),
  })
  .transform(d => ({
    default_catalog_name: d.defaultCatalogName,
    default_schema_name: d.defaultSchemaName,
    query: d.query,
  }));

export const marshalRuleInputCustomNotebookSchema: z.ZodType = z
  .object({
    notebook: z.string().optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    notebook: d.notebook,
    options: d.options,
  }));

export const marshalRuleMitreMappingSchema: z.ZodType = z
  .object({
    taxonomy: z.string().optional(),
    tactic: z.string().optional(),
    techniqueId: z.string().optional(),
    technique: z.string().optional(),
    subTechniqueId: z.string().optional(),
    subTechnique: z.string().optional(),
  })
  .transform(d => ({
    taxonomy: d.taxonomy,
    tactic: d.tactic,
    technique_id: d.techniqueId,
    technique: d.technique,
    sub_technique_id: d.subTechniqueId,
    sub_technique: d.subTechnique,
  }));

export const marshalRuleOutputSchema: z.ZodType = z
  .object({
    summary: z.string().optional(),
    context: z.record(z.string(), z.string()).optional(),
    defaultContext: z.boolean().optional(),
    eventTimeColumn: z.string().optional(),
  })
  .transform(d => ({
    summary: d.summary,
    context: d.context,
    default_context: d.defaultContext,
    event_time_column: d.eventTimeColumn,
  }));

export const marshalRuleScheduleSchema: z.ZodType = z
  .object({
    timing: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('atLeastEvery'), atLeastEvery: z.string()}),
        z.object({
          $case: z.literal('cronExpression'),
          cronExpression: z.string(),
        }),
        z.object({$case: z.literal('continuous'), continuous: z.boolean()}),
      ])
      .optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    ...(d.timing?.$case === 'atLeastEvery' && {
      at_least_every: d.timing.atLeastEvery,
    }),
    ...(d.timing?.$case === 'cronExpression' && {
      cron_expression: d.timing.cronExpression,
    }),
    ...(d.timing?.$case === 'continuous' && {continuous: d.timing.continuous}),
    enabled: d.enabled,
  }));

export const marshalRuleTimeRangeSchema: z.ZodType = z
  .object({
    extendLookback: z.string().optional(),
  })
  .transform(d => ({
    extend_lookback: d.extendLookback,
  }));

export const marshalScheduleSchema: z.ZodType = z
  .object({
    timing: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('atLeastEvery'), atLeastEvery: z.string()}),
        z.object({
          $case: z.literal('cronExpression'),
          cronExpression: z.string(),
        }),
        z.object({$case: z.literal('continuous'), continuous: z.boolean()}),
      ])
      .optional(),
    computeGroup: z.string().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    ...(d.timing?.$case === 'atLeastEvery' && {
      at_least_every: d.timing.atLeastEvery,
    }),
    ...(d.timing?.$case === 'cronExpression' && {
      cron_expression: d.timing.cronExpression,
    }),
    ...(d.timing?.$case === 'continuous' && {continuous: d.timing.continuous}),
    compute_group: d.computeGroup,
    enabled: d.enabled,
  }));

export const marshalServiceNowExportConfigSchema: z.ZodType = z
  .object({
    instanceId: z.string().optional(),
    clientId: z.string().optional(),
    clientSecretUcSecret: z.string().optional(),
  })
  .transform(d => ({
    instance_id: d.instanceId,
    client_id: d.clientId,
    client_secret_uc_secret: d.clientSecretUcSecret,
  }));

export const marshalSlackExportConfigSchema: z.ZodType = z
  .object({
    channel: z.string().optional(),
    botTokenUcSecret: z.string().optional(),
  })
  .transform(d => ({
    channel: d.channel,
    bot_token_uc_secret: d.botTokenUcSecret,
  }));

export const marshalTableNameSchema: z.ZodType = z
  .object({
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    tableName: z.string().optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    table_name: d.tableName,
  }));

export const marshalTinesExportConfigSchema: z.ZodType = z
  .object({
    webhookUri: z.string().optional(),
    webhookSecretUcSecret: z.string().optional(),
    exportUpdates: z.boolean().optional(),
  })
  .transform(d => ({
    webhook_uri: d.webhookUri,
    webhook_secret_uc_secret: d.webhookSecretUcSecret,
    export_updates: d.exportUpdates,
  }));

export const marshalUnityCatalogConnectionSchema: z.ZodType = z
  .object({
    connectionName: z.string().optional(),
    connector: z.string().optional(),
    configuration: z.record(z.string(), z.string()).optional(),
    startTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    effectiveStartTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    connection_name: d.connectionName,
    connector: d.connector,
    configuration: d.configuration,
    start_time: d.startTime,
    effective_start_time: d.effectiveStartTime,
  }));

export const marshalWebhookExportConfigSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    exportUpdates: z.boolean().optional(),
  })
  .transform(d => ({
    url: d.url,
    export_updates: d.exportUpdates,
  }));

const alertConfigFieldMaskSchema: FieldMaskSchema = {
  defaultSecurityAlertCollationWindow: {
    wire: 'default_security_alert_collation_window',
  },
  defaultSystemAlertCollationWindow: {
    wire: 'default_system_alert_collation_window',
  },
  effectiveDefaultSecurityAlertCollationWindow: {
    wire: 'effective_default_security_alert_collation_window',
  },
  effectiveDefaultSystemAlertCollationWindow: {
    wire: 'effective_default_system_alert_collation_window',
  },
  etag: {wire: 'etag'},
  name: {wire: 'name'},
  securityAlertExportConfig: {
    wire: 'security_alert_export_config',
    children: () => exportConfigFieldMaskSchema,
  },
  systemAlertExportConfig: {
    wire: 'system_alert_export_config',
    children: () => exportConfigFieldMaskSchema,
  },
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by', children: () => principalFieldMaskSchema},
  version: {wire: 'version'},
};

export function alertConfigFieldMask(
  ...paths: string[]
): FieldMask<AlertConfig> {
  return FieldMask.build<AlertConfig>(paths, alertConfigFieldMaskSchema);
}

const autoLoaderFieldMaskSchema: FieldMaskSchema = {
  awsSecretScope: {wire: 'aws_secret_scope'},
  effectiveIncludeExistingFiles: {wire: 'effective_include_existing_files'},
  effectiveRawTable: {
    wire: 'effective_raw_table',
    children: () => tableNameFieldMaskSchema,
  },
  envelope: {wire: 'envelope', children: () => envelopeFieldMaskSchema},
  format: {wire: 'format'},
  formatOptions: {wire: 'format_options'},
  includeExistingFiles: {wire: 'include_existing_files'},
  location: {wire: 'location'},
  overridePartitionColumns: {wire: 'override_partition_columns'},
  queueUrl: {wire: 'queue_url'},
  rawTable: {wire: 'raw_table', children: () => tableNameFieldMaskSchema},
  serviceCredentials: {wire: 'service_credentials'},
};

const cloudWatchLogsEnvelopeFieldMaskSchema: FieldMaskSchema = {
  headerRetention: {wire: 'header_retention'},
};

const commonConfigFieldMaskSchema: FieldMaskSchema = {
  etag: {wire: 'etag'},
  name: {wire: 'name'},
  perResourcePermissionsEnabled: {wire: 'per_resource_permissions_enabled'},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by', children: () => principalFieldMaskSchema},
  version: {wire: 'version'},
};

export function commonConfigFieldMask(
  ...paths: string[]
): FieldMask<CommonConfig> {
  return FieldMask.build<CommonConfig>(paths, commonConfigFieldMaskSchema);
}

const contentPackReferenceFieldMaskSchema: FieldMaskSchema = {
  uuid: {wire: 'uuid'},
  version: {wire: 'version'},
};

const datasourceFieldMaskSchema: FieldMaskSchema = {
  annotations: {wire: 'annotations'},
  autoloader: {wire: 'autoloader', children: () => autoLoaderFieldMaskSchema},
  catalogName: {wire: 'catalog_name'},
  computeMode: {wire: 'compute_mode'},
  computeWorkspaceId: {wire: 'compute_workspace_id'},
  createTime: {wire: 'create_time'},
  createdBy: {wire: 'created_by', children: () => principalFieldMaskSchema},
  datasourceId: {wire: 'datasource_id'},
  datasourceName: {wire: 'datasource_name'},
  description: {wire: 'description'},
  effectiveCatalogName: {wire: 'effective_catalog_name'},
  effectiveDatasourceName: {wire: 'effective_datasource_name'},
  effectiveRunAsPrincipal: {wire: 'effective_run_as_principal'},
  effectiveSchemaName: {wire: 'effective_schema_name'},
  etag: {wire: 'etag'},
  existingTable: {
    wire: 'existing_table',
    children: () => existingTableFieldMaskSchema,
  },
  name: {wire: 'name'},
  owner: {wire: 'owner', children: () => principalFieldMaskSchema},
  parsers: {wire: 'parsers'},
  runAsPrincipal: {wire: 'run_as_principal'},
  schedule: {wire: 'schedule', children: () => scheduleFieldMaskSchema},
  schemaName: {wire: 'schema_name'},
  status: {wire: 'status', children: () => datasourceStatusFieldMaskSchema},
  unityCatalogConnection: {
    wire: 'unity_catalog_connection',
    children: () => unityCatalogConnectionFieldMaskSchema,
  },
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by', children: () => principalFieldMaskSchema},
  version: {wire: 'version'},
  warehouseId: {wire: 'warehouse_id'},
};

export function datasourceFieldMask(...paths: string[]): FieldMask<Datasource> {
  return FieldMask.build<Datasource>(paths, datasourceFieldMaskSchema);
}

const datasourceConfigFieldMaskSchema: FieldMaskSchema = {
  defaultComputeMode: {wire: 'default_compute_mode'},
  defaultFolder: {wire: 'default_folder'},
  effectiveDefaultFolder: {wire: 'effective_default_folder'},
  etag: {wire: 'etag'},
  name: {wire: 'name'},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by', children: () => principalFieldMaskSchema},
  version: {wire: 'version'},
};

export function datasourceConfigFieldMask(
  ...paths: string[]
): FieldMask<DatasourceConfig> {
  return FieldMask.build<DatasourceConfig>(
    paths,
    datasourceConfigFieldMaskSchema
  );
}

const datasourceStatusFieldMaskSchema: FieldMaskSchema = {
  ingestionJob: {
    wire: 'ingestion_job',
    children: () => resourceStatusFieldMaskSchema,
  },
  ingestionPipeline: {
    wire: 'ingestion_pipeline',
    children: () => resourceStatusFieldMaskSchema,
  },
};

const envelopeFieldMaskSchema: FieldMaskSchema = {
  cloudWatchLogs: {
    wire: 'cloud_watch_logs',
    children: () => cloudWatchLogsEnvelopeFieldMaskSchema,
  },
  jsonArray: {
    wire: 'json_array',
    children: () => jsonArrayEnvelopeFieldMaskSchema,
  },
};

const existingTableFieldMaskSchema: FieldMaskSchema = {
  catalog: {wire: 'catalog'},
  effectiveCatalog: {wire: 'effective_catalog'},
  effectiveName: {wire: 'effective_name'},
  effectiveSchema: {wire: 'effective_schema'},
  includeExistingRows: {wire: 'include_existing_rows'},
  name: {wire: 'name'},
  schema: {wire: 'schema'},
};

const exportConfigFieldMaskSchema: FieldMaskSchema = {
  enabled: {wire: 'enabled'},
  jira: {wire: 'jira', children: () => jiraExportConfigFieldMaskSchema},
  serviceNow: {
    wire: 'service_now',
    children: () => serviceNowExportConfigFieldMaskSchema,
  },
  slack: {wire: 'slack', children: () => slackExportConfigFieldMaskSchema},
  tines: {wire: 'tines', children: () => tinesExportConfigFieldMaskSchema},
  webhook: {
    wire: 'webhook',
    children: () => webhookExportConfigFieldMaskSchema,
  },
  workspaceId: {wire: 'workspace_id'},
};

const jiraExportConfigFieldMaskSchema: FieldMaskSchema = {
  apiTokenUcSecret: {wire: 'api_token_uc_secret'},
  defaultIssueType: {wire: 'default_issue_type'},
  instanceUrl: {wire: 'instance_url'},
  projectKey: {wire: 'project_key'},
  userEmail: {wire: 'user_email'},
};

const jsonArrayEnvelopeFieldMaskSchema: FieldMaskSchema = {
  path: {wire: 'path'},
};

const principalFieldMaskSchema: FieldMaskSchema = {
  displayName: {wire: 'display_name'},
  email: {wire: 'email'},
  id: {wire: 'id'},
  principalType: {wire: 'principal_type'},
};

const resourceStatusFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  jobId: {wire: 'job_id'},
  lastCompleteTime: {wire: 'last_complete_time'},
  lastErrorMessage: {wire: 'last_error_message'},
  lastStartTime: {wire: 'last_start_time'},
  lastStatusChangeTime: {wire: 'last_status_change_time'},
  lifecycleState: {wire: 'lifecycle_state'},
  pipelineId: {wire: 'pipeline_id'},
  runState: {wire: 'run_state'},
};

const ruleFieldMaskSchema: FieldMaskSchema = {
  annotations: {wire: 'annotations'},
  batch: {wire: 'batch', children: () => ruleInputBatchFieldMaskSchema},
  catalogName: {wire: 'catalog_name'},
  category: {wire: 'category'},
  computeWorkspaceId: {wire: 'compute_workspace_id'},
  contentResourceId: {wire: 'content_resource_id'},
  createTime: {wire: 'create_time'},
  createdBy: {wire: 'created_by', children: () => principalFieldMaskSchema},
  deduplication: {wire: 'deduplication'},
  deduplicationTimeWindow: {wire: 'deduplication_time_window'},
  description: {wire: 'description'},
  effectiveCatalogName: {wire: 'effective_catalog_name'},
  effectiveRuleName: {wire: 'effective_rule_name'},
  effectiveRunAsPrincipal: {wire: 'effective_run_as_principal'},
  effectiveSchemaName: {wire: 'effective_schema_name'},
  etag: {wire: 'etag'},
  fidelity: {wire: 'fidelity'},
  mitre: {wire: 'mitre'},
  name: {wire: 'name'},
  objective: {wire: 'objective'},
  originalContentPack: {
    wire: 'original_content_pack',
    children: () => contentPackReferenceFieldMaskSchema,
  },
  output: {wire: 'output', children: () => ruleOutputFieldMaskSchema},
  owner: {wire: 'owner', children: () => principalFieldMaskSchema},
  references: {wire: 'references'},
  ruleId: {wire: 'rule_id'},
  ruleName: {wire: 'rule_name'},
  runAsPrincipal: {wire: 'run_as_principal'},
  runbook: {wire: 'runbook'},
  schedule: {wire: 'schedule', children: () => ruleScheduleFieldMaskSchema},
  schemaName: {wire: 'schema_name'},
  severity: {wire: 'severity'},
  status: {wire: 'status', children: () => resourceStatusFieldMaskSchema},
  suppressUntilTime: {wire: 'suppress_until_time'},
  timerange: {wire: 'timerange', children: () => ruleTimeRangeFieldMaskSchema},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by', children: () => principalFieldMaskSchema},
  version: {wire: 'version'},
};

export function ruleFieldMask(...paths: string[]): FieldMask<Rule> {
  return FieldMask.build<Rule>(paths, ruleFieldMaskSchema);
}

const ruleConfigFieldMaskSchema: FieldMaskSchema = {
  defaultFolder: {wire: 'default_folder'},
  defaultSchedule: {
    wire: 'default_schedule',
    children: () => ruleScheduleFieldMaskSchema,
  },
  defaultSignalCollationWindow: {wire: 'default_signal_collation_window'},
  detectionCategories: {wire: 'detection_categories'},
  effectiveDefaultFolder: {wire: 'effective_default_folder'},
  effectiveDetectionCategories: {wire: 'effective_detection_categories'},
  etag: {wire: 'etag'},
  name: {wire: 'name'},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by', children: () => principalFieldMaskSchema},
  version: {wire: 'version'},
};

export function ruleConfigFieldMask(...paths: string[]): FieldMask<RuleConfig> {
  return FieldMask.build<RuleConfig>(paths, ruleConfigFieldMaskSchema);
}

const ruleInputBatchFieldMaskSchema: FieldMaskSchema = {
  custom: {
    wire: 'custom',
    children: () => ruleInputCustomNotebookFieldMaskSchema,
  },
  sql: {wire: 'sql', children: () => ruleInputBatchSqlFieldMaskSchema},
  warehouseId: {wire: 'warehouse_id'},
};

const ruleInputBatchSqlFieldMaskSchema: FieldMaskSchema = {
  defaultCatalogName: {wire: 'default_catalog_name'},
  defaultSchemaName: {wire: 'default_schema_name'},
  query: {wire: 'query'},
};

const ruleInputCustomNotebookFieldMaskSchema: FieldMaskSchema = {
  notebook: {wire: 'notebook'},
  options: {wire: 'options'},
};

const ruleOutputFieldMaskSchema: FieldMaskSchema = {
  context: {wire: 'context'},
  defaultContext: {wire: 'default_context'},
  eventTimeColumn: {wire: 'event_time_column'},
  summary: {wire: 'summary'},
};

const ruleScheduleFieldMaskSchema: FieldMaskSchema = {
  atLeastEvery: {wire: 'at_least_every'},
  continuous: {wire: 'continuous'},
  cronExpression: {wire: 'cron_expression'},
  enabled: {wire: 'enabled'},
};

const ruleTimeRangeFieldMaskSchema: FieldMaskSchema = {
  extendLookback: {wire: 'extend_lookback'},
};

const scheduleFieldMaskSchema: FieldMaskSchema = {
  atLeastEvery: {wire: 'at_least_every'},
  computeGroup: {wire: 'compute_group'},
  continuous: {wire: 'continuous'},
  cronExpression: {wire: 'cron_expression'},
  enabled: {wire: 'enabled'},
};

const serviceNowExportConfigFieldMaskSchema: FieldMaskSchema = {
  clientId: {wire: 'client_id'},
  clientSecretUcSecret: {wire: 'client_secret_uc_secret'},
  instanceId: {wire: 'instance_id'},
};

const slackExportConfigFieldMaskSchema: FieldMaskSchema = {
  botTokenUcSecret: {wire: 'bot_token_uc_secret'},
  channel: {wire: 'channel'},
};

const tableNameFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  schemaName: {wire: 'schema_name'},
  tableName: {wire: 'table_name'},
};

const tinesExportConfigFieldMaskSchema: FieldMaskSchema = {
  exportUpdates: {wire: 'export_updates'},
  webhookSecretUcSecret: {wire: 'webhook_secret_uc_secret'},
  webhookUri: {wire: 'webhook_uri'},
};

const unityCatalogConnectionFieldMaskSchema: FieldMaskSchema = {
  configuration: {wire: 'configuration'},
  connectionName: {wire: 'connection_name'},
  connector: {wire: 'connector'},
  effectiveStartTime: {wire: 'effective_start_time'},
  startTime: {wire: 'start_time'},
};

const webhookExportConfigFieldMaskSchema: FieldMaskSchema = {
  exportUpdates: {wire: 'export_updates'},
  url: {wire: 'url'},
};
