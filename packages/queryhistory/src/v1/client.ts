// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, parseResponse, flattenQueryParams} from './utils';
import type {
  ListQueries,
  ListQueries_Response,
} from './model';
import {
  marshalQueryFilterSchema,
  unmarshalListQueries_ResponseSchema,
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
   * List the history of queries through SQL warehouses, and serverless compute.
   * 
   * You can filter by user ID, warehouse ID, status, and time range.
   * Most recently started queries are returned first (up to max_results in request).
   * The pagination token returned in response can be used to list subsequent query statuses.
   */
  async listQueries(signal: AbortSignal | undefined, req: ListQueries, options?: Options): Promise<ListQueries_Response> {
    const url = `${this.host}/api/2.0/sql/history/queries`;
    const params = new URLSearchParams();
    if (req.filterBy !== undefined) {
      flattenQueryParams('filter_by', marshalQueryFilterSchema.parse(req.filterBy), params);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeMetrics !== undefined) {
      params.append('include_metrics', String(req.includeMetrics));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListQueries_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListQueries_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
