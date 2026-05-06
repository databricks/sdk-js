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
  CreateQualityMonitorRequest,
  DeleteQualityMonitorRequest,
  GetQualityMonitorRequest,
  ListQualityMonitorRequest,
  ListQualityMonitorResponse,
  QualityMonitor,
  UpdateQualityMonitorRequest,
} from './model';
import {
  marshalQualityMonitorSchema,
  unmarshalListQualityMonitorResponseSchema,
  unmarshalQualityMonitorSchema,
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

  /**
   * Deprecated: Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).
   * Create a quality monitor on UC object.
   */
  async createQualityMonitor(
    signal: AbortSignal | undefined,
    req: CreateQualityMonitorRequest,
    options?: CallOptions
  ): Promise<QualityMonitor> {
    const url = `${this.host}/api/2.0/quality-monitors`;
    const body = marshalRequest(
      req.qualityMonitor,
      marshalQualityMonitorSchema
    );
    let resp: QualityMonitor | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalQualityMonitorSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).
   * Delete a quality monitor on UC object.
   */
  async deleteQualityMonitor(
    signal: AbortSignal | undefined,
    req: DeleteQualityMonitorRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/quality-monitors/${req.objectType ?? ''}/${req.objectId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(signal, call, options);
  }

  /**
   * Deprecated: Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).
   * Read a quality monitor on UC object.
   */
  async getQualityMonitor(
    signal: AbortSignal | undefined,
    req: GetQualityMonitorRequest,
    options?: CallOptions
  ): Promise<QualityMonitor> {
    const url = `${this.host}/api/2.0/quality-monitors/${req.objectType ?? ''}/${req.objectId ?? ''}`;
    let resp: QualityMonitor | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalQualityMonitorSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).
   * (Unimplemented) List quality monitors.
   */
  async listQualityMonitor(
    signal: AbortSignal | undefined,
    req: ListQualityMonitorRequest,
    options?: CallOptions
  ): Promise<ListQualityMonitorResponse> {
    const url = `${this.host}/api/2.0/quality-monitors`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListQualityMonitorResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListQualityMonitorResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listQualityMonitorIter(
    signal: AbortSignal | undefined,
    req: ListQualityMonitorRequest,
    options?: CallOptions
  ): AsyncGenerator<QualityMonitor> {
    const pageReq: ListQualityMonitorRequest = {...req};
    for (;;) {
      const resp = await this.listQualityMonitor(signal, pageReq, options);
      for (const item of resp.qualityMonitors ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Deprecated: Use Data Quality Monitoring API instead (/api/data-quality/v1/monitors).
   * (Unimplemented) Update a quality monitor on UC object.
   */
  async updateQualityMonitor(
    signal: AbortSignal | undefined,
    req: UpdateQualityMonitorRequest,
    options?: CallOptions
  ): Promise<QualityMonitor> {
    const url = `${this.host}/api/2.0/quality-monitors/${req.objectType ?? ''}/${req.objectId ?? ''}`;
    const body = marshalRequest(
      req.qualityMonitor,
      marshalQualityMonitorSchema
    );
    let resp: QualityMonitor | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalQualityMonitorSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
