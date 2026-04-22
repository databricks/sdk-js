// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export enum Permission {
  UNKNOWN = 'UNKNOWN',
  /** The most basic workspace permission */
  USER = 'USER',
  ADMIN = 'ADMIN',
}

/** Removes all permission assignments for a workspace given a principal. */
export interface DeleteWorkspacePermissionAssignment {
  /** The account ID. */
  accountId?: string | undefined;
  /** The workspace ID for the account. */
  workspaceId?: number | undefined;
  /** The ID of the user, service principal, or group. */
  principalId?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteWorkspacePermissionAssignment_Response {}

/** Gets all the permission assignments for a workspace, given an account and a workspace. */
export interface GetWorkspacePermissionAssignments {
  /** The account ID. */
  accountId?: string | undefined;
  /** The workspace ID for the account. */
  workspaceId?: number | undefined;
  /** Page token returned by previous call to retrieve the next page of results. */
  pageToken?: string | undefined;
  /** Maximum number of permission assignments to return. */
  maxResults?: number | undefined;
  /** Filter string to search principals. */
  filter?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetWorkspacePermissionAssignments_Response {
  /** Array of permissions assignments defined for a workspace. */
  permissionAssignments?: WorkspacePermissionAssignmentOutput[] | undefined;
  /** Token to retrieve the next page of results. */
  nextPageToken?: string | undefined;
  /** Token to retrieve the previous page of results. */
  prevPageToken?: string | undefined;
}

/** List permissions for a workspace, given an account and a workspace. */
export interface ListWorkspacePermissions {
  /** The account ID. */
  accountId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListWorkspacePermissions_Response {
  /** Array of permissions defined for a workspace. */
  permissions?: PermissionOutput[] | undefined;
}

export interface PermissionOutput {
  permissionLevel?: Permission | undefined;
  /** The results of a permissions query. */
  description?: string | undefined;
}

/** Information about the principal assigned to the workspace. */
export interface PrincipalOutput {
  /** The username of the user. Present only if the principal is a user. */
  userName?: string | undefined;
  /** The group name of the group. Present only if the principal is a group. */
  groupName?: string | undefined;
  /** The name of the service principal. Present only if the principal is a service principal. */
  servicePrincipalName?: string | undefined;
  /** The unique, opaque id of the principal. */
  principalId?: number | undefined;
  /** The display name of the principal. */
  displayName?: string | undefined;
}

export interface UpdateWorkspacePermissionAssignment {
  /** The account ID. */
  accountId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: number | undefined;
  /** The ID of the user, service principal, or group. */
  principalId?: number | undefined;
  /**
   * Array of permissions assignments to update on the workspace.
   * Valid values are "USER" and "ADMIN" (case-sensitive).
   * If both "USER" and "ADMIN" are provided, "ADMIN" takes precedence.
   * Other values will be ignored.
   * Note that excluding this field, or providing unsupported values, will have the same effect as providing an empty list, which will result in the deletion of all permissions for the principal.
   */
  permissions?: Permission[] | undefined;
}

/**
 * The output format for existing workspace PermissionAssignment records, which contains some info for
 * user consumption.
 */
export interface WorkspacePermissionAssignmentOutput {
  /** Information about the principal assigned to the workspace. */
  principal?: PrincipalOutput | undefined;
  /** The permissions level of the principal. */
  permissions?: Permission[] | undefined;
  /** Error response associated with a workspace permission assignment, if any. */
  error?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteWorkspacePermissionAssignment_ResponseSchema: z.ZodType<DeleteWorkspacePermissionAssignment_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetWorkspacePermissionAssignments_ResponseSchema: z.ZodType<GetWorkspacePermissionAssignments_Response> =
  z
    .object({
      permission_assignments: z
        .array(z.lazy(() => unmarshalWorkspacePermissionAssignmentOutputSchema))
        .optional(),
      next_page_token: z.string().optional(),
      prev_page_token: z.string().optional(),
    })
    .transform(d => ({
      permissionAssignments: d.permission_assignments,
      nextPageToken: d.next_page_token,
      prevPageToken: d.prev_page_token,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListWorkspacePermissions_ResponseSchema: z.ZodType<ListWorkspacePermissions_Response> =
  z
    .object({
      permissions: z
        .array(z.lazy(() => unmarshalPermissionOutputSchema))
        .optional(),
    })
    .transform(d => ({
      permissions: d.permissions,
    }));

export const unmarshalPermissionOutputSchema: z.ZodType<PermissionOutput> = z
  .object({
    permission_level: z.enum(Permission).optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    permissionLevel: d.permission_level,
    description: d.description,
  }));

export const unmarshalPrincipalOutputSchema: z.ZodType<PrincipalOutput> = z
  .object({
    user_name: z.string().optional(),
    group_name: z.string().optional(),
    service_principal_name: z.string().optional(),
    principal_id: z.number().optional(),
    display_name: z.string().optional(),
  })
  .transform(d => ({
    userName: d.user_name,
    groupName: d.group_name,
    servicePrincipalName: d.service_principal_name,
    principalId: d.principal_id,
    displayName: d.display_name,
  }));

export const unmarshalUpdateWorkspacePermissionAssignmentSchema: z.ZodType<UpdateWorkspacePermissionAssignment> =
  z
    .object({
      account_id: z.string().optional(),
      workspace_id: z.number().optional(),
      principal_id: z.number().optional(),
      permissions: z.array(z.enum(Permission)).optional(),
    })
    .transform(d => ({
      accountId: d.account_id,
      workspaceId: d.workspace_id,
      principalId: d.principal_id,
      permissions: d.permissions,
    }));

export const unmarshalWorkspacePermissionAssignmentOutputSchema: z.ZodType<WorkspacePermissionAssignmentOutput> =
  z
    .object({
      principal: z.lazy(() => unmarshalPrincipalOutputSchema).optional(),
      permissions: z.array(z.enum(Permission)).optional(),
      error: z.string().optional(),
    })
    .transform(d => ({
      principal: d.principal,
      permissions: d.permissions,
      error: d.error,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteWorkspacePermissionAssignment_ResponseSchema: z.ZodType =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetWorkspacePermissionAssignments_ResponseSchema: z.ZodType =
  z
    .object({
      permissionAssignments: z
        .array(z.lazy(() => marshalWorkspacePermissionAssignmentOutputSchema))
        .optional(),
      nextPageToken: z.string().optional(),
      prevPageToken: z.string().optional(),
    })
    .transform(d => ({
      permission_assignments: d.permissionAssignments,
      next_page_token: d.nextPageToken,
      prev_page_token: d.prevPageToken,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListWorkspacePermissions_ResponseSchema: z.ZodType = z
  .object({
    permissions: z
      .array(z.lazy(() => marshalPermissionOutputSchema))
      .optional(),
  })
  .transform(d => ({
    permissions: d.permissions,
  }));

export const marshalPermissionOutputSchema: z.ZodType = z
  .object({
    permissionLevel: z.enum(Permission).optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    permission_level: d.permissionLevel,
    description: d.description,
  }));

export const marshalPrincipalOutputSchema: z.ZodType = z
  .object({
    userName: z.string().optional(),
    groupName: z.string().optional(),
    servicePrincipalName: z.string().optional(),
    principalId: z.number().optional(),
    displayName: z.string().optional(),
  })
  .transform(d => ({
    user_name: d.userName,
    group_name: d.groupName,
    service_principal_name: d.servicePrincipalName,
    principal_id: d.principalId,
    display_name: d.displayName,
  }));

export const marshalUpdateWorkspacePermissionAssignmentSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    workspaceId: z.number().optional(),
    principalId: z.number().optional(),
    permissions: z.array(z.enum(Permission)).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    workspace_id: d.workspaceId,
    principal_id: d.principalId,
    permissions: d.permissions,
  }));

export const marshalWorkspacePermissionAssignmentOutputSchema: z.ZodType = z
  .object({
    principal: z.lazy(() => marshalPrincipalOutputSchema).optional(),
    permissions: z.array(z.enum(Permission)).optional(),
    error: z.string().optional(),
  })
  .transform(d => ({
    principal: d.principal,
    permissions: d.permissions,
    error: d.error,
  }));

const deleteWorkspacePermissionAssignmentFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  principalId: {wire: 'principal_id'},
  workspaceId: {wire: 'workspace_id'},
};

export function deleteWorkspacePermissionAssignmentFieldMask(
  ...paths: string[]
): FieldMask<DeleteWorkspacePermissionAssignment> {
  return FieldMask.build<DeleteWorkspacePermissionAssignment>(
    paths,
    deleteWorkspacePermissionAssignmentFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const deleteWorkspacePermissionAssignment_ResponseFieldMaskSchema: FieldMaskSchema =
  {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function deleteWorkspacePermissionAssignment_ResponseFieldMask(
  ...paths: string[]
): FieldMask<DeleteWorkspacePermissionAssignment_Response> {
  return FieldMask.build<DeleteWorkspacePermissionAssignment_Response>(
    paths,
    deleteWorkspacePermissionAssignment_ResponseFieldMaskSchema
  );
}

const getWorkspacePermissionAssignmentsFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  filter: {wire: 'filter'},
  maxResults: {wire: 'max_results'},
  pageToken: {wire: 'page_token'},
  workspaceId: {wire: 'workspace_id'},
};

export function getWorkspacePermissionAssignmentsFieldMask(
  ...paths: string[]
): FieldMask<GetWorkspacePermissionAssignments> {
  return FieldMask.build<GetWorkspacePermissionAssignments>(
    paths,
    getWorkspacePermissionAssignmentsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const getWorkspacePermissionAssignments_ResponseFieldMaskSchema: FieldMaskSchema =
  {
    nextPageToken: {wire: 'next_page_token'},
    permissionAssignments: {wire: 'permission_assignments'},
    prevPageToken: {wire: 'prev_page_token'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function getWorkspacePermissionAssignments_ResponseFieldMask(
  ...paths: string[]
): FieldMask<GetWorkspacePermissionAssignments_Response> {
  return FieldMask.build<GetWorkspacePermissionAssignments_Response>(
    paths,
    getWorkspacePermissionAssignments_ResponseFieldMaskSchema
  );
}

const listWorkspacePermissionsFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  workspaceId: {wire: 'workspace_id'},
};

export function listWorkspacePermissionsFieldMask(
  ...paths: string[]
): FieldMask<ListWorkspacePermissions> {
  return FieldMask.build<ListWorkspacePermissions>(
    paths,
    listWorkspacePermissionsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const listWorkspacePermissions_ResponseFieldMaskSchema: FieldMaskSchema = {
  permissions: {wire: 'permissions'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function listWorkspacePermissions_ResponseFieldMask(
  ...paths: string[]
): FieldMask<ListWorkspacePermissions_Response> {
  return FieldMask.build<ListWorkspacePermissions_Response>(
    paths,
    listWorkspacePermissions_ResponseFieldMaskSchema
  );
}

const permissionOutputFieldMaskSchema: FieldMaskSchema = {
  description: {wire: 'description'},
  permissionLevel: {wire: 'permission_level'},
};

export function permissionOutputFieldMask(
  ...paths: string[]
): FieldMask<PermissionOutput> {
  return FieldMask.build<PermissionOutput>(
    paths,
    permissionOutputFieldMaskSchema
  );
}

const principalOutputFieldMaskSchema: FieldMaskSchema = {
  displayName: {wire: 'display_name'},
  groupName: {wire: 'group_name'},
  principalId: {wire: 'principal_id'},
  servicePrincipalName: {wire: 'service_principal_name'},
  userName: {wire: 'user_name'},
};

export function principalOutputFieldMask(
  ...paths: string[]
): FieldMask<PrincipalOutput> {
  return FieldMask.build<PrincipalOutput>(
    paths,
    principalOutputFieldMaskSchema
  );
}

const updateWorkspacePermissionAssignmentFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  permissions: {wire: 'permissions'},
  principalId: {wire: 'principal_id'},
  workspaceId: {wire: 'workspace_id'},
};

export function updateWorkspacePermissionAssignmentFieldMask(
  ...paths: string[]
): FieldMask<UpdateWorkspacePermissionAssignment> {
  return FieldMask.build<UpdateWorkspacePermissionAssignment>(
    paths,
    updateWorkspacePermissionAssignmentFieldMaskSchema
  );
}

const workspacePermissionAssignmentOutputFieldMaskSchema: FieldMaskSchema = {
  error: {wire: 'error'},
  permissions: {wire: 'permissions'},
  principal: {
    wire: 'principal',
    children: () => principalOutputFieldMaskSchema,
  },
};

export function workspacePermissionAssignmentOutputFieldMask(
  ...paths: string[]
): FieldMask<WorkspacePermissionAssignmentOutput> {
  return FieldMask.build<WorkspacePermissionAssignmentOutput>(
    paths,
    workspacePermissionAssignmentOutputFieldMaskSchema
  );
}
