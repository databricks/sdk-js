// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import {DEFAULT_DEBUG_TRUNCATE_BYTES} from '@databricks/sdk-core/logger/debug';
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
  CreatePublishedOAuthAppIntegrationResponse,
  CustomOAuthAppIntegration,
  CustomOAuthAppIntegrationSecret,
  DeleteCustomOAuthAppIntegrationRequest,
  DeleteCustomOAuthAppIntegrationResponse,
  DeletePublishedOAuthAppIntegrationRequest,
  DeletePublishedOAuthAppIntegrationResponse,
  GetCustomOAuthAppIntegrationRequest,
  GetPublishedOAuthAppIntegrationRequest,
  ListCustomOAuthAppIntegrationsRequest,
  ListCustomOAuthAppIntegrationsResponse,
  ListPublishedOAuthAppIntegrationsRequest,
  ListPublishedOAuthAppIntegrationsResponse,
  ListPublishedOAuthAppsRequest,
  ListPublishedOAuthAppsResponse,
  PublishedOAuthApp,
  PublishedOAuthAppIntegration,
  UpdateCustomOAuthAppIntegrationRequest,
  UpdateCustomOAuthAppIntegrationResponse,
  UpdatePublishedOAuthAppIntegrationRequest,
  UpdatePublishedOAuthAppIntegrationResponse,
} from './model';
import {
  marshalCreateCustomOAuthAppIntegrationRequestSchema,
  marshalCreatePublishedOAuthAppIntegrationRequestSchema,
  marshalUpdateCustomOAuthAppIntegrationRequestSchema,
  marshalUpdatePublishedOAuthAppIntegrationRequestSchema,
  unmarshalCreatePublishedOAuthAppIntegrationResponseSchema,
  unmarshalCustomOAuthAppIntegrationSchema,
  unmarshalCustomOAuthAppIntegrationSecretSchema,
  unmarshalDeleteCustomOAuthAppIntegrationResponseSchema,
  unmarshalDeletePublishedOAuthAppIntegrationResponseSchema,
  unmarshalListCustomOAuthAppIntegrationsResponseSchema,
  unmarshalListPublishedOAuthAppIntegrationsResponseSchema,
  unmarshalListPublishedOAuthAppsResponseSchema,
  unmarshalPublishedOAuthAppIntegrationSchema,
  unmarshalUpdateCustomOAuthAppIntegrationResponseSchema,
  unmarshalUpdatePublishedOAuthAppIntegrationResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class OAuthClient {
  private readonly host: string;
  // Fallback for endpoints whose path contains {account_id}. If the request
  // already carries an accountId, that value wins.
  private readonly accountId: string | undefined;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;
  // Resolved debug-logging toggles passed into each HTTP call.
  private readonly debugHeaders: boolean;
  private readonly debugTruncateBytes: number;
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
    this.debugHeaders = options.debugHeaders ?? false;
    this.debugTruncateBytes =
      options.debugTruncateBytes ?? DEFAULT_DEBUG_TRUNCATE_BYTES;
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalCustomOAuthAppIntegrationSecretSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
  ): Promise<CreatePublishedOAuthAppIntegrationResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations`;
    const body = marshalRequest(
      req,
      marshalCreatePublishedOAuthAppIntegrationRequestSchema
    );
    let resp: CreatePublishedOAuthAppIntegrationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreatePublishedOAuthAppIntegrationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
  ): Promise<DeleteCustomOAuthAppIntegrationResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    let resp: DeleteCustomOAuthAppIntegrationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteCustomOAuthAppIntegrationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
  ): Promise<DeletePublishedOAuthAppIntegrationResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    let resp: DeletePublishedOAuthAppIntegrationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeletePublishedOAuthAppIntegrationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalCustomOAuthAppIntegrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalPublishedOAuthAppIntegrationSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get the list of custom OAuth app integrations for the specified <Account> */
  async listCustomOAuthAppIntegrations(
    req: ListCustomOAuthAppIntegrationsRequest,
    options?: CallOptions
  ): Promise<ListCustomOAuthAppIntegrationsResponse> {
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
    let resp: ListCustomOAuthAppIntegrationsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalListCustomOAuthAppIntegrationsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
  ): Promise<ListPublishedOAuthAppIntegrationsResponse> {
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
    let resp: ListPublishedOAuthAppIntegrationsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalListPublishedOAuthAppIntegrationsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
  ): Promise<ListPublishedOAuthAppsResponse> {
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
    let resp: ListPublishedOAuthAppsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalListPublishedOAuthAppsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
  ): Promise<UpdateCustomOAuthAppIntegrationResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateCustomOAuthAppIntegrationRequestSchema
    );
    let resp: UpdateCustomOAuthAppIntegrationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateCustomOAuthAppIntegrationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
  ): Promise<UpdatePublishedOAuthAppIntegrationResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdatePublishedOAuthAppIntegrationRequestSchema
    );
    let resp: UpdatePublishedOAuthAppIntegrationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdatePublishedOAuthAppIntegrationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
