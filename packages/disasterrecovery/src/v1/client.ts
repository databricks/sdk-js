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
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateFailoverGroupRequest,
  CreateStableUrlRequest,
  DeleteFailoverGroupRequest,
  DeleteStableUrlRequest,
  FailoverFailoverGroupRequest,
  FailoverGroup,
  GetFailoverGroupRequest,
  GetStableUrlRequest,
  ListFailoverGroupsRequest,
  ListFailoverGroupsResponse,
  ListStableUrlsRequest,
  ListStableUrlsResponse,
  StableUrl,
  UpdateFailoverGroupRequest,
} from './model';
import {
  marshalFailoverFailoverGroupRequestSchema,
  marshalFailoverGroupSchema,
  marshalStableUrlSchema,
  unmarshalFailoverGroupSchema,
  unmarshalListFailoverGroupsResponseSchema,
  unmarshalListStableUrlsResponseSchema,
  unmarshalStableUrlSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class DisasterRecoveryClient {
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

  /**
   * Create a failover group. The group starts in the CREATING state and moves to
   * INITIAL_REPLICATION while the first replication cycle copies all in-scope data to the
   * secondary region; failover becomes available once the group is ACTIVE. Set validate_only
   * to check the request without creating anything.
   */
  async createFailoverGroup(
    req: CreateFailoverGroupRequest,
    options?: CallOptions
  ): Promise<FailoverGroup> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.parent ?? ''}/failover-groups`;
    const params = new URLSearchParams();
    if (req.validateOnly !== undefined) {
      params.append('validate_only', String(req.validateOnly));
    }
    if (req.failoverGroupId !== undefined) {
      params.append('failover_group_id', req.failoverGroupId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.failoverGroup, marshalFailoverGroupSchema);
    let resp: FailoverGroup | undefined;
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
      resp = parseResponse(respBody, unmarshalFailoverGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a new stable URL. */
  async createStableUrl(
    req: CreateStableUrlRequest,
    options?: CallOptions
  ): Promise<StableUrl> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.parent ?? ''}/stable-urls`;
    const params = new URLSearchParams();
    if (req.validateOnly !== undefined) {
      params.append('validate_only', String(req.validateOnly));
    }
    if (req.stableUrlId !== undefined) {
      params.append('stable_url_id', req.stableUrlId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.stableUrl, marshalStableUrlSchema);
    let resp: StableUrl | undefined;
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
      resp = parseResponse(respBody, unmarshalStableUrlSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Delete a failover group. Deleting stops replication for the group; stable URLs linked
   * to it are detached but not deleted.
   */
  async deleteFailoverGroup(
    req: DeleteFailoverGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.name ?? ''}`;
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

  /** Delete a stable URL. */
  async deleteStableUrl(
    req: DeleteStableUrlRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Initiate a failover that makes target_primary_region the primary region. Stable URLs
   * linked to the group are pointed at the new primary workspace, replication is reversed so
   * that the former primary becomes the secondary, and the group moves through FAILING_OVER
   * to INITIAL_REPLICATION until it has a replication point in the new direction. The group
   * must be ACTIVE; repeating the request while it is FAILING_OVER is accepted. To fail back,
   * repeat the request with the former primary region as the target once the group is ACTIVE
   * again. In an unplanned failover, data written after the replication point can be lost.
   */
  async failoverFailoverGroup(
    req: FailoverFailoverGroupRequest,
    options?: CallOptions
  ): Promise<FailoverGroup> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.name ?? ''}/failover`;
    const body = marshalRequest(req, marshalFailoverFailoverGroupRequestSchema);
    let resp: FailoverGroup | undefined;
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
      resp = parseResponse(respBody, unmarshalFailoverGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a failover group, including its current state and replication point. */
  async getFailoverGroup(
    req: GetFailoverGroupRequest,
    options?: CallOptions
  ): Promise<FailoverGroup> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.name ?? ''}`;
    let resp: FailoverGroup | undefined;
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
      resp = parseResponse(respBody, unmarshalFailoverGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a stable URL. */
  async getStableUrl(
    req: GetStableUrlRequest,
    options?: CallOptions
  ): Promise<StableUrl> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.name ?? ''}`;
    let resp: StableUrl | undefined;
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
      resp = parseResponse(respBody, unmarshalStableUrlSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * List the failover groups in an account.
   *
   * List entries are abbreviated: `state`, `replication_point` and
   * `unity_catalog_assets.location_mappings` are not populated. Call GetFailoverGroup to
   * retrieve the full resource.
   */
  async listFailoverGroups(
    req: ListFailoverGroupsRequest,
    options?: CallOptions
  ): Promise<ListFailoverGroupsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.parent ?? ''}/failover-groups`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFailoverGroupsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListFailoverGroupsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listFailoverGroupsIter(
    req: ListFailoverGroupsRequest,
    options?: CallOptions
  ): AsyncGenerator<FailoverGroup> {
    const pageReq: ListFailoverGroupsRequest = {...req};
    for (;;) {
      const resp = await this.listFailoverGroups(pageReq, options);
      for (const item of resp.failoverGroups ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List stable URLs for an account. */
  async listStableUrls(
    req: ListStableUrlsRequest,
    options?: CallOptions
  ): Promise<ListStableUrlsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.parent ?? ''}/stable-urls`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListStableUrlsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListStableUrlsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listStableUrlsIter(
    req: ListStableUrlsRequest,
    options?: CallOptions
  ): AsyncGenerator<StableUrl> {
    const pageReq: ListStableUrlsRequest = {...req};
    for (;;) {
      const resp = await this.listStableUrls(pageReq, options);
      for (const item of resp.stableUrls ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Update a failover group. Only the fields named in update_mask change. You can turn
   * workspace asset replication on or off, attach or detach a stable URL, and change the
   * Unity Catalog catalogs and location mappings; the regions, the workspace set name and
   * the workspace IDs cannot be changed. Updates are rejected while a create, failover or
   * delete is in progress, and after a create or delete has failed.
   */
  async updateFailoverGroup(
    req: UpdateFailoverGroupRequest,
    options?: CallOptions
  ): Promise<FailoverGroup> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/disaster-recovery/v1/${req.failoverGroup?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.failoverGroup, marshalFailoverGroupSchema);
    let resp: FailoverGroup | undefined;
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
      resp = parseResponse(respBody, unmarshalFailoverGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
