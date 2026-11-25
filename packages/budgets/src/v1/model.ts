// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Type of action that a budget alert executes when its threshold is crossed. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ActionConfigurationType = {
  EMAIL_NOTIFICATION: 'EMAIL_NOTIFICATION',
  /**
   * Blocks further usage when the alert threshold is reached. Supported only on
   * AI Gateway budgets. No `target` is required for this action type.
   */
  BLOCK_USAGE: 'BLOCK_USAGE',
} as const;
export type ActionConfigurationType =
  | (typeof ActionConfigurationType)[keyof typeof ActionConfigurationType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AlertConfigurationQuantityType = {
  LIST_PRICE_DOLLARS_USD: 'LIST_PRICE_DOLLARS_USD',
} as const;
export type AlertConfigurationQuantityType =
  | (typeof AlertConfigurationQuantityType)[keyof typeof AlertConfigurationQuantityType]
  | (string & {});

/** Evaluation scope for an alert configuration. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AlertConfigurationScopeType = {
  /** Alert evaluates aggregate spend across all users. */
  ALERT_CONFIGURATION_SCOPE_TYPE_SHARED:
    'ALERT_CONFIGURATION_SCOPE_TYPE_SHARED',
  /** Alert evaluates spend per individual user identity. */
  ALERT_CONFIGURATION_SCOPE_TYPE_PER_USER:
    'ALERT_CONFIGURATION_SCOPE_TYPE_PER_USER',
} as const;
export type AlertConfigurationScopeType =
  | (typeof AlertConfigurationScopeType)[keyof typeof AlertConfigurationScopeType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AlertConfigurationTimePeriod = {
  MONTH: 'MONTH',
  /**
   * UTC calendar day. Only supported on per-user alerts (`scope_type` set to
   * `ALERT_CONFIGURATION_SCOPE_TYPE_PER_USER`) of Unity Gateway budgets.
   */
  DAY: 'DAY',
} as const;
export type AlertConfigurationTimePeriod =
  | (typeof AlertConfigurationTimePeriod)[keyof typeof AlertConfigurationTimePeriod]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AlertConfigurationTriggerType = {
  CUMULATIVE_SPENDING_EXCEEDED: 'CUMULATIVE_SPENDING_EXCEEDED',
} as const;
export type AlertConfigurationTriggerType =
  | (typeof AlertConfigurationTriggerType)[keyof typeof AlertConfigurationTriggerType]
  | (string & {});

/**
 * Resource scope for a budget configuration. Determines whether the budget tracks all
 * resources or a specific resource.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const BudgetResourceType = {
  /** The budget applies to spending across all resources. */
  BUDGET_RESOURCE_TYPE_ALL_RESOURCES: 'BUDGET_RESOURCE_TYPE_ALL_RESOURCES',
  /** The budget applies only to Unity AI Gateway spending. */
  BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY:
    'BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY',
} as const;
export type BudgetResourceType =
  | (typeof BudgetResourceType)[keyof typeof BudgetResourceType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const BudgetConfigurationFilter_Operator = {
  IN: 'IN',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type BudgetConfigurationFilter_Operator =
  | (typeof BudgetConfigurationFilter_Operator)[keyof typeof BudgetConfigurationFilter_Operator]
  | (string & {});

export interface ActionConfiguration {
  /** Databricks action configuration ID. */
  actionConfigurationId?: string | undefined;
  /**
   * The action to take when the alert enters a triggered state. `EMAIL_NOTIFICATION` sends an email and
   * `BLOCK_USAGE` blocks further usage. `BLOCK_USAGE` is only supported on Unity AI Gateway budgets, with
   * `resource_type` set to `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY`.
   */
  actionType?: ActionConfigurationType | undefined;
  /**
   * Target of the action. For `EMAIL_NOTIFICATION`, the email address that receives the alert, up to 256
   * characters. Must be omitted for `BLOCK_USAGE`.
   */
  target?: string | undefined;
}

export interface AlertConfiguration {
  /** Databricks alert configuration ID. */
  alertConfigurationId?: string | undefined;
  /** The time window of usage data for the budget. */
  timePeriod?: AlertConfigurationTimePeriod | undefined;
  /** The evaluation method to determine when this budget alert is in a triggered state. */
  triggerType?: AlertConfigurationTriggerType | undefined;
  /** The way to calculate cost for this budget alert. This is what `quantity_threshold` is measured in. */
  quantityType?: AlertConfigurationQuantityType | undefined;
  /**
   * The threshold for the budget alert to determine if it is in a triggered state. The number is evaluated based on `quantity_type`.
   * A decimal number passed as a string, from 0 to 1,000,000,000.
   */
  quantityThreshold?: string | undefined;
  /**
   * Configured actions for this alert. These define what happens when an alert enters a triggered state.
   * An alert can have up to 10 actions.
   */
  actionConfigurations?: ActionConfiguration[] | undefined;
  /** How the alert threshold is evaluated. Determines whether spend is tracked in aggregate or per individual user. */
  scopeType?: AlertConfigurationScopeType | undefined;
  /** Per-principal threshold overrides for this alert. Only applies to per-user alerts (`scope_type` = `ALERT_CONFIGURATION_SCOPE_TYPE_PER_USER`); ignored for shared alerts. */
  principalOverrides?: PrincipalOverride[] | undefined;
}

/**
 * The calling user's spend against a single blocking threshold. Values may be omitted if live
 * spend or threshold data is temporarily unavailable.
 */
export interface AlertSpendStatus {
  /**
   * Whether the threshold is evaluated per individual user
   * (`ALERT_CONFIGURATION_SCOPE_TYPE_PER_USER`) or on the shared spend across all users
   * (`ALERT_CONFIGURATION_SCOPE_TYPE_SHARED`).
   */
  scopeType?: AlertConfigurationScopeType | undefined;
  /** The time window the threshold applies to, for example `MONTH`. */
  timePeriod?: AlertConfigurationTimePeriod | undefined;
  /**
   * The calling user's live spend against this threshold, in USD at list price. Returns "0" if the
   * caller has no usage. Omitted for shared thresholds, where only `percent_consumed` is returned.
   */
  spend?: string | undefined;
  /**
   * The calling user's effective threshold, in USD at list price. The effective threshold is the
   * actual threshold amount that applies to the user, after adjusting for any user or group
   * overrides. Omitted for shared thresholds, where only `percent_consumed` is returned.
   */
  threshold?: string | undefined;
  /**
   * Percentage of the threshold consumed, as a decimal string rounded down to one decimal place (for
   * example, "68.4" means 68.4%). May exceed 100 when spend is over the threshold. Returns "0.0" if
   * there's no spend, except that a $0 threshold always returns "100.0". For shared thresholds, this
   * is the only value returned; the absolute `spend` and `threshold` dollar amounts are withheld.
   */
  percentConsumed?: string | undefined;
}

/**
 * A budget tracks the spend of your account, or of the workspaces and custom tags selected by its
 * filter, against one or more alert thresholds. Spend is measured in US dollars at list price. For an
 * overview, see https://docs.databricks.com/en/admin/account-settings/budgets.html.
 */
export interface BudgetConfiguration {
  /** Databricks budget configuration ID. */
  budgetConfigurationId?: string | undefined;
  /** Databricks account ID. */
  accountId?: string | undefined;
  /** Creation time of this budget configuration, in milliseconds since the Unix epoch. */
  createTime?: bigint | undefined;
  /** Time of the most recent update to this budget configuration, in milliseconds since the Unix epoch. */
  updateTime?: bigint | undefined;
  /**
   * Alerts to configure when this budget is in a triggered state. Budgets must have at least one alert configuration.
   * A budget can have up to four shared alerts per time period, each with a unique `quantity_threshold`.
   * Budgets with `resource_type` set to `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY` can also use per-user alerts, with optional `principal_overrides`.
   * These budgets can have at most one per-user alert per time period, and can use shared alerts, a per-user alert, or both.
   * The `BLOCK_USAGE` action is only supported on budgets with `resource_type` set to `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY`.
   * At most one shared alert per time period can have a `BLOCK_USAGE` action, and it must be the shared alert with the highest threshold in that period.
   */
  alertConfigurations?: AlertConfiguration[] | undefined;
  /**
   * Configured filters for this budget. These are applied to your account's usage to limit the scope of what is considered for this budget.
   * Leave empty to include all usage for this account. All provided filters must be matched for usage to be included.
   * The filter cannot be changed after the budget is created. To change it, delete the budget and create a new one.
   */
  filter?: BudgetConfigurationFilter | undefined;
  /** Human-readable name of budget configuration. Max Length: 128 */
  displayName?: string | undefined;
  /**
   * Whether this budget tracks external pass-through spend (third-party costs billed through a Databricks product) in addition to internal Databricks spend.
   * Only applicable to Unity Gateway budgets, i.e. when `resource_type` is `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY`. This field is immutable after create.
   */
  includeExternalSpend?: boolean | undefined;
  /** The resource scope for this budget. Determines whether the budget tracks all resources or a specific resource. */
  resourceType?: BudgetResourceType | undefined;
}

export interface BudgetConfigurationFilter {
  /** If provided, usage must match with the provided Databricks workspace IDs. */
  workspaceId?: BudgetConfigurationFilter_WorkspaceIdClause | undefined;
  /**
   * A list of tag keys and values that will limit the budget to usage that includes those specific custom tags.
   * Tags are case-sensitive and should be entered exactly as they appear in your usage data.
   */
  tags?: BudgetConfigurationFilter_TagClause[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface BudgetConfigurationFilter_Clause {
  /** How usage is compared with `values`. `IN` matches usage whose value is one of `values`. */
  operator?: BudgetConfigurationFilter_Operator | undefined;
  /** Values to match. A clause can list up to 30 values. */
  values?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface BudgetConfigurationFilter_TagClause {
  /**
   * The custom tag key to match, exactly as it appears in your usage data. A key can appear in at
   * most one clause per operator.
   */
  key?: string | undefined;
  /**
   * The tag values to match for `key`. Usage is included when its value for `key` is one of the
   * listed values.
   */
  value?: BudgetConfigurationFilter_Clause | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface BudgetConfigurationFilter_WorkspaceIdClause {
  /** How usage is compared with `values`. `IN` matches usage from any of the listed workspaces. */
  operator?: BudgetConfigurationFilter_Operator | undefined;
  /**
   * IDs of the workspaces whose usage is included. A clause can list up to 30 workspaces, all of
   * which must belong to this account.
   */
  values?: bigint[] | undefined;
}

/** The calling user's live spend against the blocking thresholds of a single budget. */
export interface BudgetSpendStatus {
  /**
   * The resource name of this budget spend status, of the form
   * `accounts/{account_id}/budget-spend-statuses/{budget_id}`.
   */
  name?: string | undefined;
  /**
   * The calling user's spend against each blocking threshold on this budget, one entry per scope
   * type and time period. A blocking threshold is a threshold that, once reached, blocks further
   * requests through Unity Gateway.
   */
  alertSpendStatuses?: AlertSpendStatus[] | undefined;
}

/**
 * A budget tracks the spend of your account, or of the workspaces and custom tags selected by its
 * filter, against one or more alert thresholds. Spend is measured in US dollars at list price. For an
 * overview, see https://docs.databricks.com/en/admin/account-settings/budgets.html.
 */
export interface CreateBudgetConfigurationBudget {
  /** Databricks account ID. */
  accountId?: string | undefined;
  /**
   * Alerts to configure when this budget is in a triggered state. Budgets must have at least one alert configuration.
   * A budget can have up to four shared alerts per time period, each with a unique `quantity_threshold`.
   * Budgets with `resource_type` set to `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY` can also use per-user alerts, with optional `principal_overrides`.
   * These budgets can have at most one per-user alert per time period, and can use shared alerts, a per-user alert, or both.
   * The `BLOCK_USAGE` action is only supported on budgets with `resource_type` set to `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY`.
   * At most one shared alert per time period can have a `BLOCK_USAGE` action, and it must be the shared alert with the highest threshold in that period.
   */
  alertConfigurations?:
    | CreateBudgetConfigurationBudgetAlertConfigurations[]
    | undefined;
  /**
   * Configured filters for this budget. These are applied to your account's usage to limit the scope of what is considered for this budget.
   * Leave empty to include all usage for this account. All provided filters must be matched for usage to be included.
   * The filter cannot be changed after the budget is created. To change it, delete the budget and create a new one.
   */
  filter?: BudgetConfigurationFilter | undefined;
  /** Human-readable name of budget configuration. Max Length: 128 */
  displayName?: string | undefined;
  /**
   * Whether this budget tracks external pass-through spend (third-party costs billed through a Databricks product) in addition to internal Databricks spend.
   * Only applicable to Unity Gateway budgets, i.e. when `resource_type` is `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY`. This field is immutable after create.
   */
  includeExternalSpend?: boolean | undefined;
  /** The resource scope for this budget. Determines whether the budget tracks all resources or a specific resource. */
  resourceType?: BudgetResourceType | undefined;
}

export interface CreateBudgetConfigurationBudgetActionConfigurations {
  /**
   * The action to take when the alert enters a triggered state. `EMAIL_NOTIFICATION` sends an email and
   * `BLOCK_USAGE` blocks further usage. `BLOCK_USAGE` is only supported on Unity AI Gateway budgets, with
   * `resource_type` set to `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY`.
   */
  actionType?: ActionConfigurationType | undefined;
  /**
   * Target of the action. For `EMAIL_NOTIFICATION`, the email address that receives the alert, up to 256
   * characters. Must be omitted for `BLOCK_USAGE`.
   */
  target?: string | undefined;
}

export interface CreateBudgetConfigurationBudgetAlertConfigurations {
  /** The time window of usage data for the budget. */
  timePeriod?: AlertConfigurationTimePeriod | undefined;
  /** The evaluation method to determine when this budget alert is in a triggered state. */
  triggerType?: AlertConfigurationTriggerType | undefined;
  /** The way to calculate cost for this budget alert. This is what `quantity_threshold` is measured in. */
  quantityType?: AlertConfigurationQuantityType | undefined;
  /**
   * The threshold for the budget alert to determine if it is in a triggered state. The number is evaluated based on `quantity_type`.
   * A decimal number passed as a string, from 0 to 1,000,000,000.
   */
  quantityThreshold?: string | undefined;
  /**
   * Configured actions for this alert. These define what happens when an alert enters a triggered state.
   * An alert can have up to 10 actions.
   */
  actionConfigurations?:
    | CreateBudgetConfigurationBudgetActionConfigurations[]
    | undefined;
  /** How the alert threshold is evaluated. Determines whether spend is tracked in aggregate or per individual user. */
  scopeType?: AlertConfigurationScopeType | undefined;
  /** Per-principal threshold overrides for this alert. Only applies to per-user alerts (`scope_type` = `ALERT_CONFIGURATION_SCOPE_TYPE_PER_USER`); ignored for shared alerts. */
  principalOverrides?: PrincipalOverride[] | undefined;
}

export interface CreateBudgetConfigurationRequest {
  /** Properties of the new budget configuration. */
  budget?: CreateBudgetConfigurationBudget | undefined;
}

export interface CreateBudgetConfigurationResponse {
  /** The created budget configuration. */
  budget?: BudgetConfiguration | undefined;
}

/**
 * *
 * Delete budget
 */
export interface DeleteBudgetConfigurationRequest {
  /** The Databricks budget configuration ID. */
  budgetId?: string | undefined;
  /** Databricks account ID. */
  accountId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteBudgetConfigurationResponse {}

export interface GetBudgetConfigurationRequest {
  /** The budget configuration ID */
  budgetId?: string | undefined;
  /** Databricks account ID. */
  accountId?: string | undefined;
}

export interface GetBudgetConfigurationResponse {
  /** The requested budget configuration. */
  budget?: BudgetConfiguration | undefined;
}

/** Request for the calling user's spend status for a single budget. */
export interface GetBudgetSpendStatusRequest {
  /**
   * The resource name of the budget spend status to read, of the form
   * `accounts/{account_id}/budget-spend-statuses/{budget_id}`. A `budget_id` that isn't a valid
   * UUID fails with INVALID_PARAMETER_VALUE.
   */
  name?: string | undefined;
}

export interface ListBudgetConfigurationsRequest {
  /** Databricks account ID. */
  accountId?: string | undefined;
  /**
   * A page token received from a previous get all budget configurations call. This token can be used to retrieve the subsequent page.
   * Requests first page if absent.
   */
  pageToken?: string | undefined;
}

export interface ListBudgetConfigurationsResponse {
  budgets?: BudgetConfiguration[] | undefined;
  /** Token which can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no subsequent budgets. */
  nextPageToken?: string | undefined;
}

/** Request for the calling user's budget spend statuses. */
export interface ListBudgetSpendStatusesRequest {
  /** The parent account whose budget spend statuses to list, of the form `accounts/{account_id}`. */
  parent?: string | undefined;
  /**
   * A page token from a previous `ListBudgetSpendStatuses` response, used to fetch the next page.
   * Requests the first page if absent. All other request parameters except `page_size` must match
   * the request that returned the token; otherwise the request fails with INVALID_PARAMETER_VALUE.
   */
  pageToken?: string | undefined;
  /**
   * The maximum number of spend statuses to return per page. If unspecified or 0, at most 100 are
   * returned. The maximum value is 100; values above 100 are coerced to 100. Negative values fail
   * with INVALID_PARAMETER_VALUE. The server may return fewer results than requested, including
   * zero, even when more pages remain; page until `next_page_token` is absent.
   */
  pageSize?: number | undefined;
  /**
   * A filter expression that narrows the returned budgets by workspace. Only `workspace_id` is
   * supported, in lower case with numeric workspace IDs, for example `workspace_id = 123` or
   * `workspace_id IN (123, 456)`. Matches budgets that apply to any of the listed workspaces,
   * including budgets that apply to all workspaces. Any other expression, such as an empty `IN ()`
   * list, fails with INVALID_PARAMETER_VALUE. If empty, returns every budget in the account that has
   * a blocking threshold.
   */
  filter?: string | undefined;
}

/** Response for ListBudgetSpendStatuses. */
export interface ListBudgetSpendStatusesResponse {
  /** The calling user's spend status, one entry per returned budget. */
  budgetSpendStatuses?: BudgetSpendStatus[] | undefined;
  /**
   * Token to pass as `page_token` to retrieve the next page. Absent when there are no more results.
   * A page can contain fewer results than `page_size`, or none, while this token is still set, so
   * keep paging until it's absent.
   */
  nextPageToken?: string | undefined;
}

/** Per-principal threshold override on a PER_USER alert: bumps the alert's quantity_threshold for one principal_id. */
export interface PrincipalOverride {
  /** Account-level principal id (user, group, or service principal). */
  principalId?: bigint | undefined;
  /** Dollar amount that overrides the parent alert's quantity_threshold for this principal. */
  overrideThreshold?: string | undefined;
}

/**
 * A budget tracks the spend of your account, or of the workspaces and custom tags selected by its
 * filter, against one or more alert thresholds. Spend is measured in US dollars at list price. For an
 * overview, see https://docs.databricks.com/en/admin/account-settings/budgets.html.
 */
export interface UpdateBudgetConfigurationBudget {
  /** Databricks budget configuration ID. */
  budgetConfigurationId?: string | undefined;
  /** Databricks account ID. */
  accountId?: string | undefined;
  /**
   * Alerts to configure when this budget is in a triggered state. Budgets must have at least one alert configuration.
   * A budget can have up to four shared alerts per time period, each with a unique `quantity_threshold`.
   * Budgets with `resource_type` set to `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY` can also use per-user alerts, with optional `principal_overrides`.
   * These budgets can have at most one per-user alert per time period, and can use shared alerts, a per-user alert, or both.
   * The `BLOCK_USAGE` action is only supported on budgets with `resource_type` set to `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY`.
   * At most one shared alert per time period can have a `BLOCK_USAGE` action, and it must be the shared alert with the highest threshold in that period.
   */
  alertConfigurations?: AlertConfiguration[] | undefined;
  /**
   * Configured filters for this budget. These are applied to your account's usage to limit the scope of what is considered for this budget.
   * Leave empty to include all usage for this account. All provided filters must be matched for usage to be included.
   * The filter cannot be changed after the budget is created. To change it, delete the budget and create a new one.
   */
  filter?: BudgetConfigurationFilter | undefined;
  /** Human-readable name of budget configuration. Max Length: 128 */
  displayName?: string | undefined;
  /**
   * Whether this budget tracks external pass-through spend (third-party costs billed through a Databricks product) in addition to internal Databricks spend.
   * Only applicable to Unity Gateway budgets, i.e. when `resource_type` is `BUDGET_RESOURCE_TYPE_UNITY_AI_GATEWAY`. This field is immutable after create.
   */
  includeExternalSpend?: boolean | undefined;
  /** The resource scope for this budget. Determines whether the budget tracks all resources or a specific resource. */
  resourceType?: BudgetResourceType | undefined;
}

export interface UpdateBudgetConfigurationRequest {
  /** The Databricks budget configuration ID. */
  budgetId?: string | undefined;
  /**
   * The updated budget. This will overwrite the budget specified by the budget ID.
   * Alerts and actions are matched by ID: those omitted from the request are removed, and those
   * without an ID are created.
   */
  budget?: UpdateBudgetConfigurationBudget | undefined;
}

export interface UpdateBudgetConfigurationResponse {
  /** The updated budget. */
  budget?: BudgetConfiguration | undefined;
}

export const unmarshalActionConfigurationSchema: z.ZodType<ActionConfiguration> =
  z
    .object({
      action_configuration_id: z.string().optional(),
      action_type: z.string().optional(),
      target: z.string().optional(),
    })
    .transform(d => ({
      actionConfigurationId: d.action_configuration_id,
      actionType: d.action_type,
      target: d.target,
    }));

export const unmarshalAlertConfigurationSchema: z.ZodType<AlertConfiguration> =
  z
    .object({
      alert_configuration_id: z.string().optional(),
      time_period: z.string().optional(),
      trigger_type: z.string().optional(),
      quantity_type: z.string().optional(),
      quantity_threshold: z.string().optional(),
      action_configurations: z
        .array(z.lazy(() => unmarshalActionConfigurationSchema))
        .optional(),
      scope_type: z.string().optional(),
      principal_overrides: z
        .array(z.lazy(() => unmarshalPrincipalOverrideSchema))
        .optional(),
    })
    .transform(d => ({
      alertConfigurationId: d.alert_configuration_id,
      timePeriod: d.time_period,
      triggerType: d.trigger_type,
      quantityType: d.quantity_type,
      quantityThreshold: d.quantity_threshold,
      actionConfigurations: d.action_configurations,
      scopeType: d.scope_type,
      principalOverrides: d.principal_overrides,
    }));

export const unmarshalAlertSpendStatusSchema: z.ZodType<AlertSpendStatus> = z
  .object({
    scope_type: z.string().optional(),
    time_period: z.string().optional(),
    spend: z.string().optional(),
    threshold: z.string().optional(),
    percent_consumed: z.string().optional(),
  })
  .transform(d => ({
    scopeType: d.scope_type,
    timePeriod: d.time_period,
    spend: d.spend,
    threshold: d.threshold,
    percentConsumed: d.percent_consumed,
  }));

export const unmarshalBudgetConfigurationSchema: z.ZodType<BudgetConfiguration> =
  z
    .object({
      budget_configuration_id: z.string().optional(),
      account_id: z.string().optional(),
      create_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      update_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      alert_configurations: z
        .array(z.lazy(() => unmarshalAlertConfigurationSchema))
        .optional(),
      filter: z
        .lazy(() => unmarshalBudgetConfigurationFilterSchema)
        .nullish()
        .transform(v => v ?? undefined),
      display_name: z.string().optional(),
      include_external_spend: z.boolean().optional(),
      resource_type: z.string().optional(),
    })
    .transform(d => ({
      budgetConfigurationId: d.budget_configuration_id,
      accountId: d.account_id,
      createTime: d.create_time,
      updateTime: d.update_time,
      alertConfigurations: d.alert_configurations,
      filter: d.filter,
      displayName: d.display_name,
      includeExternalSpend: d.include_external_spend,
      resourceType: d.resource_type,
    }));

export const unmarshalBudgetConfigurationFilterSchema: z.ZodType<BudgetConfigurationFilter> =
  z
    .object({
      workspace_id: z
        .lazy(() => unmarshalBudgetConfigurationFilter_WorkspaceIdClauseSchema)
        .nullish()
        .transform(v => v ?? undefined),
      tags: z
        .array(z.lazy(() => unmarshalBudgetConfigurationFilter_TagClauseSchema))
        .optional(),
    })
    .transform(d => ({
      workspaceId: d.workspace_id,
      tags: d.tags,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalBudgetConfigurationFilter_ClauseSchema: z.ZodType<BudgetConfigurationFilter_Clause> =
  z
    .object({
      operator: z.string().optional(),
      values: z.array(z.string()).optional(),
    })
    .transform(d => ({
      operator: d.operator,
      values: d.values,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalBudgetConfigurationFilter_TagClauseSchema: z.ZodType<BudgetConfigurationFilter_TagClause> =
  z
    .object({
      key: z.string().optional(),
      value: z
        .lazy(() => unmarshalBudgetConfigurationFilter_ClauseSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalBudgetConfigurationFilter_WorkspaceIdClauseSchema: z.ZodType<BudgetConfigurationFilter_WorkspaceIdClause> =
  z
    .object({
      operator: z.string().optional(),
      values: z
        .array(
          z
            .union([z.number(), z.bigint(), z.string()])
            .transform(v => BigInt(v))
        )
        .optional(),
    })
    .transform(d => ({
      operator: d.operator,
      values: d.values,
    }));

export const unmarshalBudgetSpendStatusSchema: z.ZodType<BudgetSpendStatus> = z
  .object({
    name: z.string().optional(),
    alert_spend_statuses: z
      .array(z.lazy(() => unmarshalAlertSpendStatusSchema))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    alertSpendStatuses: d.alert_spend_statuses,
  }));

export const unmarshalCreateBudgetConfigurationResponseSchema: z.ZodType<CreateBudgetConfigurationResponse> =
  z
    .object({
      budget: z
        .lazy(() => unmarshalBudgetConfigurationSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      budget: d.budget,
    }));

export const unmarshalDeleteBudgetConfigurationResponseSchema: z.ZodType<DeleteBudgetConfigurationResponse> =
  z.object({});

export const unmarshalGetBudgetConfigurationResponseSchema: z.ZodType<GetBudgetConfigurationResponse> =
  z
    .object({
      budget: z
        .lazy(() => unmarshalBudgetConfigurationSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      budget: d.budget,
    }));

export const unmarshalListBudgetConfigurationsResponseSchema: z.ZodType<ListBudgetConfigurationsResponse> =
  z
    .object({
      budgets: z
        .array(z.lazy(() => unmarshalBudgetConfigurationSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      budgets: d.budgets,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListBudgetSpendStatusesResponseSchema: z.ZodType<ListBudgetSpendStatusesResponse> =
  z
    .object({
      budget_spend_statuses: z
        .array(z.lazy(() => unmarshalBudgetSpendStatusSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      budgetSpendStatuses: d.budget_spend_statuses,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalPrincipalOverrideSchema: z.ZodType<PrincipalOverride> = z
  .object({
    principal_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    override_threshold: z.string().optional(),
  })
  .transform(d => ({
    principalId: d.principal_id,
    overrideThreshold: d.override_threshold,
  }));

export const unmarshalUpdateBudgetConfigurationResponseSchema: z.ZodType<UpdateBudgetConfigurationResponse> =
  z
    .object({
      budget: z
        .lazy(() => unmarshalBudgetConfigurationSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      budget: d.budget,
    }));

export const marshalActionConfigurationSchema: z.ZodType = z
  .object({
    actionConfigurationId: z.string().optional(),
    actionType: z.string().optional(),
    target: z.string().optional(),
  })
  .transform(d => ({
    action_configuration_id: d.actionConfigurationId,
    action_type: d.actionType,
    target: d.target,
  }));

export const marshalAlertConfigurationSchema: z.ZodType = z
  .object({
    alertConfigurationId: z.string().optional(),
    timePeriod: z.string().optional(),
    triggerType: z.string().optional(),
    quantityType: z.string().optional(),
    quantityThreshold: z.string().optional(),
    actionConfigurations: z
      .array(z.lazy(() => marshalActionConfigurationSchema))
      .optional(),
    scopeType: z.string().optional(),
    principalOverrides: z
      .array(z.lazy(() => marshalPrincipalOverrideSchema))
      .optional(),
  })
  .transform(d => ({
    alert_configuration_id: d.alertConfigurationId,
    time_period: d.timePeriod,
    trigger_type: d.triggerType,
    quantity_type: d.quantityType,
    quantity_threshold: d.quantityThreshold,
    action_configurations: d.actionConfigurations,
    scope_type: d.scopeType,
    principal_overrides: d.principalOverrides,
  }));

export const marshalAlertSpendStatusSchema: z.ZodType = z
  .object({
    scopeType: z.string().optional(),
    timePeriod: z.string().optional(),
    spend: z.string().optional(),
    threshold: z.string().optional(),
    percentConsumed: z.string().optional(),
  })
  .transform(d => ({
    scope_type: d.scopeType,
    time_period: d.timePeriod,
    spend: d.spend,
    threshold: d.threshold,
    percent_consumed: d.percentConsumed,
  }));

export const marshalBudgetConfigurationSchema: z.ZodType = z
  .object({
    budgetConfigurationId: z.string().optional(),
    accountId: z.string().optional(),
    createTime: z.bigint().optional(),
    updateTime: z.bigint().optional(),
    alertConfigurations: z
      .array(z.lazy(() => marshalAlertConfigurationSchema))
      .optional(),
    filter: z.lazy(() => marshalBudgetConfigurationFilterSchema).optional(),
    displayName: z.string().optional(),
    includeExternalSpend: z.boolean().optional(),
    resourceType: z.string().optional(),
  })
  .transform(d => ({
    budget_configuration_id: d.budgetConfigurationId,
    account_id: d.accountId,
    create_time: d.createTime,
    update_time: d.updateTime,
    alert_configurations: d.alertConfigurations,
    filter: d.filter,
    display_name: d.displayName,
    include_external_spend: d.includeExternalSpend,
    resource_type: d.resourceType,
  }));

export const marshalBudgetConfigurationFilterSchema: z.ZodType = z
  .object({
    workspaceId: z
      .lazy(() => marshalBudgetConfigurationFilter_WorkspaceIdClauseSchema)
      .optional(),
    tags: z
      .array(z.lazy(() => marshalBudgetConfigurationFilter_TagClauseSchema))
      .optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    tags: d.tags,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalBudgetConfigurationFilter_ClauseSchema: z.ZodType = z
  .object({
    operator: z.string().optional(),
    values: z.array(z.string()).optional(),
  })
  .transform(d => ({
    operator: d.operator,
    values: d.values,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalBudgetConfigurationFilter_TagClauseSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z
      .lazy(() => marshalBudgetConfigurationFilter_ClauseSchema)
      .optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalBudgetConfigurationFilter_WorkspaceIdClauseSchema: z.ZodType =
  z
    .object({
      operator: z.string().optional(),
      values: z.array(z.bigint()).optional(),
    })
    .transform(d => ({
      operator: d.operator,
      values: d.values,
    }));

export const marshalBudgetSpendStatusSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    alertSpendStatuses: z
      .array(z.lazy(() => marshalAlertSpendStatusSchema))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    alert_spend_statuses: d.alertSpendStatuses,
  }));

export const marshalCreateBudgetConfigurationBudgetSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    alertConfigurations: z
      .array(
        z.lazy(
          () => marshalCreateBudgetConfigurationBudgetAlertConfigurationsSchema
        )
      )
      .optional(),
    filter: z.lazy(() => marshalBudgetConfigurationFilterSchema).optional(),
    displayName: z.string().optional(),
    includeExternalSpend: z.boolean().optional(),
    resourceType: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    alert_configurations: d.alertConfigurations,
    filter: d.filter,
    display_name: d.displayName,
    include_external_spend: d.includeExternalSpend,
    resource_type: d.resourceType,
  }));

export const marshalCreateBudgetConfigurationBudgetActionConfigurationsSchema: z.ZodType =
  z
    .object({
      actionType: z.string().optional(),
      target: z.string().optional(),
    })
    .transform(d => ({
      action_type: d.actionType,
      target: d.target,
    }));

export const marshalCreateBudgetConfigurationBudgetAlertConfigurationsSchema: z.ZodType =
  z
    .object({
      timePeriod: z.string().optional(),
      triggerType: z.string().optional(),
      quantityType: z.string().optional(),
      quantityThreshold: z.string().optional(),
      actionConfigurations: z
        .array(
          z.lazy(
            () =>
              marshalCreateBudgetConfigurationBudgetActionConfigurationsSchema
          )
        )
        .optional(),
      scopeType: z.string().optional(),
      principalOverrides: z
        .array(z.lazy(() => marshalPrincipalOverrideSchema))
        .optional(),
    })
    .transform(d => ({
      time_period: d.timePeriod,
      trigger_type: d.triggerType,
      quantity_type: d.quantityType,
      quantity_threshold: d.quantityThreshold,
      action_configurations: d.actionConfigurations,
      scope_type: d.scopeType,
      principal_overrides: d.principalOverrides,
    }));

export const marshalCreateBudgetConfigurationRequestSchema: z.ZodType = z
  .object({
    budget: z
      .lazy(() => marshalCreateBudgetConfigurationBudgetSchema)
      .optional(),
  })
  .transform(d => ({
    budget: d.budget,
  }));

export const marshalCreateBudgetConfigurationResponseSchema: z.ZodType = z
  .object({
    budget: z.lazy(() => marshalBudgetConfigurationSchema).optional(),
  })
  .transform(d => ({
    budget: d.budget,
  }));

export const marshalDeleteBudgetConfigurationRequestSchema: z.ZodType = z
  .object({
    budgetId: z.string().optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    budget_id: d.budgetId,
    account_id: d.accountId,
  }));

export const marshalDeleteBudgetConfigurationResponseSchema: z.ZodType =
  z.object({});

export const marshalGetBudgetConfigurationRequestSchema: z.ZodType = z
  .object({
    budgetId: z.string().optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    budget_id: d.budgetId,
    account_id: d.accountId,
  }));

export const marshalGetBudgetConfigurationResponseSchema: z.ZodType = z
  .object({
    budget: z.lazy(() => marshalBudgetConfigurationSchema).optional(),
  })
  .transform(d => ({
    budget: d.budget,
  }));

export const marshalGetBudgetSpendStatusRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalListBudgetConfigurationsRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    page_token: d.pageToken,
  }));

export const marshalListBudgetConfigurationsResponseSchema: z.ZodType = z
  .object({
    budgets: z.array(z.lazy(() => marshalBudgetConfigurationSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    budgets: d.budgets,
    next_page_token: d.nextPageToken,
  }));

export const marshalListBudgetSpendStatusesRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
    pageToken: z.string().optional(),
    pageSize: z.number().optional(),
    filter: z.string().optional(),
  })
  .transform(d => ({
    parent: d.parent,
    page_token: d.pageToken,
    page_size: d.pageSize,
    filter: d.filter,
  }));

export const marshalListBudgetSpendStatusesResponseSchema: z.ZodType = z
  .object({
    budgetSpendStatuses: z
      .array(z.lazy(() => marshalBudgetSpendStatusSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    budget_spend_statuses: d.budgetSpendStatuses,
    next_page_token: d.nextPageToken,
  }));

export const marshalPrincipalOverrideSchema: z.ZodType = z
  .object({
    principalId: z.bigint().optional(),
    overrideThreshold: z.string().optional(),
  })
  .transform(d => ({
    principal_id: d.principalId,
    override_threshold: d.overrideThreshold,
  }));

export const marshalUpdateBudgetConfigurationBudgetSchema: z.ZodType = z
  .object({
    budgetConfigurationId: z.string().optional(),
    accountId: z.string().optional(),
    alertConfigurations: z
      .array(z.lazy(() => marshalAlertConfigurationSchema))
      .optional(),
    filter: z.lazy(() => marshalBudgetConfigurationFilterSchema).optional(),
    displayName: z.string().optional(),
    includeExternalSpend: z.boolean().optional(),
    resourceType: z.string().optional(),
  })
  .transform(d => ({
    budget_configuration_id: d.budgetConfigurationId,
    account_id: d.accountId,
    alert_configurations: d.alertConfigurations,
    filter: d.filter,
    display_name: d.displayName,
    include_external_spend: d.includeExternalSpend,
    resource_type: d.resourceType,
  }));

export const marshalUpdateBudgetConfigurationRequestSchema: z.ZodType = z
  .object({
    budgetId: z.string().optional(),
    budget: z
      .lazy(() => marshalUpdateBudgetConfigurationBudgetSchema)
      .optional(),
  })
  .transform(d => ({
    budget_id: d.budgetId,
    budget: d.budget,
  }));

export const marshalUpdateBudgetConfigurationResponseSchema: z.ZodType = z
  .object({
    budget: z.lazy(() => marshalBudgetConfigurationSchema).optional(),
  })
  .transform(d => ({
    budget: d.budget,
  }));
