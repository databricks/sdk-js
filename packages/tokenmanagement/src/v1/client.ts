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
  AdminTokenInfo,
  CreateOnBehalfOfToken,
  CreateOnBehalfOfToken_Response,
  GetToken,
  GetToken_Response,
  ListTokens,
  ListTokens_Response,
  RevokeToken,
  RevokeToken_Response,
  UpdateToken,
} from './model';
import {
  marshalCreateOnBehalfOfTokenSchema,
  marshalUpdateTokenSchema,
  unmarshalAdminTokenInfoSchema,
  unmarshalCreateOnBehalfOfToken_ResponseSchema,
  unmarshalGetToken_ResponseSchema,
  unmarshalListTokens_ResponseSchema,
  unmarshalRevokeToken_ResponseSchema,
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

  /** Creates a token on behalf of a service principal. */
  async createOnBehalfOfToken(
    signal: AbortSignal | undefined,
    req: CreateOnBehalfOfToken,
    options?: Options
  ): Promise<CreateOnBehalfOfToken_Response> {
    const url = `${this.host}/api/2.0/token-management/on-behalf-of/tokens`;
    const body = marshalRequest(req, marshalCreateOnBehalfOfTokenSchema);
    let resp: CreateOnBehalfOfToken_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateOnBehalfOfToken_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a token, specified by its ID. */
  async deleteToken(
    signal: AbortSignal | undefined,
    req: RevokeToken,
    options?: Options
  ): Promise<RevokeToken_Response> {
    const url = `${this.host}/api/2.0/token-management/tokens/${req.tokenId ?? ''}`;
    let resp: RevokeToken_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRevokeToken_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets information about a token, specified by its ID. */
  async getToken(
    signal: AbortSignal | undefined,
    req: GetToken,
    options?: Options
  ): Promise<GetToken_Response> {
    const url = `${this.host}/api/2.0/token-management/tokens/${req.tokenId ?? ''}`;
    let resp: GetToken_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetToken_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all tokens associated with the specified workspace or user. */
  async listTokens(
    signal: AbortSignal | undefined,
    req: ListTokens,
    options?: Options
  ): Promise<ListTokens_Response> {
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
    let resp: ListTokens_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListTokens_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a token, specified by its ID. */
  async updateToken(
    signal: AbortSignal | undefined,
    req: UpdateToken,
    options?: Options
  ): Promise<AdminTokenInfo> {
    const url = `${this.host}/api/2.0/token-management/tokens/${req.token?.tokenId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateTokenSchema);
    let resp: AdminTokenInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAdminTokenInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
