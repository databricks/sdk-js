// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

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

export interface CreateSchemaRequest {
  /** Name of schema, relative to parent catalog. */
  name?: string | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /**
   * The user or group that owns the schema. The creator becomes the owner, and the owner can be changed
   * only through the update method.
   */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /**
   * Managed tables and volumes in the schema are stored under this storage root URL. The path must be
   * inside an external location on which the caller has the CREATE MANAGED STORAGE privilege. If omitted,
   * managed data is stored under the parent catalog's storage root, or under the metastore's root storage
   * location when the catalog has none. Schemas in Delta Sharing catalogs cannot have a storage root, and
   * schemas in a federated Hive metastore catalog must set one.
   */
  storageRoot?: string | undefined;
  /**
   * Whether predictive optimization is enabled for this schema and the objects under it. Valid values are
   * ENABLE, DISABLE, and INHERIT, where INHERIT applies the parent catalog's setting. New schemas start as
   * INHERIT. It cannot be set when creating a schema; use the update method instead.
   */
  enablePredictiveOptimization?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of schema, in form of __catalog_name__.__schema_name__. */
  fullName?: string | undefined;
  /** Time at which this schema was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of schema creator. */
  createdBy?: string | undefined;
  /** Time at which this schema was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified schema. */
  updatedBy?: string | undefined;
  /** The type of the parent catalog, which the server copies from the catalog. */
  catalogType?: CatalogType | undefined;
  /**
   * The server derives this full storage location URL for managed tables and volumes within the schema
   * from storage_root and the schema ID. It is absent when the schema has no storage root of its own.
   */
  storageLocation?: string | undefined;
  /**
   * Indicates the predictive optimization setting that is in effect for the schema once inherited values
   * are resolved.
   */
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** The unique identifier (UUID) that the server assigns to the schema when it is created. */
  schemaId?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  /**
   * Dropped objects in the schema remain recoverable for this number of hours before they are permanently
   * purged. The value must be 0 or within the range allowed for the metastore. Schemas that do not set
   * their own value inherit the parent catalog's value.
   */
  customMaxRetentionHours?: bigint | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

export interface DeleteSchemaRequest {
  /** Full name of the schema, in the form catalog_name.schema_name. */
  fullNameArg?: string | undefined;
  /** Force deletion even if the schema is not empty. */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteSchemaResponse {}

export interface EffectivePredictiveOptimizationFlag {
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  value?: string | undefined;
  /** The type of the object from which the flag was inherited. If there was no inheritance, this field is left blank. */
  inheritedFromType?: string | undefined;
  /** The name of the object from which the flag was inherited. If there was no inheritance, this field is left blank. */
  inheritedFromName?: string | undefined;
}

export interface GetSchemaRequest {
  /** Full name of the schema, in the form catalog_name.schema_name. */
  fullNameArg?: string | undefined;
  /**
   * Whether to return the schema when the principal can only access selective metadata for it through the
   * BROWSE privilege. The response then has browse_only set to true.
   */
  includeBrowse?: boolean | undefined;
}

export interface ListSchemasRequest {
  /** Parent catalog for schemas of interest. */
  catalogName?: string | undefined;
  /**
   * Maximum number of schemas to return.
   * If not set, all the schemas are returned (not recommended).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
  /**
   * Whether to include schemas for which the principal can only access selective metadata through the
   * BROWSE privilege. Such schemas are returned with browse_only set to true.
   */
  includeBrowse?: boolean | undefined;
}

export interface ListSchemasResponse {
  /** An array of schema information objects. */
  schemas?: SchemaInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

/**
 * A schema (also called a database) is the second layer of Unity Catalog's three-level namespace and
 * groups the tables, views, volumes, models, and functions under its parent catalog. Managed tables and
 * volumes in the schema are stored under the schema's storage root when it has one, and otherwise under
 * the storage of the parent catalog or the metastore.
 */
export interface SchemaInfo {
  /** Name of schema, relative to parent catalog. */
  name?: string | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /**
   * The user or group that owns the schema. The creator becomes the owner, and the owner can be changed
   * only through the update method.
   */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /**
   * Managed tables and volumes in the schema are stored under this storage root URL. The path must be
   * inside an external location on which the caller has the CREATE MANAGED STORAGE privilege. If omitted,
   * managed data is stored under the parent catalog's storage root, or under the metastore's root storage
   * location when the catalog has none. Schemas in Delta Sharing catalogs cannot have a storage root, and
   * schemas in a federated Hive metastore catalog must set one.
   */
  storageRoot?: string | undefined;
  /**
   * Whether predictive optimization is enabled for this schema and the objects under it. Valid values are
   * ENABLE, DISABLE, and INHERIT, where INHERIT applies the parent catalog's setting. New schemas start as
   * INHERIT. It cannot be set when creating a schema; use the update method instead.
   */
  enablePredictiveOptimization?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of schema, in form of __catalog_name__.__schema_name__. */
  fullName?: string | undefined;
  /** Time at which this schema was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of schema creator. */
  createdBy?: string | undefined;
  /** Time at which this schema was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified schema. */
  updatedBy?: string | undefined;
  /** The type of the parent catalog, which the server copies from the catalog. */
  catalogType?: CatalogType | undefined;
  /**
   * The server derives this full storage location URL for managed tables and volumes within the schema
   * from storage_root and the schema ID. It is absent when the schema has no storage root of its own.
   */
  storageLocation?: string | undefined;
  /**
   * Indicates the predictive optimization setting that is in effect for the schema once inherited values
   * are resolved.
   */
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** The unique identifier (UUID) that the server assigns to the schema when it is created. */
  schemaId?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  /**
   * Dropped objects in the schema remain recoverable for this number of hours before they are permanently
   * purged. The value must be 0 or within the range allowed for the metastore. Schemas that do not set
   * their own value inherit the parent catalog's value.
   */
  customMaxRetentionHours?: bigint | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

export interface UpdateSchemaRequest {
  /** Full name of the schema, in the form catalog_name.schema_name. */
  fullNameArg?: string | undefined;
  /** New name for the schema. */
  newName?: string | undefined;
  /** Name of schema, relative to parent catalog. */
  name?: string | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /**
   * The user or group that owns the schema. The creator becomes the owner, and the owner can be changed
   * only through the update method.
   */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /**
   * Managed tables and volumes in the schema are stored under this storage root URL. The path must be
   * inside an external location on which the caller has the CREATE MANAGED STORAGE privilege. If omitted,
   * managed data is stored under the parent catalog's storage root, or under the metastore's root storage
   * location when the catalog has none. Schemas in Delta Sharing catalogs cannot have a storage root, and
   * schemas in a federated Hive metastore catalog must set one.
   */
  storageRoot?: string | undefined;
  /**
   * Whether predictive optimization is enabled for this schema and the objects under it. Valid values are
   * ENABLE, DISABLE, and INHERIT, where INHERIT applies the parent catalog's setting. New schemas start as
   * INHERIT. It cannot be set when creating a schema; use the update method instead.
   */
  enablePredictiveOptimization?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of schema, in form of __catalog_name__.__schema_name__. */
  fullName?: string | undefined;
  /** Time at which this schema was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of schema creator. */
  createdBy?: string | undefined;
  /** Time at which this schema was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified schema. */
  updatedBy?: string | undefined;
  /** The type of the parent catalog, which the server copies from the catalog. */
  catalogType?: CatalogType | undefined;
  /**
   * The server derives this full storage location URL for managed tables and volumes within the schema
   * from storage_root and the schema ID. It is absent when the schema has no storage root of its own.
   */
  storageLocation?: string | undefined;
  /**
   * Indicates the predictive optimization setting that is in effect for the schema once inherited values
   * are resolved.
   */
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** The unique identifier (UUID) that the server assigns to the schema when it is created. */
  schemaId?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  /**
   * Dropped objects in the schema remain recoverable for this number of hours before they are permanently
   * purged. The value must be 0 or within the range allowed for the metastore. Schemas that do not set
   * their own value inherit the parent catalog's value.
   */
  customMaxRetentionHours?: bigint | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

export const unmarshalDeleteSchemaResponseSchema: z.ZodType<DeleteSchemaResponse> =
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

export const unmarshalListSchemasResponseSchema: z.ZodType<ListSchemasResponse> =
  z
    .object({
      schemas: z.array(z.lazy(() => unmarshalSchemaInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      schemas: d.schemas,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSchemaInfoSchema: z.ZodType<SchemaInfo> = z
  .object({
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_root: z.string().optional(),
    enable_predictive_optimization: z.string().optional(),
    metastore_id: z.string().optional(),
    full_name: z.string().optional(),
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
    catalog_type: z.string().optional(),
    storage_location: z.string().optional(),
    effective_predictive_optimization_flag: z
      .lazy(() => unmarshalEffectivePredictiveOptimizationFlagSchema)
      .nullish()
      .transform(v => v ?? undefined),
    schema_id: z.string().optional(),
    browse_only: z.boolean().optional(),
    custom_max_retention_hours: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    properties: z.record(z.string(), z.string()).optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    catalogName: d.catalog_name,
    owner: d.owner,
    comment: d.comment,
    storageRoot: d.storage_root,
    enablePredictiveOptimization: d.enable_predictive_optimization,
    metastoreId: d.metastore_id,
    fullName: d.full_name,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    catalogType: d.catalog_type,
    storageLocation: d.storage_location,
    effectivePredictiveOptimizationFlag:
      d.effective_predictive_optimization_flag,
    schemaId: d.schema_id,
    browseOnly: d.browse_only,
    customMaxRetentionHours: d.custom_max_retention_hours,
    properties: d.properties,
    options: d.options,
  }));

export const marshalCreateSchemaRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    catalogType: z.string().optional(),
    storageLocation: z.string().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    schemaId: z.string().optional(),
    browseOnly: z.boolean().optional(),
    customMaxRetentionHours: z.bigint().optional(),
    properties: z.record(z.string(), z.string()).optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog_name: d.catalogName,
    owner: d.owner,
    comment: d.comment,
    storage_root: d.storageRoot,
    enable_predictive_optimization: d.enablePredictiveOptimization,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    catalog_type: d.catalogType,
    storage_location: d.storageLocation,
    effective_predictive_optimization_flag:
      d.effectivePredictiveOptimizationFlag,
    schema_id: d.schemaId,
    browse_only: d.browseOnly,
    custom_max_retention_hours: d.customMaxRetentionHours,
    properties: d.properties,
    options: d.options,
  }));

export const marshalDeleteSchemaRequestSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    force: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    force: d.force,
  }));

export const marshalDeleteSchemaResponseSchema: z.ZodType = z.object({});

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

export const marshalGetSchemaRequestSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    includeBrowse: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    include_browse: d.includeBrowse,
  }));

export const marshalListSchemasRequestSchema: z.ZodType = z
  .object({
    catalogName: z.string().optional(),
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
    includeBrowse: z.boolean().optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    max_results: d.maxResults,
    page_token: d.pageToken,
    include_browse: d.includeBrowse,
  }));

export const marshalListSchemasResponseSchema: z.ZodType = z
  .object({
    schemas: z.array(z.lazy(() => marshalSchemaInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    schemas: d.schemas,
    next_page_token: d.nextPageToken,
  }));

export const marshalSchemaInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    catalogType: z.string().optional(),
    storageLocation: z.string().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    schemaId: z.string().optional(),
    browseOnly: z.boolean().optional(),
    customMaxRetentionHours: z.bigint().optional(),
    properties: z.record(z.string(), z.string()).optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog_name: d.catalogName,
    owner: d.owner,
    comment: d.comment,
    storage_root: d.storageRoot,
    enable_predictive_optimization: d.enablePredictiveOptimization,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    catalog_type: d.catalogType,
    storage_location: d.storageLocation,
    effective_predictive_optimization_flag:
      d.effectivePredictiveOptimizationFlag,
    schema_id: d.schemaId,
    browse_only: d.browseOnly,
    custom_max_retention_hours: d.customMaxRetentionHours,
    properties: d.properties,
    options: d.options,
  }));

export const marshalUpdateSchemaRequestSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    newName: z.string().optional(),
    name: z.string().optional(),
    catalogName: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    catalogType: z.string().optional(),
    storageLocation: z.string().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    schemaId: z.string().optional(),
    browseOnly: z.boolean().optional(),
    customMaxRetentionHours: z.bigint().optional(),
    properties: z.record(z.string(), z.string()).optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    new_name: d.newName,
    name: d.name,
    catalog_name: d.catalogName,
    owner: d.owner,
    comment: d.comment,
    storage_root: d.storageRoot,
    enable_predictive_optimization: d.enablePredictiveOptimization,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    catalog_type: d.catalogType,
    storage_location: d.storageLocation,
    effective_predictive_optimization_flag:
      d.effectivePredictiveOptimizationFlag,
    schema_id: d.schemaId,
    browse_only: d.browseOnly,
    custom_max_retention_hours: d.customMaxRetentionHours,
    properties: d.properties,
    options: d.options,
  }));
