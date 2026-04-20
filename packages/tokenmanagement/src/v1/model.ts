// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * State of inferred scope collection (autoscope) for an external PAT.
 * Mirrored in databricks.identity.AutoscopeState in common/principal-context/api/proto/tokendetails.proto.
 * Token store and token management proto can depend on this.
 * Principal context proto should NOT depend on this proto definitions because too many services depend on the principal context proto.
 */
export enum AutoscopeState {
  AUTOSCOPE_STATE_UNSPECIFIED = 'AUTOSCOPE_STATE_UNSPECIFIED',
  AUTOSCOPE_STATE_DISABLED = 'AUTOSCOPE_STATE_DISABLED',
  AUTOSCOPE_STATE_RUNNING = 'AUTOSCOPE_STATE_RUNNING',
  AUTOSCOPE_STATE_COMPLETED = 'AUTOSCOPE_STATE_COMPLETED',
  AUTOSCOPE_STATE_BACKFILLED = 'AUTOSCOPE_STATE_BACKFILLED',
  AUTOSCOPE_STATE_USER_SELECTED = 'AUTOSCOPE_STATE_USER_SELECTED',
  AUTOSCOPE_STATE_API_NOT_COVERED = 'AUTOSCOPE_STATE_API_NOT_COVERED',
}

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
  /** Scope of the token was created with, if applicable. */
  scopes?: string[] | undefined;
  /** Output only. The autoscope state of this token. */
  autoscopeState?: AutoscopeState | undefined;
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
  /** Whether to enable autoscoping for this token. */
  autoscopeEnabled?: boolean | undefined;
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

export interface UpdateToken {
  token?: AdminTokenInfo | undefined;
  /** A list of field name under AdminTokenInfo, For example in request use {"update_mask": "comment,scopes"} */
  updateMask?: string | undefined;
}

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
    scopes: z.array(z.string()).optional(),
    autoscope_state: z.enum(AutoscopeState).optional(),
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
    scopes: d.scopes,
    autoscopeState: d.autoscope_state,
  }));

export const unmarshalCreateOnBehalfOfTokenSchema: z.ZodType<CreateOnBehalfOfToken> =
  z
    .object({
      application_id: z.string().optional(),
      lifetime_seconds: z.number().optional(),
      comment: z.string().optional(),
      scopes: z.array(z.string()).optional(),
      autoscope_enabled: z.boolean().optional(),
    })
    .transform(d => ({
      applicationId: d.application_id,
      lifetimeSeconds: d.lifetime_seconds,
      comment: d.comment,
      scopes: d.scopes,
      autoscopeEnabled: d.autoscope_enabled,
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

export const unmarshalGetTokenSchema: z.ZodType<GetToken> = z
  .object({
    token_id: z.string().optional(),
  })
  .transform(d => ({
    tokenId: d.token_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetToken_ResponseSchema: z.ZodType<GetToken_Response> = z
  .object({
    token_info: z.lazy(() => unmarshalAdminTokenInfoSchema).optional(),
  })
  .transform(d => ({
    tokenInfo: d.token_info,
  }));

export const unmarshalListTokensSchema: z.ZodType<ListTokens> = z
  .object({
    created_by_id: z.number().optional(),
    created_by_username: z.string().optional(),
  })
  .transform(d => ({
    createdById: d.created_by_id,
    createdByUsername: d.created_by_username,
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

export const unmarshalRevokeTokenSchema: z.ZodType<RevokeToken> = z
  .object({
    token_id: z.string().optional(),
  })
  .transform(d => ({
    tokenId: d.token_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRevokeToken_ResponseSchema: z.ZodType<RevokeToken_Response> =
  z.object({});

export const unmarshalUpdateTokenSchema: z.ZodType<UpdateToken> = z
  .object({
    token: z.lazy(() => unmarshalAdminTokenInfoSchema).optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    token: d.token,
    updateMask: d.update_mask,
  }));

export const marshalAdminTokenInfoSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
    creationTime: z.number().optional(),
    expiryTime: z.number().optional(),
    comment: z.string().optional(),
    createdById: z.number().optional(),
    createdByUsername: z.string().optional(),
    ownerId: z.number().optional(),
    workspaceId: z.number().optional(),
    lastUsedDay: z.number().optional(),
    scopes: z.array(z.string()).optional(),
    autoscopeState: z.enum(AutoscopeState).optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
    creation_time: d.creationTime,
    expiry_time: d.expiryTime,
    comment: d.comment,
    created_by_id: d.createdById,
    created_by_username: d.createdByUsername,
    owner_id: d.ownerId,
    workspace_id: d.workspaceId,
    last_used_day: d.lastUsedDay,
    scopes: d.scopes,
    autoscope_state: d.autoscopeState,
  }));

export const marshalCreateOnBehalfOfTokenSchema: z.ZodType = z
  .object({
    applicationId: z.string().optional(),
    lifetimeSeconds: z.number().optional(),
    comment: z.string().optional(),
    scopes: z.array(z.string()).optional(),
    autoscopeEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    application_id: d.applicationId,
    lifetime_seconds: d.lifetimeSeconds,
    comment: d.comment,
    scopes: d.scopes,
    autoscope_enabled: d.autoscopeEnabled,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCreateOnBehalfOfToken_ResponseSchema: z.ZodType = z
  .object({
    tokenValue: z.string().optional(),
    tokenInfo: z.lazy(() => marshalAdminTokenInfoSchema).optional(),
  })
  .transform(d => ({
    token_value: d.tokenValue,
    token_info: d.tokenInfo,
  }));

export const marshalGetTokenSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetToken_ResponseSchema: z.ZodType = z
  .object({
    tokenInfo: z.lazy(() => marshalAdminTokenInfoSchema).optional(),
  })
  .transform(d => ({
    token_info: d.tokenInfo,
  }));

export const marshalListTokensSchema: z.ZodType = z
  .object({
    createdById: z.number().optional(),
    createdByUsername: z.string().optional(),
  })
  .transform(d => ({
    created_by_id: d.createdById,
    created_by_username: d.createdByUsername,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListTokens_ResponseSchema: z.ZodType = z
  .object({
    tokenInfos: z.array(z.lazy(() => marshalAdminTokenInfoSchema)).optional(),
  })
  .transform(d => ({
    token_infos: d.tokenInfos,
  }));

export const marshalRevokeTokenSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRevokeToken_ResponseSchema: z.ZodType = z.object({});

export const marshalUpdateTokenSchema: z.ZodType = z
  .object({
    token: z.lazy(() => marshalAdminTokenInfoSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    token: d.token,
    update_mask: d.updateMask,
  }));
