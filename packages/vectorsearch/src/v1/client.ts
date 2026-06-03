// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {LroOptions} from '@databricks/sdk-options/lro';
import type {HttpClient} from '@databricks/sdk-core/http';
import {resolveClientConfig} from '@databricks/sdk-core/config';
import {newHttpClient} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateEndpointRequest,
  CreateVectorIndexRequest,
  DeleteDataVectorIndexRequest,
  DeleteDataVectorIndexResponse,
  DeleteEndpointRequest,
  DeleteEndpointResponse,
  DeleteVectorIndexRequest,
  DeleteVectorIndexResponse,
  Endpoint,
  GetEndpointRequest,
  GetVectorIndexRequest,
  ListEndpointRequest,
  ListEndpointResponse,
  ListVectorIndexRequest,
  ListVectorIndexResponse,
  MiniVectorIndex,
  PatchEndpointBudgetPolicyRequest,
  PatchEndpointBudgetPolicyResponse,
  PatchEndpointRequest,
  QueryVectorIndexNextPageRequest,
  QueryVectorIndexRequest,
  QueryVectorIndexResponse,
  RetrieveUserVisibleMetricsRequest,
  RetrieveUserVisibleMetricsResponse,
  ScanVectorIndexRequest,
  ScanVectorIndexResponse,
  SyncVectorIndexRequest,
  SyncVectorIndexResponse,
  UpdateEndpointCustomTagsRequest,
  UpdateEndpointCustomTagsResponse,
  UpsertDataVectorIndexRequest,
  UpsertDataVectorIndexResponse,
  VectorIndex,
} from './model';
import {
  EndpointStatus_State,
  marshalCreateEndpointRequestSchema,
  marshalCreateVectorIndexRequestSchema,
  marshalPatchEndpointBudgetPolicyRequestSchema,
  marshalPatchEndpointRequestSchema,
  marshalQueryVectorIndexNextPageRequestSchema,
  marshalQueryVectorIndexRequestSchema,
  marshalRetrieveUserVisibleMetricsRequestSchema,
  marshalScanVectorIndexRequestSchema,
  marshalSyncVectorIndexRequestSchema,
  marshalUpdateEndpointCustomTagsRequestSchema,
  marshalUpsertDataVectorIndexRequestSchema,
  unmarshalDeleteDataVectorIndexResponseSchema,
  unmarshalDeleteEndpointResponseSchema,
  unmarshalDeleteVectorIndexResponseSchema,
  unmarshalEndpointSchema,
  unmarshalListEndpointResponseSchema,
  unmarshalListVectorIndexResponseSchema,
  unmarshalPatchEndpointBudgetPolicyResponseSchema,
  unmarshalQueryVectorIndexResponseSchema,
  unmarshalRetrieveUserVisibleMetricsResponseSchema,
  unmarshalScanVectorIndexResponseSchema,
  unmarshalSyncVectorIndexResponseSchema,
  unmarshalUpdateEndpointCustomTagsResponseSchema,
  unmarshalUpsertDataVectorIndexResponseSchema,
  unmarshalVectorIndexSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class VectorSearchClient {
  private readonly host: string;
  // Workspace ID used to route workspace-level calls on unified hosts (SPOG).
  // When set, workspace-level methods send X-Databricks-Org-Id on every
  // request.
  private readonly workspaceId: string | undefined;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;

  constructor(options: ClientOptions) {
    // Resolve host and credentials from one source so they share a profile.
    const config = resolveClientConfig(options);
    this.host = (config.host ?? '').replace(/\/$/, '');
    this.workspaceId = config.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Create a new endpoint. */
  private async createEndpoint(
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/vector-search/endpoints`;
    const body = marshalRequest(req, marshalCreateEndpointRequestSchema);
    let resp: Endpoint | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async createEndpointWaiter(
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<CreateEndpointWaiter> {
    const resp = await this.createEndpoint(req, options);
    if (resp.name === undefined) {
      throw new Error('response field name required for polling is missing');
    }
    return new CreateEndpointWaiter(this, resp.name);
  }

  /** Create a new index. */
  async createVectorIndex(
    req: CreateVectorIndexRequest,
    options?: CallOptions
  ): Promise<VectorIndex> {
    const url = `${this.host}/api/2.0/vector-search/indexes`;
    const body = marshalRequest(req, marshalCreateVectorIndexRequestSchema);
    let resp: VectorIndex | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalVectorIndexSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Handles the deletion of data from a specified vector index. */
  async deleteDataVectorIndex(
    req: DeleteDataVectorIndexRequest,
    options?: CallOptions
  ): Promise<DeleteDataVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/delete-data`;
    const params = new URLSearchParams();
    if (req.primaryKeys !== undefined) {
      params.append('primary_keys', String(req.primaryKeys));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteDataVectorIndexResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteDataVectorIndexResponseSchema
      );
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
  ): Promise<DeleteEndpointResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}`;
    let resp: DeleteEndpointResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalDeleteEndpointResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete an index. */
  async deleteVectorIndex(
    req: DeleteVectorIndexRequest,
    options?: CallOptions
  ): Promise<DeleteVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}`;
    let resp: DeleteVectorIndexResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalDeleteVectorIndexResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get details for a single AI Search endpoint. */
  async getEndpoint(
    req: GetEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}`;
    let resp: Endpoint | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
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

  /** Get an index. */
  async getVectorIndex(
    req: GetVectorIndexRequest,
    options?: CallOptions
  ): Promise<VectorIndex> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.ensureRerankerCompatible !== undefined) {
      params.append(
        'ensure_reranker_compatible',
        String(req.ensureRerankerCompatible)
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: VectorIndex | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalVectorIndexSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List all AI Search endpoints in the workspace. */
  async listEndpoint(
    req: ListEndpointRequest,
    options?: CallOptions
  ): Promise<ListEndpointResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListEndpointResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalListEndpointResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listEndpointIter(
    req: ListEndpointRequest,
    options?: CallOptions
  ): AsyncGenerator<Endpoint> {
    const pageReq: ListEndpointRequest = {...req};
    for (;;) {
      const resp = await this.listEndpoint(pageReq, options);
      for (const item of resp.endpoints ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List all indexes in the given endpoint. */
  async listVectorIndex(
    req: ListVectorIndexRequest,
    options?: CallOptions
  ): Promise<ListVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes`;
    const params = new URLSearchParams();
    if (req.endpointName !== undefined) {
      params.append('endpoint_name', req.endpointName);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListVectorIndexResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalListVectorIndexResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listVectorIndexIter(
    req: ListVectorIndexRequest,
    options?: CallOptions
  ): AsyncGenerator<MiniVectorIndex> {
    const pageReq: ListVectorIndexRequest = {...req};
    for (;;) {
      const resp = await this.listVectorIndex(pageReq, options);
      for (const item of resp.vectorIndexes ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Update an endpoint */
  async patchEndpoint(
    req: PatchEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}`;
    const body = marshalRequest(req, marshalPatchEndpointRequestSchema);
    let resp: Endpoint | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update the budget policy of an endpoint */
  async patchEndpointBudgetPolicy(
    req: PatchEndpointBudgetPolicyRequest,
    options?: CallOptions
  ): Promise<PatchEndpointBudgetPolicyResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}/budget-policy`;
    const body = marshalRequest(
      req,
      marshalPatchEndpointBudgetPolicyRequestSchema
    );
    let resp: PatchEndpointBudgetPolicyResponse | undefined;
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
      });
      resp = parseResponse(
        respBody,
        unmarshalPatchEndpointBudgetPolicyResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Query the specified vector index. */
  async queryVectorIndex(
    req: QueryVectorIndexRequest,
    options?: CallOptions
  ): Promise<QueryVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/query`;
    const body = marshalRequest(req, marshalQueryVectorIndexRequestSchema);
    let resp: QueryVectorIndexResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalQueryVectorIndexResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Use `next_page_token` returned from previous `QueryVectorIndex` or `QueryVectorIndexNextPage` request to fetch next page of results. */
  async queryVectorIndexNextPage(
    req: QueryVectorIndexNextPageRequest,
    options?: CallOptions
  ): Promise<QueryVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/query-next-page`;
    const body = marshalRequest(
      req,
      marshalQueryVectorIndexNextPageRequestSchema
    );
    let resp: QueryVectorIndexResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalQueryVectorIndexResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieve user-visible metrics for an endpoint */
  async retrieveUserVisibleMetrics(
    req: RetrieveUserVisibleMetricsRequest,
    options?: CallOptions
  ): Promise<RetrieveUserVisibleMetricsResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}/metrics`;
    const body = marshalRequest(
      req,
      marshalRetrieveUserVisibleMetricsRequestSchema
    );
    let resp: RetrieveUserVisibleMetricsResponse | undefined;
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
      });
      resp = parseResponse(
        respBody,
        unmarshalRetrieveUserVisibleMetricsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Scan the specified vector index and return the first `num_results` entries after the exclusive `primary_key`. */
  async scanVectorIndex(
    req: ScanVectorIndexRequest,
    options?: CallOptions
  ): Promise<ScanVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/scan`;
    const body = marshalRequest(req, marshalScanVectorIndexRequestSchema);
    let resp: ScanVectorIndexResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalScanVectorIndexResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Triggers a synchronization process for a specified vector index. */
  async syncVectorIndex(
    req: SyncVectorIndexRequest,
    options?: CallOptions
  ): Promise<SyncVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/sync`;
    const body = marshalRequest(req, marshalSyncVectorIndexRequestSchema);
    let resp: SyncVectorIndexResponse | undefined;
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
      });
      resp = parseResponse(respBody, unmarshalSyncVectorIndexResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update the custom tags of an endpoint. */
  async updateEndpointCustomTags(
    req: UpdateEndpointCustomTagsRequest,
    options?: CallOptions
  ): Promise<UpdateEndpointCustomTagsResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}/tags`;
    const body = marshalRequest(
      req,
      marshalUpdateEndpointCustomTagsRequestSchema
    );
    let resp: UpdateEndpointCustomTagsResponse | undefined;
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
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateEndpointCustomTagsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Handles the upserting of data into a specified vector index. */
  async upsertDataVectorIndex(
    req: UpsertDataVectorIndexRequest,
    options?: CallOptions
  ): Promise<UpsertDataVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/upsert-data`;
    const body = marshalRequest(req, marshalUpsertDataVectorIndexRequestSchema);
    let resp: UpsertDataVectorIndexResponse | undefined;
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
      });
      resp = parseResponse(
        respBody,
        unmarshalUpsertDataVectorIndexResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}

export class CreateEndpointWaiter {
  constructor(
    private readonly client: VectorSearchClient,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<Endpoint> {
    let result: Endpoint | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getEndpoint(
        {
          name: this.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.endpointStatus?.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case EndpointStatus_State.ONLINE:
          result = pollResp;
          return;
        case EndpointStatus_State.OFFLINE: {
          const msg = pollResp.endpointStatus?.message ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getEndpoint(
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.endpointStatus?.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case EndpointStatus_State.ONLINE:
      case EndpointStatus_State.OFFLINE:
        return true;
      default:
        return false;
    }
  }
}
