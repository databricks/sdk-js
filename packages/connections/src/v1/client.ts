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
  ConnectionInfo,
  CreateConnection,
  DeleteConnection,
  DeleteConnection_Response,
  GetConnection,
  ListConnections,
  ListConnections_Response,
  UpdateConnection,
} from './model';
import {
  marshalCreateConnectionSchema,
  marshalUpdateConnectionSchema,
  unmarshalConnectionInfoSchema,
  unmarshalDeleteConnection_ResponseSchema,
  unmarshalListConnections_ResponseSchema,
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
   * Creates a new connection
   *
   * Creates a new connection to an external data source. It allows users to specify connection details and
   * configurations for interaction with the external server.
   */
  async createConnection(
    signal: AbortSignal | undefined,
    req: CreateConnection,
    options?: Options
  ): Promise<ConnectionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/connections`;
    const body = marshalRequest(req, marshalCreateConnectionSchema);
    let resp: ConnectionInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalConnectionInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the connection that matches the supplied name. */
  async deleteConnection(
    signal: AbortSignal | undefined,
    req: DeleteConnection,
    options?: Options
  ): Promise<DeleteConnection_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/connections/${req.nameArg ?? ''}`;
    let resp: DeleteConnection_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteConnection_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a connection from it's name. */
  async getConnection(
    signal: AbortSignal | undefined,
    req: GetConnection,
    options?: Options
  ): Promise<ConnectionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/connections/${req.nameArg ?? ''}`;
    let resp: ConnectionInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalConnectionInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * List all connections.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listConnections(
    signal: AbortSignal | undefined,
    req: ListConnections,
    options?: Options
  ): Promise<ListConnections_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/connections`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListConnections_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListConnections_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listConnectionsIter(
    signal: AbortSignal | undefined,
    req: ListConnections,
    options?: Options
  ): AsyncGenerator<ConnectionInfo> {
    const pageReq: ListConnections = {...req};
    for (;;) {
      const resp = await this.listConnections(signal, pageReq, options);
      for (const item of resp.connections ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates the connection that matches the supplied name. */
  async updateConnection(
    signal: AbortSignal | undefined,
    req: UpdateConnection,
    options?: Options
  ): Promise<ConnectionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/connections/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateConnectionSchema);
    let resp: ConnectionInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalConnectionInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
