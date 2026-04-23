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
  sendAndCheckError,
  parseResponse,
} from './utils';
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

  /** Retrieves the metrics associated with the provided serving endpoint in either Prometheus or OpenMetrics exposition format. */
  async getExportEndpointMetrics(
    signal: AbortSignal | undefined,
    req: GetExportEndpointMetrics,
    options?: Options
  ): Promise<ExportMetricsResponse> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/metrics`;
    let resp: ExportMetricsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
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
      const httpReq = buildHttpRequest('GET', url, callSignal);
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
      const httpReq = buildHttpRequest('GET', url, callSignal);
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
