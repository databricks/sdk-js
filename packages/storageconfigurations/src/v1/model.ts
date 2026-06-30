// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface CreateStorageConfigurationRequest {
  /** Required. This field must be set in requests. */
  accountId?: string | undefined;
  /**
   * The human-readable name of the storage configuration.
   *
   * Required. This field must be set in requests.
   */
  storageConfigurationName?: string | undefined;
  /**
   * Root S3 bucket information.
   *
   * Required. This field must be set in requests.
   */
  rootBucketInfo?: RootBucketInfo | undefined;
  /**
   * Optional IAM role that is used to access the workspace catalog which is created during workspace creation
   * for UC by Default. If a storage configuration with this field populated is used to create a workspace,
   * then a workspace catalog is created together with the workspace. The workspace catalog shares the root
   * bucket with internal workspace storage (including DBFS root) but uses a dedicated bucket path prefix.
   */
  roleArn?: string | undefined;
}

export interface DeleteStorageConfigurationRequest {
  /** Required. This field must be set in requests. */
  storageConfigurationId?: string | undefined;
  /** Required. This field must be set in requests. */
  accountId?: string | undefined;
}

export interface GetStorageConfigurationRequest {
  /** Required. This field must be set in requests. */
  storageConfigurationId?: string | undefined;
  /** Required. This field must be set in requests. */
  accountId?: string | undefined;
}

export interface ListStorageConfigurationRequest {
  /** Required. This field must be set in requests. */
  accountId?: string | undefined;
}

export interface ListStorageConfigurationResponse {
  storageConfigurations?: StorageConfiguration[] | undefined;
}

export interface RootBucketInfo {
  /** Name of the S3 bucket */
  bucketName?: string | undefined;
}

export interface StorageConfiguration {
  /** <Databricks> storage configuration ID. */
  storageConfigurationId?: string | undefined;
  /** The <Databricks> account ID associated with this storage configuration. */
  accountId?: string | undefined;
  /** The root bucket information for the storage configuration. */
  rootBucketInfo?: RootBucketInfo | undefined;
  /** The human-readable name of the storage configuration. */
  storageConfigurationName?: string | undefined;
  /** Time in epoch milliseconds when the storage configuration was created. */
  creationTime?: bigint | undefined;
  /**
   * Optional IAM role that is used to access the workspace catalog which is created during workspace creation
   * for UC by Default. If a storage configuration with this field populated is used to create a workspace,
   * then a workspace catalog is created together with the workspace. The workspace catalog shares the root
   * bucket with internal workspace storage (including DBFS root) but uses a dedicated bucket path prefix.
   */
  roleArn?: string | undefined;
}

export const unmarshalRootBucketInfoSchema: z.ZodType<RootBucketInfo> = z
  .object({
    bucket_name: z.string().optional(),
  })
  .transform(d => ({
    bucketName: d.bucket_name,
  }));

export const unmarshalStorageConfigurationSchema: z.ZodType<StorageConfiguration> =
  z
    .object({
      storage_configuration_id: z.string().optional(),
      account_id: z.string().optional(),
      root_bucket_info: z.lazy(() => unmarshalRootBucketInfoSchema).optional(),
      storage_configuration_name: z.string().optional(),
      creation_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      role_arn: z.string().optional(),
    })
    .transform(d => ({
      storageConfigurationId: d.storage_configuration_id,
      accountId: d.account_id,
      rootBucketInfo: d.root_bucket_info,
      storageConfigurationName: d.storage_configuration_name,
      creationTime: d.creation_time,
      roleArn: d.role_arn,
    }));

export const marshalCreateStorageConfigurationRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    storageConfigurationName: z.string().optional(),
    rootBucketInfo: z.lazy(() => marshalRootBucketInfoSchema).optional(),
    roleArn: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    storage_configuration_name: d.storageConfigurationName,
    root_bucket_info: d.rootBucketInfo,
    role_arn: d.roleArn,
  }));

export const marshalRootBucketInfoSchema: z.ZodType = z
  .object({
    bucketName: z.string().optional(),
  })
  .transform(d => ({
    bucket_name: d.bucketName,
  }));
