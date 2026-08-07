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
  /** <Databricks> action configuration ID. */
  actionConfigurationId?: string | undefined;
  /** The type of the action. */
  actionType?: ActionConfigurationType | undefined;
  /** Target for the action. For example, an email address. */
  target?: string | undefined;
}

export interface AlertConfiguration {
  /** <Databricks> alert configuration ID. */
  alertConfigurationId?: string | undefined;
  /** The time window of usage data for the budget. */
  timePeriod?: AlertConfigurationTimePeriod | undefined;
  /** The evaluation method to determine when this budget alert is in a triggered state. */
  triggerType?: AlertConfigurationTriggerType | undefined;
  /** The way to calculate cost for this budget alert. This is what `quantity_threshold` is measured in. */
  quantityType?: AlertConfigurationQuantityType | undefined;
  /** The threshold for the budget alert to determine if it is in a triggered state. The number is evaluated based on `quantity_type`. */
  quantityThreshold?: string | undefined;
  /** Configured actions for this alert. These define what happens when an alert enters a triggered state. */
  actionConfigurations?: ActionConfiguration[] | undefined;
  /** How the alert threshold is evaluated. Determines whether spend is tracked in aggregate or per individual user. */
  scopeType?: AlertConfigurationScopeType | undefined;
  /** Per-principal threshold overrides for this alert. Only applies to per-user alerts (`scope_type` = `ALERT_CONFIGURATION_SCOPE_TYPE_PER_USER`); ignored for shared alerts. */
  principalOverrides?: PrincipalOverride[] | undefined;
}

export interface BudgetConfiguration {
  /** <Databricks> budget configuration ID. */
  budgetConfigurationId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** Creation time of this budget configuration. */
  createTime?: bigint | undefined;
  /** Update time of this budget configuration. */
  updateTime?: bigint | undefined;
  /** Alerts to configure when this budget is in a triggered state. Budgets must have exactly one alert configuration. */
  alertConfigurations?: AlertConfiguration[] | undefined;
  /**
   * Configured filters for this budget. These are applied to your account's usage to limit the scope of what is considered for this budget.
   * Leave empty to include all usage for this account. All provided filters must be matched for usage to be included.
   */
  filter?: BudgetConfigurationFilter | undefined;
  /** Human-readable name of budget configuration. Max Length: 128 */
  displayName?: string | undefined;
  /** The resource scope for this budget. Determines whether the budget tracks all resources or a specific resource. */
  resourceType?: BudgetResourceType | undefined;
}

export interface BudgetConfigurationFilter {
  /** If provided, usage must match with the provided <Databricks> workspace IDs. */
  workspaceId?: BudgetConfigurationFilter_WorkspaceIdClause | undefined;
  /**
   * A list of tag keys and values that will limit the budget to usage that includes those specific custom tags.
   * Tags are case-sensitive and should be entered exactly as they appear in your usage data.
   */
  tags?: BudgetConfigurationFilter_TagClause[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface BudgetConfigurationFilter_Clause {
  operator?: BudgetConfigurationFilter_Operator | undefined;
  values?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface BudgetConfigurationFilter_TagClause {
  key?: string | undefined;
  value?: BudgetConfigurationFilter_Clause | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface BudgetConfigurationFilter_WorkspaceIdClause {
  operator?: BudgetConfigurationFilter_Operator | undefined;
  values?: bigint[] | undefined;
}

export interface CreateBudgetConfigurationBudget {
  /** <Databricks> budget configuration ID. */
  budgetConfigurationId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** Creation time of this budget configuration. */
  createTime?: bigint | undefined;
  /** Update time of this budget configuration. */
  updateTime?: bigint | undefined;
  /** Alerts to configure when this budget is in a triggered state. Budgets must have exactly one alert configuration. */
  alertConfigurations?: AlertConfiguration[] | undefined;
  /**
   * Configured filters for this budget. These are applied to your account's usage to limit the scope of what is considered for this budget.
   * Leave empty to include all usage for this account. All provided filters must be matched for usage to be included.
   */
  filter?: BudgetConfigurationFilter | undefined;
  /** Human-readable name of budget configuration. Max Length: 128 */
  displayName?: string | undefined;
  /** The resource scope for this budget. Determines whether the budget tracks all resources or a specific resource. */
  resourceType?: BudgetResourceType | undefined;
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
  /** The <Databricks> budget configuration ID. */
  budgetId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteBudgetConfigurationResponse {}

export interface GetBudgetConfigurationRequest {
  /** The budget configuration ID */
  budgetId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  includeSpendStatus?: boolean | undefined;
}

export interface GetBudgetConfigurationResponse {
  budget?: BudgetConfiguration | undefined;
}

export interface ListBudgetConfigurationsRequest {
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /**
   * A page token received from a previous get all budget configurations call. This token can be used to retrieve the subsequent page.
   * Requests first page if absent.
   */
  pageToken?: string | undefined;
  includeSpendStatus?: boolean | undefined;
  includeWorkspaceBudgets?: boolean | undefined;
}

export interface ListBudgetConfigurationsResponse {
  budgets?: BudgetConfiguration[] | undefined;
  /** Token which can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no subsequent budgets. */
  nextPageToken?: string | undefined;
}

/** Per-principal threshold override on a PER_USER alert: bumps the alert's quantity_threshold for one principal_id. */
export interface PrincipalOverride {
  /** Account-level principal id (user, group, or service principal). */
  principalId?: bigint | undefined;
  /** Dollar amount that overrides the parent alert's quantity_threshold for this principal. */
  overrideThreshold?: string | undefined;
}

export interface UpdateBudgetConfigurationBudget {
  /** <Databricks> budget configuration ID. */
  budgetConfigurationId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** Creation time of this budget configuration. */
  createTime?: bigint | undefined;
  /** Update time of this budget configuration. */
  updateTime?: bigint | undefined;
  /** Alerts to configure when this budget is in a triggered state. Budgets must have exactly one alert configuration. */
  alertConfigurations?: AlertConfiguration[] | undefined;
  /**
   * Configured filters for this budget. These are applied to your account's usage to limit the scope of what is considered for this budget.
   * Leave empty to include all usage for this account. All provided filters must be matched for usage to be included.
   */
  filter?: BudgetConfigurationFilter | undefined;
  /** Human-readable name of budget configuration. Max Length: 128 */
  displayName?: string | undefined;
  /** The resource scope for this budget. Determines whether the budget tracks all resources or a specific resource. */
  resourceType?: BudgetResourceType | undefined;
}

export interface UpdateBudgetConfigurationRequest {
  /** The <Databricks> budget configuration ID. */
  budgetId?: string | undefined;
  /** The updated budget. This will overwrite the budget specified by the budget ID. */
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

export const unmarshalBudgetConfigurationSchema: z.ZodType<BudgetConfiguration> =
  z
    .object({
      budget_configuration_id: z.string().optional(),
      account_id: z.string().optional(),
      create_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      update_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      alert_configurations: z
        .array(z.lazy(() => unmarshalAlertConfigurationSchema))
        .optional(),
      filter: z.lazy(() => unmarshalBudgetConfigurationFilterSchema).optional(),
      display_name: z.string().optional(),
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
      resourceType: d.resource_type,
    }));

export const unmarshalBudgetConfigurationFilterSchema: z.ZodType<BudgetConfigurationFilter> =
  z
    .object({
      workspace_id: z
        .lazy(() => unmarshalBudgetConfigurationFilter_WorkspaceIdClauseSchema)
        .optional(),
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
        .optional(),
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
        .array(z.union([z.number(), z.bigint()]).transform(v => BigInt(v)))
        .optional(),
    })
    .transform(d => ({
      operator: d.operator,
      values: d.values,
    }));

export const unmarshalCreateBudgetConfigurationResponseSchema: z.ZodType<CreateBudgetConfigurationResponse> =
  z
    .object({
      budget: z.lazy(() => unmarshalBudgetConfigurationSchema).optional(),
    })
    .transform(d => ({
      budget: d.budget,
    }));

export const unmarshalDeleteBudgetConfigurationResponseSchema: z.ZodType<DeleteBudgetConfigurationResponse> =
  z.object({});

export const unmarshalGetBudgetConfigurationResponseSchema: z.ZodType<GetBudgetConfigurationResponse> =
  z
    .object({
      budget: z.lazy(() => unmarshalBudgetConfigurationSchema).optional(),
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

export const unmarshalPrincipalOverrideSchema: z.ZodType<PrincipalOverride> = z
  .object({
    principal_id: z
      .union([z.number(), z.bigint()])
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
      budget: z.lazy(() => unmarshalBudgetConfigurationSchema).optional(),
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

export const marshalCreateBudgetConfigurationBudgetSchema: z.ZodType = z
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
    resource_type: d.resourceType,
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
    createTime: z.bigint().optional(),
    updateTime: z.bigint().optional(),
    alertConfigurations: z
      .array(z.lazy(() => marshalAlertConfigurationSchema))
      .optional(),
    filter: z.lazy(() => marshalBudgetConfigurationFilterSchema).optional(),
    displayName: z.string().optional(),
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
