// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
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
export enum AibiDashboardEmbeddingAccessPolicy_AccessPolicyType {
  ACCESS_POLICY_TYPE_UNSPECIFIED = 'ACCESS_POLICY_TYPE_UNSPECIFIED',
  ALLOW_ALL_DOMAINS = 'ALLOW_ALL_DOMAINS',
  ALLOW_APPROVED_DOMAINS = 'ALLOW_APPROVED_DOMAINS',
  DENY_ALL_DOMAINS = 'DENY_ALL_DOMAINS',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek {
  DAY_OF_WEEK_UNSPECIFIED = 'DAY_OF_WEEK_UNSPECIFIED',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency {
  WEEK_DAY_FREQUENCY_UNSPECIFIED = 'WEEK_DAY_FREQUENCY_UNSPECIFIED',
  FIRST_OF_MONTH = 'FIRST_OF_MONTH',
  SECOND_OF_MONTH = 'SECOND_OF_MONTH',
  THIRD_OF_MONTH = 'THIRD_OF_MONTH',
  FOURTH_OF_MONTH = 'FOURTH_OF_MONTH',
  FIRST_AND_THIRD_OF_MONTH = 'FIRST_AND_THIRD_OF_MONTH',
  SECOND_AND_FOURTH_OF_MONTH = 'SECOND_AND_FOURTH_OF_MONTH',
  EVERY_WEEK = 'EVERY_WEEK',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum RestrictWorkspaceAdminsMessage_Status {
  /** Default value for proto enum */
  STATUS_UNSPECIFIED = 'STATUS_UNSPECIFIED',
  /**
   * Default value for existing workspaces
   * Allows WS admins to create OBO tokens for all SPs in the workspace without explicit permissions.
   */
  ALLOW_ALL = 'ALLOW_ALL',
  /**
   * Default value for new workspaces
   * Restrict WS admins to create OBO tokens for SPs in the workspace unless corresponding permissions are provided
   */
  RESTRICT_TOKENS_AND_JOB_RUN_AS = 'RESTRICT_TOKENS_AND_JOB_RUN_AS',
}

export interface AibiDashboardEmbeddingAccessPolicy {
  accessPolicyType?:
    | AibiDashboardEmbeddingAccessPolicy_AccessPolicyType
    | undefined;
}

export interface AibiDashboardEmbeddingAccessPolicySetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {
        $case: 'aibiDashboardEmbeddingAccessPolicy';
        aibiDashboardEmbeddingAccessPolicy: AibiDashboardEmbeddingAccessPolicy;
      }
    | undefined;
}

export interface AibiDashboardEmbeddingApprovedDomains {
  approvedDomains?: string[] | undefined;
}

export interface AibiDashboardEmbeddingApprovedDomainsSetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {
        $case: 'aibiDashboardEmbeddingApprovedDomains';
        aibiDashboardEmbeddingApprovedDomains: AibiDashboardEmbeddingApprovedDomains;
      }
    | undefined;
}

export interface AutomaticClusterUpdateSetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {
        $case: 'automaticClusterUpdateWorkspace';
        automaticClusterUpdateWorkspace: ClusterAutoRestartMessage;
      }
    | undefined;
}

export interface BooleanMessage {
  value?: boolean | undefined;
}

export interface ClusterAutoRestartMessage {
  enabled?: boolean | undefined;
  canToggle?: boolean | undefined;
  maintenanceWindow?: ClusterAutoRestartMessage_MaintenanceWindow | undefined;
  enablementDetails?: ClusterAutoRestartMessage_EnablementDetails | undefined;
  restartEvenIfNoUpdatesAvailable?: boolean | undefined;
}

/**
 * Contains an information about the enablement status judging (e.g. whether the enterprise tier
 * is enabled)
 * This is only additional information that MUST NOT be used to decide whether the setting is
 * enabled or not. This is intended to use only for purposes like showing an error message to
 * the customer with the additional details. For example, using these details we can check
 * why exactly the feature is disabled for this customer.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterAutoRestartMessage_EnablementDetails {
  /** The feature is unavailable if the customer doesn't have enterprise tier */
  unavailableForNonEnterpriseTier?: boolean | undefined;
  /** The feature is unavailable if the corresponding entitlement disabled (see getShieldEntitlementEnable) */
  unavailableForDisabledEntitlement?: boolean | undefined;
  /** The feature is force enabled if compliance mode is active */
  forcedForComplianceMode?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterAutoRestartMessage_MaintenanceWindow {
  weekDayBasedSchedule?:
    | ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule {
  frequency?:
    | ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency
    | undefined;
  dayOfWeek?: ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek | undefined;
  windowStartTime?:
    | ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime {
  hours?: number | undefined;
  minutes?: number | undefined;
}

/**
 * SHIELD feature: CSP
 * Compliance Security Profile (CSP) enables enhanced compliance controls on the workspace.
 */
export interface ComplianceSecurityProfile {
  /** Whether Compliance Security Profile (CSP) is enabled on the workspace. */
  isEnabled?: boolean | undefined;
  /** Compliance standards selected by the customer for this Compliance Security Profile. */
  complianceStandards?: ComplianceStandard[] | undefined;
}

export interface ComplianceSecurityProfileSetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {
        $case: 'complianceSecurityProfileWorkspace';
        complianceSecurityProfileWorkspace: ComplianceSecurityProfile;
      }
    | undefined;
}

export interface DashboardEmailSubscriptions {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?: {$case: 'booleanVal'; booleanVal: BooleanMessage} | undefined;
}

/**
 * This represents the setting configuration for the default namespace in the <Databricks> workspace.
 * Setting the default catalog for the workspace determines the catalog that is used when queries do not reference
 * a fully qualified 3 level name. For example, if the default catalog is set to 'retail_prod' then a query
 * 'SELECT * FROM myTable' would reference the object 'retail_prod.default.myTable' (the schema
 * 'default' is always assumed). This setting requires a restart of clusters and SQL warehouses to take effect.
 * Additionally, the default namespace only applies when using Unity Catalog-enabled compute.
 */
export interface DefaultNamespaceSetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?: {$case: 'namespace'; namespace: StringMessage} | undefined;
}

export interface DefaultWarehouseId {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?: {$case: 'stringVal'; stringVal: StringMessage} | undefined;
}

export interface DeleteAibiDashboardEmbeddingAccessPolicySettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteAibiDashboardEmbeddingAccessPolicySettingResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteAibiDashboardEmbeddingApprovedDomainsSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteAibiDashboardEmbeddingApprovedDomainsSettingResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteDashboardEmailSubscriptionsRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteDashboardEmailSubscriptionsResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteDefaultNamespaceSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteDefaultNamespaceSettingResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteDefaultWarehouseIdRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteDefaultWarehouseIdResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteDisableLegacyAccessRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteDisableLegacyAccessResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteDisableLegacyDbfsRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteDisableLegacyDbfsResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteLlmProxyPartnerPoweredWorkspaceRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteLlmProxyPartnerPoweredWorkspaceResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteRestrictWorkspaceAdminsSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteRestrictWorkspaceAdminsSettingResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteSqlResultsDownloadRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteSqlResultsDownloadResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DisableLegacyAccess {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {$case: 'disableLegacyAccess'; disableLegacyAccess: BooleanMessage}
    | undefined;
}

export interface DisableLegacyDbfs {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {$case: 'disableLegacyDbfs'; disableLegacyDbfs: BooleanMessage}
    | undefined;
}

export interface EnableExportNotebook {
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  booleanVal?: BooleanMessage | undefined;
}

export interface EnableNotebookTableClipboard {
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  booleanVal?: BooleanMessage | undefined;
}

export interface EnableResultsDownloading {
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  booleanVal?: BooleanMessage | undefined;
}

/**
 * SHIELD feature: ESM
 * Enhanced Security Monitoring (ESM) enables additional security monitoring on the workspace.
 */
export interface EnhancedSecurityMonitoring {
  /** Whether Enhanced Security Monitoring (ESM) is enabled on the workspace. */
  isEnabled?: boolean | undefined;
}

export interface EnhancedSecurityMonitoringSetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {
        $case: 'enhancedSecurityMonitoringWorkspace';
        enhancedSecurityMonitoringWorkspace: EnhancedSecurityMonitoring;
      }
    | undefined;
}

export interface GetAibiDashboardEmbeddingAccessPolicySettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetAibiDashboardEmbeddingApprovedDomainsSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetAutomaticClusterUpdateSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetComplianceSecurityProfileSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetDashboardEmailSubscriptionsRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetDefaultNamespaceSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetDefaultWarehouseIdRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetDisableLegacyAccessRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetDisableLegacyDbfsRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetEnableExportNotebookRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetEnableNotebookTableClipboardRequest {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetEnableResultsDownloadingRequest {}

export interface GetEnhancedSecurityMonitoringSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetLlmProxyPartnerPoweredWorkspaceRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetRestrictWorkspaceAdminsSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetSqlResultsDownloadRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface LlmProxyPartnerPoweredWorkspace {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?: {$case: 'booleanVal'; booleanVal: BooleanMessage} | undefined;
}

/** Details required to update a setting. */
export interface PatchEnableExportNotebookRequest {
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: EnableExportNotebook | undefined;
  fieldMask?: FieldMask<EnableExportNotebook> | undefined;
}

/** Details required to update a setting. */
export interface PatchEnableNotebookTableClipboardRequest {
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: EnableNotebookTableClipboard | undefined;
  fieldMask?: FieldMask<EnableNotebookTableClipboard> | undefined;
}

/** Details required to update a setting. */
export interface PatchEnableResultsDownloadingRequest {
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: EnableResultsDownloading | undefined;
  fieldMask?: FieldMask<EnableResultsDownloading> | undefined;
}

export interface RestrictWorkspaceAdminsMessage {
  status?: RestrictWorkspaceAdminsMessage_Status | undefined;
  /**
   * When true, workspace admins cannot create governance tags.
   * ALLOW_ALL status does not override this; they are independent.
   */
  disableGovTagCreation?: boolean | undefined;
}

export interface RestrictWorkspaceAdminsSetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {
        $case: 'restrictWorkspaceAdmins';
        restrictWorkspaceAdmins: RestrictWorkspaceAdminsMessage;
      }
    | undefined;
}

export interface SqlResultsDownload {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?: {$case: 'booleanVal'; booleanVal: BooleanMessage} | undefined;
}

export interface StringMessage {
  /** Represents a generic string value. */
  value?: string | undefined;
}

/** Details required to update a setting. */
export interface UpdateAibiDashboardEmbeddingAccessPolicySettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: AibiDashboardEmbeddingAccessPolicySetting | undefined;
  fieldMask?: FieldMask<AibiDashboardEmbeddingAccessPolicySetting> | undefined;
}

/** Details required to update a setting. */
export interface UpdateAibiDashboardEmbeddingApprovedDomainsSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: AibiDashboardEmbeddingApprovedDomainsSetting | undefined;
  fieldMask?:
    | FieldMask<AibiDashboardEmbeddingApprovedDomainsSetting>
    | undefined;
}

/** Details required to update a setting. */
export interface UpdateAutomaticClusterUpdateSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: AutomaticClusterUpdateSetting | undefined;
  fieldMask?: FieldMask<AutomaticClusterUpdateSetting> | undefined;
}

/** Details required to update a setting. */
export interface UpdateComplianceSecurityProfileSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: ComplianceSecurityProfileSetting | undefined;
  fieldMask?: FieldMask<ComplianceSecurityProfileSetting> | undefined;
}

/** Details required to update a setting. */
export interface UpdateDashboardEmailSubscriptionsRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: DashboardEmailSubscriptions | undefined;
  fieldMask?: FieldMask<DashboardEmailSubscriptions> | undefined;
}

/** Details required to update a setting. */
export interface UpdateDefaultNamespaceSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: DefaultNamespaceSetting | undefined;
  fieldMask?: FieldMask<DefaultNamespaceSetting> | undefined;
}

/** Details required to update a setting. */
export interface UpdateDefaultWarehouseIdRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: DefaultWarehouseId | undefined;
  fieldMask?: FieldMask<DefaultWarehouseId> | undefined;
}

/** Details required to update a setting. */
export interface UpdateDisableLegacyAccessRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: DisableLegacyAccess | undefined;
  fieldMask?: FieldMask<DisableLegacyAccess> | undefined;
}

/** Details required to update a setting. */
export interface UpdateDisableLegacyDbfsRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: DisableLegacyDbfs | undefined;
  fieldMask?: FieldMask<DisableLegacyDbfs> | undefined;
}

/** Details required to update a setting. */
export interface UpdateEnhancedSecurityMonitoringSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: EnhancedSecurityMonitoringSetting | undefined;
  fieldMask?: FieldMask<EnhancedSecurityMonitoringSetting> | undefined;
}

/** Details required to update a setting. */
export interface UpdateLlmProxyPartnerPoweredWorkspaceRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: LlmProxyPartnerPoweredWorkspace | undefined;
  fieldMask?: FieldMask<LlmProxyPartnerPoweredWorkspace> | undefined;
}

/** Details required to update a setting. */
export interface UpdateRestrictWorkspaceAdminsSettingRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: RestrictWorkspaceAdminsSetting | undefined;
  fieldMask?: FieldMask<RestrictWorkspaceAdminsSetting> | undefined;
}

/** Details required to update a setting. */
export interface UpdateSqlResultsDownloadRequest {
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: SqlResultsDownload | undefined;
  fieldMask?: FieldMask<SqlResultsDownload> | undefined;
}

export const unmarshalAibiDashboardEmbeddingAccessPolicySchema: z.ZodType<AibiDashboardEmbeddingAccessPolicy> =
  z
    .object({
      access_policy_type: z
        .enum(AibiDashboardEmbeddingAccessPolicy_AccessPolicyType)
        .optional(),
    })
    .transform(d => ({
      accessPolicyType: d.access_policy_type,
    }));

export const unmarshalAibiDashboardEmbeddingAccessPolicySettingSchema: z.ZodType<AibiDashboardEmbeddingAccessPolicySetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      aibi_dashboard_embedding_access_policy: z
        .lazy(() => unmarshalAibiDashboardEmbeddingAccessPolicySchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.aibi_dashboard_embedding_access_policy !== undefined
          ? {
              $case: 'aibiDashboardEmbeddingAccessPolicy' as const,
              aibiDashboardEmbeddingAccessPolicy:
                d.aibi_dashboard_embedding_access_policy,
            }
          : undefined,
    }));

export const unmarshalAibiDashboardEmbeddingApprovedDomainsSchema: z.ZodType<AibiDashboardEmbeddingApprovedDomains> =
  z
    .object({
      approved_domains: z.array(z.string()).optional(),
    })
    .transform(d => ({
      approvedDomains: d.approved_domains,
    }));

export const unmarshalAibiDashboardEmbeddingApprovedDomainsSettingSchema: z.ZodType<AibiDashboardEmbeddingApprovedDomainsSetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      aibi_dashboard_embedding_approved_domains: z
        .lazy(() => unmarshalAibiDashboardEmbeddingApprovedDomainsSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.aibi_dashboard_embedding_approved_domains !== undefined
          ? {
              $case: 'aibiDashboardEmbeddingApprovedDomains' as const,
              aibiDashboardEmbeddingApprovedDomains:
                d.aibi_dashboard_embedding_approved_domains,
            }
          : undefined,
    }));

export const unmarshalAutomaticClusterUpdateSettingSchema: z.ZodType<AutomaticClusterUpdateSetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      automatic_cluster_update_workspace: z
        .lazy(() => unmarshalClusterAutoRestartMessageSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.automatic_cluster_update_workspace !== undefined
          ? {
              $case: 'automaticClusterUpdateWorkspace' as const,
              automaticClusterUpdateWorkspace:
                d.automatic_cluster_update_workspace,
            }
          : undefined,
    }));

export const unmarshalBooleanMessageSchema: z.ZodType<BooleanMessage> = z
  .object({
    value: z.boolean().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalClusterAutoRestartMessageSchema: z.ZodType<ClusterAutoRestartMessage> =
  z
    .object({
      enabled: z.boolean().optional(),
      can_toggle: z.boolean().optional(),
      maintenance_window: z
        .lazy(() => unmarshalClusterAutoRestartMessage_MaintenanceWindowSchema)
        .optional(),
      enablement_details: z
        .lazy(() => unmarshalClusterAutoRestartMessage_EnablementDetailsSchema)
        .optional(),
      restart_even_if_no_updates_available: z.boolean().optional(),
    })
    .transform(d => ({
      enabled: d.enabled,
      canToggle: d.can_toggle,
      maintenanceWindow: d.maintenance_window,
      enablementDetails: d.enablement_details,
      restartEvenIfNoUpdatesAvailable: d.restart_even_if_no_updates_available,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalClusterAutoRestartMessage_EnablementDetailsSchema: z.ZodType<ClusterAutoRestartMessage_EnablementDetails> =
  z
    .object({
      unavailable_for_non_enterprise_tier: z.boolean().optional(),
      unavailable_for_disabled_entitlement: z.boolean().optional(),
      forced_for_compliance_mode: z.boolean().optional(),
    })
    .transform(d => ({
      unavailableForNonEnterpriseTier: d.unavailable_for_non_enterprise_tier,
      unavailableForDisabledEntitlement: d.unavailable_for_disabled_entitlement,
      forcedForComplianceMode: d.forced_for_compliance_mode,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalClusterAutoRestartMessage_MaintenanceWindowSchema: z.ZodType<ClusterAutoRestartMessage_MaintenanceWindow> =
  z
    .object({
      week_day_based_schedule: z
        .lazy(
          () =>
            unmarshalClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedScheduleSchema
        )
        .optional(),
    })
    .transform(d => ({
      weekDayBasedSchedule: d.week_day_based_schedule,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedScheduleSchema: z.ZodType<ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule> =
  z
    .object({
      frequency: z
        .enum(ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency)
        .optional(),
      day_of_week: z
        .enum(ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek)
        .optional(),
      window_start_time: z
        .lazy(
          () =>
            unmarshalClusterAutoRestartMessage_MaintenanceWindow_WindowStartTimeSchema
        )
        .optional(),
    })
    .transform(d => ({
      frequency: d.frequency,
      dayOfWeek: d.day_of_week,
      windowStartTime: d.window_start_time,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalClusterAutoRestartMessage_MaintenanceWindow_WindowStartTimeSchema: z.ZodType<ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime> =
  z
    .object({
      hours: z.number().optional(),
      minutes: z.number().optional(),
    })
    .transform(d => ({
      hours: d.hours,
      minutes: d.minutes,
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

export const unmarshalComplianceSecurityProfileSettingSchema: z.ZodType<ComplianceSecurityProfileSetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      compliance_security_profile_workspace: z
        .lazy(() => unmarshalComplianceSecurityProfileSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.compliance_security_profile_workspace !== undefined
          ? {
              $case: 'complianceSecurityProfileWorkspace' as const,
              complianceSecurityProfileWorkspace:
                d.compliance_security_profile_workspace,
            }
          : undefined,
    }));

export const unmarshalDashboardEmailSubscriptionsSchema: z.ZodType<DashboardEmailSubscriptions> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.boolean_val !== undefined
          ? {$case: 'booleanVal' as const, booleanVal: d.boolean_val}
          : undefined,
    }));

export const unmarshalDefaultNamespaceSettingSchema: z.ZodType<DefaultNamespaceSetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      namespace: z.lazy(() => unmarshalStringMessageSchema).optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.namespace !== undefined
          ? {$case: 'namespace' as const, namespace: d.namespace}
          : undefined,
    }));

export const unmarshalDefaultWarehouseIdSchema: z.ZodType<DefaultWarehouseId> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      string_val: z.lazy(() => unmarshalStringMessageSchema).optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.string_val !== undefined
          ? {$case: 'stringVal' as const, stringVal: d.string_val}
          : undefined,
    }));

export const unmarshalDeleteAibiDashboardEmbeddingAccessPolicySettingResponseSchema: z.ZodType<DeleteAibiDashboardEmbeddingAccessPolicySettingResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteAibiDashboardEmbeddingApprovedDomainsSettingResponseSchema: z.ZodType<DeleteAibiDashboardEmbeddingApprovedDomainsSettingResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteDashboardEmailSubscriptionsResponseSchema: z.ZodType<DeleteDashboardEmailSubscriptionsResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteDefaultNamespaceSettingResponseSchema: z.ZodType<DeleteDefaultNamespaceSettingResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteDefaultWarehouseIdResponseSchema: z.ZodType<DeleteDefaultWarehouseIdResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteDisableLegacyAccessResponseSchema: z.ZodType<DeleteDisableLegacyAccessResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteDisableLegacyDbfsResponseSchema: z.ZodType<DeleteDisableLegacyDbfsResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteLlmProxyPartnerPoweredWorkspaceResponseSchema: z.ZodType<DeleteLlmProxyPartnerPoweredWorkspaceResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteRestrictWorkspaceAdminsSettingResponseSchema: z.ZodType<DeleteRestrictWorkspaceAdminsSettingResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteSqlResultsDownloadResponseSchema: z.ZodType<DeleteSqlResultsDownloadResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDisableLegacyAccessSchema: z.ZodType<DisableLegacyAccess> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      disable_legacy_access: z
        .lazy(() => unmarshalBooleanMessageSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.disable_legacy_access !== undefined
          ? {
              $case: 'disableLegacyAccess' as const,
              disableLegacyAccess: d.disable_legacy_access,
            }
          : undefined,
    }));

export const unmarshalDisableLegacyDbfsSchema: z.ZodType<DisableLegacyDbfs> = z
  .object({
    etag: z.string().optional(),
    setting_name: z.string().optional(),
    disable_legacy_dbfs: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
  })
  .transform(d => ({
    etag: d.etag,
    settingName: d.setting_name,
    value:
      d.disable_legacy_dbfs !== undefined
        ? {
            $case: 'disableLegacyDbfs' as const,
            disableLegacyDbfs: d.disable_legacy_dbfs,
          }
        : undefined,
  }));

export const unmarshalEnableExportNotebookSchema: z.ZodType<EnableExportNotebook> =
  z
    .object({
      setting_name: z.string().optional(),
      boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    })
    .transform(d => ({
      settingName: d.setting_name,
      booleanVal: d.boolean_val,
    }));

export const unmarshalEnableNotebookTableClipboardSchema: z.ZodType<EnableNotebookTableClipboard> =
  z
    .object({
      setting_name: z.string().optional(),
      boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    })
    .transform(d => ({
      settingName: d.setting_name,
      booleanVal: d.boolean_val,
    }));

export const unmarshalEnableResultsDownloadingSchema: z.ZodType<EnableResultsDownloading> =
  z
    .object({
      setting_name: z.string().optional(),
      boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    })
    .transform(d => ({
      settingName: d.setting_name,
      booleanVal: d.boolean_val,
    }));

export const unmarshalEnhancedSecurityMonitoringSchema: z.ZodType<EnhancedSecurityMonitoring> =
  z
    .object({
      is_enabled: z.boolean().optional(),
    })
    .transform(d => ({
      isEnabled: d.is_enabled,
    }));

export const unmarshalEnhancedSecurityMonitoringSettingSchema: z.ZodType<EnhancedSecurityMonitoringSetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      enhanced_security_monitoring_workspace: z
        .lazy(() => unmarshalEnhancedSecurityMonitoringSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.enhanced_security_monitoring_workspace !== undefined
          ? {
              $case: 'enhancedSecurityMonitoringWorkspace' as const,
              enhancedSecurityMonitoringWorkspace:
                d.enhanced_security_monitoring_workspace,
            }
          : undefined,
    }));

export const unmarshalLlmProxyPartnerPoweredWorkspaceSchema: z.ZodType<LlmProxyPartnerPoweredWorkspace> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.boolean_val !== undefined
          ? {$case: 'booleanVal' as const, booleanVal: d.boolean_val}
          : undefined,
    }));

export const unmarshalRestrictWorkspaceAdminsMessageSchema: z.ZodType<RestrictWorkspaceAdminsMessage> =
  z
    .object({
      status: z.enum(RestrictWorkspaceAdminsMessage_Status).optional(),
      disable_gov_tag_creation: z.boolean().optional(),
    })
    .transform(d => ({
      status: d.status,
      disableGovTagCreation: d.disable_gov_tag_creation,
    }));

export const unmarshalRestrictWorkspaceAdminsSettingSchema: z.ZodType<RestrictWorkspaceAdminsSetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      restrict_workspace_admins: z
        .lazy(() => unmarshalRestrictWorkspaceAdminsMessageSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.restrict_workspace_admins !== undefined
          ? {
              $case: 'restrictWorkspaceAdmins' as const,
              restrictWorkspaceAdmins: d.restrict_workspace_admins,
            }
          : undefined,
    }));

export const unmarshalSqlResultsDownloadSchema: z.ZodType<SqlResultsDownload> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.boolean_val !== undefined
          ? {$case: 'booleanVal' as const, booleanVal: d.boolean_val}
          : undefined,
    }));

export const unmarshalStringMessageSchema: z.ZodType<StringMessage> = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalAibiDashboardEmbeddingAccessPolicySchema: z.ZodType = z
  .object({
    accessPolicyType: z
      .enum(AibiDashboardEmbeddingAccessPolicy_AccessPolicyType)
      .optional(),
  })
  .transform(d => ({
    access_policy_type: d.accessPolicyType,
  }));

export const marshalAibiDashboardEmbeddingAccessPolicySettingSchema: z.ZodType =
  z
    .object({
      etag: z.string().optional(),
      settingName: z.string().optional(),
      value: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('aibiDashboardEmbeddingAccessPolicy'),
            aibiDashboardEmbeddingAccessPolicy: z.lazy(
              () => marshalAibiDashboardEmbeddingAccessPolicySchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      setting_name: d.settingName,
      ...(d.value?.$case === 'aibiDashboardEmbeddingAccessPolicy' && {
        aibi_dashboard_embedding_access_policy:
          d.value.aibiDashboardEmbeddingAccessPolicy,
      }),
    }));

export const marshalAibiDashboardEmbeddingApprovedDomainsSchema: z.ZodType = z
  .object({
    approvedDomains: z.array(z.string()).optional(),
  })
  .transform(d => ({
    approved_domains: d.approvedDomains,
  }));

export const marshalAibiDashboardEmbeddingApprovedDomainsSettingSchema: z.ZodType =
  z
    .object({
      etag: z.string().optional(),
      settingName: z.string().optional(),
      value: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('aibiDashboardEmbeddingApprovedDomains'),
            aibiDashboardEmbeddingApprovedDomains: z.lazy(
              () => marshalAibiDashboardEmbeddingApprovedDomainsSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      setting_name: d.settingName,
      ...(d.value?.$case === 'aibiDashboardEmbeddingApprovedDomains' && {
        aibi_dashboard_embedding_approved_domains:
          d.value.aibiDashboardEmbeddingApprovedDomains,
      }),
    }));

export const marshalAutomaticClusterUpdateSettingSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('automaticClusterUpdateWorkspace'),
          automaticClusterUpdateWorkspace: z.lazy(
            () => marshalClusterAutoRestartMessageSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'automaticClusterUpdateWorkspace' && {
      automatic_cluster_update_workspace:
        d.value.automaticClusterUpdateWorkspace,
    }),
  }));

export const marshalBooleanMessageSchema: z.ZodType = z
  .object({
    value: z.boolean().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalClusterAutoRestartMessageSchema: z.ZodType = z
  .object({
    enabled: z.boolean().optional(),
    canToggle: z.boolean().optional(),
    maintenanceWindow: z
      .lazy(() => marshalClusterAutoRestartMessage_MaintenanceWindowSchema)
      .optional(),
    enablementDetails: z
      .lazy(() => marshalClusterAutoRestartMessage_EnablementDetailsSchema)
      .optional(),
    restartEvenIfNoUpdatesAvailable: z.boolean().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
    can_toggle: d.canToggle,
    maintenance_window: d.maintenanceWindow,
    enablement_details: d.enablementDetails,
    restart_even_if_no_updates_available: d.restartEvenIfNoUpdatesAvailable,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalClusterAutoRestartMessage_EnablementDetailsSchema: z.ZodType =
  z
    .object({
      unavailableForNonEnterpriseTier: z.boolean().optional(),
      unavailableForDisabledEntitlement: z.boolean().optional(),
      forcedForComplianceMode: z.boolean().optional(),
    })
    .transform(d => ({
      unavailable_for_non_enterprise_tier: d.unavailableForNonEnterpriseTier,
      unavailable_for_disabled_entitlement: d.unavailableForDisabledEntitlement,
      forced_for_compliance_mode: d.forcedForComplianceMode,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalClusterAutoRestartMessage_MaintenanceWindowSchema: z.ZodType =
  z
    .object({
      weekDayBasedSchedule: z
        .lazy(
          () =>
            marshalClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedScheduleSchema
        )
        .optional(),
    })
    .transform(d => ({
      week_day_based_schedule: d.weekDayBasedSchedule,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedScheduleSchema: z.ZodType =
  z
    .object({
      frequency: z
        .enum(ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency)
        .optional(),
      dayOfWeek: z
        .enum(ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek)
        .optional(),
      windowStartTime: z
        .lazy(
          () =>
            marshalClusterAutoRestartMessage_MaintenanceWindow_WindowStartTimeSchema
        )
        .optional(),
    })
    .transform(d => ({
      frequency: d.frequency,
      day_of_week: d.dayOfWeek,
      window_start_time: d.windowStartTime,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalClusterAutoRestartMessage_MaintenanceWindow_WindowStartTimeSchema: z.ZodType =
  z
    .object({
      hours: z.number().optional(),
      minutes: z.number().optional(),
    })
    .transform(d => ({
      hours: d.hours,
      minutes: d.minutes,
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

export const marshalComplianceSecurityProfileSettingSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('complianceSecurityProfileWorkspace'),
          complianceSecurityProfileWorkspace: z.lazy(
            () => marshalComplianceSecurityProfileSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'complianceSecurityProfileWorkspace' && {
      compliance_security_profile_workspace:
        d.value.complianceSecurityProfileWorkspace,
    }),
  }));

export const marshalDashboardEmailSubscriptionsSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('booleanVal'),
          booleanVal: z.lazy(() => marshalBooleanMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'booleanVal' && {boolean_val: d.value.booleanVal}),
  }));

export const marshalDefaultNamespaceSettingSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('namespace'),
          namespace: z.lazy(() => marshalStringMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'namespace' && {namespace: d.value.namespace}),
  }));

export const marshalDefaultWarehouseIdSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('stringVal'),
          stringVal: z.lazy(() => marshalStringMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'stringVal' && {string_val: d.value.stringVal}),
  }));

export const marshalDisableLegacyAccessSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('disableLegacyAccess'),
          disableLegacyAccess: z.lazy(() => marshalBooleanMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'disableLegacyAccess' && {
      disable_legacy_access: d.value.disableLegacyAccess,
    }),
  }));

export const marshalDisableLegacyDbfsSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('disableLegacyDbfs'),
          disableLegacyDbfs: z.lazy(() => marshalBooleanMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'disableLegacyDbfs' && {
      disable_legacy_dbfs: d.value.disableLegacyDbfs,
    }),
  }));

export const marshalEnableExportNotebookSchema: z.ZodType = z
  .object({
    settingName: z.string().optional(),
    booleanVal: z.lazy(() => marshalBooleanMessageSchema).optional(),
  })
  .transform(d => ({
    setting_name: d.settingName,
    boolean_val: d.booleanVal,
  }));

export const marshalEnableNotebookTableClipboardSchema: z.ZodType = z
  .object({
    settingName: z.string().optional(),
    booleanVal: z.lazy(() => marshalBooleanMessageSchema).optional(),
  })
  .transform(d => ({
    setting_name: d.settingName,
    boolean_val: d.booleanVal,
  }));

export const marshalEnableResultsDownloadingSchema: z.ZodType = z
  .object({
    settingName: z.string().optional(),
    booleanVal: z.lazy(() => marshalBooleanMessageSchema).optional(),
  })
  .transform(d => ({
    setting_name: d.settingName,
    boolean_val: d.booleanVal,
  }));

export const marshalEnhancedSecurityMonitoringSchema: z.ZodType = z
  .object({
    isEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    is_enabled: d.isEnabled,
  }));

export const marshalEnhancedSecurityMonitoringSettingSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('enhancedSecurityMonitoringWorkspace'),
          enhancedSecurityMonitoringWorkspace: z.lazy(
            () => marshalEnhancedSecurityMonitoringSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'enhancedSecurityMonitoringWorkspace' && {
      enhanced_security_monitoring_workspace:
        d.value.enhancedSecurityMonitoringWorkspace,
    }),
  }));

export const marshalLlmProxyPartnerPoweredWorkspaceSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('booleanVal'),
          booleanVal: z.lazy(() => marshalBooleanMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'booleanVal' && {boolean_val: d.value.booleanVal}),
  }));

export const marshalPatchEnableExportNotebookRequestSchema: z.ZodType = z
  .object({
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalEnableExportNotebookSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

export const marshalPatchEnableNotebookTableClipboardRequestSchema: z.ZodType =
  z
    .object({
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalEnableNotebookTableClipboardSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalPatchEnableResultsDownloadingRequestSchema: z.ZodType = z
  .object({
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalEnableResultsDownloadingSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

export const marshalRestrictWorkspaceAdminsMessageSchema: z.ZodType = z
  .object({
    status: z.enum(RestrictWorkspaceAdminsMessage_Status).optional(),
    disableGovTagCreation: z.boolean().optional(),
  })
  .transform(d => ({
    status: d.status,
    disable_gov_tag_creation: d.disableGovTagCreation,
  }));

export const marshalRestrictWorkspaceAdminsSettingSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('restrictWorkspaceAdmins'),
          restrictWorkspaceAdmins: z.lazy(
            () => marshalRestrictWorkspaceAdminsMessageSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'restrictWorkspaceAdmins' && {
      restrict_workspace_admins: d.value.restrictWorkspaceAdmins,
    }),
  }));

export const marshalSqlResultsDownloadSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('booleanVal'),
          booleanVal: z.lazy(() => marshalBooleanMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'booleanVal' && {boolean_val: d.value.booleanVal}),
  }));

export const marshalStringMessageSchema: z.ZodType = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalUpdateAibiDashboardEmbeddingAccessPolicySettingRequestSchema: z.ZodType =
  z
    .object({
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalAibiDashboardEmbeddingAccessPolicySettingSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateAibiDashboardEmbeddingApprovedDomainsSettingRequestSchema: z.ZodType =
  z
    .object({
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalAibiDashboardEmbeddingApprovedDomainsSettingSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateAutomaticClusterUpdateSettingRequestSchema: z.ZodType =
  z
    .object({
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalAutomaticClusterUpdateSettingSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateComplianceSecurityProfileSettingRequestSchema: z.ZodType =
  z
    .object({
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalComplianceSecurityProfileSettingSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateDashboardEmailSubscriptionsRequestSchema: z.ZodType =
  z
    .object({
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalDashboardEmailSubscriptionsSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateDefaultNamespaceSettingRequestSchema: z.ZodType = z
  .object({
    settingTypeName: z.string().optional(),
    settingName: z.string().optional(),
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalDefaultNamespaceSettingSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    setting_type_name: d.settingTypeName,
    setting_name: d.settingName,
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

export const marshalUpdateDefaultWarehouseIdRequestSchema: z.ZodType = z
  .object({
    settingTypeName: z.string().optional(),
    settingName: z.string().optional(),
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalDefaultWarehouseIdSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    setting_type_name: d.settingTypeName,
    setting_name: d.settingName,
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

export const marshalUpdateDisableLegacyAccessRequestSchema: z.ZodType = z
  .object({
    settingTypeName: z.string().optional(),
    settingName: z.string().optional(),
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalDisableLegacyAccessSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    setting_type_name: d.settingTypeName,
    setting_name: d.settingName,
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

export const marshalUpdateDisableLegacyDbfsRequestSchema: z.ZodType = z
  .object({
    settingTypeName: z.string().optional(),
    settingName: z.string().optional(),
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalDisableLegacyDbfsSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    setting_type_name: d.settingTypeName,
    setting_name: d.settingName,
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

export const marshalUpdateEnhancedSecurityMonitoringSettingRequestSchema: z.ZodType =
  z
    .object({
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalEnhancedSecurityMonitoringSettingSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateLlmProxyPartnerPoweredWorkspaceRequestSchema: z.ZodType =
  z
    .object({
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalLlmProxyPartnerPoweredWorkspaceSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateRestrictWorkspaceAdminsSettingRequestSchema: z.ZodType =
  z
    .object({
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalRestrictWorkspaceAdminsSettingSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateSqlResultsDownloadRequestSchema: z.ZodType = z
  .object({
    settingTypeName: z.string().optional(),
    settingName: z.string().optional(),
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalSqlResultsDownloadSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    setting_type_name: d.settingTypeName,
    setting_name: d.settingName,
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

const aibiDashboardEmbeddingAccessPolicyFieldMaskSchema: FieldMaskSchema = {
  accessPolicyType: {wire: 'access_policy_type'},
};

const aibiDashboardEmbeddingAccessPolicySettingFieldMaskSchema: FieldMaskSchema =
  {
    aibiDashboardEmbeddingAccessPolicy: {
      wire: 'aibi_dashboard_embedding_access_policy',
      children: () => aibiDashboardEmbeddingAccessPolicyFieldMaskSchema,
    },
    etag: {wire: 'etag'},
    settingName: {wire: 'setting_name'},
  };

export function aibiDashboardEmbeddingAccessPolicySettingFieldMask(
  ...paths: string[]
): FieldMask<AibiDashboardEmbeddingAccessPolicySetting> {
  return FieldMask.build<AibiDashboardEmbeddingAccessPolicySetting>(
    paths,
    aibiDashboardEmbeddingAccessPolicySettingFieldMaskSchema
  );
}

const aibiDashboardEmbeddingApprovedDomainsFieldMaskSchema: FieldMaskSchema = {
  approvedDomains: {wire: 'approved_domains'},
};

const aibiDashboardEmbeddingApprovedDomainsSettingFieldMaskSchema: FieldMaskSchema =
  {
    aibiDashboardEmbeddingApprovedDomains: {
      wire: 'aibi_dashboard_embedding_approved_domains',
      children: () => aibiDashboardEmbeddingApprovedDomainsFieldMaskSchema,
    },
    etag: {wire: 'etag'},
    settingName: {wire: 'setting_name'},
  };

export function aibiDashboardEmbeddingApprovedDomainsSettingFieldMask(
  ...paths: string[]
): FieldMask<AibiDashboardEmbeddingApprovedDomainsSetting> {
  return FieldMask.build<AibiDashboardEmbeddingApprovedDomainsSetting>(
    paths,
    aibiDashboardEmbeddingApprovedDomainsSettingFieldMaskSchema
  );
}

const automaticClusterUpdateSettingFieldMaskSchema: FieldMaskSchema = {
  automaticClusterUpdateWorkspace: {
    wire: 'automatic_cluster_update_workspace',
    children: () => clusterAutoRestartMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function automaticClusterUpdateSettingFieldMask(
  ...paths: string[]
): FieldMask<AutomaticClusterUpdateSetting> {
  return FieldMask.build<AutomaticClusterUpdateSetting>(
    paths,
    automaticClusterUpdateSettingFieldMaskSchema
  );
}

const booleanMessageFieldMaskSchema: FieldMaskSchema = {
  value: {wire: 'value'},
};

const clusterAutoRestartMessageFieldMaskSchema: FieldMaskSchema = {
  canToggle: {wire: 'can_toggle'},
  enabled: {wire: 'enabled'},
  enablementDetails: {
    wire: 'enablement_details',
    children: () => clusterAutoRestartMessage_EnablementDetailsFieldMaskSchema,
  },
  maintenanceWindow: {
    wire: 'maintenance_window',
    children: () => clusterAutoRestartMessage_MaintenanceWindowFieldMaskSchema,
  },
  restartEvenIfNoUpdatesAvailable: {
    wire: 'restart_even_if_no_updates_available',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const clusterAutoRestartMessage_EnablementDetailsFieldMaskSchema: FieldMaskSchema =
  {
    forcedForComplianceMode: {wire: 'forced_for_compliance_mode'},
    unavailableForDisabledEntitlement: {
      wire: 'unavailable_for_disabled_entitlement',
    },
    unavailableForNonEnterpriseTier: {
      wire: 'unavailable_for_non_enterprise_tier',
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const clusterAutoRestartMessage_MaintenanceWindowFieldMaskSchema: FieldMaskSchema =
  {
    weekDayBasedSchedule: {
      wire: 'week_day_based_schedule',
      children: () =>
        clusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedScheduleFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const clusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedScheduleFieldMaskSchema: FieldMaskSchema =
  {
    dayOfWeek: {wire: 'day_of_week'},
    frequency: {wire: 'frequency'},
    windowStartTime: {
      wire: 'window_start_time',
      children: () =>
        clusterAutoRestartMessage_MaintenanceWindow_WindowStartTimeFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const clusterAutoRestartMessage_MaintenanceWindow_WindowStartTimeFieldMaskSchema: FieldMaskSchema =
  {
    hours: {wire: 'hours'},
    minutes: {wire: 'minutes'},
  };

const complianceSecurityProfileFieldMaskSchema: FieldMaskSchema = {
  complianceStandards: {wire: 'compliance_standards'},
  isEnabled: {wire: 'is_enabled'},
};

const complianceSecurityProfileSettingFieldMaskSchema: FieldMaskSchema = {
  complianceSecurityProfileWorkspace: {
    wire: 'compliance_security_profile_workspace',
    children: () => complianceSecurityProfileFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function complianceSecurityProfileSettingFieldMask(
  ...paths: string[]
): FieldMask<ComplianceSecurityProfileSetting> {
  return FieldMask.build<ComplianceSecurityProfileSetting>(
    paths,
    complianceSecurityProfileSettingFieldMaskSchema
  );
}

const dashboardEmailSubscriptionsFieldMaskSchema: FieldMaskSchema = {
  booleanVal: {
    wire: 'boolean_val',
    children: () => booleanMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function dashboardEmailSubscriptionsFieldMask(
  ...paths: string[]
): FieldMask<DashboardEmailSubscriptions> {
  return FieldMask.build<DashboardEmailSubscriptions>(
    paths,
    dashboardEmailSubscriptionsFieldMaskSchema
  );
}

const defaultNamespaceSettingFieldMaskSchema: FieldMaskSchema = {
  etag: {wire: 'etag'},
  namespace: {wire: 'namespace', children: () => stringMessageFieldMaskSchema},
  settingName: {wire: 'setting_name'},
};

export function defaultNamespaceSettingFieldMask(
  ...paths: string[]
): FieldMask<DefaultNamespaceSetting> {
  return FieldMask.build<DefaultNamespaceSetting>(
    paths,
    defaultNamespaceSettingFieldMaskSchema
  );
}

const defaultWarehouseIdFieldMaskSchema: FieldMaskSchema = {
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
  stringVal: {wire: 'string_val', children: () => stringMessageFieldMaskSchema},
};

export function defaultWarehouseIdFieldMask(
  ...paths: string[]
): FieldMask<DefaultWarehouseId> {
  return FieldMask.build<DefaultWarehouseId>(
    paths,
    defaultWarehouseIdFieldMaskSchema
  );
}

const disableLegacyAccessFieldMaskSchema: FieldMaskSchema = {
  disableLegacyAccess: {
    wire: 'disable_legacy_access',
    children: () => booleanMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function disableLegacyAccessFieldMask(
  ...paths: string[]
): FieldMask<DisableLegacyAccess> {
  return FieldMask.build<DisableLegacyAccess>(
    paths,
    disableLegacyAccessFieldMaskSchema
  );
}

const disableLegacyDbfsFieldMaskSchema: FieldMaskSchema = {
  disableLegacyDbfs: {
    wire: 'disable_legacy_dbfs',
    children: () => booleanMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function disableLegacyDbfsFieldMask(
  ...paths: string[]
): FieldMask<DisableLegacyDbfs> {
  return FieldMask.build<DisableLegacyDbfs>(
    paths,
    disableLegacyDbfsFieldMaskSchema
  );
}

const enableExportNotebookFieldMaskSchema: FieldMaskSchema = {
  booleanVal: {
    wire: 'boolean_val',
    children: () => booleanMessageFieldMaskSchema,
  },
  settingName: {wire: 'setting_name'},
};

export function enableExportNotebookFieldMask(
  ...paths: string[]
): FieldMask<EnableExportNotebook> {
  return FieldMask.build<EnableExportNotebook>(
    paths,
    enableExportNotebookFieldMaskSchema
  );
}

const enableNotebookTableClipboardFieldMaskSchema: FieldMaskSchema = {
  booleanVal: {
    wire: 'boolean_val',
    children: () => booleanMessageFieldMaskSchema,
  },
  settingName: {wire: 'setting_name'},
};

export function enableNotebookTableClipboardFieldMask(
  ...paths: string[]
): FieldMask<EnableNotebookTableClipboard> {
  return FieldMask.build<EnableNotebookTableClipboard>(
    paths,
    enableNotebookTableClipboardFieldMaskSchema
  );
}

const enableResultsDownloadingFieldMaskSchema: FieldMaskSchema = {
  booleanVal: {
    wire: 'boolean_val',
    children: () => booleanMessageFieldMaskSchema,
  },
  settingName: {wire: 'setting_name'},
};

export function enableResultsDownloadingFieldMask(
  ...paths: string[]
): FieldMask<EnableResultsDownloading> {
  return FieldMask.build<EnableResultsDownloading>(
    paths,
    enableResultsDownloadingFieldMaskSchema
  );
}

const enhancedSecurityMonitoringFieldMaskSchema: FieldMaskSchema = {
  isEnabled: {wire: 'is_enabled'},
};

const enhancedSecurityMonitoringSettingFieldMaskSchema: FieldMaskSchema = {
  enhancedSecurityMonitoringWorkspace: {
    wire: 'enhanced_security_monitoring_workspace',
    children: () => enhancedSecurityMonitoringFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function enhancedSecurityMonitoringSettingFieldMask(
  ...paths: string[]
): FieldMask<EnhancedSecurityMonitoringSetting> {
  return FieldMask.build<EnhancedSecurityMonitoringSetting>(
    paths,
    enhancedSecurityMonitoringSettingFieldMaskSchema
  );
}

const llmProxyPartnerPoweredWorkspaceFieldMaskSchema: FieldMaskSchema = {
  booleanVal: {
    wire: 'boolean_val',
    children: () => booleanMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function llmProxyPartnerPoweredWorkspaceFieldMask(
  ...paths: string[]
): FieldMask<LlmProxyPartnerPoweredWorkspace> {
  return FieldMask.build<LlmProxyPartnerPoweredWorkspace>(
    paths,
    llmProxyPartnerPoweredWorkspaceFieldMaskSchema
  );
}

const restrictWorkspaceAdminsMessageFieldMaskSchema: FieldMaskSchema = {
  disableGovTagCreation: {wire: 'disable_gov_tag_creation'},
  status: {wire: 'status'},
};

const restrictWorkspaceAdminsSettingFieldMaskSchema: FieldMaskSchema = {
  etag: {wire: 'etag'},
  restrictWorkspaceAdmins: {
    wire: 'restrict_workspace_admins',
    children: () => restrictWorkspaceAdminsMessageFieldMaskSchema,
  },
  settingName: {wire: 'setting_name'},
};

export function restrictWorkspaceAdminsSettingFieldMask(
  ...paths: string[]
): FieldMask<RestrictWorkspaceAdminsSetting> {
  return FieldMask.build<RestrictWorkspaceAdminsSetting>(
    paths,
    restrictWorkspaceAdminsSettingFieldMaskSchema
  );
}

const sqlResultsDownloadFieldMaskSchema: FieldMaskSchema = {
  booleanVal: {
    wire: 'boolean_val',
    children: () => booleanMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function sqlResultsDownloadFieldMask(
  ...paths: string[]
): FieldMask<SqlResultsDownload> {
  return FieldMask.build<SqlResultsDownload>(
    paths,
    sqlResultsDownloadFieldMaskSchema
  );
}

const stringMessageFieldMaskSchema: FieldMaskSchema = {
  value: {wire: 'value'},
};
