// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/**
 * Corresponds to compute mode defined here:
 * https://src.dev.databricks.com/databricks/universe@9076536b18479afd639d1c1f9dd5a59f72215e69/-/blob/central/api/common.proto?L872
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ComputeMode = {
  /** Classic + Serverless */
  HYBRID: 'HYBRID',
  /** Serverless-only. */
  SERVERLESS: 'SERVERLESS',
} as const;
export type ComputeMode =
  | (typeof ComputeMode)[keyof typeof ComputeMode]
  | (string & {});

/**
 * Specifies the network connectivity types for the GKE nodes and the GKE master network.
 *
 * Set to `PRIVATE_NODE_PUBLIC_MASTER` for a private GKE cluster
 * for the workspace. The GKE nodes will not have public IPs.
 *
 * Set to `PUBLIC_NODE_PUBLIC_MASTER` for a public GKE cluster.
 * The nodes of a public GKE cluster have public IP addresses.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const GkeConnectivityType = {
  /**
   * The nodes of the GKE cluster will have private IP only. GKE master will still have a public
   * IP.
   */
  PRIVATE_NODE_PUBLIC_MASTER: 'PRIVATE_NODE_PUBLIC_MASTER',
  /** The GKE cluster will have public IPs for both its nodes and GKE master. */
  PUBLIC_NODE_PUBLIC_MASTER: 'PUBLIC_NODE_PUBLIC_MASTER',
} as const;
export type GkeConnectivityType =
  | (typeof GkeConnectivityType)[keyof typeof GkeConnectivityType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PricingTier = {
  /** unknown tier that signifies invalid tier values */
  UNKNOWN: 'UNKNOWN',
  /** Tier for CE workspaces */
  COMMUNITY_EDITION: 'COMMUNITY_EDITION',
  /** Standard pricing tier that maps to STANDARD_TIER feature tier */
  STANDARD: 'STANDARD',
  /** Premium pricing tier that maps to STANDARD_W_SEC_TIER feature tier */
  PREMIUM: 'PREMIUM',
  /** Enterprise pricing tier that maps to ENTERPRISE_TIER_V2 feature tier */
  ENTERPRISE: 'ENTERPRISE',
  /** Dedicated pricing tier that maps to the DEDICATED feature tier */
  DEDICATED: 'DEDICATED',
} as const;
export type PricingTier =
  | (typeof PricingTier)[keyof typeof PricingTier]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const StorageMode = {
  /** The storage resources of the workspace are hosted by customers. */
  CUSTOMER_HOSTED: 'CUSTOMER_HOSTED',
  /** The storage resources of the workspace are hosted by Databricks. */
  DEFAULT_STORAGE: 'DEFAULT_STORAGE',
} as const;
export type StorageMode =
  | (typeof StorageMode)[keyof typeof StorageMode]
  | (string & {});

/**
 * The different statuses of a workspace. The following represents the current set of valid
 * transitions from status to status:
 * NOT_PROVISIONED
 * -> PROVISIONING
 * -> CANCELLED
 * PROVISIONING
 * -> RUNNING
 * -> FAILED
 * -> CANCELLED (note that this transition is disallowed in the MultiWorkspace Project)
 * RUNNING
 * -> PROVISIONING
 * -> BANNED
 * -> CANCELLED
 * FAILED
 * -> PROVISIONING
 * -> CANCELLED
 * BANNED
 * -> RUNNING
 * -> CANCELLED
 * Note that a transition from any state to itself is also valid.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const WorkspaceStatus = {
  /**
   * Status for workspaces that have been created but not provisioned yet. It is technically
   * possible for an Azure workspace to be in this state, but only for less than a second in almost
   * all cases, as it will almost immediately transition to PROVISIONING. AWS workspaces may be in
   * NOT_PROVISIONED state for much longer.
   */
  NOT_PROVISIONED: 'NOT_PROVISIONED',
  /** Status for workspaces being provisioned. */
  PROVISIONING: 'PROVISIONING',
  /** Status for running workspaces. */
  RUNNING: 'RUNNING',
  /**
   * Status for workspaces that have failed to be provisioned. This is currently an AWS-only state
   * since an Azure customer can easily retry to launch a workspace that failed to launch, whereas
   * this process is different in AWS.
   */
  FAILED: 'FAILED',
  /**
   * Status for banned workspaces. This is intended for use with CE workspaces, although there is no
   * code to enforce this restriction. These workspaces can be unbanned at a later time.
   */
  BANNED: 'BANNED',
  /** Status for cancelling workspaces. This state always comes before the CANCELLED status. */
  CANCELLING: 'CANCELLING',
} as const;
export type WorkspaceStatus =
  | (typeof WorkspaceStatus)[keyof typeof WorkspaceStatus]
  | (string & {});

export interface AzureWorkspaceInfo {
  /** Azure Resource Group name */
  resourceGroup?: string | undefined;
  /** Azure Subscription ID */
  subscriptionId?: string | undefined;
}

export interface CloudResourceContainer {
  cloudResourceContainer?:
    | {$case: 'gcp'; gcp: GcpCloudResourceContainer}
    | undefined;
}

export interface CreateWorkspaceRequest {
  accountId?: string | undefined;
  /** The human-readable name of the workspace. */
  workspaceName?: string | undefined;
  /**
   * The deployment name defines part of the subdomain for the workspace. The workspace URL for the web application and REST APIs is <workspace-deployment-name>.cloud.databricks.com. For example, if the deployment name is abcsales, your workspace URL will be https://abcsales.cloud.databricks.com. Hyphens are allowed. This property supports only the set of characters that are allowed in a subdomain.
   * To set this value, you must have a deployment name prefix. Contact your <Databricks> account team to add an account deployment name prefix to your account.
   * Workspace deployment names follow the account prefix and a hyphen. For example, if your account's deployment prefix is acme and the workspace deployment name is workspace-1, the JSON response for the deployment_name field becomes acme-workspace-1. The workspace URL would be acme-workspace-1.cloud.databricks.com.
   * You can also set the deployment_name to the reserved keyword EMPTY if you want the deployment name to only include the deployment prefix. For example, if your account's deployment prefix is acme and the workspace deployment name is EMPTY, the deployment_name becomes acme only and the workspace URL is acme.cloud.databricks.com.
   * This value must be unique across all non-deleted deployments across all AWS regions.
   * If a new workspace omits this property, the server generates a unique deployment name for you with the pattern dbc-xxxxxxxx-xxxx.
   */
  deploymentName?: string | undefined;
  awsRegion?: string | undefined;
  /** The Google Cloud region of the workspace data plane in your Google account (for example, `us-east4`). */
  location?: string | undefined;
  /**
   * DEPRECATED: This field is being ignored by the server and will be removed in the future.
   * The cloud name. This field always has the value `gcp`.
   */
  cloud?: string | undefined;
  pricingTier?: PricingTier | undefined;
  cloudResourceContainer?: CloudResourceContainer | undefined;
  /** ID of the workspace's credential configuration object. */
  credentialsId?: string | undefined;
  /** ID of the workspace's storage configuration object. */
  storageConfigurationId?: string | undefined;
  /** The ID of the workspace's network configuration object. To use AWS PrivateLink, this field is required. */
  networkId?: string | undefined;
  gcpManagedNetworkConfig?: GcpManagedNetworkConfig | undefined;
  gkeConfig?: GkeConfig | undefined;
  /**
   * ID of the workspace's private access settings object. Only used for PrivateLink. You must specify this ID if you are using [AWS PrivateLink](https://aws.amazon.com/privatelink/) for either front-end (user-to-workspace connection), back-end (data plane to control plane connection), or both connection types.
   * Before configuring PrivateLink, read the [<Databricks> article about PrivateLink](https://docs.databricks.com/administration-guide/cloud-configurations/aws/privatelink.html).",
   */
  privateAccessSettingsId?: string | undefined;
  /** The ID of the workspace's managed services encryption key configuration object. This is used to help protect and control access to the workspace's notebooks, secrets, Databricks SQL queries, and query history. The provided key configuration object property use_cases must contain MANAGED_SERVICES. */
  managedServicesCustomerManagedKeyId?: string | undefined;
  /** The ID of the workspace's storage encryption key configuration object. This is used to encrypt the workspace's root S3 bucket (root DBFS and system data) and, optionally, cluster EBS volumes. The provided key configuration object property use_cases must contain STORAGE. */
  storageCustomerManagedKeyId?: string | undefined;
  /**
   * The custom tags key-value pairing that is attached to this workspace. The key-value pair is a string of utf-8 characters. The
   * value can be an empty string, with maximum length of 255 characters. The key can be of maximum length of 127 characters, and cannot be empty.
   */
  customTags?: Record<string, string> | undefined;
  /**
   * If the compute mode is `SERVERLESS`, a serverless workspace is created that comes pre-configured with serverless compute and default storage, providing a fully-managed, enterprise-ready SaaS experience. This means you don't need to provide any resources managed by you, such as credentials, storage, or network.
   * If the compute mode is `HYBRID` (which is the default option), a classic workspace is created that uses customer-managed resources.
   */
  computeMode?: ComputeMode | undefined;
  /** The object ID of network connectivity config. Once assigned, the workspace serverless compute resources use the same set of stable IP CIDR blocks and optional private link to access your resources. */
  networkConnectivityConfigId?: string | undefined;
}

export interface DeleteWorkspaceRequest {
  workspaceId?: bigint | undefined;
  accountId?: string | undefined;
}

export interface GcpCloudResourceContainer {
  projectId?: string | undefined;
}

/**
 * The shared network config for GCP workspace.
 * This object has common network configurations that are network attributions of a workspace.
 * DEPRECATED. Use GkeConfig instead.
 */
export interface GcpCommonNetworkConfig {
  /** The type of network connectivity of the GKE cluster. */
  gkeConnectivityType?: GkeConnectivityType | undefined;
  /**
   * The IP range that will be used to allocate GKE cluster master resources from.
   * This field must not be set if gke_cluster_type=PUBLIC_NODE_PUBLIC_MASTER.
   */
  gkeClusterMasterIpRange?: string | undefined;
}

/** The network configuration for the workspace. */
export interface GcpManagedNetworkConfig {
  /**
   * The IP range which will be used to allocate GKE cluster nodes from.
   * Note: Pods, services and master IP range must be mutually exclusive.
   */
  subnetCidr?: string | undefined;
  /** The IP range that will be used to allocate GKE cluster Pods from. */
  gkeClusterPodIpRange?: string | undefined;
  /** The IP range that will be used to allocate GKE cluster Services from. */
  gkeClusterServiceIpRange?: string | undefined;
}

export interface GetWorkspaceRequest {
  workspaceId?: bigint | undefined;
  accountId?: string | undefined;
}

/** The configurations of the GKE cluster used by the GCP workspace. */
export interface GkeConfig {
  /** The type of network connectivity of the GKE cluster. */
  connectivityType?: GkeConnectivityType | undefined;
  /**
   * The IP range that will be used to allocate GKE cluster master resources from.
   * This field must not be set if gke_cluster_type=PUBLIC_NODE_PUBLIC_MASTER.
   */
  masterIpRange?: string | undefined;
}

export interface ListWorkspacesRequest {
  accountId?: string | undefined;
}

export interface ListWorkspacesResponse {
  workspaces?: Workspace[] | undefined;
}

export interface UpdateWorkspaceRequest {
  customerFacingWorkspace?: Workspace | undefined;
  updateMask?: FieldMask<Workspace> | undefined;
}

export interface Workspace {
  /** A unique integer ID for the workspace */
  workspaceId?: bigint | undefined;
  /** The human-readable name of the workspace. */
  workspaceName?: string | undefined;
  awsRegion?: string | undefined;
  /** Time in epoch milliseconds when the workspace was created. */
  creationTime?: bigint | undefined;
  deploymentName?: string | undefined;
  /** The status of a workspace */
  workspaceStatus?: WorkspaceStatus | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** ID of the workspace's credential configuration object. */
  credentialsId?: string | undefined;
  /** ID of the workspace's storage configuration object. */
  storageConfigurationId?: string | undefined;
  /** Message describing the current workspace status. */
  workspaceStatusMessage?: string | undefined;
  networkConfig?:
    | {
        $case: 'networkId';
        /**
         * If this workspace is BYO VPC, then the network_id will be populated. If this workspace is not
         * BYO VPC, then the network_id will be empty.
         */
        networkId: string;
      }
    | {
        $case: 'gcpManagedNetworkConfig';
        gcpManagedNetworkConfig: GcpManagedNetworkConfig;
      }
    | undefined;
  pricingTier?: PricingTier | undefined;
  /**
   * ID of the workspace's private access settings object. Only used for PrivateLink. You must specify this ID if you are using [AWS PrivateLink](https://aws.amazon.com/privatelink/) for either front-end (user-to-workspace connection), back-end (data plane to control plane connection), or both connection types.
   *
   * Before configuring PrivateLink, read the [<Databricks> article about PrivateLink](https://docs.databricks.com/administration-guide/cloud-configurations/aws/privatelink.html).",
   */
  privateAccessSettingsId?: string | undefined;
  /** ID of the key configuration for encrypting managed services. */
  managedServicesCustomerManagedKeyId?: string | undefined;
  /** ID of the key configuration for encrypting workspace storage. */
  storageCustomerManagedKeyId?: string | undefined;
  /** The Google Cloud region of the workspace data plane in your Google account (for example, `us-east4`). */
  location?: string | undefined;
  /** The cloud name. This field can have values like `azure`, `gcp`. */
  cloud?: string | undefined;
  /**
   * The network configuration for the workspace.
   *
   * DEPRECATED. Use `network_id` instead.
   */
  network?: WorkspaceNetwork | undefined;
  azureWorkspaceInfo?: AzureWorkspaceInfo | undefined;
  gkeConfig?: GkeConfig | undefined;
  cloudResourceContainer?: CloudResourceContainer | undefined;
  /**
   * The custom tags key-value pairing that is attached to this workspace. The key-value pair is a string of utf-8 characters. The value can be an empty string,
   * with maximum length of 255 characters. The key can be of maximum length of 127 characters, and cannot be empty.
   */
  customTags?: Record<string, string> | undefined;
  /** The object ID of network connectivity config. */
  networkConnectivityConfigId?: string | undefined;
  /** The storage mode of the workspace. */
  storageMode?: StorageMode | undefined;
  /** The compute mode of the workspace. */
  computeMode?: ComputeMode | undefined;
  /**
   * A client owned field used to indicate the workspace status that the client expects to be in.
   * For now this is only used to unblock Temporal workflow for GCP least privileged workspace.
   */
  expectedWorkspaceStatus?: WorkspaceStatus | undefined;
}

/** The network configuration for workspaces. */
export interface WorkspaceNetwork {
  network?:
    | {
        $case: 'gcpManagedNetworkConfig';
        /**
         * The mutually exclusive network deployment modes. The option decides which network mode the
         * workspace will use.
         * The network config for GCP workspace with <Databricks> managed network.
         * This object is input-only and will not be provided when listing workspaces.
         */
        gcpManagedNetworkConfig: GcpManagedNetworkConfig;
      }
    | {
        $case: 'networkId';
        /**
         * The ID of the network object, if the workspace is a BYOVPC workspace.
         * This should apply to workspaces on all clouds in internal services. In accounts-rest-api, user will use
         * workspace.network_id for input and output instead.
         * Currently (2021-06-19) the network ID is only used by GCP.
         */
        networkId: string;
      }
    | undefined;
  /**
   * The shared network config for GCP workspace.
   * This object has common network configurations that are network attributions of a workspace.
   * This object is input-only.
   */
  gcpCommonNetworkConfig?: GcpCommonNetworkConfig | undefined;
}

export const unmarshalAzureWorkspaceInfoSchema: z.ZodType<AzureWorkspaceInfo> =
  z
    .object({
      resource_group: z.string().optional(),
      subscription_id: z.string().optional(),
    })
    .transform(d => ({
      resourceGroup: d.resource_group,
      subscriptionId: d.subscription_id,
    }));

export const unmarshalCloudResourceContainerSchema: z.ZodType<CloudResourceContainer> =
  z
    .object({
      gcp: z.lazy(() => unmarshalGcpCloudResourceContainerSchema).optional(),
    })
    .transform(d => ({
      cloudResourceContainer:
        d.gcp !== undefined ? {$case: 'gcp' as const, gcp: d.gcp} : undefined,
    }));

export const unmarshalGcpCloudResourceContainerSchema: z.ZodType<GcpCloudResourceContainer> =
  z
    .object({
      project_id: z.string().optional(),
    })
    .transform(d => ({
      projectId: d.project_id,
    }));

export const unmarshalGcpCommonNetworkConfigSchema: z.ZodType<GcpCommonNetworkConfig> =
  z
    .object({
      gke_connectivity_type: z.string().optional(),
      gke_cluster_master_ip_range: z.string().optional(),
    })
    .transform(d => ({
      gkeConnectivityType: d.gke_connectivity_type,
      gkeClusterMasterIpRange: d.gke_cluster_master_ip_range,
    }));

export const unmarshalGcpManagedNetworkConfigSchema: z.ZodType<GcpManagedNetworkConfig> =
  z
    .object({
      subnet_cidr: z.string().optional(),
      gke_cluster_pod_ip_range: z.string().optional(),
      gke_cluster_service_ip_range: z.string().optional(),
    })
    .transform(d => ({
      subnetCidr: d.subnet_cidr,
      gkeClusterPodIpRange: d.gke_cluster_pod_ip_range,
      gkeClusterServiceIpRange: d.gke_cluster_service_ip_range,
    }));

export const unmarshalGkeConfigSchema: z.ZodType<GkeConfig> = z
  .object({
    connectivity_type: z.string().optional(),
    master_ip_range: z.string().optional(),
  })
  .transform(d => ({
    connectivityType: d.connectivity_type,
    masterIpRange: d.master_ip_range,
  }));

export const unmarshalWorkspaceSchema: z.ZodType<Workspace> = z
  .object({
    workspace_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    workspace_name: z.string().optional(),
    aws_region: z.string().optional(),
    creation_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    deployment_name: z.string().optional(),
    workspace_status: z.string().optional(),
    account_id: z.string().optional(),
    credentials_id: z.string().optional(),
    storage_configuration_id: z.string().optional(),
    workspace_status_message: z.string().optional(),
    network_id: z.string().optional(),
    gcp_managed_network_config: z
      .lazy(() => unmarshalGcpManagedNetworkConfigSchema)
      .optional(),
    pricing_tier: z.string().optional(),
    private_access_settings_id: z.string().optional(),
    managed_services_customer_managed_key_id: z.string().optional(),
    storage_customer_managed_key_id: z.string().optional(),
    location: z.string().optional(),
    cloud: z.string().optional(),
    network: z.lazy(() => unmarshalWorkspaceNetworkSchema).optional(),
    azure_workspace_info: z
      .lazy(() => unmarshalAzureWorkspaceInfoSchema)
      .optional(),
    gke_config: z.lazy(() => unmarshalGkeConfigSchema).optional(),
    cloud_resource_container: z
      .lazy(() => unmarshalCloudResourceContainerSchema)
      .optional(),
    custom_tags: z.record(z.string(), z.string()).optional(),
    network_connectivity_config_id: z.string().optional(),
    storage_mode: z.string().optional(),
    compute_mode: z.string().optional(),
    expected_workspace_status: z.string().optional(),
  })
  .transform(d => ({
    workspaceId: d.workspace_id,
    workspaceName: d.workspace_name,
    awsRegion: d.aws_region,
    creationTime: d.creation_time,
    deploymentName: d.deployment_name,
    workspaceStatus: d.workspace_status,
    accountId: d.account_id,
    credentialsId: d.credentials_id,
    storageConfigurationId: d.storage_configuration_id,
    workspaceStatusMessage: d.workspace_status_message,
    networkConfig:
      d.network_id !== undefined
        ? {$case: 'networkId' as const, networkId: d.network_id}
        : d.gcp_managed_network_config !== undefined
          ? {
              $case: 'gcpManagedNetworkConfig' as const,
              gcpManagedNetworkConfig: d.gcp_managed_network_config,
            }
          : undefined,
    pricingTier: d.pricing_tier,
    privateAccessSettingsId: d.private_access_settings_id,
    managedServicesCustomerManagedKeyId:
      d.managed_services_customer_managed_key_id,
    storageCustomerManagedKeyId: d.storage_customer_managed_key_id,
    location: d.location,
    cloud: d.cloud,
    network: d.network,
    azureWorkspaceInfo: d.azure_workspace_info,
    gkeConfig: d.gke_config,
    cloudResourceContainer: d.cloud_resource_container,
    customTags: d.custom_tags,
    networkConnectivityConfigId: d.network_connectivity_config_id,
    storageMode: d.storage_mode,
    computeMode: d.compute_mode,
    expectedWorkspaceStatus: d.expected_workspace_status,
  }));

export const unmarshalWorkspaceNetworkSchema: z.ZodType<WorkspaceNetwork> = z
  .object({
    gcp_managed_network_config: z
      .lazy(() => unmarshalGcpManagedNetworkConfigSchema)
      .optional(),
    network_id: z.string().optional(),
    gcp_common_network_config: z
      .lazy(() => unmarshalGcpCommonNetworkConfigSchema)
      .optional(),
  })
  .transform(d => ({
    network:
      d.gcp_managed_network_config !== undefined
        ? {
            $case: 'gcpManagedNetworkConfig' as const,
            gcpManagedNetworkConfig: d.gcp_managed_network_config,
          }
        : d.network_id !== undefined
          ? {$case: 'networkId' as const, networkId: d.network_id}
          : undefined,
    gcpCommonNetworkConfig: d.gcp_common_network_config,
  }));

export const marshalAzureWorkspaceInfoSchema: z.ZodType = z
  .object({
    resourceGroup: z.string().optional(),
    subscriptionId: z.string().optional(),
  })
  .transform(d => ({
    resource_group: d.resourceGroup,
    subscription_id: d.subscriptionId,
  }));

export const marshalCloudResourceContainerSchema: z.ZodType = z
  .object({
    cloudResourceContainer: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('gcp'),
          gcp: z.lazy(() => marshalGcpCloudResourceContainerSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.cloudResourceContainer?.$case === 'gcp' && {
      gcp: d.cloudResourceContainer.gcp,
    }),
  }));

export const marshalCreateWorkspaceRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    workspaceName: z.string().optional(),
    deploymentName: z.string().optional(),
    awsRegion: z.string().optional(),
    location: z.string().optional(),
    cloud: z.string().optional(),
    pricingTier: z.string().optional(),
    cloudResourceContainer: z
      .lazy(() => marshalCloudResourceContainerSchema)
      .optional(),
    credentialsId: z.string().optional(),
    storageConfigurationId: z.string().optional(),
    networkId: z.string().optional(),
    gcpManagedNetworkConfig: z
      .lazy(() => marshalGcpManagedNetworkConfigSchema)
      .optional(),
    gkeConfig: z.lazy(() => marshalGkeConfigSchema).optional(),
    privateAccessSettingsId: z.string().optional(),
    managedServicesCustomerManagedKeyId: z.string().optional(),
    storageCustomerManagedKeyId: z.string().optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    computeMode: z.string().optional(),
    networkConnectivityConfigId: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    workspace_name: d.workspaceName,
    deployment_name: d.deploymentName,
    aws_region: d.awsRegion,
    location: d.location,
    cloud: d.cloud,
    pricing_tier: d.pricingTier,
    cloud_resource_container: d.cloudResourceContainer,
    credentials_id: d.credentialsId,
    storage_configuration_id: d.storageConfigurationId,
    network_id: d.networkId,
    gcp_managed_network_config: d.gcpManagedNetworkConfig,
    gke_config: d.gkeConfig,
    private_access_settings_id: d.privateAccessSettingsId,
    managed_services_customer_managed_key_id:
      d.managedServicesCustomerManagedKeyId,
    storage_customer_managed_key_id: d.storageCustomerManagedKeyId,
    custom_tags: d.customTags,
    compute_mode: d.computeMode,
    network_connectivity_config_id: d.networkConnectivityConfigId,
  }));

export const marshalGcpCloudResourceContainerSchema: z.ZodType = z
  .object({
    projectId: z.string().optional(),
  })
  .transform(d => ({
    project_id: d.projectId,
  }));

export const marshalGcpCommonNetworkConfigSchema: z.ZodType = z
  .object({
    gkeConnectivityType: z.string().optional(),
    gkeClusterMasterIpRange: z.string().optional(),
  })
  .transform(d => ({
    gke_connectivity_type: d.gkeConnectivityType,
    gke_cluster_master_ip_range: d.gkeClusterMasterIpRange,
  }));

export const marshalGcpManagedNetworkConfigSchema: z.ZodType = z
  .object({
    subnetCidr: z.string().optional(),
    gkeClusterPodIpRange: z.string().optional(),
    gkeClusterServiceIpRange: z.string().optional(),
  })
  .transform(d => ({
    subnet_cidr: d.subnetCidr,
    gke_cluster_pod_ip_range: d.gkeClusterPodIpRange,
    gke_cluster_service_ip_range: d.gkeClusterServiceIpRange,
  }));

export const marshalGkeConfigSchema: z.ZodType = z
  .object({
    connectivityType: z.string().optional(),
    masterIpRange: z.string().optional(),
  })
  .transform(d => ({
    connectivity_type: d.connectivityType,
    master_ip_range: d.masterIpRange,
  }));

export const marshalWorkspaceSchema: z.ZodType = z
  .object({
    workspaceId: z.bigint().optional(),
    workspaceName: z.string().optional(),
    awsRegion: z.string().optional(),
    creationTime: z.bigint().optional(),
    deploymentName: z.string().optional(),
    workspaceStatus: z.string().optional(),
    accountId: z.string().optional(),
    credentialsId: z.string().optional(),
    storageConfigurationId: z.string().optional(),
    workspaceStatusMessage: z.string().optional(),
    networkConfig: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('networkId'), networkId: z.string()}),
        z.object({
          $case: z.literal('gcpManagedNetworkConfig'),
          gcpManagedNetworkConfig: z.lazy(
            () => marshalGcpManagedNetworkConfigSchema
          ),
        }),
      ])
      .optional(),
    pricingTier: z.string().optional(),
    privateAccessSettingsId: z.string().optional(),
    managedServicesCustomerManagedKeyId: z.string().optional(),
    storageCustomerManagedKeyId: z.string().optional(),
    location: z.string().optional(),
    cloud: z.string().optional(),
    network: z.lazy(() => marshalWorkspaceNetworkSchema).optional(),
    azureWorkspaceInfo: z
      .lazy(() => marshalAzureWorkspaceInfoSchema)
      .optional(),
    gkeConfig: z.lazy(() => marshalGkeConfigSchema).optional(),
    cloudResourceContainer: z
      .lazy(() => marshalCloudResourceContainerSchema)
      .optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    networkConnectivityConfigId: z.string().optional(),
    storageMode: z.string().optional(),
    computeMode: z.string().optional(),
    expectedWorkspaceStatus: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    workspace_name: d.workspaceName,
    aws_region: d.awsRegion,
    creation_time: d.creationTime,
    deployment_name: d.deploymentName,
    workspace_status: d.workspaceStatus,
    account_id: d.accountId,
    credentials_id: d.credentialsId,
    storage_configuration_id: d.storageConfigurationId,
    workspace_status_message: d.workspaceStatusMessage,
    ...(d.networkConfig?.$case === 'networkId' && {
      network_id: d.networkConfig.networkId,
    }),
    ...(d.networkConfig?.$case === 'gcpManagedNetworkConfig' && {
      gcp_managed_network_config: d.networkConfig.gcpManagedNetworkConfig,
    }),
    pricing_tier: d.pricingTier,
    private_access_settings_id: d.privateAccessSettingsId,
    managed_services_customer_managed_key_id:
      d.managedServicesCustomerManagedKeyId,
    storage_customer_managed_key_id: d.storageCustomerManagedKeyId,
    location: d.location,
    cloud: d.cloud,
    network: d.network,
    azure_workspace_info: d.azureWorkspaceInfo,
    gke_config: d.gkeConfig,
    cloud_resource_container: d.cloudResourceContainer,
    custom_tags: d.customTags,
    network_connectivity_config_id: d.networkConnectivityConfigId,
    storage_mode: d.storageMode,
    compute_mode: d.computeMode,
    expected_workspace_status: d.expectedWorkspaceStatus,
  }));

export const marshalWorkspaceNetworkSchema: z.ZodType = z
  .object({
    network: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('gcpManagedNetworkConfig'),
          gcpManagedNetworkConfig: z.lazy(
            () => marshalGcpManagedNetworkConfigSchema
          ),
        }),
        z.object({$case: z.literal('networkId'), networkId: z.string()}),
      ])
      .optional(),
    gcpCommonNetworkConfig: z
      .lazy(() => marshalGcpCommonNetworkConfigSchema)
      .optional(),
  })
  .transform(d => ({
    ...(d.network?.$case === 'gcpManagedNetworkConfig' && {
      gcp_managed_network_config: d.network.gcpManagedNetworkConfig,
    }),
    ...(d.network?.$case === 'networkId' && {network_id: d.network.networkId}),
    gcp_common_network_config: d.gcpCommonNetworkConfig,
  }));

const azureWorkspaceInfoFieldMaskSchema: FieldMaskSchema = {
  resourceGroup: {wire: 'resource_group'},
  subscriptionId: {wire: 'subscription_id'},
};

const cloudResourceContainerFieldMaskSchema: FieldMaskSchema = {
  gcp: {wire: 'gcp', children: () => gcpCloudResourceContainerFieldMaskSchema},
};

const gcpCloudResourceContainerFieldMaskSchema: FieldMaskSchema = {
  projectId: {wire: 'project_id'},
};

const gcpCommonNetworkConfigFieldMaskSchema: FieldMaskSchema = {
  gkeClusterMasterIpRange: {wire: 'gke_cluster_master_ip_range'},
  gkeConnectivityType: {wire: 'gke_connectivity_type'},
};

const gcpManagedNetworkConfigFieldMaskSchema: FieldMaskSchema = {
  gkeClusterPodIpRange: {wire: 'gke_cluster_pod_ip_range'},
  gkeClusterServiceIpRange: {wire: 'gke_cluster_service_ip_range'},
  subnetCidr: {wire: 'subnet_cidr'},
};

const gkeConfigFieldMaskSchema: FieldMaskSchema = {
  connectivityType: {wire: 'connectivity_type'},
  masterIpRange: {wire: 'master_ip_range'},
};

const workspaceFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  awsRegion: {wire: 'aws_region'},
  azureWorkspaceInfo: {
    wire: 'azure_workspace_info',
    children: () => azureWorkspaceInfoFieldMaskSchema,
  },
  cloud: {wire: 'cloud'},
  cloudResourceContainer: {
    wire: 'cloud_resource_container',
    children: () => cloudResourceContainerFieldMaskSchema,
  },
  computeMode: {wire: 'compute_mode'},
  creationTime: {wire: 'creation_time'},
  credentialsId: {wire: 'credentials_id'},
  customTags: {wire: 'custom_tags'},
  deploymentName: {wire: 'deployment_name'},
  expectedWorkspaceStatus: {wire: 'expected_workspace_status'},
  gcpManagedNetworkConfig: {
    wire: 'gcp_managed_network_config',
    children: () => gcpManagedNetworkConfigFieldMaskSchema,
  },
  gkeConfig: {wire: 'gke_config', children: () => gkeConfigFieldMaskSchema},
  location: {wire: 'location'},
  managedServicesCustomerManagedKeyId: {
    wire: 'managed_services_customer_managed_key_id',
  },
  network: {wire: 'network', children: () => workspaceNetworkFieldMaskSchema},
  networkConnectivityConfigId: {wire: 'network_connectivity_config_id'},
  networkId: {wire: 'network_id'},
  pricingTier: {wire: 'pricing_tier'},
  privateAccessSettingsId: {wire: 'private_access_settings_id'},
  storageConfigurationId: {wire: 'storage_configuration_id'},
  storageCustomerManagedKeyId: {wire: 'storage_customer_managed_key_id'},
  storageMode: {wire: 'storage_mode'},
  workspaceId: {wire: 'workspace_id'},
  workspaceName: {wire: 'workspace_name'},
  workspaceStatus: {wire: 'workspace_status'},
  workspaceStatusMessage: {wire: 'workspace_status_message'},
};

export function workspaceFieldMask(...paths: string[]): FieldMask<Workspace> {
  return FieldMask.build<Workspace>(paths, workspaceFieldMaskSchema);
}

const workspaceNetworkFieldMaskSchema: FieldMaskSchema = {
  gcpCommonNetworkConfig: {
    wire: 'gcp_common_network_config',
    children: () => gcpCommonNetworkConfigFieldMaskSchema,
  },
  gcpManagedNetworkConfig: {
    wire: 'gcp_managed_network_config',
    children: () => gcpManagedNetworkConfigFieldMaskSchema,
  },
  networkId: {wire: 'network_id'},
};
