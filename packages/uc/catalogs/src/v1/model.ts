// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CatalogIsolationMode = {
  OPEN: 'OPEN',
  ISOLATED: 'ISOLATED',
} as const;
export type CatalogIsolationMode =
  | (typeof CatalogIsolationMode)[keyof typeof CatalogIsolationMode]
  | (string & {});

/** The type of the catalog. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CatalogType = {
  MANAGED_CATALOG: 'MANAGED_CATALOG',
  DELTASHARING_CATALOG: 'DELTASHARING_CATALOG',
  SYSTEM_CATALOG: 'SYSTEM_CATALOG',
  INTERNAL_CATALOG: 'INTERNAL_CATALOG',
  FOREIGN_CATALOG: 'FOREIGN_CATALOG',
  MANAGED_ONLINE_CATALOG: 'MANAGED_ONLINE_CATALOG',
} as const;
export type CatalogType =
  | (typeof CatalogType)[keyof typeof CatalogType]
  | (string & {});

/** The type of Unity Catalog securable. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SecurableType = {
  CATALOG: 'CATALOG',
  SCHEMA: 'SCHEMA',
  TABLE: 'TABLE',
  STORAGE_CREDENTIAL: 'STORAGE_CREDENTIAL',
  EXTERNAL_LOCATION: 'EXTERNAL_LOCATION',
  FUNCTION: 'FUNCTION',
  SHARE: 'SHARE',
  PROVIDER: 'PROVIDER',
  RECIPIENT: 'RECIPIENT',
  CLEAN_ROOM: 'CLEAN_ROOM',
  METASTORE: 'METASTORE',
  PIPELINE: 'PIPELINE',
  VOLUME: 'VOLUME',
  CONNECTION: 'CONNECTION',
  CREDENTIAL: 'CREDENTIAL',
  EXTERNAL_METADATA: 'EXTERNAL_METADATA',
  /** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */
  STAGING_TABLE: 'STAGING_TABLE',
} as const;
export type SecurableType =
  | (typeof SecurableType)[keyof typeof SecurableType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ProvisioningInfo_State = {
  STATE_UNSPECIFIED: '',
  PROVISIONING: 'PROVISIONING',
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  DELETING: 'DELETING',
  UPDATING: 'UPDATING',
  DEGRADED: 'DEGRADED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ProvisioningInfo_State =
  | (typeof ProvisioningInfo_State)[keyof typeof ProvisioningInfo_State]
  | (string & {});

export interface AzureEncryptionSettings {
  azureTenantId?: string | undefined;
  azureCmkAccessConnectorId?: string | undefined;
  azureCmkManagedIdentityId?: string | undefined;
}

export interface CatalogInfo {
  /** Name of catalog. */
  name?: string | undefined;
  /** Username of current owner of catalog. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Storage root URL for managed tables within catalog. */
  storageRoot?: string | undefined;
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  enablePredictiveOptimization?: string | undefined;
  catalogType?: CatalogType | undefined;
  /**
   * The name of delta sharing provider.
   *
   * A Delta Sharing catalog is a catalog that is based on a Delta share on a remote sharing server.
   */
  providerName?: string | undefined;
  /** The name of the share under the share provider. */
  shareName?: string | undefined;
  /** The name of the connection to an external data source. */
  connectionName?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this catalog was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of catalog creator. */
  createdBy?: string | undefined;
  /** Time at which this catalog was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified catalog. */
  updatedBy?: string | undefined;
  /** Storage Location URL (full path) for managed tables within catalog. */
  storageLocation?: string | undefined;
  /** Whether the current securable is accessible from all workspaces or a specific set of workspaces. */
  isolationMode?: CatalogIsolationMode | undefined;
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  provisioningInfo?: ProvisioningInfo | undefined;
  /** The full name of the catalog. Corresponds with the name field. */
  fullName?: string | undefined;
  securableType?: SecurableType | undefined;
  /** Custom maximum retention period in hours for the catalog */
  customMaxRetentionHours?: bigint | undefined;
  /** Control CMK encryption for managed catalog data */
  managedEncryptionSettings?: EncryptionSettings | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

export interface CreateCatalogRequest {
  /** Name of catalog. */
  name?: string | undefined;
  /** Username of current owner of catalog. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Storage root URL for managed tables within catalog. */
  storageRoot?: string | undefined;
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  enablePredictiveOptimization?: string | undefined;
  catalogType?: CatalogType | undefined;
  /**
   * The name of delta sharing provider.
   *
   * A Delta Sharing catalog is a catalog that is based on a Delta share on a remote sharing server.
   */
  providerName?: string | undefined;
  /** The name of the share under the share provider. */
  shareName?: string | undefined;
  /** The name of the connection to an external data source. */
  connectionName?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this catalog was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of catalog creator. */
  createdBy?: string | undefined;
  /** Time at which this catalog was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified catalog. */
  updatedBy?: string | undefined;
  /** Storage Location URL (full path) for managed tables within catalog. */
  storageLocation?: string | undefined;
  /** Whether the current securable is accessible from all workspaces or a specific set of workspaces. */
  isolationMode?: CatalogIsolationMode | undefined;
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  provisioningInfo?: ProvisioningInfo | undefined;
  /** The full name of the catalog. Corresponds with the name field. */
  fullName?: string | undefined;
  securableType?: SecurableType | undefined;
  /** Custom maximum retention period in hours for the catalog */
  customMaxRetentionHours?: bigint | undefined;
  /** Control CMK encryption for managed catalog data */
  managedEncryptionSettings?: EncryptionSettings | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

export interface DeleteCatalogRequest {
  /** The name of the catalog. */
  nameArg?: string | undefined;
  /** Force deletion even if the catalog is not empty. */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteCatalogResponse {}

export interface EffectivePredictiveOptimizationFlag {
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  value?: string | undefined;
  /** The type of the object from which the flag was inherited. If there was no inheritance, this field is left blank. */
  inheritedFromType?: string | undefined;
  /** The name of the object from which the flag was inherited. If there was no inheritance, this field is left blank. */
  inheritedFromName?: string | undefined;
}

/**
 * Encryption Settings are used to carry metadata for securable encryption at rest.
 * Currently used for catalogs, we can use the information supplied here to interact with a CMK.
 */
export interface EncryptionSettings {
  /** the CMK uuid in AWS and GCP, null otherwise. */
  customerManagedKeyId?: string | undefined;
  /** the AKV URL in Azure, null otherwise. */
  azureKeyVaultKeyId?: string | undefined;
  /** optional Azure settings - only required if an Azure CMK is used. */
  azureEncryptionSettings?: AzureEncryptionSettings | undefined;
}

export interface GetCatalogRequest {
  /** The name of the catalog. */
  nameArg?: string | undefined;
  /** Whether to include catalogs in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface ListCatalogsRequest {
  /** Whether to include catalogs in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
  /**
   * Maximum number of catalogs to return.
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all valid catalogs are returned (not recommended).
   * - Note: The number of returned catalogs might be less than the specified max_results size, even zero.
   * The only definitive indication that no further catalogs can be fetched is when the next_page_token is unset from the response.
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
  /**
   * Whether to include catalogs not bound to the workspace.
   * Effective only if the user has permission to update the catalog–workspace binding.
   */
  includeUnbound?: boolean | undefined;
}

export interface ListCatalogsResponse {
  /** An array of catalog information objects. */
  catalogs?: CatalogInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

/** Status of an asynchronously provisioned resource. */
export interface ProvisioningInfo {
  /** The provisioning state of the resource. */
  state?: ProvisioningInfo_State | undefined;
}

export interface UpdateCatalogRequest {
  /** The name of the catalog. */
  nameArg?: string | undefined;
  /** New name for the catalog. */
  newName?: string | undefined;
  /** Name of catalog. */
  name?: string | undefined;
  /** Username of current owner of catalog. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Storage root URL for managed tables within catalog. */
  storageRoot?: string | undefined;
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  enablePredictiveOptimization?: string | undefined;
  catalogType?: CatalogType | undefined;
  /**
   * The name of delta sharing provider.
   *
   * A Delta Sharing catalog is a catalog that is based on a Delta share on a remote sharing server.
   */
  providerName?: string | undefined;
  /** The name of the share under the share provider. */
  shareName?: string | undefined;
  /** The name of the connection to an external data source. */
  connectionName?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this catalog was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of catalog creator. */
  createdBy?: string | undefined;
  /** Time at which this catalog was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified catalog. */
  updatedBy?: string | undefined;
  /** Storage Location URL (full path) for managed tables within catalog. */
  storageLocation?: string | undefined;
  /** Whether the current securable is accessible from all workspaces or a specific set of workspaces. */
  isolationMode?: CatalogIsolationMode | undefined;
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  provisioningInfo?: ProvisioningInfo | undefined;
  /** The full name of the catalog. Corresponds with the name field. */
  fullName?: string | undefined;
  securableType?: SecurableType | undefined;
  /** Custom maximum retention period in hours for the catalog */
  customMaxRetentionHours?: bigint | undefined;
  /** Control CMK encryption for managed catalog data */
  managedEncryptionSettings?: EncryptionSettings | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

export const unmarshalAzureEncryptionSettingsSchema: z.ZodType<AzureEncryptionSettings> =
  z
    .object({
      azure_tenant_id: z.string().optional(),
      azure_cmk_access_connector_id: z.string().optional(),
      azure_cmk_managed_identity_id: z.string().optional(),
    })
    .transform(d => ({
      azureTenantId: d.azure_tenant_id,
      azureCmkAccessConnectorId: d.azure_cmk_access_connector_id,
      azureCmkManagedIdentityId: d.azure_cmk_managed_identity_id,
    }));

export const unmarshalCatalogInfoSchema: z.ZodType<CatalogInfo> = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_root: z.string().optional(),
    enable_predictive_optimization: z.string().optional(),
    catalog_type: z.string().optional(),
    provider_name: z.string().optional(),
    share_name: z.string().optional(),
    connection_name: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z.string().optional(),
    updated_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z.string().optional(),
    storage_location: z.string().optional(),
    isolation_mode: z.string().optional(),
    effective_predictive_optimization_flag: z
      .lazy(() => unmarshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    browse_only: z.boolean().optional(),
    provisioning_info: z.lazy(() => unmarshalProvisioningInfoSchema).optional(),
    full_name: z.string().optional(),
    securable_type: z.string().optional(),
    custom_max_retention_hours: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    managed_encryption_settings: z
      .lazy(() => unmarshalEncryptionSettingsSchema)
      .optional(),
    properties: z.record(z.string(), z.string()).optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    comment: d.comment,
    storageRoot: d.storage_root,
    enablePredictiveOptimization: d.enable_predictive_optimization,
    catalogType: d.catalog_type,
    providerName: d.provider_name,
    shareName: d.share_name,
    connectionName: d.connection_name,
    metastoreId: d.metastore_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    storageLocation: d.storage_location,
    isolationMode: d.isolation_mode,
    effectivePredictiveOptimizationFlag:
      d.effective_predictive_optimization_flag,
    browseOnly: d.browse_only,
    provisioningInfo: d.provisioning_info,
    fullName: d.full_name,
    securableType: d.securable_type,
    customMaxRetentionHours: d.custom_max_retention_hours,
    managedEncryptionSettings: d.managed_encryption_settings,
    properties: d.properties,
    options: d.options,
  }));

export const unmarshalDeleteCatalogResponseSchema: z.ZodType<DeleteCatalogResponse> =
  z.object({});

export const unmarshalEffectivePredictiveOptimizationFlagSchema: z.ZodType<EffectivePredictiveOptimizationFlag> =
  z
    .object({
      value: z.string().optional(),
      inherited_from_type: z.string().optional(),
      inherited_from_name: z.string().optional(),
    })
    .transform(d => ({
      value: d.value,
      inheritedFromType: d.inherited_from_type,
      inheritedFromName: d.inherited_from_name,
    }));

export const unmarshalEncryptionSettingsSchema: z.ZodType<EncryptionSettings> =
  z
    .object({
      customer_managed_key_id: z.string().optional(),
      azure_key_vault_key_id: z.string().optional(),
      azure_encryption_settings: z
        .lazy(() => unmarshalAzureEncryptionSettingsSchema)
        .optional(),
    })
    .transform(d => ({
      customerManagedKeyId: d.customer_managed_key_id,
      azureKeyVaultKeyId: d.azure_key_vault_key_id,
      azureEncryptionSettings: d.azure_encryption_settings,
    }));

export const unmarshalListCatalogsResponseSchema: z.ZodType<ListCatalogsResponse> =
  z
    .object({
      catalogs: z.array(z.lazy(() => unmarshalCatalogInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      catalogs: d.catalogs,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalProvisioningInfoSchema: z.ZodType<ProvisioningInfo> = z
  .object({
    state: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const marshalAzureEncryptionSettingsSchema: z.ZodType = z
  .object({
    azureTenantId: z.string().optional(),
    azureCmkAccessConnectorId: z.string().optional(),
    azureCmkManagedIdentityId: z.string().optional(),
  })
  .transform(d => ({
    azure_tenant_id: d.azureTenantId,
    azure_cmk_access_connector_id: d.azureCmkAccessConnectorId,
    azure_cmk_managed_identity_id: d.azureCmkManagedIdentityId,
  }));

export const marshalCreateCatalogRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    catalogType: z.string().optional(),
    providerName: z.string().optional(),
    shareName: z.string().optional(),
    connectionName: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    storageLocation: z.string().optional(),
    isolationMode: z.string().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    browseOnly: z.boolean().optional(),
    provisioningInfo: z.lazy(() => marshalProvisioningInfoSchema).optional(),
    fullName: z.string().optional(),
    securableType: z.string().optional(),
    customMaxRetentionHours: z.bigint().optional(),
    managedEncryptionSettings: z
      .lazy(() => marshalEncryptionSettingsSchema)
      .optional(),
    properties: z.record(z.string(), z.string()).optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    comment: d.comment,
    storage_root: d.storageRoot,
    enable_predictive_optimization: d.enablePredictiveOptimization,
    catalog_type: d.catalogType,
    provider_name: d.providerName,
    share_name: d.shareName,
    connection_name: d.connectionName,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    storage_location: d.storageLocation,
    isolation_mode: d.isolationMode,
    effective_predictive_optimization_flag:
      d.effectivePredictiveOptimizationFlag,
    browse_only: d.browseOnly,
    provisioning_info: d.provisioningInfo,
    full_name: d.fullName,
    securable_type: d.securableType,
    custom_max_retention_hours: d.customMaxRetentionHours,
    managed_encryption_settings: d.managedEncryptionSettings,
    properties: d.properties,
    options: d.options,
  }));

export const marshalEffectivePredictiveOptimizationFlagSchema: z.ZodType = z
  .object({
    value: z.string().optional(),
    inheritedFromType: z.string().optional(),
    inheritedFromName: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
    inherited_from_type: d.inheritedFromType,
    inherited_from_name: d.inheritedFromName,
  }));

export const marshalEncryptionSettingsSchema: z.ZodType = z
  .object({
    customerManagedKeyId: z.string().optional(),
    azureKeyVaultKeyId: z.string().optional(),
    azureEncryptionSettings: z
      .lazy(() => marshalAzureEncryptionSettingsSchema)
      .optional(),
  })
  .transform(d => ({
    customer_managed_key_id: d.customerManagedKeyId,
    azure_key_vault_key_id: d.azureKeyVaultKeyId,
    azure_encryption_settings: d.azureEncryptionSettings,
  }));

export const marshalProvisioningInfoSchema: z.ZodType = z
  .object({
    state: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const marshalUpdateCatalogRequestSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    newName: z.string().optional(),
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    catalogType: z.string().optional(),
    providerName: z.string().optional(),
    shareName: z.string().optional(),
    connectionName: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    storageLocation: z.string().optional(),
    isolationMode: z.string().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    browseOnly: z.boolean().optional(),
    provisioningInfo: z.lazy(() => marshalProvisioningInfoSchema).optional(),
    fullName: z.string().optional(),
    securableType: z.string().optional(),
    customMaxRetentionHours: z.bigint().optional(),
    managedEncryptionSettings: z
      .lazy(() => marshalEncryptionSettingsSchema)
      .optional(),
    properties: z.record(z.string(), z.string()).optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    new_name: d.newName,
    name: d.name,
    owner: d.owner,
    comment: d.comment,
    storage_root: d.storageRoot,
    enable_predictive_optimization: d.enablePredictiveOptimization,
    catalog_type: d.catalogType,
    provider_name: d.providerName,
    share_name: d.shareName,
    connection_name: d.connectionName,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    storage_location: d.storageLocation,
    isolation_mode: d.isolationMode,
    effective_predictive_optimization_flag:
      d.effectivePredictiveOptimizationFlag,
    browse_only: d.browseOnly,
    provisioning_info: d.provisioningInfo,
    full_name: d.fullName,
    securable_type: d.securableType,
    custom_max_retention_hours: d.customMaxRetentionHours,
    managed_encryption_settings: d.managedEncryptionSettings,
    properties: d.properties,
    options: d.options,
  }));
