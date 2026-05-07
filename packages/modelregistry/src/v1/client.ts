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
  ApproveTransitionRequest,
  ApproveTransitionRequest_Response,
  CreateComment,
  CreateComment_Response,
  CreateModelVersion,
  CreateModelVersion_Response,
  CreateRegisteredModel,
  CreateRegisteredModel_Response,
  CreateRegistryWebhook,
  CreateRegistryWebhook_Response,
  CreateTransitionRequest,
  CreateTransitionRequest_Response,
  DeleteComment,
  DeleteComment_Response,
  DeleteModelVersion,
  DeleteModelVersionTag,
  DeleteModelVersionTag_Response,
  DeleteModelVersion_Response,
  DeleteRegisteredModel,
  DeleteRegisteredModelTag,
  DeleteRegisteredModelTag_Response,
  DeleteRegisteredModel_Response,
  DeleteRegistryWebhook,
  DeleteRegistryWebhook_Response,
  DeleteTransitionRequest,
  DeleteTransitionRequest_Response,
  GetLatestVersions,
  GetLatestVersions_Response,
  GetModelVersion,
  GetModelVersionDownloadUri,
  GetModelVersionDownloadUri_Response,
  GetModelVersion_Response,
  GetRegisteredModelDatabricks,
  GetRegisteredModelDatabricks_Response,
  ListRegisteredModels,
  ListRegisteredModels_Response,
  ListRegistryWebhooks,
  ListRegistryWebhooks_Response,
  ListTransitionRequest,
  ListTransitionRequest_Response,
  ModelVersion,
  RegisteredModel,
  RegistryWebhook,
  RejectTransitionRequest,
  RejectTransitionRequest_Response,
  RenameRegisteredModel,
  RenameRegisteredModel_Response,
  SearchModelVersions,
  SearchModelVersions_Response,
  SearchRegisteredModels,
  SearchRegisteredModels_Response,
  SetModelVersionTag,
  SetModelVersionTag_Response,
  SetRegisteredModelTag,
  SetRegisteredModelTag_Response,
  TestRegistryWebhook,
  TestRegistryWebhook_Response,
  TransitionModelVersionStageDatabricks,
  TransitionModelVersionStageDatabricks_Response,
  UpdateComment,
  UpdateComment_Response,
  UpdateModelVersion,
  UpdateModelVersion_Response,
  UpdateRegisteredModel,
  UpdateRegisteredModel_Response,
  UpdateRegistryWebhook,
  UpdateRegistryWebhook_Response,
} from './model';
import {
  marshalApproveTransitionRequestSchema,
  marshalCreateCommentSchema,
  marshalCreateModelVersionSchema,
  marshalCreateRegisteredModelSchema,
  marshalCreateRegistryWebhookSchema,
  marshalCreateTransitionRequestSchema,
  marshalGetLatestVersionsSchema,
  marshalRejectTransitionRequestSchema,
  marshalRenameRegisteredModelSchema,
  marshalSetModelVersionTagSchema,
  marshalSetRegisteredModelTagSchema,
  marshalTestRegistryWebhookSchema,
  marshalTransitionModelVersionStageDatabricksSchema,
  marshalUpdateCommentSchema,
  marshalUpdateModelVersionSchema,
  marshalUpdateRegisteredModelSchema,
  marshalUpdateRegistryWebhookSchema,
  unmarshalApproveTransitionRequest_ResponseSchema,
  unmarshalCreateComment_ResponseSchema,
  unmarshalCreateModelVersion_ResponseSchema,
  unmarshalCreateRegisteredModel_ResponseSchema,
  unmarshalCreateRegistryWebhook_ResponseSchema,
  unmarshalCreateTransitionRequest_ResponseSchema,
  unmarshalDeleteComment_ResponseSchema,
  unmarshalDeleteModelVersionTag_ResponseSchema,
  unmarshalDeleteModelVersion_ResponseSchema,
  unmarshalDeleteRegisteredModelTag_ResponseSchema,
  unmarshalDeleteRegisteredModel_ResponseSchema,
  unmarshalDeleteRegistryWebhook_ResponseSchema,
  unmarshalDeleteTransitionRequest_ResponseSchema,
  unmarshalGetLatestVersions_ResponseSchema,
  unmarshalGetModelVersionDownloadUri_ResponseSchema,
  unmarshalGetModelVersion_ResponseSchema,
  unmarshalGetRegisteredModelDatabricks_ResponseSchema,
  unmarshalListRegisteredModels_ResponseSchema,
  unmarshalListRegistryWebhooks_ResponseSchema,
  unmarshalListTransitionRequest_ResponseSchema,
  unmarshalRejectTransitionRequest_ResponseSchema,
  unmarshalRenameRegisteredModel_ResponseSchema,
  unmarshalSearchModelVersions_ResponseSchema,
  unmarshalSearchRegisteredModels_ResponseSchema,
  unmarshalSetModelVersionTag_ResponseSchema,
  unmarshalSetRegisteredModelTag_ResponseSchema,
  unmarshalTestRegistryWebhook_ResponseSchema,
  unmarshalTransitionModelVersionStageDatabricks_ResponseSchema,
  unmarshalUpdateComment_ResponseSchema,
  unmarshalUpdateModelVersion_ResponseSchema,
  unmarshalUpdateRegisteredModel_ResponseSchema,
  unmarshalUpdateRegistryWebhook_ResponseSchema,
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

  /** Approves a model version stage transition request. */
  async approveTransitionRequest(
    signal: AbortSignal | undefined,
    req: ApproveTransitionRequest,
    options?: CallOptions
  ): Promise<ApproveTransitionRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/approve`;
    const body = marshalRequest(req, marshalApproveTransitionRequestSchema);
    let resp: ApproveTransitionRequest_Response | undefined;
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
        unmarshalApproveTransitionRequest_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: CreateComment,
    options?: CallOptions
  ): Promise<CreateComment_Response> {
    const url = `${this.host}/api/2.0/mlflow/comments/create`;
    const body = marshalRequest(req, marshalCreateCommentSchema);
    let resp: CreateComment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateComment_ResponseSchema);
    };
    await executeCall(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: CreateRegistryWebhook,
    options?: CallOptions
  ): Promise<CreateRegistryWebhook_Response> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/create`;
    const body = marshalRequest(req, marshalCreateRegistryWebhookSchema);
    let resp: CreateRegistryWebhook_Response | undefined;
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
        unmarshalCreateRegistryWebhook_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a model version stage transition request. */
  async createTransitionRequest(
    signal: AbortSignal | undefined,
    req: CreateTransitionRequest,
    options?: CallOptions
  ): Promise<CreateTransitionRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/create`;
    const body = marshalRequest(req, marshalCreateTransitionRequestSchema);
    let resp: CreateTransitionRequest_Response | undefined;
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
        unmarshalCreateTransitionRequest_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a comment on a model version. */
  async deleteComment(
    signal: AbortSignal | undefined,
    req: DeleteComment,
    options?: CallOptions
  ): Promise<DeleteComment_Response> {
    const url = `${this.host}/api/2.0/mlflow/comments/delete`;
    const params = new URLSearchParams();
    if (req.id !== undefined) {
      params.append('id', req.id);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteComment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteComment_ResponseSchema);
    };
    await executeCall(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: DeleteRegistryWebhook,
    options?: CallOptions
  ): Promise<DeleteRegistryWebhook_Response> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/delete`;
    const params = new URLSearchParams();
    if (req.id !== undefined) {
      params.append('id', req.id);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteRegistryWebhook_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteRegistryWebhook_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Cancels a model version stage transition request. */
  async deleteTransitionRequest(
    signal: AbortSignal | undefined,
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
    await executeCall(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetRegisteredModelDatabricks,
    options?: CallOptions
  ): Promise<GetRegisteredModelDatabricks_Response> {
    const url = `${this.host}/api/2.0/mlflow/databricks/registered-models/get`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetRegisteredModelDatabricks_Response | undefined;
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
        unmarshalGetRegisteredModelDatabricks_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ListRegistryWebhooks,
    options?: CallOptions
  ): Promise<ListRegistryWebhooks_Response> {
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
    let resp: ListRegistryWebhooks_Response | undefined;
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
        unmarshalListRegistryWebhooks_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listRegistryWebhooksIter(
    signal: AbortSignal | undefined,
    req: ListRegistryWebhooks,
    options?: CallOptions
  ): AsyncGenerator<RegistryWebhook> {
    const pageReq: ListRegistryWebhooks = {...req};
    for (;;) {
      const resp = await this.listRegistryWebhooks(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
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
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Rejects a model version stage transition request. */
  async rejectTransitionRequest(
    signal: AbortSignal | undefined,
    req: RejectTransitionRequest,
    options?: CallOptions
  ): Promise<RejectTransitionRequest_Response> {
    const url = `${this.host}/api/2.0/mlflow/transition-requests/reject`;
    const body = marshalRequest(req, marshalRejectTransitionRequestSchema);
    let resp: RejectTransitionRequest_Response | undefined;
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
        unmarshalRejectTransitionRequest_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: TestRegistryWebhook,
    options?: CallOptions
  ): Promise<TestRegistryWebhook_Response> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/test`;
    const body = marshalRequest(req, marshalTestRegistryWebhookSchema);
    let resp: TestRegistryWebhook_Response | undefined;
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
        unmarshalTestRegistryWebhook_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: TransitionModelVersionStageDatabricks,
    options?: CallOptions
  ): Promise<TransitionModelVersionStageDatabricks_Response> {
    const url = `${this.host}/api/2.0/mlflow/databricks/model-versions/transition-stage`;
    const body = marshalRequest(
      req,
      marshalTransitionModelVersionStageDatabricksSchema
    );
    let resp: TransitionModelVersionStageDatabricks_Response | undefined;
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
        unmarshalTransitionModelVersionStageDatabricks_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Post an edit to a comment on a model version. */
  async updateComment(
    signal: AbortSignal | undefined,
    req: UpdateComment,
    options?: CallOptions
  ): Promise<UpdateComment_Response> {
    const url = `${this.host}/api/2.0/mlflow/comments/update`;
    const body = marshalRequest(req, marshalUpdateCommentSchema);
    let resp: UpdateComment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateComment_ResponseSchema);
    };
    await executeCall(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateRegistryWebhook,
    options?: CallOptions
  ): Promise<UpdateRegistryWebhook_Response> {
    const url = `${this.host}/api/2.0/mlflow/registry-webhooks/update`;
    const body = marshalRequest(req, marshalUpdateRegistryWebhookSchema);
    let resp: UpdateRegistryWebhook_Response | undefined;
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
        unmarshalUpdateRegistryWebhook_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a model version. */
  async createModelVersion(
    signal: AbortSignal | undefined,
    req: CreateModelVersion,
    options?: CallOptions
  ): Promise<CreateModelVersion_Response> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/create`;
    const body = marshalRequest(req, marshalCreateModelVersionSchema);
    let resp: CreateModelVersion_Response | undefined;
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
        unmarshalCreateModelVersion_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: CreateRegisteredModel,
    options?: CallOptions
  ): Promise<CreateRegisteredModel_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/create`;
    const body = marshalRequest(req, marshalCreateRegisteredModelSchema);
    let resp: CreateRegisteredModel_Response | undefined;
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
        unmarshalCreateRegisteredModel_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a model version. */
  async deleteModelVersion(
    signal: AbortSignal | undefined,
    req: DeleteModelVersion,
    options?: CallOptions
  ): Promise<DeleteModelVersion_Response> {
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
    let resp: DeleteModelVersion_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteModelVersion_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a model version tag. */
  async deleteModelVersionTag(
    signal: AbortSignal | undefined,
    req: DeleteModelVersionTag,
    options?: CallOptions
  ): Promise<DeleteModelVersionTag_Response> {
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
    let resp: DeleteModelVersionTag_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteModelVersionTag_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a registered model. */
  async deleteRegisteredModel(
    signal: AbortSignal | undefined,
    req: DeleteRegisteredModel,
    options?: CallOptions
  ): Promise<DeleteRegisteredModel_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/delete`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteRegisteredModel_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteRegisteredModel_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the tag for a registered model. */
  async deleteRegisteredModelTag(
    signal: AbortSignal | undefined,
    req: DeleteRegisteredModelTag,
    options?: CallOptions
  ): Promise<DeleteRegisteredModelTag_Response> {
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
    let resp: DeleteRegisteredModelTag_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteRegisteredModelTag_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the latest version of a registered model. */
  async getLatestVersions(
    signal: AbortSignal | undefined,
    req: GetLatestVersions,
    options?: CallOptions
  ): Promise<GetLatestVersions_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/get-latest-versions`;
    const body = marshalRequest(req, marshalGetLatestVersionsSchema);
    let resp: GetLatestVersions_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetLatestVersions_ResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a model version. */
  async getModelVersion(
    signal: AbortSignal | undefined,
    req: GetModelVersion,
    options?: CallOptions
  ): Promise<GetModelVersion_Response> {
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
    let resp: GetModelVersion_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetModelVersion_ResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a URI to download the model version. */
  async getModelVersionDownloadUri(
    signal: AbortSignal | undefined,
    req: GetModelVersionDownloadUri,
    options?: CallOptions
  ): Promise<GetModelVersionDownloadUri_Response> {
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
    let resp: GetModelVersionDownloadUri_Response | undefined;
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
        unmarshalGetModelVersionDownloadUri_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all available registered models, up to the limit specified in __max_results__. */
  async listRegisteredModels(
    signal: AbortSignal | undefined,
    req: ListRegisteredModels,
    options?: CallOptions
  ): Promise<ListRegisteredModels_Response> {
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
    let resp: ListRegisteredModels_Response | undefined;
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
        unmarshalListRegisteredModels_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listRegisteredModelsIter(
    signal: AbortSignal | undefined,
    req: ListRegisteredModels,
    options?: CallOptions
  ): AsyncGenerator<RegisteredModel> {
    const pageReq: ListRegisteredModels = {...req};
    for (;;) {
      const resp = await this.listRegisteredModels(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: RenameRegisteredModel,
    options?: CallOptions
  ): Promise<RenameRegisteredModel_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/rename`;
    const body = marshalRequest(req, marshalRenameRegisteredModelSchema);
    let resp: RenameRegisteredModel_Response | undefined;
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
        unmarshalRenameRegisteredModel_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Searches for specific model versions based on the supplied __filter__. */
  async searchModelVersions(
    signal: AbortSignal | undefined,
    req: SearchModelVersions,
    options?: CallOptions
  ): Promise<SearchModelVersions_Response> {
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
    let resp: SearchModelVersions_Response | undefined;
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
        unmarshalSearchModelVersions_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *searchModelVersionsIter(
    signal: AbortSignal | undefined,
    req: SearchModelVersions,
    options?: CallOptions
  ): AsyncGenerator<ModelVersion> {
    const pageReq: SearchModelVersions = {...req};
    for (;;) {
      const resp = await this.searchModelVersions(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: SearchRegisteredModels,
    options?: CallOptions
  ): Promise<SearchRegisteredModels_Response> {
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
    let resp: SearchRegisteredModels_Response | undefined;
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
        unmarshalSearchRegisteredModels_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *searchRegisteredModelsIter(
    signal: AbortSignal | undefined,
    req: SearchRegisteredModels,
    options?: CallOptions
  ): AsyncGenerator<RegisteredModel> {
    const pageReq: SearchRegisteredModels = {...req};
    for (;;) {
      const resp = await this.searchRegisteredModels(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: SetModelVersionTag,
    options?: CallOptions
  ): Promise<SetModelVersionTag_Response> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/set-tag`;
    const body = marshalRequest(req, marshalSetModelVersionTagSchema);
    let resp: SetModelVersionTag_Response | undefined;
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
        unmarshalSetModelVersionTag_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Sets a tag on a registered model. */
  async setRegisteredModelTag(
    signal: AbortSignal | undefined,
    req: SetRegisteredModelTag,
    options?: CallOptions
  ): Promise<SetRegisteredModelTag_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/set-tag`;
    const body = marshalRequest(req, marshalSetRegisteredModelTagSchema);
    let resp: SetRegisteredModelTag_Response | undefined;
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
        unmarshalSetRegisteredModelTag_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the model version. */
  async updateModelVersion(
    signal: AbortSignal | undefined,
    req: UpdateModelVersion,
    options?: CallOptions
  ): Promise<UpdateModelVersion_Response> {
    const url = `${this.host}/api/2.0/mlflow/model-versions/update`;
    const body = marshalRequest(req, marshalUpdateModelVersionSchema);
    let resp: UpdateModelVersion_Response | undefined;
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
        unmarshalUpdateModelVersion_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a registered model. */
  async updateRegisteredModel(
    signal: AbortSignal | undefined,
    req: UpdateRegisteredModel,
    options?: CallOptions
  ): Promise<UpdateRegisteredModel_Response> {
    const url = `${this.host}/api/2.0/mlflow/registered-models/update`;
    const body = marshalRequest(req, marshalUpdateRegisteredModelSchema);
    let resp: UpdateRegisteredModel_Response | undefined;
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
        unmarshalUpdateRegisteredModel_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
