// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface AdminTokenInfo {
  /** ID of the token. */
  tokenId?: string | undefined;
  /** Timestamp when the token was created. */
  creationTime?: number | undefined;
  /** Timestamp when the token expires. */
  expiryTime?: number | undefined;
  /** Comment that describes the purpose of the token, specified by the token creator. */
  comment?: string | undefined;
  /** User ID of the user that created the token. */
  createdById?: number | undefined;
  /** Username of the user that created the token. */
  createdByUsername?: string | undefined;
  /** User ID of the user that owns the token. */
  ownerId?: number | undefined;
  /** If applicable, the ID of the workspace that the token was created in. */
  workspaceId?: number | undefined;
  /** Approximate timestamp for the day the token was last used. Accurate up to 1 day. */
  lastUsedDay?: number | undefined;
}

/** Configuration details for creating on-behalf tokens. */
export interface CreateOnBehalfOfToken {
  /** Application ID of the service principal. */
  applicationId?: string | undefined;
  /** The number of seconds before the token expires. */
  lifetimeSeconds?: number | undefined;
  /** Comment that describes the purpose of the token. */
  comment?: string | undefined;
  scopes?: string[] | undefined;
}

/** An on-behalf token was successfully created for the service principal. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateOnBehalfOfToken_Response {
  /** Value of the token. */
  tokenValue?: string | undefined;
  tokenInfo?: AdminTokenInfo | undefined;
}

/**
 * !! KEEP THIS IN-SYNC WITH THE WORKSPACE PROTO DEFINITIONS IN SERVICE.PROTO !!
 *
 * The only differences should be:
 * 1. The OpenAPI labels.
 * 2. The account_id request parameter.
 */
export interface GetToken {
  /** The ID of the token to get. */
  tokenId?: string | undefined;
}

/** Token with specified Token ID was successfully returned. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetToken_Response {
  tokenInfo?: AdminTokenInfo | undefined;
}

/**
 * !! KEEP THIS IN-SYNC WITH THE ACCOUNT PROTO DEFINITIONS IN ACCOUNT_SERVICE.PROTO !!
 *
 * The only differences should be:
 * 1. The OpenAPI labels.
 * 2. The account_id request parameter.
 * 3. The string filter parameter instead of hard-coded filters.
 */
export interface ListTokens {
  /** User ID of the user that created the token. */
  createdById?: number | undefined;
  /** Username of the user that created the token. */
  createdByUsername?: string | undefined;
}

/** Tokens were successfully returned. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListTokens_Response {
  /** Token metadata of each user-created token in the workspace */
  tokenInfos?: AdminTokenInfo[] | undefined;
}

export interface RevokeToken {
  /** The ID of the token to revoke. */
  tokenId?: string | undefined;
}

/** The token was successfully deleted. */
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface RevokeToken_Response {}

export const unmarshalAdminTokenInfoSchema: z.ZodType<AdminTokenInfo> = z
  .object({
    token_id: z.string().optional(),
    creation_time: z.number().optional(),
    expiry_time: z.number().optional(),
    comment: z.string().optional(),
    created_by_id: z.number().optional(),
    created_by_username: z.string().optional(),
    owner_id: z.number().optional(),
    workspace_id: z.number().optional(),
    last_used_day: z.number().optional(),
  })
  .transform(d => ({
    tokenId: d.token_id,
    creationTime: d.creation_time,
    expiryTime: d.expiry_time,
    comment: d.comment,
    createdById: d.created_by_id,
    createdByUsername: d.created_by_username,
    ownerId: d.owner_id,
    workspaceId: d.workspace_id,
    lastUsedDay: d.last_used_day,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateOnBehalfOfToken_ResponseSchema: z.ZodType<CreateOnBehalfOfToken_Response> =
  z
    .object({
      token_value: z.string().optional(),
      token_info: z.lazy(() => unmarshalAdminTokenInfoSchema).optional(),
    })
    .transform(d => ({
      tokenValue: d.token_value,
      tokenInfo: d.token_info,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetToken_ResponseSchema: z.ZodType<GetToken_Response> = z
  .object({
    token_info: z.lazy(() => unmarshalAdminTokenInfoSchema).optional(),
  })
  .transform(d => ({
    tokenInfo: d.token_info,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListTokens_ResponseSchema: z.ZodType<ListTokens_Response> =
  z
    .object({
      token_infos: z
        .array(z.lazy(() => unmarshalAdminTokenInfoSchema))
        .optional(),
    })
    .transform(d => ({
      tokenInfos: d.token_infos,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRevokeToken_ResponseSchema: z.ZodType<RevokeToken_Response> =
  z.object({});

export const marshalCreateOnBehalfOfTokenSchema: z.ZodType = z
  .object({
    applicationId: z.string().optional(),
    lifetimeSeconds: z.number().optional(),
    comment: z.string().optional(),
    scopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    application_id: d.applicationId,
    lifetime_seconds: d.lifetimeSeconds,
    comment: d.comment,
    scopes: d.scopes,
  }));
