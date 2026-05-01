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
  sendAndCheckError,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  ExportMetricsResponse,
  GetExportEndpointMetrics,
  GetServedModelBuildLogs,
  GetServedModelBuildLogs_Response,
  GetServedModelLogs,
  GetServedModelLogs_Response,
} from './model';
import {
  unmarshalGetServedModelBuildLogs_ResponseSchema,
  unmarshalGetServedModelLogs_ResponseSchema,
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

  /** Retrieves the metrics associated with the provided serving endpoint in either Prometheus or OpenMetrics exposition format. */
  async getExportEndpointMetrics(
    signal: AbortSignal | undefined,
    req: GetExportEndpointMetrics,
    options?: Options
  ): Promise<ExportMetricsResponse> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/metrics`;
    let resp: ExportMetricsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const httpResp = await sendAndCheckError({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the build logs associated with the provided served model. */
  async getServedModelBuildLogs(
    signal: AbortSignal | undefined,
    req: GetServedModelBuildLogs,
    options?: Options
  ): Promise<GetServedModelBuildLogs_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/served-models/${req.servedModelName ?? ''}/build-logs`;
    let resp: GetServedModelBuildLogs_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetServedModelBuildLogs_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the service logs associated with the provided served model. */
  async getServedModelLogs(
    signal: AbortSignal | undefined,
    req: GetServedModelLogs,
    options?: Options
  ): Promise<GetServedModelLogs_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/served-models/${req.servedModelName ?? ''}/logs`;
    let resp: GetServedModelLogs_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetServedModelLogs_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
