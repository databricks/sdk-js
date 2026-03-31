// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface MigratePermissionsRequest {
  /** WorkspaceId of the associated workspace where the permission migration will occur. */
  workspaceId?: number | undefined;
  /** The name of the workspace group that permissions will be migrated from. */
  fromWorkspaceGroupName?: string | undefined;
  /** The name of the account group that permissions will be migrated to. */
  toAccountGroupName?: string | undefined;
  /** The maximum number of permissions that will be migrated. */
  size?: number | undefined;
}

export interface MigratePermissionsResponse {
  /** Number of permissions migrated. */
  permissionsMigrated?: number | undefined;
}

export const unmarshalMigratePermissionsRequestSchema: z.ZodType<MigratePermissionsRequest> =
  z
    .object({
      workspace_id: z.number().optional(),
      from_workspace_group_name: z.string().optional(),
      to_account_group_name: z.string().optional(),
      size: z.number().optional(),
    })
    .transform(d => ({
      workspaceId: d.workspace_id,
      fromWorkspaceGroupName: d.from_workspace_group_name,
      toAccountGroupName: d.to_account_group_name,
      size: d.size,
    }));

export const unmarshalMigratePermissionsResponseSchema: z.ZodType<MigratePermissionsResponse> =
  z
    .object({
      permissions_migrated: z.number().optional(),
    })
    .transform(d => ({
      permissionsMigrated: d.permissions_migrated,
    }));

export const marshalMigratePermissionsRequestSchema = z
  .object({
    workspaceId: z.number().optional(),
    fromWorkspaceGroupName: z.string().optional(),
    toAccountGroupName: z.string().optional(),
    size: z.number().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    from_workspace_group_name: d.fromWorkspaceGroupName,
    to_account_group_name: d.toAccountGroupName,
    size: d.size,
  }));

export const marshalMigratePermissionsResponseSchema = z
  .object({
    permissionsMigrated: z.number().optional(),
  })
  .transform(d => ({
    permissions_migrated: d.permissionsMigrated,
  }));
