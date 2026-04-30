// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
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
import type {
  CreateDashboardRequest,
  CreateScheduleRequest,
  CreateSubscriptionRequest,
  Dashboard,
  DeleteScheduleRequest,
  DeleteSubscriptionRequest,
  GetDashboardRequest,
  GetPublishedDashboardEmbeddedRequest,
  GetPublishedDashboardEmbeddedResponse,
  GetPublishedDashboardRequest,
  GetPublishedDashboardTokenInfoRequest,
  GetPublishedDashboardTokenInfoResponse,
  GetScheduleRequest,
  GetSubscriptionRequest,
  ListDashboardsRequest,
  ListDashboardsResponse,
  ListSchedulesRequest,
  ListSchedulesResponse,
  ListSubscriptionsRequest,
  ListSubscriptionsResponse,
  MigrateDashboardRequest,
  PublishDashboardRequest,
  PublishedDashboard,
  RevertDashboardRequest,
  RevertDashboardResponse,
  Schedule,
  Subscription,
  TrashDashboardRequest,
  TrashDashboardResponse,
  UnpublishDashboardRequest,
  UnpublishDashboardResponse,
  UpdateDashboardRequest,
  UpdateScheduleRequest,
} from './model';
import {
  marshalDashboardSchema,
  marshalMigrateDashboardRequestSchema,
  marshalPublishDashboardRequestSchema,
  marshalRevertDashboardRequestSchema,
  marshalScheduleSchema,
  marshalSubscriptionSchema,
  unmarshalDashboardSchema,
  unmarshalGetPublishedDashboardEmbeddedResponseSchema,
  unmarshalGetPublishedDashboardTokenInfoResponseSchema,
  unmarshalListDashboardsResponseSchema,
  unmarshalListSchedulesResponseSchema,
  unmarshalListSubscriptionsResponseSchema,
  unmarshalPublishedDashboardSchema,
  unmarshalRevertDashboardResponseSchema,
  unmarshalScheduleSchema,
  unmarshalSubscriptionSchema,
  unmarshalTrashDashboardResponseSchema,
  unmarshalUnpublishDashboardResponseSchema,
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

  /** Create a draft dashboard. */
  async createDashboard(
    signal: AbortSignal | undefined,
    req: CreateDashboardRequest,
    options?: Options
  ): Promise<Dashboard> {
    const url = `${this.host}/api/2.0/lakeview/dashboards`;
    const params = new URLSearchParams();
    if (req.datasetCatalog !== undefined) {
      params.append('dataset_catalog', req.datasetCatalog);
    }
    if (req.datasetSchema !== undefined) {
      params.append('dataset_schema', req.datasetSchema);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.dashboard, marshalDashboardSchema);
    let resp: Dashboard | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDashboardSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create dashboard schedule. */
  async createSchedule(
    signal: AbortSignal | undefined,
    req: CreateScheduleRequest,
    options?: Options
  ): Promise<Schedule> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.schedule?.dashboardId ?? ''}/schedules`;
    const body = marshalRequest(req.schedule, marshalScheduleSchema);
    let resp: Schedule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalScheduleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create schedule subscription. */
  async createSubscription(
    signal: AbortSignal | undefined,
    req: CreateSubscriptionRequest,
    options?: Options
  ): Promise<Subscription> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.subscription?.dashboardId ?? ''}/schedules/${req.subscription?.scheduleId ?? ''}/subscriptions`;
    const body = marshalRequest(req.subscription, marshalSubscriptionSchema);
    let resp: Subscription | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSubscriptionSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete dashboard schedule. */
  async deleteSchedule(
    signal: AbortSignal | undefined,
    req: DeleteScheduleRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Delete schedule subscription. */
  async deleteSubscription(
    signal: AbortSignal | undefined,
    req: DeleteSubscriptionRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}/subscriptions/${req.subscriptionId ?? ''}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Get a draft dashboard. */
  async getDashboard(
    signal: AbortSignal | undefined,
    req: GetDashboardRequest,
    options?: Options
  ): Promise<Dashboard> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}`;
    let resp: Dashboard | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDashboardSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the current published dashboard. */
  async getPublishedDashboard(
    signal: AbortSignal | undefined,
    req: GetPublishedDashboardRequest,
    options?: Options
  ): Promise<PublishedDashboard> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/published`;
    let resp: PublishedDashboard | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPublishedDashboardSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the current published dashboard within an embedded context. */
  async getPublishedDashboardEmbedded(
    signal: AbortSignal | undefined,
    req: GetPublishedDashboardEmbeddedRequest,
    options?: Options
  ): Promise<GetPublishedDashboardEmbeddedResponse> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/published/embedded`;
    let resp: GetPublishedDashboardEmbeddedResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPublishedDashboardEmbeddedResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a required authorization details and scopes of a published dashboard to mint an OAuth token. */
  async getPublishedDashboardTokenInfo(
    signal: AbortSignal | undefined,
    req: GetPublishedDashboardTokenInfoRequest,
    options?: Options
  ): Promise<GetPublishedDashboardTokenInfoResponse> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/published/tokeninfo`;
    const params = new URLSearchParams();
    if (req.externalValue !== undefined) {
      params.append('external_value', req.externalValue);
    }
    if (req.externalViewerId !== undefined) {
      params.append('external_viewer_id', req.externalViewerId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPublishedDashboardTokenInfoResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPublishedDashboardTokenInfoResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get dashboard schedule. */
  async getSchedule(
    signal: AbortSignal | undefined,
    req: GetScheduleRequest,
    options?: Options
  ): Promise<Schedule> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}`;
    let resp: Schedule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalScheduleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get schedule subscription. */
  async getSubscription(
    signal: AbortSignal | undefined,
    req: GetSubscriptionRequest,
    options?: Options
  ): Promise<Subscription> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}/subscriptions/${req.subscriptionId ?? ''}`;
    let resp: Subscription | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSubscriptionSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List dashboards. */
  async listDashboards(
    signal: AbortSignal | undefined,
    req: ListDashboardsRequest,
    options?: Options
  ): Promise<ListDashboardsResponse> {
    const url = `${this.host}/api/2.0/lakeview/dashboards`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.showTrashed !== undefined) {
      params.append('show_trashed', String(req.showTrashed));
    }
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDashboardsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListDashboardsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listDashboardsIter(
    signal: AbortSignal | undefined,
    req: ListDashboardsRequest,
    options?: Options
  ): AsyncGenerator<Dashboard> {
    const pageReq: ListDashboardsRequest = {...req};
    for (;;) {
      const resp = await this.listDashboards(signal, pageReq, options);
      for (const item of resp.dashboards ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List dashboard schedules. */
  async listSchedules(
    signal: AbortSignal | undefined,
    req: ListSchedulesRequest,
    options?: Options
  ): Promise<ListSchedulesResponse> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSchedulesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListSchedulesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listSchedulesIter(
    signal: AbortSignal | undefined,
    req: ListSchedulesRequest,
    options?: Options
  ): AsyncGenerator<Schedule> {
    const pageReq: ListSchedulesRequest = {...req};
    for (;;) {
      const resp = await this.listSchedules(signal, pageReq, options);
      for (const item of resp.schedules ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List schedule subscriptions. */
  async listSubscriptions(
    signal: AbortSignal | undefined,
    req: ListSubscriptionsRequest,
    options?: Options
  ): Promise<ListSubscriptionsResponse> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}/subscriptions`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSubscriptionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListSubscriptionsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listSubscriptionsIter(
    signal: AbortSignal | undefined,
    req: ListSubscriptionsRequest,
    options?: Options
  ): AsyncGenerator<Subscription> {
    const pageReq: ListSubscriptionsRequest = {...req};
    for (;;) {
      const resp = await this.listSubscriptions(signal, pageReq, options);
      for (const item of resp.subscriptions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Migrates a classic SQL dashboard to Lakeview. */
  async migrateDashboard(
    signal: AbortSignal | undefined,
    req: MigrateDashboardRequest,
    options?: Options
  ): Promise<Dashboard> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/migrate`;
    const body = marshalRequest(req, marshalMigrateDashboardRequestSchema);
    let resp: Dashboard | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDashboardSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Publish the current draft dashboard. */
  async publishDashboard(
    signal: AbortSignal | undefined,
    req: PublishDashboardRequest,
    options?: Options
  ): Promise<PublishedDashboard> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/published`;
    const body = marshalRequest(req, marshalPublishDashboardRequestSchema);
    let resp: PublishedDashboard | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPublishedDashboardSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Revert a dashboard draft to its last published state. */
  async revertDashboard(
    signal: AbortSignal | undefined,
    req: RevertDashboardRequest,
    options?: Options
  ): Promise<RevertDashboardResponse> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/revert`;
    const body = marshalRequest(req, marshalRevertDashboardRequestSchema);
    let resp: RevertDashboardResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRevertDashboardResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Trash a dashboard. */
  async trashDashboard(
    signal: AbortSignal | undefined,
    req: TrashDashboardRequest,
    options?: Options
  ): Promise<TrashDashboardResponse> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}`;
    let resp: TrashDashboardResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTrashDashboardResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Unpublish the dashboard. */
  async unpublishDashboard(
    signal: AbortSignal | undefined,
    req: UnpublishDashboardRequest,
    options?: Options
  ): Promise<UnpublishDashboardResponse> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/published`;
    let resp: UnpublishDashboardResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUnpublishDashboardResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a draft dashboard. */
  async updateDashboard(
    signal: AbortSignal | undefined,
    req: UpdateDashboardRequest,
    options?: Options
  ): Promise<Dashboard> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.dashboard?.dashboardId ?? ''}`;
    const params = new URLSearchParams();
    if (req.datasetCatalog !== undefined) {
      params.append('dataset_catalog', req.datasetCatalog);
    }
    if (req.datasetSchema !== undefined) {
      params.append('dataset_schema', req.datasetSchema);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.dashboard, marshalDashboardSchema);
    let resp: Dashboard | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDashboardSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update dashboard schedule. */
  async updateSchedule(
    signal: AbortSignal | undefined,
    req: UpdateScheduleRequest,
    options?: Options
  ): Promise<Schedule> {
    const url = `${this.host}/api/2.0/lakeview/dashboards/${req.schedule?.dashboardId ?? ''}/schedules/${req.schedule?.scheduleId ?? ''}`;
    const body = marshalRequest(req.schedule, marshalScheduleSchema);
    let resp: Schedule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalScheduleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
