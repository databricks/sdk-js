// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * *
 * Log Delivery Status
 *
 * `ENABLED`: All dependencies have executed and succeeded
 * `DISABLED`: At least one dependency has succeeded
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const LogDeliveryConfigStatus = {
  /** Configuration is enabled */
  ENABLED: 'ENABLED',
  /** Configuration is disabled */
  DISABLED: 'DISABLED',
} as const;
export type LogDeliveryConfigStatus =
  | (typeof LogDeliveryConfigStatus)[keyof typeof LogDeliveryConfigStatus]
  | (string & {});

/**
 * *
 * Log Delivery Output Format
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const LogDeliveryOutputFormat = {
  /** Deliver CSV files */
  CSV: 'CSV',
  /** Deliver JSON files */
  JSON: 'JSON',
} as const;
export type LogDeliveryOutputFormat =
  | (typeof LogDeliveryOutputFormat)[keyof typeof LogDeliveryOutputFormat]
  | (string & {});

/**
 * *
 * The status string for log delivery. Possible values are:
 * `CREATED`: There were no log delivery attempts since the config was created.
 * `SUCCEEDED`: The latest attempt of log delivery has succeeded completely.
 * `USER_FAILURE`: The latest attempt of log delivery failed because of misconfiguration of customer provided permissions on role or storage.
 * `SYSTEM_FAILURE`: The latest attempt of log delivery failed because of an <Databricks> internal error. Contact support if it doesn't go away soon.
 * `NOT_FOUND`: The log delivery status as the configuration has been disabled since the release of this feature or there are no workspaces in the account.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const LogDeliveryStatusEnum = {
  /** Configuration is just created and logs haven't delivered yet */
  CREATED: 'CREATED',
  /** Configuration has succeeded in the last run */
  SUCCEEDED: 'SUCCEEDED',
  /** Configuration has failed in the last run due to user failure */
  USER_FAILURE: 'USER_FAILURE',
  /** Configuration has failed in the last run due to system failure */
  SYSTEM_FAILURE: 'SYSTEM_FAILURE',
  /** Status not found */
  NOT_FOUND: 'NOT_FOUND',
} as const;
export type LogDeliveryStatusEnum =
  | (typeof LogDeliveryStatusEnum)[keyof typeof LogDeliveryStatusEnum]
  | (string & {});

/**
 * *
 * Log Delivery Type
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const LogDeliveryType = {
  /** Deliver Billable Usage logs */
  BILLABLE_USAGE: 'BILLABLE_USAGE',
  /** Deliver Audit Logs */
  AUDIT_LOGS: 'AUDIT_LOGS',
} as const;
export type LogDeliveryType =
  | (typeof LogDeliveryType)[keyof typeof LogDeliveryType]
  | (string & {});

/**
 * *
 * Log Delivery Configuration
 */
export interface CreateLogDeliveryConfigurationParams {
  /** The unique UUID of log delivery configuration */
  configId?: string | undefined;
  /** The optional human-readable name of the log delivery configuration. Defaults to empty. */
  configName?: string | undefined;
  /**
   * Log delivery type. Supported values are:
   * * `BILLABLE_USAGE` — Configure [billable usage log delivery](https://docs.databricks.com/administration-guide/account-settings/billable-usage-delivery.html). For the CSV schema, see the [View billable usage](https://docs.databricks.com/administration-guide/account-settings/usage.html).
   * * `AUDIT_LOGS` — Configure [audit log delivery](https://docs.databricks.com/administration-guide/account-settings/audit-logs.html). For the JSON schema, see [Configure audit logging](https://docs.databricks.com/administration-guide/account-settings/audit-logs.html)
   */
  logType?: LogDeliveryType | undefined;
  /**
   * The file type of log delivery.
   * * If `log_type` is `BILLABLE_USAGE`, this value must be `CSV`. Only the CSV (comma-separated values) format is supported. For the schema, see the [View billable usage](https://docs.databricks.com/administration-guide/account-settings/usage.html)
   * * If `log_type` is `AUDIT_LOGS`, this value must be `JSON`. Only the JSON (JavaScript Object Notation) format is supported. For the schema, see the [Configuring audit logs](https://docs.databricks.com/administration-guide/account-settings/audit-logs.html).
   */
  outputFormat?: LogDeliveryOutputFormat | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** The ID for a method:credentials/create that represents the AWS IAM role with policy and trust relationship as described in the main billable usage documentation page. See [Configure billable usage delivery](https://docs.databricks.com/administration-guide/account-settings/billable-usage-delivery.html). */
  credentialsId?: string | undefined;
  /** The ID for a method:storage/create  that represents the S3 bucket with bucket policy as described in the main billable usage documentation page. See [Configure billable usage delivery](https://docs.databricks.com/administration-guide/account-settings/billable-usage-delivery.html). */
  storageConfigurationId?: string | undefined;
  /** Optional filter that specifies workspace IDs to deliver logs for. By default the workspace filter is empty and log delivery applies at the account level, delivering workspace-level logs for all workspaces in your account, plus account level logs. You can optionally set this field to an array of workspace IDs (each one is an `int64`) to which log delivery should apply, in which case only workspace-level logs relating to the specified workspaces are delivered. If you plan to use different log delivery configurations for different workspaces, set this field explicitly. Be aware that delivery configurations mentioning specific workspaces won't apply to new workspaces created in the future, and delivery won't include account level logs. For some types of <Databricks> deployments there is only one workspace per account ID, so this field is unnecessary. */
  workspaceIdsFilter?: bigint[] | undefined;
  /** The optional delivery path prefix within Amazon S3 storage. Defaults to empty, which means that logs are delivered to the root of the bucket. This must be a valid S3 object key. This must not start or end with a slash character. */
  deliveryPathPrefix?: string | undefined;
  /** This field applies only if log_type is BILLABLE_USAGE. This is the optional start month and year for delivery, specified in YYYY-MM format. Defaults to current year and month. BILLABLE_USAGE logs are not available for usage before March 2019 (2019-03). */
  deliveryStartTime?: string | undefined;
  /** Status of log delivery configuration. Set to `ENABLED` (enabled) or `DISABLED` (disabled). Defaults to `ENABLED`. You can [enable or disable the configuration](#operation/patch-log-delivery-config-status) later. Deletion of a configuration is not supported, so disable a log delivery configuration that is no longer needed. */
  status?: LogDeliveryConfigStatus | undefined;
  /** Time in epoch milliseconds when the log delivery configuration was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when the log delivery configuration was updated. */
  updateTime?: bigint | undefined;
  /** The LogDeliveryStatus of this log delivery configuration */
  logDeliveryStatus?: LogDeliveryStatus | undefined;
}

/**
 * *
 * Properties of the new log delivery configuration.
 */
export interface CreateLogDeliveryConfigurationRequest {
  logDeliveryConfiguration?: CreateLogDeliveryConfigurationParams | undefined;
}

export interface CreateLogDeliveryConfigurationResponse {
  /** The created log delivery configuration */
  logDeliveryConfiguration?: LogDeliveryConfiguration | undefined;
}

/**
 * *
 * Get Log Delivery Configuration
 */
export interface GetLogDeliveryConfigurationRequest {
  /** The log delivery configuration id of customer */
  configId?: string | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
}

export interface GetLogDeliveryConfigurationResponse {
  /** The fetched log delivery configuration */
  logDeliveryConfiguration?: LogDeliveryConfiguration | undefined;
}

/**
 * *
 * List Log Delivery Configuration
 */
export interface ListLogDeliveryConfigurationRequest {
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** The Credentials id to filter the search results with */
  credentialsId?: string | undefined;
  /** The Storage Configuration id to filter the search results with */
  storageConfigurationId?: string | undefined;
  /** The log delivery status to filter the search results with */
  status?: LogDeliveryConfigStatus | undefined;
  /**
   * A page token received from a previous get all budget configurations call. This token can be used to retrieve the subsequent page.
   * Requests first page if absent.
   */
  pageToken?: string | undefined;
}

export interface ListLogDeliveryConfigurationResponse {
  /** Log delivery configurations were returned successfully. */
  logDeliveryConfigurations?: LogDeliveryConfiguration[] | undefined;
  /** Token which can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no subsequent budgets. */
  nextPageToken?: string | undefined;
}

/**
 * *
 * Log Delivery Configuration
 */
export interface LogDeliveryConfiguration {
  /** The unique UUID of log delivery configuration */
  configId?: string | undefined;
  /** The optional human-readable name of the log delivery configuration. Defaults to empty. */
  configName?: string | undefined;
  /**
   * Log delivery type. Supported values are:
   * * `BILLABLE_USAGE` — Configure [billable usage log delivery](https://docs.databricks.com/administration-guide/account-settings/billable-usage-delivery.html). For the CSV schema, see the [View billable usage](https://docs.databricks.com/administration-guide/account-settings/usage.html).
   * * `AUDIT_LOGS` — Configure [audit log delivery](https://docs.databricks.com/administration-guide/account-settings/audit-logs.html). For the JSON schema, see [Configure audit logging](https://docs.databricks.com/administration-guide/account-settings/audit-logs.html)
   */
  logType?: LogDeliveryType | undefined;
  /**
   * The file type of log delivery.
   * * If `log_type` is `BILLABLE_USAGE`, this value must be `CSV`. Only the CSV (comma-separated values) format is supported. For the schema, see the [View billable usage](https://docs.databricks.com/administration-guide/account-settings/usage.html)
   * * If `log_type` is `AUDIT_LOGS`, this value must be `JSON`. Only the JSON (JavaScript Object Notation) format is supported. For the schema, see the [Configuring audit logs](https://docs.databricks.com/administration-guide/account-settings/audit-logs.html).
   */
  outputFormat?: LogDeliveryOutputFormat | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** The ID for a method:credentials/create that represents the AWS IAM role with policy and trust relationship as described in the main billable usage documentation page. See [Configure billable usage delivery](https://docs.databricks.com/administration-guide/account-settings/billable-usage-delivery.html). */
  credentialsId?: string | undefined;
  /** The ID for a method:storage/create  that represents the S3 bucket with bucket policy as described in the main billable usage documentation page. See [Configure billable usage delivery](https://docs.databricks.com/administration-guide/account-settings/billable-usage-delivery.html). */
  storageConfigurationId?: string | undefined;
  /** Optional filter that specifies workspace IDs to deliver logs for. By default the workspace filter is empty and log delivery applies at the account level, delivering workspace-level logs for all workspaces in your account, plus account level logs. You can optionally set this field to an array of workspace IDs (each one is an `int64`) to which log delivery should apply, in which case only workspace-level logs relating to the specified workspaces are delivered. If you plan to use different log delivery configurations for different workspaces, set this field explicitly. Be aware that delivery configurations mentioning specific workspaces won't apply to new workspaces created in the future, and delivery won't include account level logs. For some types of <Databricks> deployments there is only one workspace per account ID, so this field is unnecessary. */
  workspaceIdsFilter?: bigint[] | undefined;
  /** The optional delivery path prefix within Amazon S3 storage. Defaults to empty, which means that logs are delivered to the root of the bucket. This must be a valid S3 object key. This must not start or end with a slash character. */
  deliveryPathPrefix?: string | undefined;
  /** This field applies only if log_type is BILLABLE_USAGE. This is the optional start month and year for delivery, specified in YYYY-MM format. Defaults to current year and month. BILLABLE_USAGE logs are not available for usage before March 2019 (2019-03). */
  deliveryStartTime?: string | undefined;
  /** Status of log delivery configuration. Set to `ENABLED` (enabled) or `DISABLED` (disabled). Defaults to `ENABLED`. You can [enable or disable the configuration](#operation/patch-log-delivery-config-status) later. Deletion of a configuration is not supported, so disable a log delivery configuration that is no longer needed. */
  status?: LogDeliveryConfigStatus | undefined;
  /** Time in epoch milliseconds when the log delivery configuration was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when the log delivery configuration was updated. */
  updateTime?: bigint | undefined;
  /** The LogDeliveryStatus of this log delivery configuration */
  logDeliveryStatus?: LogDeliveryStatus | undefined;
}

export interface LogDeliveryStatus {
  /**
   * Enum that describes the status. Possible values are:
   * * `CREATED`: There were no log delivery attempts since the config was created.
   * * `SUCCEEDED`: The latest attempt of log delivery has succeeded completely.
   * * `USER_FAILURE`: The latest attempt of log delivery failed because of misconfiguration of customer provided permissions on role or storage.
   * * `SYSTEM_FAILURE`: The latest attempt of log delivery failed because of an <Databricks> internal error. Contact support if it doesn't go away soon.
   * * `NOT_FOUND`: The log delivery status as the configuration has been disabled since the release of this feature or there are no workspaces in the account.
   */
  status?: LogDeliveryStatusEnum | undefined;
  /** The UTC time for the latest log delivery attempt. */
  lastAttemptTime?: string | undefined;
  /** The UTC time for the latest successful log delivery. */
  lastSuccessfulAttemptTime?: string | undefined;
  /** Informative message about the latest log delivery attempt. If the log delivery fails with USER_FAILURE, error details will be provided for fixing misconfigurations in cloud permissions. */
  message?: string | undefined;
}

/**
 * *
 * Update Log Delivery Configuration
 */
export interface UpdateLogDeliveryConfigurationRequest {
  /** The log delivery configuration id of customer */
  configId?: string | undefined;
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html). */
  accountId?: string | undefined;
  /** Status of log delivery configuration. Set to `ENABLED` (enabled) or `DISABLED` (disabled). Defaults to `ENABLED`. You can [enable or disable the configuration](#operation/patch-log-delivery-config-status) later. Deletion of a configuration is not supported, so disable a log delivery configuration that is no longer needed. */
  status?: LogDeliveryConfigStatus | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateLogDeliveryConfigurationResponse {}

export const unmarshalCreateLogDeliveryConfigurationResponseSchema: z.ZodType<CreateLogDeliveryConfigurationResponse> =
  z
    .object({
      log_delivery_configuration: z
        .lazy(() => unmarshalLogDeliveryConfigurationSchema)
        .optional(),
    })
    .transform(d => ({
      logDeliveryConfiguration: d.log_delivery_configuration,
    }));

export const unmarshalGetLogDeliveryConfigurationResponseSchema: z.ZodType<GetLogDeliveryConfigurationResponse> =
  z
    .object({
      log_delivery_configuration: z
        .lazy(() => unmarshalLogDeliveryConfigurationSchema)
        .optional(),
    })
    .transform(d => ({
      logDeliveryConfiguration: d.log_delivery_configuration,
    }));

export const unmarshalListLogDeliveryConfigurationResponseSchema: z.ZodType<ListLogDeliveryConfigurationResponse> =
  z
    .object({
      log_delivery_configurations: z
        .array(z.lazy(() => unmarshalLogDeliveryConfigurationSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      logDeliveryConfigurations: d.log_delivery_configurations,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalLogDeliveryConfigurationSchema: z.ZodType<LogDeliveryConfiguration> =
  z
    .object({
      config_id: z.string().optional(),
      config_name: z.string().optional(),
      log_type: z.string().optional(),
      output_format: z.string().optional(),
      account_id: z.string().optional(),
      credentials_id: z.string().optional(),
      storage_configuration_id: z.string().optional(),
      workspace_ids_filter: z
        .array(
          z
            .union([z.number(), z.bigint(), z.string()])
            .transform(v => BigInt(v))
        )
        .optional(),
      delivery_path_prefix: z.string().optional(),
      delivery_start_time: z.string().optional(),
      status: z.string().optional(),
      creation_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      update_time: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      log_delivery_status: z
        .lazy(() => unmarshalLogDeliveryStatusSchema)
        .optional(),
    })
    .transform(d => ({
      configId: d.config_id,
      configName: d.config_name,
      logType: d.log_type,
      outputFormat: d.output_format,
      accountId: d.account_id,
      credentialsId: d.credentials_id,
      storageConfigurationId: d.storage_configuration_id,
      workspaceIdsFilter: d.workspace_ids_filter,
      deliveryPathPrefix: d.delivery_path_prefix,
      deliveryStartTime: d.delivery_start_time,
      status: d.status,
      creationTime: d.creation_time,
      updateTime: d.update_time,
      logDeliveryStatus: d.log_delivery_status,
    }));

export const unmarshalLogDeliveryStatusSchema: z.ZodType<LogDeliveryStatus> = z
  .object({
    status: z.string().optional(),
    last_attempt_time: z.string().optional(),
    last_successful_attempt_time: z.string().optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    status: d.status,
    lastAttemptTime: d.last_attempt_time,
    lastSuccessfulAttemptTime: d.last_successful_attempt_time,
    message: d.message,
  }));

export const unmarshalUpdateLogDeliveryConfigurationResponseSchema: z.ZodType<UpdateLogDeliveryConfigurationResponse> =
  z.object({});

export const marshalCreateLogDeliveryConfigurationParamsSchema: z.ZodType = z
  .object({
    configId: z.string().optional(),
    configName: z.string().optional(),
    logType: z.string().optional(),
    outputFormat: z.string().optional(),
    accountId: z.string().optional(),
    credentialsId: z.string().optional(),
    storageConfigurationId: z.string().optional(),
    workspaceIdsFilter: z.array(z.bigint()).optional(),
    deliveryPathPrefix: z.string().optional(),
    deliveryStartTime: z.string().optional(),
    status: z.string().optional(),
    creationTime: z.bigint().optional(),
    updateTime: z.bigint().optional(),
    logDeliveryStatus: z.lazy(() => marshalLogDeliveryStatusSchema).optional(),
  })
  .transform(d => ({
    config_id: d.configId,
    config_name: d.configName,
    log_type: d.logType,
    output_format: d.outputFormat,
    account_id: d.accountId,
    credentials_id: d.credentialsId,
    storage_configuration_id: d.storageConfigurationId,
    workspace_ids_filter: d.workspaceIdsFilter,
    delivery_path_prefix: d.deliveryPathPrefix,
    delivery_start_time: d.deliveryStartTime,
    status: d.status,
    creation_time: d.creationTime,
    update_time: d.updateTime,
    log_delivery_status: d.logDeliveryStatus,
  }));

export const marshalCreateLogDeliveryConfigurationRequestSchema: z.ZodType = z
  .object({
    logDeliveryConfiguration: z
      .lazy(() => marshalCreateLogDeliveryConfigurationParamsSchema)
      .optional(),
  })
  .transform(d => ({
    log_delivery_configuration: d.logDeliveryConfiguration,
  }));

export const marshalLogDeliveryStatusSchema: z.ZodType = z
  .object({
    status: z.string().optional(),
    lastAttemptTime: z.string().optional(),
    lastSuccessfulAttemptTime: z.string().optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    status: d.status,
    last_attempt_time: d.lastAttemptTime,
    last_successful_attempt_time: d.lastSuccessfulAttemptTime,
    message: d.message,
  }));

export const marshalUpdateLogDeliveryConfigurationRequestSchema: z.ZodType = z
  .object({
    configId: z.string().optional(),
    accountId: z.string().optional(),
    status: z.string().optional(),
  })
  .transform(d => ({
    config_id: d.configId,
    account_id: d.accountId,
    status: d.status,
  }));
