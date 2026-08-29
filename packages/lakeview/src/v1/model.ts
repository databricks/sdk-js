// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DashboardView = {
  /** Includes summary metadata from the dashboard. */
  DASHBOARD_VIEW_BASIC: 'DASHBOARD_VIEW_BASIC',
} as const;
export type DashboardView =
  | (typeof DashboardView)[keyof typeof DashboardView]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const LifecycleState = {
  /** The dashboard is in an active state (not-trashed). */
  ACTIVE: 'ACTIVE',
  /** The dashboard is in a trashed state. */
  TRASHED: 'TRASHED',
} as const;
export type LifecycleState =
  | (typeof LifecycleState)[keyof typeof LifecycleState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SchedulePauseStatus = {
  UNPAUSED: 'UNPAUSED',
  PAUSED: 'PAUSED',
} as const;
export type SchedulePauseStatus =
  | (typeof SchedulePauseStatus)[keyof typeof SchedulePauseStatus]
  | (string & {});

export interface AuthorizationDetails {
  /**
   * The type of authorization downscoping policy.
   * Ex: `workspace_rule_set` defines access rules for a specific workspace resource
   */
  type?: string | undefined;
  /**
   * The resource name to which the authorization rule applies.
   * This field is specific to `workspace_rule_set` constraint.
   * Format: `workspaces/{workspace_id}/dashboards/{dashboard_id}`
   */
  resourceName?: string | undefined;
  /** The acl path of the tree store resource resource. */
  resourceLegacyAclPath?: string | undefined;
  /**
   * Represents downscoped permission rules with specific access rights.
   * This field is specific to `workspace_rule_set` constraint.
   */
  grantRules?: AuthorizationDetails_GrantRule[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AuthorizationDetails_GrantRule {
  /**
   * Permission sets for dashboard are defined in
   * iam-common/rbac-common/permission-sets/definitions/TreeStoreBasePermissionSets
   * Ex: `permissionSets/dashboard.runner`
   */
  permissionSet?: string | undefined;
}

export interface CreateDashboardRequest {
  dashboard: Dashboard;
  /**
   * Sets the default catalog for all datasets in this dashboard.
   * Does not impact table references that use fully qualified catalog names (ex: samples.nyctaxi.trips).
   * Leave blank to keep each dataset’s existing configuration.
   */
  datasetCatalog?: string | undefined;
  /**
   * Sets the default schema for all datasets in this dashboard.
   * Does not impact table references that use fully qualified schema names (ex: nyctaxi.trips).
   * Leave blank to keep each dataset’s existing configuration.
   */
  datasetSchema?: string | undefined;
}

export interface CreateScheduleRequest {
  /** The schedule to create. A dashboard is limited to 10 schedules. */
  schedule: Schedule;
}

export interface CreateSubscriptionRequest {
  /** The subscription to create. A schedule is limited to 100 subscriptions. */
  subscription: Subscription;
}

export interface CronSchedule {
  /**
   * A cron expression using quartz syntax. EX: `0 0 8 * * ?` represents everyday at 8am.
   * See [Cron Trigger](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html) for details.
   */
  quartzCronExpression: string;
  /**
   * A Java timezone id. The schedule will be resolved with respect to this timezone.
   * See [Java TimeZone](https://docs.oracle.com/javase/7/docs/api/java/util/TimeZone.html) for details.
   */
  timezoneId: string;
}

export interface Dashboard {
  /** UUID identifying the dashboard. */
  dashboardId?: string | undefined;
  /** The display name of the dashboard. */
  displayName?: string | undefined;
  /**
   * The workspace path of the dashboard asset, including the file name.
   * Exported dashboards always have the file extension `.lvdash.json`.
   * This field is excluded in List Dashboards responses.
   */
  path?: string | undefined;
  /** The timestamp of when the dashboard was created. */
  createTime?: Temporal.Instant | undefined;
  /**
   * The timestamp of when the dashboard was last updated by the user.
   * This field is excluded in List Dashboards responses.
   */
  updateTime?: Temporal.Instant | undefined;
  /** The warehouse ID used to run the dashboard. */
  warehouseId?: string | undefined;
  /**
   * The etag for the dashboard. Can be optionally provided on updates to ensure that the dashboard
   * has not been modified since the last read.
   * This field is excluded in List Dashboards responses.
   */
  etag?: string | undefined;
  /**
   * The contents of the dashboard in serialized string form.
   * This field is excluded in List Dashboards responses.
   * Use the [get dashboard API](https://docs.databricks.com/api/workspace/lakeview/get)
   * to retrieve an example response, which includes the `serialized_dashboard` field.
   * This field provides the structure of the JSON string that represents the dashboard's
   * layout and components.
   */
  serializedDashboard?: string | undefined;
  /** The state of the dashboard resource. Used for tracking trashed status. */
  lifecycleState?: LifecycleState | undefined;
  /**
   * The workspace path of the folder containing the dashboard. Includes leading slash and no
   * trailing slash.
   * This field is excluded in List Dashboards responses.
   */
  parentPath?: string | undefined;
}

export interface DeleteScheduleRequest {
  /** UUID identifying the schedule. */
  scheduleId: string;
  /** UUID identifying the dashboard to which the schedule belongs. */
  dashboardId: string;
  /**
   * The etag for the schedule. Optionally, it can be provided to verify that the schedule has not
   * been modified from its last retrieval.
   */
  etag?: string | undefined;
}

export interface DeleteSubscriptionRequest {
  /** UUID identifying the subscription. */
  subscriptionId: string;
  /** UUID identifying the schedule which the subscription belongs. */
  scheduleId: string;
  /** UUID identifying the dashboard which the subscription belongs. */
  dashboardId: string;
  /**
   * The etag for the subscription. Can be optionally provided to ensure that the subscription has not been
   * modified since the last read.
   */
  etag?: string | undefined;
}

export interface GetDashboardRequest {
  /** UUID identifying the dashboard. */
  dashboardId: string;
}

export interface GetPublishedDashboardRequest {
  /** UUID identifying the published dashboard. */
  dashboardId: string;
}

export interface GetPublishedDashboardTokenInfoRequest {
  /** UUID identifying the published dashboard. */
  dashboardId: string;
  /** Provided external value to be included in the custom claim. */
  externalValue?: string | undefined;
  /** Provided external viewer id to be included in the custom claim. */
  externalViewerId?: string | undefined;
}

export interface GetPublishedDashboardTokenInfoResponse {
  /**
   * Custom claim generated from external_value and external_viewer_id.
   * Format: `urn:aibi:external_data:<external_value>:<external_viewer_id>:<dashboard_id>`
   */
  customClaim?: string | undefined;
  /** Scope defining access permissions. */
  scope?: string | undefined;
  /**
   * Authorization constraints for accessing the published dashboard.
   * Currently includes `workspace_rule_set` and could be enriched with `unity_catalog_privileges` before
   * oAuth token generation.
   */
  authorizationDetails?: AuthorizationDetails[] | undefined;
}

export interface GetScheduleRequest {
  /** UUID identifying the schedule. */
  scheduleId: string;
  /** UUID identifying the dashboard to which the schedule belongs. */
  dashboardId: string;
}

export interface GetSubscriptionRequest {
  /** UUID identifying the subscription. */
  subscriptionId: string;
  /** UUID identifying the schedule which the subscription belongs. */
  scheduleId: string;
  /** UUID identifying the dashboard which the subscription belongs. */
  dashboardId: string;
}

export interface ListDashboardsRequest {
  /** The number of dashboards to return per page. */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListDashboards` call.
   * This token can be used to retrieve the subsequent page.
   */
  pageToken?: string | undefined;
  /**
   * The flag to include dashboards located in the trash.
   * If unspecified, only active dashboards will be returned.
   */
  showTrashed?: boolean | undefined;
  /** `DASHBOARD_VIEW_BASIC` only includes summary metadata from the dashboard. */
  view?: DashboardView | undefined;
}

export interface ListDashboardsResponse {
  dashboards?: Dashboard[] | undefined;
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent dashboards.
   */
  nextPageToken?: string | undefined;
}

export interface ListSchedulesRequest {
  /** UUID identifying the dashboard to which the schedules belongs. */
  dashboardId: string;
  /** The number of schedules to return per page. */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListSchedules` call.
   * Use this to retrieve the subsequent page.
   */
  pageToken?: string | undefined;
}

export interface ListSchedulesResponse {
  schedules?: Schedule[] | undefined;
  /**
   * A token that can be used as a `page_token` in subsequent requests to retrieve the next page of results.
   * If this field is omitted, there are no subsequent schedules.
   */
  nextPageToken?: string | undefined;
}

export interface ListSubscriptionsRequest {
  /** UUID identifying the dashboard which the subscriptions belongs. */
  dashboardId: string;
  /** UUID identifying the schedule which the subscriptions belongs. */
  scheduleId: string;
  /** The number of subscriptions to return per page. */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListSubscriptions` call.
   * Use this to retrieve the subsequent page.
   */
  pageToken?: string | undefined;
}

export interface ListSubscriptionsResponse {
  subscriptions?: Subscription[] | undefined;
  /**
   * A token that can be used as a `page_token` in subsequent requests to retrieve the next page of results.
   * If this field is omitted, there are no subsequent subscriptions.
   */
  nextPageToken?: string | undefined;
}

export interface MigrateDashboardRequest {
  /** UUID of the dashboard to be migrated. */
  sourceDashboardId: string;
  /** Display name for the new Lakeview dashboard. */
  displayName?: string | undefined;
  /** The workspace path of the folder to contain the migrated Lakeview dashboard. */
  parentPath?: string | undefined;
  /**
   * Flag to indicate if mustache parameter syntax ({{ param }}) should be auto-updated
   * to named syntax (:param) when converting datasets in the dashboard.
   */
  updateParameterSyntax?: boolean | undefined;
}

export interface PublishDashboardRequest {
  /** UUID identifying the dashboard to be published. */
  dashboardId: string;
  /**
   * Flag to indicate if the publisher's credentials should be embedded in the
   * published dashboard. These embedded credentials will be used to execute the
   * published dashboard's queries.
   */
  embedCredentials?: boolean | undefined;
  /**
   * The ID of the warehouse that can be used to override the warehouse which
   * was set in the draft.
   */
  warehouseId?: string | undefined;
}

export interface PublishedDashboard {
  /** The display name of the published dashboard. */
  displayName?: string | undefined;
  /** The warehouse ID used to run the published dashboard. */
  warehouseId?: string | undefined;
  /** Indicates whether credentials are embedded in the published dashboard. */
  embedCredentials?: boolean | undefined;
  /** The timestamp of when the published dashboard was last revised. */
  revisionCreateTime?: Temporal.Instant | undefined;
}

/** Request to revert a dashboard draft to its last published state. */
export interface RevertDashboardRequest {
  /** UUID identifying the dashboard. */
  dashboardId: string;
  /**
   * The etag for the dashboard. Optionally, it can be provided to verify that the dashboard
   * has not been modified from its last retrieval.
   */
  etag?: string | undefined;
}

/** Response to revert a dashboard draft to its last published state. */
export interface RevertDashboardResponse {
  /** The reverted dashboard. */
  dashboard?: Dashboard | undefined;
}

export interface Schedule {
  /** UUID identifying the schedule. */
  scheduleId?: string | undefined;
  /** UUID identifying the dashboard to which the schedule belongs. */
  dashboardId?: string | undefined;
  /** The cron expression describing the frequency of the periodic refresh for this schedule. */
  cronSchedule: CronSchedule;
  /** The status indicates whether this schedule is paused or not. */
  pauseStatus?: SchedulePauseStatus | undefined;
  /** The display name for schedule. */
  displayName?: string | undefined;
  /**
   * The etag for the schedule. Must be left empty on create, must be provided on updates to ensure
   * that the schedule has not been modified since the last read, and can be optionally provided on delete.
   */
  etag?: string | undefined;
  /** A timestamp indicating when the schedule was created. */
  createTime?: Temporal.Instant | undefined;
  /** A timestamp indicating when the schedule was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The warehouse id to run the dashboard with for the schedule. */
  warehouseId?: string | undefined;
}

export interface Subscription {
  /** UUID identifying the subscription. */
  subscriptionId?: string | undefined;
  /** UUID identifying the schedule to which the subscription belongs. */
  scheduleId?: string | undefined;
  /** UUID identifying the dashboard to which the subscription belongs. */
  dashboardId?: string | undefined;
  /** Subscriber details for users and destinations to be added as subscribers to the schedule. */
  subscriber: Subscription_Subscriber;
  /** UserId of the user who adds subscribers (users or notification destinations) to the dashboard's schedule. */
  createdByUserId?: bigint | undefined;
  /**
   * The etag for the subscription. Must be left empty on create, can be optionally provided on delete
   * to ensure that the subscription has not been deleted since the last read.
   */
  etag?: string | undefined;
  /** A timestamp indicating when the subscription was created. */
  createTime?: Temporal.Instant | undefined;
  /** A timestamp indicating when the subscription was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /**
   * Controls whether notifications are sent to the subscriber for scheduled dashboard refreshes.
   * If not defined, defaults to false in the backend to match the current behavior (refresh and notify)
   */
  skipNotify?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Subscription_Subscriber {
  /**
   * The user to receive the subscription email.
   * This parameter is mutually exclusive with `destination_subscriber`.
   */
  userSubscriber?: Subscription_Subscriber_User | undefined;
  /**
   * The destination to receive the subscription email.
   * This parameter is mutually exclusive with `user_subscriber`.
   */
  destinationSubscriber?: Subscription_Subscriber_Destination | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Subscription_Subscriber_Destination {
  /** The canonical identifier of the destination to receive email notification. */
  destinationId: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Subscription_Subscriber_User {
  /** UserId of the subscriber. */
  userId: bigint;
}

export interface TrashDashboardRequest {
  /** UUID identifying the dashboard. */
  dashboardId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TrashDashboardResponse {}

export interface UnpublishDashboardRequest {
  /** UUID identifying the published dashboard. */
  dashboardId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UnpublishDashboardResponse {}

export interface UpdateDashboardRequest {
  dashboard: Dashboard;
  /**
   * Sets the default catalog for all datasets in this dashboard.
   * Does not impact table references that use fully qualified catalog names (ex: samples.nyctaxi.trips).
   * Leave blank to keep each dataset’s existing configuration.
   */
  datasetCatalog?: string | undefined;
  /**
   * Sets the default schema for all datasets in this dashboard.
   * Does not impact table references that use fully qualified schema names (ex: nyctaxi.trips).
   * Leave blank to keep each dataset’s existing configuration.
   */
  datasetSchema?: string | undefined;
}

export interface UpdateScheduleRequest {
  /** The schedule to update. */
  schedule: Schedule;
}

export const unmarshalAuthorizationDetailsSchema: z.ZodType<AuthorizationDetails> =
  z
    .object({
      type: z.string().optional(),
      resource_name: z.string().optional(),
      resource_legacy_acl_path: z.string().optional(),
      grant_rules: z
        .array(z.lazy(() => unmarshalAuthorizationDetails_GrantRuleSchema))
        .optional(),
    })
    .transform(d => ({
      type: d.type,
      resourceName: d.resource_name,
      resourceLegacyAclPath: d.resource_legacy_acl_path,
      grantRules: d.grant_rules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAuthorizationDetails_GrantRuleSchema: z.ZodType<AuthorizationDetails_GrantRule> =
  z
    .object({
      permission_set: z.string().optional(),
    })
    .transform(d => ({
      permissionSet: d.permission_set,
    }));

export const unmarshalCronScheduleSchema: z.ZodType<CronSchedule> = z
  .object({
    quartz_cron_expression: z.string(),
    timezone_id: z.string(),
  })
  .transform(d => ({
    quartzCronExpression: d.quartz_cron_expression,
    timezoneId: d.timezone_id,
  }));

export const unmarshalDashboardSchema: z.ZodType<Dashboard> = z
  .object({
    dashboard_id: z.string().optional(),
    display_name: z.string().optional(),
    path: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    warehouse_id: z.string().optional(),
    etag: z.string().optional(),
    serialized_dashboard: z.string().optional(),
    lifecycle_state: z.string().optional(),
    parent_path: z.string().optional(),
  })
  .transform(d => ({
    dashboardId: d.dashboard_id,
    displayName: d.display_name,
    path: d.path,
    createTime: d.create_time,
    updateTime: d.update_time,
    warehouseId: d.warehouse_id,
    etag: d.etag,
    serializedDashboard: d.serialized_dashboard,
    lifecycleState: d.lifecycle_state,
    parentPath: d.parent_path,
  }));

export const unmarshalGetPublishedDashboardTokenInfoResponseSchema: z.ZodType<GetPublishedDashboardTokenInfoResponse> =
  z
    .object({
      custom_claim: z.string().optional(),
      scope: z.string().optional(),
      authorization_details: z
        .array(z.lazy(() => unmarshalAuthorizationDetailsSchema))
        .optional(),
    })
    .transform(d => ({
      customClaim: d.custom_claim,
      scope: d.scope,
      authorizationDetails: d.authorization_details,
    }));

export const unmarshalListDashboardsResponseSchema: z.ZodType<ListDashboardsResponse> =
  z
    .object({
      dashboards: z.array(z.lazy(() => unmarshalDashboardSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      dashboards: d.dashboards,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSchedulesResponseSchema: z.ZodType<ListSchedulesResponse> =
  z
    .object({
      schedules: z.array(z.lazy(() => unmarshalScheduleSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      schedules: d.schedules,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSubscriptionsResponseSchema: z.ZodType<ListSubscriptionsResponse> =
  z
    .object({
      subscriptions: z
        .array(z.lazy(() => unmarshalSubscriptionSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      subscriptions: d.subscriptions,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalPublishedDashboardSchema: z.ZodType<PublishedDashboard> =
  z
    .object({
      display_name: z.string().optional(),
      warehouse_id: z.string().optional(),
      embed_credentials: z.boolean().optional(),
      revision_create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      displayName: d.display_name,
      warehouseId: d.warehouse_id,
      embedCredentials: d.embed_credentials,
      revisionCreateTime: d.revision_create_time,
    }));

export const unmarshalRevertDashboardResponseSchema: z.ZodType<RevertDashboardResponse> =
  z
    .object({
      dashboard: z.lazy(() => unmarshalDashboardSchema).optional(),
    })
    .transform(d => ({
      dashboard: d.dashboard,
    }));

export const unmarshalScheduleSchema: z.ZodType<Schedule> = z
  .object({
    schedule_id: z.string().optional(),
    dashboard_id: z.string().optional(),
    cron_schedule: z.lazy(() => unmarshalCronScheduleSchema),
    pause_status: z.string().optional(),
    display_name: z.string().optional(),
    etag: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    warehouse_id: z.string().optional(),
  })
  .transform(d => ({
    scheduleId: d.schedule_id,
    dashboardId: d.dashboard_id,
    cronSchedule: d.cron_schedule,
    pauseStatus: d.pause_status,
    displayName: d.display_name,
    etag: d.etag,
    createTime: d.create_time,
    updateTime: d.update_time,
    warehouseId: d.warehouse_id,
  }));

export const unmarshalSubscriptionSchema: z.ZodType<Subscription> = z
  .object({
    subscription_id: z.string().optional(),
    schedule_id: z.string().optional(),
    dashboard_id: z.string().optional(),
    subscriber: z.lazy(() => unmarshalSubscription_SubscriberSchema),
    created_by_user_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    etag: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    skip_notify: z.boolean().optional(),
  })
  .transform(d => ({
    subscriptionId: d.subscription_id,
    scheduleId: d.schedule_id,
    dashboardId: d.dashboard_id,
    subscriber: d.subscriber,
    createdByUserId: d.created_by_user_id,
    etag: d.etag,
    createTime: d.create_time,
    updateTime: d.update_time,
    skipNotify: d.skip_notify,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSubscription_SubscriberSchema: z.ZodType<Subscription_Subscriber> =
  z
    .object({
      user_subscriber: z
        .lazy(() => unmarshalSubscription_Subscriber_UserSchema)
        .optional(),
      destination_subscriber: z
        .lazy(() => unmarshalSubscription_Subscriber_DestinationSchema)
        .optional(),
    })
    .transform(d => ({
      userSubscriber: d.user_subscriber,
      destinationSubscriber: d.destination_subscriber,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSubscription_Subscriber_DestinationSchema: z.ZodType<Subscription_Subscriber_Destination> =
  z
    .object({
      destination_id: z.string(),
    })
    .transform(d => ({
      destinationId: d.destination_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSubscription_Subscriber_UserSchema: z.ZodType<Subscription_Subscriber_User> =
  z
    .object({
      user_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v)),
    })
    .transform(d => ({
      userId: d.user_id,
    }));

export const unmarshalTrashDashboardResponseSchema: z.ZodType<TrashDashboardResponse> =
  z.object({});

export const unmarshalUnpublishDashboardResponseSchema: z.ZodType<UnpublishDashboardResponse> =
  z.object({});

export const marshalCronScheduleSchema: z.ZodType = z
  .object({
    quartzCronExpression: z.string(),
    timezoneId: z.string(),
  })
  .transform(d => ({
    quartz_cron_expression: d.quartzCronExpression,
    timezone_id: d.timezoneId,
  }));

export const marshalDashboardSchema: z.ZodType = z
  .object({
    dashboardId: z.string().optional(),
    displayName: z.string().optional(),
    path: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    warehouseId: z.string().optional(),
    etag: z.string().optional(),
    serializedDashboard: z.string().optional(),
    lifecycleState: z.string().optional(),
    parentPath: z.string().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
    display_name: d.displayName,
    path: d.path,
    create_time: d.createTime,
    update_time: d.updateTime,
    warehouse_id: d.warehouseId,
    etag: d.etag,
    serialized_dashboard: d.serializedDashboard,
    lifecycle_state: d.lifecycleState,
    parent_path: d.parentPath,
  }));

export const marshalMigrateDashboardRequestSchema: z.ZodType = z
  .object({
    sourceDashboardId: z.string(),
    displayName: z.string().optional(),
    parentPath: z.string().optional(),
    updateParameterSyntax: z.boolean().optional(),
  })
  .transform(d => ({
    source_dashboard_id: d.sourceDashboardId,
    display_name: d.displayName,
    parent_path: d.parentPath,
    update_parameter_syntax: d.updateParameterSyntax,
  }));

export const marshalPublishDashboardRequestSchema: z.ZodType = z
  .object({
    dashboardId: z.string(),
    embedCredentials: z.boolean().optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
    embed_credentials: d.embedCredentials,
    warehouse_id: d.warehouseId,
  }));

export const marshalRevertDashboardRequestSchema: z.ZodType = z
  .object({
    dashboardId: z.string(),
    etag: z.string().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
    etag: d.etag,
  }));

export const marshalScheduleSchema: z.ZodType = z
  .object({
    scheduleId: z.string().optional(),
    dashboardId: z.string().optional(),
    cronSchedule: z.lazy(() => marshalCronScheduleSchema),
    pauseStatus: z.string().optional(),
    displayName: z.string().optional(),
    etag: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    schedule_id: d.scheduleId,
    dashboard_id: d.dashboardId,
    cron_schedule: d.cronSchedule,
    pause_status: d.pauseStatus,
    display_name: d.displayName,
    etag: d.etag,
    create_time: d.createTime,
    update_time: d.updateTime,
    warehouse_id: d.warehouseId,
  }));

export const marshalSubscriptionSchema: z.ZodType = z
  .object({
    subscriptionId: z.string().optional(),
    scheduleId: z.string().optional(),
    dashboardId: z.string().optional(),
    subscriber: z.lazy(() => marshalSubscription_SubscriberSchema),
    createdByUserId: z.bigint().optional(),
    etag: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    skipNotify: z.boolean().optional(),
  })
  .transform(d => ({
    subscription_id: d.subscriptionId,
    schedule_id: d.scheduleId,
    dashboard_id: d.dashboardId,
    subscriber: d.subscriber,
    created_by_user_id: d.createdByUserId,
    etag: d.etag,
    create_time: d.createTime,
    update_time: d.updateTime,
    skip_notify: d.skipNotify,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSubscription_SubscriberSchema: z.ZodType = z
  .object({
    userSubscriber: z
      .lazy(() => marshalSubscription_Subscriber_UserSchema)
      .optional(),
    destinationSubscriber: z
      .lazy(() => marshalSubscription_Subscriber_DestinationSchema)
      .optional(),
  })
  .transform(d => ({
    user_subscriber: d.userSubscriber,
    destination_subscriber: d.destinationSubscriber,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSubscription_Subscriber_DestinationSchema: z.ZodType = z
  .object({
    destinationId: z.string(),
  })
  .transform(d => ({
    destination_id: d.destinationId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSubscription_Subscriber_UserSchema: z.ZodType = z
  .object({
    userId: z.bigint(),
  })
  .transform(d => ({
    user_id: d.userId,
  }));
