// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Kind of asset an AssetLink points to. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AssetType = {
  /** Default value. Returned when the asset type is unset or unknown. */
  ASSET_TYPE_UNSPECIFIED: 'ASSET_TYPE_UNSPECIFIED',
  /**
   * UC table, metric view, or materialized view. Create accepts a table UUID
   * or fully qualified name (FQN, `catalog.schema.table`). Create and Get return
   * the table's current FQN. `asset_scope_id` is the metastore UUID.
   */
  ASSET_TYPE_UC_TABLE: 'ASSET_TYPE_UC_TABLE',
  /**
   * Lakeview dashboard. Create accepts its UUID as 32 hexadecimal characters
   * or in hyphenated form. `asset_scope_id` is the decimal workspace ID string.
   */
  ASSET_TYPE_WORKSPACE_DASHBOARD: 'ASSET_TYPE_WORKSPACE_DASHBOARD',
  /**
   * Genie agent (space). `asset_id` is the native space ID: 32 lowercase
   * hexadecimal characters without hyphens. `asset_scope_id` is the decimal
   * workspace ID string.
   */
  ASSET_TYPE_WORKSPACE_GENIE_AGENT: 'ASSET_TYPE_WORKSPACE_GENIE_AGENT',
  /**
   * Workspace notebook. `asset_id` is its numeric workspace tree ID.
   * `asset_scope_id` is the decimal workspace ID string.
   */
  ASSET_TYPE_WORKSPACE_NOTEBOOK: 'ASSET_TYPE_WORKSPACE_NOTEBOOK',
  /**
   * Databricks app. Create accepts its UUID or app name; Create and Get return
   * the stable app UUID, including when Create receives a name.
   * `asset_scope_id` is the decimal workspace ID string.
   */
  ASSET_TYPE_WORKSPACE_APP: 'ASSET_TYPE_WORKSPACE_APP',
  /**
   * Saved DBSQL query. `asset_id` is the saved-query UUID in hyphenated form.
   * `asset_scope_id` is the decimal workspace ID string.
   */
  ASSET_TYPE_WORKSPACE_DBSQL_QUERY: 'ASSET_TYPE_WORKSPACE_DBSQL_QUERY',
  /**
   * Another knowledge page in the same account. `asset_id` is the bare page
   * UUID, without the `pages/` prefix. `asset_scope_id` is the calling account UUID.
   */
  ASSET_TYPE_ACCOUNT_PAGE: 'ASSET_TYPE_ACCOUNT_PAGE',
  /** Deprecated. Account-user links are not supported by the public API. */
  ASSET_TYPE_ACCOUNT_USER: 'ASSET_TYPE_ACCOUNT_USER',
  /**
   * External resource. `asset_id` is an absolute HTTP or HTTPS URL with a host,
   * up to 2,048 characters. `asset_scope_id` is the calling account UUID.
   */
  ASSET_TYPE_EXTERNAL_URL: 'ASSET_TYPE_EXTERNAL_URL',
} as const;
export type AssetType =
  | (typeof AssetType)[keyof typeof AssetType]
  | (string & {});

/** Lifecycle state of a Page. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const State = {
  /** Default value. Returned when the lifecycle state is unset or unknown. */
  STATE_UNSPECIFIED: 'STATE_UNSPECIFIED',
  /** The page is a work-in-progress draft. */
  DRAFT: 'DRAFT',
  /** The page is published and discoverable. */
  PUBLISHED: 'PUBLISHED',
} as const;
export type State = (typeof State)[keyof typeof State] | (string & {});

/**
 * A reference or provenance link from a page to an asset.
 * Links are immutable; to change the target, delete and re-create the link.
 */
export interface AssetLink {
  /**
   * Resource name of the link. Server-assigned on create, immutable thereafter.
   * Format: `pages/{page_id}/asset-link-categories/{category}/asset-links/{link_id}`,
   * where `category` is `SOURCE` or `RELATED_ASSETS` and `link_id` is a
   * server-generated UUID. Omit on create; use the returned name for Get/Delete.
   */
  name?: string | undefined;
  /**
   * Kind of asset this link points to. Required on create;
   * `ASSET_TYPE_UNSPECIFIED` is not a valid target type.
   */
  assetType?: AssetType | undefined;
  /**
   * Containing scope of the asset. Required on create for every asset type:
   * - UC table: metastore UUID.
   * - Workspace asset: decimal workspace ID string.
   * - Account page or external URL: the calling account UUID.
   * Pass the bare ID, without a resource-name prefix. Query and Genie links,
   * dashboard UUID inputs, and app-name inputs require this scope to match the
   * caller's workspace.
   */
  assetScopeId?: string | undefined;
  /**
   * Target identifier within `asset_scope_id`. Required on create. The accepted
   * format depends on `asset_type`; see the identifier rules on each AssetType.
   * For Databricks assets, pass the bare identifier rather than a resource name
   * such as `pages/{page_id}` or `queries/{query_id}`. External assets use the
   * full URL. Create and Get return table FQNs, app UUIDs,
   * query UUIDs, and native Genie space IDs.
   */
  assetId?: string | undefined;
  /** Server-assigned creation time, formatted as an RFC 3339 timestamp in JSON. */
  createTime?: Temporal.Instant | undefined;
}

/** Request for CreateAssetLink. */
export interface CreateAssetLinkRequest {
  /**
   * Category collection on the page in which to create the link.
   * Format: `pages/{page_id}/asset-link-categories/{category}`, where
   * `{category}` is a `LinkCategory` value (`SOURCE` or `RELATED_ASSETS`).
   */
  parent?: string | undefined;
  /**
   * The link to create. `asset_type`, `asset_scope_id`, and `asset_id` are
   * required. The server assigns `name` and `create_time`; the path supplies
   * the page and category. A duplicate target in that category returns the
   * existing link.
   */
  assetLink?: AssetLink | undefined;
}

/** Request for CreatePage. */
export interface CreatePageRequest {
  /**
   * The page to create. `domain` and `display_name` are required; the server
   * assigns `name`, `create_time`, and `update_time`. Other fields follow the
   * defaults and format requirements documented on Page.
   */
  page?: Page | undefined;
  /**
   * Optional UUIDv4 scoped to the account and caller. Retries return the current
   * page without applying retry payload changes. Every retry must pass request
   * validation and current create permissions, plus view permission on the returned
   * page. Deletion releases the token; later retries may create a new page.
   */
  requestId?: string | undefined;
}

/** Request for DeleteAssetLink. */
export interface DeleteAssetLinkRequest {
  /**
   * Resource name of the link to delete.
   * Format:
   * `pages/{page_id}/asset-link-categories/{category}/asset-links/{link_id}`
   */
  name?: string | undefined;
}

/** Request for DeletePage. */
export interface DeletePageRequest {
  /**
   * Resource name of the page to delete.
   * Format: `pages/{page_id}`
   */
  name?: string | undefined;
}

/** Request for GetAssetLink. */
export interface GetAssetLinkRequest {
  /**
   * Resource name of the link to retrieve.
   * Format:
   * `pages/{page_id}/asset-link-categories/{category}/asset-links/{link_id}`
   */
  name?: string | undefined;
}

/** Request for GetPage. */
export interface GetPageRequest {
  /**
   * Resource name of the page to retrieve.
   * Format: `pages/{page_id}`
   */
  name?: string | undefined;
}

/** Request for ListPages. */
export interface ListPagesRequest {
  /**
   * Maximum number of pages to return, from 1 to 100. Defaults to 50 when omitted.
   * The server may return fewer.
   */
  pageSize?: number | undefined;
  /**
   * Opaque `next_page_token` from a previous ListPages response. Omit on the
   * first request; pass it unchanged and keep the same filter when continuing.
   */
  pageToken?: string | undefined;
  /**
   * Filter clauses with double-quoted values, joined by uppercase `AND`.
   * Each field may appear once:
   * - `domain = "domains/{domain_id}"` includes that domain and its subdomains.
   * - `state = "DRAFT"` or `state = "PUBLISHED"` matches that state exactly.
   * For example: `domain = "domains/{domain_id}" AND state = "PUBLISHED"`.
   * Other fields and operators are not supported. An omitted or blank filter
   * lists visible pages across the account, subject to ListPages permissions.
   */
  filter?: string | undefined;
}

/** Response for ListPages. */
export interface ListPagesResponse {
  /**
   * The requested pages. Each page includes only `name`, `display_name`,
   * `domain`, `state`, and `update_time`. Use GetPage for the full resource.
   * The list can be empty even when `next_page_token` is present.
   */
  pages?: Page[] | undefined;
  /**
   * Opaque continuation token. Pass as `page_token` to continue, even if this
   * response contains fewer than `page_size` pages or no pages. An absent or
   * empty token means there are no more results.
   */
  nextPageToken?: string | undefined;
}

/**
 * A knowledge page: a domain-scoped governance document describing a concept
 * or term in the account.
 */
export interface Page {
  /**
   * Resource name in the form `pages/{page_id}`, where `page_id` is a
   * server-generated UUID. Omit on create; required to identify the page on
   * update. Get and Delete also address pages by this full resource name.
   */
  name?: string | undefined;
  /**
   * Resource name of the domain this page belongs to; format `domains/{domain_id}`.
   * Required on create. Use the full resource name rather than a bare domain ID.
   * The domain is fixed after creation; updating it is not supported.
   */
  domain?: string | undefined;
  /**
   * Human-readable title, 1 to 200 characters.
   * Required on create and when selected by `update_mask`.
   * Published titles must be unique within the domain.
   */
  displayName?: string | undefined;
  /**
   * Page body as Markdown text. An update replaces the entire body when
   * `body` is selected by `update_mask`.
   */
  body?: string | undefined;
  /**
   * Alternate names or abbreviations. Accepts at most 50 entries, each 1 to
   * 200 characters. Values are trimmed, deduplicated, and sorted.
   * An update replaces the entire list when `synonyms` is selected by
   * `update_mask`; an empty list clears it.
   */
  synonyms?: string[] | undefined;
  /**
   * Short description of the page. An update replaces the description when
   * `description` is selected by `update_mask`.
   */
  description?: string | undefined;
  /**
   * Lifecycle state. Omitting it on create defaults to `DRAFT`. Set `PUBLISHED`
   * to publish or `DRAFT` to unpublish. An update selecting `state` in
   * `update_mask` must explicitly supply `DRAFT` or `PUBLISHED`.
   */
  state?: State | undefined;
  /** Server-assigned creation time, formatted as an RFC 3339 timestamp in JSON. */
  createTime?: Temporal.Instant | undefined;
  /** Server-assigned last-update time, formatted as an RFC 3339 timestamp in JSON. */
  updateTime?: Temporal.Instant | undefined;
  /**
   * Decimal principal ID strings for the page's single owner: a user, group,
   * or service principal. Use principal IDs rather than email addresses or
   * service-principal application UUIDs. On create, an omitted or empty list
   * defaults to the caller; at most one ID may be supplied. An update selecting
   * `owner_ids` in `update_mask` must supply exactly one ID to replace the owner.
   */
  ownerIds?: string[] | undefined;
}

/** Request for UpdatePage. */
export interface UpdatePageRequest {
  /**
   * The page to update. `name` is required in the form `pages/{page_id}`.
   * Only fields selected by `update_mask` are written.
   */
  page?: Page | undefined;
  /**
   * Nonempty set of Page fields to update. Supported paths are `display_name`,
   * `body`, `synonyms`, `description`, `state`, and `owner_ids`, without a `page.`
   * prefix. Wildcards, `domain`, and server-assigned fields are not supported.
   * In REST requests, pass a comma-separated query parameter, for example
   * `update_mask=display_name,body`. There is no implicit update of all fields.
   */
  updateMask?: FieldMask<Page> | undefined;
}

export const unmarshalAssetLinkSchema: z.ZodType<AssetLink> = z
  .object({
    name: z.string().optional(),
    asset_type: z.string().optional(),
    asset_scope_id: z.string().optional(),
    asset_id: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    assetType: d.asset_type,
    assetScopeId: d.asset_scope_id,
    assetId: d.asset_id,
    createTime: d.create_time,
  }));

export const unmarshalListPagesResponseSchema: z.ZodType<ListPagesResponse> = z
  .object({
    pages: z.array(z.lazy(() => unmarshalPageSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    pages: d.pages,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalPageSchema: z.ZodType<Page> = z
  .object({
    name: z.string().optional(),
    domain: z.string().optional(),
    display_name: z.string().optional(),
    body: z.string().optional(),
    synonyms: z.array(z.string()).optional(),
    description: z.string().optional(),
    state: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    owner_ids: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    domain: d.domain,
    displayName: d.display_name,
    body: d.body,
    synonyms: d.synonyms,
    description: d.description,
    state: d.state,
    createTime: d.create_time,
    updateTime: d.update_time,
    ownerIds: d.owner_ids,
  }));

export const marshalAssetLinkSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    assetType: z.string().optional(),
    assetScopeId: z.string().optional(),
    assetId: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    asset_type: d.assetType,
    asset_scope_id: d.assetScopeId,
    asset_id: d.assetId,
    create_time: d.createTime,
  }));

export const marshalPageSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    domain: z.string().optional(),
    displayName: z.string().optional(),
    body: z.string().optional(),
    synonyms: z.array(z.string()).optional(),
    description: z.string().optional(),
    state: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    ownerIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    domain: d.domain,
    display_name: d.displayName,
    body: d.body,
    synonyms: d.synonyms,
    description: d.description,
    state: d.state,
    create_time: d.createTime,
    update_time: d.updateTime,
    owner_ids: d.ownerIds,
  }));

const pageFieldMaskSchema: FieldMaskSchema = {
  body: {wire: 'body'},
  createTime: {wire: 'create_time'},
  description: {wire: 'description'},
  displayName: {wire: 'display_name'},
  domain: {wire: 'domain'},
  name: {wire: 'name'},
  ownerIds: {wire: 'owner_ids'},
  state: {wire: 'state'},
  synonyms: {wire: 'synonyms'},
  updateTime: {wire: 'update_time'},
};

export function pageFieldMask(...paths: string[]): FieldMask<Page> {
  return FieldMask.build<Page>(paths, pageFieldMaskSchema);
}
