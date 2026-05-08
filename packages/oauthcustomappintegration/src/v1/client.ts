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
    req: CreateCustomOAuthAppIntegration,
    options?: CallOptions
  ): Promise<CustomOAuthAppIntegrationSecret> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations`;
    const body = marshalRequest(
      req,
      marshalCreateCustomOAuthAppIntegrationSchema
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
    req: CreatePublishedOAuthAppIntegration,
    options?: CallOptions
  ): Promise<CreatePublishedOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations`;
    const body = marshalRequest(
      req,
      marshalCreatePublishedOAuthAppIntegrationSchema
    );
    let resp: CreatePublishedOAuthAppIntegration_Response | undefined;
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
        unmarshalCreatePublishedOAuthAppIntegration_ResponseSchema
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
    req: DeleteCustomOAuthAppIntegration,
    options?: CallOptions
  ): Promise<DeleteCustomOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    let resp: DeleteCustomOAuthAppIntegration_Response | undefined;
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
        unmarshalDeleteCustomOAuthAppIntegration_ResponseSchema
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
    req: DeletePublishedOAuthAppIntegration,
    options?: CallOptions
  ): Promise<DeletePublishedOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    let resp: DeletePublishedOAuthAppIntegration_Response | undefined;
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
        unmarshalDeletePublishedOAuthAppIntegration_ResponseSchema
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
    req: GetCustomOAuthAppIntegration,
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
    req: GetPublishedOAuthAppIntegration,
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
    req: ListCustomOAuthAppIntegrations,
    options?: CallOptions
  ): Promise<ListCustomOAuthAppIntegrations_Response> {
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
    let resp: ListCustomOAuthAppIntegrations_Response | undefined;
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
        unmarshalListCustomOAuthAppIntegrations_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCustomOAuthAppIntegrationsIter(
    req: ListCustomOAuthAppIntegrations,
    options?: CallOptions
  ): AsyncGenerator<CustomOAuthAppIntegration> {
    const pageReq: ListCustomOAuthAppIntegrations = {...req};
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
    req: ListPublishedOAuthAppIntegrations,
    options?: CallOptions
  ): Promise<ListPublishedOAuthAppIntegrations_Response> {
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
    let resp: ListPublishedOAuthAppIntegrations_Response | undefined;
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
        unmarshalListPublishedOAuthAppIntegrations_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listPublishedOAuthAppIntegrationsIter(
    req: ListPublishedOAuthAppIntegrations,
    options?: CallOptions
  ): AsyncGenerator<PublishedOAuthAppIntegration> {
    const pageReq: ListPublishedOAuthAppIntegrations = {...req};
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

  /**
   * Updates an existing custom OAuth App Integration.
   * You can retrieve the custom OAuth app integration via :method:CustomAppIntegration/get.
   */
  async updateCustomOAuthAppIntegration(
    req: UpdateCustomOAuthAppIntegration,
    options?: CallOptions
  ): Promise<UpdateCustomOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/custom-app-integrations/${req.integrationId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateCustomOAuthAppIntegrationSchema
    );
    let resp: UpdateCustomOAuthAppIntegration_Response | undefined;
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
        unmarshalUpdateCustomOAuthAppIntegration_ResponseSchema
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
    req: UpdatePublishedOAuthAppIntegration,
    options?: CallOptions
  ): Promise<UpdatePublishedOAuthAppIntegration_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/oauth2/published-app-integrations/${req.integrationId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdatePublishedOAuthAppIntegrationSchema
    );
    let resp: UpdatePublishedOAuthAppIntegration_Response | undefined;
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
        unmarshalUpdatePublishedOAuthAppIntegration_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
