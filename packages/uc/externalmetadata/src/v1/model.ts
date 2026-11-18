// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SystemType = {
  SYSTEM_TYPE_UNSPECIFIED: 'SYSTEM_TYPE_UNSPECIFIED',
  OTHER: 'OTHER',
  TABLEAU: 'TABLEAU',
  POWER_BI: 'POWER_BI',
  LOOKER: 'LOOKER',
  KAFKA: 'KAFKA',
  SAP: 'SAP',
  ORACLE: 'ORACLE',
  SALESFORCE: 'SALESFORCE',
  WORKDAY: 'WORKDAY',
  MYSQL: 'MYSQL',
  POSTGRESQL: 'POSTGRESQL',
  MICROSOFT_SQL_SERVER: 'MICROSOFT_SQL_SERVER',
  SERVICENOW: 'SERVICENOW',
  AMAZON_REDSHIFT: 'AMAZON_REDSHIFT',
  AZURE_SYNAPSE: 'AZURE_SYNAPSE',
  SNOWFLAKE: 'SNOWFLAKE',
  GOOGLE_BIGQUERY: 'GOOGLE_BIGQUERY',
  MICROSOFT_FABRIC: 'MICROSOFT_FABRIC',
  MONGODB: 'MONGODB',
  TERADATA: 'TERADATA',
  CONFLUENT: 'CONFLUENT',
  DATABRICKS: 'DATABRICKS',
  STREAM_NATIVE: 'STREAM_NATIVE',
} as const;
export type SystemType =
  | (typeof SystemType)[keyof typeof SystemType]
  | (string & {});

export interface CreateExternalMetadataRequest {
  externalMetadata?: ExternalMetadata | undefined;
}

export interface DeleteExternalMetadataRequest {
  /** Name of the external metadata object to delete. */
  name?: string | undefined;
}

/**
 * Metadata about an object that lives outside of <Databricks>, such as a Kafka topic, a Tableau dashboard,
 * or a Salesforce table. An external metadata object is a Unity Catalog securable that can be the source or
 * the target of external lineage relationships, so that data flows into and out of <Databricks> appear in the
 * Unity Catalog lineage graph. See
 * [External lineage](https://docs.databricks.com/aws/en/data-governance/unity-catalog/external-lineage).
 */
export interface ExternalMetadata {
  /**
   * Name of the external metadata object. The name is unique within the metastore, must follow the
   * [Unity Catalog naming requirements](https://docs.databricks.com/aws/en/data-governance/unity-catalog/requirements#naming-requirements),
   * and is stored in lowercase. It cannot be changed after creation, and external lineage relationships
   * refer to the object by this name.
   */
  name?: string | undefined;
  /** Type of the external system that holds the object. Use `OTHER` for a system that is not in the list. */
  systemType?: SystemType | undefined;
  /**
   * Type of the object within the external system, such as a table, a report, or a dashboard. The value is
   * free-form text of at most 255 characters.
   */
  entityType?: string | undefined;
  /**
   * URL of the object in the external system. When set, lineage graph viewers can follow it to the external
   * asset. The URL must not exceed 2048 characters.
   */
  url?: string | undefined;
  /** User-provided free-form text description of the object. The description must not exceed 5000 characters. */
  description?: string | undefined;
  /**
   * Names of the columns of the object, used for column-level mappings in external lineage relationships.
   * Column names must be unique within the list, and the combined size of all column names is limited.
   */
  columns?: string[] | undefined;
  /**
   * Key-value properties attached to the object. Keys and values must be non-empty, and the combined length
   * of all keys and values must not exceed 5000 characters.
   */
  properties?: Record<string, string> | undefined;
  /**
   * Owner of the external metadata object. Defaults to the creator. To change the owner, send an update whose
   * update mask includes `owner`.
   */
  owner?: string | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this external metadata object was created. */
  createTime?: Temporal.Instant | undefined;
  /** Username of external metadata object creator. */
  createdBy?: string | undefined;
  /** Time at which this external metadata object was last modified. */
  updateTime?: Temporal.Instant | undefined;
  /** Username of user who last modified external metadata object. */
  updatedBy?: string | undefined;
  /** Unique identifier of the external metadata object. The ID is a UUID that the system assigns on creation. */
  id?: string | undefined;
}

export interface GetExternalMetadataRequest {
  /** Name of the external metadata object to get. */
  name?: string | undefined;
}

export interface ListExternalMetadataRequest {
  /**
   * Specifies the maximum number of external metadata objects to return in a single response.
   * The value must be less than or equal to 1000. Defaults to 1000 when omitted.
   */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListExternalMetadataResponseV2 {
  externalMetadata?: ExternalMetadata[] | undefined;
  nextPageToken?: string | undefined;
}

export interface UpdateExternalMetadataRequest {
  externalMetadata?: ExternalMetadata | undefined;
  /**
   * Comma-separated list of the fields to update, for example `description,properties`. Only the listed
   * fields change. The other fields keep their current values. The mask must not be empty.
   */
  updateMask?: FieldMask<ExternalMetadata> | undefined;
}

export const unmarshalExternalMetadataSchema: z.ZodType<ExternalMetadata> = z
  .object({
    name: z.string().optional(),
    system_type: z.string().optional(),
    entity_type: z.string().optional(),
    url: z.string().optional(),
    description: z.string().optional(),
    columns: z.array(z.string()).optional(),
    properties: z.record(z.string(), z.string()).optional(),
    owner: z.string().optional(),
    metastore_id: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    created_by: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updated_by: z.string().optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    systemType: d.system_type,
    entityType: d.entity_type,
    url: d.url,
    description: d.description,
    columns: d.columns,
    properties: d.properties,
    owner: d.owner,
    metastoreId: d.metastore_id,
    createTime: d.create_time,
    createdBy: d.created_by,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
    id: d.id,
  }));

export const unmarshalListExternalMetadataResponseV2Schema: z.ZodType<ListExternalMetadataResponseV2> =
  z
    .object({
      external_metadata: z
        .array(z.lazy(() => unmarshalExternalMetadataSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      externalMetadata: d.external_metadata,
      nextPageToken: d.next_page_token,
    }));

export const marshalExternalMetadataSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    systemType: z.string().optional(),
    entityType: z.string().optional(),
    url: z.string().optional(),
    description: z.string().optional(),
    columns: z.array(z.string()).optional(),
    properties: z.record(z.string(), z.string()).optional(),
    owner: z.string().optional(),
    metastoreId: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    createdBy: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.string().optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    system_type: d.systemType,
    entity_type: d.entityType,
    url: d.url,
    description: d.description,
    columns: d.columns,
    properties: d.properties,
    owner: d.owner,
    metastore_id: d.metastoreId,
    create_time: d.createTime,
    created_by: d.createdBy,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    id: d.id,
  }));

const externalMetadataFieldMaskSchema: FieldMaskSchema = {
  columns: {wire: 'columns'},
  createTime: {wire: 'create_time'},
  createdBy: {wire: 'created_by'},
  description: {wire: 'description'},
  entityType: {wire: 'entity_type'},
  id: {wire: 'id'},
  metastoreId: {wire: 'metastore_id'},
  name: {wire: 'name'},
  owner: {wire: 'owner'},
  properties: {wire: 'properties'},
  systemType: {wire: 'system_type'},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by'},
  url: {wire: 'url'},
};

export function externalMetadataFieldMask(
  ...paths: string[]
): FieldMask<ExternalMetadata> {
  return FieldMask.build<ExternalMetadata>(
    paths,
    externalMetadataFieldMaskSchema
  );
}
