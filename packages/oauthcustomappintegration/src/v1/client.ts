// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
import type {
  CreateCustomOAuthAppIntegration,
  CreatePublishedOAuthAppIntegration,
  CreatePublishedOAuthAppIntegration_Response,
  CustomOAuthAppIntegration,
  CustomOAuthAppIntegrationSecret,
  DeleteCustomOAuthAppIntegration,
  DeleteCustomOAuthAppIntegration_Response,
  DeletePublishedOAuthAppIntegration,
  DeletePublishedOAuthAppIntegration_Response,
  GetCustomOAuthAppIntegration,
  GetPublishedOAuthAppIntegration,
  ListCustomOAuthAppIntegrations,
  ListCustomOAuthAppIntegrations_Response,
  ListPublishedOAuthAppIntegrations,
  ListPublishedOAuthAppIntegrations_Response,
  PublishedOAuthAppIntegration,
  UpdateCustomOAuthAppIntegration,
  UpdateCustomOAuthAppIntegration_Response,
  UpdatePublishedOAuthAppIntegration,
  UpdatePublishedOAuthAppIntegration_Response,
} from './model';
import {
  marshalCreateCustomOAuthAppIntegrationSchema,
  marshalCreatePublishedOAuthAppIntegrationSchema,
  marshalUpdateCustomOAuthAppIntegrationSchema,
  marshalUpdatePublishedOAuthAppIntegrationSchema,
  unmarshalCreatePublishedOAuthAppIntegration_ResponseSchema,
  unmarshalCustomOAuthAppIntegrationSchema,
  unmarshalCustomOAuthAppIntegrationSecretSchema,
  unmarshalDeleteCustomOAuthAppIntegration_ResponseSchema,
  unmarshalDeletePublishedOAuthAppIntegration_ResponseSchema,
  unmarshalListCustomOAuthAppIntegrations_ResponseSchema,
  unmarshalListPublishedOAuthAppIntegrations_ResponseSchema,
  unmarshalPublishedOAuthAppIntegrationSchema,
  unmarshalUpdateCustomOAuthAppIntegration_ResponseSchema,
  unmarshalUpdatePublishedOAuthAppIntegration_ResponseSchema,
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
   * Create Custom OAuth App Integration.
   * 
   * You can retrieve the custom OAuth app integration via :method:CustomAppIntegration/get.
   */
  async createCustomOAuthAppIntegration(signal: AbortSignal | undefined, req: CreateCustomOAuthAppIntegration, options?: Options): Promise<CustomOAuthAppIntegrationSecret> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/oauth2/custom-app-integrations`;
    const body = marshalRequest(req, marshalCreateCustomOAuthAppIntegrationSchema);
    let resp: CustomOAuthAppIntegrationSecret | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCustomOAuthAppIntegrationSecretSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Create Published OAuth App Integration.
   * 
   * You can retrieve the published OAuth app integration via :method:PublishedAppIntegration/get.
   */
  async createPublishedOAuthAppIntegration(signal: AbortSignal | undefined, req: CreatePublishedOAuthAppIntegration, options?: Options): Promise<CreatePublishedOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/oauth2/published-app-integrations`;
    const body = marshalRequest(req, marshalCreatePublishedOAuthAppIntegrationSchema);
    let resp: CreatePublishedOAuthAppIntegration_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCreatePublishedOAuthAppIntegration_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Delete an existing Custom OAuth App Integration.
   * You can retrieve the custom OAuth app integration via :method:CustomAppIntegration/get.
   */
  async deleteCustomOAuthAppIntegration(signal: AbortSignal | undefined, req: DeleteCustomOAuthAppIntegration, options?: Options): Promise<DeleteCustomOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts//oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteCustomOAuthAppIntegration_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDeleteCustomOAuthAppIntegration_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Delete an existing Published OAuth App Integration.
   * You can retrieve the published OAuth app integration via :method:PublishedAppIntegration/get.
   */
  async deletePublishedOAuthAppIntegration(signal: AbortSignal | undefined, req: DeletePublishedOAuthAppIntegration, options?: Options): Promise<DeletePublishedOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts//oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeletePublishedOAuthAppIntegration_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDeletePublishedOAuthAppIntegration_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Custom OAuth App Integration for the given integration id. */
  async getCustomOAuthAppIntegration(signal: AbortSignal | undefined, req: GetCustomOAuthAppIntegration, options?: Options): Promise<CustomOAuthAppIntegration> {
    const url = `${this.host}/api/2.0/accounts//oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: CustomOAuthAppIntegration | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCustomOAuthAppIntegrationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Published OAuth App Integration for the given integration id. */
  async getPublishedOAuthAppIntegration(signal: AbortSignal | undefined, req: GetPublishedOAuthAppIntegration, options?: Options): Promise<PublishedOAuthAppIntegration> {
    const url = `${this.host}/api/2.0/accounts//oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: PublishedOAuthAppIntegration | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalPublishedOAuthAppIntegrationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the list of custom OAuth app integrations for the specified <Account> */
  async listCustomOAuthAppIntegrations(signal: AbortSignal | undefined, req: ListCustomOAuthAppIntegrations, options?: Options): Promise<ListCustomOAuthAppIntegrations_Response> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/oauth2/custom-app-integrations`;
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
    if (req.includeCreatorUsername !== undefined) {
      params.append('include_creator_username', String(req.includeCreatorUsername));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCustomOAuthAppIntegrations_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListCustomOAuthAppIntegrations_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listCustomOAuthAppIntegrationsIter(signal: AbortSignal | undefined, req: ListCustomOAuthAppIntegrations, options?: Options): AsyncGenerator<CustomOAuthAppIntegration> {
    const pageReq: ListCustomOAuthAppIntegrations = {...req};
    for (;;) {
      const resp = await this.listCustomOAuthAppIntegrations(signal, pageReq, options);
      for (const item of resp.apps ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }


  /** Get the list of published OAuth app integrations for the specified <Account> */
  async listPublishedOAuthAppIntegrations(signal: AbortSignal | undefined, req: ListPublishedOAuthAppIntegrations, options?: Options): Promise<ListPublishedOAuthAppIntegrations_Response> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/oauth2/published-app-integrations`;
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
    let resp: ListPublishedOAuthAppIntegrations_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListPublishedOAuthAppIntegrations_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listPublishedOAuthAppIntegrationsIter(signal: AbortSignal | undefined, req: ListPublishedOAuthAppIntegrations, options?: Options): AsyncGenerator<PublishedOAuthAppIntegration> {
    const pageReq: ListPublishedOAuthAppIntegrations = {...req};
    for (;;) {
      const resp = await this.listPublishedOAuthAppIntegrations(signal, pageReq, options);
      for (const item of resp.apps ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }


  /**
   * Updates an existing custom OAuth App Integration.
   * You can retrieve the custom OAuth app integration via :method:CustomAppIntegration/get.
   */
  async updateCustomOAuthAppIntegration(signal: AbortSignal | undefined, req: UpdateCustomOAuthAppIntegration, options?: Options): Promise<UpdateCustomOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts//oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateCustomOAuthAppIntegrationSchema);
    let resp: UpdateCustomOAuthAppIntegration_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalUpdateCustomOAuthAppIntegration_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates an existing published OAuth App Integration.
   * You can retrieve the published OAuth app integration via :method:PublishedAppIntegration/get.
   */
  async updatePublishedOAuthAppIntegration(signal: AbortSignal | undefined, req: UpdatePublishedOAuthAppIntegration, options?: Options): Promise<UpdatePublishedOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts//oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    const body = marshalRequest(req, marshalUpdatePublishedOAuthAppIntegrationSchema);
    let resp: UpdatePublishedOAuthAppIntegration_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalUpdatePublishedOAuthAppIntegration_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
