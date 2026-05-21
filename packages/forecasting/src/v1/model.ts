// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';


// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ForecastingExperiment_State {
  /** The forecasting experiment is pending and has not started yet. */
  PENDING = 'PENDING',
  /** The forecasting experiment is currently running. */
  RUNNING = 'RUNNING',
  /** The forecasting experiment has completed successfully. */
  SUCCEEDED = 'SUCCEEDED',
  /** The forecasting experiment has failed. */
  FAILED = 'FAILED',
  /** The forecasting experiment has been cancelled. */
  CANCELLED = 'CANCELLED',
}

export interface CreateForecastingExperimentRequest {
  /** The fully qualified path of a Unity Catalog table, formatted as catalog_name.schema_name.table_name, used as training data for the forecasting model. */
  trainDataPath?: string | undefined;
  /** The column in the input training table used as the prediction target for model training. The values in this column are used as the ground truth for model training. */
  targetColumn?: string | undefined;
  /** The column in the input training table that represents each row's timestamp. */
  timeColumn?: string | undefined;
  /**
   * The time interval between consecutive rows in the time series data.
   * Possible values include: '1 second', '1 minute', '5 minutes', '10 minutes', '15 minutes', '30 minutes', 'Hourly', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'.
   */
  forecastGranularity?: string | undefined;
  /** The number of time steps into the future to make predictions, calculated as a multiple of forecast_granularity. This value represents how far ahead the model should forecast. */
  forecastHorizon?: number | undefined;
  /** The evaluation metric used to optimize the forecasting model. */
  primaryMetric?: string | undefined;
  /** List of frameworks to include for model tuning. Possible values are 'Prophet', 'ARIMA', 'DeepAR'. An empty list includes all supported frameworks. */
  trainingFrameworks?: string[] | undefined;
  /** The path in the workspace to store the created experiment. */
  experimentPath?: string | undefined;
  /** The maximum duration for the experiment in minutes. The experiment stops automatically if it exceeds this limit. */
  maxRuntime?: number | undefined;
  /** // The column in the training table used for custom data splits. Values must be 'train', 'validate', or 'test'. */
  splitColumn?: string | undefined;
  /** The column in the training table used to customize weights for each time series. */
  customWeightsColumn?: string | undefined;
  /** The fully qualified path of a Unity Catalog model, formatted as catalog_name.schema_name.model_name, used to store the best model. */
  registerTo?: string | undefined;
  /** The region code(s) to automatically add holiday features. Currently supports only one region. */
  holidayRegions?: string[] | undefined;
  /** The column in the training table used to group the dataset for predicting individual time series. */
  timeseriesIdentifierColumns?: string[] | undefined;
  /** The fully qualified path of a Unity Catalog table, formatted as catalog_name.schema_name.table_name, used to store predictions. */
  predictionDataPath?: string | undefined;
  /**
   * Specifies the list of feature columns to include in model training. These columns must exist
   * in the training data and be of type string, numerical, or boolean. If not specified, no additional
   * features will be included.
   * Note: Certain columns are automatically handled:
   * - Automatically excluded: split_column, target_column, custom_weights_column.
   * - Automatically included: time_column.
   */
  includeFeatures?: string[] | undefined;
  /** The fully qualified path of a Unity Catalog table, formatted as catalog_name.schema_name.table_name, used to store future feature data for predictions. */
  futureFeatureDataPath?: string | undefined;
}

export interface CreateForecastingExperimentResponse {
  /** The unique ID of the created forecasting experiment */
  experimentId?: string | undefined;
}

/** Represents a forecasting experiment with its unique identifier, URL, and state. */
export interface ForecastingExperiment {
  /** The unique ID for the forecasting experiment. */
  experimentId?: string | undefined;
  /** The URL to the forecasting experiment page. */
  experimentPageUrl?: string | undefined;
  /** The current state of the forecasting experiment. */
  state?: ForecastingExperiment_State | undefined;
}

export interface GetForecastingExperimentRequest {
  /** The unique ID of a forecasting experiment */
  experimentId?: string | undefined;
}

export const unmarshalCreateForecastingExperimentResponseSchema: z.ZodType<CreateForecastingExperimentResponse> = z
  .object({
    experiment_id: z.string().optional(),
  })
  .transform(d => ({
    experimentId: d.experiment_id,
  }));

export const unmarshalForecastingExperimentSchema: z.ZodType<ForecastingExperiment> = z
  .object({
    experiment_id: z.string().optional(),
    experiment_page_url: z.string().optional(),
    state: z.enum(ForecastingExperiment_State).optional(),
  })
  .transform(d => ({
    experimentId: d.experiment_id,
    experimentPageUrl: d.experiment_page_url,
    state: d.state,
  }));

export const marshalCreateForecastingExperimentRequestSchema: z.ZodType = z
  .object({
    trainDataPath: z.string().optional(),
    targetColumn: z.string().optional(),
    timeColumn: z.string().optional(),
    forecastGranularity: z.string().optional(),
    forecastHorizon: z.number().optional(),
    primaryMetric: z.string().optional(),
    trainingFrameworks: z.array(z.string()).optional(),
    experimentPath: z.string().optional(),
    maxRuntime: z.number().optional(),
    splitColumn: z.string().optional(),
    customWeightsColumn: z.string().optional(),
    registerTo: z.string().optional(),
    holidayRegions: z.array(z.string()).optional(),
    timeseriesIdentifierColumns: z.array(z.string()).optional(),
    predictionDataPath: z.string().optional(),
    includeFeatures: z.array(z.string()).optional(),
    futureFeatureDataPath: z.string().optional(),
  })
  .transform(d => ({
    train_data_path: d.trainDataPath,
    target_column: d.targetColumn,
    time_column: d.timeColumn,
    forecast_granularity: d.forecastGranularity,
    forecast_horizon: d.forecastHorizon,
    primary_metric: d.primaryMetric,
    training_frameworks: d.trainingFrameworks,
    experiment_path: d.experimentPath,
    max_runtime: d.maxRuntime,
    split_column: d.splitColumn,
    custom_weights_column: d.customWeightsColumn,
    register_to: d.registerTo,
    holiday_regions: d.holidayRegions,
    timeseries_identifier_columns: d.timeseriesIdentifierColumns,
    prediction_data_path: d.predictionDataPath,
    include_features: d.includeFeatures,
    future_feature_data_path: d.futureFeatureDataPath,
  }));
