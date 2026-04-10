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

export interface GetEffectivePermissions {
  /** Type of securable. */
  securableType?: string | undefined;
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetEffectivePermissions_Response {
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
  /** The privileges conveyed to each principal (either directly or via inheritance) */
  privilegeAssignments?: EffectivePrivilegeAssignment[] | undefined;
}

export interface GetPermissions {
  /** Type of securable. */
  securableType?: string | undefined;
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
  /** Optional. If true, also return privilege assignments whose principals have been deleted. */
  includeDeletedPrincipals?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetPermissions_Response {
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
  securableType?: string | undefined;
  /** Full name of securable. */
  fullName?: string | undefined;
  /** If provided, only the effective permissions for the specified principal (user or group) are returned. */
  principal?: string | undefined;
  /** Optional. If true, also return privilege assignments whose principals have been deleted. */
  includeDeletedPrincipals?: boolean | undefined;
  /**
   * Specifies the maximum number of effective privilege assignments to return per page.
   * If not set or set to 0, a server-configured default is used.
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
  securableType?: string | undefined;
  /** Full name of securable. */
  fullName?: string | undefined;
  /** If provided, only the permissions for the specified principal (user or group) are returned. */
  principal?: string | undefined;
  /** Optional. If true, also return privilege assignments whose principals have been deleted. */
  includeDeletedPrincipals?: boolean | undefined;
  /**
   * Specifies the maximum number of privileges to return (page length).
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
  /**
   * An opaque internal ID that identifies the principal whose privileges should be removed.
   *
   * This field is intended for removing privileges associated with a deleted user. When set, only the entries specified in the remove field are processed; any entries in the add field will be rejected.
   *
   * Only one of principal or principal_id should be specified, never both at the same time.
   */
  principalId?: number | undefined;
}

export interface PrivilegeAssignment {
  /**
   * The principal (user email address or group name).
   * For deleted principals, `principal` is empty while `principal_id` is populated.
   */
  principal?: string | undefined;
  /** The privileges assigned to the principal. */
  privileges?: string[] | undefined;
  /** Unique identifier of the principal. For active principals, both `principal` and `principal_id` are present. */
  principalId?: number | undefined;
}

export interface UpdatePermissions {
  /** Type of securable. */
  securableType?: string | undefined;
  /** Full name of securable. */
  securableFullName?: string | undefined;
  /** Array of permissions change objects. */
  changes?: PermissionsChange[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdatePermissions_Response {
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

export const unmarshalGetEffectivePermissionsSchema: z.ZodType<GetEffectivePermissions> =
  z
    .object({
      securable_type: z.string().optional(),
      securable_full_name: z.string().optional(),
      principal: z.string().optional(),
      max_results: z.number().optional(),
      page_token: z.string().optional(),
    })
    .transform(d => ({
      securableType: d.securable_type,
      securableFullName: d.securable_full_name,
      principal: d.principal,
      maxResults: d.max_results,
      pageToken: d.page_token,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetEffectivePermissions_ResponseSchema: z.ZodType<GetEffectivePermissions_Response> =
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

export const unmarshalGetPermissionsSchema: z.ZodType<GetPermissions> = z
  .object({
    securable_type: z.string().optional(),
    securable_full_name: z.string().optional(),
    principal: z.string().optional(),
    max_results: z.number().optional(),
    page_token: z.string().optional(),
    include_deleted_principals: z.boolean().optional(),
  })
  .transform(d => ({
    securableType: d.securable_type,
    securableFullName: d.securable_full_name,
    principal: d.principal,
    maxResults: d.max_results,
    pageToken: d.page_token,
    includeDeletedPrincipals: d.include_deleted_principals,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetPermissions_ResponseSchema: z.ZodType<GetPermissions_Response> =
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

export const unmarshalListEffectivePrivilegeAssignmentsRequestSchema: z.ZodType<ListEffectivePrivilegeAssignmentsRequest> =
  z
    .object({
      securable_type: z.string().optional(),
      full_name: z.string().optional(),
      principal: z.string().optional(),
      include_deleted_principals: z.boolean().optional(),
      page_size: z.number().optional(),
      page_token: z.string().optional(),
    })
    .transform(d => ({
      securableType: d.securable_type,
      fullName: d.full_name,
      principal: d.principal,
      includeDeletedPrincipals: d.include_deleted_principals,
      pageSize: d.page_size,
      pageToken: d.page_token,
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

export const unmarshalListPrivilegeAssignmentsRequestSchema: z.ZodType<ListPrivilegeAssignmentsRequest> =
  z
    .object({
      securable_type: z.string().optional(),
      full_name: z.string().optional(),
      principal: z.string().optional(),
      include_deleted_principals: z.boolean().optional(),
      page_size: z.number().optional(),
      page_token: z.string().optional(),
    })
    .transform(d => ({
      securableType: d.securable_type,
      fullName: d.full_name,
      principal: d.principal,
      includeDeletedPrincipals: d.include_deleted_principals,
      pageSize: d.page_size,
      pageToken: d.page_token,
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

export const unmarshalPermissionsChangeSchema: z.ZodType<PermissionsChange> = z
  .object({
    principal: z.string().optional(),
    add: z.array(z.string()).optional(),
    remove: z.array(z.string()).optional(),
    principal_id: z.number().optional(),
  })
  .transform(d => ({
    principal: d.principal,
    add: d.add,
    remove: d.remove,
    principalId: d.principal_id,
  }));

export const unmarshalPrivilegeAssignmentSchema: z.ZodType<PrivilegeAssignment> =
  z
    .object({
      principal: z.string().optional(),
      privileges: z.array(z.string()).optional(),
      principal_id: z.number().optional(),
    })
    .transform(d => ({
      principal: d.principal,
      privileges: d.privileges,
      principalId: d.principal_id,
    }));

export const unmarshalUpdatePermissionsSchema: z.ZodType<UpdatePermissions> = z
  .object({
    securable_type: z.string().optional(),
    securable_full_name: z.string().optional(),
    changes: z.array(z.lazy(() => unmarshalPermissionsChangeSchema)).optional(),
  })
  .transform(d => ({
    securableType: d.securable_type,
    securableFullName: d.securable_full_name,
    changes: d.changes,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdatePermissions_ResponseSchema: z.ZodType<UpdatePermissions_Response> =
  z
    .object({
      privilege_assignments: z
        .array(z.lazy(() => unmarshalPrivilegeAssignmentSchema))
        .optional(),
    })
    .transform(d => ({
      privilegeAssignments: d.privilege_assignments,
    }));

export const marshalEffectivePrivilegeSchema: z.ZodType = z
  .object({
    privilege: z.string().optional(),
    inheritedFromType: z.string().optional(),
    inheritedFromName: z.string().optional(),
  })
  .transform(d => ({
    privilege: d.privilege,
    inherited_from_type: d.inheritedFromType,
    inherited_from_name: d.inheritedFromName,
  }));

export const marshalEffectivePrivilegeAssignmentSchema: z.ZodType = z
  .object({
    principal: z.string().optional(),
    privileges: z
      .array(z.lazy(() => marshalEffectivePrivilegeSchema))
      .optional(),
  })
  .transform(d => ({
    principal: d.principal,
    privileges: d.privileges,
  }));

export const marshalGetEffectivePermissionsSchema: z.ZodType = z
  .object({
    securableType: z.string().optional(),
    securableFullName: z.string().optional(),
    principal: z.string().optional(),
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    securable_type: d.securableType,
    securable_full_name: d.securableFullName,
    principal: d.principal,
    max_results: d.maxResults,
    page_token: d.pageToken,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetEffectivePermissions_ResponseSchema: z.ZodType = z
  .object({
    nextPageToken: z.string().optional(),
    privilegeAssignments: z
      .array(z.lazy(() => marshalEffectivePrivilegeAssignmentSchema))
      .optional(),
  })
  .transform(d => ({
    next_page_token: d.nextPageToken,
    privilege_assignments: d.privilegeAssignments,
  }));

export const marshalGetPermissionsSchema: z.ZodType = z
  .object({
    securableType: z.string().optional(),
    securableFullName: z.string().optional(),
    principal: z.string().optional(),
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
    includeDeletedPrincipals: z.boolean().optional(),
  })
  .transform(d => ({
    securable_type: d.securableType,
    securable_full_name: d.securableFullName,
    principal: d.principal,
    max_results: d.maxResults,
    page_token: d.pageToken,
    include_deleted_principals: d.includeDeletedPrincipals,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetPermissions_ResponseSchema: z.ZodType = z
  .object({
    nextPageToken: z.string().optional(),
    privilegeAssignments: z
      .array(z.lazy(() => marshalPrivilegeAssignmentSchema))
      .optional(),
  })
  .transform(d => ({
    next_page_token: d.nextPageToken,
    privilege_assignments: d.privilegeAssignments,
  }));

export const marshalListEffectivePrivilegeAssignmentsRequestSchema: z.ZodType =
  z
    .object({
      securableType: z.string().optional(),
      fullName: z.string().optional(),
      principal: z.string().optional(),
      includeDeletedPrincipals: z.boolean().optional(),
      pageSize: z.number().optional(),
      pageToken: z.string().optional(),
    })
    .transform(d => ({
      securable_type: d.securableType,
      full_name: d.fullName,
      principal: d.principal,
      include_deleted_principals: d.includeDeletedPrincipals,
      page_size: d.pageSize,
      page_token: d.pageToken,
    }));

export const marshalListEffectivePrivilegeAssignmentsResponseSchema: z.ZodType =
  z
    .object({
      effectivePrivilegeAssignments: z
        .array(z.lazy(() => marshalEffectivePrivilegeAssignmentSchema))
        .optional(),
      nextPageToken: z.string().optional(),
    })
    .transform(d => ({
      effective_privilege_assignments: d.effectivePrivilegeAssignments,
      next_page_token: d.nextPageToken,
    }));

export const marshalListPrivilegeAssignmentsRequestSchema: z.ZodType = z
  .object({
    securableType: z.string().optional(),
    fullName: z.string().optional(),
    principal: z.string().optional(),
    includeDeletedPrincipals: z.boolean().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    securable_type: d.securableType,
    full_name: d.fullName,
    principal: d.principal,
    include_deleted_principals: d.includeDeletedPrincipals,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListPrivilegeAssignmentsResponseSchema: z.ZodType = z
  .object({
    privilegeAssignments: z
      .array(z.lazy(() => marshalPrivilegeAssignmentSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    privilege_assignments: d.privilegeAssignments,
    next_page_token: d.nextPageToken,
  }));

export const marshalPermissionsChangeSchema: z.ZodType = z
  .object({
    principal: z.string().optional(),
    add: z.array(z.string()).optional(),
    remove: z.array(z.string()).optional(),
    principalId: z.number().optional(),
  })
  .transform(d => ({
    principal: d.principal,
    add: d.add,
    remove: d.remove,
    principal_id: d.principalId,
  }));

export const marshalPrivilegeAssignmentSchema: z.ZodType = z
  .object({
    principal: z.string().optional(),
    privileges: z.array(z.string()).optional(),
    principalId: z.number().optional(),
  })
  .transform(d => ({
    principal: d.principal,
    privileges: d.privileges,
    principal_id: d.principalId,
  }));

export const marshalUpdatePermissionsSchema: z.ZodType = z
  .object({
    securableType: z.string().optional(),
    securableFullName: z.string().optional(),
    changes: z.array(z.lazy(() => marshalPermissionsChangeSchema)).optional(),
  })
  .transform(d => ({
    securable_type: d.securableType,
    securable_full_name: d.securableFullName,
    changes: d.changes,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdatePermissions_ResponseSchema: z.ZodType = z
  .object({
    privilegeAssignments: z
      .array(z.lazy(() => marshalPrivilegeAssignmentSchema))
      .optional(),
  })
  .transform(d => ({
    privilege_assignments: d.privilegeAssignments,
  }));
