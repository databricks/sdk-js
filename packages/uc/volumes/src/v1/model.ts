// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SseEncryptionAlgorithm = {
  SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED: 'SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED',
  AWS_SSE_S3: 'AWS_SSE_S3',
  AWS_SSE_KMS: 'AWS_SSE_KMS',
} as const;
export type SseEncryptionAlgorithm =
  | (typeof SseEncryptionAlgorithm)[keyof typeof SseEncryptionAlgorithm]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const VolumeType = {
  MANAGED: 'MANAGED',
  EXTERNAL: 'EXTERNAL',
} as const;
export type VolumeType =
  | (typeof VolumeType)[keyof typeof VolumeType]
  | (string & {});

export interface CreateVolumeRequest {
  /** The name of the volume */
  name?: string | undefined;
  /** The name of the catalog where the schema and the volume are */
  catalogName?: string | undefined;
  /** The name of the schema where the volume is */
  schemaName?: string | undefined;
  /**
   * The type of the volume. An external volume is located in the specified external location.
   * A managed volume is located in the default location which is specified by the parent schema, or the parent catalog, or the Metastore.
   * [Learn more](https://docs.databricks.com/aws/en/volumes/managed-vs-external)
   */
  volumeType?: VolumeType | undefined;
  /** The storage location on the cloud */
  storageLocation?: string | undefined;
  /** The identifier of the user who owns the volume */
  owner?: string | undefined;
  /** The comment attached to the volume */
  comment?: string | undefined;
  /** The three-level (fully qualified) name of the volume */
  fullName?: string | undefined;
  /** The unique identifier of the volume */
  volumeId?: string | undefined;
  /** The unique identifier of the metastore */
  metastoreId?: string | undefined;
  createdAt?: bigint | undefined;
  /** The identifier of the user who created the volume */
  createdBy?: string | undefined;
  updatedAt?: bigint | undefined;
  /** The identifier of the user who updated the volume last time */
  updatedBy?: string | undefined;
  /** The AWS access point to use when accesing s3 for this external location. */
  accessPoint?: string | undefined;
  encryptionDetails?: EncryptionDetails | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

export interface DeleteVolumeRequest {
  /** The three-level (fully qualified) name of the volume */
  fullNameArg: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteVolumeResponse {}

/** Encryption options that apply to clients connecting to cloud storage. */
export interface EncryptionDetails {
  encryptionDetailsType?:
    | {
        $case: 'sseEncryptionDetails';
        /** Server-Side Encryption properties for clients communicating with AWS s3. */
        sseEncryptionDetails: SseEncryptionDetails;
      }
    | undefined;
}

export interface GetVolumeRequest {
  /** The three-level (fully qualified) name of the volume */
  fullNameArg: string;
  /** Whether to include volumes in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface ListVolumesRequest {
  /** The identifier of the catalog */
  catalogName: string;
  /** The identifier of the schema */
  schemaName: string;
  /** Whether to include volumes in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
  /**
   * Maximum number of volumes to return (page length).
   *
   * If not set, the page length is set to a server configured value (10000, as of 1/29/2024).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value (10000, as of 1/29/2024);
   * - when set to 0, the page length is set to a server configured value (10000, as of 1/29/2024) (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   *
   * Note: this parameter controls only the maximum number of volumes to return. The actual number of volumes returned in a page
   * may be smaller than this value, including 0, even if there are more pages.
   */
  maxResults?: number | undefined;
  /** Opaque token returned by a previous request. It must be included in the request to retrieve the next page of results (pagination). */
  pageToken?: string | undefined;
}

export interface ListVolumesResponse {
  volumes?: VolumeInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request to retrieve the next page of results.
   */
  nextPageToken?: string | undefined;
}

/** Server-Side Encryption properties for clients communicating with AWS s3. */
export interface SseEncryptionDetails {
  /** Sets the value of the 'x-amz-server-side-encryption' header in S3 request. */
  algorithm?: SseEncryptionAlgorithm | undefined;
  /**
   * Optional. The ARN of the SSE-KMS key used with the S3 location, when algorithm = "SSE-KMS".
   * Sets the value of the 'x-amz-server-side-encryption-aws-kms-key-id' header.
   */
  awsKmsKeyArn?: string | undefined;
}

export interface UpdateVolumeRequest {
  /** The three-level (fully qualified) name of the volume */
  fullNameArg: string;
  /** New name for the volume. */
  newName?: string | undefined;
  /** The name of the volume */
  name?: string | undefined;
  /** The name of the catalog where the schema and the volume are */
  catalogName?: string | undefined;
  /** The name of the schema where the volume is */
  schemaName?: string | undefined;
  /**
   * The type of the volume. An external volume is located in the specified external location.
   * A managed volume is located in the default location which is specified by the parent schema, or the parent catalog, or the Metastore.
   * [Learn more](https://docs.databricks.com/aws/en/volumes/managed-vs-external)
   */
  volumeType?: VolumeType | undefined;
  /** The storage location on the cloud */
  storageLocation?: string | undefined;
  /** The identifier of the user who owns the volume */
  owner?: string | undefined;
  /** The comment attached to the volume */
  comment?: string | undefined;
  /** The three-level (fully qualified) name of the volume */
  fullName?: string | undefined;
  /** The unique identifier of the volume */
  volumeId?: string | undefined;
  /** The unique identifier of the metastore */
  metastoreId?: string | undefined;
  createdAt?: bigint | undefined;
  /** The identifier of the user who created the volume */
  createdBy?: string | undefined;
  updatedAt?: bigint | undefined;
  /** The identifier of the user who updated the volume last time */
  updatedBy?: string | undefined;
  /** The AWS access point to use when accesing s3 for this external location. */
  accessPoint?: string | undefined;
  encryptionDetails?: EncryptionDetails | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

export interface VolumeInfo {
  /** The name of the volume */
  name?: string | undefined;
  /** The name of the catalog where the schema and the volume are */
  catalogName?: string | undefined;
  /** The name of the schema where the volume is */
  schemaName?: string | undefined;
  /**
   * The type of the volume. An external volume is located in the specified external location.
   * A managed volume is located in the default location which is specified by the parent schema, or the parent catalog, or the Metastore.
   * [Learn more](https://docs.databricks.com/aws/en/volumes/managed-vs-external)
   */
  volumeType?: VolumeType | undefined;
  /** The storage location on the cloud */
  storageLocation?: string | undefined;
  /** The identifier of the user who owns the volume */
  owner?: string | undefined;
  /** The comment attached to the volume */
  comment?: string | undefined;
  /** The three-level (fully qualified) name of the volume */
  fullName?: string | undefined;
  /** The unique identifier of the volume */
  volumeId?: string | undefined;
  /** The unique identifier of the metastore */
  metastoreId?: string | undefined;
  createdAt?: bigint | undefined;
  /** The identifier of the user who created the volume */
  createdBy?: string | undefined;
  updatedAt?: bigint | undefined;
  /** The identifier of the user who updated the volume last time */
  updatedBy?: string | undefined;
  /** The AWS access point to use when accesing s3 for this external location. */
  accessPoint?: string | undefined;
  encryptionDetails?: EncryptionDetails | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

export const unmarshalDeleteVolumeResponseSchema: z.ZodType<DeleteVolumeResponse> =
  z.object({});

export const unmarshalEncryptionDetailsSchema: z.ZodType<EncryptionDetails> = z
  .object({
    sse_encryption_details: z
      .lazy(() => unmarshalSseEncryptionDetailsSchema)
      .optional(),
  })
  .transform(d => ({
    encryptionDetailsType:
      d.sse_encryption_details !== undefined
        ? {
            $case: 'sseEncryptionDetails' as const,
            sseEncryptionDetails: d.sse_encryption_details,
          }
        : undefined,
  }));

export const unmarshalListVolumesResponseSchema: z.ZodType<ListVolumesResponse> =
  z
    .object({
      volumes: z.array(z.lazy(() => unmarshalVolumeInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      volumes: d.volumes,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSseEncryptionDetailsSchema: z.ZodType<SseEncryptionDetails> =
  z
    .object({
      algorithm: z.string().optional(),
      aws_kms_key_arn: z.string().optional(),
    })
    .transform(d => ({
      algorithm: d.algorithm,
      awsKmsKeyArn: d.aws_kms_key_arn,
    }));

export const unmarshalVolumeInfoSchema: z.ZodType<VolumeInfo> = z
  .object({
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    volume_type: z.string().optional(),
    storage_location: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    full_name: z.string().optional(),
    volume_id: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z.string().optional(),
    updated_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z.string().optional(),
    access_point: z.string().optional(),
    encryption_details: z
      .lazy(() => unmarshalEncryptionDetailsSchema)
      .optional(),
    browse_only: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    volumeType: d.volume_type,
    storageLocation: d.storage_location,
    owner: d.owner,
    comment: d.comment,
    fullName: d.full_name,
    volumeId: d.volume_id,
    metastoreId: d.metastore_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    accessPoint: d.access_point,
    encryptionDetails: d.encryption_details,
    browseOnly: d.browse_only,
  }));

export const marshalCreateVolumeRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    volumeType: z.string().optional(),
    storageLocation: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    fullName: z.string().optional(),
    volumeId: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    accessPoint: z.string().optional(),
    encryptionDetails: z.lazy(() => marshalEncryptionDetailsSchema).optional(),
    browseOnly: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    volume_type: d.volumeType,
    storage_location: d.storageLocation,
    owner: d.owner,
    comment: d.comment,
    full_name: d.fullName,
    volume_id: d.volumeId,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    access_point: d.accessPoint,
    encryption_details: d.encryptionDetails,
    browse_only: d.browseOnly,
  }));

export const marshalEncryptionDetailsSchema: z.ZodType = z
  .object({
    encryptionDetailsType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('sseEncryptionDetails'),
          sseEncryptionDetails: z.lazy(() => marshalSseEncryptionDetailsSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.encryptionDetailsType?.$case === 'sseEncryptionDetails' && {
      sse_encryption_details: d.encryptionDetailsType.sseEncryptionDetails,
    }),
  }));

export const marshalSseEncryptionDetailsSchema: z.ZodType = z
  .object({
    algorithm: z.string().optional(),
    awsKmsKeyArn: z.string().optional(),
  })
  .transform(d => ({
    algorithm: d.algorithm,
    aws_kms_key_arn: d.awsKmsKeyArn,
  }));

export const marshalUpdateVolumeRequestSchema: z.ZodType = z
  .object({
    fullNameArg: z.string(),
    newName: z.string().optional(),
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    volumeType: z.string().optional(),
    storageLocation: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    fullName: z.string().optional(),
    volumeId: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    accessPoint: z.string().optional(),
    encryptionDetails: z.lazy(() => marshalEncryptionDetailsSchema).optional(),
    browseOnly: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    new_name: d.newName,
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    volume_type: d.volumeType,
    storage_location: d.storageLocation,
    owner: d.owner,
    comment: d.comment,
    full_name: d.fullName,
    volume_id: d.volumeId,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    access_point: d.accessPoint,
    encryption_details: d.encryptionDetails,
    browse_only: d.browseOnly,
  }));
