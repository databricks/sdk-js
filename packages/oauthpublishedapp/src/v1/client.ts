// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, parseResponse} from './utils';
import type {
  ListPublishedOAuthApps,
  ListPublishedOAuthApps_Response,
  PublishedOAuthApp,
} from './model';
import {unmarshalListPublishedOAuthApps_ResponseSchema} from './model';

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

  /** Get all the available published OAuth apps in <Databricks>. */
  async listPublishedOAuthApps(
    signal: AbortSignal | undefined,
    req: ListPublishedOAuthApps,
    options?: Options
  ): Promise<ListPublishedOAuthApps_Response> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/oauth2/published-apps`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPublishedOAuthApps_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListPublishedOAuthApps_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listPublishedOAuthAppsIter(
    signal: AbortSignal | undefined,
    req: ListPublishedOAuthApps,
    options?: Options
  ): AsyncGenerator<PublishedOAuthApp> {
    const pageReq: ListPublishedOAuthApps = {...req};
    for (;;) {
      const resp = await this.listPublishedOAuthApps(signal, pageReq, options);
      for (const item of resp.apps ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }
}
