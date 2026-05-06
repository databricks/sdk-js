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
  marshalFilterSchema,
  marshalLimitConfigSchema,
  marshalSortSpecSchema,
  marshalUsagePolicySchema,
  unmarshalListUsagePoliciesResponseSchema,
  unmarshalUsagePolicySchema,
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

  /** Creates a new usage policy. */
  async createUsagePolicy(
    signal: AbortSignal | undefined,
    req: CreateUsagePolicyRequest,
    options?: CallOptions
  ): Promise<UsagePolicy> {
    const url = `${this.host}/api/2.1/accounts/{account_id}/usage-policies`;
    const body = marshalRequest(req, marshalCreateUsagePolicyRequestSchema);
    let resp: UsagePolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUsagePolicySchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a usage policy */
  async deleteUsagePolicy(
    signal: AbortSignal | undefined,
    req: DeleteUsagePolicyRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.1/accounts//usage-policies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(signal, call, options);
  }

  /** Retrieves a usage policy by it's ID. */
  async getUsagePolicy(
    signal: AbortSignal | undefined,
    req: GetUsagePolicyRequest,
    options?: CallOptions
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
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUsagePolicySchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all usage policies. Policies are returned in the alphabetically ascending order of their names. */
  async listUsagePolicies(
    signal: AbortSignal | undefined,
    req: ListUsagePoliciesRequest,
    options?: CallOptions
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
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListUsagePoliciesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListUsagePoliciesResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listUsagePoliciesIter(
    signal: AbortSignal | undefined,
    req: ListUsagePoliciesRequest,
    options?: CallOptions
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
    options?: CallOptions
  ): Promise<UsagePolicy> {
    const url = `${this.host}/api/2.1/accounts//usage-policies/${req.policy?.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.limitConfig !== undefined) {
      flattenQueryParams(
        'limit_config',
        marshalLimitConfigSchema.parse(req.limitConfig),
        params
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalUsagePolicySchema);
    let resp: UsagePolicy | undefined;
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
      resp = parseResponse(respBody, unmarshalUsagePolicySchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
