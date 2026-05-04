// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum ColumnTypeName {
  BOOLEAN = 'BOOLEAN',
  BYTE = 'BYTE',
  SHORT = 'SHORT',
  INT = 'INT',
  LONG = 'LONG',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',
  DATE = 'DATE',
  TIMESTAMP = 'TIMESTAMP',
  STRING = 'STRING',
  BINARY = 'BINARY',
  DECIMAL = 'DECIMAL',
  INTERVAL = 'INTERVAL',
  ARRAY = 'ARRAY',
  STRUCT = 'STRUCT',
  MAP = 'MAP',
  CHAR = 'CHAR',
  NULL = 'NULL',
  USER_DEFINED_TYPE = 'USER_DEFINED_TYPE',
  TIMESTAMP_NTZ = 'TIMESTAMP_NTZ',
  VARIANT = 'VARIANT',
  GEOMETRY = 'GEOMETRY',
  GEOGRAPHY = 'GEOGRAPHY',
  TIME = 'TIME',
  FILE = 'FILE',
  TABLE_TYPE = 'TABLE_TYPE',
  TABLEREF_TYPE = 'TABLEREF_TYPE',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CleanRoomAsset_AssetType {
  ASSET_TYPE_UNSPECIFIED = 'ASSET_TYPE_UNSPECIFIED',
  TABLE = 'TABLE',
  NOTEBOOK_FILE = 'NOTEBOOK_FILE',
  VOLUME = 'VOLUME',
  VIEW = 'VIEW',
  FOREIGN_TABLE = 'FOREIGN_TABLE',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CleanRoomAsset_Status_Enum {
  ENUM_UNSPECIFIED = 'ENUM_UNSPECIFIED',
  ACTIVE = 'ACTIVE',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  PENDING = 'PENDING',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CleanRoomNotebookReview_NotebookReviewState {
  NOTEBOOK_REVIEW_STATE_UNSPECIFIED = 'NOTEBOOK_REVIEW_STATE_UNSPECIFIED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CleanRoomNotebookReview_NotebookReviewSubReason {
  NOTEBOOK_REVIEW_SUB_REASON_UNSPECIFIED = 'NOTEBOOK_REVIEW_SUB_REASON_UNSPECIFIED',
  BACKFILLED = 'BACKFILLED',
  AUTO_APPROVED = 'AUTO_APPROVED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum PartitionSpecification_Partition_PartitionValue_PartitionValueOp {
  EQUAL = 'EQUAL',
  LIKE = 'LIKE',
}

/** Metadata of the clean room asset */
export interface CleanRoomAsset {
  /**
   * The name of the clean room this asset belongs to.
   * This field is required for create operations and populated by the server for responses.
   */
  cleanRoomName?: string | undefined;
  /**
   * A fully qualified name that uniquely identifies the asset within the clean room.
   * This is also the name displayed in the clean room UI.
   *
   * For UC securable assets (tables, volumes, etc.), the format is *shared_catalog*.*shared_schema*.*asset_name*
   *
   * For notebooks, the name is the notebook file name.
   * For jar analyses, the name is the jar analysis name.
   */
  name?: string | undefined;
  /** The type of the asset. */
  assetType?: CleanRoomAsset_AssetType | undefined;
  /** When the asset is added to the clean room, in epoch milliseconds. */
  addedAt?: number | undefined;
  /** Status of the asset */
  status?: CleanRoomAsset_Status_Enum | undefined;
  /** The alias of the collaborator who owns this asset */
  ownerCollaboratorAlias?: string | undefined;
  /** asset-type specific local information of the asset */
  localDetails?:
    | {
        $case: 'tableLocalDetails';
        /**
         * Local details for a table that are only available to its owner.
         * Present if and only if **asset_type** is **TABLE**
         */
        tableLocalDetails: CleanRoomAsset_TableLocalDetails;
      }
    | {
        $case: 'volumeLocalDetails';
        /**
         * Local details for a volume that are only available to its owner.
         * Present if and only if **asset_type** is **VOLUME**
         */
        volumeLocalDetails: CleanRoomAsset_VolumeLocalDetails;
      }
    | {
        $case: 'viewLocalDetails';
        /**
         * Local details for a view that are only available to its owner.
         * Present if and only if **asset_type** is **VIEW**
         */
        viewLocalDetails: CleanRoomAsset_ViewLocalDetails;
      }
    | {
        $case: 'foreignTableLocalDetails';
        /**
         * Local details for a foreign that are only available to its owner.
         * Present if and only if **asset_type** is **FOREIGN_TABLE**
         */
        foreignTableLocalDetails: CleanRoomAsset_ForeignTableLocalDetails;
      }
    | undefined;
  /** the asset-type specific information. Will not be returned by list */
  details?:
    | {
        $case: 'table';
        /**
         * Table details available to all collaborators of the clean room.
         * Present if and only if **asset_type** is **TABLE**
         */
        table: CleanRoomAsset_Table;
      }
    | {
        $case: 'notebook';
        /**
         * Notebook details available to all collaborators of the clean room.
         * Present if and only if **asset_type** is **NOTEBOOK_FILE**
         */
        notebook: CleanRoomAsset_Notebook;
      }
    | {
        $case: 'view';
        /**
         * View details available to all collaborators of the clean room.
         * Present if and only if **asset_type** is **VIEW**
         */
        view: CleanRoomAsset_View;
      }
    | {
        $case: 'foreignTable';
        /**
         * Foreign table details available to all collaborators of the clean room.
         * Present if and only if **asset_type** is **FOREIGN_TABLE**
         */
        foreignTable: CleanRoomAsset_ForeignTable;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CleanRoomAsset_ForeignTable {
  /** The metadata information of the columns in the foreign table */
  columns?: ColumnInfo[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CleanRoomAsset_ForeignTableLocalDetails {
  /**
   * The fully qualified name of the foreign table in its owner's local metastore,
   * in the format of *catalog*.*schema*.*foreign_table_name*
   */
  localName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CleanRoomAsset_Notebook {
  /**
   * Base 64 representation of the notebook contents.
   * This is the same format as returned by :method:workspace/export with the format of **HTML**.
   */
  notebookContent?: string | undefined;
  /** Server generated etag that represents the notebook version. */
  etag?: string | undefined;
  /** Aliases of collaborators that can run the notebook. */
  runnerCollaboratorAliases?: string[] | undefined;
  /** All existing approvals or rejections */
  reviews?: CleanRoomNotebookReview[] | undefined;
  /** Top-level status derived from all reviews */
  reviewState?: CleanRoomNotebookReview_NotebookReviewState | undefined;
  /** Optional description of the notebook shown to all collaborators. */
  description?: string | undefined;
  /**
   * The serverless environment version used to execute the notebook (e.g. "4").
   * Defaults to "2" if not specified.
   */
  environmentVersion?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface CleanRoomAsset_Status {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CleanRoomAsset_Table {
  /** The metadata information of the columns in the table */
  columns?: ColumnInfo[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CleanRoomAsset_TableLocalDetails {
  /**
   * The fully qualified name of the table in its owner's local metastore,
   * in the format of *catalog*.*schema*.*table_name*
   */
  localName?: string | undefined;
  /** Partition filtering specification for a shared table. */
  partitions?: PartitionSpecification_Partition[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CleanRoomAsset_View {
  /** The metadata information of the columns in the view */
  columns?: ColumnInfo[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CleanRoomAsset_ViewLocalDetails {
  /**
   * The fully qualified name of the view in its owner's local metastore,
   * in the format of *catalog*.*schema*.*view_name*
   */
  localName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CleanRoomAsset_VolumeLocalDetails {
  /**
   * The fully qualified name of the volume in its owner's local metastore,
   * in the format of *catalog*.*schema*.*volume_name*
   */
  localName?: string | undefined;
}

export interface CleanRoomNotebookReview {
  /** Collaborator alias of the reviewer */
  reviewerCollaboratorAlias?: string | undefined;
  /** When the review was submitted, in epoch milliseconds */
  createdAtMillis?: number | undefined;
  /** Review outcome */
  reviewState?: CleanRoomNotebookReview_NotebookReviewState | undefined;
  /** Review comment */
  comment?: string | undefined;
  /** Specified when the review was not explicitly made by a user */
  reviewSubReason?: CleanRoomNotebookReview_NotebookReviewSubReason | undefined;
}

export interface ColumnInfo {
  /** Name of Column. */
  name?: string | undefined;
  /** Full data type specification as SQL/catalogString text. */
  typeText?: string | undefined;
  typeName?: ColumnTypeName | undefined;
  /** Ordinal position of column (starting at position 0). */
  position?: number | undefined;
  /** Digits of precision; required for DecimalTypes. */
  typePrecision?: number | undefined;
  /** Digits to right of decimal; Required for DecimalTypes. */
  typeScale?: number | undefined;
  /** Format of IntervalType. */
  typeIntervalType?: string | undefined;
  /** Full data type specification, JSON-serialized. */
  typeJson?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Whether field may be Null (default: true). */
  nullable?: boolean | undefined;
  /** Partition index for column. */
  partitionIndex?: number | undefined;
  mask?: ColumnMask | undefined;
}

export interface ColumnMask {
  /** The full name of the column mask SQL UDF. */
  functionName?: string | undefined;
  /**
   * The list of additional table columns to be passed as input to the column mask function. The
   * first arg of the mask function should be of the type of the column being masked and the
   * types of the rest of the args should match the types of columns in 'using_column_names'.
   */
  usingColumnNames?: string[] | undefined;
  /**
   * The list of additional table columns or literals to be passed as additional arguments to
   * a column mask function. This is the replacement of the deprecated using_column_names field and
   * carries information about the types (alias or constant) of the arguments to the mask function.
   */
  usingArguments?: PolicyFunctionArgument[] | undefined;
}

export interface CreateCleanRoomAssetRequest {
  asset?: CleanRoomAsset | undefined;
}

export interface CreateCleanRoomAssetReviewRequest {
  /** Name of the clean room */
  cleanRoomName?: string | undefined;
  /** Name of the asset */
  name?: string | undefined;
  /** Asset type. Can either be NOTEBOOK_FILE or JAR_ANALYSIS. */
  assetType?: CleanRoomAsset_AssetType | undefined;
  review?:
    | {$case: 'notebookReview'; notebookReview: NotebookVersionReview}
    | undefined;
}

export interface CreateCleanRoomAssetReviewResponse {
  /** All existing notebook approvals or rejections */
  notebookReviews?: CleanRoomNotebookReview[] | undefined;
  reviewState?:
    | {
        $case: 'notebookReviewState';
        /** Top-level status derived from all reviews */
        notebookReviewState: CleanRoomNotebookReview_NotebookReviewState;
      }
    | undefined;
}

export interface DeleteCleanRoomAssetRequest {
  /** Name of the clean room. */
  cleanRoomName?: string | undefined;
  /** The type of the asset. */
  assetType?: CleanRoomAsset_AssetType | undefined;
  /** The fully qualified name of the asset, it is same as the name field in CleanRoomAsset. */
  name?: string | undefined;
}

/**
 * Response for delete clean room request. Using an empty message since the generic Empty proto does not externd
 * UnshadedMessageMarker.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteCleanRoomAssetResponse {}

export interface GetCleanRoomAssetRequest {
  /** Name of the clean room. */
  cleanRoomName?: string | undefined;
  /** The type of the asset. */
  assetType?: CleanRoomAsset_AssetType | undefined;
  /** The fully qualified name of the asset, it is same as the name field in CleanRoomAsset. */
  name?: string | undefined;
}

export interface GetCleanRoomAssetRevisionRequest {
  /** Name of the clean room. */
  cleanRoomName?: string | undefined;
  /** Name of the asset. */
  name?: string | undefined;
  /** Asset type. Only NOTEBOOK_FILE is supported. */
  assetType?: CleanRoomAsset_AssetType | undefined;
  /** Revision etag to fetch. If not provided, the latest revision will be returned. */
  etag?: string | undefined;
}

export interface ListCleanRoomAssetRevisionsRequest {
  /** Name of the clean room. */
  cleanRoomName?: string | undefined;
  /** Name of the asset. */
  name?: string | undefined;
  /** Asset type. Only NOTEBOOK_FILE is supported. */
  assetType?: CleanRoomAsset_AssetType | undefined;
  /** Maximum number of asset revisions to return. Defaults to 10. */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on the previous query. */
  pageToken?: string | undefined;
}

export interface ListCleanRoomAssetRevisionsResponse {
  revisions?: CleanRoomAsset[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListCleanRoomAssetsRequest {
  /** Name of the clean room. */
  cleanRoomName?: string | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListCleanRoomAssetsResponse {
  /** Assets in the clean room. */
  assets?: CleanRoomAsset[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * page_token should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface NotebookVersionReview {
  /** Etag identifying the notebook version */
  etag?: string | undefined;
  /** Review outcome */
  reviewState?: CleanRoomNotebookReview_NotebookReviewState | undefined;
  /** Review comment */
  comment?: string | undefined;
}

/**
 * PartitionSpecification defines the format of partition filtering specification for shared tables.
 * It consists of a list of Partitions which in turn include a list of PartitionValues.
 * - Partitions inside a single PartitionSpecification have OR logical relationship.
 * - PartitionValues inside a single Partition have AND logical relationship.
 * - PartitionValue.name must have distinct values inside a single Partition.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PartitionSpecification {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PartitionSpecification_Partition {
  /** An array of partition values. */
  values?: PartitionSpecification_Partition_PartitionValue[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PartitionSpecification_Partition_PartitionValue {
  /** The name of the partition column. */
  name?: string | undefined;
  /**
   * The value of the partition column. When this value is not set, it means `null` value.
   * When this field is set, field `recipient_property_key` can not be set.
   */
  value?: string | undefined;
  /**
   * The key of a Delta Sharing recipient's property. For example "databricks-account-id".
   * When this field is set, field `value` can not be set.
   */
  recipientPropertyKey?: string | undefined;
  /** The operator to apply for the value. */
  op?:
    | PartitionSpecification_Partition_PartitionValue_PartitionValueOp
    | undefined;
}

/**
 * A positional argument passed to a row filter or column mask function.
 * Distinguishes between column references and literals.
 */
export interface PolicyFunctionArgument {
  arg?:
    | {
        $case: 'column';
        /** A column reference. */
        column: string;
      }
    | {
        $case: 'constant';
        /** A constant literal. */
        constant: string;
      }
    | undefined;
}

export interface UpdateCleanRoomAssetRequest {
  /** Name of the clean room. */
  cleanRoomName?: string | undefined;
  /**
   * The asset to update.
   * The asset's `name` and `asset_type` fields are used to identify the asset to update.
   */
  asset?: CleanRoomAsset | undefined;
}

export const unmarshalCleanRoomAssetSchema: z.ZodType<CleanRoomAsset> = z
  .object({
    clean_room_name: z.string().optional(),
    name: z.string().optional(),
    asset_type: z.enum(CleanRoomAsset_AssetType).optional(),
    added_at: z.number().optional(),
    status: z.enum(CleanRoomAsset_Status_Enum).optional(),
    owner_collaborator_alias: z.string().optional(),
    table_local_details: z
      .lazy(() => unmarshalCleanRoomAsset_TableLocalDetailsSchema)
      .optional(),
    volume_local_details: z
      .lazy(() => unmarshalCleanRoomAsset_VolumeLocalDetailsSchema)
      .optional(),
    view_local_details: z
      .lazy(() => unmarshalCleanRoomAsset_ViewLocalDetailsSchema)
      .optional(),
    foreign_table_local_details: z
      .lazy(() => unmarshalCleanRoomAsset_ForeignTableLocalDetailsSchema)
      .optional(),
    table: z.lazy(() => unmarshalCleanRoomAsset_TableSchema).optional(),
    notebook: z.lazy(() => unmarshalCleanRoomAsset_NotebookSchema).optional(),
    view: z.lazy(() => unmarshalCleanRoomAsset_ViewSchema).optional(),
    foreign_table: z
      .lazy(() => unmarshalCleanRoomAsset_ForeignTableSchema)
      .optional(),
  })
  .transform(d => ({
    cleanRoomName: d.clean_room_name,
    name: d.name,
    assetType: d.asset_type,
    addedAt: d.added_at,
    status: d.status,
    ownerCollaboratorAlias: d.owner_collaborator_alias,
    localDetails:
      d.table_local_details !== undefined
        ? {
            $case: 'tableLocalDetails' as const,
            tableLocalDetails: d.table_local_details,
          }
        : d.volume_local_details !== undefined
          ? {
              $case: 'volumeLocalDetails' as const,
              volumeLocalDetails: d.volume_local_details,
            }
          : d.view_local_details !== undefined
            ? {
                $case: 'viewLocalDetails' as const,
                viewLocalDetails: d.view_local_details,
              }
            : d.foreign_table_local_details !== undefined
              ? {
                  $case: 'foreignTableLocalDetails' as const,
                  foreignTableLocalDetails: d.foreign_table_local_details,
                }
              : undefined,
    details:
      d.table !== undefined
        ? {$case: 'table' as const, table: d.table}
        : d.notebook !== undefined
          ? {$case: 'notebook' as const, notebook: d.notebook}
          : d.view !== undefined
            ? {$case: 'view' as const, view: d.view}
            : d.foreign_table !== undefined
              ? {$case: 'foreignTable' as const, foreignTable: d.foreign_table}
              : undefined,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCleanRoomAsset_ForeignTableSchema: z.ZodType<CleanRoomAsset_ForeignTable> =
  z
    .object({
      columns: z.array(z.lazy(() => unmarshalColumnInfoSchema)).optional(),
    })
    .transform(d => ({
      columns: d.columns,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCleanRoomAsset_ForeignTableLocalDetailsSchema: z.ZodType<CleanRoomAsset_ForeignTableLocalDetails> =
  z
    .object({
      local_name: z.string().optional(),
    })
    .transform(d => ({
      localName: d.local_name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCleanRoomAsset_NotebookSchema: z.ZodType<CleanRoomAsset_Notebook> =
  z
    .object({
      notebook_content: z.string().optional(),
      etag: z.string().optional(),
      runner_collaborator_aliases: z.array(z.string()).optional(),
      reviews: z
        .array(z.lazy(() => unmarshalCleanRoomNotebookReviewSchema))
        .optional(),
      review_state: z
        .enum(CleanRoomNotebookReview_NotebookReviewState)
        .optional(),
      description: z.string().optional(),
      environment_version: z.string().optional(),
    })
    .transform(d => ({
      notebookContent: d.notebook_content,
      etag: d.etag,
      runnerCollaboratorAliases: d.runner_collaborator_aliases,
      reviews: d.reviews,
      reviewState: d.review_state,
      description: d.description,
      environmentVersion: d.environment_version,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCleanRoomAsset_TableSchema: z.ZodType<CleanRoomAsset_Table> =
  z
    .object({
      columns: z.array(z.lazy(() => unmarshalColumnInfoSchema)).optional(),
    })
    .transform(d => ({
      columns: d.columns,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCleanRoomAsset_TableLocalDetailsSchema: z.ZodType<CleanRoomAsset_TableLocalDetails> =
  z
    .object({
      local_name: z.string().optional(),
      partitions: z
        .array(z.lazy(() => unmarshalPartitionSpecification_PartitionSchema))
        .optional(),
    })
    .transform(d => ({
      localName: d.local_name,
      partitions: d.partitions,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCleanRoomAsset_ViewSchema: z.ZodType<CleanRoomAsset_View> =
  z
    .object({
      columns: z.array(z.lazy(() => unmarshalColumnInfoSchema)).optional(),
    })
    .transform(d => ({
      columns: d.columns,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCleanRoomAsset_ViewLocalDetailsSchema: z.ZodType<CleanRoomAsset_ViewLocalDetails> =
  z
    .object({
      local_name: z.string().optional(),
    })
    .transform(d => ({
      localName: d.local_name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCleanRoomAsset_VolumeLocalDetailsSchema: z.ZodType<CleanRoomAsset_VolumeLocalDetails> =
  z
    .object({
      local_name: z.string().optional(),
    })
    .transform(d => ({
      localName: d.local_name,
    }));

export const unmarshalCleanRoomNotebookReviewSchema: z.ZodType<CleanRoomNotebookReview> =
  z
    .object({
      reviewer_collaborator_alias: z.string().optional(),
      created_at_millis: z.number().optional(),
      review_state: z
        .enum(CleanRoomNotebookReview_NotebookReviewState)
        .optional(),
      comment: z.string().optional(),
      review_sub_reason: z
        .enum(CleanRoomNotebookReview_NotebookReviewSubReason)
        .optional(),
    })
    .transform(d => ({
      reviewerCollaboratorAlias: d.reviewer_collaborator_alias,
      createdAtMillis: d.created_at_millis,
      reviewState: d.review_state,
      comment: d.comment,
      reviewSubReason: d.review_sub_reason,
    }));

export const unmarshalColumnInfoSchema: z.ZodType<ColumnInfo> = z
  .object({
    name: z.string().optional(),
    type_text: z.string().optional(),
    type_name: z.enum(ColumnTypeName).optional(),
    position: z.number().optional(),
    type_precision: z.number().optional(),
    type_scale: z.number().optional(),
    type_interval_type: z.string().optional(),
    type_json: z.string().optional(),
    comment: z.string().optional(),
    nullable: z.boolean().optional(),
    partition_index: z.number().optional(),
    mask: z.lazy(() => unmarshalColumnMaskSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    typeText: d.type_text,
    typeName: d.type_name,
    position: d.position,
    typePrecision: d.type_precision,
    typeScale: d.type_scale,
    typeIntervalType: d.type_interval_type,
    typeJson: d.type_json,
    comment: d.comment,
    nullable: d.nullable,
    partitionIndex: d.partition_index,
    mask: d.mask,
  }));

export const unmarshalColumnMaskSchema: z.ZodType<ColumnMask> = z
  .object({
    function_name: z.string().optional(),
    using_column_names: z.array(z.string()).optional(),
    using_arguments: z
      .array(z.lazy(() => unmarshalPolicyFunctionArgumentSchema))
      .optional(),
  })
  .transform(d => ({
    functionName: d.function_name,
    usingColumnNames: d.using_column_names,
    usingArguments: d.using_arguments,
  }));

export const unmarshalCreateCleanRoomAssetReviewResponseSchema: z.ZodType<CreateCleanRoomAssetReviewResponse> =
  z
    .object({
      notebook_reviews: z
        .array(z.lazy(() => unmarshalCleanRoomNotebookReviewSchema))
        .optional(),
      notebook_review_state: z
        .enum(CleanRoomNotebookReview_NotebookReviewState)
        .optional(),
    })
    .transform(d => ({
      notebookReviews: d.notebook_reviews,
      reviewState:
        d.notebook_review_state !== undefined
          ? {
              $case: 'notebookReviewState' as const,
              notebookReviewState: d.notebook_review_state,
            }
          : undefined,
    }));

export const unmarshalDeleteCleanRoomAssetResponseSchema: z.ZodType<DeleteCleanRoomAssetResponse> =
  z.object({});

export const unmarshalListCleanRoomAssetRevisionsResponseSchema: z.ZodType<ListCleanRoomAssetRevisionsResponse> =
  z
    .object({
      revisions: z
        .array(z.lazy(() => unmarshalCleanRoomAssetSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      revisions: d.revisions,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListCleanRoomAssetsResponseSchema: z.ZodType<ListCleanRoomAssetsResponse> =
  z
    .object({
      assets: z.array(z.lazy(() => unmarshalCleanRoomAssetSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      assets: d.assets,
      nextPageToken: d.next_page_token,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPartitionSpecification_PartitionSchema: z.ZodType<PartitionSpecification_Partition> =
  z
    .object({
      values: z
        .array(
          z.lazy(
            () => unmarshalPartitionSpecification_Partition_PartitionValueSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      values: d.values,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPartitionSpecification_Partition_PartitionValueSchema: z.ZodType<PartitionSpecification_Partition_PartitionValue> =
  z
    .object({
      name: z.string().optional(),
      value: z.string().optional(),
      recipient_property_key: z.string().optional(),
      op: z
        .enum(PartitionSpecification_Partition_PartitionValue_PartitionValueOp)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      value: d.value,
      recipientPropertyKey: d.recipient_property_key,
      op: d.op,
    }));

export const unmarshalPolicyFunctionArgumentSchema: z.ZodType<PolicyFunctionArgument> =
  z
    .object({
      column: z.string().optional(),
      constant: z.string().optional(),
    })
    .transform(d => ({
      arg:
        d.column !== undefined
          ? {$case: 'column' as const, column: d.column}
          : d.constant !== undefined
            ? {$case: 'constant' as const, constant: d.constant}
            : undefined,
    }));

export const marshalCleanRoomAssetSchema: z.ZodType = z
  .object({
    cleanRoomName: z.string().optional(),
    name: z.string().optional(),
    assetType: z.enum(CleanRoomAsset_AssetType).optional(),
    addedAt: z.number().optional(),
    status: z.enum(CleanRoomAsset_Status_Enum).optional(),
    ownerCollaboratorAlias: z.string().optional(),
    localDetails: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('tableLocalDetails'),
          tableLocalDetails: z.lazy(
            () => marshalCleanRoomAsset_TableLocalDetailsSchema
          ),
        }),
        z.object({
          $case: z.literal('volumeLocalDetails'),
          volumeLocalDetails: z.lazy(
            () => marshalCleanRoomAsset_VolumeLocalDetailsSchema
          ),
        }),
        z.object({
          $case: z.literal('viewLocalDetails'),
          viewLocalDetails: z.lazy(
            () => marshalCleanRoomAsset_ViewLocalDetailsSchema
          ),
        }),
        z.object({
          $case: z.literal('foreignTableLocalDetails'),
          foreignTableLocalDetails: z.lazy(
            () => marshalCleanRoomAsset_ForeignTableLocalDetailsSchema
          ),
        }),
      ])
      .optional(),
    details: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('table'),
          table: z.lazy(() => marshalCleanRoomAsset_TableSchema),
        }),
        z.object({
          $case: z.literal('notebook'),
          notebook: z.lazy(() => marshalCleanRoomAsset_NotebookSchema),
        }),
        z.object({
          $case: z.literal('view'),
          view: z.lazy(() => marshalCleanRoomAsset_ViewSchema),
        }),
        z.object({
          $case: z.literal('foreignTable'),
          foreignTable: z.lazy(() => marshalCleanRoomAsset_ForeignTableSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    clean_room_name: d.cleanRoomName,
    name: d.name,
    asset_type: d.assetType,
    added_at: d.addedAt,
    status: d.status,
    owner_collaborator_alias: d.ownerCollaboratorAlias,
    ...(d.localDetails?.$case === 'tableLocalDetails' && {
      table_local_details: d.localDetails.tableLocalDetails,
    }),
    ...(d.localDetails?.$case === 'volumeLocalDetails' && {
      volume_local_details: d.localDetails.volumeLocalDetails,
    }),
    ...(d.localDetails?.$case === 'viewLocalDetails' && {
      view_local_details: d.localDetails.viewLocalDetails,
    }),
    ...(d.localDetails?.$case === 'foreignTableLocalDetails' && {
      foreign_table_local_details: d.localDetails.foreignTableLocalDetails,
    }),
    ...(d.details?.$case === 'table' && {table: d.details.table}),
    ...(d.details?.$case === 'notebook' && {notebook: d.details.notebook}),
    ...(d.details?.$case === 'view' && {view: d.details.view}),
    ...(d.details?.$case === 'foreignTable' && {
      foreign_table: d.details.foreignTable,
    }),
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCleanRoomAsset_ForeignTableSchema: z.ZodType = z
  .object({
    columns: z.array(z.lazy(() => marshalColumnInfoSchema)).optional(),
  })
  .transform(d => ({
    columns: d.columns,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCleanRoomAsset_ForeignTableLocalDetailsSchema: z.ZodType = z
  .object({
    localName: z.string().optional(),
  })
  .transform(d => ({
    local_name: d.localName,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCleanRoomAsset_NotebookSchema: z.ZodType = z
  .object({
    notebookContent: z.string().optional(),
    etag: z.string().optional(),
    runnerCollaboratorAliases: z.array(z.string()).optional(),
    reviews: z
      .array(z.lazy(() => marshalCleanRoomNotebookReviewSchema))
      .optional(),
    reviewState: z.enum(CleanRoomNotebookReview_NotebookReviewState).optional(),
    description: z.string().optional(),
    environmentVersion: z.string().optional(),
  })
  .transform(d => ({
    notebook_content: d.notebookContent,
    etag: d.etag,
    runner_collaborator_aliases: d.runnerCollaboratorAliases,
    reviews: d.reviews,
    review_state: d.reviewState,
    description: d.description,
    environment_version: d.environmentVersion,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCleanRoomAsset_TableSchema: z.ZodType = z
  .object({
    columns: z.array(z.lazy(() => marshalColumnInfoSchema)).optional(),
  })
  .transform(d => ({
    columns: d.columns,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCleanRoomAsset_TableLocalDetailsSchema: z.ZodType = z
  .object({
    localName: z.string().optional(),
    partitions: z
      .array(z.lazy(() => marshalPartitionSpecification_PartitionSchema))
      .optional(),
  })
  .transform(d => ({
    local_name: d.localName,
    partitions: d.partitions,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCleanRoomAsset_ViewSchema: z.ZodType = z
  .object({
    columns: z.array(z.lazy(() => marshalColumnInfoSchema)).optional(),
  })
  .transform(d => ({
    columns: d.columns,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCleanRoomAsset_ViewLocalDetailsSchema: z.ZodType = z
  .object({
    localName: z.string().optional(),
  })
  .transform(d => ({
    local_name: d.localName,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCleanRoomAsset_VolumeLocalDetailsSchema: z.ZodType = z
  .object({
    localName: z.string().optional(),
  })
  .transform(d => ({
    local_name: d.localName,
  }));

export const marshalCleanRoomNotebookReviewSchema: z.ZodType = z
  .object({
    reviewerCollaboratorAlias: z.string().optional(),
    createdAtMillis: z.number().optional(),
    reviewState: z.enum(CleanRoomNotebookReview_NotebookReviewState).optional(),
    comment: z.string().optional(),
    reviewSubReason: z
      .enum(CleanRoomNotebookReview_NotebookReviewSubReason)
      .optional(),
  })
  .transform(d => ({
    reviewer_collaborator_alias: d.reviewerCollaboratorAlias,
    created_at_millis: d.createdAtMillis,
    review_state: d.reviewState,
    comment: d.comment,
    review_sub_reason: d.reviewSubReason,
  }));

export const marshalColumnInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    typeText: z.string().optional(),
    typeName: z.enum(ColumnTypeName).optional(),
    position: z.number().optional(),
    typePrecision: z.number().optional(),
    typeScale: z.number().optional(),
    typeIntervalType: z.string().optional(),
    typeJson: z.string().optional(),
    comment: z.string().optional(),
    nullable: z.boolean().optional(),
    partitionIndex: z.number().optional(),
    mask: z.lazy(() => marshalColumnMaskSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    type_text: d.typeText,
    type_name: d.typeName,
    position: d.position,
    type_precision: d.typePrecision,
    type_scale: d.typeScale,
    type_interval_type: d.typeIntervalType,
    type_json: d.typeJson,
    comment: d.comment,
    nullable: d.nullable,
    partition_index: d.partitionIndex,
    mask: d.mask,
  }));

export const marshalColumnMaskSchema: z.ZodType = z
  .object({
    functionName: z.string().optional(),
    usingColumnNames: z.array(z.string()).optional(),
    usingArguments: z
      .array(z.lazy(() => marshalPolicyFunctionArgumentSchema))
      .optional(),
  })
  .transform(d => ({
    function_name: d.functionName,
    using_column_names: d.usingColumnNames,
    using_arguments: d.usingArguments,
  }));

export const marshalCreateCleanRoomAssetReviewRequestSchema: z.ZodType = z
  .object({
    cleanRoomName: z.string().optional(),
    name: z.string().optional(),
    assetType: z.enum(CleanRoomAsset_AssetType).optional(),
    review: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('notebookReview'),
          notebookReview: z.lazy(() => marshalNotebookVersionReviewSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    clean_room_name: d.cleanRoomName,
    name: d.name,
    asset_type: d.assetType,
    ...(d.review?.$case === 'notebookReview' && {
      notebook_review: d.review.notebookReview,
    }),
  }));

export const marshalNotebookVersionReviewSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    reviewState: z.enum(CleanRoomNotebookReview_NotebookReviewState).optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    etag: d.etag,
    review_state: d.reviewState,
    comment: d.comment,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPartitionSpecification_PartitionSchema: z.ZodType = z
  .object({
    values: z
      .array(
        z.lazy(
          () => marshalPartitionSpecification_Partition_PartitionValueSchema
        )
      )
      .optional(),
  })
  .transform(d => ({
    values: d.values,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPartitionSpecification_Partition_PartitionValueSchema: z.ZodType =
  z
    .object({
      name: z.string().optional(),
      value: z.string().optional(),
      recipientPropertyKey: z.string().optional(),
      op: z
        .enum(PartitionSpecification_Partition_PartitionValue_PartitionValueOp)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      value: d.value,
      recipient_property_key: d.recipientPropertyKey,
      op: d.op,
    }));

export const marshalPolicyFunctionArgumentSchema: z.ZodType = z
  .object({
    arg: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('column'), column: z.string()}),
        z.object({$case: z.literal('constant'), constant: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.arg?.$case === 'column' && {column: d.arg.column}),
    ...(d.arg?.$case === 'constant' && {constant: d.arg.constant}),
  }));
