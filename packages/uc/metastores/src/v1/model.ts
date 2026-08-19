// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DeltaSharingScope_Enum = {
  /**
   * Internal Delta Sharing enabled on metastore.
   * This applies to Databricks-managed authentication where both provider and recipient are
   * under the same account.
   */
  INTERNAL: 'INTERNAL',
  /**
   * Internal and External Delta Sharing enabled on metastore.
   * This allows all flavors of Delta Sharing.
   */
  INTERNAL_AND_EXTERNAL: 'INTERNAL_AND_EXTERNAL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DeltaSharingScope_Enum =
  | (typeof DeltaSharingScope_Enum)[keyof typeof DeltaSharingScope_Enum]
  | (string & {});

/** The mapping from workspace to metastore. */
export interface AccountsCreateMetastoreAssignmentRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Workspace ID. */
  workspaceId?: bigint | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
  metastoreAssignment?: MetastoreAssignment | undefined;
}

/** The metastore assignment was successfully created. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountsCreateMetastoreAssignmentResponse {}

/** Properties of the new metastore. */
export interface AccountsCreateMetastoreRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  metastoreInfo?: CreateAccountsMetastore | undefined;
}

export interface AccountsCreateMetastoreResponse {
  metastoreInfo?: MetastoreInfo | undefined;
}

/** Delete a metastore assignment to a workspace */
export interface AccountsDeleteMetastoreAssignmentRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Workspace ID. */
  workspaceId?: bigint | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
}

/** The metastore assignment was successfully deleted. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountsDeleteMetastoreAssignmentResponse {}

/** Delete a metastore for the given account */
export interface AccountsDeleteMetastoreRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
  /** Force deletion even if the metastore is not empty. Default is false. */
  force?: boolean | undefined;
}

/** The metastore was successfully deleted. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountsDeleteMetastoreResponse {}

/** Retrieves the assignment of which metastore to a given workspace */
export interface AccountsGetMetastoreAssignmentRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Workspace ID. */
  workspaceId?: bigint | undefined;
}

/** The workspace metastore assignment was successfully returned. */
export interface AccountsGetMetastoreAssignmentResponse {
  metastoreAssignment?: MetastoreAssignment | undefined;
}

/** Get a metastore for a given account */
export interface AccountsGetMetastoreRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
}

/** The metastore was successfully returned. */
export interface AccountsGetMetastoreResponse {
  metastoreInfo?: MetastoreInfo | undefined;
}

/** List the metastores for an account */
export interface AccountsListMetastoresRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
}

/** Metastores were returned successfully. */
export interface AccountsListMetastoresResponse {
  /** An array of metastore information objects. */
  metastores?: MetastoreInfo[] | undefined;
}

/** Lists all workspace IDs for a given metastore */
export interface AccountsListWorkspaceIdsForMetastoreRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
}

/** The metastore assignments were successfully returned. */
export interface AccountsListWorkspaceIdsForMetastoreResponse {
  workspaceIds?: bigint[] | undefined;
}

/** The metastore assignment to update. */
export interface AccountsUpdateMetastoreAssignmentRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Workspace ID. */
  workspaceId?: bigint | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
  metastoreAssignment?: MetastoreAssignment | undefined;
}

/** The metastore assignment was successfully updated. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountsUpdateMetastoreAssignmentResponse {}

/** Properties of the metastore to change. */
export interface AccountsUpdateMetastoreRequest {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
  /** Properties of the metastore to change. */
  metastoreInfo?: UpdateAccountsMetastore | undefined;
}

/** The metastore update request succeeded. */
export interface AccountsUpdateMetastoreResponse {
  metastoreInfo?: MetastoreInfo | undefined;
}

export interface CreateAccountsMetastore {
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
  deltaSharingRecipientTokenLifetimeInSeconds?: bigint | undefined;
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
  createdAt?: bigint | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
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

export interface CreateMetastoreAssignmentRequest {
  /** A workspace ID. */
  workspaceId?: bigint | undefined;
  /** The unique ID of the metastore. */
  metastoreId?: string | undefined;
  /**
   * The name of the default catalog in the metastore.
   * This field is deprecated. Please use "Default Namespace API" to
   * configure the default catalog for a <Databricks> workspace.
   */
  defaultCatalogName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateMetastoreAssignmentResponse {}

export interface CreateMetastoreRequest {
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
  deltaSharingRecipientTokenLifetimeInSeconds?: bigint | undefined;
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
  createdAt?: bigint | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
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

export interface DeleteMetastoreAssignmentRequest {
  /** A workspace ID. */
  workspaceId?: bigint | undefined;
  /** Query for the ID of the metastore to delete. */
  metastoreId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteMetastoreAssignmentResponse {}

export interface DeleteMetastoreRequest {
  /** Unique ID of the metastore. */
  id?: string | undefined;
  /** Force deletion even if the metastore is not empty. Default is false. */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteMetastoreResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeltaSharingScope {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetCurrentMetastoreAssignmentRequest {}

export interface GetMetastoreRequest {
  /** Unique ID of the metastore. */
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetMetastoreSummaryRequest {}

export interface GetMetastoreSummaryResponse {
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
  deltaSharingRecipientTokenLifetimeInSeconds?: bigint | undefined;
  /** The organization name of a Delta Sharing entity, to be used in Databricks-to-Databricks Delta Sharing as the official name. */
  deltaSharingOrganizationName?: string | undefined;
  /** The storage root URL for metastore */
  storageRoot?: string | undefined;
  /** The owner of the metastore. */
  owner?: string | undefined;
  /** Time at which this metastore was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified the metastore. */
  updatedBy?: string | undefined;
  /** Whether to allow non-DBR clients to directly access entities under the metastore. */
  externalAccessEnabled?: boolean | undefined;
}

export interface ListMetastoresRequest {
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

export interface ListMetastoresResponse {
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
  workspaceId?: bigint | undefined;
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
  deltaSharingRecipientTokenLifetimeInSeconds?: bigint | undefined;
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
  createdAt?: bigint | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
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

export interface UpdateAccountsMetastore {
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
  deltaSharingRecipientTokenLifetimeInSeconds?: bigint | undefined;
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
  createdAt?: bigint | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
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

export interface UpdateMetastoreAssignmentRequest {
  /** A workspace ID. */
  workspaceId?: bigint | undefined;
  /** The unique ID of the metastore. */
  metastoreId?: string | undefined;
  /**
   * The name of the default catalog in the metastore.
   * This field is deprecated. Please use "Default Namespace API" to
   * configure the default catalog for a <Databricks> workspace.
   */
  defaultCatalogName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateMetastoreAssignmentResponse {}

export interface UpdateMetastoreRequest {
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
  deltaSharingRecipientTokenLifetimeInSeconds?: bigint | undefined;
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
  createdAt?: bigint | undefined;
  /** Username of metastore creator. */
  createdBy?: string | undefined;
  /** Time at which the metastore was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
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

export const unmarshalAccountsCreateMetastoreAssignmentResponseSchema: z.ZodType<AccountsCreateMetastoreAssignmentResponse> =
  z.object({});

export const unmarshalAccountsCreateMetastoreResponseSchema: z.ZodType<AccountsCreateMetastoreResponse> =
  z
    .object({
      metastore_info: z.lazy(() => unmarshalMetastoreInfoSchema).optional(),
    })
    .transform(d => ({
      metastoreInfo: d.metastore_info,
    }));

export const unmarshalAccountsDeleteMetastoreAssignmentResponseSchema: z.ZodType<AccountsDeleteMetastoreAssignmentResponse> =
  z.object({});

export const unmarshalAccountsDeleteMetastoreResponseSchema: z.ZodType<AccountsDeleteMetastoreResponse> =
  z.object({});

export const unmarshalAccountsGetMetastoreAssignmentResponseSchema: z.ZodType<AccountsGetMetastoreAssignmentResponse> =
  z
    .object({
      metastore_assignment: z
        .lazy(() => unmarshalMetastoreAssignmentSchema)
        .optional(),
    })
    .transform(d => ({
      metastoreAssignment: d.metastore_assignment,
    }));

export const unmarshalAccountsGetMetastoreResponseSchema: z.ZodType<AccountsGetMetastoreResponse> =
  z
    .object({
      metastore_info: z.lazy(() => unmarshalMetastoreInfoSchema).optional(),
    })
    .transform(d => ({
      metastoreInfo: d.metastore_info,
    }));

export const unmarshalAccountsListMetastoresResponseSchema: z.ZodType<AccountsListMetastoresResponse> =
  z
    .object({
      metastores: z
        .array(z.lazy(() => unmarshalMetastoreInfoSchema))
        .optional(),
    })
    .transform(d => ({
      metastores: d.metastores,
    }));

export const unmarshalAccountsListWorkspaceIdsForMetastoreResponseSchema: z.ZodType<AccountsListWorkspaceIdsForMetastoreResponse> =
  z
    .object({
      workspace_ids: z
        .array(
          z
            .union([z.number(), z.bigint(), z.string()])
            .transform(v => BigInt(v))
        )
        .optional(),
    })
    .transform(d => ({
      workspaceIds: d.workspace_ids,
    }));

export const unmarshalAccountsUpdateMetastoreAssignmentResponseSchema: z.ZodType<AccountsUpdateMetastoreAssignmentResponse> =
  z.object({});

export const unmarshalAccountsUpdateMetastoreResponseSchema: z.ZodType<AccountsUpdateMetastoreResponse> =
  z
    .object({
      metastore_info: z.lazy(() => unmarshalMetastoreInfoSchema).optional(),
    })
    .transform(d => ({
      metastoreInfo: d.metastore_info,
    }));

export const unmarshalCreateMetastoreAssignmentResponseSchema: z.ZodType<CreateMetastoreAssignmentResponse> =
  z.object({});

export const unmarshalDeleteMetastoreAssignmentResponseSchema: z.ZodType<DeleteMetastoreAssignmentResponse> =
  z.object({});

export const unmarshalDeleteMetastoreResponseSchema: z.ZodType<DeleteMetastoreResponse> =
  z.object({});

export const unmarshalGetMetastoreSummaryResponseSchema: z.ZodType<GetMetastoreSummaryResponse> =
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
      delta_sharing_scope: z.string().optional(),
      delta_sharing_recipient_token_lifetime_in_seconds: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      delta_sharing_organization_name: z.string().optional(),
      storage_root: z.string().optional(),
      owner: z.string().optional(),
      created_at: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      created_by: z.string().optional(),
      updated_at: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
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

export const unmarshalListMetastoresResponseSchema: z.ZodType<ListMetastoresResponse> =
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
      workspace_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
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
    delta_sharing_scope: z.string().optional(),
    delta_sharing_recipient_token_lifetime_in_seconds: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    delta_sharing_organization_name: z.string().optional(),
    owner: z.string().optional(),
    privilege_model_version: z.string().optional(),
    region: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z.string().optional(),
    updated_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
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

export const unmarshalUpdateMetastoreAssignmentResponseSchema: z.ZodType<UpdateMetastoreAssignmentResponse> =
  z.object({});

export const marshalAccountsCreateMetastoreAssignmentRequestSchema: z.ZodType =
  z
    .object({
      accountId: z.string().optional(),
      workspaceId: z.bigint().optional(),
      metastoreId: z.string().optional(),
      metastoreAssignment: z
        .lazy(() => marshalMetastoreAssignmentSchema)
        .optional(),
    })
    .transform(d => ({
      account_id: d.accountId,
      workspace_id: d.workspaceId,
      metastore_id: d.metastoreId,
      metastore_assignment: d.metastoreAssignment,
    }));

export const marshalAccountsCreateMetastoreRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    metastoreInfo: z
      .lazy(() => marshalCreateAccountsMetastoreSchema)
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    metastore_info: d.metastoreInfo,
  }));

export const marshalAccountsUpdateMetastoreAssignmentRequestSchema: z.ZodType =
  z
    .object({
      accountId: z.string().optional(),
      workspaceId: z.bigint().optional(),
      metastoreId: z.string().optional(),
      metastoreAssignment: z
        .lazy(() => marshalMetastoreAssignmentSchema)
        .optional(),
    })
    .transform(d => ({
      account_id: d.accountId,
      workspace_id: d.workspaceId,
      metastore_id: d.metastoreId,
      metastore_assignment: d.metastoreAssignment,
    }));

export const marshalAccountsUpdateMetastoreRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    metastoreId: z.string().optional(),
    metastoreInfo: z
      .lazy(() => marshalUpdateAccountsMetastoreSchema)
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    metastore_id: d.metastoreId,
    metastore_info: d.metastoreInfo,
  }));

export const marshalCreateAccountsMetastoreSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    storageRoot: z.string().optional(),
    defaultDataAccessConfigId: z.string().optional(),
    storageRootCredentialId: z.string().optional(),
    deltaSharingScope: z.string().optional(),
    deltaSharingRecipientTokenLifetimeInSeconds: z.bigint().optional(),
    deltaSharingOrganizationName: z.string().optional(),
    owner: z.string().optional(),
    privilegeModelVersion: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
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

export const marshalCreateMetastoreAssignmentRequestSchema: z.ZodType = z
  .object({
    workspaceId: z.bigint().optional(),
    metastoreId: z.string().optional(),
    defaultCatalogName: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    metastore_id: d.metastoreId,
    default_catalog_name: d.defaultCatalogName,
  }));

export const marshalCreateMetastoreRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    storageRoot: z.string().optional(),
    defaultDataAccessConfigId: z.string().optional(),
    storageRootCredentialId: z.string().optional(),
    deltaSharingScope: z.string().optional(),
    deltaSharingRecipientTokenLifetimeInSeconds: z.bigint().optional(),
    deltaSharingOrganizationName: z.string().optional(),
    owner: z.string().optional(),
    privilegeModelVersion: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
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

export const marshalMetastoreAssignmentSchema: z.ZodType = z
  .object({
    workspaceId: z.bigint().optional(),
    metastoreId: z.string().optional(),
    defaultCatalogName: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    metastore_id: d.metastoreId,
    default_catalog_name: d.defaultCatalogName,
  }));

export const marshalUpdateAccountsMetastoreSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    storageRoot: z.string().optional(),
    defaultDataAccessConfigId: z.string().optional(),
    storageRootCredentialId: z.string().optional(),
    deltaSharingScope: z.string().optional(),
    deltaSharingRecipientTokenLifetimeInSeconds: z.bigint().optional(),
    deltaSharingOrganizationName: z.string().optional(),
    owner: z.string().optional(),
    privilegeModelVersion: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
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

export const marshalUpdateMetastoreAssignmentRequestSchema: z.ZodType = z
  .object({
    workspaceId: z.bigint().optional(),
    metastoreId: z.string().optional(),
    defaultCatalogName: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    metastore_id: d.metastoreId,
    default_catalog_name: d.defaultCatalogName,
  }));

export const marshalUpdateMetastoreRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    newName: z.string().optional(),
    name: z.string().optional(),
    storageRoot: z.string().optional(),
    defaultDataAccessConfigId: z.string().optional(),
    storageRootCredentialId: z.string().optional(),
    deltaSharingScope: z.string().optional(),
    deltaSharingRecipientTokenLifetimeInSeconds: z.bigint().optional(),
    deltaSharingOrganizationName: z.string().optional(),
    owner: z.string().optional(),
    privilegeModelVersion: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
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
