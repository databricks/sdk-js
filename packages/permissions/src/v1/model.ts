// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Permission level */
export enum PermissionLevel {
  CAN_MANAGE = 'CAN_MANAGE',
  CAN_RESTART = 'CAN_RESTART',
  CAN_ATTACH_TO = 'CAN_ATTACH_TO',
  IS_OWNER = 'IS_OWNER',
  CAN_MANAGE_RUN = 'CAN_MANAGE_RUN',
  CAN_VIEW = 'CAN_VIEW',
  CAN_READ = 'CAN_READ',
  CAN_RUN = 'CAN_RUN',
  CAN_EDIT = 'CAN_EDIT',
  CAN_USE = 'CAN_USE',
  CAN_MANAGE_STAGING_VERSIONS = 'CAN_MANAGE_STAGING_VERSIONS',
  CAN_MANAGE_PRODUCTION_VERSIONS = 'CAN_MANAGE_PRODUCTION_VERSIONS',
  CAN_EDIT_METADATA = 'CAN_EDIT_METADATA',
  CAN_VIEW_METADATA = 'CAN_VIEW_METADATA',
  CAN_BIND = 'CAN_BIND',
  CAN_QUERY = 'CAN_QUERY',
  CAN_MONITOR = 'CAN_MONITOR',
  CAN_CREATE = 'CAN_CREATE',
  CAN_MONITOR_ONLY = 'CAN_MONITOR_ONLY',
  CAN_CREATE_APP = 'CAN_CREATE_APP',
  /**
   * Sentinel value for deletion in PATCH requests. When used in PATCH, signals
   * intent to remove the principal's permissions while preserving other principals.
   */
  UNSPECIFIED = 'UNSPECIFIED',
}

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

export interface GetObjectPermissions {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  /** The id of the request object. */
  requestObjectId?: string | undefined;
}

export interface GetPermissionLevels {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  requestObjectId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetPermissionLevels_Response {
  /** Specific permission levels */
  permissionLevels?: PermissionsDescription[] | undefined;
}

export interface Permission {
  permissionLevel?: PermissionLevel | undefined;
  inherited?: boolean | undefined;
  inheritedFromObject?: string[] | undefined;
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

export interface SetObjectPermissions {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  /** The id of the request object. */
  requestObjectId?: string | undefined;
  accessControlList?: AccessControlRequest[] | undefined;
}

export interface UpdateObjectPermissions {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  /** The id of the request object. */
  requestObjectId?: string | undefined;
  accessControlList?: AccessControlRequest[] | undefined;
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetPermissionLevels_ResponseSchema: z.ZodType<GetPermissionLevels_Response> =
  z
    .object({
      permission_levels: z
        .array(z.lazy(() => unmarshalPermissionsDescriptionSchema))
        .optional(),
    })
    .transform(d => ({
      permissionLevels: d.permission_levels,
    }));

export const unmarshalPermissionSchema: z.ZodType<Permission> = z
  .object({
    permission_level: z.enum(PermissionLevel).optional(),
    inherited: z.boolean().optional(),
    inherited_from_object: z.array(z.string()).optional(),
  })
  .transform(d => ({
    permissionLevel: d.permission_level,
    inherited: d.inherited,
    inheritedFromObject: d.inherited_from_object,
  }));

export const unmarshalPermissionsDescriptionSchema: z.ZodType<PermissionsDescription> =
  z
    .object({
      permission_level: z.enum(PermissionLevel).optional(),
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
    permissionLevel: z.enum(PermissionLevel).optional(),
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

export const marshalSetObjectPermissionsSchema: z.ZodType = z
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

export const marshalUpdateObjectPermissionsSchema: z.ZodType = z
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
