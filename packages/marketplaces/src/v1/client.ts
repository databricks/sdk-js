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
  CreateFileRequest,
  CreateFileRequest_Response,
  CreateListingRequest,
  CreateListingRequest_Response,
  CreateProviderAnalyticsDashboardRequest,
  CreateProviderAnalyticsDashboardRequest_Response,
  CreateProviderRequest,
  CreateProviderRequest_Response,
  DeleteExchangeFilterRequest,
  DeleteExchangeFilterResponse,
  DeleteExchangeRequest,
  DeleteExchangeResponse,
  DeleteFileRequest,
  DeleteFileRequest_Response,
  DeleteListingRequest,
  DeleteListingRequest_Response,
  DeleteProviderRequest,
  DeleteProviderRequest_Response,
  Exchange,
  ExchangeFilter,
  ExchangeListing,
  FileInfo,
  GetExchangeRequest,
  GetExchangeResponse,
  GetFileRequest,
  GetFileRequest_Response,
  GetLatestVersionProviderAnalyticsDashboardRequest,
  GetLatestVersionProviderAnalyticsDashboardRequest_Response,
  GetListingRequest,
  GetListingRequest_Response,
  GetListingsRequest,
  GetListingsRequest_Response,
  GetPersonalizationRequestsForProviderRequest,
  GetPersonalizationRequestsForProviderRequest_Response,
  GetProviderRequest,
  GetProviderRequest_Response,
  ListExchangeFiltersRequest,
  ListExchangeFiltersResponse,
  ListExchangesForListingRequest,
  ListExchangesForListingResponse,
  ListExchangesRequest,
  ListExchangesResponse,
  ListFilesRequest,
  ListFilesRequest_Response,
  ListListingsForExchangeRequest,
  ListListingsForExchangeResponse,
  ListProviderAnalyticsDashboardRequest,
  ListProviderAnalyticsDashboardRequest_Response,
  ListProvidersRequest,
  ListProvidersRequest_Response,
  Listing,
  PersonalizationRequest,
  ProviderInfo,
  RemoveExchangeForListingRequest,
  RemoveExchangeForListingResponse,
  UpdateExchangeFilterRequest,
  UpdateExchangeFilterResponse,
  UpdateExchangeRequest,
  UpdateExchangeResponse,
  UpdateListingRequest,
  UpdateListingRequest_Response,
  UpdatePersonalizationRequestStatusRequest,
  UpdatePersonalizationRequestStatusRequest_Response,
  UpdateProviderAnalyticsDashboardRequest,
  UpdateProviderAnalyticsDashboardRequest_Response,
  UpdateProviderRequest,
  UpdateProviderRequest_Response,
} from './model';
import {
  marshalAddExchangeForListingRequestSchema,
  marshalCreateExchangeFilterRequestSchema,
  marshalCreateExchangeRequestSchema,
  marshalCreateFileRequestSchema,
  marshalCreateListingRequestSchema,
  marshalCreateProviderAnalyticsDashboardRequestSchema,
  marshalCreateProviderRequestSchema,
  marshalFileParentSchema,
  marshalUpdateExchangeFilterRequestSchema,
  marshalUpdateExchangeRequestSchema,
  marshalUpdateListingRequestSchema,
  marshalUpdatePersonalizationRequestStatusRequestSchema,
  marshalUpdateProviderAnalyticsDashboardRequestSchema,
  marshalUpdateProviderRequestSchema,
  unmarshalAddExchangeForListingResponseSchema,
  unmarshalCreateExchangeFilterResponseSchema,
  unmarshalCreateExchangeResponseSchema,
  unmarshalCreateFileRequest_ResponseSchema,
  unmarshalCreateListingRequest_ResponseSchema,
  unmarshalCreateProviderAnalyticsDashboardRequest_ResponseSchema,
  unmarshalCreateProviderRequest_ResponseSchema,
  unmarshalDeleteExchangeFilterResponseSchema,
  unmarshalDeleteExchangeResponseSchema,
  unmarshalDeleteFileRequest_ResponseSchema,
  unmarshalDeleteListingRequest_ResponseSchema,
  unmarshalDeleteProviderRequest_ResponseSchema,
  unmarshalGetExchangeResponseSchema,
  unmarshalGetFileRequest_ResponseSchema,
  unmarshalGetLatestVersionProviderAnalyticsDashboardRequest_ResponseSchema,
  unmarshalGetListingRequest_ResponseSchema,
  unmarshalGetListingsRequest_ResponseSchema,
  unmarshalGetPersonalizationRequestsForProviderRequest_ResponseSchema,
  unmarshalGetProviderRequest_ResponseSchema,
  unmarshalListExchangeFiltersResponseSchema,
  unmarshalListExchangesForListingResponseSchema,
  unmarshalListExchangesResponseSchema,
  unmarshalListFilesRequest_ResponseSchema,
  unmarshalListListingsForExchangeResponseSchema,
  unmarshalListProviderAnalyticsDashboardRequest_ResponseSchema,
  unmarshalListProvidersRequest_ResponseSchema,
  unmarshalRemoveExchangeForListingResponseSchema,
  unmarshalUpdateExchangeFilterResponseSchema,
  unmarshalUpdateExchangeResponseSchema,
  unmarshalUpdateListingRequest_ResponseSchema,
  unmarshalUpdatePersonalizationRequestStatusRequest_ResponseSchema,
  unmarshalUpdateProviderAnalyticsDashboardRequest_ResponseSchema,
  unmarshalUpdateProviderRequest_ResponseSchema,
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
    req: CreateFileRequest,
    options?: CallOptions
  ): Promise<CreateFileRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/files`;
    const body = marshalRequest(req, marshalCreateFileRequestSchema);
    let resp: CreateFileRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateFileRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a new listing */
  async createListing(
    req: CreateListingRequest,
    options?: CallOptions
  ): Promise<CreateListingRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/listing`;
    const body = marshalRequest(req, marshalCreateListingRequestSchema);
    let resp: CreateListingRequest_Response | undefined;
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
        unmarshalCreateListingRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a provider */
  async createProvider(
    req: CreateProviderRequest,
    options?: CallOptions
  ): Promise<CreateProviderRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/provider`;
    const body = marshalRequest(req, marshalCreateProviderRequestSchema);
    let resp: CreateProviderRequest_Response | undefined;
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
        unmarshalCreateProviderRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create provider analytics dashboard. Returns Marketplace specific `id`. Not to be confused with the Lakeview dashboard id. */
  async createProviderAnalyticsDashboard(
    req: CreateProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<CreateProviderAnalyticsDashboardRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/analytics_dashboard`;
    const body = marshalRequest(
      req,
      marshalCreateProviderAnalyticsDashboardRequestSchema
    );
    let resp: CreateProviderAnalyticsDashboardRequest_Response | undefined;
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
        unmarshalCreateProviderAnalyticsDashboardRequest_ResponseSchema
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
    req: DeleteFileRequest,
    options?: CallOptions
  ): Promise<DeleteFileRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/files/${req.fileId ?? ''}`;
    let resp: DeleteFileRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteFileRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a listing */
  async deleteListing(
    req: DeleteListingRequest,
    options?: CallOptions
  ): Promise<DeleteListingRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/listings/${req.id ?? ''}`;
    let resp: DeleteListingRequest_Response | undefined;
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
        unmarshalDeleteListingRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete provider */
  async deleteProvider(
    req: DeleteProviderRequest,
    options?: CallOptions
  ): Promise<DeleteProviderRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/providers/${req.id ?? ''}`;
    let resp: DeleteProviderRequest_Response | undefined;
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
        unmarshalDeleteProviderRequest_ResponseSchema
      );
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
    req: GetFileRequest,
    options?: CallOptions
  ): Promise<GetFileRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/files/${req.fileId ?? ''}`;
    let resp: GetFileRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetFileRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get latest version of provider analytics dashboard. */
  async getLatestVersionProviderAnalyticsDashboard(
    _req: GetLatestVersionProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<GetLatestVersionProviderAnalyticsDashboardRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/analytics_dashboard/latest`;
    let resp:
      | GetLatestVersionProviderAnalyticsDashboardRequest_Response
      | undefined;
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
        unmarshalGetLatestVersionProviderAnalyticsDashboardRequest_ResponseSchema
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
    req: GetListingRequest,
    options?: CallOptions
  ): Promise<GetListingRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/listings/${req.id ?? ''}`;
    let resp: GetListingRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetListingRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List listings owned by this provider */
  async getListings(
    req: GetListingsRequest,
    options?: CallOptions
  ): Promise<GetListingsRequest_Response> {
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
    let resp: GetListingsRequest_Response | undefined;
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
        unmarshalGetListingsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *getListingsIter(
    req: GetListingsRequest,
    options?: CallOptions
  ): AsyncGenerator<Listing> {
    const pageReq: GetListingsRequest = {...req};
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
    req: GetPersonalizationRequestsForProviderRequest,
    options?: CallOptions
  ): Promise<GetPersonalizationRequestsForProviderRequest_Response> {
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
    let resp: GetPersonalizationRequestsForProviderRequest_Response | undefined;
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
        unmarshalGetPersonalizationRequestsForProviderRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<GetProviderRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/providers/${req.id ?? ''}`;
    let resp: GetProviderRequest_Response | undefined;
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
        unmarshalGetProviderRequest_ResponseSchema
      );
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
    req: ListFilesRequest,
    options?: CallOptions
  ): Promise<ListFilesRequest_Response> {
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
    let resp: ListFilesRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListFilesRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    _req: ListProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<ListProviderAnalyticsDashboardRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/analytics_dashboard`;
    let resp: ListProviderAnalyticsDashboardRequest_Response | undefined;
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
        unmarshalListProviderAnalyticsDashboardRequest_ResponseSchema
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
    req: ListProvidersRequest,
    options?: CallOptions
  ): Promise<ListProvidersRequest_Response> {
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
    let resp: ListProvidersRequest_Response | undefined;
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
        unmarshalListProvidersRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: UpdateListingRequest,
    options?: CallOptions
  ): Promise<UpdateListingRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/listings/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateListingRequestSchema);
    let resp: UpdateListingRequest_Response | undefined;
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
        unmarshalUpdateListingRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update personalization request. This method only permits updating the status of the request. */
  async updatePersonalizationRequestStatus(
    req: UpdatePersonalizationRequestStatusRequest,
    options?: CallOptions
  ): Promise<UpdatePersonalizationRequestStatusRequest_Response> {
    const url = `${this.host}/api/marketplace-provider/listings/${req.listingId ?? ''}/personalization-requests/${req.requestId ?? ''}/request-status`;
    const body = marshalRequest(
      req,
      marshalUpdatePersonalizationRequestStatusRequestSchema
    );
    let resp: UpdatePersonalizationRequestStatusRequest_Response | undefined;
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
        unmarshalUpdatePersonalizationRequestStatusRequest_ResponseSchema
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
    req: UpdateProviderRequest,
    options?: CallOptions
  ): Promise<UpdateProviderRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/providers/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateProviderRequestSchema);
    let resp: UpdateProviderRequest_Response | undefined;
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
        unmarshalUpdateProviderRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update provider analytics dashboard. */
  async updateProviderAnalyticsDashboard(
    req: UpdateProviderAnalyticsDashboardRequest,
    options?: CallOptions
  ): Promise<UpdateProviderAnalyticsDashboardRequest_Response> {
    const url = `${this.host}/api/2.0/marketplace-provider/analytics_dashboard/${req.id ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateProviderAnalyticsDashboardRequestSchema
    );
    let resp: UpdateProviderAnalyticsDashboardRequest_Response | undefined;
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
        unmarshalUpdateProviderAnalyticsDashboardRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
