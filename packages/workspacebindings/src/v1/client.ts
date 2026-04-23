// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
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
   * Gets workspace bindings of the catalog.
   * The caller must be a metastore admin or an owner of the catalog.
   */
  async getCatalogWorkspaceBindings(signal: AbortSignal | undefined, req: GetCatalogWorkspaceBindings, options?: Options): Promise<GetCatalogWorkspaceBindings_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspace-bindings/catalogs/${req.catalogName ?? ''}`;
    let resp: GetCatalogWorkspaceBindings_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGetCatalogWorkspaceBindings_ResponseSchema);
    };
    await execute(signal, call, options);
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
  async getWorkspaceBindings(signal: AbortSignal | undefined, req: GetWorkspaceBindings, options?: Options): Promise<GetWorkspaceBindings_Response> {
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
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGetWorkspaceBindings_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *getWorkspaceBindingsIter(signal: AbortSignal | undefined, req: GetWorkspaceBindings, options?: Options): AsyncGenerator<WorkspaceBindingInfo> {
    const pageReq: GetWorkspaceBindings = {...req};
    for (;;) {
      const resp = await this.getWorkspaceBindings(signal, pageReq, options);
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
  async updateCatalogWorkspaceBindings(signal: AbortSignal | undefined, req: UpdateCatalogWorkspaceBindings, options?: Options): Promise<UpdateCatalogWorkspaceBindings_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspace-bindings/catalogs/${req.catalogName ?? ''}`;
    const body = marshalRequest(req, marshalUpdateCatalogWorkspaceBindingsSchema);
    let resp: UpdateCatalogWorkspaceBindings_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalUpdateCatalogWorkspaceBindings_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates workspace bindings of the securable.
   * The caller must be a metastore admin or an owner of the securable.
   */
  async updateWorkspaceBindings(signal: AbortSignal | undefined, req: UpdateWorkspaceBindings, options?: Options): Promise<UpdateWorkspaceBindings_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/bindings/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const body = marshalRequest(req, marshalUpdateWorkspaceBindingsSchema);
    let resp: UpdateWorkspaceBindings_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalUpdateWorkspaceBindings_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
