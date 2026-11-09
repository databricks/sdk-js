// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * Preview phase for settings that are feature previews.
 * For settings that are not feature previews, the preview_phase field is left unset.
 * Mirrors only the customer-facing phases surfaced in the UI; internal-only phases
 * (DISABLED, DEV, UNDER_MIGRATION, LAUNCHED, etc.) are not exposed here.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PreviewPhase = {
  /** Default value. Indicates the preview phase is unknown or the setting is not a feature preview. */
  PREVIEW_PHASE_UNSPECIFIED: 'PREVIEW_PHASE_UNSPECIFIED',
  /** The feature is in private preview, available only to specifically enrolled customers. */
  PRIVATE_PREVIEW: 'PRIVATE_PREVIEW',
  /**
   * The feature is in public preview, available to all customers. Also used for gated public
   * preview (available to customers who request access) since the distinction is internal.
   */
  PUBLIC_PREVIEW: 'PUBLIC_PREVIEW',
  /** The feature is in beta. */
  BETA: 'BETA',
  /** The feature is approaching general availability. */
  GA_SOON: 'GA_SOON',
  /** The feature has reached general availability. */
  GA: 'GA',
} as const;
export type PreviewPhase =
  | (typeof PreviewPhase)[keyof typeof PreviewPhase]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AibiDashboardEmbeddingAccessPolicy_AccessPolicyType = {
  ACCESS_POLICY_TYPE_UNSPECIFIED: 'ACCESS_POLICY_TYPE_UNSPECIFIED',
  ALLOW_ALL_DOMAINS: 'ALLOW_ALL_DOMAINS',
  ALLOW_APPROVED_DOMAINS: 'ALLOW_APPROVED_DOMAINS',
  DENY_ALL_DOMAINS: 'DENY_ALL_DOMAINS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AibiDashboardEmbeddingAccessPolicy_AccessPolicyType =
  | (typeof AibiDashboardEmbeddingAccessPolicy_AccessPolicyType)[keyof typeof AibiDashboardEmbeddingAccessPolicy_AccessPolicyType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek = {
  DAY_OF_WEEK_UNSPECIFIED: 'DAY_OF_WEEK_UNSPECIFIED',
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek =
  | (typeof ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek)[keyof typeof ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency = {
  WEEK_DAY_FREQUENCY_UNSPECIFIED: 'WEEK_DAY_FREQUENCY_UNSPECIFIED',
  FIRST_OF_MONTH: 'FIRST_OF_MONTH',
  SECOND_OF_MONTH: 'SECOND_OF_MONTH',
  THIRD_OF_MONTH: 'THIRD_OF_MONTH',
  FOURTH_OF_MONTH: 'FOURTH_OF_MONTH',
  FIRST_AND_THIRD_OF_MONTH: 'FIRST_AND_THIRD_OF_MONTH',
  SECOND_AND_FOURTH_OF_MONTH: 'SECOND_AND_FOURTH_OF_MONTH',
  EVERY_WEEK: 'EVERY_WEEK',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency =
  | (typeof ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency)[keyof typeof ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CollaborationPlatformConnectivityMessage_Connectivity = {
  CONNECTIVITY_UNSPECIFIED: 'CONNECTIVITY_UNSPECIFIED',
  ALLOW_ALL: 'ALLOW_ALL',
  ALLOW_TEAMS: 'ALLOW_TEAMS',
  ALLOW_SLACK: 'ALLOW_SLACK',
  DENY_ALL: 'DENY_ALL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type CollaborationPlatformConnectivityMessage_Connectivity =
  | (typeof CollaborationPlatformConnectivityMessage_Connectivity)[keyof typeof CollaborationPlatformConnectivityMessage_Connectivity]
  | (string & {});

/** Horizontal alignment options for widget titles and descriptions. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DashboardTheme_Alignment = {
  /** No alignment specified. */
  ALIGNMENT_UNSPECIFIED: 'ALIGNMENT_UNSPECIFIED',
  /** Aligns content to the left. */
  LEFT: 'LEFT',
  /** Centers content horizontally. */
  CENTER: 'CENTER',
  /** Aligns content to the right. */
  RIGHT: 'RIGHT',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DashboardTheme_Alignment =
  | (typeof DashboardTheme_Alignment)[keyof typeof DashboardTheme_Alignment]
  | (string & {});

/** Defines the font style (slant) applied to rendered text. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DashboardTheme_FontStyle = {
  /** No font style specified. */
  FONT_STYLE_UNSPECIFIED: 'FONT_STYLE_UNSPECIFIED',
  /** Renders text upright (no slant). */
  FONT_STYLE_NORMAL: 'FONT_STYLE_NORMAL',
  /** Renders text in italic (slanted). */
  FONT_STYLE_ITALIC: 'FONT_STYLE_ITALIC',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DashboardTheme_FontStyle =
  | (typeof DashboardTheme_FontStyle)[keyof typeof DashboardTheme_FontStyle]
  | (string & {});

/** Defines the text case transformation applied to rendered text. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DashboardTheme_TextCase = {
  /** No text case transformation (preserves original casing). */
  TEXT_CASE_UNSPECIFIED: 'TEXT_CASE_UNSPECIFIED',
  /** Renders all letters in uppercase. */
  TEXT_CASE_UPPERCASE: 'TEXT_CASE_UPPERCASE',
  /** Capitalizes the first letter of each word. */
  TEXT_CASE_CAPITALIZE: 'TEXT_CASE_CAPITALIZE',
  /** Renders all letters in lowercase. */
  TEXT_CASE_LOWERCASE: 'TEXT_CASE_LOWERCASE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DashboardTheme_TextCase =
  | (typeof DashboardTheme_TextCase)[keyof typeof DashboardTheme_TextCase]
  | (string & {});

/** Defines the decoration line applied to rendered text. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DashboardTheme_TextDecoration = {
  /** No text decoration specified. */
  TEXT_DECORATION_UNSPECIFIED: 'TEXT_DECORATION_UNSPECIFIED',
  /** Renders text with no decoration line. */
  TEXT_DECORATION_NONE: 'TEXT_DECORATION_NONE',
  /** Renders text with an underline. */
  TEXT_DECORATION_UNDERLINE: 'TEXT_DECORATION_UNDERLINE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DashboardTheme_TextDecoration =
  | (typeof DashboardTheme_TextDecoration)[keyof typeof DashboardTheme_TextDecoration]
  | (string & {});

/** Vertical alignment options for text box content. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DashboardTheme_VerticalAlign = {
  /** No vertical alignment specified (defaults to top). */
  VERTICAL_ALIGN_UNSPECIFIED: 'VERTICAL_ALIGN_UNSPECIFIED',
  /** Aligns content to the top of the text box. */
  VERTICAL_ALIGN_TOP: 'VERTICAL_ALIGN_TOP',
  /** Centers content vertically in the text box. */
  VERTICAL_ALIGN_CENTER: 'VERTICAL_ALIGN_CENTER',
  /** Aligns content to the bottom of the text box. */
  VERTICAL_ALIGN_BOTTOM: 'VERTICAL_ALIGN_BOTTOM',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DashboardTheme_VerticalAlign =
  | (typeof DashboardTheme_VerticalAlign)[keyof typeof DashboardTheme_VerticalAlign]
  | (string & {});

/**
 * ON: Grants all users in all workspaces access to the Personal Compute default policy, allowing all users to create single-machine compute resources.
 * DELEGATE: Moves access control for the Personal Compute default policy to individual workspaces and requires a workspace’s users or groups to be added to the ACLs of that workspace’s Personal Compute default policy before they will be able to create compute resources through that policy.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PersonalComputeMessage_PersonalComputeMessageEnum = {
  PERSONAL_COMPUTE_MESSAGE_ENUM_UNSPECIFIED:
    'PERSONAL_COMPUTE_MESSAGE_ENUM_UNSPECIFIED',
  ON: 'ON',
  DELEGATE: 'DELEGATE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PersonalComputeMessage_PersonalComputeMessageEnum =
  | (typeof PersonalComputeMessage_PersonalComputeMessageEnum)[keyof typeof PersonalComputeMessage_PersonalComputeMessageEnum]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RestrictWorkspaceAdminsMessage_Status = {
  /** Default value for proto enum */
  STATUS_UNSPECIFIED: 'STATUS_UNSPECIFIED',
  /**
   * Default value for existing workspaces
   * Allows WS admins to create OBO tokens for all SPs in the workspace without explicit permissions.
   */
  ALLOW_ALL: 'ALLOW_ALL',
  /**
   * Default value for new workspaces
   * Restrict WS admins to create OBO tokens for SPs in the workspace unless corresponding permissions are provided
   */
  RESTRICT_TOKENS_AND_JOB_RUN_AS: 'RESTRICT_TOKENS_AND_JOB_RUN_AS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type RestrictWorkspaceAdminsMessage_Status =
  | (typeof RestrictWorkspaceAdminsMessage_Status)[keyof typeof RestrictWorkspaceAdminsMessage_Status]
  | (string & {});

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

/**
 * Controls which external collaboration platforms (Slack, Microsoft Teams) can connect
 * to a workspace. Defaults to ALLOW_ALL.
 */
export interface CollaborationPlatformConnectivityMessage {
  connectivity?:
    | CollaborationPlatformConnectivityMessage_Connectivity
    | undefined;
}

/**
 * Theme settings for customizing AI/BI dashboard UI, including visualization colors,
 * font colors, background colors, and more.
 */
export interface DashboardTheme {
  /** The background color of the dashboard canvas. */
  canvasBackgroundColor?: DashboardTheme_DashboardThemeColor | undefined;
  /** The background color of widgets. */
  widgetBackgroundColor?: DashboardTheme_DashboardThemeColor | undefined;
  /** The border color of widgets. */
  widgetBorderColor?: DashboardTheme_DashboardThemeColor | undefined;
  /**
   * The default font color applied to all text in the dashboard.
   * Superseded by font_settings.base.font_color when font_settings is set.
   * More specific font settings in turn override base.
   */
  fontColor?: DashboardTheme_DashboardThemeColor | undefined;
  /** The highlight color for selected elements in widgets. */
  selectionColor?: DashboardTheme_DashboardThemeColor | undefined;
  /**
   * Color palette for visualizations. Colors are applied in order (visualization_color_01, visualization_color_02, etc.).
   * Invalid color values are preserved but ignored during rendering.
   */
  visualizationColor01?: string | undefined;
  /** The color at position 2 in the visualization color palette. */
  visualizationColor02?: string | undefined;
  /** The color at position 3 in the visualization color palette. */
  visualizationColor03?: string | undefined;
  /** The color at position 4 in the visualization color palette. */
  visualizationColor04?: string | undefined;
  /** The color at position 5 in the visualization color palette. */
  visualizationColor05?: string | undefined;
  /** The color at position 6 in the visualization color palette. */
  visualizationColor06?: string | undefined;
  /** The color at position 7 in the visualization color palette. */
  visualizationColor07?: string | undefined;
  /** The color at position 8 in the visualization color palette. */
  visualizationColor08?: string | undefined;
  /** The color at position 9 in the visualization color palette. */
  visualizationColor09?: string | undefined;
  /** The color at position 10 in the visualization color palette. */
  visualizationColor10?: string | undefined;
  /** The color at position 11 in the visualization color palette. */
  visualizationColor11?: string | undefined;
  /** The color at position 12 in the visualization color palette. */
  visualizationColor12?: string | undefined;
  /** The color at position 13 in the visualization color palette. */
  visualizationColor13?: string | undefined;
  /** The color at position 14 in the visualization color palette. */
  visualizationColor14?: string | undefined;
  /** The color at position 15 in the visualization color palette. */
  visualizationColor15?: string | undefined;
  /** The color at position 16 in the visualization color palette. */
  visualizationColor16?: string | undefined;
  /** The color at position 17 in the visualization color palette. */
  visualizationColor17?: string | undefined;
  /** The color at position 18 in the visualization color palette. */
  visualizationColor18?: string | undefined;
  /** The color at position 19 in the visualization color palette. */
  visualizationColor19?: string | undefined;
  /** The color at position 20 in the visualization color palette. */
  visualizationColor20?: string | undefined;
  /** Alignment setting for all widget titles and descriptions at the dashboard level. */
  widgetHeaderAlignment?: DashboardTheme_Alignment | undefined;
  /**
   * Font family to customize all text within the dashboard.
   * Unsupported font names fall back to the default font.
   * Superseded by font_settings.base.font_family when font_settings is set.
   */
  fontFamily?: string | undefined;
  /**
   * The default vertical alignment for all text box widgets in the dashboard.
   * Individual text box widgets can override this.
   */
  textBoxVerticalAlign?: DashboardTheme_VerticalAlign | undefined;
  /** The content padding inside each widget in pixels. */
  widgetPadding?: number | undefined;
  /** The gap between widgets in pixels. */
  widgetMargin?: number | undefined;
  /** The widget border radius in pixels. */
  widgetCornerRadius?: number | undefined;
  /**
   * The shadow intensity level applied to widgets (0 = no shadow, 100 = maximum).
   * The actual CSS box-shadow is computed at render time from this value, factoring in
   * background colors and color mode.
   */
  widgetShadow?: number | undefined;
  /** The sentiment color palette for the dashboard. */
  sentimentColors?: DashboardTheme_SentimentColors | undefined;
  /** The continuous gradient configuration for the dashboard. */
  continuousGradient?: DashboardTheme_ContinuousGradient | undefined;
  /** The per-category typography overrides for the dashboard. */
  fontSettings?: DashboardTheme_FontSettings | undefined;
  /** The corner radius in pixels for rectangular marks in visualizations (bars, columns, histogram bins, etc.). */
  markCornerRadius?: number | undefined;
  /** Color of chart grid lines in visualizations (horizontal and vertical guide lines). */
  gridLineColor?: DashboardTheme_DashboardThemeColor | undefined;
  /** Color of the zero-value grid line, making it visually distinct from other grid lines. */
  axisLineColor?: DashboardTheme_DashboardThemeColor | undefined;
}

/**
 * Configuration for continuous color gradients, with separate values for light and dark mode.
 * Each mode's gradient can reference the visualization color palette via
 * from_categorical_index, use a named color scheme, or define a custom sequential or diverging ramp.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DashboardTheme_ContinuousGradient {
  /** Gradient value used when the dashboard is rendered in light mode. */
  lightMode?: DashboardTheme_ContinuousGradient_GradientValue | undefined;
  /** Gradient value used when the dashboard is rendered in dark mode. */
  darkMode?: DashboardTheme_ContinuousGradient_GradientValue | undefined;
}

/** A custom three-stop diverging gradient ramp. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DashboardTheme_ContinuousGradient_CustomDivergingRamp {
  /** The color at the start of the gradient (lowest value). */
  start?: DashboardTheme_DashboardThemeColor | undefined;
  /** The color at the midpoint of the gradient. */
  mid?: DashboardTheme_DashboardThemeColor | undefined;
  /** The color at the end of the gradient (highest value). */
  end?: DashboardTheme_DashboardThemeColor | undefined;
}

/** A custom two-stop sequential gradient ramp. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DashboardTheme_ContinuousGradient_CustomSequentialRamp {
  /** The color at the start of the gradient (lowest value). */
  start?: DashboardTheme_DashboardThemeColor | undefined;
  /** The color at the end of the gradient (highest value). */
  end?: DashboardTheme_DashboardThemeColor | undefined;
}

/** The gradient for one color mode. Set at most one field. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DashboardTheme_ContinuousGradient_GradientValue {
  /** A 0-based index into the visualization color palette, where 0 is visualization_color_01. Valid values are 0 to 19. */
  fromCategoricalIndex?: number | undefined;
  /** A static color string (for example, '#FF0000'). */
  color?: string | undefined;
  /** A named color scheme (for example, 'blues', 'viridis', 'spectral'). */
  colorScheme?: string | undefined;
  /** A custom two-stop sequential gradient. */
  customSequential?:
    | DashboardTheme_ContinuousGradient_CustomSequentialRamp
    | undefined;
  /** A custom three-stop diverging gradient. */
  customDiverging?:
    | DashboardTheme_ContinuousGradient_CustomDivergingRamp
    | undefined;
}

/**
 * Represents a color value with optional overrides for light and dark modes.
 * Authors can customize colors separately to cater to each mode,
 * based on the viewer's user-level theme preference.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DashboardTheme_DashboardThemeColor {
  /** The color used when the dashboard is rendered in light mode (for example, '#FF0000'). */
  light?: string | undefined;
  /** The color used when the dashboard is rendered in dark mode (for example, '#FF0000'). */
  dark?: string | undefined;
}

/** Defines the typography settings for a single text category. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DashboardTheme_FontConfig {
  /** The font family name used for text in this category. */
  fontFamily?: string | undefined;
  /** The text case transformation applied to text in this category. */
  textCase?: DashboardTheme_TextCase | undefined;
  /** The font color applied to text in this category. */
  fontColor?: DashboardTheme_DashboardThemeColor | undefined;
  /** The font size in pixels. */
  fontSize?: number | undefined;
  /** The font weight value (for example, 400 for normal, 700 for bold). */
  fontWeight?: number | undefined;
  /** The font style (slant) applied to text in this category. */
  fontStyle?: DashboardTheme_FontStyle | undefined;
  /** The text decoration applied to text in this category. */
  textDecoration?: DashboardTheme_TextDecoration | undefined;
}

/**
 * Per-category typography overrides. When font_settings.base is set, it takes precedence
 * over the top-level font_family and font_color. More specific categories
 * (widget_title, widget_description, field_title, field_value) in turn override base.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DashboardTheme_FontSettings {
  /** The default font config applied to all text unless overridden by a more specific category. */
  base?: DashboardTheme_FontConfig | undefined;
  /** The font config applied to widget titles. */
  widgetTitle?: DashboardTheme_FontConfig | undefined;
  /** The font config applied to widget descriptions. */
  widgetDescription?: DashboardTheme_FontConfig | undefined;
  /** The font config applied to field titles (for example, axis titles, table heading titles). */
  fieldTitle?: DashboardTheme_FontConfig | undefined;
  /** The font config applied to field values (for example, axis tick labels, table cell values, tooltip values). */
  fieldValue?: DashboardTheme_FontConfig | undefined;
}

/**
 * Shared sentiment colors reusable across visualizations, primarily for conditional
 * formatting, ensuring consistent positive, negative, and neutral meaning throughout the dashboard.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DashboardTheme_SentimentColors {
  /** The color applied to negative sentiment values. */
  negative?: DashboardTheme_DashboardThemeColor | undefined;
  /** The color applied to positive sentiment values. */
  positive?: DashboardTheme_DashboardThemeColor | undefined;
  /** The color applied to neutral sentiment values. */
  neutral?: DashboardTheme_DashboardThemeColor | undefined;
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
        $case: 'workspaceLabel';
        /** Setting value for workspace_label setting. This is the setting value set by consumers, check effective_workspace_label for final setting value. */
        workspaceLabel: WorkspaceLabelMessage;
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
    | {
        $case: 'collaborationPlatformConnectivity';
        /** Setting value for collaboration_platform_connectivity setting. This is the setting value set by consumers, check effective_collaboration_platform_connectivity for final setting value. */
        collaborationPlatformConnectivity: CollaborationPlatformConnectivityMessage;
      }
    | {
        $case: 'workspaceDashboardTheme';
        /** Setting value for the workspace_dashboard_theme setting. This is the setting value set by consumers. Check effective_workspace_dashboard_theme for the final setting value. */
        workspaceDashboardTheme: DashboardTheme;
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
        $case: 'effectiveWorkspaceLabel';
        /** Effective setting value for workspace_label setting. This is the final effective value of setting. To set a value use workspace_label. */
        effectiveWorkspaceLabel: WorkspaceLabelMessage;
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
    | {
        $case: 'effectiveCollaborationPlatformConnectivity';
        /** Effective setting value for collaboration_platform_connectivity setting. This is the final effective value of setting. To set a value use collaboration_platform_connectivity. */
        effectiveCollaborationPlatformConnectivity: CollaborationPlatformConnectivityMessage;
      }
    | {
        $case: 'effectiveWorkspaceDashboardTheme';
        /** Effective setting value for the workspace_dashboard_theme setting. This is the final effective value of the setting. To set a value, use workspace_dashboard_theme. */
        effectiveWorkspaceDashboardTheme: DashboardTheme;
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

/** Workspace label and color for display (e.g. in account console). */
export interface WorkspaceLabelMessage {
  label?: string | undefined;
  color?: string | undefined;
}

export const unmarshalAibiDashboardEmbeddingAccessPolicySchema: z.ZodType<AibiDashboardEmbeddingAccessPolicy> =
  z
    .object({
      access_policy_type: z.string().optional(),
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
        .nullish()
        .transform(v => v ?? undefined),
      enablement_details: z
        .lazy(() => unmarshalClusterAutoRestartMessage_EnablementDetailsSchema)
        .nullish()
        .transform(v => v ?? undefined),
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
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      weekDayBasedSchedule: d.week_day_based_schedule,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedScheduleSchema: z.ZodType<ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule> =
  z
    .object({
      frequency: z.string().optional(),
      day_of_week: z.string().optional(),
      window_start_time: z
        .lazy(
          () =>
            unmarshalClusterAutoRestartMessage_MaintenanceWindow_WindowStartTimeSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
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

export const unmarshalCollaborationPlatformConnectivityMessageSchema: z.ZodType<CollaborationPlatformConnectivityMessage> =
  z
    .object({
      connectivity: z.string().optional(),
    })
    .transform(d => ({
      connectivity: d.connectivity,
    }));

export const unmarshalDashboardThemeSchema: z.ZodType<DashboardTheme> = z
  .object({
    canvas_background_color: z
      .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
      .nullish()
      .transform(v => v ?? undefined),
    widget_background_color: z
      .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
      .nullish()
      .transform(v => v ?? undefined),
    widget_border_color: z
      .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
      .nullish()
      .transform(v => v ?? undefined),
    font_color: z
      .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
      .nullish()
      .transform(v => v ?? undefined),
    selection_color: z
      .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
      .nullish()
      .transform(v => v ?? undefined),
    visualization_color_01: z.string().optional(),
    visualization_color_02: z.string().optional(),
    visualization_color_03: z.string().optional(),
    visualization_color_04: z.string().optional(),
    visualization_color_05: z.string().optional(),
    visualization_color_06: z.string().optional(),
    visualization_color_07: z.string().optional(),
    visualization_color_08: z.string().optional(),
    visualization_color_09: z.string().optional(),
    visualization_color_10: z.string().optional(),
    visualization_color_11: z.string().optional(),
    visualization_color_12: z.string().optional(),
    visualization_color_13: z.string().optional(),
    visualization_color_14: z.string().optional(),
    visualization_color_15: z.string().optional(),
    visualization_color_16: z.string().optional(),
    visualization_color_17: z.string().optional(),
    visualization_color_18: z.string().optional(),
    visualization_color_19: z.string().optional(),
    visualization_color_20: z.string().optional(),
    widget_header_alignment: z.string().optional(),
    font_family: z.string().optional(),
    text_box_vertical_align: z.string().optional(),
    widget_padding: z.number().optional(),
    widget_margin: z.number().optional(),
    widget_corner_radius: z.number().optional(),
    widget_shadow: z.number().optional(),
    sentiment_colors: z
      .lazy(() => unmarshalDashboardTheme_SentimentColorsSchema)
      .nullish()
      .transform(v => v ?? undefined),
    continuous_gradient: z
      .lazy(() => unmarshalDashboardTheme_ContinuousGradientSchema)
      .nullish()
      .transform(v => v ?? undefined),
    font_settings: z
      .lazy(() => unmarshalDashboardTheme_FontSettingsSchema)
      .nullish()
      .transform(v => v ?? undefined),
    mark_corner_radius: z.number().optional(),
    grid_line_color: z
      .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
      .nullish()
      .transform(v => v ?? undefined),
    axis_line_color: z
      .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
      .nullish()
      .transform(v => v ?? undefined),
  })
  .transform(d => ({
    canvasBackgroundColor: d.canvas_background_color,
    widgetBackgroundColor: d.widget_background_color,
    widgetBorderColor: d.widget_border_color,
    fontColor: d.font_color,
    selectionColor: d.selection_color,
    visualizationColor01: d.visualization_color_01,
    visualizationColor02: d.visualization_color_02,
    visualizationColor03: d.visualization_color_03,
    visualizationColor04: d.visualization_color_04,
    visualizationColor05: d.visualization_color_05,
    visualizationColor06: d.visualization_color_06,
    visualizationColor07: d.visualization_color_07,
    visualizationColor08: d.visualization_color_08,
    visualizationColor09: d.visualization_color_09,
    visualizationColor10: d.visualization_color_10,
    visualizationColor11: d.visualization_color_11,
    visualizationColor12: d.visualization_color_12,
    visualizationColor13: d.visualization_color_13,
    visualizationColor14: d.visualization_color_14,
    visualizationColor15: d.visualization_color_15,
    visualizationColor16: d.visualization_color_16,
    visualizationColor17: d.visualization_color_17,
    visualizationColor18: d.visualization_color_18,
    visualizationColor19: d.visualization_color_19,
    visualizationColor20: d.visualization_color_20,
    widgetHeaderAlignment: d.widget_header_alignment,
    fontFamily: d.font_family,
    textBoxVerticalAlign: d.text_box_vertical_align,
    widgetPadding: d.widget_padding,
    widgetMargin: d.widget_margin,
    widgetCornerRadius: d.widget_corner_radius,
    widgetShadow: d.widget_shadow,
    sentimentColors: d.sentiment_colors,
    continuousGradient: d.continuous_gradient,
    fontSettings: d.font_settings,
    markCornerRadius: d.mark_corner_radius,
    gridLineColor: d.grid_line_color,
    axisLineColor: d.axis_line_color,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDashboardTheme_ContinuousGradientSchema: z.ZodType<DashboardTheme_ContinuousGradient> =
  z
    .object({
      light_mode: z
        .lazy(
          () => unmarshalDashboardTheme_ContinuousGradient_GradientValueSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
      dark_mode: z
        .lazy(
          () => unmarshalDashboardTheme_ContinuousGradient_GradientValueSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      lightMode: d.light_mode,
      darkMode: d.dark_mode,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDashboardTheme_ContinuousGradient_CustomDivergingRampSchema: z.ZodType<DashboardTheme_ContinuousGradient_CustomDivergingRamp> =
  z
    .object({
      start: z
        .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
        .nullish()
        .transform(v => v ?? undefined),
      mid: z
        .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
        .nullish()
        .transform(v => v ?? undefined),
      end: z
        .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      start: d.start,
      mid: d.mid,
      end: d.end,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDashboardTheme_ContinuousGradient_CustomSequentialRampSchema: z.ZodType<DashboardTheme_ContinuousGradient_CustomSequentialRamp> =
  z
    .object({
      start: z
        .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
        .nullish()
        .transform(v => v ?? undefined),
      end: z
        .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      start: d.start,
      end: d.end,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDashboardTheme_ContinuousGradient_GradientValueSchema: z.ZodType<DashboardTheme_ContinuousGradient_GradientValue> =
  z
    .object({
      from_categorical_index: z.number().optional(),
      color: z.string().optional(),
      color_scheme: z.string().optional(),
      custom_sequential: z
        .lazy(
          () =>
            unmarshalDashboardTheme_ContinuousGradient_CustomSequentialRampSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
      custom_diverging: z
        .lazy(
          () =>
            unmarshalDashboardTheme_ContinuousGradient_CustomDivergingRampSchema
        )
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      fromCategoricalIndex: d.from_categorical_index,
      color: d.color,
      colorScheme: d.color_scheme,
      customSequential: d.custom_sequential,
      customDiverging: d.custom_diverging,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDashboardTheme_DashboardThemeColorSchema: z.ZodType<DashboardTheme_DashboardThemeColor> =
  z
    .object({
      light: z.string().optional(),
      dark: z.string().optional(),
    })
    .transform(d => ({
      light: d.light,
      dark: d.dark,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDashboardTheme_FontConfigSchema: z.ZodType<DashboardTheme_FontConfig> =
  z
    .object({
      font_family: z.string().optional(),
      text_case: z.string().optional(),
      font_color: z
        .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
        .nullish()
        .transform(v => v ?? undefined),
      font_size: z.number().optional(),
      font_weight: z.number().optional(),
      font_style: z.string().optional(),
      text_decoration: z.string().optional(),
    })
    .transform(d => ({
      fontFamily: d.font_family,
      textCase: d.text_case,
      fontColor: d.font_color,
      fontSize: d.font_size,
      fontWeight: d.font_weight,
      fontStyle: d.font_style,
      textDecoration: d.text_decoration,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDashboardTheme_FontSettingsSchema: z.ZodType<DashboardTheme_FontSettings> =
  z
    .object({
      base: z
        .lazy(() => unmarshalDashboardTheme_FontConfigSchema)
        .nullish()
        .transform(v => v ?? undefined),
      widget_title: z
        .lazy(() => unmarshalDashboardTheme_FontConfigSchema)
        .nullish()
        .transform(v => v ?? undefined),
      widget_description: z
        .lazy(() => unmarshalDashboardTheme_FontConfigSchema)
        .nullish()
        .transform(v => v ?? undefined),
      field_title: z
        .lazy(() => unmarshalDashboardTheme_FontConfigSchema)
        .nullish()
        .transform(v => v ?? undefined),
      field_value: z
        .lazy(() => unmarshalDashboardTheme_FontConfigSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      base: d.base,
      widgetTitle: d.widget_title,
      widgetDescription: d.widget_description,
      fieldTitle: d.field_title,
      fieldValue: d.field_value,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDashboardTheme_SentimentColorsSchema: z.ZodType<DashboardTheme_SentimentColors> =
  z
    .object({
      negative: z
        .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
        .nullish()
        .transform(v => v ?? undefined),
      positive: z
        .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
        .nullish()
        .transform(v => v ?? undefined),
      neutral: z
        .lazy(() => unmarshalDashboardTheme_DashboardThemeColorSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      negative: d.negative,
      positive: d.positive,
      neutral: d.neutral,
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
      value: z.string().optional(),
    })
    .transform(d => ({
      value: d.value,
    }));

export const unmarshalRestrictWorkspaceAdminsMessageSchema: z.ZodType<RestrictWorkspaceAdminsMessage> =
  z
    .object({
      status: z.string().optional(),
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
    workspace_label: z
      .lazy(() => unmarshalWorkspaceLabelMessageSchema)
      .optional(),
    allowed_apps_user_api_scopes: z
      .lazy(() => unmarshalAllowedAppsUserApiScopesMessageSchema)
      .optional(),
    operational_email_custom_recipient: z
      .lazy(() => unmarshalOperationalEmailCustomRecipientMessageSchema)
      .optional(),
    collaboration_platform_connectivity: z
      .lazy(() => unmarshalCollaborationPlatformConnectivityMessageSchema)
      .optional(),
    workspace_dashboard_theme: z
      .lazy(() => unmarshalDashboardThemeSchema)
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
    effective_workspace_label: z
      .lazy(() => unmarshalWorkspaceLabelMessageSchema)
      .optional(),
    effective_allowed_apps_user_api_scopes: z
      .lazy(() => unmarshalAllowedAppsUserApiScopesMessageSchema)
      .optional(),
    effective_operational_email_custom_recipient: z
      .lazy(() => unmarshalOperationalEmailCustomRecipientMessageSchema)
      .optional(),
    effective_collaboration_platform_connectivity: z
      .lazy(() => unmarshalCollaborationPlatformConnectivityMessageSchema)
      .optional(),
    effective_workspace_dashboard_theme: z
      .lazy(() => unmarshalDashboardThemeSchema)
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
                      : d.workspace_label !== undefined
                        ? {
                            $case: 'workspaceLabel' as const,
                            workspaceLabel: d.workspace_label,
                          }
                        : d.allowed_apps_user_api_scopes !== undefined
                          ? {
                              $case: 'allowedAppsUserApiScopes' as const,
                              allowedAppsUserApiScopes:
                                d.allowed_apps_user_api_scopes,
                            }
                          : d.operational_email_custom_recipient !== undefined
                            ? {
                                $case:
                                  'operationalEmailCustomRecipient' as const,
                                operationalEmailCustomRecipient:
                                  d.operational_email_custom_recipient,
                              }
                            : d.collaboration_platform_connectivity !==
                                undefined
                              ? {
                                  $case:
                                    'collaborationPlatformConnectivity' as const,
                                  collaborationPlatformConnectivity:
                                    d.collaboration_platform_connectivity,
                                }
                              : d.workspace_dashboard_theme !== undefined
                                ? {
                                    $case: 'workspaceDashboardTheme' as const,
                                    workspaceDashboardTheme:
                                      d.workspace_dashboard_theme,
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
                      : d.effective_workspace_label !== undefined
                        ? {
                            $case: 'effectiveWorkspaceLabel' as const,
                            effectiveWorkspaceLabel:
                              d.effective_workspace_label,
                          }
                        : d.effective_allowed_apps_user_api_scopes !== undefined
                          ? {
                              $case:
                                'effectiveAllowedAppsUserApiScopes' as const,
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
                            : d.effective_collaboration_platform_connectivity !==
                                undefined
                              ? {
                                  $case:
                                    'effectiveCollaborationPlatformConnectivity' as const,
                                  effectiveCollaborationPlatformConnectivity:
                                    d.effective_collaboration_platform_connectivity,
                                }
                              : d.effective_workspace_dashboard_theme !==
                                  undefined
                                ? {
                                    $case:
                                      'effectiveWorkspaceDashboardTheme' as const,
                                    effectiveWorkspaceDashboardTheme:
                                      d.effective_workspace_dashboard_theme,
                                  }
                                : undefined,
  }));

export const unmarshalSettingsMetadataSchema: z.ZodType<SettingsMetadata> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    docs_link: z.string().optional(),
    preview_phase: z.string().optional(),
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

export const unmarshalWorkspaceLabelMessageSchema: z.ZodType<WorkspaceLabelMessage> =
  z
    .object({
      label: z.string().optional(),
      color: z.string().optional(),
    })
    .transform(d => ({
      label: d.label,
      color: d.color,
    }));

export const marshalAibiDashboardEmbeddingAccessPolicySchema: z.ZodType = z
  .object({
    accessPolicyType: z.string().optional(),
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
      frequency: z.string().optional(),
      dayOfWeek: z.string().optional(),
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

export const marshalCollaborationPlatformConnectivityMessageSchema: z.ZodType =
  z
    .object({
      connectivity: z.string().optional(),
    })
    .transform(d => ({
      connectivity: d.connectivity,
    }));

export const marshalDashboardThemeSchema: z.ZodType = z
  .object({
    canvasBackgroundColor: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
    widgetBackgroundColor: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
    widgetBorderColor: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
    fontColor: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
    selectionColor: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
    visualizationColor01: z.string().optional(),
    visualizationColor02: z.string().optional(),
    visualizationColor03: z.string().optional(),
    visualizationColor04: z.string().optional(),
    visualizationColor05: z.string().optional(),
    visualizationColor06: z.string().optional(),
    visualizationColor07: z.string().optional(),
    visualizationColor08: z.string().optional(),
    visualizationColor09: z.string().optional(),
    visualizationColor10: z.string().optional(),
    visualizationColor11: z.string().optional(),
    visualizationColor12: z.string().optional(),
    visualizationColor13: z.string().optional(),
    visualizationColor14: z.string().optional(),
    visualizationColor15: z.string().optional(),
    visualizationColor16: z.string().optional(),
    visualizationColor17: z.string().optional(),
    visualizationColor18: z.string().optional(),
    visualizationColor19: z.string().optional(),
    visualizationColor20: z.string().optional(),
    widgetHeaderAlignment: z.string().optional(),
    fontFamily: z.string().optional(),
    textBoxVerticalAlign: z.string().optional(),
    widgetPadding: z.number().optional(),
    widgetMargin: z.number().optional(),
    widgetCornerRadius: z.number().optional(),
    widgetShadow: z.number().optional(),
    sentimentColors: z
      .lazy(() => marshalDashboardTheme_SentimentColorsSchema)
      .optional(),
    continuousGradient: z
      .lazy(() => marshalDashboardTheme_ContinuousGradientSchema)
      .optional(),
    fontSettings: z
      .lazy(() => marshalDashboardTheme_FontSettingsSchema)
      .optional(),
    markCornerRadius: z.number().optional(),
    gridLineColor: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
    axisLineColor: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
  })
  .transform(d => ({
    canvas_background_color: d.canvasBackgroundColor,
    widget_background_color: d.widgetBackgroundColor,
    widget_border_color: d.widgetBorderColor,
    font_color: d.fontColor,
    selection_color: d.selectionColor,
    visualization_color_01: d.visualizationColor01,
    visualization_color_02: d.visualizationColor02,
    visualization_color_03: d.visualizationColor03,
    visualization_color_04: d.visualizationColor04,
    visualization_color_05: d.visualizationColor05,
    visualization_color_06: d.visualizationColor06,
    visualization_color_07: d.visualizationColor07,
    visualization_color_08: d.visualizationColor08,
    visualization_color_09: d.visualizationColor09,
    visualization_color_10: d.visualizationColor10,
    visualization_color_11: d.visualizationColor11,
    visualization_color_12: d.visualizationColor12,
    visualization_color_13: d.visualizationColor13,
    visualization_color_14: d.visualizationColor14,
    visualization_color_15: d.visualizationColor15,
    visualization_color_16: d.visualizationColor16,
    visualization_color_17: d.visualizationColor17,
    visualization_color_18: d.visualizationColor18,
    visualization_color_19: d.visualizationColor19,
    visualization_color_20: d.visualizationColor20,
    widget_header_alignment: d.widgetHeaderAlignment,
    font_family: d.fontFamily,
    text_box_vertical_align: d.textBoxVerticalAlign,
    widget_padding: d.widgetPadding,
    widget_margin: d.widgetMargin,
    widget_corner_radius: d.widgetCornerRadius,
    widget_shadow: d.widgetShadow,
    sentiment_colors: d.sentimentColors,
    continuous_gradient: d.continuousGradient,
    font_settings: d.fontSettings,
    mark_corner_radius: d.markCornerRadius,
    grid_line_color: d.gridLineColor,
    axis_line_color: d.axisLineColor,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDashboardTheme_ContinuousGradientSchema: z.ZodType = z
  .object({
    lightMode: z
      .lazy(() => marshalDashboardTheme_ContinuousGradient_GradientValueSchema)
      .optional(),
    darkMode: z
      .lazy(() => marshalDashboardTheme_ContinuousGradient_GradientValueSchema)
      .optional(),
  })
  .transform(d => ({
    light_mode: d.lightMode,
    dark_mode: d.darkMode,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDashboardTheme_ContinuousGradient_CustomDivergingRampSchema: z.ZodType =
  z
    .object({
      start: z
        .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
        .optional(),
      mid: z
        .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
        .optional(),
      end: z
        .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
        .optional(),
    })
    .transform(d => ({
      start: d.start,
      mid: d.mid,
      end: d.end,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDashboardTheme_ContinuousGradient_CustomSequentialRampSchema: z.ZodType =
  z
    .object({
      start: z
        .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
        .optional(),
      end: z
        .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
        .optional(),
    })
    .transform(d => ({
      start: d.start,
      end: d.end,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDashboardTheme_ContinuousGradient_GradientValueSchema: z.ZodType =
  z
    .object({
      fromCategoricalIndex: z.number().optional(),
      color: z.string().optional(),
      colorScheme: z.string().optional(),
      customSequential: z
        .lazy(
          () =>
            marshalDashboardTheme_ContinuousGradient_CustomSequentialRampSchema
        )
        .optional(),
      customDiverging: z
        .lazy(
          () =>
            marshalDashboardTheme_ContinuousGradient_CustomDivergingRampSchema
        )
        .optional(),
    })
    .transform(d => ({
      from_categorical_index: d.fromCategoricalIndex,
      color: d.color,
      color_scheme: d.colorScheme,
      custom_sequential: d.customSequential,
      custom_diverging: d.customDiverging,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDashboardTheme_DashboardThemeColorSchema: z.ZodType = z
  .object({
    light: z.string().optional(),
    dark: z.string().optional(),
  })
  .transform(d => ({
    light: d.light,
    dark: d.dark,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDashboardTheme_FontConfigSchema: z.ZodType = z
  .object({
    fontFamily: z.string().optional(),
    textCase: z.string().optional(),
    fontColor: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
    fontSize: z.number().optional(),
    fontWeight: z.number().optional(),
    fontStyle: z.string().optional(),
    textDecoration: z.string().optional(),
  })
  .transform(d => ({
    font_family: d.fontFamily,
    text_case: d.textCase,
    font_color: d.fontColor,
    font_size: d.fontSize,
    font_weight: d.fontWeight,
    font_style: d.fontStyle,
    text_decoration: d.textDecoration,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDashboardTheme_FontSettingsSchema: z.ZodType = z
  .object({
    base: z.lazy(() => marshalDashboardTheme_FontConfigSchema).optional(),
    widgetTitle: z
      .lazy(() => marshalDashboardTheme_FontConfigSchema)
      .optional(),
    widgetDescription: z
      .lazy(() => marshalDashboardTheme_FontConfigSchema)
      .optional(),
    fieldTitle: z.lazy(() => marshalDashboardTheme_FontConfigSchema).optional(),
    fieldValue: z.lazy(() => marshalDashboardTheme_FontConfigSchema).optional(),
  })
  .transform(d => ({
    base: d.base,
    widget_title: d.widgetTitle,
    widget_description: d.widgetDescription,
    field_title: d.fieldTitle,
    field_value: d.fieldValue,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDashboardTheme_SentimentColorsSchema: z.ZodType = z
  .object({
    negative: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
    positive: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
    neutral: z
      .lazy(() => marshalDashboardTheme_DashboardThemeColorSchema)
      .optional(),
  })
  .transform(d => ({
    negative: d.negative,
    positive: d.positive,
    neutral: d.neutral,
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
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalRestrictWorkspaceAdminsMessageSchema: z.ZodType = z
  .object({
    status: z.string().optional(),
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
          $case: z.literal('workspaceLabel'),
          workspaceLabel: z.lazy(() => marshalWorkspaceLabelMessageSchema),
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
        z.object({
          $case: z.literal('collaborationPlatformConnectivity'),
          collaborationPlatformConnectivity: z.lazy(
            () => marshalCollaborationPlatformConnectivityMessageSchema
          ),
        }),
        z.object({
          $case: z.literal('workspaceDashboardTheme'),
          workspaceDashboardTheme: z.lazy(() => marshalDashboardThemeSchema),
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
          $case: z.literal('effectiveWorkspaceLabel'),
          effectiveWorkspaceLabel: z.lazy(
            () => marshalWorkspaceLabelMessageSchema
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
        z.object({
          $case: z.literal('effectiveCollaborationPlatformConnectivity'),
          effectiveCollaborationPlatformConnectivity: z.lazy(
            () => marshalCollaborationPlatformConnectivityMessageSchema
          ),
        }),
        z.object({
          $case: z.literal('effectiveWorkspaceDashboardTheme'),
          effectiveWorkspaceDashboardTheme: z.lazy(
            () => marshalDashboardThemeSchema
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
    ...(d.value?.$case === 'workspaceLabel' && {
      workspace_label: d.value.workspaceLabel,
    }),
    ...(d.value?.$case === 'allowedAppsUserApiScopes' && {
      allowed_apps_user_api_scopes: d.value.allowedAppsUserApiScopes,
    }),
    ...(d.value?.$case === 'operationalEmailCustomRecipient' && {
      operational_email_custom_recipient:
        d.value.operationalEmailCustomRecipient,
    }),
    ...(d.value?.$case === 'collaborationPlatformConnectivity' && {
      collaboration_platform_connectivity:
        d.value.collaborationPlatformConnectivity,
    }),
    ...(d.value?.$case === 'workspaceDashboardTheme' && {
      workspace_dashboard_theme: d.value.workspaceDashboardTheme,
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
    ...(d.effectiveValue?.$case === 'effectiveWorkspaceLabel' && {
      effective_workspace_label: d.effectiveValue.effectiveWorkspaceLabel,
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
    ...(d.effectiveValue?.$case ===
      'effectiveCollaborationPlatformConnectivity' && {
      effective_collaboration_platform_connectivity:
        d.effectiveValue.effectiveCollaborationPlatformConnectivity,
    }),
    ...(d.effectiveValue?.$case === 'effectiveWorkspaceDashboardTheme' && {
      effective_workspace_dashboard_theme:
        d.effectiveValue.effectiveWorkspaceDashboardTheme,
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

export const marshalWorkspaceLabelMessageSchema: z.ZodType = z
  .object({
    label: z.string().optional(),
    color: z.string().optional(),
  })
  .transform(d => ({
    label: d.label,
    color: d.color,
  }));
