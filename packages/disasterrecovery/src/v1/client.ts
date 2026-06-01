// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from './transport';
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
  private readonly host: string;
  // Workspace ID used to route workspace-level calls on unified hosts (SPOG).
  // When set, workspace-level methods send X-Databricks-Org-Id on every
  // request.
  private readonly workspaceId: string | undefined;
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
    this.workspaceId = options.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Create a new failover group. */
  async createFailoverGroup(
    req: CreateFailoverGroupRequest,
    options?: CallOptions
  ): Promise<FailoverGroup> {
    const url = `${this.host}/api/disaster-recovery/v1/${req.parent ?? ''}/failover-groups`;
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
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
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
    const url = `${this.host}/api/disaster-recovery/v1/${req.parent ?? ''}/stable-urls`;
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
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
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

  /** Delete a failover group. */
  async deleteFailoverGroup(
    req: DeleteFailoverGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/disaster-recovery/v1/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
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
    const url = `${this.host}/api/disaster-recovery/v1/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Initiate a failover to a new primary region. */
  async failoverFailoverGroup(
    req: FailoverFailoverGroupRequest,
    options?: CallOptions
  ): Promise<FailoverGroup> {
    const url = `${this.host}/api/disaster-recovery/v1/${req.name ?? ''}/failover`;
    const body = marshalRequest(req, marshalFailoverFailoverGroupRequestSchema);
    let resp: FailoverGroup | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
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

  /** Get a failover group. */
  async getFailoverGroup(
    req: GetFailoverGroupRequest,
    options?: CallOptions
  ): Promise<FailoverGroup> {
    const url = `${this.host}/api/disaster-recovery/v1/${req.name ?? ''}`;
    let resp: FailoverGroup | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
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
    const url = `${this.host}/api/disaster-recovery/v1/${req.name ?? ''}`;
    let resp: StableUrl | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
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

  /** List failover groups. */
  async listFailoverGroups(
    req: ListFailoverGroupsRequest,
    options?: CallOptions
  ): Promise<ListFailoverGroupsResponse> {
    const url = `${this.host}/api/disaster-recovery/v1/${req.parent ?? ''}/failover-groups`;
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
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
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
    const url = `${this.host}/api/disaster-recovery/v1/${req.parent ?? ''}/stable-urls`;
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
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
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

  /** Update a failover group. */
  async updateFailoverGroup(
    req: UpdateFailoverGroupRequest,
    options?: CallOptions
  ): Promise<FailoverGroup> {
    const url = `${this.host}/api/disaster-recovery/v1/${req.failoverGroup?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.failoverGroup, marshalFailoverGroupSchema);
    let resp: FailoverGroup | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
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
