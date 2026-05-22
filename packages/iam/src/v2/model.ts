// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';


export enum Entitlement {
  ENTITLEMENT_UNSPECIFIED = 'ENTITLEMENT_UNSPECIFIED',
  WORKSPACE_ACCESS = 'WORKSPACE_ACCESS',
  WORKSPACE_CONSUME = 'WORKSPACE_CONSUME',
  DATABRICKS_SQL_ACCESS = 'DATABRICKS_SQL_ACCESS',
  WORKSPACE_ADMIN = 'WORKSPACE_ADMIN',
  ALLOW_CLUSTER_CREATE = 'ALLOW_CLUSTER_CREATE',
  ALLOW_INSTANCE_POOL_CREATE = 'ALLOW_INSTANCE_POOL_CREATE',
}

/** The type of the principal (user/sp/group). */
export enum PrincipalType {
  PRINCIPAL_TYPE_UNSPECIFIED = 'PRINCIPAL_TYPE_UNSPECIFIED',
  USER = 'USER',
  SERVICE_PRINCIPAL = 'SERVICE_PRINCIPAL',
  GROUP = 'GROUP',
}

/** The activity status of a user or service principal in a <Databricks> account or workspace. */
export enum State {
  /** Unknown status. */
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  /** The user/service principal is active in the <Databricks> account or workspace. */
  ACTIVE = 'ACTIVE',
  /** The user/service principal is inactive in the <Databricks> account/workspace and has restricted access to the account/workspace. */
  INACTIVE = 'INACTIVE',
}

/** Controls what fields are returned in the GetWorkspaceAccessDetail response. */
export enum WorkspaceAccessDetailView {
  WORKSPACE_ACCESS_DETAIL_VIEW_UNSPECIFIED = 'WORKSPACE_ACCESS_DETAIL_VIEW_UNSPECIFIED',
  BASIC = 'BASIC',
  FULL = 'FULL',
}

/** The type of permission a principal has to a workspace (admin/user). */
export enum WorkspacePermission {
  WORKSPACE_PERMISSION_UNSPECIFIED = 'WORKSPACE_PERMISSION_UNSPECIFIED',
  /** The most basic workspace permission. */
  USER_PERMISSION = 'USER_PERMISSION',
  ADMIN_PERMISSION = 'ADMIN_PERMISSION',
}

/** The type of access the principal has to the workspace. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum WorkspaceAccessDetail_AccessType {
  /** Unknown access to the workspace. */
  ACCESS_TYPE_UNSPECIFIED = 'ACCESS_TYPE_UNSPECIFIED',
  /** Direct access to the workspace, meaning the principal is provisioned and directly assigned to the workspace. */
  DIRECT = 'DIRECT',
  /** Indirect access to the workspace, meaning the principal is provisioned and assigned to a group that has access to the workspace. */
  INDIRECT = 'INDIRECT',
}

/** Assign an identity directly to a workspace with the specified permissions and workspace-level status. */
export interface CreateWorkspaceAssignmentDetailProxyRequest {
  /** Required. Workspace assignment detail to be created in <Databricks>. */
  workspaceAssignmentDetail?: WorkspaceAssignmentDetail | undefined;
}

/** Assign an identity directly to a workspace with the specified permissions and workspace-level status. */
export interface CreateWorkspaceAssignmentDetailRequest {
  /** Required. The account ID for which the workspace assignment detail is being created. */
  accountId?: string | undefined;
  /** Required. The workspace ID for which the workspace assignment detail is being created. */
  workspaceId?: number | undefined;
  /** Required. Workspace assignment detail to be created in <Databricks>. */
  workspaceAssignmentDetail?: WorkspaceAssignmentDetail | undefined;
}

/** Proxy request for deleting a workspace assignment detail for a principal. */
export interface DeleteWorkspaceAssignmentDetailProxyRequest {
  /** Required. ID of the principal in <Databricks> to delete workspace assignment for. */
  principalId?: number | undefined;
}

/** If the identity is directly assigned to the workspace, remove its assignment from the workspace */
export interface DeleteWorkspaceAssignmentDetailRequest {
  /** Required. The account ID for which the workspace assignment detail is being deleted. */
  accountId?: string | undefined;
  /** The workspace ID where the principal has access. */
  workspaceId?: number | undefined;
  /** Required. ID of the principal in <Databricks> to delete workspace assignment for. */
  principalId?: number | undefined;
}

/** Request message for getting the access details for a principal in the current workspace. */
export interface GetWorkspaceAccessDetailLocalRequest {
  /** Required. The internal ID of the principal (user/sp/group) for which the access details are being requested. */
  principalId?: number | undefined;
  /** Controls what fields are returned. */
  view?: WorkspaceAccessDetailView | undefined;
}

/** Request message for getting the access details for a principal in a workspace. */
export interface GetWorkspaceAccessDetailRequest {
  /** Required. The parent account ID for which the workspace access details are being requested. */
  accountId?: string | undefined;
  /** Required. The workspace ID for which the access details are being requested. */
  workspaceId?: number | undefined;
  /** Required. The internal ID of the principal (user/sp/group) for which the access details are being requested. */
  principalId?: number | undefined;
  /** Controls what fields are returned. */
  view?: WorkspaceAccessDetailView | undefined;
}

/** Proxy request for getting workspace assignment details for a principal in a workspace. */
export interface GetWorkspaceAssignmentDetailProxyRequest {
  /** Required. The internal ID of the principal (user/sp/group) for which the assignment details are being requested. */
  principalId?: number | undefined;
}

/** Get the workspace assignment details of a principal that is provisioned in the account and directly assigned to a workspace */
export interface GetWorkspaceAssignmentDetailRequest {
  /** Required. The parent account ID for which the workspace assignment details are being requested. */
  accountId?: string | undefined;
  /** Required. The workspace ID for which the assignment details are being requested. */
  workspaceId?: number | undefined;
  /** Required. The internal ID of the principal (user/sp/group) for which the assignment details are being requested. */
  principalId?: number | undefined;
}

/** The details of a Group resource. */
export interface Group {
  /** The parent account ID for group in <Databricks>. */
  accountId?: string | undefined;
  /** Internal group ID of the group in <Databricks>. */
  internalId?: number | undefined;
  /** ExternalId of the group in the customer's IdP. */
  externalId?: string | undefined;
  /** Display name of the group. */
  groupName?: string | undefined;
}

/** Proxy request for listing workspace assignment details for a workspace. */
export interface ListWorkspaceAssignmentDetailsProxyRequest {
  /** The maximum number of workspace assignment details to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListWorkspaceAssignmentDetailsProxy call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
}

/** Returns a paginated list of direct assignments to the workspace. */
export interface ListWorkspaceAssignmentDetailsRequest {
  /** Required. The account ID for which the workspace assignment details are being fetched. */
  accountId?: string | undefined;
  /** Required. The workspace ID for which the workspace assignment details are being fetched. */
  workspaceId?: number | undefined;
  /** The maximum number of workspace assignment details to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListWorkspaceAssignmentDetails call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
}

/** Response message for listing workspace assignment details. */
export interface ListWorkspaceAssignmentDetailsResponse {
  workspaceAssignmentDetails?: WorkspaceAssignmentDetail[] | undefined;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string | undefined;
}

/**
 * Request message for resolving a group with the given external ID from the customer's IdP into <Databricks>.
 * Will resolve metadata such as the group's groupname, and inherited parent groups.
 */
export interface ResolveGroupProxyRequest {
  /** Required. The external ID of the group in the customer's IdP. */
  externalId?: string | undefined;
}

/**
 * Request message for resolving a group with the given external ID from the customer's IdP into <Databricks>.
 * Will resolve metadata such as the group's groupname, and inherited parent groups.
 */
export interface ResolveGroupRequest {
  /** Required. The account ID for which the group is being resolved. */
  accountId?: string | undefined;
  /** Required. The external ID of the group in the customer's IdP. */
  externalId?: string | undefined;
}

export interface ResolveGroupResponse {
  /** The group that was resolved. */
  group?: Group | undefined;
}

/**
 * Request message for resolving a service principal with the given external ID from the customer's IdP into <Databricks>.
 * Will resolve metadata such as the service principal's displayname, status, and inherited parent groups.
 */
export interface ResolveServicePrincipalProxyRequest {
  /** Required. The external ID of the service principal in the customer's IdP. */
  externalId?: string | undefined;
}

/**
 * Request message for resolving a service principal with the given external ID from the customer's IdP into <Databricks>.
 * Will resolve metadata such as the service principal's displayname, status, and inherited parent groups.
 */
export interface ResolveServicePrincipalRequest {
  /** Required. The account ID for which the service principal is being resolved. */
  accountId?: string | undefined;
  /** Required. The external ID of the service principal in the customer's IdP. */
  externalId?: string | undefined;
}

export interface ResolveServicePrincipalResponse {
  /** The service principal that was resolved. */
  servicePrincipal?: ServicePrincipal | undefined;
}

/**
 * Request message for resolving a user with the given external ID from the customer's IdP into <Databricks>.
 * Will resolve metadata such as the user's displayname, status, and inherited parent groups.
 */
export interface ResolveUserProxyRequest {
  /** Required. The external ID of the user in the customer's IdP. */
  externalId?: string | undefined;
}

/**
 * Request message for resolving a user with the given external ID from the customer's IdP into <Databricks>.
 * Will resolve metadata such as the user's displayname, status, and inherited parent groups.
 */
export interface ResolveUserRequest {
  /** Required. The account ID for which the user is being resolved. */
  accountId?: string | undefined;
  /** Required. The external ID of the user in the customer's IdP. */
  externalId?: string | undefined;
}

export interface ResolveUserResponse {
  /** The user that was resolved. */
  user?: User | undefined;
}

/** The details of a ServicePrincipal resource. */
export interface ServicePrincipal {
  /** The parent account ID for the service principal in <Databricks>. */
  accountId?: string | undefined;
  /** Internal service principal ID of the service principal in <Databricks>. */
  internalId?: number | undefined;
  /** ExternalId of the service principal in the customer's IdP. */
  externalId?: string | undefined;
  /** Application ID of the service principal. */
  applicationId?: string | undefined;
  /** Display name of the service principal. */
  displayName?: string | undefined;
  /** The activity status of a service principal in a <Databricks> account. */
  accountSpStatus?: State | undefined;
}

/** Proxy request for updating a workspace assignment detail for a principal. */
export interface UpdateWorkspaceAssignmentDetailProxyRequest {
  /** Required. ID of the principal in <Databricks>. */
  principalId?: number | undefined;
  /** Required. Workspace assignment detail to be updated in <Databricks>. */
  workspaceAssignmentDetail?: WorkspaceAssignmentDetail | undefined;
  /** Required. The list of fields to update. */
  updateMask?: FieldMask<WorkspaceAssignmentDetail> | undefined;
}

/** TBD since the only updatable field is permissions */
export interface UpdateWorkspaceAssignmentDetailRequest {
  /** Required. The account ID for which the workspace assignment detail is being updated. */
  accountId?: string | undefined;
  /** Required. The workspace ID for which the workspace assignment detail is being updated. */
  workspaceId?: number | undefined;
  /** Required. ID of the principal in <Databricks>. */
  principalId?: number | undefined;
  /** Required. Workspace assignment detail to be updated in <Databricks>. */
  workspaceAssignmentDetail?: WorkspaceAssignmentDetail | undefined;
  /** Required. The list of fields to update. */
  updateMask?: FieldMask<WorkspaceAssignmentDetail> | undefined;
}

/** The details of a User resource. */
export interface User {
  /** The accountId parent of the user in <Databricks>. */
  accountId?: string | undefined;
  /** Internal userId of the user in <Databricks>. */
  internalId?: number | undefined;
  /** ExternalId of the user in the customer's IdP. */
  externalId?: string | undefined;
  /** Username/email of the user. */
  username?: string | undefined;
  name?: User_Name | undefined;
  /** The activity status of a user in a <Databricks> account. */
  accountUserStatus?: State | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface User_Name {
  givenName?: string | undefined;
  familyName?: string | undefined;
}

/** The details of a principal's access to a workspace. */
export interface WorkspaceAccessDetail {
  /** The internal ID of the principal (user/sp/group) in <Databricks>. */
  principalId?: number | undefined;
  /** The workspace ID where the principal has access. */
  workspaceId?: number | undefined;
  /** The account ID parent of the workspace where the principal has access. */
  accountId?: string | undefined;
  principalType?: PrincipalType | undefined;
  accessType?: WorkspaceAccessDetail_AccessType | undefined;
  /** The activity status of the principal in the workspace. Not applicable for groups at the moment. */
  status?: State | undefined;
  /** The permissions granted to the principal in the workspace. */
  permissions?: WorkspacePermission[] | undefined;
}

/** The details of a principal's assignment to a workspace. */
export interface WorkspaceAssignmentDetail {
  /** The internal ID of the principal (user/sp/group) in <Databricks>. */
  principalId?: number | undefined;
  /** The workspace ID where the principal is assigned */
  workspaceId?: number | undefined;
  /** The account ID parent of the workspace where the principal is assigned */
  accountId?: string | undefined;
  principalType?: PrincipalType | undefined;
  entitlements?: Entitlement[] | undefined;
}

export const unmarshalGroupSchema: z.ZodType<Group> = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
    external_id: z.string().optional(),
    group_name: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
    externalId: d.external_id,
    groupName: d.group_name,
  }));

export const unmarshalListWorkspaceAssignmentDetailsResponseSchema: z.ZodType<ListWorkspaceAssignmentDetailsResponse> = z
  .object({
    workspace_assignment_details: z.array(z.lazy(() => unmarshalWorkspaceAssignmentDetailSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    workspaceAssignmentDetails: d.workspace_assignment_details,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalResolveGroupResponseSchema: z.ZodType<ResolveGroupResponse> = z
  .object({
    group: z.lazy(() => unmarshalGroupSchema).optional(),
  })
  .transform(d => ({
    group: d.group,
  }));

export const unmarshalResolveServicePrincipalResponseSchema: z.ZodType<ResolveServicePrincipalResponse> = z
  .object({
    service_principal: z.lazy(() => unmarshalServicePrincipalSchema).optional(),
  })
  .transform(d => ({
    servicePrincipal: d.service_principal,
  }));

export const unmarshalResolveUserResponseSchema: z.ZodType<ResolveUserResponse> = z
  .object({
    user: z.lazy(() => unmarshalUserSchema).optional(),
  })
  .transform(d => ({
    user: d.user,
  }));

export const unmarshalServicePrincipalSchema: z.ZodType<ServicePrincipal> = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
    external_id: z.string().optional(),
    application_id: z.string().optional(),
    display_name: z.string().optional(),
    account_sp_status: z.enum(State).optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
    externalId: d.external_id,
    applicationId: d.application_id,
    displayName: d.display_name,
    accountSpStatus: d.account_sp_status,
  }));

export const unmarshalUserSchema: z.ZodType<User> = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
    external_id: z.string().optional(),
    username: z.string().optional(),
    name: z.lazy(() => unmarshalUser_NameSchema).optional(),
    account_user_status: z.enum(State).optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
    externalId: d.external_id,
    username: d.username,
    name: d.name,
    accountUserStatus: d.account_user_status,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUser_NameSchema: z.ZodType<User_Name> = z
  .object({
    given_name: z.string().optional(),
    family_name: z.string().optional(),
  })
  .transform(d => ({
    givenName: d.given_name,
    familyName: d.family_name,
  }));

export const unmarshalWorkspaceAccessDetailSchema: z.ZodType<WorkspaceAccessDetail> = z
  .object({
    principal_id: z.number().optional(),
    workspace_id: z.number().optional(),
    account_id: z.string().optional(),
    principal_type: z.enum(PrincipalType).optional(),
    access_type: z.enum(WorkspaceAccessDetail_AccessType).optional(),
    status: z.enum(State).optional(),
    permissions: z.array(z.enum(WorkspacePermission)).optional(),
  })
  .transform(d => ({
    principalId: d.principal_id,
    workspaceId: d.workspace_id,
    accountId: d.account_id,
    principalType: d.principal_type,
    accessType: d.access_type,
    status: d.status,
    permissions: d.permissions,
  }));

export const unmarshalWorkspaceAssignmentDetailSchema: z.ZodType<WorkspaceAssignmentDetail> = z
  .object({
    principal_id: z.number().optional(),
    workspace_id: z.number().optional(),
    account_id: z.string().optional(),
    principal_type: z.enum(PrincipalType).optional(),
    entitlements: z.array(z.enum(Entitlement)).optional(),
  })
  .transform(d => ({
    principalId: d.principal_id,
    workspaceId: d.workspace_id,
    accountId: d.account_id,
    principalType: d.principal_type,
    entitlements: d.entitlements,
  }));

export const marshalResolveGroupProxyRequestSchema: z.ZodType = z
  .object({
    externalId: z.string().optional(),
  })
  .transform(d => ({
    external_id: d.externalId,
  }));

export const marshalResolveGroupRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    external_id: d.externalId,
  }));

export const marshalResolveServicePrincipalProxyRequestSchema: z.ZodType = z
  .object({
    externalId: z.string().optional(),
  })
  .transform(d => ({
    external_id: d.externalId,
  }));

export const marshalResolveServicePrincipalRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    external_id: d.externalId,
  }));

export const marshalResolveUserProxyRequestSchema: z.ZodType = z
  .object({
    externalId: z.string().optional(),
  })
  .transform(d => ({
    external_id: d.externalId,
  }));

export const marshalResolveUserRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    external_id: d.externalId,
  }));

export const marshalWorkspaceAssignmentDetailSchema: z.ZodType = z
  .object({
    principalId: z.number().optional(),
    workspaceId: z.number().optional(),
    accountId: z.string().optional(),
    principalType: z.enum(PrincipalType).optional(),
    entitlements: z.array(z.enum(Entitlement)).optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
    workspace_id: d.workspaceId,
    account_id: d.accountId,
    principal_type: d.principalType,
    entitlements: d.entitlements,
  }));

const workspaceAssignmentDetailFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  entitlements: {wire: 'entitlements'},
  principalId: {wire: 'principal_id'},
  principalType: {wire: 'principal_type'},
  workspaceId: {wire: 'workspace_id'},
};

export function workspaceAssignmentDetailFieldMask(...paths: string[]): FieldMask<WorkspaceAssignmentDetail> {
  return FieldMask.build<WorkspaceAssignmentDetail>(paths, workspaceAssignmentDetailFieldMaskSchema);
}
