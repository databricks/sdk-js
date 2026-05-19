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
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
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

  /** Creates a FeatureTag. */
  async createFeatureTag(
    req: CreateFeatureTagRequest,
    options?: CallOptions
  ): Promise<FeatureTag> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/tags`;
    const body = marshalRequest(req.featureTag, marshalFeatureTagSchema);
    let resp: FeatureTag | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureTagSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a FeatureTag. */
  async deleteFeatureTag(
    req: DeleteFeatureTagRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/tags/${req.key ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Get Feature Lineage. */
  async getFeatureLineage(
    req: GetFeatureLineageRequest,
    options?: CallOptions
  ): Promise<FeatureLineage> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/lineage`;
    let resp: FeatureLineage | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureLineageSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a FeatureTag. */
  async getFeatureTag(
    req: GetFeatureTagRequest,
    options?: CallOptions
  ): Promise<FeatureTag> {
    const url = `${this.host}/api/2.0/feature-store/feature-tables/${req.tableName ?? ''}/features/${req.featureName ?? ''}/tags/${req.key ?? ''}`;
    let resp: FeatureTag | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureTagSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists FeatureTags. */
  async listFeatureTags(
    req: ListFeatureTagsRequest,
    options?: CallOptions
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
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListFeatureTagsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listFeatureTagsIter(
    req: ListFeatureTagsRequest,
    options?: CallOptions
  ): AsyncGenerator<FeatureTag> {
    const pageReq: ListFeatureTagsRequest = {...req};
    for (;;) {
      const resp = await this.listFeatureTags(pageReq, options);
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
    req: UpdateFeatureTagRequest,
    options?: CallOptions
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
      headers.set('User-Agent', this.userAgent);
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
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
