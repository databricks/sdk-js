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
  CreateToken,
  CreateToken_Response,
  ListTokens,
  ListTokens_Response,
  RevokeToken,
  RevokeToken_Response,
  UpdateToken,
  UpdateTokenResponse,
} from './model';
import {
  marshalCreateTokenSchema,
  marshalRevokeTokenSchema,
  marshalUpdateTokenSchema,
  unmarshalCreateToken_ResponseSchema,
  unmarshalListTokens_ResponseSchema,
  unmarshalRevokeToken_ResponseSchema,
  unmarshalUpdateTokenResponseSchema,
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
   * Creates and returns a token for a user. If this call is made through token authentication, it creates
   * a token with the same client ID as the authenticated token. If the user's token quota is exceeded, this call
   * returns an error **QUOTA_EXCEEDED**.
   */
  async createToken(
    req: CreateToken,
    options?: CallOptions
  ): Promise<CreateToken_Response> {
    const url = `${this.host}/api/2.0/token/create`;
    const body = marshalRequest(req, marshalCreateTokenSchema);
    let resp: CreateToken_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateToken_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all the valid tokens for a user-workspace pair. */
  async listTokens(
    _req: ListTokens,
    options?: CallOptions
  ): Promise<ListTokens_Response> {
    const url = `${this.host}/api/2.0/token/list`;
    let resp: ListTokens_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListTokens_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Revokes an access token.
   *
   * If a token with the specified ID is not valid, this call returns an error **RESOURCE_DOES_NOT_EXIST**.
   */
  async revokeToken(
    req: RevokeToken,
    options?: CallOptions
  ): Promise<RevokeToken_Response> {
    const url = `${this.host}/api/2.0/token/delete`;
    const body = marshalRequest(req, marshalRevokeTokenSchema);
    let resp: RevokeToken_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRevokeToken_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the comment or scopes of a token.
   *
   * If a token with the specified ID is not valid, this call returns an error **RESOURCE_DOES_NOT_EXIST**.
   */
  async updateToken(
    req: UpdateToken,
    options?: CallOptions
  ): Promise<UpdateTokenResponse> {
    const url = `${this.host}/api/2.0/token/${req.tokenId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateTokenSchema);
    let resp: UpdateTokenResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateTokenResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
