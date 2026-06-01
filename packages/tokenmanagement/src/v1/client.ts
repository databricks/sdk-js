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
  AdminTokenInfo,
  CreateOnBehalfOfTokenRequest,
  CreateOnBehalfOfTokenRequest_Response,
  GetTokenRequest,
  GetTokenRequest_Response,
  ListTokensRequest,
  ListTokensRequest_Response,
  RevokeTokenRequest,
  RevokeTokenRequest_Response,
  UpdateToken,
} from './model';
import {
  marshalCreateOnBehalfOfTokenRequestSchema,
  marshalUpdateTokenSchema,
  unmarshalAdminTokenInfoSchema,
  unmarshalCreateOnBehalfOfTokenRequest_ResponseSchema,
  unmarshalGetTokenRequest_ResponseSchema,
  unmarshalListTokensRequest_ResponseSchema,
  unmarshalRevokeTokenRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class TokenManagementClient {
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

  /** Creates a token on behalf of a service principal. */
  async createOnBehalfOfToken(
    req: CreateOnBehalfOfTokenRequest,
    options?: CallOptions
  ): Promise<CreateOnBehalfOfTokenRequest_Response> {
    const url = `${this.host}/api/2.0/token-management/on-behalf-of/tokens`;
    const body = marshalRequest(req, marshalCreateOnBehalfOfTokenRequestSchema);
    let resp: CreateOnBehalfOfTokenRequest_Response | undefined;
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
        unmarshalCreateOnBehalfOfTokenRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a token, specified by its ID. */
  async deleteToken(
    req: RevokeTokenRequest,
    options?: CallOptions
  ): Promise<RevokeTokenRequest_Response> {
    const url = `${this.host}/api/2.0/token-management/tokens/${req.tokenId ?? ''}`;
    let resp: RevokeTokenRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalRevokeTokenRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets information about a token, specified by its ID. */
  async getToken(
    req: GetTokenRequest,
    options?: CallOptions
  ): Promise<GetTokenRequest_Response> {
    const url = `${this.host}/api/2.0/token-management/tokens/${req.tokenId ?? ''}`;
    let resp: GetTokenRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalGetTokenRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists all tokens associated with the specified workspace or user. */
  async listTokens(
    req: ListTokensRequest,
    options?: CallOptions
  ): Promise<ListTokensRequest_Response> {
    const url = `${this.host}/api/2.0/token-management/tokens`;
    const params = new URLSearchParams();
    if (req.createdById !== undefined) {
      params.append('created_by_id', String(req.createdById));
    }
    if (req.createdByUsername !== undefined) {
      params.append('created_by_username', req.createdByUsername);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListTokensRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalListTokensRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates a token, specified by its ID. */
  async updateToken(
    req: UpdateToken,
    options?: CallOptions
  ): Promise<AdminTokenInfo> {
    const url = `${this.host}/api/2.0/token-management/tokens/${req.token?.tokenId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateTokenSchema);
    let resp: AdminTokenInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalAdminTokenInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
