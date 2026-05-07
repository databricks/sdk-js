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
  GetCatalogWorkspaceBindings,
  GetCatalogWorkspaceBindings_Response,
  GetWorkspaceBindings,
  GetWorkspaceBindings_Response,
  UpdateCatalogWorkspaceBindings,
  UpdateCatalogWorkspaceBindings_Response,
  UpdateWorkspaceBindings,
  UpdateWorkspaceBindings_Response,
  WorkspaceBindingInfo,
} from './model';
import {
  marshalUpdateCatalogWorkspaceBindingsSchema,
  marshalUpdateWorkspaceBindingsSchema,
  unmarshalGetCatalogWorkspaceBindings_ResponseSchema,
  unmarshalGetWorkspaceBindings_ResponseSchema,
  unmarshalUpdateCatalogWorkspaceBindings_ResponseSchema,
  unmarshalUpdateWorkspaceBindings_ResponseSchema,
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
   * Gets workspace bindings of the catalog.
   * The caller must be a metastore admin or an owner of the catalog.
   */
  async getCatalogWorkspaceBindings(
    req: GetCatalogWorkspaceBindings,
    options?: CallOptions
  ): Promise<GetCatalogWorkspaceBindings_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspace-bindings/catalogs/${req.catalogName ?? ''}`;
    let resp: GetCatalogWorkspaceBindings_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetCatalogWorkspaceBindings_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets workspace bindings of the securable.
   * The caller must be a metastore admin or an owner of the securable.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async getWorkspaceBindings(
    req: GetWorkspaceBindings,
    options?: CallOptions
  ): Promise<GetWorkspaceBindings_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/bindings/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetWorkspaceBindings_Response | undefined;
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
        unmarshalGetWorkspaceBindings_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *getWorkspaceBindingsIter(
    req: GetWorkspaceBindings,
    options?: CallOptions
  ): AsyncGenerator<WorkspaceBindingInfo> {
    const pageReq: GetWorkspaceBindings = {...req};
    for (;;) {
      const resp = await this.getWorkspaceBindings(pageReq, options);
      for (const item of resp.bindings ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates workspace bindings of the catalog.
   * The caller must be a metastore admin or an owner of the catalog.
   */
  async updateCatalogWorkspaceBindings(
    req: UpdateCatalogWorkspaceBindings,
    options?: CallOptions
  ): Promise<UpdateCatalogWorkspaceBindings_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspace-bindings/catalogs/${req.catalogName ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateCatalogWorkspaceBindingsSchema
    );
    let resp: UpdateCatalogWorkspaceBindings_Response | undefined;
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
        unmarshalUpdateCatalogWorkspaceBindings_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates workspace bindings of the securable.
   * The caller must be a metastore admin or an owner of the securable.
   */
  async updateWorkspaceBindings(
    req: UpdateWorkspaceBindings,
    options?: CallOptions
  ): Promise<UpdateWorkspaceBindings_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/bindings/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const body = marshalRequest(req, marshalUpdateWorkspaceBindingsSchema);
    let resp: UpdateWorkspaceBindings_Response | undefined;
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
        unmarshalUpdateWorkspaceBindings_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
