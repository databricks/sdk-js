// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Enum to specify which mode of clone to execute */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CloneMode = {
  /** Data and metadata are copied */
  MIGRATE_TO_UC: 'MIGRATE_TO_UC',
} as const;
export type CloneMode =
  | (typeof CloneMode)[keyof typeof CloneMode]
  | (string & {});

/**
 * For certain database sources LakeFlow Connect offers both query based and cdc
 * ingestion, ConnectorType can bse used to convey the type of ingestion.
 * If connection_name is provided for database sources, we default to Query Based ingestion
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ConnectorType = {
  CONNECTOR_TYPE_UNSPECIFIED: 'CONNECTOR_TYPE_UNSPECIFIED',
  /**
   * If connector_type = CDC and ingestion_gateway_id is provided then we use Ingestion Gateway pipeline with
   * Cdc Managed Ingestion Pipeline for ingestion, if connector_type = CDC and connection_name is provided
   * then we use Combined Cdc Managed Ingestion Pipeline.
   */
  CDC: 'CDC',
  QUERY_BASED: 'QUERY_BASED',
} as const;
export type ConnectorType =
  | (typeof ConnectorType)[keyof typeof ConnectorType]
  | (string & {});

/**
 * Days of week in which the window is allowed to happen.
 * If not specified all days of the week will be used.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DayOfWeek = {
  DAY_OF_WEEK_UNSPECIFIED: 'DAY_OF_WEEK_UNSPECIFIED',
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
} as const;
export type DayOfWeek =
  | (typeof DayOfWeek)[keyof typeof DayOfWeek]
  | (string & {});

/**
 * The deployment method that manages the pipeline:
 * - BUNDLE: The pipeline is managed by a Databricks Asset Bundle.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DeploymentKind = {
  /** Databricks Asset Bundle (DAB) */
  BUNDLE: 'BUNDLE',
} as const;
export type DeploymentKind =
  | (typeof DeploymentKind)[keyof typeof DeploymentKind]
  | (string & {});

/** The severity level of the event. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EventLevel = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  METRICS: 'METRICS',
} as const;
export type EventLevel =
  | (typeof EventLevel)[keyof typeof EventLevel]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngestionSourceType = {
  INGESTION_SOURCE_TYPE_UNSPECIFIED: 'INGESTION_SOURCE_TYPE_UNSPECIFIED',
  MYSQL: 'MYSQL',
  POSTGRESQL: 'POSTGRESQL',
  SQLSERVER: 'SQLSERVER',
  SALESFORCE: 'SALESFORCE',
  BIGQUERY: 'BIGQUERY',
  NETSUITE: 'NETSUITE',
  WORKDAY_RAAS: 'WORKDAY_RAAS',
  GA4_RAW_DATA: 'GA4_RAW_DATA',
  SERVICENOW: 'SERVICENOW',
  MANAGED_POSTGRESQL: 'MANAGED_POSTGRESQL',
  ORACLE: 'ORACLE',
  TERADATA: 'TERADATA',
  SHAREPOINT: 'SHAREPOINT',
  DYNAMICS365: 'DYNAMICS365',
  GOOGLE_DRIVE: 'GOOGLE_DRIVE',
  JIRA: 'JIRA',
  CONFLUENCE: 'CONFLUENCE',
  META_MARKETING: 'META_MARKETING',
  ZENDESK: 'ZENDESK',
  FOREIGN_CATALOG: 'FOREIGN_CATALOG',
} as const;
export type IngestionSourceType =
  | (typeof IngestionSourceType)[keyof typeof IngestionSourceType]
  | (string & {});

/** Maturity level for EventDetails. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const MaturityLevel = {
  STABLE: 'STABLE',
  EVOLVING: 'EVOLVING',
  DEPRECATED: 'DEPRECATED',
} as const;
export type MaturityLevel =
  | (typeof MaturityLevel)[keyof typeof MaturityLevel]
  | (string & {});

/** Attachment behavior mode for Outlook ingestion */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const OutlookAttachmentMode = {
  OUTLOOK_ATTACHMENT_MODE_UNSPECIFIED: 'OUTLOOK_ATTACHMENT_MODE_UNSPECIFIED',
  /** Ingest all attachments (both inline and non-inline) */
  ALL: 'ALL',
  /** Ingest only non-inline attachments (recommended to avoid corporate signature images) */
  NON_INLINE_ONLY: 'NON_INLINE_ONLY',
  /** Ingest only inline attachments */
  INLINE_ONLY: 'INLINE_ONLY',
  /** Do not ingest any attachments */
  NONE: 'NONE',
} as const;
export type OutlookAttachmentMode =
  | (typeof OutlookAttachmentMode)[keyof typeof OutlookAttachmentMode]
  | (string & {});

/** Body format for Outlook email content */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const OutlookBodyFormat = {
  OUTLOOK_BODY_FORMAT_UNSPECIFIED: 'OUTLOOK_BODY_FORMAT_UNSPECIFIED',
  TEXT_HTML: 'TEXT_HTML',
  TEXT_PLAIN: 'TEXT_PLAIN',
} as const;
export type OutlookBodyFormat =
  | (typeof OutlookBodyFormat)[keyof typeof OutlookBodyFormat]
  | (string & {});

/** The health of a pipeline. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PipelineHealthStatus = {
  HEALTHY: 'HEALTHY',
  UNHEALTHY: 'UNHEALTHY',
} as const;
export type PipelineHealthStatus =
  | (typeof PipelineHealthStatus)[keyof typeof PipelineHealthStatus]
  | (string & {});

/** The set of AWS availability types supported when setting up nodes for a cluster. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PipelinesAwsAvailability = {
  /** Use spot instances. */
  SPOT: 'SPOT',
  /** Use on-demand instances. */
  ON_DEMAND: 'ON_DEMAND',
  /**
   * Preferably use spot instances, but fall back to on-demand instances if spot instances cannot
   * be acquired (e.g., if AWS spot prices are too high).
   */
  SPOT_WITH_FALLBACK: 'SPOT_WITH_FALLBACK',
} as const;
export type PipelinesAwsAvailability =
  | (typeof PipelinesAwsAvailability)[keyof typeof PipelinesAwsAvailability]
  | (string & {});

/** The set of Azure availability types supported when setting up nodes for a cluster. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PipelinesAzureAvailability = {
  /** Use spot instances. */
  SPOT_AZURE: 'SPOT_AZURE',
  /** Use on-demand instances. */
  ON_DEMAND_AZURE: 'ON_DEMAND_AZURE',
  /**
   * Preferably use spot instances, but fall back to on-demand instances if spot instances cannot
   * be acquired (e.g., if Azure is out of Quota).
   */
  SPOT_WITH_FALLBACK_AZURE: 'SPOT_WITH_FALLBACK_AZURE',
} as const;
export type PipelinesAzureAvailability =
  | (typeof PipelinesAzureAvailability)[keyof typeof PipelinesAzureAvailability]
  | (string & {});

/**
 * All EBS volume types that <Databricks> supports.
 * See https://aws.amazon.com/ebs/details/ for details.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PipelinesEbsVolumeType = {
  /** Provision extra storage using AWS gp2 EBS volumes. */
  GENERAL_PURPOSE_SSD: 'GENERAL_PURPOSE_SSD',
  /** Provision extra storage using AWS st1 volumes. */
  THROUGHPUT_OPTIMIZED_HDD: 'THROUGHPUT_OPTIMIZED_HDD',
} as const;
export type PipelinesEbsVolumeType =
  | (typeof PipelinesEbsVolumeType)[keyof typeof PipelinesEbsVolumeType]
  | (string & {});

/** The set of GCP availability types supported when setting up nodes for a cluster (configurable only for executors). */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PipelinesGcpAvailability = {
  PREEMPTIBLE_GCP: 'PREEMPTIBLE_GCP',
  ON_DEMAND_GCP: 'ON_DEMAND_GCP',
  PREEMPTIBLE_WITH_FALLBACK_GCP: 'PREEMPTIBLE_WITH_FALLBACK_GCP',
} as const;
export type PipelinesGcpAvailability =
  | (typeof PipelinesGcpAvailability)[keyof typeof PipelinesGcpAvailability]
  | (string & {});

/** Enum representing the publishing mode of a pipeline. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PublishingMode = {
  PUBLISHING_MODE_UNSPECIFIED: 'PUBLISHING_MODE_UNSPECIFIED',
  LEGACY_PUBLISHING_MODE: 'LEGACY_PUBLISHING_MODE',
  DEFAULT_PUBLISHING_MODE: 'DEFAULT_PUBLISHING_MODE',
} as const;
export type PublishingMode =
  | (typeof PublishingMode)[keyof typeof PublishingMode]
  | (string & {});

/** What triggered this update. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const UpdateCause = {
  /** Started through an API call. */
  API_CALL: 'API_CALL',
  /** Started as a retry for a failed update. */
  RETRY_ON_FAILURE: 'RETRY_ON_FAILURE',
  /** Started as a result of a service upgrade. */
  SERVICE_UPGRADE: 'SERVICE_UPGRADE',
  /** Started as a result of a schema change. */
  SCHEMA_CHANGE: 'SCHEMA_CHANGE',
  /** Started by the Jobs service. */
  JOB_TASK: 'JOB_TASK',
  /** Started by an action a user performed. */
  USER_ACTION: 'USER_ACTION',
  /** Started for infrastructure maintenance reason. */
  INFRASTRUCTURE_MAINTENANCE: 'INFRASTRUCTURE_MAINTENANCE',
} as const;
export type UpdateCause =
  | (typeof UpdateCause)[keyof typeof UpdateCause]
  | (string & {});

/** The update state. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const UpdateState = {
  /** Update is waiting for previous update to finish. */
  QUEUED: 'QUEUED',
  /** Initial state of an update. */
  CREATED: 'CREATED',
  /** Update is waiting for clusters, jobs, or other resources. */
  WAITING_FOR_RESOURCES: 'WAITING_FOR_RESOURCES',
  /** Update is creating the dataflow graph. */
  INITIALIZING: 'INITIALIZING',
  /** Update is resetting datasets and checkpoints to the beginning. */
  RESETTING: 'RESETTING',
  /** If necessary, Update is creating tables or updating their schemas. */
  SETTING_UP_TABLES: 'SETTING_UP_TABLES',
  /** Update is currently executing queries. */
  RUNNING: 'RUNNING',
  /** Update is waiting for queries to shut down. */
  STOPPING: 'STOPPING',
  /** Update is complete and all necessary resources are cleaned up. */
  COMPLETED: 'COMPLETED',
  /** Update has run into an error that could not be recovered from. */
  FAILED: 'FAILED',
  /** Update was canceled while it was running or queued. */
  CANCELED: 'CANCELED',
} as const;
export type UpdateState =
  | (typeof UpdateState)[keyof typeof UpdateState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FileIngestionOptions_FileFormat = {
  FILE_FORMAT_UNSPECIFIED: 'FILE_FORMAT_UNSPECIFIED',
  BINARYFILE: 'BINARYFILE',
  JSON: 'JSON',
  CSV: 'CSV',
  XML: 'XML',
  EXCEL: 'EXCEL',
  PARQUET: 'PARQUET',
  AVRO: 'AVRO',
  ORC: 'ORC',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type FileIngestionOptions_FileFormat =
  | (typeof FileIngestionOptions_FileFormat)[keyof typeof FileIngestionOptions_FileFormat]
  | (string & {});

/** Based on https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/schema#how-does-auto-loader-schema-evolution-work */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FileIngestionOptions_SchemaEvolutionMode = {
  SCHEMA_EVOLUTION_MODE_UNSPECIFIED: 'SCHEMA_EVOLUTION_MODE_UNSPECIFIED',
  ADD_NEW_COLUMNS_WITH_TYPE_WIDENING: 'ADD_NEW_COLUMNS_WITH_TYPE_WIDENING',
  ADD_NEW_COLUMNS: 'ADD_NEW_COLUMNS',
  RESCUE: 'RESCUE',
  FAIL_ON_NEW_COLUMNS: 'FAIL_ON_NEW_COLUMNS',
  NONE: 'NONE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type FileIngestionOptions_SchemaEvolutionMode =
  | (typeof FileIngestionOptions_SchemaEvolutionMode)[keyof typeof FileIngestionOptions_SchemaEvolutionMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const GoogleDriveOptions_GoogleDriveEntityType = {
  GOOGLE_DRIVE_ENTITY_TYPE_UNSPECIFIED: 'GOOGLE_DRIVE_ENTITY_TYPE_UNSPECIFIED',
  FILE: 'FILE',
  FILE_METADATA: 'FILE_METADATA',
  PERMISSION: 'PERMISSION',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type GoogleDriveOptions_GoogleDriveEntityType =
  | (typeof GoogleDriveOptions_GoogleDriveEntityType)[keyof typeof GoogleDriveOptions_GoogleDriveEntityType]
  | (string & {});

/** The pipeline state. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PipelineState_PipelineState = {
  /** Pipeline is being deployed and waiting for clusters, jobs, or other resources */
  DEPLOYING: 'DEPLOYING',
  /** Pipeline is deployed but waiting for streams to start and make progress */
  STARTING: 'STARTING',
  /** Pipeline is currently executing */
  RUNNING: 'RUNNING',
  /** Pipeline is waiting for streams to shut down */
  STOPPING: 'STOPPING',
  /** All clusters, jobs, and other resources associated with the pipeline have been cleaned up */
  DELETED: 'DELETED',
  /** Pipeline has run into an error, but the daemon is attempting to fix it */
  RECOVERING: 'RECOVERING',
  /** Pipeline has run into an error that could not be recovered from */
  FAILED: 'FAILED',
  /** Pipeline is currently being reset */
  RESETTING: 'RESETTING',
  /** Pipeline is stopped and is not processing data. Can be resumed by calling `run` */
  IDLE: 'IDLE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PipelineState_PipelineState =
  | (typeof PipelineState_PipelineState)[keyof typeof PipelineState_PipelineState]
  | (string & {});

/** The SCD type to use to ingest the table. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ScdType_ScdType = {
  SCD_TYPE_UNSPECIFIED: 'SCD_TYPE_UNSPECIFIED',
  SCD_TYPE_1: 'SCD_TYPE_1',
  SCD_TYPE_2: 'SCD_TYPE_2',
  /**
   * Source data will be appended to destination table rather than merged in
   * the absence of row key.
   */
  APPEND_ONLY: 'APPEND_ONLY',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ScdType_ScdType =
  | (typeof ScdType_ScdType)[keyof typeof ScdType_ScdType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SharepointOptions_SharepointEntityType = {
  SHAREPOINT_ENTITY_TYPE_UNSPECIFIED: 'SHAREPOINT_ENTITY_TYPE_UNSPECIFIED',
  FILE: 'FILE',
  FILE_METADATA: 'FILE_METADATA',
  PERMISSION: 'PERMISSION',
  LIST: 'LIST',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SharepointOptions_SharepointEntityType =
  | (typeof SharepointOptions_SharepointEntityType)[keyof typeof SharepointOptions_SharepointEntityType]
  | (string & {});

/** Data level for TikTok Ads report aggregation. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TikTokAdsOptions_TikTokDataLevel = {
  TIK_TOK_DATA_LEVEL_UNSPECIFIED: 'TIK_TOK_DATA_LEVEL_UNSPECIFIED',
  AUCTION_ADVERTISER: 'AUCTION_ADVERTISER',
  AUCTION_CAMPAIGN: 'AUCTION_CAMPAIGN',
  AUCTION_ADGROUP: 'AUCTION_ADGROUP',
  AUCTION_AD: 'AUCTION_AD',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type TikTokAdsOptions_TikTokDataLevel =
  | (typeof TikTokAdsOptions_TikTokDataLevel)[keyof typeof TikTokAdsOptions_TikTokDataLevel]
  | (string & {});

/** Report type for TikTok Ads API. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TikTokAdsOptions_TikTokReportType = {
  TIK_TOK_REPORT_TYPE_UNSPECIFIED: 'TIK_TOK_REPORT_TYPE_UNSPECIFIED',
  BASIC: 'BASIC',
  AUDIENCE: 'AUDIENCE',
  PLAYABLE_AD: 'PLAYABLE_AD',
  DSA: 'DSA',
  BUSINESS_CENTER: 'BUSINESS_CENTER',
  GMV_MAX: 'GMV_MAX',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type TikTokAdsOptions_TikTokReportType =
  | (typeof TikTokAdsOptions_TikTokReportType)[keyof typeof TikTokAdsOptions_TikTokReportType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Transformer_Format = {
  FORMAT_UNSPECIFIED: 'FORMAT_UNSPECIFIED',
  STRING: 'STRING',
  JSON: 'JSON',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type Transformer_Format =
  | (typeof Transformer_Format)[keyof typeof Transformer_Format]
  | (string & {});

export interface ApplyEnvironmentRequest {
  pipelineId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ApplyEnvironmentResponse {}

/** Policy for auto full refresh. */
export interface AutoFullRefreshPolicy {
  /** (Required, Mutable) Whether to enable auto full refresh or not. */
  enabled?: boolean | undefined;
  /**
   * (Optional, Mutable) Specify the minimum interval in hours between the timestamp
   * at which a table was last full refreshed and the current timestamp for triggering auto full
   * If unspecified and autoFullRefresh is enabled then by default min_interval_hours is 24 hours.
   */
  minIntervalHours?: number | undefined;
}

export interface ClonePipelineRequest {
  /** Source pipeline to clone from */
  pipelineId?: string | undefined;
  /**
   * If present, the last-modified time of the pipeline settings before the clone.
   * If the settings were modified after that time, then the request will fail with
   * a conflict.
   */
  expectedLastModified?: bigint | undefined;
  /** If false, deployment will fail if name conflicts with that of another pipeline. */
  allowDuplicateNames?: boolean | undefined;
  /** Unique identifier for this pipeline. */
  id?: string | undefined;
  /** Friendly identifier for this pipeline. */
  name?: string | undefined;
  /** DBFS root directory for storing checkpoints and tables. */
  storage?: string | undefined;
  /** String-String configuration for this pipeline execution. */
  configuration?: Record<string, string> | undefined;
  /** Cluster settings for this pipeline deployment. */
  clusters?: CreatePipelineCluster[] | undefined;
  /** Libraries or code needed by this deployment. */
  libraries?: CreatePipelineLibrary[] | undefined;
  /** The configuration for a managed ingestion pipeline. These settings cannot be used with the 'libraries', 'schema', 'target', or 'catalog' settings. */
  ingestionDefinition?: CreateIngestionPipelineDefinition | undefined;
  /** The definition of a gateway pipeline to support change data capture. */
  gatewayDefinition?: CreateIngestionGatewayPipelineDefinition | undefined;
  /** Which pipeline trigger to use. Deprecated: Use `continuous` instead. */
  trigger?: CreatePipelineTrigger | undefined;
  /** Target schema (database) to add tables in this pipeline to. Exactly one of `schema` or `target` must be specified. To publish to Unity Catalog, also specify `catalog`. This legacy field is deprecated for pipeline creation in favor of the `schema` field. */
  target?: string | undefined;
  /** The default schema (database) where tables are read from or published to. */
  schema?: string | undefined;
  /** Filters on which Pipeline packages to include in the deployed graph. */
  filters?: CreateFilters | undefined;
  /** Whether the pipeline is continuous or triggered. This replaces `trigger`. */
  continuous?: boolean | undefined;
  /** Whether the pipeline is in Development mode. Defaults to false. */
  development?: boolean | undefined;
  /** Whether Photon is enabled for this pipeline. */
  photon?: boolean | undefined;
  /** Pipeline product edition. */
  edition?: string | undefined;
  /** SDP Release Channel that specifies which version to use. */
  channel?: string | undefined;
  /** A catalog in Unity Catalog to publish data from this pipeline to. If `target` is specified, tables in this pipeline are published to a `target` schema inside `catalog` (for example, `catalog`.`target`.`table`). If `target` is not specified, no data is published to Unity Catalog. */
  catalog?: string | undefined;
  /** List of notification settings for this pipeline. */
  notifications?: CreateNotifications[] | undefined;
  /** Whether serverless compute is enabled for this pipeline. */
  serverless?: boolean | undefined;
  /** Deployment type of this pipeline. */
  deployment?: CreatePipelineDeployment | undefined;
  /** Restart window of this pipeline. */
  restartWindow?: CreateRestartWindow | undefined;
  /** Budget policy of this pipeline. */
  budgetPolicyId?: string | undefined;
  /**
   * A map of tags associated with the pipeline.
   * These are forwarded to the cluster as cluster tags, and are therefore subject to the same limitations.
   * A maximum of 25 tags can be added to the pipeline.
   */
  tags?: Record<string, string> | undefined;
  /** Event log configuration for this pipeline */
  eventLog?: CreateEventLogSpec | undefined;
  /**
   * Root path for this pipeline.
   * This is used as the root directory when editing the pipeline in the <Databricks> user interface and it is
   * added to sys.path when executing Python sources during pipeline execution.
   */
  rootPath?: string | undefined;
  /** Environment specification for this pipeline used to install dependencies. */
  environment?: CreatePipelinesEnvironment | undefined;
  /** Usage policy of this pipeline. */
  usagePolicyId?: string | undefined;
  /** Serverless compute ID specified by the user for serverless pipelines. */
  serverlessComputeId?: string | undefined;
  /** The type of clone to perform. Currently, only deep copies are supported */
  cloneMode?: CloneMode | undefined;
}

export interface ClonePipelineResponse {
  /** The pipeline id of the cloned pipeline */
  pipelineId?: string | undefined;
}

/** Confluence specific options for ingestion */
export interface ConfluenceConnectorOptions {
  /** (Optional) Spaces to filter Confluence data on */
  includeConfluenceSpaces?: string[] | undefined;
}

export interface ConnectionParameters {
  /**
   * Source catalog for initial connection.
   * This is necessary for schema exploration in some database systems like Oracle, and optional but nice-to-have
   * in some other database systems like Postgres.
   * For Oracle databases, this maps to a service name.
   */
  sourceCatalog?: string | undefined;
}

/** Wrapper message for source-specific options to support multiple connector types */
export interface ConnectorOptions {
  connectorOptions?:
    | {$case: 'googleAdsOptions'; googleAdsOptions: GoogleAdsOptions}
    | {$case: 'tiktokAdsOptions'; tiktokAdsOptions: TikTokAdsOptions}
    | {$case: 'sharepointOptions'; sharepointOptions: SharepointOptions}
    | {$case: 'gdriveOptions'; gdriveOptions: GoogleDriveOptions}
    | {$case: 'outlookOptions'; outlookOptions: OutlookOptions}
    | {$case: 'smartsheetOptions'; smartsheetOptions: SmartsheetOptions}
    | {$case: 'jiraOptions'; jiraOptions: JiraConnectorOptions}
    | {
        $case: 'confluenceOptions';
        confluenceOptions: ConfluenceConnectorOptions;
      }
    | {$case: 'metaAdsOptions'; metaAdsOptions: MetaMarketingOptions}
    | {
        $case: 'zendeskSupportOptions';
        zendeskSupportOptions: ZendeskSupportOptions;
      }
    | {$case: 'kafkaOptions'; kafkaOptions: KafkaOptions}
    | undefined;
}

/** Policy for auto full refresh. */
export interface CreateAutoFullRefreshPolicy {
  /** (Required, Mutable) Whether to enable auto full refresh or not. */
  enabled: boolean;
  /**
   * (Optional, Mutable) Specify the minimum interval in hours between the timestamp
   * at which a table was last full refreshed and the current timestamp for triggering auto full
   * If unspecified and autoFullRefresh is enabled then by default min_interval_hours is 24 hours.
   */
  minIntervalHours?: number | undefined;
}

/** Confluence specific options for ingestion */
export interface CreateConfluenceConnectorOptions {
  /** (Optional) Spaces to filter Confluence data on */
  includeConfluenceSpaces?: string[] | undefined;
}

export interface CreateConnectionParameters {
  /**
   * Source catalog for initial connection.
   * This is necessary for schema exploration in some database systems like Oracle, and optional but nice-to-have
   * in some other database systems like Postgres.
   * For Oracle databases, this maps to a service name.
   */
  sourceCatalog?: string | undefined;
}

/** Wrapper message for source-specific options to support multiple connector types */
export interface CreateConnectorOptions {
  connectorOptions?:
    | {$case: 'googleAdsOptions'; googleAdsOptions: CreateGoogleAdsOptions}
    | {$case: 'tiktokAdsOptions'; tiktokAdsOptions: CreateTikTokAdsOptions}
    | {$case: 'sharepointOptions'; sharepointOptions: CreateSharepointOptions}
    | {$case: 'gdriveOptions'; gdriveOptions: CreateGoogleDriveOptions}
    | {$case: 'outlookOptions'; outlookOptions: CreateOutlookOptions}
    | {$case: 'smartsheetOptions'; smartsheetOptions: CreateSmartsheetOptions}
    | {$case: 'jiraOptions'; jiraOptions: CreateJiraConnectorOptions}
    | {
        $case: 'confluenceOptions';
        confluenceOptions: CreateConfluenceConnectorOptions;
      }
    | {$case: 'metaAdsOptions'; metaAdsOptions: CreateMetaMarketingOptions}
    | {
        $case: 'zendeskSupportOptions';
        zendeskSupportOptions: CreateZendeskSupportOptions;
      }
    | {$case: 'kafkaOptions'; kafkaOptions: CreateKafkaOptions}
    | undefined;
}

export interface CreateCronTrigger {
  quartzCronSchedule?: string | undefined;
  timezoneId?: string | undefined;
}

/** Location of staged data storage */
export interface CreateDataStagingOptions {
  /** (Required, Immutable) The name of the catalog for the connector's staging storage location. */
  catalogName: string;
  /** (Required, Immutable) The name of the schema for the connector's staging storage location. */
  schemaName: string;
  /**
   * (Optional) The Unity Catalog-compatible name for the storage location.
   * This is the volume to use for the data that is extracted by the connector.
   * Spark Declarative Pipelines system will automatically create the volume under the catalog and schema.
   * For Combined Cdc Managed Ingestion pipelines default name for the volume would be :
   * __databricks_ingestion_gateway_staging_data-$pipelineId
   */
  volumeName?: string | undefined;
}

/** Configurable event log parameters. */
export interface CreateEventLogSpec {
  /** The name the event log is published to in UC. */
  name?: string | undefined;
  /** The UC schema the event log is published under. */
  schema?: string | undefined;
  /** The UC catalog the event log is published under. */
  catalog?: string | undefined;
}

export interface CreateFileFilter {
  filter?:
    | {
        $case: 'pathFilter';
        /**
         * Include files with file names matching the pattern
         * Based on https://spark.apache.org/docs/latest/sql-data-sources-generic-options.html#path-glob-filter
         */
        pathFilter: string;
      }
    | {
        $case: 'modifiedBefore';
        /**
         * Include files with modification times occurring before the specified time.
         * Timestamp format: YYYY-MM-DDTHH:mm:ss (e.g. 2020-06-01T13:00:00)
         * Based on https://spark.apache.org/docs/latest/sql-data-sources-generic-options.html#modification-time-path-filters
         */
        modifiedBefore: string;
      }
    | {
        $case: 'modifiedAfter';
        /**
         * Include files with modification times occurring after the specified time.
         * Timestamp format: YYYY-MM-DDTHH:mm:ss (e.g. 2020-06-01T13:00:00)
         * Based on https://spark.apache.org/docs/latest/sql-data-sources-generic-options.html#modification-time-path-filters
         */
        modifiedAfter: string;
      }
    | undefined;
}

export interface CreateFileIngestionOptions {
  /** required for TableSpec */
  format?: FileIngestionOptions_FileFormat | undefined;
  /** Generic options */
  fileFilters?: CreateFileFilter[] | undefined;
  inferColumnTypes?: boolean | undefined;
  schemaEvolutionMode?: FileIngestionOptions_SchemaEvolutionMode | undefined;
  /**
   * Override inferred schema of specific columns
   * Based on https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/schema#override-schema-inference-with-schema-hints
   */
  schemaHints?: string | undefined;
  ignoreCorruptFiles?: boolean | undefined;
  corruptRecordColumn?: string | undefined;
  rescuedDataColumn?: string | undefined;
  singleVariantColumn?: string | undefined;
  /**
   * Column name case sensitivity
   * https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/schema#change-case-sensitive-behavior
   */
  readerCaseSensitive?: boolean | undefined;
  /**
   * Format-specific options
   * Based on https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/options#file-format-options
   */
  formatOptions?: Record<string, string> | undefined;
}

export interface CreateFilters {
  /** Paths to include. */
  include?: string[] | undefined;
  /** Paths to exclude. */
  exclude?: string[] | undefined;
}

export interface CreateGoogleAdsConfig {
  /**
   * (Required) Manager Account ID (also called MCC Account ID) used to list and access
   * customer accounts under this manager account. This is required for fetching the list
   * of customer accounts during source selection.
   * If the same field is also set in the object-level GoogleAdsOptions (connector_options),
   * the object-level value takes precedence over this top-level config.
   */
  managerAccountId?: string | undefined;
}

/**
 * Google Ads specific options for ingestion (object-level).
 * When set, these values override the corresponding fields in GoogleAdsConfig
 * (source_configurations).
 */
export interface CreateGoogleAdsOptions {
  /**
   * (Optional at this level) Manager Account ID (also called MCC Account ID) used to list
   * and access customer accounts under this manager account.
   * Overrides GoogleAdsConfig.manager_account_id from source_configurations when set.
   */
  managerAccountId: string;
  /**
   * (Optional) Number of days to look back for report tables to capture late-arriving data.
   * If not specified, defaults to 30 days.
   */
  lookbackWindowDays?: number | undefined;
  /**
   * (Optional) Start date for the initial sync of report tables in YYYY-MM-DD format.
   * This determines the earliest date from which to sync historical data.
   * If not specified, defaults to 2 years of historical data.
   */
  syncStartDate?: string | undefined;
}

export interface CreateGoogleDriveOptions {
  /** Google Drive URL. */
  url?: string | undefined;
  entityType?: GoogleDriveOptions_GoogleDriveEntityType | undefined;
  fileIngestionOptions?: CreateFileIngestionOptions | undefined;
}

export interface CreateIngestionGatewayPipelineDefinition {
  /** Immutable. The Unity Catalog connection that this gateway pipeline uses to communicate with the source. */
  connectionName: string;
  /** [Deprecated, use connection_name instead] Immutable. The Unity Catalog connection that this gateway pipeline uses to communicate with the source. */
  connectionId?: string | undefined;
  /** Required, Immutable. The name of the catalog for the gateway pipeline's storage location. */
  gatewayStorageCatalog: string;
  /** Required, Immutable. The name of the schema for the gateway pipelines's storage location. */
  gatewayStorageSchema: string;
  /**
   * Optional. The Unity Catalog-compatible name for the gateway storage location.
   * This is the destination to use for the data that is extracted by the gateway.
   * Spark Declarative Pipelines system will automatically create the storage location under the catalog and schema.
   */
  gatewayStorageName?: string | undefined;
  /** Optional, Internal. Parameters required to establish an initial connection with the source. */
  connectionParameters?: CreateConnectionParameters | undefined;
}

export interface CreateIngestionPipelineDefinition {
  /**
   * (Required, Mutable) Identifies the data source for the Lakeflow Connect Ingestion pipeline.
   * Exactly one option must be specified.
   */
  source?:
    | {
        $case: 'connectionName';
        /**
         * The Unity Catalog connection that this ingestion pipeline uses to communicate with the source. This is used with
         * both connectors for applications like Salesforce, Workday, and so on, and also database connectors like Oracle,
         * (connector_type = QUERY_BASED OR connector_type = CDC).
         * If connection name corresponds to database connectors like Oracle, and connector_type is not provided then
         * connector_type defaults to QUERY_BASED. If connector_type is passed as CDC we use Combined Cdc Managed Ingestion
         * pipeline.
         * Under certain conditions, this can be replaced with ingestion_gateway_id to change the connector to Cdc Managed
         * Ingestion Pipeline with Gateway pipeline.
         */
        connectionName: string;
      }
    | {
        $case: 'ingestionGatewayId';
        /**
         * Identifier for the gateway that is used by this ingestion pipeline to communicate with the source database.
         * This is used with CDC connectors to databases like SQL Server using a gateway pipeline (connector_type = CDC).
         * Under certain conditions, this can be replaced with connection_name to change the connector to Combined Cdc
         * Managed Ingestion Pipeline.
         */
        ingestionGatewayId: string;
      }
    | {
        $case: 'ingestFromUcForeignCatalog';
        /**
         * Immutable. If set to true, the pipeline will ingest tables from the
         * UC foreign catalogs directly without the need to specify a UC connection or ingestion gateway.
         * The `source_catalog` fields in objects of IngestionConfig are interpreted as
         * the UC foreign catalogs to ingest from.
         */
        ingestFromUcForeignCatalog: boolean;
      }
    | undefined;
  /** Required. Settings specifying tables to replicate and the destination for the replicated tables. */
  objects?: IngestionPipelineDefinition_CreateIngestionConfig[] | undefined;
  /** Configuration settings to control the ingestion of tables. These settings are applied to all tables in the pipeline. */
  tableConfiguration?:
    | IngestionPipelineDefinition_CreateTableSpecificConfig
    | undefined;
  /**
   * Netsuite only configuration. When the field is set for a netsuite connector,
   * the jar stored in the field will be validated and added to the classpath of
   * pipeline's cluster.
   */
  netsuiteJarPath?: string | undefined;
  /** Top-level source configurations */
  sourceConfigurations?: CreateSourceConfig[] | undefined;
  /** (Optional) A window that specifies a set of time ranges for snapshot queries in CDC. */
  fullRefreshWindow?: CreateOperationTimeWindow | undefined;
  /** (Optional) Connector Type for sources. Ex: CDC, Query Based. */
  connectorType?: ConnectorType | undefined;
  /**
   * (Optional) Location of staged data storage. This is required for migration from Cdc Managed Ingestion Pipeline
   * with Gateway pipeline to Combined Cdc Managed Ingestion Pipeline.
   * If not specified, the volume for staged data will be created in catalog and schema/target specified in the
   * top level pipeline definition.
   */
  dataStagingOptions?: CreateDataStagingOptions | undefined;
}

/** Jira specific options for ingestion */
export interface CreateJiraConnectorOptions {
  /** (Optional) Projects to filter Jira data on */
  includeJiraSpaces?: string[] | undefined;
}

export interface CreateJsonTransformerOptions {
  /** Parse the entire value as a single Variant column. */
  asVariant?: boolean | undefined;
  /** Inline schema string for JSON parsing (Spark DDL format). */
  schema?: string | undefined;
  /** Path to a schema file (.ddl). */
  schemaFilePath?: string | undefined;
  /** (Optional) Schema evolution mode for schema inference. */
  schemaEvolutionMode?: FileIngestionOptions_SchemaEvolutionMode | undefined;
  /** (Optional) Schema hints as a comma-separated string of "column_name type" pairs. */
  schemaHints?: string | undefined;
}

export interface CreateKafkaOptions {
  /**
   * Topics to subscribe to.
   * Only one of topics or topic_pattern must be specified.
   */
  topics?: string[] | undefined;
  /**
   * Java regex pattern to subscribe to matching topics.
   * Only one of topics or topic_pattern must be specified.
   */
  topicPattern?: string | undefined;
  /**
   * (Optional) Transformer for the message key.
   * If not specified, the key is left as raw bytes.
   */
  keyTransformer?: CreateTransformer | undefined;
  /**
   * (Optional) Transformer for the message value.
   * If not specified, the value is left as raw bytes.
   */
  valueTransformer?: CreateTransformer | undefined;
  /**
   * (Optional) Where to begin reading when no checkpoint exists.
   * Valid values: "latest" and "earliest". Defaults to "latest".
   */
  startingOffset?: string | undefined;
  /** Internal option to control the maximum number of offsets to process per trigger. */
  maxOffsetsPerTrigger?: bigint | undefined;
  /**
   * Undocumented backdoor mechanism for overriding parameters
   * to pass to the Kafka client.
   * This is not supported and may break at any time.
   */
  clientConfig?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateManualTrigger {}

/** Meta Marketing (Meta Ads) specific options for ingestion */
export interface CreateMetaMarketingOptions {
  /**
   * (Optional, DEPRECATED — use custom_report_options.level) Granularity of data to pull
   * (account, ad, adset, campaign)
   */
  level?: string | undefined;
  /** (Optional, DEPRECATED — use custom_report_options.breakdowns) Breakdowns to configure */
  breakdowns?: string[] | undefined;
  /** (Optional, DEPRECATED — use custom_report_options.action_breakdowns) Action breakdowns */
  actionBreakdowns?: string[] | undefined;
  /**
   * (Optional, DEPRECATED — use custom_report_options.action_report_time) Timing used to report
   * action statistics (impression, conversion, mixed, or lifetime)
   */
  actionReportTime?: string | undefined;
  /**
   * (Optional) Start date in yyyy-MM-dd format (e.g. 2025-01-15). Data added
   * after this date will be ingested, shared by prebuilt and custom reports.
   */
  startDate?: string | undefined;
  /**
   * (Optional) Window in days to revisit data during sync to capture
   * updated conversion data from the API, shared by prebuilt and custom reports.
   */
  customInsightsLookbackWindow?: number | undefined;
  /**
   * (Optional, DEPRECATED — use custom_report_options.time_increment) Value in string by which to
   * aggregate statistics (can take all_days, monthly or number of days)
   */
  timeIncrement?: string | undefined;
  /**
   * (Optional, DEPRECATED — use custom_report_options.action_attribution_windows) Action attribution
   * windows for insights reporting (e.g. "28d_click", "1d_view")
   */
  actionAttributionWindows?: string[] | undefined;
}

export interface CreateNotebookLibrary {
  /** The absolute path of the source code. */
  path?: string | undefined;
}

export interface CreateNotifications {
  /** A list of email addresses notified when a configured alert is triggered. */
  emailRecipients?: string[] | undefined;
  /**
   * A list of alerts that trigger the sending of notifications to the configured
   * destinations. The supported alerts are:
   *
   * * `on-update-success`: A pipeline update completes successfully.
   * * `on-update-failure`: Each time a pipeline update fails.
   * * `on-update-fatal-failure`: A pipeline update fails with a non-retryable (fatal) error.
   * * `on-flow-failure`: A single data flow fails.
   */
  alerts?: string[] | undefined;
}

/** Proto representing a window */
export interface CreateOperationTimeWindow {
  /** An integer between 0 and 23 denoting the start hour for the window in the 24-hour day. */
  startHour: number;
  /**
   * Days of week in which the window is allowed to happen
   * If not specified all days of the week will be used.
   */
  daysOfWeek?: DayOfWeek[] | undefined;
  /**
   * Time zone id of window. See https://docs.databricks.com/sql/language-manual/sql-ref-syntax-aux-conf-mgmt-set-timezone.html for details.
   * If not specified, UTC will be used.
   */
  timeZoneId?: string | undefined;
}

/** Outlook specific options for ingestion */
export interface CreateOutlookOptions {
  /** Deprecated. Use include_folders instead. */
  folderFilter?: string[] | undefined;
  /** Deprecated. Use include_senders instead. */
  senderFilter?: string[] | undefined;
  /** Deprecated. Use include_subjects instead. */
  subjectFilter?: string[] | undefined;
  /**
   * (Optional) Start date for the initial sync in YYYY-MM-DD format.
   * Format: YYYY-MM-DD (e.g., 2024-01-01)
   * This determines the earliest date from which to sync historical data.
   * If not specified, complete history is ingested.
   */
  startDate?: string | undefined;
  /**
   * (Optional) Defines how the body_content column is populated.
   * TEXT_HTML: Preserves full formatting, links, and styling.
   * TEXT_PLAIN: Converts body to plain text. Recommended for AI/RAG pipelines to reduce token usage and noise.
   */
  bodyFormat?: OutlookBodyFormat | undefined;
  /**
   * (Optional) Controls which attachments to ingest.
   * If not specified, defaults to ALL.
   */
  attachmentMode?: OutlookAttachmentMode | undefined;
  /**
   * (Optional) List of mailboxes to sync (e.g. mailbox email addresses or identifiers).
   * If not specified, all accessible mailboxes are ingested.
   * Filter semantics: OR between different mailboxes.
   */
  includeMailboxes?: string[] | undefined;
  /**
   * (Optional) Filter mail folders to include in the sync.
   * If not specified, all folders will be synced.
   * Examples: Inbox, Sent Items, Custom_Folder
   * Filter semantics: OR between different folders.
   */
  includeFolders?: string[] | undefined;
  /**
   * (Optional) Filter emails by sender address. Uses exact email match.
   * Examples: user@vendor.com, alerts@system.io, noreply@company.com
   * If not specified, emails from all senders will be synced.
   * Filter semantics: OR between different senders.
   */
  includeSenders?: string[] | undefined;
  /**
   * (Optional) Filter emails by subject line. Values ending with "*" use prefix match (subject starts with
   * the part before "*"); otherwise substring match (subject contains the value).
   * Examples: "Invoice" (substring), "Re:*" (prefix), "Support Ticket", "URGENT*"
   * If not specified, emails with all subjects will be synced.
   * Filter semantics: OR between different subjects.
   */
  includeSubjects?: string[] | undefined;
}

export interface CreatePathPattern {
  /** The source code to include for pipelines */
  include?: string | undefined;
}

export interface CreatePipelineCluster {
  /** A label for the cluster specification, either `default` to configure the default cluster, or `maintenance` to configure the maintenance cluster. This field is optional. The default value is `default`. */
  label?: string | undefined;
  /** Note: This field won't be persisted. Only API users will check this field. */
  applyPolicyDefaultValues?: boolean | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * See :method:clusters/create for more details.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: CreatePipelinesAwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: CreatePipelinesAzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: CreatePipelinesGcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   */
  driverNodeTypeId?: string | undefined;
  /**
   * SSH public key contents that will be added to each Spark node in this cluster. The
   * corresponding private keys can be used to login with the user name `ubuntu` on port `2200`.
   * Up to 10 keys can be specified.
   */
  sshPublicKeys?: string[] | undefined;
  /**
   * Additional tags for cluster resources. <Databricks> will tag all cluster resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   *
   * - Clusters can only reuse cloud resources if the resources' tags are a subset of the cluster tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * The configuration for delivering spark logs to a long-term storage destination.
   * Only dbfs destinations are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: CreatePipelinesClusterLogConf | undefined;
  /**
   * An object containing a set of optional, user-specified environment variable key-value pairs.
   * Please note that key-value pair of the form (X,Y) will be exported as is (i.e.,
   * `export X='Y'`) while launching the driver and workers.
   *
   * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we recommend appending
   * them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the example below. This ensures that all
   * default databricks managed environmental variables are included as well.
   *
   * Example Spark environment variables:
   * `{"SPARK_WORKER_MEMORY": "28000m", "SPARK_LOCAL_DIRS": "/local_disk0"}` or
   * `{"SPARK_DAEMON_JAVA_OPTS": "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
   */
  sparkEnvVars?: Record<string, string> | undefined;
  /** The configuration for storing init scripts. Any number of destinations can be specified. The scripts are executed sequentially in the order provided. If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`. */
  initScripts?: CreatePipelinesInitScriptInfo[] | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable local disk encryption for the cluster. */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  size?:
    | {
        $case: 'numWorkers';
        /**
         * Number of worker nodes that this cluster should have. A cluster has one Spark Driver
         * and `num_workers` Executors for a total of `num_workers` + 1 Spark nodes.
         *
         * Note: When reading the properties of a cluster, this field reflects the desired number
         * of workers rather than the actual current number of workers. For instance, if a cluster
         * is resized from 5 to 10 workers, this field will immediately be updated to reflect
         * the target size of 10 workers, whereas the workers listed in `spark_info` will gradually
         * increase from 5 to 10 as the new nodes are provisioned.
         */
        numWorkers: number;
      }
    | {
        $case: 'autoscale';
        /**
         * Parameters needed in order to automatically scale clusters up and down based on load.
         * Note: autoscaling works best with DB runtime versions 3.0 or later.
         */
        autoscale: CreatePipelinesAutoScale;
      }
    | undefined;
}

export interface CreatePipelineDeployment {
  /** The deployment method that manages the pipeline. */
  kind: DeploymentKind;
  /** The path to the file containing metadata about the deployment. */
  metadataFilePath?: string | undefined;
  /**
   * ID of the deployment that manages this pipeline. Only set when `kind` is
   * `BUNDLE`. Used to look up deployment metadata from the Deployment
   * Metadata service.
   */
  deploymentId?: string | undefined;
  /**
   * ID of the version of the deployment that produced this pipeline. Only
   * set when `kind` is `BUNDLE`. Identifies a specific snapshot of the
   * deployment in the Deployment Metadata service.
   */
  versionId?: string | undefined;
}

export interface CreatePipelineLibrary {
  lib?:
    | {
        $case: 'jar';
        /** URI of the jar to be installed. Currently only DBFS is supported. */
        jar: string;
      }
    | {
        $case: 'maven';
        /** Specification of a maven library to be installed. */
        maven: CreatePipelinesMavenLibrary;
      }
    | {
        $case: 'whl';
        /** URI of the whl to be installed. */
        whl: string;
      }
    | {
        $case: 'notebook';
        /** The path to a notebook that defines a pipeline and is stored in the <Databricks> workspace. */
        notebook: CreateNotebookLibrary;
      }
    | {
        $case: 'file';
        /** The path to a file that defines a pipeline and is stored in the Databricks Repos. */
        file: CreateNotebookLibrary;
      }
    | {
        $case: 'glob';
        /**
         * The unified field to include source codes.
         * Each entry can be a notebook path, a file path, or a folder path that ends `/\**`.
         * This field cannot be used together with `notebook` or `file`.
         */
        glob: CreatePathPattern;
      }
    | undefined;
}

export interface CreatePipelineRequest {
  /** If false, deployment will fail if name conflicts with that of another pipeline. */
  allowDuplicateNames?: boolean | undefined;
  dryRun?: boolean | undefined;
  runAs?: CreatePipelinesJobRunAs | undefined;
  /**
   * Key/value map of default parameters to use for pipeline execution.
   * Maximum total size: 10k characters (JSON format)
   */
  parameters?: Record<string, string> | undefined;
  /** Unique identifier for this pipeline. */
  id?: string | undefined;
  /** Friendly identifier for this pipeline. */
  name?: string | undefined;
  /** DBFS root directory for storing checkpoints and tables. */
  storage?: string | undefined;
  /** String-String configuration for this pipeline execution. */
  configuration?: Record<string, string> | undefined;
  /** Cluster settings for this pipeline deployment. */
  clusters?: CreatePipelineCluster[] | undefined;
  /** Libraries or code needed by this deployment. */
  libraries?: CreatePipelineLibrary[] | undefined;
  /** The configuration for a managed ingestion pipeline. These settings cannot be used with the 'libraries', 'schema', 'target', or 'catalog' settings. */
  ingestionDefinition?: CreateIngestionPipelineDefinition | undefined;
  /** The definition of a gateway pipeline to support change data capture. */
  gatewayDefinition?: CreateIngestionGatewayPipelineDefinition | undefined;
  /** Which pipeline trigger to use. Deprecated: Use `continuous` instead. */
  trigger?: CreatePipelineTrigger | undefined;
  /** Target schema (database) to add tables in this pipeline to. Exactly one of `schema` or `target` must be specified. To publish to Unity Catalog, also specify `catalog`. This legacy field is deprecated for pipeline creation in favor of the `schema` field. */
  target?: string | undefined;
  /** The default schema (database) where tables are read from or published to. */
  schema?: string | undefined;
  /** Filters on which Pipeline packages to include in the deployed graph. */
  filters?: CreateFilters | undefined;
  /** Whether the pipeline is continuous or triggered. This replaces `trigger`. */
  continuous?: boolean | undefined;
  /** Whether the pipeline is in Development mode. Defaults to false. */
  development?: boolean | undefined;
  /** Whether Photon is enabled for this pipeline. */
  photon?: boolean | undefined;
  /** Pipeline product edition. */
  edition?: string | undefined;
  /** SDP Release Channel that specifies which version to use. */
  channel?: string | undefined;
  /** A catalog in Unity Catalog to publish data from this pipeline to. If `target` is specified, tables in this pipeline are published to a `target` schema inside `catalog` (for example, `catalog`.`target`.`table`). If `target` is not specified, no data is published to Unity Catalog. */
  catalog?: string | undefined;
  /** List of notification settings for this pipeline. */
  notifications?: CreateNotifications[] | undefined;
  /** Whether serverless compute is enabled for this pipeline. */
  serverless?: boolean | undefined;
  /** Deployment type of this pipeline. */
  deployment?: CreatePipelineDeployment | undefined;
  /** Restart window of this pipeline. */
  restartWindow?: CreateRestartWindow | undefined;
  /** Budget policy of this pipeline. */
  budgetPolicyId?: string | undefined;
  /**
   * A map of tags associated with the pipeline.
   * These are forwarded to the cluster as cluster tags, and are therefore subject to the same limitations.
   * A maximum of 25 tags can be added to the pipeline.
   */
  tags?: Record<string, string> | undefined;
  /** Event log configuration for this pipeline */
  eventLog?: CreateEventLogSpec | undefined;
  /**
   * Root path for this pipeline.
   * This is used as the root directory when editing the pipeline in the <Databricks> user interface and it is
   * added to sys.path when executing Python sources during pipeline execution.
   */
  rootPath?: string | undefined;
  /** Environment specification for this pipeline used to install dependencies. */
  environment?: CreatePipelinesEnvironment | undefined;
  /** Usage policy of this pipeline. */
  usagePolicyId?: string | undefined;
  /** Serverless compute ID specified by the user for serverless pipelines. */
  serverlessComputeId?: string | undefined;
}

export interface CreatePipelineResponse {
  /** The unique identifier for the newly created pipeline. Only returned when dry_run is false. */
  pipelineId?: string | undefined;
  /** Only returned when dry_run is true. */
  effectiveSettings?: PipelineSpec | undefined;
}

export interface CreatePipelineTrigger {
  trigger?:
    | {$case: 'manual'; manual: CreateManualTrigger}
    | {$case: 'cron'; cron: CreateCronTrigger}
    | undefined;
}

export interface CreatePipelinesAutoScale {
  /**
   * The minimum number of workers the cluster can scale down to when underutilized.
   * It is also the initial number of workers the cluster will have after creation.
   */
  minWorkers: number;
  /** The maximum number of workers to which the cluster can scale up when overloaded. `max_workers` must be strictly greater than `min_workers`. */
  maxWorkers: number;
  /**
   * Databricks Enhanced Autoscaling optimizes cluster utilization by automatically
   * allocating cluster resources based on workload volume, with minimal impact to
   * the data processing latency of your pipelines. Enhanced Autoscaling is available
   * for `updates` clusters only. The legacy autoscaling feature is used for `maintenance`
   * clusters.
   */
  mode?: string | undefined;
}

/** Attributes set during cluster creation which are related to Amazon Web Services. */
export interface CreatePipelinesAwsAttributes {
  /**
   * The first ``first_on_demand`` nodes of the cluster will be placed on on-demand instances.
   * If this value is greater than 0, the cluster driver node in particular will be placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, ``first_on_demand`` nodes will be placed on on-demand instances and the remainder will
   * be placed on ``availability`` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * Availability type used for all subsequent nodes past the ``first_on_demand`` ones.
   * Note: If ``first_on_demand`` is zero, this availability type will be used for the entire cluster.
   */
  availability?: PipelinesAwsAvailability | undefined;
  /**
   * Identifier for the availability zone/datacenter in which the cluster resides.
   * This string will be of a form like "us-west-2a". The provided availability
   * zone must be in the same region as the <Databricks> deployment. For example, "us-west-2a"
   * is not a valid zone id if the <Databricks> deployment resides in the "us-east-1" region.
   * This is an optional field at cluster creation, and if not specified, a default zone will be used.
   * If the zone specified is "auto", will try to place cluster in a zone with high availability,
   * and will retry placement in a different AZ if there is not enough capacity.
   * See [[AutoAZHelper.scala]] for more details.
   * The list of available zones as well as the default value can be found by using the
   * `List Zones`_ method.
   */
  zoneId?: string | undefined;
  /**
   * Nodes for this cluster will only be placed on AWS instances with this instance profile. If
   * omitted, nodes will be placed on instances without an IAM instance profile. The instance
   * profile must have previously been added to the <Databricks> environment by an account
   * administrator.
   *
   * This feature may only be available to certain customer plans.
   *
   * ***internal
   * If this field is ommitted, we will pull in the default from the conf if it exists.
   */
  instanceProfileArn?: string | undefined;
  /**
   * The bid price for AWS spot instances, as a percentage of the corresponding instance type's
   * on-demand price.
   * For example, if this field is set to 50, and the cluster needs a new ``r3.xlarge`` spot
   * instance, then the bid price is half of the price of
   * on-demand ``r3.xlarge`` instances. Similarly, if this field is set to 200, the bid price is twice
   * the price of on-demand ``r3.xlarge`` instances. If not specified, the default value is 100.
   * When spot instances are requested for this cluster, only spot instances whose bid price
   * percentage matches this field will be considered.
   * Note that, for safety, we enforce this field to be no more than 10000.
   *
   * ***internal
   * The default value and documentation here should be kept consistent with
   * CommonConf.defaultSpotBidPricePercent and CommonConf.maxSpotBidPricePercent.
   */
  spotBidPricePercent?: number | undefined;
  /** The type of EBS volumes that will be launched with this cluster. */
  ebsVolumeType?: PipelinesEbsVolumeType | undefined;
  /**
   * The number of volumes launched for each instance. Users can choose up to 10 volumes.
   * This feature is only enabled for supported node types. Legacy node types cannot specify
   * custom EBS volumes.
   * For node types with no instance store, at least one EBS volume needs to be specified;
   * otherwise, cluster creation will fail.
   *
   * These EBS volumes will be mounted at ``/ebs0``, ``/ebs1``, and etc.
   * Instance store volumes will be mounted at ``/local_disk0``, ``/local_disk1``, and etc.
   *
   * If EBS volumes are attached, <Databricks> will configure Spark to use only the EBS volumes for
   * scratch storage because heterogeneously sized scratch devices can lead to inefficient disk
   * utilization. If no EBS volumes are attached, <Databricks> will configure Spark to use instance
   * store volumes.
   *
   * Please note that if EBS volumes are specified, then the Spark configuration ``spark.local.dir``
   * will be overridden.
   */
  ebsVolumeCount?: number | undefined;
  /**
   * The size of each EBS volume (in GiB) launched for each instance. For general purpose
   * SSD, this value must be within the range 100 - 4096. For throughput optimized HDD,
   * this value must be within the range 500 - 4096.
   */
  ebsVolumeSize?: number | undefined;
  ebsVolumeIops?: number | undefined;
  ebsVolumeThroughput?: number | undefined;
}

/** Attributes set during cluster creation which are related to Azure. */
export interface CreatePipelinesAzureAttributes {
  /**
   * The first ``first_on_demand`` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, ``first_on_demand`` nodes will be placed on on-demand instances and the remainder will
   * be placed on ``availability`` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * Availability type used for all subsequent nodes past the ``first_on_demand`` ones.
   * Note: If ``first_on_demand`` is zero (which only happens on pool clusters), this availability
   * type will be used for the entire cluster.
   */
  availability?: PipelinesAzureAvailability | undefined;
  /**
   * The max bid price to be used for Azure spot instances.
   * The Max price for the bid cannot be higher than the on-demand price of the instance.
   * If not specified, the default value is -1, which specifies that the instance cannot be evicted
   * on the basis of price, and only on the basis of availability. Further, the value should > 0 or -1.
   */
  spotBidMaxPrice?: number | undefined;
}

/** Cluster log delivery config */
export interface CreatePipelinesClusterLogConf {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * ``{ "dbfs" : { "destination" : "dbfs:/home/cluster_log" } }``
         */
        dbfs: CreatePipelinesDbfsStorageInfo;
      }
    | undefined;
}

/** A storage location in DBFS */
export interface CreatePipelinesDbfsStorageInfo {
  /** dbfs destination, e.g. ``dbfs:/my/path`` */
  destination?: string | undefined;
}

/**
 * The environment entity used to preserve serverless environment side panel, jobs' environment for non-notebook task, and SDP's environment for classic and serverless pipelines.
 * In this minimal environment spec, only pip dependencies are supported.
 */
export interface CreatePipelinesEnvironment {
  /**
   * List of pip dependencies, as supported by the version of pip in this environment.
   * Each dependency is a pip requirement file line https://pip.pypa.io/en/stable/reference/requirements-file-format/
   * Allowed dependency could be <requirement specifier>, <archive url/path>, <local project path>(WSFS or Volumes in <Databricks>), <vcs project url>
   */
  dependencies?: string[] | undefined;
  /**
   * The environment version of the serverless Python environment used to execute
   * customer Python code. Each environment version includes a specific Python
   * version and a curated set of pre-installed libraries with defined versions,
   * providing a stable and reproducible execution environment.
   *
   * <Databricks> supports a three-year lifecycle for each environment version.
   * For available versions and their included packages, see
   * https://docs.databricks.com/aws/en/release-notes/serverless/environment-version/
   *
   * The value should be a string representing the environment version number, for example: `"4"`.
   */
  environmentVersion?: string | undefined;
}

/** Attributes set during cluster creation which are related to Gcp. */
export interface CreatePipelinesGcpAttributes {
  /**
   * If provided, the cluster will impersonate the google service account when accessing
   * gcloud services (like GCS). The google service account
   * must have previously been added to the <Databricks> environment by an account
   * administrator.
   */
  googleServiceAccount?: string | undefined;
  /** boot disk size in GB */
  bootDiskSize?: number | undefined;
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if the former is unavailable.
   */
  availability?: PipelinesGcpAvailability | undefined;
  /**
   * Identifier for the availability zone in which the cluster resides.
   * This can be one of the following:
   * - "HA" => High availability, spread nodes across availability zones for a
   * <Databricks> deployment region [default].
   * - "AUTO" => <Databricks> picks an availability zone to schedule the cluster on.
   * - A GCP availability zone => Pick One of the available zones for (machine type + region) from
   * https://cloud.google.com/compute/docs/regions-zones.
   */
  zoneId?: string | undefined;
  /**
   * The number of local SSDs to attach to each worker and driver for this cluster. If left unspecified,
   * the default number of local SSDs for the node type will be used.
   *
   * NOTE: Each instance type can only support a certain number of attached local SSDs. The value
   * specified in local_ssd_count must be valid for BOTH the driver and worker instance type. See
   * GCP docs here:
   * https://cloud.google.com/compute/docs/disks#local_ssd_machine_type_restrictions
   *
   * Validation is performed at the RPC layer and the RPC will be rejected if the specified
   * local_ssd_count is invalid.
   */
  localSsdCount?: number | undefined;
}

/** Config for an individual init script */
export interface CreatePipelinesInitScriptInfo {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * ``{ "dbfs" : { "destination" : "dbfs:/init-scripts/my_script.sh" } }``
         */
        dbfs: CreatePipelinesDbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either region or endpoint should also be provided. e.g.
         * ``{ "s3": { "destination" : "s3://init-scripts/my_script.sh", "region" : "us-west-2" } }``
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * ``instance_profile_arn`` has permission to write data to the s3 destination.
         */
        s3: CreatePipelinesS3StorageInfo;
      }
    | undefined;
}

/**
 * Write-only setting, available only in Create/Update calls. Specifies the user or service principal that the pipeline runs as. If not specified, the pipeline runs as the user who created the pipeline.
 *
 * Only `user_name` or `service_principal_name` can be specified. If both are specified, an error is thrown.
 */
export interface CreatePipelinesJobRunAs {
  identity?:
    | {
        $case: 'userName';
        /** The email of an active workspace user. Users can only set this field to their own email. */
        userName: string;
      }
    | {
        $case: 'servicePrincipalName';
        /** Application ID of an active service principal. Setting this field requires the `servicePrincipal/user` role. */
        servicePrincipalName: string;
      }
    | undefined;
}

export interface CreatePipelinesMavenLibrary {
  /** Gradle-style maven coordinates. For example: "org.jsoup:jsoup:1.7.2". */
  coordinates: string;
  /**
   * Maven repo to install the Maven package from. If omitted, both Maven Central Repository
   * and Spark Packages are searched.
   */
  repo?: string | undefined;
  /**
   * List of dependencies to exclude. For example: `["slf4j:slf4j", "*:hadoop-client"]`.
   *
   * Maven dependency exclusions:
   * https://maven.apache.org/guides/introduction/introduction-to-optional-and-excludes-dependencies.html.
   */
  exclusions?: string[] | undefined;
}

/** A storage location in Amazon S3 */
export interface CreatePipelinesS3StorageInfo {
  /**
   * S3 destination, e.g. ``s3://my-bucket/some-prefix`` Note that logs will be delivered using
   * cluster iam role, please make sure you set cluster iam role and the role has write access to the
   * destination. Please also note that you cannot use AWS keys to deliver logs.
   */
  destination?: string | undefined;
  /**
   * S3 region, e.g. ``us-west-2``. Either region or endpoint needs to be set. If both are set,
   * endpoint will be used.
   */
  region?: string | undefined;
  /**
   * S3 endpoint, e.g. ``https://s3-us-west-2.amazonaws.com``. Either region or endpoint needs to be set.
   * If both are set, endpoint will be used.
   */
  endpoint?: string | undefined;
  /** Flag to enable server side encryption, ``false`` by default. */
  enableEncryption?: boolean | undefined;
  /**
   * The encryption type, it could be ``sse-s3`` or ``sse-kms``. It will be used only when
   * encryption is enabled and the default type is ``sse-s3``.
   */
  encryptionType?: string | undefined;
  /** Kms key which will be used if encryption is enabled and encryption type is set to ``sse-kms``. */
  kmsKey?: string | undefined;
  /**
   * Set canned access control list for the logs, e.g. ``bucket-owner-full-control``.
   * If ``canned_cal`` is set, please make sure the cluster iam role has ``s3:PutObjectAcl`` permission on
   * the destination bucket and prefix. The full list of possible canned acl can be found at
   * http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl.
   * Please also note that by default only the object owner gets full controls. If you are using cross account
   * role for writing data, you may want to set ``bucket-owner-full-control`` to make bucket owner able to
   * read the logs.
   */
  cannedAcl?: string | undefined;
}

/** PG-specific catalog-level configuration parameters */
export interface CreatePostgresCatalogConfig {
  /** Optional. The Postgres slot configuration to use for logical replication */
  slotConfig?: CreatePostgresSlotConfig | undefined;
}

/** PostgresSlotConfig contains the configuration for a Postgres logical replication slot */
export interface CreatePostgresSlotConfig {
  /** The name of the logical replication slot to use for the Postgres source */
  slotName?: string | undefined;
  /** The name of the publication to use for the Postgres source */
  publicationName?: string | undefined;
}

export interface CreateRestartWindow {
  /**
   * An integer between 0 and 23 denoting the start hour for the restart window in the 24-hour day.
   * Continuous pipeline restart is triggered only within a five-hour window starting at this hour.
   */
  startHour: number;
  /**
   * Days of week in which the restart is allowed to happen (within a five-hour window starting at start_hour).
   * If not specified all days of the week will be used.
   */
  daysOfWeek?: DayOfWeek[] | undefined;
  /**
   * Time zone id of restart window. See https://docs.databricks.com/sql/language-manual/sql-ref-syntax-aux-conf-mgmt-set-timezone.html for details.
   * If not specified, UTC will be used.
   */
  timeZoneId?: string | undefined;
}

export interface CreateSharepointOptions {
  /** Required. The SharePoint URL. */
  url?: string | undefined;
  /**
   * (Optional) The type of SharePoint entity to ingest.
   * If not specified, defaults to FILE.
   */
  entityType?: SharepointOptions_SharepointEntityType | undefined;
  /** (Optional) File ingestion options for processing files. */
  fileIngestionOptions?: CreateFileIngestionOptions | undefined;
}

/** Smartsheet specific options for ingestion */
export interface CreateSmartsheetOptions {
  /**
   * (Optional) When true, maps each column to its Smartsheet-declared type (Text/Number/Date/
   * Checkbox/etc.). Cells that do not conform to the declared type are set to NULL.
   * When false, all columns land as STRING. Use false for sheets with irregular data or columns
   * that frequently violate their own declared type.
   * If not specified, defaults to true.
   */
  enforceSchema?: boolean | undefined;
}

/** SourceCatalogConfig contains catalog-level custom configuration parameters for each source */
export interface CreateSourceCatalogConfig {
  /** Source catalog name */
  sourceCatalog?: string | undefined;
  /** Configuration options for the source catalog */
  options?:
    | {
        $case: 'postgres';
        /** Postgres-specific catalog-level configuration parameters */
        postgres: CreatePostgresCatalogConfig;
      }
    | undefined;
}

export interface CreateSourceConfig {
  /** Catalog-level source configuration parameters */
  catalog?: CreateSourceCatalogConfig | undefined;
  /**
   * Connector-specific top-level configuration. Values here act as defaults and
   * can be overridden by the same field in the object-level connector_options.
   */
  connectorConfig?:
    | {$case: 'googleAdsConfig'; googleAdsConfig: CreateGoogleAdsConfig}
    | undefined;
}

/** TikTok Ads specific options for ingestion */
export interface CreateTikTokAdsOptions {
  /**
   * (Optional) Number of days to look back for report tables during incremental sync
   * to capture late-arriving conversions and attribution data.
   */
  lookbackWindowDays?: number | undefined;
  /**
   * (Optional) Start date for the initial sync of report tables in YYYY-MM-DD format.
   * This determines the earliest date from which to sync historical data.
   */
  syncStartDate?: string | undefined;
  /** Deprecated. Use custom_report_options.dimensions instead. */
  dimensions?: string[] | undefined;
  /** Deprecated. Use custom_report_options.metrics instead. */
  metrics?: string[] | undefined;
  /** Deprecated. Use custom_report_options.report_type instead. */
  reportType?: TikTokAdsOptions_TikTokReportType | undefined;
  /** Deprecated. Use custom_report_options.data_level instead. */
  dataLevel?: TikTokAdsOptions_TikTokDataLevel | undefined;
  /** Deprecated. Use custom_report_options.query_lifetime instead. */
  queryLifetime?: boolean | undefined;
}

/** Specifies how to transform binary data into structured data. */
export interface CreateTransformer {
  /** Required: the wire format of the data. */
  format?: Transformer_Format | undefined;
  /**
   * Format-specific configuration. Only required for JSON, Avro, and Protobuf.
   * STRING format requires no additional config.
   */
  config?:
    | {$case: 'jsonOptions'; jsonOptions: CreateJsonTransformerOptions}
    | undefined;
}

/** Zendesk Support specific options for ingestion */
export interface CreateZendeskSupportOptions {
  /**
   * (Optional) Start date in YYYY-MM-DD format for the initial sync.
   * This determines the earliest date from which to sync historical data.
   */
  startDate?: string | undefined;
}

export interface CronTrigger {
  quartzCronSchedule?: string | undefined;
  timezoneId?: string | undefined;
}

export interface DataPlaneId {
  /** The instance name of the data plane emitting an event. */
  instance?: string | undefined;
  /** A sequence number, unique and increasing within the data plane instance. */
  seqNo?: bigint | undefined;
}

/** Location of staged data storage */
export interface DataStagingOptions {
  /** (Required, Immutable) The name of the catalog for the connector's staging storage location. */
  catalogName?: string | undefined;
  /** (Required, Immutable) The name of the schema for the connector's staging storage location. */
  schemaName?: string | undefined;
  /**
   * (Optional) The Unity Catalog-compatible name for the storage location.
   * This is the volume to use for the data that is extracted by the connector.
   * Spark Declarative Pipelines system will automatically create the volume under the catalog and schema.
   * For Combined Cdc Managed Ingestion pipelines default name for the volume would be :
   * __databricks_ingestion_gateway_staging_data-$pipelineId
   */
  volumeName?: string | undefined;
}

export interface DeletePipelineRequest {
  pipelineId?: string | undefined;
  /**
   * If true, deletion will proceed even if resource cleanup fails.
   * By default, deletion will fail if resources cleanup is required but fails.
   */
  force?: boolean | undefined;
  /**
   * If false, pipeline deletion will not cascade to its datasets (MVs, STs, Views).
   * By default, this parameter will be true and all tables will be deleted with the pipeline.
   */
  cascade?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeletePipelineResponse {}

export interface EditPipelineRequest {
  /** Unique identifier for this pipeline. */
  pipelineId?: string | undefined;
  /** If false, deployment will fail if name has changed and conflicts the name of another pipeline. */
  allowDuplicateNames?: boolean | undefined;
  /**
   * If present, the last-modified time of the pipeline settings before the edit.
   * If the settings were modified after that time, then the request will fail with
   * a conflict.
   */
  expectedLastModified?: bigint | undefined;
  runAs?: CreatePipelinesJobRunAs | undefined;
  /**
   * Key/value map of default parameters to use for pipeline execution.
   * Maximum total size: 10k characters (JSON format)
   */
  parameters?: Record<string, string> | undefined;
  /** Unique identifier for this pipeline. */
  id?: string | undefined;
  /** Friendly identifier for this pipeline. */
  name?: string | undefined;
  /** DBFS root directory for storing checkpoints and tables. */
  storage?: string | undefined;
  /** String-String configuration for this pipeline execution. */
  configuration?: Record<string, string> | undefined;
  /** Cluster settings for this pipeline deployment. */
  clusters?: CreatePipelineCluster[] | undefined;
  /** Libraries or code needed by this deployment. */
  libraries?: CreatePipelineLibrary[] | undefined;
  /** The configuration for a managed ingestion pipeline. These settings cannot be used with the 'libraries', 'schema', 'target', or 'catalog' settings. */
  ingestionDefinition?: CreateIngestionPipelineDefinition | undefined;
  /** The definition of a gateway pipeline to support change data capture. */
  gatewayDefinition?: CreateIngestionGatewayPipelineDefinition | undefined;
  /** Which pipeline trigger to use. Deprecated: Use `continuous` instead. */
  trigger?: CreatePipelineTrigger | undefined;
  /** Target schema (database) to add tables in this pipeline to. Exactly one of `schema` or `target` must be specified. To publish to Unity Catalog, also specify `catalog`. This legacy field is deprecated for pipeline creation in favor of the `schema` field. */
  target?: string | undefined;
  /** The default schema (database) where tables are read from or published to. */
  schema?: string | undefined;
  /** Filters on which Pipeline packages to include in the deployed graph. */
  filters?: CreateFilters | undefined;
  /** Whether the pipeline is continuous or triggered. This replaces `trigger`. */
  continuous?: boolean | undefined;
  /** Whether the pipeline is in Development mode. Defaults to false. */
  development?: boolean | undefined;
  /** Whether Photon is enabled for this pipeline. */
  photon?: boolean | undefined;
  /** Pipeline product edition. */
  edition?: string | undefined;
  /** SDP Release Channel that specifies which version to use. */
  channel?: string | undefined;
  /** A catalog in Unity Catalog to publish data from this pipeline to. If `target` is specified, tables in this pipeline are published to a `target` schema inside `catalog` (for example, `catalog`.`target`.`table`). If `target` is not specified, no data is published to Unity Catalog. */
  catalog?: string | undefined;
  /** List of notification settings for this pipeline. */
  notifications?: CreateNotifications[] | undefined;
  /** Whether serverless compute is enabled for this pipeline. */
  serverless?: boolean | undefined;
  /** Deployment type of this pipeline. */
  deployment?: CreatePipelineDeployment | undefined;
  /** Restart window of this pipeline. */
  restartWindow?: CreateRestartWindow | undefined;
  /** Budget policy of this pipeline. */
  budgetPolicyId?: string | undefined;
  /**
   * A map of tags associated with the pipeline.
   * These are forwarded to the cluster as cluster tags, and are therefore subject to the same limitations.
   * A maximum of 25 tags can be added to the pipeline.
   */
  tags?: Record<string, string> | undefined;
  /** Event log configuration for this pipeline */
  eventLog?: CreateEventLogSpec | undefined;
  /**
   * Root path for this pipeline.
   * This is used as the root directory when editing the pipeline in the <Databricks> user interface and it is
   * added to sys.path when executing Python sources during pipeline execution.
   */
  rootPath?: string | undefined;
  /** Environment specification for this pipeline used to install dependencies. */
  environment?: CreatePipelinesEnvironment | undefined;
  /** Usage policy of this pipeline. */
  usagePolicyId?: string | undefined;
  /** Serverless compute ID specified by the user for serverless pipelines. */
  serverlessComputeId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EditPipelineResponse {}

export interface ErrorDetail {
  /** The exception thrown for this error, with its chain of cause. */
  exceptions?: SerializedException[] | undefined;
  /** Whether this error is considered fatal, that is, unrecoverable. */
  fatal?: boolean | undefined;
}

/** Configurable event log parameters. */
export interface EventLogSpec {
  /** The name the event log is published to in UC. */
  name?: string | undefined;
  /** The UC schema the event log is published under. */
  schema?: string | undefined;
  /** The UC catalog the event log is published under. */
  catalog?: string | undefined;
}

export interface FileFilter {
  filter?:
    | {
        $case: 'pathFilter';
        /**
         * Include files with file names matching the pattern
         * Based on https://spark.apache.org/docs/latest/sql-data-sources-generic-options.html#path-glob-filter
         */
        pathFilter: string;
      }
    | {
        $case: 'modifiedBefore';
        /**
         * Include files with modification times occurring before the specified time.
         * Timestamp format: YYYY-MM-DDTHH:mm:ss (e.g. 2020-06-01T13:00:00)
         * Based on https://spark.apache.org/docs/latest/sql-data-sources-generic-options.html#modification-time-path-filters
         */
        modifiedBefore: string;
      }
    | {
        $case: 'modifiedAfter';
        /**
         * Include files with modification times occurring after the specified time.
         * Timestamp format: YYYY-MM-DDTHH:mm:ss (e.g. 2020-06-01T13:00:00)
         * Based on https://spark.apache.org/docs/latest/sql-data-sources-generic-options.html#modification-time-path-filters
         */
        modifiedAfter: string;
      }
    | undefined;
}

export interface FileIngestionOptions {
  /** required for TableSpec */
  format?: FileIngestionOptions_FileFormat | undefined;
  /** Generic options */
  fileFilters?: FileFilter[] | undefined;
  inferColumnTypes?: boolean | undefined;
  schemaEvolutionMode?: FileIngestionOptions_SchemaEvolutionMode | undefined;
  /**
   * Override inferred schema of specific columns
   * Based on https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/schema#override-schema-inference-with-schema-hints
   */
  schemaHints?: string | undefined;
  ignoreCorruptFiles?: boolean | undefined;
  corruptRecordColumn?: string | undefined;
  rescuedDataColumn?: string | undefined;
  singleVariantColumn?: string | undefined;
  /**
   * Column name case sensitivity
   * https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/schema#change-case-sensitive-behavior
   */
  readerCaseSensitive?: boolean | undefined;
  /**
   * Format-specific options
   * Based on https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/options#file-format-options
   */
  formatOptions?: Record<string, string> | undefined;
}

export interface Filters {
  /** Paths to include. */
  include?: string[] | undefined;
  /** Paths to exclude. */
  exclude?: string[] | undefined;
}

export interface GetPipelineRequest {
  pipelineId?: string | undefined;
}

export interface GetPipelineResponse {
  /** The ID of the pipeline. */
  pipelineId?: string | undefined;
  /** The pipeline specification. This field is not returned when called by `ListPipelines`. */
  spec?: PipelineSpec | undefined;
  /** The pipeline state. */
  state?: PipelineState_PipelineState | undefined;
  /** An optional message detailing the cause of the pipeline state. */
  cause?: string | undefined;
  /** The ID of the cluster that the pipeline is running on. */
  clusterId?: string | undefined;
  /** A human friendly identifier for the pipeline, taken from the `spec`. */
  name?: string | undefined;
  /** The health of a pipeline. */
  health?: PipelineHealthStatus | undefined;
  /** The username of the pipeline creator. */
  creatorUserName?: string | undefined;
  /** Status of the latest updates for the pipeline. Ordered with the newest update first. */
  latestUpdates?: UpdateStateInfo[] | undefined;
  /** The last time the pipeline settings were modified or created. */
  lastModified?: bigint | undefined;
  /** Username of the user that the pipeline will run on behalf of. */
  runAsUserName?: string | undefined;
  /** Serverless budget policy ID of this pipeline. */
  effectiveBudgetPolicyId?: string | undefined;
  /** Publishing mode of the pipeline */
  effectivePublishingMode?: PublishingMode | undefined;
  /**
   * The user or service principal that the pipeline runs as, if specified in the request.
   * This field indicates the explicit configuration of `run_as` for the pipeline.
   * To find the value in all cases, explicit or implicit, use `run_as_user_name`.
   */
  runAs?: PipelinesJobRunAs | undefined;
  /**
   * Key/value map of default parameters to use for pipeline execution.
   * Maximum total size: 10k characters (JSON format)
   */
  parameters?: Record<string, string> | undefined;
}

export interface GetUpdateRequest {
  /** The ID of the pipeline. */
  pipelineId?: string | undefined;
  /** The ID of the update. */
  updateId?: string | undefined;
}

export interface GetUpdateResponse {
  /** The current update info. */
  update?: UpdateInfo | undefined;
}

export interface GoogleAdsConfig {
  /**
   * (Required) Manager Account ID (also called MCC Account ID) used to list and access
   * customer accounts under this manager account. This is required for fetching the list
   * of customer accounts during source selection.
   * If the same field is also set in the object-level GoogleAdsOptions (connector_options),
   * the object-level value takes precedence over this top-level config.
   */
  managerAccountId?: string | undefined;
}

/**
 * Google Ads specific options for ingestion (object-level).
 * When set, these values override the corresponding fields in GoogleAdsConfig
 * (source_configurations).
 */
export interface GoogleAdsOptions {
  /**
   * (Optional at this level) Manager Account ID (also called MCC Account ID) used to list
   * and access customer accounts under this manager account.
   * Overrides GoogleAdsConfig.manager_account_id from source_configurations when set.
   */
  managerAccountId?: string | undefined;
  /**
   * (Optional) Number of days to look back for report tables to capture late-arriving data.
   * If not specified, defaults to 30 days.
   */
  lookbackWindowDays?: number | undefined;
  /**
   * (Optional) Start date for the initial sync of report tables in YYYY-MM-DD format.
   * This determines the earliest date from which to sync historical data.
   * If not specified, defaults to 2 years of historical data.
   */
  syncStartDate?: string | undefined;
}

export interface GoogleDriveOptions {
  /** Google Drive URL. */
  url?: string | undefined;
  entityType?: GoogleDriveOptions_GoogleDriveEntityType | undefined;
  fileIngestionOptions?: FileIngestionOptions | undefined;
}

export interface IngestionGatewayPipelineDefinition {
  /** Immutable. The Unity Catalog connection that this gateway pipeline uses to communicate with the source. */
  connectionName?: string | undefined;
  /** [Deprecated, use connection_name instead] Immutable. The Unity Catalog connection that this gateway pipeline uses to communicate with the source. */
  connectionId?: string | undefined;
  /** Required, Immutable. The name of the catalog for the gateway pipeline's storage location. */
  gatewayStorageCatalog?: string | undefined;
  /** Required, Immutable. The name of the schema for the gateway pipelines's storage location. */
  gatewayStorageSchema?: string | undefined;
  /**
   * Optional. The Unity Catalog-compatible name for the gateway storage location.
   * This is the destination to use for the data that is extracted by the gateway.
   * Spark Declarative Pipelines system will automatically create the storage location under the catalog and schema.
   */
  gatewayStorageName?: string | undefined;
  /** Optional, Internal. Parameters required to establish an initial connection with the source. */
  connectionParameters?: ConnectionParameters | undefined;
}

export interface IngestionPipelineDefinition {
  /**
   * (Required, Mutable) Identifies the data source for the Lakeflow Connect Ingestion pipeline.
   * Exactly one option must be specified.
   */
  source?:
    | {
        $case: 'connectionName';
        /**
         * The Unity Catalog connection that this ingestion pipeline uses to communicate with the source. This is used with
         * both connectors for applications like Salesforce, Workday, and so on, and also database connectors like Oracle,
         * (connector_type = QUERY_BASED OR connector_type = CDC).
         * If connection name corresponds to database connectors like Oracle, and connector_type is not provided then
         * connector_type defaults to QUERY_BASED. If connector_type is passed as CDC we use Combined Cdc Managed Ingestion
         * pipeline.
         * Under certain conditions, this can be replaced with ingestion_gateway_id to change the connector to Cdc Managed
         * Ingestion Pipeline with Gateway pipeline.
         */
        connectionName: string;
      }
    | {
        $case: 'ingestionGatewayId';
        /**
         * Identifier for the gateway that is used by this ingestion pipeline to communicate with the source database.
         * This is used with CDC connectors to databases like SQL Server using a gateway pipeline (connector_type = CDC).
         * Under certain conditions, this can be replaced with connection_name to change the connector to Combined Cdc
         * Managed Ingestion Pipeline.
         */
        ingestionGatewayId: string;
      }
    | {
        $case: 'ingestFromUcForeignCatalog';
        /**
         * Immutable. If set to true, the pipeline will ingest tables from the
         * UC foreign catalogs directly without the need to specify a UC connection or ingestion gateway.
         * The `source_catalog` fields in objects of IngestionConfig are interpreted as
         * the UC foreign catalogs to ingest from.
         */
        ingestFromUcForeignCatalog: boolean;
      }
    | undefined;
  /** Required. Settings specifying tables to replicate and the destination for the replicated tables. */
  objects?: IngestionPipelineDefinition_IngestionConfig[] | undefined;
  /**
   * The type of the foreign source.
   * The source type will be inferred from the source connection or ingestion gateway.
   * This field is output only and will be ignored if provided.
   */
  sourceType?: IngestionSourceType | undefined;
  /** Configuration settings to control the ingestion of tables. These settings are applied to all tables in the pipeline. */
  tableConfiguration?:
    | IngestionPipelineDefinition_TableSpecificConfig
    | undefined;
  /**
   * Netsuite only configuration. When the field is set for a netsuite connector,
   * the jar stored in the field will be validated and added to the classpath of
   * pipeline's cluster.
   */
  netsuiteJarPath?: string | undefined;
  /** Top-level source configurations */
  sourceConfigurations?: SourceConfig[] | undefined;
  /** (Optional) A window that specifies a set of time ranges for snapshot queries in CDC. */
  fullRefreshWindow?: OperationTimeWindow | undefined;
  /** (Optional) Connector Type for sources. Ex: CDC, Query Based. */
  connectorType?: ConnectorType | undefined;
  /**
   * (Optional) Location of staged data storage. This is required for migration from Cdc Managed Ingestion Pipeline
   * with Gateway pipeline to Combined Cdc Managed Ingestion Pipeline.
   * If not specified, the volume for staged data will be created in catalog and schema/target specified in the
   * top level pipeline definition.
   */
  dataStagingOptions?: DataStagingOptions | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_CreateIngestionConfig {
  sourceTables?:
    | {
        $case: 'schema';
        /** Select all tables from a specific source schema. */
        schema: IngestionPipelineDefinition_CreateSchemaSpec;
      }
    | {
        $case: 'table';
        /** Select a specific source table. */
        table: IngestionPipelineDefinition_CreateTableSpec;
      }
    | {
        $case: 'report';
        /** Select a specific source report. */
        report: IngestionPipelineDefinition_CreateReportSpec;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_CreateReportSpec {
  /** Required. Report URL in the source system. */
  sourceUrl: string;
  /** Required. Destination catalog to store table. */
  destinationCatalog: string;
  /** Required. Destination schema to store table. */
  destinationSchema: string;
  /** Required. Destination table name. The pipeline fails if a table with that name already exists. */
  destinationTable?: string | undefined;
  /** Configuration settings to control the ingestion of tables. These settings override the table_configuration defined in the IngestionPipelineDefinition object. */
  tableConfiguration?:
    | IngestionPipelineDefinition_CreateTableSpecificConfig
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_CreateSchemaSpec {
  /** The source catalog name. Might be optional depending on the type of source. */
  sourceCatalog?: string | undefined;
  /** Required. Schema name in the source database. */
  sourceSchema: string;
  /** Required. Destination catalog to store tables. */
  destinationCatalog: string;
  /** Required. Destination schema to store tables in. Tables with the same name as the source tables are created in this destination schema. The pipeline fails If a table with the same name already exists. */
  destinationSchema: string;
  /** Configuration settings to control the ingestion of tables. These settings are applied to all tables in this schema and override the table_configuration defined in the IngestionPipelineDefinition object. */
  tableConfiguration?:
    | IngestionPipelineDefinition_CreateTableSpecificConfig
    | undefined;
  /** (Optional) Source Specific Connector Options */
  connectorOptions?: CreateConnectorOptions | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_CreateTableSpec {
  /** Source catalog name. Might be optional depending on the type of source. */
  sourceCatalog?: string | undefined;
  /** Schema name in the source database. Might be optional depending on the type of source. */
  sourceSchema?: string | undefined;
  /** Required. Table name in the source database. */
  sourceTable: string;
  /** Required. Destination catalog to store table. */
  destinationCatalog: string;
  /** Required. Destination schema to store table. */
  destinationSchema: string;
  /** Optional. Destination table name. The pipeline fails if a table with that name already exists. If not set, the source table name is used. */
  destinationTable?: string | undefined;
  /** Configuration settings to control the ingestion of tables. These settings override the table_configuration defined in the IngestionPipelineDefinition object and the SchemaSpec. */
  tableConfiguration?:
    | IngestionPipelineDefinition_CreateTableSpecificConfig
    | undefined;
  /** (Optional) Source Specific Connector Options */
  connectorOptions?: CreateConnectorOptions | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_CreateTableSpecificConfig {
  scdType?: ScdType_ScdType | undefined;
  /** The primary key of the table used to apply changes. */
  primaryKeys?: string[] | undefined;
  /** The column names specifying the logical order of events in the source data. Spark Declarative Pipelines uses this sequencing to handle change events that arrive out of order. */
  sequenceBy?: string[] | undefined;
  /**
   * A list of column names to be included for the ingestion.
   * When not specified, all columns except ones in exclude_columns will be included. Future
   * columns will be automatically included.
   * When specified, all other future columns will be automatically excluded from ingestion.
   * This field in mutually exclusive with `exclude_columns`.
   */
  includeColumns?: string[] | undefined;
  /**
   * A list of column names to be excluded for the ingestion.
   * When not specified, include_columns fully controls what columns to be ingested.
   * When specified, all other columns including future ones will be automatically included for ingestion.
   * This field in mutually exclusive with `include_columns`.
   */
  excludeColumns?: string[] | undefined;
  /** If true, formula fields defined in the table are included in the ingestion. This setting is only valid for the Salesforce connector */
  salesforceIncludeFormulaFields?: boolean | undefined;
  /** (Optional) Additional custom parameters for Workday Report */
  workdayReportParameters?:
    | IngestionPipelineDefinition_CreateWorkdayReportParameters
    | undefined;
  /**
   * (Optional, Immutable) The row filter condition to be applied to the table.
   * It must not contain the WHERE keyword, only the actual filter condition.
   * It must be in DBSQL format.
   */
  rowFilter?: string | undefined;
  queryBasedConnectorConfig?:
    | IngestionPipelineDefinition_TableSpecificConfig_CreateQueryBasedConnectorConfig
    | undefined;
  /**
   * (Optional, Mutable) Policy for auto full refresh, if enabled pipeline will automatically try
   * to fix issues by doing a full refresh on the table in the retry run. auto_full_refresh_policy
   * in table configuration will override the above level auto_full_refresh_policy.
   * For example,
   * {
   * "auto_full_refresh_policy": {
   * "enabled": true,
   * "min_interval_hours": 23,
   * }
   * }
   * If unspecified, auto full refresh is disabled.
   */
  autoFullRefreshPolicy?: CreateAutoFullRefreshPolicy | undefined;
  /**
   * Table properties to set on the destination table.
   * These are key-value pairs that configure various Delta table behaviors or any user defined properties.
   * Example: {"delta.feature.variantType": "supported", "delta.enableTypeWidening": "true"}
   * Note: table_properties in table specific configuration will override the table_properties of the pipeline definition.
   */
  tableProperties?: Record<string, string> | undefined;
  /**
   * Whether to enable auto clustering on the destination table.
   * When enabled, Delta will automatically optimize the data layout
   * based on the clustering columns for improved query performance.
   * Note: enable_auto_clustering in table specific configuration will override the pipeline definition.
   * Note: we can only provide enable_auto_clustering or clustering_columns,
   * added as separate fields as we cannot have repeated field in oneof.
   */
  enableAutoClustering?: boolean | undefined;
  /**
   * List of column names to use for clustering the destination table.
   * When specified, the destination Delta table will be clustered by these columns.
   * This can improve query performance when filtering on these columns.
   * Note: clustering_columns in table specific configuration will override the pipeline definition.
   * Note: we can only provide enable_auto_clustering or clustering_columns,
   * added as separate fields as we cannot have repeated field in oneof.
   */
  clusteringColumns?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_CreateWorkdayReportParameters {
  /**
   * (Optional) Marks the report as incremental.
   * This field is deprecated and should not be used. Use `parameters` instead. The incremental behavior is now
   * controlled by the `parameters` field.
   */
  incremental?: boolean | undefined;
  /**
   * (Optional) Additional custom parameters for Workday Report
   * This field is deprecated and should not be used. Use `parameters` instead.
   */
  reportParameters?:
    | IngestionPipelineDefinition_WorkdayReportParameters_CreateQueryKeyValue[]
    | undefined;
  /**
   * Parameters for the Workday report. Each key represents the parameter name (e.g., "start_date", "end_date"),
   * and the corresponding value is a SQL-like expression used to compute the parameter value at runtime.
   * Example:
   * {
   * "start_date": "{ coalesce(current_offset(), date(\"2025-02-01\")) }",
   * "end_date": "{ current_date() - INTERVAL 1 DAY }"
   * }
   */
  parameters?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_IngestionConfig {
  sourceTables?:
    | {
        $case: 'schema';
        /** Select all tables from a specific source schema. */
        schema: IngestionPipelineDefinition_SchemaSpec;
      }
    | {
        $case: 'table';
        /** Select a specific source table. */
        table: IngestionPipelineDefinition_TableSpec;
      }
    | {
        $case: 'report';
        /** Select a specific source report. */
        report: IngestionPipelineDefinition_ReportSpec;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_ReportSpec {
  /** Required. Report URL in the source system. */
  sourceUrl?: string | undefined;
  /** Required. Destination catalog to store table. */
  destinationCatalog?: string | undefined;
  /** Required. Destination schema to store table. */
  destinationSchema?: string | undefined;
  /** Required. Destination table name. The pipeline fails if a table with that name already exists. */
  destinationTable?: string | undefined;
  /** Configuration settings to control the ingestion of tables. These settings override the table_configuration defined in the IngestionPipelineDefinition object. */
  tableConfiguration?:
    | IngestionPipelineDefinition_TableSpecificConfig
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_SchemaSpec {
  /** The source catalog name. Might be optional depending on the type of source. */
  sourceCatalog?: string | undefined;
  /** Required. Schema name in the source database. */
  sourceSchema?: string | undefined;
  /** Required. Destination catalog to store tables. */
  destinationCatalog?: string | undefined;
  /** Required. Destination schema to store tables in. Tables with the same name as the source tables are created in this destination schema. The pipeline fails If a table with the same name already exists. */
  destinationSchema?: string | undefined;
  /** Configuration settings to control the ingestion of tables. These settings are applied to all tables in this schema and override the table_configuration defined in the IngestionPipelineDefinition object. */
  tableConfiguration?:
    | IngestionPipelineDefinition_TableSpecificConfig
    | undefined;
  /** (Optional) Source Specific Connector Options */
  connectorOptions?: ConnectorOptions | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_TableSpec {
  /** Source catalog name. Might be optional depending on the type of source. */
  sourceCatalog?: string | undefined;
  /** Schema name in the source database. Might be optional depending on the type of source. */
  sourceSchema?: string | undefined;
  /** Required. Table name in the source database. */
  sourceTable?: string | undefined;
  /** Required. Destination catalog to store table. */
  destinationCatalog?: string | undefined;
  /** Required. Destination schema to store table. */
  destinationSchema?: string | undefined;
  /** Optional. Destination table name. The pipeline fails if a table with that name already exists. If not set, the source table name is used. */
  destinationTable?: string | undefined;
  /** Configuration settings to control the ingestion of tables. These settings override the table_configuration defined in the IngestionPipelineDefinition object and the SchemaSpec. */
  tableConfiguration?:
    | IngestionPipelineDefinition_TableSpecificConfig
    | undefined;
  /** (Optional) Source Specific Connector Options */
  connectorOptions?: ConnectorOptions | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_TableSpecificConfig {
  scdType?: ScdType_ScdType | undefined;
  /** The primary key of the table used to apply changes. */
  primaryKeys?: string[] | undefined;
  /** The column names specifying the logical order of events in the source data. Spark Declarative Pipelines uses this sequencing to handle change events that arrive out of order. */
  sequenceBy?: string[] | undefined;
  /**
   * A list of column names to be included for the ingestion.
   * When not specified, all columns except ones in exclude_columns will be included. Future
   * columns will be automatically included.
   * When specified, all other future columns will be automatically excluded from ingestion.
   * This field in mutually exclusive with `exclude_columns`.
   */
  includeColumns?: string[] | undefined;
  /**
   * A list of column names to be excluded for the ingestion.
   * When not specified, include_columns fully controls what columns to be ingested.
   * When specified, all other columns including future ones will be automatically included for ingestion.
   * This field in mutually exclusive with `include_columns`.
   */
  excludeColumns?: string[] | undefined;
  /** If true, formula fields defined in the table are included in the ingestion. This setting is only valid for the Salesforce connector */
  salesforceIncludeFormulaFields?: boolean | undefined;
  /** (Optional) Additional custom parameters for Workday Report */
  workdayReportParameters?:
    | IngestionPipelineDefinition_WorkdayReportParameters
    | undefined;
  /**
   * (Optional, Immutable) The row filter condition to be applied to the table.
   * It must not contain the WHERE keyword, only the actual filter condition.
   * It must be in DBSQL format.
   */
  rowFilter?: string | undefined;
  queryBasedConnectorConfig?:
    | IngestionPipelineDefinition_TableSpecificConfig_QueryBasedConnectorConfig
    | undefined;
  /**
   * (Optional, Mutable) Policy for auto full refresh, if enabled pipeline will automatically try
   * to fix issues by doing a full refresh on the table in the retry run. auto_full_refresh_policy
   * in table configuration will override the above level auto_full_refresh_policy.
   * For example,
   * {
   * "auto_full_refresh_policy": {
   * "enabled": true,
   * "min_interval_hours": 23,
   * }
   * }
   * If unspecified, auto full refresh is disabled.
   */
  autoFullRefreshPolicy?: AutoFullRefreshPolicy | undefined;
  /**
   * Table properties to set on the destination table.
   * These are key-value pairs that configure various Delta table behaviors or any user defined properties.
   * Example: {"delta.feature.variantType": "supported", "delta.enableTypeWidening": "true"}
   * Note: table_properties in table specific configuration will override the table_properties of the pipeline definition.
   */
  tableProperties?: Record<string, string> | undefined;
  /**
   * Whether to enable auto clustering on the destination table.
   * When enabled, Delta will automatically optimize the data layout
   * based on the clustering columns for improved query performance.
   * Note: enable_auto_clustering in table specific configuration will override the pipeline definition.
   * Note: we can only provide enable_auto_clustering or clustering_columns,
   * added as separate fields as we cannot have repeated field in oneof.
   */
  enableAutoClustering?: boolean | undefined;
  /**
   * List of column names to use for clustering the destination table.
   * When specified, the destination Delta table will be clustered by these columns.
   * This can improve query performance when filtering on these columns.
   * Note: clustering_columns in table specific configuration will override the pipeline definition.
   * Note: we can only provide enable_auto_clustering or clustering_columns,
   * added as separate fields as we cannot have repeated field in oneof.
   */
  clusteringColumns?: string[] | undefined;
}

/** Configurations that are only applicable for query-based ingestion connectors. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_TableSpecificConfig_CreateQueryBasedConnectorConfig {
  /**
   * The names of the monotonically increasing columns in the source table that are used to enable
   * the table to be read and ingested incrementally through structured streaming.
   * The columns are allowed to have repeated values but have to be non-decreasing.
   * If the source data is merged into the destination (e.g., using SCD Type 1 or Type 2), these
   * columns will implicitly define the `sequence_by` behavior. You can still explicitly set
   * `sequence_by` to override this default.
   */
  cursorColumns?: string[] | undefined;
  /**
   * Specifies a SQL WHERE condition that specifies that the source row has been deleted.
   * This is sometimes referred to as "soft-deletes".
   * For example: "Operation = 'DELETE'" or "is_deleted = true".
   * This field is orthogonal to `hard_deletion_sync_interval_in_seconds`,
   * one for soft-deletes and the other for hard-deletes.
   * See also the hard_deletion_sync_min_interval_in_seconds field for
   * handling of "hard deletes" where the source rows are physically removed from the table.
   */
  deletionCondition?: string | undefined;
  /**
   * Specifies the minimum interval (in seconds) between snapshots on primary keys
   * for detecting and synchronizing hard deletions—i.e., rows that have been
   * physically removed from the source table.
   * This interval acts as a lower bound. If ingestion runs less frequently than
   * this value, hard deletion synchronization will align with the actual ingestion
   * frequency instead of happening more often.
   * If not set, hard deletion synchronization via snapshots is disabled.
   * This field is mutable and can be updated without triggering a full snapshot.
   */
  hardDeletionSyncMinIntervalInSeconds?: bigint | undefined;
}

/** Configurations that are only applicable for query-based ingestion connectors. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_TableSpecificConfig_QueryBasedConnectorConfig {
  /**
   * The names of the monotonically increasing columns in the source table that are used to enable
   * the table to be read and ingested incrementally through structured streaming.
   * The columns are allowed to have repeated values but have to be non-decreasing.
   * If the source data is merged into the destination (e.g., using SCD Type 1 or Type 2), these
   * columns will implicitly define the `sequence_by` behavior. You can still explicitly set
   * `sequence_by` to override this default.
   */
  cursorColumns?: string[] | undefined;
  /**
   * Specifies a SQL WHERE condition that specifies that the source row has been deleted.
   * This is sometimes referred to as "soft-deletes".
   * For example: "Operation = 'DELETE'" or "is_deleted = true".
   * This field is orthogonal to `hard_deletion_sync_interval_in_seconds`,
   * one for soft-deletes and the other for hard-deletes.
   * See also the hard_deletion_sync_min_interval_in_seconds field for
   * handling of "hard deletes" where the source rows are physically removed from the table.
   */
  deletionCondition?: string | undefined;
  /**
   * Specifies the minimum interval (in seconds) between snapshots on primary keys
   * for detecting and synchronizing hard deletions—i.e., rows that have been
   * physically removed from the source table.
   * This interval acts as a lower bound. If ingestion runs less frequently than
   * this value, hard deletion synchronization will align with the actual ingestion
   * frequency instead of happening more often.
   * If not set, hard deletion synchronization via snapshots is disabled.
   * This field is mutable and can be updated without triggering a full snapshot.
   */
  hardDeletionSyncMinIntervalInSeconds?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_WorkdayReportParameters {
  /**
   * (Optional) Marks the report as incremental.
   * This field is deprecated and should not be used. Use `parameters` instead. The incremental behavior is now
   * controlled by the `parameters` field.
   */
  incremental?: boolean | undefined;
  /**
   * (Optional) Additional custom parameters for Workday Report
   * This field is deprecated and should not be used. Use `parameters` instead.
   */
  reportParameters?:
    | IngestionPipelineDefinition_WorkdayReportParameters_QueryKeyValue[]
    | undefined;
  /**
   * Parameters for the Workday report. Each key represents the parameter name (e.g., "start_date", "end_date"),
   * and the corresponding value is a SQL-like expression used to compute the parameter value at runtime.
   * Example:
   * {
   * "start_date": "{ coalesce(current_offset(), date(\"2025-02-01\")) }",
   * "end_date": "{ current_date() - INTERVAL 1 DAY }"
   * }
   */
  parameters?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_WorkdayReportParameters_CreateQueryKeyValue {
  /** Key for the report parameter, can be a column name or other metadata */
  key?: string | undefined;
  /**
   * Value for the report parameter.
   * Possible values it can take are these sql functions:
   * 1. coalesce(current_offset(), date("YYYY-MM-DD")) -> if current_offset() is null, then the passed date, else current_offset()
   * 2. current_date()
   * 3. date_sub(current_date(), x) -> subtract x (some non-negative integer) days from current date
   */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngestionPipelineDefinition_WorkdayReportParameters_QueryKeyValue {
  /** Key for the report parameter, can be a column name or other metadata */
  key?: string | undefined;
  /**
   * Value for the report parameter.
   * Possible values it can take are these sql functions:
   * 1. coalesce(current_offset(), date("YYYY-MM-DD")) -> if current_offset() is null, then the passed date, else current_offset()
   * 2. current_date()
   * 3. date_sub(current_date(), x) -> subtract x (some non-negative integer) days from current date
   */
  value?: string | undefined;
}

/** Jira specific options for ingestion */
export interface JiraConnectorOptions {
  /** (Optional) Projects to filter Jira data on */
  includeJiraSpaces?: string[] | undefined;
}

export interface JsonTransformerOptions {
  /** Parse the entire value as a single Variant column. */
  asVariant?: boolean | undefined;
  /** Inline schema string for JSON parsing (Spark DDL format). */
  schema?: string | undefined;
  /** Path to a schema file (.ddl). */
  schemaFilePath?: string | undefined;
  /** (Optional) Schema evolution mode for schema inference. */
  schemaEvolutionMode?: FileIngestionOptions_SchemaEvolutionMode | undefined;
  /** (Optional) Schema hints as a comma-separated string of "column_name type" pairs. */
  schemaHints?: string | undefined;
}

export interface KafkaOptions {
  /**
   * Topics to subscribe to.
   * Only one of topics or topic_pattern must be specified.
   */
  topics?: string[] | undefined;
  /**
   * Java regex pattern to subscribe to matching topics.
   * Only one of topics or topic_pattern must be specified.
   */
  topicPattern?: string | undefined;
  /**
   * (Optional) Transformer for the message key.
   * If not specified, the key is left as raw bytes.
   */
  keyTransformer?: Transformer | undefined;
  /**
   * (Optional) Transformer for the message value.
   * If not specified, the value is left as raw bytes.
   */
  valueTransformer?: Transformer | undefined;
  /**
   * (Optional) Where to begin reading when no checkpoint exists.
   * Valid values: "latest" and "earliest". Defaults to "latest".
   */
  startingOffset?: string | undefined;
  /** Internal option to control the maximum number of offsets to process per trigger. */
  maxOffsetsPerTrigger?: bigint | undefined;
  /**
   * Undocumented backdoor mechanism for overriding parameters
   * to pass to the Kafka client.
   * This is not supported and may break at any time.
   */
  clientConfig?: Record<string, string> | undefined;
}

/**
 * The request/response messages for the ListPipelines API. The default behavior is to return
 * the 25 newest events in timestamp descending order for the given pipeline.
 */
export interface ListPipelineEventsRequest {
  /** The pipeline to return events for. */
  pipelineId?: string | undefined;
  /**
   * Page token returned by previous call. This field is mutually
   * exclusive with all fields in this request except max_results. An error is
   * returned if any fields other than max_results are set when this field is set.
   */
  pageToken?: string | undefined;
  /**
   * Max number of entries to return in a single page. The system may return
   * fewer than max_results events in a response, even if there are more events
   * available.
   */
  maxResults?: number | undefined;
  /**
   * A string indicating a sort order by timestamp for the results, for example, ["timestamp asc"].
   * The sort order can be ascending or descending. By default, events are returned
   * in descending order by timestamp.
   */
  orderBy?: string[] | undefined;
  /**
   * Criteria to select a subset of results, expressed using a SQL-like syntax.
   * The supported filters are:
   * 1. level='INFO' (or WARN or ERROR)
   * 2. level in ('INFO', 'WARN')
   * 3. id='[event-id]'
   * 4. timestamp > 'TIMESTAMP' (or >=,<,<=,=)
   *
   * Composite expressions are supported, for example: level in ('ERROR', 'WARN')
   * AND timestamp> '2021-07-22T06:37:33.083Z'
   */
  filter?: string | undefined;
}

export interface ListPipelineEventsResponse {
  /** The list of events matching the request criteria. */
  events?: PipelineEvent[] | undefined;
  /** If present, a token to fetch the next page of events. */
  nextPageToken?: string | undefined;
  /** If present, a token to fetch the previous page of events. */
  prevPageToken?: string | undefined;
}

/**
 * The request/response messages for the ListPipelines API. The default behavior is to return
 * the 25 first pipelines in ascending order of pipeline id.
 */
export interface ListPipelinesRequest {
  /** Page token returned by previous call */
  pageToken?: string | undefined;
  /**
   * The maximum number of entries to return in a single page. The system may
   * return fewer than max_results events in a response, even if there are
   * more events available. This field is optional. The default value is 25.
   * The maximum value is 100. An error is returned if the value of max_results
   * is greater than 100.
   */
  maxResults?: number | undefined;
  /**
   * A list of strings specifying the order of results.
   * Supported order_by fields are id and name. The default is id asc.
   * This field is optional.
   */
  orderBy?: string[] | undefined;
  /**
   * Select a subset of results based on the specified criteria.
   * The supported filters are:
   *
   * * `notebook='<path>'` to select pipelines that reference the provided notebook path.
   * * `name LIKE '[pattern]'` to select pipelines with a name that matches pattern.
   * Wildcards are supported, for example: `name LIKE '%shopping%'`
   *
   * Composite filters are not supported. This field is optional.
   */
  filter?: string | undefined;
}

export interface ListPipelinesResponse {
  /** The list of events matching the request criteria. */
  statuses?: PipelineStateInfo[] | undefined;
  /** If present, a token to fetch the next page of events. */
  nextPageToken?: string | undefined;
}

/**
 * The request/response messages for the ListUpdates API. The default behavior is to return
 * the 25 most recent updates in timestamp descending order for the given pipeline. No custom
 * sorting or filtering is supported.
 */
export interface ListUpdatesRequest {
  /** The pipeline to return updates for. */
  pipelineId?: string | undefined;
  /** Page token returned by previous call */
  pageToken?: string | undefined;
  /** Max number of entries to return in a single page. */
  maxResults?: number | undefined;
  /** If present, returns updates until and including this update_id. */
  untilUpdateId?: string | undefined;
}

export interface ListUpdatesResponse {
  updates?: UpdateInfo[] | undefined;
  /**
   * If present, then there are more results, and this a token to be used in a subsequent request
   * to fetch the next page.
   */
  nextPageToken?: string | undefined;
  /** If present, then this token can be used in a subsequent request to fetch the previous page. */
  prevPageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ManualTrigger {}

/** Meta Marketing (Meta Ads) specific options for ingestion */
export interface MetaMarketingOptions {
  /**
   * (Optional, DEPRECATED — use custom_report_options.level) Granularity of data to pull
   * (account, ad, adset, campaign)
   */
  level?: string | undefined;
  /** (Optional, DEPRECATED — use custom_report_options.breakdowns) Breakdowns to configure */
  breakdowns?: string[] | undefined;
  /** (Optional, DEPRECATED — use custom_report_options.action_breakdowns) Action breakdowns */
  actionBreakdowns?: string[] | undefined;
  /**
   * (Optional, DEPRECATED — use custom_report_options.action_report_time) Timing used to report
   * action statistics (impression, conversion, mixed, or lifetime)
   */
  actionReportTime?: string | undefined;
  /**
   * (Optional) Start date in yyyy-MM-dd format (e.g. 2025-01-15). Data added
   * after this date will be ingested, shared by prebuilt and custom reports.
   */
  startDate?: string | undefined;
  /**
   * (Optional) Window in days to revisit data during sync to capture
   * updated conversion data from the API, shared by prebuilt and custom reports.
   */
  customInsightsLookbackWindow?: number | undefined;
  /**
   * (Optional, DEPRECATED — use custom_report_options.time_increment) Value in string by which to
   * aggregate statistics (can take all_days, monthly or number of days)
   */
  timeIncrement?: string | undefined;
  /**
   * (Optional, DEPRECATED — use custom_report_options.action_attribution_windows) Action attribution
   * windows for insights reporting (e.g. "28d_click", "1d_view")
   */
  actionAttributionWindows?: string[] | undefined;
}

export interface NotebookLibrary {
  /** The absolute path of the source code. */
  path?: string | undefined;
}

export interface Notifications {
  /** A list of email addresses notified when a configured alert is triggered. */
  emailRecipients?: string[] | undefined;
  /**
   * A list of alerts that trigger the sending of notifications to the configured
   * destinations. The supported alerts are:
   *
   * * `on-update-success`: A pipeline update completes successfully.
   * * `on-update-failure`: Each time a pipeline update fails.
   * * `on-update-fatal-failure`: A pipeline update fails with a non-retryable (fatal) error.
   * * `on-flow-failure`: A single data flow fails.
   */
  alerts?: string[] | undefined;
}

/** Proto representing a window */
export interface OperationTimeWindow {
  /** An integer between 0 and 23 denoting the start hour for the window in the 24-hour day. */
  startHour?: number | undefined;
  /**
   * Days of week in which the window is allowed to happen
   * If not specified all days of the week will be used.
   */
  daysOfWeek?: DayOfWeek[] | undefined;
  /**
   * Time zone id of window. See https://docs.databricks.com/sql/language-manual/sql-ref-syntax-aux-conf-mgmt-set-timezone.html for details.
   * If not specified, UTC will be used.
   */
  timeZoneId?: string | undefined;
}

export interface Origin {
  /** The cloud provider, e.g., AWS or Azure. */
  cloud?: string | undefined;
  /** The cloud region. */
  region?: string | undefined;
  /** The org id of the user. Unique within a cloud. */
  orgId?: bigint | undefined;
  /** The id of the pipeline. Globally unique. */
  pipelineId?: string | undefined;
  /** The name of the pipeline. Not unique. */
  pipelineName?: string | undefined;
  /** The id of the cluster where an execution happens. Unique within a region. */
  clusterId?: string | undefined;
  /** The id of an execution. Globally unique. */
  updateId?: string | undefined;
  /** The id of a maintenance run. Globally unique. */
  maintenanceId?: string | undefined;
  /** The id of a (delta) table. Globally unique. */
  tableId?: string | undefined;
  /** The name of a dataset. Unique within a pipeline. */
  datasetName?: string | undefined;
  /**
   * The id of the flow. Globally unique. Incremental queries will generally
   * reuse the same id while complete queries will have a new id per update.
   */
  flowId?: string | undefined;
  /** The name of the flow. Not unique. */
  flowName?: string | undefined;
  /** The id of a batch. Unique within a flow. */
  batchId?: bigint | undefined;
  /** The id of the request that caused an update. */
  requestId?: string | undefined;
  /** The Unity Catalog id of the MV or ST being updated. */
  ucResourceId?: string | undefined;
  /** The optional host name where the event was triggered */
  host?: string | undefined;
  /** Materialization name. */
  materializationName?: string | undefined;
  /** The name of the source UC connection (if known) from whose data ingestion is described by this event. */
  ingestionSourceConnectionName?: string | undefined;
  /** The name of the source catalog name (if known) from whose data ingestion is described by this event. */
  ingestionSourceCatalogName?: string | undefined;
  /** The name of the source schema name (if known) from whose data ingestion is described by this event. */
  ingestionSourceSchemaName?: string | undefined;
  /** The name of the source table name (if known) from whose data ingestion is described by this event. */
  ingestionSourceTableName?: string | undefined;
  /** An optional implementation-defined source table version of a dataset being (re)ingested. */
  ingestionSourceTableVersion?: string | undefined;
}

/** Outlook specific options for ingestion */
export interface OutlookOptions {
  /** Deprecated. Use include_folders instead. */
  folderFilter?: string[] | undefined;
  /** Deprecated. Use include_senders instead. */
  senderFilter?: string[] | undefined;
  /** Deprecated. Use include_subjects instead. */
  subjectFilter?: string[] | undefined;
  /**
   * (Optional) Start date for the initial sync in YYYY-MM-DD format.
   * Format: YYYY-MM-DD (e.g., 2024-01-01)
   * This determines the earliest date from which to sync historical data.
   * If not specified, complete history is ingested.
   */
  startDate?: string | undefined;
  /**
   * (Optional) Defines how the body_content column is populated.
   * TEXT_HTML: Preserves full formatting, links, and styling.
   * TEXT_PLAIN: Converts body to plain text. Recommended for AI/RAG pipelines to reduce token usage and noise.
   */
  bodyFormat?: OutlookBodyFormat | undefined;
  /**
   * (Optional) Controls which attachments to ingest.
   * If not specified, defaults to ALL.
   */
  attachmentMode?: OutlookAttachmentMode | undefined;
  /**
   * (Optional) List of mailboxes to sync (e.g. mailbox email addresses or identifiers).
   * If not specified, all accessible mailboxes are ingested.
   * Filter semantics: OR between different mailboxes.
   */
  includeMailboxes?: string[] | undefined;
  /**
   * (Optional) Filter mail folders to include in the sync.
   * If not specified, all folders will be synced.
   * Examples: Inbox, Sent Items, Custom_Folder
   * Filter semantics: OR between different folders.
   */
  includeFolders?: string[] | undefined;
  /**
   * (Optional) Filter emails by sender address. Uses exact email match.
   * Examples: user@vendor.com, alerts@system.io, noreply@company.com
   * If not specified, emails from all senders will be synced.
   * Filter semantics: OR between different senders.
   */
  includeSenders?: string[] | undefined;
  /**
   * (Optional) Filter emails by subject line. Values ending with "*" use prefix match (subject starts with
   * the part before "*"); otherwise substring match (subject contains the value).
   * Examples: "Invoice" (substring), "Re:*" (prefix), "Support Ticket", "URGENT*"
   * If not specified, emails with all subjects will be synced.
   * Filter semantics: OR between different subjects.
   */
  includeSubjects?: string[] | undefined;
}

export interface PathPattern {
  /** The source code to include for pipelines */
  include?: string | undefined;
}

export interface PipelineCluster {
  /** A label for the cluster specification, either `default` to configure the default cluster, or `maintenance` to configure the maintenance cluster. This field is optional. The default value is `default`. */
  label?: string | undefined;
  /** Note: This field won't be persisted. Only API users will check this field. */
  applyPolicyDefaultValues?: boolean | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * See :method:clusters/create for more details.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: PipelinesAwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: PipelinesAzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: PipelinesGcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   */
  driverNodeTypeId?: string | undefined;
  /**
   * SSH public key contents that will be added to each Spark node in this cluster. The
   * corresponding private keys can be used to login with the user name `ubuntu` on port `2200`.
   * Up to 10 keys can be specified.
   */
  sshPublicKeys?: string[] | undefined;
  /**
   * Additional tags for cluster resources. <Databricks> will tag all cluster resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   *
   * - Clusters can only reuse cloud resources if the resources' tags are a subset of the cluster tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * The configuration for delivering spark logs to a long-term storage destination.
   * Only dbfs destinations are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: PipelinesClusterLogConf | undefined;
  /**
   * An object containing a set of optional, user-specified environment variable key-value pairs.
   * Please note that key-value pair of the form (X,Y) will be exported as is (i.e.,
   * `export X='Y'`) while launching the driver and workers.
   *
   * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we recommend appending
   * them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the example below. This ensures that all
   * default databricks managed environmental variables are included as well.
   *
   * Example Spark environment variables:
   * `{"SPARK_WORKER_MEMORY": "28000m", "SPARK_LOCAL_DIRS": "/local_disk0"}` or
   * `{"SPARK_DAEMON_JAVA_OPTS": "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
   */
  sparkEnvVars?: Record<string, string> | undefined;
  /** The configuration for storing init scripts. Any number of destinations can be specified. The scripts are executed sequentially in the order provided. If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`. */
  initScripts?: PipelinesInitScriptInfo[] | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable local disk encryption for the cluster. */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  size?:
    | {
        $case: 'numWorkers';
        /**
         * Number of worker nodes that this cluster should have. A cluster has one Spark Driver
         * and `num_workers` Executors for a total of `num_workers` + 1 Spark nodes.
         *
         * Note: When reading the properties of a cluster, this field reflects the desired number
         * of workers rather than the actual current number of workers. For instance, if a cluster
         * is resized from 5 to 10 workers, this field will immediately be updated to reflect
         * the target size of 10 workers, whereas the workers listed in `spark_info` will gradually
         * increase from 5 to 10 as the new nodes are provisioned.
         */
        numWorkers: number;
      }
    | {
        $case: 'autoscale';
        /**
         * Parameters needed in order to automatically scale clusters up and down based on load.
         * Note: autoscaling works best with DB runtime versions 3.0 or later.
         */
        autoscale: PipelinesAutoScale;
      }
    | undefined;
}

export interface PipelineDeployment {
  /** The deployment method that manages the pipeline. */
  kind?: DeploymentKind | undefined;
  /** The path to the file containing metadata about the deployment. */
  metadataFilePath?: string | undefined;
  /**
   * ID of the deployment that manages this pipeline. Only set when `kind` is
   * `BUNDLE`. Used to look up deployment metadata from the Deployment
   * Metadata service.
   */
  deploymentId?: string | undefined;
  /**
   * ID of the version of the deployment that produced this pipeline. Only
   * set when `kind` is `BUNDLE`. Identifies a specific snapshot of the
   * deployment in the Deployment Metadata service.
   */
  versionId?: string | undefined;
}

export interface PipelineEvent {
  /** A time-based, globally unique id. */
  id?: string | undefined;
  /** A sequencing object to identify and order events. */
  sequence?: Sequencing | undefined;
  /** Describes where the event originates from. */
  origin?: Origin | undefined;
  /** The time of the event. */
  timestamp?: string | undefined;
  /** The display message associated with the event. */
  message?: string | undefined;
  /** The severity level of the event. */
  level?: EventLevel | undefined;
  /** Information about an error captured by the event. */
  error?: ErrorDetail | undefined;
  /** The event type. Should always correspond to the details */
  eventType?: string | undefined;
  /** Maturity level for event_type. */
  maturityLevel?: MaturityLevel | undefined;
  /**
   * Information about which fields were truncated from this event due to size constraints.
   * If empty or absent, no truncation occurred.
   * See https://docs.databricks.com/en/ldp/monitor-event-logs for information on
   * retrieving complete event data.
   */
  truncation?: Truncation | undefined;
}

export interface PipelineLibrary {
  lib?:
    | {
        $case: 'jar';
        /** URI of the jar to be installed. Currently only DBFS is supported. */
        jar: string;
      }
    | {
        $case: 'maven';
        /** Specification of a maven library to be installed. */
        maven: PipelinesMavenLibrary;
      }
    | {
        $case: 'whl';
        /** URI of the whl to be installed. */
        whl: string;
      }
    | {
        $case: 'notebook';
        /** The path to a notebook that defines a pipeline and is stored in the <Databricks> workspace. */
        notebook: NotebookLibrary;
      }
    | {
        $case: 'file';
        /** The path to a file that defines a pipeline and is stored in the Databricks Repos. */
        file: NotebookLibrary;
      }
    | {
        $case: 'glob';
        /**
         * The unified field to include source codes.
         * Each entry can be a notebook path, a file path, or a folder path that ends `/\**`.
         * This field cannot be used together with `notebook` or `file`.
         */
        glob: PathPattern;
      }
    | undefined;
}

export interface PipelineSpec {
  /** Unique identifier for this pipeline. */
  id?: string | undefined;
  /** Friendly identifier for this pipeline. */
  name?: string | undefined;
  /** DBFS root directory for storing checkpoints and tables. */
  storage?: string | undefined;
  /** String-String configuration for this pipeline execution. */
  configuration?: Record<string, string> | undefined;
  /** Cluster settings for this pipeline deployment. */
  clusters?: PipelineCluster[] | undefined;
  /** Libraries or code needed by this deployment. */
  libraries?: PipelineLibrary[] | undefined;
  /** The configuration for a managed ingestion pipeline. These settings cannot be used with the 'libraries', 'schema', 'target', or 'catalog' settings. */
  ingestionDefinition?: IngestionPipelineDefinition | undefined;
  /** The definition of a gateway pipeline to support change data capture. */
  gatewayDefinition?: IngestionGatewayPipelineDefinition | undefined;
  /** Which pipeline trigger to use. Deprecated: Use `continuous` instead. */
  trigger?: PipelineTrigger | undefined;
  /** Target schema (database) to add tables in this pipeline to. Exactly one of `schema` or `target` must be specified. To publish to Unity Catalog, also specify `catalog`. This legacy field is deprecated for pipeline creation in favor of the `schema` field. */
  target?: string | undefined;
  /** The default schema (database) where tables are read from or published to. */
  schema?: string | undefined;
  /** Filters on which Pipeline packages to include in the deployed graph. */
  filters?: Filters | undefined;
  /** Whether the pipeline is continuous or triggered. This replaces `trigger`. */
  continuous?: boolean | undefined;
  /** Whether the pipeline is in Development mode. Defaults to false. */
  development?: boolean | undefined;
  /** Whether Photon is enabled for this pipeline. */
  photon?: boolean | undefined;
  /** Pipeline product edition. */
  edition?: string | undefined;
  /** SDP Release Channel that specifies which version to use. */
  channel?: string | undefined;
  /** A catalog in Unity Catalog to publish data from this pipeline to. If `target` is specified, tables in this pipeline are published to a `target` schema inside `catalog` (for example, `catalog`.`target`.`table`). If `target` is not specified, no data is published to Unity Catalog. */
  catalog?: string | undefined;
  /** List of notification settings for this pipeline. */
  notifications?: Notifications[] | undefined;
  /** Whether serverless compute is enabled for this pipeline. */
  serverless?: boolean | undefined;
  /** Deployment type of this pipeline. */
  deployment?: PipelineDeployment | undefined;
  /** Restart window of this pipeline. */
  restartWindow?: RestartWindow | undefined;
  /** Budget policy of this pipeline. */
  budgetPolicyId?: string | undefined;
  /**
   * A map of tags associated with the pipeline.
   * These are forwarded to the cluster as cluster tags, and are therefore subject to the same limitations.
   * A maximum of 25 tags can be added to the pipeline.
   */
  tags?: Record<string, string> | undefined;
  /** Event log configuration for this pipeline */
  eventLog?: EventLogSpec | undefined;
  /**
   * Root path for this pipeline.
   * This is used as the root directory when editing the pipeline in the <Databricks> user interface and it is
   * added to sys.path when executing Python sources during pipeline execution.
   */
  rootPath?: string | undefined;
  /** Environment specification for this pipeline used to install dependencies. */
  environment?: PipelinesEnvironment | undefined;
  /** Usage policy of this pipeline. */
  usagePolicyId?: string | undefined;
  /** Serverless compute ID specified by the user for serverless pipelines. */
  serverlessComputeId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PipelineState {}

export interface PipelineStateInfo {
  /** The unique identifier of the pipeline. */
  pipelineId?: string | undefined;
  state?: PipelineState_PipelineState | undefined;
  /** The unique identifier of the cluster running the pipeline. */
  clusterId?: string | undefined;
  /** The user-friendly name of the pipeline. */
  name?: string | undefined;
  /** Status of the latest updates for the pipeline. Ordered with the newest update first. */
  latestUpdates?: UpdateStateInfo[] | undefined;
  /** The username of the pipeline creator. */
  creatorUserName?: string | undefined;
  /** The username that the pipeline runs as. This is a read only value derived from the pipeline owner. */
  runAsUserName?: string | undefined;
  /** The health of a pipeline. */
  health?: PipelineHealthStatus | undefined;
}

export interface PipelineTrigger {
  trigger?:
    | {$case: 'manual'; manual: ManualTrigger}
    | {$case: 'cron'; cron: CronTrigger}
    | undefined;
}

export interface PipelinesAutoScale {
  /**
   * The minimum number of workers the cluster can scale down to when underutilized.
   * It is also the initial number of workers the cluster will have after creation.
   */
  minWorkers?: number | undefined;
  /** The maximum number of workers to which the cluster can scale up when overloaded. `max_workers` must be strictly greater than `min_workers`. */
  maxWorkers?: number | undefined;
  /**
   * Databricks Enhanced Autoscaling optimizes cluster utilization by automatically
   * allocating cluster resources based on workload volume, with minimal impact to
   * the data processing latency of your pipelines. Enhanced Autoscaling is available
   * for `updates` clusters only. The legacy autoscaling feature is used for `maintenance`
   * clusters.
   */
  mode?: string | undefined;
}

/** Attributes set during cluster creation which are related to Amazon Web Services. */
export interface PipelinesAwsAttributes {
  /**
   * The first ``first_on_demand`` nodes of the cluster will be placed on on-demand instances.
   * If this value is greater than 0, the cluster driver node in particular will be placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, ``first_on_demand`` nodes will be placed on on-demand instances and the remainder will
   * be placed on ``availability`` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * Availability type used for all subsequent nodes past the ``first_on_demand`` ones.
   * Note: If ``first_on_demand`` is zero, this availability type will be used for the entire cluster.
   */
  availability?: PipelinesAwsAvailability | undefined;
  /**
   * Identifier for the availability zone/datacenter in which the cluster resides.
   * This string will be of a form like "us-west-2a". The provided availability
   * zone must be in the same region as the <Databricks> deployment. For example, "us-west-2a"
   * is not a valid zone id if the <Databricks> deployment resides in the "us-east-1" region.
   * This is an optional field at cluster creation, and if not specified, a default zone will be used.
   * If the zone specified is "auto", will try to place cluster in a zone with high availability,
   * and will retry placement in a different AZ if there is not enough capacity.
   * See [[AutoAZHelper.scala]] for more details.
   * The list of available zones as well as the default value can be found by using the
   * `List Zones`_ method.
   */
  zoneId?: string | undefined;
  /**
   * Nodes for this cluster will only be placed on AWS instances with this instance profile. If
   * omitted, nodes will be placed on instances without an IAM instance profile. The instance
   * profile must have previously been added to the <Databricks> environment by an account
   * administrator.
   *
   * This feature may only be available to certain customer plans.
   *
   * ***internal
   * If this field is ommitted, we will pull in the default from the conf if it exists.
   */
  instanceProfileArn?: string | undefined;
  /**
   * The bid price for AWS spot instances, as a percentage of the corresponding instance type's
   * on-demand price.
   * For example, if this field is set to 50, and the cluster needs a new ``r3.xlarge`` spot
   * instance, then the bid price is half of the price of
   * on-demand ``r3.xlarge`` instances. Similarly, if this field is set to 200, the bid price is twice
   * the price of on-demand ``r3.xlarge`` instances. If not specified, the default value is 100.
   * When spot instances are requested for this cluster, only spot instances whose bid price
   * percentage matches this field will be considered.
   * Note that, for safety, we enforce this field to be no more than 10000.
   *
   * ***internal
   * The default value and documentation here should be kept consistent with
   * CommonConf.defaultSpotBidPricePercent and CommonConf.maxSpotBidPricePercent.
   */
  spotBidPricePercent?: number | undefined;
  /** The type of EBS volumes that will be launched with this cluster. */
  ebsVolumeType?: PipelinesEbsVolumeType | undefined;
  /**
   * The number of volumes launched for each instance. Users can choose up to 10 volumes.
   * This feature is only enabled for supported node types. Legacy node types cannot specify
   * custom EBS volumes.
   * For node types with no instance store, at least one EBS volume needs to be specified;
   * otherwise, cluster creation will fail.
   *
   * These EBS volumes will be mounted at ``/ebs0``, ``/ebs1``, and etc.
   * Instance store volumes will be mounted at ``/local_disk0``, ``/local_disk1``, and etc.
   *
   * If EBS volumes are attached, <Databricks> will configure Spark to use only the EBS volumes for
   * scratch storage because heterogeneously sized scratch devices can lead to inefficient disk
   * utilization. If no EBS volumes are attached, <Databricks> will configure Spark to use instance
   * store volumes.
   *
   * Please note that if EBS volumes are specified, then the Spark configuration ``spark.local.dir``
   * will be overridden.
   */
  ebsVolumeCount?: number | undefined;
  /**
   * The size of each EBS volume (in GiB) launched for each instance. For general purpose
   * SSD, this value must be within the range 100 - 4096. For throughput optimized HDD,
   * this value must be within the range 500 - 4096.
   */
  ebsVolumeSize?: number | undefined;
  ebsVolumeIops?: number | undefined;
  ebsVolumeThroughput?: number | undefined;
}

/** Attributes set during cluster creation which are related to Azure. */
export interface PipelinesAzureAttributes {
  /**
   * The first ``first_on_demand`` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, ``first_on_demand`` nodes will be placed on on-demand instances and the remainder will
   * be placed on ``availability`` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * Availability type used for all subsequent nodes past the ``first_on_demand`` ones.
   * Note: If ``first_on_demand`` is zero (which only happens on pool clusters), this availability
   * type will be used for the entire cluster.
   */
  availability?: PipelinesAzureAvailability | undefined;
  /**
   * The max bid price to be used for Azure spot instances.
   * The Max price for the bid cannot be higher than the on-demand price of the instance.
   * If not specified, the default value is -1, which specifies that the instance cannot be evicted
   * on the basis of price, and only on the basis of availability. Further, the value should > 0 or -1.
   */
  spotBidMaxPrice?: number | undefined;
}

/** Cluster log delivery config */
export interface PipelinesClusterLogConf {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * ``{ "dbfs" : { "destination" : "dbfs:/home/cluster_log" } }``
         */
        dbfs: PipelinesDbfsStorageInfo;
      }
    | undefined;
}

/** A storage location in DBFS */
export interface PipelinesDbfsStorageInfo {
  /** dbfs destination, e.g. ``dbfs:/my/path`` */
  destination?: string | undefined;
}

/**
 * The environment entity used to preserve serverless environment side panel, jobs' environment for non-notebook task, and SDP's environment for classic and serverless pipelines.
 * In this minimal environment spec, only pip dependencies are supported.
 */
export interface PipelinesEnvironment {
  /**
   * List of pip dependencies, as supported by the version of pip in this environment.
   * Each dependency is a pip requirement file line https://pip.pypa.io/en/stable/reference/requirements-file-format/
   * Allowed dependency could be <requirement specifier>, <archive url/path>, <local project path>(WSFS or Volumes in <Databricks>), <vcs project url>
   */
  dependencies?: string[] | undefined;
  /**
   * The environment version of the serverless Python environment used to execute
   * customer Python code. Each environment version includes a specific Python
   * version and a curated set of pre-installed libraries with defined versions,
   * providing a stable and reproducible execution environment.
   *
   * <Databricks> supports a three-year lifecycle for each environment version.
   * For available versions and their included packages, see
   * https://docs.databricks.com/aws/en/release-notes/serverless/environment-version/
   *
   * The value should be a string representing the environment version number, for example: `"4"`.
   */
  environmentVersion?: string | undefined;
}

/** Attributes set during cluster creation which are related to Gcp. */
export interface PipelinesGcpAttributes {
  /**
   * If provided, the cluster will impersonate the google service account when accessing
   * gcloud services (like GCS). The google service account
   * must have previously been added to the <Databricks> environment by an account
   * administrator.
   */
  googleServiceAccount?: string | undefined;
  /** boot disk size in GB */
  bootDiskSize?: number | undefined;
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if the former is unavailable.
   */
  availability?: PipelinesGcpAvailability | undefined;
  /**
   * Identifier for the availability zone in which the cluster resides.
   * This can be one of the following:
   * - "HA" => High availability, spread nodes across availability zones for a
   * <Databricks> deployment region [default].
   * - "AUTO" => <Databricks> picks an availability zone to schedule the cluster on.
   * - A GCP availability zone => Pick One of the available zones for (machine type + region) from
   * https://cloud.google.com/compute/docs/regions-zones.
   */
  zoneId?: string | undefined;
  /**
   * The number of local SSDs to attach to each worker and driver for this cluster. If left unspecified,
   * the default number of local SSDs for the node type will be used.
   *
   * NOTE: Each instance type can only support a certain number of attached local SSDs. The value
   * specified in local_ssd_count must be valid for BOTH the driver and worker instance type. See
   * GCP docs here:
   * https://cloud.google.com/compute/docs/disks#local_ssd_machine_type_restrictions
   *
   * Validation is performed at the RPC layer and the RPC will be rejected if the specified
   * local_ssd_count is invalid.
   */
  localSsdCount?: number | undefined;
}

/** Config for an individual init script */
export interface PipelinesInitScriptInfo {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * ``{ "dbfs" : { "destination" : "dbfs:/init-scripts/my_script.sh" } }``
         */
        dbfs: PipelinesDbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either region or endpoint should also be provided. e.g.
         * ``{ "s3": { "destination" : "s3://init-scripts/my_script.sh", "region" : "us-west-2" } }``
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * ``instance_profile_arn`` has permission to write data to the s3 destination.
         */
        s3: PipelinesS3StorageInfo;
      }
    | undefined;
}

/**
 * Write-only setting, available only in Create/Update calls. Specifies the user or service principal that the pipeline runs as. If not specified, the pipeline runs as the user who created the pipeline.
 *
 * Only `user_name` or `service_principal_name` can be specified. If both are specified, an error is thrown.
 */
export interface PipelinesJobRunAs {
  identity?:
    | {
        $case: 'userName';
        /** The email of an active workspace user. Users can only set this field to their own email. */
        userName: string;
      }
    | {
        $case: 'servicePrincipalName';
        /** Application ID of an active service principal. Setting this field requires the `servicePrincipal/user` role. */
        servicePrincipalName: string;
      }
    | undefined;
}

export interface PipelinesMavenLibrary {
  /** Gradle-style maven coordinates. For example: "org.jsoup:jsoup:1.7.2". */
  coordinates?: string | undefined;
  /**
   * Maven repo to install the Maven package from. If omitted, both Maven Central Repository
   * and Spark Packages are searched.
   */
  repo?: string | undefined;
  /**
   * List of dependencies to exclude. For example: `["slf4j:slf4j", "*:hadoop-client"]`.
   *
   * Maven dependency exclusions:
   * https://maven.apache.org/guides/introduction/introduction-to-optional-and-excludes-dependencies.html.
   */
  exclusions?: string[] | undefined;
}

/** A storage location in Amazon S3 */
export interface PipelinesS3StorageInfo {
  /**
   * S3 destination, e.g. ``s3://my-bucket/some-prefix`` Note that logs will be delivered using
   * cluster iam role, please make sure you set cluster iam role and the role has write access to the
   * destination. Please also note that you cannot use AWS keys to deliver logs.
   */
  destination?: string | undefined;
  /**
   * S3 region, e.g. ``us-west-2``. Either region or endpoint needs to be set. If both are set,
   * endpoint will be used.
   */
  region?: string | undefined;
  /**
   * S3 endpoint, e.g. ``https://s3-us-west-2.amazonaws.com``. Either region or endpoint needs to be set.
   * If both are set, endpoint will be used.
   */
  endpoint?: string | undefined;
  /** Flag to enable server side encryption, ``false`` by default. */
  enableEncryption?: boolean | undefined;
  /**
   * The encryption type, it could be ``sse-s3`` or ``sse-kms``. It will be used only when
   * encryption is enabled and the default type is ``sse-s3``.
   */
  encryptionType?: string | undefined;
  /** Kms key which will be used if encryption is enabled and encryption type is set to ``sse-kms``. */
  kmsKey?: string | undefined;
  /**
   * Set canned access control list for the logs, e.g. ``bucket-owner-full-control``.
   * If ``canned_cal`` is set, please make sure the cluster iam role has ``s3:PutObjectAcl`` permission on
   * the destination bucket and prefix. The full list of possible canned acl can be found at
   * http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl.
   * Please also note that by default only the object owner gets full controls. If you are using cross account
   * role for writing data, you may want to set ``bucket-owner-full-control`` to make bucket owner able to
   * read the logs.
   */
  cannedAcl?: string | undefined;
}

/** PG-specific catalog-level configuration parameters */
export interface PostgresCatalogConfig {
  /** Optional. The Postgres slot configuration to use for logical replication */
  slotConfig?: PostgresSlotConfig | undefined;
}

/** PostgresSlotConfig contains the configuration for a Postgres logical replication slot */
export interface PostgresSlotConfig {
  /** The name of the logical replication slot to use for the Postgres source */
  slotName?: string | undefined;
  /** The name of the publication to use for the Postgres source */
  publicationName?: string | undefined;
}

/** Specifies a replace_where predicate override for a replace where flow. */
export interface ReplaceWhereOverride {
  /** Name of the flow to apply this override to. */
  flowName?: string | undefined;
  /**
   * SQL predicate string to use as replace_where condition.
   * Example: `date = '2024-10-10' AND city = 'xyz'`
   */
  predicateOverride?: string | undefined;
}

export interface RestartWindow {
  /**
   * An integer between 0 and 23 denoting the start hour for the restart window in the 24-hour day.
   * Continuous pipeline restart is triggered only within a five-hour window starting at this hour.
   */
  startHour?: number | undefined;
  /**
   * Days of week in which the restart is allowed to happen (within a five-hour window starting at start_hour).
   * If not specified all days of the week will be used.
   */
  daysOfWeek?: DayOfWeek[] | undefined;
  /**
   * Time zone id of restart window. See https://docs.databricks.com/sql/language-manual/sql-ref-syntax-aux-conf-mgmt-set-timezone.html for details.
   * If not specified, UTC will be used.
   */
  timeZoneId?: string | undefined;
}

/** Configuration for rewinding a specific dataset. */
export interface RewindDatasetSpec {
  /** The identifier of the dataset (e.g., "main.foo.tbl1"). */
  identifier?: string | undefined;
  /** Whether to cascade the rewind to dependent datasets. Must be specified. */
  cascade?: boolean | undefined;
  /** Whether to reset checkpoints for this dataset. */
  resetCheckpoints?: boolean | undefined;
}

/** Information about a rewind being requested for this pipeline or some of the datasets in it. */
export interface RewindSpec {
  /**
   * The base timestamp to rewind to. Exactly one of rewind_timestamp or rewind_point_id must be
   * specified.
   */
  rewindTimestamp?: string | undefined;
  /** If true, this is a dry run and we should emit the RewindSummary but not perform the rewind. */
  dryRun?: boolean | undefined;
  /**
   * List of datasets to rewind with specific configuration for each. When not specified,
   * all datasets will be rewound with cascade = true and reset_checkpoints = true.
   */
  datasets?: RewindDatasetSpec[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ScdType {}

export interface Sequencing {
  /** the ID assigned by the data plane. */
  dataPlaneId?: DataPlaneId | undefined;
  /** A sequence number, unique and increasing per pipeline. */
  controlPlaneSeqNo?: bigint | undefined;
}

export interface SerializedException {
  /** Runtime class of the exception */
  className?: string | undefined;
  /** Exception message */
  message?: string | undefined;
  /** Stack trace consisting of a list of stack frames */
  stack?: StackFrame[] | undefined;
}

export interface SharepointOptions {
  /** Required. The SharePoint URL. */
  url?: string | undefined;
  /**
   * (Optional) The type of SharePoint entity to ingest.
   * If not specified, defaults to FILE.
   */
  entityType?: SharepointOptions_SharepointEntityType | undefined;
  /** (Optional) File ingestion options for processing files. */
  fileIngestionOptions?: FileIngestionOptions | undefined;
}

/** Smartsheet specific options for ingestion */
export interface SmartsheetOptions {
  /**
   * (Optional) When true, maps each column to its Smartsheet-declared type (Text/Number/Date/
   * Checkbox/etc.). Cells that do not conform to the declared type are set to NULL.
   * When false, all columns land as STRING. Use false for sheets with irregular data or columns
   * that frequently violate their own declared type.
   * If not specified, defaults to true.
   */
  enforceSchema?: boolean | undefined;
}

/** SourceCatalogConfig contains catalog-level custom configuration parameters for each source */
export interface SourceCatalogConfig {
  /** Source catalog name */
  sourceCatalog?: string | undefined;
  /** Configuration options for the source catalog */
  options?:
    | {
        $case: 'postgres';
        /** Postgres-specific catalog-level configuration parameters */
        postgres: PostgresCatalogConfig;
      }
    | undefined;
}

export interface SourceConfig {
  /** Catalog-level source configuration parameters */
  catalog?: SourceCatalogConfig | undefined;
  /**
   * Connector-specific top-level configuration. Values here act as defaults and
   * can be overridden by the same field in the object-level connector_options.
   */
  connectorConfig?:
    | {$case: 'googleAdsConfig'; googleAdsConfig: GoogleAdsConfig}
    | undefined;
}

export interface StackFrame {
  /** Class from which the method call originated */
  declaringClass?: string | undefined;
  /** Name of the method which was called */
  methodName?: string | undefined;
  /** File where the method is defined */
  fileName?: string | undefined;
  /** Line from which the method was called */
  lineNumber?: number | undefined;
}

export interface StartUpdateRequest {
  pipelineId?: string | undefined;
  /** If true, this update will reset all tables before running. */
  fullRefresh?: boolean | undefined;
  cause?: UpdateCause | undefined;
  /**
   * A list of tables to update without fullRefresh. If both refresh_selection and
   * full_refresh_selection are empty, this is a full graph update. Full Refresh on a table means
   * that the states of the table will be reset before the refresh.
   */
  refreshSelection?: string[] | undefined;
  /**
   * A list of tables to update with fullRefresh. If both refresh_selection and
   * full_refresh_selection are empty, this is a full graph update. Full Refresh on a table means
   * that the states of the table will be reset before the refresh.
   */
  fullRefreshSelection?: string[] | undefined;
  /**
   * A list of flows for which this update should reset the streaming checkpoint. This selection will not clear
   * the data in the flow's target table. Flows in this list may also appear in refresh_selection and full_refresh_selection.
   */
  resetCheckpointSelection?: string[] | undefined;
  /** If true, this update only validates the correctness of pipeline source code but does not materialize or publish any datasets. */
  validateOnly?: boolean | undefined;
  /**
   * The information about the requested rewind operation.
   * If specified this is a rewind mode update.
   */
  rewindSpec?: RewindSpec | undefined;
  /** Key/value map of parameters to pass to the pipeline execution */
  parameters?: Record<string, string> | undefined;
  /**
   * A list of predicate overrides for replace_where flows in this update.
   * Only replace_where flows may be specified. Flows not listed use their original predicate.
   */
  replaceWhereOverrides?: ReplaceWhereOverride[] | undefined;
}

export interface StartUpdateResponse {
  updateId?: string | undefined;
}

export interface StopPipelineRequest {
  pipelineId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StopPipelineResponse {}

/** TikTok Ads specific options for ingestion */
export interface TikTokAdsOptions {
  /**
   * (Optional) Number of days to look back for report tables during incremental sync
   * to capture late-arriving conversions and attribution data.
   */
  lookbackWindowDays?: number | undefined;
  /**
   * (Optional) Start date for the initial sync of report tables in YYYY-MM-DD format.
   * This determines the earliest date from which to sync historical data.
   */
  syncStartDate?: string | undefined;
  /** Deprecated. Use custom_report_options.dimensions instead. */
  dimensions?: string[] | undefined;
  /** Deprecated. Use custom_report_options.metrics instead. */
  metrics?: string[] | undefined;
  /** Deprecated. Use custom_report_options.report_type instead. */
  reportType?: TikTokAdsOptions_TikTokReportType | undefined;
  /** Deprecated. Use custom_report_options.data_level instead. */
  dataLevel?: TikTokAdsOptions_TikTokDataLevel | undefined;
  /** Deprecated. Use custom_report_options.query_lifetime instead. */
  queryLifetime?: boolean | undefined;
}

/** Specifies how to transform binary data into structured data. */
export interface Transformer {
  /** Required: the wire format of the data. */
  format?: Transformer_Format | undefined;
  /**
   * Format-specific configuration. Only required for JSON, Avro, and Protobuf.
   * STRING format requires no additional config.
   */
  config?:
    | {$case: 'jsonOptions'; jsonOptions: JsonTransformerOptions}
    | undefined;
}

/** Information about truncations applied to this event. */
export interface Truncation {
  /**
   * List of fields that were truncated from this event. If empty or absent,
   * no truncation occurred.
   */
  truncatedFields?: Truncation_TruncationDetail[] | undefined;
}

/** Details about a specific field that was truncated. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Truncation_TruncationDetail {
  /**
   * The name of the truncated field (e.g., "error").
   * Corresponds to field names in PipelineEvent.
   */
  fieldName?: string | undefined;
}

export interface UpdateInfo {
  /** The ID of the pipeline. */
  pipelineId?: string | undefined;
  /** The ID of this update. */
  updateId?: string | undefined;
  /**
   * The pipeline configuration with system defaults applied where unspecified by the user.
   * Not returned by ListUpdates.
   */
  config?: PipelineSpec | undefined;
  /** What triggered this update. */
  cause?: UpdateCause | undefined;
  /** The update state. */
  state?: UpdateState | undefined;
  /** The ID of the cluster that the update is running on. */
  clusterId?: string | undefined;
  /** The time when this update was created. */
  creationTime?: bigint | undefined;
  /** If true, this update will reset all tables before running. */
  fullRefresh?: boolean | undefined;
  /**
   * A list of tables to update without fullRefresh. If both refresh_selection and
   * full_refresh_selection are empty, this is a full graph update. Full Refresh on a table means
   * that the states of the table will be reset before the refresh.
   */
  refreshSelection?: string[] | undefined;
  /**
   * A list of tables to update with fullRefresh. If both refresh_selection and
   * full_refresh_selection are empty, this is a full graph update. Full Refresh on a table means
   * that the states of the table will be reset before the refresh.
   */
  fullRefreshSelection?: string[] | undefined;
  /** If true, this update only validates the correctness of pipeline source code but does not materialize or publish any datasets. */
  validateOnly?: boolean | undefined;
  /** Key/value map of parameters used to initiate the update */
  parameters?: Record<string, string> | undefined;
}

export interface UpdateStateInfo {
  updateId?: string | undefined;
  state?: UpdateState | undefined;
  creationTime?: string | undefined;
}

/** Zendesk Support specific options for ingestion */
export interface ZendeskSupportOptions {
  /**
   * (Optional) Start date in YYYY-MM-DD format for the initial sync.
   * This determines the earliest date from which to sync historical data.
   */
  startDate?: string | undefined;
}

export const unmarshalApplyEnvironmentResponseSchema: z.ZodType<ApplyEnvironmentResponse> =
  z.object({});

export const unmarshalAutoFullRefreshPolicySchema: z.ZodType<AutoFullRefreshPolicy> =
  z
    .object({
      enabled: z.boolean().optional(),
      min_interval_hours: z.number().optional(),
    })
    .transform(d => ({
      enabled: d.enabled,
      minIntervalHours: d.min_interval_hours,
    }));

export const unmarshalClonePipelineResponseSchema: z.ZodType<ClonePipelineResponse> =
  z
    .object({
      pipeline_id: z.string().optional(),
    })
    .transform(d => ({
      pipelineId: d.pipeline_id,
    }));

export const unmarshalConfluenceConnectorOptionsSchema: z.ZodType<ConfluenceConnectorOptions> =
  z
    .object({
      include_confluence_spaces: z.array(z.string()).optional(),
    })
    .transform(d => ({
      includeConfluenceSpaces: d.include_confluence_spaces,
    }));

export const unmarshalConnectionParametersSchema: z.ZodType<ConnectionParameters> =
  z
    .object({
      source_catalog: z.string().optional(),
    })
    .transform(d => ({
      sourceCatalog: d.source_catalog,
    }));

export const unmarshalConnectorOptionsSchema: z.ZodType<ConnectorOptions> = z
  .object({
    google_ads_options: z
      .lazy(() => unmarshalGoogleAdsOptionsSchema)
      .optional(),
    tiktok_ads_options: z
      .lazy(() => unmarshalTikTokAdsOptionsSchema)
      .optional(),
    sharepoint_options: z
      .lazy(() => unmarshalSharepointOptionsSchema)
      .optional(),
    gdrive_options: z.lazy(() => unmarshalGoogleDriveOptionsSchema).optional(),
    outlook_options: z.lazy(() => unmarshalOutlookOptionsSchema).optional(),
    smartsheet_options: z
      .lazy(() => unmarshalSmartsheetOptionsSchema)
      .optional(),
    jira_options: z.lazy(() => unmarshalJiraConnectorOptionsSchema).optional(),
    confluence_options: z
      .lazy(() => unmarshalConfluenceConnectorOptionsSchema)
      .optional(),
    meta_ads_options: z
      .lazy(() => unmarshalMetaMarketingOptionsSchema)
      .optional(),
    zendesk_support_options: z
      .lazy(() => unmarshalZendeskSupportOptionsSchema)
      .optional(),
    kafka_options: z.lazy(() => unmarshalKafkaOptionsSchema).optional(),
  })
  .transform(d => ({
    connectorOptions:
      d.google_ads_options !== undefined
        ? {
            $case: 'googleAdsOptions' as const,
            googleAdsOptions: d.google_ads_options,
          }
        : d.tiktok_ads_options !== undefined
          ? {
              $case: 'tiktokAdsOptions' as const,
              tiktokAdsOptions: d.tiktok_ads_options,
            }
          : d.sharepoint_options !== undefined
            ? {
                $case: 'sharepointOptions' as const,
                sharepointOptions: d.sharepoint_options,
              }
            : d.gdrive_options !== undefined
              ? {
                  $case: 'gdriveOptions' as const,
                  gdriveOptions: d.gdrive_options,
                }
              : d.outlook_options !== undefined
                ? {
                    $case: 'outlookOptions' as const,
                    outlookOptions: d.outlook_options,
                  }
                : d.smartsheet_options !== undefined
                  ? {
                      $case: 'smartsheetOptions' as const,
                      smartsheetOptions: d.smartsheet_options,
                    }
                  : d.jira_options !== undefined
                    ? {
                        $case: 'jiraOptions' as const,
                        jiraOptions: d.jira_options,
                      }
                    : d.confluence_options !== undefined
                      ? {
                          $case: 'confluenceOptions' as const,
                          confluenceOptions: d.confluence_options,
                        }
                      : d.meta_ads_options !== undefined
                        ? {
                            $case: 'metaAdsOptions' as const,
                            metaAdsOptions: d.meta_ads_options,
                          }
                        : d.zendesk_support_options !== undefined
                          ? {
                              $case: 'zendeskSupportOptions' as const,
                              zendeskSupportOptions: d.zendesk_support_options,
                            }
                          : d.kafka_options !== undefined
                            ? {
                                $case: 'kafkaOptions' as const,
                                kafkaOptions: d.kafka_options,
                              }
                            : undefined,
  }));

export const unmarshalCreatePipelineResponseSchema: z.ZodType<CreatePipelineResponse> =
  z
    .object({
      pipeline_id: z.string().optional(),
      effective_settings: z.lazy(() => unmarshalPipelineSpecSchema).optional(),
    })
    .transform(d => ({
      pipelineId: d.pipeline_id,
      effectiveSettings: d.effective_settings,
    }));

export const unmarshalCronTriggerSchema: z.ZodType<CronTrigger> = z
  .object({
    quartz_cron_schedule: z.string().optional(),
    timezone_id: z.string().optional(),
  })
  .transform(d => ({
    quartzCronSchedule: d.quartz_cron_schedule,
    timezoneId: d.timezone_id,
  }));

export const unmarshalDataPlaneIdSchema: z.ZodType<DataPlaneId> = z
  .object({
    instance: z.string().optional(),
    seq_no: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    instance: d.instance,
    seqNo: d.seq_no,
  }));

export const unmarshalDataStagingOptionsSchema: z.ZodType<DataStagingOptions> =
  z
    .object({
      catalog_name: z.string().optional(),
      schema_name: z.string().optional(),
      volume_name: z.string().optional(),
    })
    .transform(d => ({
      catalogName: d.catalog_name,
      schemaName: d.schema_name,
      volumeName: d.volume_name,
    }));

export const unmarshalDeletePipelineResponseSchema: z.ZodType<DeletePipelineResponse> =
  z.object({});

export const unmarshalEditPipelineResponseSchema: z.ZodType<EditPipelineResponse> =
  z.object({});

export const unmarshalErrorDetailSchema: z.ZodType<ErrorDetail> = z
  .object({
    exceptions: z
      .array(z.lazy(() => unmarshalSerializedExceptionSchema))
      .optional(),
    fatal: z.boolean().optional(),
  })
  .transform(d => ({
    exceptions: d.exceptions,
    fatal: d.fatal,
  }));

export const unmarshalEventLogSpecSchema: z.ZodType<EventLogSpec> = z
  .object({
    name: z.string().optional(),
    schema: z.string().optional(),
    catalog: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    schema: d.schema,
    catalog: d.catalog,
  }));

export const unmarshalFileFilterSchema: z.ZodType<FileFilter> = z
  .object({
    path_filter: z.string().optional(),
    modified_before: z.string().optional(),
    modified_after: z.string().optional(),
  })
  .transform(d => ({
    filter:
      d.path_filter !== undefined
        ? {$case: 'pathFilter' as const, pathFilter: d.path_filter}
        : d.modified_before !== undefined
          ? {
              $case: 'modifiedBefore' as const,
              modifiedBefore: d.modified_before,
            }
          : d.modified_after !== undefined
            ? {$case: 'modifiedAfter' as const, modifiedAfter: d.modified_after}
            : undefined,
  }));

export const unmarshalFileIngestionOptionsSchema: z.ZodType<FileIngestionOptions> =
  z
    .object({
      format: z.string().optional(),
      file_filters: z.array(z.lazy(() => unmarshalFileFilterSchema)).optional(),
      infer_column_types: z.boolean().optional(),
      schema_evolution_mode: z.string().optional(),
      schema_hints: z.string().optional(),
      ignore_corrupt_files: z.boolean().optional(),
      corrupt_record_column: z.string().optional(),
      rescued_data_column: z.string().optional(),
      single_variant_column: z.string().optional(),
      reader_case_sensitive: z.boolean().optional(),
      format_options: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      format: d.format,
      fileFilters: d.file_filters,
      inferColumnTypes: d.infer_column_types,
      schemaEvolutionMode: d.schema_evolution_mode,
      schemaHints: d.schema_hints,
      ignoreCorruptFiles: d.ignore_corrupt_files,
      corruptRecordColumn: d.corrupt_record_column,
      rescuedDataColumn: d.rescued_data_column,
      singleVariantColumn: d.single_variant_column,
      readerCaseSensitive: d.reader_case_sensitive,
      formatOptions: d.format_options,
    }));

export const unmarshalFiltersSchema: z.ZodType<Filters> = z
  .object({
    include: z.array(z.string()).optional(),
    exclude: z.array(z.string()).optional(),
  })
  .transform(d => ({
    include: d.include,
    exclude: d.exclude,
  }));

export const unmarshalGetPipelineResponseSchema: z.ZodType<GetPipelineResponse> =
  z
    .object({
      pipeline_id: z.string().optional(),
      spec: z.lazy(() => unmarshalPipelineSpecSchema).optional(),
      state: z.string().optional(),
      cause: z.string().optional(),
      cluster_id: z.string().optional(),
      name: z.string().optional(),
      health: z.string().optional(),
      creator_user_name: z.string().optional(),
      latest_updates: z
        .array(z.lazy(() => unmarshalUpdateStateInfoSchema))
        .optional(),
      last_modified: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      run_as_user_name: z.string().optional(),
      effective_budget_policy_id: z.string().optional(),
      effective_publishing_mode: z.string().optional(),
      run_as: z.lazy(() => unmarshalPipelinesJobRunAsSchema).optional(),
      parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      pipelineId: d.pipeline_id,
      spec: d.spec,
      state: d.state,
      cause: d.cause,
      clusterId: d.cluster_id,
      name: d.name,
      health: d.health,
      creatorUserName: d.creator_user_name,
      latestUpdates: d.latest_updates,
      lastModified: d.last_modified,
      runAsUserName: d.run_as_user_name,
      effectiveBudgetPolicyId: d.effective_budget_policy_id,
      effectivePublishingMode: d.effective_publishing_mode,
      runAs: d.run_as,
      parameters: d.parameters,
    }));

export const unmarshalGetUpdateResponseSchema: z.ZodType<GetUpdateResponse> = z
  .object({
    update: z.lazy(() => unmarshalUpdateInfoSchema).optional(),
  })
  .transform(d => ({
    update: d.update,
  }));

export const unmarshalGoogleAdsConfigSchema: z.ZodType<GoogleAdsConfig> = z
  .object({
    manager_account_id: z.string().optional(),
  })
  .transform(d => ({
    managerAccountId: d.manager_account_id,
  }));

export const unmarshalGoogleAdsOptionsSchema: z.ZodType<GoogleAdsOptions> = z
  .object({
    manager_account_id: z.string().optional(),
    lookback_window_days: z.number().optional(),
    sync_start_date: z.string().optional(),
  })
  .transform(d => ({
    managerAccountId: d.manager_account_id,
    lookbackWindowDays: d.lookback_window_days,
    syncStartDate: d.sync_start_date,
  }));

export const unmarshalGoogleDriveOptionsSchema: z.ZodType<GoogleDriveOptions> =
  z
    .object({
      url: z.string().optional(),
      entity_type: z.string().optional(),
      file_ingestion_options: z
        .lazy(() => unmarshalFileIngestionOptionsSchema)
        .optional(),
    })
    .transform(d => ({
      url: d.url,
      entityType: d.entity_type,
      fileIngestionOptions: d.file_ingestion_options,
    }));

export const unmarshalIngestionGatewayPipelineDefinitionSchema: z.ZodType<IngestionGatewayPipelineDefinition> =
  z
    .object({
      connection_name: z.string().optional(),
      connection_id: z.string().optional(),
      gateway_storage_catalog: z.string().optional(),
      gateway_storage_schema: z.string().optional(),
      gateway_storage_name: z.string().optional(),
      connection_parameters: z
        .lazy(() => unmarshalConnectionParametersSchema)
        .optional(),
    })
    .transform(d => ({
      connectionName: d.connection_name,
      connectionId: d.connection_id,
      gatewayStorageCatalog: d.gateway_storage_catalog,
      gatewayStorageSchema: d.gateway_storage_schema,
      gatewayStorageName: d.gateway_storage_name,
      connectionParameters: d.connection_parameters,
    }));

export const unmarshalIngestionPipelineDefinitionSchema: z.ZodType<IngestionPipelineDefinition> =
  z
    .object({
      connection_name: z.string().optional(),
      ingestion_gateway_id: z.string().optional(),
      ingest_from_uc_foreign_catalog: z.boolean().optional(),
      objects: z
        .array(
          z.lazy(
            () => unmarshalIngestionPipelineDefinition_IngestionConfigSchema
          )
        )
        .optional(),
      source_type: z.string().optional(),
      table_configuration: z
        .lazy(
          () => unmarshalIngestionPipelineDefinition_TableSpecificConfigSchema
        )
        .optional(),
      netsuite_jar_path: z.string().optional(),
      source_configurations: z
        .array(z.lazy(() => unmarshalSourceConfigSchema))
        .optional(),
      full_refresh_window: z
        .lazy(() => unmarshalOperationTimeWindowSchema)
        .optional(),
      connector_type: z.string().optional(),
      data_staging_options: z
        .lazy(() => unmarshalDataStagingOptionsSchema)
        .optional(),
    })
    .transform(d => ({
      source:
        d.connection_name !== undefined
          ? {
              $case: 'connectionName' as const,
              connectionName: d.connection_name,
            }
          : d.ingestion_gateway_id !== undefined
            ? {
                $case: 'ingestionGatewayId' as const,
                ingestionGatewayId: d.ingestion_gateway_id,
              }
            : d.ingest_from_uc_foreign_catalog !== undefined
              ? {
                  $case: 'ingestFromUcForeignCatalog' as const,
                  ingestFromUcForeignCatalog: d.ingest_from_uc_foreign_catalog,
                }
              : undefined,
      objects: d.objects,
      sourceType: d.source_type,
      tableConfiguration: d.table_configuration,
      netsuiteJarPath: d.netsuite_jar_path,
      sourceConfigurations: d.source_configurations,
      fullRefreshWindow: d.full_refresh_window,
      connectorType: d.connector_type,
      dataStagingOptions: d.data_staging_options,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngestionPipelineDefinition_IngestionConfigSchema: z.ZodType<IngestionPipelineDefinition_IngestionConfig> =
  z
    .object({
      schema: z
        .lazy(() => unmarshalIngestionPipelineDefinition_SchemaSpecSchema)
        .optional(),
      table: z
        .lazy(() => unmarshalIngestionPipelineDefinition_TableSpecSchema)
        .optional(),
      report: z
        .lazy(() => unmarshalIngestionPipelineDefinition_ReportSpecSchema)
        .optional(),
    })
    .transform(d => ({
      sourceTables:
        d.schema !== undefined
          ? {$case: 'schema' as const, schema: d.schema}
          : d.table !== undefined
            ? {$case: 'table' as const, table: d.table}
            : d.report !== undefined
              ? {$case: 'report' as const, report: d.report}
              : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngestionPipelineDefinition_ReportSpecSchema: z.ZodType<IngestionPipelineDefinition_ReportSpec> =
  z
    .object({
      source_url: z.string().optional(),
      destination_catalog: z.string().optional(),
      destination_schema: z.string().optional(),
      destination_table: z.string().optional(),
      table_configuration: z
        .lazy(
          () => unmarshalIngestionPipelineDefinition_TableSpecificConfigSchema
        )
        .optional(),
    })
    .transform(d => ({
      sourceUrl: d.source_url,
      destinationCatalog: d.destination_catalog,
      destinationSchema: d.destination_schema,
      destinationTable: d.destination_table,
      tableConfiguration: d.table_configuration,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngestionPipelineDefinition_SchemaSpecSchema: z.ZodType<IngestionPipelineDefinition_SchemaSpec> =
  z
    .object({
      source_catalog: z.string().optional(),
      source_schema: z.string().optional(),
      destination_catalog: z.string().optional(),
      destination_schema: z.string().optional(),
      table_configuration: z
        .lazy(
          () => unmarshalIngestionPipelineDefinition_TableSpecificConfigSchema
        )
        .optional(),
      connector_options: z
        .lazy(() => unmarshalConnectorOptionsSchema)
        .optional(),
    })
    .transform(d => ({
      sourceCatalog: d.source_catalog,
      sourceSchema: d.source_schema,
      destinationCatalog: d.destination_catalog,
      destinationSchema: d.destination_schema,
      tableConfiguration: d.table_configuration,
      connectorOptions: d.connector_options,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngestionPipelineDefinition_TableSpecSchema: z.ZodType<IngestionPipelineDefinition_TableSpec> =
  z
    .object({
      source_catalog: z.string().optional(),
      source_schema: z.string().optional(),
      source_table: z.string().optional(),
      destination_catalog: z.string().optional(),
      destination_schema: z.string().optional(),
      destination_table: z.string().optional(),
      table_configuration: z
        .lazy(
          () => unmarshalIngestionPipelineDefinition_TableSpecificConfigSchema
        )
        .optional(),
      connector_options: z
        .lazy(() => unmarshalConnectorOptionsSchema)
        .optional(),
    })
    .transform(d => ({
      sourceCatalog: d.source_catalog,
      sourceSchema: d.source_schema,
      sourceTable: d.source_table,
      destinationCatalog: d.destination_catalog,
      destinationSchema: d.destination_schema,
      destinationTable: d.destination_table,
      tableConfiguration: d.table_configuration,
      connectorOptions: d.connector_options,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngestionPipelineDefinition_TableSpecificConfigSchema: z.ZodType<IngestionPipelineDefinition_TableSpecificConfig> =
  z
    .object({
      scd_type: z.string().optional(),
      primary_keys: z.array(z.string()).optional(),
      sequence_by: z.array(z.string()).optional(),
      include_columns: z.array(z.string()).optional(),
      exclude_columns: z.array(z.string()).optional(),
      salesforce_include_formula_fields: z.boolean().optional(),
      workday_report_parameters: z
        .lazy(
          () =>
            unmarshalIngestionPipelineDefinition_WorkdayReportParametersSchema
        )
        .optional(),
      row_filter: z.string().optional(),
      query_based_connector_config: z
        .lazy(
          () =>
            unmarshalIngestionPipelineDefinition_TableSpecificConfig_QueryBasedConnectorConfigSchema
        )
        .optional(),
      auto_full_refresh_policy: z
        .lazy(() => unmarshalAutoFullRefreshPolicySchema)
        .optional(),
      table_properties: z.record(z.string(), z.string()).optional(),
      enable_auto_clustering: z.boolean().optional(),
      clustering_columns: z.array(z.string()).optional(),
    })
    .transform(d => ({
      scdType: d.scd_type,
      primaryKeys: d.primary_keys,
      sequenceBy: d.sequence_by,
      includeColumns: d.include_columns,
      excludeColumns: d.exclude_columns,
      salesforceIncludeFormulaFields: d.salesforce_include_formula_fields,
      workdayReportParameters: d.workday_report_parameters,
      rowFilter: d.row_filter,
      queryBasedConnectorConfig: d.query_based_connector_config,
      autoFullRefreshPolicy: d.auto_full_refresh_policy,
      tableProperties: d.table_properties,
      enableAutoClustering: d.enable_auto_clustering,
      clusteringColumns: d.clustering_columns,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngestionPipelineDefinition_TableSpecificConfig_QueryBasedConnectorConfigSchema: z.ZodType<IngestionPipelineDefinition_TableSpecificConfig_QueryBasedConnectorConfig> =
  z
    .object({
      cursor_columns: z.array(z.string()).optional(),
      deletion_condition: z.string().optional(),
      hard_deletion_sync_min_interval_in_seconds: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      cursorColumns: d.cursor_columns,
      deletionCondition: d.deletion_condition,
      hardDeletionSyncMinIntervalInSeconds:
        d.hard_deletion_sync_min_interval_in_seconds,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngestionPipelineDefinition_WorkdayReportParametersSchema: z.ZodType<IngestionPipelineDefinition_WorkdayReportParameters> =
  z
    .object({
      incremental: z.boolean().optional(),
      report_parameters: z
        .array(
          z.lazy(
            () =>
              unmarshalIngestionPipelineDefinition_WorkdayReportParameters_QueryKeyValueSchema
          )
        )
        .optional(),
      parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      incremental: d.incremental,
      reportParameters: d.report_parameters,
      parameters: d.parameters,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngestionPipelineDefinition_WorkdayReportParameters_QueryKeyValueSchema: z.ZodType<IngestionPipelineDefinition_WorkdayReportParameters_QueryKeyValue> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalJiraConnectorOptionsSchema: z.ZodType<JiraConnectorOptions> =
  z
    .object({
      include_jira_spaces: z.array(z.string()).optional(),
    })
    .transform(d => ({
      includeJiraSpaces: d.include_jira_spaces,
    }));

export const unmarshalJsonTransformerOptionsSchema: z.ZodType<JsonTransformerOptions> =
  z
    .object({
      as_variant: z.boolean().optional(),
      schema: z.string().optional(),
      schema_file_path: z.string().optional(),
      schema_evolution_mode: z.string().optional(),
      schema_hints: z.string().optional(),
    })
    .transform(d => ({
      asVariant: d.as_variant,
      schema: d.schema,
      schemaFilePath: d.schema_file_path,
      schemaEvolutionMode: d.schema_evolution_mode,
      schemaHints: d.schema_hints,
    }));

export const unmarshalKafkaOptionsSchema: z.ZodType<KafkaOptions> = z
  .object({
    topics: z.array(z.string()).optional(),
    topic_pattern: z.string().optional(),
    key_transformer: z.lazy(() => unmarshalTransformerSchema).optional(),
    value_transformer: z.lazy(() => unmarshalTransformerSchema).optional(),
    starting_offset: z.string().optional(),
    max_offsets_per_trigger: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    client_config: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    topics: d.topics,
    topicPattern: d.topic_pattern,
    keyTransformer: d.key_transformer,
    valueTransformer: d.value_transformer,
    startingOffset: d.starting_offset,
    maxOffsetsPerTrigger: d.max_offsets_per_trigger,
    clientConfig: d.client_config,
  }));

export const unmarshalListPipelineEventsResponseSchema: z.ZodType<ListPipelineEventsResponse> =
  z
    .object({
      events: z.array(z.lazy(() => unmarshalPipelineEventSchema)).optional(),
      next_page_token: z.string().optional(),
      prev_page_token: z.string().optional(),
    })
    .transform(d => ({
      events: d.events,
      nextPageToken: d.next_page_token,
      prevPageToken: d.prev_page_token,
    }));

export const unmarshalListPipelinesResponseSchema: z.ZodType<ListPipelinesResponse> =
  z
    .object({
      statuses: z
        .array(z.lazy(() => unmarshalPipelineStateInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      statuses: d.statuses,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListUpdatesResponseSchema: z.ZodType<ListUpdatesResponse> =
  z
    .object({
      updates: z.array(z.lazy(() => unmarshalUpdateInfoSchema)).optional(),
      next_page_token: z.string().optional(),
      prev_page_token: z.string().optional(),
    })
    .transform(d => ({
      updates: d.updates,
      nextPageToken: d.next_page_token,
      prevPageToken: d.prev_page_token,
    }));

export const unmarshalManualTriggerSchema: z.ZodType<ManualTrigger> = z.object(
  {}
);

export const unmarshalMetaMarketingOptionsSchema: z.ZodType<MetaMarketingOptions> =
  z
    .object({
      level: z.string().optional(),
      breakdowns: z.array(z.string()).optional(),
      action_breakdowns: z.array(z.string()).optional(),
      action_report_time: z.string().optional(),
      start_date: z.string().optional(),
      custom_insights_lookback_window: z.number().optional(),
      time_increment: z.string().optional(),
      action_attribution_windows: z.array(z.string()).optional(),
    })
    .transform(d => ({
      level: d.level,
      breakdowns: d.breakdowns,
      actionBreakdowns: d.action_breakdowns,
      actionReportTime: d.action_report_time,
      startDate: d.start_date,
      customInsightsLookbackWindow: d.custom_insights_lookback_window,
      timeIncrement: d.time_increment,
      actionAttributionWindows: d.action_attribution_windows,
    }));

export const unmarshalNotebookLibrarySchema: z.ZodType<NotebookLibrary> = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

export const unmarshalNotificationsSchema: z.ZodType<Notifications> = z
  .object({
    email_recipients: z.array(z.string()).optional(),
    alerts: z.array(z.string()).optional(),
  })
  .transform(d => ({
    emailRecipients: d.email_recipients,
    alerts: d.alerts,
  }));

export const unmarshalOperationTimeWindowSchema: z.ZodType<OperationTimeWindow> =
  z
    .object({
      start_hour: z.number().optional(),
      days_of_week: z.array(z.string()).optional(),
      time_zone_id: z.string().optional(),
    })
    .transform(d => ({
      startHour: d.start_hour,
      daysOfWeek: d.days_of_week,
      timeZoneId: d.time_zone_id,
    }));

export const unmarshalOriginSchema: z.ZodType<Origin> = z
  .object({
    cloud: z.string().optional(),
    region: z.string().optional(),
    org_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    pipeline_id: z.string().optional(),
    pipeline_name: z.string().optional(),
    cluster_id: z.string().optional(),
    update_id: z.string().optional(),
    maintenance_id: z.string().optional(),
    table_id: z.string().optional(),
    dataset_name: z.string().optional(),
    flow_id: z.string().optional(),
    flow_name: z.string().optional(),
    batch_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    request_id: z.string().optional(),
    uc_resource_id: z.string().optional(),
    host: z.string().optional(),
    materialization_name: z.string().optional(),
    ingestion_source_connection_name: z.string().optional(),
    ingestion_source_catalog_name: z.string().optional(),
    ingestion_source_schema_name: z.string().optional(),
    ingestion_source_table_name: z.string().optional(),
    ingestion_source_table_version: z.string().optional(),
  })
  .transform(d => ({
    cloud: d.cloud,
    region: d.region,
    orgId: d.org_id,
    pipelineId: d.pipeline_id,
    pipelineName: d.pipeline_name,
    clusterId: d.cluster_id,
    updateId: d.update_id,
    maintenanceId: d.maintenance_id,
    tableId: d.table_id,
    datasetName: d.dataset_name,
    flowId: d.flow_id,
    flowName: d.flow_name,
    batchId: d.batch_id,
    requestId: d.request_id,
    ucResourceId: d.uc_resource_id,
    host: d.host,
    materializationName: d.materialization_name,
    ingestionSourceConnectionName: d.ingestion_source_connection_name,
    ingestionSourceCatalogName: d.ingestion_source_catalog_name,
    ingestionSourceSchemaName: d.ingestion_source_schema_name,
    ingestionSourceTableName: d.ingestion_source_table_name,
    ingestionSourceTableVersion: d.ingestion_source_table_version,
  }));

export const unmarshalOutlookOptionsSchema: z.ZodType<OutlookOptions> = z
  .object({
    folder_filter: z.array(z.string()).optional(),
    sender_filter: z.array(z.string()).optional(),
    subject_filter: z.array(z.string()).optional(),
    start_date: z.string().optional(),
    body_format: z.string().optional(),
    attachment_mode: z.string().optional(),
    include_mailboxes: z.array(z.string()).optional(),
    include_folders: z.array(z.string()).optional(),
    include_senders: z.array(z.string()).optional(),
    include_subjects: z.array(z.string()).optional(),
  })
  .transform(d => ({
    folderFilter: d.folder_filter,
    senderFilter: d.sender_filter,
    subjectFilter: d.subject_filter,
    startDate: d.start_date,
    bodyFormat: d.body_format,
    attachmentMode: d.attachment_mode,
    includeMailboxes: d.include_mailboxes,
    includeFolders: d.include_folders,
    includeSenders: d.include_senders,
    includeSubjects: d.include_subjects,
  }));

export const unmarshalPathPatternSchema: z.ZodType<PathPattern> = z
  .object({
    include: z.string().optional(),
  })
  .transform(d => ({
    include: d.include,
  }));

export const unmarshalPipelineClusterSchema: z.ZodType<PipelineCluster> = z
  .object({
    label: z.string().optional(),
    apply_policy_default_values: z.boolean().optional(),
    spark_conf: z.record(z.string(), z.string()).optional(),
    aws_attributes: z
      .lazy(() => unmarshalPipelinesAwsAttributesSchema)
      .optional(),
    azure_attributes: z
      .lazy(() => unmarshalPipelinesAzureAttributesSchema)
      .optional(),
    gcp_attributes: z
      .lazy(() => unmarshalPipelinesGcpAttributesSchema)
      .optional(),
    node_type_id: z.string().optional(),
    driver_node_type_id: z.string().optional(),
    ssh_public_keys: z.array(z.string()).optional(),
    custom_tags: z.record(z.string(), z.string()).optional(),
    cluster_log_conf: z
      .lazy(() => unmarshalPipelinesClusterLogConfSchema)
      .optional(),
    spark_env_vars: z.record(z.string(), z.string()).optional(),
    init_scripts: z
      .array(z.lazy(() => unmarshalPipelinesInitScriptInfoSchema))
      .optional(),
    instance_pool_id: z.string().optional(),
    policy_id: z.string().optional(),
    enable_local_disk_encryption: z.boolean().optional(),
    driver_instance_pool_id: z.string().optional(),
    num_workers: z.number().optional(),
    autoscale: z.lazy(() => unmarshalPipelinesAutoScaleSchema).optional(),
  })
  .transform(d => ({
    label: d.label,
    applyPolicyDefaultValues: d.apply_policy_default_values,
    sparkConf: d.spark_conf,
    awsAttributes: d.aws_attributes,
    azureAttributes: d.azure_attributes,
    gcpAttributes: d.gcp_attributes,
    nodeTypeId: d.node_type_id,
    driverNodeTypeId: d.driver_node_type_id,
    sshPublicKeys: d.ssh_public_keys,
    customTags: d.custom_tags,
    clusterLogConf: d.cluster_log_conf,
    sparkEnvVars: d.spark_env_vars,
    initScripts: d.init_scripts,
    instancePoolId: d.instance_pool_id,
    policyId: d.policy_id,
    enableLocalDiskEncryption: d.enable_local_disk_encryption,
    driverInstancePoolId: d.driver_instance_pool_id,
    size:
      d.num_workers !== undefined
        ? {$case: 'numWorkers' as const, numWorkers: d.num_workers}
        : d.autoscale !== undefined
          ? {$case: 'autoscale' as const, autoscale: d.autoscale}
          : undefined,
  }));

export const unmarshalPipelineDeploymentSchema: z.ZodType<PipelineDeployment> =
  z
    .object({
      kind: z.string().optional(),
      metadata_file_path: z.string().optional(),
      deployment_id: z.string().optional(),
      version_id: z.string().optional(),
    })
    .transform(d => ({
      kind: d.kind,
      metadataFilePath: d.metadata_file_path,
      deploymentId: d.deployment_id,
      versionId: d.version_id,
    }));

export const unmarshalPipelineEventSchema: z.ZodType<PipelineEvent> = z
  .object({
    id: z.string().optional(),
    sequence: z.lazy(() => unmarshalSequencingSchema).optional(),
    origin: z.lazy(() => unmarshalOriginSchema).optional(),
    timestamp: z.string().optional(),
    message: z.string().optional(),
    level: z.string().optional(),
    error: z.lazy(() => unmarshalErrorDetailSchema).optional(),
    event_type: z.string().optional(),
    maturity_level: z.string().optional(),
    truncation: z.lazy(() => unmarshalTruncationSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    sequence: d.sequence,
    origin: d.origin,
    timestamp: d.timestamp,
    message: d.message,
    level: d.level,
    error: d.error,
    eventType: d.event_type,
    maturityLevel: d.maturity_level,
    truncation: d.truncation,
  }));

export const unmarshalPipelineLibrarySchema: z.ZodType<PipelineLibrary> = z
  .object({
    jar: z.string().optional(),
    maven: z.lazy(() => unmarshalPipelinesMavenLibrarySchema).optional(),
    whl: z.string().optional(),
    notebook: z.lazy(() => unmarshalNotebookLibrarySchema).optional(),
    file: z.lazy(() => unmarshalNotebookLibrarySchema).optional(),
    glob: z.lazy(() => unmarshalPathPatternSchema).optional(),
  })
  .transform(d => ({
    lib:
      d.jar !== undefined
        ? {$case: 'jar' as const, jar: d.jar}
        : d.maven !== undefined
          ? {$case: 'maven' as const, maven: d.maven}
          : d.whl !== undefined
            ? {$case: 'whl' as const, whl: d.whl}
            : d.notebook !== undefined
              ? {$case: 'notebook' as const, notebook: d.notebook}
              : d.file !== undefined
                ? {$case: 'file' as const, file: d.file}
                : d.glob !== undefined
                  ? {$case: 'glob' as const, glob: d.glob}
                  : undefined,
  }));

export const unmarshalPipelineSpecSchema: z.ZodType<PipelineSpec> = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    storage: z.string().optional(),
    configuration: z.record(z.string(), z.string()).optional(),
    clusters: z.array(z.lazy(() => unmarshalPipelineClusterSchema)).optional(),
    libraries: z.array(z.lazy(() => unmarshalPipelineLibrarySchema)).optional(),
    ingestion_definition: z
      .lazy(() => unmarshalIngestionPipelineDefinitionSchema)
      .optional(),
    gateway_definition: z
      .lazy(() => unmarshalIngestionGatewayPipelineDefinitionSchema)
      .optional(),
    trigger: z.lazy(() => unmarshalPipelineTriggerSchema).optional(),
    target: z.string().optional(),
    schema: z.string().optional(),
    filters: z.lazy(() => unmarshalFiltersSchema).optional(),
    continuous: z.boolean().optional(),
    development: z.boolean().optional(),
    photon: z.boolean().optional(),
    edition: z.string().optional(),
    channel: z.string().optional(),
    catalog: z.string().optional(),
    notifications: z
      .array(z.lazy(() => unmarshalNotificationsSchema))
      .optional(),
    serverless: z.boolean().optional(),
    deployment: z.lazy(() => unmarshalPipelineDeploymentSchema).optional(),
    restart_window: z.lazy(() => unmarshalRestartWindowSchema).optional(),
    budget_policy_id: z.string().optional(),
    tags: z.record(z.string(), z.string()).optional(),
    event_log: z.lazy(() => unmarshalEventLogSpecSchema).optional(),
    root_path: z.string().optional(),
    environment: z.lazy(() => unmarshalPipelinesEnvironmentSchema).optional(),
    usage_policy_id: z.string().optional(),
    serverless_compute_id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    storage: d.storage,
    configuration: d.configuration,
    clusters: d.clusters,
    libraries: d.libraries,
    ingestionDefinition: d.ingestion_definition,
    gatewayDefinition: d.gateway_definition,
    trigger: d.trigger,
    target: d.target,
    schema: d.schema,
    filters: d.filters,
    continuous: d.continuous,
    development: d.development,
    photon: d.photon,
    edition: d.edition,
    channel: d.channel,
    catalog: d.catalog,
    notifications: d.notifications,
    serverless: d.serverless,
    deployment: d.deployment,
    restartWindow: d.restart_window,
    budgetPolicyId: d.budget_policy_id,
    tags: d.tags,
    eventLog: d.event_log,
    rootPath: d.root_path,
    environment: d.environment,
    usagePolicyId: d.usage_policy_id,
    serverlessComputeId: d.serverless_compute_id,
  }));

export const unmarshalPipelineStateInfoSchema: z.ZodType<PipelineStateInfo> = z
  .object({
    pipeline_id: z.string().optional(),
    state: z.string().optional(),
    cluster_id: z.string().optional(),
    name: z.string().optional(),
    latest_updates: z
      .array(z.lazy(() => unmarshalUpdateStateInfoSchema))
      .optional(),
    creator_user_name: z.string().optional(),
    run_as_user_name: z.string().optional(),
    health: z.string().optional(),
  })
  .transform(d => ({
    pipelineId: d.pipeline_id,
    state: d.state,
    clusterId: d.cluster_id,
    name: d.name,
    latestUpdates: d.latest_updates,
    creatorUserName: d.creator_user_name,
    runAsUserName: d.run_as_user_name,
    health: d.health,
  }));

export const unmarshalPipelineTriggerSchema: z.ZodType<PipelineTrigger> = z
  .object({
    manual: z.lazy(() => unmarshalManualTriggerSchema).optional(),
    cron: z.lazy(() => unmarshalCronTriggerSchema).optional(),
  })
  .transform(d => ({
    trigger:
      d.manual !== undefined
        ? {$case: 'manual' as const, manual: d.manual}
        : d.cron !== undefined
          ? {$case: 'cron' as const, cron: d.cron}
          : undefined,
  }));

export const unmarshalPipelinesAutoScaleSchema: z.ZodType<PipelinesAutoScale> =
  z
    .object({
      min_workers: z.number().optional(),
      max_workers: z.number().optional(),
      mode: z.string().optional(),
    })
    .transform(d => ({
      minWorkers: d.min_workers,
      maxWorkers: d.max_workers,
      mode: d.mode,
    }));

export const unmarshalPipelinesAwsAttributesSchema: z.ZodType<PipelinesAwsAttributes> =
  z
    .object({
      first_on_demand: z.number().optional(),
      availability: z.string().optional(),
      zone_id: z.string().optional(),
      instance_profile_arn: z.string().optional(),
      spot_bid_price_percent: z.number().optional(),
      ebs_volume_type: z.string().optional(),
      ebs_volume_count: z.number().optional(),
      ebs_volume_size: z.number().optional(),
      ebs_volume_iops: z.number().optional(),
      ebs_volume_throughput: z.number().optional(),
    })
    .transform(d => ({
      firstOnDemand: d.first_on_demand,
      availability: d.availability,
      zoneId: d.zone_id,
      instanceProfileArn: d.instance_profile_arn,
      spotBidPricePercent: d.spot_bid_price_percent,
      ebsVolumeType: d.ebs_volume_type,
      ebsVolumeCount: d.ebs_volume_count,
      ebsVolumeSize: d.ebs_volume_size,
      ebsVolumeIops: d.ebs_volume_iops,
      ebsVolumeThroughput: d.ebs_volume_throughput,
    }));

export const unmarshalPipelinesAzureAttributesSchema: z.ZodType<PipelinesAzureAttributes> =
  z
    .object({
      first_on_demand: z.number().optional(),
      availability: z.string().optional(),
      spot_bid_max_price: z.number().optional(),
    })
    .transform(d => ({
      firstOnDemand: d.first_on_demand,
      availability: d.availability,
      spotBidMaxPrice: d.spot_bid_max_price,
    }));

export const unmarshalPipelinesClusterLogConfSchema: z.ZodType<PipelinesClusterLogConf> =
  z
    .object({
      dbfs: z.lazy(() => unmarshalPipelinesDbfsStorageInfoSchema).optional(),
    })
    .transform(d => ({
      storageInfo:
        d.dbfs !== undefined
          ? {$case: 'dbfs' as const, dbfs: d.dbfs}
          : undefined,
    }));

export const unmarshalPipelinesDbfsStorageInfoSchema: z.ZodType<PipelinesDbfsStorageInfo> =
  z
    .object({
      destination: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
    }));

export const unmarshalPipelinesEnvironmentSchema: z.ZodType<PipelinesEnvironment> =
  z
    .object({
      dependencies: z.array(z.string()).optional(),
      environment_version: z.string().optional(),
    })
    .transform(d => ({
      dependencies: d.dependencies,
      environmentVersion: d.environment_version,
    }));

export const unmarshalPipelinesGcpAttributesSchema: z.ZodType<PipelinesGcpAttributes> =
  z
    .object({
      google_service_account: z.string().optional(),
      boot_disk_size: z.number().optional(),
      availability: z.string().optional(),
      zone_id: z.string().optional(),
      local_ssd_count: z.number().optional(),
    })
    .transform(d => ({
      googleServiceAccount: d.google_service_account,
      bootDiskSize: d.boot_disk_size,
      availability: d.availability,
      zoneId: d.zone_id,
      localSsdCount: d.local_ssd_count,
    }));

export const unmarshalPipelinesInitScriptInfoSchema: z.ZodType<PipelinesInitScriptInfo> =
  z
    .object({
      dbfs: z.lazy(() => unmarshalPipelinesDbfsStorageInfoSchema).optional(),
      s3: z.lazy(() => unmarshalPipelinesS3StorageInfoSchema).optional(),
    })
    .transform(d => ({
      storageInfo:
        d.dbfs !== undefined
          ? {$case: 'dbfs' as const, dbfs: d.dbfs}
          : d.s3 !== undefined
            ? {$case: 's3' as const, s3: d.s3}
            : undefined,
    }));

export const unmarshalPipelinesJobRunAsSchema: z.ZodType<PipelinesJobRunAs> = z
  .object({
    user_name: z.string().optional(),
    service_principal_name: z.string().optional(),
  })
  .transform(d => ({
    identity:
      d.user_name !== undefined
        ? {$case: 'userName' as const, userName: d.user_name}
        : d.service_principal_name !== undefined
          ? {
              $case: 'servicePrincipalName' as const,
              servicePrincipalName: d.service_principal_name,
            }
          : undefined,
  }));

export const unmarshalPipelinesMavenLibrarySchema: z.ZodType<PipelinesMavenLibrary> =
  z
    .object({
      coordinates: z.string().optional(),
      repo: z.string().optional(),
      exclusions: z.array(z.string()).optional(),
    })
    .transform(d => ({
      coordinates: d.coordinates,
      repo: d.repo,
      exclusions: d.exclusions,
    }));

export const unmarshalPipelinesS3StorageInfoSchema: z.ZodType<PipelinesS3StorageInfo> =
  z
    .object({
      destination: z.string().optional(),
      region: z.string().optional(),
      endpoint: z.string().optional(),
      enable_encryption: z.boolean().optional(),
      encryption_type: z.string().optional(),
      kms_key: z.string().optional(),
      canned_acl: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
      region: d.region,
      endpoint: d.endpoint,
      enableEncryption: d.enable_encryption,
      encryptionType: d.encryption_type,
      kmsKey: d.kms_key,
      cannedAcl: d.canned_acl,
    }));

export const unmarshalPostgresCatalogConfigSchema: z.ZodType<PostgresCatalogConfig> =
  z
    .object({
      slot_config: z.lazy(() => unmarshalPostgresSlotConfigSchema).optional(),
    })
    .transform(d => ({
      slotConfig: d.slot_config,
    }));

export const unmarshalPostgresSlotConfigSchema: z.ZodType<PostgresSlotConfig> =
  z
    .object({
      slot_name: z.string().optional(),
      publication_name: z.string().optional(),
    })
    .transform(d => ({
      slotName: d.slot_name,
      publicationName: d.publication_name,
    }));

export const unmarshalRestartWindowSchema: z.ZodType<RestartWindow> = z
  .object({
    start_hour: z.number().optional(),
    days_of_week: z.array(z.string()).optional(),
    time_zone_id: z.string().optional(),
  })
  .transform(d => ({
    startHour: d.start_hour,
    daysOfWeek: d.days_of_week,
    timeZoneId: d.time_zone_id,
  }));

export const unmarshalSequencingSchema: z.ZodType<Sequencing> = z
  .object({
    data_plane_id: z.lazy(() => unmarshalDataPlaneIdSchema).optional(),
    control_plane_seq_no: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    dataPlaneId: d.data_plane_id,
    controlPlaneSeqNo: d.control_plane_seq_no,
  }));

export const unmarshalSerializedExceptionSchema: z.ZodType<SerializedException> =
  z
    .object({
      class_name: z.string().optional(),
      message: z.string().optional(),
      stack: z.array(z.lazy(() => unmarshalStackFrameSchema)).optional(),
    })
    .transform(d => ({
      className: d.class_name,
      message: d.message,
      stack: d.stack,
    }));

export const unmarshalSharepointOptionsSchema: z.ZodType<SharepointOptions> = z
  .object({
    url: z.string().optional(),
    entity_type: z.string().optional(),
    file_ingestion_options: z
      .lazy(() => unmarshalFileIngestionOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    url: d.url,
    entityType: d.entity_type,
    fileIngestionOptions: d.file_ingestion_options,
  }));

export const unmarshalSmartsheetOptionsSchema: z.ZodType<SmartsheetOptions> = z
  .object({
    enforce_schema: z.boolean().optional(),
  })
  .transform(d => ({
    enforceSchema: d.enforce_schema,
  }));

export const unmarshalSourceCatalogConfigSchema: z.ZodType<SourceCatalogConfig> =
  z
    .object({
      source_catalog: z.string().optional(),
      postgres: z.lazy(() => unmarshalPostgresCatalogConfigSchema).optional(),
    })
    .transform(d => ({
      sourceCatalog: d.source_catalog,
      options:
        d.postgres !== undefined
          ? {$case: 'postgres' as const, postgres: d.postgres}
          : undefined,
    }));

export const unmarshalSourceConfigSchema: z.ZodType<SourceConfig> = z
  .object({
    catalog: z.lazy(() => unmarshalSourceCatalogConfigSchema).optional(),
    google_ads_config: z.lazy(() => unmarshalGoogleAdsConfigSchema).optional(),
  })
  .transform(d => ({
    catalog: d.catalog,
    connectorConfig:
      d.google_ads_config !== undefined
        ? {
            $case: 'googleAdsConfig' as const,
            googleAdsConfig: d.google_ads_config,
          }
        : undefined,
  }));

export const unmarshalStackFrameSchema: z.ZodType<StackFrame> = z
  .object({
    declaring_class: z.string().optional(),
    method_name: z.string().optional(),
    file_name: z.string().optional(),
    line_number: z.number().optional(),
  })
  .transform(d => ({
    declaringClass: d.declaring_class,
    methodName: d.method_name,
    fileName: d.file_name,
    lineNumber: d.line_number,
  }));

export const unmarshalStartUpdateResponseSchema: z.ZodType<StartUpdateResponse> =
  z
    .object({
      update_id: z.string().optional(),
    })
    .transform(d => ({
      updateId: d.update_id,
    }));

export const unmarshalStopPipelineResponseSchema: z.ZodType<StopPipelineResponse> =
  z.object({});

export const unmarshalTikTokAdsOptionsSchema: z.ZodType<TikTokAdsOptions> = z
  .object({
    lookback_window_days: z.number().optional(),
    sync_start_date: z.string().optional(),
    dimensions: z.array(z.string()).optional(),
    metrics: z.array(z.string()).optional(),
    report_type: z.string().optional(),
    data_level: z.string().optional(),
    query_lifetime: z.boolean().optional(),
  })
  .transform(d => ({
    lookbackWindowDays: d.lookback_window_days,
    syncStartDate: d.sync_start_date,
    dimensions: d.dimensions,
    metrics: d.metrics,
    reportType: d.report_type,
    dataLevel: d.data_level,
    queryLifetime: d.query_lifetime,
  }));

export const unmarshalTransformerSchema: z.ZodType<Transformer> = z
  .object({
    format: z.string().optional(),
    json_options: z
      .lazy(() => unmarshalJsonTransformerOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    format: d.format,
    config:
      d.json_options !== undefined
        ? {$case: 'jsonOptions' as const, jsonOptions: d.json_options}
        : undefined,
  }));

export const unmarshalTruncationSchema: z.ZodType<Truncation> = z
  .object({
    truncated_fields: z
      .array(z.lazy(() => unmarshalTruncation_TruncationDetailSchema))
      .optional(),
  })
  .transform(d => ({
    truncatedFields: d.truncated_fields,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalTruncation_TruncationDetailSchema: z.ZodType<Truncation_TruncationDetail> =
  z
    .object({
      field_name: z.string().optional(),
    })
    .transform(d => ({
      fieldName: d.field_name,
    }));

export const unmarshalUpdateInfoSchema: z.ZodType<UpdateInfo> = z
  .object({
    pipeline_id: z.string().optional(),
    update_id: z.string().optional(),
    config: z.lazy(() => unmarshalPipelineSpecSchema).optional(),
    cause: z.string().optional(),
    state: z.string().optional(),
    cluster_id: z.string().optional(),
    creation_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    full_refresh: z.boolean().optional(),
    refresh_selection: z.array(z.string()).optional(),
    full_refresh_selection: z.array(z.string()).optional(),
    validate_only: z.boolean().optional(),
    parameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    pipelineId: d.pipeline_id,
    updateId: d.update_id,
    config: d.config,
    cause: d.cause,
    state: d.state,
    clusterId: d.cluster_id,
    creationTime: d.creation_time,
    fullRefresh: d.full_refresh,
    refreshSelection: d.refresh_selection,
    fullRefreshSelection: d.full_refresh_selection,
    validateOnly: d.validate_only,
    parameters: d.parameters,
  }));

export const unmarshalUpdateStateInfoSchema: z.ZodType<UpdateStateInfo> = z
  .object({
    update_id: z.string().optional(),
    state: z.string().optional(),
    creation_time: z.string().optional(),
  })
  .transform(d => ({
    updateId: d.update_id,
    state: d.state,
    creationTime: d.creation_time,
  }));

export const unmarshalZendeskSupportOptionsSchema: z.ZodType<ZendeskSupportOptions> =
  z
    .object({
      start_date: z.string().optional(),
    })
    .transform(d => ({
      startDate: d.start_date,
    }));

export const marshalApplyEnvironmentRequestSchema: z.ZodType = z
  .object({
    pipelineId: z.string().optional(),
  })
  .transform(d => ({
    pipeline_id: d.pipelineId,
  }));

export const marshalClonePipelineRequestSchema: z.ZodType = z
  .object({
    pipelineId: z.string().optional(),
    expectedLastModified: z.bigint().optional(),
    allowDuplicateNames: z.boolean().optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    storage: z.string().optional(),
    configuration: z.record(z.string(), z.string()).optional(),
    clusters: z
      .array(z.lazy(() => marshalCreatePipelineClusterSchema))
      .optional(),
    libraries: z
      .array(z.lazy(() => marshalCreatePipelineLibrarySchema))
      .optional(),
    ingestionDefinition: z
      .lazy(() => marshalCreateIngestionPipelineDefinitionSchema)
      .optional(),
    gatewayDefinition: z
      .lazy(() => marshalCreateIngestionGatewayPipelineDefinitionSchema)
      .optional(),
    trigger: z.lazy(() => marshalCreatePipelineTriggerSchema).optional(),
    target: z.string().optional(),
    schema: z.string().optional(),
    filters: z.lazy(() => marshalCreateFiltersSchema).optional(),
    continuous: z.boolean().optional(),
    development: z.boolean().optional(),
    photon: z.boolean().optional(),
    edition: z.string().optional(),
    channel: z.string().optional(),
    catalog: z.string().optional(),
    notifications: z
      .array(z.lazy(() => marshalCreateNotificationsSchema))
      .optional(),
    serverless: z.boolean().optional(),
    deployment: z.lazy(() => marshalCreatePipelineDeploymentSchema).optional(),
    restartWindow: z.lazy(() => marshalCreateRestartWindowSchema).optional(),
    budgetPolicyId: z.string().optional(),
    tags: z.record(z.string(), z.string()).optional(),
    eventLog: z.lazy(() => marshalCreateEventLogSpecSchema).optional(),
    rootPath: z.string().optional(),
    environment: z
      .lazy(() => marshalCreatePipelinesEnvironmentSchema)
      .optional(),
    usagePolicyId: z.string().optional(),
    serverlessComputeId: z.string().optional(),
    cloneMode: z.string().optional(),
  })
  .transform(d => ({
    pipeline_id: d.pipelineId,
    expected_last_modified: d.expectedLastModified,
    allow_duplicate_names: d.allowDuplicateNames,
    id: d.id,
    name: d.name,
    storage: d.storage,
    configuration: d.configuration,
    clusters: d.clusters,
    libraries: d.libraries,
    ingestion_definition: d.ingestionDefinition,
    gateway_definition: d.gatewayDefinition,
    trigger: d.trigger,
    target: d.target,
    schema: d.schema,
    filters: d.filters,
    continuous: d.continuous,
    development: d.development,
    photon: d.photon,
    edition: d.edition,
    channel: d.channel,
    catalog: d.catalog,
    notifications: d.notifications,
    serverless: d.serverless,
    deployment: d.deployment,
    restart_window: d.restartWindow,
    budget_policy_id: d.budgetPolicyId,
    tags: d.tags,
    event_log: d.eventLog,
    root_path: d.rootPath,
    environment: d.environment,
    usage_policy_id: d.usagePolicyId,
    serverless_compute_id: d.serverlessComputeId,
    clone_mode: d.cloneMode,
  }));

export const marshalCreateAutoFullRefreshPolicySchema: z.ZodType = z
  .object({
    enabled: z.boolean(),
    minIntervalHours: z.number().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
    min_interval_hours: d.minIntervalHours,
  }));

export const marshalCreateConfluenceConnectorOptionsSchema: z.ZodType = z
  .object({
    includeConfluenceSpaces: z.array(z.string()).optional(),
  })
  .transform(d => ({
    include_confluence_spaces: d.includeConfluenceSpaces,
  }));

export const marshalCreateConnectionParametersSchema: z.ZodType = z
  .object({
    sourceCatalog: z.string().optional(),
  })
  .transform(d => ({
    source_catalog: d.sourceCatalog,
  }));

export const marshalCreateConnectorOptionsSchema: z.ZodType = z
  .object({
    connectorOptions: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('googleAdsOptions'),
          googleAdsOptions: z.lazy(() => marshalCreateGoogleAdsOptionsSchema),
        }),
        z.object({
          $case: z.literal('tiktokAdsOptions'),
          tiktokAdsOptions: z.lazy(() => marshalCreateTikTokAdsOptionsSchema),
        }),
        z.object({
          $case: z.literal('sharepointOptions'),
          sharepointOptions: z.lazy(() => marshalCreateSharepointOptionsSchema),
        }),
        z.object({
          $case: z.literal('gdriveOptions'),
          gdriveOptions: z.lazy(() => marshalCreateGoogleDriveOptionsSchema),
        }),
        z.object({
          $case: z.literal('outlookOptions'),
          outlookOptions: z.lazy(() => marshalCreateOutlookOptionsSchema),
        }),
        z.object({
          $case: z.literal('smartsheetOptions'),
          smartsheetOptions: z.lazy(() => marshalCreateSmartsheetOptionsSchema),
        }),
        z.object({
          $case: z.literal('jiraOptions'),
          jiraOptions: z.lazy(() => marshalCreateJiraConnectorOptionsSchema),
        }),
        z.object({
          $case: z.literal('confluenceOptions'),
          confluenceOptions: z.lazy(
            () => marshalCreateConfluenceConnectorOptionsSchema
          ),
        }),
        z.object({
          $case: z.literal('metaAdsOptions'),
          metaAdsOptions: z.lazy(() => marshalCreateMetaMarketingOptionsSchema),
        }),
        z.object({
          $case: z.literal('zendeskSupportOptions'),
          zendeskSupportOptions: z.lazy(
            () => marshalCreateZendeskSupportOptionsSchema
          ),
        }),
        z.object({
          $case: z.literal('kafkaOptions'),
          kafkaOptions: z.lazy(() => marshalCreateKafkaOptionsSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.connectorOptions?.$case === 'googleAdsOptions' && {
      google_ads_options: d.connectorOptions.googleAdsOptions,
    }),
    ...(d.connectorOptions?.$case === 'tiktokAdsOptions' && {
      tiktok_ads_options: d.connectorOptions.tiktokAdsOptions,
    }),
    ...(d.connectorOptions?.$case === 'sharepointOptions' && {
      sharepoint_options: d.connectorOptions.sharepointOptions,
    }),
    ...(d.connectorOptions?.$case === 'gdriveOptions' && {
      gdrive_options: d.connectorOptions.gdriveOptions,
    }),
    ...(d.connectorOptions?.$case === 'outlookOptions' && {
      outlook_options: d.connectorOptions.outlookOptions,
    }),
    ...(d.connectorOptions?.$case === 'smartsheetOptions' && {
      smartsheet_options: d.connectorOptions.smartsheetOptions,
    }),
    ...(d.connectorOptions?.$case === 'jiraOptions' && {
      jira_options: d.connectorOptions.jiraOptions,
    }),
    ...(d.connectorOptions?.$case === 'confluenceOptions' && {
      confluence_options: d.connectorOptions.confluenceOptions,
    }),
    ...(d.connectorOptions?.$case === 'metaAdsOptions' && {
      meta_ads_options: d.connectorOptions.metaAdsOptions,
    }),
    ...(d.connectorOptions?.$case === 'zendeskSupportOptions' && {
      zendesk_support_options: d.connectorOptions.zendeskSupportOptions,
    }),
    ...(d.connectorOptions?.$case === 'kafkaOptions' && {
      kafka_options: d.connectorOptions.kafkaOptions,
    }),
  }));

export const marshalCreateCronTriggerSchema: z.ZodType = z
  .object({
    quartzCronSchedule: z.string().optional(),
    timezoneId: z.string().optional(),
  })
  .transform(d => ({
    quartz_cron_schedule: d.quartzCronSchedule,
    timezone_id: d.timezoneId,
  }));

export const marshalCreateDataStagingOptionsSchema: z.ZodType = z
  .object({
    catalogName: z.string(),
    schemaName: z.string(),
    volumeName: z.string().optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    volume_name: d.volumeName,
  }));

export const marshalCreateEventLogSpecSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    schema: z.string().optional(),
    catalog: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    schema: d.schema,
    catalog: d.catalog,
  }));

export const marshalCreateFileFilterSchema: z.ZodType = z
  .object({
    filter: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('pathFilter'), pathFilter: z.string()}),
        z.object({
          $case: z.literal('modifiedBefore'),
          modifiedBefore: z.string(),
        }),
        z.object({
          $case: z.literal('modifiedAfter'),
          modifiedAfter: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.filter?.$case === 'pathFilter' && {path_filter: d.filter.pathFilter}),
    ...(d.filter?.$case === 'modifiedBefore' && {
      modified_before: d.filter.modifiedBefore,
    }),
    ...(d.filter?.$case === 'modifiedAfter' && {
      modified_after: d.filter.modifiedAfter,
    }),
  }));

export const marshalCreateFileIngestionOptionsSchema: z.ZodType = z
  .object({
    format: z.string().optional(),
    fileFilters: z
      .array(z.lazy(() => marshalCreateFileFilterSchema))
      .optional(),
    inferColumnTypes: z.boolean().optional(),
    schemaEvolutionMode: z.string().optional(),
    schemaHints: z.string().optional(),
    ignoreCorruptFiles: z.boolean().optional(),
    corruptRecordColumn: z.string().optional(),
    rescuedDataColumn: z.string().optional(),
    singleVariantColumn: z.string().optional(),
    readerCaseSensitive: z.boolean().optional(),
    formatOptions: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    format: d.format,
    file_filters: d.fileFilters,
    infer_column_types: d.inferColumnTypes,
    schema_evolution_mode: d.schemaEvolutionMode,
    schema_hints: d.schemaHints,
    ignore_corrupt_files: d.ignoreCorruptFiles,
    corrupt_record_column: d.corruptRecordColumn,
    rescued_data_column: d.rescuedDataColumn,
    single_variant_column: d.singleVariantColumn,
    reader_case_sensitive: d.readerCaseSensitive,
    format_options: d.formatOptions,
  }));

export const marshalCreateFiltersSchema: z.ZodType = z
  .object({
    include: z.array(z.string()).optional(),
    exclude: z.array(z.string()).optional(),
  })
  .transform(d => ({
    include: d.include,
    exclude: d.exclude,
  }));

export const marshalCreateGoogleAdsConfigSchema: z.ZodType = z
  .object({
    managerAccountId: z.string().optional(),
  })
  .transform(d => ({
    manager_account_id: d.managerAccountId,
  }));

export const marshalCreateGoogleAdsOptionsSchema: z.ZodType = z
  .object({
    managerAccountId: z.string(),
    lookbackWindowDays: z.number().optional(),
    syncStartDate: z.string().optional(),
  })
  .transform(d => ({
    manager_account_id: d.managerAccountId,
    lookback_window_days: d.lookbackWindowDays,
    sync_start_date: d.syncStartDate,
  }));

export const marshalCreateGoogleDriveOptionsSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    entityType: z.string().optional(),
    fileIngestionOptions: z
      .lazy(() => marshalCreateFileIngestionOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    url: d.url,
    entity_type: d.entityType,
    file_ingestion_options: d.fileIngestionOptions,
  }));

export const marshalCreateIngestionGatewayPipelineDefinitionSchema: z.ZodType =
  z
    .object({
      connectionName: z.string(),
      connectionId: z.string().optional(),
      gatewayStorageCatalog: z.string(),
      gatewayStorageSchema: z.string(),
      gatewayStorageName: z.string().optional(),
      connectionParameters: z
        .lazy(() => marshalCreateConnectionParametersSchema)
        .optional(),
    })
    .transform(d => ({
      connection_name: d.connectionName,
      connection_id: d.connectionId,
      gateway_storage_catalog: d.gatewayStorageCatalog,
      gateway_storage_schema: d.gatewayStorageSchema,
      gateway_storage_name: d.gatewayStorageName,
      connection_parameters: d.connectionParameters,
    }));

export const marshalCreateIngestionPipelineDefinitionSchema: z.ZodType = z
  .object({
    source: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('connectionName'),
          connectionName: z.string(),
        }),
        z.object({
          $case: z.literal('ingestionGatewayId'),
          ingestionGatewayId: z.string(),
        }),
        z.object({
          $case: z.literal('ingestFromUcForeignCatalog'),
          ingestFromUcForeignCatalog: z.boolean(),
        }),
      ])
      .optional(),
    objects: z
      .array(
        z.lazy(
          () => marshalIngestionPipelineDefinition_CreateIngestionConfigSchema
        )
      )
      .optional(),
    tableConfiguration: z
      .lazy(
        () => marshalIngestionPipelineDefinition_CreateTableSpecificConfigSchema
      )
      .optional(),
    netsuiteJarPath: z.string().optional(),
    sourceConfigurations: z
      .array(z.lazy(() => marshalCreateSourceConfigSchema))
      .optional(),
    fullRefreshWindow: z
      .lazy(() => marshalCreateOperationTimeWindowSchema)
      .optional(),
    connectorType: z.string().optional(),
    dataStagingOptions: z
      .lazy(() => marshalCreateDataStagingOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    ...(d.source?.$case === 'connectionName' && {
      connection_name: d.source.connectionName,
    }),
    ...(d.source?.$case === 'ingestionGatewayId' && {
      ingestion_gateway_id: d.source.ingestionGatewayId,
    }),
    ...(d.source?.$case === 'ingestFromUcForeignCatalog' && {
      ingest_from_uc_foreign_catalog: d.source.ingestFromUcForeignCatalog,
    }),
    objects: d.objects,
    table_configuration: d.tableConfiguration,
    netsuite_jar_path: d.netsuiteJarPath,
    source_configurations: d.sourceConfigurations,
    full_refresh_window: d.fullRefreshWindow,
    connector_type: d.connectorType,
    data_staging_options: d.dataStagingOptions,
  }));

export const marshalCreateJiraConnectorOptionsSchema: z.ZodType = z
  .object({
    includeJiraSpaces: z.array(z.string()).optional(),
  })
  .transform(d => ({
    include_jira_spaces: d.includeJiraSpaces,
  }));

export const marshalCreateJsonTransformerOptionsSchema: z.ZodType = z
  .object({
    asVariant: z.boolean().optional(),
    schema: z.string().optional(),
    schemaFilePath: z.string().optional(),
    schemaEvolutionMode: z.string().optional(),
    schemaHints: z.string().optional(),
  })
  .transform(d => ({
    as_variant: d.asVariant,
    schema: d.schema,
    schema_file_path: d.schemaFilePath,
    schema_evolution_mode: d.schemaEvolutionMode,
    schema_hints: d.schemaHints,
  }));

export const marshalCreateKafkaOptionsSchema: z.ZodType = z
  .object({
    topics: z.array(z.string()).optional(),
    topicPattern: z.string().optional(),
    keyTransformer: z.lazy(() => marshalCreateTransformerSchema).optional(),
    valueTransformer: z.lazy(() => marshalCreateTransformerSchema).optional(),
    startingOffset: z.string().optional(),
    maxOffsetsPerTrigger: z.bigint().optional(),
    clientConfig: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    topics: d.topics,
    topic_pattern: d.topicPattern,
    key_transformer: d.keyTransformer,
    value_transformer: d.valueTransformer,
    starting_offset: d.startingOffset,
    max_offsets_per_trigger: d.maxOffsetsPerTrigger,
    client_config: d.clientConfig,
  }));

export const marshalCreateManualTriggerSchema: z.ZodType = z.object({});

export const marshalCreateMetaMarketingOptionsSchema: z.ZodType = z
  .object({
    level: z.string().optional(),
    breakdowns: z.array(z.string()).optional(),
    actionBreakdowns: z.array(z.string()).optional(),
    actionReportTime: z.string().optional(),
    startDate: z.string().optional(),
    customInsightsLookbackWindow: z.number().optional(),
    timeIncrement: z.string().optional(),
    actionAttributionWindows: z.array(z.string()).optional(),
  })
  .transform(d => ({
    level: d.level,
    breakdowns: d.breakdowns,
    action_breakdowns: d.actionBreakdowns,
    action_report_time: d.actionReportTime,
    start_date: d.startDate,
    custom_insights_lookback_window: d.customInsightsLookbackWindow,
    time_increment: d.timeIncrement,
    action_attribution_windows: d.actionAttributionWindows,
  }));

export const marshalCreateNotebookLibrarySchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

export const marshalCreateNotificationsSchema: z.ZodType = z
  .object({
    emailRecipients: z.array(z.string()).optional(),
    alerts: z.array(z.string()).optional(),
  })
  .transform(d => ({
    email_recipients: d.emailRecipients,
    alerts: d.alerts,
  }));

export const marshalCreateOperationTimeWindowSchema: z.ZodType = z
  .object({
    startHour: z.number(),
    daysOfWeek: z.array(z.string()).optional(),
    timeZoneId: z.string().optional(),
  })
  .transform(d => ({
    start_hour: d.startHour,
    days_of_week: d.daysOfWeek,
    time_zone_id: d.timeZoneId,
  }));

export const marshalCreateOutlookOptionsSchema: z.ZodType = z
  .object({
    folderFilter: z.array(z.string()).optional(),
    senderFilter: z.array(z.string()).optional(),
    subjectFilter: z.array(z.string()).optional(),
    startDate: z.string().optional(),
    bodyFormat: z.string().optional(),
    attachmentMode: z.string().optional(),
    includeMailboxes: z.array(z.string()).optional(),
    includeFolders: z.array(z.string()).optional(),
    includeSenders: z.array(z.string()).optional(),
    includeSubjects: z.array(z.string()).optional(),
  })
  .transform(d => ({
    folder_filter: d.folderFilter,
    sender_filter: d.senderFilter,
    subject_filter: d.subjectFilter,
    start_date: d.startDate,
    body_format: d.bodyFormat,
    attachment_mode: d.attachmentMode,
    include_mailboxes: d.includeMailboxes,
    include_folders: d.includeFolders,
    include_senders: d.includeSenders,
    include_subjects: d.includeSubjects,
  }));

export const marshalCreatePathPatternSchema: z.ZodType = z
  .object({
    include: z.string().optional(),
  })
  .transform(d => ({
    include: d.include,
  }));

export const marshalCreatePipelineClusterSchema: z.ZodType = z
  .object({
    label: z.string().optional(),
    applyPolicyDefaultValues: z.boolean().optional(),
    sparkConf: z.record(z.string(), z.string()).optional(),
    awsAttributes: z
      .lazy(() => marshalCreatePipelinesAwsAttributesSchema)
      .optional(),
    azureAttributes: z
      .lazy(() => marshalCreatePipelinesAzureAttributesSchema)
      .optional(),
    gcpAttributes: z
      .lazy(() => marshalCreatePipelinesGcpAttributesSchema)
      .optional(),
    nodeTypeId: z.string().optional(),
    driverNodeTypeId: z.string().optional(),
    sshPublicKeys: z.array(z.string()).optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    clusterLogConf: z
      .lazy(() => marshalCreatePipelinesClusterLogConfSchema)
      .optional(),
    sparkEnvVars: z.record(z.string(), z.string()).optional(),
    initScripts: z
      .array(z.lazy(() => marshalCreatePipelinesInitScriptInfoSchema))
      .optional(),
    instancePoolId: z.string().optional(),
    policyId: z.string().optional(),
    enableLocalDiskEncryption: z.boolean().optional(),
    driverInstancePoolId: z.string().optional(),
    size: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('numWorkers'), numWorkers: z.number()}),
        z.object({
          $case: z.literal('autoscale'),
          autoscale: z.lazy(() => marshalCreatePipelinesAutoScaleSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    label: d.label,
    apply_policy_default_values: d.applyPolicyDefaultValues,
    spark_conf: d.sparkConf,
    aws_attributes: d.awsAttributes,
    azure_attributes: d.azureAttributes,
    gcp_attributes: d.gcpAttributes,
    node_type_id: d.nodeTypeId,
    driver_node_type_id: d.driverNodeTypeId,
    ssh_public_keys: d.sshPublicKeys,
    custom_tags: d.customTags,
    cluster_log_conf: d.clusterLogConf,
    spark_env_vars: d.sparkEnvVars,
    init_scripts: d.initScripts,
    instance_pool_id: d.instancePoolId,
    policy_id: d.policyId,
    enable_local_disk_encryption: d.enableLocalDiskEncryption,
    driver_instance_pool_id: d.driverInstancePoolId,
    ...(d.size?.$case === 'numWorkers' && {num_workers: d.size.numWorkers}),
    ...(d.size?.$case === 'autoscale' && {autoscale: d.size.autoscale}),
  }));

export const marshalCreatePipelineDeploymentSchema: z.ZodType = z
  .object({
    kind: z.string(),
    metadataFilePath: z.string().optional(),
    deploymentId: z.string().optional(),
    versionId: z.string().optional(),
  })
  .transform(d => ({
    kind: d.kind,
    metadata_file_path: d.metadataFilePath,
    deployment_id: d.deploymentId,
    version_id: d.versionId,
  }));

export const marshalCreatePipelineLibrarySchema: z.ZodType = z
  .object({
    lib: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('jar'), jar: z.string()}),
        z.object({
          $case: z.literal('maven'),
          maven: z.lazy(() => marshalCreatePipelinesMavenLibrarySchema),
        }),
        z.object({$case: z.literal('whl'), whl: z.string()}),
        z.object({
          $case: z.literal('notebook'),
          notebook: z.lazy(() => marshalCreateNotebookLibrarySchema),
        }),
        z.object({
          $case: z.literal('file'),
          file: z.lazy(() => marshalCreateNotebookLibrarySchema),
        }),
        z.object({
          $case: z.literal('glob'),
          glob: z.lazy(() => marshalCreatePathPatternSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.lib?.$case === 'jar' && {jar: d.lib.jar}),
    ...(d.lib?.$case === 'maven' && {maven: d.lib.maven}),
    ...(d.lib?.$case === 'whl' && {whl: d.lib.whl}),
    ...(d.lib?.$case === 'notebook' && {notebook: d.lib.notebook}),
    ...(d.lib?.$case === 'file' && {file: d.lib.file}),
    ...(d.lib?.$case === 'glob' && {glob: d.lib.glob}),
  }));

export const marshalCreatePipelineRequestSchema: z.ZodType = z
  .object({
    allowDuplicateNames: z.boolean().optional(),
    dryRun: z.boolean().optional(),
    runAs: z.lazy(() => marshalCreatePipelinesJobRunAsSchema).optional(),
    parameters: z.record(z.string(), z.string()).optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    storage: z.string().optional(),
    configuration: z.record(z.string(), z.string()).optional(),
    clusters: z
      .array(z.lazy(() => marshalCreatePipelineClusterSchema))
      .optional(),
    libraries: z
      .array(z.lazy(() => marshalCreatePipelineLibrarySchema))
      .optional(),
    ingestionDefinition: z
      .lazy(() => marshalCreateIngestionPipelineDefinitionSchema)
      .optional(),
    gatewayDefinition: z
      .lazy(() => marshalCreateIngestionGatewayPipelineDefinitionSchema)
      .optional(),
    trigger: z.lazy(() => marshalCreatePipelineTriggerSchema).optional(),
    target: z.string().optional(),
    schema: z.string().optional(),
    filters: z.lazy(() => marshalCreateFiltersSchema).optional(),
    continuous: z.boolean().optional(),
    development: z.boolean().optional(),
    photon: z.boolean().optional(),
    edition: z.string().optional(),
    channel: z.string().optional(),
    catalog: z.string().optional(),
    notifications: z
      .array(z.lazy(() => marshalCreateNotificationsSchema))
      .optional(),
    serverless: z.boolean().optional(),
    deployment: z.lazy(() => marshalCreatePipelineDeploymentSchema).optional(),
    restartWindow: z.lazy(() => marshalCreateRestartWindowSchema).optional(),
    budgetPolicyId: z.string().optional(),
    tags: z.record(z.string(), z.string()).optional(),
    eventLog: z.lazy(() => marshalCreateEventLogSpecSchema).optional(),
    rootPath: z.string().optional(),
    environment: z
      .lazy(() => marshalCreatePipelinesEnvironmentSchema)
      .optional(),
    usagePolicyId: z.string().optional(),
    serverlessComputeId: z.string().optional(),
  })
  .transform(d => ({
    allow_duplicate_names: d.allowDuplicateNames,
    dry_run: d.dryRun,
    run_as: d.runAs,
    parameters: d.parameters,
    id: d.id,
    name: d.name,
    storage: d.storage,
    configuration: d.configuration,
    clusters: d.clusters,
    libraries: d.libraries,
    ingestion_definition: d.ingestionDefinition,
    gateway_definition: d.gatewayDefinition,
    trigger: d.trigger,
    target: d.target,
    schema: d.schema,
    filters: d.filters,
    continuous: d.continuous,
    development: d.development,
    photon: d.photon,
    edition: d.edition,
    channel: d.channel,
    catalog: d.catalog,
    notifications: d.notifications,
    serverless: d.serverless,
    deployment: d.deployment,
    restart_window: d.restartWindow,
    budget_policy_id: d.budgetPolicyId,
    tags: d.tags,
    event_log: d.eventLog,
    root_path: d.rootPath,
    environment: d.environment,
    usage_policy_id: d.usagePolicyId,
    serverless_compute_id: d.serverlessComputeId,
  }));

export const marshalCreatePipelineTriggerSchema: z.ZodType = z
  .object({
    trigger: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('manual'),
          manual: z.lazy(() => marshalCreateManualTriggerSchema),
        }),
        z.object({
          $case: z.literal('cron'),
          cron: z.lazy(() => marshalCreateCronTriggerSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.trigger?.$case === 'manual' && {manual: d.trigger.manual}),
    ...(d.trigger?.$case === 'cron' && {cron: d.trigger.cron}),
  }));

export const marshalCreatePipelinesAutoScaleSchema: z.ZodType = z
  .object({
    minWorkers: z.number(),
    maxWorkers: z.number(),
    mode: z.string().optional(),
  })
  .transform(d => ({
    min_workers: d.minWorkers,
    max_workers: d.maxWorkers,
    mode: d.mode,
  }));

export const marshalCreatePipelinesAwsAttributesSchema: z.ZodType = z
  .object({
    firstOnDemand: z.number().optional(),
    availability: z.string().optional(),
    zoneId: z.string().optional(),
    instanceProfileArn: z.string().optional(),
    spotBidPricePercent: z.number().optional(),
    ebsVolumeType: z.string().optional(),
    ebsVolumeCount: z.number().optional(),
    ebsVolumeSize: z.number().optional(),
    ebsVolumeIops: z.number().optional(),
    ebsVolumeThroughput: z.number().optional(),
  })
  .transform(d => ({
    first_on_demand: d.firstOnDemand,
    availability: d.availability,
    zone_id: d.zoneId,
    instance_profile_arn: d.instanceProfileArn,
    spot_bid_price_percent: d.spotBidPricePercent,
    ebs_volume_type: d.ebsVolumeType,
    ebs_volume_count: d.ebsVolumeCount,
    ebs_volume_size: d.ebsVolumeSize,
    ebs_volume_iops: d.ebsVolumeIops,
    ebs_volume_throughput: d.ebsVolumeThroughput,
  }));

export const marshalCreatePipelinesAzureAttributesSchema: z.ZodType = z
  .object({
    firstOnDemand: z.number().optional(),
    availability: z.string().optional(),
    spotBidMaxPrice: z.number().optional(),
  })
  .transform(d => ({
    first_on_demand: d.firstOnDemand,
    availability: d.availability,
    spot_bid_max_price: d.spotBidMaxPrice,
  }));

export const marshalCreatePipelinesClusterLogConfSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalCreatePipelinesDbfsStorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
  }));

export const marshalCreatePipelinesDbfsStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalCreatePipelinesEnvironmentSchema: z.ZodType = z
  .object({
    dependencies: z.array(z.string()).optional(),
    environmentVersion: z.string().optional(),
  })
  .transform(d => ({
    dependencies: d.dependencies,
    environment_version: d.environmentVersion,
  }));

export const marshalCreatePipelinesGcpAttributesSchema: z.ZodType = z
  .object({
    googleServiceAccount: z.string().optional(),
    bootDiskSize: z.number().optional(),
    availability: z.string().optional(),
    zoneId: z.string().optional(),
    localSsdCount: z.number().optional(),
  })
  .transform(d => ({
    google_service_account: d.googleServiceAccount,
    boot_disk_size: d.bootDiskSize,
    availability: d.availability,
    zone_id: d.zoneId,
    local_ssd_count: d.localSsdCount,
  }));

export const marshalCreatePipelinesInitScriptInfoSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalCreatePipelinesDbfsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('s3'),
          s3: z.lazy(() => marshalCreatePipelinesS3StorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
    ...(d.storageInfo?.$case === 's3' && {s3: d.storageInfo.s3}),
  }));

export const marshalCreatePipelinesJobRunAsSchema: z.ZodType = z
  .object({
    identity: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('servicePrincipalName'),
          servicePrincipalName: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.identity?.$case === 'userName' && {user_name: d.identity.userName}),
    ...(d.identity?.$case === 'servicePrincipalName' && {
      service_principal_name: d.identity.servicePrincipalName,
    }),
  }));

export const marshalCreatePipelinesMavenLibrarySchema: z.ZodType = z
  .object({
    coordinates: z.string(),
    repo: z.string().optional(),
    exclusions: z.array(z.string()).optional(),
  })
  .transform(d => ({
    coordinates: d.coordinates,
    repo: d.repo,
    exclusions: d.exclusions,
  }));

export const marshalCreatePipelinesS3StorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
    region: z.string().optional(),
    endpoint: z.string().optional(),
    enableEncryption: z.boolean().optional(),
    encryptionType: z.string().optional(),
    kmsKey: z.string().optional(),
    cannedAcl: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
    region: d.region,
    endpoint: d.endpoint,
    enable_encryption: d.enableEncryption,
    encryption_type: d.encryptionType,
    kms_key: d.kmsKey,
    canned_acl: d.cannedAcl,
  }));

export const marshalCreatePostgresCatalogConfigSchema: z.ZodType = z
  .object({
    slotConfig: z.lazy(() => marshalCreatePostgresSlotConfigSchema).optional(),
  })
  .transform(d => ({
    slot_config: d.slotConfig,
  }));

export const marshalCreatePostgresSlotConfigSchema: z.ZodType = z
  .object({
    slotName: z.string().optional(),
    publicationName: z.string().optional(),
  })
  .transform(d => ({
    slot_name: d.slotName,
    publication_name: d.publicationName,
  }));

export const marshalCreateRestartWindowSchema: z.ZodType = z
  .object({
    startHour: z.number(),
    daysOfWeek: z.array(z.string()).optional(),
    timeZoneId: z.string().optional(),
  })
  .transform(d => ({
    start_hour: d.startHour,
    days_of_week: d.daysOfWeek,
    time_zone_id: d.timeZoneId,
  }));

export const marshalCreateSharepointOptionsSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    entityType: z.string().optional(),
    fileIngestionOptions: z
      .lazy(() => marshalCreateFileIngestionOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    url: d.url,
    entity_type: d.entityType,
    file_ingestion_options: d.fileIngestionOptions,
  }));

export const marshalCreateSmartsheetOptionsSchema: z.ZodType = z
  .object({
    enforceSchema: z.boolean().optional(),
  })
  .transform(d => ({
    enforce_schema: d.enforceSchema,
  }));

export const marshalCreateSourceCatalogConfigSchema: z.ZodType = z
  .object({
    sourceCatalog: z.string().optional(),
    options: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('postgres'),
          postgres: z.lazy(() => marshalCreatePostgresCatalogConfigSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    source_catalog: d.sourceCatalog,
    ...(d.options?.$case === 'postgres' && {postgres: d.options.postgres}),
  }));

export const marshalCreateSourceConfigSchema: z.ZodType = z
  .object({
    catalog: z.lazy(() => marshalCreateSourceCatalogConfigSchema).optional(),
    connectorConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('googleAdsConfig'),
          googleAdsConfig: z.lazy(() => marshalCreateGoogleAdsConfigSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    catalog: d.catalog,
    ...(d.connectorConfig?.$case === 'googleAdsConfig' && {
      google_ads_config: d.connectorConfig.googleAdsConfig,
    }),
  }));

export const marshalCreateTikTokAdsOptionsSchema: z.ZodType = z
  .object({
    lookbackWindowDays: z.number().optional(),
    syncStartDate: z.string().optional(),
    dimensions: z.array(z.string()).optional(),
    metrics: z.array(z.string()).optional(),
    reportType: z.string().optional(),
    dataLevel: z.string().optional(),
    queryLifetime: z.boolean().optional(),
  })
  .transform(d => ({
    lookback_window_days: d.lookbackWindowDays,
    sync_start_date: d.syncStartDate,
    dimensions: d.dimensions,
    metrics: d.metrics,
    report_type: d.reportType,
    data_level: d.dataLevel,
    query_lifetime: d.queryLifetime,
  }));

export const marshalCreateTransformerSchema: z.ZodType = z
  .object({
    format: z.string().optional(),
    config: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('jsonOptions'),
          jsonOptions: z.lazy(() => marshalCreateJsonTransformerOptionsSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    format: d.format,
    ...(d.config?.$case === 'jsonOptions' && {
      json_options: d.config.jsonOptions,
    }),
  }));

export const marshalCreateZendeskSupportOptionsSchema: z.ZodType = z
  .object({
    startDate: z.string().optional(),
  })
  .transform(d => ({
    start_date: d.startDate,
  }));

export const marshalEditPipelineRequestSchema: z.ZodType = z
  .object({
    pipelineId: z.string().optional(),
    allowDuplicateNames: z.boolean().optional(),
    expectedLastModified: z.bigint().optional(),
    runAs: z.lazy(() => marshalCreatePipelinesJobRunAsSchema).optional(),
    parameters: z.record(z.string(), z.string()).optional(),
    id: z.string().optional(),
    name: z.string().optional(),
    storage: z.string().optional(),
    configuration: z.record(z.string(), z.string()).optional(),
    clusters: z
      .array(z.lazy(() => marshalCreatePipelineClusterSchema))
      .optional(),
    libraries: z
      .array(z.lazy(() => marshalCreatePipelineLibrarySchema))
      .optional(),
    ingestionDefinition: z
      .lazy(() => marshalCreateIngestionPipelineDefinitionSchema)
      .optional(),
    gatewayDefinition: z
      .lazy(() => marshalCreateIngestionGatewayPipelineDefinitionSchema)
      .optional(),
    trigger: z.lazy(() => marshalCreatePipelineTriggerSchema).optional(),
    target: z.string().optional(),
    schema: z.string().optional(),
    filters: z.lazy(() => marshalCreateFiltersSchema).optional(),
    continuous: z.boolean().optional(),
    development: z.boolean().optional(),
    photon: z.boolean().optional(),
    edition: z.string().optional(),
    channel: z.string().optional(),
    catalog: z.string().optional(),
    notifications: z
      .array(z.lazy(() => marshalCreateNotificationsSchema))
      .optional(),
    serverless: z.boolean().optional(),
    deployment: z.lazy(() => marshalCreatePipelineDeploymentSchema).optional(),
    restartWindow: z.lazy(() => marshalCreateRestartWindowSchema).optional(),
    budgetPolicyId: z.string().optional(),
    tags: z.record(z.string(), z.string()).optional(),
    eventLog: z.lazy(() => marshalCreateEventLogSpecSchema).optional(),
    rootPath: z.string().optional(),
    environment: z
      .lazy(() => marshalCreatePipelinesEnvironmentSchema)
      .optional(),
    usagePolicyId: z.string().optional(),
    serverlessComputeId: z.string().optional(),
  })
  .transform(d => ({
    pipeline_id: d.pipelineId,
    allow_duplicate_names: d.allowDuplicateNames,
    expected_last_modified: d.expectedLastModified,
    run_as: d.runAs,
    parameters: d.parameters,
    id: d.id,
    name: d.name,
    storage: d.storage,
    configuration: d.configuration,
    clusters: d.clusters,
    libraries: d.libraries,
    ingestion_definition: d.ingestionDefinition,
    gateway_definition: d.gatewayDefinition,
    trigger: d.trigger,
    target: d.target,
    schema: d.schema,
    filters: d.filters,
    continuous: d.continuous,
    development: d.development,
    photon: d.photon,
    edition: d.edition,
    channel: d.channel,
    catalog: d.catalog,
    notifications: d.notifications,
    serverless: d.serverless,
    deployment: d.deployment,
    restart_window: d.restartWindow,
    budget_policy_id: d.budgetPolicyId,
    tags: d.tags,
    event_log: d.eventLog,
    root_path: d.rootPath,
    environment: d.environment,
    usage_policy_id: d.usagePolicyId,
    serverless_compute_id: d.serverlessComputeId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngestionPipelineDefinition_CreateIngestionConfigSchema: z.ZodType =
  z
    .object({
      sourceTables: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('schema'),
            schema: z.lazy(
              () => marshalIngestionPipelineDefinition_CreateSchemaSpecSchema
            ),
          }),
          z.object({
            $case: z.literal('table'),
            table: z.lazy(
              () => marshalIngestionPipelineDefinition_CreateTableSpecSchema
            ),
          }),
          z.object({
            $case: z.literal('report'),
            report: z.lazy(
              () => marshalIngestionPipelineDefinition_CreateReportSpecSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.sourceTables?.$case === 'schema' && {
        schema: d.sourceTables.schema,
      }),
      ...(d.sourceTables?.$case === 'table' && {table: d.sourceTables.table}),
      ...(d.sourceTables?.$case === 'report' && {
        report: d.sourceTables.report,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngestionPipelineDefinition_CreateReportSpecSchema: z.ZodType =
  z
    .object({
      sourceUrl: z.string(),
      destinationCatalog: z.string(),
      destinationSchema: z.string(),
      destinationTable: z.string().optional(),
      tableConfiguration: z
        .lazy(
          () =>
            marshalIngestionPipelineDefinition_CreateTableSpecificConfigSchema
        )
        .optional(),
    })
    .transform(d => ({
      source_url: d.sourceUrl,
      destination_catalog: d.destinationCatalog,
      destination_schema: d.destinationSchema,
      destination_table: d.destinationTable,
      table_configuration: d.tableConfiguration,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngestionPipelineDefinition_CreateSchemaSpecSchema: z.ZodType =
  z
    .object({
      sourceCatalog: z.string().optional(),
      sourceSchema: z.string(),
      destinationCatalog: z.string(),
      destinationSchema: z.string(),
      tableConfiguration: z
        .lazy(
          () =>
            marshalIngestionPipelineDefinition_CreateTableSpecificConfigSchema
        )
        .optional(),
      connectorOptions: z
        .lazy(() => marshalCreateConnectorOptionsSchema)
        .optional(),
    })
    .transform(d => ({
      source_catalog: d.sourceCatalog,
      source_schema: d.sourceSchema,
      destination_catalog: d.destinationCatalog,
      destination_schema: d.destinationSchema,
      table_configuration: d.tableConfiguration,
      connector_options: d.connectorOptions,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngestionPipelineDefinition_CreateTableSpecSchema: z.ZodType =
  z
    .object({
      sourceCatalog: z.string().optional(),
      sourceSchema: z.string().optional(),
      sourceTable: z.string(),
      destinationCatalog: z.string(),
      destinationSchema: z.string(),
      destinationTable: z.string().optional(),
      tableConfiguration: z
        .lazy(
          () =>
            marshalIngestionPipelineDefinition_CreateTableSpecificConfigSchema
        )
        .optional(),
      connectorOptions: z
        .lazy(() => marshalCreateConnectorOptionsSchema)
        .optional(),
    })
    .transform(d => ({
      source_catalog: d.sourceCatalog,
      source_schema: d.sourceSchema,
      source_table: d.sourceTable,
      destination_catalog: d.destinationCatalog,
      destination_schema: d.destinationSchema,
      destination_table: d.destinationTable,
      table_configuration: d.tableConfiguration,
      connector_options: d.connectorOptions,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngestionPipelineDefinition_CreateTableSpecificConfigSchema: z.ZodType =
  z
    .object({
      scdType: z.string().optional(),
      primaryKeys: z.array(z.string()).optional(),
      sequenceBy: z.array(z.string()).optional(),
      includeColumns: z.array(z.string()).optional(),
      excludeColumns: z.array(z.string()).optional(),
      salesforceIncludeFormulaFields: z.boolean().optional(),
      workdayReportParameters: z
        .lazy(
          () =>
            marshalIngestionPipelineDefinition_CreateWorkdayReportParametersSchema
        )
        .optional(),
      rowFilter: z.string().optional(),
      queryBasedConnectorConfig: z
        .lazy(
          () =>
            marshalIngestionPipelineDefinition_TableSpecificConfig_CreateQueryBasedConnectorConfigSchema
        )
        .optional(),
      autoFullRefreshPolicy: z
        .lazy(() => marshalCreateAutoFullRefreshPolicySchema)
        .optional(),
      tableProperties: z.record(z.string(), z.string()).optional(),
      enableAutoClustering: z.boolean().optional(),
      clusteringColumns: z.array(z.string()).optional(),
    })
    .transform(d => ({
      scd_type: d.scdType,
      primary_keys: d.primaryKeys,
      sequence_by: d.sequenceBy,
      include_columns: d.includeColumns,
      exclude_columns: d.excludeColumns,
      salesforce_include_formula_fields: d.salesforceIncludeFormulaFields,
      workday_report_parameters: d.workdayReportParameters,
      row_filter: d.rowFilter,
      query_based_connector_config: d.queryBasedConnectorConfig,
      auto_full_refresh_policy: d.autoFullRefreshPolicy,
      table_properties: d.tableProperties,
      enable_auto_clustering: d.enableAutoClustering,
      clustering_columns: d.clusteringColumns,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngestionPipelineDefinition_CreateWorkdayReportParametersSchema: z.ZodType =
  z
    .object({
      incremental: z.boolean().optional(),
      reportParameters: z
        .array(
          z.lazy(
            () =>
              marshalIngestionPipelineDefinition_WorkdayReportParameters_CreateQueryKeyValueSchema
          )
        )
        .optional(),
      parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      incremental: d.incremental,
      report_parameters: d.reportParameters,
      parameters: d.parameters,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngestionPipelineDefinition_TableSpecificConfig_CreateQueryBasedConnectorConfigSchema: z.ZodType =
  z
    .object({
      cursorColumns: z.array(z.string()).optional(),
      deletionCondition: z.string().optional(),
      hardDeletionSyncMinIntervalInSeconds: z.bigint().optional(),
    })
    .transform(d => ({
      cursor_columns: d.cursorColumns,
      deletion_condition: d.deletionCondition,
      hard_deletion_sync_min_interval_in_seconds:
        d.hardDeletionSyncMinIntervalInSeconds,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngestionPipelineDefinition_WorkdayReportParameters_CreateQueryKeyValueSchema: z.ZodType =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const marshalReplaceWhereOverrideSchema: z.ZodType = z
  .object({
    flowName: z.string().optional(),
    predicateOverride: z.string().optional(),
  })
  .transform(d => ({
    flow_name: d.flowName,
    predicate_override: d.predicateOverride,
  }));

export const marshalRewindDatasetSpecSchema: z.ZodType = z
  .object({
    identifier: z.string().optional(),
    cascade: z.boolean().optional(),
    resetCheckpoints: z.boolean().optional(),
  })
  .transform(d => ({
    identifier: d.identifier,
    cascade: d.cascade,
    reset_checkpoints: d.resetCheckpoints,
  }));

export const marshalRewindSpecSchema: z.ZodType = z
  .object({
    rewindTimestamp: z.string().optional(),
    dryRun: z.boolean().optional(),
    datasets: z.array(z.lazy(() => marshalRewindDatasetSpecSchema)).optional(),
  })
  .transform(d => ({
    rewind_timestamp: d.rewindTimestamp,
    dry_run: d.dryRun,
    datasets: d.datasets,
  }));

export const marshalStartUpdateRequestSchema: z.ZodType = z
  .object({
    pipelineId: z.string().optional(),
    fullRefresh: z.boolean().optional(),
    cause: z.string().optional(),
    refreshSelection: z.array(z.string()).optional(),
    fullRefreshSelection: z.array(z.string()).optional(),
    resetCheckpointSelection: z.array(z.string()).optional(),
    validateOnly: z.boolean().optional(),
    rewindSpec: z.lazy(() => marshalRewindSpecSchema).optional(),
    parameters: z.record(z.string(), z.string()).optional(),
    replaceWhereOverrides: z
      .array(z.lazy(() => marshalReplaceWhereOverrideSchema))
      .optional(),
  })
  .transform(d => ({
    pipeline_id: d.pipelineId,
    full_refresh: d.fullRefresh,
    cause: d.cause,
    refresh_selection: d.refreshSelection,
    full_refresh_selection: d.fullRefreshSelection,
    reset_checkpoint_selection: d.resetCheckpointSelection,
    validate_only: d.validateOnly,
    rewind_spec: d.rewindSpec,
    parameters: d.parameters,
    replace_where_overrides: d.replaceWhereOverrides,
  }));

export const marshalStopPipelineRequestSchema: z.ZodType = z
  .object({
    pipelineId: z.string().optional(),
  })
  .transform(d => ({
    pipeline_id: d.pipelineId,
  }));
