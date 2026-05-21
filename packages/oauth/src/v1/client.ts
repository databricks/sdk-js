// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
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
  CreateCustomOAuthAppIntegrationRequest,
  CreatePublishedOAuthAppIntegrationRequest,
  CreatePublishedOAuthAppIntegrationRequest_Response,
  CustomOAuthAppIntegration,
  CustomOAuthAppIntegrationSecret,
  DeleteCustomOAuthAppIntegrationRequest,
  DeleteCustomOAuthAppIntegrationRequest_Response,
  DeletePublishedOAuthAppIntegrationRequest,
  DeletePublishedOAuthAppIntegrationRequest_Response,
  GetCustomOAuthAppIntegrationRequest,
  GetPublishedOAuthAppIntegrationRequest,
  ListCustomOAuthAppIntegrationsRequest,
  ListCustomOAuthAppIntegrationsRequest_Response,
  ListPublishedOAuthAppIntegrationsRequest,
  ListPublishedOAuthAppIntegrationsRequest_Response,
  ListPublishedOAuthAppsRequest,
  ListPublishedOAuthAppsRequest_Response,
  PublishedOAuthApp,
  PublishedOAuthAppIntegration,
  UpdateCustomOAuthAppIntegrationRequest,
  UpdateCustomOAuthAppIntegrationRequest_Response,
  UpdatePublishedOAuthAppIntegrationRequest,
  UpdatePublishedOAuthAppIntegrationRequest_Response,
} from './model';
import {
  marshalCreateCustomOAuthAppIntegrationRequestSchema,
  marshalCreatePublishedOAuthAppIntegrationRequestSchema,
  marshalUpdateCustomOAuthAppIntegrationRequestSchema,
  marshalUpdatePublishedOAuthAppIntegrationRequestSchema,
  unmarshalCreatePublishedOAuthAppIntegrationRequest_ResponseSchema,
  unmarshalCustomOAuthAppIntegrationSchema,
  unmarshalCustomOAuthAppIntegrationSecretSchema,
  unmarshalDeleteCustomOAuthAppIntegrationRequest_ResponseSchema,
  unmarshalDeletePublishedOAuthAppIntegrationRequest_ResponseSchema,
  unmarshalListCustomOAuthAppIntegrationsRequest_ResponseSchema,
  unmarshalListPublishedOAuthAppIntegrationsRequest_ResponseSchema,
  unmarshalListPublishedOAuthAppsRequest_ResponseSchema,
  unmarshalPublishedOAuthAppIntegrationSchema,
  unmarshalUpdateCustomOAuthAppIntegrationRequest_ResponseSchema,
  unmarshalUpdatePublishedOAuthAppIntegrationRequest_ResponseSchema,
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

  /**
   * Create Custom OAuth App Integration.
   *
   * You can retrieve the custom OAuth app integration via :method:CustomAppIntegration/get.
   */
  async createCustomOAuthAppIntegration(
    req: CreateCustomOAuthAppIntegrationRequest,
    options?: CallOptions
  ): Promise<CustomOAuthAppIntegrationSecret> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations`;
    const body = marshalRequest(
      req,
      marshalCreateCustomOAuthAppIntegrationRequestSchema
    );
    let resp: CustomOAuthAppIntegrationSecret | undefined;
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
        unmarshalCustomOAuthAppIntegrationSecretSchema
      );
    };
    await executeCall(call, options);
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
  async createPublishedOAuthAppIntegration(
    req: CreatePublishedOAuthAppIntegrationRequest,
    options?: CallOptions
  ): Promise<CreatePublishedOAuthAppIntegrationRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations`;
    const body = marshalRequest(
      req,
      marshalCreatePublishedOAuthAppIntegrationRequestSchema
    );
    let resp: CreatePublishedOAuthAppIntegrationRequest_Response | undefined;
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
        unmarshalCreatePublishedOAuthAppIntegrationRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Delete an existing Custom OAuth App Integration.
   * You can retrieve the custom OAuth app integration via :method:CustomAppIntegration/get.
   */
  async deleteCustomOAuthAppIntegration(
    req: DeleteCustomOAuthAppIntegrationRequest,
    options?: CallOptions
  ): Promise<DeleteCustomOAuthAppIntegrationRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    let resp: DeleteCustomOAuthAppIntegrationRequest_Response | undefined;
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
        unmarshalDeleteCustomOAuthAppIntegrationRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Delete an existing Published OAuth App Integration.
   * You can retrieve the published OAuth app integration via :method:PublishedAppIntegration/get.
   */
  async deletePublishedOAuthAppIntegration(
    req: DeletePublishedOAuthAppIntegrationRequest,
    options?: CallOptions
  ): Promise<DeletePublishedOAuthAppIntegrationRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    let resp: DeletePublishedOAuthAppIntegrationRequest_Response | undefined;
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
        unmarshalDeletePublishedOAuthAppIntegrationRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Custom OAuth App Integration for the given integration id. */
  async getCustomOAuthAppIntegration(
    req: GetCustomOAuthAppIntegrationRequest,
    options?: CallOptions
  ): Promise<CustomOAuthAppIntegration> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    let resp: CustomOAuthAppIntegration | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomOAuthAppIntegrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Published OAuth App Integration for the given integration id. */
  async getPublishedOAuthAppIntegration(
    req: GetPublishedOAuthAppIntegrationRequest,
    options?: CallOptions
  ): Promise<PublishedOAuthAppIntegration> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    let resp: PublishedOAuthAppIntegration | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPublishedOAuthAppIntegrationSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the list of custom OAuth app integrations for the specified <Account> */
  async listCustomOAuthAppIntegrations(
    req: ListCustomOAuthAppIntegrationsRequest,
    options?: CallOptions
  ): Promise<ListCustomOAuthAppIntegrationsRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.includeCreatorUsername !== undefined) {
      params.append(
        'include_creator_username',
        String(req.includeCreatorUsername)
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCustomOAuthAppIntegrationsRequest_Response | undefined;
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
        unmarshalListCustomOAuthAppIntegrationsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCustomOAuthAppIntegrationsIter(
    req: ListCustomOAuthAppIntegrationsRequest,
    options?: CallOptions
  ): AsyncGenerator<CustomOAuthAppIntegration> {
    const pageReq: ListCustomOAuthAppIntegrationsRequest = {...req};
    for (;;) {
      const resp = await this.listCustomOAuthAppIntegrations(pageReq, options);
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
  async listPublishedOAuthAppIntegrations(
    req: ListPublishedOAuthAppIntegrationsRequest,
    options?: CallOptions
  ): Promise<ListPublishedOAuthAppIntegrationsRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPublishedOAuthAppIntegrationsRequest_Response | undefined;
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
        unmarshalListPublishedOAuthAppIntegrationsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listPublishedOAuthAppIntegrationsIter(
    req: ListPublishedOAuthAppIntegrationsRequest,
    options?: CallOptions
  ): AsyncGenerator<PublishedOAuthAppIntegration> {
    const pageReq: ListPublishedOAuthAppIntegrationsRequest = {...req};
    for (;;) {
      const resp = await this.listPublishedOAuthAppIntegrations(
        pageReq,
        options
      );
      for (const item of resp.apps ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Get all the available published OAuth apps in <Databricks>. */
  async listPublishedOAuthApps(
    req: ListPublishedOAuthAppsRequest,
    options?: CallOptions
  ): Promise<ListPublishedOAuthAppsRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-apps`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPublishedOAuthAppsRequest_Response | undefined;
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
        unmarshalListPublishedOAuthAppsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listPublishedOAuthAppsIter(
    req: ListPublishedOAuthAppsRequest,
    options?: CallOptions
  ): AsyncGenerator<PublishedOAuthApp> {
    const pageReq: ListPublishedOAuthAppsRequest = {...req};
    for (;;) {
      const resp = await this.listPublishedOAuthApps(pageReq, options);
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
  async updateCustomOAuthAppIntegration(
    req: UpdateCustomOAuthAppIntegrationRequest,
    options?: CallOptions
  ): Promise<UpdateCustomOAuthAppIntegrationRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateCustomOAuthAppIntegrationRequestSchema
    );
    let resp: UpdateCustomOAuthAppIntegrationRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateCustomOAuthAppIntegrationRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates an existing published OAuth App Integration.
   * You can retrieve the published OAuth app integration via :method:PublishedAppIntegration/get.
   */
  async updatePublishedOAuthAppIntegration(
    req: UpdatePublishedOAuthAppIntegrationRequest,
    options?: CallOptions
  ): Promise<UpdatePublishedOAuthAppIntegrationRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdatePublishedOAuthAppIntegrationRequestSchema
    );
    let resp: UpdatePublishedOAuthAppIntegrationRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdatePublishedOAuthAppIntegrationRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
