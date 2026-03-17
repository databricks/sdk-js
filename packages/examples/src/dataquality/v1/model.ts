import {z} from 'zod';

// ---------------------------------------------------------------------------
// Enums.
// ---------------------------------------------------------------------------

export enum AggregationGranularity {
  UNSPECIFIED = 'AGGREGATION_GRANULARITY_UNSPECIFIED',
  FIVE_MINUTES = 'AGGREGATION_GRANULARITY_5_MINUTES',
  THIRTY_MINUTES = 'AGGREGATION_GRANULARITY_30_MINUTES',
  ONE_HOUR = 'AGGREGATION_GRANULARITY_1_HOUR',
  ONE_DAY = 'AGGREGATION_GRANULARITY_1_DAY',
  ONE_WEEK = 'AGGREGATION_GRANULARITY_1_WEEK',
  TWO_WEEKS = 'AGGREGATION_GRANULARITY_2_WEEKS',
  THREE_WEEKS = 'AGGREGATION_GRANULARITY_3_WEEKS',
  FOUR_WEEKS = 'AGGREGATION_GRANULARITY_4_WEEKS',
  ONE_MONTH = 'AGGREGATION_GRANULARITY_1_MONTH',
  ONE_YEAR = 'AGGREGATION_GRANULARITY_1_YEAR',
}

export enum AnomalyDetectionJobType {
  UNSPECIFIED = 'ANOMALY_DETECTION_JOB_TYPE_UNSPECIFIED',
  NORMAL = 'ANOMALY_DETECTION_JOB_TYPE_NORMAL',
  INTERNAL_HIDDEN = 'ANOMALY_DETECTION_JOB_TYPE_INTERNAL_HIDDEN',
}

export enum CronSchedulePauseStatus {
  UNSPECIFIED = 'CRON_SCHEDULE_PAUSE_STATUS_UNSPECIFIED',
  UNPAUSED = 'CRON_SCHEDULE_PAUSE_STATUS_UNPAUSED',
  PAUSED = 'CRON_SCHEDULE_PAUSE_STATUS_PAUSED',
}

export enum DataProfilingCustomMetricType {
  UNSPECIFIED = 'DATA_PROFILING_CUSTOM_METRIC_TYPE_UNSPECIFIED',
  AGGREGATE = 'DATA_PROFILING_CUSTOM_METRIC_TYPE_AGGREGATE',
  DERIVED = 'DATA_PROFILING_CUSTOM_METRIC_TYPE_DERIVED',
  DRIFT = 'DATA_PROFILING_CUSTOM_METRIC_TYPE_DRIFT',
}

export enum DataProfilingStatus {
  UNSPECIFIED = 'DATA_PROFILING_STATUS_UNSPECIFIED',
  ACTIVE = 'DATA_PROFILING_STATUS_ACTIVE',
  PENDING = 'DATA_PROFILING_STATUS_PENDING',
  DELETE_PENDING = 'DATA_PROFILING_STATUS_DELETE_PENDING',
  ERROR = 'DATA_PROFILING_STATUS_ERROR',
  FAILED = 'DATA_PROFILING_STATUS_FAILED',
}

export enum InferenceProblemType {
  UNSPECIFIED = 'INFERENCE_PROBLEM_TYPE_UNSPECIFIED',
  CLASSIFICATION = 'INFERENCE_PROBLEM_TYPE_CLASSIFICATION',
  REGRESSION = 'INFERENCE_PROBLEM_TYPE_REGRESSION',
}

export enum RefreshState {
  UNKNOWN = 'MONITOR_REFRESH_STATE_UNKNOWN',
  PENDING = 'MONITOR_REFRESH_STATE_PENDING',
  RUNNING = 'MONITOR_REFRESH_STATE_RUNNING',
  SUCCESS = 'MONITOR_REFRESH_STATE_SUCCESS',
  FAILED = 'MONITOR_REFRESH_STATE_FAILED',
  CANCELED = 'MONITOR_REFRESH_STATE_CANCELED',
}

export enum RefreshTrigger {
  UNKNOWN = 'MONITOR_REFRESH_TRIGGER_UNKNOWN',
  MANUAL = 'MONITOR_REFRESH_TRIGGER_MANUAL',
  SCHEDULE = 'MONITOR_REFRESH_TRIGGER_SCHEDULE',
  DATA_CHANGE = 'MONITOR_REFRESH_TRIGGER_DATA_CHANGE',
}

// ---------------------------------------------------------------------------
// Interfaces.
// ---------------------------------------------------------------------------

/** Anomaly Detection Configurations.. */
export interface AnomalyDetectionConfig {
  anomalyDetectionWorkflowId?: number | undefined;
  publishHealthIndicator?: boolean | undefined;
  jobType?: AnomalyDetectionJobType | undefined;
  excludedTableFullNames?: string[] | undefined;
  validityCheckConfigurations?: ValidityCheckConfiguration[] | undefined;
}

/** Request to cancel a refresh.. */
export interface CancelRefreshRequest {
  objectType: string;
  objectId: string;
  refreshId: number;
}

/** Response to cancelling a refresh.. */
export interface CancelRefreshResponse {
  refresh?: Refresh | undefined;
}

/** Request to create a Monitor.. */
export interface CreateMonitorRequest {
  monitor?: Monitor | undefined;
}

/** Request to create a refresh.. */
export interface CreateRefreshRequest {
  refresh?: Refresh | undefined;
}

/** The data quality monitoring workflow cron schedule.. */
export interface CronSchedule {
  quartzCronExpression?: string | undefined;
  timezoneId?: string | undefined;
  pauseStatus?: CronSchedulePauseStatus | undefined;
}

/** Data Profiling Configurations.. */
export interface DataProfilingConfig {
  outputSchemaId?: string | undefined;
  assetsDir?: string | undefined;
  inferenceLog?: InferenceLogConfig | undefined;
  timeSeries?: TimeSeriesConfig | undefined;
  snapshot?: SnapshotConfig | undefined;
  slicingExprs?: string[] | undefined;
  customMetrics?: DataProfilingCustomMetric[] | undefined;
  baselineTableName?: string | undefined;
  schedule?: CronSchedule | undefined;
  notificationSettings?: NotificationSettings | undefined;
  skipBuiltinDashboard?: boolean | undefined;
  warehouseId?: string | undefined;
  monitoredTableName?: string | undefined;
  status?: DataProfilingStatus | undefined;
  latestMonitorFailureMessage?: string | undefined;
  profileMetricsTableName?: string | undefined;
  driftMetricsTableName?: string | undefined;
  dashboardId?: string | undefined;
  monitorVersion?: number | undefined;
  effectiveWarehouseId?: string | undefined;
}

/** Custom metric definition.. */
export interface DataProfilingCustomMetric {
  name?: string | undefined;
  definition?: string | undefined;
  inputColumns?: string[] | undefined;
  outputDataType?: string | undefined;
  type?: DataProfilingCustomMetricType | undefined;
}

/** Request to delete a Monitor.. */
export interface DeleteMonitorRequest {
  objectType: string;
  objectId: string;
}

/** Request to delete a ronitor.. */
export interface DeleteRefreshRequest {
  objectType: string;
  objectId: string;
  refreshId: number;
}

/** Request to get a Monitor.. */
export interface GetMonitorRequest {
  objectType: string;
  objectId: string;
}

/** Request to get a refresh.. */
export interface GetRefreshRequest {
  objectType: string;
  objectId: string;
  refreshId: number;
}

/** Inference log configuration.. */
export interface InferenceLogConfig {
  problemType?: InferenceProblemType | undefined;
  timestampColumn?: string | undefined;
  granularities?: AggregationGranularity[] | undefined;
  predictionColumn?: string | undefined;
  labelColumn?: string | undefined;
  modelIdColumn?: string | undefined;
  predictionProbabilityColumn?: string | undefined;
}

/** Request to list Monitors.. */
export interface ListMonitorRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

/** Response for listing Monitors.. */
export interface ListMonitorResponse {
  monitors?: Monitor[] | undefined;
  nextPageToken?: string | undefined;
}

/** Request to list refreshes.. */
export interface ListRefreshRequest {
  objectType: string;
  objectId: string;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

/** Response for listing refreshes.. */
export interface ListRefreshResponse {
  refreshes?: Refresh[] | undefined;
  nextPageToken?: string | undefined;
}

/**
 * Monitor for the data quality of unity catalog entities such as schema or
 * table..
 */
export interface Monitor {
  objectType?: string | undefined;
  objectId?: string | undefined;
  anomalyDetectionConfig?: AnomalyDetectionConfig | undefined;
  dataProfilingConfig?: DataProfilingConfig | undefined;
}

/** Destination of the data quality monitoring notification.. */
export interface NotificationDestination {
  emailAddresses?: string[] | undefined;
}

/** Settings for sending notifications on the data quality monitoring.. */
export interface NotificationSettings {
  onFailure?: NotificationDestination | undefined;
}

export interface PercentNullValidityCheck {
  columnNames?: string[] | undefined;
  upperBound?: number | undefined;
}

export interface RangeValidityCheck {
  columnNames?: string[] | undefined;
  lowerBound?: number | undefined;
  upperBound?: number | undefined;
}

/**
 * The Refresh object gives information on a refresh of the data quality
 * monitoring pipeline..
 */
export interface Refresh {
  objectType?: string | undefined;
  objectId?: string | undefined;
  refreshId?: number | undefined;
  state?: RefreshState | undefined;
  message?: string | undefined;
  startTimeMs?: number | undefined;
  endTimeMs?: number | undefined;
  trigger?: RefreshTrigger | undefined;
}

/** Snapshot analysis configuration.. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SnapshotConfig {}

/** Time series analysis configuration.. */
export interface TimeSeriesConfig {
  timestampColumn?: string | undefined;
  granularities?: AggregationGranularity[] | undefined;
}

export interface UniquenessValidityCheck {
  columnNames?: string[] | undefined;
}

/** Request to update a Monitor.. */
export interface UpdateMonitorRequest {
  objectType: string;
  objectId: string;
  monitor?: Monitor | undefined;
  updateMask?: string | undefined;
}

/** Request to update a refresh.. */
export interface UpdateRefreshRequest {
  objectType: string;
  objectId: string;
  refreshId: number;
  refresh?: Refresh | undefined;
  updateMask?: string | undefined;
}

export interface ValidityCheckConfiguration {
  name?: string | undefined;
  percentNullValidityCheck?: PercentNullValidityCheck | undefined;
  rangeValidityCheck?: RangeValidityCheck | undefined;
  uniquenessValidityCheck?: UniquenessValidityCheck | undefined;
}

// ---------------------------------------------------------------------------
// Zod schemas for the wire format (snake_case JSON from the API).
//
// Each schema validates the snake_case wire format and transforms it into
// the camelCase TypeScript interface. This follows the same pattern as
// packages/databricks/src/apierror/details.ts.
// ---------------------------------------------------------------------------

const snapshotConfigSchema = z.object({});

const percentNullValidityCheckSchema = z
  .object({
    column_names: z.array(z.string()).optional(),
    upper_bound: z.number().optional(),
  })
  .transform(d => ({
    columnNames: d.column_names,
    upperBound: d.upper_bound,
  }));

const rangeValidityCheckSchema = z
  .object({
    column_names: z.array(z.string()).optional(),
    lower_bound: z.number().optional(),
    upper_bound: z.number().optional(),
  })
  .transform(d => ({
    columnNames: d.column_names,
    lowerBound: d.lower_bound,
    upperBound: d.upper_bound,
  }));

const uniquenessValidityCheckSchema = z
  .object({
    column_names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    columnNames: d.column_names,
  }));

const validityCheckConfigurationSchema = z
  .object({
    name: z.string().optional(),
    percent_null_validity_check: percentNullValidityCheckSchema.optional(),
    range_validity_check: rangeValidityCheckSchema.optional(),
    uniqueness_validity_check: uniquenessValidityCheckSchema.optional(),
  })
  .transform(d => ({
    name: d.name,
    percentNullValidityCheck: d.percent_null_validity_check,
    rangeValidityCheck: d.range_validity_check,
    uniquenessValidityCheck: d.uniqueness_validity_check,
  }));

const notificationDestinationSchema = z
  .object({
    email_addresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    emailAddresses: d.email_addresses,
  }));

const notificationSettingsSchema = z
  .object({
    on_failure: notificationDestinationSchema.optional(),
  })
  .transform(d => ({
    onFailure: d.on_failure,
  }));

const dataProfilingCustomMetricSchema = z
  .object({
    name: z.string().optional(),
    definition: z.string().optional(),
    input_columns: z.array(z.string()).optional(),
    output_data_type: z.string().optional(),
    type: z.enum(DataProfilingCustomMetricType).optional(),
  })
  .transform(d => ({
    name: d.name,
    definition: d.definition,
    inputColumns: d.input_columns,
    outputDataType: d.output_data_type,
    type: d.type,
  }));

const cronScheduleSchema = z
  .object({
    quartz_cron_expression: z.string().optional(),
    timezone_id: z.string().optional(),
    pause_status: z.enum(CronSchedulePauseStatus).optional(),
  })
  .transform(d => ({
    quartzCronExpression: d.quartz_cron_expression,
    timezoneId: d.timezone_id,
    pauseStatus: d.pause_status,
  }));

const inferenceLogConfigSchema = z
  .object({
    problem_type: z.enum(InferenceProblemType).optional(),
    timestamp_column: z.string().optional(),
    granularities: z.array(z.enum(AggregationGranularity)).optional(),
    prediction_column: z.string().optional(),
    label_column: z.string().optional(),
    model_id_column: z.string().optional(),
    prediction_probability_column: z.string().optional(),
  })
  .transform(d => ({
    problemType: d.problem_type,
    timestampColumn: d.timestamp_column,
    granularities: d.granularities,
    predictionColumn: d.prediction_column,
    labelColumn: d.label_column,
    modelIdColumn: d.model_id_column,
    predictionProbabilityColumn: d.prediction_probability_column,
  }));

const timeSeriesConfigSchema = z
  .object({
    timestamp_column: z.string().optional(),
    granularities: z.array(z.enum(AggregationGranularity)).optional(),
  })
  .transform(d => ({
    timestampColumn: d.timestamp_column,
    granularities: d.granularities,
  }));

const dataProfilingConfigSchema = z
  .object({
    output_schema_id: z.string().optional(),
    assets_dir: z.string().optional(),
    inference_log: inferenceLogConfigSchema.optional(),
    time_series: timeSeriesConfigSchema.optional(),
    snapshot: snapshotConfigSchema.optional(),
    slicing_exprs: z.array(z.string()).optional(),
    custom_metrics: z.array(dataProfilingCustomMetricSchema).optional(),
    baseline_table_name: z.string().optional(),
    schedule: cronScheduleSchema.optional(),
    notification_settings: notificationSettingsSchema.optional(),
    skip_builtin_dashboard: z.boolean().optional(),
    warehouse_id: z.string().optional(),
    monitored_table_name: z.string().optional(),
    status: z.enum(DataProfilingStatus).optional(),
    latest_monitor_failure_message: z.string().optional(),
    profile_metrics_table_name: z.string().optional(),
    drift_metrics_table_name: z.string().optional(),
    dashboard_id: z.string().optional(),
    monitor_version: z.number().optional(),
    effective_warehouse_id: z.string().optional(),
  })
  .transform(d => ({
    outputSchemaId: d.output_schema_id,
    assetsDir: d.assets_dir,
    inferenceLog: d.inference_log,
    timeSeries: d.time_series,
    snapshot: d.snapshot,
    slicingExprs: d.slicing_exprs,
    customMetrics: d.custom_metrics,
    baselineTableName: d.baseline_table_name,
    schedule: d.schedule,
    notificationSettings: d.notification_settings,
    skipBuiltinDashboard: d.skip_builtin_dashboard,
    warehouseId: d.warehouse_id,
    monitoredTableName: d.monitored_table_name,
    status: d.status,
    latestMonitorFailureMessage: d.latest_monitor_failure_message,
    profileMetricsTableName: d.profile_metrics_table_name,
    driftMetricsTableName: d.drift_metrics_table_name,
    dashboardId: d.dashboard_id,
    monitorVersion: d.monitor_version,
    effectiveWarehouseId: d.effective_warehouse_id,
  }));

const anomalyDetectionConfigSchema = z
  .object({
    anomaly_detection_workflow_id: z.number().optional(),
    publish_health_indicator: z.boolean().optional(),
    job_type: z.enum(AnomalyDetectionJobType).optional(),
    excluded_table_full_names: z.array(z.string()).optional(),
    validity_check_configurations: z
      .array(validityCheckConfigurationSchema)
      .optional(),
  })
  .transform(d => ({
    anomalyDetectionWorkflowId: d.anomaly_detection_workflow_id,
    publishHealthIndicator: d.publish_health_indicator,
    jobType: d.job_type,
    excludedTableFullNames: d.excluded_table_full_names,
    validityCheckConfigurations: d.validity_check_configurations,
  }));

export const monitorSchema = z
  .object({
    object_type: z.string().optional(),
    object_id: z.string().optional(),
    anomaly_detection_config: anomalyDetectionConfigSchema.optional(),
    data_profiling_config: dataProfilingConfigSchema.optional(),
  })
  .transform(d => ({
    objectType: d.object_type,
    objectId: d.object_id,
    anomalyDetectionConfig: d.anomaly_detection_config,
    dataProfilingConfig: d.data_profiling_config,
  }));

export const refreshSchema = z
  .object({
    object_type: z.string().optional(),
    object_id: z.string().optional(),
    refresh_id: z.number().optional(),
    state: z.enum(RefreshState).optional(),
    message: z.string().optional(),
    start_time_ms: z.number().optional(),
    end_time_ms: z.number().optional(),
    trigger: z.enum(RefreshTrigger).optional(),
  })
  .transform(d => ({
    objectType: d.object_type,
    objectId: d.object_id,
    refreshId: d.refresh_id,
    state: d.state,
    message: d.message,
    startTimeMs: d.start_time_ms,
    endTimeMs: d.end_time_ms,
    trigger: d.trigger,
  }));

export const cancelRefreshResponseSchema = z
  .object({
    refresh: refreshSchema.optional(),
  })
  .transform(d => ({
    refresh: d.refresh,
  }));

export const listMonitorResponseSchema = z
  .object({
    monitors: z.array(monitorSchema).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    monitors: d.monitors,
    nextPageToken: d.next_page_token,
  }));

export const listRefreshResponseSchema = z
  .object({
    refreshes: z.array(refreshSchema).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    refreshes: d.refreshes,
    nextPageToken: d.next_page_token,
  }));

// ---------------------------------------------------------------------------
// Marshal schemas (camelCase TypeScript -> snake_case wire format).
//
// These are the reverse of the unmarshal schemas above. They accept a
// camelCase object and produce the snake_case JSON the API expects.
// ---------------------------------------------------------------------------

const marshalSnapshotConfigSchema = z.object({});

const marshalPercentNullValidityCheckSchema = z
  .object({
    columnNames: z.array(z.string()).optional(),
    upperBound: z.number().optional(),
  })
  .transform(d => ({
    column_names: d.columnNames,
    upper_bound: d.upperBound,
  }));

const marshalRangeValidityCheckSchema = z
  .object({
    columnNames: z.array(z.string()).optional(),
    lowerBound: z.number().optional(),
    upperBound: z.number().optional(),
  })
  .transform(d => ({
    column_names: d.columnNames,
    lower_bound: d.lowerBound,
    upper_bound: d.upperBound,
  }));

const marshalUniquenessValidityCheckSchema = z
  .object({
    columnNames: z.array(z.string()).optional(),
  })
  .transform(d => ({
    column_names: d.columnNames,
  }));

const marshalValidityCheckConfigurationSchema = z
  .object({
    name: z.string().optional(),
    percentNullValidityCheck: marshalPercentNullValidityCheckSchema.optional(),
    rangeValidityCheck: marshalRangeValidityCheckSchema.optional(),
    uniquenessValidityCheck: marshalUniquenessValidityCheckSchema.optional(),
  })
  .transform(d => ({
    name: d.name,
    percent_null_validity_check: d.percentNullValidityCheck,
    range_validity_check: d.rangeValidityCheck,
    uniqueness_validity_check: d.uniquenessValidityCheck,
  }));

const marshalNotificationDestinationSchema = z
  .object({
    emailAddresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    email_addresses: d.emailAddresses,
  }));

const marshalNotificationSettingsSchema = z
  .object({
    onFailure: marshalNotificationDestinationSchema.optional(),
  })
  .transform(d => ({
    on_failure: d.onFailure,
  }));

const marshalDataProfilingCustomMetricSchema = z
  .object({
    name: z.string().optional(),
    definition: z.string().optional(),
    inputColumns: z.array(z.string()).optional(),
    outputDataType: z.string().optional(),
    type: z.enum(DataProfilingCustomMetricType).optional(),
  })
  .transform(d => ({
    name: d.name,
    definition: d.definition,
    input_columns: d.inputColumns,
    output_data_type: d.outputDataType,
    type: d.type,
  }));

const marshalCronScheduleSchema = z
  .object({
    quartzCronExpression: z.string().optional(),
    timezoneId: z.string().optional(),
    pauseStatus: z.enum(CronSchedulePauseStatus).optional(),
  })
  .transform(d => ({
    quartz_cron_expression: d.quartzCronExpression,
    timezone_id: d.timezoneId,
    pause_status: d.pauseStatus,
  }));

const marshalInferenceLogConfigSchema = z
  .object({
    problemType: z.enum(InferenceProblemType).optional(),
    timestampColumn: z.string().optional(),
    granularities: z.array(z.enum(AggregationGranularity)).optional(),
    predictionColumn: z.string().optional(),
    labelColumn: z.string().optional(),
    modelIdColumn: z.string().optional(),
    predictionProbabilityColumn: z.string().optional(),
  })
  .transform(d => ({
    problem_type: d.problemType,
    timestamp_column: d.timestampColumn,
    granularities: d.granularities,
    prediction_column: d.predictionColumn,
    label_column: d.labelColumn,
    model_id_column: d.modelIdColumn,
    prediction_probability_column: d.predictionProbabilityColumn,
  }));

const marshalTimeSeriesConfigSchema = z
  .object({
    timestampColumn: z.string().optional(),
    granularities: z.array(z.enum(AggregationGranularity)).optional(),
  })
  .transform(d => ({
    timestamp_column: d.timestampColumn,
    granularities: d.granularities,
  }));

const marshalDataProfilingConfigSchema = z
  .object({
    outputSchemaId: z.string().optional(),
    assetsDir: z.string().optional(),
    inferenceLog: marshalInferenceLogConfigSchema.optional(),
    timeSeries: marshalTimeSeriesConfigSchema.optional(),
    snapshot: marshalSnapshotConfigSchema.optional(),
    slicingExprs: z.array(z.string()).optional(),
    customMetrics: z.array(marshalDataProfilingCustomMetricSchema).optional(),
    baselineTableName: z.string().optional(),
    schedule: marshalCronScheduleSchema.optional(),
    notificationSettings: marshalNotificationSettingsSchema.optional(),
    skipBuiltinDashboard: z.boolean().optional(),
    warehouseId: z.string().optional(),
    monitoredTableName: z.string().optional(),
    status: z.enum(DataProfilingStatus).optional(),
    latestMonitorFailureMessage: z.string().optional(),
    profileMetricsTableName: z.string().optional(),
    driftMetricsTableName: z.string().optional(),
    dashboardId: z.string().optional(),
    monitorVersion: z.number().optional(),
    effectiveWarehouseId: z.string().optional(),
  })
  .transform(d => ({
    output_schema_id: d.outputSchemaId,
    assets_dir: d.assetsDir,
    inference_log: d.inferenceLog,
    time_series: d.timeSeries,
    snapshot: d.snapshot,
    slicing_exprs: d.slicingExprs,
    custom_metrics: d.customMetrics,
    baseline_table_name: d.baselineTableName,
    schedule: d.schedule,
    notification_settings: d.notificationSettings,
    skip_builtin_dashboard: d.skipBuiltinDashboard,
    warehouse_id: d.warehouseId,
    monitored_table_name: d.monitoredTableName,
    status: d.status,
    latest_monitor_failure_message: d.latestMonitorFailureMessage,
    profile_metrics_table_name: d.profileMetricsTableName,
    drift_metrics_table_name: d.driftMetricsTableName,
    dashboard_id: d.dashboardId,
    monitor_version: d.monitorVersion,
    effective_warehouse_id: d.effectiveWarehouseId,
  }));

const marshalAnomalyDetectionConfigSchema = z
  .object({
    anomalyDetectionWorkflowId: z.number().optional(),
    publishHealthIndicator: z.boolean().optional(),
    jobType: z.enum(AnomalyDetectionJobType).optional(),
    excludedTableFullNames: z.array(z.string()).optional(),
    validityCheckConfigurations: z
      .array(marshalValidityCheckConfigurationSchema)
      .optional(),
  })
  .transform(d => ({
    anomaly_detection_workflow_id: d.anomalyDetectionWorkflowId,
    publish_health_indicator: d.publishHealthIndicator,
    job_type: d.jobType,
    excluded_table_full_names: d.excludedTableFullNames,
    validity_check_configurations: d.validityCheckConfigurations,
  }));

export const marshalMonitorSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    anomalyDetectionConfig: marshalAnomalyDetectionConfigSchema.optional(),
    dataProfilingConfig: marshalDataProfilingConfigSchema.optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    anomaly_detection_config: d.anomalyDetectionConfig,
    data_profiling_config: d.dataProfilingConfig,
  }));

export const marshalRefreshSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    refreshId: z.number().optional(),
    state: z.enum(RefreshState).optional(),
    message: z.string().optional(),
    startTimeMs: z.number().optional(),
    endTimeMs: z.number().optional(),
    trigger: z.enum(RefreshTrigger).optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    refresh_id: d.refreshId,
    state: d.state,
    message: d.message,
    start_time_ms: d.startTimeMs,
    end_time_ms: d.endTimeMs,
    trigger: d.trigger,
  }));

export const marshalCancelRefreshRequestSchema = z
  .object({
    objectType: z.string(),
    objectId: z.string(),
    refreshId: z.number(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    refresh_id: d.refreshId,
  }));
