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
  CancelPublishedQueryExecutionRequest,
  CancelQueryExecutionResponse,
  ExecutePublishedDashboardQueryRequest,
  ExecuteQueryResponse,
  PollPublishedQueryStatusRequest,
  PollQueryStatusResponse,
} from './model';
import {
  marshalExecutePublishedDashboardQueryRequestSchema,
  unmarshalCancelQueryExecutionResponseSchema,
  unmarshalExecuteQueryResponseSchema,
  unmarshalPollQueryStatusResponseSchema,
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

  /** Cancel the results for the a query for a published, embedded dashboard. */
  async cancelPublishedQueryExecution(
    signal: AbortSignal | undefined,
    req: CancelPublishedQueryExecutionRequest,
    options?: Options
  ): Promise<CancelQueryExecutionResponse> {
    const url = `${this.host}/api/2.0/lakeview-query/query/published`;
    const params = new URLSearchParams();
    if (req.tokens !== undefined) {
      params.append('tokens', String(req.tokens));
    }
    if (req.dashboardName !== undefined) {
      params.append('dashboard_name', req.dashboardName);
    }
    if (req.dashboardRevisionId !== undefined) {
      params.append('dashboard_revision_id', req.dashboardRevisionId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: CancelQueryExecutionResponse | undefined;
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
        unmarshalCancelQueryExecutionResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Execute a query for a published dashboard. */
  async executePublishedDashboardQuery(
    signal: AbortSignal | undefined,
    req: ExecutePublishedDashboardQueryRequest,
    options?: Options
  ): Promise<ExecuteQueryResponse> {
    const url = `${this.host}/api/2.0/lakeview-query/query/published`;
    const body = marshalRequest(
      req,
      marshalExecutePublishedDashboardQueryRequestSchema
    );
    let resp: ExecuteQueryResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalExecuteQueryResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Poll the results for the a query for a published, embedded dashboard.
   * Supports both GET and POST methods. POST is recommended for polling many tokens to avoid URL length limitations.
   */
  async pollPublishedQueryStatus(
    signal: AbortSignal | undefined,
    req: PollPublishedQueryStatusRequest,
    options?: Options
  ): Promise<PollQueryStatusResponse> {
    const url = `${this.host}/api/2.0/lakeview-query/query/published`;
    const params = new URLSearchParams();
    if (req.tokens !== undefined) {
      params.append('tokens', String(req.tokens));
    }
    if (req.dashboardName !== undefined) {
      params.append('dashboard_name', req.dashboardName);
    }
    if (req.dashboardRevisionId !== undefined) {
      params.append('dashboard_revision_id', req.dashboardRevisionId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: PollQueryStatusResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPollQueryStatusResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
