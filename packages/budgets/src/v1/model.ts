// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum ActionConfigurationType {
  EMAIL_NOTIFICATION = 'EMAIL_NOTIFICATION',
}

export enum AlertConfigurationQuantityType {
  LIST_PRICE_DOLLARS_USD = 'LIST_PRICE_DOLLARS_USD',
}

export enum AlertConfigurationTimePeriod {
  MONTH = 'MONTH',
}

export enum AlertConfigurationTriggerType {
  CUMULATIVE_SPENDING_EXCEEDED = 'CUMULATIVE_SPENDING_EXCEEDED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum BudgetConfigurationFilter_Operator {
  IN = 'IN',
}

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
}

export interface BudgetConfiguration {
  /** <Databricks> budget configuration ID. */
  budgetConfigurationId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** Creation time of this budget configuration. */
  createTime?: number | undefined;
  /** Update time of this budget configuration. */
  updateTime?: number | undefined;
  /** Alerts to configure when this budget is in a triggered state. Budgets must have exactly one alert configuration. */
  alertConfigurations?: AlertConfiguration[] | undefined;
  /**
   * Configured filters for this budget. These are applied to your account's usage to limit the scope of what is considered for this budget.
   * Leave empty to include all usage for this account. All provided filters must be matched for usage to be included.
   */
  filter?: BudgetConfigurationFilter | undefined;
  /** Human-readable name of budget configuration. Max Length: 128 */
  displayName?: string | undefined;
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
  values?: number[] | undefined;
}

export interface CreateBudgetConfiguration {
  /** Properties of the new budget configuration. */
  budget?: CreateBudgetConfigurationBudget | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateBudgetConfiguration_Response {
  /** The created budget configuration. */
  budget?: BudgetConfiguration | undefined;
}

export interface CreateBudgetConfigurationBudget {
  /** <Databricks> budget configuration ID. */
  budgetConfigurationId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** Creation time of this budget configuration. */
  createTime?: number | undefined;
  /** Update time of this budget configuration. */
  updateTime?: number | undefined;
  /** Alerts to configure when this budget is in a triggered state. Budgets must have exactly one alert configuration. */
  alertConfigurations?: AlertConfiguration[] | undefined;
  /**
   * Configured filters for this budget. These are applied to your account's usage to limit the scope of what is considered for this budget.
   * Leave empty to include all usage for this account. All provided filters must be matched for usage to be included.
   */
  filter?: BudgetConfigurationFilter | undefined;
  /** Human-readable name of budget configuration. Max Length: 128 */
  displayName?: string | undefined;
}

/**
 * *
 * Delete budget
 */
export interface DeleteBudgetConfiguration {
  /** The <Databricks> budget configuration ID. */
  budgetId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteBudgetConfiguration_Response {}

export interface GetBudgetConfiguration {
  /** The budget configuration ID */
  budgetId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  includeSpendStatus?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetBudgetConfiguration_Response {
  budget?: BudgetConfiguration | undefined;
}

export interface ListBudgetConfigurations {
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /**
   * A page token received from a previous get all budget configurations call. This token can be used to retrieve the subsequent page.
   * Requests first page if absent.
   */
  pageToken?: string | undefined;
  includeSpendStatus?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListBudgetConfigurations_Response {
  budgets?: BudgetConfiguration[] | undefined;
  /** Token which can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no subsequent budgets. */
  nextPageToken?: string | undefined;
}

export interface UpdateBudgetConfiguration {
  /** The <Databricks> budget configuration ID. */
  budgetId?: string | undefined;
  /** The updated budget. This will overwrite the budget specified by the budget ID. */
  budget?: UpdateBudgetConfigurationBudget | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateBudgetConfiguration_Response {
  /** The updated budget. */
  budget?: BudgetConfiguration | undefined;
}

export interface UpdateBudgetConfigurationBudget {
  /** <Databricks> budget configuration ID. */
  budgetConfigurationId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** Creation time of this budget configuration. */
  createTime?: number | undefined;
  /** Update time of this budget configuration. */
  updateTime?: number | undefined;
  /** Alerts to configure when this budget is in a triggered state. Budgets must have exactly one alert configuration. */
  alertConfigurations?: AlertConfiguration[] | undefined;
  /**
   * Configured filters for this budget. These are applied to your account's usage to limit the scope of what is considered for this budget.
   * Leave empty to include all usage for this account. All provided filters must be matched for usage to be included.
   */
  filter?: BudgetConfigurationFilter | undefined;
  /** Human-readable name of budget configuration. Max Length: 128 */
  displayName?: string | undefined;
}

export const unmarshalActionConfigurationSchema: z.ZodType<ActionConfiguration> =
  z
    .object({
      action_configuration_id: z.string().optional(),
      action_type: z.enum(ActionConfigurationType).optional(),
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
      time_period: z.enum(AlertConfigurationTimePeriod).optional(),
      trigger_type: z.enum(AlertConfigurationTriggerType).optional(),
      quantity_type: z.enum(AlertConfigurationQuantityType).optional(),
      quantity_threshold: z.string().optional(),
      action_configurations: z
        .array(z.lazy(() => unmarshalActionConfigurationSchema))
        .optional(),
    })
    .transform(d => ({
      alertConfigurationId: d.alert_configuration_id,
      timePeriod: d.time_period,
      triggerType: d.trigger_type,
      quantityType: d.quantity_type,
      quantityThreshold: d.quantity_threshold,
      actionConfigurations: d.action_configurations,
    }));

export const unmarshalBudgetConfigurationSchema: z.ZodType<BudgetConfiguration> =
  z
    .object({
      budget_configuration_id: z.string().optional(),
      account_id: z.string().optional(),
      create_time: z.number().optional(),
      update_time: z.number().optional(),
      alert_configurations: z
        .array(z.lazy(() => unmarshalAlertConfigurationSchema))
        .optional(),
      filter: z.lazy(() => unmarshalBudgetConfigurationFilterSchema).optional(),
      display_name: z.string().optional(),
    })
    .transform(d => ({
      budgetConfigurationId: d.budget_configuration_id,
      accountId: d.account_id,
      createTime: d.create_time,
      updateTime: d.update_time,
      alertConfigurations: d.alert_configurations,
      filter: d.filter,
      displayName: d.display_name,
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
      operator: z.enum(BudgetConfigurationFilter_Operator).optional(),
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
      operator: z.enum(BudgetConfigurationFilter_Operator).optional(),
      values: z.array(z.number()).optional(),
    })
    .transform(d => ({
      operator: d.operator,
      values: d.values,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateBudgetConfiguration_ResponseSchema: z.ZodType<CreateBudgetConfiguration_Response> =
  z
    .object({
      budget: z.lazy(() => unmarshalBudgetConfigurationSchema).optional(),
    })
    .transform(d => ({
      budget: d.budget,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteBudgetConfiguration_ResponseSchema: z.ZodType<DeleteBudgetConfiguration_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetBudgetConfiguration_ResponseSchema: z.ZodType<GetBudgetConfiguration_Response> =
  z
    .object({
      budget: z.lazy(() => unmarshalBudgetConfigurationSchema).optional(),
    })
    .transform(d => ({
      budget: d.budget,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListBudgetConfigurations_ResponseSchema: z.ZodType<ListBudgetConfigurations_Response> =
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateBudgetConfiguration_ResponseSchema: z.ZodType<UpdateBudgetConfiguration_Response> =
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
    actionType: z.enum(ActionConfigurationType).optional(),
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
    timePeriod: z.enum(AlertConfigurationTimePeriod).optional(),
    triggerType: z.enum(AlertConfigurationTriggerType).optional(),
    quantityType: z.enum(AlertConfigurationQuantityType).optional(),
    quantityThreshold: z.string().optional(),
    actionConfigurations: z
      .array(z.lazy(() => marshalActionConfigurationSchema))
      .optional(),
  })
  .transform(d => ({
    alert_configuration_id: d.alertConfigurationId,
    time_period: d.timePeriod,
    trigger_type: d.triggerType,
    quantity_type: d.quantityType,
    quantity_threshold: d.quantityThreshold,
    action_configurations: d.actionConfigurations,
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
    operator: z.enum(BudgetConfigurationFilter_Operator).optional(),
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
      operator: z.enum(BudgetConfigurationFilter_Operator).optional(),
      values: z.array(z.number()).optional(),
    })
    .transform(d => ({
      operator: d.operator,
      values: d.values,
    }));

export const marshalCreateBudgetConfigurationSchema: z.ZodType = z
  .object({
    budget: z
      .lazy(() => marshalCreateBudgetConfigurationBudgetSchema)
      .optional(),
  })
  .transform(d => ({
    budget: d.budget,
  }));

export const marshalCreateBudgetConfigurationBudgetSchema: z.ZodType = z
  .object({
    budgetConfigurationId: z.string().optional(),
    accountId: z.string().optional(),
    createTime: z.number().optional(),
    updateTime: z.number().optional(),
    alertConfigurations: z
      .array(z.lazy(() => marshalAlertConfigurationSchema))
      .optional(),
    filter: z.lazy(() => marshalBudgetConfigurationFilterSchema).optional(),
    displayName: z.string().optional(),
  })
  .transform(d => ({
    budget_configuration_id: d.budgetConfigurationId,
    account_id: d.accountId,
    create_time: d.createTime,
    update_time: d.updateTime,
    alert_configurations: d.alertConfigurations,
    filter: d.filter,
    display_name: d.displayName,
  }));

export const marshalUpdateBudgetConfigurationSchema: z.ZodType = z
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

export const marshalUpdateBudgetConfigurationBudgetSchema: z.ZodType = z
  .object({
    budgetConfigurationId: z.string().optional(),
    accountId: z.string().optional(),
    createTime: z.number().optional(),
    updateTime: z.number().optional(),
    alertConfigurations: z
      .array(z.lazy(() => marshalAlertConfigurationSchema))
      .optional(),
    filter: z.lazy(() => marshalBudgetConfigurationFilterSchema).optional(),
    displayName: z.string().optional(),
  })
  .transform(d => ({
    budget_configuration_id: d.budgetConfigurationId,
    account_id: d.accountId,
    create_time: d.createTime,
    update_time: d.updateTime,
    alert_configurations: d.alertConfigurations,
    filter: d.filter,
    display_name: d.displayName,
  }));
