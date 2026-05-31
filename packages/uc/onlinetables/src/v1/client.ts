// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {retryOn} from '@databricks/sdk-core/api';
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
  CreateOnlineTableRequest,
  DeleteOnlineTableRequest,
  GetOnlineTableRequest,
  OnlineTable,
} from './model';
import {
  ProvisioningInfo_State,
  marshalOnlineTableSchema,
  unmarshalOnlineTableSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

class StillRunningError extends Error {}

export class OnlineTablesClient {
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

  /** Create a new Online Table. */
  async createOnlineTable(
    req: CreateOnlineTableRequest,
    options?: CallOptions
  ): Promise<OnlineTable> {
    const url = `${this.host}/api/2.0/online-tables`;
    const body = marshalRequest(req.table, marshalOnlineTableSchema);
    let resp: OnlineTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(respBody, unmarshalOnlineTableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createOnlineTableWaiter(
    req: CreateOnlineTableRequest,
    options?: CallOptions
  ): Promise<CreateOnlineTableWaiter> {
    const resp = await this.createOnlineTable(req, options);
    if (resp.name === undefined) {
      throw new Error('response field name required for polling is missing');
    }
    return new CreateOnlineTableWaiter(this, resp.name);
  }

  /**
   * Delete an online table.
   * Warning: This will delete all the data in the online table. If the source Delta table was
   * deleted or modified since this Online Table was created, this will lose the data forever!
   */
  async deleteOnlineTable(
    req: DeleteOnlineTableRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/online-tables/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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

  /** Get information about an existing online table and its status. */
  async getOnlineTable(
    req: GetOnlineTableRequest,
    options?: CallOptions
  ): Promise<OnlineTable> {
    const url = `${this.host}/api/2.0/online-tables/${req.name ?? ''}`;
    let resp: OnlineTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(respBody, unmarshalOnlineTableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CreateOnlineTableWaiter {
  constructor(
    private readonly client: OnlineTablesClient,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<OnlineTable> {
    let result: OnlineTable | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getOnlineTable(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );

      const status = pollResp.unityCatalogProvisioningState;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ProvisioningInfo_State.ACTIVE:
          result = pollResp;
          return;
        case ProvisioningInfo_State.FAILED: {
          const msg = '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getOnlineTable(
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.unityCatalogProvisioningState;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ProvisioningInfo_State.ACTIVE:
      case ProvisioningInfo_State.FAILED:
        return true;
      default:
        return false;
    }
  }
}
