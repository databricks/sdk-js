// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The type of token request. As of now, only `AZURE_ACTIVE_DIRECTORY_TOKEN` is supported. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ExchangeTokenType = {
  /** Azure Active Directory token */
  AZURE_ACTIVE_DIRECTORY_TOKEN: 'AZURE_ACTIVE_DIRECTORY_TOKEN',
  /** Exchange for an Azure Active Directory token for Arclight Single-tenant */
  ARCLIGHT_AZURE_EXCHANGE_TOKEN: 'ARCLIGHT_AZURE_EXCHANGE_TOKEN',
  /** Exchange for an Azure Active Directory token and user delegation key for Arclight Single tenant */
  ARCLIGHT_AZURE_EXCHANGE_TOKEN_WITH_USER_DELEGATION_KEY:
    'ARCLIGHT_AZURE_EXCHANGE_TOKEN_WITH_USER_DELEGATION_KEY',
  /** Deprecated: Use ARCLIGHT_AZURE_EXCHANGE_TOKEN */
  ARCLIGHT_MULTI_TENANT_AZURE_EXCHANGE_TOKEN:
    'ARCLIGHT_MULTI_TENANT_AZURE_EXCHANGE_TOKEN',
  /** Deprecated: Use ARCLIGHT_AZURE_EXCHANGE_TOKEN_WITH_USER_DELEGATION_KEY */
  ARCLIGHT_MULTI_TENANT_AZURE_EXCHANGE_TOKEN_WITH_USER_DELEGATION_KEY:
    'ARCLIGHT_MULTI_TENANT_AZURE_EXCHANGE_TOKEN_WITH_USER_DELEGATION_KEY',
} as const;
export type ExchangeTokenType =
  | (typeof ExchangeTokenType)[keyof typeof ExchangeTokenType]
  | (string & {});

export interface CreateCustomOAuthAppIntegrationRequest {
  accountId?: string | undefined;
  /**
   * OAuth redirect URLs for the application. Each URL must use https, except loopback URLs
   * (localhost, 127.0.0.1 or ::1), which may use http. At most 100 URLs of at most 256 characters each.
   */
  redirectUrls?: string[] | undefined;
  /** Name of the custom OAuth app */
  name?: string | undefined;
  /**
   * Whether to create a confidential client that authenticates with a client secret.
   * Public clients receive no client secret.
   */
  confidential?: boolean | undefined;
  /**
   * Lifetimes of the tokens issued to the application. If omitted, access tokens are valid for 60 minutes
   * and refresh tokens for 7 days (10080 minutes). If set, both TTL fields are required.
   */
  tokenAccessPolicy?: TokenAccessPolicy | undefined;
  /**
   * OAuth scopes granted to the application. At least one scope is required.
   * Supported scopes: all-apis, sql, offline_access, openid, profile, email, and the fine-grained API
   * scopes listed at https://docs.databricks.com/api/account/scopes.
   */
  scopes?: string[] | undefined;
  /**
   * Scopes that will need to be consented by end user to mint the access token. If the user does
   * not authorize the access token will not be minted.
   * Must be a subset of scopes.
   */
  userAuthorizedScopes?: string[] | undefined;
}

export interface CreatePublishedOAuthAppIntegrationRequest {
  accountId?: string | undefined;
  /**
   * ID of the published OAuth app to enable, as returned in app_id by the list of published OAuth apps.
   * The short legacy IDs of the original published apps, such as power-bi and tableau-desktop, are also
   * accepted. The request fails if the app is already enabled for the account.
   */
  appId?: string | undefined;
  /**
   * Lifetimes of the tokens issued to the app. If omitted, the app's default token lifetimes apply.
   * If set, both TTL fields are required.
   */
  tokenAccessPolicy?: TokenAccessPolicy | undefined;
}

export interface CreatePublishedOAuthAppIntegrationResponse {
  /** ID of the published OAuth app integration. */
  integrationId?: string | undefined;
}

/** Partition by workspace or account */
export interface CredentialPartitionId {
  /** The ID of the workspace. */
  workspaceId?: bigint | undefined;
}

export interface CustomOAuthAppIntegration {
  /** ID of this custom app */
  integrationId?: string | undefined;
  /** OAuth client ID that the application uses as client_id in the OAuth flow. */
  clientId?: string | undefined;
  /** OAuth redirect URLs the application is allowed to use in the authorization flow. */
  redirectUrls?: string[] | undefined;
  /** The display name of the custom OAuth app */
  name?: string | undefined;
  /**
   * Whether the application is a confidential client that authenticates with a client secret.
   * Public clients have no client secret.
   */
  confidential?: boolean | undefined;
  /** Lifetimes of the access and refresh tokens issued to the application. */
  tokenAccessPolicy?: TokenAccessPolicy | undefined;
  /** OAuth scopes the application is allowed to request. */
  scopes?: string[] | undefined;
  /** ID of the user who created the integration. */
  createdBy?: bigint | undefined;
  /** Time the integration was created, as an ISO 8601 timestamp. */
  createTime?: string | undefined;
  /**
   * Username of the user who created the integration. Only returned by the list method when
   * include_creator_username is true.
   */
  creatorUsername?: string | undefined;
  /**
   * Scopes that will need to be consented by end user to mint the access token. If the user does
   * not authorize the access token will not be minted.
   * Must be a subset of scopes.
   */
  userAuthorizedScopes?: string[] | undefined;
}

export interface CustomOAuthAppIntegrationSecret {
  /** Unique integration id for the custom OAuth app */
  integrationId?: string | undefined;
  /** OAuth client ID generated by <Databricks>. */
  clientId?: string | undefined;
  /**
   * OAuth client secret generated by <Databricks> for confidential apps; empty for public apps.
   * It is only returned in this response and cannot be retrieved later, so store it securely.
   */
  clientSecret?: string | undefined;
}

export interface DeleteCustomOAuthAppIntegrationRequest {
  accountId?: string | undefined;
  /** ID of the custom OAuth app integration to delete. */
  integrationId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteCustomOAuthAppIntegrationResponse {}

export interface DeletePublishedOAuthAppIntegrationRequest {
  accountId?: string | undefined;
  /** ID of the published OAuth app integration to delete. */
  integrationId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeletePublishedOAuthAppIntegrationResponse {}

/** The exchange token is the result of the token exchange with the IdP */
export interface ExchangeToken {
  /** The type of this exchange token */
  tokenType?: ExchangeTokenType | undefined;
  /** The requested token. */
  credential?: string | undefined;
  /** The scopes of access granted in the token. */
  scopes?: string[] | undefined;
  /** The end-of-life timestamp of the token. The value is in milliseconds since the Unix epoch. */
  credentialEolTime?: bigint | undefined;
  /** User ID of the user that owns this token. */
  ownerId?: bigint | undefined;
}

/** Exchange a token with the IdP */
export interface ExchangeTokenExchangeRequest {
  /** The partition of Credentials store */
  partitionId: CredentialPartitionId;
  /** A list of token types being requested */
  tokenType?: ExchangeTokenType[] | undefined;
  /** Array of scopes for the token request. */
  scopes?: string[] | undefined;
}

/** Exhanged tokens were successfully returned. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ExchangeTokenExchangeRequest_Response {
  values?: ExchangeToken[] | undefined;
}

export interface GetCustomOAuthAppIntegrationRequest {
  /** The account ID. */
  accountId?: string | undefined;
  /** The OAuth app integration ID. */
  integrationId?: string | undefined;
}

export interface GetPublishedOAuthAppIntegrationRequest {
  accountId?: string | undefined;
  /** ID of the published OAuth app integration. */
  integrationId?: string | undefined;
}

export interface ListCustomOAuthAppIntegrationsRequest {
  accountId?: string | undefined;
  /** Token from the next_page_token field of a previous response. Omit it to request the first page. */
  pageToken?: string | undefined;
  /** Maximum number of integrations to return in one page, at most 1000. */
  pageSize?: number | undefined;
  /** When true, each returned integration includes creator_username. */
  includeCreatorUsername?: boolean | undefined;
}

export interface ListCustomOAuthAppIntegrationsResponse {
  /** List of Custom OAuth App Integrations defined for the account. */
  apps?: CustomOAuthAppIntegration[] | undefined;
  /** Token for the next page of results. If not present, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface ListPublishedOAuthAppIntegrationsRequest {
  accountId?: string | undefined;
  /** Token from the next_page_token field of a previous response. Omit it to request the first page. */
  pageToken?: string | undefined;
  /** Maximum number of integrations to return in one page, at most 1000. */
  pageSize?: number | undefined;
}

export interface ListPublishedOAuthAppIntegrationsResponse {
  /** List of Published OAuth App Integrations defined for the account. */
  apps?: PublishedOAuthAppIntegration[] | undefined;
  /** Token for the next page of results. If not present, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface ListPublishedOAuthAppsRequest {
  /** The account ID. */
  accountId?: string | undefined;
  /** A token that can be used to get the next page of results. */
  pageToken?: string | undefined;
  /** The max number of OAuth published apps to return in one page. */
  pageSize?: number | undefined;
}

export interface ListPublishedOAuthAppsResponse {
  /** List of Published OAuth Apps. */
  apps?: PublishedOAuthApp[] | undefined;
  /** A token that can be used to get the next page of results. If not present, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface PublishedOAuthApp {
  /** Unique ID of the published OAuth app. */
  appId?: string | undefined;
  /** Client ID of the published OAuth app. The app sends it as client_id in the OAuth flow. */
  clientId?: string | undefined;
  /** The display name of the published OAuth app. */
  name?: string | undefined;
  /** Description of the published OAuth app. */
  description?: string | undefined;
  /** Whether the published OAuth app is a confidential client. It is always false for published OAuth apps. */
  isConfidentialClient?: boolean | undefined;
  /** Redirect URLs of the published OAuth app. */
  redirectUrls?: string[] | undefined;
  /** Required scopes for the published OAuth app. */
  scopes?: string[] | undefined;
}

/**
 * A published OAuth app integration enables an OAuth app published by <Databricks>, such as Power BI
 * or Tableau Desktop, for the account. <Databricks> manages the app's client ID, redirect URLs and
 * scopes; the integration only sets the lifetimes of the tokens issued to the app. To register your
 * own application, use a custom OAuth app integration instead. See
 * https://docs.databricks.com/aws/en/integrations/enable-disable-oauth.
 */
export interface PublishedOAuthAppIntegration {
  /** ID of the published OAuth app, as returned in app_id by the list of published OAuth apps. */
  appId?: string | undefined;
  /** ID of the published OAuth app integration in the account. */
  integrationId?: string | undefined;
  /** Display name of the published OAuth app. */
  name?: string | undefined;
  /** Lifetimes of the access and refresh tokens issued to the app. */
  tokenAccessPolicy?: TokenAccessPolicy | undefined;
  /** ID of the user who created the integration. */
  createdBy?: bigint | undefined;
  /** Time the integration was created, as an ISO 8601 timestamp. */
  createTime?: string | undefined;
}

export interface TokenAccessPolicy {
  /** Lifetime of access tokens, in minutes. */
  accessTokenTtlInMinutes?: number | undefined;
  /**
   * Lifetime of refresh tokens, in minutes. Must not be shorter than access_token_ttl_in_minutes.
   * When single-use refresh tokens are enabled, this represents the TTL of an individual refresh token.
   * If the refresh token is used before it expires, a new one is issued with a renewed individual TTL.
   */
  refreshTokenTtlInMinutes?: number | undefined;
  /**
   * Whether to enable single-use refresh tokens (refresh token rotation).
   * If this feature is enabled, upon successfully getting a new access token using a refresh token, <Databricks> will
   * issue a new refresh token along with the access token in the response and invalidate the old refresh token.
   * The client should use the new refresh token to get access tokens in future requests.
   */
  enableSingleUseRefreshTokens?: boolean | undefined;
  /**
   * Absolute OAuth session TTL in minutes. Can only be set when enable_single_use_refresh_tokens is true, and must
   * be at least refresh_token_ttl_in_minutes and at most 525600 (one year).
   * This is the absolute TTL of all refresh tokens issued in one OAuth session. When a new refresh token is issued
   * during refresh token rotation, it will inherit the same absolute TTL as the old refresh token.
   * In other words, this represents the maximum amount of time a user can stay logged in without re-authenticating.
   */
  absoluteSessionLifetimeInMinutes?: number | undefined;
}

export interface UpdateCustomOAuthAppIntegrationRequest {
  accountId?: string | undefined;
  /** ID of the custom OAuth app integration to update. */
  integrationId?: string | undefined;
  /** New OAuth redirect URLs for the application. Replaces the existing list; same constraints as on create. */
  redirectUrls?: string[] | undefined;
  /**
   * New token lifetimes for the application. Both TTL fields are required when the policy is set;
   * the single-use refresh token settings keep their current values when omitted.
   */
  tokenAccessPolicy?: TokenAccessPolicy | undefined;
  /**
   * List of OAuth scopes to be updated in the custom OAuth app integration, similar to redirect URIs this will fully
   * replace the existing values instead of appending
   */
  scopes?: string[] | undefined;
  /**
   * Scopes that will need to be consented by end user to mint the access token. If the user does
   * not authorize the access token will not be minted.
   * Must be a subset of scopes.
   */
  userAuthorizedScopes?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateCustomOAuthAppIntegrationResponse {}

export interface UpdatePublishedOAuthAppIntegrationRequest {
  accountId?: string | undefined;
  /** ID of the published OAuth app integration to update. */
  integrationId?: string | undefined;
  /**
   * New token lifetimes for the app. Both TTL fields are required when the policy is set; the
   * single-use refresh token settings keep their current values when omitted. If the policy is
   * omitted, the integration is left unchanged.
   */
  tokenAccessPolicy?: TokenAccessPolicy | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdatePublishedOAuthAppIntegrationResponse {}

export const unmarshalCreatePublishedOAuthAppIntegrationResponseSchema: z.ZodType<CreatePublishedOAuthAppIntegrationResponse> =
  z
    .object({
      integration_id: z.string().optional(),
    })
    .transform(d => ({
      integrationId: d.integration_id,
    }));

export const unmarshalCustomOAuthAppIntegrationSchema: z.ZodType<CustomOAuthAppIntegration> =
  z
    .object({
      integration_id: z.string().optional(),
      client_id: z.string().optional(),
      redirect_urls: z.array(z.string()).optional(),
      name: z.string().optional(),
      confidential: z.boolean().optional(),
      token_access_policy: z
        .lazy(() => unmarshalTokenAccessPolicySchema)
        .nullish()
        .transform(v => v ?? undefined),
      scopes: z.array(z.string()).optional(),
      created_by: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      create_time: z.string().optional(),
      creator_username: z.string().optional(),
      user_authorized_scopes: z.array(z.string()).optional(),
    })
    .transform(d => ({
      integrationId: d.integration_id,
      clientId: d.client_id,
      redirectUrls: d.redirect_urls,
      name: d.name,
      confidential: d.confidential,
      tokenAccessPolicy: d.token_access_policy,
      scopes: d.scopes,
      createdBy: d.created_by,
      createTime: d.create_time,
      creatorUsername: d.creator_username,
      userAuthorizedScopes: d.user_authorized_scopes,
    }));

export const unmarshalCustomOAuthAppIntegrationSecretSchema: z.ZodType<CustomOAuthAppIntegrationSecret> =
  z
    .object({
      integration_id: z.string().optional(),
      client_id: z.string().optional(),
      client_secret: z.string().optional(),
    })
    .transform(d => ({
      integrationId: d.integration_id,
      clientId: d.client_id,
      clientSecret: d.client_secret,
    }));

export const unmarshalDeleteCustomOAuthAppIntegrationResponseSchema: z.ZodType<DeleteCustomOAuthAppIntegrationResponse> =
  z.object({});

export const unmarshalDeletePublishedOAuthAppIntegrationResponseSchema: z.ZodType<DeletePublishedOAuthAppIntegrationResponse> =
  z.object({});

export const unmarshalExchangeTokenSchema: z.ZodType<ExchangeToken> = z
  .object({
    tokenType: z.string().optional(),
    credential: z.string().optional(),
    scopes: z.array(z.string()).optional(),
    credentialEolTime: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    ownerId: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    tokenType: d.tokenType,
    credential: d.credential,
    scopes: d.scopes,
    credentialEolTime: d.credentialEolTime,
    ownerId: d.ownerId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalExchangeTokenExchangeRequest_ResponseSchema: z.ZodType<ExchangeTokenExchangeRequest_Response> =
  z
    .object({
      values: z.array(z.lazy(() => unmarshalExchangeTokenSchema)).optional(),
    })
    .transform(d => ({
      values: d.values,
    }));

export const unmarshalListCustomOAuthAppIntegrationsResponseSchema: z.ZodType<ListCustomOAuthAppIntegrationsResponse> =
  z
    .object({
      apps: z
        .array(z.lazy(() => unmarshalCustomOAuthAppIntegrationSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      apps: d.apps,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListPublishedOAuthAppIntegrationsResponseSchema: z.ZodType<ListPublishedOAuthAppIntegrationsResponse> =
  z
    .object({
      apps: z
        .array(z.lazy(() => unmarshalPublishedOAuthAppIntegrationSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      apps: d.apps,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListPublishedOAuthAppsResponseSchema: z.ZodType<ListPublishedOAuthAppsResponse> =
  z
    .object({
      apps: z.array(z.lazy(() => unmarshalPublishedOAuthAppSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      apps: d.apps,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalPublishedOAuthAppSchema: z.ZodType<PublishedOAuthApp> = z
  .object({
    app_id: z.string().optional(),
    client_id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    is_confidential_client: z.boolean().optional(),
    redirect_urls: z.array(z.string()).optional(),
    scopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    appId: d.app_id,
    clientId: d.client_id,
    name: d.name,
    description: d.description,
    isConfidentialClient: d.is_confidential_client,
    redirectUrls: d.redirect_urls,
    scopes: d.scopes,
  }));

export const unmarshalPublishedOAuthAppIntegrationSchema: z.ZodType<PublishedOAuthAppIntegration> =
  z
    .object({
      app_id: z.string().optional(),
      integration_id: z.string().optional(),
      name: z.string().optional(),
      token_access_policy: z
        .lazy(() => unmarshalTokenAccessPolicySchema)
        .nullish()
        .transform(v => v ?? undefined),
      created_by: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      create_time: z.string().optional(),
    })
    .transform(d => ({
      appId: d.app_id,
      integrationId: d.integration_id,
      name: d.name,
      tokenAccessPolicy: d.token_access_policy,
      createdBy: d.created_by,
      createTime: d.create_time,
    }));

export const unmarshalTokenAccessPolicySchema: z.ZodType<TokenAccessPolicy> = z
  .object({
    access_token_ttl_in_minutes: z.number().optional(),
    refresh_token_ttl_in_minutes: z.number().optional(),
    enable_single_use_refresh_tokens: z.boolean().optional(),
    absolute_session_lifetime_in_minutes: z.number().optional(),
  })
  .transform(d => ({
    accessTokenTtlInMinutes: d.access_token_ttl_in_minutes,
    refreshTokenTtlInMinutes: d.refresh_token_ttl_in_minutes,
    enableSingleUseRefreshTokens: d.enable_single_use_refresh_tokens,
    absoluteSessionLifetimeInMinutes: d.absolute_session_lifetime_in_minutes,
  }));

export const unmarshalUpdateCustomOAuthAppIntegrationResponseSchema: z.ZodType<UpdateCustomOAuthAppIntegrationResponse> =
  z.object({});

export const unmarshalUpdatePublishedOAuthAppIntegrationResponseSchema: z.ZodType<UpdatePublishedOAuthAppIntegrationResponse> =
  z.object({});

export const marshalCreateCustomOAuthAppIntegrationRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    redirectUrls: z.array(z.string()).optional(),
    name: z.string().optional(),
    confidential: z.boolean().optional(),
    tokenAccessPolicy: z.lazy(() => marshalTokenAccessPolicySchema).optional(),
    scopes: z.array(z.string()).optional(),
    userAuthorizedScopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    redirect_urls: d.redirectUrls,
    name: d.name,
    confidential: d.confidential,
    token_access_policy: d.tokenAccessPolicy,
    scopes: d.scopes,
    user_authorized_scopes: d.userAuthorizedScopes,
  }));

export const marshalCreatePublishedOAuthAppIntegrationRequestSchema: z.ZodType =
  z
    .object({
      accountId: z.string().optional(),
      appId: z.string().optional(),
      tokenAccessPolicy: z
        .lazy(() => marshalTokenAccessPolicySchema)
        .optional(),
    })
    .transform(d => ({
      account_id: d.accountId,
      app_id: d.appId,
      token_access_policy: d.tokenAccessPolicy,
    }));

export const marshalCredentialPartitionIdSchema: z.ZodType = z
  .object({
    workspaceId: z.bigint().optional(),
  })
  .transform(d => ({
    workspaceId: d.workspaceId,
  }));

export const marshalExchangeTokenExchangeRequestSchema: z.ZodType = z
  .object({
    partitionId: z.lazy(() => marshalCredentialPartitionIdSchema),
    tokenType: z.array(z.string()).optional(),
    scopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    partitionId: d.partitionId,
    tokenType: d.tokenType,
    scopes: d.scopes,
  }));

export const marshalTokenAccessPolicySchema: z.ZodType = z
  .object({
    accessTokenTtlInMinutes: z.number().optional(),
    refreshTokenTtlInMinutes: z.number().optional(),
    enableSingleUseRefreshTokens: z.boolean().optional(),
    absoluteSessionLifetimeInMinutes: z.number().optional(),
  })
  .transform(d => ({
    access_token_ttl_in_minutes: d.accessTokenTtlInMinutes,
    refresh_token_ttl_in_minutes: d.refreshTokenTtlInMinutes,
    enable_single_use_refresh_tokens: d.enableSingleUseRefreshTokens,
    absolute_session_lifetime_in_minutes: d.absoluteSessionLifetimeInMinutes,
  }));

export const marshalUpdateCustomOAuthAppIntegrationRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    integrationId: z.string().optional(),
    redirectUrls: z.array(z.string()).optional(),
    tokenAccessPolicy: z.lazy(() => marshalTokenAccessPolicySchema).optional(),
    scopes: z.array(z.string()).optional(),
    userAuthorizedScopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    integration_id: d.integrationId,
    redirect_urls: d.redirectUrls,
    token_access_policy: d.tokenAccessPolicy,
    scopes: d.scopes,
    user_authorized_scopes: d.userAuthorizedScopes,
  }));

export const marshalUpdatePublishedOAuthAppIntegrationRequestSchema: z.ZodType =
  z
    .object({
      accountId: z.string().optional(),
      integrationId: z.string().optional(),
      tokenAccessPolicy: z
        .lazy(() => marshalTokenAccessPolicySchema)
        .optional(),
    })
    .transform(d => ({
      account_id: d.accountId,
      integration_id: d.integrationId,
      token_access_policy: d.tokenAccessPolicy,
    }));
