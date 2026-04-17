// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, parseResponse} from './utils';
import type {
  GetQuota,
  GetQuota_Response,
  ListQuotas,
  ListQuotas_Response,
  QuotaInfo,
} from './model';
import {
  unmarshalGetQuota_ResponseSchema,
  unmarshalListQuotas_ResponseSchema,
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

  /**
   * The GetQuota API returns usage information for a single resource quota, defined as a
   * child-parent pair. This API also refreshes the quota count if it is out of date.
   * Refreshes are triggered asynchronously. The updated count might not be returned in the first call.
   */
  async getQuota(signal: AbortSignal | undefined, req: GetQuota, options?: Options): Promise<GetQuota_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/resource-quotas/${req.parentSecurableType ?? ''}/${req.parentFullName ?? ''}/${req.quotaName ?? ''}`;
    let resp: GetQuota_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGetQuota_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * ListQuotas returns all quota values under the metastore. There are no SLAs on the freshness of the counts
   * returned. This API does not trigger a refresh of quota counts.
   * 
   * PAGINATION BEHAVIOR: The API is by default paginated, a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listQuota(signal: AbortSignal | undefined, req: ListQuotas, options?: Options): Promise<ListQuotas_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/resource-quotas/all-resource-quotas`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListQuotas_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListQuotas_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listQuotaIter(signal: AbortSignal | undefined, req: ListQuotas, options?: Options): AsyncGenerator<QuotaInfo> {
    const pageReq: ListQuotas = {...req};
    for (;;) {
      const resp = await this.listQuota(signal, pageReq, options);
      for (const item of resp.quotas ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

}
