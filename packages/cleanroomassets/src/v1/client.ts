// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CleanRoomAsset,
  CreateCleanRoomAssetRequest,
  CreateCleanRoomAssetReviewRequest,
  CreateCleanRoomAssetReviewResponse,
  DeleteCleanRoomAssetRequest,
  DeleteCleanRoomAssetResponse,
  GetCleanRoomAssetRequest,
  GetCleanRoomAssetRevisionRequest,
  ListCleanRoomAssetRevisionsRequest,
  ListCleanRoomAssetRevisionsResponse,
  ListCleanRoomAssetsRequest,
  ListCleanRoomAssetsResponse,
  UpdateCleanRoomAssetRequest,
} from './model';
import {
  marshalCleanRoomAssetSchema,
  marshalCreateCleanRoomAssetReviewRequestSchema,
  unmarshalCleanRoomAssetSchema,
  unmarshalCreateCleanRoomAssetReviewResponseSchema,
  unmarshalDeleteCleanRoomAssetResponseSchema,
  unmarshalListCleanRoomAssetRevisionsResponseSchema,
  unmarshalListCleanRoomAssetsResponseSchema,
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
   * Create a clean room asset —share an asset like a notebook or table into the clean room.
   * For each UC asset that is added through this method, the clean room owner must also have
   * enough privilege on the asset to consume it.
   * The privilege must be maintained indefinitely for the clean room to be able to access the asset.
   * Typically, you should use a group as the clean room owner.
   */
  async createCleanRoomAsset(
    signal: AbortSignal | undefined,
    req: CreateCleanRoomAssetRequest,
    options?: Options
  ): Promise<CleanRoomAsset> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.asset?.cleanRoomName ?? ''}/assets`;
    const body = marshalRequest(req.asset, marshalCleanRoomAssetSchema);
    let resp: CleanRoomAsset | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAssetSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Submit an asset review */
  async createCleanRoomAssetReview(
    signal: AbortSignal | undefined,
    req: CreateCleanRoomAssetReviewRequest,
    options?: Options
  ): Promise<CreateCleanRoomAssetReviewResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}/reviews`;
    const body = marshalRequest(
      req,
      marshalCreateCleanRoomAssetReviewRequestSchema
    );
    let resp: CreateCleanRoomAssetReviewResponse | undefined;
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
        unmarshalCreateCleanRoomAssetReviewResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a clean room asset - unshare/remove the asset from the clean room */
  async deleteCleanRoomAsset(
    signal: AbortSignal | undefined,
    req: DeleteCleanRoomAssetRequest,
    options?: Options
  ): Promise<DeleteCleanRoomAssetResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}`;
    let resp: DeleteCleanRoomAssetResponse | undefined;
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
        unmarshalDeleteCleanRoomAssetResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the details of a clean room asset by its type and full name. */
  async getCleanRoomAsset(
    signal: AbortSignal | undefined,
    req: GetCleanRoomAssetRequest,
    options?: Options
  ): Promise<CleanRoomAsset> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}`;
    let resp: CleanRoomAsset | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAssetSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a specific revision of an asset */
  async getCleanRoomAssetRevision(
    signal: AbortSignal | undefined,
    req: GetCleanRoomAssetRevisionRequest,
    options?: Options
  ): Promise<CleanRoomAsset> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}/revisions/${req.etag ?? ''}`;
    let resp: CleanRoomAsset | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAssetSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List revisions for an asset */
  async listCleanRoomAssetRevisions(
    signal: AbortSignal | undefined,
    req: ListCleanRoomAssetRevisionsRequest,
    options?: Options
  ): Promise<ListCleanRoomAssetRevisionsResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}/revisions`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCleanRoomAssetRevisionsResponse | undefined;
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
        unmarshalListCleanRoomAssetRevisionsResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCleanRoomAssetRevisionsIter(
    signal: AbortSignal | undefined,
    req: ListCleanRoomAssetRevisionsRequest,
    options?: Options
  ): AsyncGenerator<CleanRoomAsset> {
    const pageReq: ListCleanRoomAssetRevisionsRequest = {...req};
    for (;;) {
      const resp = await this.listCleanRoomAssetRevisions(
        signal,
        pageReq,
        options
      );
      for (const item of resp.revisions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List assets. */
  async listCleanRoomAssets(
    signal: AbortSignal | undefined,
    req: ListCleanRoomAssetsRequest,
    options?: Options
  ): Promise<ListCleanRoomAssetsResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCleanRoomAssetsResponse | undefined;
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
        unmarshalListCleanRoomAssetsResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCleanRoomAssetsIter(
    signal: AbortSignal | undefined,
    req: ListCleanRoomAssetsRequest,
    options?: Options
  ): AsyncGenerator<CleanRoomAsset> {
    const pageReq: ListCleanRoomAssetsRequest = {...req};
    for (;;) {
      const resp = await this.listCleanRoomAssets(signal, pageReq, options);
      for (const item of resp.assets ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Update a clean room asset. For example, updating the content of a notebook;
   * changing the shared partitions of a table; etc.
   */
  async updateCleanRoomAsset(
    signal: AbortSignal | undefined,
    req: UpdateCleanRoomAssetRequest,
    options?: Options
  ): Promise<CleanRoomAsset> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.asset?.assetType ?? ''}/${req.asset?.name ?? ''}`;
    const body = marshalRequest(req.asset, marshalCleanRoomAssetSchema);
    let resp: CleanRoomAsset | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAssetSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
