// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
import type {
  Alert,
  CreateAlertRequest,
  Empty,
  GetAlertRequest,
  ListAlertsRequest,
  ListAlertsResponse,
  TrashAlertRequest,
  UpdateAlertRequest,
} from './model';
import {
  marshalAlertSchema,
  unmarshalAlertSchema,
  unmarshalEmptySchema,
  unmarshalListAlertsResponseSchema,
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

  /** Create Alert */
  async createAlert(signal: AbortSignal | undefined, req: CreateAlertRequest, options?: Options): Promise<Alert> {
    const url = `${this.host}/api/2.0/alerts`;
    const body = marshalRequest(req.alert, marshalAlertSchema);
    let resp: Alert | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalAlertSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets an alert. */
  async getAlert(signal: AbortSignal | undefined, req: GetAlertRequest, options?: Options): Promise<Alert> {
    const url = `${this.host}/api/2.0/alerts/${req.id ?? ''}`;
    let resp: Alert | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalAlertSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a list of alerts accessible to the user, ordered by creation time. */
  async listAlerts(signal: AbortSignal | undefined, req: ListAlertsRequest, options?: Options): Promise<ListAlertsResponse> {
    const url = `${this.host}/api/2.0/alerts`;
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListAlertsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listAlertsIter(signal: AbortSignal | undefined, req: ListAlertsRequest, options?: Options): AsyncGenerator<Alert> {
    const pageReq: ListAlertsRequest = {...req};
    for (;;) {
      const resp = await this.listAlerts(signal, pageReq, options);
      for (const item of resp.alerts ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }


  /** Moves an alert to the trash. Trashed alerts immediately disappear from list views, and can no longer trigger. You can restore a trashed alert through the UI. A trashed alert is permanently deleted after 30 days. */
  async trashAlert(signal: AbortSignal | undefined, req: TrashAlertRequest, options?: Options): Promise<Empty> {
    const url = `${this.host}/api/2.0/alerts/${req.id ?? ''}`;
    const params = new URLSearchParams();
    if (req.purge !== undefined) {
      params.append('purge', String(req.purge));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Empty | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalEmptySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update alert */
  async updateAlert(signal: AbortSignal | undefined, req: UpdateAlertRequest, options?: Options): Promise<Alert> {
    const url = `${this.host}/api/2.0/alerts/${req.alert?.id ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.paths.join(','));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.alert, marshalAlertSchema);
    let resp: Alert | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalAlertSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
