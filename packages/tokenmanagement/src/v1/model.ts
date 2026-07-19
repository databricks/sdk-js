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
  AUTOSCOPE_STATE_UNSPECIFIED: '',
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

export interface AdminTokenInfo {
  /** ID of the token. */
  tokenId?: string | undefined;
  /** Timestamp when the token was created. */
  creationTime?: bigint | undefined;
  /** Timestamp when the token expires. */
  expiryTime?: bigint | undefined;
  /** Comment that describes the purpose of the token, specified by the token creator. */
  comment?: string | undefined;
  /** User ID of the user that created the token. */
  createdById?: bigint | undefined;
  /** Username of the user that created the token. */
  createdByUsername?: string | undefined;
  /** User ID of the user that owns the token. */
  ownerId?: bigint | undefined;
  /** If applicable, the ID of the workspace that the token was created in. */
  workspaceId?: bigint | undefined;
  /** Approximate timestamp for the day the token was last used. Accurate up to 1 day. */
  lastUsedDay?: bigint | undefined;
  /** Scope of the token was created with, if applicable. */
  scopes?: string[] | undefined;
  /** Output only. The autoscope state of this token. */
  autoscopeState?: AutoscopeState | undefined;
  /** Output only. Inferred API path scopes collected for this token when autoscope is enabled. */
  inferredScopes?: string[] | undefined;
  /** Output only. Scopes inferred from offline backfill processing. */
  backfillScopes?: string[] | undefined;
}

/** Configuration details for creating on-behalf tokens. */
export interface CreateOnBehalfOfTokenRequest {
  /** Application ID of the service principal. */
  applicationId?: string | undefined;
  /** The number of seconds before the token expires. */
  lifetimeSeconds?: bigint | undefined;
  /** Comment that describes the purpose of the token. */
  comment?: string | undefined;
  scopes?: string[] | undefined;
  /** Whether to enable autoscoping for this token. */
  autoscopeEnabled?: boolean | undefined;
}

/** An on-behalf token was successfully created for the service principal. */
export interface CreateOnBehalfOfTokenResponse {
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
export interface GetTokenRequest {
  /** The ID of the token to get. */
  tokenId?: string | undefined;
}

/** Token with specified Token ID was successfully returned. */
export interface GetTokenResponse {
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
export interface ListTokensRequest {
  /** User ID of the user that created the token. */
  createdById?: bigint | undefined;
  /** Username of the user that created the token. */
  createdByUsername?: string | undefined;
}

/** Tokens were successfully returned. */
export interface ListTokensResponse {
  /** Token metadata of each user-created token in the workspace */
  tokenInfos?: AdminTokenInfo[] | undefined;
}

export interface RevokeTokenRequest {
  /** The ID of the token to revoke. */
  tokenId?: string | undefined;
}

/** The token was successfully deleted. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RevokeTokenResponse {}

/**
 * For the list of supported token scopes, see
 * https://docs.databricks.com/api/workspace/api/scopes.
 */
export interface UpdateTokenRequest {
  token?: AdminTokenInfo | undefined;
  /** A list of field name under token, For example, {"update_mask": "comment,scopes"} */
  updateMask?: FieldMask<AdminTokenInfo> | undefined;
}

export const unmarshalAdminTokenInfoSchema: z.ZodType<AdminTokenInfo> = z
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
    created_by_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    created_by_username: z.string().optional(),
    owner_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    workspace_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    last_used_day: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
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
    createdById: d.created_by_id,
    createdByUsername: d.created_by_username,
    ownerId: d.owner_id,
    workspaceId: d.workspace_id,
    lastUsedDay: d.last_used_day,
    scopes: d.scopes,
    autoscopeState: d.autoscope_state,
    inferredScopes: d.inferred_scopes,
    backfillScopes: d.backfill_scopes,
  }));

export const unmarshalCreateOnBehalfOfTokenResponseSchema: z.ZodType<CreateOnBehalfOfTokenResponse> =
  z
    .object({
      token_value: z.string().optional(),
      token_info: z.lazy(() => unmarshalAdminTokenInfoSchema).optional(),
    })
    .transform(d => ({
      tokenValue: d.token_value,
      tokenInfo: d.token_info,
    }));

export const unmarshalGetTokenResponseSchema: z.ZodType<GetTokenResponse> = z
  .object({
    token_info: z.lazy(() => unmarshalAdminTokenInfoSchema).optional(),
  })
  .transform(d => ({
    tokenInfo: d.token_info,
  }));

export const unmarshalListTokensResponseSchema: z.ZodType<ListTokensResponse> =
  z
    .object({
      token_infos: z
        .array(z.lazy(() => unmarshalAdminTokenInfoSchema))
        .optional(),
    })
    .transform(d => ({
      tokenInfos: d.token_infos,
    }));

export const unmarshalRevokeTokenResponseSchema: z.ZodType<RevokeTokenResponse> =
  z.object({});

export const marshalAdminTokenInfoSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
    creationTime: z.bigint().optional(),
    expiryTime: z.bigint().optional(),
    comment: z.string().optional(),
    createdById: z.bigint().optional(),
    createdByUsername: z.string().optional(),
    ownerId: z.bigint().optional(),
    workspaceId: z.bigint().optional(),
    lastUsedDay: z.bigint().optional(),
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
    created_by_id: d.createdById,
    created_by_username: d.createdByUsername,
    owner_id: d.ownerId,
    workspace_id: d.workspaceId,
    last_used_day: d.lastUsedDay,
    scopes: d.scopes,
    autoscope_state: d.autoscopeState,
    inferred_scopes: d.inferredScopes,
    backfill_scopes: d.backfillScopes,
  }));

export const marshalCreateOnBehalfOfTokenRequestSchema: z.ZodType = z
  .object({
    applicationId: z.string().optional(),
    lifetimeSeconds: z.bigint().optional(),
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

export const marshalUpdateTokenRequestSchema: z.ZodType = z
  .object({
    token: z.lazy(() => marshalAdminTokenInfoSchema).optional(),
    updateMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    token: d.token,
    update_mask: d.updateMask,
  }));

const adminTokenInfoFieldMaskSchema: FieldMaskSchema = {
  autoscopeState: {wire: 'autoscope_state'},
  backfillScopes: {wire: 'backfill_scopes'},
  comment: {wire: 'comment'},
  createdById: {wire: 'created_by_id'},
  createdByUsername: {wire: 'created_by_username'},
  creationTime: {wire: 'creation_time'},
  expiryTime: {wire: 'expiry_time'},
  inferredScopes: {wire: 'inferred_scopes'},
  lastUsedDay: {wire: 'last_used_day'},
  ownerId: {wire: 'owner_id'},
  scopes: {wire: 'scopes'},
  tokenId: {wire: 'token_id'},
  workspaceId: {wire: 'workspace_id'},
};

export function adminTokenInfoFieldMask(
  ...paths: string[]
): FieldMask<AdminTokenInfo> {
  return FieldMask.build<AdminTokenInfo>(paths, adminTokenInfoFieldMaskSchema);
}
