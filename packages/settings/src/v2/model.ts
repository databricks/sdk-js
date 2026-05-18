// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * Preview phase for settings that are feature previews.
 * For settings that are not feature previews, the preview_phase field is left unset.
 * Mirrors only the customer-facing phases surfaced in the UI; internal-only phases
 * (DISABLED, DEV, UNDER_MIGRATION, LAUNCHED, etc.) are not exposed here.
 */
export enum PreviewPhase {
  /** Default value. Indicates the preview phase is unknown or the setting is not a feature preview. */
  PREVIEW_PHASE_UNSPECIFIED = 'PREVIEW_PHASE_UNSPECIFIED',
  /** The feature is in private preview, available only to specifically enrolled customers. */
  PRIVATE_PREVIEW = 'PRIVATE_PREVIEW',
  /**
   * The feature is in public preview, available to all customers. Also used for gated public
   * preview (available to customers who request access) since the distinction is internal.
   */
  PUBLIC_PREVIEW = 'PUBLIC_PREVIEW',
  /** The feature is in beta. */
  BETA = 'BETA',
  /** The feature is approaching general availability. */
  GA_SOON = 'GA_SOON',
  /** The feature has reached general availability. */
  GA = 'GA',
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

/**
 * ON: Grants all users in all workspaces access to the Personal Compute default policy, allowing all users to create single-machine compute resources.
 * DELEGATE: Moves access control for the Personal Compute default policy to individual workspaces and requires a workspace’s users or groups to be added to the ACLs of that workspace’s Personal Compute default policy before they will be able to create compute resources through that policy.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum PersonalComputeMessage_PersonalComputeMessageEnum {
  PERSONAL_COMPUTE_MESSAGE_ENUM_UNSPECIFIED = 'PERSONAL_COMPUTE_MESSAGE_ENUM_UNSPECIFIED',
  ON = 'ON',
  DELEGATE = 'DELEGATE',
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

export interface AibiDashboardEmbeddingApprovedDomains {
  approvedDomains?: string[] | undefined;
}

export interface AllowedAppsUserApiScopesMessage {
  allowedScopes?: string[] | undefined;
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

export interface OperationalEmailCustomRecipientMessage {
  email?: string | undefined;
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
  /**
   * New fields should be added before the oneof below - unless it's a new Setting value message,
   * in that case it needs to be defined in the oneof below.
   * The user-set value that goes into storage
   */
  value?:
    | {
        $case: 'booleanVal';
        /** Setting value for boolean type setting. This is the setting value set by consumers, check effective_boolean_val for final setting value. */
        booleanVal: BooleanMessage;
      }
    | {
        $case: 'stringVal';
        /** Setting value for string type setting. This is the setting value set by consumers, check effective_string_val for final setting value. */
        stringVal: StringMessage;
      }
    | {
        $case: 'integerVal';
        /** Setting value for integer type setting. This is the setting value set by consumers, check effective_integer_val for final setting value. */
        integerVal: IntegerMessage;
      }
    | {
        $case: 'automaticClusterUpdateWorkspace';
        /** Setting value for automatic_cluster_update_workspace setting. This is the setting value set by consumers, check effective_automatic_cluster_update_workspace for final setting value. */
        automaticClusterUpdateWorkspace: ClusterAutoRestartMessage;
      }
    | {
        $case: 'aibiDashboardEmbeddingApprovedDomains';
        /** Setting value for aibi_dashboard_embedding_approved_domains setting. This is the setting value set by consumers, check effective_aibi_dashboard_embedding_approved_domains for final setting value. */
        aibiDashboardEmbeddingApprovedDomains: AibiDashboardEmbeddingApprovedDomains;
      }
    | {
        $case: 'aibiDashboardEmbeddingAccessPolicy';
        /** Setting value for aibi_dashboard_embedding_access_policy setting. This is the setting value set by consumers, check effective_aibi_dashboard_embedding_access_policy for final setting value. */
        aibiDashboardEmbeddingAccessPolicy: AibiDashboardEmbeddingAccessPolicy;
      }
    | {
        $case: 'restrictWorkspaceAdmins';
        /** Setting value for restrict_workspace_admins setting. This is the setting value set by consumers, check effective_restrict_workspace_admins for final setting value. */
        restrictWorkspaceAdmins: RestrictWorkspaceAdminsMessage;
      }
    | {
        $case: 'personalCompute';
        /** Setting value for personal_compute setting. This is the setting value set by consumers, check effective_personal_compute for final setting value. */
        personalCompute: PersonalComputeMessage;
      }
    | {
        $case: 'allowedAppsUserApiScopes';
        /** Setting value for allowed_apps_user_api_scopes setting. This is the setting value set by consumers, check effective_allowed_apps_user_api_scopes for final setting value. */
        allowedAppsUserApiScopes: AllowedAppsUserApiScopesMessage;
      }
    | {
        $case: 'operationalEmailCustomRecipient';
        /** Setting value for operational_email_custom_recipient setting. This is the setting value set by consumers, check effective_operational_email_custom_recipient for final setting value. */
        operationalEmailCustomRecipient: OperationalEmailCustomRecipientMessage;
      }
    | undefined;
  /**
   * New fields should be added before the oneof below - unless it's a new Setting value message,
   * in that case it needs to be defined in the oneof below.
   * The final effective value from server as per the policy evaluation.
   */
  effectiveValue?:
    | {
        $case: 'effectiveBooleanVal';
        /** Effective setting value for boolean type setting. This is the final effective value of setting. To set a value use boolean_val. */
        effectiveBooleanVal: BooleanMessage;
      }
    | {
        $case: 'effectiveStringVal';
        /** Effective setting value for string type setting. This is the final effective value of setting. To set a value use string_val. */
        effectiveStringVal: StringMessage;
      }
    | {
        $case: 'effectiveIntegerVal';
        /** Effective setting value for integer type setting. This is the final effective value of setting. To set a value use integer_val. */
        effectiveIntegerVal: IntegerMessage;
      }
    | {
        $case: 'effectiveAutomaticClusterUpdateWorkspace';
        /** Effective setting value for automatic_cluster_update_workspace setting. This is the final effective value of setting. To set a value use automatic_cluster_update_workspace. */
        effectiveAutomaticClusterUpdateWorkspace: ClusterAutoRestartMessage;
      }
    | {
        $case: 'effectiveAibiDashboardEmbeddingApprovedDomains';
        /** Effective setting value for aibi_dashboard_embedding_approved_domains setting. This is the final effective value of setting. To set a value use aibi_dashboard_embedding_approved_domains. */
        effectiveAibiDashboardEmbeddingApprovedDomains: AibiDashboardEmbeddingApprovedDomains;
      }
    | {
        $case: 'effectiveAibiDashboardEmbeddingAccessPolicy';
        /** Effective setting value for aibi_dashboard_embedding_access_policy setting. This is the final effective value of setting. To set a value use aibi_dashboard_embedding_access_policy. */
        effectiveAibiDashboardEmbeddingAccessPolicy: AibiDashboardEmbeddingAccessPolicy;
      }
    | {
        $case: 'effectiveRestrictWorkspaceAdmins';
        /** Effective setting value for restrict_workspace_admins setting. This is the final effective value of setting. To set a value use restrict_workspace_admins. */
        effectiveRestrictWorkspaceAdmins: RestrictWorkspaceAdminsMessage;
      }
    | {
        $case: 'effectivePersonalCompute';
        /** Effective setting value for personal_compute setting. This is the final effective value of setting. To set a value use personal_compute. */
        effectivePersonalCompute: PersonalComputeMessage;
      }
    | {
        $case: 'effectiveAllowedAppsUserApiScopes';
        /** Effective setting value for allowed_apps_user_api_scopes setting. This is the final effective value of setting. To set a value use allowed_apps_user_api_scopes. */
        effectiveAllowedAppsUserApiScopes: AllowedAppsUserApiScopesMessage;
      }
    | {
        $case: 'effectiveOperationalEmailCustomRecipient';
        /** Effective setting value for operational_email_custom_recipient setting. This is the final effective value of setting. To set a value use operational_email_custom_recipient. */
        effectiveOperationalEmailCustomRecipient: OperationalEmailCustomRecipientMessage;
      }
    | undefined;
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
  /** Preview phase for feature preview settings. This field is not set for non-preview settings. */
  previewPhase?: PreviewPhase | undefined;
  /**
   * Human-readable display name for the setting or feature preview.
   * This field may be unset if no display name is available.
   */
  displayName?: string | undefined;
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
  /**
   * New fields should be added before the oneof below - unless it's a new Setting value message,
   * in that case it needs to be defined in the oneof below.
   * The user-set value that goes into storage.
   */
  value?:
    | {$case: 'booleanVal'; booleanVal: BooleanMessage}
    | {$case: 'stringVal'; stringVal: StringMessage}
    | undefined;
  /**
   * New fields should be added before the oneof below - unless it's a new User Preference value message,
   * in that case it needs to be defined in the oneof below.
   * The final effective value from server as per the policy evaluation.
   */
  effectiveValue?:
    | {$case: 'effectiveBooleanVal'; effectiveBooleanVal: BooleanMessage}
    | {$case: 'effectiveStringVal'; effectiveStringVal: StringMessage}
    | undefined;
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

export const unmarshalAibiDashboardEmbeddingApprovedDomainsSchema: z.ZodType<AibiDashboardEmbeddingApprovedDomains> =
  z
    .object({
      approved_domains: z.array(z.string()).optional(),
    })
    .transform(d => ({
      approvedDomains: d.approved_domains,
    }));

export const unmarshalAllowedAppsUserApiScopesMessageSchema: z.ZodType<AllowedAppsUserApiScopesMessage> =
  z
    .object({
      allowed_scopes: z.array(z.string()).optional(),
    })
    .transform(d => ({
      allowedScopes: d.allowed_scopes,
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

export const unmarshalIntegerMessageSchema: z.ZodType<IntegerMessage> = z
  .object({
    value: z.number().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalListAccountSettingsMetadataResponseSchema: z.ZodType<ListAccountSettingsMetadataResponse> =
  z
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

export const unmarshalListAccountUserPreferencesMetadataResponseSchema: z.ZodType<ListAccountUserPreferencesMetadataResponse> =
  z
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

export const unmarshalListWorkspaceSettingsMetadataResponseSchema: z.ZodType<ListWorkspaceSettingsMetadataResponse> =
  z
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

export const unmarshalOperationalEmailCustomRecipientMessageSchema: z.ZodType<OperationalEmailCustomRecipientMessage> =
  z
    .object({
      email: z.string().optional(),
    })
    .transform(d => ({
      email: d.email,
    }));

export const unmarshalPersonalComputeMessageSchema: z.ZodType<PersonalComputeMessage> =
  z
    .object({
      value: z
        .enum(PersonalComputeMessage_PersonalComputeMessageEnum)
        .optional(),
    })
    .transform(d => ({
      value: d.value,
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

export const unmarshalSettingSchema: z.ZodType<Setting> = z
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
    allowed_apps_user_api_scopes: z
      .lazy(() => unmarshalAllowedAppsUserApiScopesMessageSchema)
      .optional(),
    operational_email_custom_recipient: z
      .lazy(() => unmarshalOperationalEmailCustomRecipientMessageSchema)
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
    effective_allowed_apps_user_api_scopes: z
      .lazy(() => unmarshalAllowedAppsUserApiScopesMessageSchema)
      .optional(),
    effective_operational_email_custom_recipient: z
      .lazy(() => unmarshalOperationalEmailCustomRecipientMessageSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    value:
      d.boolean_val !== undefined
        ? {$case: 'booleanVal' as const, booleanVal: d.boolean_val}
        : d.string_val !== undefined
          ? {$case: 'stringVal' as const, stringVal: d.string_val}
          : d.integer_val !== undefined
            ? {$case: 'integerVal' as const, integerVal: d.integer_val}
            : d.automatic_cluster_update_workspace !== undefined
              ? {
                  $case: 'automaticClusterUpdateWorkspace' as const,
                  automaticClusterUpdateWorkspace:
                    d.automatic_cluster_update_workspace,
                }
              : d.aibi_dashboard_embedding_approved_domains !== undefined
                ? {
                    $case: 'aibiDashboardEmbeddingApprovedDomains' as const,
                    aibiDashboardEmbeddingApprovedDomains:
                      d.aibi_dashboard_embedding_approved_domains,
                  }
                : d.aibi_dashboard_embedding_access_policy !== undefined
                  ? {
                      $case: 'aibiDashboardEmbeddingAccessPolicy' as const,
                      aibiDashboardEmbeddingAccessPolicy:
                        d.aibi_dashboard_embedding_access_policy,
                    }
                  : d.restrict_workspace_admins !== undefined
                    ? {
                        $case: 'restrictWorkspaceAdmins' as const,
                        restrictWorkspaceAdmins: d.restrict_workspace_admins,
                      }
                    : d.personal_compute !== undefined
                      ? {
                          $case: 'personalCompute' as const,
                          personalCompute: d.personal_compute,
                        }
                      : d.allowed_apps_user_api_scopes !== undefined
                        ? {
                            $case: 'allowedAppsUserApiScopes' as const,
                            allowedAppsUserApiScopes:
                              d.allowed_apps_user_api_scopes,
                          }
                        : d.operational_email_custom_recipient !== undefined
                          ? {
                              $case: 'operationalEmailCustomRecipient' as const,
                              operationalEmailCustomRecipient:
                                d.operational_email_custom_recipient,
                            }
                          : undefined,
    effectiveValue:
      d.effective_boolean_val !== undefined
        ? {
            $case: 'effectiveBooleanVal' as const,
            effectiveBooleanVal: d.effective_boolean_val,
          }
        : d.effective_string_val !== undefined
          ? {
              $case: 'effectiveStringVal' as const,
              effectiveStringVal: d.effective_string_val,
            }
          : d.effective_integer_val !== undefined
            ? {
                $case: 'effectiveIntegerVal' as const,
                effectiveIntegerVal: d.effective_integer_val,
              }
            : d.effective_automatic_cluster_update_workspace !== undefined
              ? {
                  $case: 'effectiveAutomaticClusterUpdateWorkspace' as const,
                  effectiveAutomaticClusterUpdateWorkspace:
                    d.effective_automatic_cluster_update_workspace,
                }
              : d.effective_aibi_dashboard_embedding_approved_domains !==
                  undefined
                ? {
                    $case:
                      'effectiveAibiDashboardEmbeddingApprovedDomains' as const,
                    effectiveAibiDashboardEmbeddingApprovedDomains:
                      d.effective_aibi_dashboard_embedding_approved_domains,
                  }
                : d.effective_aibi_dashboard_embedding_access_policy !==
                    undefined
                  ? {
                      $case:
                        'effectiveAibiDashboardEmbeddingAccessPolicy' as const,
                      effectiveAibiDashboardEmbeddingAccessPolicy:
                        d.effective_aibi_dashboard_embedding_access_policy,
                    }
                  : d.effective_restrict_workspace_admins !== undefined
                    ? {
                        $case: 'effectiveRestrictWorkspaceAdmins' as const,
                        effectiveRestrictWorkspaceAdmins:
                          d.effective_restrict_workspace_admins,
                      }
                    : d.effective_personal_compute !== undefined
                      ? {
                          $case: 'effectivePersonalCompute' as const,
                          effectivePersonalCompute:
                            d.effective_personal_compute,
                        }
                      : d.effective_allowed_apps_user_api_scopes !== undefined
                        ? {
                            $case: 'effectiveAllowedAppsUserApiScopes' as const,
                            effectiveAllowedAppsUserApiScopes:
                              d.effective_allowed_apps_user_api_scopes,
                          }
                        : d.effective_operational_email_custom_recipient !==
                            undefined
                          ? {
                              $case:
                                'effectiveOperationalEmailCustomRecipient' as const,
                              effectiveOperationalEmailCustomRecipient:
                                d.effective_operational_email_custom_recipient,
                            }
                          : undefined,
  }));

export const unmarshalSettingsMetadataSchema: z.ZodType<SettingsMetadata> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    docs_link: z.string().optional(),
    preview_phase: z.enum(PreviewPhase).optional(),
    display_name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    type: d.type,
    docsLink: d.docs_link,
    previewPhase: d.preview_phase,
    displayName: d.display_name,
  }));

export const unmarshalStringMessageSchema: z.ZodType<StringMessage> = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalUserPreferenceSchema: z.ZodType<UserPreference> = z
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
    value:
      d.boolean_val !== undefined
        ? {$case: 'booleanVal' as const, booleanVal: d.boolean_val}
        : d.string_val !== undefined
          ? {$case: 'stringVal' as const, stringVal: d.string_val}
          : undefined,
    effectiveValue:
      d.effective_boolean_val !== undefined
        ? {
            $case: 'effectiveBooleanVal' as const,
            effectiveBooleanVal: d.effective_boolean_val,
          }
        : d.effective_string_val !== undefined
          ? {
              $case: 'effectiveStringVal' as const,
              effectiveStringVal: d.effective_string_val,
            }
          : undefined,
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

export const marshalAibiDashboardEmbeddingApprovedDomainsSchema: z.ZodType = z
  .object({
    approvedDomains: z.array(z.string()).optional(),
  })
  .transform(d => ({
    approved_domains: d.approvedDomains,
  }));

export const marshalAllowedAppsUserApiScopesMessageSchema: z.ZodType = z
  .object({
    allowedScopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    allowed_scopes: d.allowedScopes,
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

export const marshalIntegerMessageSchema: z.ZodType = z
  .object({
    value: z.number().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalOperationalEmailCustomRecipientMessageSchema: z.ZodType = z
  .object({
    email: z.string().optional(),
  })
  .transform(d => ({
    email: d.email,
  }));

export const marshalPersonalComputeMessageSchema: z.ZodType = z
  .object({
    value: z.enum(PersonalComputeMessage_PersonalComputeMessageEnum).optional(),
  })
  .transform(d => ({
    value: d.value,
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

export const marshalSettingSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('booleanVal'),
          booleanVal: z.lazy(() => marshalBooleanMessageSchema),
        }),
        z.object({
          $case: z.literal('stringVal'),
          stringVal: z.lazy(() => marshalStringMessageSchema),
        }),
        z.object({
          $case: z.literal('integerVal'),
          integerVal: z.lazy(() => marshalIntegerMessageSchema),
        }),
        z.object({
          $case: z.literal('automaticClusterUpdateWorkspace'),
          automaticClusterUpdateWorkspace: z.lazy(
            () => marshalClusterAutoRestartMessageSchema
          ),
        }),
        z.object({
          $case: z.literal('aibiDashboardEmbeddingApprovedDomains'),
          aibiDashboardEmbeddingApprovedDomains: z.lazy(
            () => marshalAibiDashboardEmbeddingApprovedDomainsSchema
          ),
        }),
        z.object({
          $case: z.literal('aibiDashboardEmbeddingAccessPolicy'),
          aibiDashboardEmbeddingAccessPolicy: z.lazy(
            () => marshalAibiDashboardEmbeddingAccessPolicySchema
          ),
        }),
        z.object({
          $case: z.literal('restrictWorkspaceAdmins'),
          restrictWorkspaceAdmins: z.lazy(
            () => marshalRestrictWorkspaceAdminsMessageSchema
          ),
        }),
        z.object({
          $case: z.literal('personalCompute'),
          personalCompute: z.lazy(() => marshalPersonalComputeMessageSchema),
        }),
        z.object({
          $case: z.literal('allowedAppsUserApiScopes'),
          allowedAppsUserApiScopes: z.lazy(
            () => marshalAllowedAppsUserApiScopesMessageSchema
          ),
        }),
        z.object({
          $case: z.literal('operationalEmailCustomRecipient'),
          operationalEmailCustomRecipient: z.lazy(
            () => marshalOperationalEmailCustomRecipientMessageSchema
          ),
        }),
      ])
      .optional(),
    effectiveValue: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('effectiveBooleanVal'),
          effectiveBooleanVal: z.lazy(() => marshalBooleanMessageSchema),
        }),
        z.object({
          $case: z.literal('effectiveStringVal'),
          effectiveStringVal: z.lazy(() => marshalStringMessageSchema),
        }),
        z.object({
          $case: z.literal('effectiveIntegerVal'),
          effectiveIntegerVal: z.lazy(() => marshalIntegerMessageSchema),
        }),
        z.object({
          $case: z.literal('effectiveAutomaticClusterUpdateWorkspace'),
          effectiveAutomaticClusterUpdateWorkspace: z.lazy(
            () => marshalClusterAutoRestartMessageSchema
          ),
        }),
        z.object({
          $case: z.literal('effectiveAibiDashboardEmbeddingApprovedDomains'),
          effectiveAibiDashboardEmbeddingApprovedDomains: z.lazy(
            () => marshalAibiDashboardEmbeddingApprovedDomainsSchema
          ),
        }),
        z.object({
          $case: z.literal('effectiveAibiDashboardEmbeddingAccessPolicy'),
          effectiveAibiDashboardEmbeddingAccessPolicy: z.lazy(
            () => marshalAibiDashboardEmbeddingAccessPolicySchema
          ),
        }),
        z.object({
          $case: z.literal('effectiveRestrictWorkspaceAdmins'),
          effectiveRestrictWorkspaceAdmins: z.lazy(
            () => marshalRestrictWorkspaceAdminsMessageSchema
          ),
        }),
        z.object({
          $case: z.literal('effectivePersonalCompute'),
          effectivePersonalCompute: z.lazy(
            () => marshalPersonalComputeMessageSchema
          ),
        }),
        z.object({
          $case: z.literal('effectiveAllowedAppsUserApiScopes'),
          effectiveAllowedAppsUserApiScopes: z.lazy(
            () => marshalAllowedAppsUserApiScopesMessageSchema
          ),
        }),
        z.object({
          $case: z.literal('effectiveOperationalEmailCustomRecipient'),
          effectiveOperationalEmailCustomRecipient: z.lazy(
            () => marshalOperationalEmailCustomRecipientMessageSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    ...(d.value?.$case === 'booleanVal' && {boolean_val: d.value.booleanVal}),
    ...(d.value?.$case === 'stringVal' && {string_val: d.value.stringVal}),
    ...(d.value?.$case === 'integerVal' && {integer_val: d.value.integerVal}),
    ...(d.value?.$case === 'automaticClusterUpdateWorkspace' && {
      automatic_cluster_update_workspace:
        d.value.automaticClusterUpdateWorkspace,
    }),
    ...(d.value?.$case === 'aibiDashboardEmbeddingApprovedDomains' && {
      aibi_dashboard_embedding_approved_domains:
        d.value.aibiDashboardEmbeddingApprovedDomains,
    }),
    ...(d.value?.$case === 'aibiDashboardEmbeddingAccessPolicy' && {
      aibi_dashboard_embedding_access_policy:
        d.value.aibiDashboardEmbeddingAccessPolicy,
    }),
    ...(d.value?.$case === 'restrictWorkspaceAdmins' && {
      restrict_workspace_admins: d.value.restrictWorkspaceAdmins,
    }),
    ...(d.value?.$case === 'personalCompute' && {
      personal_compute: d.value.personalCompute,
    }),
    ...(d.value?.$case === 'allowedAppsUserApiScopes' && {
      allowed_apps_user_api_scopes: d.value.allowedAppsUserApiScopes,
    }),
    ...(d.value?.$case === 'operationalEmailCustomRecipient' && {
      operational_email_custom_recipient:
        d.value.operationalEmailCustomRecipient,
    }),
    ...(d.effectiveValue?.$case === 'effectiveBooleanVal' && {
      effective_boolean_val: d.effectiveValue.effectiveBooleanVal,
    }),
    ...(d.effectiveValue?.$case === 'effectiveStringVal' && {
      effective_string_val: d.effectiveValue.effectiveStringVal,
    }),
    ...(d.effectiveValue?.$case === 'effectiveIntegerVal' && {
      effective_integer_val: d.effectiveValue.effectiveIntegerVal,
    }),
    ...(d.effectiveValue?.$case ===
      'effectiveAutomaticClusterUpdateWorkspace' && {
      effective_automatic_cluster_update_workspace:
        d.effectiveValue.effectiveAutomaticClusterUpdateWorkspace,
    }),
    ...(d.effectiveValue?.$case ===
      'effectiveAibiDashboardEmbeddingApprovedDomains' && {
      effective_aibi_dashboard_embedding_approved_domains:
        d.effectiveValue.effectiveAibiDashboardEmbeddingApprovedDomains,
    }),
    ...(d.effectiveValue?.$case ===
      'effectiveAibiDashboardEmbeddingAccessPolicy' && {
      effective_aibi_dashboard_embedding_access_policy:
        d.effectiveValue.effectiveAibiDashboardEmbeddingAccessPolicy,
    }),
    ...(d.effectiveValue?.$case === 'effectiveRestrictWorkspaceAdmins' && {
      effective_restrict_workspace_admins:
        d.effectiveValue.effectiveRestrictWorkspaceAdmins,
    }),
    ...(d.effectiveValue?.$case === 'effectivePersonalCompute' && {
      effective_personal_compute: d.effectiveValue.effectivePersonalCompute,
    }),
    ...(d.effectiveValue?.$case === 'effectiveAllowedAppsUserApiScopes' && {
      effective_allowed_apps_user_api_scopes:
        d.effectiveValue.effectiveAllowedAppsUserApiScopes,
    }),
    ...(d.effectiveValue?.$case ===
      'effectiveOperationalEmailCustomRecipient' && {
      effective_operational_email_custom_recipient:
        d.effectiveValue.effectiveOperationalEmailCustomRecipient,
    }),
  }));

export const marshalStringMessageSchema: z.ZodType = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalUserPreferenceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    userId: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('booleanVal'),
          booleanVal: z.lazy(() => marshalBooleanMessageSchema),
        }),
        z.object({
          $case: z.literal('stringVal'),
          stringVal: z.lazy(() => marshalStringMessageSchema),
        }),
      ])
      .optional(),
    effectiveValue: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('effectiveBooleanVal'),
          effectiveBooleanVal: z.lazy(() => marshalBooleanMessageSchema),
        }),
        z.object({
          $case: z.literal('effectiveStringVal'),
          effectiveStringVal: z.lazy(() => marshalStringMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    user_id: d.userId,
    ...(d.value?.$case === 'booleanVal' && {boolean_val: d.value.booleanVal}),
    ...(d.value?.$case === 'stringVal' && {string_val: d.value.stringVal}),
    ...(d.effectiveValue?.$case === 'effectiveBooleanVal' && {
      effective_boolean_val: d.effectiveValue.effectiveBooleanVal,
    }),
    ...(d.effectiveValue?.$case === 'effectiveStringVal' && {
      effective_string_val: d.effectiveValue.effectiveStringVal,
    }),
  }));
