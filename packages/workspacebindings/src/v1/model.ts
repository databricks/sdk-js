// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Using `BINDING_TYPE_` prefix here to avoid conflict with `TableOperation` enum in `credentials_common.proto`. */
export enum BindingType {
  BINDING_TYPE_UNSPECIFIED = 'BINDING_TYPE_UNSPECIFIED',
  BINDING_TYPE_READ_WRITE = 'BINDING_TYPE_READ_WRITE',
  BINDING_TYPE_READ_ONLY = 'BINDING_TYPE_READ_ONLY',
}

export interface GetCatalogWorkspaceBindings {
  /** The name of the catalog. */
  catalogName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetCatalogWorkspaceBindings_Response {
  /** A list of workspace IDs */
  workspaces?: number[] | undefined;
}

export interface GetWorkspaceBindings {
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
export interface GetWorkspaceBindings_Response {
  /** List of workspace bindings */
  bindings?: WorkspaceBindingInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface UpdateCatalogWorkspaceBindings {
  /** The name of the catalog. */
  catalogName?: string | undefined;
  /** A list of workspace IDs. */
  assignWorkspaces?: number[] | undefined;
  /** A list of workspace IDs. */
  unassignWorkspaces?: number[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateCatalogWorkspaceBindings_Response {
  /** A list of workspace IDs */
  workspaces?: number[] | undefined;
}

export interface UpdateWorkspaceBindings {
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
export interface UpdateWorkspaceBindings_Response {
  /** List of workspace bindings. */
  bindings?: WorkspaceBindingInfo[] | undefined;
}

export interface WorkspaceBindingInfo {
  /** Required */
  workspaceId?: number | undefined;
  /** One of READ_WRITE/READ_ONLY. Default is READ_WRITE. */
  bindingType?: BindingType | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetCatalogWorkspaceBindings_ResponseSchema: z.ZodType<GetCatalogWorkspaceBindings_Response> =
  z
    .object({
      workspaces: z.array(z.number()).optional(),
    })
    .transform(d => ({
      workspaces: d.workspaces,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetWorkspaceBindings_ResponseSchema: z.ZodType<GetWorkspaceBindings_Response> =
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

export const unmarshalUpdateCatalogWorkspaceBindingsSchema: z.ZodType<UpdateCatalogWorkspaceBindings> =
  z
    .object({
      catalog_name: z.string().optional(),
      assign_workspaces: z.array(z.number()).optional(),
      unassign_workspaces: z.array(z.number()).optional(),
    })
    .transform(d => ({
      catalogName: d.catalog_name,
      assignWorkspaces: d.assign_workspaces,
      unassignWorkspaces: d.unassign_workspaces,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateCatalogWorkspaceBindings_ResponseSchema: z.ZodType<UpdateCatalogWorkspaceBindings_Response> =
  z
    .object({
      workspaces: z.array(z.number()).optional(),
    })
    .transform(d => ({
      workspaces: d.workspaces,
    }));

export const unmarshalUpdateWorkspaceBindingsSchema: z.ZodType<UpdateWorkspaceBindings> =
  z
    .object({
      securable_type: z.string().optional(),
      securable_full_name: z.string().optional(),
      add: z
        .array(z.lazy(() => unmarshalWorkspaceBindingInfoSchema))
        .optional(),
      remove: z
        .array(z.lazy(() => unmarshalWorkspaceBindingInfoSchema))
        .optional(),
    })
    .transform(d => ({
      securableType: d.securable_type,
      securableFullName: d.securable_full_name,
      add: d.add,
      remove: d.remove,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateWorkspaceBindings_ResponseSchema: z.ZodType<UpdateWorkspaceBindings_Response> =
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
      workspace_id: z.number().optional(),
      binding_type: z.enum(BindingType).optional(),
    })
    .transform(d => ({
      workspaceId: d.workspace_id,
      bindingType: d.binding_type,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetCatalogWorkspaceBindings_ResponseSchema: z.ZodType = z
  .object({
    workspaces: z.array(z.number()).optional(),
  })
  .transform(d => ({
    workspaces: d.workspaces,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetWorkspaceBindings_ResponseSchema: z.ZodType = z
  .object({
    bindings: z
      .array(z.lazy(() => marshalWorkspaceBindingInfoSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    bindings: d.bindings,
    next_page_token: d.nextPageToken,
  }));

export const marshalUpdateCatalogWorkspaceBindingsSchema: z.ZodType = z
  .object({
    catalogName: z.string().optional(),
    assignWorkspaces: z.array(z.number()).optional(),
    unassignWorkspaces: z.array(z.number()).optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    assign_workspaces: d.assignWorkspaces,
    unassign_workspaces: d.unassignWorkspaces,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateCatalogWorkspaceBindings_ResponseSchema: z.ZodType = z
  .object({
    workspaces: z.array(z.number()).optional(),
  })
  .transform(d => ({
    workspaces: d.workspaces,
  }));

export const marshalUpdateWorkspaceBindingsSchema: z.ZodType = z
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateWorkspaceBindings_ResponseSchema: z.ZodType = z
  .object({
    bindings: z
      .array(z.lazy(() => marshalWorkspaceBindingInfoSchema))
      .optional(),
  })
  .transform(d => ({
    bindings: d.bindings,
  }));

export const marshalWorkspaceBindingInfoSchema: z.ZodType = z
  .object({
    workspaceId: z.number().optional(),
    bindingType: z.enum(BindingType).optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    binding_type: d.bindingType,
  }));

const getCatalogWorkspaceBindingsFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
};

export function getCatalogWorkspaceBindingsFieldMask(
  ...paths: string[]
): FieldMask<GetCatalogWorkspaceBindings> {
  return FieldMask.build<GetCatalogWorkspaceBindings>(
    paths,
    getCatalogWorkspaceBindingsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const getCatalogWorkspaceBindings_ResponseFieldMaskSchema: FieldMaskSchema = {
  workspaces: {wire: 'workspaces'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function getCatalogWorkspaceBindings_ResponseFieldMask(
  ...paths: string[]
): FieldMask<GetCatalogWorkspaceBindings_Response> {
  return FieldMask.build<GetCatalogWorkspaceBindings_Response>(
    paths,
    getCatalogWorkspaceBindings_ResponseFieldMaskSchema
  );
}

const getWorkspaceBindingsFieldMaskSchema: FieldMaskSchema = {
  maxResults: {wire: 'max_results'},
  pageToken: {wire: 'page_token'},
  securableFullName: {wire: 'securable_full_name'},
  securableType: {wire: 'securable_type'},
};

export function getWorkspaceBindingsFieldMask(
  ...paths: string[]
): FieldMask<GetWorkspaceBindings> {
  return FieldMask.build<GetWorkspaceBindings>(
    paths,
    getWorkspaceBindingsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const getWorkspaceBindings_ResponseFieldMaskSchema: FieldMaskSchema = {
  bindings: {wire: 'bindings'},
  nextPageToken: {wire: 'next_page_token'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function getWorkspaceBindings_ResponseFieldMask(
  ...paths: string[]
): FieldMask<GetWorkspaceBindings_Response> {
  return FieldMask.build<GetWorkspaceBindings_Response>(
    paths,
    getWorkspaceBindings_ResponseFieldMaskSchema
  );
}

const updateCatalogWorkspaceBindingsFieldMaskSchema: FieldMaskSchema = {
  assignWorkspaces: {wire: 'assign_workspaces'},
  catalogName: {wire: 'catalog_name'},
  unassignWorkspaces: {wire: 'unassign_workspaces'},
};

export function updateCatalogWorkspaceBindingsFieldMask(
  ...paths: string[]
): FieldMask<UpdateCatalogWorkspaceBindings> {
  return FieldMask.build<UpdateCatalogWorkspaceBindings>(
    paths,
    updateCatalogWorkspaceBindingsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const updateCatalogWorkspaceBindings_ResponseFieldMaskSchema: FieldMaskSchema =
  {
    workspaces: {wire: 'workspaces'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function updateCatalogWorkspaceBindings_ResponseFieldMask(
  ...paths: string[]
): FieldMask<UpdateCatalogWorkspaceBindings_Response> {
  return FieldMask.build<UpdateCatalogWorkspaceBindings_Response>(
    paths,
    updateCatalogWorkspaceBindings_ResponseFieldMaskSchema
  );
}

const updateWorkspaceBindingsFieldMaskSchema: FieldMaskSchema = {
  add: {wire: 'add'},
  remove: {wire: 'remove'},
  securableFullName: {wire: 'securable_full_name'},
  securableType: {wire: 'securable_type'},
};

export function updateWorkspaceBindingsFieldMask(
  ...paths: string[]
): FieldMask<UpdateWorkspaceBindings> {
  return FieldMask.build<UpdateWorkspaceBindings>(
    paths,
    updateWorkspaceBindingsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const updateWorkspaceBindings_ResponseFieldMaskSchema: FieldMaskSchema = {
  bindings: {wire: 'bindings'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function updateWorkspaceBindings_ResponseFieldMask(
  ...paths: string[]
): FieldMask<UpdateWorkspaceBindings_Response> {
  return FieldMask.build<UpdateWorkspaceBindings_Response>(
    paths,
    updateWorkspaceBindings_ResponseFieldMaskSchema
  );
}

const workspaceBindingInfoFieldMaskSchema: FieldMaskSchema = {
  bindingType: {wire: 'binding_type'},
  workspaceId: {wire: 'workspace_id'},
};

export function workspaceBindingInfoFieldMask(
  ...paths: string[]
): FieldMask<WorkspaceBindingInfo> {
  return FieldMask.build<WorkspaceBindingInfo>(
    paths,
    workspaceBindingInfoFieldMaskSchema
  );
}
