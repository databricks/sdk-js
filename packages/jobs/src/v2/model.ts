// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AuthenticationMethod = {
  OAUTH: 'OAUTH',
  PAT: 'PAT',
} as const;
export type AuthenticationMethod =
  | (typeof AuthenticationMethod)[keyof typeof AuthenticationMethod]
  | (string & {});

/**
 * Availability type used for all subsequent nodes past the `first_on_demand` ones.
 *
 * Note: If `first_on_demand` is zero, this availability type will be used for the entire cluster.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AwsAvailability = {
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
export type AwsAvailability =
  | (typeof AwsAvailability)[keyof typeof AwsAvailability]
  | (string & {});

/**
 * Availability type used for all subsequent nodes past the `first_on_demand` ones.
 * Note: If `first_on_demand` is zero, this availability type will be used for the entire cluster.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AzureAvailability = {
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
export type AzureAvailability =
  | (typeof AzureAvailability)[keyof typeof AzureAvailability]
  | (string & {});

/**
 * The kind of compute described by this compute specification.
 *
 * Depending on `kind`, different validations and default values will be applied.
 *
 * Clusters with `kind = CLASSIC_PREVIEW` support the following fields, whereas clusters with no specified `kind` do not.
 * * [is_single_node](/api/workspace/clusters/create#is_single_node)
 * * [use_ml_runtime](/api/workspace/clusters/create#use_ml_runtime)
 *
 * By using the [simple form](https://docs.databricks.com/compute/simple-form.html), your clusters are automatically using `kind = CLASSIC_PREVIEW`.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ComputeKind = {
  COMPUTE_KIND_UNSPECIFIED: 'COMPUTE_KIND_UNSPECIFIED',
  CLASSIC_PREVIEW: 'CLASSIC_PREVIEW',
} as const;
export type ComputeKind =
  | (typeof ComputeKind)[keyof typeof ComputeKind]
  | (string & {});

/**
 * Confidential computing technology for GCP instances.
 * Aligns with gcloud's --confidential-compute-type flag and the REST API's
 * confidentialInstanceConfig.confidentialInstanceType field.
 * See: https://cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ConfidentialComputeType = {
  CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED:
    'CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED',
  CONFIDENTIAL_COMPUTE_TYPE_NONE: 'CONFIDENTIAL_COMPUTE_TYPE_NONE',
  SEV_SNP: 'SEV_SNP',
} as const;
export type ConfidentialComputeType =
  | (typeof ConfidentialComputeType)[keyof typeof ConfidentialComputeType]
  | (string & {});

/**
 * Data security mode decides what data governance model to use when accessing data
 * from a cluster.
 *
 * * `DATA_SECURITY_MODE_AUTO`: <Databricks> will choose the most appropriate access mode depending on your compute configuration.
 * * `DATA_SECURITY_MODE_STANDARD`: A secure cluster that can be shared by multiple users. Cluster users are fully isolated so that they cannot see each other’s data and credentials. Most data governance features are supported in this mode. But programming languages and cluster features might be limited.
 * * `DATA_SECURITY_MODE_DEDICATED`: A secure cluster that can only be exclusively used by a single user specified in `single_user_name`. Most programming languages, cluster features and data governance features are available in this mode.
 *
 * The following modes are legacy aliases for the above modes:
 *
 * * `USER_ISOLATION`: Legacy alias for `DATA_SECURITY_MODE_STANDARD`.
 * * `SINGLE_USER`: Legacy alias for `DATA_SECURITY_MODE_DEDICATED`.
 *
 * The following modes are deprecated starting with Databricks Runtime 15.0 and
 * will be removed for future Databricks Runtime versions:
 *
 * * `LEGACY_TABLE_ACL`: This mode is for users migrating from legacy Table ACL clusters.
 * * `LEGACY_PASSTHROUGH`: This mode is for users migrating from legacy Passthrough on high concurrency clusters.
 * * `LEGACY_SINGLE_USER`: This mode is for users migrating from legacy Passthrough on standard clusters.
 * * `LEGACY_SINGLE_USER_STANDARD`: This mode provides a way that doesn’t have UC nor passthrough enabled.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DataSecurityMode = {
  /**
   * No security isolation for multiple users sharing the cluster. Data governance features
   * are not available in this mode.
   */
  NONE: 'NONE',
  /** Legacy alias for `DATA_SECURITY_MODE_DEDICATED`. */
  SINGLE_USER: 'SINGLE_USER',
  /** Legacy alias for `DATA_SECURITY_MODE_STANDARD`. */
  USER_ISOLATION: 'USER_ISOLATION',
  /** This mode is for users migrating from legacy Table ACL clusters. */
  LEGACY_TABLE_ACL: 'LEGACY_TABLE_ACL',
  /** This mode is for users migrating from legacy Passthrough on high concurrency clusters. */
  LEGACY_PASSTHROUGH: 'LEGACY_PASSTHROUGH',
  /** This mode is for users migrating from legacy Passthrough on standard clusters. */
  LEGACY_SINGLE_USER: 'LEGACY_SINGLE_USER',
  /** This is mode where single user is enforced but no actual security feature enabled. */
  LEGACY_SINGLE_USER_STANDARD: 'LEGACY_SINGLE_USER_STANDARD',
  /**
   * A secure cluster that can be shared by multiple users. Cluster users are fully isolated
   * so that they cannot see each other's data and credentials. Most data governance features
   * are supported in this mode. But programming languages and cluster features might be limited.
   */
  DATA_SECURITY_MODE_STANDARD: 'DATA_SECURITY_MODE_STANDARD',
  /**
   * A secure cluster that can only be exclusively used by a single user specified in
   * `single_user_name`. Most programming languages, cluster features and data governance
   * features are available in this mode.
   */
  DATA_SECURITY_MODE_DEDICATED: 'DATA_SECURITY_MODE_DEDICATED',
  /**
   * Databricks will choose `DATA_SECURITY_MODE_STANDARD` or `DATA_SECURITY_MODE_DEDICATED`
   * depending on the compute configuration.
   */
  DATA_SECURITY_MODE_AUTO: 'DATA_SECURITY_MODE_AUTO',
} as const;
export type DataSecurityMode =
  | (typeof DataSecurityMode)[keyof typeof DataSecurityMode]
  | (string & {});

/** Response enumeration from calling the dbt platform API, for inclusion in output */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DbtPlatformRunStatus = {
  DBT_PLATFORM_RUN_STATUS_UNSPECIFIED: 'DBT_PLATFORM_RUN_STATUS_UNSPECIFIED',
  QUEUED: 'QUEUED',
  STARTING: 'STARTING',
  RUNNING: 'RUNNING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  CANCELLED: 'CANCELLED',
} as const;
export type DbtPlatformRunStatus =
  | (typeof DbtPlatformRunStatus)[keyof typeof DbtPlatformRunStatus]
  | (string & {});

/**
 * All EBS volume types that <Databricks> supports.
 * See https://aws.amazon.com/ebs/details/ for details.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EbsVolumeType = {
  /** Provision extra storage using AWS gp2 EBS volumes. */
  GENERAL_PURPOSE_SSD: 'GENERAL_PURPOSE_SSD',
  /** Provision extra storage using AWS st1 volumes. */
  THROUGHPUT_OPTIMIZED_HDD: 'THROUGHPUT_OPTIMIZED_HDD',
} as const;
export type EbsVolumeType =
  | (typeof EbsVolumeType)[keyof typeof EbsVolumeType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Format = {
  SINGLE_TASK: 'SINGLE_TASK',
  MULTI_TASK: 'MULTI_TASK',
} as const;
export type Format = (typeof Format)[keyof typeof Format] | (string & {});

/**
 * This field determines whether the instance pool will contain preemptible
 * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if the former is unavailable.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const GcpAvailability = {
  PREEMPTIBLE_GCP: 'PREEMPTIBLE_GCP',
  ON_DEMAND_GCP: 'ON_DEMAND_GCP',
  PREEMPTIBLE_WITH_FALLBACK_GCP: 'PREEMPTIBLE_WITH_FALLBACK_GCP',
} as const;
export type GcpAvailability =
  | (typeof GcpAvailability)[keyof typeof GcpAvailability]
  | (string & {});

/**
 * HardwareAcceleratorType: The type of hardware accelerator to use for compute workloads.
 * NOTE: This enum is referenced and is intended to be used by other <Databricks> services
 * that need to specify hardware accelerator requirements for AI compute workloads.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const HardwareAcceleratorType = {
  /** GPU_1xA10: Single A10 GPU configuration. */
  GPU_1X_A10: 'GPU_1xA10',
  /** GPU_8xH100: 8x H100 GPU configuration. */
  GPU_8X_H100: 'GPU_8xH100',
} as const;
export type HardwareAcceleratorType =
  | (typeof HardwareAcceleratorType)[keyof typeof HardwareAcceleratorType]
  | (string & {});

/**
 * Edit mode of the job.
 *
 * * `UI_LOCKED`: The job is in a locked UI state and cannot be modified.
 * * `EDITABLE`: The job is in an editable state and can be modified.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const JobEditMode = {
  UI_LOCKED: 'UI_LOCKED',
  EDITABLE: 'EDITABLE',
} as const;
export type JobEditMode =
  | (typeof JobEditMode)[keyof typeof JobEditMode]
  | (string & {});

/**
 * Specifies the health metric that is being evaluated for a particular health rule.
 *
 * * `RUN_DURATION_SECONDS`: Expected total time for a run in seconds.
 * * `STREAMING_BACKLOG_BYTES`: An estimate of the maximum bytes of data waiting to be consumed across all streams. This metric is in Public Preview.
 * * `STREAMING_BACKLOG_RECORDS`: An estimate of the maximum offset lag across all streams. This metric is in Public Preview.
 * * `STREAMING_BACKLOG_SECONDS`: An estimate of the maximum consumer delay across all streams. This metric is in Public Preview.
 * * `STREAMING_BACKLOG_FILES`: An estimate of the maximum number of outstanding files across all streams. This metric is in Public Preview.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const JobsHealthMetric = {
  RUN_DURATION_SECONDS: 'RUN_DURATION_SECONDS',
  STREAMING_BACKLOG_BYTES: 'STREAMING_BACKLOG_BYTES',
  STREAMING_BACKLOG_RECORDS: 'STREAMING_BACKLOG_RECORDS',
  STREAMING_BACKLOG_SECONDS: 'STREAMING_BACKLOG_SECONDS',
  STREAMING_BACKLOG_FILES: 'STREAMING_BACKLOG_FILES',
} as const;
export type JobsHealthMetric =
  | (typeof JobsHealthMetric)[keyof typeof JobsHealthMetric]
  | (string & {});

/** Specifies the operator used to compare the health metric value with the specified threshold. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const JobsHealthOperator = {
  GREATER_THAN: 'GREATER_THAN',
} as const;
export type JobsHealthOperator =
  | (typeof JobsHealthOperator)[keyof typeof JobsHealthOperator]
  | (string & {});

/**
 * The repair history item type. Indicates whether a run is the original run or
 * a repair run.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RepairType = {
  ORIGINAL: 'ORIGINAL',
  REPAIR: 'REPAIR',
} as const;
export type RepairType =
  | (typeof RepairType)[keyof typeof RepairType]
  | (string & {});

/**
 * The type of a run.
 * * `JOB_RUN`: Normal job run. A run created with :method:jobs/runNow.
 * * `WORKFLOW_RUN`: Workflow run. A run created with [dbutils.notebook.run](/dev-tools/databricks-utils.html#dbutils-workflow).
 * * `SUBMIT_RUN`: Submit run. A run created with :method:jobs/submit.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RunType = {
  JOB_RUN: 'JOB_RUN',
  WORKFLOW_RUN: 'WORKFLOW_RUN',
  SUBMIT_RUN: 'SUBMIT_RUN',
} as const;
export type RunType = (typeof RunType)[keyof typeof RunType] | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RuntimeEngine = {
  /**
   * Default value. In this case, ignore the RUNTIME_ENGINE
   * parameter and do a spark version lookup entirely on the sparkVersion string.
   */
  NULL: 'NULL',
  /** Use standard engine */
  STANDARD: 'STANDARD',
  /** Use Photon engine */
  PHOTON: 'PHOTON',
} as const;
export type RuntimeEngine =
  | (typeof RuntimeEngine)[keyof typeof RuntimeEngine]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SchedulePauseStatus = {
  UNPAUSED: 'UNPAUSED',
  PAUSED: 'PAUSED',
} as const;
export type SchedulePauseStatus =
  | (typeof SchedulePauseStatus)[keyof typeof SchedulePauseStatus]
  | (string & {});

/**
 * Optional location type of the SQL file. When set to `WORKSPACE`, the SQL file will be retrieved\
 * from the local <Databricks> workspace. When set to `GIT`, the SQL file will be retrieved from a Git repository
 * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
 *
 * * `WORKSPACE`: SQL file is located in <Databricks> workspace.
 * * `GIT`: SQL file is located in cloud Git provider.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Source = {
  WORKSPACE: 'WORKSPACE',
  GIT: 'GIT',
} as const;
export type Source = (typeof Source)[keyof typeof Source] | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const StorageMode = {
  DIRECT_QUERY: 'DIRECT_QUERY',
  IMPORT: 'IMPORT',
  DUAL: 'DUAL',
} as const;
export type StorageMode =
  | (typeof StorageMode)[keyof typeof StorageMode]
  | (string & {});

/**
 * An optional value indicating the condition that determines whether the task should be run once its dependencies have been completed. When omitted, defaults to `ALL_SUCCESS`.
 *
 * Possible values are:
 * * `ALL_SUCCESS`: All dependencies have executed and succeeded
 * * `AT_LEAST_ONE_SUCCESS`: At least one dependency has succeeded
 * * `NONE_FAILED`: None of the dependencies have failed and at least one was executed
 * * `ALL_DONE`: All dependencies have been completed
 * * `AT_LEAST_ONE_FAILED`: At least one dependency failed
 * * `ALL_FAILED`: ALl dependencies have failed
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TaskDependencyType = {
  ALL_SUCCESS: 'ALL_SUCCESS',
  ALL_DONE: 'ALL_DONE',
  NONE_FAILED: 'NONE_FAILED',
  AT_LEAST_ONE_SUCCESS: 'AT_LEAST_ONE_SUCCESS',
  ALL_FAILED: 'ALL_FAILED',
  AT_LEAST_ONE_FAILED: 'AT_LEAST_ONE_FAILED',
} as const;
export type TaskDependencyType =
  | (typeof TaskDependencyType)[keyof typeof TaskDependencyType]
  | (string & {});

/**
 * task retry mode of the continuous job
 * * NEVER: The failed task will not be retried.
 * * ON_FAILURE: Retry a failed task if at least one other task in the job is still running its first attempt.
 * When this condition is no longer met or the retry limit is reached, the job run is cancelled and a new run is started.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TaskRetryMode = {
  NEVER: 'NEVER',
  ON_FAILURE: 'ON_FAILURE',
} as const;
export type TaskRetryMode =
  | (typeof TaskRetryMode)[keyof typeof TaskRetryMode]
  | (string & {});

/**
 * The type of trigger that fired this run.
 *
 * * `PERIODIC`: Schedules that periodically trigger runs, such as a cron scheduler.
 * * `ONE_TIME`: One time triggers that fire a single run. This occurs you triggered a single run on demand through the UI or the API.
 * * `RETRY`: Indicates a run that is triggered as a retry of a previously failed run. This occurs when you request to re-run the job in case of failures.
 * * `RUN_JOB_TASK`: Indicates a run that is triggered using a Run Job task.
 * * `FILE_ARRIVAL`: Indicates a run that is triggered by a file arrival.
 * * `CONTINUOUS`: Indicates a run that is triggered by a continuous job.
 * * `TABLE`: Indicates a run that is triggered by a table update.
 * * `CONTINUOUS_RESTART`: Indicates a run created by user to manually restart a continuous job run.
 * * `MODEL`: Indicates a run that is triggered by a model update.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TriggerType = {
  PERIODIC: 'PERIODIC',
  ONE_TIME: 'ONE_TIME',
  RETRY: 'RETRY',
  RUN_JOB_TASK: 'RUN_JOB_TASK',
  FILE_ARRIVAL: 'FILE_ARRIVAL',
  CONTINUOUS: 'CONTINUOUS',
  TABLE: 'TABLE',
  CONTINUOUS_RESTART: 'CONTINUOUS_RESTART',
} as const;
export type TriggerType =
  | (typeof TriggerType)[keyof typeof TriggerType]
  | (string & {});

/**
 * * `NOTEBOOK`: Notebook view item.
 * * `DASHBOARD`: Dashboard view item.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ViewType = {
  NOTEBOOK: 'NOTEBOOK',
  DASHBOARD: 'DASHBOARD',
} as const;
export type ViewType = (typeof ViewType)[keyof typeof ViewType] | (string & {});

/**
 * * `CODE`: Code view of the notebook.
 * * `DASHBOARDS`: All dashboard views of the notebook.
 * * `ALL`: All views of the notebook.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ViewsToExport = {
  CODE: 'CODE',
  DASHBOARDS: 'DASHBOARDS',
  ALL: 'ALL',
} as const;
export type ViewsToExport =
  | (typeof ViewsToExport)[keyof typeof ViewsToExport]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AccessControlRequest_JobPermission = {
  CAN_VIEW: 'CAN_VIEW',
  CAN_MANAGE_RUN: 'CAN_MANAGE_RUN',
  IS_OWNER: 'IS_OWNER',
  CAN_MANAGE: 'CAN_MANAGE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AccessControlRequest_JobPermission =
  | (typeof AccessControlRequest_JobPermission)[keyof typeof AccessControlRequest_JobPermission]
  | (string & {});

/** Same alert evaluation state as in redash-v2/api/proto/alertsv2/alerts.proto */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AlertEvaluationState_AlertEvaluationState = {
  ALERT_EVALUATION_STATE_UNSPECIFIED: 'ALERT_EVALUATION_STATE_UNSPECIFIED',
  UNKNOWN: 'UNKNOWN',
  TRIGGERED: 'TRIGGERED',
  OK: 'OK',
  ERROR: 'ERROR',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AlertEvaluationState_AlertEvaluationState =
  | (typeof AlertEvaluationState_AlertEvaluationState)[keyof typeof AlertEvaluationState_AlertEvaluationState]
  | (string & {});

/**
 * Copied from elastic-spark-common/api/messages/runs.proto.
 * Using the original definition to remove coupling with jobs API definition
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomTaskRunLifeCycleState_CleanRoomTaskRunLifeCycleState = {
  RUN_LIFE_CYCLE_STATE_UNSPECIFIED: 'RUN_LIFE_CYCLE_STATE_UNSPECIFIED',
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  TERMINATING: 'TERMINATING',
  TERMINATED: 'TERMINATED',
  SKIPPED: 'SKIPPED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BLOCKED: 'BLOCKED',
  WAITING_FOR_RETRY: 'WAITING_FOR_RETRY',
  QUEUED: 'QUEUED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoomTaskRunLifeCycleState_CleanRoomTaskRunLifeCycleState =
  | (typeof CleanRoomTaskRunLifeCycleState_CleanRoomTaskRunLifeCycleState)[keyof typeof CleanRoomTaskRunLifeCycleState_CleanRoomTaskRunLifeCycleState]
  | (string & {});

/**
 * Copied from elastic-spark-common/api/messages/runs.proto.
 * Using the original definition to avoid cyclic dependency.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomTaskRunResultState_CleanRoomTaskRunResultState = {
  RUN_RESULT_STATE_UNSPECIFIED: 'RUN_RESULT_STATE_UNSPECIFIED',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  TIMEDOUT: 'TIMEDOUT',
  CANCELED: 'CANCELED',
  MAXIMUM_CONCURRENT_RUNS_REACHED: 'MAXIMUM_CONCURRENT_RUNS_REACHED',
  UPSTREAM_CANCELED: 'UPSTREAM_CANCELED',
  UPSTREAM_FAILED: 'UPSTREAM_FAILED',
  EXCLUDED: 'EXCLUDED',
  EVICTED: 'EVICTED',
  SUCCESS_WITH_FAILURES: 'SUCCESS_WITH_FAILURES',
  UPSTREAM_EVICTED: 'UPSTREAM_EVICTED',
  /** 12 is reserved for previously used SUCCESS_WITH_SKIPPED_CELLS */
  DISABLED: 'DISABLED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoomTaskRunResultState_CleanRoomTaskRunResultState =
  | (typeof CleanRoomTaskRunResultState_CleanRoomTaskRunResultState)[keyof typeof CleanRoomTaskRunResultState_CleanRoomTaskRunResultState]
  | (string & {});

/**
 * Customer-facing AcceleratorType: hardware accelerator type for the
 * AiRuntime workload. Per-node accelerator count is encoded in the value
 * name (e.g. `GPU_8xH100` means 8 H100s per node).
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ComputeSpec_AcceleratorType = {
  /** Single A10 GPU per node. Good for development and small workloads. */
  GPU_1X_A10: 'GPU_1xA10',
  /** Single H100 GPU per node. */
  GPU_1X_H100: 'GPU_1xH100',
  /** Eight H100 GPUs per node. Typical for distributed training. */
  GPU_8X_H100: 'GPU_8xH100',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ComputeSpec_AcceleratorType =
  | (typeof ComputeSpec_AcceleratorType)[keyof typeof ComputeSpec_AcceleratorType]
  | (string & {});

/**
 * * `EQUAL_TO`, `NOT_EQUAL` operators perform string comparison of their operands. This means that `“12.0” == “12”` will evaluate to `false`.
 * * `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`, `LESS_THAN`, `LESS_THAN_OR_EQUAL` operators perform numeric comparison of their operands. `“12.0” >= “12”` will evaluate to `true`, `“10.0” >= “12”` will evaluate to `false`.
 *
 * The boolean comparison to task values can be implemented with operators `EQUAL_TO`, `NOT_EQUAL`. If a task value was set to a boolean value, it will be serialized to `“true”` or `“false”` for the comparison.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ConditionTask_ConditionTaskOperator = {
  EQUAL_TO: 'EQUAL_TO',
  GREATER_THAN: 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL',
  LESS_THAN: 'LESS_THAN',
  LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL',
  NOT_EQUAL: 'NOT_EQUAL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ConditionTask_ConditionTaskOperator =
  | (typeof ConditionTask_ConditionTaskOperator)[keyof typeof ConditionTask_ConditionTaskOperator]
  | (string & {});

/**
 * * `BUNDLE`: The job is managed by Databricks Asset Bundle.
 * * `SYSTEM_MANAGED`: The job is managed by <Databricks> and is read-only.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const JobDeployment_DeploymentKind = {
  BUNDLE: 'BUNDLE',
  SYSTEM_MANAGED: 'SYSTEM_MANAGED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type JobDeployment_DeploymentKind =
  | (typeof JobDeployment_DeploymentKind)[keyof typeof JobDeployment_DeploymentKind]
  | (string & {});

/**
 * Dirty state indicates the job is not fully synced with the job specification
 * in the remote repository.
 *
 * Possible values are:
 * * `NOT_SYNCED`: The job is not yet synced with the remote job specification. Import the remote job specification from UI to make the job fully synced.
 * * `DISCONNECTED`: The job is temporary disconnected from the remote job specification and is allowed for live edit. Import the remote job specification again from UI to make the job fully synced.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const JobSource_DirtyState = {
  NOT_SYNCED: 'NOT_SYNCED',
  DISCONNECTED: 'DISCONNECTED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type JobSource_DirtyState =
  | (typeof JobSource_DirtyState)[keyof typeof JobSource_DirtyState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ModelTriggerConfiguration_ModelTriggerCondition = {
  CONDITION_UNSPECIFIED: 'CONDITION_UNSPECIFIED',
  MODEL_CREATED: 'MODEL_CREATED',
  MODEL_VERSION_READY: 'MODEL_VERSION_READY',
  MODEL_ALIAS_SET: 'MODEL_ALIAS_SET',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ModelTriggerConfiguration_ModelTriggerCondition =
  | (typeof ModelTriggerConfiguration_ModelTriggerCondition)[keyof typeof ModelTriggerConfiguration_ModelTriggerCondition]
  | (string & {});

/**
 * PerformanceTarget defines how performant (lower latency) or cost efficient the execution of run on serverless compute should be.
 * The performance mode on the job or pipeline should map to a performance setting that is passed to Cluster Manager
 * (see cluster-common PerformanceTarget).
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PerformanceTarget_PerformanceTarget = {
  PERFORMANCE_TARGET_UNSPECIFIED: 'PERFORMANCE_TARGET_UNSPECIFIED',
  PERFORMANCE_OPTIMIZED: 'PERFORMANCE_OPTIMIZED',
  STANDARD: 'STANDARD',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PerformanceTarget_PerformanceTarget =
  | (typeof PerformanceTarget_PerformanceTarget)[keyof typeof PerformanceTarget_PerformanceTarget]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PeriodicTriggerConfiguration_TimeUnit = {
  TIME_UNIT_UNSPECIFIED: 'TIME_UNIT_UNSPECIFIED',
  HOURS: 'HOURS',
  DAYS: 'DAYS',
  WEEKS: 'WEEKS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PeriodicTriggerConfiguration_TimeUnit =
  | (typeof PeriodicTriggerConfiguration_TimeUnit)[keyof typeof PeriodicTriggerConfiguration_TimeUnit]
  | (string & {});

/**
 * The reason for queuing the run.
 * * `ACTIVE_RUNS_LIMIT_REACHED`: The run was queued due to reaching the workspace limit of active task runs.
 * * `MAX_CONCURRENT_RUNS_REACHED`: The run was queued due to reaching the per-job limit of concurrent job runs.
 * * `ACTIVE_RUN_JOB_TASKS_LIMIT_REACHED`: The run was queued due to reaching the workspace limit of active run job tasks.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const QueueDetailsCode_Code = {
  ACTIVE_RUNS_LIMIT_REACHED: 'ACTIVE_RUNS_LIMIT_REACHED',
  MAX_CONCURRENT_RUNS_REACHED: 'MAX_CONCURRENT_RUNS_REACHED',
  ACTIVE_RUN_JOB_TASKS_LIMIT_REACHED: 'ACTIVE_RUN_JOB_TASKS_LIMIT_REACHED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type QueueDetailsCode_Code =
  | (typeof QueueDetailsCode_Code)[keyof typeof QueueDetailsCode_Code]
  | (string & {});

/**
 * A value indicating the run's lifecycle state. The possible values are:
 * * `QUEUED`: The run is queued.
 * * `PENDING`: The run is waiting to be executed while the cluster and execution context are being prepared.
 * * `RUNNING`: The task of this run is being executed.
 * * `TERMINATING`: The task of this run has completed, and the cluster and execution context are being cleaned up.
 * * `TERMINATED`: The task of this run has completed, and the cluster and execution context have been cleaned up. This state is terminal.
 * * `SKIPPED`: This run was aborted because a previous run of the same job was already active. This state is terminal.
 * * `INTERNAL_ERROR`: An exceptional state that indicates a failure in the Jobs service, such as network failure over a long period. If a run on a new cluster ends in the `INTERNAL_ERROR` state, the Jobs service terminates the cluster as soon as possible. This state is terminal.
 * * `BLOCKED`: The run is blocked on an upstream dependency.
 * * `WAITING_FOR_RETRY`: The run is waiting for a retry.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RunLifeCycleState_RunLifeCycleState = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  TERMINATING: 'TERMINATING',
  TERMINATED: 'TERMINATED',
  SKIPPED: 'SKIPPED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BLOCKED: 'BLOCKED',
  WAITING_FOR_RETRY: 'WAITING_FOR_RETRY',
  QUEUED: 'QUEUED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type RunLifeCycleState_RunLifeCycleState =
  | (typeof RunLifeCycleState_RunLifeCycleState)[keyof typeof RunLifeCycleState_RunLifeCycleState]
  | (string & {});

/** The current state of the run. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RunLifecycleStateV2_State = {
  BLOCKED: 'BLOCKED',
  PENDING: 'PENDING',
  QUEUED: 'QUEUED',
  RUNNING: 'RUNNING',
  TERMINATING: 'TERMINATING',
  TERMINATED: 'TERMINATED',
  /**
   * Runs in the Waiting state (e.g. cost-optimized runs) are intentionally delayed until an
   * optimal compute scheduling time
   */
  WAITING: 'WAITING',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type RunLifecycleStateV2_State =
  | (typeof RunLifecycleStateV2_State)[keyof typeof RunLifecycleStateV2_State]
  | (string & {});

/**
 * A value indicating the run's result. The possible values are:
 * * `SUCCESS`: The task completed successfully.
 * * `FAILED`: The task completed with an error.
 * * `TIMEDOUT`: The run was stopped after reaching the timeout.
 * * `CANCELED`: The run was canceled at user request.
 * * `MAXIMUM_CONCURRENT_RUNS_REACHED`: The run was skipped because the maximum concurrent runs were reached.
 * * `EXCLUDED`: The run was skipped because the necessary conditions were not met.
 * * `SUCCESS_WITH_FAILURES`: The job run completed successfully with some failures; leaf tasks were successful.
 * * `UPSTREAM_FAILED`: The run was skipped because of an upstream failure.
 * * `UPSTREAM_CANCELED`: The run was skipped because an upstream task was canceled.
 * * `DISABLED`: The run was skipped because it was disabled explicitly by the user.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RunResultState_RunResultState = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  TIMEDOUT: 'TIMEDOUT',
  CANCELED: 'CANCELED',
  MAXIMUM_CONCURRENT_RUNS_REACHED: 'MAXIMUM_CONCURRENT_RUNS_REACHED',
  UPSTREAM_CANCELED: 'UPSTREAM_CANCELED',
  UPSTREAM_FAILED: 'UPSTREAM_FAILED',
  EXCLUDED: 'EXCLUDED',
  SUCCESS_WITH_FAILURES: 'SUCCESS_WITH_FAILURES',
  DISABLED: 'DISABLED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type RunResultState_RunResultState =
  | (typeof RunResultState_RunResultState)[keyof typeof RunResultState_RunResultState]
  | (string & {});

/**
 * The state of the SQL alert.
 *
 * * UNKNOWN: alert yet to be evaluated
 * * OK: alert evaluated and did not fulfill trigger conditions
 * * TRIGGERED: alert evaluated and fulfilled trigger conditions
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SqlAlertState_SqlAlertState = {
  UNKNOWN: 'UNKNOWN',
  OK: 'OK',
  TRIGGERED: 'TRIGGERED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SqlAlertState_SqlAlertState =
  | (typeof SqlAlertState_SqlAlertState)[keyof typeof SqlAlertState_SqlAlertState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SqlTask_SqlTaskQueryStatus = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SqlTask_SqlTaskQueryStatus =
  | (typeof SqlTask_SqlTaskQueryStatus)[keyof typeof SqlTask_SqlTaskQueryStatus]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TableTriggerConfiguration_Condition = {
  ANY_UPDATED: 'ANY_UPDATED',
  ALL_UPDATED: 'ALL_UPDATED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type TableTriggerConfiguration_Condition =
  | (typeof TableTriggerConfiguration_Condition)[keyof typeof TableTriggerConfiguration_Condition]
  | (string & {});

/**
 * The code indicates why the run was terminated. Additional codes might be introduced in future releases.
 * * `SUCCESS`: The run was completed successfully.
 * * `SUCCESS_WITH_FAILURES`: The run was completed successfully but some child runs failed.
 * * `USER_CANCELED`: The run was successfully canceled during execution by a user.
 * * `CANCELED`: The run was canceled during execution by the <Databricks> platform; for example, if the maximum run duration was exceeded.
 * * `SKIPPED`: Run was never executed, for example, if the upstream task run failed, the dependency type condition was not met, or there were no material tasks to execute.
 * * `INTERNAL_ERROR`: The run encountered an unexpected error. Refer to the state message for further details.
 * * `DRIVER_ERROR`: The run encountered an error while communicating with the Spark Driver.
 * * `CLUSTER_ERROR`: The run failed due to a cluster error. Refer to the state message for further details.
 * * `REPOSITORY_CHECKOUT_FAILED`: Failed to complete the checkout due to an error when communicating with the third party service.
 * * `INVALID_CLUSTER_REQUEST`: The run failed because it issued an invalid request to start the cluster.
 * * `WORKSPACE_RUN_LIMIT_EXCEEDED`: The workspace has reached the quota for the maximum number of concurrent active runs. Consider scheduling the runs over a larger time frame.
 * * `FEATURE_DISABLED`: The run failed because it tried to access a feature unavailable for the workspace.
 * * `CLUSTER_REQUEST_LIMIT_EXCEEDED`: The number of cluster creation, start, and upsize requests have exceeded the allotted rate limit. Consider spreading the run execution over a larger time frame.
 * * `STORAGE_ACCESS_ERROR`: The run failed due to an error when accessing the customer blob storage. Refer to the state message for further details.
 * * `RUN_EXECUTION_ERROR`: The run was completed with task failures. For more details, refer to the state message or run output.
 * * `UNAUTHORIZED_ERROR`: The run failed due to a permission issue while accessing a resource. Refer to the state message for further details.
 * * `LIBRARY_INSTALLATION_ERROR`: The run failed while installing the user-requested library. Refer to the state message for further details. The causes might include, but are not limited to: The provided library is invalid, there are insufficient permissions to install the library, and so forth.
 * * `MAX_CONCURRENT_RUNS_EXCEEDED`: The scheduled run exceeds the limit of maximum concurrent runs set for the job.
 * * `MAX_SPARK_CONTEXTS_EXCEEDED`: The run is scheduled on a cluster that has already reached the maximum number of contexts it is configured to create. See: [Link](https://kb.databricks.com/en_US/notebooks/too-many-execution-contexts-are-open-right-now).
 * * `RESOURCE_NOT_FOUND`: A resource necessary for run execution does not exist. Refer to the state message for further details.
 * * `INVALID_RUN_CONFIGURATION`: The run failed due to an invalid configuration. Refer to the state message for further details.
 * * `CLOUD_FAILURE`: The run failed due to a cloud provider issue. Refer to the state message for further details.
 * * `MAX_JOB_QUEUE_SIZE_EXCEEDED`: The run was skipped due to reaching the job level queue size limit.
 * * `DISABLED`: The run was never executed because it was disabled explicitly by the user.
 * * `BREAKING_CHANGE`: Run failed because of an intentional breaking change in Spark, but it will be retried with a mitigation config.
 * * `CLUSTER_TERMINATED_BY_USER`: The run failed because the externally managed cluster entered an unusable state, likely due to the user terminating or restarting it outside the jobs service.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TerminationCode_Code = {
  SUCCESS: 'SUCCESS',
  CANCELED: 'CANCELED',
  /** DriverError represents failures when the driver restarted, or became unhealthy or unreachable during the run. */
  DRIVER_ERROR: 'DRIVER_ERROR',
  /**
   * ClusterError represents failures due to cluster issues. These include the failures that occur during
   * creation of a new cluster / starting up an existing cluster, cluster issues and timeouts during the job run
   */
  CLUSTER_ERROR: 'CLUSTER_ERROR',
  /** Returned if [[ProjectCheckoutInternalRepo]] RPC fails */
  REPOSITORY_CHECKOUT_FAILED: 'REPOSITORY_CHECKOUT_FAILED',
  /**
   * *
   * InvalidClusterRequest represents failures when the user provides invalid input for a cluster
   * configuration for the run. For example, providing invalid parameter Values in the request/
   * providing a bad request etc
   */
  INVALID_CLUSTER_REQUEST: 'INVALID_CLUSTER_REQUEST',
  /**
   * *
   * Returned if an org set a limit for number of their concurrent active runs and the run couldn't start
   * because it would exceed this limit.
   * TODO: JOBS-12528: The original comment (on the issue) does not seem to reflect how this is actually used in code
   * It should be looked into how we're handling the scenario where a given job exceeds its own internal concurrency
   * limits.
   */
  WORKSPACE_RUN_LIMIT_EXCEEDED: 'WORKSPACE_RUN_LIMIT_EXCEEDED',
  FEATURE_DISABLED: 'FEATURE_DISABLED',
  /**
   * *
   * ClusterRequestLimitExceeded represents failures when cluster
   * creation, start, and upsize requests for a workspace exceeded the rate limit of
   * [[com.databricks.backend.cluster.ClusterSizeConf.upsizeRefillRatePerMinPerOrg]] nodes per min.
   */
  CLUSTER_REQUEST_LIMIT_EXCEEDED: 'CLUSTER_REQUEST_LIMIT_EXCEEDED',
  /**
   * *
   * StorageAccessError represents failures when the access to user's <Databricks> file system fails.
   * For example, misconfiguration on user's side like deleting AWS S3 bucket without cancelling the workspace,
   * their Azure account being disabled, the storage buckets not being found etc.
   */
  STORAGE_ACCESS_ERROR: 'STORAGE_ACCESS_ERROR',
  RUN_EXECUTION_ERROR: 'RUN_EXECUTION_ERROR',
  UNAUTHORIZED_ERROR: 'UNAUTHORIZED_ERROR',
  /**
   * *
   * LibraryInstallationError represents failures due to issues related library installation.
   * These include the failures that occur when the user provided invalid library or user not having
   * enough permissions to install the library or any cloud dependency/ infrastructure failures during
   * library installation etc
   */
  LIBRARY_INSTALLATION_ERROR: 'LIBRARY_INSTALLATION_ERROR',
  MAX_CONCURRENT_RUNS_EXCEEDED: 'MAX_CONCURRENT_RUNS_EXCEEDED',
  MAX_SPARK_CONTEXTS_EXCEEDED: 'MAX_SPARK_CONTEXTS_EXCEEDED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  INVALID_RUN_CONFIGURATION: 'INVALID_RUN_CONFIGURATION',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  CLOUD_FAILURE: 'CLOUD_FAILURE',
  MAX_JOB_QUEUE_SIZE_EXCEEDED: 'MAX_JOB_QUEUE_SIZE_EXCEEDED',
  SKIPPED: 'SKIPPED',
  USER_CANCELED: 'USER_CANCELED',
  BUDGET_POLICY_LIMIT_EXCEEDED: 'BUDGET_POLICY_LIMIT_EXCEEDED',
  DISABLED: 'DISABLED',
  /**
   * SuccessWithFailures represents that some child runs failed
   * but the run was ultimately successful.
   */
  SUCCESS_WITH_FAILURES: 'SUCCESS_WITH_FAILURES',
  /** Run failed because of an intentional breaking change in Spark, but it will be retried with a mitigation config. */
  BREAKING_CHANGE: 'BREAKING_CHANGE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type TerminationCode_Code =
  | (typeof TerminationCode_Code)[keyof typeof TerminationCode_Code]
  | (string & {});

/**
 * * `SUCCESS`: The run terminated without any issues
 * * `INTERNAL_ERROR`: An error occurred in the <Databricks> platform. Please look at the [status page](https://status.databricks.com/) or contact support if the issue persists.
 * * `CLIENT_ERROR`: The run was terminated because of an error caused by user input or the job configuration.
 * * `CLOUD_FAILURE`: The run was terminated because of an issue with your cloud provider.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TerminationType_Type = {
  SUCCESS: 'SUCCESS',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  CLIENT_ERROR: 'CLIENT_ERROR',
  CLOUD_FAILURE: 'CLOUD_FAILURE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type TerminationType_Type =
  | (typeof TerminationType_Type)[keyof typeof TerminationType_Type]
  | (string & {});

export interface AccessControlRequest {
  principalName?:
    | {$case: 'userName'; userName: string}
    | {$case: 'groupName'; groupName: string}
    | {$case: 'servicePrincipalName'; servicePrincipalName: string}
    | undefined;
  permissionLevel?: AccessControlRequest_JobPermission | undefined;
}

/** A storage location in Adls Gen2 */
export interface Adlsgen2Info {
  /** abfss destination, e.g. `abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/<directory-name>`. */
  destination?: string | undefined;
}

/**
 * AiRuntimeTask: multi-node GPU compute task definition for Databricks AI
 * Runtime workloads.
 *
 * Jobs-framework-level concepts (retries, per-task timeout, idempotency
 * token, usage/budget policy, permissions) live on the surrounding
 * TaskSettings / run-submit request and are intentionally NOT duplicated
 * here. Users compose `ai_runtime_task` with the standard Jobs/DABs task
 * wrapper to get those.
 */
export interface AiRuntimeTask {
  /**
   * MLflow experiment name for this run. If an experiment with this name
   * already exists under the calling user, the run is appended to it;
   * otherwise a new experiment is created. To target a specific MLflow
   * storage location (for example, when running as a service principal), set
   * `mlflow_experiment_directory`.
   */
  experiment?: string | undefined;
  /**
   * Deployment specs for this task. Exactly one deployment is currently
   * supported (a single entry where every node runs the same command); this
   * is a current-Preview constraint. Role-split workloads (driver + worker,
   * parameter server, separate eval node, etc.) with multiple entries are the
   * eventual intent but not yet supported.
   */
  deployments?: DeploymentSpec[] | undefined;
  /**
   * Optional workspace or UC volume path of the uploaded code-source
   * archive. The CLI packages the user's local code directory into an
   * archive and populates this. Customers calling the Jobs API directly
   * should upload their archive to the workspace or a UC volume first and
   * supply the resulting path here.
   *
   * When set, the training node exposes the value via the `$CODE_SOURCE`
   * environment variable.
   */
  codeSourcePath?: string | undefined;
  /**
   * Optional display name for the MLflow run created under `experiment`. If
   * omitted, MLflow generates a default name.
   */
  mlflowRun?: string | undefined;
  /**
   * Optional workspace directory under which the MLflow experiment named in
   * `experiment` is created. Must start with `/Workspace`. Set this when
   * running as a service principal that has no default user directory; for
   * regular users the experiment defaults to the user's home directory.
   */
  mlflowExperimentDirectory?: string | undefined;
}

/**
 * AiRuntimeTaskOutput: output identifiers for an AiRuntimeTask run — the
 * MLflow experiment and run IDs the task wrote to.
 *
 * Run lifecycle and termination status are not on this message; they live
 * on the surrounding `RunTask.status` field (see `runs.proto:RunTask.status`).
 */
export interface AiRuntimeTaskOutput {
  /**
   * MLflow experiment ID the run was logged to. Use it to look up the
   * experiment in MLflow APIs or the workspace MLflow UI.
   */
  mlflowExperimentId?: string | undefined;
  /**
   * MLflow run ID for this task execution. Use it to look up the run in
   * MLflow APIs or the workspace MLflow UI.
   */
  mlflowRunId?: string | undefined;
  /**
   * Human-readable status message for this run, suitable for display to the
   * user (for example, that the run is still waiting for GPU compute). Set by
   * the server only when there is something to surface; empty otherwise.
   */
  statusMessage?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AlertEvaluationState {}

export interface AlertTask {
  /** The alert_id is the canonical identifier of the alert. */
  alertId?: string | undefined;
  /** The warehouse_id identifies the warehouse settings used by the alert task. */
  warehouseId?: string | undefined;
  /**
   * The workspace_path is the path to the alert file in the workspace. The path:
   * * must start with "/Workspace"
   * * must be a normalized path.
   * User has to select only one of alert_id or workspace_path to identify the alert.
   */
  workspacePath?: string | undefined;
  /**
   * The subscribers receive alert evaluation result notifications after the alert task is completed.
   * The number of subscriptions is limited to 100.
   */
  subscribers?: AlertTaskSubscriber[] | undefined;
}

export interface AlertTaskOutput {
  alertState?: AlertEvaluationState_AlertEvaluationState | undefined;
}

/**
 * Represents a subscriber that will receive alert notifications.
 * A subscriber can be either a user (via email) or a notification destination (via destination_id).
 */
export interface AlertTaskSubscriber {
  subscriberType?:
    | {
        $case: 'userName';
        /** A valid workspace email address. */
        userName: string;
      }
    | {$case: 'destinationId'; destinationId: string}
    | undefined;
}

export interface AutoScale {
  /**
   * The minimum number of workers to which the cluster can scale down when underutilized.
   * It is also the initial number of workers the cluster will have after creation.
   */
  minWorkers?: number | undefined;
  /**
   * The maximum number of workers to which the cluster can scale up when overloaded.
   * Note that `max_workers` must be strictly greater than `min_workers`.
   */
  maxWorkers?: number | undefined;
}

/** Attributes set during cluster creation which are related to Amazon Web Services. */
export interface AwsAttributes {
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * If this value is greater than 0, the cluster driver node in particular will be placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  availability?: AwsAvailability | undefined;
  /**
   * Identifier for the availability zone/datacenter in which the cluster resides.
   * This string will be of a form like "us-west-2a". The provided availability
   * zone must be in the same region as the <Databricks> deployment. For example, "us-west-2a"
   * is not a valid zone id if the <Databricks> deployment resides in the "us-east-1" region.
   * This is an optional field at cluster creation, and if not specified, the zone "auto" will be used.
   * If the zone specified is "auto", will try to place cluster in a zone with high availability,
   * and will retry placement in a different AZ if there is not enough capacity.
   *
   * The list of available zones as well as the default value can be found by using the
   * `List Zones` method.
   */
  zoneId?: string | undefined;
  /**
   * Nodes for this cluster will only be placed on AWS instances with this instance profile. If
   * ommitted, nodes will be placed on instances without an IAM instance profile. The instance
   * profile must have previously been added to the <Databricks> environment by an account
   * administrator.
   *
   * This feature may only be available to certain customer plans.
   */
  instanceProfileArn?: string | undefined;
  /**
   * The bid price for AWS spot instances, as a percentage of the corresponding instance type's
   * on-demand price.
   * For example, if this field is set to 50, and the cluster needs a new `r3.xlarge` spot
   * instance, then the bid price is half of the price of
   * on-demand `r3.xlarge` instances. Similarly, if this field is set to 200, the bid price is twice
   * the price of on-demand `r3.xlarge` instances. If not specified, the default value is 100.
   * When spot instances are requested for this cluster, only spot instances whose bid price
   * percentage matches this field will be considered.
   * Note that, for safety, we enforce this field to be no more than 10000.
   */
  spotBidPricePercent?: number | undefined;
  /** The type of EBS volumes that will be launched with this cluster. */
  ebsVolumeType?: EbsVolumeType | undefined;
  /**
   * The number of volumes launched for each instance. Users can choose up to 10 volumes.
   * This feature is only enabled for supported node types. Legacy node types cannot specify
   * custom EBS volumes.
   * For node types with no instance store, at least one EBS volume needs to be specified;
   * otherwise, cluster creation will fail.
   *
   * These EBS volumes will be mounted at `/ebs0`, `/ebs1`, and etc.
   * Instance store volumes will be mounted at `/local_disk0`, `/local_disk1`, and etc.
   *
   * If EBS volumes are attached, <Databricks> will configure Spark to use only the EBS volumes for
   * scratch storage because heterogenously sized scratch devices can lead to inefficient disk
   * utilization. If no EBS volumes are attached, <Databricks> will configure Spark to use instance
   * store volumes.
   *
   * Please note that if EBS volumes are specified, then the Spark configuration `spark.local.dir`
   * will be overridden.
   */
  ebsVolumeCount?: number | undefined;
  /**
   * The size of each EBS volume (in GiB) launched for each instance. For general purpose
   * SSD, this value must be within the range 100 - 4096. For throughput optimized HDD,
   * this value must be within the range 500 - 4096.
   */
  ebsVolumeSize?: number | undefined;
  /** If using gp3 volumes, what IOPS to use for the disk. If this is not set, the maximum performance of a gp2 volume with the same volume size will be used. */
  ebsVolumeIops?: number | undefined;
  /** If using gp3 volumes, what throughput to use for the disk. If this is not set, the maximum performance of a gp2 volume with the same volume size will be used. */
  ebsVolumeThroughput?: number | undefined;
}

/** Attributes set during cluster creation which are related to Microsoft Azure. */
export interface AzureAttributes {
  /** Defines values necessary to configure and run Azure Log Analytics agent */
  logAnalyticsInfo?: LogAnalyticsInfo | undefined;
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * Availability type used for all subsequent nodes past the `first_on_demand` ones.
   * Note: If `first_on_demand` is zero, this availability
   * type will be used for the entire cluster.
   */
  availability?: AzureAvailability | undefined;
  /**
   * The max bid price to be used for Azure spot instances.
   * The Max price for the bid cannot be higher than the on-demand price of the instance.
   * If not specified, the default value is -1, which specifies that the instance cannot be evicted
   * on the basis of price, and only on the basis of availability. Further, the value should > 0 or -1.
   */
  spotBidMaxPrice?: number | undefined;
  /**
   * The Azure capacity reservation group resource ID to use for launching VMs.
   * When specified, VMs will be launched using the provided capacity reservation.
   *
   * Capacity reservations can only be specified when the workspace uses injected vnet (i.e. customer defined vnet not
   * managed by databricks). Ensure the databricks-login-prod Enterprise Application is granted the following four permissions:
   * 1. Microsoft.Compute/capacityReservationGroups/read
   * 2. Microsoft.Compute/capacityReservationGroups/deploy/action
   * 3. Microsoft.Compute/capacityReservationGroups/capacityReservations/read
   * 4. Microsoft.Compute/capacityReservationGroups/capacityReservations/deploy/action
   *
   * Format: `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}`
   */
  capacityReservationGroup?: string | undefined;
}

export interface BaseJob {
  /** The canonical identifier for this job. */
  jobId?: bigint | undefined;
  /** The creator user name. This field won’t be included in the response if the user has already been deleted. */
  creatorUserName?: string | undefined;
  /**
   * The email of an active workspace user or the application ID of a service principal that the job runs as. This value can be changed by setting the `run_as` field when creating or updating a job.
   *
   * By default, `run_as_user_name` is based on the current job settings and is set to the creator of the job if job access control is disabled or to the user with the `is_owner` permission if job access control is enabled.
   */
  runAsUserName?: string | undefined;
  /** Settings for this job and all of its runs. These settings can be updated using the `resetJob` method. */
  settings?: JobSettings | undefined;
  /** The time at which this job was created in epoch milliseconds (milliseconds since 1/1/1970 UTC). */
  createdTime?: bigint | undefined;
  /** State of the trigger associated with the job. */
  triggerState?: TriggerState | undefined;
  /**
   * Indicates if the job has more array properties (`tasks`, `job_clusters`) that are not shown. They can be accessed via :method:jobs/get endpoint.
   * It is only relevant for API 2.2 :method:jobs/list requests with `expand_tasks=true`.
   */
  hasMore?: boolean | undefined;
  /**
   * The id of the budget policy used by this job for cost attribution purposes.
   * This may be set through (in order of precedence):
   * 1. Budget admins through the account or workspace console
   * 2. Jobs UI in the job details page and Jobs API using `budget_policy_id`
   * 3. Inferred default based on accessible budget policies of the run_as identity on job creation or modification.
   */
  effectiveBudgetPolicyId?: string | undefined;
  /** The id of the usage policy used by this job for cost attribution purposes. */
  effectiveUsagePolicyId?: string | undefined;
}

export interface BaseRun {
  /** The canonical identifier of the job that contains this run. */
  jobId?: bigint | undefined;
  /** The canonical identifier of the run. This ID is unique across all runs of all jobs. */
  runId?: bigint | undefined;
  /** The creator user name. This field won’t be included in the response if the user has already been deleted. */
  creatorUserName?: string | undefined;
  /** A unique identifier for this job run. This is set to the same value as `run_id`. */
  numberInJob?: bigint | undefined;
  /** If this run is a retry of a prior run attempt, this field contains the run_id of the original attempt; otherwise, it is the same as the run_id. */
  originalAttemptRunId?: bigint | undefined;
  /** Deprecated. Please use the `status` field instead. */
  state?: RunState | undefined;
  /** The cron schedule that triggered this run if it was triggered by the periodic scheduler. */
  schedule?: CronSchedule | undefined;
  /** A snapshot of the job’s cluster specification when this run was created. */
  clusterSpec?: ClusterSpec | undefined;
  /** The cluster used for this run. If the run is specified to use a new cluster, this field is set once the Jobs service has requested a cluster for the run. */
  clusterInstance?: ClusterInstance | undefined;
  /** Job-level parameters used in the run */
  jobParameters?: Run_JobLevelParameters[] | undefined;
  /** The parameters used for this run. */
  overridingParameters?: RunParameters | undefined;
  trigger?: TriggerType | undefined;
  triggerInfo?: RunTriggerInfo | undefined;
  /** An optional name for the run. The maximum length is 4096 bytes in UTF-8 encoding. */
  runName?: string | undefined;
  /** The URL to the detail page of the run. */
  runPageUrl?: string | undefined;
  runType?: RunType | undefined;
  /**
   * The list of tasks performed by the run. Each task has its own `run_id` which you can use to call `JobsGetOutput` to retrieve the run results.
   * If more than 100 tasks are available, you can paginate through them using :method:jobs/getrun. Use the `next_page_token` field at the object root to determine if more results are available.
   */
  tasks?: RunTask[] | undefined;
  /** Description of the run */
  description?: string | undefined;
  /** The sequence number of this run attempt for a triggered job run. The initial attempt of a run has an attempt_number of 0. If the initial run attempt fails, and the job has a retry policy (`max_retries` > 0), subsequent runs are created with an `original_attempt_run_id` of the original attempt’s ID and an incrementing `attempt_number`. Runs are retried only until they succeed, and the maximum `attempt_number` is the same as the `max_retries` value for the job. */
  attemptNumber?: number | undefined;
  /**
   * A list of job cluster specifications that can be shared and reused by tasks of this job. Libraries cannot be declared in a shared job cluster. You must declare dependent libraries in task settings.
   * If more than 100 job clusters are available, you can paginate through them using :method:jobs/getrun.
   */
  jobClusters?: JobCluster[] | undefined;
  /**
   * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
   *
   * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
   *
   * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
   */
  gitSource?: GitSource | undefined;
  /** The repair history of the run. */
  repairHistory?: Repair[] | undefined;
  status?: RunStatus | undefined;
  /**
   * ID of the job run that this run belongs to.
   * For legacy and single-task job runs the field is populated with the job run ID.
   * For task runs, the field is populated with the ID of the job run that the task run belongs to.
   */
  jobRunId?: bigint | undefined;
  /**
   * Indicates if the run has more array properties (`tasks`, `job_clusters`) that are not shown. They can be accessed via :method:jobs/getrun endpoint.
   * It is only relevant for API 2.2 :method:jobs/listruns requests with `expand_tasks=true`.
   */
  hasMore?: boolean | undefined;
  /**
   * The actual performance target used by the serverless run during execution. This can differ from the client-set performance target on the request depending on whether the performance mode is supported by the job type.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  effectivePerformanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /** The id of the usage policy used by this run for cost attribution purposes. */
  effectiveUsagePolicyId?: string | undefined;
  /** The time at which this run was started in epoch milliseconds (milliseconds since 1/1/1970 UTC). This may not be the time when the job task starts executing, for example, if the job is scheduled to run on a new cluster, this is the time the cluster creation call is issued. */
  startTime?: bigint | undefined;
  /** The time in milliseconds it took to set up the cluster. For runs that run on new clusters this is the cluster creation time, for runs that run on existing clusters this time should be very short. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the `cleanup_duration`. The `setup_duration` field is set to 0 for multitask job runs. The total duration of a multitask job run is the value of the `run_duration` field. */
  setupDuration?: bigint | undefined;
  /** The time in milliseconds it took to execute the commands in the JAR or notebook until they  completed, failed, timed out, were cancelled, or encountered an unexpected error. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the  `cleanup_duration`. The `execution_duration` field is set to 0 for multitask job runs. The total  duration of a multitask job run is the value of the `run_duration` field. */
  executionDuration?: bigint | undefined;
  /** The time in milliseconds it took to terminate the cluster and clean up any associated artifacts. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the `cleanup_duration`. The `cleanup_duration` field is set to 0 for multitask job runs. The total duration of a multitask job run is the value of the `run_duration` field. */
  cleanupDuration?: bigint | undefined;
  /** The time at which this run ended in epoch milliseconds (milliseconds since 1/1/1970 UTC). This field is set to 0 if the job is still running. */
  endTime?: bigint | undefined;
  /** The time in milliseconds it took the job run and all of its repairs to finish. */
  runDuration?: bigint | undefined;
  /** The time in milliseconds that the run has spent in the queue. */
  queueDuration?: bigint | undefined;
}

export interface CancelAllRunsRequest {
  /** The canonical identifier of the job to cancel all runs of. */
  jobId?: bigint | undefined;
  /** Optional boolean parameter to cancel all queued runs. If no job_id is provided, all queued runs in the workspace are canceled. */
  allQueuedRuns?: boolean | undefined;
}

/** All runs were cancelled successfully. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CancelAllRunsResponse {}

export interface CancelRunRequest {
  /** This field is required. */
  runId?: bigint | undefined;
}

/** Run was cancelled successfully. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CancelRunResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CleanRoomTaskRunLifeCycleState {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CleanRoomTaskRunResultState {}

/** Stores the run state of the clean rooms notebook task. */
export interface CleanRoomTaskRunState {
  /** A value indicating the run's current lifecycle state. This field is always available in the response. Note: Additional states might be introduced in future releases. */
  lifeCycleState?:
    | CleanRoomTaskRunLifeCycleState_CleanRoomTaskRunLifeCycleState
    | undefined;
  /** A value indicating the run's result. This field is only available for terminal lifecycle states. Note: Additional states might be introduced in future releases. */
  resultState?:
    | CleanRoomTaskRunResultState_CleanRoomTaskRunResultState
    | undefined;
}

/**
 * Clean Rooms notebook task for V1 Clean Room service (GA).
 * Replaces the deprecated CleanRoomNotebookTask (defined above) which was for V0 service.
 */
export interface CleanRoomsNotebookTask {
  /** The clean room that the notebook belongs to. */
  cleanRoomName?: string | undefined;
  /** Name of the notebook being run. */
  notebookName?: string | undefined;
  /**
   * Checksum to validate the freshness of the notebook resource (i.e. the notebook being run is the latest version).
   * It can be fetched by calling the :method:cleanroomassets/get API.
   */
  etag?: string | undefined;
  /** Base parameters to be used for the clean room notebook job. */
  notebookBaseParameters?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CleanRoomsNotebookTask_CleanRoomsNotebookTaskOutput {
  /** The run state of the clean rooms notebook task. */
  cleanRoomJobRunState?: CleanRoomTaskRunState | undefined;
  /** The notebook output for the clean room run */
  notebookOutput?: NotebookTask_NotebookOutput | undefined;
  /** Information on how to access the output schema for the clean room run */
  outputSchemaInfo?: OutputSchemaInfo | undefined;
}

export interface ClusterInstance {
  /**
   * The canonical identifier for the cluster used by a run. This field is always available for runs on existing clusters. For runs on new clusters, it becomes available once the cluster is created. This value can be used to view logs by browsing to `/#setting/sparkui/$cluster_id/driver-logs`. The logs continue to be available after the run completes.
   *
   * The response won’t include this field if the identifier is not available yet.
   */
  clusterId?: string | undefined;
  /**
   * The canonical identifier for the Spark context used by a run. This field is filled in once the run begins execution. This value can be used to view the Spark UI by browsing to `/#setting/sparkui/$cluster_id/$spark_context_id`. The Spark UI continues to be available after the run has completed.
   *
   * The response won’t include this field if the identifier is not available yet.
   */
  sparkContextId?: string | undefined;
}

/** Cluster log delivery config */
export interface ClusterLogConf {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * `{ "dbfs" : { "destination" : "dbfs:/home/cluster_log" } }`
         */
        dbfs: DbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either the region or endpoint need to be provided. e.g.
         * `{ "s3": { "destination" : "s3://cluster_log_bucket/prefix", "region" : "us-west-2" } }`
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * `instance_profile_arn` has permission to write data to the s3 destination.
         */
        s3: S3StorageInfo;
      }
    | {
        $case: 'volumes';
        /**
         * destination needs to be provided, e.g.
         * `{ "volumes": { "destination": "/Volumes/catalog/schema/volume/cluster_log" } }`
         */
        volumes: VolumesStorageInfo;
      }
    | undefined;
}

export interface ClusterSpec {
  spec?:
    | {
        $case: 'existingClusterId';
        /**
         * If existing_cluster_id, the ID of an existing cluster that is used for all runs.
         * When running jobs or tasks on an existing cluster, you may need to manually restart
         * the cluster if it stops responding. We suggest running jobs and tasks on new clusters for
         * greater reliability
         */
        existingClusterId: string;
      }
    | {
        $case: 'newCluster';
        /** If new_cluster, a description of a new cluster that is created for each run. */
        newCluster: ClusterSpec_NewCluster;
      }
    | {
        $case: 'jobClusterKey';
        /** If job_cluster_key, this task is executed reusing the cluster specified in `job.settings.job_clusters`. */
        jobClusterKey: string;
      }
    | undefined;
  /**
   * An optional list of libraries to be installed on the cluster.
   * The default value is an empty list.
   */
  libraries?: Library[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterSpec_CreateNewCluster {
  applyPolicyDefaultValues?: boolean | undefined;
  /**
   * Cluster name requested by the user. This doesn't have to be unique.
   * If not specified at creation, the cluster name will be an empty string.
   * For job clusters, the cluster name is automatically set based on the job and job run IDs.
   */
  clusterName?: string | undefined;
  /**
   * The Spark version of the cluster, e.g. `3.3.x-scala2.11`.
   * A list of available Spark versions can be retrieved by using
   * the [clusters/sparkVersions](https://docs.databricks.com/api/workspace/clusters/sparkversions) API call.
   */
  sparkVersion?: string | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * Users can also pass in a string of extra JVM options to the driver and the executors via
   * `spark.driver.extraJavaOptions` and `spark.executor.extraJavaOptions` respectively.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: CreateAwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: CreateAzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: CreateGcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the [clusters/listNodeTypes](https://docs.databricks.com/api/workspace/clusters/listnodetypes) API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   *
   * This field, along with node_type_id, should not be set if virtual_cluster_size is set.
   * If both driver_node_type_id, node_type_id, and virtual_cluster_size are specified, driver_node_type_id and node_type_id take precedence.
   */
  driverNodeTypeId?: string | undefined;
  /** Flexible node type configuration for worker nodes. */
  workerNodeTypeFlexibility?: CreateNodeTypeFlexibility | undefined;
  /** Flexible node type configuration for the driver node. */
  driverNodeTypeFlexibility?: CreateNodeTypeFlexibility | undefined;
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
   * Three kinds of destinations (DBFS, S3 and Unity Catalog volumes) are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: CreateClusterLogConf | undefined;
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
  /**
   * Automatically terminates the cluster after it is inactive for this time in minutes. If not set,
   * this cluster will not be automatically terminated. If specified, the threshold must be between
   * 10 and 10000 minutes.
   * Users can also set this value to 0 to explicitly disable automatic termination.
   */
  autoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this cluster will dynamically acquire additional disk
   * space when its Spark workers are running low on disk space.
   */
  enableElasticDisk?: boolean | undefined;
  /**
   * The configuration for storing init scripts. Any number of destinations can be specified.
   * The scripts are executed sequentially in the order provided.
   * If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`.
   */
  initScripts?: CreateInitScriptInfo[] | undefined;
  /** Custom docker image BYOC */
  dockerImage?: CreateDockerImage | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** Single user name if data_security_mode is `SINGLE_USER` */
  singleUserName?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable LUKS on cluster VMs' local disks */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  workloadType?: CreateWorkloadType | undefined;
  dataSecurityMode?: DataSecurityMode | undefined;
  /**
   * Determines the cluster's runtime engine, either standard or Photon.
   *
   * This field is not compatible with legacy `spark_version` values that contain `-photon-`.
   * Remove `-photon-` from the `spark_version` and set `runtime_engine` to `PHOTON`.
   *
   * If left unspecified, the runtime engine defaults to standard unless the spark_version
   * contains -photon-, in which case Photon will be used.
   */
  runtimeEngine?: RuntimeEngine | undefined;
  kind?: ComputeKind | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * `effective_spark_version` is determined by `spark_version` (DBR release), this field `use_ml_runtime`, and whether `node_type_id` is gpu node or not.
   */
  useMlRuntime?: boolean | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * When set to true, <Databricks> will automatically set single node related `custom_tags`, `spark_conf`, and `num_workers`
   */
  isSingleNode?: boolean | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  totalInitialRemoteDiskSize?: number | undefined;
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
        autoscale: CreateAutoScale;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterSpec_NewCluster {
  applyPolicyDefaultValues?: boolean | undefined;
  /**
   * Cluster name requested by the user. This doesn't have to be unique.
   * If not specified at creation, the cluster name will be an empty string.
   * For job clusters, the cluster name is automatically set based on the job and job run IDs.
   */
  clusterName?: string | undefined;
  /**
   * The Spark version of the cluster, e.g. `3.3.x-scala2.11`.
   * A list of available Spark versions can be retrieved by using
   * the [clusters/sparkVersions](https://docs.databricks.com/api/workspace/clusters/sparkversions) API call.
   */
  sparkVersion?: string | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * Users can also pass in a string of extra JVM options to the driver and the executors via
   * `spark.driver.extraJavaOptions` and `spark.executor.extraJavaOptions` respectively.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: AwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: AzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: GcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the [clusters/listNodeTypes](https://docs.databricks.com/api/workspace/clusters/listnodetypes) API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   *
   * This field, along with node_type_id, should not be set if virtual_cluster_size is set.
   * If both driver_node_type_id, node_type_id, and virtual_cluster_size are specified, driver_node_type_id and node_type_id take precedence.
   */
  driverNodeTypeId?: string | undefined;
  /** Flexible node type configuration for worker nodes. */
  workerNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** Flexible node type configuration for the driver node. */
  driverNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
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
   * Three kinds of destinations (DBFS, S3 and Unity Catalog volumes) are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: ClusterLogConf | undefined;
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
  /**
   * Automatically terminates the cluster after it is inactive for this time in minutes. If not set,
   * this cluster will not be automatically terminated. If specified, the threshold must be between
   * 10 and 10000 minutes.
   * Users can also set this value to 0 to explicitly disable automatic termination.
   */
  autoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this cluster will dynamically acquire additional disk
   * space when its Spark workers are running low on disk space.
   */
  enableElasticDisk?: boolean | undefined;
  /**
   * The configuration for storing init scripts. Any number of destinations can be specified.
   * The scripts are executed sequentially in the order provided.
   * If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`.
   */
  initScripts?: InitScriptInfo[] | undefined;
  /** Custom docker image BYOC */
  dockerImage?: DockerImage | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** Single user name if data_security_mode is `SINGLE_USER` */
  singleUserName?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable LUKS on cluster VMs' local disks */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  workloadType?: WorkloadType | undefined;
  dataSecurityMode?: DataSecurityMode | undefined;
  /**
   * Determines the cluster's runtime engine, either standard or Photon.
   *
   * This field is not compatible with legacy `spark_version` values that contain `-photon-`.
   * Remove `-photon-` from the `spark_version` and set `runtime_engine` to `PHOTON`.
   *
   * If left unspecified, the runtime engine defaults to standard unless the spark_version
   * contains -photon-, in which case Photon will be used.
   */
  runtimeEngine?: RuntimeEngine | undefined;
  kind?: ComputeKind | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * `effective_spark_version` is determined by `spark_version` (DBR release), this field `use_ml_runtime`, and whether `node_type_id` is gpu node or not.
   */
  useMlRuntime?: boolean | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * When set to true, <Databricks> will automatically set single node related `custom_tags`, `spark_conf`, and `num_workers`
   */
  isSingleNode?: boolean | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  totalInitialRemoteDiskSize?: number | undefined;
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
        autoscale: AutoScale;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterSpec_UpdateNewCluster {
  applyPolicyDefaultValues?: boolean | undefined;
  /**
   * Cluster name requested by the user. This doesn't have to be unique.
   * If not specified at creation, the cluster name will be an empty string.
   * For job clusters, the cluster name is automatically set based on the job and job run IDs.
   */
  clusterName?: string | undefined;
  /**
   * The Spark version of the cluster, e.g. `3.3.x-scala2.11`.
   * A list of available Spark versions can be retrieved by using
   * the [clusters/sparkVersions](https://docs.databricks.com/api/workspace/clusters/sparkversions) API call.
   */
  sparkVersion?: string | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * Users can also pass in a string of extra JVM options to the driver and the executors via
   * `spark.driver.extraJavaOptions` and `spark.executor.extraJavaOptions` respectively.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: UpdateAwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: UpdateAzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: UpdateGcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the [clusters/listNodeTypes](https://docs.databricks.com/api/workspace/clusters/listnodetypes) API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   *
   * This field, along with node_type_id, should not be set if virtual_cluster_size is set.
   * If both driver_node_type_id, node_type_id, and virtual_cluster_size are specified, driver_node_type_id and node_type_id take precedence.
   */
  driverNodeTypeId?: string | undefined;
  /** Flexible node type configuration for worker nodes. */
  workerNodeTypeFlexibility?: UpdateNodeTypeFlexibility | undefined;
  /** Flexible node type configuration for the driver node. */
  driverNodeTypeFlexibility?: UpdateNodeTypeFlexibility | undefined;
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
   * Three kinds of destinations (DBFS, S3 and Unity Catalog volumes) are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: UpdateClusterLogConf | undefined;
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
  /**
   * Automatically terminates the cluster after it is inactive for this time in minutes. If not set,
   * this cluster will not be automatically terminated. If specified, the threshold must be between
   * 10 and 10000 minutes.
   * Users can also set this value to 0 to explicitly disable automatic termination.
   */
  autoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this cluster will dynamically acquire additional disk
   * space when its Spark workers are running low on disk space.
   */
  enableElasticDisk?: boolean | undefined;
  /**
   * The configuration for storing init scripts. Any number of destinations can be specified.
   * The scripts are executed sequentially in the order provided.
   * If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`.
   */
  initScripts?: UpdateInitScriptInfo[] | undefined;
  /** Custom docker image BYOC */
  dockerImage?: UpdateDockerImage | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** Single user name if data_security_mode is `SINGLE_USER` */
  singleUserName?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable LUKS on cluster VMs' local disks */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  workloadType?: UpdateWorkloadType | undefined;
  dataSecurityMode?: DataSecurityMode | undefined;
  /**
   * Determines the cluster's runtime engine, either standard or Photon.
   *
   * This field is not compatible with legacy `spark_version` values that contain `-photon-`.
   * Remove `-photon-` from the `spark_version` and set `runtime_engine` to `PHOTON`.
   *
   * If left unspecified, the runtime engine defaults to standard unless the spark_version
   * contains -photon-, in which case Photon will be used.
   */
  runtimeEngine?: RuntimeEngine | undefined;
  kind?: ComputeKind | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * `effective_spark_version` is determined by `spark_version` (DBR release), this field `use_ml_runtime`, and whether `node_type_id` is gpu node or not.
   */
  useMlRuntime?: boolean | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * When set to true, <Databricks> will automatically set single node related `custom_tags`, `spark_conf`, and `num_workers`
   */
  isSingleNode?: boolean | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  totalInitialRemoteDiskSize?: number | undefined;
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
        autoscale: UpdateAutoScale;
      }
    | undefined;
}

export interface Compute {
  /** Hardware accelerator configuration for Serverless GPU workloads. */
  hardwareAccelerator?: HardwareAcceleratorType | undefined;
}

export interface ComputeConfig {
  /** Number of GPUs. */
  numGpus?: number | undefined;
  /** IDof the GPU pool to use. */
  gpuNodePoolId?: string | undefined;
  /** GPU type. */
  gpuType?: string | undefined;
}

/**
 * ComputeSpec: compute configuration — accelerator type and total
 * accelerator count across all nodes.
 */
export interface ComputeSpec {
  /**
   * Hardware accelerator type (for example, `GPU_1xA10` or `GPU_8xH100`).
   * The number of accelerators per node is encoded in the enum value —
   * `GPU_8xH100` means 8 H100 GPUs per node.
   */
  acceleratorType?: ComputeSpec_AcceleratorType | undefined;
  /**
   * Total number of accelerators across all nodes. Must be a positive
   * multiple of the per-node accelerator count encoded in `accelerator_type`.
   * For example, `GPU_8xH100` with `accelerator_count: 16` allocates 2 nodes
   * (8 GPUs per node).
   */
  acceleratorCount?: number | undefined;
}

export interface ConditionTask {
  /**
   * * `EQUAL_TO`, `NOT_EQUAL` operators perform string comparison of their operands. This means that `“12.0” == “12”` will evaluate to `false`.
   * * `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`, `LESS_THAN`, `LESS_THAN_OR_EQUAL` operators perform numeric comparison of their operands. `“12.0” >= “12”` will evaluate to `true`, `“10.0” >= “12”` will evaluate to `false`.
   *
   * The boolean comparison to task values can be implemented with operators `EQUAL_TO`, `NOT_EQUAL`. If a task value was set to a boolean value, it will be serialized to `“true”` or `“false”` for the comparison.
   */
  op?: ConditionTask_ConditionTaskOperator | undefined;
  /** The left operand of the condition task. Can be either a string value or a job state or parameter reference. */
  left?: string | undefined;
  /** The right operand of the condition task. Can be either a string value or a job state or parameter reference. */
  right?: string | undefined;
  /** The condition expression evaluation result. Filled in if the task was successfully completed. Can be `"true"` or `"false"` */
  outcome?: string | undefined;
}

export interface ContinuousSettings {
  /** Indicate whether the continuous execution of the job is paused or not. Defaults to UNPAUSED. */
  pauseStatus?: SchedulePauseStatus | undefined;
  /** Indicate whether the continuous job is applying task level retries or not. Defaults to NEVER. */
  taskRetryMode?: TaskRetryMode | undefined;
}

/** A storage location in Adls Gen2 */
export interface CreateAdlsgen2Info {
  /** abfss destination, e.g. `abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/<directory-name>`. */
  destination: string;
}

/**
 * AiRuntimeTask: multi-node GPU compute task definition for Databricks AI
 * Runtime workloads.
 *
 * Jobs-framework-level concepts (retries, per-task timeout, idempotency
 * token, usage/budget policy, permissions) live on the surrounding
 * TaskSettings / run-submit request and are intentionally NOT duplicated
 * here. Users compose `ai_runtime_task` with the standard Jobs/DABs task
 * wrapper to get those.
 */
export interface CreateAiRuntimeTask {
  /**
   * MLflow experiment name for this run. If an experiment with this name
   * already exists under the calling user, the run is appended to it;
   * otherwise a new experiment is created. To target a specific MLflow
   * storage location (for example, when running as a service principal), set
   * `mlflow_experiment_directory`.
   */
  experiment: string;
  /**
   * Deployment specs for this task. Exactly one deployment is currently
   * supported (a single entry where every node runs the same command); this
   * is a current-Preview constraint. Role-split workloads (driver + worker,
   * parameter server, separate eval node, etc.) with multiple entries are the
   * eventual intent but not yet supported.
   */
  deployments: CreateDeploymentSpec[];
  /**
   * Optional workspace or UC volume path of the uploaded code-source
   * archive. The CLI packages the user's local code directory into an
   * archive and populates this. Customers calling the Jobs API directly
   * should upload their archive to the workspace or a UC volume first and
   * supply the resulting path here.
   *
   * When set, the training node exposes the value via the `$CODE_SOURCE`
   * environment variable.
   */
  codeSourcePath?: string | undefined;
  /**
   * Optional display name for the MLflow run created under `experiment`. If
   * omitted, MLflow generates a default name.
   */
  mlflowRun?: string | undefined;
  /**
   * Optional workspace directory under which the MLflow experiment named in
   * `experiment` is created. Must start with `/Workspace`. Set this when
   * running as a service principal that has no default user directory; for
   * regular users the experiment defaults to the user's home directory.
   */
  mlflowExperimentDirectory?: string | undefined;
}

export interface CreateAlertTask {
  /** The alert_id is the canonical identifier of the alert. */
  alertId?: string | undefined;
  /** The warehouse_id identifies the warehouse settings used by the alert task. */
  warehouseId?: string | undefined;
  /**
   * The workspace_path is the path to the alert file in the workspace. The path:
   * * must start with "/Workspace"
   * * must be a normalized path.
   * User has to select only one of alert_id or workspace_path to identify the alert.
   */
  workspacePath?: string | undefined;
  /**
   * The subscribers receive alert evaluation result notifications after the alert task is completed.
   * The number of subscriptions is limited to 100.
   */
  subscribers?: CreateAlertTaskSubscriber[] | undefined;
}

/**
 * Represents a subscriber that will receive alert notifications.
 * A subscriber can be either a user (via email) or a notification destination (via destination_id).
 */
export interface CreateAlertTaskSubscriber {
  subscriberType?:
    | {
        $case: 'userName';
        /** A valid workspace email address. */
        userName: string;
      }
    | {$case: 'destinationId'; destinationId: string}
    | undefined;
}

export interface CreateAutoScale {
  /**
   * The minimum number of workers to which the cluster can scale down when underutilized.
   * It is also the initial number of workers the cluster will have after creation.
   */
  minWorkers?: number | undefined;
  /**
   * The maximum number of workers to which the cluster can scale up when overloaded.
   * Note that `max_workers` must be strictly greater than `min_workers`.
   */
  maxWorkers?: number | undefined;
}

/** Attributes set during cluster creation which are related to Amazon Web Services. */
export interface CreateAwsAttributes {
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * If this value is greater than 0, the cluster driver node in particular will be placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  availability?: AwsAvailability | undefined;
  /**
   * Identifier for the availability zone/datacenter in which the cluster resides.
   * This string will be of a form like "us-west-2a". The provided availability
   * zone must be in the same region as the <Databricks> deployment. For example, "us-west-2a"
   * is not a valid zone id if the <Databricks> deployment resides in the "us-east-1" region.
   * This is an optional field at cluster creation, and if not specified, the zone "auto" will be used.
   * If the zone specified is "auto", will try to place cluster in a zone with high availability,
   * and will retry placement in a different AZ if there is not enough capacity.
   *
   * The list of available zones as well as the default value can be found by using the
   * `List Zones` method.
   */
  zoneId?: string | undefined;
  /**
   * Nodes for this cluster will only be placed on AWS instances with this instance profile. If
   * ommitted, nodes will be placed on instances without an IAM instance profile. The instance
   * profile must have previously been added to the <Databricks> environment by an account
   * administrator.
   *
   * This feature may only be available to certain customer plans.
   */
  instanceProfileArn?: string | undefined;
  /**
   * The bid price for AWS spot instances, as a percentage of the corresponding instance type's
   * on-demand price.
   * For example, if this field is set to 50, and the cluster needs a new `r3.xlarge` spot
   * instance, then the bid price is half of the price of
   * on-demand `r3.xlarge` instances. Similarly, if this field is set to 200, the bid price is twice
   * the price of on-demand `r3.xlarge` instances. If not specified, the default value is 100.
   * When spot instances are requested for this cluster, only spot instances whose bid price
   * percentage matches this field will be considered.
   * Note that, for safety, we enforce this field to be no more than 10000.
   */
  spotBidPricePercent?: number | undefined;
  /** The type of EBS volumes that will be launched with this cluster. */
  ebsVolumeType?: EbsVolumeType | undefined;
  /**
   * The number of volumes launched for each instance. Users can choose up to 10 volumes.
   * This feature is only enabled for supported node types. Legacy node types cannot specify
   * custom EBS volumes.
   * For node types with no instance store, at least one EBS volume needs to be specified;
   * otherwise, cluster creation will fail.
   *
   * These EBS volumes will be mounted at `/ebs0`, `/ebs1`, and etc.
   * Instance store volumes will be mounted at `/local_disk0`, `/local_disk1`, and etc.
   *
   * If EBS volumes are attached, <Databricks> will configure Spark to use only the EBS volumes for
   * scratch storage because heterogenously sized scratch devices can lead to inefficient disk
   * utilization. If no EBS volumes are attached, <Databricks> will configure Spark to use instance
   * store volumes.
   *
   * Please note that if EBS volumes are specified, then the Spark configuration `spark.local.dir`
   * will be overridden.
   */
  ebsVolumeCount?: number | undefined;
  /**
   * The size of each EBS volume (in GiB) launched for each instance. For general purpose
   * SSD, this value must be within the range 100 - 4096. For throughput optimized HDD,
   * this value must be within the range 500 - 4096.
   */
  ebsVolumeSize?: number | undefined;
  /** If using gp3 volumes, what IOPS to use for the disk. If this is not set, the maximum performance of a gp2 volume with the same volume size will be used. */
  ebsVolumeIops?: number | undefined;
  /** If using gp3 volumes, what throughput to use for the disk. If this is not set, the maximum performance of a gp2 volume with the same volume size will be used. */
  ebsVolumeThroughput?: number | undefined;
}

/** Attributes set during cluster creation which are related to Microsoft Azure. */
export interface CreateAzureAttributes {
  /** Defines values necessary to configure and run Azure Log Analytics agent */
  logAnalyticsInfo?: CreateLogAnalyticsInfo | undefined;
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * Availability type used for all subsequent nodes past the `first_on_demand` ones.
   * Note: If `first_on_demand` is zero, this availability
   * type will be used for the entire cluster.
   */
  availability?: AzureAvailability | undefined;
  /**
   * The max bid price to be used for Azure spot instances.
   * The Max price for the bid cannot be higher than the on-demand price of the instance.
   * If not specified, the default value is -1, which specifies that the instance cannot be evicted
   * on the basis of price, and only on the basis of availability. Further, the value should > 0 or -1.
   */
  spotBidMaxPrice?: number | undefined;
  /**
   * The Azure capacity reservation group resource ID to use for launching VMs.
   * When specified, VMs will be launched using the provided capacity reservation.
   *
   * Capacity reservations can only be specified when the workspace uses injected vnet (i.e. customer defined vnet not
   * managed by databricks). Ensure the databricks-login-prod Enterprise Application is granted the following four permissions:
   * 1. Microsoft.Compute/capacityReservationGroups/read
   * 2. Microsoft.Compute/capacityReservationGroups/deploy/action
   * 3. Microsoft.Compute/capacityReservationGroups/capacityReservations/read
   * 4. Microsoft.Compute/capacityReservationGroups/capacityReservations/deploy/action
   *
   * Format: `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}`
   */
  capacityReservationGroup?: string | undefined;
}

/**
 * Clean Rooms notebook task for V1 Clean Room service (GA).
 * Replaces the deprecated CleanRoomNotebookTask (defined above) which was for V0 service.
 */
export interface CreateCleanRoomsNotebookTask {
  /** The clean room that the notebook belongs to. */
  cleanRoomName: string;
  /** Name of the notebook being run. */
  notebookName: string;
  /**
   * Checksum to validate the freshness of the notebook resource (i.e. the notebook being run is the latest version).
   * It can be fetched by calling the :method:cleanroomassets/get API.
   */
  etag?: string | undefined;
  /** Base parameters to be used for the clean room notebook job. */
  notebookBaseParameters?: Record<string, string> | undefined;
}

/** Cluster log delivery config */
export interface CreateClusterLogConf {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * `{ "dbfs" : { "destination" : "dbfs:/home/cluster_log" } }`
         */
        dbfs: CreateDbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either the region or endpoint need to be provided. e.g.
         * `{ "s3": { "destination" : "s3://cluster_log_bucket/prefix", "region" : "us-west-2" } }`
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * `instance_profile_arn` has permission to write data to the s3 destination.
         */
        s3: CreateS3StorageInfo;
      }
    | {
        $case: 'volumes';
        /**
         * destination needs to be provided, e.g.
         * `{ "volumes": { "destination": "/Volumes/catalog/schema/volume/cluster_log" } }`
         */
        volumes: CreateVolumesStorageInfo;
      }
    | undefined;
}

export interface CreateCompute {
  /** Hardware accelerator configuration for Serverless GPU workloads. */
  hardwareAccelerator?: HardwareAcceleratorType | undefined;
}

export interface CreateComputeConfig {
  /** Number of GPUs. */
  numGpus: number;
  /** IDof the GPU pool to use. */
  gpuNodePoolId?: string | undefined;
  /** GPU type. */
  gpuType?: string | undefined;
}

/**
 * ComputeSpec: compute configuration — accelerator type and total
 * accelerator count across all nodes.
 */
export interface CreateComputeSpec {
  /**
   * Hardware accelerator type (for example, `GPU_1xA10` or `GPU_8xH100`).
   * The number of accelerators per node is encoded in the enum value —
   * `GPU_8xH100` means 8 H100 GPUs per node.
   */
  acceleratorType: ComputeSpec_AcceleratorType;
  /**
   * Total number of accelerators across all nodes. Must be a positive
   * multiple of the per-node accelerator count encoded in `accelerator_type`.
   * For example, `GPU_8xH100` with `accelerator_count: 16` allocates 2 nodes
   * (8 GPUs per node).
   */
  acceleratorCount: number;
}

export interface CreateConditionTask {
  /**
   * * `EQUAL_TO`, `NOT_EQUAL` operators perform string comparison of their operands. This means that `“12.0” == “12”` will evaluate to `false`.
   * * `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`, `LESS_THAN`, `LESS_THAN_OR_EQUAL` operators perform numeric comparison of their operands. `“12.0” >= “12”` will evaluate to `true`, `“10.0” >= “12”` will evaluate to `false`.
   *
   * The boolean comparison to task values can be implemented with operators `EQUAL_TO`, `NOT_EQUAL`. If a task value was set to a boolean value, it will be serialized to `“true”` or `“false”` for the comparison.
   */
  op: ConditionTask_ConditionTaskOperator;
  /** The left operand of the condition task. Can be either a string value or a job state or parameter reference. */
  left: string;
  /** The right operand of the condition task. Can be either a string value or a job state or parameter reference. */
  right: string;
  /** The condition expression evaluation result. Filled in if the task was successfully completed. Can be `"true"` or `"false"` */
  outcome?: string | undefined;
}

export interface CreateContinuousSettings {
  /** Indicate whether the continuous execution of the job is paused or not. Defaults to UNPAUSED. */
  pauseStatus?: SchedulePauseStatus | undefined;
  /** Indicate whether the continuous job is applying task level retries or not. Defaults to NEVER. */
  taskRetryMode?: TaskRetryMode | undefined;
}

export interface CreateCronSchedule {
  /** A Cron expression using Quartz syntax that describes the schedule for a job. See [Cron Trigger](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html) for details. This field is required. */
  quartzCronExpression: string;
  /** A Java timezone ID. The schedule for a job is resolved with respect to this timezone. See [Java TimeZone](https://docs.oracle.com/javase/7/docs/api/java/util/TimeZone.html) for details. This field is required. */
  timezoneId: string;
  /** Indicate whether this schedule is paused or not. */
  pauseStatus?: SchedulePauseStatus | undefined;
}

/** Configures the Lakeview Dashboard job task type. */
export interface CreateDashboardTask {
  /** Optional: subscription configuration for sending the dashboard snapshot. */
  subscription?: CreateSubscription | undefined;
  /**
   * Optional: The warehouse id to execute the dashboard with for the schedule.
   * If not specified, the default warehouse of the dashboard will be used.
   */
  warehouseId?: string | undefined;
  /** The identifier of the dashboard to refresh. */
  dashboardId?: string | undefined;
  /**
   * Dashboard task parameters. Used to apply dashboard filter values during dashboard task execution. Parameter values get applied to any dashboard filters that have a matching URL identifier as the parameter key.
   * The parameter value format is dependent on the filter type:
   * - For text and single-select filters, provide a single value (e.g. `"value"`)
   * - For date and datetime filters, provide the value in ISO 8601 format (e.g. `"2000-01-01T00:00:00"`)
   * - For multi-select filters, provide a JSON array of values (e.g. `"[\"value1\",\"value2\"]"`)
   * - For range and date range filters, provide a JSON object with `start` and `end` (e.g. `"{\"start\":\"1\",\"end\":\"10\"}"`)
   */
  filters?: Record<string, string> | undefined;
}

/** A storage location in DBFS */
export interface CreateDbfsStorageInfo {
  /** dbfs destination, e.g. `dbfs:/my/path` */
  destination: string;
}

/** Deprecated in favor of DbtPlatformTask */
export interface CreateDbtCloudTask {
  /** Id of the dbt Cloud job to be triggered */
  dbtCloudJobId?: bigint | undefined;
  /** The resource name of the UC connection that authenticates the dbt Cloud for this task */
  connectionResourceName?: string | undefined;
}

export interface CreateDbtPlatformTask {
  /** Id of the dbt platform job to be triggered. Specified as a string for maximum compatibility with clients. */
  dbtPlatformJobId?: string | undefined;
  /** The resource name of the UC connection that authenticates the dbt platform for this task */
  connectionResourceName?: string | undefined;
}

export interface CreateDbtTask {
  /**
   * Path to the project directory. Optional for Git sourced tasks, in which
   * case if no value is provided, the root of the Git repository is used.
   */
  projectDirectory?: string | undefined;
  /** A list of dbt commands to execute. All commands must start with `dbt`. This parameter must not be empty. A maximum of up to 10 commands can be provided. */
  commands: string[];
  /** Optional schema to write to. This parameter is only used when a warehouse_id is also provided. If not provided, the `default` schema is used. */
  schema?: string | undefined;
  /** ID of the SQL warehouse to connect to. If provided, we automatically generate and provide the profile and connection details to dbt. It can be overridden on a per-command basis by using the `--profiles-dir` command line argument. */
  warehouseId?: string | undefined;
  /** Optional (relative) path to the profiles directory. Can only be specified if no warehouse_id is specified. If no warehouse_id is specified and this folder is unset, the root directory is used. */
  profilesDirectory?: string | undefined;
  /** Optional name of the catalog to use. The value is the top level in the 3-level namespace of Unity Catalog (catalog / schema / relation). The catalog value can only be specified if a warehouse_id is specified. Requires dbt-databricks >= 1.1.1. */
  catalog?: string | undefined;
  /**
   * Optional location type of the project directory. When set to `WORKSPACE`, the project will be retrieved
   * from the local <Databricks> workspace. When set to `GIT`, the project will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   *
   * * `WORKSPACE`: Project is located in <Databricks> workspace.
   * * `GIT`: Project is located in cloud Git provider.
   */
  source?: Source | undefined;
}

/**
 * DeploymentSpec: configuration for one deployment within an AiRuntimeTask.
 * Each entry in `AiRuntimeTask.deployments` describes a group of nodes that
 * share the same command and compute. Many single-program training
 * algorithms use a single entry where every node runs the same command;
 * role-split workloads (driver + worker, parameter server, separate eval
 * node, etc.) use multiple entries.
 */
export interface CreateDeploymentSpec {
  /**
   * Workspace path of the bash script to execute on each node in this
   * deployment. The CLI uploads the user's script and populates this.
   * Customers calling the Jobs API directly should upload their script to
   * the workspace first and supply the resulting path here.
   */
  commandPath: string;
  /** Compute resources allocated to each node in this deployment. */
  compute: CreateComputeSpec;
  /**
   * Optional human-readable name for this deployment (for example, `driver`,
   * `worker`, `param_server`). Used for log and UI display. Distinct names
   * are recommended so deployments can be told apart, but uniqueness is not
   * enforced.
   */
  name?: string | undefined;
}

export interface CreateDockerBasicAuth {
  /** Name of the user */
  username?: string | undefined;
  /** Password of the user */
  password?: string | undefined;
}

export interface CreateDockerImage {
  /** URL of the docker image. */
  url?: string | undefined;
  credsOneof?:
    | {
        $case: 'basicAuth';
        /** Basic auth with username and password */
        basicAuth: CreateDockerBasicAuth;
      }
    | undefined;
}

/**
 * The environment entity used to preserve serverless environment side panel, jobs' environment for non-notebook task, and SDP's environment for classic and serverless pipelines.
 * In this minimal environment spec, only pip and java dependencies are supported.
 */
export interface CreateEnvironment {
  /** Use `environment_version` instead. */
  client?: string | undefined;
  /**
   * List of pip dependencies, as supported by the version of pip in this environment.
   * Each dependency is a valid pip requirements file line per https://pip.pypa.io/en/stable/reference/requirements-file-format/.
   * Allowed dependencies include a requirement specifier, an archive URL, a local project path (such as WSFS or UC Volumes in <Databricks>), or a VCS project URL.
   */
  dependencies?: string[] | undefined;
  /**
   * The base environment this environment is built on top of. A base environment defines the environment version and a
   * list of dependencies for serverless compute. The value can be a file path to a custom `env.yaml` file
   * (e.g., `/Workspace/path/to/env.yaml`). Support for a <Databricks>-provided base environment ID
   * (e.g., `workspace-base-environments/databricks_ai_v4`) and workspace base environment ID
   * (e.g., `workspace-base-environments/dbe_b849b66e-b31a-4cb5-b161-1f2b10877fb7`) is in Beta.
   * Either `environment_version` or `base_environment` can be provided.
   * For more information about <Databricks>-provided base environments, see the
   * [list workspace base environments](:method:Environments/ListWorkspaceBaseEnvironments) API.
   * For more information, see
   */
  baseEnvironment?: string | undefined;
  /**
   * Either `environment_version` or `base_environment` needs to be provided. Environment version used by the environment.
   * Each version comes with a specific Python version and a set of Python packages.
   * The version is a string, consisting of an integer.
   */
  environmentVersion?: string | undefined;
  /** List of java dependencies. Each dependency is a string representing a java library path. For example: `/Volumes/path/to/test.jar`. */
  javaDependencies?: string[] | undefined;
}

export interface CreateFileArrivalTriggerConfiguration {
  /** URL to be monitored for file arrivals. The path must point to the root or a subpath of the external location. */
  url: string;
  /**
   * If set, the trigger starts a run only after the specified amount of time passed since
   * the last time the trigger fired. The minimum allowed value is 60 seconds
   */
  minTimeBetweenTriggersSeconds?: number | undefined;
  /**
   * If set, the trigger starts a run only after no file activity has occurred for the specified amount of time.
   * This makes it possible to wait for a batch of incoming files to arrive before triggering a run. The
   * minimum allowed value is 60 seconds.
   */
  waitAfterLastChangeSeconds?: number | undefined;
}

export interface CreateForEachTask {
  /**
   * Array for task to iterate on. This can be a JSON string or a reference to
   * an array parameter.
   */
  inputs: string;
  /**
   * An optional maximum allowed number of concurrent runs of the task.
   * Set this value if you want to be able to execute multiple runs of the task concurrently.
   */
  concurrency?: number | undefined;
  /** Configuration for the task that will be run for each element in the array */
  task: CreateTaskSettings;
}

/** Attributes set during cluster creation which are related to GCP. */
export interface CreateGcpAttributes {
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs (when set to true) versus standard compute engine VMs (when set to false; default).
   * Note: Soon to be deprecated, use the 'availability' field instead.
   */
  usePreemptibleExecutors?: boolean | undefined;
  /**
   * If provided, the cluster will impersonate the google service account when accessing
   * gcloud services (like GCS). The google service account
   * must have previously been added to the <Databricks> environment by an account
   * administrator.
   */
  googleServiceAccount?: string | undefined;
  /** Boot disk size in GB */
  bootDiskSize?: number | undefined;
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if the former is unavailable.
   */
  availability?: GcpAvailability | undefined;
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
   * If provided, each node (workers and driver) in the cluster will have this number of local SSDs attached.
   * Each local SSD is 375GB in size.
   * Refer to [GCP documentation](https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds)
   * for the supported number of local SSDs for each instance type.
   */
  localSsdCount?: number | undefined;
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * The confidential computing technology for this cluster's instances.
   * Currently only SEV_SNP is supported, and only on N2D instance types.
   * When not set, no confidential computing is applied.
   */
  confidentialComputeType?: ConfidentialComputeType | undefined;
}

/** A storage location in Google Cloud Platform's GCS */
export interface CreateGcsStorageInfo {
  /** GCS destination/URI, e.g. `gs://my-bucket/some-prefix` */
  destination: string;
}

/**
 * DEPRECATED — use `AiRuntimeTask` for all new BYOT multi-node GPU
 * workloads (see ai_runtime_task.proto). `AiRuntimeTask` is the only
 * supported BYOT task type for new workloads; this proto is retained only
 * for AIR CLI (fka SGCLI) pywheel backwards compatibility and will be
 * removed once the pywheel → databricks-cli migration completes (post-
 * PuPr).
 */
export interface CreateGenAiComputeTask {
  /** Runtime image */
  dlRuntimeImage: string;
  compute?: CreateComputeConfig | undefined;
  /** Command launcher to run the actual script, e.g. bash, python etc. */
  command?: string | undefined;
  /**
   * Optional location type of the training script. When set to `WORKSPACE`, the script will be retrieved from the local <Databricks> workspace. When set to `GIT`, the script will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   * * `WORKSPACE`: Script is located in <Databricks> workspace.
   * * `GIT`: Script is located in cloud Git provider.
   */
  source?: Source | undefined;
  /** The training script file path to be executed. Cloud file URIs (such as dbfs:/, s3:/, adls:/, gcs:/) and workspace paths are supported. For python files stored in the <Databricks> workspace, the path must be absolute and begin with `/`. For files stored in a remote repository, the path must be relative. This field is required. */
  trainingScriptPath?: string | undefined;
  /** Optional path to a YAML file containing model parameters passed to the training script. */
  yamlParametersFilePath?: string | undefined;
  /**
   * Optional string containing model parameters passed to the training script in yaml format.
   * If present, then the content in yaml_parameters_file_path will be ignored.
   */
  yamlParameters?: string | undefined;
  /**
   * Optional string containing the name of the MLflow experiment to log the run to. If name is not
   * found, backend will create the mlflow experiment using the name.
   */
  mlflowExperimentName?: string | undefined;
}

/** Read-only state of the remote repository at the time the job was run. This field is only included on job runs. */
export interface CreateGitMetadataSnapshot {
  /** Commit that was used to execute the run. If git_branch was specified, this points to the HEAD of the branch at the time of the run; if git_tag was specified, this points to the commit the tag points to. */
  usedCommit?: string | undefined;
}

/**
 * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
 *
 * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
 *
 * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
 */
export interface CreateGitSource {
  /** URL of the repository to be cloned by this job. */
  gitUrl: string;
  /** Unique identifier of the service used to host the Git repository. The value is case insensitive. */
  gitProvider: string;
  gitReference?:
    | {
        $case: 'gitBranch';
        /** Name of the branch to be checked out and used by this job. This field cannot be specified in conjunction with git_tag or git_commit. */
        gitBranch: string;
      }
    | {
        $case: 'gitTag';
        /** Name of the tag to be checked out and used by this job. This field cannot be specified in conjunction with git_branch or git_commit. */
        gitTag: string;
      }
    | {
        $case: 'gitCommit';
        /** Commit to be checked out and used by this job. This field cannot be specified in conjunction with git_branch or git_tag. */
        gitCommit: string;
      }
    | undefined;
  gitSnapshot?: CreateGitMetadataSnapshot | undefined;
  /** The source of the job specification in the remote repository when the job is source controlled. */
  jobSource?: CreateJobSource | undefined;
  sparseCheckout?: CreateSparseCheckout | undefined;
}

/** Config for an individual init script */
export interface CreateInitScriptInfo {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * `{ "dbfs": { "destination" : "dbfs:/home/cluster_log" } }`
         */
        dbfs: CreateDbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either the region or endpoint need to be provided. e.g.
         * `{ \"s3\": { \"destination\": \"s3://cluster_log_bucket/prefix\", \"region\": \"us-west-2\" } }`
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * `instance_profile_arn` has permission to write data to the s3 destination.
         */
        s3: CreateS3StorageInfo;
      }
    | {
        $case: 'file';
        /**
         * destination needs to be provided, e.g.
         * `{ "file": { "destination": "file:/my/local/file.sh" } }`
         */
        file: CreateLocalFileInfo;
      }
    | {
        $case: 'gcs';
        /**
         * destination needs to be provided, e.g.
         * `{ "gcs": { "destination": "gs://my-bucket/file.sh" } }`
         */
        gcs: CreateGcsStorageInfo;
      }
    | {
        $case: 'abfss';
        /**
         * destination needs to be provided, e.g.
         * `abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/<directory-name>`
         */
        abfss: CreateAdlsgen2Info;
      }
    | {
        $case: 'workspace';
        /**
         * destination needs to be provided, e.g.
         * `{ "workspace": { "destination": "/cluster-init-scripts/setup-datadog.sh" } }`
         */
        workspace: CreateWorkspaceStorageInfo;
      }
    | {
        $case: 'volumes';
        /**
         * destination needs to be provided. e.g.
         * `{ \"volumes\" : { \"destination\" : \"/Volumes/my-init.sh\" } }`
         */
        volumes: CreateVolumesStorageInfo;
      }
    | undefined;
}

export interface CreateJobCluster {
  /**
   * A unique name for the job cluster. This field is required and must be unique within the job.
   * `JobTaskSettings` may refer to this field to determine which cluster to launch for the task execution.
   */
  jobClusterKey: string;
  /** If new_cluster, a description of a cluster that is created for each task. */
  newCluster: ClusterSpec_CreateNewCluster;
}

export interface CreateJobDeployment {
  /**
   * The kind of deployment that manages the job.
   *
   * * `BUNDLE`: The job is managed by Databricks Asset Bundle.
   * * `SYSTEM_MANAGED`: The job is managed by <Databricks> and is read-only.
   */
  kind: JobDeployment_DeploymentKind;
  /** Path of the file that contains deployment metadata. */
  metadataFilePath?: string | undefined;
  /**
   * ID of the deployment that manages this job. Only set when `kind` is
   * `BUNDLE`. Used to look up deployment metadata from the Deployment
   * Metadata service.
   */
  deploymentId?: string | undefined;
  /**
   * ID of the version of the deployment that produced this job. Only set
   * when `kind` is `BUNDLE`. Identifies a specific snapshot of the deployment
   * in the Deployment Metadata service.
   */
  versionId?: string | undefined;
}

export interface CreateJobEmailNotifications {
  /** A list of email addresses to be notified when a run begins. If not specified on job creation, reset, or update, the list is empty, and notifications are not sent. */
  onStart?: string[] | undefined;
  /** A list of email addresses to be notified when a run successfully completes. A run is considered to have completed successfully if it ends with a `TERMINATED` `life_cycle_state` and a `SUCCESS` result_state. If not specified on job creation, reset, or update, the list is empty, and notifications are not sent. */
  onSuccess?: string[] | undefined;
  /** A list of email addresses to be notified when a run unsuccessfully completes. A run is considered to have completed unsuccessfully if it ends with an `INTERNAL_ERROR` `life_cycle_state` or a `FAILED`, or `TIMED_OUT` result_state. If this is not specified on job creation, reset, or update the list is empty, and notifications are not sent. */
  onFailure?: string[] | undefined;
  /** A list of email addresses to be notified when the duration of a run exceeds the threshold specified for the `RUN_DURATION_SECONDS` metric in the `health` field. If no rule for the `RUN_DURATION_SECONDS` metric is specified in the `health` field for the job, notifications are not sent. */
  onDurationWarningThresholdExceeded?: string[] | undefined;
  /**
   * A list of email addresses to notify when any streaming backlog thresholds are exceeded for any stream.
   * Streaming backlog thresholds can be set in the `health` field using the following metrics: `STREAMING_BACKLOG_BYTES`, `STREAMING_BACKLOG_RECORDS`, `STREAMING_BACKLOG_SECONDS`, or `STREAMING_BACKLOG_FILES`.
   * Alerting is based on the 10-minute average of these metrics. If the issue persists, notifications are resent every 30 minutes.
   */
  onStreamingBacklogExceeded?: string[] | undefined;
  /**
   * If true, do not send email to recipients specified in `on_failure` if the run is skipped.
   * This field is `deprecated`. Please use the `notification_settings.no_alert_for_skipped_runs` field.
   */
  noAlertForSkippedRuns?: boolean | undefined;
}

export interface CreateJobEnvironment {
  /** The key of an environment. It has to be unique within a job. */
  environmentKey: string;
  spec?: CreateEnvironment | undefined;
}

export interface CreateJobLevelParameter {
  /** The name of the defined parameter. May only contain alphanumeric characters, `_`, `-`, and `.` */
  name: string;
  /** Default value of the parameter. */
  default: string;
}

export interface CreateJobRequest {
  /** List of permissions to set on the job. */
  accessControlList?: AccessControlRequest[] | undefined;
  /** An optional name for the job. The maximum length is 4096 bytes in UTF-8 encoding. */
  name?: string | undefined;
  /** An optional description for the job. The maximum length is 27700 characters in UTF-8 encoding. */
  description?: string | undefined;
  /** An optional set of email addresses that is notified when runs of this job begin or complete as well as when this job is deleted. */
  emailNotifications?: CreateJobEmailNotifications | undefined;
  /** A collection of system notification IDs to notify when runs of this job begin or complete. */
  webhookNotifications?: CreateWebhookNotifications | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this job. */
  notificationSettings?: CreateNotificationSettings | undefined;
  /** An optional timeout applied to each run of this job. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  health?: CreateJobsHealthRules | undefined;
  /** An optional periodic schedule for this job. The default behavior is that the job only runs when triggered by clicking “Run Now” in the Jobs UI or sending an API request to `runNow`. */
  schedule?: CreateCronSchedule | undefined;
  /** A configuration to trigger a run when certain conditions are met. The default behavior is that the job runs only when triggered by clicking “Run Now” in the Jobs UI or sending an API request to `runNow`. */
  trigger?: CreateTriggerSettings | undefined;
  /** An optional continuous property for this job. The continuous property will ensure that there is always one run executing. Only one of `schedule` and `continuous` can be used. */
  continuous?: CreateContinuousSettings | undefined;
  /**
   * An optional maximum allowed number of concurrent runs of the job.
   * Set this value if you want to be able to execute multiple runs of the same job concurrently.
   * This is useful for example if you trigger your job on a frequent schedule and want to allow consecutive runs to overlap with each other, or if you want to trigger multiple runs which differ by their input parameters.
   * This setting affects only new runs. For example, suppose the job’s concurrency is 4 and there are 4 concurrent active runs. Then setting the concurrency to 3 won’t kill any of the active runs.
   * However, from then on, new runs are skipped unless there are fewer than 3 active runs.
   * This value cannot exceed 1000. Setting this value to `0` causes all new runs to be skipped.
   */
  maxConcurrentRuns?: number | undefined;
  /**
   * A list of task specifications to be executed by this job.
   * It supports up to 1000 elements in write endpoints (:method:jobs/create, :method:jobs/reset, :method:jobs/update, :method:jobs/submit).
   * Read endpoints return only 100 tasks. If more than 100 tasks are available, you can paginate through them using :method:jobs/get. Use the `next_page_token` field at the object root to determine if more results are available.
   */
  tasks?: CreateTaskSettings[] | undefined;
  /** A list of job cluster specifications that can be shared and reused by tasks of this job. Libraries cannot be declared in a shared job cluster. You must declare dependent libraries in task settings. */
  jobClusters?: CreateJobCluster[] | undefined;
  /**
   * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
   *
   * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
   *
   * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
   */
  gitSource?: CreateGitSource | undefined;
  /** A map of tags associated with the job. These are forwarded to the cluster as cluster tags for jobs clusters, and are subject to the same limitations as cluster tags. A maximum of 25 tags can be added to the job. */
  tags?: Record<string, string> | undefined;
  /** Used to tell what is the format of the job. This field is ignored in Create/Update/Reset calls. When using the Jobs API 2.1 this value is always set to `"MULTI_TASK"`. */
  format?: Format | undefined;
  /** The queue settings of the job. */
  queue?: CreateQueueSettings | undefined;
  /** Job-level parameter definitions */
  parameters?: CreateJobLevelParameter[] | undefined;
  /**
   * The user or service principal that the job runs as, if specified in the request.
   * This field indicates the explicit configuration of `run_as` for the job.
   * To find the value in all cases, explicit or implicit, use `run_as_user_name`.
   */
  runAs?: CreateJobRunAs | undefined;
  /**
   * Edit mode of the job.
   *
   * * `UI_LOCKED`: The job is in a locked UI state and cannot be modified.
   * * `EDITABLE`: The job is in an editable state and can be modified.
   */
  editMode?: JobEditMode | undefined;
  /** Deployment information for jobs managed by external sources. */
  deployment?: CreateJobDeployment | undefined;
  /**
   * A list of task execution environment specifications that can be referenced by serverless tasks of this job.
   * For serverless notebook tasks, if the environment_key is not specified, the notebook environment will be used if present. If a jobs environment is specified, it will override the notebook environment.
   * For other serverless tasks, the task environment is required to be specified using environment_key in the task settings.
   */
  environments?: CreateJobEnvironment[] | undefined;
  /**
   * The id of the user specified budget policy to use for this job.
   * If not specified, a default budget policy may be applied when creating or modifying the job.
   * See `effective_budget_policy_id` for the budget policy used by this workload.
   */
  budgetPolicyId?: string | undefined;
  /**
   * The id of the user specified usage policy to use for this job.
   * If not specified, a default usage policy may be applied when creating or modifying the job.
   * See `effective_usage_policy_id` for the usage policy used by this workload.
   */
  usagePolicyId?: string | undefined;
  /**
   * The performance mode on a serverless job. This field determines the level of compute performance or cost-efficiency for the run.
   * The performance target does not apply to tasks that run on Serverless GPU compute.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  performanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /** An optional maximum number of times to retry an unsuccessful run. A run is considered to be unsuccessful if it completes with the `FAILED` result_state or `INTERNAL_ERROR` `life_cycle_state`. The value `-1` means to retry indefinitely and the value `0` means to never retry. */
  maxRetries?: number | undefined;
  /** An optional minimal interval in milliseconds between the start of the failed run and the subsequent retry run. The default behavior is that unsuccessful runs are immediately retried. */
  minRetryIntervalMillis?: number | undefined;
  /**
   * An optional policy to specify whether to retry a job when it times out. The default behavior
   * is to not retry on timeout.
   */
  retryOnTimeout?: boolean | undefined;
  /** An option to disable auto optimization in serverless */
  disableAutoOptimization?: boolean | undefined;
}

/** Job was created successfully */
export interface CreateJobResponse {
  /** The canonical identifier for the newly created job. */
  jobId?: bigint | undefined;
}

/**
 * Write-only setting. Specifies the user or service principal that the job runs as. If not specified, the job runs as the user who created the job.
 *
 * Either `user_name` or `service_principal_name` should be specified. If not, an error is thrown.
 */
export interface CreateJobRunAs {
  identity?:
    | {
        $case: 'userName';
        /** The email of an active workspace user. Non-admin users can only set this field to their own email. */
        userName: string;
      }
    | {
        $case: 'servicePrincipalName';
        /** Application ID of an active service principal. Setting this field requires the `servicePrincipal/user` role. */
        servicePrincipalName: string;
      }
    | {
        $case: 'groupName';
        /** Group name of an account group assigned to the workspace. Setting this field requires being a member of the group. */
        groupName: string;
      }
    | undefined;
}

export interface CreateJobSettings {
  /** An optional name for the job. The maximum length is 4096 bytes in UTF-8 encoding. */
  name?: string | undefined;
  /** An optional description for the job. The maximum length is 27700 characters in UTF-8 encoding. */
  description?: string | undefined;
  /** An optional set of email addresses that is notified when runs of this job begin or complete as well as when this job is deleted. */
  emailNotifications?: CreateJobEmailNotifications | undefined;
  /** A collection of system notification IDs to notify when runs of this job begin or complete. */
  webhookNotifications?: CreateWebhookNotifications | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this job. */
  notificationSettings?: CreateNotificationSettings | undefined;
  /** An optional timeout applied to each run of this job. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  health?: CreateJobsHealthRules | undefined;
  /** An optional periodic schedule for this job. The default behavior is that the job only runs when triggered by clicking “Run Now” in the Jobs UI or sending an API request to `runNow`. */
  schedule?: CreateCronSchedule | undefined;
  /** A configuration to trigger a run when certain conditions are met. The default behavior is that the job runs only when triggered by clicking “Run Now” in the Jobs UI or sending an API request to `runNow`. */
  trigger?: CreateTriggerSettings | undefined;
  /** An optional continuous property for this job. The continuous property will ensure that there is always one run executing. Only one of `schedule` and `continuous` can be used. */
  continuous?: CreateContinuousSettings | undefined;
  /**
   * An optional maximum allowed number of concurrent runs of the job.
   * Set this value if you want to be able to execute multiple runs of the same job concurrently.
   * This is useful for example if you trigger your job on a frequent schedule and want to allow consecutive runs to overlap with each other, or if you want to trigger multiple runs which differ by their input parameters.
   * This setting affects only new runs. For example, suppose the job’s concurrency is 4 and there are 4 concurrent active runs. Then setting the concurrency to 3 won’t kill any of the active runs.
   * However, from then on, new runs are skipped unless there are fewer than 3 active runs.
   * This value cannot exceed 1000. Setting this value to `0` causes all new runs to be skipped.
   */
  maxConcurrentRuns?: number | undefined;
  /**
   * A list of task specifications to be executed by this job.
   * It supports up to 1000 elements in write endpoints (:method:jobs/create, :method:jobs/reset, :method:jobs/update, :method:jobs/submit).
   * Read endpoints return only 100 tasks. If more than 100 tasks are available, you can paginate through them using :method:jobs/get. Use the `next_page_token` field at the object root to determine if more results are available.
   */
  tasks?: CreateTaskSettings[] | undefined;
  /** A list of job cluster specifications that can be shared and reused by tasks of this job. Libraries cannot be declared in a shared job cluster. You must declare dependent libraries in task settings. */
  jobClusters?: CreateJobCluster[] | undefined;
  /**
   * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
   *
   * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
   *
   * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
   */
  gitSource?: CreateGitSource | undefined;
  /** A map of tags associated with the job. These are forwarded to the cluster as cluster tags for jobs clusters, and are subject to the same limitations as cluster tags. A maximum of 25 tags can be added to the job. */
  tags?: Record<string, string> | undefined;
  /** Used to tell what is the format of the job. This field is ignored in Create/Update/Reset calls. When using the Jobs API 2.1 this value is always set to `"MULTI_TASK"`. */
  format?: Format | undefined;
  /** The queue settings of the job. */
  queue?: CreateQueueSettings | undefined;
  /** Job-level parameter definitions */
  parameters?: CreateJobLevelParameter[] | undefined;
  /**
   * The user or service principal that the job runs as, if specified in the request.
   * This field indicates the explicit configuration of `run_as` for the job.
   * To find the value in all cases, explicit or implicit, use `run_as_user_name`.
   */
  runAs?: CreateJobRunAs | undefined;
  /**
   * Edit mode of the job.
   *
   * * `UI_LOCKED`: The job is in a locked UI state and cannot be modified.
   * * `EDITABLE`: The job is in an editable state and can be modified.
   */
  editMode?: JobEditMode | undefined;
  /** Deployment information for jobs managed by external sources. */
  deployment?: CreateJobDeployment | undefined;
  /**
   * A list of task execution environment specifications that can be referenced by serverless tasks of this job.
   * For serverless notebook tasks, if the environment_key is not specified, the notebook environment will be used if present. If a jobs environment is specified, it will override the notebook environment.
   * For other serverless tasks, the task environment is required to be specified using environment_key in the task settings.
   */
  environments?: CreateJobEnvironment[] | undefined;
  /**
   * The id of the user specified budget policy to use for this job.
   * If not specified, a default budget policy may be applied when creating or modifying the job.
   * See `effective_budget_policy_id` for the budget policy used by this workload.
   */
  budgetPolicyId?: string | undefined;
  /**
   * The id of the user specified usage policy to use for this job.
   * If not specified, a default usage policy may be applied when creating or modifying the job.
   * See `effective_usage_policy_id` for the usage policy used by this workload.
   */
  usagePolicyId?: string | undefined;
  /**
   * The performance mode on a serverless job. This field determines the level of compute performance or cost-efficiency for the run.
   * The performance target does not apply to tasks that run on Serverless GPU compute.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  performanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /** An optional maximum number of times to retry an unsuccessful run. A run is considered to be unsuccessful if it completes with the `FAILED` result_state or `INTERNAL_ERROR` `life_cycle_state`. The value `-1` means to retry indefinitely and the value `0` means to never retry. */
  maxRetries?: number | undefined;
  /** An optional minimal interval in milliseconds between the start of the failed run and the subsequent retry run. The default behavior is that unsuccessful runs are immediately retried. */
  minRetryIntervalMillis?: number | undefined;
  /**
   * An optional policy to specify whether to retry a job when it times out. The default behavior
   * is to not retry on timeout.
   */
  retryOnTimeout?: boolean | undefined;
  /** An option to disable auto optimization in serverless */
  disableAutoOptimization?: boolean | undefined;
}

/** The source of the job specification in the remote repository when the job is source controlled. */
export interface CreateJobSource {
  /** Path of the job YAML file that contains the job specification. */
  jobConfigPath: string;
  importFromGitReference?:
    | {
        $case: 'importFromGitBranch';
        /** Name of the branch which the job is imported from. */
        importFromGitBranch: string;
      }
    | undefined;
  /**
   * Dirty state indicates the job is not fully synced with the job specification in the remote repository.
   *
   * Possible values are:
   * * `NOT_SYNCED`: The job is not yet synced with the remote job specification. Import the remote job specification from UI to make the job fully synced.
   * * `DISCONNECTED`: The job is temporary disconnected from the remote job specification and is allowed for live edit. Import the remote job specification again from UI to make the job fully synced.
   */
  dirtyState?: JobSource_DirtyState | undefined;
}

export interface CreateJobsHealthRule {
  metric: JobsHealthMetric;
  op: JobsHealthOperator;
  /** Specifies the threshold value that the health metric should obey to satisfy the health rule. */
  value: bigint;
}

/** An optional set of health rules that can be defined for this job. */
export interface CreateJobsHealthRules {
  rules?: CreateJobsHealthRule[] | undefined;
}

export interface CreateLibrary {
  lib?:
    | {
        $case: 'jar';
        /**
         * URI of the JAR library to install. Supported URIs include Workspace paths, Unity Catalog Volumes paths, and S3 URIs.
         * For example: `{ "jar": "/Workspace/path/to/library.jar" }`, `{ "jar" : "/Volumes/path/to/library.jar" }` or
         * `{ "jar": "s3://my-bucket/library.jar" }`.
         * If S3 is used, please make sure the cluster has read access on the library. You may need to
         * launch the cluster with an IAM role to access the S3 URI.
         */
        jar: string;
      }
    | {
        $case: 'egg';
        /** Deprecated. URI of the egg library to install. Installing Python egg files is deprecated and is not supported in Databricks Runtime 14.0 and above. */
        egg: string;
      }
    | {
        $case: 'pypi';
        /**
         * Specification of a PyPi library to be installed. For example:
         * `{ "package": "simplejson" }`
         */
        pypi: CreatePythonPyPiLibrary;
      }
    | {
        $case: 'maven';
        /**
         * Specification of a maven library to be installed. For example:
         * `{ "coordinates": "org.jsoup:jsoup:1.7.2" }`
         */
        maven: CreateMavenLibrary;
      }
    | {
        $case: 'cran';
        /** Specification of a CRAN library to be installed as part of the library */
        cran: CreateRCranLibrary;
      }
    | {
        $case: 'whl';
        /**
         * URI of the wheel library to install. Supported URIs include Workspace paths, Unity Catalog Volumes paths, and S3 URIs.
         * For example: `{ "whl": "/Workspace/path/to/library.whl" }`, `{ "whl" : "/Volumes/path/to/library.whl" }` or
         * `{ "whl": "s3://my-bucket/library.whl" }`.
         * If S3 is used, please make sure the cluster has read access on the library. You may need to
         * launch the cluster with an IAM role to access the S3 URI.
         */
        whl: string;
      }
    | {
        $case: 'requirements';
        /**
         * URI of the requirements.txt file to install. Only Workspace paths and Unity Catalog Volumes paths are supported.
         * For example: `{ "requirements": "/Workspace/path/to/requirements.txt" }` or `{ "requirements" : "/Volumes/path/to/requirements.txt" }`
         */
        requirements: string;
      }
    | undefined;
}

export interface CreateLocalFileInfo {
  /** local file destination, e.g. `file:/my/local/file.sh` */
  destination: string;
}

export interface CreateLogAnalyticsInfo {
  logAnalyticsWorkspaceId?: string | undefined;
  logAnalyticsPrimaryKey?: string | undefined;
}

export interface CreateMavenLibrary {
  /** Gradle-style maven coordinates. For example: "org.jsoup:jsoup:1.7.2". */
  coordinates: string;
  /**
   * Maven repo to install the Maven package from. If omitted, both Maven Central Repository
   * and Spark Packages are searched.
   */
  repo?: string | undefined;
  /**
   * List of dependences to exclude. For example: `["slf4j:slf4j", "*:hadoop-client"]`.
   *
   * Maven dependency exclusions:
   * https://maven.apache.org/guides/introduction/introduction-to-optional-and-excludes-dependencies.html.
   */
  exclusions?: string[] | undefined;
}

export interface CreateModelTriggerConfiguration {
  /**
   * Name of the securable to monitor ("mycatalog.myschema.mymodel" in the case of model-level triggers,
   * "mycatalog.myschema" in the case of schema-level triggers) or empty in the case of metastore-level triggers.
   */
  securableName?: string | undefined;
  /** Aliases of the model versions to monitor. Can only be used in conjunction with condition MODEL_ALIAS_SET. */
  aliases?: string[] | undefined;
  /** The condition based on which to trigger a job run. */
  condition: ModelTriggerConfiguration_ModelTriggerCondition;
  /**
   * If set, the trigger starts a run only after the specified amount of time has passed since
   * the last time the trigger fired. The minimum allowed value is 60 seconds.
   */
  minTimeBetweenTriggersSeconds?: number | undefined;
  /**
   * If set, the trigger starts a run only after no model updates have occurred for the specified time
   * and can be used to wait for a series of model updates before triggering a run. The
   * minimum allowed value is 60 seconds.
   */
  waitAfterLastChangeSeconds?: number | undefined;
}

/** Configuration for flexible node types, allowing fallback to alternate node types during cluster launch and upscale. */
export interface CreateNodeTypeFlexibility {
  /** A list of node type IDs to use as fallbacks when the primary node type is unavailable. */
  alternateNodeTypeIds?: string[] | undefined;
}

export interface CreateNotebookTask {
  /**
   * The path of the notebook to be run in the <Databricks> workspace or remote repository.
   * For notebooks stored in the <Databricks> workspace, the path must be absolute and begin with a slash.
   * For notebooks stored in a remote repository, the path must be relative. This field is required.
   */
  notebookPath: string;
  /**
   * Base parameters to be used for each run of this job. If the run is initiated by a call to :method:jobs/run
   * Now with parameters specified, the two parameters maps are merged. If the same key is specified in
   * `base_parameters` and in `run-now`, the value from `run-now` is used.
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   *
   * If the notebook takes a parameter that is not specified in the job’s `base_parameters` or the `run-now` override parameters,
   * the default value from the notebook is used.
   *
   * Retrieve these parameters in a notebook using [dbutils.widgets.get](/dev-tools/databricks-utils.html#dbutils-widgets).
   *
   * The JSON representation of this field cannot exceed 1MB.
   */
  baseParameters?: Record<string, string> | undefined;
  /**
   * Optional location type of the notebook. When set to `WORKSPACE`, the notebook will be retrieved from the local <Databricks> workspace. When set to `GIT`, the notebook will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   * * `WORKSPACE`: Notebook is located in <Databricks> workspace.
   * * `GIT`: Notebook is located in cloud Git provider.
   */
  source?: Source | undefined;
  /**
   * Optional `warehouse_id` to run the notebook on a SQL warehouse. Classic SQL warehouses are NOT supported, please use serverless or pro SQL warehouses.
   *
   * Note that SQL warehouses only support SQL cells; if the notebook contains non-SQL cells, the run will fail.
   */
  warehouseId?: string | undefined;
}

export interface CreateNotificationSettings {
  /** If true, do not send notifications to recipients specified in `on_failure` if the run is skipped. */
  noAlertForSkippedRuns?: boolean | undefined;
  /** If true, do not send notifications to recipients specified in `on_failure` if the run is canceled. */
  noAlertForCanceledRuns?: boolean | undefined;
  /** If true, do not send notifications to recipients specified in `on_start` for the retried runs and do not send notifications to recipients specified in `on_failure` until the last retry of the run. */
  alertOnLastAttempt?: boolean | undefined;
}

export interface CreatePeriodicTriggerConfiguration {
  /** The interval at which the trigger should run. */
  interval: number;
  /** The unit of time for the interval. */
  unit: PeriodicTriggerConfiguration_TimeUnit;
}

export interface CreatePipelineParameters {
  /** If true, triggers a full refresh on the spark declarative pipeline. */
  fullRefresh?: boolean | undefined;
  /** A list of tables to update without fullRefresh. */
  refreshSelection?: string[] | undefined;
  /** A list of tables to update with fullRefresh. */
  fullRefreshSelection?: string[] | undefined;
  /** A list of streaming flows to reset checkpoints without clearing data. */
  resetCheckpointSelection?: string[] | undefined;
  /**
   * Flow names to selectively refresh. These are unioned with other selective refresh
   * options (refresh_selection, full_refresh_selection) to determine the final set of flows to refresh.
   */
  refreshFlowSelection?: string[] | undefined;
}

export interface CreatePipelineTask {
  /** The full name of the pipeline task to execute. */
  pipelineId: string;
  /**
   * Key/value-map of parameters passed to the pipeline execution.
   * Limited to 10k characters in total.
   */
  pipelineTaskParameters?: Record<string, string> | undefined;
  /** If true, triggers a full refresh on the spark declarative pipeline. */
  fullRefresh?: boolean | undefined;
  /** A list of tables to update without fullRefresh. */
  refreshSelection?: string[] | undefined;
  /** A list of tables to update with fullRefresh. */
  fullRefreshSelection?: string[] | undefined;
  /** A list of streaming flows to reset checkpoints without clearing data. */
  resetCheckpointSelection?: string[] | undefined;
  /**
   * Flow names to selectively refresh. These are unioned with other selective refresh
   * options (refresh_selection, full_refresh_selection) to determine the final set of flows to refresh.
   */
  refreshFlowSelection?: string[] | undefined;
}

export interface CreatePowerBiModel {
  /** The name of the Power BI workspace of the model */
  workspaceName?: string | undefined;
  /** The name of the Power BI model */
  modelName?: string | undefined;
  /** The default storage mode of the Power BI model */
  storageMode?: StorageMode | undefined;
  /** How the published Power BI model authenticates to <Databricks> */
  authenticationMethod?: AuthenticationMethod | undefined;
  /** Whether to overwrite existing Power BI models */
  overwriteExisting?: boolean | undefined;
}

export interface CreatePowerBiTable {
  /** The table name in <Databricks> */
  name?: string | undefined;
  /** The catalog name in <Databricks> */
  catalog?: string | undefined;
  /** The schema name in <Databricks> */
  schema?: string | undefined;
  /** The Power BI storage mode of the table */
  storageMode?: StorageMode | undefined;
}

export interface CreatePowerBiTask {
  /** The tables to be exported to Power BI */
  tables?: CreatePowerBiTable[] | undefined;
  /** The SQL warehouse ID to use as the Power BI data source */
  warehouseId?: string | undefined;
  /** The semantic model to update */
  powerBiModel?: CreatePowerBiModel | undefined;
  /** The resource name of the UC connection to authenticate from <Databricks> to Power BI */
  connectionResourceName?: string | undefined;
  /** Whether the model should be refreshed after the update */
  refreshAfterUpdate?: boolean | undefined;
}

export interface CreatePythonOperatorTask {
  /**
   * An ordered list of task parameters.
   * TODO(JOBS-30885): Add limits for parameters.
   */
  parameters?: PythonOperatorTask_CreateParameter[] | undefined;
  /**
   * Fully qualified name of the main class or function.
   * For example, `my_project.my_function` or `my_project.MyOperator`.
   */
  main?: string | undefined;
}

export interface CreatePythonPyPiLibrary {
  /**
   * The name of the pypi package to install. An optional exact version specification is also
   * supported. Examples: "simplejson" and "simplejson==3.8.0".
   */
  package: string;
  /**
   * The repository where the package can be found. If not specified, the default pip index is
   * used.
   */
  repo?: string | undefined;
}

export interface CreatePythonWheelTask {
  /** Name of the package to execute */
  packageName: string;
  /** Named entry point to use, if it does not exist in the metadata of the package it executes the function from the package directly using `$packageName.$entryPoint()` */
  entryPoint: string;
  /** Command-line parameters passed to Python wheel task. Leave it empty if `named_parameters` is not null. */
  parameters?: string[] | undefined;
  /** Command-line parameters passed to Python wheel task in the form of `["--name=task", "--data=dbfs:/path/to/data.json"]`. Leave it empty if `parameters` is not null. */
  namedParameters?: Record<string, string> | undefined;
}

export interface CreateQueueSettings {
  /** If true, enable queueing for the job. This is a required field. */
  enabled: boolean;
}

export interface CreateRCranLibrary {
  /** The name of the CRAN package to install. */
  package: string;
  /** The repository where the package can be found. If not specified, the default CRAN repo is used. */
  repo?: string | undefined;
}

export interface CreateRunJobTask {
  /** ID of the job to trigger. */
  jobId: bigint;
  /** Job-level parameters used to trigger the job. */
  jobParameters?: Record<string, string> | undefined;
  /** Controls whether the pipeline should perform a full refresh */
  pipelineParams?: CreatePipelineParameters | undefined;
  /**
   * A list of parameters for jobs with Spark JAR tasks, for example `"jar_params": ["john doe", "35"]`.
   * The parameters are used to invoke the main function of the main class specified in the Spark JAR task.
   * If not specified upon `run-now`, it defaults to an empty list.
   * jar_params cannot be specified in conjunction with notebook_params.
   * The JSON representation of this field (for example `{"jar_params":["john doe","35"]}`) cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  jarParams?: string[] | undefined;
  /**
   * A map from keys to values for jobs with notebook task, for example `"notebook_params": {"name": "john doe", "age": "35"}`.
   * The map is passed to the notebook and is accessible through the [dbutils.widgets.get](/dev-tools/databricks-utils.html) function.
   *
   * If not specified upon `run-now`, the triggered run uses the job’s base parameters.
   *
   * notebook_params cannot be specified in conjunction with jar_params.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * The JSON representation of this field (for example `{"notebook_params":{"name":"john doe","age":"35"}}`) cannot exceed 10,000 bytes.
   */
  notebookParams?: Record<string, string> | undefined;
  /**
   * A list of parameters for jobs with Python tasks, for example `"python_params": ["john doe", "35"]`.
   * The parameters are passed to Python file as command-line parameters. If specified upon `run-now`, it would overwrite
   * the parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  pythonParams?: string[] | undefined;
  /**
   * A list of parameters for jobs with spark submit task, for example `"spark_submit_params": ["--class", "org.apache.spark.examples.SparkPi"]`.
   * The parameters are passed to spark-submit script as command-line parameters. If specified upon `run-now`, it would overwrite the
   * parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  sparkSubmitParams?: string[] | undefined;
  pythonNamedParams?: Record<string, string> | undefined;
  /**
   * A map from keys to values for jobs with SQL task, for example `"sql_params": {"name": "john doe", "age": "35"}`. The SQL alert task does not support custom parameters.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  sqlParams?: Record<string, string> | undefined;
  /**
   * An array of commands to execute for jobs with the dbt task, for example `"dbt_commands": ["dbt deps", "dbt seed", "dbt deps", "dbt seed", "dbt run"]`
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  dbtCommands?: string[] | undefined;
}

/** A storage location in Amazon S3 */
export interface CreateS3StorageInfo {
  /**
   * S3 destination, e.g. `s3://my-bucket/some-prefix` Note that logs will be delivered using
   * cluster iam role, please make sure you set cluster iam role and the role has write access to the
   * destination. Please also note that you cannot use AWS keys to deliver logs.
   */
  destination: string;
  /**
   * S3 region, e.g. `us-west-2`. Either region or endpoint needs to be set. If both are set,
   * endpoint will be used.
   */
  region?: string | undefined;
  /**
   * S3 endpoint, e.g. `https://s3-us-west-2.amazonaws.com`. Either region or endpoint needs to be set.
   * If both are set, endpoint will be used.
   */
  endpoint?: string | undefined;
  /** (Optional) Flag to enable server side encryption, `false` by default. */
  enableEncryption?: boolean | undefined;
  /**
   * (Optional) The encryption type, it could be `sse-s3` or `sse-kms`. It will be used only when
   * encryption is enabled and the default type is `sse-s3`.
   */
  encryptionType?: string | undefined;
  /** (Optional) Kms key which will be used if encryption is enabled and encryption type is set to `sse-kms`. */
  kmsKey?: string | undefined;
  /**
   * (Optional) Set canned access control list for the logs, e.g. `bucket-owner-full-control`.
   * If `canned_cal` is set, please make sure the cluster iam role has `s3:PutObjectAcl` permission on
   * the destination bucket and prefix. The full list of possible canned acl can be found at
   * http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl.
   * Please also note that by default only the object owner gets full controls. If you are using cross account
   * role for writing data, you may want to set `bucket-owner-full-control` to make bucket owner able to
   * read the logs.
   */
  cannedAcl?: string | undefined;
}

export interface CreateSparkJarTask {
  /**
   * Deprecated since 04/2016. For classic compute, provide a `jar` through the `libraries` field instead. For serverless compute, provide a `jar` though the `java_dependencies` field inside the `environments` list.
   *
   * See the examples of classic and serverless compute usage at the top of the page.
   */
  jarUri?: string | undefined;
  /**
   * The full name of the class containing the main method to be executed. This class must be contained in a JAR provided as a library.
   *
   * The code must use `SparkContext.getOrCreate` to obtain a Spark context; otherwise, runs of the job fail.
   */
  mainClassName?: string | undefined;
  /**
   * Parameters passed to the main method.
   *
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   */
  parameters?: string[] | undefined;
  /** Deprecated. A value of `false` is no longer supported. */
  runAsRepl?: boolean | undefined;
}

export interface CreateSparkPythonTask {
  /** The Python file to be executed. Cloud file URIs (such as dbfs:/, s3:/, adls:/, gcs:/) and workspace paths are supported. For python files stored in the <Databricks> workspace, the path must be absolute and begin with `/`. For files stored in a remote repository, the path must be relative. This field is required. */
  pythonFile: string;
  /**
   * Command line parameters passed to the Python file.
   *
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   */
  parameters?: string[] | undefined;
  /**
   * Optional location type of the Python file. When set to `WORKSPACE` or not specified, the file will be retrieved from the local
   * <Databricks> workspace or cloud location (if the `python_file` has a URI format). When set to `GIT`,
   * the Python file will be retrieved from a Git repository defined in `git_source`.
   *
   * * `WORKSPACE`: The Python file is located in a <Databricks> workspace or at a cloud filesystem URI.
   * * `GIT`: The Python file is located in a remote Git repository.
   */
  source?: Source | undefined;
}

export interface CreateSparkSubmitTask {
  /**
   * Command-line parameters passed to spark submit.
   *
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   */
  parameters?: string[] | undefined;
}

export interface CreateSparseCheckout {
  /** List of patterns to include for sparse checkout. */
  patterns?: string[] | undefined;
}

export interface CreateSqlTask {
  /** Parameters to be used for each run of this job. The SQL alert task does not support custom parameters. */
  parameters?: Record<string, string> | undefined;
  sqlTaskType?:
    | {
        $case: 'query';
        /** If query, indicates that this job must execute a SQL query. */
        query: CreateSqlTaskQuery;
      }
    | {
        $case: 'dashboard';
        /** If dashboard, indicates that this job must refresh a SQL dashboard. */
        dashboard: CreateSqlTaskDashboard;
      }
    | {
        $case: 'alert';
        /** If alert, indicates that this job must refresh a SQL alert. */
        alert: CreateSqlTaskAlert;
      }
    | {
        $case: 'file';
        /** If file, indicates that this job runs a SQL file in a remote Git repository. */
        file: CreateSqlTaskFile;
      }
    | undefined;
  /** The canonical identifier of the SQL warehouse. Recommended to use with serverless or pro SQL warehouses. Classic SQL warehouses are only supported for SQL alert, dashboard and query tasks and are limited to scheduled single-task jobs. */
  warehouseId: string;
}

export interface CreateSqlTaskAlert {
  /** The canonical identifier of the SQL alert. */
  alertId: string;
  /** If specified, alert notifications are sent to subscribers. */
  subscriptions?: CreateSqlTaskSubscription[] | undefined;
  /** If true, the alert notifications are not sent to subscribers. */
  pauseSubscriptions?: boolean | undefined;
}

export interface CreateSqlTaskDashboard {
  /** The canonical identifier of the SQL dashboard. */
  dashboardId: string;
  /** If specified, dashboard snapshots are sent to subscriptions. */
  subscriptions?: CreateSqlTaskSubscription[] | undefined;
  /** Subject of the email sent to subscribers of this task. */
  customSubject?: string | undefined;
  /** If true, the dashboard snapshot is not taken, and emails are not sent to subscribers. */
  pauseSubscriptions?: boolean | undefined;
}

export interface CreateSqlTaskFile {
  /** Path of the SQL file. Must be relative if the source is a remote Git repository and absolute for workspace paths. */
  path: string;
  /**
   * Optional location type of the SQL file. When set to `WORKSPACE`, the SQL file will be retrieved
   * from the local <Databricks> workspace. When set to `GIT`, the SQL file will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   *
   * * `WORKSPACE`: SQL file is located in <Databricks> workspace.
   * * `GIT`: SQL file is located in cloud Git provider.
   */
  source?: Source | undefined;
}

export interface CreateSqlTaskQuery {
  queryType?:
    | {
        $case: 'queryId';
        /** The canonical identifier of the SQL query. */
        queryId: string;
      }
    | undefined;
}

export interface CreateSqlTaskSubscription {
  subscriptionType?:
    | {
        $case: 'userName';
        /** The user name to receive the subscription email. This parameter is mutually exclusive with destination_id. You cannot set both destination_id and user_name for subscription notifications. */
        userName: string;
      }
    | {
        $case: 'destinationId';
        /** The canonical identifier of the destination to receive email notification. This parameter is mutually exclusive with user_name. You cannot set both destination_id and user_name for subscription notifications. */
        destinationId: string;
      }
    | undefined;
}

export interface CreateSubscription {
  /** The list of subscribers to send the snapshot of the dashboard to. */
  subscribers?: Subscription_CreateSubscriber[] | undefined;
  /** When true, the subscription will not send emails. */
  paused?: boolean | undefined;
  /**
   * Optional: Allows users to specify a custom subject line on the email sent
   * to subscribers.
   */
  customSubject?: string | undefined;
}

export interface CreateTableTriggerConfiguration {
  /** A list of tables to monitor for changes. The table name must be in the format `catalog_name.schema_name.table_name`. */
  tableNames: string[];
  /**
   * If set, the trigger starts a run only after the specified amount of time has passed since
   * the last time the trigger fired. The minimum allowed value is 60 seconds.
   */
  minTimeBetweenTriggersSeconds?: number | undefined;
  /**
   * If set, the trigger starts a run only after no table updates have occurred for the specified time
   * and can be used to wait for a series of table updates before triggering a run. The
   * minimum allowed value is 60 seconds.
   */
  waitAfterLastChangeSeconds?: number | undefined;
  /** The table(s) condition based on which to trigger a job run. */
  condition?: TableTriggerConfiguration_Condition | undefined;
}

export interface CreateTaskDependency {
  /** The name of the task this task depends on. */
  taskKey: string;
  /** Can only be specified on condition task dependencies. The outcome of the dependent task that must be met for this task to run. */
  outcome?: string | undefined;
}

export interface CreateTaskSettings {
  /**
   * A unique name for the task. This field is used to refer to this task from other tasks.
   * This field is required and must be unique within its parent job.
   * On Update or Reset, this field is used to reference the tasks to be updated or reset.
   */
  taskKey: string;
  /**
   * An optional array of objects specifying the dependency graph of the task. All tasks specified in this field must complete before executing this task. The task will run only if the `run_if` condition is true.
   * The key is `task_key`, and the value is the name assigned to the dependent task.
   */
  dependsOn?: CreateTaskDependency[] | undefined;
  /**
   * An optional value specifying the condition determining whether the task is run once its dependencies have been completed.
   *
   * * `ALL_SUCCESS`: All dependencies have executed and succeeded
   * * `AT_LEAST_ONE_SUCCESS`: At least one dependency has succeeded
   * * `NONE_FAILED`: None of the dependencies have failed and at least one was executed
   * * `ALL_DONE`: All dependencies have been completed
   * * `AT_LEAST_ONE_FAILED`: At least one dependency failed
   * * `ALL_FAILED`: ALl dependencies have failed
   */
  runIf?: TaskDependencyType | undefined;
  /** An optional timeout applied to each run of this job task. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  health?: CreateJobsHealthRules | undefined;
  /** An optional set of email addresses that is notified when runs of this task begin or complete as well as when this task is deleted. The default behavior is to not send any emails. */
  emailNotifications?: CreateJobEmailNotifications | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this task. */
  notificationSettings?: CreateNotificationSettings | undefined;
  /** A collection of system notification IDs to notify when runs of this task begin or complete. The default behavior is to not send any system notifications. */
  webhookNotifications?: CreateWebhookNotifications | undefined;
  /** An optional description for this task. */
  description?: string | undefined;
  environmentRef?:
    | {
        $case: 'environmentKey';
        /** The key that references an environment spec in a job. This field is required for Python script, Python wheel and dbt tasks when using serverless compute. */
        environmentKey: string;
      }
    | undefined;
  /** An optional flag to disable the task. If set to true, the task will not run even if it is part of a job. */
  disabled?: boolean | undefined;
  /** Task level compute configuration. */
  compute?: CreateCompute | undefined;
  /** DO NOT ADD ANY NEW FIELDS TO JobTask OUTSIDE OF THIS ONEOF as it will break the TaskRegistry */
  task?:
    | {
        $case: 'notebookTask';
        /** The task runs a notebook when the `notebook_task` field is present. */
        notebookTask: CreateNotebookTask;
      }
    | {
        $case: 'sparkJarTask';
        /** The task runs a JAR when the `spark_jar_task` field is present. */
        sparkJarTask: CreateSparkJarTask;
      }
    | {
        $case: 'sparkPythonTask';
        /** The task runs a Python file when the `spark_python_task` field is present. */
        sparkPythonTask: CreateSparkPythonTask;
      }
    | {
        $case: 'sparkSubmitTask';
        /** (Legacy) The task runs the spark-submit script when the spark_submit_task field is present. Databricks recommends using the spark_jar_task instead; see [Spark Submit task for jobs](/jobs/spark-submit). */
        sparkSubmitTask: CreateSparkSubmitTask;
      }
    | {
        $case: 'pipelineTask';
        /** The task triggers a pipeline update when the `pipeline_task` field is present. Only pipelines configured to use triggered more are supported. */
        pipelineTask: CreatePipelineTask;
      }
    | {
        $case: 'pythonWheelTask';
        /** The task runs a Python wheel when the `python_wheel_task` field is present. */
        pythonWheelTask: CreatePythonWheelTask;
      }
    | {
        $case: 'dbtTask';
        /** The task runs one or more dbt commands when the `dbt_task` field is present. The dbt task requires both Databricks SQL and the ability to use a serverless or a pro SQL warehouse. */
        dbtTask: CreateDbtTask;
      }
    | {
        $case: 'sqlTask';
        /** The task runs a SQL query or file, or it refreshes a SQL alert or a legacy SQL dashboard when the `sql_task` field is present. */
        sqlTask: CreateSqlTask;
      }
    | {
        $case: 'runJobTask';
        /** The task triggers another job when the `run_job_task` field is present. */
        runJobTask: CreateRunJobTask;
      }
    | {
        $case: 'conditionTask';
        /**
         * The task evaluates a condition that can be used to control the execution of other tasks when the `condition_task` field is present.
         * The condition task does not require a cluster to execute and does not support retries or notifications.
         */
        conditionTask: CreateConditionTask;
      }
    | {
        $case: 'forEachTask';
        /** The task executes a nested task for every input provided when the `for_each_task` field is present. */
        forEachTask: CreateForEachTask;
      }
    | {
        $case: 'cleanRoomsNotebookTask';
        /**
         * The task runs a [clean rooms](/clean-rooms/index.html) notebook
         * when the `clean_rooms_notebook_task` field is present.
         */
        cleanRoomsNotebookTask: CreateCleanRoomsNotebookTask;
      }
    | {$case: 'genAiComputeTask'; genAiComputeTask: CreateGenAiComputeTask}
    | {
        $case: 'alertTask';
        /**
         * The task evaluates a <Databricks> alert and sends notifications to subscribers
         * when the `alert_task` field is present.
         */
        alertTask: CreateAlertTask;
      }
    | {
        $case: 'powerBiTask';
        /** The task triggers a Power BI semantic model update when the `power_bi_task` field is present. */
        powerBiTask: CreatePowerBiTask;
      }
    | {
        $case: 'dashboardTask';
        /** The task refreshes a dashboard and sends a snapshot to subscribers. */
        dashboardTask: CreateDashboardTask;
      }
    | {
        $case: 'dbtCloudTask';
        /** Task type for dbt cloud, deprecated in favor of the new name dbt_platform_task */
        dbtCloudTask: CreateDbtCloudTask;
      }
    | {$case: 'dbtPlatformTask'; dbtPlatformTask: CreateDbtPlatformTask}
    | {
        $case: 'pythonOperatorTask';
        /** The task runs a Python operator task. */
        pythonOperatorTask: CreatePythonOperatorTask;
      }
    | {
        $case: 'aiRuntimeTask';
        /**
         * The task runs a multi-node GPU compute workload on Databricks AI Runtime.
         * External-facing surface; mirrors the AIR CLI (fka SGCLI) v2 YAML schema.
         */
        aiRuntimeTask: CreateAiRuntimeTask;
      }
    | undefined;
  spec?:
    | {
        $case: 'existingClusterId';
        /**
         * If existing_cluster_id, the ID of an existing cluster that is used for all runs.
         * When running jobs or tasks on an existing cluster, you may need to manually restart
         * the cluster if it stops responding. We suggest running jobs and tasks on new clusters for
         * greater reliability
         */
        existingClusterId: string;
      }
    | {
        $case: 'newCluster';
        /** If new_cluster, a description of a new cluster that is created for each run. */
        newCluster: ClusterSpec_CreateNewCluster;
      }
    | {
        $case: 'jobClusterKey';
        /** If job_cluster_key, this task is executed reusing the cluster specified in `job.settings.job_clusters`. */
        jobClusterKey: string;
      }
    | undefined;
  /**
   * An optional list of libraries to be installed on the cluster.
   * The default value is an empty list.
   */
  libraries?: CreateLibrary[] | undefined;
  /** An optional maximum number of times to retry an unsuccessful run. A run is considered to be unsuccessful if it completes with the `FAILED` result_state or `INTERNAL_ERROR` `life_cycle_state`. The value `-1` means to retry indefinitely and the value `0` means to never retry. */
  maxRetries?: number | undefined;
  /** An optional minimal interval in milliseconds between the start of the failed run and the subsequent retry run. The default behavior is that unsuccessful runs are immediately retried. */
  minRetryIntervalMillis?: number | undefined;
  /**
   * An optional policy to specify whether to retry a job when it times out. The default behavior
   * is to not retry on timeout.
   */
  retryOnTimeout?: boolean | undefined;
  /** An option to disable auto optimization in serverless */
  disableAutoOptimization?: boolean | undefined;
}

export interface CreateTriggerSettings {
  /** Whether this trigger is paused or not. */
  pauseStatus?: SchedulePauseStatus | undefined;
  configuration?:
    | {
        $case: 'fileArrival';
        /** File arrival trigger settings. */
        fileArrival: CreateFileArrivalTriggerConfiguration;
      }
    | {
        $case: 'periodic';
        /** Periodic trigger settings. */
        periodic: CreatePeriodicTriggerConfiguration;
      }
    | {$case: 'tableUpdate'; tableUpdate: CreateTableTriggerConfiguration}
    | {$case: 'model'; model: CreateModelTriggerConfiguration}
    | undefined;
}

/** A storage location back by UC Volumes. */
export interface CreateVolumesStorageInfo {
  /**
   * UC Volumes destination, e.g. `/Volumes/catalog/schema/vol1/init-scripts/setup-datadog.sh`
   * or `dbfs:/Volumes/catalog/schema/vol1/init-scripts/setup-datadog.sh`
   */
  destination: string;
}

export interface CreateWebhook {
  id: string;
}

export interface CreateWebhookNotifications {
  /** An optional list of system notification IDs to call when the run starts. A maximum of 3 destinations can be specified for the `on_start` property. */
  onStart?: CreateWebhook[] | undefined;
  /** An optional list of system notification IDs to call when the run completes successfully. A maximum of 3 destinations can be specified for the `on_success` property. */
  onSuccess?: CreateWebhook[] | undefined;
  /** An optional list of system notification IDs to call when the run fails. A maximum of 3 destinations can be specified for the `on_failure` property. */
  onFailure?: CreateWebhook[] | undefined;
  /** An optional list of system notification IDs to call when the duration of a run exceeds the threshold specified for the `RUN_DURATION_SECONDS` metric in the `health` field. A maximum of 3 destinations can be specified for the `on_duration_warning_threshold_exceeded` property. */
  onDurationWarningThresholdExceeded?: CreateWebhook[] | undefined;
  /**
   * An optional list of system notification IDs to call when any streaming backlog thresholds are exceeded for any stream.
   * Streaming backlog thresholds can be set in the `health` field using the following metrics: `STREAMING_BACKLOG_BYTES`, `STREAMING_BACKLOG_RECORDS`, `STREAMING_BACKLOG_SECONDS`, or `STREAMING_BACKLOG_FILES`.
   * Alerting is based on the 10-minute average of these metrics. If the issue persists, notifications are resent every 30 minutes.
   * A maximum of 3 destinations can be specified for the `on_streaming_backlog_exceeded` property.
   */
  onStreamingBacklogExceeded?: CreateWebhook[] | undefined;
}

/** Cluster Attributes showing for clusters workload types. */
export interface CreateWorkloadType {
  /** defined what type of clients can use the cluster. E.g. Notebooks, Jobs */
  clients: WorkloadType_CreateClientsTypes;
}

/** A storage location in Workspace Filesystem (WSFS) */
export interface CreateWorkspaceStorageInfo {
  /** wsfs destination, e.g. `workspace:/cluster-init-scripts/setup-datadog.sh` */
  destination: string;
}

export interface CronSchedule {
  /** A Cron expression using Quartz syntax that describes the schedule for a job. See [Cron Trigger](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html) for details. This field is required. */
  quartzCronExpression?: string | undefined;
  /** A Java timezone ID. The schedule for a job is resolved with respect to this timezone. See [Java TimeZone](https://docs.oracle.com/javase/7/docs/api/java/util/TimeZone.html) for details. This field is required. */
  timezoneId?: string | undefined;
  /** Indicate whether this schedule is paused or not. */
  pauseStatus?: SchedulePauseStatus | undefined;
}

export interface DashboardPageSnapshot {
  pageDisplayName?: string | undefined;
  widgetErrorDetails?: WidgetErrorDetail[] | undefined;
}

/** Configures the Lakeview Dashboard job task type. */
export interface DashboardTask {
  /** Optional: subscription configuration for sending the dashboard snapshot. */
  subscription?: Subscription | undefined;
  /**
   * Optional: The warehouse id to execute the dashboard with for the schedule.
   * If not specified, the default warehouse of the dashboard will be used.
   */
  warehouseId?: string | undefined;
  /** The identifier of the dashboard to refresh. */
  dashboardId?: string | undefined;
  /**
   * Dashboard task parameters. Used to apply dashboard filter values during dashboard task execution. Parameter values get applied to any dashboard filters that have a matching URL identifier as the parameter key.
   * The parameter value format is dependent on the filter type:
   * - For text and single-select filters, provide a single value (e.g. `"value"`)
   * - For date and datetime filters, provide the value in ISO 8601 format (e.g. `"2000-01-01T00:00:00"`)
   * - For multi-select filters, provide a JSON array of values (e.g. `"[\"value1\",\"value2\"]"`)
   * - For range and date range filters, provide a JSON object with `start` and `end` (e.g. `"{\"start\":\"1\",\"end\":\"10\"}"`)
   */
  filters?: Record<string, string> | undefined;
}

export interface DashboardTaskOutput {
  /** Should only be populated for manual PDF download jobs. */
  pageSnapshots?: DashboardPageSnapshot[] | undefined;
}

/** A storage location in DBFS */
export interface DbfsStorageInfo {
  /** dbfs destination, e.g. `dbfs:/my/path` */
  destination?: string | undefined;
}

/**
 * Format of response retrieved from dbt Cloud, for inclusion in output
 * Deprecated in favor of DbtPlatformJobRunStep
 */
export interface DbtCloudJobRunStep {
  /** Orders the steps in the job */
  index?: number | undefined;
  /** Name of the step in the job */
  name?: string | undefined;
  /** State of the step */
  status?: DbtPlatformRunStatus | undefined;
  /** Output of the step */
  logs?: string | undefined;
}

/** Deprecated in favor of DbtPlatformTask */
export interface DbtCloudTask {
  /** Id of the dbt Cloud job to be triggered */
  dbtCloudJobId?: bigint | undefined;
  /** The resource name of the UC connection that authenticates the dbt Cloud for this task */
  connectionResourceName?: string | undefined;
}

/** Deprecated in favor of DbtPlatformTaskOutput */
export interface DbtCloudTaskOutput {
  /** Id of the job run in dbt Cloud */
  dbtCloudJobRunId?: bigint | undefined;
  /** Url where full run details can be viewed */
  dbtCloudJobRunUrl?: string | undefined;
  /** Steps of the job run as received from dbt Cloud */
  dbtCloudJobRunOutput?: DbtCloudJobRunStep[] | undefined;
}

/** Format of response retrieved from dbt platform, for inclusion in output */
export interface DbtPlatformJobRunStep {
  /** Orders the steps in the job */
  index?: number | undefined;
  /** Name of the step in the job */
  name?: string | undefined;
  /** State of the step */
  status?: DbtPlatformRunStatus | undefined;
  /** Output of the step */
  logs?: string | undefined;
  /** Whether the name of the job has been truncated. If true, the name has been truncated to 100 characters. */
  nameTruncated?: boolean | undefined;
  /** Whether the logs of this step have been truncated. If true, the logs has been truncated to 10000 characters. */
  logsTruncated?: boolean | undefined;
}

export interface DbtPlatformTask {
  /** Id of the dbt platform job to be triggered. Specified as a string for maximum compatibility with clients. */
  dbtPlatformJobId?: string | undefined;
  /** The resource name of the UC connection that authenticates the dbt platform for this task */
  connectionResourceName?: string | undefined;
}

export interface DbtPlatformTaskOutput {
  /** Id of the job run in dbt platform. Specified as a string for maximum compatibility with clients. */
  dbtPlatformJobRunId?: string | undefined;
  /** Url where full run details can be viewed */
  dbtPlatformJobRunUrl?: string | undefined;
  /** Steps of the job run as received from dbt platform */
  dbtPlatformJobRunOutput?: DbtPlatformJobRunStep[] | undefined;
  /** Whether the number of steps in the output has been truncated. If true, the output will contain the first 20 steps of the output. */
  stepsTruncated?: boolean | undefined;
}

export interface DbtTask {
  /**
   * Path to the project directory. Optional for Git sourced tasks, in which
   * case if no value is provided, the root of the Git repository is used.
   */
  projectDirectory?: string | undefined;
  /** A list of dbt commands to execute. All commands must start with `dbt`. This parameter must not be empty. A maximum of up to 10 commands can be provided. */
  commands?: string[] | undefined;
  /** Optional schema to write to. This parameter is only used when a warehouse_id is also provided. If not provided, the `default` schema is used. */
  schema?: string | undefined;
  /** ID of the SQL warehouse to connect to. If provided, we automatically generate and provide the profile and connection details to dbt. It can be overridden on a per-command basis by using the `--profiles-dir` command line argument. */
  warehouseId?: string | undefined;
  /** Optional (relative) path to the profiles directory. Can only be specified if no warehouse_id is specified. If no warehouse_id is specified and this folder is unset, the root directory is used. */
  profilesDirectory?: string | undefined;
  /** Optional name of the catalog to use. The value is the top level in the 3-level namespace of Unity Catalog (catalog / schema / relation). The catalog value can only be specified if a warehouse_id is specified. Requires dbt-databricks >= 1.1.1. */
  catalog?: string | undefined;
  /**
   * Optional location type of the project directory. When set to `WORKSPACE`, the project will be retrieved
   * from the local <Databricks> workspace. When set to `GIT`, the project will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   *
   * * `WORKSPACE`: Project is located in <Databricks> workspace.
   * * `GIT`: Project is located in cloud Git provider.
   */
  source?: Source | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DbtTask_DbtTaskOutput {
  /** A pre-signed URL to download the (compressed) dbt artifacts. This link is valid for a limited time (30 minutes). This information is only available after the run has finished. */
  artifactsLink?: string | undefined;
  /** An optional map of headers to send when retrieving the artifact from the `artifacts_link`. */
  artifactsHeaders?: Record<string, string> | undefined;
}

export interface DeleteJobRequest {
  /** The canonical identifier of the job to delete. This field is required. */
  jobId: bigint;
}

/** Job was deleted successfully. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteJobResponse {}

export interface DeleteRunRequest {
  /** ID of the run to delete. */
  runId: bigint;
}

/** Run was deleted successfully. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteRunResponse {}

/**
 * DeploymentSpec: configuration for one deployment within an AiRuntimeTask.
 * Each entry in `AiRuntimeTask.deployments` describes a group of nodes that
 * share the same command and compute. Many single-program training
 * algorithms use a single entry where every node runs the same command;
 * role-split workloads (driver + worker, parameter server, separate eval
 * node, etc.) use multiple entries.
 */
export interface DeploymentSpec {
  /**
   * Workspace path of the bash script to execute on each node in this
   * deployment. The CLI uploads the user's script and populates this.
   * Customers calling the Jobs API directly should upload their script to
   * the workspace first and supply the resulting path here.
   */
  commandPath?: string | undefined;
  /** Compute resources allocated to each node in this deployment. */
  compute?: ComputeSpec | undefined;
  /**
   * Optional human-readable name for this deployment (for example, `driver`,
   * `worker`, `param_server`). Used for log and UI display. Distinct names
   * are recommended so deployments can be told apart, but uniqueness is not
   * enforced.
   */
  name?: string | undefined;
}

export interface DockerBasicAuth {
  /** Name of the user */
  username?: string | undefined;
  /** Password of the user */
  password?: string | undefined;
}

export interface DockerImage {
  /** URL of the docker image. */
  url?: string | undefined;
  credsOneof?:
    | {
        $case: 'basicAuth';
        /** Basic auth with username and password */
        basicAuth: DockerBasicAuth;
      }
    | undefined;
}

export interface EnforcePolicyComplianceForJob {
  /** The ID of the job you want to enforce policy compliance on. */
  jobId: bigint;
  /**
   * If set, previews changes made to the job to comply with its policy, but
   * does not update the job.
   */
  validateOnly?: boolean | undefined;
}

export interface EnforcePolicyComplianceResponse {
  /**
   * Whether any changes have been made to the job cluster settings for the job to
   * become compliant with its policies.
   */
  hasChanges?: boolean | undefined;
  /**
   * A list of job cluster changes that have been made to the job’s cluster
   * settings in order for all job clusters to become compliant with their
   * policies.
   */
  jobClusterChanges?:
    | EnforcePolicyComplianceResponse_JobClusterSettingsChange[]
    | undefined;
  /**
   * Updated job settings after policy enforcement. Policy enforcement only
   * applies to job clusters that are created when running the job (which are
   * specified in new_cluster) and does not apply to existing all-purpose clusters.
   * Updated job settings are derived by applying policy default values to the
   * existing job clusters in order to satisfy policy requirements.
   */
  settings?: JobSettings | undefined;
}

/**
 * Represents a change to the job cluster's settings that would be required for the
 * job clusters to become compliant with their policies.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EnforcePolicyComplianceResponse_JobClusterSettingsChange {
  /** The field where this change would be made, prepended with the job cluster key. */
  field?: string | undefined;
  /**
   * The previous value of this field before enforcing policy compliance
   * (either a number, a boolean, or a string) converted to a string.
   * This is intended to be read by a human. The type of the field
   * can be retrieved by reading the settings field in the API response.
   */
  previousValue?: string | undefined;
  /**
   * The new value of this field after enforcing policy compliance
   * (either a number, a boolean, or a string) converted to a string.
   * This is intended to be read by a human. The typed new value of this field
   * can be retrieved by reading the settings field in the API response.
   */
  newValue?: string | undefined;
}

/**
 * The environment entity used to preserve serverless environment side panel, jobs' environment for non-notebook task, and SDP's environment for classic and serverless pipelines.
 * In this minimal environment spec, only pip and java dependencies are supported.
 */
export interface Environment {
  /** Use `environment_version` instead. */
  client?: string | undefined;
  /**
   * List of pip dependencies, as supported by the version of pip in this environment.
   * Each dependency is a valid pip requirements file line per https://pip.pypa.io/en/stable/reference/requirements-file-format/.
   * Allowed dependencies include a requirement specifier, an archive URL, a local project path (such as WSFS or UC Volumes in <Databricks>), or a VCS project URL.
   */
  dependencies?: string[] | undefined;
  /**
   * The base environment this environment is built on top of. A base environment defines the environment version and a
   * list of dependencies for serverless compute. The value can be a file path to a custom `env.yaml` file
   * (e.g., `/Workspace/path/to/env.yaml`). Support for a <Databricks>-provided base environment ID
   * (e.g., `workspace-base-environments/databricks_ai_v4`) and workspace base environment ID
   * (e.g., `workspace-base-environments/dbe_b849b66e-b31a-4cb5-b161-1f2b10877fb7`) is in Beta.
   * Either `environment_version` or `base_environment` can be provided.
   * For more information about <Databricks>-provided base environments, see the
   * [list workspace base environments](:method:Environments/ListWorkspaceBaseEnvironments) API.
   * For more information, see
   */
  baseEnvironment?: string | undefined;
  /**
   * Either `environment_version` or `base_environment` needs to be provided. Environment version used by the environment.
   * Each version comes with a specific Python version and a set of Python packages.
   * The version is a string, consisting of an integer.
   */
  environmentVersion?: string | undefined;
  /** List of java dependencies. Each dependency is a string representing a java library path. For example: `/Volumes/path/to/test.jar`. */
  javaDependencies?: string[] | undefined;
}

/** Retrieves the export of a job run task. */
export interface ExportRunRequest {
  /** The canonical identifier for the run. This field is required. */
  runId?: bigint | undefined;
  /** Which views to export (CODE, DASHBOARDS, or ALL). Defaults to CODE. */
  viewsToExport?: ViewsToExport | undefined;
}

/** Run was exported successfully. */
export interface ExportRunResponse {
  /** The exported content in HTML format (one for every view item). To extract the HTML notebook from the JSON response, download and run this [Python script](/_static/examples/extract.py). */
  views?: ViewItem[] | undefined;
}

export interface FileArrivalTriggerConfiguration {
  /** URL to be monitored for file arrivals. The path must point to the root or a subpath of the external location. */
  url?: string | undefined;
  /**
   * If set, the trigger starts a run only after the specified amount of time passed since
   * the last time the trigger fired. The minimum allowed value is 60 seconds
   */
  minTimeBetweenTriggersSeconds?: number | undefined;
  /**
   * If set, the trigger starts a run only after no file activity has occurred for the specified amount of time.
   * This makes it possible to wait for a batch of incoming files to arrive before triggering a run. The
   * minimum allowed value is 60 seconds.
   */
  waitAfterLastChangeSeconds?: number | undefined;
}

export interface FileArrivalTriggerState {
  /** Indicates whether the trigger leverages file events to detect file arrivals. */
  usingFileEvents?: boolean | undefined;
}

export interface ForEachTask {
  /**
   * Array for task to iterate on. This can be a JSON string or a reference to
   * an array parameter.
   */
  inputs?: string | undefined;
  /**
   * An optional maximum allowed number of concurrent runs of the task.
   * Set this value if you want to be able to execute multiple runs of the task concurrently.
   */
  concurrency?: number | undefined;
  /** Configuration for the task that will be run for each element in the array */
  task?: TaskSettings | undefined;
}

/** Attributes set during cluster creation which are related to GCP. */
export interface GcpAttributes {
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs (when set to true) versus standard compute engine VMs (when set to false; default).
   * Note: Soon to be deprecated, use the 'availability' field instead.
   */
  usePreemptibleExecutors?: boolean | undefined;
  /**
   * If provided, the cluster will impersonate the google service account when accessing
   * gcloud services (like GCS). The google service account
   * must have previously been added to the <Databricks> environment by an account
   * administrator.
   */
  googleServiceAccount?: string | undefined;
  /** Boot disk size in GB */
  bootDiskSize?: number | undefined;
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if the former is unavailable.
   */
  availability?: GcpAvailability | undefined;
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
   * If provided, each node (workers and driver) in the cluster will have this number of local SSDs attached.
   * Each local SSD is 375GB in size.
   * Refer to [GCP documentation](https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds)
   * for the supported number of local SSDs for each instance type.
   */
  localSsdCount?: number | undefined;
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * The confidential computing technology for this cluster's instances.
   * Currently only SEV_SNP is supported, and only on N2D instance types.
   * When not set, no confidential computing is applied.
   */
  confidentialComputeType?: ConfidentialComputeType | undefined;
}

/** A storage location in Google Cloud Platform's GCS */
export interface GcsStorageInfo {
  /** GCS destination/URI, e.g. `gs://my-bucket/some-prefix` */
  destination?: string | undefined;
}

/**
 * DEPRECATED — use `AiRuntimeTask` for all new BYOT multi-node GPU
 * workloads (see ai_runtime_task.proto). `AiRuntimeTask` is the only
 * supported BYOT task type for new workloads; this proto is retained only
 * for AIR CLI (fka SGCLI) pywheel backwards compatibility and will be
 * removed once the pywheel → databricks-cli migration completes (post-
 * PuPr).
 */
export interface GenAiComputeTask {
  /** Runtime image */
  dlRuntimeImage?: string | undefined;
  compute?: ComputeConfig | undefined;
  /** Command launcher to run the actual script, e.g. bash, python etc. */
  command?: string | undefined;
  /**
   * Optional location type of the training script. When set to `WORKSPACE`, the script will be retrieved from the local <Databricks> workspace. When set to `GIT`, the script will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   * * `WORKSPACE`: Script is located in <Databricks> workspace.
   * * `GIT`: Script is located in cloud Git provider.
   */
  source?: Source | undefined;
  /** The training script file path to be executed. Cloud file URIs (such as dbfs:/, s3:/, adls:/, gcs:/) and workspace paths are supported. For python files stored in the <Databricks> workspace, the path must be absolute and begin with `/`. For files stored in a remote repository, the path must be relative. This field is required. */
  trainingScriptPath?: string | undefined;
  /** Optional path to a YAML file containing model parameters passed to the training script. */
  yamlParametersFilePath?: string | undefined;
  /**
   * Optional string containing model parameters passed to the training script in yaml format.
   * If present, then the content in yaml_parameters_file_path will be ignored.
   */
  yamlParameters?: string | undefined;
  /**
   * Optional string containing the name of the MLflow experiment to log the run to. If name is not
   * found, backend will create the mlflow experiment using the name.
   */
  mlflowExperimentName?: string | undefined;
}

/** Retrieves information about a single job. */
export interface GetJobRequest {
  /** The canonical identifier of the job to retrieve information about. This field is required. */
  jobId?: bigint | undefined;
  /** Flag that indicates that trigger state should be included in the response. */
  includeTriggerState?: boolean | undefined;
  /** Use `next_page_token` returned from the previous GetJob response to request the next page of the job's array properties. */
  pageToken?: string | undefined;
}

/** Job was retrieved successfully. */
export interface GetJobResponse {
  /** A token that can be used to list the next page of array properties. */
  nextPageToken?: string | undefined;
  /** The canonical identifier for this job. */
  jobId?: bigint | undefined;
  /** The creator user name. This field won’t be included in the response if the user has already been deleted. */
  creatorUserName?: string | undefined;
  /**
   * The email of an active workspace user or the application ID of a service principal that the job runs as. This value can be changed by setting the `run_as` field when creating or updating a job.
   *
   * By default, `run_as_user_name` is based on the current job settings and is set to the creator of the job if job access control is disabled or to the user with the `is_owner` permission if job access control is enabled.
   */
  runAsUserName?: string | undefined;
  /** Settings for this job and all of its runs. These settings can be updated using the `resetJob` method. */
  settings?: JobSettings | undefined;
  /** The time at which this job was created in epoch milliseconds (milliseconds since 1/1/1970 UTC). */
  createdTime?: bigint | undefined;
  /** State of the trigger associated with the job. */
  triggerState?: TriggerState | undefined;
  /**
   * Indicates if the job has more array properties (`tasks`, `job_clusters`) that are not shown. They can be accessed via :method:jobs/get endpoint.
   * It is only relevant for API 2.2 :method:jobs/list requests with `expand_tasks=true`.
   */
  hasMore?: boolean | undefined;
  /**
   * The id of the budget policy used by this job for cost attribution purposes.
   * This may be set through (in order of precedence):
   * 1. Budget admins through the account or workspace console
   * 2. Jobs UI in the job details page and Jobs API using `budget_policy_id`
   * 3. Inferred default based on accessible budget policies of the run_as identity on job creation or modification.
   */
  effectiveBudgetPolicyId?: string | undefined;
  /** The id of the usage policy used by this job for cost attribution purposes. */
  effectiveUsagePolicyId?: string | undefined;
}

export interface GetPolicyComplianceForJobRequest {
  /** The ID of the job whose compliance status you are requesting. */
  jobId?: bigint | undefined;
}

export interface GetPolicyComplianceForJobResponse {
  /**
   * Whether the job is compliant with its policies or not. Jobs could be out of
   * compliance if a policy they are using was updated after the job was
   * last edited and some of its job clusters no longer comply with
   * their updated policies.
   */
  isCompliant?: boolean | undefined;
  /**
   * An object containing key-value mappings representing the first 200 policy
   * validation errors.
   * The keys indicate the path where the policy validation error is occurring.
   * An identifier for the job cluster is prepended to the path.
   * The values indicate an error message describing the policy validation error.
   */
  violations?: Record<string, string> | undefined;
}

/** Retrieves both the output and the metadata of a run. */
export interface GetRunOutputRequest {
  /** The canonical identifier for the run. */
  runId?: bigint | undefined;
}

/** Run output was retrieved successfully. */
export interface GetRunOutputResponse {
  /** All details of the run except for its output. */
  metadata?: Run | undefined;
  /** An error message indicating why a task failed or why output is not available. The message is unstructured, and its exact format is subject to change. */
  error?: string | undefined;
  info?: string | undefined;
  result?:
    | {
        $case: 'notebookOutput';
        /**
         * The output of a notebook task, if available. A notebook task that terminates (either successfully or with a failure)
         * without calling `dbutils.notebook.exit()` is considered to have an empty output.
         * This field is set but its result value is empty. <Databricks> restricts this API to return the first 5 MB of the output.
         * To return a larger result, use the [ClusterLogConf](/dev-tools/api/latest/clusters.html#clusterlogconf) field to configure log storage
         * for the job cluster.
         */
        notebookOutput: NotebookTask_NotebookOutput;
      }
    | {
        $case: 'sqlOutput';
        /** The output of a SQL task, if available. */
        sqlOutput: SqlTask_SqlOutput;
      }
    | {
        $case: 'dbtOutput';
        /** The output of a dbt task, if available. */
        dbtOutput: DbtTask_DbtTaskOutput;
      }
    | {
        $case: 'runJobOutput';
        /** The output of a run job task, if available */
        runJobOutput: RunJobTask_RunJobTaskOutput;
      }
    | {
        $case: 'cleanRoomsNotebookOutput';
        /** The output of a clean rooms notebook task, if available */
        cleanRoomsNotebookOutput: CleanRoomsNotebookTask_CleanRoomsNotebookTaskOutput;
      }
    | {
        $case: 'dashboardOutput';
        /** The output of a dashboard task, if available */
        dashboardOutput: DashboardTaskOutput;
      }
    | {
        $case: 'dbtCloudOutput';
        /** Deprecated in favor of the new dbt_platform_output */
        dbtCloudOutput: DbtCloudTaskOutput;
      }
    | {$case: 'dbtPlatformOutput'; dbtPlatformOutput: DbtPlatformTaskOutput}
    | {
        $case: 'alertOutput';
        /** The output of an alert task, if available */
        alertOutput: AlertTaskOutput;
      }
    | {
        $case: 'aiRuntimeTaskOutput';
        /**
         * The output of an AiRuntimeTask, if available — MLflow identifiers,
         * artifact paths, and per-replica allocated compute. Run lifecycle /
         * termination status lives on the surrounding framework `RunTask.status`
         * (`runs.proto:RunTask.status` of type `RunStatus`), not on this output.
         * See `tasks/genai/ai_runtime_task.proto:AiRuntimeTaskOutput`.
         */
        aiRuntimeTaskOutput: AiRuntimeTaskOutput;
      }
    | undefined;
  /**
   * The output from tasks that write to standard streams (stdout/stderr) such as
   * spark_jar_task, spark_python_task, python_wheel_task.
   *
   * It's not supported for the notebook_task, pipeline_task or spark_submit_task.
   *
   * <Databricks> restricts this API to return the last 5 MB of these logs.
   */
  logs?: string | undefined;
  /** Whether the logs are truncated. */
  logsTruncated?: boolean | undefined;
  /** If there was an error executing the run, this field contains any available stack traces. */
  errorTrace?: string | undefined;
}

export interface GetRunRequest {
  /**
   * The canonical identifier of the run for which to retrieve the metadata.
   * This field is required.
   */
  runId?: bigint | undefined;
  /** Whether to include the repair history in the response. */
  includeHistory?: boolean | undefined;
  /** Whether to include resolved parameter values in the response. */
  includeResolvedValues?: boolean | undefined;
  /** Use `next_page_token` returned from the previous GetRun response to request the next page of the run's array properties. */
  pageToken?: string | undefined;
}

/** Run was retrieved successfully */
export interface GetRunResponse {
  /** A token that can be used to list the next page of array properties. */
  nextPageToken?: string | undefined;
  /** The canonical identifier of the job that contains this run. */
  jobId?: bigint | undefined;
  /** The canonical identifier of the run. This ID is unique across all runs of all jobs. */
  runId?: bigint | undefined;
  /** The creator user name. This field won’t be included in the response if the user has already been deleted. */
  creatorUserName?: string | undefined;
  /** A unique identifier for this job run. This is set to the same value as `run_id`. */
  numberInJob?: bigint | undefined;
  /** If this run is a retry of a prior run attempt, this field contains the run_id of the original attempt; otherwise, it is the same as the run_id. */
  originalAttemptRunId?: bigint | undefined;
  /** Deprecated. Please use the `status` field instead. */
  state?: RunState | undefined;
  /** The cron schedule that triggered this run if it was triggered by the periodic scheduler. */
  schedule?: CronSchedule | undefined;
  /** A snapshot of the job’s cluster specification when this run was created. */
  clusterSpec?: ClusterSpec | undefined;
  /** The cluster used for this run. If the run is specified to use a new cluster, this field is set once the Jobs service has requested a cluster for the run. */
  clusterInstance?: ClusterInstance | undefined;
  /** Job-level parameters used in the run */
  jobParameters?: Run_JobLevelParameters[] | undefined;
  /** The parameters used for this run. */
  overridingParameters?: RunParameters | undefined;
  trigger?: TriggerType | undefined;
  triggerInfo?: RunTriggerInfo | undefined;
  /** An optional name for the run. The maximum length is 4096 bytes in UTF-8 encoding. */
  runName?: string | undefined;
  /** The URL to the detail page of the run. */
  runPageUrl?: string | undefined;
  runType?: RunType | undefined;
  /**
   * The list of tasks performed by the run. Each task has its own `run_id` which you can use to call `JobsGetOutput` to retrieve the run results.
   * If more than 100 tasks are available, you can paginate through them using :method:jobs/getrun. Use the `next_page_token` field at the object root to determine if more results are available.
   */
  tasks?: RunTask[] | undefined;
  /** Description of the run */
  description?: string | undefined;
  /** The sequence number of this run attempt for a triggered job run. The initial attempt of a run has an attempt_number of 0. If the initial run attempt fails, and the job has a retry policy (`max_retries` > 0), subsequent runs are created with an `original_attempt_run_id` of the original attempt’s ID and an incrementing `attempt_number`. Runs are retried only until they succeed, and the maximum `attempt_number` is the same as the `max_retries` value for the job. */
  attemptNumber?: number | undefined;
  /**
   * A list of job cluster specifications that can be shared and reused by tasks of this job. Libraries cannot be declared in a shared job cluster. You must declare dependent libraries in task settings.
   * If more than 100 job clusters are available, you can paginate through them using :method:jobs/getrun.
   */
  jobClusters?: JobCluster[] | undefined;
  /**
   * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
   *
   * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
   *
   * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
   */
  gitSource?: GitSource | undefined;
  /** The repair history of the run. */
  repairHistory?: Repair[] | undefined;
  status?: RunStatus | undefined;
  /**
   * ID of the job run that this run belongs to.
   * For legacy and single-task job runs the field is populated with the job run ID.
   * For task runs, the field is populated with the ID of the job run that the task run belongs to.
   */
  jobRunId?: bigint | undefined;
  /**
   * Indicates if the run has more array properties (`tasks`, `job_clusters`) that are not shown. They can be accessed via :method:jobs/getrun endpoint.
   * It is only relevant for API 2.2 :method:jobs/listruns requests with `expand_tasks=true`.
   */
  hasMore?: boolean | undefined;
  /**
   * The actual performance target used by the serverless run during execution. This can differ from the client-set performance target on the request depending on whether the performance mode is supported by the job type.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  effectivePerformanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /** The id of the usage policy used by this run for cost attribution purposes. */
  effectiveUsagePolicyId?: string | undefined;
  /** The time at which this run was started in epoch milliseconds (milliseconds since 1/1/1970 UTC). This may not be the time when the job task starts executing, for example, if the job is scheduled to run on a new cluster, this is the time the cluster creation call is issued. */
  startTime?: bigint | undefined;
  /** The time in milliseconds it took to set up the cluster. For runs that run on new clusters this is the cluster creation time, for runs that run on existing clusters this time should be very short. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the `cleanup_duration`. The `setup_duration` field is set to 0 for multitask job runs. The total duration of a multitask job run is the value of the `run_duration` field. */
  setupDuration?: bigint | undefined;
  /** The time in milliseconds it took to execute the commands in the JAR or notebook until they  completed, failed, timed out, were cancelled, or encountered an unexpected error. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the  `cleanup_duration`. The `execution_duration` field is set to 0 for multitask job runs. The total  duration of a multitask job run is the value of the `run_duration` field. */
  executionDuration?: bigint | undefined;
  /** The time in milliseconds it took to terminate the cluster and clean up any associated artifacts. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the `cleanup_duration`. The `cleanup_duration` field is set to 0 for multitask job runs. The total duration of a multitask job run is the value of the `run_duration` field. */
  cleanupDuration?: bigint | undefined;
  /** The time at which this run ended in epoch milliseconds (milliseconds since 1/1/1970 UTC). This field is set to 0 if the job is still running. */
  endTime?: bigint | undefined;
  /** The time in milliseconds it took the job run and all of its repairs to finish. */
  runDuration?: bigint | undefined;
  /** The time in milliseconds that the run has spent in the queue. */
  queueDuration?: bigint | undefined;
}

/** Read-only state of the remote repository at the time the job was run. This field is only included on job runs. */
export interface GitMetadataSnapshot {
  /** Commit that was used to execute the run. If git_branch was specified, this points to the HEAD of the branch at the time of the run; if git_tag was specified, this points to the commit the tag points to. */
  usedCommit?: string | undefined;
}

/**
 * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
 *
 * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
 *
 * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
 */
export interface GitSource {
  /** URL of the repository to be cloned by this job. */
  gitUrl?: string | undefined;
  /** Unique identifier of the service used to host the Git repository. The value is case insensitive. */
  gitProvider?: string | undefined;
  gitReference?:
    | {
        $case: 'gitBranch';
        /** Name of the branch to be checked out and used by this job. This field cannot be specified in conjunction with git_tag or git_commit. */
        gitBranch: string;
      }
    | {
        $case: 'gitTag';
        /** Name of the tag to be checked out and used by this job. This field cannot be specified in conjunction with git_branch or git_commit. */
        gitTag: string;
      }
    | {
        $case: 'gitCommit';
        /** Commit to be checked out and used by this job. This field cannot be specified in conjunction with git_branch or git_tag. */
        gitCommit: string;
      }
    | undefined;
  gitSnapshot?: GitMetadataSnapshot | undefined;
  /** The source of the job specification in the remote repository when the job is source controlled. */
  jobSource?: JobSource | undefined;
  sparseCheckout?: SparseCheckout | undefined;
}

/** Config for an individual init script */
export interface InitScriptInfo {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * `{ "dbfs": { "destination" : "dbfs:/home/cluster_log" } }`
         */
        dbfs: DbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either the region or endpoint need to be provided. e.g.
         * `{ \"s3\": { \"destination\": \"s3://cluster_log_bucket/prefix\", \"region\": \"us-west-2\" } }`
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * `instance_profile_arn` has permission to write data to the s3 destination.
         */
        s3: S3StorageInfo;
      }
    | {
        $case: 'file';
        /**
         * destination needs to be provided, e.g.
         * `{ "file": { "destination": "file:/my/local/file.sh" } }`
         */
        file: LocalFileInfo;
      }
    | {
        $case: 'gcs';
        /**
         * destination needs to be provided, e.g.
         * `{ "gcs": { "destination": "gs://my-bucket/file.sh" } }`
         */
        gcs: GcsStorageInfo;
      }
    | {
        $case: 'abfss';
        /**
         * destination needs to be provided, e.g.
         * `abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/<directory-name>`
         */
        abfss: Adlsgen2Info;
      }
    | {
        $case: 'workspace';
        /**
         * destination needs to be provided, e.g.
         * `{ "workspace": { "destination": "/cluster-init-scripts/setup-datadog.sh" } }`
         */
        workspace: WorkspaceStorageInfo;
      }
    | {
        $case: 'volumes';
        /**
         * destination needs to be provided. e.g.
         * `{ \"volumes\" : { \"destination\" : \"/Volumes/my-init.sh\" } }`
         */
        volumes: VolumesStorageInfo;
      }
    | undefined;
}

export interface JobCluster {
  /**
   * A unique name for the job cluster. This field is required and must be unique within the job.
   * `JobTaskSettings` may refer to this field to determine which cluster to launch for the task execution.
   */
  jobClusterKey?: string | undefined;
  /** If new_cluster, a description of a cluster that is created for each task. */
  newCluster?: ClusterSpec_NewCluster | undefined;
}

export interface JobDeployment {
  /**
   * The kind of deployment that manages the job.
   *
   * * `BUNDLE`: The job is managed by Databricks Asset Bundle.
   * * `SYSTEM_MANAGED`: The job is managed by <Databricks> and is read-only.
   */
  kind?: JobDeployment_DeploymentKind | undefined;
  /** Path of the file that contains deployment metadata. */
  metadataFilePath?: string | undefined;
  /**
   * ID of the deployment that manages this job. Only set when `kind` is
   * `BUNDLE`. Used to look up deployment metadata from the Deployment
   * Metadata service.
   */
  deploymentId?: string | undefined;
  /**
   * ID of the version of the deployment that produced this job. Only set
   * when `kind` is `BUNDLE`. Identifies a specific snapshot of the deployment
   * in the Deployment Metadata service.
   */
  versionId?: string | undefined;
}

export interface JobEmailNotifications {
  /** A list of email addresses to be notified when a run begins. If not specified on job creation, reset, or update, the list is empty, and notifications are not sent. */
  onStart?: string[] | undefined;
  /** A list of email addresses to be notified when a run successfully completes. A run is considered to have completed successfully if it ends with a `TERMINATED` `life_cycle_state` and a `SUCCESS` result_state. If not specified on job creation, reset, or update, the list is empty, and notifications are not sent. */
  onSuccess?: string[] | undefined;
  /** A list of email addresses to be notified when a run unsuccessfully completes. A run is considered to have completed unsuccessfully if it ends with an `INTERNAL_ERROR` `life_cycle_state` or a `FAILED`, or `TIMED_OUT` result_state. If this is not specified on job creation, reset, or update the list is empty, and notifications are not sent. */
  onFailure?: string[] | undefined;
  /** A list of email addresses to be notified when the duration of a run exceeds the threshold specified for the `RUN_DURATION_SECONDS` metric in the `health` field. If no rule for the `RUN_DURATION_SECONDS` metric is specified in the `health` field for the job, notifications are not sent. */
  onDurationWarningThresholdExceeded?: string[] | undefined;
  /**
   * A list of email addresses to notify when any streaming backlog thresholds are exceeded for any stream.
   * Streaming backlog thresholds can be set in the `health` field using the following metrics: `STREAMING_BACKLOG_BYTES`, `STREAMING_BACKLOG_RECORDS`, `STREAMING_BACKLOG_SECONDS`, or `STREAMING_BACKLOG_FILES`.
   * Alerting is based on the 10-minute average of these metrics. If the issue persists, notifications are resent every 30 minutes.
   */
  onStreamingBacklogExceeded?: string[] | undefined;
  /**
   * If true, do not send email to recipients specified in `on_failure` if the run is skipped.
   * This field is `deprecated`. Please use the `notification_settings.no_alert_for_skipped_runs` field.
   */
  noAlertForSkippedRuns?: boolean | undefined;
}

export interface JobEnvironment {
  /** The key of an environment. It has to be unique within a job. */
  environmentKey?: string | undefined;
  spec?: Environment | undefined;
}

export interface JobLevelParameter {
  /** The name of the defined parameter. May only contain alphanumeric characters, `_`, `-`, and `.` */
  name?: string | undefined;
  /** Default value of the parameter. */
  default?: string | undefined;
}

/**
 * Write-only setting. Specifies the user or service principal that the job runs as. If not specified, the job runs as the user who created the job.
 *
 * Either `user_name` or `service_principal_name` should be specified. If not, an error is thrown.
 */
export interface JobRunAs {
  identity?:
    | {
        $case: 'userName';
        /** The email of an active workspace user. Non-admin users can only set this field to their own email. */
        userName: string;
      }
    | {
        $case: 'servicePrincipalName';
        /** Application ID of an active service principal. Setting this field requires the `servicePrincipal/user` role. */
        servicePrincipalName: string;
      }
    | {
        $case: 'groupName';
        /** Group name of an account group assigned to the workspace. Setting this field requires being a member of the group. */
        groupName: string;
      }
    | undefined;
}

export interface JobSettings {
  /** An optional name for the job. The maximum length is 4096 bytes in UTF-8 encoding. */
  name?: string | undefined;
  /** An optional description for the job. The maximum length is 27700 characters in UTF-8 encoding. */
  description?: string | undefined;
  /** An optional set of email addresses that is notified when runs of this job begin or complete as well as when this job is deleted. */
  emailNotifications?: JobEmailNotifications | undefined;
  /** A collection of system notification IDs to notify when runs of this job begin or complete. */
  webhookNotifications?: WebhookNotifications | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this job. */
  notificationSettings?: NotificationSettings | undefined;
  /** An optional timeout applied to each run of this job. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  health?: JobsHealthRules | undefined;
  /** An optional periodic schedule for this job. The default behavior is that the job only runs when triggered by clicking “Run Now” in the Jobs UI or sending an API request to `runNow`. */
  schedule?: CronSchedule | undefined;
  /** A configuration to trigger a run when certain conditions are met. The default behavior is that the job runs only when triggered by clicking “Run Now” in the Jobs UI or sending an API request to `runNow`. */
  trigger?: TriggerSettings | undefined;
  /** An optional continuous property for this job. The continuous property will ensure that there is always one run executing. Only one of `schedule` and `continuous` can be used. */
  continuous?: ContinuousSettings | undefined;
  /**
   * An optional maximum allowed number of concurrent runs of the job.
   * Set this value if you want to be able to execute multiple runs of the same job concurrently.
   * This is useful for example if you trigger your job on a frequent schedule and want to allow consecutive runs to overlap with each other, or if you want to trigger multiple runs which differ by their input parameters.
   * This setting affects only new runs. For example, suppose the job’s concurrency is 4 and there are 4 concurrent active runs. Then setting the concurrency to 3 won’t kill any of the active runs.
   * However, from then on, new runs are skipped unless there are fewer than 3 active runs.
   * This value cannot exceed 1000. Setting this value to `0` causes all new runs to be skipped.
   */
  maxConcurrentRuns?: number | undefined;
  /**
   * A list of task specifications to be executed by this job.
   * It supports up to 1000 elements in write endpoints (:method:jobs/create, :method:jobs/reset, :method:jobs/update, :method:jobs/submit).
   * Read endpoints return only 100 tasks. If more than 100 tasks are available, you can paginate through them using :method:jobs/get. Use the `next_page_token` field at the object root to determine if more results are available.
   */
  tasks?: TaskSettings[] | undefined;
  /** A list of job cluster specifications that can be shared and reused by tasks of this job. Libraries cannot be declared in a shared job cluster. You must declare dependent libraries in task settings. */
  jobClusters?: JobCluster[] | undefined;
  /**
   * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
   *
   * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
   *
   * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
   */
  gitSource?: GitSource | undefined;
  /** A map of tags associated with the job. These are forwarded to the cluster as cluster tags for jobs clusters, and are subject to the same limitations as cluster tags. A maximum of 25 tags can be added to the job. */
  tags?: Record<string, string> | undefined;
  /** Used to tell what is the format of the job. This field is ignored in Create/Update/Reset calls. When using the Jobs API 2.1 this value is always set to `"MULTI_TASK"`. */
  format?: Format | undefined;
  /** The queue settings of the job. */
  queue?: QueueSettings | undefined;
  /** Job-level parameter definitions */
  parameters?: JobLevelParameter[] | undefined;
  /**
   * The user or service principal that the job runs as, if specified in the request.
   * This field indicates the explicit configuration of `run_as` for the job.
   * To find the value in all cases, explicit or implicit, use `run_as_user_name`.
   */
  runAs?: JobRunAs | undefined;
  /**
   * Edit mode of the job.
   *
   * * `UI_LOCKED`: The job is in a locked UI state and cannot be modified.
   * * `EDITABLE`: The job is in an editable state and can be modified.
   */
  editMode?: JobEditMode | undefined;
  /** Deployment information for jobs managed by external sources. */
  deployment?: JobDeployment | undefined;
  /**
   * A list of task execution environment specifications that can be referenced by serverless tasks of this job.
   * For serverless notebook tasks, if the environment_key is not specified, the notebook environment will be used if present. If a jobs environment is specified, it will override the notebook environment.
   * For other serverless tasks, the task environment is required to be specified using environment_key in the task settings.
   */
  environments?: JobEnvironment[] | undefined;
  /**
   * The id of the user specified budget policy to use for this job.
   * If not specified, a default budget policy may be applied when creating or modifying the job.
   * See `effective_budget_policy_id` for the budget policy used by this workload.
   */
  budgetPolicyId?: string | undefined;
  /**
   * The id of the user specified usage policy to use for this job.
   * If not specified, a default usage policy may be applied when creating or modifying the job.
   * See `effective_usage_policy_id` for the usage policy used by this workload.
   */
  usagePolicyId?: string | undefined;
  /**
   * The performance mode on a serverless job. This field determines the level of compute performance or cost-efficiency for the run.
   * The performance target does not apply to tasks that run on Serverless GPU compute.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  performanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /** An optional maximum number of times to retry an unsuccessful run. A run is considered to be unsuccessful if it completes with the `FAILED` result_state or `INTERNAL_ERROR` `life_cycle_state`. The value `-1` means to retry indefinitely and the value `0` means to never retry. */
  maxRetries?: number | undefined;
  /** An optional minimal interval in milliseconds between the start of the failed run and the subsequent retry run. The default behavior is that unsuccessful runs are immediately retried. */
  minRetryIntervalMillis?: number | undefined;
  /**
   * An optional policy to specify whether to retry a job when it times out. The default behavior
   * is to not retry on timeout.
   */
  retryOnTimeout?: boolean | undefined;
  /** An option to disable auto optimization in serverless */
  disableAutoOptimization?: boolean | undefined;
}

/** The source of the job specification in the remote repository when the job is source controlled. */
export interface JobSource {
  /** Path of the job YAML file that contains the job specification. */
  jobConfigPath?: string | undefined;
  importFromGitReference?:
    | {
        $case: 'importFromGitBranch';
        /** Name of the branch which the job is imported from. */
        importFromGitBranch: string;
      }
    | undefined;
  /**
   * Dirty state indicates the job is not fully synced with the job specification in the remote repository.
   *
   * Possible values are:
   * * `NOT_SYNCED`: The job is not yet synced with the remote job specification. Import the remote job specification from UI to make the job fully synced.
   * * `DISCONNECTED`: The job is temporary disconnected from the remote job specification and is allowed for live edit. Import the remote job specification again from UI to make the job fully synced.
   */
  dirtyState?: JobSource_DirtyState | undefined;
}

export interface JobsHealthRule {
  metric?: JobsHealthMetric | undefined;
  op?: JobsHealthOperator | undefined;
  /** Specifies the threshold value that the health metric should obey to satisfy the health rule. */
  value?: bigint | undefined;
}

/** An optional set of health rules that can be defined for this job. */
export interface JobsHealthRules {
  rules?: JobsHealthRule[] | undefined;
}

export interface Library {
  lib?:
    | {
        $case: 'jar';
        /**
         * URI of the JAR library to install. Supported URIs include Workspace paths, Unity Catalog Volumes paths, and S3 URIs.
         * For example: `{ "jar": "/Workspace/path/to/library.jar" }`, `{ "jar" : "/Volumes/path/to/library.jar" }` or
         * `{ "jar": "s3://my-bucket/library.jar" }`.
         * If S3 is used, please make sure the cluster has read access on the library. You may need to
         * launch the cluster with an IAM role to access the S3 URI.
         */
        jar: string;
      }
    | {
        $case: 'egg';
        /** Deprecated. URI of the egg library to install. Installing Python egg files is deprecated and is not supported in Databricks Runtime 14.0 and above. */
        egg: string;
      }
    | {
        $case: 'pypi';
        /**
         * Specification of a PyPi library to be installed. For example:
         * `{ "package": "simplejson" }`
         */
        pypi: PythonPyPiLibrary;
      }
    | {
        $case: 'maven';
        /**
         * Specification of a maven library to be installed. For example:
         * `{ "coordinates": "org.jsoup:jsoup:1.7.2" }`
         */
        maven: MavenLibrary;
      }
    | {
        $case: 'cran';
        /** Specification of a CRAN library to be installed as part of the library */
        cran: RCranLibrary;
      }
    | {
        $case: 'whl';
        /**
         * URI of the wheel library to install. Supported URIs include Workspace paths, Unity Catalog Volumes paths, and S3 URIs.
         * For example: `{ "whl": "/Workspace/path/to/library.whl" }`, `{ "whl" : "/Volumes/path/to/library.whl" }` or
         * `{ "whl": "s3://my-bucket/library.whl" }`.
         * If S3 is used, please make sure the cluster has read access on the library. You may need to
         * launch the cluster with an IAM role to access the S3 URI.
         */
        whl: string;
      }
    | {
        $case: 'requirements';
        /**
         * URI of the requirements.txt file to install. Only Workspace paths and Unity Catalog Volumes paths are supported.
         * For example: `{ "requirements": "/Workspace/path/to/requirements.txt" }` or `{ "requirements" : "/Volumes/path/to/requirements.txt" }`
         */
        requirements: string;
      }
    | undefined;
}

export interface ListJobComplianceForPolicy {
  /** Canonical unique identifier for the cluster policy. */
  policyId?: string | undefined;
  /**
   * A page token that can be used to navigate to the next page or previous page as
   * returned by `next_page_token` or `prev_page_token`.
   */
  pageToken?: string | undefined;
  /**
   * Use this field to specify the maximum number of results to be returned by the server.
   * The server may further constrain the maximum number of results returned in a
   * single page.
   */
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListJobComplianceForPolicy_JobCompliance {
  /** Canonical unique identifier for a job. */
  jobId?: bigint | undefined;
  /** Whether this job is in compliance with the latest version of its policy. */
  isCompliant?: boolean | undefined;
  /**
   * An object containing key-value mappings representing the first 200 policy
   * validation errors.
   * The keys indicate the path where the policy validation error is occurring.
   * An identifier for the job cluster is prepended to the path.
   * The values indicate an error message describing the policy validation error.
   */
  violations?: Record<string, string> | undefined;
}

export interface ListJobComplianceResponse {
  /** A list of jobs and their policy compliance statuses. */
  jobs?: ListJobComplianceForPolicy_JobCompliance[] | undefined;
  /**
   * This field represents the pagination token to retrieve the next page of results.
   * If this field is not in the response, it means no further results for the request.
   */
  nextPageToken?: string | undefined;
  /**
   * This field represents the pagination token to retrieve the previous page of results.
   * If this field is not in the response, it means no further results for the request.
   */
  prevPageToken?: string | undefined;
}

/** Lists all jobs. */
export interface ListJobsRequest {
  /**
   * The offset of the first job to return, relative to the most recently created job.
   * Deprecated since June 2023. Use `page_token` to iterate through the pages instead.
   */
  offset?: number | undefined;
  /** The number of jobs to return. This value must be greater than 0 and less or equal to 100. The default value is 20. */
  limit?: number | undefined;
  /**
   * Whether to include task and cluster details in the response. Note that only the first 100 elements will be shown.
   * Use :method:jobs/get to paginate through all tasks and clusters.
   */
  expandTasks?: boolean | undefined;
  /** A filter on the list based on the exact (case insensitive) job name. */
  name?: string | undefined;
  /** Use `next_page_token` or `prev_page_token` returned from the previous request to list the next or previous page of jobs respectively. */
  pageToken?: string | undefined;
}

/** List of jobs was retrieved successfully. */
export interface ListJobsResponse {
  /** The list of jobs. Only included in the response if there are jobs to list. */
  jobs?: BaseJob[] | undefined;
  /** If true, additional jobs matching the provided filter are available for listing. */
  hasMore?: boolean | undefined;
  /** A token that can be used to list the next page of jobs (if applicable). */
  nextPageToken?: string | undefined;
  /** A token that can be used to list the previous page of jobs (if applicable). */
  prevPageToken?: string | undefined;
}

/** Lists runs from most recently started to least. */
export interface ListRunsRequest {
  /** The job for which to list runs. If omitted, the Jobs service lists runs from all jobs. */
  jobId?: bigint | undefined;
  stateConstraint?:
    | {
        $case: 'activeOnly';
        /**
         * If active_only is `true`, only active runs are included in the results; otherwise,
         * lists both active and completed runs. An active run is a run in the `QUEUED`, `PENDING`,
         * `RUNNING`, or `TERMINATING`. This field cannot be `true` when completed_only is `true`.
         */
        activeOnly: boolean;
      }
    | {
        $case: 'completedOnly';
        /**
         * If completed_only is `true`, only completed runs are included in the results;
         * otherwise, lists both active and completed runs. This field cannot be `true` when
         * active_only is `true`.
         */
        completedOnly: boolean;
      }
    | undefined;
  /**
   * The offset of the first run to return, relative to the most recent run.
   * Deprecated since June 2023. Use `page_token` to iterate through the pages instead.
   */
  offset?: number | undefined;
  /**
   * The number of runs to return. This value must be greater than 0 and less than 25.
   * The default value is 20. If a request specifies a limit of 0, the service instead
   * uses the maximum limit.
   */
  limit?: number | undefined;
  /** The type of runs to return. For a description of run types, see :method:jobs/getRun. */
  runType?: RunType | undefined;
  /**
   * Whether to include task and cluster details in the response. Note that only the first 100 elements will be shown.
   * Use :method:jobs/getrun to paginate through all tasks and clusters.
   */
  expandTasks?: boolean | undefined;
  /**
   * Show runs that started _at or after_ this value. The value must be a UTC timestamp
   * in milliseconds. Can be combined with _start_time_to_ to filter by a time range.
   */
  startTimeFrom?: bigint | undefined;
  /**
   * Show runs that started _at or before_ this value. The value must be a UTC timestamp
   * in milliseconds. Can be combined with _start_time_from_ to filter by a time range.
   */
  startTimeTo?: bigint | undefined;
  /** Use `next_page_token` or `prev_page_token` returned from the previous request to list the next or previous page of runs respectively. */
  pageToken?: string | undefined;
}

/** List of runs was retrieved successfully. */
export interface ListRunsResponse {
  /** A list of runs, from most recently started to least. Only included in the response if there are runs to list. */
  runs?: BaseRun[] | undefined;
  /** If true, additional runs matching the provided filter are available for listing. */
  hasMore?: boolean | undefined;
  /** A token that can be used to list the next page of runs (if applicable). */
  nextPageToken?: string | undefined;
  /** A token that can be used to list the previous page of runs (if applicable). */
  prevPageToken?: string | undefined;
}

export interface LocalFileInfo {
  /** local file destination, e.g. `file:/my/local/file.sh` */
  destination?: string | undefined;
}

export interface LogAnalyticsInfo {
  logAnalyticsWorkspaceId?: string | undefined;
  logAnalyticsPrimaryKey?: string | undefined;
}

export interface MavenLibrary {
  /** Gradle-style maven coordinates. For example: "org.jsoup:jsoup:1.7.2". */
  coordinates?: string | undefined;
  /**
   * Maven repo to install the Maven package from. If omitted, both Maven Central Repository
   * and Spark Packages are searched.
   */
  repo?: string | undefined;
  /**
   * List of dependences to exclude. For example: `["slf4j:slf4j", "*:hadoop-client"]`.
   *
   * Maven dependency exclusions:
   * https://maven.apache.org/guides/introduction/introduction-to-optional-and-excludes-dependencies.html.
   */
  exclusions?: string[] | undefined;
}

export interface ModelTriggerConfiguration {
  /**
   * Name of the securable to monitor ("mycatalog.myschema.mymodel" in the case of model-level triggers,
   * "mycatalog.myschema" in the case of schema-level triggers) or empty in the case of metastore-level triggers.
   */
  securableName?: string | undefined;
  /** Aliases of the model versions to monitor. Can only be used in conjunction with condition MODEL_ALIAS_SET. */
  aliases?: string[] | undefined;
  /** The condition based on which to trigger a job run. */
  condition?: ModelTriggerConfiguration_ModelTriggerCondition | undefined;
  /**
   * If set, the trigger starts a run only after the specified amount of time has passed since
   * the last time the trigger fired. The minimum allowed value is 60 seconds.
   */
  minTimeBetweenTriggersSeconds?: number | undefined;
  /**
   * If set, the trigger starts a run only after no model updates have occurred for the specified time
   * and can be used to wait for a series of model updates before triggering a run. The
   * minimum allowed value is 60 seconds.
   */
  waitAfterLastChangeSeconds?: number | undefined;
}

/** Configuration for flexible node types, allowing fallback to alternate node types during cluster launch and upscale. */
export interface NodeTypeFlexibility {
  /** A list of node type IDs to use as fallbacks when the primary node type is unavailable. */
  alternateNodeTypeIds?: string[] | undefined;
}

export interface NotebookTask {
  /**
   * The path of the notebook to be run in the <Databricks> workspace or remote repository.
   * For notebooks stored in the <Databricks> workspace, the path must be absolute and begin with a slash.
   * For notebooks stored in a remote repository, the path must be relative. This field is required.
   */
  notebookPath?: string | undefined;
  /**
   * Base parameters to be used for each run of this job. If the run is initiated by a call to :method:jobs/run
   * Now with parameters specified, the two parameters maps are merged. If the same key is specified in
   * `base_parameters` and in `run-now`, the value from `run-now` is used.
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   *
   * If the notebook takes a parameter that is not specified in the job’s `base_parameters` or the `run-now` override parameters,
   * the default value from the notebook is used.
   *
   * Retrieve these parameters in a notebook using [dbutils.widgets.get](/dev-tools/databricks-utils.html#dbutils-widgets).
   *
   * The JSON representation of this field cannot exceed 1MB.
   */
  baseParameters?: Record<string, string> | undefined;
  /**
   * Optional location type of the notebook. When set to `WORKSPACE`, the notebook will be retrieved from the local <Databricks> workspace. When set to `GIT`, the notebook will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   * * `WORKSPACE`: Notebook is located in <Databricks> workspace.
   * * `GIT`: Notebook is located in cloud Git provider.
   */
  source?: Source | undefined;
  /**
   * Optional `warehouse_id` to run the notebook on a SQL warehouse. Classic SQL warehouses are NOT supported, please use serverless or pro SQL warehouses.
   *
   * Note that SQL warehouses only support SQL cells; if the notebook contains non-SQL cells, the run will fail.
   */
  warehouseId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface NotebookTask_NotebookOutput {
  /**
   * The value passed to [dbutils.notebook.exit()](/notebooks/notebook-workflows.html#notebook-workflows-exit).
   * <Databricks> restricts this API to return the first 5 MB of the value. For a larger result, your job can store the results in a cloud storage service.
   * This field is absent if `dbutils.notebook.exit()` was never called.
   */
  result?: string | undefined;
  /** Whether or not the result was truncated. */
  truncated?: boolean | undefined;
}

export interface NotificationSettings {
  /** If true, do not send notifications to recipients specified in `on_failure` if the run is skipped. */
  noAlertForSkippedRuns?: boolean | undefined;
  /** If true, do not send notifications to recipients specified in `on_failure` if the run is canceled. */
  noAlertForCanceledRuns?: boolean | undefined;
  /** If true, do not send notifications to recipients specified in `on_start` for the retried runs and do not send notifications to recipients specified in `on_failure` until the last retry of the run. */
  alertOnLastAttempt?: boolean | undefined;
}

/** Stores the catalog name, schema name, and the output schema expiration time for the clean room run. */
export interface OutputSchemaInfo {
  catalogName?: string | undefined;
  schemaName?: string | undefined;
  /** The expiration time for the output schema as a Unix timestamp in milliseconds. */
  expirationTime?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PerformanceTarget {}

export interface PeriodicTriggerConfiguration {
  /** The interval at which the trigger should run. */
  interval?: number | undefined;
  /** The unit of time for the interval. */
  unit?: PeriodicTriggerConfiguration_TimeUnit | undefined;
}

export interface PipelineParameters {
  /** If true, triggers a full refresh on the spark declarative pipeline. */
  fullRefresh?: boolean | undefined;
  /** A list of tables to update without fullRefresh. */
  refreshSelection?: string[] | undefined;
  /** A list of tables to update with fullRefresh. */
  fullRefreshSelection?: string[] | undefined;
  /** A list of streaming flows to reset checkpoints without clearing data. */
  resetCheckpointSelection?: string[] | undefined;
  /**
   * Flow names to selectively refresh. These are unioned with other selective refresh
   * options (refresh_selection, full_refresh_selection) to determine the final set of flows to refresh.
   */
  refreshFlowSelection?: string[] | undefined;
}

export interface PipelineTask {
  /** The full name of the pipeline task to execute. */
  pipelineId?: string | undefined;
  /**
   * Key/value-map of parameters passed to the pipeline execution.
   * Limited to 10k characters in total.
   */
  pipelineTaskParameters?: Record<string, string> | undefined;
  /** If true, triggers a full refresh on the spark declarative pipeline. */
  fullRefresh?: boolean | undefined;
  /** A list of tables to update without fullRefresh. */
  refreshSelection?: string[] | undefined;
  /** A list of tables to update with fullRefresh. */
  fullRefreshSelection?: string[] | undefined;
  /** A list of streaming flows to reset checkpoints without clearing data. */
  resetCheckpointSelection?: string[] | undefined;
  /**
   * Flow names to selectively refresh. These are unioned with other selective refresh
   * options (refresh_selection, full_refresh_selection) to determine the final set of flows to refresh.
   */
  refreshFlowSelection?: string[] | undefined;
}

export interface PowerBiModel {
  /** The name of the Power BI workspace of the model */
  workspaceName?: string | undefined;
  /** The name of the Power BI model */
  modelName?: string | undefined;
  /** The default storage mode of the Power BI model */
  storageMode?: StorageMode | undefined;
  /** How the published Power BI model authenticates to <Databricks> */
  authenticationMethod?: AuthenticationMethod | undefined;
  /** Whether to overwrite existing Power BI models */
  overwriteExisting?: boolean | undefined;
}

export interface PowerBiTable {
  /** The table name in <Databricks> */
  name?: string | undefined;
  /** The catalog name in <Databricks> */
  catalog?: string | undefined;
  /** The schema name in <Databricks> */
  schema?: string | undefined;
  /** The Power BI storage mode of the table */
  storageMode?: StorageMode | undefined;
}

export interface PowerBiTask {
  /** The tables to be exported to Power BI */
  tables?: PowerBiTable[] | undefined;
  /** The SQL warehouse ID to use as the Power BI data source */
  warehouseId?: string | undefined;
  /** The semantic model to update */
  powerBiModel?: PowerBiModel | undefined;
  /** The resource name of the UC connection to authenticate from <Databricks> to Power BI */
  connectionResourceName?: string | undefined;
  /** Whether the model should be refreshed after the update */
  refreshAfterUpdate?: boolean | undefined;
}

export interface PythonOperatorTask {
  /**
   * An ordered list of task parameters.
   * TODO(JOBS-30885): Add limits for parameters.
   */
  parameters?: PythonOperatorTask_Parameter[] | undefined;
  /**
   * Fully qualified name of the main class or function.
   * For example, `my_project.my_function` or `my_project.MyOperator`.
   */
  main?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PythonOperatorTask_CreateParameter {
  name?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PythonOperatorTask_Parameter {
  name?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PythonOperatorTask_UpdateParameter {
  name?: string | undefined;
  value?: string | undefined;
}

export interface PythonPyPiLibrary {
  /**
   * The name of the pypi package to install. An optional exact version specification is also
   * supported. Examples: "simplejson" and "simplejson==3.8.0".
   */
  package?: string | undefined;
  /**
   * The repository where the package can be found. If not specified, the default pip index is
   * used.
   */
  repo?: string | undefined;
}

export interface PythonWheelTask {
  /** Name of the package to execute */
  packageName?: string | undefined;
  /** Named entry point to use, if it does not exist in the metadata of the package it executes the function from the package directly using `$packageName.$entryPoint()` */
  entryPoint?: string | undefined;
  /** Command-line parameters passed to Python wheel task. Leave it empty if `named_parameters` is not null. */
  parameters?: string[] | undefined;
  /** Command-line parameters passed to Python wheel task in the form of `["--name=task", "--data=dbfs:/path/to/data.json"]`. Leave it empty if `parameters` is not null. */
  namedParameters?: Record<string, string> | undefined;
}

export interface QueueDetails {
  code?: QueueDetailsCode_Code | undefined;
  /**
   * A descriptive message with the queuing details. This field is unstructured, and its exact format is subject
   * to change.
   */
  message?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface QueueDetailsCode {}

export interface QueueSettings {
  /** If true, enable queueing for the job. This is a required field. */
  enabled?: boolean | undefined;
}

export interface RCranLibrary {
  /** The name of the CRAN package to install. */
  package?: string | undefined;
  /** The repository where the package can be found. If not specified, the default CRAN repo is used. */
  repo?: string | undefined;
}

export interface Repair {
  /** The repair history item type. Indicates whether a run is the original run or a repair run. */
  type?: RepairType | undefined;
  /** The start time of the (repaired) run. */
  startTime?: bigint | undefined;
  /** The end time of the (repaired) run. */
  endTime?: bigint | undefined;
  /** Deprecated. Please use the `status` field instead. */
  state?: RunState | undefined;
  /** The ID of the repair. Only returned for the items that represent a repair in `repair_history`. */
  id?: bigint | undefined;
  /** The run IDs of the task runs that ran as part of this repair history item. */
  taskRunIds?: bigint[] | undefined;
  status?: RunStatus | undefined;
  /**
   * The actual performance target used by the serverless run during execution. This can differ from the client-set performance target on the request depending on whether the performance mode is supported by the job type.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  effectivePerformanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
}

export interface RepairRunRequest {
  /** The job run ID of the run to repair. The run must not be in progress. */
  runId?: bigint | undefined;
  /** The ID of the latest repair. This parameter is not required when repairing a run for the first time, but must be provided on subsequent requests to repair the same run. */
  latestRepairId?: bigint | undefined;
  /** The task keys of the task runs to repair. */
  rerunTasks?: string[] | undefined;
  /** Job-level parameters used in the run. for example `"param": "overriding_val"` */
  jobParameters?: Record<string, string> | undefined;
  /** If true, repair all failed tasks. Only one of `rerun_tasks` or `rerun_all_failed_tasks` can be used. */
  rerunAllFailedTasks?: boolean | undefined;
  /** If true, repair all tasks that depend on the tasks in `rerun_tasks`, even if they were previously successful. Can be also used in combination with `rerun_all_failed_tasks`. */
  rerunDependentTasks?: boolean | undefined;
  /**
   * The performance mode on a serverless job. The performance target determines the level of compute performance or cost-efficiency for the run. This field overrides the performance target defined on the job level.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  performanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /** Controls whether the pipeline should perform a full refresh */
  pipelineParams?: CreatePipelineParameters | undefined;
  /**
   * A list of parameters for jobs with Spark JAR tasks, for example `"jar_params": ["john doe", "35"]`.
   * The parameters are used to invoke the main function of the main class specified in the Spark JAR task.
   * If not specified upon `run-now`, it defaults to an empty list.
   * jar_params cannot be specified in conjunction with notebook_params.
   * The JSON representation of this field (for example `{"jar_params":["john doe","35"]}`) cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  jarParams?: string[] | undefined;
  /**
   * A map from keys to values for jobs with notebook task, for example `"notebook_params": {"name": "john doe", "age": "35"}`.
   * The map is passed to the notebook and is accessible through the [dbutils.widgets.get](/dev-tools/databricks-utils.html) function.
   *
   * If not specified upon `run-now`, the triggered run uses the job’s base parameters.
   *
   * notebook_params cannot be specified in conjunction with jar_params.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * The JSON representation of this field (for example `{"notebook_params":{"name":"john doe","age":"35"}}`) cannot exceed 10,000 bytes.
   */
  notebookParams?: Record<string, string> | undefined;
  /**
   * A list of parameters for jobs with Python tasks, for example `"python_params": ["john doe", "35"]`.
   * The parameters are passed to Python file as command-line parameters. If specified upon `run-now`, it would overwrite
   * the parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  pythonParams?: string[] | undefined;
  /**
   * A list of parameters for jobs with spark submit task, for example `"spark_submit_params": ["--class", "org.apache.spark.examples.SparkPi"]`.
   * The parameters are passed to spark-submit script as command-line parameters. If specified upon `run-now`, it would overwrite the
   * parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  sparkSubmitParams?: string[] | undefined;
  pythonNamedParams?: Record<string, string> | undefined;
  /**
   * A map from keys to values for jobs with SQL task, for example `"sql_params": {"name": "john doe", "age": "35"}`. The SQL alert task does not support custom parameters.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  sqlParams?: Record<string, string> | undefined;
  /**
   * An array of commands to execute for jobs with the dbt task, for example `"dbt_commands": ["dbt deps", "dbt seed", "dbt deps", "dbt seed", "dbt run"]`
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  dbtCommands?: string[] | undefined;
}

/** Run repair was initiated. */
export interface RepairRunResponse {
  /** The ID of the repair. Must be provided in subsequent repairs using the `latest_repair_id` field to ensure sequential repairs. */
  repairId?: bigint | undefined;
}

export interface ResetJobRequest {
  /** The canonical identifier of the job to reset. This field is required. */
  jobId: bigint;
  /**
   * The new settings of the job. These settings completely replace the old settings.
   *
   * Changes to the field `JobBaseSettings.timeout_seconds` are applied to active runs. Changes to other fields are applied to future runs only.
   */
  newSettings: CreateJobSettings;
}

/** Job was overwritten successfully. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResetJobResponse {}

export interface ResolvedValues {
  resolved?:
    | {
        $case: 'notebookTask';
        notebookTask: ResolvedValues_NotebookTaskResolvedValues;
      }
    | {
        $case: 'sparkJarTask';
        sparkJarTask: ResolvedValues_SparkJarTaskResolvedValues;
      }
    | {
        $case: 'sparkPythonTask';
        sparkPythonTask: ResolvedValues_SparkPythonTaskResolvedValues;
      }
    | {
        $case: 'sparkSubmitTask';
        sparkSubmitTask: ResolvedValues_SparkSubmitTaskResolvedValues;
      }
    | {
        $case: 'pythonWheelTask';
        pythonWheelTask: ResolvedValues_PythonWheelTaskResolvedValues;
      }
    | {$case: 'dbtTask'; dbtTask: ResolvedValues_DbtTaskResolvedValues}
    | {$case: 'sqlTask'; sqlTask: ResolvedValues_SqlTaskResolvedValues}
    | {$case: 'runJobTask'; runJobTask: ResolvedValues_RunJobTaskResolvedValues}
    | {
        $case: 'conditionTask';
        conditionTask: ResolvedValues_ConditionTaskResolvedValues;
      }
    | {
        $case: 'simulationTask';
        simulationTask: ResolvedValues_SimulationTaskResolvedValues;
      }
    | {
        $case: 'pipelineTask';
        pipelineTask: ResolvedValues_PipelineTaskResolvedValues;
      }
    | {
        $case: 'aiRuntimeTask';
        /**
         * Resolved values for an AI Runtime task — env_vars with
         * `{{tasks.<key>.values.<name>}}` references substituted to concrete
         * values before submission to the training service.
         */
        aiRuntimeTask: ResolvedValues_AiRuntimeTaskResolvedValues;
      }
    | undefined;
}

/**
 * Resolved env_vars for an AiRuntimeTask after dynamic-value substitution.
 * Mirrors the task's `resolved_parameters_field` (env_vars) so Jobs can
 * expand `{{tasks.<key>.values.<name>}}` references before submission.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface ResolvedValues_AiRuntimeTaskResolvedValues {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ResolvedValues_ConditionTaskResolvedValues {
  left?: string | undefined;
  right?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ResolvedValues_DbtTaskResolvedValues {
  commands?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ResolvedValues_NotebookTaskResolvedValues {
  baseParameters?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ResolvedValues_PipelineTaskResolvedValues {
  /**
   * Key/value-map of parameters passed to the pipeline execution.
   * Limited to 10k characters in total.
   */
  pipelineTaskParameters?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ResolvedValues_PythonWheelTaskResolvedValues {
  parameters?: string[] | undefined;
  namedParameters?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ResolvedValues_RunJobTaskResolvedValues {
  parameters?: Record<string, string> | undefined;
  jobParameters?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ResolvedValues_SimulationTaskResolvedValues {
  parameters?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ResolvedValues_SparkJarTaskResolvedValues {
  parameters?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface ResolvedValues_SparkPythonTaskResolvedValues {}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface ResolvedValues_SparkSubmitTaskResolvedValues {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ResolvedValues_SqlTaskResolvedValues {
  parameters?: Record<string, string> | undefined;
}

export interface Run {
  /** The canonical identifier of the job that contains this run. */
  jobId?: bigint | undefined;
  /** The canonical identifier of the run. This ID is unique across all runs of all jobs. */
  runId?: bigint | undefined;
  /** The creator user name. This field won’t be included in the response if the user has already been deleted. */
  creatorUserName?: string | undefined;
  /** A unique identifier for this job run. This is set to the same value as `run_id`. */
  numberInJob?: bigint | undefined;
  /** If this run is a retry of a prior run attempt, this field contains the run_id of the original attempt; otherwise, it is the same as the run_id. */
  originalAttemptRunId?: bigint | undefined;
  /** Deprecated. Please use the `status` field instead. */
  state?: RunState | undefined;
  /** The cron schedule that triggered this run if it was triggered by the periodic scheduler. */
  schedule?: CronSchedule | undefined;
  /** A snapshot of the job’s cluster specification when this run was created. */
  clusterSpec?: ClusterSpec | undefined;
  /** The cluster used for this run. If the run is specified to use a new cluster, this field is set once the Jobs service has requested a cluster for the run. */
  clusterInstance?: ClusterInstance | undefined;
  /** Job-level parameters used in the run */
  jobParameters?: Run_JobLevelParameters[] | undefined;
  /** The parameters used for this run. */
  overridingParameters?: RunParameters | undefined;
  trigger?: TriggerType | undefined;
  triggerInfo?: RunTriggerInfo | undefined;
  /** An optional name for the run. The maximum length is 4096 bytes in UTF-8 encoding. */
  runName?: string | undefined;
  /** The URL to the detail page of the run. */
  runPageUrl?: string | undefined;
  runType?: RunType | undefined;
  /**
   * The list of tasks performed by the run. Each task has its own `run_id` which you can use to call `JobsGetOutput` to retrieve the run results.
   * If more than 100 tasks are available, you can paginate through them using :method:jobs/getrun. Use the `next_page_token` field at the object root to determine if more results are available.
   */
  tasks?: RunTask[] | undefined;
  /** Description of the run */
  description?: string | undefined;
  /** The sequence number of this run attempt for a triggered job run. The initial attempt of a run has an attempt_number of 0. If the initial run attempt fails, and the job has a retry policy (`max_retries` > 0), subsequent runs are created with an `original_attempt_run_id` of the original attempt’s ID and an incrementing `attempt_number`. Runs are retried only until they succeed, and the maximum `attempt_number` is the same as the `max_retries` value for the job. */
  attemptNumber?: number | undefined;
  /**
   * A list of job cluster specifications that can be shared and reused by tasks of this job. Libraries cannot be declared in a shared job cluster. You must declare dependent libraries in task settings.
   * If more than 100 job clusters are available, you can paginate through them using :method:jobs/getrun.
   */
  jobClusters?: JobCluster[] | undefined;
  /**
   * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
   *
   * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
   *
   * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
   */
  gitSource?: GitSource | undefined;
  /** The repair history of the run. */
  repairHistory?: Repair[] | undefined;
  status?: RunStatus | undefined;
  /**
   * ID of the job run that this run belongs to.
   * For legacy and single-task job runs the field is populated with the job run ID.
   * For task runs, the field is populated with the ID of the job run that the task run belongs to.
   */
  jobRunId?: bigint | undefined;
  /**
   * Indicates if the run has more array properties (`tasks`, `job_clusters`) that are not shown. They can be accessed via :method:jobs/getrun endpoint.
   * It is only relevant for API 2.2 :method:jobs/listruns requests with `expand_tasks=true`.
   */
  hasMore?: boolean | undefined;
  /**
   * The actual performance target used by the serverless run during execution. This can differ from the client-set performance target on the request depending on whether the performance mode is supported by the job type.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  effectivePerformanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /** The id of the usage policy used by this run for cost attribution purposes. */
  effectiveUsagePolicyId?: string | undefined;
  /** The time at which this run was started in epoch milliseconds (milliseconds since 1/1/1970 UTC). This may not be the time when the job task starts executing, for example, if the job is scheduled to run on a new cluster, this is the time the cluster creation call is issued. */
  startTime?: bigint | undefined;
  /** The time in milliseconds it took to set up the cluster. For runs that run on new clusters this is the cluster creation time, for runs that run on existing clusters this time should be very short. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the `cleanup_duration`. The `setup_duration` field is set to 0 for multitask job runs. The total duration of a multitask job run is the value of the `run_duration` field. */
  setupDuration?: bigint | undefined;
  /** The time in milliseconds it took to execute the commands in the JAR or notebook until they  completed, failed, timed out, were cancelled, or encountered an unexpected error. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the  `cleanup_duration`. The `execution_duration` field is set to 0 for multitask job runs. The total  duration of a multitask job run is the value of the `run_duration` field. */
  executionDuration?: bigint | undefined;
  /** The time in milliseconds it took to terminate the cluster and clean up any associated artifacts. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the `cleanup_duration`. The `cleanup_duration` field is set to 0 for multitask job runs. The total duration of a multitask job run is the value of the `run_duration` field. */
  cleanupDuration?: bigint | undefined;
  /** The time at which this run ended in epoch milliseconds (milliseconds since 1/1/1970 UTC). This field is set to 0 if the job is still running. */
  endTime?: bigint | undefined;
  /** The time in milliseconds it took the job run and all of its repairs to finish. */
  runDuration?: bigint | undefined;
  /** The time in milliseconds that the run has spent in the queue. */
  queueDuration?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Run_JobLevelParameters {
  /** The name of the parameter */
  name?: string | undefined;
  /** The optional default value of the parameter */
  default?: string | undefined;
  /** The value used in the run */
  value?: string | undefined;
}

export interface RunJobTask {
  /** ID of the job to trigger. */
  jobId?: bigint | undefined;
  /** Job-level parameters used to trigger the job. */
  jobParameters?: Record<string, string> | undefined;
  /** Controls whether the pipeline should perform a full refresh */
  pipelineParams?: PipelineParameters | undefined;
  /**
   * A list of parameters for jobs with Spark JAR tasks, for example `"jar_params": ["john doe", "35"]`.
   * The parameters are used to invoke the main function of the main class specified in the Spark JAR task.
   * If not specified upon `run-now`, it defaults to an empty list.
   * jar_params cannot be specified in conjunction with notebook_params.
   * The JSON representation of this field (for example `{"jar_params":["john doe","35"]}`) cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  jarParams?: string[] | undefined;
  /**
   * A map from keys to values for jobs with notebook task, for example `"notebook_params": {"name": "john doe", "age": "35"}`.
   * The map is passed to the notebook and is accessible through the [dbutils.widgets.get](/dev-tools/databricks-utils.html) function.
   *
   * If not specified upon `run-now`, the triggered run uses the job’s base parameters.
   *
   * notebook_params cannot be specified in conjunction with jar_params.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * The JSON representation of this field (for example `{"notebook_params":{"name":"john doe","age":"35"}}`) cannot exceed 10,000 bytes.
   */
  notebookParams?: Record<string, string> | undefined;
  /**
   * A list of parameters for jobs with Python tasks, for example `"python_params": ["john doe", "35"]`.
   * The parameters are passed to Python file as command-line parameters. If specified upon `run-now`, it would overwrite
   * the parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  pythonParams?: string[] | undefined;
  /**
   * A list of parameters for jobs with spark submit task, for example `"spark_submit_params": ["--class", "org.apache.spark.examples.SparkPi"]`.
   * The parameters are passed to spark-submit script as command-line parameters. If specified upon `run-now`, it would overwrite the
   * parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  sparkSubmitParams?: string[] | undefined;
  pythonNamedParams?: Record<string, string> | undefined;
  /**
   * A map from keys to values for jobs with SQL task, for example `"sql_params": {"name": "john doe", "age": "35"}`. The SQL alert task does not support custom parameters.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  sqlParams?: Record<string, string> | undefined;
  /**
   * An array of commands to execute for jobs with the dbt task, for example `"dbt_commands": ["dbt deps", "dbt seed", "dbt deps", "dbt seed", "dbt run"]`
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  dbtCommands?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface RunJobTask_RunJobTaskOutput {
  /** The run id of the triggered job run */
  runId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RunLifeCycleState {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RunLifecycleStateV2 {}

export interface RunNowRequest {
  /** The ID of the job to be executed */
  jobId: bigint;
  /** Job-level parameters used in the run. for example `"param": "overriding_val"` */
  jobParameters?: Record<string, string> | undefined;
  /**
   * An optional token to guarantee the idempotency of job run requests. If a run with the provided token already exists,
   * the request does not create a new run but returns the ID of the existing run instead. If a run with the provided token is deleted,
   * an error is returned.
   *
   * If you specify the idempotency token, upon failure you can retry until the request succeeds. <Databricks> guarantees that exactly one run
   * is launched with that idempotency token.
   *
   * This token must have at most 64 characters.
   *
   * For more information, see [How to ensure idempotency for jobs](https://kb.databricks.com/jobs/jobs-idempotency.html).
   */
  idempotencyToken?: string | undefined;
  /** The queue settings of the run. */
  queue?: CreateQueueSettings | undefined;
  /** A list of task keys to run inside of the job. If this field is not provided, all tasks in the job will be run. */
  only?: string[] | undefined;
  /**
   * The performance mode on a serverless job. The performance target determines the level of compute performance or cost-efficiency for the run. This field overrides the performance target defined on the job level.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  performanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /** Controls whether the pipeline should perform a full refresh */
  pipelineParams?: CreatePipelineParameters | undefined;
  /**
   * A list of parameters for jobs with Spark JAR tasks, for example `"jar_params": ["john doe", "35"]`.
   * The parameters are used to invoke the main function of the main class specified in the Spark JAR task.
   * If not specified upon `run-now`, it defaults to an empty list.
   * jar_params cannot be specified in conjunction with notebook_params.
   * The JSON representation of this field (for example `{"jar_params":["john doe","35"]}`) cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  jarParams?: string[] | undefined;
  /**
   * A map from keys to values for jobs with notebook task, for example `"notebook_params": {"name": "john doe", "age": "35"}`.
   * The map is passed to the notebook and is accessible through the [dbutils.widgets.get](/dev-tools/databricks-utils.html) function.
   *
   * If not specified upon `run-now`, the triggered run uses the job’s base parameters.
   *
   * notebook_params cannot be specified in conjunction with jar_params.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * The JSON representation of this field (for example `{"notebook_params":{"name":"john doe","age":"35"}}`) cannot exceed 10,000 bytes.
   */
  notebookParams?: Record<string, string> | undefined;
  /**
   * A list of parameters for jobs with Python tasks, for example `"python_params": ["john doe", "35"]`.
   * The parameters are passed to Python file as command-line parameters. If specified upon `run-now`, it would overwrite
   * the parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  pythonParams?: string[] | undefined;
  /**
   * A list of parameters for jobs with spark submit task, for example `"spark_submit_params": ["--class", "org.apache.spark.examples.SparkPi"]`.
   * The parameters are passed to spark-submit script as command-line parameters. If specified upon `run-now`, it would overwrite the
   * parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  sparkSubmitParams?: string[] | undefined;
  pythonNamedParams?: Record<string, string> | undefined;
  /**
   * A map from keys to values for jobs with SQL task, for example `"sql_params": {"name": "john doe", "age": "35"}`. The SQL alert task does not support custom parameters.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  sqlParams?: Record<string, string> | undefined;
  /**
   * An array of commands to execute for jobs with the dbt task, for example `"dbt_commands": ["dbt deps", "dbt seed", "dbt deps", "dbt seed", "dbt run"]`
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  dbtCommands?: string[] | undefined;
}

/** Run was started successfully. */
export interface RunNowResponse {
  /** The globally unique ID of the newly triggered run. */
  runId?: bigint | undefined;
  /** A unique identifier for this job run. This is set to the same value as `run_id`. */
  numberInJob?: bigint | undefined;
}

export interface RunParameters {
  /** Controls whether the pipeline should perform a full refresh */
  pipelineParams?: PipelineParameters | undefined;
  /**
   * A list of parameters for jobs with Spark JAR tasks, for example `"jar_params": ["john doe", "35"]`.
   * The parameters are used to invoke the main function of the main class specified in the Spark JAR task.
   * If not specified upon `run-now`, it defaults to an empty list.
   * jar_params cannot be specified in conjunction with notebook_params.
   * The JSON representation of this field (for example `{"jar_params":["john doe","35"]}`) cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  jarParams?: string[] | undefined;
  /**
   * A map from keys to values for jobs with notebook task, for example `"notebook_params": {"name": "john doe", "age": "35"}`.
   * The map is passed to the notebook and is accessible through the [dbutils.widgets.get](/dev-tools/databricks-utils.html) function.
   *
   * If not specified upon `run-now`, the triggered run uses the job’s base parameters.
   *
   * notebook_params cannot be specified in conjunction with jar_params.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * The JSON representation of this field (for example `{"notebook_params":{"name":"john doe","age":"35"}}`) cannot exceed 10,000 bytes.
   */
  notebookParams?: Record<string, string> | undefined;
  /**
   * A list of parameters for jobs with Python tasks, for example `"python_params": ["john doe", "35"]`.
   * The parameters are passed to Python file as command-line parameters. If specified upon `run-now`, it would overwrite
   * the parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  pythonParams?: string[] | undefined;
  /**
   * A list of parameters for jobs with spark submit task, for example `"spark_submit_params": ["--class", "org.apache.spark.examples.SparkPi"]`.
   * The parameters are passed to spark-submit script as command-line parameters. If specified upon `run-now`, it would overwrite the
   * parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  sparkSubmitParams?: string[] | undefined;
  pythonNamedParams?: Record<string, string> | undefined;
  /**
   * A map from keys to values for jobs with SQL task, for example `"sql_params": {"name": "john doe", "age": "35"}`. The SQL alert task does not support custom parameters.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  sqlParams?: Record<string, string> | undefined;
  /**
   * An array of commands to execute for jobs with the dbt task, for example `"dbt_commands": ["dbt deps", "dbt seed", "dbt deps", "dbt seed", "dbt run"]`
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  dbtCommands?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RunResultState {}

/** The current state of the run. */
export interface RunState {
  /** A value indicating the run's current lifecycle state. This field is always available in the response. Note: Additional states might be introduced in future releases. */
  lifeCycleState?: RunLifeCycleState_RunLifeCycleState | undefined;
  /** A value indicating the run's result. This field is only available for terminal lifecycle states. Note: Additional states might be introduced in future releases. */
  resultState?: RunResultState_RunResultState | undefined;
  /** A descriptive message for the current state. This field is unstructured, and its exact format is subject to change. */
  stateMessage?: string | undefined;
  /** A value indicating whether a run was canceled manually by a user or by the scheduler because the run timed out. */
  userCancelledOrTimedout?: boolean | undefined;
  /** The reason indicating why the run was queued. */
  queueReason?: string | undefined;
}

/** The current status of the run */
export interface RunStatus {
  state?: RunLifecycleStateV2_State | undefined;
  /** If the run is in a TERMINATING or TERMINATED state, details about the reason for terminating the run. */
  terminationDetails?: TerminationDetails | undefined;
  /** If the run was queued, details about the reason for queuing the run. */
  queueDetails?: QueueDetails | undefined;
}

/** Used when outputting a child run, in GetRun or ListRuns. */
export interface RunTask {
  /** The ID of the task run. */
  runId?: bigint | undefined;
  /** Deprecated. Please use the `status` field instead. */
  state?: RunState | undefined;
  runPageUrl?: string | undefined;
  /** The cluster used for this run. If the run is specified to use a new cluster, this field is set once the Jobs service has requested a cluster for the run. */
  clusterInstance?: ClusterInstance | undefined;
  /** The sequence number of this run attempt for a triggered job run. The initial attempt of a run has an attempt_number of 0. If the initial run attempt fails, and the job has a retry policy (`max_retries` > 0), subsequent runs are created with an `original_attempt_run_id` of the original attempt’s ID and an incrementing `attempt_number`. Runs are retried only until they succeed, and the maximum `attempt_number` is the same as the `max_retries` value for the job. */
  attemptNumber?: number | undefined;
  /** An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.  If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.  Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job. */
  gitSource?: GitSource | undefined;
  /** Parameter values including resolved references */
  resolvedValues?: ResolvedValues | undefined;
  status?: RunStatus | undefined;
  /**
   * The actual performance target used by the serverless run during execution. This can differ from the client-set performance target on the request depending on whether the performance mode is supported by the job type.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  effectivePerformanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /**
   * A unique name for the task. This field is used to refer to this task from other tasks.
   * This field is required and must be unique within its parent job.
   * On Update or Reset, this field is used to reference the tasks to be updated or reset.
   */
  taskKey?: string | undefined;
  /** An optional description for this task. */
  description?: string | undefined;
  /**
   * An optional array of objects specifying the dependency graph of the task. All tasks specified in this field must complete successfully before executing this task.
   * The key is `task_key`, and the value is the name assigned to the dependent task.
   */
  dependsOn?: TaskDependency[] | undefined;
  /** An optional value indicating the condition that determines whether the task should be run once its dependencies have been completed. When omitted, defaults to `ALL_SUCCESS`. See :method:jobs/create for a list of possible values. */
  runIf?: TaskDependencyType | undefined;
  /** An optional timeout applied to each run of this job task. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  /** An optional set of email addresses notified when the task run begins or completes. The default behavior is to not send any emails. */
  emailNotifications?: JobEmailNotifications | undefined;
  health?: JobsHealthRules | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this task run. */
  notificationSettings?: NotificationSettings | undefined;
  /** A collection of system notification IDs to notify when the run begins or completes. The default behavior is to not send any system notifications. Task webhooks respect the task notification settings. */
  webhookNotifications?: WebhookNotifications | undefined;
  environmentRef?:
    | {
        $case: 'environmentKey';
        /** The key that references an environment spec in a job. This field is required for Python script, Python wheel and dbt tasks when using serverless compute. */
        environmentKey: string;
      }
    | undefined;
  /** An optional flag to disable the task. If set to true, the task will not run even if it is part of a job. */
  disabled?: boolean | undefined;
  /** DO NOT ADD ANY NEW FIELDS TO JobTask OUTSIDE OF THIS ONEOF as it will break the TaskRegistry */
  task?:
    | {
        $case: 'notebookTask';
        /** The task runs a notebook when the `notebook_task` field is present. */
        notebookTask: NotebookTask;
      }
    | {
        $case: 'sparkJarTask';
        /** The task runs a JAR when the `spark_jar_task` field is present. */
        sparkJarTask: SparkJarTask;
      }
    | {
        $case: 'sparkPythonTask';
        /** The task runs a Python file when the `spark_python_task` field is present. */
        sparkPythonTask: SparkPythonTask;
      }
    | {
        $case: 'sparkSubmitTask';
        /** (Legacy) The task runs the spark-submit script when the spark_submit_task field is present. Databricks recommends using the spark_jar_task instead; see [Spark Submit task for jobs](/jobs/spark-submit). */
        sparkSubmitTask: SparkSubmitTask;
      }
    | {
        $case: 'pipelineTask';
        /** The task triggers a pipeline update when the `pipeline_task` field is present. Only pipelines configured to use triggered more are supported. */
        pipelineTask: PipelineTask;
      }
    | {
        $case: 'pythonWheelTask';
        /** The task runs a Python wheel when the `python_wheel_task` field is present. */
        pythonWheelTask: PythonWheelTask;
      }
    | {
        $case: 'dbtTask';
        /** The task runs one or more dbt commands when the `dbt_task` field is present. The dbt task requires both Databricks SQL and the ability to use a serverless or a pro SQL warehouse. */
        dbtTask: DbtTask;
      }
    | {
        $case: 'sqlTask';
        /** The task runs a SQL query or file, or it refreshes a SQL alert or a legacy SQL dashboard when the `sql_task` field is present. */
        sqlTask: SqlTask;
      }
    | {
        $case: 'runJobTask';
        /** The task triggers another job when the `run_job_task` field is present. */
        runJobTask: RunJobTask;
      }
    | {
        $case: 'conditionTask';
        /**
         * The task evaluates a condition that can be used to control the execution of other tasks when the `condition_task` field is present.
         * The condition task does not require a cluster to execute and does not support retries or notifications.
         */
        conditionTask: ConditionTask;
      }
    | {
        $case: 'forEachTask';
        /** The task executes a nested task for every input provided when the `for_each_task` field is present. */
        forEachTask: ForEachTask;
      }
    | {
        $case: 'cleanRoomsNotebookTask';
        /**
         * The task runs a [clean rooms](/clean-rooms/index.html) notebook
         * when the `clean_rooms_notebook_task` field is present.
         */
        cleanRoomsNotebookTask: CleanRoomsNotebookTask;
      }
    | {$case: 'genAiComputeTask'; genAiComputeTask: GenAiComputeTask}
    | {
        $case: 'alertTask';
        /**
         * The task evaluates a <Databricks> alert and sends notifications to subscribers
         * when the `alert_task` field is present.
         */
        alertTask: AlertTask;
      }
    | {
        $case: 'powerBiTask';
        /** The task triggers a Power BI semantic model update when the `power_bi_task` field is present. */
        powerBiTask: PowerBiTask;
      }
    | {
        $case: 'dashboardTask';
        /** The task refreshes a dashboard and sends a snapshot to subscribers. */
        dashboardTask: DashboardTask;
      }
    | {
        $case: 'dbtCloudTask';
        /** Task type for dbt cloud, deprecated in favor of the new name dbt_platform_task */
        dbtCloudTask: DbtCloudTask;
      }
    | {$case: 'dbtPlatformTask'; dbtPlatformTask: DbtPlatformTask}
    | {
        $case: 'pythonOperatorTask';
        /** The task runs a Python operator task. */
        pythonOperatorTask: PythonOperatorTask;
      }
    | {
        $case: 'aiRuntimeTask';
        /**
         * The task runs a multi-node GPU compute workload on Databricks AI Runtime.
         * External-facing surface; mirrors the AIR CLI (fka SGCLI) v2 YAML schema.
         */
        aiRuntimeTask: AiRuntimeTask;
      }
    | undefined;
  spec?:
    | {
        $case: 'existingClusterId';
        /**
         * If existing_cluster_id, the ID of an existing cluster that is used for all runs.
         * When running jobs or tasks on an existing cluster, you may need to manually restart
         * the cluster if it stops responding. We suggest running jobs and tasks on new clusters for
         * greater reliability
         */
        existingClusterId: string;
      }
    | {
        $case: 'newCluster';
        /** If new_cluster, a description of a new cluster that is created for each run. */
        newCluster: ClusterSpec_NewCluster;
      }
    | {
        $case: 'jobClusterKey';
        /** If job_cluster_key, this task is executed reusing the cluster specified in `job.settings.job_clusters`. */
        jobClusterKey: string;
      }
    | undefined;
  /**
   * An optional list of libraries to be installed on the cluster.
   * The default value is an empty list.
   */
  libraries?: Library[] | undefined;
  /** An optional maximum number of times to retry an unsuccessful run. A run is considered to be unsuccessful if it completes with the `FAILED` result_state or `INTERNAL_ERROR` `life_cycle_state`. The value `-1` means to retry indefinitely and the value `0` means to never retry. */
  maxRetries?: number | undefined;
  /** An optional minimal interval in milliseconds between the start of the failed run and the subsequent retry run. The default behavior is that unsuccessful runs are immediately retried. */
  minRetryIntervalMillis?: number | undefined;
  /**
   * An optional policy to specify whether to retry a job when it times out. The default behavior
   * is to not retry on timeout.
   */
  retryOnTimeout?: boolean | undefined;
  /** An option to disable auto optimization in serverless */
  disableAutoOptimization?: boolean | undefined;
  /** The time at which this run was started in epoch milliseconds (milliseconds since 1/1/1970 UTC). This may not be the time when the job task starts executing, for example, if the job is scheduled to run on a new cluster, this is the time the cluster creation call is issued. */
  startTime?: bigint | undefined;
  /** The time in milliseconds it took to set up the cluster. For runs that run on new clusters this is the cluster creation time, for runs that run on existing clusters this time should be very short. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the `cleanup_duration`. The `setup_duration` field is set to 0 for multitask job runs. The total duration of a multitask job run is the value of the `run_duration` field. */
  setupDuration?: bigint | undefined;
  /** The time in milliseconds it took to execute the commands in the JAR or notebook until they  completed, failed, timed out, were cancelled, or encountered an unexpected error. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the  `cleanup_duration`. The `execution_duration` field is set to 0 for multitask job runs. The total  duration of a multitask job run is the value of the `run_duration` field. */
  executionDuration?: bigint | undefined;
  /** The time in milliseconds it took to terminate the cluster and clean up any associated artifacts. The duration of a task run is the sum of the `setup_duration`, `execution_duration`, and the `cleanup_duration`. The `cleanup_duration` field is set to 0 for multitask job runs. The total duration of a multitask job run is the value of the `run_duration` field. */
  cleanupDuration?: bigint | undefined;
  /** The time at which this run ended in epoch milliseconds (milliseconds since 1/1/1970 UTC). This field is set to 0 if the job is still running. */
  endTime?: bigint | undefined;
  /** The time in milliseconds it took the job run and all of its repairs to finish. */
  runDuration?: bigint | undefined;
  /** The time in milliseconds that the run has spent in the queue. */
  queueDuration?: bigint | undefined;
}

export interface RunTaskSettings {
  /**
   * A unique name for the task. This field is used to refer to this task from other tasks.
   * This field is required and must be unique within its parent job.
   * On Update or Reset, this field is used to reference the tasks to be updated or reset.
   */
  taskKey?: string | undefined;
  /** An optional description for this task. */
  description?: string | undefined;
  /**
   * An optional array of objects specifying the dependency graph of the task. All tasks specified in this field must complete successfully before executing this task.
   * The key is `task_key`, and the value is the name assigned to the dependent task.
   */
  dependsOn?: TaskDependency[] | undefined;
  /** An optional value indicating the condition that determines whether the task should be run once its dependencies have been completed. When omitted, defaults to `ALL_SUCCESS`. See :method:jobs/create for a list of possible values. */
  runIf?: TaskDependencyType | undefined;
  /** An optional timeout applied to each run of this job task. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  /** An optional set of email addresses notified when the task run begins or completes. The default behavior is to not send any emails. */
  emailNotifications?: JobEmailNotifications | undefined;
  health?: JobsHealthRules | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this task run. */
  notificationSettings?: NotificationSettings | undefined;
  /** A collection of system notification IDs to notify when the run begins or completes. The default behavior is to not send any system notifications. Task webhooks respect the task notification settings. */
  webhookNotifications?: WebhookNotifications | undefined;
  environmentRef?:
    | {
        $case: 'environmentKey';
        /** The key that references an environment spec in a job. This field is required for Python script, Python wheel and dbt tasks when using serverless compute. */
        environmentKey: string;
      }
    | undefined;
  /** An optional flag to disable the task. If set to true, the task will not run even if it is part of a job. */
  disabled?: boolean | undefined;
  /** Task level compute configuration. */
  compute?: Compute | undefined;
  /** DO NOT ADD ANY NEW FIELDS TO JobTask OUTSIDE OF THIS ONEOF as it will break the TaskRegistry */
  task?:
    | {
        $case: 'notebookTask';
        /** The task runs a notebook when the `notebook_task` field is present. */
        notebookTask: NotebookTask;
      }
    | {
        $case: 'sparkJarTask';
        /** The task runs a JAR when the `spark_jar_task` field is present. */
        sparkJarTask: SparkJarTask;
      }
    | {
        $case: 'sparkPythonTask';
        /** The task runs a Python file when the `spark_python_task` field is present. */
        sparkPythonTask: SparkPythonTask;
      }
    | {
        $case: 'sparkSubmitTask';
        /** (Legacy) The task runs the spark-submit script when the spark_submit_task field is present. Databricks recommends using the spark_jar_task instead; see [Spark Submit task for jobs](/jobs/spark-submit). */
        sparkSubmitTask: SparkSubmitTask;
      }
    | {
        $case: 'pipelineTask';
        /** The task triggers a pipeline update when the `pipeline_task` field is present. Only pipelines configured to use triggered more are supported. */
        pipelineTask: PipelineTask;
      }
    | {
        $case: 'pythonWheelTask';
        /** The task runs a Python wheel when the `python_wheel_task` field is present. */
        pythonWheelTask: PythonWheelTask;
      }
    | {
        $case: 'dbtTask';
        /** The task runs one or more dbt commands when the `dbt_task` field is present. The dbt task requires both Databricks SQL and the ability to use a serverless or a pro SQL warehouse. */
        dbtTask: DbtTask;
      }
    | {
        $case: 'sqlTask';
        /** The task runs a SQL query or file, or it refreshes a SQL alert or a legacy SQL dashboard when the `sql_task` field is present. */
        sqlTask: SqlTask;
      }
    | {
        $case: 'runJobTask';
        /** The task triggers another job when the `run_job_task` field is present. */
        runJobTask: RunJobTask;
      }
    | {
        $case: 'conditionTask';
        /**
         * The task evaluates a condition that can be used to control the execution of other tasks when the `condition_task` field is present.
         * The condition task does not require a cluster to execute and does not support retries or notifications.
         */
        conditionTask: ConditionTask;
      }
    | {
        $case: 'forEachTask';
        /** The task executes a nested task for every input provided when the `for_each_task` field is present. */
        forEachTask: ForEachTask;
      }
    | {
        $case: 'cleanRoomsNotebookTask';
        /**
         * The task runs a [clean rooms](/clean-rooms/index.html) notebook
         * when the `clean_rooms_notebook_task` field is present.
         */
        cleanRoomsNotebookTask: CleanRoomsNotebookTask;
      }
    | {$case: 'genAiComputeTask'; genAiComputeTask: GenAiComputeTask}
    | {
        $case: 'alertTask';
        /**
         * The task evaluates a <Databricks> alert and sends notifications to subscribers
         * when the `alert_task` field is present.
         */
        alertTask: AlertTask;
      }
    | {
        $case: 'powerBiTask';
        /** The task triggers a Power BI semantic model update when the `power_bi_task` field is present. */
        powerBiTask: PowerBiTask;
      }
    | {
        $case: 'dashboardTask';
        /** The task refreshes a dashboard and sends a snapshot to subscribers. */
        dashboardTask: DashboardTask;
      }
    | {
        $case: 'dbtCloudTask';
        /** Task type for dbt cloud, deprecated in favor of the new name dbt_platform_task */
        dbtCloudTask: DbtCloudTask;
      }
    | {$case: 'dbtPlatformTask'; dbtPlatformTask: DbtPlatformTask}
    | {
        $case: 'pythonOperatorTask';
        /** The task runs a Python operator task. */
        pythonOperatorTask: PythonOperatorTask;
      }
    | {
        $case: 'aiRuntimeTask';
        /**
         * The task runs a multi-node GPU compute workload on Databricks AI Runtime.
         * External-facing surface; mirrors the AIR CLI (fka SGCLI) v2 YAML schema.
         */
        aiRuntimeTask: AiRuntimeTask;
      }
    | undefined;
  spec?:
    | {
        $case: 'existingClusterId';
        /**
         * If existing_cluster_id, the ID of an existing cluster that is used for all runs.
         * When running jobs or tasks on an existing cluster, you may need to manually restart
         * the cluster if it stops responding. We suggest running jobs and tasks on new clusters for
         * greater reliability
         */
        existingClusterId: string;
      }
    | {
        $case: 'newCluster';
        /** If new_cluster, a description of a new cluster that is created for each run. */
        newCluster: ClusterSpec_NewCluster;
      }
    | {
        $case: 'jobClusterKey';
        /** If job_cluster_key, this task is executed reusing the cluster specified in `job.settings.job_clusters`. */
        jobClusterKey: string;
      }
    | undefined;
  /**
   * An optional list of libraries to be installed on the cluster.
   * The default value is an empty list.
   */
  libraries?: Library[] | undefined;
  /** An optional maximum number of times to retry an unsuccessful run. A run is considered to be unsuccessful if it completes with the `FAILED` result_state or `INTERNAL_ERROR` `life_cycle_state`. The value `-1` means to retry indefinitely and the value `0` means to never retry. */
  maxRetries?: number | undefined;
  /** An optional minimal interval in milliseconds between the start of the failed run and the subsequent retry run. The default behavior is that unsuccessful runs are immediately retried. */
  minRetryIntervalMillis?: number | undefined;
  /**
   * An optional policy to specify whether to retry a job when it times out. The default behavior
   * is to not retry on timeout.
   */
  retryOnTimeout?: boolean | undefined;
  /** An option to disable auto optimization in serverless */
  disableAutoOptimization?: boolean | undefined;
}

/** Additional details about what triggered the run */
export interface RunTriggerInfo {
  /** The run id of the Run Job task run */
  runId?: bigint | undefined;
}

/** A storage location in Amazon S3 */
export interface S3StorageInfo {
  /**
   * S3 destination, e.g. `s3://my-bucket/some-prefix` Note that logs will be delivered using
   * cluster iam role, please make sure you set cluster iam role and the role has write access to the
   * destination. Please also note that you cannot use AWS keys to deliver logs.
   */
  destination?: string | undefined;
  /**
   * S3 region, e.g. `us-west-2`. Either region or endpoint needs to be set. If both are set,
   * endpoint will be used.
   */
  region?: string | undefined;
  /**
   * S3 endpoint, e.g. `https://s3-us-west-2.amazonaws.com`. Either region or endpoint needs to be set.
   * If both are set, endpoint will be used.
   */
  endpoint?: string | undefined;
  /** (Optional) Flag to enable server side encryption, `false` by default. */
  enableEncryption?: boolean | undefined;
  /**
   * (Optional) The encryption type, it could be `sse-s3` or `sse-kms`. It will be used only when
   * encryption is enabled and the default type is `sse-s3`.
   */
  encryptionType?: string | undefined;
  /** (Optional) Kms key which will be used if encryption is enabled and encryption type is set to `sse-kms`. */
  kmsKey?: string | undefined;
  /**
   * (Optional) Set canned access control list for the logs, e.g. `bucket-owner-full-control`.
   * If `canned_cal` is set, please make sure the cluster iam role has `s3:PutObjectAcl` permission on
   * the destination bucket and prefix. The full list of possible canned acl can be found at
   * http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl.
   * Please also note that by default only the object owner gets full controls. If you are using cross account
   * role for writing data, you may want to set `bucket-owner-full-control` to make bucket owner able to
   * read the logs.
   */
  cannedAcl?: string | undefined;
}

export interface SparkJarTask {
  /**
   * Deprecated since 04/2016. For classic compute, provide a `jar` through the `libraries` field instead. For serverless compute, provide a `jar` though the `java_dependencies` field inside the `environments` list.
   *
   * See the examples of classic and serverless compute usage at the top of the page.
   */
  jarUri?: string | undefined;
  /**
   * The full name of the class containing the main method to be executed. This class must be contained in a JAR provided as a library.
   *
   * The code must use `SparkContext.getOrCreate` to obtain a Spark context; otherwise, runs of the job fail.
   */
  mainClassName?: string | undefined;
  /**
   * Parameters passed to the main method.
   *
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   */
  parameters?: string[] | undefined;
  /** Deprecated. A value of `false` is no longer supported. */
  runAsRepl?: boolean | undefined;
}

export interface SparkPythonTask {
  /** The Python file to be executed. Cloud file URIs (such as dbfs:/, s3:/, adls:/, gcs:/) and workspace paths are supported. For python files stored in the <Databricks> workspace, the path must be absolute and begin with `/`. For files stored in a remote repository, the path must be relative. This field is required. */
  pythonFile?: string | undefined;
  /**
   * Command line parameters passed to the Python file.
   *
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   */
  parameters?: string[] | undefined;
  /**
   * Optional location type of the Python file. When set to `WORKSPACE` or not specified, the file will be retrieved from the local
   * <Databricks> workspace or cloud location (if the `python_file` has a URI format). When set to `GIT`,
   * the Python file will be retrieved from a Git repository defined in `git_source`.
   *
   * * `WORKSPACE`: The Python file is located in a <Databricks> workspace or at a cloud filesystem URI.
   * * `GIT`: The Python file is located in a remote Git repository.
   */
  source?: Source | undefined;
}

export interface SparkSubmitTask {
  /**
   * Command-line parameters passed to spark submit.
   *
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   */
  parameters?: string[] | undefined;
}

export interface SparseCheckout {
  /** List of patterns to include for sparse checkout. */
  patterns?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SqlAlertState {}

export interface SqlTask {
  /** Parameters to be used for each run of this job. The SQL alert task does not support custom parameters. */
  parameters?: Record<string, string> | undefined;
  sqlTaskType?:
    | {
        $case: 'query';
        /** If query, indicates that this job must execute a SQL query. */
        query: SqlTaskQuery;
      }
    | {
        $case: 'dashboard';
        /** If dashboard, indicates that this job must refresh a SQL dashboard. */
        dashboard: SqlTaskDashboard;
      }
    | {
        $case: 'alert';
        /** If alert, indicates that this job must refresh a SQL alert. */
        alert: SqlTaskAlert;
      }
    | {
        $case: 'file';
        /** If file, indicates that this job runs a SQL file in a remote Git repository. */
        file: SqlTaskFile;
      }
    | undefined;
  /** The canonical identifier of the SQL warehouse. Recommended to use with serverless or pro SQL warehouses. Classic SQL warehouses are only supported for SQL alert, dashboard and query tasks and are limited to scheduled single-task jobs. */
  warehouseId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SqlTask_SqlAlertOutput {
  /** The text of the SQL query. Can Run permission of the SQL query associated with the SQL alert is required to view this field. */
  queryText?: string | undefined;
  /** Information about SQL statements executed in the run. */
  sqlStatements?: SqlTask_SqlStatementOutput[] | undefined;
  /** The link to find the output results. */
  outputLink?: string | undefined;
  /** The canonical identifier of the SQL warehouse. */
  warehouseId?: string | undefined;
  alertState?: SqlAlertState_SqlAlertState | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SqlTask_SqlDashboardOutput {
  /** Widgets executed in the run. Only SQL query based widgets are listed. */
  widgets?: SqlTask_SqlDashboardWidgetOutput[] | undefined;
  /** The canonical identifier of the SQL warehouse. */
  warehouseId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SqlTask_SqlDashboardWidgetOutput {
  /** The canonical identifier of the SQL widget. */
  widgetId?: string | undefined;
  /** The title of the SQL widget. */
  widgetTitle?: string | undefined;
  /** The link to find the output results. */
  outputLink?: string | undefined;
  /** The execution status of the SQL widget. */
  status?: SqlTask_SqlTaskQueryStatus | undefined;
  /** The information about the error when execution fails. */
  error?: SqlTask_SqlOutputError | undefined;
  /** Time (in epoch milliseconds) when execution of the SQL widget starts. */
  startTime?: bigint | undefined;
  /** Time (in epoch milliseconds) when execution of the SQL widget ends. */
  endTime?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SqlTask_SqlOutput {
  sqlOutputType?:
    | {
        $case: 'queryOutput';
        /** The output of a SQL query task, if available. */
        queryOutput: SqlTask_SqlQueryOutput;
      }
    | {
        $case: 'dashboardOutput';
        /** The output of a SQL dashboard task, if available. */
        dashboardOutput: SqlTask_SqlDashboardOutput;
      }
    | {
        $case: 'alertOutput';
        /** The output of a SQL alert task, if available. */
        alertOutput: SqlTask_SqlAlertOutput;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SqlTask_SqlOutputError {
  /** The error message when execution fails. */
  message?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SqlTask_SqlQueryOutput {
  /** The text of the SQL query. Can Run permission of the SQL query is required to view this field. */
  queryText?: string | undefined;
  endpointId?: string | undefined;
  /** Information about SQL statements executed in the run. */
  sqlStatements?: SqlTask_SqlStatementOutput[] | undefined;
  /** The link to find the output results. */
  outputLink?: string | undefined;
  /** The canonical identifier of the SQL warehouse. */
  warehouseId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SqlTask_SqlStatementOutput {
  /** A key that can be used to look up query details. */
  lookupKey?: string | undefined;
}

export interface SqlTaskAlert {
  /** The canonical identifier of the SQL alert. */
  alertId?: string | undefined;
  /** If specified, alert notifications are sent to subscribers. */
  subscriptions?: SqlTaskSubscription[] | undefined;
  /** If true, the alert notifications are not sent to subscribers. */
  pauseSubscriptions?: boolean | undefined;
}

export interface SqlTaskDashboard {
  /** The canonical identifier of the SQL dashboard. */
  dashboardId?: string | undefined;
  /** If specified, dashboard snapshots are sent to subscriptions. */
  subscriptions?: SqlTaskSubscription[] | undefined;
  /** Subject of the email sent to subscribers of this task. */
  customSubject?: string | undefined;
  /** If true, the dashboard snapshot is not taken, and emails are not sent to subscribers. */
  pauseSubscriptions?: boolean | undefined;
}

export interface SqlTaskFile {
  /** Path of the SQL file. Must be relative if the source is a remote Git repository and absolute for workspace paths. */
  path?: string | undefined;
  /**
   * Optional location type of the SQL file. When set to `WORKSPACE`, the SQL file will be retrieved
   * from the local <Databricks> workspace. When set to `GIT`, the SQL file will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   *
   * * `WORKSPACE`: SQL file is located in <Databricks> workspace.
   * * `GIT`: SQL file is located in cloud Git provider.
   */
  source?: Source | undefined;
}

export interface SqlTaskQuery {
  queryType?:
    | {
        $case: 'queryId';
        /** The canonical identifier of the SQL query. */
        queryId: string;
      }
    | undefined;
}

export interface SqlTaskSubscription {
  subscriptionType?:
    | {
        $case: 'userName';
        /** The user name to receive the subscription email. This parameter is mutually exclusive with destination_id. You cannot set both destination_id and user_name for subscription notifications. */
        userName: string;
      }
    | {
        $case: 'destinationId';
        /** The canonical identifier of the destination to receive email notification. This parameter is mutually exclusive with user_name. You cannot set both destination_id and user_name for subscription notifications. */
        destinationId: string;
      }
    | undefined;
}

export interface SubmitRunRequest {
  /** List of permissions to set on the job. */
  accessControlList?: AccessControlRequest[] | undefined;
  /** The queue settings of the one-time run. */
  queue?: CreateQueueSettings | undefined;
  /** Specifies the user or service principal that the job runs as. If not specified, the job runs as the user who submits the request. */
  runAs?: CreateJobRunAs | undefined;
  /** An optional name for the run. The default value is `Untitled`. */
  runName?: string | undefined;
  /** An optional timeout applied to each run of this job. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  health?: CreateJobsHealthRules | undefined;
  /**
   * An optional token that can be used to guarantee the idempotency of job run requests. If a run with the provided token already exists,
   * the request does not create a new run but returns the ID of the existing run instead. If a run with the provided token is deleted,
   * an error is returned.
   *
   * If you specify the idempotency token, upon failure you can retry until the request succeeds. <Databricks> guarantees that exactly
   * one run is launched with that idempotency token.
   *
   * This token must have at most 64 characters.
   *
   * For more information, see [How to ensure idempotency for jobs](https://kb.databricks.com/jobs/jobs-idempotency.html).
   */
  idempotencyToken?: string | undefined;
  tasks?: RunTaskSettings[] | undefined;
  /**
   * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
   *
   * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
   *
   * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
   */
  gitSource?: CreateGitSource | undefined;
  /** A collection of system notification IDs to notify when the run begins or completes. */
  webhookNotifications?: CreateWebhookNotifications | undefined;
  /** An optional set of email addresses notified when the run begins or completes. */
  emailNotifications?: CreateJobEmailNotifications | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this run. */
  notificationSettings?: CreateNotificationSettings | undefined;
  /** A list of task execution environment specifications that can be referenced by tasks of this run. */
  environments?: CreateJobEnvironment[] | undefined;
  /**
   * The user specified id of the budget policy to use for this one-time run.
   * If not specified, the run will be not be attributed to any budget policy.
   */
  budgetPolicyId?: string | undefined;
  /**
   * The user specified id of the usage policy to use for this one-time run.
   * If not specified, a default usage policy may be applied when creating or modifying the job.
   */
  usagePolicyId?: string | undefined;
}

/** Run was created and started successfully. */
export interface SubmitRunResponse {
  /** The canonical identifier for the newly submitted run. */
  runId?: bigint | undefined;
}

export interface Subscription {
  /** The list of subscribers to send the snapshot of the dashboard to. */
  subscribers?: Subscription_Subscriber[] | undefined;
  /** When true, the subscription will not send emails. */
  paused?: boolean | undefined;
  /**
   * Optional: Allows users to specify a custom subject line on the email sent
   * to subscribers.
   */
  customSubject?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Subscription_CreateSubscriber {
  subscriptionType?:
    | {
        $case: 'userName';
        /** A snapshot of the dashboard will be sent to the user's email when the `user_name` field is present. */
        userName: string;
      }
    | {
        $case: 'destinationId';
        /** A snapshot of the dashboard will be sent to the destination when the `destination_id` field is present. */
        destinationId: string;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Subscription_Subscriber {
  subscriptionType?:
    | {
        $case: 'userName';
        /** A snapshot of the dashboard will be sent to the user's email when the `user_name` field is present. */
        userName: string;
      }
    | {
        $case: 'destinationId';
        /** A snapshot of the dashboard will be sent to the destination when the `destination_id` field is present. */
        destinationId: string;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Subscription_UpdateSubscriber {
  subscriptionType?:
    | {
        $case: 'userName';
        /** A snapshot of the dashboard will be sent to the user's email when the `user_name` field is present. */
        userName: string;
      }
    | {
        $case: 'destinationId';
        /** A snapshot of the dashboard will be sent to the destination when the `destination_id` field is present. */
        destinationId: string;
      }
    | undefined;
}

export interface TableState {
  /** Full table name of the table to monitor, e.g. `mycatalog.myschema.mytable` */
  tableName?: string | undefined;
  /**
   * Whether or not the table has seen updates since either
   * the creation of the trigger or the last successful evaluation of the trigger
   */
  hasSeenUpdates?: boolean | undefined;
}

export interface TableTriggerConfiguration {
  /** A list of tables to monitor for changes. The table name must be in the format `catalog_name.schema_name.table_name`. */
  tableNames?: string[] | undefined;
  /**
   * If set, the trigger starts a run only after the specified amount of time has passed since
   * the last time the trigger fired. The minimum allowed value is 60 seconds.
   */
  minTimeBetweenTriggersSeconds?: number | undefined;
  /**
   * If set, the trigger starts a run only after no table updates have occurred for the specified time
   * and can be used to wait for a series of table updates before triggering a run. The
   * minimum allowed value is 60 seconds.
   */
  waitAfterLastChangeSeconds?: number | undefined;
  /** The table(s) condition based on which to trigger a job run. */
  condition?: TableTriggerConfiguration_Condition | undefined;
}

export interface TableTriggerState {
  lastSeenTableStates?: TableState[] | undefined;
  /** Indicates whether the trigger is using scalable monitoring. */
  usingScalableMonitoring?: boolean | undefined;
}

export interface TaskDependency {
  /** The name of the task this task depends on. */
  taskKey?: string | undefined;
  /** Can only be specified on condition task dependencies. The outcome of the dependent task that must be met for this task to run. */
  outcome?: string | undefined;
}

export interface TaskSettings {
  /**
   * A unique name for the task. This field is used to refer to this task from other tasks.
   * This field is required and must be unique within its parent job.
   * On Update or Reset, this field is used to reference the tasks to be updated or reset.
   */
  taskKey?: string | undefined;
  /**
   * An optional array of objects specifying the dependency graph of the task. All tasks specified in this field must complete before executing this task. The task will run only if the `run_if` condition is true.
   * The key is `task_key`, and the value is the name assigned to the dependent task.
   */
  dependsOn?: TaskDependency[] | undefined;
  /**
   * An optional value specifying the condition determining whether the task is run once its dependencies have been completed.
   *
   * * `ALL_SUCCESS`: All dependencies have executed and succeeded
   * * `AT_LEAST_ONE_SUCCESS`: At least one dependency has succeeded
   * * `NONE_FAILED`: None of the dependencies have failed and at least one was executed
   * * `ALL_DONE`: All dependencies have been completed
   * * `AT_LEAST_ONE_FAILED`: At least one dependency failed
   * * `ALL_FAILED`: ALl dependencies have failed
   */
  runIf?: TaskDependencyType | undefined;
  /** An optional timeout applied to each run of this job task. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  health?: JobsHealthRules | undefined;
  /** An optional set of email addresses that is notified when runs of this task begin or complete as well as when this task is deleted. The default behavior is to not send any emails. */
  emailNotifications?: JobEmailNotifications | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this task. */
  notificationSettings?: NotificationSettings | undefined;
  /** A collection of system notification IDs to notify when runs of this task begin or complete. The default behavior is to not send any system notifications. */
  webhookNotifications?: WebhookNotifications | undefined;
  /** An optional description for this task. */
  description?: string | undefined;
  environmentRef?:
    | {
        $case: 'environmentKey';
        /** The key that references an environment spec in a job. This field is required for Python script, Python wheel and dbt tasks when using serverless compute. */
        environmentKey: string;
      }
    | undefined;
  /** An optional flag to disable the task. If set to true, the task will not run even if it is part of a job. */
  disabled?: boolean | undefined;
  /** Task level compute configuration. */
  compute?: Compute | undefined;
  /** DO NOT ADD ANY NEW FIELDS TO JobTask OUTSIDE OF THIS ONEOF as it will break the TaskRegistry */
  task?:
    | {
        $case: 'notebookTask';
        /** The task runs a notebook when the `notebook_task` field is present. */
        notebookTask: NotebookTask;
      }
    | {
        $case: 'sparkJarTask';
        /** The task runs a JAR when the `spark_jar_task` field is present. */
        sparkJarTask: SparkJarTask;
      }
    | {
        $case: 'sparkPythonTask';
        /** The task runs a Python file when the `spark_python_task` field is present. */
        sparkPythonTask: SparkPythonTask;
      }
    | {
        $case: 'sparkSubmitTask';
        /** (Legacy) The task runs the spark-submit script when the spark_submit_task field is present. Databricks recommends using the spark_jar_task instead; see [Spark Submit task for jobs](/jobs/spark-submit). */
        sparkSubmitTask: SparkSubmitTask;
      }
    | {
        $case: 'pipelineTask';
        /** The task triggers a pipeline update when the `pipeline_task` field is present. Only pipelines configured to use triggered more are supported. */
        pipelineTask: PipelineTask;
      }
    | {
        $case: 'pythonWheelTask';
        /** The task runs a Python wheel when the `python_wheel_task` field is present. */
        pythonWheelTask: PythonWheelTask;
      }
    | {
        $case: 'dbtTask';
        /** The task runs one or more dbt commands when the `dbt_task` field is present. The dbt task requires both Databricks SQL and the ability to use a serverless or a pro SQL warehouse. */
        dbtTask: DbtTask;
      }
    | {
        $case: 'sqlTask';
        /** The task runs a SQL query or file, or it refreshes a SQL alert or a legacy SQL dashboard when the `sql_task` field is present. */
        sqlTask: SqlTask;
      }
    | {
        $case: 'runJobTask';
        /** The task triggers another job when the `run_job_task` field is present. */
        runJobTask: RunJobTask;
      }
    | {
        $case: 'conditionTask';
        /**
         * The task evaluates a condition that can be used to control the execution of other tasks when the `condition_task` field is present.
         * The condition task does not require a cluster to execute and does not support retries or notifications.
         */
        conditionTask: ConditionTask;
      }
    | {
        $case: 'forEachTask';
        /** The task executes a nested task for every input provided when the `for_each_task` field is present. */
        forEachTask: ForEachTask;
      }
    | {
        $case: 'cleanRoomsNotebookTask';
        /**
         * The task runs a [clean rooms](/clean-rooms/index.html) notebook
         * when the `clean_rooms_notebook_task` field is present.
         */
        cleanRoomsNotebookTask: CleanRoomsNotebookTask;
      }
    | {$case: 'genAiComputeTask'; genAiComputeTask: GenAiComputeTask}
    | {
        $case: 'alertTask';
        /**
         * The task evaluates a <Databricks> alert and sends notifications to subscribers
         * when the `alert_task` field is present.
         */
        alertTask: AlertTask;
      }
    | {
        $case: 'powerBiTask';
        /** The task triggers a Power BI semantic model update when the `power_bi_task` field is present. */
        powerBiTask: PowerBiTask;
      }
    | {
        $case: 'dashboardTask';
        /** The task refreshes a dashboard and sends a snapshot to subscribers. */
        dashboardTask: DashboardTask;
      }
    | {
        $case: 'dbtCloudTask';
        /** Task type for dbt cloud, deprecated in favor of the new name dbt_platform_task */
        dbtCloudTask: DbtCloudTask;
      }
    | {$case: 'dbtPlatformTask'; dbtPlatformTask: DbtPlatformTask}
    | {
        $case: 'pythonOperatorTask';
        /** The task runs a Python operator task. */
        pythonOperatorTask: PythonOperatorTask;
      }
    | {
        $case: 'aiRuntimeTask';
        /**
         * The task runs a multi-node GPU compute workload on Databricks AI Runtime.
         * External-facing surface; mirrors the AIR CLI (fka SGCLI) v2 YAML schema.
         */
        aiRuntimeTask: AiRuntimeTask;
      }
    | undefined;
  spec?:
    | {
        $case: 'existingClusterId';
        /**
         * If existing_cluster_id, the ID of an existing cluster that is used for all runs.
         * When running jobs or tasks on an existing cluster, you may need to manually restart
         * the cluster if it stops responding. We suggest running jobs and tasks on new clusters for
         * greater reliability
         */
        existingClusterId: string;
      }
    | {
        $case: 'newCluster';
        /** If new_cluster, a description of a new cluster that is created for each run. */
        newCluster: ClusterSpec_NewCluster;
      }
    | {
        $case: 'jobClusterKey';
        /** If job_cluster_key, this task is executed reusing the cluster specified in `job.settings.job_clusters`. */
        jobClusterKey: string;
      }
    | undefined;
  /**
   * An optional list of libraries to be installed on the cluster.
   * The default value is an empty list.
   */
  libraries?: Library[] | undefined;
  /** An optional maximum number of times to retry an unsuccessful run. A run is considered to be unsuccessful if it completes with the `FAILED` result_state or `INTERNAL_ERROR` `life_cycle_state`. The value `-1` means to retry indefinitely and the value `0` means to never retry. */
  maxRetries?: number | undefined;
  /** An optional minimal interval in milliseconds between the start of the failed run and the subsequent retry run. The default behavior is that unsuccessful runs are immediately retried. */
  minRetryIntervalMillis?: number | undefined;
  /**
   * An optional policy to specify whether to retry a job when it times out. The default behavior
   * is to not retry on timeout.
   */
  retryOnTimeout?: boolean | undefined;
  /** An option to disable auto optimization in serverless */
  disableAutoOptimization?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TerminationCode {}

export interface TerminationDetails {
  code?: TerminationCode_Code | undefined;
  type?: TerminationType_Type | undefined;
  /** A descriptive message with the termination details. This field is unstructured and the format might change. */
  message?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TerminationType {}

export interface TriggerSettings {
  /** Whether this trigger is paused or not. */
  pauseStatus?: SchedulePauseStatus | undefined;
  configuration?:
    | {
        $case: 'fileArrival';
        /** File arrival trigger settings. */
        fileArrival: FileArrivalTriggerConfiguration;
      }
    | {
        $case: 'periodic';
        /** Periodic trigger settings. */
        periodic: PeriodicTriggerConfiguration;
      }
    | {$case: 'tableUpdate'; tableUpdate: TableTriggerConfiguration}
    | {$case: 'model'; model: ModelTriggerConfiguration}
    | undefined;
}

export interface TriggerState {
  /** (-- Next ID: 7. --) */
  triggerType?:
    | {$case: 'table'; table: TableTriggerState}
    | {$case: 'fileArrival'; fileArrival: FileArrivalTriggerState}
    | undefined;
}

/** A storage location in Adls Gen2 */
export interface UpdateAdlsgen2Info {
  /** abfss destination, e.g. `abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/<directory-name>`. */
  destination?: string | undefined;
}

/**
 * AiRuntimeTask: multi-node GPU compute task definition for Databricks AI
 * Runtime workloads.
 *
 * Jobs-framework-level concepts (retries, per-task timeout, idempotency
 * token, usage/budget policy, permissions) live on the surrounding
 * TaskSettings / run-submit request and are intentionally NOT duplicated
 * here. Users compose `ai_runtime_task` with the standard Jobs/DABs task
 * wrapper to get those.
 */
export interface UpdateAiRuntimeTask {
  /**
   * MLflow experiment name for this run. If an experiment with this name
   * already exists under the calling user, the run is appended to it;
   * otherwise a new experiment is created. To target a specific MLflow
   * storage location (for example, when running as a service principal), set
   * `mlflow_experiment_directory`.
   */
  experiment?: string | undefined;
  /**
   * Deployment specs for this task. Exactly one deployment is currently
   * supported (a single entry where every node runs the same command); this
   * is a current-Preview constraint. Role-split workloads (driver + worker,
   * parameter server, separate eval node, etc.) with multiple entries are the
   * eventual intent but not yet supported.
   */
  deployments?: UpdateDeploymentSpec[] | undefined;
  /**
   * Optional workspace or UC volume path of the uploaded code-source
   * archive. The CLI packages the user's local code directory into an
   * archive and populates this. Customers calling the Jobs API directly
   * should upload their archive to the workspace or a UC volume first and
   * supply the resulting path here.
   *
   * When set, the training node exposes the value via the `$CODE_SOURCE`
   * environment variable.
   */
  codeSourcePath?: string | undefined;
  /**
   * Optional display name for the MLflow run created under `experiment`. If
   * omitted, MLflow generates a default name.
   */
  mlflowRun?: string | undefined;
  /**
   * Optional workspace directory under which the MLflow experiment named in
   * `experiment` is created. Must start with `/Workspace`. Set this when
   * running as a service principal that has no default user directory; for
   * regular users the experiment defaults to the user's home directory.
   */
  mlflowExperimentDirectory?: string | undefined;
}

export interface UpdateAlertTask {
  /** The alert_id is the canonical identifier of the alert. */
  alertId?: string | undefined;
  /** The warehouse_id identifies the warehouse settings used by the alert task. */
  warehouseId?: string | undefined;
  /**
   * The workspace_path is the path to the alert file in the workspace. The path:
   * * must start with "/Workspace"
   * * must be a normalized path.
   * User has to select only one of alert_id or workspace_path to identify the alert.
   */
  workspacePath?: string | undefined;
  /**
   * The subscribers receive alert evaluation result notifications after the alert task is completed.
   * The number of subscriptions is limited to 100.
   */
  subscribers?: UpdateAlertTaskSubscriber[] | undefined;
}

/**
 * Represents a subscriber that will receive alert notifications.
 * A subscriber can be either a user (via email) or a notification destination (via destination_id).
 */
export interface UpdateAlertTaskSubscriber {
  subscriberType?:
    | {
        $case: 'userName';
        /** A valid workspace email address. */
        userName: string;
      }
    | {$case: 'destinationId'; destinationId: string}
    | undefined;
}

export interface UpdateAutoScale {
  /**
   * The minimum number of workers to which the cluster can scale down when underutilized.
   * It is also the initial number of workers the cluster will have after creation.
   */
  minWorkers?: number | undefined;
  /**
   * The maximum number of workers to which the cluster can scale up when overloaded.
   * Note that `max_workers` must be strictly greater than `min_workers`.
   */
  maxWorkers?: number | undefined;
}

/** Attributes set during cluster creation which are related to Amazon Web Services. */
export interface UpdateAwsAttributes {
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * If this value is greater than 0, the cluster driver node in particular will be placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  availability?: AwsAvailability | undefined;
  /**
   * Identifier for the availability zone/datacenter in which the cluster resides.
   * This string will be of a form like "us-west-2a". The provided availability
   * zone must be in the same region as the <Databricks> deployment. For example, "us-west-2a"
   * is not a valid zone id if the <Databricks> deployment resides in the "us-east-1" region.
   * This is an optional field at cluster creation, and if not specified, the zone "auto" will be used.
   * If the zone specified is "auto", will try to place cluster in a zone with high availability,
   * and will retry placement in a different AZ if there is not enough capacity.
   *
   * The list of available zones as well as the default value can be found by using the
   * `List Zones` method.
   */
  zoneId?: string | undefined;
  /**
   * Nodes for this cluster will only be placed on AWS instances with this instance profile. If
   * ommitted, nodes will be placed on instances without an IAM instance profile. The instance
   * profile must have previously been added to the <Databricks> environment by an account
   * administrator.
   *
   * This feature may only be available to certain customer plans.
   */
  instanceProfileArn?: string | undefined;
  /**
   * The bid price for AWS spot instances, as a percentage of the corresponding instance type's
   * on-demand price.
   * For example, if this field is set to 50, and the cluster needs a new `r3.xlarge` spot
   * instance, then the bid price is half of the price of
   * on-demand `r3.xlarge` instances. Similarly, if this field is set to 200, the bid price is twice
   * the price of on-demand `r3.xlarge` instances. If not specified, the default value is 100.
   * When spot instances are requested for this cluster, only spot instances whose bid price
   * percentage matches this field will be considered.
   * Note that, for safety, we enforce this field to be no more than 10000.
   */
  spotBidPricePercent?: number | undefined;
  /** The type of EBS volumes that will be launched with this cluster. */
  ebsVolumeType?: EbsVolumeType | undefined;
  /**
   * The number of volumes launched for each instance. Users can choose up to 10 volumes.
   * This feature is only enabled for supported node types. Legacy node types cannot specify
   * custom EBS volumes.
   * For node types with no instance store, at least one EBS volume needs to be specified;
   * otherwise, cluster creation will fail.
   *
   * These EBS volumes will be mounted at `/ebs0`, `/ebs1`, and etc.
   * Instance store volumes will be mounted at `/local_disk0`, `/local_disk1`, and etc.
   *
   * If EBS volumes are attached, <Databricks> will configure Spark to use only the EBS volumes for
   * scratch storage because heterogenously sized scratch devices can lead to inefficient disk
   * utilization. If no EBS volumes are attached, <Databricks> will configure Spark to use instance
   * store volumes.
   *
   * Please note that if EBS volumes are specified, then the Spark configuration `spark.local.dir`
   * will be overridden.
   */
  ebsVolumeCount?: number | undefined;
  /**
   * The size of each EBS volume (in GiB) launched for each instance. For general purpose
   * SSD, this value must be within the range 100 - 4096. For throughput optimized HDD,
   * this value must be within the range 500 - 4096.
   */
  ebsVolumeSize?: number | undefined;
  /** If using gp3 volumes, what IOPS to use for the disk. If this is not set, the maximum performance of a gp2 volume with the same volume size will be used. */
  ebsVolumeIops?: number | undefined;
  /** If using gp3 volumes, what throughput to use for the disk. If this is not set, the maximum performance of a gp2 volume with the same volume size will be used. */
  ebsVolumeThroughput?: number | undefined;
}

/** Attributes set during cluster creation which are related to Microsoft Azure. */
export interface UpdateAzureAttributes {
  /** Defines values necessary to configure and run Azure Log Analytics agent */
  logAnalyticsInfo?: UpdateLogAnalyticsInfo | undefined;
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * Availability type used for all subsequent nodes past the `first_on_demand` ones.
   * Note: If `first_on_demand` is zero, this availability
   * type will be used for the entire cluster.
   */
  availability?: AzureAvailability | undefined;
  /**
   * The max bid price to be used for Azure spot instances.
   * The Max price for the bid cannot be higher than the on-demand price of the instance.
   * If not specified, the default value is -1, which specifies that the instance cannot be evicted
   * on the basis of price, and only on the basis of availability. Further, the value should > 0 or -1.
   */
  spotBidMaxPrice?: number | undefined;
  /**
   * The Azure capacity reservation group resource ID to use for launching VMs.
   * When specified, VMs will be launched using the provided capacity reservation.
   *
   * Capacity reservations can only be specified when the workspace uses injected vnet (i.e. customer defined vnet not
   * managed by databricks). Ensure the databricks-login-prod Enterprise Application is granted the following four permissions:
   * 1. Microsoft.Compute/capacityReservationGroups/read
   * 2. Microsoft.Compute/capacityReservationGroups/deploy/action
   * 3. Microsoft.Compute/capacityReservationGroups/capacityReservations/read
   * 4. Microsoft.Compute/capacityReservationGroups/capacityReservations/deploy/action
   *
   * Format: `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}`
   */
  capacityReservationGroup?: string | undefined;
}

/**
 * Clean Rooms notebook task for V1 Clean Room service (GA).
 * Replaces the deprecated CleanRoomNotebookTask (defined above) which was for V0 service.
 */
export interface UpdateCleanRoomsNotebookTask {
  /** The clean room that the notebook belongs to. */
  cleanRoomName?: string | undefined;
  /** Name of the notebook being run. */
  notebookName?: string | undefined;
  /**
   * Checksum to validate the freshness of the notebook resource (i.e. the notebook being run is the latest version).
   * It can be fetched by calling the :method:cleanroomassets/get API.
   */
  etag?: string | undefined;
  /** Base parameters to be used for the clean room notebook job. */
  notebookBaseParameters?: Record<string, string> | undefined;
}

/** Cluster log delivery config */
export interface UpdateClusterLogConf {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * `{ "dbfs" : { "destination" : "dbfs:/home/cluster_log" } }`
         */
        dbfs: UpdateDbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either the region or endpoint need to be provided. e.g.
         * `{ "s3": { "destination" : "s3://cluster_log_bucket/prefix", "region" : "us-west-2" } }`
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * `instance_profile_arn` has permission to write data to the s3 destination.
         */
        s3: UpdateS3StorageInfo;
      }
    | {
        $case: 'volumes';
        /**
         * destination needs to be provided, e.g.
         * `{ "volumes": { "destination": "/Volumes/catalog/schema/volume/cluster_log" } }`
         */
        volumes: UpdateVolumesStorageInfo;
      }
    | undefined;
}

export interface UpdateCompute {
  /** Hardware accelerator configuration for Serverless GPU workloads. */
  hardwareAccelerator?: HardwareAcceleratorType | undefined;
}

export interface UpdateComputeConfig {
  /** Number of GPUs. */
  numGpus?: number | undefined;
  /** IDof the GPU pool to use. */
  gpuNodePoolId?: string | undefined;
  /** GPU type. */
  gpuType?: string | undefined;
}

/**
 * ComputeSpec: compute configuration — accelerator type and total
 * accelerator count across all nodes.
 */
export interface UpdateComputeSpec {
  /**
   * Hardware accelerator type (for example, `GPU_1xA10` or `GPU_8xH100`).
   * The number of accelerators per node is encoded in the enum value —
   * `GPU_8xH100` means 8 H100 GPUs per node.
   */
  acceleratorType?: ComputeSpec_AcceleratorType | undefined;
  /**
   * Total number of accelerators across all nodes. Must be a positive
   * multiple of the per-node accelerator count encoded in `accelerator_type`.
   * For example, `GPU_8xH100` with `accelerator_count: 16` allocates 2 nodes
   * (8 GPUs per node).
   */
  acceleratorCount?: number | undefined;
}

export interface UpdateConditionTask {
  /**
   * * `EQUAL_TO`, `NOT_EQUAL` operators perform string comparison of their operands. This means that `“12.0” == “12”` will evaluate to `false`.
   * * `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`, `LESS_THAN`, `LESS_THAN_OR_EQUAL` operators perform numeric comparison of their operands. `“12.0” >= “12”` will evaluate to `true`, `“10.0” >= “12”` will evaluate to `false`.
   *
   * The boolean comparison to task values can be implemented with operators `EQUAL_TO`, `NOT_EQUAL`. If a task value was set to a boolean value, it will be serialized to `“true”` or `“false”` for the comparison.
   */
  op?: ConditionTask_ConditionTaskOperator | undefined;
  /** The left operand of the condition task. Can be either a string value or a job state or parameter reference. */
  left?: string | undefined;
  /** The right operand of the condition task. Can be either a string value or a job state or parameter reference. */
  right?: string | undefined;
  /** The condition expression evaluation result. Filled in if the task was successfully completed. Can be `"true"` or `"false"` */
  outcome?: string | undefined;
}

export interface UpdateContinuousSettings {
  /** Indicate whether the continuous execution of the job is paused or not. Defaults to UNPAUSED. */
  pauseStatus?: SchedulePauseStatus | undefined;
  /** Indicate whether the continuous job is applying task level retries or not. Defaults to NEVER. */
  taskRetryMode?: TaskRetryMode | undefined;
}

export interface UpdateCronSchedule {
  /** A Cron expression using Quartz syntax that describes the schedule for a job. See [Cron Trigger](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html) for details. This field is required. */
  quartzCronExpression?: string | undefined;
  /** A Java timezone ID. The schedule for a job is resolved with respect to this timezone. See [Java TimeZone](https://docs.oracle.com/javase/7/docs/api/java/util/TimeZone.html) for details. This field is required. */
  timezoneId?: string | undefined;
  /** Indicate whether this schedule is paused or not. */
  pauseStatus?: SchedulePauseStatus | undefined;
}

/** Configures the Lakeview Dashboard job task type. */
export interface UpdateDashboardTask {
  /** Optional: subscription configuration for sending the dashboard snapshot. */
  subscription?: UpdateSubscription | undefined;
  /**
   * Optional: The warehouse id to execute the dashboard with for the schedule.
   * If not specified, the default warehouse of the dashboard will be used.
   */
  warehouseId?: string | undefined;
  /** The identifier of the dashboard to refresh. */
  dashboardId?: string | undefined;
  /**
   * Dashboard task parameters. Used to apply dashboard filter values during dashboard task execution. Parameter values get applied to any dashboard filters that have a matching URL identifier as the parameter key.
   * The parameter value format is dependent on the filter type:
   * - For text and single-select filters, provide a single value (e.g. `"value"`)
   * - For date and datetime filters, provide the value in ISO 8601 format (e.g. `"2000-01-01T00:00:00"`)
   * - For multi-select filters, provide a JSON array of values (e.g. `"[\"value1\",\"value2\"]"`)
   * - For range and date range filters, provide a JSON object with `start` and `end` (e.g. `"{\"start\":\"1\",\"end\":\"10\"}"`)
   */
  filters?: Record<string, string> | undefined;
}

/** A storage location in DBFS */
export interface UpdateDbfsStorageInfo {
  /** dbfs destination, e.g. `dbfs:/my/path` */
  destination?: string | undefined;
}

/** Deprecated in favor of DbtPlatformTask */
export interface UpdateDbtCloudTask {
  /** Id of the dbt Cloud job to be triggered */
  dbtCloudJobId?: bigint | undefined;
  /** The resource name of the UC connection that authenticates the dbt Cloud for this task */
  connectionResourceName?: string | undefined;
}

export interface UpdateDbtPlatformTask {
  /** Id of the dbt platform job to be triggered. Specified as a string for maximum compatibility with clients. */
  dbtPlatformJobId?: string | undefined;
  /** The resource name of the UC connection that authenticates the dbt platform for this task */
  connectionResourceName?: string | undefined;
}

export interface UpdateDbtTask {
  /**
   * Path to the project directory. Optional for Git sourced tasks, in which
   * case if no value is provided, the root of the Git repository is used.
   */
  projectDirectory?: string | undefined;
  /** A list of dbt commands to execute. All commands must start with `dbt`. This parameter must not be empty. A maximum of up to 10 commands can be provided. */
  commands?: string[] | undefined;
  /** Optional schema to write to. This parameter is only used when a warehouse_id is also provided. If not provided, the `default` schema is used. */
  schema?: string | undefined;
  /** ID of the SQL warehouse to connect to. If provided, we automatically generate and provide the profile and connection details to dbt. It can be overridden on a per-command basis by using the `--profiles-dir` command line argument. */
  warehouseId?: string | undefined;
  /** Optional (relative) path to the profiles directory. Can only be specified if no warehouse_id is specified. If no warehouse_id is specified and this folder is unset, the root directory is used. */
  profilesDirectory?: string | undefined;
  /** Optional name of the catalog to use. The value is the top level in the 3-level namespace of Unity Catalog (catalog / schema / relation). The catalog value can only be specified if a warehouse_id is specified. Requires dbt-databricks >= 1.1.1. */
  catalog?: string | undefined;
  /**
   * Optional location type of the project directory. When set to `WORKSPACE`, the project will be retrieved
   * from the local <Databricks> workspace. When set to `GIT`, the project will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   *
   * * `WORKSPACE`: Project is located in <Databricks> workspace.
   * * `GIT`: Project is located in cloud Git provider.
   */
  source?: Source | undefined;
}

/**
 * DeploymentSpec: configuration for one deployment within an AiRuntimeTask.
 * Each entry in `AiRuntimeTask.deployments` describes a group of nodes that
 * share the same command and compute. Many single-program training
 * algorithms use a single entry where every node runs the same command;
 * role-split workloads (driver + worker, parameter server, separate eval
 * node, etc.) use multiple entries.
 */
export interface UpdateDeploymentSpec {
  /**
   * Workspace path of the bash script to execute on each node in this
   * deployment. The CLI uploads the user's script and populates this.
   * Customers calling the Jobs API directly should upload their script to
   * the workspace first and supply the resulting path here.
   */
  commandPath?: string | undefined;
  /** Compute resources allocated to each node in this deployment. */
  compute?: UpdateComputeSpec | undefined;
  /**
   * Optional human-readable name for this deployment (for example, `driver`,
   * `worker`, `param_server`). Used for log and UI display. Distinct names
   * are recommended so deployments can be told apart, but uniqueness is not
   * enforced.
   */
  name?: string | undefined;
}

export interface UpdateDockerBasicAuth {
  /** Name of the user */
  username?: string | undefined;
  /** Password of the user */
  password?: string | undefined;
}

export interface UpdateDockerImage {
  /** URL of the docker image. */
  url?: string | undefined;
  credsOneof?:
    | {
        $case: 'basicAuth';
        /** Basic auth with username and password */
        basicAuth: UpdateDockerBasicAuth;
      }
    | undefined;
}

/**
 * The environment entity used to preserve serverless environment side panel, jobs' environment for non-notebook task, and SDP's environment for classic and serverless pipelines.
 * In this minimal environment spec, only pip and java dependencies are supported.
 */
export interface UpdateEnvironment {
  /** Use `environment_version` instead. */
  client?: string | undefined;
  /**
   * List of pip dependencies, as supported by the version of pip in this environment.
   * Each dependency is a valid pip requirements file line per https://pip.pypa.io/en/stable/reference/requirements-file-format/.
   * Allowed dependencies include a requirement specifier, an archive URL, a local project path (such as WSFS or UC Volumes in <Databricks>), or a VCS project URL.
   */
  dependencies?: string[] | undefined;
  /**
   * The base environment this environment is built on top of. A base environment defines the environment version and a
   * list of dependencies for serverless compute. The value can be a file path to a custom `env.yaml` file
   * (e.g., `/Workspace/path/to/env.yaml`). Support for a <Databricks>-provided base environment ID
   * (e.g., `workspace-base-environments/databricks_ai_v4`) and workspace base environment ID
   * (e.g., `workspace-base-environments/dbe_b849b66e-b31a-4cb5-b161-1f2b10877fb7`) is in Beta.
   * Either `environment_version` or `base_environment` can be provided.
   * For more information about <Databricks>-provided base environments, see the
   * [list workspace base environments](:method:Environments/ListWorkspaceBaseEnvironments) API.
   * For more information, see
   */
  baseEnvironment?: string | undefined;
  /**
   * Either `environment_version` or `base_environment` needs to be provided. Environment version used by the environment.
   * Each version comes with a specific Python version and a set of Python packages.
   * The version is a string, consisting of an integer.
   */
  environmentVersion?: string | undefined;
  /** List of java dependencies. Each dependency is a string representing a java library path. For example: `/Volumes/path/to/test.jar`. */
  javaDependencies?: string[] | undefined;
}

export interface UpdateFileArrivalTriggerConfiguration {
  /** URL to be monitored for file arrivals. The path must point to the root or a subpath of the external location. */
  url?: string | undefined;
  /**
   * If set, the trigger starts a run only after the specified amount of time passed since
   * the last time the trigger fired. The minimum allowed value is 60 seconds
   */
  minTimeBetweenTriggersSeconds?: number | undefined;
  /**
   * If set, the trigger starts a run only after no file activity has occurred for the specified amount of time.
   * This makes it possible to wait for a batch of incoming files to arrive before triggering a run. The
   * minimum allowed value is 60 seconds.
   */
  waitAfterLastChangeSeconds?: number | undefined;
}

export interface UpdateForEachTask {
  /**
   * Array for task to iterate on. This can be a JSON string or a reference to
   * an array parameter.
   */
  inputs?: string | undefined;
  /**
   * An optional maximum allowed number of concurrent runs of the task.
   * Set this value if you want to be able to execute multiple runs of the task concurrently.
   */
  concurrency?: number | undefined;
  /** Configuration for the task that will be run for each element in the array */
  task?: UpdateTaskSettings | undefined;
}

/** Attributes set during cluster creation which are related to GCP. */
export interface UpdateGcpAttributes {
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs (when set to true) versus standard compute engine VMs (when set to false; default).
   * Note: Soon to be deprecated, use the 'availability' field instead.
   */
  usePreemptibleExecutors?: boolean | undefined;
  /**
   * If provided, the cluster will impersonate the google service account when accessing
   * gcloud services (like GCS). The google service account
   * must have previously been added to the <Databricks> environment by an account
   * administrator.
   */
  googleServiceAccount?: string | undefined;
  /** Boot disk size in GB */
  bootDiskSize?: number | undefined;
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if the former is unavailable.
   */
  availability?: GcpAvailability | undefined;
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
   * If provided, each node (workers and driver) in the cluster will have this number of local SSDs attached.
   * Each local SSD is 375GB in size.
   * Refer to [GCP documentation](https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds)
   * for the supported number of local SSDs for each instance type.
   */
  localSsdCount?: number | undefined;
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * The confidential computing technology for this cluster's instances.
   * Currently only SEV_SNP is supported, and only on N2D instance types.
   * When not set, no confidential computing is applied.
   */
  confidentialComputeType?: ConfidentialComputeType | undefined;
}

/** A storage location in Google Cloud Platform's GCS */
export interface UpdateGcsStorageInfo {
  /** GCS destination/URI, e.g. `gs://my-bucket/some-prefix` */
  destination?: string | undefined;
}

/**
 * DEPRECATED — use `AiRuntimeTask` for all new BYOT multi-node GPU
 * workloads (see ai_runtime_task.proto). `AiRuntimeTask` is the only
 * supported BYOT task type for new workloads; this proto is retained only
 * for AIR CLI (fka SGCLI) pywheel backwards compatibility and will be
 * removed once the pywheel → databricks-cli migration completes (post-
 * PuPr).
 */
export interface UpdateGenAiComputeTask {
  /** Runtime image */
  dlRuntimeImage?: string | undefined;
  compute?: UpdateComputeConfig | undefined;
  /** Command launcher to run the actual script, e.g. bash, python etc. */
  command?: string | undefined;
  /**
   * Optional location type of the training script. When set to `WORKSPACE`, the script will be retrieved from the local <Databricks> workspace. When set to `GIT`, the script will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   * * `WORKSPACE`: Script is located in <Databricks> workspace.
   * * `GIT`: Script is located in cloud Git provider.
   */
  source?: Source | undefined;
  /** The training script file path to be executed. Cloud file URIs (such as dbfs:/, s3:/, adls:/, gcs:/) and workspace paths are supported. For python files stored in the <Databricks> workspace, the path must be absolute and begin with `/`. For files stored in a remote repository, the path must be relative. This field is required. */
  trainingScriptPath?: string | undefined;
  /** Optional path to a YAML file containing model parameters passed to the training script. */
  yamlParametersFilePath?: string | undefined;
  /**
   * Optional string containing model parameters passed to the training script in yaml format.
   * If present, then the content in yaml_parameters_file_path will be ignored.
   */
  yamlParameters?: string | undefined;
  /**
   * Optional string containing the name of the MLflow experiment to log the run to. If name is not
   * found, backend will create the mlflow experiment using the name.
   */
  mlflowExperimentName?: string | undefined;
}

/** Read-only state of the remote repository at the time the job was run. This field is only included on job runs. */
export interface UpdateGitMetadataSnapshot {
  /** Commit that was used to execute the run. If git_branch was specified, this points to the HEAD of the branch at the time of the run; if git_tag was specified, this points to the commit the tag points to. */
  usedCommit?: string | undefined;
}

/**
 * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
 *
 * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
 *
 * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
 */
export interface UpdateGitSource {
  /** URL of the repository to be cloned by this job. */
  gitUrl?: string | undefined;
  /** Unique identifier of the service used to host the Git repository. The value is case insensitive. */
  gitProvider?: string | undefined;
  gitReference?:
    | {
        $case: 'gitBranch';
        /** Name of the branch to be checked out and used by this job. This field cannot be specified in conjunction with git_tag or git_commit. */
        gitBranch: string;
      }
    | {
        $case: 'gitTag';
        /** Name of the tag to be checked out and used by this job. This field cannot be specified in conjunction with git_branch or git_commit. */
        gitTag: string;
      }
    | {
        $case: 'gitCommit';
        /** Commit to be checked out and used by this job. This field cannot be specified in conjunction with git_branch or git_tag. */
        gitCommit: string;
      }
    | undefined;
  gitSnapshot?: UpdateGitMetadataSnapshot | undefined;
  /** The source of the job specification in the remote repository when the job is source controlled. */
  jobSource?: UpdateJobSource | undefined;
  sparseCheckout?: UpdateSparseCheckout | undefined;
}

/** Config for an individual init script */
export interface UpdateInitScriptInfo {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * `{ "dbfs": { "destination" : "dbfs:/home/cluster_log" } }`
         */
        dbfs: UpdateDbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either the region or endpoint need to be provided. e.g.
         * `{ \"s3\": { \"destination\": \"s3://cluster_log_bucket/prefix\", \"region\": \"us-west-2\" } }`
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * `instance_profile_arn` has permission to write data to the s3 destination.
         */
        s3: UpdateS3StorageInfo;
      }
    | {
        $case: 'file';
        /**
         * destination needs to be provided, e.g.
         * `{ "file": { "destination": "file:/my/local/file.sh" } }`
         */
        file: UpdateLocalFileInfo;
      }
    | {
        $case: 'gcs';
        /**
         * destination needs to be provided, e.g.
         * `{ "gcs": { "destination": "gs://my-bucket/file.sh" } }`
         */
        gcs: UpdateGcsStorageInfo;
      }
    | {
        $case: 'abfss';
        /**
         * destination needs to be provided, e.g.
         * `abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/<directory-name>`
         */
        abfss: UpdateAdlsgen2Info;
      }
    | {
        $case: 'workspace';
        /**
         * destination needs to be provided, e.g.
         * `{ "workspace": { "destination": "/cluster-init-scripts/setup-datadog.sh" } }`
         */
        workspace: UpdateWorkspaceStorageInfo;
      }
    | {
        $case: 'volumes';
        /**
         * destination needs to be provided. e.g.
         * `{ \"volumes\" : { \"destination\" : \"/Volumes/my-init.sh\" } }`
         */
        volumes: UpdateVolumesStorageInfo;
      }
    | undefined;
}

export interface UpdateJobCluster {
  /**
   * A unique name for the job cluster. This field is required and must be unique within the job.
   * `JobTaskSettings` may refer to this field to determine which cluster to launch for the task execution.
   */
  jobClusterKey?: string | undefined;
  /** If new_cluster, a description of a cluster that is created for each task. */
  newCluster?: ClusterSpec_UpdateNewCluster | undefined;
}

export interface UpdateJobDeployment {
  /**
   * The kind of deployment that manages the job.
   *
   * * `BUNDLE`: The job is managed by Databricks Asset Bundle.
   * * `SYSTEM_MANAGED`: The job is managed by <Databricks> and is read-only.
   */
  kind?: JobDeployment_DeploymentKind | undefined;
  /** Path of the file that contains deployment metadata. */
  metadataFilePath?: string | undefined;
  /**
   * ID of the deployment that manages this job. Only set when `kind` is
   * `BUNDLE`. Used to look up deployment metadata from the Deployment
   * Metadata service.
   */
  deploymentId?: string | undefined;
  /**
   * ID of the version of the deployment that produced this job. Only set
   * when `kind` is `BUNDLE`. Identifies a specific snapshot of the deployment
   * in the Deployment Metadata service.
   */
  versionId?: string | undefined;
}

export interface UpdateJobEmailNotifications {
  /** A list of email addresses to be notified when a run begins. If not specified on job creation, reset, or update, the list is empty, and notifications are not sent. */
  onStart?: string[] | undefined;
  /** A list of email addresses to be notified when a run successfully completes. A run is considered to have completed successfully if it ends with a `TERMINATED` `life_cycle_state` and a `SUCCESS` result_state. If not specified on job creation, reset, or update, the list is empty, and notifications are not sent. */
  onSuccess?: string[] | undefined;
  /** A list of email addresses to be notified when a run unsuccessfully completes. A run is considered to have completed unsuccessfully if it ends with an `INTERNAL_ERROR` `life_cycle_state` or a `FAILED`, or `TIMED_OUT` result_state. If this is not specified on job creation, reset, or update the list is empty, and notifications are not sent. */
  onFailure?: string[] | undefined;
  /** A list of email addresses to be notified when the duration of a run exceeds the threshold specified for the `RUN_DURATION_SECONDS` metric in the `health` field. If no rule for the `RUN_DURATION_SECONDS` metric is specified in the `health` field for the job, notifications are not sent. */
  onDurationWarningThresholdExceeded?: string[] | undefined;
  /**
   * A list of email addresses to notify when any streaming backlog thresholds are exceeded for any stream.
   * Streaming backlog thresholds can be set in the `health` field using the following metrics: `STREAMING_BACKLOG_BYTES`, `STREAMING_BACKLOG_RECORDS`, `STREAMING_BACKLOG_SECONDS`, or `STREAMING_BACKLOG_FILES`.
   * Alerting is based on the 10-minute average of these metrics. If the issue persists, notifications are resent every 30 minutes.
   */
  onStreamingBacklogExceeded?: string[] | undefined;
  /**
   * If true, do not send email to recipients specified in `on_failure` if the run is skipped.
   * This field is `deprecated`. Please use the `notification_settings.no_alert_for_skipped_runs` field.
   */
  noAlertForSkippedRuns?: boolean | undefined;
}

export interface UpdateJobEnvironment {
  /** The key of an environment. It has to be unique within a job. */
  environmentKey?: string | undefined;
  spec?: UpdateEnvironment | undefined;
}

export interface UpdateJobLevelParameter {
  /** The name of the defined parameter. May only contain alphanumeric characters, `_`, `-`, and `.` */
  name?: string | undefined;
  /** Default value of the parameter. */
  default?: string | undefined;
}

export interface UpdateJobRequest {
  /** The canonical identifier of the job to update. This field is required. */
  jobId?: bigint | undefined;
  /**
   * The new settings for the job.
   *
   * Top-level fields specified in `new_settings` are completely replaced, except for arrays which are merged. That is, new and existing entries are completely replaced based on the respective key fields, i.e. `task_key` or `job_cluster_key`, while previous entries are kept.
   *
   * Partially updating nested fields is not supported.
   *
   * Changes to the field `JobSettings.timeout_seconds` are applied to active runs. Changes to other fields are applied to future runs only.
   */
  newSettings?: UpdateJobSettings | undefined;
  /** Remove top-level fields in the job settings. Removing nested fields is not supported, except for tasks and job clusters (`tasks/task_1`). This field is optional. */
  fieldsToRemove?: string[] | undefined;
}

/** Job was updated successfully. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateJobResponse {}

/**
 * Write-only setting. Specifies the user or service principal that the job runs as. If not specified, the job runs as the user who created the job.
 *
 * Either `user_name` or `service_principal_name` should be specified. If not, an error is thrown.
 */
export interface UpdateJobRunAs {
  identity?:
    | {
        $case: 'userName';
        /** The email of an active workspace user. Non-admin users can only set this field to their own email. */
        userName: string;
      }
    | {
        $case: 'servicePrincipalName';
        /** Application ID of an active service principal. Setting this field requires the `servicePrincipal/user` role. */
        servicePrincipalName: string;
      }
    | {
        $case: 'groupName';
        /** Group name of an account group assigned to the workspace. Setting this field requires being a member of the group. */
        groupName: string;
      }
    | undefined;
}

export interface UpdateJobSettings {
  /** An optional name for the job. The maximum length is 4096 bytes in UTF-8 encoding. */
  name?: string | undefined;
  /** An optional description for the job. The maximum length is 27700 characters in UTF-8 encoding. */
  description?: string | undefined;
  /** An optional set of email addresses that is notified when runs of this job begin or complete as well as when this job is deleted. */
  emailNotifications?: UpdateJobEmailNotifications | undefined;
  /** A collection of system notification IDs to notify when runs of this job begin or complete. */
  webhookNotifications?: UpdateWebhookNotifications | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this job. */
  notificationSettings?: UpdateNotificationSettings | undefined;
  /** An optional timeout applied to each run of this job. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  health?: UpdateJobsHealthRules | undefined;
  /** An optional periodic schedule for this job. The default behavior is that the job only runs when triggered by clicking “Run Now” in the Jobs UI or sending an API request to `runNow`. */
  schedule?: UpdateCronSchedule | undefined;
  /** A configuration to trigger a run when certain conditions are met. The default behavior is that the job runs only when triggered by clicking “Run Now” in the Jobs UI or sending an API request to `runNow`. */
  trigger?: UpdateTriggerSettings | undefined;
  /** An optional continuous property for this job. The continuous property will ensure that there is always one run executing. Only one of `schedule` and `continuous` can be used. */
  continuous?: UpdateContinuousSettings | undefined;
  /**
   * An optional maximum allowed number of concurrent runs of the job.
   * Set this value if you want to be able to execute multiple runs of the same job concurrently.
   * This is useful for example if you trigger your job on a frequent schedule and want to allow consecutive runs to overlap with each other, or if you want to trigger multiple runs which differ by their input parameters.
   * This setting affects only new runs. For example, suppose the job’s concurrency is 4 and there are 4 concurrent active runs. Then setting the concurrency to 3 won’t kill any of the active runs.
   * However, from then on, new runs are skipped unless there are fewer than 3 active runs.
   * This value cannot exceed 1000. Setting this value to `0` causes all new runs to be skipped.
   */
  maxConcurrentRuns?: number | undefined;
  /**
   * A list of task specifications to be executed by this job.
   * It supports up to 1000 elements in write endpoints (:method:jobs/create, :method:jobs/reset, :method:jobs/update, :method:jobs/submit).
   * Read endpoints return only 100 tasks. If more than 100 tasks are available, you can paginate through them using :method:jobs/get. Use the `next_page_token` field at the object root to determine if more results are available.
   */
  tasks?: UpdateTaskSettings[] | undefined;
  /** A list of job cluster specifications that can be shared and reused by tasks of this job. Libraries cannot be declared in a shared job cluster. You must declare dependent libraries in task settings. */
  jobClusters?: UpdateJobCluster[] | undefined;
  /**
   * An optional specification for a remote Git repository containing the source code used by tasks. Version-controlled source code is supported by notebook, dbt, Python script, and SQL File tasks.
   *
   * If `git_source` is set, these tasks retrieve the file from the remote repository by default. However, this behavior can be overridden by setting `source` to `WORKSPACE` on the task.
   *
   * Note: dbt and SQL File tasks support only version-controlled sources. If dbt or SQL File tasks are used, `git_source` must be defined on the job.
   */
  gitSource?: UpdateGitSource | undefined;
  /** A map of tags associated with the job. These are forwarded to the cluster as cluster tags for jobs clusters, and are subject to the same limitations as cluster tags. A maximum of 25 tags can be added to the job. */
  tags?: Record<string, string> | undefined;
  /** Used to tell what is the format of the job. This field is ignored in Create/Update/Reset calls. When using the Jobs API 2.1 this value is always set to `"MULTI_TASK"`. */
  format?: Format | undefined;
  /** The queue settings of the job. */
  queue?: UpdateQueueSettings | undefined;
  /** Job-level parameter definitions */
  parameters?: UpdateJobLevelParameter[] | undefined;
  /**
   * The user or service principal that the job runs as, if specified in the request.
   * This field indicates the explicit configuration of `run_as` for the job.
   * To find the value in all cases, explicit or implicit, use `run_as_user_name`.
   */
  runAs?: UpdateJobRunAs | undefined;
  /**
   * Edit mode of the job.
   *
   * * `UI_LOCKED`: The job is in a locked UI state and cannot be modified.
   * * `EDITABLE`: The job is in an editable state and can be modified.
   */
  editMode?: JobEditMode | undefined;
  /** Deployment information for jobs managed by external sources. */
  deployment?: UpdateJobDeployment | undefined;
  /**
   * A list of task execution environment specifications that can be referenced by serverless tasks of this job.
   * For serverless notebook tasks, if the environment_key is not specified, the notebook environment will be used if present. If a jobs environment is specified, it will override the notebook environment.
   * For other serverless tasks, the task environment is required to be specified using environment_key in the task settings.
   */
  environments?: UpdateJobEnvironment[] | undefined;
  /**
   * The id of the user specified budget policy to use for this job.
   * If not specified, a default budget policy may be applied when creating or modifying the job.
   * See `effective_budget_policy_id` for the budget policy used by this workload.
   */
  budgetPolicyId?: string | undefined;
  /**
   * The id of the user specified usage policy to use for this job.
   * If not specified, a default usage policy may be applied when creating or modifying the job.
   * See `effective_usage_policy_id` for the usage policy used by this workload.
   */
  usagePolicyId?: string | undefined;
  /**
   * The performance mode on a serverless job. This field determines the level of compute performance or cost-efficiency for the run.
   * The performance target does not apply to tasks that run on Serverless GPU compute.
   *
   * * `STANDARD`: Enables cost-efficient execution of serverless workloads.
   * * `PERFORMANCE_OPTIMIZED`: Prioritizes fast startup and execution times through rapid scaling and optimized cluster performance.
   */
  performanceTarget?: PerformanceTarget_PerformanceTarget | undefined;
  /** An optional maximum number of times to retry an unsuccessful run. A run is considered to be unsuccessful if it completes with the `FAILED` result_state or `INTERNAL_ERROR` `life_cycle_state`. The value `-1` means to retry indefinitely and the value `0` means to never retry. */
  maxRetries?: number | undefined;
  /** An optional minimal interval in milliseconds between the start of the failed run and the subsequent retry run. The default behavior is that unsuccessful runs are immediately retried. */
  minRetryIntervalMillis?: number | undefined;
  /**
   * An optional policy to specify whether to retry a job when it times out. The default behavior
   * is to not retry on timeout.
   */
  retryOnTimeout?: boolean | undefined;
  /** An option to disable auto optimization in serverless */
  disableAutoOptimization?: boolean | undefined;
}

/** The source of the job specification in the remote repository when the job is source controlled. */
export interface UpdateJobSource {
  /** Path of the job YAML file that contains the job specification. */
  jobConfigPath?: string | undefined;
  importFromGitReference?:
    | {
        $case: 'importFromGitBranch';
        /** Name of the branch which the job is imported from. */
        importFromGitBranch: string;
      }
    | undefined;
  /**
   * Dirty state indicates the job is not fully synced with the job specification in the remote repository.
   *
   * Possible values are:
   * * `NOT_SYNCED`: The job is not yet synced with the remote job specification. Import the remote job specification from UI to make the job fully synced.
   * * `DISCONNECTED`: The job is temporary disconnected from the remote job specification and is allowed for live edit. Import the remote job specification again from UI to make the job fully synced.
   */
  dirtyState?: JobSource_DirtyState | undefined;
}

export interface UpdateJobsHealthRule {
  metric?: JobsHealthMetric | undefined;
  op?: JobsHealthOperator | undefined;
  /** Specifies the threshold value that the health metric should obey to satisfy the health rule. */
  value?: bigint | undefined;
}

/** An optional set of health rules that can be defined for this job. */
export interface UpdateJobsHealthRules {
  rules?: UpdateJobsHealthRule[] | undefined;
}

export interface UpdateLibrary {
  lib?:
    | {
        $case: 'jar';
        /**
         * URI of the JAR library to install. Supported URIs include Workspace paths, Unity Catalog Volumes paths, and S3 URIs.
         * For example: `{ "jar": "/Workspace/path/to/library.jar" }`, `{ "jar" : "/Volumes/path/to/library.jar" }` or
         * `{ "jar": "s3://my-bucket/library.jar" }`.
         * If S3 is used, please make sure the cluster has read access on the library. You may need to
         * launch the cluster with an IAM role to access the S3 URI.
         */
        jar: string;
      }
    | {
        $case: 'egg';
        /** Deprecated. URI of the egg library to install. Installing Python egg files is deprecated and is not supported in Databricks Runtime 14.0 and above. */
        egg: string;
      }
    | {
        $case: 'pypi';
        /**
         * Specification of a PyPi library to be installed. For example:
         * `{ "package": "simplejson" }`
         */
        pypi: UpdatePythonPyPiLibrary;
      }
    | {
        $case: 'maven';
        /**
         * Specification of a maven library to be installed. For example:
         * `{ "coordinates": "org.jsoup:jsoup:1.7.2" }`
         */
        maven: UpdateMavenLibrary;
      }
    | {
        $case: 'cran';
        /** Specification of a CRAN library to be installed as part of the library */
        cran: UpdateRCranLibrary;
      }
    | {
        $case: 'whl';
        /**
         * URI of the wheel library to install. Supported URIs include Workspace paths, Unity Catalog Volumes paths, and S3 URIs.
         * For example: `{ "whl": "/Workspace/path/to/library.whl" }`, `{ "whl" : "/Volumes/path/to/library.whl" }` or
         * `{ "whl": "s3://my-bucket/library.whl" }`.
         * If S3 is used, please make sure the cluster has read access on the library. You may need to
         * launch the cluster with an IAM role to access the S3 URI.
         */
        whl: string;
      }
    | {
        $case: 'requirements';
        /**
         * URI of the requirements.txt file to install. Only Workspace paths and Unity Catalog Volumes paths are supported.
         * For example: `{ "requirements": "/Workspace/path/to/requirements.txt" }` or `{ "requirements" : "/Volumes/path/to/requirements.txt" }`
         */
        requirements: string;
      }
    | undefined;
}

export interface UpdateLocalFileInfo {
  /** local file destination, e.g. `file:/my/local/file.sh` */
  destination?: string | undefined;
}

export interface UpdateLogAnalyticsInfo {
  logAnalyticsWorkspaceId?: string | undefined;
  logAnalyticsPrimaryKey?: string | undefined;
}

export interface UpdateMavenLibrary {
  /** Gradle-style maven coordinates. For example: "org.jsoup:jsoup:1.7.2". */
  coordinates?: string | undefined;
  /**
   * Maven repo to install the Maven package from. If omitted, both Maven Central Repository
   * and Spark Packages are searched.
   */
  repo?: string | undefined;
  /**
   * List of dependences to exclude. For example: `["slf4j:slf4j", "*:hadoop-client"]`.
   *
   * Maven dependency exclusions:
   * https://maven.apache.org/guides/introduction/introduction-to-optional-and-excludes-dependencies.html.
   */
  exclusions?: string[] | undefined;
}

export interface UpdateModelTriggerConfiguration {
  /**
   * Name of the securable to monitor ("mycatalog.myschema.mymodel" in the case of model-level triggers,
   * "mycatalog.myschema" in the case of schema-level triggers) or empty in the case of metastore-level triggers.
   */
  securableName?: string | undefined;
  /** Aliases of the model versions to monitor. Can only be used in conjunction with condition MODEL_ALIAS_SET. */
  aliases?: string[] | undefined;
  /** The condition based on which to trigger a job run. */
  condition?: ModelTriggerConfiguration_ModelTriggerCondition | undefined;
  /**
   * If set, the trigger starts a run only after the specified amount of time has passed since
   * the last time the trigger fired. The minimum allowed value is 60 seconds.
   */
  minTimeBetweenTriggersSeconds?: number | undefined;
  /**
   * If set, the trigger starts a run only after no model updates have occurred for the specified time
   * and can be used to wait for a series of model updates before triggering a run. The
   * minimum allowed value is 60 seconds.
   */
  waitAfterLastChangeSeconds?: number | undefined;
}

/** Configuration for flexible node types, allowing fallback to alternate node types during cluster launch and upscale. */
export interface UpdateNodeTypeFlexibility {
  /** A list of node type IDs to use as fallbacks when the primary node type is unavailable. */
  alternateNodeTypeIds?: string[] | undefined;
}

export interface UpdateNotebookTask {
  /**
   * The path of the notebook to be run in the <Databricks> workspace or remote repository.
   * For notebooks stored in the <Databricks> workspace, the path must be absolute and begin with a slash.
   * For notebooks stored in a remote repository, the path must be relative. This field is required.
   */
  notebookPath?: string | undefined;
  /**
   * Base parameters to be used for each run of this job. If the run is initiated by a call to :method:jobs/run
   * Now with parameters specified, the two parameters maps are merged. If the same key is specified in
   * `base_parameters` and in `run-now`, the value from `run-now` is used.
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   *
   * If the notebook takes a parameter that is not specified in the job’s `base_parameters` or the `run-now` override parameters,
   * the default value from the notebook is used.
   *
   * Retrieve these parameters in a notebook using [dbutils.widgets.get](/dev-tools/databricks-utils.html#dbutils-widgets).
   *
   * The JSON representation of this field cannot exceed 1MB.
   */
  baseParameters?: Record<string, string> | undefined;
  /**
   * Optional location type of the notebook. When set to `WORKSPACE`, the notebook will be retrieved from the local <Databricks> workspace. When set to `GIT`, the notebook will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   * * `WORKSPACE`: Notebook is located in <Databricks> workspace.
   * * `GIT`: Notebook is located in cloud Git provider.
   */
  source?: Source | undefined;
  /**
   * Optional `warehouse_id` to run the notebook on a SQL warehouse. Classic SQL warehouses are NOT supported, please use serverless or pro SQL warehouses.
   *
   * Note that SQL warehouses only support SQL cells; if the notebook contains non-SQL cells, the run will fail.
   */
  warehouseId?: string | undefined;
}

export interface UpdateNotificationSettings {
  /** If true, do not send notifications to recipients specified in `on_failure` if the run is skipped. */
  noAlertForSkippedRuns?: boolean | undefined;
  /** If true, do not send notifications to recipients specified in `on_failure` if the run is canceled. */
  noAlertForCanceledRuns?: boolean | undefined;
  /** If true, do not send notifications to recipients specified in `on_start` for the retried runs and do not send notifications to recipients specified in `on_failure` until the last retry of the run. */
  alertOnLastAttempt?: boolean | undefined;
}

export interface UpdatePeriodicTriggerConfiguration {
  /** The interval at which the trigger should run. */
  interval?: number | undefined;
  /** The unit of time for the interval. */
  unit?: PeriodicTriggerConfiguration_TimeUnit | undefined;
}

export interface UpdatePipelineParameters {
  /** If true, triggers a full refresh on the spark declarative pipeline. */
  fullRefresh?: boolean | undefined;
  /** A list of tables to update without fullRefresh. */
  refreshSelection?: string[] | undefined;
  /** A list of tables to update with fullRefresh. */
  fullRefreshSelection?: string[] | undefined;
  /** A list of streaming flows to reset checkpoints without clearing data. */
  resetCheckpointSelection?: string[] | undefined;
  /**
   * Flow names to selectively refresh. These are unioned with other selective refresh
   * options (refresh_selection, full_refresh_selection) to determine the final set of flows to refresh.
   */
  refreshFlowSelection?: string[] | undefined;
}

export interface UpdatePipelineTask {
  /** The full name of the pipeline task to execute. */
  pipelineId?: string | undefined;
  /**
   * Key/value-map of parameters passed to the pipeline execution.
   * Limited to 10k characters in total.
   */
  pipelineTaskParameters?: Record<string, string> | undefined;
  /** If true, triggers a full refresh on the spark declarative pipeline. */
  fullRefresh?: boolean | undefined;
  /** A list of tables to update without fullRefresh. */
  refreshSelection?: string[] | undefined;
  /** A list of tables to update with fullRefresh. */
  fullRefreshSelection?: string[] | undefined;
  /** A list of streaming flows to reset checkpoints without clearing data. */
  resetCheckpointSelection?: string[] | undefined;
  /**
   * Flow names to selectively refresh. These are unioned with other selective refresh
   * options (refresh_selection, full_refresh_selection) to determine the final set of flows to refresh.
   */
  refreshFlowSelection?: string[] | undefined;
}

export interface UpdatePowerBiModel {
  /** The name of the Power BI workspace of the model */
  workspaceName?: string | undefined;
  /** The name of the Power BI model */
  modelName?: string | undefined;
  /** The default storage mode of the Power BI model */
  storageMode?: StorageMode | undefined;
  /** How the published Power BI model authenticates to <Databricks> */
  authenticationMethod?: AuthenticationMethod | undefined;
  /** Whether to overwrite existing Power BI models */
  overwriteExisting?: boolean | undefined;
}

export interface UpdatePowerBiTable {
  /** The table name in <Databricks> */
  name?: string | undefined;
  /** The catalog name in <Databricks> */
  catalog?: string | undefined;
  /** The schema name in <Databricks> */
  schema?: string | undefined;
  /** The Power BI storage mode of the table */
  storageMode?: StorageMode | undefined;
}

export interface UpdatePowerBiTask {
  /** The tables to be exported to Power BI */
  tables?: UpdatePowerBiTable[] | undefined;
  /** The SQL warehouse ID to use as the Power BI data source */
  warehouseId?: string | undefined;
  /** The semantic model to update */
  powerBiModel?: UpdatePowerBiModel | undefined;
  /** The resource name of the UC connection to authenticate from <Databricks> to Power BI */
  connectionResourceName?: string | undefined;
  /** Whether the model should be refreshed after the update */
  refreshAfterUpdate?: boolean | undefined;
}

export interface UpdatePythonOperatorTask {
  /**
   * An ordered list of task parameters.
   * TODO(JOBS-30885): Add limits for parameters.
   */
  parameters?: PythonOperatorTask_UpdateParameter[] | undefined;
  /**
   * Fully qualified name of the main class or function.
   * For example, `my_project.my_function` or `my_project.MyOperator`.
   */
  main?: string | undefined;
}

export interface UpdatePythonPyPiLibrary {
  /**
   * The name of the pypi package to install. An optional exact version specification is also
   * supported. Examples: "simplejson" and "simplejson==3.8.0".
   */
  package?: string | undefined;
  /**
   * The repository where the package can be found. If not specified, the default pip index is
   * used.
   */
  repo?: string | undefined;
}

export interface UpdatePythonWheelTask {
  /** Name of the package to execute */
  packageName?: string | undefined;
  /** Named entry point to use, if it does not exist in the metadata of the package it executes the function from the package directly using `$packageName.$entryPoint()` */
  entryPoint?: string | undefined;
  /** Command-line parameters passed to Python wheel task. Leave it empty if `named_parameters` is not null. */
  parameters?: string[] | undefined;
  /** Command-line parameters passed to Python wheel task in the form of `["--name=task", "--data=dbfs:/path/to/data.json"]`. Leave it empty if `parameters` is not null. */
  namedParameters?: Record<string, string> | undefined;
}

export interface UpdateQueueSettings {
  /** If true, enable queueing for the job. This is a required field. */
  enabled?: boolean | undefined;
}

export interface UpdateRCranLibrary {
  /** The name of the CRAN package to install. */
  package?: string | undefined;
  /** The repository where the package can be found. If not specified, the default CRAN repo is used. */
  repo?: string | undefined;
}

export interface UpdateRunJobTask {
  /** ID of the job to trigger. */
  jobId?: bigint | undefined;
  /** Job-level parameters used to trigger the job. */
  jobParameters?: Record<string, string> | undefined;
  /** Controls whether the pipeline should perform a full refresh */
  pipelineParams?: UpdatePipelineParameters | undefined;
  /**
   * A list of parameters for jobs with Spark JAR tasks, for example `"jar_params": ["john doe", "35"]`.
   * The parameters are used to invoke the main function of the main class specified in the Spark JAR task.
   * If not specified upon `run-now`, it defaults to an empty list.
   * jar_params cannot be specified in conjunction with notebook_params.
   * The JSON representation of this field (for example `{"jar_params":["john doe","35"]}`) cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  jarParams?: string[] | undefined;
  /**
   * A map from keys to values for jobs with notebook task, for example `"notebook_params": {"name": "john doe", "age": "35"}`.
   * The map is passed to the notebook and is accessible through the [dbutils.widgets.get](/dev-tools/databricks-utils.html) function.
   *
   * If not specified upon `run-now`, the triggered run uses the job’s base parameters.
   *
   * notebook_params cannot be specified in conjunction with jar_params.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * The JSON representation of this field (for example `{"notebook_params":{"name":"john doe","age":"35"}}`) cannot exceed 10,000 bytes.
   */
  notebookParams?: Record<string, string> | undefined;
  /**
   * A list of parameters for jobs with Python tasks, for example `"python_params": ["john doe", "35"]`.
   * The parameters are passed to Python file as command-line parameters. If specified upon `run-now`, it would overwrite
   * the parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  pythonParams?: string[] | undefined;
  /**
   * A list of parameters for jobs with spark submit task, for example `"spark_submit_params": ["--class", "org.apache.spark.examples.SparkPi"]`.
   * The parameters are passed to spark-submit script as command-line parameters. If specified upon `run-now`, it would overwrite the
   * parameters specified in job setting. The JSON representation of this field (for example `{"python_params":["john doe","35"]}`)
   * cannot exceed 10,000 bytes.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   *
   * Important
   *
   * These parameters accept only Latin characters (ASCII character set). Using non-ASCII characters returns an error.
   * Examples of invalid, non-ASCII characters are Chinese, Japanese kanjis, and emojis.
   */
  sparkSubmitParams?: string[] | undefined;
  pythonNamedParams?: Record<string, string> | undefined;
  /**
   * A map from keys to values for jobs with SQL task, for example `"sql_params": {"name": "john doe", "age": "35"}`. The SQL alert task does not support custom parameters.
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  sqlParams?: Record<string, string> | undefined;
  /**
   * An array of commands to execute for jobs with the dbt task, for example `"dbt_commands": ["dbt deps", "dbt seed", "dbt deps", "dbt seed", "dbt run"]`
   *
   * ⚠ **Deprecation note** Use [job parameters](/jobs/job-parameters.html#job-parameter-pushdown) to pass information down to tasks.
   */
  dbtCommands?: string[] | undefined;
}

/** A storage location in Amazon S3 */
export interface UpdateS3StorageInfo {
  /**
   * S3 destination, e.g. `s3://my-bucket/some-prefix` Note that logs will be delivered using
   * cluster iam role, please make sure you set cluster iam role and the role has write access to the
   * destination. Please also note that you cannot use AWS keys to deliver logs.
   */
  destination?: string | undefined;
  /**
   * S3 region, e.g. `us-west-2`. Either region or endpoint needs to be set. If both are set,
   * endpoint will be used.
   */
  region?: string | undefined;
  /**
   * S3 endpoint, e.g. `https://s3-us-west-2.amazonaws.com`. Either region or endpoint needs to be set.
   * If both are set, endpoint will be used.
   */
  endpoint?: string | undefined;
  /** (Optional) Flag to enable server side encryption, `false` by default. */
  enableEncryption?: boolean | undefined;
  /**
   * (Optional) The encryption type, it could be `sse-s3` or `sse-kms`. It will be used only when
   * encryption is enabled and the default type is `sse-s3`.
   */
  encryptionType?: string | undefined;
  /** (Optional) Kms key which will be used if encryption is enabled and encryption type is set to `sse-kms`. */
  kmsKey?: string | undefined;
  /**
   * (Optional) Set canned access control list for the logs, e.g. `bucket-owner-full-control`.
   * If `canned_cal` is set, please make sure the cluster iam role has `s3:PutObjectAcl` permission on
   * the destination bucket and prefix. The full list of possible canned acl can be found at
   * http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl.
   * Please also note that by default only the object owner gets full controls. If you are using cross account
   * role for writing data, you may want to set `bucket-owner-full-control` to make bucket owner able to
   * read the logs.
   */
  cannedAcl?: string | undefined;
}

export interface UpdateSparkJarTask {
  /**
   * Deprecated since 04/2016. For classic compute, provide a `jar` through the `libraries` field instead. For serverless compute, provide a `jar` though the `java_dependencies` field inside the `environments` list.
   *
   * See the examples of classic and serverless compute usage at the top of the page.
   */
  jarUri?: string | undefined;
  /**
   * The full name of the class containing the main method to be executed. This class must be contained in a JAR provided as a library.
   *
   * The code must use `SparkContext.getOrCreate` to obtain a Spark context; otherwise, runs of the job fail.
   */
  mainClassName?: string | undefined;
  /**
   * Parameters passed to the main method.
   *
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   */
  parameters?: string[] | undefined;
  /** Deprecated. A value of `false` is no longer supported. */
  runAsRepl?: boolean | undefined;
}

export interface UpdateSparkPythonTask {
  /** The Python file to be executed. Cloud file URIs (such as dbfs:/, s3:/, adls:/, gcs:/) and workspace paths are supported. For python files stored in the <Databricks> workspace, the path must be absolute and begin with `/`. For files stored in a remote repository, the path must be relative. This field is required. */
  pythonFile?: string | undefined;
  /**
   * Command line parameters passed to the Python file.
   *
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   */
  parameters?: string[] | undefined;
  /**
   * Optional location type of the Python file. When set to `WORKSPACE` or not specified, the file will be retrieved from the local
   * <Databricks> workspace or cloud location (if the `python_file` has a URI format). When set to `GIT`,
   * the Python file will be retrieved from a Git repository defined in `git_source`.
   *
   * * `WORKSPACE`: The Python file is located in a <Databricks> workspace or at a cloud filesystem URI.
   * * `GIT`: The Python file is located in a remote Git repository.
   */
  source?: Source | undefined;
}

export interface UpdateSparkSubmitTask {
  /**
   * Command-line parameters passed to spark submit.
   *
   * Use [Task parameter variables](/jobs.html#parameter-variables) to set parameters containing information about job runs.
   */
  parameters?: string[] | undefined;
}

export interface UpdateSparseCheckout {
  /** List of patterns to include for sparse checkout. */
  patterns?: string[] | undefined;
}

export interface UpdateSqlTask {
  /** Parameters to be used for each run of this job. The SQL alert task does not support custom parameters. */
  parameters?: Record<string, string> | undefined;
  sqlTaskType?:
    | {
        $case: 'query';
        /** If query, indicates that this job must execute a SQL query. */
        query: UpdateSqlTaskQuery;
      }
    | {
        $case: 'dashboard';
        /** If dashboard, indicates that this job must refresh a SQL dashboard. */
        dashboard: UpdateSqlTaskDashboard;
      }
    | {
        $case: 'alert';
        /** If alert, indicates that this job must refresh a SQL alert. */
        alert: UpdateSqlTaskAlert;
      }
    | {
        $case: 'file';
        /** If file, indicates that this job runs a SQL file in a remote Git repository. */
        file: UpdateSqlTaskFile;
      }
    | undefined;
  /** The canonical identifier of the SQL warehouse. Recommended to use with serverless or pro SQL warehouses. Classic SQL warehouses are only supported for SQL alert, dashboard and query tasks and are limited to scheduled single-task jobs. */
  warehouseId?: string | undefined;
}

export interface UpdateSqlTaskAlert {
  /** The canonical identifier of the SQL alert. */
  alertId?: string | undefined;
  /** If specified, alert notifications are sent to subscribers. */
  subscriptions?: UpdateSqlTaskSubscription[] | undefined;
  /** If true, the alert notifications are not sent to subscribers. */
  pauseSubscriptions?: boolean | undefined;
}

export interface UpdateSqlTaskDashboard {
  /** The canonical identifier of the SQL dashboard. */
  dashboardId?: string | undefined;
  /** If specified, dashboard snapshots are sent to subscriptions. */
  subscriptions?: UpdateSqlTaskSubscription[] | undefined;
  /** Subject of the email sent to subscribers of this task. */
  customSubject?: string | undefined;
  /** If true, the dashboard snapshot is not taken, and emails are not sent to subscribers. */
  pauseSubscriptions?: boolean | undefined;
}

export interface UpdateSqlTaskFile {
  /** Path of the SQL file. Must be relative if the source is a remote Git repository and absolute for workspace paths. */
  path?: string | undefined;
  /**
   * Optional location type of the SQL file. When set to `WORKSPACE`, the SQL file will be retrieved
   * from the local <Databricks> workspace. When set to `GIT`, the SQL file will be retrieved from a Git repository
   * defined in `git_source`. If the value is empty, the task will use `GIT` if `git_source` is defined and `WORKSPACE` otherwise.
   *
   * * `WORKSPACE`: SQL file is located in <Databricks> workspace.
   * * `GIT`: SQL file is located in cloud Git provider.
   */
  source?: Source | undefined;
}

export interface UpdateSqlTaskQuery {
  queryType?:
    | {
        $case: 'queryId';
        /** The canonical identifier of the SQL query. */
        queryId: string;
      }
    | undefined;
}

export interface UpdateSqlTaskSubscription {
  subscriptionType?:
    | {
        $case: 'userName';
        /** The user name to receive the subscription email. This parameter is mutually exclusive with destination_id. You cannot set both destination_id and user_name for subscription notifications. */
        userName: string;
      }
    | {
        $case: 'destinationId';
        /** The canonical identifier of the destination to receive email notification. This parameter is mutually exclusive with user_name. You cannot set both destination_id and user_name for subscription notifications. */
        destinationId: string;
      }
    | undefined;
}

export interface UpdateSubscription {
  /** The list of subscribers to send the snapshot of the dashboard to. */
  subscribers?: Subscription_UpdateSubscriber[] | undefined;
  /** When true, the subscription will not send emails. */
  paused?: boolean | undefined;
  /**
   * Optional: Allows users to specify a custom subject line on the email sent
   * to subscribers.
   */
  customSubject?: string | undefined;
}

export interface UpdateTableTriggerConfiguration {
  /** A list of tables to monitor for changes. The table name must be in the format `catalog_name.schema_name.table_name`. */
  tableNames?: string[] | undefined;
  /**
   * If set, the trigger starts a run only after the specified amount of time has passed since
   * the last time the trigger fired. The minimum allowed value is 60 seconds.
   */
  minTimeBetweenTriggersSeconds?: number | undefined;
  /**
   * If set, the trigger starts a run only after no table updates have occurred for the specified time
   * and can be used to wait for a series of table updates before triggering a run. The
   * minimum allowed value is 60 seconds.
   */
  waitAfterLastChangeSeconds?: number | undefined;
  /** The table(s) condition based on which to trigger a job run. */
  condition?: TableTriggerConfiguration_Condition | undefined;
}

export interface UpdateTaskDependency {
  /** The name of the task this task depends on. */
  taskKey?: string | undefined;
  /** Can only be specified on condition task dependencies. The outcome of the dependent task that must be met for this task to run. */
  outcome?: string | undefined;
}

export interface UpdateTaskSettings {
  /**
   * A unique name for the task. This field is used to refer to this task from other tasks.
   * This field is required and must be unique within its parent job.
   * On Update or Reset, this field is used to reference the tasks to be updated or reset.
   */
  taskKey?: string | undefined;
  /**
   * An optional array of objects specifying the dependency graph of the task. All tasks specified in this field must complete before executing this task. The task will run only if the `run_if` condition is true.
   * The key is `task_key`, and the value is the name assigned to the dependent task.
   */
  dependsOn?: UpdateTaskDependency[] | undefined;
  /**
   * An optional value specifying the condition determining whether the task is run once its dependencies have been completed.
   *
   * * `ALL_SUCCESS`: All dependencies have executed and succeeded
   * * `AT_LEAST_ONE_SUCCESS`: At least one dependency has succeeded
   * * `NONE_FAILED`: None of the dependencies have failed and at least one was executed
   * * `ALL_DONE`: All dependencies have been completed
   * * `AT_LEAST_ONE_FAILED`: At least one dependency failed
   * * `ALL_FAILED`: ALl dependencies have failed
   */
  runIf?: TaskDependencyType | undefined;
  /** An optional timeout applied to each run of this job task. A value of `0` means no timeout. */
  timeoutSeconds?: number | undefined;
  health?: UpdateJobsHealthRules | undefined;
  /** An optional set of email addresses that is notified when runs of this task begin or complete as well as when this task is deleted. The default behavior is to not send any emails. */
  emailNotifications?: UpdateJobEmailNotifications | undefined;
  /** Optional notification settings that are used when sending notifications to each of the `email_notifications` and `webhook_notifications` for this task. */
  notificationSettings?: UpdateNotificationSettings | undefined;
  /** A collection of system notification IDs to notify when runs of this task begin or complete. The default behavior is to not send any system notifications. */
  webhookNotifications?: UpdateWebhookNotifications | undefined;
  /** An optional description for this task. */
  description?: string | undefined;
  environmentRef?:
    | {
        $case: 'environmentKey';
        /** The key that references an environment spec in a job. This field is required for Python script, Python wheel and dbt tasks when using serverless compute. */
        environmentKey: string;
      }
    | undefined;
  /** An optional flag to disable the task. If set to true, the task will not run even if it is part of a job. */
  disabled?: boolean | undefined;
  /** Task level compute configuration. */
  compute?: UpdateCompute | undefined;
  /** DO NOT ADD ANY NEW FIELDS TO JobTask OUTSIDE OF THIS ONEOF as it will break the TaskRegistry */
  task?:
    | {
        $case: 'notebookTask';
        /** The task runs a notebook when the `notebook_task` field is present. */
        notebookTask: UpdateNotebookTask;
      }
    | {
        $case: 'sparkJarTask';
        /** The task runs a JAR when the `spark_jar_task` field is present. */
        sparkJarTask: UpdateSparkJarTask;
      }
    | {
        $case: 'sparkPythonTask';
        /** The task runs a Python file when the `spark_python_task` field is present. */
        sparkPythonTask: UpdateSparkPythonTask;
      }
    | {
        $case: 'sparkSubmitTask';
        /** (Legacy) The task runs the spark-submit script when the spark_submit_task field is present. Databricks recommends using the spark_jar_task instead; see [Spark Submit task for jobs](/jobs/spark-submit). */
        sparkSubmitTask: UpdateSparkSubmitTask;
      }
    | {
        $case: 'pipelineTask';
        /** The task triggers a pipeline update when the `pipeline_task` field is present. Only pipelines configured to use triggered more are supported. */
        pipelineTask: UpdatePipelineTask;
      }
    | {
        $case: 'pythonWheelTask';
        /** The task runs a Python wheel when the `python_wheel_task` field is present. */
        pythonWheelTask: UpdatePythonWheelTask;
      }
    | {
        $case: 'dbtTask';
        /** The task runs one or more dbt commands when the `dbt_task` field is present. The dbt task requires both Databricks SQL and the ability to use a serverless or a pro SQL warehouse. */
        dbtTask: UpdateDbtTask;
      }
    | {
        $case: 'sqlTask';
        /** The task runs a SQL query or file, or it refreshes a SQL alert or a legacy SQL dashboard when the `sql_task` field is present. */
        sqlTask: UpdateSqlTask;
      }
    | {
        $case: 'runJobTask';
        /** The task triggers another job when the `run_job_task` field is present. */
        runJobTask: UpdateRunJobTask;
      }
    | {
        $case: 'conditionTask';
        /**
         * The task evaluates a condition that can be used to control the execution of other tasks when the `condition_task` field is present.
         * The condition task does not require a cluster to execute and does not support retries or notifications.
         */
        conditionTask: UpdateConditionTask;
      }
    | {
        $case: 'forEachTask';
        /** The task executes a nested task for every input provided when the `for_each_task` field is present. */
        forEachTask: UpdateForEachTask;
      }
    | {
        $case: 'cleanRoomsNotebookTask';
        /**
         * The task runs a [clean rooms](/clean-rooms/index.html) notebook
         * when the `clean_rooms_notebook_task` field is present.
         */
        cleanRoomsNotebookTask: UpdateCleanRoomsNotebookTask;
      }
    | {$case: 'genAiComputeTask'; genAiComputeTask: UpdateGenAiComputeTask}
    | {
        $case: 'alertTask';
        /**
         * The task evaluates a <Databricks> alert and sends notifications to subscribers
         * when the `alert_task` field is present.
         */
        alertTask: UpdateAlertTask;
      }
    | {
        $case: 'powerBiTask';
        /** The task triggers a Power BI semantic model update when the `power_bi_task` field is present. */
        powerBiTask: UpdatePowerBiTask;
      }
    | {
        $case: 'dashboardTask';
        /** The task refreshes a dashboard and sends a snapshot to subscribers. */
        dashboardTask: UpdateDashboardTask;
      }
    | {
        $case: 'dbtCloudTask';
        /** Task type for dbt cloud, deprecated in favor of the new name dbt_platform_task */
        dbtCloudTask: UpdateDbtCloudTask;
      }
    | {$case: 'dbtPlatformTask'; dbtPlatformTask: UpdateDbtPlatformTask}
    | {
        $case: 'pythonOperatorTask';
        /** The task runs a Python operator task. */
        pythonOperatorTask: UpdatePythonOperatorTask;
      }
    | {
        $case: 'aiRuntimeTask';
        /**
         * The task runs a multi-node GPU compute workload on Databricks AI Runtime.
         * External-facing surface; mirrors the AIR CLI (fka SGCLI) v2 YAML schema.
         */
        aiRuntimeTask: UpdateAiRuntimeTask;
      }
    | undefined;
  spec?:
    | {
        $case: 'existingClusterId';
        /**
         * If existing_cluster_id, the ID of an existing cluster that is used for all runs.
         * When running jobs or tasks on an existing cluster, you may need to manually restart
         * the cluster if it stops responding. We suggest running jobs and tasks on new clusters for
         * greater reliability
         */
        existingClusterId: string;
      }
    | {
        $case: 'newCluster';
        /** If new_cluster, a description of a new cluster that is created for each run. */
        newCluster: ClusterSpec_UpdateNewCluster;
      }
    | {
        $case: 'jobClusterKey';
        /** If job_cluster_key, this task is executed reusing the cluster specified in `job.settings.job_clusters`. */
        jobClusterKey: string;
      }
    | undefined;
  /**
   * An optional list of libraries to be installed on the cluster.
   * The default value is an empty list.
   */
  libraries?: UpdateLibrary[] | undefined;
  /** An optional maximum number of times to retry an unsuccessful run. A run is considered to be unsuccessful if it completes with the `FAILED` result_state or `INTERNAL_ERROR` `life_cycle_state`. The value `-1` means to retry indefinitely and the value `0` means to never retry. */
  maxRetries?: number | undefined;
  /** An optional minimal interval in milliseconds between the start of the failed run and the subsequent retry run. The default behavior is that unsuccessful runs are immediately retried. */
  minRetryIntervalMillis?: number | undefined;
  /**
   * An optional policy to specify whether to retry a job when it times out. The default behavior
   * is to not retry on timeout.
   */
  retryOnTimeout?: boolean | undefined;
  /** An option to disable auto optimization in serverless */
  disableAutoOptimization?: boolean | undefined;
}

export interface UpdateTriggerSettings {
  /** Whether this trigger is paused or not. */
  pauseStatus?: SchedulePauseStatus | undefined;
  configuration?:
    | {
        $case: 'fileArrival';
        /** File arrival trigger settings. */
        fileArrival: UpdateFileArrivalTriggerConfiguration;
      }
    | {
        $case: 'periodic';
        /** Periodic trigger settings. */
        periodic: UpdatePeriodicTriggerConfiguration;
      }
    | {$case: 'tableUpdate'; tableUpdate: UpdateTableTriggerConfiguration}
    | {$case: 'model'; model: UpdateModelTriggerConfiguration}
    | undefined;
}

/** A storage location back by UC Volumes. */
export interface UpdateVolumesStorageInfo {
  /**
   * UC Volumes destination, e.g. `/Volumes/catalog/schema/vol1/init-scripts/setup-datadog.sh`
   * or `dbfs:/Volumes/catalog/schema/vol1/init-scripts/setup-datadog.sh`
   */
  destination?: string | undefined;
}

export interface UpdateWebhook {
  id?: string | undefined;
}

export interface UpdateWebhookNotifications {
  /** An optional list of system notification IDs to call when the run starts. A maximum of 3 destinations can be specified for the `on_start` property. */
  onStart?: UpdateWebhook[] | undefined;
  /** An optional list of system notification IDs to call when the run completes successfully. A maximum of 3 destinations can be specified for the `on_success` property. */
  onSuccess?: UpdateWebhook[] | undefined;
  /** An optional list of system notification IDs to call when the run fails. A maximum of 3 destinations can be specified for the `on_failure` property. */
  onFailure?: UpdateWebhook[] | undefined;
  /** An optional list of system notification IDs to call when the duration of a run exceeds the threshold specified for the `RUN_DURATION_SECONDS` metric in the `health` field. A maximum of 3 destinations can be specified for the `on_duration_warning_threshold_exceeded` property. */
  onDurationWarningThresholdExceeded?: UpdateWebhook[] | undefined;
  /**
   * An optional list of system notification IDs to call when any streaming backlog thresholds are exceeded for any stream.
   * Streaming backlog thresholds can be set in the `health` field using the following metrics: `STREAMING_BACKLOG_BYTES`, `STREAMING_BACKLOG_RECORDS`, `STREAMING_BACKLOG_SECONDS`, or `STREAMING_BACKLOG_FILES`.
   * Alerting is based on the 10-minute average of these metrics. If the issue persists, notifications are resent every 30 minutes.
   * A maximum of 3 destinations can be specified for the `on_streaming_backlog_exceeded` property.
   */
  onStreamingBacklogExceeded?: UpdateWebhook[] | undefined;
}

/** Cluster Attributes showing for clusters workload types. */
export interface UpdateWorkloadType {
  /** defined what type of clients can use the cluster. E.g. Notebooks, Jobs */
  clients?: WorkloadType_UpdateClientsTypes | undefined;
}

/** A storage location in Workspace Filesystem (WSFS) */
export interface UpdateWorkspaceStorageInfo {
  /** wsfs destination, e.g. `workspace:/cluster-init-scripts/setup-datadog.sh` */
  destination?: string | undefined;
}

export interface ViewItem {
  /** Content of the view. */
  content?: string | undefined;
  /** Name of the view item. In the case of code view, it would be the notebook’s name. In the case of dashboard view, it would be the dashboard’s name. */
  name?: string | undefined;
  /** Type of the view item. */
  type?: ViewType | undefined;
}

/** A storage location back by UC Volumes. */
export interface VolumesStorageInfo {
  /**
   * UC Volumes destination, e.g. `/Volumes/catalog/schema/vol1/init-scripts/setup-datadog.sh`
   * or `dbfs:/Volumes/catalog/schema/vol1/init-scripts/setup-datadog.sh`
   */
  destination?: string | undefined;
}

export interface Webhook {
  id?: string | undefined;
}

export interface WebhookNotifications {
  /** An optional list of system notification IDs to call when the run starts. A maximum of 3 destinations can be specified for the `on_start` property. */
  onStart?: Webhook[] | undefined;
  /** An optional list of system notification IDs to call when the run completes successfully. A maximum of 3 destinations can be specified for the `on_success` property. */
  onSuccess?: Webhook[] | undefined;
  /** An optional list of system notification IDs to call when the run fails. A maximum of 3 destinations can be specified for the `on_failure` property. */
  onFailure?: Webhook[] | undefined;
  /** An optional list of system notification IDs to call when the duration of a run exceeds the threshold specified for the `RUN_DURATION_SECONDS` metric in the `health` field. A maximum of 3 destinations can be specified for the `on_duration_warning_threshold_exceeded` property. */
  onDurationWarningThresholdExceeded?: Webhook[] | undefined;
  /**
   * An optional list of system notification IDs to call when any streaming backlog thresholds are exceeded for any stream.
   * Streaming backlog thresholds can be set in the `health` field using the following metrics: `STREAMING_BACKLOG_BYTES`, `STREAMING_BACKLOG_RECORDS`, `STREAMING_BACKLOG_SECONDS`, or `STREAMING_BACKLOG_FILES`.
   * Alerting is based on the 10-minute average of these metrics. If the issue persists, notifications are resent every 30 minutes.
   * A maximum of 3 destinations can be specified for the `on_streaming_backlog_exceeded` property.
   */
  onStreamingBacklogExceeded?: Webhook[] | undefined;
}

export interface WidgetErrorDetail {
  message?: string | undefined;
}

/** Cluster Attributes showing for clusters workload types. */
export interface WorkloadType {
  /** defined what type of clients can use the cluster. E.g. Notebooks, Jobs */
  clients?: WorkloadType_ClientsTypes | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface WorkloadType_ClientsTypes {
  /** With notebooks set, this cluster can be used for notebooks */
  notebooks?: boolean | undefined;
  /** With jobs set, the cluster can be used for jobs */
  jobs?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface WorkloadType_CreateClientsTypes {
  /** With notebooks set, this cluster can be used for notebooks */
  notebooks?: boolean | undefined;
  /** With jobs set, the cluster can be used for jobs */
  jobs?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface WorkloadType_UpdateClientsTypes {
  /** With notebooks set, this cluster can be used for notebooks */
  notebooks?: boolean | undefined;
  /** With jobs set, the cluster can be used for jobs */
  jobs?: boolean | undefined;
}

/** A storage location in Workspace Filesystem (WSFS) */
export interface WorkspaceStorageInfo {
  /** wsfs destination, e.g. `workspace:/cluster-init-scripts/setup-datadog.sh` */
  destination?: string | undefined;
}

export const unmarshalAdlsgen2InfoSchema: z.ZodType<Adlsgen2Info> = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const unmarshalAiRuntimeTaskSchema: z.ZodType<AiRuntimeTask> = z
  .object({
    experiment: z.string().optional(),
    deployments: z
      .array(z.lazy(() => unmarshalDeploymentSpecSchema))
      .optional(),
    code_source_path: z.string().optional(),
    mlflow_run: z.string().optional(),
    mlflow_experiment_directory: z.string().optional(),
  })
  .transform(d => ({
    experiment: d.experiment,
    deployments: d.deployments,
    codeSourcePath: d.code_source_path,
    mlflowRun: d.mlflow_run,
    mlflowExperimentDirectory: d.mlflow_experiment_directory,
  }));

export const unmarshalAiRuntimeTaskOutputSchema: z.ZodType<AiRuntimeTaskOutput> =
  z
    .object({
      mlflow_experiment_id: z.string().optional(),
      mlflow_run_id: z.string().optional(),
      status_message: z.string().optional(),
    })
    .transform(d => ({
      mlflowExperimentId: d.mlflow_experiment_id,
      mlflowRunId: d.mlflow_run_id,
      statusMessage: d.status_message,
    }));

export const unmarshalAlertTaskSchema: z.ZodType<AlertTask> = z
  .object({
    alert_id: z.string().optional(),
    warehouse_id: z.string().optional(),
    workspace_path: z.string().optional(),
    subscribers: z
      .array(z.lazy(() => unmarshalAlertTaskSubscriberSchema))
      .optional(),
  })
  .transform(d => ({
    alertId: d.alert_id,
    warehouseId: d.warehouse_id,
    workspacePath: d.workspace_path,
    subscribers: d.subscribers,
  }));

export const unmarshalAlertTaskOutputSchema: z.ZodType<AlertTaskOutput> = z
  .object({
    alert_state: z.string().optional(),
  })
  .transform(d => ({
    alertState: d.alert_state,
  }));

export const unmarshalAlertTaskSubscriberSchema: z.ZodType<AlertTaskSubscriber> =
  z
    .object({
      user_name: z.string().optional(),
      destination_id: z.string().optional(),
    })
    .transform(d => ({
      subscriberType:
        d.user_name !== undefined
          ? {$case: 'userName' as const, userName: d.user_name}
          : d.destination_id !== undefined
            ? {$case: 'destinationId' as const, destinationId: d.destination_id}
            : undefined,
    }));

export const unmarshalAutoScaleSchema: z.ZodType<AutoScale> = z
  .object({
    min_workers: z.number().optional(),
    max_workers: z.number().optional(),
  })
  .transform(d => ({
    minWorkers: d.min_workers,
    maxWorkers: d.max_workers,
  }));

export const unmarshalAwsAttributesSchema: z.ZodType<AwsAttributes> = z
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

export const unmarshalAzureAttributesSchema: z.ZodType<AzureAttributes> = z
  .object({
    log_analytics_info: z
      .lazy(() => unmarshalLogAnalyticsInfoSchema)
      .optional(),
    first_on_demand: z.number().optional(),
    availability: z.string().optional(),
    spot_bid_max_price: z.number().optional(),
    capacity_reservation_group: z.string().optional(),
  })
  .transform(d => ({
    logAnalyticsInfo: d.log_analytics_info,
    firstOnDemand: d.first_on_demand,
    availability: d.availability,
    spotBidMaxPrice: d.spot_bid_max_price,
    capacityReservationGroup: d.capacity_reservation_group,
  }));

export const unmarshalBaseJobSchema: z.ZodType<BaseJob> = z
  .object({
    job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    creator_user_name: z.string().optional(),
    run_as_user_name: z.string().optional(),
    settings: z.lazy(() => unmarshalJobSettingsSchema).optional(),
    created_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    trigger_state: z.lazy(() => unmarshalTriggerStateSchema).optional(),
    has_more: z.boolean().optional(),
    effective_budget_policy_id: z.string().optional(),
    effective_usage_policy_id: z.string().optional(),
  })
  .transform(d => ({
    jobId: d.job_id,
    creatorUserName: d.creator_user_name,
    runAsUserName: d.run_as_user_name,
    settings: d.settings,
    createdTime: d.created_time,
    triggerState: d.trigger_state,
    hasMore: d.has_more,
    effectiveBudgetPolicyId: d.effective_budget_policy_id,
    effectiveUsagePolicyId: d.effective_usage_policy_id,
  }));

export const unmarshalBaseRunSchema: z.ZodType<BaseRun> = z
  .object({
    job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    creator_user_name: z.string().optional(),
    number_in_job: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    original_attempt_run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    state: z.lazy(() => unmarshalRunStateSchema).optional(),
    schedule: z.lazy(() => unmarshalCronScheduleSchema).optional(),
    cluster_spec: z.lazy(() => unmarshalClusterSpecSchema).optional(),
    cluster_instance: z.lazy(() => unmarshalClusterInstanceSchema).optional(),
    job_parameters: z
      .array(z.lazy(() => unmarshalRun_JobLevelParametersSchema))
      .optional(),
    overriding_parameters: z
      .lazy(() => unmarshalRunParametersSchema)
      .optional(),
    trigger: z.string().optional(),
    trigger_info: z.lazy(() => unmarshalRunTriggerInfoSchema).optional(),
    run_name: z.string().optional(),
    run_page_url: z.string().optional(),
    run_type: z.string().optional(),
    tasks: z.array(z.lazy(() => unmarshalRunTaskSchema)).optional(),
    description: z.string().optional(),
    attempt_number: z.number().optional(),
    job_clusters: z.array(z.lazy(() => unmarshalJobClusterSchema)).optional(),
    git_source: z.lazy(() => unmarshalGitSourceSchema).optional(),
    repair_history: z.array(z.lazy(() => unmarshalRepairSchema)).optional(),
    status: z.lazy(() => unmarshalRunStatusSchema).optional(),
    job_run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    has_more: z.boolean().optional(),
    effective_performance_target: z.string().optional(),
    effective_usage_policy_id: z.string().optional(),
    start_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    setup_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    execution_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    cleanup_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    end_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    run_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    queue_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    jobId: d.job_id,
    runId: d.run_id,
    creatorUserName: d.creator_user_name,
    numberInJob: d.number_in_job,
    originalAttemptRunId: d.original_attempt_run_id,
    state: d.state,
    schedule: d.schedule,
    clusterSpec: d.cluster_spec,
    clusterInstance: d.cluster_instance,
    jobParameters: d.job_parameters,
    overridingParameters: d.overriding_parameters,
    trigger: d.trigger,
    triggerInfo: d.trigger_info,
    runName: d.run_name,
    runPageUrl: d.run_page_url,
    runType: d.run_type,
    tasks: d.tasks,
    description: d.description,
    attemptNumber: d.attempt_number,
    jobClusters: d.job_clusters,
    gitSource: d.git_source,
    repairHistory: d.repair_history,
    status: d.status,
    jobRunId: d.job_run_id,
    hasMore: d.has_more,
    effectivePerformanceTarget: d.effective_performance_target,
    effectiveUsagePolicyId: d.effective_usage_policy_id,
    startTime: d.start_time,
    setupDuration: d.setup_duration,
    executionDuration: d.execution_duration,
    cleanupDuration: d.cleanup_duration,
    endTime: d.end_time,
    runDuration: d.run_duration,
    queueDuration: d.queue_duration,
  }));

export const unmarshalCancelAllRunsResponseSchema: z.ZodType<CancelAllRunsResponse> =
  z.object({});

export const unmarshalCancelRunResponseSchema: z.ZodType<CancelRunResponse> =
  z.object({});

export const unmarshalCleanRoomTaskRunStateSchema: z.ZodType<CleanRoomTaskRunState> =
  z
    .object({
      life_cycle_state: z.string().optional(),
      result_state: z.string().optional(),
    })
    .transform(d => ({
      lifeCycleState: d.life_cycle_state,
      resultState: d.result_state,
    }));

export const unmarshalCleanRoomsNotebookTaskSchema: z.ZodType<CleanRoomsNotebookTask> =
  z
    .object({
      clean_room_name: z.string().optional(),
      notebook_name: z.string().optional(),
      etag: z.string().optional(),
      notebook_base_parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      cleanRoomName: d.clean_room_name,
      notebookName: d.notebook_name,
      etag: d.etag,
      notebookBaseParameters: d.notebook_base_parameters,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCleanRoomsNotebookTask_CleanRoomsNotebookTaskOutputSchema: z.ZodType<CleanRoomsNotebookTask_CleanRoomsNotebookTaskOutput> =
  z
    .object({
      clean_room_job_run_state: z
        .lazy(() => unmarshalCleanRoomTaskRunStateSchema)
        .optional(),
      notebook_output: z
        .lazy(() => unmarshalNotebookTask_NotebookOutputSchema)
        .optional(),
      output_schema_info: z
        .lazy(() => unmarshalOutputSchemaInfoSchema)
        .optional(),
    })
    .transform(d => ({
      cleanRoomJobRunState: d.clean_room_job_run_state,
      notebookOutput: d.notebook_output,
      outputSchemaInfo: d.output_schema_info,
    }));

export const unmarshalClusterInstanceSchema: z.ZodType<ClusterInstance> = z
  .object({
    cluster_id: z.string().optional(),
    spark_context_id: z.string().optional(),
  })
  .transform(d => ({
    clusterId: d.cluster_id,
    sparkContextId: d.spark_context_id,
  }));

export const unmarshalClusterLogConfSchema: z.ZodType<ClusterLogConf> = z
  .object({
    dbfs: z.lazy(() => unmarshalDbfsStorageInfoSchema).optional(),
    s3: z.lazy(() => unmarshalS3StorageInfoSchema).optional(),
    volumes: z.lazy(() => unmarshalVolumesStorageInfoSchema).optional(),
  })
  .transform(d => ({
    storageInfo:
      d.dbfs !== undefined
        ? {$case: 'dbfs' as const, dbfs: d.dbfs}
        : d.s3 !== undefined
          ? {$case: 's3' as const, s3: d.s3}
          : d.volumes !== undefined
            ? {$case: 'volumes' as const, volumes: d.volumes}
            : undefined,
  }));

export const unmarshalClusterSpecSchema: z.ZodType<ClusterSpec> = z
  .object({
    existing_cluster_id: z.string().optional(),
    new_cluster: z.lazy(() => unmarshalClusterSpec_NewClusterSchema).optional(),
    job_cluster_key: z.string().optional(),
    libraries: z.array(z.lazy(() => unmarshalLibrarySchema)).optional(),
  })
  .transform(d => ({
    spec:
      d.existing_cluster_id !== undefined
        ? {
            $case: 'existingClusterId' as const,
            existingClusterId: d.existing_cluster_id,
          }
        : d.new_cluster !== undefined
          ? {$case: 'newCluster' as const, newCluster: d.new_cluster}
          : d.job_cluster_key !== undefined
            ? {
                $case: 'jobClusterKey' as const,
                jobClusterKey: d.job_cluster_key,
              }
            : undefined,
    libraries: d.libraries,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalClusterSpec_NewClusterSchema: z.ZodType<ClusterSpec_NewCluster> =
  z
    .object({
      apply_policy_default_values: z.boolean().optional(),
      cluster_name: z.string().optional(),
      spark_version: z.string().optional(),
      spark_conf: z.record(z.string(), z.string()).optional(),
      aws_attributes: z.lazy(() => unmarshalAwsAttributesSchema).optional(),
      azure_attributes: z.lazy(() => unmarshalAzureAttributesSchema).optional(),
      gcp_attributes: z.lazy(() => unmarshalGcpAttributesSchema).optional(),
      node_type_id: z.string().optional(),
      driver_node_type_id: z.string().optional(),
      worker_node_type_flexibility: z
        .lazy(() => unmarshalNodeTypeFlexibilitySchema)
        .optional(),
      driver_node_type_flexibility: z
        .lazy(() => unmarshalNodeTypeFlexibilitySchema)
        .optional(),
      ssh_public_keys: z.array(z.string()).optional(),
      custom_tags: z.record(z.string(), z.string()).optional(),
      cluster_log_conf: z.lazy(() => unmarshalClusterLogConfSchema).optional(),
      spark_env_vars: z.record(z.string(), z.string()).optional(),
      autotermination_minutes: z.number().optional(),
      enable_elastic_disk: z.boolean().optional(),
      init_scripts: z
        .array(z.lazy(() => unmarshalInitScriptInfoSchema))
        .optional(),
      docker_image: z.lazy(() => unmarshalDockerImageSchema).optional(),
      instance_pool_id: z.string().optional(),
      single_user_name: z.string().optional(),
      policy_id: z.string().optional(),
      enable_local_disk_encryption: z.boolean().optional(),
      driver_instance_pool_id: z.string().optional(),
      workload_type: z.lazy(() => unmarshalWorkloadTypeSchema).optional(),
      data_security_mode: z.string().optional(),
      runtime_engine: z.string().optional(),
      kind: z.string().optional(),
      use_ml_runtime: z.boolean().optional(),
      is_single_node: z.boolean().optional(),
      remote_disk_throughput: z.number().optional(),
      total_initial_remote_disk_size: z.number().optional(),
      num_workers: z.number().optional(),
      autoscale: z.lazy(() => unmarshalAutoScaleSchema).optional(),
    })
    .transform(d => ({
      applyPolicyDefaultValues: d.apply_policy_default_values,
      clusterName: d.cluster_name,
      sparkVersion: d.spark_version,
      sparkConf: d.spark_conf,
      awsAttributes: d.aws_attributes,
      azureAttributes: d.azure_attributes,
      gcpAttributes: d.gcp_attributes,
      nodeTypeId: d.node_type_id,
      driverNodeTypeId: d.driver_node_type_id,
      workerNodeTypeFlexibility: d.worker_node_type_flexibility,
      driverNodeTypeFlexibility: d.driver_node_type_flexibility,
      sshPublicKeys: d.ssh_public_keys,
      customTags: d.custom_tags,
      clusterLogConf: d.cluster_log_conf,
      sparkEnvVars: d.spark_env_vars,
      autoterminationMinutes: d.autotermination_minutes,
      enableElasticDisk: d.enable_elastic_disk,
      initScripts: d.init_scripts,
      dockerImage: d.docker_image,
      instancePoolId: d.instance_pool_id,
      singleUserName: d.single_user_name,
      policyId: d.policy_id,
      enableLocalDiskEncryption: d.enable_local_disk_encryption,
      driverInstancePoolId: d.driver_instance_pool_id,
      workloadType: d.workload_type,
      dataSecurityMode: d.data_security_mode,
      runtimeEngine: d.runtime_engine,
      kind: d.kind,
      useMlRuntime: d.use_ml_runtime,
      isSingleNode: d.is_single_node,
      remoteDiskThroughput: d.remote_disk_throughput,
      totalInitialRemoteDiskSize: d.total_initial_remote_disk_size,
      size:
        d.num_workers !== undefined
          ? {$case: 'numWorkers' as const, numWorkers: d.num_workers}
          : d.autoscale !== undefined
            ? {$case: 'autoscale' as const, autoscale: d.autoscale}
            : undefined,
    }));

export const unmarshalComputeSchema: z.ZodType<Compute> = z
  .object({
    hardware_accelerator: z.string().optional(),
  })
  .transform(d => ({
    hardwareAccelerator: d.hardware_accelerator,
  }));

export const unmarshalComputeConfigSchema: z.ZodType<ComputeConfig> = z
  .object({
    num_gpus: z.number().optional(),
    gpu_node_pool_id: z.string().optional(),
    gpu_type: z.string().optional(),
  })
  .transform(d => ({
    numGpus: d.num_gpus,
    gpuNodePoolId: d.gpu_node_pool_id,
    gpuType: d.gpu_type,
  }));

export const unmarshalComputeSpecSchema: z.ZodType<ComputeSpec> = z
  .object({
    accelerator_type: z.string().optional(),
    accelerator_count: z.number().optional(),
  })
  .transform(d => ({
    acceleratorType: d.accelerator_type,
    acceleratorCount: d.accelerator_count,
  }));

export const unmarshalConditionTaskSchema: z.ZodType<ConditionTask> = z
  .object({
    op: z.string().optional(),
    left: z.string().optional(),
    right: z.string().optional(),
    outcome: z.string().optional(),
  })
  .transform(d => ({
    op: d.op,
    left: d.left,
    right: d.right,
    outcome: d.outcome,
  }));

export const unmarshalContinuousSettingsSchema: z.ZodType<ContinuousSettings> =
  z
    .object({
      pause_status: z.string().optional(),
      task_retry_mode: z.string().optional(),
    })
    .transform(d => ({
      pauseStatus: d.pause_status,
      taskRetryMode: d.task_retry_mode,
    }));

export const unmarshalCreateJobResponseSchema: z.ZodType<CreateJobResponse> = z
  .object({
    job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    jobId: d.job_id,
  }));

export const unmarshalCronScheduleSchema: z.ZodType<CronSchedule> = z
  .object({
    quartz_cron_expression: z.string().optional(),
    timezone_id: z.string().optional(),
    pause_status: z.string().optional(),
  })
  .transform(d => ({
    quartzCronExpression: d.quartz_cron_expression,
    timezoneId: d.timezone_id,
    pauseStatus: d.pause_status,
  }));

export const unmarshalDashboardPageSnapshotSchema: z.ZodType<DashboardPageSnapshot> =
  z
    .object({
      page_display_name: z.string().optional(),
      widget_error_details: z
        .array(z.lazy(() => unmarshalWidgetErrorDetailSchema))
        .optional(),
    })
    .transform(d => ({
      pageDisplayName: d.page_display_name,
      widgetErrorDetails: d.widget_error_details,
    }));

export const unmarshalDashboardTaskSchema: z.ZodType<DashboardTask> = z
  .object({
    subscription: z.lazy(() => unmarshalSubscriptionSchema).optional(),
    warehouse_id: z.string().optional(),
    dashboard_id: z.string().optional(),
    filters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    subscription: d.subscription,
    warehouseId: d.warehouse_id,
    dashboardId: d.dashboard_id,
    filters: d.filters,
  }));

export const unmarshalDashboardTaskOutputSchema: z.ZodType<DashboardTaskOutput> =
  z
    .object({
      page_snapshots: z
        .array(z.lazy(() => unmarshalDashboardPageSnapshotSchema))
        .optional(),
    })
    .transform(d => ({
      pageSnapshots: d.page_snapshots,
    }));

export const unmarshalDbfsStorageInfoSchema: z.ZodType<DbfsStorageInfo> = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const unmarshalDbtCloudJobRunStepSchema: z.ZodType<DbtCloudJobRunStep> =
  z
    .object({
      index: z.number().optional(),
      name: z.string().optional(),
      status: z.string().optional(),
      logs: z.string().optional(),
    })
    .transform(d => ({
      index: d.index,
      name: d.name,
      status: d.status,
      logs: d.logs,
    }));

export const unmarshalDbtCloudTaskSchema: z.ZodType<DbtCloudTask> = z
  .object({
    dbt_cloud_job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    connection_resource_name: z.string().optional(),
  })
  .transform(d => ({
    dbtCloudJobId: d.dbt_cloud_job_id,
    connectionResourceName: d.connection_resource_name,
  }));

export const unmarshalDbtCloudTaskOutputSchema: z.ZodType<DbtCloudTaskOutput> =
  z
    .object({
      dbt_cloud_job_run_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      dbt_cloud_job_run_url: z.string().optional(),
      dbt_cloud_job_run_output: z
        .array(z.lazy(() => unmarshalDbtCloudJobRunStepSchema))
        .optional(),
    })
    .transform(d => ({
      dbtCloudJobRunId: d.dbt_cloud_job_run_id,
      dbtCloudJobRunUrl: d.dbt_cloud_job_run_url,
      dbtCloudJobRunOutput: d.dbt_cloud_job_run_output,
    }));

export const unmarshalDbtPlatformJobRunStepSchema: z.ZodType<DbtPlatformJobRunStep> =
  z
    .object({
      index: z.number().optional(),
      name: z.string().optional(),
      status: z.string().optional(),
      logs: z.string().optional(),
      name_truncated: z.boolean().optional(),
      logs_truncated: z.boolean().optional(),
    })
    .transform(d => ({
      index: d.index,
      name: d.name,
      status: d.status,
      logs: d.logs,
      nameTruncated: d.name_truncated,
      logsTruncated: d.logs_truncated,
    }));

export const unmarshalDbtPlatformTaskSchema: z.ZodType<DbtPlatformTask> = z
  .object({
    dbt_platform_job_id: z.string().optional(),
    connection_resource_name: z.string().optional(),
  })
  .transform(d => ({
    dbtPlatformJobId: d.dbt_platform_job_id,
    connectionResourceName: d.connection_resource_name,
  }));

export const unmarshalDbtPlatformTaskOutputSchema: z.ZodType<DbtPlatformTaskOutput> =
  z
    .object({
      dbt_platform_job_run_id: z.string().optional(),
      dbt_platform_job_run_url: z.string().optional(),
      dbt_platform_job_run_output: z
        .array(z.lazy(() => unmarshalDbtPlatformJobRunStepSchema))
        .optional(),
      steps_truncated: z.boolean().optional(),
    })
    .transform(d => ({
      dbtPlatformJobRunId: d.dbt_platform_job_run_id,
      dbtPlatformJobRunUrl: d.dbt_platform_job_run_url,
      dbtPlatformJobRunOutput: d.dbt_platform_job_run_output,
      stepsTruncated: d.steps_truncated,
    }));

export const unmarshalDbtTaskSchema: z.ZodType<DbtTask> = z
  .object({
    project_directory: z.string().optional(),
    commands: z.array(z.string()).optional(),
    schema: z.string().optional(),
    warehouse_id: z.string().optional(),
    profiles_directory: z.string().optional(),
    catalog: z.string().optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    projectDirectory: d.project_directory,
    commands: d.commands,
    schema: d.schema,
    warehouseId: d.warehouse_id,
    profilesDirectory: d.profiles_directory,
    catalog: d.catalog,
    source: d.source,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDbtTask_DbtTaskOutputSchema: z.ZodType<DbtTask_DbtTaskOutput> =
  z
    .object({
      artifacts_link: z.string().optional(),
      artifacts_headers: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      artifactsLink: d.artifacts_link,
      artifactsHeaders: d.artifacts_headers,
    }));

export const unmarshalDeleteJobResponseSchema: z.ZodType<DeleteJobResponse> =
  z.object({});

export const unmarshalDeleteRunResponseSchema: z.ZodType<DeleteRunResponse> =
  z.object({});

export const unmarshalDeploymentSpecSchema: z.ZodType<DeploymentSpec> = z
  .object({
    command_path: z.string().optional(),
    compute: z.lazy(() => unmarshalComputeSpecSchema).optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    commandPath: d.command_path,
    compute: d.compute,
    name: d.name,
  }));

export const unmarshalDockerBasicAuthSchema: z.ZodType<DockerBasicAuth> = z
  .object({
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .transform(d => ({
    username: d.username,
    password: d.password,
  }));

export const unmarshalDockerImageSchema: z.ZodType<DockerImage> = z
  .object({
    url: z.string().optional(),
    basic_auth: z.lazy(() => unmarshalDockerBasicAuthSchema).optional(),
  })
  .transform(d => ({
    url: d.url,
    credsOneof:
      d.basic_auth !== undefined
        ? {$case: 'basicAuth' as const, basicAuth: d.basic_auth}
        : undefined,
  }));

export const unmarshalEnforcePolicyComplianceResponseSchema: z.ZodType<EnforcePolicyComplianceResponse> =
  z
    .object({
      has_changes: z.boolean().optional(),
      job_cluster_changes: z
        .array(
          z.lazy(
            () =>
              unmarshalEnforcePolicyComplianceResponse_JobClusterSettingsChangeSchema
          )
        )
        .optional(),
      settings: z.lazy(() => unmarshalJobSettingsSchema).optional(),
    })
    .transform(d => ({
      hasChanges: d.has_changes,
      jobClusterChanges: d.job_cluster_changes,
      settings: d.settings,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEnforcePolicyComplianceResponse_JobClusterSettingsChangeSchema: z.ZodType<EnforcePolicyComplianceResponse_JobClusterSettingsChange> =
  z
    .object({
      field: z.string().optional(),
      previous_value: z.string().optional(),
      new_value: z.string().optional(),
    })
    .transform(d => ({
      field: d.field,
      previousValue: d.previous_value,
      newValue: d.new_value,
    }));

export const unmarshalEnvironmentSchema: z.ZodType<Environment> = z
  .object({
    client: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    base_environment: z.string().optional(),
    environment_version: z.string().optional(),
    java_dependencies: z.array(z.string()).optional(),
  })
  .transform(d => ({
    client: d.client,
    dependencies: d.dependencies,
    baseEnvironment: d.base_environment,
    environmentVersion: d.environment_version,
    javaDependencies: d.java_dependencies,
  }));

export const unmarshalExportRunResponseSchema: z.ZodType<ExportRunResponse> = z
  .object({
    views: z.array(z.lazy(() => unmarshalViewItemSchema)).optional(),
  })
  .transform(d => ({
    views: d.views,
  }));

export const unmarshalFileArrivalTriggerConfigurationSchema: z.ZodType<FileArrivalTriggerConfiguration> =
  z
    .object({
      url: z.string().optional(),
      min_time_between_triggers_seconds: z.number().optional(),
      wait_after_last_change_seconds: z.number().optional(),
    })
    .transform(d => ({
      url: d.url,
      minTimeBetweenTriggersSeconds: d.min_time_between_triggers_seconds,
      waitAfterLastChangeSeconds: d.wait_after_last_change_seconds,
    }));

export const unmarshalFileArrivalTriggerStateSchema: z.ZodType<FileArrivalTriggerState> =
  z
    .object({
      using_file_events: z.boolean().optional(),
    })
    .transform(d => ({
      usingFileEvents: d.using_file_events,
    }));

export const unmarshalForEachTaskSchema: z.ZodType<ForEachTask> = z
  .object({
    inputs: z.string().optional(),
    concurrency: z.number().optional(),
    task: z.lazy(() => unmarshalTaskSettingsSchema).optional(),
  })
  .transform(d => ({
    inputs: d.inputs,
    concurrency: d.concurrency,
    task: d.task,
  }));

export const unmarshalGcpAttributesSchema: z.ZodType<GcpAttributes> = z
  .object({
    use_preemptible_executors: z.boolean().optional(),
    google_service_account: z.string().optional(),
    boot_disk_size: z.number().optional(),
    availability: z.string().optional(),
    zone_id: z.string().optional(),
    local_ssd_count: z.number().optional(),
    first_on_demand: z.number().optional(),
    confidential_compute_type: z.string().optional(),
  })
  .transform(d => ({
    usePreemptibleExecutors: d.use_preemptible_executors,
    googleServiceAccount: d.google_service_account,
    bootDiskSize: d.boot_disk_size,
    availability: d.availability,
    zoneId: d.zone_id,
    localSsdCount: d.local_ssd_count,
    firstOnDemand: d.first_on_demand,
    confidentialComputeType: d.confidential_compute_type,
  }));

export const unmarshalGcsStorageInfoSchema: z.ZodType<GcsStorageInfo> = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const unmarshalGenAiComputeTaskSchema: z.ZodType<GenAiComputeTask> = z
  .object({
    dl_runtime_image: z.string().optional(),
    compute: z.lazy(() => unmarshalComputeConfigSchema).optional(),
    command: z.string().optional(),
    source: z.string().optional(),
    training_script_path: z.string().optional(),
    yaml_parameters_file_path: z.string().optional(),
    yaml_parameters: z.string().optional(),
    mlflow_experiment_name: z.string().optional(),
  })
  .transform(d => ({
    dlRuntimeImage: d.dl_runtime_image,
    compute: d.compute,
    command: d.command,
    source: d.source,
    trainingScriptPath: d.training_script_path,
    yamlParametersFilePath: d.yaml_parameters_file_path,
    yamlParameters: d.yaml_parameters,
    mlflowExperimentName: d.mlflow_experiment_name,
  }));

export const unmarshalGetJobResponseSchema: z.ZodType<GetJobResponse> = z
  .object({
    next_page_token: z.string().optional(),
    job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    creator_user_name: z.string().optional(),
    run_as_user_name: z.string().optional(),
    settings: z.lazy(() => unmarshalJobSettingsSchema).optional(),
    created_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    trigger_state: z.lazy(() => unmarshalTriggerStateSchema).optional(),
    has_more: z.boolean().optional(),
    effective_budget_policy_id: z.string().optional(),
    effective_usage_policy_id: z.string().optional(),
  })
  .transform(d => ({
    nextPageToken: d.next_page_token,
    jobId: d.job_id,
    creatorUserName: d.creator_user_name,
    runAsUserName: d.run_as_user_name,
    settings: d.settings,
    createdTime: d.created_time,
    triggerState: d.trigger_state,
    hasMore: d.has_more,
    effectiveBudgetPolicyId: d.effective_budget_policy_id,
    effectiveUsagePolicyId: d.effective_usage_policy_id,
  }));

export const unmarshalGetPolicyComplianceForJobResponseSchema: z.ZodType<GetPolicyComplianceForJobResponse> =
  z
    .object({
      is_compliant: z.boolean().optional(),
      violations: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      isCompliant: d.is_compliant,
      violations: d.violations,
    }));

export const unmarshalGetRunOutputResponseSchema: z.ZodType<GetRunOutputResponse> =
  z
    .object({
      metadata: z.lazy(() => unmarshalRunSchema).optional(),
      error: z.string().optional(),
      info: z.string().optional(),
      notebook_output: z
        .lazy(() => unmarshalNotebookTask_NotebookOutputSchema)
        .optional(),
      sql_output: z.lazy(() => unmarshalSqlTask_SqlOutputSchema).optional(),
      dbt_output: z.lazy(() => unmarshalDbtTask_DbtTaskOutputSchema).optional(),
      run_job_output: z
        .lazy(() => unmarshalRunJobTask_RunJobTaskOutputSchema)
        .optional(),
      clean_rooms_notebook_output: z
        .lazy(
          () =>
            unmarshalCleanRoomsNotebookTask_CleanRoomsNotebookTaskOutputSchema
        )
        .optional(),
      dashboard_output: z
        .lazy(() => unmarshalDashboardTaskOutputSchema)
        .optional(),
      dbt_cloud_output: z
        .lazy(() => unmarshalDbtCloudTaskOutputSchema)
        .optional(),
      dbt_platform_output: z
        .lazy(() => unmarshalDbtPlatformTaskOutputSchema)
        .optional(),
      alert_output: z.lazy(() => unmarshalAlertTaskOutputSchema).optional(),
      ai_runtime_task_output: z
        .lazy(() => unmarshalAiRuntimeTaskOutputSchema)
        .optional(),
      logs: z.string().optional(),
      logs_truncated: z.boolean().optional(),
      error_trace: z.string().optional(),
    })
    .transform(d => ({
      metadata: d.metadata,
      error: d.error,
      info: d.info,
      result:
        d.notebook_output !== undefined
          ? {
              $case: 'notebookOutput' as const,
              notebookOutput: d.notebook_output,
            }
          : d.sql_output !== undefined
            ? {$case: 'sqlOutput' as const, sqlOutput: d.sql_output}
            : d.dbt_output !== undefined
              ? {$case: 'dbtOutput' as const, dbtOutput: d.dbt_output}
              : d.run_job_output !== undefined
                ? {
                    $case: 'runJobOutput' as const,
                    runJobOutput: d.run_job_output,
                  }
                : d.clean_rooms_notebook_output !== undefined
                  ? {
                      $case: 'cleanRoomsNotebookOutput' as const,
                      cleanRoomsNotebookOutput: d.clean_rooms_notebook_output,
                    }
                  : d.dashboard_output !== undefined
                    ? {
                        $case: 'dashboardOutput' as const,
                        dashboardOutput: d.dashboard_output,
                      }
                    : d.dbt_cloud_output !== undefined
                      ? {
                          $case: 'dbtCloudOutput' as const,
                          dbtCloudOutput: d.dbt_cloud_output,
                        }
                      : d.dbt_platform_output !== undefined
                        ? {
                            $case: 'dbtPlatformOutput' as const,
                            dbtPlatformOutput: d.dbt_platform_output,
                          }
                        : d.alert_output !== undefined
                          ? {
                              $case: 'alertOutput' as const,
                              alertOutput: d.alert_output,
                            }
                          : d.ai_runtime_task_output !== undefined
                            ? {
                                $case: 'aiRuntimeTaskOutput' as const,
                                aiRuntimeTaskOutput: d.ai_runtime_task_output,
                              }
                            : undefined,
      logs: d.logs,
      logsTruncated: d.logs_truncated,
      errorTrace: d.error_trace,
    }));

export const unmarshalGetRunResponseSchema: z.ZodType<GetRunResponse> = z
  .object({
    next_page_token: z.string().optional(),
    job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    creator_user_name: z.string().optional(),
    number_in_job: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    original_attempt_run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    state: z.lazy(() => unmarshalRunStateSchema).optional(),
    schedule: z.lazy(() => unmarshalCronScheduleSchema).optional(),
    cluster_spec: z.lazy(() => unmarshalClusterSpecSchema).optional(),
    cluster_instance: z.lazy(() => unmarshalClusterInstanceSchema).optional(),
    job_parameters: z
      .array(z.lazy(() => unmarshalRun_JobLevelParametersSchema))
      .optional(),
    overriding_parameters: z
      .lazy(() => unmarshalRunParametersSchema)
      .optional(),
    trigger: z.string().optional(),
    trigger_info: z.lazy(() => unmarshalRunTriggerInfoSchema).optional(),
    run_name: z.string().optional(),
    run_page_url: z.string().optional(),
    run_type: z.string().optional(),
    tasks: z.array(z.lazy(() => unmarshalRunTaskSchema)).optional(),
    description: z.string().optional(),
    attempt_number: z.number().optional(),
    job_clusters: z.array(z.lazy(() => unmarshalJobClusterSchema)).optional(),
    git_source: z.lazy(() => unmarshalGitSourceSchema).optional(),
    repair_history: z.array(z.lazy(() => unmarshalRepairSchema)).optional(),
    status: z.lazy(() => unmarshalRunStatusSchema).optional(),
    job_run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    has_more: z.boolean().optional(),
    effective_performance_target: z.string().optional(),
    effective_usage_policy_id: z.string().optional(),
    start_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    setup_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    execution_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    cleanup_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    end_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    run_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    queue_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    nextPageToken: d.next_page_token,
    jobId: d.job_id,
    runId: d.run_id,
    creatorUserName: d.creator_user_name,
    numberInJob: d.number_in_job,
    originalAttemptRunId: d.original_attempt_run_id,
    state: d.state,
    schedule: d.schedule,
    clusterSpec: d.cluster_spec,
    clusterInstance: d.cluster_instance,
    jobParameters: d.job_parameters,
    overridingParameters: d.overriding_parameters,
    trigger: d.trigger,
    triggerInfo: d.trigger_info,
    runName: d.run_name,
    runPageUrl: d.run_page_url,
    runType: d.run_type,
    tasks: d.tasks,
    description: d.description,
    attemptNumber: d.attempt_number,
    jobClusters: d.job_clusters,
    gitSource: d.git_source,
    repairHistory: d.repair_history,
    status: d.status,
    jobRunId: d.job_run_id,
    hasMore: d.has_more,
    effectivePerformanceTarget: d.effective_performance_target,
    effectiveUsagePolicyId: d.effective_usage_policy_id,
    startTime: d.start_time,
    setupDuration: d.setup_duration,
    executionDuration: d.execution_duration,
    cleanupDuration: d.cleanup_duration,
    endTime: d.end_time,
    runDuration: d.run_duration,
    queueDuration: d.queue_duration,
  }));

export const unmarshalGitMetadataSnapshotSchema: z.ZodType<GitMetadataSnapshot> =
  z
    .object({
      used_commit: z.string().optional(),
    })
    .transform(d => ({
      usedCommit: d.used_commit,
    }));

export const unmarshalGitSourceSchema: z.ZodType<GitSource> = z
  .object({
    git_url: z.string().optional(),
    git_provider: z.string().optional(),
    git_branch: z.string().optional(),
    git_tag: z.string().optional(),
    git_commit: z.string().optional(),
    git_snapshot: z.lazy(() => unmarshalGitMetadataSnapshotSchema).optional(),
    job_source: z.lazy(() => unmarshalJobSourceSchema).optional(),
    sparse_checkout: z.lazy(() => unmarshalSparseCheckoutSchema).optional(),
  })
  .transform(d => ({
    gitUrl: d.git_url,
    gitProvider: d.git_provider,
    gitReference:
      d.git_branch !== undefined
        ? {$case: 'gitBranch' as const, gitBranch: d.git_branch}
        : d.git_tag !== undefined
          ? {$case: 'gitTag' as const, gitTag: d.git_tag}
          : d.git_commit !== undefined
            ? {$case: 'gitCommit' as const, gitCommit: d.git_commit}
            : undefined,
    gitSnapshot: d.git_snapshot,
    jobSource: d.job_source,
    sparseCheckout: d.sparse_checkout,
  }));

export const unmarshalInitScriptInfoSchema: z.ZodType<InitScriptInfo> = z
  .object({
    dbfs: z.lazy(() => unmarshalDbfsStorageInfoSchema).optional(),
    s3: z.lazy(() => unmarshalS3StorageInfoSchema).optional(),
    file: z.lazy(() => unmarshalLocalFileInfoSchema).optional(),
    gcs: z.lazy(() => unmarshalGcsStorageInfoSchema).optional(),
    abfss: z.lazy(() => unmarshalAdlsgen2InfoSchema).optional(),
    workspace: z.lazy(() => unmarshalWorkspaceStorageInfoSchema).optional(),
    volumes: z.lazy(() => unmarshalVolumesStorageInfoSchema).optional(),
  })
  .transform(d => ({
    storageInfo:
      d.dbfs !== undefined
        ? {$case: 'dbfs' as const, dbfs: d.dbfs}
        : d.s3 !== undefined
          ? {$case: 's3' as const, s3: d.s3}
          : d.file !== undefined
            ? {$case: 'file' as const, file: d.file}
            : d.gcs !== undefined
              ? {$case: 'gcs' as const, gcs: d.gcs}
              : d.abfss !== undefined
                ? {$case: 'abfss' as const, abfss: d.abfss}
                : d.workspace !== undefined
                  ? {$case: 'workspace' as const, workspace: d.workspace}
                  : d.volumes !== undefined
                    ? {$case: 'volumes' as const, volumes: d.volumes}
                    : undefined,
  }));

export const unmarshalJobClusterSchema: z.ZodType<JobCluster> = z
  .object({
    job_cluster_key: z.string().optional(),
    new_cluster: z.lazy(() => unmarshalClusterSpec_NewClusterSchema).optional(),
  })
  .transform(d => ({
    jobClusterKey: d.job_cluster_key,
    newCluster: d.new_cluster,
  }));

export const unmarshalJobDeploymentSchema: z.ZodType<JobDeployment> = z
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

export const unmarshalJobEmailNotificationsSchema: z.ZodType<JobEmailNotifications> =
  z
    .object({
      on_start: z.array(z.string()).optional(),
      on_success: z.array(z.string()).optional(),
      on_failure: z.array(z.string()).optional(),
      on_duration_warning_threshold_exceeded: z.array(z.string()).optional(),
      on_streaming_backlog_exceeded: z.array(z.string()).optional(),
      no_alert_for_skipped_runs: z.boolean().optional(),
    })
    .transform(d => ({
      onStart: d.on_start,
      onSuccess: d.on_success,
      onFailure: d.on_failure,
      onDurationWarningThresholdExceeded:
        d.on_duration_warning_threshold_exceeded,
      onStreamingBacklogExceeded: d.on_streaming_backlog_exceeded,
      noAlertForSkippedRuns: d.no_alert_for_skipped_runs,
    }));

export const unmarshalJobEnvironmentSchema: z.ZodType<JobEnvironment> = z
  .object({
    environment_key: z.string().optional(),
    spec: z.lazy(() => unmarshalEnvironmentSchema).optional(),
  })
  .transform(d => ({
    environmentKey: d.environment_key,
    spec: d.spec,
  }));

export const unmarshalJobLevelParameterSchema: z.ZodType<JobLevelParameter> = z
  .object({
    name: z.string().optional(),
    default: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    default: d.default,
  }));

export const unmarshalJobRunAsSchema: z.ZodType<JobRunAs> = z
  .object({
    user_name: z.string().optional(),
    service_principal_name: z.string().optional(),
    group_name: z.string().optional(),
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
          : d.group_name !== undefined
            ? {$case: 'groupName' as const, groupName: d.group_name}
            : undefined,
  }));

export const unmarshalJobSettingsSchema: z.ZodType<JobSettings> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    email_notifications: z
      .lazy(() => unmarshalJobEmailNotificationsSchema)
      .optional(),
    webhook_notifications: z
      .lazy(() => unmarshalWebhookNotificationsSchema)
      .optional(),
    notification_settings: z
      .lazy(() => unmarshalNotificationSettingsSchema)
      .optional(),
    timeout_seconds: z.number().optional(),
    health: z.lazy(() => unmarshalJobsHealthRulesSchema).optional(),
    schedule: z.lazy(() => unmarshalCronScheduleSchema).optional(),
    trigger: z.lazy(() => unmarshalTriggerSettingsSchema).optional(),
    continuous: z.lazy(() => unmarshalContinuousSettingsSchema).optional(),
    max_concurrent_runs: z.number().optional(),
    tasks: z.array(z.lazy(() => unmarshalTaskSettingsSchema)).optional(),
    job_clusters: z.array(z.lazy(() => unmarshalJobClusterSchema)).optional(),
    git_source: z.lazy(() => unmarshalGitSourceSchema).optional(),
    tags: z.record(z.string(), z.string()).optional(),
    format: z.string().optional(),
    queue: z.lazy(() => unmarshalQueueSettingsSchema).optional(),
    parameters: z
      .array(z.lazy(() => unmarshalJobLevelParameterSchema))
      .optional(),
    run_as: z.lazy(() => unmarshalJobRunAsSchema).optional(),
    edit_mode: z.string().optional(),
    deployment: z.lazy(() => unmarshalJobDeploymentSchema).optional(),
    environments: z
      .array(z.lazy(() => unmarshalJobEnvironmentSchema))
      .optional(),
    budget_policy_id: z.string().optional(),
    usage_policy_id: z.string().optional(),
    performance_target: z.string().optional(),
    max_retries: z.number().optional(),
    min_retry_interval_millis: z.number().optional(),
    retry_on_timeout: z.boolean().optional(),
    disable_auto_optimization: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    emailNotifications: d.email_notifications,
    webhookNotifications: d.webhook_notifications,
    notificationSettings: d.notification_settings,
    timeoutSeconds: d.timeout_seconds,
    health: d.health,
    schedule: d.schedule,
    trigger: d.trigger,
    continuous: d.continuous,
    maxConcurrentRuns: d.max_concurrent_runs,
    tasks: d.tasks,
    jobClusters: d.job_clusters,
    gitSource: d.git_source,
    tags: d.tags,
    format: d.format,
    queue: d.queue,
    parameters: d.parameters,
    runAs: d.run_as,
    editMode: d.edit_mode,
    deployment: d.deployment,
    environments: d.environments,
    budgetPolicyId: d.budget_policy_id,
    usagePolicyId: d.usage_policy_id,
    performanceTarget: d.performance_target,
    maxRetries: d.max_retries,
    minRetryIntervalMillis: d.min_retry_interval_millis,
    retryOnTimeout: d.retry_on_timeout,
    disableAutoOptimization: d.disable_auto_optimization,
  }));

export const unmarshalJobSourceSchema: z.ZodType<JobSource> = z
  .object({
    job_config_path: z.string().optional(),
    import_from_git_branch: z.string().optional(),
    dirty_state: z.string().optional(),
  })
  .transform(d => ({
    jobConfigPath: d.job_config_path,
    importFromGitReference:
      d.import_from_git_branch !== undefined
        ? {
            $case: 'importFromGitBranch' as const,
            importFromGitBranch: d.import_from_git_branch,
          }
        : undefined,
    dirtyState: d.dirty_state,
  }));

export const unmarshalJobsHealthRuleSchema: z.ZodType<JobsHealthRule> = z
  .object({
    metric: z.string().optional(),
    op: z.string().optional(),
    value: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    metric: d.metric,
    op: d.op,
    value: d.value,
  }));

export const unmarshalJobsHealthRulesSchema: z.ZodType<JobsHealthRules> = z
  .object({
    rules: z.array(z.lazy(() => unmarshalJobsHealthRuleSchema)).optional(),
  })
  .transform(d => ({
    rules: d.rules,
  }));

export const unmarshalLibrarySchema: z.ZodType<Library> = z
  .object({
    jar: z.string().optional(),
    egg: z.string().optional(),
    pypi: z.lazy(() => unmarshalPythonPyPiLibrarySchema).optional(),
    maven: z.lazy(() => unmarshalMavenLibrarySchema).optional(),
    cran: z.lazy(() => unmarshalRCranLibrarySchema).optional(),
    whl: z.string().optional(),
    requirements: z.string().optional(),
  })
  .transform(d => ({
    lib:
      d.jar !== undefined
        ? {$case: 'jar' as const, jar: d.jar}
        : d.egg !== undefined
          ? {$case: 'egg' as const, egg: d.egg}
          : d.pypi !== undefined
            ? {$case: 'pypi' as const, pypi: d.pypi}
            : d.maven !== undefined
              ? {$case: 'maven' as const, maven: d.maven}
              : d.cran !== undefined
                ? {$case: 'cran' as const, cran: d.cran}
                : d.whl !== undefined
                  ? {$case: 'whl' as const, whl: d.whl}
                  : d.requirements !== undefined
                    ? {
                        $case: 'requirements' as const,
                        requirements: d.requirements,
                      }
                    : undefined,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListJobComplianceForPolicy_JobComplianceSchema: z.ZodType<ListJobComplianceForPolicy_JobCompliance> =
  z
    .object({
      job_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      is_compliant: z.boolean().optional(),
      violations: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      jobId: d.job_id,
      isCompliant: d.is_compliant,
      violations: d.violations,
    }));

export const unmarshalListJobComplianceResponseSchema: z.ZodType<ListJobComplianceResponse> =
  z
    .object({
      jobs: z
        .array(
          z.lazy(() => unmarshalListJobComplianceForPolicy_JobComplianceSchema)
        )
        .optional(),
      next_page_token: z.string().optional(),
      prev_page_token: z.string().optional(),
    })
    .transform(d => ({
      jobs: d.jobs,
      nextPageToken: d.next_page_token,
      prevPageToken: d.prev_page_token,
    }));

export const unmarshalListJobsResponseSchema: z.ZodType<ListJobsResponse> = z
  .object({
    jobs: z.array(z.lazy(() => unmarshalBaseJobSchema)).optional(),
    has_more: z.boolean().optional(),
    next_page_token: z.string().optional(),
    prev_page_token: z.string().optional(),
  })
  .transform(d => ({
    jobs: d.jobs,
    hasMore: d.has_more,
    nextPageToken: d.next_page_token,
    prevPageToken: d.prev_page_token,
  }));

export const unmarshalListRunsResponseSchema: z.ZodType<ListRunsResponse> = z
  .object({
    runs: z.array(z.lazy(() => unmarshalBaseRunSchema)).optional(),
    has_more: z.boolean().optional(),
    next_page_token: z.string().optional(),
    prev_page_token: z.string().optional(),
  })
  .transform(d => ({
    runs: d.runs,
    hasMore: d.has_more,
    nextPageToken: d.next_page_token,
    prevPageToken: d.prev_page_token,
  }));

export const unmarshalLocalFileInfoSchema: z.ZodType<LocalFileInfo> = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const unmarshalLogAnalyticsInfoSchema: z.ZodType<LogAnalyticsInfo> = z
  .object({
    log_analytics_workspace_id: z.string().optional(),
    log_analytics_primary_key: z.string().optional(),
  })
  .transform(d => ({
    logAnalyticsWorkspaceId: d.log_analytics_workspace_id,
    logAnalyticsPrimaryKey: d.log_analytics_primary_key,
  }));

export const unmarshalMavenLibrarySchema: z.ZodType<MavenLibrary> = z
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

export const unmarshalModelTriggerConfigurationSchema: z.ZodType<ModelTriggerConfiguration> =
  z
    .object({
      securable_name: z.string().optional(),
      aliases: z.array(z.string()).optional(),
      condition: z.string().optional(),
      min_time_between_triggers_seconds: z.number().optional(),
      wait_after_last_change_seconds: z.number().optional(),
    })
    .transform(d => ({
      securableName: d.securable_name,
      aliases: d.aliases,
      condition: d.condition,
      minTimeBetweenTriggersSeconds: d.min_time_between_triggers_seconds,
      waitAfterLastChangeSeconds: d.wait_after_last_change_seconds,
    }));

export const unmarshalNodeTypeFlexibilitySchema: z.ZodType<NodeTypeFlexibility> =
  z
    .object({
      alternate_node_type_ids: z.array(z.string()).optional(),
    })
    .transform(d => ({
      alternateNodeTypeIds: d.alternate_node_type_ids,
    }));

export const unmarshalNotebookTaskSchema: z.ZodType<NotebookTask> = z
  .object({
    notebook_path: z.string().optional(),
    base_parameters: z.record(z.string(), z.string()).optional(),
    source: z.string().optional(),
    warehouse_id: z.string().optional(),
  })
  .transform(d => ({
    notebookPath: d.notebook_path,
    baseParameters: d.base_parameters,
    source: d.source,
    warehouseId: d.warehouse_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalNotebookTask_NotebookOutputSchema: z.ZodType<NotebookTask_NotebookOutput> =
  z
    .object({
      result: z.string().optional(),
      truncated: z.boolean().optional(),
    })
    .transform(d => ({
      result: d.result,
      truncated: d.truncated,
    }));

export const unmarshalNotificationSettingsSchema: z.ZodType<NotificationSettings> =
  z
    .object({
      no_alert_for_skipped_runs: z.boolean().optional(),
      no_alert_for_canceled_runs: z.boolean().optional(),
      alert_on_last_attempt: z.boolean().optional(),
    })
    .transform(d => ({
      noAlertForSkippedRuns: d.no_alert_for_skipped_runs,
      noAlertForCanceledRuns: d.no_alert_for_canceled_runs,
      alertOnLastAttempt: d.alert_on_last_attempt,
    }));

export const unmarshalOutputSchemaInfoSchema: z.ZodType<OutputSchemaInfo> = z
  .object({
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    expiration_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    expirationTime: d.expiration_time,
  }));

export const unmarshalPeriodicTriggerConfigurationSchema: z.ZodType<PeriodicTriggerConfiguration> =
  z
    .object({
      interval: z.number().optional(),
      unit: z.string().optional(),
    })
    .transform(d => ({
      interval: d.interval,
      unit: d.unit,
    }));

export const unmarshalPipelineParametersSchema: z.ZodType<PipelineParameters> =
  z
    .object({
      full_refresh: z.boolean().optional(),
      refresh_selection: z.array(z.string()).optional(),
      full_refresh_selection: z.array(z.string()).optional(),
      reset_checkpoint_selection: z.array(z.string()).optional(),
      refresh_flow_selection: z.array(z.string()).optional(),
    })
    .transform(d => ({
      fullRefresh: d.full_refresh,
      refreshSelection: d.refresh_selection,
      fullRefreshSelection: d.full_refresh_selection,
      resetCheckpointSelection: d.reset_checkpoint_selection,
      refreshFlowSelection: d.refresh_flow_selection,
    }));

export const unmarshalPipelineTaskSchema: z.ZodType<PipelineTask> = z
  .object({
    pipeline_id: z.string().optional(),
    parameters: z.record(z.string(), z.string()).optional(),
    full_refresh: z.boolean().optional(),
    refresh_selection: z.array(z.string()).optional(),
    full_refresh_selection: z.array(z.string()).optional(),
    reset_checkpoint_selection: z.array(z.string()).optional(),
    refresh_flow_selection: z.array(z.string()).optional(),
  })
  .transform(d => ({
    pipelineId: d.pipeline_id,
    pipelineTaskParameters: d.parameters,
    fullRefresh: d.full_refresh,
    refreshSelection: d.refresh_selection,
    fullRefreshSelection: d.full_refresh_selection,
    resetCheckpointSelection: d.reset_checkpoint_selection,
    refreshFlowSelection: d.refresh_flow_selection,
  }));

export const unmarshalPowerBiModelSchema: z.ZodType<PowerBiModel> = z
  .object({
    workspace_name: z.string().optional(),
    model_name: z.string().optional(),
    storage_mode: z.string().optional(),
    authentication_method: z.string().optional(),
    overwrite_existing: z.boolean().optional(),
  })
  .transform(d => ({
    workspaceName: d.workspace_name,
    modelName: d.model_name,
    storageMode: d.storage_mode,
    authenticationMethod: d.authentication_method,
    overwriteExisting: d.overwrite_existing,
  }));

export const unmarshalPowerBiTableSchema: z.ZodType<PowerBiTable> = z
  .object({
    name: z.string().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
    storage_mode: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog: d.catalog,
    schema: d.schema,
    storageMode: d.storage_mode,
  }));

export const unmarshalPowerBiTaskSchema: z.ZodType<PowerBiTask> = z
  .object({
    tables: z.array(z.lazy(() => unmarshalPowerBiTableSchema)).optional(),
    warehouse_id: z.string().optional(),
    power_bi_model: z.lazy(() => unmarshalPowerBiModelSchema).optional(),
    connection_resource_name: z.string().optional(),
    refresh_after_update: z.boolean().optional(),
  })
  .transform(d => ({
    tables: d.tables,
    warehouseId: d.warehouse_id,
    powerBiModel: d.power_bi_model,
    connectionResourceName: d.connection_resource_name,
    refreshAfterUpdate: d.refresh_after_update,
  }));

export const unmarshalPythonOperatorTaskSchema: z.ZodType<PythonOperatorTask> =
  z
    .object({
      parameters: z
        .array(z.lazy(() => unmarshalPythonOperatorTask_ParameterSchema))
        .optional(),
      main: z.string().optional(),
    })
    .transform(d => ({
      parameters: d.parameters,
      main: d.main,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPythonOperatorTask_ParameterSchema: z.ZodType<PythonOperatorTask_Parameter> =
  z
    .object({
      name: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      value: d.value,
    }));

export const unmarshalPythonPyPiLibrarySchema: z.ZodType<PythonPyPiLibrary> = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const unmarshalPythonWheelTaskSchema: z.ZodType<PythonWheelTask> = z
  .object({
    package_name: z.string().optional(),
    entry_point: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    named_parameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    packageName: d.package_name,
    entryPoint: d.entry_point,
    parameters: d.parameters,
    namedParameters: d.named_parameters,
  }));

export const unmarshalQueueDetailsSchema: z.ZodType<QueueDetails> = z
  .object({
    code: z.string().optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    code: d.code,
    message: d.message,
  }));

export const unmarshalQueueSettingsSchema: z.ZodType<QueueSettings> = z
  .object({
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
  }));

export const unmarshalRCranLibrarySchema: z.ZodType<RCranLibrary> = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const unmarshalRepairSchema: z.ZodType<Repair> = z
  .object({
    type: z.string().optional(),
    start_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    end_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    state: z.lazy(() => unmarshalRunStateSchema).optional(),
    id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    task_run_ids: z
      .array(z.union([z.number(), z.bigint()]).transform(v => BigInt(v)))
      .optional(),
    status: z.lazy(() => unmarshalRunStatusSchema).optional(),
    effective_performance_target: z.string().optional(),
  })
  .transform(d => ({
    type: d.type,
    startTime: d.start_time,
    endTime: d.end_time,
    state: d.state,
    id: d.id,
    taskRunIds: d.task_run_ids,
    status: d.status,
    effectivePerformanceTarget: d.effective_performance_target,
  }));

export const unmarshalRepairRunResponseSchema: z.ZodType<RepairRunResponse> = z
  .object({
    repair_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    repairId: d.repair_id,
  }));

export const unmarshalResetJobResponseSchema: z.ZodType<ResetJobResponse> =
  z.object({});

export const unmarshalResolvedValuesSchema: z.ZodType<ResolvedValues> = z
  .object({
    notebook_task: z
      .lazy(() => unmarshalResolvedValues_NotebookTaskResolvedValuesSchema)
      .optional(),
    spark_jar_task: z
      .lazy(() => unmarshalResolvedValues_SparkJarTaskResolvedValuesSchema)
      .optional(),
    spark_python_task: z
      .lazy(() => unmarshalResolvedValues_SparkPythonTaskResolvedValuesSchema)
      .optional(),
    spark_submit_task: z
      .lazy(() => unmarshalResolvedValues_SparkSubmitTaskResolvedValuesSchema)
      .optional(),
    python_wheel_task: z
      .lazy(() => unmarshalResolvedValues_PythonWheelTaskResolvedValuesSchema)
      .optional(),
    dbt_task: z
      .lazy(() => unmarshalResolvedValues_DbtTaskResolvedValuesSchema)
      .optional(),
    sql_task: z
      .lazy(() => unmarshalResolvedValues_SqlTaskResolvedValuesSchema)
      .optional(),
    run_job_task: z
      .lazy(() => unmarshalResolvedValues_RunJobTaskResolvedValuesSchema)
      .optional(),
    condition_task: z
      .lazy(() => unmarshalResolvedValues_ConditionTaskResolvedValuesSchema)
      .optional(),
    simulation_task: z
      .lazy(() => unmarshalResolvedValues_SimulationTaskResolvedValuesSchema)
      .optional(),
    pipeline_task: z
      .lazy(() => unmarshalResolvedValues_PipelineTaskResolvedValuesSchema)
      .optional(),
    ai_runtime_task: z
      .lazy(() => unmarshalResolvedValues_AiRuntimeTaskResolvedValuesSchema)
      .optional(),
  })
  .transform(d => ({
    resolved:
      d.notebook_task !== undefined
        ? {$case: 'notebookTask' as const, notebookTask: d.notebook_task}
        : d.spark_jar_task !== undefined
          ? {$case: 'sparkJarTask' as const, sparkJarTask: d.spark_jar_task}
          : d.spark_python_task !== undefined
            ? {
                $case: 'sparkPythonTask' as const,
                sparkPythonTask: d.spark_python_task,
              }
            : d.spark_submit_task !== undefined
              ? {
                  $case: 'sparkSubmitTask' as const,
                  sparkSubmitTask: d.spark_submit_task,
                }
              : d.python_wheel_task !== undefined
                ? {
                    $case: 'pythonWheelTask' as const,
                    pythonWheelTask: d.python_wheel_task,
                  }
                : d.dbt_task !== undefined
                  ? {$case: 'dbtTask' as const, dbtTask: d.dbt_task}
                  : d.sql_task !== undefined
                    ? {$case: 'sqlTask' as const, sqlTask: d.sql_task}
                    : d.run_job_task !== undefined
                      ? {
                          $case: 'runJobTask' as const,
                          runJobTask: d.run_job_task,
                        }
                      : d.condition_task !== undefined
                        ? {
                            $case: 'conditionTask' as const,
                            conditionTask: d.condition_task,
                          }
                        : d.simulation_task !== undefined
                          ? {
                              $case: 'simulationTask' as const,
                              simulationTask: d.simulation_task,
                            }
                          : d.pipeline_task !== undefined
                            ? {
                                $case: 'pipelineTask' as const,
                                pipelineTask: d.pipeline_task,
                              }
                            : d.ai_runtime_task !== undefined
                              ? {
                                  $case: 'aiRuntimeTask' as const,
                                  aiRuntimeTask: d.ai_runtime_task,
                                }
                              : undefined,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_AiRuntimeTaskResolvedValuesSchema: z.ZodType<ResolvedValues_AiRuntimeTaskResolvedValues> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_ConditionTaskResolvedValuesSchema: z.ZodType<ResolvedValues_ConditionTaskResolvedValues> =
  z
    .object({
      left: z.string().optional(),
      right: z.string().optional(),
    })
    .transform(d => ({
      left: d.left,
      right: d.right,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_DbtTaskResolvedValuesSchema: z.ZodType<ResolvedValues_DbtTaskResolvedValues> =
  z
    .object({
      commands: z.array(z.string()).optional(),
    })
    .transform(d => ({
      commands: d.commands,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_NotebookTaskResolvedValuesSchema: z.ZodType<ResolvedValues_NotebookTaskResolvedValues> =
  z
    .object({
      base_parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      baseParameters: d.base_parameters,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_PipelineTaskResolvedValuesSchema: z.ZodType<ResolvedValues_PipelineTaskResolvedValues> =
  z
    .object({
      parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      pipelineTaskParameters: d.parameters,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_PythonWheelTaskResolvedValuesSchema: z.ZodType<ResolvedValues_PythonWheelTaskResolvedValues> =
  z
    .object({
      parameters: z.array(z.string()).optional(),
      named_parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      parameters: d.parameters,
      namedParameters: d.named_parameters,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_RunJobTaskResolvedValuesSchema: z.ZodType<ResolvedValues_RunJobTaskResolvedValues> =
  z
    .object({
      parameters: z.record(z.string(), z.string()).optional(),
      job_parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      parameters: d.parameters,
      jobParameters: d.job_parameters,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_SimulationTaskResolvedValuesSchema: z.ZodType<ResolvedValues_SimulationTaskResolvedValues> =
  z
    .object({
      parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      parameters: d.parameters,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_SparkJarTaskResolvedValuesSchema: z.ZodType<ResolvedValues_SparkJarTaskResolvedValues> =
  z
    .object({
      parameters: z.array(z.string()).optional(),
    })
    .transform(d => ({
      parameters: d.parameters,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_SparkPythonTaskResolvedValuesSchema: z.ZodType<ResolvedValues_SparkPythonTaskResolvedValues> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_SparkSubmitTaskResolvedValuesSchema: z.ZodType<ResolvedValues_SparkSubmitTaskResolvedValues> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResolvedValues_SqlTaskResolvedValuesSchema: z.ZodType<ResolvedValues_SqlTaskResolvedValues> =
  z
    .object({
      parameters: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      parameters: d.parameters,
    }));

export const unmarshalRunSchema: z.ZodType<Run> = z
  .object({
    job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    creator_user_name: z.string().optional(),
    number_in_job: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    original_attempt_run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    state: z.lazy(() => unmarshalRunStateSchema).optional(),
    schedule: z.lazy(() => unmarshalCronScheduleSchema).optional(),
    cluster_spec: z.lazy(() => unmarshalClusterSpecSchema).optional(),
    cluster_instance: z.lazy(() => unmarshalClusterInstanceSchema).optional(),
    job_parameters: z
      .array(z.lazy(() => unmarshalRun_JobLevelParametersSchema))
      .optional(),
    overriding_parameters: z
      .lazy(() => unmarshalRunParametersSchema)
      .optional(),
    trigger: z.string().optional(),
    trigger_info: z.lazy(() => unmarshalRunTriggerInfoSchema).optional(),
    run_name: z.string().optional(),
    run_page_url: z.string().optional(),
    run_type: z.string().optional(),
    tasks: z.array(z.lazy(() => unmarshalRunTaskSchema)).optional(),
    description: z.string().optional(),
    attempt_number: z.number().optional(),
    job_clusters: z.array(z.lazy(() => unmarshalJobClusterSchema)).optional(),
    git_source: z.lazy(() => unmarshalGitSourceSchema).optional(),
    repair_history: z.array(z.lazy(() => unmarshalRepairSchema)).optional(),
    status: z.lazy(() => unmarshalRunStatusSchema).optional(),
    job_run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    has_more: z.boolean().optional(),
    effective_performance_target: z.string().optional(),
    effective_usage_policy_id: z.string().optional(),
    start_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    setup_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    execution_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    cleanup_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    end_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    run_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    queue_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    jobId: d.job_id,
    runId: d.run_id,
    creatorUserName: d.creator_user_name,
    numberInJob: d.number_in_job,
    originalAttemptRunId: d.original_attempt_run_id,
    state: d.state,
    schedule: d.schedule,
    clusterSpec: d.cluster_spec,
    clusterInstance: d.cluster_instance,
    jobParameters: d.job_parameters,
    overridingParameters: d.overriding_parameters,
    trigger: d.trigger,
    triggerInfo: d.trigger_info,
    runName: d.run_name,
    runPageUrl: d.run_page_url,
    runType: d.run_type,
    tasks: d.tasks,
    description: d.description,
    attemptNumber: d.attempt_number,
    jobClusters: d.job_clusters,
    gitSource: d.git_source,
    repairHistory: d.repair_history,
    status: d.status,
    jobRunId: d.job_run_id,
    hasMore: d.has_more,
    effectivePerformanceTarget: d.effective_performance_target,
    effectiveUsagePolicyId: d.effective_usage_policy_id,
    startTime: d.start_time,
    setupDuration: d.setup_duration,
    executionDuration: d.execution_duration,
    cleanupDuration: d.cleanup_duration,
    endTime: d.end_time,
    runDuration: d.run_duration,
    queueDuration: d.queue_duration,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRun_JobLevelParametersSchema: z.ZodType<Run_JobLevelParameters> =
  z
    .object({
      name: z.string().optional(),
      default: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      default: d.default,
      value: d.value,
    }));

export const unmarshalRunJobTaskSchema: z.ZodType<RunJobTask> = z
  .object({
    job_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    job_parameters: z.record(z.string(), z.string()).optional(),
    pipeline_params: z.lazy(() => unmarshalPipelineParametersSchema).optional(),
    jar_params: z.array(z.string()).optional(),
    notebook_params: z.record(z.string(), z.string()).optional(),
    python_params: z.array(z.string()).optional(),
    spark_submit_params: z.array(z.string()).optional(),
    python_named_params: z.record(z.string(), z.string()).optional(),
    sql_params: z.record(z.string(), z.string()).optional(),
    dbt_commands: z.array(z.string()).optional(),
  })
  .transform(d => ({
    jobId: d.job_id,
    jobParameters: d.job_parameters,
    pipelineParams: d.pipeline_params,
    jarParams: d.jar_params,
    notebookParams: d.notebook_params,
    pythonParams: d.python_params,
    sparkSubmitParams: d.spark_submit_params,
    pythonNamedParams: d.python_named_params,
    sqlParams: d.sql_params,
    dbtCommands: d.dbt_commands,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRunJobTask_RunJobTaskOutputSchema: z.ZodType<RunJobTask_RunJobTaskOutput> =
  z
    .object({
      run_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      runId: d.run_id,
    }));

export const unmarshalRunNowResponseSchema: z.ZodType<RunNowResponse> = z
  .object({
    run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    number_in_job: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    runId: d.run_id,
    numberInJob: d.number_in_job,
  }));

export const unmarshalRunParametersSchema: z.ZodType<RunParameters> = z
  .object({
    pipeline_params: z.lazy(() => unmarshalPipelineParametersSchema).optional(),
    jar_params: z.array(z.string()).optional(),
    notebook_params: z.record(z.string(), z.string()).optional(),
    python_params: z.array(z.string()).optional(),
    spark_submit_params: z.array(z.string()).optional(),
    python_named_params: z.record(z.string(), z.string()).optional(),
    sql_params: z.record(z.string(), z.string()).optional(),
    dbt_commands: z.array(z.string()).optional(),
  })
  .transform(d => ({
    pipelineParams: d.pipeline_params,
    jarParams: d.jar_params,
    notebookParams: d.notebook_params,
    pythonParams: d.python_params,
    sparkSubmitParams: d.spark_submit_params,
    pythonNamedParams: d.python_named_params,
    sqlParams: d.sql_params,
    dbtCommands: d.dbt_commands,
  }));

export const unmarshalRunStateSchema: z.ZodType<RunState> = z
  .object({
    life_cycle_state: z.string().optional(),
    result_state: z.string().optional(),
    state_message: z.string().optional(),
    user_cancelled_or_timedout: z.boolean().optional(),
    queue_reason: z.string().optional(),
  })
  .transform(d => ({
    lifeCycleState: d.life_cycle_state,
    resultState: d.result_state,
    stateMessage: d.state_message,
    userCancelledOrTimedout: d.user_cancelled_or_timedout,
    queueReason: d.queue_reason,
  }));

export const unmarshalRunStatusSchema: z.ZodType<RunStatus> = z
  .object({
    state: z.string().optional(),
    termination_details: z
      .lazy(() => unmarshalTerminationDetailsSchema)
      .optional(),
    queue_details: z.lazy(() => unmarshalQueueDetailsSchema).optional(),
  })
  .transform(d => ({
    state: d.state,
    terminationDetails: d.termination_details,
    queueDetails: d.queue_details,
  }));

export const unmarshalRunTaskSchema: z.ZodType<RunTask> = z
  .object({
    run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    state: z.lazy(() => unmarshalRunStateSchema).optional(),
    run_page_url: z.string().optional(),
    cluster_instance: z.lazy(() => unmarshalClusterInstanceSchema).optional(),
    attempt_number: z.number().optional(),
    git_source: z.lazy(() => unmarshalGitSourceSchema).optional(),
    resolved_values: z.lazy(() => unmarshalResolvedValuesSchema).optional(),
    status: z.lazy(() => unmarshalRunStatusSchema).optional(),
    effective_performance_target: z.string().optional(),
    task_key: z.string().optional(),
    description: z.string().optional(),
    depends_on: z.array(z.lazy(() => unmarshalTaskDependencySchema)).optional(),
    run_if: z.string().optional(),
    timeout_seconds: z.number().optional(),
    email_notifications: z
      .lazy(() => unmarshalJobEmailNotificationsSchema)
      .optional(),
    health: z.lazy(() => unmarshalJobsHealthRulesSchema).optional(),
    notification_settings: z
      .lazy(() => unmarshalNotificationSettingsSchema)
      .optional(),
    webhook_notifications: z
      .lazy(() => unmarshalWebhookNotificationsSchema)
      .optional(),
    environment_key: z.string().optional(),
    disabled: z.boolean().optional(),
    notebook_task: z.lazy(() => unmarshalNotebookTaskSchema).optional(),
    spark_jar_task: z.lazy(() => unmarshalSparkJarTaskSchema).optional(),
    spark_python_task: z.lazy(() => unmarshalSparkPythonTaskSchema).optional(),
    spark_submit_task: z.lazy(() => unmarshalSparkSubmitTaskSchema).optional(),
    pipeline_task: z.lazy(() => unmarshalPipelineTaskSchema).optional(),
    python_wheel_task: z.lazy(() => unmarshalPythonWheelTaskSchema).optional(),
    dbt_task: z.lazy(() => unmarshalDbtTaskSchema).optional(),
    sql_task: z.lazy(() => unmarshalSqlTaskSchema).optional(),
    run_job_task: z.lazy(() => unmarshalRunJobTaskSchema).optional(),
    condition_task: z.lazy(() => unmarshalConditionTaskSchema).optional(),
    for_each_task: z.lazy(() => unmarshalForEachTaskSchema).optional(),
    clean_rooms_notebook_task: z
      .lazy(() => unmarshalCleanRoomsNotebookTaskSchema)
      .optional(),
    gen_ai_compute_task: z
      .lazy(() => unmarshalGenAiComputeTaskSchema)
      .optional(),
    alert_task: z.lazy(() => unmarshalAlertTaskSchema).optional(),
    power_bi_task: z.lazy(() => unmarshalPowerBiTaskSchema).optional(),
    dashboard_task: z.lazy(() => unmarshalDashboardTaskSchema).optional(),
    dbt_cloud_task: z.lazy(() => unmarshalDbtCloudTaskSchema).optional(),
    dbt_platform_task: z.lazy(() => unmarshalDbtPlatformTaskSchema).optional(),
    python_operator_task: z
      .lazy(() => unmarshalPythonOperatorTaskSchema)
      .optional(),
    ai_runtime_task: z.lazy(() => unmarshalAiRuntimeTaskSchema).optional(),
    existing_cluster_id: z.string().optional(),
    new_cluster: z.lazy(() => unmarshalClusterSpec_NewClusterSchema).optional(),
    job_cluster_key: z.string().optional(),
    libraries: z.array(z.lazy(() => unmarshalLibrarySchema)).optional(),
    max_retries: z.number().optional(),
    min_retry_interval_millis: z.number().optional(),
    retry_on_timeout: z.boolean().optional(),
    disable_auto_optimization: z.boolean().optional(),
    start_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    setup_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    execution_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    cleanup_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    end_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    run_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    queue_duration: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    runId: d.run_id,
    state: d.state,
    runPageUrl: d.run_page_url,
    clusterInstance: d.cluster_instance,
    attemptNumber: d.attempt_number,
    gitSource: d.git_source,
    resolvedValues: d.resolved_values,
    status: d.status,
    effectivePerformanceTarget: d.effective_performance_target,
    taskKey: d.task_key,
    description: d.description,
    dependsOn: d.depends_on,
    runIf: d.run_if,
    timeoutSeconds: d.timeout_seconds,
    emailNotifications: d.email_notifications,
    health: d.health,
    notificationSettings: d.notification_settings,
    webhookNotifications: d.webhook_notifications,
    environmentRef:
      d.environment_key !== undefined
        ? {$case: 'environmentKey' as const, environmentKey: d.environment_key}
        : undefined,
    disabled: d.disabled,
    task:
      d.notebook_task !== undefined
        ? {$case: 'notebookTask' as const, notebookTask: d.notebook_task}
        : d.spark_jar_task !== undefined
          ? {$case: 'sparkJarTask' as const, sparkJarTask: d.spark_jar_task}
          : d.spark_python_task !== undefined
            ? {
                $case: 'sparkPythonTask' as const,
                sparkPythonTask: d.spark_python_task,
              }
            : d.spark_submit_task !== undefined
              ? {
                  $case: 'sparkSubmitTask' as const,
                  sparkSubmitTask: d.spark_submit_task,
                }
              : d.pipeline_task !== undefined
                ? {
                    $case: 'pipelineTask' as const,
                    pipelineTask: d.pipeline_task,
                  }
                : d.python_wheel_task !== undefined
                  ? {
                      $case: 'pythonWheelTask' as const,
                      pythonWheelTask: d.python_wheel_task,
                    }
                  : d.dbt_task !== undefined
                    ? {$case: 'dbtTask' as const, dbtTask: d.dbt_task}
                    : d.sql_task !== undefined
                      ? {$case: 'sqlTask' as const, sqlTask: d.sql_task}
                      : d.run_job_task !== undefined
                        ? {
                            $case: 'runJobTask' as const,
                            runJobTask: d.run_job_task,
                          }
                        : d.condition_task !== undefined
                          ? {
                              $case: 'conditionTask' as const,
                              conditionTask: d.condition_task,
                            }
                          : d.for_each_task !== undefined
                            ? {
                                $case: 'forEachTask' as const,
                                forEachTask: d.for_each_task,
                              }
                            : d.clean_rooms_notebook_task !== undefined
                              ? {
                                  $case: 'cleanRoomsNotebookTask' as const,
                                  cleanRoomsNotebookTask:
                                    d.clean_rooms_notebook_task,
                                }
                              : d.gen_ai_compute_task !== undefined
                                ? {
                                    $case: 'genAiComputeTask' as const,
                                    genAiComputeTask: d.gen_ai_compute_task,
                                  }
                                : d.alert_task !== undefined
                                  ? {
                                      $case: 'alertTask' as const,
                                      alertTask: d.alert_task,
                                    }
                                  : d.power_bi_task !== undefined
                                    ? {
                                        $case: 'powerBiTask' as const,
                                        powerBiTask: d.power_bi_task,
                                      }
                                    : d.dashboard_task !== undefined
                                      ? {
                                          $case: 'dashboardTask' as const,
                                          dashboardTask: d.dashboard_task,
                                        }
                                      : d.dbt_cloud_task !== undefined
                                        ? {
                                            $case: 'dbtCloudTask' as const,
                                            dbtCloudTask: d.dbt_cloud_task,
                                          }
                                        : d.dbt_platform_task !== undefined
                                          ? {
                                              $case: 'dbtPlatformTask' as const,
                                              dbtPlatformTask:
                                                d.dbt_platform_task,
                                            }
                                          : d.python_operator_task !== undefined
                                            ? {
                                                $case:
                                                  'pythonOperatorTask' as const,
                                                pythonOperatorTask:
                                                  d.python_operator_task,
                                              }
                                            : d.ai_runtime_task !== undefined
                                              ? {
                                                  $case:
                                                    'aiRuntimeTask' as const,
                                                  aiRuntimeTask:
                                                    d.ai_runtime_task,
                                                }
                                              : undefined,
    spec:
      d.existing_cluster_id !== undefined
        ? {
            $case: 'existingClusterId' as const,
            existingClusterId: d.existing_cluster_id,
          }
        : d.new_cluster !== undefined
          ? {$case: 'newCluster' as const, newCluster: d.new_cluster}
          : d.job_cluster_key !== undefined
            ? {
                $case: 'jobClusterKey' as const,
                jobClusterKey: d.job_cluster_key,
              }
            : undefined,
    libraries: d.libraries,
    maxRetries: d.max_retries,
    minRetryIntervalMillis: d.min_retry_interval_millis,
    retryOnTimeout: d.retry_on_timeout,
    disableAutoOptimization: d.disable_auto_optimization,
    startTime: d.start_time,
    setupDuration: d.setup_duration,
    executionDuration: d.execution_duration,
    cleanupDuration: d.cleanup_duration,
    endTime: d.end_time,
    runDuration: d.run_duration,
    queueDuration: d.queue_duration,
  }));

export const unmarshalRunTriggerInfoSchema: z.ZodType<RunTriggerInfo> = z
  .object({
    run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    runId: d.run_id,
  }));

export const unmarshalS3StorageInfoSchema: z.ZodType<S3StorageInfo> = z
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

export const unmarshalSparkJarTaskSchema: z.ZodType<SparkJarTask> = z
  .object({
    jar_uri: z.string().optional(),
    main_class_name: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    run_as_repl: z.boolean().optional(),
  })
  .transform(d => ({
    jarUri: d.jar_uri,
    mainClassName: d.main_class_name,
    parameters: d.parameters,
    runAsRepl: d.run_as_repl,
  }));

export const unmarshalSparkPythonTaskSchema: z.ZodType<SparkPythonTask> = z
  .object({
    python_file: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    pythonFile: d.python_file,
    parameters: d.parameters,
    source: d.source,
  }));

export const unmarshalSparkSubmitTaskSchema: z.ZodType<SparkSubmitTask> = z
  .object({
    parameters: z.array(z.string()).optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
  }));

export const unmarshalSparseCheckoutSchema: z.ZodType<SparseCheckout> = z
  .object({
    patterns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    patterns: d.patterns,
  }));

export const unmarshalSqlTaskSchema: z.ZodType<SqlTask> = z
  .object({
    parameters: z.record(z.string(), z.string()).optional(),
    query: z.lazy(() => unmarshalSqlTaskQuerySchema).optional(),
    dashboard: z.lazy(() => unmarshalSqlTaskDashboardSchema).optional(),
    alert: z.lazy(() => unmarshalSqlTaskAlertSchema).optional(),
    file: z.lazy(() => unmarshalSqlTaskFileSchema).optional(),
    warehouse_id: z.string().optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
    sqlTaskType:
      d.query !== undefined
        ? {$case: 'query' as const, query: d.query}
        : d.dashboard !== undefined
          ? {$case: 'dashboard' as const, dashboard: d.dashboard}
          : d.alert !== undefined
            ? {$case: 'alert' as const, alert: d.alert}
            : d.file !== undefined
              ? {$case: 'file' as const, file: d.file}
              : undefined,
    warehouseId: d.warehouse_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSqlTask_SqlAlertOutputSchema: z.ZodType<SqlTask_SqlAlertOutput> =
  z
    .object({
      query_text: z.string().optional(),
      sql_statements: z
        .array(z.lazy(() => unmarshalSqlTask_SqlStatementOutputSchema))
        .optional(),
      output_link: z.string().optional(),
      warehouse_id: z.string().optional(),
      alert_state: z.string().optional(),
    })
    .transform(d => ({
      queryText: d.query_text,
      sqlStatements: d.sql_statements,
      outputLink: d.output_link,
      warehouseId: d.warehouse_id,
      alertState: d.alert_state,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSqlTask_SqlDashboardOutputSchema: z.ZodType<SqlTask_SqlDashboardOutput> =
  z
    .object({
      widgets: z
        .array(z.lazy(() => unmarshalSqlTask_SqlDashboardWidgetOutputSchema))
        .optional(),
      warehouse_id: z.string().optional(),
    })
    .transform(d => ({
      widgets: d.widgets,
      warehouseId: d.warehouse_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSqlTask_SqlDashboardWidgetOutputSchema: z.ZodType<SqlTask_SqlDashboardWidgetOutput> =
  z
    .object({
      widget_id: z.string().optional(),
      widget_title: z.string().optional(),
      output_link: z.string().optional(),
      status: z.string().optional(),
      error: z.lazy(() => unmarshalSqlTask_SqlOutputErrorSchema).optional(),
      start_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      end_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      widgetId: d.widget_id,
      widgetTitle: d.widget_title,
      outputLink: d.output_link,
      status: d.status,
      error: d.error,
      startTime: d.start_time,
      endTime: d.end_time,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSqlTask_SqlOutputSchema: z.ZodType<SqlTask_SqlOutput> = z
  .object({
    query_output: z
      .lazy(() => unmarshalSqlTask_SqlQueryOutputSchema)
      .optional(),
    dashboard_output: z
      .lazy(() => unmarshalSqlTask_SqlDashboardOutputSchema)
      .optional(),
    alert_output: z
      .lazy(() => unmarshalSqlTask_SqlAlertOutputSchema)
      .optional(),
  })
  .transform(d => ({
    sqlOutputType:
      d.query_output !== undefined
        ? {$case: 'queryOutput' as const, queryOutput: d.query_output}
        : d.dashboard_output !== undefined
          ? {
              $case: 'dashboardOutput' as const,
              dashboardOutput: d.dashboard_output,
            }
          : d.alert_output !== undefined
            ? {$case: 'alertOutput' as const, alertOutput: d.alert_output}
            : undefined,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSqlTask_SqlOutputErrorSchema: z.ZodType<SqlTask_SqlOutputError> =
  z
    .object({
      message: z.string().optional(),
    })
    .transform(d => ({
      message: d.message,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSqlTask_SqlQueryOutputSchema: z.ZodType<SqlTask_SqlQueryOutput> =
  z
    .object({
      query_text: z.string().optional(),
      endpoint_id: z.string().optional(),
      sql_statements: z
        .array(z.lazy(() => unmarshalSqlTask_SqlStatementOutputSchema))
        .optional(),
      output_link: z.string().optional(),
      warehouse_id: z.string().optional(),
    })
    .transform(d => ({
      queryText: d.query_text,
      endpointId: d.endpoint_id,
      sqlStatements: d.sql_statements,
      outputLink: d.output_link,
      warehouseId: d.warehouse_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSqlTask_SqlStatementOutputSchema: z.ZodType<SqlTask_SqlStatementOutput> =
  z
    .object({
      lookup_key: z.string().optional(),
    })
    .transform(d => ({
      lookupKey: d.lookup_key,
    }));

export const unmarshalSqlTaskAlertSchema: z.ZodType<SqlTaskAlert> = z
  .object({
    alert_id: z.string().optional(),
    subscriptions: z
      .array(z.lazy(() => unmarshalSqlTaskSubscriptionSchema))
      .optional(),
    pause_subscriptions: z.boolean().optional(),
  })
  .transform(d => ({
    alertId: d.alert_id,
    subscriptions: d.subscriptions,
    pauseSubscriptions: d.pause_subscriptions,
  }));

export const unmarshalSqlTaskDashboardSchema: z.ZodType<SqlTaskDashboard> = z
  .object({
    dashboard_id: z.string().optional(),
    subscriptions: z
      .array(z.lazy(() => unmarshalSqlTaskSubscriptionSchema))
      .optional(),
    custom_subject: z.string().optional(),
    pause_subscriptions: z.boolean().optional(),
  })
  .transform(d => ({
    dashboardId: d.dashboard_id,
    subscriptions: d.subscriptions,
    customSubject: d.custom_subject,
    pauseSubscriptions: d.pause_subscriptions,
  }));

export const unmarshalSqlTaskFileSchema: z.ZodType<SqlTaskFile> = z
  .object({
    path: z.string().optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
    source: d.source,
  }));

export const unmarshalSqlTaskQuerySchema: z.ZodType<SqlTaskQuery> = z
  .object({
    query_id: z.string().optional(),
  })
  .transform(d => ({
    queryType:
      d.query_id !== undefined
        ? {$case: 'queryId' as const, queryId: d.query_id}
        : undefined,
  }));

export const unmarshalSqlTaskSubscriptionSchema: z.ZodType<SqlTaskSubscription> =
  z
    .object({
      user_name: z.string().optional(),
      destination_id: z.string().optional(),
    })
    .transform(d => ({
      subscriptionType:
        d.user_name !== undefined
          ? {$case: 'userName' as const, userName: d.user_name}
          : d.destination_id !== undefined
            ? {$case: 'destinationId' as const, destinationId: d.destination_id}
            : undefined,
    }));

export const unmarshalSubmitRunResponseSchema: z.ZodType<SubmitRunResponse> = z
  .object({
    run_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    runId: d.run_id,
  }));

export const unmarshalSubscriptionSchema: z.ZodType<Subscription> = z
  .object({
    subscribers: z
      .array(z.lazy(() => unmarshalSubscription_SubscriberSchema))
      .optional(),
    paused: z.boolean().optional(),
    custom_subject: z.string().optional(),
  })
  .transform(d => ({
    subscribers: d.subscribers,
    paused: d.paused,
    customSubject: d.custom_subject,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSubscription_SubscriberSchema: z.ZodType<Subscription_Subscriber> =
  z
    .object({
      user_name: z.string().optional(),
      destination_id: z.string().optional(),
    })
    .transform(d => ({
      subscriptionType:
        d.user_name !== undefined
          ? {$case: 'userName' as const, userName: d.user_name}
          : d.destination_id !== undefined
            ? {$case: 'destinationId' as const, destinationId: d.destination_id}
            : undefined,
    }));

export const unmarshalTableStateSchema: z.ZodType<TableState> = z
  .object({
    table_name: z.string().optional(),
    has_seen_updates: z.boolean().optional(),
  })
  .transform(d => ({
    tableName: d.table_name,
    hasSeenUpdates: d.has_seen_updates,
  }));

export const unmarshalTableTriggerConfigurationSchema: z.ZodType<TableTriggerConfiguration> =
  z
    .object({
      table_names: z.array(z.string()).optional(),
      min_time_between_triggers_seconds: z.number().optional(),
      wait_after_last_change_seconds: z.number().optional(),
      condition: z.string().optional(),
    })
    .transform(d => ({
      tableNames: d.table_names,
      minTimeBetweenTriggersSeconds: d.min_time_between_triggers_seconds,
      waitAfterLastChangeSeconds: d.wait_after_last_change_seconds,
      condition: d.condition,
    }));

export const unmarshalTableTriggerStateSchema: z.ZodType<TableTriggerState> = z
  .object({
    last_seen_table_states: z
      .array(z.lazy(() => unmarshalTableStateSchema))
      .optional(),
    using_scalable_monitoring: z.boolean().optional(),
  })
  .transform(d => ({
    lastSeenTableStates: d.last_seen_table_states,
    usingScalableMonitoring: d.using_scalable_monitoring,
  }));

export const unmarshalTaskDependencySchema: z.ZodType<TaskDependency> = z
  .object({
    task_key: z.string().optional(),
    outcome: z.string().optional(),
  })
  .transform(d => ({
    taskKey: d.task_key,
    outcome: d.outcome,
  }));

export const unmarshalTaskSettingsSchema: z.ZodType<TaskSettings> = z
  .object({
    task_key: z.string().optional(),
    depends_on: z.array(z.lazy(() => unmarshalTaskDependencySchema)).optional(),
    run_if: z.string().optional(),
    timeout_seconds: z.number().optional(),
    health: z.lazy(() => unmarshalJobsHealthRulesSchema).optional(),
    email_notifications: z
      .lazy(() => unmarshalJobEmailNotificationsSchema)
      .optional(),
    notification_settings: z
      .lazy(() => unmarshalNotificationSettingsSchema)
      .optional(),
    webhook_notifications: z
      .lazy(() => unmarshalWebhookNotificationsSchema)
      .optional(),
    description: z.string().optional(),
    environment_key: z.string().optional(),
    disabled: z.boolean().optional(),
    compute: z.lazy(() => unmarshalComputeSchema).optional(),
    notebook_task: z.lazy(() => unmarshalNotebookTaskSchema).optional(),
    spark_jar_task: z.lazy(() => unmarshalSparkJarTaskSchema).optional(),
    spark_python_task: z.lazy(() => unmarshalSparkPythonTaskSchema).optional(),
    spark_submit_task: z.lazy(() => unmarshalSparkSubmitTaskSchema).optional(),
    pipeline_task: z.lazy(() => unmarshalPipelineTaskSchema).optional(),
    python_wheel_task: z.lazy(() => unmarshalPythonWheelTaskSchema).optional(),
    dbt_task: z.lazy(() => unmarshalDbtTaskSchema).optional(),
    sql_task: z.lazy(() => unmarshalSqlTaskSchema).optional(),
    run_job_task: z.lazy(() => unmarshalRunJobTaskSchema).optional(),
    condition_task: z.lazy(() => unmarshalConditionTaskSchema).optional(),
    for_each_task: z.lazy(() => unmarshalForEachTaskSchema).optional(),
    clean_rooms_notebook_task: z
      .lazy(() => unmarshalCleanRoomsNotebookTaskSchema)
      .optional(),
    gen_ai_compute_task: z
      .lazy(() => unmarshalGenAiComputeTaskSchema)
      .optional(),
    alert_task: z.lazy(() => unmarshalAlertTaskSchema).optional(),
    power_bi_task: z.lazy(() => unmarshalPowerBiTaskSchema).optional(),
    dashboard_task: z.lazy(() => unmarshalDashboardTaskSchema).optional(),
    dbt_cloud_task: z.lazy(() => unmarshalDbtCloudTaskSchema).optional(),
    dbt_platform_task: z.lazy(() => unmarshalDbtPlatformTaskSchema).optional(),
    python_operator_task: z
      .lazy(() => unmarshalPythonOperatorTaskSchema)
      .optional(),
    ai_runtime_task: z.lazy(() => unmarshalAiRuntimeTaskSchema).optional(),
    existing_cluster_id: z.string().optional(),
    new_cluster: z.lazy(() => unmarshalClusterSpec_NewClusterSchema).optional(),
    job_cluster_key: z.string().optional(),
    libraries: z.array(z.lazy(() => unmarshalLibrarySchema)).optional(),
    max_retries: z.number().optional(),
    min_retry_interval_millis: z.number().optional(),
    retry_on_timeout: z.boolean().optional(),
    disable_auto_optimization: z.boolean().optional(),
  })
  .transform(d => ({
    taskKey: d.task_key,
    dependsOn: d.depends_on,
    runIf: d.run_if,
    timeoutSeconds: d.timeout_seconds,
    health: d.health,
    emailNotifications: d.email_notifications,
    notificationSettings: d.notification_settings,
    webhookNotifications: d.webhook_notifications,
    description: d.description,
    environmentRef:
      d.environment_key !== undefined
        ? {$case: 'environmentKey' as const, environmentKey: d.environment_key}
        : undefined,
    disabled: d.disabled,
    compute: d.compute,
    task:
      d.notebook_task !== undefined
        ? {$case: 'notebookTask' as const, notebookTask: d.notebook_task}
        : d.spark_jar_task !== undefined
          ? {$case: 'sparkJarTask' as const, sparkJarTask: d.spark_jar_task}
          : d.spark_python_task !== undefined
            ? {
                $case: 'sparkPythonTask' as const,
                sparkPythonTask: d.spark_python_task,
              }
            : d.spark_submit_task !== undefined
              ? {
                  $case: 'sparkSubmitTask' as const,
                  sparkSubmitTask: d.spark_submit_task,
                }
              : d.pipeline_task !== undefined
                ? {
                    $case: 'pipelineTask' as const,
                    pipelineTask: d.pipeline_task,
                  }
                : d.python_wheel_task !== undefined
                  ? {
                      $case: 'pythonWheelTask' as const,
                      pythonWheelTask: d.python_wheel_task,
                    }
                  : d.dbt_task !== undefined
                    ? {$case: 'dbtTask' as const, dbtTask: d.dbt_task}
                    : d.sql_task !== undefined
                      ? {$case: 'sqlTask' as const, sqlTask: d.sql_task}
                      : d.run_job_task !== undefined
                        ? {
                            $case: 'runJobTask' as const,
                            runJobTask: d.run_job_task,
                          }
                        : d.condition_task !== undefined
                          ? {
                              $case: 'conditionTask' as const,
                              conditionTask: d.condition_task,
                            }
                          : d.for_each_task !== undefined
                            ? {
                                $case: 'forEachTask' as const,
                                forEachTask: d.for_each_task,
                              }
                            : d.clean_rooms_notebook_task !== undefined
                              ? {
                                  $case: 'cleanRoomsNotebookTask' as const,
                                  cleanRoomsNotebookTask:
                                    d.clean_rooms_notebook_task,
                                }
                              : d.gen_ai_compute_task !== undefined
                                ? {
                                    $case: 'genAiComputeTask' as const,
                                    genAiComputeTask: d.gen_ai_compute_task,
                                  }
                                : d.alert_task !== undefined
                                  ? {
                                      $case: 'alertTask' as const,
                                      alertTask: d.alert_task,
                                    }
                                  : d.power_bi_task !== undefined
                                    ? {
                                        $case: 'powerBiTask' as const,
                                        powerBiTask: d.power_bi_task,
                                      }
                                    : d.dashboard_task !== undefined
                                      ? {
                                          $case: 'dashboardTask' as const,
                                          dashboardTask: d.dashboard_task,
                                        }
                                      : d.dbt_cloud_task !== undefined
                                        ? {
                                            $case: 'dbtCloudTask' as const,
                                            dbtCloudTask: d.dbt_cloud_task,
                                          }
                                        : d.dbt_platform_task !== undefined
                                          ? {
                                              $case: 'dbtPlatformTask' as const,
                                              dbtPlatformTask:
                                                d.dbt_platform_task,
                                            }
                                          : d.python_operator_task !== undefined
                                            ? {
                                                $case:
                                                  'pythonOperatorTask' as const,
                                                pythonOperatorTask:
                                                  d.python_operator_task,
                                              }
                                            : d.ai_runtime_task !== undefined
                                              ? {
                                                  $case:
                                                    'aiRuntimeTask' as const,
                                                  aiRuntimeTask:
                                                    d.ai_runtime_task,
                                                }
                                              : undefined,
    spec:
      d.existing_cluster_id !== undefined
        ? {
            $case: 'existingClusterId' as const,
            existingClusterId: d.existing_cluster_id,
          }
        : d.new_cluster !== undefined
          ? {$case: 'newCluster' as const, newCluster: d.new_cluster}
          : d.job_cluster_key !== undefined
            ? {
                $case: 'jobClusterKey' as const,
                jobClusterKey: d.job_cluster_key,
              }
            : undefined,
    libraries: d.libraries,
    maxRetries: d.max_retries,
    minRetryIntervalMillis: d.min_retry_interval_millis,
    retryOnTimeout: d.retry_on_timeout,
    disableAutoOptimization: d.disable_auto_optimization,
  }));

export const unmarshalTerminationDetailsSchema: z.ZodType<TerminationDetails> =
  z
    .object({
      code: z.string().optional(),
      type: z.string().optional(),
      message: z.string().optional(),
    })
    .transform(d => ({
      code: d.code,
      type: d.type,
      message: d.message,
    }));

export const unmarshalTriggerSettingsSchema: z.ZodType<TriggerSettings> = z
  .object({
    pause_status: z.string().optional(),
    file_arrival: z
      .lazy(() => unmarshalFileArrivalTriggerConfigurationSchema)
      .optional(),
    periodic: z
      .lazy(() => unmarshalPeriodicTriggerConfigurationSchema)
      .optional(),
    table_update: z
      .lazy(() => unmarshalTableTriggerConfigurationSchema)
      .optional(),
    model: z.lazy(() => unmarshalModelTriggerConfigurationSchema).optional(),
  })
  .transform(d => ({
    pauseStatus: d.pause_status,
    configuration:
      d.file_arrival !== undefined
        ? {$case: 'fileArrival' as const, fileArrival: d.file_arrival}
        : d.periodic !== undefined
          ? {$case: 'periodic' as const, periodic: d.periodic}
          : d.table_update !== undefined
            ? {$case: 'tableUpdate' as const, tableUpdate: d.table_update}
            : d.model !== undefined
              ? {$case: 'model' as const, model: d.model}
              : undefined,
  }));

export const unmarshalTriggerStateSchema: z.ZodType<TriggerState> = z
  .object({
    table: z.lazy(() => unmarshalTableTriggerStateSchema).optional(),
    file_arrival: z
      .lazy(() => unmarshalFileArrivalTriggerStateSchema)
      .optional(),
  })
  .transform(d => ({
    triggerType:
      d.table !== undefined
        ? {$case: 'table' as const, table: d.table}
        : d.file_arrival !== undefined
          ? {$case: 'fileArrival' as const, fileArrival: d.file_arrival}
          : undefined,
  }));

export const unmarshalUpdateJobResponseSchema: z.ZodType<UpdateJobResponse> =
  z.object({});

export const unmarshalViewItemSchema: z.ZodType<ViewItem> = z
  .object({
    content: z.string().optional(),
    name: z.string().optional(),
    type: z.string().optional(),
  })
  .transform(d => ({
    content: d.content,
    name: d.name,
    type: d.type,
  }));

export const unmarshalVolumesStorageInfoSchema: z.ZodType<VolumesStorageInfo> =
  z
    .object({
      destination: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
    }));

export const unmarshalWebhookSchema: z.ZodType<Webhook> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const unmarshalWebhookNotificationsSchema: z.ZodType<WebhookNotifications> =
  z
    .object({
      on_start: z.array(z.lazy(() => unmarshalWebhookSchema)).optional(),
      on_success: z.array(z.lazy(() => unmarshalWebhookSchema)).optional(),
      on_failure: z.array(z.lazy(() => unmarshalWebhookSchema)).optional(),
      on_duration_warning_threshold_exceeded: z
        .array(z.lazy(() => unmarshalWebhookSchema))
        .optional(),
      on_streaming_backlog_exceeded: z
        .array(z.lazy(() => unmarshalWebhookSchema))
        .optional(),
    })
    .transform(d => ({
      onStart: d.on_start,
      onSuccess: d.on_success,
      onFailure: d.on_failure,
      onDurationWarningThresholdExceeded:
        d.on_duration_warning_threshold_exceeded,
      onStreamingBacklogExceeded: d.on_streaming_backlog_exceeded,
    }));

export const unmarshalWidgetErrorDetailSchema: z.ZodType<WidgetErrorDetail> = z
  .object({
    message: z.string().optional(),
  })
  .transform(d => ({
    message: d.message,
  }));

export const unmarshalWorkloadTypeSchema: z.ZodType<WorkloadType> = z
  .object({
    clients: z.lazy(() => unmarshalWorkloadType_ClientsTypesSchema).optional(),
  })
  .transform(d => ({
    clients: d.clients,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalWorkloadType_ClientsTypesSchema: z.ZodType<WorkloadType_ClientsTypes> =
  z
    .object({
      notebooks: z.boolean().optional(),
      jobs: z.boolean().optional(),
    })
    .transform(d => ({
      notebooks: d.notebooks,
      jobs: d.jobs,
    }));

export const unmarshalWorkspaceStorageInfoSchema: z.ZodType<WorkspaceStorageInfo> =
  z
    .object({
      destination: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
    }));

export const marshalAccessControlRequestSchema: z.ZodType = z
  .object({
    principalName: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({$case: z.literal('groupName'), groupName: z.string()}),
        z.object({
          $case: z.literal('servicePrincipalName'),
          servicePrincipalName: z.string(),
        }),
      ])
      .optional(),
    permissionLevel: z.string().optional(),
  })
  .transform(d => ({
    ...(d.principalName?.$case === 'userName' && {
      user_name: d.principalName.userName,
    }),
    ...(d.principalName?.$case === 'groupName' && {
      group_name: d.principalName.groupName,
    }),
    ...(d.principalName?.$case === 'servicePrincipalName' && {
      service_principal_name: d.principalName.servicePrincipalName,
    }),
    permission_level: d.permissionLevel,
  }));

export const marshalAdlsgen2InfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalAiRuntimeTaskSchema: z.ZodType = z
  .object({
    experiment: z.string().optional(),
    deployments: z.array(z.lazy(() => marshalDeploymentSpecSchema)).optional(),
    codeSourcePath: z.string().optional(),
    mlflowRun: z.string().optional(),
    mlflowExperimentDirectory: z.string().optional(),
  })
  .transform(d => ({
    experiment: d.experiment,
    deployments: d.deployments,
    code_source_path: d.codeSourcePath,
    mlflow_run: d.mlflowRun,
    mlflow_experiment_directory: d.mlflowExperimentDirectory,
  }));

export const marshalAlertTaskSchema: z.ZodType = z
  .object({
    alertId: z.string().optional(),
    warehouseId: z.string().optional(),
    workspacePath: z.string().optional(),
    subscribers: z
      .array(z.lazy(() => marshalAlertTaskSubscriberSchema))
      .optional(),
  })
  .transform(d => ({
    alert_id: d.alertId,
    warehouse_id: d.warehouseId,
    workspace_path: d.workspacePath,
    subscribers: d.subscribers,
  }));

export const marshalAlertTaskSubscriberSchema: z.ZodType = z
  .object({
    subscriberType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriberType?.$case === 'userName' && {
      user_name: d.subscriberType.userName,
    }),
    ...(d.subscriberType?.$case === 'destinationId' && {
      destination_id: d.subscriberType.destinationId,
    }),
  }));

export const marshalAutoScaleSchema: z.ZodType = z
  .object({
    minWorkers: z.number().optional(),
    maxWorkers: z.number().optional(),
  })
  .transform(d => ({
    min_workers: d.minWorkers,
    max_workers: d.maxWorkers,
  }));

export const marshalAwsAttributesSchema: z.ZodType = z
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

export const marshalAzureAttributesSchema: z.ZodType = z
  .object({
    logAnalyticsInfo: z.lazy(() => marshalLogAnalyticsInfoSchema).optional(),
    firstOnDemand: z.number().optional(),
    availability: z.string().optional(),
    spotBidMaxPrice: z.number().optional(),
    capacityReservationGroup: z.string().optional(),
  })
  .transform(d => ({
    log_analytics_info: d.logAnalyticsInfo,
    first_on_demand: d.firstOnDemand,
    availability: d.availability,
    spot_bid_max_price: d.spotBidMaxPrice,
    capacity_reservation_group: d.capacityReservationGroup,
  }));

export const marshalCancelAllRunsRequestSchema: z.ZodType = z
  .object({
    jobId: z.bigint().optional(),
    allQueuedRuns: z.boolean().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    all_queued_runs: d.allQueuedRuns,
  }));

export const marshalCancelRunRequestSchema: z.ZodType = z
  .object({
    runId: z.bigint().optional(),
  })
  .transform(d => ({
    run_id: d.runId,
  }));

export const marshalCleanRoomsNotebookTaskSchema: z.ZodType = z
  .object({
    cleanRoomName: z.string().optional(),
    notebookName: z.string().optional(),
    etag: z.string().optional(),
    notebookBaseParameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    clean_room_name: d.cleanRoomName,
    notebook_name: d.notebookName,
    etag: d.etag,
    notebook_base_parameters: d.notebookBaseParameters,
  }));

export const marshalClusterLogConfSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalDbfsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('s3'),
          s3: z.lazy(() => marshalS3StorageInfoSchema),
        }),
        z.object({
          $case: z.literal('volumes'),
          volumes: z.lazy(() => marshalVolumesStorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
    ...(d.storageInfo?.$case === 's3' && {s3: d.storageInfo.s3}),
    ...(d.storageInfo?.$case === 'volumes' && {volumes: d.storageInfo.volumes}),
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalClusterSpec_CreateNewClusterSchema: z.ZodType = z
  .object({
    applyPolicyDefaultValues: z.boolean().optional(),
    clusterName: z.string().optional(),
    sparkVersion: z.string().optional(),
    sparkConf: z.record(z.string(), z.string()).optional(),
    awsAttributes: z.lazy(() => marshalCreateAwsAttributesSchema).optional(),
    azureAttributes: z
      .lazy(() => marshalCreateAzureAttributesSchema)
      .optional(),
    gcpAttributes: z.lazy(() => marshalCreateGcpAttributesSchema).optional(),
    nodeTypeId: z.string().optional(),
    driverNodeTypeId: z.string().optional(),
    workerNodeTypeFlexibility: z
      .lazy(() => marshalCreateNodeTypeFlexibilitySchema)
      .optional(),
    driverNodeTypeFlexibility: z
      .lazy(() => marshalCreateNodeTypeFlexibilitySchema)
      .optional(),
    sshPublicKeys: z.array(z.string()).optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    clusterLogConf: z.lazy(() => marshalCreateClusterLogConfSchema).optional(),
    sparkEnvVars: z.record(z.string(), z.string()).optional(),
    autoterminationMinutes: z.number().optional(),
    enableElasticDisk: z.boolean().optional(),
    initScripts: z
      .array(z.lazy(() => marshalCreateInitScriptInfoSchema))
      .optional(),
    dockerImage: z.lazy(() => marshalCreateDockerImageSchema).optional(),
    instancePoolId: z.string().optional(),
    singleUserName: z.string().optional(),
    policyId: z.string().optional(),
    enableLocalDiskEncryption: z.boolean().optional(),
    driverInstancePoolId: z.string().optional(),
    workloadType: z.lazy(() => marshalCreateWorkloadTypeSchema).optional(),
    dataSecurityMode: z.string().optional(),
    runtimeEngine: z.string().optional(),
    kind: z.string().optional(),
    useMlRuntime: z.boolean().optional(),
    isSingleNode: z.boolean().optional(),
    remoteDiskThroughput: z.number().optional(),
    totalInitialRemoteDiskSize: z.number().optional(),
    size: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('numWorkers'), numWorkers: z.number()}),
        z.object({
          $case: z.literal('autoscale'),
          autoscale: z.lazy(() => marshalCreateAutoScaleSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    apply_policy_default_values: d.applyPolicyDefaultValues,
    cluster_name: d.clusterName,
    spark_version: d.sparkVersion,
    spark_conf: d.sparkConf,
    aws_attributes: d.awsAttributes,
    azure_attributes: d.azureAttributes,
    gcp_attributes: d.gcpAttributes,
    node_type_id: d.nodeTypeId,
    driver_node_type_id: d.driverNodeTypeId,
    worker_node_type_flexibility: d.workerNodeTypeFlexibility,
    driver_node_type_flexibility: d.driverNodeTypeFlexibility,
    ssh_public_keys: d.sshPublicKeys,
    custom_tags: d.customTags,
    cluster_log_conf: d.clusterLogConf,
    spark_env_vars: d.sparkEnvVars,
    autotermination_minutes: d.autoterminationMinutes,
    enable_elastic_disk: d.enableElasticDisk,
    init_scripts: d.initScripts,
    docker_image: d.dockerImage,
    instance_pool_id: d.instancePoolId,
    single_user_name: d.singleUserName,
    policy_id: d.policyId,
    enable_local_disk_encryption: d.enableLocalDiskEncryption,
    driver_instance_pool_id: d.driverInstancePoolId,
    workload_type: d.workloadType,
    data_security_mode: d.dataSecurityMode,
    runtime_engine: d.runtimeEngine,
    kind: d.kind,
    use_ml_runtime: d.useMlRuntime,
    is_single_node: d.isSingleNode,
    remote_disk_throughput: d.remoteDiskThroughput,
    total_initial_remote_disk_size: d.totalInitialRemoteDiskSize,
    ...(d.size?.$case === 'numWorkers' && {num_workers: d.size.numWorkers}),
    ...(d.size?.$case === 'autoscale' && {autoscale: d.size.autoscale}),
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalClusterSpec_NewClusterSchema: z.ZodType = z
  .object({
    applyPolicyDefaultValues: z.boolean().optional(),
    clusterName: z.string().optional(),
    sparkVersion: z.string().optional(),
    sparkConf: z.record(z.string(), z.string()).optional(),
    awsAttributes: z.lazy(() => marshalAwsAttributesSchema).optional(),
    azureAttributes: z.lazy(() => marshalAzureAttributesSchema).optional(),
    gcpAttributes: z.lazy(() => marshalGcpAttributesSchema).optional(),
    nodeTypeId: z.string().optional(),
    driverNodeTypeId: z.string().optional(),
    workerNodeTypeFlexibility: z
      .lazy(() => marshalNodeTypeFlexibilitySchema)
      .optional(),
    driverNodeTypeFlexibility: z
      .lazy(() => marshalNodeTypeFlexibilitySchema)
      .optional(),
    sshPublicKeys: z.array(z.string()).optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    clusterLogConf: z.lazy(() => marshalClusterLogConfSchema).optional(),
    sparkEnvVars: z.record(z.string(), z.string()).optional(),
    autoterminationMinutes: z.number().optional(),
    enableElasticDisk: z.boolean().optional(),
    initScripts: z.array(z.lazy(() => marshalInitScriptInfoSchema)).optional(),
    dockerImage: z.lazy(() => marshalDockerImageSchema).optional(),
    instancePoolId: z.string().optional(),
    singleUserName: z.string().optional(),
    policyId: z.string().optional(),
    enableLocalDiskEncryption: z.boolean().optional(),
    driverInstancePoolId: z.string().optional(),
    workloadType: z.lazy(() => marshalWorkloadTypeSchema).optional(),
    dataSecurityMode: z.string().optional(),
    runtimeEngine: z.string().optional(),
    kind: z.string().optional(),
    useMlRuntime: z.boolean().optional(),
    isSingleNode: z.boolean().optional(),
    remoteDiskThroughput: z.number().optional(),
    totalInitialRemoteDiskSize: z.number().optional(),
    size: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('numWorkers'), numWorkers: z.number()}),
        z.object({
          $case: z.literal('autoscale'),
          autoscale: z.lazy(() => marshalAutoScaleSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    apply_policy_default_values: d.applyPolicyDefaultValues,
    cluster_name: d.clusterName,
    spark_version: d.sparkVersion,
    spark_conf: d.sparkConf,
    aws_attributes: d.awsAttributes,
    azure_attributes: d.azureAttributes,
    gcp_attributes: d.gcpAttributes,
    node_type_id: d.nodeTypeId,
    driver_node_type_id: d.driverNodeTypeId,
    worker_node_type_flexibility: d.workerNodeTypeFlexibility,
    driver_node_type_flexibility: d.driverNodeTypeFlexibility,
    ssh_public_keys: d.sshPublicKeys,
    custom_tags: d.customTags,
    cluster_log_conf: d.clusterLogConf,
    spark_env_vars: d.sparkEnvVars,
    autotermination_minutes: d.autoterminationMinutes,
    enable_elastic_disk: d.enableElasticDisk,
    init_scripts: d.initScripts,
    docker_image: d.dockerImage,
    instance_pool_id: d.instancePoolId,
    single_user_name: d.singleUserName,
    policy_id: d.policyId,
    enable_local_disk_encryption: d.enableLocalDiskEncryption,
    driver_instance_pool_id: d.driverInstancePoolId,
    workload_type: d.workloadType,
    data_security_mode: d.dataSecurityMode,
    runtime_engine: d.runtimeEngine,
    kind: d.kind,
    use_ml_runtime: d.useMlRuntime,
    is_single_node: d.isSingleNode,
    remote_disk_throughput: d.remoteDiskThroughput,
    total_initial_remote_disk_size: d.totalInitialRemoteDiskSize,
    ...(d.size?.$case === 'numWorkers' && {num_workers: d.size.numWorkers}),
    ...(d.size?.$case === 'autoscale' && {autoscale: d.size.autoscale}),
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalClusterSpec_UpdateNewClusterSchema: z.ZodType = z
  .object({
    applyPolicyDefaultValues: z.boolean().optional(),
    clusterName: z.string().optional(),
    sparkVersion: z.string().optional(),
    sparkConf: z.record(z.string(), z.string()).optional(),
    awsAttributes: z.lazy(() => marshalUpdateAwsAttributesSchema).optional(),
    azureAttributes: z
      .lazy(() => marshalUpdateAzureAttributesSchema)
      .optional(),
    gcpAttributes: z.lazy(() => marshalUpdateGcpAttributesSchema).optional(),
    nodeTypeId: z.string().optional(),
    driverNodeTypeId: z.string().optional(),
    workerNodeTypeFlexibility: z
      .lazy(() => marshalUpdateNodeTypeFlexibilitySchema)
      .optional(),
    driverNodeTypeFlexibility: z
      .lazy(() => marshalUpdateNodeTypeFlexibilitySchema)
      .optional(),
    sshPublicKeys: z.array(z.string()).optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    clusterLogConf: z.lazy(() => marshalUpdateClusterLogConfSchema).optional(),
    sparkEnvVars: z.record(z.string(), z.string()).optional(),
    autoterminationMinutes: z.number().optional(),
    enableElasticDisk: z.boolean().optional(),
    initScripts: z
      .array(z.lazy(() => marshalUpdateInitScriptInfoSchema))
      .optional(),
    dockerImage: z.lazy(() => marshalUpdateDockerImageSchema).optional(),
    instancePoolId: z.string().optional(),
    singleUserName: z.string().optional(),
    policyId: z.string().optional(),
    enableLocalDiskEncryption: z.boolean().optional(),
    driverInstancePoolId: z.string().optional(),
    workloadType: z.lazy(() => marshalUpdateWorkloadTypeSchema).optional(),
    dataSecurityMode: z.string().optional(),
    runtimeEngine: z.string().optional(),
    kind: z.string().optional(),
    useMlRuntime: z.boolean().optional(),
    isSingleNode: z.boolean().optional(),
    remoteDiskThroughput: z.number().optional(),
    totalInitialRemoteDiskSize: z.number().optional(),
    size: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('numWorkers'), numWorkers: z.number()}),
        z.object({
          $case: z.literal('autoscale'),
          autoscale: z.lazy(() => marshalUpdateAutoScaleSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    apply_policy_default_values: d.applyPolicyDefaultValues,
    cluster_name: d.clusterName,
    spark_version: d.sparkVersion,
    spark_conf: d.sparkConf,
    aws_attributes: d.awsAttributes,
    azure_attributes: d.azureAttributes,
    gcp_attributes: d.gcpAttributes,
    node_type_id: d.nodeTypeId,
    driver_node_type_id: d.driverNodeTypeId,
    worker_node_type_flexibility: d.workerNodeTypeFlexibility,
    driver_node_type_flexibility: d.driverNodeTypeFlexibility,
    ssh_public_keys: d.sshPublicKeys,
    custom_tags: d.customTags,
    cluster_log_conf: d.clusterLogConf,
    spark_env_vars: d.sparkEnvVars,
    autotermination_minutes: d.autoterminationMinutes,
    enable_elastic_disk: d.enableElasticDisk,
    init_scripts: d.initScripts,
    docker_image: d.dockerImage,
    instance_pool_id: d.instancePoolId,
    single_user_name: d.singleUserName,
    policy_id: d.policyId,
    enable_local_disk_encryption: d.enableLocalDiskEncryption,
    driver_instance_pool_id: d.driverInstancePoolId,
    workload_type: d.workloadType,
    data_security_mode: d.dataSecurityMode,
    runtime_engine: d.runtimeEngine,
    kind: d.kind,
    use_ml_runtime: d.useMlRuntime,
    is_single_node: d.isSingleNode,
    remote_disk_throughput: d.remoteDiskThroughput,
    total_initial_remote_disk_size: d.totalInitialRemoteDiskSize,
    ...(d.size?.$case === 'numWorkers' && {num_workers: d.size.numWorkers}),
    ...(d.size?.$case === 'autoscale' && {autoscale: d.size.autoscale}),
  }));

export const marshalComputeSchema: z.ZodType = z
  .object({
    hardwareAccelerator: z.string().optional(),
  })
  .transform(d => ({
    hardware_accelerator: d.hardwareAccelerator,
  }));

export const marshalComputeConfigSchema: z.ZodType = z
  .object({
    numGpus: z.number().optional(),
    gpuNodePoolId: z.string().optional(),
    gpuType: z.string().optional(),
  })
  .transform(d => ({
    num_gpus: d.numGpus,
    gpu_node_pool_id: d.gpuNodePoolId,
    gpu_type: d.gpuType,
  }));

export const marshalComputeSpecSchema: z.ZodType = z
  .object({
    acceleratorType: z.string().optional(),
    acceleratorCount: z.number().optional(),
  })
  .transform(d => ({
    accelerator_type: d.acceleratorType,
    accelerator_count: d.acceleratorCount,
  }));

export const marshalConditionTaskSchema: z.ZodType = z
  .object({
    op: z.string().optional(),
    left: z.string().optional(),
    right: z.string().optional(),
    outcome: z.string().optional(),
  })
  .transform(d => ({
    op: d.op,
    left: d.left,
    right: d.right,
    outcome: d.outcome,
  }));

export const marshalCreateAdlsgen2InfoSchema: z.ZodType = z
  .object({
    destination: z.string(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalCreateAiRuntimeTaskSchema: z.ZodType = z
  .object({
    experiment: z.string(),
    deployments: z.array(z.lazy(() => marshalCreateDeploymentSpecSchema)),
    codeSourcePath: z.string().optional(),
    mlflowRun: z.string().optional(),
    mlflowExperimentDirectory: z.string().optional(),
  })
  .transform(d => ({
    experiment: d.experiment,
    deployments: d.deployments,
    code_source_path: d.codeSourcePath,
    mlflow_run: d.mlflowRun,
    mlflow_experiment_directory: d.mlflowExperimentDirectory,
  }));

export const marshalCreateAlertTaskSchema: z.ZodType = z
  .object({
    alertId: z.string().optional(),
    warehouseId: z.string().optional(),
    workspacePath: z.string().optional(),
    subscribers: z
      .array(z.lazy(() => marshalCreateAlertTaskSubscriberSchema))
      .optional(),
  })
  .transform(d => ({
    alert_id: d.alertId,
    warehouse_id: d.warehouseId,
    workspace_path: d.workspacePath,
    subscribers: d.subscribers,
  }));

export const marshalCreateAlertTaskSubscriberSchema: z.ZodType = z
  .object({
    subscriberType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriberType?.$case === 'userName' && {
      user_name: d.subscriberType.userName,
    }),
    ...(d.subscriberType?.$case === 'destinationId' && {
      destination_id: d.subscriberType.destinationId,
    }),
  }));

export const marshalCreateAutoScaleSchema: z.ZodType = z
  .object({
    minWorkers: z.number().optional(),
    maxWorkers: z.number().optional(),
  })
  .transform(d => ({
    min_workers: d.minWorkers,
    max_workers: d.maxWorkers,
  }));

export const marshalCreateAwsAttributesSchema: z.ZodType = z
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

export const marshalCreateAzureAttributesSchema: z.ZodType = z
  .object({
    logAnalyticsInfo: z
      .lazy(() => marshalCreateLogAnalyticsInfoSchema)
      .optional(),
    firstOnDemand: z.number().optional(),
    availability: z.string().optional(),
    spotBidMaxPrice: z.number().optional(),
    capacityReservationGroup: z.string().optional(),
  })
  .transform(d => ({
    log_analytics_info: d.logAnalyticsInfo,
    first_on_demand: d.firstOnDemand,
    availability: d.availability,
    spot_bid_max_price: d.spotBidMaxPrice,
    capacity_reservation_group: d.capacityReservationGroup,
  }));

export const marshalCreateCleanRoomsNotebookTaskSchema: z.ZodType = z
  .object({
    cleanRoomName: z.string(),
    notebookName: z.string(),
    etag: z.string().optional(),
    notebookBaseParameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    clean_room_name: d.cleanRoomName,
    notebook_name: d.notebookName,
    etag: d.etag,
    notebook_base_parameters: d.notebookBaseParameters,
  }));

export const marshalCreateClusterLogConfSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalCreateDbfsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('s3'),
          s3: z.lazy(() => marshalCreateS3StorageInfoSchema),
        }),
        z.object({
          $case: z.literal('volumes'),
          volumes: z.lazy(() => marshalCreateVolumesStorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
    ...(d.storageInfo?.$case === 's3' && {s3: d.storageInfo.s3}),
    ...(d.storageInfo?.$case === 'volumes' && {volumes: d.storageInfo.volumes}),
  }));

export const marshalCreateComputeSchema: z.ZodType = z
  .object({
    hardwareAccelerator: z.string().optional(),
  })
  .transform(d => ({
    hardware_accelerator: d.hardwareAccelerator,
  }));

export const marshalCreateComputeConfigSchema: z.ZodType = z
  .object({
    numGpus: z.number(),
    gpuNodePoolId: z.string().optional(),
    gpuType: z.string().optional(),
  })
  .transform(d => ({
    num_gpus: d.numGpus,
    gpu_node_pool_id: d.gpuNodePoolId,
    gpu_type: d.gpuType,
  }));

export const marshalCreateComputeSpecSchema: z.ZodType = z
  .object({
    acceleratorType: z.string(),
    acceleratorCount: z.number(),
  })
  .transform(d => ({
    accelerator_type: d.acceleratorType,
    accelerator_count: d.acceleratorCount,
  }));

export const marshalCreateConditionTaskSchema: z.ZodType = z
  .object({
    op: z.string(),
    left: z.string(),
    right: z.string(),
    outcome: z.string().optional(),
  })
  .transform(d => ({
    op: d.op,
    left: d.left,
    right: d.right,
    outcome: d.outcome,
  }));

export const marshalCreateContinuousSettingsSchema: z.ZodType = z
  .object({
    pauseStatus: z.string().optional(),
    taskRetryMode: z.string().optional(),
  })
  .transform(d => ({
    pause_status: d.pauseStatus,
    task_retry_mode: d.taskRetryMode,
  }));

export const marshalCreateCronScheduleSchema: z.ZodType = z
  .object({
    quartzCronExpression: z.string(),
    timezoneId: z.string(),
    pauseStatus: z.string().optional(),
  })
  .transform(d => ({
    quartz_cron_expression: d.quartzCronExpression,
    timezone_id: d.timezoneId,
    pause_status: d.pauseStatus,
  }));

export const marshalCreateDashboardTaskSchema: z.ZodType = z
  .object({
    subscription: z.lazy(() => marshalCreateSubscriptionSchema).optional(),
    warehouseId: z.string().optional(),
    dashboardId: z.string().optional(),
    filters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    subscription: d.subscription,
    warehouse_id: d.warehouseId,
    dashboard_id: d.dashboardId,
    filters: d.filters,
  }));

export const marshalCreateDbfsStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalCreateDbtCloudTaskSchema: z.ZodType = z
  .object({
    dbtCloudJobId: z.bigint().optional(),
    connectionResourceName: z.string().optional(),
  })
  .transform(d => ({
    dbt_cloud_job_id: d.dbtCloudJobId,
    connection_resource_name: d.connectionResourceName,
  }));

export const marshalCreateDbtPlatformTaskSchema: z.ZodType = z
  .object({
    dbtPlatformJobId: z.string().optional(),
    connectionResourceName: z.string().optional(),
  })
  .transform(d => ({
    dbt_platform_job_id: d.dbtPlatformJobId,
    connection_resource_name: d.connectionResourceName,
  }));

export const marshalCreateDbtTaskSchema: z.ZodType = z
  .object({
    projectDirectory: z.string().optional(),
    commands: z.array(z.string()),
    schema: z.string().optional(),
    warehouseId: z.string().optional(),
    profilesDirectory: z.string().optional(),
    catalog: z.string().optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    project_directory: d.projectDirectory,
    commands: d.commands,
    schema: d.schema,
    warehouse_id: d.warehouseId,
    profiles_directory: d.profilesDirectory,
    catalog: d.catalog,
    source: d.source,
  }));

export const marshalCreateDeploymentSpecSchema: z.ZodType = z
  .object({
    commandPath: z.string(),
    compute: z.lazy(() => marshalCreateComputeSpecSchema),
    name: z.string().optional(),
  })
  .transform(d => ({
    command_path: d.commandPath,
    compute: d.compute,
    name: d.name,
  }));

export const marshalCreateDockerBasicAuthSchema: z.ZodType = z
  .object({
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .transform(d => ({
    username: d.username,
    password: d.password,
  }));

export const marshalCreateDockerImageSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    credsOneof: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('basicAuth'),
          basicAuth: z.lazy(() => marshalCreateDockerBasicAuthSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    url: d.url,
    ...(d.credsOneof?.$case === 'basicAuth' && {
      basic_auth: d.credsOneof.basicAuth,
    }),
  }));

export const marshalCreateEnvironmentSchema: z.ZodType = z
  .object({
    client: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    baseEnvironment: z.string().optional(),
    environmentVersion: z.string().optional(),
    javaDependencies: z.array(z.string()).optional(),
  })
  .transform(d => ({
    client: d.client,
    dependencies: d.dependencies,
    base_environment: d.baseEnvironment,
    environment_version: d.environmentVersion,
    java_dependencies: d.javaDependencies,
  }));

export const marshalCreateFileArrivalTriggerConfigurationSchema: z.ZodType = z
  .object({
    url: z.string(),
    minTimeBetweenTriggersSeconds: z.number().optional(),
    waitAfterLastChangeSeconds: z.number().optional(),
  })
  .transform(d => ({
    url: d.url,
    min_time_between_triggers_seconds: d.minTimeBetweenTriggersSeconds,
    wait_after_last_change_seconds: d.waitAfterLastChangeSeconds,
  }));

export const marshalCreateForEachTaskSchema: z.ZodType = z
  .object({
    inputs: z.string(),
    concurrency: z.number().optional(),
    task: z.lazy(() => marshalCreateTaskSettingsSchema),
  })
  .transform(d => ({
    inputs: d.inputs,
    concurrency: d.concurrency,
    task: d.task,
  }));

export const marshalCreateGcpAttributesSchema: z.ZodType = z
  .object({
    usePreemptibleExecutors: z.boolean().optional(),
    googleServiceAccount: z.string().optional(),
    bootDiskSize: z.number().optional(),
    availability: z.string().optional(),
    zoneId: z.string().optional(),
    localSsdCount: z.number().optional(),
    firstOnDemand: z.number().optional(),
    confidentialComputeType: z.string().optional(),
  })
  .transform(d => ({
    use_preemptible_executors: d.usePreemptibleExecutors,
    google_service_account: d.googleServiceAccount,
    boot_disk_size: d.bootDiskSize,
    availability: d.availability,
    zone_id: d.zoneId,
    local_ssd_count: d.localSsdCount,
    first_on_demand: d.firstOnDemand,
    confidential_compute_type: d.confidentialComputeType,
  }));

export const marshalCreateGcsStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalCreateGenAiComputeTaskSchema: z.ZodType = z
  .object({
    dlRuntimeImage: z.string(),
    compute: z.lazy(() => marshalCreateComputeConfigSchema).optional(),
    command: z.string().optional(),
    source: z.string().optional(),
    trainingScriptPath: z.string().optional(),
    yamlParametersFilePath: z.string().optional(),
    yamlParameters: z.string().optional(),
    mlflowExperimentName: z.string().optional(),
  })
  .transform(d => ({
    dl_runtime_image: d.dlRuntimeImage,
    compute: d.compute,
    command: d.command,
    source: d.source,
    training_script_path: d.trainingScriptPath,
    yaml_parameters_file_path: d.yamlParametersFilePath,
    yaml_parameters: d.yamlParameters,
    mlflow_experiment_name: d.mlflowExperimentName,
  }));

export const marshalCreateGitMetadataSnapshotSchema: z.ZodType = z
  .object({
    usedCommit: z.string().optional(),
  })
  .transform(d => ({
    used_commit: d.usedCommit,
  }));

export const marshalCreateGitSourceSchema: z.ZodType = z
  .object({
    gitUrl: z.string(),
    gitProvider: z.string(),
    gitReference: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('gitBranch'), gitBranch: z.string()}),
        z.object({$case: z.literal('gitTag'), gitTag: z.string()}),
        z.object({$case: z.literal('gitCommit'), gitCommit: z.string()}),
      ])
      .optional(),
    gitSnapshot: z
      .lazy(() => marshalCreateGitMetadataSnapshotSchema)
      .optional(),
    jobSource: z.lazy(() => marshalCreateJobSourceSchema).optional(),
    sparseCheckout: z.lazy(() => marshalCreateSparseCheckoutSchema).optional(),
  })
  .transform(d => ({
    git_url: d.gitUrl,
    git_provider: d.gitProvider,
    ...(d.gitReference?.$case === 'gitBranch' && {
      git_branch: d.gitReference.gitBranch,
    }),
    ...(d.gitReference?.$case === 'gitTag' && {git_tag: d.gitReference.gitTag}),
    ...(d.gitReference?.$case === 'gitCommit' && {
      git_commit: d.gitReference.gitCommit,
    }),
    git_snapshot: d.gitSnapshot,
    job_source: d.jobSource,
    sparse_checkout: d.sparseCheckout,
  }));

export const marshalCreateInitScriptInfoSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalCreateDbfsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('s3'),
          s3: z.lazy(() => marshalCreateS3StorageInfoSchema),
        }),
        z.object({
          $case: z.literal('file'),
          file: z.lazy(() => marshalCreateLocalFileInfoSchema),
        }),
        z.object({
          $case: z.literal('gcs'),
          gcs: z.lazy(() => marshalCreateGcsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('abfss'),
          abfss: z.lazy(() => marshalCreateAdlsgen2InfoSchema),
        }),
        z.object({
          $case: z.literal('workspace'),
          workspace: z.lazy(() => marshalCreateWorkspaceStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('volumes'),
          volumes: z.lazy(() => marshalCreateVolumesStorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
    ...(d.storageInfo?.$case === 's3' && {s3: d.storageInfo.s3}),
    ...(d.storageInfo?.$case === 'file' && {file: d.storageInfo.file}),
    ...(d.storageInfo?.$case === 'gcs' && {gcs: d.storageInfo.gcs}),
    ...(d.storageInfo?.$case === 'abfss' && {abfss: d.storageInfo.abfss}),
    ...(d.storageInfo?.$case === 'workspace' && {
      workspace: d.storageInfo.workspace,
    }),
    ...(d.storageInfo?.$case === 'volumes' && {volumes: d.storageInfo.volumes}),
  }));

export const marshalCreateJobClusterSchema: z.ZodType = z
  .object({
    jobClusterKey: z.string(),
    newCluster: z.lazy(() => marshalClusterSpec_CreateNewClusterSchema),
  })
  .transform(d => ({
    job_cluster_key: d.jobClusterKey,
    new_cluster: d.newCluster,
  }));

export const marshalCreateJobDeploymentSchema: z.ZodType = z
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

export const marshalCreateJobEmailNotificationsSchema: z.ZodType = z
  .object({
    onStart: z.array(z.string()).optional(),
    onSuccess: z.array(z.string()).optional(),
    onFailure: z.array(z.string()).optional(),
    onDurationWarningThresholdExceeded: z.array(z.string()).optional(),
    onStreamingBacklogExceeded: z.array(z.string()).optional(),
    noAlertForSkippedRuns: z.boolean().optional(),
  })
  .transform(d => ({
    on_start: d.onStart,
    on_success: d.onSuccess,
    on_failure: d.onFailure,
    on_duration_warning_threshold_exceeded:
      d.onDurationWarningThresholdExceeded,
    on_streaming_backlog_exceeded: d.onStreamingBacklogExceeded,
    no_alert_for_skipped_runs: d.noAlertForSkippedRuns,
  }));

export const marshalCreateJobEnvironmentSchema: z.ZodType = z
  .object({
    environmentKey: z.string(),
    spec: z.lazy(() => marshalCreateEnvironmentSchema).optional(),
  })
  .transform(d => ({
    environment_key: d.environmentKey,
    spec: d.spec,
  }));

export const marshalCreateJobLevelParameterSchema: z.ZodType = z
  .object({
    name: z.string(),
    default: z.string(),
  })
  .transform(d => ({
    name: d.name,
    default: d.default,
  }));

export const marshalCreateJobRequestSchema: z.ZodType = z
  .object({
    accessControlList: z
      .array(z.lazy(() => marshalAccessControlRequestSchema))
      .optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    emailNotifications: z
      .lazy(() => marshalCreateJobEmailNotificationsSchema)
      .optional(),
    webhookNotifications: z
      .lazy(() => marshalCreateWebhookNotificationsSchema)
      .optional(),
    notificationSettings: z
      .lazy(() => marshalCreateNotificationSettingsSchema)
      .optional(),
    timeoutSeconds: z.number().optional(),
    health: z.lazy(() => marshalCreateJobsHealthRulesSchema).optional(),
    schedule: z.lazy(() => marshalCreateCronScheduleSchema).optional(),
    trigger: z.lazy(() => marshalCreateTriggerSettingsSchema).optional(),
    continuous: z.lazy(() => marshalCreateContinuousSettingsSchema).optional(),
    maxConcurrentRuns: z.number().optional(),
    tasks: z.array(z.lazy(() => marshalCreateTaskSettingsSchema)).optional(),
    jobClusters: z
      .array(z.lazy(() => marshalCreateJobClusterSchema))
      .optional(),
    gitSource: z.lazy(() => marshalCreateGitSourceSchema).optional(),
    tags: z.record(z.string(), z.string()).optional(),
    format: z.string().optional(),
    queue: z.lazy(() => marshalCreateQueueSettingsSchema).optional(),
    parameters: z
      .array(z.lazy(() => marshalCreateJobLevelParameterSchema))
      .optional(),
    runAs: z.lazy(() => marshalCreateJobRunAsSchema).optional(),
    editMode: z.string().optional(),
    deployment: z.lazy(() => marshalCreateJobDeploymentSchema).optional(),
    environments: z
      .array(z.lazy(() => marshalCreateJobEnvironmentSchema))
      .optional(),
    budgetPolicyId: z.string().optional(),
    usagePolicyId: z.string().optional(),
    performanceTarget: z.string().optional(),
    maxRetries: z.number().optional(),
    minRetryIntervalMillis: z.number().optional(),
    retryOnTimeout: z.boolean().optional(),
    disableAutoOptimization: z.boolean().optional(),
  })
  .transform(d => ({
    access_control_list: d.accessControlList,
    name: d.name,
    description: d.description,
    email_notifications: d.emailNotifications,
    webhook_notifications: d.webhookNotifications,
    notification_settings: d.notificationSettings,
    timeout_seconds: d.timeoutSeconds,
    health: d.health,
    schedule: d.schedule,
    trigger: d.trigger,
    continuous: d.continuous,
    max_concurrent_runs: d.maxConcurrentRuns,
    tasks: d.tasks,
    job_clusters: d.jobClusters,
    git_source: d.gitSource,
    tags: d.tags,
    format: d.format,
    queue: d.queue,
    parameters: d.parameters,
    run_as: d.runAs,
    edit_mode: d.editMode,
    deployment: d.deployment,
    environments: d.environments,
    budget_policy_id: d.budgetPolicyId,
    usage_policy_id: d.usagePolicyId,
    performance_target: d.performanceTarget,
    max_retries: d.maxRetries,
    min_retry_interval_millis: d.minRetryIntervalMillis,
    retry_on_timeout: d.retryOnTimeout,
    disable_auto_optimization: d.disableAutoOptimization,
  }));

export const marshalCreateJobRunAsSchema: z.ZodType = z
  .object({
    identity: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('servicePrincipalName'),
          servicePrincipalName: z.string(),
        }),
        z.object({$case: z.literal('groupName'), groupName: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.identity?.$case === 'userName' && {user_name: d.identity.userName}),
    ...(d.identity?.$case === 'servicePrincipalName' && {
      service_principal_name: d.identity.servicePrincipalName,
    }),
    ...(d.identity?.$case === 'groupName' && {
      group_name: d.identity.groupName,
    }),
  }));

export const marshalCreateJobSettingsSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    emailNotifications: z
      .lazy(() => marshalCreateJobEmailNotificationsSchema)
      .optional(),
    webhookNotifications: z
      .lazy(() => marshalCreateWebhookNotificationsSchema)
      .optional(),
    notificationSettings: z
      .lazy(() => marshalCreateNotificationSettingsSchema)
      .optional(),
    timeoutSeconds: z.number().optional(),
    health: z.lazy(() => marshalCreateJobsHealthRulesSchema).optional(),
    schedule: z.lazy(() => marshalCreateCronScheduleSchema).optional(),
    trigger: z.lazy(() => marshalCreateTriggerSettingsSchema).optional(),
    continuous: z.lazy(() => marshalCreateContinuousSettingsSchema).optional(),
    maxConcurrentRuns: z.number().optional(),
    tasks: z.array(z.lazy(() => marshalCreateTaskSettingsSchema)).optional(),
    jobClusters: z
      .array(z.lazy(() => marshalCreateJobClusterSchema))
      .optional(),
    gitSource: z.lazy(() => marshalCreateGitSourceSchema).optional(),
    tags: z.record(z.string(), z.string()).optional(),
    format: z.string().optional(),
    queue: z.lazy(() => marshalCreateQueueSettingsSchema).optional(),
    parameters: z
      .array(z.lazy(() => marshalCreateJobLevelParameterSchema))
      .optional(),
    runAs: z.lazy(() => marshalCreateJobRunAsSchema).optional(),
    editMode: z.string().optional(),
    deployment: z.lazy(() => marshalCreateJobDeploymentSchema).optional(),
    environments: z
      .array(z.lazy(() => marshalCreateJobEnvironmentSchema))
      .optional(),
    budgetPolicyId: z.string().optional(),
    usagePolicyId: z.string().optional(),
    performanceTarget: z.string().optional(),
    maxRetries: z.number().optional(),
    minRetryIntervalMillis: z.number().optional(),
    retryOnTimeout: z.boolean().optional(),
    disableAutoOptimization: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    email_notifications: d.emailNotifications,
    webhook_notifications: d.webhookNotifications,
    notification_settings: d.notificationSettings,
    timeout_seconds: d.timeoutSeconds,
    health: d.health,
    schedule: d.schedule,
    trigger: d.trigger,
    continuous: d.continuous,
    max_concurrent_runs: d.maxConcurrentRuns,
    tasks: d.tasks,
    job_clusters: d.jobClusters,
    git_source: d.gitSource,
    tags: d.tags,
    format: d.format,
    queue: d.queue,
    parameters: d.parameters,
    run_as: d.runAs,
    edit_mode: d.editMode,
    deployment: d.deployment,
    environments: d.environments,
    budget_policy_id: d.budgetPolicyId,
    usage_policy_id: d.usagePolicyId,
    performance_target: d.performanceTarget,
    max_retries: d.maxRetries,
    min_retry_interval_millis: d.minRetryIntervalMillis,
    retry_on_timeout: d.retryOnTimeout,
    disable_auto_optimization: d.disableAutoOptimization,
  }));

export const marshalCreateJobSourceSchema: z.ZodType = z
  .object({
    jobConfigPath: z.string(),
    importFromGitReference: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('importFromGitBranch'),
          importFromGitBranch: z.string(),
        }),
      ])
      .optional(),
    dirtyState: z.string().optional(),
  })
  .transform(d => ({
    job_config_path: d.jobConfigPath,
    ...(d.importFromGitReference?.$case === 'importFromGitBranch' && {
      import_from_git_branch: d.importFromGitReference.importFromGitBranch,
    }),
    dirty_state: d.dirtyState,
  }));

export const marshalCreateJobsHealthRuleSchema: z.ZodType = z
  .object({
    metric: z.string(),
    op: z.string(),
    value: z.bigint(),
  })
  .transform(d => ({
    metric: d.metric,
    op: d.op,
    value: d.value,
  }));

export const marshalCreateJobsHealthRulesSchema: z.ZodType = z
  .object({
    rules: z.array(z.lazy(() => marshalCreateJobsHealthRuleSchema)).optional(),
  })
  .transform(d => ({
    rules: d.rules,
  }));

export const marshalCreateLibrarySchema: z.ZodType = z
  .object({
    lib: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('jar'), jar: z.string()}),
        z.object({$case: z.literal('egg'), egg: z.string()}),
        z.object({
          $case: z.literal('pypi'),
          pypi: z.lazy(() => marshalCreatePythonPyPiLibrarySchema),
        }),
        z.object({
          $case: z.literal('maven'),
          maven: z.lazy(() => marshalCreateMavenLibrarySchema),
        }),
        z.object({
          $case: z.literal('cran'),
          cran: z.lazy(() => marshalCreateRCranLibrarySchema),
        }),
        z.object({$case: z.literal('whl'), whl: z.string()}),
        z.object({$case: z.literal('requirements'), requirements: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.lib?.$case === 'jar' && {jar: d.lib.jar}),
    ...(d.lib?.$case === 'egg' && {egg: d.lib.egg}),
    ...(d.lib?.$case === 'pypi' && {pypi: d.lib.pypi}),
    ...(d.lib?.$case === 'maven' && {maven: d.lib.maven}),
    ...(d.lib?.$case === 'cran' && {cran: d.lib.cran}),
    ...(d.lib?.$case === 'whl' && {whl: d.lib.whl}),
    ...(d.lib?.$case === 'requirements' && {requirements: d.lib.requirements}),
  }));

export const marshalCreateLocalFileInfoSchema: z.ZodType = z
  .object({
    destination: z.string(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalCreateLogAnalyticsInfoSchema: z.ZodType = z
  .object({
    logAnalyticsWorkspaceId: z.string().optional(),
    logAnalyticsPrimaryKey: z.string().optional(),
  })
  .transform(d => ({
    log_analytics_workspace_id: d.logAnalyticsWorkspaceId,
    log_analytics_primary_key: d.logAnalyticsPrimaryKey,
  }));

export const marshalCreateMavenLibrarySchema: z.ZodType = z
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

export const marshalCreateModelTriggerConfigurationSchema: z.ZodType = z
  .object({
    securableName: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    condition: z.string(),
    minTimeBetweenTriggersSeconds: z.number().optional(),
    waitAfterLastChangeSeconds: z.number().optional(),
  })
  .transform(d => ({
    securable_name: d.securableName,
    aliases: d.aliases,
    condition: d.condition,
    min_time_between_triggers_seconds: d.minTimeBetweenTriggersSeconds,
    wait_after_last_change_seconds: d.waitAfterLastChangeSeconds,
  }));

export const marshalCreateNodeTypeFlexibilitySchema: z.ZodType = z
  .object({
    alternateNodeTypeIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    alternate_node_type_ids: d.alternateNodeTypeIds,
  }));

export const marshalCreateNotebookTaskSchema: z.ZodType = z
  .object({
    notebookPath: z.string(),
    baseParameters: z.record(z.string(), z.string()).optional(),
    source: z.string().optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    notebook_path: d.notebookPath,
    base_parameters: d.baseParameters,
    source: d.source,
    warehouse_id: d.warehouseId,
  }));

export const marshalCreateNotificationSettingsSchema: z.ZodType = z
  .object({
    noAlertForSkippedRuns: z.boolean().optional(),
    noAlertForCanceledRuns: z.boolean().optional(),
    alertOnLastAttempt: z.boolean().optional(),
  })
  .transform(d => ({
    no_alert_for_skipped_runs: d.noAlertForSkippedRuns,
    no_alert_for_canceled_runs: d.noAlertForCanceledRuns,
    alert_on_last_attempt: d.alertOnLastAttempt,
  }));

export const marshalCreatePeriodicTriggerConfigurationSchema: z.ZodType = z
  .object({
    interval: z.number(),
    unit: z.string(),
  })
  .transform(d => ({
    interval: d.interval,
    unit: d.unit,
  }));

export const marshalCreatePipelineParametersSchema: z.ZodType = z
  .object({
    fullRefresh: z.boolean().optional(),
    refreshSelection: z.array(z.string()).optional(),
    fullRefreshSelection: z.array(z.string()).optional(),
    resetCheckpointSelection: z.array(z.string()).optional(),
    refreshFlowSelection: z.array(z.string()).optional(),
  })
  .transform(d => ({
    full_refresh: d.fullRefresh,
    refresh_selection: d.refreshSelection,
    full_refresh_selection: d.fullRefreshSelection,
    reset_checkpoint_selection: d.resetCheckpointSelection,
    refresh_flow_selection: d.refreshFlowSelection,
  }));

export const marshalCreatePipelineTaskSchema: z.ZodType = z
  .object({
    pipelineId: z.string(),
    pipelineTaskParameters: z.record(z.string(), z.string()).optional(),
    fullRefresh: z.boolean().optional(),
    refreshSelection: z.array(z.string()).optional(),
    fullRefreshSelection: z.array(z.string()).optional(),
    resetCheckpointSelection: z.array(z.string()).optional(),
    refreshFlowSelection: z.array(z.string()).optional(),
  })
  .transform(d => ({
    pipeline_id: d.pipelineId,
    parameters: d.pipelineTaskParameters,
    full_refresh: d.fullRefresh,
    refresh_selection: d.refreshSelection,
    full_refresh_selection: d.fullRefreshSelection,
    reset_checkpoint_selection: d.resetCheckpointSelection,
    refresh_flow_selection: d.refreshFlowSelection,
  }));

export const marshalCreatePowerBiModelSchema: z.ZodType = z
  .object({
    workspaceName: z.string().optional(),
    modelName: z.string().optional(),
    storageMode: z.string().optional(),
    authenticationMethod: z.string().optional(),
    overwriteExisting: z.boolean().optional(),
  })
  .transform(d => ({
    workspace_name: d.workspaceName,
    model_name: d.modelName,
    storage_mode: d.storageMode,
    authentication_method: d.authenticationMethod,
    overwrite_existing: d.overwriteExisting,
  }));

export const marshalCreatePowerBiTableSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
    storageMode: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog: d.catalog,
    schema: d.schema,
    storage_mode: d.storageMode,
  }));

export const marshalCreatePowerBiTaskSchema: z.ZodType = z
  .object({
    tables: z.array(z.lazy(() => marshalCreatePowerBiTableSchema)).optional(),
    warehouseId: z.string().optional(),
    powerBiModel: z.lazy(() => marshalCreatePowerBiModelSchema).optional(),
    connectionResourceName: z.string().optional(),
    refreshAfterUpdate: z.boolean().optional(),
  })
  .transform(d => ({
    tables: d.tables,
    warehouse_id: d.warehouseId,
    power_bi_model: d.powerBiModel,
    connection_resource_name: d.connectionResourceName,
    refresh_after_update: d.refreshAfterUpdate,
  }));

export const marshalCreatePythonOperatorTaskSchema: z.ZodType = z
  .object({
    parameters: z
      .array(z.lazy(() => marshalPythonOperatorTask_CreateParameterSchema))
      .optional(),
    main: z.string().optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
    main: d.main,
  }));

export const marshalCreatePythonPyPiLibrarySchema: z.ZodType = z
  .object({
    package: z.string(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const marshalCreatePythonWheelTaskSchema: z.ZodType = z
  .object({
    packageName: z.string(),
    entryPoint: z.string(),
    parameters: z.array(z.string()).optional(),
    namedParameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    package_name: d.packageName,
    entry_point: d.entryPoint,
    parameters: d.parameters,
    named_parameters: d.namedParameters,
  }));

export const marshalCreateQueueSettingsSchema: z.ZodType = z
  .object({
    enabled: z.boolean(),
  })
  .transform(d => ({
    enabled: d.enabled,
  }));

export const marshalCreateRCranLibrarySchema: z.ZodType = z
  .object({
    package: z.string(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const marshalCreateRunJobTaskSchema: z.ZodType = z
  .object({
    jobId: z.bigint(),
    jobParameters: z.record(z.string(), z.string()).optional(),
    pipelineParams: z
      .lazy(() => marshalCreatePipelineParametersSchema)
      .optional(),
    jarParams: z.array(z.string()).optional(),
    notebookParams: z.record(z.string(), z.string()).optional(),
    pythonParams: z.array(z.string()).optional(),
    sparkSubmitParams: z.array(z.string()).optional(),
    pythonNamedParams: z.record(z.string(), z.string()).optional(),
    sqlParams: z.record(z.string(), z.string()).optional(),
    dbtCommands: z.array(z.string()).optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    job_parameters: d.jobParameters,
    pipeline_params: d.pipelineParams,
    jar_params: d.jarParams,
    notebook_params: d.notebookParams,
    python_params: d.pythonParams,
    spark_submit_params: d.sparkSubmitParams,
    python_named_params: d.pythonNamedParams,
    sql_params: d.sqlParams,
    dbt_commands: d.dbtCommands,
  }));

export const marshalCreateS3StorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string(),
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

export const marshalCreateSparkJarTaskSchema: z.ZodType = z
  .object({
    jarUri: z.string().optional(),
    mainClassName: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    runAsRepl: z.boolean().optional(),
  })
  .transform(d => ({
    jar_uri: d.jarUri,
    main_class_name: d.mainClassName,
    parameters: d.parameters,
    run_as_repl: d.runAsRepl,
  }));

export const marshalCreateSparkPythonTaskSchema: z.ZodType = z
  .object({
    pythonFile: z.string(),
    parameters: z.array(z.string()).optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    python_file: d.pythonFile,
    parameters: d.parameters,
    source: d.source,
  }));

export const marshalCreateSparkSubmitTaskSchema: z.ZodType = z
  .object({
    parameters: z.array(z.string()).optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
  }));

export const marshalCreateSparseCheckoutSchema: z.ZodType = z
  .object({
    patterns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    patterns: d.patterns,
  }));

export const marshalCreateSqlTaskSchema: z.ZodType = z
  .object({
    parameters: z.record(z.string(), z.string()).optional(),
    sqlTaskType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('query'),
          query: z.lazy(() => marshalCreateSqlTaskQuerySchema),
        }),
        z.object({
          $case: z.literal('dashboard'),
          dashboard: z.lazy(() => marshalCreateSqlTaskDashboardSchema),
        }),
        z.object({
          $case: z.literal('alert'),
          alert: z.lazy(() => marshalCreateSqlTaskAlertSchema),
        }),
        z.object({
          $case: z.literal('file'),
          file: z.lazy(() => marshalCreateSqlTaskFileSchema),
        }),
      ])
      .optional(),
    warehouseId: z.string(),
  })
  .transform(d => ({
    parameters: d.parameters,
    ...(d.sqlTaskType?.$case === 'query' && {query: d.sqlTaskType.query}),
    ...(d.sqlTaskType?.$case === 'dashboard' && {
      dashboard: d.sqlTaskType.dashboard,
    }),
    ...(d.sqlTaskType?.$case === 'alert' && {alert: d.sqlTaskType.alert}),
    ...(d.sqlTaskType?.$case === 'file' && {file: d.sqlTaskType.file}),
    warehouse_id: d.warehouseId,
  }));

export const marshalCreateSqlTaskAlertSchema: z.ZodType = z
  .object({
    alertId: z.string(),
    subscriptions: z
      .array(z.lazy(() => marshalCreateSqlTaskSubscriptionSchema))
      .optional(),
    pauseSubscriptions: z.boolean().optional(),
  })
  .transform(d => ({
    alert_id: d.alertId,
    subscriptions: d.subscriptions,
    pause_subscriptions: d.pauseSubscriptions,
  }));

export const marshalCreateSqlTaskDashboardSchema: z.ZodType = z
  .object({
    dashboardId: z.string(),
    subscriptions: z
      .array(z.lazy(() => marshalCreateSqlTaskSubscriptionSchema))
      .optional(),
    customSubject: z.string().optional(),
    pauseSubscriptions: z.boolean().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
    subscriptions: d.subscriptions,
    custom_subject: d.customSubject,
    pause_subscriptions: d.pauseSubscriptions,
  }));

export const marshalCreateSqlTaskFileSchema: z.ZodType = z
  .object({
    path: z.string(),
    source: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
    source: d.source,
  }));

export const marshalCreateSqlTaskQuerySchema: z.ZodType = z
  .object({
    queryType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('queryId'), queryId: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.queryType?.$case === 'queryId' && {query_id: d.queryType.queryId}),
  }));

export const marshalCreateSqlTaskSubscriptionSchema: z.ZodType = z
  .object({
    subscriptionType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriptionType?.$case === 'userName' && {
      user_name: d.subscriptionType.userName,
    }),
    ...(d.subscriptionType?.$case === 'destinationId' && {
      destination_id: d.subscriptionType.destinationId,
    }),
  }));

export const marshalCreateSubscriptionSchema: z.ZodType = z
  .object({
    subscribers: z
      .array(z.lazy(() => marshalSubscription_CreateSubscriberSchema))
      .optional(),
    paused: z.boolean().optional(),
    customSubject: z.string().optional(),
  })
  .transform(d => ({
    subscribers: d.subscribers,
    paused: d.paused,
    custom_subject: d.customSubject,
  }));

export const marshalCreateTableTriggerConfigurationSchema: z.ZodType = z
  .object({
    tableNames: z.array(z.string()),
    minTimeBetweenTriggersSeconds: z.number().optional(),
    waitAfterLastChangeSeconds: z.number().optional(),
    condition: z.string().optional(),
  })
  .transform(d => ({
    table_names: d.tableNames,
    min_time_between_triggers_seconds: d.minTimeBetweenTriggersSeconds,
    wait_after_last_change_seconds: d.waitAfterLastChangeSeconds,
    condition: d.condition,
  }));

export const marshalCreateTaskDependencySchema: z.ZodType = z
  .object({
    taskKey: z.string(),
    outcome: z.string().optional(),
  })
  .transform(d => ({
    task_key: d.taskKey,
    outcome: d.outcome,
  }));

export const marshalCreateTaskSettingsSchema: z.ZodType = z
  .object({
    taskKey: z.string(),
    dependsOn: z
      .array(z.lazy(() => marshalCreateTaskDependencySchema))
      .optional(),
    runIf: z.string().optional(),
    timeoutSeconds: z.number().optional(),
    health: z.lazy(() => marshalCreateJobsHealthRulesSchema).optional(),
    emailNotifications: z
      .lazy(() => marshalCreateJobEmailNotificationsSchema)
      .optional(),
    notificationSettings: z
      .lazy(() => marshalCreateNotificationSettingsSchema)
      .optional(),
    webhookNotifications: z
      .lazy(() => marshalCreateWebhookNotificationsSchema)
      .optional(),
    description: z.string().optional(),
    environmentRef: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('environmentKey'),
          environmentKey: z.string(),
        }),
      ])
      .optional(),
    disabled: z.boolean().optional(),
    compute: z.lazy(() => marshalCreateComputeSchema).optional(),
    task: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('notebookTask'),
          notebookTask: z.lazy(() => marshalCreateNotebookTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkJarTask'),
          sparkJarTask: z.lazy(() => marshalCreateSparkJarTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkPythonTask'),
          sparkPythonTask: z.lazy(() => marshalCreateSparkPythonTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkSubmitTask'),
          sparkSubmitTask: z.lazy(() => marshalCreateSparkSubmitTaskSchema),
        }),
        z.object({
          $case: z.literal('pipelineTask'),
          pipelineTask: z.lazy(() => marshalCreatePipelineTaskSchema),
        }),
        z.object({
          $case: z.literal('pythonWheelTask'),
          pythonWheelTask: z.lazy(() => marshalCreatePythonWheelTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtTask'),
          dbtTask: z.lazy(() => marshalCreateDbtTaskSchema),
        }),
        z.object({
          $case: z.literal('sqlTask'),
          sqlTask: z.lazy(() => marshalCreateSqlTaskSchema),
        }),
        z.object({
          $case: z.literal('runJobTask'),
          runJobTask: z.lazy(() => marshalCreateRunJobTaskSchema),
        }),
        z.object({
          $case: z.literal('conditionTask'),
          conditionTask: z.lazy(() => marshalCreateConditionTaskSchema),
        }),
        z.object({
          $case: z.literal('forEachTask'),
          forEachTask: z.lazy(() => marshalCreateForEachTaskSchema),
        }),
        z.object({
          $case: z.literal('cleanRoomsNotebookTask'),
          cleanRoomsNotebookTask: z.lazy(
            () => marshalCreateCleanRoomsNotebookTaskSchema
          ),
        }),
        z.object({
          $case: z.literal('genAiComputeTask'),
          genAiComputeTask: z.lazy(() => marshalCreateGenAiComputeTaskSchema),
        }),
        z.object({
          $case: z.literal('alertTask'),
          alertTask: z.lazy(() => marshalCreateAlertTaskSchema),
        }),
        z.object({
          $case: z.literal('powerBiTask'),
          powerBiTask: z.lazy(() => marshalCreatePowerBiTaskSchema),
        }),
        z.object({
          $case: z.literal('dashboardTask'),
          dashboardTask: z.lazy(() => marshalCreateDashboardTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtCloudTask'),
          dbtCloudTask: z.lazy(() => marshalCreateDbtCloudTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtPlatformTask'),
          dbtPlatformTask: z.lazy(() => marshalCreateDbtPlatformTaskSchema),
        }),
        z.object({
          $case: z.literal('pythonOperatorTask'),
          pythonOperatorTask: z.lazy(
            () => marshalCreatePythonOperatorTaskSchema
          ),
        }),
        z.object({
          $case: z.literal('aiRuntimeTask'),
          aiRuntimeTask: z.lazy(() => marshalCreateAiRuntimeTaskSchema),
        }),
      ])
      .optional(),
    spec: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('existingClusterId'),
          existingClusterId: z.string(),
        }),
        z.object({
          $case: z.literal('newCluster'),
          newCluster: z.lazy(() => marshalClusterSpec_CreateNewClusterSchema),
        }),
        z.object({
          $case: z.literal('jobClusterKey'),
          jobClusterKey: z.string(),
        }),
      ])
      .optional(),
    libraries: z.array(z.lazy(() => marshalCreateLibrarySchema)).optional(),
    maxRetries: z.number().optional(),
    minRetryIntervalMillis: z.number().optional(),
    retryOnTimeout: z.boolean().optional(),
    disableAutoOptimization: z.boolean().optional(),
  })
  .transform(d => ({
    task_key: d.taskKey,
    depends_on: d.dependsOn,
    run_if: d.runIf,
    timeout_seconds: d.timeoutSeconds,
    health: d.health,
    email_notifications: d.emailNotifications,
    notification_settings: d.notificationSettings,
    webhook_notifications: d.webhookNotifications,
    description: d.description,
    ...(d.environmentRef?.$case === 'environmentKey' && {
      environment_key: d.environmentRef.environmentKey,
    }),
    disabled: d.disabled,
    compute: d.compute,
    ...(d.task?.$case === 'notebookTask' && {
      notebook_task: d.task.notebookTask,
    }),
    ...(d.task?.$case === 'sparkJarTask' && {
      spark_jar_task: d.task.sparkJarTask,
    }),
    ...(d.task?.$case === 'sparkPythonTask' && {
      spark_python_task: d.task.sparkPythonTask,
    }),
    ...(d.task?.$case === 'sparkSubmitTask' && {
      spark_submit_task: d.task.sparkSubmitTask,
    }),
    ...(d.task?.$case === 'pipelineTask' && {
      pipeline_task: d.task.pipelineTask,
    }),
    ...(d.task?.$case === 'pythonWheelTask' && {
      python_wheel_task: d.task.pythonWheelTask,
    }),
    ...(d.task?.$case === 'dbtTask' && {dbt_task: d.task.dbtTask}),
    ...(d.task?.$case === 'sqlTask' && {sql_task: d.task.sqlTask}),
    ...(d.task?.$case === 'runJobTask' && {run_job_task: d.task.runJobTask}),
    ...(d.task?.$case === 'conditionTask' && {
      condition_task: d.task.conditionTask,
    }),
    ...(d.task?.$case === 'forEachTask' && {for_each_task: d.task.forEachTask}),
    ...(d.task?.$case === 'cleanRoomsNotebookTask' && {
      clean_rooms_notebook_task: d.task.cleanRoomsNotebookTask,
    }),
    ...(d.task?.$case === 'genAiComputeTask' && {
      gen_ai_compute_task: d.task.genAiComputeTask,
    }),
    ...(d.task?.$case === 'alertTask' && {alert_task: d.task.alertTask}),
    ...(d.task?.$case === 'powerBiTask' && {power_bi_task: d.task.powerBiTask}),
    ...(d.task?.$case === 'dashboardTask' && {
      dashboard_task: d.task.dashboardTask,
    }),
    ...(d.task?.$case === 'dbtCloudTask' && {
      dbt_cloud_task: d.task.dbtCloudTask,
    }),
    ...(d.task?.$case === 'dbtPlatformTask' && {
      dbt_platform_task: d.task.dbtPlatformTask,
    }),
    ...(d.task?.$case === 'pythonOperatorTask' && {
      python_operator_task: d.task.pythonOperatorTask,
    }),
    ...(d.task?.$case === 'aiRuntimeTask' && {
      ai_runtime_task: d.task.aiRuntimeTask,
    }),
    ...(d.spec?.$case === 'existingClusterId' && {
      existing_cluster_id: d.spec.existingClusterId,
    }),
    ...(d.spec?.$case === 'newCluster' && {new_cluster: d.spec.newCluster}),
    ...(d.spec?.$case === 'jobClusterKey' && {
      job_cluster_key: d.spec.jobClusterKey,
    }),
    libraries: d.libraries,
    max_retries: d.maxRetries,
    min_retry_interval_millis: d.minRetryIntervalMillis,
    retry_on_timeout: d.retryOnTimeout,
    disable_auto_optimization: d.disableAutoOptimization,
  }));

export const marshalCreateTriggerSettingsSchema: z.ZodType = z
  .object({
    pauseStatus: z.string().optional(),
    configuration: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('fileArrival'),
          fileArrival: z.lazy(
            () => marshalCreateFileArrivalTriggerConfigurationSchema
          ),
        }),
        z.object({
          $case: z.literal('periodic'),
          periodic: z.lazy(
            () => marshalCreatePeriodicTriggerConfigurationSchema
          ),
        }),
        z.object({
          $case: z.literal('tableUpdate'),
          tableUpdate: z.lazy(
            () => marshalCreateTableTriggerConfigurationSchema
          ),
        }),
        z.object({
          $case: z.literal('model'),
          model: z.lazy(() => marshalCreateModelTriggerConfigurationSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    pause_status: d.pauseStatus,
    ...(d.configuration?.$case === 'fileArrival' && {
      file_arrival: d.configuration.fileArrival,
    }),
    ...(d.configuration?.$case === 'periodic' && {
      periodic: d.configuration.periodic,
    }),
    ...(d.configuration?.$case === 'tableUpdate' && {
      table_update: d.configuration.tableUpdate,
    }),
    ...(d.configuration?.$case === 'model' && {model: d.configuration.model}),
  }));

export const marshalCreateVolumesStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalCreateWebhookSchema: z.ZodType = z
  .object({
    id: z.string(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalCreateWebhookNotificationsSchema: z.ZodType = z
  .object({
    onStart: z.array(z.lazy(() => marshalCreateWebhookSchema)).optional(),
    onSuccess: z.array(z.lazy(() => marshalCreateWebhookSchema)).optional(),
    onFailure: z.array(z.lazy(() => marshalCreateWebhookSchema)).optional(),
    onDurationWarningThresholdExceeded: z
      .array(z.lazy(() => marshalCreateWebhookSchema))
      .optional(),
    onStreamingBacklogExceeded: z
      .array(z.lazy(() => marshalCreateWebhookSchema))
      .optional(),
  })
  .transform(d => ({
    on_start: d.onStart,
    on_success: d.onSuccess,
    on_failure: d.onFailure,
    on_duration_warning_threshold_exceeded:
      d.onDurationWarningThresholdExceeded,
    on_streaming_backlog_exceeded: d.onStreamingBacklogExceeded,
  }));

export const marshalCreateWorkloadTypeSchema: z.ZodType = z
  .object({
    clients: z.lazy(() => marshalWorkloadType_CreateClientsTypesSchema),
  })
  .transform(d => ({
    clients: d.clients,
  }));

export const marshalCreateWorkspaceStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalDashboardTaskSchema: z.ZodType = z
  .object({
    subscription: z.lazy(() => marshalSubscriptionSchema).optional(),
    warehouseId: z.string().optional(),
    dashboardId: z.string().optional(),
    filters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    subscription: d.subscription,
    warehouse_id: d.warehouseId,
    dashboard_id: d.dashboardId,
    filters: d.filters,
  }));

export const marshalDbfsStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalDbtCloudTaskSchema: z.ZodType = z
  .object({
    dbtCloudJobId: z.bigint().optional(),
    connectionResourceName: z.string().optional(),
  })
  .transform(d => ({
    dbt_cloud_job_id: d.dbtCloudJobId,
    connection_resource_name: d.connectionResourceName,
  }));

export const marshalDbtPlatformTaskSchema: z.ZodType = z
  .object({
    dbtPlatformJobId: z.string().optional(),
    connectionResourceName: z.string().optional(),
  })
  .transform(d => ({
    dbt_platform_job_id: d.dbtPlatformJobId,
    connection_resource_name: d.connectionResourceName,
  }));

export const marshalDbtTaskSchema: z.ZodType = z
  .object({
    projectDirectory: z.string().optional(),
    commands: z.array(z.string()).optional(),
    schema: z.string().optional(),
    warehouseId: z.string().optional(),
    profilesDirectory: z.string().optional(),
    catalog: z.string().optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    project_directory: d.projectDirectory,
    commands: d.commands,
    schema: d.schema,
    warehouse_id: d.warehouseId,
    profiles_directory: d.profilesDirectory,
    catalog: d.catalog,
    source: d.source,
  }));

export const marshalDeleteJobRequestSchema: z.ZodType = z
  .object({
    jobId: z.bigint(),
  })
  .transform(d => ({
    job_id: d.jobId,
  }));

export const marshalDeleteRunRequestSchema: z.ZodType = z
  .object({
    runId: z.bigint(),
  })
  .transform(d => ({
    run_id: d.runId,
  }));

export const marshalDeploymentSpecSchema: z.ZodType = z
  .object({
    commandPath: z.string().optional(),
    compute: z.lazy(() => marshalComputeSpecSchema).optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    command_path: d.commandPath,
    compute: d.compute,
    name: d.name,
  }));

export const marshalDockerBasicAuthSchema: z.ZodType = z
  .object({
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .transform(d => ({
    username: d.username,
    password: d.password,
  }));

export const marshalDockerImageSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    credsOneof: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('basicAuth'),
          basicAuth: z.lazy(() => marshalDockerBasicAuthSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    url: d.url,
    ...(d.credsOneof?.$case === 'basicAuth' && {
      basic_auth: d.credsOneof.basicAuth,
    }),
  }));

export const marshalEnforcePolicyComplianceForJobSchema: z.ZodType = z
  .object({
    jobId: z.bigint(),
    validateOnly: z.boolean().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    validate_only: d.validateOnly,
  }));

export const marshalForEachTaskSchema: z.ZodType = z
  .object({
    inputs: z.string().optional(),
    concurrency: z.number().optional(),
    task: z.lazy(() => marshalTaskSettingsSchema).optional(),
  })
  .transform(d => ({
    inputs: d.inputs,
    concurrency: d.concurrency,
    task: d.task,
  }));

export const marshalGcpAttributesSchema: z.ZodType = z
  .object({
    usePreemptibleExecutors: z.boolean().optional(),
    googleServiceAccount: z.string().optional(),
    bootDiskSize: z.number().optional(),
    availability: z.string().optional(),
    zoneId: z.string().optional(),
    localSsdCount: z.number().optional(),
    firstOnDemand: z.number().optional(),
    confidentialComputeType: z.string().optional(),
  })
  .transform(d => ({
    use_preemptible_executors: d.usePreemptibleExecutors,
    google_service_account: d.googleServiceAccount,
    boot_disk_size: d.bootDiskSize,
    availability: d.availability,
    zone_id: d.zoneId,
    local_ssd_count: d.localSsdCount,
    first_on_demand: d.firstOnDemand,
    confidential_compute_type: d.confidentialComputeType,
  }));

export const marshalGcsStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalGenAiComputeTaskSchema: z.ZodType = z
  .object({
    dlRuntimeImage: z.string().optional(),
    compute: z.lazy(() => marshalComputeConfigSchema).optional(),
    command: z.string().optional(),
    source: z.string().optional(),
    trainingScriptPath: z.string().optional(),
    yamlParametersFilePath: z.string().optional(),
    yamlParameters: z.string().optional(),
    mlflowExperimentName: z.string().optional(),
  })
  .transform(d => ({
    dl_runtime_image: d.dlRuntimeImage,
    compute: d.compute,
    command: d.command,
    source: d.source,
    training_script_path: d.trainingScriptPath,
    yaml_parameters_file_path: d.yamlParametersFilePath,
    yaml_parameters: d.yamlParameters,
    mlflow_experiment_name: d.mlflowExperimentName,
  }));

export const marshalInitScriptInfoSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalDbfsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('s3'),
          s3: z.lazy(() => marshalS3StorageInfoSchema),
        }),
        z.object({
          $case: z.literal('file'),
          file: z.lazy(() => marshalLocalFileInfoSchema),
        }),
        z.object({
          $case: z.literal('gcs'),
          gcs: z.lazy(() => marshalGcsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('abfss'),
          abfss: z.lazy(() => marshalAdlsgen2InfoSchema),
        }),
        z.object({
          $case: z.literal('workspace'),
          workspace: z.lazy(() => marshalWorkspaceStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('volumes'),
          volumes: z.lazy(() => marshalVolumesStorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
    ...(d.storageInfo?.$case === 's3' && {s3: d.storageInfo.s3}),
    ...(d.storageInfo?.$case === 'file' && {file: d.storageInfo.file}),
    ...(d.storageInfo?.$case === 'gcs' && {gcs: d.storageInfo.gcs}),
    ...(d.storageInfo?.$case === 'abfss' && {abfss: d.storageInfo.abfss}),
    ...(d.storageInfo?.$case === 'workspace' && {
      workspace: d.storageInfo.workspace,
    }),
    ...(d.storageInfo?.$case === 'volumes' && {volumes: d.storageInfo.volumes}),
  }));

export const marshalJobEmailNotificationsSchema: z.ZodType = z
  .object({
    onStart: z.array(z.string()).optional(),
    onSuccess: z.array(z.string()).optional(),
    onFailure: z.array(z.string()).optional(),
    onDurationWarningThresholdExceeded: z.array(z.string()).optional(),
    onStreamingBacklogExceeded: z.array(z.string()).optional(),
    noAlertForSkippedRuns: z.boolean().optional(),
  })
  .transform(d => ({
    on_start: d.onStart,
    on_success: d.onSuccess,
    on_failure: d.onFailure,
    on_duration_warning_threshold_exceeded:
      d.onDurationWarningThresholdExceeded,
    on_streaming_backlog_exceeded: d.onStreamingBacklogExceeded,
    no_alert_for_skipped_runs: d.noAlertForSkippedRuns,
  }));

export const marshalJobsHealthRuleSchema: z.ZodType = z
  .object({
    metric: z.string().optional(),
    op: z.string().optional(),
    value: z.bigint().optional(),
  })
  .transform(d => ({
    metric: d.metric,
    op: d.op,
    value: d.value,
  }));

export const marshalJobsHealthRulesSchema: z.ZodType = z
  .object({
    rules: z.array(z.lazy(() => marshalJobsHealthRuleSchema)).optional(),
  })
  .transform(d => ({
    rules: d.rules,
  }));

export const marshalLibrarySchema: z.ZodType = z
  .object({
    lib: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('jar'), jar: z.string()}),
        z.object({$case: z.literal('egg'), egg: z.string()}),
        z.object({
          $case: z.literal('pypi'),
          pypi: z.lazy(() => marshalPythonPyPiLibrarySchema),
        }),
        z.object({
          $case: z.literal('maven'),
          maven: z.lazy(() => marshalMavenLibrarySchema),
        }),
        z.object({
          $case: z.literal('cran'),
          cran: z.lazy(() => marshalRCranLibrarySchema),
        }),
        z.object({$case: z.literal('whl'), whl: z.string()}),
        z.object({$case: z.literal('requirements'), requirements: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.lib?.$case === 'jar' && {jar: d.lib.jar}),
    ...(d.lib?.$case === 'egg' && {egg: d.lib.egg}),
    ...(d.lib?.$case === 'pypi' && {pypi: d.lib.pypi}),
    ...(d.lib?.$case === 'maven' && {maven: d.lib.maven}),
    ...(d.lib?.$case === 'cran' && {cran: d.lib.cran}),
    ...(d.lib?.$case === 'whl' && {whl: d.lib.whl}),
    ...(d.lib?.$case === 'requirements' && {requirements: d.lib.requirements}),
  }));

export const marshalLocalFileInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalLogAnalyticsInfoSchema: z.ZodType = z
  .object({
    logAnalyticsWorkspaceId: z.string().optional(),
    logAnalyticsPrimaryKey: z.string().optional(),
  })
  .transform(d => ({
    log_analytics_workspace_id: d.logAnalyticsWorkspaceId,
    log_analytics_primary_key: d.logAnalyticsPrimaryKey,
  }));

export const marshalMavenLibrarySchema: z.ZodType = z
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

export const marshalNodeTypeFlexibilitySchema: z.ZodType = z
  .object({
    alternateNodeTypeIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    alternate_node_type_ids: d.alternateNodeTypeIds,
  }));

export const marshalNotebookTaskSchema: z.ZodType = z
  .object({
    notebookPath: z.string().optional(),
    baseParameters: z.record(z.string(), z.string()).optional(),
    source: z.string().optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    notebook_path: d.notebookPath,
    base_parameters: d.baseParameters,
    source: d.source,
    warehouse_id: d.warehouseId,
  }));

export const marshalNotificationSettingsSchema: z.ZodType = z
  .object({
    noAlertForSkippedRuns: z.boolean().optional(),
    noAlertForCanceledRuns: z.boolean().optional(),
    alertOnLastAttempt: z.boolean().optional(),
  })
  .transform(d => ({
    no_alert_for_skipped_runs: d.noAlertForSkippedRuns,
    no_alert_for_canceled_runs: d.noAlertForCanceledRuns,
    alert_on_last_attempt: d.alertOnLastAttempt,
  }));

export const marshalPipelineParametersSchema: z.ZodType = z
  .object({
    fullRefresh: z.boolean().optional(),
    refreshSelection: z.array(z.string()).optional(),
    fullRefreshSelection: z.array(z.string()).optional(),
    resetCheckpointSelection: z.array(z.string()).optional(),
    refreshFlowSelection: z.array(z.string()).optional(),
  })
  .transform(d => ({
    full_refresh: d.fullRefresh,
    refresh_selection: d.refreshSelection,
    full_refresh_selection: d.fullRefreshSelection,
    reset_checkpoint_selection: d.resetCheckpointSelection,
    refresh_flow_selection: d.refreshFlowSelection,
  }));

export const marshalPipelineTaskSchema: z.ZodType = z
  .object({
    pipelineId: z.string().optional(),
    pipelineTaskParameters: z.record(z.string(), z.string()).optional(),
    fullRefresh: z.boolean().optional(),
    refreshSelection: z.array(z.string()).optional(),
    fullRefreshSelection: z.array(z.string()).optional(),
    resetCheckpointSelection: z.array(z.string()).optional(),
    refreshFlowSelection: z.array(z.string()).optional(),
  })
  .transform(d => ({
    pipeline_id: d.pipelineId,
    parameters: d.pipelineTaskParameters,
    full_refresh: d.fullRefresh,
    refresh_selection: d.refreshSelection,
    full_refresh_selection: d.fullRefreshSelection,
    reset_checkpoint_selection: d.resetCheckpointSelection,
    refresh_flow_selection: d.refreshFlowSelection,
  }));

export const marshalPowerBiModelSchema: z.ZodType = z
  .object({
    workspaceName: z.string().optional(),
    modelName: z.string().optional(),
    storageMode: z.string().optional(),
    authenticationMethod: z.string().optional(),
    overwriteExisting: z.boolean().optional(),
  })
  .transform(d => ({
    workspace_name: d.workspaceName,
    model_name: d.modelName,
    storage_mode: d.storageMode,
    authentication_method: d.authenticationMethod,
    overwrite_existing: d.overwriteExisting,
  }));

export const marshalPowerBiTableSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
    storageMode: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog: d.catalog,
    schema: d.schema,
    storage_mode: d.storageMode,
  }));

export const marshalPowerBiTaskSchema: z.ZodType = z
  .object({
    tables: z.array(z.lazy(() => marshalPowerBiTableSchema)).optional(),
    warehouseId: z.string().optional(),
    powerBiModel: z.lazy(() => marshalPowerBiModelSchema).optional(),
    connectionResourceName: z.string().optional(),
    refreshAfterUpdate: z.boolean().optional(),
  })
  .transform(d => ({
    tables: d.tables,
    warehouse_id: d.warehouseId,
    power_bi_model: d.powerBiModel,
    connection_resource_name: d.connectionResourceName,
    refresh_after_update: d.refreshAfterUpdate,
  }));

export const marshalPythonOperatorTaskSchema: z.ZodType = z
  .object({
    parameters: z
      .array(z.lazy(() => marshalPythonOperatorTask_ParameterSchema))
      .optional(),
    main: z.string().optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
    main: d.main,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPythonOperatorTask_CreateParameterSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPythonOperatorTask_ParameterSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPythonOperatorTask_UpdateParameterSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    value: d.value,
  }));

export const marshalPythonPyPiLibrarySchema: z.ZodType = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const marshalPythonWheelTaskSchema: z.ZodType = z
  .object({
    packageName: z.string().optional(),
    entryPoint: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    namedParameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    package_name: d.packageName,
    entry_point: d.entryPoint,
    parameters: d.parameters,
    named_parameters: d.namedParameters,
  }));

export const marshalRCranLibrarySchema: z.ZodType = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const marshalRepairRunRequestSchema: z.ZodType = z
  .object({
    runId: z.bigint().optional(),
    latestRepairId: z.bigint().optional(),
    rerunTasks: z.array(z.string()).optional(),
    jobParameters: z.record(z.string(), z.string()).optional(),
    rerunAllFailedTasks: z.boolean().optional(),
    rerunDependentTasks: z.boolean().optional(),
    performanceTarget: z.string().optional(),
    pipelineParams: z
      .lazy(() => marshalCreatePipelineParametersSchema)
      .optional(),
    jarParams: z.array(z.string()).optional(),
    notebookParams: z.record(z.string(), z.string()).optional(),
    pythonParams: z.array(z.string()).optional(),
    sparkSubmitParams: z.array(z.string()).optional(),
    pythonNamedParams: z.record(z.string(), z.string()).optional(),
    sqlParams: z.record(z.string(), z.string()).optional(),
    dbtCommands: z.array(z.string()).optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    latest_repair_id: d.latestRepairId,
    rerun_tasks: d.rerunTasks,
    job_parameters: d.jobParameters,
    rerun_all_failed_tasks: d.rerunAllFailedTasks,
    rerun_dependent_tasks: d.rerunDependentTasks,
    performance_target: d.performanceTarget,
    pipeline_params: d.pipelineParams,
    jar_params: d.jarParams,
    notebook_params: d.notebookParams,
    python_params: d.pythonParams,
    spark_submit_params: d.sparkSubmitParams,
    python_named_params: d.pythonNamedParams,
    sql_params: d.sqlParams,
    dbt_commands: d.dbtCommands,
  }));

export const marshalResetJobRequestSchema: z.ZodType = z
  .object({
    jobId: z.bigint(),
    newSettings: z.lazy(() => marshalCreateJobSettingsSchema),
  })
  .transform(d => ({
    job_id: d.jobId,
    new_settings: d.newSettings,
  }));

export const marshalRunJobTaskSchema: z.ZodType = z
  .object({
    jobId: z.bigint().optional(),
    jobParameters: z.record(z.string(), z.string()).optional(),
    pipelineParams: z.lazy(() => marshalPipelineParametersSchema).optional(),
    jarParams: z.array(z.string()).optional(),
    notebookParams: z.record(z.string(), z.string()).optional(),
    pythonParams: z.array(z.string()).optional(),
    sparkSubmitParams: z.array(z.string()).optional(),
    pythonNamedParams: z.record(z.string(), z.string()).optional(),
    sqlParams: z.record(z.string(), z.string()).optional(),
    dbtCommands: z.array(z.string()).optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    job_parameters: d.jobParameters,
    pipeline_params: d.pipelineParams,
    jar_params: d.jarParams,
    notebook_params: d.notebookParams,
    python_params: d.pythonParams,
    spark_submit_params: d.sparkSubmitParams,
    python_named_params: d.pythonNamedParams,
    sql_params: d.sqlParams,
    dbt_commands: d.dbtCommands,
  }));

export const marshalRunNowRequestSchema: z.ZodType = z
  .object({
    jobId: z.bigint(),
    jobParameters: z.record(z.string(), z.string()).optional(),
    idempotencyToken: z.string().optional(),
    queue: z.lazy(() => marshalCreateQueueSettingsSchema).optional(),
    only: z.array(z.string()).optional(),
    performanceTarget: z.string().optional(),
    pipelineParams: z
      .lazy(() => marshalCreatePipelineParametersSchema)
      .optional(),
    jarParams: z.array(z.string()).optional(),
    notebookParams: z.record(z.string(), z.string()).optional(),
    pythonParams: z.array(z.string()).optional(),
    sparkSubmitParams: z.array(z.string()).optional(),
    pythonNamedParams: z.record(z.string(), z.string()).optional(),
    sqlParams: z.record(z.string(), z.string()).optional(),
    dbtCommands: z.array(z.string()).optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    job_parameters: d.jobParameters,
    idempotency_token: d.idempotencyToken,
    queue: d.queue,
    only: d.only,
    performance_target: d.performanceTarget,
    pipeline_params: d.pipelineParams,
    jar_params: d.jarParams,
    notebook_params: d.notebookParams,
    python_params: d.pythonParams,
    spark_submit_params: d.sparkSubmitParams,
    python_named_params: d.pythonNamedParams,
    sql_params: d.sqlParams,
    dbt_commands: d.dbtCommands,
  }));

export const marshalRunTaskSettingsSchema: z.ZodType = z
  .object({
    taskKey: z.string().optional(),
    description: z.string().optional(),
    dependsOn: z.array(z.lazy(() => marshalTaskDependencySchema)).optional(),
    runIf: z.string().optional(),
    timeoutSeconds: z.number().optional(),
    emailNotifications: z
      .lazy(() => marshalJobEmailNotificationsSchema)
      .optional(),
    health: z.lazy(() => marshalJobsHealthRulesSchema).optional(),
    notificationSettings: z
      .lazy(() => marshalNotificationSettingsSchema)
      .optional(),
    webhookNotifications: z
      .lazy(() => marshalWebhookNotificationsSchema)
      .optional(),
    environmentRef: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('environmentKey'),
          environmentKey: z.string(),
        }),
      ])
      .optional(),
    disabled: z.boolean().optional(),
    compute: z.lazy(() => marshalComputeSchema).optional(),
    task: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('notebookTask'),
          notebookTask: z.lazy(() => marshalNotebookTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkJarTask'),
          sparkJarTask: z.lazy(() => marshalSparkJarTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkPythonTask'),
          sparkPythonTask: z.lazy(() => marshalSparkPythonTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkSubmitTask'),
          sparkSubmitTask: z.lazy(() => marshalSparkSubmitTaskSchema),
        }),
        z.object({
          $case: z.literal('pipelineTask'),
          pipelineTask: z.lazy(() => marshalPipelineTaskSchema),
        }),
        z.object({
          $case: z.literal('pythonWheelTask'),
          pythonWheelTask: z.lazy(() => marshalPythonWheelTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtTask'),
          dbtTask: z.lazy(() => marshalDbtTaskSchema),
        }),
        z.object({
          $case: z.literal('sqlTask'),
          sqlTask: z.lazy(() => marshalSqlTaskSchema),
        }),
        z.object({
          $case: z.literal('runJobTask'),
          runJobTask: z.lazy(() => marshalRunJobTaskSchema),
        }),
        z.object({
          $case: z.literal('conditionTask'),
          conditionTask: z.lazy(() => marshalConditionTaskSchema),
        }),
        z.object({
          $case: z.literal('forEachTask'),
          forEachTask: z.lazy(() => marshalForEachTaskSchema),
        }),
        z.object({
          $case: z.literal('cleanRoomsNotebookTask'),
          cleanRoomsNotebookTask: z.lazy(
            () => marshalCleanRoomsNotebookTaskSchema
          ),
        }),
        z.object({
          $case: z.literal('genAiComputeTask'),
          genAiComputeTask: z.lazy(() => marshalGenAiComputeTaskSchema),
        }),
        z.object({
          $case: z.literal('alertTask'),
          alertTask: z.lazy(() => marshalAlertTaskSchema),
        }),
        z.object({
          $case: z.literal('powerBiTask'),
          powerBiTask: z.lazy(() => marshalPowerBiTaskSchema),
        }),
        z.object({
          $case: z.literal('dashboardTask'),
          dashboardTask: z.lazy(() => marshalDashboardTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtCloudTask'),
          dbtCloudTask: z.lazy(() => marshalDbtCloudTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtPlatformTask'),
          dbtPlatformTask: z.lazy(() => marshalDbtPlatformTaskSchema),
        }),
        z.object({
          $case: z.literal('pythonOperatorTask'),
          pythonOperatorTask: z.lazy(() => marshalPythonOperatorTaskSchema),
        }),
        z.object({
          $case: z.literal('aiRuntimeTask'),
          aiRuntimeTask: z.lazy(() => marshalAiRuntimeTaskSchema),
        }),
      ])
      .optional(),
    spec: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('existingClusterId'),
          existingClusterId: z.string(),
        }),
        z.object({
          $case: z.literal('newCluster'),
          newCluster: z.lazy(() => marshalClusterSpec_NewClusterSchema),
        }),
        z.object({
          $case: z.literal('jobClusterKey'),
          jobClusterKey: z.string(),
        }),
      ])
      .optional(),
    libraries: z.array(z.lazy(() => marshalLibrarySchema)).optional(),
    maxRetries: z.number().optional(),
    minRetryIntervalMillis: z.number().optional(),
    retryOnTimeout: z.boolean().optional(),
    disableAutoOptimization: z.boolean().optional(),
  })
  .transform(d => ({
    task_key: d.taskKey,
    description: d.description,
    depends_on: d.dependsOn,
    run_if: d.runIf,
    timeout_seconds: d.timeoutSeconds,
    email_notifications: d.emailNotifications,
    health: d.health,
    notification_settings: d.notificationSettings,
    webhook_notifications: d.webhookNotifications,
    ...(d.environmentRef?.$case === 'environmentKey' && {
      environment_key: d.environmentRef.environmentKey,
    }),
    disabled: d.disabled,
    compute: d.compute,
    ...(d.task?.$case === 'notebookTask' && {
      notebook_task: d.task.notebookTask,
    }),
    ...(d.task?.$case === 'sparkJarTask' && {
      spark_jar_task: d.task.sparkJarTask,
    }),
    ...(d.task?.$case === 'sparkPythonTask' && {
      spark_python_task: d.task.sparkPythonTask,
    }),
    ...(d.task?.$case === 'sparkSubmitTask' && {
      spark_submit_task: d.task.sparkSubmitTask,
    }),
    ...(d.task?.$case === 'pipelineTask' && {
      pipeline_task: d.task.pipelineTask,
    }),
    ...(d.task?.$case === 'pythonWheelTask' && {
      python_wheel_task: d.task.pythonWheelTask,
    }),
    ...(d.task?.$case === 'dbtTask' && {dbt_task: d.task.dbtTask}),
    ...(d.task?.$case === 'sqlTask' && {sql_task: d.task.sqlTask}),
    ...(d.task?.$case === 'runJobTask' && {run_job_task: d.task.runJobTask}),
    ...(d.task?.$case === 'conditionTask' && {
      condition_task: d.task.conditionTask,
    }),
    ...(d.task?.$case === 'forEachTask' && {for_each_task: d.task.forEachTask}),
    ...(d.task?.$case === 'cleanRoomsNotebookTask' && {
      clean_rooms_notebook_task: d.task.cleanRoomsNotebookTask,
    }),
    ...(d.task?.$case === 'genAiComputeTask' && {
      gen_ai_compute_task: d.task.genAiComputeTask,
    }),
    ...(d.task?.$case === 'alertTask' && {alert_task: d.task.alertTask}),
    ...(d.task?.$case === 'powerBiTask' && {power_bi_task: d.task.powerBiTask}),
    ...(d.task?.$case === 'dashboardTask' && {
      dashboard_task: d.task.dashboardTask,
    }),
    ...(d.task?.$case === 'dbtCloudTask' && {
      dbt_cloud_task: d.task.dbtCloudTask,
    }),
    ...(d.task?.$case === 'dbtPlatformTask' && {
      dbt_platform_task: d.task.dbtPlatformTask,
    }),
    ...(d.task?.$case === 'pythonOperatorTask' && {
      python_operator_task: d.task.pythonOperatorTask,
    }),
    ...(d.task?.$case === 'aiRuntimeTask' && {
      ai_runtime_task: d.task.aiRuntimeTask,
    }),
    ...(d.spec?.$case === 'existingClusterId' && {
      existing_cluster_id: d.spec.existingClusterId,
    }),
    ...(d.spec?.$case === 'newCluster' && {new_cluster: d.spec.newCluster}),
    ...(d.spec?.$case === 'jobClusterKey' && {
      job_cluster_key: d.spec.jobClusterKey,
    }),
    libraries: d.libraries,
    max_retries: d.maxRetries,
    min_retry_interval_millis: d.minRetryIntervalMillis,
    retry_on_timeout: d.retryOnTimeout,
    disable_auto_optimization: d.disableAutoOptimization,
  }));

export const marshalS3StorageInfoSchema: z.ZodType = z
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

export const marshalSparkJarTaskSchema: z.ZodType = z
  .object({
    jarUri: z.string().optional(),
    mainClassName: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    runAsRepl: z.boolean().optional(),
  })
  .transform(d => ({
    jar_uri: d.jarUri,
    main_class_name: d.mainClassName,
    parameters: d.parameters,
    run_as_repl: d.runAsRepl,
  }));

export const marshalSparkPythonTaskSchema: z.ZodType = z
  .object({
    pythonFile: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    python_file: d.pythonFile,
    parameters: d.parameters,
    source: d.source,
  }));

export const marshalSparkSubmitTaskSchema: z.ZodType = z
  .object({
    parameters: z.array(z.string()).optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
  }));

export const marshalSqlTaskSchema: z.ZodType = z
  .object({
    parameters: z.record(z.string(), z.string()).optional(),
    sqlTaskType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('query'),
          query: z.lazy(() => marshalSqlTaskQuerySchema),
        }),
        z.object({
          $case: z.literal('dashboard'),
          dashboard: z.lazy(() => marshalSqlTaskDashboardSchema),
        }),
        z.object({
          $case: z.literal('alert'),
          alert: z.lazy(() => marshalSqlTaskAlertSchema),
        }),
        z.object({
          $case: z.literal('file'),
          file: z.lazy(() => marshalSqlTaskFileSchema),
        }),
      ])
      .optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
    ...(d.sqlTaskType?.$case === 'query' && {query: d.sqlTaskType.query}),
    ...(d.sqlTaskType?.$case === 'dashboard' && {
      dashboard: d.sqlTaskType.dashboard,
    }),
    ...(d.sqlTaskType?.$case === 'alert' && {alert: d.sqlTaskType.alert}),
    ...(d.sqlTaskType?.$case === 'file' && {file: d.sqlTaskType.file}),
    warehouse_id: d.warehouseId,
  }));

export const marshalSqlTaskAlertSchema: z.ZodType = z
  .object({
    alertId: z.string().optional(),
    subscriptions: z
      .array(z.lazy(() => marshalSqlTaskSubscriptionSchema))
      .optional(),
    pauseSubscriptions: z.boolean().optional(),
  })
  .transform(d => ({
    alert_id: d.alertId,
    subscriptions: d.subscriptions,
    pause_subscriptions: d.pauseSubscriptions,
  }));

export const marshalSqlTaskDashboardSchema: z.ZodType = z
  .object({
    dashboardId: z.string().optional(),
    subscriptions: z
      .array(z.lazy(() => marshalSqlTaskSubscriptionSchema))
      .optional(),
    customSubject: z.string().optional(),
    pauseSubscriptions: z.boolean().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
    subscriptions: d.subscriptions,
    custom_subject: d.customSubject,
    pause_subscriptions: d.pauseSubscriptions,
  }));

export const marshalSqlTaskFileSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
    source: d.source,
  }));

export const marshalSqlTaskQuerySchema: z.ZodType = z
  .object({
    queryType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('queryId'), queryId: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.queryType?.$case === 'queryId' && {query_id: d.queryType.queryId}),
  }));

export const marshalSqlTaskSubscriptionSchema: z.ZodType = z
  .object({
    subscriptionType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriptionType?.$case === 'userName' && {
      user_name: d.subscriptionType.userName,
    }),
    ...(d.subscriptionType?.$case === 'destinationId' && {
      destination_id: d.subscriptionType.destinationId,
    }),
  }));

export const marshalSubmitRunRequestSchema: z.ZodType = z
  .object({
    accessControlList: z
      .array(z.lazy(() => marshalAccessControlRequestSchema))
      .optional(),
    queue: z.lazy(() => marshalCreateQueueSettingsSchema).optional(),
    runAs: z.lazy(() => marshalCreateJobRunAsSchema).optional(),
    runName: z.string().optional(),
    timeoutSeconds: z.number().optional(),
    health: z.lazy(() => marshalCreateJobsHealthRulesSchema).optional(),
    idempotencyToken: z.string().optional(),
    tasks: z.array(z.lazy(() => marshalRunTaskSettingsSchema)).optional(),
    gitSource: z.lazy(() => marshalCreateGitSourceSchema).optional(),
    webhookNotifications: z
      .lazy(() => marshalCreateWebhookNotificationsSchema)
      .optional(),
    emailNotifications: z
      .lazy(() => marshalCreateJobEmailNotificationsSchema)
      .optional(),
    notificationSettings: z
      .lazy(() => marshalCreateNotificationSettingsSchema)
      .optional(),
    environments: z
      .array(z.lazy(() => marshalCreateJobEnvironmentSchema))
      .optional(),
    budgetPolicyId: z.string().optional(),
    usagePolicyId: z.string().optional(),
  })
  .transform(d => ({
    access_control_list: d.accessControlList,
    queue: d.queue,
    run_as: d.runAs,
    run_name: d.runName,
    timeout_seconds: d.timeoutSeconds,
    health: d.health,
    idempotency_token: d.idempotencyToken,
    tasks: d.tasks,
    git_source: d.gitSource,
    webhook_notifications: d.webhookNotifications,
    email_notifications: d.emailNotifications,
    notification_settings: d.notificationSettings,
    environments: d.environments,
    budget_policy_id: d.budgetPolicyId,
    usage_policy_id: d.usagePolicyId,
  }));

export const marshalSubscriptionSchema: z.ZodType = z
  .object({
    subscribers: z
      .array(z.lazy(() => marshalSubscription_SubscriberSchema))
      .optional(),
    paused: z.boolean().optional(),
    customSubject: z.string().optional(),
  })
  .transform(d => ({
    subscribers: d.subscribers,
    paused: d.paused,
    custom_subject: d.customSubject,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSubscription_CreateSubscriberSchema: z.ZodType = z
  .object({
    subscriptionType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriptionType?.$case === 'userName' && {
      user_name: d.subscriptionType.userName,
    }),
    ...(d.subscriptionType?.$case === 'destinationId' && {
      destination_id: d.subscriptionType.destinationId,
    }),
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSubscription_SubscriberSchema: z.ZodType = z
  .object({
    subscriptionType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriptionType?.$case === 'userName' && {
      user_name: d.subscriptionType.userName,
    }),
    ...(d.subscriptionType?.$case === 'destinationId' && {
      destination_id: d.subscriptionType.destinationId,
    }),
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSubscription_UpdateSubscriberSchema: z.ZodType = z
  .object({
    subscriptionType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriptionType?.$case === 'userName' && {
      user_name: d.subscriptionType.userName,
    }),
    ...(d.subscriptionType?.$case === 'destinationId' && {
      destination_id: d.subscriptionType.destinationId,
    }),
  }));

export const marshalTaskDependencySchema: z.ZodType = z
  .object({
    taskKey: z.string().optional(),
    outcome: z.string().optional(),
  })
  .transform(d => ({
    task_key: d.taskKey,
    outcome: d.outcome,
  }));

export const marshalTaskSettingsSchema: z.ZodType = z
  .object({
    taskKey: z.string().optional(),
    dependsOn: z.array(z.lazy(() => marshalTaskDependencySchema)).optional(),
    runIf: z.string().optional(),
    timeoutSeconds: z.number().optional(),
    health: z.lazy(() => marshalJobsHealthRulesSchema).optional(),
    emailNotifications: z
      .lazy(() => marshalJobEmailNotificationsSchema)
      .optional(),
    notificationSettings: z
      .lazy(() => marshalNotificationSettingsSchema)
      .optional(),
    webhookNotifications: z
      .lazy(() => marshalWebhookNotificationsSchema)
      .optional(),
    description: z.string().optional(),
    environmentRef: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('environmentKey'),
          environmentKey: z.string(),
        }),
      ])
      .optional(),
    disabled: z.boolean().optional(),
    compute: z.lazy(() => marshalComputeSchema).optional(),
    task: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('notebookTask'),
          notebookTask: z.lazy(() => marshalNotebookTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkJarTask'),
          sparkJarTask: z.lazy(() => marshalSparkJarTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkPythonTask'),
          sparkPythonTask: z.lazy(() => marshalSparkPythonTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkSubmitTask'),
          sparkSubmitTask: z.lazy(() => marshalSparkSubmitTaskSchema),
        }),
        z.object({
          $case: z.literal('pipelineTask'),
          pipelineTask: z.lazy(() => marshalPipelineTaskSchema),
        }),
        z.object({
          $case: z.literal('pythonWheelTask'),
          pythonWheelTask: z.lazy(() => marshalPythonWheelTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtTask'),
          dbtTask: z.lazy(() => marshalDbtTaskSchema),
        }),
        z.object({
          $case: z.literal('sqlTask'),
          sqlTask: z.lazy(() => marshalSqlTaskSchema),
        }),
        z.object({
          $case: z.literal('runJobTask'),
          runJobTask: z.lazy(() => marshalRunJobTaskSchema),
        }),
        z.object({
          $case: z.literal('conditionTask'),
          conditionTask: z.lazy(() => marshalConditionTaskSchema),
        }),
        z.object({
          $case: z.literal('forEachTask'),
          forEachTask: z.lazy(() => marshalForEachTaskSchema),
        }),
        z.object({
          $case: z.literal('cleanRoomsNotebookTask'),
          cleanRoomsNotebookTask: z.lazy(
            () => marshalCleanRoomsNotebookTaskSchema
          ),
        }),
        z.object({
          $case: z.literal('genAiComputeTask'),
          genAiComputeTask: z.lazy(() => marshalGenAiComputeTaskSchema),
        }),
        z.object({
          $case: z.literal('alertTask'),
          alertTask: z.lazy(() => marshalAlertTaskSchema),
        }),
        z.object({
          $case: z.literal('powerBiTask'),
          powerBiTask: z.lazy(() => marshalPowerBiTaskSchema),
        }),
        z.object({
          $case: z.literal('dashboardTask'),
          dashboardTask: z.lazy(() => marshalDashboardTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtCloudTask'),
          dbtCloudTask: z.lazy(() => marshalDbtCloudTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtPlatformTask'),
          dbtPlatformTask: z.lazy(() => marshalDbtPlatformTaskSchema),
        }),
        z.object({
          $case: z.literal('pythonOperatorTask'),
          pythonOperatorTask: z.lazy(() => marshalPythonOperatorTaskSchema),
        }),
        z.object({
          $case: z.literal('aiRuntimeTask'),
          aiRuntimeTask: z.lazy(() => marshalAiRuntimeTaskSchema),
        }),
      ])
      .optional(),
    spec: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('existingClusterId'),
          existingClusterId: z.string(),
        }),
        z.object({
          $case: z.literal('newCluster'),
          newCluster: z.lazy(() => marshalClusterSpec_NewClusterSchema),
        }),
        z.object({
          $case: z.literal('jobClusterKey'),
          jobClusterKey: z.string(),
        }),
      ])
      .optional(),
    libraries: z.array(z.lazy(() => marshalLibrarySchema)).optional(),
    maxRetries: z.number().optional(),
    minRetryIntervalMillis: z.number().optional(),
    retryOnTimeout: z.boolean().optional(),
    disableAutoOptimization: z.boolean().optional(),
  })
  .transform(d => ({
    task_key: d.taskKey,
    depends_on: d.dependsOn,
    run_if: d.runIf,
    timeout_seconds: d.timeoutSeconds,
    health: d.health,
    email_notifications: d.emailNotifications,
    notification_settings: d.notificationSettings,
    webhook_notifications: d.webhookNotifications,
    description: d.description,
    ...(d.environmentRef?.$case === 'environmentKey' && {
      environment_key: d.environmentRef.environmentKey,
    }),
    disabled: d.disabled,
    compute: d.compute,
    ...(d.task?.$case === 'notebookTask' && {
      notebook_task: d.task.notebookTask,
    }),
    ...(d.task?.$case === 'sparkJarTask' && {
      spark_jar_task: d.task.sparkJarTask,
    }),
    ...(d.task?.$case === 'sparkPythonTask' && {
      spark_python_task: d.task.sparkPythonTask,
    }),
    ...(d.task?.$case === 'sparkSubmitTask' && {
      spark_submit_task: d.task.sparkSubmitTask,
    }),
    ...(d.task?.$case === 'pipelineTask' && {
      pipeline_task: d.task.pipelineTask,
    }),
    ...(d.task?.$case === 'pythonWheelTask' && {
      python_wheel_task: d.task.pythonWheelTask,
    }),
    ...(d.task?.$case === 'dbtTask' && {dbt_task: d.task.dbtTask}),
    ...(d.task?.$case === 'sqlTask' && {sql_task: d.task.sqlTask}),
    ...(d.task?.$case === 'runJobTask' && {run_job_task: d.task.runJobTask}),
    ...(d.task?.$case === 'conditionTask' && {
      condition_task: d.task.conditionTask,
    }),
    ...(d.task?.$case === 'forEachTask' && {for_each_task: d.task.forEachTask}),
    ...(d.task?.$case === 'cleanRoomsNotebookTask' && {
      clean_rooms_notebook_task: d.task.cleanRoomsNotebookTask,
    }),
    ...(d.task?.$case === 'genAiComputeTask' && {
      gen_ai_compute_task: d.task.genAiComputeTask,
    }),
    ...(d.task?.$case === 'alertTask' && {alert_task: d.task.alertTask}),
    ...(d.task?.$case === 'powerBiTask' && {power_bi_task: d.task.powerBiTask}),
    ...(d.task?.$case === 'dashboardTask' && {
      dashboard_task: d.task.dashboardTask,
    }),
    ...(d.task?.$case === 'dbtCloudTask' && {
      dbt_cloud_task: d.task.dbtCloudTask,
    }),
    ...(d.task?.$case === 'dbtPlatformTask' && {
      dbt_platform_task: d.task.dbtPlatformTask,
    }),
    ...(d.task?.$case === 'pythonOperatorTask' && {
      python_operator_task: d.task.pythonOperatorTask,
    }),
    ...(d.task?.$case === 'aiRuntimeTask' && {
      ai_runtime_task: d.task.aiRuntimeTask,
    }),
    ...(d.spec?.$case === 'existingClusterId' && {
      existing_cluster_id: d.spec.existingClusterId,
    }),
    ...(d.spec?.$case === 'newCluster' && {new_cluster: d.spec.newCluster}),
    ...(d.spec?.$case === 'jobClusterKey' && {
      job_cluster_key: d.spec.jobClusterKey,
    }),
    libraries: d.libraries,
    max_retries: d.maxRetries,
    min_retry_interval_millis: d.minRetryIntervalMillis,
    retry_on_timeout: d.retryOnTimeout,
    disable_auto_optimization: d.disableAutoOptimization,
  }));

export const marshalUpdateAdlsgen2InfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalUpdateAiRuntimeTaskSchema: z.ZodType = z
  .object({
    experiment: z.string().optional(),
    deployments: z
      .array(z.lazy(() => marshalUpdateDeploymentSpecSchema))
      .optional(),
    codeSourcePath: z.string().optional(),
    mlflowRun: z.string().optional(),
    mlflowExperimentDirectory: z.string().optional(),
  })
  .transform(d => ({
    experiment: d.experiment,
    deployments: d.deployments,
    code_source_path: d.codeSourcePath,
    mlflow_run: d.mlflowRun,
    mlflow_experiment_directory: d.mlflowExperimentDirectory,
  }));

export const marshalUpdateAlertTaskSchema: z.ZodType = z
  .object({
    alertId: z.string().optional(),
    warehouseId: z.string().optional(),
    workspacePath: z.string().optional(),
    subscribers: z
      .array(z.lazy(() => marshalUpdateAlertTaskSubscriberSchema))
      .optional(),
  })
  .transform(d => ({
    alert_id: d.alertId,
    warehouse_id: d.warehouseId,
    workspace_path: d.workspacePath,
    subscribers: d.subscribers,
  }));

export const marshalUpdateAlertTaskSubscriberSchema: z.ZodType = z
  .object({
    subscriberType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriberType?.$case === 'userName' && {
      user_name: d.subscriberType.userName,
    }),
    ...(d.subscriberType?.$case === 'destinationId' && {
      destination_id: d.subscriberType.destinationId,
    }),
  }));

export const marshalUpdateAutoScaleSchema: z.ZodType = z
  .object({
    minWorkers: z.number().optional(),
    maxWorkers: z.number().optional(),
  })
  .transform(d => ({
    min_workers: d.minWorkers,
    max_workers: d.maxWorkers,
  }));

export const marshalUpdateAwsAttributesSchema: z.ZodType = z
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

export const marshalUpdateAzureAttributesSchema: z.ZodType = z
  .object({
    logAnalyticsInfo: z
      .lazy(() => marshalUpdateLogAnalyticsInfoSchema)
      .optional(),
    firstOnDemand: z.number().optional(),
    availability: z.string().optional(),
    spotBidMaxPrice: z.number().optional(),
    capacityReservationGroup: z.string().optional(),
  })
  .transform(d => ({
    log_analytics_info: d.logAnalyticsInfo,
    first_on_demand: d.firstOnDemand,
    availability: d.availability,
    spot_bid_max_price: d.spotBidMaxPrice,
    capacity_reservation_group: d.capacityReservationGroup,
  }));

export const marshalUpdateCleanRoomsNotebookTaskSchema: z.ZodType = z
  .object({
    cleanRoomName: z.string().optional(),
    notebookName: z.string().optional(),
    etag: z.string().optional(),
    notebookBaseParameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    clean_room_name: d.cleanRoomName,
    notebook_name: d.notebookName,
    etag: d.etag,
    notebook_base_parameters: d.notebookBaseParameters,
  }));

export const marshalUpdateClusterLogConfSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalUpdateDbfsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('s3'),
          s3: z.lazy(() => marshalUpdateS3StorageInfoSchema),
        }),
        z.object({
          $case: z.literal('volumes'),
          volumes: z.lazy(() => marshalUpdateVolumesStorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
    ...(d.storageInfo?.$case === 's3' && {s3: d.storageInfo.s3}),
    ...(d.storageInfo?.$case === 'volumes' && {volumes: d.storageInfo.volumes}),
  }));

export const marshalUpdateComputeSchema: z.ZodType = z
  .object({
    hardwareAccelerator: z.string().optional(),
  })
  .transform(d => ({
    hardware_accelerator: d.hardwareAccelerator,
  }));

export const marshalUpdateComputeConfigSchema: z.ZodType = z
  .object({
    numGpus: z.number().optional(),
    gpuNodePoolId: z.string().optional(),
    gpuType: z.string().optional(),
  })
  .transform(d => ({
    num_gpus: d.numGpus,
    gpu_node_pool_id: d.gpuNodePoolId,
    gpu_type: d.gpuType,
  }));

export const marshalUpdateComputeSpecSchema: z.ZodType = z
  .object({
    acceleratorType: z.string().optional(),
    acceleratorCount: z.number().optional(),
  })
  .transform(d => ({
    accelerator_type: d.acceleratorType,
    accelerator_count: d.acceleratorCount,
  }));

export const marshalUpdateConditionTaskSchema: z.ZodType = z
  .object({
    op: z.string().optional(),
    left: z.string().optional(),
    right: z.string().optional(),
    outcome: z.string().optional(),
  })
  .transform(d => ({
    op: d.op,
    left: d.left,
    right: d.right,
    outcome: d.outcome,
  }));

export const marshalUpdateContinuousSettingsSchema: z.ZodType = z
  .object({
    pauseStatus: z.string().optional(),
    taskRetryMode: z.string().optional(),
  })
  .transform(d => ({
    pause_status: d.pauseStatus,
    task_retry_mode: d.taskRetryMode,
  }));

export const marshalUpdateCronScheduleSchema: z.ZodType = z
  .object({
    quartzCronExpression: z.string().optional(),
    timezoneId: z.string().optional(),
    pauseStatus: z.string().optional(),
  })
  .transform(d => ({
    quartz_cron_expression: d.quartzCronExpression,
    timezone_id: d.timezoneId,
    pause_status: d.pauseStatus,
  }));

export const marshalUpdateDashboardTaskSchema: z.ZodType = z
  .object({
    subscription: z.lazy(() => marshalUpdateSubscriptionSchema).optional(),
    warehouseId: z.string().optional(),
    dashboardId: z.string().optional(),
    filters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    subscription: d.subscription,
    warehouse_id: d.warehouseId,
    dashboard_id: d.dashboardId,
    filters: d.filters,
  }));

export const marshalUpdateDbfsStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalUpdateDbtCloudTaskSchema: z.ZodType = z
  .object({
    dbtCloudJobId: z.bigint().optional(),
    connectionResourceName: z.string().optional(),
  })
  .transform(d => ({
    dbt_cloud_job_id: d.dbtCloudJobId,
    connection_resource_name: d.connectionResourceName,
  }));

export const marshalUpdateDbtPlatformTaskSchema: z.ZodType = z
  .object({
    dbtPlatformJobId: z.string().optional(),
    connectionResourceName: z.string().optional(),
  })
  .transform(d => ({
    dbt_platform_job_id: d.dbtPlatformJobId,
    connection_resource_name: d.connectionResourceName,
  }));

export const marshalUpdateDbtTaskSchema: z.ZodType = z
  .object({
    projectDirectory: z.string().optional(),
    commands: z.array(z.string()).optional(),
    schema: z.string().optional(),
    warehouseId: z.string().optional(),
    profilesDirectory: z.string().optional(),
    catalog: z.string().optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    project_directory: d.projectDirectory,
    commands: d.commands,
    schema: d.schema,
    warehouse_id: d.warehouseId,
    profiles_directory: d.profilesDirectory,
    catalog: d.catalog,
    source: d.source,
  }));

export const marshalUpdateDeploymentSpecSchema: z.ZodType = z
  .object({
    commandPath: z.string().optional(),
    compute: z.lazy(() => marshalUpdateComputeSpecSchema).optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    command_path: d.commandPath,
    compute: d.compute,
    name: d.name,
  }));

export const marshalUpdateDockerBasicAuthSchema: z.ZodType = z
  .object({
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .transform(d => ({
    username: d.username,
    password: d.password,
  }));

export const marshalUpdateDockerImageSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    credsOneof: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('basicAuth'),
          basicAuth: z.lazy(() => marshalUpdateDockerBasicAuthSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    url: d.url,
    ...(d.credsOneof?.$case === 'basicAuth' && {
      basic_auth: d.credsOneof.basicAuth,
    }),
  }));

export const marshalUpdateEnvironmentSchema: z.ZodType = z
  .object({
    client: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    baseEnvironment: z.string().optional(),
    environmentVersion: z.string().optional(),
    javaDependencies: z.array(z.string()).optional(),
  })
  .transform(d => ({
    client: d.client,
    dependencies: d.dependencies,
    base_environment: d.baseEnvironment,
    environment_version: d.environmentVersion,
    java_dependencies: d.javaDependencies,
  }));

export const marshalUpdateFileArrivalTriggerConfigurationSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    minTimeBetweenTriggersSeconds: z.number().optional(),
    waitAfterLastChangeSeconds: z.number().optional(),
  })
  .transform(d => ({
    url: d.url,
    min_time_between_triggers_seconds: d.minTimeBetweenTriggersSeconds,
    wait_after_last_change_seconds: d.waitAfterLastChangeSeconds,
  }));

export const marshalUpdateForEachTaskSchema: z.ZodType = z
  .object({
    inputs: z.string().optional(),
    concurrency: z.number().optional(),
    task: z.lazy(() => marshalUpdateTaskSettingsSchema).optional(),
  })
  .transform(d => ({
    inputs: d.inputs,
    concurrency: d.concurrency,
    task: d.task,
  }));

export const marshalUpdateGcpAttributesSchema: z.ZodType = z
  .object({
    usePreemptibleExecutors: z.boolean().optional(),
    googleServiceAccount: z.string().optional(),
    bootDiskSize: z.number().optional(),
    availability: z.string().optional(),
    zoneId: z.string().optional(),
    localSsdCount: z.number().optional(),
    firstOnDemand: z.number().optional(),
    confidentialComputeType: z.string().optional(),
  })
  .transform(d => ({
    use_preemptible_executors: d.usePreemptibleExecutors,
    google_service_account: d.googleServiceAccount,
    boot_disk_size: d.bootDiskSize,
    availability: d.availability,
    zone_id: d.zoneId,
    local_ssd_count: d.localSsdCount,
    first_on_demand: d.firstOnDemand,
    confidential_compute_type: d.confidentialComputeType,
  }));

export const marshalUpdateGcsStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalUpdateGenAiComputeTaskSchema: z.ZodType = z
  .object({
    dlRuntimeImage: z.string().optional(),
    compute: z.lazy(() => marshalUpdateComputeConfigSchema).optional(),
    command: z.string().optional(),
    source: z.string().optional(),
    trainingScriptPath: z.string().optional(),
    yamlParametersFilePath: z.string().optional(),
    yamlParameters: z.string().optional(),
    mlflowExperimentName: z.string().optional(),
  })
  .transform(d => ({
    dl_runtime_image: d.dlRuntimeImage,
    compute: d.compute,
    command: d.command,
    source: d.source,
    training_script_path: d.trainingScriptPath,
    yaml_parameters_file_path: d.yamlParametersFilePath,
    yaml_parameters: d.yamlParameters,
    mlflow_experiment_name: d.mlflowExperimentName,
  }));

export const marshalUpdateGitMetadataSnapshotSchema: z.ZodType = z
  .object({
    usedCommit: z.string().optional(),
  })
  .transform(d => ({
    used_commit: d.usedCommit,
  }));

export const marshalUpdateGitSourceSchema: z.ZodType = z
  .object({
    gitUrl: z.string().optional(),
    gitProvider: z.string().optional(),
    gitReference: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('gitBranch'), gitBranch: z.string()}),
        z.object({$case: z.literal('gitTag'), gitTag: z.string()}),
        z.object({$case: z.literal('gitCommit'), gitCommit: z.string()}),
      ])
      .optional(),
    gitSnapshot: z
      .lazy(() => marshalUpdateGitMetadataSnapshotSchema)
      .optional(),
    jobSource: z.lazy(() => marshalUpdateJobSourceSchema).optional(),
    sparseCheckout: z.lazy(() => marshalUpdateSparseCheckoutSchema).optional(),
  })
  .transform(d => ({
    git_url: d.gitUrl,
    git_provider: d.gitProvider,
    ...(d.gitReference?.$case === 'gitBranch' && {
      git_branch: d.gitReference.gitBranch,
    }),
    ...(d.gitReference?.$case === 'gitTag' && {git_tag: d.gitReference.gitTag}),
    ...(d.gitReference?.$case === 'gitCommit' && {
      git_commit: d.gitReference.gitCommit,
    }),
    git_snapshot: d.gitSnapshot,
    job_source: d.jobSource,
    sparse_checkout: d.sparseCheckout,
  }));

export const marshalUpdateInitScriptInfoSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalUpdateDbfsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('s3'),
          s3: z.lazy(() => marshalUpdateS3StorageInfoSchema),
        }),
        z.object({
          $case: z.literal('file'),
          file: z.lazy(() => marshalUpdateLocalFileInfoSchema),
        }),
        z.object({
          $case: z.literal('gcs'),
          gcs: z.lazy(() => marshalUpdateGcsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('abfss'),
          abfss: z.lazy(() => marshalUpdateAdlsgen2InfoSchema),
        }),
        z.object({
          $case: z.literal('workspace'),
          workspace: z.lazy(() => marshalUpdateWorkspaceStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('volumes'),
          volumes: z.lazy(() => marshalUpdateVolumesStorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
    ...(d.storageInfo?.$case === 's3' && {s3: d.storageInfo.s3}),
    ...(d.storageInfo?.$case === 'file' && {file: d.storageInfo.file}),
    ...(d.storageInfo?.$case === 'gcs' && {gcs: d.storageInfo.gcs}),
    ...(d.storageInfo?.$case === 'abfss' && {abfss: d.storageInfo.abfss}),
    ...(d.storageInfo?.$case === 'workspace' && {
      workspace: d.storageInfo.workspace,
    }),
    ...(d.storageInfo?.$case === 'volumes' && {volumes: d.storageInfo.volumes}),
  }));

export const marshalUpdateJobClusterSchema: z.ZodType = z
  .object({
    jobClusterKey: z.string().optional(),
    newCluster: z
      .lazy(() => marshalClusterSpec_UpdateNewClusterSchema)
      .optional(),
  })
  .transform(d => ({
    job_cluster_key: d.jobClusterKey,
    new_cluster: d.newCluster,
  }));

export const marshalUpdateJobDeploymentSchema: z.ZodType = z
  .object({
    kind: z.string().optional(),
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

export const marshalUpdateJobEmailNotificationsSchema: z.ZodType = z
  .object({
    onStart: z.array(z.string()).optional(),
    onSuccess: z.array(z.string()).optional(),
    onFailure: z.array(z.string()).optional(),
    onDurationWarningThresholdExceeded: z.array(z.string()).optional(),
    onStreamingBacklogExceeded: z.array(z.string()).optional(),
    noAlertForSkippedRuns: z.boolean().optional(),
  })
  .transform(d => ({
    on_start: d.onStart,
    on_success: d.onSuccess,
    on_failure: d.onFailure,
    on_duration_warning_threshold_exceeded:
      d.onDurationWarningThresholdExceeded,
    on_streaming_backlog_exceeded: d.onStreamingBacklogExceeded,
    no_alert_for_skipped_runs: d.noAlertForSkippedRuns,
  }));

export const marshalUpdateJobEnvironmentSchema: z.ZodType = z
  .object({
    environmentKey: z.string().optional(),
    spec: z.lazy(() => marshalUpdateEnvironmentSchema).optional(),
  })
  .transform(d => ({
    environment_key: d.environmentKey,
    spec: d.spec,
  }));

export const marshalUpdateJobLevelParameterSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    default: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    default: d.default,
  }));

export const marshalUpdateJobRequestSchema: z.ZodType = z
  .object({
    jobId: z.bigint().optional(),
    newSettings: z.lazy(() => marshalUpdateJobSettingsSchema).optional(),
    fieldsToRemove: z.array(z.string()).optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    new_settings: d.newSettings,
    fields_to_remove: d.fieldsToRemove,
  }));

export const marshalUpdateJobRunAsSchema: z.ZodType = z
  .object({
    identity: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('servicePrincipalName'),
          servicePrincipalName: z.string(),
        }),
        z.object({$case: z.literal('groupName'), groupName: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.identity?.$case === 'userName' && {user_name: d.identity.userName}),
    ...(d.identity?.$case === 'servicePrincipalName' && {
      service_principal_name: d.identity.servicePrincipalName,
    }),
    ...(d.identity?.$case === 'groupName' && {
      group_name: d.identity.groupName,
    }),
  }));

export const marshalUpdateJobSettingsSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    emailNotifications: z
      .lazy(() => marshalUpdateJobEmailNotificationsSchema)
      .optional(),
    webhookNotifications: z
      .lazy(() => marshalUpdateWebhookNotificationsSchema)
      .optional(),
    notificationSettings: z
      .lazy(() => marshalUpdateNotificationSettingsSchema)
      .optional(),
    timeoutSeconds: z.number().optional(),
    health: z.lazy(() => marshalUpdateJobsHealthRulesSchema).optional(),
    schedule: z.lazy(() => marshalUpdateCronScheduleSchema).optional(),
    trigger: z.lazy(() => marshalUpdateTriggerSettingsSchema).optional(),
    continuous: z.lazy(() => marshalUpdateContinuousSettingsSchema).optional(),
    maxConcurrentRuns: z.number().optional(),
    tasks: z.array(z.lazy(() => marshalUpdateTaskSettingsSchema)).optional(),
    jobClusters: z
      .array(z.lazy(() => marshalUpdateJobClusterSchema))
      .optional(),
    gitSource: z.lazy(() => marshalUpdateGitSourceSchema).optional(),
    tags: z.record(z.string(), z.string()).optional(),
    format: z.string().optional(),
    queue: z.lazy(() => marshalUpdateQueueSettingsSchema).optional(),
    parameters: z
      .array(z.lazy(() => marshalUpdateJobLevelParameterSchema))
      .optional(),
    runAs: z.lazy(() => marshalUpdateJobRunAsSchema).optional(),
    editMode: z.string().optional(),
    deployment: z.lazy(() => marshalUpdateJobDeploymentSchema).optional(),
    environments: z
      .array(z.lazy(() => marshalUpdateJobEnvironmentSchema))
      .optional(),
    budgetPolicyId: z.string().optional(),
    usagePolicyId: z.string().optional(),
    performanceTarget: z.string().optional(),
    maxRetries: z.number().optional(),
    minRetryIntervalMillis: z.number().optional(),
    retryOnTimeout: z.boolean().optional(),
    disableAutoOptimization: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    email_notifications: d.emailNotifications,
    webhook_notifications: d.webhookNotifications,
    notification_settings: d.notificationSettings,
    timeout_seconds: d.timeoutSeconds,
    health: d.health,
    schedule: d.schedule,
    trigger: d.trigger,
    continuous: d.continuous,
    max_concurrent_runs: d.maxConcurrentRuns,
    tasks: d.tasks,
    job_clusters: d.jobClusters,
    git_source: d.gitSource,
    tags: d.tags,
    format: d.format,
    queue: d.queue,
    parameters: d.parameters,
    run_as: d.runAs,
    edit_mode: d.editMode,
    deployment: d.deployment,
    environments: d.environments,
    budget_policy_id: d.budgetPolicyId,
    usage_policy_id: d.usagePolicyId,
    performance_target: d.performanceTarget,
    max_retries: d.maxRetries,
    min_retry_interval_millis: d.minRetryIntervalMillis,
    retry_on_timeout: d.retryOnTimeout,
    disable_auto_optimization: d.disableAutoOptimization,
  }));

export const marshalUpdateJobSourceSchema: z.ZodType = z
  .object({
    jobConfigPath: z.string().optional(),
    importFromGitReference: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('importFromGitBranch'),
          importFromGitBranch: z.string(),
        }),
      ])
      .optional(),
    dirtyState: z.string().optional(),
  })
  .transform(d => ({
    job_config_path: d.jobConfigPath,
    ...(d.importFromGitReference?.$case === 'importFromGitBranch' && {
      import_from_git_branch: d.importFromGitReference.importFromGitBranch,
    }),
    dirty_state: d.dirtyState,
  }));

export const marshalUpdateJobsHealthRuleSchema: z.ZodType = z
  .object({
    metric: z.string().optional(),
    op: z.string().optional(),
    value: z.bigint().optional(),
  })
  .transform(d => ({
    metric: d.metric,
    op: d.op,
    value: d.value,
  }));

export const marshalUpdateJobsHealthRulesSchema: z.ZodType = z
  .object({
    rules: z.array(z.lazy(() => marshalUpdateJobsHealthRuleSchema)).optional(),
  })
  .transform(d => ({
    rules: d.rules,
  }));

export const marshalUpdateLibrarySchema: z.ZodType = z
  .object({
    lib: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('jar'), jar: z.string()}),
        z.object({$case: z.literal('egg'), egg: z.string()}),
        z.object({
          $case: z.literal('pypi'),
          pypi: z.lazy(() => marshalUpdatePythonPyPiLibrarySchema),
        }),
        z.object({
          $case: z.literal('maven'),
          maven: z.lazy(() => marshalUpdateMavenLibrarySchema),
        }),
        z.object({
          $case: z.literal('cran'),
          cran: z.lazy(() => marshalUpdateRCranLibrarySchema),
        }),
        z.object({$case: z.literal('whl'), whl: z.string()}),
        z.object({$case: z.literal('requirements'), requirements: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.lib?.$case === 'jar' && {jar: d.lib.jar}),
    ...(d.lib?.$case === 'egg' && {egg: d.lib.egg}),
    ...(d.lib?.$case === 'pypi' && {pypi: d.lib.pypi}),
    ...(d.lib?.$case === 'maven' && {maven: d.lib.maven}),
    ...(d.lib?.$case === 'cran' && {cran: d.lib.cran}),
    ...(d.lib?.$case === 'whl' && {whl: d.lib.whl}),
    ...(d.lib?.$case === 'requirements' && {requirements: d.lib.requirements}),
  }));

export const marshalUpdateLocalFileInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalUpdateLogAnalyticsInfoSchema: z.ZodType = z
  .object({
    logAnalyticsWorkspaceId: z.string().optional(),
    logAnalyticsPrimaryKey: z.string().optional(),
  })
  .transform(d => ({
    log_analytics_workspace_id: d.logAnalyticsWorkspaceId,
    log_analytics_primary_key: d.logAnalyticsPrimaryKey,
  }));

export const marshalUpdateMavenLibrarySchema: z.ZodType = z
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

export const marshalUpdateModelTriggerConfigurationSchema: z.ZodType = z
  .object({
    securableName: z.string().optional(),
    aliases: z.array(z.string()).optional(),
    condition: z.string().optional(),
    minTimeBetweenTriggersSeconds: z.number().optional(),
    waitAfterLastChangeSeconds: z.number().optional(),
  })
  .transform(d => ({
    securable_name: d.securableName,
    aliases: d.aliases,
    condition: d.condition,
    min_time_between_triggers_seconds: d.minTimeBetweenTriggersSeconds,
    wait_after_last_change_seconds: d.waitAfterLastChangeSeconds,
  }));

export const marshalUpdateNodeTypeFlexibilitySchema: z.ZodType = z
  .object({
    alternateNodeTypeIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    alternate_node_type_ids: d.alternateNodeTypeIds,
  }));

export const marshalUpdateNotebookTaskSchema: z.ZodType = z
  .object({
    notebookPath: z.string().optional(),
    baseParameters: z.record(z.string(), z.string()).optional(),
    source: z.string().optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    notebook_path: d.notebookPath,
    base_parameters: d.baseParameters,
    source: d.source,
    warehouse_id: d.warehouseId,
  }));

export const marshalUpdateNotificationSettingsSchema: z.ZodType = z
  .object({
    noAlertForSkippedRuns: z.boolean().optional(),
    noAlertForCanceledRuns: z.boolean().optional(),
    alertOnLastAttempt: z.boolean().optional(),
  })
  .transform(d => ({
    no_alert_for_skipped_runs: d.noAlertForSkippedRuns,
    no_alert_for_canceled_runs: d.noAlertForCanceledRuns,
    alert_on_last_attempt: d.alertOnLastAttempt,
  }));

export const marshalUpdatePeriodicTriggerConfigurationSchema: z.ZodType = z
  .object({
    interval: z.number().optional(),
    unit: z.string().optional(),
  })
  .transform(d => ({
    interval: d.interval,
    unit: d.unit,
  }));

export const marshalUpdatePipelineParametersSchema: z.ZodType = z
  .object({
    fullRefresh: z.boolean().optional(),
    refreshSelection: z.array(z.string()).optional(),
    fullRefreshSelection: z.array(z.string()).optional(),
    resetCheckpointSelection: z.array(z.string()).optional(),
    refreshFlowSelection: z.array(z.string()).optional(),
  })
  .transform(d => ({
    full_refresh: d.fullRefresh,
    refresh_selection: d.refreshSelection,
    full_refresh_selection: d.fullRefreshSelection,
    reset_checkpoint_selection: d.resetCheckpointSelection,
    refresh_flow_selection: d.refreshFlowSelection,
  }));

export const marshalUpdatePipelineTaskSchema: z.ZodType = z
  .object({
    pipelineId: z.string().optional(),
    pipelineTaskParameters: z.record(z.string(), z.string()).optional(),
    fullRefresh: z.boolean().optional(),
    refreshSelection: z.array(z.string()).optional(),
    fullRefreshSelection: z.array(z.string()).optional(),
    resetCheckpointSelection: z.array(z.string()).optional(),
    refreshFlowSelection: z.array(z.string()).optional(),
  })
  .transform(d => ({
    pipeline_id: d.pipelineId,
    parameters: d.pipelineTaskParameters,
    full_refresh: d.fullRefresh,
    refresh_selection: d.refreshSelection,
    full_refresh_selection: d.fullRefreshSelection,
    reset_checkpoint_selection: d.resetCheckpointSelection,
    refresh_flow_selection: d.refreshFlowSelection,
  }));

export const marshalUpdatePowerBiModelSchema: z.ZodType = z
  .object({
    workspaceName: z.string().optional(),
    modelName: z.string().optional(),
    storageMode: z.string().optional(),
    authenticationMethod: z.string().optional(),
    overwriteExisting: z.boolean().optional(),
  })
  .transform(d => ({
    workspace_name: d.workspaceName,
    model_name: d.modelName,
    storage_mode: d.storageMode,
    authentication_method: d.authenticationMethod,
    overwrite_existing: d.overwriteExisting,
  }));

export const marshalUpdatePowerBiTableSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
    storageMode: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog: d.catalog,
    schema: d.schema,
    storage_mode: d.storageMode,
  }));

export const marshalUpdatePowerBiTaskSchema: z.ZodType = z
  .object({
    tables: z.array(z.lazy(() => marshalUpdatePowerBiTableSchema)).optional(),
    warehouseId: z.string().optional(),
    powerBiModel: z.lazy(() => marshalUpdatePowerBiModelSchema).optional(),
    connectionResourceName: z.string().optional(),
    refreshAfterUpdate: z.boolean().optional(),
  })
  .transform(d => ({
    tables: d.tables,
    warehouse_id: d.warehouseId,
    power_bi_model: d.powerBiModel,
    connection_resource_name: d.connectionResourceName,
    refresh_after_update: d.refreshAfterUpdate,
  }));

export const marshalUpdatePythonOperatorTaskSchema: z.ZodType = z
  .object({
    parameters: z
      .array(z.lazy(() => marshalPythonOperatorTask_UpdateParameterSchema))
      .optional(),
    main: z.string().optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
    main: d.main,
  }));

export const marshalUpdatePythonPyPiLibrarySchema: z.ZodType = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const marshalUpdatePythonWheelTaskSchema: z.ZodType = z
  .object({
    packageName: z.string().optional(),
    entryPoint: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    namedParameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    package_name: d.packageName,
    entry_point: d.entryPoint,
    parameters: d.parameters,
    named_parameters: d.namedParameters,
  }));

export const marshalUpdateQueueSettingsSchema: z.ZodType = z
  .object({
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
  }));

export const marshalUpdateRCranLibrarySchema: z.ZodType = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const marshalUpdateRunJobTaskSchema: z.ZodType = z
  .object({
    jobId: z.bigint().optional(),
    jobParameters: z.record(z.string(), z.string()).optional(),
    pipelineParams: z
      .lazy(() => marshalUpdatePipelineParametersSchema)
      .optional(),
    jarParams: z.array(z.string()).optional(),
    notebookParams: z.record(z.string(), z.string()).optional(),
    pythonParams: z.array(z.string()).optional(),
    sparkSubmitParams: z.array(z.string()).optional(),
    pythonNamedParams: z.record(z.string(), z.string()).optional(),
    sqlParams: z.record(z.string(), z.string()).optional(),
    dbtCommands: z.array(z.string()).optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    job_parameters: d.jobParameters,
    pipeline_params: d.pipelineParams,
    jar_params: d.jarParams,
    notebook_params: d.notebookParams,
    python_params: d.pythonParams,
    spark_submit_params: d.sparkSubmitParams,
    python_named_params: d.pythonNamedParams,
    sql_params: d.sqlParams,
    dbt_commands: d.dbtCommands,
  }));

export const marshalUpdateS3StorageInfoSchema: z.ZodType = z
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

export const marshalUpdateSparkJarTaskSchema: z.ZodType = z
  .object({
    jarUri: z.string().optional(),
    mainClassName: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    runAsRepl: z.boolean().optional(),
  })
  .transform(d => ({
    jar_uri: d.jarUri,
    main_class_name: d.mainClassName,
    parameters: d.parameters,
    run_as_repl: d.runAsRepl,
  }));

export const marshalUpdateSparkPythonTaskSchema: z.ZodType = z
  .object({
    pythonFile: z.string().optional(),
    parameters: z.array(z.string()).optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    python_file: d.pythonFile,
    parameters: d.parameters,
    source: d.source,
  }));

export const marshalUpdateSparkSubmitTaskSchema: z.ZodType = z
  .object({
    parameters: z.array(z.string()).optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
  }));

export const marshalUpdateSparseCheckoutSchema: z.ZodType = z
  .object({
    patterns: z.array(z.string()).optional(),
  })
  .transform(d => ({
    patterns: d.patterns,
  }));

export const marshalUpdateSqlTaskSchema: z.ZodType = z
  .object({
    parameters: z.record(z.string(), z.string()).optional(),
    sqlTaskType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('query'),
          query: z.lazy(() => marshalUpdateSqlTaskQuerySchema),
        }),
        z.object({
          $case: z.literal('dashboard'),
          dashboard: z.lazy(() => marshalUpdateSqlTaskDashboardSchema),
        }),
        z.object({
          $case: z.literal('alert'),
          alert: z.lazy(() => marshalUpdateSqlTaskAlertSchema),
        }),
        z.object({
          $case: z.literal('file'),
          file: z.lazy(() => marshalUpdateSqlTaskFileSchema),
        }),
      ])
      .optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
    ...(d.sqlTaskType?.$case === 'query' && {query: d.sqlTaskType.query}),
    ...(d.sqlTaskType?.$case === 'dashboard' && {
      dashboard: d.sqlTaskType.dashboard,
    }),
    ...(d.sqlTaskType?.$case === 'alert' && {alert: d.sqlTaskType.alert}),
    ...(d.sqlTaskType?.$case === 'file' && {file: d.sqlTaskType.file}),
    warehouse_id: d.warehouseId,
  }));

export const marshalUpdateSqlTaskAlertSchema: z.ZodType = z
  .object({
    alertId: z.string().optional(),
    subscriptions: z
      .array(z.lazy(() => marshalUpdateSqlTaskSubscriptionSchema))
      .optional(),
    pauseSubscriptions: z.boolean().optional(),
  })
  .transform(d => ({
    alert_id: d.alertId,
    subscriptions: d.subscriptions,
    pause_subscriptions: d.pauseSubscriptions,
  }));

export const marshalUpdateSqlTaskDashboardSchema: z.ZodType = z
  .object({
    dashboardId: z.string().optional(),
    subscriptions: z
      .array(z.lazy(() => marshalUpdateSqlTaskSubscriptionSchema))
      .optional(),
    customSubject: z.string().optional(),
    pauseSubscriptions: z.boolean().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
    subscriptions: d.subscriptions,
    custom_subject: d.customSubject,
    pause_subscriptions: d.pauseSubscriptions,
  }));

export const marshalUpdateSqlTaskFileSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    source: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
    source: d.source,
  }));

export const marshalUpdateSqlTaskQuerySchema: z.ZodType = z
  .object({
    queryType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('queryId'), queryId: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.queryType?.$case === 'queryId' && {query_id: d.queryType.queryId}),
  }));

export const marshalUpdateSqlTaskSubscriptionSchema: z.ZodType = z
  .object({
    subscriptionType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriptionType?.$case === 'userName' && {
      user_name: d.subscriptionType.userName,
    }),
    ...(d.subscriptionType?.$case === 'destinationId' && {
      destination_id: d.subscriptionType.destinationId,
    }),
  }));

export const marshalUpdateSubscriptionSchema: z.ZodType = z
  .object({
    subscribers: z
      .array(z.lazy(() => marshalSubscription_UpdateSubscriberSchema))
      .optional(),
    paused: z.boolean().optional(),
    customSubject: z.string().optional(),
  })
  .transform(d => ({
    subscribers: d.subscribers,
    paused: d.paused,
    custom_subject: d.customSubject,
  }));

export const marshalUpdateTableTriggerConfigurationSchema: z.ZodType = z
  .object({
    tableNames: z.array(z.string()).optional(),
    minTimeBetweenTriggersSeconds: z.number().optional(),
    waitAfterLastChangeSeconds: z.number().optional(),
    condition: z.string().optional(),
  })
  .transform(d => ({
    table_names: d.tableNames,
    min_time_between_triggers_seconds: d.minTimeBetweenTriggersSeconds,
    wait_after_last_change_seconds: d.waitAfterLastChangeSeconds,
    condition: d.condition,
  }));

export const marshalUpdateTaskDependencySchema: z.ZodType = z
  .object({
    taskKey: z.string().optional(),
    outcome: z.string().optional(),
  })
  .transform(d => ({
    task_key: d.taskKey,
    outcome: d.outcome,
  }));

export const marshalUpdateTaskSettingsSchema: z.ZodType = z
  .object({
    taskKey: z.string().optional(),
    dependsOn: z
      .array(z.lazy(() => marshalUpdateTaskDependencySchema))
      .optional(),
    runIf: z.string().optional(),
    timeoutSeconds: z.number().optional(),
    health: z.lazy(() => marshalUpdateJobsHealthRulesSchema).optional(),
    emailNotifications: z
      .lazy(() => marshalUpdateJobEmailNotificationsSchema)
      .optional(),
    notificationSettings: z
      .lazy(() => marshalUpdateNotificationSettingsSchema)
      .optional(),
    webhookNotifications: z
      .lazy(() => marshalUpdateWebhookNotificationsSchema)
      .optional(),
    description: z.string().optional(),
    environmentRef: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('environmentKey'),
          environmentKey: z.string(),
        }),
      ])
      .optional(),
    disabled: z.boolean().optional(),
    compute: z.lazy(() => marshalUpdateComputeSchema).optional(),
    task: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('notebookTask'),
          notebookTask: z.lazy(() => marshalUpdateNotebookTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkJarTask'),
          sparkJarTask: z.lazy(() => marshalUpdateSparkJarTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkPythonTask'),
          sparkPythonTask: z.lazy(() => marshalUpdateSparkPythonTaskSchema),
        }),
        z.object({
          $case: z.literal('sparkSubmitTask'),
          sparkSubmitTask: z.lazy(() => marshalUpdateSparkSubmitTaskSchema),
        }),
        z.object({
          $case: z.literal('pipelineTask'),
          pipelineTask: z.lazy(() => marshalUpdatePipelineTaskSchema),
        }),
        z.object({
          $case: z.literal('pythonWheelTask'),
          pythonWheelTask: z.lazy(() => marshalUpdatePythonWheelTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtTask'),
          dbtTask: z.lazy(() => marshalUpdateDbtTaskSchema),
        }),
        z.object({
          $case: z.literal('sqlTask'),
          sqlTask: z.lazy(() => marshalUpdateSqlTaskSchema),
        }),
        z.object({
          $case: z.literal('runJobTask'),
          runJobTask: z.lazy(() => marshalUpdateRunJobTaskSchema),
        }),
        z.object({
          $case: z.literal('conditionTask'),
          conditionTask: z.lazy(() => marshalUpdateConditionTaskSchema),
        }),
        z.object({
          $case: z.literal('forEachTask'),
          forEachTask: z.lazy(() => marshalUpdateForEachTaskSchema),
        }),
        z.object({
          $case: z.literal('cleanRoomsNotebookTask'),
          cleanRoomsNotebookTask: z.lazy(
            () => marshalUpdateCleanRoomsNotebookTaskSchema
          ),
        }),
        z.object({
          $case: z.literal('genAiComputeTask'),
          genAiComputeTask: z.lazy(() => marshalUpdateGenAiComputeTaskSchema),
        }),
        z.object({
          $case: z.literal('alertTask'),
          alertTask: z.lazy(() => marshalUpdateAlertTaskSchema),
        }),
        z.object({
          $case: z.literal('powerBiTask'),
          powerBiTask: z.lazy(() => marshalUpdatePowerBiTaskSchema),
        }),
        z.object({
          $case: z.literal('dashboardTask'),
          dashboardTask: z.lazy(() => marshalUpdateDashboardTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtCloudTask'),
          dbtCloudTask: z.lazy(() => marshalUpdateDbtCloudTaskSchema),
        }),
        z.object({
          $case: z.literal('dbtPlatformTask'),
          dbtPlatformTask: z.lazy(() => marshalUpdateDbtPlatformTaskSchema),
        }),
        z.object({
          $case: z.literal('pythonOperatorTask'),
          pythonOperatorTask: z.lazy(
            () => marshalUpdatePythonOperatorTaskSchema
          ),
        }),
        z.object({
          $case: z.literal('aiRuntimeTask'),
          aiRuntimeTask: z.lazy(() => marshalUpdateAiRuntimeTaskSchema),
        }),
      ])
      .optional(),
    spec: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('existingClusterId'),
          existingClusterId: z.string(),
        }),
        z.object({
          $case: z.literal('newCluster'),
          newCluster: z.lazy(() => marshalClusterSpec_UpdateNewClusterSchema),
        }),
        z.object({
          $case: z.literal('jobClusterKey'),
          jobClusterKey: z.string(),
        }),
      ])
      .optional(),
    libraries: z.array(z.lazy(() => marshalUpdateLibrarySchema)).optional(),
    maxRetries: z.number().optional(),
    minRetryIntervalMillis: z.number().optional(),
    retryOnTimeout: z.boolean().optional(),
    disableAutoOptimization: z.boolean().optional(),
  })
  .transform(d => ({
    task_key: d.taskKey,
    depends_on: d.dependsOn,
    run_if: d.runIf,
    timeout_seconds: d.timeoutSeconds,
    health: d.health,
    email_notifications: d.emailNotifications,
    notification_settings: d.notificationSettings,
    webhook_notifications: d.webhookNotifications,
    description: d.description,
    ...(d.environmentRef?.$case === 'environmentKey' && {
      environment_key: d.environmentRef.environmentKey,
    }),
    disabled: d.disabled,
    compute: d.compute,
    ...(d.task?.$case === 'notebookTask' && {
      notebook_task: d.task.notebookTask,
    }),
    ...(d.task?.$case === 'sparkJarTask' && {
      spark_jar_task: d.task.sparkJarTask,
    }),
    ...(d.task?.$case === 'sparkPythonTask' && {
      spark_python_task: d.task.sparkPythonTask,
    }),
    ...(d.task?.$case === 'sparkSubmitTask' && {
      spark_submit_task: d.task.sparkSubmitTask,
    }),
    ...(d.task?.$case === 'pipelineTask' && {
      pipeline_task: d.task.pipelineTask,
    }),
    ...(d.task?.$case === 'pythonWheelTask' && {
      python_wheel_task: d.task.pythonWheelTask,
    }),
    ...(d.task?.$case === 'dbtTask' && {dbt_task: d.task.dbtTask}),
    ...(d.task?.$case === 'sqlTask' && {sql_task: d.task.sqlTask}),
    ...(d.task?.$case === 'runJobTask' && {run_job_task: d.task.runJobTask}),
    ...(d.task?.$case === 'conditionTask' && {
      condition_task: d.task.conditionTask,
    }),
    ...(d.task?.$case === 'forEachTask' && {for_each_task: d.task.forEachTask}),
    ...(d.task?.$case === 'cleanRoomsNotebookTask' && {
      clean_rooms_notebook_task: d.task.cleanRoomsNotebookTask,
    }),
    ...(d.task?.$case === 'genAiComputeTask' && {
      gen_ai_compute_task: d.task.genAiComputeTask,
    }),
    ...(d.task?.$case === 'alertTask' && {alert_task: d.task.alertTask}),
    ...(d.task?.$case === 'powerBiTask' && {power_bi_task: d.task.powerBiTask}),
    ...(d.task?.$case === 'dashboardTask' && {
      dashboard_task: d.task.dashboardTask,
    }),
    ...(d.task?.$case === 'dbtCloudTask' && {
      dbt_cloud_task: d.task.dbtCloudTask,
    }),
    ...(d.task?.$case === 'dbtPlatformTask' && {
      dbt_platform_task: d.task.dbtPlatformTask,
    }),
    ...(d.task?.$case === 'pythonOperatorTask' && {
      python_operator_task: d.task.pythonOperatorTask,
    }),
    ...(d.task?.$case === 'aiRuntimeTask' && {
      ai_runtime_task: d.task.aiRuntimeTask,
    }),
    ...(d.spec?.$case === 'existingClusterId' && {
      existing_cluster_id: d.spec.existingClusterId,
    }),
    ...(d.spec?.$case === 'newCluster' && {new_cluster: d.spec.newCluster}),
    ...(d.spec?.$case === 'jobClusterKey' && {
      job_cluster_key: d.spec.jobClusterKey,
    }),
    libraries: d.libraries,
    max_retries: d.maxRetries,
    min_retry_interval_millis: d.minRetryIntervalMillis,
    retry_on_timeout: d.retryOnTimeout,
    disable_auto_optimization: d.disableAutoOptimization,
  }));

export const marshalUpdateTriggerSettingsSchema: z.ZodType = z
  .object({
    pauseStatus: z.string().optional(),
    configuration: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('fileArrival'),
          fileArrival: z.lazy(
            () => marshalUpdateFileArrivalTriggerConfigurationSchema
          ),
        }),
        z.object({
          $case: z.literal('periodic'),
          periodic: z.lazy(
            () => marshalUpdatePeriodicTriggerConfigurationSchema
          ),
        }),
        z.object({
          $case: z.literal('tableUpdate'),
          tableUpdate: z.lazy(
            () => marshalUpdateTableTriggerConfigurationSchema
          ),
        }),
        z.object({
          $case: z.literal('model'),
          model: z.lazy(() => marshalUpdateModelTriggerConfigurationSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    pause_status: d.pauseStatus,
    ...(d.configuration?.$case === 'fileArrival' && {
      file_arrival: d.configuration.fileArrival,
    }),
    ...(d.configuration?.$case === 'periodic' && {
      periodic: d.configuration.periodic,
    }),
    ...(d.configuration?.$case === 'tableUpdate' && {
      table_update: d.configuration.tableUpdate,
    }),
    ...(d.configuration?.$case === 'model' && {model: d.configuration.model}),
  }));

export const marshalUpdateVolumesStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalUpdateWebhookSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalUpdateWebhookNotificationsSchema: z.ZodType = z
  .object({
    onStart: z.array(z.lazy(() => marshalUpdateWebhookSchema)).optional(),
    onSuccess: z.array(z.lazy(() => marshalUpdateWebhookSchema)).optional(),
    onFailure: z.array(z.lazy(() => marshalUpdateWebhookSchema)).optional(),
    onDurationWarningThresholdExceeded: z
      .array(z.lazy(() => marshalUpdateWebhookSchema))
      .optional(),
    onStreamingBacklogExceeded: z
      .array(z.lazy(() => marshalUpdateWebhookSchema))
      .optional(),
  })
  .transform(d => ({
    on_start: d.onStart,
    on_success: d.onSuccess,
    on_failure: d.onFailure,
    on_duration_warning_threshold_exceeded:
      d.onDurationWarningThresholdExceeded,
    on_streaming_backlog_exceeded: d.onStreamingBacklogExceeded,
  }));

export const marshalUpdateWorkloadTypeSchema: z.ZodType = z
  .object({
    clients: z
      .lazy(() => marshalWorkloadType_UpdateClientsTypesSchema)
      .optional(),
  })
  .transform(d => ({
    clients: d.clients,
  }));

export const marshalUpdateWorkspaceStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalVolumesStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalWebhookSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalWebhookNotificationsSchema: z.ZodType = z
  .object({
    onStart: z.array(z.lazy(() => marshalWebhookSchema)).optional(),
    onSuccess: z.array(z.lazy(() => marshalWebhookSchema)).optional(),
    onFailure: z.array(z.lazy(() => marshalWebhookSchema)).optional(),
    onDurationWarningThresholdExceeded: z
      .array(z.lazy(() => marshalWebhookSchema))
      .optional(),
    onStreamingBacklogExceeded: z
      .array(z.lazy(() => marshalWebhookSchema))
      .optional(),
  })
  .transform(d => ({
    on_start: d.onStart,
    on_success: d.onSuccess,
    on_failure: d.onFailure,
    on_duration_warning_threshold_exceeded:
      d.onDurationWarningThresholdExceeded,
    on_streaming_backlog_exceeded: d.onStreamingBacklogExceeded,
  }));

export const marshalWorkloadTypeSchema: z.ZodType = z
  .object({
    clients: z.lazy(() => marshalWorkloadType_ClientsTypesSchema).optional(),
  })
  .transform(d => ({
    clients: d.clients,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalWorkloadType_ClientsTypesSchema: z.ZodType = z
  .object({
    notebooks: z.boolean().optional(),
    jobs: z.boolean().optional(),
  })
  .transform(d => ({
    notebooks: d.notebooks,
    jobs: d.jobs,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalWorkloadType_CreateClientsTypesSchema: z.ZodType = z
  .object({
    notebooks: z.boolean().optional(),
    jobs: z.boolean().optional(),
  })
  .transform(d => ({
    notebooks: d.notebooks,
    jobs: d.jobs,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalWorkloadType_UpdateClientsTypesSchema: z.ZodType = z
  .object({
    notebooks: z.boolean().optional(),
    jobs: z.boolean().optional(),
  })
  .transform(d => ({
    notebooks: d.notebooks,
    jobs: d.jobs,
  }));

export const marshalWorkspaceStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));
