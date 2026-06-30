// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  flattenQueryParams,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
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
  marshalCreateBudgetPolicyRequestSchema,
  marshalCreateBudgetPolicySchema,
  marshalFilterSchema,
  marshalLimitConfigSchema,
  marshalSortSpecSchema,
  unmarshalBudgetPolicySchema,
  unmarshalListBudgetPoliciesResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class BudgetPolicyClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /** Creates a new policy. */
  async createBudgetPolicy(
    req: CreateBudgetPolicyRequest,
    options?: CallOptions
  ): Promise<BudgetPolicy> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/accounts/${req.accountId ?? accountId ?? ''}/budget-policies`;
    const body = marshalRequest(req, marshalCreateBudgetPolicyRequestSchema);
    let resp: BudgetPolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBudgetPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a policy */
  async deleteBudgetPolicy(
    req: DeleteBudgetPolicyRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/accounts/${req.accountId ?? accountId ?? ''}/budget-policies/${req.policyId ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Retrieves a policy by it's ID. */
  async getBudgetPolicy(
    req: GetBudgetPolicyRequest,
    options?: CallOptions
  ): Promise<BudgetPolicy> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/accounts/${req.accountId ?? accountId ?? ''}/budget-policies/${req.policyId ?? ''}`;
    let resp: BudgetPolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBudgetPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists all policies. Policies are returned in the alphabetically ascending order of their names. */
  async listBudgetPolicies(
    req: ListBudgetPoliciesRequest,
    options?: CallOptions
  ): Promise<ListBudgetPoliciesResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/accounts/${req.accountId ?? accountId ?? ''}/budget-policies`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filterBy !== undefined) {
      flattenQueryParams(
        'filter_by',
        marshalFilterSchema.parse(req.filterBy),
        params
      );
    }
    if (req.sortSpec !== undefined) {
      flattenQueryParams(
        'sort_spec',
        marshalSortSpecSchema.parse(req.sortSpec),
        params
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListBudgetPoliciesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListBudgetPoliciesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listBudgetPoliciesIter(
    req: ListBudgetPoliciesRequest,
    options?: CallOptions
  ): AsyncGenerator<BudgetPolicy> {
    const pageReq: ListBudgetPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listBudgetPolicies(pageReq, options);
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
    req: UpdateBudgetPolicyRequest,
    options?: CallOptions
  ): Promise<BudgetPolicy> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/accounts/${req.accountId ?? accountId ?? ''}/budget-policies/${req.policy?.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.limitConfig !== undefined) {
      flattenQueryParams(
        'limit_config',
        marshalLimitConfigSchema.parse(req.limitConfig),
        params
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalCreateBudgetPolicySchema);
    let resp: BudgetPolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBudgetPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
