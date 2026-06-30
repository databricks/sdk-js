// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {z} from 'zod';

/** The state of an online table. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const OnlineTableState = {
  /** The default state. It should not be reported by any online tables. */
  ONLINE_TABLE_STATE_UNSPECIFIED: 'ONLINE_TABLE_STATE_UNSPECIFIED',
  /**
   * The online table has just been created and resources are being provisioned. This is also the
   * catch-all state if there is not a more suitable state to report for the online table.
   */
  PROVISIONING: 'PROVISIONING',
  /** The online table is provisioning resources for the data synchronization pipeline. */
  PROVISIONING_PIPELINE_RESOURCES: 'PROVISIONING_PIPELINE_RESOURCES',
  /** The online table is executing the initial data synchronization. */
  PROVISIONING_INITIAL_SNAPSHOT: 'PROVISIONING_INITIAL_SNAPSHOT',
  /** The online table is ready to serve data. */
  ONLINE: 'ONLINE',
  /**
   * The online table is ready to serve data and is continuously updating. Only shown for online
   * tables using the "Continuous" sync mode.
   */
  ONLINE_CONTINUOUS_UPDATE: 'ONLINE_CONTINUOUS_UPDATE',
  /**
   * The online table is ready to serve data and an active update is in progress. Only shown for
   * online tables using the "Triggered" sync mode.
   */
  ONLINE_TRIGGERED_UPDATE: 'ONLINE_TRIGGERED_UPDATE',
  /**
   * The online table is ready to serve data and there are no active updates. Only shown for online
   * tables using the "Triggered" sync mode.
   */
  ONLINE_NO_PENDING_UPDATE: 'ONLINE_NO_PENDING_UPDATE',
  /** The online table has encountered an internal error and is not available for serving. */
  OFFLINE: 'OFFLINE',
  /**
   * The online table is not available for serving because the data synchronization pipeline has
   * failed. Please review the pipeline event logs to troubleshoot.
   */
  OFFLINE_FAILED: 'OFFLINE_FAILED',
  /**
   * The data synchronization pipeline has encountered an error but the online table is still
   * available for serving (potentially stale) data. Please review the pipeline event logs to
   * troubleshoot.
   */
  ONLINE_PIPELINE_FAILED: 'ONLINE_PIPELINE_FAILED',
  /**
   * The online table is available for serving, and is provisioning resources for a newly started
   * data synchronization pipeline.
   */
  ONLINE_UPDATING_PIPELINE_RESOURCES: 'ONLINE_UPDATING_PIPELINE_RESOURCES',
} as const;
export type OnlineTableState =
  | (typeof OnlineTableState)[keyof typeof OnlineTableState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ProvisioningInfo_State = {
  STATE_UNSPECIFIED: 'STATE_UNSPECIFIED',
  PROVISIONING: 'PROVISIONING',
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  DELETING: 'DELETING',
  UPDATING: 'UPDATING',
  DEGRADED: 'DEGRADED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ProvisioningInfo_State =
  | (typeof ProvisioningInfo_State)[keyof typeof ProvisioningInfo_State]
  | (string & {});

/**
 * Detailed status of an online table. Shown if the online table is in the ONLINE_CONTINUOUS_UPDATE
 * or the ONLINE_UPDATING_PIPELINE_RESOURCES state.
 */
export interface ContinuousUpdateStatus {
  /**
   * The last source table Delta version that was synced to the online table. Note that this Delta
   * version may not be completely synced to the online table yet.
   */
  lastProcessedCommitVersion?: bigint | undefined;
  /**
   * The timestamp of the last time any data was synchronized from the source table to the online
   * table.
   */
  timestamp?: Temporal.Instant | undefined;
  /** Progress of the initial data synchronization. */
  initialPipelineSyncProgress?: PipelineProgress | undefined;
}

/** Create an online table */
export interface CreateOnlineTableRequest {
  /** Specification of the online table to be created. */
  table?: OnlineTable | undefined;
}

/** Delete an online table. */
export interface DeleteOnlineTableRequest {
  /** Full three-part (catalog, schema, table) name of the table. */
  name?: string | undefined;
}

/**
 * Detailed status of an online table. Shown if the online table is in the OFFLINE_FAILED or the
 * ONLINE_PIPELINE_FAILED state.
 */
export interface FailedStatus {
  /**
   * The last source table Delta version that was synced to the online table. Note that this Delta
   * version may only be partially synced to the online table. Only populated if the table is still
   * online and available for serving.
   */
  lastProcessedCommitVersion?: bigint | undefined;
  /**
   * The timestamp of the last time any data was synchronized from the source table to the online
   * table. Only populated if the table is still online and available for serving.
   */
  timestamp?: Temporal.Instant | undefined;
}

/** Get information about an online table. */
export interface GetOnlineTableRequest {
  /** Full three-part (catalog, schema, table) name of the table. */
  name?: string | undefined;
}

/** Online Table information. */
export interface OnlineTable {
  /** Full three-part (catalog, schema, table) name of the table. */
  name?: string | undefined;
  /** Specification of the online table. */
  spec?: OnlineTableSpec | undefined;
  /**
   * Online Table data synchronization status
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  status?: OnlineTableStatus | undefined;
  /**
   * Data serving REST API URL for this table
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  tableServingUrl?: string | undefined;
  /**
   * The provisioning state of the online table entity in Unity Catalog. This is distinct from the
   * state of the data synchronization pipeline (i.e. the table may be in "ACTIVE" but the pipeline
   * may be in "PROVISIONING" as it runs asynchronously).
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  unityCatalogProvisioningState?: ProvisioningInfo_State | undefined;
}

/** Specification of an online table. */
export interface OnlineTableSpec {
  /** Exactly one type of scheduling policy should be applied. */
  schedulingPolicy?:
    | {
        $case: 'runContinuously';
        /** Pipeline runs continuously after generating the initial data. */
        runContinuously: OnlineTableSpec_ContinuousSchedulingPolicy;
      }
    | {
        $case: 'runTriggered';
        /** Pipeline stops after generating the initial data and can be triggered later (manually, through a cron job or through data triggers) */
        runTriggered: OnlineTableSpec_TriggeredSchedulingPolicy;
      }
    | undefined;
  /** Three-part (catalog, schema, table) name of the source Delta table. */
  sourceTableFullName?: string | undefined;
  /** Primary Key columns to be used for data insert/update in the destination. */
  primaryKeyColumns?: string[] | undefined;
  /** Time series key to deduplicate (tie-break) rows with the same primary key. */
  timeseriesKey?: string | undefined;
  /**
   * Whether to create a full-copy pipeline -- a pipeline that stops after creates a full copy of
   * the source table upon initialization and does not process any change data feeds (CDFs)
   * afterwards. The pipeline can still be manually triggered afterwards, but it always perform a
   * full copy of the source table and there are no incremental updates. This mode is useful for
   * syncing views or tables without CDFs to online tables.
   * Note that the full-copy pipeline only supports "triggered" scheduling policy.
   */
  performFullCopy?: boolean | undefined;
  /** ID of the associated pipeline. Generated by the server - cannot be set by the caller. */
  pipelineId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface OnlineTableSpec_ContinuousSchedulingPolicy {}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface OnlineTableSpec_TriggeredSchedulingPolicy {}

/** Status of an online table. */
export interface OnlineTableStatus {
  /** The state of the online table. */
  detailedState?: OnlineTableState | undefined;
  /** A text description of the current state of the online table. */
  message?: string | undefined;
  /** The detailed status based on the online table state. */
  detailedStatus?:
    | {$case: 'provisioningStatus'; provisioningStatus: ProvisioningStatus}
    | {
        $case: 'continuousUpdateStatus';
        continuousUpdateStatus: ContinuousUpdateStatus;
      }
    | {
        $case: 'triggeredUpdateStatus';
        triggeredUpdateStatus: TriggeredUpdateStatus;
      }
    | {$case: 'failedStatus'; failedStatus: FailedStatus}
    | undefined;
}

/** Progress information of the Online Table data synchronization pipeline. */
export interface PipelineProgress {
  /**
   * The source table Delta version that was last processed by the pipeline. The pipeline may not
   * have completely processed this version yet.
   */
  latestVersionCurrentlyProcessing?: bigint | undefined;
  /** The number of rows that have been synced in this update. */
  syncedRowCount?: bigint | undefined;
  /** The total number of rows that need to be synced in this update. This number may be an estimate. */
  totalRowCount?: bigint | undefined;
  /** The completion ratio of this update. This is a number between 0 and 1. */
  syncProgressCompletion?: number | undefined;
  /** The estimated time remaining to complete this update in seconds. */
  estimatedCompletionTimeSeconds?: number | undefined;
}

/** Status of an asynchronously provisioned resource. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProvisioningInfo {}

/**
 * Detailed status of an online table. Shown if the online table is in the
 * PROVISIONING_PIPELINE_RESOURCES or the PROVISIONING_INITIAL_SNAPSHOT state.
 */
export interface ProvisioningStatus {
  /**
   * Details about initial data synchronization. Only populated when in the
   * PROVISIONING_INITIAL_SNAPSHOT state.
   */
  initialPipelineSyncProgress?: PipelineProgress | undefined;
}

/**
 * Detailed status of an online table. Shown if the online table is in the ONLINE_TRIGGERED_UPDATE
 * or the ONLINE_NO_PENDING_UPDATE state.
 */
export interface TriggeredUpdateStatus {
  /**
   * The last source table Delta version that was synced to the online table. Note that this Delta
   * version may not be completely synced to the online table yet.
   */
  lastProcessedCommitVersion?: bigint | undefined;
  /**
   * The timestamp of the last time any data was synchronized from the source table to the online
   * table.
   */
  timestamp?: Temporal.Instant | undefined;
  /** Progress of the active data synchronization pipeline. */
  triggeredUpdateProgress?: PipelineProgress | undefined;
}

export const unmarshalContinuousUpdateStatusSchema: z.ZodType<ContinuousUpdateStatus> =
  z
    .object({
      last_processed_commit_version: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      timestamp: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      initial_pipeline_sync_progress: z
        .lazy(() => unmarshalPipelineProgressSchema)
        .optional(),
    })
    .transform(d => ({
      lastProcessedCommitVersion: d.last_processed_commit_version,
      timestamp: d.timestamp,
      initialPipelineSyncProgress: d.initial_pipeline_sync_progress,
    }));

export const unmarshalFailedStatusSchema: z.ZodType<FailedStatus> = z
  .object({
    last_processed_commit_version: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    timestamp: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    lastProcessedCommitVersion: d.last_processed_commit_version,
    timestamp: d.timestamp,
  }));

export const unmarshalOnlineTableSchema: z.ZodType<OnlineTable> = z
  .object({
    name: z.string().optional(),
    spec: z.lazy(() => unmarshalOnlineTableSpecSchema).optional(),
    status: z.lazy(() => unmarshalOnlineTableStatusSchema).optional(),
    table_serving_url: z.string().optional(),
    unity_catalog_provisioning_state: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    spec: d.spec,
    status: d.status,
    tableServingUrl: d.table_serving_url,
    unityCatalogProvisioningState: d.unity_catalog_provisioning_state,
  }));

export const unmarshalOnlineTableSpecSchema: z.ZodType<OnlineTableSpec> = z
  .object({
    run_continuously: z
      .lazy(() => unmarshalOnlineTableSpec_ContinuousSchedulingPolicySchema)
      .optional(),
    run_triggered: z
      .lazy(() => unmarshalOnlineTableSpec_TriggeredSchedulingPolicySchema)
      .optional(),
    source_table_full_name: z.string().optional(),
    primary_key_columns: z.array(z.string()).optional(),
    timeseries_key: z.string().optional(),
    perform_full_copy: z.boolean().optional(),
    pipeline_id: z.string().optional(),
  })
  .transform(d => ({
    schedulingPolicy:
      d.run_continuously !== undefined
        ? {
            $case: 'runContinuously' as const,
            runContinuously: d.run_continuously,
          }
        : d.run_triggered !== undefined
          ? {$case: 'runTriggered' as const, runTriggered: d.run_triggered}
          : undefined,
    sourceTableFullName: d.source_table_full_name,
    primaryKeyColumns: d.primary_key_columns,
    timeseriesKey: d.timeseries_key,
    performFullCopy: d.perform_full_copy,
    pipelineId: d.pipeline_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalOnlineTableSpec_ContinuousSchedulingPolicySchema: z.ZodType<OnlineTableSpec_ContinuousSchedulingPolicy> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalOnlineTableSpec_TriggeredSchedulingPolicySchema: z.ZodType<OnlineTableSpec_TriggeredSchedulingPolicy> =
  z.object({});

export const unmarshalOnlineTableStatusSchema: z.ZodType<OnlineTableStatus> = z
  .object({
    detailed_state: z.string().optional(),
    message: z.string().optional(),
    provisioning_status: z
      .lazy(() => unmarshalProvisioningStatusSchema)
      .optional(),
    continuous_update_status: z
      .lazy(() => unmarshalContinuousUpdateStatusSchema)
      .optional(),
    triggered_update_status: z
      .lazy(() => unmarshalTriggeredUpdateStatusSchema)
      .optional(),
    failed_status: z.lazy(() => unmarshalFailedStatusSchema).optional(),
  })
  .transform(d => ({
    detailedState: d.detailed_state,
    message: d.message,
    detailedStatus:
      d.provisioning_status !== undefined
        ? {
            $case: 'provisioningStatus' as const,
            provisioningStatus: d.provisioning_status,
          }
        : d.continuous_update_status !== undefined
          ? {
              $case: 'continuousUpdateStatus' as const,
              continuousUpdateStatus: d.continuous_update_status,
            }
          : d.triggered_update_status !== undefined
            ? {
                $case: 'triggeredUpdateStatus' as const,
                triggeredUpdateStatus: d.triggered_update_status,
              }
            : d.failed_status !== undefined
              ? {$case: 'failedStatus' as const, failedStatus: d.failed_status}
              : undefined,
  }));

export const unmarshalPipelineProgressSchema: z.ZodType<PipelineProgress> = z
  .object({
    latest_version_currently_processing: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    synced_row_count: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    total_row_count: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    sync_progress_completion: z.number().optional(),
    estimated_completion_time_seconds: z.number().optional(),
  })
  .transform(d => ({
    latestVersionCurrentlyProcessing: d.latest_version_currently_processing,
    syncedRowCount: d.synced_row_count,
    totalRowCount: d.total_row_count,
    syncProgressCompletion: d.sync_progress_completion,
    estimatedCompletionTimeSeconds: d.estimated_completion_time_seconds,
  }));

export const unmarshalProvisioningStatusSchema: z.ZodType<ProvisioningStatus> =
  z
    .object({
      initial_pipeline_sync_progress: z
        .lazy(() => unmarshalPipelineProgressSchema)
        .optional(),
    })
    .transform(d => ({
      initialPipelineSyncProgress: d.initial_pipeline_sync_progress,
    }));

export const unmarshalTriggeredUpdateStatusSchema: z.ZodType<TriggeredUpdateStatus> =
  z
    .object({
      last_processed_commit_version: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      timestamp: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      triggered_update_progress: z
        .lazy(() => unmarshalPipelineProgressSchema)
        .optional(),
    })
    .transform(d => ({
      lastProcessedCommitVersion: d.last_processed_commit_version,
      timestamp: d.timestamp,
      triggeredUpdateProgress: d.triggered_update_progress,
    }));

export const marshalContinuousUpdateStatusSchema: z.ZodType = z
  .object({
    lastProcessedCommitVersion: z.bigint().optional(),
    timestamp: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    initialPipelineSyncProgress: z
      .lazy(() => marshalPipelineProgressSchema)
      .optional(),
  })
  .transform(d => ({
    last_processed_commit_version: d.lastProcessedCommitVersion,
    timestamp: d.timestamp,
    initial_pipeline_sync_progress: d.initialPipelineSyncProgress,
  }));

export const marshalFailedStatusSchema: z.ZodType = z
  .object({
    lastProcessedCommitVersion: z.bigint().optional(),
    timestamp: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    last_processed_commit_version: d.lastProcessedCommitVersion,
    timestamp: d.timestamp,
  }));

export const marshalOnlineTableSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    spec: z.lazy(() => marshalOnlineTableSpecSchema).optional(),
    status: z.lazy(() => marshalOnlineTableStatusSchema).optional(),
    tableServingUrl: z.string().optional(),
    unityCatalogProvisioningState: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    spec: d.spec,
    status: d.status,
    table_serving_url: d.tableServingUrl,
    unity_catalog_provisioning_state: d.unityCatalogProvisioningState,
  }));

export const marshalOnlineTableSpecSchema: z.ZodType = z
  .object({
    schedulingPolicy: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('runContinuously'),
          runContinuously: z.lazy(
            () => marshalOnlineTableSpec_ContinuousSchedulingPolicySchema
          ),
        }),
        z.object({
          $case: z.literal('runTriggered'),
          runTriggered: z.lazy(
            () => marshalOnlineTableSpec_TriggeredSchedulingPolicySchema
          ),
        }),
      ])
      .optional(),
    sourceTableFullName: z.string().optional(),
    primaryKeyColumns: z.array(z.string()).optional(),
    timeseriesKey: z.string().optional(),
    performFullCopy: z.boolean().optional(),
    pipelineId: z.string().optional(),
  })
  .transform(d => ({
    ...(d.schedulingPolicy?.$case === 'runContinuously' && {
      run_continuously: d.schedulingPolicy.runContinuously,
    }),
    ...(d.schedulingPolicy?.$case === 'runTriggered' && {
      run_triggered: d.schedulingPolicy.runTriggered,
    }),
    source_table_full_name: d.sourceTableFullName,
    primary_key_columns: d.primaryKeyColumns,
    timeseries_key: d.timeseriesKey,
    perform_full_copy: d.performFullCopy,
    pipeline_id: d.pipelineId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalOnlineTableSpec_ContinuousSchedulingPolicySchema: z.ZodType =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalOnlineTableSpec_TriggeredSchedulingPolicySchema: z.ZodType =
  z.object({});

export const marshalOnlineTableStatusSchema: z.ZodType = z
  .object({
    detailedState: z.string().optional(),
    message: z.string().optional(),
    detailedStatus: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('provisioningStatus'),
          provisioningStatus: z.lazy(() => marshalProvisioningStatusSchema),
        }),
        z.object({
          $case: z.literal('continuousUpdateStatus'),
          continuousUpdateStatus: z.lazy(
            () => marshalContinuousUpdateStatusSchema
          ),
        }),
        z.object({
          $case: z.literal('triggeredUpdateStatus'),
          triggeredUpdateStatus: z.lazy(
            () => marshalTriggeredUpdateStatusSchema
          ),
        }),
        z.object({
          $case: z.literal('failedStatus'),
          failedStatus: z.lazy(() => marshalFailedStatusSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    detailed_state: d.detailedState,
    message: d.message,
    ...(d.detailedStatus?.$case === 'provisioningStatus' && {
      provisioning_status: d.detailedStatus.provisioningStatus,
    }),
    ...(d.detailedStatus?.$case === 'continuousUpdateStatus' && {
      continuous_update_status: d.detailedStatus.continuousUpdateStatus,
    }),
    ...(d.detailedStatus?.$case === 'triggeredUpdateStatus' && {
      triggered_update_status: d.detailedStatus.triggeredUpdateStatus,
    }),
    ...(d.detailedStatus?.$case === 'failedStatus' && {
      failed_status: d.detailedStatus.failedStatus,
    }),
  }));

export const marshalPipelineProgressSchema: z.ZodType = z
  .object({
    latestVersionCurrentlyProcessing: z.bigint().optional(),
    syncedRowCount: z.bigint().optional(),
    totalRowCount: z.bigint().optional(),
    syncProgressCompletion: z.number().optional(),
    estimatedCompletionTimeSeconds: z.number().optional(),
  })
  .transform(d => ({
    latest_version_currently_processing: d.latestVersionCurrentlyProcessing,
    synced_row_count: d.syncedRowCount,
    total_row_count: d.totalRowCount,
    sync_progress_completion: d.syncProgressCompletion,
    estimated_completion_time_seconds: d.estimatedCompletionTimeSeconds,
  }));

export const marshalProvisioningStatusSchema: z.ZodType = z
  .object({
    initialPipelineSyncProgress: z
      .lazy(() => marshalPipelineProgressSchema)
      .optional(),
  })
  .transform(d => ({
    initial_pipeline_sync_progress: d.initialPipelineSyncProgress,
  }));

export const marshalTriggeredUpdateStatusSchema: z.ZodType = z
  .object({
    lastProcessedCommitVersion: z.bigint().optional(),
    timestamp: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    triggeredUpdateProgress: z
      .lazy(() => marshalPipelineProgressSchema)
      .optional(),
  })
  .transform(d => ({
    last_processed_commit_version: d.lastProcessedCommitVersion,
    timestamp: d.timestamp,
    triggered_update_progress: d.triggeredUpdateProgress,
  }));
