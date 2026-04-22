// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
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

const effectivePrivilegeFieldMaskSchema: FieldMaskSchema = {
  inheritedFromName: {wire: 'inherited_from_name'},
  inheritedFromType: {wire: 'inherited_from_type'},
  privilege: {wire: 'privilege'},
};

export function effectivePrivilegeFieldMask(
  ...paths: string[]
): FieldMask<EffectivePrivilege> {
  return FieldMask.build<EffectivePrivilege>(
    paths,
    effectivePrivilegeFieldMaskSchema
  );
}

const effectivePrivilegeAssignmentFieldMaskSchema: FieldMaskSchema = {
  principal: {wire: 'principal'},
  privileges: {wire: 'privileges'},
};

export function effectivePrivilegeAssignmentFieldMask(
  ...paths: string[]
): FieldMask<EffectivePrivilegeAssignment> {
  return FieldMask.build<EffectivePrivilegeAssignment>(
    paths,
    effectivePrivilegeAssignmentFieldMaskSchema
  );
}

const getEffectivePermissionsFieldMaskSchema: FieldMaskSchema = {
  maxResults: {wire: 'max_results'},
  pageToken: {wire: 'page_token'},
  principal: {wire: 'principal'},
  securableFullName: {wire: 'securable_full_name'},
  securableType: {wire: 'securable_type'},
};

export function getEffectivePermissionsFieldMask(
  ...paths: string[]
): FieldMask<GetEffectivePermissions> {
  return FieldMask.build<GetEffectivePermissions>(
    paths,
    getEffectivePermissionsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const getEffectivePermissions_ResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  privilegeAssignments: {wire: 'privilege_assignments'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function getEffectivePermissions_ResponseFieldMask(
  ...paths: string[]
): FieldMask<GetEffectivePermissions_Response> {
  return FieldMask.build<GetEffectivePermissions_Response>(
    paths,
    getEffectivePermissions_ResponseFieldMaskSchema
  );
}

const getPermissionsFieldMaskSchema: FieldMaskSchema = {
  includeDeletedPrincipals: {wire: 'include_deleted_principals'},
  maxResults: {wire: 'max_results'},
  pageToken: {wire: 'page_token'},
  principal: {wire: 'principal'},
  securableFullName: {wire: 'securable_full_name'},
  securableType: {wire: 'securable_type'},
};

export function getPermissionsFieldMask(
  ...paths: string[]
): FieldMask<GetPermissions> {
  return FieldMask.build<GetPermissions>(paths, getPermissionsFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const getPermissions_ResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  privilegeAssignments: {wire: 'privilege_assignments'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function getPermissions_ResponseFieldMask(
  ...paths: string[]
): FieldMask<GetPermissions_Response> {
  return FieldMask.build<GetPermissions_Response>(
    paths,
    getPermissions_ResponseFieldMaskSchema
  );
}

const listEffectivePrivilegeAssignmentsRequestFieldMaskSchema: FieldMaskSchema =
  {
    fullName: {wire: 'full_name'},
    includeDeletedPrincipals: {wire: 'include_deleted_principals'},
    pageSize: {wire: 'page_size'},
    pageToken: {wire: 'page_token'},
    principal: {wire: 'principal'},
    securableType: {wire: 'securable_type'},
  };

export function listEffectivePrivilegeAssignmentsRequestFieldMask(
  ...paths: string[]
): FieldMask<ListEffectivePrivilegeAssignmentsRequest> {
  return FieldMask.build<ListEffectivePrivilegeAssignmentsRequest>(
    paths,
    listEffectivePrivilegeAssignmentsRequestFieldMaskSchema
  );
}

const listEffectivePrivilegeAssignmentsResponseFieldMaskSchema: FieldMaskSchema =
  {
    effectivePrivilegeAssignments: {wire: 'effective_privilege_assignments'},
    nextPageToken: {wire: 'next_page_token'},
  };

export function listEffectivePrivilegeAssignmentsResponseFieldMask(
  ...paths: string[]
): FieldMask<ListEffectivePrivilegeAssignmentsResponse> {
  return FieldMask.build<ListEffectivePrivilegeAssignmentsResponse>(
    paths,
    listEffectivePrivilegeAssignmentsResponseFieldMaskSchema
  );
}

const listPrivilegeAssignmentsRequestFieldMaskSchema: FieldMaskSchema = {
  fullName: {wire: 'full_name'},
  includeDeletedPrincipals: {wire: 'include_deleted_principals'},
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
  principal: {wire: 'principal'},
  securableType: {wire: 'securable_type'},
};

export function listPrivilegeAssignmentsRequestFieldMask(
  ...paths: string[]
): FieldMask<ListPrivilegeAssignmentsRequest> {
  return FieldMask.build<ListPrivilegeAssignmentsRequest>(
    paths,
    listPrivilegeAssignmentsRequestFieldMaskSchema
  );
}

const listPrivilegeAssignmentsResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  privilegeAssignments: {wire: 'privilege_assignments'},
};

export function listPrivilegeAssignmentsResponseFieldMask(
  ...paths: string[]
): FieldMask<ListPrivilegeAssignmentsResponse> {
  return FieldMask.build<ListPrivilegeAssignmentsResponse>(
    paths,
    listPrivilegeAssignmentsResponseFieldMaskSchema
  );
}

const permissionsChangeFieldMaskSchema: FieldMaskSchema = {
  add: {wire: 'add'},
  principal: {wire: 'principal'},
  principalId: {wire: 'principal_id'},
  remove: {wire: 'remove'},
};

export function permissionsChangeFieldMask(
  ...paths: string[]
): FieldMask<PermissionsChange> {
  return FieldMask.build<PermissionsChange>(
    paths,
    permissionsChangeFieldMaskSchema
  );
}

const privilegeAssignmentFieldMaskSchema: FieldMaskSchema = {
  principal: {wire: 'principal'},
  principalId: {wire: 'principal_id'},
  privileges: {wire: 'privileges'},
};

export function privilegeAssignmentFieldMask(
  ...paths: string[]
): FieldMask<PrivilegeAssignment> {
  return FieldMask.build<PrivilegeAssignment>(
    paths,
    privilegeAssignmentFieldMaskSchema
  );
}

const updatePermissionsFieldMaskSchema: FieldMaskSchema = {
  changes: {wire: 'changes'},
  securableFullName: {wire: 'securable_full_name'},
  securableType: {wire: 'securable_type'},
};

export function updatePermissionsFieldMask(
  ...paths: string[]
): FieldMask<UpdatePermissions> {
  return FieldMask.build<UpdatePermissions>(
    paths,
    updatePermissionsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const updatePermissions_ResponseFieldMaskSchema: FieldMaskSchema = {
  privilegeAssignments: {wire: 'privilege_assignments'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function updatePermissions_ResponseFieldMask(
  ...paths: string[]
): FieldMask<UpdatePermissions_Response> {
  return FieldMask.build<UpdatePermissions_Response>(
    paths,
    updatePermissions_ResponseFieldMaskSchema
  );
}
