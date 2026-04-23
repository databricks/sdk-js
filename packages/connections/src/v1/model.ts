// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Next Id: 77 */
export enum ConnectionType {
  UNKNOWN_CONNECTION_TYPE = 'UNKNOWN_CONNECTION_TYPE',
  MYSQL = 'MYSQL',
  POSTGRESQL = 'POSTGRESQL',
  SNOWFLAKE = 'SNOWFLAKE',
  REDSHIFT = 'REDSHIFT',
  SQLDW = 'SQLDW',
  SQLSERVER = 'SQLSERVER',
  DATABRICKS = 'DATABRICKS',
  SALESFORCE = 'SALESFORCE',
  BIGQUERY = 'BIGQUERY',
  WORKDAY_RAAS = 'WORKDAY_RAAS',
  HIVE_METASTORE = 'HIVE_METASTORE',
  GA4_RAW_DATA = 'GA4_RAW_DATA',
  SERVICENOW = 'SERVICENOW',
  SALESFORCE_DATA_CLOUD = 'SALESFORCE_DATA_CLOUD',
  GLUE = 'GLUE',
  ORACLE = 'ORACLE',
  PALANTIR = 'PALANTIR',
  TERADATA = 'TERADATA',
  HTTP = 'HTTP',
  POWER_BI = 'POWER_BI',
  BIGLAKE = 'BIGLAKE',
  GOOGLE_CLOUD_LAKEHOUSE = 'GOOGLE_CLOUD_LAKEHOUSE',
  RABBITMQ = 'RABBITMQ',
}

/** Next Id: 18 */
export enum CredentialType {
  UNKNOWN_CREDENTIAL_TYPE = 'UNKNOWN_CREDENTIAL_TYPE',
  USERNAME_PASSWORD = 'USERNAME_PASSWORD',
  OAUTH_U2M = 'OAUTH_U2M',
  OAUTH_M2M = 'OAUTH_M2M',
  OAUTH_REFRESH_TOKEN = 'OAUTH_REFRESH_TOKEN',
  OAUTH_ACCESS_TOKEN = 'OAUTH_ACCESS_TOKEN',
  OAUTH_RESOURCE_OWNER_PASSWORD = 'OAUTH_RESOURCE_OWNER_PASSWORD',
  SERVICE_CREDENTIAL = 'SERVICE_CREDENTIAL',
  BEARER_TOKEN = 'BEARER_TOKEN',
  OIDC_TOKEN = 'OIDC_TOKEN',
  PEM_PRIVATE_KEY = 'PEM_PRIVATE_KEY',
  OAUTH_U2M_MAPPING = 'OAUTH_U2M_MAPPING',
  ANY_STATIC_CREDENTIAL = 'ANY_STATIC_CREDENTIAL',
  OAUTH_MTLS = 'OAUTH_MTLS',
  SSWS_TOKEN = 'SSWS_TOKEN',
  EDGEGRID_AKAMAI = 'EDGEGRID_AKAMAI',
  OAUTH_GOOGLE_SERVICE_ACCOUNT = 'OAUTH_GOOGLE_SERVICE_ACCOUNT',
  OAUTH_DCR = 'OAUTH_DCR',
}

/** The type of Unity Catalog securable. */
export enum SecurableType {
  CATALOG = 'CATALOG',
  SCHEMA = 'SCHEMA',
  TABLE = 'TABLE',
  STORAGE_CREDENTIAL = 'STORAGE_CREDENTIAL',
  EXTERNAL_LOCATION = 'EXTERNAL_LOCATION',
  FUNCTION = 'FUNCTION',
  SHARE = 'SHARE',
  PROVIDER = 'PROVIDER',
  RECIPIENT = 'RECIPIENT',
  CLEAN_ROOM = 'CLEAN_ROOM',
  METASTORE = 'METASTORE',
  PIPELINE = 'PIPELINE',
  VOLUME = 'VOLUME',
  CONNECTION = 'CONNECTION',
  CREDENTIAL = 'CREDENTIAL',
  EXTERNAL_METADATA = 'EXTERNAL_METADATA',
  /** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */
  STAGING_TABLE = 'STAGING_TABLE',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ProvisioningInfo_State {
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  PROVISIONING = 'PROVISIONING',
  ACTIVE = 'ACTIVE',
  FAILED = 'FAILED',
  DELETING = 'DELETING',
  UPDATING = 'UPDATING',
  DEGRADED = 'DEGRADED',
}

export interface ConnectionInfo {
  /** Name of the connection. */
  name?: string | undefined;
  /** The type of connection. */
  connectionType?: ConnectionType | undefined;
  /** Username of current owner of the connection. */
  owner?: string | undefined;
  /** If the connection is read only. */
  readOnly?: boolean | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** [Create,Update:OPT] Connection environment settings as EnvironmentSettings object. */
  environmentSettings?: EnvironmentSettings | undefined;
  /** Full name of connection. */
  fullName?: string | undefined;
  /** URL of the remote data source, extracted from options. */
  url?: string | undefined;
  /** The type of credential. */
  credentialType?: CredentialType | undefined;
  /** Unique identifier of the Connection. */
  connectionId?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this connection was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of connection creator. */
  createdBy?: string | undefined;
  /** Time at which this connection was updated, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified connection. */
  updatedBy?: string | undefined;
  securableType?: SecurableType | undefined;
  provisioningInfo?: ProvisioningInfo | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
  /**
   * A map of option names to UC Secret references. Keys are connection option names
   * (same as in OptionsKVPairs) and values are UC Secret fully qualified names.
   */
  secrets?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ConnectionInfo_OptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ConnectionInfo_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ConnectionInfo_SecretsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface CreateConnection {
  /**
   * Parent schema for schema-level connections, in format "schemas/{catalog}.{schema}".
   * Absent for metastore-level (L1) connections.
   */
  parent?: string | undefined;
  /** Name of the connection. */
  name?: string | undefined;
  /** The type of connection. */
  connectionType?: ConnectionType | undefined;
  /** Username of current owner of the connection. */
  owner?: string | undefined;
  /** If the connection is read only. */
  readOnly?: boolean | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** [Create,Update:OPT] Connection environment settings as EnvironmentSettings object. */
  environmentSettings?: EnvironmentSettings | undefined;
  /** Full name of connection. */
  fullName?: string | undefined;
  /** URL of the remote data source, extracted from options. */
  url?: string | undefined;
  /** The type of credential. */
  credentialType?: CredentialType | undefined;
  /** Unique identifier of the Connection. */
  connectionId?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this connection was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of connection creator. */
  createdBy?: string | undefined;
  /** Time at which this connection was updated, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified connection. */
  updatedBy?: string | undefined;
  securableType?: SecurableType | undefined;
  provisioningInfo?: ProvisioningInfo | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
  /**
   * A map of option names to UC Secret references. Keys are connection option names
   * (same as in OptionsKVPairs) and values are UC Secret fully qualified names.
   */
  secrets?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateConnection_OptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateConnection_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateConnection_SecretsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface DeleteConnection {
  /** The name of the connection to be deleted. */
  nameArg?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteConnection_Response {}

export interface EnvironmentSettings {
  javaDependencies?: string[] | undefined;
  environmentVersion?: string | undefined;
}

export interface GetConnection {
  /** Name of the connection. */
  nameArg?: string | undefined;
}

export interface ListConnections {
  /**
   * Maximum number of connections to return.
   * - If not set, all connections are returned (not recommended).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
  /** Optional. Parent schema filter for listing schema-level connections, in format "schemas/{catalog}.{schema}". */
  parent?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListConnections_Response {
  /** An array of connection information objects. */
  connections?: ConnectionInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

/** Status of an asynchronously provisioned resource. */
export interface ProvisioningInfo {
  /** The provisioning state of the resource. */
  state?: ProvisioningInfo_State | undefined;
}

export interface UpdateConnection {
  /** Name of the connection. */
  nameArg?: string | undefined;
  /** New name for the connection. */
  newName?: string | undefined;
  /** Name of the connection. */
  name?: string | undefined;
  /** The type of connection. */
  connectionType?: ConnectionType | undefined;
  /** Username of current owner of the connection. */
  owner?: string | undefined;
  /** If the connection is read only. */
  readOnly?: boolean | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** [Create,Update:OPT] Connection environment settings as EnvironmentSettings object. */
  environmentSettings?: EnvironmentSettings | undefined;
  /** Full name of connection. */
  fullName?: string | undefined;
  /** URL of the remote data source, extracted from options. */
  url?: string | undefined;
  /** The type of credential. */
  credentialType?: CredentialType | undefined;
  /** Unique identifier of the Connection. */
  connectionId?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this connection was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of connection creator. */
  createdBy?: string | undefined;
  /** Time at which this connection was updated, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified connection. */
  updatedBy?: string | undefined;
  securableType?: SecurableType | undefined;
  provisioningInfo?: ProvisioningInfo | undefined;
  /** A map of key-value properties attached to the securable. */
  options?: Record<string, string> | undefined;
  /**
   * A map of option names to UC Secret references. Keys are connection option names
   * (same as in OptionsKVPairs) and values are UC Secret fully qualified names.
   */
  secrets?: Record<string, string> | undefined;
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateConnection_OptionsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateConnection_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateConnection_SecretsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export const unmarshalConnectionInfoSchema: z.ZodType<ConnectionInfo> = z
  .object({
    name: z.string().optional(),
    connection_type: z.enum(ConnectionType).optional(),
    owner: z.string().optional(),
    read_only: z.boolean().optional(),
    comment: z.string().optional(),
    environment_settings: z
      .lazy(() => unmarshalEnvironmentSettingsSchema)
      .optional(),
    full_name: z.string().optional(),
    url: z.string().optional(),
    credential_type: z.enum(CredentialType).optional(),
    connection_id: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    securable_type: z.enum(SecurableType).optional(),
    provisioning_info: z.lazy(() => unmarshalProvisioningInfoSchema).optional(),
    options: z.record(z.string(), z.string()).optional(),
    secrets: z.record(z.string(), z.string()).optional(),
    properties: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    connectionType: d.connection_type,
    owner: d.owner,
    readOnly: d.read_only,
    comment: d.comment,
    environmentSettings: d.environment_settings,
    fullName: d.full_name,
    url: d.url,
    credentialType: d.credential_type,
    connectionId: d.connection_id,
    metastoreId: d.metastore_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    securableType: d.securable_type,
    provisioningInfo: d.provisioning_info,
    options: d.options,
    secrets: d.secrets,
    properties: d.properties,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteConnection_ResponseSchema: z.ZodType<DeleteConnection_Response> =
  z.object({});

export const unmarshalEnvironmentSettingsSchema: z.ZodType<EnvironmentSettings> =
  z
    .object({
      java_dependencies: z.array(z.string()).optional(),
      environment_version: z.string().optional(),
    })
    .transform(d => ({
      javaDependencies: d.java_dependencies,
      environmentVersion: d.environment_version,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListConnections_ResponseSchema: z.ZodType<ListConnections_Response> =
  z
    .object({
      connections: z
        .array(z.lazy(() => unmarshalConnectionInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      connections: d.connections,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalProvisioningInfoSchema: z.ZodType<ProvisioningInfo> = z
  .object({
    state: z.enum(ProvisioningInfo_State).optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const marshalCreateConnectionSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
    name: z.string().optional(),
    connectionType: z.enum(ConnectionType).optional(),
    owner: z.string().optional(),
    readOnly: z.boolean().optional(),
    comment: z.string().optional(),
    environmentSettings: z
      .lazy(() => marshalEnvironmentSettingsSchema)
      .optional(),
    fullName: z.string().optional(),
    url: z.string().optional(),
    credentialType: z.enum(CredentialType).optional(),
    connectionId: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    securableType: z.enum(SecurableType).optional(),
    provisioningInfo: z.lazy(() => marshalProvisioningInfoSchema).optional(),
    options: z.record(z.string(), z.string()).optional(),
    secrets: z.record(z.string(), z.string()).optional(),
    properties: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    parent: d.parent,
    name: d.name,
    connection_type: d.connectionType,
    owner: d.owner,
    read_only: d.readOnly,
    comment: d.comment,
    environment_settings: d.environmentSettings,
    full_name: d.fullName,
    url: d.url,
    credential_type: d.credentialType,
    connection_id: d.connectionId,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    securable_type: d.securableType,
    provisioning_info: d.provisioningInfo,
    options: d.options,
    secrets: d.secrets,
    properties: d.properties,
  }));

export const marshalEnvironmentSettingsSchema: z.ZodType = z
  .object({
    javaDependencies: z.array(z.string()).optional(),
    environmentVersion: z.string().optional(),
  })
  .transform(d => ({
    java_dependencies: d.javaDependencies,
    environment_version: d.environmentVersion,
  }));

export const marshalProvisioningInfoSchema: z.ZodType = z
  .object({
    state: z.enum(ProvisioningInfo_State).optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const marshalUpdateConnectionSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    newName: z.string().optional(),
    name: z.string().optional(),
    connectionType: z.enum(ConnectionType).optional(),
    owner: z.string().optional(),
    readOnly: z.boolean().optional(),
    comment: z.string().optional(),
    environmentSettings: z
      .lazy(() => marshalEnvironmentSettingsSchema)
      .optional(),
    fullName: z.string().optional(),
    url: z.string().optional(),
    credentialType: z.enum(CredentialType).optional(),
    connectionId: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    securableType: z.enum(SecurableType).optional(),
    provisioningInfo: z.lazy(() => marshalProvisioningInfoSchema).optional(),
    options: z.record(z.string(), z.string()).optional(),
    secrets: z.record(z.string(), z.string()).optional(),
    properties: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    new_name: d.newName,
    name: d.name,
    connection_type: d.connectionType,
    owner: d.owner,
    read_only: d.readOnly,
    comment: d.comment,
    environment_settings: d.environmentSettings,
    full_name: d.fullName,
    url: d.url,
    credential_type: d.credentialType,
    connection_id: d.connectionId,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    securable_type: d.securableType,
    provisioning_info: d.provisioningInfo,
    options: d.options,
    secrets: d.secrets,
    properties: d.properties,
  }));
