// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
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

export const marshalCreateSchemaSchema: z.ZodType = z
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
export const marshalDeleteSchema_ResponseSchema: z.ZodType = z.object({});

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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListSchemas_ResponseSchema: z.ZodType = z
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

export const marshalUpdateSchemaSchema: z.ZodType = z
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

const createSchemaFieldMaskSchema: FieldMaskSchema = {
  browseOnly: {wire: 'browse_only'},
  catalogName: {wire: 'catalog_name'},
  catalogType: {wire: 'catalog_type'},
  comment: {wire: 'comment'},
  createdAt: {wire: 'created_at'},
  createdBy: {wire: 'created_by'},
  effectivePredictiveOptimizationFlag: {
    wire: 'effective_predictive_optimization_flag',
    children: () => effectivePredictiveOptimizationFlagFieldMaskSchema,
  },
  enablePredictiveOptimization: {wire: 'enable_predictive_optimization'},
  fullName: {wire: 'full_name'},
  metastoreId: {wire: 'metastore_id'},
  name: {wire: 'name'},
  options: {wire: 'options'},
  owner: {wire: 'owner'},
  properties: {wire: 'properties'},
  schemaId: {wire: 'schema_id'},
  storageLocation: {wire: 'storage_location'},
  storageRoot: {wire: 'storage_root'},
  updatedAt: {wire: 'updated_at'},
  updatedBy: {wire: 'updated_by'},
};

export function createSchemaFieldMask(
  ...paths: string[]
): FieldMask<CreateSchema> {
  return FieldMask.build<CreateSchema>(paths, createSchemaFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const createSchema_OptionsEntryFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function createSchema_OptionsEntryFieldMask(
  ...paths: string[]
): FieldMask<CreateSchema_OptionsEntry> {
  return FieldMask.build<CreateSchema_OptionsEntry>(
    paths,
    createSchema_OptionsEntryFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const createSchema_PropertiesEntryFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function createSchema_PropertiesEntryFieldMask(
  ...paths: string[]
): FieldMask<CreateSchema_PropertiesEntry> {
  return FieldMask.build<CreateSchema_PropertiesEntry>(
    paths,
    createSchema_PropertiesEntryFieldMaskSchema
  );
}

const deleteSchemaFieldMaskSchema: FieldMaskSchema = {
  force: {wire: 'force'},
  fullNameArg: {wire: 'full_name_arg'},
};

export function deleteSchemaFieldMask(
  ...paths: string[]
): FieldMask<DeleteSchema> {
  return FieldMask.build<DeleteSchema>(paths, deleteSchemaFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const deleteSchema_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function deleteSchema_ResponseFieldMask(
  ...paths: string[]
): FieldMask<DeleteSchema_Response> {
  return FieldMask.build<DeleteSchema_Response>(
    paths,
    deleteSchema_ResponseFieldMaskSchema
  );
}

const effectivePredictiveOptimizationFlagFieldMaskSchema: FieldMaskSchema = {
  inheritedFromName: {wire: 'inherited_from_name'},
  inheritedFromType: {wire: 'inherited_from_type'},
  value: {wire: 'value'},
};

export function effectivePredictiveOptimizationFlagFieldMask(
  ...paths: string[]
): FieldMask<EffectivePredictiveOptimizationFlag> {
  return FieldMask.build<EffectivePredictiveOptimizationFlag>(
    paths,
    effectivePredictiveOptimizationFlagFieldMaskSchema
  );
}

const getSchemaFieldMaskSchema: FieldMaskSchema = {
  fullNameArg: {wire: 'full_name_arg'},
  includeBrowse: {wire: 'include_browse'},
};

export function getSchemaFieldMask(...paths: string[]): FieldMask<GetSchema> {
  return FieldMask.build<GetSchema>(paths, getSchemaFieldMaskSchema);
}

const listSchemasFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  includeBrowse: {wire: 'include_browse'},
  maxResults: {wire: 'max_results'},
  pageToken: {wire: 'page_token'},
};

export function listSchemasFieldMask(
  ...paths: string[]
): FieldMask<ListSchemas> {
  return FieldMask.build<ListSchemas>(paths, listSchemasFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const listSchemas_ResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  schemas: {wire: 'schemas'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function listSchemas_ResponseFieldMask(
  ...paths: string[]
): FieldMask<ListSchemas_Response> {
  return FieldMask.build<ListSchemas_Response>(
    paths,
    listSchemas_ResponseFieldMaskSchema
  );
}

const schemaInfoFieldMaskSchema: FieldMaskSchema = {
  browseOnly: {wire: 'browse_only'},
  catalogName: {wire: 'catalog_name'},
  catalogType: {wire: 'catalog_type'},
  comment: {wire: 'comment'},
  createdAt: {wire: 'created_at'},
  createdBy: {wire: 'created_by'},
  effectivePredictiveOptimizationFlag: {
    wire: 'effective_predictive_optimization_flag',
    children: () => effectivePredictiveOptimizationFlagFieldMaskSchema,
  },
  enablePredictiveOptimization: {wire: 'enable_predictive_optimization'},
  fullName: {wire: 'full_name'},
  metastoreId: {wire: 'metastore_id'},
  name: {wire: 'name'},
  options: {wire: 'options'},
  owner: {wire: 'owner'},
  properties: {wire: 'properties'},
  schemaId: {wire: 'schema_id'},
  storageLocation: {wire: 'storage_location'},
  storageRoot: {wire: 'storage_root'},
  updatedAt: {wire: 'updated_at'},
  updatedBy: {wire: 'updated_by'},
};

export function schemaInfoFieldMask(...paths: string[]): FieldMask<SchemaInfo> {
  return FieldMask.build<SchemaInfo>(paths, schemaInfoFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const schemaInfo_OptionsEntryFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function schemaInfo_OptionsEntryFieldMask(
  ...paths: string[]
): FieldMask<SchemaInfo_OptionsEntry> {
  return FieldMask.build<SchemaInfo_OptionsEntry>(
    paths,
    schemaInfo_OptionsEntryFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const schemaInfo_PropertiesEntryFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function schemaInfo_PropertiesEntryFieldMask(
  ...paths: string[]
): FieldMask<SchemaInfo_PropertiesEntry> {
  return FieldMask.build<SchemaInfo_PropertiesEntry>(
    paths,
    schemaInfo_PropertiesEntryFieldMaskSchema
  );
}

const updateSchemaFieldMaskSchema: FieldMaskSchema = {
  browseOnly: {wire: 'browse_only'},
  catalogName: {wire: 'catalog_name'},
  catalogType: {wire: 'catalog_type'},
  comment: {wire: 'comment'},
  createdAt: {wire: 'created_at'},
  createdBy: {wire: 'created_by'},
  effectivePredictiveOptimizationFlag: {
    wire: 'effective_predictive_optimization_flag',
    children: () => effectivePredictiveOptimizationFlagFieldMaskSchema,
  },
  enablePredictiveOptimization: {wire: 'enable_predictive_optimization'},
  fullName: {wire: 'full_name'},
  fullNameArg: {wire: 'full_name_arg'},
  metastoreId: {wire: 'metastore_id'},
  name: {wire: 'name'},
  newName: {wire: 'new_name'},
  options: {wire: 'options'},
  owner: {wire: 'owner'},
  properties: {wire: 'properties'},
  schemaId: {wire: 'schema_id'},
  storageLocation: {wire: 'storage_location'},
  storageRoot: {wire: 'storage_root'},
  updatedAt: {wire: 'updated_at'},
  updatedBy: {wire: 'updated_by'},
};

export function updateSchemaFieldMask(
  ...paths: string[]
): FieldMask<UpdateSchema> {
  return FieldMask.build<UpdateSchema>(paths, updateSchemaFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const updateSchema_OptionsEntryFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function updateSchema_OptionsEntryFieldMask(
  ...paths: string[]
): FieldMask<UpdateSchema_OptionsEntry> {
  return FieldMask.build<UpdateSchema_OptionsEntry>(
    paths,
    updateSchema_OptionsEntryFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const updateSchema_PropertiesEntryFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function updateSchema_PropertiesEntryFieldMask(
  ...paths: string[]
): FieldMask<UpdateSchema_PropertiesEntry> {
  return FieldMask.build<UpdateSchema_PropertiesEntry>(
    paths,
    updateSchema_PropertiesEntryFieldMaskSchema
  );
}
