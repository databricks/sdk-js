// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
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
  /** name of the user */
  userName?: string | undefined;
  /** name of the group */
  groupName?: string | undefined;
  /** application ID of a service principal */
  servicePrincipalName?: string | undefined;
  permissionLevel?: PermissionLevel | undefined;
}

export interface AccessControlResponse {
  /** name of the user */
  userName?: string | undefined;
  /** name of the group */
  groupName?: string | undefined;
  /** Name of the service principal. */
  servicePrincipalName?: string | undefined;
  /** Display name of the user or service principal. */
  displayName?: string | undefined;
  /** All permissions. */
  allPermissions?: Permission[] | undefined;
}

export interface GetObjectPermissions {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  /** The id of the request object. */
  requestObjectId?: string | undefined;
}

export interface GetPermissionLevels {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, or warehouses. */
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
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  /** The id of the request object. */
  requestObjectId?: string | undefined;
  accessControlList?: AccessControlRequest[] | undefined;
}

export interface UpdateObjectPermissions {
  /** The type of the request object. Can be one of the following: alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, or warehouses. */
  requestObjectType?: string | undefined;
  /** The id of the request object. */
  requestObjectId?: string | undefined;
  accessControlList?: AccessControlRequest[] | undefined;
}

export const unmarshalAccessControlRequestSchema: z.ZodType<AccessControlRequest> =
  z
    .object({
      user_name: z.string().optional(),
      group_name: z.string().optional(),
      service_principal_name: z.string().optional(),
      permission_level: z.enum(PermissionLevel).optional(),
    })
    .transform(d => ({
      userName: d.user_name,
      groupName: d.group_name,
      servicePrincipalName: d.service_principal_name,
      permissionLevel: d.permission_level,
    }));

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
      userName: d.user_name,
      groupName: d.group_name,
      servicePrincipalName: d.service_principal_name,
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

export const unmarshalSetObjectPermissionsSchema: z.ZodType<SetObjectPermissions> =
  z
    .object({
      request_object_type: z.string().optional(),
      request_object_id: z.string().optional(),
      access_control_list: z
        .array(z.lazy(() => unmarshalAccessControlRequestSchema))
        .optional(),
    })
    .transform(d => ({
      requestObjectType: d.request_object_type,
      requestObjectId: d.request_object_id,
      accessControlList: d.access_control_list,
    }));

export const unmarshalUpdateObjectPermissionsSchema: z.ZodType<UpdateObjectPermissions> =
  z
    .object({
      request_object_type: z.string().optional(),
      request_object_id: z.string().optional(),
      access_control_list: z
        .array(z.lazy(() => unmarshalAccessControlRequestSchema))
        .optional(),
    })
    .transform(d => ({
      requestObjectType: d.request_object_type,
      requestObjectId: d.request_object_id,
      accessControlList: d.access_control_list,
    }));

export const marshalAccessControlRequestSchema: z.ZodType = z
  .object({
    userName: z.string().optional(),
    groupName: z.string().optional(),
    servicePrincipalName: z.string().optional(),
    permissionLevel: z.enum(PermissionLevel).optional(),
  })
  .transform(d => ({
    user_name: d.userName,
    group_name: d.groupName,
    service_principal_name: d.servicePrincipalName,
    permission_level: d.permissionLevel,
  }));

export const marshalAccessControlResponseSchema: z.ZodType = z
  .object({
    userName: z.string().optional(),
    groupName: z.string().optional(),
    servicePrincipalName: z.string().optional(),
    displayName: z.string().optional(),
    allPermissions: z.array(z.lazy(() => marshalPermissionSchema)).optional(),
  })
  .transform(d => ({
    user_name: d.userName,
    group_name: d.groupName,
    service_principal_name: d.servicePrincipalName,
    display_name: d.displayName,
    all_permissions: d.allPermissions,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetPermissionLevels_ResponseSchema: z.ZodType = z
  .object({
    permissionLevels: z
      .array(z.lazy(() => marshalPermissionsDescriptionSchema))
      .optional(),
  })
  .transform(d => ({
    permission_levels: d.permissionLevels,
  }));

export const marshalPermissionSchema: z.ZodType = z
  .object({
    permissionLevel: z.enum(PermissionLevel).optional(),
    inherited: z.boolean().optional(),
    inheritedFromObject: z.array(z.string()).optional(),
  })
  .transform(d => ({
    permission_level: d.permissionLevel,
    inherited: d.inherited,
    inherited_from_object: d.inheritedFromObject,
  }));

export const marshalPermissionsDescriptionSchema: z.ZodType = z
  .object({
    permissionLevel: z.enum(PermissionLevel).optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    permission_level: d.permissionLevel,
    description: d.description,
  }));

export const marshalPermissionsResponseSchema: z.ZodType = z
  .object({
    objectId: z.string().optional(),
    objectType: z.string().optional(),
    accessControlList: z
      .array(z.lazy(() => marshalAccessControlResponseSchema))
      .optional(),
  })
  .transform(d => ({
    object_id: d.objectId,
    object_type: d.objectType,
    access_control_list: d.accessControlList,
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

const accessControlRequestFieldMaskSchema: FieldMaskSchema = {
  groupName: {wire: 'group_name'},
  permissionLevel: {wire: 'permission_level'},
  servicePrincipalName: {wire: 'service_principal_name'},
  userName: {wire: 'user_name'},
};

export function accessControlRequestFieldMask(
  ...paths: string[]
): FieldMask<AccessControlRequest> {
  return FieldMask.build<AccessControlRequest>(
    paths,
    accessControlRequestFieldMaskSchema
  );
}

const accessControlResponseFieldMaskSchema: FieldMaskSchema = {
  allPermissions: {wire: 'all_permissions'},
  displayName: {wire: 'display_name'},
  groupName: {wire: 'group_name'},
  servicePrincipalName: {wire: 'service_principal_name'},
  userName: {wire: 'user_name'},
};

export function accessControlResponseFieldMask(
  ...paths: string[]
): FieldMask<AccessControlResponse> {
  return FieldMask.build<AccessControlResponse>(
    paths,
    accessControlResponseFieldMaskSchema
  );
}

const getObjectPermissionsFieldMaskSchema: FieldMaskSchema = {
  requestObjectId: {wire: 'request_object_id'},
  requestObjectType: {wire: 'request_object_type'},
};

export function getObjectPermissionsFieldMask(
  ...paths: string[]
): FieldMask<GetObjectPermissions> {
  return FieldMask.build<GetObjectPermissions>(
    paths,
    getObjectPermissionsFieldMaskSchema
  );
}

const getPermissionLevelsFieldMaskSchema: FieldMaskSchema = {
  requestObjectId: {wire: 'request_object_id'},
  requestObjectType: {wire: 'request_object_type'},
};

export function getPermissionLevelsFieldMask(
  ...paths: string[]
): FieldMask<GetPermissionLevels> {
  return FieldMask.build<GetPermissionLevels>(
    paths,
    getPermissionLevelsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const getPermissionLevels_ResponseFieldMaskSchema: FieldMaskSchema = {
  permissionLevels: {wire: 'permission_levels'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function getPermissionLevels_ResponseFieldMask(
  ...paths: string[]
): FieldMask<GetPermissionLevels_Response> {
  return FieldMask.build<GetPermissionLevels_Response>(
    paths,
    getPermissionLevels_ResponseFieldMaskSchema
  );
}

const permissionFieldMaskSchema: FieldMaskSchema = {
  inherited: {wire: 'inherited'},
  inheritedFromObject: {wire: 'inherited_from_object'},
  permissionLevel: {wire: 'permission_level'},
};

export function permissionFieldMask(...paths: string[]): FieldMask<Permission> {
  return FieldMask.build<Permission>(paths, permissionFieldMaskSchema);
}

const permissionsDescriptionFieldMaskSchema: FieldMaskSchema = {
  description: {wire: 'description'},
  permissionLevel: {wire: 'permission_level'},
};

export function permissionsDescriptionFieldMask(
  ...paths: string[]
): FieldMask<PermissionsDescription> {
  return FieldMask.build<PermissionsDescription>(
    paths,
    permissionsDescriptionFieldMaskSchema
  );
}

const permissionsResponseFieldMaskSchema: FieldMaskSchema = {
  accessControlList: {wire: 'access_control_list'},
  objectId: {wire: 'object_id'},
  objectType: {wire: 'object_type'},
};

export function permissionsResponseFieldMask(
  ...paths: string[]
): FieldMask<PermissionsResponse> {
  return FieldMask.build<PermissionsResponse>(
    paths,
    permissionsResponseFieldMaskSchema
  );
}

const setObjectPermissionsFieldMaskSchema: FieldMaskSchema = {
  accessControlList: {wire: 'access_control_list'},
  requestObjectId: {wire: 'request_object_id'},
  requestObjectType: {wire: 'request_object_type'},
};

export function setObjectPermissionsFieldMask(
  ...paths: string[]
): FieldMask<SetObjectPermissions> {
  return FieldMask.build<SetObjectPermissions>(
    paths,
    setObjectPermissionsFieldMaskSchema
  );
}

const updateObjectPermissionsFieldMaskSchema: FieldMaskSchema = {
  accessControlList: {wire: 'access_control_list'},
  requestObjectId: {wire: 'request_object_id'},
  requestObjectType: {wire: 'request_object_type'},
};

export function updateObjectPermissionsFieldMask(
  ...paths: string[]
): FieldMask<UpdateObjectPermissions> {
  return FieldMask.build<UpdateObjectPermissions>(
    paths,
    updateObjectPermissionsFieldMaskSchema
  );
}
