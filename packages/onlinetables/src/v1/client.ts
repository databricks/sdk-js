// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute, retryOn} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
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
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

class StillRunningError extends Error {}

export class Client {
  private readonly host: string;
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
    this.logger = options.logger ?? new NoOpLogger();
    let info = createDefault().with(PACKAGE_SEGMENT);
    if (options.credentials !== undefined) {
      info = info
        .with({key: 'sdk-auth', value: AUTH_VERSION})
        .with({key: 'auth', value: options.credentials.name()});
    }
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Create a new Online Table. */
  async createOnlineTable(
    signal: AbortSignal | undefined,
    req: CreateOnlineTableRequest,
    options?: Options
  ): Promise<OnlineTable> {
    const url = `${this.host}/api/2.0/online-tables`;
    const body = marshalRequest(req.table, marshalOnlineTableSchema);
    let resp: OnlineTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOnlineTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createOnlineTableWaiter(
    signal: AbortSignal | undefined,
    req: CreateOnlineTableRequest,
    options?: Options
  ): Promise<CreateOnlineTableWaiter> {
    const resp = await this.createOnlineTable(signal, req, options);
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
    signal: AbortSignal | undefined,
    req: DeleteOnlineTableRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/online-tables/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Get information about an existing online table and its status. */
  async getOnlineTable(
    signal: AbortSignal | undefined,
    req: GetOnlineTableRequest,
    options?: Options
  ): Promise<OnlineTable> {
    const url = `${this.host}/api/2.0/online-tables/${req.name ?? ''}`;
    let resp: OnlineTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOnlineTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CreateOnlineTableWaiter {
  constructor(
    private readonly client: Client,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<OnlineTable> {
    let result: OnlineTable | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getOnlineTable(
        callSignal,
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
    const pollResp = await this.client.getOnlineTable(
      signal,
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
