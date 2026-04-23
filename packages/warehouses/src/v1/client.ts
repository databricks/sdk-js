// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute, retryOn} from '@databricks/sdk-databricks/api';
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
  CreateDefaultWarehouseOverrideRequest,
  CreateWarehouse,
  CreateWarehouse_Response,
  DefaultWarehouseOverride,
  DeleteDefaultWarehouseOverrideRequest,
  DeleteWarehouseRequest,
  DeleteWarehouseRequest_Response,
  EditWarehouseRequest,
  EditWarehouseRequest_Response,
  EndpointInfo,
  GetDefaultWarehouseOverrideRequest,
  GetWarehouse,
  GetWarehouse_Response,
  GetWorkspaceWarehouseConfigRequest,
  GetWorkspaceWarehouseConfigRequest_Response,
  ListDefaultWarehouseOverridesRequest,
  ListDefaultWarehouseOverridesResponse,
  ListWarehousesRequest,
  ListWarehousesRequest_Response,
  SetWorkspaceWarehouseConfigRequest,
  SetWorkspaceWarehouseConfigRequest_Response,
  StartRequest,
  StartRequest_Response,
  StopRequest,
  StopRequest_Response,
  UpdateDefaultWarehouseOverrideRequest,
} from './model';
import {
  EndpointState,
  marshalCreateWarehouseSchema,
  marshalDefaultWarehouseOverrideSchema,
  marshalEditWarehouseRequestSchema,
  marshalSetWorkspaceWarehouseConfigRequestSchema,
  marshalStartRequestSchema,
  marshalStopRequestSchema,
  unmarshalCreateWarehouse_ResponseSchema,
  unmarshalDefaultWarehouseOverrideSchema,
  unmarshalDeleteWarehouseRequest_ResponseSchema,
  unmarshalEditWarehouseRequest_ResponseSchema,
  unmarshalGetWarehouse_ResponseSchema,
  unmarshalGetWorkspaceWarehouseConfigRequest_ResponseSchema,
  unmarshalListDefaultWarehouseOverridesResponseSchema,
  unmarshalListWarehousesRequest_ResponseSchema,
  unmarshalSetWorkspaceWarehouseConfigRequest_ResponseSchema,
  unmarshalStartRequest_ResponseSchema,
  unmarshalStopRequest_ResponseSchema,
} from './model';

class StillRunningError extends Error {}

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

  /**
   * Creates a new default warehouse override for a user.
   * Users can create their own override. Admins can create overrides for any user.
   */
  async createDefaultWarehouseOverride(
    signal: AbortSignal | undefined,
    req: CreateDefaultWarehouseOverrideRequest,
    options?: Options
  ): Promise<DefaultWarehouseOverride> {
    const url = `${this.host}/api/warehouses/v1/default-warehouse-overrides`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultWarehouseOverrideSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a new SQL warehouse. */
  async createWarehouse(
    signal: AbortSignal | undefined,
    req: CreateWarehouse,
    options?: Options
  ): Promise<CreateWarehouse_Response> {
    const url = `${this.host}/api/2.0/sql/warehouses`;
    const body = marshalRequest(req, marshalCreateWarehouseSchema);
    let resp: CreateWarehouse_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateWarehouse_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createWarehouseWaiter(
    signal: AbortSignal | undefined,
    req: CreateWarehouse,
    options?: Options
  ): Promise<CreateWarehouseWaiter> {
    const resp = await this.createWarehouse(signal, req, options);
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
    signal: AbortSignal | undefined,
    req: DeleteDefaultWarehouseOverrideRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/warehouses/v1/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Deletes a SQL warehouse. */
  async deleteWarehouse(
    signal: AbortSignal | undefined,
    req: DeleteWarehouseRequest,
    options?: Options
  ): Promise<DeleteWarehouseRequest_Response> {
    const url = `${this.host}/api/2.0/sql/warehouses/${req.id ?? ''}`;
    let resp: DeleteWarehouseRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteWarehouseRequest_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the configuration for a SQL warehouse. */
  async editWarehouse(
    signal: AbortSignal | undefined,
    req: EditWarehouseRequest,
    options?: Options
  ): Promise<EditWarehouseRequest_Response> {
    const url = `${this.host}/api/2.0/sql/warehouses/${req.id ?? ''}/edit`;
    const body = marshalRequest(req, marshalEditWarehouseRequestSchema);
    let resp: EditWarehouseRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalEditWarehouseRequest_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async editWarehouseWaiter(
    signal: AbortSignal | undefined,
    req: EditWarehouseRequest,
    options?: Options
  ): Promise<EditWarehouseWaiter> {
    await this.editWarehouse(signal, req, options);
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
    signal: AbortSignal | undefined,
    req: GetDefaultWarehouseOverrideRequest,
    options?: Options
  ): Promise<DefaultWarehouseOverride> {
    const url = `${this.host}/api/warehouses/v1/${req.name ?? ''}`;
    let resp: DefaultWarehouseOverride | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultWarehouseOverrideSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the information for a single SQL warehouse. */
  async getWarehouse(
    signal: AbortSignal | undefined,
    req: GetWarehouse,
    options?: Options
  ): Promise<GetWarehouse_Response> {
    const url = `${this.host}/api/2.0/sql/warehouses/${req.id ?? ''}`;
    let resp: GetWarehouse_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetWarehouse_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the workspace level configuration that is shared by all SQL warehouses in a workspace. */
  async getWorkspaceWarehouseConfig(
    signal: AbortSignal | undefined,
    _req: GetWorkspaceWarehouseConfigRequest,
    options?: Options
  ): Promise<GetWorkspaceWarehouseConfigRequest_Response> {
    const url = `${this.host}/api/2.0/sql/config/warehouses`;
    let resp: GetWorkspaceWarehouseConfigRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetWorkspaceWarehouseConfigRequest_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Lists all default warehouse overrides in the workspace.
   * Only workspace administrators can list all overrides.
   */
  async listDefaultWarehouseOverrides(
    signal: AbortSignal | undefined,
    req: ListDefaultWarehouseOverridesRequest,
    options?: Options
  ): Promise<ListDefaultWarehouseOverridesResponse> {
    const url = `${this.host}/api/warehouses/v1/default-warehouse-overrides`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListDefaultWarehouseOverridesResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listDefaultWarehouseOverridesIter(
    signal: AbortSignal | undefined,
    req: ListDefaultWarehouseOverridesRequest,
    options?: Options
  ): AsyncGenerator<DefaultWarehouseOverride> {
    const pageReq: ListDefaultWarehouseOverridesRequest = {...req};
    for (;;) {
      const resp = await this.listDefaultWarehouseOverrides(
        signal,
        pageReq,
        options
      );
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
    signal: AbortSignal | undefined,
    req: ListWarehousesRequest,
    options?: Options
  ): Promise<ListWarehousesRequest_Response> {
    const url = `${this.host}/api/2.0/sql/warehouses`;
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
    let resp: ListWarehousesRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListWarehousesRequest_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listWarehousesIter(
    signal: AbortSignal | undefined,
    req: ListWarehousesRequest,
    options?: Options
  ): AsyncGenerator<EndpointInfo> {
    const pageReq: ListWarehousesRequest = {...req};
    for (;;) {
      const resp = await this.listWarehouses(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: SetWorkspaceWarehouseConfigRequest,
    options?: Options
  ): Promise<SetWorkspaceWarehouseConfigRequest_Response> {
    const url = `${this.host}/api/2.0/sql/config/warehouses`;
    const body = marshalRequest(
      req,
      marshalSetWorkspaceWarehouseConfigRequestSchema
    );
    let resp: SetWorkspaceWarehouseConfigRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalSetWorkspaceWarehouseConfigRequest_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Starts a SQL warehouse. */
  async startWarehouse(
    signal: AbortSignal | undefined,
    req: StartRequest,
    options?: Options
  ): Promise<StartRequest_Response> {
    const url = `${this.host}/api/2.0/sql/warehouses/${req.id ?? ''}/start`;
    const body = marshalRequest(req, marshalStartRequestSchema);
    let resp: StartRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStartRequest_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async startWarehouseWaiter(
    signal: AbortSignal | undefined,
    req: StartRequest,
    options?: Options
  ): Promise<StartWarehouseWaiter> {
    await this.startWarehouse(signal, req, options);
    if (req.id === undefined) {
      throw new Error('request field id required for polling is missing');
    }
    return new StartWarehouseWaiter(this, req.id);
  }

  /** Stops a SQL warehouse. */
  async stopWarehouse(
    signal: AbortSignal | undefined,
    req: StopRequest,
    options?: Options
  ): Promise<StopRequest_Response> {
    const url = `${this.host}/api/2.0/sql/warehouses/${req.id ?? ''}/stop`;
    const body = marshalRequest(req, marshalStopRequestSchema);
    let resp: StopRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStopRequest_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async stopWarehouseWaiter(
    signal: AbortSignal | undefined,
    req: StopRequest,
    options?: Options
  ): Promise<StopWarehouseWaiter> {
    await this.stopWarehouse(signal, req, options);
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
    signal: AbortSignal | undefined,
    req: UpdateDefaultWarehouseOverrideRequest,
    options?: Options
  ): Promise<DefaultWarehouseOverride> {
    const url = `${this.host}/api/warehouses/v1/${req.defaultWarehouseOverride?.name ?? ''}`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultWarehouseOverrideSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CreateWarehouseWaiter {
  constructor(
    private readonly client: Client,
    readonly id: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetWarehouse_Response> {
    let result: GetWarehouse_Response | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWarehouse(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getWarehouse(
      signal,
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
    private readonly client: Client,
    readonly id: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetWarehouse_Response> {
    let result: GetWarehouse_Response | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWarehouse(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getWarehouse(
      signal,
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
    private readonly client: Client,
    readonly id: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetWarehouse_Response> {
    let result: GetWarehouse_Response | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWarehouse(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getWarehouse(
      signal,
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
    private readonly client: Client,
    readonly id: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetWarehouse_Response> {
    let result: GetWarehouse_Response | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getWarehouse(
        callSignal,
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
          result = pollResp;
          return;
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getWarehouse(
      signal,
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
