// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import {DEFAULT_DEBUG_TRUNCATE_BYTES} from '@databricks/sdk-core/logger/debug';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {LroOptions} from '@databricks/sdk-options/lro';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  ApplyEnvironmentRequest,
  ApplyEnvironmentResponse,
  ClonePipelineRequest,
  ClonePipelineResponse,
  CreatePipelineRequest,
  CreatePipelineResponse,
  DeletePipelineRequest,
  DeletePipelineResponse,
  EditPipelineRequest,
  EditPipelineResponse,
  GetPipelineRequest,
  GetPipelineResponse,
  GetUpdateRequest,
  GetUpdateResponse,
  ListPipelineEventsRequest,
  ListPipelineEventsResponse,
  ListPipelinesRequest,
  ListPipelinesResponse,
  ListUpdatesRequest,
  ListUpdatesResponse,
  PipelineEvent,
  PipelineStateInfo,
  StartUpdateRequest,
  StartUpdateResponse,
  StopPipelineRequest,
  StopPipelineResponse,
} from './model';
import {
  PipelineState_PipelineState,
  marshalApplyEnvironmentRequestSchema,
  marshalClonePipelineRequestSchema,
  marshalCreatePipelineRequestSchema,
  marshalEditPipelineRequestSchema,
  marshalStartUpdateRequestSchema,
  marshalStopPipelineRequestSchema,
  unmarshalApplyEnvironmentResponseSchema,
  unmarshalClonePipelineResponseSchema,
  unmarshalCreatePipelineResponseSchema,
  unmarshalDeletePipelineResponseSchema,
  unmarshalEditPipelineResponseSchema,
  unmarshalGetPipelineResponseSchema,
  unmarshalGetUpdateResponseSchema,
  unmarshalListPipelineEventsResponseSchema,
  unmarshalListPipelinesResponseSchema,
  unmarshalListUpdatesResponseSchema,
  unmarshalStartUpdateResponseSchema,
  unmarshalStopPipelineResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class PipelinesClient {
  private readonly host: string;
  // Workspace ID used to route workspace-level calls on unified hosts (SPOG).
  // When set, workspace-level methods send X-Databricks-Org-Id on every
  // request.
  private readonly workspaceId: string | undefined;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;
  // Resolved debug-logging toggles passed into each HTTP call.
  private readonly debugHeaders: boolean;
  private readonly debugTruncateBytes: number;
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
    this.debugHeaders = options.debugHeaders ?? false;
    this.debugTruncateBytes =
      options.debugTruncateBytes ?? DEFAULT_DEBUG_TRUNCATE_BYTES;
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * *
   * Applies the current pipeline environment onto the pipeline compute. The environment applied can be used by subsequent
   * dev-mode updates.
   */
  async applyEnvironment(
    req: ApplyEnvironmentRequest,
    options?: CallOptions
  ): Promise<ApplyEnvironmentResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/environment/apply`;
    const body = marshalRequest(req, marshalApplyEnvironmentRequestSchema);
    let resp: ApplyEnvironmentResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalApplyEnvironmentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new pipeline using Unity Catalog from a pipeline using Hive Metastore.
   * This method returns the ID of the newly created clone.
   * Additionally, this method starts an update for the newly created pipeline.
   */
  async clone(
    req: ClonePipelineRequest,
    options?: CallOptions
  ): Promise<ClonePipelineResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/clone`;
    const body = marshalRequest(req, marshalClonePipelineRequestSchema);
    let resp: ClonePipelineResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalClonePipelineResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new data processing pipeline based on the requested configuration. If successful, this method returns
   * the ID of the new pipeline.
   */
  async create(
    req: CreatePipelineRequest,
    options?: CallOptions
  ): Promise<CreatePipelineResponse> {
    const url = `${this.host}/api/2.0/pipelines`;
    const body = marshalRequest(req, marshalCreatePipelineRequestSchema);
    let resp: CreatePipelineResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalCreatePipelineResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a pipeline. If the pipeline publishes to Unity Catalog, pipeline deletion will cascade to
   * all pipeline tables. Please reach out to <Databricks> support for assistance to undo this action.
   */
  async delete(
    req: DeletePipelineRequest,
    options?: CallOptions
  ): Promise<DeletePipelineResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    if (req.cascade !== undefined) {
      params.append('cascade', String(req.cascade));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeletePipelineResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalDeletePipelineResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates a pipeline with the supplied configuration. */
  async edit(
    req: EditPipelineRequest,
    options?: CallOptions
  ): Promise<EditPipelineResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}`;
    const body = marshalRequest(req, marshalEditPipelineRequestSchema);
    let resp: EditPipelineResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalEditPipelineResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves events for a pipeline. */
  async events(
    req: ListPipelineEventsRequest,
    options?: CallOptions
  ): Promise<ListPipelineEventsResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/events`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.orderBy !== undefined) {
      params.append('order_by', String(req.orderBy));
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPipelineEventsResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalListPipelineEventsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *eventsIter(
    req: ListPipelineEventsRequest,
    options?: CallOptions
  ): AsyncGenerator<PipelineEvent> {
    const pageReq: ListPipelineEventsRequest = {...req};
    for (;;) {
      const resp = await this.events(pageReq, options);
      for (const item of resp.events ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Get a pipeline. */
  async get(
    req: GetPipelineRequest,
    options?: CallOptions
  ): Promise<GetPipelineResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}`;
    let resp: GetPipelineResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalGetPipelineResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets an update from an active pipeline. */
  async getUpdate(
    req: GetUpdateRequest,
    options?: CallOptions
  ): Promise<GetUpdateResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/updates/${req.updateId ?? ''}`;
    let resp: GetUpdateResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalGetUpdateResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists pipelines defined in the Spark Declarative Pipelines system. */
  async list(
    req: ListPipelinesRequest,
    options?: CallOptions
  ): Promise<ListPipelinesResponse> {
    const url = `${this.host}/api/2.0/pipelines`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.orderBy !== undefined) {
      params.append('order_by', String(req.orderBy));
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPipelinesResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalListPipelinesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listIter(
    req: ListPipelinesRequest,
    options?: CallOptions
  ): AsyncGenerator<PipelineStateInfo> {
    const pageReq: ListPipelinesRequest = {...req};
    for (;;) {
      const resp = await this.list(pageReq, options);
      for (const item of resp.statuses ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List updates for an active pipeline. */
  async listUpdates(
    req: ListUpdatesRequest,
    options?: CallOptions
  ): Promise<ListUpdatesResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/updates`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.untilUpdateId !== undefined) {
      params.append('until_update_id', req.untilUpdateId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListUpdatesResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalListUpdatesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Starts a new update for the pipeline. If there is already an active update for the pipeline, the request will fail and the active update will remain running. */
  async start(
    req: StartUpdateRequest,
    options?: CallOptions
  ): Promise<StartUpdateResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/updates`;
    const body = marshalRequest(req, marshalStartUpdateRequestSchema);
    let resp: StartUpdateResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalStartUpdateResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Stops the pipeline by canceling the active update. If there is no active update for the pipeline, this request is a no-op. */
  private async stop(
    req: StopPipelineRequest,
    options?: CallOptions
  ): Promise<StopPipelineResponse> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/stop`;
    const body = marshalRequest(req, marshalStopPipelineRequestSchema);
    let resp: StopPipelineResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalStopPipelineResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async stopWaiter(
    req: StopPipelineRequest,
    options?: CallOptions
  ): Promise<StopWaiter> {
    await this.stop(req, options);
    if (req.pipelineId === undefined) {
      throw new Error(
        'request field pipelineId required for polling is missing'
      );
    }
    return new StopWaiter(this, req.pipelineId);
  }
}

export class StopWaiter {
  constructor(
    private readonly client: PipelinesClient,
    readonly pipelineId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetPipelineResponse> {
    let result: GetPipelineResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.get(
        {
          pipelineId: this.pipelineId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case PipelineState_PipelineState.IDLE:
          result = pollResp;
          return;
        case PipelineState_PipelineState.FAILED: {
          const msg = pollResp.cause ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.get(
      {
        pipelineId: this.pipelineId,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case PipelineState_PipelineState.IDLE:
      case PipelineState_PipelineState.FAILED:
        return true;
      default:
        return false;
    }
  }
}
