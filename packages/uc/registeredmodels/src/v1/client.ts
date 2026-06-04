// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import {DEFAULT_DEBUG_TRUNCATE_BYTES} from '@databricks/sdk-core/logger/debug';
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
  CreateRegisteredModelRequest,
  DeleteModelVersionRequest,
  DeleteModelVersionResponse,
  DeleteRegisteredModelAliasRequest,
  DeleteRegisteredModelAliasResponse,
  DeleteRegisteredModelRequest,
  DeleteRegisteredModelResponse,
  GetModelVersionByAliasRequest,
  GetModelVersionRequest,
  GetRegisteredModelRequest,
  ListModelVersionsRequest,
  ListModelVersionsResponse,
  ListRegisteredModelsRequest,
  ListRegisteredModelsResponse,
  ModelVersionInfo,
  RegisteredModelAliasInfo,
  RegisteredModelInfo,
  SetRegisteredModelAliasRequest,
  UpdateModelVersionRequest,
  UpdateRegisteredModelRequest,
} from './model';
import {
  marshalCreateRegisteredModelRequestSchema,
  marshalSetRegisteredModelAliasRequestSchema,
  marshalUpdateModelVersionRequestSchema,
  marshalUpdateRegisteredModelRequestSchema,
  unmarshalDeleteModelVersionResponseSchema,
  unmarshalDeleteRegisteredModelAliasResponseSchema,
  unmarshalDeleteRegisteredModelResponseSchema,
  unmarshalListModelVersionsResponseSchema,
  unmarshalListRegisteredModelsResponseSchema,
  unmarshalModelVersionInfoSchema,
  unmarshalRegisteredModelAliasInfoSchema,
  unmarshalRegisteredModelInfoSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class RegisteredModelsClient {
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
   * Creates a new registered model in Unity Catalog.
   *
   * File storage for model versions in the registered model
   * will be located in the default location which is specified by the parent schema,
   * or the parent catalog, or the Metastore.
   *
   * For registered model creation to succeed, the user must satisfy the following conditions:
   * - The caller must be a metastore admin, or be the owner of the parent catalog and schema,
   * or have the **USE_CATALOG** privilege on the parent catalog
   * and the **USE_SCHEMA** privilege on the parent schema.
   * - The caller must have the **CREATE MODEL** or **CREATE FUNCTION** privilege on the parent schema.
   */
  async createRegisteredModel(
    req: CreateRegisteredModelRequest,
    options?: CallOptions
  ): Promise<RegisteredModelInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models`;
    const body = marshalRequest(req, marshalCreateRegisteredModelRequestSchema);
    let resp: RegisteredModelInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalRegisteredModelInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a model version from the specified registered model. Any aliases assigned to the
   * model version will also be deleted.
   *
   * The caller must be a metastore admin or an owner of the parent registered model.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   */
  async deleteModelVersion(
    req: DeleteModelVersionRequest,
    options?: CallOptions
  ): Promise<DeleteModelVersionResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/versions/${String(req.versionArg ?? '')}`;
    let resp: DeleteModelVersionResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalDeleteModelVersionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a registered model and all its model versions from the specified parent catalog and schema.
   *
   * The caller must be a metastore admin or an owner of the registered model.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   */
  async deleteRegisteredModel(
    req: DeleteRegisteredModelRequest,
    options?: CallOptions
  ): Promise<DeleteRegisteredModelResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}`;
    let resp: DeleteRegisteredModelResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
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

  /**
   * Deletes a registered model alias.
   *
   * The caller must be a metastore admin or an owner of the registered model.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   */
  async deleteRegisteredModelAlias(
    req: DeleteRegisteredModelAliasRequest,
    options?: CallOptions
  ): Promise<DeleteRegisteredModelAliasResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/aliases/${req.aliasArg ?? ''}`;
    let resp: DeleteRegisteredModelAliasResponse | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteRegisteredModelAliasResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get a model version.
   *
   * The caller must be a metastore admin or an owner of (or have the **EXECUTE**
   * privilege on) the parent registered model. For the latter case, the caller must also be the owner
   * or have the **USE_CATALOG** privilege on the parent catalog and the **USE_SCHEMA** privilege
   * on the parent schema.
   */
  async getModelVersion(
    req: GetModelVersionRequest,
    options?: CallOptions
  ): Promise<ModelVersionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/versions/${String(req.versionArg ?? '')}`;
    const params = new URLSearchParams();
    if (req.includeAliases !== undefined) {
      params.append('include_aliases', String(req.includeAliases));
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ModelVersionInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalModelVersionInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get a model version by alias.
   *
   * The caller must be a metastore admin or an owner of (or have the **EXECUTE**
   * privilege on) the registered model. For the latter case, the caller must also be the owner
   * or have the **USE_CATALOG** privilege on the parent catalog and the **USE_SCHEMA** privilege
   * on the parent schema.
   */
  async getModelVersionByAlias(
    req: GetModelVersionByAliasRequest,
    options?: CallOptions
  ): Promise<ModelVersionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/aliases/${req.aliasArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeAliases !== undefined) {
      params.append('include_aliases', String(req.includeAliases));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ModelVersionInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalModelVersionInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get a registered model.
   *
   * The caller must be a metastore admin or an owner of (or have the **EXECUTE**
   * privilege on) the registered model. For the latter case, the caller must also be the owner
   * or have the **USE_CATALOG** privilege on the parent catalog and the **USE_SCHEMA** privilege
   * on the parent schema.
   */
  async getRegisteredModel(
    req: GetRegisteredModelRequest,
    options?: CallOptions
  ): Promise<RegisteredModelInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeAliases !== undefined) {
      params.append('include_aliases', String(req.includeAliases));
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: RegisteredModelInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalRegisteredModelInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * List model versions. You can list model versions under a particular schema,
   * or list all model versions in the current metastore.
   *
   * The returned models are filtered based on the privileges of the calling user.
   * For example, the metastore admin is able to list all the model versions.
   * A regular user needs to be the owner or have the **EXECUTE** privilege
   * on the parent registered model to recieve the model versions in the response.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   *
   * There is no guarantee of a specific ordering of the elements in the response. The
   * elements in the response will not contain any aliases or tags.
   *
   * PAGINATION BEHAVIOR: The API is by default paginated, a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listModelVersions(
    req: ListModelVersionsRequest,
    options?: CallOptions
  ): Promise<ListModelVersionsResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/versions`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListModelVersionsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListModelVersionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listModelVersionsIter(
    req: ListModelVersionsRequest,
    options?: CallOptions
  ): AsyncGenerator<ModelVersionInfo> {
    const pageReq: ListModelVersionsRequest = {...req};
    for (;;) {
      const resp = await this.listModelVersions(pageReq, options);
      for (const item of resp.modelVersions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * List registered models. You can list registered models under a particular schema,
   * or list all registered models in the current metastore.
   *
   * The returned models are filtered based on the privileges of the calling user.
   * For example, the metastore admin is able to list all the registered models.
   * A regular user needs to be the owner or have the **EXECUTE** privilege
   * on the registered model to recieve the registered models in the response.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   *
   * There is no guarantee of a specific ordering of the elements in the response.
   *
   * PAGINATION BEHAVIOR: The API is by default paginated, a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listRegisteredModels(
    req: ListRegisteredModelsRequest,
    options?: CallOptions
  ): Promise<ListRegisteredModelsResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/models`;
    const params = new URLSearchParams();
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaName !== undefined) {
      params.append('schema_name', req.schemaName);
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
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
  ): AsyncGenerator<RegisteredModelInfo> {
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

  /**
   * Set an alias on the specified registered model.
   *
   * The caller must be a metastore admin or an owner of the registered model.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   */
  async setRegisteredModelAlias(
    req: SetRegisteredModelAliasRequest,
    options?: CallOptions
  ): Promise<RegisteredModelAliasInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/aliases/${req.aliasArg ?? ''}`;
    const body = marshalRequest(
      req,
      marshalSetRegisteredModelAliasRequestSchema
    );
    let resp: RegisteredModelAliasInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalRegisteredModelAliasInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the specified model version.
   *
   * The caller must be a metastore admin or an owner of the parent registered model.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   *
   * Currently only the comment of the model version can be updated.
   */
  async updateModelVersion(
    req: UpdateModelVersionRequest,
    options?: CallOptions
  ): Promise<ModelVersionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/versions/${String(req.versionArg ?? '')}`;
    const body = marshalRequest(req, marshalUpdateModelVersionRequestSchema);
    let resp: ModelVersionInfo | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalModelVersionInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the specified registered model.
   *
   * The caller must be a metastore admin or an owner of the registered model.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   *
   * Currently only the name, the owner or the comment of the registered model can be updated.
   */
  async updateRegisteredModel(
    req: UpdateRegisteredModelRequest,
    options?: CallOptions
  ): Promise<RegisteredModelInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateRegisteredModelRequestSchema);
    let resp: RegisteredModelInfo | undefined;
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalRegisteredModelInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
