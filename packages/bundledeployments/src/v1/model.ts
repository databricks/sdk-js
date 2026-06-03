// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
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

/**
 * Bundle target deployment mode. Mirrors the `mode` field on a bundle target
 * in `databricks.yml` (see https://docs.databricks.com/dev-tools/bundles/deployment-modes).
 */
export enum DeploymentMode {
  /**
   * No mode was specified on the bundle target. The CLI applies no mode-specific
   * presets in this case.
   */
  DEPLOYMENT_MODE_UNSPECIFIED = 'DEPLOYMENT_MODE_UNSPECIFIED',
  /**
   * Development mode: enables prefixing, paused triggers, single-user runs,
   * and other dev-friendly defaults applied by the CLI.
   */
  DEPLOYMENT_MODE_DEVELOPMENT = 'DEPLOYMENT_MODE_DEVELOPMENT',
  /**
   * Production mode: enforces production guardrails (e.g., disallowed root
   * paths, mandatory run_as for jobs).
   */
  DEPLOYMENT_MODE_PRODUCTION = 'DEPLOYMENT_MODE_PRODUCTION',
}

/** Type of a deployment resource. */
export enum DeploymentResourceType {
  DEPLOYMENT_RESOURCE_TYPE_UNSPECIFIED = 'DEPLOYMENT_RESOURCE_TYPE_UNSPECIFIED',
  /** A Databricks job. */
  DEPLOYMENT_RESOURCE_TYPE_JOB = 'DEPLOYMENT_RESOURCE_TYPE_JOB',
  /** A Delta Live Tables pipeline. */
  DEPLOYMENT_RESOURCE_TYPE_PIPELINE = 'DEPLOYMENT_RESOURCE_TYPE_PIPELINE',
  /** An MLflow model. */
  DEPLOYMENT_RESOURCE_TYPE_MODEL = 'DEPLOYMENT_RESOURCE_TYPE_MODEL',
  /** A Unity Catalog registered model. */
  DEPLOYMENT_RESOURCE_TYPE_REGISTERED_MODEL = 'DEPLOYMENT_RESOURCE_TYPE_REGISTERED_MODEL',
  /** An MLflow experiment. */
  DEPLOYMENT_RESOURCE_TYPE_EXPERIMENT = 'DEPLOYMENT_RESOURCE_TYPE_EXPERIMENT',
  /** A model serving endpoint. */
  DEPLOYMENT_RESOURCE_TYPE_MODEL_SERVING_ENDPOINT = 'DEPLOYMENT_RESOURCE_TYPE_MODEL_SERVING_ENDPOINT',
  /** A Lakehouse monitoring quality monitor. */
  DEPLOYMENT_RESOURCE_TYPE_QUALITY_MONITOR = 'DEPLOYMENT_RESOURCE_TYPE_QUALITY_MONITOR',
  /** A Unity Catalog schema. */
  DEPLOYMENT_RESOURCE_TYPE_SCHEMA = 'DEPLOYMENT_RESOURCE_TYPE_SCHEMA',
  /** A Unity Catalog volume. */
  DEPLOYMENT_RESOURCE_TYPE_VOLUME = 'DEPLOYMENT_RESOURCE_TYPE_VOLUME',
  /** A Databricks compute cluster. */
  DEPLOYMENT_RESOURCE_TYPE_CLUSTER = 'DEPLOYMENT_RESOURCE_TYPE_CLUSTER',
  /** A Lakeview dashboard. */
  DEPLOYMENT_RESOURCE_TYPE_DASHBOARD = 'DEPLOYMENT_RESOURCE_TYPE_DASHBOARD',
  /** A Databricks app. */
  DEPLOYMENT_RESOURCE_TYPE_APP = 'DEPLOYMENT_RESOURCE_TYPE_APP',
  /** A Unity Catalog catalog. */
  DEPLOYMENT_RESOURCE_TYPE_CATALOG = 'DEPLOYMENT_RESOURCE_TYPE_CATALOG',
  /** A Unity Catalog external location. */
  DEPLOYMENT_RESOURCE_TYPE_EXTERNAL_LOCATION = 'DEPLOYMENT_RESOURCE_TYPE_EXTERNAL_LOCATION',
  /** A Databricks secret scope. */
  DEPLOYMENT_RESOURCE_TYPE_SECRET_SCOPE = 'DEPLOYMENT_RESOURCE_TYPE_SECRET_SCOPE',
  /** A SQL alert. */
  DEPLOYMENT_RESOURCE_TYPE_ALERT = 'DEPLOYMENT_RESOURCE_TYPE_ALERT',
  /** A SQL warehouse. */
  DEPLOYMENT_RESOURCE_TYPE_SQL_WAREHOUSE = 'DEPLOYMENT_RESOURCE_TYPE_SQL_WAREHOUSE',
  /** A Lakebase database instance. */
  DEPLOYMENT_RESOURCE_TYPE_DATABASE_INSTANCE = 'DEPLOYMENT_RESOURCE_TYPE_DATABASE_INSTANCE',
  /** A Lakebase database catalog. */
  DEPLOYMENT_RESOURCE_TYPE_DATABASE_CATALOG = 'DEPLOYMENT_RESOURCE_TYPE_DATABASE_CATALOG',
  /** A Lakebase synced database table. */
  DEPLOYMENT_RESOURCE_TYPE_SYNCED_DATABASE_TABLE = 'DEPLOYMENT_RESOURCE_TYPE_SYNCED_DATABASE_TABLE',
  /** A Lakebase Postgres project. */
  DEPLOYMENT_RESOURCE_TYPE_POSTGRES_PROJECT = 'DEPLOYMENT_RESOURCE_TYPE_POSTGRES_PROJECT',
  /** A Lakebase Postgres branch. */
  DEPLOYMENT_RESOURCE_TYPE_POSTGRES_BRANCH = 'DEPLOYMENT_RESOURCE_TYPE_POSTGRES_BRANCH',
  /** A Lakebase Postgres endpoint. */
  DEPLOYMENT_RESOURCE_TYPE_POSTGRES_ENDPOINT = 'DEPLOYMENT_RESOURCE_TYPE_POSTGRES_ENDPOINT',
}

/** Status of a deployment. */
export enum DeploymentStatus {
  DEPLOYMENT_STATUS_UNSPECIFIED = 'DEPLOYMENT_STATUS_UNSPECIFIED',
  /** Last version completed successfully. */
  DEPLOYMENT_STATUS_ACTIVE = 'DEPLOYMENT_STATUS_ACTIVE',
  /** Last version failed or partially succeeded. */
  DEPLOYMENT_STATUS_FAILED = 'DEPLOYMENT_STATUS_FAILED',
  /** A version is currently in progress. */
  DEPLOYMENT_STATUS_IN_PROGRESS = 'DEPLOYMENT_STATUS_IN_PROGRESS',
  /** The deployment has been soft deleted and will be garbage collected. */
  DEPLOYMENT_STATUS_DELETED = 'DEPLOYMENT_STATUS_DELETED',
}

/** Type of action performed on a resource during a deployment. */
export enum OperationActionType {
  OPERATION_ACTION_TYPE_UNSPECIFIED = 'OPERATION_ACTION_TYPE_UNSPECIFIED',
  /** Resize the resource (e.g. cluster scaling) without recreating it. */
  OPERATION_ACTION_TYPE_RESIZE = 'OPERATION_ACTION_TYPE_RESIZE',
  /** Update the resource in-place with field-level changes. */
  OPERATION_ACTION_TYPE_UPDATE = 'OPERATION_ACTION_TYPE_UPDATE',
  /** Update the resource, potentially changing its identifier. */
  OPERATION_ACTION_TYPE_UPDATE_WITH_ID = 'OPERATION_ACTION_TYPE_UPDATE_WITH_ID',
  /** Create a new resource. */
  OPERATION_ACTION_TYPE_CREATE = 'OPERATION_ACTION_TYPE_CREATE',
  /**
   * Delete and recreate the resource because certain fields require
   * full replacement.
   */
  OPERATION_ACTION_TYPE_RECREATE = 'OPERATION_ACTION_TYPE_RECREATE',
  /** Delete the resource. */
  OPERATION_ACTION_TYPE_DELETE = 'OPERATION_ACTION_TYPE_DELETE',
  /**
   * Bind an existing workspace resource to a bundle resource without
   * modifying it.
   */
  OPERATION_ACTION_TYPE_BIND = 'OPERATION_ACTION_TYPE_BIND',
  /**
   * Bind an existing workspace resource to a bundle resource and update
   * it in one step.
   */
  OPERATION_ACTION_TYPE_BIND_AND_UPDATE = 'OPERATION_ACTION_TYPE_BIND_AND_UPDATE',
  /**
   * One-time registration of a resource that was already managed by DABs
   * but not yet tracked by the metadata service.
   */
  OPERATION_ACTION_TYPE_INITIAL_REGISTER = 'OPERATION_ACTION_TYPE_INITIAL_REGISTER',
}

/** Status of a resource operation. */
export enum OperationStatus {
  OPERATION_STATUS_UNSPECIFIED = 'OPERATION_STATUS_UNSPECIFIED',
  /** The resource was successfully applied. */
  OPERATION_STATUS_SUCCEEDED = 'OPERATION_STATUS_SUCCEEDED',
  /** The resource operation failed. */
  OPERATION_STATUS_FAILED = 'OPERATION_STATUS_FAILED',
}

/** Reason why a version was completed. */
export enum VersionComplete {
  VERSION_COMPLETE_UNSPECIFIED = 'VERSION_COMPLETE_UNSPECIFIED',
  /** The version completed successfully. */
  VERSION_COMPLETE_SUCCESS = 'VERSION_COMPLETE_SUCCESS',
  /** The version failed during execution. */
  VERSION_COMPLETE_FAILURE = 'VERSION_COMPLETE_FAILURE',
  /** The version was force-aborted by another user. */
  VERSION_COMPLETE_FORCE_ABORT = 'VERSION_COMPLETE_FORCE_ABORT',
  /** The version's lease expired (client stopped sending heartbeats). */
  VERSION_COMPLETE_LEASE_EXPIRED = 'VERSION_COMPLETE_LEASE_EXPIRED',
}

/** Status of a version. */
export enum VersionStatus {
  VERSION_STATUS_UNSPECIFIED = 'VERSION_STATUS_UNSPECIFIED',
  /** Version is actively executing and holds the lock on the deployment. */
  VERSION_STATUS_IN_PROGRESS = 'VERSION_STATUS_IN_PROGRESS',
  /** Version has completed. See `completion_reason` for why. */
  VERSION_STATUS_COMPLETED = 'VERSION_STATUS_COMPLETED',
}

/** Type of version. */
export enum VersionType {
  VERSION_TYPE_UNSPECIFIED = 'VERSION_TYPE_UNSPECIFIED',
  /** Corresponds to the `databricks bundle deploy` command. */
  VERSION_TYPE_DEPLOY = 'VERSION_TYPE_DEPLOY',
  /** Corresponds to the `databricks bundle destroy` command. */
  VERSION_TYPE_DESTROY = 'VERSION_TYPE_DESTROY',
}

/** A request to complete a Version. */
export interface CompleteVersionRequest {
  /**
   * The name of the version to complete.
   * Format: deployments/{deployment_id}/versions/{version_id}
   */
  name?: string | undefined;
  /**
   * The reason for completing the version. Must be a terminal reason:
   * VERSION_COMPLETE_SUCCESS, VERSION_COMPLETE_FAILURE, or
   * VERSION_COMPLETE_FORCE_ABORT.
   */
  completionReason?: VersionComplete | undefined;
  /**
   * If true, force-completes the version even if the caller is not the
   * original creator. The completion_reason must be
   * VERSION_COMPLETE_FORCE_ABORT when force is true.
   */
  force?: boolean | undefined;
}

/** A request to create a Deployment. */
export interface CreateDeploymentRequest {
  /**
   * The ID to use for the deployment, which will become the final
   * component of the deployment's resource name
   * (i.e. `deployments/{deployment_id}`).
   */
  deploymentId?: string | undefined;
  /** The deployment to create. */
  deployment?: Deployment | undefined;
}

/** A request to create an Operation. */
export interface CreateOperationRequest {
  /**
   * The parent version where this operation will be recorded.
   * Format: deployments/{deployment_id}/versions/{version_id}
   */
  parent?: string | undefined;
  /**
   * The key identifying the resource this operation applies to.
   * Becomes the final component of the operation's name.
   */
  resourceKey?: string | undefined;
  /** The resource operation to create. */
  operation?: Operation | undefined;
}

/** A request to create a Version. */
export interface CreateVersionRequest {
  /**
   * The parent deployment where this version will be created.
   * Format: deployments/{deployment_id}
   */
  parent?: string | undefined;
  /** The version to create. */
  version?: Version | undefined;
  /**
   * The version ID the caller expects to create. The server validates
   * this equals `last_version_id + 1` on the deployment. If it doesn't
   * match, the server returns `ABORTED`.
   */
  versionId?: string | undefined;
}

/** A request to delete a Deployment. */
export interface DeleteDeploymentRequest {
  /**
   * Resource name of the deployment to delete.
   * Format: deployments/{deployment_id}
   */
  name?: string | undefined;
}

/** A bundle deployment registered with the control plane. */
export interface Deployment {
  /**
   * Resource name of the deployment.
   * Format: deployments/{deployment_id}
   */
  name?: string | undefined;
  /** Human-readable name for the deployment. */
  displayName?: string | undefined;
  /** The bundle target name associated with this deployment. */
  targetName?: string | undefined;
  /** Current status of the deployment. */
  status?: DeploymentStatus | undefined;
  /** The version_id of the most recent deployment version. */
  lastVersionId?: string | undefined;
  /** The user who created the deployment (email or principal name). */
  createdBy?: string | undefined;
  /** When the deployment was created. */
  createTime?: Temporal.Instant | undefined;
  /** When the deployment was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /**
   * When the deployment was destroyed (i.e. `bundle destroy` completed).
   * Unset if the deployment has not been destroyed.
   * Named destroy_time (not delete_time) because this tracks the
   * `databricks bundle destroy` command, not the API-level deletion.
   */
  destroyTime?: Temporal.Instant | undefined;
  /**
   * The user who destroyed the deployment (email or principal name).
   * Unset if the deployment has not been destroyed.
   */
  destroyedBy?: string | undefined;
  /**
   * Bundle target deployment mode (development or production), derived from the
   * most recent version's mode.
   */
  deploymentMode?: DeploymentMode | undefined;
  /** Git provenance of the deployment's source, derived from the latest version. */
  gitInfo?: GitInfo | undefined;
}

/** A request to retrieve a Deployment. */
export interface GetDeploymentRequest {
  /**
   * Resource name of the deployment to retrieve.
   * Format: deployments/{deployment_id}
   */
  name?: string | undefined;
}

/** A request to retrieve an Operation. */
export interface GetOperationRequest {
  /**
   * The name of the resource operation to retrieve.
   * Format: deployments/{deployment_id}/versions/{version_id}/operations/{resource_key}
   */
  name?: string | undefined;
}

/** A request to retrieve a Resource. */
export interface GetResourceRequest {
  /**
   * The name of the resource to retrieve.
   * Format: deployments/{deployment_id}/resources/{resource_key}
   */
  name?: string | undefined;
}

/** A request to retrieve a Version. */
export interface GetVersionRequest {
  /**
   * The name of the version to retrieve.
   * Format: deployments/{deployment_id}/versions/{version_id}
   */
  name?: string | undefined;
}

/**
 * Git provenance of a bundle's source, captured at deploy time. Lets consumers
 * link a deployed resource back to its source in version control.
 */
export interface GitInfo {
  /** URL of the git remote the source was deployed from. */
  originUrl?: string | undefined;
  /** Branch the source was deployed from. */
  branch?: string | undefined;
  /** Commit SHA of the deployed source. */
  commit?: string | undefined;
}

/** A request to send a heartbeat for a Version. */
export interface HeartbeatRequest {
  /**
   * The version whose lock to renew.
   * Format: deployments/{deployment_id}/versions/{version_id}
   */
  name?: string | undefined;
}

/** Response for Heartbeat. */
export interface HeartbeatResponse {
  /** The new lock expiry time after renewal. */
  expireTime?: Temporal.Instant | undefined;
}

/** A request to list Deployments. */
export interface ListDeploymentsRequest {
  /**
   * The maximum number of deployments to return. The service may return
   * fewer than this value.
   * If unspecified, at most 50 deployments will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListDeployments` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string | undefined;
}

/** Response for ListDeployments. */
export interface ListDeploymentsResponse {
  /** The deployments from the queried workspace. */
  deployments?: Deployment[] | undefined;
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

/** A request to list Operations. */
export interface ListOperationsRequest {
  /**
   * The parent version.
   * Format: deployments/{deployment_id}/versions/{version_id}
   */
  parent?: string | undefined;
  /**
   * The maximum number of operations to return. The service may return
   * fewer than this value.
   * If unspecified, at most 50 operations will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListOperations` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string | undefined;
}

/** Response for ListOperations. */
export interface ListOperationsResponse {
  /** The resource operations under the specified version. */
  operations?: Operation[] | undefined;
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

/** A request to list Resources. */
export interface ListResourcesRequest {
  /**
   * The parent deployment.
   * Format: deployments/{deployment_id}
   */
  parent?: string | undefined;
  /**
   * The maximum number of resources to return. The service may return
   * fewer than this value.
   * If unspecified, at most 50 resources will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListResources` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string | undefined;
}

/** Response for ListResources. */
export interface ListResourcesResponse {
  /** The resources under the specified deployment. */
  resources?: Resource[] | undefined;
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

/** A request to list Versions. */
export interface ListVersionsRequest {
  /**
   * The parent deployment.
   * Format: deployments/{deployment_id}
   */
  parent?: string | undefined;
  /**
   * The maximum number of versions to return. The service may return
   * fewer than this value.
   * If unspecified, at most 50 versions will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListVersions` call.
   * Provide this to retrieve the subsequent page.
   */
  pageToken?: string | undefined;
}

/** Response for ListVersions. */
export interface ListVersionsResponse {
  /** The versions under the specified deployment. */
  versions?: Version[] | undefined;
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

/**
 * An operation on a single resource performed during a version.
 * Operations are append-only and record the result of applying a resource
 * change to the workspace.
 */
export interface Operation {
  /**
   * Resource name of the operation.
   * Format: deployments/{deployment_id}/versions/{version_id}/operations/{resource_key}
   */
  name?: string | undefined;
  /**
   * Resource identifier within the bundle (e.g. "jobs.foo",
   * "pipelines.bar", "jobs.foo.permissions", "files.<rel-path>").
   * Can be an arbitrary UTF-8 encoded string key. This key links the
   * operation to the corresponding deployment-level Resource.
   */
  resourceKey?: string | undefined;
  /** The type of operation performed on this resource. */
  actionType?: OperationActionType | undefined;
  /**
   * Serialized local config state after the operation.
   * Should be unset for delete operations.
   */
  state?: JsonValue | undefined;
  /**
   * ID reference for the actual resource in the workspace
   * (e.g. the job ID, pipeline ID).
   */
  resourceId?: string | undefined;
  /** When the operation was recorded. */
  createTime?: Temporal.Instant | undefined;
  /** Whether the operation succeeded or failed. */
  status?: OperationStatus | undefined;
  /**
   * Error message if the operation failed. Set when status is
   * OPERATION_STATUS_FAILED. Captures the error encountered while
   * applying the resource to the workspace.
   */
  errorMessage?: string | undefined;
  /**
   * The type of the deployment resource this operation applies to. Derived
   * from the `resource_key` prefix (e.g. "jobs" → JOB); the caller does not
   * set this field.
   */
  resourceType?: DeploymentResourceType | undefined;
}

/**
 * A resource managed by a deployment. Resources are implicitly created,
 * updated, or deleted when operations are recorded on a version.
 */
export interface Resource {
  /**
   * Resource name.
   * Format: deployments/{deployment_id}/resources/{resource_key}
   */
  name?: string | undefined;
  /**
   * Resource identifier within the bundle (e.g. "jobs.foo",
   * "pipelines.bar", "jobs.foo.permissions").
   */
  resourceKey?: string | undefined;
  /** Serialized local config state (what the CLI deployed). */
  state?: JsonValue | undefined;
  /**
   * ID that references the actual resource in the workspace
   * (e.g. the job ID, pipeline ID).
   */
  resourceId?: string | undefined;
  /** The action performed on this resource during the last version. */
  lastActionType?: OperationActionType | undefined;
  /** The version_id of the last version where this resource was updated. */
  lastVersionId?: string | undefined;
  /** The type of the deployment resource. */
  resourceType?: DeploymentResourceType | undefined;
}

/**
 * A single invocation of a deploy or destroy command against a deployment.
 * Creating a version acquires an exclusive lock on the parent deployment.
 */
export interface Version {
  /**
   * Resource name of the version.
   * Format: deployments/{deployment_id}/versions/{version_id}
   */
  name?: string | undefined;
  /**
   * Monotonically increasing version identifier within the parent
   * deployment. Assigned by the client on creation.
   */
  versionId?: string | undefined;
  /** The user who created the version (email or principal name). */
  createdBy?: string | undefined;
  /** When the version was created. */
  createTime?: Temporal.Instant | undefined;
  /** When the version completed. Unset while the version is in progress. */
  completeTime?: Temporal.Instant | undefined;
  /** CLI version used to initiate the version. */
  cliVersion?: string | undefined;
  /** Status of the version: IN_PROGRESS or COMPLETED. */
  status?: VersionStatus | undefined;
  /** Type of version (deploy or destroy). */
  versionType?: VersionType | undefined;
  /**
   * Why the version was completed. Unset while in progress.
   * Set when status transitions to COMPLETED.
   */
  completionReason?: VersionComplete | undefined;
  /**
   * The user who completed the version (email or principal name).
   * May differ from `created_by` when another user force-completes
   * the version.
   */
  completedBy?: string | undefined;
  /** Display name for the deployment, captured at the time of this version. */
  displayName?: string | undefined;
  /** Target name of the deployment, captured at the time of this version. */
  targetName?: string | undefined;
  /**
   * Bundle target deployment mode (development or production), captured at the
   * time of this version.
   */
  deploymentMode?: DeploymentMode | undefined;
  /** Git provenance of the source, captured at the time of this version. */
  gitInfo?: GitInfo | undefined;
}

export const unmarshalDeploymentSchema: z.ZodType<Deployment> = z
  .object({
    name: z.string().optional(),
    display_name: z.string().optional(),
    target_name: z.string().optional(),
    status: z.enum(DeploymentStatus).optional(),
    last_version_id: z.string().optional(),
    created_by: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    destroy_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    destroyed_by: z.string().optional(),
    deployment_mode: z.enum(DeploymentMode).optional(),
    git_info: z.lazy(() => unmarshalGitInfoSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    displayName: d.display_name,
    targetName: d.target_name,
    status: d.status,
    lastVersionId: d.last_version_id,
    createdBy: d.created_by,
    createTime: d.create_time,
    updateTime: d.update_time,
    destroyTime: d.destroy_time,
    destroyedBy: d.destroyed_by,
    deploymentMode: d.deployment_mode,
    gitInfo: d.git_info,
  }));

export const unmarshalGitInfoSchema: z.ZodType<GitInfo> = z
  .object({
    origin_url: z.string().optional(),
    branch: z.string().optional(),
    commit: z.string().optional(),
  })
  .transform(d => ({
    originUrl: d.origin_url,
    branch: d.branch,
    commit: d.commit,
  }));

export const unmarshalHeartbeatResponseSchema: z.ZodType<HeartbeatResponse> = z
  .object({
    expire_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    expireTime: d.expire_time,
  }));

export const unmarshalListDeploymentsResponseSchema: z.ZodType<ListDeploymentsResponse> =
  z
    .object({
      deployments: z.array(z.lazy(() => unmarshalDeploymentSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      deployments: d.deployments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListOperationsResponseSchema: z.ZodType<ListOperationsResponse> =
  z
    .object({
      operations: z.array(z.lazy(() => unmarshalOperationSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      operations: d.operations,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListResourcesResponseSchema: z.ZodType<ListResourcesResponse> =
  z
    .object({
      resources: z.array(z.lazy(() => unmarshalResourceSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      resources: d.resources,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListVersionsResponseSchema: z.ZodType<ListVersionsResponse> =
  z
    .object({
      versions: z.array(z.lazy(() => unmarshalVersionSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      versions: d.versions,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalOperationSchema: z.ZodType<Operation> = z
  .object({
    name: z.string().optional(),
    resource_key: z.string().optional(),
    action_type: z.enum(OperationActionType).optional(),
    state: jsonValueSchema.optional(),
    resource_id: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    status: z.enum(OperationStatus).optional(),
    error_message: z.string().optional(),
    resource_type: z.enum(DeploymentResourceType).optional(),
  })
  .transform(d => ({
    name: d.name,
    resourceKey: d.resource_key,
    actionType: d.action_type,
    state: d.state,
    resourceId: d.resource_id,
    createTime: d.create_time,
    status: d.status,
    errorMessage: d.error_message,
    resourceType: d.resource_type,
  }));

export const unmarshalResourceSchema: z.ZodType<Resource> = z
  .object({
    name: z.string().optional(),
    resource_key: z.string().optional(),
    state: jsonValueSchema.optional(),
    resource_id: z.string().optional(),
    last_action_type: z.enum(OperationActionType).optional(),
    last_version_id: z.string().optional(),
    resource_type: z.enum(DeploymentResourceType).optional(),
  })
  .transform(d => ({
    name: d.name,
    resourceKey: d.resource_key,
    state: d.state,
    resourceId: d.resource_id,
    lastActionType: d.last_action_type,
    lastVersionId: d.last_version_id,
    resourceType: d.resource_type,
  }));

export const unmarshalVersionSchema: z.ZodType<Version> = z
  .object({
    name: z.string().optional(),
    version_id: z.string().optional(),
    created_by: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    complete_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    cli_version: z.string().optional(),
    status: z.enum(VersionStatus).optional(),
    version_type: z.enum(VersionType).optional(),
    completion_reason: z.enum(VersionComplete).optional(),
    completed_by: z.string().optional(),
    display_name: z.string().optional(),
    target_name: z.string().optional(),
    deployment_mode: z.enum(DeploymentMode).optional(),
    git_info: z.lazy(() => unmarshalGitInfoSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    versionId: d.version_id,
    createdBy: d.created_by,
    createTime: d.create_time,
    completeTime: d.complete_time,
    cliVersion: d.cli_version,
    status: d.status,
    versionType: d.version_type,
    completionReason: d.completion_reason,
    completedBy: d.completed_by,
    displayName: d.display_name,
    targetName: d.target_name,
    deploymentMode: d.deployment_mode,
    gitInfo: d.git_info,
  }));

export const marshalCompleteVersionRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    completionReason: z.enum(VersionComplete).optional(),
    force: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    completion_reason: d.completionReason,
    force: d.force,
  }));

export const marshalDeploymentSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    displayName: z.string().optional(),
    targetName: z.string().optional(),
    status: z.enum(DeploymentStatus).optional(),
    lastVersionId: z.string().optional(),
    createdBy: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    destroyTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    destroyedBy: z.string().optional(),
    deploymentMode: z.enum(DeploymentMode).optional(),
    gitInfo: z.lazy(() => marshalGitInfoSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    display_name: d.displayName,
    target_name: d.targetName,
    status: d.status,
    last_version_id: d.lastVersionId,
    created_by: d.createdBy,
    create_time: d.createTime,
    update_time: d.updateTime,
    destroy_time: d.destroyTime,
    destroyed_by: d.destroyedBy,
    deployment_mode: d.deploymentMode,
    git_info: d.gitInfo,
  }));

export const marshalGitInfoSchema: z.ZodType = z
  .object({
    originUrl: z.string().optional(),
    branch: z.string().optional(),
    commit: z.string().optional(),
  })
  .transform(d => ({
    origin_url: d.originUrl,
    branch: d.branch,
    commit: d.commit,
  }));

export const marshalHeartbeatRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalOperationSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    resourceKey: z.string().optional(),
    actionType: z.enum(OperationActionType).optional(),
    state: jsonValueSchema.optional(),
    resourceId: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    status: z.enum(OperationStatus).optional(),
    errorMessage: z.string().optional(),
    resourceType: z.enum(DeploymentResourceType).optional(),
  })
  .transform(d => ({
    name: d.name,
    resource_key: d.resourceKey,
    action_type: d.actionType,
    state: d.state,
    resource_id: d.resourceId,
    create_time: d.createTime,
    status: d.status,
    error_message: d.errorMessage,
    resource_type: d.resourceType,
  }));

export const marshalVersionSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    versionId: z.string().optional(),
    createdBy: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    completeTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    cliVersion: z.string().optional(),
    status: z.enum(VersionStatus).optional(),
    versionType: z.enum(VersionType).optional(),
    completionReason: z.enum(VersionComplete).optional(),
    completedBy: z.string().optional(),
    displayName: z.string().optional(),
    targetName: z.string().optional(),
    deploymentMode: z.enum(DeploymentMode).optional(),
    gitInfo: z.lazy(() => marshalGitInfoSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    version_id: d.versionId,
    created_by: d.createdBy,
    create_time: d.createTime,
    complete_time: d.completeTime,
    cli_version: d.cliVersion,
    status: d.status,
    version_type: d.versionType,
    completion_reason: d.completionReason,
    completed_by: d.completedBy,
    display_name: d.displayName,
    target_name: d.targetName,
    deployment_mode: d.deploymentMode,
    git_info: d.gitInfo,
  }));
