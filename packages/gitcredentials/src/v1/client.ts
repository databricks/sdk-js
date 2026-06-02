// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateCredentialsRequest,
  CreateCredentialsResponse,
  DeleteCredentialsRequest,
  DeleteCredentialsResponse,
  GetCredentialsRequest,
  GetCredentialsResponse,
  ListCredentialsRequest,
  ListCredentialsResponse,
  UpdateCredentialsRequest,
  UpdateCredentialsResponse,
} from './model';
import {
  marshalCreateCredentialsRequestSchema,
  marshalUpdateCredentialsRequestSchema,
  unmarshalCreateCredentialsResponseSchema,
  unmarshalDeleteCredentialsResponseSchema,
  unmarshalGetCredentialsResponseSchema,
  unmarshalListCredentialsResponseSchema,
  unmarshalUpdateCredentialsResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class GitCredentialsClient {
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
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.workspaceId = options.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Creates a Git credential entry for the user.
   * Use the PATCH endpoint to update existing credentials, or the DELETE endpoint to
   * delete existing credentials.
   */
  async createCredentials(
    req: CreateCredentialsRequest,
    options?: CallOptions
  ): Promise<CreateCredentialsResponse> {
    const url = `${this.host}/api/2.0/git-credentials`;
    const body = marshalRequest(req, marshalCreateCredentialsRequestSchema);
    let resp: CreateCredentialsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalCreateCredentialsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified Git credential. */
  async deleteCredentials(
    req: DeleteCredentialsRequest,
    options?: CallOptions
  ): Promise<DeleteCredentialsResponse> {
    const url = `${this.host}/api/2.0/git-credentials/${String(req.id ?? '')}`;
    const params = new URLSearchParams();
    if (req.principalId !== undefined) {
      params.append('principal_id', String(req.principalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteCredentialsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalDeleteCredentialsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets the Git credential with the specified credential ID. */
  async getCredentials(
    req: GetCredentialsRequest,
    options?: CallOptions
  ): Promise<GetCredentialsResponse> {
    const url = `${this.host}/api/2.0/git-credentials/${String(req.id ?? '')}`;
    const params = new URLSearchParams();
    if (req.principalId !== undefined) {
      params.append('principal_id', String(req.principalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetCredentialsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalGetCredentialsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists the calling user's Git credentials. */
  async listCredentials(
    req: ListCredentialsRequest,
    options?: CallOptions
  ): Promise<ListCredentialsResponse> {
    const url = `${this.host}/api/2.0/git-credentials`;
    const params = new URLSearchParams();
    if (req.principalId !== undefined) {
      params.append('principal_id', String(req.principalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCredentialsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListCredentialsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the specified Git credential. */
  async updateCredentials(
    req: UpdateCredentialsRequest,
    options?: CallOptions
  ): Promise<UpdateCredentialsResponse> {
    const url = `${this.host}/api/2.0/git-credentials/${String(req.id ?? '')}`;
    const body = marshalRequest(req, marshalUpdateCredentialsRequestSchema);
    let resp: UpdateCredentialsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalUpdateCredentialsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
