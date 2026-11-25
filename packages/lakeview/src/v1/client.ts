// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  encodePathVariable,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateDashboardRequest,
  CreateScheduleRequest,
  CreateSubscriptionRequest,
  Dashboard,
  DeleteScheduleRequest,
  DeleteSubscriptionRequest,
  GetDashboardRequest,
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
  marshalDashboardCreateSchema,
  marshalDashboardSchema,
  marshalMigrateDashboardRequestSchema,
  marshalPublishDashboardRequestSchema,
  marshalRevertDashboardRequestSchema,
  marshalScheduleCreateSchema,
  marshalScheduleSchema,
  marshalSubscriptionCreateSchema,
  unmarshalDashboardSchema,
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

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class LakeviewClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
    return this.config;
  }

  /** Create a draft dashboard. */
  async createDashboard(
    req: CreateDashboardRequest,
    options?: CallOptions
  ): Promise<Dashboard> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards`;
    const params = new URLSearchParams();
    if (req.datasetCatalog !== undefined) {
      params.append('dataset_catalog', req.datasetCatalog);
    }
    if (req.datasetSchema !== undefined) {
      params.append('dataset_schema', req.datasetSchema);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.dashboard === undefined
        ? 'null'
        : marshalRequest(req.dashboard, marshalDashboardCreateSchema);
    let resp: Dashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDashboardSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a schedule for a dashboard. The dashboard must be published before a schedule can be
   * created for it.
   *
   * Requires the [Databricks SQL access](https://docs.databricks.com/security/auth/entitlements)
   * entitlement. Grant Databricks SQL access in addition to Workspace access.
   */
  async createSchedule(
    req: CreateScheduleRequest,
    options?: CallOptions
  ): Promise<Schedule> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.schedule?.dashboardId ?? '')}/schedules`;
    const body =
      req.schedule === undefined
        ? 'null'
        : marshalRequest(req.schedule, marshalScheduleCreateSchema);
    let resp: Schedule | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalScheduleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Create schedule subscription. Subscribes a workspace user or a notification destination to the
   * schedule, so that it receives a snapshot of the dashboard each time the schedule runs.
   * Subscribing yourself requires CAN VIEW permission on the dashboard; subscribing another user or a
   * notification destination requires CAN EDIT. On dashboards published without embedded
   * credentials, you can only subscribe yourself. If the subscriber is already subscribed to the
   * schedule, the existing subscription is returned.
   *
   * The caller must be a workspace user with one of the following
   * [entitlements](https://docs.databricks.com/security/auth/entitlements):
   * Workspace access, Databricks SQL access, or Consumer access.
   *
   * Account-level users who are not members of the workspace cannot call this
   * endpoint, even if the dashboard has been shared with them.
   */
  async createSubscription(
    req: CreateSubscriptionRequest,
    options?: CallOptions
  ): Promise<Subscription> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.subscription?.dashboardId ?? '')}/schedules/${encodePathVariable(req.subscription?.scheduleId ?? '')}/subscriptions`;
    const body =
      req.subscription === undefined
        ? 'null'
        : marshalRequest(req.subscription, marshalSubscriptionCreateSchema);
    let resp: Subscription | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSubscriptionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a schedule together with all of its subscriptions.
   *
   * Requires the [Databricks SQL access](https://docs.databricks.com/security/auth/entitlements)
   * entitlement. Grant Databricks SQL access in addition to Workspace access.
   */
  async deleteSchedule(
    req: DeleteScheduleRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    if (req.scheduleId === undefined) {
      throw new Error('path parameter "schedule_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/schedules/${encodePathVariable(req.scheduleId)}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Delete schedule subscription. The subscriber receives no further snapshots from the schedule.
   * Deleting your own subscription requires CAN VIEW permission on the dashboard; deleting another
   * user's or a notification destination's subscription requires CAN EDIT.
   *
   * The caller must be a workspace user with one of the following
   * [entitlements](https://docs.databricks.com/security/auth/entitlements):
   * Workspace access, Databricks SQL access, or Consumer access.
   *
   * Account-level users who are not members of the workspace cannot call this
   * endpoint, even if the dashboard has been shared with them.
   */
  async deleteSubscription(
    req: DeleteSubscriptionRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    if (req.scheduleId === undefined) {
      throw new Error('path parameter "schedule_id" is required');
    }
    if (req.subscriptionId === undefined) {
      throw new Error('path parameter "subscription_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/schedules/${encodePathVariable(req.scheduleId)}/subscriptions/${encodePathVariable(req.subscriptionId)}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Get a draft dashboard. */
  async getDashboard(
    req: GetDashboardRequest,
    options?: CallOptions
  ): Promise<Dashboard> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}`;
    let resp: Dashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDashboardSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get the current published dashboard. The request fails with NOT_FOUND if the dashboard has
   * never been published or has been unpublished.
   *
   * The caller must be a workspace user with one of the following entitlements:
   * Workspace access, Databricks SQL access, or Consumer access.
   *
   * Account-level users who are not members of the workspace cannot call this
   * endpoint, even if the dashboard has been shared with them.
   */
  async getPublishedDashboard(
    req: GetPublishedDashboardRequest,
    options?: CallOptions
  ): Promise<PublishedDashboard> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/published`;
    let resp: PublishedDashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPublishedDashboardSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get the OAuth scope and authorization details needed to mint a token that is scoped to viewing
   * the published dashboard, for example to embed it in an external application. Pass the response
   * fields, with `authorization_details` serialized as a JSON string, to the workspace OAuth token
   * endpoint with the `client_credentials` grant to mint the token. See
   * [Embedding for external users](https://docs.databricks.com/dashboards/share/embedding/external-embed).
   *
   * The caller must be a workspace user with one of the following entitlements:
   * Workspace access, Databricks SQL access, or Consumer access.
   *
   * Account-level users who are not members of the workspace cannot call this
   * endpoint, even if the dashboard has been shared with them.
   */
  async getPublishedDashboardTokenInfo(
    req: GetPublishedDashboardTokenInfoRequest,
    options?: CallOptions
  ): Promise<GetPublishedDashboardTokenInfoResponse> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/published/tokeninfo`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPublishedDashboardTokenInfoResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get dashboard schedule.
   *
   * The caller must be a workspace user with one of the following
   * [entitlements](https://docs.databricks.com/security/auth/entitlements):
   * Workspace access, Databricks SQL access, or Consumer access.
   *
   * Account-level users who are not members of the workspace cannot call this
   * endpoint, even if the dashboard has been shared with them.
   */
  async getSchedule(
    req: GetScheduleRequest,
    options?: CallOptions
  ): Promise<Schedule> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    if (req.scheduleId === undefined) {
      throw new Error('path parameter "schedule_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/schedules/${encodePathVariable(req.scheduleId)}`;
    let resp: Schedule | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalScheduleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get schedule subscription.
   *
   * The caller must be a workspace user with one of the following
   * [entitlements](https://docs.databricks.com/security/auth/entitlements):
   * Workspace access, Databricks SQL access, or Consumer access.
   *
   * Account-level users who are not members of the workspace cannot call this
   * endpoint, even if the dashboard has been shared with them.
   */
  async getSubscription(
    req: GetSubscriptionRequest,
    options?: CallOptions
  ): Promise<Subscription> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    if (req.scheduleId === undefined) {
      throw new Error('path parameter "schedule_id" is required');
    }
    if (req.subscriptionId === undefined) {
      throw new Error('path parameter "subscription_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/schedules/${encodePathVariable(req.scheduleId)}/subscriptions/${encodePathVariable(req.subscriptionId)}`;
    let resp: Subscription | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSubscriptionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * List the dashboards that the caller can view. Each entry carries summary metadata only; use
   * Get dashboard to retrieve a dashboard's full definition.
   */
  async listDashboards(
    req: ListDashboardsRequest,
    options?: CallOptions
  ): Promise<ListDashboardsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListDashboardsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listDashboardsIter(
    req: ListDashboardsRequest,
    options?: CallOptions
  ): AsyncGenerator<Dashboard> {
    const pageReq: ListDashboardsRequest = {...req};
    for (;;) {
      const resp = await this.listDashboards(pageReq, options);
      for (const item of resp.dashboards ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * List dashboard schedules.
   *
   * The caller must be a workspace user with one of the following
   * [entitlements](https://docs.databricks.com/security/auth/entitlements):
   * Workspace access, Databricks SQL access, or Consumer access.
   *
   * Account-level users who are not members of the workspace cannot call this
   * endpoint, even if the dashboard has been shared with them.
   */
  async listSchedules(
    req: ListSchedulesRequest,
    options?: CallOptions
  ): Promise<ListSchedulesResponse> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/schedules`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListSchedulesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listSchedulesIter(
    req: ListSchedulesRequest,
    options?: CallOptions
  ): AsyncGenerator<Schedule> {
    const pageReq: ListSchedulesRequest = {...req};
    for (;;) {
      const resp = await this.listSchedules(pageReq, options);
      for (const item of resp.schedules ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * List schedule subscriptions.
   *
   * The caller must be a workspace user with one of the following
   * [entitlements](https://docs.databricks.com/security/auth/entitlements):
   * Workspace access, Databricks SQL access, or Consumer access.
   *
   * Account-level users who are not members of the workspace cannot call this
   * endpoint, even if the dashboard has been shared with them.
   */
  async listSubscriptions(
    req: ListSubscriptionsRequest,
    options?: CallOptions
  ): Promise<ListSubscriptionsResponse> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    if (req.scheduleId === undefined) {
      throw new Error('path parameter "schedule_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/schedules/${encodePathVariable(req.scheduleId)}/subscriptions`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListSubscriptionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listSubscriptionsIter(
    req: ListSubscriptionsRequest,
    options?: CallOptions
  ): AsyncGenerator<Subscription> {
    const pageReq: ListSubscriptionsRequest = {...req};
    for (;;) {
      const resp = await this.listSubscriptions(pageReq, options);
      for (const item of resp.subscriptions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Deprecated: Legacy dashboard migration is no longer supported. Use Lakeview (AI/BI)
   * dashboards instead.
   */
  async migrateDashboard(
    req: MigrateDashboardRequest,
    options?: CallOptions
  ): Promise<Dashboard> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/migrate`;
    const body = marshalRequest(req, marshalMigrateDashboardRequestSchema);
    let resp: Dashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDashboardSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Publish the current draft dashboard. */
  async publishDashboard(
    req: PublishDashboardRequest,
    options?: CallOptions
  ): Promise<PublishedDashboard> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/published`;
    const body = marshalRequest(req, marshalPublishDashboardRequestSchema);
    let resp: PublishedDashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPublishedDashboardSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Revert a dashboard's definition in draft mode to the last published version. The draft's
   * datasets, pages and widgets are replaced with those of the current published version, and the
   * updated draft is returned. The dashboard must have been published at least once; the published
   * version itself is not changed.
   */
  async revertDashboard(
    req: RevertDashboardRequest,
    options?: CallOptions
  ): Promise<RevertDashboardResponse> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/revert`;
    const body = marshalRequest(req, marshalRevertDashboardRequestSchema);
    let resp: RevertDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRevertDashboardResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Trash a dashboard. */
  async trashDashboard(
    req: TrashDashboardRequest,
    options?: CallOptions
  ): Promise<TrashDashboardResponse> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}`;
    let resp: TrashDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTrashDashboardResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Unpublish the dashboard. This deletes the published version, so viewers can no longer open
   * it, and pauses the dashboard's schedules. The draft is not changed; publish it again to make
   * the dashboard available to viewers.
   */
  async unpublishDashboard(
    req: UnpublishDashboardRequest,
    options?: CallOptions
  ): Promise<UnpublishDashboardResponse> {
    if (req.dashboardId === undefined) {
      throw new Error('path parameter "dashboard_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboardId)}/published`;
    let resp: UnpublishDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUnpublishDashboardResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update a draft dashboard. */
  async updateDashboard(
    req: UpdateDashboardRequest,
    options?: CallOptions
  ): Promise<Dashboard> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.dashboard?.dashboardId ?? '')}`;
    const params = new URLSearchParams();
    if (req.datasetCatalog !== undefined) {
      params.append('dataset_catalog', req.datasetCatalog);
    }
    if (req.datasetSchema !== undefined) {
      params.append('dataset_schema', req.datasetSchema);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.dashboard === undefined
        ? 'null'
        : marshalRequest(req.dashboard, marshalDashboardSchema);
    let resp: Dashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDashboardSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a schedule. The request body replaces the stored schedule, so fields omitted from the
   * body are reset to their defaults.
   *
   * Requires the [Databricks SQL access](https://docs.databricks.com/security/auth/entitlements)
   * entitlement. Grant Databricks SQL access in addition to Workspace access.
   */
  async updateSchedule(
    req: UpdateScheduleRequest,
    options?: CallOptions
  ): Promise<Schedule> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${encodePathVariable(req.schedule?.dashboardId ?? '')}/schedules/${encodePathVariable(req.schedule?.scheduleId ?? '')}`;
    const body =
      req.schedule === undefined
        ? 'null'
        : marshalRequest(req.schedule, marshalScheduleSchema);
    let resp: Schedule | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalScheduleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
