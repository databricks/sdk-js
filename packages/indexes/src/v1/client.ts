// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
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

  /** Create a new index. */
  async createVectorIndex(
    signal: AbortSignal | undefined,
    req: CreateVectorIndexRequest,
    options?: Options
  ): Promise<VectorIndex> {
    const url = `${this.host}/api/2.0/vector-search/indexes`;
    const body = marshalRequest(req, marshalCreateVectorIndexRequestSchema);
    let resp: VectorIndex | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalVectorIndexSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Handles the deletion of data from a specified vector index. */
  async deleteDataVectorIndex(
    signal: AbortSignal | undefined,
    req: DeleteDataVectorIndexRequest,
    options?: Options
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete an index. */
  async deleteVectorIndex(
    signal: AbortSignal | undefined,
    req: DeleteVectorIndexRequest,
    options?: Options
  ): Promise<DeleteVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}`;
    let resp: DeleteVectorIndexResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteVectorIndexResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get an index. */
  async getVectorIndex(
    signal: AbortSignal | undefined,
    req: GetVectorIndexRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalVectorIndexSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List all indexes in the given endpoint. */
  async listVectorIndex(
    signal: AbortSignal | undefined,
    req: ListVectorIndexRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListVectorIndexResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listVectorIndexIter(
    signal: AbortSignal | undefined,
    req: ListVectorIndexRequest,
    options?: Options
  ): AsyncGenerator<MiniVectorIndex> {
    const pageReq: ListVectorIndexRequest = {...req};
    for (;;) {
      const resp = await this.listVectorIndex(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: QueryVectorIndexRequest,
    options?: Options
  ): Promise<QueryVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/query`;
    const body = marshalRequest(req, marshalQueryVectorIndexRequestSchema);
    let resp: QueryVectorIndexResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalQueryVectorIndexResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Use `next_page_token` returned from previous `QueryVectorIndex` or `QueryVectorIndexNextPage` request to fetch next page of results. */
  async queryVectorIndexNextPage(
    signal: AbortSignal | undefined,
    req: QueryVectorIndexNextPageRequest,
    options?: Options
  ): Promise<QueryVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/query-next-page`;
    const body = marshalRequest(
      req,
      marshalQueryVectorIndexNextPageRequestSchema
    );
    let resp: QueryVectorIndexResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalQueryVectorIndexResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Scan the specified vector index and return the first `num_results` entries after the exclusive `primary_key`. */
  async scanVectorIndex(
    signal: AbortSignal | undefined,
    req: ScanVectorIndexRequest,
    options?: Options
  ): Promise<ScanVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/scan`;
    const body = marshalRequest(req, marshalScanVectorIndexRequestSchema);
    let resp: ScanVectorIndexResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalScanVectorIndexResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Triggers a synchronization process for a specified vector index. */
  async syncVectorIndex(
    signal: AbortSignal | undefined,
    req: SyncVectorIndexRequest,
    options?: Options
  ): Promise<SyncVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/sync`;
    const body = marshalRequest(req, marshalSyncVectorIndexRequestSchema);
    let resp: SyncVectorIndexResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSyncVectorIndexResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Handles the upserting of data into a specified vector index. */
  async upsertDataVectorIndex(
    signal: AbortSignal | undefined,
    req: UpsertDataVectorIndexRequest,
    options?: Options
  ): Promise<UpsertDataVectorIndexResponse> {
    const url = `${this.host}/api/2.0/vector-search/indexes/${req.name ?? ''}/upsert-data`;
    const body = marshalRequest(req, marshalUpsertDataVectorIndexRequestSchema);
    let resp: UpsertDataVectorIndexResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
