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
  ConnectionUserCredential,
  CreateConnection,
  CreateUserMappedCredential,
  CreateUserMappedCredential_Response,
  DeleteConnection,
  DeleteConnection_Response,
  DeleteUserMappedCredential,
  DeleteUserMappedCredential_Response,
  GetConnection,
  GetUserMappedCredential,
  GetUserMappedCredential_Response,
  ListConnections,
  ListConnections_Response,
  ListUserMappedCredentials,
  ListUserMappedCredentials_Response,
  UpdateConnection,
  UpdateUserMappedCredential,
  UpdateUserMappedCredential_Response,
} from './model';
import {
  marshalCreateConnectionSchema,
  marshalCreateUserMappedCredentialSchema,
  marshalUpdateConnectionSchema,
  marshalUpdateUserMappedCredentialSchema,
  unmarshalConnectionInfoSchema,
  unmarshalCreateUserMappedCredential_ResponseSchema,
  unmarshalDeleteConnection_ResponseSchema,
  unmarshalDeleteUserMappedCredential_ResponseSchema,
  unmarshalGetUserMappedCredential_ResponseSchema,
  unmarshalListConnections_ResponseSchema,
  unmarshalListUserMappedCredentials_ResponseSchema,
  unmarshalUpdateUserMappedCredential_ResponseSchema,
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

  /**
   * Creates a new user mapped credential for a given connection.
   *
   * Creates a new credential for a given connection per user trying to access access external services.
   * It allows users to access external services like slack, gmail using their own credentials.
   * It provides users a way to provide their authorization details to perform token exchange on behalf
   * of the user and store it in credential manager.
   */
  async createUserMappedCredential(
    signal: AbortSignal | undefined,
    req: CreateUserMappedCredential,
    options?: Options
  ): Promise<CreateUserMappedCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/connections/${req.nameArg ?? ''}/user-credentials`;
    const body = marshalRequest(req, marshalCreateUserMappedCredentialSchema);
    let resp: CreateUserMappedCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateUserMappedCredential_ResponseSchema
      );
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

  /** Deletes the user credentials for a given connection name. */
  async deleteUserMappedCredential(
    signal: AbortSignal | undefined,
    req: DeleteUserMappedCredential,
    options?: Options
  ): Promise<DeleteUserMappedCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/connections/${req.nameArg ?? ''}/user-credentials/${req.userIdentityArg ?? ''}`;
    let resp: DeleteUserMappedCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteUserMappedCredential_ResponseSchema
      );
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

  /** Gets the user credentials for a given connection name. */
  async getUserMappedCredential(
    signal: AbortSignal | undefined,
    req: GetUserMappedCredential,
    options?: Options
  ): Promise<GetUserMappedCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/connections/${req.nameArg ?? ''}/user-credentials/${req.userIdentityArg ?? ''}`;
    let resp: GetUserMappedCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetUserMappedCredential_ResponseSchema
      );
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

  /** List all user credentials for a given connection name. */
  async listUserMappedCredentials(
    signal: AbortSignal | undefined,
    req: ListUserMappedCredentials,
    options?: Options
  ): Promise<ListUserMappedCredentials_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/connections/${req.nameArg ?? ''}/user-credentials`;
    const params = new URLSearchParams();
    if (req.userIdentity !== undefined) {
      params.append('user_identity', req.userIdentity);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListUserMappedCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListUserMappedCredentials_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listUserMappedCredentialsIter(
    signal: AbortSignal | undefined,
    req: ListUserMappedCredentials,
    options?: Options
  ): AsyncGenerator<ConnectionUserCredential> {
    const pageReq: ListUserMappedCredentials = {...req};
    for (;;) {
      const resp = await this.listUserMappedCredentials(
        signal,
        pageReq,
        options
      );
      for (const item of resp.connectionUserCredential ?? []) {
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

  /** Updates the user credentials for a given connection name. */
  async updateUserMappedCredential(
    signal: AbortSignal | undefined,
    req: UpdateUserMappedCredential,
    options?: Options
  ): Promise<UpdateUserMappedCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/connections/${req.nameArg ?? ''}/user-credentials`;
    const body = marshalRequest(req, marshalUpdateUserMappedCredentialSchema);
    let resp: UpdateUserMappedCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateUserMappedCredential_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
