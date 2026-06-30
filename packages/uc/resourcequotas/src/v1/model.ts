// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The type of Unity Catalog securable. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SecurableType = {
  CATALOG: 'CATALOG',
  SCHEMA: 'SCHEMA',
  TABLE: 'TABLE',
  STORAGE_CREDENTIAL: 'STORAGE_CREDENTIAL',
  EXTERNAL_LOCATION: 'EXTERNAL_LOCATION',
  FUNCTION: 'FUNCTION',
  SHARE: 'SHARE',
  PROVIDER: 'PROVIDER',
  RECIPIENT: 'RECIPIENT',
  CLEAN_ROOM: 'CLEAN_ROOM',
  METASTORE: 'METASTORE',
  PIPELINE: 'PIPELINE',
  VOLUME: 'VOLUME',
  CONNECTION: 'CONNECTION',
  CREDENTIAL: 'CREDENTIAL',
  EXTERNAL_METADATA: 'EXTERNAL_METADATA',
  /** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */
  STAGING_TABLE: 'STAGING_TABLE',
} as const;
export type SecurableType =
  | (typeof SecurableType)[keyof typeof SecurableType]
  | (string & {});

export interface GetQuotaRequest {
  /**
   * Securable type of the quota parent.
   *
   * Required. This field must be set in requests.
   */
  parentSecurableType?: string | undefined;
  /**
   * Full name of the parent resource. Provide the metastore ID if the parent is a metastore.
   *
   * Required. This field must be set in requests.
   */
  parentFullName?: string | undefined;
  /**
   * Name of the quota. Follows the pattern of the quota type, with "-quota" added as a suffix.
   *
   * Required. This field must be set in requests.
   */
  quotaName?: string | undefined;
}

export interface GetQuotaResponse {
  /** The returned QuotaInfo. */
  quotaInfo?: QuotaInfo | undefined;
}

export interface ListQuotasRequest {
  /** The number of quotas to return. */
  maxResults?: number | undefined;
  /** Opaque token for the next page of results. */
  pageToken?: string | undefined;
}

export interface ListQuotasResponse {
  /** An array of returned QuotaInfos. */
  quotas?: QuotaInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request.
   */
  nextPageToken?: string | undefined;
}

export interface QuotaInfo {
  /** The quota parent securable type. */
  parentSecurableType?: SecurableType | undefined;
  /** Name of the parent resource. Returns metastore ID if the parent is a metastore. */
  parentFullName?: string | undefined;
  /** The name of the quota. */
  quotaName?: string | undefined;
  /** The current usage of the resource quota. */
  quotaCount?: number | undefined;
  /** The current limit of the resource quota. */
  quotaLimit?: number | undefined;
  /** The timestamp that indicates when the quota count was last updated. */
  lastRefreshedAt?: bigint | undefined;
}

export const unmarshalGetQuotaResponseSchema: z.ZodType<GetQuotaResponse> = z
  .object({
    quota_info: z.lazy(() => unmarshalQuotaInfoSchema).optional(),
  })
  .transform(d => ({
    quotaInfo: d.quota_info,
  }));

export const unmarshalListQuotasResponseSchema: z.ZodType<ListQuotasResponse> =
  z
    .object({
      quotas: z.array(z.lazy(() => unmarshalQuotaInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      quotas: d.quotas,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalQuotaInfoSchema: z.ZodType<QuotaInfo> = z
  .object({
    parent_securable_type: z.string().optional(),
    parent_full_name: z.string().optional(),
    quota_name: z.string().optional(),
    quota_count: z.number().optional(),
    quota_limit: z.number().optional(),
    last_refreshed_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    parentSecurableType: d.parent_securable_type,
    parentFullName: d.parent_full_name,
    quotaName: d.quota_name,
    quotaCount: d.quota_count,
    quotaLimit: d.quota_limit,
    lastRefreshedAt: d.last_refreshed_at,
  }));
