// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  BudgetConfiguration,
  CreateBudgetConfiguration,
  CreateBudgetConfiguration_Response,
  DeleteBudgetConfiguration,
  DeleteBudgetConfiguration_Response,
  GetBudgetConfiguration,
  GetBudgetConfiguration_Response,
  ListBudgetConfigurations,
  ListBudgetConfigurations_Response,
  UpdateBudgetConfiguration,
  UpdateBudgetConfiguration_Response,
} from './model';
import {
  marshalCreateBudgetConfigurationSchema,
  marshalUpdateBudgetConfigurationSchema,
  unmarshalCreateBudgetConfiguration_ResponseSchema,
  unmarshalDeleteBudgetConfiguration_ResponseSchema,
  unmarshalGetBudgetConfiguration_ResponseSchema,
  unmarshalListBudgetConfigurations_ResponseSchema,
  unmarshalUpdateBudgetConfiguration_ResponseSchema,
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

  /** Create a new budget configuration for an account. For full details, see https://docs.databricks.com/en/admin/account-settings/budgets.html. */
  async createBudgetConfiguration(
    signal: AbortSignal | undefined,
    req: CreateBudgetConfiguration,
    options?: Options
  ): Promise<CreateBudgetConfiguration_Response> {
    const url = `${this.host}/api/2.1/accounts/${req.budget?.accountId ?? ''}/budgets`;
    const body = marshalRequest(req, marshalCreateBudgetConfigurationSchema);
    let resp: CreateBudgetConfiguration_Response | undefined;
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
        unmarshalCreateBudgetConfiguration_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a budget configuration for an account. Both account and budget configuration are specified by ID. This cannot be undone. */
  async deleteBudgetConfiguration(
    signal: AbortSignal | undefined,
    req: DeleteBudgetConfiguration,
    options?: Options
  ): Promise<DeleteBudgetConfiguration_Response> {
    const url = `${this.host}/api/2.1/accounts//budgets/${req.budgetId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteBudgetConfiguration_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteBudgetConfiguration_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a budget configuration for an account. Both account and budget configuration are specified by ID. */
  async getBudgetConfiguration(
    signal: AbortSignal | undefined,
    req: GetBudgetConfiguration,
    options?: Options
  ): Promise<GetBudgetConfiguration_Response> {
    const url = `${this.host}/api/2.1/accounts//budgets/${req.budgetId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.includeSpendStatus !== undefined) {
      params.append('include_spend_status', String(req.includeSpendStatus));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetBudgetConfiguration_Response | undefined;
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
        unmarshalGetBudgetConfiguration_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets all budgets associated with this account. */
  async listBudgetConfigurations(
    signal: AbortSignal | undefined,
    req: ListBudgetConfigurations,
    options?: Options
  ): Promise<ListBudgetConfigurations_Response> {
    const url = `${this.host}/api/2.1/accounts/{account_id}/budgets`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeSpendStatus !== undefined) {
      params.append('include_spend_status', String(req.includeSpendStatus));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListBudgetConfigurations_Response | undefined;
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
        unmarshalListBudgetConfigurations_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listBudgetConfigurationsIter(
    signal: AbortSignal | undefined,
    req: ListBudgetConfigurations,
    options?: Options
  ): AsyncGenerator<BudgetConfiguration> {
    const pageReq: ListBudgetConfigurations = {...req};
    for (;;) {
      const resp = await this.listBudgetConfigurations(
        signal,
        pageReq,
        options
      );
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
    signal: AbortSignal | undefined,
    req: UpdateBudgetConfiguration,
    options?: Options
  ): Promise<UpdateBudgetConfiguration_Response> {
    const url = `${this.host}/api/2.1/accounts/${req.budget?.accountId ?? ''}/budgets/${req.budgetId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateBudgetConfigurationSchema);
    let resp: UpdateBudgetConfiguration_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalUpdateBudgetConfiguration_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
