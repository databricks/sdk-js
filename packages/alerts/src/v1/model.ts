// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export enum AlertOperator {
  GREATER_THAN = 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  IS_NULL = 'IS_NULL',
}

export enum AlertState {
  UNKNOWN = 'UNKNOWN',
  OK = 'OK',
  TRIGGERED = 'TRIGGERED',
}

export enum LifecycleState {
  ACTIVE = 'ACTIVE',
  TRASHED = 'TRASHED',
}

export interface Alert {
  /** UUID identifying the alert. */
  id?: string | undefined;
  /** The display name of the alert. */
  displayName?: string | undefined;
  /** UUID of the query attached to the alert. */
  queryId?: string | undefined;
  /** Current state of the alert's trigger status. This field is set to UNKNOWN if the alert has not yet been evaluated or ran into an error during the last evaluation. */
  state?: AlertState | undefined;
  /** Number of seconds an alert must wait after being triggered to rearm itself. After rearming, it can be triggered again. If 0 or not specified, the alert will not be triggered again. */
  secondsToRetrigger?: number | undefined;
  /** The workspace state of the alert. Used for tracking trashed status. */
  lifecycleState?: LifecycleState | undefined;
  /** Timestamp when the alert was last triggered, if the alert has been triggered before. */
  triggerTime?: Temporal.Instant | undefined;
  /** Custom body of alert notification, if it exists. See [here](/sql/user/alerts/index.html) for custom templating instructions. */
  customBody?: string | undefined;
  /** Custom subject of alert notification, if it exists. This can include email subject entries and Slack notification headers, for example. See [here](/sql/user/alerts/index.html) for custom templating instructions. */
  customSubject?: string | undefined;
  /** Trigger conditions of the alert. */
  condition?: AlertCondition | undefined;
  /** The owner's username. This field is set to "Unavailable" if the user has been deleted. */
  ownerUserName?: string | undefined;
  /** The workspace path of the folder containing the alert. */
  parentPath?: string | undefined;
  /** The timestamp indicating when the alert was created. */
  createTime?: Temporal.Instant | undefined;
  /** The timestamp indicating when the alert was updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Whether to notify alert subscribers when alert returns back to normal. */
  notifyOnOk?: boolean | undefined;
}

export interface AlertCondition {
  /** Operator used for comparison in alert evaluation. */
  op?: AlertOperator | undefined;
  /** Name of the column from the query result to use for comparison in alert evaluation. */
  operand?: AlertOperand | undefined;
  /** Threshold value used for comparison in alert evaluation. */
  threshold?: AlertOperand | undefined;
  /** Alert state if result is empty. */
  emptyResultState?: AlertState | undefined;
}

export interface AlertOperand {
  value?: AlertOperandValue | undefined;
  column?: AlertOperandColumn | undefined;
}

export interface AlertOperandColumn {
  name?: string | undefined;
}

export interface AlertOperandValue {
  stringValue?: string | undefined;
  doubleValue?: number | undefined;
  boolValue?: boolean | undefined;
}

export interface CreateAlertRequest {
  alert?: CreateAlertRequestAlert | undefined;
  /** If true, automatically resolve alert display name conflicts. Otherwise, fail the request if the alert's display name conflicts with an existing alert's display name. */
  autoResolveDisplayName?: boolean | undefined;
}

export interface CreateAlertRequestAlert {
  /** UUID identifying the alert. */
  id?: string | undefined;
  /** The display name of the alert. */
  displayName?: string | undefined;
  /** UUID of the query attached to the alert. */
  queryId?: string | undefined;
  /** Current state of the alert's trigger status. This field is set to UNKNOWN if the alert has not yet been evaluated or ran into an error during the last evaluation. */
  state?: AlertState | undefined;
  /** Number of seconds an alert must wait after being triggered to rearm itself. After rearming, it can be triggered again. If 0 or not specified, the alert will not be triggered again. */
  secondsToRetrigger?: number | undefined;
  /** The workspace state of the alert. Used for tracking trashed status. */
  lifecycleState?: LifecycleState | undefined;
  /** Timestamp when the alert was last triggered, if the alert has been triggered before. */
  triggerTime?: Temporal.Instant | undefined;
  /** Custom body of alert notification, if it exists. See [here](/sql/user/alerts/index.html) for custom templating instructions. */
  customBody?: string | undefined;
  /** Custom subject of alert notification, if it exists. This can include email subject entries and Slack notification headers, for example. See [here](/sql/user/alerts/index.html) for custom templating instructions. */
  customSubject?: string | undefined;
  /** Trigger conditions of the alert. */
  condition?: AlertCondition | undefined;
  /** The owner's username. This field is set to "Unavailable" if the user has been deleted. */
  ownerUserName?: string | undefined;
  /** The workspace path of the folder containing the alert. */
  parentPath?: string | undefined;
  /** The timestamp indicating when the alert was created. */
  createTime?: Temporal.Instant | undefined;
  /** The timestamp indicating when the alert was updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Whether to notify alert subscribers when alert returns back to normal. */
  notifyOnOk?: boolean | undefined;
}

/**
 * Represents an empty message, similar to google.protobuf.Empty, which is not available in the firm
 * right now.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Empty {}

export interface GetAlertRequest {
  id?: string | undefined;
}

export interface ListAlertsRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListAlertsResponse {
  results?: ListAlertsResponseAlert[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListAlertsResponseAlert {
  /** UUID identifying the alert. */
  id?: string | undefined;
  /** The display name of the alert. */
  displayName?: string | undefined;
  /** UUID of the query attached to the alert. */
  queryId?: string | undefined;
  /** Current state of the alert's trigger status. This field is set to UNKNOWN if the alert has not yet been evaluated or ran into an error during the last evaluation. */
  state?: AlertState | undefined;
  /** Number of seconds an alert must wait after being triggered to rearm itself. After rearming, it can be triggered again. If 0 or not specified, the alert will not be triggered again. */
  secondsToRetrigger?: number | undefined;
  /** The workspace state of the alert. Used for tracking trashed status. */
  lifecycleState?: LifecycleState | undefined;
  /** Timestamp when the alert was last triggered, if the alert has been triggered before. */
  triggerTime?: Temporal.Instant | undefined;
  /** Custom body of alert notification, if it exists. See [here](/sql/user/alerts/index.html) for custom templating instructions. */
  customBody?: string | undefined;
  /** Custom subject of alert notification, if it exists. This can include email subject entries and Slack notification headers, for example. See [here](/sql/user/alerts/index.html) for custom templating instructions. */
  customSubject?: string | undefined;
  /** Trigger conditions of the alert. */
  condition?: AlertCondition | undefined;
  /** The owner's username. This field is set to "Unavailable" if the user has been deleted. */
  ownerUserName?: string | undefined;
  /** The workspace path of the folder containing the alert. */
  parentPath?: string | undefined;
  /** The timestamp indicating when the alert was created. */
  createTime?: Temporal.Instant | undefined;
  /** The timestamp indicating when the alert was updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Whether to notify alert subscribers when alert returns back to normal. */
  notifyOnOk?: boolean | undefined;
}

export interface TrashAlertRequest {
  id?: string | undefined;
}

export interface UpdateAlertRequest {
  alert?: UpdateAlertRequestAlert | undefined;
  updateMask?: string | undefined;
  id?: string | undefined;
  /** If true, automatically resolve alert display name conflicts. Otherwise, fail the request if the alert's display name conflicts with an existing alert's display name. */
  autoResolveDisplayName?: boolean | undefined;
}

export interface UpdateAlertRequestAlert {
  /** UUID identifying the alert. */
  id?: string | undefined;
  /** The display name of the alert. */
  displayName?: string | undefined;
  /** UUID of the query attached to the alert. */
  queryId?: string | undefined;
  /** Current state of the alert's trigger status. This field is set to UNKNOWN if the alert has not yet been evaluated or ran into an error during the last evaluation. */
  state?: AlertState | undefined;
  /** Number of seconds an alert must wait after being triggered to rearm itself. After rearming, it can be triggered again. If 0 or not specified, the alert will not be triggered again. */
  secondsToRetrigger?: number | undefined;
  /** The workspace state of the alert. Used for tracking trashed status. */
  lifecycleState?: LifecycleState | undefined;
  /** Timestamp when the alert was last triggered, if the alert has been triggered before. */
  triggerTime?: Temporal.Instant | undefined;
  /** Custom body of alert notification, if it exists. See [here](/sql/user/alerts/index.html) for custom templating instructions. */
  customBody?: string | undefined;
  /** Custom subject of alert notification, if it exists. This can include email subject entries and Slack notification headers, for example. See [here](/sql/user/alerts/index.html) for custom templating instructions. */
  customSubject?: string | undefined;
  /** Trigger conditions of the alert. */
  condition?: AlertCondition | undefined;
  /** The owner's username. This field is set to "Unavailable" if the user has been deleted. */
  ownerUserName?: string | undefined;
  /** The workspace path of the folder containing the alert. */
  parentPath?: string | undefined;
  /** The timestamp indicating when the alert was created. */
  createTime?: Temporal.Instant | undefined;
  /** The timestamp indicating when the alert was updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Whether to notify alert subscribers when alert returns back to normal. */
  notifyOnOk?: boolean | undefined;
}

export const unmarshalAlertSchema: z.ZodType<Alert> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    query_id: z.string().optional(),
    state: z.enum(AlertState).optional(),
    seconds_to_retrigger: z.number().optional(),
    lifecycle_state: z.enum(LifecycleState).optional(),
    trigger_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    custom_body: z.string().optional(),
    custom_subject: z.string().optional(),
    condition: z.lazy(() => unmarshalAlertConditionSchema).optional(),
    owner_user_name: z.string().optional(),
    parent_path: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    notify_on_ok: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    displayName: d.display_name,
    queryId: d.query_id,
    state: d.state,
    secondsToRetrigger: d.seconds_to_retrigger,
    lifecycleState: d.lifecycle_state,
    triggerTime: d.trigger_time,
    customBody: d.custom_body,
    customSubject: d.custom_subject,
    condition: d.condition,
    ownerUserName: d.owner_user_name,
    parentPath: d.parent_path,
    createTime: d.create_time,
    updateTime: d.update_time,
    notifyOnOk: d.notify_on_ok,
  }));

export const unmarshalAlertConditionSchema: z.ZodType<AlertCondition> = z
  .object({
    op: z.enum(AlertOperator).optional(),
    operand: z.lazy(() => unmarshalAlertOperandSchema).optional(),
    threshold: z.lazy(() => unmarshalAlertOperandSchema).optional(),
    empty_result_state: z.enum(AlertState).optional(),
  })
  .transform(d => ({
    op: d.op,
    operand: d.operand,
    threshold: d.threshold,
    emptyResultState: d.empty_result_state,
  }));

export const unmarshalAlertOperandSchema: z.ZodType<AlertOperand> = z
  .object({
    value: z.lazy(() => unmarshalAlertOperandValueSchema).optional(),
    column: z.lazy(() => unmarshalAlertOperandColumnSchema).optional(),
  })
  .transform(d => ({
    value: d.value,
    column: d.column,
  }));

export const unmarshalAlertOperandColumnSchema: z.ZodType<AlertOperandColumn> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalAlertOperandValueSchema: z.ZodType<AlertOperandValue> = z
  .object({
    string_value: z.string().optional(),
    double_value: z.number().optional(),
    bool_value: z.boolean().optional(),
  })
  .transform(d => ({
    stringValue: d.string_value,
    doubleValue: d.double_value,
    boolValue: d.bool_value,
  }));

export const unmarshalCreateAlertRequestSchema: z.ZodType<CreateAlertRequest> =
  z
    .object({
      alert: z.lazy(() => unmarshalCreateAlertRequestAlertSchema).optional(),
      auto_resolve_display_name: z.boolean().optional(),
    })
    .transform(d => ({
      alert: d.alert,
      autoResolveDisplayName: d.auto_resolve_display_name,
    }));

export const unmarshalCreateAlertRequestAlertSchema: z.ZodType<CreateAlertRequestAlert> =
  z
    .object({
      id: z.string().optional(),
      display_name: z.string().optional(),
      query_id: z.string().optional(),
      state: z.enum(AlertState).optional(),
      seconds_to_retrigger: z.number().optional(),
      lifecycle_state: z.enum(LifecycleState).optional(),
      trigger_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      custom_body: z.string().optional(),
      custom_subject: z.string().optional(),
      condition: z.lazy(() => unmarshalAlertConditionSchema).optional(),
      owner_user_name: z.string().optional(),
      parent_path: z.string().optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      notify_on_ok: z.boolean().optional(),
    })
    .transform(d => ({
      id: d.id,
      displayName: d.display_name,
      queryId: d.query_id,
      state: d.state,
      secondsToRetrigger: d.seconds_to_retrigger,
      lifecycleState: d.lifecycle_state,
      triggerTime: d.trigger_time,
      customBody: d.custom_body,
      customSubject: d.custom_subject,
      condition: d.condition,
      ownerUserName: d.owner_user_name,
      parentPath: d.parent_path,
      createTime: d.create_time,
      updateTime: d.update_time,
      notifyOnOk: d.notify_on_ok,
    }));

export const unmarshalEmptySchema: z.ZodType<Empty> = z.object({});

export const unmarshalListAlertsResponseSchema: z.ZodType<ListAlertsResponse> =
  z
    .object({
      results: z
        .array(z.lazy(() => unmarshalListAlertsResponseAlertSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      results: d.results,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListAlertsResponseAlertSchema: z.ZodType<ListAlertsResponseAlert> =
  z
    .object({
      id: z.string().optional(),
      display_name: z.string().optional(),
      query_id: z.string().optional(),
      state: z.enum(AlertState).optional(),
      seconds_to_retrigger: z.number().optional(),
      lifecycle_state: z.enum(LifecycleState).optional(),
      trigger_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      custom_body: z.string().optional(),
      custom_subject: z.string().optional(),
      condition: z.lazy(() => unmarshalAlertConditionSchema).optional(),
      owner_user_name: z.string().optional(),
      parent_path: z.string().optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      notify_on_ok: z.boolean().optional(),
    })
    .transform(d => ({
      id: d.id,
      displayName: d.display_name,
      queryId: d.query_id,
      state: d.state,
      secondsToRetrigger: d.seconds_to_retrigger,
      lifecycleState: d.lifecycle_state,
      triggerTime: d.trigger_time,
      customBody: d.custom_body,
      customSubject: d.custom_subject,
      condition: d.condition,
      ownerUserName: d.owner_user_name,
      parentPath: d.parent_path,
      createTime: d.create_time,
      updateTime: d.update_time,
      notifyOnOk: d.notify_on_ok,
    }));

export const unmarshalUpdateAlertRequestSchema: z.ZodType<UpdateAlertRequest> =
  z
    .object({
      alert: z.lazy(() => unmarshalUpdateAlertRequestAlertSchema).optional(),
      update_mask: z.string().optional(),
      id: z.string().optional(),
      auto_resolve_display_name: z.boolean().optional(),
    })
    .transform(d => ({
      alert: d.alert,
      updateMask: d.update_mask,
      id: d.id,
      autoResolveDisplayName: d.auto_resolve_display_name,
    }));

export const unmarshalUpdateAlertRequestAlertSchema: z.ZodType<UpdateAlertRequestAlert> =
  z
    .object({
      id: z.string().optional(),
      display_name: z.string().optional(),
      query_id: z.string().optional(),
      state: z.enum(AlertState).optional(),
      seconds_to_retrigger: z.number().optional(),
      lifecycle_state: z.enum(LifecycleState).optional(),
      trigger_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      custom_body: z.string().optional(),
      custom_subject: z.string().optional(),
      condition: z.lazy(() => unmarshalAlertConditionSchema).optional(),
      owner_user_name: z.string().optional(),
      parent_path: z.string().optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      notify_on_ok: z.boolean().optional(),
    })
    .transform(d => ({
      id: d.id,
      displayName: d.display_name,
      queryId: d.query_id,
      state: d.state,
      secondsToRetrigger: d.seconds_to_retrigger,
      lifecycleState: d.lifecycle_state,
      triggerTime: d.trigger_time,
      customBody: d.custom_body,
      customSubject: d.custom_subject,
      condition: d.condition,
      ownerUserName: d.owner_user_name,
      parentPath: d.parent_path,
      createTime: d.create_time,
      updateTime: d.update_time,
      notifyOnOk: d.notify_on_ok,
    }));

export const marshalAlertSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    queryId: z.string().optional(),
    state: z.enum(AlertState).optional(),
    secondsToRetrigger: z.number().optional(),
    lifecycleState: z.enum(LifecycleState).optional(),
    triggerTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    customBody: z.string().optional(),
    customSubject: z.string().optional(),
    condition: z.lazy(() => marshalAlertConditionSchema).optional(),
    ownerUserName: z.string().optional(),
    parentPath: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    notifyOnOk: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    display_name: d.displayName,
    query_id: d.queryId,
    state: d.state,
    seconds_to_retrigger: d.secondsToRetrigger,
    lifecycle_state: d.lifecycleState,
    trigger_time: d.triggerTime,
    custom_body: d.customBody,
    custom_subject: d.customSubject,
    condition: d.condition,
    owner_user_name: d.ownerUserName,
    parent_path: d.parentPath,
    create_time: d.createTime,
    update_time: d.updateTime,
    notify_on_ok: d.notifyOnOk,
  }));

export const marshalAlertConditionSchema: z.ZodType = z
  .object({
    op: z.enum(AlertOperator).optional(),
    operand: z.lazy(() => marshalAlertOperandSchema).optional(),
    threshold: z.lazy(() => marshalAlertOperandSchema).optional(),
    emptyResultState: z.enum(AlertState).optional(),
  })
  .transform(d => ({
    op: d.op,
    operand: d.operand,
    threshold: d.threshold,
    empty_result_state: d.emptyResultState,
  }));

export const marshalAlertOperandSchema: z.ZodType = z
  .object({
    value: z.lazy(() => marshalAlertOperandValueSchema).optional(),
    column: z.lazy(() => marshalAlertOperandColumnSchema).optional(),
  })
  .transform(d => ({
    value: d.value,
    column: d.column,
  }));

export const marshalAlertOperandColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalAlertOperandValueSchema: z.ZodType = z
  .object({
    stringValue: z.string().optional(),
    doubleValue: z.number().optional(),
    boolValue: z.boolean().optional(),
  })
  .transform(d => ({
    string_value: d.stringValue,
    double_value: d.doubleValue,
    bool_value: d.boolValue,
  }));

export const marshalCreateAlertRequestSchema: z.ZodType = z
  .object({
    alert: z.lazy(() => marshalCreateAlertRequestAlertSchema).optional(),
    autoResolveDisplayName: z.boolean().optional(),
  })
  .transform(d => ({
    alert: d.alert,
    auto_resolve_display_name: d.autoResolveDisplayName,
  }));

export const marshalCreateAlertRequestAlertSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    queryId: z.string().optional(),
    state: z.enum(AlertState).optional(),
    secondsToRetrigger: z.number().optional(),
    lifecycleState: z.enum(LifecycleState).optional(),
    triggerTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    customBody: z.string().optional(),
    customSubject: z.string().optional(),
    condition: z.lazy(() => marshalAlertConditionSchema).optional(),
    ownerUserName: z.string().optional(),
    parentPath: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    notifyOnOk: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    display_name: d.displayName,
    query_id: d.queryId,
    state: d.state,
    seconds_to_retrigger: d.secondsToRetrigger,
    lifecycle_state: d.lifecycleState,
    trigger_time: d.triggerTime,
    custom_body: d.customBody,
    custom_subject: d.customSubject,
    condition: d.condition,
    owner_user_name: d.ownerUserName,
    parent_path: d.parentPath,
    create_time: d.createTime,
    update_time: d.updateTime,
    notify_on_ok: d.notifyOnOk,
  }));

export const marshalEmptySchema: z.ZodType = z.object({});

export const marshalListAlertsResponseSchema: z.ZodType = z
  .object({
    results: z
      .array(z.lazy(() => marshalListAlertsResponseAlertSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    results: d.results,
    next_page_token: d.nextPageToken,
  }));

export const marshalListAlertsResponseAlertSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    queryId: z.string().optional(),
    state: z.enum(AlertState).optional(),
    secondsToRetrigger: z.number().optional(),
    lifecycleState: z.enum(LifecycleState).optional(),
    triggerTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    customBody: z.string().optional(),
    customSubject: z.string().optional(),
    condition: z.lazy(() => marshalAlertConditionSchema).optional(),
    ownerUserName: z.string().optional(),
    parentPath: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    notifyOnOk: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    display_name: d.displayName,
    query_id: d.queryId,
    state: d.state,
    seconds_to_retrigger: d.secondsToRetrigger,
    lifecycle_state: d.lifecycleState,
    trigger_time: d.triggerTime,
    custom_body: d.customBody,
    custom_subject: d.customSubject,
    condition: d.condition,
    owner_user_name: d.ownerUserName,
    parent_path: d.parentPath,
    create_time: d.createTime,
    update_time: d.updateTime,
    notify_on_ok: d.notifyOnOk,
  }));

export const marshalUpdateAlertRequestSchema: z.ZodType = z
  .object({
    alert: z.lazy(() => marshalUpdateAlertRequestAlertSchema).optional(),
    updateMask: z.string().optional(),
    id: z.string().optional(),
    autoResolveDisplayName: z.boolean().optional(),
  })
  .transform(d => ({
    alert: d.alert,
    update_mask: d.updateMask,
    id: d.id,
    auto_resolve_display_name: d.autoResolveDisplayName,
  }));

export const marshalUpdateAlertRequestAlertSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    queryId: z.string().optional(),
    state: z.enum(AlertState).optional(),
    secondsToRetrigger: z.number().optional(),
    lifecycleState: z.enum(LifecycleState).optional(),
    triggerTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    customBody: z.string().optional(),
    customSubject: z.string().optional(),
    condition: z.lazy(() => marshalAlertConditionSchema).optional(),
    ownerUserName: z.string().optional(),
    parentPath: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    notifyOnOk: z.boolean().optional(),
  })
  .transform(d => ({
    id: d.id,
    display_name: d.displayName,
    query_id: d.queryId,
    state: d.state,
    seconds_to_retrigger: d.secondsToRetrigger,
    lifecycle_state: d.lifecycleState,
    trigger_time: d.triggerTime,
    custom_body: d.customBody,
    custom_subject: d.customSubject,
    condition: d.condition,
    owner_user_name: d.ownerUserName,
    parent_path: d.parentPath,
    create_time: d.createTime,
    update_time: d.updateTime,
    notify_on_ok: d.notifyOnOk,
  }));

const alertFieldMaskSchema: FieldMaskSchema = {
  condition: {wire: 'condition', children: () => alertConditionFieldMaskSchema},
  createTime: {wire: 'create_time'},
  customBody: {wire: 'custom_body'},
  customSubject: {wire: 'custom_subject'},
  displayName: {wire: 'display_name'},
  id: {wire: 'id'},
  lifecycleState: {wire: 'lifecycle_state'},
  notifyOnOk: {wire: 'notify_on_ok'},
  ownerUserName: {wire: 'owner_user_name'},
  parentPath: {wire: 'parent_path'},
  queryId: {wire: 'query_id'},
  secondsToRetrigger: {wire: 'seconds_to_retrigger'},
  state: {wire: 'state'},
  triggerTime: {wire: 'trigger_time'},
  updateTime: {wire: 'update_time'},
};

export function alertFieldMask(...paths: string[]): FieldMask<Alert> {
  return FieldMask.build<Alert>(paths, alertFieldMaskSchema);
}

const alertConditionFieldMaskSchema: FieldMaskSchema = {
  emptyResultState: {wire: 'empty_result_state'},
  op: {wire: 'op'},
  operand: {wire: 'operand', children: () => alertOperandFieldMaskSchema},
  threshold: {wire: 'threshold', children: () => alertOperandFieldMaskSchema},
};

export function alertConditionFieldMask(
  ...paths: string[]
): FieldMask<AlertCondition> {
  return FieldMask.build<AlertCondition>(paths, alertConditionFieldMaskSchema);
}

const alertOperandFieldMaskSchema: FieldMaskSchema = {
  column: {wire: 'column', children: () => alertOperandColumnFieldMaskSchema},
  value: {wire: 'value', children: () => alertOperandValueFieldMaskSchema},
};

export function alertOperandFieldMask(
  ...paths: string[]
): FieldMask<AlertOperand> {
  return FieldMask.build<AlertOperand>(paths, alertOperandFieldMaskSchema);
}

const alertOperandColumnFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

export function alertOperandColumnFieldMask(
  ...paths: string[]
): FieldMask<AlertOperandColumn> {
  return FieldMask.build<AlertOperandColumn>(
    paths,
    alertOperandColumnFieldMaskSchema
  );
}

const alertOperandValueFieldMaskSchema: FieldMaskSchema = {
  boolValue: {wire: 'bool_value'},
  doubleValue: {wire: 'double_value'},
  stringValue: {wire: 'string_value'},
};

export function alertOperandValueFieldMask(
  ...paths: string[]
): FieldMask<AlertOperandValue> {
  return FieldMask.build<AlertOperandValue>(
    paths,
    alertOperandValueFieldMaskSchema
  );
}

const createAlertRequestFieldMaskSchema: FieldMaskSchema = {
  alert: {
    wire: 'alert',
    children: () => createAlertRequestAlertFieldMaskSchema,
  },
  autoResolveDisplayName: {wire: 'auto_resolve_display_name'},
};

export function createAlertRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateAlertRequest> {
  return FieldMask.build<CreateAlertRequest>(
    paths,
    createAlertRequestFieldMaskSchema
  );
}

const createAlertRequestAlertFieldMaskSchema: FieldMaskSchema = {
  condition: {wire: 'condition', children: () => alertConditionFieldMaskSchema},
  createTime: {wire: 'create_time'},
  customBody: {wire: 'custom_body'},
  customSubject: {wire: 'custom_subject'},
  displayName: {wire: 'display_name'},
  id: {wire: 'id'},
  lifecycleState: {wire: 'lifecycle_state'},
  notifyOnOk: {wire: 'notify_on_ok'},
  ownerUserName: {wire: 'owner_user_name'},
  parentPath: {wire: 'parent_path'},
  queryId: {wire: 'query_id'},
  secondsToRetrigger: {wire: 'seconds_to_retrigger'},
  state: {wire: 'state'},
  triggerTime: {wire: 'trigger_time'},
  updateTime: {wire: 'update_time'},
};

export function createAlertRequestAlertFieldMask(
  ...paths: string[]
): FieldMask<CreateAlertRequestAlert> {
  return FieldMask.build<CreateAlertRequestAlert>(
    paths,
    createAlertRequestAlertFieldMaskSchema
  );
}

const emptyFieldMaskSchema: FieldMaskSchema = {};

export function emptyFieldMask(...paths: string[]): FieldMask<Empty> {
  return FieldMask.build<Empty>(paths, emptyFieldMaskSchema);
}

const getAlertRequestFieldMaskSchema: FieldMaskSchema = {
  id: {wire: 'id'},
};

export function getAlertRequestFieldMask(
  ...paths: string[]
): FieldMask<GetAlertRequest> {
  return FieldMask.build<GetAlertRequest>(
    paths,
    getAlertRequestFieldMaskSchema
  );
}

const listAlertsRequestFieldMaskSchema: FieldMaskSchema = {
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
};

export function listAlertsRequestFieldMask(
  ...paths: string[]
): FieldMask<ListAlertsRequest> {
  return FieldMask.build<ListAlertsRequest>(
    paths,
    listAlertsRequestFieldMaskSchema
  );
}

const listAlertsResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  results: {wire: 'results'},
};

export function listAlertsResponseFieldMask(
  ...paths: string[]
): FieldMask<ListAlertsResponse> {
  return FieldMask.build<ListAlertsResponse>(
    paths,
    listAlertsResponseFieldMaskSchema
  );
}

const listAlertsResponseAlertFieldMaskSchema: FieldMaskSchema = {
  condition: {wire: 'condition', children: () => alertConditionFieldMaskSchema},
  createTime: {wire: 'create_time'},
  customBody: {wire: 'custom_body'},
  customSubject: {wire: 'custom_subject'},
  displayName: {wire: 'display_name'},
  id: {wire: 'id'},
  lifecycleState: {wire: 'lifecycle_state'},
  notifyOnOk: {wire: 'notify_on_ok'},
  ownerUserName: {wire: 'owner_user_name'},
  parentPath: {wire: 'parent_path'},
  queryId: {wire: 'query_id'},
  secondsToRetrigger: {wire: 'seconds_to_retrigger'},
  state: {wire: 'state'},
  triggerTime: {wire: 'trigger_time'},
  updateTime: {wire: 'update_time'},
};

export function listAlertsResponseAlertFieldMask(
  ...paths: string[]
): FieldMask<ListAlertsResponseAlert> {
  return FieldMask.build<ListAlertsResponseAlert>(
    paths,
    listAlertsResponseAlertFieldMaskSchema
  );
}

const trashAlertRequestFieldMaskSchema: FieldMaskSchema = {
  id: {wire: 'id'},
};

export function trashAlertRequestFieldMask(
  ...paths: string[]
): FieldMask<TrashAlertRequest> {
  return FieldMask.build<TrashAlertRequest>(
    paths,
    trashAlertRequestFieldMaskSchema
  );
}

const updateAlertRequestFieldMaskSchema: FieldMaskSchema = {
  alert: {
    wire: 'alert',
    children: () => updateAlertRequestAlertFieldMaskSchema,
  },
  autoResolveDisplayName: {wire: 'auto_resolve_display_name'},
  id: {wire: 'id'},
  updateMask: {wire: 'update_mask'},
};

export function updateAlertRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateAlertRequest> {
  return FieldMask.build<UpdateAlertRequest>(
    paths,
    updateAlertRequestFieldMaskSchema
  );
}

const updateAlertRequestAlertFieldMaskSchema: FieldMaskSchema = {
  condition: {wire: 'condition', children: () => alertConditionFieldMaskSchema},
  createTime: {wire: 'create_time'},
  customBody: {wire: 'custom_body'},
  customSubject: {wire: 'custom_subject'},
  displayName: {wire: 'display_name'},
  id: {wire: 'id'},
  lifecycleState: {wire: 'lifecycle_state'},
  notifyOnOk: {wire: 'notify_on_ok'},
  ownerUserName: {wire: 'owner_user_name'},
  parentPath: {wire: 'parent_path'},
  queryId: {wire: 'query_id'},
  secondsToRetrigger: {wire: 'seconds_to_retrigger'},
  state: {wire: 'state'},
  triggerTime: {wire: 'trigger_time'},
  updateTime: {wire: 'update_time'},
};

export function updateAlertRequestAlertFieldMask(
  ...paths: string[]
): FieldMask<UpdateAlertRequestAlert> {
  return FieldMask.build<UpdateAlertRequestAlert>(
    paths,
    updateAlertRequestAlertFieldMaskSchema
  );
}
