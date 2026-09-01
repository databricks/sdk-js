// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
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
  marshalDashboardSchema,
  marshalMigrateDashboardRequestSchema,
  marshalPublishDashboardRequestSchema,
  marshalRevertDashboardRequestSchema,
  marshalScheduleSchema,
  marshalSubscriptionSchema,
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
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /**
   * Create a draft dashboard.
   *
   * Requires the Databricks SQL access entitlement.
   */
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
    const body = marshalRequest(req.dashboard, marshalDashboardSchema);
    let resp: Dashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /** Create dashboard schedule. */
  async createSchedule(
    req: CreateScheduleRequest,
    options?: CallOptions
  ): Promise<Schedule> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.schedule?.dashboardId ?? ''}/schedules`;
    const body = marshalRequest(req.schedule, marshalScheduleSchema);
    let resp: Schedule | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /** Create schedule subscription. */
  async createSubscription(
    req: CreateSubscriptionRequest,
    options?: CallOptions
  ): Promise<Subscription> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.subscription?.dashboardId ?? ''}/schedules/${req.subscription?.scheduleId ?? ''}/subscriptions`;
    const body = marshalRequest(req.subscription, marshalSubscriptionSchema);
    let resp: Subscription | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /** Delete dashboard schedule. */
  async deleteSchedule(
    req: DeleteScheduleRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Delete schedule subscription. */
  async deleteSubscription(
    req: DeleteSubscriptionRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}/subscriptions/${req.subscriptionId ?? ''}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
   * Get a draft dashboard.
   *
   * Requires the Databricks SQL access entitlement.
   */
  async getDashboard(
    req: GetDashboardRequest,
    options?: CallOptions
  ): Promise<Dashboard> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}`;
    let resp: Dashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
   * Get the current published dashboard.
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/published`;
    let resp: PublishedDashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
   * Get a required authorization details and scopes of a published dashboard to mint an OAuth token.
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/published/tokeninfo`;
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
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /** Get dashboard schedule. */
  async getSchedule(
    req: GetScheduleRequest,
    options?: CallOptions
  ): Promise<Schedule> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}`;
    let resp: Schedule | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /** Get schedule subscription. */
  async getSubscription(
    req: GetSubscriptionRequest,
    options?: CallOptions
  ): Promise<Subscription> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}/subscriptions/${req.subscriptionId ?? ''}`;
    let resp: Subscription | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
   * List dashboards.
   *
   * Requires the Databricks SQL access entitlement.
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
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /** List dashboard schedules. */
  async listSchedules(
    req: ListSchedulesRequest,
    options?: CallOptions
  ): Promise<ListSchedulesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules`;
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
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /** List schedule subscriptions. */
  async listSubscriptions(
    req: ListSubscriptionsRequest,
    options?: CallOptions
  ): Promise<ListSubscriptionsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/schedules/${req.scheduleId ?? ''}/subscriptions`;
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
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /** Migrates a classic SQL dashboard to Lakeview. */
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
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /**
   * Publish the current draft dashboard.
   *
   * Requires the Databricks SQL access entitlement.
   */
  async publishDashboard(
    req: PublishDashboardRequest,
    options?: CallOptions
  ): Promise<PublishedDashboard> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/published`;
    const body = marshalRequest(req, marshalPublishDashboardRequestSchema);
    let resp: PublishedDashboard | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
   * Revert a dashboard's definition in draft mode to the last published version.
   *
   * Requires the Databricks SQL access entitlement.
   */
  async revertDashboard(
    req: RevertDashboardRequest,
    options?: CallOptions
  ): Promise<RevertDashboardResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/revert`;
    const body = marshalRequest(req, marshalRevertDashboardRequestSchema);
    let resp: RevertDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /**
   * Trash a dashboard.
   *
   * Requires the Databricks SQL access entitlement.
   */
  async trashDashboard(
    req: TrashDashboardRequest,
    options?: CallOptions
  ): Promise<TrashDashboardResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}`;
    let resp: TrashDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
   * Unpublish the dashboard.
   *
   * Requires the Databricks SQL access entitlement.
   */
  async unpublishDashboard(
    req: UnpublishDashboardRequest,
    options?: CallOptions
  ): Promise<UnpublishDashboardResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboardId ?? ''}/published`;
    let resp: UnpublishDashboardResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /**
   * Update a draft dashboard.
   *
   * Requires the Databricks SQL access entitlement.
   */
  async updateDashboard(
    req: UpdateDashboardRequest,
    options?: CallOptions
  ): Promise<Dashboard> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.dashboard?.dashboardId ?? ''}`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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

  /** Update dashboard schedule. */
  async updateSchedule(
    req: UpdateScheduleRequest,
    options?: CallOptions
  ): Promise<Schedule> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakeview/dashboards/${req.schedule?.dashboardId ?? ''}/schedules/${req.schedule?.scheduleId ?? ''}`;
    const body = marshalRequest(req.schedule, marshalScheduleSchema);
    let resp: Schedule | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
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
