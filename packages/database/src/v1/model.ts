// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ProvisioningPhase = {
  /** The default phase. It should not be reported by any synced tables. */
  PROVISIONING_PHASE_UNSPECIFIED: 'PROVISIONING_PHASE_UNSPECIFIED',
  /** Ingestion phase of the synced table. This is when the synced table is ingesting data from the delta table. */
  PROVISIONING_PHASE_MAIN: 'PROVISIONING_PHASE_MAIN',
  /** Index scan phase of the synced table. This is when the synced table is creating indexes on the ingested data. */
  PROVISIONING_PHASE_INDEX_SCAN: 'PROVISIONING_PHASE_INDEX_SCAN',
  /** Index sort phase of the synced table. This is when the synced table is creating indexes on the ingested data. */
  PROVISIONING_PHASE_INDEX_SORT: 'PROVISIONING_PHASE_INDEX_SORT',
} as const;
export type ProvisioningPhase =
  | (typeof ProvisioningPhase)[keyof typeof ProvisioningPhase]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SyncedTableSchedulingPolicy = {
  SYNCED_TABLE_SCHEDULING_POLICY_UNSPECIFIED:
    'SYNCED_TABLE_SCHEDULING_POLICY_UNSPECIFIED',
  /**
   * Pipeline runs continuously after generating the initial data.
   * Requires the source table to have Change Data Feed (CDF) enabled.
   */
  CONTINUOUS: 'CONTINUOUS',
  /**
   * Pipeline stops after generating the initial data and can be triggered later (manually, through a cron job or through data triggers).
   * Requires the source table to have Change Data Feed (CDF) enabled.
   */
  TRIGGERED: 'TRIGGERED',
  /**
   * Pipeline stops after generating the initial data and can be triggered later (manually, through a cron job or through data triggers).
   * Successive updates always perform a full copy of the source table data (no incremental updates).
   * Does not require the source table to have Change Data Feed (CDF) enabled.
   */
  SNAPSHOT: 'SNAPSHOT',
} as const;
export type SyncedTableSchedulingPolicy =
  | (typeof SyncedTableSchedulingPolicy)[keyof typeof SyncedTableSchedulingPolicy]
  | (string & {});

/** The state of a synced table. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SyncedTableState = {
  /** The default state. It should not be reported by any synced tables. */
  SYNCED_TABLE_STATE_UNSPECIFIED: 'SYNCED_TABLE_STATE_UNSPECIFIED',
  /**
   * The synced table has just been created and resources are being provisioned. This is also the
   * catch-all state if there is not a more suitable state to report for the synced table.
   */
  SYNCED_TABLE_PROVISIONING: 'SYNCED_TABLE_PROVISIONING',
  /** The synced table is provisioning resources for the data synchronization pipeline. */
  SYNCED_TABLE_PROVISIONING_PIPELINE_RESOURCES:
    'SYNCED_TABLE_PROVISIONING_PIPELINE_RESOURCES',
  /** The synced table is executing the initial data synchronization. */
  SYNCED_TABLE_PROVISIONING_INITIAL_SNAPSHOT:
    'SYNCED_TABLE_PROVISIONING_INITIAL_SNAPSHOT',
  /** The synced table is ready to serve data. */
  SYNCED_TABLE_ONLINE: 'SYNCED_TABLE_ONLINE',
  /**
   * The synced table is ready to serve data and is continuously updating. Only shown for synced
   * tables using the "Continuous" sync mode.
   */
  SYNCED_TABLE_ONLINE_CONTINUOUS_UPDATE:
    'SYNCED_TABLE_ONLINE_CONTINUOUS_UPDATE',
  /**
   * The synced table is ready to serve data and an active update is in progress. Only shown for
   * synced tables using the "Triggered" sync mode.
   */
  SYNCED_TABLE_ONLINE_TRIGGERED_UPDATE: 'SYNCED_TABLE_ONLINE_TRIGGERED_UPDATE',
  /**
   * The synced table is ready to serve data and there are no active updates. Only shown for synced
   * tables using the "Triggered" sync mode.
   */
  SYNCED_TABLE_ONLINE_NO_PENDING_UPDATE:
    'SYNCED_TABLE_ONLINE_NO_PENDING_UPDATE',
  /** The synced table has encountered an internal error and is not available for serving. */
  SYNCED_TABLED_OFFLINE: 'SYNCED_TABLED_OFFLINE',
  /**
   * The synced table is not available for serving because the data synchronization pipeline has
   * failed. Please review the pipeline event logs to troubleshoot.
   */
  SYNCED_TABLE_OFFLINE_FAILED: 'SYNCED_TABLE_OFFLINE_FAILED',
  /**
   * The data synchronization pipeline has encountered an error but the synced table is still
   * available for serving (potentially stale) data. Please review the pipeline event logs to
   * troubleshoot.
   */
  SYNCED_TABLE_ONLINE_PIPELINE_FAILED: 'SYNCED_TABLE_ONLINE_PIPELINE_FAILED',
  /**
   * The synced table is available for serving, and is provisioning resources for a newly started
   * data synchronization pipeline.
   */
  SYNCED_TABLE_ONLINE_UPDATING_PIPELINE_RESOURCES:
    'SYNCED_TABLE_ONLINE_UPDATING_PIPELINE_RESOURCES',
} as const;
export type SyncedTableState =
  | (typeof SyncedTableState)[keyof typeof SyncedTableState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DatabaseInstance_State = {
  /** Default value, not used */
  STATE_UNSPECIFIED: 'STATE_UNSPECIFIED',
  /** The instance is being brought online. */
  STARTING: 'STARTING',
  /** The instance is active and ready to use. */
  AVAILABLE: 'AVAILABLE',
  /** The instance is being deleted. */
  DELETING: 'DELETING',
  /** The instance is stopped. */
  STOPPED: 'STOPPED',
  /** The instance is being updated. */
  UPDATING: 'UPDATING',
  /** The instance is failing over. */
  FAILING_OVER: 'FAILING_OVER',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DatabaseInstance_State =
  | (typeof DatabaseInstance_State)[keyof typeof DatabaseInstance_State]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DatabaseInstanceRole_IdentityType = {
  /** Default value, not used */
  IDENTITY_TYPE_UNSPECIFIED: 'IDENTITY_TYPE_UNSPECIFIED',
  /** A role without a Databricks identity. */
  PG_ONLY: 'PG_ONLY',
  /** A user in a Databricks workspace. */
  USER: 'USER',
  /** A service principal in a Databricks workspace. */
  SERVICE_PRINCIPAL: 'SERVICE_PRINCIPAL',
  /** A group in a Databricks workspace. */
  GROUP: 'GROUP',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DatabaseInstanceRole_IdentityType =
  | (typeof DatabaseInstanceRole_IdentityType)[keyof typeof DatabaseInstanceRole_IdentityType]
  | (string & {});

/** Roles that the DatabaseInstanceRole can be a member of. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DatabaseInstanceRole_MembershipRole = {
  /** Indicates that the DatabaseInstanceRole is not a member of any standard, managed roles. */
  MEMBERSHIP_ROLE_UNSPECIFIED: 'MEMBERSHIP_ROLE_UNSPECIFIED',
  /** Indicates membership in DATABRICKS_SUPERUSER, the highest set of privileges exposed to customers. */
  DATABRICKS_SUPERUSER: 'DATABRICKS_SUPERUSER',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DatabaseInstanceRole_MembershipRole =
  | (typeof DatabaseInstanceRole_MembershipRole)[keyof typeof DatabaseInstanceRole_MembershipRole]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ProvisioningInfo_State = {
  STATE_UNSPECIFIED: 'STATE_UNSPECIFIED',
  PROVISIONING: 'PROVISIONING',
  ACTIVE: 'ACTIVE',
  FAILED: 'FAILED',
  DELETING: 'DELETING',
  UPDATING: 'UPDATING',
  DEGRADED: 'DEGRADED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ProvisioningInfo_State =
  | (typeof ProvisioningInfo_State)[keyof typeof ProvisioningInfo_State]
  | (string & {});

/** Might add WRITE in the future */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RequestedClaims_PermissionSet = {
  PERMISSION_SET_UNSPECIFIED: 'PERMISSION_SET_UNSPECIFIED',
  READ_ONLY: 'READ_ONLY',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type RequestedClaims_PermissionSet =
  | (typeof RequestedClaims_PermissionSet)[keyof typeof RequestedClaims_PermissionSet]
  | (string & {});

/** PostgreSQL-specific target types that can override the default Delta-to-PG mapping. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SyncedTableSpec_PgSpecificType = {
  /** Default value. Indicates that no type override was selected. */
  PG_SPECIFIC_TYPE_UNSPECIFIED: 'PG_SPECIFIC_TYPE_UNSPECIFIED',
  /** Maps the column to the pgvector vector type. */
  PG_SPECIFIC_TYPE_VECTOR: 'PG_SPECIFIC_TYPE_VECTOR',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SyncedTableSpec_PgSpecificType =
  | (typeof SyncedTableSpec_PgSpecificType)[keyof typeof SyncedTableSpec_PgSpecificType]
  | (string & {});

export interface CreateCustomTag {
  /** The key of the custom tag. */
  key?: string | undefined;
  /** The value of the custom tag. */
  value?: string | undefined;
}

export interface CreateDatabaseCatalog {
  /** The name of the catalog in UC. */
  name: string;
  /** The name of the DatabaseInstance housing the database. */
  databaseInstanceName: string;
  /** The name of the database (in an instance) associated with the catalog. */
  databaseName: string;
  createDatabaseIfNotExists?: boolean | undefined;
}

export interface CreateDatabaseCatalogRequest {
  catalog: CreateDatabaseCatalog;
}

/** A DatabaseInstance represents a logical Postgres instance, comprised of both compute and storage. */
export interface CreateDatabaseInstance {
  /** The name of the instance. This is the unique identifier for the instance. */
  name: string;
  /** The sku of the instance. Valid values are "CU_1", "CU_2", "CU_4", "CU_8". */
  capacity?: string | undefined;
  /** Whether to stop the instance. An input only param, see effective_stopped for the output. */
  stopped?: boolean | undefined;
  /**
   * The number of nodes in the instance, composed of 1 primary and 0 or more secondaries. Defaults to
   * 1 primary and 0 secondaries. This field is input only, see effective_node_count for the output.
   */
  nodeCount?: number | undefined;
  /** Whether to enable secondaries to serve read-only traffic. Defaults to false. */
  enableReadableSecondaries?: boolean | undefined;
  /**
   * The retention window for the instance. This is the time window in days
   * for which the historical data is retained. The default value is 7 days.
   * Valid values are 2 to 35 days.
   */
  retentionWindowInDays?: number | undefined;
  /**
   * The ref of the parent instance. This is only available if the instance is
   * child instance.
   * Input: For specifying the parent instance to create a child instance. Optional.
   * Output: Only populated if provided as input to create a child instance.
   */
  parentInstanceRef?: CreateDatabaseInstanceRef | undefined;
  /** Whether to enable PG native password login on the instance. Defaults to false. */
  enablePgNativeLogin?: boolean | undefined;
  /** The desired usage policy to associate with the instance. */
  usagePolicyId?: string | undefined;
  /** Custom tags associated with the instance. This field is only included on create and update responses. */
  customTags?: CreateCustomTag[] | undefined;
}

/**
 * DatabaseInstanceRef is a reference to a database instance. It is used in the
 * DatabaseInstance object to refer to the parent instance of an instance and
 * to refer the child instances of an instance.
 * To specify as a parent instance during creation of an instance,
 * the lsn and branch_time fields are optional. If not specified, the child
 * instance will be created from the latest lsn of the parent.
 * If both lsn and branch_time are specified, the lsn will be used to create
 * the child instance.
 */
export interface CreateDatabaseInstanceRef {
  /** Name of the ref database instance. */
  name?: string | undefined;
  /**
   * User-specified WAL LSN of the ref database instance.
   *
   * Input: For specifying the WAL LSN to create a child instance. Optional.
   * Output: Only populated if provided as input to create a child instance.
   */
  lsn?: string | undefined;
  /**
   * Branch time of the ref database instance.
   * For a parent ref instance, this is the point in time on the parent instance from which the
   * instance was created.
   * For a child ref instance, this is the point in time on the instance from which the child
   * instance was created.
   * Input: For specifying the point in time to create a child instance. Optional.
   * Output: Only populated if provided as input to create a child instance.
   */
  branchTime?: Temporal.Instant | undefined;
}

export interface CreateDatabaseInstanceRequest {
  /** Instance to create. */
  databaseInstance: CreateDatabaseInstance;
}

/** A DatabaseInstanceRole represents a Postgres role in a database instance. */
export interface CreateDatabaseInstanceRole {
  /** The name of the role. This is the unique identifier for the role in an instance. */
  name: string;
  /** The type of the role. */
  identityType?: DatabaseInstanceRole_IdentityType | undefined;
  /** An enum value for a standard role that this role is a member of. */
  membershipRole?: DatabaseInstanceRole_MembershipRole | undefined;
  /** The desired API-exposed Postgres role attribute to associate with the role. Optional. */
  attributes?: DatabaseInstanceRole_CreateAttributes | undefined;
  instanceName?: string | undefined;
}

export interface CreateDatabaseInstanceRoleRequest {
  instanceName?: string | undefined;
  databaseInstanceRole: CreateDatabaseInstanceRole;
  databaseInstanceName?: string | undefined;
}

export interface CreateDatabaseTable {
  /** Full three-part (catalog, schema, table) name of the table. */
  name: string;
  /**
   * Name of the target database instance. This is required when creating database tables in standard catalogs.
   * This is optional when creating database tables in registered catalogs. If this field is specified
   * when creating database tables in registered catalogs, the database instance name MUST
   * match that of the registered catalog (or the request will be rejected).
   */
  databaseInstanceName?: string | undefined;
  /**
   * Target Postgres database object (logical database) name for this table.
   *
   * When creating a table in a standard catalog, this field is required.
   * In this scenario, specifying this field will allow targeting an arbitrary postgres database.
   *
   * Registration of database tables via /database/tables is currently only supported in standard catalogs.
   */
  logicalDatabaseName?: string | undefined;
}

export interface CreateDatabaseTableRequest {
  table: CreateDatabaseTable;
}

/**
 * Custom fields that user can set for pipeline while creating SyncedDatabaseTable.
 * Note that other fields of pipeline are still inferred by table def internally
 */
export interface CreateNewPipelineSpec {
  /**
   * This field needs to be specified if the destination catalog is a managed postgres catalog.
   *
   * UC catalog for the pipeline to store intermediate files (checkpoints, event logs etc).
   * This needs to be a standard catalog where the user has permissions to create Delta tables.
   */
  storageCatalog?: string | undefined;
  /**
   * This field needs to be specified if the destination catalog is a managed postgres catalog.
   *
   * UC schema for the pipeline to store intermediate files (checkpoints, event logs etc).
   * This needs to be in the standard catalog where the user has permissions to create Delta tables.
   */
  storageSchema?: string | undefined;
  /** Budget policy to set on the newly created pipeline. */
  budgetPolicyId?: string | undefined;
}

export interface CreateSyncedDatabaseTable {
  /** Full three-part (catalog, schema, table) name of the table. */
  name: string;
  /**
   * Name of the target database instance. This is required when creating synced database tables in standard catalogs.
   * This is optional when creating synced database tables in registered catalogs. If this field is specified
   * when creating synced database tables in registered catalogs, the database instance name MUST
   * match that of the registered catalog (or the request will be rejected).
   */
  databaseInstanceName?: string | undefined;
  /**
   * Target Postgres database object (logical database) name for this table.
   *
   * When creating a synced table in a registered Postgres catalog, the
   * target Postgres database name is inferred to be that of the registered catalog.
   * If this field is specified in this scenario, the Postgres database name MUST
   * match that of the registered catalog (or the request will be rejected).
   *
   * When creating a synced table in a standard catalog, this field is required.
   * In this scenario, specifying this field will allow targeting an arbitrary postgres database.
   * Note that this has implications for the `create_database_objects_is_missing` field in `spec`.
   */
  logicalDatabaseName?: string | undefined;
  spec?: CreateSyncedTableSpec | undefined;
}

export interface CreateSyncedDatabaseTableRequest {
  syncedTable: CreateSyncedDatabaseTable;
}

/** Specification of a synced database table. */
export interface CreateSyncedTableSpec {
  /** Scheduling policy of the underlying pipeline. */
  schedulingPolicy?: SyncedTableSchedulingPolicy | undefined;
  /** Three-part (catalog, schema, table) name of the source Delta table. */
  sourceTableFullName?: string | undefined;
  /** Primary Key columns to be used for data insert/update in the destination. */
  primaryKeyColumns?: string[] | undefined;
  /** Time series key to deduplicate (tie-break) rows with the same primary key. */
  timeseriesKey?: string | undefined;
  /**
   * At most one of existing_pipeline_id and new_pipeline_spec should be defined.
   *
   * If existing_pipeline_id is defined, the synced table will be bin packed into the existing pipeline
   * referenced. This avoids creating a new pipeline and allows sharing existing compute.
   * In this case, the scheduling_policy of this synced table must match the scheduling policy of the existing pipeline.
   */
  existingPipelineId?: string | undefined;
  /**
   * If true, the synced table's logical database and schema resources in PG
   * will be created if they do not already exist.
   */
  createDatabaseObjectsIfMissing?: boolean | undefined;
  /**
   * At most one of existing_pipeline_id and new_pipeline_spec should be defined.
   *
   * If new_pipeline_spec is defined, a new pipeline is created for this synced table. The location pointed to is used
   * to store intermediate files (checkpoints, event logs etc). The caller must have write permissions to create Delta
   * tables in the specified catalog and schema. Again, note this requires write permissions, whereas the source table
   * only requires read permissions.
   */
  newPipelineSpec?: CreateNewPipelineSpec | undefined;
  /**
   * When true, enables accelerated sync mode for the initial data load.
   * This significantly improves performance for large tables.
   * Requires workspace-level enablement.
   */
  acceleratedSync?: boolean | undefined;
  /**
   * Override the default Delta->PG type mapping for specific columns.
   * A TypeOverride with PG_SPECIFIC_TYPE_UNSPECIFIED is rejected; a valid pg_type must be set.
   */
  typeOverrides?: SyncedTableSpec_CreateTypeOverride[] | undefined;
}

export interface CustomTag {
  /** The key of the custom tag. */
  key?: string | undefined;
  /** The value of the custom tag. */
  value?: string | undefined;
}

export interface DatabaseCatalog {
  /** The name of the catalog in UC. */
  name?: string | undefined;
  /** The name of the DatabaseInstance housing the database. */
  databaseInstanceName?: string | undefined;
  /** The name of the database (in an instance) associated with the catalog. */
  databaseName?: string | undefined;
  uid?: string | undefined;
}

export interface DatabaseCredential {
  token?: string | undefined;
  expirationTime?: Temporal.Instant | undefined;
}

/** A DatabaseInstance represents a logical Postgres instance, comprised of both compute and storage. */
export interface DatabaseInstance {
  /** An immutable UUID identifier for the instance. */
  uid?: string | undefined;
  /** The name of the instance. This is the unique identifier for the instance. */
  name?: string | undefined;
  /** The email of the creator of the instance. */
  creator?: string | undefined;
  /** The DNS endpoint to connect to the instance for read+write access. */
  readWriteDns?: string | undefined;
  /** The timestamp when the instance was created. */
  creationTime?: Temporal.Instant | undefined;
  /** The current state of the instance. */
  state?: DatabaseInstance_State | undefined;
  /** The version of Postgres running on the instance. */
  pgVersion?: string | undefined;
  /** The sku of the instance. Valid values are "CU_1", "CU_2", "CU_4", "CU_8". */
  capacity?: string | undefined;
  /**
   * Deprecated. The sku of the instance; this field will always match the value of capacity.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveCapacity?: string | undefined;
  /**
   * Whether the instance is stopped.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveStopped?: boolean | undefined;
  /**
   * The number of nodes in the instance, composed of 1 primary and 0 or more secondaries. Defaults to
   * 1 primary and 0 secondaries.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveNodeCount?: number | undefined;
  /**
   * Whether secondaries serving read-only traffic are enabled. Defaults to false.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveEnableReadableSecondaries?: boolean | undefined;
  /**
   * The DNS endpoint to connect to the instance for read only access. This is only available if
   * enable_readable_secondaries is true.
   */
  readOnlyDns?: string | undefined;
  /**
   * The retention window for the instance. This is the time window in days
   * for which the historical data is retained.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveRetentionWindowInDays?: number | undefined;
  /**
   * The ref of the parent instance. This is only available if the instance is
   * child instance.
   * Input: For specifying the parent instance to create a child instance. Optional.
   * Output: Only populated if provided as input to create a child instance.
   */
  parentInstanceRef?: DatabaseInstanceRef | undefined;
  /**
   * The refs of the child instances. This is only available if the instance is
   * parent instance.
   */
  childInstanceRefs?: DatabaseInstanceRef[] | undefined;
  /**
   * Whether the instance has PG native password login enabled.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveEnablePgNativeLogin?: boolean | undefined;
  /**
   * The policy that is applied to the instance.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveUsagePolicyId?: string | undefined;
  /**
   * The recorded custom tags associated with the instance.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveCustomTags?: CustomTag[] | undefined;
}

/**
 * DatabaseInstanceRef is a reference to a database instance. It is used in the
 * DatabaseInstance object to refer to the parent instance of an instance and
 * to refer the child instances of an instance.
 * To specify as a parent instance during creation of an instance,
 * the lsn and branch_time fields are optional. If not specified, the child
 * instance will be created from the latest lsn of the parent.
 * If both lsn and branch_time are specified, the lsn will be used to create
 * the child instance.
 */
export interface DatabaseInstanceRef {
  /** Id of the ref database instance. */
  uid?: string | undefined;
  /** Name of the ref database instance. */
  name?: string | undefined;
  /**
   * For a parent ref instance, this is the LSN on the parent instance from which the
   * instance was created.
   * For a child ref instance, this is the LSN on the instance from which the child instance
   * was created.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveLsn?: string | undefined;
  /**
   * Branch time of the ref database instance.
   * For a parent ref instance, this is the point in time on the parent instance from which the
   * instance was created.
   * For a child ref instance, this is the point in time on the instance from which the child
   * instance was created.
   * Input: For specifying the point in time to create a child instance. Optional.
   * Output: Only populated if provided as input to create a child instance.
   */
  branchTime?: Temporal.Instant | undefined;
}

/** A DatabaseInstanceRole represents a Postgres role in a database instance. */
export interface DatabaseInstanceRole {
  /** The name of the role. This is the unique identifier for the role in an instance. */
  name?: string | undefined;
  /** The type of the role. */
  identityType?: DatabaseInstanceRole_IdentityType | undefined;
  /** An enum value for a standard role that this role is a member of. */
  membershipRole?: DatabaseInstanceRole_MembershipRole | undefined;
  /** The desired API-exposed Postgres role attribute to associate with the role. Optional. */
  attributes?: DatabaseInstanceRole_Attributes | undefined;
  /**
   * The attributes that are applied to the role.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveAttributes?: DatabaseInstanceRole_Attributes | undefined;
  instanceName?: string | undefined;
}

/**
 * Attributes that can be granted to a Postgres role. We are only implementing a subset for now, see xref:
 * https://www.postgresql.org/docs/16/sql-createrole.html
 * The values follow Postgres keyword naming e.g. CREATEDB, BYPASSRLS, etc. which is why they don't include typical
 * underscores between words. We were requested to make this a nested object/struct representation since these are
 * knobs from an external spec.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DatabaseInstanceRole_Attributes {
  createdb?: boolean | undefined;
  createrole?: boolean | undefined;
  bypassrls?: boolean | undefined;
}

/**
 * Attributes that can be granted to a Postgres role. We are only implementing a subset for now, see xref:
 * https://www.postgresql.org/docs/16/sql-createrole.html
 * The values follow Postgres keyword naming e.g. CREATEDB, BYPASSRLS, etc. which is why they don't include typical
 * underscores between words. We were requested to make this a nested object/struct representation since these are
 * knobs from an external spec.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DatabaseInstanceRole_CreateAttributes {
  createdb?: boolean | undefined;
  createrole?: boolean | undefined;
  bypassrls?: boolean | undefined;
}

export interface DatabaseTable {
  /** Full three-part (catalog, schema, table) name of the table. */
  name?: string | undefined;
  /**
   * Name of the target database instance. This is required when creating database tables in standard catalogs.
   * This is optional when creating database tables in registered catalogs. If this field is specified
   * when creating database tables in registered catalogs, the database instance name MUST
   * match that of the registered catalog (or the request will be rejected).
   */
  databaseInstanceName?: string | undefined;
  /**
   * Target Postgres database object (logical database) name for this table.
   *
   * When creating a table in a standard catalog, this field is required.
   * In this scenario, specifying this field will allow targeting an arbitrary postgres database.
   *
   * Registration of database tables via /database/tables is currently only supported in standard catalogs.
   */
  logicalDatabaseName?: string | undefined;
}

export interface DeleteDatabaseCatalogRequest {
  name?: string | undefined;
}

export interface DeleteDatabaseInstanceRequest {
  /** Name of the instance to delete. */
  name?: string | undefined;
  /**
   * By default, an instance cannot be deleted if it has descendant instances created via PITR. If
   * this flag is specified as true, all descendent instances will be deleted as well.
   */
  force?: boolean | undefined;
  /**
   * Deprecated. Omitting the field or setting it to true will result in the field being hard deleted. Setting a value
   * of false will throw a bad request.
   */
  purge?: boolean | undefined;
}

export interface DeleteDatabaseInstanceRoleRequest {
  instanceName?: string | undefined;
  name?: string | undefined;
  reassignOwnedTo?: string | undefined;
  /** This is the AIP standard name for the equivalent of Postgres' `IF EXISTS` option */
  allowMissing?: boolean | undefined;
}

export interface DeleteDatabaseTableRequest {
  name?: string | undefined;
}

export interface DeleteSyncedDatabaseTableRequest {
  name?: string | undefined;
  /** Optional. When set to true, the actual PostgreSQL table will be dropped from the database. */
  purgeData?: boolean | undefined;
}

export interface DeltaTableSyncInfo {
  /** The Delta Lake commit version that was last successfully synced. */
  deltaCommitVersion?: bigint | undefined;
  /**
   * The timestamp when the above Delta version was committed in the source Delta table.
   * Note: This is the Delta commit time, not the time the data was written to the synced table.
   */
  deltaCommitTimestamp?: Temporal.Instant | undefined;
}

export interface FindDatabaseInstanceByUidRequest {
  /** UID of the cluster to get. */
  uid?: string | undefined;
}

/** Generates a credential that can be used to access database instances */
export interface GenerateDatabaseCredentialRequest {
  requestId?: string | undefined;
  /** Instances to request a credential for. At least one of instance_names or claims must be specified. */
  instanceNames?: string[] | undefined;
  /**
   * A set of UC permissions to add to the credential. We verify that the caller has the necessary
   * permissions in UC and include a reference in the token. Postgres uses that token to give the
   * connecting user additional grants to the Postgres resources that correspond to the UC resources.
   * The UC resources need to be something that have a Postgres counterpart. For example, a synced table or
   * a table in a UC database catalog.
   */
  claims?: RequestedClaims[] | undefined;
}

export interface GetDatabaseCatalogRequest {
  name?: string | undefined;
}

export interface GetDatabaseInstanceRequest {
  /** Name of the cluster to get. */
  name?: string | undefined;
}

export interface GetDatabaseInstanceRoleRequest {
  instanceName?: string | undefined;
  name?: string | undefined;
}

export interface GetDatabaseTableRequest {
  name?: string | undefined;
}

export interface GetSyncedDatabaseTableRequest {
  name?: string | undefined;
}

export interface ListDatabaseCatalogsRequest {
  /** Name of the instance to get database catalogs for. */
  instanceName?: string | undefined;
  /** Pagination token to go to the next page of synced database tables. Requests first page if absent. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. */
  pageSize?: number | undefined;
}

export interface ListDatabaseCatalogsResponse {
  databaseCatalogs?: DatabaseCatalog[] | undefined;
  /** Pagination token to request the next page of database catalogs. */
  nextPageToken?: string | undefined;
}

export interface ListDatabaseInstanceRolesRequest {
  instanceName?: string | undefined;
  /** Pagination token to go to the next page of Database Instances. Requests first page if absent. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. */
  pageSize?: number | undefined;
}

export interface ListDatabaseInstanceRolesResponse {
  /** List of database instance roles. */
  databaseInstanceRoles?: DatabaseInstanceRole[] | undefined;
  /** Pagination token to request the next page of instances. */
  nextPageToken?: string | undefined;
}

export interface ListDatabaseInstancesRequest {
  /** Pagination token to go to the next page of Database Instances. Requests first page if absent. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. The maximum value is 100. */
  pageSize?: number | undefined;
}

export interface ListDatabaseInstancesResponse {
  /** List of instances. */
  databaseInstances?: DatabaseInstance[] | undefined;
  /** Pagination token to request the next page of instances. */
  nextPageToken?: string | undefined;
}

export interface ListSyncedDatabaseTablesRequest {
  /** Name of the instance to get synced tables for. */
  instanceName?: string | undefined;
  /** Pagination token to go to the next page of synced database tables. Requests first page if absent. */
  pageToken?: string | undefined;
  /** Upper bound for items returned. */
  pageSize?: number | undefined;
}

export interface ListSyncedDatabaseTablesResponse {
  syncedTables?: SyncedDatabaseTable[] | undefined;
  /** Pagination token to request the next page of synced tables. */
  nextPageToken?: string | undefined;
}

/**
 * Custom fields that user can set for pipeline while creating SyncedDatabaseTable.
 * Note that other fields of pipeline are still inferred by table def internally
 */
export interface NewPipelineSpec {
  /**
   * This field needs to be specified if the destination catalog is a managed postgres catalog.
   *
   * UC catalog for the pipeline to store intermediate files (checkpoints, event logs etc).
   * This needs to be a standard catalog where the user has permissions to create Delta tables.
   */
  storageCatalog?: string | undefined;
  /**
   * This field needs to be specified if the destination catalog is a managed postgres catalog.
   *
   * UC schema for the pipeline to store intermediate files (checkpoints, event logs etc).
   * This needs to be in the standard catalog where the user has permissions to create Delta tables.
   */
  storageSchema?: string | undefined;
  /** Budget policy to set on the newly created pipeline. */
  budgetPolicyId?: string | undefined;
}

/**
 * Copied over from managed-catalog/api/messages/common.proto to decouple SDK packages.
 * xref go/unified-api-packages-dd
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProvisioningInfo {}

export interface RequestedClaims {
  permissionSet?: RequestedClaims_PermissionSet | undefined;
  resources?: RequestedResource[] | undefined;
}

export interface RequestedResource {
  /** Might add UC_SCHEMA & UC_CATALOG later */
  resourceName?:
    | {$case: 'unspecifiedResourceName'; unspecifiedResourceName: string}
    | {$case: 'tableName'; tableName: string}
    | undefined;
}

export interface SyncedDatabaseTable {
  /** Full three-part (catalog, schema, table) name of the table. */
  name?: string | undefined;
  /**
   * The name of the database instance that this table is registered to. This field is always returned, and for
   * tables inside database catalogs is inferred database instance associated with the catalog.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveDatabaseInstanceName?: string | undefined;
  /**
   * The name of the logical database that this table is registered to.
   * This is an output only field that contains the value computed from the input field combined with
   * server side defaults. Use the field without the effective_ prefix to set the value.
   */
  effectiveLogicalDatabaseName?: string | undefined;
  spec?: SyncedTableSpec | undefined;
  /**
   * The provisioning state of the synced table entity in Unity Catalog. This is distinct from the
   * state of the data synchronization pipeline (i.e. the table may be in "ACTIVE" but the pipeline
   * may be in "PROVISIONING" as it runs asynchronously).
   */
  unityCatalogProvisioningState?: ProvisioningInfo_State | undefined;
  /** Synced Table data synchronization status */
  dataSynchronizationStatus?: SyncedTableStatus | undefined;
}

/**
 * Detailed status of a synced table. Shown if the synced table is in the SYNCED_CONTINUOUS_UPDATE
 * or the SYNCED_UPDATING_PIPELINE_RESOURCES state.
 */
export interface SyncedTableContinuousUpdateStatus {
  /** The last source table Delta version that was successfully synced to the synced table. */
  lastProcessedCommitVersion?: bigint | undefined;
  /**
   * The end timestamp of the last time any data was synchronized from the source table to the synced
   * table. This is when the data is available in the synced table.
   */
  timestamp?: Temporal.Instant | undefined;
  /** Progress of the initial data synchronization. */
  initialPipelineSyncProgress?: SyncedTablePipelineProgress | undefined;
}

/**
 * Detailed status of a synced table. Shown if the synced table is in the OFFLINE_FAILED or the
 * SYNCED_PIPELINE_FAILED state.
 */
export interface SyncedTableFailedStatus {
  /**
   * The last source table Delta version that was successfully synced to the synced table.
   * The last source table Delta version that was synced to the synced table.
   * Only populated if the table is still
   * synced and available for serving.
   */
  lastProcessedCommitVersion?: bigint | undefined;
  /**
   * The end timestamp of the last time any data was synchronized from the source table to the synced
   * table. Only populated if the table is still synced and available for serving.
   */
  timestamp?: Temporal.Instant | undefined;
}

/** Progress information of the Synced Table data synchronization pipeline. */
export interface SyncedTablePipelineProgress {
  /**
   * The source table Delta version that was last processed by the pipeline. The pipeline may not
   * have completely processed this version yet.
   */
  latestVersionCurrentlyProcessing?: bigint | undefined;
  /** The number of rows that have been synced in this update. */
  syncedRowCount?: bigint | undefined;
  /** The total number of rows that need to be synced in this update. This number may be an estimate. */
  totalRowCount?: bigint | undefined;
  /** The completion ratio of this update. This is a number between 0 and 1. */
  syncProgressCompletion?: number | undefined;
  /** The estimated time remaining to complete this update in seconds. */
  estimatedCompletionTimeSeconds?: number | undefined;
  /** The current phase of the data synchronization pipeline. */
  provisioningPhase?: ProvisioningPhase | undefined;
}

export interface SyncedTablePosition {
  /**
   * The starting timestamp of the most recent successful synchronization from the source table
   * to the destination (synced) table.
   * Note this is the starting timestamp of the sync operation, not the end time.
   * E.g., for a batch, this is the time when the sync operation started.
   */
  syncStartTimestamp?: Temporal.Instant | undefined;
  /**
   * The end timestamp of the most recent successful synchronization.
   * This is the time when the data is available in the synced table.
   */
  syncEndTimestamp?: Temporal.Instant | undefined;
  /** Information about the source system at the time of the last sync. */
  sourceSyncInfo?:
    | {$case: 'deltaTableSyncInfo'; deltaTableSyncInfo: DeltaTableSyncInfo}
    | undefined;
}

/**
 * Detailed status of a synced table. Shown if the synced table is in the
 * PROVISIONING_PIPELINE_RESOURCES or the PROVISIONING_INITIAL_SNAPSHOT state.
 */
export interface SyncedTableProvisioningStatus {
  /**
   * Details about initial data synchronization. Only populated when in the
   * PROVISIONING_INITIAL_SNAPSHOT state.
   */
  initialPipelineSyncProgress?: SyncedTablePipelineProgress | undefined;
}

/** Specification of a synced database table. */
export interface SyncedTableSpec {
  /** Scheduling policy of the underlying pipeline. */
  schedulingPolicy?: SyncedTableSchedulingPolicy | undefined;
  /** Three-part (catalog, schema, table) name of the source Delta table. */
  sourceTableFullName?: string | undefined;
  /** Primary Key columns to be used for data insert/update in the destination. */
  primaryKeyColumns?: string[] | undefined;
  /** Time series key to deduplicate (tie-break) rows with the same primary key. */
  timeseriesKey?: string | undefined;
  /**
   * Override the default Delta->PG type mapping for specific columns.
   * A TypeOverride with PG_SPECIFIC_TYPE_UNSPECIFIED is rejected; a valid pg_type must be set.
   */
  typeOverrides?: SyncedTableSpec_TypeOverride[] | undefined;
}

/** Overrides the default Delta-to-PostgreSQL type mapping for a single column. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SyncedTableSpec_CreateTypeOverride {
  /** Name of the source column whose target PostgreSQL type should be overridden. */
  columnName: string;
  /** PostgreSQL-specific target type to use for the column. */
  pgType: SyncedTableSpec_PgSpecificType;
  /**
   * Size parameter for the target type. Required when pg_type is PG_SPECIFIC_TYPE_VECTOR
   * (specifies the vector dimension, e.g., 1024).
   */
  size?: number | undefined;
}

/** Overrides the default Delta-to-PostgreSQL type mapping for a single column. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SyncedTableSpec_TypeOverride {
  /** Name of the source column whose target PostgreSQL type should be overridden. */
  columnName?: string | undefined;
  /** PostgreSQL-specific target type to use for the column. */
  pgType?: SyncedTableSpec_PgSpecificType | undefined;
  /**
   * Size parameter for the target type. Required when pg_type is PG_SPECIFIC_TYPE_VECTOR
   * (specifies the vector dimension, e.g., 1024).
   */
  size?: number | undefined;
}

/** Overrides the default Delta-to-PostgreSQL type mapping for a single column. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SyncedTableSpec_UpdateTypeOverride {
  /** Name of the source column whose target PostgreSQL type should be overridden. */
  columnName?: string | undefined;
  /** PostgreSQL-specific target type to use for the column. */
  pgType?: SyncedTableSpec_PgSpecificType | undefined;
  /**
   * Size parameter for the target type. Required when pg_type is PG_SPECIFIC_TYPE_VECTOR
   * (specifies the vector dimension, e.g., 1024).
   */
  size?: number | undefined;
}

/** Status of a synced table. */
export interface SyncedTableStatus {
  /** The state of the synced table. */
  detailedState?: SyncedTableState | undefined;
  /** A text description of the current state of the synced table. */
  message?: string | undefined;
  /** The detailed status based on the synced table state. */
  detailedStatus?:
    | {
        $case: 'provisioningStatus';
        provisioningStatus: SyncedTableProvisioningStatus;
      }
    | {
        $case: 'continuousUpdateStatus';
        continuousUpdateStatus: SyncedTableContinuousUpdateStatus;
      }
    | {
        $case: 'triggeredUpdateStatus';
        triggeredUpdateStatus: SyncedTableTriggeredUpdateStatus;
      }
    | {$case: 'failedStatus'; failedStatus: SyncedTableFailedStatus}
    | undefined;
  /**
   * ID of the associated pipeline. The pipeline ID may have been provided by the client
   * (in the case of bin packing), or generated by the server (when creating a new pipeline).
   */
  pipelineId?: string | undefined;
  /**
   * Summary of the last successful synchronization from source to destination.
   *
   * Will always be present if there has been a successful sync. Even if the most recent syncs have failed.
   *
   * Limitation:
   * The only exception is if the synced table is doing a FULL REFRESH, then the last sync information
   * will not be available until the full refresh is complete. This limitation will be addressed in a future version.
   *
   * This top-level field is a convenience for consumers who want easy access to last sync information
   * without having to traverse detailed_status.
   */
  lastSync?: SyncedTablePosition | undefined;
}

/**
 * Detailed status of a synced table. Shown if the synced table is in the SYNCED_TRIGGERED_UPDATE
 * or the SYNCED_NO_PENDING_UPDATE state.
 */
export interface SyncedTableTriggeredUpdateStatus {
  /** The last source table Delta version that was successfully synced to the synced table. */
  lastProcessedCommitVersion?: bigint | undefined;
  /**
   * The end timestamp of the last time any data was synchronized from the source table to the synced
   * table. This is when the data is available in the synced table.
   */
  timestamp?: Temporal.Instant | undefined;
  /** Progress of the active data synchronization pipeline. */
  triggeredUpdateProgress?: SyncedTablePipelineProgress | undefined;
}

export interface UpdateCustomTag {
  /** The key of the custom tag. */
  key?: string | undefined;
  /** The value of the custom tag. */
  value?: string | undefined;
}

export interface UpdateDatabaseCatalog {
  /** The name of the catalog in UC. */
  name?: string | undefined;
  /** The name of the DatabaseInstance housing the database. */
  databaseInstanceName?: string | undefined;
  /** The name of the database (in an instance) associated with the catalog. */
  databaseName?: string | undefined;
  createDatabaseIfNotExists?: boolean | undefined;
}

export interface UpdateDatabaseCatalogRequest {
  /** Note that updating a database catalog is not yet supported. */
  databaseCatalog?: UpdateDatabaseCatalog | undefined;
  /** The list of fields to update. Setting this field is not yet supported. */
  updateMask?: FieldMask<UpdateDatabaseCatalog> | undefined;
}

/** A DatabaseInstance represents a logical Postgres instance, comprised of both compute and storage. */
export interface UpdateDatabaseInstance {
  /** The name of the instance. This is the unique identifier for the instance. */
  name?: string | undefined;
  /** The sku of the instance. Valid values are "CU_1", "CU_2", "CU_4", "CU_8". */
  capacity?: string | undefined;
  /** Whether to stop the instance. An input only param, see effective_stopped for the output. */
  stopped?: boolean | undefined;
  /**
   * The number of nodes in the instance, composed of 1 primary and 0 or more secondaries. Defaults to
   * 1 primary and 0 secondaries. This field is input only, see effective_node_count for the output.
   */
  nodeCount?: number | undefined;
  /** Whether to enable secondaries to serve read-only traffic. Defaults to false. */
  enableReadableSecondaries?: boolean | undefined;
  /**
   * The retention window for the instance. This is the time window in days
   * for which the historical data is retained. The default value is 7 days.
   * Valid values are 2 to 35 days.
   */
  retentionWindowInDays?: number | undefined;
  /**
   * The ref of the parent instance. This is only available if the instance is
   * child instance.
   * Input: For specifying the parent instance to create a child instance. Optional.
   * Output: Only populated if provided as input to create a child instance.
   */
  parentInstanceRef?: UpdateDatabaseInstanceRef | undefined;
  /** Whether to enable PG native password login on the instance. Defaults to false. */
  enablePgNativeLogin?: boolean | undefined;
  /** The desired usage policy to associate with the instance. */
  usagePolicyId?: string | undefined;
  /** Custom tags associated with the instance. This field is only included on create and update responses. */
  customTags?: UpdateCustomTag[] | undefined;
}

/**
 * DatabaseInstanceRef is a reference to a database instance. It is used in the
 * DatabaseInstance object to refer to the parent instance of an instance and
 * to refer the child instances of an instance.
 * To specify as a parent instance during creation of an instance,
 * the lsn and branch_time fields are optional. If not specified, the child
 * instance will be created from the latest lsn of the parent.
 * If both lsn and branch_time are specified, the lsn will be used to create
 * the child instance.
 */
export interface UpdateDatabaseInstanceRef {
  /** Name of the ref database instance. */
  name?: string | undefined;
  /**
   * User-specified WAL LSN of the ref database instance.
   *
   * Input: For specifying the WAL LSN to create a child instance. Optional.
   * Output: Only populated if provided as input to create a child instance.
   */
  lsn?: string | undefined;
  /**
   * Branch time of the ref database instance.
   * For a parent ref instance, this is the point in time on the parent instance from which the
   * instance was created.
   * For a child ref instance, this is the point in time on the instance from which the child
   * instance was created.
   * Input: For specifying the point in time to create a child instance. Optional.
   * Output: Only populated if provided as input to create a child instance.
   */
  branchTime?: Temporal.Instant | undefined;
}

export interface UpdateDatabaseInstanceRequest {
  databaseInstance?: UpdateDatabaseInstance | undefined;
  /**
   * The list of fields to update. If unspecified, all fields will be updated when possible. To wipe out custom_tags,
   * specify custom_tags in the update_mask with an empty custom_tags map.
   */
  updateMask?: FieldMask<UpdateDatabaseInstance> | undefined;
}

/**
 * Custom fields that user can set for pipeline while creating SyncedDatabaseTable.
 * Note that other fields of pipeline are still inferred by table def internally
 */
export interface UpdateNewPipelineSpec {
  /**
   * This field needs to be specified if the destination catalog is a managed postgres catalog.
   *
   * UC catalog for the pipeline to store intermediate files (checkpoints, event logs etc).
   * This needs to be a standard catalog where the user has permissions to create Delta tables.
   */
  storageCatalog?: string | undefined;
  /**
   * This field needs to be specified if the destination catalog is a managed postgres catalog.
   *
   * UC schema for the pipeline to store intermediate files (checkpoints, event logs etc).
   * This needs to be in the standard catalog where the user has permissions to create Delta tables.
   */
  storageSchema?: string | undefined;
  /** Budget policy to set on the newly created pipeline. */
  budgetPolicyId?: string | undefined;
}

export interface UpdateSyncedDatabaseTable {
  /** Full three-part (catalog, schema, table) name of the table. */
  name?: string | undefined;
  /**
   * Name of the target database instance. This is required when creating synced database tables in standard catalogs.
   * This is optional when creating synced database tables in registered catalogs. If this field is specified
   * when creating synced database tables in registered catalogs, the database instance name MUST
   * match that of the registered catalog (or the request will be rejected).
   */
  databaseInstanceName?: string | undefined;
  /**
   * Target Postgres database object (logical database) name for this table.
   *
   * When creating a synced table in a registered Postgres catalog, the
   * target Postgres database name is inferred to be that of the registered catalog.
   * If this field is specified in this scenario, the Postgres database name MUST
   * match that of the registered catalog (or the request will be rejected).
   *
   * When creating a synced table in a standard catalog, this field is required.
   * In this scenario, specifying this field will allow targeting an arbitrary postgres database.
   * Note that this has implications for the `create_database_objects_is_missing` field in `spec`.
   */
  logicalDatabaseName?: string | undefined;
  spec?: UpdateSyncedTableSpec | undefined;
}

export interface UpdateSyncedDatabaseTableRequest {
  /** Note that updating a synced database table is not yet supported. */
  syncedTable?: UpdateSyncedDatabaseTable | undefined;
  /** The list of fields to update. Setting this field is not yet supported. */
  updateMask?: FieldMask<UpdateSyncedDatabaseTable> | undefined;
}

/** Specification of a synced database table. */
export interface UpdateSyncedTableSpec {
  /** Scheduling policy of the underlying pipeline. */
  schedulingPolicy?: SyncedTableSchedulingPolicy | undefined;
  /** Three-part (catalog, schema, table) name of the source Delta table. */
  sourceTableFullName?: string | undefined;
  /** Primary Key columns to be used for data insert/update in the destination. */
  primaryKeyColumns?: string[] | undefined;
  /** Time series key to deduplicate (tie-break) rows with the same primary key. */
  timeseriesKey?: string | undefined;
  /**
   * At most one of existing_pipeline_id and new_pipeline_spec should be defined.
   *
   * If existing_pipeline_id is defined, the synced table will be bin packed into the existing pipeline
   * referenced. This avoids creating a new pipeline and allows sharing existing compute.
   * In this case, the scheduling_policy of this synced table must match the scheduling policy of the existing pipeline.
   */
  existingPipelineId?: string | undefined;
  /**
   * If true, the synced table's logical database and schema resources in PG
   * will be created if they do not already exist.
   */
  createDatabaseObjectsIfMissing?: boolean | undefined;
  /**
   * At most one of existing_pipeline_id and new_pipeline_spec should be defined.
   *
   * If new_pipeline_spec is defined, a new pipeline is created for this synced table. The location pointed to is used
   * to store intermediate files (checkpoints, event logs etc). The caller must have write permissions to create Delta
   * tables in the specified catalog and schema. Again, note this requires write permissions, whereas the source table
   * only requires read permissions.
   */
  newPipelineSpec?: UpdateNewPipelineSpec | undefined;
  /**
   * When true, enables accelerated sync mode for the initial data load.
   * This significantly improves performance for large tables.
   * Requires workspace-level enablement.
   */
  acceleratedSync?: boolean | undefined;
  /**
   * Override the default Delta->PG type mapping for specific columns.
   * A TypeOverride with PG_SPECIFIC_TYPE_UNSPECIFIED is rejected; a valid pg_type must be set.
   */
  typeOverrides?: SyncedTableSpec_UpdateTypeOverride[] | undefined;
}

export const unmarshalCustomTagSchema: z.ZodType<CustomTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalDatabaseCatalogSchema: z.ZodType<DatabaseCatalog> = z
  .object({
    name: z.string().optional(),
    database_instance_name: z.string().optional(),
    database_name: z.string().optional(),
    uid: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    databaseInstanceName: d.database_instance_name,
    databaseName: d.database_name,
    uid: d.uid,
  }));

export const unmarshalDatabaseCredentialSchema: z.ZodType<DatabaseCredential> =
  z
    .object({
      token: z.string().optional(),
      expiration_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      token: d.token,
      expirationTime: d.expiration_time,
    }));

export const unmarshalDatabaseInstanceSchema: z.ZodType<DatabaseInstance> = z
  .object({
    uid: z.string().optional(),
    name: z.string().optional(),
    creator: z.string().optional(),
    read_write_dns: z.string().optional(),
    creation_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    state: z.string().optional(),
    pg_version: z.string().optional(),
    capacity: z.string().optional(),
    effective_capacity: z.string().optional(),
    effective_stopped: z.boolean().optional(),
    effective_node_count: z.number().optional(),
    effective_enable_readable_secondaries: z.boolean().optional(),
    read_only_dns: z.string().optional(),
    effective_retention_window_in_days: z.number().optional(),
    parent_instance_ref: z
      .lazy(() => unmarshalDatabaseInstanceRefSchema)
      .optional(),
    child_instance_refs: z
      .array(z.lazy(() => unmarshalDatabaseInstanceRefSchema))
      .optional(),
    effective_enable_pg_native_login: z.boolean().optional(),
    effective_usage_policy_id: z.string().optional(),
    effective_custom_tags: z
      .array(z.lazy(() => unmarshalCustomTagSchema))
      .optional(),
  })
  .transform(d => ({
    uid: d.uid,
    name: d.name,
    creator: d.creator,
    readWriteDns: d.read_write_dns,
    creationTime: d.creation_time,
    state: d.state,
    pgVersion: d.pg_version,
    capacity: d.capacity,
    effectiveCapacity: d.effective_capacity,
    effectiveStopped: d.effective_stopped,
    effectiveNodeCount: d.effective_node_count,
    effectiveEnableReadableSecondaries: d.effective_enable_readable_secondaries,
    readOnlyDns: d.read_only_dns,
    effectiveRetentionWindowInDays: d.effective_retention_window_in_days,
    parentInstanceRef: d.parent_instance_ref,
    childInstanceRefs: d.child_instance_refs,
    effectiveEnablePgNativeLogin: d.effective_enable_pg_native_login,
    effectiveUsagePolicyId: d.effective_usage_policy_id,
    effectiveCustomTags: d.effective_custom_tags,
  }));

export const unmarshalDatabaseInstanceRefSchema: z.ZodType<DatabaseInstanceRef> =
  z
    .object({
      uid: z.string().optional(),
      name: z.string().optional(),
      effective_lsn: z.string().optional(),
      branch_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      uid: d.uid,
      name: d.name,
      effectiveLsn: d.effective_lsn,
      branchTime: d.branch_time,
    }));

export const unmarshalDatabaseInstanceRoleSchema: z.ZodType<DatabaseInstanceRole> =
  z
    .object({
      name: z.string().optional(),
      identity_type: z.string().optional(),
      membership_role: z.string().optional(),
      attributes: z
        .lazy(() => unmarshalDatabaseInstanceRole_AttributesSchema)
        .optional(),
      effective_attributes: z
        .lazy(() => unmarshalDatabaseInstanceRole_AttributesSchema)
        .optional(),
      instance_name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      identityType: d.identity_type,
      membershipRole: d.membership_role,
      attributes: d.attributes,
      effectiveAttributes: d.effective_attributes,
      instanceName: d.instance_name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDatabaseInstanceRole_AttributesSchema: z.ZodType<DatabaseInstanceRole_Attributes> =
  z
    .object({
      createdb: z.boolean().optional(),
      createrole: z.boolean().optional(),
      bypassrls: z.boolean().optional(),
    })
    .transform(d => ({
      createdb: d.createdb,
      createrole: d.createrole,
      bypassrls: d.bypassrls,
    }));

export const unmarshalDatabaseTableSchema: z.ZodType<DatabaseTable> = z
  .object({
    name: z.string().optional(),
    database_instance_name: z.string().optional(),
    logical_database_name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    databaseInstanceName: d.database_instance_name,
    logicalDatabaseName: d.logical_database_name,
  }));

export const unmarshalDeltaTableSyncInfoSchema: z.ZodType<DeltaTableSyncInfo> =
  z
    .object({
      delta_commit_version: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      delta_commit_timestamp: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      deltaCommitVersion: d.delta_commit_version,
      deltaCommitTimestamp: d.delta_commit_timestamp,
    }));

export const unmarshalListDatabaseCatalogsResponseSchema: z.ZodType<ListDatabaseCatalogsResponse> =
  z
    .object({
      database_catalogs: z
        .array(z.lazy(() => unmarshalDatabaseCatalogSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      databaseCatalogs: d.database_catalogs,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListDatabaseInstanceRolesResponseSchema: z.ZodType<ListDatabaseInstanceRolesResponse> =
  z
    .object({
      database_instance_roles: z
        .array(z.lazy(() => unmarshalDatabaseInstanceRoleSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      databaseInstanceRoles: d.database_instance_roles,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListDatabaseInstancesResponseSchema: z.ZodType<ListDatabaseInstancesResponse> =
  z
    .object({
      database_instances: z
        .array(z.lazy(() => unmarshalDatabaseInstanceSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      databaseInstances: d.database_instances,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSyncedDatabaseTablesResponseSchema: z.ZodType<ListSyncedDatabaseTablesResponse> =
  z
    .object({
      synced_tables: z
        .array(z.lazy(() => unmarshalSyncedDatabaseTableSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      syncedTables: d.synced_tables,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSyncedDatabaseTableSchema: z.ZodType<SyncedDatabaseTable> =
  z
    .object({
      name: z.string().optional(),
      effective_database_instance_name: z.string().optional(),
      effective_logical_database_name: z.string().optional(),
      spec: z.lazy(() => unmarshalSyncedTableSpecSchema).optional(),
      unity_catalog_provisioning_state: z.string().optional(),
      data_synchronization_status: z
        .lazy(() => unmarshalSyncedTableStatusSchema)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      effectiveDatabaseInstanceName: d.effective_database_instance_name,
      effectiveLogicalDatabaseName: d.effective_logical_database_name,
      spec: d.spec,
      unityCatalogProvisioningState: d.unity_catalog_provisioning_state,
      dataSynchronizationStatus: d.data_synchronization_status,
    }));

export const unmarshalSyncedTableContinuousUpdateStatusSchema: z.ZodType<SyncedTableContinuousUpdateStatus> =
  z
    .object({
      last_processed_commit_version: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      timestamp: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      initial_pipeline_sync_progress: z
        .lazy(() => unmarshalSyncedTablePipelineProgressSchema)
        .optional(),
    })
    .transform(d => ({
      lastProcessedCommitVersion: d.last_processed_commit_version,
      timestamp: d.timestamp,
      initialPipelineSyncProgress: d.initial_pipeline_sync_progress,
    }));

export const unmarshalSyncedTableFailedStatusSchema: z.ZodType<SyncedTableFailedStatus> =
  z
    .object({
      last_processed_commit_version: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      timestamp: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      lastProcessedCommitVersion: d.last_processed_commit_version,
      timestamp: d.timestamp,
    }));

export const unmarshalSyncedTablePipelineProgressSchema: z.ZodType<SyncedTablePipelineProgress> =
  z
    .object({
      latest_version_currently_processing: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      synced_row_count: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      total_row_count: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      sync_progress_completion: z.number().optional(),
      estimated_completion_time_seconds: z.number().optional(),
      provisioning_phase: z.string().optional(),
    })
    .transform(d => ({
      latestVersionCurrentlyProcessing: d.latest_version_currently_processing,
      syncedRowCount: d.synced_row_count,
      totalRowCount: d.total_row_count,
      syncProgressCompletion: d.sync_progress_completion,
      estimatedCompletionTimeSeconds: d.estimated_completion_time_seconds,
      provisioningPhase: d.provisioning_phase,
    }));

export const unmarshalSyncedTablePositionSchema: z.ZodType<SyncedTablePosition> =
  z
    .object({
      sync_start_timestamp: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      sync_end_timestamp: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      delta_table_sync_info: z
        .lazy(() => unmarshalDeltaTableSyncInfoSchema)
        .optional(),
    })
    .transform(d => ({
      syncStartTimestamp: d.sync_start_timestamp,
      syncEndTimestamp: d.sync_end_timestamp,
      sourceSyncInfo:
        d.delta_table_sync_info !== undefined
          ? {
              $case: 'deltaTableSyncInfo' as const,
              deltaTableSyncInfo: d.delta_table_sync_info,
            }
          : undefined,
    }));

export const unmarshalSyncedTableProvisioningStatusSchema: z.ZodType<SyncedTableProvisioningStatus> =
  z
    .object({
      initial_pipeline_sync_progress: z
        .lazy(() => unmarshalSyncedTablePipelineProgressSchema)
        .optional(),
    })
    .transform(d => ({
      initialPipelineSyncProgress: d.initial_pipeline_sync_progress,
    }));

export const unmarshalSyncedTableSpecSchema: z.ZodType<SyncedTableSpec> = z
  .object({
    scheduling_policy: z.string().optional(),
    source_table_full_name: z.string().optional(),
    primary_key_columns: z.array(z.string()).optional(),
    timeseries_key: z.string().optional(),
    type_overrides: z
      .array(z.lazy(() => unmarshalSyncedTableSpec_TypeOverrideSchema))
      .optional(),
  })
  .transform(d => ({
    schedulingPolicy: d.scheduling_policy,
    sourceTableFullName: d.source_table_full_name,
    primaryKeyColumns: d.primary_key_columns,
    timeseriesKey: d.timeseries_key,
    typeOverrides: d.type_overrides,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSyncedTableSpec_TypeOverrideSchema: z.ZodType<SyncedTableSpec_TypeOverride> =
  z
    .object({
      column_name: z.string().optional(),
      pg_type: z.string().optional(),
      size: z.number().optional(),
    })
    .transform(d => ({
      columnName: d.column_name,
      pgType: d.pg_type,
      size: d.size,
    }));

export const unmarshalSyncedTableStatusSchema: z.ZodType<SyncedTableStatus> = z
  .object({
    detailed_state: z.string().optional(),
    message: z.string().optional(),
    provisioning_status: z
      .lazy(() => unmarshalSyncedTableProvisioningStatusSchema)
      .optional(),
    continuous_update_status: z
      .lazy(() => unmarshalSyncedTableContinuousUpdateStatusSchema)
      .optional(),
    triggered_update_status: z
      .lazy(() => unmarshalSyncedTableTriggeredUpdateStatusSchema)
      .optional(),
    failed_status: z
      .lazy(() => unmarshalSyncedTableFailedStatusSchema)
      .optional(),
    pipeline_id: z.string().optional(),
    last_sync: z.lazy(() => unmarshalSyncedTablePositionSchema).optional(),
  })
  .transform(d => ({
    detailedState: d.detailed_state,
    message: d.message,
    detailedStatus:
      d.provisioning_status !== undefined
        ? {
            $case: 'provisioningStatus' as const,
            provisioningStatus: d.provisioning_status,
          }
        : d.continuous_update_status !== undefined
          ? {
              $case: 'continuousUpdateStatus' as const,
              continuousUpdateStatus: d.continuous_update_status,
            }
          : d.triggered_update_status !== undefined
            ? {
                $case: 'triggeredUpdateStatus' as const,
                triggeredUpdateStatus: d.triggered_update_status,
              }
            : d.failed_status !== undefined
              ? {$case: 'failedStatus' as const, failedStatus: d.failed_status}
              : undefined,
    pipelineId: d.pipeline_id,
    lastSync: d.last_sync,
  }));

export const unmarshalSyncedTableTriggeredUpdateStatusSchema: z.ZodType<SyncedTableTriggeredUpdateStatus> =
  z
    .object({
      last_processed_commit_version: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      timestamp: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      triggered_update_progress: z
        .lazy(() => unmarshalSyncedTablePipelineProgressSchema)
        .optional(),
    })
    .transform(d => ({
      lastProcessedCommitVersion: d.last_processed_commit_version,
      timestamp: d.timestamp,
      triggeredUpdateProgress: d.triggered_update_progress,
    }));

export const marshalCreateCustomTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalCreateDatabaseCatalogSchema: z.ZodType = z
  .object({
    name: z.string(),
    databaseInstanceName: z.string(),
    databaseName: z.string(),
    createDatabaseIfNotExists: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    database_instance_name: d.databaseInstanceName,
    database_name: d.databaseName,
    create_database_if_not_exists: d.createDatabaseIfNotExists,
  }));

export const marshalCreateDatabaseInstanceSchema: z.ZodType = z
  .object({
    name: z.string(),
    capacity: z.string().optional(),
    stopped: z.boolean().optional(),
    nodeCount: z.number().optional(),
    enableReadableSecondaries: z.boolean().optional(),
    retentionWindowInDays: z.number().optional(),
    parentInstanceRef: z
      .lazy(() => marshalCreateDatabaseInstanceRefSchema)
      .optional(),
    enablePgNativeLogin: z.boolean().optional(),
    usagePolicyId: z.string().optional(),
    customTags: z.array(z.lazy(() => marshalCreateCustomTagSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    capacity: d.capacity,
    stopped: d.stopped,
    node_count: d.nodeCount,
    enable_readable_secondaries: d.enableReadableSecondaries,
    retention_window_in_days: d.retentionWindowInDays,
    parent_instance_ref: d.parentInstanceRef,
    enable_pg_native_login: d.enablePgNativeLogin,
    usage_policy_id: d.usagePolicyId,
    custom_tags: d.customTags,
  }));

export const marshalCreateDatabaseInstanceRefSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    lsn: z.string().optional(),
    branchTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    lsn: d.lsn,
    branch_time: d.branchTime,
  }));

export const marshalCreateDatabaseInstanceRoleSchema: z.ZodType = z
  .object({
    name: z.string(),
    identityType: z.string().optional(),
    membershipRole: z.string().optional(),
    attributes: z
      .lazy(() => marshalDatabaseInstanceRole_CreateAttributesSchema)
      .optional(),
    instanceName: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    identity_type: d.identityType,
    membership_role: d.membershipRole,
    attributes: d.attributes,
    instance_name: d.instanceName,
  }));

export const marshalCreateDatabaseTableSchema: z.ZodType = z
  .object({
    name: z.string(),
    databaseInstanceName: z.string().optional(),
    logicalDatabaseName: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    database_instance_name: d.databaseInstanceName,
    logical_database_name: d.logicalDatabaseName,
  }));

export const marshalCreateNewPipelineSpecSchema: z.ZodType = z
  .object({
    storageCatalog: z.string().optional(),
    storageSchema: z.string().optional(),
    budgetPolicyId: z.string().optional(),
  })
  .transform(d => ({
    storage_catalog: d.storageCatalog,
    storage_schema: d.storageSchema,
    budget_policy_id: d.budgetPolicyId,
  }));

export const marshalCreateSyncedDatabaseTableSchema: z.ZodType = z
  .object({
    name: z.string(),
    databaseInstanceName: z.string().optional(),
    logicalDatabaseName: z.string().optional(),
    spec: z.lazy(() => marshalCreateSyncedTableSpecSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    database_instance_name: d.databaseInstanceName,
    logical_database_name: d.logicalDatabaseName,
    spec: d.spec,
  }));

export const marshalCreateSyncedTableSpecSchema: z.ZodType = z
  .object({
    schedulingPolicy: z.string().optional(),
    sourceTableFullName: z.string().optional(),
    primaryKeyColumns: z.array(z.string()).optional(),
    timeseriesKey: z.string().optional(),
    existingPipelineId: z.string().optional(),
    createDatabaseObjectsIfMissing: z.boolean().optional(),
    newPipelineSpec: z
      .lazy(() => marshalCreateNewPipelineSpecSchema)
      .optional(),
    acceleratedSync: z.boolean().optional(),
    typeOverrides: z
      .array(z.lazy(() => marshalSyncedTableSpec_CreateTypeOverrideSchema))
      .optional(),
  })
  .transform(d => ({
    scheduling_policy: d.schedulingPolicy,
    source_table_full_name: d.sourceTableFullName,
    primary_key_columns: d.primaryKeyColumns,
    timeseries_key: d.timeseriesKey,
    existing_pipeline_id: d.existingPipelineId,
    create_database_objects_if_missing: d.createDatabaseObjectsIfMissing,
    new_pipeline_spec: d.newPipelineSpec,
    accelerated_sync: d.acceleratedSync,
    type_overrides: d.typeOverrides,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDatabaseInstanceRole_CreateAttributesSchema: z.ZodType = z
  .object({
    createdb: z.boolean().optional(),
    createrole: z.boolean().optional(),
    bypassrls: z.boolean().optional(),
  })
  .transform(d => ({
    createdb: d.createdb,
    createrole: d.createrole,
    bypassrls: d.bypassrls,
  }));

export const marshalGenerateDatabaseCredentialRequestSchema: z.ZodType = z
  .object({
    requestId: z.string().optional(),
    instanceNames: z.array(z.string()).optional(),
    claims: z.array(z.lazy(() => marshalRequestedClaimsSchema)).optional(),
  })
  .transform(d => ({
    request_id: d.requestId,
    instance_names: d.instanceNames,
    claims: d.claims,
  }));

export const marshalRequestedClaimsSchema: z.ZodType = z
  .object({
    permissionSet: z.string().optional(),
    resources: z.array(z.lazy(() => marshalRequestedResourceSchema)).optional(),
  })
  .transform(d => ({
    permission_set: d.permissionSet,
    resources: d.resources,
  }));

export const marshalRequestedResourceSchema: z.ZodType = z
  .object({
    resourceName: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('unspecifiedResourceName'),
          unspecifiedResourceName: z.string(),
        }),
        z.object({$case: z.literal('tableName'), tableName: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.resourceName?.$case === 'unspecifiedResourceName' && {
      unspecified_resource_name: d.resourceName.unspecifiedResourceName,
    }),
    ...(d.resourceName?.$case === 'tableName' && {
      table_name: d.resourceName.tableName,
    }),
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSyncedTableSpec_CreateTypeOverrideSchema: z.ZodType = z
  .object({
    columnName: z.string(),
    pgType: z.string(),
    size: z.number().optional(),
  })
  .transform(d => ({
    column_name: d.columnName,
    pg_type: d.pgType,
    size: d.size,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSyncedTableSpec_UpdateTypeOverrideSchema: z.ZodType = z
  .object({
    columnName: z.string().optional(),
    pgType: z.string().optional(),
    size: z.number().optional(),
  })
  .transform(d => ({
    column_name: d.columnName,
    pg_type: d.pgType,
    size: d.size,
  }));

export const marshalUpdateCustomTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalUpdateDatabaseCatalogSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    databaseInstanceName: z.string().optional(),
    databaseName: z.string().optional(),
    createDatabaseIfNotExists: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    database_instance_name: d.databaseInstanceName,
    database_name: d.databaseName,
    create_database_if_not_exists: d.createDatabaseIfNotExists,
  }));

export const marshalUpdateDatabaseInstanceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    capacity: z.string().optional(),
    stopped: z.boolean().optional(),
    nodeCount: z.number().optional(),
    enableReadableSecondaries: z.boolean().optional(),
    retentionWindowInDays: z.number().optional(),
    parentInstanceRef: z
      .lazy(() => marshalUpdateDatabaseInstanceRefSchema)
      .optional(),
    enablePgNativeLogin: z.boolean().optional(),
    usagePolicyId: z.string().optional(),
    customTags: z.array(z.lazy(() => marshalUpdateCustomTagSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    capacity: d.capacity,
    stopped: d.stopped,
    node_count: d.nodeCount,
    enable_readable_secondaries: d.enableReadableSecondaries,
    retention_window_in_days: d.retentionWindowInDays,
    parent_instance_ref: d.parentInstanceRef,
    enable_pg_native_login: d.enablePgNativeLogin,
    usage_policy_id: d.usagePolicyId,
    custom_tags: d.customTags,
  }));

export const marshalUpdateDatabaseInstanceRefSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    lsn: z.string().optional(),
    branchTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    lsn: d.lsn,
    branch_time: d.branchTime,
  }));

export const marshalUpdateNewPipelineSpecSchema: z.ZodType = z
  .object({
    storageCatalog: z.string().optional(),
    storageSchema: z.string().optional(),
    budgetPolicyId: z.string().optional(),
  })
  .transform(d => ({
    storage_catalog: d.storageCatalog,
    storage_schema: d.storageSchema,
    budget_policy_id: d.budgetPolicyId,
  }));

export const marshalUpdateSyncedDatabaseTableSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    databaseInstanceName: z.string().optional(),
    logicalDatabaseName: z.string().optional(),
    spec: z.lazy(() => marshalUpdateSyncedTableSpecSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    database_instance_name: d.databaseInstanceName,
    logical_database_name: d.logicalDatabaseName,
    spec: d.spec,
  }));

export const marshalUpdateSyncedTableSpecSchema: z.ZodType = z
  .object({
    schedulingPolicy: z.string().optional(),
    sourceTableFullName: z.string().optional(),
    primaryKeyColumns: z.array(z.string()).optional(),
    timeseriesKey: z.string().optional(),
    existingPipelineId: z.string().optional(),
    createDatabaseObjectsIfMissing: z.boolean().optional(),
    newPipelineSpec: z
      .lazy(() => marshalUpdateNewPipelineSpecSchema)
      .optional(),
    acceleratedSync: z.boolean().optional(),
    typeOverrides: z
      .array(z.lazy(() => marshalSyncedTableSpec_UpdateTypeOverrideSchema))
      .optional(),
  })
  .transform(d => ({
    scheduling_policy: d.schedulingPolicy,
    source_table_full_name: d.sourceTableFullName,
    primary_key_columns: d.primaryKeyColumns,
    timeseries_key: d.timeseriesKey,
    existing_pipeline_id: d.existingPipelineId,
    create_database_objects_if_missing: d.createDatabaseObjectsIfMissing,
    new_pipeline_spec: d.newPipelineSpec,
    accelerated_sync: d.acceleratedSync,
    type_overrides: d.typeOverrides,
  }));

const updateDatabaseCatalogFieldMaskSchema: FieldMaskSchema = {
  createDatabaseIfNotExists: {wire: 'create_database_if_not_exists'},
  databaseInstanceName: {wire: 'database_instance_name'},
  databaseName: {wire: 'database_name'},
  name: {wire: 'name'},
};

export function updateDatabaseCatalogFieldMask(
  ...paths: string[]
): FieldMask<UpdateDatabaseCatalog> {
  return FieldMask.build<UpdateDatabaseCatalog>(
    paths,
    updateDatabaseCatalogFieldMaskSchema
  );
}

const updateDatabaseInstanceFieldMaskSchema: FieldMaskSchema = {
  capacity: {wire: 'capacity'},
  customTags: {wire: 'custom_tags'},
  enablePgNativeLogin: {wire: 'enable_pg_native_login'},
  enableReadableSecondaries: {wire: 'enable_readable_secondaries'},
  name: {wire: 'name'},
  nodeCount: {wire: 'node_count'},
  parentInstanceRef: {
    wire: 'parent_instance_ref',
    children: () => updateDatabaseInstanceRefFieldMaskSchema,
  },
  retentionWindowInDays: {wire: 'retention_window_in_days'},
  stopped: {wire: 'stopped'},
  usagePolicyId: {wire: 'usage_policy_id'},
};

export function updateDatabaseInstanceFieldMask(
  ...paths: string[]
): FieldMask<UpdateDatabaseInstance> {
  return FieldMask.build<UpdateDatabaseInstance>(
    paths,
    updateDatabaseInstanceFieldMaskSchema
  );
}

const updateDatabaseInstanceRefFieldMaskSchema: FieldMaskSchema = {
  branchTime: {wire: 'branch_time'},
  lsn: {wire: 'lsn'},
  name: {wire: 'name'},
};

const updateNewPipelineSpecFieldMaskSchema: FieldMaskSchema = {
  budgetPolicyId: {wire: 'budget_policy_id'},
  storageCatalog: {wire: 'storage_catalog'},
  storageSchema: {wire: 'storage_schema'},
};

const updateSyncedDatabaseTableFieldMaskSchema: FieldMaskSchema = {
  databaseInstanceName: {wire: 'database_instance_name'},
  logicalDatabaseName: {wire: 'logical_database_name'},
  name: {wire: 'name'},
  spec: {wire: 'spec', children: () => updateSyncedTableSpecFieldMaskSchema},
};

export function updateSyncedDatabaseTableFieldMask(
  ...paths: string[]
): FieldMask<UpdateSyncedDatabaseTable> {
  return FieldMask.build<UpdateSyncedDatabaseTable>(
    paths,
    updateSyncedDatabaseTableFieldMaskSchema
  );
}

const updateSyncedTableSpecFieldMaskSchema: FieldMaskSchema = {
  acceleratedSync: {wire: 'accelerated_sync'},
  createDatabaseObjectsIfMissing: {wire: 'create_database_objects_if_missing'},
  existingPipelineId: {wire: 'existing_pipeline_id'},
  newPipelineSpec: {
    wire: 'new_pipeline_spec',
    children: () => updateNewPipelineSpecFieldMaskSchema,
  },
  primaryKeyColumns: {wire: 'primary_key_columns'},
  schedulingPolicy: {wire: 'scheduling_policy'},
  sourceTableFullName: {wire: 'source_table_full_name'},
  timeseriesKey: {wire: 'timeseries_key'},
  typeOverrides: {wire: 'type_overrides'},
};
