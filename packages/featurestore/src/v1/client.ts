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
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateOnlineStoreRequest,
  DeleteOnlineStoreRequest,
  DeleteOnlineTableRequest,
  GetOnlineStoreRequest,
  ListOnlineStoresRequest,
  ListOnlineStoresResponse,
  OnlineStore,
  PublishTableRequest,
  PublishTableResponse,
  UpdateOnlineStoreRequest,
} from './model';
import {
  marshalOnlineStoreSchema,
  marshalPublishTableRequestSchema,
  unmarshalListOnlineStoresResponseSchema,
  unmarshalOnlineStoreSchema,
  unmarshalPublishTableResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class FeatureStoreClient {
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

  /** Create an Online Feature Store. */
  async createOnlineStore(
    req: CreateOnlineStoreRequest,
    options?: CallOptions
  ): Promise<OnlineStore> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/feature-store/online-stores`;
    const body =
      req.onlineStore === undefined
        ? 'null'
        : marshalRequest(req.onlineStore, marshalOnlineStoreSchema);
    let resp: OnlineStore | undefined;
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
      resp = parseResponse(respBody, unmarshalOnlineStoreSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete an Online Feature Store. */
  async deleteOnlineStore(
    req: DeleteOnlineStoreRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/feature-store/online-stores/${encodePathVariable(req.name)}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Delete online table. */
  async deleteOnlineTable(
    req: DeleteOnlineTableRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.onlineTableName === undefined) {
      throw new Error('path parameter "online_table_name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/feature-store/online-tables/${encodePathVariable(req.onlineTableName)}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Get an Online Feature Store. */
  async getOnlineStore(
    req: GetOnlineStoreRequest,
    options?: CallOptions
  ): Promise<OnlineStore> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/feature-store/online-stores/${encodePathVariable(req.name)}`;
    let resp: OnlineStore | undefined;
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
      resp = parseResponse(respBody, unmarshalOnlineStoreSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List Online Feature Stores. */
  async listOnlineStores(
    req: ListOnlineStoresRequest,
    options?: CallOptions
  ): Promise<ListOnlineStoresResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/feature-store/online-stores`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListOnlineStoresResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListOnlineStoresResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listOnlineStoresIter(
    req: ListOnlineStoresRequest,
    options?: CallOptions
  ): AsyncGenerator<OnlineStore> {
    const pageReq: ListOnlineStoresRequest = {...req};
    for (;;) {
      const resp = await this.listOnlineStores(pageReq, options);
      for (const item of resp.onlineStores ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Publish features. */
  async publishTable(
    req: PublishTableRequest,
    options?: CallOptions
  ): Promise<PublishTableResponse> {
    if (req.sourceTableName === undefined) {
      throw new Error('path parameter "source_table_name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/feature-store/tables/${encodePathVariable(req.sourceTableName)}/publish`;
    const body = marshalRequest(req, marshalPublishTableRequestSchema);
    let resp: PublishTableResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalPublishTableResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Update an Online Feature Store.
   *
   * This update is not guaranteed to be atomic: when a request changes multiple fields, some may
   * be applied while others fail. On a failed response, treat the update as partially applied and
   * retry until it succeeds.
   */
  async updateOnlineStore(
    req: UpdateOnlineStoreRequest,
    options?: CallOptions
  ): Promise<OnlineStore> {
    if (req.onlineStore?.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/feature-store/online-stores/${encodePathVariable(req.onlineStore?.name)}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.onlineStore === undefined
        ? 'null'
        : marshalRequest(req.onlineStore, marshalOnlineStoreSchema);
    let resp: OnlineStore | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOnlineStoreSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
