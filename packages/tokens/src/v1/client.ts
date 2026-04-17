// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
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
   * Creates and returns a token for a user. If this call is made through token authentication, it creates
   * a token with the same client ID as the authenticated token. If the user's token quota is exceeded, this call
   * returns an error **QUOTA_EXCEEDED**.
   */
  async createToken(signal: AbortSignal | undefined, req: CreateToken, options?: Options): Promise<CreateToken_Response> {
    const url = `${this.host}/api/2.0/token/create`;
    const body = marshalRequest(req, marshalCreateTokenSchema);
    let resp: CreateToken_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCreateToken_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all the valid tokens for a user-workspace pair. */
  async listTokens(signal: AbortSignal | undefined, _req: ListTokens, options?: Options): Promise<ListTokens_Response> {
    const url = `${this.host}/api/2.0/token/list`;
    let resp: ListTokens_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListTokens_ResponseSchema);
    };
    await execute(signal, call, options);
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
  async revokeToken(signal: AbortSignal | undefined, req: RevokeToken, options?: Options): Promise<RevokeToken_Response> {
    const url = `${this.host}/api/2.0/token/delete`;
    const body = marshalRequest(req, marshalRevokeTokenSchema);
    let resp: RevokeToken_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalRevokeToken_ResponseSchema);
    };
    await execute(signal, call, options);
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
  async updateToken(signal: AbortSignal | undefined, req: UpdateToken, options?: Options): Promise<UpdateTokenResponse> {
    const url = `${this.host}/api/2.0/token/${req.tokenId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateTokenSchema);
    let resp: UpdateTokenResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalUpdateTokenResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
