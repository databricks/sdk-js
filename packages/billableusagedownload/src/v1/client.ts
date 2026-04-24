// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, sendAndCheckError} from './utils';
import type {DownloadRequest, DownloadResponse} from './model';

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
   * Returns billable usage logs in CSV format for the specified account and date range.
   * For the data schema, see:
   *
   * - AWS: [CSV file schema](https://docs.databricks.com/administration-guide/account-settings/usage-analysis.html#schema).
   * - GCP: [CSV file schema](https://docs.gcp.databricks.com/administration-guide/account-settings/usage-analysis.html#csv-file-schema).
   *
   * Note that this method might take multiple minutes to complete.
   *
   * **Warning**: Depending on the queried date range, the number of workspaces
   * in the account, the size of the response and the internet speed of the caller,
   * this API may hit a timeout after a few minutes. If you experience this, try to mitigate
   * by calling the API with narrower date ranges.
   */
  async download(
    signal: AbortSignal | undefined,
    req: DownloadRequest,
    options?: Options
  ): Promise<DownloadResponse> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/usage/download`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.startMonth !== undefined) {
      params.append('start_month', req.startMonth);
    }
    if (req.endMonth !== undefined) {
      params.append('end_month', req.endMonth);
    }
    if (req.personalData !== undefined) {
      params.append('personal_data', String(req.personalData));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DownloadResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const httpResp = await sendAndCheckError({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
