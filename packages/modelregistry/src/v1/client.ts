// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {resolveClientConfig} from '@databricks/sdk-core/config';
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
  ApproveTransitionRequest,
  ApproveTransitionResponse,
  CreateCommentRequest,
  CreateCommentResponse,
  CreateModelVersionRequest,
  CreateModelVersionResponse,
  CreateRegisteredModelRequest,
  CreateRegisteredModelResponse,
  CreateRegistryWebhookRequest,
  CreateRegistryWebhookResponse,
  CreateTransitionRequest,
  CreateTransitionResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  DeleteModelVersionRequest,
  DeleteModelVersionResponse,
  DeleteModelVersionTagRequest,
  DeleteModelVersionTagResponse,
  DeleteRegisteredModelRequest,
  DeleteRegisteredModelResponse,
  DeleteRegisteredModelTagRequest,
  DeleteRegisteredModelTagResponse,
  DeleteRegistryWebhookRequest,
  DeleteRegistryWebhookResponse,
  DeleteTransitionRequest,
  DeleteTransitionResponse,
  GetLatestVersionsResponse,
  GetModelVersionDownloadUriRequest,
  GetModelVersionDownloadUriResponse,
  GetModelVersionRequest,
  GetModelVersionResponse,
  GetRegisteredModelDatabricksRequest,
  GetRegisteredModelDatabricksResponse,
  ListLatestVersionsRequest,
  ListRegisteredModelsRequest,
  ListRegisteredModelsResponse,
  ListRegistryWebhooksRequest,
  ListRegistryWebhooksResponse,
  ListTransitionRequest,
  ListTransitionResponse,
  ModelVersion,
  RegisteredModel,
  RegistryWebhook,
  RejectTransitionRequest,
  RejectTransitionResponse,
  RenameRegisteredModelRequest,
  RenameRegisteredModelResponse,
  SearchModelVersionsRequest,
  SearchModelVersionsResponse,
  SearchRegisteredModelsRequest,
  SearchRegisteredModelsResponse,
  SetModelVersionTagRequest,
  SetModelVersionTagResponse,
  SetRegisteredModelTagRequest,
  SetRegisteredModelTagResponse,
  TestRegistryWebhookRequest,
  TestRegistryWebhookResponse,
  TransitionModelVersionStageDatabricksRequest,
  TransitionModelVersionStageDatabricksResponse,
  UpdateCommentRequest,
  UpdateCommentResponse,
  UpdateModelVersionRequest,
  UpdateModelVersionResponse,
  UpdateRegisteredModelRequest,
  UpdateRegisteredModelResponse,
  UpdateRegistryWebhookRequest,
  UpdateRegistryWebhookResponse,
} from './model';
import {
  marshalApproveTransitionRequestSchema,
  marshalCreateCommentRequestSchema,
  marshalCreateModelVersionRequestSchema,
  marshalCreateRegisteredModelRequestSchema,
  marshalCreateRegistryWebhookRequestSchema,
  marshalCreateTransitionRequestSchema,
  marshalListLatestVersionsRequestSchema,
  marshalRejectTransitionRequestSchema,
  marshalRenameRegisteredModelRequestSchema,
  marshalSetModelVersionTagRequestSchema,
  marshalSetRegisteredModelTagRequestSchema,
  marshalTestRegistryWebhookRequestSchema,
  marshalTransitionModelVersionStageDatabricksRequestSchema,
  marshalUpdateCommentRequestSchema,
  marshalUpdateModelVersionRequestSchema,
  marshalUpdateRegisteredModelRequestSchema,
  marshalUpdateRegistryWebhookRequestSchema,
  unmarshalApproveTransitionResponseSchema,
  unmarshalCreateCommentResponseSchema,
  unmarshalCreateModelVersionResponseSchema,
  unmarshalCreateRegisteredModelResponseSchema,
  unmarshalCreateRegistryWebhookResponseSchema,
  unmarshalCreateTransitionResponseSchema,
  unmarshalDeleteCommentResponseSchema,
  unmarshalDeleteModelVersionResponseSchema,
  unmarshalDeleteModelVersionTagResponseSchema,
  unmarshalDeleteRegisteredModelResponseSchema,
  unmarshalDeleteRegisteredModelTagResponseSchema,
  unmarshalDeleteRegistryWebhookResponseSchema,
  unmarshalDeleteTransitionResponseSchema,
  unmarshalGetLatestVersionsResponseSchema,
  unmarshalGetModelVersionDownloadUriResponseSchema,
  unmarshalGetModelVersionResponseSchema,
  unmarshalGetRegisteredModelDatabricksResponseSchema,
  unmarshalListRegisteredModelsResponseSchema,
  unmarshalListRegistryWebhooksResponseSchema,
  unmarshalListTransitionResponseSchema,
  unmarshalRejectTransitionResponseSchema,
  unmarshalRenameRegisteredModelResponseSchema,
  unmarshalSearchModelVersionsResponseSchema,
  unmarshalSearchRegisteredModelsResponseSchema,
  unmarshalSetModelVersionTagResponseSchema,
  unmarshalSetRegisteredModelTagResponseSchema,
  unmarshalTestRegistryWebhookResponseSchema,
  unmarshalTransitionModelVersionStageDatabricksResponseSchema,
  unmarshalUpdateCommentResponseSchema,
  unmarshalUpdateModelVersionResponseSchema,
  unmarshalUpdateRegisteredModelResponseSchema,
  unmarshalUpdateRegistryWebhookResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ModelRegistryClient {
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
    // Resolve host and credentials from one source so they share a profile.
    const config = resolveClientConfig(options);
    this.host = (config.host ?? '').replace(/\/$/, '');
    this.workspaceId = config.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Approves a model version stage transition request. */
  async approveTransitionRequest(
    req: ApproveTransitionRequest,
    options?: CallOptions
  ): Promise<ApproveTransitionResponse> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/approve`;
    const body = marshalRequest(req, marshalApproveTransitionRequestSchema);
    let resp: ApproveTransitionResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalApproveTransitionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Posts a comment on a model version. A comment can be submitted either by a user or programmatically to display
   * relevant information about the model. For example, test results or deployment errors.
   */
  async createComment(
    req: CreateCommentRequest,
    options?: CallOptions
  ): Promise<CreateCommentResponse> {
    const url = `${this.host}/api/2.0/mlflow/comments/create`;
    const body = marshalRequest(req, marshalCreateCommentRequestSchema);
    let resp: CreateCommentResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalCreateCommentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * **NOTE:** This endpoint is in Public Preview.
   * Creates a registry webhook.
   */
  async createRegistryWebhook(
    req: CreateRegistryWebhookRequest,
    options?: CallOptions
  ): Promise<CreateRegistryWebhookResponse> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/create`;
    const body = marshalRequest(req, marshalCreateRegistryWebhookRequestSchema);
    let resp: CreateRegistryWebhookResponse | undefined;
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
        unmarshalCreateRegistryWebhookResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a model version stage transition request. */
  async createTransitionRequest(
    req: CreateTransitionRequest,
    options?: CallOptions
  ): Promise<CreateTransitionResponse> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/create`;
    const body = marshalRequest(req, marshalCreateTransitionRequestSchema);
    let resp: CreateTransitionResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalCreateTransitionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a comment on a model version. */
  async deleteComment(
    req: DeleteCommentRequest,
    options?: CallOptions
  ): Promise<DeleteCommentResponse> {
    const url = `${this.host}/api/2.0/mlflow/comments/delete`;
    const params = new URLSearchParams();
    if (req.id !== undefined) {
      params.append('id', req.id);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteCommentResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalDeleteCommentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * **NOTE:** This endpoint is in Public Preview.
   * Deletes a registry webhook.
   */
  async deleteRegistryWebhook(
    req: DeleteRegistryWebhookRequest,
    options?: CallOptions
  ): Promise<DeleteRegistryWebhookResponse> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/delete`;
    const params = new URLSearchParams();
    if (req.id !== undefined) {
      params.append('id', req.id);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteRegistryWebhookResponse | undefined;
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
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteRegistryWebhookResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Cancels a model version stage transition request. */
  async deleteTransitionRequest(
    req: DeleteTransitionRequest,
    options?: CallOptions
  ): Promise<DeleteTransitionResponse> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/delete`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.version !== undefined) {
      params.append('version', req.version);
    }
    if (req.stage !== undefined) {
      params.append('stage', req.stage);
    }
    if (req.creator !== undefined) {
      params.append('creator', req.creator);
    }
    if (req.comment !== undefined) {
      params.append('comment', req.comment);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteTransitionResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalDeleteTransitionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get the details of a model.
   * This is a <Databricks> workspace version of the [MLflow endpoint](https://www.mlflow.org/docs/latest/rest-api.html#get-registeredmodel)
   * that also returns the model's <Databricks> workspace ID and the permission level of the requesting user on the model.
   */
  async getRegisteredModelDatabricks(
    req: GetRegisteredModelDatabricksRequest,
    options?: CallOptions
  ): Promise<GetRegisteredModelDatabricksResponse> {
    const url = `${this.host}/api/2.0/mlflow/databricks/registered-models/get`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetRegisteredModelDatabricksResponse | undefined;
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
        unmarshalGetRegisteredModelDatabricksResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * **NOTE:** This endpoint is in Public Preview.
   * Lists all registry webhooks.
   */
  async listRegistryWebhooks(
    req: ListRegistryWebhooksRequest,
    options?: CallOptions
  ): Promise<ListRegistryWebhooksResponse> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/list`;
    const params = new URLSearchParams();
    if (req.modelName !== undefined) {
      params.append('model_name', req.modelName);
    }
    if (req.events !== undefined) {
      params.append('events', String(req.events));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListRegistryWebhooksResponse | undefined;
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
        unmarshalListRegistryWebhooksResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listRegistryWebhooksIter(
    req: ListRegistryWebhooksRequest,
    options?: CallOptions
  ): AsyncGenerator<RegistryWebhook> {
    const pageReq: ListRegistryWebhooksRequest = {...req};
    for (;;) {
      const resp = await this.listRegistryWebhooks(pageReq, options);
      for (const item of resp.webhooks ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Gets a list of all open stage transition requests for the model version. */
  async listTransitionsRequest(
    req: ListTransitionRequest,
    options?: CallOptions
  ): Promise<ListTransitionResponse> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/list`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.version !== undefined) {
      params.append('version', req.version);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListTransitionResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListTransitionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Rejects a model version stage transition request. */
  async rejectTransitionRequest(
    req: RejectTransitionRequest,
    options?: CallOptions
  ): Promise<RejectTransitionResponse> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/reject`;
    const body = marshalRequest(req, marshalRejectTransitionRequestSchema);
    let resp: RejectTransitionResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalRejectTransitionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * **NOTE:** This endpoint is in Public Preview.
   * Tests a registry webhook.
   */
  async testRegistryWebhook(
    req: TestRegistryWebhookRequest,
    options?: CallOptions
  ): Promise<TestRegistryWebhookResponse> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/test`;
    const body = marshalRequest(req, marshalTestRegistryWebhookRequestSchema);
    let resp: TestRegistryWebhookResponse | undefined;
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
        unmarshalTestRegistryWebhookResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Transition a model version's stage.
   * This is a <Databricks> workspace version of the [MLflow endpoint](https://www.mlflow.org/docs/latest/rest-api.html#transition-modelversion-stage)
   * that also accepts a comment associated with the transition to be recorded.
   */
  async transitionModelVersionStageDatabricks(
    req: TransitionModelVersionStageDatabricksRequest,
    options?: CallOptions
  ): Promise<TransitionModelVersionStageDatabricksResponse> {
    const url = `${this.host}/api/2.0/mlflow/databricks/model-versions/transition-stage`;
    const body = marshalRequest(
      req,
      marshalTransitionModelVersionStageDatabricksRequestSchema
    );
    let resp: TransitionModelVersionStageDatabricksResponse | undefined;
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
        unmarshalTransitionModelVersionStageDatabricksResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Post an edit to a comment on a model version. */
  async updateComment(
    req: UpdateCommentRequest,
    options?: CallOptions
  ): Promise<UpdateCommentResponse> {
    const url = `${this.host}/api/2.0/mlflow/comments/update`;
    const body = marshalRequest(req, marshalUpdateCommentRequestSchema);
    let resp: UpdateCommentResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalUpdateCommentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * **NOTE:** This endpoint is in Public Preview.
   * Updates a registry webhook.
   */
  async updateRegistryWebhook(
    req: UpdateRegistryWebhookRequest,
    options?: CallOptions
  ): Promise<UpdateRegistryWebhookResponse> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/update`;
    const body = marshalRequest(req, marshalUpdateRegistryWebhookRequestSchema);
    let resp: UpdateRegistryWebhookResponse | undefined;
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
        unmarshalUpdateRegistryWebhookResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a model version. */
  async createModelVersion(
    req: CreateModelVersionRequest,
    options?: CallOptions
  ): Promise<CreateModelVersionResponse> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/create`;
    const body = marshalRequest(req, marshalCreateModelVersionRequestSchema);
    let resp: CreateModelVersionResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalCreateModelVersionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new registered model with the name specified in the request body.
   * Throws `RESOURCE_ALREADY_EXISTS` if a registered model with the given name exists.
   */
  async createRegisteredModel(
    req: CreateRegisteredModelRequest,
    options?: CallOptions
  ): Promise<CreateRegisteredModelResponse> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/create`;
    const body = marshalRequest(req, marshalCreateRegisteredModelRequestSchema);
    let resp: CreateRegisteredModelResponse | undefined;
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
        unmarshalCreateRegisteredModelResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a model version. */
  async deleteModelVersion(
    req: DeleteModelVersionRequest,
    options?: CallOptions
  ): Promise<DeleteModelVersionResponse> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/delete`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.version !== undefined) {
      params.append('version', req.version);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteModelVersionResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalDeleteModelVersionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a model version tag. */
  async deleteModelVersionTag(
    req: DeleteModelVersionTagRequest,
    options?: CallOptions
  ): Promise<DeleteModelVersionTagResponse> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/delete-tag`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.version !== undefined) {
      params.append('version', req.version);
    }
    if (req.key !== undefined) {
      params.append('key', req.key);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteModelVersionTagResponse | undefined;
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
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteModelVersionTagResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a registered model. */
  async deleteRegisteredModel(
    req: DeleteRegisteredModelRequest,
    options?: CallOptions
  ): Promise<DeleteRegisteredModelResponse> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/delete`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteRegisteredModelResponse | undefined;
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
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteRegisteredModelResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes the tag for a registered model. */
  async deleteRegisteredModelTag(
    req: DeleteRegisteredModelTagRequest,
    options?: CallOptions
  ): Promise<DeleteRegisteredModelTagResponse> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/delete-tag`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.key !== undefined) {
      params.append('key', req.key);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteRegisteredModelTagResponse | undefined;
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
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteRegisteredModelTagResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a model version. */
  async getModelVersion(
    req: GetModelVersionRequest,
    options?: CallOptions
  ): Promise<GetModelVersionResponse> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/get`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.version !== undefined) {
      params.append('version', req.version);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetModelVersionResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalGetModelVersionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a URI to download the model version. */
  async getModelVersionDownloadUri(
    req: GetModelVersionDownloadUriRequest,
    options?: CallOptions
  ): Promise<GetModelVersionDownloadUriResponse> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/get-download-uri`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.version !== undefined) {
      params.append('version', req.version);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetModelVersionDownloadUriResponse | undefined;
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
        unmarshalGetModelVersionDownloadUriResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets the latest version of a registered model. */
  async listLatestVersions(
    req: ListLatestVersionsRequest,
    options?: CallOptions
  ): Promise<GetLatestVersionsResponse> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/get-latest-versions`;
    const body = marshalRequest(req, marshalListLatestVersionsRequestSchema);
    let resp: GetLatestVersionsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalGetLatestVersionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists all available registered models, up to the limit specified in __max_results__. */
  async listRegisteredModels(
    req: ListRegisteredModelsRequest,
    options?: CallOptions
  ): Promise<ListRegisteredModelsResponse> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/list`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListRegisteredModelsResponse | undefined;
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
        unmarshalListRegisteredModelsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listRegisteredModelsIter(
    req: ListRegisteredModelsRequest,
    options?: CallOptions
  ): AsyncGenerator<RegisteredModel> {
    const pageReq: ListRegisteredModelsRequest = {...req};
    for (;;) {
      const resp = await this.listRegisteredModels(pageReq, options);
      for (const item of resp.registeredModels ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Renames a registered model. */
  async renameRegisteredModel(
    req: RenameRegisteredModelRequest,
    options?: CallOptions
  ): Promise<RenameRegisteredModelResponse> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/rename`;
    const body = marshalRequest(req, marshalRenameRegisteredModelRequestSchema);
    let resp: RenameRegisteredModelResponse | undefined;
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
        unmarshalRenameRegisteredModelResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Searches for specific model versions based on the supplied __filter__. */
  async searchModelVersions(
    req: SearchModelVersionsRequest,
    options?: CallOptions
  ): Promise<SearchModelVersionsResponse> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/search`;
    const params = new URLSearchParams();
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.orderBy !== undefined) {
      params.append('order_by', String(req.orderBy));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: SearchModelVersionsResponse | undefined;
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
        unmarshalSearchModelVersionsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *searchModelVersionsIter(
    req: SearchModelVersionsRequest,
    options?: CallOptions
  ): AsyncGenerator<ModelVersion> {
    const pageReq: SearchModelVersionsRequest = {...req};
    for (;;) {
      const resp = await this.searchModelVersions(pageReq, options);
      for (const item of resp.modelVersions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Search for registered models based on the specified __filter__. */
  async searchRegisteredModels(
    req: SearchRegisteredModelsRequest,
    options?: CallOptions
  ): Promise<SearchRegisteredModelsResponse> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/search`;
    const params = new URLSearchParams();
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.orderBy !== undefined) {
      params.append('order_by', String(req.orderBy));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: SearchRegisteredModelsResponse | undefined;
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
        unmarshalSearchRegisteredModelsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *searchRegisteredModelsIter(
    req: SearchRegisteredModelsRequest,
    options?: CallOptions
  ): AsyncGenerator<RegisteredModel> {
    const pageReq: SearchRegisteredModelsRequest = {...req};
    for (;;) {
      const resp = await this.searchRegisteredModels(pageReq, options);
      for (const item of resp.registeredModels ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Sets a model version tag. */
  async setModelVersionTag(
    req: SetModelVersionTagRequest,
    options?: CallOptions
  ): Promise<SetModelVersionTagResponse> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/set-tag`;
    const body = marshalRequest(req, marshalSetModelVersionTagRequestSchema);
    let resp: SetModelVersionTagResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalSetModelVersionTagResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Sets a tag on a registered model. */
  async setRegisteredModelTag(
    req: SetRegisteredModelTagRequest,
    options?: CallOptions
  ): Promise<SetRegisteredModelTagResponse> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/set-tag`;
    const body = marshalRequest(req, marshalSetRegisteredModelTagRequestSchema);
    let resp: SetRegisteredModelTagResponse | undefined;
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
        unmarshalSetRegisteredModelTagResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the model version. */
  async updateModelVersion(
    req: UpdateModelVersionRequest,
    options?: CallOptions
  ): Promise<UpdateModelVersionResponse> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/update`;
    const body = marshalRequest(req, marshalUpdateModelVersionRequestSchema);
    let resp: UpdateModelVersionResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalUpdateModelVersionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates a registered model. */
  async updateRegisteredModel(
    req: UpdateRegisteredModelRequest,
    options?: CallOptions
  ): Promise<UpdateRegisteredModelResponse> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/update`;
    const body = marshalRequest(req, marshalUpdateRegisteredModelRequestSchema);
    let resp: UpdateRegisteredModelResponse | undefined;
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
        unmarshalUpdateRegisteredModelResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
