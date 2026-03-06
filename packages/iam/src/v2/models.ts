// Automatically generated. Do not edit.

/**  The type of access the principal has to the workspace.
 */
export type AccessType =
  | 'ACCESS_TYPE_UNSPECIFIED'
  | 'DIRECT'
  | 'INDIRECT';

/**  The action type for an account access identity rule (currently DENY only).
 */
export type AccountAccessRuleAction =
  | 'ACCOUNT_ACCESS_RULE_ACTION_UNSPECIFIED'
  | 'DENY';

/**  The source of the group membership (internal or from identity provider).
 */
export type GroupMembershipSource =
  | 'GROUP_MEMBERSHIP_SOURCE_UNSPECIFIED'
  | 'INTERNAL'
  | 'IDENTITY_PROVIDER';

/**  The type of the principal (user/sp/group).
 */
export type PrincipalType =
  | 'PRINCIPAL_TYPE_UNSPECIFIED'
  | 'USER'
  | 'SERVICE_PRINCIPAL'
  | 'GROUP';

/**  The activity status of a user or service principal in a <Databricks> account or workspace.
 */
export type State =
  | 'STATE_UNSPECIFIED'
  | 'ACTIVE'
  | 'INACTIVE';

/**  Controls what fields are returned in the GetWorkspaceAccessDetail response.
 */
export type WorkspaceAccessDetailView =
  | 'WORKSPACE_ACCESS_DETAIL_VIEW_UNSPECIFIED'
  | 'BASIC'
  | 'FULL';

/**  The type of permission a principal has to a workspace (admin/user).
 */
export type WorkspacePermission =
  | 'WORKSPACE_PERMISSION_UNSPECIFIED'
  | 'USER_PERMISSION'
  | 'ADMIN_PERMISSION';

/**  An identity rule that controls which principals can access an account.
 */
export interface AccountAccessIdentityRule {
  action?: AccountAccessRuleAction;
  externalId?: string;
  displayName?: string;
  principalType?: PrincipalType;
}

/**  Request message for creating an account access identity rule.
 */
export interface CreateAccountAccessIdentityRuleRequest {
  accountId?: string;
  accountAccessIdentityRule?: AccountAccessIdentityRule;
}

/**  Request message for creating a group membership (assigning a principal to a group).
 */
export interface CreateGroupMembershipProxyRequest {
  groupId?: number;
  groupMembership?: GroupMembership;
}

/**  Request message for creating a group membership (assigning a principal to a group).
 */
export interface CreateGroupMembershipRequest {
  accountId?: string;
  groupId?: number;
  groupMembership?: GroupMembership;
}

/**  TODO: Write description later when this method is implemented
 */
export interface CreateGroupProxyRequest {
  group?: Group;
}

/**  TODO: Write description later when this method is implemented
 */
export interface CreateGroupRequest {
  accountId?: string;
  group?: Group;
}

/**  TODO: Write description later when this method is implemented
 */
export interface CreateServicePrincipalProxyRequest {
  servicePrincipal?: ServicePrincipal;
}

/**  TODO: Write description later when this method is implemented
 */
export interface CreateServicePrincipalRequest {
  accountId?: string;
  servicePrincipal?: ServicePrincipal;
}

/**  
 Creates a user in Databricks and provisions it at the account level.
 Behavior depends on whether Account Identity Management (AIM) is enabled:
 - When AIM is enabled:
   The user is provisioned with an internalId. If an externalId is provided, the identity provider is
   treated as the source of truth for user metadata, and customer-supplied field values may be overridden.
 - When AIM is disabled:
   The user is provisioned with an internalId only, and customer-supplied metadata is used as-is.
 */
export interface CreateUserProxyRequest {
  user?: User;
}

/**  
 Creates a user in Databricks and provisions it at the account level.
 Behavior depends on whether Account Identity Management (AIM) is enabled:
 - When AIM is enabled:
   The user is provisioned with an internalId. If an externalId is provided, the identity provider is
   treated as the source of truth for user metadata, and customer-supplied field values may be overridden.
 - When AIM is disabled:
   The user is provisioned with an internalId only, and customer-supplied metadata is used as-is.
 */
export interface CreateUserRequest {
  accountId?: string;
  user?: User;
}

/**  Assign an identity directly to a workspace with the specified permissions and workspace-level status.
 */
export interface CreateWorkspaceAssignmentDetailRequest {
  accountId?: string;
  workspaceId?: number;
  workspaceAssignmentDetail?: WorkspaceAssignmentDetail;
}

/**  Request message for deleting an account access identity rule.
 */
export interface DeleteAccountAccessIdentityRuleRequest {
  accountId?: string;
  externalId?: string;
}

/**  Request message for deleting a group membership (unassigning a principal from a group).
 */
export interface DeleteGroupMembershipProxyRequest {
  groupId?: number;
  principalId?: number;
}

/**  Request message for deleting a group membership (unassigning a principal from a group).
 */
export interface DeleteGroupMembershipRequest {
  accountId?: string;
  groupId?: number;
  principalId?: number;
}

/**  TODO: Write description later when this method is implemented
 */
export interface DeleteGroupProxyRequest {
  internalId?: number;
}

/**  TODO: Write description later when this method is implemented
 */
export interface DeleteGroupRequest {
  accountId?: string;
  internalId?: number;
}

/**  TODO: Write description later when this method is implemented
 */
export interface DeleteServicePrincipalProxyRequest {
  internalId?: number;
}

/**  TODO: Write description later when this method is implemented
 */
export interface DeleteServicePrincipalRequest {
  accountId?: string;
  internalId?: number;
}

/**  TODO: Write description later when this method is implemented
 */
export interface DeleteUserProxyRequest {
  internalId?: number;
}

/**  TODO: Write description later when this method is implemented
 */
export interface DeleteUserRequest {
  accountId?: string;
  internalId?: number;
}

/**  If the identity is directly assigned to the workspace, remove its assignment from the workspace
 */
export interface DeleteWorkspaceAssignmentDetailRequest {
  accountId?: string;
  workspaceId?: number;
  principalId?: number;
}

/**  Represents a principal that is a direct member of a group, with its source of membership.
 */
export interface DirectGroupMember {
  principalId?: number;
  principalType?: PrincipalType;
  membershipSource?: GroupMembershipSource;
  displayName?: string;
  externalId?: string;
}

/**  Request message for getting an account access identity rule.
 */
export interface GetAccountAccessIdentityRuleRequest {
  accountId?: string;
  externalId?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface GetGroupProxyRequest {
  internalId?: number;
}

/**  TODO: Write description later when this method is implemented
 */
export interface GetGroupRequest {
  accountId?: string;
  internalId?: number;
}

/**  TODO: Write description later when this method is implemented
 */
export interface GetServicePrincipalProxyRequest {
  internalId?: number;
}

/**  TODO: Write description later when this method is implemented
 */
export interface GetServicePrincipalRequest {
  accountId?: string;
  internalId?: number;
}

/**  
 Creates a user in Databricks and returns the resulting User resource.
 Readability of the created user depends on Account Identity Management (AIM)
 and the configured Boundary Enforcement mode:
 - When AIM is enabled and Boundary Enforcement is set to RULES_ONLY:
   - MVP: Any user with an internalId is readable, including users with an
     externalId populated.
   - Phase 2: Behavior to be defined.
 - When AIM is enabled and Boundary Enforcement is set to ALLOW_ALL:
   - Any user with an internalId is readable, including users with an
     externalId populated.
 - When AIM is disabled:
   - Returns the User resource corresponding to the given internalId.
 */
export interface GetUserProxyRequest {
  internalId?: number;
}

/**  
 Creates a user in Databricks and returns the resulting User resource.
 Readability of the created user depends on Account Identity Management (AIM)
 and the configured Boundary Enforcement mode:
 - When AIM is enabled and Boundary Enforcement is set to RULES_ONLY:
   - MVP: Any user with an internalId is readable, including users with an
     externalId populated.
   - Phase 2: Behavior to be defined.
 - When AIM is enabled and Boundary Enforcement is set to ALLOW_ALL:
   - Any user with an internalId is readable, including users with an
     externalId populated.
 - When AIM is disabled:
   - Returns the User resource corresponding to the given internalId.
 */
export interface GetUserRequest {
  accountId?: string;
  internalId?: number;
}

/**  Request message for getting the access details for a principal in the current workspace.
 */
export interface GetWorkspaceAccessDetailLocalRequest {
  principalId?: number;
  view?: WorkspaceAccessDetailView;
}

/**  Request message for getting the access details for a principal in a workspace.
 */
export interface GetWorkspaceAccessDetailRequest {
  accountId?: string;
  workspaceId?: number;
  principalId?: number;
  view?: WorkspaceAccessDetailView;
}

/**  Get the workspace assignment details of a principal that is provisioned in the account and directly assigned to a workspace
 */
export interface GetWorkspaceAssignmentDetailRequest {
  accountId?: string;
  workspaceId?: number;
  principalId?: number;
}

/**  The details of a Group resource.
 */
export interface Group {
  accountId?: string;
  internalId?: number;
  externalId?: string;
  groupName?: string;
}

/**  Represents membership of a principal (group/user/service principal) in a group.
 */
export interface GroupMembership {
  accountId?: string;
  groupId?: number;
  principalId?: number;
}

/**  Request message for listing account access identity rules.
 */
export interface ListAccountAccessIdentityRulesRequest {
  accountId?: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

/**  Response message for listing account access identity rules.
 */
export interface ListAccountAccessIdentityRulesResponse {
  accountAccessIdentityRules?: AccountAccessIdentityRule[];
  nextPageToken?: string;
}

/**  Request message for listing provisioned direct group members.
 */
export interface ListDirectGroupMembersProxyRequest {
  groupId?: number;
  pageSize?: number;
  pageToken?: string;
}

/**  Request message for listing provisioned direct group members.
 */
export interface ListDirectGroupMembersRequest {
  accountId?: string;
  groupId?: number;
  pageSize?: number;
  pageToken?: string;
}

/**  Response message for listing direct group members.
 */
export interface ListDirectGroupMembersResponse {
  directGroupMembers?: DirectGroupMember[];
  nextPageToken?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface ListGroupsProxyRequest {
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface ListGroupsRequest {
  accountId?: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface ListGroupsResponse {
  groups?: Group[];
  nextPageToken?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface ListServicePrincipalsProxyRequest {
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface ListServicePrincipalsRequest {
  accountId?: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface ListServicePrincipalsResponse {
  servicePrincipals?: ServicePrincipal[];
  nextPageToken?: string;
}

/**  Request message for listing all transitive parent groups of a principal.
 */
export interface ListTransitiveParentGroupsProxyRequest {
  principalId?: number;
  pageSize?: number;
  pageToken?: string;
}

/**  Request message for listing all transitive parent groups of a principal.
 */
export interface ListTransitiveParentGroupsRequest {
  accountId?: string;
  principalId?: number;
  pageSize?: number;
  pageToken?: string;
}

/**  Response message for listing all transitive parent groups of a principal.
 */
export interface ListTransitiveParentGroupsResponse {
  transitiveParentGroups?: TransitiveParentGroup[];
  nextPageToken?: string;
}

/**  
 Returns a paginated list of account-level users.
 Behavior depends on whether Account Identity Management (AIM) is enabled:
 - When AIM is enabled:
   - The "externalId eq" filter only evaluates provisioned Databricks users
     that have an internalId.
   - The "username eq" filter only evaluates provisioned Databricks users
     that have an internalId.
   - Listing without filters returns all provisioned Databricks users.
   - AIM Boundary Enforcement Phase 2: Behavior to be defined.
 - When AIM is disabled:
   - The "externalId eq" filter only evaluates provisioned Databricks users
     that have an internalId.
   - The "username eq" filter only evaluates provisioned Databricks users
     that have an internalId.
   - Listing without filters returns all provisioned Databricks users.
 */
export interface ListUsersProxyRequest {
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

/**  
 Returns a paginated list of account-level users.
 Behavior depends on whether Account Identity Management (AIM) is enabled:
 - When AIM is enabled:
   - The "externalId eq" filter only evaluates provisioned Databricks users
     that have an internalId.
   - The "username eq" filter only evaluates provisioned Databricks users
     that have an internalId.
   - Listing without filters returns all provisioned Databricks users.
   - AIM Boundary Enforcement Phase 2: Behavior to be defined.
 - When AIM is disabled:
   - The "externalId eq" filter only evaluates provisioned Databricks users
     that have an internalId.
   - The "username eq" filter only evaluates provisioned Databricks users
     that have an internalId.
   - Listing without filters returns all provisioned Databricks users.
 */
export interface ListUsersRequest {
  accountId?: string;
  pageSize?: number;
  pageToken?: string;
  filter?: string;
}

export interface ListUsersResponse {
  users?: User[];
  nextPageToken?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface ListWorkspaceAccessDetailsLocalRequest {
  pageSize?: number;
  pageToken?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface ListWorkspaceAccessDetailsRequest {
  accountId?: string;
  workspaceId?: number;
  pageSize?: number;
  pageToken?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface ListWorkspaceAccessDetailsResponse {
  workspaceAccessDetails?: WorkspaceAccessDetail[];
  nextPageToken?: string;
}

/**  Returns a paginated list of direct assignments to the workspace.
 */
export interface ListWorkspaceAssignmentDetailsRequest {
  accountId?: string;
  workspaceId?: number;
  pageSize?: number;
  pageToken?: string;
}

/**  Response message for listing workspace assignment details.
 */
export interface ListWorkspaceAssignmentDetailsResponse {
  workspaceAssignmentDetails?: WorkspaceAssignmentDetail[];
  nextPageToken?: string;
}

/**  
 Request message for matching a group against the IDP.
 This will perform a sync by group_id before performing analysis to update local data which is safe to fix.
 */
export interface MatchGroupWithIdpRequest {
  accountId?: string;
  groupId?: number;
}

/**  Response message for matching a group against the IDP.
 */
export interface MatchGroupWithIdpResponse {
  databricksGroup?: Group;
  idpMatchesByGroupName?: Group[];
  idpMatchByExternalId?: Group;
  localMembersNotInIdp?: DirectGroupMember[];
  externalMembersNotInIdp?: DirectGroupMember[];
}

/**  
 Request message for matching a service principal against the IDP.
 This will perform a sync by service_principal_id before performing analysis to update local data which is safe to fix.
 */
export interface MatchServicePrincipalWithIdpRequest {
  accountId?: string;
  servicePrincipalId?: number;
}

/**  Response message for matching a service principal against the IDP.
 */
export interface MatchServicePrincipalWithIdpResponse {
  databricksServicePrincipal?: ServicePrincipal;
  idpMatchByAppId?: ServicePrincipal;
  idpMatchByExternalId?: ServicePrincipal;
}

/**  
 Request message for matching a user against the IDP.
 This will perform a sync by user_id before performing analysis to update local data which is safe to fix.
 */
export interface MatchUserWithIdpRequest {
  accountId?: string;
  userId?: number;
}

/**  Response message for matching a user against the IDP.
 */
export interface MatchUserWithIdpResponse {
  databricksUser?: User;
  idpMatchByUsername?: User;
  idpMatchByExternalId?: User;
}

export type Name = Record<string, never>;

/**  
 Request message for resolving a group with the given external ID from the customer's IdP into <Databricks>.
 Will resolve metadata such as the group's groupname, and inherited parent groups.
 */
export interface ResolveGroupProxyRequest {
  externalId?: string;
}

/**  
 Request message for resolving a group with the given external ID from the customer's IdP into <Databricks>.
 Will resolve metadata such as the group's groupname, and inherited parent groups.
 */
export interface ResolveGroupRequest {
  accountId?: string;
  externalId?: string;
}

export interface ResolveGroupResponse {
  group?: Group;
}

/**  
 Request message for resolving a service principal with the given external ID from the customer's IdP into <Databricks>.
 Will resolve metadata such as the service principal's displayname, status, and inherited parent groups.
 */
export interface ResolveServicePrincipalProxyRequest {
  externalId?: string;
}

/**  
 Request message for resolving a service principal with the given external ID from the customer's IdP into <Databricks>.
 Will resolve metadata such as the service principal's displayname, status, and inherited parent groups.
 */
export interface ResolveServicePrincipalRequest {
  accountId?: string;
  externalId?: string;
}

export interface ResolveServicePrincipalResponse {
  servicePrincipal?: ServicePrincipal;
}

/**  
 Request message for resolving a user with the given external ID from the customer's IdP into <Databricks>.
 Will resolve metadata such as the user's displayname, status, and inherited parent groups.
 */
export interface ResolveUserProxyRequest {
  externalId?: string;
}

/**  
 Request message for resolving a user with the given external ID from the customer's IdP into <Databricks>.
 Will resolve metadata such as the user's displayname, status, and inherited parent groups.
 */
export interface ResolveUserRequest {
  accountId?: string;
  externalId?: string;
}

export interface ResolveUserResponse {
  user?: User;
}

/**  The details of a ServicePrincipal resource.
 */
export interface ServicePrincipal {
  accountId?: string;
  internalId?: number;
  externalId?: string;
  applicationId?: string;
  displayName?: string;
  accountSpStatus?: State;
}

/**  Represents a group that is a transitive parent of a principal.
 */
export interface TransitiveParentGroup {
  accountId?: string;
  internalId?: number;
  externalId?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface UpdateGroupProxyRequest {
  internalId?: number;
  group?: Group;
  updateMask?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface UpdateGroupRequest {
  accountId?: string;
  internalId?: number;
  group?: Group;
  updateMask?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface UpdateServicePrincipalProxyRequest {
  internalId?: number;
  servicePrincipal?: ServicePrincipal;
  updateMask?: string;
}

/**  TODO: Write description later when this method is implemented
 */
export interface UpdateServicePrincipalRequest {
  accountId?: string;
  internalId?: number;
  servicePrincipal?: ServicePrincipal;
  updateMask?: string;
}

/**  
 Updates an existing user in Databricks. The behavior is consistent regardless of whether
 Account Identity Management (AIM) is enabled or disabled. The following fields are updatable:
 - name.familyName
 - name.givenName
 - status
 - externalId
 */
export interface UpdateUserProxyRequest {
  internalId?: number;
  user?: User;
  updateMask?: string;
}

/**  
 Updates an existing user in Databricks. The behavior is consistent regardless of whether
 Account Identity Management (AIM) is enabled or disabled. The following fields are updatable:
 - name.familyName
 - name.givenName
 - status
 - externalId
 */
export interface UpdateUserRequest {
  accountId?: string;
  internalId?: number;
  user?: User;
  updateMask?: string;
}

/**  TBD since the only updatable field is permissions
 */
export interface UpdateWorkspaceAssignmentDetailRequest {
  accountId?: string;
  workspaceId?: number;
  principalId?: number;
  workspaceAssignmentDetail?: WorkspaceAssignmentDetail;
  updateMask?: string;
}

/**  The details of a User resource.
 */
export interface User {
  accountId?: string;
  internalId?: number;
  externalId?: string;
  username?: string;
  name?: Name;
  accountUserStatus?: State;
}

/**  The details of a principal's access to a workspace.
 */
export interface WorkspaceAccessDetail {
  principalId?: number;
  workspaceId?: number;
  accountId?: string;
  principalType?: PrincipalType;
  accessType?: AccessType;
  status?: State;
  permissions?: WorkspacePermission[];
}

/**  The details of a principal's assignment to a workspace.
 */
export interface WorkspaceAssignmentDetail {
  principalId?: number;
  workspaceId?: number;
  accountId?: string;
  principalType?: PrincipalType;
}
