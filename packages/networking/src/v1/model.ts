// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/**
 * The target resources that are supported by Network Connectivity Config.
 * Note: some egress types can support general types that are not defined in EgressResourceType.
 * E.g.: Azure private endpoint supports private link enabled Azure services.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressResourceType = {
  EGRESS_RESOURCE_TYPE_UNSPECIFIED: 'EGRESS_RESOURCE_TYPE_UNSPECIFIED',
  AZURE_BLOB_STORAGE: 'AZURE_BLOB_STORAGE',
} as const;
export type EgressResourceType =
  | (typeof EgressResourceType)[keyof typeof EgressResourceType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointState = {
  /** The endpoint is pending approval. */
  PENDING: 'PENDING',
  /** The endpoint has been approved and is ready for use. */
  APPROVED: 'APPROVED',
  /** The endpoint encountered some issues during setup. */
  FAILED: 'FAILED',
  /** The endpoint was once established but later disconnected. This endpoint doesn't provide connectivity. */
  DISCONNECTED: 'DISCONNECTED',
} as const;
export type EndpointState =
  | (typeof EndpointState)[keyof typeof EndpointState]
  | (string & {});

/**
 * Type of IP access list. Valid values are as follows and are case-sensitive:
 *
 * * `ALLOW`: An allow list. Include this IP or range.
 * * `BLOCK`: A block list. Exclude this IP or range. IP addresses in the block list are excluded even if they are included in an allow list.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IpAccessListType = {
  ALLOW: 'ALLOW',
  /** Blocks the associated CIDRs. */
  BLOCK: 'BLOCK',
} as const;
export type IpAccessListType =
  | (typeof IpAccessListType)[keyof typeof IpAccessListType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PrivateAccessLevel = {
  /** Only specifically listed endpoints can access my workspace */
  ENDPOINT: 'ENDPOINT',
  /** Only endpoints in the same account can access my workspace */
  ACCOUNT: 'ACCOUNT',
} as const;
export type PrivateAccessLevel =
  | (typeof PrivateAccessLevel)[keyof typeof PrivateAccessLevel]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const VpcEndpointUseCase = {
  WORKSPACE_ACCESS: 'WORKSPACE_ACCESS',
  DATAPLANE_RELAY_ACCESS: 'DATAPLANE_RELAY_ACCESS',
  /** General access, replaces WORKSPACE_ACCESS in customer-facing API. */
  GENERAL_ACCESS: 'GENERAL_ACCESS',
} as const;
export type VpcEndpointUseCase =
  | (typeof VpcEndpointUseCase)[keyof typeof VpcEndpointUseCase]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const VpcStatus = {
  VALID: 'VALID',
  BROKEN: 'BROKEN',
  UNATTACHED: 'UNATTACHED',
  /** Some optional tests are failing for this Vpc, see NetworkWarning for more information */
  WARNED: 'WARNED',
} as const;
export type VpcStatus =
  | (typeof VpcStatus)[keyof typeof VpcStatus]
  | (string & {});

/**
 * Type of IP access list. Valid values are as follows and are case-sensitive:
 *
 * * `ALLOW`: An allow list. Include this IP or range.
 * * `BLOCK`: A block list. Exclude this IP or range. IP addresses in the block list are excluded even if they are included in an allow list.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AccountIpAccessListType_IpAccessListType = {
  /** Allows the associated CIDRs. */
  ALLOW: 'ALLOW',
  /** Blocks the associated CIDRs. */
  BLOCK: 'BLOCK',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AccountIpAccessListType_IpAccessListType =
  | (typeof AccountIpAccessListType_IpAccessListType)[keyof typeof AccountIpAccessListType_IpAccessListType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType =
  {
    INTERNET_DESTINATION_TYPE_UNSPECIFIED:
      'INTERNET_DESTINATION_TYPE_UNSPECIFIED',
    /** This is defined as `FQDN` in settings-policy/api/proto/messages.proto. Translation is done in accounts-lake-net-manager/src/util/NetworkPolicySettingUtil.scala. */
    DNS_NAME: 'DNS_NAME',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType =

    | (typeof EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType]
    | (string & {});

/** The values should match the list of workloads used in networkconfig.proto */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter =
  {
    DRY_RUN_MODE_PRODUCT_FILTER_UNSPECIFIED:
      'DRY_RUN_MODE_PRODUCT_FILTER_UNSPECIFIED',
    /** SQL Warehouse product */
    DBSQL: 'DBSQL',
    /** Machine Learning serving product */
    ML_SERVING: 'ML_SERVING',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter =

    | (typeof EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode =
  {
    ENFORCEMENT_MODE_UNSPECIFIED: 'ENFORCEMENT_MODE_UNSPECIFIED',
    /** Blocks traffic that violates network policy. This is the default mode. */
    ENFORCED: 'ENFORCED',
    /** Logs violations without blocking traffic. Useful for testing policies before enforcement. */
    DRY_RUN: 'DRY_RUN',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode =

    | (typeof EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode]
    | (string & {});

/**
 * At which level can <Databricks> and <Databricks> managed compute access Internet.
 * FULL_ACCESS: <Databricks> can access Internet. No blocking rules will apply.
 * RESTRICTED_ACCESS: <Databricks> can only access explicitly allowed internet and storage destinations,
 * as well as UC connections and external locations.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode = {
  RESTRICTION_MODE_UNSPECIFIED: 'RESTRICTION_MODE_UNSPECIFIED',
  FULL_ACCESS: 'FULL_ACCESS',
  RESTRICTED_ACCESS: 'RESTRICTED_ACCESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode =
  | (typeof EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType =
  {
    STORAGE_DESTINATION_TYPE_UNSPECIFIED:
      'STORAGE_DESTINATION_TYPE_UNSPECIFIED',
    /**
     * AWS_S3 can be used both for direct AWS S3 access and for cross-cloud access from Azure and GCP
     * When used in an Azure/GCP context, this indicates cross-cloud access from Azure/GCP to the specified S3 bucket
     */
    AWS_S3: 'AWS_S3',
    AZURE_STORAGE: 'AZURE_STORAGE',
    GOOGLE_CLOUD_STORAGE: 'GOOGLE_CLOUD_STORAGE',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType =

    | (typeof EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType)[keyof typeof EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointUseCase_EndpointUseCase = {
  /** service-direct frontend private link connectivity. */
  SERVICE_DIRECT: 'SERVICE_DIRECT',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EndpointUseCase_EndpointUseCase =
  | (typeof EndpointUseCase_EndpointUseCase)[keyof typeof EndpointUseCase_EndpointUseCase]
  | (string & {});

/**
 * Qualifies the breadth of API access permitted by an ingress network policy rule.
 * API_SCOPE_QUALIFIER_READ narrows matching to read-only variants of the listed scopes;
 * API_SCOPE_QUALIFIER_ALL matches any scope. When unset, scopes match exactly as listed.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_ApiScopeQualifier = {
  /** Narrows matching to read-only variants of the listed scopes (e.g. GET/HEAD requests). */
  API_SCOPE_QUALIFIER_READ: 'API_SCOPE_QUALIFIER_READ',
  /** Matches any scope regardless of access level. */
  API_SCOPE_QUALIFIER_ALL: 'API_SCOPE_QUALIFIER_ALL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_ApiScopeQualifier =
  | (typeof IngressNetworkPolicy_ApiScopeQualifier)[keyof typeof IngressNetworkPolicy_ApiScopeQualifier]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_Authentication_IdentityType = {
  IDENTITY_TYPE_UNSPECIFIED: 'IDENTITY_TYPE_UNSPECIFIED',
  IDENTITY_TYPE_ALL_USERS: 'IDENTITY_TYPE_ALL_USERS',
  IDENTITY_TYPE_ALL_SERVICE_PRINCIPALS: 'IDENTITY_TYPE_ALL_SERVICE_PRINCIPALS',
  IDENTITY_TYPE_SELECTED_IDENTITIES: 'IDENTITY_TYPE_SELECTED_IDENTITIES',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_Authentication_IdentityType =
  | (typeof IngressNetworkPolicy_Authentication_IdentityType)[keyof typeof IngressNetworkPolicy_Authentication_IdentityType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_AuthenticationIdentity_PrincipalType = {
  PRINCIPAL_TYPE_UNSPECIFIED: 'PRINCIPAL_TYPE_UNSPECIFIED',
  PRINCIPAL_TYPE_USER: 'PRINCIPAL_TYPE_USER',
  PRINCIPAL_TYPE_SERVICE_PRINCIPAL: 'PRINCIPAL_TYPE_SERVICE_PRINCIPAL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_AuthenticationIdentity_PrincipalType =
  | (typeof IngressNetworkPolicy_AuthenticationIdentity_PrincipalType)[keyof typeof IngressNetworkPolicy_AuthenticationIdentity_PrincipalType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode = {
  FULL_ACCESS: 'FULL_ACCESS',
  RESTRICTED_ACCESS: 'RESTRICTED_ACCESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode =
  | (typeof IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode)[keyof typeof IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode]
  | (string & {});

/**
 * The restriction mode for private access. In ALLOW_ALL_REGISTERED_ENDPOINTS mode,
 * requests arriving through any endpoint registered to the account are allowed, and
 * deny rules and allow rules cannot be set. In RESTRICTED_ACCESS mode, access is
 * restricted based on deny rules and allow rules; requests that do not match any
 * allow rule are denied.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_PrivateAccess_RestrictionMode = {
  /**
   * Allows requests arriving through any endpoint registered to the account.
   * Deny rules and allow rules cannot be set in this mode.
   */
  ALLOW_ALL_REGISTERED_ENDPOINTS: 'ALLOW_ALL_REGISTERED_ENDPOINTS',
  /**
   * Restricts access based on deny rules and allow rules. Requests that do not
   * match any allow rule are denied.
   */
  RESTRICTED_ACCESS: 'RESTRICTED_ACCESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_PrivateAccess_RestrictionMode =
  | (typeof IngressNetworkPolicy_PrivateAccess_RestrictionMode)[keyof typeof IngressNetworkPolicy_PrivateAccess_RestrictionMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const IngressNetworkPolicy_PublicAccess_RestrictionMode = {
  FULL_ACCESS: 'FULL_ACCESS',
  RESTRICTED_ACCESS: 'RESTRICTED_ACCESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type IngressNetworkPolicy_PublicAccess_RestrictionMode =
  | (typeof IngressNetworkPolicy_PublicAccess_RestrictionMode)[keyof typeof IngressNetworkPolicy_PublicAccess_RestrictionMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const NccPrivateEndpointRule_PrivateLinkConnectionState = {
  PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED:
    'PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED',
  /** The endpoint has been approved and is ready to use in your serverless compute resources. */
  ESTABLISHED: 'ESTABLISHED',
  /** Connection was rejected by the private link resource owner. */
  REJECTED: 'REJECTED',
  /**
   * Connection was removed by the private link resource owner, the private endpoint becomes informative and should
   * be deleted for clean-up.
   */
  DISCONNECTED: 'DISCONNECTED',
  /** If the endpoint was created but not approved in 14 days, it will be EXPIRED. */
  EXPIRED: 'EXPIRED',
  /** The endpoint has been created and pending approval. */
  PENDING: 'PENDING',
  /** The endpoint creation is in progress. */
  CREATING: 'CREATING',
  /** The endpoint creation failed. */
  CREATE_FAILED: 'CREATE_FAILED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type NccPrivateEndpointRule_PrivateLinkConnectionState =
  | (typeof NccPrivateEndpointRule_PrivateLinkConnectionState)[keyof typeof NccPrivateEndpointRule_PrivateLinkConnectionState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState =
  {
    PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED:
      'PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED',
    /** The endpoint has been approved and is ready to use in your serverless compute resources. */
    ESTABLISHED: 'ESTABLISHED',
    /** Connection was rejected by the private link resource owner. */
    REJECTED: 'REJECTED',
    /**
     * Connection was removed by the private link resource owner, the private endpoint becomes informative and should
     * be deleted for clean-up.
     */
    DISCONNECTED: 'DISCONNECTED',
    /** If the endpoint is created but not approved in 14 days, it is EXPIRED. */
    EXPIRED: 'EXPIRED',
    /** The endpoint has been created and pending approval. */
    PENDING: 'PENDING',
    /** The endpoint creation is in progress. */
    CREATING: 'CREATING',
    /** The endpoint creation failed. */
    CREATE_FAILED: 'CREATE_FAILED',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState =

    | (typeof NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState)[keyof typeof NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState]
    | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState =
  {
    PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED:
      'PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED',
    /** The endpoint has been created and pending approval. */
    INIT: 'INIT',
    /** The endpoint has been approved and is ready to use in your serverless compute resources. */
    ESTABLISHED: 'ESTABLISHED',
    /** Connection was rejected by the private link resource owner. */
    REJECTED: 'REJECTED',
    /**
     * Connection was removed by the private link resource owner, the private endpoint becomes informative and should
     * be deleted for clean-up.
     */
    DISCONNECTED: 'DISCONNECTED',
    /** If the endpoint was created but not approved in 14 days, it will be EXPIRED. */
    EXPIRED: 'EXPIRED',
    /** The endpoint has been created and pending approval. */
    PENDING: 'PENDING',
    /** The endpoint creation is in progress. */
    CREATING: 'CREATING',
    /** The endpoint creation failed. */
    CREATE_FAILED: 'CREATE_FAILED',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState =

    | (typeof NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState)[keyof typeof NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState]
    | (string & {});

/** Definition of an IP Access list */
export interface AccountIpAccessList {
  /** Universally unique identifier (UUID) of the IP access list. */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  ipAddresses?: string[] | undefined;
  /** Total number of IP or CIDR values. */
  addressCount?: number | undefined;
  listType?: AccountIpAccessListType_IpAccessListType | undefined;
  /** Creation timestamp in milliseconds. */
  createdAt?: bigint | undefined;
  /** The ID of the user that created this list. */
  createdBy?: bigint | undefined;
  /** Update timestamp in milliseconds. */
  updatedAt?: bigint | undefined;
  /** The ID of the user that last updated this list. */
  updatedBy?: bigint | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AccountIpAccessListType {}

export interface AccountNetworkPolicy {
  /** The unique identifier for the network policy. */
  networkPolicyId?: string | undefined;
  /** The associated account ID for this Network Policy object. */
  accountId?: string | undefined;
  /** The network policies applying for egress traffic. */
  egress?: EgressNetworkPolicy | undefined;
  /** The network policies applying for ingress traffic. */
  ingress?: IngressNetworkPolicy | undefined;
  /**
   * The ingress policy for dry run mode. Dry run will always run even if the request
   * is allowed by the ingress policy. When this field is set, the policy will be evaluated
   * and emit logs only without blocking requests.
   */
  ingressDryRun?: IngressNetworkPolicy | undefined;
}

export interface AzurePrivateEndpointInfo {
  /** The name of the Private Endpoint in the Azure subscription. */
  privateEndpointName?: string | undefined;
  /**
   * The GUID of the Private Endpoint resource in the Azure subscription.
   * This is assigned by Azure when the user sets up the Private Endpoint.
   */
  privateEndpointResourceGuid?: string | undefined;
  /** The full resource ID of the Private Endpoint. */
  privateEndpointResourceId?: string | undefined;
  /** The resource ID of the Databricks Private Link Service that this Private Endpoint connects to. */
  privateLinkServiceId?: string | undefined;
}

/** Details required to configure a block list or allow list. */
export interface CreateAccountIpAccessListRequest {
  accountId?: string | undefined;
  label?: string | undefined;
  listType?: AccountIpAccessListType_IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
}

/** An IP access list was successfully created. */
export interface CreateAccountIpAccessListResponse {
  ipAccessList?: AccountIpAccessList | undefined;
}

export interface CreateEndpointRequest {
  /**
   * The parent resource name of the account under which the endpoint is created.
   * Format: `accounts/{account_id}`.
   */
  parent?: string | undefined;
  endpoint?: Endpoint | undefined;
}

/** Details required to configure a block list or allow list. */
export interface CreateIpAccessListRequest {
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
}

/** An IP access list was successfully created. */
export interface CreateIpAccessListResponse {
  ipAccessList?: IpAccessList | undefined;
}

/** Properties of the new private endpoint rule. */
export interface CreateNccPrivateEndpointRuleRequest {
  /** Your Network Connectivity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  privateEndpointRule?: CreatePrivateEndpointRule | undefined;
}

/** Properties of the new network connectivity configuration. */
export interface CreateNetworkConnectivityConfigRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  networkConnectivityConfig?:
    | CreateNetworkConnectivityConfiguration
    | undefined;
}

/** Properties of the new network connectivity configuration. */
export interface CreateNetworkConnectivityConfiguration {
  /** <Databricks> network connectivity configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /**
   * The name of the network connectivity configuration. The name can contain alphanumeric characters, hyphens,
   * and underscores. The length must be between 3 and 30 characters. The name must match the regular
   * expression ^[0-9a-zA-Z-_]{3,30}$
   */
  name?: string | undefined;
  /**
   * The region for the network connectivity configuration.
   * Only workspaces in the same region can be attached to the network connectivity configuration.
   */
  region?: string | undefined;
  /** The network connectivity rules that apply to network traffic from your serverless compute resources. */
  egressConfig?:
    | CustomerFacingNetworkConnectivityConfigEgressConfig
    | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
}

export interface CreateNetworkPolicyRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Network policy configuration details. */
  networkPolicy?: AccountNetworkPolicy | undefined;
}

export interface CreateNetworkRequest {
  accountId?: string | undefined;
  /** The human-readable name of the network configuration. */
  networkName?: string | undefined;
  /** The ID of the VPC associated with this network configuration. VPC IDs can be used in multiple networks. */
  vpcId?: string | undefined;
  /** IDs of at least two subnets associated with this network. Subnet IDs **cannot** be used in multiple network configurations. */
  subnetIds?: string[] | undefined;
  /** IDs of one to five security groups associated with this network. Security group IDs **cannot** be used in multiple network configurations. */
  securityGroupIds?: string[] | undefined;
  vpcEndpoints?: NetworkVpcEndpoints | undefined;
  gcpNetworkInfo?: GcpNetworkInfo | undefined;
}

export interface CreatePrivateAccessSettingsRequest {
  accountId?: string | undefined;
  /** The human-readable name of the private access settings object. */
  privateAccessSettingsName?: string | undefined;
  /** The AWS region for workspaces attached to this private access settings object. */
  region?: string | undefined;
  /** Determines if the workspace can be accessed over public internet. For fully private workspaces, you can optionally specify false, but only if you implement both the front-end and the back-end PrivateLink connections. Otherwise, specify true, which means that public access is enabled. */
  publicAccessEnabled?: boolean | undefined;
  /**
   * The private access level controls which VPC endpoints can connect to the UI or API of any workspace that attaches this private access settings object.
   * `ACCOUNT` level access (the default) allows only VPC endpoints that are registered in your <Databricks> account connect to your workspace.
   * `ENDPOINT` level access allows only specified VPC endpoints connect to your workspace. For details, see allowed_vpc_endpoint_ids.
   */
  privateAccessLevel?: PrivateAccessLevel | undefined;
  /**
   * An array of Databricks VPC endpoint IDs. This is the <Databricks> ID returned when registering the VPC endpoint configuration in your <Databricks> account. This is not the ID of the VPC endpoint in AWS.
   * Only used when private_access_level is set to ENDPOINT. This is an allow list of VPC endpoints registered in your <Databricks> account that can connect to your workspace over AWS PrivateLink.
   * Note: If hybrid access to your workspace is enabled by setting public_access_enabled to true, this control only works for PrivateLink connections. To control how your workspace is accessed via public internet, see IP access lists.
   */
  allowedVpcEndpointIds?: string[] | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that you must approve the endpoint in Azure portal after initialization.
 */
export interface CreatePrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the Cloud console
   * before they take effect.
   * The possible values are:
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint was created but not approved in 14 days, it will be EXPIRED.
   * - CREATING: The endpoint creation is in progress. Once successfully created, the state will transition to PENDING.
   * - CREATE_FAILED: The endpoint creation failed. You can check the error_message field for more details.
   */
  connectionState?:
    | NccPrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /**
   * Only used by private endpoints to customer-managed private endpoint services.
   *
   * Domain names of target private link service.
   * When updating this field, the full list of target domain_names must be specified.
   */
  domainNames?: string[] | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  errorMessage?: string | undefined;
  /** The Azure resource ID of the target resource. */
  resourceId?: string | undefined;
  /**
   * Not used by customer-managed private endpoint services.
   *
   * The sub-resource type (group ID) of the target resource.
   * Note that to connect to workspace root storage (root DBFS), you need two endpoints, one for blob and one for dfs.
   */
  groupId?: string | undefined;
  /** The name of the Azure private endpoint resource. */
  endpointName?: string | undefined;
  /** <Databricks> account ID. You can find your account ID from the Accounts Console. */
  accountId?: string | undefined;
  /** The full target AWS endpoint service name that connects to the destination resources of the private endpoint. */
  endpointService?: string | undefined;
  /**
   * Only used by private endpoints towards AWS S3 service.
   *
   * The globally unique S3 bucket names that will be accessed via the VPC endpoint.
   * The bucket names must be in the same region as the NCC/endpoint service.
   * When updating this field, we perform full update on this field. Please ensure a full list of desired
   * resource_names is provided.
   */
  resourceNames?: string[] | undefined;
  /** The AWS VPC endpoint ID. You can use this ID to identify the VPC endpoint created by <Databricks>. */
  vpcEndpointId?: string | undefined;
  /**
   * Update this field to activate/deactivate this private endpoint to allow egress access from
   * serverless compute resources. Only honored for first-party services on each cloud (e.g. AWS S3).
   */
  enabled?: boolean | undefined;
  endpoint?: {$case: 'gcpEndpoint'; gcpEndpoint: GcpEndpoint} | undefined;
}

export interface CreateVpcEndpointRequest {
  accountId?: string | undefined;
  /** The human-readable name of the storage configuration. */
  vpcEndpointName?: string | undefined;
  /** The region in which this VPC endpoint object exists. */
  region?: string | undefined;
  /** The ID of the VPC endpoint object in AWS. */
  awsVpcEndpointId?: string | undefined;
  vpcEndpointInfo?:
    | {
        $case: 'gcpVpcEndpointInfo';
        /** The cloud info of this vpc endpoint. */
        gcpVpcEndpointInfo: GcpVpcEndpointInfo;
      }
    | undefined;
}

export interface CustomerFacingNetworkConnectivityConfigEgressConfig {
  /**
   * The network connectivity rules that are applied by default without resource specific configurations.
   * You can find the stable network information of your serverless compute resources here.
   */
  defaultRules?: NetworkConnectivityConfigEgressConfig_DefaultRule | undefined;
  /** The network connectivity rules that configured for each destinations. These rules override default rules. */
  targetRules?:
    | CustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRule
    | undefined;
}

/** Target rule controls the egress rules that are dedicated to specific resources. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRule {
  azurePrivateEndpointRules?:
    | NetworkConnectivityConfigAzurePrivateEndpointRule[]
    | undefined;
  /** AWS private endpoint rule controls the AWS private endpoint based egress rules. */
  awsPrivateEndpointRules?:
    | NetworkConnectivityConfigAwsPrivateEndpointRule[]
    | undefined;
}

export interface DeleteAccountIpAccessListRequest {
  accountId?: string | undefined;
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
}

/** The IP access list was successfully deleted. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteAccountIpAccessListResponse {}

export interface DeleteEndpointRequest {
  name?: string | undefined;
}

export interface DeleteIpAccessListRequest {
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
}

/** The IP access list was successfully deleted. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteIpAccessListResponse {}

/**
 * Initiates deleting a private endpoint rule. If the connection state is PENDING or EXPIRED, the private endpoint is
 * immediately deleted. Otherwise, the private endpoint is deactivated and will be deleted after one day of
 * deactivation. When a private endpoint is deactivated, the deactivated field is set to true and the private endpoint
 * is not available to your serverless compute resources.
 */
export interface DeleteNccPrivateEndpointRuleRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectvity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your private endpoint rule ID. */
  privateEndpointRuleId?: string | undefined;
}

export interface DeleteNetworkConnectivityConfigRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectivity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
}

export interface DeleteNetworkPolicyRequest {
  /** The unique identifier of the network policy to delete. */
  networkPolicyId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
}

export interface DeleteNetworkRequest {
  /** Databricks Account API network configuration ID. */
  networkId?: string | undefined;
  accountId?: string | undefined;
}

export interface DeletePrivateAccessSettingsRequest {
  privateAccessSettingsId?: string | undefined;
  accountId?: string | undefined;
}

export interface DeleteVpcEndpointRequest {
  vpcEndpointId?: string | undefined;
  accountId?: string | undefined;
}

/** The network policies applying for egress traffic. */
export interface EgressNetworkPolicy {
  /** The access policy enforced for egress traffic to the internet. */
  networkAccess?: EgressNetworkPolicy_NetworkAccessPolicy | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy {
  /** The restriction mode that controls how serverless workloads can access the internet. */
  restrictionMode?:
    | EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode
    | undefined;
  /** List of internet destinations that serverless workloads are allowed to access when in RESTRICTED_ACCESS mode. */
  allowedInternetDestinations?:
    | EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination[]
    | undefined;
  /** List of storage destinations that serverless workloads are allowed to access when in RESTRICTED_ACCESS mode. */
  allowedStorageDestinations?:
    | EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination[]
    | undefined;
  /** Optional. When policy_enforcement is not provided, we default to ENFORCE_MODE_ALL_SERVICES */
  policyEnforcement?:
    | EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement
    | undefined;
  /**
   * List of internet destinations that serverless workloads are blocked from accessing.
   * These destinations are enforced when restriction mode is RESTRICTED_ACCESS or DRY_RUN.
   * Currently supports DNS_NAME type only; IP_RANGE support is planned.
   */
  blockedInternetDestinations?:
    | EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination[]
    | undefined;
  /**
   * List of <Databricks> workspace destinations that serverless workloads are
   * allowed to access when in RESTRICTED_ACCESS mode.
   */
  allowedDatabricksDestinations?:
    | EgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestination[]
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestination {
  /** The workspace IDs to allow egress traffic to. */
  workspaceIds?: bigint[] | undefined;
}

/**
 * Users can specify accessible internet destinations when outbound access is restricted.
 * We only support DNS_NAME (FQDN format) destinations for the time being.
 * Going forward we may extend support to host names and IP addresses.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination {
  /** The internet destination to which access will be allowed. Format dependent on the destination type. */
  destination?: string | undefined;
  /** The type of internet destination. Currently only DNS_NAME is supported. */
  internetDestinationType?:
    | EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement {
  /**
   * The mode of policy enforcement. ENFORCED blocks traffic that violates policy,
   * while DRY_RUN only logs violations without blocking. When not specified,
   * defaults to ENFORCED.
   */
  enforcementMode?:
    | EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode
    | undefined;
  /**
   * When empty, it means dry run for all products.
   * When non-empty, it means dry run for specific products and for the other products, they will run in enforced mode.
   */
  dryRunModeProductFilter?:
    | EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter[]
    | undefined;
}

/** Users can specify accessible storage destinations. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination {
  bucketName?: string | undefined;
  region?: string | undefined;
  /** The type of storage destination. */
  storageDestinationType?:
    | EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType
    | undefined;
  /** The Azure storage account name. */
  azureStorageAccount?: string | undefined;
  /** The Azure storage service type (blob, dfs, etc.). */
  azureStorageService?: string | undefined;
}

/** Endpoint represents a cloud networking resource in a user's cloud account and binds it to the <Databricks> account. */
export interface Endpoint {
  /** The resource name of the endpoint, which uniquely identifies the endpoint. */
  name?: string | undefined;
  /** The unique identifier for this endpoint under the account. This field is a UUID generated by <Databricks>. */
  endpointId?: string | undefined;
  /** The Databricks Account in which the endpoint object exists. */
  accountId?: string | undefined;
  /**
   * The human-readable display name of this endpoint.
   * The input should conform to RFC-1034, which restricts to letters, numbers, and hyphens,
   * with the first character a letter, the last a letter or a number, and a 63 character maximum.
   */
  displayName?: string | undefined;
  /**
   * The use case that determines the type of network connectivity this endpoint provides.
   * This field is automatically determined based on the endpoint configuration and cloud-specific settings.
   */
  useCase?: EndpointUseCase_EndpointUseCase | undefined;
  /** The cloud provider region where this endpoint is located. */
  region?: string | undefined;
  /** The state of the endpoint. The endpoint can only be used if the state is `APPROVED`. */
  state?: EndpointState | undefined;
  /**
   * The cloud info of this endpoint.
   * (-- Azure is GA; AWS and GCP added for PLAT-165656 (Private Preview). --)
   */
  endpointInfo?:
    | {
        $case: 'azurePrivateEndpointInfo';
        /** Info for an Azure private endpoint. */
        azurePrivateEndpointInfo: AzurePrivateEndpointInfo;
      }
    | undefined;
  /** The timestamp when the endpoint was created. The timestamp is in RFC 3339 format in UTC timezone. */
  createTime?: Temporal.Instant | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EndpointUseCase {}

export interface GcpEndpoint {
  /** Output only. The URI of the created PSC endpoint. */
  pscEndpointUri?: string | undefined;
  /** Selects which target services this private endpoint reaches. */
  targetServices?:
    | {
        $case: 'serviceAttachment';
        /**
         * The full url of the target service attachment.
         * Example:
         * projects/my-gcp-project/regions/us-east4/serviceAttachments/my-service-attachment
         */
        serviceAttachment: string;
      }
    | undefined;
}

export interface GcpNetworkInfo {
  /** The GCP project ID for network resources. This project is where the VPC and subnet resides. */
  networkProjectId?: string | undefined;
  /** The customer-provided VPC ID. */
  vpcId?: string | undefined;
  /**
   * The customer-provided Subnet ID that will be available to Clusters in Workspaces using this
   * Network.
   */
  subnetId?: string | undefined;
  subnetRegion?: string | undefined;
  /**
   * Name of the secondary range within the subnet that will be used by GKE as Pod IP range.
   * This is BYO VPC specific. DB VPC uses network.getGcpManagedNetworkConfig.getGkeClusterPodIpRange
   */
  podIpRangeName?: string | undefined;
  /** Name of the secondary range within the subnet that will be used by GKE as Service IP range. */
  serviceIpRangeName?: string | undefined;
}

export interface GcpVpcEndpointInfo {
  pscConnectionId?: string | undefined;
  projectId?: string | undefined;
  pscEndpointName?: string | undefined;
  endpointRegion?: string | undefined;
  serviceAttachmentId?: string | undefined;
}

export interface GetAccountIpAccessListRequest {
  accountId?: string | undefined;
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
}

export interface GetAccountIpAccessListResponse {
  ipAccessList?: AccountIpAccessList | undefined;
}

export interface GetEndpointRequest {
  name?: string | undefined;
}

export interface GetIpAccessListRequest {
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
}

/** An IP access list was successfully returned. */
export interface GetIpAccessListResponse {
  ipAccessList?: IpAccessList | undefined;
}

export interface GetNccPrivateEndpointRuleRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectvity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your private endpoint rule ID. */
  privateEndpointRuleId?: string | undefined;
}

/** ***************************** Public facing RPC requests and responses *****************************\// */
export interface GetNetworkConnectivityConfigRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectivity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
}

export interface GetNetworkPolicyRequest {
  /** The unique identifier of the network policy to retrieve. */
  networkPolicyId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
}

export interface GetNetworkRequest {
  /** Databricks Account API network configuration ID. */
  networkId?: string | undefined;
  accountId?: string | undefined;
}

export interface GetPrivateAccessSettingsRequest {
  privateAccessSettingsId?: string | undefined;
  accountId?: string | undefined;
}

export interface GetVpcEndpointRequest {
  /** Databricks VPC endpoint ID. */
  vpcEndpointId?: string | undefined;
  accountId?: string | undefined;
}

export interface GetWorkspaceNetworkOptionRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: bigint | undefined;
}

/** The network policies applying for ingress traffic. */
export interface IngressNetworkPolicy {
  /**
   * The network policy restrictions for public access to the workspace.
   * Configures how public internet traffic is allowed or denied access.
   */
  publicAccess?: IngressNetworkPolicy_PublicAccess | undefined;
  /**
   * The network policy restrictions for private access.
   * Configures how requests arriving over private connectivity are governed.
   */
  privateAccess?: IngressNetworkPolicy_PrivateAccess | undefined;
  crossWorkspaceAccess?: IngressNetworkPolicy_CrossWorkspaceAccess | undefined;
}

/** Matches account-level Databricks API endpoints for an ingress network policy rule. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AccountApiDestination {
  /** The API scopes to match. Use "all-apis" to match any account-level API. */
  scopes?: string[] | undefined;
  /** Qualifies the breadth of API access for the listed scopes. See ApiScopeQualifier. */
  scopeQualifier?: IngressNetworkPolicy_ApiScopeQualifier | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AccountDatabricksOneDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

/** The account console UI destination. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AccountUiDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AppsRuntimeDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_Authentication {
  identityType?: IngressNetworkPolicy_Authentication_IdentityType | undefined;
  /** Valid only when IdentityType is IDENTITY_TYPE_SELECTED_IDENTITIES. */
  identities?: IngressNetworkPolicy_AuthenticationIdentity[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_AuthenticationIdentity {
  principalType?:
    | IngressNetworkPolicy_AuthenticationIdentity_PrincipalType
    | undefined;
  principalId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_CrossWorkspaceAccess {
  restrictionMode?:
    | IngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode
    | undefined;
  denyRules?: IngressNetworkPolicy_CrossWorkspaceIngressRule[] | undefined;
  allowRules?: IngressNetworkPolicy_CrossWorkspaceIngressRule[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_CrossWorkspaceIngressRule {
  origin?: IngressNetworkPolicy_CrossWorkspaceRequestOrigin | undefined;
  destination?: IngressNetworkPolicy_RequestDestination | undefined;
  authentication?: IngressNetworkPolicy_Authentication | undefined;
  /** The label for this ingress rule. */
  label?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_CrossWorkspaceRequestOrigin {
  source?:
    | {
        $case: 'allSourceWorkspaces';
        /** Matches all source workspaces. */
        allSourceWorkspaces: boolean;
      }
    | {
        $case: 'selectedWorkspaces';
        /** Specific source workspace IDs to match. */
        selectedWorkspaces: IngressNetworkPolicy_WorkspaceIdList;
      }
    | undefined;
}

/** A set of registered endpoints, identified by their endpoint IDs. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_Endpoints {
  /** The IDs of the registered endpoints. Must contain at least one endpoint ID. */
  endpointIds?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_IpRanges {
  /** We only support IPv4 and IPv4 CIDR notation for now. */
  ipRanges?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_LakebaseRuntimeDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

/**
 * Configures how requests arriving over private connectivity, such as
 * registered endpoints, are allowed or denied access.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PrivateAccess {
  /** The restriction mode for private access. */
  restrictionMode?:
    | IngressNetworkPolicy_PrivateAccess_RestrictionMode
    | undefined;
  /**
   * Deny rules are evaluated first. A request matching any deny rule is denied,
   * regardless of allow rules. Only applies when restriction_mode is RESTRICTED_ACCESS.
   */
  denyRules?: IngressNetworkPolicy_PrivateIngressRule[] | undefined;
  /**
   * Allow rules are evaluated after deny rules. A request matching any allow rule is
   * allowed; a request matching no rule is denied by default. Only applies when
   * restriction_mode is RESTRICTED_ACCESS.
   */
  allowRules?: IngressNetworkPolicy_PrivateIngressRule[] | undefined;
}

/**
 * An ingress rule is enforced when a request satisfies all
 * specified attributes — including request origin, destination, and authentication.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PrivateIngressRule {
  /**
   * The origin the request must match — the private connectivity the request arrives
   * through, for example a specific set of registered endpoints or any endpoint
   * registered to the account. See PrivateRequestOrigin.
   */
  origin?: IngressNetworkPolicy_PrivateRequestOrigin | undefined;
  /**
   * The destination the request must match — the resource being accessed, for example
   * the workspace UI, workspace APIs, or account-level APIs. See RequestDestination.
   */
  destination?: IngressNetworkPolicy_RequestDestination | undefined;
  /**
   * The authenticated identity the request must match. When unset, the rule matches
   * all users and service principals.
   * On the account-level network policy, scoping to specific identities is not
   * currently supported, so this field must be unset (the rule matches all users
   * and service principals).
   */
  authentication?: IngressNetworkPolicy_Authentication | undefined;
  /** The label for this ingress rule. */
  label?: string | undefined;
}

/**
 * The origin of a private access request, identified by the endpoint
 * through which the request arrives.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PrivateRequestOrigin {
  source?:
    | {
        $case: 'endpoints';
        /** Matches requests arriving through any of the specified registered endpoints. */
        endpoints: IngressNetworkPolicy_Endpoints;
      }
    | {
        $case: 'allRegisteredEndpoints';
        /**
         * Matches requests arriving through any endpoint registered to the account.
         * Must be set to true when specified.
         */
        allRegisteredEndpoints: boolean;
      }
    | {
        $case: 'azureWorkspacePrivateLink';
        /**
         * Matches requests arriving through the workspace's Azure Private Link (ui-api)
         * endpoints. Can only be used in deny rules of workspace-level network policies.
         * Must be set to true when specified.
         */
        azureWorkspacePrivateLink: boolean;
      }
    | {
        $case: 'allPrivateAccess';
        /**
         * Matches requests arriving over any private connectivity, including registered
         * endpoints and the workspace's Azure Private Link (ui-api) endpoints.
         * Can only be used in deny rules of workspace-level network policies.
         * Must be set to true when specified.
         */
        allPrivateAccess: boolean;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PublicAccess {
  restrictionMode?:
    | IngressNetworkPolicy_PublicAccess_RestrictionMode
    | undefined;
  denyRules?: IngressNetworkPolicy_PublicIngressRule[] | undefined;
  allowRules?: IngressNetworkPolicy_PublicIngressRule[] | undefined;
}

/**
 * An ingress rule is enforced when a request satisfies all
 * specified attributes — including request origin, destination, and authentication.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PublicIngressRule {
  origin?: IngressNetworkPolicy_PublicRequestOrigin | undefined;
  destination?: IngressNetworkPolicy_RequestDestination | undefined;
  authentication?: IngressNetworkPolicy_Authentication | undefined;
  /** The label for this ingress rule. */
  label?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_PublicRequestOrigin {
  source?:
    | {
        $case: 'allIpRanges';
        /** Matches all IPv4 and IPv6 ranges (both public and private). */
        allIpRanges: boolean;
      }
    | {
        $case: 'includedIpRanges';
        /** Will not allow IP ranges with private IPs. */
        includedIpRanges: IngressNetworkPolicy_IpRanges;
      }
    | {
        $case: 'excludedIpRanges';
        /** Excluded means: all public IP ranges except this one. */
        excludedIpRanges: IngressNetworkPolicy_IpRanges;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_RequestDestination {
  /**
   * When true, match all destinations, no other destination fields can be set.
   * When not set or false, at least one specific destination must be provided.
   */
  allDestinations?: boolean | undefined;
  workspaceUi?: IngressNetworkPolicy_WorkspaceUiDestination | undefined;
  workspaceApi?: IngressNetworkPolicy_WorkspaceApiDestination | undefined;
  appsRuntime?: IngressNetworkPolicy_AppsRuntimeDestination | undefined;
  lakebaseRuntime?: IngressNetworkPolicy_LakebaseRuntimeDestination | undefined;
  /**
   * Matches requests to the account console UI.
   * Can only be used in the account-level network policy.
   */
  accountUi?: IngressNetworkPolicy_AccountUiDestination | undefined;
  /**
   * Matches requests to account-level APIs.
   * Can only be used in the account-level network policy.
   */
  accountApi?: IngressNetworkPolicy_AccountApiDestination | undefined;
  /** Account DatabricksOne destination is not supported. */
  accountDatabricksOne?:
    | IngressNetworkPolicy_AccountDatabricksOneDestination
    | undefined;
}

/** Matches workspace-level Databricks API endpoints for an ingress network policy rule. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_WorkspaceApiDestination {
  scopes?: string[] | undefined;
  /** Qualifies the breadth of API access for the listed scopes. See ApiScopeQualifier. */
  scopeQualifier?: IngressNetworkPolicy_ApiScopeQualifier | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_WorkspaceIdList {
  workspaceIds?: bigint[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface IngressNetworkPolicy_WorkspaceUiDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

/** Definition of an IP Access list */
export interface IpAccessList {
  /** Universally unique identifier (UUID) of the IP access list. */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  ipAddresses?: string[] | undefined;
  /** Total number of IP or CIDR values. */
  addressCount?: number | undefined;
  listType?: IpAccessListType | undefined;
  /** Creation timestamp in milliseconds. */
  createdAt?: bigint | undefined;
  /** User ID of the user who created this list. */
  createdBy?: bigint | undefined;
  /** Update timestamp in milliseconds. */
  updatedAt?: bigint | undefined;
  /** User ID of the user who updated this list. */
  updatedBy?: bigint | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

export interface ListAccountIpAccessListsRequest {
  accountId?: string | undefined;
}

/** IP access lists were successfully returned. */
export interface ListAccountIpAccessListsResponse {
  ipAccessLists?: AccountIpAccessList[] | undefined;
}

export interface ListEndpointsRequest {
  /**
   * The parent resource name of the account to list endpoints for.
   * Format: `accounts/{account_id}`.
   */
  parent?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListEndpointsResponse {
  items?: Endpoint[] | undefined;
  nextPageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListIpAccessLists {}

/** IP access lists were successfully returned. */
export interface ListIpAccessListsResponse {
  ipAccessLists?: IpAccessList[] | undefined;
}

/** Gets an array of private endpoint rules. */
export interface ListNccPrivateEndpointRulesRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your Network Connectvity Configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

/** The private endpoint rule list was successfully retrieved. */
export interface ListNccPrivateEndpointRulesResponse {
  items?: NccPrivateEndpointRule[] | undefined;
  /** A token that can be used to get the next page of results. If null, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface ListNetworkConnectivityConfigsRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

/** The network connectivity configuration list was successfully retrieved. */
export interface ListNetworkConnectivityConfigsResponse {
  items?: NetworkConnectivityConfig[] | undefined;
  /** A token that can be used to get the next page of results. If null, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface ListNetworkPoliciesRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListNetworkPoliciesResponse {
  /** List of network policies. */
  items?: AccountNetworkPolicy[] | undefined;
  /** A token that can be used to get the next page of results. If null, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface ListNetworkRequest {
  accountId?: string | undefined;
}

export interface ListNetworkResponse {
  networks?: Network[] | undefined;
}

export interface ListPrivateAccessSettingsRequest {
  accountId?: string | undefined;
}

export interface ListPrivateAccessSettingsResponse {
  privateAccessSettings?: PrivateAccessSettings[] | undefined;
}

export interface ListVpcEndpointRequest {
  accountId?: string | undefined;
}

export interface ListVpcEndpointResponse {
  vpcEndpoints?: VpcEndpoint[] | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that you must approve the endpoint in Azure portal after initialization.
 */
export interface NccPrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the Cloud console
   * before they take effect.
   * The possible values are:
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint was created but not approved in 14 days, it will be EXPIRED.
   * - CREATING: The endpoint creation is in progress. Once successfully created, the state will transition to PENDING.
   * - CREATE_FAILED: The endpoint creation failed. You can check the error_message field for more details.
   */
  connectionState?:
    | NccPrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /**
   * Only used by private endpoints to customer-managed private endpoint services.
   *
   * Domain names of target private link service.
   * When updating this field, the full list of target domain_names must be specified.
   */
  domainNames?: string[] | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  errorMessage?: string | undefined;
  /** The Azure resource ID of the target resource. */
  resourceId?: string | undefined;
  /**
   * Not used by customer-managed private endpoint services.
   *
   * The sub-resource type (group ID) of the target resource.
   * Note that to connect to workspace root storage (root DBFS), you need two endpoints, one for blob and one for dfs.
   */
  groupId?: string | undefined;
  /** The name of the Azure private endpoint resource. */
  endpointName?: string | undefined;
  /** <Databricks> account ID. You can find your account ID from the Accounts Console. */
  accountId?: string | undefined;
  /** The full target AWS endpoint service name that connects to the destination resources of the private endpoint. */
  endpointService?: string | undefined;
  /**
   * Only used by private endpoints towards AWS S3 service.
   *
   * The globally unique S3 bucket names that will be accessed via the VPC endpoint.
   * The bucket names must be in the same region as the NCC/endpoint service.
   * When updating this field, we perform full update on this field. Please ensure a full list of desired
   * resource_names is provided.
   */
  resourceNames?: string[] | undefined;
  /** The AWS VPC endpoint ID. You can use this ID to identify the VPC endpoint created by <Databricks>. */
  vpcEndpointId?: string | undefined;
  /**
   * Update this field to activate/deactivate this private endpoint to allow egress access from
   * serverless compute resources. Only honored for first-party services on each cloud (e.g. AWS S3).
   */
  enabled?: boolean | undefined;
  endpoint?: {$case: 'gcpEndpoint'; gcpEndpoint: GcpEndpoint} | undefined;
}

export interface Network {
  /** The <Databricks> network configuration ID. */
  networkId?: string | undefined;
  /** The <Databricks> account ID associated with this network configuration. */
  accountId?: string | undefined;
  /** Workspace ID associated with this network configuration. */
  workspaceId?: bigint | undefined;
  /** The ID of the VPC associated with this network configuration. VPC IDs can be used in multiple networks. */
  vpcId?: string | undefined;
  /** IDs of at least two subnets associated with this network. Subnet IDs **cannot** be used in multiple network configurations. */
  subnetIds?: string[] | undefined;
  /** IDs of one to five security groups associated with this network. Security group IDs **cannot** be used in multiple network configurations. */
  securityGroupIds?: string[] | undefined;
  vpcStatus?: VpcStatus | undefined;
  /** Array of error messages about the network configuration. */
  errorMessages?: NetworkHealth[] | undefined;
  /** The human-readable name of the network configuration. */
  networkName?: string | undefined;
  /** Time in epoch milliseconds when the network was created. */
  creationTime?: bigint | undefined;
  /** Array of warning messages about the network configuration. */
  warningMessages?: NetworkWarning[] | undefined;
  vpcEndpoints?: NetworkVpcEndpoints | undefined;
  networkInfo?:
    | {$case: 'gcpNetworkInfo'; gcpNetworkInfo: GcpNetworkInfo}
    | undefined;
}

/** Properties of the new network connectivity configuration. */
export interface NetworkConnectivityConfig {
  /** <Databricks> network connectivity configuration ID. */
  networkConnectivityConfigId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /**
   * The name of the network connectivity configuration. The name can contain alphanumeric characters, hyphens,
   * and underscores. The length must be between 3 and 30 characters. The name must match the regular
   * expression ^[0-9a-zA-Z-_]{3,30}$
   */
  name?: string | undefined;
  /**
   * The region for the network connectivity configuration.
   * Only workspaces in the same region can be attached to the network connectivity configuration.
   */
  region?: string | undefined;
  /** The network connectivity rules that apply to network traffic from your serverless compute resources. */
  egressConfig?:
    | CustomerFacingNetworkConnectivityConfigEgressConfig
    | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that for private endpoints towards a VPC endpoint service behind a customer-managed NLB,
 * you must approve the endpoint in AWS console after initialization.
 */
export interface NetworkConnectivityConfigAwsPrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /** <Databricks> account ID. You can find your account ID from the Accounts Console. */
  accountId?: string | undefined;
  /** The full target AWS endpoint service name that connects to the destination resources of the private endpoint. */
  endpointService?: string | undefined;
  /**
   * Only used by private endpoints towards a VPC endpoint service for customer-managed VPC endpoint service.
   *
   * The target AWS resource FQDNs accessible via the VPC endpoint service.
   * When updating this field, we perform full update on this field. Please ensure a full list of desired domain_names is provided.
   */
  domainNames?: string[] | undefined;
  /**
   * Only used by private endpoints towards AWS S3 service.
   *
   * The globally unique S3 bucket names that will be accessed via the VPC endpoint.
   * The bucket names must be in the same region as the NCC/endpoint service.
   * When updating this field, we perform full update on this field.
   * Please ensure a full list of desired resource_names is provided.
   */
  resourceNames?: string[] | undefined;
  /** The AWS VPC endpoint ID. You can use this ID to identify VPC endpoint created by <Databricks>. */
  vpcEndpointId?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the AWS console
   * before they take effect.
   * The possible values are:
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint is created but not approved in 14 days, it is EXPIRED.
   */
  connectionState?:
    | NetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  /**
   * Only used by private endpoints towards an AWS S3 service.
   *
   * Update this field to activate/deactivate this private endpoint to allow egress access from serverless compute resources.
   */
  enabled?: boolean | undefined;
  errorMessage?: string | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that you must approve the endpoint in Azure portal after initialization.
 */
export interface NetworkConnectivityConfigAzurePrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /** The Azure resource ID of the target resource. */
  resourceId?: string | undefined;
  /**
   * Only used by private endpoints to Azure first-party services.
   *
   * The sub-resource type (group ID) of the target resource.
   * Note that to connect to workspace root storage (root DBFS), you need two endpoints, one for blob and one for dfs.
   */
  groupId?: string | undefined;
  /** The name of the Azure private endpoint resource. */
  endpointName?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the Azure portal
   * before they take effect.
   * The possible values are:
   * - INIT: (deprecated) The endpoint has been created and pending approval.
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint was created but not approved in 14 days, it will be EXPIRED.
   */
  connectionState?:
    | NetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  /**
   * Not used by customer-managed private endpoint services.
   *
   * Domain names of target private link service.
   * When updating this field, the full list of target domain_names must be specified.
   */
  domainNames?: string[] | undefined;
  errorMessage?: string | undefined;
}

/**
 * Egress network configurations. Provides network configurations for Databricks -> Customer
 * traffic.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NetworkConnectivityConfigEgressConfig {}

/** Default rules don't have specific targets. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface NetworkConnectivityConfigEgressConfig_DefaultRule {
  azureServiceEndpointRule?:
    | NetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRule
    | undefined;
  awsStableIpRule?:
    | NetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRule
    | undefined;
}

/** The stable AWS IP CIDR blocks. You can use these to configure the firewall of your resources to allow traffic from your <Databricks> workspace. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface NetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRule {
  /** The list of stable IP CIDR blocks from which <Databricks> network traffic originates when accessing your resources. */
  cidrBlocks?: string[] | undefined;
}

/**
 * The stable Azure service endpoints. You can configure the firewall of your Azure resources
 * to allow traffic from your <Databricks> serverless compute resources.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface NetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRule {
  /** The Azure region in which this service endpoint rule applies.. */
  targetRegion?: string | undefined;
  /** The Azure services to which this service endpoint rule applies to. */
  targetServices?: EgressResourceType[] | undefined;
  /** The list of subnets from which <Databricks> network traffic originates when accessing your Azure resources. */
  subnets?: string[] | undefined;
}

export interface NetworkHealth {
  errorType?: string | undefined;
  /** Details of the error. */
  errorMessage?: string | undefined;
}

export interface NetworkVpcEndpoints {
  /** The VPC endpoint ID used by this network to access the Databricks REST API. */
  restApi?: string[] | undefined;
  /** The VPC endpoint ID used by this network to access the <Databricks> secure cluster connectivity relay. */
  dataplaneRelay?: string[] | undefined;
}

export interface NetworkWarning {
  warningType?: string | undefined;
  /** Details of the warning. */
  warningMessage?: string | undefined;
}

/** * */
export interface PrivateAccessSettings {
  /** <Databricks> private access settings ID. */
  privateAccessSettingsId?: string | undefined;
  /** The <Databricks> account ID that hosts the private access settings. */
  accountId?: string | undefined;
  /** The human-readable name of the private access settings object. */
  privateAccessSettingsName?: string | undefined;
  /** The AWS region for workspaces attached to this private access settings object. */
  region?: string | undefined;
  /** Determines if the workspace can be accessed over public internet. For fully private workspaces, you can optionally specify false, but only if you implement both the front-end and the back-end PrivateLink connections. Otherwise, specify true, which means that public access is enabled. */
  publicAccessEnabled?: boolean | undefined;
  /**
   * The private access level controls which VPC endpoints can connect to the UI or API of any workspace that attaches this private access settings object.
   * `ACCOUNT` level access (the default) allows only VPC endpoints that are registered in your <Databricks> account connect to your workspace.
   * `ENDPOINT` level access allows only specified VPC endpoints connect to your workspace. For details, see allowed_vpc_endpoint_ids.
   */
  privateAccessLevel?: PrivateAccessLevel | undefined;
  /**
   * An array of Databricks VPC endpoint IDs. This is the <Databricks> ID that is returned when registering the VPC endpoint configuration in your <Databricks> account. This is not the ID of the VPC endpoint in AWS.
   * Only used when private_access_level is set to ENDPOINT. This is an allow list of VPC endpoints that in your account that can connect to your workspace over AWS PrivateLink.
   * If hybrid access to your workspace is enabled by setting public_access_enabled to true, this control only works for PrivateLink connections. To control how your workspace is accessed via public internet, see IP access lists.
   */
  allowedVpcEndpointIds?: string[] | undefined;
}

/** Details required to replace an IP access list. */
export interface ReplaceAccountIpAccessListRequest {
  accountId?: string | undefined;
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: AccountIpAccessListType_IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

/** The IP access list was successfully replaced. */
export interface ReplaceAccountIpAccessListResponse {
  ipAccessList?: AccountIpAccessList | undefined;
}

/** Details required to replace an IP access list. */
export interface ReplaceIpAccessListRequest {
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

/** The IP access list was successfully replaced. */
export interface ReplaceIpAccessListResponse {
  ipAccessList?: IpAccessList | undefined;
}

/** Details required to update an IP access list. */
export interface UpdateAccountIpAccessListRequest {
  accountId?: string | undefined;
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: AccountIpAccessListType_IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

/** The IP access list was successfully updated. */
export interface UpdateAccountIpAccessListResponse {
  ipAccessList?: AccountIpAccessList | undefined;
}

/** Details required to update an IP access list. */
export interface UpdateIpAccessListRequest {
  /** The ID for the corresponding IP access list */
  listId?: string | undefined;
  /** Label for the IP access list. This **cannot** be empty. */
  label?: string | undefined;
  listType?: IpAccessListType | undefined;
  ipAddresses?: string[] | undefined;
  /** Specifies whether this IP access list is enabled. */
  enabled?: boolean | undefined;
}

/** The IP access list was successfully updated. */
export interface UpdateIpAccessListResponse {
  ipAccessList?: IpAccessList | undefined;
}

/** Your Network Connectivity Configuration ID. */
export interface UpdateNccPrivateEndpointRuleRequest {
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Your private endpoint rule ID. */
  privateEndpointRuleId?: string | undefined;
  privateEndpointRule?: UpdatePrivateEndpointRule | undefined;
  updateMask?: FieldMask<UpdatePrivateEndpointRule> | undefined;
}

export interface UpdateNetworkPolicyRequest {
  /** The unique identifier for the network policy. */
  networkPolicyId?: string | undefined;
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** Updated network policy configuration details. */
  networkPolicy?: AccountNetworkPolicy | undefined;
}

export interface UpdatePrivateAccessSettingsRequest {
  /** Properties of the new private access settings object. */
  customerFacingPrivateAccessSettings?: PrivateAccessSettings | undefined;
}

/**
 * Properties of the new private endpoint rule.
 * Note that you must approve the endpoint in Azure portal after initialization.
 */
export interface UpdatePrivateEndpointRule {
  /** The ID of a private endpoint rule. */
  ruleId?: string | undefined;
  /** The ID of a network connectivity configuration, which is the parent resource of this private endpoint rule object. */
  networkConnectivityConfigId?: string | undefined;
  /**
   * The current status of this private endpoint. The private endpoint rules are effective only if the connection state
   * is ESTABLISHED. Remember that you must approve new endpoints on your resources in the Cloud console
   * before they take effect.
   * The possible values are:
   * - PENDING: The endpoint has been created and pending approval.
   * - ESTABLISHED: The endpoint has been approved and is ready to use in your serverless compute resources.
   * - REJECTED: Connection was rejected by the private link resource owner.
   * - DISCONNECTED: Connection was removed by the private link resource owner, the private endpoint becomes informative and should be deleted for clean-up.
   * - EXPIRED: If the endpoint was created but not approved in 14 days, it will be EXPIRED.
   * - CREATING: The endpoint creation is in progress. Once successfully created, the state will transition to PENDING.
   * - CREATE_FAILED: The endpoint creation failed. You can check the error_message field for more details.
   */
  connectionState?:
    | NccPrivateEndpointRule_PrivateLinkConnectionState
    | undefined;
  /**
   * Only used by private endpoints to customer-managed private endpoint services.
   *
   * Domain names of target private link service.
   * When updating this field, the full list of target domain_names must be specified.
   */
  domainNames?: string[] | undefined;
  /** Time in epoch milliseconds when this object was created. */
  creationTime?: bigint | undefined;
  /** Time in epoch milliseconds when this object was updated. */
  updatedTime?: bigint | undefined;
  /** Whether this private endpoint is deactivated. */
  deactivated?: boolean | undefined;
  /** Time in epoch milliseconds when this object was deactivated. */
  deactivatedAt?: bigint | undefined;
  errorMessage?: string | undefined;
  /** The Azure resource ID of the target resource. */
  resourceId?: string | undefined;
  /**
   * Not used by customer-managed private endpoint services.
   *
   * The sub-resource type (group ID) of the target resource.
   * Note that to connect to workspace root storage (root DBFS), you need two endpoints, one for blob and one for dfs.
   */
  groupId?: string | undefined;
  /** The name of the Azure private endpoint resource. */
  endpointName?: string | undefined;
  /** <Databricks> account ID. You can find your account ID from the Accounts Console. */
  accountId?: string | undefined;
  /** The full target AWS endpoint service name that connects to the destination resources of the private endpoint. */
  endpointService?: string | undefined;
  /**
   * Only used by private endpoints towards AWS S3 service.
   *
   * The globally unique S3 bucket names that will be accessed via the VPC endpoint.
   * The bucket names must be in the same region as the NCC/endpoint service.
   * When updating this field, we perform full update on this field. Please ensure a full list of desired
   * resource_names is provided.
   */
  resourceNames?: string[] | undefined;
  /** The AWS VPC endpoint ID. You can use this ID to identify the VPC endpoint created by <Databricks>. */
  vpcEndpointId?: string | undefined;
  /**
   * Update this field to activate/deactivate this private endpoint to allow egress access from
   * serverless compute resources. Only honored for first-party services on each cloud (e.g. AWS S3).
   */
  enabled?: boolean | undefined;
  endpoint?: {$case: 'gcpEndpoint'; gcpEndpoint: GcpEndpoint} | undefined;
}

export interface UpdateWorkspaceNetworkOptionRequest {
  /** Your <Databricks> account ID. You can find your account ID in your <Databricks> accounts console. */
  accountId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: bigint | undefined;
  /** The network option details for the workspace. */
  workspaceNetworkOption?: WorkspaceNetworkOption | undefined;
}

/** * */
export interface VpcEndpoint {
  /** Databricks VPC endpoint ID. This is the <Databricks>-specific name of the VPC endpoint. Do not confuse this with the `aws_vpc_endpoint_id`, which is the ID within AWS of the VPC endpoint. */
  vpcEndpointId?: string | undefined;
  /** The <Databricks> account ID that hosts the VPC endpoint configuration. */
  accountId?: string | undefined;
  /** The human-readable name of the storage configuration. */
  vpcEndpointName?: string | undefined;
  /** The ID of the VPC endpoint object in AWS. */
  awsVpcEndpointId?: string | undefined;
  /** The ID of the <Databricks> [endpoint service](https://docs.aws.amazon.com/vpc/latest/privatelink/endpoint-service.html) that this VPC endpoint is connected to. For a list of endpoint service IDs for each supported AWS region, see the [Databricks PrivateLink documentation](https://docs.databricks.com/administration-guide/cloud-configurations/aws/privatelink.html). */
  awsEndpointServiceId?: string | undefined;
  /**
   * This enumeration represents the type of Databricks VPC endpoint service that was used when creating this VPC endpoint.
   * If the VPC endpoint connects to the <Databricks> control plane for either the front-end connection or the back-end REST API connection, the value is GENERAL_ACCESS.
   * If the VPC endpoint connects to the <Databricks> workspace for the back-end secure cluster connectivity relay, the value is DATAPLANE_RELAY_ACCESS.
   */
  useCase?: VpcEndpointUseCase | undefined;
  /** The AWS region in which this VPC endpoint object exists. */
  region?: string | undefined;
  /** The AWS Account in which the VPC endpoint object exists. */
  awsAccountId?: string | undefined;
  /** The current state (such as `available` or `rejected`) of the VPC endpoint. Derived from AWS. For the full set of values, see [AWS DescribeVpcEndpoint documentation](https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-vpc-endpoints.html). */
  state?: string | undefined;
  vpcEndpointInfo?:
    | {
        $case: 'gcpVpcEndpointInfo';
        /**
         * The cloud info of this vpc endpoint.
         * Info for a GCP vpc endpoint.
         */
        gcpVpcEndpointInfo: GcpVpcEndpointInfo;
      }
    | undefined;
}

export interface WorkspaceNetworkOption {
  /**
   * The network policy ID to apply to the workspace. This controls the network access rules
   * for all serverless compute resources in the workspace. Each workspace can only be
   * linked to one policy at a time. If no policy is explicitly assigned,
   * the workspace will use 'default-policy'.
   */
  networkPolicyId?: string | undefined;
  /** The workspace ID. */
  workspaceId?: bigint | undefined;
}

export const unmarshalAccountIpAccessListSchema: z.ZodType<AccountIpAccessList> =
  z
    .object({
      list_id: z.string().optional(),
      label: z.string().optional(),
      ip_addresses: z.array(z.string()).optional(),
      address_count: z.number().optional(),
      list_type: z.string().optional(),
      created_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      created_by: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      updated_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      updated_by: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      enabled: z.boolean().optional(),
    })
    .transform(d => ({
      listId: d.list_id,
      label: d.label,
      ipAddresses: d.ip_addresses,
      addressCount: d.address_count,
      listType: d.list_type,
      createdAt: d.created_at,
      createdBy: d.created_by,
      updatedAt: d.updated_at,
      updatedBy: d.updated_by,
      enabled: d.enabled,
    }));

export const unmarshalAccountNetworkPolicySchema: z.ZodType<AccountNetworkPolicy> =
  z
    .object({
      network_policy_id: z.string().optional(),
      account_id: z.string().optional(),
      egress: z.lazy(() => unmarshalEgressNetworkPolicySchema).optional(),
      ingress: z.lazy(() => unmarshalIngressNetworkPolicySchema).optional(),
      ingress_dry_run: z
        .lazy(() => unmarshalIngressNetworkPolicySchema)
        .optional(),
    })
    .transform(d => ({
      networkPolicyId: d.network_policy_id,
      accountId: d.account_id,
      egress: d.egress,
      ingress: d.ingress,
      ingressDryRun: d.ingress_dry_run,
    }));

export const unmarshalAzurePrivateEndpointInfoSchema: z.ZodType<AzurePrivateEndpointInfo> =
  z
    .object({
      private_endpoint_name: z.string().optional(),
      private_endpoint_resource_guid: z.string().optional(),
      private_endpoint_resource_id: z.string().optional(),
      private_link_service_id: z.string().optional(),
    })
    .transform(d => ({
      privateEndpointName: d.private_endpoint_name,
      privateEndpointResourceGuid: d.private_endpoint_resource_guid,
      privateEndpointResourceId: d.private_endpoint_resource_id,
      privateLinkServiceId: d.private_link_service_id,
    }));

export const unmarshalCreateAccountIpAccessListResponseSchema: z.ZodType<CreateAccountIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalAccountIpAccessListSchema)
        .optional(),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalCreateIpAccessListResponseSchema: z.ZodType<CreateIpAccessListResponse> =
  z
    .object({
      ip_access_list: z.lazy(() => unmarshalIpAccessListSchema).optional(),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalCustomerFacingNetworkConnectivityConfigEgressConfigSchema: z.ZodType<CustomerFacingNetworkConnectivityConfigEgressConfig> =
  z
    .object({
      default_rules: z
        .lazy(
          () => unmarshalNetworkConnectivityConfigEgressConfig_DefaultRuleSchema
        )
        .optional(),
      target_rules: z
        .lazy(
          () =>
            unmarshalCustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleSchema
        )
        .optional(),
    })
    .transform(d => ({
      defaultRules: d.default_rules,
      targetRules: d.target_rules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleSchema: z.ZodType<CustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRule> =
  z
    .object({
      azure_private_endpoint_rules: z
        .array(
          z.lazy(
            () =>
              unmarshalNetworkConnectivityConfigAzurePrivateEndpointRuleSchema
          )
        )
        .optional(),
      aws_private_endpoint_rules: z
        .array(
          z.lazy(
            () => unmarshalNetworkConnectivityConfigAwsPrivateEndpointRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      azurePrivateEndpointRules: d.azure_private_endpoint_rules,
      awsPrivateEndpointRules: d.aws_private_endpoint_rules,
    }));

export const unmarshalDeleteAccountIpAccessListResponseSchema: z.ZodType<DeleteAccountIpAccessListResponse> =
  z.object({});

export const unmarshalDeleteIpAccessListResponseSchema: z.ZodType<DeleteIpAccessListResponse> =
  z.object({});

export const unmarshalEgressNetworkPolicySchema: z.ZodType<EgressNetworkPolicy> =
  z
    .object({
      network_access: z
        .lazy(() => unmarshalEgressNetworkPolicy_NetworkAccessPolicySchema)
        .optional(),
    })
    .transform(d => ({
      networkAccess: d.network_access,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicySchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy> =
  z
    .object({
      restriction_mode: z.string().optional(),
      allowed_internet_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema
          )
        )
        .optional(),
      allowed_storage_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_NetworkAccessPolicy_StorageDestinationSchema
          )
        )
        .optional(),
      policy_enforcement: z
        .lazy(
          () =>
            unmarshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema
        )
        .optional(),
      blocked_internet_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema
          )
        )
        .optional(),
      allowed_databricks_destinations: z
        .array(
          z.lazy(
            () =>
              unmarshalEgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestinationSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      restrictionMode: d.restriction_mode,
      allowedInternetDestinations: d.allowed_internet_destinations,
      allowedStorageDestinations: d.allowed_storage_destinations,
      policyEnforcement: d.policy_enforcement,
      blockedInternetDestinations: d.blocked_internet_destinations,
      allowedDatabricksDestinations: d.allowed_databricks_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestinationSchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestination> =
  z
    .object({
      workspace_ids: z
        .array(z.union([z.number(), z.bigint()]).transform(v => BigInt(v)))
        .optional(),
    })
    .transform(d => ({
      workspaceIds: d.workspace_ids,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination> =
  z
    .object({
      destination: z.string().optional(),
      internet_destination_type: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
      internetDestinationType: d.internet_destination_type,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement> =
  z
    .object({
      enforcement_mode: z.string().optional(),
      dry_run_mode_product_filter: z.array(z.string()).optional(),
    })
    .transform(d => ({
      enforcementMode: d.enforcement_mode,
      dryRunModeProductFilter: d.dry_run_mode_product_filter,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicy_StorageDestinationSchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination> =
  z
    .object({
      bucket_name: z.string().optional(),
      region: z.string().optional(),
      storage_destination_type: z.string().optional(),
      azure_storage_account: z.string().optional(),
      azure_storage_service: z.string().optional(),
    })
    .transform(d => ({
      bucketName: d.bucket_name,
      region: d.region,
      storageDestinationType: d.storage_destination_type,
      azureStorageAccount: d.azure_storage_account,
      azureStorageService: d.azure_storage_service,
    }));

export const unmarshalEndpointSchema: z.ZodType<Endpoint> = z
  .object({
    name: z.string().optional(),
    endpoint_id: z.string().optional(),
    account_id: z.string().optional(),
    display_name: z.string().optional(),
    use_case: z.string().optional(),
    region: z.string().optional(),
    state: z.string().optional(),
    azure_private_endpoint_info: z
      .lazy(() => unmarshalAzurePrivateEndpointInfoSchema)
      .optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    endpointId: d.endpoint_id,
    accountId: d.account_id,
    displayName: d.display_name,
    useCase: d.use_case,
    region: d.region,
    state: d.state,
    endpointInfo:
      d.azure_private_endpoint_info !== undefined
        ? {
            $case: 'azurePrivateEndpointInfo' as const,
            azurePrivateEndpointInfo: d.azure_private_endpoint_info,
          }
        : undefined,
    createTime: d.create_time,
  }));

export const unmarshalGcpEndpointSchema: z.ZodType<GcpEndpoint> = z
  .object({
    psc_endpoint_uri: z.string().optional(),
    service_attachment: z.string().optional(),
  })
  .transform(d => ({
    pscEndpointUri: d.psc_endpoint_uri,
    targetServices:
      d.service_attachment !== undefined
        ? {
            $case: 'serviceAttachment' as const,
            serviceAttachment: d.service_attachment,
          }
        : undefined,
  }));

export const unmarshalGcpNetworkInfoSchema: z.ZodType<GcpNetworkInfo> = z
  .object({
    network_project_id: z.string().optional(),
    vpc_id: z.string().optional(),
    subnet_id: z.string().optional(),
    subnet_region: z.string().optional(),
    pod_ip_range_name: z.string().optional(),
    service_ip_range_name: z.string().optional(),
  })
  .transform(d => ({
    networkProjectId: d.network_project_id,
    vpcId: d.vpc_id,
    subnetId: d.subnet_id,
    subnetRegion: d.subnet_region,
    podIpRangeName: d.pod_ip_range_name,
    serviceIpRangeName: d.service_ip_range_name,
  }));

export const unmarshalGcpVpcEndpointInfoSchema: z.ZodType<GcpVpcEndpointInfo> =
  z
    .object({
      psc_connection_id: z.string().optional(),
      project_id: z.string().optional(),
      psc_endpoint_name: z.string().optional(),
      endpoint_region: z.string().optional(),
      service_attachment_id: z.string().optional(),
    })
    .transform(d => ({
      pscConnectionId: d.psc_connection_id,
      projectId: d.project_id,
      pscEndpointName: d.psc_endpoint_name,
      endpointRegion: d.endpoint_region,
      serviceAttachmentId: d.service_attachment_id,
    }));

export const unmarshalGetAccountIpAccessListResponseSchema: z.ZodType<GetAccountIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalAccountIpAccessListSchema)
        .optional(),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalGetIpAccessListResponseSchema: z.ZodType<GetIpAccessListResponse> =
  z
    .object({
      ip_access_list: z.lazy(() => unmarshalIpAccessListSchema).optional(),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalIngressNetworkPolicySchema: z.ZodType<IngressNetworkPolicy> =
  z
    .object({
      public_access: z
        .lazy(() => unmarshalIngressNetworkPolicy_PublicAccessSchema)
        .optional(),
      private_access: z
        .lazy(() => unmarshalIngressNetworkPolicy_PrivateAccessSchema)
        .optional(),
      cross_workspace_access: z
        .lazy(() => unmarshalIngressNetworkPolicy_CrossWorkspaceAccessSchema)
        .optional(),
    })
    .transform(d => ({
      publicAccess: d.public_access,
      privateAccess: d.private_access,
      crossWorkspaceAccess: d.cross_workspace_access,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AccountApiDestinationSchema: z.ZodType<IngressNetworkPolicy_AccountApiDestination> =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scope_qualifier: z.string().optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scopeQualifier: d.scope_qualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AccountDatabricksOneDestinationSchema: z.ZodType<IngressNetworkPolicy_AccountDatabricksOneDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AccountUiDestinationSchema: z.ZodType<IngressNetworkPolicy_AccountUiDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AppsRuntimeDestinationSchema: z.ZodType<IngressNetworkPolicy_AppsRuntimeDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AuthenticationSchema: z.ZodType<IngressNetworkPolicy_Authentication> =
  z
    .object({
      identity_type: z.string().optional(),
      identities: z
        .array(
          z.lazy(
            () => unmarshalIngressNetworkPolicy_AuthenticationIdentitySchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      identityType: d.identity_type,
      identities: d.identities,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_AuthenticationIdentitySchema: z.ZodType<IngressNetworkPolicy_AuthenticationIdentity> =
  z
    .object({
      principal_type: z.string().optional(),
      principal_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      principalType: d.principal_type,
      principalId: d.principal_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_CrossWorkspaceAccessSchema: z.ZodType<IngressNetworkPolicy_CrossWorkspaceAccess> =
  z
    .object({
      restriction_mode: z.string().optional(),
      deny_rules: z
        .array(
          z.lazy(
            () => unmarshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
      allow_rules: z
        .array(
          z.lazy(
            () => unmarshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      restrictionMode: d.restriction_mode,
      denyRules: d.deny_rules,
      allowRules: d.allow_rules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema: z.ZodType<IngressNetworkPolicy_CrossWorkspaceIngressRule> =
  z
    .object({
      origin: z
        .lazy(
          () => unmarshalIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema
        )
        .optional(),
      destination: z
        .lazy(() => unmarshalIngressNetworkPolicy_RequestDestinationSchema)
        .optional(),
      authentication: z
        .lazy(() => unmarshalIngressNetworkPolicy_AuthenticationSchema)
        .optional(),
      label: z.string().optional(),
    })
    .transform(d => ({
      origin: d.origin,
      destination: d.destination,
      authentication: d.authentication,
      label: d.label,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema: z.ZodType<IngressNetworkPolicy_CrossWorkspaceRequestOrigin> =
  z
    .object({
      all_source_workspaces: z.boolean().optional(),
      selected_workspaces: z
        .lazy(() => unmarshalIngressNetworkPolicy_WorkspaceIdListSchema)
        .optional(),
    })
    .transform(d => ({
      source:
        d.all_source_workspaces !== undefined
          ? {
              $case: 'allSourceWorkspaces' as const,
              allSourceWorkspaces: d.all_source_workspaces,
            }
          : d.selected_workspaces !== undefined
            ? {
                $case: 'selectedWorkspaces' as const,
                selectedWorkspaces: d.selected_workspaces,
              }
            : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_EndpointsSchema: z.ZodType<IngressNetworkPolicy_Endpoints> =
  z
    .object({
      endpoint_ids: z.array(z.string()).optional(),
    })
    .transform(d => ({
      endpointIds: d.endpoint_ids,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_IpRangesSchema: z.ZodType<IngressNetworkPolicy_IpRanges> =
  z
    .object({
      ip_ranges: z.array(z.string()).optional(),
    })
    .transform(d => ({
      ipRanges: d.ip_ranges,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_LakebaseRuntimeDestinationSchema: z.ZodType<IngressNetworkPolicy_LakebaseRuntimeDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PrivateAccessSchema: z.ZodType<IngressNetworkPolicy_PrivateAccess> =
  z
    .object({
      restriction_mode: z.string().optional(),
      deny_rules: z
        .array(
          z.lazy(() => unmarshalIngressNetworkPolicy_PrivateIngressRuleSchema)
        )
        .optional(),
      allow_rules: z
        .array(
          z.lazy(() => unmarshalIngressNetworkPolicy_PrivateIngressRuleSchema)
        )
        .optional(),
    })
    .transform(d => ({
      restrictionMode: d.restriction_mode,
      denyRules: d.deny_rules,
      allowRules: d.allow_rules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PrivateIngressRuleSchema: z.ZodType<IngressNetworkPolicy_PrivateIngressRule> =
  z
    .object({
      origin: z
        .lazy(() => unmarshalIngressNetworkPolicy_PrivateRequestOriginSchema)
        .optional(),
      destination: z
        .lazy(() => unmarshalIngressNetworkPolicy_RequestDestinationSchema)
        .optional(),
      authentication: z
        .lazy(() => unmarshalIngressNetworkPolicy_AuthenticationSchema)
        .optional(),
      label: z.string().optional(),
    })
    .transform(d => ({
      origin: d.origin,
      destination: d.destination,
      authentication: d.authentication,
      label: d.label,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PrivateRequestOriginSchema: z.ZodType<IngressNetworkPolicy_PrivateRequestOrigin> =
  z
    .object({
      endpoints: z
        .lazy(() => unmarshalIngressNetworkPolicy_EndpointsSchema)
        .optional(),
      all_registered_endpoints: z.boolean().optional(),
      azure_workspace_private_link: z.boolean().optional(),
      all_private_access: z.boolean().optional(),
    })
    .transform(d => ({
      source:
        d.endpoints !== undefined
          ? {$case: 'endpoints' as const, endpoints: d.endpoints}
          : d.all_registered_endpoints !== undefined
            ? {
                $case: 'allRegisteredEndpoints' as const,
                allRegisteredEndpoints: d.all_registered_endpoints,
              }
            : d.azure_workspace_private_link !== undefined
              ? {
                  $case: 'azureWorkspacePrivateLink' as const,
                  azureWorkspacePrivateLink: d.azure_workspace_private_link,
                }
              : d.all_private_access !== undefined
                ? {
                    $case: 'allPrivateAccess' as const,
                    allPrivateAccess: d.all_private_access,
                  }
                : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PublicAccessSchema: z.ZodType<IngressNetworkPolicy_PublicAccess> =
  z
    .object({
      restriction_mode: z.string().optional(),
      deny_rules: z
        .array(
          z.lazy(() => unmarshalIngressNetworkPolicy_PublicIngressRuleSchema)
        )
        .optional(),
      allow_rules: z
        .array(
          z.lazy(() => unmarshalIngressNetworkPolicy_PublicIngressRuleSchema)
        )
        .optional(),
    })
    .transform(d => ({
      restrictionMode: d.restriction_mode,
      denyRules: d.deny_rules,
      allowRules: d.allow_rules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PublicIngressRuleSchema: z.ZodType<IngressNetworkPolicy_PublicIngressRule> =
  z
    .object({
      origin: z
        .lazy(() => unmarshalIngressNetworkPolicy_PublicRequestOriginSchema)
        .optional(),
      destination: z
        .lazy(() => unmarshalIngressNetworkPolicy_RequestDestinationSchema)
        .optional(),
      authentication: z
        .lazy(() => unmarshalIngressNetworkPolicy_AuthenticationSchema)
        .optional(),
      label: z.string().optional(),
    })
    .transform(d => ({
      origin: d.origin,
      destination: d.destination,
      authentication: d.authentication,
      label: d.label,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_PublicRequestOriginSchema: z.ZodType<IngressNetworkPolicy_PublicRequestOrigin> =
  z
    .object({
      all_ip_ranges: z.boolean().optional(),
      included_ip_ranges: z
        .lazy(() => unmarshalIngressNetworkPolicy_IpRangesSchema)
        .optional(),
      excluded_ip_ranges: z
        .lazy(() => unmarshalIngressNetworkPolicy_IpRangesSchema)
        .optional(),
    })
    .transform(d => ({
      source:
        d.all_ip_ranges !== undefined
          ? {$case: 'allIpRanges' as const, allIpRanges: d.all_ip_ranges}
          : d.included_ip_ranges !== undefined
            ? {
                $case: 'includedIpRanges' as const,
                includedIpRanges: d.included_ip_ranges,
              }
            : d.excluded_ip_ranges !== undefined
              ? {
                  $case: 'excludedIpRanges' as const,
                  excludedIpRanges: d.excluded_ip_ranges,
                }
              : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_RequestDestinationSchema: z.ZodType<IngressNetworkPolicy_RequestDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
      workspace_ui: z
        .lazy(() => unmarshalIngressNetworkPolicy_WorkspaceUiDestinationSchema)
        .optional(),
      workspace_api: z
        .lazy(() => unmarshalIngressNetworkPolicy_WorkspaceApiDestinationSchema)
        .optional(),
      apps_runtime: z
        .lazy(() => unmarshalIngressNetworkPolicy_AppsRuntimeDestinationSchema)
        .optional(),
      lakebase_runtime: z
        .lazy(
          () => unmarshalIngressNetworkPolicy_LakebaseRuntimeDestinationSchema
        )
        .optional(),
      account_ui: z
        .lazy(() => unmarshalIngressNetworkPolicy_AccountUiDestinationSchema)
        .optional(),
      account_api: z
        .lazy(() => unmarshalIngressNetworkPolicy_AccountApiDestinationSchema)
        .optional(),
      account_databricks_one: z
        .lazy(
          () =>
            unmarshalIngressNetworkPolicy_AccountDatabricksOneDestinationSchema
        )
        .optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
      workspaceUi: d.workspace_ui,
      workspaceApi: d.workspace_api,
      appsRuntime: d.apps_runtime,
      lakebaseRuntime: d.lakebase_runtime,
      accountUi: d.account_ui,
      accountApi: d.account_api,
      accountDatabricksOne: d.account_databricks_one,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_WorkspaceApiDestinationSchema: z.ZodType<IngressNetworkPolicy_WorkspaceApiDestination> =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scope_qualifier: z.string().optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scopeQualifier: d.scope_qualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_WorkspaceIdListSchema: z.ZodType<IngressNetworkPolicy_WorkspaceIdList> =
  z
    .object({
      workspace_ids: z
        .array(z.union([z.number(), z.bigint()]).transform(v => BigInt(v)))
        .optional(),
    })
    .transform(d => ({
      workspaceIds: d.workspace_ids,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalIngressNetworkPolicy_WorkspaceUiDestinationSchema: z.ZodType<IngressNetworkPolicy_WorkspaceUiDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

export const unmarshalIpAccessListSchema: z.ZodType<IpAccessList> = z
  .object({
    list_id: z.string().optional(),
    label: z.string().optional(),
    ip_addresses: z.array(z.string()).optional(),
    address_count: z.number().optional(),
    list_type: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    updated_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    listId: d.list_id,
    label: d.label,
    ipAddresses: d.ip_addresses,
    addressCount: d.address_count,
    listType: d.list_type,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    enabled: d.enabled,
  }));

export const unmarshalListAccountIpAccessListsResponseSchema: z.ZodType<ListAccountIpAccessListsResponse> =
  z
    .object({
      ip_access_lists: z
        .array(z.lazy(() => unmarshalAccountIpAccessListSchema))
        .optional(),
    })
    .transform(d => ({
      ipAccessLists: d.ip_access_lists,
    }));

export const unmarshalListEndpointsResponseSchema: z.ZodType<ListEndpointsResponse> =
  z
    .object({
      items: z.array(z.lazy(() => unmarshalEndpointSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      items: d.items,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListIpAccessListsResponseSchema: z.ZodType<ListIpAccessListsResponse> =
  z
    .object({
      ip_access_lists: z
        .array(z.lazy(() => unmarshalIpAccessListSchema))
        .optional(),
    })
    .transform(d => ({
      ipAccessLists: d.ip_access_lists,
    }));

export const unmarshalListNccPrivateEndpointRulesResponseSchema: z.ZodType<ListNccPrivateEndpointRulesResponse> =
  z
    .object({
      items: z
        .array(z.lazy(() => unmarshalNccPrivateEndpointRuleSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      items: d.items,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListNetworkConnectivityConfigsResponseSchema: z.ZodType<ListNetworkConnectivityConfigsResponse> =
  z
    .object({
      items: z
        .array(z.lazy(() => unmarshalNetworkConnectivityConfigSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      items: d.items,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListNetworkPoliciesResponseSchema: z.ZodType<ListNetworkPoliciesResponse> =
  z
    .object({
      items: z
        .array(z.lazy(() => unmarshalAccountNetworkPolicySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      items: d.items,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalNccPrivateEndpointRuleSchema: z.ZodType<NccPrivateEndpointRule> =
  z
    .object({
      rule_id: z.string().optional(),
      network_connectivity_config_id: z.string().optional(),
      connection_state: z.string().optional(),
      domain_names: z.array(z.string()).optional(),
      creation_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      updated_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      deactivated: z.boolean().optional(),
      deactivated_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      error_message: z.string().optional(),
      resource_id: z.string().optional(),
      group_id: z.string().optional(),
      endpoint_name: z.string().optional(),
      account_id: z.string().optional(),
      endpoint_service: z.string().optional(),
      resource_names: z.array(z.string()).optional(),
      vpc_endpoint_id: z.string().optional(),
      enabled: z.boolean().optional(),
      gcp_endpoint: z.lazy(() => unmarshalGcpEndpointSchema).optional(),
    })
    .transform(d => ({
      ruleId: d.rule_id,
      networkConnectivityConfigId: d.network_connectivity_config_id,
      connectionState: d.connection_state,
      domainNames: d.domain_names,
      creationTime: d.creation_time,
      updatedTime: d.updated_time,
      deactivated: d.deactivated,
      deactivatedAt: d.deactivated_at,
      errorMessage: d.error_message,
      resourceId: d.resource_id,
      groupId: d.group_id,
      endpointName: d.endpoint_name,
      accountId: d.account_id,
      endpointService: d.endpoint_service,
      resourceNames: d.resource_names,
      vpcEndpointId: d.vpc_endpoint_id,
      enabled: d.enabled,
      endpoint:
        d.gcp_endpoint !== undefined
          ? {$case: 'gcpEndpoint' as const, gcpEndpoint: d.gcp_endpoint}
          : undefined,
    }));

export const unmarshalNetworkSchema: z.ZodType<Network> = z
  .object({
    network_id: z.string().optional(),
    account_id: z.string().optional(),
    workspace_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    vpc_id: z.string().optional(),
    subnet_ids: z.array(z.string()).optional(),
    security_group_ids: z.array(z.string()).optional(),
    vpc_status: z.string().optional(),
    error_messages: z
      .array(z.lazy(() => unmarshalNetworkHealthSchema))
      .optional(),
    network_name: z.string().optional(),
    creation_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    warning_messages: z
      .array(z.lazy(() => unmarshalNetworkWarningSchema))
      .optional(),
    vpc_endpoints: z.lazy(() => unmarshalNetworkVpcEndpointsSchema).optional(),
    gcp_network_info: z.lazy(() => unmarshalGcpNetworkInfoSchema).optional(),
  })
  .transform(d => ({
    networkId: d.network_id,
    accountId: d.account_id,
    workspaceId: d.workspace_id,
    vpcId: d.vpc_id,
    subnetIds: d.subnet_ids,
    securityGroupIds: d.security_group_ids,
    vpcStatus: d.vpc_status,
    errorMessages: d.error_messages,
    networkName: d.network_name,
    creationTime: d.creation_time,
    warningMessages: d.warning_messages,
    vpcEndpoints: d.vpc_endpoints,
    networkInfo:
      d.gcp_network_info !== undefined
        ? {$case: 'gcpNetworkInfo' as const, gcpNetworkInfo: d.gcp_network_info}
        : undefined,
  }));

export const unmarshalNetworkConnectivityConfigSchema: z.ZodType<NetworkConnectivityConfig> =
  z
    .object({
      network_connectivity_config_id: z.string().optional(),
      account_id: z.string().optional(),
      name: z.string().optional(),
      region: z.string().optional(),
      egress_config: z
        .lazy(
          () =>
            unmarshalCustomerFacingNetworkConnectivityConfigEgressConfigSchema
        )
        .optional(),
      updated_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      creation_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      networkConnectivityConfigId: d.network_connectivity_config_id,
      accountId: d.account_id,
      name: d.name,
      region: d.region,
      egressConfig: d.egress_config,
      updatedTime: d.updated_time,
      creationTime: d.creation_time,
    }));

export const unmarshalNetworkConnectivityConfigAwsPrivateEndpointRuleSchema: z.ZodType<NetworkConnectivityConfigAwsPrivateEndpointRule> =
  z
    .object({
      rule_id: z.string().optional(),
      network_connectivity_config_id: z.string().optional(),
      account_id: z.string().optional(),
      endpoint_service: z.string().optional(),
      domain_names: z.array(z.string()).optional(),
      resource_names: z.array(z.string()).optional(),
      vpc_endpoint_id: z.string().optional(),
      connection_state: z.string().optional(),
      creation_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      updated_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      deactivated: z.boolean().optional(),
      deactivated_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      enabled: z.boolean().optional(),
      error_message: z.string().optional(),
    })
    .transform(d => ({
      ruleId: d.rule_id,
      networkConnectivityConfigId: d.network_connectivity_config_id,
      accountId: d.account_id,
      endpointService: d.endpoint_service,
      domainNames: d.domain_names,
      resourceNames: d.resource_names,
      vpcEndpointId: d.vpc_endpoint_id,
      connectionState: d.connection_state,
      creationTime: d.creation_time,
      updatedTime: d.updated_time,
      deactivated: d.deactivated,
      deactivatedAt: d.deactivated_at,
      enabled: d.enabled,
      errorMessage: d.error_message,
    }));

export const unmarshalNetworkConnectivityConfigAzurePrivateEndpointRuleSchema: z.ZodType<NetworkConnectivityConfigAzurePrivateEndpointRule> =
  z
    .object({
      rule_id: z.string().optional(),
      network_connectivity_config_id: z.string().optional(),
      resource_id: z.string().optional(),
      group_id: z.string().optional(),
      endpoint_name: z.string().optional(),
      connection_state: z.string().optional(),
      creation_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      updated_time: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      deactivated: z.boolean().optional(),
      deactivated_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      domain_names: z.array(z.string()).optional(),
      error_message: z.string().optional(),
    })
    .transform(d => ({
      ruleId: d.rule_id,
      networkConnectivityConfigId: d.network_connectivity_config_id,
      resourceId: d.resource_id,
      groupId: d.group_id,
      endpointName: d.endpoint_name,
      connectionState: d.connection_state,
      creationTime: d.creation_time,
      updatedTime: d.updated_time,
      deactivated: d.deactivated,
      deactivatedAt: d.deactivated_at,
      domainNames: d.domain_names,
      errorMessage: d.error_message,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalNetworkConnectivityConfigEgressConfig_DefaultRuleSchema: z.ZodType<NetworkConnectivityConfigEgressConfig_DefaultRule> =
  z
    .object({
      azure_service_endpoint_rule: z
        .lazy(
          () =>
            unmarshalNetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleSchema
        )
        .optional(),
      aws_stable_ip_rule: z
        .lazy(
          () =>
            unmarshalNetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleSchema
        )
        .optional(),
    })
    .transform(d => ({
      azureServiceEndpointRule: d.azure_service_endpoint_rule,
      awsStableIpRule: d.aws_stable_ip_rule,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalNetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleSchema: z.ZodType<NetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRule> =
  z
    .object({
      cidr_blocks: z.array(z.string()).optional(),
    })
    .transform(d => ({
      cidrBlocks: d.cidr_blocks,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalNetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleSchema: z.ZodType<NetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRule> =
  z
    .object({
      target_region: z.string().optional(),
      target_services: z.array(z.string()).optional(),
      subnets: z.array(z.string()).optional(),
    })
    .transform(d => ({
      targetRegion: d.target_region,
      targetServices: d.target_services,
      subnets: d.subnets,
    }));

export const unmarshalNetworkHealthSchema: z.ZodType<NetworkHealth> = z
  .object({
    error_type: z.string().optional(),
    error_message: z.string().optional(),
  })
  .transform(d => ({
    errorType: d.error_type,
    errorMessage: d.error_message,
  }));

export const unmarshalNetworkVpcEndpointsSchema: z.ZodType<NetworkVpcEndpoints> =
  z
    .object({
      rest_api: z.array(z.string()).optional(),
      dataplane_relay: z.array(z.string()).optional(),
    })
    .transform(d => ({
      restApi: d.rest_api,
      dataplaneRelay: d.dataplane_relay,
    }));

export const unmarshalNetworkWarningSchema: z.ZodType<NetworkWarning> = z
  .object({
    warning_type: z.string().optional(),
    warning_message: z.string().optional(),
  })
  .transform(d => ({
    warningType: d.warning_type,
    warningMessage: d.warning_message,
  }));

export const unmarshalPrivateAccessSettingsSchema: z.ZodType<PrivateAccessSettings> =
  z
    .object({
      private_access_settings_id: z.string().optional(),
      account_id: z.string().optional(),
      private_access_settings_name: z.string().optional(),
      region: z.string().optional(),
      public_access_enabled: z.boolean().optional(),
      private_access_level: z.string().optional(),
      allowed_vpc_endpoint_ids: z.array(z.string()).optional(),
    })
    .transform(d => ({
      privateAccessSettingsId: d.private_access_settings_id,
      accountId: d.account_id,
      privateAccessSettingsName: d.private_access_settings_name,
      region: d.region,
      publicAccessEnabled: d.public_access_enabled,
      privateAccessLevel: d.private_access_level,
      allowedVpcEndpointIds: d.allowed_vpc_endpoint_ids,
    }));

export const unmarshalReplaceAccountIpAccessListResponseSchema: z.ZodType<ReplaceAccountIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalAccountIpAccessListSchema)
        .optional(),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalReplaceIpAccessListResponseSchema: z.ZodType<ReplaceIpAccessListResponse> =
  z
    .object({
      ip_access_list: z.lazy(() => unmarshalIpAccessListSchema).optional(),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalUpdateAccountIpAccessListResponseSchema: z.ZodType<UpdateAccountIpAccessListResponse> =
  z
    .object({
      ip_access_list: z
        .lazy(() => unmarshalAccountIpAccessListSchema)
        .optional(),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalUpdateIpAccessListResponseSchema: z.ZodType<UpdateIpAccessListResponse> =
  z
    .object({
      ip_access_list: z.lazy(() => unmarshalIpAccessListSchema).optional(),
    })
    .transform(d => ({
      ipAccessList: d.ip_access_list,
    }));

export const unmarshalVpcEndpointSchema: z.ZodType<VpcEndpoint> = z
  .object({
    vpc_endpoint_id: z.string().optional(),
    account_id: z.string().optional(),
    vpc_endpoint_name: z.string().optional(),
    aws_vpc_endpoint_id: z.string().optional(),
    aws_endpoint_service_id: z.string().optional(),
    use_case: z.string().optional(),
    region: z.string().optional(),
    aws_account_id: z.string().optional(),
    state: z.string().optional(),
    gcp_vpc_endpoint_info: z
      .lazy(() => unmarshalGcpVpcEndpointInfoSchema)
      .optional(),
  })
  .transform(d => ({
    vpcEndpointId: d.vpc_endpoint_id,
    accountId: d.account_id,
    vpcEndpointName: d.vpc_endpoint_name,
    awsVpcEndpointId: d.aws_vpc_endpoint_id,
    awsEndpointServiceId: d.aws_endpoint_service_id,
    useCase: d.use_case,
    region: d.region,
    awsAccountId: d.aws_account_id,
    state: d.state,
    vpcEndpointInfo:
      d.gcp_vpc_endpoint_info !== undefined
        ? {
            $case: 'gcpVpcEndpointInfo' as const,
            gcpVpcEndpointInfo: d.gcp_vpc_endpoint_info,
          }
        : undefined,
  }));

export const unmarshalWorkspaceNetworkOptionSchema: z.ZodType<WorkspaceNetworkOption> =
  z
    .object({
      network_policy_id: z.string().optional(),
      workspace_id: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      networkPolicyId: d.network_policy_id,
      workspaceId: d.workspace_id,
    }));

export const marshalAccountNetworkPolicySchema: z.ZodType = z
  .object({
    networkPolicyId: z.string().optional(),
    accountId: z.string().optional(),
    egress: z.lazy(() => marshalEgressNetworkPolicySchema).optional(),
    ingress: z.lazy(() => marshalIngressNetworkPolicySchema).optional(),
    ingressDryRun: z.lazy(() => marshalIngressNetworkPolicySchema).optional(),
  })
  .transform(d => ({
    network_policy_id: d.networkPolicyId,
    account_id: d.accountId,
    egress: d.egress,
    ingress: d.ingress,
    ingress_dry_run: d.ingressDryRun,
  }));

export const marshalAzurePrivateEndpointInfoSchema: z.ZodType = z
  .object({
    privateEndpointName: z.string().optional(),
    privateEndpointResourceGuid: z.string().optional(),
    privateEndpointResourceId: z.string().optional(),
    privateLinkServiceId: z.string().optional(),
  })
  .transform(d => ({
    private_endpoint_name: d.privateEndpointName,
    private_endpoint_resource_guid: d.privateEndpointResourceGuid,
    private_endpoint_resource_id: d.privateEndpointResourceId,
    private_link_service_id: d.privateLinkServiceId,
  }));

export const marshalCreateAccountIpAccessListRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
  }));

export const marshalCreateIpAccessListRequestSchema: z.ZodType = z
  .object({
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
  }));

export const marshalCreateNetworkConnectivityConfigurationSchema: z.ZodType = z
  .object({
    networkConnectivityConfigId: z.string().optional(),
    accountId: z.string().optional(),
    name: z.string().optional(),
    region: z.string().optional(),
    egressConfig: z
      .lazy(
        () => marshalCustomerFacingNetworkConnectivityConfigEgressConfigSchema
      )
      .optional(),
    updatedTime: z.bigint().optional(),
    creationTime: z.bigint().optional(),
  })
  .transform(d => ({
    network_connectivity_config_id: d.networkConnectivityConfigId,
    account_id: d.accountId,
    name: d.name,
    region: d.region,
    egress_config: d.egressConfig,
    updated_time: d.updatedTime,
    creation_time: d.creationTime,
  }));

export const marshalCreateNetworkRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    networkName: z.string().optional(),
    vpcId: z.string().optional(),
    subnetIds: z.array(z.string()).optional(),
    securityGroupIds: z.array(z.string()).optional(),
    vpcEndpoints: z.lazy(() => marshalNetworkVpcEndpointsSchema).optional(),
    gcpNetworkInfo: z.lazy(() => marshalGcpNetworkInfoSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    network_name: d.networkName,
    vpc_id: d.vpcId,
    subnet_ids: d.subnetIds,
    security_group_ids: d.securityGroupIds,
    vpc_endpoints: d.vpcEndpoints,
    gcp_network_info: d.gcpNetworkInfo,
  }));

export const marshalCreatePrivateAccessSettingsRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    privateAccessSettingsName: z.string().optional(),
    region: z.string().optional(),
    publicAccessEnabled: z.boolean().optional(),
    privateAccessLevel: z.string().optional(),
    allowedVpcEndpointIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    private_access_settings_name: d.privateAccessSettingsName,
    region: d.region,
    public_access_enabled: d.publicAccessEnabled,
    private_access_level: d.privateAccessLevel,
    allowed_vpc_endpoint_ids: d.allowedVpcEndpointIds,
  }));

export const marshalCreatePrivateEndpointRuleSchema: z.ZodType = z
  .object({
    ruleId: z.string().optional(),
    networkConnectivityConfigId: z.string().optional(),
    connectionState: z.string().optional(),
    domainNames: z.array(z.string()).optional(),
    creationTime: z.bigint().optional(),
    updatedTime: z.bigint().optional(),
    deactivated: z.boolean().optional(),
    deactivatedAt: z.bigint().optional(),
    errorMessage: z.string().optional(),
    resourceId: z.string().optional(),
    groupId: z.string().optional(),
    endpointName: z.string().optional(),
    accountId: z.string().optional(),
    endpointService: z.string().optional(),
    resourceNames: z.array(z.string()).optional(),
    vpcEndpointId: z.string().optional(),
    enabled: z.boolean().optional(),
    endpoint: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('gcpEndpoint'),
          gcpEndpoint: z.lazy(() => marshalGcpEndpointSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    rule_id: d.ruleId,
    network_connectivity_config_id: d.networkConnectivityConfigId,
    connection_state: d.connectionState,
    domain_names: d.domainNames,
    creation_time: d.creationTime,
    updated_time: d.updatedTime,
    deactivated: d.deactivated,
    deactivated_at: d.deactivatedAt,
    error_message: d.errorMessage,
    resource_id: d.resourceId,
    group_id: d.groupId,
    endpoint_name: d.endpointName,
    account_id: d.accountId,
    endpoint_service: d.endpointService,
    resource_names: d.resourceNames,
    vpc_endpoint_id: d.vpcEndpointId,
    enabled: d.enabled,
    ...(d.endpoint?.$case === 'gcpEndpoint' && {
      gcp_endpoint: d.endpoint.gcpEndpoint,
    }),
  }));

export const marshalCreateVpcEndpointRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    vpcEndpointName: z.string().optional(),
    region: z.string().optional(),
    awsVpcEndpointId: z.string().optional(),
    vpcEndpointInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('gcpVpcEndpointInfo'),
          gcpVpcEndpointInfo: z.lazy(() => marshalGcpVpcEndpointInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    vpc_endpoint_name: d.vpcEndpointName,
    region: d.region,
    aws_vpc_endpoint_id: d.awsVpcEndpointId,
    ...(d.vpcEndpointInfo?.$case === 'gcpVpcEndpointInfo' && {
      gcp_vpc_endpoint_info: d.vpcEndpointInfo.gcpVpcEndpointInfo,
    }),
  }));

export const marshalCustomerFacingNetworkConnectivityConfigEgressConfigSchema: z.ZodType =
  z
    .object({
      defaultRules: z
        .lazy(
          () => marshalNetworkConnectivityConfigEgressConfig_DefaultRuleSchema
        )
        .optional(),
      targetRules: z
        .lazy(
          () =>
            marshalCustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleSchema
        )
        .optional(),
    })
    .transform(d => ({
      default_rules: d.defaultRules,
      target_rules: d.targetRules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingNetworkConnectivityConfigEgressConfig_CustomerFacingTargetRuleSchema: z.ZodType =
  z
    .object({
      azurePrivateEndpointRules: z
        .array(
          z.lazy(
            () => marshalNetworkConnectivityConfigAzurePrivateEndpointRuleSchema
          )
        )
        .optional(),
      awsPrivateEndpointRules: z
        .array(
          z.lazy(
            () => marshalNetworkConnectivityConfigAwsPrivateEndpointRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      azure_private_endpoint_rules: d.azurePrivateEndpointRules,
      aws_private_endpoint_rules: d.awsPrivateEndpointRules,
    }));

export const marshalEgressNetworkPolicySchema: z.ZodType = z
  .object({
    networkAccess: z
      .lazy(() => marshalEgressNetworkPolicy_NetworkAccessPolicySchema)
      .optional(),
  })
  .transform(d => ({
    network_access: d.networkAccess,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicySchema: z.ZodType = z
  .object({
    restrictionMode: z.string().optional(),
    allowedInternetDestinations: z
      .array(
        z.lazy(
          () =>
            marshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema
        )
      )
      .optional(),
    allowedStorageDestinations: z
      .array(
        z.lazy(
          () =>
            marshalEgressNetworkPolicy_NetworkAccessPolicy_StorageDestinationSchema
        )
      )
      .optional(),
    policyEnforcement: z
      .lazy(
        () =>
          marshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema
      )
      .optional(),
    blockedInternetDestinations: z
      .array(
        z.lazy(
          () =>
            marshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema
        )
      )
      .optional(),
    allowedDatabricksDestinations: z
      .array(
        z.lazy(
          () =>
            marshalEgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestinationSchema
        )
      )
      .optional(),
  })
  .transform(d => ({
    restriction_mode: d.restrictionMode,
    allowed_internet_destinations: d.allowedInternetDestinations,
    allowed_storage_destinations: d.allowedStorageDestinations,
    policy_enforcement: d.policyEnforcement,
    blocked_internet_destinations: d.blockedInternetDestinations,
    allowed_databricks_destinations: d.allowedDatabricksDestinations,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicy_DatabricksDestinationSchema: z.ZodType =
  z
    .object({
      workspaceIds: z.array(z.bigint()).optional(),
    })
    .transform(d => ({
      workspace_ids: d.workspaceIds,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicy_InternetDestinationSchema: z.ZodType =
  z
    .object({
      destination: z.string().optional(),
      internetDestinationType: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
      internet_destination_type: d.internetDestinationType,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema: z.ZodType =
  z
    .object({
      enforcementMode: z.string().optional(),
      dryRunModeProductFilter: z.array(z.string()).optional(),
    })
    .transform(d => ({
      enforcement_mode: d.enforcementMode,
      dry_run_mode_product_filter: d.dryRunModeProductFilter,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicy_StorageDestinationSchema: z.ZodType =
  z
    .object({
      bucketName: z.string().optional(),
      region: z.string().optional(),
      storageDestinationType: z.string().optional(),
      azureStorageAccount: z.string().optional(),
      azureStorageService: z.string().optional(),
    })
    .transform(d => ({
      bucket_name: d.bucketName,
      region: d.region,
      storage_destination_type: d.storageDestinationType,
      azure_storage_account: d.azureStorageAccount,
      azure_storage_service: d.azureStorageService,
    }));

export const marshalEndpointSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    endpointId: z.string().optional(),
    accountId: z.string().optional(),
    displayName: z.string().optional(),
    useCase: z.string().optional(),
    region: z.string().optional(),
    state: z.string().optional(),
    endpointInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('azurePrivateEndpointInfo'),
          azurePrivateEndpointInfo: z.lazy(
            () => marshalAzurePrivateEndpointInfoSchema
          ),
        }),
      ])
      .optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    endpoint_id: d.endpointId,
    account_id: d.accountId,
    display_name: d.displayName,
    use_case: d.useCase,
    region: d.region,
    state: d.state,
    ...(d.endpointInfo?.$case === 'azurePrivateEndpointInfo' && {
      azure_private_endpoint_info: d.endpointInfo.azurePrivateEndpointInfo,
    }),
    create_time: d.createTime,
  }));

export const marshalGcpEndpointSchema: z.ZodType = z
  .object({
    pscEndpointUri: z.string().optional(),
    targetServices: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('serviceAttachment'),
          serviceAttachment: z.string(),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    psc_endpoint_uri: d.pscEndpointUri,
    ...(d.targetServices?.$case === 'serviceAttachment' && {
      service_attachment: d.targetServices.serviceAttachment,
    }),
  }));

export const marshalGcpNetworkInfoSchema: z.ZodType = z
  .object({
    networkProjectId: z.string().optional(),
    vpcId: z.string().optional(),
    subnetId: z.string().optional(),
    subnetRegion: z.string().optional(),
    podIpRangeName: z.string().optional(),
    serviceIpRangeName: z.string().optional(),
  })
  .transform(d => ({
    network_project_id: d.networkProjectId,
    vpc_id: d.vpcId,
    subnet_id: d.subnetId,
    subnet_region: d.subnetRegion,
    pod_ip_range_name: d.podIpRangeName,
    service_ip_range_name: d.serviceIpRangeName,
  }));

export const marshalGcpVpcEndpointInfoSchema: z.ZodType = z
  .object({
    pscConnectionId: z.string().optional(),
    projectId: z.string().optional(),
    pscEndpointName: z.string().optional(),
    endpointRegion: z.string().optional(),
    serviceAttachmentId: z.string().optional(),
  })
  .transform(d => ({
    psc_connection_id: d.pscConnectionId,
    project_id: d.projectId,
    psc_endpoint_name: d.pscEndpointName,
    endpoint_region: d.endpointRegion,
    service_attachment_id: d.serviceAttachmentId,
  }));

export const marshalIngressNetworkPolicySchema: z.ZodType = z
  .object({
    publicAccess: z
      .lazy(() => marshalIngressNetworkPolicy_PublicAccessSchema)
      .optional(),
    privateAccess: z
      .lazy(() => marshalIngressNetworkPolicy_PrivateAccessSchema)
      .optional(),
    crossWorkspaceAccess: z
      .lazy(() => marshalIngressNetworkPolicy_CrossWorkspaceAccessSchema)
      .optional(),
  })
  .transform(d => ({
    public_access: d.publicAccess,
    private_access: d.privateAccess,
    cross_workspace_access: d.crossWorkspaceAccess,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AccountApiDestinationSchema: z.ZodType =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scopeQualifier: z.string().optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scope_qualifier: d.scopeQualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AccountDatabricksOneDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AccountUiDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AppsRuntimeDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AuthenticationSchema: z.ZodType = z
  .object({
    identityType: z.string().optional(),
    identities: z
      .array(
        z.lazy(() => marshalIngressNetworkPolicy_AuthenticationIdentitySchema)
      )
      .optional(),
  })
  .transform(d => ({
    identity_type: d.identityType,
    identities: d.identities,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_AuthenticationIdentitySchema: z.ZodType =
  z
    .object({
      principalType: z.string().optional(),
      principalId: z.bigint().optional(),
    })
    .transform(d => ({
      principal_type: d.principalType,
      principal_id: d.principalId,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_CrossWorkspaceAccessSchema: z.ZodType =
  z
    .object({
      restrictionMode: z.string().optional(),
      denyRules: z
        .array(
          z.lazy(
            () => marshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
      allowRules: z
        .array(
          z.lazy(
            () => marshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      restriction_mode: d.restrictionMode,
      deny_rules: d.denyRules,
      allow_rules: d.allowRules,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema: z.ZodType =
  z
    .object({
      origin: z
        .lazy(
          () => marshalIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema
        )
        .optional(),
      destination: z
        .lazy(() => marshalIngressNetworkPolicy_RequestDestinationSchema)
        .optional(),
      authentication: z
        .lazy(() => marshalIngressNetworkPolicy_AuthenticationSchema)
        .optional(),
      label: z.string().optional(),
    })
    .transform(d => ({
      origin: d.origin,
      destination: d.destination,
      authentication: d.authentication,
      label: d.label,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema: z.ZodType =
  z
    .object({
      source: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('allSourceWorkspaces'),
            allSourceWorkspaces: z.boolean(),
          }),
          z.object({
            $case: z.literal('selectedWorkspaces'),
            selectedWorkspaces: z.lazy(
              () => marshalIngressNetworkPolicy_WorkspaceIdListSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.source?.$case === 'allSourceWorkspaces' && {
        all_source_workspaces: d.source.allSourceWorkspaces,
      }),
      ...(d.source?.$case === 'selectedWorkspaces' && {
        selected_workspaces: d.source.selectedWorkspaces,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_EndpointsSchema: z.ZodType = z
  .object({
    endpointIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    endpoint_ids: d.endpointIds,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_IpRangesSchema: z.ZodType = z
  .object({
    ipRanges: z.array(z.string()).optional(),
  })
  .transform(d => ({
    ip_ranges: d.ipRanges,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_LakebaseRuntimeDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PrivateAccessSchema: z.ZodType = z
  .object({
    restrictionMode: z.string().optional(),
    denyRules: z
      .array(z.lazy(() => marshalIngressNetworkPolicy_PrivateIngressRuleSchema))
      .optional(),
    allowRules: z
      .array(z.lazy(() => marshalIngressNetworkPolicy_PrivateIngressRuleSchema))
      .optional(),
  })
  .transform(d => ({
    restriction_mode: d.restrictionMode,
    deny_rules: d.denyRules,
    allow_rules: d.allowRules,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PrivateIngressRuleSchema: z.ZodType = z
  .object({
    origin: z
      .lazy(() => marshalIngressNetworkPolicy_PrivateRequestOriginSchema)
      .optional(),
    destination: z
      .lazy(() => marshalIngressNetworkPolicy_RequestDestinationSchema)
      .optional(),
    authentication: z
      .lazy(() => marshalIngressNetworkPolicy_AuthenticationSchema)
      .optional(),
    label: z.string().optional(),
  })
  .transform(d => ({
    origin: d.origin,
    destination: d.destination,
    authentication: d.authentication,
    label: d.label,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PrivateRequestOriginSchema: z.ZodType =
  z
    .object({
      source: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('endpoints'),
            endpoints: z.lazy(
              () => marshalIngressNetworkPolicy_EndpointsSchema
            ),
          }),
          z.object({
            $case: z.literal('allRegisteredEndpoints'),
            allRegisteredEndpoints: z.boolean(),
          }),
          z.object({
            $case: z.literal('azureWorkspacePrivateLink'),
            azureWorkspacePrivateLink: z.boolean(),
          }),
          z.object({
            $case: z.literal('allPrivateAccess'),
            allPrivateAccess: z.boolean(),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.source?.$case === 'endpoints' && {endpoints: d.source.endpoints}),
      ...(d.source?.$case === 'allRegisteredEndpoints' && {
        all_registered_endpoints: d.source.allRegisteredEndpoints,
      }),
      ...(d.source?.$case === 'azureWorkspacePrivateLink' && {
        azure_workspace_private_link: d.source.azureWorkspacePrivateLink,
      }),
      ...(d.source?.$case === 'allPrivateAccess' && {
        all_private_access: d.source.allPrivateAccess,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PublicAccessSchema: z.ZodType = z
  .object({
    restrictionMode: z.string().optional(),
    denyRules: z
      .array(z.lazy(() => marshalIngressNetworkPolicy_PublicIngressRuleSchema))
      .optional(),
    allowRules: z
      .array(z.lazy(() => marshalIngressNetworkPolicy_PublicIngressRuleSchema))
      .optional(),
  })
  .transform(d => ({
    restriction_mode: d.restrictionMode,
    deny_rules: d.denyRules,
    allow_rules: d.allowRules,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PublicIngressRuleSchema: z.ZodType = z
  .object({
    origin: z
      .lazy(() => marshalIngressNetworkPolicy_PublicRequestOriginSchema)
      .optional(),
    destination: z
      .lazy(() => marshalIngressNetworkPolicy_RequestDestinationSchema)
      .optional(),
    authentication: z
      .lazy(() => marshalIngressNetworkPolicy_AuthenticationSchema)
      .optional(),
    label: z.string().optional(),
  })
  .transform(d => ({
    origin: d.origin,
    destination: d.destination,
    authentication: d.authentication,
    label: d.label,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_PublicRequestOriginSchema: z.ZodType =
  z
    .object({
      source: z
        .discriminatedUnion('$case', [
          z.object({$case: z.literal('allIpRanges'), allIpRanges: z.boolean()}),
          z.object({
            $case: z.literal('includedIpRanges'),
            includedIpRanges: z.lazy(
              () => marshalIngressNetworkPolicy_IpRangesSchema
            ),
          }),
          z.object({
            $case: z.literal('excludedIpRanges'),
            excludedIpRanges: z.lazy(
              () => marshalIngressNetworkPolicy_IpRangesSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.source?.$case === 'allIpRanges' && {
        all_ip_ranges: d.source.allIpRanges,
      }),
      ...(d.source?.$case === 'includedIpRanges' && {
        included_ip_ranges: d.source.includedIpRanges,
      }),
      ...(d.source?.$case === 'excludedIpRanges' && {
        excluded_ip_ranges: d.source.excludedIpRanges,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_RequestDestinationSchema: z.ZodType = z
  .object({
    allDestinations: z.boolean().optional(),
    workspaceUi: z
      .lazy(() => marshalIngressNetworkPolicy_WorkspaceUiDestinationSchema)
      .optional(),
    workspaceApi: z
      .lazy(() => marshalIngressNetworkPolicy_WorkspaceApiDestinationSchema)
      .optional(),
    appsRuntime: z
      .lazy(() => marshalIngressNetworkPolicy_AppsRuntimeDestinationSchema)
      .optional(),
    lakebaseRuntime: z
      .lazy(() => marshalIngressNetworkPolicy_LakebaseRuntimeDestinationSchema)
      .optional(),
    accountUi: z
      .lazy(() => marshalIngressNetworkPolicy_AccountUiDestinationSchema)
      .optional(),
    accountApi: z
      .lazy(() => marshalIngressNetworkPolicy_AccountApiDestinationSchema)
      .optional(),
    accountDatabricksOne: z
      .lazy(
        () => marshalIngressNetworkPolicy_AccountDatabricksOneDestinationSchema
      )
      .optional(),
  })
  .transform(d => ({
    all_destinations: d.allDestinations,
    workspace_ui: d.workspaceUi,
    workspace_api: d.workspaceApi,
    apps_runtime: d.appsRuntime,
    lakebase_runtime: d.lakebaseRuntime,
    account_ui: d.accountUi,
    account_api: d.accountApi,
    account_databricks_one: d.accountDatabricksOne,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_WorkspaceApiDestinationSchema: z.ZodType =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scopeQualifier: z.string().optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scope_qualifier: d.scopeQualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_WorkspaceIdListSchema: z.ZodType = z
  .object({
    workspaceIds: z.array(z.bigint()).optional(),
  })
  .transform(d => ({
    workspace_ids: d.workspaceIds,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalIngressNetworkPolicy_WorkspaceUiDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

export const marshalNetworkConnectivityConfigAwsPrivateEndpointRuleSchema: z.ZodType =
  z
    .object({
      ruleId: z.string().optional(),
      networkConnectivityConfigId: z.string().optional(),
      accountId: z.string().optional(),
      endpointService: z.string().optional(),
      domainNames: z.array(z.string()).optional(),
      resourceNames: z.array(z.string()).optional(),
      vpcEndpointId: z.string().optional(),
      connectionState: z.string().optional(),
      creationTime: z.bigint().optional(),
      updatedTime: z.bigint().optional(),
      deactivated: z.boolean().optional(),
      deactivatedAt: z.bigint().optional(),
      enabled: z.boolean().optional(),
      errorMessage: z.string().optional(),
    })
    .transform(d => ({
      rule_id: d.ruleId,
      network_connectivity_config_id: d.networkConnectivityConfigId,
      account_id: d.accountId,
      endpoint_service: d.endpointService,
      domain_names: d.domainNames,
      resource_names: d.resourceNames,
      vpc_endpoint_id: d.vpcEndpointId,
      connection_state: d.connectionState,
      creation_time: d.creationTime,
      updated_time: d.updatedTime,
      deactivated: d.deactivated,
      deactivated_at: d.deactivatedAt,
      enabled: d.enabled,
      error_message: d.errorMessage,
    }));

export const marshalNetworkConnectivityConfigAzurePrivateEndpointRuleSchema: z.ZodType =
  z
    .object({
      ruleId: z.string().optional(),
      networkConnectivityConfigId: z.string().optional(),
      resourceId: z.string().optional(),
      groupId: z.string().optional(),
      endpointName: z.string().optional(),
      connectionState: z.string().optional(),
      creationTime: z.bigint().optional(),
      updatedTime: z.bigint().optional(),
      deactivated: z.boolean().optional(),
      deactivatedAt: z.bigint().optional(),
      domainNames: z.array(z.string()).optional(),
      errorMessage: z.string().optional(),
    })
    .transform(d => ({
      rule_id: d.ruleId,
      network_connectivity_config_id: d.networkConnectivityConfigId,
      resource_id: d.resourceId,
      group_id: d.groupId,
      endpoint_name: d.endpointName,
      connection_state: d.connectionState,
      creation_time: d.creationTime,
      updated_time: d.updatedTime,
      deactivated: d.deactivated,
      deactivated_at: d.deactivatedAt,
      domain_names: d.domainNames,
      error_message: d.errorMessage,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalNetworkConnectivityConfigEgressConfig_DefaultRuleSchema: z.ZodType =
  z
    .object({
      azureServiceEndpointRule: z
        .lazy(
          () =>
            marshalNetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleSchema
        )
        .optional(),
      awsStableIpRule: z
        .lazy(
          () =>
            marshalNetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleSchema
        )
        .optional(),
    })
    .transform(d => ({
      azure_service_endpoint_rule: d.azureServiceEndpointRule,
      aws_stable_ip_rule: d.awsStableIpRule,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalNetworkConnectivityConfigEgressConfig_DefaultRule_AwsStableIpRuleSchema: z.ZodType =
  z
    .object({
      cidrBlocks: z.array(z.string()).optional(),
    })
    .transform(d => ({
      cidr_blocks: d.cidrBlocks,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalNetworkConnectivityConfigEgressConfig_DefaultRule_AzureServiceEndpointRuleSchema: z.ZodType =
  z
    .object({
      targetRegion: z.string().optional(),
      targetServices: z.array(z.string()).optional(),
      subnets: z.array(z.string()).optional(),
    })
    .transform(d => ({
      target_region: d.targetRegion,
      target_services: d.targetServices,
      subnets: d.subnets,
    }));

export const marshalNetworkVpcEndpointsSchema: z.ZodType = z
  .object({
    restApi: z.array(z.string()).optional(),
    dataplaneRelay: z.array(z.string()).optional(),
  })
  .transform(d => ({
    rest_api: d.restApi,
    dataplane_relay: d.dataplaneRelay,
  }));

export const marshalPrivateAccessSettingsSchema: z.ZodType = z
  .object({
    privateAccessSettingsId: z.string().optional(),
    accountId: z.string().optional(),
    privateAccessSettingsName: z.string().optional(),
    region: z.string().optional(),
    publicAccessEnabled: z.boolean().optional(),
    privateAccessLevel: z.string().optional(),
    allowedVpcEndpointIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    private_access_settings_id: d.privateAccessSettingsId,
    account_id: d.accountId,
    private_access_settings_name: d.privateAccessSettingsName,
    region: d.region,
    public_access_enabled: d.publicAccessEnabled,
    private_access_level: d.privateAccessLevel,
    allowed_vpc_endpoint_ids: d.allowedVpcEndpointIds,
  }));

export const marshalReplaceAccountIpAccessListRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    list_id: d.listId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
    enabled: d.enabled,
  }));

export const marshalReplaceIpAccessListRequestSchema: z.ZodType = z
  .object({
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    list_id: d.listId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
    enabled: d.enabled,
  }));

export const marshalUpdateAccountIpAccessListRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    list_id: d.listId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
    enabled: d.enabled,
  }));

export const marshalUpdateIpAccessListRequestSchema: z.ZodType = z
  .object({
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.string().optional(),
    ipAddresses: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    list_id: d.listId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
    enabled: d.enabled,
  }));

export const marshalUpdatePrivateEndpointRuleSchema: z.ZodType = z
  .object({
    ruleId: z.string().optional(),
    networkConnectivityConfigId: z.string().optional(),
    connectionState: z.string().optional(),
    domainNames: z.array(z.string()).optional(),
    creationTime: z.bigint().optional(),
    updatedTime: z.bigint().optional(),
    deactivated: z.boolean().optional(),
    deactivatedAt: z.bigint().optional(),
    errorMessage: z.string().optional(),
    resourceId: z.string().optional(),
    groupId: z.string().optional(),
    endpointName: z.string().optional(),
    accountId: z.string().optional(),
    endpointService: z.string().optional(),
    resourceNames: z.array(z.string()).optional(),
    vpcEndpointId: z.string().optional(),
    enabled: z.boolean().optional(),
    endpoint: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('gcpEndpoint'),
          gcpEndpoint: z.lazy(() => marshalGcpEndpointSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    rule_id: d.ruleId,
    network_connectivity_config_id: d.networkConnectivityConfigId,
    connection_state: d.connectionState,
    domain_names: d.domainNames,
    creation_time: d.creationTime,
    updated_time: d.updatedTime,
    deactivated: d.deactivated,
    deactivated_at: d.deactivatedAt,
    error_message: d.errorMessage,
    resource_id: d.resourceId,
    group_id: d.groupId,
    endpoint_name: d.endpointName,
    account_id: d.accountId,
    endpoint_service: d.endpointService,
    resource_names: d.resourceNames,
    vpc_endpoint_id: d.vpcEndpointId,
    enabled: d.enabled,
    ...(d.endpoint?.$case === 'gcpEndpoint' && {
      gcp_endpoint: d.endpoint.gcpEndpoint,
    }),
  }));

export const marshalWorkspaceNetworkOptionSchema: z.ZodType = z
  .object({
    networkPolicyId: z.string().optional(),
    workspaceId: z.bigint().optional(),
  })
  .transform(d => ({
    network_policy_id: d.networkPolicyId,
    workspace_id: d.workspaceId,
  }));

const gcpEndpointFieldMaskSchema: FieldMaskSchema = {
  pscEndpointUri: {wire: 'psc_endpoint_uri'},
  serviceAttachment: {wire: 'service_attachment'},
};

const updatePrivateEndpointRuleFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  connectionState: {wire: 'connection_state'},
  creationTime: {wire: 'creation_time'},
  deactivated: {wire: 'deactivated'},
  deactivatedAt: {wire: 'deactivated_at'},
  domainNames: {wire: 'domain_names'},
  enabled: {wire: 'enabled'},
  endpointName: {wire: 'endpoint_name'},
  endpointService: {wire: 'endpoint_service'},
  errorMessage: {wire: 'error_message'},
  gcpEndpoint: {
    wire: 'gcp_endpoint',
    children: () => gcpEndpointFieldMaskSchema,
  },
  groupId: {wire: 'group_id'},
  networkConnectivityConfigId: {wire: 'network_connectivity_config_id'},
  resourceId: {wire: 'resource_id'},
  resourceNames: {wire: 'resource_names'},
  ruleId: {wire: 'rule_id'},
  updatedTime: {wire: 'updated_time'},
  vpcEndpointId: {wire: 'vpc_endpoint_id'},
};

export function updatePrivateEndpointRuleFieldMask(
  ...paths: string[]
): FieldMask<UpdatePrivateEndpointRule> {
  return FieldMask.build<UpdatePrivateEndpointRule>(
    paths,
    updatePrivateEndpointRuleFieldMaskSchema
  );
}
