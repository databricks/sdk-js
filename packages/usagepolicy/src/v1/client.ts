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
  CreateUsagePolicyRequest,
  DeleteUsagePolicyRequest,
  GetUsagePolicyRequest,
  ListUsagePoliciesRequest,
  ListUsagePoliciesResponse,
  UpdateUsagePolicyRequest,
  UsagePolicy,
} from './model';
import {
  marshalCreateUsagePolicyRequestSchema,
  marshalUsagePolicySchema,
  unmarshalListUsagePoliciesResponseSchema,
  unmarshalUsagePolicySchema,
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

  /** Creates a new usage policy. */
  async createUsagePolicy(
    signal: AbortSignal | undefined,
    req: CreateUsagePolicyRequest,
    options?: Options
  ): Promise<UsagePolicy> {
    const url = `${this.host}/api/2.1/accounts/{account_id}/usage-policies`;
    const body = marshalRequest(req, marshalCreateUsagePolicyRequestSchema);
    let resp: UsagePolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUsagePolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a usage policy */
  async deleteUsagePolicy(
    signal: AbortSignal | undefined,
    req: DeleteUsagePolicyRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.1/accounts//usage-policies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Retrieves a usage policy by it's ID. */
  async getUsagePolicy(
    signal: AbortSignal | undefined,
    req: GetUsagePolicyRequest,
    options?: Options
  ): Promise<UsagePolicy> {
    const url = `${this.host}/api/2.1/accounts//usage-policies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: UsagePolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUsagePolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all usage policies. Policies are returned in the alphabetically ascending order of their names. */
  async listUsagePolicies(
    signal: AbortSignal | undefined,
    req: ListUsagePoliciesRequest,
    options?: Options
  ): Promise<ListUsagePoliciesResponse> {
    const url = `${this.host}/api/2.1/accounts/{account_id}/usage-policies`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filterBy !== undefined) {
      params.append('filter_by', String(req.filterBy));
    }
    if (req.sortSpec !== undefined) {
      params.append('sort_spec', String(req.sortSpec));
    }
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListUsagePoliciesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListUsagePoliciesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listUsagePoliciesIter(
    signal: AbortSignal | undefined,
    req: ListUsagePoliciesRequest,
    options?: Options
  ): AsyncGenerator<UsagePolicy> {
    const pageReq: ListUsagePoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listUsagePolicies(signal, pageReq, options);
      for (const item of resp.policies ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates a usage policy */
  async updateUsagePolicy(
    signal: AbortSignal | undefined,
    req: UpdateUsagePolicyRequest,
    options?: Options
  ): Promise<UsagePolicy> {
    const url = `${this.host}/api/2.1/accounts//usage-policies/${req.policy?.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.limitConfig !== undefined) {
      params.append('limit_config', String(req.limitConfig));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalUsagePolicySchema);
    let resp: UsagePolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUsagePolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
