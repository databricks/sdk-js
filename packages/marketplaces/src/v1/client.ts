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
  flattenQueryParams,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  AddExchangeForListingRequest,
  AddExchangeForListingResponse,
  CreateExchangeFilterRequest,
  CreateExchangeFilterResponse,
  CreateExchangeRequest,
  CreateExchangeResponse,
  CreateFile,
  CreateFile_Response,
  CreateListing,
  CreateListing_Response,
  CreateProvider,
  CreateProviderAnalyticsDashboard,
  CreateProviderAnalyticsDashboard_Response,
  CreateProvider_Response,
  DeleteExchangeFilterRequest,
  DeleteExchangeFilterResponse,
  DeleteExchangeRequest,
  DeleteExchangeResponse,
  DeleteFile,
  DeleteFile_Response,
  DeleteListing,
  DeleteListing_Response,
  DeleteProvider,
  DeleteProvider_Response,
  Exchange,
  ExchangeFilter,
  ExchangeListing,
  FileInfo,
  GetExchangeRequest,
  GetExchangeResponse,
  GetFile,
  GetFile_Response,
  GetLatestVersionProviderAnalyticsDashboard,
  GetLatestVersionProviderAnalyticsDashboard_Response,
  GetListing,
  GetListing_Response,
  GetListings,
  GetListings_Response,
  GetPersonalizationRequestsForProvider,
  GetPersonalizationRequestsForProvider_Response,
  GetProvider,
  GetProvider_Response,
  ListExchangeFiltersRequest,
  ListExchangeFiltersResponse,
  ListExchangesForListingRequest,
  ListExchangesForListingResponse,
  ListExchangesRequest,
  ListExchangesResponse,
  ListFiles,
  ListFiles_Response,
  ListListingsForExchangeRequest,
  ListListingsForExchangeResponse,
  ListProviderAnalyticsDashboard,
  ListProviderAnalyticsDashboard_Response,
  ListProviders,
  ListProviders_Response,
  Listing,
  PersonalizationRequest,
  ProviderInfo,
  RemoveExchangeForListingRequest,
  RemoveExchangeForListingResponse,
  UpdateExchangeFilterRequest,
  UpdateExchangeFilterResponse,
  UpdateExchangeRequest,
  UpdateExchangeResponse,
  UpdateListing,
  UpdateListing_Response,
  UpdatePersonalizationRequestStatus,
  UpdatePersonalizationRequestStatus_Response,
  UpdateProvider,
  UpdateProviderAnalyticsDashboard,
  UpdateProviderAnalyticsDashboard_Response,
  UpdateProvider_Response,
} from './model';
import {
  marshalAddExchangeForListingRequestSchema,
  marshalCreateExchangeFilterRequestSchema,
  marshalCreateExchangeRequestSchema,
  marshalCreateFileSchema,
  marshalCreateListingSchema,
  marshalCreateProviderAnalyticsDashboardSchema,
  marshalCreateProviderSchema,
  marshalFileParentSchema,
  marshalUpdateExchangeFilterRequestSchema,
  marshalUpdateExchangeRequestSchema,
  marshalUpdateListingSchema,
  marshalUpdatePersonalizationRequestStatusSchema,
  marshalUpdateProviderAnalyticsDashboardSchema,
  marshalUpdateProviderSchema,
  unmarshalAddExchangeForListingResponseSchema,
  unmarshalCreateExchangeFilterResponseSchema,
  unmarshalCreateExchangeResponseSchema,
  unmarshalCreateFile_ResponseSchema,
  unmarshalCreateListing_ResponseSchema,
  unmarshalCreateProviderAnalyticsDashboard_ResponseSchema,
  unmarshalCreateProvider_ResponseSchema,
  unmarshalDeleteExchangeFilterResponseSchema,
  unmarshalDeleteExchangeResponseSchema,
  unmarshalDeleteFile_ResponseSchema,
  unmarshalDeleteListing_ResponseSchema,
  unmarshalDeleteProvider_ResponseSchema,
  unmarshalGetExchangeResponseSchema,
  unmarshalGetFile_ResponseSchema,
  unmarshalGetLatestVersionProviderAnalyticsDashboard_ResponseSchema,
  unmarshalGetListing_ResponseSchema,
  unmarshalGetListings_ResponseSchema,
  unmarshalGetPersonalizationRequestsForProvider_ResponseSchema,
  unmarshalGetProvider_ResponseSchema,
  unmarshalListExchangeFiltersResponseSchema,
  unmarshalListExchangesForListingResponseSchema,
  unmarshalListExchangesResponseSchema,
  unmarshalListFiles_ResponseSchema,
  unmarshalListListingsForExchangeResponseSchema,
  unmarshalListProviderAnalyticsDashboard_ResponseSchema,
  unmarshalListProviders_ResponseSchema,
  unmarshalRemoveExchangeForListingResponseSchema,
  unmarshalUpdateExchangeFilterResponseSchema,
  unmarshalUpdateExchangeResponseSchema,
  unmarshalUpdateListing_ResponseSchema,
  unmarshalUpdatePersonalizationRequestStatus_ResponseSchema,
  unmarshalUpdateProviderAnalyticsDashboard_ResponseSchema,
  unmarshalUpdateProvider_ResponseSchema,
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

  /** Associate an exchange with a listing */
  async addExchangeForListing(
    req: AddExchangeForListingRequest,
    options?: CallOptions
  ): Promise<AddExchangeForListingResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/exchanges-for-listing`;
    const body = marshalRequest(req, marshalAddExchangeForListingRequestSchema);
    let resp: AddExchangeForListingResponse | undefined;
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
        unmarshalAddExchangeForListingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create an exchange */
  async createExchange(
    req: CreateExchangeRequest,
    options?: CallOptions
  ): Promise<CreateExchangeResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/exchanges`;
    const body = marshalRequest(req, marshalCreateExchangeRequestSchema);
    let resp: CreateExchangeResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateExchangeResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Add an exchange filter. */
  async createExchangeFilter(
    req: CreateExchangeFilterRequest,
    options?: CallOptions
  ): Promise<CreateExchangeFilterResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/filters`;
    const body = marshalRequest(req, marshalCreateExchangeFilterRequestSchema);
    let resp: CreateExchangeFilterResponse | undefined;
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
        unmarshalCreateExchangeFilterResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a file. Currently, only provider icons and attached notebooks are supported. */
  async createFile(
    req: CreateFile,
    options?: CallOptions
  ): Promise<CreateFile_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/files`;
    const body = marshalRequest(req, marshalCreateFileSchema);
    let resp: CreateFile_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateFile_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a new listing */
  async createListing(
    req: CreateListing,
    options?: CallOptions
  ): Promise<CreateListing_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/listing`;
    const body = marshalRequest(req, marshalCreateListingSchema);
    let resp: CreateListing_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateListing_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a provider */
  async createProvider(
    req: CreateProvider,
    options?: CallOptions
  ): Promise<CreateProvider_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/provider`;
    const body = marshalRequest(req, marshalCreateProviderSchema);
    let resp: CreateProvider_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateProvider_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create provider analytics dashboard. Returns Marketplace specific `id`. Not to be confused with the Lakeview dashboard id. */
  async createProviderAnalyticsDashboard(
    req: CreateProviderAnalyticsDashboard,
    options?: CallOptions
  ): Promise<CreateProviderAnalyticsDashboard_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/analytics_dashboard`;
    const body = marshalRequest(
      req,
      marshalCreateProviderAnalyticsDashboardSchema
    );
    let resp: CreateProviderAnalyticsDashboard_Response | undefined;
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
        unmarshalCreateProviderAnalyticsDashboard_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** This removes a listing from marketplace. */
  async deleteExchange(
    req: DeleteExchangeRequest,
    options?: CallOptions
  ): Promise<DeleteExchangeResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/exchanges/${req.id ?? ''}`;
    let resp: DeleteExchangeResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteExchangeResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete an exchange filter */
  async deleteExchangeFilter(
    req: DeleteExchangeFilterRequest,
    options?: CallOptions
  ): Promise<DeleteExchangeFilterResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/filters/${req.id ?? ''}`;
    let resp: DeleteExchangeFilterResponse | undefined;
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
        unmarshalDeleteExchangeFilterResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a file */
  async deleteFile(
    req: DeleteFile,
    options?: CallOptions
  ): Promise<DeleteFile_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/files/${req.fileId ?? ''}`;
    let resp: DeleteFile_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteFile_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a listing */
  async deleteListing(
    req: DeleteListing,
    options?: CallOptions
  ): Promise<DeleteListing_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/listings/${req.id ?? ''}`;
    let resp: DeleteListing_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteListing_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete provider */
  async deleteProvider(
    req: DeleteProvider,
    options?: CallOptions
  ): Promise<DeleteProvider_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/providers/${req.id ?? ''}`;
    let resp: DeleteProvider_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteProvider_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get an exchange. */
  async getExchange(
    req: GetExchangeRequest,
    options?: CallOptions
  ): Promise<GetExchangeResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/exchanges/${req.id ?? ''}`;
    let resp: GetExchangeResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetExchangeResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a file */
  async getFile(
    req: GetFile,
    options?: CallOptions
  ): Promise<GetFile_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/files/${req.fileId ?? ''}`;
    let resp: GetFile_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetFile_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get latest version of provider analytics dashboard. */
  async getLatestVersionProviderAnalyticsDashboard(
    _req: GetLatestVersionProviderAnalyticsDashboard,
    options?: CallOptions
  ): Promise<GetLatestVersionProviderAnalyticsDashboard_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/analytics_dashboard/latest`;
    let resp: GetLatestVersionProviderAnalyticsDashboard_Response | undefined;
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
        unmarshalGetLatestVersionProviderAnalyticsDashboard_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a listing */
  async getListing(
    req: GetListing,
    options?: CallOptions
  ): Promise<GetListing_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/listings/${req.id ?? ''}`;
    let resp: GetListing_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetListing_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List listings owned by this provider */
  async getListings(
    req: GetListings,
    options?: CallOptions
  ): Promise<GetListings_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/listings`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetListings_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetListings_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *getListingsIter(
    req: GetListings,
    options?: CallOptions
  ): AsyncGenerator<Listing> {
    const pageReq: GetListings = {...req};
    for (;;) {
      const resp = await this.getListings(pageReq, options);
      for (const item of resp.listings ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * List personalization requests to this provider.
   * This will return all personalization requests, regardless of which listing they are for.
   */
  async getPersonalizationRequestsForProvider(
    req: GetPersonalizationRequestsForProvider,
    options?: CallOptions
  ): Promise<GetPersonalizationRequestsForProvider_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/personalization-requests`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPersonalizationRequestsForProvider_Response | undefined;
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
        unmarshalGetPersonalizationRequestsForProvider_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *getPersonalizationRequestsForProviderIter(
    req: GetPersonalizationRequestsForProvider,
    options?: CallOptions
  ): AsyncGenerator<PersonalizationRequest> {
    const pageReq: GetPersonalizationRequestsForProvider = {...req};
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
    req: GetProvider,
    options?: CallOptions
  ): Promise<GetProvider_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/providers/${req.id ?? ''}`;
    let resp: GetProvider_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetProvider_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List exchange filter */
  async listExchangeFilters(
    req: ListExchangeFiltersRequest,
    options?: CallOptions
  ): Promise<ListExchangeFiltersResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/filters`;
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
        unmarshalListExchangeFiltersResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    const url = `${this.host}/api/2.0/marketplace-exchange/exchanges`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListExchangesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    const url = `${this.host}/api/2.0/marketplace-exchange/exchanges-for-listing`;
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
        unmarshalListExchangesForListingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: ListFiles,
    options?: CallOptions
  ): Promise<ListFiles_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/files`;
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
    let resp: ListFiles_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListFiles_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listFilesIter(
    req: ListFiles,
    options?: CallOptions
  ): AsyncGenerator<FileInfo> {
    const pageReq: ListFiles = {...req};
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

  /** List listings associated with an exchange */
  async listListingsForExchange(
    req: ListListingsForExchangeRequest,
    options?: CallOptions
  ): Promise<ListListingsForExchangeResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/listings-for-exchange`;
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
        unmarshalListListingsForExchangeResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    _req: ListProviderAnalyticsDashboard,
    options?: CallOptions
  ): Promise<ListProviderAnalyticsDashboard_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/analytics_dashboard`;
    let resp: ListProviderAnalyticsDashboard_Response | undefined;
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
        unmarshalListProviderAnalyticsDashboard_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List provider profiles for account. */
  async listProviders(
    req: ListProviders,
    options?: CallOptions
  ): Promise<ListProviders_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/providers`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListProviders_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListProviders_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listProvidersIter(
    req: ListProviders,
    options?: CallOptions
  ): AsyncGenerator<ProviderInfo> {
    const pageReq: ListProviders = {...req};
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
    const url = `${this.host}/api/2.0/marketplace-exchange/exchanges-for-listing/${req.id ?? ''}`;
    let resp: RemoveExchangeForListingResponse | undefined;
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
        unmarshalRemoveExchangeForListingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update an exchange */
  async updateExchange(
    req: UpdateExchangeRequest,
    options?: CallOptions
  ): Promise<UpdateExchangeResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/exchanges/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateExchangeRequestSchema);
    let resp: UpdateExchangeResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateExchangeResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update an exchange filter. */
  async updateExchangeFilter(
    req: UpdateExchangeFilterRequest,
    options?: CallOptions
  ): Promise<UpdateExchangeFilterResponse> {
    const url = `${this.host}/api/2.0/marketplace-exchange/filters/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateExchangeFilterRequestSchema);
    let resp: UpdateExchangeFilterResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateExchangeFilterResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a listing */
  async updateListing(
    req: UpdateListing,
    options?: CallOptions
  ): Promise<UpdateListing_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/listings/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateListingSchema);
    let resp: UpdateListing_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateListing_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update personalization request. This method only permits updating the status of the request. */
  async updatePersonalizationRequestStatus(
    req: UpdatePersonalizationRequestStatus,
    options?: CallOptions
  ): Promise<UpdatePersonalizationRequestStatus_Response> {
    const url = `${this.host}/api/marketplace-provider/listings/${req.listingId ?? ''}/personalization-requests/${req.requestId ?? ''}/request-status`;
    const body = marshalRequest(
      req,
      marshalUpdatePersonalizationRequestStatusSchema
    );
    let resp: UpdatePersonalizationRequestStatus_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdatePersonalizationRequestStatus_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update provider profile */
  async updateProvider(
    req: UpdateProvider,
    options?: CallOptions
  ): Promise<UpdateProvider_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/providers/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateProviderSchema);
    let resp: UpdateProvider_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateProvider_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update provider analytics dashboard. */
  async updateProviderAnalyticsDashboard(
    req: UpdateProviderAnalyticsDashboard,
    options?: CallOptions
  ): Promise<UpdateProviderAnalyticsDashboard_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/analytics_dashboard/${req.id ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateProviderAnalyticsDashboardSchema
    );
    let resp: UpdateProviderAnalyticsDashboard_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateProviderAnalyticsDashboard_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
