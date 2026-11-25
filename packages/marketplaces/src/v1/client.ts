// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  encodePathVariable,
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
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
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
      flattenQueryParams('ids', req.ids, params);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: BatchGetListingsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      flattenQueryParams('ids', req.ids, params);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: BatchGetProvidersResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.listingId === undefined) {
      throw new Error('path parameter "listing_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings/${encodePathVariable(req.listingId)}/personalization-requests`;
    const body = marshalRequest(req, marshalCreatePersonalizationRequestSchema);
    let resp: CreatePersonalizationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.listingId === undefined) {
      throw new Error('path parameter "listing_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings/${encodePathVariable(req.listingId)}/installations`;
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.listingId === undefined) {
      throw new Error('path parameter "listing_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings/${encodePathVariable(req.listingId)}/content`;
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.listingId === undefined) {
      throw new Error('path parameter "listing_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings/${encodePathVariable(req.listingId)}/personalization-requests`;
    let resp: GetPersonalizationRequestsForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings/${encodePathVariable(req.id)}`;
    let resp: GetPublishedListingForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/providers/${encodePathVariable(req.id)}`;
    let resp: GetPublishedProviderForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.listingId === undefined) {
      throw new Error('path parameter "listing_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings/${encodePathVariable(req.listingId)}/installations`;
    const body = marshalRequest(req, marshalCreateInstallationRequestSchema);
    let resp: CreateInstallationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    const url = `${host}/api/2.1/marketplace-consumer/installations`;
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.listingId === undefined) {
      throw new Error('path parameter "listing_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings/${encodePathVariable(req.listingId)}/fulfillments`;
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    const url = `${host}/api/2.1/marketplace-consumer/personalization-requests`;
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    const url = `${host}/api/2.1/marketplace-consumer/listings`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.assets !== undefined) {
      flattenQueryParams('assets', req.assets, params);
    }
    if (req.categories !== undefined) {
      flattenQueryParams('categories', req.categories, params);
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
      flattenQueryParams('provider_ids', req.providerIds, params);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPublishedListingsForConsumerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    const url = `${host}/api/2.1/marketplace-consumer/providers`;
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    const url = `${host}/api/2.1/marketplace-consumer/search-listings`;
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
      flattenQueryParams('provider_ids', req.providerIds, params);
    }
    if (req.categories !== undefined) {
      flattenQueryParams('categories', req.categories, params);
    }
    if (req.assets !== undefined) {
      flattenQueryParams('assets', req.assets, params);
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.listingId === undefined) {
      throw new Error('path parameter "listing_id" is required');
    }
    if (req.installationId === undefined) {
      throw new Error('path parameter "installation_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings/${encodePathVariable(req.listingId)}/installations/${encodePathVariable(req.installationId)}`;
    let resp: DeleteInstallationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.listingId === undefined) {
      throw new Error('path parameter "listing_id" is required');
    }
    if (req.installationId === undefined) {
      throw new Error('path parameter "installation_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/marketplace-consumer/listings/${encodePathVariable(req.listingId)}/installations/${encodePathVariable(req.installationId)}`;
    const body = marshalRequest(req, marshalUpdateInstallationRequestSchema);
    let resp: UpdateInstallationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /**
   * Creates a file and returns a short-lived URL for uploading its content with an HTTP PUT request.
   * Only provider icons (PROVIDER_ICON files on a PROVIDER parent) and sample notebooks
   * (EMBEDDED_NOTEBOOK files on a LISTING parent) are supported.
   */
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /**
   * Creates a listing under one of the caller's provider profiles. The listing name, provider ID and
   * visibility are required, and the caller must have access to any share that the listing
   * references. Returns the ID of the new listing.
   */
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Creates a provider profile in the caller's account. Returns the ID of the new profile. */
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /**
   * Creates the Provider Analytics Dashboard in the caller's workspace from the latest template. Fails
   * if the dashboard already exists. Returns the Marketplace-specific `id` of the dashboard record,
   * which is distinct from the AI/BI dashboard ID.
   */
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges/${encodePathVariable(req.id)}`;
    let resp: DeleteExchangeResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/filters/${encodePathVariable(req.id)}`;
    let resp: DeleteExchangeFilterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Deletes a file. Fails if the file is still in use. */
  async deleteFile(
    req: DeleteFileRequest,
    options?: CallOptions
  ): Promise<DeleteFileResponse> {
    if (req.fileId === undefined) {
      throw new Error('path parameter "file_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/files/${encodePathVariable(req.fileId)}`;
    let resp: DeleteFileResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /**
   * Deletes a listing permanently. The underlying share is not deleted, and consumers who already have
   * access to the share keep that access until it is revoked in Delta Sharing.
   */
  async deleteListing(
    req: DeleteListingRequest,
    options?: CallOptions
  ): Promise<DeleteListingResponse> {
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listings/${encodePathVariable(req.id)}`;
    let resp: DeleteListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Deletes a provider profile and all of the listings that it owns. */
  async deleteProvider(
    req: DeleteProviderRequest,
    options?: CallOptions
  ): Promise<DeleteProviderResponse> {
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/providers/${encodePathVariable(req.id)}`;
    let resp: DeleteProviderResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges/${encodePathVariable(req.id)}`;
    let resp: GetExchangeResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Gets a file's metadata, including a short-lived download URL. */
  async getFile(
    req: GetFileRequest,
    options?: CallOptions
  ): Promise<GetFileResponse> {
    if (req.fileId === undefined) {
      throw new Error('path parameter "file_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/files/${encodePathVariable(req.fileId)}`;
    let resp: GetFileResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Gets the latest available version of the Provider Analytics Dashboard template. */
  async getLatestVersionProviderAnalyticsDashboard(
    _req: GetLatestVersionProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<GetLatestVersionProviderAnalyticsDashboardResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/analytics_dashboard/latest`;
    let resp: GetLatestVersionProviderAnalyticsDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Gets a listing owned by one of the caller's provider profiles. */
  async getListing(
    req: GetListingRequest,
    options?: CallOptions
  ): Promise<GetListingResponse> {
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listings/${encodePathVariable(req.id)}`;
    let resp: GetListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Gets a provider profile by ID. */
  async getProvider(
    req: GetProviderRequest,
    options?: CallOptions
  ): Promise<GetProviderResponse> {
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/providers/${encodePathVariable(req.id)}`;
    let resp: GetProviderResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Lists the files attached to a provider profile or a listing. */
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Lists the listings owned by the provider profiles in the caller's account. */
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /**
   * Gets the Provider Analytics Dashboard that was created for the caller's account. Returns an empty
   * response if the dashboard has not been created yet.
   */
  async listProviderAnalyticsDashboard(
    _req: ListProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<ListProviderAnalyticsDashboardResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/analytics_dashboard`;
    let resp: ListProviderAnalyticsDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Lists the provider profiles in the caller's account. */
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges-for-listing/${encodePathVariable(req.id)}`;
    let resp: RemoveExchangeForListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/exchanges/${encodePathVariable(req.id)}`;
    const body = marshalRequest(req, marshalUpdateExchangeRequestSchema);
    let resp: UpdateExchangeResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-exchange/filters/${encodePathVariable(req.id)}`;
    const body = marshalRequest(req, marshalUpdateExchangeFilterRequestSchema);
    let resp: UpdateExchangeFilterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /**
   * Updates a listing. Send the full listing definition; the listing type cannot be changed after the
   * listing is created, and changing the share re-links the listing to the new share.
   */
  async updateListing(
    req: UpdateListingRequest,
    options?: CallOptions
  ): Promise<UpdateListingResponse> {
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listings/${encodePathVariable(req.id)}`;
    const body = marshalRequest(req, marshalUpdateListingRequestSchema);
    let resp: UpdateListingResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /**
   * Updates the status of a personalization request; other properties of the request cannot be
   * changed. Fulfilling a request grants the consumer access to the share, and denying a fulfilled
   * request revokes that access. The listing must be published.
   */
  async updatePersonalizationRequestStatus(
    req: UpdatePersonalizationRequestStatusRequest,
    options?: CallOptions
  ): Promise<UpdatePersonalizationRequestStatusResponse> {
    if (req.listingId === undefined) {
      throw new Error('path parameter "listing_id" is required');
    }
    if (req.requestId === undefined) {
      throw new Error('path parameter "request_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/listings/${encodePathVariable(req.listingId)}/personalization-requests/${encodePathVariable(req.requestId)}/request-status`;
    const body = marshalRequest(
      req,
      marshalUpdatePersonalizationRequestStatusRequestSchema
    );
    let resp: UpdatePersonalizationRequestStatusResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /** Updates a provider profile. Send the full profile definition. */
  async updateProvider(
    req: UpdateProviderRequest,
    options?: CallOptions
  ): Promise<UpdateProviderResponse> {
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/providers/${encodePathVariable(req.id)}`;
    const body = marshalRequest(req, marshalUpdateProviderRequestSchema);
    let resp: UpdateProviderResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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

  /**
   * Updates the Provider Analytics Dashboard to a newer version of the template. The requested version
   * must be newer than the version that the dashboard currently uses.
   */
  async updateProviderAnalyticsDashboard(
    req: UpdateProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<UpdateProviderAnalyticsDashboardResponse> {
    if (req.id === undefined) {
      throw new Error('path parameter "id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/marketplace-provider/analytics_dashboard/${encodePathVariable(req.id)}`;
    const body = marshalRequest(
      req,
      marshalUpdateProviderAnalyticsDashboardRequestSchema
    );
    let resp: UpdateProviderAnalyticsDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
