// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  encodePathVariable,
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
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
    return this.config;
  }

  /**
   * Imports a pre-built usage dashboard of the given type into a workspace. Each call imports a new
   * dashboard, even if the caller already created one of the same type in that workspace. The caller
   * must be an account admin and a user of the target workspace. See
   * https://docs.databricks.com/admin/account-settings/usage.html.
   */
  async createBillingUsageDashboard(
    req: CreateBillingUsageDashboardRequest,
    options?: CallOptions
  ): Promise<CreateBillingUsageDashboardResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${encodePathVariable(req.accountId ?? accountId ?? '')}/dashboard`;
    const body = marshalRequest(
      req,
      marshalCreateBillingUsageDashboardRequestSchema
    );
    let resp: CreateBillingUsageDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
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

  /**
   * Gets the most recent usage dashboard of the given type that the caller created. The response is
   * empty if no such dashboard exists, if it has been deleted, or if the caller can no longer access
   * its workspace.
   */
  async getBillingUsageDashboard(
    req: GetBillingUsageDashboardRequest,
    options?: CallOptions
  ): Promise<GetBillingUsageDashboardResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${encodePathVariable(req.accountId ?? accountId ?? '')}/dashboard`;
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
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
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
