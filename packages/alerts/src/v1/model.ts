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

/**
 * A legacy Databricks SQL alert. An alert runs a saved query, compares a column of the result against
 * a threshold, and notifies its subscribers when the condition is met. See
 * https://docs.databricks.com/aws/en/sql/user/alerts/legacy for details.
 */
export interface Alert {
  /** UUID identifying the alert. */
  id?: string | undefined;
  /** Display name of the alert, shown in list views and notifications. It must not be empty. */
  displayName?: string | undefined;
  /**
   * UUID of the saved query whose result the alert evaluates. The caller must have permission to
   * view the query.
   */
  queryId?: string | undefined;
  /**
   * Current state of the alert's trigger status: `TRIGGERED` if the condition was met on the last
   * evaluation, `OK` if it was not, and `UNKNOWN` if the alert has not yet been evaluated or ran into
   * an error during the last evaluation.
   */
  state?: AlertState | undefined;
  /**
   * Number of seconds the alert waits after a notification before it can notify again while its state
   * stays `TRIGGERED`. If 0 or not specified, the alert notifies once when its state changes to
   * `TRIGGERED` and does not notify again until its state has changed.
   */
  secondsToRetrigger?: number | undefined;
  /** Lifecycle state of the alert: `ACTIVE`, or `TRASHED` after it has been moved to the trash. */
  lifecycleState?: LifecycleState | undefined;
  /** Timestamp when the alert was last triggered, if the alert has been triggered before. */
  triggerTime?: Temporal.Instant | undefined;
  /**
   * Custom body of the alert notification. It can use the template variables and HTML described at
   * https://docs.databricks.com/aws/en/sql/user/alerts/legacy. If omitted, the default notification
   * body is used.
   */
  customBody?: string | undefined;
  /**
   * Custom subject of the alert notification, used as the email subject or the Slack message header.
   * It can use the template variables described at https://docs.databricks.com/aws/en/sql/user/alerts/legacy.
   * If omitted, the default subject is used.
   */
  customSubject?: string | undefined;
  /**
   * Condition that triggers the alert: a column of the query result, a comparison operator, and a
   * threshold value. The value in the first row of the column is evaluated; aggregations are not
   * supported through this API.
   */
  condition?: AlertCondition | undefined;
  /** The owner's username. This field is set to "Unavailable" if the user has been deleted. */
  ownerUserName?: string | undefined;
  /**
   * Workspace path of the folder containing the alert. Defaults to the creator's home folder when
   * omitted on create. It cannot be changed after creation.
   */
  parentPath?: string | undefined;
  /** The timestamp indicating when the alert was created. */
  createTime?: Temporal.Instant | undefined;
  /** The timestamp indicating when the alert was updated. */
  updateTime?: Temporal.Instant | undefined;
  /**
   * Whether to notify subscribers when the alert state changes from `TRIGGERED` back to `OK`.
   * Defaults to true.
   */
  notifyOnOk?: boolean | undefined;
}

export interface AlertCondition {
  /**
   * Comparison operator applied between the operand column value and the threshold. The alert is
   * triggered when the comparison is true. `IS_NULL` triggers when the column value is null; a
   * threshold must still be supplied but its value is ignored.
   */
  op?: AlertOperator | undefined;
  /**
   * Left-hand side of the comparison. Through this API it must be a `column` naming a column of the
   * query result; the value in the first row of that column is compared against the threshold.
   */
  operand?: AlertOperand | undefined;
  /**
   * Right-hand side of the comparison. Through this API it must be a fixed `value` whose type matches
   * the operand column.
   */
  threshold?: AlertOperand | undefined;
  /** State the alert takes when the query returns no rows. Defaults to `UNKNOWN` when not set. */
  emptyResultState?: AlertState | undefined;
}

export interface AlertOperand {
  /** Only one of the following fields may be set, depending on the type of operand/threshold. */
  operand?:
    | {
        $case: 'value';
        /** A fixed value. Used for the `threshold` of a condition. */
        value: AlertOperandValue;
      }
    | {
        $case: 'column';
        /** A column of the query result. Used for the `operand` of a condition. */
        column: AlertOperandColumn;
      }
    | undefined;
}

export interface AlertOperandColumn {
  /** Name of the column in the query result. */
  name?: string | undefined;
}

export interface AlertOperandValue {
  /** Only one of the following fields may be set, depending on the type of threshold value. */
  thresholdValue?:
    | {
        $case: 'stringValue';
        /** String threshold, for string or timestamp columns. */
        stringValue: string;
      }
    | {
        $case: 'doubleValue';
        /** Numeric threshold, for numeric columns. */
        doubleValue: number;
      }
    | {
        $case: 'boolValue';
        /** Boolean threshold, for boolean columns. */
        boolValue: boolean;
      }
    | undefined;
}

export interface CreateAlertRequest {
  /** The alert to create. A display name, a `query_id`, and a `condition` are required. */
  alert?: CreateAlertRequestAlert | undefined;
  /** If true, automatically resolve alert display name conflicts. Otherwise, fail the request if the alert's display name conflicts with an existing alert's display name. */
  autoResolveDisplayName?: boolean | undefined;
}

/**
 * A legacy Databricks SQL alert. An alert runs a saved query, compares a column of the result against
 * a threshold, and notifies its subscribers when the condition is met. See
 * https://docs.databricks.com/aws/en/sql/user/alerts/legacy for details.
 */
export interface CreateAlertRequestAlert {
  /** Display name of the alert, shown in list views and notifications. It must not be empty. */
  displayName?: string | undefined;
  /**
   * UUID of the saved query whose result the alert evaluates. The caller must have permission to
   * view the query.
   */
  queryId?: string | undefined;
  /**
   * Number of seconds the alert waits after a notification before it can notify again while its state
   * stays `TRIGGERED`. If 0 or not specified, the alert notifies once when its state changes to
   * `TRIGGERED` and does not notify again until its state has changed.
   */
  secondsToRetrigger?: number | undefined;
  /**
   * Custom body of the alert notification. It can use the template variables and HTML described at
   * https://docs.databricks.com/aws/en/sql/user/alerts/legacy. If omitted, the default notification
   * body is used.
   */
  customBody?: string | undefined;
  /**
   * Custom subject of the alert notification, used as the email subject or the Slack message header.
   * It can use the template variables described at https://docs.databricks.com/aws/en/sql/user/alerts/legacy.
   * If omitted, the default subject is used.
   */
  customSubject?: string | undefined;
  /**
   * Condition that triggers the alert: a column of the query result, a comparison operator, and a
   * threshold value. The value in the first row of the column is evaluated; aggregations are not
   * supported through this API.
   */
  condition?: AlertCondition | undefined;
  /**
   * Workspace path of the folder containing the alert. Defaults to the creator's home folder when
   * omitted on create. It cannot be changed after creation.
   */
  parentPath?: string | undefined;
  /**
   * Whether to notify subscribers when the alert state changes from `TRIGGERED` back to `OK`.
   * Defaults to true.
   */
  notifyOnOk?: boolean | undefined;
}

/**
 * Represents an empty message, similar to google.protobuf.Empty, which is not available in the firm
 * right now.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Empty {}

export interface GetAlertRequest {
  /** UUID of the alert to fetch. */
  id?: string | undefined;
}

export interface ListAlertsRequest {
  /** Token from the `next_page_token` of a previous response. Omit it to fetch the first page. */
  pageToken?: string | undefined;
  /** Maximum number of alerts to return per page. */
  pageSize?: number | undefined;
}

export interface ListAlertsResponse {
  /** Alerts on this page. */
  results?: ListAlertsResponseAlert[] | undefined;
  /** Token to pass as `page_token` to fetch the next page. Omitted when there are no more pages. */
  nextPageToken?: string | undefined;
}

/**
 * A legacy Databricks SQL alert. An alert runs a saved query, compares a column of the result against
 * a threshold, and notifies its subscribers when the condition is met. See
 * https://docs.databricks.com/aws/en/sql/user/alerts/legacy for details.
 */
export interface ListAlertsResponseAlert {
  /** UUID identifying the alert. */
  id?: string | undefined;
  /** Display name of the alert, shown in list views and notifications. It must not be empty. */
  displayName?: string | undefined;
  /**
   * UUID of the saved query whose result the alert evaluates. The caller must have permission to
   * view the query.
   */
  queryId?: string | undefined;
  /**
   * Current state of the alert's trigger status: `TRIGGERED` if the condition was met on the last
   * evaluation, `OK` if it was not, and `UNKNOWN` if the alert has not yet been evaluated or ran into
   * an error during the last evaluation.
   */
  state?: AlertState | undefined;
  /**
   * Number of seconds the alert waits after a notification before it can notify again while its state
   * stays `TRIGGERED`. If 0 or not specified, the alert notifies once when its state changes to
   * `TRIGGERED` and does not notify again until its state has changed.
   */
  secondsToRetrigger?: number | undefined;
  /** Lifecycle state of the alert: `ACTIVE`, or `TRASHED` after it has been moved to the trash. */
  lifecycleState?: LifecycleState | undefined;
  /** Timestamp when the alert was last triggered, if the alert has been triggered before. */
  triggerTime?: Temporal.Instant | undefined;
  /**
   * Custom body of the alert notification. It can use the template variables and HTML described at
   * https://docs.databricks.com/aws/en/sql/user/alerts/legacy. If omitted, the default notification
   * body is used.
   */
  customBody?: string | undefined;
  /**
   * Custom subject of the alert notification, used as the email subject or the Slack message header.
   * It can use the template variables described at https://docs.databricks.com/aws/en/sql/user/alerts/legacy.
   * If omitted, the default subject is used.
   */
  customSubject?: string | undefined;
  /**
   * Condition that triggers the alert: a column of the query result, a comparison operator, and a
   * threshold value. The value in the first row of the column is evaluated; aggregations are not
   * supported through this API.
   */
  condition?: AlertCondition | undefined;
  /** The owner's username. This field is set to "Unavailable" if the user has been deleted. */
  ownerUserName?: string | undefined;
  /** The timestamp indicating when the alert was created. */
  createTime?: Temporal.Instant | undefined;
  /** The timestamp indicating when the alert was updated. */
  updateTime?: Temporal.Instant | undefined;
  /**
   * Whether to notify subscribers when the alert state changes from `TRIGGERED` back to `OK`.
   * Defaults to true.
   */
  notifyOnOk?: boolean | undefined;
}

export interface TrashAlertRequest {
  /** UUID of the alert to move to the trash. */
  id?: string | undefined;
}

export interface UpdateAlertRequest {
  /** Alert fields to update. Only the fields named in `update_mask` are changed. */
  alert?: UpdateAlertRequestAlert | undefined;
  /**
   * Comma-separated list of the alert fields to update, such as `display_name` or `condition`.
   * Fields not listed keep their current values.
   */
  updateMask?: FieldMask<UpdateAlertRequestAlert> | undefined;
  /** UUID of the alert to update. */
  id?: string | undefined;
  /** If true, automatically resolve alert display name conflicts. Otherwise, fail the request if the alert's display name conflicts with an existing alert's display name. */
  autoResolveDisplayName?: boolean | undefined;
}

/**
 * A legacy Databricks SQL alert. An alert runs a saved query, compares a column of the result against
 * a threshold, and notifies its subscribers when the condition is met. See
 * https://docs.databricks.com/aws/en/sql/user/alerts/legacy for details.
 */
export interface UpdateAlertRequestAlert {
  /** Display name of the alert, shown in list views and notifications. It must not be empty. */
  displayName?: string | undefined;
  /**
   * UUID of the saved query whose result the alert evaluates. The caller must have permission to
   * view the query.
   */
  queryId?: string | undefined;
  /**
   * Number of seconds the alert waits after a notification before it can notify again while its state
   * stays `TRIGGERED`. If 0 or not specified, the alert notifies once when its state changes to
   * `TRIGGERED` and does not notify again until its state has changed.
   */
  secondsToRetrigger?: number | undefined;
  /**
   * Custom body of the alert notification. It can use the template variables and HTML described at
   * https://docs.databricks.com/aws/en/sql/user/alerts/legacy. If omitted, the default notification
   * body is used.
   */
  customBody?: string | undefined;
  /**
   * Custom subject of the alert notification, used as the email subject or the Slack message header.
   * It can use the template variables described at https://docs.databricks.com/aws/en/sql/user/alerts/legacy.
   * If omitted, the default subject is used.
   */
  customSubject?: string | undefined;
  /**
   * Condition that triggers the alert: a column of the query result, a comparison operator, and a
   * threshold value. The value in the first row of the column is evaluated; aggregations are not
   * supported through this API.
   */
  condition?: AlertCondition | undefined;
  /** The owner's username. This field is set to "Unavailable" if the user has been deleted. */
  ownerUserName?: string | undefined;
  /**
   * Whether to notify subscribers when the alert state changes from `TRIGGERED` back to `OK`.
   * Defaults to true.
   */
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
    condition: z
      .lazy(() => unmarshalAlertConditionSchema)
      .nullish()
      .transform(v => v ?? undefined),
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
    operand: z
      .lazy(() => unmarshalAlertOperandSchema)
      .nullish()
      .transform(v => v ?? undefined),
    threshold: z
      .lazy(() => unmarshalAlertOperandSchema)
      .nullish()
      .transform(v => v ?? undefined),
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
  .refine(d => [d.value, d.column].filter(v => v !== undefined).length <= 1, {
    message: 'AlertOperand.Operand: multiple oneof members set',
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
  .refine(
    d =>
      [d.string_value, d.double_value, d.bool_value].filter(
        v => v !== undefined
      ).length <= 1,
    {message: 'AlertOperandValue.ThresholdValue: multiple oneof members set'}
  )
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
      condition: z
        .lazy(() => unmarshalAlertConditionSchema)
        .nullish()
        .transform(v => v ?? undefined),
      owner_user_name: z.string().optional(),
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
      createTime: d.create_time,
      updateTime: d.update_time,
      notifyOnOk: d.notify_on_ok,
    }));

export const marshalAlertConditionSchema: z.ZodType = z
  .object({
    op: z.string().optional(),
    operand: z.lazy(() => marshalAlertOperandSchema).optional(),
    threshold: z.lazy(() => marshalAlertOperandSchema).optional(),
    emptyResultState: z.string().optional(),
  })
  .transform(d => ({
    op: d.op,
    operand: d.operand,
    threshold: d.threshold,
    empty_result_state: d.emptyResultState,
  }));

export const marshalAlertOperandSchema: z.ZodType = z
  .object({
    operand: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('value'),
          value: z.lazy(() => marshalAlertOperandValueSchema),
        }),
        z.object({
          $case: z.literal('column'),
          column: z.lazy(() => marshalAlertOperandColumnSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.operand?.$case === 'value' && {value: d.operand.value}),
    ...(d.operand?.$case === 'column' && {column: d.operand.column}),
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
    alert: z.lazy(() => marshalCreateAlertRequestAlertSchema).optional(),
    autoResolveDisplayName: z.boolean().optional(),
  })
  .transform(d => ({
    alert: d.alert,
    auto_resolve_display_name: d.autoResolveDisplayName,
  }));

export const marshalCreateAlertRequestAlertSchema: z.ZodType = z
  .object({
    displayName: z.string().optional(),
    queryId: z.string().optional(),
    secondsToRetrigger: z.number().optional(),
    customBody: z.string().optional(),
    customSubject: z.string().optional(),
    condition: z.lazy(() => marshalAlertConditionSchema).optional(),
    parentPath: z.string().optional(),
    notifyOnOk: z.boolean().optional(),
  })
  .transform(d => ({
    display_name: d.displayName,
    query_id: d.queryId,
    seconds_to_retrigger: d.secondsToRetrigger,
    custom_body: d.customBody,
    custom_subject: d.customSubject,
    condition: d.condition,
    parent_path: d.parentPath,
    notify_on_ok: d.notifyOnOk,
  }));

export const marshalUpdateAlertRequestSchema: z.ZodType = z
  .object({
    alert: z.lazy(() => marshalUpdateAlertRequestAlertSchema).optional(),
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

export const marshalUpdateAlertRequestAlertSchema: z.ZodType = z
  .object({
    displayName: z.string().optional(),
    queryId: z.string().optional(),
    secondsToRetrigger: z.number().optional(),
    customBody: z.string().optional(),
    customSubject: z.string().optional(),
    condition: z.lazy(() => marshalAlertConditionSchema).optional(),
    ownerUserName: z.string().optional(),
    notifyOnOk: z.boolean().optional(),
  })
  .transform(d => ({
    display_name: d.displayName,
    query_id: d.queryId,
    seconds_to_retrigger: d.secondsToRetrigger,
    custom_body: d.customBody,
    custom_subject: d.customSubject,
    condition: d.condition,
    owner_user_name: d.ownerUserName,
    notify_on_ok: d.notifyOnOk,
  }));

const alertConditionFieldMaskSchema: FieldMaskSchema = {
  emptyResultState: {wire: 'empty_result_state'},
  op: {wire: 'op'},
  operand: {wire: 'operand', children: () => alertOperandFieldMaskSchema},
  threshold: {wire: 'threshold', children: () => alertOperandFieldMaskSchema},
};

const alertOperandFieldMaskSchema: FieldMaskSchema = {
  column: {wire: 'column', children: () => alertOperandColumnFieldMaskSchema},
  value: {wire: 'value', children: () => alertOperandValueFieldMaskSchema},
};

const alertOperandColumnFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

const alertOperandValueFieldMaskSchema: FieldMaskSchema = {
  boolValue: {wire: 'bool_value'},
  doubleValue: {wire: 'double_value'},
  stringValue: {wire: 'string_value'},
};

const updateAlertRequestAlertFieldMaskSchema: FieldMaskSchema = {
  condition: {wire: 'condition', children: () => alertConditionFieldMaskSchema},
  customBody: {wire: 'custom_body'},
  customSubject: {wire: 'custom_subject'},
  displayName: {wire: 'display_name'},
  notifyOnOk: {wire: 'notify_on_ok'},
  ownerUserName: {wire: 'owner_user_name'},
  queryId: {wire: 'query_id'},
  secondsToRetrigger: {wire: 'seconds_to_retrigger'},
};

export function updateAlertRequestAlertFieldMask(
  ...paths: string[]
): FieldMask<UpdateAlertRequestAlert> {
  return FieldMask.build<UpdateAlertRequestAlert>(
    paths,
    updateAlertRequestAlertFieldMaskSchema
  );
}
