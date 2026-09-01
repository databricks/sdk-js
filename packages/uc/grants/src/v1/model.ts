// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface EffectivePrivilege {
  /** The privilege assigned to the principal. */
  privilege?: string | undefined;
  /**
   * The type of the object that conveys this privilege via inheritance.
   * This field is omitted when privilege is not inherited (it's assigned to the securable itself).
   */
  inheritedFromType?: string | undefined;
  /**
   * The full name of the object that conveys this privilege via inheritance.
   * This field is omitted when privilege is not inherited (it's assigned to the securable itself).
   */
  inheritedFromName?: string | undefined;
}

export interface EffectivePrivilegeAssignment {
  /** The principal (user email address or group name). */
  principal?: string | undefined;
  /** The privileges conveyed to the principal (either directly or via inheritance). */
  privileges?: EffectivePrivilege[] | undefined;
}

export interface GetEffectivePermissionsRequest {
  /** Type of securable. */
  securableType: string;
  /** Full name of securable. */
  securableFullName?: string | undefined;
  /** If provided, only the effective permissions for the specified principal (user or group) are returned. */
  principal?: string | undefined;
  /**
   * Specifies the maximum number of privileges to return (page length).
   * Every EffectivePrivilegeAssignment present in a single page response is guaranteed to contain all the effective
   * privileges granted on (or inherited by) the requested Securable for the respective principal.
   *
   * If not set, all the effective permissions are returned.
   * If set to
   * - lesser than 0: invalid parameter error
   * - 0: page length is set to a server configured value
   * - lesser than 150 but greater than 0: invalid parameter error (this is to ensure that server is able to return at
   * least one complete EffectivePrivilegeAssignment in a single page response)
   * - greater than (or equal to) 150: page length is the minimum of this value and a server configured value
   */
  maxResults?: number | undefined;
  /** Opaque token for the next page of results (pagination). */
  pageToken?: string | undefined;
}

export interface GetEffectivePermissionsResponse {
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
  /** The privileges conveyed to each principal (either directly or via inheritance) */
  privilegeAssignments?: EffectivePrivilegeAssignment[] | undefined;
}

export interface GetPermissionsRequest {
  /** Type of securable. */
  securableType: string;
  /** Full name of securable. */
  securableFullName?: string | undefined;
  /** If provided, only the permissions for the specified principal (user or group) are returned. */
  principal?: string | undefined;
  /**
   * Specifies the maximum number of privileges to return (page length).
   * Every PrivilegeAssignment present in a single page response is guaranteed to contain all the privileges granted on
   * the requested Securable for the respective principal.
   *
   * If not set, all the permissions are returned.
   * If set to
   * - lesser than 0: invalid parameter error
   * - 0: page length is set to a server configured value
   * - lesser than 150 but greater than 0: invalid parameter error (this is to ensure that server is able to return at
   * least one complete PrivilegeAssignment in a single page response)
   * - greater than (or equal to) 150: page length is the minimum of this value and a server configured value
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface GetPermissionsResponse {
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
  /** The privileges assigned to each principal */
  privilegeAssignments?: PrivilegeAssignment[] | undefined;
}

export interface ListEffectivePrivilegeAssignmentsRequest {
  /** Type of securable. */
  securableType: string;
  /** Full name of securable. */
  fullName: string;
  /** If provided, only the effective permissions for the specified principal (user or group) are returned. */
  principal?: string | undefined;
  /**
   * Specifies the maximum number of privilege assignments to return (page length).
   * Every EffectivePrivilegeAssignment present in a single page response is guaranteed to contain all the effective
   * privileges granted on (or inherited by) the requested Securable for the respective principal.
   *
   * If not set, a server-configured default is used.
   * If set to
   * - lesser than 0: invalid parameter error
   * - 0: page length is set to a server configured value
   * - lesser than 150 but greater than 0: invalid parameter error (this is to ensure that server is able to return at
   * least one complete EffectivePrivilegeAssignment in a single page response)
   * - greater than (or equal to) 150: page length is the minimum of this value and a server configured value
   */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListEffectivePrivilegeAssignmentsResponse {
  /** The effective privilege assignments for the securable (and optional principal). */
  effectivePrivilegeAssignments?: EffectivePrivilegeAssignment[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListPrivilegeAssignmentsRequest {
  /** Type of securable. */
  securableType: string;
  /** Full name of securable. */
  fullName: string;
  /** If provided, only the permissions for the specified principal (user or group) are returned. */
  principal?: string | undefined;
  /**
   * Specifies the maximum number of privilege assignments to return (page length).
   * Every PrivilegeAssignment present in a single page response is guaranteed to contain all the privileges granted on
   * the requested Securable for the respective principal.
   *
   * If not set, page length is the server configured value.
   * If set to
   * - lesser than 0: invalid parameter error
   * - 0: page length is set to a server configured value
   * - lesser than 150 but greater than 0: invalid parameter error (this is to ensure that server is able to return at
   * least one complete PrivilegeAssignment in a single page response)
   * - greater than (or equal to) 150: page length is the minimum of this value and a server configured value
   */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListPrivilegeAssignmentsResponse {
  privilegeAssignments?: PrivilegeAssignment[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface PermissionsChange {
  /**
   * The principal whose privileges we are changing.
   * Only one of principal or principal_id should be specified, never both at the same time.
   */
  principal?: string | undefined;
  /** The set of privileges to add. */
  add?: string[] | undefined;
  /** The set of privileges to remove. */
  remove?: string[] | undefined;
}

export interface PrivilegeAssignment {
  /**
   * The principal (user email address or group name).
   * For deleted principals, `principal` is empty while `principal_id` is populated.
   */
  principal?: string | undefined;
  /** The privileges assigned to the principal. */
  privileges?: string[] | undefined;
}

export interface UpdatePermissionsRequest {
  /** Type of securable. */
  securableType: string;
  /** Full name of securable. */
  securableFullName?: string | undefined;
  /** Optional, default false. Specifies whether all the permissions should be returned in the response. */
  omitPermissionsInResponse?: boolean | undefined;
  /** Array of permissions change objects. */
  changes?: PermissionsChange[] | undefined;
}

export interface UpdatePermissionsResponse {
  /** The privileges assigned to each principal */
  privilegeAssignments?: PrivilegeAssignment[] | undefined;
}

export const unmarshalEffectivePrivilegeSchema: z.ZodType<EffectivePrivilege> =
  z
    .object({
      privilege: z.string().optional(),
      inherited_from_type: z.string().optional(),
      inherited_from_name: z.string().optional(),
    })
    .transform(d => ({
      privilege: d.privilege,
      inheritedFromType: d.inherited_from_type,
      inheritedFromName: d.inherited_from_name,
    }));

export const unmarshalEffectivePrivilegeAssignmentSchema: z.ZodType<EffectivePrivilegeAssignment> =
  z
    .object({
      principal: z.string().optional(),
      privileges: z
        .array(z.lazy(() => unmarshalEffectivePrivilegeSchema))
        .optional(),
    })
    .transform(d => ({
      principal: d.principal,
      privileges: d.privileges,
    }));

export const unmarshalGetEffectivePermissionsResponseSchema: z.ZodType<GetEffectivePermissionsResponse> =
  z
    .object({
      next_page_token: z.string().optional(),
      privilege_assignments: z
        .array(z.lazy(() => unmarshalEffectivePrivilegeAssignmentSchema))
        .optional(),
    })
    .transform(d => ({
      nextPageToken: d.next_page_token,
      privilegeAssignments: d.privilege_assignments,
    }));

export const unmarshalGetPermissionsResponseSchema: z.ZodType<GetPermissionsResponse> =
  z
    .object({
      next_page_token: z.string().optional(),
      privilege_assignments: z
        .array(z.lazy(() => unmarshalPrivilegeAssignmentSchema))
        .optional(),
    })
    .transform(d => ({
      nextPageToken: d.next_page_token,
      privilegeAssignments: d.privilege_assignments,
    }));

export const unmarshalListEffectivePrivilegeAssignmentsResponseSchema: z.ZodType<ListEffectivePrivilegeAssignmentsResponse> =
  z
    .object({
      effective_privilege_assignments: z
        .array(z.lazy(() => unmarshalEffectivePrivilegeAssignmentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      effectivePrivilegeAssignments: d.effective_privilege_assignments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListPrivilegeAssignmentsResponseSchema: z.ZodType<ListPrivilegeAssignmentsResponse> =
  z
    .object({
      privilege_assignments: z
        .array(z.lazy(() => unmarshalPrivilegeAssignmentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      privilegeAssignments: d.privilege_assignments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalPrivilegeAssignmentSchema: z.ZodType<PrivilegeAssignment> =
  z
    .object({
      principal: z.string().optional(),
      privileges: z.array(z.string()).optional(),
    })
    .transform(d => ({
      principal: d.principal,
      privileges: d.privileges,
    }));

export const unmarshalUpdatePermissionsResponseSchema: z.ZodType<UpdatePermissionsResponse> =
  z
    .object({
      privilege_assignments: z
        .array(z.lazy(() => unmarshalPrivilegeAssignmentSchema))
        .optional(),
    })
    .transform(d => ({
      privilegeAssignments: d.privilege_assignments,
    }));

export const marshalPermissionsChangeSchema: z.ZodType = z
  .object({
    principal: z.string().optional(),
    add: z.array(z.string()).optional(),
    remove: z.array(z.string()).optional(),
  })
  .transform(d => ({
    principal: d.principal,
    add: d.add,
    remove: d.remove,
  }));

export const marshalUpdatePermissionsRequestSchema: z.ZodType = z
  .object({
    securableType: z.string(),
    securableFullName: z.string().optional(),
    omitPermissionsInResponse: z.boolean().optional(),
    changes: z.array(z.lazy(() => marshalPermissionsChangeSchema)).optional(),
  })
  .transform(d => ({
    securable_type: d.securableType,
    securable_full_name: d.securableFullName,
    omit_permissions_in_response: d.omitPermissionsInResponse,
    changes: d.changes,
  }));
