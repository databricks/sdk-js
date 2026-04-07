// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
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

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
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
    signal: AbortSignal | undefined,
    req: CreateRegisteredModel,
    options?: Options
  ): Promise<RegisteredModelInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models`;
    const body = marshalRequest(req, marshalCreateRegisteredModelSchema);
    let resp: RegisteredModelInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRegisteredModelInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: DeleteModelVersion,
    options?: Options
  ): Promise<DeleteModelVersion_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/versions/${String(req.versionArg ?? '')}`;
    let resp: DeleteModelVersion_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: DeleteRegisteredModel,
    options?: Options
  ): Promise<DeleteRegisteredModel_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}`;
    let resp: DeleteRegisteredModel_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: DeleteRegisteredModelAlias,
    options?: Options
  ): Promise<DeleteRegisteredModelAlias_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/aliases/${req.aliasArg ?? ''}`;
    let resp: DeleteRegisteredModelAlias_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetModelVersion,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelVersionInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetModelVersionByAlias,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelVersionInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetRegisteredModel,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRegisteredModelInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ListModelVersions,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListModelVersions_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listModelVersionsIter(
    signal: AbortSignal | undefined,
    req: ListModelVersions,
    options?: Options
  ): AsyncGenerator<ModelVersionInfo> {
    const pageReq: ListModelVersions = {...req};
    for (;;) {
      const resp = await this.listModelVersions(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListRegisteredModels,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listRegisteredModelsIter(
    signal: AbortSignal | undefined,
    req: ListRegisteredModels,
    options?: Options
  ): AsyncGenerator<RegisteredModelInfo> {
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

  /**
   * Set an alias on the specified registered model.
   *
   * The caller must be a metastore admin or an owner of the registered model.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   */
  async setRegisteredModelAlias(
    signal: AbortSignal | undefined,
    req: SetRegisteredModelAlias,
    options?: Options
  ): Promise<RegisteredModelAliasInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/aliases/${req.aliasArg ?? ''}`;
    const body = marshalRequest(req, marshalSetRegisteredModelAliasSchema);
    let resp: RegisteredModelAliasInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRegisteredModelAliasInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateModelVersion,
    options?: Options
  ): Promise<ModelVersionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}/versions/${String(req.versionArg ?? '')}`;
    const body = marshalRequest(req, marshalUpdateModelVersionSchema);
    let resp: ModelVersionInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelVersionInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateRegisteredModel,
    options?: Options
  ): Promise<RegisteredModelInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/models/${req.fullNameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateRegisteredModelSchema);
    let resp: RegisteredModelInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRegisteredModelInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
