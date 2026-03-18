// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum AnomalyDetectionJobType {
  ANOMALY_DETECTION_JOB_TYPE_UNSPECIFIED = 'ANOMALY_DETECTION_JOB_TYPE_UNSPECIFIED',
  ANOMALY_DETECTION_JOB_TYPE_NORMAL = 'ANOMALY_DETECTION_JOB_TYPE_NORMAL',
  ANOMALY_DETECTION_JOB_TYPE_INTERNAL_HIDDEN = 'ANOMALY_DETECTION_JOB_TYPE_INTERNAL_HIDDEN',
}

/** Status of Anomaly Detection Job Run */
export enum AnomalyDetectionRunStatus {
  ANOMALY_DETECTION_RUN_STATUS_UNKNOWN = 'ANOMALY_DETECTION_RUN_STATUS_UNKNOWN',
  ANOMALY_DETECTION_RUN_STATUS_RUNNING = 'ANOMALY_DETECTION_RUN_STATUS_RUNNING',
  ANOMALY_DETECTION_RUN_STATUS_CANCELED = 'ANOMALY_DETECTION_RUN_STATUS_CANCELED',
  ANOMALY_DETECTION_RUN_STATUS_PENDING = 'ANOMALY_DETECTION_RUN_STATUS_PENDING',
  ANOMALY_DETECTION_RUN_STATUS_SUCCESS = 'ANOMALY_DETECTION_RUN_STATUS_SUCCESS',
  ANOMALY_DETECTION_RUN_STATUS_FAILED = 'ANOMALY_DETECTION_RUN_STATUS_FAILED',
  ANOMALY_DETECTION_RUN_STATUS_JOB_DELETED = 'ANOMALY_DETECTION_RUN_STATUS_JOB_DELETED',
  ANOMALY_DETECTION_RUN_STATUS_WORKSPACE_MISMATCH_ERROR = 'ANOMALY_DETECTION_RUN_STATUS_WORKSPACE_MISMATCH_ERROR',
}

export enum ThresholdType {
  THRESHOLD_TYPE_UNSPECIFIED = 'THRESHOLD_TYPE_UNSPECIFIED',
  THRESHOLD_TYPE_AUTO = 'THRESHOLD_TYPE_AUTO',
  THRESHOLD_TYPE_UNBOUNDED = 'THRESHOLD_TYPE_UNBOUNDED',
  THRESHOLD_TYPE_MANUAL = 'THRESHOLD_TYPE_MANUAL',
}

export interface AnomalyDetectionConfig {
  /** Run id of the last run of the workflow */
  lastRunId?: string | undefined;
  /** The status of the last run of the workflow. */
  latestRunStatus?: AnomalyDetectionRunStatus | undefined;
  /** The type of the last run of the workflow. */
  jobType?: AnomalyDetectionJobType | undefined;
  /** List of fully qualified table names to exclude from anomaly detection. */
  excludedTableFullNames?: string[] | undefined;
  customCheckConfigurations?: CustomCheckConfiguration[] | undefined;
  validityCheckConfigurations?: ValidityCheckConfiguration[] | undefined;
}

export interface ColumnMatcher {
  /** Variable name within a custom sql query that this matcher applies to. */
  variableName?: string | undefined;
  /** List of column names (in target tables) to match. */
  columnNames?: string[] | undefined;
}

export interface CreateQualityMonitorRequest {
  qualityMonitor?: QualityMonitor | undefined;
}

export interface CustomCheckConfiguration {
  scalarCheck?: CustomScalarCheck | undefined;
}

export interface CustomCheckThresholds {
  /** Lower bound threshold */
  lowerBound?: Threshold | undefined;
  /** Upper bound threshold */
  upperBound?: Threshold | undefined;
}

export interface CustomScalarCheck {
  /** Name of the custom check */
  checkName?: string | undefined;
  /** Templated SQL query for this check */
  sqlQuery?: string | undefined;
  /** Column matchers to determine which tables to apply this check to */
  columnMatchers?: ColumnMatcher[] | undefined;
  /** Upper/lower thresholds for the output of the query */
  thresholds?: CustomCheckThresholds | undefined;
}

export interface DeleteQualityMonitorRequest {
  /** The type of the monitored object. Can be one of the following: schema. */
  objectType?: string | undefined;
  /** The uuid of the request object. For example, schema id. */
  objectId?: string | undefined;
}

export interface GetQualityMonitorRequest {
  /** The type of the monitored object. Can be one of the following: schema. */
  objectType?: string | undefined;
  /** The uuid of the request object. For example, schema id. */
  objectId?: string | undefined;
}

export interface ListQualityMonitorRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListQualityMonitorResponse {
  qualityMonitors?: QualityMonitor[] | undefined;
  nextPageToken?: string | undefined;
}

export interface PercentNullValidityCheck {
  /** List of column names to check for null percentage */
  columnNames?: string[] | undefined;
  /** Optional upper bound; we should use auto determined bounds for now */
  upperBound?: number | undefined;
}

export interface QualityMonitor {
  /** The type of the monitored object. Can be one of the following: schema. */
  objectType?: string | undefined;
  /** The uuid of the request object. For example, schema id. */
  objectId?: string | undefined;
  anomalyDetectionConfig?: AnomalyDetectionConfig | undefined;
  /** Validity check configurations for anomaly detection. */
  validityCheckConfigurations?: ValidityCheckConfiguration[] | undefined;
}

export interface RangeValidityCheck {
  /** List of column names to check for range validity */
  columnNames?: string[] | undefined;
  /** Lower bound for the range */
  lowerBound?: number | undefined;
  /** Upper bound for the range */
  upperBound?: number | undefined;
}

export interface Threshold {
  /** Bound value for this threshold. Meaningful only if threshold_type is MANUAL. */
  boundValue?: number | undefined;
  thresholdType?: ThresholdType | undefined;
}

export interface UniquenessValidityCheck {
  /** List of column names to check for uniqueness */
  columnNames?: string[] | undefined;
}

export interface UpdateQualityMonitorRequest {
  /** The type of the monitored object. Can be one of the following: schema. */
  objectType?: string | undefined;
  /** The uuid of the request object. For example, schema id. */
  objectId?: string | undefined;
  qualityMonitor?: QualityMonitor | undefined;
}

export interface ValidityCheckConfiguration {
  /** Can be set by system. Does not need to be user facing. */
  name?: string | undefined;
  percentNullValidityCheck?: PercentNullValidityCheck | undefined;
  rangeValidityCheck?: RangeValidityCheck | undefined;
  uniquenessValidityCheck?: UniquenessValidityCheck | undefined;
}

export const unmarshalAnomalyDetectionConfigSchema = z
  .object({
    last_run_id: z.string().optional(),
    latest_run_status: z.enum(AnomalyDetectionRunStatus).optional(),
    job_type: z.enum(AnomalyDetectionJobType).optional(),
    excluded_table_full_names: z.array(z.string()).optional(),
    custom_check_configurations: z
      .array(z.lazy(() => unmarshalCustomCheckConfigurationSchema))
      .optional(),
    validity_check_configurations: z
      .array(z.lazy(() => unmarshalValidityCheckConfigurationSchema))
      .optional(),
  })
  .transform(d => ({
    lastRunId: d.last_run_id,
    latestRunStatus: d.latest_run_status,
    jobType: d.job_type,
    excludedTableFullNames: d.excluded_table_full_names,
    customCheckConfigurations: d.custom_check_configurations,
    validityCheckConfigurations: d.validity_check_configurations,
  }));

export const unmarshalColumnMatcherSchema = z
  .object({
    variable_name: z.string().optional(),
    column_names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    variableName: d.variable_name,
    columnNames: d.column_names,
  }));

export const unmarshalCreateQualityMonitorRequestSchema = z
  .object({
    quality_monitor: z.lazy(() => unmarshalQualityMonitorSchema).optional(),
  })
  .transform(d => ({
    qualityMonitor: d.quality_monitor,
  }));

export const unmarshalCustomCheckConfigurationSchema = z
  .object({
    scalar_check: z.lazy(() => unmarshalCustomScalarCheckSchema).optional(),
  })
  .transform(d => ({
    scalarCheck: d.scalar_check,
  }));

export const unmarshalCustomCheckThresholdsSchema = z
  .object({
    lower_bound: z.lazy(() => unmarshalThresholdSchema).optional(),
    upper_bound: z.lazy(() => unmarshalThresholdSchema).optional(),
  })
  .transform(d => ({
    lowerBound: d.lower_bound,
    upperBound: d.upper_bound,
  }));

export const unmarshalCustomScalarCheckSchema = z
  .object({
    check_name: z.string().optional(),
    sql_query: z.string().optional(),
    column_matchers: z
      .array(z.lazy(() => unmarshalColumnMatcherSchema))
      .optional(),
    thresholds: z.lazy(() => unmarshalCustomCheckThresholdsSchema).optional(),
  })
  .transform(d => ({
    checkName: d.check_name,
    sqlQuery: d.sql_query,
    columnMatchers: d.column_matchers,
    thresholds: d.thresholds,
  }));

export const unmarshalDeleteQualityMonitorRequestSchema = z
  .object({
    object_type: z.string().optional(),
    object_id: z.string().optional(),
  })
  .transform(d => ({
    objectType: d.object_type,
    objectId: d.object_id,
  }));

export const unmarshalGetQualityMonitorRequestSchema = z
  .object({
    object_type: z.string().optional(),
    object_id: z.string().optional(),
  })
  .transform(d => ({
    objectType: d.object_type,
    objectId: d.object_id,
  }));

export const unmarshalListQualityMonitorRequestSchema = z
  .object({
    page_token: z.string().optional(),
    page_size: z.number().optional(),
  })
  .transform(d => ({
    pageToken: d.page_token,
    pageSize: d.page_size,
  }));

export const unmarshalListQualityMonitorResponseSchema = z
  .object({
    quality_monitors: z
      .array(z.lazy(() => unmarshalQualityMonitorSchema))
      .optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    qualityMonitors: d.quality_monitors,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalPercentNullValidityCheckSchema = z
  .object({
    column_names: z.array(z.string()).optional(),
    upper_bound: z.number().optional(),
  })
  .transform(d => ({
    columnNames: d.column_names,
    upperBound: d.upper_bound,
  }));

export const unmarshalQualityMonitorSchema = z
  .object({
    object_type: z.string().optional(),
    object_id: z.string().optional(),
    anomaly_detection_config: z
      .lazy(() => unmarshalAnomalyDetectionConfigSchema)
      .optional(),
    validity_check_configurations: z
      .array(z.lazy(() => unmarshalValidityCheckConfigurationSchema))
      .optional(),
  })
  .transform(d => ({
    objectType: d.object_type,
    objectId: d.object_id,
    anomalyDetectionConfig: d.anomaly_detection_config,
    validityCheckConfigurations: d.validity_check_configurations,
  }));

export const unmarshalRangeValidityCheckSchema = z
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

export const unmarshalThresholdSchema = z
  .object({
    bound_value: z.number().optional(),
    threshold_type: z.enum(ThresholdType).optional(),
  })
  .transform(d => ({
    boundValue: d.bound_value,
    thresholdType: d.threshold_type,
  }));

export const unmarshalUniquenessValidityCheckSchema = z
  .object({
    column_names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    columnNames: d.column_names,
  }));

export const unmarshalUpdateQualityMonitorRequestSchema = z
  .object({
    object_type: z.string().optional(),
    object_id: z.string().optional(),
    quality_monitor: z.lazy(() => unmarshalQualityMonitorSchema).optional(),
  })
  .transform(d => ({
    objectType: d.object_type,
    objectId: d.object_id,
    qualityMonitor: d.quality_monitor,
  }));

export const unmarshalValidityCheckConfigurationSchema = z
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
    lastRunId: z.string().optional(),
    latestRunStatus: z.enum(AnomalyDetectionRunStatus).optional(),
    jobType: z.enum(AnomalyDetectionJobType).optional(),
    excludedTableFullNames: z.array(z.string()).optional(),
    customCheckConfigurations: z
      .array(z.lazy(() => marshalCustomCheckConfigurationSchema))
      .optional(),
    validityCheckConfigurations: z
      .array(z.lazy(() => marshalValidityCheckConfigurationSchema))
      .optional(),
  })
  .transform(d => ({
    last_run_id: d.lastRunId,
    latest_run_status: d.latestRunStatus,
    job_type: d.jobType,
    excluded_table_full_names: d.excludedTableFullNames,
    custom_check_configurations: d.customCheckConfigurations,
    validity_check_configurations: d.validityCheckConfigurations,
  }));

export const marshalColumnMatcherSchema = z
  .object({
    variableName: z.string().optional(),
    columnNames: z.array(z.string()).optional(),
  })
  .transform(d => ({
    variable_name: d.variableName,
    column_names: d.columnNames,
  }));

export const marshalCreateQualityMonitorRequestSchema = z
  .object({
    qualityMonitor: z.lazy(() => marshalQualityMonitorSchema).optional(),
  })
  .transform(d => ({
    quality_monitor: d.qualityMonitor,
  }));

export const marshalCustomCheckConfigurationSchema = z
  .object({
    scalarCheck: z.lazy(() => marshalCustomScalarCheckSchema).optional(),
  })
  .transform(d => ({
    scalar_check: d.scalarCheck,
  }));

export const marshalCustomCheckThresholdsSchema = z
  .object({
    lowerBound: z.lazy(() => marshalThresholdSchema).optional(),
    upperBound: z.lazy(() => marshalThresholdSchema).optional(),
  })
  .transform(d => ({
    lower_bound: d.lowerBound,
    upper_bound: d.upperBound,
  }));

export const marshalCustomScalarCheckSchema = z
  .object({
    checkName: z.string().optional(),
    sqlQuery: z.string().optional(),
    columnMatchers: z
      .array(z.lazy(() => marshalColumnMatcherSchema))
      .optional(),
    thresholds: z.lazy(() => marshalCustomCheckThresholdsSchema).optional(),
  })
  .transform(d => ({
    check_name: d.checkName,
    sql_query: d.sqlQuery,
    column_matchers: d.columnMatchers,
    thresholds: d.thresholds,
  }));

export const marshalDeleteQualityMonitorRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
  }));

export const marshalGetQualityMonitorRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
  }));

export const marshalListQualityMonitorRequestSchema = z
  .object({
    pageToken: z.string().optional(),
    pageSize: z.number().optional(),
  })
  .transform(d => ({
    page_token: d.pageToken,
    page_size: d.pageSize,
  }));

export const marshalListQualityMonitorResponseSchema = z
  .object({
    qualityMonitors: z
      .array(z.lazy(() => marshalQualityMonitorSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    quality_monitors: d.qualityMonitors,
    next_page_token: d.nextPageToken,
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

export const marshalQualityMonitorSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    anomalyDetectionConfig: z
      .lazy(() => marshalAnomalyDetectionConfigSchema)
      .optional(),
    validityCheckConfigurations: z
      .array(z.lazy(() => marshalValidityCheckConfigurationSchema))
      .optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    anomaly_detection_config: d.anomalyDetectionConfig,
    validity_check_configurations: d.validityCheckConfigurations,
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

export const marshalThresholdSchema = z
  .object({
    boundValue: z.number().optional(),
    thresholdType: z.enum(ThresholdType).optional(),
  })
  .transform(d => ({
    bound_value: d.boundValue,
    threshold_type: d.thresholdType,
  }));

export const marshalUniquenessValidityCheckSchema = z
  .object({
    columnNames: z.array(z.string()).optional(),
  })
  .transform(d => ({
    column_names: d.columnNames,
  }));

export const marshalUpdateQualityMonitorRequestSchema = z
  .object({
    objectType: z.string().optional(),
    objectId: z.string().optional(),
    qualityMonitor: z.lazy(() => marshalQualityMonitorSchema).optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    object_id: d.objectId,
    quality_monitor: d.qualityMonitor,
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
