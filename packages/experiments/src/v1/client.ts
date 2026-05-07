// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateExperiment,
  CreateExperiment_Response,
  CreateLoggedModel,
  CreateLoggedModel_Response,
  CreateRun,
  CreateRun_Response,
  DeleteExperiment,
  DeleteExperiment_Response,
  DeleteLoggedModel,
  DeleteLoggedModelTag,
  DeleteLoggedModelTag_Response,
  DeleteLoggedModel_Response,
  DeleteRun,
  DeleteRun_Response,
  DeleteRuns,
  DeleteRuns_Response,
  DeleteTag,
  DeleteTag_Response,
  Experiment,
  FileInfo,
  FinalizeLoggedModel,
  FinalizeLoggedModel_Response,
  GetExperiment,
  GetExperimentByName,
  GetExperimentByName_Response,
  GetExperiment_Response,
  GetLoggedModel,
  GetLoggedModel_Response,
  GetLoggedModelsRequest,
  GetLoggedModelsRequest_Response,
  GetMetricHistory,
  GetMetricHistory_Response,
  GetRun,
  GetRun_Response,
  ListArtifacts,
  ListArtifacts_Response,
  ListExperiments,
  ListExperiments_Response,
  LogBatch,
  LogBatch_Response,
  LogInputs,
  LogInputs_Response,
  LogLoggedModelParamsRequest,
  LogLoggedModelParamsRequest_Response,
  LogMetric,
  LogMetric_Response,
  LogModel,
  LogModel_Response,
  LogOutputs,
  LogOutputs_Response,
  LogParam,
  LogParam_Response,
  Metric,
  RestoreExperiment,
  RestoreExperiment_Response,
  RestoreRun,
  RestoreRun_Response,
  RestoreRuns,
  RestoreRuns_Response,
  Run,
  SearchExperiments,
  SearchExperiments_Response,
  SearchLoggedModels,
  SearchLoggedModels_Response,
  SearchRuns,
  SearchRuns_Response,
  SetExperimentTag,
  SetExperimentTag_Response,
  SetLoggedModelTags,
  SetLoggedModelTags_Response,
  SetTag,
  SetTag_Response,
  UpdateExperiment,
  UpdateExperiment_Response,
  UpdateRun,
  UpdateRun_Response,
} from './model';
import {
  marshalCreateExperimentSchema,
  marshalCreateLoggedModelSchema,
  marshalCreateRunSchema,
  marshalDeleteExperimentSchema,
  marshalDeleteRunSchema,
  marshalDeleteRunsSchema,
  marshalDeleteTagSchema,
  marshalFinalizeLoggedModelSchema,
  marshalLogBatchSchema,
  marshalLogInputsSchema,
  marshalLogLoggedModelParamsRequestSchema,
  marshalLogMetricSchema,
  marshalLogModelSchema,
  marshalLogOutputsSchema,
  marshalLogParamSchema,
  marshalRestoreExperimentSchema,
  marshalRestoreRunSchema,
  marshalRestoreRunsSchema,
  marshalSearchExperimentsSchema,
  marshalSearchLoggedModelsSchema,
  marshalSearchRunsSchema,
  marshalSetExperimentTagSchema,
  marshalSetLoggedModelTagsSchema,
  marshalSetTagSchema,
  marshalUpdateExperimentSchema,
  marshalUpdateRunSchema,
  unmarshalCreateExperiment_ResponseSchema,
  unmarshalCreateLoggedModel_ResponseSchema,
  unmarshalCreateRun_ResponseSchema,
  unmarshalDeleteExperiment_ResponseSchema,
  unmarshalDeleteLoggedModelTag_ResponseSchema,
  unmarshalDeleteLoggedModel_ResponseSchema,
  unmarshalDeleteRun_ResponseSchema,
  unmarshalDeleteRuns_ResponseSchema,
  unmarshalDeleteTag_ResponseSchema,
  unmarshalFinalizeLoggedModel_ResponseSchema,
  unmarshalGetExperimentByName_ResponseSchema,
  unmarshalGetExperiment_ResponseSchema,
  unmarshalGetLoggedModel_ResponseSchema,
  unmarshalGetLoggedModelsRequest_ResponseSchema,
  unmarshalGetMetricHistory_ResponseSchema,
  unmarshalGetRun_ResponseSchema,
  unmarshalListArtifacts_ResponseSchema,
  unmarshalListExperiments_ResponseSchema,
  unmarshalLogBatch_ResponseSchema,
  unmarshalLogInputs_ResponseSchema,
  unmarshalLogLoggedModelParamsRequest_ResponseSchema,
  unmarshalLogMetric_ResponseSchema,
  unmarshalLogModel_ResponseSchema,
  unmarshalLogOutputs_ResponseSchema,
  unmarshalLogParam_ResponseSchema,
  unmarshalRestoreExperiment_ResponseSchema,
  unmarshalRestoreRun_ResponseSchema,
  unmarshalRestoreRuns_ResponseSchema,
  unmarshalSearchExperiments_ResponseSchema,
  unmarshalSearchLoggedModels_ResponseSchema,
  unmarshalSearchRuns_ResponseSchema,
  unmarshalSetExperimentTag_ResponseSchema,
  unmarshalSetLoggedModelTags_ResponseSchema,
  unmarshalSetTag_ResponseSchema,
  unmarshalUpdateExperiment_ResponseSchema,
  unmarshalUpdateRun_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    let info = createDefault().with(PACKAGE_SEGMENT);
    if (options.credentials !== undefined) {
      info = info
        .with({key: 'sdk-auth', value: AUTH_VERSION})
        .with({key: 'auth', value: options.credentials.name()});
    }
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Creates an experiment with a name. Returns the ID of the newly created experiment.
   * Validates that another experiment with the same name does not already exist and fails
   * if another experiment with the same name already exists.
   *
   *
   * Throws `RESOURCE_ALREADY_EXISTS` if an experiment with the given name exists.
   */
  async createExperiment(
    req: CreateExperiment,
    options?: CallOptions
  ): Promise<CreateExperiment_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/create`;
    const body = marshalRequest(req, marshalCreateExperimentSchema);
    let resp: CreateExperiment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateExperiment_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a logged model. */
  async createLoggedModel(
    req: CreateLoggedModel,
    options?: CallOptions
  ): Promise<CreateLoggedModel_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models`;
    const body = marshalRequest(req, marshalCreateLoggedModelSchema);
    let resp: CreateLoggedModel_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateLoggedModel_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new run within an experiment. A run is usually a single execution of a
   * machine learning or data ETL pipeline. MLflow uses runs to track the `mlflowParam`,
   * `mlflowMetric`, and `mlflowRunTag` associated with a single execution.
   */
  async createRun(
    req: CreateRun,
    options?: CallOptions
  ): Promise<CreateRun_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/create`;
    const body = marshalRequest(req, marshalCreateRunSchema);
    let resp: CreateRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateRun_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Marks an experiment and associated metadata, runs, metrics, params, and tags for deletion.
   * If the experiment uses FileStore, artifacts associated with the experiment are also deleted.
   */
  async deleteExperiment(
    req: DeleteExperiment,
    options?: CallOptions
  ): Promise<DeleteExperiment_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/delete`;
    const body = marshalRequest(req, marshalDeleteExperimentSchema);
    let resp: DeleteExperiment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteExperiment_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a logged model. */
  async deleteLoggedModel(
    req: DeleteLoggedModel,
    options?: CallOptions
  ): Promise<DeleteLoggedModel_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}`;
    let resp: DeleteLoggedModel_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteLoggedModel_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a tag on a logged model. */
  async deleteLoggedModelTag(
    req: DeleteLoggedModelTag,
    options?: CallOptions
  ): Promise<DeleteLoggedModelTag_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}/tags/${req.tagKey ?? ''}`;
    let resp: DeleteLoggedModelTag_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteLoggedModelTag_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Marks a run for deletion. */
  async deleteRun(
    req: DeleteRun,
    options?: CallOptions
  ): Promise<DeleteRun_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/delete`;
    const body = marshalRequest(req, marshalDeleteRunSchema);
    let resp: DeleteRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteRun_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Bulk delete runs in an experiment that were created prior to or at the specified timestamp. Deletes at most
   * max_runs per request. To call this API from a Databricks Notebook in Python, you can use the client code snippet on
   */
  async deleteRuns(
    req: DeleteRuns,
    options?: CallOptions
  ): Promise<DeleteRuns_Response> {
    const url = `${this.host}/api/2.0/mlflow/databricks/runs/delete-runs`;
    const body = marshalRequest(req, marshalDeleteRunsSchema);
    let resp: DeleteRuns_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteRuns_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a tag on a run. Tags are run metadata that can be updated during a run and after
   * a run completes.
   */
  async deleteTag(
    req: DeleteTag,
    options?: CallOptions
  ): Promise<DeleteTag_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/delete-tag`;
    const body = marshalRequest(req, marshalDeleteTagSchema);
    let resp: DeleteTag_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteTag_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Finalize a logged model. */
  async finalizeLoggedModel(
    req: FinalizeLoggedModel,
    options?: CallOptions
  ): Promise<FinalizeLoggedModel_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}`;
    const body = marshalRequest(req, marshalFinalizeLoggedModelSchema);
    let resp: FinalizeLoggedModel_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalFinalizeLoggedModel_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets metadata for an experiment. This method works on deleted experiments. */
  async getExperiment(
    req: GetExperiment,
    options?: CallOptions
  ): Promise<GetExperiment_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/get`;
    const params = new URLSearchParams();
    if (req.experimentId !== undefined) {
      params.append('experiment_id', req.experimentId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetExperiment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetExperiment_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets metadata for an experiment.
   *
   * This endpoint will return deleted experiments, but prefers the active experiment
   * if an active and deleted experiment share the same name. If multiple deleted
   * experiments share the same name, the API will return one of them.
   *
   * Throws `RESOURCE_DOES_NOT_EXIST` if no experiment with the specified name exists.
   */
  async getExperimentByName(
    req: GetExperimentByName,
    options?: CallOptions
  ): Promise<GetExperimentByName_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/get-by-name`;
    const params = new URLSearchParams();
    if (req.experimentName !== undefined) {
      params.append('experiment_name', req.experimentName);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetExperimentByName_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetExperimentByName_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a logged model. */
  async getLoggedModel(
    req: GetLoggedModel,
    options?: CallOptions
  ): Promise<GetLoggedModel_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}`;
    let resp: GetLoggedModel_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetLoggedModel_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Batch endpoint for getting logged models from a list of model IDs */
  async getLoggedModels(
    req: GetLoggedModelsRequest,
    options?: CallOptions
  ): Promise<GetLoggedModelsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models:batchGet`;
    const params = new URLSearchParams();
    if (req.modelIds !== undefined) {
      params.append('model_ids', String(req.modelIds));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetLoggedModelsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetLoggedModelsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a list of all values for the specified metric for a given run. */
  async getMetricHistory(
    req: GetMetricHistory,
    options?: CallOptions
  ): Promise<GetMetricHistory_Response> {
    const url = `${this.host}/api/2.0/mlflow/metrics/get-history`;
    const params = new URLSearchParams();
    if (req.runId !== undefined) {
      params.append('run_id', req.runId);
    }
    if (req.runUuid !== undefined) {
      params.append('run_uuid', req.runUuid);
    }
    if (req.metricKey !== undefined) {
      params.append('metric_key', req.metricKey);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetMetricHistory_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetMetricHistory_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *getMetricHistoryIter(
    req: GetMetricHistory,
    options?: CallOptions
  ): AsyncGenerator<Metric> {
    const pageReq: GetMetricHistory = {...req};
    for (;;) {
      const resp = await this.getMetricHistory(pageReq, options);
      for (const item of resp.metrics ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Gets the metadata, metrics, params, and tags for a run. In the case where multiple metrics with the same key are
   * logged for a run, return only the value with the latest timestamp.
   *
   * If there are multiple values with the latest timestamp, return the maximum of these values.
   */
  async getRun(req: GetRun, options?: CallOptions): Promise<GetRun_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/get`;
    const params = new URLSearchParams();
    if (req.runId !== undefined) {
      params.append('run_id', req.runId);
    }
    if (req.runUuid !== undefined) {
      params.append('run_uuid', req.runUuid);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetRun_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * List artifacts for a run. Takes an optional `artifact_path` prefix which if specified,
   * the response contains only artifacts with the specified prefix.
   * A maximum of 1000 artifacts will be retrieved for UC Volumes. Please call
   * `/api/2.0/fs/directories{directory_path}` for listing artifacts in UC Volumes, which supports pagination. See [List
   * directory contents | Files API](/api/workspace/files/listdirectorycontents).
   */
  async listArtifacts(
    req: ListArtifacts,
    options?: CallOptions
  ): Promise<ListArtifacts_Response> {
    const url = `${this.host}/api/2.0/mlflow/artifacts/list`;
    const params = new URLSearchParams();
    if (req.runId !== undefined) {
      params.append('run_id', req.runId);
    }
    if (req.runUuid !== undefined) {
      params.append('run_uuid', req.runUuid);
    }
    if (req.path !== undefined) {
      params.append('path', req.path);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListArtifacts_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListArtifacts_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listArtifactsIter(
    req: ListArtifacts,
    options?: CallOptions
  ): AsyncGenerator<FileInfo> {
    const pageReq: ListArtifacts = {...req};
    for (;;) {
      const resp = await this.listArtifacts(pageReq, options);
      for (const item of resp.files ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Gets a list of all experiments. */
  async listExperiments(
    req: ListExperiments,
    options?: CallOptions
  ): Promise<ListExperiments_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/list`;
    const params = new URLSearchParams();
    if (req.viewType !== undefined) {
      params.append('view_type', req.viewType);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListExperiments_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListExperiments_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listExperimentsIter(
    req: ListExperiments,
    options?: CallOptions
  ): AsyncGenerator<Experiment> {
    const pageReq: ListExperiments = {...req};
    for (;;) {
      const resp = await this.listExperiments(pageReq, options);
      for (const item of resp.experiments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Logs a batch of metrics, params, and tags for a run. If any data failed to be persisted, the server will respond
   * with an error (non-200 status code).
   *
   * In case of error (due to internal server error or an invalid request), partial data may be written.
   *
   * You can write metrics, params, and tags in interleaving fashion, but within a given entity type are guaranteed to
   * follow the order specified in the request body.
   *
   * The overwrite behavior for metrics,  params, and tags is as follows:
   *
   * * Metrics: metric values are never overwritten. Logging a metric (key, value, timestamp) appends to the set of values
   * for the metric with the provided key.
   *
   * * Tags: tag values can be overwritten by successive writes to the same tag key. That is, if multiple tag values
   * with the same key are provided in the same API request, the last-provided tag value is written. Logging the same
   * tag (key, value) is permitted. Specifically, logging a tag is idempotent.
   *
   * * Parameters: once written, param values cannot be changed (attempting to overwrite a param value will result in an
   * error). However, logging the same param (key, value) is permitted. Specifically, logging a param is idempotent.
   *
   * Request Limits
   * -------------------------------
   * A single JSON-serialized API request may be up to 1 MB in size and contain:
   *
   * * No more than 1000 metrics,  params, and tags in total
   *
   * * Up to 1000 metrics
   *
   * * Up to 100  params
   *
   * * Up to 100 tags
   *
   * For example, a valid request might contain 900 metrics, 50 params, and 50 tags, but logging 900 metrics, 50 params,
   * and 51 tags is invalid.
   *
   * The following limits also apply to metric, param, and tag keys and values:
   *
   * * Metric keys, param keys, and tag keys can be up to 250 characters in length
   *
   * * Parameter and tag values can be up to 250 characters in length
   */
  async logBatch(
    req: LogBatch,
    options?: CallOptions
  ): Promise<LogBatch_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-batch`;
    const body = marshalRequest(req, marshalLogBatchSchema);
    let resp: LogBatch_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogBatch_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Logs inputs, such as datasets and models, to an MLflow Run. */
  async logInputs(
    req: LogInputs,
    options?: CallOptions
  ): Promise<LogInputs_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-inputs`;
    const body = marshalRequest(req, marshalLogInputsSchema);
    let resp: LogInputs_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogInputs_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Logs params for a logged model. A param is a key-value pair (string key, string value). Examples include
   * hyperparameters used for ML model training. A param can be logged only once for a logged model, and
   * attempting to overwrite an existing param with a different value will result in an error
   */
  async logLoggedModelParams(
    req: LogLoggedModelParamsRequest,
    options?: CallOptions
  ): Promise<LogLoggedModelParamsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}/params`;
    const body = marshalRequest(req, marshalLogLoggedModelParamsRequestSchema);
    let resp: LogLoggedModelParamsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalLogLoggedModelParamsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Log a metric for a run. A metric is a key-value pair (string key, float value) with an
   * associated timestamp. Examples include the various metrics that represent ML model accuracy.
   * A metric can be logged multiple times.
   */
  async logMetric(
    req: LogMetric,
    options?: CallOptions
  ): Promise<LogMetric_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-metric`;
    const body = marshalRequest(req, marshalLogMetricSchema);
    let resp: LogMetric_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogMetric_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * **Note:** the [Create a logged model](/api/workspace/experiments/createloggedmodel) API replaces this endpoint.
   *
   * Log a model to an MLflow Run.
   */
  async logModel(
    req: LogModel,
    options?: CallOptions
  ): Promise<LogModel_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-model`;
    const body = marshalRequest(req, marshalLogModelSchema);
    let resp: LogModel_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogModel_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Logs outputs, such as models, from an MLflow Run. */
  async logOutputs(
    req: LogOutputs,
    options?: CallOptions
  ): Promise<LogOutputs_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/outputs`;
    const body = marshalRequest(req, marshalLogOutputsSchema);
    let resp: LogOutputs_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogOutputs_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Logs a param used for a run. A param is a key-value pair (string key,
   * string value). Examples include hyperparameters used for ML model training and
   * constant dates and values used in an ETL pipeline. A param can be logged only once for a run.
   */
  async logParam(
    req: LogParam,
    options?: CallOptions
  ): Promise<LogParam_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-parameter`;
    const body = marshalRequest(req, marshalLogParamSchema);
    let resp: LogParam_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogParam_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Restore an experiment marked for deletion. This also restores
   * associated metadata, runs, metrics, params, and tags. If experiment uses FileStore, underlying
   * artifacts associated with experiment are also restored.
   *
   * Throws `RESOURCE_DOES_NOT_EXIST` if experiment was never created or was permanently deleted.
   */
  async restoreExperiment(
    req: RestoreExperiment,
    options?: CallOptions
  ): Promise<RestoreExperiment_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/restore`;
    const body = marshalRequest(req, marshalRestoreExperimentSchema);
    let resp: RestoreExperiment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestoreExperiment_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Restores a deleted run. This also restores associated metadata, runs, metrics, params, and tags.
   *
   * Throws `RESOURCE_DOES_NOT_EXIST` if the run was never created or was permanently deleted.
   */
  async restoreRun(
    req: RestoreRun,
    options?: CallOptions
  ): Promise<RestoreRun_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/restore`;
    const body = marshalRequest(req, marshalRestoreRunSchema);
    let resp: RestoreRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestoreRun_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Bulk restore runs in an experiment that were deleted no earlier than the specified timestamp. Restores at most
   * max_runs per request. To call this API from a Databricks Notebook in Python, you can use the client code snippet on
   */
  async restoreRuns(
    req: RestoreRuns,
    options?: CallOptions
  ): Promise<RestoreRuns_Response> {
    const url = `${this.host}/api/2.0/mlflow/databricks/runs/restore-runs`;
    const body = marshalRequest(req, marshalRestoreRunsSchema);
    let resp: RestoreRuns_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestoreRuns_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Searches for experiments that satisfy specified search criteria. */
  async searchExperiments(
    req: SearchExperiments,
    options?: CallOptions
  ): Promise<SearchExperiments_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/search`;
    const body = marshalRequest(req, marshalSearchExperimentsSchema);
    let resp: SearchExperiments_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSearchExperiments_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *searchExperimentsIter(
    req: SearchExperiments,
    options?: CallOptions
  ): AsyncGenerator<Experiment> {
    const pageReq: SearchExperiments = {...req};
    for (;;) {
      const resp = await this.searchExperiments(pageReq, options);
      for (const item of resp.experiments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Search for Logged Models that satisfy specified search criteria. */
  async searchLoggedModels(
    req: SearchLoggedModels,
    options?: CallOptions
  ): Promise<SearchLoggedModels_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/search`;
    const body = marshalRequest(req, marshalSearchLoggedModelsSchema);
    let resp: SearchLoggedModels_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalSearchLoggedModels_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Searches for runs that satisfy expressions.
   *
   * Search expressions can use `mlflowMetric` and `mlflowParam` keys.
   */
  async searchRuns(
    req: SearchRuns,
    options?: CallOptions
  ): Promise<SearchRuns_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/search`;
    const body = marshalRequest(req, marshalSearchRunsSchema);
    let resp: SearchRuns_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSearchRuns_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *searchRunsIter(
    req: SearchRuns,
    options?: CallOptions
  ): AsyncGenerator<Run> {
    const pageReq: SearchRuns = {...req};
    for (;;) {
      const resp = await this.searchRuns(pageReq, options);
      for (const item of resp.runs ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Sets a tag on an experiment. Experiment tags are metadata that can be updated. */
  async setExperimentTag(
    req: SetExperimentTag,
    options?: CallOptions
  ): Promise<SetExperimentTag_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/set-experiment-tag`;
    const body = marshalRequest(req, marshalSetExperimentTagSchema);
    let resp: SetExperimentTag_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSetExperimentTag_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Set tags for a logged model. */
  async setLoggedModelTags(
    req: SetLoggedModelTags,
    options?: CallOptions
  ): Promise<SetLoggedModelTags_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}/tags`;
    const body = marshalRequest(req, marshalSetLoggedModelTagsSchema);
    let resp: SetLoggedModelTags_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalSetLoggedModelTags_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Sets a tag on a run. Tags are run metadata that can be updated during a run and after
   * a run completes.
   */
  async setTag(req: SetTag, options?: CallOptions): Promise<SetTag_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/set-tag`;
    const body = marshalRequest(req, marshalSetTagSchema);
    let resp: SetTag_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSetTag_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates experiment metadata. */
  async updateExperiment(
    req: UpdateExperiment,
    options?: CallOptions
  ): Promise<UpdateExperiment_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/update`;
    const body = marshalRequest(req, marshalUpdateExperimentSchema);
    let resp: UpdateExperiment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateExperiment_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates run metadata. */
  async updateRun(
    req: UpdateRun,
    options?: CallOptions
  ): Promise<UpdateRun_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/update`;
    const body = marshalRequest(req, marshalUpdateRunSchema);
    let resp: UpdateRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateRun_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
