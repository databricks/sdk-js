// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {resolveClientConfig} from '@databricks/sdk-core/config';
import {newHttpClient} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateBillingUsageDashboardRequest,
  CreateBillingUsageDashboardResponse,
  GetBillingUsageDashboardRequest,
  GetBillingUsageDashboardResponse,
} from './model';
import {
  marshalCreateBillingUsageDashboardRequestSchema,
  unmarshalCreateBillingUsageDashboardResponseSchema,
  unmarshalGetBillingUsageDashboardResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class UsageDashboardsClient {
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
    // Resolve host and credentials from one source so they share a profile.
    const config = resolveClientConfig(options);
    this.host = (config.host ?? '').replace(/\/$/, '');
    this.accountId = config.accountId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Create a usage dashboard specified by workspaceId, accountId, and dashboard type. */
  async createBillingUsageDashboard(
    req: CreateBillingUsageDashboardRequest,
    options?: CallOptions
  ): Promise<CreateBillingUsageDashboardResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/dashboard`;
    const body = marshalRequest(
      req,
      marshalCreateBillingUsageDashboardRequestSchema
    );
    let resp: CreateBillingUsageDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateBillingUsageDashboardResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a usage dashboard specified by workspaceId, accountId, and dashboard type. */
  async getBillingUsageDashboard(
    req: GetBillingUsageDashboardRequest,
    options?: CallOptions
  ): Promise<GetBillingUsageDashboardResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/dashboard`;
    const params = new URLSearchParams();
    if (req.workspaceId !== undefined) {
      params.append('workspace_id', String(req.workspaceId));
    }
    if (req.dashboardType !== undefined) {
      params.append('dashboard_type', req.dashboardType);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetBillingUsageDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetBillingUsageDashboardResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
