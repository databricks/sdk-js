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
  CreateQueryRequest,
  Empty,
  GetQueryRequest,
  ListQueriesRequest,
  ListQueriesResponse,
  ListQueryObjectsResponseQuery,
  ListVisualizationsForQueryRequest,
  ListVisualizationsForQueryResponse,
  Query,
  TrashQueryRequest,
  UpdateQueryRequest,
  Visualization,
} from './model';
import {
  marshalCreateQueryRequestSchema,
  marshalUpdateQueryRequestSchema,
  unmarshalEmptySchema,
  unmarshalListQueriesResponseSchema,
  unmarshalListVisualizationsForQueryResponseSchema,
  unmarshalQuerySchema,
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

  /** Creates a query. */
  async createQuery(
    signal: AbortSignal | undefined,
    req: CreateQueryRequest,
    options?: Options
  ): Promise<Query> {
    const url = `${this.host}/api/2.0/sql/queries`;
    const body = marshalRequest(req, marshalCreateQueryRequestSchema);
    let resp: Query | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalQuerySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a query. */
  async getQuery(
    signal: AbortSignal | undefined,
    req: GetQueryRequest,
    options?: Options
  ): Promise<Query> {
    const url = `${this.host}/api/2.0/sql/queries/${req.id ?? ''}`;
    let resp: Query | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalQuerySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a list of queries accessible to the user, ordered by creation time. **Warning:** Calling this API concurrently 10 or more times could result in throttling, service degradation, or a temporary ban. */
  async listQueries(
    signal: AbortSignal | undefined,
    req: ListQueriesRequest,
    options?: Options
  ): Promise<ListQueriesResponse> {
    const url = `${this.host}/api/2.0/sql/queries`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListQueriesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListQueriesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listQueriesIter(
    signal: AbortSignal | undefined,
    req: ListQueriesRequest,
    options?: Options
  ): AsyncGenerator<ListQueryObjectsResponseQuery> {
    const pageReq: ListQueriesRequest = {...req};
    for (;;) {
      const resp = await this.listQueries(signal, pageReq, options);
      for (const item of resp.results ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Gets a list of visualizations on a query. */
  async listVisualizationsForQuery(
    signal: AbortSignal | undefined,
    req: ListVisualizationsForQueryRequest,
    options?: Options
  ): Promise<ListVisualizationsForQueryResponse> {
    const url = `${this.host}/api/2.0/sql/queries/${req.id ?? ''}/visualizations`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListVisualizationsForQueryResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListVisualizationsForQueryResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listVisualizationsForQueryIter(
    signal: AbortSignal | undefined,
    req: ListVisualizationsForQueryRequest,
    options?: Options
  ): AsyncGenerator<Visualization> {
    const pageReq: ListVisualizationsForQueryRequest = {...req};
    for (;;) {
      const resp = await this.listVisualizationsForQuery(
        signal,
        pageReq,
        options
      );
      for (const item of resp.results ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Moves a query to the trash. Trashed queries immediately disappear from searches and list views, and cannot be used for alerts. You can restore a trashed query through the UI. A trashed query is permanently deleted after 30 days. */
  async trashQuery(
    signal: AbortSignal | undefined,
    req: TrashQueryRequest,
    options?: Options
  ): Promise<Empty> {
    const url = `${this.host}/api/2.0/sql/queries/${req.id ?? ''}`;
    let resp: Empty | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEmptySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a query. */
  async updateQuery(
    signal: AbortSignal | undefined,
    req: UpdateQueryRequest,
    options?: Options
  ): Promise<Query> {
    const url = `${this.host}/api/2.0/sql/queries/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateQueryRequestSchema);
    let resp: Query | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalQuerySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
