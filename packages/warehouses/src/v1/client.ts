// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {LroOptions} from '@databricks/sdk-options/lro';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateDefaultWarehouseOverrideRequest,
  CreateWarehouseRequest,
  CreateWarehouseResponse,
  DefaultWarehouseOverride,
  DeleteDefaultWarehouseOverrideRequest,
  DeleteWarehouseRequest,
  DeleteWarehouseResponse,
  EditWarehouseRequest,
  EditWarehouseResponse,
  EndpointInfo,
  GetDefaultWarehouseOverrideRequest,
  GetWarehouseRequest,
  GetWarehouseResponse,
  GetWorkspaceWarehouseConfigRequest,
  GetWorkspaceWarehouseConfigResponse,
  ListDefaultWarehouseOverridesRequest,
  ListDefaultWarehouseOverridesResponse,
  ListWarehousesRequest,
  ListWarehousesResponse,
  SetWorkspaceWarehouseConfigRequest,
  SetWorkspaceWarehouseConfigResponse,
  StartRequest,
  StartResponse,
  StopRequest,
  StopResponse,
  UpdateDefaultWarehouseOverrideRequest,
} from './model';
import {
  EndpointState,
  marshalCreateWarehouseRequestSchema,
  marshalDefaultWarehouseOverrideSchema,
  marshalEditWarehouseRequestSchema,
  marshalSetWorkspaceWarehouseConfigRequestSchema,
  marshalStartRequestSchema,
  marshalStopRequestSchema,
  unmarshalCreateWarehouseResponseSchema,
  unmarshalDefaultWarehouseOverrideSchema,
  unmarshalDeleteWarehouseResponseSchema,
  unmarshalEditWarehouseResponseSchema,
  unmarshalGetWarehouseResponseSchema,
  unmarshalGetWorkspaceWarehouseConfigResponseSchema,
  unmarshalListDefaultWarehouseOverridesResponseSchema,
  unmarshalListWarehousesResponseSchema,
  unmarshalSetWorkspaceWarehouseConfigResponseSchema,
  unmarshalStartResponseSchema,
  unmarshalStopResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class WarehousesClient {
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
   * Creates a new default warehouse override for a user.
   * Users can create their own override. Admins can create overrides for any user.
   */
  async createDefaultWarehouseOverride(
    req: CreateDefaultWarehouseOverrideRequest,
    options?: CallOptions
  ): Promise<DefaultWarehouseOverride> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/warehouses/v1/default-warehouse-overrides`;
    const params = new URLSearchParams();
    if (req.defaultWarehouseOverrideId !== undefined) {
      params.append(
        'default_warehouse_override_id',
        req.defaultWarehouseOverrideId
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.defaultWarehouseOverride,
      marshalDefaultWarehouseOverrideSchema
    );
    let resp: DefaultWarehouseOverride | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
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
      resp = parseResponse(respBody, unmarshalDefaultWarehouseOverrideSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a new SQL warehouse. */
  private async createWarehouse(
    req: CreateWarehouseRequest,
    options?: CallOptions
  ): Promise<CreateWarehouseResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/sql/warehouses`;
    const body = marshalRequest(req, marshalCreateWarehouseRequestSchema);
    let resp: CreateWarehouseResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateWarehouseResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async createWarehouseWaiter(
    req: CreateWarehouseRequest,
    options?: CallOptions
  ): Promise<CreateWarehouseWaiter> {
    const resp = await this.createWarehouse(req, options);
    if (resp.id === undefined) {
      throw new Error('response field id required for polling is missing');
    }
    return new CreateWarehouseWaiter(this, resp.id);
  }

  /**
   * Deletes the default warehouse override for a user.
   * Users can delete their own override. Admins can delete overrides for any user.
   * After deletion, the workspace default warehouse will be used.
   */
  async deleteDefaultWarehouseOverride(
    req: DeleteDefaultWarehouseOverrideRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/warehouses/v1/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Deletes a SQL warehouse. */
  async deleteWarehouse(
    req: DeleteWarehouseRequest,
    options?: CallOptions
  ): Promise<DeleteWarehouseResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/sql/warehouses/${req.id ?? ''}`;
    let resp: DeleteWarehouseResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteWarehouseResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the configuration for a SQL warehouse. */
  private async editWarehouse(
    req: EditWarehouseRequest,
    options?: CallOptions
  ): Promise<EditWarehouseResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/sql/warehouses/${req.id ?? ''}/edit`;
    const body = marshalRequest(req, marshalEditWarehouseRequestSchema);
    let resp: EditWarehouseResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEditWarehouseResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async editWarehouseWaiter(
    req: EditWarehouseRequest,
    options?: CallOptions
  ): Promise<EditWarehouseWaiter> {
    await this.editWarehouse(req, options);
    if (req.id === undefined) {
      throw new Error('request field id required for polling is missing');
    }
    return new EditWarehouseWaiter(this, req.id);
  }

  /**
   * Returns the default warehouse override for a user.
   * Users can fetch their own override. Admins can fetch overrides for any user.
   * If no override exists, the UI will fallback to the workspace default warehouse.
   */
  async getDefaultWarehouseOverride(
    req: GetDefaultWarehouseOverrideRequest,
    options?: CallOptions
  ): Promise<DefaultWarehouseOverride> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/warehouses/v1/${req.name ?? ''}`;
    let resp: DefaultWarehouseOverride | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultWarehouseOverrideSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets the information for a single SQL warehouse. */
  async getWarehouse(
    req: GetWarehouseRequest,
    options?: CallOptions
  ): Promise<GetWarehouseResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/sql/warehouses/${req.id ?? ''}`;
    let resp: GetWarehouseResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetWarehouseResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets the workspace level configuration that is shared by all SQL warehouses in a workspace. */
  async getWorkspaceWarehouseConfig(
    _req: GetWorkspaceWarehouseConfigRequest,
    options?: CallOptions
  ): Promise<GetWorkspaceWarehouseConfigResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/sql/config/warehouses`;
    let resp: GetWorkspaceWarehouseConfigResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetWorkspaceWarehouseConfigResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists all default warehouse overrides in the workspace.
   * Only workspace administrators can list all overrides.
   */
  async listDefaultWarehouseOverrides(
    req: ListDefaultWarehouseOverridesRequest,
    options?: CallOptions
  ): Promise<ListDefaultWarehouseOverridesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/warehouses/v1/default-warehouse-overrides`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDefaultWarehouseOverridesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
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
        unmarshalListDefaultWarehouseOverridesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listDefaultWarehouseOverridesIter(
    req: ListDefaultWarehouseOverridesRequest,
    options?: CallOptions
  ): AsyncGenerator<DefaultWarehouseOverride> {
    const pageReq: ListDefaultWarehouseOverridesRequest = {...req};
    for (;;) {
      const resp = await this.listDefaultWarehouseOverrides(pageReq, options);
      for (const item of resp.defaultWarehouseOverrides ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists all SQL warehouses that a user has access to. */
  async listWarehouses(
    req: ListWarehousesRequest,
    options?: CallOptions
  ): Promise<ListWarehousesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/sql/warehouses`;
    const params = new URLSearchParams();
    if (req.runAsUserId !== undefined) {
      params.append('run_as_user_id', String(req.runAsUserId));
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListWarehousesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListWarehousesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listWarehousesIter(
    req: ListWarehousesRequest,
    options?: CallOptions
  ): AsyncGenerator<EndpointInfo> {
    const pageReq: ListWarehousesRequest = {...req};
    for (;;) {
      const resp = await this.listWarehouses(pageReq, options);
      for (const item of resp.warehouses ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Sets the workspace level configuration that is shared by all SQL warehouses in a workspace. */
  async setWorkspaceWarehouseConfig(
    req: SetWorkspaceWarehouseConfigRequest,
    options?: CallOptions
  ): Promise<SetWorkspaceWarehouseConfigResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/sql/config/warehouses`;
    const body = marshalRequest(
      req,
      marshalSetWorkspaceWarehouseConfigRequestSchema
    );
    let resp: SetWorkspaceWarehouseConfigResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalSetWorkspaceWarehouseConfigResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Starts a SQL warehouse. */
  private async startWarehouse(
    req: StartRequest,
    options?: CallOptions
  ): Promise<StartResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/sql/warehouses/${req.id ?? ''}/start`;
    const body = marshalRequest(req, marshalStartRequestSchema);
    let resp: StartResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStartResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async startWarehouseWaiter(
    req: StartRequest,
    options?: CallOptions
  ): Promise<StartWarehouseWaiter> {
    await this.startWarehouse(req, options);
    if (req.id === undefined) {
      throw new Error('request field id required for polling is missing');
    }
    return new StartWarehouseWaiter(this, req.id);
  }

  /** Stops a SQL warehouse. */
  private async stopWarehouse(
    req: StopRequest,
    options?: CallOptions
  ): Promise<StopResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/sql/warehouses/${req.id ?? ''}/stop`;
    const body = marshalRequest(req, marshalStopRequestSchema);
    let resp: StopResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStopResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async stopWarehouseWaiter(
    req: StopRequest,
    options?: CallOptions
  ): Promise<StopWarehouseWaiter> {
    await this.stopWarehouse(req, options);
    if (req.id === undefined) {
      throw new Error('request field id required for polling is missing');
    }
    return new StopWarehouseWaiter(this, req.id);
  }

  /**
   * Updates an existing default warehouse override for a user.
   * Users can update their own override. Admins can update overrides for any user.
   */
  async updateDefaultWarehouseOverride(
    req: UpdateDefaultWarehouseOverrideRequest,
    options?: CallOptions
  ): Promise<DefaultWarehouseOverride> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/warehouses/v1/${req.defaultWarehouseOverride?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.allowMissing !== undefined) {
      params.append('allow_missing', String(req.allowMissing));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.defaultWarehouseOverride,
      marshalDefaultWarehouseOverrideSchema
    );
    let resp: DefaultWarehouseOverride | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
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
      resp = parseResponse(respBody, unmarshalDefaultWarehouseOverrideSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}

export class CreateWarehouseWaiter {
  constructor(
    private readonly client: WarehousesClient,
    readonly id: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetWarehouseResponse> {
    let result: GetWarehouseResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWarehouse(
        {
          id: this.id,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case EndpointState.RUNNING:
          result = pollResp;
          return;
        case EndpointState.STOPPED:
        case EndpointState.DELETED: {
          const msg = pollResp.health?.summary ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getWarehouse(
      {
        id: this.id,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case EndpointState.RUNNING:
      case EndpointState.STOPPED:
      case EndpointState.DELETED:
        return true;
      default:
        return false;
    }
  }
}

export class EditWarehouseWaiter {
  constructor(
    private readonly client: WarehousesClient,
    readonly id: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetWarehouseResponse> {
    let result: GetWarehouseResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWarehouse(
        {
          id: this.id,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case EndpointState.RUNNING:
          result = pollResp;
          return;
        case EndpointState.STOPPED:
        case EndpointState.DELETED: {
          const msg = pollResp.health?.summary ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getWarehouse(
      {
        id: this.id,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case EndpointState.RUNNING:
      case EndpointState.STOPPED:
      case EndpointState.DELETED:
        return true;
      default:
        return false;
    }
  }
}

export class StartWarehouseWaiter {
  constructor(
    private readonly client: WarehousesClient,
    readonly id: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetWarehouseResponse> {
    let result: GetWarehouseResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWarehouse(
        {
          id: this.id,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case EndpointState.RUNNING:
          result = pollResp;
          return;
        case EndpointState.STOPPED:
        case EndpointState.DELETED: {
          const msg = pollResp.health?.summary ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getWarehouse(
      {
        id: this.id,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case EndpointState.RUNNING:
      case EndpointState.STOPPED:
      case EndpointState.DELETED:
        return true;
      default:
        return false;
    }
  }
}

export class StopWarehouseWaiter {
  constructor(
    private readonly client: WarehousesClient,
    readonly id: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetWarehouseResponse> {
    let result: GetWarehouseResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWarehouse(
        {
          id: this.id,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case EndpointState.STOPPED:
          result = pollResp;
          return;
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getWarehouse(
      {
        id: this.id,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case EndpointState.STOPPED:
        return true;
      default:
        return false;
    }
  }
}
