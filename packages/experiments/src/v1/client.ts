// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateExperimentRequest,
  CreateExperimentResponse,
  CreateLoggedModelRequest,
  CreateLoggedModelResponse,
  CreateRunRequest,
  CreateRunResponse,
  DeleteExperimentRequest,
  DeleteExperimentResponse,
  DeleteLoggedModelRequest,
  DeleteLoggedModelResponse,
  DeleteLoggedModelTagRequest,
  DeleteLoggedModelTagResponse,
  DeleteRunRequest,
  DeleteRunResponse,
  DeleteRunsRequest,
  DeleteRunsResponse,
  DeleteTagRequest,
  DeleteTagResponse,
  Experiment,
  FileInfo,
  FinalizeLoggedModelRequest,
  FinalizeLoggedModelResponse,
  GetExperimentByNameRequest,
  GetExperimentByNameResponse,
  GetExperimentRequest,
  GetExperimentResponse,
  GetLoggedModelRequest,
  GetLoggedModelResponse,
  GetMetricHistoryResponse,
  GetRunRequest,
  GetRunResponse,
  ListArtifactsRequest,
  ListArtifactsResponse,
  ListExperimentsRequest,
  ListExperimentsResponse,
  ListMetricHistoryRequest,
  LogBatchRequest,
  LogBatchResponse,
  LogInputsRequest,
  LogInputsResponse,
  LogLoggedModelParamsRequest,
  LogLoggedModelParamsResponse,
  LogMetricRequest,
  LogMetricResponse,
  LogModelRequest,
  LogModelResponse,
  LogOutputsRequest,
  LogOutputsResponse,
  LogParamRequest,
  LogParamResponse,
  Metric,
  RestoreExperimentRequest,
  RestoreExperimentResponse,
  RestoreRunRequest,
  RestoreRunResponse,
  RestoreRunsRequest,
  RestoreRunsResponse,
  Run,
  SearchExperimentsRequest,
  SearchExperimentsResponse,
  SearchLoggedModelsRequest,
  SearchLoggedModelsResponse,
  SearchRunsRequest,
  SearchRunsResponse,
  SetExperimentTagRequest,
  SetExperimentTagResponse,
  SetLoggedModelTagsRequest,
  SetLoggedModelTagsResponse,
  SetTagRequest,
  SetTagResponse,
  UpdateExperimentRequest,
  UpdateExperimentResponse,
  UpdateRunRequest,
  UpdateRunResponse,
} from './model';
import {
  marshalCreateExperimentRequestSchema,
  marshalCreateLoggedModelRequestSchema,
  marshalCreateRunRequestSchema,
  marshalDeleteExperimentRequestSchema,
  marshalDeleteRunRequestSchema,
  marshalDeleteRunsRequestSchema,
  marshalDeleteTagRequestSchema,
  marshalFinalizeLoggedModelRequestSchema,
  marshalLogBatchRequestSchema,
  marshalLogInputsRequestSchema,
  marshalLogLoggedModelParamsRequestSchema,
  marshalLogMetricRequestSchema,
  marshalLogModelRequestSchema,
  marshalLogOutputsRequestSchema,
  marshalLogParamRequestSchema,
  marshalRestoreExperimentRequestSchema,
  marshalRestoreRunRequestSchema,
  marshalRestoreRunsRequestSchema,
  marshalSearchExperimentsRequestSchema,
  marshalSearchLoggedModelsRequestSchema,
  marshalSearchRunsRequestSchema,
  marshalSetExperimentTagRequestSchema,
  marshalSetLoggedModelTagsRequestSchema,
  marshalSetTagRequestSchema,
  marshalUpdateExperimentRequestSchema,
  marshalUpdateRunRequestSchema,
  unmarshalCreateExperimentResponseSchema,
  unmarshalCreateLoggedModelResponseSchema,
  unmarshalCreateRunResponseSchema,
  unmarshalDeleteExperimentResponseSchema,
  unmarshalDeleteLoggedModelResponseSchema,
  unmarshalDeleteLoggedModelTagResponseSchema,
  unmarshalDeleteRunResponseSchema,
  unmarshalDeleteRunsResponseSchema,
  unmarshalDeleteTagResponseSchema,
  unmarshalFinalizeLoggedModelResponseSchema,
  unmarshalGetExperimentByNameResponseSchema,
  unmarshalGetExperimentResponseSchema,
  unmarshalGetLoggedModelResponseSchema,
  unmarshalGetMetricHistoryResponseSchema,
  unmarshalGetRunResponseSchema,
  unmarshalListArtifactsResponseSchema,
  unmarshalListExperimentsResponseSchema,
  unmarshalLogBatchResponseSchema,
  unmarshalLogInputsResponseSchema,
  unmarshalLogLoggedModelParamsResponseSchema,
  unmarshalLogMetricResponseSchema,
  unmarshalLogModelResponseSchema,
  unmarshalLogOutputsResponseSchema,
  unmarshalLogParamResponseSchema,
  unmarshalRestoreExperimentResponseSchema,
  unmarshalRestoreRunResponseSchema,
  unmarshalRestoreRunsResponseSchema,
  unmarshalSearchExperimentsResponseSchema,
  unmarshalSearchLoggedModelsResponseSchema,
  unmarshalSearchRunsResponseSchema,
  unmarshalSetExperimentTagResponseSchema,
  unmarshalSetLoggedModelTagsResponseSchema,
  unmarshalSetTagResponseSchema,
  unmarshalUpdateExperimentResponseSchema,
  unmarshalUpdateRunResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ExperimentsClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /**
   * Creates an experiment with a name. Returns the ID of the newly created experiment.
   * Validates that another experiment with the same name does not already exist and fails
   * if another experiment with the same name already exists.
   *
   *
   * Throws `RESOURCE_ALREADY_EXISTS` if an experiment with the given name exists.
   * Note: In some contexts, this error may be remapped to `ALREADY_EXISTS`.
   * To be safe, clients should check for both error codes.
   */
  async createExperiment(
    req: CreateExperimentRequest,
    options?: CallOptions
  ): Promise<CreateExperimentResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/experiments/create`;
    const body = marshalRequest(req, marshalCreateExperimentRequestSchema);
    let resp: CreateExperimentResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateExperimentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a logged model. */
  async createLoggedModel(
    req: CreateLoggedModelRequest,
    options?: CallOptions
  ): Promise<CreateLoggedModelResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/logged-models`;
    const body = marshalRequest(req, marshalCreateLoggedModelRequestSchema);
    let resp: CreateLoggedModelResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateLoggedModelResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new run within an experiment. A run is usually a single execution of a
   * machine learning or data ETL pipeline. MLflow uses runs to track the `mlflowParam`,
   * `mlflowMetric`, and `mlflowRunTag` associated with a single execution.
   */
  async createRun(
    req: CreateRunRequest,
    options?: CallOptions
  ): Promise<CreateRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/create`;
    const body = marshalRequest(req, marshalCreateRunRequestSchema);
    let resp: CreateRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Marks an experiment and associated metadata, runs, metrics, params, and tags for deletion.
   * If the experiment uses FileStore, artifacts associated with the experiment are also deleted.
   */
  async deleteExperiment(
    req: DeleteExperimentRequest,
    options?: CallOptions
  ): Promise<DeleteExperimentResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/experiments/delete`;
    const body = marshalRequest(req, marshalDeleteExperimentRequestSchema);
    let resp: DeleteExperimentResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteExperimentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a logged model. */
  async deleteLoggedModel(
    req: DeleteLoggedModelRequest,
    options?: CallOptions
  ): Promise<DeleteLoggedModelResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}`;
    let resp: DeleteLoggedModelResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteLoggedModelResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a tag on a logged model. */
  async deleteLoggedModelTag(
    req: DeleteLoggedModelTagRequest,
    options?: CallOptions
  ): Promise<DeleteLoggedModelTagResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}/tags/${req.tagKey ?? ''}`;
    let resp: DeleteLoggedModelTagResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteLoggedModelTagResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Marks a run for deletion. */
  async deleteRun(
    req: DeleteRunRequest,
    options?: CallOptions
  ): Promise<DeleteRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/delete`;
    const body = marshalRequest(req, marshalDeleteRunRequestSchema);
    let resp: DeleteRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Bulk delete runs in an experiment that were created prior to or at the specified timestamp. Deletes at most
   * max_runs per request. To call this API from a Databricks Notebook in Python, you can use the client code snippet on
   */
  async deleteRuns(
    req: DeleteRunsRequest,
    options?: CallOptions
  ): Promise<DeleteRunsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/databricks/runs/delete-runs`;
    const body = marshalRequest(req, marshalDeleteRunsRequestSchema);
    let resp: DeleteRunsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteRunsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a tag on a run. Tags are run metadata that can be updated during a run and after
   * a run completes.
   */
  async deleteTag(
    req: DeleteTagRequest,
    options?: CallOptions
  ): Promise<DeleteTagResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/delete-tag`;
    const body = marshalRequest(req, marshalDeleteTagRequestSchema);
    let resp: DeleteTagResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteTagResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Finalize a logged model. */
  async finalizeLoggedModel(
    req: FinalizeLoggedModelRequest,
    options?: CallOptions
  ): Promise<FinalizeLoggedModelResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}`;
    const body = marshalRequest(req, marshalFinalizeLoggedModelRequestSchema);
    let resp: FinalizeLoggedModelResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalFinalizeLoggedModelResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets metadata for an experiment. This method works on deleted experiments. */
  async getExperiment(
    req: GetExperimentRequest,
    options?: CallOptions
  ): Promise<GetExperimentResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/experiments/get`;
    const params = new URLSearchParams();
    if (req.experimentId !== undefined) {
      params.append('experiment_id', req.experimentId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetExperimentResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetExperimentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    req: GetExperimentByNameRequest,
    options?: CallOptions
  ): Promise<GetExperimentByNameResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/experiments/get-by-name`;
    const params = new URLSearchParams();
    if (req.experimentName !== undefined) {
      params.append('experiment_name', req.experimentName);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetExperimentByNameResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetExperimentByNameResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a logged model. */
  async getLoggedModel(
    req: GetLoggedModelRequest,
    options?: CallOptions
  ): Promise<GetLoggedModelResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}`;
    let resp: GetLoggedModelResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetLoggedModelResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the metadata, metrics, params, and tags for a run. In the case where multiple metrics with the same key are
   * logged for a run, return only the value with the latest timestamp.
   *
   * If there are multiple values with the latest timestamp, return the maximum of these values.
   */
  async getRun(
    req: GetRunRequest,
    options?: CallOptions
  ): Promise<GetRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/get`;
    const params = new URLSearchParams();
    if (req.runId !== undefined) {
      params.append('run_id', req.runId);
    }
    if (req.runUuid !== undefined) {
      params.append('run_uuid', req.runUuid);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    req: ListArtifactsRequest,
    options?: CallOptions
  ): Promise<ListArtifactsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/artifacts/list`;
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
    let resp: ListArtifactsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListArtifactsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listArtifactsIter(
    req: ListArtifactsRequest,
    options?: CallOptions
  ): AsyncGenerator<FileInfo> {
    const pageReq: ListArtifactsRequest = {...req};
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
    req: ListExperimentsRequest,
    options?: CallOptions
  ): Promise<ListExperimentsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/experiments/list`;
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
    let resp: ListExperimentsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListExperimentsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listExperimentsIter(
    req: ListExperimentsRequest,
    options?: CallOptions
  ): AsyncGenerator<Experiment> {
    const pageReq: ListExperimentsRequest = {...req};
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

  /** Gets a list of all values for the specified metric for a given run. */
  async listMetricHistory(
    req: ListMetricHistoryRequest,
    options?: CallOptions
  ): Promise<GetMetricHistoryResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/metrics/get-history`;
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
    let resp: GetMetricHistoryResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetMetricHistoryResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listMetricHistoryIter(
    req: ListMetricHistoryRequest,
    options?: CallOptions
  ): AsyncGenerator<Metric> {
    const pageReq: ListMetricHistoryRequest = {...req};
    for (;;) {
      const resp = await this.listMetricHistory(pageReq, options);
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
    req: LogBatchRequest,
    options?: CallOptions
  ): Promise<LogBatchResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/log-batch`;
    const body = marshalRequest(req, marshalLogBatchRequestSchema);
    let resp: LogBatchResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogBatchResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Logs inputs, such as datasets and models, to an MLflow Run. */
  async logInputs(
    req: LogInputsRequest,
    options?: CallOptions
  ): Promise<LogInputsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/log-inputs`;
    const body = marshalRequest(req, marshalLogInputsRequestSchema);
    let resp: LogInputsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogInputsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
  ): Promise<LogLoggedModelParamsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}/params`;
    const body = marshalRequest(req, marshalLogLoggedModelParamsRequestSchema);
    let resp: LogLoggedModelParamsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalLogLoggedModelParamsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Log a metric for a run. A metric is a key-value pair (string key, float value) with an
   * associated timestamp. Examples include the various metrics that represent ML model accuracy.
   * A metric can be logged multiple times.
   */
  async logMetric(
    req: LogMetricRequest,
    options?: CallOptions
  ): Promise<LogMetricResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/log-metric`;
    const body = marshalRequest(req, marshalLogMetricRequestSchema);
    let resp: LogMetricResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogMetricResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * **Note:** the [Create a logged model](/api/workspace/experiments/createloggedmodel) API replaces this endpoint.
   *
   * Log a model to an MLflow Run.
   */
  async logModel(
    req: LogModelRequest,
    options?: CallOptions
  ): Promise<LogModelResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/log-model`;
    const body = marshalRequest(req, marshalLogModelRequestSchema);
    let resp: LogModelResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogModelResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Logs outputs, such as models, from an MLflow Run. */
  async logOutputs(
    req: LogOutputsRequest,
    options?: CallOptions
  ): Promise<LogOutputsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/outputs`;
    const body = marshalRequest(req, marshalLogOutputsRequestSchema);
    let resp: LogOutputsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogOutputsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Logs a param used for a run. A param is a key-value pair (string key,
   * string value). Examples include hyperparameters used for ML model training and
   * constant dates and values used in an ETL pipeline. A param can be logged only once for a run.
   */
  async logParam(
    req: LogParamRequest,
    options?: CallOptions
  ): Promise<LogParamResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/log-parameter`;
    const body = marshalRequest(req, marshalLogParamRequestSchema);
    let resp: LogParamResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogParamResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    req: RestoreExperimentRequest,
    options?: CallOptions
  ): Promise<RestoreExperimentResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/experiments/restore`;
    const body = marshalRequest(req, marshalRestoreExperimentRequestSchema);
    let resp: RestoreExperimentResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestoreExperimentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Restores a deleted run. This also restores associated metadata, runs, metrics, params, and tags.
   *
   * Throws `RESOURCE_DOES_NOT_EXIST` if the run was never created or was permanently deleted.
   */
  async restoreRun(
    req: RestoreRunRequest,
    options?: CallOptions
  ): Promise<RestoreRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/restore`;
    const body = marshalRequest(req, marshalRestoreRunRequestSchema);
    let resp: RestoreRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestoreRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Bulk restore runs in an experiment that were deleted no earlier than the specified timestamp. Restores at most
   * max_runs per request. To call this API from a Databricks Notebook in Python, you can use the client code snippet on
   */
  async restoreRuns(
    req: RestoreRunsRequest,
    options?: CallOptions
  ): Promise<RestoreRunsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/databricks/runs/restore-runs`;
    const body = marshalRequest(req, marshalRestoreRunsRequestSchema);
    let resp: RestoreRunsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestoreRunsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Searches for experiments that satisfy specified search criteria. */
  async searchExperiments(
    req: SearchExperimentsRequest,
    options?: CallOptions
  ): Promise<SearchExperimentsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/experiments/search`;
    const body = marshalRequest(req, marshalSearchExperimentsRequestSchema);
    let resp: SearchExperimentsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSearchExperimentsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *searchExperimentsIter(
    req: SearchExperimentsRequest,
    options?: CallOptions
  ): AsyncGenerator<Experiment> {
    const pageReq: SearchExperimentsRequest = {...req};
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
    req: SearchLoggedModelsRequest,
    options?: CallOptions
  ): Promise<SearchLoggedModelsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/logged-models/search`;
    const body = marshalRequest(req, marshalSearchLoggedModelsRequestSchema);
    let resp: SearchLoggedModelsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSearchLoggedModelsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Searches for runs that satisfy expressions.
   *
   * Search expressions can use `mlflowMetric` and `mlflowParam` keys.
   */
  async searchRuns(
    req: SearchRunsRequest,
    options?: CallOptions
  ): Promise<SearchRunsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/search`;
    const body = marshalRequest(req, marshalSearchRunsRequestSchema);
    let resp: SearchRunsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSearchRunsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *searchRunsIter(
    req: SearchRunsRequest,
    options?: CallOptions
  ): AsyncGenerator<Run> {
    const pageReq: SearchRunsRequest = {...req};
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
    req: SetExperimentTagRequest,
    options?: CallOptions
  ): Promise<SetExperimentTagResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/experiments/set-experiment-tag`;
    const body = marshalRequest(req, marshalSetExperimentTagRequestSchema);
    let resp: SetExperimentTagResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSetExperimentTagResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Set tags for a logged model. */
  async setLoggedModelTags(
    req: SetLoggedModelTagsRequest,
    options?: CallOptions
  ): Promise<SetLoggedModelTagsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}/tags`;
    const body = marshalRequest(req, marshalSetLoggedModelTagsRequestSchema);
    let resp: SetLoggedModelTagsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSetLoggedModelTagsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Sets a tag on a run. Tags are run metadata that can be updated during a run and after
   * a run completes.
   */
  async setTag(
    req: SetTagRequest,
    options?: CallOptions
  ): Promise<SetTagResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/set-tag`;
    const body = marshalRequest(req, marshalSetTagRequestSchema);
    let resp: SetTagResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSetTagResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates experiment metadata. */
  async updateExperiment(
    req: UpdateExperimentRequest,
    options?: CallOptions
  ): Promise<UpdateExperimentResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/experiments/update`;
    const body = marshalRequest(req, marshalUpdateExperimentRequestSchema);
    let resp: UpdateExperimentResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateExperimentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates run metadata. */
  async updateRun(
    req: UpdateRunRequest,
    options?: CallOptions
  ): Promise<UpdateRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/mlflow/runs/update`;
    const body = marshalRequest(req, marshalUpdateRunRequestSchema);
    let resp: UpdateRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
