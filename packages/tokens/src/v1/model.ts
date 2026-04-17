// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask, type FieldPaths} from '@databricks/sdk-core/wkt';
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

export interface CreateToken {
  /**
   * The lifetime of the token, in seconds.
   * 
   * If the lifetime is not specified, this token remains valid for 2 years.
   */
  lifetimeSeconds?: number | undefined;
  /** Optional description to attach to the token. */
  comment?: string | undefined;
  /** Optional scopes of the token. */
  scopes?: string[] | undefined;
  /**
   * Whether to enable autoscoping for this token. When true, the token will
   * automatically collect inferred API path scopes as it is used.
   */
  autoscopeEnabled?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateToken_Response {
  /** The value of the new token. */
  tokenValue?: string | undefined;
  /** The information for the new token. */
  tokenInfo?: PublicTokenInfo | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListTokens {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListTokens_Response {
  /** The information for each token. */
  tokenInfos?: PublicTokenInfo[] | undefined;
}

export interface PublicTokenInfo {
  /** The ID of this token. */
  tokenId?: string | undefined;
  /** Server time (in epoch milliseconds) when the token was created. */
  creationTime?: number | undefined;
  /** Server time (in epoch milliseconds) when the token will expire, or -1 if not applicable. */
  expiryTime?: number | undefined;
  /** Comment the token was created with, if applicable. */
  comment?: string | undefined;
  /** Scope of the token was created with, if applicable. */
  scopes?: string[] | undefined;
  /** Server time (in epoch milliseconds) when the token was accessed most recently. */
  lastAccessedTime?: number | undefined;
  /** Output only. The autoscope state of this token. */
  autoscopeState?: AutoscopeState | undefined;
  /** Output only. Inferred API path scopes collected for this token when autoscope is enabled. */
  inferredScopes?: string[] | undefined;
  /** Output only. Scopes inferred from offline backfill processing. */
  backfillScopes?: string[] | undefined;
}

export interface RevokeToken {
  /** The ID of the token to be revoked. */
  tokenId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface RevokeToken_Response {}

export interface UpdateToken {
  /** The SHA-256 hash of the token to be updated. */
  tokenId?: string | undefined;
  token?: PublicTokenInfo | undefined;
  /** A list of field name under PublicTokenInfo, For example in request use {"update_mask": "comment,scopes"} */
  updateMask?: FieldMask<FieldPaths<PublicTokenInfo>> | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateTokenResponse {}

export const unmarshalCreateTokenSchema: z.ZodType<CreateToken> = z
  .object({
    lifetime_seconds: z.number().optional(),
    comment: z.string().optional(),
    scopes: z.array(z.string()).optional(),
    autoscope_enabled: z.boolean().optional(),
  })
  .transform(d => ({
    lifetimeSeconds: d.lifetime_seconds,
    comment: d.comment,
    scopes: d.scopes,
    autoscopeEnabled: d.autoscope_enabled,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateToken_ResponseSchema: z.ZodType<CreateToken_Response> = z
  .object({
    token_value: z.string().optional(),
    token_info: z.lazy(() => unmarshalPublicTokenInfoSchema).optional(),
  })
  .transform(d => ({
    tokenValue: d.token_value,
    tokenInfo: d.token_info,
  }));

export const unmarshalListTokensSchema: z.ZodType<ListTokens> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListTokens_ResponseSchema: z.ZodType<ListTokens_Response> = z
  .object({
    token_infos: z.array(z.lazy(() => unmarshalPublicTokenInfoSchema)).optional(),
  })
  .transform(d => ({
    tokenInfos: d.token_infos,
  }));

export const unmarshalPublicTokenInfoSchema: z.ZodType<PublicTokenInfo> = z
  .object({
    token_id: z.string().optional(),
    creation_time: z.number().optional(),
    expiry_time: z.number().optional(),
    comment: z.string().optional(),
    scopes: z.array(z.string()).optional(),
    last_accessed_time: z.number().optional(),
    autoscope_state: z.enum(AutoscopeState).optional(),
    inferred_scopes: z.array(z.string()).optional(),
    backfill_scopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    tokenId: d.token_id,
    creationTime: d.creation_time,
    expiryTime: d.expiry_time,
    comment: d.comment,
    scopes: d.scopes,
    lastAccessedTime: d.last_accessed_time,
    autoscopeState: d.autoscope_state,
    inferredScopes: d.inferred_scopes,
    backfillScopes: d.backfill_scopes,
  }));

export const unmarshalRevokeTokenSchema: z.ZodType<RevokeToken> = z
  .object({
    token_id: z.string().optional(),
  })
  .transform(d => ({
    tokenId: d.token_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRevokeToken_ResponseSchema: z.ZodType<RevokeToken_Response> = z
  .object({
  });

export const unmarshalUpdateTokenSchema: z.ZodType<UpdateToken> = z
  .object({
    token_id: z.string().optional(),
    token: z.lazy(() => unmarshalPublicTokenInfoSchema).optional(),
    update_mask: z.string().transform(s => FieldMask.of(...(s === '' ? [] : s.split(','))) as FieldMask<FieldPaths<PublicTokenInfo>>).optional(),
  })
  .transform(d => ({
    tokenId: d.token_id,
    token: d.token,
    updateMask: d.update_mask,
  }));

export const unmarshalUpdateTokenResponseSchema: z.ZodType<UpdateTokenResponse> = z
  .object({
  });

export const marshalCreateTokenSchema: z.ZodType = z
  .object({
    lifetimeSeconds: z.number().optional(),
    comment: z.string().optional(),
    scopes: z.array(z.string()).optional(),
    autoscopeEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    lifetime_seconds: d.lifetimeSeconds,
    comment: d.comment,
    scopes: d.scopes,
    autoscope_enabled: d.autoscopeEnabled,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCreateToken_ResponseSchema: z.ZodType = z
  .object({
    tokenValue: z.string().optional(),
    tokenInfo: z.lazy(() => marshalPublicTokenInfoSchema).optional(),
  })
  .transform(d => ({
    token_value: d.tokenValue,
    token_info: d.tokenInfo,
  }));

export const marshalListTokensSchema: z.ZodType = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListTokens_ResponseSchema: z.ZodType = z
  .object({
    tokenInfos: z.array(z.lazy(() => marshalPublicTokenInfoSchema)).optional(),
  })
  .transform(d => ({
    token_infos: d.tokenInfos,
  }));

export const marshalPublicTokenInfoSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
    creationTime: z.number().optional(),
    expiryTime: z.number().optional(),
    comment: z.string().optional(),
    scopes: z.array(z.string()).optional(),
    lastAccessedTime: z.number().optional(),
    autoscopeState: z.enum(AutoscopeState).optional(),
    inferredScopes: z.array(z.string()).optional(),
    backfillScopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
    creation_time: d.creationTime,
    expiry_time: d.expiryTime,
    comment: d.comment,
    scopes: d.scopes,
    last_accessed_time: d.lastAccessedTime,
    autoscope_state: d.autoscopeState,
    inferred_scopes: d.inferredScopes,
    backfill_scopes: d.backfillScopes,
  }));

export const marshalRevokeTokenSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRevokeToken_ResponseSchema: z.ZodType = z
  .object({
  });

export const marshalUpdateTokenSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
    token: z.lazy(() => marshalPublicTokenInfoSchema).optional(),
    updateMask: z.any().transform((d: FieldMask<FieldPaths<PublicTokenInfo>>) => d.paths.join(',')).optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
    token: d.token,
    update_mask: d.updateMask,
  }));

export const marshalUpdateTokenResponseSchema: z.ZodType = z
  .object({
  });
