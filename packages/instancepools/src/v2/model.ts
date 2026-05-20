// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * Availability type used for all subsequent nodes past the `first_on_demand` ones.
 *
 * Note: If `first_on_demand` is zero, this availability type will be used for the entire cluster.
 */
export enum AwsAvailability {
  /** Use spot instances. */
  SPOT = 'SPOT',
  /** Use on-demand instances. */
  ON_DEMAND = 'ON_DEMAND',
  /**
   * Preferably use spot instances, but fall back to on-demand instances if spot instances cannot
   * be acquired (e.g., if AWS spot prices are too high).
   */
  SPOT_WITH_FALLBACK = 'SPOT_WITH_FALLBACK',
}

/**
 * Availability type used for all subsequent nodes past the `first_on_demand` ones.
 * Note: If `first_on_demand` is zero, this availability type will be used for the entire cluster.
 */
export enum AzureAvailability {
  /** Use spot instances. */
  SPOT_AZURE = 'SPOT_AZURE',
  /** Use on-demand instances. */
  ON_DEMAND_AZURE = 'ON_DEMAND_AZURE',
  /**
   * Preferably use spot instances, but fall back to on-demand instances if spot instances cannot
   * be acquired (e.g., if Azure is out of Quota).
   */
  SPOT_WITH_FALLBACK_AZURE = 'SPOT_WITH_FALLBACK_AZURE',
}

/**
 * All Azure Disk types that <Databricks> supports.
 * See https://docs.microsoft.com/en-us/azure/storage/storage-about-disks-and-vhds-linux#types-of-disks
 */
export enum AzureDiskVolumeType {
  /** Premium storage tier, backed by SSDs. */
  PREMIUM_LRS = 'PREMIUM_LRS',
  /** Standard storage tier, backed by HDDs. */
  STANDARD_LRS = 'STANDARD_LRS',
}

/**
 * All EBS volume types that <Databricks> supports.
 * See https://aws.amazon.com/ebs/details/ for details.
 */
export enum EbsVolumeType {
  /** Provision extra storage using AWS gp2 EBS volumes. */
  GENERAL_PURPOSE_SSD = 'GENERAL_PURPOSE_SSD',
  /** Provision extra storage using AWS st1 volumes. */
  THROUGHPUT_OPTIMIZED_HDD = 'THROUGHPUT_OPTIMIZED_HDD',
}

/**
 * This field determines whether the instance pool will contain preemptible
 * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if the former is unavailable.
 */
export enum GcpAvailability {
  PREEMPTIBLE_GCP = 'PREEMPTIBLE_GCP',
  ON_DEMAND_GCP = 'ON_DEMAND_GCP',
  PREEMPTIBLE_WITH_FALLBACK_GCP = 'PREEMPTIBLE_WITH_FALLBACK_GCP',
}

/**
 * The state of a Cluster. The current allowable state transitions are as follows:
 *
 * - ``ACTIVE`` -> ``STOPPED``
 * - ``ACTIVE`` -> ``DELETED``
 * - ``STOPPED`` -> ``ACTIVE``
 * - ``STOPPED`` -> ``DELETED``
 */
export enum InstancePoolState {
  /** Indicates an instance pool is active for use. */
  ACTIVE = 'ACTIVE',
  /**
   * Indicates an instance pool has been stopped so no more clusters should be able to get instances
   * from the pool.
   */
  STOPPED = 'STOPPED',
  /** Indicates the instance pool has been deleted and should no longer exist. */
  DELETED = 'DELETED',
}

export interface CreateInstancePoolRequest {
  /**
   * Pool name requested by the user. Pool name must be unique. Length must be between 1 and 100
   * characters.
   */
  instancePoolName?: string | undefined;
  /** Minimum number of idle instances to keep in the instance pool */
  minIdleInstances?: number | undefined;
  /**
   * Maximum number of outstanding instances to keep in the pool, including both instances used by
   * clusters and idle instances. Clusters that require further instance provisioning will fail during
   * upsize requests.
   */
  maxCapacity?: number | undefined;
  /**
   * Attributes related to instance pools running on Amazon Web Services.
   * If not specified at pool creation, a set of default values will be used.
   */
  awsAttributes?: InstancePoolAwsAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * Additional tags for pool resources. <Databricks> will tag all pool resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * Automatically terminates the extra instances in the pool cache after they are inactive for this
   * time in minutes if min_idle_instances requirement is already met. If not set, the extra pool
   * instances will be automatically terminated after a default timeout. If specified, the
   * threshold must be between 0 and 10000 minutes.
   * Users can also set this value to 0 to instantly remove idle instances from the cache if
   * min cache size could still hold.
   */
  idleInstanceAutoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this instances in this pool will dynamically acquire
   * additional disk space when its Spark workers are running low on disk space. In AWS, this
   * feature requires specific AWS permissions to function correctly - refer to the User Guide for
   * more details.
   */
  enableElasticDisk?: boolean | undefined;
  /** Defines the specification of the disks that will be attached to all spark containers. */
  diskSpec?: DiskSpec | undefined;
  /** Custom Docker Image BYOC */
  preloadedDockerImages?: DockerImage[] | undefined;
  /**
   * A list containing at most one preloaded Spark image version for the pool. Pool-backed clusters started
   * with the preloaded Spark version will start faster. A list of available Spark versions
   * can be retrieved by using the :method:clusters/sparkVersions API call.
   */
  preloadedSparkVersions?: string[] | undefined;
  /**
   * Attributes related to instance pools running on Azure.
   * If not specified at pool creation, a set of default values will be used.
   */
  azureAttributes?: InstancePoolAzureAttributes | undefined;
  /**
   * Attributes related to instance pools running on Google Cloud Platform.
   * If not specified at pool creation, a set of default values will be used.
   */
  gcpAttributes?: InstancePoolGcpAttributes | undefined;
  /** Flexible node type configuration for the pool. */
  nodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED types. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED types. */
  totalInitialRemoteDiskSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateInstancePoolRequest_CustomTagsEntry {
  /**
   * The key of the tag. The key length must be between 1 and 127 UTF-8 characters, inclusive.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  key?: string | undefined;
  /**
   * The value of the tag. The value length must be less than or equal to 255 UTF-8 characters.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateInstancePoolRequest_Response {
  /** The ID of the created instance pool. */
  instancePoolId?: string | undefined;
}

export interface DeleteInstancePoolRequest {
  /** The instance pool to be terminated. */
  instancePoolId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteInstancePoolRequest_Response {}

/**
 * Describes the disks that are launched for each instance in the spark cluster.
 * For example, if the cluster has 3 instances, each instance is configured to launch
 * 2 disks, 100 GiB each, then <Databricks> will launch a total of 6 disks,
 * 100 GiB each, for this cluster.
 */
export interface DiskSpec {
  /** The type of disks that will be launched with this cluster. */
  diskType?: DiskType | undefined;
  /**
   * The number of disks launched for each instance:
   * - This feature is only enabled for supported node types.
   * - Users can choose up to the limit of the disks supported by the node type.
   * - For node types with no OS disk, at least one disk must be specified;
   * otherwise, cluster creation will fail.
   *
   * If disks are attached, <Databricks> will configure Spark to use only the disks for
   * scratch storage, because heterogenously sized scratch devices can lead to inefficient disk
   * utilization. If no disks are attached, <Databricks> will configure Spark to use
   * instance store disks.
   *
   * Note: If disks are specified, then the Spark configuration
   * `spark.local.dir` will be overridden.
   *
   * Disks will be mounted at:
   * - For AWS: `/ebs0`, `/ebs1`, and etc.
   * - For Azure: `/remote_volume0`, `/remote_volume1`, and etc.
   */
  diskCount?: number | undefined;
  /**
   * The size of each disk (in GiB) launched for each instance.
   * Values must fall into the supported range for a particular instance type.
   *
   * For AWS:
   * - General Purpose SSD: 100 - 4096 GiB
   * - Throughput Optimized HDD: 500 - 4096 GiB
   *
   * For Azure:
   * - Premium LRS (SSD): 1 - 1023 GiB
   * - Standard LRS (HDD): 1- 1023 GiB
   */
  diskSize?: number | undefined;
  diskIops?: number | undefined;
  diskThroughput?: number | undefined;
}

/** Describes the disk type. */
export interface DiskType {
  remoteVolumeType?:
    | {$case: 'ebsVolumeType'; ebsVolumeType: EbsVolumeType}
    | {$case: 'azureDiskVolumeType'; azureDiskVolumeType: AzureDiskVolumeType}
    | undefined;
}

export interface DockerBasicAuth {
  /** Name of the user */
  username?: string | undefined;
  /** Password of the user */
  password?: string | undefined;
}

export interface DockerImage {
  /** URL of the docker image. */
  url?: string | undefined;
  credsOneof?:
    | {
        $case: 'basicAuth';
        /** Basic auth with username and password */
        basicAuth: DockerBasicAuth;
      }
    | undefined;
}

export interface EditInstancePoolRequest {
  /** Instance pool ID */
  instancePoolId?: string | undefined;
  /**
   * Pool name requested by the user. Pool name must be unique. Length must be between 1 and 100
   * characters.
   */
  instancePoolName?: string | undefined;
  /** Minimum number of idle instances to keep in the instance pool */
  minIdleInstances?: number | undefined;
  /**
   * Maximum number of outstanding instances to keep in the pool, including both instances used by
   * clusters and idle instances. Clusters that require further instance provisioning will fail during
   * upsize requests.
   */
  maxCapacity?: number | undefined;
  /**
   * Attributes related to instance pools running on Amazon Web Services.
   * If not specified at pool creation, a set of default values will be used.
   */
  awsAttributes?: InstancePoolAwsAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * Additional tags for pool resources. <Databricks> will tag all pool resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * Automatically terminates the extra instances in the pool cache after they are inactive for this
   * time in minutes if min_idle_instances requirement is already met. If not set, the extra pool
   * instances will be automatically terminated after a default timeout. If specified, the
   * threshold must be between 0 and 10000 minutes.
   * Users can also set this value to 0 to instantly remove idle instances from the cache if
   * min cache size could still hold.
   */
  idleInstanceAutoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this instances in this pool will dynamically acquire
   * additional disk space when its Spark workers are running low on disk space. In AWS, this
   * feature requires specific AWS permissions to function correctly - refer to the User Guide for
   * more details.
   */
  enableElasticDisk?: boolean | undefined;
  /** Defines the specification of the disks that will be attached to all spark containers. */
  diskSpec?: DiskSpec | undefined;
  /** Custom Docker Image BYOC */
  preloadedDockerImages?: DockerImage[] | undefined;
  /**
   * A list containing at most one preloaded Spark image version for the pool. Pool-backed clusters started
   * with the preloaded Spark version will start faster. A list of available Spark versions
   * can be retrieved by using the :method:clusters/sparkVersions API call.
   */
  preloadedSparkVersions?: string[] | undefined;
  /**
   * Attributes related to instance pools running on Azure.
   * If not specified at pool creation, a set of default values will be used.
   */
  azureAttributes?: InstancePoolAzureAttributes | undefined;
  /**
   * Attributes related to instance pools running on Google Cloud Platform.
   * If not specified at pool creation, a set of default values will be used.
   */
  gcpAttributes?: InstancePoolGcpAttributes | undefined;
  /** Flexible node type configuration for the pool. */
  nodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED types. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED types. */
  totalInitialRemoteDiskSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EditInstancePoolRequest_CustomTagsEntry {
  /**
   * The key of the tag. The key length must be between 1 and 127 UTF-8 characters, inclusive.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  key?: string | undefined;
  /**
   * The value of the tag. The value length must be less than or equal to 255 UTF-8 characters.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface EditInstancePoolRequest_Response {}

export interface GetInstancePoolRequest {
  /** The canonical unique identifier for the instance pool. */
  instancePoolId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetInstancePoolRequest_Response {
  /** Usage statistics about the instance pool. */
  stats?: InstancePoolStats | undefined;
  /** Status of failed pending instances in the pool. */
  status?: InstancePoolStatus | undefined;
  /** Canonical unique identifier for the pool. */
  instancePoolId?: string | undefined;
  /**
   * Tags that are added by <Databricks> regardless of any ``custom_tags``, including:
   *
   * - Vendor: <Databricks>
   *
   * - InstancePoolCreator: <user_id_of_creator>
   *
   * - InstancePoolName: <name_of_pool>
   *
   * - InstancePoolId: <id_of_pool>
   */
  defaultTags?: Record<string, string> | undefined;
  /** Current state of the instance pool. */
  state?: InstancePoolState | undefined;
  /**
   * Pool name requested by the user. Pool name must be unique. Length must be between 1 and 100
   * characters.
   */
  instancePoolName?: string | undefined;
  /** Minimum number of idle instances to keep in the instance pool */
  minIdleInstances?: number | undefined;
  /**
   * Maximum number of outstanding instances to keep in the pool, including both instances used by
   * clusters and idle instances. Clusters that require further instance provisioning will fail during
   * upsize requests.
   */
  maxCapacity?: number | undefined;
  /**
   * Attributes related to instance pools running on Amazon Web Services.
   * If not specified at pool creation, a set of default values will be used.
   */
  awsAttributes?: InstancePoolAwsAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * Additional tags for pool resources. <Databricks> will tag all pool resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * Automatically terminates the extra instances in the pool cache after they are inactive for this
   * time in minutes if min_idle_instances requirement is already met. If not set, the extra pool
   * instances will be automatically terminated after a default timeout. If specified, the
   * threshold must be between 0 and 10000 minutes.
   * Users can also set this value to 0 to instantly remove idle instances from the cache if
   * min cache size could still hold.
   */
  idleInstanceAutoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this instances in this pool will dynamically acquire
   * additional disk space when its Spark workers are running low on disk space. In AWS, this
   * feature requires specific AWS permissions to function correctly - refer to the User Guide for
   * more details.
   */
  enableElasticDisk?: boolean | undefined;
  /** Defines the specification of the disks that will be attached to all spark containers. */
  diskSpec?: DiskSpec | undefined;
  /** Custom Docker Image BYOC */
  preloadedDockerImages?: DockerImage[] | undefined;
  /**
   * A list containing at most one preloaded Spark image version for the pool. Pool-backed clusters started
   * with the preloaded Spark version will start faster. A list of available Spark versions
   * can be retrieved by using the :method:clusters/sparkVersions API call.
   */
  preloadedSparkVersions?: string[] | undefined;
  /**
   * Attributes related to instance pools running on Azure.
   * If not specified at pool creation, a set of default values will be used.
   */
  azureAttributes?: InstancePoolAzureAttributes | undefined;
  /**
   * Attributes related to instance pools running on Google Cloud Platform.
   * If not specified at pool creation, a set of default values will be used.
   */
  gcpAttributes?: InstancePoolGcpAttributes | undefined;
  /** Flexible node type configuration for the pool. */
  nodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED types. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED types. */
  totalInitialRemoteDiskSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetInstancePoolRequest_Response_CustomTagsEntry {
  /**
   * The key of the tag. The key length must be between 1 and 127 UTF-8 characters, inclusive.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  key?: string | undefined;
  /**
   * The value of the tag. The value length must be less than or equal to 255 UTF-8 characters.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetInstancePoolRequest_Response_DefaultTagsEntry {
  /**
   * The key of the tag. The key length must be between 1 and 127 UTF-8 characters, inclusive.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  key?: string | undefined;
  /**
   * The value of the tag. The value length must be less than or equal to 255 UTF-8 characters.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  value?: string | undefined;
}

export interface InstancePoolAndStats {
  /** Usage statistics about the instance pool. */
  stats?: InstancePoolStats | undefined;
  /** Status of failed pending instances in the pool. */
  status?: InstancePoolStatus | undefined;
  /** Canonical unique identifier for the pool. */
  instancePoolId?: string | undefined;
  /**
   * Tags that are added by <Databricks> regardless of any ``custom_tags``, including:
   *
   * - Vendor: <Databricks>
   *
   * - InstancePoolCreator: <user_id_of_creator>
   *
   * - InstancePoolName: <name_of_pool>
   *
   * - InstancePoolId: <id_of_pool>
   */
  defaultTags?: Record<string, string> | undefined;
  /** Current state of the instance pool. */
  state?: InstancePoolState | undefined;
  /**
   * Pool name requested by the user. Pool name must be unique. Length must be between 1 and 100
   * characters.
   */
  instancePoolName?: string | undefined;
  /** Minimum number of idle instances to keep in the instance pool */
  minIdleInstances?: number | undefined;
  /**
   * Maximum number of outstanding instances to keep in the pool, including both instances used by
   * clusters and idle instances. Clusters that require further instance provisioning will fail during
   * upsize requests.
   */
  maxCapacity?: number | undefined;
  /**
   * Attributes related to instance pools running on Amazon Web Services.
   * If not specified at pool creation, a set of default values will be used.
   */
  awsAttributes?: InstancePoolAwsAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * Additional tags for pool resources. <Databricks> will tag all pool resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * Automatically terminates the extra instances in the pool cache after they are inactive for this
   * time in minutes if min_idle_instances requirement is already met. If not set, the extra pool
   * instances will be automatically terminated after a default timeout. If specified, the
   * threshold must be between 0 and 10000 minutes.
   * Users can also set this value to 0 to instantly remove idle instances from the cache if
   * min cache size could still hold.
   */
  idleInstanceAutoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this instances in this pool will dynamically acquire
   * additional disk space when its Spark workers are running low on disk space. In AWS, this
   * feature requires specific AWS permissions to function correctly - refer to the User Guide for
   * more details.
   */
  enableElasticDisk?: boolean | undefined;
  /** Defines the specification of the disks that will be attached to all spark containers. */
  diskSpec?: DiskSpec | undefined;
  /** Custom Docker Image BYOC */
  preloadedDockerImages?: DockerImage[] | undefined;
  /**
   * A list containing at most one preloaded Spark image version for the pool. Pool-backed clusters started
   * with the preloaded Spark version will start faster. A list of available Spark versions
   * can be retrieved by using the :method:clusters/sparkVersions API call.
   */
  preloadedSparkVersions?: string[] | undefined;
  /**
   * Attributes related to instance pools running on Azure.
   * If not specified at pool creation, a set of default values will be used.
   */
  azureAttributes?: InstancePoolAzureAttributes | undefined;
  /**
   * Attributes related to instance pools running on Google Cloud Platform.
   * If not specified at pool creation, a set of default values will be used.
   */
  gcpAttributes?: InstancePoolGcpAttributes | undefined;
  /** Flexible node type configuration for the pool. */
  nodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED types. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED types. */
  totalInitialRemoteDiskSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface InstancePoolAndStats_CustomTagsEntry {
  /**
   * The key of the tag. The key length must be between 1 and 127 UTF-8 characters, inclusive.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  key?: string | undefined;
  /**
   * The value of the tag. The value length must be less than or equal to 255 UTF-8 characters.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface InstancePoolAndStats_DefaultTagsEntry {
  /**
   * The key of the tag. The key length must be between 1 and 127 UTF-8 characters, inclusive.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  key?: string | undefined;
  /**
   * The value of the tag. The value length must be less than or equal to 255 UTF-8 characters.
   * For a list of all restrictions, see the AWS docs here:
   * http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#tag-restrictions
   */
  value?: string | undefined;
}

/** Attributes set during instance pool creation which are related to Amazon Web Services. */
export interface InstancePoolAwsAttributes {
  /** Availability type used for the spot nodes. */
  availability?: AwsAvailability | undefined;
  /**
   * Identifier for the availability zone/datacenter in which the cluster resides.
   * This string will be of a form like "us-west-2a". The provided availability
   * zone must be in the same region as the <Databricks> deployment. For example, "us-west-2a"
   * is not a valid zone id if the <Databricks> deployment resides in the "us-east-1" region.
   * This is an optional field at cluster creation, and if not specified, a default zone will be used.
   * The list of available zones as well as the default value can be found by using the
   * `List Zones` method.
   */
  zoneId?: string | undefined;
  /**
   * Calculates the bid price for AWS spot instances, as a percentage of the corresponding instance type's
   * on-demand price.
   * For example, if this field is set to 50, and the cluster needs a new `r3.xlarge` spot
   * instance, then the bid price is half of the price of
   * on-demand `r3.xlarge` instances. Similarly, if this field is set to 200, the bid price is twice
   * the price of on-demand `r3.xlarge` instances. If not specified, the default value is 100.
   * When spot instances are requested for this cluster, only spot instances whose bid price
   * percentage matches this field will be considered.
   * Note that, for safety, we enforce this field to be no more than 10000.
   */
  spotBidPricePercent?: number | undefined;
  /**
   * All AWS instances belonging to the instance pool will have this instance profile. If omitted, instances
   * will initially be launched with the workspace's default instance profile. If defined, clusters that use the
   * pool will inherit the instance profile, and must not specify their own instance profile on cluster creation or
   * update. If the pool does not specify an instance profile, clusters using the pool may specify any instance profile.
   * The instance profile must have previously been added to the <Databricks> environment by an account administrator.
   *
   * This feature may only be available to certain customer plans.
   */
  instanceProfileArn?: string | undefined;
}

/** Attributes set during instance pool creation which are related to Azure. */
export interface InstancePoolAzureAttributes {
  /** Availability type used for the spot nodes. */
  availability?: AzureAvailability | undefined;
  /**
   * With variable pricing, you have option to set a max price, in US dollars (USD)
   * For example, the value 2 would be a max price of $2.00 USD per hour.
   * If you set the max price to be -1, the VM won't be evicted based on price.
   * The price for the VM will be the current price for spot or the price for a standard VM,
   * which ever is less, as long as there is capacity and quota available.
   */
  spotBidMaxPrice?: number | undefined;
}

/** Attributes set during instance pool creation which are related to GCP. */
export interface InstancePoolGcpAttributes {
  gcpAvailability?: GcpAvailability | undefined;
  /**
   * If provided, each node in the instance pool will have this number of local SSDs attached.
   * Each local SSD is 375GB in size. Refer to [GCP documentation](https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds)
   * for the supported number of local SSDs for each instance type.
   */
  localSsdCount?: number | undefined;
  /**
   * Identifier for the availability zone/datacenter in which the cluster resides.
   * This string will be of a form like "us-west1-a". The provided availability
   * zone must be in the same region as the <Databricks> workspace. For example, "us-west1-a"
   * is not a valid zone id if the <Databricks> workspace resides in the "us-east1" region.
   * This is an optional field at instance pool creation, and if not specified, a default zone will be used.
   *
   * This field can be one of the following:
   * - "HA" => High availability, spread nodes across availability zones for a <Databricks> deployment region
   * - A GCP availability zone => Pick One of the available zones for (machine type + region) from https://cloud.google.com/compute/docs/regions-zones (e.g. "us-west1-a").
   *
   * If empty, <Databricks> picks an availability zone to schedule the cluster on.
   */
  zoneId?: string | undefined;
}

export interface InstancePoolStats {
  /** Number of active instances in the pool that are part of a cluster. */
  usedCount?: number | undefined;
  /** Number of active instances in the pool that are NOT part of a cluster. */
  idleCount?: number | undefined;
  /** Number of pending instances in the pool that are part of a cluster. */
  pendingUsedCount?: number | undefined;
  /** Number of pending instances in the pool that are NOT part of a cluster. */
  pendingIdleCount?: number | undefined;
}

export interface InstancePoolStatus {
  /**
   * List of error messages for the failed pending instances.
   * The pending_instance_errors follows FIFO with maximum length of the min_idle of the pool.
   * The pending_instance_errors is emptied once the number of exiting available instances reaches
   * the min_idle of the pool.
   */
  pendingInstanceErrors?: PendingInstanceError[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListInstancePoolsRequest {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListInstancePoolsRequest_Response {
  instancePools?: InstancePoolAndStats[] | undefined;
}

/** Configuration for flexible node types, allowing fallback to alternate node types during cluster launch and upscale. */
export interface NodeTypeFlexibility {
  /** A list of node type IDs to use as fallbacks when the primary node type is unavailable. */
  alternateNodeTypeIds?: string[] | undefined;
}

/** Error message of a failed pending instances */
export interface PendingInstanceError {
  instanceId?: string | undefined;
  message?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateInstancePoolRequest_ResponseSchema: z.ZodType<CreateInstancePoolRequest_Response> =
  z
    .object({
      instance_pool_id: z.string().optional(),
    })
    .transform(d => ({
      instancePoolId: d.instance_pool_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteInstancePoolRequest_ResponseSchema: z.ZodType<DeleteInstancePoolRequest_Response> =
  z.object({});

export const unmarshalDiskSpecSchema: z.ZodType<DiskSpec> = z
  .object({
    disk_type: z.lazy(() => unmarshalDiskTypeSchema).optional(),
    disk_count: z.number().optional(),
    disk_size: z.number().optional(),
    disk_iops: z.number().optional(),
    disk_throughput: z.number().optional(),
  })
  .transform(d => ({
    diskType: d.disk_type,
    diskCount: d.disk_count,
    diskSize: d.disk_size,
    diskIops: d.disk_iops,
    diskThroughput: d.disk_throughput,
  }));

export const unmarshalDiskTypeSchema: z.ZodType<DiskType> = z
  .object({
    ebs_volume_type: z.enum(EbsVolumeType).optional(),
    azure_disk_volume_type: z.enum(AzureDiskVolumeType).optional(),
  })
  .transform(d => ({
    remoteVolumeType:
      d.ebs_volume_type !== undefined
        ? {$case: 'ebsVolumeType' as const, ebsVolumeType: d.ebs_volume_type}
        : d.azure_disk_volume_type !== undefined
          ? {
              $case: 'azureDiskVolumeType' as const,
              azureDiskVolumeType: d.azure_disk_volume_type,
            }
          : undefined,
  }));

export const unmarshalDockerBasicAuthSchema: z.ZodType<DockerBasicAuth> = z
  .object({
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .transform(d => ({
    username: d.username,
    password: d.password,
  }));

export const unmarshalDockerImageSchema: z.ZodType<DockerImage> = z
  .object({
    url: z.string().optional(),
    basic_auth: z.lazy(() => unmarshalDockerBasicAuthSchema).optional(),
  })
  .transform(d => ({
    url: d.url,
    credsOneof:
      d.basic_auth !== undefined
        ? {$case: 'basicAuth' as const, basicAuth: d.basic_auth}
        : undefined,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEditInstancePoolRequest_ResponseSchema: z.ZodType<EditInstancePoolRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetInstancePoolRequest_ResponseSchema: z.ZodType<GetInstancePoolRequest_Response> =
  z
    .object({
      stats: z.lazy(() => unmarshalInstancePoolStatsSchema).optional(),
      status: z.lazy(() => unmarshalInstancePoolStatusSchema).optional(),
      instance_pool_id: z.string().optional(),
      default_tags: z.record(z.string(), z.string()).optional(),
      state: z.enum(InstancePoolState).optional(),
      instance_pool_name: z.string().optional(),
      min_idle_instances: z.number().optional(),
      max_capacity: z.number().optional(),
      aws_attributes: z
        .lazy(() => unmarshalInstancePoolAwsAttributesSchema)
        .optional(),
      node_type_id: z.string().optional(),
      custom_tags: z.record(z.string(), z.string()).optional(),
      idle_instance_autotermination_minutes: z.number().optional(),
      enable_elastic_disk: z.boolean().optional(),
      disk_spec: z.lazy(() => unmarshalDiskSpecSchema).optional(),
      preloaded_docker_images: z
        .array(z.lazy(() => unmarshalDockerImageSchema))
        .optional(),
      preloaded_spark_versions: z.array(z.string()).optional(),
      azure_attributes: z
        .lazy(() => unmarshalInstancePoolAzureAttributesSchema)
        .optional(),
      gcp_attributes: z
        .lazy(() => unmarshalInstancePoolGcpAttributesSchema)
        .optional(),
      node_type_flexibility: z
        .lazy(() => unmarshalNodeTypeFlexibilitySchema)
        .optional(),
      remote_disk_throughput: z.number().optional(),
      total_initial_remote_disk_size: z.number().optional(),
    })
    .transform(d => ({
      stats: d.stats,
      status: d.status,
      instancePoolId: d.instance_pool_id,
      defaultTags: d.default_tags,
      state: d.state,
      instancePoolName: d.instance_pool_name,
      minIdleInstances: d.min_idle_instances,
      maxCapacity: d.max_capacity,
      awsAttributes: d.aws_attributes,
      nodeTypeId: d.node_type_id,
      customTags: d.custom_tags,
      idleInstanceAutoterminationMinutes:
        d.idle_instance_autotermination_minutes,
      enableElasticDisk: d.enable_elastic_disk,
      diskSpec: d.disk_spec,
      preloadedDockerImages: d.preloaded_docker_images,
      preloadedSparkVersions: d.preloaded_spark_versions,
      azureAttributes: d.azure_attributes,
      gcpAttributes: d.gcp_attributes,
      nodeTypeFlexibility: d.node_type_flexibility,
      remoteDiskThroughput: d.remote_disk_throughput,
      totalInitialRemoteDiskSize: d.total_initial_remote_disk_size,
    }));

export const unmarshalInstancePoolAndStatsSchema: z.ZodType<InstancePoolAndStats> =
  z
    .object({
      stats: z.lazy(() => unmarshalInstancePoolStatsSchema).optional(),
      status: z.lazy(() => unmarshalInstancePoolStatusSchema).optional(),
      instance_pool_id: z.string().optional(),
      default_tags: z.record(z.string(), z.string()).optional(),
      state: z.enum(InstancePoolState).optional(),
      instance_pool_name: z.string().optional(),
      min_idle_instances: z.number().optional(),
      max_capacity: z.number().optional(),
      aws_attributes: z
        .lazy(() => unmarshalInstancePoolAwsAttributesSchema)
        .optional(),
      node_type_id: z.string().optional(),
      custom_tags: z.record(z.string(), z.string()).optional(),
      idle_instance_autotermination_minutes: z.number().optional(),
      enable_elastic_disk: z.boolean().optional(),
      disk_spec: z.lazy(() => unmarshalDiskSpecSchema).optional(),
      preloaded_docker_images: z
        .array(z.lazy(() => unmarshalDockerImageSchema))
        .optional(),
      preloaded_spark_versions: z.array(z.string()).optional(),
      azure_attributes: z
        .lazy(() => unmarshalInstancePoolAzureAttributesSchema)
        .optional(),
      gcp_attributes: z
        .lazy(() => unmarshalInstancePoolGcpAttributesSchema)
        .optional(),
      node_type_flexibility: z
        .lazy(() => unmarshalNodeTypeFlexibilitySchema)
        .optional(),
      remote_disk_throughput: z.number().optional(),
      total_initial_remote_disk_size: z.number().optional(),
    })
    .transform(d => ({
      stats: d.stats,
      status: d.status,
      instancePoolId: d.instance_pool_id,
      defaultTags: d.default_tags,
      state: d.state,
      instancePoolName: d.instance_pool_name,
      minIdleInstances: d.min_idle_instances,
      maxCapacity: d.max_capacity,
      awsAttributes: d.aws_attributes,
      nodeTypeId: d.node_type_id,
      customTags: d.custom_tags,
      idleInstanceAutoterminationMinutes:
        d.idle_instance_autotermination_minutes,
      enableElasticDisk: d.enable_elastic_disk,
      diskSpec: d.disk_spec,
      preloadedDockerImages: d.preloaded_docker_images,
      preloadedSparkVersions: d.preloaded_spark_versions,
      azureAttributes: d.azure_attributes,
      gcpAttributes: d.gcp_attributes,
      nodeTypeFlexibility: d.node_type_flexibility,
      remoteDiskThroughput: d.remote_disk_throughput,
      totalInitialRemoteDiskSize: d.total_initial_remote_disk_size,
    }));

export const unmarshalInstancePoolAwsAttributesSchema: z.ZodType<InstancePoolAwsAttributes> =
  z
    .object({
      availability: z.enum(AwsAvailability).optional(),
      zone_id: z.string().optional(),
      spot_bid_price_percent: z.number().optional(),
      instance_profile_arn: z.string().optional(),
    })
    .transform(d => ({
      availability: d.availability,
      zoneId: d.zone_id,
      spotBidPricePercent: d.spot_bid_price_percent,
      instanceProfileArn: d.instance_profile_arn,
    }));

export const unmarshalInstancePoolAzureAttributesSchema: z.ZodType<InstancePoolAzureAttributes> =
  z
    .object({
      availability: z.enum(AzureAvailability).optional(),
      spot_bid_max_price: z.number().optional(),
    })
    .transform(d => ({
      availability: d.availability,
      spotBidMaxPrice: d.spot_bid_max_price,
    }));

export const unmarshalInstancePoolGcpAttributesSchema: z.ZodType<InstancePoolGcpAttributes> =
  z
    .object({
      gcp_availability: z.enum(GcpAvailability).optional(),
      local_ssd_count: z.number().optional(),
      zone_id: z.string().optional(),
    })
    .transform(d => ({
      gcpAvailability: d.gcp_availability,
      localSsdCount: d.local_ssd_count,
      zoneId: d.zone_id,
    }));

export const unmarshalInstancePoolStatsSchema: z.ZodType<InstancePoolStats> = z
  .object({
    used_count: z.number().optional(),
    idle_count: z.number().optional(),
    pending_used_count: z.number().optional(),
    pending_idle_count: z.number().optional(),
  })
  .transform(d => ({
    usedCount: d.used_count,
    idleCount: d.idle_count,
    pendingUsedCount: d.pending_used_count,
    pendingIdleCount: d.pending_idle_count,
  }));

export const unmarshalInstancePoolStatusSchema: z.ZodType<InstancePoolStatus> =
  z
    .object({
      pending_instance_errors: z
        .array(z.lazy(() => unmarshalPendingInstanceErrorSchema))
        .optional(),
    })
    .transform(d => ({
      pendingInstanceErrors: d.pending_instance_errors,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListInstancePoolsRequest_ResponseSchema: z.ZodType<ListInstancePoolsRequest_Response> =
  z
    .object({
      instance_pools: z
        .array(z.lazy(() => unmarshalInstancePoolAndStatsSchema))
        .optional(),
    })
    .transform(d => ({
      instancePools: d.instance_pools,
    }));

export const unmarshalNodeTypeFlexibilitySchema: z.ZodType<NodeTypeFlexibility> =
  z
    .object({
      alternate_node_type_ids: z.array(z.string()).optional(),
    })
    .transform(d => ({
      alternateNodeTypeIds: d.alternate_node_type_ids,
    }));

export const unmarshalPendingInstanceErrorSchema: z.ZodType<PendingInstanceError> =
  z
    .object({
      instance_id: z.string().optional(),
      message: z.string().optional(),
    })
    .transform(d => ({
      instanceId: d.instance_id,
      message: d.message,
    }));

export const marshalCreateInstancePoolRequestSchema: z.ZodType = z
  .object({
    instancePoolName: z.string().optional(),
    minIdleInstances: z.number().optional(),
    maxCapacity: z.number().optional(),
    awsAttributes: z
      .lazy(() => marshalInstancePoolAwsAttributesSchema)
      .optional(),
    nodeTypeId: z.string().optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    idleInstanceAutoterminationMinutes: z.number().optional(),
    enableElasticDisk: z.boolean().optional(),
    diskSpec: z.lazy(() => marshalDiskSpecSchema).optional(),
    preloadedDockerImages: z
      .array(z.lazy(() => marshalDockerImageSchema))
      .optional(),
    preloadedSparkVersions: z.array(z.string()).optional(),
    azureAttributes: z
      .lazy(() => marshalInstancePoolAzureAttributesSchema)
      .optional(),
    gcpAttributes: z
      .lazy(() => marshalInstancePoolGcpAttributesSchema)
      .optional(),
    nodeTypeFlexibility: z
      .lazy(() => marshalNodeTypeFlexibilitySchema)
      .optional(),
    remoteDiskThroughput: z.number().optional(),
    totalInitialRemoteDiskSize: z.number().optional(),
  })
  .transform(d => ({
    instance_pool_name: d.instancePoolName,
    min_idle_instances: d.minIdleInstances,
    max_capacity: d.maxCapacity,
    aws_attributes: d.awsAttributes,
    node_type_id: d.nodeTypeId,
    custom_tags: d.customTags,
    idle_instance_autotermination_minutes: d.idleInstanceAutoterminationMinutes,
    enable_elastic_disk: d.enableElasticDisk,
    disk_spec: d.diskSpec,
    preloaded_docker_images: d.preloadedDockerImages,
    preloaded_spark_versions: d.preloadedSparkVersions,
    azure_attributes: d.azureAttributes,
    gcp_attributes: d.gcpAttributes,
    node_type_flexibility: d.nodeTypeFlexibility,
    remote_disk_throughput: d.remoteDiskThroughput,
    total_initial_remote_disk_size: d.totalInitialRemoteDiskSize,
  }));

export const marshalDeleteInstancePoolRequestSchema: z.ZodType = z
  .object({
    instancePoolId: z.string().optional(),
  })
  .transform(d => ({
    instance_pool_id: d.instancePoolId,
  }));

export const marshalDiskSpecSchema: z.ZodType = z
  .object({
    diskType: z.lazy(() => marshalDiskTypeSchema).optional(),
    diskCount: z.number().optional(),
    diskSize: z.number().optional(),
    diskIops: z.number().optional(),
    diskThroughput: z.number().optional(),
  })
  .transform(d => ({
    disk_type: d.diskType,
    disk_count: d.diskCount,
    disk_size: d.diskSize,
    disk_iops: d.diskIops,
    disk_throughput: d.diskThroughput,
  }));

export const marshalDiskTypeSchema: z.ZodType = z
  .object({
    remoteVolumeType: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('ebsVolumeType'),
          ebsVolumeType: z.enum(EbsVolumeType),
        }),
        z.object({
          $case: z.literal('azureDiskVolumeType'),
          azureDiskVolumeType: z.enum(AzureDiskVolumeType),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.remoteVolumeType?.$case === 'ebsVolumeType' && {
      ebs_volume_type: d.remoteVolumeType.ebsVolumeType,
    }),
    ...(d.remoteVolumeType?.$case === 'azureDiskVolumeType' && {
      azure_disk_volume_type: d.remoteVolumeType.azureDiskVolumeType,
    }),
  }));

export const marshalDockerBasicAuthSchema: z.ZodType = z
  .object({
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .transform(d => ({
    username: d.username,
    password: d.password,
  }));

export const marshalDockerImageSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    credsOneof: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('basicAuth'),
          basicAuth: z.lazy(() => marshalDockerBasicAuthSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    url: d.url,
    ...(d.credsOneof?.$case === 'basicAuth' && {
      basic_auth: d.credsOneof.basicAuth,
    }),
  }));

export const marshalEditInstancePoolRequestSchema: z.ZodType = z
  .object({
    instancePoolId: z.string().optional(),
    instancePoolName: z.string().optional(),
    minIdleInstances: z.number().optional(),
    maxCapacity: z.number().optional(),
    awsAttributes: z
      .lazy(() => marshalInstancePoolAwsAttributesSchema)
      .optional(),
    nodeTypeId: z.string().optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    idleInstanceAutoterminationMinutes: z.number().optional(),
    enableElasticDisk: z.boolean().optional(),
    diskSpec: z.lazy(() => marshalDiskSpecSchema).optional(),
    preloadedDockerImages: z
      .array(z.lazy(() => marshalDockerImageSchema))
      .optional(),
    preloadedSparkVersions: z.array(z.string()).optional(),
    azureAttributes: z
      .lazy(() => marshalInstancePoolAzureAttributesSchema)
      .optional(),
    gcpAttributes: z
      .lazy(() => marshalInstancePoolGcpAttributesSchema)
      .optional(),
    nodeTypeFlexibility: z
      .lazy(() => marshalNodeTypeFlexibilitySchema)
      .optional(),
    remoteDiskThroughput: z.number().optional(),
    totalInitialRemoteDiskSize: z.number().optional(),
  })
  .transform(d => ({
    instance_pool_id: d.instancePoolId,
    instance_pool_name: d.instancePoolName,
    min_idle_instances: d.minIdleInstances,
    max_capacity: d.maxCapacity,
    aws_attributes: d.awsAttributes,
    node_type_id: d.nodeTypeId,
    custom_tags: d.customTags,
    idle_instance_autotermination_minutes: d.idleInstanceAutoterminationMinutes,
    enable_elastic_disk: d.enableElasticDisk,
    disk_spec: d.diskSpec,
    preloaded_docker_images: d.preloadedDockerImages,
    preloaded_spark_versions: d.preloadedSparkVersions,
    azure_attributes: d.azureAttributes,
    gcp_attributes: d.gcpAttributes,
    node_type_flexibility: d.nodeTypeFlexibility,
    remote_disk_throughput: d.remoteDiskThroughput,
    total_initial_remote_disk_size: d.totalInitialRemoteDiskSize,
  }));

export const marshalInstancePoolAwsAttributesSchema: z.ZodType = z
  .object({
    availability: z.enum(AwsAvailability).optional(),
    zoneId: z.string().optional(),
    spotBidPricePercent: z.number().optional(),
    instanceProfileArn: z.string().optional(),
  })
  .transform(d => ({
    availability: d.availability,
    zone_id: d.zoneId,
    spot_bid_price_percent: d.spotBidPricePercent,
    instance_profile_arn: d.instanceProfileArn,
  }));

export const marshalInstancePoolAzureAttributesSchema: z.ZodType = z
  .object({
    availability: z.enum(AzureAvailability).optional(),
    spotBidMaxPrice: z.number().optional(),
  })
  .transform(d => ({
    availability: d.availability,
    spot_bid_max_price: d.spotBidMaxPrice,
  }));

export const marshalInstancePoolGcpAttributesSchema: z.ZodType = z
  .object({
    gcpAvailability: z.enum(GcpAvailability).optional(),
    localSsdCount: z.number().optional(),
    zoneId: z.string().optional(),
  })
  .transform(d => ({
    gcp_availability: d.gcpAvailability,
    local_ssd_count: d.localSsdCount,
    zone_id: d.zoneId,
  }));

export const marshalNodeTypeFlexibilitySchema: z.ZodType = z
  .object({
    alternateNodeTypeIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    alternate_node_type_ids: d.alternateNodeTypeIds,
  }));
