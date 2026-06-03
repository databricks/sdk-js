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
  BudgetConfiguration,
  CreateBudgetConfigurationRequest,
  CreateBudgetConfigurationResponse,
  DeleteBudgetConfigurationRequest,
  DeleteBudgetConfigurationResponse,
  GetBudgetConfigurationRequest,
  GetBudgetConfigurationResponse,
  ListBudgetConfigurationsRequest,
  ListBudgetConfigurationsResponse,
  UpdateBudgetConfigurationRequest,
  UpdateBudgetConfigurationResponse,
} from './model';
import {
  marshalCreateBudgetConfigurationRequestSchema,
  marshalUpdateBudgetConfigurationRequestSchema,
  unmarshalCreateBudgetConfigurationResponseSchema,
  unmarshalDeleteBudgetConfigurationResponseSchema,
  unmarshalGetBudgetConfigurationResponseSchema,
  unmarshalListBudgetConfigurationsResponseSchema,
  unmarshalUpdateBudgetConfigurationResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class BudgetsClient {
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

  /** Create a new budget configuration for an account. For full details, see https://docs.databricks.com/en/admin/account-settings/budgets.html. */
  async createBudgetConfiguration(
    req: CreateBudgetConfigurationRequest,
    options?: CallOptions
  ): Promise<CreateBudgetConfigurationResponse> {
    const url = `${this.host}/api/2.1/accounts/${req.budget?.accountId ?? this.accountId ?? ''}/budgets`;
    const body = marshalRequest(
      req,
      marshalCreateBudgetConfigurationRequestSchema
    );
    let resp: CreateBudgetConfigurationResponse | undefined;
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
        unmarshalCreateBudgetConfigurationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a budget configuration for an account. Both account and budget configuration are specified by ID. This cannot be undone. */
  async deleteBudgetConfiguration(
    req: DeleteBudgetConfigurationRequest,
    options?: CallOptions
  ): Promise<DeleteBudgetConfigurationResponse> {
    const url = `${this.host}/api/2.1/accounts/${req.accountId ?? this.accountId ?? ''}/budgets/${req.budgetId ?? ''}`;
    let resp: DeleteBudgetConfigurationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteBudgetConfigurationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a budget configuration for an account. Both account and budget configuration are specified by ID. */
  async getBudgetConfiguration(
    req: GetBudgetConfigurationRequest,
    options?: CallOptions
  ): Promise<GetBudgetConfigurationResponse> {
    const url = `${this.host}/api/2.1/accounts/${req.accountId ?? this.accountId ?? ''}/budgets/${req.budgetId ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeSpendStatus !== undefined) {
      params.append('include_spend_status', String(req.includeSpendStatus));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetBudgetConfigurationResponse | undefined;
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
        unmarshalGetBudgetConfigurationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets all budgets associated with this account. */
  async listBudgetConfigurations(
    req: ListBudgetConfigurationsRequest,
    options?: CallOptions
  ): Promise<ListBudgetConfigurationsResponse> {
    const url = `${this.host}/api/2.1/accounts/${req.accountId ?? this.accountId ?? ''}/budgets`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeSpendStatus !== undefined) {
      params.append('include_spend_status', String(req.includeSpendStatus));
    }
    if (req.includeWorkspaceBudgets !== undefined) {
      params.append(
        'include_workspace_budgets',
        String(req.includeWorkspaceBudgets)
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListBudgetConfigurationsResponse | undefined;
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
        unmarshalListBudgetConfigurationsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listBudgetConfigurationsIter(
    req: ListBudgetConfigurationsRequest,
    options?: CallOptions
  ): AsyncGenerator<BudgetConfiguration> {
    const pageReq: ListBudgetConfigurationsRequest = {...req};
    for (;;) {
      const resp = await this.listBudgetConfigurations(pageReq, options);
      for (const item of resp.budgets ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates a budget configuration for an account. Both account and budget configuration are specified by ID. */
  async updateBudgetConfiguration(
    req: UpdateBudgetConfigurationRequest,
    options?: CallOptions
  ): Promise<UpdateBudgetConfigurationResponse> {
    const url = `${this.host}/api/2.1/accounts/${req.budget?.accountId ?? this.accountId ?? ''}/budgets/${req.budgetId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateBudgetConfigurationRequestSchema
    );
    let resp: UpdateBudgetConfigurationResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateBudgetConfigurationResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
