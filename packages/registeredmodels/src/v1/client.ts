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
  CreateRegisteredModel,
  DeleteModelVersion,
  DeleteModelVersion_Response,
  DeleteRegisteredModel,
  DeleteRegisteredModelAlias,
  DeleteRegisteredModelAlias_Response,
  DeleteRegisteredModel_Response,
  GetModelVersion,
  GetModelVersionByAlias,
  GetRegisteredModel,
  ListModelVersions,
  ListModelVersions_Response,
  ListRegisteredModels,
  ListRegisteredModels_Response,
  ModelVersionInfo,
  RegisteredModelAliasInfo,
  RegisteredModelInfo,
  SetRegisteredModelAlias,
  UpdateModelVersion,
  UpdateRegisteredModel,
} from './model';
import {
  marshalCreateRegisteredModelSchema,
  marshalSetRegisteredModelAliasSchema,
  marshalUpdateModelVersionSchema,
  marshalUpdateRegisteredModelSchema,
  unmarshalDeleteModelVersion_ResponseSchema,
  unmarshalDeleteRegisteredModelAlias_ResponseSchema,
  unmarshalDeleteRegisteredModel_ResponseSchema,
  unmarshalListModelVersions_ResponseSchema,
  unmarshalListRegisteredModels_ResponseSchema,
  unmarshalModelVersionInfoSchema,
  unmarshalRegisteredModelAliasInfoSchema,
  unmarshalRegisteredModelInfoSchema,
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
    req: CreateRegisteredModel,
    options?: CallOptions
  ): Promise<RegisteredModelInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models`;
    const body = marshalRequest(req, marshalCreateRegisteredModelSchema);
    let resp: RegisteredModelInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRegisteredModelInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: DeleteModelVersion,
    options?: CallOptions
  ): Promise<DeleteModelVersion_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/versions/${String(req.versionArg ?? '')}`;
    let resp: DeleteModelVersion_Response | undefined;
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
        unmarshalDeleteModelVersion_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: DeleteRegisteredModel,
    options?: CallOptions
  ): Promise<DeleteRegisteredModel_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}`;
    let resp: DeleteRegisteredModel_Response | undefined;
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
        unmarshalDeleteRegisteredModel_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: DeleteRegisteredModelAlias,
    options?: CallOptions
  ): Promise<DeleteRegisteredModelAlias_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/aliases/${req.aliasArg ?? ''}`;
    let resp: DeleteRegisteredModelAlias_Response | undefined;
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
        unmarshalDeleteRegisteredModelAlias_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: GetModelVersion,
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelVersionInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: GetModelVersionByAlias,
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelVersionInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: GetRegisteredModel,
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRegisteredModelInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: ListModelVersions,
    options?: CallOptions
  ): Promise<ListModelVersions_Response> {
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
    let resp: ListModelVersions_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListModelVersions_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listModelVersionsIter(
    req: ListModelVersions,
    options?: CallOptions
  ): AsyncGenerator<ModelVersionInfo> {
    const pageReq: ListModelVersions = {...req};
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
    req: ListRegisteredModels,
    options?: CallOptions
  ): Promise<ListRegisteredModels_Response> {
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
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listRegisteredModelsIter(
    req: ListRegisteredModels,
    options?: CallOptions
  ): AsyncGenerator<RegisteredModelInfo> {
    const pageReq: ListRegisteredModels = {...req};
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
    req: SetRegisteredModelAlias,
    options?: CallOptions
  ): Promise<RegisteredModelAliasInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/aliases/${req.aliasArg ?? ''}`;
    const body = marshalRequest(req, marshalSetRegisteredModelAliasSchema);
    let resp: RegisteredModelAliasInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRegisteredModelAliasInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: UpdateModelVersion,
    options?: CallOptions
  ): Promise<ModelVersionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/versions/${String(req.versionArg ?? '')}`;
    const body = marshalRequest(req, marshalUpdateModelVersionSchema);
    let resp: ModelVersionInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelVersionInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: UpdateRegisteredModel,
    options?: CallOptions
  ): Promise<RegisteredModelInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateRegisteredModelSchema);
    let resp: RegisteredModelInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRegisteredModelInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
