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
  CleanRoomAsset,
  CleanRoomAutoApprovalRule,
  CleanRoomNotebookTaskRun,
  CreateCleanRoomAssetRequest,
  CreateCleanRoomAssetReviewRequest,
  CreateCleanRoomAssetReviewResponse,
  CreateCleanRoomAutoApprovalRuleRequest,
  CreateCleanRoomOutputCatalogRequest,
  CreateCleanRoomOutputCatalogResponse,
  CreateCleanRoomRequest,
  DeleteCleanRoomAssetRequest,
  DeleteCleanRoomAssetResponse,
  DeleteCleanRoomAutoApprovalRuleRequest,
  DeleteCleanRoomRequest,
  GetCleanRoomAssetRequest,
  GetCleanRoomAssetRevisionRequest,
  GetCleanRoomAutoApprovalRuleRequest,
  GetCleanRoomRequest,
  ListCleanRoomAssetRevisionsRequest,
  ListCleanRoomAssetRevisionsResponse,
  ListCleanRoomAssetsRequest,
  ListCleanRoomAssetsResponse,
  ListCleanRoomAutoApprovalRulesRequest,
  ListCleanRoomAutoApprovalRulesResponse,
  ListCleanRoomNotebookTaskRunsRequest,
  ListCleanRoomNotebookTaskRunsResponse,
  ListCleanRoomsRequest,
  ListCleanRoomsResponse,
  UpdateCleanRoomAssetRequest,
  UpdateCleanRoomAutoApprovalRuleRequest,
  UpdateCleanRoomRequest,
} from './model';
import {
  CleanRoom_Status_Enum,
  marshalCleanRoomAssetSchema,
  marshalCleanRoomAutoApprovalRuleSchema,
  marshalCleanRoomOutputCatalogSchema,
  marshalCleanRoomSchema,
  marshalCreateCleanRoomAssetReviewRequestSchema,
  marshalCreateCleanRoomAutoApprovalRuleRequestSchema,
  marshalUpdateCleanRoomRequestSchema,
  unmarshalCleanRoomAssetSchema,
  unmarshalCleanRoomAutoApprovalRuleSchema,
  unmarshalCleanRoomSchema,
  unmarshalCreateCleanRoomAssetReviewResponseSchema,
  unmarshalCreateCleanRoomOutputCatalogResponseSchema,
  unmarshalDeleteCleanRoomAssetResponseSchema,
  unmarshalListCleanRoomAssetRevisionsResponseSchema,
  unmarshalListCleanRoomAssetsResponseSchema,
  unmarshalListCleanRoomAutoApprovalRulesResponseSchema,
  unmarshalListCleanRoomNotebookTaskRunsResponseSchema,
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
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createCleanRoomWaiter(
    req: CreateCleanRoomRequest,
    options?: CallOptions
  ): Promise<CreateCleanRoomWaiter> {
    const resp = await this.createCleanRoom(req, options);
    if (resp.name === undefined) {
      throw new Error('response field name required for polling is missing');
    }
    return new CreateCleanRoomWaiter(this, resp.name);
  }

  /**
   * Create a clean room asset —share an asset like a notebook or table into the clean room.
   * For each UC asset that is added through this method, the clean room owner must also have
   * enough privilege on the asset to consume it.
   * The privilege must be maintained indefinitely for the clean room to be able to access the asset.
   * Typically, you should use a group as the clean room owner.
   */
  async createCleanRoomAsset(
    req: CreateCleanRoomAssetRequest,
    options?: CallOptions
  ): Promise<CleanRoomAsset> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.asset?.cleanRoomName ?? ''}/assets`;
    const body = marshalRequest(req.asset, marshalCleanRoomAssetSchema);
    let resp: CleanRoomAsset | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAssetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Submit an asset review */
  async createCleanRoomAssetReview(
    req: CreateCleanRoomAssetReviewRequest,
    options?: CallOptions
  ): Promise<CreateCleanRoomAssetReviewResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}/reviews`;
    const body = marshalRequest(
      req,
      marshalCreateCleanRoomAssetReviewRequestSchema
    );
    let resp: CreateCleanRoomAssetReviewResponse | undefined;
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
        unmarshalCreateCleanRoomAssetReviewResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create an auto-approval rule */
  async createCleanRoomAutoApprovalRule(
    req: CreateCleanRoomAutoApprovalRuleRequest,
    options?: CallOptions
  ): Promise<CleanRoomAutoApprovalRule> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.autoApprovalRule?.cleanRoomName ?? ''}/auto-approval-rules`;
    const body = marshalRequest(
      req,
      marshalCreateCleanRoomAutoApprovalRuleRequestSchema
    );
    let resp: CleanRoomAutoApprovalRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAutoApprovalRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create the output catalog of the clean room. */
  async createCleanRoomOutputCatalog(
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
    await executeCall(call, options);
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
    await executeCall(call, options);
  }

  /** Delete a clean room asset - unshare/remove the asset from the clean room */
  async deleteCleanRoomAsset(
    req: DeleteCleanRoomAssetRequest,
    options?: CallOptions
  ): Promise<DeleteCleanRoomAssetResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}`;
    let resp: DeleteCleanRoomAssetResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteCleanRoomAssetResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a auto-approval rule by rule ID */
  async deleteCleanRoomAutoApprovalRule(
    req: DeleteCleanRoomAutoApprovalRuleRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/auto-approval-rules/${req.ruleId ?? ''}`;
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
    await executeCall(call, options);
  }

  /** Get the details of a clean room given its name. */
  async getCleanRoom(
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
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the details of a clean room asset by its type and full name. */
  async getCleanRoomAsset(
    req: GetCleanRoomAssetRequest,
    options?: CallOptions
  ): Promise<CleanRoomAsset> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}`;
    let resp: CleanRoomAsset | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAssetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a specific revision of an asset */
  async getCleanRoomAssetRevision(
    req: GetCleanRoomAssetRevisionRequest,
    options?: CallOptions
  ): Promise<CleanRoomAsset> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}/revisions/${req.etag ?? ''}`;
    let resp: CleanRoomAsset | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAssetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a auto-approval rule by rule ID */
  async getCleanRoomAutoApprovalRule(
    req: GetCleanRoomAutoApprovalRuleRequest,
    options?: CallOptions
  ): Promise<CleanRoomAutoApprovalRule> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/auto-approval-rules/${req.ruleId ?? ''}`;
    let resp: CleanRoomAutoApprovalRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAutoApprovalRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List revisions for an asset */
  async listCleanRoomAssetRevisions(
    req: ListCleanRoomAssetRevisionsRequest,
    options?: CallOptions
  ): Promise<ListCleanRoomAssetRevisionsResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.assetType ?? ''}/${req.name ?? ''}/revisions`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCleanRoomAssetRevisionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListCleanRoomAssetRevisionsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCleanRoomAssetRevisionsIter(
    req: ListCleanRoomAssetRevisionsRequest,
    options?: CallOptions
  ): AsyncGenerator<CleanRoomAsset> {
    const pageReq: ListCleanRoomAssetRevisionsRequest = {...req};
    for (;;) {
      const resp = await this.listCleanRoomAssetRevisions(pageReq, options);
      for (const item of resp.revisions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List assets. */
  async listCleanRoomAssets(
    req: ListCleanRoomAssetsRequest,
    options?: CallOptions
  ): Promise<ListCleanRoomAssetsResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCleanRoomAssetsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListCleanRoomAssetsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCleanRoomAssetsIter(
    req: ListCleanRoomAssetsRequest,
    options?: CallOptions
  ): AsyncGenerator<CleanRoomAsset> {
    const pageReq: ListCleanRoomAssetsRequest = {...req};
    for (;;) {
      const resp = await this.listCleanRoomAssets(pageReq, options);
      for (const item of resp.assets ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List all auto-approval rules for the caller */
  async listCleanRoomAutoApprovalRules(
    req: ListCleanRoomAutoApprovalRulesRequest,
    options?: CallOptions
  ): Promise<ListCleanRoomAutoApprovalRulesResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/auto-approval-rules`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCleanRoomAutoApprovalRulesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListCleanRoomAutoApprovalRulesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCleanRoomAutoApprovalRulesIter(
    req: ListCleanRoomAutoApprovalRulesRequest,
    options?: CallOptions
  ): AsyncGenerator<CleanRoomAutoApprovalRule> {
    const pageReq: ListCleanRoomAutoApprovalRulesRequest = {...req};
    for (;;) {
      const resp = await this.listCleanRoomAutoApprovalRules(pageReq, options);
      for (const item of resp.rules ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List all the historical notebook task runs in a clean room. */
  async listCleanRoomNotebookTaskRunsHandler(
    req: ListCleanRoomNotebookTaskRunsRequest,
    options?: CallOptions
  ): Promise<ListCleanRoomNotebookTaskRunsResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/runs`;
    const params = new URLSearchParams();
    if (req.notebookName !== undefined) {
      params.append('notebook_name', req.notebookName);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCleanRoomNotebookTaskRunsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListCleanRoomNotebookTaskRunsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCleanRoomNotebookTaskRunsHandlerIter(
    req: ListCleanRoomNotebookTaskRunsRequest,
    options?: CallOptions
  ): AsyncGenerator<CleanRoomNotebookTaskRun> {
    const pageReq: ListCleanRoomNotebookTaskRunsRequest = {...req};
    for (;;) {
      const resp = await this.listCleanRoomNotebookTaskRunsHandler(
        pageReq,
        options
      );
      for (const item of resp.runs ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Get a list of all clean rooms of the metastore. Only clean rooms
   * the caller has access to are returned.
   */
  async listCleanRooms(
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
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCleanRoomsIter(
    req: ListCleanRoomsRequest,
    options?: CallOptions
  ): AsyncGenerator<CleanRoom> {
    const pageReq: ListCleanRoomsRequest = {...req};
    for (;;) {
      const resp = await this.listCleanRooms(pageReq, options);
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
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Update a clean room asset. For example, updating the content of a notebook;
   * changing the shared partitions of a table; etc.
   */
  async updateCleanRoomAsset(
    req: UpdateCleanRoomAssetRequest,
    options?: CallOptions
  ): Promise<CleanRoomAsset> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/assets/${req.asset?.assetType ?? ''}/${req.asset?.name ?? ''}`;
    const body = marshalRequest(req.asset, marshalCleanRoomAssetSchema);
    let resp: CleanRoomAsset | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAssetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a auto-approval rule by rule ID */
  async updateCleanRoomAutoApprovalRule(
    req: UpdateCleanRoomAutoApprovalRuleRequest,
    options?: CallOptions
  ): Promise<CleanRoomAutoApprovalRule> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.autoApprovalRule?.cleanRoomName ?? ''}/auto-approval-rules/${req.autoApprovalRule?.ruleId ?? ''}`;
    const body = marshalRequest(
      req.autoApprovalRule,
      marshalCleanRoomAutoApprovalRuleSchema
    );
    let resp: CleanRoomAutoApprovalRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAutoApprovalRuleSchema);
    };
    await executeCall(call, options);
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
  async wait(options?: CallOptions): Promise<CleanRoom> {
    let result: CleanRoom | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCleanRoom(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
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
    const pollResp = await this.client.getCleanRoom(
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
