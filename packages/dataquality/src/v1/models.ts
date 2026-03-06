// Automatically generated. Do not edit.

/**  The granularity for aggregating data into time windows based on their timestamp.
 */
export type AggregationGranularity =
  | 'AGGREGATION_GRANULARITY_UNSPECIFIED'
  | 'AGGREGATION_GRANULARITY_5_MINUTES'
  | 'AGGREGATION_GRANULARITY_30_MINUTES'
  | 'AGGREGATION_GRANULARITY_1_HOUR'
  | 'AGGREGATION_GRANULARITY_1_DAY'
  | 'AGGREGATION_GRANULARITY_1_WEEK'
  | 'AGGREGATION_GRANULARITY_2_WEEKS'
  | 'AGGREGATION_GRANULARITY_3_WEEKS'
  | 'AGGREGATION_GRANULARITY_4_WEEKS'
  | 'AGGREGATION_GRANULARITY_1_MONTH'
  | 'AGGREGATION_GRANULARITY_1_YEAR';

/**  Anomaly Detection job type.
 */
export type AnomalyDetectionJobType =
  | 'ANOMALY_DETECTION_JOB_TYPE_UNSPECIFIED'
  | 'ANOMALY_DETECTION_JOB_TYPE_NORMAL'
  | 'ANOMALY_DETECTION_JOB_TYPE_INTERNAL_HIDDEN';

/**  The data quality monitoring workflow cron schedule pause status.
 */
export type CronSchedulePauseStatus =
  | 'CRON_SCHEDULE_PAUSE_STATUS_UNSPECIFIED'
  | 'CRON_SCHEDULE_PAUSE_STATUS_UNPAUSED'
  | 'CRON_SCHEDULE_PAUSE_STATUS_PAUSED';

/**  The custom metric type.
 */
export type DataProfilingCustomMetricType =
  | 'DATA_PROFILING_CUSTOM_METRIC_TYPE_UNSPECIFIED'
  | 'DATA_PROFILING_CUSTOM_METRIC_TYPE_AGGREGATE'
  | 'DATA_PROFILING_CUSTOM_METRIC_TYPE_DERIVED'
  | 'DATA_PROFILING_CUSTOM_METRIC_TYPE_DRIFT';

/**  The status of the data profiling monitor.
 */
export type DataProfilingStatus =
  | 'DATA_PROFILING_STATUS_UNSPECIFIED'
  | 'DATA_PROFILING_STATUS_ACTIVE'
  | 'DATA_PROFILING_STATUS_PENDING'
  | 'DATA_PROFILING_STATUS_DELETE_PENDING'
  | 'DATA_PROFILING_STATUS_ERROR'
  | 'DATA_PROFILING_STATUS_FAILED';

/**  Inference problem type the model aims to solve.
 */
export type InferenceProblemType =
  | 'INFERENCE_PROBLEM_TYPE_UNSPECIFIED'
  | 'INFERENCE_PROBLEM_TYPE_CLASSIFICATION'
  | 'INFERENCE_PROBLEM_TYPE_REGRESSION';

/**  The state of the refresh.
 */
export type RefreshState =
  | 'MONITOR_REFRESH_STATE_UNKNOWN'
  | 'MONITOR_REFRESH_STATE_PENDING'
  | 'MONITOR_REFRESH_STATE_RUNNING'
  | 'MONITOR_REFRESH_STATE_SUCCESS'
  | 'MONITOR_REFRESH_STATE_FAILED'
  | 'MONITOR_REFRESH_STATE_CANCELED';

/**  The trigger of the refresh.
 */
export type RefreshTrigger =
  | 'MONITOR_REFRESH_TRIGGER_UNKNOWN'
  | 'MONITOR_REFRESH_TRIGGER_MANUAL'
  | 'MONITOR_REFRESH_TRIGGER_SCHEDULE'
  | 'MONITOR_REFRESH_TRIGGER_DATA_CHANGE';

/**  Anomaly Detection Configurations.
 */
export interface AnomalyDetectionConfig {
  anomalyDetectionWorkflowId?: number;
  publishHealthIndicator?: boolean;
  jobType?: AnomalyDetectionJobType;
  excludedTableFullNames?: string[];
  validityCheckConfigurations?: ValidityCheckConfiguration[];
}

/**  Request to cancel a refresh.
 */
export interface CancelRefreshRequest {
  objectType?: string;
  objectId?: string;
  refreshId?: number;
}

/**  Response to cancelling a refresh.
 */
export interface CancelRefreshResponse {
  refresh?: Refresh;
}

/**  Request to create a Monitor.
 */
export interface CreateMonitorRequest {
  monitor?: Monitor;
}

/**  Request to create a refresh.
 */
export interface CreateRefreshRequest {
  refresh?: Refresh;
}

/**  The data quality monitoring workflow cron schedule.
 */
export interface CronSchedule {
  quartzCronExpression?: string;
  timezoneId?: string;
  pauseStatus?: CronSchedulePauseStatus;
}

/**  Data Profiling Configurations.
 */
export interface DataProfilingConfig {
  outputSchemaId?: string;
  assetsDir?: string;
  inferenceLog?: InferenceLogConfig;
  timeSeries?: TimeSeriesConfig;
  snapshot?: SnapshotConfig;
  slicingExprs?: string[];
  customMetrics?: DataProfilingCustomMetric[];
  baselineTableName?: string;
  schedule?: CronSchedule;
  notificationSettings?: NotificationSettings;
  skipBuiltinDashboard?: boolean;
  warehouseId?: string;
  monitoredTableName?: string;
  status?: DataProfilingStatus;
  latestMonitorFailureMessage?: string;
  profileMetricsTableName?: string;
  driftMetricsTableName?: string;
  dashboardId?: string;
  monitorVersion?: number;
  effectiveWarehouseId?: string;
}

/**  Custom metric definition.
 */
export interface DataProfilingCustomMetric {
  name?: string;
  definition?: string;
  inputColumns?: string[];
  outputDataType?: string;
  type?: DataProfilingCustomMetricType;
}

/**  Request to delete a Monitor.
 */
export interface DeleteMonitorRequest {
  objectType?: string;
  objectId?: string;
}

/**  Request to delete a ronitor.
 */
export interface DeleteRefreshRequest {
  objectType?: string;
  objectId?: string;
  refreshId?: number;
}

/**  Request to get a Monitor.
 */
export interface GetMonitorRequest {
  objectType?: string;
  objectId?: string;
}

/**  Request to get a refresh.
 */
export interface GetRefreshRequest {
  objectType?: string;
  objectId?: string;
  refreshId?: number;
}

/**  Inference log configuration.
 */
export interface InferenceLogConfig {
  problemType?: InferenceProblemType;
  timestampColumn?: string;
  granularities?: AggregationGranularity[];
  predictionColumn?: string;
  labelColumn?: string;
  modelIdColumn?: string;
  predictionProbabilityColumn?: string;
}

/**  Request to list Monitors.
 */
export interface ListMonitorRequest {
  pageToken?: string;
  pageSize?: number;
}

/**  Response for listing Monitors.
 */
export interface ListMonitorResponse {
  monitors?: Monitor[];
  nextPageToken?: string;
}

/**  Request to list refreshes.
 */
export interface ListRefreshRequest {
  objectType?: string;
  objectId?: string;
  pageToken?: string;
  pageSize?: number;
}

/**  Response for listing refreshes.
 */
export interface ListRefreshResponse {
  refreshes?: Refresh[];
  nextPageToken?: string;
}

/**  Monitor for the data quality of unity catalog entities such as schema or table.
 */
export interface Monitor {
  objectType?: string;
  objectId?: string;
  anomalyDetectionConfig?: AnomalyDetectionConfig;
  dataProfilingConfig?: DataProfilingConfig;
}

/**  Destination of the data quality monitoring notification.
 */
export interface NotificationDestination {
  emailAddresses?: string[];
}

/**  Settings for sending notifications on the data quality monitoring.
 */
export interface NotificationSettings {
  onFailure?: NotificationDestination;
}

export interface PercentNullValidityCheck {
  columnNames?: string[];
  upperBound?: number;
}

export interface RangeValidityCheck {
  columnNames?: string[];
  lowerBound?: number;
  upperBound?: number;
}

/**  The Refresh object gives information on a refresh of the data quality monitoring pipeline.
 */
export interface Refresh {
  objectType?: string;
  objectId?: string;
  refreshId?: number;
  state?: RefreshState;
  message?: string;
  startTimeMs?: number;
  endTimeMs?: number;
  trigger?: RefreshTrigger;
}

/**  Snapshot analysis configuration.
 */
export type SnapshotConfig = Record<string, never>;

/**  Time series analysis configuration.
 */
export interface TimeSeriesConfig {
  timestampColumn?: string;
  granularities?: AggregationGranularity[];
}

export interface UniquenessValidityCheck {
  columnNames?: string[];
}

/**  Request to update a Monitor.
 */
export interface UpdateMonitorRequest {
  objectType?: string;
  objectId?: string;
  monitor?: Monitor;
  updateMask?: string;
}

/**  Request to update a refresh.
 */
export interface UpdateRefreshRequest {
  objectType?: string;
  objectId?: string;
  refreshId?: number;
  refresh?: Refresh;
  updateMask?: string;
}

export interface ValidityCheckConfiguration {
  name?: string;
  percentNullValidityCheck?: PercentNullValidityCheck;
  rangeValidityCheck?: RangeValidityCheck;
  uniquenessValidityCheck?: UniquenessValidityCheck;
}
