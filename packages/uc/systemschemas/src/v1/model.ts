// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface DisableSystemSchemaRequest {
  /** Name of the system schema, without the catalog prefix. */
  schema?: string | undefined;
  /** The metastore ID under which the system schema lives. */
  metastoreId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DisableSystemSchemaResponse {}

export interface EnableSystemSchemaRequest {
  /** Name of the system schema, without the catalog prefix. */
  schema?: string | undefined;
  /** The metastore ID under which the system schema lives. */
  metastoreId?: string | undefined;
  /**
   * Name of the catalog in which to enable the system schema. The supported values are `system` and `samples`. If not
   * set, the system schema is enabled in the `system` catalog.
   */
  catalogName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EnableSystemSchemaResponse {}

export interface ListSystemSchemasRequest {
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

export interface ListSystemSchemasResponse {
  /** An array of system schema information objects. */
  schemas?: SystemSchemaInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

/**
 * A system schema of a metastore, with its current enablement state. System schemas hold Databricks-provided system
 * tables, such as audit logs and billing usage. They live in the `system` catalog unless they are enabled in another
 * supported catalog. See https://docs.databricks.com/aws/en/admin/system-tables/.
 */
export interface SystemSchemaInfo {
  /** Name of the system schema, without the catalog prefix. */
  schema: string;
  /**
   * The current enablement state of the system schema. Possible values are `AVAILABLE` (the schema can be enabled),
   * `ENABLE_INITIALIZED` (enablement is in progress), `ENABLE_COMPLETED` (the schema is enabled), `DISABLE_INITIALIZED`
   * (disablement is in progress), `UNAVAILABLE` (the schema cannot be enabled at the moment) and `MANAGED` (Databricks
   * enables the schema automatically).
   */
  state: string;
}

export const unmarshalDisableSystemSchemaResponseSchema: z.ZodType<DisableSystemSchemaResponse> =
  z.object({});

export const unmarshalEnableSystemSchemaResponseSchema: z.ZodType<EnableSystemSchemaResponse> =
  z.object({});

export const unmarshalListSystemSchemasResponseSchema: z.ZodType<ListSystemSchemasResponse> =
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

export const marshalDisableSystemSchemaRequestSchema: z.ZodType = z
  .object({
    schema: z.string().optional(),
    metastoreId: z.string().optional(),
  })
  .transform(d => ({
    schema: d.schema,
    metastore_id: d.metastoreId,
  }));

export const marshalDisableSystemSchemaResponseSchema: z.ZodType = z.object({});

export const marshalEnableSystemSchemaRequestSchema: z.ZodType = z
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

export const marshalEnableSystemSchemaResponseSchema: z.ZodType = z.object({});

export const marshalListSystemSchemasRequestSchema: z.ZodType = z
  .object({
    metastoreId: z.string().optional(),
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    metastore_id: d.metastoreId,
    max_results: d.maxResults,
    page_token: d.pageToken,
  }));

export const marshalListSystemSchemasResponseSchema: z.ZodType = z
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
