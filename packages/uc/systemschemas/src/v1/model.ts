// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface DisableSystemSchemaRequest {
  /** Full name of the system schema. */
  schema?: string | undefined;
  /** The metastore ID under which the system schema lives. */
  metastoreId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DisableSystemSchemaResponse {}

export interface EnableSystemSchemaRequest {
  /** Full name of the system schema. */
  schema?: string | undefined;
  /** The metastore ID under which the system schema lives. */
  metastoreId?: string | undefined;
  /** the catalog for which the system schema is to enabled in */
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

export interface SystemSchemaInfo {
  /** Name of the system schema. */
  schema: string;
  /**
   * The current state of enablement for the system schema. An empty string means the system schema is available and ready for opt-in.
   * Possible values: AVAILABLE | ENABLE_INITIALIZED | ENABLE_COMPLETED | DISABLE_INITIALIZED | UNAVAILABLE | MANAGED
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
