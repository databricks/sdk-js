// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from './transport';
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
  CreateExperimentRequest_Response,
  CreateLoggedModelRequest,
  CreateLoggedModelRequest_Response,
  CreateRunRequest,
  CreateRunRequest_Response,
  DeleteExperimentRequest,
  DeleteExperimentRequest_Response,
  DeleteLoggedModelRequest,
  DeleteLoggedModelRequest_Response,
  DeleteLoggedModelTagRequest,
  DeleteLoggedModelTagRequest_Response,
  DeleteRunRequest,
  DeleteRunRequest_Response,
  DeleteRunsRequest,
  DeleteRunsRequest_Response,
  DeleteTagRequest,
  DeleteTagRequest_Response,
  Experiment,
  FileInfo,
  FinalizeLoggedModelRequest,
  FinalizeLoggedModelRequest_Response,
  GetExperimentByNameRequest,
  GetExperimentByNameRequest_Response,
  GetExperimentRequest,
  GetExperimentRequest_Response,
  GetLoggedModelRequest,
  GetLoggedModelRequest_Response,
  GetRunRequest,
  GetRunRequest_Response,
  ListArtifactsRequest,
  ListArtifactsRequest_Response,
  ListExperimentsRequest,
  ListExperimentsRequest_Response,
  ListMetricHistoryRequest,
  ListMetricHistoryRequest_Response,
  LogBatchRequest,
  LogBatchRequest_Response,
  LogInputsRequest,
  LogInputsRequest_Response,
  LogLoggedModelParamsRequest,
  LogLoggedModelParamsRequest_Response,
  LogMetricRequest,
  LogMetricRequest_Response,
  LogModelRequest,
  LogModelRequest_Response,
  LogOutputsRequest,
  LogOutputsRequest_Response,
  LogParamRequest,
  LogParamRequest_Response,
  Metric,
  RestoreExperimentRequest,
  RestoreExperimentRequest_Response,
  RestoreRunRequest,
  RestoreRunRequest_Response,
  RestoreRunsRequest,
  RestoreRunsRequest_Response,
  Run,
  SearchExperimentsRequest,
  SearchExperimentsRequest_Response,
  SearchLoggedModelsRequest,
  SearchLoggedModelsRequest_Response,
  SearchRunsRequest,
  SearchRunsRequest_Response,
  SetExperimentTagRequest,
  SetExperimentTagRequest_Response,
  SetLoggedModelTagsRequest,
  SetLoggedModelTagsRequest_Response,
  SetTagRequest,
  SetTagRequest_Response,
  UpdateExperimentRequest,
  UpdateExperimentRequest_Response,
  UpdateRunRequest,
  UpdateRunRequest_Response,
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
  unmarshalCreateExperimentRequest_ResponseSchema,
  unmarshalCreateLoggedModelRequest_ResponseSchema,
  unmarshalCreateRunRequest_ResponseSchema,
  unmarshalDeleteExperimentRequest_ResponseSchema,
  unmarshalDeleteLoggedModelRequest_ResponseSchema,
  unmarshalDeleteLoggedModelTagRequest_ResponseSchema,
  unmarshalDeleteRunRequest_ResponseSchema,
  unmarshalDeleteRunsRequest_ResponseSchema,
  unmarshalDeleteTagRequest_ResponseSchema,
  unmarshalFinalizeLoggedModelRequest_ResponseSchema,
  unmarshalGetExperimentByNameRequest_ResponseSchema,
  unmarshalGetExperimentRequest_ResponseSchema,
  unmarshalGetLoggedModelRequest_ResponseSchema,
  unmarshalGetRunRequest_ResponseSchema,
  unmarshalListArtifactsRequest_ResponseSchema,
  unmarshalListExperimentsRequest_ResponseSchema,
  unmarshalListMetricHistoryRequest_ResponseSchema,
  unmarshalLogBatchRequest_ResponseSchema,
  unmarshalLogInputsRequest_ResponseSchema,
  unmarshalLogLoggedModelParamsRequest_ResponseSchema,
  unmarshalLogMetricRequest_ResponseSchema,
  unmarshalLogModelRequest_ResponseSchema,
  unmarshalLogOutputsRequest_ResponseSchema,
  unmarshalLogParamRequest_ResponseSchema,
  unmarshalRestoreExperimentRequest_ResponseSchema,
  unmarshalRestoreRunRequest_ResponseSchema,
  unmarshalRestoreRunsRequest_ResponseSchema,
  unmarshalSearchExperimentsRequest_ResponseSchema,
  unmarshalSearchLoggedModelsRequest_ResponseSchema,
  unmarshalSearchRunsRequest_ResponseSchema,
  unmarshalSetExperimentTagRequest_ResponseSchema,
  unmarshalSetLoggedModelTagsRequest_ResponseSchema,
  unmarshalSetTagRequest_ResponseSchema,
  unmarshalUpdateExperimentRequest_ResponseSchema,
  unmarshalUpdateRunRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ExperimentsClient {
  private readonly host: string;
  // Workspace ID used to route workspace-level calls on unified hosts (SPOG).
  // When set, workspace-level methods send X-Databricks-Org-Id on every
  // request.
  private readonly workspaceId: string | undefined;
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
    this.workspaceId = options.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
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
   * Note: In some contexts, this error may be remapped to `ALREADY_EXISTS`.
   * To be safe, clients should check for both error codes.
   */
  async createExperiment(
    req: CreateExperimentRequest,
    options?: CallOptions
  ): Promise<CreateExperimentRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/create`;
    const body = marshalRequest(req, marshalCreateExperimentRequestSchema);
    let resp: CreateExperimentRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateExperimentRequest_ResponseSchema
      );
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
  ): Promise<CreateLoggedModelRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models`;
    const body = marshalRequest(req, marshalCreateLoggedModelRequestSchema);
    let resp: CreateLoggedModelRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateLoggedModelRequest_ResponseSchema
      );
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
  ): Promise<CreateRunRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/create`;
    const body = marshalRequest(req, marshalCreateRunRequestSchema);
    let resp: CreateRunRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateRunRequest_ResponseSchema);
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
  ): Promise<DeleteExperimentRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/delete`;
    const body = marshalRequest(req, marshalDeleteExperimentRequestSchema);
    let resp: DeleteExperimentRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteExperimentRequest_ResponseSchema
      );
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
  ): Promise<DeleteLoggedModelRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}`;
    let resp: DeleteLoggedModelRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteLoggedModelRequest_ResponseSchema
      );
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
  ): Promise<DeleteLoggedModelTagRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}/tags/${req.tagKey ?? ''}`;
    let resp: DeleteLoggedModelTagRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteLoggedModelTagRequest_ResponseSchema
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
  ): Promise<DeleteRunRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/delete`;
    const body = marshalRequest(req, marshalDeleteRunRequestSchema);
    let resp: DeleteRunRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteRunRequest_ResponseSchema);
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
  ): Promise<DeleteRunsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/databricks/runs/delete-runs`;
    const body = marshalRequest(req, marshalDeleteRunsRequestSchema);
    let resp: DeleteRunsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteRunsRequest_ResponseSchema);
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
  ): Promise<DeleteTagRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/delete-tag`;
    const body = marshalRequest(req, marshalDeleteTagRequestSchema);
    let resp: DeleteTagRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteTagRequest_ResponseSchema);
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
  ): Promise<FinalizeLoggedModelRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}`;
    const body = marshalRequest(req, marshalFinalizeLoggedModelRequestSchema);
    let resp: FinalizeLoggedModelRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalFinalizeLoggedModelRequest_ResponseSchema
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
  ): Promise<GetExperimentRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/get`;
    const params = new URLSearchParams();
    if (req.experimentId !== undefined) {
      params.append('experiment_id', req.experimentId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetExperimentRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetExperimentRequest_ResponseSchema
      );
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
  ): Promise<GetExperimentByNameRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/get-by-name`;
    const params = new URLSearchParams();
    if (req.experimentName !== undefined) {
      params.append('experiment_name', req.experimentName);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetExperimentByNameRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetExperimentByNameRequest_ResponseSchema
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
  ): Promise<GetLoggedModelRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}`;
    let resp: GetLoggedModelRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetLoggedModelRequest_ResponseSchema
      );
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
  ): Promise<GetRunRequest_Response> {
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
    let resp: GetRunRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetRunRequest_ResponseSchema);
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
  ): Promise<ListArtifactsRequest_Response> {
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
    let resp: ListArtifactsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListArtifactsRequest_ResponseSchema
      );
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
  ): Promise<ListExperimentsRequest_Response> {
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
    let resp: ListExperimentsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListExperimentsRequest_ResponseSchema
      );
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
  ): Promise<ListMetricHistoryRequest_Response> {
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
    let resp: ListMetricHistoryRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListMetricHistoryRequest_ResponseSchema
      );
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
  ): Promise<LogBatchRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-batch`;
    const body = marshalRequest(req, marshalLogBatchRequestSchema);
    let resp: LogBatchRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogBatchRequest_ResponseSchema);
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
  ): Promise<LogInputsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-inputs`;
    const body = marshalRequest(req, marshalLogInputsRequestSchema);
    let resp: LogInputsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogInputsRequest_ResponseSchema);
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
  ): Promise<LogLoggedModelParamsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}/params`;
    const body = marshalRequest(req, marshalLogLoggedModelParamsRequestSchema);
    let resp: LogLoggedModelParamsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
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
  ): Promise<LogMetricRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-metric`;
    const body = marshalRequest(req, marshalLogMetricRequestSchema);
    let resp: LogMetricRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogMetricRequest_ResponseSchema);
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
  ): Promise<LogModelRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-model`;
    const body = marshalRequest(req, marshalLogModelRequestSchema);
    let resp: LogModelRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogModelRequest_ResponseSchema);
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
  ): Promise<LogOutputsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/outputs`;
    const body = marshalRequest(req, marshalLogOutputsRequestSchema);
    let resp: LogOutputsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogOutputsRequest_ResponseSchema);
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
  ): Promise<LogParamRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/log-parameter`;
    const body = marshalRequest(req, marshalLogParamRequestSchema);
    let resp: LogParamRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalLogParamRequest_ResponseSchema);
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
  ): Promise<RestoreExperimentRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/restore`;
    const body = marshalRequest(req, marshalRestoreExperimentRequestSchema);
    let resp: RestoreExperimentRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalRestoreExperimentRequest_ResponseSchema
      );
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
  ): Promise<RestoreRunRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/restore`;
    const body = marshalRequest(req, marshalRestoreRunRequestSchema);
    let resp: RestoreRunRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestoreRunRequest_ResponseSchema);
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
  ): Promise<RestoreRunsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/databricks/runs/restore-runs`;
    const body = marshalRequest(req, marshalRestoreRunsRequestSchema);
    let resp: RestoreRunsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalRestoreRunsRequest_ResponseSchema
      );
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
  ): Promise<SearchExperimentsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/search`;
    const body = marshalRequest(req, marshalSearchExperimentsRequestSchema);
    let resp: SearchExperimentsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalSearchExperimentsRequest_ResponseSchema
      );
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
  ): Promise<SearchLoggedModelsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/search`;
    const body = marshalRequest(req, marshalSearchLoggedModelsRequestSchema);
    let resp: SearchLoggedModelsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalSearchLoggedModelsRequest_ResponseSchema
      );
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
  ): Promise<SearchRunsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/search`;
    const body = marshalRequest(req, marshalSearchRunsRequestSchema);
    let resp: SearchRunsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSearchRunsRequest_ResponseSchema);
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
  ): Promise<SetExperimentTagRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/set-experiment-tag`;
    const body = marshalRequest(req, marshalSetExperimentTagRequestSchema);
    let resp: SetExperimentTagRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalSetExperimentTagRequest_ResponseSchema
      );
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
  ): Promise<SetLoggedModelTagsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/logged-models/${req.modelId ?? ''}/tags`;
    const body = marshalRequest(req, marshalSetLoggedModelTagsRequestSchema);
    let resp: SetLoggedModelTagsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalSetLoggedModelTagsRequest_ResponseSchema
      );
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
  ): Promise<SetTagRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/set-tag`;
    const body = marshalRequest(req, marshalSetTagRequestSchema);
    let resp: SetTagRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSetTagRequest_ResponseSchema);
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
  ): Promise<UpdateExperimentRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/experiments/update`;
    const body = marshalRequest(req, marshalUpdateExperimentRequestSchema);
    let resp: UpdateExperimentRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateExperimentRequest_ResponseSchema
      );
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
  ): Promise<UpdateRunRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/runs/update`;
    const body = marshalRequest(req, marshalUpdateRunRequestSchema);
    let resp: UpdateRunRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateRunRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
