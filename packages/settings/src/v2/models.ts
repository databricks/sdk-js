// Automatically generated. Do not edit.

export type AccessPolicyType =
  | 'ACCESS_POLICY_TYPE_UNSPECIFIED'
  | 'ALLOW_ALL_DOMAINS'
  | 'ALLOW_APPROVED_DOMAINS'
  | 'DENY_ALL_DOMAINS';

export type DayOfWeek =
  | 'DAY_OF_WEEK_UNSPECIFIED'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

/**  
 ON: Grants all users in all workspaces access to the Personal Compute default policy, allowing all users to create single-machine compute resources.
 DELEGATE: Moves access control for the Personal Compute default policy to individual workspaces and requires a workspace’s users or groups to be added to the ACLs of that workspace’s Personal Compute default policy before they will be able to create compute resources through that policy.
 */
export type PersonalComputeMessageEnum =
  | 'PERSONAL_COMPUTE_MESSAGE_ENUM_UNSPECIFIED'
  | 'ON'
  | 'DELEGATE';

export type Status =
  | 'STATUS_UNSPECIFIED'
  | 'ALLOW_ALL'
  | 'RESTRICT_TOKENS_AND_JOB_RUN_AS';

export type WeekDayFrequency =
  | 'WEEK_DAY_FREQUENCY_UNSPECIFIED'
  | 'FIRST_OF_MONTH'
  | 'SECOND_OF_MONTH'
  | 'THIRD_OF_MONTH'
  | 'FOURTH_OF_MONTH'
  | 'FIRST_AND_THIRD_OF_MONTH'
  | 'SECOND_AND_FOURTH_OF_MONTH'
  | 'EVERY_WEEK';

export interface AibiDashboardEmbeddingAccessPolicy {
  accessPolicyType?: AccessPolicyType;
}

export interface AibiDashboardEmbeddingApprovedDomains {
  approvedDomains?: string[];
}

export interface BooleanMessage {
  value?: boolean;
}

export interface ClusterAutoRestartMessage {
  enabled?: boolean;
  canToggle?: boolean;
  maintenanceWindow?: MaintenanceWindow;
  enablementDetails?: EnablementDetails;
  restartEvenIfNoUpdatesAvailable?: boolean;
}

/**  
 Contains an information about the enablement status judging (e.g. whether the enterprise tier
 is enabled)
 This is only additional information that MUST NOT be used to decide whether the setting is
 enabled or not. This is intended to use only for purposes like showing an error message to
 the customer with the additional details. For example, using these details we can check
 why exactly the feature is disabled for this customer.
 */
export type EnablementDetails = Record<string, never>;

export interface GetPublicAccountSettingRequest {
  accountId?: string;
  name?: string;
}

export interface GetPublicAccountUserPreferenceRequest {
  accountId?: string;
  userId?: string;
  name?: string;
}

export interface GetPublicWorkspaceSettingRequest {
  name?: string;
}

export interface IntegerMessage {
  value?: number;
}

export interface ListAccountSettingsMetadataRequest {
  accountId?: string;
  pageSize?: number;
  pageToken?: string;
}

export interface ListAccountSettingsMetadataResponse {
  settingsMetadata?: SettingsMetadata[];
  nextPageToken?: string;
}

export interface ListAccountUserPreferencesMetadataRequest {
  accountId?: string;
  userId?: string;
  pageSize?: number;
  pageToken?: string;
}

export interface ListAccountUserPreferencesMetadataResponse {
  settingsMetadata?: SettingsMetadata[];
  nextPageToken?: string;
}

export interface ListWorkspaceSettingsMetadataRequest {
  pageSize?: number;
  pageToken?: string;
}

export interface ListWorkspaceSettingsMetadataResponse {
  settingsMetadata?: SettingsMetadata[];
  nextPageToken?: string;
}

export type MaintenanceWindow = Record<string, never>;

export interface PatchPublicAccountSettingRequest {
  accountId?: string;
  name?: string;
  setting?: Setting;
}

export interface PatchPublicAccountUserPreferenceRequest {
  accountId?: string;
  userId?: string;
  name?: string;
  setting?: UserPreference;
}

export interface PatchPublicWorkspaceSettingRequest {
  name?: string;
  setting?: Setting;
}

export interface PersonalComputeMessage {
  value?: PersonalComputeMessageEnum;
}

export interface RestrictWorkspaceAdminsMessage {
  status?: Status;
  disableGovTagCreation?: boolean;
}

export interface Setting {
  name?: string;
  booleanVal?: BooleanMessage;
  stringVal?: StringMessage;
  integerVal?: IntegerMessage;
  automaticClusterUpdateWorkspace?: ClusterAutoRestartMessage;
  aibiDashboardEmbeddingApprovedDomains?: AibiDashboardEmbeddingApprovedDomains;
  aibiDashboardEmbeddingAccessPolicy?: AibiDashboardEmbeddingAccessPolicy;
  restrictWorkspaceAdmins?: RestrictWorkspaceAdminsMessage;
  personalCompute?: PersonalComputeMessage;
  effectiveBooleanVal?: BooleanMessage;
  effectiveStringVal?: StringMessage;
  effectiveIntegerVal?: IntegerMessage;
  effectiveAutomaticClusterUpdateWorkspace?: ClusterAutoRestartMessage;
  effectiveAibiDashboardEmbeddingApprovedDomains?: AibiDashboardEmbeddingApprovedDomains;
  effectiveAibiDashboardEmbeddingAccessPolicy?: AibiDashboardEmbeddingAccessPolicy;
  effectiveRestrictWorkspaceAdmins?: RestrictWorkspaceAdminsMessage;
  effectivePersonalCompute?: PersonalComputeMessage;
}

export interface SettingsMetadata {
  name?: string;
  description?: string;
  type?: string;
  docsLink?: string;
}

export interface StringMessage {
  value?: string;
}

/**  
 User Preference represents a user-specific setting scoped to an individual user within an account.
 Unlike workspace or account settings that apply to all users, user preferences allow personal
 customization (e.g., UI theme, editor preferences) without affecting other users.
 */
export interface UserPreference {
  name?: string;
  userId?: string;
  booleanVal?: BooleanMessage;
  stringVal?: StringMessage;
  effectiveBooleanVal?: BooleanMessage;
  effectiveStringVal?: StringMessage;
}

export type WeekDayBasedSchedule = Record<string, never>;

export type WindowStartTime = Record<string, never>;
