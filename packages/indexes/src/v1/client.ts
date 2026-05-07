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
  CreateVectorIndexRequest,
  DeleteDataVectorIndexRequest,
  DeleteDataVectorIndexResponse,
  DeleteVectorIndexRequest,
  DeleteVectorIndexResponse,
  GetVectorIndexRequest,
  ListVectorIndexRequest,
  ListVectorIndexResponse,
  MiniVectorIndex,
  QueryVectorIndexNextPageRequest,
  QueryVectorIndexRequest,
  QueryVectorIndexResponse,
  ScanVectorIndexRequest,
  ScanVectorIndexResponse,
  SyncVectorIndexRequest,
  SyncVectorIndexResponse,
  UpsertDataVectorIndexRequest,
  UpsertDataVectorIndexResponse,
  VectorIndex,
} from './model';
import {
  marshalCreateVectorIndexRequestSchema,
  marshalQueryVectorIndexNextPageRequestSchema,
  marshalQueryVectorIndexRequestSchema,
  marshalScanVectorIndexRequestSchema,
  marshalSyncVectorIndexRequestSchema,
  marshalUpsertDataVectorIndexRequestSchema,
  unmarshalDeleteDataVectorIndexResponseSchema,
  unmarshalDeleteVectorIndexResponseSchema,
  unmarshalListVectorIndexResponseSchema,
  unmarshalQueryVectorIndexResponseSchema,
  unmarshalScanVectorIndexResponseSchema,
  unmarshalSyncVectorIndexResponseSchema,
  unmarshalUpsertDataVectorIndexResponseSchema,
  unmarshalVectorIndexSchema,
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

  /** Create a new index. */
  async createVectorIndex(
    req: CreateVectorIndexRequest,
    options?: CallOptions
  ): Promise<VectorIndex> {
    const url = `${this.host}/api/2.0/vector-search/indexes`;
    const body = marshalRequest(req, marshalCreateVectorIndexRequestSchema);
    let resp: VectorIndex | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      throw new Error('API call completed without a result.');
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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
      throw new Error('API call completed without a result.');
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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
      throw new Error('API call completed without a result.');
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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
      throw new Error('API call completed without a result.');
    }
    return resp;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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
      throw new Error('API call completed without a result.');
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

  /** Query the specified vector index. */
  async queryVectorIndex(
    req: QueryVectorIndexRequest,
    options?: CallOptions
  ): Promise<QueryVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/query`;
    const body = marshalRequest(req, marshalQueryVectorIndexRequestSchema);
    let resp: QueryVectorIndexResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      throw new Error('API call completed without a result.');
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      throw new Error('API call completed without a result.');
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      throw new Error('API call completed without a result.');
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      throw new Error('API call completed without a result.');
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
