// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Aggregation = {
  SUM: 'SUM',
  COUNT: 'COUNT',
  COUNT_DISTINCT: 'COUNT_DISTINCT',
  AVG: 'AVG',
  MEDIAN: 'MEDIAN',
  MIN: 'MIN',
  MAX: 'MAX',
  STDDEV: 'STDDEV',
} as const;
export type Aggregation =
  | (typeof Aggregation)[keyof typeof Aggregation]
  | (string & {});

/**
 * UNSPECIFIED - default unspecify value for proto enum, do not use it in the code
 * UNKNOWN - alert not yet evaluated
 * TRIGGERED - alert is triggered
 * OK - alert is not triggered
 * ERROR - alert evaluation failed
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AlertEvaluationState = {
  /** Deprecated. Please avoid using `UNKNOWN` as empty_result_state. */
  UNKNOWN: 'UNKNOWN',
  TRIGGERED: 'TRIGGERED',
  OK: 'OK',
  ERROR: 'ERROR',
} as const;
export type AlertEvaluationState =
  | (typeof AlertEvaluationState)[keyof typeof AlertEvaluationState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AlertLifecycleState = {
  ACTIVE: 'ACTIVE',
  DELETED: 'DELETED',
} as const;
export type AlertLifecycleState =
  | (typeof AlertLifecycleState)[keyof typeof AlertLifecycleState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ComparisonOperator = {
  LESS_THAN: 'LESS_THAN',
  GREATER_THAN: 'GREATER_THAN',
  EQUAL: 'EQUAL',
  NOT_EQUAL: 'NOT_EQUAL',
  GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL',
  IS_NULL: 'IS_NULL',
  IS_NOT_NULL: 'IS_NOT_NULL',
} as const;
export type ComparisonOperator =
  | (typeof ComparisonOperator)[keyof typeof ComparisonOperator]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SchedulePauseStatus = {
  UNPAUSED: 'UNPAUSED',
  PAUSED: 'PAUSED',
} as const;
export type SchedulePauseStatus =
  | (typeof SchedulePauseStatus)[keyof typeof SchedulePauseStatus]
  | (string & {});

export interface Alert {
  /** UUID identifying the alert. */
  id?: string | undefined;
  /** The display name of the alert. */
  displayName?: string | undefined;
  /** The owner's username. This field is set to "Unavailable" if the user has been deleted. */
  ownerUserName?: string | undefined;
  /** The timestamp indicating when the alert was created. */
  createTime?: Temporal.Instant | undefined;
  /** The timestamp indicating when the alert was updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The workspace path of the folder containing the alert. Can only be set on create, and cannot be updated. */
  parentPath?: string | undefined;
  /** Text of the query to be run. */
  queryText?: string | undefined;
  /** ID of the SQL warehouse attached to the alert. */
  warehouseId?: string | undefined;
  /**
   * The run as username or application ID of service principal.
   * On Create and Update, this field can be set to application ID of an active service principal. Setting this field requires the servicePrincipal/user role.
   * Deprecated: Use `run_as` field instead. This field will be removed in a future release.
   */
  runAsUserName?: string | undefined;
  evaluation?: AlertEvaluation | undefined;
  schedule?: CronSchedule | undefined;
  /** Indicates whether the query is trashed. */
  lifecycleState?: AlertLifecycleState | undefined;
  /** Custom summary for the alert. support mustache template. */
  customSummary?: string | undefined;
  /** Custom description for the alert. support mustache template. */
  customDescription?: string | undefined;
  /**
   * Specifies the identity that will be used to run the alert.
   * This field allows you to configure alerts to run as a specific user or service principal.
   * - For user identity: Set `user_name` to the email of an active workspace user. Users can only set this to their own email.
   * - For service principal: Set `service_principal_name` to the application ID. Requires the `servicePrincipal/user` role.
   * If not specified, the alert will run as the request user.
   */
  runAs?: AlertRunAs | undefined;
  /**
   * The actual identity that will be used to execute the alert.
   * This is an output-only field that shows the resolved run-as identity after applying
   * permissions and defaults.
   */
  effectiveRunAs?: AlertRunAs | undefined;
}

export interface AlertEvaluation {
  /** Source column from result to use to evaluate alert */
  source?: AlertOperandColumn | undefined;
  /** Operator used for comparison in alert evaluation. */
  comparisonOperator?: ComparisonOperator | undefined;
  /** Threshold to user for alert evaluation, can be a column or a value. */
  threshold?: AlertOperand | undefined;
  /** User or Notification Destination to notify when alert is triggered. */
  notification?: AlertNotification | undefined;
  /** Latest state of alert evaluation. */
  state?: AlertEvaluationState | undefined;
  /** Timestamp of the last evaluation. */
  lastEvaluatedAt?: Temporal.Instant | undefined;
  /** Alert state if result is empty. Please avoid setting this field to be `UNKNOWN` because `UNKNOWN` state is planned to be deprecated. */
  emptyResultState?: AlertEvaluationState | undefined;
}

export interface AlertNotification {
  subscriptions?: AlertSubscription[] | undefined;
  /**
   * Number of seconds an alert waits after being triggered before it is allowed to send another notification.
   * If set to 0 or omitted, the alert will not send any further notifications after the first trigger
   * Setting this value to 1 allows the alert to send a notification on every evaluation where the condition is met, effectively making it always retrigger for notification purposes.
   */
  retriggerSeconds?: number | undefined;
  /** Whether to notify alert subscribers when alert returns back to normal. */
  notifyOnOk?: boolean | undefined;
}

export interface AlertOperand {
  /** Only one of the following fields may be set, depending on the type of operand/threshold. */
  operand?:
    | {$case: 'column'; column: AlertOperandColumn}
    | {$case: 'value'; value: AlertOperandValue}
    | undefined;
}

export interface AlertOperandColumn {
  name?: string | undefined;
  display?: string | undefined;
  /** If not set, the behavior is equivalent to using `First row` in the UI. */
  aggregation?: Aggregation | undefined;
}

export interface AlertOperandValue {
  /** Only one of the following fields may be set, depending on the type of threshold value. */
  value?:
    | {$case: 'stringValue'; stringValue: string}
    | {$case: 'doubleValue'; doubleValue: number}
    | {$case: 'boolValue'; boolValue: boolean}
    | undefined;
}

export interface AlertRunAs {
  identity?:
    | {
        $case: 'userName';
        /** The email of an active workspace user. Can only set this field to their own email. */
        userName: string;
      }
    | {
        $case: 'servicePrincipalName';
        /** Application ID of an active service principal. Setting this field requires the `servicePrincipal/user` role. */
        servicePrincipalName: string;
      }
    | undefined;
}

export interface AlertSubscription {
  subscriptionType?:
    | {$case: 'userEmail'; userEmail: string}
    | {$case: 'destinationId'; destinationId: string}
    | undefined;
}

export interface CreateAlertRequest {
  alert?: Alert | undefined;
}

export interface CronSchedule {
  /**
   * A cron expression using quartz syntax that specifies the schedule for this pipeline.
   * Should use the quartz format described here: http://www.quartz-scheduler.org/documentation/quartz-2.1.7/tutorials/tutorial-lesson-06.html
   */
  quartzCronSchedule?: string | undefined;
  /**
   * A Java timezone id. The schedule will be resolved using this timezone.
   * This will be combined with the quartz_cron_schedule to determine the schedule.
   * See https://docs.databricks.com/sql/language-manual/sql-ref-syntax-aux-conf-mgmt-set-timezone.html for details.
   */
  timezoneId?: string | undefined;
  /** Indicate whether this schedule is paused or not. */
  pauseStatus?: SchedulePauseStatus | undefined;
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
  alerts?: Alert[] | undefined;
  nextPageToken?: string | undefined;
}

export interface TrashAlertRequest {
  id?: string | undefined;
  /** Whether to permanently delete the alert. If not set, the alert will only be soft deleted. */
  purge?: boolean | undefined;
}

export interface UpdateAlertRequest {
  alert?: Alert | undefined;
  updateMask?: FieldMask<Alert> | undefined;
}

export const unmarshalAlertSchema: z.ZodType<Alert> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    owner_user_name: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    parent_path: z.string().optional(),
    query_text: z.string().optional(),
    warehouse_id: z.string().optional(),
    run_as_user_name: z.string().optional(),
    evaluation: z.lazy(() => unmarshalAlertEvaluationSchema).optional(),
    schedule: z.lazy(() => unmarshalCronScheduleSchema).optional(),
    lifecycle_state: z.string().optional(),
    custom_summary: z.string().optional(),
    custom_description: z.string().optional(),
    run_as: z.lazy(() => unmarshalAlertRunAsSchema).optional(),
    effective_run_as: z.lazy(() => unmarshalAlertRunAsSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    displayName: d.display_name,
    ownerUserName: d.owner_user_name,
    createTime: d.create_time,
    updateTime: d.update_time,
    parentPath: d.parent_path,
    queryText: d.query_text,
    warehouseId: d.warehouse_id,
    runAsUserName: d.run_as_user_name,
    evaluation: d.evaluation,
    schedule: d.schedule,
    lifecycleState: d.lifecycle_state,
    customSummary: d.custom_summary,
    customDescription: d.custom_description,
    runAs: d.run_as,
    effectiveRunAs: d.effective_run_as,
  }));

export const unmarshalAlertEvaluationSchema: z.ZodType<AlertEvaluation> = z
  .object({
    source: z.lazy(() => unmarshalAlertOperandColumnSchema).optional(),
    comparison_operator: z.string().optional(),
    threshold: z.lazy(() => unmarshalAlertOperandSchema).optional(),
    notification: z.lazy(() => unmarshalAlertNotificationSchema).optional(),
    state: z.string().optional(),
    last_evaluated_at: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    empty_result_state: z.string().optional(),
  })
  .transform(d => ({
    source: d.source,
    comparisonOperator: d.comparison_operator,
    threshold: d.threshold,
    notification: d.notification,
    state: d.state,
    lastEvaluatedAt: d.last_evaluated_at,
    emptyResultState: d.empty_result_state,
  }));

export const unmarshalAlertNotificationSchema: z.ZodType<AlertNotification> = z
  .object({
    subscriptions: z
      .array(z.lazy(() => unmarshalAlertSubscriptionSchema))
      .optional(),
    retrigger_seconds: z.number().optional(),
    notify_on_ok: z.boolean().optional(),
  })
  .transform(d => ({
    subscriptions: d.subscriptions,
    retriggerSeconds: d.retrigger_seconds,
    notifyOnOk: d.notify_on_ok,
  }));

export const unmarshalAlertOperandSchema: z.ZodType<AlertOperand> = z
  .object({
    column: z.lazy(() => unmarshalAlertOperandColumnSchema).optional(),
    value: z.lazy(() => unmarshalAlertOperandValueSchema).optional(),
  })
  .transform(d => ({
    operand:
      d.column !== undefined
        ? {$case: 'column' as const, column: d.column}
        : d.value !== undefined
          ? {$case: 'value' as const, value: d.value}
          : undefined,
  }));

export const unmarshalAlertOperandColumnSchema: z.ZodType<AlertOperandColumn> =
  z
    .object({
      name: z.string().optional(),
      display: z.string().optional(),
      aggregation: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      display: d.display,
      aggregation: d.aggregation,
    }));

export const unmarshalAlertOperandValueSchema: z.ZodType<AlertOperandValue> = z
  .object({
    string_value: z.string().optional(),
    double_value: z.number().optional(),
    bool_value: z.boolean().optional(),
  })
  .transform(d => ({
    value:
      d.string_value !== undefined
        ? {$case: 'stringValue' as const, stringValue: d.string_value}
        : d.double_value !== undefined
          ? {$case: 'doubleValue' as const, doubleValue: d.double_value}
          : d.bool_value !== undefined
            ? {$case: 'boolValue' as const, boolValue: d.bool_value}
            : undefined,
  }));

export const unmarshalAlertRunAsSchema: z.ZodType<AlertRunAs> = z
  .object({
    user_name: z.string().optional(),
    service_principal_name: z.string().optional(),
  })
  .transform(d => ({
    identity:
      d.user_name !== undefined
        ? {$case: 'userName' as const, userName: d.user_name}
        : d.service_principal_name !== undefined
          ? {
              $case: 'servicePrincipalName' as const,
              servicePrincipalName: d.service_principal_name,
            }
          : undefined,
  }));

export const unmarshalAlertSubscriptionSchema: z.ZodType<AlertSubscription> = z
  .object({
    user_email: z.string().optional(),
    destination_id: z.string().optional(),
  })
  .transform(d => ({
    subscriptionType:
      d.user_email !== undefined
        ? {$case: 'userEmail' as const, userEmail: d.user_email}
        : d.destination_id !== undefined
          ? {$case: 'destinationId' as const, destinationId: d.destination_id}
          : undefined,
  }));

export const unmarshalCronScheduleSchema: z.ZodType<CronSchedule> = z
  .object({
    quartz_cron_schedule: z.string().optional(),
    timezone_id: z.string().optional(),
    pause_status: z.string().optional(),
  })
  .transform(d => ({
    quartzCronSchedule: d.quartz_cron_schedule,
    timezoneId: d.timezone_id,
    pauseStatus: d.pause_status,
  }));

export const unmarshalEmptySchema: z.ZodType<Empty> = z.object({});

export const unmarshalListAlertsResponseSchema: z.ZodType<ListAlertsResponse> =
  z
    .object({
      alerts: z.array(z.lazy(() => unmarshalAlertSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      alerts: d.alerts,
      nextPageToken: d.next_page_token,
    }));

export const marshalAlertSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    ownerUserName: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    parentPath: z.string().optional(),
    queryText: z.string().optional(),
    warehouseId: z.string().optional(),
    runAsUserName: z.string().optional(),
    evaluation: z.lazy(() => marshalAlertEvaluationSchema).optional(),
    schedule: z.lazy(() => marshalCronScheduleSchema).optional(),
    lifecycleState: z.string().optional(),
    customSummary: z.string().optional(),
    customDescription: z.string().optional(),
    runAs: z.lazy(() => marshalAlertRunAsSchema).optional(),
    effectiveRunAs: z.lazy(() => marshalAlertRunAsSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    display_name: d.displayName,
    owner_user_name: d.ownerUserName,
    create_time: d.createTime,
    update_time: d.updateTime,
    parent_path: d.parentPath,
    query_text: d.queryText,
    warehouse_id: d.warehouseId,
    run_as_user_name: d.runAsUserName,
    evaluation: d.evaluation,
    schedule: d.schedule,
    lifecycle_state: d.lifecycleState,
    custom_summary: d.customSummary,
    custom_description: d.customDescription,
    run_as: d.runAs,
    effective_run_as: d.effectiveRunAs,
  }));

export const marshalAlertEvaluationSchema: z.ZodType = z
  .object({
    source: z.lazy(() => marshalAlertOperandColumnSchema).optional(),
    comparisonOperator: z.string().optional(),
    threshold: z.lazy(() => marshalAlertOperandSchema).optional(),
    notification: z.lazy(() => marshalAlertNotificationSchema).optional(),
    state: z.string().optional(),
    lastEvaluatedAt: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    emptyResultState: z.string().optional(),
  })
  .transform(d => ({
    source: d.source,
    comparison_operator: d.comparisonOperator,
    threshold: d.threshold,
    notification: d.notification,
    state: d.state,
    last_evaluated_at: d.lastEvaluatedAt,
    empty_result_state: d.emptyResultState,
  }));

export const marshalAlertNotificationSchema: z.ZodType = z
  .object({
    subscriptions: z
      .array(z.lazy(() => marshalAlertSubscriptionSchema))
      .optional(),
    retriggerSeconds: z.number().optional(),
    notifyOnOk: z.boolean().optional(),
  })
  .transform(d => ({
    subscriptions: d.subscriptions,
    retrigger_seconds: d.retriggerSeconds,
    notify_on_ok: d.notifyOnOk,
  }));

export const marshalAlertOperandSchema: z.ZodType = z
  .object({
    operand: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('column'),
          column: z.lazy(() => marshalAlertOperandColumnSchema),
        }),
        z.object({
          $case: z.literal('value'),
          value: z.lazy(() => marshalAlertOperandValueSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.operand?.$case === 'column' && {column: d.operand.column}),
    ...(d.operand?.$case === 'value' && {value: d.operand.value}),
  }));

export const marshalAlertOperandColumnSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    display: z.string().optional(),
    aggregation: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    display: d.display,
    aggregation: d.aggregation,
  }));

export const marshalAlertOperandValueSchema: z.ZodType = z
  .object({
    value: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('stringValue'), stringValue: z.string()}),
        z.object({$case: z.literal('doubleValue'), doubleValue: z.number()}),
        z.object({$case: z.literal('boolValue'), boolValue: z.boolean()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.value?.$case === 'stringValue' && {
      string_value: d.value.stringValue,
    }),
    ...(d.value?.$case === 'doubleValue' && {
      double_value: d.value.doubleValue,
    }),
    ...(d.value?.$case === 'boolValue' && {bool_value: d.value.boolValue}),
  }));

export const marshalAlertRunAsSchema: z.ZodType = z
  .object({
    identity: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userName'), userName: z.string()}),
        z.object({
          $case: z.literal('servicePrincipalName'),
          servicePrincipalName: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.identity?.$case === 'userName' && {user_name: d.identity.userName}),
    ...(d.identity?.$case === 'servicePrincipalName' && {
      service_principal_name: d.identity.servicePrincipalName,
    }),
  }));

export const marshalAlertSubscriptionSchema: z.ZodType = z
  .object({
    subscriptionType: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('userEmail'), userEmail: z.string()}),
        z.object({
          $case: z.literal('destinationId'),
          destinationId: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.subscriptionType?.$case === 'userEmail' && {
      user_email: d.subscriptionType.userEmail,
    }),
    ...(d.subscriptionType?.$case === 'destinationId' && {
      destination_id: d.subscriptionType.destinationId,
    }),
  }));

export const marshalCronScheduleSchema: z.ZodType = z
  .object({
    quartzCronSchedule: z.string().optional(),
    timezoneId: z.string().optional(),
    pauseStatus: z.string().optional(),
  })
  .transform(d => ({
    quartz_cron_schedule: d.quartzCronSchedule,
    timezone_id: d.timezoneId,
    pause_status: d.pauseStatus,
  }));

const alertFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  customDescription: {wire: 'custom_description'},
  customSummary: {wire: 'custom_summary'},
  displayName: {wire: 'display_name'},
  effectiveRunAs: {
    wire: 'effective_run_as',
    children: () => alertRunAsFieldMaskSchema,
  },
  evaluation: {
    wire: 'evaluation',
    children: () => alertEvaluationFieldMaskSchema,
  },
  id: {wire: 'id'},
  lifecycleState: {wire: 'lifecycle_state'},
  ownerUserName: {wire: 'owner_user_name'},
  parentPath: {wire: 'parent_path'},
  queryText: {wire: 'query_text'},
  runAs: {wire: 'run_as', children: () => alertRunAsFieldMaskSchema},
  runAsUserName: {wire: 'run_as_user_name'},
  schedule: {wire: 'schedule', children: () => cronScheduleFieldMaskSchema},
  updateTime: {wire: 'update_time'},
  warehouseId: {wire: 'warehouse_id'},
};

export function alertFieldMask(...paths: string[]): FieldMask<Alert> {
  return FieldMask.build<Alert>(paths, alertFieldMaskSchema);
}

const alertEvaluationFieldMaskSchema: FieldMaskSchema = {
  comparisonOperator: {wire: 'comparison_operator'},
  emptyResultState: {wire: 'empty_result_state'},
  lastEvaluatedAt: {wire: 'last_evaluated_at'},
  notification: {
    wire: 'notification',
    children: () => alertNotificationFieldMaskSchema,
  },
  source: {wire: 'source', children: () => alertOperandColumnFieldMaskSchema},
  state: {wire: 'state'},
  threshold: {wire: 'threshold', children: () => alertOperandFieldMaskSchema},
};

const alertNotificationFieldMaskSchema: FieldMaskSchema = {
  notifyOnOk: {wire: 'notify_on_ok'},
  retriggerSeconds: {wire: 'retrigger_seconds'},
  subscriptions: {wire: 'subscriptions'},
};

const alertOperandFieldMaskSchema: FieldMaskSchema = {
  column: {wire: 'column', children: () => alertOperandColumnFieldMaskSchema},
  value: {wire: 'value', children: () => alertOperandValueFieldMaskSchema},
};

const alertOperandColumnFieldMaskSchema: FieldMaskSchema = {
  aggregation: {wire: 'aggregation'},
  display: {wire: 'display'},
  name: {wire: 'name'},
};

const alertOperandValueFieldMaskSchema: FieldMaskSchema = {
  boolValue: {wire: 'bool_value'},
  doubleValue: {wire: 'double_value'},
  stringValue: {wire: 'string_value'},
};

const alertRunAsFieldMaskSchema: FieldMaskSchema = {
  servicePrincipalName: {wire: 'service_principal_name'},
  userName: {wire: 'user_name'},
};

const cronScheduleFieldMaskSchema: FieldMaskSchema = {
  pauseStatus: {wire: 'pause_status'},
  quartzCronSchedule: {wire: 'quartz_cron_schedule'},
  timezoneId: {wire: 'timezone_id'},
};
