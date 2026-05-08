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
import {buildHttpRequest, executeCall, sendAndCheckError} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {DownloadRequest, DownloadResponse} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
  // Fallback for endpoints whose path contains {account_id}. If the request
  // already carries an accountId, that value wins.
  private readonly accountId: string | undefined;
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
    this.accountId = options.accountId;
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
    req: DownloadRequest,
    options?: CallOptions
  ): Promise<DownloadResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/usage/download`;
    const params = new URLSearchParams();
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
      headers.set('User-Agent', this.userAgent);
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
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
