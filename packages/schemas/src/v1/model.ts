// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The type of the catalog. */
export enum CatalogType {
  MANAGED_CATALOG = 'MANAGED_CATALOG',
  DELTASHARING_CATALOG = 'DELTASHARING_CATALOG',
  SYSTEM_CATALOG = 'SYSTEM_CATALOG',
  INTERNAL_CATALOG = 'INTERNAL_CATALOG',
  FOREIGN_CATALOG = 'FOREIGN_CATALOG',
  MANAGED_ONLINE_CATALOG = 'MANAGED_ONLINE_CATALOG',
}

export interface CreateSchema {
  /** Name of schema, relative to parent catalog. */
  name?: string | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /** Username of current owner of schema. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Storage root URL for managed tables within schema. */
  storageRoot?: string | undefined;
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  enablePredictiveOptimization?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of schema, in form of __catalog_name__.__schema_name__. */
  fullName?: string | undefined;
  /** Time at which this schema was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of schema creator. */
  createdBy?: string | undefined;
  /** Time at which this schema was created, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified schema. */
  updatedBy?: string | undefined;
  /** The type of the parent catalog. */
  catalogType?: CatalogType | undefined;
  /** Storage location for managed tables within schema. */
  storageLocation?: string | undefined;
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** The unique identifier of the schema. */
  schemaId?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateSchema_OptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateSchema_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface DeleteSchema {
  /** Full name of the schema. */
  fullNameArg?: string | undefined;
  /** Force deletion even if the schema is not empty. */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteSchema_Response {}

export interface EffectivePredictiveOptimizationFlag {
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  value?: string | undefined;
  /** The type of the object from which the flag was inherited. If there was no inheritance, this field is left blank. */
  inheritedFromType?: string | undefined;
  /** The name of the object from which the flag was inherited. If there was no inheritance, this field is left blank. */
  inheritedFromName?: string | undefined;
}

export interface GetSchema {
  /** Full name of the schema. */
  fullNameArg?: string | undefined;
  /** Whether to include schemas in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface ListSchemas {
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
  /** Whether to include schemas in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListSchemas_Response {
  /** An array of schema information objects. */
  schemas?: SchemaInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

/** Next ID: 45 */
export interface SchemaInfo {
  /** Name of schema, relative to parent catalog. */
  name?: string | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /** Username of current owner of schema. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Storage root URL for managed tables within schema. */
  storageRoot?: string | undefined;
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  enablePredictiveOptimization?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of schema, in form of __catalog_name__.__schema_name__. */
  fullName?: string | undefined;
  /** Time at which this schema was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of schema creator. */
  createdBy?: string | undefined;
  /** Time at which this schema was created, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified schema. */
  updatedBy?: string | undefined;
  /** The type of the parent catalog. */
  catalogType?: CatalogType | undefined;
  /** Storage location for managed tables within schema. */
  storageLocation?: string | undefined;
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** The unique identifier of the schema. */
  schemaId?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SchemaInfo_OptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SchemaInfo_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface UpdateSchema {
  /** Full name of the schema. */
  fullNameArg?: string | undefined;
  /** New name for the schema. */
  newName?: string | undefined;
  /** Name of schema, relative to parent catalog. */
  name?: string | undefined;
  /** Name of parent catalog. */
  catalogName?: string | undefined;
  /** Username of current owner of schema. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Storage root URL for managed tables within schema. */
  storageRoot?: string | undefined;
  /** Whether predictive optimization should be enabled for this object and objects under it. */
  enablePredictiveOptimization?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of schema, in form of __catalog_name__.__schema_name__. */
  fullName?: string | undefined;
  /** Time at which this schema was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of schema creator. */
  createdBy?: string | undefined;
  /** Time at which this schema was created, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified schema. */
  updatedBy?: string | undefined;
  /** The type of the parent catalog. */
  catalogType?: CatalogType | undefined;
  /** Storage location for managed tables within schema. */
  storageLocation?: string | undefined;
  effectivePredictiveOptimizationFlag?:
    | EffectivePredictiveOptimizationFlag
    | undefined;
  /** The unique identifier of the schema. */
  schemaId?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateSchema_OptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateSchema_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export const unmarshalCreateSchemaSchema: z.ZodType<CreateSchema> = z
  .object({
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_root: z.string().optional(),
    enable_predictive_optimization: z.string().optional(),
    metastore_id: z.string().optional(),
    full_name: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    catalog_type: z.enum(CatalogType).optional(),
    storage_location: z.string().optional(),
    effective_predictive_optimization_flag: z
      .lazy(() => unmarshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    schema_id: z.string().optional(),
    browse_only: z.boolean().optional(),
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
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateSchema_OptionsEntrySchema: z.ZodType<CreateSchema_OptionsEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateSchema_PropertiesEntrySchema: z.ZodType<CreateSchema_PropertiesEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalDeleteSchemaSchema: z.ZodType<DeleteSchema> = z
  .object({
    full_name_arg: z.string().optional(),
    force: z.boolean().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    force: d.force,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteSchema_ResponseSchema: z.ZodType<DeleteSchema_Response> =
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

export const unmarshalGetSchemaSchema: z.ZodType<GetSchema> = z
  .object({
    full_name_arg: z.string().optional(),
    include_browse: z.boolean().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    includeBrowse: d.include_browse,
  }));

export const unmarshalListSchemasSchema: z.ZodType<ListSchemas> = z
  .object({
    catalog_name: z.string().optional(),
    max_results: z.number().optional(),
    page_token: z.string().optional(),
    include_browse: z.boolean().optional(),
  })
  .transform(d => ({
    catalogName: d.catalog_name,
    maxResults: d.max_results,
    pageToken: d.page_token,
    includeBrowse: d.include_browse,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListSchemas_ResponseSchema: z.ZodType<ListSchemas_Response> =
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
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    catalog_type: z.enum(CatalogType).optional(),
    storage_location: z.string().optional(),
    effective_predictive_optimization_flag: z
      .lazy(() => unmarshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    schema_id: z.string().optional(),
    browse_only: z.boolean().optional(),
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
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSchemaInfo_OptionsEntrySchema: z.ZodType<SchemaInfo_OptionsEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSchemaInfo_PropertiesEntrySchema: z.ZodType<SchemaInfo_PropertiesEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalUpdateSchemaSchema: z.ZodType<UpdateSchema> = z
  .object({
    full_name_arg: z.string().optional(),
    new_name: z.string().optional(),
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_root: z.string().optional(),
    enable_predictive_optimization: z.string().optional(),
    metastore_id: z.string().optional(),
    full_name: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    catalog_type: z.enum(CatalogType).optional(),
    storage_location: z.string().optional(),
    effective_predictive_optimization_flag: z
      .lazy(() => unmarshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    schema_id: z.string().optional(),
    browse_only: z.boolean().optional(),
    properties: z.record(z.string(), z.string()).optional(),
    options: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    newName: d.new_name,
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
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateSchema_OptionsEntrySchema: z.ZodType<UpdateSchema_OptionsEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateSchema_PropertiesEntrySchema: z.ZodType<UpdateSchema_PropertiesEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const marshalCreateSchemaSchema = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    catalogType: z.enum(CatalogType).optional(),
    storageLocation: z.string().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    schemaId: z.string().optional(),
    browseOnly: z.boolean().optional(),
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
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCreateSchema_OptionsEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCreateSchema_PropertiesEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalDeleteSchemaSchema = z
  .object({
    fullNameArg: z.string().optional(),
    force: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    force: d.force,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteSchema_ResponseSchema = z.object({});

export const marshalEffectivePredictiveOptimizationFlagSchema = z
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

export const marshalGetSchemaSchema = z
  .object({
    fullNameArg: z.string().optional(),
    includeBrowse: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    include_browse: d.includeBrowse,
  }));

export const marshalListSchemasSchema = z
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListSchemas_ResponseSchema = z
  .object({
    schemas: z.array(z.lazy(() => marshalSchemaInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    schemas: d.schemas,
    next_page_token: d.nextPageToken,
  }));

export const marshalSchemaInfoSchema = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    enablePredictiveOptimization: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    catalogType: z.enum(CatalogType).optional(),
    storageLocation: z.string().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    schemaId: z.string().optional(),
    browseOnly: z.boolean().optional(),
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
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSchemaInfo_OptionsEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSchemaInfo_PropertiesEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalUpdateSchemaSchema = z
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
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    catalogType: z.enum(CatalogType).optional(),
    storageLocation: z.string().optional(),
    effectivePredictiveOptimizationFlag: z
      .lazy(() => marshalEffectivePredictiveOptimizationFlagSchema)
      .optional(),
    schemaId: z.string().optional(),
    browseOnly: z.boolean().optional(),
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
    properties: d.properties,
    options: d.options,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateSchema_OptionsEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateSchema_PropertiesEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));
