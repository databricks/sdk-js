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

export interface ColumnRelationship {
  source?: string | undefined;
  target?: string | undefined;
}

export interface CreateExternalLineageRelationshipRequest {
  externalLineageRelationship?: CreateRequestExternalLineage | undefined;
}

export interface CreateRequestExternalLineage {
  /** Unique identifier of the external lineage relationship. */
  id?: string | undefined;
  /** Source object of the external lineage relationship. */
  source?: ExternalLineageRelationshipObject | undefined;
  /** Target object of the external lineage relationship. */
  target?: ExternalLineageRelationshipObject | undefined;
  /** List of column relationships between source and target objects. */
  columns?: ColumnRelationship[] | undefined;
  /** Key-value properties associated with the external lineage relationship. */
  properties?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateRequestExternalLineage_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface DeleteExternalLineageRelationshipRequest {
  externalLineageRelationship?: DeleteRequestExternalLineage | undefined;
}

export interface DeleteRequestExternalLineage {
  /** Unique identifier of the external lineage relationship. */
  id?: string | undefined;
  /** Source object of the external lineage relationship. */
  source?: ExternalLineageRelationshipObject | undefined;
  /** Target object of the external lineage relationship. */
  target?: ExternalLineageRelationshipObject | undefined;
  /** List of column relationships between source and target objects. */
  columns?: ColumnRelationship[] | undefined;
  /** Key-value properties associated with the external lineage relationship. */
  properties?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DeleteRequestExternalLineage_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
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

export interface ExternalLineageRelationship {
  /** Unique identifier of the external lineage relationship. */
  id?: string | undefined;
  /** Source object of the external lineage relationship. */
  source?: ExternalLineageRelationshipObject | undefined;
  /** Target object of the external lineage relationship. */
  target?: ExternalLineageRelationshipObject | undefined;
  /** List of column relationships between source and target objects. */
  columns?: ColumnRelationship[] | undefined;
  /** Key-value properties associated with the external lineage relationship. */
  properties?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ExternalLineageRelationship_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface ExternalLineageRelationshipExternalMetadata {
  name?: string | undefined;
}

export interface ExternalLineageRelationshipModelVersion {
  name?: string | undefined;
  version?: string | undefined;
}

export interface ExternalLineageRelationshipObject {
  tpe?:
    | {$case: 'table'; table: ExternalLineageRelationshipTable}
    | {$case: 'path'; path: ExternalLineageRelationshipPath}
    | {
        $case: 'modelVersion';
        modelVersion: ExternalLineageRelationshipModelVersion;
      }
    | {
        $case: 'externalMetadata';
        externalMetadata: ExternalLineageRelationshipExternalMetadata;
      }
    | undefined;
}

export interface ExternalLineageRelationshipPath {
  url?: string | undefined;
}

export interface ExternalLineageRelationshipTable {
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
  /** The lineage direction to filter on. */
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
  externalLineageRelationships?: ExternalLineageInfo[] | undefined;
  nextPageToken?: string | undefined;
}

export interface UpdateExternalLineageRelationshipRequest {
  externalLineageRelationship?: UpdateRequestExternalLineage | undefined;
  updateMask?: FieldMask<UpdateRequestExternalLineage> | undefined;
}

export interface UpdateRequestExternalLineage {
  /** Unique identifier of the external lineage relationship. */
  id?: string | undefined;
  /** Source object of the external lineage relationship. */
  source?: ExternalLineageRelationshipObject | undefined;
  /** Target object of the external lineage relationship. */
  target?: ExternalLineageRelationshipObject | undefined;
  /** List of column relationships between source and target objects. */
  columns?: ColumnRelationship[] | undefined;
  /** Key-value properties associated with the external lineage relationship. */
  properties?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateRequestExternalLineage_PropertiesEntry {
  key?: string | undefined;
  value?: string | undefined;
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
      table_info: z.lazy(() => unmarshalLineageTableInfoSchema).optional(),
      file_info: z.lazy(() => unmarshalLineageFileInfoSchema).optional(),
      model_info: z
        .lazy(() => unmarshalLineageModelVersionInfoSchema)
        .optional(),
      external_metadata_info: z
        .lazy(() => unmarshalLineageExternalMetadataInfoSchema)
        .optional(),
      external_lineage_info: z
        .lazy(() => unmarshalExternalLineageRelationshipSchema)
        .optional(),
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
        .optional(),
      target: z
        .lazy(() => unmarshalExternalLineageRelationshipObjectSchema)
        .optional(),
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
        .union([z.number(), z.bigint()])
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
