// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
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

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    this.httpClient = newHttpClient(options);
  }

  /** Create an Online Feature Store. */
  async createOnlineStore(
    signal: AbortSignal | undefined,
    req: CreateOnlineStoreRequest,
    options?: Options
  ): Promise<OnlineStore> {
    const url = `${this.host}/api/2.0/feature-store/online-stores`;
    const body = marshalRequest(req.onlineStore, marshalOnlineStoreSchema);
    let resp: OnlineStore | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOnlineStoreSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete an Online Feature Store. */
  async deleteOnlineStore(
    signal: AbortSignal | undefined,
    req: DeleteOnlineStoreRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-store/online-stores/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Delete online table. */
  async deleteOnlineTable(
    signal: AbortSignal | undefined,
    req: DeleteOnlineTableRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-store/online-tables/${req.onlineTableName ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Get an Online Feature Store. */
  async getOnlineStore(
    signal: AbortSignal | undefined,
    req: GetOnlineStoreRequest,
    options?: Options
  ): Promise<OnlineStore> {
    const url = `${this.host}/api/2.0/feature-store/online-stores/${req.name ?? ''}`;
    let resp: OnlineStore | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOnlineStoreSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List Online Feature Stores. */
  async listOnlineStores(
    signal: AbortSignal | undefined,
    req: ListOnlineStoresRequest,
    options?: Options
  ): Promise<ListOnlineStoresResponse> {
    const url = `${this.host}/api/2.0/feature-store/online-stores`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListOnlineStoresResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listOnlineStoresIter(
    signal: AbortSignal | undefined,
    req: ListOnlineStoresRequest,
    options?: Options
  ): AsyncGenerator<OnlineStore> {
    const pageReq: ListOnlineStoresRequest = {...req};
    for (;;) {
      const resp = await this.listOnlineStores(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: PublishTableRequest,
    options?: Options
  ): Promise<PublishTableResponse> {
    const url = `${this.host}/api/2.0/feature-store/tables/${req.sourceTableName ?? ''}/publish`;
    const body = marshalRequest(req, marshalPublishTableRequestSchema);
    let resp: PublishTableResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPublishTableResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update an Online Feature Store. */
  async updateOnlineStore(
    signal: AbortSignal | undefined,
    req: UpdateOnlineStoreRequest,
    options?: Options
  ): Promise<OnlineStore> {
    const url = `${this.host}/api/2.0/feature-store/online-stores/${req.onlineStore?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.onlineStore, marshalOnlineStoreSchema);
    let resp: OnlineStore | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOnlineStoreSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
