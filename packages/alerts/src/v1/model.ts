// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AlertOperator = {
  GREATER_THAN: 'GREATER_THAN',
  GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL',
  LESS_THAN: 'LESS_THAN',
  LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL',
  EQUAL: 'EQUAL',
  NOT_EQUAL: 'NOT_EQUAL',
  IS_NULL: 'IS_NULL',
} as const;
export type AlertOperator =
  | (typeof AlertOperator)[keyof typeof AlertOperator]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AlertState = {
  UNKNOWN: 'UNKNOWN',
  OK: 'OK',
  TRIGGERED: 'TRIGGERED',
} as const;
export type AlertState =
  | (typeof AlertState)[keyof typeof AlertState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const LifecycleState = {
  ACTIVE: 'ACTIVE',
  TRASHED: 'TRASHED',
} as const;
export type LifecycleState =
  | (typeof LifecycleState)[keyof typeof LifecycleState]
  | (string & {});

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
  /** Only one of the following fields may be set, depending on the type of operand/threshold. */
  operand?:
    | {$case: 'value'; value: AlertOperandValue}
    | {$case: 'column'; column: AlertOperandColumn}
    | undefined;
}

export interface AlertOperandColumn {
  name?: string | undefined;
}

export interface AlertOperandValue {
  /** Only one of the following fields may be set, depending on the type of threshold value. */
  thresholdValue?:
    | {$case: 'stringValue'; stringValue: string}
    | {$case: 'doubleValue'; doubleValue: number}
    | {$case: 'boolValue'; boolValue: boolean}
    | undefined;
}

export interface CreateAlertCondition {
  /** Operator used for comparison in alert evaluation. */
  op?: AlertOperator | undefined;
  /** Name of the column from the query result to use for comparison in alert evaluation. */
  operand?: CreateAlertOperand | undefined;
  /** Threshold value used for comparison in alert evaluation. */
  threshold?: CreateAlertOperand | undefined;
  /** Alert state if result is empty. */
  emptyResultState?: AlertState | undefined;
}

export interface CreateAlertOperand {
  /** Only one of the following fields may be set, depending on the type of operand/threshold. */
  operand?:
    | {$case: 'value'; value: CreateAlertOperandValue}
    | {$case: 'column'; column: CreateAlertOperandColumn}
    | undefined;
}

export interface CreateAlertOperandColumn {
  name?: string | undefined;
}

export interface CreateAlertOperandValue {
  /** Only one of the following fields may be set, depending on the type of threshold value. */
  thresholdValue?:
    | {$case: 'stringValue'; stringValue: string}
    | {$case: 'doubleValue'; doubleValue: number}
    | {$case: 'boolValue'; boolValue: boolean}
    | undefined;
}

export interface CreateAlertRequest {
  alert?: CreateCreateAlertRequestAlert | undefined;
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

export interface CreateCreateAlertRequestAlert {
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
  condition?: CreateAlertCondition | undefined;
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

export interface UpdateAlertCondition {
  /** Operator used for comparison in alert evaluation. */
  op?: AlertOperator | undefined;
  /** Name of the column from the query result to use for comparison in alert evaluation. */
  operand?: UpdateAlertOperand | undefined;
  /** Threshold value used for comparison in alert evaluation. */
  threshold?: UpdateAlertOperand | undefined;
  /** Alert state if result is empty. */
  emptyResultState?: AlertState | undefined;
}

export interface UpdateAlertOperand {
  /** Only one of the following fields may be set, depending on the type of operand/threshold. */
  operand?:
    | {$case: 'value'; value: UpdateAlertOperandValue}
    | {$case: 'column'; column: UpdateAlertOperandColumn}
    | undefined;
}

export interface UpdateAlertOperandColumn {
  name?: string | undefined;
}

export interface UpdateAlertOperandValue {
  /** Only one of the following fields may be set, depending on the type of threshold value. */
  thresholdValue?:
    | {$case: 'stringValue'; stringValue: string}
    | {$case: 'doubleValue'; doubleValue: number}
    | {$case: 'boolValue'; boolValue: boolean}
    | undefined;
}

export interface UpdateAlertRequest {
  alert?: UpdateUpdateAlertRequestAlert | undefined;
  updateMask?: FieldMask<UpdateUpdateAlertRequestAlert> | undefined;
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

export interface UpdateUpdateAlertRequestAlert {
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
  condition?: UpdateAlertCondition | undefined;
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
    state: z.string().optional(),
    seconds_to_retrigger: z.number().optional(),
    lifecycle_state: z.string().optional(),
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
    op: z.string().optional(),
    operand: z.lazy(() => unmarshalAlertOperandSchema).optional(),
    threshold: z.lazy(() => unmarshalAlertOperandSchema).optional(),
    empty_result_state: z.string().optional(),
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
    operand:
      d.value !== undefined
        ? {$case: 'value' as const, value: d.value}
        : d.column !== undefined
          ? {$case: 'column' as const, column: d.column}
          : undefined,
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
    thresholdValue:
      d.string_value !== undefined
        ? {$case: 'stringValue' as const, stringValue: d.string_value}
        : d.double_value !== undefined
          ? {$case: 'doubleValue' as const, doubleValue: d.double_value}
          : d.bool_value !== undefined
            ? {$case: 'boolValue' as const, boolValue: d.bool_value}
            : undefined,
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
      state: z.string().optional(),
      seconds_to_retrigger: z.number().optional(),
      lifecycle_state: z.string().optional(),
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

export const marshalCreateAlertConditionSchema: z.ZodType = z
  .object({
    op: z.string().optional(),
    operand: z.lazy(() => marshalCreateAlertOperandSchema).optional(),
    threshold: z.lazy(() => marshalCreateAlertOperandSchema).optional(),
    emptyResultState: z.string().optional(),
  })
  .transform(d => ({
    op: d.op,
    operand: d.operand,
    threshold: d.threshold,
    empty_result_state: d.emptyResultState,
  }));

export const marshalCreateAlertOperandSchema: z.ZodType = z
  .object({
    operand: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('value'),
          value: z.lazy(() => marshalCreateAlertOperandValueSchema),
        }),
        z.object({
          $case: z.literal('column'),
          column: z.lazy(() => marshalCreateAlertOperandColumnSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.operand?.$case === 'value' && {value: d.operand.value}),
    ...(d.operand?.$case === 'column' && {column: d.operand.column}),
  }));

export const marshalCreateAlertOperandColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalCreateAlertOperandValueSchema: z.ZodType = z
  .object({
    thresholdValue: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('stringValue'), stringValue: z.string()}),
        z.object({$case: z.literal('doubleValue'), doubleValue: z.number()}),
        z.object({$case: z.literal('boolValue'), boolValue: z.boolean()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.thresholdValue?.$case === 'stringValue' && {
      string_value: d.thresholdValue.stringValue,
    }),
    ...(d.thresholdValue?.$case === 'doubleValue' && {
      double_value: d.thresholdValue.doubleValue,
    }),
    ...(d.thresholdValue?.$case === 'boolValue' && {
      bool_value: d.thresholdValue.boolValue,
    }),
  }));

export const marshalCreateAlertRequestSchema: z.ZodType = z
  .object({
    alert: z.lazy(() => marshalCreateCreateAlertRequestAlertSchema).optional(),
    autoResolveDisplayName: z.boolean().optional(),
  })
  .transform(d => ({
    alert: d.alert,
    auto_resolve_display_name: d.autoResolveDisplayName,
  }));

export const marshalCreateCreateAlertRequestAlertSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    queryId: z.string().optional(),
    state: z.string().optional(),
    secondsToRetrigger: z.number().optional(),
    lifecycleState: z.string().optional(),
    triggerTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    customBody: z.string().optional(),
    customSubject: z.string().optional(),
    condition: z.lazy(() => marshalCreateAlertConditionSchema).optional(),
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

export const marshalUpdateAlertConditionSchema: z.ZodType = z
  .object({
    op: z.string().optional(),
    operand: z.lazy(() => marshalUpdateAlertOperandSchema).optional(),
    threshold: z.lazy(() => marshalUpdateAlertOperandSchema).optional(),
    emptyResultState: z.string().optional(),
  })
  .transform(d => ({
    op: d.op,
    operand: d.operand,
    threshold: d.threshold,
    empty_result_state: d.emptyResultState,
  }));

export const marshalUpdateAlertOperandSchema: z.ZodType = z
  .object({
    operand: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('value'),
          value: z.lazy(() => marshalUpdateAlertOperandValueSchema),
        }),
        z.object({
          $case: z.literal('column'),
          column: z.lazy(() => marshalUpdateAlertOperandColumnSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.operand?.$case === 'value' && {value: d.operand.value}),
    ...(d.operand?.$case === 'column' && {column: d.operand.column}),
  }));

export const marshalUpdateAlertOperandColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalUpdateAlertOperandValueSchema: z.ZodType = z
  .object({
    thresholdValue: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('stringValue'), stringValue: z.string()}),
        z.object({$case: z.literal('doubleValue'), doubleValue: z.number()}),
        z.object({$case: z.literal('boolValue'), boolValue: z.boolean()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.thresholdValue?.$case === 'stringValue' && {
      string_value: d.thresholdValue.stringValue,
    }),
    ...(d.thresholdValue?.$case === 'doubleValue' && {
      double_value: d.thresholdValue.doubleValue,
    }),
    ...(d.thresholdValue?.$case === 'boolValue' && {
      bool_value: d.thresholdValue.boolValue,
    }),
  }));

export const marshalUpdateAlertRequestSchema: z.ZodType = z
  .object({
    alert: z.lazy(() => marshalUpdateUpdateAlertRequestAlertSchema).optional(),
    updateMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
    id: z.string().optional(),
    autoResolveDisplayName: z.boolean().optional(),
  })
  .transform(d => ({
    alert: d.alert,
    update_mask: d.updateMask,
    id: d.id,
    auto_resolve_display_name: d.autoResolveDisplayName,
  }));

export const marshalUpdateUpdateAlertRequestAlertSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    queryId: z.string().optional(),
    state: z.string().optional(),
    secondsToRetrigger: z.number().optional(),
    lifecycleState: z.string().optional(),
    triggerTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    customBody: z.string().optional(),
    customSubject: z.string().optional(),
    condition: z.lazy(() => marshalUpdateAlertConditionSchema).optional(),
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

const updateAlertConditionFieldMaskSchema: FieldMaskSchema = {
  emptyResultState: {wire: 'empty_result_state'},
  op: {wire: 'op'},
  operand: {wire: 'operand', children: () => updateAlertOperandFieldMaskSchema},
  threshold: {
    wire: 'threshold',
    children: () => updateAlertOperandFieldMaskSchema,
  },
};

const updateAlertOperandFieldMaskSchema: FieldMaskSchema = {
  column: {
    wire: 'column',
    children: () => updateAlertOperandColumnFieldMaskSchema,
  },
  value: {
    wire: 'value',
    children: () => updateAlertOperandValueFieldMaskSchema,
  },
};

const updateAlertOperandColumnFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

const updateAlertOperandValueFieldMaskSchema: FieldMaskSchema = {
  boolValue: {wire: 'bool_value'},
  doubleValue: {wire: 'double_value'},
  stringValue: {wire: 'string_value'},
};

const updateUpdateAlertRequestAlertFieldMaskSchema: FieldMaskSchema = {
  condition: {
    wire: 'condition',
    children: () => updateAlertConditionFieldMaskSchema,
  },
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

export function updateUpdateAlertRequestAlertFieldMask(
  ...paths: string[]
): FieldMask<UpdateUpdateAlertRequestAlert> {
  return FieldMask.build<UpdateUpdateAlertRequestAlert>(
    paths,
    updateUpdateAlertRequestAlertFieldMaskSchema
  );
}
