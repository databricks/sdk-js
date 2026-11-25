// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  encodePathVariable,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  GetCatalogWorkspaceBindingsRequest,
  GetCatalogWorkspaceBindingsResponse,
  GetWorkspaceBindingsRequest,
  GetWorkspaceBindingsResponse,
  UpdateCatalogWorkspaceBindingsRequest,
  UpdateCatalogWorkspaceBindingsResponse,
  UpdateWorkspaceBindingsRequest,
  UpdateWorkspaceBindingsResponse,
  WorkspaceBindingInfo,
} from './model';
import {
  marshalUpdateCatalogWorkspaceBindingsRequestSchema,
  marshalUpdateWorkspaceBindingsRequestSchema,
  unmarshalGetCatalogWorkspaceBindingsResponseSchema,
  unmarshalGetWorkspaceBindingsResponseSchema,
  unmarshalUpdateCatalogWorkspaceBindingsResponseSchema,
  unmarshalUpdateWorkspaceBindingsResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class WorkspaceBindingsClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
    return this.config;
  }

  /**
   * Gets workspace bindings of the catalog.
   * The caller must be a metastore admin or an owner of the catalog.
   */
  async getCatalogWorkspaceBindings(
    req: GetCatalogWorkspaceBindingsRequest,
    options?: CallOptions
  ): Promise<GetCatalogWorkspaceBindingsResponse> {
    if (req.catalogName === undefined) {
      throw new Error('path parameter "catalog_name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/workspace-bindings/catalogs/${encodePathVariable(req.catalogName)}`;
    let resp: GetCatalogWorkspaceBindingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetCatalogWorkspaceBindingsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    req: GetWorkspaceBindingsRequest,
    options?: CallOptions
  ): Promise<GetWorkspaceBindingsResponse> {
    if (req.securableType === undefined) {
      throw new Error('path parameter "securable_type" is required');
    }
    if (req.securableFullName === undefined) {
      throw new Error('path parameter "securable_full_name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/bindings/${encodePathVariable(req.securableType)}/${encodePathVariable(req.securableFullName)}`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetWorkspaceBindingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetWorkspaceBindingsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *getWorkspaceBindingsIter(
    req: GetWorkspaceBindingsRequest,
    options?: CallOptions
  ): AsyncGenerator<WorkspaceBindingInfo> {
    const pageReq: GetWorkspaceBindingsRequest = {...req};
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
    req: UpdateCatalogWorkspaceBindingsRequest,
    options?: CallOptions
  ): Promise<UpdateCatalogWorkspaceBindingsResponse> {
    if (req.catalogName === undefined) {
      throw new Error('path parameter "catalog_name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/workspace-bindings/catalogs/${encodePathVariable(req.catalogName)}`;
    const body = marshalRequest(
      req,
      marshalUpdateCatalogWorkspaceBindingsRequestSchema
    );
    let resp: UpdateCatalogWorkspaceBindingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateCatalogWorkspaceBindingsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates workspace bindings of the securable.
   * The caller must be a metastore admin or an owner of the securable.
   */
  async updateWorkspaceBindings(
    req: UpdateWorkspaceBindingsRequest,
    options?: CallOptions
  ): Promise<UpdateWorkspaceBindingsResponse> {
    if (req.securableType === undefined) {
      throw new Error('path parameter "securable_type" is required');
    }
    if (req.securableFullName === undefined) {
      throw new Error('path parameter "securable_full_name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/bindings/${encodePathVariable(req.securableType)}/${encodePathVariable(req.securableFullName)}`;
    const body = marshalRequest(
      req,
      marshalUpdateWorkspaceBindingsRequestSchema
    );
    let resp: UpdateWorkspaceBindingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateWorkspaceBindingsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
