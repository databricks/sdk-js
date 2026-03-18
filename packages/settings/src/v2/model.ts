// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum AibiDashboardEmbeddingAccessPolicy_AccessPolicyType {
  ACCESS_POLICY_TYPE_UNSPECIFIED = 'ACCESS_POLICY_TYPE_UNSPECIFIED',
  ALLOW_ALL_DOMAINS = 'ALLOW_ALL_DOMAINS',
  ALLOW_APPROVED_DOMAINS = 'ALLOW_APPROVED_DOMAINS',
  DENY_ALL_DOMAINS = 'DENY_ALL_DOMAINS',
}

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

/**
 * ON: Grants all users in all workspaces access to the Personal Compute default policy, allowing all users to create single-machine compute resources.
 * DELEGATE: Moves access control for the Personal Compute default policy to individual workspaces and requires a workspace’s users or groups to be added to the ACLs of that workspace’s Personal Compute default policy before they will be able to create compute resources through that policy.
 */
export enum PersonalComputeMessage_PersonalComputeMessageEnum {
  PERSONAL_COMPUTE_MESSAGE_ENUM_UNSPECIFIED = 'PERSONAL_COMPUTE_MESSAGE_ENUM_UNSPECIFIED',
  ON = 'ON',
  DELEGATE = 'DELEGATE',
}

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

export interface AibiDashboardEmbeddingApprovedDomains {
  approvedDomains?: string[] | undefined;
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
export interface ClusterAutoRestartMessage_EnablementDetails {
  /** The feature is unavailable if the customer doesn't have enterprise tier */
  unavailableForNonEnterpriseTier?: boolean | undefined;
  /** The feature is unavailable if the corresponding entitlement disabled (see getShieldEntitlementEnable) */
  unavailableForDisabledEntitlement?: boolean | undefined;
  /** The feature is force enabled if compliance mode is active */
  forcedForComplianceMode?: boolean | undefined;
}

export interface ClusterAutoRestartMessage_MaintenanceWindow {
  weekDayBasedSchedule?:
    | ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule
    | undefined;
}

export interface ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule {
  frequency?:
    | ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency
    | undefined;
  dayOfWeek?: ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek | undefined;
  windowStartTime?:
    | ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime
    | undefined;
}

export interface ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime {
  hours?: number | undefined;
  minutes?: number | undefined;
}

export interface GetPublicAccountSettingRequest {
  accountId?: string | undefined;
  name?: string | undefined;
}

export interface GetPublicAccountUserPreferenceRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  /** User ID of the user whose setting is being retrieved. */
  userId?: string | undefined;
  /** User Setting name. */
  name?: string | undefined;
}

export interface GetPublicWorkspaceSettingRequest {
  /** Name of the setting */
  name?: string | undefined;
}

export interface IntegerMessage {
  value?: number | undefined;
}

export interface ListAccountSettingsMetadataRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  /**
   * The maximum number of settings to return. The service may return fewer than this value.
   * If unspecified, at most 200 settings will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListAccountSettingsMetadataRequest` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListAccountSettingsMetadataRequest` must match
   * the call that provided the page token.
   */
  pageToken?: string | undefined;
}

export interface ListAccountSettingsMetadataResponse {
  /** List of all settings available via public APIs and their metadata */
  settingsMetadata?: SettingsMetadata[] | undefined;
  /**
   * A token that can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

export interface ListAccountUserPreferencesMetadataRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  /** User ID of the user whose settings metadata is being retrieved. */
  userId?: string | undefined;
  /**
   * The maximum number of settings to return. The service may return fewer than this value.
   * If unspecified, at most 200 settings will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListAccountUserPreferencesMetadataRequest` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListAccountUserPreferencesMetadataRequest` must match
   * the call that provided the page token.
   */
  pageToken?: string | undefined;
}

export interface ListAccountUserPreferencesMetadataResponse {
  /** List of all settings available via public APIs and their metadata */
  settingsMetadata?: SettingsMetadata[] | undefined;
  /**
   * A token that can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

export interface ListWorkspaceSettingsMetadataRequest {
  /**
   * The maximum number of settings to return. The service may return fewer than this value.
   * If unspecified, at most 200 settings will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListWorkspaceSettingsMetadataRequest` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListWorkspaceSettingsMetadataRequest` must match
   * the call that provided the page token.
   */
  pageToken?: string | undefined;
}

export interface ListWorkspaceSettingsMetadataResponse {
  /** List of all settings available via public APIs and their metadata */
  settingsMetadata?: SettingsMetadata[] | undefined;
  /**
   * A token that can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

export interface PatchPublicAccountSettingRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  name?: string | undefined;
  setting?: Setting | undefined;
}

export interface PatchPublicAccountUserPreferenceRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  /** User ID of the user whose setting is being updated. */
  userId?: string | undefined;
  name?: string | undefined;
  setting?: UserPreference | undefined;
}

export interface PatchPublicWorkspaceSettingRequest {
  /** Name of the setting */
  name?: string | undefined;
  setting?: Setting | undefined;
}

export interface PersonalComputeMessage {
  value?: PersonalComputeMessage_PersonalComputeMessageEnum | undefined;
}

export interface RestrictWorkspaceAdminsMessage {
  status?: RestrictWorkspaceAdminsMessage_Status | undefined;
  /**
   * When true, workspace admins cannot create governance tags.
   * ALLOW_ALL status does not override this; they are independent.
   */
  disableGovTagCreation?: boolean | undefined;
}

export interface Setting {
  /** Name of the setting. */
  name?: string | undefined;
  /** Setting value for boolean type setting. This is the setting value set by consumers, check effective_boolean_val for final setting value. */
  booleanVal?: BooleanMessage | undefined;
  /** Setting value for string type setting. This is the setting value set by consumers, check effective_string_val for final setting value. */
  stringVal?: StringMessage | undefined;
  /** Setting value for integer type setting. This is the setting value set by consumers, check effective_integer_val for final setting value. */
  integerVal?: IntegerMessage | undefined;
  /** Setting value for automatic_cluster_update_workspace setting. This is the setting value set by consumers, check effective_automatic_cluster_update_workspace for final setting value. */
  automaticClusterUpdateWorkspace?: ClusterAutoRestartMessage | undefined;
  /** Setting value for aibi_dashboard_embedding_approved_domains setting. This is the setting value set by consumers, check effective_aibi_dashboard_embedding_approved_domains for final setting value. */
  aibiDashboardEmbeddingApprovedDomains?:
    | AibiDashboardEmbeddingApprovedDomains
    | undefined;
  /** Setting value for aibi_dashboard_embedding_access_policy setting. This is the setting value set by consumers, check effective_aibi_dashboard_embedding_access_policy for final setting value. */
  aibiDashboardEmbeddingAccessPolicy?:
    | AibiDashboardEmbeddingAccessPolicy
    | undefined;
  /** Setting value for restrict_workspace_admins setting. This is the setting value set by consumers, check effective_restrict_workspace_admins for final setting value. */
  restrictWorkspaceAdmins?: RestrictWorkspaceAdminsMessage | undefined;
  /** Setting value for personal_compute setting. This is the setting value set by consumers, check effective_personal_compute for final setting value. */
  personalCompute?: PersonalComputeMessage | undefined;
  /** Effective setting value for boolean type setting. This is the final effective value of setting. To set a value use boolean_val. */
  effectiveBooleanVal?: BooleanMessage | undefined;
  /** Effective setting value for string type setting. This is the final effective value of setting. To set a value use string_val. */
  effectiveStringVal?: StringMessage | undefined;
  /** Effective setting value for integer type setting. This is the final effective value of setting. To set a value use integer_val. */
  effectiveIntegerVal?: IntegerMessage | undefined;
  /** Effective setting value for automatic_cluster_update_workspace setting. This is the final effective value of setting. To set a value use automatic_cluster_update_workspace. */
  effectiveAutomaticClusterUpdateWorkspace?:
    | ClusterAutoRestartMessage
    | undefined;
  /** Effective setting value for aibi_dashboard_embedding_approved_domains setting. This is the final effective value of setting. To set a value use aibi_dashboard_embedding_approved_domains. */
  effectiveAibiDashboardEmbeddingApprovedDomains?:
    | AibiDashboardEmbeddingApprovedDomains
    | undefined;
  /** Effective setting value for aibi_dashboard_embedding_access_policy setting. This is the final effective value of setting. To set a value use aibi_dashboard_embedding_access_policy. */
  effectiveAibiDashboardEmbeddingAccessPolicy?:
    | AibiDashboardEmbeddingAccessPolicy
    | undefined;
  /** Effective setting value for restrict_workspace_admins setting. This is the final effective value of setting. To set a value use restrict_workspace_admins. */
  effectiveRestrictWorkspaceAdmins?: RestrictWorkspaceAdminsMessage | undefined;
  /** Effective setting value for personal_compute setting. This is the final effective value of setting. To set a value use personal_compute. */
  effectivePersonalCompute?: PersonalComputeMessage | undefined;
}

export interface SettingsMetadata {
  /** Name of the setting. */
  name?: string | undefined;
  /** Setting description for what this setting controls */
  description?: string | undefined;
  /** Sample message depicting the type of the setting. To set this setting, the value sent must match this type. */
  type?: string | undefined;
  /** Link to databricks documentation for the setting */
  docsLink?: string | undefined;
}

export interface StringMessage {
  /** Represents a generic string value. */
  value?: string | undefined;
}

/**
 * User Preference represents a user-specific setting scoped to an individual user within an account.
 * Unlike workspace or account settings that apply to all users, user preferences allow personal
 * customization (e.g., UI theme, editor preferences) without affecting other users.
 */
export interface UserPreference {
  /** Name of the setting. */
  name?: string | undefined;
  /** User ID of the user. */
  userId?: string | undefined;
  booleanVal?: BooleanMessage | undefined;
  stringVal?: StringMessage | undefined;
  effectiveBooleanVal?: BooleanMessage | undefined;
  effectiveStringVal?: StringMessage | undefined;
}

export const unmarshalAibiDashboardEmbeddingAccessPolicySchema = z
  .object({
    access_policy_type: z
      .enum(AibiDashboardEmbeddingAccessPolicy_AccessPolicyType)
      .optional(),
  })
  .transform(d => ({
    accessPolicyType: d.access_policy_type,
  }));

export const unmarshalAibiDashboardEmbeddingApprovedDomainsSchema = z
  .object({
    approved_domains: z.array(z.string()).optional(),
  })
  .transform(d => ({
    approvedDomains: d.approved_domains,
  }));

export const unmarshalBooleanMessageSchema = z
  .object({
    value: z.boolean().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalClusterAutoRestartMessageSchema = z
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

export const unmarshalClusterAutoRestartMessage_EnablementDetailsSchema = z
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

export const unmarshalClusterAutoRestartMessage_MaintenanceWindowSchema = z
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

export const unmarshalClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedScheduleSchema =
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

export const unmarshalClusterAutoRestartMessage_MaintenanceWindow_WindowStartTimeSchema =
  z
    .object({
      hours: z.number().optional(),
      minutes: z.number().optional(),
    })
    .transform(d => ({
      hours: d.hours,
      minutes: d.minutes,
    }));

export const unmarshalGetPublicAccountSettingRequestSchema = z
  .object({
    account_id: z.string().optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    name: d.name,
  }));

export const unmarshalGetPublicAccountUserPreferenceRequestSchema = z
  .object({
    account_id: z.string().optional(),
    user_id: z.string().optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    userId: d.user_id,
    name: d.name,
  }));

export const unmarshalGetPublicWorkspaceSettingRequestSchema = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalIntegerMessageSchema = z
  .object({
    value: z.number().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalListAccountSettingsMetadataRequestSchema = z
  .object({
    account_id: z.string().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListAccountSettingsMetadataResponseSchema = z
  .object({
    settings_metadata: z
      .array(z.lazy(() => unmarshalSettingsMetadataSchema))
      .optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    settingsMetadata: d.settings_metadata,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListAccountUserPreferencesMetadataRequestSchema = z
  .object({
    account_id: z.string().optional(),
    user_id: z.string().optional(),
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    userId: d.user_id,
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListAccountUserPreferencesMetadataResponseSchema = z
  .object({
    settings_metadata: z
      .array(z.lazy(() => unmarshalSettingsMetadataSchema))
      .optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    settingsMetadata: d.settings_metadata,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListWorkspaceSettingsMetadataRequestSchema = z
  .object({
    page_size: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    pageSize: d.page_size,
    pageToken: d.page_token,
  }));

export const unmarshalListWorkspaceSettingsMetadataResponseSchema = z
  .object({
    settings_metadata: z
      .array(z.lazy(() => unmarshalSettingsMetadataSchema))
      .optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    settingsMetadata: d.settings_metadata,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalPatchPublicAccountSettingRequestSchema = z
  .object({
    account_id: z.string().optional(),
    name: z.string().optional(),
    setting: z.lazy(() => unmarshalSettingSchema).optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    name: d.name,
    setting: d.setting,
  }));

export const unmarshalPatchPublicAccountUserPreferenceRequestSchema = z
  .object({
    account_id: z.string().optional(),
    user_id: z.string().optional(),
    name: z.string().optional(),
    setting: z.lazy(() => unmarshalUserPreferenceSchema).optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    userId: d.user_id,
    name: d.name,
    setting: d.setting,
  }));

export const unmarshalPatchPublicWorkspaceSettingRequestSchema = z
  .object({
    name: z.string().optional(),
    setting: z.lazy(() => unmarshalSettingSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    setting: d.setting,
  }));

export const unmarshalPersonalComputeMessageSchema = z
  .object({
    value: z.enum(PersonalComputeMessage_PersonalComputeMessageEnum).optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalRestrictWorkspaceAdminsMessageSchema = z
  .object({
    status: z.enum(RestrictWorkspaceAdminsMessage_Status).optional(),
    disable_gov_tag_creation: z.boolean().optional(),
  })
  .transform(d => ({
    status: d.status,
    disableGovTagCreation: d.disable_gov_tag_creation,
  }));

export const unmarshalSettingSchema = z
  .object({
    name: z.string().optional(),
    boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    string_val: z.lazy(() => unmarshalStringMessageSchema).optional(),
    integer_val: z.lazy(() => unmarshalIntegerMessageSchema).optional(),
    automatic_cluster_update_workspace: z
      .lazy(() => unmarshalClusterAutoRestartMessageSchema)
      .optional(),
    aibi_dashboard_embedding_approved_domains: z
      .lazy(() => unmarshalAibiDashboardEmbeddingApprovedDomainsSchema)
      .optional(),
    aibi_dashboard_embedding_access_policy: z
      .lazy(() => unmarshalAibiDashboardEmbeddingAccessPolicySchema)
      .optional(),
    restrict_workspace_admins: z
      .lazy(() => unmarshalRestrictWorkspaceAdminsMessageSchema)
      .optional(),
    personal_compute: z
      .lazy(() => unmarshalPersonalComputeMessageSchema)
      .optional(),
    effective_boolean_val: z
      .lazy(() => unmarshalBooleanMessageSchema)
      .optional(),
    effective_string_val: z.lazy(() => unmarshalStringMessageSchema).optional(),
    effective_integer_val: z
      .lazy(() => unmarshalIntegerMessageSchema)
      .optional(),
    effective_automatic_cluster_update_workspace: z
      .lazy(() => unmarshalClusterAutoRestartMessageSchema)
      .optional(),
    effective_aibi_dashboard_embedding_approved_domains: z
      .lazy(() => unmarshalAibiDashboardEmbeddingApprovedDomainsSchema)
      .optional(),
    effective_aibi_dashboard_embedding_access_policy: z
      .lazy(() => unmarshalAibiDashboardEmbeddingAccessPolicySchema)
      .optional(),
    effective_restrict_workspace_admins: z
      .lazy(() => unmarshalRestrictWorkspaceAdminsMessageSchema)
      .optional(),
    effective_personal_compute: z
      .lazy(() => unmarshalPersonalComputeMessageSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    booleanVal: d.boolean_val,
    stringVal: d.string_val,
    integerVal: d.integer_val,
    automaticClusterUpdateWorkspace: d.automatic_cluster_update_workspace,
    aibiDashboardEmbeddingApprovedDomains:
      d.aibi_dashboard_embedding_approved_domains,
    aibiDashboardEmbeddingAccessPolicy:
      d.aibi_dashboard_embedding_access_policy,
    restrictWorkspaceAdmins: d.restrict_workspace_admins,
    personalCompute: d.personal_compute,
    effectiveBooleanVal: d.effective_boolean_val,
    effectiveStringVal: d.effective_string_val,
    effectiveIntegerVal: d.effective_integer_val,
    effectiveAutomaticClusterUpdateWorkspace:
      d.effective_automatic_cluster_update_workspace,
    effectiveAibiDashboardEmbeddingApprovedDomains:
      d.effective_aibi_dashboard_embedding_approved_domains,
    effectiveAibiDashboardEmbeddingAccessPolicy:
      d.effective_aibi_dashboard_embedding_access_policy,
    effectiveRestrictWorkspaceAdmins: d.effective_restrict_workspace_admins,
    effectivePersonalCompute: d.effective_personal_compute,
  }));

export const unmarshalSettingsMetadataSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    docs_link: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    type: d.type,
    docsLink: d.docs_link,
  }));

export const unmarshalStringMessageSchema = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalUserPreferenceSchema = z
  .object({
    name: z.string().optional(),
    user_id: z.string().optional(),
    boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    string_val: z.lazy(() => unmarshalStringMessageSchema).optional(),
    effective_boolean_val: z
      .lazy(() => unmarshalBooleanMessageSchema)
      .optional(),
    effective_string_val: z.lazy(() => unmarshalStringMessageSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    userId: d.user_id,
    booleanVal: d.boolean_val,
    stringVal: d.string_val,
    effectiveBooleanVal: d.effective_boolean_val,
    effectiveStringVal: d.effective_string_val,
  }));

export const marshalAibiDashboardEmbeddingAccessPolicySchema = z
  .object({
    accessPolicyType: z
      .enum(AibiDashboardEmbeddingAccessPolicy_AccessPolicyType)
      .optional(),
  })
  .transform(d => ({
    access_policy_type: d.accessPolicyType,
  }));

export const marshalAibiDashboardEmbeddingApprovedDomainsSchema = z
  .object({
    approvedDomains: z.array(z.string()).optional(),
  })
  .transform(d => ({
    approved_domains: d.approvedDomains,
  }));

export const marshalBooleanMessageSchema = z
  .object({
    value: z.boolean().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalClusterAutoRestartMessageSchema = z
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

export const marshalClusterAutoRestartMessage_EnablementDetailsSchema = z
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

export const marshalClusterAutoRestartMessage_MaintenanceWindowSchema = z
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

export const marshalClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedScheduleSchema =
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

export const marshalClusterAutoRestartMessage_MaintenanceWindow_WindowStartTimeSchema =
  z
    .object({
      hours: z.number().optional(),
      minutes: z.number().optional(),
    })
    .transform(d => ({
      hours: d.hours,
      minutes: d.minutes,
    }));

export const marshalGetPublicAccountSettingRequestSchema = z
  .object({
    accountId: z.string().optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    name: d.name,
  }));

export const marshalGetPublicAccountUserPreferenceRequestSchema = z
  .object({
    accountId: z.string().optional(),
    userId: z.string().optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    user_id: d.userId,
    name: d.name,
  }));

export const marshalGetPublicWorkspaceSettingRequestSchema = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalIntegerMessageSchema = z
  .object({
    value: z.number().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalListAccountSettingsMetadataRequestSchema = z
  .object({
    accountId: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListAccountSettingsMetadataResponseSchema = z
  .object({
    settingsMetadata: z
      .array(z.lazy(() => marshalSettingsMetadataSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    settings_metadata: d.settingsMetadata,
    next_page_token: d.nextPageToken,
  }));

export const marshalListAccountUserPreferencesMetadataRequestSchema = z
  .object({
    accountId: z.string().optional(),
    userId: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    user_id: d.userId,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListAccountUserPreferencesMetadataResponseSchema = z
  .object({
    settingsMetadata: z
      .array(z.lazy(() => marshalSettingsMetadataSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    settings_metadata: d.settingsMetadata,
    next_page_token: d.nextPageToken,
  }));

export const marshalListWorkspaceSettingsMetadataRequestSchema = z
  .object({
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListWorkspaceSettingsMetadataResponseSchema = z
  .object({
    settingsMetadata: z
      .array(z.lazy(() => marshalSettingsMetadataSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    settings_metadata: d.settingsMetadata,
    next_page_token: d.nextPageToken,
  }));

export const marshalPatchPublicAccountSettingRequestSchema = z
  .object({
    accountId: z.string().optional(),
    name: z.string().optional(),
    setting: z.lazy(() => marshalSettingSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    name: d.name,
    setting: d.setting,
  }));

export const marshalPatchPublicAccountUserPreferenceRequestSchema = z
  .object({
    accountId: z.string().optional(),
    userId: z.string().optional(),
    name: z.string().optional(),
    setting: z.lazy(() => marshalUserPreferenceSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    user_id: d.userId,
    name: d.name,
    setting: d.setting,
  }));

export const marshalPatchPublicWorkspaceSettingRequestSchema = z
  .object({
    name: z.string().optional(),
    setting: z.lazy(() => marshalSettingSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    setting: d.setting,
  }));

export const marshalPersonalComputeMessageSchema = z
  .object({
    value: z.enum(PersonalComputeMessage_PersonalComputeMessageEnum).optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalRestrictWorkspaceAdminsMessageSchema = z
  .object({
    status: z.enum(RestrictWorkspaceAdminsMessage_Status).optional(),
    disableGovTagCreation: z.boolean().optional(),
  })
  .transform(d => ({
    status: d.status,
    disable_gov_tag_creation: d.disableGovTagCreation,
  }));

export const marshalSettingSchema = z
  .object({
    name: z.string().optional(),
    booleanVal: z.lazy(() => marshalBooleanMessageSchema).optional(),
    stringVal: z.lazy(() => marshalStringMessageSchema).optional(),
    integerVal: z.lazy(() => marshalIntegerMessageSchema).optional(),
    automaticClusterUpdateWorkspace: z
      .lazy(() => marshalClusterAutoRestartMessageSchema)
      .optional(),
    aibiDashboardEmbeddingApprovedDomains: z
      .lazy(() => marshalAibiDashboardEmbeddingApprovedDomainsSchema)
      .optional(),
    aibiDashboardEmbeddingAccessPolicy: z
      .lazy(() => marshalAibiDashboardEmbeddingAccessPolicySchema)
      .optional(),
    restrictWorkspaceAdmins: z
      .lazy(() => marshalRestrictWorkspaceAdminsMessageSchema)
      .optional(),
    personalCompute: z
      .lazy(() => marshalPersonalComputeMessageSchema)
      .optional(),
    effectiveBooleanVal: z.lazy(() => marshalBooleanMessageSchema).optional(),
    effectiveStringVal: z.lazy(() => marshalStringMessageSchema).optional(),
    effectiveIntegerVal: z.lazy(() => marshalIntegerMessageSchema).optional(),
    effectiveAutomaticClusterUpdateWorkspace: z
      .lazy(() => marshalClusterAutoRestartMessageSchema)
      .optional(),
    effectiveAibiDashboardEmbeddingApprovedDomains: z
      .lazy(() => marshalAibiDashboardEmbeddingApprovedDomainsSchema)
      .optional(),
    effectiveAibiDashboardEmbeddingAccessPolicy: z
      .lazy(() => marshalAibiDashboardEmbeddingAccessPolicySchema)
      .optional(),
    effectiveRestrictWorkspaceAdmins: z
      .lazy(() => marshalRestrictWorkspaceAdminsMessageSchema)
      .optional(),
    effectivePersonalCompute: z
      .lazy(() => marshalPersonalComputeMessageSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    boolean_val: d.booleanVal,
    string_val: d.stringVal,
    integer_val: d.integerVal,
    automatic_cluster_update_workspace: d.automaticClusterUpdateWorkspace,
    aibi_dashboard_embedding_approved_domains:
      d.aibiDashboardEmbeddingApprovedDomains,
    aibi_dashboard_embedding_access_policy:
      d.aibiDashboardEmbeddingAccessPolicy,
    restrict_workspace_admins: d.restrictWorkspaceAdmins,
    personal_compute: d.personalCompute,
    effective_boolean_val: d.effectiveBooleanVal,
    effective_string_val: d.effectiveStringVal,
    effective_integer_val: d.effectiveIntegerVal,
    effective_automatic_cluster_update_workspace:
      d.effectiveAutomaticClusterUpdateWorkspace,
    effective_aibi_dashboard_embedding_approved_domains:
      d.effectiveAibiDashboardEmbeddingApprovedDomains,
    effective_aibi_dashboard_embedding_access_policy:
      d.effectiveAibiDashboardEmbeddingAccessPolicy,
    effective_restrict_workspace_admins: d.effectiveRestrictWorkspaceAdmins,
    effective_personal_compute: d.effectivePersonalCompute,
  }));

export const marshalSettingsMetadataSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    docsLink: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    type: d.type,
    docs_link: d.docsLink,
  }));

export const marshalStringMessageSchema = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalUserPreferenceSchema = z
  .object({
    name: z.string().optional(),
    userId: z.string().optional(),
    booleanVal: z.lazy(() => marshalBooleanMessageSchema).optional(),
    stringVal: z.lazy(() => marshalStringMessageSchema).optional(),
    effectiveBooleanVal: z.lazy(() => marshalBooleanMessageSchema).optional(),
    effectiveStringVal: z.lazy(() => marshalStringMessageSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    user_id: d.userId,
    boolean_val: d.booleanVal,
    string_val: d.stringVal,
    effective_boolean_val: d.effectiveBooleanVal,
    effective_string_val: d.effectiveStringVal,
  }));
