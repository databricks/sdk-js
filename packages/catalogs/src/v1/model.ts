// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum CatalogIsolationMode {
  OPEN = 'OPEN',
  ISOLATED = 'ISOLATED',
  OPEN_IN_ACCOUNT = 'OPEN_IN_ACCOUNT',
}

/** The type of the catalog. */
export enum CatalogType {
  MANAGED_CATALOG = 'MANAGED_CATALOG',
  DELTASHARING_CATALOG = 'DELTASHARING_CATALOG',
  SYSTEM_CATALOG = 'SYSTEM_CATALOG',
  INTERNAL_CATALOG = 'INTERNAL_CATALOG',
  FOREIGN_CATALOG = 'FOREIGN_CATALOG',
  MANAGED_ONLINE_CATALOG = 'MANAGED_ONLINE_CATALOG',
}

export enum DrReplicationStatus {
  DR_REPLICATION_STATUS_UNSPECIFIED = 'DR_REPLICATION_STATUS_UNSPECIFIED',
  DR_REPLICATION_STATUS_PRIMARY = 'DR_REPLICATION_STATUS_PRIMARY',
  DR_REPLICATION_STATUS_SECONDARY = 'DR_REPLICATION_STATUS_SECONDARY',
}

/** The type of Unity Catalog securable. */
export enum SecurableType {
  CATALOG = 'CATALOG',
  SCHEMA = 'SCHEMA',
  TABLE = 'TABLE',
  STORAGE_CREDENTIAL = 'STORAGE_CREDENTIAL',
  EXTERNAL_LOCATION = 'EXTERNAL_LOCATION',
  FUNCTION = 'FUNCTION',
  SHARE = 'SHARE',
  PROVIDER = 'PROVIDER',
  RECIPIENT = 'RECIPIENT',
  CLEAN_ROOM = 'CLEAN_ROOM',
  METASTORE = 'METASTORE',
  PIPELINE = 'PIPELINE',
  VOLUME = 'VOLUME',
  CONNECTION = 'CONNECTION',
  CREDENTIAL = 'CREDENTIAL',
  EXTERNAL_METADATA = 'EXTERNAL_METADATA',
  /** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */
  STAGING_TABLE = 'STAGING_TABLE',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ConversionInfo_State {
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ProvisioningInfo_State {
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  PROVISIONING = 'PROVISIONING',
  ACTIVE = 'ACTIVE',
  FAILED = 'FAILED',
  DELETING = 'DELETING',
  UPDATING = 'UPDATING',
  DEGRADED = 'DEGRADED',
}

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
  createdAt?: number | undefined;
  /** Username of catalog creator. */
  createdBy?: string | undefined;
  /** Time at which this catalog was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified catalog. */
  updatedBy?: string | undefined;
  /** Storage Location URL (full path) for managed tables within catalog. */
  storageLocation?: string | undefined;
  /** Whether the current securable is accessible from all workspaces or a specific set of workspaces. */
  isolationMode?: CatalogIsolationMode | undefined;
  effectivePredictiveOptimizationFlag?: EffectivePredictiveOptimizationFlag | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  provisioningInfo?: ProvisioningInfo | undefined;
  /** The full name of the catalog. Corresponds with the name field. */
  fullName?: string | undefined;
  securableType?: SecurableType | undefined;
  /** Status of conversion of FOREIGN catalog to UC Native catalog. */
  conversionInfo?: ConversionInfo | undefined;
  /** Disaster Recovery replication state snapshot. */
  drReplicationInfo?: DrReplicationInfo | undefined;
  /** Control CMK encryption for managed catalog data */
  managedEncryptionSettings?: EncryptionSettings | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CatalogInfo_OptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CatalogInfo_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Status of conversion of FOREIGN entity into UC Native entity. */
export interface ConversionInfo {
  /** The conversion state of the resource. */
  state?: ConversionInfo_State | undefined;
}

export interface CreateCatalog {
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
  createdAt?: number | undefined;
  /** Username of catalog creator. */
  createdBy?: string | undefined;
  /** Time at which this catalog was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified catalog. */
  updatedBy?: string | undefined;
  /** Storage Location URL (full path) for managed tables within catalog. */
  storageLocation?: string | undefined;
  /** Whether the current securable is accessible from all workspaces or a specific set of workspaces. */
  isolationMode?: CatalogIsolationMode | undefined;
  effectivePredictiveOptimizationFlag?: EffectivePredictiveOptimizationFlag | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  provisioningInfo?: ProvisioningInfo | undefined;
  /** The full name of the catalog. Corresponds with the name field. */
  fullName?: string | undefined;
  securableType?: SecurableType | undefined;
  /** Status of conversion of FOREIGN catalog to UC Native catalog. */
  conversionInfo?: ConversionInfo | undefined;
  /** Disaster Recovery replication state snapshot. */
  drReplicationInfo?: DrReplicationInfo | undefined;
  /** Control CMK encryption for managed catalog data */
  managedEncryptionSettings?: EncryptionSettings | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateCatalog_OptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateCatalog_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface DeleteCatalog {
  /** The name of the catalog. */
  nameArg?: string | undefined;
  /** Force deletion even if the catalog is not empty. */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteCatalog_Response {}

/** Metadata related to Disaster Recovery. */
export interface DrReplicationInfo {
  status?: DrReplicationStatus | undefined;
  /** See https://docs.google.com/document/d/1X0A_3hMhzuS2V1E3zB0x5wxPsFx70bVYK5rHep2AjW8. */
  replicatedEntities?: Uint8Array | undefined;
}

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

export interface GetCatalog {
  /** The name of the catalog. */
  nameArg?: string | undefined;
  /** Whether to include catalogs in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface ListCatalogs {
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListCatalogs_Response {
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

export interface UpdateCatalog {
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
  createdAt?: number | undefined;
  /** Username of catalog creator. */
  createdBy?: string | undefined;
  /** Time at which this catalog was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified catalog. */
  updatedBy?: string | undefined;
  /** Storage Location URL (full path) for managed tables within catalog. */
  storageLocation?: string | undefined;
  /** Whether the current securable is accessible from all workspaces or a specific set of workspaces. */
  isolationMode?: CatalogIsolationMode | undefined;
  effectivePredictiveOptimizationFlag?: EffectivePredictiveOptimizationFlag | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  provisioningInfo?: ProvisioningInfo | undefined;
  /** The full name of the catalog. Corresponds with the name field. */
  fullName?: string | undefined;
  securableType?: SecurableType | undefined;
  /** Status of conversion of FOREIGN catalog to UC Native catalog. */
  conversionInfo?: ConversionInfo | undefined;
  /** Disaster Recovery replication state snapshot. */
  drReplicationInfo?: DrReplicationInfo | undefined;
  /** Control CMK encryption for managed catalog data */
  managedEncryptionSettings?: EncryptionSettings | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateCatalog_OptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateCatalog_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export const unmarshalAzureEncryptionSettingsSchema: z.ZodType<AzureEncryptionSettings> = z
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
    catalog_type: z.enum(CatalogType).optional(),
    provider_name: z.string().optional(),
    share_name: z.string().optional(),
    connection_name: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    storage_location: z.string().optional(),
    isolation_mode: z.enum(CatalogIsolationMode).optional(),
    effective_predictive_optimization_flag: z.lazy(() => unmarshalEffectivePredictiveOptimizationFlagSchema).optional(),
    browse_only: z.boolean().optional(),
    provisioning_info: z.lazy(() => unmarshalProvisioningInfoSchema).optional(),
    full_name: z.string().optional(),
    securable_type: z.enum(SecurableType).optional(),
    conversion_info: z.lazy(() => unmarshalConversionInfoSchema).optional(),
    dr_replication_info: z.lazy(() => unmarshalDrReplicationInfoSchema).optional(),
    managed_encryption_settings: z.lazy(() => unmarshalEncryptionSettingsSchema).optional(),
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
    effectivePredictiveOptimizationFlag: d.effective_predictive_optimization_flag,
    browseOnly: d.browse_only,
    provisioningInfo: d.provisioning_info,
    fullName: d.full_name,
    securableType: d.securable_type,
    conversionInfo: d.conversion_info,
    drReplicationInfo: d.dr_replication_info,
    managedEncryptionSettings: d.managed_encryption_settings,
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCatalogInfo_OptionsEntrySchema: z.ZodType<CatalogInfo_OptionsEntry> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCatalogInfo_PropertiesEntrySchema: z.ZodType<CatalogInfo_PropertiesEntry> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalConversionInfoSchema: z.ZodType<ConversionInfo> = z
  .object({
    state: z.enum(ConversionInfo_State).optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const unmarshalCreateCatalogSchema: z.ZodType<CreateCatalog> = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_root: z.string().optional(),
    enable_predictive_optimization: z.string().optional(),
    catalog_type: z.enum(CatalogType).optional(),
    provider_name: z.string().optional(),
    share_name: z.string().optional(),
    connection_name: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    storage_location: z.string().optional(),
    isolation_mode: z.enum(CatalogIsolationMode).optional(),
    effective_predictive_optimization_flag: z.lazy(() => unmarshalEffectivePredictiveOptimizationFlagSchema).optional(),
    browse_only: z.boolean().optional(),
    provisioning_info: z.lazy(() => unmarshalProvisioningInfoSchema).optional(),
    full_name: z.string().optional(),
    securable_type: z.enum(SecurableType).optional(),
    conversion_info: z.lazy(() => unmarshalConversionInfoSchema).optional(),
    dr_replication_info: z.lazy(() => unmarshalDrReplicationInfoSchema).optional(),
    managed_encryption_settings: z.lazy(() => unmarshalEncryptionSettingsSchema).optional(),
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
    effectivePredictiveOptimizationFlag: d.effective_predictive_optimization_flag,
    browseOnly: d.browse_only,
    provisioningInfo: d.provisioning_info,
    fullName: d.full_name,
    securableType: d.securable_type,
    conversionInfo: d.conversion_info,
    drReplicationInfo: d.dr_replication_info,
    managedEncryptionSettings: d.managed_encryption_settings,
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateCatalog_OptionsEntrySchema: z.ZodType<CreateCatalog_OptionsEntry> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateCatalog_PropertiesEntrySchema: z.ZodType<CreateCatalog_PropertiesEntry> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalDeleteCatalogSchema: z.ZodType<DeleteCatalog> = z
  .object({
    name_arg: z.string().optional(),
    force: z.boolean().optional(),
  })
  .transform(d => ({
    nameArg: d.name_arg,
    force: d.force,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteCatalog_ResponseSchema: z.ZodType<DeleteCatalog_Response> = z
  .object({
  });

export const unmarshalDrReplicationInfoSchema: z.ZodType<DrReplicationInfo> = z
  .object({
    status: z.enum(DrReplicationStatus).optional(),
    replicated_entities: z.string().transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0))).optional(),
  })
  .transform(d => ({
    status: d.status,
    replicatedEntities: d.replicated_entities,
  }));

export const unmarshalEffectivePredictiveOptimizationFlagSchema: z.ZodType<EffectivePredictiveOptimizationFlag> = z
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

export const unmarshalEncryptionSettingsSchema: z.ZodType<EncryptionSettings> = z
  .object({
    customer_managed_key_id: z.string().optional(),
    azure_key_vault_key_id: z.string().optional(),
    azure_encryption_settings: z.lazy(() => unmarshalAzureEncryptionSettingsSchema).optional(),
  })
  .transform(d => ({
    customerManagedKeyId: d.customer_managed_key_id,
    azureKeyVaultKeyId: d.azure_key_vault_key_id,
    azureEncryptionSettings: d.azure_encryption_settings,
  }));

export const unmarshalGetCatalogSchema: z.ZodType<GetCatalog> = z
  .object({
    name_arg: z.string().optional(),
    include_browse: z.boolean().optional(),
  })
  .transform(d => ({
    nameArg: d.name_arg,
    includeBrowse: d.include_browse,
  }));

export const unmarshalListCatalogsSchema: z.ZodType<ListCatalogs> = z
  .object({
    include_browse: z.boolean().optional(),
    max_results: z.number().optional(),
    page_token: z.string().optional(),
    include_unbound: z.boolean().optional(),
  })
  .transform(d => ({
    includeBrowse: d.include_browse,
    maxResults: d.max_results,
    pageToken: d.page_token,
    includeUnbound: d.include_unbound,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListCatalogs_ResponseSchema: z.ZodType<ListCatalogs_Response> = z
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
    state: z.enum(ProvisioningInfo_State).optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const unmarshalUpdateCatalogSchema: z.ZodType<UpdateCatalog> = z
  .object({
    name_arg: z.string().optional(),
    new_name: z.string().optional(),
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_root: z.string().optional(),
    enable_predictive_optimization: z.string().optional(),
    catalog_type: z.enum(CatalogType).optional(),
    provider_name: z.string().optional(),
    share_name: z.string().optional(),
    connection_name: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    storage_location: z.string().optional(),
    isolation_mode: z.enum(CatalogIsolationMode).optional(),
    effective_predictive_optimization_flag: z.lazy(() => unmarshalEffectivePredictiveOptimizationFlagSchema).optional(),
    browse_only: z.boolean().optional(),
    provisioning_info: z.lazy(() => unmarshalProvisioningInfoSchema).optional(),
    full_name: z.string().optional(),
    securable_type: z.enum(SecurableType).optional(),
    conversion_info: z.lazy(() => unmarshalConversionInfoSchema).optional(),
    dr_replication_info: z.lazy(() => unmarshalDrReplicationInfoSchema).optional(),
    managed_encryption_settings: z.lazy(() => unmarshalEncryptionSettingsSchema).optional(),
    properties: z.record(z.string(), z.string()).optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    nameArg: d.name_arg,
    newName: d.new_name,
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
    effectivePredictiveOptimizationFlag: d.effective_predictive_optimization_flag,
    browseOnly: d.browse_only,
    provisioningInfo: d.provisioning_info,
    fullName: d.full_name,
    securableType: d.securable_type,
    conversionInfo: d.conversion_info,
    drReplicationInfo: d.dr_replication_info,
    managedEncryptionSettings: d.managed_encryption_settings,
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateCatalog_OptionsEntrySchema: z.ZodType<UpdateCatalog_OptionsEntry> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateCatalog_PropertiesEntrySchema: z.ZodType<UpdateCatalog_PropertiesEntry> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
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

export const marshalCatalogInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    catalogType: z.enum(CatalogType).optional(),
    providerName: z.string().optional(),
    shareName: z.string().optional(),
    connectionName: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    storageLocation: z.string().optional(),
    isolationMode: z.enum(CatalogIsolationMode).optional(),
    effectivePredictiveOptimizationFlag: z.lazy(() => marshalEffectivePredictiveOptimizationFlagSchema).optional(),
    browseOnly: z.boolean().optional(),
    provisioningInfo: z.lazy(() => marshalProvisioningInfoSchema).optional(),
    fullName: z.string().optional(),
    securableType: z.enum(SecurableType).optional(),
    conversionInfo: z.lazy(() => marshalConversionInfoSchema).optional(),
    drReplicationInfo: z.lazy(() => marshalDrReplicationInfoSchema).optional(),
    managedEncryptionSettings: z.lazy(() => marshalEncryptionSettingsSchema).optional(),
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
    effective_predictive_optimization_flag: d.effectivePredictiveOptimizationFlag,
    browse_only: d.browseOnly,
    provisioning_info: d.provisioningInfo,
    full_name: d.fullName,
    securable_type: d.securableType,
    conversion_info: d.conversionInfo,
    dr_replication_info: d.drReplicationInfo,
    managed_encryption_settings: d.managedEncryptionSettings,
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCatalogInfo_OptionsEntrySchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCatalogInfo_PropertiesEntrySchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalConversionInfoSchema: z.ZodType = z
  .object({
    state: z.enum(ConversionInfo_State).optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const marshalCreateCatalogSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    catalogType: z.enum(CatalogType).optional(),
    providerName: z.string().optional(),
    shareName: z.string().optional(),
    connectionName: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    storageLocation: z.string().optional(),
    isolationMode: z.enum(CatalogIsolationMode).optional(),
    effectivePredictiveOptimizationFlag: z.lazy(() => marshalEffectivePredictiveOptimizationFlagSchema).optional(),
    browseOnly: z.boolean().optional(),
    provisioningInfo: z.lazy(() => marshalProvisioningInfoSchema).optional(),
    fullName: z.string().optional(),
    securableType: z.enum(SecurableType).optional(),
    conversionInfo: z.lazy(() => marshalConversionInfoSchema).optional(),
    drReplicationInfo: z.lazy(() => marshalDrReplicationInfoSchema).optional(),
    managedEncryptionSettings: z.lazy(() => marshalEncryptionSettingsSchema).optional(),
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
    effective_predictive_optimization_flag: d.effectivePredictiveOptimizationFlag,
    browse_only: d.browseOnly,
    provisioning_info: d.provisioningInfo,
    full_name: d.fullName,
    securable_type: d.securableType,
    conversion_info: d.conversionInfo,
    dr_replication_info: d.drReplicationInfo,
    managed_encryption_settings: d.managedEncryptionSettings,
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCreateCatalog_OptionsEntrySchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCreateCatalog_PropertiesEntrySchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalDeleteCatalogSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    force: z.boolean().optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    force: d.force,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteCatalog_ResponseSchema: z.ZodType = z
  .object({
  });

export const marshalDrReplicationInfoSchema: z.ZodType = z
  .object({
    status: z.enum(DrReplicationStatus).optional(),
    replicatedEntities: z.any().transform((d: Uint8Array) => btoa(Array.from(d, b => String.fromCharCode(b)).join(''))).optional(),
  })
  .transform(d => ({
    status: d.status,
    replicated_entities: d.replicatedEntities,
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
    azureEncryptionSettings: z.lazy(() => marshalAzureEncryptionSettingsSchema).optional(),
  })
  .transform(d => ({
    customer_managed_key_id: d.customerManagedKeyId,
    azure_key_vault_key_id: d.azureKeyVaultKeyId,
    azure_encryption_settings: d.azureEncryptionSettings,
  }));

export const marshalGetCatalogSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    includeBrowse: z.boolean().optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    include_browse: d.includeBrowse,
  }));

export const marshalListCatalogsSchema: z.ZodType = z
  .object({
    includeBrowse: z.boolean().optional(),
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
    includeUnbound: z.boolean().optional(),
  })
  .transform(d => ({
    include_browse: d.includeBrowse,
    max_results: d.maxResults,
    page_token: d.pageToken,
    include_unbound: d.includeUnbound,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListCatalogs_ResponseSchema: z.ZodType = z
  .object({
    catalogs: z.array(z.lazy(() => marshalCatalogInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    catalogs: d.catalogs,
    next_page_token: d.nextPageToken,
  }));

export const marshalProvisioningInfoSchema: z.ZodType = z
  .object({
    state: z.enum(ProvisioningInfo_State).optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const marshalUpdateCatalogSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    newName: z.string().optional(),
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    catalogType: z.enum(CatalogType).optional(),
    providerName: z.string().optional(),
    shareName: z.string().optional(),
    connectionName: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    storageLocation: z.string().optional(),
    isolationMode: z.enum(CatalogIsolationMode).optional(),
    effectivePredictiveOptimizationFlag: z.lazy(() => marshalEffectivePredictiveOptimizationFlagSchema).optional(),
    browseOnly: z.boolean().optional(),
    provisioningInfo: z.lazy(() => marshalProvisioningInfoSchema).optional(),
    fullName: z.string().optional(),
    securableType: z.enum(SecurableType).optional(),
    conversionInfo: z.lazy(() => marshalConversionInfoSchema).optional(),
    drReplicationInfo: z.lazy(() => marshalDrReplicationInfoSchema).optional(),
    managedEncryptionSettings: z.lazy(() => marshalEncryptionSettingsSchema).optional(),
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
    effective_predictive_optimization_flag: d.effectivePredictiveOptimizationFlag,
    browse_only: d.browseOnly,
    provisioning_info: d.provisioningInfo,
    full_name: d.fullName,
    securable_type: d.securableType,
    conversion_info: d.conversionInfo,
    dr_replication_info: d.drReplicationInfo,
    managed_encryption_settings: d.managedEncryptionSettings,
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateCatalog_OptionsEntrySchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateCatalog_PropertiesEntrySchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));
