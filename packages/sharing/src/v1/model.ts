// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {z} from 'zod';

/**
 * UC supported column types
 * Copied from https://src.dev.databricks.com/databricks/universe@23a85902bb58695ab9293adc9f327b0714b55e72/-/blob/managed-catalog/api/messages/table.proto?L68
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ColumnTypeName = {
  COLUMN_TYPE_NAME_UNSPECIFIED: 'COLUMN_TYPE_NAME_UNSPECIFIED',
  BOOLEAN: 'BOOLEAN',
  BYTE: 'BYTE',
  SHORT: 'SHORT',
  INT: 'INT',
  LONG: 'LONG',
  FLOAT: 'FLOAT',
  DOUBLE: 'DOUBLE',
  DATE: 'DATE',
  TIMESTAMP: 'TIMESTAMP',
  STRING: 'STRING',
  BINARY: 'BINARY',
  DECIMAL: 'DECIMAL',
  INTERVAL: 'INTERVAL',
  ARRAY: 'ARRAY',
  STRUCT: 'STRUCT',
  MAP: 'MAP',
  CHAR: 'CHAR',
  NULL: 'NULL',
  USER_DEFINED_TYPE: 'USER_DEFINED_TYPE',
  TIMESTAMP_NTZ: 'TIMESTAMP_NTZ',
  VARIANT: 'VARIANT',
  TABLE_TYPE: 'TABLE_TYPE',
} as const;
export type ColumnTypeName =
  | (typeof ColumnTypeName)[keyof typeof ColumnTypeName]
  | (string & {});

/** The delta sharing authentication type. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DeltaSharingAuthenticationType = {
  /** Token-based authentication. */
  TOKEN: 'TOKEN',
  /** Databricks-managed authentication. */
  DATABRICKS: 'DATABRICKS',
  /** OIDC Federation authentication */
  OIDC_FEDERATION: 'OIDC_FEDERATION',
  /** OAuth Client Credentials Grant based authentication. This option is for provider imports only. */
  OAUTH_CLIENT_CREDENTIALS: 'OAUTH_CLIENT_CREDENTIALS',
} as const;
export type DeltaSharingAuthenticationType =
  | (typeof DeltaSharingAuthenticationType)[keyof typeof DeltaSharingAuthenticationType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FunctionParameterMode = {
  FUNCTION_PARAMETER_MODE_UNSPECIFIED: 'FUNCTION_PARAMETER_MODE_UNSPECIFIED',
  IN: 'IN',
  OUT: 'OUT',
  INOUT: 'INOUT',
} as const;
export type FunctionParameterMode =
  | (typeof FunctionParameterMode)[keyof typeof FunctionParameterMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FunctionParameterType = {
  FUNCTION_PARAMETER_TYPE_UNSPECIFIED: 'FUNCTION_PARAMETER_TYPE_UNSPECIFIED',
  PARAM: 'PARAM',
  COLUMN: 'COLUMN',
} as const;
export type FunctionParameterType =
  | (typeof FunctionParameterType)[keyof typeof FunctionParameterType]
  | (string & {});

/** The SecurableKind of a delta-shared object. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SharedSecurableKind = {
  SHARED_SECURABLE_KIND_UNSPECIFIED: 'SHARED_SECURABLE_KIND_UNSPECIFIED',
  FUNCTION_STANDARD: 'FUNCTION_STANDARD',
  FUNCTION_REGISTERED_MODEL: 'FUNCTION_REGISTERED_MODEL',
  FUNCTION_FEATURE_SPEC: 'FUNCTION_FEATURE_SPEC',
} as const;
export type SharedSecurableKind =
  | (typeof SharedSecurableKind)[keyof typeof SharedSecurableKind]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PartitionSpecification_Partition_PartitionValue_PartitionValueOp =
  {
    EQUAL: 'EQUAL',
    LIKE: 'LIKE',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type PartitionSpecification_Partition_PartitionValue_PartitionValueOp =
  | (typeof PartitionSpecification_Partition_PartitionValue_PartitionValueOp)[keyof typeof PartitionSpecification_Partition_PartitionValue_PartitionValueOp]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SharedDataObject_HistoryDataSharingStatus_Enum = {
  DISABLED: 'DISABLED',
  ENABLED: 'ENABLED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SharedDataObject_HistoryDataSharingStatus_Enum =
  | (typeof SharedDataObject_HistoryDataSharingStatus_Enum)[keyof typeof SharedDataObject_HistoryDataSharingStatus_Enum]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SharedDataObject_Status_Enum = {
  /** Object is being shared with recipients without any issues. */
  ACTIVE: 'ACTIVE',
  /**
   * For securables, the share owner has lost access to the securable,
   * so the securable is not being shared with the recipient.
   */
  PERMISSION_DENIED: 'PERMISSION_DENIED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type SharedDataObject_Status_Enum =
  | (typeof SharedDataObject_Status_Enum)[keyof typeof SharedDataObject_Status_Enum]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const UpdateShareRequest_SharedDataObjectUpdate_Action = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  UPDATE: 'UPDATE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type UpdateShareRequest_SharedDataObjectUpdate_Action =
  | (typeof UpdateShareRequest_SharedDataObjectUpdate_Action)[keyof typeof UpdateShareRequest_SharedDataObjectUpdate_Action]
  | (string & {});

export interface CreateFederationPolicyRequest {
  /** Name of the recipient. This is the name of the recipient for which the policy is being created. */
  recipientName?: string | undefined;
  /** Name of the policy. This is the name of the policy to be created. */
  policy?: FederationPolicy | undefined;
}

export interface CreateProviderRequest {
  /** The name of the Provider. */
  name?: string | undefined;
  authenticationType?: DeltaSharingAuthenticationType | undefined;
  /** This field is required when the __authentication_type__ is **TOKEN**, **OAUTH_CLIENT_CREDENTIALS** or not provided. */
  recipientProfileStr?: string | undefined;
  /** Description about the provider. */
  comment?: string | undefined;
  /** Username of Provider owner. */
  owner?: string | undefined;
  /** The recipient profile. This field is only present when the authentication_type is `TOKEN` or `OAUTH_CLIENT_CREDENTIALS`. */
  recipientProfile?: RecipientProfile | undefined;
  /** Time at which this Provider was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of Provider creator. */
  createdBy?: string | undefined;
  /** Time at which this Provider was created, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified Provider. */
  updatedBy?: string | undefined;
  /** Cloud vendor of the provider's UC metastore. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  cloud?: string | undefined;
  /** Cloud region of the provider's UC metastore. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  region?: string | undefined;
  /** UUID of the provider's UC metastore. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  metastoreId?: string | undefined;
  /** The global UC metastore id of the data provider. This field is only present when the __authentication_type__ is **DATABRICKS**. The identifier is of format __cloud__:__region__:__metastore-uuid__. */
  dataProviderGlobalMetastoreId?: string | undefined;
}

export interface CreateRecipientRequest {
  /** Name of Recipient. */
  name?: string | undefined;
  authenticationType?: DeltaSharingAuthenticationType | undefined;
  /** The one-time sharing code provided by the data recipient. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  sharingCode?: string | undefined;
  /**
   * The global Unity Catalog metastore id provided by the data recipient.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   * The identifier is of format __cloud__:__region__:__metastore-uuid__.
   */
  dataRecipientGlobalMetastoreId?: string | undefined;
  /** Username of the recipient owner. */
  owner?: string | undefined;
  /** Description about the recipient. */
  comment?: string | undefined;
  /** IP Access List */
  ipAccessList?: IpAccessList | undefined;
  /**
   * Recipient properties as map of string key-value pairs.
   * When provided in update request, the specified properties will override the existing
   * properties. To add and remove properties, one would need to perform a read-modify-write.
   */
  propertiesKvpairs?: PropertiesKvPairs | undefined;
  /** Expiration timestamp of the token, in epoch milliseconds. */
  expirationTime?: bigint | undefined;
  /**
   * Full activation url to retrieve the access token.
   * It will be empty if the token is already retrieved.
   */
  activationUrl?: string | undefined;
  /** A boolean status field showing whether the Recipient's activation URL has been exercised or not. */
  activated?: boolean | undefined;
  /** Time at which this recipient was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of recipient creator. */
  createdBy?: string | undefined;
  /** This field is only present when the __authentication_type__ is **TOKEN**. */
  tokens?: RecipientTokenInfo[] | undefined;
  /** Time at which the recipient was updated, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of recipient updater. */
  updatedBy?: string | undefined;
  /**
   * Cloud vendor of the recipient's Unity Catalog Metastore.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   */
  cloud?: string | undefined;
  /**
   * Cloud region of the recipient's Unity Catalog Metastore.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   */
  region?: string | undefined;
  /**
   * Unique identifier of recipient's Unity Catalog Metastore.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   */
  metastoreId?: string | undefined;
  /** [Create,Update:IGN] common - id of the recipient */
  id?: string | undefined;
}

export interface CreateShareRequest {
  /** Name of the share. */
  name?: string | undefined;
  /** Username of current owner of share. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Storage root URL for the share. */
  storageRoot?: string | undefined;
  /** A list of shared data objects within the share. */
  objects?: SharedDataObject[] | undefined;
  /** Time at which this share was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of share creator. */
  createdBy?: string | undefined;
  /** Time at which this share was updated, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of share updater. */
  updatedBy?: string | undefined;
  /** Storage Location URL (full path) for the share. */
  storageLocation?: string | undefined;
}

export interface DeleteFederationPolicyRequest {
  /** Name of the recipient. This is the name of the recipient for which the policy is being deleted. */
  recipientName?: string | undefined;
  /** Name of the policy. This is the name of the policy to be deleted. */
  name?: string | undefined;
}

export interface DeleteProviderRequest {
  /** Name of the provider. */
  nameArg?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteProviderResponse {}

export interface DeleteRecipientRequest {
  /** Name of the recipient. */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteRecipientResponse {}

export interface DeleteShareRequest {
  /** The name of the share. */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteShareResponse {}

/** Represents a UC dependency. */
export interface Dependency {
  value?:
    | {$case: 'table'; table: TableDependency}
    | {$case: 'function'; function: FunctionDependency}
    | undefined;
}

/** Represents a list of dependencies. */
export interface DependencyList {
  /** An array of Dependency. */
  dependencies?: Dependency[] | undefined;
}

export interface FederationPolicy {
  /**
   * Name of the federation policy. A recipient can have multiple policies with different names.
   * The name must contain only lowercase alphanumeric characters, numbers, and hyphens.
   */
  name?: string | undefined;
  policy?:
    | {
        $case: 'oidcPolicy';
        /** Specifies the policy to use for validating OIDC claims in the federated tokens. */
        oidcPolicy: OidcFederationPolicy;
      }
    | undefined;
  /** System-generated timestamp indicating when the policy was created. */
  createTime?: Temporal.Instant | undefined;
  /** Description of the policy. This is a user-provided description. */
  comment?: string | undefined;
  /** System-generated timestamp indicating when the policy was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Unique, immutable system-generated identifier for the federation policy. */
  id?: string | undefined;
}

export interface Function {
  /** The name of the function. */
  name?: string | undefined;
  /** The name of the schema that the function belongs to. */
  schema?: string | undefined;
  /** The name of the share that the function belongs to. */
  share?: string | undefined;
  /** The id of the share that the function belongs to. */
  shareId?: string | undefined;
  /** The id of the function. */
  id?: string | undefined;
  /** The storage location of the function. */
  storageLocation?: string | undefined;
  /** The comment of the function. */
  comment?: string | undefined;
  /** The aliass of registered model. */
  aliases?: RegisteredModelAlias[] | undefined;
  /** The tags of the function. */
  tags?: TagKeyValue[] | undefined;
  /** The securable kind of the function. */
  securableKind?: SharedSecurableKind | undefined;
  /** The full data type of the function. */
  fullDataType?: string | undefined;
  /** The data type of the function. */
  dataType?: ColumnTypeName | undefined;
  /** The routine definition of the function. */
  routineDefinition?: string | undefined;
  /** The function parameter information. */
  inputParams?: FunctionParameterInfos | undefined;
  /** The dependency list of the function. */
  dependencyList?: DependencyList | undefined;
  /** The properties of the function. */
  properties?: string | undefined;
}

/** A Function in UC as a dependency. */
export interface FunctionDependency {
  schemaName?: string | undefined;
  functionName?: string | undefined;
}

/** Represents a parameter of a function. The same message is used for both input and output columns. */
export interface FunctionParameterInfo {
  /** The name of the parameter. */
  name?: string | undefined;
  /** The type of the parameter in text format. */
  typeText?: string | undefined;
  /** The type of the parameter in JSON format. */
  typeJson?: string | undefined;
  /** The type of the parameter in Enum format. */
  typeName?: ColumnTypeName | undefined;
  /** The precision of the parameter type. */
  typePrecision?: number | undefined;
  /** The scale of the parameter type. */
  typeScale?: number | undefined;
  /** The interval type of the parameter type. */
  typeIntervalType?: string | undefined;
  /** The position of the parameter. */
  position?: number | undefined;
  /** The mode of the function parameter. */
  parameterMode?: FunctionParameterMode | undefined;
  /** The type of the function parameter. */
  parameterType?: FunctionParameterType | undefined;
  /** The default value of the parameter. */
  parameterDefault?: string | undefined;
  /** The comment of the parameter. */
  comment?: string | undefined;
}

export interface FunctionParameterInfos {
  /** The list of parameters of the function. */
  parameters?: FunctionParameterInfo[] | undefined;
}

export interface GetActivationUrlInfoRequest {
  /** The one time activation url. It also accepts activation token. */
  activationUrl?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetActivationUrlInfoResponse {}

export interface GetFederationPolicyRequest {
  /** Name of the recipient. This is the name of the recipient for which the policy is being retrieved. */
  recipientName?: string | undefined;
  /** Name of the policy. This is the name of the policy to be retrieved. */
  name?: string | undefined;
}

export interface GetProviderRequest {
  /** Name of the provider. */
  nameArg?: string | undefined;
}

export interface GetRecipientRequest {
  /** Name of the recipient. */
  name?: string | undefined;
}

export interface GetRecipientSharePermissionsResponse {
  /** An array of data share permissions for a recipient. */
  permissionsOut?: ShareToPrivilegeAssignment[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface GetSharePermissionsResponse {
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
  /** The privileges assigned to each principal */
  privilegeAssignments?: PrivilegeAssignment[] | undefined;
}

export interface GetShareRequest {
  /** The name of the share. */
  name?: string | undefined;
  /** Query for data to include in the share. */
  includeSharedData?: boolean | undefined;
}

export interface IpAccessList {
  /** Allowed IP Addresses in CIDR notation. Limit of 100. */
  allowedIpAddresses?: string[] | undefined;
}

export interface ListFederationPoliciesRequest {
  /** Name of the recipient. This is the name of the recipient for which the policies are being listed. */
  recipientName?: string | undefined;
  maxResults?: number | undefined;
  pageToken?: string | undefined;
}

export interface ListFederationPoliciesResponse {
  policies?: FederationPolicy[] | undefined;
  nextPageToken?: string | undefined;
}

/** Request to fetch the list of assets of a share that is shared with the recipient. */
export interface ListProviderShareAssetsRequest {
  /** The name of the provider who owns the share. */
  providerNameArg?: string | undefined;
  /** The name of the share. */
  shareNameArg?: string | undefined;
  /** Maximum number of tables to return. */
  tableMaxResults?: number | undefined;
  /** Maximum number of functions to return. */
  functionMaxResults?: number | undefined;
  /** Maximum number of volumes to return. */
  volumeMaxResults?: number | undefined;
  /** Maximum number of notebooks to return. */
  notebookMaxResults?: number | undefined;
}

/** Response to ListProviderShareAssets, which contains the list of assets of a share. */
export interface ListProviderShareAssetsResponse {
  /** The list of tables in the share. */
  tables?: Table[] | undefined;
  /** The list of functions in the share. */
  functions?: Function[] | undefined;
  /** The list of notebooks in the share. */
  notebooks?: NotebookFile[] | undefined;
  /** The list of volumes in the share. */
  volumes?: Volume[] | undefined;
  /** The metadata of the share. */
  share?: Share | undefined;
}

export interface ListProviderSharesRequest {
  /** Name of the provider in which to list shares. */
  providerNameArg?: string | undefined;
  /**
   * Maximum number of shares to return.
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all valid shares are returned (not recommended).
   * - Note: The number of returned shares might be less than the specified max_results size, even zero.
   * The only definitive indication that no further shares can be fetched is when the next_page_token is unset from the response.
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListProviderSharesResponse {
  /** An array of provider shares. */
  shares?: ProviderShare[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListProvidersRequest {
  /**
   * If not provided, all providers will be returned.
   * If no providers exist with this ID, no results will be returned.
   */
  dataProviderGlobalMetastoreId?: string | undefined;
  /**
   * Maximum number of providers to return.
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all valid providers are returned (not recommended).
   * - Note: The number of returned providers might be less than the specified max_results size, even zero.
   * The only definitive indication that no further providers can be fetched is when the next_page_token is unset from the response.
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListProvidersResponse {
  /** An array of provider information objects. */
  providers?: ProviderInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListRecipientSharePermissionsRequest {
  /** The name of the Recipient. */
  name?: string | undefined;
  /**
   * Maximum number of permissions to return.
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all valid permissions are returned (not recommended).
   * - Note: The number of returned permissions might be less than the specified max_results size, even zero.
   * The only definitive indication that no further permissions can be fetched is when the next_page_token is unset from the response.
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListRecipientsRequest {
  /**
   * If not provided, all recipients will be returned.
   * If no recipients exist with this ID, no results will be returned.
   */
  dataRecipientGlobalMetastoreId?: string | undefined;
  /**
   * Maximum number of recipients to return.
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all valid recipients are returned (not recommended).
   * - Note: The number of returned recipients might be less than the specified max_results size, even zero.
   * The only definitive indication that no further recipients can be fetched is when the next_page_token is unset from the response.
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListRecipientsResponse {
  /** An array of recipient information objects. */
  recipients?: RecipientInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListSharePermissionsRequest {
  /** The name of the share. */
  name?: string | undefined;
  /**
   * Maximum number of permissions to return.
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all valid permissions are returned (not recommended).
   * - Note: The number of returned permissions might be less than the specified max_results size, even zero.
   * The only definitive indication that no further permissions can be fetched is when the next_page_token is unset from the response.
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListSharesRequest {
  /**
   * Maximum number of shares to return.
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to a value less than 0, an invalid parameter error is returned;
   * - If not set, all valid shares are returned (not recommended).
   * - Note: The number of returned shares might be less than the specified max_results size, even zero.
   * The only definitive indication that no further shares can be fetched is when the next_page_token is unset from the response.
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListSharesResponse {
  /** An array of data share information objects. */
  shares?: ShareInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface NotebookFile {
  /** Name of the notebook file. */
  name?: string | undefined;
  /** The name of the share that the notebook file belongs to. */
  share?: string | undefined;
  /** The id of the share that the notebook file belongs to. */
  shareId?: string | undefined;
  /** The id of the notebook file. */
  id?: string | undefined;
  /** The comment of the notebook file. */
  comment?: string | undefined;
  /** The tags of the notebook file. */
  tags?: TagKeyValue[] | undefined;
}

/**
 * Specifies the policy to use for validating OIDC claims in your federated tokens from Delta Sharing Clients.
 * Refer to https://docs.databricks.com/en/delta-sharing/create-recipient-oidc-fed for more details.
 */
export interface OidcFederationPolicy {
  /** The required token issuer, as specified in the 'iss' claim of federated tokens. */
  issuer?: string | undefined;
  /**
   * The claim that contains the subject of the token.
   * Depending on the identity provider and the use case (U2M or M2M), this can vary:
   * - For Entra ID (AAD):
   * * U2M flow (group access): Use `groups`.
   * * U2M flow (user access): Use `oid`.
   * * M2M flow (OAuth App access): Use `azp`.
   * - For other IdPs, refer to the specific IdP documentation.
   *
   * Supported `subject_claim` values are:
   * - `oid`: Object ID of the user.
   * - `azp`: Client ID of the OAuth app.
   * - `groups`: Object ID of the group.
   * - `sub`: Subject identifier for other use cases.
   */
  subjectClaim?: string | undefined;
  /**
   * The required token subject, as specified in the subject claim of federated tokens.
   * The subject claim identifies the identity of the user or machine accessing the resource.
   * Examples for Entra ID (AAD):
   * - U2M flow (group access): If the subject claim is `groups`, this must be the Object ID of the group in Entra ID.
   * - U2M flow (user access): If the subject claim is `oid`, this must be the Object ID of the user in Entra ID.
   * - M2M flow (OAuth App access): If the subject claim is `azp`, this must be the client ID of the OAuth app registered in Entra ID.
   */
  subject?: string | undefined;
  /**
   * The allowed token audiences, as specified in the 'aud' claim of federated tokens.
   * The audience identifier is intended to represent the recipient of the token.
   * Can be any non-empty string value. As long as the audience in the token matches at least one audience in the policy,
   */
  audiences?: string[] | undefined;
}

/**
 * PartitionSpecification defines the format of partition filtering specification for shared tables.
 * It consists of a list of Partitions which in turn include a list of PartitionValues.
 * - Partitions inside a single PartitionSpecification have OR logical relationship.
 * - PartitionValues inside a single Partition have AND logical relationship.
 * - PartitionValue.name must have distinct values inside a single Partition.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PartitionSpecification {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PartitionSpecification_Partition {
  /** An array of partition values. */
  values?: PartitionSpecification_Partition_PartitionValue[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PartitionSpecification_Partition_PartitionValue {
  /** The name of the partition column. */
  name?: string | undefined;
  /**
   * The value of the partition column. When this value is not set, it means `null` value.
   * When this field is set, field `recipient_property_key` can not be set.
   */
  value?: string | undefined;
  /**
   * The key of a Delta Sharing recipient's property. For example "databricks-account-id".
   * When this field is set, field `value` can not be set.
   */
  recipientPropertyKey?: string | undefined;
  /** The operator to apply for the value. */
  op?:
    | PartitionSpecification_Partition_PartitionValue_PartitionValueOp
    | undefined;
}

export interface PermissionsChange {
  /**
   * The principal whose privileges we are changing.
   * Only one of principal or principal_id should be specified, never both at the same time.
   */
  principal?: string | undefined;
  /** The set of privileges to add. */
  add?: string[] | undefined;
  /** The set of privileges to remove. */
  remove?: string[] | undefined;
}

export interface PrivilegeAssignment {
  /**
   * The principal (user email address or group name).
   * For deleted principals, `principal` is empty while `principal_id` is populated.
   */
  principal?: string | undefined;
  /** The privileges assigned to the principal. */
  privileges?: string[] | undefined;
}

/** An object with __properties__ containing map of key-value properties attached to the securable. */
export interface PropertiesKvPairs {
  /** A map of key-value properties attached to the securable. */
  properties?: Record<string, string> | undefined;
}

export interface ProviderInfo {
  /** The name of the Provider. */
  name?: string | undefined;
  authenticationType?: DeltaSharingAuthenticationType | undefined;
  /** This field is required when the __authentication_type__ is **TOKEN**, **OAUTH_CLIENT_CREDENTIALS** or not provided. */
  recipientProfileStr?: string | undefined;
  /** Description about the provider. */
  comment?: string | undefined;
  /** Username of Provider owner. */
  owner?: string | undefined;
  /** The recipient profile. This field is only present when the authentication_type is `TOKEN` or `OAUTH_CLIENT_CREDENTIALS`. */
  recipientProfile?: RecipientProfile | undefined;
  /** Time at which this Provider was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of Provider creator. */
  createdBy?: string | undefined;
  /** Time at which this Provider was created, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified Provider. */
  updatedBy?: string | undefined;
  /** Cloud vendor of the provider's UC metastore. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  cloud?: string | undefined;
  /** Cloud region of the provider's UC metastore. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  region?: string | undefined;
  /** UUID of the provider's UC metastore. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  metastoreId?: string | undefined;
  /** The global UC metastore id of the data provider. This field is only present when the __authentication_type__ is **DATABRICKS**. The identifier is of format __cloud__:__region__:__metastore-uuid__. */
  dataProviderGlobalMetastoreId?: string | undefined;
}

export interface ProviderShare {
  /** The name of the Provider Share. */
  name?: string | undefined;
}

export interface RecipientInfo {
  /** Name of Recipient. */
  name?: string | undefined;
  authenticationType?: DeltaSharingAuthenticationType | undefined;
  /** The one-time sharing code provided by the data recipient. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  sharingCode?: string | undefined;
  /**
   * The global Unity Catalog metastore id provided by the data recipient.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   * The identifier is of format __cloud__:__region__:__metastore-uuid__.
   */
  dataRecipientGlobalMetastoreId?: string | undefined;
  /** Username of the recipient owner. */
  owner?: string | undefined;
  /** Description about the recipient. */
  comment?: string | undefined;
  /** IP Access List */
  ipAccessList?: IpAccessList | undefined;
  /**
   * Recipient properties as map of string key-value pairs.
   * When provided in update request, the specified properties will override the existing
   * properties. To add and remove properties, one would need to perform a read-modify-write.
   */
  propertiesKvpairs?: PropertiesKvPairs | undefined;
  /** Expiration timestamp of the token, in epoch milliseconds. */
  expirationTime?: bigint | undefined;
  /**
   * Full activation url to retrieve the access token.
   * It will be empty if the token is already retrieved.
   */
  activationUrl?: string | undefined;
  /** A boolean status field showing whether the Recipient's activation URL has been exercised or not. */
  activated?: boolean | undefined;
  /** Time at which this recipient was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of recipient creator. */
  createdBy?: string | undefined;
  /** This field is only present when the __authentication_type__ is **TOKEN**. */
  tokens?: RecipientTokenInfo[] | undefined;
  /** Time at which the recipient was updated, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of recipient updater. */
  updatedBy?: string | undefined;
  /**
   * Cloud vendor of the recipient's Unity Catalog Metastore.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   */
  cloud?: string | undefined;
  /**
   * Cloud region of the recipient's Unity Catalog Metastore.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   */
  region?: string | undefined;
  /**
   * Unique identifier of recipient's Unity Catalog Metastore.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   */
  metastoreId?: string | undefined;
  /** [Create,Update:IGN] common - id of the recipient */
  id?: string | undefined;
}

export interface RecipientProfile {
  /** The version number of the recipient's credentials on a share. */
  shareCredentialsVersion?: number | undefined;
  /** The endpoint for the share to be used by the recipient. */
  endpoint?: string | undefined;
  /** The token used to authorize the recipient. */
  bearerToken?: string | undefined;
}

export interface RecipientTokenInfo {
  /** Unique ID of the recipient token. */
  id?: string | undefined;
  /** Time at which this recipient token was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of recipient token creator. */
  createdBy?: string | undefined;
  /** Full activation URL to retrieve the access token. It will be empty if the token is already retrieved. */
  activationUrl?: string | undefined;
  /** Expiration timestamp of the token in epoch milliseconds. */
  expirationTime?: bigint | undefined;
  /** Time at which this recipient token was updated, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of recipient token updater. */
  updatedBy?: string | undefined;
}

export interface RegisteredModelAlias {
  /** Name of the alias. */
  aliasName?: string | undefined;
  /** Numeric model version that alias will reference. */
  versionNum?: bigint | undefined;
}

export interface RetrieveToken {
  /** The one time activation url. It also accepts activation token. */
  activationUrl?: string | undefined;
}

export interface RetrieveTokenResponse {
  /** These field names must follow the delta sharing protocol. */
  shareCredentialsVersion?: number | undefined;
  /** The token used to authorize the recipient. */
  bearerToken?: string | undefined;
  /** The endpoint for the share to be used by the recipient. */
  endpoint?: string | undefined;
  /** Expiration timestamp of the token in epoch milliseconds. */
  expirationTime?: string | undefined;
}

export interface RotateRecipientTokenRequest {
  /** The name of the Recipient. */
  name?: string | undefined;
  /**
   * The expiration time of the bearer token in ISO 8601 format. This will set the expiration_time
   * of existing token only to a smaller timestamp, it cannot extend the expiration_time. Use 0 to
   * expire the existing token immediately, negative number will return an error.
   */
  existingTokenExpireInSeconds?: bigint | undefined;
}

export interface Share {
  name?: string | undefined;
  id?: string | undefined;
}

export interface ShareInfo {
  /** Name of the share. */
  name?: string | undefined;
  /** Username of current owner of share. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Storage root URL for the share. */
  storageRoot?: string | undefined;
  /** A list of shared data objects within the share. */
  objects?: SharedDataObject[] | undefined;
  /** Time at which this share was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of share creator. */
  createdBy?: string | undefined;
  /** Time at which this share was updated, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of share updater. */
  updatedBy?: string | undefined;
  /** Storage Location URL (full path) for the share. */
  storageLocation?: string | undefined;
}

export interface ShareToPrivilegeAssignment {
  /** The share name. */
  shareName?: string | undefined;
  /** The privileges assigned to the principal. */
  privilegeAssignments?: PrivilegeAssignment[] | undefined;
}

export interface SharedDataObject {
  /**
   * A fully qualified name that uniquely identifies a data object.
   * For example, a table's fully qualified name is in the format of `<catalog>.<schema>.<table>`,
   */
  name?: string | undefined;
  /** The type of the data object. */
  dataObjectType?: string | undefined;
  /** The time when this data object is added to the share, in epoch milliseconds. */
  addedAt?: bigint | undefined;
  /** Username of the sharer. */
  addedBy?: string | undefined;
  /** A user-provided comment when adding the data object to the share. */
  comment?: string | undefined;
  /**
   * A user-provided alias name for table-like data objects within the share.
   *
   * Use this field for table-like objects (for example: TABLE, VIEW, MATERIALIZED_VIEW, STREAMING_TABLE, FOREIGN_TABLE).
   * For non-table objects (for example: VOLUME, MODEL, NOTEBOOK_FILE, FUNCTION), use `string_shared_as` instead.
   *
   * Important: For non-table objects, this field must be omitted entirely.
   *
   * Format: Must be a 2-part name `<schema_name>.<table_name>` (e.g., "sales_schema.orders_table")
   * - Both schema and table names must contain only alphanumeric characters and underscores
   * - No periods, spaces, forward slashes, or control characters are allowed within each part
   * - Do not include the catalog name (use 2 parts, not 3)
   *
   * Behavior:
   * - If not provided, the service automatically generates the alias as `<schema>.<table>` from the object's original name
   * - If you don't want to specify this field, omit it entirely from the request (do not pass an empty string)
   * - The `shared_as` name must be unique within the share
   *
   * Examples:
   * - Valid: "analytics_schema.customer_view"
   * - Invalid: "catalog.analytics_schema.customer_view" (3 parts not allowed)
   * - Invalid: "analytics-schema.customer-view" (hyphens not allowed)
   */
  sharedAs?: string | undefined;
  /** Whether to enable cdf or indicate if cdf is enabled on the shared object. */
  cdfEnabled?: boolean | undefined;
  /** Whether to enable or disable sharing of data history. If not specified, the default is **DISABLED**. */
  historyDataSharingStatus?:
    | SharedDataObject_HistoryDataSharingStatus_Enum
    | undefined;
  /**
   * The start version associated with the object.
   * This allows data providers to control the lowest object version that is accessible by clients.
   * If specified, clients can query snapshots or changes for versions >= start_version.
   * If not specified, clients can only query starting from the version of the object at the time
   * it was added to the share.
   *
   * NOTE: The start_version should be <= the `current` version of the object.
   */
  startVersion?: bigint | undefined;
  /** One of: **ACTIVE**, **PERMISSION_DENIED**. */
  status?: SharedDataObject_Status_Enum | undefined;
  /**
   * The content of the notebook file when the data object type is NOTEBOOK_FILE.
   * This should be base64 encoded.
   * Required for adding a NOTEBOOK_FILE, optional for updating, ignored for other types.
   */
  content?: string | undefined;
  /**
   * A user-provided alias name for non-table data objects within the share.
   *
   * Use this field for non-table objects (for example: VOLUME, MODEL, NOTEBOOK_FILE, FUNCTION).
   * For table-like objects (for example: TABLE, VIEW, MATERIALIZED_VIEW, STREAMING_TABLE, FOREIGN_TABLE), use `shared_as` instead.
   *
   * Important: For table-like objects, this field must be omitted entirely.
   *
   * Format:
   * - For VOLUME: Must be a 2-part name `<schema_name>.<volume_name>` (e.g., "data_schema.ml_models")
   * - For FUNCTION: Must be a 2-part name `<schema_name>.<function_name>` (e.g., "udf_schema.calculate_tax")
   * - For MODEL: Must be a 2-part name `<schema_name>.<model_name>` (e.g., "models.prediction_model")
   * - For NOTEBOOK_FILE: Should be the notebook file name (e.g., "analysis_notebook.py")
   * - All names must contain only alphanumeric characters and underscores
   * - No periods, spaces, forward slashes, or control characters are allowed within each part
   *
   * Behavior:
   * - If not provided, the service automatically generates the alias from the object's original name
   * - If you don't want to specify this field, omit it entirely from the request (do not pass an empty string)
   * - The `string_shared_as` name must be unique for objects of the same type within the share
   *
   * Examples:
   * - Valid for VOLUME: "data_schema.training_data"
   * - Valid for FUNCTION: "analytics.calculate_revenue"
   * - Invalid: "catalog.data_schema.training_data" (3 parts not allowed for volumes)
   * - Invalid: "data-schema.training-data" (hyphens not allowed)
   */
  stringSharedAs?: string | undefined;
  /** Array of partitions for the shared data. */
  partitions?: PartitionSpecification_Partition[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface SharedDataObject_HistoryDataSharingStatus {}

/** Note: This is scoped to prevent future enum name conflicts. */
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface SharedDataObject_Status {}

export interface Table {
  /** The name of the table. */
  name?: string | undefined;
  /** The name of the schema that the table belongs to. */
  schema?: string | undefined;
  /** The name of the share that the table belongs to. */
  share?: string | undefined;
  /** The id of the share that the table belongs to. */
  shareId?: string | undefined;
  /** The id of the table. */
  id?: string | undefined;
  /** The comment of the table. */
  comment?: string | undefined;
  /** The Tags of the table. */
  tags?: TagKeyValue[] | undefined;
  /** The name of a materialized table. */
  materializedTableName?: string | undefined;
  /** The catalog and schema of the materialized table */
  materializationNamespace?: string | undefined;
}

/** A Table in UC as a dependency. */
export interface TableDependency {
  schemaName?: string | undefined;
  tableName?: string | undefined;
}

export interface TagKeyValue {
  /** name of the tag */
  key?: string | undefined;
  /** value of the tag associated with the key, could be optional */
  value?: string | undefined;
}

export interface UpdateProviderRequest {
  /** Name of the provider. */
  nameArg?: string | undefined;
  /** New name for the provider. */
  newName?: string | undefined;
  /** The name of the Provider. */
  name?: string | undefined;
  authenticationType?: DeltaSharingAuthenticationType | undefined;
  /** This field is required when the __authentication_type__ is **TOKEN**, **OAUTH_CLIENT_CREDENTIALS** or not provided. */
  recipientProfileStr?: string | undefined;
  /** Description about the provider. */
  comment?: string | undefined;
  /** Username of Provider owner. */
  owner?: string | undefined;
  /** The recipient profile. This field is only present when the authentication_type is `TOKEN` or `OAUTH_CLIENT_CREDENTIALS`. */
  recipientProfile?: RecipientProfile | undefined;
  /** Time at which this Provider was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of Provider creator. */
  createdBy?: string | undefined;
  /** Time at which this Provider was created, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified Provider. */
  updatedBy?: string | undefined;
  /** Cloud vendor of the provider's UC metastore. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  cloud?: string | undefined;
  /** Cloud region of the provider's UC metastore. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  region?: string | undefined;
  /** UUID of the provider's UC metastore. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  metastoreId?: string | undefined;
  /** The global UC metastore id of the data provider. This field is only present when the __authentication_type__ is **DATABRICKS**. The identifier is of format __cloud__:__region__:__metastore-uuid__. */
  dataProviderGlobalMetastoreId?: string | undefined;
}

export interface UpdateRecipientRequest {
  /** Name of the recipient. */
  nameArg?: string | undefined;
  /**
   * New name for the recipient.
   * .
   */
  newName?: string | undefined;
  /** Name of Recipient. */
  name?: string | undefined;
  authenticationType?: DeltaSharingAuthenticationType | undefined;
  /** The one-time sharing code provided by the data recipient. This field is only present when the __authentication_type__ is **DATABRICKS**. */
  sharingCode?: string | undefined;
  /**
   * The global Unity Catalog metastore id provided by the data recipient.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   * The identifier is of format __cloud__:__region__:__metastore-uuid__.
   */
  dataRecipientGlobalMetastoreId?: string | undefined;
  /** Username of the recipient owner. */
  owner?: string | undefined;
  /** Description about the recipient. */
  comment?: string | undefined;
  /** IP Access List */
  ipAccessList?: IpAccessList | undefined;
  /**
   * Recipient properties as map of string key-value pairs.
   * When provided in update request, the specified properties will override the existing
   * properties. To add and remove properties, one would need to perform a read-modify-write.
   */
  propertiesKvpairs?: PropertiesKvPairs | undefined;
  /** Expiration timestamp of the token, in epoch milliseconds. */
  expirationTime?: bigint | undefined;
  /**
   * Full activation url to retrieve the access token.
   * It will be empty if the token is already retrieved.
   */
  activationUrl?: string | undefined;
  /** A boolean status field showing whether the Recipient's activation URL has been exercised or not. */
  activated?: boolean | undefined;
  /** Time at which this recipient was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of recipient creator. */
  createdBy?: string | undefined;
  /** This field is only present when the __authentication_type__ is **TOKEN**. */
  tokens?: RecipientTokenInfo[] | undefined;
  /** Time at which the recipient was updated, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of recipient updater. */
  updatedBy?: string | undefined;
  /**
   * Cloud vendor of the recipient's Unity Catalog Metastore.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   */
  cloud?: string | undefined;
  /**
   * Cloud region of the recipient's Unity Catalog Metastore.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   */
  region?: string | undefined;
  /**
   * Unique identifier of recipient's Unity Catalog Metastore.
   * This field is only present when the __authentication_type__ is **DATABRICKS**.
   */
  metastoreId?: string | undefined;
  /** [Create,Update:IGN] common - id of the recipient */
  id?: string | undefined;
}

export interface UpdateSharePermissionsRequest {
  /** The name of the share. */
  name?: string | undefined;
  /** Optional. Whether to return the latest permissions list of the share in the response. */
  omitPermissionsList?: boolean | undefined;
  /** Array of permissions change objects. */
  changes?: PermissionsChange[] | undefined;
}

export interface UpdateSharePermissionsResponse {
  /** The privileges assigned to each principal */
  privilegeAssignments?: PrivilegeAssignment[] | undefined;
}

export interface UpdateShareRequest {
  /** The name of the share. */
  nameArg?: string | undefined;
  /** New name for the share. */
  newName?: string | undefined;
  /** Array of shared data object updates. */
  updates?: UpdateShareRequest_SharedDataObjectUpdate[] | undefined;
  /** Name of the share. */
  name?: string | undefined;
  /** Username of current owner of share. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** Storage root URL for the share. */
  storageRoot?: string | undefined;
  /** A list of shared data objects within the share. */
  objects?: SharedDataObject[] | undefined;
  /** Time at which this share was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of share creator. */
  createdBy?: string | undefined;
  /** Time at which this share was updated, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of share updater. */
  updatedBy?: string | undefined;
  /** Storage Location URL (full path) for the share. */
  storageLocation?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateShareRequest_SharedDataObjectUpdate {
  /** One of: **ADD**, **REMOVE**, **UPDATE**. */
  action?: UpdateShareRequest_SharedDataObjectUpdate_Action | undefined;
  /** The data object that is being added, removed, or updated. The maximum number update data objects allowed is a 100. */
  dataObject?: SharedDataObject | undefined;
}

export interface Volume {
  /** The name of the volume. */
  name?: string | undefined;
  /**
   * This id maps to the shared_volume_id in database
   * Recipient needs shared_volume_id for recon
   * to check if this volume is already in recipient's DB or not.
   */
  id?: string | undefined;
  /** The name of the schema that the volume belongs to. */
  schema?: string | undefined;
  /** The name of the share that the volume belongs to. */
  share?: string | undefined;
  /** / The id of the share that the volume belongs to. */
  shareId?: string | undefined;
  /** The comment of the volume. */
  comment?: string | undefined;
  /** The tags of the volume. */
  tags?: TagKeyValue[] | undefined;
}

export const unmarshalDeleteProviderResponseSchema: z.ZodType<DeleteProviderResponse> =
  z.object({});

export const unmarshalDeleteRecipientResponseSchema: z.ZodType<DeleteRecipientResponse> =
  z.object({});

export const unmarshalDeleteShareResponseSchema: z.ZodType<DeleteShareResponse> =
  z.object({});

export const unmarshalDependencySchema: z.ZodType<Dependency> = z
  .object({
    table: z.lazy(() => unmarshalTableDependencySchema).optional(),
    function: z.lazy(() => unmarshalFunctionDependencySchema).optional(),
  })
  .transform(d => ({
    value:
      d.table !== undefined
        ? {$case: 'table' as const, table: d.table}
        : d.function !== undefined
          ? {$case: 'function' as const, function: d.function}
          : undefined,
  }));

export const unmarshalDependencyListSchema: z.ZodType<DependencyList> = z
  .object({
    dependencies: z.array(z.lazy(() => unmarshalDependencySchema)).optional(),
  })
  .transform(d => ({
    dependencies: d.dependencies,
  }));

export const unmarshalFederationPolicySchema: z.ZodType<FederationPolicy> = z
  .object({
    name: z.string().optional(),
    oidc_policy: z.lazy(() => unmarshalOidcFederationPolicySchema).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    comment: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    policy:
      d.oidc_policy !== undefined
        ? {$case: 'oidcPolicy' as const, oidcPolicy: d.oidc_policy}
        : undefined,
    createTime: d.create_time,
    comment: d.comment,
    updateTime: d.update_time,
    id: d.id,
  }));

export const unmarshalFunctionSchema: z.ZodType<Function> = z
  .object({
    name: z.string().optional(),
    schema: z.string().optional(),
    share: z.string().optional(),
    share_id: z.string().optional(),
    id: z.string().optional(),
    storage_location: z.string().optional(),
    comment: z.string().optional(),
    aliases: z
      .array(z.lazy(() => unmarshalRegisteredModelAliasSchema))
      .optional(),
    tags: z.array(z.lazy(() => unmarshalTagKeyValueSchema)).optional(),
    securable_kind: z.string().optional(),
    full_data_type: z.string().optional(),
    data_type: z.string().optional(),
    routine_definition: z.string().optional(),
    input_params: z
      .lazy(() => unmarshalFunctionParameterInfosSchema)
      .optional(),
    dependency_list: z.lazy(() => unmarshalDependencyListSchema).optional(),
    properties: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    schema: d.schema,
    share: d.share,
    shareId: d.share_id,
    id: d.id,
    storageLocation: d.storage_location,
    comment: d.comment,
    aliases: d.aliases,
    tags: d.tags,
    securableKind: d.securable_kind,
    fullDataType: d.full_data_type,
    dataType: d.data_type,
    routineDefinition: d.routine_definition,
    inputParams: d.input_params,
    dependencyList: d.dependency_list,
    properties: d.properties,
  }));

export const unmarshalFunctionDependencySchema: z.ZodType<FunctionDependency> =
  z
    .object({
      schema_name: z.string().optional(),
      function_name: z.string().optional(),
    })
    .transform(d => ({
      schemaName: d.schema_name,
      functionName: d.function_name,
    }));

export const unmarshalFunctionParameterInfoSchema: z.ZodType<FunctionParameterInfo> =
  z
    .object({
      name: z.string().optional(),
      type_text: z.string().optional(),
      type_json: z.string().optional(),
      type_name: z.string().optional(),
      type_precision: z.number().optional(),
      type_scale: z.number().optional(),
      type_interval_type: z.string().optional(),
      position: z.number().optional(),
      parameter_mode: z.string().optional(),
      parameter_type: z.string().optional(),
      parameter_default: z.string().optional(),
      comment: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      typeText: d.type_text,
      typeJson: d.type_json,
      typeName: d.type_name,
      typePrecision: d.type_precision,
      typeScale: d.type_scale,
      typeIntervalType: d.type_interval_type,
      position: d.position,
      parameterMode: d.parameter_mode,
      parameterType: d.parameter_type,
      parameterDefault: d.parameter_default,
      comment: d.comment,
    }));

export const unmarshalFunctionParameterInfosSchema: z.ZodType<FunctionParameterInfos> =
  z
    .object({
      parameters: z
        .array(z.lazy(() => unmarshalFunctionParameterInfoSchema))
        .optional(),
    })
    .transform(d => ({
      parameters: d.parameters,
    }));

export const unmarshalGetActivationUrlInfoResponseSchema: z.ZodType<GetActivationUrlInfoResponse> =
  z.object({});

export const unmarshalGetRecipientSharePermissionsResponseSchema: z.ZodType<GetRecipientSharePermissionsResponse> =
  z
    .object({
      permissions_out: z
        .array(z.lazy(() => unmarshalShareToPrivilegeAssignmentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      permissionsOut: d.permissions_out,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalGetSharePermissionsResponseSchema: z.ZodType<GetSharePermissionsResponse> =
  z
    .object({
      next_page_token: z.string().optional(),
      privilege_assignments: z
        .array(z.lazy(() => unmarshalPrivilegeAssignmentSchema))
        .optional(),
    })
    .transform(d => ({
      nextPageToken: d.next_page_token,
      privilegeAssignments: d.privilege_assignments,
    }));

export const unmarshalIpAccessListSchema: z.ZodType<IpAccessList> = z
  .object({
    allowed_ip_addresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    allowedIpAddresses: d.allowed_ip_addresses,
  }));

export const unmarshalListFederationPoliciesResponseSchema: z.ZodType<ListFederationPoliciesResponse> =
  z
    .object({
      policies: z
        .array(z.lazy(() => unmarshalFederationPolicySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      policies: d.policies,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListProviderShareAssetsResponseSchema: z.ZodType<ListProviderShareAssetsResponse> =
  z
    .object({
      tables: z.array(z.lazy(() => unmarshalTableSchema)).optional(),
      functions: z.array(z.lazy(() => unmarshalFunctionSchema)).optional(),
      notebooks: z.array(z.lazy(() => unmarshalNotebookFileSchema)).optional(),
      volumes: z.array(z.lazy(() => unmarshalVolumeSchema)).optional(),
      share: z.lazy(() => unmarshalShareSchema).optional(),
    })
    .transform(d => ({
      tables: d.tables,
      functions: d.functions,
      notebooks: d.notebooks,
      volumes: d.volumes,
      share: d.share,
    }));

export const unmarshalListProviderSharesResponseSchema: z.ZodType<ListProviderSharesResponse> =
  z
    .object({
      shares: z.array(z.lazy(() => unmarshalProviderShareSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      shares: d.shares,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListProvidersResponseSchema: z.ZodType<ListProvidersResponse> =
  z
    .object({
      providers: z.array(z.lazy(() => unmarshalProviderInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      providers: d.providers,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListRecipientsResponseSchema: z.ZodType<ListRecipientsResponse> =
  z
    .object({
      recipients: z
        .array(z.lazy(() => unmarshalRecipientInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      recipients: d.recipients,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSharesResponseSchema: z.ZodType<ListSharesResponse> =
  z
    .object({
      shares: z.array(z.lazy(() => unmarshalShareInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      shares: d.shares,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalNotebookFileSchema: z.ZodType<NotebookFile> = z
  .object({
    name: z.string().optional(),
    share: z.string().optional(),
    share_id: z.string().optional(),
    id: z.string().optional(),
    comment: z.string().optional(),
    tags: z.array(z.lazy(() => unmarshalTagKeyValueSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    share: d.share,
    shareId: d.share_id,
    id: d.id,
    comment: d.comment,
    tags: d.tags,
  }));

export const unmarshalOidcFederationPolicySchema: z.ZodType<OidcFederationPolicy> =
  z
    .object({
      issuer: z.string().optional(),
      subject_claim: z.string().optional(),
      subject: z.string().optional(),
      audiences: z.array(z.string()).optional(),
    })
    .transform(d => ({
      issuer: d.issuer,
      subjectClaim: d.subject_claim,
      subject: d.subject,
      audiences: d.audiences,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPartitionSpecification_PartitionSchema: z.ZodType<PartitionSpecification_Partition> =
  z
    .object({
      values: z
        .array(
          z.lazy(
            () => unmarshalPartitionSpecification_Partition_PartitionValueSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      values: d.values,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPartitionSpecification_Partition_PartitionValueSchema: z.ZodType<PartitionSpecification_Partition_PartitionValue> =
  z
    .object({
      name: z.string().optional(),
      value: z.string().optional(),
      recipient_property_key: z.string().optional(),
      op: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      value: d.value,
      recipientPropertyKey: d.recipient_property_key,
      op: d.op,
    }));

export const unmarshalPrivilegeAssignmentSchema: z.ZodType<PrivilegeAssignment> =
  z
    .object({
      principal: z.string().optional(),
      privileges: z.array(z.string()).optional(),
    })
    .transform(d => ({
      principal: d.principal,
      privileges: d.privileges,
    }));

export const unmarshalPropertiesKvPairsSchema: z.ZodType<PropertiesKvPairs> = z
  .object({
    properties: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    properties: d.properties,
  }));

export const unmarshalProviderInfoSchema: z.ZodType<ProviderInfo> = z
  .object({
    name: z.string().optional(),
    authentication_type: z.string().optional(),
    recipient_profile_str: z.string().optional(),
    comment: z.string().optional(),
    owner: z.string().optional(),
    recipient_profile: z.lazy(() => unmarshalRecipientProfileSchema).optional(),
    created_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z.string().optional(),
    updated_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z.string().optional(),
    cloud: z.string().optional(),
    region: z.string().optional(),
    metastore_id: z.string().optional(),
    data_provider_global_metastore_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    authenticationType: d.authentication_type,
    recipientProfileStr: d.recipient_profile_str,
    comment: d.comment,
    owner: d.owner,
    recipientProfile: d.recipient_profile,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    cloud: d.cloud,
    region: d.region,
    metastoreId: d.metastore_id,
    dataProviderGlobalMetastoreId: d.data_provider_global_metastore_id,
  }));

export const unmarshalProviderShareSchema: z.ZodType<ProviderShare> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalRecipientInfoSchema: z.ZodType<RecipientInfo> = z
  .object({
    name: z.string().optional(),
    authentication_type: z.string().optional(),
    sharing_code: z.string().optional(),
    data_recipient_global_metastore_id: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    ip_access_list: z.lazy(() => unmarshalIpAccessListSchema).optional(),
    properties_kvpairs: z
      .lazy(() => unmarshalPropertiesKvPairsSchema)
      .optional(),
    expiration_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    activation_url: z.string().optional(),
    activated: z.boolean().optional(),
    created_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z.string().optional(),
    tokens: z.array(z.lazy(() => unmarshalRecipientTokenInfoSchema)).optional(),
    updated_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z.string().optional(),
    cloud: z.string().optional(),
    region: z.string().optional(),
    metastore_id: z.string().optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    authenticationType: d.authentication_type,
    sharingCode: d.sharing_code,
    dataRecipientGlobalMetastoreId: d.data_recipient_global_metastore_id,
    owner: d.owner,
    comment: d.comment,
    ipAccessList: d.ip_access_list,
    propertiesKvpairs: d.properties_kvpairs,
    expirationTime: d.expiration_time,
    activationUrl: d.activation_url,
    activated: d.activated,
    createdAt: d.created_at,
    createdBy: d.created_by,
    tokens: d.tokens,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    cloud: d.cloud,
    region: d.region,
    metastoreId: d.metastore_id,
    id: d.id,
  }));

export const unmarshalRecipientProfileSchema: z.ZodType<RecipientProfile> = z
  .object({
    share_credentials_version: z.number().optional(),
    endpoint: z.string().optional(),
    bearer_token: z.string().optional(),
  })
  .transform(d => ({
    shareCredentialsVersion: d.share_credentials_version,
    endpoint: d.endpoint,
    bearerToken: d.bearer_token,
  }));

export const unmarshalRecipientTokenInfoSchema: z.ZodType<RecipientTokenInfo> =
  z
    .object({
      id: z.string().optional(),
      created_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      created_by: z.string().optional(),
      activation_url: z.string().optional(),
      expiration_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      updated_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      updated_by: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      createdAt: d.created_at,
      createdBy: d.created_by,
      activationUrl: d.activation_url,
      expirationTime: d.expiration_time,
      updatedAt: d.updated_at,
      updatedBy: d.updated_by,
    }));

export const unmarshalRegisteredModelAliasSchema: z.ZodType<RegisteredModelAlias> =
  z
    .object({
      alias_name: z.string().optional(),
      version_num: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      aliasName: d.alias_name,
      versionNum: d.version_num,
    }));

export const unmarshalRetrieveTokenResponseSchema: z.ZodType<RetrieveTokenResponse> =
  z
    .object({
      shareCredentialsVersion: z.number().optional(),
      bearerToken: z.string().optional(),
      endpoint: z.string().optional(),
      expirationTime: z.string().optional(),
    })
    .transform(d => ({
      shareCredentialsVersion: d.shareCredentialsVersion,
      bearerToken: d.bearerToken,
      endpoint: d.endpoint,
      expirationTime: d.expirationTime,
    }));

export const unmarshalShareSchema: z.ZodType<Share> = z
  .object({
    name: z.string().optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    id: d.id,
  }));

export const unmarshalShareInfoSchema: z.ZodType<ShareInfo> = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_root: z.string().optional(),
    objects: z.array(z.lazy(() => unmarshalSharedDataObjectSchema)).optional(),
    created_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z.string().optional(),
    updated_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z.string().optional(),
    storage_location: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    comment: d.comment,
    storageRoot: d.storage_root,
    objects: d.objects,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    storageLocation: d.storage_location,
  }));

export const unmarshalShareToPrivilegeAssignmentSchema: z.ZodType<ShareToPrivilegeAssignment> =
  z
    .object({
      share_name: z.string().optional(),
      privilege_assignments: z
        .array(z.lazy(() => unmarshalPrivilegeAssignmentSchema))
        .optional(),
    })
    .transform(d => ({
      shareName: d.share_name,
      privilegeAssignments: d.privilege_assignments,
    }));

export const unmarshalSharedDataObjectSchema: z.ZodType<SharedDataObject> = z
  .object({
    name: z.string().optional(),
    data_object_type: z.string().optional(),
    added_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    added_by: z.string().optional(),
    comment: z.string().optional(),
    shared_as: z.string().optional(),
    cdf_enabled: z.boolean().optional(),
    history_data_sharing_status: z.string().optional(),
    start_version: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    status: z.string().optional(),
    content: z.string().optional(),
    string_shared_as: z.string().optional(),
    partitions: z
      .array(z.lazy(() => unmarshalPartitionSpecification_PartitionSchema))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    dataObjectType: d.data_object_type,
    addedAt: d.added_at,
    addedBy: d.added_by,
    comment: d.comment,
    sharedAs: d.shared_as,
    cdfEnabled: d.cdf_enabled,
    historyDataSharingStatus: d.history_data_sharing_status,
    startVersion: d.start_version,
    status: d.status,
    content: d.content,
    stringSharedAs: d.string_shared_as,
    partitions: d.partitions,
  }));

export const unmarshalTableSchema: z.ZodType<Table> = z
  .object({
    name: z.string().optional(),
    schema: z.string().optional(),
    share: z.string().optional(),
    share_id: z.string().optional(),
    id: z.string().optional(),
    comment: z.string().optional(),
    tags: z.array(z.lazy(() => unmarshalTagKeyValueSchema)).optional(),
    materialized_table_name: z.string().optional(),
    materialization_namespace: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    schema: d.schema,
    share: d.share,
    shareId: d.share_id,
    id: d.id,
    comment: d.comment,
    tags: d.tags,
    materializedTableName: d.materialized_table_name,
    materializationNamespace: d.materialization_namespace,
  }));

export const unmarshalTableDependencySchema: z.ZodType<TableDependency> = z
  .object({
    schema_name: z.string().optional(),
    table_name: z.string().optional(),
  })
  .transform(d => ({
    schemaName: d.schema_name,
    tableName: d.table_name,
  }));

export const unmarshalTagKeyValueSchema: z.ZodType<TagKeyValue> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalUpdateSharePermissionsResponseSchema: z.ZodType<UpdateSharePermissionsResponse> =
  z
    .object({
      privilege_assignments: z
        .array(z.lazy(() => unmarshalPrivilegeAssignmentSchema))
        .optional(),
    })
    .transform(d => ({
      privilegeAssignments: d.privilege_assignments,
    }));

export const unmarshalVolumeSchema: z.ZodType<Volume> = z
  .object({
    name: z.string().optional(),
    id: z.string().optional(),
    schema: z.string().optional(),
    share: z.string().optional(),
    share_id: z.string().optional(),
    comment: z.string().optional(),
    tags: z.array(z.lazy(() => unmarshalTagKeyValueSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    id: d.id,
    schema: d.schema,
    share: d.share,
    shareId: d.share_id,
    comment: d.comment,
    tags: d.tags,
  }));

export const marshalCreateProviderRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    authenticationType: z.string().optional(),
    recipientProfileStr: z.string().optional(),
    comment: z.string().optional(),
    owner: z.string().optional(),
    recipientProfile: z.lazy(() => marshalRecipientProfileSchema).optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    cloud: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    dataProviderGlobalMetastoreId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    authentication_type: d.authenticationType,
    recipient_profile_str: d.recipientProfileStr,
    comment: d.comment,
    owner: d.owner,
    recipient_profile: d.recipientProfile,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    cloud: d.cloud,
    region: d.region,
    metastore_id: d.metastoreId,
    data_provider_global_metastore_id: d.dataProviderGlobalMetastoreId,
  }));

export const marshalCreateRecipientRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    authenticationType: z.string().optional(),
    sharingCode: z.string().optional(),
    dataRecipientGlobalMetastoreId: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    ipAccessList: z.lazy(() => marshalIpAccessListSchema).optional(),
    propertiesKvpairs: z.lazy(() => marshalPropertiesKvPairsSchema).optional(),
    expirationTime: z.bigint().optional(),
    activationUrl: z.string().optional(),
    activated: z.boolean().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    tokens: z.array(z.lazy(() => marshalRecipientTokenInfoSchema)).optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    cloud: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    authentication_type: d.authenticationType,
    sharing_code: d.sharingCode,
    data_recipient_global_metastore_id: d.dataRecipientGlobalMetastoreId,
    owner: d.owner,
    comment: d.comment,
    ip_access_list: d.ipAccessList,
    properties_kvpairs: d.propertiesKvpairs,
    expiration_time: d.expirationTime,
    activation_url: d.activationUrl,
    activated: d.activated,
    created_at: d.createdAt,
    created_by: d.createdBy,
    tokens: d.tokens,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    cloud: d.cloud,
    region: d.region,
    metastore_id: d.metastoreId,
    id: d.id,
  }));

export const marshalCreateShareRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    objects: z.array(z.lazy(() => marshalSharedDataObjectSchema)).optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    storageLocation: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    comment: d.comment,
    storage_root: d.storageRoot,
    objects: d.objects,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    storage_location: d.storageLocation,
  }));

export const marshalFederationPolicySchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    policy: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('oidcPolicy'),
          oidcPolicy: z.lazy(() => marshalOidcFederationPolicySchema),
        }),
      ])
      .optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    comment: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    ...(d.policy?.$case === 'oidcPolicy' && {oidc_policy: d.policy.oidcPolicy}),
    create_time: d.createTime,
    comment: d.comment,
    update_time: d.updateTime,
    id: d.id,
  }));

export const marshalIpAccessListSchema: z.ZodType = z
  .object({
    allowedIpAddresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    allowed_ip_addresses: d.allowedIpAddresses,
  }));

export const marshalOidcFederationPolicySchema: z.ZodType = z
  .object({
    issuer: z.string().optional(),
    subjectClaim: z.string().optional(),
    subject: z.string().optional(),
    audiences: z.array(z.string()).optional(),
  })
  .transform(d => ({
    issuer: d.issuer,
    subject_claim: d.subjectClaim,
    subject: d.subject,
    audiences: d.audiences,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPartitionSpecification_PartitionSchema: z.ZodType = z
  .object({
    values: z
      .array(
        z.lazy(
          () => marshalPartitionSpecification_Partition_PartitionValueSchema
        )
      )
      .optional(),
  })
  .transform(d => ({
    values: d.values,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPartitionSpecification_Partition_PartitionValueSchema: z.ZodType =
  z
    .object({
      name: z.string().optional(),
      value: z.string().optional(),
      recipientPropertyKey: z.string().optional(),
      op: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      value: d.value,
      recipient_property_key: d.recipientPropertyKey,
      op: d.op,
    }));

export const marshalPermissionsChangeSchema: z.ZodType = z
  .object({
    principal: z.string().optional(),
    add: z.array(z.string()).optional(),
    remove: z.array(z.string()).optional(),
  })
  .transform(d => ({
    principal: d.principal,
    add: d.add,
    remove: d.remove,
  }));

export const marshalPropertiesKvPairsSchema: z.ZodType = z
  .object({
    properties: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    properties: d.properties,
  }));

export const marshalRecipientProfileSchema: z.ZodType = z
  .object({
    shareCredentialsVersion: z.number().optional(),
    endpoint: z.string().optional(),
    bearerToken: z.string().optional(),
  })
  .transform(d => ({
    share_credentials_version: d.shareCredentialsVersion,
    endpoint: d.endpoint,
    bearer_token: d.bearerToken,
  }));

export const marshalRecipientTokenInfoSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    activationUrl: z.string().optional(),
    expirationTime: z.bigint().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    created_at: d.createdAt,
    created_by: d.createdBy,
    activation_url: d.activationUrl,
    expiration_time: d.expirationTime,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
  }));

export const marshalRotateRecipientTokenRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    existingTokenExpireInSeconds: z.bigint().optional(),
  })
  .transform(d => ({
    name: d.name,
    existing_token_expire_in_seconds: d.existingTokenExpireInSeconds,
  }));

export const marshalSharedDataObjectSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    dataObjectType: z.string().optional(),
    addedAt: z.bigint().optional(),
    addedBy: z.string().optional(),
    comment: z.string().optional(),
    sharedAs: z.string().optional(),
    cdfEnabled: z.boolean().optional(),
    historyDataSharingStatus: z.string().optional(),
    startVersion: z.bigint().optional(),
    status: z.string().optional(),
    content: z.string().optional(),
    stringSharedAs: z.string().optional(),
    partitions: z
      .array(z.lazy(() => marshalPartitionSpecification_PartitionSchema))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    data_object_type: d.dataObjectType,
    added_at: d.addedAt,
    added_by: d.addedBy,
    comment: d.comment,
    shared_as: d.sharedAs,
    cdf_enabled: d.cdfEnabled,
    history_data_sharing_status: d.historyDataSharingStatus,
    start_version: d.startVersion,
    status: d.status,
    content: d.content,
    string_shared_as: d.stringSharedAs,
    partitions: d.partitions,
  }));

export const marshalUpdateProviderRequestSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    newName: z.string().optional(),
    name: z.string().optional(),
    authenticationType: z.string().optional(),
    recipientProfileStr: z.string().optional(),
    comment: z.string().optional(),
    owner: z.string().optional(),
    recipientProfile: z.lazy(() => marshalRecipientProfileSchema).optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    cloud: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    dataProviderGlobalMetastoreId: z.string().optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    new_name: d.newName,
    name: d.name,
    authentication_type: d.authenticationType,
    recipient_profile_str: d.recipientProfileStr,
    comment: d.comment,
    owner: d.owner,
    recipient_profile: d.recipientProfile,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    cloud: d.cloud,
    region: d.region,
    metastore_id: d.metastoreId,
    data_provider_global_metastore_id: d.dataProviderGlobalMetastoreId,
  }));

export const marshalUpdateRecipientRequestSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    newName: z.string().optional(),
    name: z.string().optional(),
    authenticationType: z.string().optional(),
    sharingCode: z.string().optional(),
    dataRecipientGlobalMetastoreId: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    ipAccessList: z.lazy(() => marshalIpAccessListSchema).optional(),
    propertiesKvpairs: z.lazy(() => marshalPropertiesKvPairsSchema).optional(),
    expirationTime: z.bigint().optional(),
    activationUrl: z.string().optional(),
    activated: z.boolean().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    tokens: z.array(z.lazy(() => marshalRecipientTokenInfoSchema)).optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    cloud: z.string().optional(),
    region: z.string().optional(),
    metastoreId: z.string().optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    new_name: d.newName,
    name: d.name,
    authentication_type: d.authenticationType,
    sharing_code: d.sharingCode,
    data_recipient_global_metastore_id: d.dataRecipientGlobalMetastoreId,
    owner: d.owner,
    comment: d.comment,
    ip_access_list: d.ipAccessList,
    properties_kvpairs: d.propertiesKvpairs,
    expiration_time: d.expirationTime,
    activation_url: d.activationUrl,
    activated: d.activated,
    created_at: d.createdAt,
    created_by: d.createdBy,
    tokens: d.tokens,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    cloud: d.cloud,
    region: d.region,
    metastore_id: d.metastoreId,
    id: d.id,
  }));

export const marshalUpdateSharePermissionsRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    omitPermissionsList: z.boolean().optional(),
    changes: z.array(z.lazy(() => marshalPermissionsChangeSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    omit_permissions_list: d.omitPermissionsList,
    changes: d.changes,
  }));

export const marshalUpdateShareRequestSchema: z.ZodType = z
  .object({
    nameArg: z.string().optional(),
    newName: z.string().optional(),
    updates: z
      .array(
        z.lazy(() => marshalUpdateShareRequest_SharedDataObjectUpdateSchema)
      )
      .optional(),
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageRoot: z.string().optional(),
    objects: z.array(z.lazy(() => marshalSharedDataObjectSchema)).optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    storageLocation: z.string().optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    new_name: d.newName,
    updates: d.updates,
    name: d.name,
    owner: d.owner,
    comment: d.comment,
    storage_root: d.storageRoot,
    objects: d.objects,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    storage_location: d.storageLocation,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateShareRequest_SharedDataObjectUpdateSchema: z.ZodType =
  z
    .object({
      action: z.string().optional(),
      dataObject: z.lazy(() => marshalSharedDataObjectSchema).optional(),
    })
    .transform(d => ({
      action: d.action,
      data_object: d.dataObject,
    }));
