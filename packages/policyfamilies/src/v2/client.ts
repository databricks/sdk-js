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
  GetPolicyFamily,
  ListPolicyFamilies,
  ListPolicyFamilies_Response,
  PolicyFamily,
} from './model';
import {
  unmarshalListPolicyFamilies_ResponseSchema,
  unmarshalPolicyFamilySchema,
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

  /** Retrieve the information for an policy family based on its identifier and version */
  async getPolicyFamily(
    signal: AbortSignal | undefined,
    req: GetPolicyFamily,
    options?: Options
  ): Promise<PolicyFamily> {
    const url = `${this.host}/api/2.0/policy-families/${req.policyFamilyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.version !== undefined) {
      params.append('version', String(req.version));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: PolicyFamily | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPolicyFamilySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the list of policy definition types available to use at their latest version. This API is paginated. */
  async listPolicyFamilies(
    signal: AbortSignal | undefined,
    req: ListPolicyFamilies,
    options?: Options
  ): Promise<ListPolicyFamilies_Response> {
    const url = `${this.host}/api/2.0/policy-families`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPolicyFamilies_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListPolicyFamilies_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listPolicyFamiliesIter(
    signal: AbortSignal | undefined,
    req: ListPolicyFamilies,
    options?: Options
  ): AsyncGenerator<PolicyFamily> {
    const pageReq: ListPolicyFamilies = {...req};
    for (;;) {
      const resp = await this.listPolicyFamilies(signal, pageReq, options);
      for (const item of resp.policyFamilies ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }
}
