// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The kind of destination that notifications are sent to. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DestinationType = {
  /** Notifications are sent to a Slack incoming webhook. */
  SLACK: 'SLACK',
  /** Notifications are sent to email addresses. */
  EMAIL: 'EMAIL',
  /** Notifications are sent to a generic HTTPS webhook. */
  WEBHOOK: 'WEBHOOK',
  /** Notifications are sent to a PagerDuty service. */
  PAGERDUTY: 'PAGERDUTY',
  /** Notifications are sent to a Microsoft Teams incoming webhook. */
  MICROSOFT_TEAMS: 'MICROSOFT_TEAMS',
  /** Notifications are sent to a Slack channel through the Databricks Genie app for Slack. */
  DATABRICKS_APP_SLACK: 'DATABRICKS_APP_SLACK',
  /** Notifications are sent to a Microsoft Teams channel through the Databricks Genie app for Microsoft Teams. */
  DATABRICKS_APP_TEAMS: 'DATABRICKS_APP_TEAMS',
} as const;
export type DestinationType =
  | (typeof DestinationType)[keyof typeof DestinationType]
  | (string & {});

/** Holds the destination-specific configuration. Exactly one of the nested configs is set. */
export interface Config {
  config?:
    | {
        $case: 'slack';
        /** Configures a Slack incoming webhook destination. */
        slack: SlackConfig;
      }
    | {
        $case: 'email';
        /** Configures an email destination. */
        email: EmailConfig;
      }
    | {
        $case: 'genericWebhook';
        /** Configures a generic HTTPS webhook destination. */
        genericWebhook: GenericWebhookConfig;
      }
    | {
        $case: 'pagerduty';
        /** Configures a PagerDuty destination. */
        pagerduty: PagerdutyConfig;
      }
    | {
        $case: 'microsoftTeams';
        /** Configures a Microsoft Teams incoming webhook destination. */
        microsoftTeams: MicrosoftTeamsConfig;
      }
    | {
        $case: 'databricksAppSlack';
        /** Configures a Slack channel reached through the Databricks Genie app for Slack. */
        databricksAppSlack: DatabricksAppSlackConfig;
      }
    | {
        $case: 'databricksAppTeams';
        /** Configures a Microsoft Teams channel reached through the Databricks Genie app for Microsoft Teams. */
        databricksAppTeams: DatabricksAppTeamsConfig;
      }
    | undefined;
}

export interface CreateNotificationDestinationRequest {
  /** The display name for the notification destination. */
  displayName?: string | undefined;
  /** The configuration for the notification destination. Must wrap EXACTLY one of the nested configs. */
  config?: Config | undefined;
}

/**
 * Slack channel reached through the Databricks app. The app must already be installed in the
 * Slack workspace and connected to this Databricks workspace.
 */
export interface DatabricksAppSlackConfig {
  /** [Input-Only] Slack workspace (team) ID the Databricks app is installed in. */
  teamId?: string | undefined;
  /** [Output-Only] Whether team ID is set. */
  teamIdSet?: boolean | undefined;
  /** [Input-Only] Slack channel ID notifications are posted to. */
  channelId?: string | undefined;
  /** [Output-Only] Whether channel ID is set. */
  channelIdSet?: boolean | undefined;
}

/**
 * Microsoft Teams channel reached through the Databricks app. The app must already be installed in
 * the Microsoft 365 tenant and connected to this Databricks workspace.
 */
export interface DatabricksAppTeamsConfig {
  /** [Input-Only] Microsoft Entra tenant ID of the Microsoft 365 tenant the app is installed in. */
  tenantId?: string | undefined;
  /** [Output-Only] Whether tenant ID is set. */
  tenantIdSet?: boolean | undefined;
  /** [Input-Only] Microsoft Entra group ID of the team that owns the channel. */
  teamId?: string | undefined;
  /** [Output-Only] Whether team ID is set. */
  teamIdSet?: boolean | undefined;
  /** [Input-Only] Teams channel ID notifications are posted to. */
  channelId?: string | undefined;
  /** [Output-Only] Whether channel ID is set. */
  channelIdSet?: boolean | undefined;
}

export interface DeleteNotificationDestinationRequest {
  /** A UUID identifying the notification destination. */
  id?: string | undefined;
}

/** Configures an email destination. */
export interface EmailConfig {
  /** Email addresses to notify. At least one address is required. */
  addresses?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Empty {}

/**
 * Configures a generic webhook destination. Notifications are delivered as HTTPS POST requests
 * to url, optionally authenticated with HTTP Basic authentication.
 */
export interface GenericWebhookConfig {
  /** [Input-Only] HTTPS URL that notifications are posted to. */
  url?: string | undefined;
  /** [Output-Only] Whether URL is set. */
  urlSet?: boolean | undefined;
  /** [Input-Only][Optional] Username for HTTP Basic authentication. Set it together with password. */
  username?: string | undefined;
  /** [Output-Only] Whether username is set. */
  usernameSet?: boolean | undefined;
  /** [Input-Only][Optional] Password for HTTP Basic authentication. Set it together with username. */
  password?: string | undefined;
  /** [Output-Only] Whether password is set. */
  passwordSet?: boolean | undefined;
}

export interface GetNotificationDestinationRequest {
  /** A UUID identifying the notification destination. */
  id?: string | undefined;
}

export interface ListNotificationDestinationsRequest {
  /** Opaque token returned as next_page_token by a previous call. Omit it to request the first page. */
  pageToken?: string | undefined;
  /** Maximum number of notification destinations to return per page. Defaults to 20. */
  pageSize?: bigint | undefined;
}

export interface ListNotificationDestinationsResponse {
  /** Notification destinations in the current page. */
  results?: ListNotificationDestinationsResult[] | undefined;
  /** Token to pass as page_token to fetch the next page of results. Absent when there are no more results. */
  nextPageToken?: string | undefined;
}

/**
 * A reusable definition of where a workspace sends notifications, such as a Slack channel, a set
 * of email addresses, a PagerDuty service, a Microsoft Teams channel or a generic webhook. Job
 * notifications, SQL alerts and other workspace features reference a destination by its id. Only
 * workspace admins can create, update and delete destinations; once created, a destination is
 * available to all users in the workspace. Secret values such as webhook URLs and tokens are
 * write-only: responses report whether each one is set, never its value.
 */
export interface ListNotificationDestinationsResult {
  /** A UUID identifying the notification destination. */
  id?: string | undefined;
  /** The display name for the notification destination. */
  displayName?: string | undefined;
  /** [Output-only] The type of the notification destination, determined by which nested config was provided on creation. The type can not be changed once set. */
  destinationType?: DestinationType | undefined;
  /** The configuration for the notification destination. Will be exactly one of the nested configs. Only returned to users with workspace admin permissions. */
  config?: Config | undefined;
}

/**
 * Configures a Microsoft Teams destination. Notifications are posted to the incoming webhook
 * url, which is required. The app_id, auth_secret, channel_url and tenant_id fields can optionally
 * be set together to post through a Microsoft Teams app.
 */
export interface MicrosoftTeamsConfig {
  /** [Input-Only] Microsoft Teams incoming webhook URL that notifications are posted to. Must be an HTTPS URL. The URL is required even when the app fields are set. */
  url?: string | undefined;
  /** [Output-Only] Whether URL is set. */
  urlSet?: boolean | undefined;
  /** [Input-Only] Application (client) ID of the Microsoft Teams app, as a UUID. Optional; set it together with auth_secret, channel_url and tenant_id. */
  appId?: string | undefined;
  /** [Output-Only] Whether App ID is set. */
  appIdSet?: boolean | undefined;
  /** [Input-Only] Client secret of the Microsoft Teams app. Optional; set it together with app_id, channel_url and tenant_id. */
  authSecret?: string | undefined;
  /** [Output-Only] Whether secret is set. */
  authSecretSet?: boolean | undefined;
  /** [Input-Only] URL of the Microsoft Teams channel that the app posts to. Optional; set it together with app_id, auth_secret and tenant_id. */
  channelUrl?: string | undefined;
  /** [Output-Only] Whether Channel URL is set. */
  channelUrlSet?: boolean | undefined;
  /** [Input-Only] Microsoft Entra tenant ID of the Microsoft Teams app, as a UUID. Optional; set it together with app_id, auth_secret and channel_url. */
  tenantId?: string | undefined;
  /** [Output-Only] Whether Tenant ID is set. */
  tenantIdSet?: boolean | undefined;
}

/**
 * A reusable definition of where a workspace sends notifications, such as a Slack channel, a set
 * of email addresses, a PagerDuty service, a Microsoft Teams channel or a generic webhook. Job
 * notifications, SQL alerts and other workspace features reference a destination by its id. Only
 * workspace admins can create, update and delete destinations; once created, a destination is
 * available to all users in the workspace. Secret values such as webhook URLs and tokens are
 * write-only: responses report whether each one is set, never its value.
 */
export interface NotificationDestination {
  /** A UUID identifying the notification destination. */
  id?: string | undefined;
  /** The display name for the notification destination. */
  displayName?: string | undefined;
  /** [Output-only] The type of the notification destination, determined by which nested config was provided on creation. The type can not be changed once set. */
  destinationType?: DestinationType | undefined;
  /** The configuration for the notification destination. Will be exactly one of the nested configs. Only returned to users with workspace admin permissions. */
  config?: Config | undefined;
}

/**
 * Configures a PagerDuty destination. Notifications are sent as events to the PagerDuty Events
 * API v2.
 */
export interface PagerdutyConfig {
  /** [Input-Only] Integration key from an Events API v2 integration on the PagerDuty service that receives the notifications. */
  integrationKey?: string | undefined;
  /** [Output-Only] Whether integration key is set. */
  integrationKeySet?: boolean | undefined;
}

/**
 * Configures a Slack destination. Notifications are posted to the incoming webhook url, which is
 * required. A bot oauth_token and channel_id can optionally be set together to post to the channel
 * through the Slack API.
 */
export interface SlackConfig {
  /** [Input-Only] Slack incoming webhook URL that notifications are posted to. Must be an HTTPS URL. The URL is required even when oauth_token and channel_id are set. */
  url?: string | undefined;
  /** [Output-Only] Whether URL is set. */
  urlSet?: boolean | undefined;
  /** [Input-Only] Slack bot OAuth token (xoxb-...). Optional; when set together with channel_id, notifications are posted to that channel through the Slack API. */
  oauthToken?: string | undefined;
  /** [Output-Only] Whether OAuth token is set. */
  oauthTokenSet?: boolean | undefined;
  /** [Input-Only] ID of the Slack channel that notifications are posted to through the Slack API. Optional; set it together with oauth_token. */
  channelId?: string | undefined;
  /** [Output-Only] Whether channel ID is set. */
  channelIdSet?: boolean | undefined;
}

export interface UpdateNotificationDestinationRequest {
  /** A UUID identifying the notification destination. */
  id?: string | undefined;
  /** The display name for the notification destination. */
  displayName?: string | undefined;
  /** The configuration for the notification destination. Must wrap EXACTLY one of the nested configs. */
  config?: Config | undefined;
}

export const unmarshalConfigSchema: z.ZodType<Config> = z
  .object({
    slack: z.lazy(() => unmarshalSlackConfigSchema).optional(),
    email: z.lazy(() => unmarshalEmailConfigSchema).optional(),
    generic_webhook: z
      .lazy(() => unmarshalGenericWebhookConfigSchema)
      .optional(),
    pagerduty: z.lazy(() => unmarshalPagerdutyConfigSchema).optional(),
    microsoft_teams: z
      .lazy(() => unmarshalMicrosoftTeamsConfigSchema)
      .optional(),
    databricks_app_slack: z
      .lazy(() => unmarshalDatabricksAppSlackConfigSchema)
      .optional(),
    databricks_app_teams: z
      .lazy(() => unmarshalDatabricksAppTeamsConfigSchema)
      .optional(),
  })
  .refine(
    d =>
      [
        d.slack,
        d.email,
        d.generic_webhook,
        d.pagerduty,
        d.microsoft_teams,
        d.databricks_app_slack,
        d.databricks_app_teams,
      ].filter(v => v !== undefined).length <= 1,
    {message: 'Config.Config: multiple oneof members set'}
  )
  .transform(d => ({
    config:
      d.slack !== undefined
        ? {$case: 'slack' as const, slack: d.slack}
        : d.email !== undefined
          ? {$case: 'email' as const, email: d.email}
          : d.generic_webhook !== undefined
            ? {
                $case: 'genericWebhook' as const,
                genericWebhook: d.generic_webhook,
              }
            : d.pagerduty !== undefined
              ? {$case: 'pagerduty' as const, pagerduty: d.pagerduty}
              : d.microsoft_teams !== undefined
                ? {
                    $case: 'microsoftTeams' as const,
                    microsoftTeams: d.microsoft_teams,
                  }
                : d.databricks_app_slack !== undefined
                  ? {
                      $case: 'databricksAppSlack' as const,
                      databricksAppSlack: d.databricks_app_slack,
                    }
                  : d.databricks_app_teams !== undefined
                    ? {
                        $case: 'databricksAppTeams' as const,
                        databricksAppTeams: d.databricks_app_teams,
                      }
                    : undefined,
  }));

export const unmarshalDatabricksAppSlackConfigSchema: z.ZodType<DatabricksAppSlackConfig> =
  z
    .object({
      team_id: z.string().optional(),
      team_id_set: z.boolean().optional(),
      channel_id: z.string().optional(),
      channel_id_set: z.boolean().optional(),
    })
    .transform(d => ({
      teamId: d.team_id,
      teamIdSet: d.team_id_set,
      channelId: d.channel_id,
      channelIdSet: d.channel_id_set,
    }));

export const unmarshalDatabricksAppTeamsConfigSchema: z.ZodType<DatabricksAppTeamsConfig> =
  z
    .object({
      tenant_id: z.string().optional(),
      tenant_id_set: z.boolean().optional(),
      team_id: z.string().optional(),
      team_id_set: z.boolean().optional(),
      channel_id: z.string().optional(),
      channel_id_set: z.boolean().optional(),
    })
    .transform(d => ({
      tenantId: d.tenant_id,
      tenantIdSet: d.tenant_id_set,
      teamId: d.team_id,
      teamIdSet: d.team_id_set,
      channelId: d.channel_id,
      channelIdSet: d.channel_id_set,
    }));

export const unmarshalEmailConfigSchema: z.ZodType<EmailConfig> = z
  .object({
    addresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    addresses: d.addresses,
  }));

export const unmarshalEmptySchema: z.ZodType<Empty> = z.object({});

export const unmarshalGenericWebhookConfigSchema: z.ZodType<GenericWebhookConfig> =
  z
    .object({
      url: z.string().optional(),
      url_set: z.boolean().optional(),
      username: z.string().optional(),
      username_set: z.boolean().optional(),
      password: z.string().optional(),
      password_set: z.boolean().optional(),
    })
    .transform(d => ({
      url: d.url,
      urlSet: d.url_set,
      username: d.username,
      usernameSet: d.username_set,
      password: d.password,
      passwordSet: d.password_set,
    }));

export const unmarshalListNotificationDestinationsResponseSchema: z.ZodType<ListNotificationDestinationsResponse> =
  z
    .object({
      results: z
        .array(z.lazy(() => unmarshalListNotificationDestinationsResultSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      results: d.results,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListNotificationDestinationsResultSchema: z.ZodType<ListNotificationDestinationsResult> =
  z
    .object({
      id: z.string().optional(),
      display_name: z.string().optional(),
      destination_type: z.string().optional(),
      config: z
        .lazy(() => unmarshalConfigSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      id: d.id,
      displayName: d.display_name,
      destinationType: d.destination_type,
      config: d.config,
    }));

export const unmarshalMicrosoftTeamsConfigSchema: z.ZodType<MicrosoftTeamsConfig> =
  z
    .object({
      url: z.string().optional(),
      url_set: z.boolean().optional(),
      app_id: z.string().optional(),
      app_id_set: z.boolean().optional(),
      auth_secret: z.string().optional(),
      auth_secret_set: z.boolean().optional(),
      channel_url: z.string().optional(),
      channel_url_set: z.boolean().optional(),
      tenant_id: z.string().optional(),
      tenant_id_set: z.boolean().optional(),
    })
    .transform(d => ({
      url: d.url,
      urlSet: d.url_set,
      appId: d.app_id,
      appIdSet: d.app_id_set,
      authSecret: d.auth_secret,
      authSecretSet: d.auth_secret_set,
      channelUrl: d.channel_url,
      channelUrlSet: d.channel_url_set,
      tenantId: d.tenant_id,
      tenantIdSet: d.tenant_id_set,
    }));

export const unmarshalNotificationDestinationSchema: z.ZodType<NotificationDestination> =
  z
    .object({
      id: z.string().optional(),
      display_name: z.string().optional(),
      destination_type: z.string().optional(),
      config: z
        .lazy(() => unmarshalConfigSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      id: d.id,
      displayName: d.display_name,
      destinationType: d.destination_type,
      config: d.config,
    }));

export const unmarshalPagerdutyConfigSchema: z.ZodType<PagerdutyConfig> = z
  .object({
    integration_key: z.string().optional(),
    integration_key_set: z.boolean().optional(),
  })
  .transform(d => ({
    integrationKey: d.integration_key,
    integrationKeySet: d.integration_key_set,
  }));

export const unmarshalSlackConfigSchema: z.ZodType<SlackConfig> = z
  .object({
    url: z.string().optional(),
    url_set: z.boolean().optional(),
    oauth_token: z.string().optional(),
    oauth_token_set: z.boolean().optional(),
    channel_id: z.string().optional(),
    channel_id_set: z.boolean().optional(),
  })
  .transform(d => ({
    url: d.url,
    urlSet: d.url_set,
    oauthToken: d.oauth_token,
    oauthTokenSet: d.oauth_token_set,
    channelId: d.channel_id,
    channelIdSet: d.channel_id_set,
  }));

export const marshalConfigSchema: z.ZodType = z
  .object({
    config: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('slack'),
          slack: z.lazy(() => marshalSlackConfigSchema),
        }),
        z.object({
          $case: z.literal('email'),
          email: z.lazy(() => marshalEmailConfigSchema),
        }),
        z.object({
          $case: z.literal('genericWebhook'),
          genericWebhook: z.lazy(() => marshalGenericWebhookConfigSchema),
        }),
        z.object({
          $case: z.literal('pagerduty'),
          pagerduty: z.lazy(() => marshalPagerdutyConfigSchema),
        }),
        z.object({
          $case: z.literal('microsoftTeams'),
          microsoftTeams: z.lazy(() => marshalMicrosoftTeamsConfigSchema),
        }),
        z.object({
          $case: z.literal('databricksAppSlack'),
          databricksAppSlack: z.lazy(
            () => marshalDatabricksAppSlackConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('databricksAppTeams'),
          databricksAppTeams: z.lazy(
            () => marshalDatabricksAppTeamsConfigSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.config?.$case === 'slack' && {slack: d.config.slack}),
    ...(d.config?.$case === 'email' && {email: d.config.email}),
    ...(d.config?.$case === 'genericWebhook' && {
      generic_webhook: d.config.genericWebhook,
    }),
    ...(d.config?.$case === 'pagerduty' && {pagerduty: d.config.pagerduty}),
    ...(d.config?.$case === 'microsoftTeams' && {
      microsoft_teams: d.config.microsoftTeams,
    }),
    ...(d.config?.$case === 'databricksAppSlack' && {
      databricks_app_slack: d.config.databricksAppSlack,
    }),
    ...(d.config?.$case === 'databricksAppTeams' && {
      databricks_app_teams: d.config.databricksAppTeams,
    }),
  }));

export const marshalCreateNotificationDestinationRequestSchema: z.ZodType = z
  .object({
    displayName: z.string().optional(),
    config: z.lazy(() => marshalConfigSchema).optional(),
  })
  .transform(d => ({
    display_name: d.displayName,
    config: d.config,
  }));

export const marshalDatabricksAppSlackConfigSchema: z.ZodType = z
  .object({
    teamId: z.string().optional(),
    teamIdSet: z.boolean().optional(),
    channelId: z.string().optional(),
    channelIdSet: z.boolean().optional(),
  })
  .transform(d => ({
    team_id: d.teamId,
    team_id_set: d.teamIdSet,
    channel_id: d.channelId,
    channel_id_set: d.channelIdSet,
  }));

export const marshalDatabricksAppTeamsConfigSchema: z.ZodType = z
  .object({
    tenantId: z.string().optional(),
    tenantIdSet: z.boolean().optional(),
    teamId: z.string().optional(),
    teamIdSet: z.boolean().optional(),
    channelId: z.string().optional(),
    channelIdSet: z.boolean().optional(),
  })
  .transform(d => ({
    tenant_id: d.tenantId,
    tenant_id_set: d.tenantIdSet,
    team_id: d.teamId,
    team_id_set: d.teamIdSet,
    channel_id: d.channelId,
    channel_id_set: d.channelIdSet,
  }));

export const marshalEmailConfigSchema: z.ZodType = z
  .object({
    addresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    addresses: d.addresses,
  }));

export const marshalGenericWebhookConfigSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    urlSet: z.boolean().optional(),
    username: z.string().optional(),
    usernameSet: z.boolean().optional(),
    password: z.string().optional(),
    passwordSet: z.boolean().optional(),
  })
  .transform(d => ({
    url: d.url,
    url_set: d.urlSet,
    username: d.username,
    username_set: d.usernameSet,
    password: d.password,
    password_set: d.passwordSet,
  }));

export const marshalMicrosoftTeamsConfigSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    urlSet: z.boolean().optional(),
    appId: z.string().optional(),
    appIdSet: z.boolean().optional(),
    authSecret: z.string().optional(),
    authSecretSet: z.boolean().optional(),
    channelUrl: z.string().optional(),
    channelUrlSet: z.boolean().optional(),
    tenantId: z.string().optional(),
    tenantIdSet: z.boolean().optional(),
  })
  .transform(d => ({
    url: d.url,
    url_set: d.urlSet,
    app_id: d.appId,
    app_id_set: d.appIdSet,
    auth_secret: d.authSecret,
    auth_secret_set: d.authSecretSet,
    channel_url: d.channelUrl,
    channel_url_set: d.channelUrlSet,
    tenant_id: d.tenantId,
    tenant_id_set: d.tenantIdSet,
  }));

export const marshalPagerdutyConfigSchema: z.ZodType = z
  .object({
    integrationKey: z.string().optional(),
    integrationKeySet: z.boolean().optional(),
  })
  .transform(d => ({
    integration_key: d.integrationKey,
    integration_key_set: d.integrationKeySet,
  }));

export const marshalSlackConfigSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    urlSet: z.boolean().optional(),
    oauthToken: z.string().optional(),
    oauthTokenSet: z.boolean().optional(),
    channelId: z.string().optional(),
    channelIdSet: z.boolean().optional(),
  })
  .transform(d => ({
    url: d.url,
    url_set: d.urlSet,
    oauth_token: d.oauthToken,
    oauth_token_set: d.oauthTokenSet,
    channel_id: d.channelId,
    channel_id_set: d.channelIdSet,
  }));

export const marshalUpdateNotificationDestinationRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    config: z.lazy(() => marshalConfigSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    display_name: d.displayName,
    config: d.config,
  }));
