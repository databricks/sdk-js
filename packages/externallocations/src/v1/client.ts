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
  CreateExternalLocation,
  DeleteExternalLocation,
  DeleteExternalLocation_Response,
  ExternalLocationInfo,
  GetExternalLocation,
  ListExternalLocations,
  ListExternalLocations_Response,
  UpdateExternalLocation,
} from './model';
import {
  marshalCreateExternalLocationSchema,
  marshalUpdateExternalLocationSchema,
  unmarshalDeleteExternalLocation_ResponseSchema,
  unmarshalExternalLocationInfoSchema,
  unmarshalListExternalLocations_ResponseSchema,
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

  /**
   * Creates a new external location entry in the metastore.
   * The caller must be a metastore admin or have the **CREATE_EXTERNAL_LOCATION** privilege on both the metastore and the associated storage credential.
   */
  async createExternalLocation(
    signal: AbortSignal | undefined,
    req: CreateExternalLocation,
    options?: CallOptions
  ): Promise<ExternalLocationInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/external-locations`;
    const body = marshalRequest(req, marshalCreateExternalLocationSchema);
    let resp: ExternalLocationInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalExternalLocationInfoSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified external location from the metastore. The caller must be the owner of the external location. */
  async deleteExternalLocation(
    signal: AbortSignal | undefined,
    req: DeleteExternalLocation,
    options?: CallOptions
  ): Promise<DeleteExternalLocation_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/external-locations/${req.nameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteExternalLocation_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteExternalLocation_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an external location from the metastore.
   * The caller must be either a metastore admin, the owner of the external location, or a user that has some privilege on the external location.
   */
  async getExternalLocation(
    signal: AbortSignal | undefined,
    req: GetExternalLocation,
    options?: CallOptions
  ): Promise<ExternalLocationInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/external-locations/${req.nameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ExternalLocationInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalExternalLocationInfoSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of external locations (__ExternalLocationInfo__ objects) from the metastore.
   * The caller must be a metastore admin, the owner of the external location, or a user that has some privilege on the external location.
   * There is no guarantee of a specific ordering of the elements in the array.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listExternalLocations(
    signal: AbortSignal | undefined,
    req: ListExternalLocations,
    options?: CallOptions
  ): Promise<ListExternalLocations_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/external-locations`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeUnbound !== undefined) {
      params.append('include_unbound', String(req.includeUnbound));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListExternalLocations_Response | undefined;
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
        unmarshalListExternalLocations_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listExternalLocationsIter(
    signal: AbortSignal | undefined,
    req: ListExternalLocations,
    options?: CallOptions
  ): AsyncGenerator<ExternalLocationInfo> {
    const pageReq: ListExternalLocations = {...req};
    for (;;) {
      const resp = await this.listExternalLocations(signal, pageReq, options);
      for (const item of resp.externalLocations ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates an external location in the metastore. The caller must be the owner of the external location, or be a metastore admin.
   * In the second case, the admin can only update the name of the external location.
   */
  async updateExternalLocation(
    signal: AbortSignal | undefined,
    req: UpdateExternalLocation,
    options?: CallOptions
  ): Promise<ExternalLocationInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/external-locations/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateExternalLocationSchema);
    let resp: ExternalLocationInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalExternalLocationInfoSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
