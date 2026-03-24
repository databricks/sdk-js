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
  marshalRequest,
  parseResponse,
} from './utils';
import type {
  CreateNotificationDestinationRequest,
  DeleteNotificationDestinationRequest,
  Empty,
  GetNotificationDestinationRequest,
  ListNotificationDestinationsRequest,
  ListNotificationDestinationsResponse,
  ListNotificationDestinationsResult,
  NotificationDestination,
  UpdateNotificationDestinationRequest,
} from './model';
import {
  marshalCreateNotificationDestinationRequestSchema,
  marshalUpdateNotificationDestinationRequestSchema,
  unmarshalEmptySchema,
  unmarshalListNotificationDestinationsResponseSchema,
  unmarshalNotificationDestinationSchema,
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

  /** Creates a notification destination. Requires workspace admin permissions. */
  async createNotificationDestination(
    signal: AbortSignal | undefined,
    req: CreateNotificationDestinationRequest,
    options?: Options
  ): Promise<NotificationDestination> {
    const url = `${this.host}/api/2.0/notification-destinations`;
    const body = marshalRequest(
      req,
      marshalCreateNotificationDestinationRequestSchema
    );
    let resp: NotificationDestination | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNotificationDestinationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a notification destination. Requires workspace admin permissions. */
  async deleteNotificationDestination(
    signal: AbortSignal | undefined,
    req: DeleteNotificationDestinationRequest,
    options?: Options
  ): Promise<Empty> {
    const url = `${this.host}/api/2.0/notification-destinations/${req.id ?? ''}`;
    let resp: Empty | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEmptySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a notification destination. */
  async getNotificationDestination(
    signal: AbortSignal | undefined,
    req: GetNotificationDestinationRequest,
    options?: Options
  ): Promise<NotificationDestination> {
    const url = `${this.host}/api/2.0/notification-destinations/${req.id ?? ''}`;
    let resp: NotificationDestination | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNotificationDestinationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists notification destinations. */
  async listNotificationDestinations(
    signal: AbortSignal | undefined,
    req: ListNotificationDestinationsRequest,
    options?: Options
  ): Promise<ListNotificationDestinationsResponse> {
    const url = `${this.host}/api/2.0/notification-destinations`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListNotificationDestinationsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListNotificationDestinationsResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listNotificationDestinationsIter(
    signal: AbortSignal | undefined,
    req: ListNotificationDestinationsRequest,
    options?: Options
  ): AsyncGenerator<ListNotificationDestinationsResult> {
    const pageReq: ListNotificationDestinationsRequest = {...req};
    for (;;) {
      const resp = await this.listNotificationDestinations(
        signal,
        pageReq,
        options
      );
      for (const item of resp.results ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates a notification destination. Requires workspace admin permissions. At least one field is required in the request body. */
  async updateNotificationDestination(
    signal: AbortSignal | undefined,
    req: UpdateNotificationDestinationRequest,
    options?: Options
  ): Promise<NotificationDestination> {
    const url = `${this.host}/api/2.0/notification-destinations/${req.id ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateNotificationDestinationRequestSchema
    );
    let resp: NotificationDestination | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNotificationDestinationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
