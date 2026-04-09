// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum DeltaSharingScope_Enum {
  /**
   * Internal Delta Sharing enabled on metastore.
   * This applies to Databricks-managed authentication where both provider and recipient are
   * under the same account.
   */
  INTERNAL = 'INTERNAL',
  /**
   * Internal and External Delta Sharing enabled on metastore.
   * This allows all flavors of Delta Sharing.
   */
  INTERNAL_AND_EXTERNAL = 'INTERNAL_AND_EXTERNAL',
}

export interface CreateMetastore {
  /** The user-specified name of the metastore. */
  name?: string | undefined;
  /** The storage root URL for metastore */
  storageRoot?: string | undefined;
  /** Unique identifier of the metastore's (Default) Data Access Configuration. */
  defaultDataAccessConfigId?: string | undefined;
  /** UUID of storage credential to access the metastore storage_root. */
  storageRootCredentialId?: string | undefined;
  /** The scope of Delta Sharing enabled for the metastore. */
  deltaSharingScope?: DeltaSharingScope_Enum | undefined;
  /** The lifetime of delta sharing recipient token in seconds. */
  deltaSharingRecipientTokenLifetimeInSeconds?: number | undefined;
  /** The organization name of a Delta Sharing entity, to be used in Databricks-to-Databricks Delta Sharing as the official name. */
  deltaSharingOrganizationName?: string | undefined;
  /** The owner of the metastore. */
  owner?: string | undefined;
  /** Privilege model version of the metastore, of the form `major.minor` (e.g., `1.0`). */
  privilegeModelVersion?: string | undefined;
  /** Cloud region which the metastore serves (e.g., `us-west-2`, `westus`). */
  region?: string | undefined;
  /** Unique identifier of metastore. */
  metastoreId?: string | undefined;
  /** Time at which this metastore was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the metastore. */
  updatedBy?: string | undefined;
  /** Name of the storage credential to access the metastore storage_root. */
  storageRootCredentialName?: string | undefined;
  /** Cloud vendor of the metastore home shard (e.g., `aws`, `azure`, `gcp`). */
  cloud?: string | undefined;
  /** Globally unique metastore ID across clouds and regions, of the form `cloud:region:metastore_id`. */
  globalMetastoreId?: string | undefined;
  /** Whether to allow non-DBR clients to directly access entities under the metastore. */
  externalAccessEnabled?: boolean | undefined;
}

export interface CreateMetastoreAssignment {
  /** A workspace ID. */
  workspaceId?: number | undefined;
  /** The unique ID of the metastore. */
  metastoreId?: string | undefined;
  /**
   * The name of the default catalog in the metastore.
   * This field is deprecated. Please use "Default Namespace API" to
   * configure the default catalog for a <Databricks> workspace.
   */
  defaultCatalogName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface CreateMetastoreAssignment_Response {}

export interface DeleteMetastore {
  /** Unique ID of the metastore. */
  id?: string | undefined;
  /** Force deletion even if the metastore is not empty. Default is false. */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteMetastore_Response {}

export interface DeleteMetastoreAssignment {
  /** A workspace ID. */
  workspaceId?: number | undefined;
  /** Query for the ID of the metastore to delete. */
  metastoreId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteMetastoreAssignment_Response {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeltaSharingScope {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetCurrentMetastoreAssignment {}

export interface GetMetastore {
  /** Unique ID of the metastore. */
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetMetastoreSummary {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetMetastoreSummary_Response {
  /** Unique identifier of metastore. */
  metastoreId?: string | undefined;
  /** The user-specified name of the metastore. */
  name?: string | undefined;
  /** Unique identifier of the metastore's (Default) Data Access Configuration. */
  defaultDataAccessConfigId?: string | undefined;
  /** UUID of storage credential to access the metastore storage_root. */
  storageRootCredentialId?: string | undefined;
  /** Cloud vendor of the metastore home shard (e.g., `aws`, `azure`, `gcp`). */
  cloud?: string | undefined;
  /** Cloud region which the metastore serves (e.g., `us-west-2`, `westus`). */
  region?: string | undefined;
  /** Globally unique metastore ID across clouds and regions, of the form `cloud:region:metastore_id`. */
  globalMetastoreId?: string | undefined;
  /** Name of the storage credential to access the metastore storage_root. */
  storageRootCredentialName?: string | undefined;
  /** Privilege model version of the metastore, of the form `major.minor` (e.g., `1.0`). */
  privilegeModelVersion?: string | undefined;
  /** The scope of Delta Sharing enabled for the metastore. */
  deltaSharingScope?: DeltaSharingScope_Enum | undefined;
  /** The lifetime of delta sharing recipient token in seconds. */
  deltaSharingRecipientTokenLifetimeInSeconds?: number | undefined;
  /** The organization name of a Delta Sharing entity, to be used in Databricks-to-Databricks Delta Sharing as the official name. */
  deltaSharingOrganizationName?: string | undefined;
  /** The storage root URL for metastore */
  storageRoot?: string | undefined;
  /** The owner of the metastore. */
  owner?: string | undefined;
  /** Time at which this metastore was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the metastore. */
  updatedBy?: string | undefined;
  /** Whether to allow non-DBR clients to directly access entities under the metastore. */
  externalAccessEnabled?: boolean | undefined;
}

export interface ListGlobalMetastoresRequest {
  /**
   * Maximum number of metastores to return.
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all the metastores are returned (not recommended).
   * - Note: The number of returned metastores might be less than the specified page_size, even zero.
   * The only definitive indication that no further metastores can be fetched is when the next_page_token is unset from the response.
   */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
  /**
   * When true, only returns metastores from the local shard (used by the global
   * pagination path to query individual remote shards).
   */
  shardLocalOnly?: boolean | undefined;
}

export interface ListGlobalMetastoresResponse {
  /** An array of metastore information objects. */
  metastores?: MetastoreInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListMetastores {
  /**
   * Maximum number of metastores to return.
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all the metastores are returned (not recommended).
   * - Note: The number of returned metastores might be less than the specified max_results size, even zero.
   * The only definitive indication that no further metastores can be fetched is when the next_page_token is unset from the response.
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListMetastores_Response {
  /** An array of metastore information objects. */
  metastores?: MetastoreInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface MetastoreAssignment {
  /** The unique ID of the <Databricks> workspace. */
  workspaceId?: number | undefined;
  /** The unique ID of the metastore. */
  metastoreId?: string | undefined;
  /**
   * The name of the default catalog in the metastore. This field is deprecated.
   * Please use "Default Namespace API" to configure the default catalog for a <Databricks> workspace.
   */
  defaultCatalogName?: string | undefined;
}

export interface MetastoreInfo {
  /** The user-specified name of the metastore. */
  name?: string | undefined;
  /** The storage root URL for metastore */
  storageRoot?: string | undefined;
  /** Unique identifier of the metastore's (Default) Data Access Configuration. */
  defaultDataAccessConfigId?: string | undefined;
  /** UUID of storage credential to access the metastore storage_root. */
  storageRootCredentialId?: string | undefined;
  /** The scope of Delta Sharing enabled for the metastore. */
  deltaSharingScope?: DeltaSharingScope_Enum | undefined;
  /** The lifetime of delta sharing recipient token in seconds. */
  deltaSharingRecipientTokenLifetimeInSeconds?: number | undefined;
  /** The organization name of a Delta Sharing entity, to be used in Databricks-to-Databricks Delta Sharing as the official name. */
  deltaSharingOrganizationName?: string | undefined;
  /** The owner of the metastore. */
  owner?: string | undefined;
  /** Privilege model version of the metastore, of the form `major.minor` (e.g., `1.0`). */
  privilegeModelVersion?: string | undefined;
  /** Cloud region which the metastore serves (e.g., `us-west-2`, `westus`). */
  region?: string | undefined;
  /** Unique identifier of metastore. */
  metastoreId?: string | undefined;
  /** Time at which this metastore was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the metastore. */
  updatedBy?: string | undefined;
  /** Name of the storage credential to access the metastore storage_root. */
  storageRootCredentialName?: string | undefined;
  /** Cloud vendor of the metastore home shard (e.g., `aws`, `azure`, `gcp`). */
  cloud?: string | undefined;
  /** Globally unique metastore ID across clouds and regions, of the form `cloud:region:metastore_id`. */
  globalMetastoreId?: string | undefined;
  /** Whether to allow non-DBR clients to directly access entities under the metastore. */
  externalAccessEnabled?: boolean | undefined;
}

export interface UpdateMetastore {
  /** Unique ID of the metastore. */
  id?: string | undefined;
  /** New name for the metastore. */
  newName?: string | undefined;
  /** The user-specified name of the metastore. */
  name?: string | undefined;
  /** The storage root URL for metastore */
  storageRoot?: string | undefined;
  /** Unique identifier of the metastore's (Default) Data Access Configuration. */
  defaultDataAccessConfigId?: string | undefined;
  /** UUID of storage credential to access the metastore storage_root. */
  storageRootCredentialId?: string | undefined;
  /** The scope of Delta Sharing enabled for the metastore. */
  deltaSharingScope?: DeltaSharingScope_Enum | undefined;
  /** The lifetime of delta sharing recipient token in seconds. */
  deltaSharingRecipientTokenLifetimeInSeconds?: number | undefined;
  /** The organization name of a Delta Sharing entity, to be used in Databricks-to-Databricks Delta Sharing as the official name. */
  deltaSharingOrganizationName?: string | undefined;
  /** The owner of the metastore. */
  owner?: string | undefined;
  /** Privilege model version of the metastore, of the form `major.minor` (e.g., `1.0`). */
  privilegeModelVersion?: string | undefined;
  /** Cloud region which the metastore serves (e.g., `us-west-2`, `westus`). */
  region?: string | undefined;
  /** Unique identifier of metastore. */
  metastoreId?: string | undefined;
  /** Time at which this metastore was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the metastore. */
  updatedBy?: string | undefined;
  /** Name of the storage credential to access the metastore storage_root. */
  storageRootCredentialName?: string | undefined;
  /** Cloud vendor of the metastore home shard (e.g., `aws`, `azure`, `gcp`). */
  cloud?: string | undefined;
  /** Globally unique metastore ID across clouds and regions, of the form `cloud:region:metastore_id`. */
  globalMetastoreId?: string | undefined;
  /** Whether to allow non-DBR clients to directly access entities under the metastore. */
  externalAccessEnabled?: boolean | undefined;
}

export interface UpdateMetastoreAssignment {
  /** A workspace ID. */
  workspaceId?: number | undefined;
  /** The unique ID of the metastore. */
  metastoreId?: string | undefined;
  /**
   * The name of the default catalog in the metastore.
   * This field is deprecated. Please use "Default Namespace API" to
   * configure the default catalog for a <Databricks> workspace.
   */
  defaultCatalogName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface UpdateMetastoreAssignment_Response {}

export const unmarshalCreateMetastoreSchema: z.ZodType<CreateMetastore> = z
  .object({
    name: z.string().optional(),
    storage_root: z.string().optional(),
    default_data_access_config_id: z.string().optional(),
    storage_root_credential_id: z.string().optional(),
    delta_sharing_scope: z.enum(DeltaSharingScope_Enum).optional(),
    delta_sharing_recipient_token_lifetime_in_seconds: z.number().optional(),
    delta_sharing_organization_name: z.string().optional(),
    owner: z.string().optional(),
    privilege_model_version: z.string().optional(),
    region: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    storage_root_credential_name: z.string().optional(),
    cloud: z.string().optional(),
    global_metastore_id: z.string().optional(),
    external_access_enabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    storageRoot: d.storage_root,
    defaultDataAccessConfigId: d.default_data_access_config_id,
    storageRootCredentialId: d.storage_root_credential_id,
    deltaSharingScope: d.delta_sharing_scope,
    deltaSharingRecipientTokenLifetimeInSeconds:
      d.delta_sharing_recipient_token_lifetime_in_seconds,
    deltaSharingOrganizationName: d.delta_sharing_organization_name,
    owner: d.owner,
    privilegeModelVersion: d.privilege_model_version,
    region: d.region,
    metastoreId: d.metastore_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    storageRootCredentialName: d.storage_root_credential_name,
    cloud: d.cloud,
    globalMetastoreId: d.global_metastore_id,
    externalAccessEnabled: d.external_access_enabled,
  }));

export const unmarshalCreateMetastoreAssignmentSchema: z.ZodType<CreateMetastoreAssignment> =
  z
    .object({
      workspace_id: z.number().optional(),
      metastore_id: z.string().optional(),
      default_catalog_name: z.string().optional(),
    })
    .transform(d => ({
      workspaceId: d.workspace_id,
      metastoreId: d.metastore_id,
      defaultCatalogName: d.default_catalog_name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateMetastoreAssignment_ResponseSchema: z.ZodType<CreateMetastoreAssignment_Response> =
  z.object({});

export const unmarshalDeleteMetastoreSchema: z.ZodType<DeleteMetastore> = z
  .object({
    id: z.string().optional(),
    force: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    force: d.force,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteMetastore_ResponseSchema: z.ZodType<DeleteMetastore_Response> =
  z.object({});

export const unmarshalDeleteMetastoreAssignmentSchema: z.ZodType<DeleteMetastoreAssignment> =
  z
    .object({
      workspace_id: z.number().optional(),
      metastore_id: z.string().optional(),
    })
    .transform(d => ({
      workspaceId: d.workspace_id,
      metastoreId: d.metastore_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteMetastoreAssignment_ResponseSchema: z.ZodType<DeleteMetastoreAssignment_Response> =
  z.object({});

export const unmarshalDeltaSharingScopeSchema: z.ZodType<DeltaSharingScope> =
  z.object({});

export const unmarshalGetCurrentMetastoreAssignmentSchema: z.ZodType<GetCurrentMetastoreAssignment> =
  z.object({});

export const unmarshalGetMetastoreSchema: z.ZodType<GetMetastore> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const unmarshalGetMetastoreSummarySchema: z.ZodType<GetMetastoreSummary> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetMetastoreSummary_ResponseSchema: z.ZodType<GetMetastoreSummary_Response> =
  z
    .object({
      metastore_id: z.string().optional(),
      name: z.string().optional(),
      default_data_access_config_id: z.string().optional(),
      storage_root_credential_id: z.string().optional(),
      cloud: z.string().optional(),
      region: z.string().optional(),
      global_metastore_id: z.string().optional(),
      storage_root_credential_name: z.string().optional(),
      privilege_model_version: z.string().optional(),
      delta_sharing_scope: z.enum(DeltaSharingScope_Enum).optional(),
      delta_sharing_recipient_token_lifetime_in_seconds: z.number().optional(),
      delta_sharing_organization_name: z.string().optional(),
      storage_root: z.string().optional(),
      owner: z.string().optional(),
      created_at: z.number().optional(),
      created_by: z.string().optional(),
      updated_at: z.number().optional(),
      updated_by: z.string().optional(),
      external_access_enabled: z.boolean().optional(),
    })
    .transform(d => ({
      metastoreId: d.metastore_id,
      name: d.name,
      defaultDataAccessConfigId: d.default_data_access_config_id,
      storageRootCredentialId: d.storage_root_credential_id,
      cloud: d.cloud,
      region: d.region,
      globalMetastoreId: d.global_metastore_id,
      storageRootCredentialName: d.storage_root_credential_name,
      privilegeModelVersion: d.privilege_model_version,
      deltaSharingScope: d.delta_sharing_scope,
      deltaSharingRecipientTokenLifetimeInSeconds:
        d.delta_sharing_recipient_token_lifetime_in_seconds,
      deltaSharingOrganizationName: d.delta_sharing_organization_name,
      storageRoot: d.storage_root,
      owner: d.owner,
      createdAt: d.created_at,
      createdBy: d.created_by,
      updatedAt: d.updated_at,
      updatedBy: d.updated_by,
      externalAccessEnabled: d.external_access_enabled,
    }));

export const unmarshalListGlobalMetastoresRequestSchema: z.ZodType<ListGlobalMetastoresRequest> =
  z
    .object({
      page_size: z.number().optional(),
      page_token: z.string().optional(),
      shard_local_only: z.boolean().optional(),
    })
    .transform(d => ({
      pageSize: d.page_size,
      pageToken: d.page_token,
      shardLocalOnly: d.shard_local_only,
    }));

export const unmarshalListGlobalMetastoresResponseSchema: z.ZodType<ListGlobalMetastoresResponse> =
  z
    .object({
      metastores: z
        .array(z.lazy(() => unmarshalMetastoreInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      metastores: d.metastores,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListMetastoresSchema: z.ZodType<ListMetastores> = z
  .object({
    max_results: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    maxResults: d.max_results,
    pageToken: d.page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListMetastores_ResponseSchema: z.ZodType<ListMetastores_Response> =
  z
    .object({
      metastores: z
        .array(z.lazy(() => unmarshalMetastoreInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      metastores: d.metastores,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMetastoreAssignmentSchema: z.ZodType<MetastoreAssignment> =
  z
    .object({
      workspace_id: z.number().optional(),
      metastore_id: z.string().optional(),
      default_catalog_name: z.string().optional(),
    })
    .transform(d => ({
      workspaceId: d.workspace_id,
      metastoreId: d.metastore_id,
      defaultCatalogName: d.default_catalog_name,
    }));

export const unmarshalMetastoreInfoSchema: z.ZodType<MetastoreInfo> = z
  .object({
    name: z.string().optional(),
    storage_root: z.string().optional(),
    default_data_access_config_id: z.string().optional(),
    storage_root_credential_id: z.string().optional(),
    delta_sharing_scope: z.enum(DeltaSharingScope_Enum).optional(),
    delta_sharing_recipient_token_lifetime_in_seconds: z.number().optional(),
    delta_sharing_organization_name: z.string().optional(),
    owner: z.string().optional(),
    privilege_model_version: z.string().optional(),
    region: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    storage_root_credential_name: z.string().optional(),
    cloud: z.string().optional(),
    global_metastore_id: z.string().optional(),
    external_access_enabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    storageRoot: d.storage_root,
    defaultDataAccessConfigId: d.default_data_access_config_id,
    storageRootCredentialId: d.storage_root_credential_id,
    deltaSharingScope: d.delta_sharing_scope,
    deltaSharingRecipientTokenLifetimeInSeconds:
      d.delta_sharing_recipient_token_lifetime_in_seconds,
    deltaSharingOrganizationName: d.delta_sharing_organization_name,
    owner: d.owner,
    privilegeModelVersion: d.privilege_model_version,
    region: d.region,
    metastoreId: d.metastore_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    storageRootCredentialName: d.storage_root_credential_name,
    cloud: d.cloud,
    globalMetastoreId: d.global_metastore_id,
    externalAccessEnabled: d.external_access_enabled,
  }));

export const unmarshalUpdateMetastoreSchema: z.ZodType<UpdateMetastore> = z
  .object({
    id: z.string().optional(),
    new_name: z.string().optional(),
    name: z.string().optional(),
    storage_root: z.string().optional(),
    default_data_access_config_id: z.string().optional(),
    storage_root_credential_id: z.string().optional(),
    delta_sharing_scope: z.enum(DeltaSharingScope_Enum).optional(),
    delta_sharing_recipient_token_lifetime_in_seconds: z.number().optional(),
    delta_sharing_organization_name: z.string().optional(),
    owner: z.string().optional(),
    privilege_model_version: z.string().optional(),
    region: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    storage_root_credential_name: z.string().optional(),
    cloud: z.string().optional(),
    global_metastore_id: z.string().optional(),
    external_access_enabled: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    newName: d.new_name,
    name: d.name,
    storageRoot: d.storage_root,
    defaultDataAccessConfigId: d.default_data_access_config_id,
    storageRootCredentialId: d.storage_root_credential_id,
    deltaSharingScope: d.delta_sharing_scope,
    deltaSharingRecipientTokenLifetimeInSeconds:
      d.delta_sharing_recipient_token_lifetime_in_seconds,
    deltaSharingOrganizationName: d.delta_sharing_organization_name,
    owner: d.owner,
    privilegeModelVersion: d.privilege_model_version,
    region: d.region,
    metastoreId: d.metastore_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    storageRootCredentialName: d.storage_root_credential_name,
    cloud: d.cloud,
    globalMetastoreId: d.global_metastore_id,
    externalAccessEnabled: d.external_access_enabled,
  }));

export const unmarshalUpdateMetastoreAssignmentSchema: z.ZodType<UpdateMetastoreAssignment> =
  z
    .object({
      workspace_id: z.number().optional(),
      metastore_id: z.string().optional(),
      default_catalog_name: z.string().optional(),
    })
    .transform(d => ({
      workspaceId: d.workspace_id,
      metastoreId: d.metastore_id,
      defaultCatalogName: d.default_catalog_name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateMetastoreAssignment_ResponseSchema: z.ZodType<UpdateMetastoreAssignment_Response> =
  z.object({});

export const marshalCreateMetastoreSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    storageRoot: z.string().optional(),
    defaultDataAccessConfigId: z.string().optional(),
    storageRootCredentialId: z.string().optional(),
    deltaSharingScope: z.enum(DeltaSharingScope_Enum).optional(),
    deltaSharingRecipientTokenLifetimeInSeconds: z.number().optional(),
    deltaSharingOrganizationName: z.string().optional(),
    owner: z.string().optional(),
    privilegeModelVersion: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    storageRootCredentialName: z.string().optional(),
    cloud: z.string().optional(),
    globalMetastoreId: z.string().optional(),
    externalAccessEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    storage_root: d.storageRoot,
    default_data_access_config_id: d.defaultDataAccessConfigId,
    storage_root_credential_id: d.storageRootCredentialId,
    delta_sharing_scope: d.deltaSharingScope,
    delta_sharing_recipient_token_lifetime_in_seconds:
      d.deltaSharingRecipientTokenLifetimeInSeconds,
    delta_sharing_organization_name: d.deltaSharingOrganizationName,
    owner: d.owner,
    privilege_model_version: d.privilegeModelVersion,
    region: d.region,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    storage_root_credential_name: d.storageRootCredentialName,
    cloud: d.cloud,
    global_metastore_id: d.globalMetastoreId,
    external_access_enabled: d.externalAccessEnabled,
  }));

export const marshalCreateMetastoreAssignmentSchema: z.ZodType = z
  .object({
    workspaceId: z.number().optional(),
    metastoreId: z.string().optional(),
    defaultCatalogName: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    metastore_id: d.metastoreId,
    default_catalog_name: d.defaultCatalogName,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCreateMetastoreAssignment_ResponseSchema: z.ZodType =
  z.object({});

export const marshalDeleteMetastoreSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    force: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    force: d.force,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteMetastore_ResponseSchema: z.ZodType = z.object({});

export const marshalDeleteMetastoreAssignmentSchema: z.ZodType = z
  .object({
    workspaceId: z.number().optional(),
    metastoreId: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    metastore_id: d.metastoreId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteMetastoreAssignment_ResponseSchema: z.ZodType =
  z.object({});

export const marshalDeltaSharingScopeSchema: z.ZodType = z.object({});

export const marshalGetCurrentMetastoreAssignmentSchema: z.ZodType = z.object(
  {}
);

export const marshalGetMetastoreSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalGetMetastoreSummarySchema: z.ZodType = z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetMetastoreSummary_ResponseSchema: z.ZodType = z
  .object({
    metastoreId: z.string().optional(),
    name: z.string().optional(),
    defaultDataAccessConfigId: z.string().optional(),
    storageRootCredentialId: z.string().optional(),
    cloud: z.string().optional(),
    region: z.string().optional(),
    globalMetastoreId: z.string().optional(),
    storageRootCredentialName: z.string().optional(),
    privilegeModelVersion: z.string().optional(),
    deltaSharingScope: z.enum(DeltaSharingScope_Enum).optional(),
    deltaSharingRecipientTokenLifetimeInSeconds: z.number().optional(),
    deltaSharingOrganizationName: z.string().optional(),
    storageRoot: z.string().optional(),
    owner: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    externalAccessEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    metastore_id: d.metastoreId,
    name: d.name,
    default_data_access_config_id: d.defaultDataAccessConfigId,
    storage_root_credential_id: d.storageRootCredentialId,
    cloud: d.cloud,
    region: d.region,
    global_metastore_id: d.globalMetastoreId,
    storage_root_credential_name: d.storageRootCredentialName,
    privilege_model_version: d.privilegeModelVersion,
    delta_sharing_scope: d.deltaSharingScope,
    delta_sharing_recipient_token_lifetime_in_seconds:
      d.deltaSharingRecipientTokenLifetimeInSeconds,
    delta_sharing_organization_name: d.deltaSharingOrganizationName,
    storage_root: d.storageRoot,
    owner: d.owner,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    external_access_enabled: d.externalAccessEnabled,
  }));

export const marshalListGlobalMetastoresRequestSchema: z.ZodType = z
  .object({
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    shardLocalOnly: z.boolean().optional(),
  })
  .transform(d => ({
    page_size: d.pageSize,
    page_token: d.pageToken,
    shard_local_only: d.shardLocalOnly,
  }));

export const marshalListGlobalMetastoresResponseSchema: z.ZodType = z
  .object({
    metastores: z.array(z.lazy(() => marshalMetastoreInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    metastores: d.metastores,
    next_page_token: d.nextPageToken,
  }));

export const marshalListMetastoresSchema: z.ZodType = z
  .object({
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    max_results: d.maxResults,
    page_token: d.pageToken,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListMetastores_ResponseSchema: z.ZodType = z
  .object({
    metastores: z.array(z.lazy(() => marshalMetastoreInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    metastores: d.metastores,
    next_page_token: d.nextPageToken,
  }));

export const marshalMetastoreAssignmentSchema: z.ZodType = z
  .object({
    workspaceId: z.number().optional(),
    metastoreId: z.string().optional(),
    defaultCatalogName: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    metastore_id: d.metastoreId,
    default_catalog_name: d.defaultCatalogName,
  }));

export const marshalMetastoreInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    storageRoot: z.string().optional(),
    defaultDataAccessConfigId: z.string().optional(),
    storageRootCredentialId: z.string().optional(),
    deltaSharingScope: z.enum(DeltaSharingScope_Enum).optional(),
    deltaSharingRecipientTokenLifetimeInSeconds: z.number().optional(),
    deltaSharingOrganizationName: z.string().optional(),
    owner: z.string().optional(),
    privilegeModelVersion: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    storageRootCredentialName: z.string().optional(),
    cloud: z.string().optional(),
    globalMetastoreId: z.string().optional(),
    externalAccessEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    storage_root: d.storageRoot,
    default_data_access_config_id: d.defaultDataAccessConfigId,
    storage_root_credential_id: d.storageRootCredentialId,
    delta_sharing_scope: d.deltaSharingScope,
    delta_sharing_recipient_token_lifetime_in_seconds:
      d.deltaSharingRecipientTokenLifetimeInSeconds,
    delta_sharing_organization_name: d.deltaSharingOrganizationName,
    owner: d.owner,
    privilege_model_version: d.privilegeModelVersion,
    region: d.region,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    storage_root_credential_name: d.storageRootCredentialName,
    cloud: d.cloud,
    global_metastore_id: d.globalMetastoreId,
    external_access_enabled: d.externalAccessEnabled,
  }));

export const marshalUpdateMetastoreSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    newName: z.string().optional(),
    name: z.string().optional(),
    storageRoot: z.string().optional(),
    defaultDataAccessConfigId: z.string().optional(),
    storageRootCredentialId: z.string().optional(),
    deltaSharingScope: z.enum(DeltaSharingScope_Enum).optional(),
    deltaSharingRecipientTokenLifetimeInSeconds: z.number().optional(),
    deltaSharingOrganizationName: z.string().optional(),
    owner: z.string().optional(),
    privilegeModelVersion: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    storageRootCredentialName: z.string().optional(),
    cloud: z.string().optional(),
    globalMetastoreId: z.string().optional(),
    externalAccessEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    new_name: d.newName,
    name: d.name,
    storage_root: d.storageRoot,
    default_data_access_config_id: d.defaultDataAccessConfigId,
    storage_root_credential_id: d.storageRootCredentialId,
    delta_sharing_scope: d.deltaSharingScope,
    delta_sharing_recipient_token_lifetime_in_seconds:
      d.deltaSharingRecipientTokenLifetimeInSeconds,
    delta_sharing_organization_name: d.deltaSharingOrganizationName,
    owner: d.owner,
    privilege_model_version: d.privilegeModelVersion,
    region: d.region,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    storage_root_credential_name: d.storageRootCredentialName,
    cloud: d.cloud,
    global_metastore_id: d.globalMetastoreId,
    external_access_enabled: d.externalAccessEnabled,
  }));

export const marshalUpdateMetastoreAssignmentSchema: z.ZodType = z
  .object({
    workspaceId: z.number().optional(),
    metastoreId: z.string().optional(),
    defaultCatalogName: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    metastore_id: d.metastoreId,
    default_catalog_name: d.defaultCatalogName,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateMetastoreAssignment_ResponseSchema: z.ZodType =
  z.object({});
