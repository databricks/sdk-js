// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum IsolationMode {
  ISOLATION_MODE_UNSPECIFIED = 'ISOLATION_MODE_UNSPECIFIED',
  ISOLATION_MODE_OPEN = 'ISOLATION_MODE_OPEN',
  ISOLATION_MODE_ISOLATED = 'ISOLATION_MODE_ISOLATED',
  ISOLATION_MODE_OPEN_IN_ACCOUNT = 'ISOLATION_MODE_OPEN_IN_ACCOUNT',
}

export enum PathOperation {
  PATH_READ = 'PATH_READ',
  PATH_READ_WRITE = 'PATH_READ_WRITE',
  PATH_CREATE_TABLE = 'PATH_CREATE_TABLE',
}

export enum TableOperation {
  READ = 'READ',
  READ_WRITE = 'READ_WRITE',
}

export enum VolumeOperation {
  READ_VOLUME = 'READ_VOLUME',
  WRITE_VOLUME = 'WRITE_VOLUME',
}

/** A enum represents the result of the file operation */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ValidateCredential_Result {
  PASS = 'PASS',
  FAIL = 'FAIL',
  SKIP = 'SKIP',
}

/**
 * A enum represents the file operation performed on the external location
 * with the storage credential
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ValidateStorageCredential_FileOperation {
  LIST = 'LIST',
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  PATH_EXISTS = 'PATH_EXISTS',
}

/** A enum represents the result of the file operation */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ValidateStorageCredential_Result {
  PASS = 'PASS',
  FAIL = 'FAIL',
  SKIP = 'SKIP',
}

export interface AccountsCreateStorageCredentialPublic {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
  credentialInfo?: CreateAccountsStorageCredential | undefined;
  /**
   * Optional, default false.
   * Supplying true to this argument skips validation of the created set of credentials.
   */
  skipValidation?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AccountsCreateStorageCredentialPublic_Response {
  credentialInfo?: StorageCredentialInfo | undefined;
}

/** Deletes a storage credential for an account */
export interface AccountsDeleteStorageCredentialPublic {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
  /** Name of the storage credential. */
  nameArg?: string | undefined;
  /** Force deletion even if the Storage Credential is not empty. Default is false. */
  force?: boolean | undefined;
}

/** The storage credential was successfully deleted. */
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface AccountsDeleteStorageCredentialPublic_Response {}

/** Retrieves a single storage credential */
export interface AccountsGetStorageCredentialPublic {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
  /** Required. Name of the storage credential. */
  nameArg?: string | undefined;
}

/** The storage credential was successfully retrieved. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AccountsGetStorageCredentialPublic_Response {
  credentialInfo?: StorageCredentialInfo | undefined;
}

/** Lists all storage credentials for the given account and metastore */
export interface AccountsListStorageCredentialsPublic {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
}

/** The metastore storage credentials were successfully returned. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AccountsListStorageCredentialsPublic_Response {
  /** An array of metastore storage credentials. */
  storageCredentials?: StorageCredentialInfo[] | undefined;
}

/** The storage credential to update. */
export interface AccountsUpdateStorageCredentialPublic {
  /** <Databricks> account ID of any type. For non-E2 account types, get your account ID from the [Accounts Console](https://docs.databricks.com/administration-guide/account-settings/usage.html) */
  accountId?: string | undefined;
  /** Unity Catalog metastore ID */
  metastoreId?: string | undefined;
  /** Name of the storage credential. */
  nameArg?: string | undefined;
  credentialInfo?: UpdateAccountsStorageCredential | undefined;
  /** Optional. Supplying true to this argument skips validation of the updated set of credentials. */
  skipValidation?: boolean | undefined;
}

/** The storage credential was successfully updated. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AccountsUpdateStorageCredentialPublic_Response {
  credentialInfo?: StorageCredentialInfo | undefined;
}

export interface AwsCredentials {
  creds?: {$case: 'stsRole'; stsRole: AwsCredentials_StsRole} | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AwsCredentials_StsRole {
  /** The Amazon Resource Name (ARN) of the cross account IAM role. */
  roleArn?: string | undefined;
}

/** The AWS IAM role configuration */
export interface AwsIamRole {
  /** The Amazon Resource Name (ARN) of the AWS IAM role used to vend temporary credentials. */
  roleArn?: string | undefined;
  /**
   * The Amazon Resource Name (ARN) of the AWS IAM user managed by <Databricks>.
   * This is the identity that is going to assume the AWS IAM role.
   */
  unityCatalogIamArn?: string | undefined;
  /** The external ID used in role assumption to prevent the confused deputy problem. */
  externalId?: string | undefined;
}

/**
 * Azure Active Directory token, essentially the Oauth token for Azure Service Principal or Managed
 * Identity.
 * Read more at https://learn.microsoft.com/en-us/azure/databricks/dev-tools/api/latest/aad/service-prin-aad-token
 */
export interface AzureActiveDirectoryToken {
  /** Opaque token that contains claims that you can use in Azure Active Directory to access cloud services. */
  aadToken?: string | undefined;
}

/** The Azure managed identity configuration. */
export interface AzureManagedIdentity {
  /**
   * The Azure resource ID of the Azure Databricks Access Connector. Use the format
   * `/subscriptions/{guid}/resourceGroups/{rg-name}/providers/Microsoft.Databricks/accessConnectors/{connector-name}`.
   */
  accessConnectorId?: string | undefined;
  /**
   * The Azure resource ID of the managed identity. Use the format,
   * `/subscriptions/{guid}/resourceGroups/{rg-name}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identity-name}`
   * This is only available for user-assgined identities. For system-assigned identities, the access_connector_id is used to identify the identity.
   * If this field is not provided, then we assume the AzureManagedIdentity is using the system-assigned identity.
   */
  managedIdentityId?: string | undefined;
  /** The <Databricks> internal ID that represents this managed identity. */
  credentialId?: string | undefined;
}

/** The Azure service principal configuration. Only applicable when purpose is **STORAGE**. */
export interface AzureServicePrincipal {
  /** The directory ID corresponding to the Azure Active Directory (AAD) tenant of the application. */
  directoryId?: string | undefined;
  /** The application ID of the application registration within the referenced AAD tenant. */
  applicationId?: string | undefined;
  /** The client secret generated for the above app ID in AAD. */
  clientSecret?: string | undefined;
}

/**
 * Azure temporary credentials for API authentication.
 * Read more at https://docs.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas
 */
export interface AzureUserDelegationSas {
  /** The signed URI (SAS Token) used to access blob services for a given path */
  sasToken?: string | undefined;
}

/**
 * The Cloudflare API token configuration.
 * Read more at https://developers.cloudflare.com/r2/api/s3/tokens/
 */
export interface CloudflareApiToken {
  /** The access key ID associated with the API token. */
  accessKeyId?: string | undefined;
  /** The secret access token generated for the above access key ID. */
  secretAccessKey?: string | undefined;
  /** The ID of the account associated with the API token. */
  accountId?: string | undefined;
}

export interface CreateAccountsStorageCredential {
  /**
   * The credential name. The name must be unique among storage and service
   * credentials within the metastore.
   */
  name?: string | undefined;
  /** (--[Create:REQ, Update:OPT] The long-lived cloud credential.--) */
  credential?:
    | {
        $case: 'awsIamRole';
        /** The AWS IAM role configuration. */
        awsIamRole: AwsIamRole;
      }
    | {
        $case: 'azureServicePrincipal';
        /** The Azure service principal configuration. */
        azureServicePrincipal: AzureServicePrincipal;
      }
    | {
        $case: 'gcpServiceAccountKey';
        gcpServiceAccountKey: GcpServiceAccountKey;
      }
    | {
        $case: 'azureManagedIdentity';
        /** The Azure managed identity configuration. */
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        /** The <Databricks> managed GCP service account configuration. */
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | {
        $case: 'cloudflareApiToken';
        /** The Cloudflare API token configuration. */
        cloudflareApiToken: CloudflareApiToken;
      }
    | undefined;
  /** Comment associated with the credential. */
  comment?: string | undefined;
  /**
   * Whether the credential is usable only for read operations. Only applicable
   * when purpose is **STORAGE**.
   */
  readOnly?: boolean | undefined;
  /** Username of current owner of credential. */
  owner?: string | undefined;
  /** The unique identifier of the credential. */
  id?: string | undefined;
  /** Unique identifier of the parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this credential was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of credential creator. */
  createdBy?: string | undefined;
  /** Time at which this credential was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the credential. */
  updatedBy?: string | undefined;
  /**
   * Whether this credential is the current metastore's root storage credential.
   * Only applicable when purpose is **STORAGE**.
   */
  usedForManagedStorage?: boolean | undefined;
  /** The full name of the credential. */
  fullName?: string | undefined;
  /**
   * Whether the current securable is accessible from all workspaces or a
   * specific set of workspaces.
   */
  isolationMode?: IsolationMode | undefined;
}

export interface CreateCredential {
  /**
   * Optional. Supplying true to this argument skips validation of the created
   * set of credentials.
   */
  skipValidation?: boolean | undefined;
  /**
   * The credential name. The name must be unique among storage and service
   * credentials within the metastore.
   */
  name?: string | undefined;
  /** (--[Create:REQ, Update:OPT] The long-lived cloud credential.--) */
  credential?:
    | {
        $case: 'awsIamRole';
        /** The AWS IAM role configuration. */
        awsIamRole: AwsIamRole;
      }
    | {
        $case: 'azureServicePrincipal';
        /** The Azure service principal configuration. */
        azureServicePrincipal: AzureServicePrincipal;
      }
    | {
        $case: 'gcpServiceAccountKey';
        gcpServiceAccountKey: GcpServiceAccountKey;
      }
    | {
        $case: 'azureManagedIdentity';
        /** The Azure managed identity configuration. */
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        /** The <Databricks> managed GCP service account configuration. */
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | {
        $case: 'cloudflareApiToken';
        /** The Cloudflare API token configuration. */
        cloudflareApiToken: CloudflareApiToken;
      }
    | undefined;
  /** Comment associated with the credential. */
  comment?: string | undefined;
  /**
   * Whether the credential is usable only for read operations. Only applicable
   * when purpose is **STORAGE**.
   */
  readOnly?: boolean | undefined;
  /** Username of current owner of credential. */
  owner?: string | undefined;
  /** The unique identifier of the credential. */
  id?: string | undefined;
  /** Unique identifier of the parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this credential was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of credential creator. */
  createdBy?: string | undefined;
  /** Time at which this credential was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the credential. */
  updatedBy?: string | undefined;
  /**
   * Whether this credential is the current metastore's root storage credential.
   * Only applicable when purpose is **STORAGE**.
   */
  usedForManagedStorage?: boolean | undefined;
  /** The full name of the credential. */
  fullName?: string | undefined;
  /**
   * Whether the current securable is accessible from all workspaces or a
   * specific set of workspaces.
   */
  isolationMode?: IsolationMode | undefined;
}

export interface CreateCredentialAwsCredentials {
  creds?: {$case: 'stsRole'; stsRole: AwsCredentials_StsRole} | undefined;
}

export interface CreateCredentialsPublicRequest {
  accountId?: string | undefined;
  /** The human-readable name of the credential configuration object. */
  credentialsName?: string | undefined;
  /** (-- NOTE(austin) This oneof is a future-looking definition when we add other clouds --) */
  cloudCredentials?:
    | {$case: 'awsCredentials'; awsCredentials: CreateCredentialAwsCredentials}
    | undefined;
}

export interface CreateStorageCredential {
  /** Supplying true to this argument skips validation of the created credential. */
  skipValidation?: boolean | undefined;
  /**
   * The credential name. The name must be unique among storage and service
   * credentials within the metastore.
   */
  name?: string | undefined;
  /** (--[Create:REQ, Update:OPT] The long-lived cloud credential.--) */
  credential?:
    | {
        $case: 'awsIamRole';
        /** The AWS IAM role configuration. */
        awsIamRole: AwsIamRole;
      }
    | {
        $case: 'azureServicePrincipal';
        /** The Azure service principal configuration. */
        azureServicePrincipal: AzureServicePrincipal;
      }
    | {
        $case: 'gcpServiceAccountKey';
        gcpServiceAccountKey: GcpServiceAccountKey;
      }
    | {
        $case: 'azureManagedIdentity';
        /** The Azure managed identity configuration. */
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        /** The <Databricks> managed GCP service account configuration. */
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | {
        $case: 'cloudflareApiToken';
        /** The Cloudflare API token configuration. */
        cloudflareApiToken: CloudflareApiToken;
      }
    | undefined;
  /** Comment associated with the credential. */
  comment?: string | undefined;
  /**
   * Whether the credential is usable only for read operations. Only applicable
   * when purpose is **STORAGE**.
   */
  readOnly?: boolean | undefined;
  /** Username of current owner of credential. */
  owner?: string | undefined;
  /** The unique identifier of the credential. */
  id?: string | undefined;
  /** Unique identifier of the parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this credential was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of credential creator. */
  createdBy?: string | undefined;
  /** Time at which this credential was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the credential. */
  updatedBy?: string | undefined;
  /**
   * Whether this credential is the current metastore's root storage credential.
   * Only applicable when purpose is **STORAGE**.
   */
  usedForManagedStorage?: boolean | undefined;
  /** The full name of the credential. */
  fullName?: string | undefined;
  /**
   * Whether the current securable is accessible from all workspaces or a
   * specific set of workspaces.
   */
  isolationMode?: IsolationMode | undefined;
}

export interface CredentialInfo {
  /**
   * The credential name. The name must be unique among storage and service
   * credentials within the metastore.
   */
  name?: string | undefined;
  /** (--[Create:REQ, Update:OPT] The long-lived cloud credential.--) */
  credential?:
    | {
        $case: 'awsIamRole';
        /** The AWS IAM role configuration. */
        awsIamRole: AwsIamRole;
      }
    | {
        $case: 'azureServicePrincipal';
        /** The Azure service principal configuration. */
        azureServicePrincipal: AzureServicePrincipal;
      }
    | {
        $case: 'gcpServiceAccountKey';
        gcpServiceAccountKey: GcpServiceAccountKey;
      }
    | {
        $case: 'azureManagedIdentity';
        /** The Azure managed identity configuration. */
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        /** The <Databricks> managed GCP service account configuration. */
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | {
        $case: 'cloudflareApiToken';
        /** The Cloudflare API token configuration. */
        cloudflareApiToken: CloudflareApiToken;
      }
    | undefined;
  /** Comment associated with the credential. */
  comment?: string | undefined;
  /**
   * Whether the credential is usable only for read operations. Only applicable
   * when purpose is **STORAGE**.
   */
  readOnly?: boolean | undefined;
  /** Username of current owner of credential. */
  owner?: string | undefined;
  /** The unique identifier of the credential. */
  id?: string | undefined;
  /** Unique identifier of the parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this credential was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of credential creator. */
  createdBy?: string | undefined;
  /** Time at which this credential was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the credential. */
  updatedBy?: string | undefined;
  /**
   * Whether this credential is the current metastore's root storage credential.
   * Only applicable when purpose is **STORAGE**.
   */
  usedForManagedStorage?: boolean | undefined;
  /** The full name of the credential. */
  fullName?: string | undefined;
  /**
   * Whether the current securable is accessible from all workspaces or a
   * specific set of workspaces.
   */
  isolationMode?: IsolationMode | undefined;
}

export interface Credentials {
  /** <Databricks> credential configuration ID. */
  credentialsId?: string | undefined;
  /** The <Databricks> account ID that hosts the credential. */
  accountId?: string | undefined;
  /** (-- NOTE(austin) This oneof is a future-looking definition when we add other clouds --) */
  cloudCredentials?:
    | {$case: 'awsCredentials'; awsCredentials: AwsCredentials}
    | undefined;
  /** The human-readable name of the credential configuration object. */
  credentialsName?: string | undefined;
  /** Time in epoch milliseconds when the credential was created. */
  creationTime?: number | undefined;
}

/**
 * GCP long-lived credential.
 * <Databricks>-created Google Cloud Storage service account.
 */
export interface DatabricksGcpServiceAccount {
  /** The email of the service account. */
  email?: string | undefined;
  /** The ID that represents the private key for this Service Account */
  privateKeyId?: string | undefined;
  /** The <Databricks> internal ID that represents this managed identity. */
  credentialId?: string | undefined;
}

export interface DeleteCredential {
  /** Name of the credential. */
  nameArg?: string | undefined;
  /**
   * Force an update even if there are dependent services (when purpose is
   * **SERVICE**) or dependent external locations and external tables (when
   * purpose is **STORAGE**).
   */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteCredential_Response {}

export interface DeleteCredentialsPublicRequest {
  /** Databricks Account API credential configuration ID */
  credentialsId?: string | undefined;
  accountId?: string | undefined;
}

export interface DeleteStorageCredential {
  /** Name of the storage credential. */
  nameArg?: string | undefined;
  /**
   * Force an update even if there are dependent external locations or external
   * tables (when purpose is **STORAGE**) or dependent services (when purpose is
   * **SERVICE**).
   */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteStorageCredential_Response {}

/**
 * GCP temporary credentials for API authentication.
 * Read more at https://developers.google.com/identity/protocols/oauth2/service-account
 */
export interface GcpOauthToken {
  oauthToken?: string | undefined;
}

/**
 * GCP long-lived credential.
 * GCP Service Account.
 */
export interface GcpServiceAccountKey {
  /** The email of the service account. */
  email?: string | undefined;
  /** The ID of the service account's private key. */
  privateKeyId?: string | undefined;
  /** The service account's RSA private key. */
  privateKey?: string | undefined;
}

export interface GenerateTemporaryPathCredential {
  /** URL for path-based access. */
  url?: string | undefined;
  /** The operation being performed on the path. */
  operation?: PathOperation | undefined;
  /**
   * Optional. When set to true, the service will not validate that the generated
   * credentials can perform write operations, therefore no new paths will be created
   * and the response will not contain valid credentials. Defaults to false.
   */
  dryRun?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GenerateTemporaryPathCredential_Response {
  /** The temporary credential. */
  credentials?:
    | {$case: 'awsTempCredentials'; awsTempCredentials: TemporaryAwsCredentials}
    | {
        $case: 'azureUserDelegationSas';
        azureUserDelegationSas: AzureUserDelegationSas;
      }
    | {$case: 'gcpOauthToken'; gcpOauthToken: GcpOauthToken}
    | {$case: 'azureAad'; azureAad: AzureActiveDirectoryToken}
    | {$case: 'r2TempCredentials'; r2TempCredentials: R2Credentials}
    | {$case: 'ucEncryptedToken'; ucEncryptedToken: UcEncryptedToken}
    | undefined;
  /**
   * Server time when the credential will expire, in epoch milliseconds.
   * The API client is advised to cache the credential given this expiration time.
   */
  expirationTime?: number | undefined;
  /** The URL of the storage path accessible by the temporary credential. */
  url?: string | undefined;
}

export interface GenerateTemporaryServiceCredential {
  /** The name of the service credential used to generate a temporary credential */
  credentialName?: string | undefined;
  options?:
    | {
        $case: 'azureOptions';
        azureOptions: GenerateTemporaryServiceCredential_AzureOptions;
      }
    | {
        $case: 'gcpOptions';
        gcpOptions: GenerateTemporaryServiceCredential_GcpOptions;
      }
    | undefined;
}

/** The Azure cloud options to customize the requested temporary credential */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GenerateTemporaryServiceCredential_AzureOptions {
  /**
   * The resources to which the temporary Azure credential should apply. These resources
   * are the scopes that are passed to the token provider (see https://learn.microsoft.com/python/api/azure-core/azure.core.credentials.tokencredential?view=azure-python)
   */
  resources?: string[] | undefined;
}

/** The GCP cloud options to customize the requested temporary credential */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GenerateTemporaryServiceCredential_GcpOptions {
  /**
   * The scopes to which the temporary GCP credential should apply. These resources
   * are the scopes that are passed to the token provider (see
   * https://google-auth.readthedocs.io/en/latest/reference/google.auth.html#google.auth.credentials.Credentials)
   */
  scopes?: string[] | undefined;
}

export interface GenerateTemporaryTableCredential {
  /** UUID of the table to read or write. */
  tableId?: string | undefined;
  /**
   * The operation performed against the table data, either READ or READ_WRITE. If READ_WRITE is specified,
   * the credentials returned will have write permissions, otherwise, it will be read only.
   */
  operation?: TableOperation | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GenerateTemporaryTableCredential_Response {
  /** The temporary credential. */
  credentials?:
    | {$case: 'awsTempCredentials'; awsTempCredentials: TemporaryAwsCredentials}
    | {
        $case: 'azureUserDelegationSas';
        azureUserDelegationSas: AzureUserDelegationSas;
      }
    | {$case: 'gcpOauthToken'; gcpOauthToken: GcpOauthToken}
    | {$case: 'azureAad'; azureAad: AzureActiveDirectoryToken}
    | {$case: 'r2TempCredentials'; r2TempCredentials: R2Credentials}
    | {$case: 'ucEncryptedToken'; ucEncryptedToken: UcEncryptedToken}
    | undefined;
  /**
   * Server time when the credential will expire, in epoch milliseconds.
   * The API client is advised to cache the credential given this expiration time.
   */
  expirationTime?: number | undefined;
  /** The URL of the storage path accessible by the temporary credential. */
  url?: string | undefined;
}

/** Generate volume credentials RPC */
export interface GenerateTemporaryVolumeCredential {
  /** Id of the volume to read or write. */
  volumeId?: string | undefined;
  /**
   * The operation performed against the volume data, either READ_VOLUME or WRITE_VOLUME. If WRITE_VOLUME is specified,
   * the credentials returned will have write permissions, otherwise, it will be read only.
   */
  operation?: VolumeOperation | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GenerateTemporaryVolumeCredential_Response {
  /** The temporary credential. */
  credentials?:
    | {$case: 'awsTempCredentials'; awsTempCredentials: TemporaryAwsCredentials}
    | {
        $case: 'azureUserDelegationSas';
        azureUserDelegationSas: AzureUserDelegationSas;
      }
    | {$case: 'gcpOauthToken'; gcpOauthToken: GcpOauthToken}
    | {$case: 'azureAad'; azureAad: AzureActiveDirectoryToken}
    | {$case: 'r2TempCredentials'; r2TempCredentials: R2Credentials}
    | {$case: 'ucEncryptedToken'; ucEncryptedToken: UcEncryptedToken}
    | undefined;
  /**
   * Server time when the credential will expire, in epoch milliseconds.
   * The API client is advised to cache the credential given this expiration time.
   */
  expirationTime?: number | undefined;
  /** The URL of the storage path accessible by the temporary credential. */
  url?: string | undefined;
}

export interface GetCredential {
  /** Name of the credential. */
  nameArg?: string | undefined;
}

export interface GetCredentialsPublicRequest {
  /** Credential configuration ID */
  credentialsId?: string | undefined;
  accountId?: string | undefined;
}

/**
 * TODO(UC-1710): The legacy /storage-credentials API is being deprecated.
 * Please use the new consolidated /credentials API instead.
 * See https://github.com/databricks-eng/universe/pull/857047#discussion_r1924779791 for an example of a case when that wasn't possible.
 */
export interface GetStorageCredential {
  /** Name of the storage credential. */
  nameArg?: string | undefined;
}

/**
 * ListCredentialsRequest is used to list credentials in the metastore.
 * Returns an array of credentials (as CredentialInfo objects). The array is
 * limited to the credentials that the caller has permission to access. If the
 * caller is a metastore admin, retrieval of credentials is unrestricted.
 *
 * There is no guarantee of a specific ordering of the elements in the array.
 */
export interface ListCredentials {
  /**
   * Whether to include credentials not bound to the workspace.
   * Effective only if the user has permission to update the credential–workspace binding.
   */
  includeUnbound?: boolean | undefined;
  /**
   * Maximum number of credentials to return.
   * - If not set, the default max page size is used.
   * - When set to a value greater than 0, the page length is the minimum of
   * this value and a server-configured value.
   * - When set to 0, the page length is set to a server-configured value
   * (recommended).
   * - When set to a value less than 0, an invalid parameter error is
   * returned.
   */
  maxResults?: number | undefined;
  /** Opaque token to retrieve the next page of results. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListCredentials_Response {
  credentials?: CredentialInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no
   * more pages.
   * __page_token__ should be set to this value for the next request (for the
   * next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListCredentialsPublicRequest {
  accountId?: string | undefined;
}

export interface ListCredentialsPublicResponse {
  credentials?: Credentials[] | undefined;
}

export interface ListStorageCredentials {
  /**
   * Whether to include credentials not bound to the workspace.
   * Effective only if the user has permission to update the credential–workspace binding.
   */
  includeUnbound?: boolean | undefined;
  /**
   * Maximum number of storage credentials to return.
   * If not set, all the storage credentials are returned (not recommended).
   * - when set to a value greater than 0, the page length is the minimum of
   * this value and a server configured value;
   * - when set to 0, the page length is set to a server configured value
   * (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListStorageCredentials_Response {
  storageCredentials?: StorageCredentialInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no
   * more pages.
   * __page_token__ should be set to this value for the next request (for the
   * next page of results).
   */
  nextPageToken?: string | undefined;
}

/**
 * R2 temporary credentials for API authentication.
 * Read more at https://developers.cloudflare.com/r2/api/s3/tokens/.
 */
export interface R2Credentials {
  /** The access key ID that identifies the temporary credentials. */
  accessKeyId?: string | undefined;
  /** The secret access key associated with the access key. */
  secretAccessKey?: string | undefined;
  /** The generated JWT that users must pass to use the temporary credentials. */
  sessionToken?: string | undefined;
}

export interface StorageCredentialInfo {
  /**
   * The credential name. The name must be unique among storage and service
   * credentials within the metastore.
   */
  name?: string | undefined;
  /** (--[Create:REQ, Update:OPT] The long-lived cloud credential.--) */
  credential?:
    | {
        $case: 'awsIamRole';
        /** The AWS IAM role configuration. */
        awsIamRole: AwsIamRole;
      }
    | {
        $case: 'azureServicePrincipal';
        /** The Azure service principal configuration. */
        azureServicePrincipal: AzureServicePrincipal;
      }
    | {
        $case: 'gcpServiceAccountKey';
        gcpServiceAccountKey: GcpServiceAccountKey;
      }
    | {
        $case: 'azureManagedIdentity';
        /** The Azure managed identity configuration. */
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        /** The <Databricks> managed GCP service account configuration. */
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | {
        $case: 'cloudflareApiToken';
        /** The Cloudflare API token configuration. */
        cloudflareApiToken: CloudflareApiToken;
      }
    | undefined;
  /** Comment associated with the credential. */
  comment?: string | undefined;
  /**
   * Whether the credential is usable only for read operations. Only applicable
   * when purpose is **STORAGE**.
   */
  readOnly?: boolean | undefined;
  /** Username of current owner of credential. */
  owner?: string | undefined;
  /** The unique identifier of the credential. */
  id?: string | undefined;
  /** Unique identifier of the parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this credential was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of credential creator. */
  createdBy?: string | undefined;
  /** Time at which this credential was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the credential. */
  updatedBy?: string | undefined;
  /**
   * Whether this credential is the current metastore's root storage credential.
   * Only applicable when purpose is **STORAGE**.
   */
  usedForManagedStorage?: boolean | undefined;
  /** The full name of the credential. */
  fullName?: string | undefined;
  /**
   * Whether the current securable is accessible from all workspaces or a
   * specific set of workspaces.
   */
  isolationMode?: IsolationMode | undefined;
}

/**
 * AWS temporary credentials for API authentication.
 * Read more at https://docs.aws.amazon.com/STS/latest/APIReference/API_Credentials.html.
 */
export interface TemporaryAwsCredentials {
  /** The access key ID that identifies the temporary credentials. */
  accessKeyId?: string | undefined;
  /** The secret access key that can be used to sign AWS API requests. */
  secretAccessKey?: string | undefined;
  /** The token that users must pass to AWS API to use the temporary credentials. */
  sessionToken?: string | undefined;
  /**
   * The Amazon Resource Name (ARN) of the S3 access point for
   * temporary credentials related the external location.
   */
  accessPoint?: string | undefined;
}

export interface TemporaryCredentials {
  /** The temporary credential. */
  credentials?:
    | {$case: 'awsTempCredentials'; awsTempCredentials: TemporaryAwsCredentials}
    | {
        $case: 'azureUserDelegationSas';
        azureUserDelegationSas: AzureUserDelegationSas;
      }
    | {$case: 'gcpOauthToken'; gcpOauthToken: GcpOauthToken}
    | {$case: 'azureAad'; azureAad: AzureActiveDirectoryToken}
    | {$case: 'r2TempCredentials'; r2TempCredentials: R2Credentials}
    | {$case: 'ucEncryptedToken'; ucEncryptedToken: UcEncryptedToken}
    | undefined;
  /**
   * Server time when the credential will expire, in epoch milliseconds.
   * The API client is advised to cache the credential given this expiration time.
   */
  expirationTime?: number | undefined;
  /** The URL of the storage path accessible by the temporary credential. */
  url?: string | undefined;
}

/**
 * Encrypted token used when we cannot downscope the cloud provider token appropriately
 * See: https://docs.google.com/document/d/1hEKDnSckuU5PIS798CtfqBElrMR6OJuR2wgz_BjhMSY
 */
export interface UcEncryptedToken {
  /** Stores encrypted ScopedCloudToken as a base64-encoded string */
  encryptedPayload?: string | undefined;
}

export interface UpdateAccountsStorageCredential {
  /**
   * The credential name. The name must be unique among storage and service
   * credentials within the metastore.
   */
  name?: string | undefined;
  /** (--[Create:REQ, Update:OPT] The long-lived cloud credential.--) */
  credential?:
    | {
        $case: 'awsIamRole';
        /** The AWS IAM role configuration. */
        awsIamRole: AwsIamRole;
      }
    | {
        $case: 'azureServicePrincipal';
        /** The Azure service principal configuration. */
        azureServicePrincipal: AzureServicePrincipal;
      }
    | {
        $case: 'gcpServiceAccountKey';
        gcpServiceAccountKey: GcpServiceAccountKey;
      }
    | {
        $case: 'azureManagedIdentity';
        /** The Azure managed identity configuration. */
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        /** The <Databricks> managed GCP service account configuration. */
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | {
        $case: 'cloudflareApiToken';
        /** The Cloudflare API token configuration. */
        cloudflareApiToken: CloudflareApiToken;
      }
    | undefined;
  /** Comment associated with the credential. */
  comment?: string | undefined;
  /**
   * Whether the credential is usable only for read operations. Only applicable
   * when purpose is **STORAGE**.
   */
  readOnly?: boolean | undefined;
  /** Username of current owner of credential. */
  owner?: string | undefined;
  /** The unique identifier of the credential. */
  id?: string | undefined;
  /** Unique identifier of the parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this credential was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of credential creator. */
  createdBy?: string | undefined;
  /** Time at which this credential was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the credential. */
  updatedBy?: string | undefined;
  /**
   * Whether this credential is the current metastore's root storage credential.
   * Only applicable when purpose is **STORAGE**.
   */
  usedForManagedStorage?: boolean | undefined;
  /** The full name of the credential. */
  fullName?: string | undefined;
  /**
   * Whether the current securable is accessible from all workspaces or a
   * specific set of workspaces.
   */
  isolationMode?: IsolationMode | undefined;
}

export interface UpdateCredential {
  /** Name of the credential. */
  nameArg?: string | undefined;
  /** New name of credential. */
  newName?: string | undefined;
  /** Supply true to this argument to skip validation of the updated credential. */
  skipValidation?: boolean | undefined;
  /**
   * Force an update even if there are dependent services (when purpose is
   * **SERVICE**) or dependent external locations and external tables (when
   * purpose is **STORAGE**).
   */
  force?: boolean | undefined;
  /**
   * The credential name. The name must be unique among storage and service
   * credentials within the metastore.
   */
  name?: string | undefined;
  /** (--[Create:REQ, Update:OPT] The long-lived cloud credential.--) */
  credential?:
    | {
        $case: 'awsIamRole';
        /** The AWS IAM role configuration. */
        awsIamRole: AwsIamRole;
      }
    | {
        $case: 'azureServicePrincipal';
        /** The Azure service principal configuration. */
        azureServicePrincipal: AzureServicePrincipal;
      }
    | {
        $case: 'gcpServiceAccountKey';
        gcpServiceAccountKey: GcpServiceAccountKey;
      }
    | {
        $case: 'azureManagedIdentity';
        /** The Azure managed identity configuration. */
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        /** The <Databricks> managed GCP service account configuration. */
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | {
        $case: 'cloudflareApiToken';
        /** The Cloudflare API token configuration. */
        cloudflareApiToken: CloudflareApiToken;
      }
    | undefined;
  /** Comment associated with the credential. */
  comment?: string | undefined;
  /**
   * Whether the credential is usable only for read operations. Only applicable
   * when purpose is **STORAGE**.
   */
  readOnly?: boolean | undefined;
  /** Username of current owner of credential. */
  owner?: string | undefined;
  /** The unique identifier of the credential. */
  id?: string | undefined;
  /** Unique identifier of the parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this credential was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of credential creator. */
  createdBy?: string | undefined;
  /** Time at which this credential was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the credential. */
  updatedBy?: string | undefined;
  /**
   * Whether this credential is the current metastore's root storage credential.
   * Only applicable when purpose is **STORAGE**.
   */
  usedForManagedStorage?: boolean | undefined;
  /** The full name of the credential. */
  fullName?: string | undefined;
  /**
   * Whether the current securable is accessible from all workspaces or a
   * specific set of workspaces.
   */
  isolationMode?: IsolationMode | undefined;
}

export interface UpdateStorageCredential {
  /** Name of the storage credential. */
  nameArg?: string | undefined;
  /** New name for the storage credential. */
  newName?: string | undefined;
  /** Supplying true to this argument skips validation of the updated credential. */
  skipValidation?: boolean | undefined;
  /**
   * Force update even if there are dependent external locations or external
   * tables.
   */
  force?: boolean | undefined;
  /**
   * The credential name. The name must be unique among storage and service
   * credentials within the metastore.
   */
  name?: string | undefined;
  /** (--[Create:REQ, Update:OPT] The long-lived cloud credential.--) */
  credential?:
    | {
        $case: 'awsIamRole';
        /** The AWS IAM role configuration. */
        awsIamRole: AwsIamRole;
      }
    | {
        $case: 'azureServicePrincipal';
        /** The Azure service principal configuration. */
        azureServicePrincipal: AzureServicePrincipal;
      }
    | {
        $case: 'gcpServiceAccountKey';
        gcpServiceAccountKey: GcpServiceAccountKey;
      }
    | {
        $case: 'azureManagedIdentity';
        /** The Azure managed identity configuration. */
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        /** The <Databricks> managed GCP service account configuration. */
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | {
        $case: 'cloudflareApiToken';
        /** The Cloudflare API token configuration. */
        cloudflareApiToken: CloudflareApiToken;
      }
    | undefined;
  /** Comment associated with the credential. */
  comment?: string | undefined;
  /**
   * Whether the credential is usable only for read operations. Only applicable
   * when purpose is **STORAGE**.
   */
  readOnly?: boolean | undefined;
  /** Username of current owner of credential. */
  owner?: string | undefined;
  /** The unique identifier of the credential. */
  id?: string | undefined;
  /** Unique identifier of the parent metastore. */
  metastoreId?: string | undefined;
  /** Time at which this credential was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of credential creator. */
  createdBy?: string | undefined;
  /** Time at which this credential was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the credential. */
  updatedBy?: string | undefined;
  /**
   * Whether this credential is the current metastore's root storage credential.
   * Only applicable when purpose is **STORAGE**.
   */
  usedForManagedStorage?: boolean | undefined;
  /** The full name of the credential. */
  fullName?: string | undefined;
  /**
   * Whether the current securable is accessible from all workspaces or a
   * specific set of workspaces.
   */
  isolationMode?: IsolationMode | undefined;
}

/** Next ID: 18 */
export interface ValidateCredential {
  credential?:
    | {
        $case: 'credentialName';
        /**
         * Required. The name of an existing credential or long-lived cloud
         * credential to validate.
         */
        credentialName: string;
      }
    | {$case: 'awsIamRole'; awsIamRole: AwsIamRole}
    | {
        $case: 'azureManagedIdentity';
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | undefined;
  /**
   * The name of an existing external location to validate. Only applicable for
   * storage credentials (purpose is
   * **STORAGE**.)
   */
  externalLocationName?: string | undefined;
  /**
   * The external location url to validate. Only applicable when purpose is
   * **STORAGE**.
   */
  url?: string | undefined;
  /**
   * Whether the credential is only usable for read operations. Only applicable
   * for storage credentials (purpose is
   * **STORAGE**.)
   */
  readOnly?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ValidateCredential_Response {
  /** The results of the validation check. */
  results?: ValidateCredential_ValidationResult[] | undefined;
  /**
   * Whether the tested location is a directory in cloud storage. Only
   * applicable for when purpose is **STORAGE**.
   */
  isDir?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ValidateCredential_ValidationResult {
  /** The results of the tested operation. */
  result?: ValidateCredential_Result | undefined;
  /** Error message would exist when the result does not equal to **PASS**. */
  message?: string | undefined;
}

export interface ValidateStorageCredential {
  credential?:
    | {
        $case: 'storageCredentialName';
        /**
         * Required. The name of an existing credential or long-lived cloud
         * credential to validate.
         */
        storageCredentialName: string;
      }
    | {
        $case: 'awsIamRole';
        /** The AWS IAM role configuration. */
        awsIamRole: AwsIamRole;
      }
    | {
        $case: 'azureServicePrincipal';
        /** The Azure service principal configuration. */
        azureServicePrincipal: AzureServicePrincipal;
      }
    | {
        $case: 'azureManagedIdentity';
        /** The Azure managed identity configuration. */
        azureManagedIdentity: AzureManagedIdentity;
      }
    | {
        $case: 'databricksGcpServiceAccount';
        /** The <Databricks> created GCP service account configuration. */
        databricksGcpServiceAccount: DatabricksGcpServiceAccount;
      }
    | {
        $case: 'cloudflareApiToken';
        /** The Cloudflare API token configuration. */
        cloudflareApiToken: CloudflareApiToken;
      }
    | undefined;
  /** The name of an existing external location to validate. */
  externalLocationName?: string | undefined;
  /** The external location url to validate. */
  url?: string | undefined;
  /** Whether the storage credential is only usable for read operations. */
  readOnly?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ValidateStorageCredential_Response {
  /** Whether the tested location is a directory in cloud storage. */
  isDir?: boolean | undefined;
  /** The results of the validation check. */
  results?: ValidateStorageCredential_ValidationResult[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ValidateStorageCredential_ValidationResult {
  /** The operation tested. */
  operation?: ValidateStorageCredential_FileOperation | undefined;
  /** The results of the tested operation. */
  result?: ValidateStorageCredential_Result | undefined;
  /** Error message would exist when the result does not equal to **PASS**. */
  message?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAccountsCreateStorageCredentialPublic_ResponseSchema: z.ZodType<AccountsCreateStorageCredentialPublic_Response> =
  z
    .object({
      credential_info: z
        .lazy(() => unmarshalStorageCredentialInfoSchema)
        .optional(),
    })
    .transform(d => ({
      credentialInfo: d.credential_info,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAccountsDeleteStorageCredentialPublic_ResponseSchema: z.ZodType<AccountsDeleteStorageCredentialPublic_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAccountsGetStorageCredentialPublic_ResponseSchema: z.ZodType<AccountsGetStorageCredentialPublic_Response> =
  z
    .object({
      credential_info: z
        .lazy(() => unmarshalStorageCredentialInfoSchema)
        .optional(),
    })
    .transform(d => ({
      credentialInfo: d.credential_info,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAccountsListStorageCredentialsPublic_ResponseSchema: z.ZodType<AccountsListStorageCredentialsPublic_Response> =
  z
    .object({
      storage_credentials: z
        .array(z.lazy(() => unmarshalStorageCredentialInfoSchema))
        .optional(),
    })
    .transform(d => ({
      storageCredentials: d.storage_credentials,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAccountsUpdateStorageCredentialPublic_ResponseSchema: z.ZodType<AccountsUpdateStorageCredentialPublic_Response> =
  z
    .object({
      credential_info: z
        .lazy(() => unmarshalStorageCredentialInfoSchema)
        .optional(),
    })
    .transform(d => ({
      credentialInfo: d.credential_info,
    }));

export const unmarshalAwsCredentialsSchema: z.ZodType<AwsCredentials> = z
  .object({
    sts_role: z.lazy(() => unmarshalAwsCredentials_StsRoleSchema).optional(),
  })
  .transform(d => ({
    creds:
      d.sts_role !== undefined
        ? {$case: 'stsRole' as const, stsRole: d.sts_role}
        : undefined,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAwsCredentials_StsRoleSchema: z.ZodType<AwsCredentials_StsRole> =
  z
    .object({
      role_arn: z.string().optional(),
    })
    .transform(d => ({
      roleArn: d.role_arn,
    }));

export const unmarshalAwsIamRoleSchema: z.ZodType<AwsIamRole> = z
  .object({
    role_arn: z.string().optional(),
    unity_catalog_iam_arn: z.string().optional(),
    external_id: z.string().optional(),
  })
  .transform(d => ({
    roleArn: d.role_arn,
    unityCatalogIamArn: d.unity_catalog_iam_arn,
    externalId: d.external_id,
  }));

export const unmarshalAzureActiveDirectoryTokenSchema: z.ZodType<AzureActiveDirectoryToken> =
  z
    .object({
      aad_token: z.string().optional(),
    })
    .transform(d => ({
      aadToken: d.aad_token,
    }));

export const unmarshalAzureManagedIdentitySchema: z.ZodType<AzureManagedIdentity> =
  z
    .object({
      access_connector_id: z.string().optional(),
      managed_identity_id: z.string().optional(),
      credential_id: z.string().optional(),
    })
    .transform(d => ({
      accessConnectorId: d.access_connector_id,
      managedIdentityId: d.managed_identity_id,
      credentialId: d.credential_id,
    }));

export const unmarshalAzureServicePrincipalSchema: z.ZodType<AzureServicePrincipal> =
  z
    .object({
      directory_id: z.string().optional(),
      application_id: z.string().optional(),
      client_secret: z.string().optional(),
    })
    .transform(d => ({
      directoryId: d.directory_id,
      applicationId: d.application_id,
      clientSecret: d.client_secret,
    }));

export const unmarshalAzureUserDelegationSasSchema: z.ZodType<AzureUserDelegationSas> =
  z
    .object({
      sas_token: z.string().optional(),
    })
    .transform(d => ({
      sasToken: d.sas_token,
    }));

export const unmarshalCloudflareApiTokenSchema: z.ZodType<CloudflareApiToken> =
  z
    .object({
      access_key_id: z.string().optional(),
      secret_access_key: z.string().optional(),
      account_id: z.string().optional(),
    })
    .transform(d => ({
      accessKeyId: d.access_key_id,
      secretAccessKey: d.secret_access_key,
      accountId: d.account_id,
    }));

export const unmarshalCredentialInfoSchema: z.ZodType<CredentialInfo> = z
  .object({
    name: z.string().optional(),
    aws_iam_role: z.lazy(() => unmarshalAwsIamRoleSchema).optional(),
    azure_service_principal: z
      .lazy(() => unmarshalAzureServicePrincipalSchema)
      .optional(),
    gcp_service_account_key: z
      .lazy(() => unmarshalGcpServiceAccountKeySchema)
      .optional(),
    azure_managed_identity: z
      .lazy(() => unmarshalAzureManagedIdentitySchema)
      .optional(),
    databricks_gcp_service_account: z
      .lazy(() => unmarshalDatabricksGcpServiceAccountSchema)
      .optional(),
    cloudflare_api_token: z
      .lazy(() => unmarshalCloudflareApiTokenSchema)
      .optional(),
    comment: z.string().optional(),
    read_only: z.boolean().optional(),
    owner: z.string().optional(),
    id: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    used_for_managed_storage: z.boolean().optional(),
    full_name: z.string().optional(),
    isolation_mode: z.enum(IsolationMode).optional(),
  })
  .transform(d => ({
    name: d.name,
    credential:
      d.aws_iam_role !== undefined
        ? {$case: 'awsIamRole' as const, awsIamRole: d.aws_iam_role}
        : d.azure_service_principal !== undefined
          ? {
              $case: 'azureServicePrincipal' as const,
              azureServicePrincipal: d.azure_service_principal,
            }
          : d.gcp_service_account_key !== undefined
            ? {
                $case: 'gcpServiceAccountKey' as const,
                gcpServiceAccountKey: d.gcp_service_account_key,
              }
            : d.azure_managed_identity !== undefined
              ? {
                  $case: 'azureManagedIdentity' as const,
                  azureManagedIdentity: d.azure_managed_identity,
                }
              : d.databricks_gcp_service_account !== undefined
                ? {
                    $case: 'databricksGcpServiceAccount' as const,
                    databricksGcpServiceAccount:
                      d.databricks_gcp_service_account,
                  }
                : d.cloudflare_api_token !== undefined
                  ? {
                      $case: 'cloudflareApiToken' as const,
                      cloudflareApiToken: d.cloudflare_api_token,
                    }
                  : undefined,
    comment: d.comment,
    readOnly: d.read_only,
    owner: d.owner,
    id: d.id,
    metastoreId: d.metastore_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    usedForManagedStorage: d.used_for_managed_storage,
    fullName: d.full_name,
    isolationMode: d.isolation_mode,
  }));

export const unmarshalCredentialsSchema: z.ZodType<Credentials> = z
  .object({
    credentials_id: z.string().optional(),
    account_id: z.string().optional(),
    aws_credentials: z.lazy(() => unmarshalAwsCredentialsSchema).optional(),
    credentials_name: z.string().optional(),
    creation_time: z.number().optional(),
  })
  .transform(d => ({
    credentialsId: d.credentials_id,
    accountId: d.account_id,
    cloudCredentials:
      d.aws_credentials !== undefined
        ? {$case: 'awsCredentials' as const, awsCredentials: d.aws_credentials}
        : undefined,
    credentialsName: d.credentials_name,
    creationTime: d.creation_time,
  }));

export const unmarshalDatabricksGcpServiceAccountSchema: z.ZodType<DatabricksGcpServiceAccount> =
  z
    .object({
      email: z.string().optional(),
      private_key_id: z.string().optional(),
      credential_id: z.string().optional(),
    })
    .transform(d => ({
      email: d.email,
      privateKeyId: d.private_key_id,
      credentialId: d.credential_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteCredential_ResponseSchema: z.ZodType<DeleteCredential_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteStorageCredential_ResponseSchema: z.ZodType<DeleteStorageCredential_Response> =
  z.object({});

export const unmarshalGcpOauthTokenSchema: z.ZodType<GcpOauthToken> = z
  .object({
    oauth_token: z.string().optional(),
  })
  .transform(d => ({
    oauthToken: d.oauth_token,
  }));

export const unmarshalGcpServiceAccountKeySchema: z.ZodType<GcpServiceAccountKey> =
  z
    .object({
      email: z.string().optional(),
      private_key_id: z.string().optional(),
      private_key: z.string().optional(),
    })
    .transform(d => ({
      email: d.email,
      privateKeyId: d.private_key_id,
      privateKey: d.private_key,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGenerateTemporaryPathCredential_ResponseSchema: z.ZodType<GenerateTemporaryPathCredential_Response> =
  z
    .object({
      aws_temp_credentials: z
        .lazy(() => unmarshalTemporaryAwsCredentialsSchema)
        .optional(),
      azure_user_delegation_sas: z
        .lazy(() => unmarshalAzureUserDelegationSasSchema)
        .optional(),
      gcp_oauth_token: z.lazy(() => unmarshalGcpOauthTokenSchema).optional(),
      azure_aad: z
        .lazy(() => unmarshalAzureActiveDirectoryTokenSchema)
        .optional(),
      r2_temp_credentials: z
        .lazy(() => unmarshalR2CredentialsSchema)
        .optional(),
      uc_encrypted_token: z
        .lazy(() => unmarshalUcEncryptedTokenSchema)
        .optional(),
      expiration_time: z.number().optional(),
      url: z.string().optional(),
    })
    .transform(d => ({
      credentials:
        d.aws_temp_credentials !== undefined
          ? {
              $case: 'awsTempCredentials' as const,
              awsTempCredentials: d.aws_temp_credentials,
            }
          : d.azure_user_delegation_sas !== undefined
            ? {
                $case: 'azureUserDelegationSas' as const,
                azureUserDelegationSas: d.azure_user_delegation_sas,
              }
            : d.gcp_oauth_token !== undefined
              ? {
                  $case: 'gcpOauthToken' as const,
                  gcpOauthToken: d.gcp_oauth_token,
                }
              : d.azure_aad !== undefined
                ? {$case: 'azureAad' as const, azureAad: d.azure_aad}
                : d.r2_temp_credentials !== undefined
                  ? {
                      $case: 'r2TempCredentials' as const,
                      r2TempCredentials: d.r2_temp_credentials,
                    }
                  : d.uc_encrypted_token !== undefined
                    ? {
                        $case: 'ucEncryptedToken' as const,
                        ucEncryptedToken: d.uc_encrypted_token,
                      }
                    : undefined,
      expirationTime: d.expiration_time,
      url: d.url,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGenerateTemporaryTableCredential_ResponseSchema: z.ZodType<GenerateTemporaryTableCredential_Response> =
  z
    .object({
      aws_temp_credentials: z
        .lazy(() => unmarshalTemporaryAwsCredentialsSchema)
        .optional(),
      azure_user_delegation_sas: z
        .lazy(() => unmarshalAzureUserDelegationSasSchema)
        .optional(),
      gcp_oauth_token: z.lazy(() => unmarshalGcpOauthTokenSchema).optional(),
      azure_aad: z
        .lazy(() => unmarshalAzureActiveDirectoryTokenSchema)
        .optional(),
      r2_temp_credentials: z
        .lazy(() => unmarshalR2CredentialsSchema)
        .optional(),
      uc_encrypted_token: z
        .lazy(() => unmarshalUcEncryptedTokenSchema)
        .optional(),
      expiration_time: z.number().optional(),
      url: z.string().optional(),
    })
    .transform(d => ({
      credentials:
        d.aws_temp_credentials !== undefined
          ? {
              $case: 'awsTempCredentials' as const,
              awsTempCredentials: d.aws_temp_credentials,
            }
          : d.azure_user_delegation_sas !== undefined
            ? {
                $case: 'azureUserDelegationSas' as const,
                azureUserDelegationSas: d.azure_user_delegation_sas,
              }
            : d.gcp_oauth_token !== undefined
              ? {
                  $case: 'gcpOauthToken' as const,
                  gcpOauthToken: d.gcp_oauth_token,
                }
              : d.azure_aad !== undefined
                ? {$case: 'azureAad' as const, azureAad: d.azure_aad}
                : d.r2_temp_credentials !== undefined
                  ? {
                      $case: 'r2TempCredentials' as const,
                      r2TempCredentials: d.r2_temp_credentials,
                    }
                  : d.uc_encrypted_token !== undefined
                    ? {
                        $case: 'ucEncryptedToken' as const,
                        ucEncryptedToken: d.uc_encrypted_token,
                      }
                    : undefined,
      expirationTime: d.expiration_time,
      url: d.url,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGenerateTemporaryVolumeCredential_ResponseSchema: z.ZodType<GenerateTemporaryVolumeCredential_Response> =
  z
    .object({
      aws_temp_credentials: z
        .lazy(() => unmarshalTemporaryAwsCredentialsSchema)
        .optional(),
      azure_user_delegation_sas: z
        .lazy(() => unmarshalAzureUserDelegationSasSchema)
        .optional(),
      gcp_oauth_token: z.lazy(() => unmarshalGcpOauthTokenSchema).optional(),
      azure_aad: z
        .lazy(() => unmarshalAzureActiveDirectoryTokenSchema)
        .optional(),
      r2_temp_credentials: z
        .lazy(() => unmarshalR2CredentialsSchema)
        .optional(),
      uc_encrypted_token: z
        .lazy(() => unmarshalUcEncryptedTokenSchema)
        .optional(),
      expiration_time: z.number().optional(),
      url: z.string().optional(),
    })
    .transform(d => ({
      credentials:
        d.aws_temp_credentials !== undefined
          ? {
              $case: 'awsTempCredentials' as const,
              awsTempCredentials: d.aws_temp_credentials,
            }
          : d.azure_user_delegation_sas !== undefined
            ? {
                $case: 'azureUserDelegationSas' as const,
                azureUserDelegationSas: d.azure_user_delegation_sas,
              }
            : d.gcp_oauth_token !== undefined
              ? {
                  $case: 'gcpOauthToken' as const,
                  gcpOauthToken: d.gcp_oauth_token,
                }
              : d.azure_aad !== undefined
                ? {$case: 'azureAad' as const, azureAad: d.azure_aad}
                : d.r2_temp_credentials !== undefined
                  ? {
                      $case: 'r2TempCredentials' as const,
                      r2TempCredentials: d.r2_temp_credentials,
                    }
                  : d.uc_encrypted_token !== undefined
                    ? {
                        $case: 'ucEncryptedToken' as const,
                        ucEncryptedToken: d.uc_encrypted_token,
                      }
                    : undefined,
      expirationTime: d.expiration_time,
      url: d.url,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListCredentials_ResponseSchema: z.ZodType<ListCredentials_Response> =
  z
    .object({
      credentials: z
        .array(z.lazy(() => unmarshalCredentialInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      credentials: d.credentials,
      nextPageToken: d.next_page_token,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListStorageCredentials_ResponseSchema: z.ZodType<ListStorageCredentials_Response> =
  z
    .object({
      storage_credentials: z
        .array(z.lazy(() => unmarshalStorageCredentialInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      storageCredentials: d.storage_credentials,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalR2CredentialsSchema: z.ZodType<R2Credentials> = z
  .object({
    access_key_id: z.string().optional(),
    secret_access_key: z.string().optional(),
    session_token: z.string().optional(),
  })
  .transform(d => ({
    accessKeyId: d.access_key_id,
    secretAccessKey: d.secret_access_key,
    sessionToken: d.session_token,
  }));

export const unmarshalStorageCredentialInfoSchema: z.ZodType<StorageCredentialInfo> =
  z
    .object({
      name: z.string().optional(),
      aws_iam_role: z.lazy(() => unmarshalAwsIamRoleSchema).optional(),
      azure_service_principal: z
        .lazy(() => unmarshalAzureServicePrincipalSchema)
        .optional(),
      gcp_service_account_key: z
        .lazy(() => unmarshalGcpServiceAccountKeySchema)
        .optional(),
      azure_managed_identity: z
        .lazy(() => unmarshalAzureManagedIdentitySchema)
        .optional(),
      databricks_gcp_service_account: z
        .lazy(() => unmarshalDatabricksGcpServiceAccountSchema)
        .optional(),
      cloudflare_api_token: z
        .lazy(() => unmarshalCloudflareApiTokenSchema)
        .optional(),
      comment: z.string().optional(),
      read_only: z.boolean().optional(),
      owner: z.string().optional(),
      id: z.string().optional(),
      metastore_id: z.string().optional(),
      created_at: z.number().optional(),
      created_by: z.string().optional(),
      updated_at: z.number().optional(),
      updated_by: z.string().optional(),
      used_for_managed_storage: z.boolean().optional(),
      full_name: z.string().optional(),
      isolation_mode: z.enum(IsolationMode).optional(),
    })
    .transform(d => ({
      name: d.name,
      credential:
        d.aws_iam_role !== undefined
          ? {$case: 'awsIamRole' as const, awsIamRole: d.aws_iam_role}
          : d.azure_service_principal !== undefined
            ? {
                $case: 'azureServicePrincipal' as const,
                azureServicePrincipal: d.azure_service_principal,
              }
            : d.gcp_service_account_key !== undefined
              ? {
                  $case: 'gcpServiceAccountKey' as const,
                  gcpServiceAccountKey: d.gcp_service_account_key,
                }
              : d.azure_managed_identity !== undefined
                ? {
                    $case: 'azureManagedIdentity' as const,
                    azureManagedIdentity: d.azure_managed_identity,
                  }
                : d.databricks_gcp_service_account !== undefined
                  ? {
                      $case: 'databricksGcpServiceAccount' as const,
                      databricksGcpServiceAccount:
                        d.databricks_gcp_service_account,
                    }
                  : d.cloudflare_api_token !== undefined
                    ? {
                        $case: 'cloudflareApiToken' as const,
                        cloudflareApiToken: d.cloudflare_api_token,
                      }
                    : undefined,
      comment: d.comment,
      readOnly: d.read_only,
      owner: d.owner,
      id: d.id,
      metastoreId: d.metastore_id,
      createdAt: d.created_at,
      createdBy: d.created_by,
      updatedAt: d.updated_at,
      updatedBy: d.updated_by,
      usedForManagedStorage: d.used_for_managed_storage,
      fullName: d.full_name,
      isolationMode: d.isolation_mode,
    }));

export const unmarshalTemporaryAwsCredentialsSchema: z.ZodType<TemporaryAwsCredentials> =
  z
    .object({
      access_key_id: z.string().optional(),
      secret_access_key: z.string().optional(),
      session_token: z.string().optional(),
      access_point: z.string().optional(),
    })
    .transform(d => ({
      accessKeyId: d.access_key_id,
      secretAccessKey: d.secret_access_key,
      sessionToken: d.session_token,
      accessPoint: d.access_point,
    }));

export const unmarshalTemporaryCredentialsSchema: z.ZodType<TemporaryCredentials> =
  z
    .object({
      aws_temp_credentials: z
        .lazy(() => unmarshalTemporaryAwsCredentialsSchema)
        .optional(),
      azure_user_delegation_sas: z
        .lazy(() => unmarshalAzureUserDelegationSasSchema)
        .optional(),
      gcp_oauth_token: z.lazy(() => unmarshalGcpOauthTokenSchema).optional(),
      azure_aad: z
        .lazy(() => unmarshalAzureActiveDirectoryTokenSchema)
        .optional(),
      r2_temp_credentials: z
        .lazy(() => unmarshalR2CredentialsSchema)
        .optional(),
      uc_encrypted_token: z
        .lazy(() => unmarshalUcEncryptedTokenSchema)
        .optional(),
      expiration_time: z.number().optional(),
      url: z.string().optional(),
    })
    .transform(d => ({
      credentials:
        d.aws_temp_credentials !== undefined
          ? {
              $case: 'awsTempCredentials' as const,
              awsTempCredentials: d.aws_temp_credentials,
            }
          : d.azure_user_delegation_sas !== undefined
            ? {
                $case: 'azureUserDelegationSas' as const,
                azureUserDelegationSas: d.azure_user_delegation_sas,
              }
            : d.gcp_oauth_token !== undefined
              ? {
                  $case: 'gcpOauthToken' as const,
                  gcpOauthToken: d.gcp_oauth_token,
                }
              : d.azure_aad !== undefined
                ? {$case: 'azureAad' as const, azureAad: d.azure_aad}
                : d.r2_temp_credentials !== undefined
                  ? {
                      $case: 'r2TempCredentials' as const,
                      r2TempCredentials: d.r2_temp_credentials,
                    }
                  : d.uc_encrypted_token !== undefined
                    ? {
                        $case: 'ucEncryptedToken' as const,
                        ucEncryptedToken: d.uc_encrypted_token,
                      }
                    : undefined,
      expirationTime: d.expiration_time,
      url: d.url,
    }));

export const unmarshalUcEncryptedTokenSchema: z.ZodType<UcEncryptedToken> = z
  .object({
    encrypted_payload: z.string().optional(),
  })
  .transform(d => ({
    encryptedPayload: d.encrypted_payload,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalValidateCredential_ResponseSchema: z.ZodType<ValidateCredential_Response> =
  z
    .object({
      results: z
        .array(z.lazy(() => unmarshalValidateCredential_ValidationResultSchema))
        .optional(),
      isDir: z.boolean().optional(),
    })
    .transform(d => ({
      results: d.results,
      isDir: d.isDir,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalValidateCredential_ValidationResultSchema: z.ZodType<ValidateCredential_ValidationResult> =
  z
    .object({
      result: z.enum(ValidateCredential_Result).optional(),
      message: z.string().optional(),
    })
    .transform(d => ({
      result: d.result,
      message: d.message,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalValidateStorageCredential_ResponseSchema: z.ZodType<ValidateStorageCredential_Response> =
  z
    .object({
      isDir: z.boolean().optional(),
      results: z
        .array(
          z.lazy(
            () => unmarshalValidateStorageCredential_ValidationResultSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      isDir: d.isDir,
      results: d.results,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalValidateStorageCredential_ValidationResultSchema: z.ZodType<ValidateStorageCredential_ValidationResult> =
  z
    .object({
      operation: z.enum(ValidateStorageCredential_FileOperation).optional(),
      result: z.enum(ValidateStorageCredential_Result).optional(),
      message: z.string().optional(),
    })
    .transform(d => ({
      operation: d.operation,
      result: d.result,
      message: d.message,
    }));

export const marshalAccountsCreateStorageCredentialPublicSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    metastoreId: z.string().optional(),
    credentialInfo: z
      .lazy(() => marshalCreateAccountsStorageCredentialSchema)
      .optional(),
    skipValidation: z.boolean().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    metastore_id: d.metastoreId,
    credential_info: d.credentialInfo,
    skip_validation: d.skipValidation,
  }));

export const marshalAccountsUpdateStorageCredentialPublicSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    metastoreId: z.string().optional(),
    nameArg: z.string().optional(),
    credentialInfo: z
      .lazy(() => marshalUpdateAccountsStorageCredentialSchema)
      .optional(),
    skipValidation: z.boolean().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    metastore_id: d.metastoreId,
    name_arg: d.nameArg,
    credential_info: d.credentialInfo,
    skip_validation: d.skipValidation,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAwsCredentials_StsRoleSchema: z.ZodType = z
  .object({
    roleArn: z.string().optional(),
  })
  .transform(d => ({
    role_arn: d.roleArn,
  }));

export const marshalAwsIamRoleSchema: z.ZodType = z
  .object({
    roleArn: z.string().optional(),
    unityCatalogIamArn: z.string().optional(),
    externalId: z.string().optional(),
  })
  .transform(d => ({
    role_arn: d.roleArn,
    unity_catalog_iam_arn: d.unityCatalogIamArn,
    external_id: d.externalId,
  }));

export const marshalAzureManagedIdentitySchema: z.ZodType = z
  .object({
    accessConnectorId: z.string().optional(),
    managedIdentityId: z.string().optional(),
    credentialId: z.string().optional(),
  })
  .transform(d => ({
    access_connector_id: d.accessConnectorId,
    managed_identity_id: d.managedIdentityId,
    credential_id: d.credentialId,
  }));

export const marshalAzureServicePrincipalSchema: z.ZodType = z
  .object({
    directoryId: z.string().optional(),
    applicationId: z.string().optional(),
    clientSecret: z.string().optional(),
  })
  .transform(d => ({
    directory_id: d.directoryId,
    application_id: d.applicationId,
    client_secret: d.clientSecret,
  }));

export const marshalCloudflareApiTokenSchema: z.ZodType = z
  .object({
    accessKeyId: z.string().optional(),
    secretAccessKey: z.string().optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    access_key_id: d.accessKeyId,
    secret_access_key: d.secretAccessKey,
    account_id: d.accountId,
  }));

export const marshalCreateAccountsStorageCredentialSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    credential: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('awsIamRole'),
          awsIamRole: z.lazy(() => marshalAwsIamRoleSchema),
        }),
        z.object({
          $case: z.literal('azureServicePrincipal'),
          azureServicePrincipal: z.lazy(
            () => marshalAzureServicePrincipalSchema
          ),
        }),
        z.object({
          $case: z.literal('gcpServiceAccountKey'),
          gcpServiceAccountKey: z.lazy(() => marshalGcpServiceAccountKeySchema),
        }),
        z.object({
          $case: z.literal('azureManagedIdentity'),
          azureManagedIdentity: z.lazy(() => marshalAzureManagedIdentitySchema),
        }),
        z.object({
          $case: z.literal('databricksGcpServiceAccount'),
          databricksGcpServiceAccount: z.lazy(
            () => marshalDatabricksGcpServiceAccountSchema
          ),
        }),
        z.object({
          $case: z.literal('cloudflareApiToken'),
          cloudflareApiToken: z.lazy(() => marshalCloudflareApiTokenSchema),
        }),
      ])
      .optional(),
    comment: z.string().optional(),
    readOnly: z.boolean().optional(),
    owner: z.string().optional(),
    id: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    usedForManagedStorage: z.boolean().optional(),
    fullName: z.string().optional(),
    isolationMode: z.enum(IsolationMode).optional(),
  })
  .transform(d => ({
    name: d.name,
    ...(d.credential?.$case === 'awsIamRole' && {
      aws_iam_role: d.credential.awsIamRole,
    }),
    ...(d.credential?.$case === 'azureServicePrincipal' && {
      azure_service_principal: d.credential.azureServicePrincipal,
    }),
    ...(d.credential?.$case === 'gcpServiceAccountKey' && {
      gcp_service_account_key: d.credential.gcpServiceAccountKey,
    }),
    ...(d.credential?.$case === 'azureManagedIdentity' && {
      azure_managed_identity: d.credential.azureManagedIdentity,
    }),
    ...(d.credential?.$case === 'databricksGcpServiceAccount' && {
      databricks_gcp_service_account: d.credential.databricksGcpServiceAccount,
    }),
    ...(d.credential?.$case === 'cloudflareApiToken' && {
      cloudflare_api_token: d.credential.cloudflareApiToken,
    }),
    comment: d.comment,
    read_only: d.readOnly,
    owner: d.owner,
    id: d.id,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    used_for_managed_storage: d.usedForManagedStorage,
    full_name: d.fullName,
    isolation_mode: d.isolationMode,
  }));

export const marshalCreateCredentialSchema: z.ZodType = z
  .object({
    skipValidation: z.boolean().optional(),
    name: z.string().optional(),
    credential: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('awsIamRole'),
          awsIamRole: z.lazy(() => marshalAwsIamRoleSchema),
        }),
        z.object({
          $case: z.literal('azureServicePrincipal'),
          azureServicePrincipal: z.lazy(
            () => marshalAzureServicePrincipalSchema
          ),
        }),
        z.object({
          $case: z.literal('gcpServiceAccountKey'),
          gcpServiceAccountKey: z.lazy(() => marshalGcpServiceAccountKeySchema),
        }),
        z.object({
          $case: z.literal('azureManagedIdentity'),
          azureManagedIdentity: z.lazy(() => marshalAzureManagedIdentitySchema),
        }),
        z.object({
          $case: z.literal('databricksGcpServiceAccount'),
          databricksGcpServiceAccount: z.lazy(
            () => marshalDatabricksGcpServiceAccountSchema
          ),
        }),
        z.object({
          $case: z.literal('cloudflareApiToken'),
          cloudflareApiToken: z.lazy(() => marshalCloudflareApiTokenSchema),
        }),
      ])
      .optional(),
    comment: z.string().optional(),
    readOnly: z.boolean().optional(),
    owner: z.string().optional(),
    id: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    usedForManagedStorage: z.boolean().optional(),
    fullName: z.string().optional(),
    isolationMode: z.enum(IsolationMode).optional(),
  })
  .transform(d => ({
    skip_validation: d.skipValidation,
    name: d.name,
    ...(d.credential?.$case === 'awsIamRole' && {
      aws_iam_role: d.credential.awsIamRole,
    }),
    ...(d.credential?.$case === 'azureServicePrincipal' && {
      azure_service_principal: d.credential.azureServicePrincipal,
    }),
    ...(d.credential?.$case === 'gcpServiceAccountKey' && {
      gcp_service_account_key: d.credential.gcpServiceAccountKey,
    }),
    ...(d.credential?.$case === 'azureManagedIdentity' && {
      azure_managed_identity: d.credential.azureManagedIdentity,
    }),
    ...(d.credential?.$case === 'databricksGcpServiceAccount' && {
      databricks_gcp_service_account: d.credential.databricksGcpServiceAccount,
    }),
    ...(d.credential?.$case === 'cloudflareApiToken' && {
      cloudflare_api_token: d.credential.cloudflareApiToken,
    }),
    comment: d.comment,
    read_only: d.readOnly,
    owner: d.owner,
    id: d.id,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    used_for_managed_storage: d.usedForManagedStorage,
    full_name: d.fullName,
    isolation_mode: d.isolationMode,
  }));

export const marshalCreateCredentialAwsCredentialsSchema: z.ZodType = z
  .object({
    creds: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('stsRole'),
          stsRole: z.lazy(() => marshalAwsCredentials_StsRoleSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.creds?.$case === 'stsRole' && {sts_role: d.creds.stsRole}),
  }));

export const marshalCreateCredentialsPublicRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    credentialsName: z.string().optional(),
    cloudCredentials: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('awsCredentials'),
          awsCredentials: z.lazy(
            () => marshalCreateCredentialAwsCredentialsSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    credentials_name: d.credentialsName,
    ...(d.cloudCredentials?.$case === 'awsCredentials' && {
      aws_credentials: d.cloudCredentials.awsCredentials,
    }),
  }));

export const marshalCreateStorageCredentialSchema: z.ZodType = z
  .object({
    skipValidation: z.boolean().optional(),
    name: z.string().optional(),
    credential: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('awsIamRole'),
          awsIamRole: z.lazy(() => marshalAwsIamRoleSchema),
        }),
        z.object({
          $case: z.literal('azureServicePrincipal'),
          azureServicePrincipal: z.lazy(
            () => marshalAzureServicePrincipalSchema
          ),
        }),
        z.object({
          $case: z.literal('gcpServiceAccountKey'),
          gcpServiceAccountKey: z.lazy(() => marshalGcpServiceAccountKeySchema),
        }),
        z.object({
          $case: z.literal('azureManagedIdentity'),
          azureManagedIdentity: z.lazy(() => marshalAzureManagedIdentitySchema),
        }),
        z.object({
          $case: z.literal('databricksGcpServiceAccount'),
          databricksGcpServiceAccount: z.lazy(
            () => marshalDatabricksGcpServiceAccountSchema
          ),
        }),
        z.object({
          $case: z.literal('cloudflareApiToken'),
          cloudflareApiToken: z.lazy(() => marshalCloudflareApiTokenSchema),
        }),
      ])
      .optional(),
    comment: z.string().optional(),
    readOnly: z.boolean().optional(),
    owner: z.string().optional(),
    id: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    usedForManagedStorage: z.boolean().optional(),
    fullName: z.string().optional(),
    isolationMode: z.enum(IsolationMode).optional(),
  })
  .transform(d => ({
    skip_validation: d.skipValidation,
    name: d.name,
    ...(d.credential?.$case === 'awsIamRole' && {
      aws_iam_role: d.credential.awsIamRole,
    }),
    ...(d.credential?.$case === 'azureServicePrincipal' && {
      azure_service_principal: d.credential.azureServicePrincipal,
    }),
    ...(d.credential?.$case === 'gcpServiceAccountKey' && {
      gcp_service_account_key: d.credential.gcpServiceAccountKey,
    }),
    ...(d.credential?.$case === 'azureManagedIdentity' && {
      azure_managed_identity: d.credential.azureManagedIdentity,
    }),
    ...(d.credential?.$case === 'databricksGcpServiceAccount' && {
      databricks_gcp_service_account: d.credential.databricksGcpServiceAccount,
    }),
    ...(d.credential?.$case === 'cloudflareApiToken' && {
      cloudflare_api_token: d.credential.cloudflareApiToken,
    }),
    comment: d.comment,
    read_only: d.readOnly,
    owner: d.owner,
    id: d.id,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    used_for_managed_storage: d.usedForManagedStorage,
    full_name: d.fullName,
    isolation_mode: d.isolationMode,
  }));

export const marshalDatabricksGcpServiceAccountSchema: z.ZodType = z
  .object({
    email: z.string().optional(),
    privateKeyId: z.string().optional(),
    credentialId: z.string().optional(),
  })
  .transform(d => ({
    email: d.email,
    private_key_id: d.privateKeyId,
    credential_id: d.credentialId,
  }));

export const marshalGcpServiceAccountKeySchema: z.ZodType = z
  .object({
    email: z.string().optional(),
    privateKeyId: z.string().optional(),
    privateKey: z.string().optional(),
  })
  .transform(d => ({
    email: d.email,
    private_key_id: d.privateKeyId,
    private_key: d.privateKey,
  }));

export const marshalGenerateTemporaryPathCredentialSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    operation: z.enum(PathOperation).optional(),
    dryRun: z.boolean().optional(),
  })
  .transform(d => ({
    url: d.url,
    operation: d.operation,
    dry_run: d.dryRun,
  }));

export const marshalGenerateTemporaryServiceCredentialSchema: z.ZodType = z
  .object({
    credentialName: z.string().optional(),
    options: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('azureOptions'),
          azureOptions: z.lazy(
            () => marshalGenerateTemporaryServiceCredential_AzureOptionsSchema
          ),
        }),
        z.object({
          $case: z.literal('gcpOptions'),
          gcpOptions: z.lazy(
            () => marshalGenerateTemporaryServiceCredential_GcpOptionsSchema
          ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    credential_name: d.credentialName,
    ...(d.options?.$case === 'azureOptions' && {
      azure_options: d.options.azureOptions,
    }),
    ...(d.options?.$case === 'gcpOptions' && {
      gcp_options: d.options.gcpOptions,
    }),
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGenerateTemporaryServiceCredential_AzureOptionsSchema: z.ZodType =
  z
    .object({
      resources: z.array(z.string()).optional(),
    })
    .transform(d => ({
      resources: d.resources,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGenerateTemporaryServiceCredential_GcpOptionsSchema: z.ZodType =
  z
    .object({
      scopes: z.array(z.string()).optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
    }));

export const marshalGenerateTemporaryTableCredentialSchema: z.ZodType = z
  .object({
    tableId: z.string().optional(),
    operation: z.enum(TableOperation).optional(),
  })
  .transform(d => ({
    table_id: d.tableId,
    operation: d.operation,
  }));

export const marshalGenerateTemporaryVolumeCredentialSchema: z.ZodType = z
  .object({
    volumeId: z.string().optional(),
    operation: z.enum(VolumeOperation).optional(),
  })
  .transform(d => ({
    volume_id: d.volumeId,
    operation: d.operation,
  }));

export const marshalUpdateAccountsStorageCredentialSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    credential: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('awsIamRole'),
          awsIamRole: z.lazy(() => marshalAwsIamRoleSchema),
        }),
        z.object({
          $case: z.literal('azureServicePrincipal'),
          azureServicePrincipal: z.lazy(
            () => marshalAzureServicePrincipalSchema
          ),
        }),
        z.object({
          $case: z.literal('gcpServiceAccountKey'),
          gcpServiceAccountKey: z.lazy(() => marshalGcpServiceAccountKeySchema),
        }),
        z.object({
          $case: z.literal('azureManagedIdentity'),
          azureManagedIdentity: z.lazy(() => marshalAzureManagedIdentitySchema),
        }),
        z.object({
          $case: z.literal('databricksGcpServiceAccount'),
          databricksGcpServiceAccount: z.lazy(
            () => marshalDatabricksGcpServiceAccountSchema
          ),
        }),
        z.object({
          $case: z.literal('cloudflareApiToken'),
          cloudflareApiToken: z.lazy(() => marshalCloudflareApiTokenSchema),
        }),
      ])
      .optional(),
    comment: z.string().optional(),
    readOnly: z.boolean().optional(),
    owner: z.string().optional(),
    id: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    usedForManagedStorage: z.boolean().optional(),
    fullName: z.string().optional(),
    isolationMode: z.enum(IsolationMode).optional(),
  })
  .transform(d => ({
    name: d.name,
    ...(d.credential?.$case === 'awsIamRole' && {
      aws_iam_role: d.credential.awsIamRole,
    }),
    ...(d.credential?.$case === 'azureServicePrincipal' && {
      azure_service_principal: d.credential.azureServicePrincipal,
    }),
    ...(d.credential?.$case === 'gcpServiceAccountKey' && {
      gcp_service_account_key: d.credential.gcpServiceAccountKey,
    }),
    ...(d.credential?.$case === 'azureManagedIdentity' && {
      azure_managed_identity: d.credential.azureManagedIdentity,
    }),
    ...(d.credential?.$case === 'databricksGcpServiceAccount' && {
      databricks_gcp_service_account: d.credential.databricksGcpServiceAccount,
    }),
    ...(d.credential?.$case === 'cloudflareApiToken' && {
      cloudflare_api_token: d.credential.cloudflareApiToken,
    }),
    comment: d.comment,
    read_only: d.readOnly,
    owner: d.owner,
    id: d.id,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    used_for_managed_storage: d.usedForManagedStorage,
    full_name: d.fullName,
    isolation_mode: d.isolationMode,
  }));

export const marshalUpdateCredentialSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    newName: z.string().optional(),
    skipValidation: z.boolean().optional(),
    force: z.boolean().optional(),
    name: z.string().optional(),
    credential: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('awsIamRole'),
          awsIamRole: z.lazy(() => marshalAwsIamRoleSchema),
        }),
        z.object({
          $case: z.literal('azureServicePrincipal'),
          azureServicePrincipal: z.lazy(
            () => marshalAzureServicePrincipalSchema
          ),
        }),
        z.object({
          $case: z.literal('gcpServiceAccountKey'),
          gcpServiceAccountKey: z.lazy(() => marshalGcpServiceAccountKeySchema),
        }),
        z.object({
          $case: z.literal('azureManagedIdentity'),
          azureManagedIdentity: z.lazy(() => marshalAzureManagedIdentitySchema),
        }),
        z.object({
          $case: z.literal('databricksGcpServiceAccount'),
          databricksGcpServiceAccount: z.lazy(
            () => marshalDatabricksGcpServiceAccountSchema
          ),
        }),
        z.object({
          $case: z.literal('cloudflareApiToken'),
          cloudflareApiToken: z.lazy(() => marshalCloudflareApiTokenSchema),
        }),
      ])
      .optional(),
    comment: z.string().optional(),
    readOnly: z.boolean().optional(),
    owner: z.string().optional(),
    id: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    usedForManagedStorage: z.boolean().optional(),
    fullName: z.string().optional(),
    isolationMode: z.enum(IsolationMode).optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    new_name: d.newName,
    skip_validation: d.skipValidation,
    force: d.force,
    name: d.name,
    ...(d.credential?.$case === 'awsIamRole' && {
      aws_iam_role: d.credential.awsIamRole,
    }),
    ...(d.credential?.$case === 'azureServicePrincipal' && {
      azure_service_principal: d.credential.azureServicePrincipal,
    }),
    ...(d.credential?.$case === 'gcpServiceAccountKey' && {
      gcp_service_account_key: d.credential.gcpServiceAccountKey,
    }),
    ...(d.credential?.$case === 'azureManagedIdentity' && {
      azure_managed_identity: d.credential.azureManagedIdentity,
    }),
    ...(d.credential?.$case === 'databricksGcpServiceAccount' && {
      databricks_gcp_service_account: d.credential.databricksGcpServiceAccount,
    }),
    ...(d.credential?.$case === 'cloudflareApiToken' && {
      cloudflare_api_token: d.credential.cloudflareApiToken,
    }),
    comment: d.comment,
    read_only: d.readOnly,
    owner: d.owner,
    id: d.id,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    used_for_managed_storage: d.usedForManagedStorage,
    full_name: d.fullName,
    isolation_mode: d.isolationMode,
  }));

export const marshalUpdateStorageCredentialSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    newName: z.string().optional(),
    skipValidation: z.boolean().optional(),
    force: z.boolean().optional(),
    name: z.string().optional(),
    credential: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('awsIamRole'),
          awsIamRole: z.lazy(() => marshalAwsIamRoleSchema),
        }),
        z.object({
          $case: z.literal('azureServicePrincipal'),
          azureServicePrincipal: z.lazy(
            () => marshalAzureServicePrincipalSchema
          ),
        }),
        z.object({
          $case: z.literal('gcpServiceAccountKey'),
          gcpServiceAccountKey: z.lazy(() => marshalGcpServiceAccountKeySchema),
        }),
        z.object({
          $case: z.literal('azureManagedIdentity'),
          azureManagedIdentity: z.lazy(() => marshalAzureManagedIdentitySchema),
        }),
        z.object({
          $case: z.literal('databricksGcpServiceAccount'),
          databricksGcpServiceAccount: z.lazy(
            () => marshalDatabricksGcpServiceAccountSchema
          ),
        }),
        z.object({
          $case: z.literal('cloudflareApiToken'),
          cloudflareApiToken: z.lazy(() => marshalCloudflareApiTokenSchema),
        }),
      ])
      .optional(),
    comment: z.string().optional(),
    readOnly: z.boolean().optional(),
    owner: z.string().optional(),
    id: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    usedForManagedStorage: z.boolean().optional(),
    fullName: z.string().optional(),
    isolationMode: z.enum(IsolationMode).optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    new_name: d.newName,
    skip_validation: d.skipValidation,
    force: d.force,
    name: d.name,
    ...(d.credential?.$case === 'awsIamRole' && {
      aws_iam_role: d.credential.awsIamRole,
    }),
    ...(d.credential?.$case === 'azureServicePrincipal' && {
      azure_service_principal: d.credential.azureServicePrincipal,
    }),
    ...(d.credential?.$case === 'gcpServiceAccountKey' && {
      gcp_service_account_key: d.credential.gcpServiceAccountKey,
    }),
    ...(d.credential?.$case === 'azureManagedIdentity' && {
      azure_managed_identity: d.credential.azureManagedIdentity,
    }),
    ...(d.credential?.$case === 'databricksGcpServiceAccount' && {
      databricks_gcp_service_account: d.credential.databricksGcpServiceAccount,
    }),
    ...(d.credential?.$case === 'cloudflareApiToken' && {
      cloudflare_api_token: d.credential.cloudflareApiToken,
    }),
    comment: d.comment,
    read_only: d.readOnly,
    owner: d.owner,
    id: d.id,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    used_for_managed_storage: d.usedForManagedStorage,
    full_name: d.fullName,
    isolation_mode: d.isolationMode,
  }));

export const marshalValidateCredentialSchema: z.ZodType = z
  .object({
    credential: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('credentialName'),
          credentialName: z.string(),
        }),
        z.object({
          $case: z.literal('awsIamRole'),
          awsIamRole: z.lazy(() => marshalAwsIamRoleSchema),
        }),
        z.object({
          $case: z.literal('azureManagedIdentity'),
          azureManagedIdentity: z.lazy(() => marshalAzureManagedIdentitySchema),
        }),
        z.object({
          $case: z.literal('databricksGcpServiceAccount'),
          databricksGcpServiceAccount: z.lazy(
            () => marshalDatabricksGcpServiceAccountSchema
          ),
        }),
      ])
      .optional(),
    externalLocationName: z.string().optional(),
    url: z.string().optional(),
    readOnly: z.boolean().optional(),
  })
  .transform(d => ({
    ...(d.credential?.$case === 'credentialName' && {
      credential_name: d.credential.credentialName,
    }),
    ...(d.credential?.$case === 'awsIamRole' && {
      aws_iam_role: d.credential.awsIamRole,
    }),
    ...(d.credential?.$case === 'azureManagedIdentity' && {
      azure_managed_identity: d.credential.azureManagedIdentity,
    }),
    ...(d.credential?.$case === 'databricksGcpServiceAccount' && {
      databricks_gcp_service_account: d.credential.databricksGcpServiceAccount,
    }),
    external_location_name: d.externalLocationName,
    url: d.url,
    read_only: d.readOnly,
  }));

export const marshalValidateStorageCredentialSchema: z.ZodType = z
  .object({
    credential: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('storageCredentialName'),
          storageCredentialName: z.string(),
        }),
        z.object({
          $case: z.literal('awsIamRole'),
          awsIamRole: z.lazy(() => marshalAwsIamRoleSchema),
        }),
        z.object({
          $case: z.literal('azureServicePrincipal'),
          azureServicePrincipal: z.lazy(
            () => marshalAzureServicePrincipalSchema
          ),
        }),
        z.object({
          $case: z.literal('azureManagedIdentity'),
          azureManagedIdentity: z.lazy(() => marshalAzureManagedIdentitySchema),
        }),
        z.object({
          $case: z.literal('databricksGcpServiceAccount'),
          databricksGcpServiceAccount: z.lazy(
            () => marshalDatabricksGcpServiceAccountSchema
          ),
        }),
        z.object({
          $case: z.literal('cloudflareApiToken'),
          cloudflareApiToken: z.lazy(() => marshalCloudflareApiTokenSchema),
        }),
      ])
      .optional(),
    externalLocationName: z.string().optional(),
    url: z.string().optional(),
    readOnly: z.boolean().optional(),
  })
  .transform(d => ({
    ...(d.credential?.$case === 'storageCredentialName' && {
      storage_credential_name: d.credential.storageCredentialName,
    }),
    ...(d.credential?.$case === 'awsIamRole' && {
      aws_iam_role: d.credential.awsIamRole,
    }),
    ...(d.credential?.$case === 'azureServicePrincipal' && {
      azure_service_principal: d.credential.azureServicePrincipal,
    }),
    ...(d.credential?.$case === 'azureManagedIdentity' && {
      azure_managed_identity: d.credential.azureManagedIdentity,
    }),
    ...(d.credential?.$case === 'databricksGcpServiceAccount' && {
      databricks_gcp_service_account: d.credential.databricksGcpServiceAccount,
    }),
    ...(d.credential?.$case === 'cloudflareApiToken' && {
      cloudflare_api_token: d.credential.cloudflareApiToken,
    }),
    external_location_name: d.externalLocationName,
    url: d.url,
    read_only: d.readOnly,
  }));
