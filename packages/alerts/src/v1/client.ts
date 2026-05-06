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
  Alert,
  CreateAlertRequest,
  Empty,
  GetAlertRequest,
  ListAlertsRequest,
  ListAlertsResponse,
  ListAlertsResponseAlert,
  TrashAlertRequest,
  UpdateAlertRequest,
} from './model';
import {
  marshalCreateAlertRequestSchema,
  marshalUpdateAlertRequestSchema,
  unmarshalAlertSchema,
  unmarshalEmptySchema,
  unmarshalListAlertsResponseSchema,
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

  /** Creates an alert. */
  async createAlert(
    signal: AbortSignal | undefined,
    req: CreateAlertRequest,
    options?: CallOptions
  ): Promise<Alert> {
    const url = `${this.host}/api/2.0/sql/alerts`;
    const body = marshalRequest(req, marshalCreateAlertRequestSchema);
    let resp: Alert | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAlertSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets an alert. */
  async getAlert(
    signal: AbortSignal | undefined,
    req: GetAlertRequest,
    options?: CallOptions
  ): Promise<Alert> {
    const url = `${this.host}/api/2.0/sql/alerts/${req.id ?? ''}`;
    let resp: Alert | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAlertSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a list of alerts accessible to the user, ordered by creation time. **Warning:** Calling this API concurrently 10 or more times could result in throttling, service degradation, or a temporary ban. */
  async listAlerts(
    signal: AbortSignal | undefined,
    req: ListAlertsRequest,
    options?: CallOptions
  ): Promise<ListAlertsResponse> {
    const url = `${this.host}/api/2.0/sql/alerts`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAlertsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListAlertsResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAlertsIter(
    signal: AbortSignal | undefined,
    req: ListAlertsRequest,
    options?: CallOptions
  ): AsyncGenerator<ListAlertsResponseAlert> {
    const pageReq: ListAlertsRequest = {...req};
    for (;;) {
      const resp = await this.listAlerts(signal, pageReq, options);
      for (const item of resp.results ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Moves an alert to the trash. Trashed alerts immediately disappear from searches and list views, and can no longer trigger. You can restore a trashed alert through the UI. A trashed alert is permanently deleted after 30 days. */
  async trashAlert(
    signal: AbortSignal | undefined,
    req: TrashAlertRequest,
    options?: CallOptions
  ): Promise<Empty> {
    const url = `${this.host}/api/2.0/sql/alerts/${req.id ?? ''}`;
    let resp: Empty | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEmptySchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates an alert. */
  async updateAlert(
    signal: AbortSignal | undefined,
    req: UpdateAlertRequest,
    options?: CallOptions
  ): Promise<Alert> {
    const url = `${this.host}/api/2.0/sql/alerts/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateAlertRequestSchema);
    let resp: Alert | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAlertSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
