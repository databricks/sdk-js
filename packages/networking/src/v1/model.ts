// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export enum CustomerFacingVpcEndpointUseCase {
  WORKSPACE_ACCESS = 'WORKSPACE_ACCESS',
  DATAPLANE_RELAY_ACCESS = 'DATAPLANE_RELAY_ACCESS',
  /** General access, replaces WORKSPACE_ACCESS in customer-facing API. */
  GENERAL_ACCESS = 'GENERAL_ACCESS',
}

/**
 * The target resources that are supported by Network Connectivity Config.
 * Note: some egress types can support general types that are not defined in EgressResourceType.
 * E.g.: Azure private endpoint supports private link enabled Azure services.
 */
export enum EgressResourceType {
  EGRESS_RESOURCE_TYPE_UNSPECIFIED = 'EGRESS_RESOURCE_TYPE_UNSPECIFIED',
  AZURE_BLOB_STORAGE = 'AZURE_BLOB_STORAGE',
}

export enum EndpointState {
  /** The endpoint is pending approval. */
  PENDING = 'PENDING',
  /** The endpoint has been approved and is ready for use. */
  APPROVED = 'APPROVED',
  /** The endpoint encountered some issues during setup. */
  FAILED = 'FAILED',
  /** The endpoint was once established but later disconnected. This endpoint doesn't provide connectivity. */
  DISCONNECTED = 'DISCONNECTED',
}

/**
 * Type of IP access list. Valid values are as follows and are case-sensitive:
 *
 * * `ALLOW`: An allow list. Include this IP or range.
 * * `BLOCK`: A block list. Exclude this IP or range. IP addresses in the block list are excluded even if they are included in an allow list.
 */
export enum IpAccessListType {
  ALLOW = 'ALLOW',
  /** Blocks the associated CIDRs. */
  BLOCK = 'BLOCK',
}

export enum PrivateAccessLevel {
  /** Only specifically listed endpoints can access my workspace */
  ENDPOINT = 'ENDPOINT',
  /** Only endpoints in the same account can access my workspace */
  ACCOUNT = 'ACCOUNT',
}

export enum VpcStatus {
  VALID = 'VALID',
  BROKEN = 'BROKEN',
  UNATTACHED = 'UNATTACHED',
  /** Some optional tests are failing for this Vpc, see NetworkWarning for more information */
  WARNED = 'WARNED',
}

/**
 * Type of IP access list. Valid values are as follows and are case-sensitive:
 *
 * * `ALLOW`: An allow list. Include this IP or range.
 * * `BLOCK`: A block list. Exclude this IP or range. IP addresses in the block list are excluded even if they are included in an allow list.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum AccountIpAccessListType_IpAccessListType {
  /** Allows the associated CIDRs. */
  ALLOW = 'ALLOW',
  /** Blocks the associated CIDRs. */
  BLOCK = 'BLOCK',
}

/**
 * Qualifies the breadth of API access permitted by an ingress network policy rule.
 * API_SCOPE_QUALIFIER_READ narrows matching to read-only variants of the listed scopes;
 * API_SCOPE_QUALIFIER_ALL matches any scope. When unset, scopes match exactly as listed.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CustomerFacingIngressNetworkPolicy_ApiScopeQualifier {
  /** Narrows matching to read-only variants of the listed scopes (e.g. GET/HEAD requests). */
  API_SCOPE_QUALIFIER_READ = 'API_SCOPE_QUALIFIER_READ',
  /** Matches any scope regardless of access level. */
  API_SCOPE_QUALIFIER_ALL = 'API_SCOPE_QUALIFIER_ALL',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CustomerFacingIngressNetworkPolicy_Authentication_IdentityType {
  IDENTITY_TYPE_UNSPECIFIED = 'IDENTITY_TYPE_UNSPECIFIED',
  IDENTITY_TYPE_ALL_USERS = 'IDENTITY_TYPE_ALL_USERS',
  IDENTITY_TYPE_ALL_SERVICE_PRINCIPALS = 'IDENTITY_TYPE_ALL_SERVICE_PRINCIPALS',
  IDENTITY_TYPE_SELECTED_IDENTITIES = 'IDENTITY_TYPE_SELECTED_IDENTITIES',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CustomerFacingIngressNetworkPolicy_AuthenticationIdentity_PrincipalType {
  PRINCIPAL_TYPE_UNSPECIFIED = 'PRINCIPAL_TYPE_UNSPECIFIED',
  PRINCIPAL_TYPE_USER = 'PRINCIPAL_TYPE_USER',
  PRINCIPAL_TYPE_SERVICE_PRINCIPAL = 'PRINCIPAL_TYPE_SERVICE_PRINCIPAL',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CustomerFacingIngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode {
  FULL_ACCESS = 'FULL_ACCESS',
  RESTRICTED_ACCESS = 'RESTRICTED_ACCESS',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CustomerFacingIngressNetworkPolicy_PrivateAccess_RestrictionMode {
  ALLOW_ALL_REGISTERED_ENDPOINTS = 'ALLOW_ALL_REGISTERED_ENDPOINTS',
  RESTRICTED_ACCESS = 'RESTRICTED_ACCESS',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CustomerFacingIngressNetworkPolicy_PublicAccess_RestrictionMode {
  FULL_ACCESS = 'FULL_ACCESS',
  RESTRICTED_ACCESS = 'RESTRICTED_ACCESS',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState {
  PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED = 'PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED',
  /** The endpoint has been approved and is ready to use in your serverless compute resources. */
  ESTABLISHED = 'ESTABLISHED',
  /** Connection was rejected by the private link resource owner. */
  REJECTED = 'REJECTED',
  /**
   * Connection was removed by the private link resource owner, the private endpoint becomes informative and should
   * be deleted for clean-up.
   */
  DISCONNECTED = 'DISCONNECTED',
  /** If the endpoint is created but not approved in 14 days, it is EXPIRED. */
  EXPIRED = 'EXPIRED',
  /** The endpoint has been created and pending approval. */
  PENDING = 'PENDING',
  /** The endpoint creation is in progress. */
  CREATING = 'CREATING',
  /** The endpoint creation failed. */
  CREATE_FAILED = 'CREATE_FAILED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum CustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState {
  PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED = 'PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED',
  /** The endpoint has been created and pending approval. */
  INIT = 'INIT',
  /** The endpoint has been approved and is ready to use in your serverless compute resources. */
  ESTABLISHED = 'ESTABLISHED',
  /** Connection was rejected by the private link resource owner. */
  REJECTED = 'REJECTED',
  /**
   * Connection was removed by the private link resource owner, the private endpoint becomes informative and should
   * be deleted for clean-up.
   */
  DISCONNECTED = 'DISCONNECTED',
  /** If the endpoint was created but not approved in 14 days, it will be EXPIRED. */
  EXPIRED = 'EXPIRED',
  /** The endpoint has been created and pending approval. */
  PENDING = 'PENDING',
  /** The endpoint creation is in progress. */
  CREATING = 'CREATING',
  /** The endpoint creation failed. */
  CREATE_FAILED = 'CREATE_FAILED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType {
  INTERNET_DESTINATION_TYPE_UNSPECIFIED = 'INTERNET_DESTINATION_TYPE_UNSPECIFIED',
  /** This is defined as `FQDN` in settings-policy/api/proto/messages.proto. Translation is done in accounts-lake-net-manager/src/util/NetworkPolicySettingUtil.scala. */
  DNS_NAME = 'DNS_NAME',
}

/** The values should match the list of workloads used in networkconfig.proto */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter {
  DRY_RUN_MODE_PRODUCT_FILTER_UNSPECIFIED = 'DRY_RUN_MODE_PRODUCT_FILTER_UNSPECIFIED',
  /** SQL Warehouse product */
  DBSQL = 'DBSQL',
  /** Machine Learning serving product */
  ML_SERVING = 'ML_SERVING',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode {
  ENFORCEMENT_MODE_UNSPECIFIED = 'ENFORCEMENT_MODE_UNSPECIFIED',
  /** Blocks traffic that violates network policy. This is the default mode. */
  ENFORCED = 'ENFORCED',
  /** Logs violations without blocking traffic. Useful for testing policies before enforcement. */
  DRY_RUN = 'DRY_RUN',
}

/**
 * At which level can <Databricks> and <Databricks> managed compute access Internet.
 * FULL_ACCESS: <Databricks> can access Internet. No blocking rules will apply.
 * RESTRICTED_ACCESS: <Databricks> can only access explicitly allowed internet and storage destinations,
 * as well as UC connections and external locations.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode {
  RESTRICTION_MODE_UNSPECIFIED = 'RESTRICTION_MODE_UNSPECIFIED',
  FULL_ACCESS = 'FULL_ACCESS',
  RESTRICTED_ACCESS = 'RESTRICTED_ACCESS',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType {
  STORAGE_DESTINATION_TYPE_UNSPECIFIED = 'STORAGE_DESTINATION_TYPE_UNSPECIFIED',
  /**
   * AWS_S3 can be used both for direct AWS S3 access and for cross-cloud access from Azure and GCP
   * When used in an Azure/GCP context, this indicates cross-cloud access from Azure/GCP to the specified S3 bucket
   */
  AWS_S3 = 'AWS_S3',
  AZURE_STORAGE = 'AZURE_STORAGE',
  GOOGLE_CLOUD_STORAGE = 'GOOGLE_CLOUD_STORAGE',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum EndpointUseCase_EndpointUseCase {
  /** service-direct frontend private link connectivity. */
  SERVICE_DIRECT = 'SERVICE_DIRECT',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum NccPrivateEndpointRule_PrivateLinkConnectionState {
  PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED = 'PRIVATE_LINK_CONNECTION_STATE_UNSPECIFIED',
  /** The endpoint has been approved and is ready to use in your serverless compute resources. */
  ESTABLISHED = 'ESTABLISHED',
  /** Connection was rejected by the private link resource owner. */
  REJECTED = 'REJECTED',
  /**
   * Connection was removed by the private link resource owner, the private endpoint becomes informative and should
   * be deleted for clean-up.
   */
  DISCONNECTED = 'DISCONNECTED',
  /** If the endpoint was created but not approved in 14 days, it will be EXPIRED. */
  EXPIRED = 'EXPIRED',
  /** The endpoint has been created and pending approval. */
  PENDING = 'PENDING',
  /** The endpoint creation is in progress. */
  CREATING = 'CREATING',
  /** The endpoint creation failed. */
  CREATE_FAILED = 'CREATE_FAILED',
}

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
  ingress?: CustomerFacingIngressNetworkPolicy | undefined;
  /**
   * The ingress policy for dry run mode. Dry run will always run even if the request
   * is allowed by the ingress policy. When this field is set, the policy will be evaluated
   * and emit logs only without blocking requests.
   */
  ingressDryRun?: CustomerFacingIngressNetworkPolicy | undefined;
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
export interface CreateIpAccessList {
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
        gcpVpcEndpointInfo: CustomerFacingGcpVpcEndpointInfo;
      }
    | undefined;
}

export interface CustomerFacingGcpVpcEndpointInfo {
  pscConnectionId?: string | undefined;
  projectId?: string | undefined;
  pscEndpointName?: string | undefined;
  endpointRegion?: string | undefined;
  serviceAttachmentId?: string | undefined;
}

/**
 * This proto is under development.
 * The network policies applying for ingress traffic.
 * Any changes here should also be synced to estore/namespaces/lakehousenetworkmanager/latest.proto.
 */
export interface CustomerFacingIngressNetworkPolicy {
  /**
   * The network policy restrictions for public access to the workspace.
   * Configures how public internet traffic is allowed or denied access.
   */
  publicAccess?: CustomerFacingIngressNetworkPolicy_PublicAccess | undefined;
  /**
   * The network policy restrictions for private access to the workspace.
   * Configures how registered private endpoints are allowed or denied access.
   */
  privateAccess?: CustomerFacingIngressNetworkPolicy_PrivateAccess | undefined;
  crossWorkspaceAccess?:
    | CustomerFacingIngressNetworkPolicy_CrossWorkspaceAccess
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_AccountApiDestination {
  scopes?: string[] | undefined;
  /** Qualifies the breadth of API access for the listed scopes. See ApiScopeQualifier. */
  scopeQualifier?:
    | CustomerFacingIngressNetworkPolicy_ApiScopeQualifier
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_AccountDatabricksOneDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_AccountUiDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_AppsRuntimeDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_Authentication {
  identityType?:
    | CustomerFacingIngressNetworkPolicy_Authentication_IdentityType
    | undefined;
  /** Valid only when IdentityType is IDENTITY_TYPE_SELECTED_IDENTITIES. */
  identities?:
    | CustomerFacingIngressNetworkPolicy_AuthenticationIdentity[]
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_AuthenticationIdentity {
  principalType?:
    | CustomerFacingIngressNetworkPolicy_AuthenticationIdentity_PrincipalType
    | undefined;
  principalId?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_CrossWorkspaceAccess {
  restrictionMode?:
    | CustomerFacingIngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode
    | undefined;
  denyRules?:
    | CustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRule[]
    | undefined;
  allowRules?:
    | CustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRule[]
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRule {
  origin?:
    | CustomerFacingIngressNetworkPolicy_CrossWorkspaceRequestOrigin
    | undefined;
  destination?:
    | CustomerFacingIngressNetworkPolicy_RequestDestination
    | undefined;
  authentication?:
    | CustomerFacingIngressNetworkPolicy_Authentication
    | undefined;
  /** The label for this ingress rule. */
  label?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_CrossWorkspaceRequestOrigin {
  source?:
    | {
        $case: 'allSourceWorkspaces';
        /** Matches all source workspaces. */
        allSourceWorkspaces: boolean;
      }
    | {
        $case: 'selectedWorkspaces';
        /** Specific source workspace IDs to match. */
        selectedWorkspaces: CustomerFacingIngressNetworkPolicy_WorkspaceIdList;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_Endpoints {
  endpointIds?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_IpRanges {
  /** We only support IPv4 and IPv4 CIDR notation for now. */
  ipRanges?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_LakebaseRuntimeDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_PrivateAccess {
  restrictionMode?:
    | CustomerFacingIngressNetworkPolicy_PrivateAccess_RestrictionMode
    | undefined;
  denyRules?:
    | CustomerFacingIngressNetworkPolicy_PrivateIngressRule[]
    | undefined;
  allowRules?:
    | CustomerFacingIngressNetworkPolicy_PrivateIngressRule[]
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_PrivateIngressRule {
  origin?: CustomerFacingIngressNetworkPolicy_PrivateRequestOrigin | undefined;
  destination?:
    | CustomerFacingIngressNetworkPolicy_RequestDestination
    | undefined;
  authentication?:
    | CustomerFacingIngressNetworkPolicy_Authentication
    | undefined;
  /** The label for this ingress rule. */
  label?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_PrivateRequestOrigin {
  source?:
    | {
        $case: 'endpoints';
        endpoints: CustomerFacingIngressNetworkPolicy_Endpoints;
      }
    | {$case: 'allRegisteredEndpoints'; allRegisteredEndpoints: boolean}
    | {$case: 'azureWorkspacePrivateLink'; azureWorkspacePrivateLink: boolean}
    | {$case: 'allPrivateAccess'; allPrivateAccess: boolean}
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_PublicAccess {
  restrictionMode?:
    | CustomerFacingIngressNetworkPolicy_PublicAccess_RestrictionMode
    | undefined;
  denyRules?:
    | CustomerFacingIngressNetworkPolicy_PublicIngressRule[]
    | undefined;
  allowRules?:
    | CustomerFacingIngressNetworkPolicy_PublicIngressRule[]
    | undefined;
}

/**
 * An ingress rule is enforced when a request satisfies all
 * specified attributes — including request origin, destination, and authentication.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_PublicIngressRule {
  origin?: CustomerFacingIngressNetworkPolicy_PublicRequestOrigin | undefined;
  destination?:
    | CustomerFacingIngressNetworkPolicy_RequestDestination
    | undefined;
  authentication?:
    | CustomerFacingIngressNetworkPolicy_Authentication
    | undefined;
  /** The label for this ingress rule. */
  label?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_PublicRequestOrigin {
  source?:
    | {
        $case: 'allIpRanges';
        /** Matches all IPv4 and IPv6 ranges (both public and private). */
        allIpRanges: boolean;
      }
    | {
        $case: 'includedIpRanges';
        /** Will not allow IP ranges with private IPs. */
        includedIpRanges: CustomerFacingIngressNetworkPolicy_IpRanges;
      }
    | {
        $case: 'excludedIpRanges';
        /** Excluded means: all public IP ranges except this one. */
        excludedIpRanges: CustomerFacingIngressNetworkPolicy_IpRanges;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_RequestDestination {
  /**
   * When true, match all destinations, no other destination fields can be set.
   * When not set or false, at least one specific destination must be provided.
   */
  allDestinations?: boolean | undefined;
  workspaceUi?:
    | CustomerFacingIngressNetworkPolicy_WorkspaceUiDestination
    | undefined;
  workspaceApi?:
    | CustomerFacingIngressNetworkPolicy_WorkspaceApiDestination
    | undefined;
  appsRuntime?:
    | CustomerFacingIngressNetworkPolicy_AppsRuntimeDestination
    | undefined;
  lakebaseRuntime?:
    | CustomerFacingIngressNetworkPolicy_LakebaseRuntimeDestination
    | undefined;
  accountUi?:
    | CustomerFacingIngressNetworkPolicy_AccountUiDestination
    | undefined;
  accountApi?:
    | CustomerFacingIngressNetworkPolicy_AccountApiDestination
    | undefined;
  /**
   * Account DatabricksOne destination is not supported.
   * DO NOT change the stage of this destination past PRIVATE_PREVIEW.
   */
  accountDatabricksOne?:
    | CustomerFacingIngressNetworkPolicy_AccountDatabricksOneDestination
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_WorkspaceApiDestination {
  scopes?: string[] | undefined;
  /** Qualifies the breadth of API access for the listed scopes. See ApiScopeQualifier. */
  scopeQualifier?:
    | CustomerFacingIngressNetworkPolicy_ApiScopeQualifier
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_WorkspaceIdList {
  workspaceIds?: bigint[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CustomerFacingIngressNetworkPolicy_WorkspaceUiDestination {
  /** Must be set to true. */
  allDestinations?: boolean | undefined;
}

/** Properties of the new network connectivity configuration. */
export interface CustomerFacingNetworkConnectivityConfig {
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
export interface CustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRule {
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
    | CustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState
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
export interface CustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRule {
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
    | CustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState
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
    | CustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRule[]
    | undefined;
  /** AWS private endpoint rule controls the AWS private endpoint based egress rules. */
  awsPrivateEndpointRules?:
    | CustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRule[]
    | undefined;
}

/** * */
export interface CustomerFacingPrivateAccessSettings {
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

/** * */
export interface CustomerFacingVpcEndpoint {
  /** Databricks VPC endpoint ID. This is the <Databricks>-specific name of the VPC endpoint. Do not confuse this with the `aws_vpc_endpoint_id`, which is the ID within AWS of the VPC endpoint. */
  vpcEndpointId?: string | undefined;
  /**
   * The <Databricks> account ID that hosts the VPC endpoint configuration.
   * TODO - This may signal an OpenAPI diff; it does not show up in the generated spec
   */
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
  useCase?: CustomerFacingVpcEndpointUseCase | undefined;
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
        gcpVpcEndpointInfo: CustomerFacingGcpVpcEndpointInfo;
      }
    | undefined;
}

/** Next Id: 3 */
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

export interface DeleteIpAccessList {
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

/**
 * The network policies applying for egress traffic.
 * This message is used by the UI/REST API. We translate this message to the format expected by the
 * dataplane in Lakehouse Network Manager (for the format expected by the dataplane, see networkconfig.textproto).
 * This policy should be consistent with [[com.databricks.api.proto.settingspolicy.EgressNetworkPolicy]].
 * Details see API-design: https://docs.google.com/document/d/1DKWO_FpZMCY4cF2O62LpwII1lx8gsnDGG-qgE3t3TOA/
 */
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
   * (-- For now it only supports Azure PL, but in future we can support other clouds and more use cases (e.g. public endpoint) --)
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

/** Next Id: 3 */
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

export interface GetIpAccessList {
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

/** Next Id: 2 */
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
  items?: CustomerFacingNetworkConnectivityConfig[] | undefined;
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
  privateAccessSettings?: CustomerFacingPrivateAccessSettings[] | undefined;
}

export interface ListVpcEndpointRequest {
  accountId?: string | undefined;
}

export interface ListVpcEndpointResponse {
  vpcEndpoints?: CustomerFacingVpcEndpoint[] | undefined;
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
export interface ReplaceIpAccessList {
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
export interface UpdateIpAccessList {
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
  customerFacingPrivateAccessSettings?:
    | CustomerFacingPrivateAccessSettings
    | undefined;
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
      list_type: z.enum(AccountIpAccessListType_IpAccessListType).optional(),
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
      ingress: z
        .lazy(() => unmarshalCustomerFacingIngressNetworkPolicySchema)
        .optional(),
      ingress_dry_run: z
        .lazy(() => unmarshalCustomerFacingIngressNetworkPolicySchema)
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

export const unmarshalCustomerFacingGcpVpcEndpointInfoSchema: z.ZodType<CustomerFacingGcpVpcEndpointInfo> =
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

export const unmarshalCustomerFacingIngressNetworkPolicySchema: z.ZodType<CustomerFacingIngressNetworkPolicy> =
  z
    .object({
      public_access: z
        .lazy(
          () => unmarshalCustomerFacingIngressNetworkPolicy_PublicAccessSchema
        )
        .optional(),
      private_access: z
        .lazy(
          () => unmarshalCustomerFacingIngressNetworkPolicy_PrivateAccessSchema
        )
        .optional(),
      cross_workspace_access: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceAccessSchema
        )
        .optional(),
    })
    .transform(d => ({
      publicAccess: d.public_access,
      privateAccess: d.private_access,
      crossWorkspaceAccess: d.cross_workspace_access,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_AccountApiDestinationSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_AccountApiDestination> =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scope_qualifier: z
        .enum(CustomerFacingIngressNetworkPolicy_ApiScopeQualifier)
        .optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scopeQualifier: d.scope_qualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_AccountDatabricksOneDestinationSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_AccountDatabricksOneDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_AccountUiDestinationSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_AccountUiDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_AppsRuntimeDestinationSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_AppsRuntimeDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_AuthenticationSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_Authentication> =
  z
    .object({
      identity_type: z
        .enum(CustomerFacingIngressNetworkPolicy_Authentication_IdentityType)
        .optional(),
      identities: z
        .array(
          z.lazy(
            () =>
              unmarshalCustomerFacingIngressNetworkPolicy_AuthenticationIdentitySchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      identityType: d.identity_type,
      identities: d.identities,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_AuthenticationIdentitySchema: z.ZodType<CustomerFacingIngressNetworkPolicy_AuthenticationIdentity> =
  z
    .object({
      principal_type: z
        .enum(
          CustomerFacingIngressNetworkPolicy_AuthenticationIdentity_PrincipalType
        )
        .optional(),
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
export const unmarshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceAccessSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_CrossWorkspaceAccess> =
  z
    .object({
      restriction_mode: z
        .enum(
          CustomerFacingIngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode
        )
        .optional(),
      deny_rules: z
        .array(
          z.lazy(
            () =>
              unmarshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
      allow_rules: z
        .array(
          z.lazy(
            () =>
              unmarshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
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
export const unmarshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRule> =
  z
    .object({
      origin: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema
        )
        .optional(),
      destination: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_RequestDestinationSchema
        )
        .optional(),
      authentication: z
        .lazy(
          () => unmarshalCustomerFacingIngressNetworkPolicy_AuthenticationSchema
        )
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
export const unmarshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_CrossWorkspaceRequestOrigin> =
  z
    .object({
      all_source_workspaces: z.boolean().optional(),
      selected_workspaces: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_WorkspaceIdListSchema
        )
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
export const unmarshalCustomerFacingIngressNetworkPolicy_EndpointsSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_Endpoints> =
  z
    .object({
      endpoint_ids: z.array(z.string()).optional(),
    })
    .transform(d => ({
      endpointIds: d.endpoint_ids,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_IpRangesSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_IpRanges> =
  z
    .object({
      ip_ranges: z.array(z.string()).optional(),
    })
    .transform(d => ({
      ipRanges: d.ip_ranges,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_LakebaseRuntimeDestinationSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_LakebaseRuntimeDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_PrivateAccessSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_PrivateAccess> =
  z
    .object({
      restriction_mode: z
        .enum(CustomerFacingIngressNetworkPolicy_PrivateAccess_RestrictionMode)
        .optional(),
      deny_rules: z
        .array(
          z.lazy(
            () =>
              unmarshalCustomerFacingIngressNetworkPolicy_PrivateIngressRuleSchema
          )
        )
        .optional(),
      allow_rules: z
        .array(
          z.lazy(
            () =>
              unmarshalCustomerFacingIngressNetworkPolicy_PrivateIngressRuleSchema
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
export const unmarshalCustomerFacingIngressNetworkPolicy_PrivateIngressRuleSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_PrivateIngressRule> =
  z
    .object({
      origin: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_PrivateRequestOriginSchema
        )
        .optional(),
      destination: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_RequestDestinationSchema
        )
        .optional(),
      authentication: z
        .lazy(
          () => unmarshalCustomerFacingIngressNetworkPolicy_AuthenticationSchema
        )
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
export const unmarshalCustomerFacingIngressNetworkPolicy_PrivateRequestOriginSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_PrivateRequestOrigin> =
  z
    .object({
      endpoints: z
        .lazy(() => unmarshalCustomerFacingIngressNetworkPolicy_EndpointsSchema)
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
export const unmarshalCustomerFacingIngressNetworkPolicy_PublicAccessSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_PublicAccess> =
  z
    .object({
      restriction_mode: z
        .enum(CustomerFacingIngressNetworkPolicy_PublicAccess_RestrictionMode)
        .optional(),
      deny_rules: z
        .array(
          z.lazy(
            () =>
              unmarshalCustomerFacingIngressNetworkPolicy_PublicIngressRuleSchema
          )
        )
        .optional(),
      allow_rules: z
        .array(
          z.lazy(
            () =>
              unmarshalCustomerFacingIngressNetworkPolicy_PublicIngressRuleSchema
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
export const unmarshalCustomerFacingIngressNetworkPolicy_PublicIngressRuleSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_PublicIngressRule> =
  z
    .object({
      origin: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_PublicRequestOriginSchema
        )
        .optional(),
      destination: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_RequestDestinationSchema
        )
        .optional(),
      authentication: z
        .lazy(
          () => unmarshalCustomerFacingIngressNetworkPolicy_AuthenticationSchema
        )
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
export const unmarshalCustomerFacingIngressNetworkPolicy_PublicRequestOriginSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_PublicRequestOrigin> =
  z
    .object({
      all_ip_ranges: z.boolean().optional(),
      included_ip_ranges: z
        .lazy(() => unmarshalCustomerFacingIngressNetworkPolicy_IpRangesSchema)
        .optional(),
      excluded_ip_ranges: z
        .lazy(() => unmarshalCustomerFacingIngressNetworkPolicy_IpRangesSchema)
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
export const unmarshalCustomerFacingIngressNetworkPolicy_RequestDestinationSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_RequestDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
      workspace_ui: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_WorkspaceUiDestinationSchema
        )
        .optional(),
      workspace_api: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_WorkspaceApiDestinationSchema
        )
        .optional(),
      apps_runtime: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_AppsRuntimeDestinationSchema
        )
        .optional(),
      lakebase_runtime: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_LakebaseRuntimeDestinationSchema
        )
        .optional(),
      account_ui: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_AccountUiDestinationSchema
        )
        .optional(),
      account_api: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_AccountApiDestinationSchema
        )
        .optional(),
      account_databricks_one: z
        .lazy(
          () =>
            unmarshalCustomerFacingIngressNetworkPolicy_AccountDatabricksOneDestinationSchema
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
export const unmarshalCustomerFacingIngressNetworkPolicy_WorkspaceApiDestinationSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_WorkspaceApiDestination> =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scope_qualifier: z
        .enum(CustomerFacingIngressNetworkPolicy_ApiScopeQualifier)
        .optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scopeQualifier: d.scope_qualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCustomerFacingIngressNetworkPolicy_WorkspaceIdListSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_WorkspaceIdList> =
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
export const unmarshalCustomerFacingIngressNetworkPolicy_WorkspaceUiDestinationSchema: z.ZodType<CustomerFacingIngressNetworkPolicy_WorkspaceUiDestination> =
  z
    .object({
      all_destinations: z.boolean().optional(),
    })
    .transform(d => ({
      allDestinations: d.all_destinations,
    }));

export const unmarshalCustomerFacingNetworkConnectivityConfigSchema: z.ZodType<CustomerFacingNetworkConnectivityConfig> =
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

export const unmarshalCustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRuleSchema: z.ZodType<CustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRule> =
  z
    .object({
      rule_id: z.string().optional(),
      network_connectivity_config_id: z.string().optional(),
      account_id: z.string().optional(),
      endpoint_service: z.string().optional(),
      domain_names: z.array(z.string()).optional(),
      resource_names: z.array(z.string()).optional(),
      vpc_endpoint_id: z.string().optional(),
      connection_state: z
        .enum(
          CustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState
        )
        .optional(),
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

export const unmarshalCustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRuleSchema: z.ZodType<CustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRule> =
  z
    .object({
      rule_id: z.string().optional(),
      network_connectivity_config_id: z.string().optional(),
      resource_id: z.string().optional(),
      group_id: z.string().optional(),
      endpoint_name: z.string().optional(),
      connection_state: z
        .enum(
          CustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState
        )
        .optional(),
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
              unmarshalCustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRuleSchema
          )
        )
        .optional(),
      aws_private_endpoint_rules: z
        .array(
          z.lazy(
            () =>
              unmarshalCustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      azurePrivateEndpointRules: d.azure_private_endpoint_rules,
      awsPrivateEndpointRules: d.aws_private_endpoint_rules,
    }));

export const unmarshalCustomerFacingPrivateAccessSettingsSchema: z.ZodType<CustomerFacingPrivateAccessSettings> =
  z
    .object({
      private_access_settings_id: z.string().optional(),
      account_id: z.string().optional(),
      private_access_settings_name: z.string().optional(),
      region: z.string().optional(),
      public_access_enabled: z.boolean().optional(),
      private_access_level: z.enum(PrivateAccessLevel).optional(),
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

export const unmarshalCustomerFacingVpcEndpointSchema: z.ZodType<CustomerFacingVpcEndpoint> =
  z
    .object({
      vpc_endpoint_id: z.string().optional(),
      account_id: z.string().optional(),
      vpc_endpoint_name: z.string().optional(),
      aws_vpc_endpoint_id: z.string().optional(),
      aws_endpoint_service_id: z.string().optional(),
      use_case: z.enum(CustomerFacingVpcEndpointUseCase).optional(),
      region: z.string().optional(),
      aws_account_id: z.string().optional(),
      state: z.string().optional(),
      gcp_vpc_endpoint_info: z
        .lazy(() => unmarshalCustomerFacingGcpVpcEndpointInfoSchema)
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
      restriction_mode: z
        .enum(EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode)
        .optional(),
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
      internet_destination_type: z
        .enum(
          EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType
        )
        .optional(),
    })
    .transform(d => ({
      destination: d.destination,
      internetDestinationType: d.internet_destination_type,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema: z.ZodType<EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement> =
  z
    .object({
      enforcement_mode: z
        .enum(
          EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode
        )
        .optional(),
      dry_run_mode_product_filter: z
        .array(
          z.enum(
            EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter
          )
        )
        .optional(),
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
      storage_destination_type: z
        .enum(
          EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType
        )
        .optional(),
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
    use_case: z.enum(EndpointUseCase_EndpointUseCase).optional(),
    region: z.string().optional(),
    state: z.enum(EndpointState).optional(),
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

export const unmarshalIpAccessListSchema: z.ZodType<IpAccessList> = z
  .object({
    list_id: z.string().optional(),
    label: z.string().optional(),
    ip_addresses: z.array(z.string()).optional(),
    address_count: z.number().optional(),
    list_type: z.enum(IpAccessListType).optional(),
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
        .array(
          z.lazy(() => unmarshalCustomerFacingNetworkConnectivityConfigSchema)
        )
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
      connection_state: z
        .enum(NccPrivateEndpointRule_PrivateLinkConnectionState)
        .optional(),
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
    vpc_status: z.enum(VpcStatus).optional(),
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
      target_services: z.array(z.enum(EgressResourceType)).optional(),
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
    ingress: z
      .lazy(() => marshalCustomerFacingIngressNetworkPolicySchema)
      .optional(),
    ingressDryRun: z
      .lazy(() => marshalCustomerFacingIngressNetworkPolicySchema)
      .optional(),
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
    listType: z.enum(AccountIpAccessListType_IpAccessListType).optional(),
    ipAddresses: z.array(z.string()).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    label: d.label,
    list_type: d.listType,
    ip_addresses: d.ipAddresses,
  }));

export const marshalCreateIpAccessListSchema: z.ZodType = z
  .object({
    label: z.string().optional(),
    listType: z.enum(IpAccessListType).optional(),
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
    privateAccessLevel: z.enum(PrivateAccessLevel).optional(),
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
    connectionState: z
      .enum(NccPrivateEndpointRule_PrivateLinkConnectionState)
      .optional(),
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
          gcpVpcEndpointInfo: z.lazy(
            () => marshalCustomerFacingGcpVpcEndpointInfoSchema
          ),
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

export const marshalCustomerFacingGcpVpcEndpointInfoSchema: z.ZodType = z
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

export const marshalCustomerFacingIngressNetworkPolicySchema: z.ZodType = z
  .object({
    publicAccess: z
      .lazy(() => marshalCustomerFacingIngressNetworkPolicy_PublicAccessSchema)
      .optional(),
    privateAccess: z
      .lazy(() => marshalCustomerFacingIngressNetworkPolicy_PrivateAccessSchema)
      .optional(),
    crossWorkspaceAccess: z
      .lazy(
        () =>
          marshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceAccessSchema
      )
      .optional(),
  })
  .transform(d => ({
    public_access: d.publicAccess,
    private_access: d.privateAccess,
    cross_workspace_access: d.crossWorkspaceAccess,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_AccountApiDestinationSchema: z.ZodType =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scopeQualifier: z
        .enum(CustomerFacingIngressNetworkPolicy_ApiScopeQualifier)
        .optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scope_qualifier: d.scopeQualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_AccountDatabricksOneDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_AccountUiDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_AppsRuntimeDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_AuthenticationSchema: z.ZodType =
  z
    .object({
      identityType: z
        .enum(CustomerFacingIngressNetworkPolicy_Authentication_IdentityType)
        .optional(),
      identities: z
        .array(
          z.lazy(
            () =>
              marshalCustomerFacingIngressNetworkPolicy_AuthenticationIdentitySchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      identity_type: d.identityType,
      identities: d.identities,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_AuthenticationIdentitySchema: z.ZodType =
  z
    .object({
      principalType: z
        .enum(
          CustomerFacingIngressNetworkPolicy_AuthenticationIdentity_PrincipalType
        )
        .optional(),
      principalId: z.bigint().optional(),
    })
    .transform(d => ({
      principal_type: d.principalType,
      principal_id: d.principalId,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceAccessSchema: z.ZodType =
  z
    .object({
      restrictionMode: z
        .enum(
          CustomerFacingIngressNetworkPolicy_CrossWorkspaceAccess_RestrictionMode
        )
        .optional(),
      denyRules: z
        .array(
          z.lazy(
            () =>
              marshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
          )
        )
        .optional(),
      allowRules: z
        .array(
          z.lazy(
            () =>
              marshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema
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
export const marshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceIngressRuleSchema: z.ZodType =
  z
    .object({
      origin: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema
        )
        .optional(),
      destination: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_RequestDestinationSchema
        )
        .optional(),
      authentication: z
        .lazy(
          () => marshalCustomerFacingIngressNetworkPolicy_AuthenticationSchema
        )
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
export const marshalCustomerFacingIngressNetworkPolicy_CrossWorkspaceRequestOriginSchema: z.ZodType =
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
              () =>
                marshalCustomerFacingIngressNetworkPolicy_WorkspaceIdListSchema
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
export const marshalCustomerFacingIngressNetworkPolicy_EndpointsSchema: z.ZodType =
  z
    .object({
      endpointIds: z.array(z.string()).optional(),
    })
    .transform(d => ({
      endpoint_ids: d.endpointIds,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_IpRangesSchema: z.ZodType =
  z
    .object({
      ipRanges: z.array(z.string()).optional(),
    })
    .transform(d => ({
      ip_ranges: d.ipRanges,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_LakebaseRuntimeDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_PrivateAccessSchema: z.ZodType =
  z
    .object({
      restrictionMode: z
        .enum(CustomerFacingIngressNetworkPolicy_PrivateAccess_RestrictionMode)
        .optional(),
      denyRules: z
        .array(
          z.lazy(
            () =>
              marshalCustomerFacingIngressNetworkPolicy_PrivateIngressRuleSchema
          )
        )
        .optional(),
      allowRules: z
        .array(
          z.lazy(
            () =>
              marshalCustomerFacingIngressNetworkPolicy_PrivateIngressRuleSchema
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
export const marshalCustomerFacingIngressNetworkPolicy_PrivateIngressRuleSchema: z.ZodType =
  z
    .object({
      origin: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_PrivateRequestOriginSchema
        )
        .optional(),
      destination: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_RequestDestinationSchema
        )
        .optional(),
      authentication: z
        .lazy(
          () => marshalCustomerFacingIngressNetworkPolicy_AuthenticationSchema
        )
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
export const marshalCustomerFacingIngressNetworkPolicy_PrivateRequestOriginSchema: z.ZodType =
  z
    .object({
      source: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('endpoints'),
            endpoints: z.lazy(
              () => marshalCustomerFacingIngressNetworkPolicy_EndpointsSchema
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
export const marshalCustomerFacingIngressNetworkPolicy_PublicAccessSchema: z.ZodType =
  z
    .object({
      restrictionMode: z
        .enum(CustomerFacingIngressNetworkPolicy_PublicAccess_RestrictionMode)
        .optional(),
      denyRules: z
        .array(
          z.lazy(
            () =>
              marshalCustomerFacingIngressNetworkPolicy_PublicIngressRuleSchema
          )
        )
        .optional(),
      allowRules: z
        .array(
          z.lazy(
            () =>
              marshalCustomerFacingIngressNetworkPolicy_PublicIngressRuleSchema
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
export const marshalCustomerFacingIngressNetworkPolicy_PublicIngressRuleSchema: z.ZodType =
  z
    .object({
      origin: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_PublicRequestOriginSchema
        )
        .optional(),
      destination: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_RequestDestinationSchema
        )
        .optional(),
      authentication: z
        .lazy(
          () => marshalCustomerFacingIngressNetworkPolicy_AuthenticationSchema
        )
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
export const marshalCustomerFacingIngressNetworkPolicy_PublicRequestOriginSchema: z.ZodType =
  z
    .object({
      source: z
        .discriminatedUnion('$case', [
          z.object({$case: z.literal('allIpRanges'), allIpRanges: z.boolean()}),
          z.object({
            $case: z.literal('includedIpRanges'),
            includedIpRanges: z.lazy(
              () => marshalCustomerFacingIngressNetworkPolicy_IpRangesSchema
            ),
          }),
          z.object({
            $case: z.literal('excludedIpRanges'),
            excludedIpRanges: z.lazy(
              () => marshalCustomerFacingIngressNetworkPolicy_IpRangesSchema
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
export const marshalCustomerFacingIngressNetworkPolicy_RequestDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
      workspaceUi: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_WorkspaceUiDestinationSchema
        )
        .optional(),
      workspaceApi: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_WorkspaceApiDestinationSchema
        )
        .optional(),
      appsRuntime: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_AppsRuntimeDestinationSchema
        )
        .optional(),
      lakebaseRuntime: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_LakebaseRuntimeDestinationSchema
        )
        .optional(),
      accountUi: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_AccountUiDestinationSchema
        )
        .optional(),
      accountApi: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_AccountApiDestinationSchema
        )
        .optional(),
      accountDatabricksOne: z
        .lazy(
          () =>
            marshalCustomerFacingIngressNetworkPolicy_AccountDatabricksOneDestinationSchema
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
export const marshalCustomerFacingIngressNetworkPolicy_WorkspaceApiDestinationSchema: z.ZodType =
  z
    .object({
      scopes: z.array(z.string()).optional(),
      scopeQualifier: z
        .enum(CustomerFacingIngressNetworkPolicy_ApiScopeQualifier)
        .optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
      scope_qualifier: d.scopeQualifier,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_WorkspaceIdListSchema: z.ZodType =
  z
    .object({
      workspaceIds: z.array(z.bigint()).optional(),
    })
    .transform(d => ({
      workspace_ids: d.workspaceIds,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCustomerFacingIngressNetworkPolicy_WorkspaceUiDestinationSchema: z.ZodType =
  z
    .object({
      allDestinations: z.boolean().optional(),
    })
    .transform(d => ({
      all_destinations: d.allDestinations,
    }));

export const marshalCustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRuleSchema: z.ZodType =
  z
    .object({
      ruleId: z.string().optional(),
      networkConnectivityConfigId: z.string().optional(),
      accountId: z.string().optional(),
      endpointService: z.string().optional(),
      domainNames: z.array(z.string()).optional(),
      resourceNames: z.array(z.string()).optional(),
      vpcEndpointId: z.string().optional(),
      connectionState: z
        .enum(
          CustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRule_PrivateLinkConnectionState
        )
        .optional(),
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

export const marshalCustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRuleSchema: z.ZodType =
  z
    .object({
      ruleId: z.string().optional(),
      networkConnectivityConfigId: z.string().optional(),
      resourceId: z.string().optional(),
      groupId: z.string().optional(),
      endpointName: z.string().optional(),
      connectionState: z
        .enum(
          CustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRule_PrivateLinkConnectionState
        )
        .optional(),
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
            () =>
              marshalCustomerFacingNetworkConnectivityConfigAzurePrivateEndpointRuleSchema
          )
        )
        .optional(),
      awsPrivateEndpointRules: z
        .array(
          z.lazy(
            () =>
              marshalCustomerFacingNetworkConnectivityConfigAwsPrivateEndpointRuleSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      azure_private_endpoint_rules: d.azurePrivateEndpointRules,
      aws_private_endpoint_rules: d.awsPrivateEndpointRules,
    }));

export const marshalCustomerFacingPrivateAccessSettingsSchema: z.ZodType = z
  .object({
    privateAccessSettingsId: z.string().optional(),
    accountId: z.string().optional(),
    privateAccessSettingsName: z.string().optional(),
    region: z.string().optional(),
    publicAccessEnabled: z.boolean().optional(),
    privateAccessLevel: z.enum(PrivateAccessLevel).optional(),
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
    restrictionMode: z
      .enum(EgressNetworkPolicy_NetworkAccessPolicy_RestrictionMode)
      .optional(),
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
      internetDestinationType: z
        .enum(
          EgressNetworkPolicy_NetworkAccessPolicy_InternetDestination_InternetDestinationType
        )
        .optional(),
    })
    .transform(d => ({
      destination: d.destination,
      internet_destination_type: d.internetDestinationType,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalEgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcementSchema: z.ZodType =
  z
    .object({
      enforcementMode: z
        .enum(
          EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_EnforcementMode
        )
        .optional(),
      dryRunModeProductFilter: z
        .array(
          z.enum(
            EgressNetworkPolicy_NetworkAccessPolicy_PolicyEnforcement_DryRunModeProductFilter
          )
        )
        .optional(),
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
      storageDestinationType: z
        .enum(
          EgressNetworkPolicy_NetworkAccessPolicy_StorageDestination_StorageDestinationType
        )
        .optional(),
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
    useCase: z.enum(EndpointUseCase_EndpointUseCase).optional(),
    region: z.string().optional(),
    state: z.enum(EndpointState).optional(),
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
      targetServices: z.array(z.enum(EgressResourceType)).optional(),
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

export const marshalReplaceAccountIpAccessListRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.enum(AccountIpAccessListType_IpAccessListType).optional(),
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

export const marshalReplaceIpAccessListSchema: z.ZodType = z
  .object({
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.enum(IpAccessListType).optional(),
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
    listType: z.enum(AccountIpAccessListType_IpAccessListType).optional(),
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

export const marshalUpdateIpAccessListSchema: z.ZodType = z
  .object({
    listId: z.string().optional(),
    label: z.string().optional(),
    listType: z.enum(IpAccessListType).optional(),
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
    connectionState: z
      .enum(NccPrivateEndpointRule_PrivateLinkConnectionState)
      .optional(),
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
