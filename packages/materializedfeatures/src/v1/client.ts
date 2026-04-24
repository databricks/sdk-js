// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
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
import type {
  CreateFeatureTagRequest,
  DeleteFeatureTagRequest,
  FeatureLineage,
  FeatureTag,
  GetFeatureLineageRequest,
  GetFeatureTagRequest,
  ListFeatureTagsRequest,
  ListFeatureTagsResponse,
  UpdateFeatureTagRequest,
} from './model';
import {
  marshalFeatureTagSchema,
  unmarshalFeatureLineageSchema,
  unmarshalFeatureTagSchema,
  unmarshalListFeatureTagsResponseSchema,
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

  /** Creates a FeatureTag. */
  async createFeatureTag(
    signal: AbortSignal | undefined,
    req: CreateFeatureTagRequest,
    options?: Options
  ): Promise<FeatureTag> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/tags`;
    const body = marshalRequest(req.featureTag, marshalFeatureTagSchema);
    let resp: FeatureTag | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureTagSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a FeatureTag. */
  async deleteFeatureTag(
    signal: AbortSignal | undefined,
    req: DeleteFeatureTagRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/tags/${req.key ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Get Feature Lineage. */
  async getFeatureLineage(
    signal: AbortSignal | undefined,
    req: GetFeatureLineageRequest,
    options?: Options
  ): Promise<FeatureLineage> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/lineage`;
    let resp: FeatureLineage | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureLineageSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a FeatureTag. */
  async getFeatureTag(
    signal: AbortSignal | undefined,
    req: GetFeatureTagRequest,
    options?: Options
  ): Promise<FeatureTag> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/tags/${req.key ?? ''}`;
    let resp: FeatureTag | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureTagSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists FeatureTags. */
  async listFeatureTags(
    signal: AbortSignal | undefined,
    req: ListFeatureTagsRequest,
    options?: Options
  ): Promise<ListFeatureTagsResponse> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/tags`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFeatureTagsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListFeatureTagsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listFeatureTagsIter(
    signal: AbortSignal | undefined,
    req: ListFeatureTagsRequest,
    options?: Options
  ): AsyncGenerator<FeatureTag> {
    const pageReq: ListFeatureTagsRequest = {...req};
    for (;;) {
      const resp = await this.listFeatureTags(signal, pageReq, options);
      for (const item of resp.featureTags ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates a FeatureTag. */
  async updateFeatureTag(
    signal: AbortSignal | undefined,
    req: UpdateFeatureTagRequest,
    options?: Options
  ): Promise<FeatureTag> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/tags/${req.featureTag?.key ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.featureTag, marshalFeatureTagSchema);
    let resp: FeatureTag | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureTagSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
