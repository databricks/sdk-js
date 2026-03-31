// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * Can only be one of ``\"CUSTOM_METRIC_TYPE_AGGREGATE\"``, ``\"CUSTOM_METRIC_TYPE_DERIVED\"``, or ``\"CUSTOM_METRIC_TYPE_DRIFT\"``.
 * The ``\"CUSTOM_METRIC_TYPE_AGGREGATE\"`` and ``\"CUSTOM_METRIC_TYPE_DERIVED\"`` metrics
 * are computed on a single table, whereas the ``\"CUSTOM_METRIC_TYPE_DRIFT\"`` compare metrics across
 * baseline and input table, or across the two consecutive time windows.
 * - CUSTOM_METRIC_TYPE_AGGREGATE: only depend on the existing columns in your table
 * - CUSTOM_METRIC_TYPE_DERIVED: depend on previously computed aggregate metrics
 * - CUSTOM_METRIC_TYPE_DRIFT:  depend on previously computed aggregate or derived metrics
 */
export enum CustomMetricType {
  CUSTOM_METRIC_TYPE_UNSPECIFIED = 'CUSTOM_METRIC_TYPE_UNSPECIFIED',
  CUSTOM_METRIC_TYPE_AGGREGATE = 'CUSTOM_METRIC_TYPE_AGGREGATE',
  CUSTOM_METRIC_TYPE_DERIVED = 'CUSTOM_METRIC_TYPE_DERIVED',
  CUSTOM_METRIC_TYPE_DRIFT = 'CUSTOM_METRIC_TYPE_DRIFT',
}

export enum MonitorStatus {
  MONITOR_STATUS_UNSPECIFIED = 'MONITOR_STATUS_UNSPECIFIED',
  MONITOR_STATUS_ACTIVE = 'MONITOR_STATUS_ACTIVE',
  MONITOR_STATUS_PENDING = 'MONITOR_STATUS_PENDING',
  MONITOR_STATUS_DELETE_PENDING = 'MONITOR_STATUS_DELETE_PENDING',
  MONITOR_STATUS_ERROR = 'MONITOR_STATUS_ERROR',
  MONITOR_STATUS_FAILED = 'MONITOR_STATUS_FAILED',
}

export enum ProblemType {
  PROBLEM_TYPE_UNSPECIFIED = 'PROBLEM_TYPE_UNSPECIFIED',
  PROBLEM_TYPE_CLASSIFICATION = 'PROBLEM_TYPE_CLASSIFICATION',
  PROBLEM_TYPE_REGRESSION = 'PROBLEM_TYPE_REGRESSION',
}

/** The current state of the refresh. */
export enum RefreshState {
  /**
   * Used for any unknown refresh state - generally not meant to be customer facing,
   * and instead used in cases like serialization errors.
   */
  UNKNOWN = 'UNKNOWN',
  /**
   * The refresh has been initiated, but is waiting to run. This can be due to either
   * queued refreshes ahead of the current one, or jobs infrastructure waiting to load
   * the task.
   */
  PENDING = 'PENDING',
  /** The refresh is in progress. */
  RUNNING = 'RUNNING',
  /**
   * TERMINAL STATE
   * The refresh finished successfully without any errors.
   */
  SUCCESS = 'SUCCESS',
  /**
   * TERMINAL STATE
   * An error occurred during refresh.
   */
  FAILED = 'FAILED',
  /**
   * TERMINAL STATE
   * The user canceled the refresh.
   */
  CANCELED = 'CANCELED',
}

export enum RefreshTrigger {
  /**
   * Used for any unknown refresh trigger - generally not meant to be customer facing,
   * and instead used in cases like serialization errors.
   */
  UNKNOWN_TRIGGER = 'UNKNOWN_TRIGGER',
  /** The refresh was triggered by a schedule. */
  SCHEDULE = 'SCHEDULE',
  /** The refresh was triggered manually. */
  MANUAL = 'MANUAL',
}

/**
 * Source link: https://src.dev.databricks.com/databricks/universe/-/blob/elastic-spark-common/api/messages/schedule.proto
 * Monitoring workflow schedule pause status.
 */
export enum SchedulePauseStatus {
  UNSPECIFIED = 'UNSPECIFIED',
  UNPAUSED = 'UNPAUSED',
  PAUSED = 'PAUSED',
}

export interface CancelRefresh {
  /**
   * UC table name in format `catalog.schema.table_name`.
   * table_name is case insensitive and spaces are disallowed.
   */
  fullTableNameArg?: string | undefined;
  refreshId?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface CancelRefresh_Response {}

export interface CreateMonitor {
  /**
   * UC table name in format `catalog.schema.table_name`.
   * This field corresponds to the {full_table_name_arg} arg in the endpoint path.
   */
  fullTableNameArg?: string | undefined;
  /** Whether to skip creating a default dashboard summarizing data quality metrics. */
  skipBuiltinDashboard?: boolean | undefined;
  /**
   * Optional argument to specify the warehouse for dashboard creation. If not specified, the first running
   * warehouse will be used.
   */
  warehouseId?: string | undefined;
  /** [Create:REQ Update:REQ] Schema where output tables are created. Needs to be in 2-level format {catalog}.{schema} */
  outputSchemaName?: string | undefined;
  /**
   * [Create:REQ Update:IGN] Field for specifying the absolute path to a custom directory to store data-monitoring
   * assets. Normally prepopulated to a default user location via UI and Python APIs.
   */
  assetsDir?: string | undefined;
  inferenceLog?: InferenceLogAnalysisConfig | undefined;
  /** Configuration for monitoring time series tables. */
  timeSeries?: TimeSeriesAnalysisConfig | undefined;
  /** Configuration for monitoring snapshot tables. */
  snapshot?: SnapshotAnalysisConfig | undefined;
  /**
   * [Create:OPT Update:OPT] List of column expressions to slice data with for targeted analysis. The data is grouped by
   * each expression independently, resulting in a separate slice for each predicate and its
   * complements. For example `slicing_exprs=[“col_1”, “col_2 > 10”]` will generate the following
   * slices: two slices for `col_2 > 10` (True and False), and one slice per unique value in
   * `col1`. For high-cardinality columns, only the top 100 unique values by frequency will
   * generate slices.
   */
  slicingExprs?: string[] | undefined;
  /** [Create:OPT Update:OPT] Custom metrics. */
  customMetrics?: CustomMetric[] | undefined;
  /**
   * [Create:OPT Update:OPT] Baseline table name.
   * Baseline data is used to compute drift from the data in the monitored `table_name`.
   * The baseline table and the monitored table shall have the same schema.
   */
  baselineTableName?: string | undefined;
  /** [Create:OPT Update:OPT] The monitor schedule. */
  schedule?: MonitorCronSchedule | undefined;
  /** [Create:OPT Update:OPT] Field for specifying notification settings. */
  notifications?: Notifications | undefined;
  /** [Create:OPT Update:OPT] Data classification related config. */
  dataClassificationConfig?: DataClassificationConfig | undefined;
  /** [Create:ERR Update:IGN] UC table to monitor. Format: `catalog.schema.table_name` */
  tableName?: string | undefined;
  /** [Create:ERR Update:IGN] The monitor status. */
  status?: MonitorStatus | undefined;
  /** [Create:ERR Update:IGN] The latest error message for a monitor failure. */
  latestMonitorFailureMsg?: string | undefined;
  /** [Create:ERR Update:IGN] Table that stores profile metrics data. Format: `catalog.schema.table_name`. */
  profileMetricsTableName?: string | undefined;
  /** [Create:ERR Update:IGN] Table that stores drift metrics data. Format: `catalog.schema.table_name`. */
  driftMetricsTableName?: string | undefined;
  /**
   * [Create:ERR Update:OPT] Id of dashboard that visualizes the computed metrics.
   * This can be empty if the monitor is in PENDING state.
   */
  dashboardId?: string | undefined;
  /**
   * [Create:ERR Update:IGN] Represents the current monitor configuration version in use. The version will be represented in a
   * numeric fashion (1,2,3...). The field has flexibility to take on negative values, which can indicate corrupted
   * monitor_version numbers.
   */
  monitorVersion?: number | undefined;
}

/** Custom metric definition. */
export interface CustomMetric {
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
  /**
   * Can only be one of ``"CUSTOM_METRIC_TYPE_AGGREGATE"``, ``"CUSTOM_METRIC_TYPE_DERIVED"``, or ``"CUSTOM_METRIC_TYPE_DRIFT"``.
   * The ``"CUSTOM_METRIC_TYPE_AGGREGATE"`` and ``"CUSTOM_METRIC_TYPE_DERIVED"`` metrics
   * are computed on a single table, whereas the ``"CUSTOM_METRIC_TYPE_DRIFT"`` compare metrics across
   * baseline and input table, or across the two consecutive time windows.
   * - CUSTOM_METRIC_TYPE_AGGREGATE: only depend on the existing columns in your table
   * - CUSTOM_METRIC_TYPE_DERIVED: depend on previously computed aggregate metrics
   * - CUSTOM_METRIC_TYPE_DRIFT:  depend on previously computed aggregate or derived metrics
   */
  type?: CustomMetricType | undefined;
}

/** Data classification related configuration. */
export interface DataClassificationConfig {
  /** Whether to enable data classification. */
  enabled?: boolean | undefined;
}

export interface DataMonitorInfo {
  /** [Create:REQ Update:REQ] Schema where output tables are created. Needs to be in 2-level format {catalog}.{schema} */
  outputSchemaName?: string | undefined;
  /**
   * [Create:REQ Update:IGN] Field for specifying the absolute path to a custom directory to store data-monitoring
   * assets. Normally prepopulated to a default user location via UI and Python APIs.
   */
  assetsDir?: string | undefined;
  inferenceLog?: InferenceLogAnalysisConfig | undefined;
  /** Configuration for monitoring time series tables. */
  timeSeries?: TimeSeriesAnalysisConfig | undefined;
  /** Configuration for monitoring snapshot tables. */
  snapshot?: SnapshotAnalysisConfig | undefined;
  /**
   * [Create:OPT Update:OPT] List of column expressions to slice data with for targeted analysis. The data is grouped by
   * each expression independently, resulting in a separate slice for each predicate and its
   * complements. For example `slicing_exprs=[“col_1”, “col_2 > 10”]` will generate the following
   * slices: two slices for `col_2 > 10` (True and False), and one slice per unique value in
   * `col1`. For high-cardinality columns, only the top 100 unique values by frequency will
   * generate slices.
   */
  slicingExprs?: string[] | undefined;
  /** [Create:OPT Update:OPT] Custom metrics. */
  customMetrics?: CustomMetric[] | undefined;
  /**
   * [Create:OPT Update:OPT] Baseline table name.
   * Baseline data is used to compute drift from the data in the monitored `table_name`.
   * The baseline table and the monitored table shall have the same schema.
   */
  baselineTableName?: string | undefined;
  /** [Create:OPT Update:OPT] The monitor schedule. */
  schedule?: MonitorCronSchedule | undefined;
  /** [Create:OPT Update:OPT] Field for specifying notification settings. */
  notifications?: Notifications | undefined;
  /** [Create:OPT Update:OPT] Data classification related config. */
  dataClassificationConfig?: DataClassificationConfig | undefined;
  /** [Create:ERR Update:IGN] UC table to monitor. Format: `catalog.schema.table_name` */
  tableName?: string | undefined;
  /** [Create:ERR Update:IGN] The monitor status. */
  status?: MonitorStatus | undefined;
  /** [Create:ERR Update:IGN] The latest error message for a monitor failure. */
  latestMonitorFailureMsg?: string | undefined;
  /** [Create:ERR Update:IGN] Table that stores profile metrics data. Format: `catalog.schema.table_name`. */
  profileMetricsTableName?: string | undefined;
  /** [Create:ERR Update:IGN] Table that stores drift metrics data. Format: `catalog.schema.table_name`. */
  driftMetricsTableName?: string | undefined;
  /**
   * [Create:ERR Update:OPT] Id of dashboard that visualizes the computed metrics.
   * This can be empty if the monitor is in PENDING state.
   */
  dashboardId?: string | undefined;
  /**
   * [Create:ERR Update:IGN] Represents the current monitor configuration version in use. The version will be represented in a
   * numeric fashion (1,2,3...). The field has flexibility to take on negative values, which can indicate corrupted
   * monitor_version numbers.
   */
  monitorVersion?: number | undefined;
}

export interface DeleteMonitor {
  /**
   * UC table name in format `catalog.schema.table_name`.
   * This field corresponds to the {full_table_name_arg} arg in the endpoint path.
   */
  fullTableNameArg?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteMonitor_Response {}

export interface Destination {
  /** The list of email addresses to send the notification to. A maximum of 5 email addresses is supported. */
  emailAddresses?: string[] | undefined;
}

export interface GetMonitor {
  /**
   * UC table name in format `catalog.schema.table_name`.
   * This field corresponds to the {full_table_name_arg} arg in the endpoint path.
   */
  fullTableNameArg?: string | undefined;
}

export interface GetRefresh {
  /** Full name of the table. */
  fullTableNameArg?: string | undefined;
  /** ID of the refresh. */
  refreshId?: number | undefined;
}

export interface InferenceLogAnalysisConfig {
  /** Problem type the model aims to solve. */
  problemType?: ProblemType | undefined;
  /** Column for the timestamp. */
  timestampCol?: string | undefined;
  /** List of granularities to use when aggregating data into time windows based on their timestamp. */
  granularities?: string[] | undefined;
  /** Column for the prediction. */
  predictionCol?: string | undefined;
  /** Column for the label. */
  labelCol?: string | undefined;
  /** Column for the model identifier. */
  modelIdCol?: string | undefined;
  /** Column for prediction probabilities */
  predictionProbaCol?: string | undefined;
}

export interface ListRefreshes {
  /**
   * UC table name in format `catalog.schema.table_name`.
   * table_name is case insensitive and spaces are disallowed.
   */
  fullTableNameArg?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListRefreshes_Response {
  /** List of refreshes. */
  refreshes?: RefreshInfo[] | undefined;
}

export interface MonitorCronSchedule {
  /** The expression that determines when to run the monitor. See [examples](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html). */
  quartzCronExpression?: string | undefined;
  /** The timezone id (e.g., ``PST``) in which to evaluate the quartz expression. */
  timezoneId?: string | undefined;
  /** Read only field that indicates whether a schedule is paused or not. */
  pauseStatus?: SchedulePauseStatus | undefined;
}

export interface Notifications {
  /** Destinations to send notifications on failure/timeout. */
  onFailure?: Destination | undefined;
  /** Destinations to send notifications on new classification tag detected. */
  onNewClassificationTagDetected?: Destination | undefined;
}

export interface RefreshInfo {
  /** Unique id of the refresh operation. */
  refreshId?: number | undefined;
  /** The current state of the refresh. */
  state?: RefreshState | undefined;
  /** An optional message to give insight into the current state of the job (e.g. FAILURE messages). */
  message?: string | undefined;
  /** Time at which refresh operation was initiated (milliseconds since 1/1/1970 UTC). */
  startTimeMs?: number | undefined;
  /** Time at which refresh operation completed (milliseconds since 1/1/1970 UTC). */
  endTimeMs?: number | undefined;
  /** The method by which the refresh was triggered. */
  trigger?: RefreshTrigger | undefined;
}

export interface RegenerateDashboard {
  /**
   * UC table name in format `catalog.schema.table_name`.
   * This field corresponds to the {full_table_name_arg} arg in the endpoint path.
   */
  fullTableNameArg?: string | undefined;
  /**
   * Optional argument to specify the warehouse for dashboard regeneration. If not specified, the first running
   * warehouse will be used.
   */
  warehouseId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface RegenerateDashboard_Response {
  dashboardId?: string | undefined;
  /** Parent folder is equivalent to {assets_dir}/{tableName} */
  parentFolder?: string | undefined;
}

export interface RunRefresh {
  /**
   * UC table name in format `catalog.schema.table_name`.
   * table_name is case insensitive and spaces are disallowed.
   */
  fullTableNameArg?: string | undefined;
}

/** Snapshot analysis configuration */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SnapshotAnalysisConfig {}

/** Time series analysis configuration. */
export interface TimeSeriesAnalysisConfig {
  /** Column for the timestamp. */
  timestampCol?: string | undefined;
  /**
   * Granularities for aggregating data into time windows based on their timestamp. Currently the following static
   * granularities are supported:
   * {``\"5 minutes\"``, ``\"30 minutes\"``, ``\"1 hour\"``, ``\"1 day\"``, ``\"\u003cn\u003e week(s)\"``, ``\"1 month\"``, ``\"1 year\"``}.
   */
  granularities?: string[] | undefined;
}

export interface UpdateMonitor {
  /**
   * UC table name in format `catalog.schema.table_name`.
   * This field corresponds to the {full_table_name_arg} arg in the endpoint path.
   */
  fullTableNameArg?: string | undefined;
  /** [Create:REQ Update:REQ] Schema where output tables are created. Needs to be in 2-level format {catalog}.{schema} */
  outputSchemaName?: string | undefined;
  /**
   * [Create:REQ Update:IGN] Field for specifying the absolute path to a custom directory to store data-monitoring
   * assets. Normally prepopulated to a default user location via UI and Python APIs.
   */
  assetsDir?: string | undefined;
  inferenceLog?: InferenceLogAnalysisConfig | undefined;
  /** Configuration for monitoring time series tables. */
  timeSeries?: TimeSeriesAnalysisConfig | undefined;
  /** Configuration for monitoring snapshot tables. */
  snapshot?: SnapshotAnalysisConfig | undefined;
  /**
   * [Create:OPT Update:OPT] List of column expressions to slice data with for targeted analysis. The data is grouped by
   * each expression independently, resulting in a separate slice for each predicate and its
   * complements. For example `slicing_exprs=[“col_1”, “col_2 > 10”]` will generate the following
   * slices: two slices for `col_2 > 10` (True and False), and one slice per unique value in
   * `col1`. For high-cardinality columns, only the top 100 unique values by frequency will
   * generate slices.
   */
  slicingExprs?: string[] | undefined;
  /** [Create:OPT Update:OPT] Custom metrics. */
  customMetrics?: CustomMetric[] | undefined;
  /**
   * [Create:OPT Update:OPT] Baseline table name.
   * Baseline data is used to compute drift from the data in the monitored `table_name`.
   * The baseline table and the monitored table shall have the same schema.
   */
  baselineTableName?: string | undefined;
  /** [Create:OPT Update:OPT] The monitor schedule. */
  schedule?: MonitorCronSchedule | undefined;
  /** [Create:OPT Update:OPT] Field for specifying notification settings. */
  notifications?: Notifications | undefined;
  /** [Create:OPT Update:OPT] Data classification related config. */
  dataClassificationConfig?: DataClassificationConfig | undefined;
  /** [Create:ERR Update:IGN] UC table to monitor. Format: `catalog.schema.table_name` */
  tableName?: string | undefined;
  /** [Create:ERR Update:IGN] The monitor status. */
  status?: MonitorStatus | undefined;
  /** [Create:ERR Update:IGN] The latest error message for a monitor failure. */
  latestMonitorFailureMsg?: string | undefined;
  /** [Create:ERR Update:IGN] Table that stores profile metrics data. Format: `catalog.schema.table_name`. */
  profileMetricsTableName?: string | undefined;
  /** [Create:ERR Update:IGN] Table that stores drift metrics data. Format: `catalog.schema.table_name`. */
  driftMetricsTableName?: string | undefined;
  /**
   * [Create:ERR Update:OPT] Id of dashboard that visualizes the computed metrics.
   * This can be empty if the monitor is in PENDING state.
   */
  dashboardId?: string | undefined;
  /**
   * [Create:ERR Update:IGN] Represents the current monitor configuration version in use. The version will be represented in a
   * numeric fashion (1,2,3...). The field has flexibility to take on negative values, which can indicate corrupted
   * monitor_version numbers.
   */
  monitorVersion?: number | undefined;
}

export const unmarshalCancelRefreshSchema: z.ZodType<CancelRefresh> = z
  .object({
    full_table_name_arg: z.string().optional(),
    refresh_id: z.number().optional(),
  })
  .transform(d => ({
    fullTableNameArg: d.full_table_name_arg,
    refreshId: d.refresh_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCancelRefresh_ResponseSchema: z.ZodType<CancelRefresh_Response> =
  z.object({});

export const unmarshalCreateMonitorSchema: z.ZodType<CreateMonitor> = z
  .object({
    full_table_name_arg: z.string().optional(),
    skip_builtin_dashboard: z.boolean().optional(),
    warehouse_id: z.string().optional(),
    output_schema_name: z.string().optional(),
    assets_dir: z.string().optional(),
    inference_log: z
      .lazy(() => unmarshalInferenceLogAnalysisConfigSchema)
      .optional(),
    time_series: z
      .lazy(() => unmarshalTimeSeriesAnalysisConfigSchema)
      .optional(),
    snapshot: z.lazy(() => unmarshalSnapshotAnalysisConfigSchema).optional(),
    slicing_exprs: z.array(z.string()).optional(),
    custom_metrics: z
      .array(z.lazy(() => unmarshalCustomMetricSchema))
      .optional(),
    baseline_table_name: z.string().optional(),
    schedule: z.lazy(() => unmarshalMonitorCronScheduleSchema).optional(),
    notifications: z.lazy(() => unmarshalNotificationsSchema).optional(),
    data_classification_config: z
      .lazy(() => unmarshalDataClassificationConfigSchema)
      .optional(),
    table_name: z.string().optional(),
    status: z.enum(MonitorStatus).optional(),
    latest_monitor_failure_msg: z.string().optional(),
    profile_metrics_table_name: z.string().optional(),
    drift_metrics_table_name: z.string().optional(),
    dashboard_id: z.string().optional(),
    monitor_version: z.number().optional(),
  })
  .transform(d => ({
    fullTableNameArg: d.full_table_name_arg,
    skipBuiltinDashboard: d.skip_builtin_dashboard,
    warehouseId: d.warehouse_id,
    outputSchemaName: d.output_schema_name,
    assetsDir: d.assets_dir,
    inferenceLog: d.inference_log,
    timeSeries: d.time_series,
    snapshot: d.snapshot,
    slicingExprs: d.slicing_exprs,
    customMetrics: d.custom_metrics,
    baselineTableName: d.baseline_table_name,
    schedule: d.schedule,
    notifications: d.notifications,
    dataClassificationConfig: d.data_classification_config,
    tableName: d.table_name,
    status: d.status,
    latestMonitorFailureMsg: d.latest_monitor_failure_msg,
    profileMetricsTableName: d.profile_metrics_table_name,
    driftMetricsTableName: d.drift_metrics_table_name,
    dashboardId: d.dashboard_id,
    monitorVersion: d.monitor_version,
  }));

export const unmarshalCustomMetricSchema: z.ZodType<CustomMetric> = z
  .object({
    name: z.string().optional(),
    definition: z.string().optional(),
    input_columns: z.array(z.string()).optional(),
    output_data_type: z.string().optional(),
    type: z.enum(CustomMetricType).optional(),
  })
  .transform(d => ({
    name: d.name,
    definition: d.definition,
    inputColumns: d.input_columns,
    outputDataType: d.output_data_type,
    type: d.type,
  }));

export const unmarshalDataClassificationConfigSchema: z.ZodType<DataClassificationConfig> =
  z
    .object({
      enabled: z.boolean().optional(),
    })
    .transform(d => ({
      enabled: d.enabled,
    }));

export const unmarshalDataMonitorInfoSchema: z.ZodType<DataMonitorInfo> = z
  .object({
    output_schema_name: z.string().optional(),
    assets_dir: z.string().optional(),
    inference_log: z
      .lazy(() => unmarshalInferenceLogAnalysisConfigSchema)
      .optional(),
    time_series: z
      .lazy(() => unmarshalTimeSeriesAnalysisConfigSchema)
      .optional(),
    snapshot: z.lazy(() => unmarshalSnapshotAnalysisConfigSchema).optional(),
    slicing_exprs: z.array(z.string()).optional(),
    custom_metrics: z
      .array(z.lazy(() => unmarshalCustomMetricSchema))
      .optional(),
    baseline_table_name: z.string().optional(),
    schedule: z.lazy(() => unmarshalMonitorCronScheduleSchema).optional(),
    notifications: z.lazy(() => unmarshalNotificationsSchema).optional(),
    data_classification_config: z
      .lazy(() => unmarshalDataClassificationConfigSchema)
      .optional(),
    table_name: z.string().optional(),
    status: z.enum(MonitorStatus).optional(),
    latest_monitor_failure_msg: z.string().optional(),
    profile_metrics_table_name: z.string().optional(),
    drift_metrics_table_name: z.string().optional(),
    dashboard_id: z.string().optional(),
    monitor_version: z.number().optional(),
  })
  .transform(d => ({
    outputSchemaName: d.output_schema_name,
    assetsDir: d.assets_dir,
    inferenceLog: d.inference_log,
    timeSeries: d.time_series,
    snapshot: d.snapshot,
    slicingExprs: d.slicing_exprs,
    customMetrics: d.custom_metrics,
    baselineTableName: d.baseline_table_name,
    schedule: d.schedule,
    notifications: d.notifications,
    dataClassificationConfig: d.data_classification_config,
    tableName: d.table_name,
    status: d.status,
    latestMonitorFailureMsg: d.latest_monitor_failure_msg,
    profileMetricsTableName: d.profile_metrics_table_name,
    driftMetricsTableName: d.drift_metrics_table_name,
    dashboardId: d.dashboard_id,
    monitorVersion: d.monitor_version,
  }));

export const unmarshalDeleteMonitorSchema: z.ZodType<DeleteMonitor> = z
  .object({
    full_table_name_arg: z.string().optional(),
  })
  .transform(d => ({
    fullTableNameArg: d.full_table_name_arg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteMonitor_ResponseSchema: z.ZodType<DeleteMonitor_Response> =
  z.object({});

export const unmarshalDestinationSchema: z.ZodType<Destination> = z
  .object({
    email_addresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    emailAddresses: d.email_addresses,
  }));

export const unmarshalGetMonitorSchema: z.ZodType<GetMonitor> = z
  .object({
    full_table_name_arg: z.string().optional(),
  })
  .transform(d => ({
    fullTableNameArg: d.full_table_name_arg,
  }));

export const unmarshalGetRefreshSchema: z.ZodType<GetRefresh> = z
  .object({
    full_table_name_arg: z.string().optional(),
    refresh_id: z.number().optional(),
  })
  .transform(d => ({
    fullTableNameArg: d.full_table_name_arg,
    refreshId: d.refresh_id,
  }));

export const unmarshalInferenceLogAnalysisConfigSchema: z.ZodType<InferenceLogAnalysisConfig> =
  z
    .object({
      problem_type: z.enum(ProblemType).optional(),
      timestamp_col: z.string().optional(),
      granularities: z.array(z.string()).optional(),
      prediction_col: z.string().optional(),
      label_col: z.string().optional(),
      model_id_col: z.string().optional(),
      prediction_proba_col: z.string().optional(),
    })
    .transform(d => ({
      problemType: d.problem_type,
      timestampCol: d.timestamp_col,
      granularities: d.granularities,
      predictionCol: d.prediction_col,
      labelCol: d.label_col,
      modelIdCol: d.model_id_col,
      predictionProbaCol: d.prediction_proba_col,
    }));

export const unmarshalListRefreshesSchema: z.ZodType<ListRefreshes> = z
  .object({
    full_table_name_arg: z.string().optional(),
  })
  .transform(d => ({
    fullTableNameArg: d.full_table_name_arg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListRefreshes_ResponseSchema: z.ZodType<ListRefreshes_Response> =
  z
    .object({
      refreshes: z.array(z.lazy(() => unmarshalRefreshInfoSchema)).optional(),
    })
    .transform(d => ({
      refreshes: d.refreshes,
    }));

export const unmarshalMonitorCronScheduleSchema: z.ZodType<MonitorCronSchedule> =
  z
    .object({
      quartz_cron_expression: z.string().optional(),
      timezone_id: z.string().optional(),
      pause_status: z.enum(SchedulePauseStatus).optional(),
    })
    .transform(d => ({
      quartzCronExpression: d.quartz_cron_expression,
      timezoneId: d.timezone_id,
      pauseStatus: d.pause_status,
    }));

export const unmarshalNotificationsSchema: z.ZodType<Notifications> = z
  .object({
    on_failure: z.lazy(() => unmarshalDestinationSchema).optional(),
    on_new_classification_tag_detected: z
      .lazy(() => unmarshalDestinationSchema)
      .optional(),
  })
  .transform(d => ({
    onFailure: d.on_failure,
    onNewClassificationTagDetected: d.on_new_classification_tag_detected,
  }));

export const unmarshalRefreshInfoSchema: z.ZodType<RefreshInfo> = z
  .object({
    refresh_id: z.number().optional(),
    state: z.enum(RefreshState).optional(),
    message: z.string().optional(),
    start_time_ms: z.number().optional(),
    end_time_ms: z.number().optional(),
    trigger: z.enum(RefreshTrigger).optional(),
  })
  .transform(d => ({
    refreshId: d.refresh_id,
    state: d.state,
    message: d.message,
    startTimeMs: d.start_time_ms,
    endTimeMs: d.end_time_ms,
    trigger: d.trigger,
  }));

export const unmarshalRegenerateDashboardSchema: z.ZodType<RegenerateDashboard> =
  z
    .object({
      full_table_name_arg: z.string().optional(),
      warehouse_id: z.string().optional(),
    })
    .transform(d => ({
      fullTableNameArg: d.full_table_name_arg,
      warehouseId: d.warehouse_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRegenerateDashboard_ResponseSchema: z.ZodType<RegenerateDashboard_Response> =
  z
    .object({
      dashboard_id: z.string().optional(),
      parent_folder: z.string().optional(),
    })
    .transform(d => ({
      dashboardId: d.dashboard_id,
      parentFolder: d.parent_folder,
    }));

export const unmarshalRunRefreshSchema: z.ZodType<RunRefresh> = z
  .object({
    full_table_name_arg: z.string().optional(),
  })
  .transform(d => ({
    fullTableNameArg: d.full_table_name_arg,
  }));

export const unmarshalSnapshotAnalysisConfigSchema: z.ZodType<SnapshotAnalysisConfig> =
  z.object({});

export const unmarshalTimeSeriesAnalysisConfigSchema: z.ZodType<TimeSeriesAnalysisConfig> =
  z
    .object({
      timestamp_col: z.string().optional(),
      granularities: z.array(z.string()).optional(),
    })
    .transform(d => ({
      timestampCol: d.timestamp_col,
      granularities: d.granularities,
    }));

export const unmarshalUpdateMonitorSchema: z.ZodType<UpdateMonitor> = z
  .object({
    full_table_name_arg: z.string().optional(),
    output_schema_name: z.string().optional(),
    assets_dir: z.string().optional(),
    inference_log: z
      .lazy(() => unmarshalInferenceLogAnalysisConfigSchema)
      .optional(),
    time_series: z
      .lazy(() => unmarshalTimeSeriesAnalysisConfigSchema)
      .optional(),
    snapshot: z.lazy(() => unmarshalSnapshotAnalysisConfigSchema).optional(),
    slicing_exprs: z.array(z.string()).optional(),
    custom_metrics: z
      .array(z.lazy(() => unmarshalCustomMetricSchema))
      .optional(),
    baseline_table_name: z.string().optional(),
    schedule: z.lazy(() => unmarshalMonitorCronScheduleSchema).optional(),
    notifications: z.lazy(() => unmarshalNotificationsSchema).optional(),
    data_classification_config: z
      .lazy(() => unmarshalDataClassificationConfigSchema)
      .optional(),
    table_name: z.string().optional(),
    status: z.enum(MonitorStatus).optional(),
    latest_monitor_failure_msg: z.string().optional(),
    profile_metrics_table_name: z.string().optional(),
    drift_metrics_table_name: z.string().optional(),
    dashboard_id: z.string().optional(),
    monitor_version: z.number().optional(),
  })
  .transform(d => ({
    fullTableNameArg: d.full_table_name_arg,
    outputSchemaName: d.output_schema_name,
    assetsDir: d.assets_dir,
    inferenceLog: d.inference_log,
    timeSeries: d.time_series,
    snapshot: d.snapshot,
    slicingExprs: d.slicing_exprs,
    customMetrics: d.custom_metrics,
    baselineTableName: d.baseline_table_name,
    schedule: d.schedule,
    notifications: d.notifications,
    dataClassificationConfig: d.data_classification_config,
    tableName: d.table_name,
    status: d.status,
    latestMonitorFailureMsg: d.latest_monitor_failure_msg,
    profileMetricsTableName: d.profile_metrics_table_name,
    driftMetricsTableName: d.drift_metrics_table_name,
    dashboardId: d.dashboard_id,
    monitorVersion: d.monitor_version,
  }));

export const marshalCancelRefreshSchema = z
  .object({
    fullTableNameArg: z.string().optional(),
    refreshId: z.number().optional(),
  })
  .transform(d => ({
    full_table_name_arg: d.fullTableNameArg,
    refresh_id: d.refreshId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCancelRefresh_ResponseSchema = z.object({});

export const marshalCreateMonitorSchema = z
  .object({
    fullTableNameArg: z.string().optional(),
    skipBuiltinDashboard: z.boolean().optional(),
    warehouseId: z.string().optional(),
    outputSchemaName: z.string().optional(),
    assetsDir: z.string().optional(),
    inferenceLog: z
      .lazy(() => marshalInferenceLogAnalysisConfigSchema)
      .optional(),
    timeSeries: z.lazy(() => marshalTimeSeriesAnalysisConfigSchema).optional(),
    snapshot: z.lazy(() => marshalSnapshotAnalysisConfigSchema).optional(),
    slicingExprs: z.array(z.string()).optional(),
    customMetrics: z.array(z.lazy(() => marshalCustomMetricSchema)).optional(),
    baselineTableName: z.string().optional(),
    schedule: z.lazy(() => marshalMonitorCronScheduleSchema).optional(),
    notifications: z.lazy(() => marshalNotificationsSchema).optional(),
    dataClassificationConfig: z
      .lazy(() => marshalDataClassificationConfigSchema)
      .optional(),
    tableName: z.string().optional(),
    status: z.enum(MonitorStatus).optional(),
    latestMonitorFailureMsg: z.string().optional(),
    profileMetricsTableName: z.string().optional(),
    driftMetricsTableName: z.string().optional(),
    dashboardId: z.string().optional(),
    monitorVersion: z.number().optional(),
  })
  .transform(d => ({
    full_table_name_arg: d.fullTableNameArg,
    skip_builtin_dashboard: d.skipBuiltinDashboard,
    warehouse_id: d.warehouseId,
    output_schema_name: d.outputSchemaName,
    assets_dir: d.assetsDir,
    inference_log: d.inferenceLog,
    time_series: d.timeSeries,
    snapshot: d.snapshot,
    slicing_exprs: d.slicingExprs,
    custom_metrics: d.customMetrics,
    baseline_table_name: d.baselineTableName,
    schedule: d.schedule,
    notifications: d.notifications,
    data_classification_config: d.dataClassificationConfig,
    table_name: d.tableName,
    status: d.status,
    latest_monitor_failure_msg: d.latestMonitorFailureMsg,
    profile_metrics_table_name: d.profileMetricsTableName,
    drift_metrics_table_name: d.driftMetricsTableName,
    dashboard_id: d.dashboardId,
    monitor_version: d.monitorVersion,
  }));

export const marshalCustomMetricSchema = z
  .object({
    name: z.string().optional(),
    definition: z.string().optional(),
    inputColumns: z.array(z.string()).optional(),
    outputDataType: z.string().optional(),
    type: z.enum(CustomMetricType).optional(),
  })
  .transform(d => ({
    name: d.name,
    definition: d.definition,
    input_columns: d.inputColumns,
    output_data_type: d.outputDataType,
    type: d.type,
  }));

export const marshalDataClassificationConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
  }));

export const marshalDataMonitorInfoSchema = z
  .object({
    outputSchemaName: z.string().optional(),
    assetsDir: z.string().optional(),
    inferenceLog: z
      .lazy(() => marshalInferenceLogAnalysisConfigSchema)
      .optional(),
    timeSeries: z.lazy(() => marshalTimeSeriesAnalysisConfigSchema).optional(),
    snapshot: z.lazy(() => marshalSnapshotAnalysisConfigSchema).optional(),
    slicingExprs: z.array(z.string()).optional(),
    customMetrics: z.array(z.lazy(() => marshalCustomMetricSchema)).optional(),
    baselineTableName: z.string().optional(),
    schedule: z.lazy(() => marshalMonitorCronScheduleSchema).optional(),
    notifications: z.lazy(() => marshalNotificationsSchema).optional(),
    dataClassificationConfig: z
      .lazy(() => marshalDataClassificationConfigSchema)
      .optional(),
    tableName: z.string().optional(),
    status: z.enum(MonitorStatus).optional(),
    latestMonitorFailureMsg: z.string().optional(),
    profileMetricsTableName: z.string().optional(),
    driftMetricsTableName: z.string().optional(),
    dashboardId: z.string().optional(),
    monitorVersion: z.number().optional(),
  })
  .transform(d => ({
    output_schema_name: d.outputSchemaName,
    assets_dir: d.assetsDir,
    inference_log: d.inferenceLog,
    time_series: d.timeSeries,
    snapshot: d.snapshot,
    slicing_exprs: d.slicingExprs,
    custom_metrics: d.customMetrics,
    baseline_table_name: d.baselineTableName,
    schedule: d.schedule,
    notifications: d.notifications,
    data_classification_config: d.dataClassificationConfig,
    table_name: d.tableName,
    status: d.status,
    latest_monitor_failure_msg: d.latestMonitorFailureMsg,
    profile_metrics_table_name: d.profileMetricsTableName,
    drift_metrics_table_name: d.driftMetricsTableName,
    dashboard_id: d.dashboardId,
    monitor_version: d.monitorVersion,
  }));

export const marshalDeleteMonitorSchema = z
  .object({
    fullTableNameArg: z.string().optional(),
  })
  .transform(d => ({
    full_table_name_arg: d.fullTableNameArg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteMonitor_ResponseSchema = z.object({});

export const marshalDestinationSchema = z
  .object({
    emailAddresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    email_addresses: d.emailAddresses,
  }));

export const marshalGetMonitorSchema = z
  .object({
    fullTableNameArg: z.string().optional(),
  })
  .transform(d => ({
    full_table_name_arg: d.fullTableNameArg,
  }));

export const marshalGetRefreshSchema = z
  .object({
    fullTableNameArg: z.string().optional(),
    refreshId: z.number().optional(),
  })
  .transform(d => ({
    full_table_name_arg: d.fullTableNameArg,
    refresh_id: d.refreshId,
  }));

export const marshalInferenceLogAnalysisConfigSchema = z
  .object({
    problemType: z.enum(ProblemType).optional(),
    timestampCol: z.string().optional(),
    granularities: z.array(z.string()).optional(),
    predictionCol: z.string().optional(),
    labelCol: z.string().optional(),
    modelIdCol: z.string().optional(),
    predictionProbaCol: z.string().optional(),
  })
  .transform(d => ({
    problem_type: d.problemType,
    timestamp_col: d.timestampCol,
    granularities: d.granularities,
    prediction_col: d.predictionCol,
    label_col: d.labelCol,
    model_id_col: d.modelIdCol,
    prediction_proba_col: d.predictionProbaCol,
  }));

export const marshalListRefreshesSchema = z
  .object({
    fullTableNameArg: z.string().optional(),
  })
  .transform(d => ({
    full_table_name_arg: d.fullTableNameArg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListRefreshes_ResponseSchema = z
  .object({
    refreshes: z.array(z.lazy(() => marshalRefreshInfoSchema)).optional(),
  })
  .transform(d => ({
    refreshes: d.refreshes,
  }));

export const marshalMonitorCronScheduleSchema = z
  .object({
    quartzCronExpression: z.string().optional(),
    timezoneId: z.string().optional(),
    pauseStatus: z.enum(SchedulePauseStatus).optional(),
  })
  .transform(d => ({
    quartz_cron_expression: d.quartzCronExpression,
    timezone_id: d.timezoneId,
    pause_status: d.pauseStatus,
  }));

export const marshalNotificationsSchema = z
  .object({
    onFailure: z.lazy(() => marshalDestinationSchema).optional(),
    onNewClassificationTagDetected: z
      .lazy(() => marshalDestinationSchema)
      .optional(),
  })
  .transform(d => ({
    on_failure: d.onFailure,
    on_new_classification_tag_detected: d.onNewClassificationTagDetected,
  }));

export const marshalRefreshInfoSchema = z
  .object({
    refreshId: z.number().optional(),
    state: z.enum(RefreshState).optional(),
    message: z.string().optional(),
    startTimeMs: z.number().optional(),
    endTimeMs: z.number().optional(),
    trigger: z.enum(RefreshTrigger).optional(),
  })
  .transform(d => ({
    refresh_id: d.refreshId,
    state: d.state,
    message: d.message,
    start_time_ms: d.startTimeMs,
    end_time_ms: d.endTimeMs,
    trigger: d.trigger,
  }));

export const marshalRegenerateDashboardSchema = z
  .object({
    fullTableNameArg: z.string().optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    full_table_name_arg: d.fullTableNameArg,
    warehouse_id: d.warehouseId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRegenerateDashboard_ResponseSchema = z
  .object({
    dashboardId: z.string().optional(),
    parentFolder: z.string().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
    parent_folder: d.parentFolder,
  }));

export const marshalRunRefreshSchema = z
  .object({
    fullTableNameArg: z.string().optional(),
  })
  .transform(d => ({
    full_table_name_arg: d.fullTableNameArg,
  }));

export const marshalSnapshotAnalysisConfigSchema = z.object({});

export const marshalTimeSeriesAnalysisConfigSchema = z
  .object({
    timestampCol: z.string().optional(),
    granularities: z.array(z.string()).optional(),
  })
  .transform(d => ({
    timestamp_col: d.timestampCol,
    granularities: d.granularities,
  }));

export const marshalUpdateMonitorSchema = z
  .object({
    fullTableNameArg: z.string().optional(),
    outputSchemaName: z.string().optional(),
    assetsDir: z.string().optional(),
    inferenceLog: z
      .lazy(() => marshalInferenceLogAnalysisConfigSchema)
      .optional(),
    timeSeries: z.lazy(() => marshalTimeSeriesAnalysisConfigSchema).optional(),
    snapshot: z.lazy(() => marshalSnapshotAnalysisConfigSchema).optional(),
    slicingExprs: z.array(z.string()).optional(),
    customMetrics: z.array(z.lazy(() => marshalCustomMetricSchema)).optional(),
    baselineTableName: z.string().optional(),
    schedule: z.lazy(() => marshalMonitorCronScheduleSchema).optional(),
    notifications: z.lazy(() => marshalNotificationsSchema).optional(),
    dataClassificationConfig: z
      .lazy(() => marshalDataClassificationConfigSchema)
      .optional(),
    tableName: z.string().optional(),
    status: z.enum(MonitorStatus).optional(),
    latestMonitorFailureMsg: z.string().optional(),
    profileMetricsTableName: z.string().optional(),
    driftMetricsTableName: z.string().optional(),
    dashboardId: z.string().optional(),
    monitorVersion: z.number().optional(),
  })
  .transform(d => ({
    full_table_name_arg: d.fullTableNameArg,
    output_schema_name: d.outputSchemaName,
    assets_dir: d.assetsDir,
    inference_log: d.inferenceLog,
    time_series: d.timeSeries,
    snapshot: d.snapshot,
    slicing_exprs: d.slicingExprs,
    custom_metrics: d.customMetrics,
    baseline_table_name: d.baselineTableName,
    schedule: d.schedule,
    notifications: d.notifications,
    data_classification_config: d.dataClassificationConfig,
    table_name: d.tableName,
    status: d.status,
    latest_monitor_failure_msg: d.latestMonitorFailureMsg,
    profile_metrics_table_name: d.profileMetricsTableName,
    drift_metrics_table_name: d.driftMetricsTableName,
    dashboard_id: d.dashboardId,
    monitor_version: d.monitorVersion,
  }));
