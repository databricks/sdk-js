// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {retryOn} from '@databricks/sdk-core/api';
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
  ApplyEnvironmentRequest,
  ApplyEnvironmentRequest_Response,
  ClonePipelineRequest,
  ClonePipelineRequest_Response,
  CreatePipelineRequest,
  CreatePipelineRequest_Response,
  DeletePipelineRequest,
  DeletePipelineRequest_Response,
  EditPipelineRequest,
  EditPipelineRequest_Response,
  GetPipelineRequest,
  GetPipelineRequest_Response,
  GetUpdateRequest,
  GetUpdateRequest_Response,
  ListPipelineEventsRequest,
  ListPipelineEventsRequest_Response,
  ListPipelinesRequest,
  ListPipelinesRequest_Response,
  ListUpdatesRequest,
  ListUpdatesRequest_Response,
  PipelineEvent,
  PipelineStateInfo,
  StartUpdateRequest,
  StartUpdateRequest_Response,
  StopPipelineRequest,
  StopPipelineRequest_Response,
} from './model';
import {
  PipelineState_PipelineState,
  marshalApplyEnvironmentRequestSchema,
  marshalClonePipelineRequestSchema,
  marshalCreatePipelineRequestSchema,
  marshalEditPipelineRequestSchema,
  marshalStartUpdateRequestSchema,
  marshalStopPipelineRequestSchema,
  unmarshalApplyEnvironmentRequest_ResponseSchema,
  unmarshalClonePipelineRequest_ResponseSchema,
  unmarshalCreatePipelineRequest_ResponseSchema,
  unmarshalDeletePipelineRequest_ResponseSchema,
  unmarshalEditPipelineRequest_ResponseSchema,
  unmarshalGetPipelineRequest_ResponseSchema,
  unmarshalGetUpdateRequest_ResponseSchema,
  unmarshalListPipelineEventsRequest_ResponseSchema,
  unmarshalListPipelinesRequest_ResponseSchema,
  unmarshalListUpdatesRequest_ResponseSchema,
  unmarshalStartUpdateRequest_ResponseSchema,
  unmarshalStopPipelineRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

class StillRunningError extends Error {}

export class Client {
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
    let info = createDefault().with(PACKAGE_SEGMENT);
    if (options.credentials !== undefined) {
      info = info
        .with({key: 'sdk-js-auth', value: AUTH_VERSION})
        .with({key: 'auth', value: options.credentials.name()});
    }
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
  ): Promise<ApplyEnvironmentRequest_Response> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/environment/apply`;
    const body = marshalRequest(req, marshalApplyEnvironmentRequestSchema);
    let resp: ApplyEnvironmentRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalApplyEnvironmentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<ClonePipelineRequest_Response> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/clone`;
    const body = marshalRequest(req, marshalClonePipelineRequestSchema);
    let resp: ClonePipelineRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalClonePipelineRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<CreatePipelineRequest_Response> {
    const url = `${this.host}/api/2.0/pipelines`;
    const body = marshalRequest(req, marshalCreatePipelineRequestSchema);
    let resp: CreatePipelineRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalCreatePipelineRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<DeletePipelineRequest_Response> {
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
    let resp: DeletePipelineRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(
        respBody,
        unmarshalDeletePipelineRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a pipeline with the supplied configuration. */
  async edit(
    req: EditPipelineRequest,
    options?: CallOptions
  ): Promise<EditPipelineRequest_Response> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}`;
    const body = marshalRequest(req, marshalEditPipelineRequestSchema);
    let resp: EditPipelineRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(
        respBody,
        unmarshalEditPipelineRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves events for a pipeline. */
  async events(
    req: ListPipelineEventsRequest,
    options?: CallOptions
  ): Promise<ListPipelineEventsRequest_Response> {
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
    let resp: ListPipelineEventsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListPipelineEventsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<GetPipelineRequest_Response> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}`;
    let resp: GetPipelineRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalGetPipelineRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets an update from an active pipeline. */
  async getUpdate(
    req: GetUpdateRequest,
    options?: CallOptions
  ): Promise<GetUpdateRequest_Response> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/updates/${req.updateId ?? ''}`;
    let resp: GetUpdateRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(respBody, unmarshalGetUpdateRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists pipelines defined in the Spark Declarative Pipelines system. */
  async list(
    req: ListPipelinesRequest,
    options?: CallOptions
  ): Promise<ListPipelinesRequest_Response> {
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
    let resp: ListPipelinesRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListPipelinesRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<ListUpdatesRequest_Response> {
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
    let resp: ListUpdatesRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListUpdatesRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Starts a new update for the pipeline. If there is already an active update for the pipeline, the request will fail and the active update will remain running. */
  async start(
    req: StartUpdateRequest,
    options?: CallOptions
  ): Promise<StartUpdateRequest_Response> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/updates`;
    const body = marshalRequest(req, marshalStartUpdateRequestSchema);
    let resp: StartUpdateRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalStartUpdateRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Stops the pipeline by canceling the active update. If there is no active update for the pipeline, this request is a no-op. */
  async stop(
    req: StopPipelineRequest,
    options?: CallOptions
  ): Promise<StopPipelineRequest_Response> {
    const url = `${this.host}/api/2.0/pipelines/${req.pipelineId ?? ''}/stop`;
    const body = marshalRequest(req, marshalStopPipelineRequestSchema);
    let resp: StopPipelineRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalStopPipelineRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    private readonly client: Client,
    readonly pipelineId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<GetPipelineRequest_Response> {
    let result: GetPipelineRequest_Response | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.get(
        {
          pipelineId: this.pipelineId,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
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
