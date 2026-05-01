// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
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
import pkgJson from '../../package.json' with {type: 'json'};
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
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
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
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
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
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
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
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
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
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
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
