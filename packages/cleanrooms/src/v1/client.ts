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
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CleanRoom,
  CreateCleanRoomOutputCatalogRequest,
  CreateCleanRoomOutputCatalogResponse,
  CreateCleanRoomRequest,
  DeleteCleanRoomRequest,
  GetCleanRoomRequest,
  ListCleanRoomsRequest,
  ListCleanRoomsResponse,
  UpdateCleanRoomRequest,
} from './model';
import {
  CleanRoom_Status_Enum,
  marshalCleanRoomOutputCatalogSchema,
  marshalCleanRoomSchema,
  marshalUpdateCleanRoomRequestSchema,
  unmarshalCleanRoomSchema,
  unmarshalCreateCleanRoomOutputCatalogResponseSchema,
  unmarshalListCleanRoomsResponseSchema,
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

  /**
   * Create a new clean room with the specified collaborators.
   * This method is asynchronous; the returned name field inside the clean_room field can be used to poll the clean room status,
   * using the :method:cleanrooms/get method.
   * When this method returns, the clean room will be in a PROVISIONING state, with only name, owner, comment, created_at and status populated.
   * The clean room will be usable once it enters an ACTIVE state.
   *
   * The caller must be a metastore admin or have the **CREATE_CLEAN_ROOM** privilege on the
   * metastore.
   */
  async createCleanRoom(
    signal: AbortSignal | undefined,
    req: CreateCleanRoomRequest,
    options?: CallOptions
  ): Promise<CleanRoom> {
    const url = `${this.host}/api/2.0/clean-rooms`;
    const body = marshalRequest(req.cleanRoom, marshalCleanRoomSchema);
    let resp: CleanRoom | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createCleanRoomWaiter(
    signal: AbortSignal | undefined,
    req: CreateCleanRoomRequest,
    options?: CallOptions
  ): Promise<CreateCleanRoomWaiter> {
    const resp = await this.createCleanRoom(signal, req, options);
    if (resp.name === undefined) {
      throw new Error('response field name required for polling is missing');
    }
    return new CreateCleanRoomWaiter(this, resp.name);
  }

  /** Create the output catalog of the clean room. */
  async createCleanRoomOutputCatalog(
    signal: AbortSignal | undefined,
    req: CreateCleanRoomOutputCatalogRequest,
    options?: CallOptions
  ): Promise<CreateCleanRoomOutputCatalogResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/output-catalogs`;
    const body = marshalRequest(
      req.outputCatalog,
      marshalCleanRoomOutputCatalogSchema
    );
    let resp: CreateCleanRoomOutputCatalogResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateCleanRoomOutputCatalogResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Delete a clean room. After deletion, the clean room will be removed from the metastore.
   * If the other collaborators have not deleted the clean room, they will still have the clean room
   * in their metastore, but it will be in a DELETED state
   * and no operations other than deletion can be performed on it.
   */
  async deleteCleanRoom(
    signal: AbortSignal | undefined,
    req: DeleteCleanRoomRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.name ?? ''}`;
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
    await executeCall(signal, call, options);
  }

  /** Get the details of a clean room given its name. */
  async getCleanRoom(
    signal: AbortSignal | undefined,
    req: GetCleanRoomRequest,
    options?: CallOptions
  ): Promise<CleanRoom> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.name ?? ''}`;
    let resp: CleanRoom | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Get a list of all clean rooms of the metastore. Only clean rooms
   * the caller has access to are returned.
   */
  async listCleanRooms(
    signal: AbortSignal | undefined,
    req: ListCleanRoomsRequest,
    options?: CallOptions
  ): Promise<ListCleanRoomsResponse> {
    const url = `${this.host}/api/2.0/clean-rooms`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCleanRoomsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListCleanRoomsResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCleanRoomsIter(
    signal: AbortSignal | undefined,
    req: ListCleanRoomsRequest,
    options?: CallOptions
  ): AsyncGenerator<CleanRoom> {
    const pageReq: ListCleanRoomsRequest = {...req};
    for (;;) {
      const resp = await this.listCleanRooms(signal, pageReq, options);
      for (const item of resp.cleanRooms ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Update a clean room.
   * The caller must be the owner of the clean room, have **MODIFY_CLEAN_ROOM** privilege, or
   * be metastore admin.
   *
   * When the caller is a metastore admin, only the __owner__ field can be updated.
   */
  async updateCleanRoom(
    signal: AbortSignal | undefined,
    req: UpdateCleanRoomRequest,
    options?: CallOptions
  ): Promise<CleanRoom> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.name ?? ''}`;
    const body = marshalRequest(req, marshalUpdateCleanRoomRequestSchema);
    let resp: CleanRoom | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CreateCleanRoomWaiter {
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
    options?: CallOptions
  ): Promise<CleanRoom> {
    let result: CleanRoom | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCleanRoom(
        callSignal,
        {
          name: this.name,
        },
        options
      );

      const status = pollResp.status;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case CleanRoom_Status_Enum.ACTIVE:
          result = pollResp;
          return;
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<boolean> {
    const pollResp = await this.client.getCleanRoom(
      signal,
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.status;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case CleanRoom_Status_Enum.ACTIVE:
        return true;
      default:
        return false;
    }
  }
}
