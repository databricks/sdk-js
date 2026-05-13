// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

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

export interface AnomalyDetectionConfig {
  /** Run id of the last run of the workflow */
  lastRunId?: string | undefined;
  /** The status of the last run of the workflow. */
  latestRunStatus?: AnomalyDetectionRunStatus | undefined;
  /** List of fully qualified table names to exclude from anomaly detection. */
  excludedTableFullNames?: string[] | undefined;
}

export interface CreateQualityMonitorRequest {
  qualityMonitor?: QualityMonitor | undefined;
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
  checkType?:
    | {
        $case: 'percentNullValidityCheck';
        percentNullValidityCheck: PercentNullValidityCheck;
      }
    | {$case: 'rangeValidityCheck'; rangeValidityCheck: RangeValidityCheck}
    | {
        $case: 'uniquenessValidityCheck';
        uniquenessValidityCheck: UniquenessValidityCheck;
      }
    | undefined;
}

export const unmarshalAnomalyDetectionConfigSchema: z.ZodType<AnomalyDetectionConfig> =
  z
    .object({
      last_run_id: z.string().optional(),
      latest_run_status: z.enum(AnomalyDetectionRunStatus).optional(),
      excluded_table_full_names: z.array(z.string()).optional(),
    })
    .transform(d => ({
      lastRunId: d.last_run_id,
      latestRunStatus: d.latest_run_status,
      excludedTableFullNames: d.excluded_table_full_names,
    }));

export const unmarshalListQualityMonitorResponseSchema: z.ZodType<ListQualityMonitorResponse> =
  z
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

export const unmarshalQualityMonitorSchema: z.ZodType<QualityMonitor> = z
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

export const unmarshalUniquenessValidityCheckSchema: z.ZodType<UniquenessValidityCheck> =
  z
    .object({
      column_names: z.array(z.string()).optional(),
    })
    .transform(d => ({
      columnNames: d.column_names,
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
      checkType:
        d.percent_null_validity_check !== undefined
          ? {
              $case: 'percentNullValidityCheck' as const,
              percentNullValidityCheck: d.percent_null_validity_check,
            }
          : d.range_validity_check !== undefined
            ? {
                $case: 'rangeValidityCheck' as const,
                rangeValidityCheck: d.range_validity_check,
              }
            : d.uniqueness_validity_check !== undefined
              ? {
                  $case: 'uniquenessValidityCheck' as const,
                  uniquenessValidityCheck: d.uniqueness_validity_check,
                }
              : undefined,
    }));

export const marshalAnomalyDetectionConfigSchema: z.ZodType = z
  .object({
    lastRunId: z.string().optional(),
    latestRunStatus: z.enum(AnomalyDetectionRunStatus).optional(),
    excludedTableFullNames: z.array(z.string()).optional(),
  })
  .transform(d => ({
    last_run_id: d.lastRunId,
    latest_run_status: d.latestRunStatus,
    excluded_table_full_names: d.excludedTableFullNames,
  }));

export const marshalPercentNullValidityCheckSchema: z.ZodType = z
  .object({
    columnNames: z.array(z.string()).optional(),
    upperBound: z.number().optional(),
  })
  .transform(d => ({
    column_names: d.columnNames,
    upper_bound: d.upperBound,
  }));

export const marshalQualityMonitorSchema: z.ZodType = z
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

export const marshalRangeValidityCheckSchema: z.ZodType = z
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

export const marshalUniquenessValidityCheckSchema: z.ZodType = z
  .object({
    columnNames: z.array(z.string()).optional(),
  })
  .transform(d => ({
    column_names: d.columnNames,
  }));

export const marshalValidityCheckConfigurationSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    checkType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('percentNullValidityCheck'),
          percentNullValidityCheck: z.lazy(
            () => marshalPercentNullValidityCheckSchema
          ),
        }),
        z.object({
          $case: z.literal('rangeValidityCheck'),
          rangeValidityCheck: z.lazy(() => marshalRangeValidityCheckSchema),
        }),
        z.object({
          $case: z.literal('uniquenessValidityCheck'),
          uniquenessValidityCheck: z.lazy(
            () => marshalUniquenessValidityCheckSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    ...(d.checkType?.$case === 'percentNullValidityCheck' && {
      percent_null_validity_check: d.checkType.percentNullValidityCheck,
    }),
    ...(d.checkType?.$case === 'rangeValidityCheck' && {
      range_validity_check: d.checkType.rangeValidityCheck,
    }),
    ...(d.checkType?.$case === 'uniquenessValidityCheck' && {
      uniqueness_validity_check: d.checkType.uniquenessValidityCheck,
    }),
  }));
