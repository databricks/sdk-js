// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

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
export enum WorkspaceAccessDetail_AccessType {
  /** Unknown access to the workspace. */
  ACCESS_TYPE_UNSPECIFIED = 'ACCESS_TYPE_UNSPECIFIED',
  /** Direct access to the workspace, meaning the principal is provisioned and directly assigned to the workspace. */
  DIRECT = 'DIRECT',
  /** Indirect access to the workspace, meaning the principal is provisioned and assigned to a group that has access to the workspace. */
  INDIRECT = 'INDIRECT',
}

/** An identity rule that controls which principals can access an account. */
export interface AccountAccessIdentityRule {
  /** Currently, only DENY action is supported. */
  action?: AccountAccessRuleAction | undefined;
  /** External ID of the principal in the customer's IdP. */
  externalId?: string | undefined;
  /** Display name of the principal. */
  displayName?: string | undefined;
  /**
   * The type of the principal (user/service principal/group).
   * This field is populated by the server based on the external_id.
   */
  principalType?: PrincipalType | undefined;
}

/** Request message for creating an account access identity rule. */
export interface CreateAccountAccessIdentityRuleRequest {
  /** Required. The account ID for which to create the rule. */
  accountId?: string | undefined;
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
  /** Required. The account ID for which to delete the rule. */
  accountId?: string | undefined;
  /** Required. The external ID of the principal whose rule should be deleted. */
  externalId?: string | undefined;
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
  /** Required. The account ID for which to get the rule. */
  accountId?: string | undefined;
  /** Required. The external ID of the principal whose rule should be retrieved. */
  externalId?: string | undefined;
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
  /** Required. The account ID for which to list the rules. */
  accountId?: string | undefined;
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
 * Request message for matching a group against the IDP.
 * This will perform a sync by group_id before performing analysis to update local data which is safe to fix.
 */
export interface MatchGroupWithIdpRequest {
  /** The account ID for which the group is being matched. */
  accountId?: string | undefined;
  /** Internal ID of the group in <Databricks>. */
  groupId?: number | undefined;
}

/** Response message for matching a group against the IDP. */
export interface MatchGroupWithIdpResponse {
  /** The local Databricks group being matched against the IDP. */
  databricksGroup?: Group | undefined;
  /** IDP groups matching this group by group name. */
  idpMatchesByGroupName?: Group[] | undefined;
  /**
   * IDP group matching this group by the stored external_id.
   * Absent if no match was found.
   */
  idpMatchByExternalId?: Group | undefined;
  /**
   * Members that exist only in Databricks and have no external_id.
   * Empty if external_id is undefined or does not exist in the IDP.
   */
  localMembersNotInIdp?: DirectGroupMember[] | undefined;
  /**
   * Members that have an external_id but are not members in the IDP.
   * Empty if external_id is undefined or does not exist in the IDP.
   */
  externalMembersNotInIdp?: DirectGroupMember[] | undefined;
}

/**
 * Request message for matching a service principal against the IDP.
 * This will perform a sync by service_principal_id before performing analysis to update local data which is safe to fix.
 */
export interface MatchServicePrincipalWithIdpRequest {
  /** The account ID for which the service principal is being matched. */
  accountId?: string | undefined;
  /** Internal ID of the service principal in <Databricks>. */
  servicePrincipalId?: number | undefined;
}

/** Response message for matching a service principal against the IDP. */
export interface MatchServicePrincipalWithIdpResponse {
  /** The local Databricks service principal being matched against the IDP. */
  databricksServicePrincipal?: ServicePrincipal | undefined;
  /**
   * IDP service principal matching this service principal by application ID.
   * Absent if no match was found.
   */
  idpMatchByAppId?: ServicePrincipal | undefined;
  /**
   * IDP service principal matching this service principal by the stored external_id.
   * Absent if no match was found.
   */
  idpMatchByExternalId?: ServicePrincipal | undefined;
}

/**
 * Request message for matching a user against the IDP.
 * This will perform a sync by user_id before performing analysis to update local data which is safe to fix.
 */
export interface MatchUserWithIdpRequest {
  /** The account ID for which the user is being matched. */
  accountId?: string | undefined;
  /** Internal ID of the user in <Databricks>. */
  userId?: number | undefined;
}

/** Response message for matching a user against the IDP. */
export interface MatchUserWithIdpResponse {
  /** The local Databricks user being matched against the IDP. */
  databricksUser?: User | undefined;
  /**
   * IDP user matching this user by username.
   * Absent if no match was found.
   */
  idpMatchByUsername?: User | undefined;
  /**
   * IDP user matching this user by the stored external_id.
   * Absent if no match was found.
   */
  idpMatchByExternalId?: User | undefined;
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
  updateMask?: string | undefined;
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
  updateMask?: string | undefined;
}

/** TODO: Write description later when this method is implemented */
export interface UpdateServicePrincipalProxyRequest {
  /** Required. Internal ID of the service principal in <Databricks>. */
  internalId?: number | undefined;
  /** Required. Service principal to be updated in <Databricks> */
  servicePrincipal?: ServicePrincipal | undefined;
  /** Optional. The list of fields to update. */
  updateMask?: string | undefined;
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
  updateMask?: string | undefined;
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
  updateMask?: string | undefined;
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
  updateMask?: string | undefined;
}

/** Proxy request for updating a workspace assignment detail for a principal. */
export interface UpdateWorkspaceAssignmentDetailProxyRequest {
  /** Required. ID of the principal in <Databricks>. */
  principalId?: number | undefined;
  /** Required. Workspace assignment detail to be updated in <Databricks>. */
  workspaceAssignmentDetail?: WorkspaceAssignmentDetail | undefined;
  /** Required. The list of fields to update. */
  updateMask?: string | undefined;
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
  updateMask?: string | undefined;
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

export const unmarshalAccountAccessIdentityRuleSchema = z
  .object({
    action: z.enum(AccountAccessRuleAction).optional(),
    external_id: z.string().optional(),
    display_name: z.string().optional(),
    principal_type: z.enum(PrincipalType).optional(),
  })
  .transform(d => ({
    action: d.action,
    externalId: d.external_id,
    displayName: d.display_name,
    principalType: d.principal_type,
  }));

export const unmarshalCreateAccountAccessIdentityRuleRequestSchema = z
  .object({
    account_id: z.string().optional(),
    account_access_identity_rule: z
      .lazy(() => unmarshalAccountAccessIdentityRuleSchema)
      .optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    accountAccessIdentityRule: d.account_access_identity_rule,
  }));

export const unmarshalCreateDirectGroupMemberProxyRequestSchema = z
  .object({
    group_id: z.number().optional(),
    direct_group_member: z
      .lazy(() => unmarshalDirectGroupMemberSchema)
      .optional(),
  })
  .transform(d => ({
    groupId: d.group_id,
    directGroupMember: d.direct_group_member,
  }));

export const unmarshalCreateDirectGroupMemberRequestSchema = z
  .object({
    account_id: z.string().optional(),
    group_id: z.number().optional(),
    direct_group_member: z
      .lazy(() => unmarshalDirectGroupMemberSchema)
      .optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    groupId: d.group_id,
    directGroupMember: d.direct_group_member,
  }));

export const unmarshalCreateGroupProxyRequestSchema = z
  .object({
    group: z.lazy(() => unmarshalGroupSchema).optional(),
  })
  .transform(d => ({
    group: d.group,
  }));

export const unmarshalCreateGroupRequestSchema = z
  .object({
    account_id: z.string().optional(),
    group: z.lazy(() => unmarshalGroupSchema).optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    group: d.group,
  }));

export const unmarshalCreateServicePrincipalProxyRequestSchema = z
  .object({
    service_principal: z.lazy(() => unmarshalServicePrincipalSchema).optional(),
  })
  .transform(d => ({
    servicePrincipal: d.service_principal,
  }));

export const unmarshalCreateServicePrincipalRequestSchema = z
  .object({
    account_id: z.string().optional(),
    service_principal: z.lazy(() => unmarshalServicePrincipalSchema).optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    servicePrincipal: d.service_principal,
  }));

export const unmarshalCreateUserProxyRequestSchema = z
  .object({
    user: z.lazy(() => unmarshalUserSchema).optional(),
  })
  .transform(d => ({
    user: d.user,
  }));

export const unmarshalCreateUserRequestSchema = z
  .object({
    account_id: z.string().optional(),
    user: z.lazy(() => unmarshalUserSchema).optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    user: d.user,
  }));

export const unmarshalCreateWorkspaceAssignmentDetailProxyRequestSchema = z
  .object({
    workspace_assignment_detail: z
      .lazy(() => unmarshalWorkspaceAssignmentDetailSchema)
      .optional(),
  })
  .transform(d => ({
    workspaceAssignmentDetail: d.workspace_assignment_detail,
  }));

export const unmarshalCreateWorkspaceAssignmentDetailRequestSchema = z
  .object({
    account_id: z.string().optional(),
    workspace_id: z.number().optional(),
    workspace_assignment_detail: z
      .lazy(() => unmarshalWorkspaceAssignmentDetailSchema)
      .optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    workspaceId: d.workspace_id,
    workspaceAssignmentDetail: d.workspace_assignment_detail,
  }));

export const unmarshalDeleteAccountAccessIdentityRuleRequestSchema = z
  .object({
    account_id: z.string().optional(),
    external_id: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    externalId: d.external_id,
  }));

export const unmarshalDeleteDirectGroupMemberProxyRequestSchema = z
  .object({
    group_id: z.number().optional(),
    principal_id: z.number().optional(),
  })
  .transform(d => ({
    groupId: d.group_id,
    principalId: d.principal_id,
  }));

export const unmarshalDeleteDirectGroupMemberRequestSchema = z
  .object({
    account_id: z.string().optional(),
    group_id: z.number().optional(),
    principal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    groupId: d.group_id,
    principalId: d.principal_id,
  }));

export const unmarshalDeleteGroupProxyRequestSchema = z
  .object({
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    internalId: d.internal_id,
  }));

export const unmarshalDeleteGroupRequestSchema = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
  }));

export const unmarshalDeleteServicePrincipalProxyRequestSchema = z
  .object({
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    internalId: d.internal_id,
  }));

export const unmarshalDeleteServicePrincipalRequestSchema = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
  }));

export const unmarshalDeleteUserProxyRequestSchema = z
  .object({
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    internalId: d.internal_id,
  }));

export const unmarshalDeleteUserRequestSchema = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
  }));

export const unmarshalDeleteWorkspaceAssignmentDetailProxyRequestSchema = z
  .object({
    principal_id: z.number().optional(),
  })
  .transform(d => ({
    principalId: d.principal_id,
  }));

export const unmarshalDeleteWorkspaceAssignmentDetailRequestSchema = z
  .object({
    account_id: z.string().optional(),
    workspace_id: z.number().optional(),
    principal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    workspaceId: d.workspace_id,
    principalId: d.principal_id,
  }));

export const unmarshalDirectGroupMemberSchema = z
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

export const unmarshalGetAccountAccessIdentityRuleRequestSchema = z
  .object({
    account_id: z.string().optional(),
    external_id: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    externalId: d.external_id,
  }));

export const unmarshalGetGroupProxyRequestSchema = z
  .object({
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    internalId: d.internal_id,
  }));

export const unmarshalGetGroupRequestSchema = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
  }));

export const unmarshalGetServicePrincipalProxyRequestSchema = z
  .object({
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    internalId: d.internal_id,
  }));

export const unmarshalGetServicePrincipalRequestSchema = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
  }));

export const unmarshalGetUserProxyRequestSchema = z
  .object({
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    internalId: d.internal_id,
  }));

export const unmarshalGetUserRequestSchema = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
  }));

export const unmarshalGetWorkspaceAccessDetailLocalRequestSchema = z
  .object({
    principal_id: z.number().optional(),
    view: z.enum(WorkspaceAccessDetailView).optional(),
  })
  .transform(d => ({
    principalId: d.principal_id,
    view: d.view,
  }));

export const unmarshalGetWorkspaceAccessDetailRequestSchema = z
  .object({
    account_id: z.string().optional(),
    workspace_id: z.number().optional(),
    principal_id: z.number().optional(),
    view: z.enum(WorkspaceAccessDetailView).optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    workspaceId: d.workspace_id,
    principalId: d.principal_id,
    view: d.view,
  }));

export const unmarshalGetWorkspaceAssignmentDetailProxyRequestSchema = z
  .object({
    principal_id: z.number().optional(),
  })
  .transform(d => ({
    principalId: d.principal_id,
  }));

export const unmarshalGetWorkspaceAssignmentDetailRequestSchema = z
  .object({
    account_id: z.string().optional(),
    workspace_id: z.number().optional(),
    principal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    workspaceId: d.workspace_id,
    principalId: d.principal_id,
  }));

export const unmarshalGroupSchema = z
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

export const unmarshalListAccountAccessIdentityRulesRequestSchema = z
  .object({
    account_id: z.string().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
    filter: d.filter,
  }));

export const unmarshalListAccountAccessIdentityRulesResponseSchema = z
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

export const unmarshalListDirectGroupMembersProxyRequestSchema = z
  .object({
    group_id: z.number().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    groupId: d.group_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListDirectGroupMembersRequestSchema = z
  .object({
    account_id: z.string().optional(),
    group_id: z.number().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    groupId: d.group_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListDirectGroupMembersResponseSchema = z
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

export const unmarshalListGroupsProxyRequestSchema = z
  .object({
    page_size: z.number().optional(),
    page_token: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    pageSize: d.page_size,
    pageToken: d.page_token,
    filter: d.filter,
  }));

export const unmarshalListGroupsRequestSchema = z
  .object({
    account_id: z.string().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
    filter: d.filter,
  }));

export const unmarshalListGroupsResponseSchema = z
  .object({
    groups: z.array(z.lazy(() => unmarshalGroupSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    groups: d.groups,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListServicePrincipalsProxyRequestSchema = z
  .object({
    page_size: z.number().optional(),
    page_token: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    pageSize: d.page_size,
    pageToken: d.page_token,
    filter: d.filter,
  }));

export const unmarshalListServicePrincipalsRequestSchema = z
  .object({
    account_id: z.string().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
    filter: d.filter,
  }));

export const unmarshalListServicePrincipalsResponseSchema = z
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

export const unmarshalListTransitiveParentGroupsProxyRequestSchema = z
  .object({
    principal_id: z.number().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    principalId: d.principal_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListTransitiveParentGroupsRequestSchema = z
  .object({
    account_id: z.string().optional(),
    principal_id: z.number().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    principalId: d.principal_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListTransitiveParentGroupsResponseSchema = z
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

export const unmarshalListUsersProxyRequestSchema = z
  .object({
    page_size: z.number().optional(),
    page_token: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    pageSize: d.page_size,
    pageToken: d.page_token,
    filter: d.filter,
  }));

export const unmarshalListUsersRequestSchema = z
  .object({
    account_id: z.string().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
    filter: d.filter,
  }));

export const unmarshalListUsersResponseSchema = z
  .object({
    users: z.array(z.lazy(() => unmarshalUserSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    users: d.users,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListWorkspaceAccessDetailsLocalRequestSchema = z
  .object({
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListWorkspaceAccessDetailsRequestSchema = z
  .object({
    account_id: z.string().optional(),
    workspace_id: z.number().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    workspaceId: d.workspace_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListWorkspaceAccessDetailsResponseSchema = z
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

export const unmarshalListWorkspaceAssignmentDetailsProxyRequestSchema = z
  .object({
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListWorkspaceAssignmentDetailsRequestSchema = z
  .object({
    account_id: z.string().optional(),
    workspace_id: z.number().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    workspaceId: d.workspace_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListWorkspaceAssignmentDetailsResponseSchema = z
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

export const unmarshalMatchGroupWithIdpRequestSchema = z
  .object({
    account_id: z.string().optional(),
    group_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    groupId: d.group_id,
  }));

export const unmarshalMatchGroupWithIdpResponseSchema = z
  .object({
    databricks_group: z.lazy(() => unmarshalGroupSchema).optional(),
    idp_matches_by_group_name: z
      .array(z.lazy(() => unmarshalGroupSchema))
      .optional(),
    idp_match_by_external_id: z.lazy(() => unmarshalGroupSchema).optional(),
    local_members_not_in_idp: z
      .array(z.lazy(() => unmarshalDirectGroupMemberSchema))
      .optional(),
    external_members_not_in_idp: z
      .array(z.lazy(() => unmarshalDirectGroupMemberSchema))
      .optional(),
  })
  .transform(d => ({
    databricksGroup: d.databricks_group,
    idpMatchesByGroupName: d.idp_matches_by_group_name,
    idpMatchByExternalId: d.idp_match_by_external_id,
    localMembersNotInIdp: d.local_members_not_in_idp,
    externalMembersNotInIdp: d.external_members_not_in_idp,
  }));

export const unmarshalMatchServicePrincipalWithIdpRequestSchema = z
  .object({
    account_id: z.string().optional(),
    service_principal_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    servicePrincipalId: d.service_principal_id,
  }));

export const unmarshalMatchServicePrincipalWithIdpResponseSchema = z
  .object({
    databricks_service_principal: z
      .lazy(() => unmarshalServicePrincipalSchema)
      .optional(),
    idp_match_by_app_id: z
      .lazy(() => unmarshalServicePrincipalSchema)
      .optional(),
    idp_match_by_external_id: z
      .lazy(() => unmarshalServicePrincipalSchema)
      .optional(),
  })
  .transform(d => ({
    databricksServicePrincipal: d.databricks_service_principal,
    idpMatchByAppId: d.idp_match_by_app_id,
    idpMatchByExternalId: d.idp_match_by_external_id,
  }));

export const unmarshalMatchUserWithIdpRequestSchema = z
  .object({
    account_id: z.string().optional(),
    user_id: z.number().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    userId: d.user_id,
  }));

export const unmarshalMatchUserWithIdpResponseSchema = z
  .object({
    databricks_user: z.lazy(() => unmarshalUserSchema).optional(),
    idp_match_by_username: z.lazy(() => unmarshalUserSchema).optional(),
    idp_match_by_external_id: z.lazy(() => unmarshalUserSchema).optional(),
  })
  .transform(d => ({
    databricksUser: d.databricks_user,
    idpMatchByUsername: d.idp_match_by_username,
    idpMatchByExternalId: d.idp_match_by_external_id,
  }));

export const unmarshalResolveGroupProxyRequestSchema = z
  .object({
    external_id: z.string().optional(),
  })
  .transform(d => ({
    externalId: d.external_id,
  }));

export const unmarshalResolveGroupRequestSchema = z
  .object({
    account_id: z.string().optional(),
    external_id: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    externalId: d.external_id,
  }));

export const unmarshalResolveGroupResponseSchema = z
  .object({
    group: z.lazy(() => unmarshalGroupSchema).optional(),
  })
  .transform(d => ({
    group: d.group,
  }));

export const unmarshalResolveServicePrincipalProxyRequestSchema = z
  .object({
    external_id: z.string().optional(),
  })
  .transform(d => ({
    externalId: d.external_id,
  }));

export const unmarshalResolveServicePrincipalRequestSchema = z
  .object({
    account_id: z.string().optional(),
    external_id: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    externalId: d.external_id,
  }));

export const unmarshalResolveServicePrincipalResponseSchema = z
  .object({
    service_principal: z.lazy(() => unmarshalServicePrincipalSchema).optional(),
  })
  .transform(d => ({
    servicePrincipal: d.service_principal,
  }));

export const unmarshalResolveUserProxyRequestSchema = z
  .object({
    external_id: z.string().optional(),
  })
  .transform(d => ({
    externalId: d.external_id,
  }));

export const unmarshalResolveUserRequestSchema = z
  .object({
    account_id: z.string().optional(),
    external_id: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    externalId: d.external_id,
  }));

export const unmarshalResolveUserResponseSchema = z
  .object({
    user: z.lazy(() => unmarshalUserSchema).optional(),
  })
  .transform(d => ({
    user: d.user,
  }));

export const unmarshalServicePrincipalSchema = z
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

export const unmarshalTransitiveParentGroupSchema = z
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

export const unmarshalUpdateGroupProxyRequestSchema = z
  .object({
    internal_id: z.number().optional(),
    group: z.lazy(() => unmarshalGroupSchema).optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    internalId: d.internal_id,
    group: d.group,
    updateMask: d.update_mask,
  }));

export const unmarshalUpdateGroupRequestSchema = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
    group: z.lazy(() => unmarshalGroupSchema).optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
    group: d.group,
    updateMask: d.update_mask,
  }));

export const unmarshalUpdateServicePrincipalProxyRequestSchema = z
  .object({
    internal_id: z.number().optional(),
    service_principal: z.lazy(() => unmarshalServicePrincipalSchema).optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    internalId: d.internal_id,
    servicePrincipal: d.service_principal,
    updateMask: d.update_mask,
  }));

export const unmarshalUpdateServicePrincipalRequestSchema = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
    service_principal: z.lazy(() => unmarshalServicePrincipalSchema).optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
    servicePrincipal: d.service_principal,
    updateMask: d.update_mask,
  }));

export const unmarshalUpdateUserProxyRequestSchema = z
  .object({
    internal_id: z.number().optional(),
    user: z.lazy(() => unmarshalUserSchema).optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    internalId: d.internal_id,
    user: d.user,
    updateMask: d.update_mask,
  }));

export const unmarshalUpdateUserRequestSchema = z
  .object({
    account_id: z.string().optional(),
    internal_id: z.number().optional(),
    user: z.lazy(() => unmarshalUserSchema).optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    internalId: d.internal_id,
    user: d.user,
    updateMask: d.update_mask,
  }));

export const unmarshalUpdateWorkspaceAssignmentDetailProxyRequestSchema = z
  .object({
    principal_id: z.number().optional(),
    workspace_assignment_detail: z
      .lazy(() => unmarshalWorkspaceAssignmentDetailSchema)
      .optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    principalId: d.principal_id,
    workspaceAssignmentDetail: d.workspace_assignment_detail,
    updateMask: d.update_mask,
  }));

export const unmarshalUpdateWorkspaceAssignmentDetailRequestSchema = z
  .object({
    account_id: z.string().optional(),
    workspace_id: z.number().optional(),
    principal_id: z.number().optional(),
    workspace_assignment_detail: z
      .lazy(() => unmarshalWorkspaceAssignmentDetailSchema)
      .optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    workspaceId: d.workspace_id,
    principalId: d.principal_id,
    workspaceAssignmentDetail: d.workspace_assignment_detail,
    updateMask: d.update_mask,
  }));

export const unmarshalUserSchema = z
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

export const unmarshalUser_NameSchema = z
  .object({
    given_name: z.string().optional(),
    family_name: z.string().optional(),
  })
  .transform(d => ({
    givenName: d.given_name,
    familyName: d.family_name,
  }));

export const unmarshalWorkspaceAccessDetailSchema = z
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

export const unmarshalWorkspaceAssignmentDetailSchema = z
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

export const marshalAccountAccessIdentityRuleSchema = z
  .object({
    action: z.enum(AccountAccessRuleAction).optional(),
    externalId: z.string().optional(),
    displayName: z.string().optional(),
    principalType: z.enum(PrincipalType).optional(),
  })
  .transform(d => ({
    action: d.action,
    external_id: d.externalId,
    display_name: d.displayName,
    principal_type: d.principalType,
  }));

export const marshalCreateAccountAccessIdentityRuleRequestSchema = z
  .object({
    accountId: z.string().optional(),
    accountAccessIdentityRule: z
      .lazy(() => marshalAccountAccessIdentityRuleSchema)
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    account_access_identity_rule: d.accountAccessIdentityRule,
  }));

export const marshalCreateDirectGroupMemberProxyRequestSchema = z
  .object({
    groupId: z.number().optional(),
    directGroupMember: z.lazy(() => marshalDirectGroupMemberSchema).optional(),
  })
  .transform(d => ({
    group_id: d.groupId,
    direct_group_member: d.directGroupMember,
  }));

export const marshalCreateDirectGroupMemberRequestSchema = z
  .object({
    accountId: z.string().optional(),
    groupId: z.number().optional(),
    directGroupMember: z.lazy(() => marshalDirectGroupMemberSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    group_id: d.groupId,
    direct_group_member: d.directGroupMember,
  }));

export const marshalCreateGroupProxyRequestSchema = z
  .object({
    group: z.lazy(() => marshalGroupSchema).optional(),
  })
  .transform(d => ({
    group: d.group,
  }));

export const marshalCreateGroupRequestSchema = z
  .object({
    accountId: z.string().optional(),
    group: z.lazy(() => marshalGroupSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    group: d.group,
  }));

export const marshalCreateServicePrincipalProxyRequestSchema = z
  .object({
    servicePrincipal: z.lazy(() => marshalServicePrincipalSchema).optional(),
  })
  .transform(d => ({
    service_principal: d.servicePrincipal,
  }));

export const marshalCreateServicePrincipalRequestSchema = z
  .object({
    accountId: z.string().optional(),
    servicePrincipal: z.lazy(() => marshalServicePrincipalSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    service_principal: d.servicePrincipal,
  }));

export const marshalCreateUserProxyRequestSchema = z
  .object({
    user: z.lazy(() => marshalUserSchema).optional(),
  })
  .transform(d => ({
    user: d.user,
  }));

export const marshalCreateUserRequestSchema = z
  .object({
    accountId: z.string().optional(),
    user: z.lazy(() => marshalUserSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    user: d.user,
  }));

export const marshalCreateWorkspaceAssignmentDetailProxyRequestSchema = z
  .object({
    workspaceAssignmentDetail: z
      .lazy(() => marshalWorkspaceAssignmentDetailSchema)
      .optional(),
  })
  .transform(d => ({
    workspace_assignment_detail: d.workspaceAssignmentDetail,
  }));

export const marshalCreateWorkspaceAssignmentDetailRequestSchema = z
  .object({
    accountId: z.string().optional(),
    workspaceId: z.number().optional(),
    workspaceAssignmentDetail: z
      .lazy(() => marshalWorkspaceAssignmentDetailSchema)
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    workspace_id: d.workspaceId,
    workspace_assignment_detail: d.workspaceAssignmentDetail,
  }));

export const marshalDeleteAccountAccessIdentityRuleRequestSchema = z
  .object({
    accountId: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    external_id: d.externalId,
  }));

export const marshalDeleteDirectGroupMemberProxyRequestSchema = z
  .object({
    groupId: z.number().optional(),
    principalId: z.number().optional(),
  })
  .transform(d => ({
    group_id: d.groupId,
    principal_id: d.principalId,
  }));

export const marshalDeleteDirectGroupMemberRequestSchema = z
  .object({
    accountId: z.string().optional(),
    groupId: z.number().optional(),
    principalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    group_id: d.groupId,
    principal_id: d.principalId,
  }));

export const marshalDeleteGroupProxyRequestSchema = z
  .object({
    internalId: z.number().optional(),
  })
  .transform(d => ({
    internal_id: d.internalId,
  }));

export const marshalDeleteGroupRequestSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
  }));

export const marshalDeleteServicePrincipalProxyRequestSchema = z
  .object({
    internalId: z.number().optional(),
  })
  .transform(d => ({
    internal_id: d.internalId,
  }));

export const marshalDeleteServicePrincipalRequestSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
  }));

export const marshalDeleteUserProxyRequestSchema = z
  .object({
    internalId: z.number().optional(),
  })
  .transform(d => ({
    internal_id: d.internalId,
  }));

export const marshalDeleteUserRequestSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
  }));

export const marshalDeleteWorkspaceAssignmentDetailProxyRequestSchema = z
  .object({
    principalId: z.number().optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
  }));

export const marshalDeleteWorkspaceAssignmentDetailRequestSchema = z
  .object({
    accountId: z.string().optional(),
    workspaceId: z.number().optional(),
    principalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    workspace_id: d.workspaceId,
    principal_id: d.principalId,
  }));

export const marshalDirectGroupMemberSchema = z
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

export const marshalGetAccountAccessIdentityRuleRequestSchema = z
  .object({
    accountId: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    external_id: d.externalId,
  }));

export const marshalGetGroupProxyRequestSchema = z
  .object({
    internalId: z.number().optional(),
  })
  .transform(d => ({
    internal_id: d.internalId,
  }));

export const marshalGetGroupRequestSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
  }));

export const marshalGetServicePrincipalProxyRequestSchema = z
  .object({
    internalId: z.number().optional(),
  })
  .transform(d => ({
    internal_id: d.internalId,
  }));

export const marshalGetServicePrincipalRequestSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
  }));

export const marshalGetUserProxyRequestSchema = z
  .object({
    internalId: z.number().optional(),
  })
  .transform(d => ({
    internal_id: d.internalId,
  }));

export const marshalGetUserRequestSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
  }));

export const marshalGetWorkspaceAccessDetailLocalRequestSchema = z
  .object({
    principalId: z.number().optional(),
    view: z.enum(WorkspaceAccessDetailView).optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
    view: d.view,
  }));

export const marshalGetWorkspaceAccessDetailRequestSchema = z
  .object({
    accountId: z.string().optional(),
    workspaceId: z.number().optional(),
    principalId: z.number().optional(),
    view: z.enum(WorkspaceAccessDetailView).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    workspace_id: d.workspaceId,
    principal_id: d.principalId,
    view: d.view,
  }));

export const marshalGetWorkspaceAssignmentDetailProxyRequestSchema = z
  .object({
    principalId: z.number().optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
  }));

export const marshalGetWorkspaceAssignmentDetailRequestSchema = z
  .object({
    accountId: z.string().optional(),
    workspaceId: z.number().optional(),
    principalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    workspace_id: d.workspaceId,
    principal_id: d.principalId,
  }));

export const marshalGroupSchema = z
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

export const marshalListAccountAccessIdentityRulesRequestSchema = z
  .object({
    accountId: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    page_size: d.pageSize,
    page_token: d.pageToken,
    filter: d.filter,
  }));

export const marshalListAccountAccessIdentityRulesResponseSchema = z
  .object({
    accountAccessIdentityRules: z
      .array(z.lazy(() => marshalAccountAccessIdentityRuleSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    account_access_identity_rules: d.accountAccessIdentityRules,
    next_page_token: d.nextPageToken,
  }));

export const marshalListDirectGroupMembersProxyRequestSchema = z
  .object({
    groupId: z.number().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    group_id: d.groupId,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListDirectGroupMembersRequestSchema = z
  .object({
    accountId: z.string().optional(),
    groupId: z.number().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    group_id: d.groupId,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListDirectGroupMembersResponseSchema = z
  .object({
    directGroupMembers: z
      .array(z.lazy(() => marshalDirectGroupMemberSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    direct_group_members: d.directGroupMembers,
    next_page_token: d.nextPageToken,
  }));

export const marshalListGroupsProxyRequestSchema = z
  .object({
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    page_size: d.pageSize,
    page_token: d.pageToken,
    filter: d.filter,
  }));

export const marshalListGroupsRequestSchema = z
  .object({
    accountId: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    page_size: d.pageSize,
    page_token: d.pageToken,
    filter: d.filter,
  }));

export const marshalListGroupsResponseSchema = z
  .object({
    groups: z.array(z.lazy(() => marshalGroupSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    groups: d.groups,
    next_page_token: d.nextPageToken,
  }));

export const marshalListServicePrincipalsProxyRequestSchema = z
  .object({
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    page_size: d.pageSize,
    page_token: d.pageToken,
    filter: d.filter,
  }));

export const marshalListServicePrincipalsRequestSchema = z
  .object({
    accountId: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    page_size: d.pageSize,
    page_token: d.pageToken,
    filter: d.filter,
  }));

export const marshalListServicePrincipalsResponseSchema = z
  .object({
    servicePrincipals: z
      .array(z.lazy(() => marshalServicePrincipalSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    service_principals: d.servicePrincipals,
    next_page_token: d.nextPageToken,
  }));

export const marshalListTransitiveParentGroupsProxyRequestSchema = z
  .object({
    principalId: z.number().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListTransitiveParentGroupsRequestSchema = z
  .object({
    accountId: z.string().optional(),
    principalId: z.number().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    principal_id: d.principalId,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListTransitiveParentGroupsResponseSchema = z
  .object({
    transitiveParentGroups: z
      .array(z.lazy(() => marshalTransitiveParentGroupSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    transitive_parent_groups: d.transitiveParentGroups,
    next_page_token: d.nextPageToken,
  }));

export const marshalListUsersProxyRequestSchema = z
  .object({
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    page_size: d.pageSize,
    page_token: d.pageToken,
    filter: d.filter,
  }));

export const marshalListUsersRequestSchema = z
  .object({
    accountId: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    page_size: d.pageSize,
    page_token: d.pageToken,
    filter: d.filter,
  }));

export const marshalListUsersResponseSchema = z
  .object({
    users: z.array(z.lazy(() => marshalUserSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    users: d.users,
    next_page_token: d.nextPageToken,
  }));

export const marshalListWorkspaceAccessDetailsLocalRequestSchema = z
  .object({
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListWorkspaceAccessDetailsRequestSchema = z
  .object({
    accountId: z.string().optional(),
    workspaceId: z.number().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    workspace_id: d.workspaceId,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListWorkspaceAccessDetailsResponseSchema = z
  .object({
    workspaceAccessDetails: z
      .array(z.lazy(() => marshalWorkspaceAccessDetailSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    workspace_access_details: d.workspaceAccessDetails,
    next_page_token: d.nextPageToken,
  }));

export const marshalListWorkspaceAssignmentDetailsProxyRequestSchema = z
  .object({
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListWorkspaceAssignmentDetailsRequestSchema = z
  .object({
    accountId: z.string().optional(),
    workspaceId: z.number().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    workspace_id: d.workspaceId,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListWorkspaceAssignmentDetailsResponseSchema = z
  .object({
    workspaceAssignmentDetails: z
      .array(z.lazy(() => marshalWorkspaceAssignmentDetailSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    workspace_assignment_details: d.workspaceAssignmentDetails,
    next_page_token: d.nextPageToken,
  }));

export const marshalMatchGroupWithIdpRequestSchema = z
  .object({
    accountId: z.string().optional(),
    groupId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    group_id: d.groupId,
  }));

export const marshalMatchGroupWithIdpResponseSchema = z
  .object({
    databricksGroup: z.lazy(() => marshalGroupSchema).optional(),
    idpMatchesByGroupName: z.array(z.lazy(() => marshalGroupSchema)).optional(),
    idpMatchByExternalId: z.lazy(() => marshalGroupSchema).optional(),
    localMembersNotInIdp: z
      .array(z.lazy(() => marshalDirectGroupMemberSchema))
      .optional(),
    externalMembersNotInIdp: z
      .array(z.lazy(() => marshalDirectGroupMemberSchema))
      .optional(),
  })
  .transform(d => ({
    databricks_group: d.databricksGroup,
    idp_matches_by_group_name: d.idpMatchesByGroupName,
    idp_match_by_external_id: d.idpMatchByExternalId,
    local_members_not_in_idp: d.localMembersNotInIdp,
    external_members_not_in_idp: d.externalMembersNotInIdp,
  }));

export const marshalMatchServicePrincipalWithIdpRequestSchema = z
  .object({
    accountId: z.string().optional(),
    servicePrincipalId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    service_principal_id: d.servicePrincipalId,
  }));

export const marshalMatchServicePrincipalWithIdpResponseSchema = z
  .object({
    databricksServicePrincipal: z
      .lazy(() => marshalServicePrincipalSchema)
      .optional(),
    idpMatchByAppId: z.lazy(() => marshalServicePrincipalSchema).optional(),
    idpMatchByExternalId: z
      .lazy(() => marshalServicePrincipalSchema)
      .optional(),
  })
  .transform(d => ({
    databricks_service_principal: d.databricksServicePrincipal,
    idp_match_by_app_id: d.idpMatchByAppId,
    idp_match_by_external_id: d.idpMatchByExternalId,
  }));

export const marshalMatchUserWithIdpRequestSchema = z
  .object({
    accountId: z.string().optional(),
    userId: z.number().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    user_id: d.userId,
  }));

export const marshalMatchUserWithIdpResponseSchema = z
  .object({
    databricksUser: z.lazy(() => marshalUserSchema).optional(),
    idpMatchByUsername: z.lazy(() => marshalUserSchema).optional(),
    idpMatchByExternalId: z.lazy(() => marshalUserSchema).optional(),
  })
  .transform(d => ({
    databricks_user: d.databricksUser,
    idp_match_by_username: d.idpMatchByUsername,
    idp_match_by_external_id: d.idpMatchByExternalId,
  }));

export const marshalResolveGroupProxyRequestSchema = z
  .object({
    externalId: z.string().optional(),
  })
  .transform(d => ({
    external_id: d.externalId,
  }));

export const marshalResolveGroupRequestSchema = z
  .object({
    accountId: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    external_id: d.externalId,
  }));

export const marshalResolveGroupResponseSchema = z
  .object({
    group: z.lazy(() => marshalGroupSchema).optional(),
  })
  .transform(d => ({
    group: d.group,
  }));

export const marshalResolveServicePrincipalProxyRequestSchema = z
  .object({
    externalId: z.string().optional(),
  })
  .transform(d => ({
    external_id: d.externalId,
  }));

export const marshalResolveServicePrincipalRequestSchema = z
  .object({
    accountId: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    external_id: d.externalId,
  }));

export const marshalResolveServicePrincipalResponseSchema = z
  .object({
    servicePrincipal: z.lazy(() => marshalServicePrincipalSchema).optional(),
  })
  .transform(d => ({
    service_principal: d.servicePrincipal,
  }));

export const marshalResolveUserProxyRequestSchema = z
  .object({
    externalId: z.string().optional(),
  })
  .transform(d => ({
    external_id: d.externalId,
  }));

export const marshalResolveUserRequestSchema = z
  .object({
    accountId: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    external_id: d.externalId,
  }));

export const marshalResolveUserResponseSchema = z
  .object({
    user: z.lazy(() => marshalUserSchema).optional(),
  })
  .transform(d => ({
    user: d.user,
  }));

export const marshalServicePrincipalSchema = z
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

export const marshalTransitiveParentGroupSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
    external_id: d.externalId,
  }));

export const marshalUpdateGroupProxyRequestSchema = z
  .object({
    internalId: z.number().optional(),
    group: z.lazy(() => marshalGroupSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    internal_id: d.internalId,
    group: d.group,
    update_mask: d.updateMask,
  }));

export const marshalUpdateGroupRequestSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
    group: z.lazy(() => marshalGroupSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
    group: d.group,
    update_mask: d.updateMask,
  }));

export const marshalUpdateServicePrincipalProxyRequestSchema = z
  .object({
    internalId: z.number().optional(),
    servicePrincipal: z.lazy(() => marshalServicePrincipalSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    internal_id: d.internalId,
    service_principal: d.servicePrincipal,
    update_mask: d.updateMask,
  }));

export const marshalUpdateServicePrincipalRequestSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
    servicePrincipal: z.lazy(() => marshalServicePrincipalSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
    service_principal: d.servicePrincipal,
    update_mask: d.updateMask,
  }));

export const marshalUpdateUserProxyRequestSchema = z
  .object({
    internalId: z.number().optional(),
    user: z.lazy(() => marshalUserSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    internal_id: d.internalId,
    user: d.user,
    update_mask: d.updateMask,
  }));

export const marshalUpdateUserRequestSchema = z
  .object({
    accountId: z.string().optional(),
    internalId: z.number().optional(),
    user: z.lazy(() => marshalUserSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    internal_id: d.internalId,
    user: d.user,
    update_mask: d.updateMask,
  }));

export const marshalUpdateWorkspaceAssignmentDetailProxyRequestSchema = z
  .object({
    principalId: z.number().optional(),
    workspaceAssignmentDetail: z
      .lazy(() => marshalWorkspaceAssignmentDetailSchema)
      .optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
    workspace_assignment_detail: d.workspaceAssignmentDetail,
    update_mask: d.updateMask,
  }));

export const marshalUpdateWorkspaceAssignmentDetailRequestSchema = z
  .object({
    accountId: z.string().optional(),
    workspaceId: z.number().optional(),
    principalId: z.number().optional(),
    workspaceAssignmentDetail: z
      .lazy(() => marshalWorkspaceAssignmentDetailSchema)
      .optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    workspace_id: d.workspaceId,
    principal_id: d.principalId,
    workspace_assignment_detail: d.workspaceAssignmentDetail,
    update_mask: d.updateMask,
  }));

export const marshalUserSchema = z
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

export const marshalUser_NameSchema = z
  .object({
    givenName: z.string().optional(),
    familyName: z.string().optional(),
  })
  .transform(d => ({
    given_name: d.givenName,
    family_name: d.familyName,
  }));

export const marshalWorkspaceAccessDetailSchema = z
  .object({
    principalId: z.number().optional(),
    workspaceId: z.number().optional(),
    accountId: z.string().optional(),
    principalType: z.enum(PrincipalType).optional(),
    accessType: z.enum(WorkspaceAccessDetail_AccessType).optional(),
    status: z.enum(State).optional(),
    permissions: z.array(z.enum(WorkspacePermission)).optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
    workspace_id: d.workspaceId,
    account_id: d.accountId,
    principal_type: d.principalType,
    access_type: d.accessType,
    status: d.status,
    permissions: d.permissions,
  }));

export const marshalWorkspaceAssignmentDetailSchema = z
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
