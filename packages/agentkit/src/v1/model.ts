// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema, JsonValue} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.number(),
    z.string(),
    z.boolean(),
    z.record(z.string(), jsonValueSchema),
    z.array(jsonValueSchema),
  ])
);

/** Identifies the source that created a memory entry. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ManagedMemoryEntrySourceType = {
  /** The memory entry was created by an agent during a live conversation. */
  MANAGED_MEMORY_ENTRY_SOURCE_TYPE_AGENT:
    'MANAGED_MEMORY_ENTRY_SOURCE_TYPE_AGENT',
  /** The memory entry was distilled from prior sessions by the dreamer pipeline. */
  MANAGED_MEMORY_ENTRY_SOURCE_TYPE_DREAMER:
    'MANAGED_MEMORY_ENTRY_SOURCE_TYPE_DREAMER',
} as const;
export type ManagedMemoryEntrySourceType =
  | (typeof ManagedMemoryEntrySourceType)[keyof typeof ManagedMemoryEntrySourceType]
  | (string & {});

/** Controls how much memory entry data is returned. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ManagedMemoryEntryView = {
  /** Default view. Returns all entry fields, including `content`. */
  MANAGED_MEMORY_ENTRY_VIEW_UNSPECIFIED:
    'MANAGED_MEMORY_ENTRY_VIEW_UNSPECIFIED',
  /** Returns entry metadata without `content`. */
  MANAGED_MEMORY_ENTRY_VIEW_BASIC: 'MANAGED_MEMORY_ENTRY_VIEW_BASIC',
  /** Returns all entry fields, including `content`. */
  MANAGED_MEMORY_ENTRY_VIEW_FULL: 'MANAGED_MEMORY_ENTRY_VIEW_FULL',
} as const;
export type ManagedMemoryEntryView =
  | (typeof ManagedMemoryEntryView)[keyof typeof ManagedMemoryEntryView]
  | (string & {});

/** Type of service-managed storage backing a memory store. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const StorageBackendType = {
  /** Default value. Returned when the storage backend type is not set. */
  STORAGE_BACKEND_TYPE_UNSPECIFIED: 'STORAGE_BACKEND_TYPE_UNSPECIFIED',
  /** Lakebase-managed storage backing the memory store. */
  STORAGE_BACKEND_TYPE_LAKEBASE: 'STORAGE_BACKEND_TYPE_LAKEBASE',
} as const;
export type StorageBackendType =
  | (typeof StorageBackendType)[keyof typeof StorageBackendType]
  | (string & {});

/** Request to append items to a session. */
export interface AppendSessionItemsRequest {
  /**
   * Items to append atomically in request order. Concurrent append requests are serialized into one
   * committed order without exposing a numeric sequence in the public contract.
   */
  items?: SessionItem[] | undefined;
  /**
   * Resource name of the containing session, in the form
   * `session-stores/{session_store_id}/sessions/{session_id}`.
   */
  parent?: string | undefined;
}

/** Response containing appended items. */
export interface AppendSessionItemsResponse {
  /** Persisted session items with service-assigned fields. */
  sessionItems?: SessionItem[] | undefined;
}

/** Request to clear all items from a session. */
export interface ClearSessionItemsRequest {
  /**
   * Resource name of the containing session, in the form
   * `session-stores/{session_store_id}/sessions/{session_id}`.
   */
  parent?: string | undefined;
}

/** Response from clearing items from a session. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClearSessionItemsResponse {}

/** Request to create a memory entry. */
export interface CreateManagedMemoryEntryRequest {
  /**
   * Memory store that will contain the entry, in the form
   * `memory-stores/{managed_memory_store_id}`.
   */
  parent?: string | undefined;
  /** The memory entry to create. */
  managedMemoryEntry?: ManagedMemoryEntry | undefined;
  /** Optional caller-selected memory entry ID. The service generates an ID when omitted. */
  managedMemoryEntryId?: string | undefined;
}

/** Request to create a memory store. */
export interface CreateManagedMemoryStoreRequest {
  /** The memory store to create. */
  managedMemoryStore?: ManagedMemoryStore | undefined;
  /**
   * Caller-provided, workspace-unique memory store ID. It must be 3-56 characters, begin
   * with a lowercase letter, contain only lowercase letters, digits, and hyphens, and end with a
   * letter or digit.
   */
  managedMemoryStoreId?: string | undefined;
}

/** Request to create a session. */
export interface CreateSessionRequest {
  /**
   * The session to create. `actor_id` is required. A session with `parent_session_id` is a child and
   * must use its parent's `actor_id`. Independent forks are created only through `ForkSession`.
   */
  session?: Session | undefined;
  /**
   * Optional caller-selected session ID. The service generates a UUID when this field is omitted.
   * The ID must be unique; a collision returns `ALREADY_EXISTS`.
   */
  sessionId?: string | undefined;
  /**
   * Resource name of the containing session store, in the form
   * `session-stores/{session_store_id}`.
   */
  parent?: string | undefined;
}

/** Request to create a session store. */
export interface CreateSessionStoreRequest {
  /** The session store to create. */
  sessionStore?: SessionStore | undefined;
  /**
   * Caller-provided, workspace-unique session store ID. It must be 3-55 characters, begin with a
   * lowercase letter, and contain only lowercase letters, digits, and hyphens.
   */
  sessionStoreId?: string | undefined;
}

/** Request to delete a memory entry by resource name. */
export interface DeleteManagedMemoryEntryRequest {
  /**
   * Resource name in the form
   * `memory-stores/{managed_memory_store_id}/entries/{managed_memory_entry_id}`.
   */
  name?: string | undefined;
}

/** Request to delete a memory store by resource name. */
export interface DeleteManagedMemoryStoreRequest {
  /** Resource name in the form `memory-stores/{managed_memory_store_id}`. */
  name?: string | undefined;
}

/** Request to delete a session. */
export interface DeleteSessionRequest {
  /**
   * Resource name in the form
   * `session-stores/{session_store_id}/sessions/{session_id}`.
   */
  name?: string | undefined;
}

/** Request to delete a session store. */
export interface DeleteSessionStoreRequest {
  /** Resource name in the form `session-stores/{session_store_id}`. */
  name?: string | undefined;
}

/** Request to synchronously extract memories from a single session. */
export interface ExtractMemoriesRequest {
  /**
   * Memory store the extracted entries are written to, in the form
   * `memory-stores/{managed_memory_store_id}`.
   */
  memoryStore?: string | undefined;
  /** Session store containing the session, in the form `session-stores/{session_store_id}`. */
  sessionStore?: string | undefined;
  /** Identifier of the session whose transcript is distilled into memories. */
  sessionId?: string | undefined;
  /** Instructions steering what is extracted from the session. */
  instructions?: string | undefined;
  /**
   * When true, extract and return the entries without writing them to the memory store. Defaults
   * to false, which persists the extracted entries and returns them.
   */
  dryRun?: boolean | undefined;
}

/** Result of a single-session memory extraction. */
export interface ExtractMemoriesResponse {
  /** Correlation identifier for this extraction, for logging and tracing. Not a fetchable resource. */
  name?: string | undefined;
  /** The memory entries written by this extraction. */
  entries?: ManagedMemoryEntry[] | undefined;
}

/** Request to fork a session. */
export interface ForkSessionRequest {
  /** ID of the session to copy. */
  sourceSessionId?: string | undefined;
  /**
   * Optional last item ID to copy through, inclusively. When omitted, the fork atomically copies
   * all items committed before the fork operation begins.
   */
  upToItemId?: string | undefined;
  /** Optional unique ID for the forked session. A collision returns `ALREADY_EXISTS`. */
  sessionId?: string | undefined;
  /** Opaque caller-provided identifier for the application actor associated with the forked session. */
  actorId?: string | undefined;
  /** Optional metadata for the fork. */
  metadata?: Record<string, string> | undefined;
  /**
   * Resource name of the containing session store, in the form
   * `session-stores/{session_store_id}`.
   */
  parent?: string | undefined;
}

/** Response from forking a session. */
export interface ForkSessionResponse {
  /** The newly-created independent top-level session. */
  session?: Session | undefined;
}

/** Request to retrieve a memory entry by resource name. */
export interface GetManagedMemoryEntryRequest {
  /**
   * Resource name in the form
   * `memory-stores/{managed_memory_store_id}/entries/{managed_memory_entry_id}`.
   */
  name?: string | undefined;
  /** Controls whether the response includes memory content. Defaults to `FULL`. */
  view?: ManagedMemoryEntryView | undefined;
}

/** Request to retrieve a memory store by resource name. */
export interface GetManagedMemoryStoreRequest {
  /** Resource name in the form `memory-stores/{managed_memory_store_id}`. */
  name?: string | undefined;
}

/** Request to get a session. */
export interface GetSessionRequest {
  /**
   * Resource name in the form
   * `session-stores/{session_store_id}/sessions/{session_id}`.
   */
  name?: string | undefined;
}

/** Request to get a session store. */
export interface GetSessionStoreRequest {
  /** Resource name in the form `session-stores/{session_store_id}`. */
  name?: string | undefined;
}

/**
 * Request to list memory entries for one actor, optionally restricted by session and
 * path prefix, or matched by exact path regardless of session.
 */
export interface ListManagedMemoryEntriesRequest {
  /**
   * Memory store whose entries are listed, in the form
   * `memory-stores/{managed_memory_store_id}`.
   */
  parent?: string | undefined;
  /**
   * Maximum number of entries to return. The service may return fewer entries than requested.
   * Defaults to 10; must be between 1 and 100.
   */
  pageSize?: number | undefined;
  /** Opaque pagination token from a previous ListManagedMemoryEntries response. */
  pageToken?: string | undefined;
  /** Customer-provided identifier for the actor whose entries are listed. */
  actorId?: string | undefined;
  /** Optional path prefix used to restrict entries within the actor partition. */
  pathPrefix?: string | undefined;
  /**
   * Optional session identifier. When set, only entries with this exact `session_id` are
   * returned. Omitted-session (cross-session) entries are not included. Ignored when path is set.
   */
  sessionId?: string | undefined;
  /** Controls whether each returned entry includes memory content. Defaults to `FULL`. */
  view?: ManagedMemoryEntryView | undefined;
}

/** Response containing memory entries. */
export interface ListManagedMemoryEntriesResponse {
  /** Memory entries matching the request and selected response view. */
  managedMemoryEntries?: ManagedMemoryEntry[] | undefined;
  /** Opaque pagination token. This field is omitted when there are no more results. */
  nextPageToken?: string | undefined;
}

/** Request to list memory stores in the caller's workspace. */
export interface ListManagedMemoryStoresRequest {
  /**
   * Maximum number of stores to return. The service may return fewer stores than requested.
   * Defaults to 10; must be between 1 and 100.
   */
  pageSize?: number | undefined;
  /** Opaque pagination token from a previous ListManagedMemoryStores response. */
  pageToken?: string | undefined;
}

/** Response containing memory stores in the caller's workspace. */
export interface ListManagedMemoryStoresResponse {
  /** Memory stores in the caller's workspace. */
  managedMemoryStores?: ManagedMemoryStore[] | undefined;
  /** Opaque pagination token. This field is omitted when there are no more results. */
  nextPageToken?: string | undefined;
}

/** Request to list items in a session. */
export interface ListSessionItemsRequest {
  /** Maximum number of items to return. Defaults to 10; must be between 1 and 100. */
  pageSize?: number | undefined;
  /** Token returned by a previous list request. */
  pageToken?: string | undefined;
  /**
   * Sort order. Supported values are `create_time asc` and `create_time desc`. The default is
   * `create_time desc`, which returns the most recently appended items first. Equal timestamps are
   * resolved by committed append order in the requested direction.
   */
  orderBy?: string | undefined;
  /**
   * Resource name of the containing session, in the form
   * `session-stores/{session_store_id}/sessions/{session_id}`.
   */
  parent?: string | undefined;
}

/** Response containing a page of session items. */
export interface ListSessionItemsResponse {
  /** Session items in the requested page. */
  sessionItems?: SessionItem[] | undefined;
  /** Token to retrieve the next page. */
  nextPageToken?: string | undefined;
}

/** Request to list session stores. */
export interface ListSessionStoresRequest {
  /** Maximum number of session stores to return. Defaults to 10; must be between 1 and 100. */
  pageSize?: number | undefined;
  /** Token returned by a previous list request. */
  pageToken?: string | undefined;
}

/** Response containing a page of session stores. */
export interface ListSessionStoresResponse {
  /** Session stores in the requested page. */
  sessionStores?: SessionStore[] | undefined;
  /** Token to retrieve the next page. */
  nextPageToken?: string | undefined;
}

/** Request to list sessions. */
export interface ListSessionsRequest {
  /** Maximum number of sessions to return. Defaults to 10; must be between 1 and 100. */
  pageSize?: number | undefined;
  /** Token returned by a previous list request. */
  pageToken?: string | undefined;
  /**
   * Filter expression. Supported fields include `actor_id` and `metadata`; for example,
   * `actor_id = "support-customer-123"`.
   */
  filter?: string | undefined;
  /**
   * Sort order. Defaults to `last_activity_time desc`. Page-token continuation is exactly-once when
   * ordering by `create_time` (immutable); ordering by `last_activity_time` is best-effort, because
   * that value changes as a session gains activity, so a session updated between page requests may
   * be repeated or skipped. To enumerate every session exactly once, order by `create_time`.
   */
  orderBy?: string | undefined;
  /**
   * Resource name of the containing session store, in the form
   * `session-stores/{session_store_id}`.
   */
  parent?: string | undefined;
}

/** Response containing a page of sessions. */
export interface ListSessionsResponse {
  /** Sessions in the requested page. */
  sessions?: Session[] | undefined;
  /** Token to retrieve the next page. */
  nextPageToken?: string | undefined;
}

/** A workspace-scoped entry in a memory store. */
export interface ManagedMemoryEntry {
  /**
   * Resource name in the form
   * `memory-stores/{managed_memory_store_id}/entries/{managed_memory_entry_id}`.
   */
  name?: string | undefined;
  /** Customer-provided identifier for the actor whose memory this entry represents. */
  actorId?: string | undefined;
  /**
   * Optional identifier for the session associated with this memory entry. When omitted, the
   * entry applies across the actor's sessions.
   */
  sessionId?: string | undefined;
  /**
   * Absolute, case-sensitive path identifying the entry within its actor and optional session.
   * Paths must begin with `/` and must not contain empty, `.` or `..` segments.
   */
  path?: string | undefined;
  /** Optional free-form memory content. */
  content?: string | undefined;
  /** Human-readable description of the memory entry. */
  description?: string | undefined;
  /** Which writer created this entry. Caller sets this on Create; immutable after creation. */
  sourceType?: ManagedMemoryEntrySourceType | undefined;
  /** Time when the entry was created. */
  createTime?: Temporal.Instant | undefined;
  /** Time when the entry was last updated. */
  updateTime?: Temporal.Instant | undefined;
}

/** One relevance-ranked memory search result. */
export interface ManagedMemoryEntrySearchResult {
  /** Memory entry matching the query. */
  managedMemoryEntry?: ManagedMemoryEntry | undefined;
  /** Relevance score for the result. Higher scores are more relevant. */
  score?: number | undefined;
}

/** A workspace-scoped memory store backed by service-managed storage. */
export interface ManagedMemoryStore {
  /** Resource name in the form `memory-stores/{managed_memory_store_id}`. */
  name?: string | undefined;
  /**
   * Deprecated compatibility alias for the caller-provided memory store ID. Canonical
   * clients provide the ID through `CreateMemoryStoreRequest.managed_memory_store_id` and use
   * `name` as the resource identifier.
   */
  displayName?: string | undefined;
  /** Workspace that owns the memory store. */
  workspaceId?: bigint | undefined;
  /** Service-managed storage backing this memory store. */
  storageBackend?: StorageBackend | undefined;
  /**
   * Deprecated alias for `creator_user_id`. This identifies the original creator, not a
   * transferable owner. Use `creator_user_id` instead.
   */
  ownerUserId?: string | undefined;
  /**
   * Workspace-local user ID of the authenticated principal that created the store. This is
   * immutable server-set attribution and does not grant access; authorization is evaluated from
   * the authenticated request context.
   */
  creatorUserId?: string | undefined;
  /** Human-readable description of the memory store. */
  description?: string | undefined;
  /** Time when the store was created. */
  createTime?: Temporal.Instant | undefined;
  /** Time when the store was last updated. */
  updateTime?: Temporal.Instant | undefined;
}

/** Request to pop an item from a session. */
export interface PopSessionItemRequest {
  /**
   * Resource name of the containing session, in the form
   * `session-stores/{session_store_id}/sessions/{session_id}`.
   */
  parent?: string | undefined;
}

/** Response containing the popped item. */
export interface PopSessionItemResponse {
  /** Removed item, if any. */
  item?: SessionItem | undefined;
}

/**
 * Request to search memory entries by text query for one actor.
 * Search returns a relevance-ranked top-N result set and does not currently paginate.
 */
export interface SearchManagedMemoryEntriesRequest {
  /**
   * Memory store whose entries are searched, in the form
   * `memory-stores/{managed_memory_store_id}`.
   */
  parent?: string | undefined;
  /** Customer-provided identifier for the actor whose entries are searched. */
  actorId?: string | undefined;
  /** Free-form search query. */
  query?: string | undefined;
  /** Deprecated alias for `page_size`. When both fields are set, their values must match. */
  limit?: number | undefined;
  /**
   * Maximum number of relevance-ranked entries to return. Defaults to 10 and must be between 1 and
   * 100.
   */
  pageSize?: number | undefined;
  /**
   * Reserved for pagination compatibility. The server currently ignores this field because Search
   * returns a ranked top-N result set.
   */
  pageToken?: string | undefined;
  /**
   * Optional session identifier. When set, only entries with this exact `session_id` are
   * searched. Omitted-session (cross-session) entries are not included.
   */
  sessionId?: string | undefined;
  /**
   * Optional absolute, case-sensitive path prefix used to restrict searched entries within the
   * actor partition. The prefix must begin with `/` and must not contain empty, `.` or `..`
   * segments.
   */
  pathPrefix?: string | undefined;
  /**
   * Controls whether each returned entry includes memory content. Search scores are always
   * returned. Defaults to `FULL`.
   */
  view?: ManagedMemoryEntryView | undefined;
}

/** Response containing memory entries ranked by relevance. */
export interface SearchManagedMemoryEntriesResponse {
  /**
   * Deprecated compatibility alias for clients migrating to `results`. This contains the same
   * entries in the same order, but omits their relevance scores.
   */
  managedMemoryEntries?: ManagedMemoryEntry[] | undefined;
  /**
   * Opaque pagination token. Search currently returns an unpaginated ranked top-N result set, so
   * the server does not populate this field.
   */
  nextPageToken?: string | undefined;
  /** Canonical matching entries and relevance scores, ordered most relevant first. */
  results?: ManagedMemoryEntrySearchResult[] | undefined;
}

/** A durable logical interaction stored within a Session Store. */
export interface Session {
  /**
   * Unique session ID. The service generates a UUID unless the caller supplies
   * `CreateSessionRequest.session_id`.
   */
  sessionId?: string | undefined;
  /**
   * Opaque caller-provided identifier for the application actor associated with the session.
   *
   * This is application data and has no <Databricks> authentication or authorization semantics.
   * Use the same value as the Managed Memory Entry `actor_id` when storing memories associated
   * with this actor. Every session must set it. A child session must use the same value as its parent.
   */
  actorId?: string | undefined;
  /**
   * Immediate parent session ID. Set only at creation for child sessions, immutable thereafter, and
   * restricted to the same store.
   */
  parentSessionId?: string | undefined;
  /**
   * Top-level session ID in the spawn tree. This equals `session_id` for a root or fork and is
   * inherited transitively by child sessions.
   */
  rootSessionId?: string | undefined;
  /** Mutable caller-defined string labels. */
  metadata?: Record<string, string> | undefined;
  /** Time when the session was created. */
  createTime?: Temporal.Instant | undefined;
  /** Time when session resource fields last changed. */
  updateTime?: Temporal.Instant | undefined;
  /** Time when the session's item history was last mutated. */
  lastActivityTime?: Temporal.Instant | undefined;
  /** Resource name in the form `session-stores/{session_store_id}/sessions/{session_id}`. */
  name?: string | undefined;
}

/** A transcript entry in a session's history. */
export interface SessionItem {
  /** Stable service-generated item ID. */
  itemId?: string | undefined;
  /**
   * Complete SDK-native, JSON-compatible item. The service stores and returns this value without
   * interpreting provider-specific fields such as `type`, `role`, or `content`.
   */
  data?: JsonValue | undefined;
  /**
   * Server-assigned time when the append commits. Values are nondecreasing within a session. Item
   * listing orders by this timestamp; equal timestamps are resolved by committed append order.
   */
  createTime?: Temporal.Instant | undefined;
}

/** A workspace-scoped session store. */
export interface SessionStore {
  /**
   * Workspace-local user ID of the authenticated principal that created the store. This is
   * immutable server-set attribution and does not grant access; authorization is evaluated from
   * the authenticated request context.
   */
  creatorUserId?: string | undefined;
  /** Time when the store was created. */
  createTime?: Temporal.Instant | undefined;
  /** Time when the store was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Human-readable description of the session store. */
  description?: string | undefined;
  /** Mutable caller-defined string labels. */
  metadata?: Record<string, string> | undefined;
  /** Resource name in the form `session-stores/{session_store_id}`. */
  name?: string | undefined;
}

/** Service-managed storage backing a memory store. */
export interface StorageBackend {
  /** Type of the storage backend. */
  backendType?: StorageBackendType | undefined;
  /** Backend-specific identifier. For Lakebase, this is the project ID. */
  backendId?: string | undefined;
}

/** Request to update a memory entry. */
export interface UpdateManagedMemoryEntryRequest {
  /** The memory entry to update. */
  managedMemoryEntry?: ManagedMemoryEntry | undefined;
  /** Fields to update. Only `content` and `description` may be updated. */
  updateMask?: FieldMask<ManagedMemoryEntry> | undefined;
}

/** Request to update the description and metadata on a memory store. */
export interface UpdateManagedMemoryStoreRequest {
  /** The memory store to update. `name` is taken from the URL. */
  managedMemoryStore?: ManagedMemoryStore | undefined;
  /** Only `description` and `metadata` may be updated. Selecting `metadata` replaces the entire map. */
  updateMask?: FieldMask<ManagedMemoryStore> | undefined;
}

/** Request to update a session. */
export interface UpdateSessionRequest {
  /** Session to update. */
  session?: Session | undefined;
  /**
   * Fields to update. Only `metadata` is mutable; any other path returns
   * `INVALID_PARAMETER_VALUE`.
   */
  updateMask?: FieldMask<Session> | undefined;
}

/** Request to update a session store. */
export interface UpdateSessionStoreRequest {
  /** Session store to update. */
  sessionStore?: SessionStore | undefined;
  /**
   * Fields to update. Only `description` and `metadata` are mutable; any other
   * path returns `INVALID_PARAMETER_VALUE`.
   */
  updateMask?: FieldMask<SessionStore> | undefined;
}

export const unmarshalAppendSessionItemsResponseSchema: z.ZodType<AppendSessionItemsResponse> =
  z
    .object({
      session_items: z
        .array(z.lazy(() => unmarshalSessionItemSchema))
        .optional(),
    })
    .transform(d => ({
      sessionItems: d.session_items,
    }));

export const unmarshalClearSessionItemsResponseSchema: z.ZodType<ClearSessionItemsResponse> =
  z.object({});

export const unmarshalExtractMemoriesResponseSchema: z.ZodType<ExtractMemoriesResponse> =
  z
    .object({
      name: z.string().optional(),
      entries: z
        .array(z.lazy(() => unmarshalManagedMemoryEntrySchema))
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      entries: d.entries,
    }));

export const unmarshalForkSessionResponseSchema: z.ZodType<ForkSessionResponse> =
  z
    .object({
      session: z.lazy(() => unmarshalSessionSchema).optional(),
    })
    .transform(d => ({
      session: d.session,
    }));

export const unmarshalListManagedMemoryEntriesResponseSchema: z.ZodType<ListManagedMemoryEntriesResponse> =
  z
    .object({
      managed_memory_entries: z
        .array(z.lazy(() => unmarshalManagedMemoryEntrySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      managedMemoryEntries: d.managed_memory_entries,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListManagedMemoryStoresResponseSchema: z.ZodType<ListManagedMemoryStoresResponse> =
  z
    .object({
      managed_memory_stores: z
        .array(z.lazy(() => unmarshalManagedMemoryStoreSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      managedMemoryStores: d.managed_memory_stores,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSessionItemsResponseSchema: z.ZodType<ListSessionItemsResponse> =
  z
    .object({
      session_items: z
        .array(z.lazy(() => unmarshalSessionItemSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      sessionItems: d.session_items,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSessionStoresResponseSchema: z.ZodType<ListSessionStoresResponse> =
  z
    .object({
      session_stores: z
        .array(z.lazy(() => unmarshalSessionStoreSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      sessionStores: d.session_stores,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSessionsResponseSchema: z.ZodType<ListSessionsResponse> =
  z
    .object({
      sessions: z.array(z.lazy(() => unmarshalSessionSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      sessions: d.sessions,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalManagedMemoryEntrySchema: z.ZodType<ManagedMemoryEntry> =
  z
    .object({
      name: z.string().optional(),
      actor_id: z.string().optional(),
      session_id: z.string().optional(),
      path: z.string().optional(),
      content: z.string().optional(),
      description: z.string().optional(),
      source_type: z.string().optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      actorId: d.actor_id,
      sessionId: d.session_id,
      path: d.path,
      content: d.content,
      description: d.description,
      sourceType: d.source_type,
      createTime: d.create_time,
      updateTime: d.update_time,
    }));

export const unmarshalManagedMemoryEntrySearchResultSchema: z.ZodType<ManagedMemoryEntrySearchResult> =
  z
    .object({
      managed_memory_entry: z
        .lazy(() => unmarshalManagedMemoryEntrySchema)
        .optional(),
      score: z.number().optional(),
    })
    .transform(d => ({
      managedMemoryEntry: d.managed_memory_entry,
      score: d.score,
    }));

export const unmarshalManagedMemoryStoreSchema: z.ZodType<ManagedMemoryStore> =
  z
    .object({
      name: z.string().optional(),
      display_name: z.string().optional(),
      workspace_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      storage_backend: z.lazy(() => unmarshalStorageBackendSchema).optional(),
      owner_user_id: z.string().optional(),
      creator_user_id: z.string().optional(),
      description: z.string().optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      displayName: d.display_name,
      workspaceId: d.workspace_id,
      storageBackend: d.storage_backend,
      ownerUserId: d.owner_user_id,
      creatorUserId: d.creator_user_id,
      description: d.description,
      createTime: d.create_time,
      updateTime: d.update_time,
    }));

export const unmarshalPopSessionItemResponseSchema: z.ZodType<PopSessionItemResponse> =
  z
    .object({
      item: z.lazy(() => unmarshalSessionItemSchema).optional(),
    })
    .transform(d => ({
      item: d.item,
    }));

export const unmarshalSearchManagedMemoryEntriesResponseSchema: z.ZodType<SearchManagedMemoryEntriesResponse> =
  z
    .object({
      managed_memory_entries: z
        .array(z.lazy(() => unmarshalManagedMemoryEntrySchema))
        .optional(),
      next_page_token: z.string().optional(),
      results: z
        .array(z.lazy(() => unmarshalManagedMemoryEntrySearchResultSchema))
        .optional(),
    })
    .transform(d => ({
      managedMemoryEntries: d.managed_memory_entries,
      nextPageToken: d.next_page_token,
      results: d.results,
    }));

export const unmarshalSessionSchema: z.ZodType<Session> = z
  .object({
    session_id: z.string().optional(),
    actor_id: z.string().optional(),
    parent_session_id: z.string().optional(),
    root_session_id: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    last_activity_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    sessionId: d.session_id,
    actorId: d.actor_id,
    parentSessionId: d.parent_session_id,
    rootSessionId: d.root_session_id,
    metadata: d.metadata,
    createTime: d.create_time,
    updateTime: d.update_time,
    lastActivityTime: d.last_activity_time,
    name: d.name,
  }));

export const unmarshalSessionItemSchema: z.ZodType<SessionItem> = z
  .object({
    item_id: z.string().optional(),
    data: jsonValueSchema.optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    itemId: d.item_id,
    data: d.data,
    createTime: d.create_time,
  }));

export const unmarshalSessionStoreSchema: z.ZodType<SessionStore> = z
  .object({
    creator_user_id: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    description: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    creatorUserId: d.creator_user_id,
    createTime: d.create_time,
    updateTime: d.update_time,
    description: d.description,
    metadata: d.metadata,
    name: d.name,
  }));

export const unmarshalStorageBackendSchema: z.ZodType<StorageBackend> = z
  .object({
    backend_type: z.string().optional(),
    backend_id: z.string().optional(),
  })
  .transform(d => ({
    backendType: d.backend_type,
    backendId: d.backend_id,
  }));

export const marshalAppendSessionItemsRequestSchema: z.ZodType = z
  .object({
    items: z.array(z.lazy(() => marshalSessionItemSchema)).optional(),
    parent: z.string().optional(),
  })
  .transform(d => ({
    items: d.items,
    parent: d.parent,
  }));

export const marshalClearSessionItemsRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
  })
  .transform(d => ({
    parent: d.parent,
  }));

export const marshalExtractMemoriesRequestSchema: z.ZodType = z
  .object({
    memoryStore: z.string().optional(),
    sessionStore: z.string().optional(),
    sessionId: z.string().optional(),
    instructions: z.string().optional(),
    dryRun: z.boolean().optional(),
  })
  .transform(d => ({
    memory_store: d.memoryStore,
    session_store: d.sessionStore,
    session_id: d.sessionId,
    instructions: d.instructions,
    dry_run: d.dryRun,
  }));

export const marshalForkSessionRequestSchema: z.ZodType = z
  .object({
    sourceSessionId: z.string().optional(),
    upToItemId: z.string().optional(),
    sessionId: z.string().optional(),
    actorId: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    parent: z.string().optional(),
  })
  .transform(d => ({
    source_session_id: d.sourceSessionId,
    up_to_item_id: d.upToItemId,
    session_id: d.sessionId,
    actor_id: d.actorId,
    metadata: d.metadata,
    parent: d.parent,
  }));

export const marshalManagedMemoryEntrySchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    actorId: z.string().optional(),
    sessionId: z.string().optional(),
    path: z.string().optional(),
    content: z.string().optional(),
    description: z.string().optional(),
    sourceType: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    actor_id: d.actorId,
    session_id: d.sessionId,
    path: d.path,
    content: d.content,
    description: d.description,
    source_type: d.sourceType,
    create_time: d.createTime,
    update_time: d.updateTime,
  }));

export const marshalManagedMemoryStoreSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    displayName: z.string().optional(),
    workspaceId: z.bigint().optional(),
    storageBackend: z.lazy(() => marshalStorageBackendSchema).optional(),
    ownerUserId: z.string().optional(),
    creatorUserId: z.string().optional(),
    description: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    display_name: d.displayName,
    workspace_id: d.workspaceId,
    storage_backend: d.storageBackend,
    owner_user_id: d.ownerUserId,
    creator_user_id: d.creatorUserId,
    description: d.description,
    create_time: d.createTime,
    update_time: d.updateTime,
  }));

export const marshalPopSessionItemRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
  })
  .transform(d => ({
    parent: d.parent,
  }));

export const marshalSearchManagedMemoryEntriesRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
    actorId: z.string().optional(),
    query: z.string().optional(),
    limit: z.number().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    sessionId: z.string().optional(),
    pathPrefix: z.string().optional(),
    view: z.string().optional(),
  })
  .transform(d => ({
    parent: d.parent,
    actor_id: d.actorId,
    query: d.query,
    limit: d.limit,
    page_size: d.pageSize,
    page_token: d.pageToken,
    session_id: d.sessionId,
    path_prefix: d.pathPrefix,
    view: d.view,
  }));

export const marshalSessionSchema: z.ZodType = z
  .object({
    sessionId: z.string().optional(),
    actorId: z.string().optional(),
    parentSessionId: z.string().optional(),
    rootSessionId: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    lastActivityTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    session_id: d.sessionId,
    actor_id: d.actorId,
    parent_session_id: d.parentSessionId,
    root_session_id: d.rootSessionId,
    metadata: d.metadata,
    create_time: d.createTime,
    update_time: d.updateTime,
    last_activity_time: d.lastActivityTime,
    name: d.name,
  }));

export const marshalSessionItemSchema: z.ZodType = z
  .object({
    itemId: z.string().optional(),
    data: jsonValueSchema.optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    item_id: d.itemId,
    data: d.data,
    create_time: d.createTime,
  }));

export const marshalSessionStoreSchema: z.ZodType = z
  .object({
    creatorUserId: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    description: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    creator_user_id: d.creatorUserId,
    create_time: d.createTime,
    update_time: d.updateTime,
    description: d.description,
    metadata: d.metadata,
    name: d.name,
  }));

export const marshalStorageBackendSchema: z.ZodType = z
  .object({
    backendType: z.string().optional(),
    backendId: z.string().optional(),
  })
  .transform(d => ({
    backend_type: d.backendType,
    backend_id: d.backendId,
  }));

const managedMemoryEntryFieldMaskSchema: FieldMaskSchema = {
  actorId: {wire: 'actor_id'},
  content: {wire: 'content'},
  createTime: {wire: 'create_time'},
  description: {wire: 'description'},
  name: {wire: 'name'},
  path: {wire: 'path'},
  sessionId: {wire: 'session_id'},
  sourceType: {wire: 'source_type'},
  updateTime: {wire: 'update_time'},
};

export function managedMemoryEntryFieldMask(
  ...paths: string[]
): FieldMask<ManagedMemoryEntry> {
  return FieldMask.build<ManagedMemoryEntry>(
    paths,
    managedMemoryEntryFieldMaskSchema
  );
}

const managedMemoryStoreFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  creatorUserId: {wire: 'creator_user_id'},
  description: {wire: 'description'},
  displayName: {wire: 'display_name'},
  name: {wire: 'name'},
  ownerUserId: {wire: 'owner_user_id'},
  storageBackend: {
    wire: 'storage_backend',
    children: () => storageBackendFieldMaskSchema,
  },
  updateTime: {wire: 'update_time'},
  workspaceId: {wire: 'workspace_id'},
};

export function managedMemoryStoreFieldMask(
  ...paths: string[]
): FieldMask<ManagedMemoryStore> {
  return FieldMask.build<ManagedMemoryStore>(
    paths,
    managedMemoryStoreFieldMaskSchema
  );
}

const sessionFieldMaskSchema: FieldMaskSchema = {
  actorId: {wire: 'actor_id'},
  createTime: {wire: 'create_time'},
  lastActivityTime: {wire: 'last_activity_time'},
  metadata: {wire: 'metadata'},
  name: {wire: 'name'},
  parentSessionId: {wire: 'parent_session_id'},
  rootSessionId: {wire: 'root_session_id'},
  sessionId: {wire: 'session_id'},
  updateTime: {wire: 'update_time'},
};

export function sessionFieldMask(...paths: string[]): FieldMask<Session> {
  return FieldMask.build<Session>(paths, sessionFieldMaskSchema);
}

const sessionStoreFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  creatorUserId: {wire: 'creator_user_id'},
  description: {wire: 'description'},
  metadata: {wire: 'metadata'},
  name: {wire: 'name'},
  updateTime: {wire: 'update_time'},
};

export function sessionStoreFieldMask(
  ...paths: string[]
): FieldMask<SessionStore> {
  return FieldMask.build<SessionStore>(paths, sessionStoreFieldMaskSchema);
}

const storageBackendFieldMaskSchema: FieldMaskSchema = {
  backendId: {wire: 'backend_id'},
  backendType: {wire: 'backend_type'},
};
