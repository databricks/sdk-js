// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
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
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/workspace-bindings/catalogs/${req.catalogName ?? ''}`;
    let resp: GetCatalogWorkspaceBindingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/bindings/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
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
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/workspace-bindings/catalogs/${req.catalogName ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateCatalogWorkspaceBindingsRequestSchema
    );
    let resp: UpdateCatalogWorkspaceBindingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/bindings/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateWorkspaceBindingsRequestSchema
    );
    let resp: UpdateWorkspaceBindingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
