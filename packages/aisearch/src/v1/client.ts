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
  CreateEndpointRequest,
  CreateIndexRequest,
  DeleteEndpointRequest,
  DeleteIndexRequest,
  Endpoint,
  GetEndpointRequest,
  GetIndexRequest,
  Index,
  ListEndpointsRequest,
  ListEndpointsResponse,
  ListIndexesRequest,
  ListIndexesResponse,
  QueryIndexRequest,
  QueryIndexResponse,
  RemoveDataRequest,
  RemoveDataResponse,
  ScanIndexRequest,
  ScanIndexResponse,
  SyncIndexRequest,
  SyncIndexResponse,
  UpdateEndpointRequest,
  UpsertDataRequest,
  UpsertDataResponse,
} from './model';
import {
  marshalEndpointSchema,
  marshalIndexSchema,
  marshalQueryIndexRequestSchema,
  marshalRemoveDataRequestSchema,
  marshalScanIndexRequestSchema,
  marshalSyncIndexRequestSchema,
  marshalUpsertDataRequestSchema,
  unmarshalEndpointSchema,
  unmarshalIndexSchema,
  unmarshalListEndpointsResponseSchema,
  unmarshalListIndexesResponseSchema,
  unmarshalQueryIndexResponseSchema,
  unmarshalRemoveDataResponseSchema,
  unmarshalScanIndexResponseSchema,
  unmarshalSyncIndexResponseSchema,
  unmarshalUpsertDataResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class AiSearchClient {
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
   * Create a new AI Search index. The index is provisioned asynchronously; `status.ready` on
   * GetIndex reports when it can serve queries.
   */
  async createIndex(
    req: CreateIndexRequest,
    options?: CallOptions
  ): Promise<Index> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.parent)}/indexes`;
    const params = new URLSearchParams();
    if (req.indexId !== undefined) {
      params.append('index_id', req.indexId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.index === undefined
        ? 'null'
        : marshalRequest(req.index, marshalIndexSchema);
    let resp: Index | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      resp = parseResponse(respBody, unmarshalIndexSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete an AI Search index. */
  async deleteIndex(
    req: DeleteIndexRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.name)}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Get details for a single AI Search index. */
  async getIndex(req: GetIndexRequest, options?: CallOptions): Promise<Index> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.name)}`;
    let resp: Index | undefined;
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
      resp = parseResponse(respBody, unmarshalIndexSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List AI Search indexes on an endpoint. */
  async listIndexes(
    req: ListIndexesRequest,
    options?: CallOptions
  ): Promise<ListIndexesResponse> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.parent)}/indexes`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListIndexesResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListIndexesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listIndexesIter(
    req: ListIndexesRequest,
    options?: CallOptions
  ): AsyncGenerator<Index> {
    const pageReq: ListIndexesRequest = {...req};
    for (;;) {
      const resp = await this.listIndexes(pageReq, options);
      for (const item of resp.indexes ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Query (search) an AI Search index. Read-only, so a read-scoped token may invoke it. */
  async queryIndex(
    req: QueryIndexRequest,
    options?: CallOptions
  ): Promise<QueryIndexResponse> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.name)}:query`;
    const body = marshalRequest(req, marshalQueryIndexRequestSchema);
    let resp: QueryIndexResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalQueryIndexResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Remove rows by primary key from a Direct Access AI Search index. */
  async removeData(
    req: RemoveDataRequest,
    options?: CallOptions
  ): Promise<RemoveDataResponse> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.name)}:removeData`;
    const body = marshalRequest(req, marshalRemoveDataRequestSchema);
    let resp: RemoveDataResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRemoveDataResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Scan (paginate over) the rows of an AI Search index. */
  async scanIndex(
    req: ScanIndexRequest,
    options?: CallOptions
  ): Promise<ScanIndexResponse> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.name)}:scan`;
    const body = marshalRequest(req, marshalScanIndexRequestSchema);
    let resp: ScanIndexResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalScanIndexResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Start a sync of a Delta Sync AI Search index with its source Delta table. Use it with
   * `TRIGGERED` pipelines; `CONTINUOUS` pipelines sync automatically. Direct Access indexes are
   * written through UpsertData instead.
   */
  async syncIndex(
    req: SyncIndexRequest,
    options?: CallOptions
  ): Promise<SyncIndexResponse> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.name)}:sync`;
    const body = marshalRequest(req, marshalSyncIndexRequestSchema);
    let resp: SyncIndexResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSyncIndexResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Upsert rows into a Direct Access AI Search index. */
  async upsertData(
    req: UpsertDataRequest,
    options?: CallOptions
  ): Promise<UpsertDataResponse> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.name)}:upsertData`;
    const body = marshalRequest(req, marshalUpsertDataRequestSchema);
    let resp: UpsertDataResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpsertDataResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a new AI Search endpoint. */
  async createEndpoint(
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.parent)}/endpoints`;
    const params = new URLSearchParams();
    if (req.endpointId !== undefined) {
      params.append('endpoint_id', req.endpointId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.endpoint === undefined
        ? 'null'
        : marshalRequest(req.endpoint, marshalEndpointSchema);
    let resp: Endpoint | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete an AI Search endpoint. */
  async deleteEndpoint(
    req: DeleteEndpointRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.name)}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Get details for a single AI Search endpoint. */
  async getEndpoint(
    req: GetEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.name)}`;
    let resp: Endpoint | undefined;
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
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List AI Search endpoints in a workspace. */
  async listEndpoints(
    req: ListEndpointsRequest,
    options?: CallOptions
  ): Promise<ListEndpointsResponse> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.parent)}/endpoints`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListEndpointsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListEndpointsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listEndpointsIter(
    req: ListEndpointsRequest,
    options?: CallOptions
  ): AsyncGenerator<Endpoint> {
    const pageReq: ListEndpointsRequest = {...req};
    for (;;) {
      const resp = await this.listEndpoints(pageReq, options);
      for (const item of resp.endpoints ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Update an existing AI Search endpoint. Only the fields named in `update_mask` change.
   * The server applies a mask that spans several settings, such as `budget_policy_id` and
   * `custom_tags`, one setting at a time, so if a later setting fails, the earlier ones may
   * already have been applied.
   */
  async updateEndpoint(
    req: UpdateEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/ai-search/${encodePathVariable(req.endpoint?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.endpoint === undefined
        ? 'null'
        : marshalRequest(req.endpoint, marshalEndpointSchema);
    let resp: Endpoint | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
