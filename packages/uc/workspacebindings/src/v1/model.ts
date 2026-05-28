// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Using `BINDING_TYPE_` prefix here to avoid conflict with `TableOperation` enum in `credentials_common.proto`. */
export enum BindingType {
  BINDING_TYPE_UNSPECIFIED = 'BINDING_TYPE_UNSPECIFIED',
  BINDING_TYPE_READ_WRITE = 'BINDING_TYPE_READ_WRITE',
  BINDING_TYPE_READ_ONLY = 'BINDING_TYPE_READ_ONLY',
}

export interface GetCatalogWorkspaceBindingsRequest {
  /** The name of the catalog. */
  catalogName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetCatalogWorkspaceBindingsRequest_Response {
  /** A list of workspace IDs */
  workspaces?: bigint[] | undefined;
}

export interface GetWorkspaceBindingsRequest {
  /** The type of the securable to bind to a workspace (catalog, storage_credential, credential, or external_location). */
  securableType?: string | undefined;
  /** The name of the securable. */
  securableFullName?: string | undefined;
  /**
   * Maximum number of workspace bindings to return.
   * - When set to 0, the page length is set to a server configured value (recommended);
   * - When set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - When set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all the workspace bindings are returned (not recommended).
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetWorkspaceBindingsRequest_Response {
  /** List of workspace bindings */
  bindings?: WorkspaceBindingInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface UpdateCatalogWorkspaceBindingsRequest {
  /** The name of the catalog. */
  catalogName?: string | undefined;
  /** A list of workspace IDs. */
  assignWorkspaces?: bigint[] | undefined;
  /** A list of workspace IDs. */
  unassignWorkspaces?: bigint[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateCatalogWorkspaceBindingsRequest_Response {
  /** A list of workspace IDs */
  workspaces?: bigint[] | undefined;
}

export interface UpdateWorkspaceBindingsRequest {
  /** The type of the securable to bind to a workspace (catalog, storage_credential, credential, or external_location). */
  securableType?: string | undefined;
  /** The name of the securable. */
  securableFullName?: string | undefined;
  /**
   * List of workspace bindings to add. If a binding for the workspace already exists with a
   * different binding_type, adding it again with a new binding_type will update the existing
   * binding (e.g., from READ_WRITE to READ_ONLY).
   */
  add?: WorkspaceBindingInfo[] | undefined;
  /** List of workspace bindings to remove. */
  remove?: WorkspaceBindingInfo[] | undefined;
}

/** A list of workspace IDs that are bound to the securable */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateWorkspaceBindingsRequest_Response {
  /** List of workspace bindings. */
  bindings?: WorkspaceBindingInfo[] | undefined;
}

export interface WorkspaceBindingInfo {
  /** Required */
  workspaceId?: bigint | undefined;
  /** One of READ_WRITE/READ_ONLY. Default is READ_WRITE. */
  bindingType?: BindingType | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetCatalogWorkspaceBindingsRequest_ResponseSchema: z.ZodType<GetCatalogWorkspaceBindingsRequest_Response> =
  z
    .object({
      workspaces: z
        .array(z.union([z.number(), z.bigint()]).transform(v => BigInt(v)))
        .optional(),
    })
    .transform(d => ({
      workspaces: d.workspaces,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetWorkspaceBindingsRequest_ResponseSchema: z.ZodType<GetWorkspaceBindingsRequest_Response> =
  z
    .object({
      bindings: z
        .array(z.lazy(() => unmarshalWorkspaceBindingInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      bindings: d.bindings,
      nextPageToken: d.next_page_token,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateCatalogWorkspaceBindingsRequest_ResponseSchema: z.ZodType<UpdateCatalogWorkspaceBindingsRequest_Response> =
  z
    .object({
      workspaces: z
        .array(z.union([z.number(), z.bigint()]).transform(v => BigInt(v)))
        .optional(),
    })
    .transform(d => ({
      workspaces: d.workspaces,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateWorkspaceBindingsRequest_ResponseSchema: z.ZodType<UpdateWorkspaceBindingsRequest_Response> =
  z
    .object({
      bindings: z
        .array(z.lazy(() => unmarshalWorkspaceBindingInfoSchema))
        .optional(),
    })
    .transform(d => ({
      bindings: d.bindings,
    }));

export const unmarshalWorkspaceBindingInfoSchema: z.ZodType<WorkspaceBindingInfo> =
  z
    .object({
      workspace_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      binding_type: z.enum(BindingType).optional(),
    })
    .transform(d => ({
      workspaceId: d.workspace_id,
      bindingType: d.binding_type,
    }));

export const marshalUpdateCatalogWorkspaceBindingsRequestSchema: z.ZodType = z
  .object({
    catalogName: z.string().optional(),
    assignWorkspaces: z.array(z.bigint()).optional(),
    unassignWorkspaces: z.array(z.bigint()).optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    assign_workspaces: d.assignWorkspaces,
    unassign_workspaces: d.unassignWorkspaces,
  }));

export const marshalUpdateWorkspaceBindingsRequestSchema: z.ZodType = z
  .object({
    securableType: z.string().optional(),
    securableFullName: z.string().optional(),
    add: z.array(z.lazy(() => marshalWorkspaceBindingInfoSchema)).optional(),
    remove: z.array(z.lazy(() => marshalWorkspaceBindingInfoSchema)).optional(),
  })
  .transform(d => ({
    securable_type: d.securableType,
    securable_full_name: d.securableFullName,
    add: d.add,
    remove: d.remove,
  }));

export const marshalWorkspaceBindingInfoSchema: z.ZodType = z
  .object({
    workspaceId: z.bigint().optional(),
    bindingType: z.enum(BindingType).optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    binding_type: d.bindingType,
  }));
