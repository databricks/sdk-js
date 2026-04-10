// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface DownloadRequest {
  /**
   * <Databricks> account ID of any type. For non-E2 account types, get
   * your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html).
   */
  accountId?: string | undefined;
  /**
   * Format specification for month in the format `YYYY-MM`. This is
   * used to specify billable usage `start_month` and `end_month`
   * properties. **Note**: Billable usage logs are unavailable before
   * March 2019 (`2019-03`).
   */
  startMonth?: string | undefined;
  /**
   * Format: `YYYY-MM`. Last month to return billable usage logs for.
   * This field is required.
   */
  endMonth?: string | undefined;
  /**
   * Specify whether to include personally identifiable information in
   * the billable usage logs, for example the email addresses of cluster
   * creators. Handle this information with care. Defaults to false.
   */
  personalData?: boolean | undefined;
}

/** Billable usage data was returned successfully. */
export interface DownloadResponse {
  content?: string | undefined;
}

export const unmarshalDownloadRequestSchema: z.ZodType<DownloadRequest> = z
  .object({
    account_id: z.string().optional(),
    start_month: z.string().optional(),
    end_month: z.string().optional(),
    personal_data: z.boolean().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    startMonth: d.start_month,
    endMonth: d.end_month,
    personalData: d.personal_data,
  }));

export const unmarshalDownloadResponseSchema: z.ZodType<DownloadResponse> = z
  .object({
    content: z.string().optional(),
  })
  .transform(d => ({
    content: d.content,
  }));

export const marshalDownloadRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    startMonth: z.string().optional(),
    endMonth: z.string().optional(),
    personalData: z.boolean().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    start_month: d.startMonth,
    end_month: d.endMonth,
    personal_data: d.personalData,
  }));

export const marshalDownloadResponseSchema: z.ZodType = z
  .object({
    content: z.string().optional(),
  })
  .transform(d => ({
    content: d.content,
  }));
