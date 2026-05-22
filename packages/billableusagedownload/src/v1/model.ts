// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.


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
  contents?: ReadableStream | undefined;
}
