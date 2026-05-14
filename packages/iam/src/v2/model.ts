// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** The action type for an account access identity rule (currently DENY only). */
export enum AccountAccessRuleAction {
  ACCOUNT_ACCESS_RULE_ACTION_UNSPECIFIED = 'ACCOUNT_ACCESS_RULE_ACTION_UNSPECIFIED',
  DENY = 'DENY',
}

export enum Entitlement {
  ENTITLEMENT_UNSPECIFIED = 'ENTITLEMENT_UNSPECIFIED',
  WORKSPACE_ACCESS = 'WORKSPACE_ACCESS',
  WORKSPACE_CONSUME = 'WORKSPACE_CONSUME',
  DATABRICKS_SQL_ACCESS = 'DATABRICKS_SQL_ACCESS',
  WORKSPACE_ADMIN = 'WORKSPACE_ADMIN',
  ALLOW_CLUSTER_CREATE = 'ALLOW_CLUSTER_CREATE',
  ALLOW_INSTANCE_POOL_CREATE = 'ALLOW_INSTANCE_POOL_CREATE',
}

/** The source of the group membership (internal or from identity provider). */
export enum GroupMembershipSource {
  GROUP_MEMBERSHIP_SOURCE_UNSPECIFIED = 'GROUP_MEMBERSHIP_SOURCE_UNSPECIFIED',
  /** Internally created group membership from API/UI. */
  INTERNAL = 'INTERNAL',
  /** Externally managed group membership from customer's identity provider. */
  IDENTITY_PROVIDER = 'IDENTITY_PROVIDER',
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

/** The type of assignment the principal has to the workspace. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum WorkspaceIdentityDetail_AssignmentType {
  /** Unknown assignment to the workspace. */
  ASSIGNMENT_TYPE_UNSPECIFIED = 'ASSIGNMENT_TYPE_UNSPECIFIED',
  /** Direct assignment to the workspace, meaning the principal is provisioned and directly assigned to the workspace. */
  DIRECT = 'DIRECT',
  /** Indirect assignment to the workspace, meaning the principal is provisioned and assigned to a group that has access to the workspace. */
  INDIRECT = 'INDIRECT',
}

/** An identity rule that controls which principals can access an account. */
export interface AccountAccessIdentityRule {
  /** Currently, only DENY action is supported. */
  action?: AccountAccessRuleAction | undefined;
  /** External ID of the principal in the customer's IdP. */
  externalPrincipalId?: string | undefined;
  /** Display name of the principal. */
  displayName?: string | undefined;
  /**
   * The type of the principal (user/service principal/group).
   * This field is populated by the server based on the external_principal_id.
   */
  principalType?: PrincipalType | undefined;
  /**
   * Fully qualified name for the rule.
   * Format: accounts/{account_id}/account-access-identity-rules/{external_principal_id}
   */
  name?: string | undefined;
}

/** Request message for creating an account access identity rule. */
export interface CreateAccountAccessIdentityRuleRequest {
  /**
   * Required. The account under which to create the rule.
   * Format: accounts/{account_id}
   */
  parent?: string | undefined;
  /** Required. The external ID of the principal in the customer's IdP. */
  externalPrincipalId?: string | undefined;
  /** Required. The rule to create. */
  accountAccessIdentityRule?: AccountAccessIdentityRule | undefined;
}

/** Request message for creating a group membership (assigning a principal to a group). */
export interface CreateDirectGroupMemberProxyRequest {
  /** Required. Internal ID of the group in <Databricks>. */
  groupId?: number | undefined;
  /** Required. The group membership to create. */
  directGroupMember?: DirectGroupMember | undefined;
}

/** Request message for creating a group membership (assigning a principal to a group). */
export interface CreateDirectGroupMemberRequest {
  /** Required. The account ID for which the group membership is being created. */
  accountId?: string | undefined;
  /** Required. Internal ID of the group in <Databricks>. */
  groupId?: number | undefined;
  /** Required. The direct group member to be added to the group. */
  directGroupMember?: DirectGroupMember | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface CreateGroupProxyRequest {
  /** Required. Group to be created in <Databricks> */
  group?: Group | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface CreateGroupRequest {
  /** Required. The account ID for which the group is being created. */
  accountId?: string | undefined;
  /** Required. Group to be created in <Databricks> */
  group?: Group | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface CreateServicePrincipalProxyRequest {
  /** Required. Service principal to be created in <Databricks> */
  servicePrincipal?: ServicePrincipal | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface CreateServicePrincipalRequest {
  /** Required. The account ID for which the service principal is being created. */
  accountId?: string | undefined;
  /** Required. Service principal to be created in <Databricks> */
  servicePrincipal?: ServicePrincipal | undefined;
}

/**
 * Creates a user in Databricks and provisions it at the account level.
 * Behavior depends on whether Account Identity Management (AIM) is enabled:
 * - When AIM is enabled:
 * The user is provisioned with an internalId. If an externalId is provided, the identity provider is
 * treated as the source of truth for user metadata, and customer-supplied field values may be overridden.
 * - When AIM is disabled:
 * The user is provisioned with an internalId only, and customer-supplied metadata is used as-is.
 */
export interface CreateUserProxyRequest {
  /** Required. User to be created in <Databricks> */
  user?: User | undefined;
}

/**
 * Creates a user in Databricks and provisions it at the account level.
 * Behavior depends on whether Account Identity Management (AIM) is enabled:
 * - When AIM is enabled:
 * The user is provisioned with an internalId. If an externalId is provided, the identity provider is
 * treated as the source of truth for user metadata, and customer-supplied field values may be overridden.
 * - When AIM is disabled:
 * The user is provisioned with an internalId only, and customer-supplied metadata is used as-is.
 */
export interface CreateUserRequest {
  /** Required. The account ID for which the user is being created. */
  accountId?: string | undefined;
  /** Required. User to be created in <Databricks> */
  user?: User | undefined;
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

/** Request message for deleting an account access identity rule. */
export interface DeleteAccountAccessIdentityRuleRequest {
  /**
   * Required. The account for which to delete the rule.
   * Format: accounts/{account_id}
   */
  parent?: string | undefined;
  /** Required. The external ID of the principal whose rule should be deleted. */
  externalPrincipalId?: string | undefined;
}

/** Request message for deleting a group membership (unassigning a principal from a group). */
export interface DeleteDirectGroupMemberProxyRequest {
  /** Required. Internal ID of the group in <Databricks>. */
  groupId?: number | undefined;
  /** Required. Internal ID of the principal to be unassigned from the group. */
  principalId?: number | undefined;
}

/** Request message for deleting a group membership (unassigning a principal from a group). */
export interface DeleteDirectGroupMemberRequest {
  /** Required. The account ID for which the group membership is being deleted. */
  accountId?: string | undefined;
  /** Required. Internal ID of the group in <Databricks>. */
  groupId?: number | undefined;
  /** Required. Internal ID of the principal to be unassigned from the group. */
  principalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface DeleteGroupProxyRequest {
  /** Required. Internal ID of the group in <Databricks>. */
  internalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface DeleteGroupRequest {
  /** Required. The account ID for which the group is being deleted. */
  accountId?: string | undefined;
  /** Required. Internal ID of the group in <Databricks>. */
  internalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface DeleteServicePrincipalProxyRequest {
  /** Required. Internal ID of the service principal in <Databricks>. */
  internalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface DeleteServicePrincipalRequest {
  /** Required. The account ID for which the service principal is being deleted. */
  accountId?: string | undefined;
  /** Required. Internal ID of the service principal in <Databricks>. */
  internalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface DeleteUserProxyRequest {
  /** Required. Internal ID of the user in <Databricks>. */
  internalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface DeleteUserRequest {
  /** Required. The account ID for which the user is being deleted. */
  accountId?: string | undefined;
  /** Required. Internal ID of the user in <Databricks>. */
  internalId?: number | undefined;
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

/** Represents a principal that is a direct member of a group, with its source of membership. */
export interface DirectGroupMember {
  /** Internal ID of the principal in <Databricks>. */
  principalId?: number | undefined;
  /** The type of the principal (user/service principal/group). */
  principalType?: PrincipalType | undefined;
  /** The source of group membership (internal or from identity provider). */
  membershipSource?: GroupMembershipSource | undefined;
  /** Display name of the principal. */
  displayName?: string | undefined;
  /** The external ID of the principal in <Databricks>. */
  externalId?: string | undefined;
}

/** Request message for getting an account access identity rule. */
export interface GetAccountAccessIdentityRuleRequest {
  /**
   * Required. The account for which to get the rule.
   * Format: accounts/{account_id}
   */
  parent?: string | undefined;
  /** Required. The external ID of the principal whose rule should be retrieved. */
  externalPrincipalId?: string | undefined;
}

/** Request message for getting a provisioned direct group member. */
export interface GetDirectGroupMemberProxyRequest {
  /** Required. Internal ID of the group in <Databricks>. */
  groupId?: number | undefined;
  /** Required. Internal ID of the principal belonging to the group in <Databricks>. */
  principalId?: number | undefined;
}

/** Request message for getting a provisioned direct group member. */
export interface GetDirectGroupMemberRequest {
  /** Required. The account ID for which the group membership is being fetched. */
  accountId?: string | undefined;
  /** Required. Internal ID of the group in <Databricks>. */
  groupId?: number | undefined;
  /** Required. Internal ID of the principal belonging to the group in <Databricks>. */
  principalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface GetGroupProxyRequest {
  /** Required. Internal ID of the group in <Databricks>. */
  internalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface GetGroupRequest {
  /** Required. The account ID for which the group is being fetched. */
  accountId?: string | undefined;
  /** Required. Internal ID of the group in <Databricks>. */
  internalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface GetServicePrincipalProxyRequest {
  /** Required. Internal ID of the service principal in <Databricks>. */
  internalId?: number | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface GetServicePrincipalRequest {
  /** Required. The account ID for which the service principal is being fetched. */
  accountId?: string | undefined;
  /** Required. Internal ID of the service principal in <Databricks>. */
  internalId?: number | undefined;
}

/**
 * Creates a user in Databricks and returns the resulting User resource.
 * Readability of the created user depends on Account Identity Management (AIM)
 * and the configured Boundary Enforcement mode:
 * - When AIM is enabled and Boundary Enforcement is set to RULES_ONLY:
 * - MVP: Any user with an internalId is readable, including users with an
 * externalId populated.
 * - Phase 2: Behavior to be defined.
 * - When AIM is enabled and Boundary Enforcement is set to ALLOW_ALL:
 * - Any user with an internalId is readable, including users with an
 * externalId populated.
 * - When AIM is disabled:
 * - Returns the User resource corresponding to the given internalId.
 */
export interface GetUserProxyRequest {
  /** Required. Internal ID of the user in <Databricks>. */
  internalId?: number | undefined;
}

/**
 * Creates a user in Databricks and returns the resulting User resource.
 * Readability of the created user depends on Account Identity Management (AIM)
 * and the configured Boundary Enforcement mode:
 * - When AIM is enabled and Boundary Enforcement is set to RULES_ONLY:
 * - MVP: Any user with an internalId is readable, including users with an
 * externalId populated.
 * - Phase 2: Behavior to be defined.
 * - When AIM is enabled and Boundary Enforcement is set to ALLOW_ALL:
 * - Any user with an internalId is readable, including users with an
 * externalId populated.
 * - When AIM is disabled:
 * - Returns the User resource corresponding to the given internalId.
 */
export interface GetUserRequest {
  /** Required. The account ID for which the user is being fetched. */
  accountId?: string | undefined;
  /** Required. Internal ID of the user in <Databricks>. */
  internalId?: number | undefined;
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

/** Request message for getting the workspace identity details for a principal in a workspace. */
export interface GetWorkspaceIdentityDetailRequest {
  /** Required. The internal ID of the principal (user/sp/group) for which the identity details are being requested. */
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

/** Request message for listing account access identity rules. */
export interface ListAccountAccessIdentityRulesRequest {
  /**
   * Required. The account for which to list the rules.
   * Format: accounts/{account_id}
   */
  parent?: string | undefined;
  /** Optional. The maximum number of rules to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** Optional. A page token, received from a previous call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
  /** Optional. Filter to apply to the list. Supports filtering by displayName. */
  filter?: string | undefined;
}

/** Response message for listing account access identity rules. */
export interface ListAccountAccessIdentityRulesResponse {
  accountAccessIdentityRules?: AccountAccessIdentityRule[] | undefined;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string | undefined;
}

/** Request message for listing provisioned direct group members. */
export interface ListDirectGroupMembersProxyRequest {
  /** Required. Internal ID of the group in <Databricks> whose direct members are being listed. */
  groupId?: number | undefined;
  /**
   * The maximum number of members to return. The service may return fewer than this value.
   * If not provided, defaults to 1000 (also the maximum allowed).
   */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListDirectGroupMembersProxy call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
}

/** Request message for listing provisioned direct group members. */
export interface ListDirectGroupMembersRequest {
  /** Required. The account ID for which the direct group members are being listed. */
  accountId?: string | undefined;
  /** Required. Internal ID of the group in <Databricks> whose direct members are being listed. */
  groupId?: number | undefined;
  /**
   * The maximum number of members to return. The service may return fewer than this value.
   * If not provided, defaults to 1000 (also the maximum allowed).
   */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListDirectGroupMembers call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
}

/** Response message for listing direct group members. */
export interface ListDirectGroupMembersResponse {
  /** The list of direct group members with their membership source type. */
  directGroupMembers?: DirectGroupMember[] | undefined;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface ListGroupsProxyRequest {
  /** The maximum number of groups to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListGroups call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
  /** Optional. Allows filtering groups by group name or external id. */
  filter?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface ListGroupsRequest {
  /** Required. The account ID for which the groups are being fetched. */
  accountId?: string | undefined;
  /** The maximum number of groups to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListGroups call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
  /** Optional. Allows filtering groups by group name or external id. */
  filter?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface ListGroupsResponse {
  groups?: Group[] | undefined;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface ListServicePrincipalsProxyRequest {
  /** The maximum number of SPs to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListServicePrincipals call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
  /** Optional. Allows filtering service principals by application id or external id. */
  filter?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface ListServicePrincipalsRequest {
  /** Required. The account ID for which the service principals are being fetched. */
  accountId?: string | undefined;
  /** The maximum number of service principals to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListServicePrincipals call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
  /** Optional. Allows filtering service principals by application id or external id. */
  filter?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface ListServicePrincipalsResponse {
  servicePrincipals?: ServicePrincipal[] | undefined;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string | undefined;
}

/** Request message for listing all transitive parent groups of a principal. */
export interface ListTransitiveParentGroupsProxyRequest {
  /** Required. Internal ID of the principal in <Databricks> whose transitive parent groups are being listed. */
  principalId?: number | undefined;
  /**
   * The maximum number of parent groups to return. The service may return fewer than this value.
   * If not provided, defaults to 1000 (also the maximum allowed).
   */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListTransitiveParentGroups call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
}

/** Request message for listing all transitive parent groups of a principal. */
export interface ListTransitiveParentGroupsRequest {
  /** Required. The account ID for which the transitive parent groups are being listed. */
  accountId?: string | undefined;
  /** Required. Internal ID of the principal in <Databricks> whose transitive parent groups are being listed. */
  principalId?: number | undefined;
  /**
   * The maximum number of parent groups to return. The service may return fewer than this value.
   * If not provided, defaults to 1000 (also the maximum allowed).
   */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListTransitiveParentGroups call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
}

/** Response message for listing all transitive parent groups of a principal. */
export interface ListTransitiveParentGroupsResponse {
  /** The list of transitive parent groups. */
  transitiveParentGroups?: TransitiveParentGroup[] | undefined;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string | undefined;
}

/**
 * Returns a paginated list of account-level users.
 * Behavior depends on whether Account Identity Management (AIM) is enabled:
 * - When AIM is enabled:
 * - The "externalId eq" filter only evaluates provisioned Databricks users
 * that have an internalId.
 * - The "username eq" filter only evaluates provisioned Databricks users
 * that have an internalId.
 * - Listing without filters returns all provisioned Databricks users.
 * - AIM Boundary Enforcement Phase 2: Behavior to be defined.
 * - When AIM is disabled:
 * - The "externalId eq" filter only evaluates provisioned Databricks users
 * that have an internalId.
 * - The "username eq" filter only evaluates provisioned Databricks users
 * that have an internalId.
 * - Listing without filters returns all provisioned Databricks users.
 */
export interface ListUsersProxyRequest {
  /** The maximum number of users to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListUsers call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
  /** Optional. Allows filtering users by username or external id. */
  filter?: string | undefined;
}

/**
 * Returns a paginated list of account-level users.
 * Behavior depends on whether Account Identity Management (AIM) is enabled:
 * - When AIM is enabled:
 * - The "externalId eq" filter only evaluates provisioned Databricks users
 * that have an internalId.
 * - The "username eq" filter only evaluates provisioned Databricks users
 * that have an internalId.
 * - Listing without filters returns all provisioned Databricks users.
 * - AIM Boundary Enforcement Phase 2: Behavior to be defined.
 * - When AIM is disabled:
 * - The "externalId eq" filter only evaluates provisioned Databricks users
 * that have an internalId.
 * - The "username eq" filter only evaluates provisioned Databricks users
 * that have an internalId.
 * - Listing without filters returns all provisioned Databricks users.
 */
export interface ListUsersRequest {
  /** Required. The account ID for which the users are being fetched. */
  accountId?: string | undefined;
  /** The maximum number of users to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListUsers call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
  /** Optional. Allows filtering users by username or external id. */
  filter?: string | undefined;
}

export interface ListUsersResponse {
  users?: User[] | undefined;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface ListWorkspaceAccessDetailsLocalRequest {
  /** The maximum number of workspace access details to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListWorkspaceAccessDetails call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface ListWorkspaceAccessDetailsRequest {
  /** Required. The account ID for which the workspace access details are being fetched. */
  accountId?: string | undefined;
  /** The workspace ID for which the workspace access details are being fetched. */
  workspaceId?: number | undefined;
  /** The maximum number of workspace access details to return. The service may return fewer than this value. */
  pageSize?: number | undefined;
  /** A page token, received from a previous ListWorkspaceAccessDetails call. Provide this to retrieve the subsequent page. */
  pageToken?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface ListWorkspaceAccessDetailsResponse {
  workspaceAccessDetails?: WorkspaceAccessDetail[] | undefined;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string | undefined;
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

/** Represents a group that is a transitive parent of a principal. */
export interface TransitiveParentGroup {
  /** The parent account ID for group in <Databricks>. */
  accountId?: string | undefined;
  /** Internal group ID of the group in <Databricks>. */
  internalId?: number | undefined;
  /** ExternalId of the group in the customer's IdP. */
  externalId?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface UpdateGroupProxyRequest {
  /** Required. Internal ID of the group in <Databricks>. */
  internalId?: number | undefined;
  /** Required. Group to be updated in <Databricks> */
  group?: Group | undefined;
  /** Optional. The list of fields to update. */
  updateMask?: FieldMask<Group> | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface UpdateGroupRequest {
  /** Required. The account ID for which the group is being updated. */
  accountId?: string | undefined;
  /** Required. Internal ID of the group in <Databricks>. */
  internalId?: number | undefined;
  /** Required. Group to be updated in <Databricks> */
  group?: Group | undefined;
  /** Optional. The list of fields to update. */
  updateMask?: FieldMask<Group> | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface UpdateServicePrincipalProxyRequest {
  /** Required. Internal ID of the service principal in <Databricks>. */
  internalId?: number | undefined;
  /** Required. Service principal to be updated in <Databricks> */
  servicePrincipal?: ServicePrincipal | undefined;
  /** Optional. The list of fields to update. */
  updateMask?: FieldMask<ServicePrincipal> | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface UpdateServicePrincipalRequest {
  /** Required. The account ID for which the service principal is being updated. */
  accountId?: string | undefined;
  /** Required. Internal ID of the service principal in <Databricks>. */
  internalId?: number | undefined;
  /** Required. Service Principal to be updated in <Databricks> */
  servicePrincipal?: ServicePrincipal | undefined;
  /** Optional. The list of fields to update. */
  updateMask?: FieldMask<ServicePrincipal> | undefined;
}

/**
 * Updates an existing user in Databricks. The behavior is consistent regardless of whether
 * Account Identity Management (AIM) is enabled or disabled. The following fields are updatable:
 * - name.familyName
 * - name.givenName
 * - status
 * - externalId
 */
export interface UpdateUserProxyRequest {
  /** Required. Internal ID of the user in <Databricks>. */
  internalId?: number | undefined;
  /** Required. User to be updated in <Databricks> */
  user?: User | undefined;
  /** Optional. The list of fields to update. */
  updateMask?: FieldMask<User> | undefined;
}

/**
 * Updates an existing user in Databricks. The behavior is consistent regardless of whether
 * Account Identity Management (AIM) is enabled or disabled. The following fields are updatable:
 * - name.familyName
 * - name.givenName
 * - status
 * - externalId
 */
export interface UpdateUserRequest {
  /** Required. The account ID for which the user is being updated. */
  accountId?: string | undefined;
  /** Required. Internal ID of the user in <Databricks>. */
  internalId?: number | undefined;
  /** Required. User to be updated in <Databricks> */
  user?: User | undefined;
  /** Optional. The list of fields to update. */
  updateMask?: FieldMask<User> | undefined;
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

/** Request message for updating the workspace identity details for a principal in a workspace. */
export interface UpdateWorkspaceIdentityDetailRequest {
  /** Required. ID of the principal in <Databricks>. */
  principalId?: number | undefined;
  /** Required. Workspace identity detail to be updated in <Databricks>. */
  workspaceIdentityDetail?: WorkspaceIdentityDetail | undefined;
  /** Required. The list of fields to update. */
  updateMask?: FieldMask<WorkspaceIdentityDetail> | undefined;
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

/** The details of a directly or indirectly assigned principal's details in a workspace. */
export interface WorkspaceIdentityDetail {
  /** The internal ID of the principal (user/sp/group) in <Databricks>. */
  principalId?: number | undefined;
  /** The type of the principal (user/service principal/group). */
  principalType?: PrincipalType | undefined;
  /** The activity status of an identity in a <Databricks> workspace. */
  workspaceIdentityStatus?: State | undefined;
  /** The type of assignment the principal has to the workspace (direct or indirect). */
  assignmentType?: WorkspaceIdentityDetail_AssignmentType | undefined;
}

export const unmarshalAccountAccessIdentityRuleSchema: z.ZodType<AccountAccessIdentityRule> =
  z
    .object({
      action: z.enum(AccountAccessRuleAction).optional(),
      external_principal_id: z.string().optional(),
      display_name: z.string().optional(),
      principal_type: z.enum(PrincipalType).optional(),
      name: z.string().optional(),
    })
    .transform(d => ({
      action: d.action,
      externalPrincipalId: d.external_principal_id,
      displayName: d.display_name,
      principalType: d.principal_type,
      name: d.name,
    }));

export const unmarshalDirectGroupMemberSchema: z.ZodType<DirectGroupMember> = z
  .object({
    principal_id: z.number().optional(),
    principal_type: z.enum(PrincipalType).optional(),
    membership_source: z.enum(GroupMembershipSource).optional(),
    display_name: z.string().optional(),
    external_id: z.string().optional(),
  })
  .transform(d => ({
    principalId: d.principal_id,
    principalType: d.principal_type,
    membershipSource: d.membership_source,
    displayName: d.display_name,
    externalId: d.external_id,
  }));

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

export const unmarshalListAccountAccessIdentityRulesResponseSchema: z.ZodType<ListAccountAccessIdentityRulesResponse> =
  z
    .object({
      account_access_identity_rules: z
        .array(z.lazy(() => unmarshalAccountAccessIdentityRuleSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      accountAccessIdentityRules: d.account_access_identity_rules,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListDirectGroupMembersResponseSchema: z.ZodType<ListDirectGroupMembersResponse> =
  z
    .object({
      direct_group_members: z
        .array(z.lazy(() => unmarshalDirectGroupMemberSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      directGroupMembers: d.direct_group_members,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListGroupsResponseSchema: z.ZodType<ListGroupsResponse> =
  z
    .object({
      groups: z.array(z.lazy(() => unmarshalGroupSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      groups: d.groups,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListServicePrincipalsResponseSchema: z.ZodType<ListServicePrincipalsResponse> =
  z
    .object({
      service_principals: z
        .array(z.lazy(() => unmarshalServicePrincipalSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      servicePrincipals: d.service_principals,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListTransitiveParentGroupsResponseSchema: z.ZodType<ListTransitiveParentGroupsResponse> =
  z
    .object({
      transitive_parent_groups: z
        .array(z.lazy(() => unmarshalTransitiveParentGroupSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      transitiveParentGroups: d.transitive_parent_groups,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListUsersResponseSchema: z.ZodType<ListUsersResponse> = z
  .object({
    users: z.array(z.lazy(() => unmarshalUserSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    users: d.users,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListWorkspaceAccessDetailsResponseSchema: z.ZodType<ListWorkspaceAccessDetailsResponse> =
  z
    .object({
      workspace_access_details: z
        .array(z.lazy(() => unmarshalWorkspaceAccessDetailSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      workspaceAccessDetails: d.workspace_access_details,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListWorkspaceAssignmentDetailsResponseSchema: z.ZodType<ListWorkspaceAssignmentDetailsResponse> =
  z
    .object({
      workspace_assignment_details: z
        .array(z.lazy(() => unmarshalWorkspaceAssignmentDetailSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      workspaceAssignmentDetails: d.workspace_assignment_details,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalResolveGroupResponseSchema: z.ZodType<ResolveGroupResponse> =
  z
    .object({
      group: z.lazy(() => unmarshalGroupSchema).optional(),
    })
    .transform(d => ({
      group: d.group,
    }));

export const unmarshalResolveServicePrincipalResponseSchema: z.ZodType<ResolveServicePrincipalResponse> =
  z
    .object({
      service_principal: z
        .lazy(() => unmarshalServicePrincipalSchema)
        .optional(),
    })
    .transform(d => ({
      servicePrincipal: d.service_principal,
    }));

export const unmarshalResolveUserResponseSchema: z.ZodType<ResolveUserResponse> =
  z
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

export const unmarshalTransitiveParentGroupSchema: z.ZodType<TransitiveParentGroup> =
  z
    .object({
      account_id: z.string().optional(),
      internal_id: z.number().optional(),
      external_id: z.string().optional(),
    })
    .transform(d => ({
      accountId: d.account_id,
      internalId: d.internal_id,
      externalId: d.external_id,
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

export const unmarshalWorkspaceAccessDetailSchema: z.ZodType<WorkspaceAccessDetail> =
  z
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

export const unmarshalWorkspaceAssignmentDetailSchema: z.ZodType<WorkspaceAssignmentDetail> =
  z
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

export const unmarshalWorkspaceIdentityDetailSchema: z.ZodType<WorkspaceIdentityDetail> =
  z
    .object({
      principal_id: z.number().optional(),
      principal_type: z.enum(PrincipalType).optional(),
      workspace_identity_status: z.enum(State).optional(),
      assignment_type: z
        .enum(WorkspaceIdentityDetail_AssignmentType)
        .optional(),
    })
    .transform(d => ({
      principalId: d.principal_id,
      principalType: d.principal_type,
      workspaceIdentityStatus: d.workspace_identity_status,
      assignmentType: d.assignment_type,
    }));

export const marshalAccountAccessIdentityRuleSchema: z.ZodType = z
  .object({
    action: z.enum(AccountAccessRuleAction).optional(),
    externalPrincipalId: z.string().optional(),
    displayName: z.string().optional(),
    principalType: z.enum(PrincipalType).optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    action: d.action,
    external_principal_id: d.externalPrincipalId,
    display_name: d.displayName,
    principal_type: d.principalType,
    name: d.name,
  }));

export const marshalDirectGroupMemberSchema: z.ZodType = z
  .object({
    principalId: z.number().optional(),
    principalType: z.enum(PrincipalType).optional(),
    membershipSource: z.enum(GroupMembershipSource).optional(),
    displayName: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
    principal_type: d.principalType,
    membership_source: d.membershipSource,
    display_name: d.displayName,
    external_id: d.externalId,
  }));

export const marshalGroupSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
    externalId: z.string().optional(),
    groupName: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
    external_id: d.externalId,
    group_name: d.groupName,
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

export const marshalServicePrincipalSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
    externalId: z.string().optional(),
    applicationId: z.string().optional(),
    displayName: z.string().optional(),
    accountSpStatus: z.enum(State).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
    external_id: d.externalId,
    application_id: d.applicationId,
    display_name: d.displayName,
    account_sp_status: d.accountSpStatus,
  }));

export const marshalUserSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
    externalId: z.string().optional(),
    username: z.string().optional(),
    name: z.lazy(() => marshalUser_NameSchema).optional(),
    accountUserStatus: z.enum(State).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
    external_id: d.externalId,
    username: d.username,
    name: d.name,
    account_user_status: d.accountUserStatus,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUser_NameSchema: z.ZodType = z
  .object({
    givenName: z.string().optional(),
    familyName: z.string().optional(),
  })
  .transform(d => ({
    given_name: d.givenName,
    family_name: d.familyName,
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

export const marshalWorkspaceIdentityDetailSchema: z.ZodType = z
  .object({
    principalId: z.number().optional(),
    principalType: z.enum(PrincipalType).optional(),
    workspaceIdentityStatus: z.enum(State).optional(),
    assignmentType: z.enum(WorkspaceIdentityDetail_AssignmentType).optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
    principal_type: d.principalType,
    workspace_identity_status: d.workspaceIdentityStatus,
    assignment_type: d.assignmentType,
  }));

const groupFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  externalId: {wire: 'external_id'},
  groupName: {wire: 'group_name'},
  internalId: {wire: 'internal_id'},
};

export function groupFieldMask(...paths: string[]): FieldMask<Group> {
  return FieldMask.build<Group>(paths, groupFieldMaskSchema);
}

const servicePrincipalFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  accountSpStatus: {wire: 'account_sp_status'},
  applicationId: {wire: 'application_id'},
  displayName: {wire: 'display_name'},
  externalId: {wire: 'external_id'},
  internalId: {wire: 'internal_id'},
};

export function servicePrincipalFieldMask(
  ...paths: string[]
): FieldMask<ServicePrincipal> {
  return FieldMask.build<ServicePrincipal>(
    paths,
    servicePrincipalFieldMaskSchema
  );
}

const userFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  accountUserStatus: {wire: 'account_user_status'},
  externalId: {wire: 'external_id'},
  internalId: {wire: 'internal_id'},
  name: {wire: 'name', children: () => user_NameFieldMaskSchema},
  username: {wire: 'username'},
};

export function userFieldMask(...paths: string[]): FieldMask<User> {
  return FieldMask.build<User>(paths, userFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const user_NameFieldMaskSchema: FieldMaskSchema = {
  familyName: {wire: 'family_name'},
  givenName: {wire: 'given_name'},
};

const workspaceAssignmentDetailFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  entitlements: {wire: 'entitlements'},
  principalId: {wire: 'principal_id'},
  principalType: {wire: 'principal_type'},
  workspaceId: {wire: 'workspace_id'},
};

export function workspaceAssignmentDetailFieldMask(
  ...paths: string[]
): FieldMask<WorkspaceAssignmentDetail> {
  return FieldMask.build<WorkspaceAssignmentDetail>(
    paths,
    workspaceAssignmentDetailFieldMaskSchema
  );
}

const workspaceIdentityDetailFieldMaskSchema: FieldMaskSchema = {
  assignmentType: {wire: 'assignment_type'},
  principalId: {wire: 'principal_id'},
  principalType: {wire: 'principal_type'},
  workspaceIdentityStatus: {wire: 'workspace_identity_status'},
};

export function workspaceIdentityDetailFieldMask(
  ...paths: string[]
): FieldMask<WorkspaceIdentityDetail> {
  return FieldMask.build<WorkspaceIdentityDetail>(
    paths,
    workspaceIdentityDetailFieldMaskSchema
  );
}
