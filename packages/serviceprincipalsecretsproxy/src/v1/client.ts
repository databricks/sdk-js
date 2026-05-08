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
  CreateServicePrincipalSecret,
  CreateServicePrincipalSecretResponse,
  DeleteServicePrincipalSecret,
  DeleteServicePrincipalSecret_Response,
  ListServicePrincipalSecrets,
  ListServicePrincipalSecrets_Response,
  ServicePrincipalSecret,
} from './model';
import {
  marshalCreateServicePrincipalSecretSchema,
  unmarshalCreateServicePrincipalSecretResponseSchema,
  unmarshalDeleteServicePrincipalSecret_ResponseSchema,
  unmarshalListServicePrincipalSecrets_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
  // Fallback for endpoints whose path contains {account_id}. If the request
  // already carries an accountId, that value wins.
  private readonly accountId: string | undefined;
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
    this.accountId = options.accountId;
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

  /** Create a secret for the given service principal. */
  async createServicePrincipalSecret(
    req: CreateServicePrincipalSecret,
    options?: CallOptions
  ): Promise<CreateServicePrincipalSecretResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const body = marshalRequest(req, marshalCreateServicePrincipalSecretSchema);
    let resp: CreateServicePrincipalSecretResponse | undefined;
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
        unmarshalCreateServicePrincipalSecretResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a secret from the given service principal. */
  async deleteServicePrincipalSecret(
    req: DeleteServicePrincipalSecret,
    options?: CallOptions
  ): Promise<DeleteServicePrincipalSecret_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets/${req.secretId ?? ''}`;
    let resp: DeleteServicePrincipalSecret_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteServicePrincipalSecret_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List all secrets associated with the given service principal. This operation only returns information about the secrets themselves and does not include the secret values. */
  async listServicePrincipalSecrets(
    req: ListServicePrincipalSecrets,
    options?: CallOptions
  ): Promise<ListServicePrincipalSecrets_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListServicePrincipalSecrets_Response | undefined;
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
        unmarshalListServicePrincipalSecrets_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listServicePrincipalSecretsIter(
    req: ListServicePrincipalSecrets,
    options?: CallOptions
  ): AsyncGenerator<ServicePrincipalSecret> {
    const pageReq: ListServicePrincipalSecrets = {...req};
    for (;;) {
      const resp = await this.listServicePrincipalSecrets(pageReq, options);
      for (const item of resp.secrets ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }
}
