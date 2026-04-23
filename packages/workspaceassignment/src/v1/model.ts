// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

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
