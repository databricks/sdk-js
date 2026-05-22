// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum CmkUseCase {
  /** Encryption for the control plane resources. */
  MANAGED_SERVICES = 'MANAGED_SERVICES',
  /** Encryption for the customer cloud resources. */
  STORAGE = 'STORAGE',
}

export interface AwsKeyInfo {
  /** The AWS KMS key's Amazon Resource Name (ARN). */
  keyArn?: string | undefined;
  /** The AWS KMS key alias. */
  keyAlias?: string | undefined;
  /** The AWS KMS key region. */
  keyRegion?: string | undefined;
  /**
   * This field applies only if the `use_cases` property includes `STORAGE`. If this is set to true or omitted, the key is also used to encrypt
   * cluster EBS volumes. If you do not want to use this key for encrypting EBS volumes, set to false.
   */
  reuseKeyForClusterVolumes?: boolean | undefined;
}

export interface AzureKeyInfo {
  /** The base URI of the KeyVault. */
  keyVaultUri?: string | undefined;
  /** The name of the key in KeyVault. */
  keyName?: string | undefined;
  /** The current key version. */
  version?: string | undefined;
  /** The tenant id where the KeyVault lives. */
  tenantId?: string | undefined;
  /**
   * The Disk Encryption Set id that is used to represent the key info used for
   * Managed Disk BYOK use case
   */
  diskEncryptionSetId?: string | undefined;
  /**
   * The structure to store key access credential
   * This is set if the Managed Identity is being used to access the Azure Key Vault key.
   */
  keyAccessConfiguration?: KeyAccessConfiguration | undefined;
}

export interface CreateAwsKeyInfo {
  /** The AWS KMS key's Amazon Resource Name (ARN). */
  keyArn?: string | undefined;
  /** The AWS KMS key alias. */
  keyAlias?: string | undefined;
  /** The AWS KMS key region. */
  keyRegion?: string | undefined;
  /**
   * This field applies only if the `use_cases` property includes `STORAGE`. If this is set to true or omitted, the key is also used to encrypt
   * cluster EBS volumes. If you do not want to use this key for encrypting EBS volumes, set to false.
   */
  reuseKeyForClusterVolumes?: boolean | undefined;
}

export interface CreateAzureKeyInfo {
  /** The base URI of the KeyVault. */
  keyVaultUri?: string | undefined;
  /** The name of the key in KeyVault. */
  keyName?: string | undefined;
  /** The current key version. */
  version?: string | undefined;
  /** The tenant id where the KeyVault lives. */
  tenantId?: string | undefined;
  /**
   * The Disk Encryption Set id that is used to represent the key info used for
   * Managed Disk BYOK use case
   */
  diskEncryptionSetId?: string | undefined;
  /**
   * The structure to store key access credential
   * This is set if the Managed Identity is being used to access the Azure Key Vault key.
   */
  keyAccessConfiguration?: KeyAccessConfiguration | undefined;
}

export interface CreateCustomerManagedKeyRequest {
  accountId?: string | undefined;
  /**
   * (-- The key information. Exactly one of aws_key_info, gcp_key_info, or
   * azure_key_info must be set, matching the cloud of the account. --)
   */
  keyInfo?:
    | {$case: 'awsKeyInfo'; awsKeyInfo: CreateAwsKeyInfo}
    | {$case: 'gcpKeyInfo'; gcpKeyInfo: CreateGcpKeyInfo}
    | {$case: 'azureKeyInfo'; azureKeyInfo: CreateAzureKeyInfo}
    | undefined;
  /** The cases that the key can be used for. */
  useCases?: CmkUseCase[] | undefined;
}

export interface CreateGcpKeyInfo {
  /**
   * Globally unique kms key resource id of the form
   * projects/testProjectId/locations/us-east4/keyRings/gcpCmkKeyRing/cryptoKeys/cmk-eastus4
   */
  kmsKeyId?: string | undefined;
  /**
   * Globally unique service account email that has access to the KMS key.
   * The service account exists within the Databricks CP project.
   */
  gcpServiceAccount?: GcpServiceAccount | undefined;
  /**
   * When true, <Databricks> will not use OAuth to grant the service account
   * access to the KMS key. The customer is responsible for granting access
   * manually.
   */
  manual?: boolean | undefined;
}

export interface CustomerManagedKey {
  /** ID of the encryption key configuration object. */
  customerManagedKeyId?: string | undefined;
  /** Time in epoch milliseconds when the customer key was created. */
  creationTime?: number | undefined;
  /** The <Databricks> account ID that holds the customer-managed key. */
  accountId?: string | undefined;
  /**
   * (-- The key information, if aws_key_info is defined, it's a AWS Databricks object.
   * If azure_key_info is defined, it's an Azure Databricks customer key object. --)
   */
  keyInfo?:
    | {$case: 'awsKeyInfo'; awsKeyInfo: AwsKeyInfo}
    | {$case: 'azureKeyInfo'; azureKeyInfo: AzureKeyInfo}
    | {$case: 'gcpKeyInfo'; gcpKeyInfo: GcpKeyInfo}
    | undefined;
  /** The cases that the key can be used for. */
  useCases?: CmkUseCase[] | undefined;
}

export interface DeleteCustomerManagedKeyRequest {
  /** <Databricks> encryption key configuration ID. */
  customerManagedKeyId?: string | undefined;
  accountId?: string | undefined;
}

export interface GcpKeyInfo {
  /**
   * Globally unique kms key resource id of the form
   * projects/testProjectId/locations/us-east4/keyRings/gcpCmkKeyRing/cryptoKeys/cmk-eastus4
   */
  kmsKeyId?: string | undefined;
  /**
   * Globally unique service account email that has access to the KMS key.
   * The service account exists within the Databricks CP project.
   */
  gcpServiceAccount?: GcpServiceAccount | undefined;
  /**
   * When true, <Databricks> will not use OAuth to grant the service account
   * access to the KMS key. The customer is responsible for granting access
   * manually.
   */
  manual?: boolean | undefined;
}

export interface GcpServiceAccount {
  serviceAccountEmail?: string | undefined;
}

export interface GetCustomerManagedKeyRequest {
  /** <Databricks> encryption key configuration ID. */
  customerManagedKeyId?: string | undefined;
  accountId?: string | undefined;
}

/** The credential ID that is used to access the key vault. */
export interface KeyAccessConfiguration {
  credentialId?: string | undefined;
}

export interface ListCustomerManagedKeyRequest {
  accountId?: string | undefined;
}

export interface ListCustomerManagedKeyResponse {
  customerManagedKeys?: CustomerManagedKey[] | undefined;
}

export const unmarshalAwsKeyInfoSchema: z.ZodType<AwsKeyInfo> = z
  .object({
    key_arn: z.string().optional(),
    key_alias: z.string().optional(),
    key_region: z.string().optional(),
    reuse_key_for_cluster_volumes: z.boolean().optional(),
  })
  .transform(d => ({
    keyArn: d.key_arn,
    keyAlias: d.key_alias,
    keyRegion: d.key_region,
    reuseKeyForClusterVolumes: d.reuse_key_for_cluster_volumes,
  }));

export const unmarshalAzureKeyInfoSchema: z.ZodType<AzureKeyInfo> = z
  .object({
    key_vault_uri: z.string().optional(),
    key_name: z.string().optional(),
    version: z.string().optional(),
    tenant_id: z.string().optional(),
    disk_encryption_set_id: z.string().optional(),
    key_access_configuration: z
      .lazy(() => unmarshalKeyAccessConfigurationSchema)
      .optional(),
  })
  .transform(d => ({
    keyVaultUri: d.key_vault_uri,
    keyName: d.key_name,
    version: d.version,
    tenantId: d.tenant_id,
    diskEncryptionSetId: d.disk_encryption_set_id,
    keyAccessConfiguration: d.key_access_configuration,
  }));

export const unmarshalCustomerManagedKeySchema: z.ZodType<CustomerManagedKey> =
  z
    .object({
      customer_managed_key_id: z.string().optional(),
      creation_time: z.number().optional(),
      account_id: z.string().optional(),
      aws_key_info: z.lazy(() => unmarshalAwsKeyInfoSchema).optional(),
      azure_key_info: z.lazy(() => unmarshalAzureKeyInfoSchema).optional(),
      gcp_key_info: z.lazy(() => unmarshalGcpKeyInfoSchema).optional(),
      use_cases: z.array(z.enum(CmkUseCase)).optional(),
    })
    .transform(d => ({
      customerManagedKeyId: d.customer_managed_key_id,
      creationTime: d.creation_time,
      accountId: d.account_id,
      keyInfo:
        d.aws_key_info !== undefined
          ? {$case: 'awsKeyInfo' as const, awsKeyInfo: d.aws_key_info}
          : d.azure_key_info !== undefined
            ? {$case: 'azureKeyInfo' as const, azureKeyInfo: d.azure_key_info}
            : d.gcp_key_info !== undefined
              ? {$case: 'gcpKeyInfo' as const, gcpKeyInfo: d.gcp_key_info}
              : undefined,
      useCases: d.use_cases,
    }));

export const unmarshalGcpKeyInfoSchema: z.ZodType<GcpKeyInfo> = z
  .object({
    kms_key_id: z.string().optional(),
    gcp_service_account: z
      .lazy(() => unmarshalGcpServiceAccountSchema)
      .optional(),
    manual: z.boolean().optional(),
  })
  .transform(d => ({
    kmsKeyId: d.kms_key_id,
    gcpServiceAccount: d.gcp_service_account,
    manual: d.manual,
  }));

export const unmarshalGcpServiceAccountSchema: z.ZodType<GcpServiceAccount> = z
  .object({
    service_account_email: z.string().optional(),
  })
  .transform(d => ({
    serviceAccountEmail: d.service_account_email,
  }));

export const unmarshalKeyAccessConfigurationSchema: z.ZodType<KeyAccessConfiguration> =
  z
    .object({
      credential_id: z.string().optional(),
    })
    .transform(d => ({
      credentialId: d.credential_id,
    }));

export const marshalCreateAwsKeyInfoSchema: z.ZodType = z
  .object({
    keyArn: z.string().optional(),
    keyAlias: z.string().optional(),
    keyRegion: z.string().optional(),
    reuseKeyForClusterVolumes: z.boolean().optional(),
  })
  .transform(d => ({
    key_arn: d.keyArn,
    key_alias: d.keyAlias,
    key_region: d.keyRegion,
    reuse_key_for_cluster_volumes: d.reuseKeyForClusterVolumes,
  }));

export const marshalCreateAzureKeyInfoSchema: z.ZodType = z
  .object({
    keyVaultUri: z.string().optional(),
    keyName: z.string().optional(),
    version: z.string().optional(),
    tenantId: z.string().optional(),
    diskEncryptionSetId: z.string().optional(),
    keyAccessConfiguration: z
      .lazy(() => marshalKeyAccessConfigurationSchema)
      .optional(),
  })
  .transform(d => ({
    key_vault_uri: d.keyVaultUri,
    key_name: d.keyName,
    version: d.version,
    tenant_id: d.tenantId,
    disk_encryption_set_id: d.diskEncryptionSetId,
    key_access_configuration: d.keyAccessConfiguration,
  }));

export const marshalCreateCustomerManagedKeyRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    keyInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('awsKeyInfo'),
          awsKeyInfo: z.lazy(() => marshalCreateAwsKeyInfoSchema),
        }),
        z.object({
          $case: z.literal('gcpKeyInfo'),
          gcpKeyInfo: z.lazy(() => marshalCreateGcpKeyInfoSchema),
        }),
        z.object({
          $case: z.literal('azureKeyInfo'),
          azureKeyInfo: z.lazy(() => marshalCreateAzureKeyInfoSchema),
        }),
      ])
      .optional(),
    useCases: z.array(z.enum(CmkUseCase)).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    ...(d.keyInfo?.$case === 'awsKeyInfo' && {
      aws_key_info: d.keyInfo.awsKeyInfo,
    }),
    ...(d.keyInfo?.$case === 'gcpKeyInfo' && {
      gcp_key_info: d.keyInfo.gcpKeyInfo,
    }),
    ...(d.keyInfo?.$case === 'azureKeyInfo' && {
      azure_key_info: d.keyInfo.azureKeyInfo,
    }),
    use_cases: d.useCases,
  }));

export const marshalCreateGcpKeyInfoSchema: z.ZodType = z
  .object({
    kmsKeyId: z.string().optional(),
    gcpServiceAccount: z.lazy(() => marshalGcpServiceAccountSchema).optional(),
    manual: z.boolean().optional(),
  })
  .transform(d => ({
    kms_key_id: d.kmsKeyId,
    gcp_service_account: d.gcpServiceAccount,
    manual: d.manual,
  }));

export const marshalGcpServiceAccountSchema: z.ZodType = z
  .object({
    serviceAccountEmail: z.string().optional(),
  })
  .transform(d => ({
    service_account_email: d.serviceAccountEmail,
  }));

export const marshalKeyAccessConfigurationSchema: z.ZodType = z
  .object({
    credentialId: z.string().optional(),
  })
  .transform(d => ({
    credential_id: d.credentialId,
  }));
