// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Compliance standard for SHIELD customers. See README.md for how instructions of how to add new standards. */
export enum ComplianceStandard {
  /** Sentinel value, should not be used in prod */
  COMPLIANCE_STANDARD_UNSPECIFIED = 'COMPLIANCE_STANDARD_UNSPECIFIED',
  /**
   * For customers who buy Enhanced Security Compliance (ESC) product
   * but don't belong to any standards.
   */
  NONE = 'NONE',
  /** Industry standards below */
  HIPAA = 'HIPAA',
  PCI_DSS = 'PCI_DSS',
  FEDRAMP_MODERATE = 'FEDRAMP_MODERATE',
  IRAP_PROTECTED = 'IRAP_PROTECTED',
  /** Only available in AWS GovCloud */
  FEDRAMP_HIGH = 'FEDRAMP_HIGH',
  FEDRAMP_IL5 = 'FEDRAMP_IL5',
  /** International Traffic in Arms Regulations (ITAR); Export Administration Regulations (EAR) */
  ITAR_EAR = 'ITAR_EAR',
  /** UK Cyber Essential Plus */
  CYBER_ESSENTIAL_PLUS = 'CYBER_ESSENTIAL_PLUS',
  /**
   * The Government of Canada (GC) Protected B
   * https://www.tpsgc-pwgsc.gc.ca/esc-src/protection-safeguarding/niveaux-levels-eng.html
   */
  CANADA_PROTECTED_B = 'CANADA_PROTECTED_B',
  /**
   * Japan Information system Security Management and Assessment Program
   * https://www.ismap.go.jp/csm?id=kb_article_view&sysparm_article=KB0010301&sys_kb_id=9b6741cec305821032713201150131c2&spa=1
   */
  ISMAP = 'ISMAP',
  /**
   * HITRUST
   * https://hitrustalliance.net/
   */
  HITRUST = 'HITRUST',
  /** Korea Financial Security Institute */
  K_FSI = 'K_FSI',
  /** Cloud Computing Compliance Criteria Catalogue for Germany */
  GERMANY_C5 = 'GERMANY_C5',
  /** Trusted Information Security Assessment Exchange, a compliance standard for automotive industry for Germany */
  GERMANY_TISAX = 'GERMANY_TISAX',
  /**
   * Acceptable Risk Controls for ACA, Medicaid, and Partner Entities
   * from the Centers for Medicare & Medicaid Services (CMS)
   */
  ARC_AMPE = 'ARC_AMPE',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CleanRoom_AccessRestricted {
  NO_RESTRICTION = 'NO_RESTRICTION',
  CSP_MISMATCH = 'CSP_MISMATCH',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CleanRoom_Status_Enum {
  ENUM_UNSPECIFIED = 'ENUM_UNSPECIFIED',
  ACTIVE = 'ACTIVE',
  PROVISIONING = 'PROVISIONING',
  DELETED = 'DELETED',
  FAILED = 'FAILED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CleanRoomOutputCatalog_OutputCatalogStatus {
  OUTPUT_CATALOG_STATUS_UNSPECIFIED = 'OUTPUT_CATALOG_STATUS_UNSPECIFIED',
  /** The clean room is not eligible for output catalog. */
  NOT_ELIGIBLE = 'NOT_ELIGIBLE',
  /** The output catalog of the clean room is not yet created. */
  NOT_CREATED = 'NOT_CREATED',
  /** The output catalog of the clean room is created. */
  CREATED = 'CREATED',
}

/**
 * The filtering protocol used by the DP. For private and public preview, SEG will only
 * support TCP filtering (i.e. DNS based filtering, filtering by destination IP address),
 * so protocol will be set to TCP by default and hidden from the user. In the future, users
 * may be able to select HTTP filtering (i.e. SNI based filtering, filtering by FQDN).
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol {
  INTERNET_DESTINATION_FILTERING_PROTOCOL_UNSPECIFIED = 'INTERNET_DESTINATION_FILTERING_PROTOCOL_UNSPECIFIED',
  TCP = 'TCP',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType {
  INTERNET_DESTINATION_TYPE_UNSPECIFIED = 'INTERNET_DESTINATION_TYPE_UNSPECIFIED',
  FQDN = 'FQDN',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType {
  LOG_ONLY_MODE_TYPE_UNSPECIFIED = 'LOG_ONLY_MODE_TYPE_UNSPECIFIED',
  ALL_SERVICES = 'ALL_SERVICES',
  SELECTED_SERVICES = 'SELECTED_SERVICES',
}

/** The values should match the list of workloads used in networkconfig.proto */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType {
  WORKLOAD_TYPE_UNSPECIFIED = 'WORKLOAD_TYPE_UNSPECIFIED',
  DBSQL = 'DBSQL',
  ML_SERVING = 'ML_SERVING',
}

/**
 * At which level can <Databricks> and <Databricks> managed compute access Internet.
 * FULL_ACCESS: <Databricks> can access Internet. No blocking rules will apply.
 * RESTRICTED_ACCESS: <Databricks> can only access explicitly allowed internet and storage destinations,
 * as well as UC connections and external locations.
 * PRIVATE_ACCESS_ONLY (not used): <Databricks> can only access destinations via private link.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode {
  RESTRICTION_MODE_UNSPECIFIED = 'RESTRICTION_MODE_UNSPECIFIED',
  FULL_ACCESS = 'FULL_ACCESS',
  PRIVATE_ACCESS_ONLY = 'PRIVATE_ACCESS_ONLY',
  RESTRICTED_ACCESS = 'RESTRICTED_ACCESS',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType {
  STORAGE_DESTINATION_TYPE_UNSPECIFIED = 'STORAGE_DESTINATION_TYPE_UNSPECIFIED',
  AWS_S3 = 'AWS_S3',
  CLOUDFLARE_R2 = 'CLOUDFLARE_R2',
  AZURE_STORAGE = 'AZURE_STORAGE',
  GOOGLE_CLOUD_STORAGE = 'GOOGLE_CLOUD_STORAGE',
}

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
  createdAt?: number | undefined;
  /** When the clean room was last updated, in epoch milliseconds. */
  updatedAt?: number | undefined;
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
   * TODO: deprecate this field once shared output PrPr is finalized
   */
  enableSharedOutput?: boolean | undefined;
}

/** Clean room status. */
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface CleanRoom_Status {}

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
  inviteRecipientWorkspaceId?: number | undefined;
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
}

/** The compliance security profile used to process regulated data following compliance standards. */
export interface ComplianceSecurityProfile {
  /** Whether the compliance security profile is enabled. */
  isEnabled?: boolean | undefined;
  /** The list of compliance standards that the compliance security profile is configured to enforce. */
  complianceStandards?: ComplianceStandard[] | undefined;
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

export interface GetCleanRoomRequest {
  name?: string | undefined;
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
    created_at: z.number().optional(),
    updated_at: z.number().optional(),
    status: z.enum(CleanRoom_Status_Enum).optional(),
    local_collaborator_alias: z.string().optional(),
    output_catalog: z
      .lazy(() => unmarshalCleanRoomOutputCatalogSchema)
      .optional(),
    access_restricted: z.enum(CleanRoom_AccessRestricted).optional(),
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

export const unmarshalCleanRoomCollaboratorSchema: z.ZodType<CleanRoomCollaborator> =
  z
    .object({
      global_metastore_id: z.string().optional(),
      organization_name: z.string().optional(),
      invite_recipient_workspace_id: z.number().optional(),
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

export const unmarshalCleanRoomOutputCatalogSchema: z.ZodType<CleanRoomOutputCatalog> =
  z
    .object({
      status: z.enum(CleanRoomOutputCatalog_OutputCatalogStatus).optional(),
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
    })
    .transform(d => ({
      centralCleanRoomId: d.central_clean_room_id,
      cloudVendor: d.cloud_vendor,
      region: d.region,
      collaborators: d.collaborators,
      creator: d.creator,
      egressNetworkPolicy: d.egress_network_policy,
      complianceSecurityProfile: d.compliance_security_profile,
    }));

export const unmarshalComplianceSecurityProfileSchema: z.ZodType<ComplianceSecurityProfile> =
  z
    .object({
      is_enabled: z.boolean().optional(),
      compliance_standards: z.array(z.enum(ComplianceStandard)).optional(),
    })
    .transform(d => ({
      isEnabled: d.is_enabled,
      complianceStandards: d.compliance_standards,
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
      restriction_mode: z
        .enum(EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode)
        .optional(),
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
      type: z
        .enum(
          EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType
        )
        .optional(),
      protocol: z
        .enum(
          EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol
        )
        .optional(),
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
      log_only_mode_type: z
        .enum(
          EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType
        )
        .optional(),
      workloads: z
        .array(
          z.enum(
            EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType
          )
        )
        .optional(),
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
      type: z
        .enum(
          EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType
        )
        .optional(),
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

export const marshalCleanRoomSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    remoteDetailedInfo: z
      .lazy(() => marshalCleanRoomRemoteDetailSchema)
      .optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    createdAt: z.number().optional(),
    updatedAt: z.number().optional(),
    status: z.enum(CleanRoom_Status_Enum).optional(),
    localCollaboratorAlias: z.string().optional(),
    outputCatalog: z.lazy(() => marshalCleanRoomOutputCatalogSchema).optional(),
    accessRestricted: z.enum(CleanRoom_AccessRestricted).optional(),
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

export const marshalCleanRoomCollaboratorSchema: z.ZodType = z
  .object({
    globalMetastoreId: z.string().optional(),
    organizationName: z.string().optional(),
    inviteRecipientWorkspaceId: z.number().optional(),
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

export const marshalCleanRoomOutputCatalogSchema: z.ZodType = z
  .object({
    status: z.enum(CleanRoomOutputCatalog_OutputCatalogStatus).optional(),
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
  })
  .transform(d => ({
    central_clean_room_id: d.centralCleanRoomId,
    cloud_vendor: d.cloudVendor,
    region: d.region,
    collaborators: d.collaborators,
    creator: d.creator,
    egress_network_policy: d.egressNetworkPolicy,
    compliance_security_profile: d.complianceSecurityProfile,
  }));

export const marshalComplianceSecurityProfileSchema: z.ZodType = z
  .object({
    isEnabled: z.boolean().optional(),
    complianceStandards: z.array(z.enum(ComplianceStandard)).optional(),
  })
  .transform(d => ({
    is_enabled: d.isEnabled,
    compliance_standards: d.complianceStandards,
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
      restrictionMode: z
        .enum(EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode)
        .optional(),
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
      type: z
        .enum(
          EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType
        )
        .optional(),
      protocol: z
        .enum(
          EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol
        )
        .optional(),
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
      logOnlyModeType: z
        .enum(
          EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType
        )
        .optional(),
      workloads: z
        .array(
          z.enum(
            EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType
          )
        )
        .optional(),
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
      type: z
        .enum(
          EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType
        )
        .optional(),
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

export const marshalUpdateCleanRoomRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    cleanRoom: z.lazy(() => marshalCleanRoomSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    clean_room: d.cleanRoom,
  }));
