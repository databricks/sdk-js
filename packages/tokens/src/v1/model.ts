// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';


export interface CreateTokenRequest {
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
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateTokenRequest_Response {
  /** The value of the new token. */
  tokenValue?: string | undefined;
  /** The information for the new token. */
  tokenInfo?: PublicTokenInfo | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListTokensRequest {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListTokensRequest_Response {
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
}

export interface RevokeTokenRequest {
  /** The ID of the token to be revoked. */
  tokenId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface RevokeTokenRequest_Response {}

export interface UpdateTokenRequest {
  /** The SHA-256 hash of the token to be updated. */
  tokenId?: string | undefined;
  token?: PublicTokenInfo | undefined;
  /** A list of field name under PublicTokenInfo, For example in request use {"update_mask": "comment,scopes"} */
  updateMask?: FieldMask<PublicTokenInfo> | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateTokenResponse {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateTokenRequest_ResponseSchema: z.ZodType<CreateTokenRequest_Response> = z
  .object({
    token_value: z.string().optional(),
    token_info: z.lazy(() => unmarshalPublicTokenInfoSchema).optional(),
  })
  .transform(d => ({
    tokenValue: d.token_value,
    tokenInfo: d.token_info,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListTokensRequest_ResponseSchema: z.ZodType<ListTokensRequest_Response> = z
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
  })
  .transform(d => ({
    tokenId: d.token_id,
    creationTime: d.creation_time,
    expiryTime: d.expiry_time,
    comment: d.comment,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRevokeTokenRequest_ResponseSchema: z.ZodType<RevokeTokenRequest_Response> = z
  .object({
  });

export const unmarshalUpdateTokenResponseSchema: z.ZodType<UpdateTokenResponse> = z
  .object({
  });

export const marshalCreateTokenRequestSchema: z.ZodType = z
  .object({
    lifetimeSeconds: z.number().optional(),
    comment: z.string().optional(),
    scopes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    lifetime_seconds: d.lifetimeSeconds,
    comment: d.comment,
    scopes: d.scopes,
  }));

export const marshalPublicTokenInfoSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
    creationTime: z.number().optional(),
    expiryTime: z.number().optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
    creation_time: d.creationTime,
    expiry_time: d.expiryTime,
    comment: d.comment,
  }));

export const marshalRevokeTokenRequestSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
  }));

export const marshalUpdateTokenRequestSchema: z.ZodType = z
  .object({
    tokenId: z.string().optional(),
    token: z.lazy(() => marshalPublicTokenInfoSchema).optional(),
    updateMask: z.any().transform((m: FieldMask) => m.toString()).optional(),
  })
  .transform(d => ({
    token_id: d.tokenId,
    token: d.token,
    update_mask: d.updateMask,
  }));

const publicTokenInfoFieldMaskSchema: FieldMaskSchema = {
  comment: {wire: 'comment'},
  creationTime: {wire: 'creation_time'},
  expiryTime: {wire: 'expiry_time'},
  tokenId: {wire: 'token_id'},
};

export function publicTokenInfoFieldMask(...paths: string[]): FieldMask<PublicTokenInfo> {
  return FieldMask.build<PublicTokenInfo>(paths, publicTokenInfoFieldMaskSchema);
}
