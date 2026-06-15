// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  flattenQueryParams,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  AddExchangeForListingRequest,
  AddExchangeForListingResponse,
  BatchGetListingsRequest,
  BatchGetListingsResponse,
  BatchGetProvidersRequest,
  BatchGetProvidersResponse,
  CreateExchangeFilterRequest,
  CreateExchangeFilterResponse,
  CreateExchangeRequest,
  CreateExchangeResponse,
  CreateFileRequest,
  CreateFileResponse,
  CreateInstallationRequest,
  CreateInstallationResponse,
  CreateListingRequest,
  CreateListingResponse,
  CreatePersonalizationRequest,
  CreatePersonalizationResponse,
  CreateProviderAnalyticsDashboardRequest,
  CreateProviderAnalyticsDashboardResponse,
  CreateProviderRequest,
  CreateProviderResponse,
  DeleteExchangeFilterRequest,
  DeleteExchangeFilterResponse,
  DeleteExchangeRequest,
  DeleteExchangeResponse,
  DeleteFileRequest,
  DeleteFileResponse,
  DeleteInstallationRequest,
  DeleteInstallationResponse,
  DeleteListingRequest,
  DeleteListingResponse,
  DeleteProviderRequest,
  DeleteProviderResponse,
  Exchange,
  ExchangeFilter,
  ExchangeListing,
  FileInfo,
  GetAllPersonalizationRequestsForConsumerResponse,
  GetExchangeRequest,
  GetExchangeResponse,
  GetFileRequest,
  GetFileResponse,
  GetInstallationDetailsRequest,
  GetLatestVersionProviderAnalyticsDashboardRequest,
  GetLatestVersionProviderAnalyticsDashboardResponse,
  GetListingContentMetadataRequest,
  GetListingContentMetadataResponse,
  GetListingRequest,
  GetListingResponse,
  GetListingsResponse,
  GetPersonalizationRequestsForConsumerRequest,
  GetPersonalizationRequestsForConsumerResponse,
  GetPersonalizationRequestsForProviderRequest,
  GetPersonalizationRequestsForProviderResponse,
  GetProviderRequest,
  GetProviderResponse,
  GetPublishedListingForConsumerRequest,
  GetPublishedListingForConsumerResponse,
  GetPublishedListingsForConsumerResponse,
  GetPublishedProviderForConsumerRequest,
  GetPublishedProviderForConsumerResponse,
  InstallationDetail,
  ListAllInstallationsResponse,
  ListExchangeFiltersRequest,
  ListExchangeFiltersResponse,
  ListExchangesForListingRequest,
  ListExchangesForListingResponse,
  ListExchangesRequest,
  ListExchangesResponse,
  ListFilesRequest,
  ListFilesResponse,
  ListFulfillmentsResponse,
  ListInstallationsRequest,
  ListInstallationsResponse,
  ListListingFulfillmentsRequest,
  ListListingsForExchangeRequest,
  ListListingsForExchangeResponse,
  ListListingsRequest,
  ListPersonalizationRequestsForConsumerRequest,
  ListProviderAnalyticsDashboardRequest,
  ListProviderAnalyticsDashboardResponse,
  ListProvidersRequest,
  ListProvidersResponse,
  ListPublishedListingsForConsumerRequest,
  ListPublishedProvidersForConsumerRequest,
  ListPublishedProvidersForConsumerResponse,
  Listing,
  ListingFulfillment,
  PersonalizationRequest,
  ProviderInfo,
  RemoveExchangeForListingRequest,
  RemoveExchangeForListingResponse,
  SearchPublishedListingsForConsumerRequest,
  SearchPublishedListingsForConsumerResponse,
  SharedDataObject,
  UpdateExchangeFilterRequest,
  UpdateExchangeFilterResponse,
  UpdateExchangeRequest,
  UpdateExchangeResponse,
  UpdateInstallationRequest,
  UpdateInstallationResponse,
  UpdateListingRequest,
  UpdateListingResponse,
  UpdatePersonalizationRequestStatusRequest,
  UpdatePersonalizationRequestStatusResponse,
  UpdateProviderAnalyticsDashboardRequest,
  UpdateProviderAnalyticsDashboardResponse,
  UpdateProviderRequest,
  UpdateProviderResponse,
} from './model';
import {
  marshalAddExchangeForListingRequestSchema,
  marshalCreateExchangeFilterRequestSchema,
  marshalCreateExchangeRequestSchema,
  marshalCreateFileRequestSchema,
  marshalCreateInstallationRequestSchema,
  marshalCreateListingRequestSchema,
  marshalCreatePersonalizationRequestSchema,
  marshalCreateProviderAnalyticsDashboardRequestSchema,
  marshalCreateProviderRequestSchema,
  marshalFileParentSchema,
  marshalListingTagSchema,
  marshalUpdateExchangeFilterRequestSchema,
  marshalUpdateExchangeRequestSchema,
  marshalUpdateInstallationRequestSchema,
  marshalUpdateListingRequestSchema,
  marshalUpdatePersonalizationRequestStatusRequestSchema,
  marshalUpdateProviderAnalyticsDashboardRequestSchema,
  marshalUpdateProviderRequestSchema,
  unmarshalAddExchangeForListingResponseSchema,
  unmarshalBatchGetListingsResponseSchema,
  unmarshalBatchGetProvidersResponseSchema,
  unmarshalCreateExchangeFilterResponseSchema,
  unmarshalCreateExchangeResponseSchema,
  unmarshalCreateFileResponseSchema,
  unmarshalCreateInstallationResponseSchema,
  unmarshalCreateListingResponseSchema,
  unmarshalCreatePersonalizationResponseSchema,
  unmarshalCreateProviderAnalyticsDashboardResponseSchema,
  unmarshalCreateProviderResponseSchema,
  unmarshalDeleteExchangeFilterResponseSchema,
  unmarshalDeleteExchangeResponseSchema,
  unmarshalDeleteFileResponseSchema,
  unmarshalDeleteInstallationResponseSchema,
  unmarshalDeleteListingResponseSchema,
  unmarshalDeleteProviderResponseSchema,
  unmarshalGetAllPersonalizationRequestsForConsumerResponseSchema,
  unmarshalGetExchangeResponseSchema,
  unmarshalGetFileResponseSchema,
  unmarshalGetLatestVersionProviderAnalyticsDashboardResponseSchema,
  unmarshalGetListingContentMetadataResponseSchema,
  unmarshalGetListingResponseSchema,
  unmarshalGetListingsResponseSchema,
  unmarshalGetPersonalizationRequestsForConsumerResponseSchema,
  unmarshalGetPersonalizationRequestsForProviderResponseSchema,
  unmarshalGetProviderResponseSchema,
  unmarshalGetPublishedListingForConsumerResponseSchema,
  unmarshalGetPublishedListingsForConsumerResponseSchema,
  unmarshalGetPublishedProviderForConsumerResponseSchema,
  unmarshalListAllInstallationsResponseSchema,
  unmarshalListExchangeFiltersResponseSchema,
  unmarshalListExchangesForListingResponseSchema,
  unmarshalListExchangesResponseSchema,
  unmarshalListFilesResponseSchema,
  unmarshalListFulfillmentsResponseSchema,
  unmarshalListInstallationsResponseSchema,
  unmarshalListListingsForExchangeResponseSchema,
  unmarshalListProviderAnalyticsDashboardResponseSchema,
  unmarshalListProvidersResponseSchema,
  unmarshalListPublishedProvidersForConsumerResponseSchema,
  unmarshalRemoveExchangeForListingResponseSchema,
  unmarshalSearchPublishedListingsForConsumerResponseSchema,
  unmarshalUpdateExchangeFilterResponseSchema,
  unmarshalUpdateExchangeResponseSchema,
  unmarshalUpdateInstallationResponseSchema,
  unmarshalUpdateListingResponseSchema,
  unmarshalUpdatePersonalizationRequestStatusResponseSchema,
  unmarshalUpdateProviderAnalyticsDashboardResponseSchema,
  unmarshalUpdateProviderResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class MarketplacesClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /** Batch get a published listing in the Databricks Marketplace that the consumer has access to. */
  async batchGetListings(
    req: BatchGetListingsRequest,
    options?: CallOptions
  ): Promise<BatchGetListingsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings:batchGet`;
    const params = new URLSearchParams();
    if (req.ids !== undefined) {
      params.append('ids', String(req.ids));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: BatchGetListingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBatchGetListingsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Batch get a provider in the Databricks Marketplace with at least one visible listing. */
  async batchGetProviders(
    req: BatchGetProvidersRequest,
    options?: CallOptions
  ): Promise<BatchGetProvidersResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/providers:batchGet`;
    const params = new URLSearchParams();
    if (req.ids !== undefined) {
      params.append('ids', String(req.ids));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: BatchGetProvidersResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBatchGetProvidersResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a personalization request for a listing. */
  async createPersonalizationRequest(
    req: CreatePersonalizationRequest,
    options?: CallOptions
  ): Promise<CreatePersonalizationResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings/${req.listingId ?? ''}/personalization-requests`;
    const body = marshalRequest(req, marshalCreatePersonalizationRequestSchema);
    let resp: CreatePersonalizationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreatePersonalizationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List all installations for a particular listing. */
  async getInstallationDetails(
    req: GetInstallationDetailsRequest,
    options?: CallOptions
  ): Promise<ListInstallationsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings/${req.listingId ?? ''}/installations`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListInstallationsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListInstallationsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *getInstallationDetailsIter(
    req: GetInstallationDetailsRequest,
    options?: CallOptions
  ): AsyncGenerator<InstallationDetail> {
    const pageReq: GetInstallationDetailsRequest = {...req};
    for (;;) {
      const resp = await this.getInstallationDetails(pageReq, options);
      for (const item of resp.installations ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Get a high level preview of the metadata of listing installable content. */
  async getListingContent(
    req: GetListingContentMetadataRequest,
    options?: CallOptions
  ): Promise<GetListingContentMetadataResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings/${req.listingId ?? ''}/content`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetListingContentMetadataResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetListingContentMetadataResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *getListingContentIter(
    req: GetListingContentMetadataRequest,
    options?: CallOptions
  ): AsyncGenerator<SharedDataObject> {
    const pageReq: GetListingContentMetadataRequest = {...req};
    for (;;) {
      const resp = await this.getListingContent(pageReq, options);
      for (const item of resp.sharedDataObjects ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Get the personalization request for a listing. Each consumer can make at *most* one personalization request for a listing. */
  async getPersonalizationRequestsForConsumer(
    req: GetPersonalizationRequestsForConsumerRequest,
    options?: CallOptions
  ): Promise<GetPersonalizationRequestsForConsumerResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings/${req.listingId ?? ''}/personalization-requests`;
    let resp: GetPersonalizationRequestsForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPersonalizationRequestsForConsumerResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a published listing in the Databricks Marketplace that the consumer has access to. */
  async getPublishedListingForConsumer(
    req: GetPublishedListingForConsumerRequest,
    options?: CallOptions
  ): Promise<GetPublishedListingForConsumerResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings/${req.id ?? ''}`;
    let resp: GetPublishedListingForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPublishedListingForConsumerResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a provider in the Databricks Marketplace with at least one visible listing. */
  async getPublishedProviderForConsumer(
    req: GetPublishedProviderForConsumerRequest,
    options?: CallOptions
  ): Promise<GetPublishedProviderForConsumerResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/providers/${req.id ?? ''}`;
    let resp: GetPublishedProviderForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPublishedProviderForConsumerResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Install payload associated with a Databricks Marketplace listing. */
  async installListing(
    req: CreateInstallationRequest,
    options?: CallOptions
  ): Promise<CreateInstallationResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings/${req.listingId ?? ''}/installations`;
    const body = marshalRequest(req, marshalCreateInstallationRequestSchema);
    let resp: CreateInstallationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateInstallationResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List all installations across all listings. */
  async listInstallations(
    req: ListInstallationsRequest,
    options?: CallOptions
  ): Promise<ListAllInstallationsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/installations`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAllInstallationsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListAllInstallationsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listInstallationsIter(
    req: ListInstallationsRequest,
    options?: CallOptions
  ): AsyncGenerator<InstallationDetail> {
    const pageReq: ListInstallationsRequest = {...req};
    for (;;) {
      const resp = await this.listInstallations(pageReq, options);
      for (const item of resp.installations ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Get all listings fulfillments associated with a listing. A _fulfillment_ is a potential installation.
   * Standard installations contain metadata about the attached share or git repo. Only one of these fields will be present.
   * Personalized installations contain metadata about the attached share or git repo, as well as the Delta Sharing recipient type.
   */
  async listListingFulfillments(
    req: ListListingFulfillmentsRequest,
    options?: CallOptions
  ): Promise<ListFulfillmentsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings/${req.listingId ?? ''}/fulfillments`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFulfillmentsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListFulfillmentsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listListingFulfillmentsIter(
    req: ListListingFulfillmentsRequest,
    options?: CallOptions
  ): AsyncGenerator<ListingFulfillment> {
    const pageReq: ListListingFulfillmentsRequest = {...req};
    for (;;) {
      const resp = await this.listListingFulfillments(pageReq, options);
      for (const item of resp.fulfillments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List personalization requests for a consumer across all listings. */
  async listPersonalizationRequestsForConsumer(
    req: ListPersonalizationRequestsForConsumerRequest,
    options?: CallOptions
  ): Promise<GetAllPersonalizationRequestsForConsumerResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/personalization-requests`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetAllPersonalizationRequestsForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetAllPersonalizationRequestsForConsumerResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listPersonalizationRequestsForConsumerIter(
    req: ListPersonalizationRequestsForConsumerRequest,
    options?: CallOptions
  ): AsyncGenerator<PersonalizationRequest> {
    const pageReq: ListPersonalizationRequestsForConsumerRequest = {...req};
    for (;;) {
      const resp = await this.listPersonalizationRequestsForConsumer(
        pageReq,
        options
      );
      for (const item of resp.personalizationRequests ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List all published listings in the Databricks Marketplace that the consumer has access to. */
  async listPublishedListingsForConsumer(
    req: ListPublishedListingsForConsumerRequest,
    options?: CallOptions
  ): Promise<GetPublishedListingsForConsumerResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.assets !== undefined) {
      params.append('assets', String(req.assets));
    }
    if (req.categories !== undefined) {
      params.append('categories', String(req.categories));
    }
    if (req.tags !== undefined) {
      flattenQueryParams(
        'tags',
        marshalListingTagSchema.parse(req.tags),
        params
      );
    }
    if (req.isFree !== undefined) {
      params.append('is_free', String(req.isFree));
    }
    if (req.isPrivateExchange !== undefined) {
      params.append('is_private_exchange', String(req.isPrivateExchange));
    }
    if (req.isStaffPick !== undefined) {
      params.append('is_staff_pick', String(req.isStaffPick));
    }
    if (req.providerIds !== undefined) {
      params.append('provider_ids', String(req.providerIds));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPublishedListingsForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPublishedListingsForConsumerResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listPublishedListingsForConsumerIter(
    req: ListPublishedListingsForConsumerRequest,
    options?: CallOptions
  ): AsyncGenerator<Listing> {
    const pageReq: ListPublishedListingsForConsumerRequest = {...req};
    for (;;) {
      const resp = await this.listPublishedListingsForConsumer(
        pageReq,
        options
      );
      for (const item of resp.listings ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List all providers in the Databricks Marketplace with at least one visible listing. */
  async listPublishedProvidersForConsumer(
    req: ListPublishedProvidersForConsumerRequest,
    options?: CallOptions
  ): Promise<ListPublishedProvidersForConsumerResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/providers`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.isFeatured !== undefined) {
      params.append('is_featured', String(req.isFeatured));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPublishedProvidersForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListPublishedProvidersForConsumerResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listPublishedProvidersForConsumerIter(
    req: ListPublishedProvidersForConsumerRequest,
    options?: CallOptions
  ): AsyncGenerator<ProviderInfo> {
    const pageReq: ListPublishedProvidersForConsumerRequest = {...req};
    for (;;) {
      const resp = await this.listPublishedProvidersForConsumer(
        pageReq,
        options
      );
      for (const item of resp.providers ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Search published listings in the Databricks Marketplace that the consumer has access to.
   * This query supports a variety of different search parameters and performs fuzzy matching.
   */
  async searchPublishedListingsForConsumer(
    req: SearchPublishedListingsForConsumerRequest,
    options?: CallOptions
  ): Promise<SearchPublishedListingsForConsumerResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/search-listings`;
    const params = new URLSearchParams();
    if (req.query !== undefined) {
      params.append('query', req.query);
    }
    if (req.isFree !== undefined) {
      params.append('is_free', String(req.isFree));
    }
    if (req.isPrivateExchange !== undefined) {
      params.append('is_private_exchange', String(req.isPrivateExchange));
    }
    if (req.providerIds !== undefined) {
      params.append('provider_ids', String(req.providerIds));
    }
    if (req.categories !== undefined) {
      params.append('categories', String(req.categories));
    }
    if (req.assets !== undefined) {
      params.append('assets', String(req.assets));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: SearchPublishedListingsForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalSearchPublishedListingsForConsumerResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *searchPublishedListingsForConsumerIter(
    req: SearchPublishedListingsForConsumerRequest,
    options?: CallOptions
  ): AsyncGenerator<Listing> {
    const pageReq: SearchPublishedListingsForConsumerRequest = {...req};
    for (;;) {
      const resp = await this.searchPublishedListingsForConsumer(
        pageReq,
        options
      );
      for (const item of resp.listings ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Uninstall an installation associated with a Databricks Marketplace listing. */
  async uninstallListing(
    req: DeleteInstallationRequest,
    options?: CallOptions
  ): Promise<DeleteInstallationResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings/${req.listingId ?? ''}/installations/${req.installationId ?? ''}`;
    let resp: DeleteInstallationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteInstallationResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * This is a update API that will update the part of the fields defined in the installation table as well
   * as interact with external services according to the fields not included in the installation table
   * 1. the token will be rotate if the rotateToken flag is true
   * 2. the token will be forcibly rotate if the rotateToken flag is true and the tokenInfo field is empty
   */
  async updateInstallationDetail(
    req: UpdateInstallationRequest,
    options?: CallOptions
  ): Promise<UpdateInstallationResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-consumer/listings/${req.listingId ?? ''}/installations/${req.installationId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateInstallationRequestSchema);
    let resp: UpdateInstallationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateInstallationResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Associate an exchange with a listing */
  async addExchangeForListing(
    req: AddExchangeForListingRequest,
    options?: CallOptions
  ): Promise<AddExchangeForListingResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges-for-listing`;
    const body = marshalRequest(req, marshalAddExchangeForListingRequestSchema);
    let resp: AddExchangeForListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalAddExchangeForListingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create an exchange */
  async createExchange(
    req: CreateExchangeRequest,
    options?: CallOptions
  ): Promise<CreateExchangeResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges`;
    const body = marshalRequest(req, marshalCreateExchangeRequestSchema);
    let resp: CreateExchangeResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateExchangeResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Add an exchange filter. */
  async createExchangeFilter(
    req: CreateExchangeFilterRequest,
    options?: CallOptions
  ): Promise<CreateExchangeFilterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/filters`;
    const body = marshalRequest(req, marshalCreateExchangeFilterRequestSchema);
    let resp: CreateExchangeFilterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateExchangeFilterResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a file. Currently, only provider icons and attached notebooks are supported. */
  async createFile(
    req: CreateFileRequest,
    options?: CallOptions
  ): Promise<CreateFileResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/files`;
    const body = marshalRequest(req, marshalCreateFileRequestSchema);
    let resp: CreateFileResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateFileResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a new listing */
  async createListing(
    req: CreateListingRequest,
    options?: CallOptions
  ): Promise<CreateListingResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listing`;
    const body = marshalRequest(req, marshalCreateListingRequestSchema);
    let resp: CreateListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateListingResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a provider */
  async createProvider(
    req: CreateProviderRequest,
    options?: CallOptions
  ): Promise<CreateProviderResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/provider`;
    const body = marshalRequest(req, marshalCreateProviderRequestSchema);
    let resp: CreateProviderResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateProviderResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create provider analytics dashboard. Returns Marketplace specific `id`. Not to be confused with the Lakeview dashboard id. */
  async createProviderAnalyticsDashboard(
    req: CreateProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<CreateProviderAnalyticsDashboardResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/analytics_dashboard`;
    const body = marshalRequest(
      req,
      marshalCreateProviderAnalyticsDashboardRequestSchema
    );
    let resp: CreateProviderAnalyticsDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateProviderAnalyticsDashboardResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** This removes a listing from marketplace. */
  async deleteExchange(
    req: DeleteExchangeRequest,
    options?: CallOptions
  ): Promise<DeleteExchangeResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges/${req.id ?? ''}`;
    let resp: DeleteExchangeResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteExchangeResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete an exchange filter */
  async deleteExchangeFilter(
    req: DeleteExchangeFilterRequest,
    options?: CallOptions
  ): Promise<DeleteExchangeFilterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/filters/${req.id ?? ''}`;
    let resp: DeleteExchangeFilterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteExchangeFilterResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a file */
  async deleteFile(
    req: DeleteFileRequest,
    options?: CallOptions
  ): Promise<DeleteFileResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/files/${req.fileId ?? ''}`;
    let resp: DeleteFileResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteFileResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a listing */
  async deleteListing(
    req: DeleteListingRequest,
    options?: CallOptions
  ): Promise<DeleteListingResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listings/${req.id ?? ''}`;
    let resp: DeleteListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteListingResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete provider */
  async deleteProvider(
    req: DeleteProviderRequest,
    options?: CallOptions
  ): Promise<DeleteProviderResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/providers/${req.id ?? ''}`;
    let resp: DeleteProviderResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteProviderResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get an exchange. */
  async getExchange(
    req: GetExchangeRequest,
    options?: CallOptions
  ): Promise<GetExchangeResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges/${req.id ?? ''}`;
    let resp: GetExchangeResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetExchangeResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a file */
  async getFile(
    req: GetFileRequest,
    options?: CallOptions
  ): Promise<GetFileResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/files/${req.fileId ?? ''}`;
    let resp: GetFileResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetFileResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get latest version of provider analytics dashboard. */
  async getLatestVersionProviderAnalyticsDashboard(
    _req: GetLatestVersionProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<GetLatestVersionProviderAnalyticsDashboardResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/analytics_dashboard/latest`;
    let resp: GetLatestVersionProviderAnalyticsDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetLatestVersionProviderAnalyticsDashboardResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a listing */
  async getListing(
    req: GetListingRequest,
    options?: CallOptions
  ): Promise<GetListingResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listings/${req.id ?? ''}`;
    let resp: GetListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetListingResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * List personalization requests to this provider.
   * This will return all personalization requests, regardless of which listing they are for.
   */
  async getPersonalizationRequestsForProvider(
    req: GetPersonalizationRequestsForProviderRequest,
    options?: CallOptions
  ): Promise<GetPersonalizationRequestsForProviderResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/personalization-requests`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPersonalizationRequestsForProviderResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPersonalizationRequestsForProviderResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *getPersonalizationRequestsForProviderIter(
    req: GetPersonalizationRequestsForProviderRequest,
    options?: CallOptions
  ): AsyncGenerator<PersonalizationRequest> {
    const pageReq: GetPersonalizationRequestsForProviderRequest = {...req};
    for (;;) {
      const resp = await this.getPersonalizationRequestsForProvider(
        pageReq,
        options
      );
      for (const item of resp.personalizationRequests ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Get provider profile */
  async getProvider(
    req: GetProviderRequest,
    options?: CallOptions
  ): Promise<GetProviderResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/providers/${req.id ?? ''}`;
    let resp: GetProviderResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetProviderResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List exchange filter */
  async listExchangeFilters(
    req: ListExchangeFiltersRequest,
    options?: CallOptions
  ): Promise<ListExchangeFiltersResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/filters`;
    const params = new URLSearchParams();
    if (req.exchangeId !== undefined) {
      params.append('exchange_id', req.exchangeId);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListExchangeFiltersResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListExchangeFiltersResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listExchangeFiltersIter(
    req: ListExchangeFiltersRequest,
    options?: CallOptions
  ): AsyncGenerator<ExchangeFilter> {
    const pageReq: ListExchangeFiltersRequest = {...req};
    for (;;) {
      const resp = await this.listExchangeFilters(pageReq, options);
      for (const item of resp.filters ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List exchanges visible to provider */
  async listExchanges(
    req: ListExchangesRequest,
    options?: CallOptions
  ): Promise<ListExchangesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListExchangesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListExchangesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listExchangesIter(
    req: ListExchangesRequest,
    options?: CallOptions
  ): AsyncGenerator<Exchange> {
    const pageReq: ListExchangesRequest = {...req};
    for (;;) {
      const resp = await this.listExchanges(pageReq, options);
      for (const item of resp.exchanges ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List exchanges associated with a listing */
  async listExchangesForListing(
    req: ListExchangesForListingRequest,
    options?: CallOptions
  ): Promise<ListExchangesForListingResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges-for-listing`;
    const params = new URLSearchParams();
    if (req.listingId !== undefined) {
      params.append('listing_id', req.listingId);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListExchangesForListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListExchangesForListingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listExchangesForListingIter(
    req: ListExchangesForListingRequest,
    options?: CallOptions
  ): AsyncGenerator<ExchangeListing> {
    const pageReq: ListExchangesForListingRequest = {...req};
    for (;;) {
      const resp = await this.listExchangesForListing(pageReq, options);
      for (const item of resp.exchangeListing ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List files attached to a parent entity. */
  async listFiles(
    req: ListFilesRequest,
    options?: CallOptions
  ): Promise<ListFilesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/files`;
    const params = new URLSearchParams();
    if (req.fileParent !== undefined) {
      flattenQueryParams(
        'file_parent',
        marshalFileParentSchema.parse(req.fileParent),
        params
      );
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFilesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListFilesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listFilesIter(
    req: ListFilesRequest,
    options?: CallOptions
  ): AsyncGenerator<FileInfo> {
    const pageReq: ListFilesRequest = {...req};
    for (;;) {
      const resp = await this.listFiles(pageReq, options);
      for (const item of resp.fileInfos ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List listings owned by this provider */
  async listListings(
    req: ListListingsRequest,
    options?: CallOptions
  ): Promise<GetListingsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listings`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetListingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetListingsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listListingsIter(
    req: ListListingsRequest,
    options?: CallOptions
  ): AsyncGenerator<Listing> {
    const pageReq: ListListingsRequest = {...req};
    for (;;) {
      const resp = await this.listListings(pageReq, options);
      for (const item of resp.listings ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List listings associated with an exchange */
  async listListingsForExchange(
    req: ListListingsForExchangeRequest,
    options?: CallOptions
  ): Promise<ListListingsForExchangeResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/listings-for-exchange`;
    const params = new URLSearchParams();
    if (req.exchangeId !== undefined) {
      params.append('exchange_id', req.exchangeId);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListListingsForExchangeResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListListingsForExchangeResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listListingsForExchangeIter(
    req: ListListingsForExchangeRequest,
    options?: CallOptions
  ): AsyncGenerator<ExchangeListing> {
    const pageReq: ListListingsForExchangeRequest = {...req};
    for (;;) {
      const resp = await this.listListingsForExchange(pageReq, options);
      for (const item of resp.exchangeListings ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Get provider analytics dashboard. */
  async listProviderAnalyticsDashboard(
    _req: ListProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<ListProviderAnalyticsDashboardResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/analytics_dashboard`;
    let resp: ListProviderAnalyticsDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListProviderAnalyticsDashboardResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List provider profiles for account. */
  async listProviders(
    req: ListProvidersRequest,
    options?: CallOptions
  ): Promise<ListProvidersResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/providers`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListProvidersResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListProvidersResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listProvidersIter(
    req: ListProvidersRequest,
    options?: CallOptions
  ): AsyncGenerator<ProviderInfo> {
    const pageReq: ListProvidersRequest = {...req};
    for (;;) {
      const resp = await this.listProviders(pageReq, options);
      for (const item of resp.providers ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Disassociate an exchange with a listing */
  async removeExchangeForListing(
    req: RemoveExchangeForListingRequest,
    options?: CallOptions
  ): Promise<RemoveExchangeForListingResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges-for-listing/${req.id ?? ''}`;
    let resp: RemoveExchangeForListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalRemoveExchangeForListingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update an exchange */
  async updateExchange(
    req: UpdateExchangeRequest,
    options?: CallOptions
  ): Promise<UpdateExchangeResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateExchangeRequestSchema);
    let resp: UpdateExchangeResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateExchangeResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update an exchange filter. */
  async updateExchangeFilter(
    req: UpdateExchangeFilterRequest,
    options?: CallOptions
  ): Promise<UpdateExchangeFilterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/filters/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateExchangeFilterRequestSchema);
    let resp: UpdateExchangeFilterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateExchangeFilterResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update a listing */
  async updateListing(
    req: UpdateListingRequest,
    options?: CallOptions
  ): Promise<UpdateListingResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listings/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateListingRequestSchema);
    let resp: UpdateListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateListingResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update personalization request. This method only permits updating the status of the request. */
  async updatePersonalizationRequestStatus(
    req: UpdatePersonalizationRequestStatusRequest,
    options?: CallOptions
  ): Promise<UpdatePersonalizationRequestStatusResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listings/${req.listingId ?? ''}/personalization-requests/${req.requestId ?? ''}/request-status`;
    const body = marshalRequest(
      req,
      marshalUpdatePersonalizationRequestStatusRequestSchema
    );
    let resp: UpdatePersonalizationRequestStatusResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdatePersonalizationRequestStatusResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update provider profile */
  async updateProvider(
    req: UpdateProviderRequest,
    options?: CallOptions
  ): Promise<UpdateProviderResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/providers/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateProviderRequestSchema);
    let resp: UpdateProviderResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateProviderResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update provider analytics dashboard. */
  async updateProviderAnalyticsDashboard(
    req: UpdateProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<UpdateProviderAnalyticsDashboardResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/analytics_dashboard/${req.id ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateProviderAnalyticsDashboardRequestSchema
    );
    let resp: UpdateProviderAnalyticsDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateProviderAnalyticsDashboardResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
