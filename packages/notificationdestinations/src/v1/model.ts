// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';


export enum DestinationType {
  SLACK = 'SLACK',
  EMAIL = 'EMAIL',
  WEBHOOK = 'WEBHOOK',
  PAGERDUTY = 'PAGERDUTY',
  MICROSOFT_TEAMS = 'MICROSOFT_TEAMS',
}

export interface Config {
  config?:
    | { $case: 'slack'; slack: SlackConfig }
    | { $case: 'email'; email: EmailConfig }
    | { $case: 'genericWebhook'; genericWebhook: GenericWebhookConfig }
    | { $case: 'pagerduty'; pagerduty: PagerdutyConfig }
    | { $case: 'microsoftTeams'; microsoftTeams: MicrosoftTeamsConfig }
    | undefined;
}

export interface CreateNotificationDestinationRequest {
  /** The display name for the notification destination. */
  displayName?: string | undefined;
  /** The configuration for the notification destination. Must wrap EXACTLY one of the nested configs. */
  config?: Config | undefined;
}

export interface DeleteNotificationDestinationRequest {
  id?: string | undefined;
}

export interface EmailConfig {
  /** Email addresses to notify. */
  addresses?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Empty {}

export interface GenericWebhookConfig {
  /** [Input-Only] URL for webhook. */
  url?: string | undefined;
  /** [Output-Only] Whether URL is set. */
  urlSet?: boolean | undefined;
  /** [Input-Only][Optional] Username for webhook. */
  username?: string | undefined;
  /** [Output-Only] Whether username is set. */
  usernameSet?: boolean | undefined;
  /** [Input-Only][Optional] Password for webhook. */
  password?: string | undefined;
  /** [Output-Only] Whether password is set. */
  passwordSet?: boolean | undefined;
}

export interface GetNotificationDestinationRequest {
  id?: string | undefined;
}

export interface ListNotificationDestinationsRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListNotificationDestinationsResponse {
  results?: ListNotificationDestinationsResult[] | undefined;
  /** Page token for next of results. */
  nextPageToken?: string | undefined;
}

export interface ListNotificationDestinationsResult {
  /** UUID identifying notification destination. */
  id?: string | undefined;
  /** The display name for the notification destination. */
  displayName?: string | undefined;
  /** [Output-only] The type of the notification destination. The type can not be changed once set. */
  destinationType?: DestinationType | undefined;
  /** The configuration for the notification destination. Will be exactly one of the nested configs. Only returns for users with workspace admin permissions. */
  config?: Config | undefined;
}

export interface MicrosoftTeamsConfig {
  /** [Input-Only] URL for Microsoft Teams webhook. */
  url?: string | undefined;
  /** [Output-Only] Whether URL is set. */
  urlSet?: boolean | undefined;
  /** [Input-Only] App ID for Microsoft Teams App. */
  appId?: string | undefined;
  /** [Output-Only] Whether App ID is set. */
  appIdSet?: boolean | undefined;
  /** [Input-Only] Secret for Microsoft Teams App authentication. */
  authSecret?: string | undefined;
  /** [Output-Only] Whether secret is set. */
  authSecretSet?: boolean | undefined;
  /** [Input-Only] Channel URL for Microsoft Teams App. */
  channelUrl?: string | undefined;
  /** [Output-Only] Whether Channel URL is set. */
  channelUrlSet?: boolean | undefined;
  /** [Input-Only] Tenant ID for Microsoft Teams App. */
  tenantId?: string | undefined;
  /** [Output-Only] Whether Tenant ID is set. */
  tenantIdSet?: boolean | undefined;
}

export interface NotificationDestination {
  /** UUID identifying notification destination. */
  id?: string | undefined;
  /** The display name for the notification destination. */
  displayName?: string | undefined;
  /** [Output-only] The type of the notification destination. The type can not be changed once set. */
  destinationType?: DestinationType | undefined;
  /** The configuration for the notification destination. Will be exactly one of the nested configs. Only returns for users with workspace admin permissions. */
  config?: Config | undefined;
}

export interface PagerdutyConfig {
  /** [Input-Only] Integration key for PagerDuty. */
  integrationKey?: string | undefined;
  /** [Output-Only] Whether integration key is set. */
  integrationKeySet?: boolean | undefined;
}

export interface SlackConfig {
  /** [Input-Only] URL for Slack destination. */
  url?: string | undefined;
  /** [Output-Only] Whether URL is set. */
  urlSet?: boolean | undefined;
  /** [Input-Only] OAuth token for Slack authentication. */
  oauthToken?: string | undefined;
  /** [Output-Only] Whether OAuth token is set. */
  oauthTokenSet?: boolean | undefined;
  /** [Input-Only] Slack channel ID for notifications. */
  channelId?: string | undefined;
  /** [Output-Only] Whether channel ID is set. */
  channelIdSet?: boolean | undefined;
}

export interface UpdateNotificationDestinationRequest {
  /** UUID identifying notification destination. */
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
    generic_webhook: z.lazy(() => unmarshalGenericWebhookConfigSchema).optional(),
    pagerduty: z.lazy(() => unmarshalPagerdutyConfigSchema).optional(),
    microsoft_teams: z.lazy(() => unmarshalMicrosoftTeamsConfigSchema).optional(),
  })
  .transform(d => ({
    config: d.slack !== undefined ? { $case: 'slack' as const, slack: d.slack } : d.email !== undefined ? { $case: 'email' as const, email: d.email } : d.generic_webhook !== undefined ? { $case: 'genericWebhook' as const, genericWebhook: d.generic_webhook } : d.pagerduty !== undefined ? { $case: 'pagerduty' as const, pagerduty: d.pagerduty } : d.microsoft_teams !== undefined ? { $case: 'microsoftTeams' as const, microsoftTeams: d.microsoft_teams } : undefined,
  }));

export const unmarshalEmailConfigSchema: z.ZodType<EmailConfig> = z
  .object({
    addresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    addresses: d.addresses,
  }));

export const unmarshalEmptySchema: z.ZodType<Empty> = z
  .object({
  });

export const unmarshalGenericWebhookConfigSchema: z.ZodType<GenericWebhookConfig> = z
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

export const unmarshalListNotificationDestinationsResponseSchema: z.ZodType<ListNotificationDestinationsResponse> = z
  .object({
    results: z.array(z.lazy(() => unmarshalListNotificationDestinationsResultSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    results: d.results,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListNotificationDestinationsResultSchema: z.ZodType<ListNotificationDestinationsResult> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    destination_type: z.enum(DestinationType).optional(),
    config: z.lazy(() => unmarshalConfigSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    displayName: d.display_name,
    destinationType: d.destination_type,
    config: d.config,
  }));

export const unmarshalMicrosoftTeamsConfigSchema: z.ZodType<MicrosoftTeamsConfig> = z
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

export const unmarshalNotificationDestinationSchema: z.ZodType<NotificationDestination> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    destination_type: z.enum(DestinationType).optional(),
    config: z.lazy(() => unmarshalConfigSchema).optional(),
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
    config: z.discriminatedUnion('$case', [z.object({ $case: z.literal('slack'), slack: z.lazy(() => marshalSlackConfigSchema) }), z.object({ $case: z.literal('email'), email: z.lazy(() => marshalEmailConfigSchema) }), z.object({ $case: z.literal('genericWebhook'), genericWebhook: z.lazy(() => marshalGenericWebhookConfigSchema) }), z.object({ $case: z.literal('pagerduty'), pagerduty: z.lazy(() => marshalPagerdutyConfigSchema) }), z.object({ $case: z.literal('microsoftTeams'), microsoftTeams: z.lazy(() => marshalMicrosoftTeamsConfigSchema) })]).optional(),
  })
  .transform(d => ({
    ...(d.config?.$case === 'slack' && { slack: d.config.slack }),
    ...(d.config?.$case === 'email' && { email: d.config.email }),
    ...(d.config?.$case === 'genericWebhook' && { generic_webhook: d.config.genericWebhook }),
    ...(d.config?.$case === 'pagerduty' && { pagerduty: d.config.pagerduty }),
    ...(d.config?.$case === 'microsoftTeams' && { microsoft_teams: d.config.microsoftTeams }),
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
