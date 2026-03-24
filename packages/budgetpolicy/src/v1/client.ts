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
  BudgetPolicy,
  CreateBudgetPolicyRequest,
  DeleteBudgetPolicyRequest,
  GetBudgetPolicyRequest,
  ListBudgetPoliciesRequest,
  ListBudgetPoliciesResponse,
  UpdateBudgetPolicyRequest,
} from './model';
import {
  marshalBudgetPolicySchema,
  marshalCreateBudgetPolicyRequestSchema,
  unmarshalBudgetPolicySchema,
  unmarshalListBudgetPoliciesResponseSchema,
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

  /** Creates a new policy. */
  async createBudgetPolicy(
    signal: AbortSignal | undefined,
    req: CreateBudgetPolicyRequest,
    options?: Options
  ): Promise<BudgetPolicy> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/budget-policies`;
    const body = marshalRequest(req, marshalCreateBudgetPolicyRequestSchema);
    let resp: BudgetPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBudgetPolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a policy */
  async deleteBudgetPolicy(
    signal: AbortSignal | undefined,
    req: DeleteBudgetPolicyRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts//budget-policies/${req.policyId ?? ''}`;
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

  /** Retrieves a policy by it's ID. */
  async getBudgetPolicy(
    signal: AbortSignal | undefined,
    req: GetBudgetPolicyRequest,
    options?: Options
  ): Promise<BudgetPolicy> {
    const url = `${this.host}/api/2.0/accounts//budget-policies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: BudgetPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBudgetPolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all policies. Policies are returned in the alphabetically ascending order of their names. */
  async listBudgetPolicies(
    signal: AbortSignal | undefined,
    req: ListBudgetPoliciesRequest,
    options?: Options
  ): Promise<ListBudgetPoliciesResponse> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/budget-policies`;
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
    let resp: ListBudgetPoliciesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListBudgetPoliciesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listBudgetPoliciesIter(
    signal: AbortSignal | undefined,
    req: ListBudgetPoliciesRequest,
    options?: Options
  ): AsyncGenerator<BudgetPolicy> {
    const pageReq: ListBudgetPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listBudgetPolicies(signal, pageReq, options);
      for (const item of resp.policies ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates a policy */
  async updateBudgetPolicy(
    signal: AbortSignal | undefined,
    req: UpdateBudgetPolicyRequest,
    options?: Options
  ): Promise<BudgetPolicy> {
    const url = `${this.host}/api/2.0/accounts//budget-policies/${req.policy?.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.limitConfig !== undefined) {
      params.append('limit_config', String(req.limitConfig));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalBudgetPolicySchema);
    let resp: BudgetPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBudgetPolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
