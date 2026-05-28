// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** The type of failover to perform. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum FailoverFailoverGroupRequest_FailoverType {
  FAILOVER_TYPE_UNSPECIFIED = 'FAILOVER_TYPE_UNSPECIFIED',
  FORCED = 'FORCED',
}

/** The aggregate state of a FailoverGroup. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum FailoverGroup_State {
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  /** FailoverGroup is being created, setup in progress. */
  CREATING = 'CREATING',
  /** FailoverGroup creation failed. */
  CREATION_FAILED = 'CREATION_FAILED',
  /** Initial replication is in progress (bootstrapping data). */
  INITIAL_REPLICATION = 'INITIAL_REPLICATION',
  /** Replication up-to-date, ready for failover. */
  ACTIVE = 'ACTIVE',
  /** Failover or failback in progress. */
  FAILING_OVER = 'FAILING_OVER',
  /** Deletion in progress. */
  DELETING = 'DELETING',
  /** Failover or failback failed. */
  FAILOVER_FAILED = 'FAILOVER_FAILED',
  /** Deletion failed. */
  DELETION_FAILED = 'DELETION_FAILED',
}

/** Request to create a new failover group. */
export interface CreateFailoverGroupRequest {
  /** The parent resource. Format: accounts/{account_id}. */
  parent?: string | undefined;
  /** The failover group to create. */
  failoverGroup?: FailoverGroup | undefined;
  /** When true, validates the request without creating the failover group. */
  validateOnly?: boolean | undefined;
  /**
   * Client-provided identifier for the failover group. Used to construct the
   * resource name as {parent}/failover-groups/{failover_group_id}.
   */
  failoverGroupId?: string | undefined;
}

/** Request to create a new stable URL for failover-aware workspace access. */
export interface CreateStableUrlRequest {
  /** The parent resource. Format: accounts/{account_id}. */
  parent?: string | undefined;
  /** The stable URL to create. */
  stableUrl?: StableUrl | undefined;
  /** When true, validates the request without creating the stable URL. */
  validateOnly?: boolean | undefined;
  /**
   * Client-provided identifier for the stable URL. Used to construct the
   * resource name as {parent}/stable-urls/{stable_url_id}.
   */
  stableUrlId?: string | undefined;
}

/** Request to delete a failover group. */
export interface DeleteFailoverGroupRequest {
  /**
   * The fully qualified resource name of the failover group to delete.
   * Format: accounts/{account_id}/failover-groups/{failover_group_id}.
   */
  name?: string | undefined;
  /**
   * Opaque version string for optimistic locking. If provided, must match the
   * current etag. If omitted, the delete proceeds without an etag check.
   */
  etag?: string | undefined;
}

/** Request to delete a stable URL. */
export interface DeleteStableUrlRequest {
  /**
   * The fully qualified resource name.
   * Format: accounts/{account_id}/stable-urls/{stable_url_id}.
   */
  name?: string | undefined;
}

/** Request to failover a failover group to a new primary region. */
export interface FailoverFailoverGroupRequest {
  /**
   * The fully qualified resource name of the failover group to failover.
   * Format: accounts/{account_id}/failover-groups/{failover_group_id}.
   */
  name?: string | undefined;
  /**
   * The target primary region. Must be one of the derived regions and different
   * from the current effective_primary_region. Serves as an idempotency check.
   */
  targetPrimaryRegion?: string | undefined;
  /**
   * Opaque version string for optimistic locking. If provided, must match the
   * current etag. If omitted, the failover proceeds regardless of current state.
   */
  etag?: string | undefined;
  /** The type of failover to perform. */
  failoverType?: FailoverFailoverGroupRequest_FailoverType | undefined;
}

/**
 * A failover group manages disaster recovery across workspace sets,
 * coordinating UCDR and CPDR replication.
 */
export interface FailoverGroup {
  /**
   * Fully qualified resource name in the format
   * accounts/{account_id}/failover-groups/{failover_group_id}.
   */
  name?: string | undefined;
  /**
   * Current effective primary region. Replication flows FROM workspaces in this region.
   * Changes after a successful failover.
   */
  effectivePrimaryRegion?: string | undefined;
  /** List of all regions participating in this failover group. */
  regions?: string[] | undefined;
  /** Workspace sets, each containing workspaces that replicate to each other. */
  workspaceSets?: WorkspaceSet[] | undefined;
  /** Unity Catalog replication configuration. */
  unityCatalogAssets?: UcReplicationConfig | undefined;
  /** Aggregate state of the failover group. */
  state?: FailoverGroup_State | undefined;
  /**
   * Opaque version string for optimistic locking. Server-generated, returned in responses.
   * Must be provided on Update requests to prevent concurrent modifications.
   */
  etag?: string | undefined;
  /** Time at which this failover group was created. */
  createTime?: Temporal.Instant | undefined;
  /** Time at which this failover group was last modified. */
  updateTime?: Temporal.Instant | undefined;
  /** The latest point in time to which data has been replicated. */
  replicationPoint?: Temporal.Instant | undefined;
  /**
   * Initial primary region. Used only in Create requests to set the starting
   * primary region. Not returned in responses.
   */
  initialPrimaryRegion?: string | undefined;
}

/** Request to get a failover group. */
export interface GetFailoverGroupRequest {
  /**
   * The fully qualified resource name of the failover group.
   * Format: accounts/{account_id}/failover-groups/{failover_group_id}.
   */
  name?: string | undefined;
}

/** Request to get a stable URL. */
export interface GetStableUrlRequest {
  /**
   * The fully qualified resource name.
   * Format: accounts/{account_id}/stable-urls/{stable_url_id}.
   */
  name?: string | undefined;
}

/** Request to list failover groups for an account. */
export interface ListFailoverGroupsRequest {
  /** The parent resource. Format: accounts/{account_id}. */
  parent?: string | undefined;
  /**
   * Maximum number of failover groups to return per page:
   * - when set to a value greater than 0, the page length is the minimum of this value
   * and a server configured value;
   * - when set to 0 or unset, the page length is set to a server configured value
   * (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned.
   */
  pageSize?: number | undefined;
  /**
   * Page token received from a previous ListFailoverGroups call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string | undefined;
}

/** Response for listing failover groups. */
export interface ListFailoverGroupsResponse {
  /** The failover groups for this account. */
  failoverGroups?: FailoverGroup[] | undefined;
  /**
   * A token that can be sent as page_token to retrieve the next page.
   * If omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

/** Request to list stable URLs for an account. */
export interface ListStableUrlsRequest {
  /** The parent resource. Format: accounts/{account_id}. */
  parent?: string | undefined;
  /**
   * Maximum number of stable URLs to return per page:
   * - when set to a value greater than 0, the page length is the minimum of this value
   * and a server configured value;
   * - when set to 0 or unset, the page length is set to a server configured value
   * (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned.
   */
  pageSize?: number | undefined;
  /**
   * Page token received from a previous ListStableUrls call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string | undefined;
}

/** Response for listing stable URLs. */
export interface ListStableUrlsResponse {
  /** The stable URLs for this account. */
  stableUrls?: StableUrl[] | undefined;
  /**
   * A token that can be sent as page_token to retrieve the next page.
   * If omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

/**
 * A location mapping identified by a name, with URIs per region.
 * The system derives replication direction from effective_primary_region.
 */
export interface LocationMapping {
  /** Resource name for this location. */
  name?: string | undefined;
  /** URI for each region. Each entry maps a region name to a storage URI. */
  uriByRegion?: LocationMappingEntry[] | undefined;
}

/**
 * A single entry in a location mapping, mapping a region to a storage URI.
 * Used instead of map<string, string> for proto2 compatibility.
 */
export interface LocationMappingEntry {
  /** The region name. */
  region?: string | undefined;
  /** The storage URI for this region. */
  uri?: string | undefined;
}

/**
 * A stable URL provides a failover-aware endpoint for accessing a workspace.
 * Its lifecycle is independent of any failover group.
 */
export interface StableUrl {
  /**
   * Fully qualified resource name.
   * Format: accounts/{account_id}/stable-urls/{stable_url_id}.
   */
  name?: string | undefined;
  /**
   * The stable URL endpoint. Generated by the backend on creation and
   * immutable thereafter. For non-Private-Link workspaces this is
   * `https://<spog_host>/?c=<connection_id>`. For Private-Link workspaces
   * this is the per-connection hostname.
   */
  url?: string | undefined;
  /**
   * The workspace this stable URL is initially bound to. Used only in Create
   * requests to associate the stable URL with a workspace. Not returned in
   * responses. Mirrors FailoverGroup.initial_primary_region semantics.
   */
  initialWorkspaceId?: string | undefined;
  /**
   * Fully qualified resource name of the FailoverGroup this stable URL is
   * currently linked to, in the format
   * `accounts/{account_id}/failover-groups/{failover_group_id}`. Empty when
   * the stable URL is not attached to any failover group. Server-controlled:
   * written by CreateFailoverGroup / UpdateFailoverGroup on link, cleared by
   * DeleteFailoverGroup / UpdateFailoverGroup on unlink.
   */
  failoverGroupName?: string | undefined;
}

/** A Unity Catalog catalog to replicate. */
export interface UcCatalog {
  /** The name of the UC catalog to replicate. */
  name?: string | undefined;
}

/** Unity Catalog replication configuration (top-level, not per-set). */
export interface UcReplicationConfig {
  /** Location mappings - storage URI per region for each location. */
  locationMappings?: LocationMapping[] | undefined;
  /** UC catalogs to replicate. */
  catalogs?: UcCatalog[] | undefined;
  /**
   * The workspace set whose workspaces will be used for data replication
   * of all UC catalogs' underlying storage.
   */
  dataReplicationWorkspaceSet?: string | undefined;
}

/** Request to update a failover group. */
export interface UpdateFailoverGroupRequest {
  /**
   * The failover group with updated fields. The name field identifies the resource
   * and is populated from the URL path.
   */
  failoverGroup?: FailoverGroup | undefined;
  /** Comma-separated list of fields to update. */
  updateMask?: FieldMask<FailoverGroup> | undefined;
}

/** A set of workspaces that replicate to each other across regions. */
export interface WorkspaceSet {
  /** Resource name for this workspace set. */
  name?: string | undefined;
  /**
   * Workspace IDs in this set. The system derives and validates regions.
   * EA: exactly 2 workspaces (one per region).
   */
  workspaceIds?: string[] | undefined;
  /**
   * Whether to enable control plane DR (notebooks, jobs, clusters, etc.) for this set.
   * Requires all workspaces in the set to be Mission Critical tier.
   */
  replicateWorkspaceAssets?: boolean | undefined;
  /**
   * Resource names of stable URLs associated with this workspace set.
   * Format: accounts/{account_id}/stable-urls/{stable_url_id}.
   * The referenced stable URLs must already exist (via CreateStableUrl).
   */
  stableUrlNames?: string[] | undefined;
}

export const unmarshalFailoverGroupSchema: z.ZodType<FailoverGroup> = z
  .object({
    name: z.string().optional(),
    effective_primary_region: z.string().optional(),
    regions: z.array(z.string()).optional(),
    workspace_sets: z
      .array(z.lazy(() => unmarshalWorkspaceSetSchema))
      .optional(),
    unity_catalog_assets: z
      .lazy(() => unmarshalUcReplicationConfigSchema)
      .optional(),
    state: z.enum(FailoverGroup_State).optional(),
    etag: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    replication_point: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    initial_primary_region: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    effectivePrimaryRegion: d.effective_primary_region,
    regions: d.regions,
    workspaceSets: d.workspace_sets,
    unityCatalogAssets: d.unity_catalog_assets,
    state: d.state,
    etag: d.etag,
    createTime: d.create_time,
    updateTime: d.update_time,
    replicationPoint: d.replication_point,
    initialPrimaryRegion: d.initial_primary_region,
  }));

export const unmarshalListFailoverGroupsResponseSchema: z.ZodType<ListFailoverGroupsResponse> =
  z
    .object({
      failover_groups: z
        .array(z.lazy(() => unmarshalFailoverGroupSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      failoverGroups: d.failover_groups,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListStableUrlsResponseSchema: z.ZodType<ListStableUrlsResponse> =
  z
    .object({
      stable_urls: z.array(z.lazy(() => unmarshalStableUrlSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      stableUrls: d.stable_urls,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalLocationMappingSchema: z.ZodType<LocationMapping> = z
  .object({
    name: z.string().optional(),
    uri_by_region: z
      .array(z.lazy(() => unmarshalLocationMappingEntrySchema))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    uriByRegion: d.uri_by_region,
  }));

export const unmarshalLocationMappingEntrySchema: z.ZodType<LocationMappingEntry> =
  z
    .object({
      region: z.string().optional(),
      uri: z.string().optional(),
    })
    .transform(d => ({
      region: d.region,
      uri: d.uri,
    }));

export const unmarshalStableUrlSchema: z.ZodType<StableUrl> = z
  .object({
    name: z.string().optional(),
    url: z.string().optional(),
    initial_workspace_id: z.string().optional(),
    failover_group_name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    url: d.url,
    initialWorkspaceId: d.initial_workspace_id,
    failoverGroupName: d.failover_group_name,
  }));

export const unmarshalUcCatalogSchema: z.ZodType<UcCatalog> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalUcReplicationConfigSchema: z.ZodType<UcReplicationConfig> =
  z
    .object({
      location_mappings: z
        .array(z.lazy(() => unmarshalLocationMappingSchema))
        .optional(),
      catalogs: z.array(z.lazy(() => unmarshalUcCatalogSchema)).optional(),
      data_replication_workspace_set: z.string().optional(),
    })
    .transform(d => ({
      locationMappings: d.location_mappings,
      catalogs: d.catalogs,
      dataReplicationWorkspaceSet: d.data_replication_workspace_set,
    }));

export const unmarshalWorkspaceSetSchema: z.ZodType<WorkspaceSet> = z
  .object({
    name: z.string().optional(),
    workspace_ids: z.array(z.string()).optional(),
    replicate_workspace_assets: z.boolean().optional(),
    stable_url_names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    workspaceIds: d.workspace_ids,
    replicateWorkspaceAssets: d.replicate_workspace_assets,
    stableUrlNames: d.stable_url_names,
  }));

export const marshalFailoverFailoverGroupRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    targetPrimaryRegion: z.string().optional(),
    etag: z.string().optional(),
    failoverType: z.enum(FailoverFailoverGroupRequest_FailoverType).optional(),
  })
  .transform(d => ({
    name: d.name,
    target_primary_region: d.targetPrimaryRegion,
    etag: d.etag,
    failover_type: d.failoverType,
  }));

export const marshalFailoverGroupSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    effectivePrimaryRegion: z.string().optional(),
    regions: z.array(z.string()).optional(),
    workspaceSets: z.array(z.lazy(() => marshalWorkspaceSetSchema)).optional(),
    unityCatalogAssets: z
      .lazy(() => marshalUcReplicationConfigSchema)
      .optional(),
    state: z.enum(FailoverGroup_State).optional(),
    etag: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    replicationPoint: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    initialPrimaryRegion: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    effective_primary_region: d.effectivePrimaryRegion,
    regions: d.regions,
    workspace_sets: d.workspaceSets,
    unity_catalog_assets: d.unityCatalogAssets,
    state: d.state,
    etag: d.etag,
    create_time: d.createTime,
    update_time: d.updateTime,
    replication_point: d.replicationPoint,
    initial_primary_region: d.initialPrimaryRegion,
  }));

export const marshalLocationMappingSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    uriByRegion: z
      .array(z.lazy(() => marshalLocationMappingEntrySchema))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    uri_by_region: d.uriByRegion,
  }));

export const marshalLocationMappingEntrySchema: z.ZodType = z
  .object({
    region: z.string().optional(),
    uri: z.string().optional(),
  })
  .transform(d => ({
    region: d.region,
    uri: d.uri,
  }));

export const marshalStableUrlSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    url: z.string().optional(),
    initialWorkspaceId: z.string().optional(),
    failoverGroupName: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    url: d.url,
    initial_workspace_id: d.initialWorkspaceId,
    failover_group_name: d.failoverGroupName,
  }));

export const marshalUcCatalogSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalUcReplicationConfigSchema: z.ZodType = z
  .object({
    locationMappings: z
      .array(z.lazy(() => marshalLocationMappingSchema))
      .optional(),
    catalogs: z.array(z.lazy(() => marshalUcCatalogSchema)).optional(),
    dataReplicationWorkspaceSet: z.string().optional(),
  })
  .transform(d => ({
    location_mappings: d.locationMappings,
    catalogs: d.catalogs,
    data_replication_workspace_set: d.dataReplicationWorkspaceSet,
  }));

export const marshalWorkspaceSetSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    workspaceIds: z.array(z.string()).optional(),
    replicateWorkspaceAssets: z.boolean().optional(),
    stableUrlNames: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    workspace_ids: d.workspaceIds,
    replicate_workspace_assets: d.replicateWorkspaceAssets,
    stable_url_names: d.stableUrlNames,
  }));

const failoverGroupFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  effectivePrimaryRegion: {wire: 'effective_primary_region'},
  etag: {wire: 'etag'},
  initialPrimaryRegion: {wire: 'initial_primary_region'},
  name: {wire: 'name'},
  regions: {wire: 'regions'},
  replicationPoint: {wire: 'replication_point'},
  state: {wire: 'state'},
  unityCatalogAssets: {
    wire: 'unity_catalog_assets',
    children: () => ucReplicationConfigFieldMaskSchema,
  },
  updateTime: {wire: 'update_time'},
  workspaceSets: {wire: 'workspace_sets'},
};

export function failoverGroupFieldMask(
  ...paths: string[]
): FieldMask<FailoverGroup> {
  return FieldMask.build<FailoverGroup>(paths, failoverGroupFieldMaskSchema);
}

const ucReplicationConfigFieldMaskSchema: FieldMaskSchema = {
  catalogs: {wire: 'catalogs'},
  dataReplicationWorkspaceSet: {wire: 'data_replication_workspace_set'},
  locationMappings: {wire: 'location_mappings'},
};
