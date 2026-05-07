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
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateBillingUsageDashboard,
  CreateBillingUsageDashboard_Response,
  GetBillingUsageDashboard,
  GetBillingUsageDashboard_Response,
} from './model';
import {
  marshalCreateBillingUsageDashboardSchema,
  unmarshalCreateBillingUsageDashboard_ResponseSchema,
  unmarshalGetBillingUsageDashboard_ResponseSchema,
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

  /** Create a usage dashboard specified by workspaceId, accountId, and dashboard type. */
  async createBillingUsageDashboard(
    signal: AbortSignal | undefined,
    req: CreateBillingUsageDashboard,
    options?: CallOptions
  ): Promise<CreateBillingUsageDashboard_Response> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/dashboard`;
    const body = marshalRequest(req, marshalCreateBillingUsageDashboardSchema);
    let resp: CreateBillingUsageDashboard_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalCreateBillingUsageDashboard_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a usage dashboard specified by workspaceId, accountId, and dashboard type. */
  async getBillingUsageDashboard(
    signal: AbortSignal | undefined,
    req: GetBillingUsageDashboard,
    options?: CallOptions
  ): Promise<GetBillingUsageDashboard_Response> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/dashboard`;
    const params = new URLSearchParams();
    if (req.workspaceId !== undefined) {
      params.append('workspace_id', String(req.workspaceId));
    }
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.dashboardType !== undefined) {
      params.append('dashboard_type', req.dashboardType);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetBillingUsageDashboard_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalGetBillingUsageDashboard_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
