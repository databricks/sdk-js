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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Direction_LineageDirection = {
  LINEAGE_DIRECTION_UNSPECIFIED: 'LINEAGE_DIRECTION_UNSPECIFIED',
  UPSTREAM: 'UPSTREAM',
  DOWNSTREAM: 'DOWNSTREAM',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type Direction_LineageDirection =
  | (typeof Direction_LineageDirection)[keyof typeof Direction_LineageDirection]
  | (string & {});

/** Mapping from a column of the source object to a column of the target object. */
export interface ColumnRelationship {
  /** Name of the column in the source object. */
  source?: string | undefined;
  /** Name of the column in the target object. */
  target?: string | undefined;
}

export interface CreateExternalLineageRelationshipRequest {
  externalLineageRelationship?: CreateRequestExternalLineage | undefined;
}

/**
 * A lineage relationship between a source object and a target object, where at least one of the two is an
 * external metadata object. The other object can be a Unity Catalog table, a cloud storage path, a model
 * version, or another external metadata object. A relationship is identified by its source and target;
 * optional column mappings and key-value properties describe the data flow between them.
 */
export interface CreateRequestExternalLineage {
  /** Unique identifier of the external lineage relationship. */
  id?: string | undefined;
  /** Source object of the external lineage relationship. */
  source?: ExternalLineageRelationshipObject | undefined;
  /** Target object of the external lineage relationship. */
  target?: ExternalLineageRelationshipObject | undefined;
  /**
   * List of column relationships between source and target objects. The combined size of all source and
   * target column names is limited.
   */
  columns?: ColumnRelationship[] | undefined;
  /**
   * Key-value properties associated with the external lineage relationship. The combined length of all keys
   * and values must not exceed 5000 characters.
   */
  properties?: Record<string, string> | undefined;
}

export interface DeleteExternalLineageRelationshipRequest {
  /**
   * The relationship to delete, identified by its `source` and `target` objects. Since this field is a query
   * parameter, flatten the nested fields, for example
   * `external_lineage_relationship.source.table.name=main.sales.orders`.
   */
  externalLineageRelationship?: DeleteRequestExternalLineage | undefined;
}

/**
 * A lineage relationship between a source object and a target object, where at least one of the two is an
 * external metadata object. The other object can be a Unity Catalog table, a cloud storage path, a model
 * version, or another external metadata object. A relationship is identified by its source and target;
 * optional column mappings and key-value properties describe the data flow between them.
 */
export interface DeleteRequestExternalLineage {
  /** Unique identifier of the external lineage relationship. */
  id?: string | undefined;
  /** Source object of the external lineage relationship. */
  source?: ExternalLineageRelationshipObject | undefined;
  /** Target object of the external lineage relationship. */
  target?: ExternalLineageRelationshipObject | undefined;
  /**
   * List of column relationships between source and target objects. The combined size of all source and
   * target column names is limited.
   */
  columns?: ColumnRelationship[] | undefined;
  /**
   * Key-value properties associated with the external lineage relationship. The combined length of all keys
   * and values must not exceed 5000 characters.
   */
  properties?: Record<string, string> | undefined;
}

/** Represents the direction of lineage in a lineage event. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Direction {}

/** Lineage response containing lineage information of a data asset. */
export interface ExternalLineageInfo {
  /** Information about the table involved in the lineage relationship. */
  tableInfo?: LineageTableInfo | undefined;
  /** Information about the file involved in the lineage relationship. */
  fileInfo?: LineageFileInfo | undefined;
  /** Information about the model version involved in the lineage relationship. */
  modelInfo?: LineageModelVersionInfo | undefined;
  /** Information about external metadata involved in the lineage relationship. */
  externalMetadataInfo?: LineageExternalMetadataInfo | undefined;
  /** Information about the edge metadata of the external lineage relationship. */
  externalLineageInfo?: ExternalLineageRelationship | undefined;
}

/**
 * A lineage relationship between a source object and a target object, where at least one of the two is an
 * external metadata object. The other object can be a Unity Catalog table, a cloud storage path, a model
 * version, or another external metadata object. A relationship is identified by its source and target;
 * optional column mappings and key-value properties describe the data flow between them.
 */
export interface ExternalLineageRelationship {
  /** Unique identifier of the external lineage relationship. */
  id?: string | undefined;
  /** Source object of the external lineage relationship. */
  source?: ExternalLineageRelationshipObject | undefined;
  /** Target object of the external lineage relationship. */
  target?: ExternalLineageRelationshipObject | undefined;
  /**
   * List of column relationships between source and target objects. The combined size of all source and
   * target column names is limited.
   */
  columns?: ColumnRelationship[] | undefined;
  /**
   * Key-value properties associated with the external lineage relationship. The combined length of all keys
   * and values must not exceed 5000 characters.
   */
  properties?: Record<string, string> | undefined;
}

/** An external metadata object at one end of an external lineage relationship. */
export interface ExternalLineageRelationshipExternalMetadata {
  /** Name of the external metadata object. */
  name?: string | undefined;
}

/** A version of a Unity Catalog registered model at one end of an external lineage relationship. */
export interface ExternalLineageRelationshipModelVersion {
  /** Full name of the registered model, in the form `catalog.schema.model`. */
  name?: string | undefined;
  /** Version number of the model, as a string. */
  version?: string | undefined;
}

/** An object at one end of an external lineage relationship. Exactly one of the fields is set. */
export interface ExternalLineageRelationshipObject {
  tpe?:
    | {
        $case: 'table';
        /** A Unity Catalog table. */
        table: ExternalLineageRelationshipTable;
      }
    | {
        $case: 'path';
        /** A cloud storage path registered in Unity Catalog, i.e. under a table, volume, or external location. */
        path: ExternalLineageRelationshipPath;
      }
    | {
        $case: 'modelVersion';
        /** A version of a Unity Catalog registered model. */
        modelVersion: ExternalLineageRelationshipModelVersion;
      }
    | {
        $case: 'externalMetadata';
        /** An external metadata object registered in Unity Catalog. */
        externalMetadata: ExternalLineageRelationshipExternalMetadata;
      }
    | undefined;
}

/** A cloud storage path at one end of an external lineage relationship. */
export interface ExternalLineageRelationshipPath {
  /**
   * URL of the cloud storage path. The path must be registered in Unity Catalog, i.e. under a table, volume,
   * or external location.
   */
  url?: string | undefined;
}

/** A Unity Catalog table at one end of an external lineage relationship. */
export interface ExternalLineageRelationshipTable {
  /** Full name of the table, in the form `catalog.schema.table`. */
  name?: string | undefined;
}

/** Represents the external metadata object in the lineage event. */
export interface LineageExternalMetadataInfo {
  /** Name of the external metadata object. */
  name?: string | undefined;
  /** Type of external system. */
  systemType?: SystemType | undefined;
  /** Type of entity represented by the external metadata object. */
  entityType?: string | undefined;
  /** Timestamp of the lineage event. */
  eventTime?: Temporal.Instant | undefined;
}

/** Represents the path information in the lineage event. */
export interface LineageFileInfo {
  /** URL of the path. */
  path?: string | undefined;
  /** The full name of the securable on the path. */
  securableName?: string | undefined;
  /** The storage location associated with securable on the path. */
  storageLocation?: string | undefined;
  /** The securable type of the securable on the path. */
  securableType?: string | undefined;
  /** Timestamp of the lineage event. */
  eventTime?: Temporal.Instant | undefined;
}

/** Represents the model version information in the lineage event. */
export interface LineageModelVersionInfo {
  /** Name of the model. */
  modelName?: string | undefined;
  /** Version number of the model. */
  version?: bigint | undefined;
  /** Timestamp of the lineage event. */
  eventTime?: Temporal.Instant | undefined;
}

/** Represents the table information in the lineage event. */
export interface LineageTableInfo {
  /** Name of Table. */
  name?: string | undefined;
  /** Name of Catalog. */
  catalogName?: string | undefined;
  /** Name of Schema. */
  schemaName?: string | undefined;
  /** Timestamp of the lineage event. */
  eventTime?: Temporal.Instant | undefined;
}

export interface ListExternalLineageRelationshipsRequest {
  /**
   * The object to query external lineage relationships for.
   * Since this field is a query parameter, please flatten the nested fields. For example, if the object is a table, the query parameter should look like:
   * `object_info.table.name=main.sales.customers`
   */
  objectInfo?: ExternalLineageRelationshipObject | undefined;
  /**
   * Direction of the relationships to return, relative to `object_info`. `UPSTREAM` returns the relationships
   * in which the object is the target, so each result describes a source; `DOWNSTREAM` returns the
   * relationships in which the object is the source, so each result describes a target.
   */
  lineageDirection?: Direction_LineageDirection | undefined;
  /**
   * Specifies the maximum number of external lineage relationships to return in a single response.
   * The value must be less than or equal to 1000.
   */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListExternalLineageRelationshipsResponse {
  /**
   * Relationships that match the query. Each entry describes the object at the other end of the relationship
   * in one of `table_info`, `file_info`, `model_info`, or `external_metadata_info`, together with the
   * relationship itself in `external_lineage_info`.
   */
  externalLineageRelationships?: ExternalLineageInfo[] | undefined;
  /** Opaque token to retrieve the next page of results. Omitted when there are no more results. */
  nextPageToken?: string | undefined;
}

export interface UpdateExternalLineageRelationshipRequest {
  externalLineageRelationship?: UpdateRequestExternalLineage | undefined;
  /**
   * The fields of the relationship to update. The field mask must be a single string, with multiple fields
   * separated by commas (no spaces), for example `columns,properties`. The `source` and `target` identify the
   * relationship and cannot be changed.
   */
  updateMask?: FieldMask<UpdateRequestExternalLineage> | undefined;
}

/**
 * A lineage relationship between a source object and a target object, where at least one of the two is an
 * external metadata object. The other object can be a Unity Catalog table, a cloud storage path, a model
 * version, or another external metadata object. A relationship is identified by its source and target;
 * optional column mappings and key-value properties describe the data flow between them.
 */
export interface UpdateRequestExternalLineage {
  /** Unique identifier of the external lineage relationship. */
  id?: string | undefined;
  /** Source object of the external lineage relationship. */
  source?: ExternalLineageRelationshipObject | undefined;
  /** Target object of the external lineage relationship. */
  target?: ExternalLineageRelationshipObject | undefined;
  /**
   * List of column relationships between source and target objects. The combined size of all source and
   * target column names is limited.
   */
  columns?: ColumnRelationship[] | undefined;
  /**
   * Key-value properties associated with the external lineage relationship. The combined length of all keys
   * and values must not exceed 5000 characters.
   */
  properties?: Record<string, string> | undefined;
}

export const unmarshalColumnRelationshipSchema: z.ZodType<ColumnRelationship> =
  z
    .object({
      source: z.string().optional(),
      target: z.string().optional(),
    })
    .transform(d => ({
      source: d.source,
      target: d.target,
    }));

export const unmarshalExternalLineageInfoSchema: z.ZodType<ExternalLineageInfo> =
  z
    .object({
      table_info: z
        .lazy(() => unmarshalLineageTableInfoSchema)
        .nullish()
        .transform(v => v ?? undefined),
      file_info: z
        .lazy(() => unmarshalLineageFileInfoSchema)
        .nullish()
        .transform(v => v ?? undefined),
      model_info: z
        .lazy(() => unmarshalLineageModelVersionInfoSchema)
        .nullish()
        .transform(v => v ?? undefined),
      external_metadata_info: z
        .lazy(() => unmarshalLineageExternalMetadataInfoSchema)
        .nullish()
        .transform(v => v ?? undefined),
      external_lineage_info: z
        .lazy(() => unmarshalExternalLineageRelationshipSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      tableInfo: d.table_info,
      fileInfo: d.file_info,
      modelInfo: d.model_info,
      externalMetadataInfo: d.external_metadata_info,
      externalLineageInfo: d.external_lineage_info,
    }));

export const unmarshalExternalLineageRelationshipSchema: z.ZodType<ExternalLineageRelationship> =
  z
    .object({
      id: z.string().optional(),
      source: z
        .lazy(() => unmarshalExternalLineageRelationshipObjectSchema)
        .nullish()
        .transform(v => v ?? undefined),
      target: z
        .lazy(() => unmarshalExternalLineageRelationshipObjectSchema)
        .nullish()
        .transform(v => v ?? undefined),
      columns: z
        .array(z.lazy(() => unmarshalColumnRelationshipSchema))
        .optional(),
      properties: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      id: d.id,
      source: d.source,
      target: d.target,
      columns: d.columns,
      properties: d.properties,
    }));

export const unmarshalExternalLineageRelationshipExternalMetadataSchema: z.ZodType<ExternalLineageRelationshipExternalMetadata> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalExternalLineageRelationshipModelVersionSchema: z.ZodType<ExternalLineageRelationshipModelVersion> =
  z
    .object({
      name: z.string().optional(),
      version: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      version: d.version,
    }));

export const unmarshalExternalLineageRelationshipObjectSchema: z.ZodType<ExternalLineageRelationshipObject> =
  z
    .object({
      table: z
        .lazy(() => unmarshalExternalLineageRelationshipTableSchema)
        .optional(),
      path: z
        .lazy(() => unmarshalExternalLineageRelationshipPathSchema)
        .optional(),
      model_version: z
        .lazy(() => unmarshalExternalLineageRelationshipModelVersionSchema)
        .optional(),
      external_metadata: z
        .lazy(() => unmarshalExternalLineageRelationshipExternalMetadataSchema)
        .optional(),
    })
    .refine(
      d =>
        [d.table, d.path, d.model_version, d.external_metadata].filter(
          v => v !== undefined
        ).length <= 1,
      {
        message:
          'ExternalLineageRelationshipObject.Tpe: multiple oneof members set',
      }
    )
    .transform(d => ({
      tpe:
        d.table !== undefined
          ? {$case: 'table' as const, table: d.table}
          : d.path !== undefined
            ? {$case: 'path' as const, path: d.path}
            : d.model_version !== undefined
              ? {$case: 'modelVersion' as const, modelVersion: d.model_version}
              : d.external_metadata !== undefined
                ? {
                    $case: 'externalMetadata' as const,
                    externalMetadata: d.external_metadata,
                  }
                : undefined,
    }));

export const unmarshalExternalLineageRelationshipPathSchema: z.ZodType<ExternalLineageRelationshipPath> =
  z
    .object({
      url: z.string().optional(),
    })
    .transform(d => ({
      url: d.url,
    }));

export const unmarshalExternalLineageRelationshipTableSchema: z.ZodType<ExternalLineageRelationshipTable> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalLineageExternalMetadataInfoSchema: z.ZodType<LineageExternalMetadataInfo> =
  z
    .object({
      name: z.string().optional(),
      system_type: z.string().optional(),
      entity_type: z.string().optional(),
      event_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      systemType: d.system_type,
      entityType: d.entity_type,
      eventTime: d.event_time,
    }));

export const unmarshalLineageFileInfoSchema: z.ZodType<LineageFileInfo> = z
  .object({
    path: z.string().optional(),
    securable_name: z.string().optional(),
    storage_location: z.string().optional(),
    securable_type: z.string().optional(),
    event_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    path: d.path,
    securableName: d.securable_name,
    storageLocation: d.storage_location,
    securableType: d.securable_type,
    eventTime: d.event_time,
  }));

export const unmarshalLineageModelVersionInfoSchema: z.ZodType<LineageModelVersionInfo> =
  z
    .object({
      model_name: z.string().optional(),
      version: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      event_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      modelName: d.model_name,
      version: d.version,
      eventTime: d.event_time,
    }));

export const unmarshalLineageTableInfoSchema: z.ZodType<LineageTableInfo> = z
  .object({
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    event_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    eventTime: d.event_time,
  }));

export const unmarshalListExternalLineageRelationshipsResponseSchema: z.ZodType<ListExternalLineageRelationshipsResponse> =
  z
    .object({
      external_lineage_relationships: z
        .array(z.lazy(() => unmarshalExternalLineageInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      externalLineageRelationships: d.external_lineage_relationships,
      nextPageToken: d.next_page_token,
    }));

export const marshalColumnRelationshipSchema: z.ZodType = z
  .object({
    source: z.string().optional(),
    target: z.string().optional(),
  })
  .transform(d => ({
    source: d.source,
    target: d.target,
  }));

export const marshalCreateExternalLineageRelationshipRequestSchema: z.ZodType =
  z
    .object({
      externalLineageRelationship: z
        .lazy(() => marshalCreateRequestExternalLineageSchema)
        .optional(),
    })
    .transform(d => ({
      external_lineage_relationship: d.externalLineageRelationship,
    }));

export const marshalCreateRequestExternalLineageSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    source: z
      .lazy(() => marshalExternalLineageRelationshipObjectSchema)
      .optional(),
    target: z
      .lazy(() => marshalExternalLineageRelationshipObjectSchema)
      .optional(),
    columns: z.array(z.lazy(() => marshalColumnRelationshipSchema)).optional(),
    properties: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    source: d.source,
    target: d.target,
    columns: d.columns,
    properties: d.properties,
  }));

export const marshalDeleteExternalLineageRelationshipRequestSchema: z.ZodType =
  z
    .object({
      externalLineageRelationship: z
        .lazy(() => marshalDeleteRequestExternalLineageSchema)
        .optional(),
    })
    .transform(d => ({
      external_lineage_relationship: d.externalLineageRelationship,
    }));

export const marshalDeleteRequestExternalLineageSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    source: z
      .lazy(() => marshalExternalLineageRelationshipObjectSchema)
      .optional(),
    target: z
      .lazy(() => marshalExternalLineageRelationshipObjectSchema)
      .optional(),
    columns: z.array(z.lazy(() => marshalColumnRelationshipSchema)).optional(),
    properties: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    source: d.source,
    target: d.target,
    columns: d.columns,
    properties: d.properties,
  }));

export const marshalDirectionSchema: z.ZodType = z.object({});

export const marshalExternalLineageInfoSchema: z.ZodType = z
  .object({
    tableInfo: z.lazy(() => marshalLineageTableInfoSchema).optional(),
    fileInfo: z.lazy(() => marshalLineageFileInfoSchema).optional(),
    modelInfo: z.lazy(() => marshalLineageModelVersionInfoSchema).optional(),
    externalMetadataInfo: z
      .lazy(() => marshalLineageExternalMetadataInfoSchema)
      .optional(),
    externalLineageInfo: z
      .lazy(() => marshalExternalLineageRelationshipSchema)
      .optional(),
  })
  .transform(d => ({
    table_info: d.tableInfo,
    file_info: d.fileInfo,
    model_info: d.modelInfo,
    external_metadata_info: d.externalMetadataInfo,
    external_lineage_info: d.externalLineageInfo,
  }));

export const marshalExternalLineageRelationshipSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    source: z
      .lazy(() => marshalExternalLineageRelationshipObjectSchema)
      .optional(),
    target: z
      .lazy(() => marshalExternalLineageRelationshipObjectSchema)
      .optional(),
    columns: z.array(z.lazy(() => marshalColumnRelationshipSchema)).optional(),
    properties: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    source: d.source,
    target: d.target,
    columns: d.columns,
    properties: d.properties,
  }));

export const marshalExternalLineageRelationshipExternalMetadataSchema: z.ZodType =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const marshalExternalLineageRelationshipModelVersionSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
  }));

export const marshalExternalLineageRelationshipObjectSchema: z.ZodType = z
  .object({
    tpe: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('table'),
          table: z.lazy(() => marshalExternalLineageRelationshipTableSchema),
        }),
        z.object({
          $case: z.literal('path'),
          path: z.lazy(() => marshalExternalLineageRelationshipPathSchema),
        }),
        z.object({
          $case: z.literal('modelVersion'),
          modelVersion: z.lazy(
            () => marshalExternalLineageRelationshipModelVersionSchema
          ),
        }),
        z.object({
          $case: z.literal('externalMetadata'),
          externalMetadata: z.lazy(
            () => marshalExternalLineageRelationshipExternalMetadataSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.tpe?.$case === 'table' && {table: d.tpe.table}),
    ...(d.tpe?.$case === 'path' && {path: d.tpe.path}),
    ...(d.tpe?.$case === 'modelVersion' && {model_version: d.tpe.modelVersion}),
    ...(d.tpe?.$case === 'externalMetadata' && {
      external_metadata: d.tpe.externalMetadata,
    }),
  }));

export const marshalExternalLineageRelationshipPathSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
  })
  .transform(d => ({
    url: d.url,
  }));

export const marshalExternalLineageRelationshipTableSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalLineageExternalMetadataInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    systemType: z.string().optional(),
    entityType: z.string().optional(),
    eventTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    system_type: d.systemType,
    entity_type: d.entityType,
    event_time: d.eventTime,
  }));

export const marshalLineageFileInfoSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    securableName: z.string().optional(),
    storageLocation: z.string().optional(),
    securableType: z.string().optional(),
    eventTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    path: d.path,
    securable_name: d.securableName,
    storage_location: d.storageLocation,
    securable_type: d.securableType,
    event_time: d.eventTime,
  }));

export const marshalLineageModelVersionInfoSchema: z.ZodType = z
  .object({
    modelName: z.string().optional(),
    version: z.bigint().optional(),
    eventTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    model_name: d.modelName,
    version: d.version,
    event_time: d.eventTime,
  }));

export const marshalLineageTableInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    eventTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    event_time: d.eventTime,
  }));

export const marshalListExternalLineageRelationshipsRequestSchema: z.ZodType = z
  .object({
    objectInfo: z
      .lazy(() => marshalExternalLineageRelationshipObjectSchema)
      .optional(),
    lineageDirection: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    object_info: d.objectInfo,
    lineage_direction: d.lineageDirection,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListExternalLineageRelationshipsResponseSchema: z.ZodType =
  z
    .object({
      externalLineageRelationships: z
        .array(z.lazy(() => marshalExternalLineageInfoSchema))
        .optional(),
      nextPageToken: z.string().optional(),
    })
    .transform(d => ({
      external_lineage_relationships: d.externalLineageRelationships,
      next_page_token: d.nextPageToken,
    }));

export const marshalUpdateExternalLineageRelationshipRequestSchema: z.ZodType =
  z
    .object({
      externalLineageRelationship: z
        .lazy(() => marshalUpdateRequestExternalLineageSchema)
        .optional(),
      updateMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      external_lineage_relationship: d.externalLineageRelationship,
      update_mask: d.updateMask,
    }));

export const marshalUpdateRequestExternalLineageSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    source: z
      .lazy(() => marshalExternalLineageRelationshipObjectSchema)
      .optional(),
    target: z
      .lazy(() => marshalExternalLineageRelationshipObjectSchema)
      .optional(),
    columns: z.array(z.lazy(() => marshalColumnRelationshipSchema)).optional(),
    properties: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    source: d.source,
    target: d.target,
    columns: d.columns,
    properties: d.properties,
  }));

const externalLineageRelationshipExternalMetadataFieldMaskSchema: FieldMaskSchema =
  {
    name: {wire: 'name'},
  };

const externalLineageRelationshipModelVersionFieldMaskSchema: FieldMaskSchema =
  {
    name: {wire: 'name'},
    version: {wire: 'version'},
  };

const externalLineageRelationshipObjectFieldMaskSchema: FieldMaskSchema = {
  externalMetadata: {
    wire: 'external_metadata',
    children: () => externalLineageRelationshipExternalMetadataFieldMaskSchema,
  },
  modelVersion: {
    wire: 'model_version',
    children: () => externalLineageRelationshipModelVersionFieldMaskSchema,
  },
  path: {
    wire: 'path',
    children: () => externalLineageRelationshipPathFieldMaskSchema,
  },
  table: {
    wire: 'table',
    children: () => externalLineageRelationshipTableFieldMaskSchema,
  },
};

const externalLineageRelationshipPathFieldMaskSchema: FieldMaskSchema = {
  url: {wire: 'url'},
};

const externalLineageRelationshipTableFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

const updateRequestExternalLineageFieldMaskSchema: FieldMaskSchema = {
  columns: {wire: 'columns'},
  id: {wire: 'id'},
  properties: {wire: 'properties'},
  source: {
    wire: 'source',
    children: () => externalLineageRelationshipObjectFieldMaskSchema,
  },
  target: {
    wire: 'target',
    children: () => externalLineageRelationshipObjectFieldMaskSchema,
  },
};

export function updateRequestExternalLineageFieldMask(
  ...paths: string[]
): FieldMask<UpdateRequestExternalLineage> {
  return FieldMask.build<UpdateRequestExternalLineage>(
    paths,
    updateRequestExternalLineageFieldMaskSchema
  );
}
