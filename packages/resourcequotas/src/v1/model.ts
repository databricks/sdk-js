// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The type of Unity Catalog securable. */
export enum SecurableType {
  CATALOG = 'CATALOG',
  SCHEMA = 'SCHEMA',
  TABLE = 'TABLE',
  STORAGE_CREDENTIAL = 'STORAGE_CREDENTIAL',
  EXTERNAL_LOCATION = 'EXTERNAL_LOCATION',
  FUNCTION = 'FUNCTION',
  SHARE = 'SHARE',
  PROVIDER = 'PROVIDER',
  RECIPIENT = 'RECIPIENT',
  CLEAN_ROOM = 'CLEAN_ROOM',
  METASTORE = 'METASTORE',
  PIPELINE = 'PIPELINE',
  VOLUME = 'VOLUME',
  CONNECTION = 'CONNECTION',
  CREDENTIAL = 'CREDENTIAL',
  EXTERNAL_METADATA = 'EXTERNAL_METADATA',
  /** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */
  STAGING_TABLE = 'STAGING_TABLE',
}

export interface GetQuota {
  /** Securable type of the quota parent. */
  parentSecurableType?: string | undefined;
  /** Full name of the parent resource. Provide the metastore ID if the parent is a metastore. */
  parentFullName?: string | undefined;
  /** Name of the quota. Follows the pattern of the quota type, with "-quota" added as a suffix. */
  quotaName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetQuota_Response {
  /** The returned QuotaInfo. */
  quotaInfo?: QuotaInfo | undefined;
}

export interface ListQuotas {
  /** The number of quotas to return. */
  maxResults?: number | undefined;
  /** Opaque token for the next page of results. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListQuotas_Response {
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
  lastRefreshedAt?: number | undefined;
}

export const unmarshalGetQuotaSchema: z.ZodType<GetQuota> = z
  .object({
    parent_securable_type: z.string().optional(),
    parent_full_name: z.string().optional(),
    quota_name: z.string().optional(),
  })
  .transform(d => ({
    parentSecurableType: d.parent_securable_type,
    parentFullName: d.parent_full_name,
    quotaName: d.quota_name,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetQuota_ResponseSchema: z.ZodType<GetQuota_Response> = z
  .object({
    quota_info: z.lazy(() => unmarshalQuotaInfoSchema).optional(),
  })
  .transform(d => ({
    quotaInfo: d.quota_info,
  }));

export const unmarshalListQuotasSchema: z.ZodType<ListQuotas> = z
  .object({
    max_results: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    maxResults: d.max_results,
    pageToken: d.page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListQuotas_ResponseSchema: z.ZodType<ListQuotas_Response> = z
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
    parent_securable_type: z.enum(SecurableType).optional(),
    parent_full_name: z.string().optional(),
    quota_name: z.string().optional(),
    quota_count: z.number().optional(),
    quota_limit: z.number().optional(),
    last_refreshed_at: z.number().optional(),
  })
  .transform(d => ({
    parentSecurableType: d.parent_securable_type,
    parentFullName: d.parent_full_name,
    quotaName: d.quota_name,
    quotaCount: d.quota_count,
    quotaLimit: d.quota_limit,
    lastRefreshedAt: d.last_refreshed_at,
  }));

export const marshalGetQuotaSchema: z.ZodType = z
  .object({
    parentSecurableType: z.string().optional(),
    parentFullName: z.string().optional(),
    quotaName: z.string().optional(),
  })
  .transform(d => ({
    parent_securable_type: d.parentSecurableType,
    parent_full_name: d.parentFullName,
    quota_name: d.quotaName,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetQuota_ResponseSchema: z.ZodType = z
  .object({
    quotaInfo: z.lazy(() => marshalQuotaInfoSchema).optional(),
  })
  .transform(d => ({
    quota_info: d.quotaInfo,
  }));

export const marshalListQuotasSchema: z.ZodType = z
  .object({
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    max_results: d.maxResults,
    page_token: d.pageToken,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListQuotas_ResponseSchema: z.ZodType = z
  .object({
    quotas: z.array(z.lazy(() => marshalQuotaInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    quotas: d.quotas,
    next_page_token: d.nextPageToken,
  }));

export const marshalQuotaInfoSchema: z.ZodType = z
  .object({
    parentSecurableType: z.enum(SecurableType).optional(),
    parentFullName: z.string().optional(),
    quotaName: z.string().optional(),
    quotaCount: z.number().optional(),
    quotaLimit: z.number().optional(),
    lastRefreshedAt: z.number().optional(),
  })
  .transform(d => ({
    parent_securable_type: d.parentSecurableType,
    parent_full_name: d.parentFullName,
    quota_name: d.quotaName,
    quota_count: d.quotaCount,
    quota_limit: d.quotaLimit,
    last_refreshed_at: d.lastRefreshedAt,
  }));
