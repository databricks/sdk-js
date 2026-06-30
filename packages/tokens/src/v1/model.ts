// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/**
 * State of inferred scope collection (autoscope) for an external PAT.
 * Mirrored in databricks.identity.AutoscopeState in common/principal-context/api/proto/tokendetails.proto.
 * Token store and token management proto can depend on this.
 * Principal context proto should NOT depend on this proto definitions because too many services depend on the principal context proto.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AutoscopeState = {
  AUTOSCOPE_STATE_UNSPECIFIED: 'AUTOSCOPE_STATE_UNSPECIFIED',
  AUTOSCOPE_STATE_DISABLED: 'AUTOSCOPE_STATE_DISABLED',
  AUTOSCOPE_STATE_RUNNING: 'AUTOSCOPE_STATE_RUNNING',
  AUTOSCOPE_STATE_COMPLETED: 'AUTOSCOPE_STATE_COMPLETED',
  AUTOSCOPE_STATE_BACKFILLED: 'AUTOSCOPE_STATE_BACKFILLED',
  AUTOSCOPE_STATE_USER_SELECTED: 'AUTOSCOPE_STATE_USER_SELECTED',
  AUTOSCOPE_STATE_API_NOT_COVERED: 'AUTOSCOPE_STATE_API_NOT_COVERED',
} as const;
export type AutoscopeState =
  | (typeof AutoscopeState)[keyof typeof AutoscopeState]
  | (string & {});

export interface CreateTokenRequest {
  /**
   * The lifetime of the token, in seconds.
   *
   * If the lifetime is not specified, this token remains valid for 2 years.
   */
  lifetimeSeconds?: bigint | undefined;
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

export interface CreateTokenResponse {
  /** The value of the new token. */
  tokenValue?: string | undefined;
  /** The information for the new token. */
  tokenInfo?: PublicTokenInfo | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListTokensRequest {}

export interface ListTokensResponse {
  /** The information for each token. */
  tokenInfos?: PublicTokenInfo[] | undefined;
}

export interface PublicTokenInfo {
  /** The ID of this token. */
  tokenId?: string | undefined;
  /** Server time (in epoch milliseconds) when the token was created. */
  creationTime?: bigint | undefined;
  /** Server time (in epoch milliseconds) when the token will expire, or -1 if not applicable. */
  expiryTime?: bigint | undefined;
  /** Comment the token was created with, if applicable. */
  comment?: string | undefined;
  /** Scope of the token was created with, if applicable. */
  scopes?: string[] | undefined;
  /** Output only. The autoscope state of this token. */
  autoscopeState?: AutoscopeState | undefined;
  /** Output only. Inferred API path scopes collected for this token when autoscope is enabled. */
  inferredScopes?: string[] | undefined;
  /** Output only. Scopes inferred from offline backfill processing. */
  backfillScopes?: string[] | undefined;
}

export interface RevokeTokenRequest {
  /** The ID of the token to be revoked. */
  tokenId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RevokeTokenResponse {}

export interface UpdatePublicTokenInfo {
  /** The ID of this token. */
  tokenId?: string | undefined;
  /** Server time (in epoch milliseconds) when the token was created. */
  creationTime?: bigint | undefined;
  /** Server time (in epoch milliseconds) when the token will expire, or -1 if not applicable. */
  expiryTime?: bigint | undefined;
  /** Comment the token was created with, if applicable. */
  comment?: string | undefined;
  /** Scope of the token was created with, if applicable. */
  scopes?: string[] | undefined;
  /** Output only. The autoscope state of this token. */
  autoscopeState?: AutoscopeState | undefined;
  /** Output only. Inferred API path scopes collected for this token when autoscope is enabled. */
  inferredScopes?: string[] | undefined;
  /** Output only. Scopes inferred from offline backfill processing. */
  backfillScopes?: string[] | undefined;
}

/**
 * For the list of supported token scopes, see
 * https://docs.databricks.com/api/workspace/api/scopes.
 */
export interface UpdateTokenRequest {
  /** The SHA-256 hash of the token to be updated. */
  tokenId?: string | undefined;
  token?: UpdatePublicTokenInfo | undefined;
  /** A list of field name under token, For example, {"update_mask": "comment,scopes"} */
  updateMask?: FieldMask<UpdatePublicTokenInfo> | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateTokenResponse {}

export const unmarshalCreateTokenResponseSchema: z.ZodType<CreateTokenResponse> =
  z
    .object({
      token_value: z.string().optional(),
      token_info: z.lazy(() => unmarshalPublicTokenInfoSchema).optional(),
    })
    .transform(d => ({
      tokenValue: d.token_value,
      tokenInfo: d.token_info,
    }));

export const unmarshalListTokensResponseSchema: z.ZodType<ListTokensResponse> =
  z
    .object({
      token_infos: z
        .array(z.lazy(() => unmarshalPublicTokenInfoSchema))
        .optional(),
    })
    .transform(d => ({
      tokenInfos: d.token_infos,
    }));

export const unmarshalPublicTokenInfoSchema: z.ZodType<PublicTokenInfo> = z
  .object({
    token_id: z.string().optional(),
    creation_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    expiry_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    comment: z.string().optional(),
    scopes: z.array(z.string()).optional(),
    autoscope_state: z.string().optional(),
    inferred_scopes: z.array(z.string()).optional(),
    backfill_scopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    tokenId: d.token_id,
    creationTime: d.creation_time,
    expiryTime: d.expiry_time,
    comment: d.comment,
    scopes: d.scopes,
    autoscopeState: d.autoscope_state,
    inferredScopes: d.inferred_scopes,
    backfillScopes: d.backfill_scopes,
  }));

export const unmarshalRevokeTokenResponseSchema: z.ZodType<RevokeTokenResponse> =
  z.object({});

export const unmarshalUpdateTokenResponseSchema: z.ZodType<UpdateTokenResponse> =
  z.object({});

export const marshalCreateTokenRequestSchema: z.ZodType = z
  .object({
    lifetimeSeconds: z.bigint().optional(),
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

export const marshalRevokeTokenRequestSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
  }));

export const marshalUpdatePublicTokenInfoSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
    creationTime: z.bigint().optional(),
    expiryTime: z.bigint().optional(),
    comment: z.string().optional(),
    scopes: z.array(z.string()).optional(),
    autoscopeState: z.string().optional(),
    inferredScopes: z.array(z.string()).optional(),
    backfillScopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
    creation_time: d.creationTime,
    expiry_time: d.expiryTime,
    comment: d.comment,
    scopes: d.scopes,
    autoscope_state: d.autoscopeState,
    inferred_scopes: d.inferredScopes,
    backfill_scopes: d.backfillScopes,
  }));

export const marshalUpdateTokenRequestSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
    token: z.lazy(() => marshalUpdatePublicTokenInfoSchema).optional(),
    updateMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
    token: d.token,
    update_mask: d.updateMask,
  }));

const updatePublicTokenInfoFieldMaskSchema: FieldMaskSchema = {
  autoscopeState: {wire: 'autoscope_state'},
  backfillScopes: {wire: 'backfill_scopes'},
  comment: {wire: 'comment'},
  creationTime: {wire: 'creation_time'},
  expiryTime: {wire: 'expiry_time'},
  inferredScopes: {wire: 'inferred_scopes'},
  scopes: {wire: 'scopes'},
  tokenId: {wire: 'token_id'},
};

export function updatePublicTokenInfoFieldMask(
  ...paths: string[]
): FieldMask<UpdatePublicTokenInfo> {
  return FieldMask.build<UpdatePublicTokenInfo>(
    paths,
    updatePublicTokenInfoFieldMaskSchema
  );
}
