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
  CreateCredentials,
  CreateCredentials_Response,
  DeleteCredentials,
  DeleteCredentials_Response,
  GetCredentials,
  GetCredentials_Response,
  ListCredentials,
  ListCredentials_Response,
  UpdateCredentials,
  UpdateCredentials_Response,
} from './model';
import {
  marshalCreateCredentialsSchema,
  marshalUpdateCredentialsSchema,
  unmarshalCreateCredentials_ResponseSchema,
  unmarshalDeleteCredentials_ResponseSchema,
  unmarshalGetCredentials_ResponseSchema,
  unmarshalListCredentials_ResponseSchema,
  unmarshalUpdateCredentials_ResponseSchema,
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
   * Creates a Git credential entry for the user.
   * Use the PATCH endpoint to update existing credentials, or the DELETE endpoint to
   * delete existing credentials.
   */
  async createCredentials(
    signal: AbortSignal | undefined,
    req: CreateCredentials,
    options?: Options
  ): Promise<CreateCredentials_Response> {
    const url = `${this.host}/api/2.0/git-credentials`;
    const body = marshalRequest(req, marshalCreateCredentialsSchema);
    let resp: CreateCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateCredentials_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified Git credential. */
  async deleteCredentials(
    signal: AbortSignal | undefined,
    req: DeleteCredentials,
    options?: Options
  ): Promise<DeleteCredentials_Response> {
    const url = `${this.host}/api/2.0/git-credentials/${String(req.id ?? '')}`;
    const params = new URLSearchParams();
    if (req.principalId !== undefined) {
      params.append('principal_id', String(req.principalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteCredentials_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Git credential with the specified credential ID. */
  async getCredentials(
    signal: AbortSignal | undefined,
    req: GetCredentials,
    options?: Options
  ): Promise<GetCredentials_Response> {
    const url = `${this.host}/api/2.0/git-credentials/${String(req.id ?? '')}`;
    const params = new URLSearchParams();
    if (req.principalId !== undefined) {
      params.append('principal_id', String(req.principalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetCredentials_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists the calling user's Git credentials. */
  async listCredentials(
    signal: AbortSignal | undefined,
    req: ListCredentials,
    options?: Options
  ): Promise<ListCredentials_Response> {
    const url = `${this.host}/api/2.0/git-credentials`;
    const params = new URLSearchParams();
    if (req.principalId !== undefined) {
      params.append('principal_id', String(req.principalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListCredentials_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the specified Git credential. */
  async updateCredentials(
    signal: AbortSignal | undefined,
    req: UpdateCredentials,
    options?: Options
  ): Promise<UpdateCredentials_Response> {
    const url = `${this.host}/api/2.0/git-credentials/${String(req.id ?? '')}`;
    const body = marshalRequest(req, marshalUpdateCredentialsSchema);
    let resp: UpdateCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateCredentials_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
