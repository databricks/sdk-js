// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * A LoggedModelStatus enum value represents the status of a logged
 * model.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const LoggedModelStatus = {
  LOGGED_MODEL_STATUS_UNSPECIFIED: 'LOGGED_MODEL_STATUS_UNSPECIFIED',
  /**
   * The LoggedModel has been created, but the LoggedModel files are not
   * completely uploaded.
   */
  LOGGED_MODEL_PENDING: 'LOGGED_MODEL_PENDING',
  /** The LoggedModel is created, and the LoggedModel files are completely uploaded. */
  LOGGED_MODEL_READY: 'LOGGED_MODEL_READY',
  /**
   * The LoggedModel is created, but an error occurred when uploading the
   * LoggedModel files such as model weights / agent code.
   */
  LOGGED_MODEL_UPLOAD_FAILED: 'LOGGED_MODEL_UPLOAD_FAILED',
} as const;
export type LoggedModelStatus =
  | (typeof LoggedModelStatus)[keyof typeof LoggedModelStatus]
  | (string & {});

/** Status of a run. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RunStatus = {
  /** Run has been initiated. */
  RUNNING: 'RUNNING',
  /** Run is scheduled to run at a later time. */
  SCHEDULED: 'SCHEDULED',
  /** Run has completed. */
  FINISHED: 'FINISHED',
  /** Run execution failed. */
  FAILED: 'FAILED',
  /** Run killed by user. */
  KILLED: 'KILLED',
} as const;
export type RunStatus =
  | (typeof RunStatus)[keyof typeof RunStatus]
  | (string & {});

/** Qualifier for the view type. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ViewType = {
  /** Default. Return only active. */
  ACTIVE_ONLY: 'ACTIVE_ONLY',
  /** Return only deleted. */
  DELETED_ONLY: 'DELETED_ONLY',
  /** Get all. */
  ALL: 'ALL',
} as const;
export type ViewType = (typeof ViewType)[keyof typeof ViewType] | (string & {});

export interface CreateExperimentRequest {
  /** Experiment name. */
  name?: string | undefined;
  /**
   * Location where all artifacts for the experiment are stored.
   * If not provided, the remote server will select an appropriate default.
   */
  artifactLocation?: string | undefined;
  /**
   * A collection of tags to set on the experiment. Maximum tag size and number of tags per request
   * depends on the storage backend. All storage backends are guaranteed to support tag keys up
   * to 250 bytes in size and tag values up to 5000 bytes in size. All storage backends are also
   * guaranteed to support up to 20 tags per request.
   */
  tags?: ExperimentTag[] | undefined;
  /**
   * The location where the experiment's traces are stored. When set, the
   * underlying storage is provisioned and the experiment's traces are routed
   * to it. When unset, traces are stored in the default MLflow backend. This
   * field cannot be updated after the experiment is created.
   */
  traceLocation?: ExperimentTraceLocation | undefined;
}

export interface CreateExperimentResponse {
  /** Unique identifier for the experiment. */
  experimentId?: string | undefined;
}

export interface CreateLoggedModelRequest {
  /** The ID of the experiment that owns the model. */
  experimentId?: string | undefined;
  /** The name of the model (optional). If not specified one will be generated. */
  name?: string | undefined;
  /** The type of the model, such as ``"Agent"``, ``"Classifier"``, ``"LLM"``. */
  modelType?: string | undefined;
  /** The ID of the run that created the model. */
  sourceRunId?: string | undefined;
  /** Parameters attached to the model. */
  params?: LoggedModelParameter[] | undefined;
  /** Tags attached to the model. */
  tags?: LoggedModelTag[] | undefined;
}

export interface CreateLoggedModelResponse {
  /** The newly created logged model. */
  model?: LoggedModel | undefined;
}

export interface CreateRunRequest {
  /** ID of the associated experiment. */
  experimentId?: string | undefined;
  /**
   * ID of the user executing the run.
   * This field is deprecated as of MLflow 1.0, and will be removed in a future
   * MLflow release. Use 'mlflow.user' tag instead.
   */
  userId?: string | undefined;
  /** The name of the run. */
  runName?: string | undefined;
  /** Unix timestamp in milliseconds of when the run started. */
  startTime?: bigint | undefined;
  /** Additional metadata for run. */
  tags?: RunTag[] | undefined;
}

export interface CreateRunResponse {
  /** The newly created run. */
  run?: Run | undefined;
}

/**
 * Dataset. Represents a reference to data used for training, testing, or evaluation during
 * the model development process.
 */
export interface Dataset {
  /** The name of the dataset. E.g. “my.uc.table@2” “nyc-taxi-dataset”, “fantastic-elk-3” */
  name?: string | undefined;
  /** Dataset digest, e.g. an md5 hash of the dataset that uniquely identifies it within datasets of the same name. */
  digest?: string | undefined;
  /** The type of the dataset source, e.g. ‘databricks-uc-table’, ‘DBFS’, ‘S3’, ... */
  sourceType?: string | undefined;
  /**
   * Source information for the dataset. Note that the source may not exactly reproduce the
   * dataset if it was transformed / modified before use with MLflow.
   */
  source?: string | undefined;
  /**
   * The schema of the dataset. E.g., MLflow ColSpec JSON for a dataframe, MLflow TensorSpec JSON
   * for an ndarray, or another schema format.
   */
  schema?: string | undefined;
  /**
   * The profile of the dataset. Summary statistics for the dataset, such as the number of rows
   * in a table, the mean / std / mode of each column in a table, or the number of elements
   * in an array.
   */
  profile?: string | undefined;
}

/** DatasetInput. Represents a dataset and input tags. */
export interface DatasetInput {
  /** A list of tags for the dataset input, e.g. a “context” tag with value “training” */
  tags?: InputTag[] | undefined;
  /** The dataset being used as a Run input. */
  dataset?: Dataset | undefined;
}

export interface DeleteExperimentRequest {
  /** ID of the associated experiment. */
  experimentId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteExperimentResponse {}

export interface DeleteLoggedModelRequest {
  /** The ID of the logged model to delete. */
  modelId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteLoggedModelResponse {}

export interface DeleteLoggedModelTagRequest {
  /** The ID of the logged model to delete the tag from. */
  modelId?: string | undefined;
  /** The tag key. */
  tagKey?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteLoggedModelTagResponse {}

export interface DeleteRunRequest {
  /** ID of the run to delete. */
  runId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteRunResponse {}

export interface DeleteRunsRequest {
  /** The ID of the experiment containing the runs to delete. */
  experimentId?: string | undefined;
  /**
   * The maximum creation timestamp in milliseconds since the UNIX epoch for deleting runs. Only runs created prior to
   * or at this timestamp are deleted.
   */
  maxTimestampMillis?: bigint | undefined;
  /**
   * An optional positive integer indicating the maximum number of runs to delete. The maximum allowed value for
   * max_runs is 10000.
   */
  maxRuns?: number | undefined;
}

export interface DeleteRunsResponse {
  /** The number of runs deleted. */
  runsDeleted?: number | undefined;
}

export interface DeleteTagRequest {
  /** ID of the run that the tag was logged under. Must be provided. */
  runId?: string | undefined;
  /** Name of the tag. Maximum size is 255 bytes. Must be provided. */
  key?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteTagResponse {}

/** An experiment and its metadata. */
export interface Experiment {
  /** Unique identifier for the experiment. */
  experimentId?: string | undefined;
  /** Human readable name that identifies the experiment. */
  name?: string | undefined;
  /** Location where artifacts for the experiment are stored. */
  artifactLocation?: string | undefined;
  /**
   * Current life cycle stage of the experiment: "active" or "deleted".
   * Deleted experiments are not returned by APIs.
   */
  lifecycleStage?: string | undefined;
  /** Last update time */
  lastUpdateTime?: bigint | undefined;
  /** Creation time */
  creationTime?: bigint | undefined;
  /** Tags: Additional metadata key-value pairs. */
  tags?: ExperimentTag[] | undefined;
  /**
   * The location where the experiment's traces are stored. Unset when traces
   * are stored in the default MLflow backend. This field cannot be updated
   * after the experiment is created.
   */
  traceLocation?: ExperimentTraceLocation | undefined;
}

/** A tag for an experiment. */
export interface ExperimentTag {
  /** The tag key. */
  key?: string | undefined;
  /** The tag value. */
  value?: string | undefined;
}

/** The storage location for an experiment's traces. */
export interface ExperimentTraceLocation {
  location?:
    | {
        $case: 'ucTraceLocation';
        /**
         * A Unity Catalog schema where the experiment's traces are stored as
         * Delta tables.
         */
        ucTraceLocation: UcTraceLocation;
      }
    | undefined;
}

/** Metadata of a single artifact file or directory. */
export interface FileInfo {
  /** The path relative to the root artifact directory run. */
  path?: string | undefined;
  /** Whether the path is a directory. */
  isDir?: boolean | undefined;
  /** The size in bytes of the file. Unset for directories. */
  fileSize?: bigint | undefined;
}

export interface FinalizeLoggedModelRequest {
  /** The ID of the logged model to finalize. */
  modelId?: string | undefined;
  /**
   * Whether or not the model is ready for use. ``"LOGGED_MODEL_UPLOAD_FAILED"`` indicates that something went wrong
   * when logging the model weights / agent code.
   */
  status?: LoggedModelStatus | undefined;
}

export interface FinalizeLoggedModelResponse {
  /** The updated logged model. */
  model?: LoggedModel | undefined;
}

export interface GetExperimentByNameRequest {
  /** Name of the associated experiment. */
  experimentName?: string | undefined;
}

export interface GetExperimentByNameResponse {
  /** Experiment details. */
  experiment?: Experiment | undefined;
}

export interface GetExperimentRequest {
  /** ID of the associated experiment. */
  experimentId?: string | undefined;
}

export interface GetExperimentResponse {
  /** Experiment details. */
  experiment?: Experiment | undefined;
  /**
   * A collection of active runs in the experiment. Note: this may not contain
   * all of the experiment's active runs.
   *
   * This field is deprecated. Please use the "Search Runs" API to fetch
   * runs within an experiment.
   */
  runs?: RunInfo[] | undefined;
}

export interface GetLoggedModelRequest {
  /** The ID of the logged model to retrieve. */
  modelId?: string | undefined;
}

export interface GetLoggedModelResponse {
  /** The retrieved logged model. */
  model?: LoggedModel | undefined;
}

export interface GetMetricHistoryResponse {
  /**
   * All logged values for this metric if `max_results` is not specified in the request or if the total count of
   * metrics returned is less than the service level pagination threshold. Otherwise, this is one page of results.
   */
  metrics?: Metric[] | undefined;
  /**
   * A token that can be used to issue a query for the next page of metric history values. A missing token indicates
   * that no additional metrics are available to fetch.
   */
  nextPageToken?: string | undefined;
}

export interface GetRunRequest {
  /** ID of the run to fetch. Must be provided. */
  runId?: string | undefined;
  /**
   * [Deprecated, use `run_id` instead] ID of the run to fetch. This field will
   * be removed in a future MLflow version.
   */
  runUuid?: string | undefined;
}

export interface GetRunResponse {
  /** Run metadata (name, start time, etc) and data (metrics, params, and tags). */
  run?: Run | undefined;
}

/** Tag for a dataset input. */
export interface InputTag {
  /** The tag key. */
  key?: string | undefined;
  /** The tag value. */
  value?: string | undefined;
}

export interface ListArtifactsRequest {
  /** ID of the run whose artifacts to list. Must be provided. */
  runId?: string | undefined;
  /**
   * [Deprecated, use `run_id` instead] ID of the run whose artifacts to list. This field will
   * be removed in a future MLflow version.
   */
  runUuid?: string | undefined;
  /** Filter artifacts matching this path (a relative path from the root artifact directory). */
  path?: string | undefined;
  /**
   * The token indicating the page of artifact results to fetch. `page_token` is not supported when listing artifacts in UC
   * Volumes. A maximum of 1000 artifacts will be retrieved for UC Volumes. Please call
   * `/api/2.0/fs/directories{directory_path}` for listing artifacts in UC Volumes, which supports pagination. See [List
   * directory contents | Files API](/api/workspace/files/listdirectorycontents).
   */
  pageToken?: string | undefined;
}

export interface ListArtifactsResponse {
  /** The root artifact directory for the run. */
  rootUri?: string | undefined;
  /** The file location and metadata for artifacts. */
  files?: FileInfo[] | undefined;
  /** The token that can be used to retrieve the next page of artifact results. */
  nextPageToken?: string | undefined;
}

export interface ListExperimentsRequest {
  /**
   * Qualifier for type of experiments to be returned.
   * If unspecified, return only active experiments.
   */
  viewType?: ViewType | undefined;
  /**
   * Maximum number of experiments desired.
   * If `max_results` is unspecified, return all experiments.
   * If `max_results` is too large, it'll be automatically capped at 1000.
   * Callers of this endpoint are encouraged to pass max_results explicitly and leverage
   * page_token to iterate through experiments.
   */
  maxResults?: bigint | undefined;
  /** Token indicating the page of experiments to fetch */
  pageToken?: string | undefined;
}

export interface ListExperimentsResponse {
  /** Paginated Experiments beginning with the first item on the requested page. */
  experiments?: Experiment[] | undefined;
  /**
   * Token that can be used to retrieve the next page of experiments.
   * Empty token means no more experiment is available for retrieval.
   */
  nextPageToken?: string | undefined;
}

export interface ListMetricHistoryRequest {
  /** ID of the run from which to fetch metric values. Must be provided. */
  runId?: string | undefined;
  /**
   * [Deprecated, use `run_id` instead] ID of the run from which to fetch metric values. This field
   * will be removed in a future MLflow version.
   */
  runUuid?: string | undefined;
  /** Name of the metric. */
  metricKey?: string | undefined;
  /** Token indicating the page of metric histories to fetch. */
  pageToken?: string | undefined;
  /**
   * Maximum number of Metric records to return per paginated request. Default is set to 25,000. If set higher than
   * 25,000, a request Exception will be raised.
   */
  maxResults?: number | undefined;
}

export interface LogBatchRequest {
  /** ID of the run to log under */
  runId?: string | undefined;
  /**
   * Metrics to log. A single request can contain up to 1000 metrics, and up to 1000
   * metrics, params, and tags in total.
   */
  metrics?: Metric[] | undefined;
  /**
   * Params to log. A single request can contain up to 100 params, and up to 1000
   * metrics, params, and tags in total.
   */
  params?: Param[] | undefined;
  /**
   * Tags to log. A single request can contain up to 100 tags, and up to 1000
   * metrics, params, and tags in total.
   */
  tags?: RunTag[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogBatchResponse {}

export interface LogInputsRequest {
  /** ID of the run to log under */
  runId?: string | undefined;
  /** Dataset inputs */
  datasets?: DatasetInput[] | undefined;
  /** Model inputs */
  models?: ModelInput[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogInputsResponse {}

export interface LogLoggedModelParamsRequest {
  /** The ID of the logged model to log params for. */
  modelId?: string | undefined;
  /** Parameters to attach to the model. */
  params?: LoggedModelParameter[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogLoggedModelParamsResponse {}

export interface LogMetricRequest {
  /** ID of the run under which to log the metric. Must be provided. */
  runId?: string | undefined;
  /**
   * [Deprecated, use `run_id` instead] ID of the run under which to log the metric. This field will
   * be removed in a future MLflow version.
   */
  runUuid?: string | undefined;
  /** Name of the metric. */
  key?: string | undefined;
  /** Double value of the metric being logged. */
  value?: number | undefined;
  /** Unix timestamp in milliseconds at the time metric was logged. */
  timestamp?: bigint | undefined;
  /** Step at which to log the metric */
  step?: bigint | undefined;
  /** ID of the logged model associated with the metric, if applicable */
  modelId?: string | undefined;
  /**
   * The name of the dataset associated with the metric.
   * E.g. “my.uc.table@2” “nyc-taxi-dataset”, “fantastic-elk-3”
   */
  datasetName?: string | undefined;
  /**
   * Dataset digest of the dataset associated with the metric,
   * e.g. an md5 hash of the dataset that uniquely identifies it
   * within datasets of the same name.
   */
  datasetDigest?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogMetricResponse {}

export interface LogModelRequest {
  /** ID of the run to log under */
  runId?: string | undefined;
  /** MLmodel file in json format. */
  modelJson?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogModelResponse {}

export interface LogOutputsRequest {
  /** The ID of the Run from which to log outputs. */
  runId?: string | undefined;
  /** The model outputs from the Run. */
  models?: ModelOutput[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogOutputsResponse {}

export interface LogParamRequest {
  /** ID of the run under which to log the param. Must be provided. */
  runId?: string | undefined;
  /**
   * [Deprecated, use `run_id` instead] ID of the run under which to log the param. This field will
   * be removed in a future MLflow version.
   */
  runUuid?: string | undefined;
  /** Name of the param. Maximum size is 255 bytes. */
  key?: string | undefined;
  /** String value of the param being logged. Maximum size is 500 bytes. */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogParamResponse {}

/**
 * A logged model message includes logged model attributes,
 * tags, registration info, params, and linked run metrics.
 */
export interface LoggedModel {
  /** The logged model attributes such as model ID, status, tags, etc. */
  info?: LoggedModelInfo | undefined;
  /** The params and metrics attached to the logged model. */
  data?: LoggedModelData | undefined;
}

/** A LoggedModelData message includes logged model params and linked metrics. */
export interface LoggedModelData {
  /** Immutable string key-value pairs of the model. */
  params?: LoggedModelParameter[] | undefined;
  /** Performance metrics linked to the model. */
  metrics?: Metric[] | undefined;
}

/**
 * A LoggedModelInfo includes logged model attributes,
 * tags, and registration info.
 */
export interface LoggedModelInfo {
  /** The unique identifier for the logged model. */
  modelId?: string | undefined;
  /** The ID of the experiment that owns the model. */
  experimentId?: string | undefined;
  /** The name of the model. */
  name?: string | undefined;
  /** The timestamp when the model was created in milliseconds since the UNIX epoch. */
  creationTimestampMs?: bigint | undefined;
  /** The timestamp when the model was last updated in milliseconds since the UNIX epoch. */
  lastUpdatedTimestampMs?: bigint | undefined;
  /** The URI of the directory where model artifacts are stored. */
  artifactUri?: string | undefined;
  /** The status of whether or not the model is ready for use. */
  status?: LoggedModelStatus | undefined;
  /** The ID of the user or principal that created the model. */
  creatorId?: bigint | undefined;
  /** The type of model, such as ``"Agent"``, ``"Classifier"``, ``"LLM"``. */
  modelType?: string | undefined;
  /** The ID of the run that created the model. */
  sourceRunId?: string | undefined;
  /** Details on the current model status. */
  statusMessage?: string | undefined;
  /** Mutable string key-value pairs set on the model. */
  tags?: LoggedModelTag[] | undefined;
}

/** Parameter associated with a LoggedModel. */
export interface LoggedModelParameter {
  /** The key identifying this param. */
  key?: string | undefined;
  /** The value of this param. */
  value?: string | undefined;
}

/** Tag for a LoggedModel. */
export interface LoggedModelTag {
  /** The tag key. */
  key?: string | undefined;
  /** The tag value. */
  value?: string | undefined;
}

/** Metric associated with a run, represented as a key-value pair. */
export interface Metric {
  /** The key identifying the metric. */
  key?: string | undefined;
  /** The value of the metric. */
  value?: number | undefined;
  /** The timestamp at which the metric was recorded. */
  timestamp?: bigint | undefined;
  /** The step at which the metric was logged. */
  step?: bigint | undefined;
  /**
   * The name of the dataset associated with the metric.
   * E.g. “my.uc.table@2” “nyc-taxi-dataset”, “fantastic-elk-3”
   */
  datasetName?: string | undefined;
  /**
   * The dataset digest of the dataset associated with the metric,
   * e.g. an md5 hash of the dataset that uniquely identifies it
   * within datasets of the same name.
   */
  datasetDigest?: string | undefined;
  /**
   * The ID of the logged model or registered model version associated with
   * the metric, if applicable.
   */
  modelId?: string | undefined;
  /** The ID of the run containing the metric. */
  runId?: string | undefined;
}

/** Represents a LoggedModel or Registered Model Version input to a Run. */
export interface ModelInput {
  /** The unique identifier of the model. */
  modelId?: string | undefined;
}

/** Represents a LoggedModel output of a Run. */
export interface ModelOutput {
  /** The unique identifier of the model. */
  modelId?: string | undefined;
  /** The step at which the model was produced. */
  step?: bigint | undefined;
}

/** Param associated with a run. */
export interface Param {
  /** Key identifying this param. */
  key?: string | undefined;
  /** Value associated with this param. */
  value?: string | undefined;
}

export interface RestoreExperimentRequest {
  /** ID of the associated experiment. */
  experimentId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RestoreExperimentResponse {}

export interface RestoreRunRequest {
  /** ID of the run to restore. */
  runId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RestoreRunResponse {}

export interface RestoreRunsRequest {
  /** The ID of the experiment containing the runs to restore. */
  experimentId?: string | undefined;
  /**
   * The minimum deletion timestamp in milliseconds since the UNIX epoch for restoring runs. Only runs deleted no
   * earlier than this timestamp are restored.
   */
  minTimestampMillis?: bigint | undefined;
  /**
   * An optional positive integer indicating the maximum number of runs to restore. The maximum allowed value for
   * max_runs is 10000.
   */
  maxRuns?: number | undefined;
}

export interface RestoreRunsResponse {
  /** The number of runs restored. */
  runsRestored?: number | undefined;
}

/** A single run. */
export interface Run {
  /** Run metadata. */
  info?: RunInfo | undefined;
  /** Run data. */
  data?: RunData | undefined;
  /** Run inputs. */
  inputs?: RunInputs | undefined;
}

/** Run data (metrics, params, and tags). */
export interface RunData {
  /** Run metrics. */
  metrics?: Metric[] | undefined;
  /** Run parameters. */
  params?: Param[] | undefined;
  /** Additional metadata key-value pairs. */
  tags?: RunTag[] | undefined;
}

/** Metadata of a single run. */
export interface RunInfo {
  /** Unique identifier for the run. */
  runId?: string | undefined;
  /**
   * [Deprecated, use run_id instead] Unique identifier for the run. This field will
   * be removed in a future MLflow version.
   */
  runUuid?: string | undefined;
  /** The experiment ID. */
  experimentId?: string | undefined;
  /** The name of the run. */
  runName?: string | undefined;
  /**
   * User who initiated the run.
   * This field is deprecated as of MLflow 1.0, and will be removed in a future
   * MLflow release. Use 'mlflow.user' tag instead.
   */
  userId?: string | undefined;
  /** Current status of the run. */
  status?: RunStatus | undefined;
  /** Unix timestamp of when the run started in milliseconds. */
  startTime?: bigint | undefined;
  /** Unix timestamp of when the run ended in milliseconds. */
  endTime?: bigint | undefined;
  /**
   * URI of the directory where artifacts should be uploaded.
   * This can be a local path (starting with "/"), or a distributed file system (DFS)
   * path, like ``s3://bucket/directory`` or ``dbfs:/my/directory``.
   * If not set, the local ``./mlruns`` directory is  chosen.
   */
  artifactUri?: string | undefined;
  /** Current life cycle stage of the experiment : OneOf("active", "deleted") */
  lifecycleStage?: string | undefined;
}

/** Run inputs. */
export interface RunInputs {
  /** Run metrics. */
  datasetInputs?: DatasetInput[] | undefined;
  /** Model inputs to the Run. */
  modelInputs?: ModelInput[] | undefined;
}

/** Tag for a run. */
export interface RunTag {
  /** The tag key. */
  key?: string | undefined;
  /** The tag value. */
  value?: string | undefined;
}

export interface SearchExperimentsRequest {
  /** Maximum number of experiments desired. Max threshold is 3000. */
  maxResults?: bigint | undefined;
  /** Token indicating the page of experiments to fetch */
  pageToken?: string | undefined;
  /** String representing a SQL filter condition (e.g. "name ILIKE 'my-experiment%'") */
  filter?: string | undefined;
  /**
   * List of columns for ordering search results, which can include experiment name and last updated
   * timestamp with an optional "DESC" or "ASC" annotation, where "ASC" is the default.
   * Tiebreaks are done by experiment id DESC.
   */
  orderBy?: string[] | undefined;
  /**
   * Qualifier for type of experiments to be returned.
   * If unspecified, return only active experiments.
   */
  viewType?: ViewType | undefined;
}

export interface SearchExperimentsResponse {
  /** Experiments that match the search criteria */
  experiments?: Experiment[] | undefined;
  /**
   * Token that can be used to retrieve the next page of experiments.
   * An empty token means that no more experiments are available for retrieval.
   */
  nextPageToken?: string | undefined;
}

export interface SearchLoggedModelsRequest {
  /** The IDs of the experiments in which to search for logged models. */
  experimentIds?: string[] | undefined;
  /**
   * A filter expression over logged model info and data that allows returning a subset of
   * logged models. The syntax is a subset of SQL that supports AND'ing together binary operations.
   *
   * Example: ``params.alpha < 0.3 AND metrics.accuracy > 0.9``.
   */
  filter?: string | undefined;
  /**
   * List of datasets on which to apply the metrics filter clauses.
   * For example, a filter with `metrics.accuracy > 0.9` and dataset info with name "test_dataset"
   * means we will return all logged models with accuracy > 0.9 on the test_dataset.
   * Metric values from ANY dataset matching the criteria are considered.
   * If no datasets are specified, then metrics across all datasets are considered in the filter.
   */
  datasets?: SearchLoggedModelsRequest_Dataset[] | undefined;
  /** The maximum number of Logged Models to return. The maximum limit is 50. */
  maxResults?: number | undefined;
  /** The list of columns for ordering the results, with additional fields for sorting criteria. */
  orderBy?: SearchLoggedModelsRequest_OrderBy[] | undefined;
  /** The token indicating the page of logged models to fetch. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SearchLoggedModelsRequest_Dataset {
  /** The name of the dataset. */
  datasetName?: string | undefined;
  /** The digest of the dataset. */
  datasetDigest?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SearchLoggedModelsRequest_OrderBy {
  /** The name of the field to order by, e.g. "metrics.accuracy". */
  fieldName?: string | undefined;
  /** Whether the search results order is ascending or not. */
  ascending?: boolean | undefined;
  /**
   * If ``field_name`` refers to a metric, this field specifies the name of the dataset
   * associated with the metric. Only metrics associated with the specified dataset name will be
   * considered for ordering. This field may only be set if ``field_name`` refers to a metric.
   */
  datasetName?: string | undefined;
  /**
   * If ``field_name`` refers to a metric, this field specifies the digest of the dataset
   * associated with the metric. Only metrics associated with the specified dataset name
   * and digest will be considered for ordering. This field may only be set if ``dataset_name``
   * is also set.
   */
  datasetDigest?: string | undefined;
}

export interface SearchLoggedModelsResponse {
  /** Logged models that match the search criteria. */
  models?: LoggedModel[] | undefined;
  /** The token that can be used to retrieve the next page of logged models. */
  nextPageToken?: string | undefined;
}

export interface SearchRunsRequest {
  /** List of experiment IDs to search over. */
  experimentIds?: string[] | undefined;
  /**
   * A filter expression over params, metrics, and tags, that allows returning a subset of
   * runs. The syntax is a subset of SQL that supports ANDing together binary operations
   * between a param, metric, or tag and a constant.
   *
   * Example: `metrics.rmse < 1 and params.model_class = 'LogisticRegression'`
   *
   * You can select columns with special characters (hyphen, space, period, etc.) by using double quotes:
   * `metrics."model class" = 'LinearRegression' and tags."user-name" = 'Tomas'`
   *
   * Supported operators are `=`, `!=`, `>`, `>=`, `<`, and `<=`.
   */
  filter?: string | undefined;
  /**
   * Whether to display only active, only deleted, or all runs.
   * Defaults to only active runs.
   */
  runViewType?: ViewType | undefined;
  /** Maximum number of runs desired. Max threshold is 50000 */
  maxResults?: number | undefined;
  /**
   * List of columns to be ordered by, including attributes, params, metrics, and tags with an
   * optional `"DESC"` or `"ASC"` annotation, where `"ASC"` is the default.
   * Example: `["params.input DESC", "metrics.alpha ASC", "metrics.rmse"]`.
   * Tiebreaks are done by start_time `DESC` followed by `run_id` for runs with the same start time
   * (and this is the default ordering criterion if order_by is not provided).
   */
  orderBy?: string[] | undefined;
  /** Token for the current page of runs. */
  pageToken?: string | undefined;
}

export interface SearchRunsResponse {
  /** Runs that match the search criteria. */
  runs?: Run[] | undefined;
  /** Token for the next page of runs. */
  nextPageToken?: string | undefined;
}

export interface SetExperimentTagRequest {
  /** ID of the experiment under which to log the tag. Must be provided. */
  experimentId?: string | undefined;
  /** Name of the tag. Keys up to 250 bytes in size are supported. */
  key?: string | undefined;
  /** String value of the tag being logged. Values up to 64KB in size are supported. */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SetExperimentTagResponse {}

export interface SetLoggedModelTagsRequest {
  /** The ID of the logged model to set the tags on. */
  modelId?: string | undefined;
  /** The tags to set on the logged model. */
  tags?: LoggedModelTag[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SetLoggedModelTagsResponse {}

export interface SetTagRequest {
  /** ID of the run under which to log the tag. Must be provided. */
  runId?: string | undefined;
  /**
   * [Deprecated, use `run_id` instead] ID of the run under which to log the tag. This field will
   * be removed in a future MLflow version.
   */
  runUuid?: string | undefined;
  /** Name of the tag. Keys up to 250 bytes in size are supported. */
  key?: string | undefined;
  /** String value of the tag being logged. Values up to 64KB in size are supported. */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SetTagResponse {}

/**
 * A Unity Catalog trace storage location. Traces are stored as Delta tables
 * in the specified catalog and schema.
 */
export interface UcTraceLocation {
  /** The name of the Unity Catalog catalog. */
  catalog?: string | undefined;
  /** The name of the Unity Catalog schema within `catalog`. */
  schema?: string | undefined;
  /**
   * The prefix for the trace tables, which are named
   * `{catalog}.{schema}.{table_prefix}_otel_*`. May only contain letters,
   * digits, and underscores, and may be at most 238 characters. When unset, a
   * server-generated prefix derived from the experiment ID is used and this
   * field stays empty on read; the resolved value is always available in
   * `effective_table_prefix`.
   */
  tablePrefix?: string | undefined;
  /**
   * The trace-table prefix actually in effect: `table_prefix` if it was set on
   * creation, otherwise the server-generated default.
   */
  effectiveTablePrefix?: string | undefined;
}

export interface UpdateExperimentRequest {
  /** ID of the associated experiment. */
  experimentId?: string | undefined;
  /** If provided, the experiment's name is changed to the new name. The new name must be unique. */
  newName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateExperimentResponse {}

export interface UpdateRunRequest {
  /** ID of the run to update. Must be provided. */
  runId?: string | undefined;
  /**
   * [Deprecated, use `run_id` instead] ID of the run to update. This field will
   * be removed in a future MLflow version.
   */
  runUuid?: string | undefined;
  /** Updated status of the run. */
  status?: RunStatus | undefined;
  /** Unix timestamp in milliseconds of when the run ended. */
  endTime?: bigint | undefined;
  /** Updated name of the run. */
  runName?: string | undefined;
}

export interface UpdateRunResponse {
  /** Updated metadata of the run. */
  runInfo?: RunInfo | undefined;
}

export const unmarshalCreateExperimentResponseSchema: z.ZodType<CreateExperimentResponse> =
  z
    .object({
      experiment_id: z.string().optional(),
    })
    .transform(d => ({
      experimentId: d.experiment_id,
    }));

export const unmarshalCreateLoggedModelResponseSchema: z.ZodType<CreateLoggedModelResponse> =
  z
    .object({
      model: z.lazy(() => unmarshalLoggedModelSchema).optional(),
    })
    .transform(d => ({
      model: d.model,
    }));

export const unmarshalCreateRunResponseSchema: z.ZodType<CreateRunResponse> = z
  .object({
    run: z.lazy(() => unmarshalRunSchema).optional(),
  })
  .transform(d => ({
    run: d.run,
  }));

export const unmarshalDatasetSchema: z.ZodType<Dataset> = z
  .object({
    name: z.string().optional(),
    digest: z.string().optional(),
    source_type: z.string().optional(),
    source: z.string().optional(),
    schema: z.string().optional(),
    profile: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    digest: d.digest,
    sourceType: d.source_type,
    source: d.source,
    schema: d.schema,
    profile: d.profile,
  }));

export const unmarshalDatasetInputSchema: z.ZodType<DatasetInput> = z
  .object({
    tags: z.array(z.lazy(() => unmarshalInputTagSchema)).optional(),
    dataset: z.lazy(() => unmarshalDatasetSchema).optional(),
  })
  .transform(d => ({
    tags: d.tags,
    dataset: d.dataset,
  }));

export const unmarshalDeleteExperimentResponseSchema: z.ZodType<DeleteExperimentResponse> =
  z.object({});

export const unmarshalDeleteLoggedModelResponseSchema: z.ZodType<DeleteLoggedModelResponse> =
  z.object({});

export const unmarshalDeleteLoggedModelTagResponseSchema: z.ZodType<DeleteLoggedModelTagResponse> =
  z.object({});

export const unmarshalDeleteRunResponseSchema: z.ZodType<DeleteRunResponse> =
  z.object({});

export const unmarshalDeleteRunsResponseSchema: z.ZodType<DeleteRunsResponse> =
  z
    .object({
      runs_deleted: z.number().optional(),
    })
    .transform(d => ({
      runsDeleted: d.runs_deleted,
    }));

export const unmarshalDeleteTagResponseSchema: z.ZodType<DeleteTagResponse> =
  z.object({});

export const unmarshalExperimentSchema: z.ZodType<Experiment> = z
  .object({
    experiment_id: z.string().optional(),
    name: z.string().optional(),
    artifact_location: z.string().optional(),
    lifecycle_stage: z.string().optional(),
    last_update_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    creation_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    tags: z.array(z.lazy(() => unmarshalExperimentTagSchema)).optional(),
    trace_location: z
      .lazy(() => unmarshalExperimentTraceLocationSchema)
      .optional(),
  })
  .transform(d => ({
    experimentId: d.experiment_id,
    name: d.name,
    artifactLocation: d.artifact_location,
    lifecycleStage: d.lifecycle_stage,
    lastUpdateTime: d.last_update_time,
    creationTime: d.creation_time,
    tags: d.tags,
    traceLocation: d.trace_location,
  }));

export const unmarshalExperimentTagSchema: z.ZodType<ExperimentTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalExperimentTraceLocationSchema: z.ZodType<ExperimentTraceLocation> =
  z
    .object({
      uc_trace_location: z
        .lazy(() => unmarshalUcTraceLocationSchema)
        .optional(),
    })
    .transform(d => ({
      location:
        d.uc_trace_location !== undefined
          ? {
              $case: 'ucTraceLocation' as const,
              ucTraceLocation: d.uc_trace_location,
            }
          : undefined,
    }));

export const unmarshalFileInfoSchema: z.ZodType<FileInfo> = z
  .object({
    path: z.string().optional(),
    is_dir: z.boolean().optional(),
    file_size: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    path: d.path,
    isDir: d.is_dir,
    fileSize: d.file_size,
  }));

export const unmarshalFinalizeLoggedModelResponseSchema: z.ZodType<FinalizeLoggedModelResponse> =
  z
    .object({
      model: z.lazy(() => unmarshalLoggedModelSchema).optional(),
    })
    .transform(d => ({
      model: d.model,
    }));

export const unmarshalGetExperimentByNameResponseSchema: z.ZodType<GetExperimentByNameResponse> =
  z
    .object({
      experiment: z.lazy(() => unmarshalExperimentSchema).optional(),
    })
    .transform(d => ({
      experiment: d.experiment,
    }));

export const unmarshalGetExperimentResponseSchema: z.ZodType<GetExperimentResponse> =
  z
    .object({
      experiment: z.lazy(() => unmarshalExperimentSchema).optional(),
      runs: z.array(z.lazy(() => unmarshalRunInfoSchema)).optional(),
    })
    .transform(d => ({
      experiment: d.experiment,
      runs: d.runs,
    }));

export const unmarshalGetLoggedModelResponseSchema: z.ZodType<GetLoggedModelResponse> =
  z
    .object({
      model: z.lazy(() => unmarshalLoggedModelSchema).optional(),
    })
    .transform(d => ({
      model: d.model,
    }));

export const unmarshalGetMetricHistoryResponseSchema: z.ZodType<GetMetricHistoryResponse> =
  z
    .object({
      metrics: z.array(z.lazy(() => unmarshalMetricSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      metrics: d.metrics,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalGetRunResponseSchema: z.ZodType<GetRunResponse> = z
  .object({
    run: z.lazy(() => unmarshalRunSchema).optional(),
  })
  .transform(d => ({
    run: d.run,
  }));

export const unmarshalInputTagSchema: z.ZodType<InputTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalListArtifactsResponseSchema: z.ZodType<ListArtifactsResponse> =
  z
    .object({
      root_uri: z.string().optional(),
      files: z.array(z.lazy(() => unmarshalFileInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      rootUri: d.root_uri,
      files: d.files,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListExperimentsResponseSchema: z.ZodType<ListExperimentsResponse> =
  z
    .object({
      experiments: z.array(z.lazy(() => unmarshalExperimentSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      experiments: d.experiments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalLogBatchResponseSchema: z.ZodType<LogBatchResponse> =
  z.object({});

export const unmarshalLogInputsResponseSchema: z.ZodType<LogInputsResponse> =
  z.object({});

export const unmarshalLogLoggedModelParamsResponseSchema: z.ZodType<LogLoggedModelParamsResponse> =
  z.object({});

export const unmarshalLogMetricResponseSchema: z.ZodType<LogMetricResponse> =
  z.object({});

export const unmarshalLogModelResponseSchema: z.ZodType<LogModelResponse> =
  z.object({});

export const unmarshalLogOutputsResponseSchema: z.ZodType<LogOutputsResponse> =
  z.object({});

export const unmarshalLogParamResponseSchema: z.ZodType<LogParamResponse> =
  z.object({});

export const unmarshalLoggedModelSchema: z.ZodType<LoggedModel> = z
  .object({
    info: z.lazy(() => unmarshalLoggedModelInfoSchema).optional(),
    data: z.lazy(() => unmarshalLoggedModelDataSchema).optional(),
  })
  .transform(d => ({
    info: d.info,
    data: d.data,
  }));

export const unmarshalLoggedModelDataSchema: z.ZodType<LoggedModelData> = z
  .object({
    params: z
      .array(z.lazy(() => unmarshalLoggedModelParameterSchema))
      .optional(),
    metrics: z.array(z.lazy(() => unmarshalMetricSchema)).optional(),
  })
  .transform(d => ({
    params: d.params,
    metrics: d.metrics,
  }));

export const unmarshalLoggedModelInfoSchema: z.ZodType<LoggedModelInfo> = z
  .object({
    model_id: z.string().optional(),
    experiment_id: z.string().optional(),
    name: z.string().optional(),
    creation_timestamp_ms: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    last_updated_timestamp_ms: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    artifact_uri: z.string().optional(),
    status: z.string().optional(),
    creator_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    model_type: z.string().optional(),
    source_run_id: z.string().optional(),
    status_message: z.string().optional(),
    tags: z.array(z.lazy(() => unmarshalLoggedModelTagSchema)).optional(),
  })
  .transform(d => ({
    modelId: d.model_id,
    experimentId: d.experiment_id,
    name: d.name,
    creationTimestampMs: d.creation_timestamp_ms,
    lastUpdatedTimestampMs: d.last_updated_timestamp_ms,
    artifactUri: d.artifact_uri,
    status: d.status,
    creatorId: d.creator_id,
    modelType: d.model_type,
    sourceRunId: d.source_run_id,
    statusMessage: d.status_message,
    tags: d.tags,
  }));

export const unmarshalLoggedModelParameterSchema: z.ZodType<LoggedModelParameter> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalLoggedModelTagSchema: z.ZodType<LoggedModelTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalMetricSchema: z.ZodType<Metric> = z
  .object({
    key: z.string().optional(),
    value: z.number().optional(),
    timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    step: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    dataset_name: z.string().optional(),
    dataset_digest: z.string().optional(),
    model_id: z.string().optional(),
    run_id: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
    timestamp: d.timestamp,
    step: d.step,
    datasetName: d.dataset_name,
    datasetDigest: d.dataset_digest,
    modelId: d.model_id,
    runId: d.run_id,
  }));

export const unmarshalModelInputSchema: z.ZodType<ModelInput> = z
  .object({
    model_id: z.string().optional(),
  })
  .transform(d => ({
    modelId: d.model_id,
  }));

export const unmarshalParamSchema: z.ZodType<Param> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalRestoreExperimentResponseSchema: z.ZodType<RestoreExperimentResponse> =
  z.object({});

export const unmarshalRestoreRunResponseSchema: z.ZodType<RestoreRunResponse> =
  z.object({});

export const unmarshalRestoreRunsResponseSchema: z.ZodType<RestoreRunsResponse> =
  z
    .object({
      runs_restored: z.number().optional(),
    })
    .transform(d => ({
      runsRestored: d.runs_restored,
    }));

export const unmarshalRunSchema: z.ZodType<Run> = z
  .object({
    info: z.lazy(() => unmarshalRunInfoSchema).optional(),
    data: z.lazy(() => unmarshalRunDataSchema).optional(),
    inputs: z.lazy(() => unmarshalRunInputsSchema).optional(),
  })
  .transform(d => ({
    info: d.info,
    data: d.data,
    inputs: d.inputs,
  }));

export const unmarshalRunDataSchema: z.ZodType<RunData> = z
  .object({
    metrics: z.array(z.lazy(() => unmarshalMetricSchema)).optional(),
    params: z.array(z.lazy(() => unmarshalParamSchema)).optional(),
    tags: z.array(z.lazy(() => unmarshalRunTagSchema)).optional(),
  })
  .transform(d => ({
    metrics: d.metrics,
    params: d.params,
    tags: d.tags,
  }));

export const unmarshalRunInfoSchema: z.ZodType<RunInfo> = z
  .object({
    run_id: z.string().optional(),
    run_uuid: z.string().optional(),
    experiment_id: z.string().optional(),
    run_name: z.string().optional(),
    user_id: z.string().optional(),
    status: z.string().optional(),
    start_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    end_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    artifact_uri: z.string().optional(),
    lifecycle_stage: z.string().optional(),
  })
  .transform(d => ({
    runId: d.run_id,
    runUuid: d.run_uuid,
    experimentId: d.experiment_id,
    runName: d.run_name,
    userId: d.user_id,
    status: d.status,
    startTime: d.start_time,
    endTime: d.end_time,
    artifactUri: d.artifact_uri,
    lifecycleStage: d.lifecycle_stage,
  }));

export const unmarshalRunInputsSchema: z.ZodType<RunInputs> = z
  .object({
    dataset_inputs: z
      .array(z.lazy(() => unmarshalDatasetInputSchema))
      .optional(),
    model_inputs: z.array(z.lazy(() => unmarshalModelInputSchema)).optional(),
  })
  .transform(d => ({
    datasetInputs: d.dataset_inputs,
    modelInputs: d.model_inputs,
  }));

export const unmarshalRunTagSchema: z.ZodType<RunTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalSearchExperimentsResponseSchema: z.ZodType<SearchExperimentsResponse> =
  z
    .object({
      experiments: z.array(z.lazy(() => unmarshalExperimentSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      experiments: d.experiments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSearchLoggedModelsResponseSchema: z.ZodType<SearchLoggedModelsResponse> =
  z
    .object({
      models: z.array(z.lazy(() => unmarshalLoggedModelSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      models: d.models,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSearchRunsResponseSchema: z.ZodType<SearchRunsResponse> =
  z
    .object({
      runs: z.array(z.lazy(() => unmarshalRunSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      runs: d.runs,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSetExperimentTagResponseSchema: z.ZodType<SetExperimentTagResponse> =
  z.object({});

export const unmarshalSetLoggedModelTagsResponseSchema: z.ZodType<SetLoggedModelTagsResponse> =
  z.object({});

export const unmarshalSetTagResponseSchema: z.ZodType<SetTagResponse> =
  z.object({});

export const unmarshalUcTraceLocationSchema: z.ZodType<UcTraceLocation> = z
  .object({
    catalog: z.string().optional(),
    schema: z.string().optional(),
    table_prefix: z.string().optional(),
    effective_table_prefix: z.string().optional(),
  })
  .transform(d => ({
    catalog: d.catalog,
    schema: d.schema,
    tablePrefix: d.table_prefix,
    effectiveTablePrefix: d.effective_table_prefix,
  }));

export const unmarshalUpdateExperimentResponseSchema: z.ZodType<UpdateExperimentResponse> =
  z.object({});

export const unmarshalUpdateRunResponseSchema: z.ZodType<UpdateRunResponse> = z
  .object({
    run_info: z.lazy(() => unmarshalRunInfoSchema).optional(),
  })
  .transform(d => ({
    runInfo: d.run_info,
  }));

export const marshalCreateExperimentRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    artifactLocation: z.string().optional(),
    tags: z.array(z.lazy(() => marshalExperimentTagSchema)).optional(),
    traceLocation: z
      .lazy(() => marshalExperimentTraceLocationSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    artifact_location: d.artifactLocation,
    tags: d.tags,
    trace_location: d.traceLocation,
  }));

export const marshalCreateLoggedModelRequestSchema: z.ZodType = z
  .object({
    experimentId: z.string().optional(),
    name: z.string().optional(),
    modelType: z.string().optional(),
    sourceRunId: z.string().optional(),
    params: z.array(z.lazy(() => marshalLoggedModelParameterSchema)).optional(),
    tags: z.array(z.lazy(() => marshalLoggedModelTagSchema)).optional(),
  })
  .transform(d => ({
    experiment_id: d.experimentId,
    name: d.name,
    model_type: d.modelType,
    source_run_id: d.sourceRunId,
    params: d.params,
    tags: d.tags,
  }));

export const marshalCreateRunRequestSchema: z.ZodType = z
  .object({
    experimentId: z.string().optional(),
    userId: z.string().optional(),
    runName: z.string().optional(),
    startTime: z.bigint().optional(),
    tags: z.array(z.lazy(() => marshalRunTagSchema)).optional(),
  })
  .transform(d => ({
    experiment_id: d.experimentId,
    user_id: d.userId,
    run_name: d.runName,
    start_time: d.startTime,
    tags: d.tags,
  }));

export const marshalDatasetSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    digest: z.string().optional(),
    sourceType: z.string().optional(),
    source: z.string().optional(),
    schema: z.string().optional(),
    profile: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    digest: d.digest,
    source_type: d.sourceType,
    source: d.source,
    schema: d.schema,
    profile: d.profile,
  }));

export const marshalDatasetInputSchema: z.ZodType = z
  .object({
    tags: z.array(z.lazy(() => marshalInputTagSchema)).optional(),
    dataset: z.lazy(() => marshalDatasetSchema).optional(),
  })
  .transform(d => ({
    tags: d.tags,
    dataset: d.dataset,
  }));

export const marshalDeleteExperimentRequestSchema: z.ZodType = z
  .object({
    experimentId: z.string().optional(),
  })
  .transform(d => ({
    experiment_id: d.experimentId,
  }));

export const marshalDeleteRunRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
  })
  .transform(d => ({
    run_id: d.runId,
  }));

export const marshalDeleteRunsRequestSchema: z.ZodType = z
  .object({
    experimentId: z.string().optional(),
    maxTimestampMillis: z.bigint().optional(),
    maxRuns: z.number().optional(),
  })
  .transform(d => ({
    experiment_id: d.experimentId,
    max_timestamp_millis: d.maxTimestampMillis,
    max_runs: d.maxRuns,
  }));

export const marshalDeleteTagRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
    key: z.string().optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    key: d.key,
  }));

export const marshalExperimentTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalExperimentTraceLocationSchema: z.ZodType = z
  .object({
    location: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('ucTraceLocation'),
          ucTraceLocation: z.lazy(() => marshalUcTraceLocationSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.location?.$case === 'ucTraceLocation' && {
      uc_trace_location: d.location.ucTraceLocation,
    }),
  }));

export const marshalFinalizeLoggedModelRequestSchema: z.ZodType = z
  .object({
    modelId: z.string().optional(),
    status: z.string().optional(),
  })
  .transform(d => ({
    model_id: d.modelId,
    status: d.status,
  }));

export const marshalInputTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalLogBatchRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
    metrics: z.array(z.lazy(() => marshalMetricSchema)).optional(),
    params: z.array(z.lazy(() => marshalParamSchema)).optional(),
    tags: z.array(z.lazy(() => marshalRunTagSchema)).optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    metrics: d.metrics,
    params: d.params,
    tags: d.tags,
  }));

export const marshalLogInputsRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
    datasets: z.array(z.lazy(() => marshalDatasetInputSchema)).optional(),
    models: z.array(z.lazy(() => marshalModelInputSchema)).optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    datasets: d.datasets,
    models: d.models,
  }));

export const marshalLogLoggedModelParamsRequestSchema: z.ZodType = z
  .object({
    modelId: z.string().optional(),
    params: z.array(z.lazy(() => marshalLoggedModelParameterSchema)).optional(),
  })
  .transform(d => ({
    model_id: d.modelId,
    params: d.params,
  }));

export const marshalLogMetricRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
    runUuid: z.string().optional(),
    key: z.string().optional(),
    value: z.number().optional(),
    timestamp: z.bigint().optional(),
    step: z.bigint().optional(),
    modelId: z.string().optional(),
    datasetName: z.string().optional(),
    datasetDigest: z.string().optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    run_uuid: d.runUuid,
    key: d.key,
    value: d.value,
    timestamp: d.timestamp,
    step: d.step,
    model_id: d.modelId,
    dataset_name: d.datasetName,
    dataset_digest: d.datasetDigest,
  }));

export const marshalLogModelRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
    modelJson: z.string().optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    model_json: d.modelJson,
  }));

export const marshalLogOutputsRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
    models: z.array(z.lazy(() => marshalModelOutputSchema)).optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    models: d.models,
  }));

export const marshalLogParamRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
    runUuid: z.string().optional(),
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    run_uuid: d.runUuid,
    key: d.key,
    value: d.value,
  }));

export const marshalLoggedModelParameterSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalLoggedModelTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalMetricSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.number().optional(),
    timestamp: z.bigint().optional(),
    step: z.bigint().optional(),
    datasetName: z.string().optional(),
    datasetDigest: z.string().optional(),
    modelId: z.string().optional(),
    runId: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
    timestamp: d.timestamp,
    step: d.step,
    dataset_name: d.datasetName,
    dataset_digest: d.datasetDigest,
    model_id: d.modelId,
    run_id: d.runId,
  }));

export const marshalModelInputSchema: z.ZodType = z
  .object({
    modelId: z.string().optional(),
  })
  .transform(d => ({
    model_id: d.modelId,
  }));

export const marshalModelOutputSchema: z.ZodType = z
  .object({
    modelId: z.string().optional(),
    step: z.bigint().optional(),
  })
  .transform(d => ({
    model_id: d.modelId,
    step: d.step,
  }));

export const marshalParamSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalRestoreExperimentRequestSchema: z.ZodType = z
  .object({
    experimentId: z.string().optional(),
  })
  .transform(d => ({
    experiment_id: d.experimentId,
  }));

export const marshalRestoreRunRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
  })
  .transform(d => ({
    run_id: d.runId,
  }));

export const marshalRestoreRunsRequestSchema: z.ZodType = z
  .object({
    experimentId: z.string().optional(),
    minTimestampMillis: z.bigint().optional(),
    maxRuns: z.number().optional(),
  })
  .transform(d => ({
    experiment_id: d.experimentId,
    min_timestamp_millis: d.minTimestampMillis,
    max_runs: d.maxRuns,
  }));

export const marshalRunTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalSearchExperimentsRequestSchema: z.ZodType = z
  .object({
    maxResults: z.bigint().optional(),
    pageToken: z.string().optional(),
    filter: z.string().optional(),
    orderBy: z.array(z.string()).optional(),
    viewType: z.string().optional(),
  })
  .transform(d => ({
    max_results: d.maxResults,
    page_token: d.pageToken,
    filter: d.filter,
    order_by: d.orderBy,
    view_type: d.viewType,
  }));

export const marshalSearchLoggedModelsRequestSchema: z.ZodType = z
  .object({
    experimentIds: z.array(z.string()).optional(),
    filter: z.string().optional(),
    datasets: z
      .array(z.lazy(() => marshalSearchLoggedModelsRequest_DatasetSchema))
      .optional(),
    maxResults: z.number().optional(),
    orderBy: z
      .array(z.lazy(() => marshalSearchLoggedModelsRequest_OrderBySchema))
      .optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    experiment_ids: d.experimentIds,
    filter: d.filter,
    datasets: d.datasets,
    max_results: d.maxResults,
    order_by: d.orderBy,
    page_token: d.pageToken,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSearchLoggedModelsRequest_DatasetSchema: z.ZodType = z
  .object({
    datasetName: z.string().optional(),
    datasetDigest: z.string().optional(),
  })
  .transform(d => ({
    dataset_name: d.datasetName,
    dataset_digest: d.datasetDigest,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSearchLoggedModelsRequest_OrderBySchema: z.ZodType = z
  .object({
    fieldName: z.string().optional(),
    ascending: z.boolean().optional(),
    datasetName: z.string().optional(),
    datasetDigest: z.string().optional(),
  })
  .transform(d => ({
    field_name: d.fieldName,
    ascending: d.ascending,
    dataset_name: d.datasetName,
    dataset_digest: d.datasetDigest,
  }));

export const marshalSearchRunsRequestSchema: z.ZodType = z
  .object({
    experimentIds: z.array(z.string()).optional(),
    filter: z.string().optional(),
    runViewType: z.string().optional(),
    maxResults: z.number().optional(),
    orderBy: z.array(z.string()).optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    experiment_ids: d.experimentIds,
    filter: d.filter,
    run_view_type: d.runViewType,
    max_results: d.maxResults,
    order_by: d.orderBy,
    page_token: d.pageToken,
  }));

export const marshalSetExperimentTagRequestSchema: z.ZodType = z
  .object({
    experimentId: z.string().optional(),
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    experiment_id: d.experimentId,
    key: d.key,
    value: d.value,
  }));

export const marshalSetLoggedModelTagsRequestSchema: z.ZodType = z
  .object({
    modelId: z.string().optional(),
    tags: z.array(z.lazy(() => marshalLoggedModelTagSchema)).optional(),
  })
  .transform(d => ({
    model_id: d.modelId,
    tags: d.tags,
  }));

export const marshalSetTagRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
    runUuid: z.string().optional(),
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    run_uuid: d.runUuid,
    key: d.key,
    value: d.value,
  }));

export const marshalUcTraceLocationSchema: z.ZodType = z
  .object({
    catalog: z.string().optional(),
    schema: z.string().optional(),
    tablePrefix: z.string().optional(),
    effectiveTablePrefix: z.string().optional(),
  })
  .transform(d => ({
    catalog: d.catalog,
    schema: d.schema,
    table_prefix: d.tablePrefix,
    effective_table_prefix: d.effectiveTablePrefix,
  }));

export const marshalUpdateExperimentRequestSchema: z.ZodType = z
  .object({
    experimentId: z.string().optional(),
    newName: z.string().optional(),
  })
  .transform(d => ({
    experiment_id: d.experimentId,
    new_name: d.newName,
  }));

export const marshalUpdateRunRequestSchema: z.ZodType = z
  .object({
    runId: z.string().optional(),
    runUuid: z.string().optional(),
    status: z.string().optional(),
    endTime: z.bigint().optional(),
    runName: z.string().optional(),
  })
  .transform(d => ({
    run_id: d.runId,
    run_uuid: d.runUuid,
    status: d.status,
    end_time: d.endTime,
    run_name: d.runName,
  }));
