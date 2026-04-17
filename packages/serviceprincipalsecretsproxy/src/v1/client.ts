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

  /** Create a secret for the given service principal. */
  async createServicePrincipalSecret(signal: AbortSignal | undefined, req: CreateServicePrincipalSecret, options?: Options): Promise<CreateServicePrincipalSecretResponse> {
    const url = `${this.host}/api/2.0/accounts//servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const body = marshalRequest(req, marshalCreateServicePrincipalSecretSchema);
    let resp: CreateServicePrincipalSecretResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCreateServicePrincipalSecretResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a secret from the given service principal. */
  async deleteServicePrincipalSecret(signal: AbortSignal | undefined, req: DeleteServicePrincipalSecret, options?: Options): Promise<DeleteServicePrincipalSecret_Response> {
    const url = `${this.host}/api/2.0/accounts//servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets/${req.secretId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteServicePrincipalSecret_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDeleteServicePrincipalSecret_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List all secrets associated with the given service principal. This operation only returns information about the secrets themselves and does not include the secret values. */
  async listServicePrincipalSecrets(signal: AbortSignal | undefined, req: ListServicePrincipalSecrets, options?: Options): Promise<ListServicePrincipalSecrets_Response> {
    const url = `${this.host}/api/2.0/accounts//servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListServicePrincipalSecrets_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listServicePrincipalSecretsIter(signal: AbortSignal | undefined, req: ListServicePrincipalSecrets, options?: Options): AsyncGenerator<ServicePrincipalSecret> {
    const pageReq: ListServicePrincipalSecrets = {...req};
    for (;;) {
      const resp = await this.listServicePrincipalSecrets(signal, pageReq, options);
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
