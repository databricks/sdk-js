// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export interface DisableSystemSchema {
  /** Full name of the system schema. */
  schema?: string | undefined;
  /** The metastore ID under which the system schema lives. */
  metastoreId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DisableSystemSchema_Response {}

export interface EnableSystemSchema {
  /** Full name of the system schema. */
  schema?: string | undefined;
  /** The metastore ID under which the system schema lives. */
  metastoreId?: string | undefined;
  /** the catalog for which the system schema is to enabled in */
  catalogName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface EnableSystemSchema_Response {}

export interface ListSystemSchemas {
  /** The ID for the metastore in which the system schema resides. */
  metastoreId?: string | undefined;
  /**
   * Maximum number of schemas to return.
   * - When set to 0, the page length is set to a server configured value (recommended);
   * - When set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - When set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all the schemas are returned (not recommended).
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListSystemSchemas_Response {
  /** An array of system schema information objects. */
  schemas?: SystemSchemaInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface SystemSchemaInfo {
  /** Name of the system schema. */
  schema: string;
  /**
   * The current state of enablement for the system schema. An empty string means the system schema is available and ready for opt-in.
   * Possible values: AVAILABLE | ENABLE_INITIALIZED | ENABLE_COMPLETED | DISABLE_INITIALIZED | UNAVAILABLE | MANAGED
   */
  state: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDisableSystemSchema_ResponseSchema: z.ZodType<DisableSystemSchema_Response> =
  z.object({});

export const unmarshalEnableSystemSchemaSchema: z.ZodType<EnableSystemSchema> =
  z
    .object({
      schema: z.string().optional(),
      metastore_id: z.string().optional(),
      catalog_name: z.string().optional(),
    })
    .transform(d => ({
      schema: d.schema,
      metastoreId: d.metastore_id,
      catalogName: d.catalog_name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEnableSystemSchema_ResponseSchema: z.ZodType<EnableSystemSchema_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListSystemSchemas_ResponseSchema: z.ZodType<ListSystemSchemas_Response> =
  z
    .object({
      schemas: z
        .array(z.lazy(() => unmarshalSystemSchemaInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      schemas: d.schemas,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSystemSchemaInfoSchema: z.ZodType<SystemSchemaInfo> = z
  .object({
    schema: z.string(),
    state: z.string(),
  })
  .transform(d => ({
    schema: d.schema,
    state: d.state,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDisableSystemSchema_ResponseSchema: z.ZodType = z.object(
  {}
);

export const marshalEnableSystemSchemaSchema: z.ZodType = z
  .object({
    schema: z.string().optional(),
    metastoreId: z.string().optional(),
    catalogName: z.string().optional(),
  })
  .transform(d => ({
    schema: d.schema,
    metastore_id: d.metastoreId,
    catalog_name: d.catalogName,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEnableSystemSchema_ResponseSchema: z.ZodType = z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListSystemSchemas_ResponseSchema: z.ZodType = z
  .object({
    schemas: z.array(z.lazy(() => marshalSystemSchemaInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    schemas: d.schemas,
    next_page_token: d.nextPageToken,
  }));

export const marshalSystemSchemaInfoSchema: z.ZodType = z
  .object({
    schema: z.string(),
    state: z.string(),
  })
  .transform(d => ({
    schema: d.schema,
    state: d.state,
  }));

const disableSystemSchemaFieldMaskSchema: FieldMaskSchema = {
  metastoreId: {wire: 'metastore_id'},
  schema: {wire: 'schema'},
};

export function disableSystemSchemaFieldMask(
  ...paths: string[]
): FieldMask<DisableSystemSchema> {
  return FieldMask.build<DisableSystemSchema>(
    paths,
    disableSystemSchemaFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const disableSystemSchema_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function disableSystemSchema_ResponseFieldMask(
  ...paths: string[]
): FieldMask<DisableSystemSchema_Response> {
  return FieldMask.build<DisableSystemSchema_Response>(
    paths,
    disableSystemSchema_ResponseFieldMaskSchema
  );
}

const enableSystemSchemaFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  metastoreId: {wire: 'metastore_id'},
  schema: {wire: 'schema'},
};

export function enableSystemSchemaFieldMask(
  ...paths: string[]
): FieldMask<EnableSystemSchema> {
  return FieldMask.build<EnableSystemSchema>(
    paths,
    enableSystemSchemaFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const enableSystemSchema_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function enableSystemSchema_ResponseFieldMask(
  ...paths: string[]
): FieldMask<EnableSystemSchema_Response> {
  return FieldMask.build<EnableSystemSchema_Response>(
    paths,
    enableSystemSchema_ResponseFieldMaskSchema
  );
}

const listSystemSchemasFieldMaskSchema: FieldMaskSchema = {
  maxResults: {wire: 'max_results'},
  metastoreId: {wire: 'metastore_id'},
  pageToken: {wire: 'page_token'},
};

export function listSystemSchemasFieldMask(
  ...paths: string[]
): FieldMask<ListSystemSchemas> {
  return FieldMask.build<ListSystemSchemas>(
    paths,
    listSystemSchemasFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const listSystemSchemas_ResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  schemas: {wire: 'schemas'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function listSystemSchemas_ResponseFieldMask(
  ...paths: string[]
): FieldMask<ListSystemSchemas_Response> {
  return FieldMask.build<ListSystemSchemas_Response>(
    paths,
    listSystemSchemas_ResponseFieldMaskSchema
  );
}

const systemSchemaInfoFieldMaskSchema: FieldMaskSchema = {
  schema: {wire: 'schema'},
  state: {wire: 'state'},
};

export function systemSchemaInfoFieldMask(
  ...paths: string[]
): FieldMask<SystemSchemaInfo> {
  return FieldMask.build<SystemSchemaInfo>(
    paths,
    systemSchemaInfoFieldMaskSchema
  );
}
