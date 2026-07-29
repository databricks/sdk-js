// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {JsonValue} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.number(),
    z.string(),
    z.boolean(),
    z.record(z.string(), jsonValueSchema),
    z.array(jsonValueSchema),
  ])
);

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const GetSortOrder = {
  GET_SORT_ORDER_UNSPECIFIED: 'GET_SORT_ORDER_UNSPECIFIED',
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
} as const;
export type GetSortOrder =
  | (typeof GetSortOrder)[keyof typeof GetSortOrder]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const GroupSchema = {
  GROUP_SCHEMA_UNSPECIFIED: 'GROUP_SCHEMA_UNSPECIFIED',
  URN_IETF_PARAMS_SCIM_SCHEMAS_CORE_2_0_GROUP:
    'urn:ietf:params:scim:schemas:core:2.0:Group',
} as const;
export type GroupSchema =
  | (typeof GroupSchema)[keyof typeof GroupSchema]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ListResponseSchema = {
  LIST_RESPONSE_SCHEMA_UNSPECIFIED: 'LIST_RESPONSE_SCHEMA_UNSPECIFIED',
  URN_IETF_PARAMS_SCIM_API_MESSAGES_2_0_LIST_RESPONSE:
    'urn:ietf:params:scim:api:messages:2.0:ListResponse',
} as const;
export type ListResponseSchema =
  | (typeof ListResponseSchema)[keyof typeof ListResponseSchema]
  | (string & {});

/** Type of patch operation. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PatchOp = {
  PATCH_OP_UNSPECIFIED: 'PATCH_OP_UNSPECIFIED',
  ADD: 'add',
  REMOVE: 'remove',
  REPLACE: 'replace',
} as const;
export type PatchOp = (typeof PatchOp)[keyof typeof PatchOp] | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PatchSchema = {
  PATCH_SCHEMA_UNSPECIFIED: 'PATCH_SCHEMA_UNSPECIFIED',
  URN_IETF_PARAMS_SCIM_API_MESSAGES_2_0_PATCH_OP:
    'urn:ietf:params:scim:api:messages:2.0:PatchOp',
} as const;
export type PatchSchema =
  | (typeof PatchSchema)[keyof typeof PatchSchema]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ServicePrincipalSchema = {
  SERVICE_PRINCIPAL_SCHEMA_UNSPECIFIED: 'SERVICE_PRINCIPAL_SCHEMA_UNSPECIFIED',
  URN_IETF_PARAMS_SCIM_SCHEMAS_CORE_2_0_SERVICE_PRINCIPAL:
    'urn:ietf:params:scim:schemas:core:2.0:ServicePrincipal',
} as const;
export type ServicePrincipalSchema =
  | (typeof ServicePrincipalSchema)[keyof typeof ServicePrincipalSchema]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const UserSchema = {
  USER_SCHEMA_UNSPECIFIED: 'USER_SCHEMA_UNSPECIFIED',
  URN_IETF_PARAMS_SCIM_SCHEMAS_CORE_2_0_USER:
    'urn:ietf:params:scim:schemas:core:2.0:User',
  URN_IETF_PARAMS_SCIM_SCHEMAS_EXTENSION_WORKSPACE_2_0_USER:
    'urn:ietf:params:scim:schemas:extension:workspace:2.0:User',
} as const;
export type UserSchema =
  | (typeof UserSchema)[keyof typeof UserSchema]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AccountGetSortOrder_GetSortOrder = {
  GET_SORT_ORDER_UNSPECIFIED: 'GET_SORT_ORDER_UNSPECIFIED',
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AccountGetSortOrder_GetSortOrder =
  | (typeof AccountGetSortOrder_GetSortOrder)[keyof typeof AccountGetSortOrder_GetSortOrder]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AccountListSort_Order = {
  ORDER_UNSPECIFIED: 'ORDER_UNSPECIFIED',
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AccountListSort_Order =
  | (typeof AccountListSort_Order)[keyof typeof AccountListSort_Order]
  | (string & {});

/** Type of patch operation. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AccountPatchOp_PatchOp = {
  PATCH_OP_UNSPECIFIED: 'PATCH_OP_UNSPECIFIED',
  ADD: 'add',
  REMOVE: 'remove',
  REPLACE: 'replace',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AccountPatchOp_PatchOp =
  | (typeof AccountPatchOp_PatchOp)[keyof typeof AccountPatchOp_PatchOp]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AccountPatchSchema_PatchSchema = {
  PATCH_SCHEMA_UNSPECIFIED: 'PATCH_SCHEMA_UNSPECIFIED',
  URN_IETF_PARAMS_SCIM_API_MESSAGES_2_0_PATCH_OP:
    'urn:ietf:params:scim:api:messages:2.0:PatchOp',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AccountPatchSchema_PatchSchema =
  | (typeof AccountPatchSchema_PatchSchema)[keyof typeof AccountPatchSchema_PatchSchema]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ListSort_Order = {
  ORDER_UNSPECIFIED: 'ORDER_UNSPECIFIED',
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ListSort_Order =
  | (typeof ListSort_Order)[keyof typeof ListSort_Order]
  | (string & {});

/** Permission level */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PasswordPermission_Level = {
  LEVEL_UNSPECIFIED: 'LEVEL_UNSPECIFIED',
  CAN_USE: 'CAN_USE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PasswordPermission_Level =
  | (typeof PasswordPermission_Level)[keyof typeof PasswordPermission_Level]
  | (string & {});

export interface AccountComplexValue {
  display?: string | undefined;
  primary?: boolean | undefined;
  ref?: string | undefined;
  type?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountGetSortOrder {}

export interface AccountGroup {
  /** String that represents a human-readable group name */
  displayName?: string | undefined;
  /** external_id should be unique for identifying groups */
  externalId?: string | undefined;
  /** <Databricks> group ID */
  id?: string | undefined;
  members?: AccountComplexValue[] | undefined;
  /** Container for the group identifier. Workspace local versus account. */
  meta?: AccountResourceMeta | undefined;
  /** Indicates if the group has the admin role. */
  roles?: AccountComplexValue[] | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

/**
 * ListSortOrder and GetSortOrder share enum values, which is not supported.
 * We use nesting as a workaround.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountListSort {}

export interface AccountName {
  /** Family name of the <Databricks> user. */
  familyName?: string | undefined;
  /** Given name of the <Databricks> user. */
  givenName?: string | undefined;
}

export interface AccountPatch {
  /** Type of patch operation. */
  op?: AccountPatchOp_PatchOp | undefined;
  /** Selection of patch operation */
  path?: string | undefined;
  /** Value to modify */
  value?: JsonValue | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountPatchOp {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountPatchSchema {}

export interface AccountResourceMeta {
  /** Identifier for group type. Can be local workspace group (`WorkspaceGroup`) or account group (`Group`). */
  resourceType?: string | undefined;
}

export interface AccountServicePrincipal {
  /** If this user is active */
  active?: boolean | undefined;
  /** UUID relating to the service principal */
  applicationId?: string | undefined;
  /** String that represents a concatenation of given and family names. */
  displayName?: string | undefined;
  externalId?: string | undefined;
  /** <Databricks> service principal ID. */
  id?: string | undefined;
  /** Indicates if the group has the admin role. */
  roles?: AccountComplexValue[] | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface AccountUser {
  /** If this user is active */
  active?: boolean | undefined;
  /** String that represents a concatenation of given and family names. For example `John Smith`. */
  displayName?: string | undefined;
  /** All the emails associated with the <Databricks> user. */
  emails?: AccountComplexValue[] | undefined;
  /** External ID is not currently supported. It is reserved for future use. */
  externalId?: string | undefined;
  /** <Databricks> user ID. */
  id?: string | undefined;
  name?: AccountName | undefined;
  /** Indicates if the group has the admin role. */
  roles?: AccountComplexValue[] | undefined;
  /** Email address of the <Databricks> user. */
  userName?: string | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface ComplexValue {
  display?: string | undefined;
  primary?: boolean | undefined;
  ref?: string | undefined;
  type?: string | undefined;
  value?: string | undefined;
}

export interface CreateAccountComplexValue {
  display?: string | undefined;
  primary?: boolean | undefined;
  ref?: string | undefined;
  type?: string | undefined;
  value?: string | undefined;
}

export interface CreateAccountGroupRequest {
  /** String that represents a human-readable group name */
  displayName?: string | undefined;
  externalId?: string | undefined;
  /** <Databricks> group ID */
  id?: string | undefined;
  members?: CreateAccountComplexValue[] | undefined;
  /** Container  for the group identifier. Workspace local versus account. */
  meta?: CreateAccountResourceMeta | undefined;
  /** Indicates if the group has the admin role. */
  roles?: CreateAccountComplexValue[] | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface CreateAccountName {
  /** Family name of the <Databricks> user. */
  familyName?: string | undefined;
  /** Given name of the <Databricks> user. */
  givenName?: string | undefined;
}

export interface CreateAccountResourceMeta {
  /** Identifier for group type. Can be local workspace group (`WorkspaceGroup`) or account group (`Group`). */
  resourceType?: string | undefined;
}

export interface CreateAccountServicePrincipalRequest {
  /** If this user is active */
  active?: boolean | undefined;
  /** UUID relating to the service principal */
  applicationId?: string | undefined;
  /** String that represents a concatenation of given and family names. */
  displayName?: string | undefined;
  externalId?: string | undefined;
  /** <Databricks> service principal ID. */
  id?: string | undefined;
  /** Indicates if the group has the admin role. */
  roles?: CreateAccountComplexValue[] | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface CreateAccountUserRequest {
  /** If this user is active */
  active?: boolean | undefined;
  /** String that represents a concatenation of given and family names. For example `John Smith`. */
  displayName?: string | undefined;
  /** All the emails associated with the <Databricks> user. */
  emails?: CreateAccountComplexValue[] | undefined;
  /** External ID is not currently supported. It is reserved for future use. */
  externalId?: string | undefined;
  /** <Databricks> user ID. */
  id?: string | undefined;
  name?: CreateAccountName | undefined;
  /** Indicates if the group has the admin role. */
  roles?: CreateAccountComplexValue[] | undefined;
  /** Email address of the <Databricks> user. */
  userName?: string | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface CreateComplexValue {
  display?: string | undefined;
  primary?: boolean | undefined;
  ref?: string | undefined;
  type?: string | undefined;
  value?: string | undefined;
}

export interface CreateGroupRequest {
  /** String that represents a human-readable group name */
  displayName?: string | undefined;
  /** Entitlements assigned to the group. See [assigning entitlements](https://docs.databricks.com/administration-guide/users-groups/index.html#assigning-entitlements) for a full list of supported values. */
  entitlements?: CreateComplexValue[] | undefined;
  externalId?: string | undefined;
  groups?: CreateComplexValue[] | undefined;
  /** <Databricks> group ID */
  id?: string | undefined;
  members?: CreateComplexValue[] | undefined;
  /** Container  for the group identifier. Workspace local versus account. */
  meta?: CreateResourceMeta | undefined;
  /** Corresponds to AWS instance profile/arn role. */
  roles?: CreateComplexValue[] | undefined;
  /** The schema of the group. */
  schemas?: GroupSchema[] | undefined;
}

export interface CreateName {
  /** Family name of the <Databricks> user. */
  familyName?: string | undefined;
  /** Given name of the <Databricks> user. */
  givenName?: string | undefined;
}

export interface CreatePasswordAccessControlRequest {
  /** name of the group */
  groupName?: string | undefined;
  /** Permission level */
  permissionLevel?: PasswordPermission_Level | undefined;
  /** application ID of a service principal */
  servicePrincipalName?: string | undefined;
  /** name of the user */
  userName?: string | undefined;
}

export interface CreateResourceMeta {
  /** Identifier for group type. Can be local workspace group (`WorkspaceGroup`) or account group (`Group`). */
  resourceType?: string | undefined;
}

export interface CreateServicePrincipalRequest {
  /** If this user is active */
  active?: boolean | undefined;
  /** UUID relating to the service principal */
  applicationId?: string | undefined;
  /** String that represents a concatenation of given and family names. */
  displayName?: string | undefined;
  /** Entitlements assigned to the service principal. See [assigning entitlements](https://docs.databricks.com/administration-guide/users-groups/index.html#assigning-entitlements) for a full list of supported values. */
  entitlements?: CreateComplexValue[] | undefined;
  externalId?: string | undefined;
  groups?: CreateComplexValue[] | undefined;
  /** <Databricks> service principal ID. */
  id?: string | undefined;
  /** Corresponds to AWS instance profile/arn role. */
  roles?: CreateComplexValue[] | undefined;
  /** The schema of the List response. */
  schemas?: ServicePrincipalSchema[] | undefined;
}

export interface CreateUserRequest {
  /** If this user is active */
  active?: boolean | undefined;
  /** String that represents a concatenation of given and family names. For example `John Smith`. This field cannot be updated through the Workspace SCIM APIs when [identity federation is enabled](https://docs.databricks.com/administration-guide/users-groups/best-practices.html#enable-identity-federation). Use Account SCIM APIs to update `displayName`. */
  displayName?: string | undefined;
  /** All the emails associated with the <Databricks> user. */
  emails?: CreateComplexValue[] | undefined;
  /** Entitlements assigned to the user. See [assigning entitlements](https://docs.databricks.com/administration-guide/users-groups/index.html#assigning-entitlements) for a full list of supported values. */
  entitlements?: CreateComplexValue[] | undefined;
  /** External ID is not currently supported. It is reserved for future use. */
  externalId?: string | undefined;
  groups?: CreateComplexValue[] | undefined;
  /** <Databricks> user ID. */
  id?: string | undefined;
  name?: CreateName | undefined;
  /** Corresponds to AWS instance profile/arn role. */
  roles?: CreateComplexValue[] | undefined;
  /** The schema of the user. */
  schemas?: UserSchema[] | undefined;
  /** Email address of the <Databricks> user. */
  userName?: string | undefined;
}

/** Delete a group */
export interface DeleteAccountGroupRequest {
  /** Unique ID for a group in the <Databricks> account. */
  id?: string | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

/** Delete a service principal */
export interface DeleteAccountServicePrincipalRequest {
  /** Unique ID for a service principal in the <Databricks> account. */
  id?: string | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

/** Delete a user */
export interface DeleteAccountUserRequest {
  /** Unique ID for a user in the <Databricks> account. */
  id?: string | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

/** Delete a group */
export interface DeleteGroupRequest {
  /** Unique ID for a group in the <Databricks> workspace. */
  id?: string | undefined;
}

/** Delete a service principal */
export interface DeleteServicePrincipalRequest {
  /** Unique ID for a service principal in the <Databricks> workspace. */
  id?: string | undefined;
}

/** Delete a user */
export interface DeleteUserRequest {
  /** Unique ID for a user in the <Databricks> workspace. */
  id?: string | undefined;
}

/** Get group details */
export interface GetAccountGroupRequest {
  /** Unique ID for a group in the <Databricks> account. */
  id?: string | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

/** Get service principal details */
export interface GetAccountServicePrincipalRequest {
  /** Unique ID for a service principal in the <Databricks> account. */
  id?: string | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

/** Get user details */
export interface GetAccountUserRequest {
  /** Comma-separated list of attributes to return in response. */
  attributes?: string | undefined;
  /** Desired number of results per page. Default is 10000. */
  count?: number | undefined;
  /** Comma-separated list of attributes to exclude in response. */
  excludedAttributes?: string | undefined;
  /** Query by which the results have to be filtered. Supported operators are equals(`eq`), contains(`co`), starts with(`sw`) and not equals(`ne`). Additionally, simple expressions can be formed using logical operators - `and` and `or`. The [SCIM RFC](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) has more details but we currently only support simple expressions. */
  filter?: string | undefined;
  /** Unique ID for a user in the <Databricks> account. */
  id?: string | undefined;
  /** Attribute to sort the results. Multi-part paths are supported. For example, `userName`, `name.givenName`, and `emails`. */
  sortBy?: string | undefined;
  /** The order to sort the results. */
  sortOrder?: AccountGetSortOrder_GetSortOrder | undefined;
  /** Specifies the index of the first result. First item is number 1. */
  startIndex?: number | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

/** Get group details */
export interface GetGroupRequest {
  /** Unique ID for a group in the <Databricks> workspace. */
  id?: string | undefined;
}

/** Get object permission levels */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetPasswordPermissionLevelsRequest {}

export interface GetPasswordPermissionLevelsResponse {
  /** Specific permission levels */
  permissionLevels?: PasswordPermissionsDescription[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetPasswordPermissionsRequest {}

/** Get service principal details */
export interface GetServicePrincipalRequest {
  /** Unique ID for a service principal in the <Databricks> workspace. */
  id?: string | undefined;
}

/** Get user details */
export interface GetUserRequest {
  /** Comma-separated list of attributes to return in response. */
  attributes?: string | undefined;
  /** Desired number of results per page. */
  count?: number | undefined;
  /** Comma-separated list of attributes to exclude in response. */
  excludedAttributes?: string | undefined;
  /** Query by which the results have to be filtered. Supported operators are equals(`eq`), contains(`co`), starts with(`sw`) and not equals(`ne`). Additionally, simple expressions can be formed using logical operators - `and` and `or`. The [SCIM RFC](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) has more details but we currently only support simple expressions. */
  filter?: string | undefined;
  /** Unique ID for a user in the <Databricks> workspace. */
  id?: string | undefined;
  /** Attribute to sort the results. Multi-part paths are supported. For example, `userName`, `name.givenName`, and `emails`. */
  sortBy?: string | undefined;
  /** The order to sort the results. */
  sortOrder?: GetSortOrder | undefined;
  /** Specifies the index of the first result. First item is number 1. */
  startIndex?: number | undefined;
}

export interface Group {
  /** String that represents a human-readable group name */
  displayName?: string | undefined;
  /** Entitlements assigned to the group. See [assigning entitlements](https://docs.databricks.com/administration-guide/users-groups/index.html#assigning-entitlements) for a full list of supported values. */
  entitlements?: ComplexValue[] | undefined;
  /** external_id should be unique for identifying groups */
  externalId?: string | undefined;
  groups?: ComplexValue[] | undefined;
  /** <Databricks> group ID */
  id?: string | undefined;
  members?: ComplexValue[] | undefined;
  /** Container for the group identifier. Workspace local versus account. */
  meta?: ResourceMeta | undefined;
  /** Corresponds to AWS instance profile/arn role. */
  roles?: ComplexValue[] | undefined;
  /** The schema of the group. */
  schemas?: GroupSchema[] | undefined;
}

/** List group details */
export interface ListAccountGroupsRequest {
  /** <Databricks> account ID */
  accountId?: string | undefined;
  /** Query by which the results have to be filtered. Supported operators are equals(`eq`), contains(`co`), starts with(`sw`) and not equals(`ne`). Additionally, simple expressions can be formed using logical operators - `and` and `or`. The [SCIM RFC](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) has more details but we currently only support simple expressions. */
  filter?: string | undefined;
  /** Comma-separated list of attributes to return in response. */
  attributes?: string | undefined;
  /** Comma-separated list of attributes to exclude in response. */
  excludedAttributes?: string | undefined;
  /** Specifies the index of the first result. First item is number 1. */
  startIndex?: bigint | undefined;
  /** Desired number of results per page. Default is 10000. */
  count?: bigint | undefined;
  /** Attribute to sort the results. */
  sortBy?: string | undefined;
  /** The order to sort the results. */
  sortOrder?: AccountListSort_Order | undefined;
}

export interface ListAccountGroupsResponse {
  /** Total results returned in the response. */
  itemsPerPage?: number | undefined;
  /** User objects returned in the response. */
  resources?: AccountGroup[] | undefined;
  /** Starting index of all the results that matched the request filters. First item is number 1. */
  startIndex?: bigint | undefined;
  /** Total results that match the request filters. */
  totalResults?: number | undefined;
}

/** List service principals */
export interface ListAccountServicePrincipalsRequest {
  /** Comma-separated list of attributes to return in response. */
  attributes?: string | undefined;
  /** Desired number of results per page. Default is 10000. */
  count?: bigint | undefined;
  /** Comma-separated list of attributes to exclude in response. */
  excludedAttributes?: string | undefined;
  /** Query by which the results have to be filtered. Supported operators are equals(`eq`), contains(`co`), starts with(`sw`) and not equals(`ne`). Additionally, simple expressions can be formed using logical operators - `and` and `or`. The [SCIM RFC](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) has more details but we currently only support simple expressions. */
  filter?: string | undefined;
  /** Attribute to sort the results. */
  sortBy?: string | undefined;
  /** The order to sort the results. */
  sortOrder?: AccountListSort_Order | undefined;
  /** Specifies the index of the first result. First item is number 1. */
  startIndex?: bigint | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface ListAccountServicePrincipalsResponse {
  /** Total results returned in the response. */
  itemsPerPage?: number | undefined;
  /** User objects returned in the response. */
  resources?: AccountServicePrincipal[] | undefined;
  /** Starting index of all the results that matched the request filters. First item is number 1. */
  startIndex?: bigint | undefined;
  /** Total results that match the request filters. */
  totalResults?: number | undefined;
}

/** List users */
export interface ListAccountUsersRequest {
  /** Comma-separated list of attributes to return in response. */
  attributes?: string | undefined;
  /** Desired number of results per page. Default is 10000. */
  count?: bigint | undefined;
  /** Comma-separated list of attributes to exclude in response. */
  excludedAttributes?: string | undefined;
  /** Query by which the results have to be filtered. Supported operators are equals(`eq`), contains(`co`), starts with(`sw`) and not equals(`ne`). Additionally, simple expressions can be formed using logical operators - `and` and `or`. The [SCIM RFC](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) has more details but we currently only support simple expressions. */
  filter?: string | undefined;
  /** Attribute to sort the results. Multi-part paths are supported. For example, `userName`, `name.givenName`, and `emails`. */
  sortBy?: string | undefined;
  /** The order to sort the results. */
  sortOrder?: AccountListSort_Order | undefined;
  /** Specifies the index of the first result. First item is number 1. */
  startIndex?: bigint | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface ListAccountUsersResponse {
  /** Total results returned in the response. */
  itemsPerPage?: number | undefined;
  /** User objects returned in the response. */
  resources?: AccountUser[] | undefined;
  /** Starting index of all the results that matched the request filters. First item is number 1. */
  startIndex?: bigint | undefined;
  /** Total results that match the request filters. */
  totalResults?: number | undefined;
}

/** List group details */
export interface ListGroupsRequest {
  /** Query by which the results have to be filtered. Supported operators are equals(`eq`), contains(`co`), starts with(`sw`) and not equals(`ne`). Additionally, simple expressions can be formed using logical operators - `and` and `or`. The [SCIM RFC](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) has more details but we currently only support simple expressions. */
  filter?: string | undefined;
  /** Comma-separated list of attributes to return in response. */
  attributes?: string | undefined;
  /** Comma-separated list of attributes to exclude in response. */
  excludedAttributes?: string | undefined;
  /** Specifies the index of the first result. First item is number 1. */
  startIndex?: bigint | undefined;
  /** Desired number of results per page. */
  count?: bigint | undefined;
  /** Attribute to sort the results. */
  sortBy?: string | undefined;
  /** The order to sort the results. */
  sortOrder?: ListSort_Order | undefined;
}

export interface ListGroupsResponse {
  /** Total results returned in the response. */
  itemsPerPage?: number | undefined;
  /** User objects returned in the response. */
  resources?: Group[] | undefined;
  /** The schema of the service principal. */
  schemas?: ListResponseSchema[] | undefined;
  /** Starting index of all the results that matched the request filters. First item is number 1. */
  startIndex?: bigint | undefined;
  /** Total results that match the request filters. */
  totalResults?: number | undefined;
}

export interface ListServicePrincipalResponse {
  /** Total results returned in the response. */
  itemsPerPage?: number | undefined;
  /** User objects returned in the response. */
  resources?: ServicePrincipal[] | undefined;
  /** The schema of the List response. */
  schemas?: ListResponseSchema[] | undefined;
  /** Starting index of all the results that matched the request filters. First item is number 1. */
  startIndex?: bigint | undefined;
  /** Total results that match the request filters. */
  totalResults?: number | undefined;
}

/** List service principals */
export interface ListServicePrincipalsRequest {
  /** Comma-separated list of attributes to return in response. */
  attributes?: string | undefined;
  /** Desired number of results per page. */
  count?: bigint | undefined;
  /** Comma-separated list of attributes to exclude in response. */
  excludedAttributes?: string | undefined;
  /** Query by which the results have to be filtered. Supported operators are equals(`eq`), contains(`co`), starts with(`sw`) and not equals(`ne`). Additionally, simple expressions can be formed using logical operators - `and` and `or`. The [SCIM RFC](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) has more details but we currently only support simple expressions. */
  filter?: string | undefined;
  /** Attribute to sort the results. */
  sortBy?: string | undefined;
  /** The order to sort the results. */
  sortOrder?: ListSort_Order | undefined;
  /** Specifies the index of the first result. First item is number 1. */
  startIndex?: bigint | undefined;
}

/**
 * ListSortOrder and GetSortOrder share enum values, which is not supported.
 * We use nesting as a workaround.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListSort {}

/** List users */
export interface ListUsersRequest {
  /** Comma-separated list of attributes to return in response. */
  attributes?: string | undefined;
  /** Desired number of results per page. */
  count?: bigint | undefined;
  /** Comma-separated list of attributes to exclude in response. */
  excludedAttributes?: string | undefined;
  /** Query by which the results have to be filtered. Supported operators are equals(`eq`), contains(`co`), starts with(`sw`) and not equals(`ne`). Additionally, simple expressions can be formed using logical operators - `and` and `or`. The [SCIM RFC](https://tools.ietf.org/html/rfc7644#section-3.4.2.2) has more details but we currently only support simple expressions. */
  filter?: string | undefined;
  /** Attribute to sort the results. Multi-part paths are supported. For example, `userName`, `name.givenName`, and `emails`. */
  sortBy?: string | undefined;
  /** The order to sort the results. */
  sortOrder?: ListSort_Order | undefined;
  /** Specifies the index of the first result. First item is number 1. */
  startIndex?: bigint | undefined;
}

export interface ListUsersResponse {
  /** Total results returned in the response. */
  itemsPerPage?: number | undefined;
  /** User objects returned in the response. */
  resources?: User[] | undefined;
  /** The schema of the List response. */
  schemas?: ListResponseSchema[] | undefined;
  /** Starting index of all the results that matched the request filters. First item is number 1. */
  startIndex?: bigint | undefined;
  /** Total results that match the request filters. */
  totalResults?: number | undefined;
}

export interface MeRequest {
  /** Comma-separated list of attributes to return in response. */
  attributes?: string | undefined;
  /** Comma-separated list of attributes to exclude in response. */
  excludedAttributes?: string | undefined;
}

export interface Name {
  /** Family name of the <Databricks> user. */
  familyName?: string | undefined;
  /** Given name of the <Databricks> user. */
  givenName?: string | undefined;
}

export interface PasswordAccessControlRequest {
  /** name of the group */
  groupName?: string | undefined;
  /** Permission level */
  permissionLevel?: PasswordPermission_Level | undefined;
  /** application ID of a service principal */
  servicePrincipalName?: string | undefined;
  /** name of the user */
  userName?: string | undefined;
}

export interface PasswordAccessControlResponse {
  /** All permissions. */
  allPermissions?: PasswordPermission[] | undefined;
  /** Display name of the user or service principal. */
  displayName?: string | undefined;
  /** name of the group */
  groupName?: string | undefined;
  /** Name of the service principal. */
  servicePrincipalName?: string | undefined;
  /** name of the user */
  userName?: string | undefined;
}

export interface PasswordPermission {
  inherited?: boolean | undefined;
  inheritedFromObject?: string[] | undefined;
  /** Permission level */
  permissionLevel?: PasswordPermission_Level | undefined;
}

export interface PasswordPermissions {
  accessControlList?: PasswordAccessControlResponse[] | undefined;
  objectId?: string | undefined;
  objectType?: string | undefined;
}

export interface PasswordPermissionsDescription {
  description?: string | undefined;
  /** Permission level */
  permissionLevel?: PasswordPermission_Level | undefined;
}

export interface PasswordPermissionsRequest {
  accessControlList?: CreatePasswordAccessControlRequest[] | undefined;
}

export interface Patch {
  /** Type of patch operation. */
  op?: PatchOp | undefined;
  /** Selection of patch operation */
  path?: string | undefined;
  /** Value to modify */
  value?: JsonValue | undefined;
}

export interface PatchAccountGroupRequest {
  /** Unique ID in the <Databricks> workspace. */
  id?: string | undefined;
  operations?: AccountPatch[] | undefined;
  /** The schema of the patch request. Must be ["urn:ietf:params:scim:api:messages:2.0:PatchOp"]. */
  schemas?: AccountPatchSchema_PatchSchema[] | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface PatchAccountServicePrincipalRequest {
  /** Unique ID in the <Databricks> workspace. */
  id?: string | undefined;
  operations?: AccountPatch[] | undefined;
  /** The schema of the patch request. Must be ["urn:ietf:params:scim:api:messages:2.0:PatchOp"]. */
  schemas?: AccountPatchSchema_PatchSchema[] | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface PatchAccountUserRequest {
  /** Unique ID in the <Databricks> workspace. */
  id?: string | undefined;
  operations?: AccountPatch[] | undefined;
  /** The schema of the patch request. Must be ["urn:ietf:params:scim:api:messages:2.0:PatchOp"]. */
  schemas?: AccountPatchSchema_PatchSchema[] | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface PatchGroupRequest {
  /** Unique ID in the <Databricks> workspace. */
  id?: string | undefined;
  operations?: Patch[] | undefined;
  /** The schema of the patch request. Must be ["urn:ietf:params:scim:api:messages:2.0:PatchOp"]. */
  schemas?: PatchSchema[] | undefined;
}

export interface PatchServicePrincipalRequest {
  /** Unique ID in the <Databricks> workspace. */
  id?: string | undefined;
  operations?: Patch[] | undefined;
  /** The schema of the patch request. Must be ["urn:ietf:params:scim:api:messages:2.0:PatchOp"]. */
  schemas?: PatchSchema[] | undefined;
}

export interface PatchUserRequest {
  /** Unique ID in the <Databricks> workspace. */
  id?: string | undefined;
  operations?: Patch[] | undefined;
  /** The schema of the patch request. Must be ["urn:ietf:params:scim:api:messages:2.0:PatchOp"]. */
  schemas?: PatchSchema[] | undefined;
}

export interface ResourceMeta {
  /** Identifier for group type. Can be local workspace group (`WorkspaceGroup`) or account group (`Group`). */
  resourceType?: string | undefined;
}

export interface ServicePrincipal {
  /** If this user is active */
  active?: boolean | undefined;
  /** UUID relating to the service principal */
  applicationId?: string | undefined;
  /** String that represents a concatenation of given and family names. */
  displayName?: string | undefined;
  /** Entitlements assigned to the service principal. See [assigning entitlements](https://docs.databricks.com/administration-guide/users-groups/index.html#assigning-entitlements) for a full list of supported values. */
  entitlements?: ComplexValue[] | undefined;
  externalId?: string | undefined;
  groups?: ComplexValue[] | undefined;
  /** <Databricks> service principal ID. */
  id?: string | undefined;
  /** Corresponds to AWS instance profile/arn role. */
  roles?: ComplexValue[] | undefined;
  /** The schema of the List response. */
  schemas?: ServicePrincipalSchema[] | undefined;
}

export interface UpdateAccountComplexValue {
  display?: string | undefined;
  primary?: boolean | undefined;
  ref?: string | undefined;
  type?: string | undefined;
  value?: string | undefined;
}

export interface UpdateAccountGroupRequest {
  /** String that represents a human-readable group name */
  displayName?: string | undefined;
  externalId?: string | undefined;
  /** <Databricks> group ID */
  id?: string | undefined;
  members?: UpdateAccountComplexValue[] | undefined;
  /** Container  for the group identifier. Workspace local versus account. */
  meta?: UpdateAccountResourceMeta | undefined;
  /** Indicates if the group has the admin role. */
  roles?: UpdateAccountComplexValue[] | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface UpdateAccountName {
  /** Family name of the <Databricks> user. */
  familyName?: string | undefined;
  /** Given name of the <Databricks> user. */
  givenName?: string | undefined;
}

export interface UpdateAccountResourceMeta {
  /** Identifier for group type. Can be local workspace group (`WorkspaceGroup`) or account group (`Group`). */
  resourceType?: string | undefined;
}

export interface UpdateAccountServicePrincipalRequest {
  /** If this user is active */
  active?: boolean | undefined;
  /** UUID relating to the service principal */
  applicationId?: string | undefined;
  /** String that represents a concatenation of given and family names. */
  displayName?: string | undefined;
  externalId?: string | undefined;
  /** <Databricks> service principal ID. */
  id?: string | undefined;
  /** Indicates if the group has the admin role. */
  roles?: UpdateAccountComplexValue[] | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface UpdateAccountUserRequest {
  /** If this user is active */
  active?: boolean | undefined;
  /** String that represents a concatenation of given and family names. For example `John Smith`. */
  displayName?: string | undefined;
  /** All the emails associated with the <Databricks> user. */
  emails?: UpdateAccountComplexValue[] | undefined;
  /** External ID is not currently supported. It is reserved for future use. */
  externalId?: string | undefined;
  /** <Databricks> user ID. */
  id?: string | undefined;
  name?: UpdateAccountName | undefined;
  /** Indicates if the group has the admin role. */
  roles?: UpdateAccountComplexValue[] | undefined;
  /** Email address of the <Databricks> user. */
  userName?: string | undefined;
  /** <Databricks> account ID */
  accountId?: string | undefined;
}

export interface UpdateComplexValue {
  display?: string | undefined;
  primary?: boolean | undefined;
  ref?: string | undefined;
  type?: string | undefined;
  value?: string | undefined;
}

export interface UpdateGroupRequest {
  /** String that represents a human-readable group name */
  displayName?: string | undefined;
  /** Entitlements assigned to the group. See [assigning entitlements](https://docs.databricks.com/administration-guide/users-groups/index.html#assigning-entitlements) for a full list of supported values. */
  entitlements?: UpdateComplexValue[] | undefined;
  externalId?: string | undefined;
  groups?: UpdateComplexValue[] | undefined;
  /** <Databricks> group ID */
  id?: string | undefined;
  members?: UpdateComplexValue[] | undefined;
  /** Container  for the group identifier. Workspace local versus account. */
  meta?: UpdateResourceMeta | undefined;
  /** Corresponds to AWS instance profile/arn role. */
  roles?: UpdateComplexValue[] | undefined;
  /** The schema of the group. */
  schemas?: GroupSchema[] | undefined;
}

export interface UpdateName {
  /** Family name of the <Databricks> user. */
  familyName?: string | undefined;
  /** Given name of the <Databricks> user. */
  givenName?: string | undefined;
}

export interface UpdateResourceMeta {
  /** Identifier for group type. Can be local workspace group (`WorkspaceGroup`) or account group (`Group`). */
  resourceType?: string | undefined;
}

export interface UpdateServicePrincipalRequest {
  /** If this user is active */
  active?: boolean | undefined;
  /** UUID relating to the service principal */
  applicationId?: string | undefined;
  /** String that represents a concatenation of given and family names. */
  displayName?: string | undefined;
  /** Entitlements assigned to the service principal. See [assigning entitlements](https://docs.databricks.com/administration-guide/users-groups/index.html#assigning-entitlements) for a full list of supported values. */
  entitlements?: UpdateComplexValue[] | undefined;
  externalId?: string | undefined;
  groups?: UpdateComplexValue[] | undefined;
  /** <Databricks> service principal ID. */
  id?: string | undefined;
  /** Corresponds to AWS instance profile/arn role. */
  roles?: UpdateComplexValue[] | undefined;
  /** The schema of the List response. */
  schemas?: ServicePrincipalSchema[] | undefined;
}

export interface UpdateUserRequest {
  /** If this user is active */
  active?: boolean | undefined;
  /** String that represents a concatenation of given and family names. For example `John Smith`. This field cannot be updated through the Workspace SCIM APIs when [identity federation is enabled](https://docs.databricks.com/administration-guide/users-groups/best-practices.html#enable-identity-federation). Use Account SCIM APIs to update `displayName`. */
  displayName?: string | undefined;
  /** All the emails associated with the <Databricks> user. */
  emails?: UpdateComplexValue[] | undefined;
  /** Entitlements assigned to the user. See [assigning entitlements](https://docs.databricks.com/administration-guide/users-groups/index.html#assigning-entitlements) for a full list of supported values. */
  entitlements?: UpdateComplexValue[] | undefined;
  /** External ID is not currently supported. It is reserved for future use. */
  externalId?: string | undefined;
  groups?: UpdateComplexValue[] | undefined;
  /** <Databricks> user ID. */
  id?: string | undefined;
  name?: UpdateName | undefined;
  /** Corresponds to AWS instance profile/arn role. */
  roles?: UpdateComplexValue[] | undefined;
  /** The schema of the user. */
  schemas?: UserSchema[] | undefined;
  /** Email address of the <Databricks> user. */
  userName?: string | undefined;
}

export interface User {
  /** If this user is active */
  active?: boolean | undefined;
  /** String that represents a concatenation of given and family names. For example `John Smith`. This field cannot be updated through the Workspace SCIM APIs when [identity federation is enabled](https://docs.databricks.com/administration-guide/users-groups/best-practices.html#enable-identity-federation). Use Account SCIM APIs to update `displayName`. */
  displayName?: string | undefined;
  /** All the emails associated with the <Databricks> user. */
  emails?: ComplexValue[] | undefined;
  /** Entitlements assigned to the user. See [assigning entitlements](https://docs.databricks.com/administration-guide/users-groups/index.html#assigning-entitlements) for a full list of supported values. */
  entitlements?: ComplexValue[] | undefined;
  /** External ID is not currently supported. It is reserved for future use. */
  externalId?: string | undefined;
  groups?: ComplexValue[] | undefined;
  /** <Databricks> user ID. */
  id?: string | undefined;
  name?: Name | undefined;
  /** Corresponds to AWS instance profile/arn role. */
  roles?: ComplexValue[] | undefined;
  /** The schema of the user. */
  schemas?: UserSchema[] | undefined;
  /** Email address of the <Databricks> user. */
  userName?: string | undefined;
}

export const unmarshalAccountComplexValueSchema: z.ZodType<AccountComplexValue> =
  z
    .object({
      display: z.string().optional(),
      primary: z.boolean().optional(),
      $ref: z.string().optional(),
      type: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      display: d.display,
      primary: d.primary,
      ref: d.$ref,
      type: d.type,
      value: d.value,
    }));

export const unmarshalAccountGroupSchema: z.ZodType<AccountGroup> = z
  .object({
    displayName: z.string().optional(),
    externalId: z.string().optional(),
    id: z.string().optional(),
    members: z
      .array(z.lazy(() => unmarshalAccountComplexValueSchema))
      .optional(),
    meta: z.lazy(() => unmarshalAccountResourceMetaSchema).optional(),
    roles: z.array(z.lazy(() => unmarshalAccountComplexValueSchema)).optional(),
    account_id: z.string().optional(),
  })
  .transform(d => ({
    displayName: d.displayName,
    externalId: d.externalId,
    id: d.id,
    members: d.members,
    meta: d.meta,
    roles: d.roles,
    accountId: d.account_id,
  }));

export const unmarshalAccountNameSchema: z.ZodType<AccountName> = z
  .object({
    familyName: z.string().optional(),
    givenName: z.string().optional(),
  })
  .transform(d => ({
    familyName: d.familyName,
    givenName: d.givenName,
  }));

export const unmarshalAccountResourceMetaSchema: z.ZodType<AccountResourceMeta> =
  z
    .object({
      resourceType: z.string().optional(),
    })
    .transform(d => ({
      resourceType: d.resourceType,
    }));

export const unmarshalAccountServicePrincipalSchema: z.ZodType<AccountServicePrincipal> =
  z
    .object({
      active: z.boolean().optional(),
      applicationId: z.string().optional(),
      displayName: z.string().optional(),
      externalId: z.string().optional(),
      id: z.string().optional(),
      roles: z
        .array(z.lazy(() => unmarshalAccountComplexValueSchema))
        .optional(),
      account_id: z.string().optional(),
    })
    .transform(d => ({
      active: d.active,
      applicationId: d.applicationId,
      displayName: d.displayName,
      externalId: d.externalId,
      id: d.id,
      roles: d.roles,
      accountId: d.account_id,
    }));

export const unmarshalAccountUserSchema: z.ZodType<AccountUser> = z
  .object({
    active: z.boolean().optional(),
    displayName: z.string().optional(),
    emails: z
      .array(z.lazy(() => unmarshalAccountComplexValueSchema))
      .optional(),
    externalId: z.string().optional(),
    id: z.string().optional(),
    name: z.lazy(() => unmarshalAccountNameSchema).optional(),
    roles: z.array(z.lazy(() => unmarshalAccountComplexValueSchema)).optional(),
    userName: z.string().optional(),
    account_id: z.string().optional(),
  })
  .transform(d => ({
    active: d.active,
    displayName: d.displayName,
    emails: d.emails,
    externalId: d.externalId,
    id: d.id,
    name: d.name,
    roles: d.roles,
    userName: d.userName,
    accountId: d.account_id,
  }));

export const unmarshalComplexValueSchema: z.ZodType<ComplexValue> = z
  .object({
    display: z.string().optional(),
    primary: z.boolean().optional(),
    $ref: z.string().optional(),
    type: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    display: d.display,
    primary: d.primary,
    ref: d.$ref,
    type: d.type,
    value: d.value,
  }));

export const unmarshalGetPasswordPermissionLevelsResponseSchema: z.ZodType<GetPasswordPermissionLevelsResponse> =
  z
    .object({
      permission_levels: z
        .array(z.lazy(() => unmarshalPasswordPermissionsDescriptionSchema))
        .optional(),
    })
    .transform(d => ({
      permissionLevels: d.permission_levels,
    }));

export const unmarshalGroupSchema: z.ZodType<Group> = z
  .object({
    displayName: z.string().optional(),
    entitlements: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    externalId: z.string().optional(),
    groups: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    id: z.string().optional(),
    members: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    meta: z.lazy(() => unmarshalResourceMetaSchema).optional(),
    roles: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    schemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    displayName: d.displayName,
    entitlements: d.entitlements,
    externalId: d.externalId,
    groups: d.groups,
    id: d.id,
    members: d.members,
    meta: d.meta,
    roles: d.roles,
    schemas: d.schemas,
  }));

export const unmarshalListAccountGroupsResponseSchema: z.ZodType<ListAccountGroupsResponse> =
  z
    .object({
      itemsPerPage: z.number().optional(),
      Resources: z.array(z.lazy(() => unmarshalAccountGroupSchema)).optional(),
      startIndex: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      totalResults: z.number().optional(),
    })
    .transform(d => ({
      itemsPerPage: d.itemsPerPage,
      resources: d.Resources,
      startIndex: d.startIndex,
      totalResults: d.totalResults,
    }));

export const unmarshalListAccountServicePrincipalsResponseSchema: z.ZodType<ListAccountServicePrincipalsResponse> =
  z
    .object({
      itemsPerPage: z.number().optional(),
      Resources: z
        .array(z.lazy(() => unmarshalAccountServicePrincipalSchema))
        .optional(),
      startIndex: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      totalResults: z.number().optional(),
    })
    .transform(d => ({
      itemsPerPage: d.itemsPerPage,
      resources: d.Resources,
      startIndex: d.startIndex,
      totalResults: d.totalResults,
    }));

export const unmarshalListAccountUsersResponseSchema: z.ZodType<ListAccountUsersResponse> =
  z
    .object({
      itemsPerPage: z.number().optional(),
      Resources: z.array(z.lazy(() => unmarshalAccountUserSchema)).optional(),
      startIndex: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      totalResults: z.number().optional(),
    })
    .transform(d => ({
      itemsPerPage: d.itemsPerPage,
      resources: d.Resources,
      startIndex: d.startIndex,
      totalResults: d.totalResults,
    }));

export const unmarshalListGroupsResponseSchema: z.ZodType<ListGroupsResponse> =
  z
    .object({
      itemsPerPage: z.number().optional(),
      Resources: z.array(z.lazy(() => unmarshalGroupSchema)).optional(),
      schemas: z.array(z.string()).optional(),
      startIndex: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      totalResults: z.number().optional(),
    })
    .transform(d => ({
      itemsPerPage: d.itemsPerPage,
      resources: d.Resources,
      schemas: d.schemas,
      startIndex: d.startIndex,
      totalResults: d.totalResults,
    }));

export const unmarshalListServicePrincipalResponseSchema: z.ZodType<ListServicePrincipalResponse> =
  z
    .object({
      itemsPerPage: z.number().optional(),
      Resources: z
        .array(z.lazy(() => unmarshalServicePrincipalSchema))
        .optional(),
      schemas: z.array(z.string()).optional(),
      startIndex: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      totalResults: z.number().optional(),
    })
    .transform(d => ({
      itemsPerPage: d.itemsPerPage,
      resources: d.Resources,
      schemas: d.schemas,
      startIndex: d.startIndex,
      totalResults: d.totalResults,
    }));

export const unmarshalListUsersResponseSchema: z.ZodType<ListUsersResponse> = z
  .object({
    itemsPerPage: z.number().optional(),
    Resources: z.array(z.lazy(() => unmarshalUserSchema)).optional(),
    schemas: z.array(z.string()).optional(),
    startIndex: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    totalResults: z.number().optional(),
  })
  .transform(d => ({
    itemsPerPage: d.itemsPerPage,
    resources: d.Resources,
    schemas: d.schemas,
    startIndex: d.startIndex,
    totalResults: d.totalResults,
  }));

export const unmarshalNameSchema: z.ZodType<Name> = z
  .object({
    familyName: z.string().optional(),
    givenName: z.string().optional(),
  })
  .transform(d => ({
    familyName: d.familyName,
    givenName: d.givenName,
  }));

export const unmarshalPasswordAccessControlResponseSchema: z.ZodType<PasswordAccessControlResponse> =
  z
    .object({
      all_permissions: z
        .array(z.lazy(() => unmarshalPasswordPermissionSchema))
        .optional(),
      display_name: z.string().optional(),
      group_name: z.string().optional(),
      service_principal_name: z.string().optional(),
      user_name: z.string().optional(),
    })
    .transform(d => ({
      allPermissions: d.all_permissions,
      displayName: d.display_name,
      groupName: d.group_name,
      servicePrincipalName: d.service_principal_name,
      userName: d.user_name,
    }));

export const unmarshalPasswordPermissionSchema: z.ZodType<PasswordPermission> =
  z
    .object({
      inherited: z.boolean().optional(),
      inherited_from_object: z.array(z.string()).optional(),
      permission_level: z.string().optional(),
    })
    .transform(d => ({
      inherited: d.inherited,
      inheritedFromObject: d.inherited_from_object,
      permissionLevel: d.permission_level,
    }));

export const unmarshalPasswordPermissionsSchema: z.ZodType<PasswordPermissions> =
  z
    .object({
      access_control_list: z
        .array(z.lazy(() => unmarshalPasswordAccessControlResponseSchema))
        .optional(),
      object_id: z.string().optional(),
      object_type: z.string().optional(),
    })
    .transform(d => ({
      accessControlList: d.access_control_list,
      objectId: d.object_id,
      objectType: d.object_type,
    }));

export const unmarshalPasswordPermissionsDescriptionSchema: z.ZodType<PasswordPermissionsDescription> =
  z
    .object({
      description: z.string().optional(),
      permission_level: z.string().optional(),
    })
    .transform(d => ({
      description: d.description,
      permissionLevel: d.permission_level,
    }));

export const unmarshalResourceMetaSchema: z.ZodType<ResourceMeta> = z
  .object({
    resourceType: z.string().optional(),
  })
  .transform(d => ({
    resourceType: d.resourceType,
  }));

export const unmarshalServicePrincipalSchema: z.ZodType<ServicePrincipal> = z
  .object({
    active: z.boolean().optional(),
    applicationId: z.string().optional(),
    displayName: z.string().optional(),
    entitlements: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    externalId: z.string().optional(),
    groups: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    id: z.string().optional(),
    roles: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    schemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    active: d.active,
    applicationId: d.applicationId,
    displayName: d.displayName,
    entitlements: d.entitlements,
    externalId: d.externalId,
    groups: d.groups,
    id: d.id,
    roles: d.roles,
    schemas: d.schemas,
  }));

export const unmarshalUserSchema: z.ZodType<User> = z
  .object({
    active: z.boolean().optional(),
    displayName: z.string().optional(),
    emails: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    entitlements: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    externalId: z.string().optional(),
    groups: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    id: z.string().optional(),
    name: z.lazy(() => unmarshalNameSchema).optional(),
    roles: z.array(z.lazy(() => unmarshalComplexValueSchema)).optional(),
    schemas: z.array(z.string()).optional(),
    userName: z.string().optional(),
  })
  .transform(d => ({
    active: d.active,
    displayName: d.displayName,
    emails: d.emails,
    entitlements: d.entitlements,
    externalId: d.externalId,
    groups: d.groups,
    id: d.id,
    name: d.name,
    roles: d.roles,
    schemas: d.schemas,
    userName: d.userName,
  }));

export const marshalAccountPatchSchema: z.ZodType = z
  .object({
    op: z.string().optional(),
    path: z.string().optional(),
    value: jsonValueSchema.optional(),
  })
  .transform(d => ({
    op: d.op,
    path: d.path,
    value: d.value,
  }));

export const marshalCreateAccountComplexValueSchema: z.ZodType = z
  .object({
    display: z.string().optional(),
    primary: z.boolean().optional(),
    ref: z.string().optional(),
    type: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    display: d.display,
    primary: d.primary,
    $ref: d.ref,
    type: d.type,
    value: d.value,
  }));

export const marshalCreateAccountGroupRequestSchema: z.ZodType = z
  .object({
    displayName: z.string().optional(),
    externalId: z.string().optional(),
    id: z.string().optional(),
    members: z
      .array(z.lazy(() => marshalCreateAccountComplexValueSchema))
      .optional(),
    meta: z.lazy(() => marshalCreateAccountResourceMetaSchema).optional(),
    roles: z
      .array(z.lazy(() => marshalCreateAccountComplexValueSchema))
      .optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    displayName: d.displayName,
    externalId: d.externalId,
    id: d.id,
    members: d.members,
    meta: d.meta,
    roles: d.roles,
    account_id: d.accountId,
  }));

export const marshalCreateAccountNameSchema: z.ZodType = z
  .object({
    familyName: z.string().optional(),
    givenName: z.string().optional(),
  })
  .transform(d => ({
    familyName: d.familyName,
    givenName: d.givenName,
  }));

export const marshalCreateAccountResourceMetaSchema: z.ZodType = z
  .object({
    resourceType: z.string().optional(),
  })
  .transform(d => ({
    resourceType: d.resourceType,
  }));

export const marshalCreateAccountServicePrincipalRequestSchema: z.ZodType = z
  .object({
    active: z.boolean().optional(),
    applicationId: z.string().optional(),
    displayName: z.string().optional(),
    externalId: z.string().optional(),
    id: z.string().optional(),
    roles: z
      .array(z.lazy(() => marshalCreateAccountComplexValueSchema))
      .optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    active: d.active,
    applicationId: d.applicationId,
    displayName: d.displayName,
    externalId: d.externalId,
    id: d.id,
    roles: d.roles,
    account_id: d.accountId,
  }));

export const marshalCreateAccountUserRequestSchema: z.ZodType = z
  .object({
    active: z.boolean().optional(),
    displayName: z.string().optional(),
    emails: z
      .array(z.lazy(() => marshalCreateAccountComplexValueSchema))
      .optional(),
    externalId: z.string().optional(),
    id: z.string().optional(),
    name: z.lazy(() => marshalCreateAccountNameSchema).optional(),
    roles: z
      .array(z.lazy(() => marshalCreateAccountComplexValueSchema))
      .optional(),
    userName: z.string().optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    active: d.active,
    displayName: d.displayName,
    emails: d.emails,
    externalId: d.externalId,
    id: d.id,
    name: d.name,
    roles: d.roles,
    userName: d.userName,
    account_id: d.accountId,
  }));

export const marshalCreateComplexValueSchema: z.ZodType = z
  .object({
    display: z.string().optional(),
    primary: z.boolean().optional(),
    ref: z.string().optional(),
    type: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    display: d.display,
    primary: d.primary,
    $ref: d.ref,
    type: d.type,
    value: d.value,
  }));

export const marshalCreateGroupRequestSchema: z.ZodType = z
  .object({
    displayName: z.string().optional(),
    entitlements: z
      .array(z.lazy(() => marshalCreateComplexValueSchema))
      .optional(),
    externalId: z.string().optional(),
    groups: z.array(z.lazy(() => marshalCreateComplexValueSchema)).optional(),
    id: z.string().optional(),
    members: z.array(z.lazy(() => marshalCreateComplexValueSchema)).optional(),
    meta: z.lazy(() => marshalCreateResourceMetaSchema).optional(),
    roles: z.array(z.lazy(() => marshalCreateComplexValueSchema)).optional(),
    schemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    displayName: d.displayName,
    entitlements: d.entitlements,
    externalId: d.externalId,
    groups: d.groups,
    id: d.id,
    members: d.members,
    meta: d.meta,
    roles: d.roles,
    schemas: d.schemas,
  }));

export const marshalCreateNameSchema: z.ZodType = z
  .object({
    familyName: z.string().optional(),
    givenName: z.string().optional(),
  })
  .transform(d => ({
    familyName: d.familyName,
    givenName: d.givenName,
  }));

export const marshalCreatePasswordAccessControlRequestSchema: z.ZodType = z
  .object({
    groupName: z.string().optional(),
    permissionLevel: z.string().optional(),
    servicePrincipalName: z.string().optional(),
    userName: z.string().optional(),
  })
  .transform(d => ({
    group_name: d.groupName,
    permission_level: d.permissionLevel,
    service_principal_name: d.servicePrincipalName,
    user_name: d.userName,
  }));

export const marshalCreateResourceMetaSchema: z.ZodType = z
  .object({
    resourceType: z.string().optional(),
  })
  .transform(d => ({
    resourceType: d.resourceType,
  }));

export const marshalCreateServicePrincipalRequestSchema: z.ZodType = z
  .object({
    active: z.boolean().optional(),
    applicationId: z.string().optional(),
    displayName: z.string().optional(),
    entitlements: z
      .array(z.lazy(() => marshalCreateComplexValueSchema))
      .optional(),
    externalId: z.string().optional(),
    groups: z.array(z.lazy(() => marshalCreateComplexValueSchema)).optional(),
    id: z.string().optional(),
    roles: z.array(z.lazy(() => marshalCreateComplexValueSchema)).optional(),
    schemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    active: d.active,
    applicationId: d.applicationId,
    displayName: d.displayName,
    entitlements: d.entitlements,
    externalId: d.externalId,
    groups: d.groups,
    id: d.id,
    roles: d.roles,
    schemas: d.schemas,
  }));

export const marshalCreateUserRequestSchema: z.ZodType = z
  .object({
    active: z.boolean().optional(),
    displayName: z.string().optional(),
    emails: z.array(z.lazy(() => marshalCreateComplexValueSchema)).optional(),
    entitlements: z
      .array(z.lazy(() => marshalCreateComplexValueSchema))
      .optional(),
    externalId: z.string().optional(),
    groups: z.array(z.lazy(() => marshalCreateComplexValueSchema)).optional(),
    id: z.string().optional(),
    name: z.lazy(() => marshalCreateNameSchema).optional(),
    roles: z.array(z.lazy(() => marshalCreateComplexValueSchema)).optional(),
    schemas: z.array(z.string()).optional(),
    userName: z.string().optional(),
  })
  .transform(d => ({
    active: d.active,
    displayName: d.displayName,
    emails: d.emails,
    entitlements: d.entitlements,
    externalId: d.externalId,
    groups: d.groups,
    id: d.id,
    name: d.name,
    roles: d.roles,
    schemas: d.schemas,
    userName: d.userName,
  }));

export const marshalPasswordPermissionsRequestSchema: z.ZodType = z
  .object({
    accessControlList: z
      .array(z.lazy(() => marshalCreatePasswordAccessControlRequestSchema))
      .optional(),
  })
  .transform(d => ({
    access_control_list: d.accessControlList,
  }));

export const marshalPatchSchema: z.ZodType = z
  .object({
    op: z.string().optional(),
    path: z.string().optional(),
    value: jsonValueSchema.optional(),
  })
  .transform(d => ({
    op: d.op,
    path: d.path,
    value: d.value,
  }));

export const marshalPatchAccountGroupRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    operations: z.array(z.lazy(() => marshalAccountPatchSchema)).optional(),
    schemas: z.array(z.string()).optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    Operations: d.operations,
    schemas: d.schemas,
    account_id: d.accountId,
  }));

export const marshalPatchAccountServicePrincipalRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    operations: z.array(z.lazy(() => marshalAccountPatchSchema)).optional(),
    schemas: z.array(z.string()).optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    Operations: d.operations,
    schemas: d.schemas,
    account_id: d.accountId,
  }));

export const marshalPatchAccountUserRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    operations: z.array(z.lazy(() => marshalAccountPatchSchema)).optional(),
    schemas: z.array(z.string()).optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    Operations: d.operations,
    schemas: d.schemas,
    account_id: d.accountId,
  }));

export const marshalPatchGroupRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    operations: z.array(z.lazy(() => marshalPatchSchema)).optional(),
    schemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    Operations: d.operations,
    schemas: d.schemas,
  }));

export const marshalPatchServicePrincipalRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    operations: z.array(z.lazy(() => marshalPatchSchema)).optional(),
    schemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    Operations: d.operations,
    schemas: d.schemas,
  }));

export const marshalPatchUserRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    operations: z.array(z.lazy(() => marshalPatchSchema)).optional(),
    schemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    Operations: d.operations,
    schemas: d.schemas,
  }));

export const marshalUpdateAccountComplexValueSchema: z.ZodType = z
  .object({
    display: z.string().optional(),
    primary: z.boolean().optional(),
    ref: z.string().optional(),
    type: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    display: d.display,
    primary: d.primary,
    $ref: d.ref,
    type: d.type,
    value: d.value,
  }));

export const marshalUpdateAccountGroupRequestSchema: z.ZodType = z
  .object({
    displayName: z.string().optional(),
    externalId: z.string().optional(),
    id: z.string().optional(),
    members: z
      .array(z.lazy(() => marshalUpdateAccountComplexValueSchema))
      .optional(),
    meta: z.lazy(() => marshalUpdateAccountResourceMetaSchema).optional(),
    roles: z
      .array(z.lazy(() => marshalUpdateAccountComplexValueSchema))
      .optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    displayName: d.displayName,
    externalId: d.externalId,
    id: d.id,
    members: d.members,
    meta: d.meta,
    roles: d.roles,
    account_id: d.accountId,
  }));

export const marshalUpdateAccountNameSchema: z.ZodType = z
  .object({
    familyName: z.string().optional(),
    givenName: z.string().optional(),
  })
  .transform(d => ({
    familyName: d.familyName,
    givenName: d.givenName,
  }));

export const marshalUpdateAccountResourceMetaSchema: z.ZodType = z
  .object({
    resourceType: z.string().optional(),
  })
  .transform(d => ({
    resourceType: d.resourceType,
  }));

export const marshalUpdateAccountServicePrincipalRequestSchema: z.ZodType = z
  .object({
    active: z.boolean().optional(),
    applicationId: z.string().optional(),
    displayName: z.string().optional(),
    externalId: z.string().optional(),
    id: z.string().optional(),
    roles: z
      .array(z.lazy(() => marshalUpdateAccountComplexValueSchema))
      .optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    active: d.active,
    applicationId: d.applicationId,
    displayName: d.displayName,
    externalId: d.externalId,
    id: d.id,
    roles: d.roles,
    account_id: d.accountId,
  }));

export const marshalUpdateAccountUserRequestSchema: z.ZodType = z
  .object({
    active: z.boolean().optional(),
    displayName: z.string().optional(),
    emails: z
      .array(z.lazy(() => marshalUpdateAccountComplexValueSchema))
      .optional(),
    externalId: z.string().optional(),
    id: z.string().optional(),
    name: z.lazy(() => marshalUpdateAccountNameSchema).optional(),
    roles: z
      .array(z.lazy(() => marshalUpdateAccountComplexValueSchema))
      .optional(),
    userName: z.string().optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    active: d.active,
    displayName: d.displayName,
    emails: d.emails,
    externalId: d.externalId,
    id: d.id,
    name: d.name,
    roles: d.roles,
    userName: d.userName,
    account_id: d.accountId,
  }));

export const marshalUpdateComplexValueSchema: z.ZodType = z
  .object({
    display: z.string().optional(),
    primary: z.boolean().optional(),
    ref: z.string().optional(),
    type: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    display: d.display,
    primary: d.primary,
    $ref: d.ref,
    type: d.type,
    value: d.value,
  }));

export const marshalUpdateGroupRequestSchema: z.ZodType = z
  .object({
    displayName: z.string().optional(),
    entitlements: z
      .array(z.lazy(() => marshalUpdateComplexValueSchema))
      .optional(),
    externalId: z.string().optional(),
    groups: z.array(z.lazy(() => marshalUpdateComplexValueSchema)).optional(),
    id: z.string().optional(),
    members: z.array(z.lazy(() => marshalUpdateComplexValueSchema)).optional(),
    meta: z.lazy(() => marshalUpdateResourceMetaSchema).optional(),
    roles: z.array(z.lazy(() => marshalUpdateComplexValueSchema)).optional(),
    schemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    displayName: d.displayName,
    entitlements: d.entitlements,
    externalId: d.externalId,
    groups: d.groups,
    id: d.id,
    members: d.members,
    meta: d.meta,
    roles: d.roles,
    schemas: d.schemas,
  }));

export const marshalUpdateNameSchema: z.ZodType = z
  .object({
    familyName: z.string().optional(),
    givenName: z.string().optional(),
  })
  .transform(d => ({
    familyName: d.familyName,
    givenName: d.givenName,
  }));

export const marshalUpdateResourceMetaSchema: z.ZodType = z
  .object({
    resourceType: z.string().optional(),
  })
  .transform(d => ({
    resourceType: d.resourceType,
  }));

export const marshalUpdateServicePrincipalRequestSchema: z.ZodType = z
  .object({
    active: z.boolean().optional(),
    applicationId: z.string().optional(),
    displayName: z.string().optional(),
    entitlements: z
      .array(z.lazy(() => marshalUpdateComplexValueSchema))
      .optional(),
    externalId: z.string().optional(),
    groups: z.array(z.lazy(() => marshalUpdateComplexValueSchema)).optional(),
    id: z.string().optional(),
    roles: z.array(z.lazy(() => marshalUpdateComplexValueSchema)).optional(),
    schemas: z.array(z.string()).optional(),
  })
  .transform(d => ({
    active: d.active,
    applicationId: d.applicationId,
    displayName: d.displayName,
    entitlements: d.entitlements,
    externalId: d.externalId,
    groups: d.groups,
    id: d.id,
    roles: d.roles,
    schemas: d.schemas,
  }));

export const marshalUpdateUserRequestSchema: z.ZodType = z
  .object({
    active: z.boolean().optional(),
    displayName: z.string().optional(),
    emails: z.array(z.lazy(() => marshalUpdateComplexValueSchema)).optional(),
    entitlements: z
      .array(z.lazy(() => marshalUpdateComplexValueSchema))
      .optional(),
    externalId: z.string().optional(),
    groups: z.array(z.lazy(() => marshalUpdateComplexValueSchema)).optional(),
    id: z.string().optional(),
    name: z.lazy(() => marshalUpdateNameSchema).optional(),
    roles: z.array(z.lazy(() => marshalUpdateComplexValueSchema)).optional(),
    schemas: z.array(z.string()).optional(),
    userName: z.string().optional(),
  })
  .transform(d => ({
    active: d.active,
    displayName: d.displayName,
    emails: d.emails,
    entitlements: d.entitlements,
    externalId: d.externalId,
    groups: d.groups,
    id: d.id,
    name: d.name,
    roles: d.roles,
    schemas: d.schemas,
    userName: d.userName,
  }));
