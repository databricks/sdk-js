// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum IsolationMode {
  ISOLATION_MODE_UNSPECIFIED = 'ISOLATION_MODE_UNSPECIFIED',
  ISOLATION_MODE_OPEN = 'ISOLATION_MODE_OPEN',
  ISOLATION_MODE_ISOLATED = 'ISOLATION_MODE_ISOLATED',
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
export enum ValidateCredentialRequest_Result {
  PASS = 'PASS',
  FAIL = 'FAIL',
  SKIP = 'SKIP',
}

/**
 * A enum represents the file operation performed on the external location
 * with the storage credential
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ValidateStorageCredentialRequest_FileOperation {
  LIST = 'LIST',
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  PATH_EXISTS = 'PATH_EXISTS',
}

/** A enum represents the result of the file operation */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ValidateStorageCredentialRequest_Result {
  PASS = 'PASS',
  FAIL = 'FAIL',
  SKIP = 'SKIP',
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

export interface CreateCredentialRequest {
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

export interface CreateStorageCredentialRequest {
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

export interface DeleteCredentialRequest {
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
export interface DeleteCredentialRequest_Response {}

export interface DeleteStorageCredentialRequest {
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
export interface DeleteStorageCredentialRequest_Response {}

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

export interface GenerateTemporaryPathCredentialRequest {
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
export interface GenerateTemporaryPathCredentialRequest_Response {
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
    | undefined;
  /**
   * Server time when the credential will expire, in epoch milliseconds.
   * The API client is advised to cache the credential given this expiration time.
   */
  expirationTime?: number | undefined;
  /** The URL of the storage path accessible by the temporary credential. */
  url?: string | undefined;
}

export interface GenerateTemporaryServiceCredentialRequest {
  /** The name of the service credential used to generate a temporary credential */
  credentialName?: string | undefined;
  options?:
    | {
        $case: 'azureOptions';
        azureOptions: GenerateTemporaryServiceCredentialRequest_AzureOptions;
      }
    | {
        $case: 'gcpOptions';
        gcpOptions: GenerateTemporaryServiceCredentialRequest_GcpOptions;
      }
    | undefined;
}

/** The Azure cloud options to customize the requested temporary credential */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GenerateTemporaryServiceCredentialRequest_AzureOptions {
  /**
   * The resources to which the temporary Azure credential should apply. These resources
   * are the scopes that are passed to the token provider (see https://learn.microsoft.com/python/api/azure-core/azure.core.credentials.tokencredential?view=azure-python)
   */
  resources?: string[] | undefined;
}

/** The GCP cloud options to customize the requested temporary credential */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GenerateTemporaryServiceCredentialRequest_GcpOptions {
  /**
   * The scopes to which the temporary GCP credential should apply. These resources
   * are the scopes that are passed to the token provider (see
   * https://google-auth.readthedocs.io/en/latest/reference/google.auth.html#google.auth.credentials.Credentials)
   */
  scopes?: string[] | undefined;
}

export interface GenerateTemporaryTableCredentialRequest {
  /** UUID of the table to read or write. */
  tableId?: string | undefined;
  /**
   * The operation performed against the table data, either READ or READ_WRITE. If READ_WRITE is specified,
   * the credentials returned will have write permissions, otherwise, it will be read only.
   */
  operation?: TableOperation | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GenerateTemporaryTableCredentialRequest_Response {
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
export interface GenerateTemporaryVolumeCredentialRequest {
  /** Id of the volume to read or write. */
  volumeId?: string | undefined;
  /**
   * The operation performed against the volume data, either READ_VOLUME or WRITE_VOLUME. If WRITE_VOLUME is specified,
   * the credentials returned will have write permissions, otherwise, it will be read only.
   */
  operation?: VolumeOperation | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GenerateTemporaryVolumeCredentialRequest_Response {
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
    | undefined;
  /**
   * Server time when the credential will expire, in epoch milliseconds.
   * The API client is advised to cache the credential given this expiration time.
   */
  expirationTime?: number | undefined;
  /** The URL of the storage path accessible by the temporary credential. */
  url?: string | undefined;
}

export interface GetCredentialRequest {
  /** Name of the credential. */
  nameArg?: string | undefined;
}

/**
 * TODO(UC-1710): The legacy /storage-credentials API is being deprecated.
 * Please use the new consolidated /credentials API instead.
 * See https://github.com/databricks-eng/universe/pull/857047#discussion_r1924779791 for an example of a case when that wasn't possible.
 */
export interface GetStorageCredentialRequest {
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
export interface ListCredentialsRequest {
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
export interface ListCredentialsRequest_Response {
  credentials?: CredentialInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no
   * more pages.
   * __page_token__ should be set to this value for the next request (for the
   * next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListStorageCredentialsRequest {
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
export interface ListStorageCredentialsRequest_Response {
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
    | undefined;
  /**
   * Server time when the credential will expire, in epoch milliseconds.
   * The API client is advised to cache the credential given this expiration time.
   */
  expirationTime?: number | undefined;
  /** The URL of the storage path accessible by the temporary credential. */
  url?: string | undefined;
}

export interface UpdateCredentialRequest {
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

export interface UpdateStorageCredentialRequest {
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
export interface ValidateCredentialRequest {
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
export interface ValidateCredentialRequest_Response {
  /** The results of the validation check. */
  results?: ValidateCredentialRequest_ValidationResult[] | undefined;
  /**
   * Whether the tested location is a directory in cloud storage. Only
   * applicable for when purpose is **STORAGE**.
   */
  isDir?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ValidateCredentialRequest_ValidationResult {
  /** The results of the tested operation. */
  result?: ValidateCredentialRequest_Result | undefined;
  /** Error message would exist when the result does not equal to **PASS**. */
  message?: string | undefined;
}

export interface ValidateStorageCredentialRequest {
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
export interface ValidateStorageCredentialRequest_Response {
  /** Whether the tested location is a directory in cloud storage. */
  isDir?: boolean | undefined;
  /** The results of the validation check. */
  results?: ValidateStorageCredentialRequest_ValidationResult[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ValidateStorageCredentialRequest_ValidationResult {
  /** The operation tested. */
  operation?: ValidateStorageCredentialRequest_FileOperation | undefined;
  /** The results of the tested operation. */
  result?: ValidateStorageCredentialRequest_Result | undefined;
  /** Error message would exist when the result does not equal to **PASS**. */
  message?: string | undefined;
}

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
export const unmarshalDeleteCredentialRequest_ResponseSchema: z.ZodType<DeleteCredentialRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteStorageCredentialRequest_ResponseSchema: z.ZodType<DeleteStorageCredentialRequest_Response> =
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
export const unmarshalGenerateTemporaryPathCredentialRequest_ResponseSchema: z.ZodType<GenerateTemporaryPathCredentialRequest_Response> =
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
                  : undefined,
      expirationTime: d.expiration_time,
      url: d.url,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGenerateTemporaryTableCredentialRequest_ResponseSchema: z.ZodType<GenerateTemporaryTableCredentialRequest_Response> =
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
                  : undefined,
      expirationTime: d.expiration_time,
      url: d.url,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGenerateTemporaryVolumeCredentialRequest_ResponseSchema: z.ZodType<GenerateTemporaryVolumeCredentialRequest_Response> =
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
                  : undefined,
      expirationTime: d.expiration_time,
      url: d.url,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListCredentialsRequest_ResponseSchema: z.ZodType<ListCredentialsRequest_Response> =
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
export const unmarshalListStorageCredentialsRequest_ResponseSchema: z.ZodType<ListStorageCredentialsRequest_Response> =
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
                  : undefined,
      expirationTime: d.expiration_time,
      url: d.url,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalValidateCredentialRequest_ResponseSchema: z.ZodType<ValidateCredentialRequest_Response> =
  z
    .object({
      results: z
        .array(
          z.lazy(
            () => unmarshalValidateCredentialRequest_ValidationResultSchema
          )
        )
        .optional(),
      isDir: z.boolean().optional(),
    })
    .transform(d => ({
      results: d.results,
      isDir: d.isDir,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalValidateCredentialRequest_ValidationResultSchema: z.ZodType<ValidateCredentialRequest_ValidationResult> =
  z
    .object({
      result: z.enum(ValidateCredentialRequest_Result).optional(),
      message: z.string().optional(),
    })
    .transform(d => ({
      result: d.result,
      message: d.message,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalValidateStorageCredentialRequest_ResponseSchema: z.ZodType<ValidateStorageCredentialRequest_Response> =
  z
    .object({
      isDir: z.boolean().optional(),
      results: z
        .array(
          z.lazy(
            () =>
              unmarshalValidateStorageCredentialRequest_ValidationResultSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      isDir: d.isDir,
      results: d.results,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalValidateStorageCredentialRequest_ValidationResultSchema: z.ZodType<ValidateStorageCredentialRequest_ValidationResult> =
  z
    .object({
      operation: z
        .enum(ValidateStorageCredentialRequest_FileOperation)
        .optional(),
      result: z.enum(ValidateStorageCredentialRequest_Result).optional(),
      message: z.string().optional(),
    })
    .transform(d => ({
      operation: d.operation,
      result: d.result,
      message: d.message,
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

export const marshalCreateCredentialRequestSchema: z.ZodType = z
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

export const marshalCreateStorageCredentialRequestSchema: z.ZodType = z
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

export const marshalGenerateTemporaryPathCredentialRequestSchema: z.ZodType = z
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

export const marshalGenerateTemporaryServiceCredentialRequestSchema: z.ZodType =
  z
    .object({
      credentialName: z.string().optional(),
      options: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('azureOptions'),
            azureOptions: z.lazy(
              () =>
                marshalGenerateTemporaryServiceCredentialRequest_AzureOptionsSchema
            ),
          }),
          z.object({
            $case: z.literal('gcpOptions'),
            gcpOptions: z.lazy(
              () =>
                marshalGenerateTemporaryServiceCredentialRequest_GcpOptionsSchema
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
export const marshalGenerateTemporaryServiceCredentialRequest_AzureOptionsSchema: z.ZodType =
  z
    .object({
      resources: z.array(z.string()).optional(),
    })
    .transform(d => ({
      resources: d.resources,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGenerateTemporaryServiceCredentialRequest_GcpOptionsSchema: z.ZodType =
  z
    .object({
      scopes: z.array(z.string()).optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
    }));

export const marshalGenerateTemporaryTableCredentialRequestSchema: z.ZodType = z
  .object({
    tableId: z.string().optional(),
    operation: z.enum(TableOperation).optional(),
  })
  .transform(d => ({
    table_id: d.tableId,
    operation: d.operation,
  }));

export const marshalGenerateTemporaryVolumeCredentialRequestSchema: z.ZodType =
  z
    .object({
      volumeId: z.string().optional(),
      operation: z.enum(VolumeOperation).optional(),
    })
    .transform(d => ({
      volume_id: d.volumeId,
      operation: d.operation,
    }));

export const marshalUpdateCredentialRequestSchema: z.ZodType = z
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

export const marshalUpdateStorageCredentialRequestSchema: z.ZodType = z
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

export const marshalValidateCredentialRequestSchema: z.ZodType = z
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

export const marshalValidateStorageCredentialRequestSchema: z.ZodType = z
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
