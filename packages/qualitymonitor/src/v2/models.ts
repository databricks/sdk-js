// Automatically generated. Do not edit.

export type AnomalyDetectionJobType =
  | 'ANOMALY_DETECTION_JOB_TYPE_UNSPECIFIED'
  | 'ANOMALY_DETECTION_JOB_TYPE_NORMAL'
  | 'ANOMALY_DETECTION_JOB_TYPE_INTERNAL_HIDDEN';

/**  Status of Anomaly Detection Job Run
 */
export type AnomalyDetectionRunStatus =
  | 'ANOMALY_DETECTION_RUN_STATUS_UNKNOWN'
  | 'ANOMALY_DETECTION_RUN_STATUS_RUNNING'
  | 'ANOMALY_DETECTION_RUN_STATUS_CANCELED'
  | 'ANOMALY_DETECTION_RUN_STATUS_PENDING'
  | 'ANOMALY_DETECTION_RUN_STATUS_SUCCESS'
  | 'ANOMALY_DETECTION_RUN_STATUS_FAILED'
  | 'ANOMALY_DETECTION_RUN_STATUS_JOB_DELETED'
  | 'ANOMALY_DETECTION_RUN_STATUS_WORKSPACE_MISMATCH_ERROR';

export type ThresholdType =
  | 'THRESHOLD_TYPE_UNSPECIFIED'
  | 'THRESHOLD_TYPE_AUTO'
  | 'THRESHOLD_TYPE_UNBOUNDED'
  | 'THRESHOLD_TYPE_MANUAL';

export interface AnomalyDetectionConfig {
  lastRunId?: string;
  latestRunStatus?: AnomalyDetectionRunStatus;
  jobType?: AnomalyDetectionJobType;
  excludedTableFullNames?: string[];
  customCheckConfigurations?: CustomCheckConfiguration[];
  validityCheckConfigurations?: ValidityCheckConfiguration[];
}

export interface ColumnMatcher {
  variableName?: string;
  columnNames?: string[];
}

export interface CreateQualityMonitorRequest {
  qualityMonitor?: QualityMonitor;
}

export interface CustomCheckConfiguration {
  scalarCheck?: CustomScalarCheck;
}

export interface CustomCheckThresholds {
  lowerBound?: Threshold;
  upperBound?: Threshold;
}

export interface CustomScalarCheck {
  checkName?: string;
  sqlQuery?: string;
  columnMatchers?: ColumnMatcher[];
  thresholds?: CustomCheckThresholds;
}

export interface DeleteQualityMonitorRequest {
  objectType?: string;
  objectId?: string;
}

export interface GetQualityMonitorRequest {
  objectType?: string;
  objectId?: string;
}

export interface ListQualityMonitorRequest {
  pageToken?: string;
  pageSize?: number;
}

export interface ListQualityMonitorResponse {
  qualityMonitors?: QualityMonitor[];
  nextPageToken?: string;
}

export interface PercentNullValidityCheck {
  columnNames?: string[];
  upperBound?: number;
}

export interface QualityMonitor {
  objectType?: string;
  objectId?: string;
  anomalyDetectionConfig?: AnomalyDetectionConfig;
  validityCheckConfigurations?: ValidityCheckConfiguration[];
}

export interface RangeValidityCheck {
  columnNames?: string[];
  lowerBound?: number;
  upperBound?: number;
}

export interface Threshold {
  boundValue?: number;
  thresholdType?: ThresholdType;
}

export interface UniquenessValidityCheck {
  columnNames?: string[];
}

export interface UpdateQualityMonitorRequest {
  objectType?: string;
  objectId?: string;
  qualityMonitor?: QualityMonitor;
}

export interface ValidityCheckConfiguration {
  name?: string;
  percentNullValidityCheck?: PercentNullValidityCheck;
  rangeValidityCheck?: RangeValidityCheck;
  uniquenessValidityCheck?: UniquenessValidityCheck;
}
