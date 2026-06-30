// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Permission level */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PermissionLevel = {
  CAN_MANAGE: 'CAN_MANAGE',
  CAN_RESTART: 'CAN_RESTART',
  CAN_ATTACH_TO: 'CAN_ATTACH_TO',
  IS_OWNER: 'IS_OWNER',
  CAN_MANAGE_RUN: 'CAN_MANAGE_RUN',
  CAN_VIEW: 'CAN_VIEW',
  CAN_READ: 'CAN_READ',
  CAN_RUN: 'CAN_RUN',
  CAN_EDIT: 'CAN_EDIT',
  CAN_USE: 'CAN_USE',
  CAN_MANAGE_STAGING_VERSIONS: 'CAN_MANAGE_STAGING_VERSIONS',
  CAN_MANAGE_PRODUCTION_VERSIONS: 'CAN_MANAGE_PRODUCTION_VERSIONS',
  CAN_EDIT_METADATA: 'CAN_EDIT_METADATA',
  CAN_VIEW_METADATA: 'CAN_VIEW_METADATA',
  CAN_BIND: 'CAN_BIND',
  CAN_QUERY: 'CAN_QUERY',
  CAN_MONITOR: 'CAN_MONITOR',
  CAN_CREATE: 'CAN_CREATE',
  CAN_MONITOR_ONLY: 'CAN_MONITOR_ONLY',
  CAN_CREATE_APP: 'CAN_CREATE_APP',
} as const;
export type PermissionLevel =
  | (typeof PermissionLevel)[keyof typeof PermissionLevel]
  | (string & {});

/**
 * Defines the identity to be used for authZ of the request on the server side. See one pager for
 * for more information: http://go/acl/service-identity
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RequestAuthzIdentity = {
  REQUEST_AUTHZ_IDENTITY_UNSPECIFIED: 'REQUEST_AUTHZ_IDENTITY_UNSPECIFIED',
  REQUEST_AUTHZ_IDENTITY_USER_CONTEXT: 'REQUEST_AUTHZ_IDENTITY_USER_CONTEXT',
  REQUEST_AUTHZ_IDENTITY_SERVICE_IDENTITY:
    'REQUEST_AUTHZ_IDENTITY_SERVICE_IDENTITY',
} as const;
export type RequestAuthzIdentity =
  | (typeof RequestAuthzIdentity)[keyof typeof RequestAuthzIdentity]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const WorkspacePermission = {
  UNKNOWN: 'UNKNOWN',
  /** The most basic workspace permission */
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;
export type WorkspacePermission =
  | (typeof WorkspacePermission)[keyof typeof WorkspacePermission]
  | (string & {});

export interface AccessControlRequest {
  principalName?:
    | {
        $case: 'userName';
        /** name of the user */
        userName: string;
      }
    | {
        $case: 'groupName';
        /** name of the group */
        groupName: string;
      }
    | {
        $case: 'servicePrincipalName';
        /** application ID of a service principal */
        servicePrincipalName: string;
      }
    | undefined;
  permissionLevel?: PermissionLevel | undefined;
}

export interface AccessControlResponse {
  principalName?:
    | {
        $case: 'userName';
        /** name of the user */
        userName: string;
      }
    | {
        $case: 'groupName';
        /** name of the group */
        groupName: string;
      }
    | {
        $case: 'servicePrincipalName';
        /** Name of the service principal. */
        servicePrincipalName: string;
      }
    | undefined;
  /** Display name of the user or service principal. */
  displayName?: string | undefined;
  /** All permissions. */
  allPermissions?: Permission[] | undefined;
}

/**
 * represents an identity trying to access a resource - user or a service principal
 * group can be a principal of a permission set assignment but an actor is always a user or a service principal
 */
export interface Actor {
  kind?: {$case: 'actorId'; actorId: bigint} | undefined;
}

export interface CheckPolicyRequest {
  /** Required. This field must be set in requests. */
  actor?: Actor | undefined;
  /** Required. This field must be set in requests. */
  permission?: string | undefined;
  /**
   * Ex: (servicePrincipal/use, accounts/<account-id>/servicePrincipals/<sp-id>)
   * Ex: (servicePrincipal.ruleSet/update, accounts/<account-id>/servicePrincipals/<sp-id>/ruleSets/default)
   *
   * Required. This field must be set in requests.
   */
  resource?: string | undefined;
  /** Required. This field must be set in requests. */
  consistencyToken?: ConsistencyToken | undefined;
  /** Required. This field must be set in requests. */
  authzIdentity?: RequestAuthzIdentity | undefined;
  resourceInfo?: ResourceInfo | undefined;
}

export interface CheckPolicyResponse {
  isPermitted?: boolean | undefined;
  /** Required. This field must be set in requests. */
  consistencyToken?: ConsistencyToken | undefined;
}

export interface ConsistencyToken {
  /** Required. This field must be set in requests. */
  value?: string | undefined;
}

/** Removes all permission assignments for a workspace given a principal. */
export interface DeleteWorkspacePermissionAssignmentRequest {
  /** The account ID. */
  accountId?: string | undefined;
  /** The workspace ID for the account. */
  workspaceId?: bigint | undefined;
  /** The ID of the user, service principal, or group. */
  principalId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteWorkspacePermissionAssignmentResponse {}

export interface GetObjectPermissionsRequest {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  /** The id of the request object. */
  requestObjectId?: string | undefined;
}

export interface GetRuleSetRequest {
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /**
   * The ruleset name associated with the request.
   *
   * Examples | Summary
   * :--- | :---
   * `name=accounts/<ACCOUNT_ID>/ruleSets/default` | A name for a rule set on the account.
   * `name=accounts/<ACCOUNT_ID>/groups/<GROUP_ID>/ruleSets/default` | A name for a rule set on the group.
   * `name=accounts/<ACCOUNT_ID>/servicePrincipals/<SERVICE_PRINCIPAL_APPLICATION_ID>/ruleSets/default` | A name for a rule set on the service principal.
   * `name=accounts/<ACCOUNT_ID>/tagPolicies/<TAG_POLICY_ID>/ruleSets/default` | A name for a rule set on the tag policy.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /**
   * Etag used for versioning. The response is at least as fresh as the eTag provided. Etag is used for optimistic
   * concurrency control as a way to help prevent simultaneous updates of a rule set from overwriting each other. It is
   * strongly suggested that systems make use of the etag in the read -> modify -> write pattern to perform rule set
   * updates in order to avoid race conditions that is get an etag from a GET rule set request, and pass it with the
   * PUT update request to identify the rule set version you are updating.
   *
   * Examples | Summary
   * :--- | :---
   * `etag=` | An empty etag can only be used in GET to indicate no freshness requirements.
   * `etag=RENUAAABhSweA4NvVmmUYdiU717H3Tgy0UJdor3gE4a+mq/oj9NjAf8ZsQ==` | An etag encoded a specific version of the rule set to get or to be updated.
   *
   * Required. This field must be set in requests.
   */
  etag?: string | undefined;
}

export interface GrantRule {
  /**
   * Principals this grant rule applies to.
   * A principal can be a user (for end users), a service principal (for applications and
   * compute workloads), or an account group. Each principal has its own identifier format:
   * * users/<USERNAME>
   * * groups/<GROUP_NAME>
   * * servicePrincipals/<SERVICE_PRINCIPAL_APPLICATION_ID>
   */
  principals?: string[] | undefined;
  /**
   * Role that is assigned to the list of principals.
   *
   * Required. This field must be set in requests.
   */
  role?: string | undefined;
}

export interface ListAssignableRolesForResourceRequest {
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /**
   * The resource name for which assignable roles will be listed.
   *
   * Examples | Summary
   * :--- | :---
   * `resource=accounts/<ACCOUNT_ID>` | A resource name for the account.
   * `resource=accounts/<ACCOUNT_ID>/groups/<GROUP_ID>` | A resource name for the group.
   * `resource=accounts/<ACCOUNT_ID>/servicePrincipals/<SP_ID>` | A resource name for the service principal.
   * `resource=accounts/<ACCOUNT_ID>/tagPolicies/<TAG_POLICY_ID>` | A resource name for the tag policy.
   *
   * Required. This field must be set in requests.
   */
  resource?: string | undefined;
}

export interface ListAssignableRolesForResourceResponse {
  roles?: Role[] | undefined;
}

export interface ListPermissionLevelsRequest {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  requestObjectId?: string | undefined;
}

export interface ListPermissionLevelsResponse {
  /** Specific permission levels */
  permissionLevels?: PermissionsDescription[] | undefined;
}

/** Gets all the permission assignments for a workspace, given an account and a workspace. */
export interface ListWorkspacePermissionAssignmentsRequest {
  /** The account ID. */
  accountId?: string | undefined;
  /** The workspace ID for the account. */
  workspaceId?: bigint | undefined;
}

export interface ListWorkspacePermissionAssignmentsResponse {
  /** Array of permissions assignments defined for a workspace. */
  permissionAssignments?: WorkspacePermissionAssignmentOutput[] | undefined;
}

/** List permissions for a workspace, given an account and a workspace. */
export interface ListWorkspacePermissionsRequest {
  /** The account ID. */
  accountId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: bigint | undefined;
}

export interface ListWorkspacePermissionsResponse {
  /** Array of permissions defined for a workspace. */
  permissions?: PermissionOutput[] | undefined;
}

export interface Permission {
  permissionLevel?: PermissionLevel | undefined;
  inherited?: boolean | undefined;
  inheritedFromObject?: string[] | undefined;
}

export interface PermissionOutput {
  permissionLevel?: WorkspacePermission | undefined;
  /** The results of a permissions query. */
  description?: string | undefined;
}

export interface PermissionsDescription {
  permissionLevel?: PermissionLevel | undefined;
  description?: string | undefined;
}

export interface PermissionsResponse {
  objectId?: string | undefined;
  objectType?: string | undefined;
  accessControlList?: AccessControlResponse[] | undefined;
}

/** Information about the principal assigned to the workspace. */
export interface PrincipalOutput {
  principalName?:
    | {
        $case: 'userName';
        /** The username of the user. Present only if the principal is a user. */
        userName: string;
      }
    | {
        $case: 'groupName';
        /** The group name of the group. Present only if the principal is a group. */
        groupName: string;
      }
    | {
        $case: 'servicePrincipalName';
        /** The name of the service principal. Present only if the principal is a service principal. */
        servicePrincipalName: string;
      }
    | undefined;
  /** The unique, opaque id of the principal. */
  principalId?: bigint | undefined;
  /** The display name of the principal. */
  displayName?: string | undefined;
}

export interface ResourceInfo {
  /**
   * Id of the current resource.
   *
   * Required. This field must be set in requests.
   */
  id?: string | undefined;
  /** Parent resource info for the current resource. The parent may have another parent. */
  parentResourceInfo?: ResourceInfo | undefined;
  /** The legacy acl path of the current resource. */
  legacyAclPath?: string | undefined;
}

export interface Role {
  /**
   * Role to assign to a principal or a list of principals on a resource.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
}

export interface RuleSet {
  /**
   * Name of the rule set.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /**
   * Identifies the version of the rule set returned.
   * Etag used for versioning. The response is at least as fresh as the eTag provided.
   * Etag is used for optimistic concurrency control as a way to help prevent simultaneous
   * updates of a rule set from overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> modify -> write pattern to perform rule set updates in
   * order to avoid race conditions that is get an etag from a GET rule set request, and pass it
   * with the PUT update request to identify the rule set version you are updating.
   *
   * Required. This field must be set in requests.
   */
  etag?: string | undefined;
  grantRules?: GrantRule[] | undefined;
}

export interface RuleSetUpdateRequest {
  /**
   * Name of the rule set.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /**
   * Identifies the version of the rule set returned.
   * Etag used for versioning. The response is at least as fresh as the eTag provided.
   * Etag is used for optimistic concurrency control as a way to help prevent simultaneous
   * updates of a rule set from overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> modify -> write pattern to perform rule set updates in
   * order to avoid race conditions that is get an etag from a GET rule set request, and pass it
   * with the PUT update request to identify the rule set version you are updating.
   *
   * Required. This field must be set in requests.
   */
  etag?: string | undefined;
  grantRules?: GrantRule[] | undefined;
}

export interface SetObjectPermissionsRequest {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  /** The id of the request object. */
  requestObjectId?: string | undefined;
  accessControlList?: AccessControlRequest[] | undefined;
}

export interface UpdateObjectPermissionsRequest {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  /** The id of the request object. */
  requestObjectId?: string | undefined;
  accessControlList?: AccessControlRequest[] | undefined;
}

export interface UpdateRuleSetRequest {
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /**
   * Name of the rule set.
   *
   * Required. This field must be set in requests.
   */
  name?: string | undefined;
  /** Required. This field must be set in requests. */
  ruleSet?: RuleSetUpdateRequest | undefined;
}

export interface UpdateWorkspacePermissionAssignmentRequest {
  /** The account ID. */
  accountId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: bigint | undefined;
  /** The ID of the user, service principal, or group. */
  principalId?: bigint | undefined;
  /**
   * Array of permissions assignments to update on the workspace.
   * Valid values are "USER" and "ADMIN" (case-sensitive).
   * If both "USER" and "ADMIN" are provided, "ADMIN" takes precedence.
   * Other values will be ignored.
   * Note that excluding this field, or providing unsupported values, will have the same effect as providing an empty list, which will result in the deletion of all permissions for the principal.
   */
  permissions?: WorkspacePermission[] | undefined;
}

/**
 * The output format for existing workspace PermissionAssignment records, which contains some info for
 * user consumption.
 */
export interface WorkspacePermissionAssignmentOutput {
  /** Information about the principal assigned to the workspace. */
  principal?: PrincipalOutput | undefined;
  /** The permissions level of the principal. */
  permissions?: WorkspacePermission[] | undefined;
  /** Error response associated with a workspace permission assignment, if any. */
  error?: string | undefined;
}

export const unmarshalAccessControlResponseSchema: z.ZodType<AccessControlResponse> =
  z
    .object({
      user_name: z.string().optional(),
      group_name: z.string().optional(),
      service_principal_name: z.string().optional(),
      display_name: z.string().optional(),
      all_permissions: z
        .array(z.lazy(() => unmarshalPermissionSchema))
        .optional(),
    })
    .transform(d => ({
      principalName:
        d.user_name !== undefined
          ? {$case: 'userName' as const, userName: d.user_name}
          : d.group_name !== undefined
            ? {$case: 'groupName' as const, groupName: d.group_name}
            : d.service_principal_name !== undefined
              ? {
                  $case: 'servicePrincipalName' as const,
                  servicePrincipalName: d.service_principal_name,
                }
              : undefined,
      displayName: d.display_name,
      allPermissions: d.all_permissions,
    }));

export const unmarshalCheckPolicyResponseSchema: z.ZodType<CheckPolicyResponse> =
  z
    .object({
      is_permitted: z.boolean().optional(),
      consistency_token: z
        .lazy(() => unmarshalConsistencyTokenSchema)
        .optional(),
    })
    .transform(d => ({
      isPermitted: d.is_permitted,
      consistencyToken: d.consistency_token,
    }));

export const unmarshalConsistencyTokenSchema: z.ZodType<ConsistencyToken> = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalDeleteWorkspacePermissionAssignmentResponseSchema: z.ZodType<DeleteWorkspacePermissionAssignmentResponse> =
  z.object({});

export const unmarshalGrantRuleSchema: z.ZodType<GrantRule> = z
  .object({
    principals: z.array(z.string()).optional(),
    role: z.string().optional(),
  })
  .transform(d => ({
    principals: d.principals,
    role: d.role,
  }));

export const unmarshalListAssignableRolesForResourceResponseSchema: z.ZodType<ListAssignableRolesForResourceResponse> =
  z
    .object({
      roles: z.array(z.lazy(() => unmarshalRoleSchema)).optional(),
    })
    .transform(d => ({
      roles: d.roles,
    }));

export const unmarshalListPermissionLevelsResponseSchema: z.ZodType<ListPermissionLevelsResponse> =
  z
    .object({
      permission_levels: z
        .array(z.lazy(() => unmarshalPermissionsDescriptionSchema))
        .optional(),
    })
    .transform(d => ({
      permissionLevels: d.permission_levels,
    }));

export const unmarshalListWorkspacePermissionAssignmentsResponseSchema: z.ZodType<ListWorkspacePermissionAssignmentsResponse> =
  z
    .object({
      permission_assignments: z
        .array(z.lazy(() => unmarshalWorkspacePermissionAssignmentOutputSchema))
        .optional(),
    })
    .transform(d => ({
      permissionAssignments: d.permission_assignments,
    }));

export const unmarshalListWorkspacePermissionsResponseSchema: z.ZodType<ListWorkspacePermissionsResponse> =
  z
    .object({
      permissions: z
        .array(z.lazy(() => unmarshalPermissionOutputSchema))
        .optional(),
    })
    .transform(d => ({
      permissions: d.permissions,
    }));

export const unmarshalPermissionSchema: z.ZodType<Permission> = z
  .object({
    permission_level: z.string().optional(),
    inherited: z.boolean().optional(),
    inherited_from_object: z.array(z.string()).optional(),
  })
  .transform(d => ({
    permissionLevel: d.permission_level,
    inherited: d.inherited,
    inheritedFromObject: d.inherited_from_object,
  }));

export const unmarshalPermissionOutputSchema: z.ZodType<PermissionOutput> = z
  .object({
    permission_level: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    permissionLevel: d.permission_level,
    description: d.description,
  }));

export const unmarshalPermissionsDescriptionSchema: z.ZodType<PermissionsDescription> =
  z
    .object({
      permission_level: z.string().optional(),
      description: z.string().optional(),
    })
    .transform(d => ({
      permissionLevel: d.permission_level,
      description: d.description,
    }));

export const unmarshalPermissionsResponseSchema: z.ZodType<PermissionsResponse> =
  z
    .object({
      object_id: z.string().optional(),
      object_type: z.string().optional(),
      access_control_list: z
        .array(z.lazy(() => unmarshalAccessControlResponseSchema))
        .optional(),
    })
    .transform(d => ({
      objectId: d.object_id,
      objectType: d.object_type,
      accessControlList: d.access_control_list,
    }));

export const unmarshalPrincipalOutputSchema: z.ZodType<PrincipalOutput> = z
  .object({
    user_name: z.string().optional(),
    group_name: z.string().optional(),
    service_principal_name: z.string().optional(),
    principal_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    display_name: z.string().optional(),
  })
  .transform(d => ({
    principalName:
      d.user_name !== undefined
        ? {$case: 'userName' as const, userName: d.user_name}
        : d.group_name !== undefined
          ? {$case: 'groupName' as const, groupName: d.group_name}
          : d.service_principal_name !== undefined
            ? {
                $case: 'servicePrincipalName' as const,
                servicePrincipalName: d.service_principal_name,
              }
            : undefined,
    principalId: d.principal_id,
    displayName: d.display_name,
  }));

export const unmarshalRoleSchema: z.ZodType<Role> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalRuleSetSchema: z.ZodType<RuleSet> = z
  .object({
    name: z.string().optional(),
    etag: z.string().optional(),
    grant_rules: z.array(z.lazy(() => unmarshalGrantRuleSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    etag: d.etag,
    grantRules: d.grant_rules,
  }));

export const unmarshalWorkspacePermissionAssignmentOutputSchema: z.ZodType<WorkspacePermissionAssignmentOutput> =
  z
    .object({
      principal: z.lazy(() => unmarshalPrincipalOutputSchema).optional(),
      permissions: z.array(z.string()).optional(),
      error: z.string().optional(),
    })
    .transform(d => ({
      principal: d.principal,
      permissions: d.permissions,
      error: d.error,
    }));

export const marshalAccessControlRequestSchema: z.ZodType = z
  .object({
    principalName: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({$case: z.literal('groupName'), groupName: z.string()}),
        z.object({
          $case: z.literal('servicePrincipalName'),
          servicePrincipalName: z.string(),
        }),
      ])
      .optional(),
    permissionLevel: z.string().optional(),
  })
  .transform(d => ({
    ...(d.principalName?.$case === 'userName' && {
      user_name: d.principalName.userName,
    }),
    ...(d.principalName?.$case === 'groupName' && {
      group_name: d.principalName.groupName,
    }),
    ...(d.principalName?.$case === 'servicePrincipalName' && {
      service_principal_name: d.principalName.servicePrincipalName,
    }),
    permission_level: d.permissionLevel,
  }));

export const marshalActorSchema: z.ZodType = z
  .object({
    kind: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('actorId'), actorId: z.bigint()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.kind?.$case === 'actorId' && {actor_id: d.kind.actorId}),
  }));

export const marshalConsistencyTokenSchema: z.ZodType = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalGrantRuleSchema: z.ZodType = z
  .object({
    principals: z.array(z.string()).optional(),
    role: z.string().optional(),
  })
  .transform(d => ({
    principals: d.principals,
    role: d.role,
  }));

export const marshalResourceInfoSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    parentResourceInfo: z.lazy(() => marshalResourceInfoSchema).optional(),
    legacyAclPath: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    parent_resource_info: d.parentResourceInfo,
    legacy_acl_path: d.legacyAclPath,
  }));

export const marshalRuleSetUpdateRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    etag: z.string().optional(),
    grantRules: z.array(z.lazy(() => marshalGrantRuleSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    etag: d.etag,
    grant_rules: d.grantRules,
  }));

export const marshalSetObjectPermissionsRequestSchema: z.ZodType = z
  .object({
    requestObjectType: z.string().optional(),
    requestObjectId: z.string().optional(),
    accessControlList: z
      .array(z.lazy(() => marshalAccessControlRequestSchema))
      .optional(),
  })
  .transform(d => ({
    request_object_type: d.requestObjectType,
    request_object_id: d.requestObjectId,
    access_control_list: d.accessControlList,
  }));

export const marshalUpdateObjectPermissionsRequestSchema: z.ZodType = z
  .object({
    requestObjectType: z.string().optional(),
    requestObjectId: z.string().optional(),
    accessControlList: z
      .array(z.lazy(() => marshalAccessControlRequestSchema))
      .optional(),
  })
  .transform(d => ({
    request_object_type: d.requestObjectType,
    request_object_id: d.requestObjectId,
    access_control_list: d.accessControlList,
  }));

export const marshalUpdateRuleSetRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    name: z.string().optional(),
    ruleSet: z.lazy(() => marshalRuleSetUpdateRequestSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    name: d.name,
    rule_set: d.ruleSet,
  }));

export const marshalUpdateWorkspacePermissionAssignmentRequestSchema: z.ZodType =
  z
    .object({
      accountId: z.string().optional(),
      workspaceId: z.bigint().optional(),
      principalId: z.bigint().optional(),
      permissions: z.array(z.string()).optional(),
    })
    .transform(d => ({
      account_id: d.accountId,
      workspace_id: d.workspaceId,
      principal_id: d.principalId,
      permissions: d.permissions,
    }));
