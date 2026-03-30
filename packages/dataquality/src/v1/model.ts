// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.
import {z} from 'zod';

/** The granularity for aggregating data into time windows based on their timestamp. */
export enum AggregationGranularity {
  AGGREGATION_GRANULARITY_UNSPECIFIED = 'AGGREGATION_GRANULARITY_UNSPECIFIED',
  /** 5 minutes. */
  AGGREGATION_GRANULARITY_5_MINUTES = 'AGGREGATION_GRANULARITY_5_MINUTES',
  /** 30 minutes. */
  AGGREGATION_GRANULARITY_30_MINUTES = 'AGGREGATION_GRANULARITY_30_MINUTES',
  /** 1 hour. */
  AGGREGATION_GRANULARITY_1_HOUR = 'AGGREGATION_GRANULARITY_1_HOUR',
  /** 1 day. */
  AGGREGATION_GRANULARITY_1_DAY = 'AGGREGATION_GRANULARITY_1_DAY',
  /** 1 week. */
  AGGREGATION_GRANULARITY_1_WEEK = 'AGGREGATION_GRANULARITY_1_WEEK',
  /** 2 weeks. */
  AGGREGATION_GRANULARITY_2_WEEKS = 'AGGREGATION_GRANULARITY_2_WEEKS',
  /** 3 weeks. */
  AGGREGATION_GRANULARITY_3_WEEKS = 'AGGREGATION_GRANULARITY_3_WEEKS',
  /** 4 weeks. */
  AGGREGATION_GRANULARITY_4_WEEKS = 'AGGREGATION_GRANULARITY_4_WEEKS',
  /** 1 month. */
  AGGREGATION_GRANULARITY_1_MONTH = 'AGGREGATION_GRANULARITY_1_MONTH',
  /** 1 year. */
  AGGREGATION_GRANULARITY_1_YEAR = 'AGGREGATION_GRANULARITY_1_YEAR',
}

/** Anomaly Detection job type. */
export enum AnomalyDetectionJobType {
  ANOMALY_DETECTION_JOB_TYPE_UNSPECIFIED = 'ANOMALY_DETECTION_JOB_TYPE_UNSPECIFIED',
  ANOMALY_DETECTION_JOB_TYPE_NORMAL = 'ANOMALY_DETECTION_JOB_TYPE_NORMAL',
  ANOMALY_DETECTION_JOB_TYPE_INTERNAL_HIDDEN = 'ANOMALY_DETECTION_JOB_TYPE_INTERNAL_HIDDEN',
}

/** The data quality monitoring workflow cron schedule pause status. */
export enum CronSchedulePauseStatus {
  CRON_SCHEDULE_PAUSE_STATUS_UNSPECIFIED = 'CRON_SCHEDULE_PAUSE_STATUS_UNSPECIFIED',
  /** The cron schedule is not paused. */
  CRON_SCHEDULE_PAUSE_STATUS_UNPAUSED = 'CRON_SCHEDULE_PAUSE_STATUS_UNPAUSED',
  /** The cron schedule is paused. */
  CRON_SCHEDULE_PAUSE_STATUS_PAUSED = 'CRON_SCHEDULE_PAUSE_STATUS_PAUSED',
}

/** The custom metric type. */
export enum DataProfilingCustomMetricType {
  DATA_PROFILING_CUSTOM_METRIC_TYPE_UNSPECIFIED = 'DATA_PROFILING_CUSTOM_METRIC_TYPE_UNSPECIFIED',
  /** Only depend on the existing columns in the table. */
  DATA_PROFILING_CUSTOM_METRIC_TYPE_AGGREGATE = 'DATA_PROFILING_CUSTOM_METRIC_TYPE_AGGREGATE',
  /** Only depend on previously computed aggregate metrics. */
  DATA_PROFILING_CUSTOM_METRIC_TYPE_DERIVED = 'DATA_PROFILING_CUSTOM_METRIC_TYPE_DERIVED',
  /** Depend on previously computed aggregate or derived metrics. */
  DATA_PROFILING_CUSTOM_METRIC_TYPE_DRIFT = 'DATA_PROFILING_CUSTOM_METRIC_TYPE_DRIFT',
}

/** The status of the data profiling monitor. */
export enum DataProfilingStatus {
  DATA_PROFILING_STATUS_UNSPECIFIED = 'DATA_PROFILING_STATUS_UNSPECIFIED',
  DATA_PROFILING_STATUS_ACTIVE = 'DATA_PROFILING_STATUS_ACTIVE',
  DATA_PROFILING_STATUS_PENDING = 'DATA_PROFILING_STATUS_PENDING',
  DATA_PROFILING_STATUS_DELETE_PENDING = 'DATA_PROFILING_STATUS_DELETE_PENDING',
  DATA_PROFILING_STATUS_ERROR = 'DATA_PROFILING_STATUS_ERROR',
  DATA_PROFILING_STATUS_FAILED = 'DATA_PROFILING_STATUS_FAILED',
}

/** Inference problem type the model aims to solve. */
export enum InferenceProblemType {
  INFERENCE_PROBLEM_TYPE_UNSPECIFIED = 'INFERENCE_PROBLEM_TYPE_UNSPECIFIED',
  /** Classification inference problem. */
  INFERENCE_PROBLEM_TYPE_CLASSIFICATION = 'INFERENCE_PROBLEM_TYPE_CLASSIFICATION',
  /** Regression inference problem. */
  INFERENCE_PROBLEM_TYPE_REGRESSION = 'INFERENCE_PROBLEM_TYPE_REGRESSION',
}

/** The state of the refresh. */
export enum RefreshState {
  MONITOR_REFRESH_STATE_UNKNOWN = 'MONITOR_REFRESH_STATE_UNKNOWN',
  /** The refresh is pending. */
  MONITOR_REFRESH_STATE_PENDING = 'MONITOR_REFRESH_STATE_PENDING',
  /** The refresh is running. */
  MONITOR_REFRESH_STATE_RUNNING = 'MONITOR_REFRESH_STATE_RUNNING',
  /** The refresh is successful. */
  MONITOR_REFRESH_STATE_SUCCESS = 'MONITOR_REFRESH_STATE_SUCCESS',
  /** The refresh has failed. */
  MONITOR_REFRESH_STATE_FAILED = 'MONITOR_REFRESH_STATE_FAILED',
  /** The refresh is cancelled. */
  MONITOR_REFRESH_STATE_CANCELED = 'MONITOR_REFRESH_STATE_CANCELED',
}

/** The trigger of the refresh. */
export enum RefreshTrigger {
  MONITOR_REFRESH_TRIGGER_UNKNOWN = 'MONITOR_REFRESH_TRIGGER_UNKNOWN',
  /** The refresh has been triggered manually. */
  MONITOR_REFRESH_TRIGGER_MANUAL = 'MONITOR_REFRESH_TRIGGER_MANUAL',
  /** The refresh has been triggered from a schedule. */
  MONITOR_REFRESH_TRIGGER_SCHEDULE = 'MONITOR_REFRESH_TRIGGER_SCHEDULE',
  /** The refresh has been triggered from a data change. */
  MONITOR_REFRESH_TRIGGER_DATA_CHANGE = 'MONITOR_REFRESH_TRIGGER_DATA_CHANGE',
}

/** Anomaly Detection Configurations. */
export interface AnomalyDetectionConfig {
  /**
   * The id of the workflow that detects the anomaly.
   * This field will only be returned in the Get/Update response, if the request comes from
   * the workspace where this anomaly detection job is created.
   */
  anomalyDetectionWorkflowId?: number | undefined;
  /** If the health indicator should be shown. */
  publishHealthIndicator?: boolean | undefined;
  /** The type of the last run of the workflow. */
  jobType?: AnomalyDetectionJobType | undefined;
  /** List of fully qualified table names to exclude from anomaly detection. */
  excludedTableFullNames?: string[] | undefined;
  /** Validity check configurations for anomaly detection. */
  validityCheckConfigurations?: ValidityCheckConfiguration[] | undefined;
}

/** Request to cancel a refresh. */
export interface CancelRefreshRequest {
  /** The type of the monitored object. Can be one of the following: `schema` or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
  /** Unique id of the refresh operation. */
  refreshId?: number | undefined;
}

/** Response to cancelling a refresh. */
export interface CancelRefreshResponse {
  /** The refresh to cancel. */
  refresh?: Refresh | undefined;
}

/** Request to create a Monitor. */
export interface CreateMonitorRequest {
  /** The monitor to create. */
  monitor?: Monitor | undefined;
}

/** Request to create a refresh. */
export interface CreateRefreshRequest {
  /** The refresh to create */
  refresh?: Refresh | undefined;
}

/** The data quality monitoring workflow cron schedule. */
export interface CronSchedule {
  /** The expression that determines when to run the monitor. See [examples](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html). */
  quartzCronExpression?: string | undefined;
  /**
   * A Java timezone id. The schedule for a job will be resolved with respect to this timezone.
   * See `Java TimeZone <http://docs.oracle.com/javase/7/docs/api/java/util/TimeZone.html>`_ for details.
   * The timezone id (e.g., ``America/Los_Angeles``) in which to evaluate the quartz expression.
   */
  timezoneId?: string | undefined;
  /** Read only field that indicates whether the schedule is paused or not. */
  pauseStatus?: CronSchedulePauseStatus | undefined;
}

/** Data Profiling Configurations. */
export interface DataProfilingConfig {
  /** ID of the schema where output tables are created. */
  outputSchemaId?: string | undefined;
  /**
   * Field for specifying the absolute path to a custom directory to store data-monitoring
   * assets. Normally prepopulated to a default user location via UI and Python APIs.
   */
  assetsDir?: string | undefined;
  /** `Analysis Configuration` for monitoring inference log tables. */
  inferenceLog?: InferenceLogConfig | undefined;
  /** `Analysis Configuration` for monitoring time series tables. */
  timeSeries?: TimeSeriesConfig | undefined;
  /** `Analysis Configuration` for monitoring snapshot tables. */
  snapshot?: SnapshotConfig | undefined;
  /**
   * List of column expressions to slice data with for targeted analysis. The data is grouped by
   * each expression independently, resulting in a separate slice for each predicate and its
   * complements. For example `slicing_exprs=[“col_1”, “col_2 > 10”]` will generate the following
   * slices: two slices for `col_2 > 10` (True and False), and one slice per unique value in
   * `col1`. For high-cardinality columns, only the top 100 unique values by frequency will
   * generate slices.
   */
  slicingExprs?: string[] | undefined;
  /** Custom metrics. */
  customMetrics?: DataProfilingCustomMetric[] | undefined;
  /**
   * Baseline table name.
   * Baseline data is used to compute drift from the data in the monitored `table_name`.
   * The baseline table and the monitored table shall have the same schema.
   */
  baselineTableName?: string | undefined;
  /** The cron schedule. */
  schedule?: CronSchedule | undefined;
  /** Field for specifying notification settings. */
  notificationSettings?: NotificationSettings | undefined;
  /** Whether to skip creating a default dashboard summarizing data quality metrics. */
  skipBuiltinDashboard?: boolean | undefined;
  /**
   * Optional argument to specify the warehouse for dashboard creation. If not specified, the first running
   * warehouse will be used.
   */
  warehouseId?: string | undefined;
  /** Unity Catalog table to monitor. Format: `catalog.schema.table_name` */
  monitoredTableName?: string | undefined;
  /** The data profiling monitor status. */
  status?: DataProfilingStatus | undefined;
  /** The latest error message for a monitor failure. */
  latestMonitorFailureMessage?: string | undefined;
  /** Table that stores profile metrics data. Format: `catalog.schema.table_name`. */
  profileMetricsTableName?: string | undefined;
  /** Table that stores drift metrics data. Format: `catalog.schema.table_name`. */
  driftMetricsTableName?: string | undefined;
  /**
   * Id of dashboard that visualizes the computed metrics.
   * This can be empty if the monitor is in PENDING state.
   */
  dashboardId?: string | undefined;
  /**
   * Represents the current monitor configuration version in use. The version will be represented in a
   * numeric fashion (1,2,3...). The field has flexibility to take on negative values, which can indicate corrupted
   * monitor_version numbers.
   */
  monitorVersion?: number | undefined;
  /** The warehouse for dashboard creation */
  effectiveWarehouseId?: string | undefined;
}

/** Custom metric definition. */
export interface DataProfilingCustomMetric {
  /** Name of the metric in the output tables. */
  name?: string | undefined;
  /** Jinja template for a SQL expression that specifies how to compute the metric. See [create metric definition](https://docs.databricks.com/en/lakehouse-monitoring/custom-metrics.html#create-definition). */
  definition?: string | undefined;
  /**
   * A list of column names in the input table the metric should be computed for.
   * Can use ``":table"`` to indicate that the metric needs information from multiple columns.
   */
  inputColumns?: string[] | undefined;
  /** The output type of the custom metric. */
  outputDataType?: string | undefined;
  /** The type of the custom metric. */
  type?: DataProfilingCustomMetricType | undefined;
}

/** Request to delete a Monitor. */
export interface DeleteMonitorRequest {
  /** The type of the monitored object. Can be one of the following: `schema` or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
}

/** Request to delete a ronitor. */
export interface DeleteRefreshRequest {
  /** The type of the monitored object. Can be one of the following: `schema` or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
  /** Unique id of the refresh operation. */
  refreshId?: number | undefined;
}

/** Request to get a Monitor. */
export interface GetMonitorRequest {
  /** The type of the monitored object. Can be one of the following: `schema` or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
}

/** Request to get a refresh. */
export interface GetRefreshRequest {
  /** The type of the monitored object. Can be one of the following: `schema` or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
  /** Unique id of the refresh operation. */
  refreshId?: number | undefined;
}

/** Inference log configuration. */
export interface InferenceLogConfig {
  /** Problem type the model aims to solve. */
  problemType?: InferenceProblemType | undefined;
  /** Column for the timestamp. */
  timestampColumn?: string | undefined;
  /** List of granularities to use when aggregating data into time windows based on their timestamp. */
  granularities?: AggregationGranularity[] | undefined;
  /** Column for the prediction. */
  predictionColumn?: string | undefined;
  /** Column for the label. */
  labelColumn?: string | undefined;
  /** Column for the model identifier. */
  modelIdColumn?: string | undefined;
  /** Column for prediction probabilities */
  predictionProbabilityColumn?: string | undefined;
}

/** Request to list Monitors. */
export interface ListMonitorRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

/** Response for listing Monitors. */
export interface ListMonitorResponse {
  monitors?: Monitor[] | undefined;
  nextPageToken?: string | undefined;
}

/** Request to list refreshes. */
export interface ListRefreshRequest {
  /** The type of the monitored object. Can be one of the following: `schema` or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

/** Response for listing refreshes. */
export interface ListRefreshResponse {
  refreshes?: Refresh[] | undefined;
  nextPageToken?: string | undefined;
}

/** Monitor for the data quality of unity catalog entities such as schema or table. */
export interface Monitor {
  /** The type of the monitored object. Can be one of the following: `schema` or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
  /** Anomaly Detection Configuration, applicable to `schema` object types. */
  anomalyDetectionConfig?: AnomalyDetectionConfig | undefined;
  /**
   * Data Profiling Configuration, applicable to `table` object types. Exactly one `Analysis Configuration`
   * must be present.
   */
  dataProfilingConfig?: DataProfilingConfig | undefined;
}

/** Destination of the data quality monitoring notification. */
export interface NotificationDestination {
  /** The list of email addresses to send the notification to. A maximum of 5 email addresses is supported. */
  emailAddresses?: string[] | undefined;
}

/** Settings for sending notifications on the data quality monitoring. */
export interface NotificationSettings {
  /** Destinations to send notifications on failure/timeout. */
  onFailure?: NotificationDestination | undefined;
}

export interface PercentNullValidityCheck {
  /** List of column names to check for null percentage */
  columnNames?: string[] | undefined;
  /** Optional upper bound; we should use auto determined bounds for now */
  upperBound?: number | undefined;
}

export interface RangeValidityCheck {
  /** List of column names to check for range validity */
  columnNames?: string[] | undefined;
  /** Lower bound for the range */
  lowerBound?: number | undefined;
  /** Upper bound for the range */
  upperBound?: number | undefined;
}

/** The Refresh object gives information on a refresh of the data quality monitoring pipeline. */
export interface Refresh {
  /** The type of the monitored object. Can be one of the following: `schema`or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
  /** Unique id of the refresh operation. */
  refreshId?: number | undefined;
  /** The current state of the refresh. */
  state?: RefreshState | undefined;
  /** An optional message to give insight into the current state of the refresh (e.g. FAILURE messages). */
  message?: string | undefined;
  /** Time when the refresh started (milliseconds since 1/1/1970 UTC). */
  startTimeMs?: number | undefined;
  /** Time when the refresh ended (milliseconds since 1/1/1970 UTC). */
  endTimeMs?: number | undefined;
  /** What triggered the refresh. */
  trigger?: RefreshTrigger | undefined;
}

/** Snapshot analysis configuration. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SnapshotConfig {}

/** Time series analysis configuration. */
export interface TimeSeriesConfig {
  /** Column for the timestamp. */
  timestampColumn?: string | undefined;
  /** List of granularities to use when aggregating data into time windows based on their timestamp. */
  granularities?: AggregationGranularity[] | undefined;
}

export interface UniquenessValidityCheck {
  /** List of column names to check for uniqueness */
  columnNames?: string[] | undefined;
}

/** Request to update a Monitor. */
export interface UpdateMonitorRequest {
  /** The type of the monitored object. Can be one of the following: `schema` or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
  /** The monitor to update. */
  monitor?: Monitor | undefined;
  /**
   * The field mask to specify which fields to update as a comma-separated list.
   * Example value: `data_profiling_config.custom_metrics,data_profiling_config.schedule.quartz_cron_expression`
   */
  updateMask?: string | undefined;
}

/** Request to update a refresh. */
export interface UpdateRefreshRequest {
  /** The type of the monitored object. Can be one of the following: `schema` or `table`. */
  objectType?: string | undefined;
  /**
   * The UUID of the request object. It is `schema_id` for `schema`, and `table_id` for `table`.
   *
   * Find the `schema_id` from either:
   * 1. The [schema_id](https://docs.databricks.com/api/workspace/schemas/get#schema_id) of the `Schemas` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `schema` > go to the `Details` tab > the `Schema ID` field.
   *
   * Find the `table_id` from either:
   * 1. The [table_id](https://docs.databricks.com/api/workspace/tables/get#table_id) of the `Tables` resource.
   * 2. In [Catalog Explorer](https://docs.databricks.com/aws/en/catalog-explorer/) > select the `table` > go to the `Details` tab > the `Table ID` field.
   */
  objectId?: string | undefined;
  /** Unique id of the refresh operation. */
  refreshId?: number | undefined;
  /** The refresh to update. */
  refresh?: Refresh | undefined;
  /** The field mask to specify which fields to update. */
  updateMask?: string | undefined;
}

export interface ValidityCheckConfiguration {
  /** Can be set by system. Does not need to be user facing. */
  name?: string | undefined;
  percentNullValidityCheck?: PercentNullValidityCheck | undefined;
  rangeValidityCheck?: RangeValidityCheck | undefined;
  uniquenessValidityCheck?: UniquenessValidityCheck | undefined;
}

export const unmarshalAnomalyDetectionConfigSchema: z.ZodType<AnomalyDetectionConfig> =
  z
    .object({
      anomaly_detection_workflow_id: z.number().optional(),
      publish_health_indicator: z.boolean().optional(),
      job_type: z.enum(AnomalyDetectionJobType).optional(),
      excluded_table_full_names: z.array(z.string()).optional(),
      validity_check_configurations: z
        .array(z.lazy(() => unmarshalValidityCheckConfigurationSchema))
        .optional(),
    })
    .transform(d => ({
      anomalyDetectionWorkflowId: d.anomaly_detection_workflow_id,
      publishHealthIndicator: d.publish_health_indicator,
      jobType: d.job_type,
      excludedTableFullNames: d.excluded_table_full_names,
      validityCheckConfigurations: d.validity_check_configurations,
    }));

export const unmarshalCancelRefreshRequestSchema: z.ZodType<CancelRefreshRequest> =
  z
    .object({
      object_type: z.string().optional(),
      object_id: z.string().optional(),
      refresh_id: z.number().optional(),
    })
    .transform(d => ({
      objectType: d.object_type,
      objectId: d.object_id,
      refreshId: d.refresh_id,
    }));

export const unmarshalCancelRefreshResponseSchema: z.ZodType<CancelRefreshResponse> =
  z
    .object({
      refresh: z.lazy(() => unmarshalRefreshSchema).optional(),
    })
    .transform(d => ({
      refresh: d.refresh,
    }));

export const unmarshalCreateMonitorRequestSchema: z.ZodType<CreateMonitorRequest> =
  z
    .object({
      monitor: z.lazy(() => unmarshalMonitorSchema).optional(),
    })
    .transform(d => ({
      monitor: d.monitor,
    }));

export const unmarshalCreateRefreshRequestSchema: z.ZodType<CreateRefreshRequest> =
  z
    .object({
      refresh: z.lazy(() => unmarshalRefreshSchema).optional(),
    })
    .transform(d => ({
      refresh: d.refresh,
    }));

export const unmarshalCronScheduleSchema: z.ZodType<CronSchedule> = z
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

export const unmarshalDataProfilingConfigSchema: z.ZodType<DataProfilingConfig> =
  z
    .object({
      output_schema_id: z.string().optional(),
      assets_dir: z.string().optional(),
      inference_log: z.lazy(() => unmarshalInferenceLogConfigSchema).optional(),
      time_series: z.lazy(() => unmarshalTimeSeriesConfigSchema).optional(),
      snapshot: z.lazy(() => unmarshalSnapshotConfigSchema).optional(),
      slicing_exprs: z.array(z.string()).optional(),
      custom_metrics: z
        .array(z.lazy(() => unmarshalDataProfilingCustomMetricSchema))
        .optional(),
      baseline_table_name: z.string().optional(),
      schedule: z.lazy(() => unmarshalCronScheduleSchema).optional(),
      notification_settings: z
        .lazy(() => unmarshalNotificationSettingsSchema)
        .optional(),
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

export const unmarshalDataProfilingCustomMetricSchema: z.ZodType<DataProfilingCustomMetric> =
  z
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

export const unmarshalDeleteMonitorRequestSchema: z.ZodType<DeleteMonitorRequest> =
  z
    .object({
      object_type: z.string().optional(),
      object_id: z.string().optional(),
    })
    .transform(d => ({
      objectType: d.object_type,
      objectId: d.object_id,
    }));

export const unmarshalDeleteRefreshRequestSchema: z.ZodType<DeleteRefreshRequest> =
  z
    .object({
      object_type: z.string().optional(),
      object_id: z.string().optional(),
      refresh_id: z.number().optional(),
    })
    .transform(d => ({
      objectType: d.object_type,
      objectId: d.object_id,
      refreshId: d.refresh_id,
    }));

export const unmarshalGetMonitorRequestSchema: z.ZodType<GetMonitorRequest> = z
  .object({
    object_type: z.string().optional(),
    object_id: z.string().optional(),
  })
  .transform(d => ({
    objectType: d.object_type,
    objectId: d.object_id,
  }));

export const unmarshalGetRefreshRequestSchema: z.ZodType<GetRefreshRequest> = z
  .object({
    object_type: z.string().optional(),
    object_id: z.string().optional(),
    refresh_id: z.number().optional(),
  })
  .transform(d => ({
    objectType: d.object_type,
    objectId: d.object_id,
    refreshId: d.refresh_id,
  }));

export const unmarshalInferenceLogConfigSchema: z.ZodType<InferenceLogConfig> =
  z
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

export const unmarshalListMonitorRequestSchema: z.ZodType<ListMonitorRequest> =
  z
    .object({
      page_token: z.string().optional(),
      page_size: z.number().optional(),
    })
    .transform(d => ({
      pageToken: d.page_token,
      pageSize: d.page_size,
    }));

export const unmarshalListMonitorResponseSchema: z.ZodType<ListMonitorResponse> =
  z
    .object({
      monitors: z.array(z.lazy(() => unmarshalMonitorSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      monitors: d.monitors,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListRefreshRequestSchema: z.ZodType<ListRefreshRequest> =
  z
    .object({
      object_type: z.string().optional(),
      object_id: z.string().optional(),
      page_token: z.string().optional(),
      page_size: z.number().optional(),
    })
    .transform(d => ({
      objectType: d.object_type,
      objectId: d.object_id,
      pageToken: d.page_token,
      pageSize: d.page_size,
    }));

export const unmarshalListRefreshResponseSchema: z.ZodType<ListRefreshResponse> =
  z
    .object({
      refreshes: z.array(z.lazy(() => unmarshalRefreshSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      refreshes: d.refreshes,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMonitorSchema: z.ZodType<Monitor> = z
  .object({
    object_type: z.string().optional(),
    object_id: z.string().optional(),
    anomaly_detection_config: z
      .lazy(() => unmarshalAnomalyDetectionConfigSchema)
      .optional(),
    data_profiling_config: z
      .lazy(() => unmarshalDataProfilingConfigSchema)
      .optional(),
  })
  .transform(d => ({
    objectType: d.object_type,
    objectId: d.object_id,
    anomalyDetectionConfig: d.anomaly_detection_config,
    dataProfilingConfig: d.data_profiling_config,
  }));

export const unmarshalNotificationDestinationSchema: z.ZodType<NotificationDestination> =
  z
    .object({
      email_addresses: z.array(z.string()).optional(),
    })
    .transform(d => ({
      emailAddresses: d.email_addresses,
    }));

export const unmarshalNotificationSettingsSchema: z.ZodType<NotificationSettings> =
  z
    .object({
      on_failure: z
        .lazy(() => unmarshalNotificationDestinationSchema)
        .optional(),
    })
    .transform(d => ({
      onFailure: d.on_failure,
    }));

export const unmarshalPercentNullValidityCheckSchema: z.ZodType<PercentNullValidityCheck> =
  z
    .object({
      column_names: z.array(z.string()).optional(),
      upper_bound: z.number().optional(),
    })
    .transform(d => ({
      columnNames: d.column_names,
      upperBound: d.upper_bound,
    }));

export const unmarshalRangeValidityCheckSchema: z.ZodType<RangeValidityCheck> =
  z
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

export const unmarshalRefreshSchema: z.ZodType<Refresh> = z
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

export const unmarshalSnapshotConfigSchema: z.ZodType<SnapshotConfig> =
  z.object({});

export const unmarshalTimeSeriesConfigSchema: z.ZodType<TimeSeriesConfig> = z
  .object({
    timestamp_column: z.string().optional(),
    granularities: z.array(z.enum(AggregationGranularity)).optional(),
  })
  .transform(d => ({
    timestampColumn: d.timestamp_column,
    granularities: d.granularities,
  }));

export const unmarshalUniquenessValidityCheckSchema: z.ZodType<UniquenessValidityCheck> =
  z
    .object({
      column_names: z.array(z.string()).optional(),
    })
    .transform(d => ({
      columnNames: d.column_names,
    }));

export const unmarshalUpdateMonitorRequestSchema: z.ZodType<UpdateMonitorRequest> =
  z
    .object({
      object_type: z.string().optional(),
      object_id: z.string().optional(),
      monitor: z.lazy(() => unmarshalMonitorSchema).optional(),
      update_mask: z.string().optional(),
    })
    .transform(d => ({
      objectType: d.object_type,
      objectId: d.object_id,
      monitor: d.monitor,
      updateMask: d.update_mask,
    }));

export const unmarshalUpdateRefreshRequestSchema: z.ZodType<UpdateRefreshRequest> =
  z
    .object({
      object_type: z.string().optional(),
      object_id: z.string().optional(),
      refresh_id: z.number().optional(),
      refresh: z.lazy(() => unmarshalRefreshSchema).optional(),
      update_mask: z.string().optional(),
    })
    .transform(d => ({
      objectType: d.object_type,
      objectId: d.object_id,
      refreshId: d.refresh_id,
      refresh: d.refresh,
      updateMask: d.update_mask,
    }));

export const unmarshalValidityCheckConfigurationSchema: z.ZodType<ValidityCheckConfiguration> =
  z
    .object({
      name: z.string().optional(),
      percent_null_validity_check: z
        .lazy(() => unmarshalPercentNullValidityCheckSchema)
        .optional(),
      range_validity_check: z
        .lazy(() => unmarshalRangeValidityCheckSchema)
        .optional(),
      uniqueness_validity_check: z
        .lazy(() => unmarshalUniquenessValidityCheckSchema)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      percentNullValidityCheck: d.percent_null_validity_check,
      rangeValidityCheck: d.range_validity_check,
      uniquenessValidityCheck: d.uniqueness_validity_check,
    }));

export const marshalAnomalyDetectionConfigSchema = z
  .object({
    anomalyDetectionWorkflowId: z.number().optional(),
    publishHealthIndicator: z.boolean().optional(),
    jobType: z.enum(AnomalyDetectionJobType).optional(),
    excludedTableFullNames: z.array(z.string()).optional(),
    validityCheckConfigurations: z
      .array(z.lazy(() => marshalValidityCheckConfigurationSchema))
      .optional(),
  })
  .transform(d => ({
    anomaly_detection_workflow_id: d.anomalyDetectionWorkflowId,
    publish_health_indicator: d.publishHealthIndicator,
    job_type: d.jobType,
    excluded_table_full_names: d.excludedTableFullNames,
    validity_check_configurations: d.validityCheckConfigurations,
  }));

export const marshalCancelRefreshRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    refreshId: z.number().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    refresh_id: d.refreshId,
  }));

export const marshalCancelRefreshResponseSchema = z
  .object({
    refresh: z.lazy(() => marshalRefreshSchema).optional(),
  })
  .transform(d => ({
    refresh: d.refresh,
  }));

export const marshalCreateMonitorRequestSchema = z
  .object({
    monitor: z.lazy(() => marshalMonitorSchema).optional(),
  })
  .transform(d => ({
    monitor: d.monitor,
  }));

export const marshalCreateRefreshRequestSchema = z
  .object({
    refresh: z.lazy(() => marshalRefreshSchema).optional(),
  })
  .transform(d => ({
    refresh: d.refresh,
  }));

export const marshalCronScheduleSchema = z
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

export const marshalDataProfilingConfigSchema = z
  .object({
    outputSchemaId: z.string().optional(),
    assetsDir: z.string().optional(),
    inferenceLog: z.lazy(() => marshalInferenceLogConfigSchema).optional(),
    timeSeries: z.lazy(() => marshalTimeSeriesConfigSchema).optional(),
    snapshot: z.lazy(() => marshalSnapshotConfigSchema).optional(),
    slicingExprs: z.array(z.string()).optional(),
    customMetrics: z
      .array(z.lazy(() => marshalDataProfilingCustomMetricSchema))
      .optional(),
    baselineTableName: z.string().optional(),
    schedule: z.lazy(() => marshalCronScheduleSchema).optional(),
    notificationSettings: z
      .lazy(() => marshalNotificationSettingsSchema)
      .optional(),
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

export const marshalDataProfilingCustomMetricSchema = z
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

export const marshalDeleteMonitorRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
  }));

export const marshalDeleteRefreshRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    refreshId: z.number().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    refresh_id: d.refreshId,
  }));

export const marshalGetMonitorRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
  }));

export const marshalGetRefreshRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    refreshId: z.number().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    refresh_id: d.refreshId,
  }));

export const marshalInferenceLogConfigSchema = z
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

export const marshalListMonitorRequestSchema = z
  .object({
    pageToken: z.string().optional(),
    pageSize: z.number().optional(),
  })
  .transform(d => ({
    page_token: d.pageToken,
    page_size: d.pageSize,
  }));

export const marshalListMonitorResponseSchema = z
  .object({
    monitors: z.array(z.lazy(() => marshalMonitorSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    monitors: d.monitors,
    next_page_token: d.nextPageToken,
  }));

export const marshalListRefreshRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    pageToken: z.string().optional(),
    pageSize: z.number().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    page_token: d.pageToken,
    page_size: d.pageSize,
  }));

export const marshalListRefreshResponseSchema = z
  .object({
    refreshes: z.array(z.lazy(() => marshalRefreshSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    refreshes: d.refreshes,
    next_page_token: d.nextPageToken,
  }));

export const marshalMonitorSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    anomalyDetectionConfig: z
      .lazy(() => marshalAnomalyDetectionConfigSchema)
      .optional(),
    dataProfilingConfig: z
      .lazy(() => marshalDataProfilingConfigSchema)
      .optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    anomaly_detection_config: d.anomalyDetectionConfig,
    data_profiling_config: d.dataProfilingConfig,
  }));

export const marshalNotificationDestinationSchema = z
  .object({
    emailAddresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    email_addresses: d.emailAddresses,
  }));

export const marshalNotificationSettingsSchema = z
  .object({
    onFailure: z.lazy(() => marshalNotificationDestinationSchema).optional(),
  })
  .transform(d => ({
    on_failure: d.onFailure,
  }));

export const marshalPercentNullValidityCheckSchema = z
  .object({
    columnNames: z.array(z.string()).optional(),
    upperBound: z.number().optional(),
  })
  .transform(d => ({
    column_names: d.columnNames,
    upper_bound: d.upperBound,
  }));

export const marshalRangeValidityCheckSchema = z
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

export const marshalSnapshotConfigSchema = z.object({});

export const marshalTimeSeriesConfigSchema = z
  .object({
    timestampColumn: z.string().optional(),
    granularities: z.array(z.enum(AggregationGranularity)).optional(),
  })
  .transform(d => ({
    timestamp_column: d.timestampColumn,
    granularities: d.granularities,
  }));

export const marshalUniquenessValidityCheckSchema = z
  .object({
    columnNames: z.array(z.string()).optional(),
  })
  .transform(d => ({
    column_names: d.columnNames,
  }));

export const marshalUpdateMonitorRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    monitor: z.lazy(() => marshalMonitorSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    monitor: d.monitor,
    update_mask: d.updateMask,
  }));

export const marshalUpdateRefreshRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    refreshId: z.number().optional(),
    refresh: z.lazy(() => marshalRefreshSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    refresh_id: d.refreshId,
    refresh: d.refresh,
    update_mask: d.updateMask,
  }));

export const marshalValidityCheckConfigurationSchema = z
  .object({
    name: z.string().optional(),
    percentNullValidityCheck: z
      .lazy(() => marshalPercentNullValidityCheckSchema)
      .optional(),
    rangeValidityCheck: z
      .lazy(() => marshalRangeValidityCheckSchema)
      .optional(),
    uniquenessValidityCheck: z
      .lazy(() => marshalUniquenessValidityCheckSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    percent_null_validity_check: d.percentNullValidityCheck,
    range_validity_check: d.rangeValidityCheck,
    uniqueness_validity_check: d.uniquenessValidityCheck,
  }));
