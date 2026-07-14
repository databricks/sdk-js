// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * Copied from elastic-spark-common/api/messages/runs.proto.
 * Using the original definition to remove coupling with jobs API definition
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomTaskRunLifeCycleState = {
  RUN_LIFE_CYCLE_STATE_UNSPECIFIED: 'RUN_LIFE_CYCLE_STATE_UNSPECIFIED',
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  TERMINATING: 'TERMINATING',
  TERMINATED: 'TERMINATED',
  SKIPPED: 'SKIPPED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BLOCKED: 'BLOCKED',
  WAITING_FOR_RETRY: 'WAITING_FOR_RETRY',
  QUEUED: 'QUEUED',
} as const;
export type CleanRoomTaskRunLifeCycleState =
  | (typeof CleanRoomTaskRunLifeCycleState)[keyof typeof CleanRoomTaskRunLifeCycleState]
  | (string & {});

/**
 * Copied from elastic-spark-common/api/messages/runs.proto.
 * Using the original definition to avoid cyclic dependency.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomTaskRunResultState = {
  RUN_RESULT_STATE_UNSPECIFIED: 'RUN_RESULT_STATE_UNSPECIFIED',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  TIMEDOUT: 'TIMEDOUT',
  CANCELED: 'CANCELED',
  MAXIMUM_CONCURRENT_RUNS_REACHED: 'MAXIMUM_CONCURRENT_RUNS_REACHED',
  UPSTREAM_CANCELED: 'UPSTREAM_CANCELED',
  UPSTREAM_FAILED: 'UPSTREAM_FAILED',
  EXCLUDED: 'EXCLUDED',
  EVICTED: 'EVICTED',
  SUCCESS_WITH_FAILURES: 'SUCCESS_WITH_FAILURES',
  UPSTREAM_EVICTED: 'UPSTREAM_EVICTED',
  /** 12 is reserved for previously used SUCCESS_WITH_SKIPPED_CELLS */
  DISABLED: 'DISABLED',
} as const;
export type CleanRoomTaskRunResultState =
  | (typeof CleanRoomTaskRunResultState)[keyof typeof CleanRoomTaskRunResultState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ColumnTypeName = {
  BOOLEAN: 'BOOLEAN',
  BYTE: 'BYTE',
  SHORT: 'SHORT',
  INT: 'INT',
  LONG: 'LONG',
  FLOAT: 'FLOAT',
  DOUBLE: 'DOUBLE',
  DATE: 'DATE',
  TIMESTAMP: 'TIMESTAMP',
  STRING: 'STRING',
  BINARY: 'BINARY',
  DECIMAL: 'DECIMAL',
  INTERVAL: 'INTERVAL',
  ARRAY: 'ARRAY',
  STRUCT: 'STRUCT',
  MAP: 'MAP',
  CHAR: 'CHAR',
  NULL: 'NULL',
  USER_DEFINED_TYPE: 'USER_DEFINED_TYPE',
  TIMESTAMP_NTZ: 'TIMESTAMP_NTZ',
  VARIANT: 'VARIANT',
  GEOMETRY: 'GEOMETRY',
  GEOGRAPHY: 'GEOGRAPHY',
  TABLE_TYPE: 'TABLE_TYPE',
} as const;
export type ColumnTypeName =
  | (typeof ColumnTypeName)[keyof typeof ColumnTypeName]
  | (string & {});

/** Compliance standard for SHIELD customers. See README.md for how instructions of how to add new standards. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ComplianceStandard = {
  /** Sentinel value, should not be used in prod */
  COMPLIANCE_STANDARD_UNSPECIFIED: 'COMPLIANCE_STANDARD_UNSPECIFIED',
  /**
   * For customers who buy Enhanced Security Compliance (ESC) product
   * but don't belong to any standards.
   */
  NONE: 'NONE',
  /** Industry standards below */
  HIPAA: 'HIPAA',
  PCI_DSS: 'PCI_DSS',
  FEDRAMP_MODERATE: 'FEDRAMP_MODERATE',
  IRAP_PROTECTED: 'IRAP_PROTECTED',
  /** Only available in AWS GovCloud */
  FEDRAMP_HIGH: 'FEDRAMP_HIGH',
  FEDRAMP_IL5: 'FEDRAMP_IL5',
  /** International Traffic in Arms Regulations (ITAR); Export Administration Regulations (EAR) */
  ITAR_EAR: 'ITAR_EAR',
  /** UK Cyber Essential Plus */
  CYBER_ESSENTIAL_PLUS: 'CYBER_ESSENTIAL_PLUS',
  /**
   * The Government of Canada (GC) Protected B
   * https://www.tpsgc-pwgsc.gc.ca/esc-src/protection-safeguarding/niveaux-levels-eng.html
   */
  CANADA_PROTECTED_B: 'CANADA_PROTECTED_B',
  /**
   * Japan Information system Security Management and Assessment Program
   * https://www.ismap.go.jp/csm?id=kb_article_view&sysparm_article=KB0010301&sys_kb_id=9b6741cec305821032713201150131c2&spa=1
   */
  ISMAP: 'ISMAP',
  /**
   * HITRUST
   * https://hitrustalliance.net/
   */
  HITRUST: 'HITRUST',
  /** Korea Financial Security Institute */
  K_FSI: 'K_FSI',
  /** Cloud Computing Compliance Criteria Catalogue for Germany */
  GERMANY_C5: 'GERMANY_C5',
  /** Trusted Information Security Assessment Exchange, a compliance standard for automotive industry for Germany */
  GERMANY_TISAX: 'GERMANY_TISAX',
} as const;
export type ComplianceStandard =
  | (typeof ComplianceStandard)[keyof typeof ComplianceStandard]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoom_AccessRestricted = {
  NO_RESTRICTION: 'NO_RESTRICTION',
  CSP_MISMATCH: 'CSP_MISMATCH',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoom_AccessRestricted =
  | (typeof CleanRoom_AccessRestricted)[keyof typeof CleanRoom_AccessRestricted]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoom_Status_Enum = {
  ENUM_UNSPECIFIED: 'ENUM_UNSPECIFIED',
  ACTIVE: 'ACTIVE',
  PROVISIONING: 'PROVISIONING',
  DELETED: 'DELETED',
  FAILED: 'FAILED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoom_Status_Enum =
  | (typeof CleanRoom_Status_Enum)[keyof typeof CleanRoom_Status_Enum]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomAsset_AssetType = {
  ASSET_TYPE_UNSPECIFIED: 'ASSET_TYPE_UNSPECIFIED',
  TABLE: 'TABLE',
  NOTEBOOK_FILE: 'NOTEBOOK_FILE',
  VOLUME: 'VOLUME',
  VIEW: 'VIEW',
  FOREIGN_TABLE: 'FOREIGN_TABLE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoomAsset_AssetType =
  | (typeof CleanRoomAsset_AssetType)[keyof typeof CleanRoomAsset_AssetType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomAsset_Status_Enum = {
  ENUM_UNSPECIFIED: 'ENUM_UNSPECIFIED',
  ACTIVE: 'ACTIVE',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  PENDING: 'PENDING',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoomAsset_Status_Enum =
  | (typeof CleanRoomAsset_Status_Enum)[keyof typeof CleanRoomAsset_Status_Enum]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomAutoApprovalRule_AuthorScope = {
  AUTHOR_SCOPE_UNSPECIFIED: 'AUTHOR_SCOPE_UNSPECIFIED',
  ANY_AUTHOR: 'ANY_AUTHOR',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoomAutoApprovalRule_AuthorScope =
  | (typeof CleanRoomAutoApprovalRule_AuthorScope)[keyof typeof CleanRoomAutoApprovalRule_AuthorScope]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomNotebookReview_NotebookReviewState = {
  NOTEBOOK_REVIEW_STATE_UNSPECIFIED: 'NOTEBOOK_REVIEW_STATE_UNSPECIFIED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoomNotebookReview_NotebookReviewState =
  | (typeof CleanRoomNotebookReview_NotebookReviewState)[keyof typeof CleanRoomNotebookReview_NotebookReviewState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomNotebookReview_NotebookReviewSubReason = {
  NOTEBOOK_REVIEW_SUB_REASON_UNSPECIFIED:
    'NOTEBOOK_REVIEW_SUB_REASON_UNSPECIFIED',
  BACKFILLED: 'BACKFILLED',
  AUTO_APPROVED: 'AUTO_APPROVED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoomNotebookReview_NotebookReviewSubReason =
  | (typeof CleanRoomNotebookReview_NotebookReviewSubReason)[keyof typeof CleanRoomNotebookReview_NotebookReviewSubReason]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CleanRoomOutputCatalog_OutputCatalogStatus = {
  OUTPUT_CATALOG_STATUS_UNSPECIFIED: 'OUTPUT_CATALOG_STATUS_UNSPECIFIED',
  /** The clean room is not eligible for output catalog. */
  NOT_ELIGIBLE: 'NOT_ELIGIBLE',
  /** The output catalog of the clean room is not yet created. */
  NOT_CREATED: 'NOT_CREATED',
  /** The output catalog of the clean room is created. */
  CREATED: 'CREATED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CleanRoomOutputCatalog_OutputCatalogStatus =
  | (typeof CleanRoomOutputCatalog_OutputCatalogStatus)[keyof typeof CleanRoomOutputCatalog_OutputCatalogStatus]
  | (string & {});

/**
 * The filtering protocol used by the DP. For private and public preview, SEG will only
 * support TCP filtering (i.e. DNS based filtering, filtering by destination IP address),
 * so protocol will be set to TCP by default and hidden from the user. In the future, users
 * may be able to select HTTP filtering (i.e. SNI based filtering, filtering by FQDN).
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol =
  {
    INTERNET_DESTINATION_FILTERING_PROTOCOL_UNSPECIFIED:
      'INTERNET_DESTINATION_FILTERING_PROTOCOL_UNSPECIFIED',
    TCP: 'TCP',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol =

    | (typeof EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol)[keyof typeof EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType =
  {
    INTERNET_DESTINATION_TYPE_UNSPECIFIED:
      'INTERNET_DESTINATION_TYPE_UNSPECIFIED',
    FQDN: 'FQDN',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType =

    | (typeof EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType)[keyof typeof EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType =
  {
    LOG_ONLY_MODE_TYPE_UNSPECIFIED: 'LOG_ONLY_MODE_TYPE_UNSPECIFIED',
    ALL_SERVICES: 'ALL_SERVICES',
    SELECTED_SERVICES: 'SELECTED_SERVICES',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType =

    | (typeof EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType)[keyof typeof EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType]
    | (string & {});

/** The values should match the list of workloads used in networkconfig.proto */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType =
  {
    WORKLOAD_TYPE_UNSPECIFIED: 'WORKLOAD_TYPE_UNSPECIFIED',
    DBSQL: 'DBSQL',
    ML_SERVING: 'ML_SERVING',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType =
  | (typeof EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType)[keyof typeof EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType]
  | (string & {});

/**
 * At which level can <Databricks> and <Databricks> managed compute access Internet.
 * FULL_ACCESS: <Databricks> can access Internet. No blocking rules will apply.
 * RESTRICTED_ACCESS: <Databricks> can only access explicitly allowed internet and storage destinations,
 * as well as UC connections and external locations.
 * PRIVATE_ACCESS_ONLY (not used): <Databricks> can only access destinations via private link.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode = {
  RESTRICTION_MODE_UNSPECIFIED: 'RESTRICTION_MODE_UNSPECIFIED',
  FULL_ACCESS: 'FULL_ACCESS',
  PRIVATE_ACCESS_ONLY: 'PRIVATE_ACCESS_ONLY',
  RESTRICTED_ACCESS: 'RESTRICTED_ACCESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode =
  | (typeof EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode)[keyof typeof EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType =
  {
    STORAGE_DESTINATION_TYPE_UNSPECIFIED:
      'STORAGE_DESTINATION_TYPE_UNSPECIFIED',
    AWS_S3: 'AWS_S3',
    CLOUDFLARE_R2: 'CLOUDFLARE_R2',
    AZURE_STORAGE: 'AZURE_STORAGE',
    GOOGLE_CLOUD_STORAGE: 'GOOGLE_CLOUD_STORAGE',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType =

    | (typeof EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType)[keyof typeof EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PartitionSpecification_Partition_PartitionValue_PartitionValueOp =
  {
    EQUAL: 'EQUAL',
    LIKE: 'LIKE',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PartitionSpecification_Partition_PartitionValue_PartitionValueOp =
  | (typeof PartitionSpecification_Partition_PartitionValue_PartitionValueOp)[keyof typeof PartitionSpecification_Partition_PartitionValue_PartitionValueOp]
  | (string & {});

export interface CleanRoom {
  /**
   * The name of the clean room.
   * It should follow [UC securable naming requirements](https://docs.databricks.com/en/data-governance/unity-catalog/index.html#securable-object-naming-requirements).
   */
  name?: string | undefined;
  /**
   * Central clean room details. During creation, users need to specify
   * cloud_vendor, region, and collaborators.global_metastore_id.
   * This field will not be filled in the ListCleanRooms call.
   */
  remoteDetailedInfo?: CleanRoomRemoteDetail | undefined;
  /** This is the <Databricks> username of the owner of the local clean room securable for permission management. */
  owner?: string | undefined;
  comment?: string | undefined;
  /** When the clean room was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** When the clean room was last updated, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Clean room status. */
  status?: CleanRoom_Status_Enum | undefined;
  /** The alias of the collaborator tied to the local clean room. */
  localCollaboratorAlias?: string | undefined;
  /**
   * Output catalog of the clean room. It is an output only field. Output catalog is manipulated
   * using the separate CreateCleanRoomOutputCatalog API.
   */
  outputCatalog?: CleanRoomOutputCatalog | undefined;
  /** Whether clean room access is restricted due to [CSP](https://docs.databricks.com/en/security/privacy/security-profile.html) */
  accessRestricted?: CleanRoom_AccessRestricted | undefined;
  /**
   * Whether allow task to write to shared output schema.
   * When enabled, clean room task runs triggered by the current collaborator
   * can write to the run-scoped shared output schema which is accessible by all collaborators.
   */
  enableSharedOutput?: boolean | undefined;
}

/** Clean room status. */
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface CleanRoom_Status {}

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
  addedAt?: bigint | undefined;
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
   * This is the same format as returned by [workspace/export](https://docs.databricks.com/api/workspace/workspace/export) with the format of **HTML**.
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

export interface CleanRoomAutoApprovalRule {
  /** The name of the clean room this auto-approval rule belongs to. */
  cleanRoomName?: string | undefined;
  /** A generated UUID identifying the rule. */
  ruleId?: string | undefined;
  /** The owner of the rule to whom the rule applies. */
  ruleOwnerCollaboratorAlias?: string | undefined;
  /** The auto-approved notebook authors. For 2P, this can only be the other collaborator. */
  authors?:
    | {
        $case: 'authorCollaboratorAlias';
        /**
         * Collaborator alias of the author covered by the rule.
         * Only one of `author_collaborator_alias` and `author_scope` can be set.
         */
        authorCollaboratorAlias: string;
      }
    | {
        $case: 'authorScope';
        /**
         * Scope of authors covered by the rule.
         * Only one of `author_collaborator_alias` and `author_scope` can be set.
         */
        authorScope: CleanRoomAutoApprovalRule_AuthorScope;
      }
    | undefined;
  /** The auto-approved notebook runners. Initially, this can only be one specific runner. */
  runners?:
    | {
        $case: 'runnerCollaboratorAlias';
        /** Collaborator alias of the runner covered by the rule. */
        runnerCollaboratorAlias: string;
      }
    | undefined;
  /** Timestamp of when the rule was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
}

/** Publicly visible clean room collaborator. */
export interface CleanRoomCollaborator {
  /** The global Unity Catalog metastore ID of the collaborator. The identifier is of format cloud:region:metastore-uuid. */
  globalMetastoreId?: string | undefined;
  /**
   * [Organization name](:method:metastores/list#metastores-delta_sharing_organization_name)
   * configured in the metastore
   */
  organizationName?: string | undefined;
  /**
   * Workspace ID of the user who is receiving the clean room "invitation". Must be specified if
   * invite_recipient_email is specified.
   * It should be empty when the collaborator is the creator of the clean room.
   */
  inviteRecipientWorkspaceId?: bigint | undefined;
  /**
   * Email of the user who is receiving the clean room "invitation". It should be empty
   * for the creator of the clean room, and non-empty for the invitees of the clean room.
   * It is only returned in the output when clean room creator calls GET
   */
  inviteRecipientEmail?: string | undefined;
  /**
   * Collaborator alias specified by the clean room creator. It is unique across all collaborators of this clean room, and used to derive
   * multiple values internally such as catalog alias and clean room name for single metastore clean rooms.
   * It should follow [UC securable naming requirements](https://docs.databricks.com/en/data-governance/unity-catalog/index.html#securable-object-naming-requirements).
   */
  collaboratorAlias?: string | undefined;
  /**
   * Generated display name for the collaborator. In the case of a single metastore clean room, it is the clean
   * room name. For x-metastore clean rooms, it is the organization name of the metastore. It is not restricted to
   * these values and could change in the future
   */
  displayName?: string | undefined;
}

export interface CleanRoomNotebookReview {
  /** Collaborator alias of the reviewer */
  reviewerCollaboratorAlias?: string | undefined;
  /** When the review was submitted, in epoch milliseconds */
  createdAtMillis?: bigint | undefined;
  /** Review outcome */
  reviewState?: CleanRoomNotebookReview_NotebookReviewState | undefined;
  /** Review comment */
  comment?: string | undefined;
  /** Specified when the review was not explicitly made by a user */
  reviewSubReason?: CleanRoomNotebookReview_NotebookReviewSubReason | undefined;
}

/** Stores information about a single task run. */
export interface CleanRoomNotebookTaskRun {
  /** Asset name of the notebook executed in this task run. */
  notebookName?: string | undefined;
  /** When the task run started, in epoch milliseconds. */
  startTime?: bigint | undefined;
  /** Duration of the task run, in milliseconds. */
  runDuration?: bigint | undefined;
  /** State of the task run. */
  notebookJobRunState?: CleanRoomTaskRunState | undefined;
  /**
   * Job run info of the task in the runner's local workspace.
   * This field is only included in the LIST API.
   * if the task was run within the same workspace the API is being called.
   * If the task run was in a different workspace under the same metastore, only the workspace_id is included.
   */
  collaboratorJobRunInfo?: CollaboratorJobRunInfo | undefined;
  /** Name of the output schema associated with the clean rooms notebook task run. */
  outputSchemaName?: string | undefined;
  /** Expiration time of the output schema of the task run (if any), in epoch milliseconds. */
  outputSchemaExpirationTime?: bigint | undefined;
  /** Etag of the notebook executed in this task run, used to identify the notebook version. */
  notebookEtag?: string | undefined;
  /** The timestamp of when the notebook was last updated. */
  notebookUpdatedAt?: bigint | undefined;
  /**
   * Name of the shared output schema associated with the clean rooms notebook task run.
   * This schema is accessible by all collaborators when enable_shared_output is true.
   */
  sharedOutputSchemaName?: string | undefined;
  /** Expiration time of the shared output schema of the task run (if any), in epoch milliseconds. */
  sharedOutputSchemaExpirationTime?: bigint | undefined;
}

export interface CleanRoomOutputCatalog {
  status?: CleanRoomOutputCatalog_OutputCatalogStatus | undefined;
  /**
   * The name of the output catalog in UC.
   * It should follow [UC securable naming requirements](https://docs.databricks.com/en/data-governance/unity-catalog/index.html#securable-object-naming-requirements).
   * The field will always exist if status is CREATED.
   */
  catalogName?: string | undefined;
}

/** Publicly visible central clean room details. */
export interface CleanRoomRemoteDetail {
  /** Central clean room ID. */
  centralCleanRoomId?: string | undefined;
  /** Cloud vendor (aws,azure,gcp) of the central clean room. */
  cloudVendor?: string | undefined;
  /** Region of the central clean room. */
  region?: string | undefined;
  /**
   * Collaborators in the central clean room. There should one and only one collaborator
   * in the list that satisfies the owner condition:
   *
   * 1. It has the creator's global_metastore_id (determined by caller of CreateCleanRoom).
   *
   * 2. Its invite_recipient_email is empty.
   */
  collaborators?: CleanRoomCollaborator[] | undefined;
  /** Collaborator who creates the clean room. */
  creator?: CleanRoomCollaborator | undefined;
  /** Egress network policy to apply to the central clean room workspace. */
  egressNetworkPolicy?: EgressNetworkPolicy | undefined;
  complianceSecurityProfile?: ComplianceSecurityProfile | undefined;
  /**
   * Whether to enable shared output for the central clean room.
   * When enabled, clean room task runs can write to the run-scoped shared output schema
   * which is accessible by all collaborators.
   */
  enableSharedOutput?: boolean | undefined;
  /**
   * Alias of the provider collaborator. If set, packaged clean rooms mode is enabled.
   * The consumer's experience is restricted: they can view notebook names and READMEs,
   * add their own data assets, and trigger runs, but cannot view notebook code,
   * provider data assets, or notebook run output.
   */
  packageProviderCollaboratorAlias?: string | undefined;
}

/** Stores the run state of the clean rooms notebook task. */
export interface CleanRoomTaskRunState {
  /** A value indicating the run's current lifecycle state. This field is always available in the response. Note: Additional states might be introduced in future releases. */
  lifeCycleState?: CleanRoomTaskRunLifeCycleState | undefined;
  /** A value indicating the run's result. This field is only available for terminal lifecycle states. Note: Additional states might be introduced in future releases. */
  resultState?: CleanRoomTaskRunResultState | undefined;
}

export interface CollaboratorJobRunInfo {
  /** Job ID of the task run in the collaborator's workspace. */
  collaboratorJobId?: bigint | undefined;
  /** Job run ID of the task run in the collaborator's workspace. */
  collaboratorJobRunId?: bigint | undefined;
  /** Task run ID of the task run in the collaborator's workspace. */
  collaboratorTaskRunId?: bigint | undefined;
  /** ID of the collaborator's workspace that triggered the task run. */
  collaboratorWorkspaceId?: bigint | undefined;
  /** Alias of the collaborator that triggered the task run. */
  collaboratorAlias?: string | undefined;
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

/** The compliance security profile used to process regulated data following compliance standards. */
export interface ComplianceSecurityProfile {
  /** Whether the compliance security profile is enabled. */
  isEnabled?: boolean | undefined;
  /** The list of compliance standards that the compliance security profile is configured to enforce. */
  complianceStandards?: ComplianceStandard[] | undefined;
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

export interface CreateCleanRoomAutoApprovalRuleRequest {
  autoApprovalRule?: CleanRoomAutoApprovalRule | undefined;
}

export interface CreateCleanRoomOutputCatalogRequest {
  /** Name of the clean room. */
  cleanRoomName?: string | undefined;
  outputCatalog?: CleanRoomOutputCatalog | undefined;
}

export interface CreateCleanRoomOutputCatalogResponse {
  outputCatalog?: CleanRoomOutputCatalog | undefined;
}

export interface CreateCleanRoomRequest {
  cleanRoom?: CleanRoom | undefined;
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

export interface DeleteCleanRoomAutoApprovalRuleRequest {
  cleanRoomName?: string | undefined;
  ruleId?: string | undefined;
}

export interface DeleteCleanRoomRequest {
  /** Name of the clean room. */
  name?: string | undefined;
}

/**
 * The network policies applying for egress traffic.
 * This message is used by the UI/REST API. We translate this message to the format expected by the
 * dataplane in Lakehouse Network Manager (for the format expected by the dataplane,
 * see networkconfig.textproto).
 */
export interface EgressNetworkPolicy {
  /** The access policy enforced for egress traffic to the internet. */
  internetAccess?: EgressNetworkPolicy_InternetAccessPolicy | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_InternetAccessPolicy {
  restrictionMode?:
    | EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode
    | undefined;
  allowedInternetDestinations?:
    | EgressNetworkPolicy_InternetAccessPolicy_InternetDestination[]
    | undefined;
  allowedStorageDestinations?:
    | EgressNetworkPolicy_InternetAccessPolicy_StorageDestination[]
    | undefined;
  /** Optional. If not specified, assume the policy is enforced for all workloads. */
  logOnlyMode?:
    | EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode
    | undefined;
}

/**
 * Users can specify accessible internet destinations when outbound access is restricted.
 * We only support domain name (FQDN) destinations for the time being,
 * though going forwards we want to support host names and IP addresses.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_InternetAccessPolicy_InternetDestination {
  destination?: string | undefined;
  type?:
    | EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType
    | undefined;
  protocol?:
    | EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode {
  logOnlyModeType?:
    | EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType
    | undefined;
  workloads?:
    | EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType[]
    | undefined;
}

/** Users can specify accessible storage destinations. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_InternetAccessPolicy_StorageDestination {
  bucketName?: string | undefined;
  region?: string | undefined;
  type?:
    | EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType
    | undefined;
  azureStorageAccount?: string | undefined;
  allowedPaths?: string[] | undefined;
  azureStorageService?: string | undefined;
  azureDnsZone?: string | undefined;
  azureContainer?: string | undefined;
}

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

export interface GetCleanRoomAutoApprovalRuleRequest {
  cleanRoomName?: string | undefined;
  ruleId?: string | undefined;
}

export interface GetCleanRoomRequest {
  name?: string | undefined;
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

export interface ListCleanRoomAutoApprovalRulesRequest {
  cleanRoomName?: string | undefined;
  /** Maximum number of auto-approval rules to return. Defaults to 100. */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListCleanRoomAutoApprovalRulesResponse {
  rules?: CleanRoomAutoApprovalRule[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * page_token should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListCleanRoomNotebookTaskRunsRequest {
  /** Name of the clean room. */
  cleanRoomName?: string | undefined;
  /** Notebook name */
  notebookName?: string | undefined;
  /** The maximum number of task runs to return. Currently ignored - all runs will be returned. */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListCleanRoomNotebookTaskRunsResponse {
  /** Name of the clean room. */
  runs?: CleanRoomNotebookTaskRun[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * page_token should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListCleanRoomsRequest {
  /** Maximum number of clean rooms to return (i.e., the page length). Defaults to 100. */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListCleanRoomsResponse {
  cleanRooms?: CleanRoom[] | undefined;
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

export interface UpdateCleanRoomAutoApprovalRuleRequest {
  /** The auto-approval rule to update. The rule_id field is used to identify the rule to update. */
  autoApprovalRule?: CleanRoomAutoApprovalRule | undefined;
}

export interface UpdateCleanRoomRequest {
  /** Name of the clean room. */
  name?: string | undefined;
  cleanRoom?: CleanRoom | undefined;
}

export const unmarshalCleanRoomSchema: z.ZodType<CleanRoom> = z
  .object({
    name: z.string().optional(),
    remote_detailed_info: z
      .lazy(() => unmarshalCleanRoomRemoteDetailSchema)
      .optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    updated_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    status: z.string().optional(),
    local_collaborator_alias: z.string().optional(),
    output_catalog: z
      .lazy(() => unmarshalCleanRoomOutputCatalogSchema)
      .optional(),
    access_restricted: z.string().optional(),
    enable_shared_output: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    remoteDetailedInfo: d.remote_detailed_info,
    owner: d.owner,
    comment: d.comment,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    status: d.status,
    localCollaboratorAlias: d.local_collaborator_alias,
    outputCatalog: d.output_catalog,
    accessRestricted: d.access_restricted,
    enableSharedOutput: d.enable_shared_output,
  }));

export const unmarshalCleanRoomAssetSchema: z.ZodType<CleanRoomAsset> = z
  .object({
    clean_room_name: z.string().optional(),
    name: z.string().optional(),
    asset_type: z.string().optional(),
    added_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    status: z.string().optional(),
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
      review_state: z.string().optional(),
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

export const unmarshalCleanRoomAutoApprovalRuleSchema: z.ZodType<CleanRoomAutoApprovalRule> =
  z
    .object({
      clean_room_name: z.string().optional(),
      rule_id: z.string().optional(),
      rule_owner_collaborator_alias: z.string().optional(),
      author_collaborator_alias: z.string().optional(),
      author_scope: z.string().optional(),
      runner_collaborator_alias: z.string().optional(),
      created_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      cleanRoomName: d.clean_room_name,
      ruleId: d.rule_id,
      ruleOwnerCollaboratorAlias: d.rule_owner_collaborator_alias,
      authors:
        d.author_collaborator_alias !== undefined
          ? {
              $case: 'authorCollaboratorAlias' as const,
              authorCollaboratorAlias: d.author_collaborator_alias,
            }
          : d.author_scope !== undefined
            ? {$case: 'authorScope' as const, authorScope: d.author_scope}
            : undefined,
      runners:
        d.runner_collaborator_alias !== undefined
          ? {
              $case: 'runnerCollaboratorAlias' as const,
              runnerCollaboratorAlias: d.runner_collaborator_alias,
            }
          : undefined,
      createdAt: d.created_at,
    }));

export const unmarshalCleanRoomCollaboratorSchema: z.ZodType<CleanRoomCollaborator> =
  z
    .object({
      global_metastore_id: z.string().optional(),
      organization_name: z.string().optional(),
      invite_recipient_workspace_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      invite_recipient_email: z.string().optional(),
      collaborator_alias: z.string().optional(),
      display_name: z.string().optional(),
    })
    .transform(d => ({
      globalMetastoreId: d.global_metastore_id,
      organizationName: d.organization_name,
      inviteRecipientWorkspaceId: d.invite_recipient_workspace_id,
      inviteRecipientEmail: d.invite_recipient_email,
      collaboratorAlias: d.collaborator_alias,
      displayName: d.display_name,
    }));

export const unmarshalCleanRoomNotebookReviewSchema: z.ZodType<CleanRoomNotebookReview> =
  z
    .object({
      reviewer_collaborator_alias: z.string().optional(),
      created_at_millis: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      review_state: z.string().optional(),
      comment: z.string().optional(),
      review_sub_reason: z.string().optional(),
    })
    .transform(d => ({
      reviewerCollaboratorAlias: d.reviewer_collaborator_alias,
      createdAtMillis: d.created_at_millis,
      reviewState: d.review_state,
      comment: d.comment,
      reviewSubReason: d.review_sub_reason,
    }));

export const unmarshalCleanRoomNotebookTaskRunSchema: z.ZodType<CleanRoomNotebookTaskRun> =
  z
    .object({
      notebook_name: z.string().optional(),
      start_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      run_duration: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      notebook_job_run_state: z
        .lazy(() => unmarshalCleanRoomTaskRunStateSchema)
        .optional(),
      collaborator_job_run_info: z
        .lazy(() => unmarshalCollaboratorJobRunInfoSchema)
        .optional(),
      output_schema_name: z.string().optional(),
      output_schema_expiration_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      notebook_etag: z.string().optional(),
      notebook_updated_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      shared_output_schema_name: z.string().optional(),
      shared_output_schema_expiration_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      notebookName: d.notebook_name,
      startTime: d.start_time,
      runDuration: d.run_duration,
      notebookJobRunState: d.notebook_job_run_state,
      collaboratorJobRunInfo: d.collaborator_job_run_info,
      outputSchemaName: d.output_schema_name,
      outputSchemaExpirationTime: d.output_schema_expiration_time,
      notebookEtag: d.notebook_etag,
      notebookUpdatedAt: d.notebook_updated_at,
      sharedOutputSchemaName: d.shared_output_schema_name,
      sharedOutputSchemaExpirationTime: d.shared_output_schema_expiration_time,
    }));

export const unmarshalCleanRoomOutputCatalogSchema: z.ZodType<CleanRoomOutputCatalog> =
  z
    .object({
      status: z.string().optional(),
      catalog_name: z.string().optional(),
    })
    .transform(d => ({
      status: d.status,
      catalogName: d.catalog_name,
    }));

export const unmarshalCleanRoomRemoteDetailSchema: z.ZodType<CleanRoomRemoteDetail> =
  z
    .object({
      central_clean_room_id: z.string().optional(),
      cloud_vendor: z.string().optional(),
      region: z.string().optional(),
      collaborators: z
        .array(z.lazy(() => unmarshalCleanRoomCollaboratorSchema))
        .optional(),
      creator: z.lazy(() => unmarshalCleanRoomCollaboratorSchema).optional(),
      egress_network_policy: z
        .lazy(() => unmarshalEgressNetworkPolicySchema)
        .optional(),
      compliance_security_profile: z
        .lazy(() => unmarshalComplianceSecurityProfileSchema)
        .optional(),
      enable_shared_output: z.boolean().optional(),
      package_provider_collaborator_alias: z.string().optional(),
    })
    .transform(d => ({
      centralCleanRoomId: d.central_clean_room_id,
      cloudVendor: d.cloud_vendor,
      region: d.region,
      collaborators: d.collaborators,
      creator: d.creator,
      egressNetworkPolicy: d.egress_network_policy,
      complianceSecurityProfile: d.compliance_security_profile,
      enableSharedOutput: d.enable_shared_output,
      packageProviderCollaboratorAlias: d.package_provider_collaborator_alias,
    }));

export const unmarshalCleanRoomTaskRunStateSchema: z.ZodType<CleanRoomTaskRunState> =
  z
    .object({
      life_cycle_state: z.string().optional(),
      result_state: z.string().optional(),
    })
    .transform(d => ({
      lifeCycleState: d.life_cycle_state,
      resultState: d.result_state,
    }));

export const unmarshalCollaboratorJobRunInfoSchema: z.ZodType<CollaboratorJobRunInfo> =
  z
    .object({
      collaborator_job_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      collaborator_job_run_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      collaborator_task_run_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      collaborator_workspace_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      collaborator_alias: z.string().optional(),
    })
    .transform(d => ({
      collaboratorJobId: d.collaborator_job_id,
      collaboratorJobRunId: d.collaborator_job_run_id,
      collaboratorTaskRunId: d.collaborator_task_run_id,
      collaboratorWorkspaceId: d.collaborator_workspace_id,
      collaboratorAlias: d.collaborator_alias,
    }));

export const unmarshalColumnInfoSchema: z.ZodType<ColumnInfo> = z
  .object({
    name: z.string().optional(),
    type_text: z.string().optional(),
    type_name: z.string().optional(),
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

export const unmarshalComplianceSecurityProfileSchema: z.ZodType<ComplianceSecurityProfile> =
  z
    .object({
      is_enabled: z.boolean().optional(),
      compliance_standards: z.array(z.string()).optional(),
    })
    .transform(d => ({
      isEnabled: d.is_enabled,
      complianceStandards: d.compliance_standards,
    }));

export const unmarshalCreateCleanRoomAssetReviewResponseSchema: z.ZodType<CreateCleanRoomAssetReviewResponse> =
  z
    .object({
      notebook_reviews: z
        .array(z.lazy(() => unmarshalCleanRoomNotebookReviewSchema))
        .optional(),
      notebook_review_state: z.string().optional(),
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

export const unmarshalCreateCleanRoomOutputCatalogResponseSchema: z.ZodType<CreateCleanRoomOutputCatalogResponse> =
  z
    .object({
      output_catalog: z
        .lazy(() => unmarshalCleanRoomOutputCatalogSchema)
        .optional(),
    })
    .transform(d => ({
      outputCatalog: d.output_catalog,
    }));

export const unmarshalDeleteCleanRoomAssetResponseSchema: z.ZodType<DeleteCleanRoomAssetResponse> =
  z.object({});

export const unmarshalEgressNetworkPolicySchema: z.ZodType<EgressNetworkPolicy> =
  z
    .object({
      internet_access: z
        .lazy(() => unmarshalEgressNetworkPolicy_InternetAccessPolicySchema)
        .optional(),
    })
    .transform(d => ({
      internetAccess: d.internet_access,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_InternetAccessPolicySchema: z.ZodType<EgressNetworkPolicy_InternetAccessPolicy> =
  z
    .object({
      restriction_mode: z.string().optional(),
      allowed_internet_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_InternetAccessPolicy_InternetDestinationSchema
          )
        )
        .optional(),
      allowed_storage_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_InternetAccessPolicy_StorageDestinationSchema
          )
        )
        .optional(),
      log_only_mode: z
        .lazy(
          () =>
            unmarshalEgressNetworkPolicy_InternetAccessPolicy_LogOnlyModeSchema
        )
        .optional(),
    })
    .transform(d => ({
      restrictionMode: d.restriction_mode,
      allowedInternetDestinations: d.allowed_internet_destinations,
      allowedStorageDestinations: d.allowed_storage_destinations,
      logOnlyMode: d.log_only_mode,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_InternetAccessPolicy_InternetDestinationSchema: z.ZodType<EgressNetworkPolicy_InternetAccessPolicy_InternetDestination> =
  z
    .object({
      destination: z.string().optional(),
      type: z.string().optional(),
      protocol: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
      type: d.type,
      protocol: d.protocol,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_InternetAccessPolicy_LogOnlyModeSchema: z.ZodType<EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode> =
  z
    .object({
      log_only_mode_type: z.string().optional(),
      workloads: z.array(z.string()).optional(),
    })
    .transform(d => ({
      logOnlyModeType: d.log_only_mode_type,
      workloads: d.workloads,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_InternetAccessPolicy_StorageDestinationSchema: z.ZodType<EgressNetworkPolicy_InternetAccessPolicy_StorageDestination> =
  z
    .object({
      bucket_name: z.string().optional(),
      region: z.string().optional(),
      type: z.string().optional(),
      azure_storage_account: z.string().optional(),
      allowed_paths: z.array(z.string()).optional(),
      azure_storage_service: z.string().optional(),
      azure_dns_zone: z.string().optional(),
      azure_container: z.string().optional(),
    })
    .transform(d => ({
      bucketName: d.bucket_name,
      region: d.region,
      type: d.type,
      azureStorageAccount: d.azure_storage_account,
      allowedPaths: d.allowed_paths,
      azureStorageService: d.azure_storage_service,
      azureDnsZone: d.azure_dns_zone,
      azureContainer: d.azure_container,
    }));

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

export const unmarshalListCleanRoomAutoApprovalRulesResponseSchema: z.ZodType<ListCleanRoomAutoApprovalRulesResponse> =
  z
    .object({
      rules: z
        .array(z.lazy(() => unmarshalCleanRoomAutoApprovalRuleSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      rules: d.rules,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListCleanRoomNotebookTaskRunsResponseSchema: z.ZodType<ListCleanRoomNotebookTaskRunsResponse> =
  z
    .object({
      runs: z
        .array(z.lazy(() => unmarshalCleanRoomNotebookTaskRunSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      runs: d.runs,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListCleanRoomsResponseSchema: z.ZodType<ListCleanRoomsResponse> =
  z
    .object({
      clean_rooms: z.array(z.lazy(() => unmarshalCleanRoomSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      cleanRooms: d.clean_rooms,
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
      op: z.string().optional(),
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

export const marshalCleanRoomSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    remoteDetailedInfo: z
      .lazy(() => marshalCleanRoomRemoteDetailSchema)
      .optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    createdAt: z.bigint().optional(),
    updatedAt: z.bigint().optional(),
    status: z.string().optional(),
    localCollaboratorAlias: z.string().optional(),
    outputCatalog: z.lazy(() => marshalCleanRoomOutputCatalogSchema).optional(),
    accessRestricted: z.string().optional(),
    enableSharedOutput: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    remote_detailed_info: d.remoteDetailedInfo,
    owner: d.owner,
    comment: d.comment,
    created_at: d.createdAt,
    updated_at: d.updatedAt,
    status: d.status,
    local_collaborator_alias: d.localCollaboratorAlias,
    output_catalog: d.outputCatalog,
    access_restricted: d.accessRestricted,
    enable_shared_output: d.enableSharedOutput,
  }));

export const marshalCleanRoomAssetSchema: z.ZodType = z
  .object({
    cleanRoomName: z.string().optional(),
    name: z.string().optional(),
    assetType: z.string().optional(),
    addedAt: z.bigint().optional(),
    status: z.string().optional(),
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
    reviewState: z.string().optional(),
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

export const marshalCleanRoomAutoApprovalRuleSchema: z.ZodType = z
  .object({
    cleanRoomName: z.string().optional(),
    ruleId: z.string().optional(),
    ruleOwnerCollaboratorAlias: z.string().optional(),
    authors: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('authorCollaboratorAlias'),
          authorCollaboratorAlias: z.string(),
        }),
        z.object({$case: z.literal('authorScope'), authorScope: z.string()}),
      ])
      .optional(),
    runners: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('runnerCollaboratorAlias'),
          runnerCollaboratorAlias: z.string(),
        }),
      ])
      .optional(),
    createdAt: z.bigint().optional(),
  })
  .transform(d => ({
    clean_room_name: d.cleanRoomName,
    rule_id: d.ruleId,
    rule_owner_collaborator_alias: d.ruleOwnerCollaboratorAlias,
    ...(d.authors?.$case === 'authorCollaboratorAlias' && {
      author_collaborator_alias: d.authors.authorCollaboratorAlias,
    }),
    ...(d.authors?.$case === 'authorScope' && {
      author_scope: d.authors.authorScope,
    }),
    ...(d.runners?.$case === 'runnerCollaboratorAlias' && {
      runner_collaborator_alias: d.runners.runnerCollaboratorAlias,
    }),
    created_at: d.createdAt,
  }));

export const marshalCleanRoomCollaboratorSchema: z.ZodType = z
  .object({
    globalMetastoreId: z.string().optional(),
    organizationName: z.string().optional(),
    inviteRecipientWorkspaceId: z.bigint().optional(),
    inviteRecipientEmail: z.string().optional(),
    collaboratorAlias: z.string().optional(),
    displayName: z.string().optional(),
  })
  .transform(d => ({
    global_metastore_id: d.globalMetastoreId,
    organization_name: d.organizationName,
    invite_recipient_workspace_id: d.inviteRecipientWorkspaceId,
    invite_recipient_email: d.inviteRecipientEmail,
    collaborator_alias: d.collaboratorAlias,
    display_name: d.displayName,
  }));

export const marshalCleanRoomNotebookReviewSchema: z.ZodType = z
  .object({
    reviewerCollaboratorAlias: z.string().optional(),
    createdAtMillis: z.bigint().optional(),
    reviewState: z.string().optional(),
    comment: z.string().optional(),
    reviewSubReason: z.string().optional(),
  })
  .transform(d => ({
    reviewer_collaborator_alias: d.reviewerCollaboratorAlias,
    created_at_millis: d.createdAtMillis,
    review_state: d.reviewState,
    comment: d.comment,
    review_sub_reason: d.reviewSubReason,
  }));

export const marshalCleanRoomOutputCatalogSchema: z.ZodType = z
  .object({
    status: z.string().optional(),
    catalogName: z.string().optional(),
  })
  .transform(d => ({
    status: d.status,
    catalog_name: d.catalogName,
  }));

export const marshalCleanRoomRemoteDetailSchema: z.ZodType = z
  .object({
    centralCleanRoomId: z.string().optional(),
    cloudVendor: z.string().optional(),
    region: z.string().optional(),
    collaborators: z
      .array(z.lazy(() => marshalCleanRoomCollaboratorSchema))
      .optional(),
    creator: z.lazy(() => marshalCleanRoomCollaboratorSchema).optional(),
    egressNetworkPolicy: z
      .lazy(() => marshalEgressNetworkPolicySchema)
      .optional(),
    complianceSecurityProfile: z
      .lazy(() => marshalComplianceSecurityProfileSchema)
      .optional(),
    enableSharedOutput: z.boolean().optional(),
    packageProviderCollaboratorAlias: z.string().optional(),
  })
  .transform(d => ({
    central_clean_room_id: d.centralCleanRoomId,
    cloud_vendor: d.cloudVendor,
    region: d.region,
    collaborators: d.collaborators,
    creator: d.creator,
    egress_network_policy: d.egressNetworkPolicy,
    compliance_security_profile: d.complianceSecurityProfile,
    enable_shared_output: d.enableSharedOutput,
    package_provider_collaborator_alias: d.packageProviderCollaboratorAlias,
  }));

export const marshalColumnInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    typeText: z.string().optional(),
    typeName: z.string().optional(),
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

export const marshalComplianceSecurityProfileSchema: z.ZodType = z
  .object({
    isEnabled: z.boolean().optional(),
    complianceStandards: z.array(z.string()).optional(),
  })
  .transform(d => ({
    is_enabled: d.isEnabled,
    compliance_standards: d.complianceStandards,
  }));

export const marshalCreateCleanRoomAssetReviewRequestSchema: z.ZodType = z
  .object({
    cleanRoomName: z.string().optional(),
    name: z.string().optional(),
    assetType: z.string().optional(),
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

export const marshalCreateCleanRoomAutoApprovalRuleRequestSchema: z.ZodType = z
  .object({
    autoApprovalRule: z
      .lazy(() => marshalCleanRoomAutoApprovalRuleSchema)
      .optional(),
  })
  .transform(d => ({
    auto_approval_rule: d.autoApprovalRule,
  }));

export const marshalEgressNetworkPolicySchema: z.ZodType = z
  .object({
    internetAccess: z
      .lazy(() => marshalEgressNetworkPolicy_InternetAccessPolicySchema)
      .optional(),
  })
  .transform(d => ({
    internet_access: d.internetAccess,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_InternetAccessPolicySchema: z.ZodType =
  z
    .object({
      restrictionMode: z.string().optional(),
      allowedInternetDestinations: z
        .array(
          z.lazy(
            () =>
              marshalEgressNetworkPolicy_InternetAccessPolicy_InternetDestinationSchema
          )
        )
        .optional(),
      allowedStorageDestinations: z
        .array(
          z.lazy(
            () =>
              marshalEgressNetworkPolicy_InternetAccessPolicy_StorageDestinationSchema
          )
        )
        .optional(),
      logOnlyMode: z
        .lazy(
          () =>
            marshalEgressNetworkPolicy_InternetAccessPolicy_LogOnlyModeSchema
        )
        .optional(),
    })
    .transform(d => ({
      restriction_mode: d.restrictionMode,
      allowed_internet_destinations: d.allowedInternetDestinations,
      allowed_storage_destinations: d.allowedStorageDestinations,
      log_only_mode: d.logOnlyMode,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_InternetAccessPolicy_InternetDestinationSchema: z.ZodType =
  z
    .object({
      destination: z.string().optional(),
      type: z.string().optional(),
      protocol: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
      type: d.type,
      protocol: d.protocol,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_InternetAccessPolicy_LogOnlyModeSchema: z.ZodType =
  z
    .object({
      logOnlyModeType: z.string().optional(),
      workloads: z.array(z.string()).optional(),
    })
    .transform(d => ({
      log_only_mode_type: d.logOnlyModeType,
      workloads: d.workloads,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_InternetAccessPolicy_StorageDestinationSchema: z.ZodType =
  z
    .object({
      bucketName: z.string().optional(),
      region: z.string().optional(),
      type: z.string().optional(),
      azureStorageAccount: z.string().optional(),
      allowedPaths: z.array(z.string()).optional(),
      azureStorageService: z.string().optional(),
      azureDnsZone: z.string().optional(),
      azureContainer: z.string().optional(),
    })
    .transform(d => ({
      bucket_name: d.bucketName,
      region: d.region,
      type: d.type,
      azure_storage_account: d.azureStorageAccount,
      allowed_paths: d.allowedPaths,
      azure_storage_service: d.azureStorageService,
      azure_dns_zone: d.azureDnsZone,
      azure_container: d.azureContainer,
    }));

export const marshalNotebookVersionReviewSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    reviewState: z.string().optional(),
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
      op: z.string().optional(),
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

export const marshalUpdateCleanRoomRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    cleanRoom: z.lazy(() => marshalCleanRoomSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    clean_room: d.cleanRoom,
  }));
