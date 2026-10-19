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
  AppendSessionItemsRequest,
  AppendSessionItemsResponse,
  ClearSessionItemsRequest,
  ClearSessionItemsResponse,
  CreateManagedMemoryEntryRequest,
  CreateManagedMemoryStoreRequest,
  CreateSessionRequest,
  CreateSessionStoreRequest,
  DeleteManagedMemoryEntryRequest,
  DeleteManagedMemoryStoreRequest,
  DeleteSessionRequest,
  DeleteSessionStoreRequest,
  ExtractMemoriesRequest,
  ExtractMemoriesResponse,
  ForkSessionRequest,
  ForkSessionResponse,
  GetManagedMemoryEntryRequest,
  GetManagedMemoryStoreRequest,
  GetSessionRequest,
  GetSessionStoreRequest,
  ListManagedMemoryEntriesRequest,
  ListManagedMemoryEntriesResponse,
  ListManagedMemoryStoresRequest,
  ListManagedMemoryStoresResponse,
  ListSessionItemsRequest,
  ListSessionItemsResponse,
  ListSessionStoresRequest,
  ListSessionStoresResponse,
  ListSessionsRequest,
  ListSessionsResponse,
  ManagedMemoryEntry,
  ManagedMemoryEntrySearchResult,
  ManagedMemoryStore,
  PopSessionItemRequest,
  PopSessionItemResponse,
  SearchManagedMemoryEntriesRequest,
  SearchManagedMemoryEntriesResponse,
  Session,
  SessionItem,
  SessionStore,
  UpdateManagedMemoryEntryRequest,
  UpdateManagedMemoryStoreRequest,
  UpdateSessionRequest,
  UpdateSessionStoreRequest,
} from './model';
import {
  marshalAppendSessionItemsRequestSchema,
  marshalClearSessionItemsRequestSchema,
  marshalExtractMemoriesRequestSchema,
  marshalForkSessionRequestSchema,
  marshalManagedMemoryEntrySchema,
  marshalManagedMemoryStoreSchema,
  marshalPopSessionItemRequestSchema,
  marshalSearchManagedMemoryEntriesRequestSchema,
  marshalSessionSchema,
  marshalSessionStoreSchema,
  unmarshalAppendSessionItemsResponseSchema,
  unmarshalClearSessionItemsResponseSchema,
  unmarshalExtractMemoriesResponseSchema,
  unmarshalForkSessionResponseSchema,
  unmarshalListManagedMemoryEntriesResponseSchema,
  unmarshalListManagedMemoryStoresResponseSchema,
  unmarshalListSessionItemsResponseSchema,
  unmarshalListSessionStoresResponseSchema,
  unmarshalListSessionsResponseSchema,
  unmarshalManagedMemoryEntrySchema,
  unmarshalManagedMemoryStoreSchema,
  unmarshalPopSessionItemResponseSchema,
  unmarshalSearchManagedMemoryEntriesResponseSchema,
  unmarshalSessionSchema,
  unmarshalSessionStoreSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class AgentKitClient {
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

  /** Appends items to a session. */
  async appendSessionItems(
    req: AppendSessionItemsRequest,
    options?: CallOptions
  ): Promise<AppendSessionItemsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/items:append`;
    const body = marshalRequest(req, marshalAppendSessionItemsRequestSchema);
    let resp: AppendSessionItemsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalAppendSessionItemsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Clears all items from a session. */
  async clearSessionItems(
    req: ClearSessionItemsRequest,
    options?: CallOptions
  ): Promise<ClearSessionItemsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/items:clear`;
    const body = marshalRequest(req, marshalClearSessionItemsRequestSchema);
    let resp: ClearSessionItemsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalClearSessionItemsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a memory entry using exclusive-create semantics. Callers may choose the entry
   * ID; the service generates one when it is omitted. Returns `ALREADY_EXISTS` when an entry with
   * the same actor, session, and path already exists. Omitted `session_id` is its own uniqueness
   * key: two omitted-session entries with the same actor and path conflict, but an omitted-session
   * entry does not conflict with a session-scoped entry at the same actor and path.
   */
  async createMemory(
    req: CreateManagedMemoryEntryRequest,
    options?: CallOptions
  ): Promise<ManagedMemoryEntry> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/entries`;
    const params = new URLSearchParams();
    if (req.managedMemoryEntryId !== undefined) {
      params.append('managed_memory_entry_id', req.managedMemoryEntryId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.managedMemoryEntry,
      marshalManagedMemoryEntrySchema
    );
    let resp: ManagedMemoryEntry | undefined;
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
      resp = parseResponse(respBody, unmarshalManagedMemoryEntrySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a memory store in the caller's workspace. */
  async createMemoryStore(
    req: CreateManagedMemoryStoreRequest,
    options?: CallOptions
  ): Promise<ManagedMemoryStore> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/memory-stores`;
    const params = new URLSearchParams();
    if (req.managedMemoryStoreId !== undefined) {
      params.append('managed_memory_store_id', req.managedMemoryStoreId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.managedMemoryStore,
      marshalManagedMemoryStoreSchema
    );
    let resp: ManagedMemoryStore | undefined;
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
      resp = parseResponse(respBody, unmarshalManagedMemoryStoreSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a session within a session store. */
  async createSession(
    req: CreateSessionRequest,
    options?: CallOptions
  ): Promise<Session> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/sessions`;
    const params = new URLSearchParams();
    if (req.sessionId !== undefined) {
      params.append('session_id', req.sessionId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.session, marshalSessionSchema);
    let resp: Session | undefined;
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
      resp = parseResponse(respBody, unmarshalSessionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a session store. */
  async createSessionStore(
    req: CreateSessionStoreRequest,
    options?: CallOptions
  ): Promise<SessionStore> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/session-stores`;
    const params = new URLSearchParams();
    if (req.sessionStoreId !== undefined) {
      params.append('session_store_id', req.sessionStoreId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.sessionStore, marshalSessionStoreSchema);
    let resp: SessionStore | undefined;
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
      resp = parseResponse(respBody, unmarshalSessionStoreSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a memory entry by resource name. Returns `NOT_FOUND` when the entry does not
   * exist in the caller's workspace.
   */
  async deleteMemory(
    req: DeleteManagedMemoryEntryRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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

  /**
   * Deletes a memory store by resource name. Returns `NOT_FOUND` when the store does not
   * exist in the caller's workspace.
   */
  async deleteMemoryStore(
    req: DeleteManagedMemoryStoreRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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

  /**
   * Deletes a session, its items, and any descendant sessions recursively. Independently retained
   * memory is not deleted.
   */
  async deleteSession(
    req: DeleteSessionRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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

  /**
   * Deletes a session store, its sessions and items, and its service-managed storage. Memory entries
   * retained by a separate Memory Store are not deleted.
   */
  async deleteSessionStore(
    req: DeleteSessionStoreRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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

  /**
   * Synchronously extracts memories from a single session into the given memory store, returning
   * the entries that were written.
   */
  async extractMemories(
    req: ExtractMemoriesRequest,
    options?: CallOptions
  ): Promise<ExtractMemoriesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.sessionStore ?? ''}/sessions/${req.sessionId ?? ''}/extractions`;
    const body = marshalRequest(req, marshalExtractMemoriesRequestSchema);
    let resp: ExtractMemoriesResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalExtractMemoriesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Forks a session into an independent top-level copy. */
  async forkSession(
    req: ForkSessionRequest,
    options?: CallOptions
  ): Promise<ForkSessionResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/sessions:fork`;
    const body = marshalRequest(req, marshalForkSessionRequestSchema);
    let resp: ForkSessionResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalForkSessionResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Retrieves a memory entry by resource name. `view` controls whether the response
   * includes memory content. Returns `NOT_FOUND` when the entry does not exist in the caller's
   * workspace.
   */
  async getMemory(
    req: GetManagedMemoryEntryRequest,
    options?: CallOptions
  ): Promise<ManagedMemoryEntry> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ManagedMemoryEntry | undefined;
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
      resp = parseResponse(respBody, unmarshalManagedMemoryEntrySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Retrieves a memory store by resource name. Returns `NOT_FOUND` when the store does not
   * exist in the caller's workspace.
   */
  async getMemoryStore(
    req: GetManagedMemoryStoreRequest,
    options?: CallOptions
  ): Promise<ManagedMemoryStore> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.name ?? ''}`;
    let resp: ManagedMemoryStore | undefined;
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
      resp = parseResponse(respBody, unmarshalManagedMemoryStoreSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a session by resource name. */
  async getSession(
    req: GetSessionRequest,
    options?: CallOptions
  ): Promise<Session> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.name ?? ''}`;
    let resp: Session | undefined;
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
      resp = parseResponse(respBody, unmarshalSessionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a session store by resource name. */
  async getSessionStore(
    req: GetSessionStoreRequest,
    options?: CallOptions
  ): Promise<SessionStore> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.name ?? ''}`;
    let resp: SessionStore | undefined;
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
      resp = parseResponse(respBody, unmarshalSessionStoreSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists memory entries for one actor. An exact `path` filters entries across sessions,
   * ignoring session metadata. Otherwise, `session_id` and `path_prefix` restrict the actor
   * partition. `view` controls whether each returned entry includes memory content.
   */
  async listMemories(
    req: ListManagedMemoryEntriesRequest,
    options?: CallOptions
  ): Promise<ListManagedMemoryEntriesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/entries`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.actorId !== undefined) {
      params.append('actor_id', req.actorId);
    }
    if (req.pathPrefix !== undefined) {
      params.append('path_prefix', req.pathPrefix);
    }
    if (req.sessionId !== undefined) {
      params.append('session_id', req.sessionId);
    }
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListManagedMemoryEntriesResponse | undefined;
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
        unmarshalListManagedMemoryEntriesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listMemoriesIter(
    req: ListManagedMemoryEntriesRequest,
    options?: CallOptions
  ): AsyncGenerator<ManagedMemoryEntry> {
    const pageReq: ListManagedMemoryEntriesRequest = {...req};
    for (;;) {
      const resp = await this.listMemories(pageReq, options);
      for (const item of resp.managedMemoryEntries ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists memory stores in the caller's workspace. */
  async listMemoryStores(
    req: ListManagedMemoryStoresRequest,
    options?: CallOptions
  ): Promise<ListManagedMemoryStoresResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/memory-stores`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListManagedMemoryStoresResponse | undefined;
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
        unmarshalListManagedMemoryStoresResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listMemoryStoresIter(
    req: ListManagedMemoryStoresRequest,
    options?: CallOptions
  ): AsyncGenerator<ManagedMemoryStore> {
    const pageReq: ListManagedMemoryStoresRequest = {...req};
    for (;;) {
      const resp = await this.listMemoryStores(pageReq, options);
      for (const item of resp.managedMemoryStores ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists items in a session. */
  async listSessionItems(
    req: ListSessionItemsRequest,
    options?: CallOptions
  ): Promise<ListSessionItemsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/items`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.orderBy !== undefined) {
      params.append('order_by', req.orderBy);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSessionItemsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListSessionItemsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listSessionItemsIter(
    req: ListSessionItemsRequest,
    options?: CallOptions
  ): AsyncGenerator<SessionItem> {
    const pageReq: ListSessionItemsRequest = {...req};
    for (;;) {
      const resp = await this.listSessionItems(pageReq, options);
      for (const item of resp.sessionItems ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists session stores. */
  async listSessionStores(
    req: ListSessionStoresRequest,
    options?: CallOptions
  ): Promise<ListSessionStoresResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/session-stores`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSessionStoresResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListSessionStoresResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listSessionStoresIter(
    req: ListSessionStoresRequest,
    options?: CallOptions
  ): AsyncGenerator<SessionStore> {
    const pageReq: ListSessionStoresRequest = {...req};
    for (;;) {
      const resp = await this.listSessionStores(pageReq, options);
      for (const item of resp.sessionStores ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists sessions within a session store. */
  async listSessions(
    req: ListSessionsRequest,
    options?: CallOptions
  ): Promise<ListSessionsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/sessions`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.orderBy !== undefined) {
      params.append('order_by', req.orderBy);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSessionsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListSessionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listSessionsIter(
    req: ListSessionsRequest,
    options?: CallOptions
  ): AsyncGenerator<Session> {
    const pageReq: ListSessionsRequest = {...req};
    for (;;) {
      const resp = await this.listSessions(pageReq, options);
      for (const item of resp.sessions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Pops the newest item from a session. */
  async popSessionItem(
    req: PopSessionItemRequest,
    options?: CallOptions
  ): Promise<PopSessionItemResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/items:pop`;
    const body = marshalRequest(req, marshalPopSessionItemRequestSchema);
    let resp: PopSessionItemResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalPopSessionItemResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Searches memory entries by text query for one actor. Returns matching entries and
   * scores ranked by relevance; `view` controls whether each returned entry includes content.
   */
  async searchMemories(
    req: SearchManagedMemoryEntriesRequest,
    options?: CallOptions
  ): Promise<SearchManagedMemoryEntriesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.parent ?? ''}/entries:search`;
    const body = marshalRequest(
      req,
      marshalSearchManagedMemoryEntriesRequestSchema
    );
    let resp: SearchManagedMemoryEntriesResponse | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalSearchManagedMemoryEntriesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *searchMemoriesIter(
    req: SearchManagedMemoryEntriesRequest,
    options?: CallOptions
  ): AsyncGenerator<ManagedMemoryEntrySearchResult> {
    const pageReq: SearchManagedMemoryEntriesRequest = {...req};
    for (;;) {
      const resp = await this.searchMemories(pageReq, options);
      for (const item of resp.results ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates selected mutable fields on a memory entry. Identity fields are immutable. */
  async updateMemory(
    req: UpdateManagedMemoryEntryRequest,
    options?: CallOptions
  ): Promise<ManagedMemoryEntry> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.managedMemoryEntry?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.managedMemoryEntry,
      marshalManagedMemoryEntrySchema
    );
    let resp: ManagedMemoryEntry | undefined;
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
      resp = parseResponse(respBody, unmarshalManagedMemoryEntrySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates a memory store's description and metadata. */
  async updateMemoryStore(
    req: UpdateManagedMemoryStoreRequest,
    options?: CallOptions
  ): Promise<ManagedMemoryStore> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.managedMemoryStore?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.managedMemoryStore,
      marshalManagedMemoryStoreSchema
    );
    let resp: ManagedMemoryStore | undefined;
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
      resp = parseResponse(respBody, unmarshalManagedMemoryStoreSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates a session's mutable fields. */
  async updateSession(
    req: UpdateSessionRequest,
    options?: CallOptions
  ): Promise<Session> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.session?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.session, marshalSessionSchema);
    let resp: Session | undefined;
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
      resp = parseResponse(respBody, unmarshalSessionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates a session store's description and metadata. */
  async updateSessionStore(
    req: UpdateSessionStoreRequest,
    options?: CallOptions
  ): Promise<SessionStore> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/agents/${req.sessionStore?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.sessionStore, marshalSessionStoreSchema);
    let resp: SessionStore | undefined;
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
      resp = parseResponse(respBody, unmarshalSessionStoreSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
