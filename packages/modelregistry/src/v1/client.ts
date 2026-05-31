// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
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
  ApproveTransitionRequest,
  ApproveTransitionRequest_Response,
  CreateCommentRequest,
  CreateCommentRequest_Response,
  CreateModelVersionRequest,
  CreateModelVersionRequest_Response,
  CreateRegisteredModelRequest,
  CreateRegisteredModelRequest_Response,
  CreateRegistryWebhookRequest,
  CreateRegistryWebhookRequest_Response,
  CreateTransitionRequest,
  CreateTransitionRequest_Response,
  DeleteCommentRequest,
  DeleteCommentRequest_Response,
  DeleteModelVersionRequest,
  DeleteModelVersionRequest_Response,
  DeleteModelVersionTagRequest,
  DeleteModelVersionTagRequest_Response,
  DeleteRegisteredModelRequest,
  DeleteRegisteredModelRequest_Response,
  DeleteRegisteredModelTagRequest,
  DeleteRegisteredModelTagRequest_Response,
  DeleteRegistryWebhookRequest,
  DeleteRegistryWebhookRequest_Response,
  DeleteTransitionRequest,
  DeleteTransitionRequest_Response,
  GetModelVersionDownloadUriRequest,
  GetModelVersionDownloadUriRequest_Response,
  GetModelVersionRequest,
  GetModelVersionRequest_Response,
  GetRegisteredModelDatabricksRequest,
  GetRegisteredModelDatabricksRequest_Response,
  ListLatestVersionsRequest,
  ListLatestVersionsRequest_Response,
  ListRegisteredModelsRequest,
  ListRegisteredModelsRequest_Response,
  ListRegistryWebhooksRequest,
  ListRegistryWebhooksRequest_Response,
  ListTransitionRequest,
  ListTransitionRequest_Response,
  ModelVersion,
  RegisteredModel,
  RegistryWebhook,
  RejectTransitionRequest,
  RejectTransitionRequest_Response,
  RenameRegisteredModelRequest,
  RenameRegisteredModelRequest_Response,
  SearchModelVersionsRequest,
  SearchModelVersionsRequest_Response,
  SearchRegisteredModelsRequest,
  SearchRegisteredModelsRequest_Response,
  SetModelVersionTagRequest,
  SetModelVersionTagRequest_Response,
  SetRegisteredModelTagRequest,
  SetRegisteredModelTagRequest_Response,
  TestRegistryWebhookRequest,
  TestRegistryWebhookRequest_Response,
  TransitionModelVersionStageDatabricksRequest,
  TransitionModelVersionStageDatabricksRequest_Response,
  UpdateCommentRequest,
  UpdateCommentRequest_Response,
  UpdateModelVersionRequest,
  UpdateModelVersionRequest_Response,
  UpdateRegisteredModelRequest,
  UpdateRegisteredModelRequest_Response,
  UpdateRegistryWebhookRequest,
  UpdateRegistryWebhookRequest_Response,
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
  unmarshalApproveTransitionRequest_ResponseSchema,
  unmarshalCreateCommentRequest_ResponseSchema,
  unmarshalCreateModelVersionRequest_ResponseSchema,
  unmarshalCreateRegisteredModelRequest_ResponseSchema,
  unmarshalCreateRegistryWebhookRequest_ResponseSchema,
  unmarshalCreateTransitionRequest_ResponseSchema,
  unmarshalDeleteCommentRequest_ResponseSchema,
  unmarshalDeleteModelVersionRequest_ResponseSchema,
  unmarshalDeleteModelVersionTagRequest_ResponseSchema,
  unmarshalDeleteRegisteredModelRequest_ResponseSchema,
  unmarshalDeleteRegisteredModelTagRequest_ResponseSchema,
  unmarshalDeleteRegistryWebhookRequest_ResponseSchema,
  unmarshalDeleteTransitionRequest_ResponseSchema,
  unmarshalGetModelVersionDownloadUriRequest_ResponseSchema,
  unmarshalGetModelVersionRequest_ResponseSchema,
  unmarshalGetRegisteredModelDatabricksRequest_ResponseSchema,
  unmarshalListLatestVersionsRequest_ResponseSchema,
  unmarshalListRegisteredModelsRequest_ResponseSchema,
  unmarshalListRegistryWebhooksRequest_ResponseSchema,
  unmarshalListTransitionRequest_ResponseSchema,
  unmarshalRejectTransitionRequest_ResponseSchema,
  unmarshalRenameRegisteredModelRequest_ResponseSchema,
  unmarshalSearchModelVersionsRequest_ResponseSchema,
  unmarshalSearchRegisteredModelsRequest_ResponseSchema,
  unmarshalSetModelVersionTagRequest_ResponseSchema,
  unmarshalSetRegisteredModelTagRequest_ResponseSchema,
  unmarshalTestRegistryWebhookRequest_ResponseSchema,
  unmarshalTransitionModelVersionStageDatabricksRequest_ResponseSchema,
  unmarshalUpdateCommentRequest_ResponseSchema,
  unmarshalUpdateModelVersionRequest_ResponseSchema,
  unmarshalUpdateRegisteredModelRequest_ResponseSchema,
  unmarshalUpdateRegistryWebhookRequest_ResponseSchema,
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

  /** Approves a model version stage transition request. */
  async approveTransitionRequest(
    req: ApproveTransitionRequest,
    options?: CallOptions
  ): Promise<ApproveTransitionRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/approve`;
    const body = marshalRequest(req, marshalApproveTransitionRequestSchema);
    let resp: ApproveTransitionRequest_Response | undefined;
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
        unmarshalApproveTransitionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<CreateCommentRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/comments/create`;
    const body = marshalRequest(req, marshalCreateCommentRequestSchema);
    let resp: CreateCommentRequest_Response | undefined;
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
        unmarshalCreateCommentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<CreateRegistryWebhookRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/create`;
    const body = marshalRequest(req, marshalCreateRegistryWebhookRequestSchema);
    let resp: CreateRegistryWebhookRequest_Response | undefined;
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
        unmarshalCreateRegistryWebhookRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a model version stage transition request. */
  async createTransitionRequest(
    req: CreateTransitionRequest,
    options?: CallOptions
  ): Promise<CreateTransitionRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/create`;
    const body = marshalRequest(req, marshalCreateTransitionRequestSchema);
    let resp: CreateTransitionRequest_Response | undefined;
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
        unmarshalCreateTransitionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a comment on a model version. */
  async deleteComment(
    req: DeleteCommentRequest,
    options?: CallOptions
  ): Promise<DeleteCommentRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/comments/delete`;
    const params = new URLSearchParams();
    if (req.id !== undefined) {
      params.append('id', req.id);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteCommentRequest_Response | undefined;
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
        unmarshalDeleteCommentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<DeleteRegistryWebhookRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/delete`;
    const params = new URLSearchParams();
    if (req.id !== undefined) {
      params.append('id', req.id);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteRegistryWebhookRequest_Response | undefined;
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
        unmarshalDeleteRegistryWebhookRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Cancels a model version stage transition request. */
  async deleteTransitionRequest(
    req: DeleteTransitionRequest,
    options?: CallOptions
  ): Promise<DeleteTransitionRequest_Response> {
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
    let resp: DeleteTransitionRequest_Response | undefined;
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
        unmarshalDeleteTransitionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<GetRegisteredModelDatabricksRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/databricks/registered-models/get`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetRegisteredModelDatabricksRequest_Response | undefined;
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
        unmarshalGetRegisteredModelDatabricksRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<ListRegistryWebhooksRequest_Response> {
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
    let resp: ListRegistryWebhooksRequest_Response | undefined;
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
        unmarshalListRegistryWebhooksRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<ListTransitionRequest_Response> {
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
    let resp: ListTransitionRequest_Response | undefined;
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
        unmarshalListTransitionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Rejects a model version stage transition request. */
  async rejectTransitionRequest(
    req: RejectTransitionRequest,
    options?: CallOptions
  ): Promise<RejectTransitionRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/reject`;
    const body = marshalRequest(req, marshalRejectTransitionRequestSchema);
    let resp: RejectTransitionRequest_Response | undefined;
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
        unmarshalRejectTransitionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<TestRegistryWebhookRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/test`;
    const body = marshalRequest(req, marshalTestRegistryWebhookRequestSchema);
    let resp: TestRegistryWebhookRequest_Response | undefined;
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
        unmarshalTestRegistryWebhookRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<TransitionModelVersionStageDatabricksRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/databricks/model-versions/transition-stage`;
    const body = marshalRequest(
      req,
      marshalTransitionModelVersionStageDatabricksRequestSchema
    );
    let resp: TransitionModelVersionStageDatabricksRequest_Response | undefined;
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
        unmarshalTransitionModelVersionStageDatabricksRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Post an edit to a comment on a model version. */
  async updateComment(
    req: UpdateCommentRequest,
    options?: CallOptions
  ): Promise<UpdateCommentRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/comments/update`;
    const body = marshalRequest(req, marshalUpdateCommentRequestSchema);
    let resp: UpdateCommentRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalUpdateCommentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<UpdateRegistryWebhookRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/update`;
    const body = marshalRequest(req, marshalUpdateRegistryWebhookRequestSchema);
    let resp: UpdateRegistryWebhookRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalUpdateRegistryWebhookRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a model version. */
  async createModelVersion(
    req: CreateModelVersionRequest,
    options?: CallOptions
  ): Promise<CreateModelVersionRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/create`;
    const body = marshalRequest(req, marshalCreateModelVersionRequestSchema);
    let resp: CreateModelVersionRequest_Response | undefined;
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
        unmarshalCreateModelVersionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<CreateRegisteredModelRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/create`;
    const body = marshalRequest(req, marshalCreateRegisteredModelRequestSchema);
    let resp: CreateRegisteredModelRequest_Response | undefined;
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
        unmarshalCreateRegisteredModelRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a model version. */
  async deleteModelVersion(
    req: DeleteModelVersionRequest,
    options?: CallOptions
  ): Promise<DeleteModelVersionRequest_Response> {
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
    let resp: DeleteModelVersionRequest_Response | undefined;
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
        unmarshalDeleteModelVersionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a model version tag. */
  async deleteModelVersionTag(
    req: DeleteModelVersionTagRequest,
    options?: CallOptions
  ): Promise<DeleteModelVersionTagRequest_Response> {
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
    let resp: DeleteModelVersionTagRequest_Response | undefined;
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
        unmarshalDeleteModelVersionTagRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a registered model. */
  async deleteRegisteredModel(
    req: DeleteRegisteredModelRequest,
    options?: CallOptions
  ): Promise<DeleteRegisteredModelRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/delete`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteRegisteredModelRequest_Response | undefined;
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
        unmarshalDeleteRegisteredModelRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the tag for a registered model. */
  async deleteRegisteredModelTag(
    req: DeleteRegisteredModelTagRequest,
    options?: CallOptions
  ): Promise<DeleteRegisteredModelTagRequest_Response> {
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
    let resp: DeleteRegisteredModelTagRequest_Response | undefined;
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
        unmarshalDeleteRegisteredModelTagRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a model version. */
  async getModelVersion(
    req: GetModelVersionRequest,
    options?: CallOptions
  ): Promise<GetModelVersionRequest_Response> {
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
    let resp: GetModelVersionRequest_Response | undefined;
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
        unmarshalGetModelVersionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a URI to download the model version. */
  async getModelVersionDownloadUri(
    req: GetModelVersionDownloadUriRequest,
    options?: CallOptions
  ): Promise<GetModelVersionDownloadUriRequest_Response> {
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
    let resp: GetModelVersionDownloadUriRequest_Response | undefined;
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
        unmarshalGetModelVersionDownloadUriRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the latest version of a registered model. */
  async listLatestVersions(
    req: ListLatestVersionsRequest,
    options?: CallOptions
  ): Promise<ListLatestVersionsRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/get-latest-versions`;
    const body = marshalRequest(req, marshalListLatestVersionsRequestSchema);
    let resp: ListLatestVersionsRequest_Response | undefined;
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
        unmarshalListLatestVersionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all available registered models, up to the limit specified in __max_results__. */
  async listRegisteredModels(
    req: ListRegisteredModelsRequest,
    options?: CallOptions
  ): Promise<ListRegisteredModelsRequest_Response> {
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
    let resp: ListRegisteredModelsRequest_Response | undefined;
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
        unmarshalListRegisteredModelsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<RenameRegisteredModelRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/rename`;
    const body = marshalRequest(req, marshalRenameRegisteredModelRequestSchema);
    let resp: RenameRegisteredModelRequest_Response | undefined;
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
        unmarshalRenameRegisteredModelRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Searches for specific model versions based on the supplied __filter__. */
  async searchModelVersions(
    req: SearchModelVersionsRequest,
    options?: CallOptions
  ): Promise<SearchModelVersionsRequest_Response> {
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
    let resp: SearchModelVersionsRequest_Response | undefined;
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
        unmarshalSearchModelVersionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<SearchRegisteredModelsRequest_Response> {
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
    let resp: SearchRegisteredModelsRequest_Response | undefined;
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
        unmarshalSearchRegisteredModelsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<SetModelVersionTagRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/set-tag`;
    const body = marshalRequest(req, marshalSetModelVersionTagRequestSchema);
    let resp: SetModelVersionTagRequest_Response | undefined;
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
        unmarshalSetModelVersionTagRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Sets a tag on a registered model. */
  async setRegisteredModelTag(
    req: SetRegisteredModelTagRequest,
    options?: CallOptions
  ): Promise<SetRegisteredModelTagRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/set-tag`;
    const body = marshalRequest(req, marshalSetRegisteredModelTagRequestSchema);
    let resp: SetRegisteredModelTagRequest_Response | undefined;
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
        unmarshalSetRegisteredModelTagRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the model version. */
  async updateModelVersion(
    req: UpdateModelVersionRequest,
    options?: CallOptions
  ): Promise<UpdateModelVersionRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/update`;
    const body = marshalRequest(req, marshalUpdateModelVersionRequestSchema);
    let resp: UpdateModelVersionRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalUpdateModelVersionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a registered model. */
  async updateRegisteredModel(
    req: UpdateRegisteredModelRequest,
    options?: CallOptions
  ): Promise<UpdateRegisteredModelRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/update`;
    const body = marshalRequest(req, marshalUpdateRegisteredModelRequestSchema);
    let resp: UpdateRegisteredModelRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalUpdateRegisteredModelRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
