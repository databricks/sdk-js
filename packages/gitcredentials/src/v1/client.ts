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

  /**
   * Creates a Git credential entry for the user.
   * Use the PATCH endpoint to update existing credentials, or the DELETE endpoint to
   * delete existing credentials.
   */
  async createCredentials(
    req: CreateCredentials,
    options?: CallOptions
  ): Promise<CreateCredentials_Response> {
    const url = `${this.host}/api/2.0/git-credentials`;
    const body = marshalRequest(req, marshalCreateCredentialsSchema);
    let resp: CreateCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateCredentials_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified Git credential. */
  async deleteCredentials(
    req: DeleteCredentials,
    options?: CallOptions
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
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteCredentials_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Git credential with the specified credential ID. */
  async getCredentials(
    req: GetCredentials,
    options?: CallOptions
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
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetCredentials_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists the calling user's Git credentials. */
  async listCredentials(
    req: ListCredentials,
    options?: CallOptions
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
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListCredentials_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the specified Git credential. */
  async updateCredentials(
    req: UpdateCredentials,
    options?: CallOptions
  ): Promise<UpdateCredentials_Response> {
    const url = `${this.host}/api/2.0/git-credentials/${String(req.id ?? '')}`;
    const body = marshalRequest(req, marshalUpdateCredentialsSchema);
    let resp: UpdateCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateCredentials_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
