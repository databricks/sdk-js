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
  CreateMcpServiceRequest,
  CreateModelProviderServiceRequest,
  CreateModelServiceRequest,
  DeleteMcpServiceRequest,
  DeleteModelProviderServiceRequest,
  DeleteModelServiceRequest,
  GetMcpServiceRequest,
  GetModelProviderServiceRequest,
  GetModelServiceRequest,
  ListMcpServicesRequest,
  ListMcpServicesResponse,
  ListModelProviderServicesRequest,
  ListModelProviderServicesResponse,
  ListModelServicesRequest,
  ListModelServicesResponse,
  McpService,
  ModelProviderService,
  ModelService,
  UpdateMcpServiceRequest,
  UpdateModelProviderServiceRequest,
  UpdateModelServiceRequest,
} from './model';
import {
  marshalMcpServiceSchema,
  marshalModelProviderServiceSchema,
  marshalModelServiceSchema,
  unmarshalListMcpServicesResponseSchema,
  unmarshalListModelProviderServicesResponseSchema,
  unmarshalListModelServicesResponseSchema,
  unmarshalMcpServiceSchema,
  unmarshalModelProviderServiceSchema,
  unmarshalModelServiceSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class AiGatewayClient {
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
   * Creates an MCP service in a Unity Catalog schema. An MCP (Model Context
   * Protocol) service is a governed securable that registers an MCP server and
   * exposes its tools for discovery, access control, and invocation. The
   * caller supplies the leaf name in `mcp_service_id`.
   *
   * You must be the owner of the parent schema or have the `CREATE_SERVICE`
   * and `USE_SCHEMA` privileges on the parent schema and `USE_CATALOG` on the
   * parent catalog. You also need `USE_CONNECTION` on the connection the MCP
   * service references.
   */
  async createMcpService(
    req: CreateMcpServiceRequest,
    options?: CallOptions
  ): Promise<McpService> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/mcp-services`;
    const params = new URLSearchParams();
    if (req.parent !== undefined) {
      params.append('parent', req.parent);
    }
    if (req.mcpServiceId !== undefined) {
      params.append('mcp_service_id', req.mcpServiceId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.mcpService, marshalMcpServiceSchema);
    let resp: McpService | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMcpServiceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a model provider service in a Unity Catalog schema. A model
   * provider service is a governed connection to an external model provider
   * (for example OpenAI, Azure OpenAI, or Amazon Bedrock) that model services
   * reference to invoke that provider. The caller supplies the leaf name in
   * `model_provider_service_id`.
   *
   * You must be the owner of the parent schema or have the `CREATE_SERVICE`
   * and `USE_SCHEMA` privileges on the parent schema and `USE_CATALOG` on the
   * parent catalog.
   */
  async createModelProviderService(
    req: CreateModelProviderServiceRequest,
    options?: CallOptions
  ): Promise<ModelProviderService> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/model-provider-services`;
    const params = new URLSearchParams();
    if (req.parent !== undefined) {
      params.append('parent', req.parent);
    }
    if (req.modelProviderServiceId !== undefined) {
      params.append('model_provider_service_id', req.modelProviderServiceId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.modelProviderService,
      marshalModelProviderServiceSchema
    );
    let resp: ModelProviderService | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelProviderServiceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a model service in a Unity Catalog schema. A model service is a
   * governed AI Gateway endpoint that routes inference requests to one or more
   * model destinations. The caller supplies the leaf name in
   * `model_service_id`.
   *
   * You must be the owner of the parent schema or have the `CREATE_SERVICE`
   * and `USE_SCHEMA` privileges on the parent schema and `USE_CATALOG` on the
   * parent catalog.
   */
  async createModelService(
    req: CreateModelServiceRequest,
    options?: CallOptions
  ): Promise<ModelService> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/model-services`;
    const params = new URLSearchParams();
    if (req.parent !== undefined) {
      params.append('parent', req.parent);
    }
    if (req.modelServiceId !== undefined) {
      params.append('model_service_id', req.modelServiceId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.modelService, marshalModelServiceSchema);
    let resp: ModelService | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelServiceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes the MCP service identified by its resource name. Optionally supply
   * an `etag` to make the delete conditional on the MCP service not having
   * changed since it was read.
   *
   * You must be the owner of the MCP service or have `MANAGE` on it, plus
   * `USE_CATALOG` on the parent catalog and `USE_SCHEMA` on the parent schema.
   */
  async deleteMcpService(
    req: DeleteMcpServiceRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', String(req.etag));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Deletes the model provider service identified by its resource name.
   * Optionally supply an `etag` to make the delete conditional on the model
   * provider service not having changed since it was read.
   *
   * You must be the owner of the model provider service or have `MANAGE` on
   * it, plus `USE_CATALOG` on the parent catalog and `USE_SCHEMA` on the
   * parent schema.
   */
  async deleteModelProviderService(
    req: DeleteModelProviderServiceRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', String(req.etag));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Deletes the model service identified by its resource name. Optionally
   * supply an `etag` to make the delete conditional on the model service not
   * having changed since it was read.
   *
   * You must be the owner of the model service or have `MANAGE` on it, plus
   * `USE_CATALOG` on the parent catalog and `USE_SCHEMA` on the parent schema.
   */
  async deleteModelService(
    req: DeleteModelServiceRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', String(req.etag));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Returns the MCP service identified by its resource name.
   *
   * You must be the owner of the MCP service or have `EXECUTE`,
   * `READ_METADATA`, or `MANAGE` on it, plus `USE_CATALOG` on the parent
   * catalog and `USE_SCHEMA` on the parent schema.
   */
  async getMcpService(
    req: GetMcpServiceRequest,
    options?: CallOptions
  ): Promise<McpService> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: McpService | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMcpServiceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the model provider service identified by its resource name.
   *
   * You must be the owner of the model provider service or have `EXECUTE`,
   * `READ_METADATA`, or `MANAGE` on it, plus `USE_CATALOG` on the parent
   * catalog and `USE_SCHEMA` on the parent schema.
   */
  async getModelProviderService(
    req: GetModelProviderServiceRequest,
    options?: CallOptions
  ): Promise<ModelProviderService> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ModelProviderService | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelProviderServiceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the model service identified by its resource name.
   *
   * You must be the owner of the model service or have `EXECUTE`,
   * `READ_METADATA`, or `MANAGE` on it, plus `USE_CATALOG` on the parent
   * catalog and `USE_SCHEMA` on the parent schema.
   */
  async getModelService(
    req: GetModelServiceRequest,
    options?: CallOptions
  ): Promise<ModelService> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ModelService | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelServiceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the MCP services in a Unity Catalog schema. Provide `parent` as
   * `schemas/{catalog}.{schema}`. Results are paginated; pass the returned
   * `next_page_token` to fetch subsequent pages.
   *
   * Requires `USE_CATALOG` on the parent catalog and `USE_SCHEMA` on the
   * parent schema. Only MCP services the caller can access (as owner or
   * through `EXECUTE`, `READ_METADATA`, or `MANAGE`) are returned.
   */
  async listMcpServices(
    req: ListMcpServicesRequest,
    options?: CallOptions
  ): Promise<ListMcpServicesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/mcp-services`;
    const params = new URLSearchParams();
    if (req.parent !== undefined) {
      params.append('parent', req.parent);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListMcpServicesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListMcpServicesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listMcpServicesIter(
    req: ListMcpServicesRequest,
    options?: CallOptions
  ): AsyncGenerator<McpService> {
    const pageReq: ListMcpServicesRequest = {...req};
    for (;;) {
      const resp = await this.listMcpServices(pageReq, options);
      for (const item of resp.mcpServices ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Lists the model provider services in a Unity Catalog schema. Provide
   * `parent` as `schemas/{catalog}.{schema}`. Results are paginated; pass the
   * returned `next_page_token` to fetch subsequent pages.
   *
   * Requires `USE_CATALOG` on the parent catalog and `USE_SCHEMA` on the
   * parent schema. Only model provider services the caller can access (as
   * owner or through `EXECUTE`, `READ_METADATA`, or `MANAGE`) are returned.
   */
  async listModelProviderServices(
    req: ListModelProviderServicesRequest,
    options?: CallOptions
  ): Promise<ListModelProviderServicesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/model-provider-services`;
    const params = new URLSearchParams();
    if (req.parent !== undefined) {
      params.append('parent', req.parent);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListModelProviderServicesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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
        unmarshalListModelProviderServicesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listModelProviderServicesIter(
    req: ListModelProviderServicesRequest,
    options?: CallOptions
  ): AsyncGenerator<ModelProviderService> {
    const pageReq: ListModelProviderServicesRequest = {...req};
    for (;;) {
      const resp = await this.listModelProviderServices(pageReq, options);
      for (const item of resp.modelProviderServices ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Lists the model services in a Unity Catalog schema. Provide `parent` as
   * `schemas/{catalog}.{schema}`. Results are paginated; pass the returned
   * `next_page_token` to fetch subsequent pages.
   *
   * Requires `USE_CATALOG` on the parent catalog and `USE_SCHEMA` on the
   * parent schema. Only model services the caller can access (as owner or
   * through `EXECUTE`, `READ_METADATA`, or `MANAGE`) are returned.
   */
  async listModelServices(
    req: ListModelServicesRequest,
    options?: CallOptions
  ): Promise<ListModelServicesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/model-services`;
    const params = new URLSearchParams();
    if (req.parent !== undefined) {
      params.append('parent', req.parent);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListModelServicesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListModelServicesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listModelServicesIter(
    req: ListModelServicesRequest,
    options?: CallOptions
  ): AsyncGenerator<ModelService> {
    const pageReq: ListModelServicesRequest = {...req};
    for (;;) {
      const resp = await this.listModelServices(pageReq, options);
      for (const item of resp.modelServices ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates an MCP service. Only the fields named in `update_mask` are
   * changed; the resource name is immutable. Optionally supply an `etag` to
   * make the update conditional on the MCP service not having changed since it
   * was read.
   *
   * You must be the owner of the MCP service or have `MANAGE` on it, plus
   * `USE_CATALOG` on the parent catalog and `USE_SCHEMA` on the parent schema.
   */
  async updateMcpService(
    req: UpdateMcpServiceRequest,
    options?: CallOptions
  ): Promise<McpService> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.mcpService?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', String(req.etag));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.mcpService, marshalMcpServiceSchema);
    let resp: McpService | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMcpServiceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a model provider service. Only the fields named in `update_mask`
   * are changed; the resource name and provider type are immutable. Optionally
   * supply an `etag` to make the update conditional on the model provider
   * service not having changed since it was read.
   *
   * You must be the owner of the model provider service or have `MANAGE` on
   * it, plus `USE_CATALOG` on the parent catalog and `USE_SCHEMA` on the
   * parent schema.
   */
  async updateModelProviderService(
    req: UpdateModelProviderServiceRequest,
    options?: CallOptions
  ): Promise<ModelProviderService> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.modelProviderService?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', String(req.etag));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.modelProviderService,
      marshalModelProviderServiceSchema
    );
    let resp: ModelProviderService | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelProviderServiceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a model service. Only the fields named in `update_mask` are
   * changed; the resource name is immutable. Optionally supply an `etag` to
   * make the update conditional on the model service not having changed since
   * it was read.
   *
   * You must be the owner of the model service or have `MANAGE` on it, plus
   * `USE_CATALOG` on the parent catalog and `USE_SCHEMA` on the parent schema.
   */
  async updateModelService(
    req: UpdateModelServiceRequest,
    options?: CallOptions
  ): Promise<ModelService> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.modelService?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', String(req.etag));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.modelService, marshalModelServiceSchema);
    let resp: ModelService | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalModelServiceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
