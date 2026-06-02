// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
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

export enum CloudProviderNodeStatus {
  NOT_ENABLED_ON_SUBSCRIPTION = 'NotEnabledOnSubscription',
  NOT_AVAILABLE_IN_REGION = 'NotAvailableInRegion',
}

/**
 * The kind of compute described by this compute specification.
 *
 * Depending on `kind`, different validations and default values will be applied.
 *
 * Clusters with `kind = CLASSIC_PREVIEW` support the following fields, whereas clusters with no specified `kind` do not.
 * * [is_single_node](/api/workspace/clusters/create#is_single_node)
 * * [use_ml_runtime](/api/workspace/clusters/create#use_ml_runtime)
 *
 * By using the [simple form](https://docs.databricks.com/compute/simple-form.html), your clusters are automatically using `kind = CLASSIC_PREVIEW`.
 */
export enum ComputeKind {
  COMPUTE_KIND_UNSPECIFIED = 'COMPUTE_KIND_UNSPECIFIED',
  CLASSIC_PREVIEW = 'CLASSIC_PREVIEW',
}

/**
 * Confidential computing technology for GCP instances.
 * Aligns with gcloud's --confidential-compute-type flag and the REST API's
 * confidentialInstanceConfig.confidentialInstanceType field.
 * See: https://cloud.google.com/confidential-computing/confidential-vm/docs/create-a-confidential-vm-instance
 */
export enum ConfidentialComputeType {
  CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED = 'CONFIDENTIAL_COMPUTE_TYPE_UNSPECIFIED',
  CONFIDENTIAL_COMPUTE_TYPE_NONE = 'CONFIDENTIAL_COMPUTE_TYPE_NONE',
  SEV_SNP = 'SEV_SNP',
}

export enum DataPlaneClusterEventType {
  NODE_BLACKLISTED = 'NODE_BLACKLISTED',
  NODE_EXCLUDED_DECOMMISSIONED = 'NODE_EXCLUDED_DECOMMISSIONED',
}

/**
 * Data security mode decides what data governance model to use when accessing data
 * from a cluster.
 *
 * * `DATA_SECURITY_MODE_AUTO`: <Databricks> will choose the most appropriate access mode depending on your compute configuration.
 * * `DATA_SECURITY_MODE_STANDARD`: A secure cluster that can be shared by multiple users. Cluster users are fully isolated so that they cannot see each other’s data and credentials. Most data governance features are supported in this mode. But programming languages and cluster features might be limited.
 * * `DATA_SECURITY_MODE_DEDICATED`: A secure cluster that can only be exclusively used by a single user specified in `single_user_name`. Most programming languages, cluster features and data governance features are available in this mode.
 *
 * The following modes are legacy aliases for the above modes:
 *
 * * `USER_ISOLATION`: Legacy alias for `DATA_SECURITY_MODE_STANDARD`.
 * * `SINGLE_USER`: Legacy alias for `DATA_SECURITY_MODE_DEDICATED`.
 *
 * The following modes are deprecated starting with Databricks Runtime 15.0 and
 * will be removed for future Databricks Runtime versions:
 *
 * * `LEGACY_TABLE_ACL`: This mode is for users migrating from legacy Table ACL clusters.
 * * `LEGACY_PASSTHROUGH`: This mode is for users migrating from legacy Passthrough on high concurrency clusters.
 * * `LEGACY_SINGLE_USER`: This mode is for users migrating from legacy Passthrough on standard clusters.
 * * `LEGACY_SINGLE_USER_STANDARD`: This mode provides a way that doesn’t have UC nor passthrough enabled.
 */
export enum DataSecurityMode {
  /**
   * No security isolation for multiple users sharing the cluster. Data governance features
   * are not available in this mode.
   */
  NONE = 'NONE',
  /** Legacy alias for `DATA_SECURITY_MODE_DEDICATED`. */
  SINGLE_USER = 'SINGLE_USER',
  /** Legacy alias for `DATA_SECURITY_MODE_STANDARD`. */
  USER_ISOLATION = 'USER_ISOLATION',
  /** This mode is for users migrating from legacy Table ACL clusters. */
  LEGACY_TABLE_ACL = 'LEGACY_TABLE_ACL',
  /** This mode is for users migrating from legacy Passthrough on high concurrency clusters. */
  LEGACY_PASSTHROUGH = 'LEGACY_PASSTHROUGH',
  /** This mode is for users migrating from legacy Passthrough on standard clusters. */
  LEGACY_SINGLE_USER = 'LEGACY_SINGLE_USER',
  /** This is mode where single user is enforced but no actual security feature enabled. */
  LEGACY_SINGLE_USER_STANDARD = 'LEGACY_SINGLE_USER_STANDARD',
  /**
   * A secure cluster that can be shared by multiple users. Cluster users are fully isolated
   * so that they cannot see each other's data and credentials. Most data governance features
   * are supported in this mode. But programming languages and cluster features might be limited.
   */
  DATA_SECURITY_MODE_STANDARD = 'DATA_SECURITY_MODE_STANDARD',
  /**
   * A secure cluster that can only be exclusively used by a single user specified in
   * `single_user_name`. Most programming languages, cluster features and data governance
   * features are available in this mode.
   */
  DATA_SECURITY_MODE_DEDICATED = 'DATA_SECURITY_MODE_DEDICATED',
  /**
   * Databricks will choose `DATA_SECURITY_MODE_STANDARD` or `DATA_SECURITY_MODE_DEDICATED`
   * depending on the compute configuration.
   */
  DATA_SECURITY_MODE_AUTO = 'DATA_SECURITY_MODE_AUTO',
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

export enum GetEventsOrder {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum RuntimeEngine {
  /**
   * Default value. In this case, ignore the RUNTIME_ENGINE
   * parameter and do a spark version lookup entirely on the sparkVersion string.
   */
  NULL = 'NULL',
  /** Use standard engine */
  STANDARD = 'STANDARD',
  /** Use Photon engine */
  PHOTON = 'PHOTON',
}

/** The status code indicating why the cluster was terminated */
export enum TerminationCode {
  /** Default when there is no termination code. */
  UNKNOWN = 'UNKNOWN',
  /**
   * A user terminated the cluster directly. Parameters should include a ``username`` field
   * that indicates the specific user who terminated the cluster.
   */
  USER_REQUEST = 'USER_REQUEST',
  /** This cluster was launched by a Job, and terminated when the Job completed. */
  JOB_FINISHED = 'JOB_FINISHED',
  /** This cluster was terminated since it was idle. */
  INACTIVITY = 'INACTIVITY',
  /**
   * The instance that hosted the spark driver was terminated by the cloud provider. In AWS, for
   * example, AWS may retire instances and directly shut them down.
   * Parameters should include an ``aws_instance_state_reason`` field indicating the AWS-provided
   * reason why the instance was terminated.
   */
  CLOUD_PROVIDER_SHUTDOWN = 'CLOUD_PROVIDER_SHUTDOWN',
  /**
   * Databricks may lose connection to services on the driver instance. One such case is when
   * problems arise in cloud networking infrastructure, or when the instance itself becomes
   * unhealthy.
   */
  COMMUNICATION_LOST = 'COMMUNICATION_LOST',
  /**
   * Databricks may hit cloud provider failures when requesting instances to launch clusters.
   * For example, AWS limits the number of running instances and EBS volumes. If you ask Databricks
   * to launch a cluster that requires instances or EBS volumes that exceed your AWS limit, the
   * cluster will fail with this status code.
   * Parameters should include one of ``aws_api_error_code``, ``aws_instance_state_reason``, or
   * ``aws_spot_request_status`` to indicate the AWS-provided reason why Databricks could not
   * request the required instances for the cluster.
   */
  CLOUD_PROVIDER_LAUNCH_FAILURE = 'CLOUD_PROVIDER_LAUNCH_FAILURE',
  /**
   * Databricks cannot load and execute a cluster-scoped init script on one of the cluster's nodes,
   * or the init script terminates with a non-zero exit code or there was a general failure during
   * the loading/executing of init scripts that does not pertain to any specific script.
   */
  INIT_SCRIPT_FAILURE = 'INIT_SCRIPT_FAILURE',
  /**
   * The Spark driver failed to start. Possible reasons may include incompatible libraries and
   * initialization scripts that corrupted the Spark container.
   */
  SPARK_STARTUP_FAILURE = 'SPARK_STARTUP_FAILURE',
  /**
   * Cannot launch the cluster because the user specified an invalid argument.  For example,
   * the use might specify an invalid spark version for the cluster.
   */
  INVALID_ARGUMENT = 'INVALID_ARGUMENT',
  /**
   * While launching this cluster, Databricks failed to complete critical setup steps, terminating
   * the cluster.
   */
  UNEXPECTED_LAUNCH_FAILURE = 'UNEXPECTED_LAUNCH_FAILURE',
  /**
   * Databricks encountered an unexpected error which forced the running cluster to be terminated.
   * Please contact Databricks support for additional details.
   */
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  /**
   * Databricks was not able to access instances in order to start the cluster. This can be a
   * transient networking issue. If the problem persists, this usually indicates a networking
   * environment misconfiguration.
   */
  INSTANCE_UNREACHABLE = 'INSTANCE_UNREACHABLE',
  /**
   * Blocked upsize requests for the workspace according to
   * https://databricks.atlassian.net/wiki/spaces/UN/pages/934088320/Banning+Workspace+Upsize+Runbook
   */
  REQUEST_REJECTED = 'REQUEST_REJECTED',
  /** The cluster was terminated because it was running in a trial workspace that expired. */
  TRIAL_EXPIRED = 'TRIAL_EXPIRED',
  /**
   * The cluster was terminated because no response from the chauffeur could be received. We name
   * this "DRIVER_" instead of "CHAUFFEUR_" since chauffeur is non-external terminology
   */
  DRIVER_UNREACHABLE = 'DRIVER_UNREACHABLE',
  /** Spark error on startup */
  SPARK_ERROR = 'SPARK_ERROR',
  /** Driver unresponsive */
  DRIVER_UNRESPONSIVE = 'DRIVER_UNRESPONSIVE',
  /** Metastore component unhealthy */
  METASTORE_COMPONENT_UNHEALTHY = 'METASTORE_COMPONENT_UNHEALTHY',
  /** DBFS component unhealthy */
  DBFS_COMPONENT_UNHEALTHY = 'DBFS_COMPONENT_UNHEALTHY',
  /** Execution component unhealthy */
  EXECUTION_COMPONENT_UNHEALTHY = 'EXECUTION_COMPONENT_UNHEALTHY',
  /**
   * Databricks may hit the azure resource manager request limit. Which will keep the Azure SDK
   * from issuing any read or write request to Azure resource manager. The request limit is applied
   * to each subscription every hour, thus retry after an hour or changing to a smaller cluster size
   * might help to resolve the issue. Please check the following link for more information:
   * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits
   */
  AZURE_RESOURCE_MANAGER_THROTTLING = 'AZURE_RESOURCE_MANAGER_THROTTLING',
  /**
   * Databricks may hit the azure resource provider request limit. Specifically, the API request
   * rate to the specific resource type (Compute, Network, etc..) can't exceed the limit. Retry
   * might help to resolve the issue. Please check the following link for more information:
   * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/
   * troubleshooting-throttling-errors
   */
  AZURE_RESOURCE_PROVIDER_THROTTLING = 'AZURE_RESOURCE_PROVIDER_THROTTLING',
  /** The cluster was terminated due to an error in the network configuration. */
  NETWORK_CONFIGURATION_FAILURE = 'NETWORK_CONFIGURATION_FAILURE',
  /**
   * Databricks encountered an unexpected error while launching containers on worker nodes for the
   * cluster, terminating the cluster.
   */
  CONTAINER_LAUNCH_FAILURE = 'CONTAINER_LAUNCH_FAILURE',
  /** Instance pool backed cluster specific failure */
  INSTANCE_POOL_CLUSTER_FAILURE = 'INSTANCE_POOL_CLUSTER_FAILURE',
  /** Cluster start successfully completed but skipped some instances which were slow to launch */
  SKIPPED_SLOW_NODES = 'SKIPPED_SLOW_NODES',
  /** Attach projects failure */
  ATTACH_PROJECT_FAILURE = 'ATTACH_PROJECT_FAILURE',
  /** Attach projects failure */
  UPDATE_INSTANCE_PROFILE_FAILURE = 'UPDATE_INSTANCE_PROFILE_FAILURE',
  /** Cluster terminated due to database failure */
  DATABASE_CONNECTION_FAILURE = 'DATABASE_CONNECTION_FAILURE',
  /**
   * Databricks cannot handle the request at this moment. Please try again later
   * and contact Databricks if the problem persists.
   */
  REQUEST_THROTTLED = 'REQUEST_THROTTLED',
  /** SelfBootstrap failure. Either self-bootstrap fast fail or node daemon ping timeout */
  SELF_BOOTSTRAP_FAILURE = 'SELF_BOOTSTRAP_FAILURE',
  /**
   * Databricks cannot load and execute a global init script on one of the cluster's nodes,
   * or the init script terminates with a non-zero exit code.
   */
  GLOBAL_INIT_SCRIPT_FAILURE = 'GLOBAL_INIT_SCRIPT_FAILURE',
  /**
   * Container launch timed out downloading the spark image. This can happen if the customer
   * has byo-vpc/vnet and the download of large files is being throttled.
   */
  SLOW_IMAGE_DOWNLOAD = 'SLOW_IMAGE_DOWNLOAD',
  /** Container setup failed due to an invalid Spark image. */
  INVALID_SPARK_IMAGE = 'INVALID_SPARK_IMAGE',
  /**
   * If the ngrok tunnel token provisioning fails for any reason, for example hitting the
   * max capacity of allowed ngrok tokens.  (ES-32083)
   */
  NPIP_TUNNEL_TOKEN_FAILURE = 'NPIP_TUNNEL_TOKEN_FAILURE',
  /** Hive Metastore provisioning failue in launch container step */
  HIVE_METASTORE_PROVISIONING_FAILURE = 'HIVE_METASTORE_PROVISIONING_FAILURE',
  /**
   * Occurs when the deployment template we submit to Azure violates their requirements.
   * Typical scenarios:
   * - Wrong parameter key/value used
   * - Exceed the limit for certain parameter
   */
  AZURE_INVALID_DEPLOYMENT_TEMPLATE = 'AZURE_INVALID_DEPLOYMENT_TEMPLATE',
  /**
   * The set of un-categorized failure responses from Azure when we launch instance resources
   * using deployment template
   */
  AZURE_UNEXPECTED_DEPLOYMENT_TEMPLATE_FAILURE = 'AZURE_UNEXPECTED_DEPLOYMENT_TEMPLATE_FAILURE',
  /** Subnet (typically Azure vnet injected) has run out of ip addresses */
  SUBNET_EXHAUSTED_FAILURE = 'SUBNET_EXHAUSTED_FAILURE',
  /**
   * Timeout to ping the nodeDaemon, possible reason: nodeDaemon didn't start (configuration issue),
   * network connectivity issue
   */
  BOOTSTRAP_TIMEOUT = 'BOOTSTRAP_TIMEOUT',
  /** Bootstrap timeout due to script download failure */
  STORAGE_DOWNLOAD_FAILURE = 'STORAGE_DOWNLOAD_FAILURE',
  /** Bootstrap timeout due to get runbook failure */
  CONTROL_PLANE_REQUEST_FAILURE = 'CONTROL_PLANE_REQUEST_FAILURE',
  /** Bootstrap timeout due to Azure Extension Service Failure */
  BOOTSTRAP_TIMEOUT_CLOUD_PROVIDER_EXCEPTION = 'BOOTSTRAP_TIMEOUT_CLOUD_PROVIDER_EXCEPTION',
  /** Could not find enough of the requested instance type in the requested AZ. Often related to Auto AZ. */
  AWS_INSUFFICIENT_INSTANCE_CAPACITY_FAILURE = 'AWS_INSUFFICIENT_INSTANCE_CAPACITY_FAILURE',
  /** Container setup failure due to docker image pulling failure */
  DOCKER_IMAGE_PULL_FAILURE = 'DOCKER_IMAGE_PULL_FAILURE',
  /**
   * Failures during azure vnet configuration. For example, a workspace with VNet injection had
   * incorrect DNS settings that blocked access to worker artifacts.
   */
  AZURE_VNET_CONFIGURATION_FAILURE = 'AZURE_VNET_CONFIGURATION_FAILURE',
  /**
   * Bootstrap failure due to Ngrok tunnel setup timeout or failure. For example, if the worker
   * node is unable to reach the Ngrok tunnel domain.
   */
  NPIP_TUNNEL_SETUP_FAILURE = 'NPIP_TUNNEL_SETUP_FAILURE',
  /**
   * Lack authorization for cluster operation.
   * For example, awsApiErrorCode: 'AccessDenied' or 'UnauthorizedOperation'.
   */
  AWS_AUTHORIZATION_FAILURE = 'AWS_AUTHORIZATION_FAILURE',
  /** request comes form Nephos resource pool auto management */
  NEPHOS_RESOURCE_MANAGEMENT = 'NEPHOS_RESOURCE_MANAGEMENT',
  /**
   * Container setup failed during container registration to security daemon due to STS endpoint
   * connection error.
   */
  STS_CLIENT_SETUP_FAILURE = 'STS_CLIENT_SETUP_FAILURE',
  /** Container setup failed during registration to security daemon due to an unspecified error. */
  SECURITY_DAEMON_REGISTRATION_EXCEPTION = 'SECURITY_DAEMON_REGISTRATION_EXCEPTION',
  /** The maximum request rate permitted by the Amazon EC2 APIs has been exceeded for your account. */
  AWS_REQUEST_LIMIT_EXCEEDED = 'AWS_REQUEST_LIMIT_EXCEEDED',
  /** We don't have enough addresses in the subnet for the instances in the request. */
  AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE = 'AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE',
  /** The request is not supported (This is a vague error code that can be thrown for a lot of reasons.) */
  AWS_UNSUPPORTED_FAILURE = 'AWS_UNSUPPORTED_FAILURE',
  /** Could not find enough azure resources to fulfill the request. */
  AZURE_QUOTA_EXCEEDED_EXCEPTION = 'AZURE_QUOTA_EXCEEDED_EXCEPTION',
  /** NOTE: This is currently used by exceptions with messages that are classified as user errors. */
  AZURE_OPERATION_NOT_ALLOWED_EXCEPTION = 'AZURE_OPERATION_NOT_ALLOWED_EXCEPTION',
  /** Failure when mounting remote NFS to container */
  NFS_MOUNT_FAILURE = 'NFS_MOUNT_FAILURE',
  /** K8S failed to upscale to acquire new nodes */
  K8S_AUTOSCALING_FAILURE = 'K8S_AUTOSCALING_FAILURE',
  /** DBR Cluster launched on K8s (i.e. CMv2) has failed to start up in time */
  K8S_DBR_CLUSTER_LAUNCH_TIMEOUT = 'K8S_DBR_CLUSTER_LAUNCH_TIMEOUT',
  /**
   * Container launch failed while downloading the spark image. Catch all for if anything
   * goes wrong while downloading and extracting the spark tarball.
   */
  SPARK_IMAGE_DOWNLOAD_FAILURE = 'SPARK_IMAGE_DOWNLOAD_FAILURE',
  /** Azure VM Extension failure during instance bootstrap */
  AZURE_VM_EXTENSION_FAILURE = 'AZURE_VM_EXTENSION_FAILURE',
  /** Workspace was cancelled hence deny/terminate the cluster */
  WORKSPACE_CANCELLED_ERROR = 'WORKSPACE_CANCELLED_ERROR',
  /** The spot instance count in an account has exceeded the limit */
  AWS_MAX_SPOT_INSTANCE_COUNT_EXCEEDED_FAILURE = 'AWS_MAX_SPOT_INSTANCE_COUNT_EXCEEDED_FAILURE',
  /**
   * Cluster is terminated because the services are temporarily unavailable.
   * This normally happens when CM is restarting and draining execution contexts,
   * or IM/Delegate is overloaded, so that it will not be able to retry the instance launch request.
   */
  TEMPORARILY_UNAVAILABLE = 'TEMPORARILY_UNAVAILABLE',
  /**
   * Bootstrap failure due to error during worker setup, usually due to an issue with
   * disk or gpu setup. See SetupCommandBuilder for other possible causes
   */
  WORKER_SETUP_FAILURE = 'WORKER_SETUP_FAILURE',
  /**
   * Cluster failure due to IP space exhaustion. For example on CMv2, Kubernetes will fail to scale
   * up new nodes if the pod IP CIDR block is exhausted.
   */
  IP_EXHAUSTION_FAILURE = 'IP_EXHAUSTION_FAILURE',
  /**
   * Could not find enough GCP resources to fulfill the request.
   * TODO: It's very unfortunate that we have per-cloud termination reasons while we should have
   * cloud-agnostic termination reasons. For example, we should consolidate
   * {AZURE_QUOTA_EXCEEDED_EXCEPTION, AWS_REQUEST_LIMIT_EXCEEDED and GCP_QUOTA_EXCEEDED},
   * {AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE, IP_EXHAUSTION_FAILURE}, etc.
   */
  GCP_QUOTA_EXCEEDED = 'GCP_QUOTA_EXCEEDED',
  /** Cloud provider is undergoing a transient resource throttling. This is retryable. */
  CLOUD_PROVIDER_RESOURCE_STOCKOUT = 'CLOUD_PROVIDER_RESOURCE_STOCKOUT',
  /** The GCP service account associated with the DBR cluster is deleted. */
  GCP_SERVICE_ACCOUNT_DELETED = 'GCP_SERVICE_ACCOUNT_DELETED',
  /** Legit cluster termination in Azure caused by customer revoking the key permission used for managed-disks encryption */
  AZURE_BYOK_KEY_PERMISSION_FAILURE = 'AZURE_BYOK_KEY_PERMISSION_FAILURE',
  /** Termination because of spot instance terminated by cloud provider */
  SPOT_INSTANCE_TERMINATION = 'SPOT_INSTANCE_TERMINATION',
  /** Termination because of unsupported azure ephemeral os disk setup */
  AZURE_EPHEMERAL_DISK_FAILURE = 'AZURE_EPHEMERAL_DISK_FAILURE',
  /**
   * The cluster was terminated because we detected an abusive runtime behavior that violated
   * Terms of Service or Acceptable Use Policy.
   */
  ABUSE_DETECTED = 'ABUSE_DETECTED',
  /** Failed to pull DBR images due to permission error. */
  IMAGE_PULL_PERMISSION_DENIED = 'IMAGE_PULL_PERMISSION_DENIED',
  /** Workspace configuration is in error state due to configuration issue or ACL modification by the customer side */
  WORKSPACE_CONFIGURATION_ERROR = 'WORKSPACE_CONFIGURATION_ERROR',
  /**
   * Catch all error for all secret resolution issues in cluster launch. This should be alerted on,
   * and is considered a server error. This can be split out into other cases if there are client
   * errors - for e.g. INVALID_ARGUMENT is used for secrets that don't exist and permission issues
   */
  SECRET_RESOLUTION_ERROR = 'SECRET_RESOLUTION_ERROR',
  /**
   * Failure due to an instance being of an unsupported type. This is used when an instance in
   * an EC2 fleet is of an unrecognized type, or an invalid type (i.e. graviton when we don't
   * want graviton instances). This should be alerted on.
   */
  UNSUPPORTED_INSTANCE_TYPE = 'UNSUPPORTED_INSTANCE_TYPE',
  /** Failed during instance bootstrap with error code Cannot convert NVMe-based dev id */
  CLOUD_PROVIDER_DISK_SETUP_FAILURE = 'CLOUD_PROVIDER_DISK_SETUP_FAILURE',
  /** Exception when setting up instances using ssh bootstrap */
  SSH_BOOTSTRAP_FAILURE = 'SSH_BOOTSTRAP_FAILURE',
  /** Failed during instance bootstrap with error code Cannot convert NVMe-based dev id */
  AWS_INACCESSIBLE_KMS_KEY_FAILURE = 'AWS_INACCESSIBLE_KMS_KEY_FAILURE',
  /**
   * The bootstrapping init-containers in Spark failed or timed out, blocking the Spark container
   * from bootstrapping. This is a refinement of `SPARK_STARTUP_FAILURE`.
   * (init-containers are a bootstrapping step owned by Databricks)
   */
  INIT_CONTAINER_NOT_FINISHED = 'INIT_CONTAINER_NOT_FINISHED',
  /**
   * Container launch failed due to storage servers throttling our download of spark images. Can
   * happen due to transient spikes of downloads overloading storage servers or gradual increase in
   * usage. In the latter case we need to increase the number of storage servers in the region to
   * help spread load.
   */
  SPARK_IMAGE_DOWNLOAD_THROTTLED = 'SPARK_IMAGE_DOWNLOAD_THROTTLED',
  /**
   * The spark image specified for the cluster was not found when attempting to download. Usually
   * due to the customer custom specifying a bad image.
   */
  SPARK_IMAGE_NOT_FOUND = 'SPARK_IMAGE_NOT_FOUND',
  /**
   * Indicates that the cloud provider operations performed for the cluster were dropped due to
   * an influx in load in the cloud provider and had to be dropped from our end to alleviate
   * pressure within the DelegateRpcClient. Please see go/cmloadshedding for more.
   */
  CLUSTER_OPERATION_THROTTLED = 'CLUSTER_OPERATION_THROTTLED',
  /**
   * The error code can be used to indicate a request misses its deadline. Can be used for either request timeouts
   * or missed deadlines (i.e. a request is not completed as it was processed after its specified deadline)
   */
  CLUSTER_OPERATION_TIMEOUT = 'CLUSTER_OPERATION_TIMEOUT',
  /**
   * This error code is used to terminate long-running Generic compute jobs in Serverless Environment
   * as part of the NephosLongRunning watcher running in Cluster Monitor Service.
   */
  SERVERLESS_LONG_RUNNING_TERMINATED = 'SERVERLESS_LONG_RUNNING_TERMINATED',
  /**
   * This error code is used when the cluster is terminated due to its instances fail with partial failure from Azure
   * packed deployments. In Azure, we might pack multiple launch requests in one deployment template in order
   * to avoid the 800 templates limit on Azure side. If the packed deployment fails multiple times, the cluster could
   * be terminated by this [[AZURE_PACKED_DEPLOYMENT_PARTIAL_FAILURE]] termination code.
   */
  AZURE_PACKED_DEPLOYMENT_PARTIAL_FAILURE = 'AZURE_PACKED_DEPLOYMENT_PARTIAL_FAILURE',
  /**
   * The instances acquired from a pool in IMv2 do not have a valid worker image to be used in the
   * cluster launch. This usually occurs after AMI/VHD upgrades, worker branch updates, etc.
   */
  INVALID_WORKER_IMAGE_FAILURE = 'INVALID_WORKER_IMAGE_FAILURE',
  /** Worker environment version was changed due to workspace network or CMK update. */
  WORKSPACE_UPDATE = 'WORKSPACE_UPDATE',
  /** The parameter user specified or the user account to create the cluster is invalid according to AWS. */
  INVALID_AWS_PARAMETER = 'INVALID_AWS_PARAMETER',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   *
   * k8s evicted the driver pod due to disk pressure on the driver node. This is likely due to a
   * customer job consuming too much disk and so this is classified as a customer issue.
   */
  DRIVER_OUT_OF_DISK = 'DRIVER_OUT_OF_DISK',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   *
   * k8s evicted the driver pod due to memory pressure on the driver node. A customer job consuming
   * significant amounts of memory should not be able to trigger this as the driver container would
   * OOM first (we set memory limits on our pods). Thus this termination reason will be considered
   * a databricks issue.
   */
  DRIVER_OUT_OF_MEMORY = 'DRIVER_OUT_OF_MEMORY',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   * Original driver pod took too long to become ready and timed out.
   */
  DRIVER_LAUNCH_TIMEOUT = 'DRIVER_LAUNCH_TIMEOUT',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   * Unexpected failure during driver pod launch.
   */
  DRIVER_UNEXPECTED_FAILURE = 'DRIVER_UNEXPECTED_FAILURE',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   * Unexpected new driver pod created
   */
  UNEXPECTED_POD_RECREATION = 'UNEXPECTED_POD_RECREATION',
  /** Failure due to disabled or inaccessible CMK. */
  GCP_INACCESSIBLE_KMS_KEY_FAILURE = 'GCP_INACCESSIBLE_KMS_KEY_FAILURE',
  /** Failure due to missing/incorrect permission setup on CMK. */
  GCP_KMS_KEY_PERMISSION_DENIED = 'GCP_KMS_KEY_PERMISSION_DENIED',
  /** Driver pod evicted in Nephos */
  DRIVER_EVICTION = 'DRIVER_EVICTION',
  /** User request for termination directly to cloud */
  USER_INITIATED_VM_TERMINATION = 'USER_INITIATED_VM_TERMINATION',
  /** GCP Specific IAM API timeout issues during Workload Idenitity (Cluster Identity) binding process */
  GCP_IAM_TIMEOUT = 'GCP_IAM_TIMEOUT',
  /** Could not find enough AWS resources to fulfill the request */
  AWS_RESOURCE_QUOTA_EXCEEDED = 'AWS_RESOURCE_QUOTA_EXCEEDED',
  /** Cloud account setup has some error (e.g. pending email verification, blocked) */
  CLOUD_ACCOUNT_SETUP_FAILURE = 'CLOUD_ACCOUNT_SETUP_FAILURE',
  /** The specified key pair name does not exist. */
  AWS_INVALID_KEY_PAIR = 'AWS_INVALID_KEY_PAIR',
  /** Driver pod creation failure in nephos */
  DRIVER_POD_CREATION_FAILURE = 'DRIVER_POD_CREATION_FAILURE',
  /** Cluster terminated manually by on-call due to emergency maintenance */
  MAINTENANCE_MODE = 'MAINTENANCE_MODE',
  /** Nephos internal error due to insufficient provisioned k8s capacity or insufficient cloud quota */
  INTERNAL_CAPACITY_FAILURE = 'INTERNAL_CAPACITY_FAILURE',
  /** Nephos: could not acquire executor pods from pod pool */
  EXECUTOR_POD_UNSCHEDULED = 'EXECUTOR_POD_UNSCHEDULED',
  /** Artifact download failed because it was too slow */
  STORAGE_DOWNLOAD_FAILURE_SLOW = 'STORAGE_DOWNLOAD_FAILURE_SLOW',
  /** Artifact download failed because it was throttled by the download server */
  STORAGE_DOWNLOAD_FAILURE_THROTTLED = 'STORAGE_DOWNLOAD_FAILURE_THROTTLED',
  /** The cluster was terminated because the size of the dynamic spark conf exceeded the limit. */
  DYNAMIC_SPARK_CONF_SIZE_EXCEEDED = 'DYNAMIC_SPARK_CONF_SIZE_EXCEEDED',
  /** Failure to update the instance profile for the cluster. */
  AWS_INSTANCE_PROFILE_UPDATE_FAILURE = 'AWS_INSTANCE_PROFILE_UPDATE_FAILURE',
  /** The instance pool did not exist when the cluster was launched. */
  INSTANCE_POOL_NOT_FOUND = 'INSTANCE_POOL_NOT_FOUND',
  /** Attempting to launch more instances was rejected as it would exceed the pool's max capacity. */
  INSTANCE_POOL_MAX_CAPACITY_REACHED = 'INSTANCE_POOL_MAX_CAPACITY_REACHED',
  /** The KMS key provided is in an incorrect state. */
  AWS_INVALID_KMS_KEY_STATE = 'AWS_INVALID_KMS_KEY_STATE',
  /** Insufficient capacity failure from GCE API. */
  GCP_INSUFFICIENT_CAPACITY = 'GCP_INSUFFICIENT_CAPACITY',
  /** Rate quota exceeded for GCP API (e.g. Read requests per minute per region). */
  GCP_API_RATE_QUOTA_EXCEEDED = 'GCP_API_RATE_QUOTA_EXCEEDED',
  /** Resource quota exceeded (e.g. # of n1 vCPUs in a region). */
  GCP_RESOURCE_QUOTA_EXCEEDED = 'GCP_RESOURCE_QUOTA_EXCEEDED',
  /** Subnet IP space exhausted. */
  GCP_IP_SPACE_EXHAUSTED = 'GCP_IP_SPACE_EXHAUSTED',
  /** Missing permissions to launch VM with service account. */
  GCP_SERVICE_ACCOUNT_ACCESS_DENIED = 'GCP_SERVICE_ACCOUNT_ACCESS_DENIED',
  /** VM attempting to launch with non-existent service account. */
  GCP_SERVICE_ACCOUNT_NOT_FOUND = 'GCP_SERVICE_ACCOUNT_NOT_FOUND',
  /** Forbidden (403) returned by GCP API. */
  GCP_FORBIDDEN = 'GCP_FORBIDDEN',
  /** Not found (404) returned by GCP API. */
  GCP_NOT_FOUND = 'GCP_NOT_FOUND',
  /** Gatekeeper indicated the cluster should be shutdown */
  RESOURCE_USAGE_BLOCKED = 'RESOURCE_USAGE_BLOCKED',
  /** The data access config of the workspace has changed, and clusters using outdated config will be terminated. */
  DATA_ACCESS_CONFIG_CHANGED = 'DATA_ACCESS_CONFIG_CHANGED',
  /** Failed to fetch internal PAT token required for init script installation from WSFS/UC volumes */
  ACCESS_TOKEN_FAILURE = 'ACCESS_TOKEN_FAILURE',
  /**
   * It indicates there is a placement v2 protocol rollout/rollback event for the corresponding workspace when
   * processing the placement session on the instance-manager side. A retry will fix the issue by switching back
   * to the correct placement protocol.
   */
  INVALID_INSTANCE_PLACEMENT_PROTOCOL = 'INVALID_INSTANCE_PLACEMENT_PROTOCOL',
  /** The cluster was terminated as it failed to resolve budget policy. */
  BUDGET_POLICY_RESOLUTION_FAILURE = 'BUDGET_POLICY_RESOLUTION_FAILURE',
  /**
   * This customer/error combination is a known issue and is intentionally excluded from termination
   * metrics
   */
  IN_PENALTY_BOX = 'IN_PENALTY_BOX',
  /**
   * The cluster was terminated when the primary workspace failed over to the secondary workspace.
   * This is expected because there is no data plane in the secondary workspace.
   */
  DISASTER_RECOVERY_REPLICATION = 'DISASTER_RECOVERY_REPLICATION',
  /** A bootstrap timeout that was caused by misconfiguration on the customer's side */
  BOOTSTRAP_TIMEOUT_DUE_TO_MISCONFIG = 'BOOTSTRAP_TIMEOUT_DUE_TO_MISCONFIG',
  /** Instance unreachable, but due to misconfiguration on the customer's side */
  INSTANCE_UNREACHABLE_DUE_TO_MISCONFIG = 'INSTANCE_UNREACHABLE_DUE_TO_MISCONFIG',
  /** Bootstrap timeout due to script download failure, but due to misconfiguration on the customer's side */
  STORAGE_DOWNLOAD_FAILURE_DUE_TO_MISCONFIG = 'STORAGE_DOWNLOAD_FAILURE_DUE_TO_MISCONFIG',
  /** CPRF, but due to misconfiguration on the customer's side */
  CONTROL_PLANE_REQUEST_FAILURE_DUE_TO_MISCONFIG = 'CONTROL_PLANE_REQUEST_FAILURE_DUE_TO_MISCONFIG',
  /** CPLF, but due to misconfiguration on the customer's side */
  CLOUD_PROVIDER_LAUNCH_FAILURE_DUE_TO_MISCONFIG = 'CLOUD_PROVIDER_LAUNCH_FAILURE_DUE_TO_MISCONFIG',
  /** GCP subnet is in transient "resourceNotReady" state. */
  GCP_SUBNET_NOT_READY = 'GCP_SUBNET_NOT_READY',
  /** The operation on the cloud provider was cancelled. Possibly due to a user action. */
  CLOUD_OPERATION_CANCELLED = 'CLOUD_OPERATION_CANCELLED',
  /**
   * If cloud provider indicates instance creation was a success, yet the instance is never created.
   * This can happen in certain edge cases like quota exhaustion on GCP. We have an open bug here:
   * https://partnerissuetracker.corp.google.com/issues/339061883
   */
  CLOUD_PROVIDER_INSTANCE_NOT_LAUNCHED = 'CLOUD_PROVIDER_INSTANCE_NOT_LAUNCHED',
  /** GCP Databricks VM Machine Image is blocked by customer organization policy. */
  GCP_TRUSTED_IMAGE_PROJECTS_VIOLATED = 'GCP_TRUSTED_IMAGE_PROJECTS_VIOLATED',
  /** cluster terminate can happened when a budget policy limit enforcement activated */
  BUDGET_POLICY_LIMIT_ENFORCEMENT_ACTIVATED = 'BUDGET_POLICY_LIMIT_ENFORCEMENT_ACTIVATED',
  EOS_SPARK_IMAGE = 'EOS_SPARK_IMAGE',
  /** Serverless only. There are no eligible K8s for the cluster. */
  NO_MATCHED_K8S = 'NO_MATCHED_K8S',
  /** Lazy allocation timeout. Timeout before any internal DBR clusters were allocated. */
  LAZY_ALLOCATION_TIMEOUT = 'LAZY_ALLOCATION_TIMEOUT',
  /** CMv2 unable to contact chauffeur or node-daemon on the driver node. */
  DRIVER_NODE_UNREACHABLE = 'DRIVER_NODE_UNREACHABLE',
  /** Dynamic secret generation failed. */
  SECRET_CREATION_FAILURE = 'SECRET_CREATION_FAILURE',
  /** Driver or executor pod failed to be scheduled. */
  POD_SCHEDULING_FAILURE = 'POD_SCHEDULING_FAILURE',
  /** Driver or executor pod failed to finish assigning. */
  POD_ASSIGNMENT_FAILURE = 'POD_ASSIGNMENT_FAILURE',
  /** Lazy allocation timeout with unknown reason. */
  ALLOCATION_TIMEOUT = 'ALLOCATION_TIMEOUT',
  /** Lazy allocation timeout. Maps to NoUnallocatedDbrCluster. */
  ALLOCATION_TIMEOUT_NO_UNALLOCATED_CLUSTERS = 'ALLOCATION_TIMEOUT_NO_UNALLOCATED_CLUSTERS',
  /** Lazy allocation timeout. Maps to NoMatchedUnallocatedDbrCluster. */
  ALLOCATION_TIMEOUT_NO_MATCHED_CLUSTERS = 'ALLOCATION_TIMEOUT_NO_MATCHED_CLUSTERS',
  /** Lazy allocation timeout. Maps to NoUnallocatedReadyDbrCluster. */
  ALLOCATION_TIMEOUT_NO_READY_CLUSTERS = 'ALLOCATION_TIMEOUT_NO_READY_CLUSTERS',
  /** Lazy allocation timeout. Maps to NoMatchedUnallocatedWarmedUpDbrCluster. */
  ALLOCATION_TIMEOUT_NO_WARMED_UP_CLUSTERS = 'ALLOCATION_TIMEOUT_NO_WARMED_UP_CLUSTERS',
  /** Lazy allocation timeout. Maps to NoCandidatesWithNodeDaemonK8sReady. */
  ALLOCATION_TIMEOUT_NODE_DAEMON_NOT_READY = 'ALLOCATION_TIMEOUT_NODE_DAEMON_NOT_READY',
  /** Lazy allocation timeout. Maps to NoCandidatesHealthy. */
  ALLOCATION_TIMEOUT_NO_HEALTHY_CLUSTERS = 'ALLOCATION_TIMEOUT_NO_HEALTHY_CLUSTERS',
  /**
   * When nephos blocking wait for netvisor setup ready signal, terminated by timeout.
   * This error code only applies to clusters with the attribute should_block_for_network_readiness: true
   */
  NETVISOR_SETUP_TIMEOUT = 'NETVISOR_SETUP_TIMEOUT',
  /** Serverless only. The preselected K8s for the cluster is not eligible. */
  NO_MATCHED_K8S_TESTING_TAG = 'NO_MATCHED_K8S_TESTING_TAG',
  /** The customer's repeatedly attempting to launch clusters with some configuration that the CSP's not able to provide */
  CLOUD_PROVIDER_RESOURCE_STOCKOUT_DUE_TO_MISCONFIG = 'CLOUD_PROVIDER_RESOURCE_STOCKOUT_DUE_TO_MISCONFIG',
  /** For the GCP CMv1 Migration, we will terminate all CMv2 based clusters with this failure. */
  GKE_BASED_CLUSTER_TERMINATION = 'GKE_BASED_CLUSTER_TERMINATION',
  /** Lazy allocation timeout. Maps to NoCandidatesHealthyAndWarmedUp. */
  ALLOCATION_TIMEOUT_NO_HEALTHY_AND_WARMED_UP_CLUSTERS = 'ALLOCATION_TIMEOUT_NO_HEALTHY_AND_WARMED_UP_CLUSTERS',
  /** Docker container's OS was not valid. */
  DOCKER_INVALID_OS_EXCEPTION = 'DOCKER_INVALID_OS_EXCEPTION',
  /** Something went wrong during the creation of the docker container. */
  DOCKER_CONTAINER_CREATION_EXCEPTION = 'DOCKER_CONTAINER_CREATION_EXCEPTION',
  /** Customer passed in a docker image that's too large for the instance. */
  DOCKER_IMAGE_TOO_LARGE_FOR_INSTANCE_EXCEPTION = 'DOCKER_IMAGE_TOO_LARGE_FOR_INSTANCE_EXCEPTION',
  /** The cluster was terminated because the DNS resolution failed. */
  DNS_RESOLUTION_ERROR = 'DNS_RESOLUTION_ERROR',
  /** Org policy is preventing a GCE API operation from being executed. */
  GCP_DENIED_BY_ORG_POLICY = 'GCP_DENIED_BY_ORG_POLICY',
  /** Customer passed in a secret that they do not have permissions to resolve. */
  SECRET_PERMISSION_DENIED = 'SECRET_PERMISSION_DENIED',
  /** Start of network health check generated failures */
  NETWORK_CHECK_NIC_FAILURE = 'NETWORK_CHECK_NIC_FAILURE',
  NETWORK_CHECK_DNS_SERVER_FAILURE = 'NETWORK_CHECK_DNS_SERVER_FAILURE',
  NETWORK_CHECK_STORAGE_FAILURE = 'NETWORK_CHECK_STORAGE_FAILURE',
  NETWORK_CHECK_METADATA_ENDPOINT_FAILURE = 'NETWORK_CHECK_METADATA_ENDPOINT_FAILURE',
  NETWORK_CHECK_CONTROL_PLANE_FAILURE = 'NETWORK_CHECK_CONTROL_PLANE_FAILURE',
  NETWORK_CHECK_MULTIPLE_COMPONENTS_FAILURE = 'NETWORK_CHECK_MULTIPLE_COMPONENTS_FAILURE',
  /** Driver has been down or unresponsive for an extended period of time */
  DRIVER_UNHEALTHY = 'DRIVER_UNHEALTHY',
  /** cluster request is denied due to disallowed usage policy entitlement */
  USAGE_POLICY_ENTITLEMENT_DENIED = 'USAGE_POLICY_ENTITLEMENT_DENIED',
  /** Request exceeded MAX_ACTIVE_DBR_PODS_PER_K8S_CLUSTER quota - too many active pods on the K8s cluster */
  K8S_ACTIVE_POD_QUOTA_EXCEEDED = 'K8S_ACTIVE_POD_QUOTA_EXCEEDED',
  /** Request exceeded MAX_PODS_PER_CLOUD_ACCOUNT quota - subscription/cloud account pod limit reached */
  CLOUD_ACCOUNT_POD_QUOTA_EXCEEDED = 'CLOUD_ACCOUNT_POD_QUOTA_EXCEEDED',
  /** Start of network health check generated failures due to misconfiguration */
  NETWORK_CHECK_NIC_FAILURE_DUE_TO_MISCONFIG = 'NETWORK_CHECK_NIC_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_DNS_SERVER_FAILURE_DUE_TO_MISCONFIG = 'NETWORK_CHECK_DNS_SERVER_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_STORAGE_FAILURE_DUE_TO_MISCONFIG = 'NETWORK_CHECK_STORAGE_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_METADATA_ENDPOINT_FAILURE_DUE_TO_MISCONFIG = 'NETWORK_CHECK_METADATA_ENDPOINT_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_CONTROL_PLANE_FAILURE_DUE_TO_MISCONFIG = 'NETWORK_CHECK_CONTROL_PLANE_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_MULTIPLE_COMPONENTS_FAILURE_DUE_TO_MISCONFIG = 'NETWORK_CHECK_MULTIPLE_COMPONENTS_FAILURE_DUE_TO_MISCONFIG',
  /**
   * CMv2 could not resolve the DBR image for versionless workloads (REPL, GENERIC).
   * This typically happens when no spark version is found from the channel mapping
   * and the workload is versionless-enabled.
   */
  DBR_IMAGE_RESOLUTION_FAILURE = 'DBR_IMAGE_RESOLUTION_FAILURE',
  CONTROL_PLANE_CONNECTION_FAILURE = 'CONTROL_PLANE_CONNECTION_FAILURE',
  CONTROL_PLANE_CONNECTION_FAILURE_DUE_TO_MISCONFIG = 'CONTROL_PLANE_CONNECTION_FAILURE_DUE_TO_MISCONFIG',
  RATE_LIMITED = 'RATE_LIMITED',
  /** The cluster was terminated because mutual TLS port 8443 check failed. */
  MTLS_PORT_CONNECTIVITY_FAILURE = 'MTLS_PORT_CONNECTIVITY_FAILURE',
  /** The cluster was terminated because hivemetastore connectivity check failed. */
  HIVEMETASTORE_CONNECTIVITY_FAILURE = 'HIVEMETASTORE_CONNECTIVITY_FAILURE',
}

/** type of the termination */
export enum TerminationType {
  /** Termination succeeded normally */
  SUCCESS = 'SUCCESS',
  /** Non-retryable. Client must fix parameters before reattempting the cluster creation */
  CLIENT_ERROR = 'CLIENT_ERROR',
  /** Databricks service issue. Clients may retry */
  SERVICE_FAULT = 'SERVICE_FAULT',
  /** AWS or Azure infrastructure issue. Clients may retry after the underlying cloud issue is resolved */
  CLOUD_FAILURE = 'CLOUD_FAILURE',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ClusterEventType_ClusterEventType {
  /** Indicates that the cluster is being created by someone. */
  CREATING = 'CREATING',
  /** Indicates that the cluster is being started by someone. */
  STARTING = 'STARTING',
  /** Indicates that the cluster is being started by someone. */
  RESTARTING = 'RESTARTING',
  /** Indicates that the cluster is being terminating. */
  TERMINATING = 'TERMINATING',
  /** Indicates that the cluster has been edited by someone. */
  EDITED = 'EDITED',
  /**
   * Indicates the cluster finished creating, starting, or restarting. Includes the number of
   * nodes in the cluster, and a failure reason if some nodes could not be acquired.
   */
  RUNNING = 'RUNNING',
  /** Indicates a change in the target size of the cluster (upsize or downsize). */
  RESIZING = 'RESIZING',
  /** Indicates that some nodes were lost from the cluster. */
  NODES_LOST = 'NODES_LOST',
  /**
   * Indicates that nodes finished to be added to the cluster. Includes the number of
   * nodes in the cluster, and a failure reason if some nodes could not be acquired.
   */
  UPSIZE_COMPLETED = 'UPSIZE_COMPLETED',
  /**
   * Init Scripts V2 have started executing. Includes the list of Global and Cluster scoped
   * init scripts that are about to be fetched & executed.
   */
  INIT_SCRIPTS_STARTED = 'INIT_SCRIPTS_STARTED',
  /** Init Scripts V2 have finished executing. */
  INIT_SCRIPTS_FINISHED = 'INIT_SCRIPTS_FINISHED',
  /** Indicates that a disk is low on space, but adding disks would put it over the max capacity */
  DID_NOT_EXPAND_DISK = 'DID_NOT_EXPAND_DISK',
  /** Indicates that a disk is low on space, and we did expand its disks. */
  EXPANDED_DISK = 'EXPANDED_DISK',
  /** Indicates we failed to expand the disk space */
  FAILED_TO_EXPAND_DISK = 'FAILED_TO_EXPAND_DISK',
  /** Indicates that driver is up and running */
  DRIVER_HEALTHY = 'DRIVER_HEALTHY',
  /** Indicates that driver is overloaded(one case is when it is GCing) */
  DRIVER_NOT_RESPONDING = 'DRIVER_NOT_RESPONDING',
  /** Indicates that the container that hosts driver and chauffeur is unavailable */
  DRIVER_UNAVAILABLE = 'DRIVER_UNAVAILABLE',
  /** Indicates that spark context is null or there was a spark exception thrown from driver */
  SPARK_EXCEPTION = 'SPARK_EXCEPTION',
  /** Indicates that driver is up but metastore is down */
  METASTORE_DOWN = 'METASTORE_DOWN',
  /** Indicates that driver is up but dbfs is down */
  DBFS_DOWN = 'DBFS_DOWN',
  /** Autoscaling stat, including wasted instance minutes, reported */
  AUTOSCALING_STATS_REPORT = 'AUTOSCALING_STATS_REPORT',
  /** Indicates that a node has been blacklisted. */
  NODE_BLACKLISTED = 'NODE_BLACKLISTED',
  /** Indicates the cluster was pinned. */
  PINNED = 'PINNED',
  /** Indicates the cluster was unpinned. */
  UNPINNED = 'UNPINNED',
  /** Indicates that a node has been decommissioned because of exclusion */
  NODE_EXCLUDED_DECOMMISSIONED = 'NODE_EXCLUDED_DECOMMISSIONED',
  /** Indicates add node failure */
  ADD_NODES_FAILED = 'ADD_NODES_FAILED',
  /**
   * Indicates the cluster autoscaling has been retried several times. The waiting time has reached
   * the max waiting time.
   */
  AUTOSCALING_BACKOFF = 'AUTOSCALING_BACKOFF',
  /**
   * Indicates that the cluster is going to be restarted because of the automatic
   * worker image update
   */
  AUTOMATIC_CLUSTER_UPDATE = 'AUTOMATIC_CLUSTER_UPDATE',
  /**
   * Indicates there was a failure during autoscaling of a cluster. These are failures that we
   * may want to surface to the customer such as:
   * - DatabricksServiceException(REQUEST_LIMIT_EXCEEDED)
   */
  AUTOSCALING_FAILED = 'AUTOSCALING_FAILED',
  /**
   * Indicates that the cluster was migrated for the GCP CMv1 migration. The cluster may be migrated from GKE architecture to GCE or
   * rolled back from GCE to GKE.
   */
  CLUSTER_MIGRATED = 'CLUSTER_MIGRATED',
  /** Indicates that decommission started. */
  DECOMMISSION_STARTED = 'DECOMMISSION_STARTED',
  /** Indicates that decommission ended. */
  DECOMMISSION_ENDED = 'DECOMMISSION_ENDED',
  /** Indicates that the configured UC volume for log delivery is misconfigured (permission does not exist or volume is invalid) */
  UC_VOLUME_MISCONFIGURED = 'UC_VOLUME_MISCONFIGURED',
}

/**
 * The state of a Cluster. The current allowable state transitions are as follows:
 *
 * - `PENDING` -> `RUNNING`
 * - `PENDING` -> `TERMINATING`
 * - `RUNNING` -> `RESIZING`
 * - `RUNNING` -> `RESTARTING`
 * - `RUNNING` -> `TERMINATING`
 * - `RESTARTING` -> `RUNNING`
 * - `RESTARTING` -> `TERMINATING`
 * - `RESIZING` -> `RUNNING`
 * - `RESIZING` -> `TERMINATING`
 * - `TERMINATING` -> `TERMINATED`
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ClusterState_ClusterState {
  /** Indicates a cluster that is in progress of being created. */
  PENDING = 'PENDING',
  /** Indicates a cluster that has been started and is ready for use. */
  RUNNING = 'RUNNING',
  /** Indicates that a cluster is in the process of restarting. */
  RESTARTING = 'RESTARTING',
  /** Indicates that a cluster is in the process of adding or removing nodes. */
  RESIZING = 'RESIZING',
  /** Indicates that a cluster is in the process of being destroyed. */
  TERMINATING = 'TERMINATING',
  /** Indicates a cluster which has been successfully destroyed. */
  TERMINATED = 'TERMINATED',
  /**
   * This state is not used anymore. It was used to indicate a cluster which failed to be created.
   * Terminating and Terminated are used instead.
   */
  ERROR = 'ERROR',
  /** Indicates a cluster which is an unknown state. A cluster should never be in this state. */
  UNKNOWN = 'UNKNOWN',
}

/** Result of attempted script execution */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum InitScriptExecutionDetails_InitScriptExecutionStatus {
  /** The script's execution status is unknown */
  UNKNOWN = 'UNKNOWN',
  /** The NodeDaemon failed to fetch the script */
  FAILED_FETCH = 'FAILED_FETCH',
  /** The script returned a non-zero exit code after execution */
  FAILED_EXECUTION = 'FAILED_EXECUTION',
  /** The script was successfully fetched but was not executed */
  NOT_EXECUTED = 'NOT_EXECUTED',
  /**
   * The NodeDaemon failed to fetch the script, and the script was skippable
   * (i.e. skip_if_fetch_fails was true) so it was skipped without triggering any errors.
   */
  SKIPPED = 'SKIPPED',
  /** The script was successfully executed */
  SUCCEEDED = 'SUCCEEDED',
  /** For FUSE mount init scripts (WSFS & Volumes): the fuse mounting was unsuccessful */
  FUSE_MOUNT_FAILED = 'FUSE_MOUNT_FAILED',
}

/** The cause of a change in target size. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ResizeCause_ResizeCause {
  /** Automatically resized based on load. */
  AUTOSCALE = 'AUTOSCALE',
  /** User requested a new size. */
  USER_REQUEST = 'USER_REQUEST',
  /** Autorecovery monitor resized the cluster after it lost a nodes. */
  AUTORECOVERY = 'AUTORECOVERY',
  /** Terminate bad nodes and spawn new ones */
  REPLACE_BAD_NODES = 'REPLACE_BAD_NODES',
  /** V2 autoscaler automatically resized based on load (internal use only, events show as AUTOSCALE). */
  AUTOSCALE_V2 = 'AUTOSCALE_V2',
  /** Automatically resized based on decision from the DBR Autoscaler service. */
  DBR_AUTOSCALE = 'DBR_AUTOSCALE',
}

/** A storage location in Adls Gen2 */
export interface Adlsgen2Info {
  /** abfss destination, e.g. `abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/<directory-name>`. */
  destination?: string | undefined;
}

export interface AutoScale {
  /**
   * The minimum number of workers to which the cluster can scale down when underutilized.
   * It is also the initial number of workers the cluster will have after creation.
   */
  minWorkers?: number | undefined;
  /**
   * The maximum number of workers to which the cluster can scale up when overloaded.
   * Note that `max_workers` must be strictly greater than `min_workers`.
   */
  maxWorkers?: number | undefined;
}

/** Attributes set during cluster creation which are related to Amazon Web Services. */
export interface AwsAttributes {
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * If this value is greater than 0, the cluster driver node in particular will be placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  availability?: AwsAvailability | undefined;
  /**
   * Identifier for the availability zone/datacenter in which the cluster resides.
   * This string will be of a form like "us-west-2a". The provided availability
   * zone must be in the same region as the <Databricks> deployment. For example, "us-west-2a"
   * is not a valid zone id if the <Databricks> deployment resides in the "us-east-1" region.
   * This is an optional field at cluster creation, and if not specified, the zone "auto" will be used.
   * If the zone specified is "auto", will try to place cluster in a zone with high availability,
   * and will retry placement in a different AZ if there is not enough capacity.
   *
   * The list of available zones as well as the default value can be found by using the
   * `List Zones` method.
   */
  zoneId?: string | undefined;
  /**
   * Nodes for this cluster will only be placed on AWS instances with this instance profile. If
   * ommitted, nodes will be placed on instances without an IAM instance profile. The instance
   * profile must have previously been added to the <Databricks> environment by an account
   * administrator.
   *
   * This feature may only be available to certain customer plans.
   */
  instanceProfileArn?: string | undefined;
  /**
   * The bid price for AWS spot instances, as a percentage of the corresponding instance type's
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
  /** The type of EBS volumes that will be launched with this cluster. */
  ebsVolumeType?: EbsVolumeType | undefined;
  /**
   * The number of volumes launched for each instance. Users can choose up to 10 volumes.
   * This feature is only enabled for supported node types. Legacy node types cannot specify
   * custom EBS volumes.
   * For node types with no instance store, at least one EBS volume needs to be specified;
   * otherwise, cluster creation will fail.
   *
   * These EBS volumes will be mounted at `/ebs0`, `/ebs1`, and etc.
   * Instance store volumes will be mounted at `/local_disk0`, `/local_disk1`, and etc.
   *
   * If EBS volumes are attached, <Databricks> will configure Spark to use only the EBS volumes for
   * scratch storage because heterogenously sized scratch devices can lead to inefficient disk
   * utilization. If no EBS volumes are attached, <Databricks> will configure Spark to use instance
   * store volumes.
   *
   * Please note that if EBS volumes are specified, then the Spark configuration `spark.local.dir`
   * will be overridden.
   */
  ebsVolumeCount?: number | undefined;
  /**
   * The size of each EBS volume (in GiB) launched for each instance. For general purpose
   * SSD, this value must be within the range 100 - 4096. For throughput optimized HDD,
   * this value must be within the range 500 - 4096.
   */
  ebsVolumeSize?: number | undefined;
  /** If using gp3 volumes, what IOPS to use for the disk. If this is not set, the maximum performance of a gp2 volume with the same volume size will be used. */
  ebsVolumeIops?: number | undefined;
  /** If using gp3 volumes, what throughput to use for the disk. If this is not set, the maximum performance of a gp2 volume with the same volume size will be used. */
  ebsVolumeThroughput?: number | undefined;
}

/** Attributes set during cluster creation which are related to Microsoft Azure. */
export interface AzureAttributes {
  /** Defines values necessary to configure and run Azure Log Analytics agent */
  logAnalyticsInfo?: LogAnalyticsInfo | undefined;
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * Availability type used for all subsequent nodes past the `first_on_demand` ones.
   * Note: If `first_on_demand` is zero, this availability
   * type will be used for the entire cluster.
   */
  availability?: AzureAvailability | undefined;
  /**
   * The max bid price to be used for Azure spot instances.
   * The Max price for the bid cannot be higher than the on-demand price of the instance.
   * If not specified, the default value is -1, which specifies that the instance cannot be evicted
   * on the basis of price, and only on the basis of availability. Further, the value should > 0 or -1.
   */
  spotBidMaxPrice?: number | undefined;
}

export interface ChangeClusterOwnerRequest {
  clusterId?: string | undefined;
  /** New owner of the cluster_id after this RPC. */
  ownerUsername?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChangeClusterOwnerResponse {}

export interface CloneCluster {
  /** The cluster that is being cloned. */
  sourceClusterId?: string | undefined;
}

export interface CloudProviderNodeInfo {
  /** Status as reported by the cloud provider */
  status?: CloudProviderNodeStatus[] | undefined;
}

/**
 * Common set of attributes set during cluster creation. These attributes cannot be changed
 * over the lifetime of a cluster.
 */
export interface ClusterAttributes {
  /**
   * Cluster name requested by the user. This doesn't have to be unique.
   * If not specified at creation, the cluster name will be an empty string.
   * For job clusters, the cluster name is automatically set based on the job and job run IDs.
   */
  clusterName?: string | undefined;
  /**
   * The Spark version of the cluster, e.g. `3.3.x-scala2.11`.
   * A list of available Spark versions can be retrieved by using
   * the :method:clusters/sparkVersions API call.
   */
  sparkVersion?: string | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * Users can also pass in a string of extra JVM options to the driver and the executors via
   * `spark.driver.extraJavaOptions` and `spark.executor.extraJavaOptions` respectively.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: AwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: AzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: GcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   *
   * This field, along with node_type_id, should not be set if virtual_cluster_size is set.
   * If both driver_node_type_id, node_type_id, and virtual_cluster_size are specified, driver_node_type_id and node_type_id take precedence.
   */
  driverNodeTypeId?: string | undefined;
  /** Flexible node type configuration for worker nodes. */
  workerNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** Flexible node type configuration for the driver node. */
  driverNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /**
   * SSH public key contents that will be added to each Spark node in this cluster. The
   * corresponding private keys can be used to login with the user name `ubuntu` on port `2200`.
   * Up to 10 keys can be specified.
   */
  sshPublicKeys?: string[] | undefined;
  /**
   * Additional tags for cluster resources. <Databricks> will tag all cluster resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   *
   * - Clusters can only reuse cloud resources if the resources' tags are a subset of the cluster tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * The configuration for delivering spark logs to a long-term storage destination.
   * Three kinds of destinations (DBFS, S3 and Unity Catalog volumes) are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: ClusterLogConf | undefined;
  /**
   * An object containing a set of optional, user-specified environment variable key-value pairs.
   * Please note that key-value pair of the form (X,Y) will be exported as is (i.e.,
   * `export X='Y'`) while launching the driver and workers.
   *
   * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we recommend appending
   * them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the example below. This ensures that all
   * default databricks managed environmental variables are included as well.
   *
   * Example Spark environment variables:
   * `{"SPARK_WORKER_MEMORY": "28000m", "SPARK_LOCAL_DIRS": "/local_disk0"}` or
   * `{"SPARK_DAEMON_JAVA_OPTS": "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
   */
  sparkEnvVars?: Record<string, string> | undefined;
  /**
   * Automatically terminates the cluster after it is inactive for this time in minutes. If not set,
   * this cluster will not be automatically terminated. If specified, the threshold must be between
   * 10 and 10000 minutes.
   * Users can also set this value to 0 to explicitly disable automatic termination.
   */
  autoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this cluster will dynamically acquire additional disk
   * space when its Spark workers are running low on disk space.
   */
  enableElasticDisk?: boolean | undefined;
  /**
   * The configuration for storing init scripts. Any number of destinations can be specified.
   * The scripts are executed sequentially in the order provided.
   * If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`.
   */
  initScripts?: InitScriptInfo[] | undefined;
  /** Custom docker image BYOC */
  dockerImage?: DockerImage | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** Single user name if data_security_mode is `SINGLE_USER` */
  singleUserName?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable LUKS on cluster VMs' local disks */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  workloadType?: WorkloadType | undefined;
  dataSecurityMode?: DataSecurityMode | undefined;
  /**
   * Determines the cluster's runtime engine, either standard or Photon.
   *
   * This field is not compatible with legacy `spark_version` values that contain `-photon-`.
   * Remove `-photon-` from the `spark_version` and set `runtime_engine` to `PHOTON`.
   *
   * If left unspecified, the runtime engine defaults to standard unless the spark_version
   * contains -photon-, in which case Photon will be used.
   */
  runtimeEngine?: RuntimeEngine | undefined;
  kind?: ComputeKind | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * `effective_spark_version` is determined by `spark_version` (DBR release), this field `use_ml_runtime`, and whether `node_type_id` is gpu node or not.
   */
  useMlRuntime?: boolean | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * When set to true, <Databricks> will automatically set single node related `custom_tags`, `spark_conf`, and `num_workers`
   */
  isSingleNode?: boolean | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  totalInitialRemoteDiskSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterAttributes_CustomTagsEntry {
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

/** Spark configuration key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterAttributes_SparkConfEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Spark environment variable key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterAttributes_SparkEnvVarsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface ClusterCompliance {
  /** Canonical unique identifier for a cluster. */
  clusterId?: string | undefined;
  /** Whether this cluster is in compliance with the latest version of its policy. */
  isCompliant?: boolean | undefined;
  /**
   * An object containing key-value mappings representing the first 200 policy validation errors.
   * The keys indicate the path where the policy validation error is occurring.
   * The values indicate an error message describing the policy validation error.
   */
  violations?: Record<string, string> | undefined;
}

/** Proto defined to model a mapping from string to string. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterCompliance_ViolationsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface ClusterEvent {
  clusterId?: string | undefined;
  /**
   * The timestamp when the event occurred, stored as the number of milliseconds since
   * the Unix epoch. If not provided, this will be assigned by the Timeline service.
   */
  timestamp?: bigint | undefined;
  type?: ClusterEventType_ClusterEventType | undefined;
  details?: EventDetails | undefined;
  dataPlaneEventDetails?: DataPlaneEventDetails | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClusterEventType {}

/** Describes all of the metadata about a single Spark cluster in <Databricks>. */
export interface ClusterInfo {
  /**
   * Canonical identifier for the cluster. This id is retained during cluster restarts and resizes,
   * while each new cluster has a globally unique id.
   */
  clusterId?: string | undefined;
  /**
   * Creator user name.
   * The field won't be included in the response if the user has already been deleted.
   */
  creatorUserName?: string | undefined;
  /** Current state of the cluster. */
  state?: ClusterState_ClusterState | undefined;
  /**
   * A message associated with the most recent state transition (e.g., the reason why
   * the cluster entered a `TERMINATED` state).
   */
  stateMessage?: string | undefined;
  /** Total amount of cluster memory, in megabytes */
  clusterMemoryMb?: bigint | undefined;
  /**
   * Number of CPU cores available for this cluster.
   * Note that this can be fractional, e.g. 7.5 cores, since certain node types are configured to
   * share cores between Spark nodes on the same instance.
   */
  clusterCores?: number | undefined;
  /**
   * Tags that are added by <Databricks> regardless of any `custom_tags`, including:
   *
   * - Vendor: <Databricks>
   *
   * - Creator: <username_of_creator>
   *
   * - ClusterName: <name_of_cluster>
   *
   * - ClusterId: <id_of_cluster>
   *
   * - Name: <<Databricks> internal use>
   */
  defaultTags?: Record<string, string> | undefined;
  /** Cluster log delivery status. */
  clusterLogStatus?: LogSyncStatus | undefined;
  /**
   * Information about why the cluster was terminated.
   * This field only appears when the cluster is in a `TERMINATING` or `TERMINATED` state.
   */
  terminationReason?: TerminationReason | undefined;
  /**
   * The spec contains a snapshot of the latest user specified settings that were used to create/edit the cluster.
   * Note: not included in the response of the ListClusters API.
   */
  spec?: ClusterInfo_ComputeSpec | undefined;
  /**
   * Node on which the Spark driver resides. The driver node contains the Spark master and
   * the <Databricks> application that manages the per-notebook Spark REPLs.
   */
  driver?: SparkInfo_SparkNode | undefined;
  /** Nodes on which the Spark executors reside. */
  executors?: SparkInfo_SparkNode[] | undefined;
  /**
   * A canonical SparkContext identifier. This value *does* change when the Spark driver restarts.
   * The pair `(cluster_id, spark_context_id)` is a globally unique identifier over all Spark
   * contexts.
   */
  sparkContextId?: bigint | undefined;
  /**
   * Port on which Spark JDBC server is listening, in the driver nod. No service will be listeningon
   * on this port in executor nodes.
   */
  jdbcPort?: number | undefined;
  /**
   * Cluster name requested by the user. This doesn't have to be unique.
   * If not specified at creation, the cluster name will be an empty string.
   * For job clusters, the cluster name is automatically set based on the job and job run IDs.
   */
  clusterName?: string | undefined;
  /**
   * The Spark version of the cluster, e.g. `3.3.x-scala2.11`.
   * A list of available Spark versions can be retrieved by using
   * the :method:clusters/sparkVersions API call.
   */
  sparkVersion?: string | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * Users can also pass in a string of extra JVM options to the driver and the executors via
   * `spark.driver.extraJavaOptions` and `spark.executor.extraJavaOptions` respectively.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: AwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: AzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: GcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   *
   * This field, along with node_type_id, should not be set if virtual_cluster_size is set.
   * If both driver_node_type_id, node_type_id, and virtual_cluster_size are specified, driver_node_type_id and node_type_id take precedence.
   */
  driverNodeTypeId?: string | undefined;
  /** Flexible node type configuration for worker nodes. */
  workerNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** Flexible node type configuration for the driver node. */
  driverNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /**
   * SSH public key contents that will be added to each Spark node in this cluster. The
   * corresponding private keys can be used to login with the user name `ubuntu` on port `2200`.
   * Up to 10 keys can be specified.
   */
  sshPublicKeys?: string[] | undefined;
  /**
   * Additional tags for cluster resources. <Databricks> will tag all cluster resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   *
   * - Clusters can only reuse cloud resources if the resources' tags are a subset of the cluster tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * The configuration for delivering spark logs to a long-term storage destination.
   * Three kinds of destinations (DBFS, S3 and Unity Catalog volumes) are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: ClusterLogConf | undefined;
  /**
   * An object containing a set of optional, user-specified environment variable key-value pairs.
   * Please note that key-value pair of the form (X,Y) will be exported as is (i.e.,
   * `export X='Y'`) while launching the driver and workers.
   *
   * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we recommend appending
   * them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the example below. This ensures that all
   * default databricks managed environmental variables are included as well.
   *
   * Example Spark environment variables:
   * `{"SPARK_WORKER_MEMORY": "28000m", "SPARK_LOCAL_DIRS": "/local_disk0"}` or
   * `{"SPARK_DAEMON_JAVA_OPTS": "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
   */
  sparkEnvVars?: Record<string, string> | undefined;
  /**
   * Automatically terminates the cluster after it is inactive for this time in minutes. If not set,
   * this cluster will not be automatically terminated. If specified, the threshold must be between
   * 10 and 10000 minutes.
   * Users can also set this value to 0 to explicitly disable automatic termination.
   */
  autoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this cluster will dynamically acquire additional disk
   * space when its Spark workers are running low on disk space.
   */
  enableElasticDisk?: boolean | undefined;
  /**
   * The configuration for storing init scripts. Any number of destinations can be specified.
   * The scripts are executed sequentially in the order provided.
   * If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`.
   */
  initScripts?: InitScriptInfo[] | undefined;
  /** Custom docker image BYOC */
  dockerImage?: DockerImage | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** Single user name if data_security_mode is `SINGLE_USER` */
  singleUserName?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable LUKS on cluster VMs' local disks */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  workloadType?: WorkloadType | undefined;
  dataSecurityMode?: DataSecurityMode | undefined;
  /**
   * Determines the cluster's runtime engine, either standard or Photon.
   *
   * This field is not compatible with legacy `spark_version` values that contain `-photon-`.
   * Remove `-photon-` from the `spark_version` and set `runtime_engine` to `PHOTON`.
   *
   * If left unspecified, the runtime engine defaults to standard unless the spark_version
   * contains -photon-, in which case Photon will be used.
   */
  runtimeEngine?: RuntimeEngine | undefined;
  kind?: ComputeKind | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * `effective_spark_version` is determined by `spark_version` (DBR release), this field `use_ml_runtime`, and whether `node_type_id` is gpu node or not.
   */
  useMlRuntime?: boolean | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * When set to true, <Databricks> will automatically set single node related `custom_tags`, `spark_conf`, and `num_workers`
   */
  isSingleNode?: boolean | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  totalInitialRemoteDiskSize?: number | undefined;
  /**
   * Time (in epoch milliseconds) when the cluster creation request was received (when the cluster
   * entered a `PENDING` state).
   */
  startTime?: bigint | undefined;
  /** Time (in epoch milliseconds) when the cluster was terminated, if applicable. */
  terminatedTime?: bigint | undefined;
  /** Time when the cluster driver last lost its state (due to a restart or driver failure). */
  lastStateLossTime?: bigint | undefined;
  /** the timestamp that the cluster was started/restarted */
  lastRestartedTime?: bigint | undefined;
  size?:
    | {
        $case: 'numWorkers';
        /**
         * Number of worker nodes that this cluster should have. A cluster has one Spark Driver
         * and `num_workers` Executors for a total of `num_workers` + 1 Spark nodes.
         *
         * Note: When reading the properties of a cluster, this field reflects the desired number
         * of workers rather than the actual current number of workers. For instance, if a cluster
         * is resized from 5 to 10 workers, this field will immediately be updated to reflect
         * the target size of 10 workers, whereas the workers listed in `spark_info` will gradually
         * increase from 5 to 10 as the new nodes are provisioned.
         */
        numWorkers: number;
      }
    | {
        $case: 'autoscale';
        /**
         * Parameters needed in order to automatically scale clusters up and down based on load.
         * Note: autoscaling works best with DB runtime versions 3.0 or later.
         */
        autoscale: AutoScale;
      }
    | undefined;
}

/** Contains a snapshot of the latest user specified settings that were used to create/edit the cluster. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterInfo_ComputeSpec {
  /** When set to true, fixed and default values from the policy will be used for fields that are omitted. When set to false, only fixed values from the policy will be applied. */
  applyPolicyDefaultValues?: boolean | undefined;
  /**
   * Cluster name requested by the user. This doesn't have to be unique.
   * If not specified at creation, the cluster name will be an empty string.
   * For job clusters, the cluster name is automatically set based on the job and job run IDs.
   */
  clusterName?: string | undefined;
  /**
   * The Spark version of the cluster, e.g. `3.3.x-scala2.11`.
   * A list of available Spark versions can be retrieved by using
   * the :method:clusters/sparkVersions API call.
   */
  sparkVersion?: string | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * Users can also pass in a string of extra JVM options to the driver and the executors via
   * `spark.driver.extraJavaOptions` and `spark.executor.extraJavaOptions` respectively.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: AwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: AzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: GcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   *
   * This field, along with node_type_id, should not be set if virtual_cluster_size is set.
   * If both driver_node_type_id, node_type_id, and virtual_cluster_size are specified, driver_node_type_id and node_type_id take precedence.
   */
  driverNodeTypeId?: string | undefined;
  /** Flexible node type configuration for worker nodes. */
  workerNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** Flexible node type configuration for the driver node. */
  driverNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /**
   * SSH public key contents that will be added to each Spark node in this cluster. The
   * corresponding private keys can be used to login with the user name `ubuntu` on port `2200`.
   * Up to 10 keys can be specified.
   */
  sshPublicKeys?: string[] | undefined;
  /**
   * Additional tags for cluster resources. <Databricks> will tag all cluster resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   *
   * - Clusters can only reuse cloud resources if the resources' tags are a subset of the cluster tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * The configuration for delivering spark logs to a long-term storage destination.
   * Three kinds of destinations (DBFS, S3 and Unity Catalog volumes) are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: ClusterLogConf | undefined;
  /**
   * An object containing a set of optional, user-specified environment variable key-value pairs.
   * Please note that key-value pair of the form (X,Y) will be exported as is (i.e.,
   * `export X='Y'`) while launching the driver and workers.
   *
   * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we recommend appending
   * them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the example below. This ensures that all
   * default databricks managed environmental variables are included as well.
   *
   * Example Spark environment variables:
   * `{"SPARK_WORKER_MEMORY": "28000m", "SPARK_LOCAL_DIRS": "/local_disk0"}` or
   * `{"SPARK_DAEMON_JAVA_OPTS": "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
   */
  sparkEnvVars?: Record<string, string> | undefined;
  /**
   * Automatically terminates the cluster after it is inactive for this time in minutes. If not set,
   * this cluster will not be automatically terminated. If specified, the threshold must be between
   * 10 and 10000 minutes.
   * Users can also set this value to 0 to explicitly disable automatic termination.
   */
  autoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this cluster will dynamically acquire additional disk
   * space when its Spark workers are running low on disk space.
   */
  enableElasticDisk?: boolean | undefined;
  /**
   * The configuration for storing init scripts. Any number of destinations can be specified.
   * The scripts are executed sequentially in the order provided.
   * If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`.
   */
  initScripts?: InitScriptInfo[] | undefined;
  /** Custom docker image BYOC */
  dockerImage?: DockerImage | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** Single user name if data_security_mode is `SINGLE_USER` */
  singleUserName?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable LUKS on cluster VMs' local disks */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  workloadType?: WorkloadType | undefined;
  dataSecurityMode?: DataSecurityMode | undefined;
  /**
   * Determines the cluster's runtime engine, either standard or Photon.
   *
   * This field is not compatible with legacy `spark_version` values that contain `-photon-`.
   * Remove `-photon-` from the `spark_version` and set `runtime_engine` to `PHOTON`.
   *
   * If left unspecified, the runtime engine defaults to standard unless the spark_version
   * contains -photon-, in which case Photon will be used.
   */
  runtimeEngine?: RuntimeEngine | undefined;
  kind?: ComputeKind | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * `effective_spark_version` is determined by `spark_version` (DBR release), this field `use_ml_runtime`, and whether `node_type_id` is gpu node or not.
   */
  useMlRuntime?: boolean | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * When set to true, <Databricks> will automatically set single node related `custom_tags`, `spark_conf`, and `num_workers`
   */
  isSingleNode?: boolean | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  totalInitialRemoteDiskSize?: number | undefined;
  size?:
    | {
        $case: 'numWorkers';
        /**
         * Number of worker nodes that this cluster should have. A cluster has one Spark Driver
         * and `num_workers` Executors for a total of `num_workers` + 1 Spark nodes.
         *
         * Note: When reading the properties of a cluster, this field reflects the desired number
         * of workers rather than the actual current number of workers. For instance, if a cluster
         * is resized from 5 to 10 workers, this field will immediately be updated to reflect
         * the target size of 10 workers, whereas the workers listed in `spark_info` will gradually
         * increase from 5 to 10 as the new nodes are provisioned.
         */
        numWorkers: number;
      }
    | {
        $case: 'autoscale';
        /**
         * Parameters needed in order to automatically scale clusters up and down based on load.
         * Note: autoscaling works best with DB runtime versions 3.0 or later.
         */
        autoscale: AutoScale;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterInfo_ComputeSpec_CustomTagsEntry {
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

/** Spark configuration key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterInfo_ComputeSpec_SparkConfEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Spark environment variable key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterInfo_ComputeSpec_SparkEnvVarsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterInfo_CustomTagsEntry {
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
export interface ClusterInfo_DefaultTagsEntry {
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

/** Spark configuration key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterInfo_SparkConfEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Spark environment variable key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ClusterInfo_SparkEnvVarsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Cluster log delivery config */
export interface ClusterLogConf {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * `{ "dbfs" : { "destination" : "dbfs:/home/cluster_log" } }`
         */
        dbfs: DbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either the region or endpoint need to be provided. e.g.
         * `{ "s3": { "destination" : "s3://cluster_log_bucket/prefix", "region" : "us-west-2" } }`
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * `instance_profile_arn` has permission to write data to the s3 destination.
         */
        s3: S3StorageInfo;
      }
    | {
        $case: 'volumes';
        /**
         * destination needs to be provided, e.g.
         * `{ "volumes": { "destination": "/Volumes/catalog/schema/volume/cluster_log" } }`
         */
        volumes: VolumesStorageInfo;
      }
    | undefined;
}

export interface ClusterSize {
  size?:
    | {
        $case: 'numWorkers';
        /**
         * Number of worker nodes that this cluster should have. A cluster has one Spark Driver
         * and `num_workers` Executors for a total of `num_workers` + 1 Spark nodes.
         *
         * Note: When reading the properties of a cluster, this field reflects the desired number
         * of workers rather than the actual current number of workers. For instance, if a cluster
         * is resized from 5 to 10 workers, this field will immediately be updated to reflect
         * the target size of 10 workers, whereas the workers listed in `spark_info` will gradually
         * increase from 5 to 10 as the new nodes are provisioned.
         */
        numWorkers: number;
      }
    | {
        $case: 'autoscale';
        /**
         * Parameters needed in order to automatically scale clusters up and down based on load.
         * Note: autoscaling works best with DB runtime versions 3.0 or later.
         */
        autoscale: AutoScale;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ClusterState {}

export interface CreateClusterRequest {
  /**
   * When set to true, fixed and default values from the policy will be used for fields that are omitted.
   * When set to false, only fixed values from the policy will be applied.
   */
  applyPolicyDefaultValues?: boolean | undefined;
  /** When specified, this clones libraries from a source cluster during the creation of a new cluster. */
  cloneFrom?: CloneCluster | undefined;
  size?:
    | {
        $case: 'numWorkers';
        /**
         * Number of worker nodes that this cluster should have. A cluster has one Spark Driver
         * and `num_workers` Executors for a total of `num_workers` + 1 Spark nodes.
         *
         * Note: When reading the properties of a cluster, this field reflects the desired number
         * of workers rather than the actual current number of workers. For instance, if a cluster
         * is resized from 5 to 10 workers, this field will immediately be updated to reflect
         * the target size of 10 workers, whereas the workers listed in `spark_info` will gradually
         * increase from 5 to 10 as the new nodes are provisioned.
         */
        numWorkers: number;
      }
    | {
        $case: 'autoscale';
        /**
         * Parameters needed in order to automatically scale clusters up and down based on load.
         * Note: autoscaling works best with DB runtime versions 3.0 or later.
         */
        autoscale: AutoScale;
      }
    | undefined;
  /**
   * Cluster name requested by the user. This doesn't have to be unique.
   * If not specified at creation, the cluster name will be an empty string.
   * For job clusters, the cluster name is automatically set based on the job and job run IDs.
   */
  clusterName?: string | undefined;
  /**
   * The Spark version of the cluster, e.g. `3.3.x-scala2.11`.
   * A list of available Spark versions can be retrieved by using
   * the :method:clusters/sparkVersions API call.
   */
  sparkVersion?: string | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * Users can also pass in a string of extra JVM options to the driver and the executors via
   * `spark.driver.extraJavaOptions` and `spark.executor.extraJavaOptions` respectively.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: AwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: AzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: GcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   *
   * This field, along with node_type_id, should not be set if virtual_cluster_size is set.
   * If both driver_node_type_id, node_type_id, and virtual_cluster_size are specified, driver_node_type_id and node_type_id take precedence.
   */
  driverNodeTypeId?: string | undefined;
  /** Flexible node type configuration for worker nodes. */
  workerNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** Flexible node type configuration for the driver node. */
  driverNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /**
   * SSH public key contents that will be added to each Spark node in this cluster. The
   * corresponding private keys can be used to login with the user name `ubuntu` on port `2200`.
   * Up to 10 keys can be specified.
   */
  sshPublicKeys?: string[] | undefined;
  /**
   * Additional tags for cluster resources. <Databricks> will tag all cluster resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   *
   * - Clusters can only reuse cloud resources if the resources' tags are a subset of the cluster tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * The configuration for delivering spark logs to a long-term storage destination.
   * Three kinds of destinations (DBFS, S3 and Unity Catalog volumes) are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: ClusterLogConf | undefined;
  /**
   * An object containing a set of optional, user-specified environment variable key-value pairs.
   * Please note that key-value pair of the form (X,Y) will be exported as is (i.e.,
   * `export X='Y'`) while launching the driver and workers.
   *
   * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we recommend appending
   * them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the example below. This ensures that all
   * default databricks managed environmental variables are included as well.
   *
   * Example Spark environment variables:
   * `{"SPARK_WORKER_MEMORY": "28000m", "SPARK_LOCAL_DIRS": "/local_disk0"}` or
   * `{"SPARK_DAEMON_JAVA_OPTS": "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
   */
  sparkEnvVars?: Record<string, string> | undefined;
  /**
   * Automatically terminates the cluster after it is inactive for this time in minutes. If not set,
   * this cluster will not be automatically terminated. If specified, the threshold must be between
   * 10 and 10000 minutes.
   * Users can also set this value to 0 to explicitly disable automatic termination.
   */
  autoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this cluster will dynamically acquire additional disk
   * space when its Spark workers are running low on disk space.
   */
  enableElasticDisk?: boolean | undefined;
  /**
   * The configuration for storing init scripts. Any number of destinations can be specified.
   * The scripts are executed sequentially in the order provided.
   * If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`.
   */
  initScripts?: InitScriptInfo[] | undefined;
  /** Custom docker image BYOC */
  dockerImage?: DockerImage | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** Single user name if data_security_mode is `SINGLE_USER` */
  singleUserName?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable LUKS on cluster VMs' local disks */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  workloadType?: WorkloadType | undefined;
  dataSecurityMode?: DataSecurityMode | undefined;
  /**
   * Determines the cluster's runtime engine, either standard or Photon.
   *
   * This field is not compatible with legacy `spark_version` values that contain `-photon-`.
   * Remove `-photon-` from the `spark_version` and set `runtime_engine` to `PHOTON`.
   *
   * If left unspecified, the runtime engine defaults to standard unless the spark_version
   * contains -photon-, in which case Photon will be used.
   */
  runtimeEngine?: RuntimeEngine | undefined;
  kind?: ComputeKind | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * `effective_spark_version` is determined by `spark_version` (DBR release), this field `use_ml_runtime`, and whether `node_type_id` is gpu node or not.
   */
  useMlRuntime?: boolean | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * When set to true, <Databricks> will automatically set single node related `custom_tags`, `spark_conf`, and `num_workers`
   */
  isSingleNode?: boolean | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  totalInitialRemoteDiskSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateClusterRequest_CustomTagsEntry {
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

/** Spark configuration key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateClusterRequest_SparkConfEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Spark environment variable key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateClusterRequest_SparkEnvVarsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface CreateClusterResponse {
  clusterId?: string | undefined;
}

export interface DataPlaneEventDetails {
  eventType?: DataPlaneClusterEventType | undefined;
  timestamp?: bigint | undefined;
  hostId?: string | undefined;
  executorFailures?: number | undefined;
}

/** A storage location in DBFS */
export interface DbfsStorageInfo {
  /** dbfs destination, e.g. `dbfs:/my/path` */
  destination?: string | undefined;
}

export interface DeleteClusterRequest {
  /** The cluster to be terminated. */
  clusterId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteClusterResponse {}

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

export interface EditClusterRequest {
  /** ID of the cluster */
  clusterId?: string | undefined;
  /** When set to true, fixed and default values from the policy will be used for fields that are omitted. When set to false, only fixed values from the policy will be applied. */
  applyPolicyDefaultValues?: boolean | undefined;
  size?:
    | {
        $case: 'numWorkers';
        /**
         * Number of worker nodes that this cluster should have. A cluster has one Spark Driver
         * and `num_workers` Executors for a total of `num_workers` + 1 Spark nodes.
         *
         * Note: When reading the properties of a cluster, this field reflects the desired number
         * of workers rather than the actual current number of workers. For instance, if a cluster
         * is resized from 5 to 10 workers, this field will immediately be updated to reflect
         * the target size of 10 workers, whereas the workers listed in `spark_info` will gradually
         * increase from 5 to 10 as the new nodes are provisioned.
         */
        numWorkers: number;
      }
    | {
        $case: 'autoscale';
        /**
         * Parameters needed in order to automatically scale clusters up and down based on load.
         * Note: autoscaling works best with DB runtime versions 3.0 or later.
         */
        autoscale: AutoScale;
      }
    | undefined;
  /**
   * Cluster name requested by the user. This doesn't have to be unique.
   * If not specified at creation, the cluster name will be an empty string.
   * For job clusters, the cluster name is automatically set based on the job and job run IDs.
   */
  clusterName?: string | undefined;
  /**
   * The Spark version of the cluster, e.g. `3.3.x-scala2.11`.
   * A list of available Spark versions can be retrieved by using
   * the :method:clusters/sparkVersions API call.
   */
  sparkVersion?: string | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * Users can also pass in a string of extra JVM options to the driver and the executors via
   * `spark.driver.extraJavaOptions` and `spark.executor.extraJavaOptions` respectively.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: AwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: AzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: GcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   *
   * This field, along with node_type_id, should not be set if virtual_cluster_size is set.
   * If both driver_node_type_id, node_type_id, and virtual_cluster_size are specified, driver_node_type_id and node_type_id take precedence.
   */
  driverNodeTypeId?: string | undefined;
  /** Flexible node type configuration for worker nodes. */
  workerNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** Flexible node type configuration for the driver node. */
  driverNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /**
   * SSH public key contents that will be added to each Spark node in this cluster. The
   * corresponding private keys can be used to login with the user name `ubuntu` on port `2200`.
   * Up to 10 keys can be specified.
   */
  sshPublicKeys?: string[] | undefined;
  /**
   * Additional tags for cluster resources. <Databricks> will tag all cluster resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   *
   * - Clusters can only reuse cloud resources if the resources' tags are a subset of the cluster tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * The configuration for delivering spark logs to a long-term storage destination.
   * Three kinds of destinations (DBFS, S3 and Unity Catalog volumes) are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: ClusterLogConf | undefined;
  /**
   * An object containing a set of optional, user-specified environment variable key-value pairs.
   * Please note that key-value pair of the form (X,Y) will be exported as is (i.e.,
   * `export X='Y'`) while launching the driver and workers.
   *
   * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we recommend appending
   * them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the example below. This ensures that all
   * default databricks managed environmental variables are included as well.
   *
   * Example Spark environment variables:
   * `{"SPARK_WORKER_MEMORY": "28000m", "SPARK_LOCAL_DIRS": "/local_disk0"}` or
   * `{"SPARK_DAEMON_JAVA_OPTS": "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
   */
  sparkEnvVars?: Record<string, string> | undefined;
  /**
   * Automatically terminates the cluster after it is inactive for this time in minutes. If not set,
   * this cluster will not be automatically terminated. If specified, the threshold must be between
   * 10 and 10000 minutes.
   * Users can also set this value to 0 to explicitly disable automatic termination.
   */
  autoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this cluster will dynamically acquire additional disk
   * space when its Spark workers are running low on disk space.
   */
  enableElasticDisk?: boolean | undefined;
  /**
   * The configuration for storing init scripts. Any number of destinations can be specified.
   * The scripts are executed sequentially in the order provided.
   * If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`.
   */
  initScripts?: InitScriptInfo[] | undefined;
  /** Custom docker image BYOC */
  dockerImage?: DockerImage | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** Single user name if data_security_mode is `SINGLE_USER` */
  singleUserName?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable LUKS on cluster VMs' local disks */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  workloadType?: WorkloadType | undefined;
  dataSecurityMode?: DataSecurityMode | undefined;
  /**
   * Determines the cluster's runtime engine, either standard or Photon.
   *
   * This field is not compatible with legacy `spark_version` values that contain `-photon-`.
   * Remove `-photon-` from the `spark_version` and set `runtime_engine` to `PHOTON`.
   *
   * If left unspecified, the runtime engine defaults to standard unless the spark_version
   * contains -photon-, in which case Photon will be used.
   */
  runtimeEngine?: RuntimeEngine | undefined;
  kind?: ComputeKind | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * `effective_spark_version` is determined by `spark_version` (DBR release), this field `use_ml_runtime`, and whether `node_type_id` is gpu node or not.
   */
  useMlRuntime?: boolean | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * When set to true, <Databricks> will automatically set single node related `custom_tags`, `spark_conf`, and `num_workers`
   */
  isSingleNode?: boolean | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  totalInitialRemoteDiskSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EditClusterRequest_CustomTagsEntry {
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

/** Spark configuration key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EditClusterRequest_SparkConfEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Spark environment variable key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EditClusterRequest_SparkEnvVarsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EditClusterResponse {}

export interface EnforcePolicyComplianceForClusterRequest {
  /** The ID of the cluster you want to enforce policy compliance on. */
  clusterId?: string | undefined;
  /**
   * If set, previews the changes that would be made to a cluster
   * to enforce compliance but does not update the cluster.
   */
  validateOnly?: boolean | undefined;
}

export interface EnforcePolicyComplianceForClusterResponse {
  /**
   * Whether any changes have been made to the cluster settings for the cluster
   * to become compliant with its policy.
   */
  hasChanges?: boolean | undefined;
  /**
   * A list of changes that have been made to the cluster settings for
   * the cluster to become compliant with its policy.
   */
  changes?:
    | EnforcePolicyComplianceForClusterResponse_ClusterSettingsChange[]
    | undefined;
}

/**
 * Represents a change to the cluster settings required for the cluster
 * to become compliant with its policy.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface EnforcePolicyComplianceForClusterResponse_ClusterSettingsChange {
  /** The field where this change would be made. */
  field?: string | undefined;
  /**
   * The previous value of this field before enforcing policy compliance
   * (either a number, a boolean, or a string) converted to a string.
   * This is intended to be read by a human. The type of the field
   * can be retrieved by reading the settings field in the API response.
   */
  previousValue?: string | undefined;
  /**
   * The new value of this field after enforcing policy compliance
   * (either a number, a boolean, or a string) converted to a string.
   * This is intended to be read by a human. The typed new value of this field
   * can be retrieved by reading the settings field in the API response.
   */
  newValue?: string | undefined;
}

export interface EventDetails {
  /** The current number of nodes in the cluster. */
  currentNumWorkers?: number | undefined;
  /** The targeted number of nodes in the cluster. */
  targetNumWorkers?: number | undefined;
  /** The cluster attributes before a cluster was edited. */
  previousAttributes?: ClusterAttributes | undefined;
  /**
   * * For created clusters, the attributes of the cluster.
   * * For edited clusters, the new attributes of the cluster.
   */
  attributes?: ClusterAttributes | undefined;
  /** The size of the cluster before an edit or resize. */
  previousClusterSize?: ClusterSize | undefined;
  /** The actual cluster size that was set in the cluster creation or edit. */
  clusterSize?: ClusterSize | undefined;
  /** The cause of a change in target size. */
  cause?: ResizeCause_ResizeCause | undefined;
  /**
   * A termination reason:
   * * On a TERMINATED event, this is the reason of the termination.
   * * On a RESIZE_COMPLETE event, this indicates the reason that we failed to acquire some nodes.
   */
  reason?: TerminationReason | undefined;
  /** The user that caused the event to occur. (Empty if it was done by the control plane.) */
  user?: string | undefined;
  /** Previous disk size in bytes */
  previousDiskSize?: bigint | undefined;
  /** Current disk size in bytes */
  diskSize?: bigint | undefined;
  freeSpace?: bigint | undefined;
  /** Instance Id where the event originated from */
  instanceId?: string | undefined;
  didNotExpandReason?: string | undefined;
  /** More details about the change in driver's state */
  driverStateMessage?: string | undefined;
  /**
   * Unique identifier of the specific job run associated with this cluster event
   * * For clusters created for jobs, this will be the same as the cluster name
   */
  jobRunName?: string | undefined;
  /** List of global and cluster init scripts associated with this cluster event. */
  initScripts?: InitScriptEventDetails | undefined;
  /** Whether or not a blocklisted node should be terminated. For ClusterEventType NODE_BLACKLISTED. */
  enableTerminationForNodeBlocklisted?: boolean | undefined;
  /** The current number of vCPUs in the cluster. */
  currentNumVcpus?: number | undefined;
  /** The targeted number of vCPUs in the cluster. */
  targetNumVcpus?: number | undefined;
}

/** Attributes set during cluster creation which are related to GCP. */
export interface GcpAttributes {
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs (when set to true) versus standard compute engine VMs (when set to false; default).
   * Note: Soon to be deprecated, use the 'availability' field instead.
   */
  usePreemptibleExecutors?: boolean | undefined;
  /**
   * If provided, the cluster will impersonate the google service account when accessing
   * gcloud services (like GCS). The google service account
   * must have previously been added to the <Databricks> environment by an account
   * administrator.
   */
  googleServiceAccount?: string | undefined;
  /** Boot disk size in GB */
  bootDiskSize?: number | undefined;
  /**
   * This field determines whether the spark executors will be scheduled to run on preemptible
   * VMs, on-demand VMs, or preemptible VMs with a fallback to on-demand VMs if the former is unavailable.
   */
  availability?: GcpAvailability | undefined;
  /**
   * Identifier for the availability zone in which the cluster resides.
   * This can be one of the following:
   * - "HA" => High availability, spread nodes across availability zones for a
   * <Databricks> deployment region [default].
   * - "AUTO" => <Databricks> picks an availability zone to schedule the cluster on.
   * - A GCP availability zone => Pick One of the available zones for (machine type + region) from
   * https://cloud.google.com/compute/docs/regions-zones.
   */
  zoneId?: string | undefined;
  /**
   * If provided, each node (workers and driver) in the cluster will have this number of local SSDs attached.
   * Each local SSD is 375GB in size.
   * Refer to [GCP documentation](https://cloud.google.com/compute/docs/disks/local-ssd#choose_number_local_ssds)
   * for the supported number of local SSDs for each instance type.
   */
  localSsdCount?: number | undefined;
  /**
   * The first `first_on_demand` nodes of the cluster will be placed on on-demand instances.
   * This value should be greater than 0, to make sure the cluster driver node is placed on an
   * on-demand instance. If this value is greater than or equal to the current cluster size, all
   * nodes will be placed on on-demand instances. If this value is less than the current cluster
   * size, `first_on_demand` nodes will be placed on on-demand instances and the remainder will
   * be placed on `availability` instances. Note that this value does not affect
   * cluster size and cannot currently be mutated over the lifetime of a cluster.
   */
  firstOnDemand?: number | undefined;
  /**
   * The confidential computing technology for this cluster's instances.
   * Currently only SEV_SNP is supported, and only on N2D instance types.
   * When not set, no confidential computing is applied.
   */
  confidentialComputeType?: ConfidentialComputeType | undefined;
}

/** A storage location in Google Cloud Platform's GCS */
export interface GcsStorageInfo {
  /** GCS destination/URI, e.g. `gs://my-bucket/some-prefix` */
  destination?: string | undefined;
}

export interface GetClusterRequest {
  /** The cluster about which to retrieve information. */
  clusterId?: string | undefined;
}

export interface GetEventsResponse {
  events?: ClusterEvent[] | undefined;
  /**
   * Deprecated: use next_page_token or prev_page_token instead.
   *
   * The parameters required to retrieve the next page of events.
   * Omitted if there are no more events to read.
   */
  nextPage?: ListEventsRequest | undefined;
  /**
   * Deprecated: Returns 0 when request uses page_token. Will start returning zero when request uses offset/limit soon.
   *
   * The total number of events filtered by the start_time, end_time, and event_types.
   */
  totalCount?: bigint | undefined;
  /**
   * This field represents the pagination token to retrieve the next page of results.
   * If the value is "", it means no further results for the request.
   */
  nextPageToken?: string | undefined;
  /**
   * This field represents the pagination token to retrieve the previous page of results.
   * If the value is "", it means no further results for the request.
   */
  prevPageToken?: string | undefined;
}

export interface GetPolicyComplianceForClusterRequest {
  /** The ID of the cluster to get the compliance status */
  clusterId?: string | undefined;
}

export interface GetPolicyComplianceForClusterResponse {
  /**
   * Whether the cluster is compliant with its policy or not. Clusters could be out
   * of compliance if the policy was updated after the cluster was last edited.
   */
  isCompliant?: boolean | undefined;
  /**
   * An object containing key-value mappings representing the first 200 policy validation errors.
   * The keys indicate the path where the policy validation error is occurring.
   * The values indicate an error message describing the policy validation error.
   */
  violations?: Record<string, string> | undefined;
}

/** Proto defined to model a mapping from string to string. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetPolicyComplianceForClusterResponse_ViolationsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Returns the list of all Spark versions that can be used to create clusters. */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetSparkVersionsRequest {}

export interface GetSparkVersionsResponse {
  /** All the available Spark versions. */
  versions?: SparkVersion[] | undefined;
}

export interface InitScriptEventDetails {
  /**
   * The private ip of the node we are reporting init script execution details for
   * (we will select the execution details from only one node rather than
   * reporting the execution details from every node to keep these event
   * details small)
   *
   * This should only be defined for the INIT_SCRIPTS_FINISHED event
   */
  reportedForNode?: string | undefined;
  /** The global init scripts associated with this cluster event. */
  global?:
    | InitScriptEventDetails_InitScriptInfoAndExecutionDetails[]
    | undefined;
  /** The cluster scoped init scripts associated with this cluster event. */
  cluster?:
    | InitScriptEventDetails_InitScriptInfoAndExecutionDetails[]
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface InitScriptEventDetails_InitScriptInfoAndExecutionDetails {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * `{ "dbfs": { "destination" : "dbfs:/home/cluster_log" } }`
         */
        dbfs: DbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either the region or endpoint need to be provided. e.g.
         * `{ \"s3\": { \"destination\": \"s3://cluster_log_bucket/prefix\", \"region\": \"us-west-2\" } }`
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * `instance_profile_arn` has permission to write data to the s3 destination.
         */
        s3: S3StorageInfo;
      }
    | {
        $case: 'file';
        /**
         * destination needs to be provided, e.g.
         * `{ "file": { "destination": "file:/my/local/file.sh" } }`
         */
        file: LocalFileInfo;
      }
    | {
        $case: 'gcs';
        /**
         * destination needs to be provided, e.g.
         * `{ "gcs": { "destination": "gs://my-bucket/file.sh" } }`
         */
        gcs: GcsStorageInfo;
      }
    | {
        $case: 'abfss';
        /**
         * destination needs to be provided, e.g.
         * `abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/<directory-name>`
         */
        abfss: Adlsgen2Info;
      }
    | {
        $case: 'workspace';
        /**
         * destination needs to be provided, e.g.
         * `{ "workspace": { "destination": "/cluster-init-scripts/setup-datadog.sh" } }`
         */
        workspace: WorkspaceStorageInfo;
      }
    | {
        $case: 'volumes';
        /**
         * destination needs to be provided. e.g.
         * `{ \"volumes\" : { \"destination\" : \"/Volumes/my-init.sh\" } }`
         */
        volumes: VolumesStorageInfo;
      }
    | undefined;
  /** The current status of the script */
  status?: InitScriptExecutionDetails_InitScriptExecutionStatus | undefined;
  /** The number duration of the script execution in seconds */
  executionDurationSeconds?: number | undefined;
  /**
   * Additional details regarding errors (such as a file not found message
   * if the status is FAILED_FETCH). This field should only be used to
   * provide *additional* information to the status field, not duplicate it.
   */
  errorMessage?: string | undefined;
  /**
   * The stderr output from the init script execution.
   * Only populated when init scripts debug is enabled and script execution fails.
   */
  stderr?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InitScriptExecutionDetails {}

/**
 * Config for an individual init script
 * Next ID: 11
 */
export interface InitScriptInfo {
  storageInfo?:
    | {
        $case: 'dbfs';
        /**
         * destination needs to be provided. e.g.
         * `{ "dbfs": { "destination" : "dbfs:/home/cluster_log" } }`
         */
        dbfs: DbfsStorageInfo;
      }
    | {
        $case: 's3';
        /**
         * destination and either the region or endpoint need to be provided. e.g.
         * `{ \"s3\": { \"destination\": \"s3://cluster_log_bucket/prefix\", \"region\": \"us-west-2\" } }`
         * Cluster iam role is used to access s3, please make sure the cluster iam role in
         * `instance_profile_arn` has permission to write data to the s3 destination.
         */
        s3: S3StorageInfo;
      }
    | {
        $case: 'file';
        /**
         * destination needs to be provided, e.g.
         * `{ "file": { "destination": "file:/my/local/file.sh" } }`
         */
        file: LocalFileInfo;
      }
    | {
        $case: 'gcs';
        /**
         * destination needs to be provided, e.g.
         * `{ "gcs": { "destination": "gs://my-bucket/file.sh" } }`
         */
        gcs: GcsStorageInfo;
      }
    | {
        $case: 'abfss';
        /**
         * destination needs to be provided, e.g.
         * `abfss://<container-name>@<storage-account-name>.dfs.core.windows.net/<directory-name>`
         */
        abfss: Adlsgen2Info;
      }
    | {
        $case: 'workspace';
        /**
         * destination needs to be provided, e.g.
         * `{ "workspace": { "destination": "/cluster-init-scripts/setup-datadog.sh" } }`
         */
        workspace: WorkspaceStorageInfo;
      }
    | {
        $case: 'volumes';
        /**
         * destination needs to be provided. e.g.
         * `{ \"volumes\" : { \"destination\" : \"/Volumes/my-init.sh\" } }`
         */
        volumes: VolumesStorageInfo;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListAvailableZonesRequest {}

export interface ListAvailableZonesResponse {
  /** The list of available zones (e.g., ['us-west-2c', 'us-east-2']). */
  zones?: string[] | undefined;
  /** The availability zone if no ``zone_id`` is provided in the cluster creation request. */
  defaultZone?: string | undefined;
}

export interface ListClusterComplianceForPolicyRequest {
  /** Canonical unique identifier for the cluster policy. */
  policyId?: string | undefined;
  /**
   * A page token that can be used to navigate to the next page or previous page as
   * returned by `next_page_token` or `prev_page_token`.
   */
  pageToken?: string | undefined;
  /**
   * Use this field to specify the maximum number of results to be returned by the server.
   * The server may further constrain the maximum number of results returned in a
   * single page.
   */
  pageSize?: number | undefined;
}

export interface ListClusterComplianceForPolicyResponse {
  /** A list of clusters and their policy compliance statuses. */
  clusters?: ClusterCompliance[] | undefined;
  /**
   * This field represents the pagination token to retrieve the next page of results.
   * If the value is "", it means no further results for the request.
   */
  nextPageToken?: string | undefined;
  /**
   * This field represents the pagination token to retrieve the previous page of results.
   * If the value is "", it means no further results for the request.
   */
  prevPageToken?: string | undefined;
}

export interface ListClustersRequest {
  /** Use next_page_token or prev_page_token returned from the previous request to list the next or previous page of clusters respectively. */
  pageToken?: string | undefined;
  /** Use this field to specify the maximum number of results to be returned by the server. The server may further constrain the maximum number of results returned in a single page. */
  pageSize?: number | undefined;
}

export interface ListClustersResponse {
  clusters?: ClusterInfo[] | undefined;
  /**
   * This field represents the pagination token to retrieve the next page of results.
   * If the value is "", it means no further results for the request.
   */
  nextPageToken?: string | undefined;
  /**
   * This field represents the pagination token to retrieve the previous page of results.
   * If the value is "", it means no further results for the request.
   */
  prevPageToken?: string | undefined;
}

export interface ListEventsRequest {
  /** The ID of the cluster to retrieve events about. */
  clusterId?: string | undefined;
  /**
   * The start time in epoch milliseconds.
   * If empty, returns events starting from the beginning of time.
   */
  startTime?: bigint | undefined;
  /**
   * The end time in epoch milliseconds.
   * If empty, returns events up to the current time.
   */
  endTime?: bigint | undefined;
  /** The order to list events in; either "ASC" or "DESC". Defaults to "DESC". */
  order?: GetEventsOrder | undefined;
  /**
   * An optional set of event types to filter on.
   * If empty, all event types are returned.
   */
  eventTypes?: ClusterEventType_ClusterEventType[] | undefined;
  /**
   * Deprecated: use page_token in combination with page_size instead.
   *
   * The offset in the result set. Defaults to 0 (no offset). When an offset is specified
   * and the results are requested in descending order, the end_time field is required.
   */
  offset?: bigint | undefined;
  /**
   * Deprecated: use page_token in combination with page_size instead.
   *
   * The maximum number of events to include in a page of events.
   * Defaults to 50, and maximum allowed value is 500.
   */
  limit?: bigint | undefined;
  /**
   * Use next_page_token or prev_page_token returned from the previous request to list the next or previous page of events respectively.
   * If page_token is empty, the first page is returned.
   */
  pageToken?: string | undefined;
  /**
   * The maximum number of events to include in a page of events.
   * The server may further constrain the maximum number of results returned in a single page.
   * If the page_size is empty or 0, the server will decide the number of results to be returned.
   * The field has to be in the range [0,500]. If the value is outside the range, the server enforces 0 or 500.
   */
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListNodeTypesRequest {}

export interface ListNodeTypesResponse {
  /** The list of available Spark node types. */
  nodeTypes?: NodeType[] | undefined;
}

export interface LocalFileInfo {
  /** local file destination, e.g. `file:/my/local/file.sh` */
  destination?: string | undefined;
}

export interface LogAnalyticsInfo {
  logAnalyticsWorkspaceId?: string | undefined;
  logAnalyticsPrimaryKey?: string | undefined;
}

/** The log delivery status */
export interface LogSyncStatus {
  /**
   * The timestamp of last attempt. If the last attempt fails, `last_exception` will contain the
   * exception in the last attempt.
   */
  lastAttempted?: bigint | undefined;
  /**
   * The exception thrown in the last attempt, it would be null (omitted in the response) if
   * there is no exception in last attempted.
   */
  lastException?: string | undefined;
}

/**
 * This structure embodies the machine type that hosts spark containers
 * Note: this should be an internal data structure for now
 * It is defined in proto in case we want to send it over the wire in the future (which is likely)
 */
export interface NodeInstanceType {
  /** Unique identifier across instance types */
  instanceTypeId?: string | undefined;
  /** Number of local disks that are present on this instance. */
  localDisks?: number | undefined;
  /** Size of the individual local disks attached to this instance (i.e. per local disk). */
  localDiskSizeGb?: number | undefined;
  /** Size of the individual local nvme disks attached to this instance (i.e. per local disk). */
  localNvmeDiskSizeGb?: number | undefined;
  /** Number of local nvme disks that are present on this instance. */
  localNvmeDisks?: number | undefined;
}

/**
 * A description of a Spark node type including both the dimensions of the node and the
 * instance type on which it will be hosted.
 */
export interface NodeType {
  /** Unique identifier for this node type. */
  nodeTypeId?: string | undefined;
  /** Memory (in MB) available for this node type. */
  memoryMb?: number | undefined;
  /**
   * Number of CPU cores available for this node type.
   * Note that this can be fractional, e.g., 2.5 cores, if the the number of cores on a
   * machine instance is not divisible by the number of Spark nodes on that machine.
   */
  numCores?: number | undefined;
  /** A string description associated with this node type, e.g., "r3.xlarge". */
  description?: string | undefined;
  /** An identifier for the type of hardware that this node runs on, e.g., "r3.2xlarge" in AWS. */
  instanceTypeId?: string | undefined;
  /** Whether the node type is deprecated. Non-deprecated node types offer greater performance. */
  isDeprecated?: boolean | undefined;
  /**
   * A descriptive category for this node type. Examples include "Memory Optimized" and
   * "Compute Optimized".
   */
  category?: string | undefined;
  /**
   * Whether this node type support EBS volumes. EBS volumes is disabled for node types that
   * we could place multiple corresponding containers on the same hosting instance.
   */
  supportEbsVolumes?: boolean | undefined;
  /** Whether this node type support cluster tags. */
  supportClusterTags?: boolean | undefined;
  /** Number of GPUs available for this node type. */
  numGpus?: number | undefined;
  /** The NodeInstanceType object corresponding to instance_type_id */
  nodeInstanceType?: NodeInstanceType | undefined;
  /** Whether this node is hidden from presentation in the UI. */
  isHidden?: boolean | undefined;
  /** Whether this node type supports port forwarding. */
  supportPortForwarding?: boolean | undefined;
  /**
   * An optional hint at the display order of node types in the UI.
   * Within a node type category, lowest numbers come first.
   */
  displayOrder?: number | undefined;
  /** Whether this node comes with IO cache enabled by default. */
  isIoCacheEnabled?: boolean | undefined;
  /** A collection of node type info reported by the cloud provider */
  nodeInfo?: CloudProviderNodeInfo | undefined;
  photonWorkerCapable?: boolean | undefined;
  photonDriverCapable?: boolean | undefined;
  /**
   * AWS specific, whether this instance supports encryption in transit, used for hipaa and pci
   * workloads.
   */
  isEncryptedInTransit?: boolean | undefined;
  /** Whether this is an Arm-based instance. */
  isGraviton?: boolean | undefined;
}

/** Configuration for flexible node types, allowing fallback to alternate node types during cluster launch and upscale. */
export interface NodeTypeFlexibility {
  /** A list of node type IDs to use as fallbacks when the primary node type is unavailable. */
  alternateNodeTypeIds?: string[] | undefined;
}

export interface PermanentDeleteClusterRequest {
  /** The cluster to be deleted. */
  clusterId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PermanentDeleteClusterResponse {}

export interface PinClusterRequest {
  clusterId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PinClusterResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResizeCause {}

export interface ResizeClusterRequest {
  /** The cluster to be resized. */
  clusterId?: string | undefined;
  size?:
    | {
        $case: 'numWorkers';
        /**
         * Number of worker nodes that this cluster should have. A cluster has one Spark Driver
         * and `num_workers` Executors for a total of `num_workers` + 1 Spark nodes.
         *
         * Note: When reading the properties of a cluster, this field reflects the desired number
         * of workers rather than the actual current number of workers. For instance, if a cluster
         * is resized from 5 to 10 workers, this field will immediately be updated to reflect
         * the target size of 10 workers, whereas the workers listed in `spark_info` will gradually
         * increase from 5 to 10 as the new nodes are provisioned.
         */
        numWorkers: number;
      }
    | {
        $case: 'autoscale';
        /**
         * Parameters needed in order to automatically scale clusters up and down based on load.
         * Note: autoscaling works best with DB runtime versions 3.0 or later.
         */
        autoscale: AutoScale;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ResizeClusterResponse {}

export interface RestartClusterRequest {
  /** The cluster to be started. */
  clusterId?: string | undefined;
  restartUser?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RestartClusterResponse {}

/** A storage location in Amazon S3 */
export interface S3StorageInfo {
  /**
   * S3 destination, e.g. `s3://my-bucket/some-prefix` Note that logs will be delivered using
   * cluster iam role, please make sure you set cluster iam role and the role has write access to the
   * destination. Please also note that you cannot use AWS keys to deliver logs.
   */
  destination?: string | undefined;
  /**
   * S3 region, e.g. `us-west-2`. Either region or endpoint needs to be set. If both are set,
   * endpoint will be used.
   */
  region?: string | undefined;
  /**
   * S3 endpoint, e.g. `https://s3-us-west-2.amazonaws.com`. Either region or endpoint needs to be set.
   * If both are set, endpoint will be used.
   */
  endpoint?: string | undefined;
  /** (Optional) Flag to enable server side encryption, `false` by default. */
  enableEncryption?: boolean | undefined;
  /**
   * (Optional) The encryption type, it could be `sse-s3` or `sse-kms`. It will be used only when
   * encryption is enabled and the default type is `sse-s3`.
   */
  encryptionType?: string | undefined;
  /** (Optional) Kms key which will be used if encryption is enabled and encryption type is set to `sse-kms`. */
  kmsKey?: string | undefined;
  /**
   * (Optional) Set canned access control list for the logs, e.g. `bucket-owner-full-control`.
   * If `canned_cal` is set, please make sure the cluster iam role has `s3:PutObjectAcl` permission on
   * the destination bucket and prefix. The full list of possible canned acl can be found at
   * http://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl.
   * Please also note that by default only the object owner gets full controls. If you are using cross account
   * role for writing data, you may want to set `bucket-owner-full-control` to make bucket owner able to
   * read the logs.
   */
  cannedAcl?: string | undefined;
}

/**
 * Provides information about Spark running inside a cluster.
 * This is used in both the [[ClusterInfo]] for Cluster APIs and persisted cluster proto.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SparkInfo {}

/** Describes a specific Spark driver or executor. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SparkInfo_SparkNode {
  /**
   * Private IP address (typically a 10.x.x.x address) of the Spark node.
   * Note that this is different from the private IP address of the host instance.
   */
  privateIp?: string | undefined;
  /**
   * Public DNS address of this node. This address can be used to access
   * the Spark JDBC server on the driver node. To communicate with the JDBC server, traffic must
   * be manually authorized by adding security group rules to the "worker-unmanaged" security
   * group via the AWS console.
   */
  publicDns?: string | undefined;
  /** Globally unique identifier for this node. */
  nodeId?: string | undefined;
  /** Globally unique identifier for the host instance from the cloud provider. */
  instanceId?: string | undefined;
  /** The timestamp (in millisecond) when the Spark node is launched. */
  startTimestamp?: bigint | undefined;
  /** Attributes specific to AWS for a Spark node. */
  nodeAwsAttributes?: SparkInfo_SparkNode_SparkNodeAwsAttributes | undefined;
  /** The private IP address of the host instance. */
  hostPrivateIp?: string | undefined;
}

/** Attributes specific to AWS for a Spark node. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SparkInfo_SparkNode_SparkNodeAwsAttributes {
  /** Whether this node is on an Amazon spot instance. */
  isSpot?: boolean | undefined;
}

export interface SparkVersion {
  /**
   * Spark version key, for example "2.1.x-scala2.11". This is the value which should be provided
   * as the "spark_version" when creating a new cluster.
   * Note that the exact Spark version may change over time for a "wildcard" version
   * (i.e., "2.1.x-scala2.11" is a "wildcard" version) with minor bug fixes.
   */
  key?: string | undefined;
  /** A descriptive name for this Spark version, for example "Spark 2.1". */
  name?: string | undefined;
}

export interface StartClusterRequest {
  /** The cluster to be started. */
  clusterId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StartClusterResponse {}

export interface TerminationReason {
  /** status code indicating why the cluster was terminated */
  code?: TerminationCode | undefined;
  /** type of the termination */
  type?: TerminationType | undefined;
  /** list of parameters that provide additional information about why the cluster was terminated */
  parameters?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface TerminationReason_ParametersEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface UnpinClusterRequest {
  clusterId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UnpinClusterResponse {}

export interface UpdateClusterRequest {
  /** ID of the cluster. */
  clusterId?: string | undefined;
  /** The cluster to be updated. */
  cluster?: UpdateClusterRequest_UpdateClusterResource | undefined;
  /** Used to specify which cluster attributes and size fields to update. See https://google.aip.dev/161 for more details. */
  updateMask?:
    | FieldMask<UpdateClusterRequest_UpdateClusterResource>
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateClusterRequest_UpdateClusterResource {
  size?:
    | {
        $case: 'numWorkers';
        /**
         * Number of worker nodes that this cluster should have. A cluster has one Spark Driver
         * and `num_workers` Executors for a total of `num_workers` + 1 Spark nodes.
         *
         * Note: When reading the properties of a cluster, this field reflects the desired number
         * of workers rather than the actual current number of workers. For instance, if a cluster
         * is resized from 5 to 10 workers, this field will immediately be updated to reflect
         * the target size of 10 workers, whereas the workers listed in `spark_info` will gradually
         * increase from 5 to 10 as the new nodes are provisioned.
         */
        numWorkers: number;
      }
    | {
        $case: 'autoscale';
        /**
         * Parameters needed in order to automatically scale clusters up and down based on load.
         * Note: autoscaling works best with DB runtime versions 3.0 or later.
         */
        autoscale: AutoScale;
      }
    | undefined;
  /**
   * Cluster name requested by the user. This doesn't have to be unique.
   * If not specified at creation, the cluster name will be an empty string.
   * For job clusters, the cluster name is automatically set based on the job and job run IDs.
   */
  clusterName?: string | undefined;
  /**
   * The Spark version of the cluster, e.g. `3.3.x-scala2.11`.
   * A list of available Spark versions can be retrieved by using
   * the :method:clusters/sparkVersions API call.
   */
  sparkVersion?: string | undefined;
  /**
   * An object containing a set of optional, user-specified Spark configuration key-value pairs.
   * Users can also pass in a string of extra JVM options to the driver and the executors via
   * `spark.driver.extraJavaOptions` and `spark.executor.extraJavaOptions` respectively.
   */
  sparkConf?: Record<string, string> | undefined;
  /**
   * Attributes related to clusters running on Amazon Web Services.
   * If not specified at cluster creation, a set of default values will be used.
   */
  awsAttributes?: AwsAttributes | undefined;
  /**
   * Attributes related to clusters running on Microsoft Azure.
   * If not specified at cluster creation, a set of default values will be used.
   */
  azureAttributes?: AzureAttributes | undefined;
  /**
   * Attributes related to clusters running on Google Cloud Platform.
   * If not specified at cluster creation, a set of default values will be used.
   */
  gcpAttributes?: GcpAttributes | undefined;
  /**
   * This field encodes, through a single value, the resources available to each of
   * the Spark nodes in this cluster. For example, the Spark nodes can be provisioned
   * and optimized for memory or compute intensive workloads. A list of available node
   * types can be retrieved by using the :method:clusters/listNodeTypes API call.
   */
  nodeTypeId?: string | undefined;
  /**
   * The node type of the Spark driver.
   * Note that this field is optional; if unset, the driver node type will be set as the same value
   * as `node_type_id` defined above.
   *
   * This field, along with node_type_id, should not be set if virtual_cluster_size is set.
   * If both driver_node_type_id, node_type_id, and virtual_cluster_size are specified, driver_node_type_id and node_type_id take precedence.
   */
  driverNodeTypeId?: string | undefined;
  /** Flexible node type configuration for worker nodes. */
  workerNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /** Flexible node type configuration for the driver node. */
  driverNodeTypeFlexibility?: NodeTypeFlexibility | undefined;
  /**
   * SSH public key contents that will be added to each Spark node in this cluster. The
   * corresponding private keys can be used to login with the user name `ubuntu` on port `2200`.
   * Up to 10 keys can be specified.
   */
  sshPublicKeys?: string[] | undefined;
  /**
   * Additional tags for cluster resources. <Databricks> will tag all cluster resources (e.g., AWS
   * instances and EBS volumes) with these tags in addition to `default_tags`. Notes:
   *
   * - Currently, <Databricks> allows at most 45 custom tags
   *
   * - Clusters can only reuse cloud resources if the resources' tags are a subset of the cluster tags
   */
  customTags?: Record<string, string> | undefined;
  /**
   * The configuration for delivering spark logs to a long-term storage destination.
   * Three kinds of destinations (DBFS, S3 and Unity Catalog volumes) are supported. Only one destination can be specified
   * for one cluster. If the conf is given, the logs will be delivered to the destination every
   * `5 mins`. The destination of driver logs is `$destination/$clusterId/driver`, while
   * the destination of executor logs is `$destination/$clusterId/executor`.
   */
  clusterLogConf?: ClusterLogConf | undefined;
  /**
   * An object containing a set of optional, user-specified environment variable key-value pairs.
   * Please note that key-value pair of the form (X,Y) will be exported as is (i.e.,
   * `export X='Y'`) while launching the driver and workers.
   *
   * In order to specify an additional set of `SPARK_DAEMON_JAVA_OPTS`, we recommend appending
   * them to `$SPARK_DAEMON_JAVA_OPTS` as shown in the example below. This ensures that all
   * default databricks managed environmental variables are included as well.
   *
   * Example Spark environment variables:
   * `{"SPARK_WORKER_MEMORY": "28000m", "SPARK_LOCAL_DIRS": "/local_disk0"}` or
   * `{"SPARK_DAEMON_JAVA_OPTS": "$SPARK_DAEMON_JAVA_OPTS -Dspark.shuffle.service.enabled=true"}`
   */
  sparkEnvVars?: Record<string, string> | undefined;
  /**
   * Automatically terminates the cluster after it is inactive for this time in minutes. If not set,
   * this cluster will not be automatically terminated. If specified, the threshold must be between
   * 10 and 10000 minutes.
   * Users can also set this value to 0 to explicitly disable automatic termination.
   */
  autoterminationMinutes?: number | undefined;
  /**
   * Autoscaling Local Storage: when enabled, this cluster will dynamically acquire additional disk
   * space when its Spark workers are running low on disk space.
   */
  enableElasticDisk?: boolean | undefined;
  /**
   * The configuration for storing init scripts. Any number of destinations can be specified.
   * The scripts are executed sequentially in the order provided.
   * If `cluster_log_conf` is specified, init script logs are sent to `<destination>/<cluster-ID>/init_scripts`.
   */
  initScripts?: InitScriptInfo[] | undefined;
  /** Custom docker image BYOC */
  dockerImage?: DockerImage | undefined;
  /** The optional ID of the instance pool to which the cluster belongs. */
  instancePoolId?: string | undefined;
  /** Single user name if data_security_mode is `SINGLE_USER` */
  singleUserName?: string | undefined;
  /** The ID of the cluster policy used to create the cluster if applicable. */
  policyId?: string | undefined;
  /** Whether to enable LUKS on cluster VMs' local disks */
  enableLocalDiskEncryption?: boolean | undefined;
  /**
   * The optional ID of the instance pool for the driver of the cluster belongs.
   * The pool cluster uses the instance pool with id (instance_pool_id) if the driver pool is not
   * assigned.
   */
  driverInstancePoolId?: string | undefined;
  workloadType?: WorkloadType | undefined;
  dataSecurityMode?: DataSecurityMode | undefined;
  /**
   * Determines the cluster's runtime engine, either standard or Photon.
   *
   * This field is not compatible with legacy `spark_version` values that contain `-photon-`.
   * Remove `-photon-` from the `spark_version` and set `runtime_engine` to `PHOTON`.
   *
   * If left unspecified, the runtime engine defaults to standard unless the spark_version
   * contains -photon-, in which case Photon will be used.
   */
  runtimeEngine?: RuntimeEngine | undefined;
  kind?: ComputeKind | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * `effective_spark_version` is determined by `spark_version` (DBR release), this field `use_ml_runtime`, and whether `node_type_id` is gpu node or not.
   */
  useMlRuntime?: boolean | undefined;
  /**
   * This field can only be used when `kind = CLASSIC_PREVIEW`.
   *
   * When set to true, <Databricks> will automatically set single node related `custom_tags`, `spark_conf`, and `num_workers`
   */
  isSingleNode?: boolean | undefined;
  /** If set, what the configurable throughput (in Mb/s) for the remote disk is. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  remoteDiskThroughput?: number | undefined;
  /** If set, what the total initial volume size (in GB) of the remote disks should be. Currently only supported for GCP HYPERDISK_BALANCED disks. */
  totalInitialRemoteDiskSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateClusterRequest_UpdateClusterResource_CustomTagsEntry {
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

/** Spark configuration key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateClusterRequest_UpdateClusterResource_SparkConfEntry {
  key?: string | undefined;
  value?: string | undefined;
}

/** Spark environment variable key-value pairs */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateClusterRequest_UpdateClusterResource_SparkEnvVarsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateClusterResponse {}

/** A storage location back by UC Volumes. */
export interface VolumesStorageInfo {
  /**
   * UC Volumes destination, e.g. `/Volumes/catalog/schema/vol1/init-scripts/setup-datadog.sh`
   * or `dbfs:/Volumes/catalog/schema/vol1/init-scripts/setup-datadog.sh`
   */
  destination?: string | undefined;
}

/** Cluster Attributes showing for clusters workload types. */
export interface WorkloadType {
  /** defined what type of clients can use the cluster. E.g. Notebooks, Jobs */
  clients?: WorkloadType_ClientsTypes | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface WorkloadType_ClientsTypes {
  /** With notebooks set, this cluster can be used for notebooks */
  notebooks?: boolean | undefined;
  /** With jobs set, the cluster can be used for jobs */
  jobs?: boolean | undefined;
}

/** A storage location in Workspace Filesystem (WSFS) */
export interface WorkspaceStorageInfo {
  /** wsfs destination, e.g. `workspace:/cluster-init-scripts/setup-datadog.sh` */
  destination?: string | undefined;
}

export const unmarshalAdlsgen2InfoSchema: z.ZodType<Adlsgen2Info> = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const unmarshalAutoScaleSchema: z.ZodType<AutoScale> = z
  .object({
    min_workers: z.number().optional(),
    max_workers: z.number().optional(),
  })
  .transform(d => ({
    minWorkers: d.min_workers,
    maxWorkers: d.max_workers,
  }));

export const unmarshalAwsAttributesSchema: z.ZodType<AwsAttributes> = z
  .object({
    first_on_demand: z.number().optional(),
    availability: z.enum(AwsAvailability).optional(),
    zone_id: z.string().optional(),
    instance_profile_arn: z.string().optional(),
    spot_bid_price_percent: z.number().optional(),
    ebs_volume_type: z.enum(EbsVolumeType).optional(),
    ebs_volume_count: z.number().optional(),
    ebs_volume_size: z.number().optional(),
    ebs_volume_iops: z.number().optional(),
    ebs_volume_throughput: z.number().optional(),
  })
  .transform(d => ({
    firstOnDemand: d.first_on_demand,
    availability: d.availability,
    zoneId: d.zone_id,
    instanceProfileArn: d.instance_profile_arn,
    spotBidPricePercent: d.spot_bid_price_percent,
    ebsVolumeType: d.ebs_volume_type,
    ebsVolumeCount: d.ebs_volume_count,
    ebsVolumeSize: d.ebs_volume_size,
    ebsVolumeIops: d.ebs_volume_iops,
    ebsVolumeThroughput: d.ebs_volume_throughput,
  }));

export const unmarshalAzureAttributesSchema: z.ZodType<AzureAttributes> = z
  .object({
    log_analytics_info: z
      .lazy(() => unmarshalLogAnalyticsInfoSchema)
      .optional(),
    first_on_demand: z.number().optional(),
    availability: z.enum(AzureAvailability).optional(),
    spot_bid_max_price: z.number().optional(),
  })
  .transform(d => ({
    logAnalyticsInfo: d.log_analytics_info,
    firstOnDemand: d.first_on_demand,
    availability: d.availability,
    spotBidMaxPrice: d.spot_bid_max_price,
  }));

export const unmarshalChangeClusterOwnerResponseSchema: z.ZodType<ChangeClusterOwnerResponse> =
  z.object({});

export const unmarshalCloudProviderNodeInfoSchema: z.ZodType<CloudProviderNodeInfo> =
  z
    .object({
      status: z.array(z.enum(CloudProviderNodeStatus)).optional(),
    })
    .transform(d => ({
      status: d.status,
    }));

export const unmarshalClusterAttributesSchema: z.ZodType<ClusterAttributes> = z
  .object({
    cluster_name: z.string().optional(),
    spark_version: z.string().optional(),
    spark_conf: z.record(z.string(), z.string()).optional(),
    aws_attributes: z.lazy(() => unmarshalAwsAttributesSchema).optional(),
    azure_attributes: z.lazy(() => unmarshalAzureAttributesSchema).optional(),
    gcp_attributes: z.lazy(() => unmarshalGcpAttributesSchema).optional(),
    node_type_id: z.string().optional(),
    driver_node_type_id: z.string().optional(),
    worker_node_type_flexibility: z
      .lazy(() => unmarshalNodeTypeFlexibilitySchema)
      .optional(),
    driver_node_type_flexibility: z
      .lazy(() => unmarshalNodeTypeFlexibilitySchema)
      .optional(),
    ssh_public_keys: z.array(z.string()).optional(),
    custom_tags: z.record(z.string(), z.string()).optional(),
    cluster_log_conf: z.lazy(() => unmarshalClusterLogConfSchema).optional(),
    spark_env_vars: z.record(z.string(), z.string()).optional(),
    autotermination_minutes: z.number().optional(),
    enable_elastic_disk: z.boolean().optional(),
    init_scripts: z
      .array(z.lazy(() => unmarshalInitScriptInfoSchema))
      .optional(),
    docker_image: z.lazy(() => unmarshalDockerImageSchema).optional(),
    instance_pool_id: z.string().optional(),
    single_user_name: z.string().optional(),
    policy_id: z.string().optional(),
    enable_local_disk_encryption: z.boolean().optional(),
    driver_instance_pool_id: z.string().optional(),
    workload_type: z.lazy(() => unmarshalWorkloadTypeSchema).optional(),
    data_security_mode: z.enum(DataSecurityMode).optional(),
    runtime_engine: z.enum(RuntimeEngine).optional(),
    kind: z.enum(ComputeKind).optional(),
    use_ml_runtime: z.boolean().optional(),
    is_single_node: z.boolean().optional(),
    remote_disk_throughput: z.number().optional(),
    total_initial_remote_disk_size: z.number().optional(),
  })
  .transform(d => ({
    clusterName: d.cluster_name,
    sparkVersion: d.spark_version,
    sparkConf: d.spark_conf,
    awsAttributes: d.aws_attributes,
    azureAttributes: d.azure_attributes,
    gcpAttributes: d.gcp_attributes,
    nodeTypeId: d.node_type_id,
    driverNodeTypeId: d.driver_node_type_id,
    workerNodeTypeFlexibility: d.worker_node_type_flexibility,
    driverNodeTypeFlexibility: d.driver_node_type_flexibility,
    sshPublicKeys: d.ssh_public_keys,
    customTags: d.custom_tags,
    clusterLogConf: d.cluster_log_conf,
    sparkEnvVars: d.spark_env_vars,
    autoterminationMinutes: d.autotermination_minutes,
    enableElasticDisk: d.enable_elastic_disk,
    initScripts: d.init_scripts,
    dockerImage: d.docker_image,
    instancePoolId: d.instance_pool_id,
    singleUserName: d.single_user_name,
    policyId: d.policy_id,
    enableLocalDiskEncryption: d.enable_local_disk_encryption,
    driverInstancePoolId: d.driver_instance_pool_id,
    workloadType: d.workload_type,
    dataSecurityMode: d.data_security_mode,
    runtimeEngine: d.runtime_engine,
    kind: d.kind,
    useMlRuntime: d.use_ml_runtime,
    isSingleNode: d.is_single_node,
    remoteDiskThroughput: d.remote_disk_throughput,
    totalInitialRemoteDiskSize: d.total_initial_remote_disk_size,
  }));

export const unmarshalClusterComplianceSchema: z.ZodType<ClusterCompliance> = z
  .object({
    cluster_id: z.string().optional(),
    is_compliant: z.boolean().optional(),
    violations: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    clusterId: d.cluster_id,
    isCompliant: d.is_compliant,
    violations: d.violations,
  }));

export const unmarshalClusterEventSchema: z.ZodType<ClusterEvent> = z
  .object({
    cluster_id: z.string().optional(),
    timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    type: z.enum(ClusterEventType_ClusterEventType).optional(),
    details: z.lazy(() => unmarshalEventDetailsSchema).optional(),
    data_plane_event_details: z
      .lazy(() => unmarshalDataPlaneEventDetailsSchema)
      .optional(),
  })
  .transform(d => ({
    clusterId: d.cluster_id,
    timestamp: d.timestamp,
    type: d.type,
    details: d.details,
    dataPlaneEventDetails: d.data_plane_event_details,
  }));

export const unmarshalClusterInfoSchema: z.ZodType<ClusterInfo> = z
  .object({
    cluster_id: z.string().optional(),
    creator_user_name: z.string().optional(),
    state: z.enum(ClusterState_ClusterState).optional(),
    state_message: z.string().optional(),
    cluster_memory_mb: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    cluster_cores: z.number().optional(),
    default_tags: z.record(z.string(), z.string()).optional(),
    cluster_log_status: z.lazy(() => unmarshalLogSyncStatusSchema).optional(),
    termination_reason: z
      .lazy(() => unmarshalTerminationReasonSchema)
      .optional(),
    spec: z.lazy(() => unmarshalClusterInfo_ComputeSpecSchema).optional(),
    driver: z.lazy(() => unmarshalSparkInfo_SparkNodeSchema).optional(),
    executors: z
      .array(z.lazy(() => unmarshalSparkInfo_SparkNodeSchema))
      .optional(),
    spark_context_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    jdbc_port: z.number().optional(),
    cluster_name: z.string().optional(),
    spark_version: z.string().optional(),
    spark_conf: z.record(z.string(), z.string()).optional(),
    aws_attributes: z.lazy(() => unmarshalAwsAttributesSchema).optional(),
    azure_attributes: z.lazy(() => unmarshalAzureAttributesSchema).optional(),
    gcp_attributes: z.lazy(() => unmarshalGcpAttributesSchema).optional(),
    node_type_id: z.string().optional(),
    driver_node_type_id: z.string().optional(),
    worker_node_type_flexibility: z
      .lazy(() => unmarshalNodeTypeFlexibilitySchema)
      .optional(),
    driver_node_type_flexibility: z
      .lazy(() => unmarshalNodeTypeFlexibilitySchema)
      .optional(),
    ssh_public_keys: z.array(z.string()).optional(),
    custom_tags: z.record(z.string(), z.string()).optional(),
    cluster_log_conf: z.lazy(() => unmarshalClusterLogConfSchema).optional(),
    spark_env_vars: z.record(z.string(), z.string()).optional(),
    autotermination_minutes: z.number().optional(),
    enable_elastic_disk: z.boolean().optional(),
    init_scripts: z
      .array(z.lazy(() => unmarshalInitScriptInfoSchema))
      .optional(),
    docker_image: z.lazy(() => unmarshalDockerImageSchema).optional(),
    instance_pool_id: z.string().optional(),
    single_user_name: z.string().optional(),
    policy_id: z.string().optional(),
    enable_local_disk_encryption: z.boolean().optional(),
    driver_instance_pool_id: z.string().optional(),
    workload_type: z.lazy(() => unmarshalWorkloadTypeSchema).optional(),
    data_security_mode: z.enum(DataSecurityMode).optional(),
    runtime_engine: z.enum(RuntimeEngine).optional(),
    kind: z.enum(ComputeKind).optional(),
    use_ml_runtime: z.boolean().optional(),
    is_single_node: z.boolean().optional(),
    remote_disk_throughput: z.number().optional(),
    total_initial_remote_disk_size: z.number().optional(),
    start_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    terminated_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    last_state_loss_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    last_restarted_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    num_workers: z.number().optional(),
    autoscale: z.lazy(() => unmarshalAutoScaleSchema).optional(),
  })
  .transform(d => ({
    clusterId: d.cluster_id,
    creatorUserName: d.creator_user_name,
    state: d.state,
    stateMessage: d.state_message,
    clusterMemoryMb: d.cluster_memory_mb,
    clusterCores: d.cluster_cores,
    defaultTags: d.default_tags,
    clusterLogStatus: d.cluster_log_status,
    terminationReason: d.termination_reason,
    spec: d.spec,
    driver: d.driver,
    executors: d.executors,
    sparkContextId: d.spark_context_id,
    jdbcPort: d.jdbc_port,
    clusterName: d.cluster_name,
    sparkVersion: d.spark_version,
    sparkConf: d.spark_conf,
    awsAttributes: d.aws_attributes,
    azureAttributes: d.azure_attributes,
    gcpAttributes: d.gcp_attributes,
    nodeTypeId: d.node_type_id,
    driverNodeTypeId: d.driver_node_type_id,
    workerNodeTypeFlexibility: d.worker_node_type_flexibility,
    driverNodeTypeFlexibility: d.driver_node_type_flexibility,
    sshPublicKeys: d.ssh_public_keys,
    customTags: d.custom_tags,
    clusterLogConf: d.cluster_log_conf,
    sparkEnvVars: d.spark_env_vars,
    autoterminationMinutes: d.autotermination_minutes,
    enableElasticDisk: d.enable_elastic_disk,
    initScripts: d.init_scripts,
    dockerImage: d.docker_image,
    instancePoolId: d.instance_pool_id,
    singleUserName: d.single_user_name,
    policyId: d.policy_id,
    enableLocalDiskEncryption: d.enable_local_disk_encryption,
    driverInstancePoolId: d.driver_instance_pool_id,
    workloadType: d.workload_type,
    dataSecurityMode: d.data_security_mode,
    runtimeEngine: d.runtime_engine,
    kind: d.kind,
    useMlRuntime: d.use_ml_runtime,
    isSingleNode: d.is_single_node,
    remoteDiskThroughput: d.remote_disk_throughput,
    totalInitialRemoteDiskSize: d.total_initial_remote_disk_size,
    startTime: d.start_time,
    terminatedTime: d.terminated_time,
    lastStateLossTime: d.last_state_loss_time,
    lastRestartedTime: d.last_restarted_time,
    size:
      d.num_workers !== undefined
        ? {$case: 'numWorkers' as const, numWorkers: d.num_workers}
        : d.autoscale !== undefined
          ? {$case: 'autoscale' as const, autoscale: d.autoscale}
          : undefined,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalClusterInfo_ComputeSpecSchema: z.ZodType<ClusterInfo_ComputeSpec> =
  z
    .object({
      apply_policy_default_values: z.boolean().optional(),
      cluster_name: z.string().optional(),
      spark_version: z.string().optional(),
      spark_conf: z.record(z.string(), z.string()).optional(),
      aws_attributes: z.lazy(() => unmarshalAwsAttributesSchema).optional(),
      azure_attributes: z.lazy(() => unmarshalAzureAttributesSchema).optional(),
      gcp_attributes: z.lazy(() => unmarshalGcpAttributesSchema).optional(),
      node_type_id: z.string().optional(),
      driver_node_type_id: z.string().optional(),
      worker_node_type_flexibility: z
        .lazy(() => unmarshalNodeTypeFlexibilitySchema)
        .optional(),
      driver_node_type_flexibility: z
        .lazy(() => unmarshalNodeTypeFlexibilitySchema)
        .optional(),
      ssh_public_keys: z.array(z.string()).optional(),
      custom_tags: z.record(z.string(), z.string()).optional(),
      cluster_log_conf: z.lazy(() => unmarshalClusterLogConfSchema).optional(),
      spark_env_vars: z.record(z.string(), z.string()).optional(),
      autotermination_minutes: z.number().optional(),
      enable_elastic_disk: z.boolean().optional(),
      init_scripts: z
        .array(z.lazy(() => unmarshalInitScriptInfoSchema))
        .optional(),
      docker_image: z.lazy(() => unmarshalDockerImageSchema).optional(),
      instance_pool_id: z.string().optional(),
      single_user_name: z.string().optional(),
      policy_id: z.string().optional(),
      enable_local_disk_encryption: z.boolean().optional(),
      driver_instance_pool_id: z.string().optional(),
      workload_type: z.lazy(() => unmarshalWorkloadTypeSchema).optional(),
      data_security_mode: z.enum(DataSecurityMode).optional(),
      runtime_engine: z.enum(RuntimeEngine).optional(),
      kind: z.enum(ComputeKind).optional(),
      use_ml_runtime: z.boolean().optional(),
      is_single_node: z.boolean().optional(),
      remote_disk_throughput: z.number().optional(),
      total_initial_remote_disk_size: z.number().optional(),
      num_workers: z.number().optional(),
      autoscale: z.lazy(() => unmarshalAutoScaleSchema).optional(),
    })
    .transform(d => ({
      applyPolicyDefaultValues: d.apply_policy_default_values,
      clusterName: d.cluster_name,
      sparkVersion: d.spark_version,
      sparkConf: d.spark_conf,
      awsAttributes: d.aws_attributes,
      azureAttributes: d.azure_attributes,
      gcpAttributes: d.gcp_attributes,
      nodeTypeId: d.node_type_id,
      driverNodeTypeId: d.driver_node_type_id,
      workerNodeTypeFlexibility: d.worker_node_type_flexibility,
      driverNodeTypeFlexibility: d.driver_node_type_flexibility,
      sshPublicKeys: d.ssh_public_keys,
      customTags: d.custom_tags,
      clusterLogConf: d.cluster_log_conf,
      sparkEnvVars: d.spark_env_vars,
      autoterminationMinutes: d.autotermination_minutes,
      enableElasticDisk: d.enable_elastic_disk,
      initScripts: d.init_scripts,
      dockerImage: d.docker_image,
      instancePoolId: d.instance_pool_id,
      singleUserName: d.single_user_name,
      policyId: d.policy_id,
      enableLocalDiskEncryption: d.enable_local_disk_encryption,
      driverInstancePoolId: d.driver_instance_pool_id,
      workloadType: d.workload_type,
      dataSecurityMode: d.data_security_mode,
      runtimeEngine: d.runtime_engine,
      kind: d.kind,
      useMlRuntime: d.use_ml_runtime,
      isSingleNode: d.is_single_node,
      remoteDiskThroughput: d.remote_disk_throughput,
      totalInitialRemoteDiskSize: d.total_initial_remote_disk_size,
      size:
        d.num_workers !== undefined
          ? {$case: 'numWorkers' as const, numWorkers: d.num_workers}
          : d.autoscale !== undefined
            ? {$case: 'autoscale' as const, autoscale: d.autoscale}
            : undefined,
    }));

export const unmarshalClusterLogConfSchema: z.ZodType<ClusterLogConf> = z
  .object({
    dbfs: z.lazy(() => unmarshalDbfsStorageInfoSchema).optional(),
    s3: z.lazy(() => unmarshalS3StorageInfoSchema).optional(),
    volumes: z.lazy(() => unmarshalVolumesStorageInfoSchema).optional(),
  })
  .transform(d => ({
    storageInfo:
      d.dbfs !== undefined
        ? {$case: 'dbfs' as const, dbfs: d.dbfs}
        : d.s3 !== undefined
          ? {$case: 's3' as const, s3: d.s3}
          : d.volumes !== undefined
            ? {$case: 'volumes' as const, volumes: d.volumes}
            : undefined,
  }));

export const unmarshalClusterSizeSchema: z.ZodType<ClusterSize> = z
  .object({
    num_workers: z.number().optional(),
    autoscale: z.lazy(() => unmarshalAutoScaleSchema).optional(),
  })
  .transform(d => ({
    size:
      d.num_workers !== undefined
        ? {$case: 'numWorkers' as const, numWorkers: d.num_workers}
        : d.autoscale !== undefined
          ? {$case: 'autoscale' as const, autoscale: d.autoscale}
          : undefined,
  }));

export const unmarshalCreateClusterResponseSchema: z.ZodType<CreateClusterResponse> =
  z
    .object({
      cluster_id: z.string().optional(),
    })
    .transform(d => ({
      clusterId: d.cluster_id,
    }));

export const unmarshalDataPlaneEventDetailsSchema: z.ZodType<DataPlaneEventDetails> =
  z
    .object({
      event_type: z.enum(DataPlaneClusterEventType).optional(),
      timestamp: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      host_id: z.string().optional(),
      executor_failures: z.number().optional(),
    })
    .transform(d => ({
      eventType: d.event_type,
      timestamp: d.timestamp,
      hostId: d.host_id,
      executorFailures: d.executor_failures,
    }));

export const unmarshalDbfsStorageInfoSchema: z.ZodType<DbfsStorageInfo> = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const unmarshalDeleteClusterResponseSchema: z.ZodType<DeleteClusterResponse> =
  z.object({});

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

export const unmarshalEditClusterResponseSchema: z.ZodType<EditClusterResponse> =
  z.object({});

export const unmarshalEnforcePolicyComplianceForClusterResponseSchema: z.ZodType<EnforcePolicyComplianceForClusterResponse> =
  z
    .object({
      has_changes: z.boolean().optional(),
      changes: z
        .array(
          z.lazy(
            () =>
              unmarshalEnforcePolicyComplianceForClusterResponse_ClusterSettingsChangeSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      hasChanges: d.has_changes,
      changes: d.changes,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalEnforcePolicyComplianceForClusterResponse_ClusterSettingsChangeSchema: z.ZodType<EnforcePolicyComplianceForClusterResponse_ClusterSettingsChange> =
  z
    .object({
      field: z.string().optional(),
      previous_value: z.string().optional(),
      new_value: z.string().optional(),
    })
    .transform(d => ({
      field: d.field,
      previousValue: d.previous_value,
      newValue: d.new_value,
    }));

export const unmarshalEventDetailsSchema: z.ZodType<EventDetails> = z
  .object({
    current_num_workers: z.number().optional(),
    target_num_workers: z.number().optional(),
    previous_attributes: z
      .lazy(() => unmarshalClusterAttributesSchema)
      .optional(),
    attributes: z.lazy(() => unmarshalClusterAttributesSchema).optional(),
    previous_cluster_size: z.lazy(() => unmarshalClusterSizeSchema).optional(),
    cluster_size: z.lazy(() => unmarshalClusterSizeSchema).optional(),
    cause: z.enum(ResizeCause_ResizeCause).optional(),
    reason: z.lazy(() => unmarshalTerminationReasonSchema).optional(),
    user: z.string().optional(),
    previous_disk_size: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    disk_size: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    free_space: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    instance_id: z.string().optional(),
    did_not_expand_reason: z.string().optional(),
    driver_state_message: z.string().optional(),
    job_run_name: z.string().optional(),
    init_scripts: z
      .lazy(() => unmarshalInitScriptEventDetailsSchema)
      .optional(),
    enable_termination_for_node_blocklisted: z.boolean().optional(),
    current_num_vcpus: z.number().optional(),
    target_num_vcpus: z.number().optional(),
  })
  .transform(d => ({
    currentNumWorkers: d.current_num_workers,
    targetNumWorkers: d.target_num_workers,
    previousAttributes: d.previous_attributes,
    attributes: d.attributes,
    previousClusterSize: d.previous_cluster_size,
    clusterSize: d.cluster_size,
    cause: d.cause,
    reason: d.reason,
    user: d.user,
    previousDiskSize: d.previous_disk_size,
    diskSize: d.disk_size,
    freeSpace: d.free_space,
    instanceId: d.instance_id,
    didNotExpandReason: d.did_not_expand_reason,
    driverStateMessage: d.driver_state_message,
    jobRunName: d.job_run_name,
    initScripts: d.init_scripts,
    enableTerminationForNodeBlocklisted:
      d.enable_termination_for_node_blocklisted,
    currentNumVcpus: d.current_num_vcpus,
    targetNumVcpus: d.target_num_vcpus,
  }));

export const unmarshalGcpAttributesSchema: z.ZodType<GcpAttributes> = z
  .object({
    use_preemptible_executors: z.boolean().optional(),
    google_service_account: z.string().optional(),
    boot_disk_size: z.number().optional(),
    availability: z.enum(GcpAvailability).optional(),
    zone_id: z.string().optional(),
    local_ssd_count: z.number().optional(),
    first_on_demand: z.number().optional(),
    confidential_compute_type: z.enum(ConfidentialComputeType).optional(),
  })
  .transform(d => ({
    usePreemptibleExecutors: d.use_preemptible_executors,
    googleServiceAccount: d.google_service_account,
    bootDiskSize: d.boot_disk_size,
    availability: d.availability,
    zoneId: d.zone_id,
    localSsdCount: d.local_ssd_count,
    firstOnDemand: d.first_on_demand,
    confidentialComputeType: d.confidential_compute_type,
  }));

export const unmarshalGcsStorageInfoSchema: z.ZodType<GcsStorageInfo> = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const unmarshalGetEventsResponseSchema: z.ZodType<GetEventsResponse> = z
  .object({
    events: z.array(z.lazy(() => unmarshalClusterEventSchema)).optional(),
    next_page: z.lazy(() => unmarshalListEventsRequestSchema).optional(),
    total_count: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    next_page_token: z.string().optional(),
    prev_page_token: z.string().optional(),
  })
  .transform(d => ({
    events: d.events,
    nextPage: d.next_page,
    totalCount: d.total_count,
    nextPageToken: d.next_page_token,
    prevPageToken: d.prev_page_token,
  }));

export const unmarshalGetPolicyComplianceForClusterResponseSchema: z.ZodType<GetPolicyComplianceForClusterResponse> =
  z
    .object({
      is_compliant: z.boolean().optional(),
      violations: z.record(z.string(), z.string()).optional(),
    })
    .transform(d => ({
      isCompliant: d.is_compliant,
      violations: d.violations,
    }));

export const unmarshalGetSparkVersionsResponseSchema: z.ZodType<GetSparkVersionsResponse> =
  z
    .object({
      versions: z.array(z.lazy(() => unmarshalSparkVersionSchema)).optional(),
    })
    .transform(d => ({
      versions: d.versions,
    }));

export const unmarshalInitScriptEventDetailsSchema: z.ZodType<InitScriptEventDetails> =
  z
    .object({
      reported_for_node: z.string().optional(),
      global: z
        .array(
          z.lazy(
            () =>
              unmarshalInitScriptEventDetails_InitScriptInfoAndExecutionDetailsSchema
          )
        )
        .optional(),
      cluster: z
        .array(
          z.lazy(
            () =>
              unmarshalInitScriptEventDetails_InitScriptInfoAndExecutionDetailsSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      reportedForNode: d.reported_for_node,
      global: d.global,
      cluster: d.cluster,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalInitScriptEventDetails_InitScriptInfoAndExecutionDetailsSchema: z.ZodType<InitScriptEventDetails_InitScriptInfoAndExecutionDetails> =
  z
    .object({
      dbfs: z.lazy(() => unmarshalDbfsStorageInfoSchema).optional(),
      s3: z.lazy(() => unmarshalS3StorageInfoSchema).optional(),
      file: z.lazy(() => unmarshalLocalFileInfoSchema).optional(),
      gcs: z.lazy(() => unmarshalGcsStorageInfoSchema).optional(),
      abfss: z.lazy(() => unmarshalAdlsgen2InfoSchema).optional(),
      workspace: z.lazy(() => unmarshalWorkspaceStorageInfoSchema).optional(),
      volumes: z.lazy(() => unmarshalVolumesStorageInfoSchema).optional(),
      status: z
        .enum(InitScriptExecutionDetails_InitScriptExecutionStatus)
        .optional(),
      execution_duration_seconds: z.number().optional(),
      error_message: z.string().optional(),
      stderr: z.string().optional(),
    })
    .transform(d => ({
      storageInfo:
        d.dbfs !== undefined
          ? {$case: 'dbfs' as const, dbfs: d.dbfs}
          : d.s3 !== undefined
            ? {$case: 's3' as const, s3: d.s3}
            : d.file !== undefined
              ? {$case: 'file' as const, file: d.file}
              : d.gcs !== undefined
                ? {$case: 'gcs' as const, gcs: d.gcs}
                : d.abfss !== undefined
                  ? {$case: 'abfss' as const, abfss: d.abfss}
                  : d.workspace !== undefined
                    ? {$case: 'workspace' as const, workspace: d.workspace}
                    : d.volumes !== undefined
                      ? {$case: 'volumes' as const, volumes: d.volumes}
                      : undefined,
      status: d.status,
      executionDurationSeconds: d.execution_duration_seconds,
      errorMessage: d.error_message,
      stderr: d.stderr,
    }));

export const unmarshalInitScriptInfoSchema: z.ZodType<InitScriptInfo> = z
  .object({
    dbfs: z.lazy(() => unmarshalDbfsStorageInfoSchema).optional(),
    s3: z.lazy(() => unmarshalS3StorageInfoSchema).optional(),
    file: z.lazy(() => unmarshalLocalFileInfoSchema).optional(),
    gcs: z.lazy(() => unmarshalGcsStorageInfoSchema).optional(),
    abfss: z.lazy(() => unmarshalAdlsgen2InfoSchema).optional(),
    workspace: z.lazy(() => unmarshalWorkspaceStorageInfoSchema).optional(),
    volumes: z.lazy(() => unmarshalVolumesStorageInfoSchema).optional(),
  })
  .transform(d => ({
    storageInfo:
      d.dbfs !== undefined
        ? {$case: 'dbfs' as const, dbfs: d.dbfs}
        : d.s3 !== undefined
          ? {$case: 's3' as const, s3: d.s3}
          : d.file !== undefined
            ? {$case: 'file' as const, file: d.file}
            : d.gcs !== undefined
              ? {$case: 'gcs' as const, gcs: d.gcs}
              : d.abfss !== undefined
                ? {$case: 'abfss' as const, abfss: d.abfss}
                : d.workspace !== undefined
                  ? {$case: 'workspace' as const, workspace: d.workspace}
                  : d.volumes !== undefined
                    ? {$case: 'volumes' as const, volumes: d.volumes}
                    : undefined,
  }));

export const unmarshalListAvailableZonesResponseSchema: z.ZodType<ListAvailableZonesResponse> =
  z
    .object({
      zones: z.array(z.string()).optional(),
      default_zone: z.string().optional(),
    })
    .transform(d => ({
      zones: d.zones,
      defaultZone: d.default_zone,
    }));

export const unmarshalListClusterComplianceForPolicyResponseSchema: z.ZodType<ListClusterComplianceForPolicyResponse> =
  z
    .object({
      clusters: z
        .array(z.lazy(() => unmarshalClusterComplianceSchema))
        .optional(),
      next_page_token: z.string().optional(),
      prev_page_token: z.string().optional(),
    })
    .transform(d => ({
      clusters: d.clusters,
      nextPageToken: d.next_page_token,
      prevPageToken: d.prev_page_token,
    }));

export const unmarshalListClustersResponseSchema: z.ZodType<ListClustersResponse> =
  z
    .object({
      clusters: z.array(z.lazy(() => unmarshalClusterInfoSchema)).optional(),
      next_page_token: z.string().optional(),
      prev_page_token: z.string().optional(),
    })
    .transform(d => ({
      clusters: d.clusters,
      nextPageToken: d.next_page_token,
      prevPageToken: d.prev_page_token,
    }));

export const unmarshalListEventsRequestSchema: z.ZodType<ListEventsRequest> = z
  .object({
    cluster_id: z.string().optional(),
    start_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    end_time: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    order: z.enum(GetEventsOrder).optional(),
    event_types: z.array(z.enum(ClusterEventType_ClusterEventType)).optional(),
    offset: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    limit: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    page_token: z.string().optional(),
    page_size: z.number().optional(),
  })
  .transform(d => ({
    clusterId: d.cluster_id,
    startTime: d.start_time,
    endTime: d.end_time,
    order: d.order,
    eventTypes: d.event_types,
    offset: d.offset,
    limit: d.limit,
    pageToken: d.page_token,
    pageSize: d.page_size,
  }));

export const unmarshalListNodeTypesResponseSchema: z.ZodType<ListNodeTypesResponse> =
  z
    .object({
      node_types: z.array(z.lazy(() => unmarshalNodeTypeSchema)).optional(),
    })
    .transform(d => ({
      nodeTypes: d.node_types,
    }));

export const unmarshalLocalFileInfoSchema: z.ZodType<LocalFileInfo> = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const unmarshalLogAnalyticsInfoSchema: z.ZodType<LogAnalyticsInfo> = z
  .object({
    log_analytics_workspace_id: z.string().optional(),
    log_analytics_primary_key: z.string().optional(),
  })
  .transform(d => ({
    logAnalyticsWorkspaceId: d.log_analytics_workspace_id,
    logAnalyticsPrimaryKey: d.log_analytics_primary_key,
  }));

export const unmarshalLogSyncStatusSchema: z.ZodType<LogSyncStatus> = z
  .object({
    last_attempted: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    last_exception: z.string().optional(),
  })
  .transform(d => ({
    lastAttempted: d.last_attempted,
    lastException: d.last_exception,
  }));

export const unmarshalNodeInstanceTypeSchema: z.ZodType<NodeInstanceType> = z
  .object({
    instance_type_id: z.string().optional(),
    local_disks: z.number().optional(),
    local_disk_size_gb: z.number().optional(),
    local_nvme_disk_size_gb: z.number().optional(),
    local_nvme_disks: z.number().optional(),
  })
  .transform(d => ({
    instanceTypeId: d.instance_type_id,
    localDisks: d.local_disks,
    localDiskSizeGb: d.local_disk_size_gb,
    localNvmeDiskSizeGb: d.local_nvme_disk_size_gb,
    localNvmeDisks: d.local_nvme_disks,
  }));

export const unmarshalNodeTypeSchema: z.ZodType<NodeType> = z
  .object({
    node_type_id: z.string().optional(),
    memory_mb: z.number().optional(),
    num_cores: z.number().optional(),
    description: z.string().optional(),
    instance_type_id: z.string().optional(),
    is_deprecated: z.boolean().optional(),
    category: z.string().optional(),
    support_ebs_volumes: z.boolean().optional(),
    support_cluster_tags: z.boolean().optional(),
    num_gpus: z.number().optional(),
    node_instance_type: z
      .lazy(() => unmarshalNodeInstanceTypeSchema)
      .optional(),
    is_hidden: z.boolean().optional(),
    support_port_forwarding: z.boolean().optional(),
    display_order: z.number().optional(),
    is_io_cache_enabled: z.boolean().optional(),
    node_info: z.lazy(() => unmarshalCloudProviderNodeInfoSchema).optional(),
    photon_worker_capable: z.boolean().optional(),
    photon_driver_capable: z.boolean().optional(),
    is_encrypted_in_transit: z.boolean().optional(),
    is_graviton: z.boolean().optional(),
  })
  .transform(d => ({
    nodeTypeId: d.node_type_id,
    memoryMb: d.memory_mb,
    numCores: d.num_cores,
    description: d.description,
    instanceTypeId: d.instance_type_id,
    isDeprecated: d.is_deprecated,
    category: d.category,
    supportEbsVolumes: d.support_ebs_volumes,
    supportClusterTags: d.support_cluster_tags,
    numGpus: d.num_gpus,
    nodeInstanceType: d.node_instance_type,
    isHidden: d.is_hidden,
    supportPortForwarding: d.support_port_forwarding,
    displayOrder: d.display_order,
    isIoCacheEnabled: d.is_io_cache_enabled,
    nodeInfo: d.node_info,
    photonWorkerCapable: d.photon_worker_capable,
    photonDriverCapable: d.photon_driver_capable,
    isEncryptedInTransit: d.is_encrypted_in_transit,
    isGraviton: d.is_graviton,
  }));

export const unmarshalNodeTypeFlexibilitySchema: z.ZodType<NodeTypeFlexibility> =
  z
    .object({
      alternate_node_type_ids: z.array(z.string()).optional(),
    })
    .transform(d => ({
      alternateNodeTypeIds: d.alternate_node_type_ids,
    }));

export const unmarshalPermanentDeleteClusterResponseSchema: z.ZodType<PermanentDeleteClusterResponse> =
  z.object({});

export const unmarshalPinClusterResponseSchema: z.ZodType<PinClusterResponse> =
  z.object({});

export const unmarshalResizeClusterResponseSchema: z.ZodType<ResizeClusterResponse> =
  z.object({});

export const unmarshalRestartClusterResponseSchema: z.ZodType<RestartClusterResponse> =
  z.object({});

export const unmarshalS3StorageInfoSchema: z.ZodType<S3StorageInfo> = z
  .object({
    destination: z.string().optional(),
    region: z.string().optional(),
    endpoint: z.string().optional(),
    enable_encryption: z.boolean().optional(),
    encryption_type: z.string().optional(),
    kms_key: z.string().optional(),
    canned_acl: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
    region: d.region,
    endpoint: d.endpoint,
    enableEncryption: d.enable_encryption,
    encryptionType: d.encryption_type,
    kmsKey: d.kms_key,
    cannedAcl: d.canned_acl,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSparkInfo_SparkNodeSchema: z.ZodType<SparkInfo_SparkNode> =
  z
    .object({
      private_ip: z.string().optional(),
      public_dns: z.string().optional(),
      node_id: z.string().optional(),
      instance_id: z.string().optional(),
      start_timestamp: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      node_aws_attributes: z
        .lazy(() => unmarshalSparkInfo_SparkNode_SparkNodeAwsAttributesSchema)
        .optional(),
      host_private_ip: z.string().optional(),
    })
    .transform(d => ({
      privateIp: d.private_ip,
      publicDns: d.public_dns,
      nodeId: d.node_id,
      instanceId: d.instance_id,
      startTimestamp: d.start_timestamp,
      nodeAwsAttributes: d.node_aws_attributes,
      hostPrivateIp: d.host_private_ip,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSparkInfo_SparkNode_SparkNodeAwsAttributesSchema: z.ZodType<SparkInfo_SparkNode_SparkNodeAwsAttributes> =
  z
    .object({
      is_spot: z.boolean().optional(),
    })
    .transform(d => ({
      isSpot: d.is_spot,
    }));

export const unmarshalSparkVersionSchema: z.ZodType<SparkVersion> = z
  .object({
    key: z.string().optional(),
    name: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    name: d.name,
  }));

export const unmarshalStartClusterResponseSchema: z.ZodType<StartClusterResponse> =
  z.object({});

export const unmarshalTerminationReasonSchema: z.ZodType<TerminationReason> = z
  .object({
    code: z.enum(TerminationCode).optional(),
    type: z.enum(TerminationType).optional(),
    parameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    code: d.code,
    type: d.type,
    parameters: d.parameters,
  }));

export const unmarshalUnpinClusterResponseSchema: z.ZodType<UnpinClusterResponse> =
  z.object({});

export const unmarshalUpdateClusterResponseSchema: z.ZodType<UpdateClusterResponse> =
  z.object({});

export const unmarshalVolumesStorageInfoSchema: z.ZodType<VolumesStorageInfo> =
  z
    .object({
      destination: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
    }));

export const unmarshalWorkloadTypeSchema: z.ZodType<WorkloadType> = z
  .object({
    clients: z.lazy(() => unmarshalWorkloadType_ClientsTypesSchema).optional(),
  })
  .transform(d => ({
    clients: d.clients,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalWorkloadType_ClientsTypesSchema: z.ZodType<WorkloadType_ClientsTypes> =
  z
    .object({
      notebooks: z.boolean().optional(),
      jobs: z.boolean().optional(),
    })
    .transform(d => ({
      notebooks: d.notebooks,
      jobs: d.jobs,
    }));

export const unmarshalWorkspaceStorageInfoSchema: z.ZodType<WorkspaceStorageInfo> =
  z
    .object({
      destination: z.string().optional(),
    })
    .transform(d => ({
      destination: d.destination,
    }));

export const marshalAdlsgen2InfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalAutoScaleSchema: z.ZodType = z
  .object({
    minWorkers: z.number().optional(),
    maxWorkers: z.number().optional(),
  })
  .transform(d => ({
    min_workers: d.minWorkers,
    max_workers: d.maxWorkers,
  }));

export const marshalAwsAttributesSchema: z.ZodType = z
  .object({
    firstOnDemand: z.number().optional(),
    availability: z.enum(AwsAvailability).optional(),
    zoneId: z.string().optional(),
    instanceProfileArn: z.string().optional(),
    spotBidPricePercent: z.number().optional(),
    ebsVolumeType: z.enum(EbsVolumeType).optional(),
    ebsVolumeCount: z.number().optional(),
    ebsVolumeSize: z.number().optional(),
    ebsVolumeIops: z.number().optional(),
    ebsVolumeThroughput: z.number().optional(),
  })
  .transform(d => ({
    first_on_demand: d.firstOnDemand,
    availability: d.availability,
    zone_id: d.zoneId,
    instance_profile_arn: d.instanceProfileArn,
    spot_bid_price_percent: d.spotBidPricePercent,
    ebs_volume_type: d.ebsVolumeType,
    ebs_volume_count: d.ebsVolumeCount,
    ebs_volume_size: d.ebsVolumeSize,
    ebs_volume_iops: d.ebsVolumeIops,
    ebs_volume_throughput: d.ebsVolumeThroughput,
  }));

export const marshalAzureAttributesSchema: z.ZodType = z
  .object({
    logAnalyticsInfo: z.lazy(() => marshalLogAnalyticsInfoSchema).optional(),
    firstOnDemand: z.number().optional(),
    availability: z.enum(AzureAvailability).optional(),
    spotBidMaxPrice: z.number().optional(),
  })
  .transform(d => ({
    log_analytics_info: d.logAnalyticsInfo,
    first_on_demand: d.firstOnDemand,
    availability: d.availability,
    spot_bid_max_price: d.spotBidMaxPrice,
  }));

export const marshalChangeClusterOwnerRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    ownerUsername: z.string().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    owner_username: d.ownerUsername,
  }));

export const marshalCloneClusterSchema: z.ZodType = z
  .object({
    sourceClusterId: z.string().optional(),
  })
  .transform(d => ({
    source_cluster_id: d.sourceClusterId,
  }));

export const marshalClusterLogConfSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalDbfsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('s3'),
          s3: z.lazy(() => marshalS3StorageInfoSchema),
        }),
        z.object({
          $case: z.literal('volumes'),
          volumes: z.lazy(() => marshalVolumesStorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
    ...(d.storageInfo?.$case === 's3' && {s3: d.storageInfo.s3}),
    ...(d.storageInfo?.$case === 'volumes' && {volumes: d.storageInfo.volumes}),
  }));

export const marshalCreateClusterRequestSchema: z.ZodType = z
  .object({
    applyPolicyDefaultValues: z.boolean().optional(),
    cloneFrom: z.lazy(() => marshalCloneClusterSchema).optional(),
    size: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('numWorkers'), numWorkers: z.number()}),
        z.object({
          $case: z.literal('autoscale'),
          autoscale: z.lazy(() => marshalAutoScaleSchema),
        }),
      ])
      .optional(),
    clusterName: z.string().optional(),
    sparkVersion: z.string().optional(),
    sparkConf: z.record(z.string(), z.string()).optional(),
    awsAttributes: z.lazy(() => marshalAwsAttributesSchema).optional(),
    azureAttributes: z.lazy(() => marshalAzureAttributesSchema).optional(),
    gcpAttributes: z.lazy(() => marshalGcpAttributesSchema).optional(),
    nodeTypeId: z.string().optional(),
    driverNodeTypeId: z.string().optional(),
    workerNodeTypeFlexibility: z
      .lazy(() => marshalNodeTypeFlexibilitySchema)
      .optional(),
    driverNodeTypeFlexibility: z
      .lazy(() => marshalNodeTypeFlexibilitySchema)
      .optional(),
    sshPublicKeys: z.array(z.string()).optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    clusterLogConf: z.lazy(() => marshalClusterLogConfSchema).optional(),
    sparkEnvVars: z.record(z.string(), z.string()).optional(),
    autoterminationMinutes: z.number().optional(),
    enableElasticDisk: z.boolean().optional(),
    initScripts: z.array(z.lazy(() => marshalInitScriptInfoSchema)).optional(),
    dockerImage: z.lazy(() => marshalDockerImageSchema).optional(),
    instancePoolId: z.string().optional(),
    singleUserName: z.string().optional(),
    policyId: z.string().optional(),
    enableLocalDiskEncryption: z.boolean().optional(),
    driverInstancePoolId: z.string().optional(),
    workloadType: z.lazy(() => marshalWorkloadTypeSchema).optional(),
    dataSecurityMode: z.enum(DataSecurityMode).optional(),
    runtimeEngine: z.enum(RuntimeEngine).optional(),
    kind: z.enum(ComputeKind).optional(),
    useMlRuntime: z.boolean().optional(),
    isSingleNode: z.boolean().optional(),
    remoteDiskThroughput: z.number().optional(),
    totalInitialRemoteDiskSize: z.number().optional(),
  })
  .transform(d => ({
    apply_policy_default_values: d.applyPolicyDefaultValues,
    clone_from: d.cloneFrom,
    ...(d.size?.$case === 'numWorkers' && {num_workers: d.size.numWorkers}),
    ...(d.size?.$case === 'autoscale' && {autoscale: d.size.autoscale}),
    cluster_name: d.clusterName,
    spark_version: d.sparkVersion,
    spark_conf: d.sparkConf,
    aws_attributes: d.awsAttributes,
    azure_attributes: d.azureAttributes,
    gcp_attributes: d.gcpAttributes,
    node_type_id: d.nodeTypeId,
    driver_node_type_id: d.driverNodeTypeId,
    worker_node_type_flexibility: d.workerNodeTypeFlexibility,
    driver_node_type_flexibility: d.driverNodeTypeFlexibility,
    ssh_public_keys: d.sshPublicKeys,
    custom_tags: d.customTags,
    cluster_log_conf: d.clusterLogConf,
    spark_env_vars: d.sparkEnvVars,
    autotermination_minutes: d.autoterminationMinutes,
    enable_elastic_disk: d.enableElasticDisk,
    init_scripts: d.initScripts,
    docker_image: d.dockerImage,
    instance_pool_id: d.instancePoolId,
    single_user_name: d.singleUserName,
    policy_id: d.policyId,
    enable_local_disk_encryption: d.enableLocalDiskEncryption,
    driver_instance_pool_id: d.driverInstancePoolId,
    workload_type: d.workloadType,
    data_security_mode: d.dataSecurityMode,
    runtime_engine: d.runtimeEngine,
    kind: d.kind,
    use_ml_runtime: d.useMlRuntime,
    is_single_node: d.isSingleNode,
    remote_disk_throughput: d.remoteDiskThroughput,
    total_initial_remote_disk_size: d.totalInitialRemoteDiskSize,
  }));

export const marshalDbfsStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalDeleteClusterRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
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

export const marshalEditClusterRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    applyPolicyDefaultValues: z.boolean().optional(),
    size: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('numWorkers'), numWorkers: z.number()}),
        z.object({
          $case: z.literal('autoscale'),
          autoscale: z.lazy(() => marshalAutoScaleSchema),
        }),
      ])
      .optional(),
    clusterName: z.string().optional(),
    sparkVersion: z.string().optional(),
    sparkConf: z.record(z.string(), z.string()).optional(),
    awsAttributes: z.lazy(() => marshalAwsAttributesSchema).optional(),
    azureAttributes: z.lazy(() => marshalAzureAttributesSchema).optional(),
    gcpAttributes: z.lazy(() => marshalGcpAttributesSchema).optional(),
    nodeTypeId: z.string().optional(),
    driverNodeTypeId: z.string().optional(),
    workerNodeTypeFlexibility: z
      .lazy(() => marshalNodeTypeFlexibilitySchema)
      .optional(),
    driverNodeTypeFlexibility: z
      .lazy(() => marshalNodeTypeFlexibilitySchema)
      .optional(),
    sshPublicKeys: z.array(z.string()).optional(),
    customTags: z.record(z.string(), z.string()).optional(),
    clusterLogConf: z.lazy(() => marshalClusterLogConfSchema).optional(),
    sparkEnvVars: z.record(z.string(), z.string()).optional(),
    autoterminationMinutes: z.number().optional(),
    enableElasticDisk: z.boolean().optional(),
    initScripts: z.array(z.lazy(() => marshalInitScriptInfoSchema)).optional(),
    dockerImage: z.lazy(() => marshalDockerImageSchema).optional(),
    instancePoolId: z.string().optional(),
    singleUserName: z.string().optional(),
    policyId: z.string().optional(),
    enableLocalDiskEncryption: z.boolean().optional(),
    driverInstancePoolId: z.string().optional(),
    workloadType: z.lazy(() => marshalWorkloadTypeSchema).optional(),
    dataSecurityMode: z.enum(DataSecurityMode).optional(),
    runtimeEngine: z.enum(RuntimeEngine).optional(),
    kind: z.enum(ComputeKind).optional(),
    useMlRuntime: z.boolean().optional(),
    isSingleNode: z.boolean().optional(),
    remoteDiskThroughput: z.number().optional(),
    totalInitialRemoteDiskSize: z.number().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    apply_policy_default_values: d.applyPolicyDefaultValues,
    ...(d.size?.$case === 'numWorkers' && {num_workers: d.size.numWorkers}),
    ...(d.size?.$case === 'autoscale' && {autoscale: d.size.autoscale}),
    cluster_name: d.clusterName,
    spark_version: d.sparkVersion,
    spark_conf: d.sparkConf,
    aws_attributes: d.awsAttributes,
    azure_attributes: d.azureAttributes,
    gcp_attributes: d.gcpAttributes,
    node_type_id: d.nodeTypeId,
    driver_node_type_id: d.driverNodeTypeId,
    worker_node_type_flexibility: d.workerNodeTypeFlexibility,
    driver_node_type_flexibility: d.driverNodeTypeFlexibility,
    ssh_public_keys: d.sshPublicKeys,
    custom_tags: d.customTags,
    cluster_log_conf: d.clusterLogConf,
    spark_env_vars: d.sparkEnvVars,
    autotermination_minutes: d.autoterminationMinutes,
    enable_elastic_disk: d.enableElasticDisk,
    init_scripts: d.initScripts,
    docker_image: d.dockerImage,
    instance_pool_id: d.instancePoolId,
    single_user_name: d.singleUserName,
    policy_id: d.policyId,
    enable_local_disk_encryption: d.enableLocalDiskEncryption,
    driver_instance_pool_id: d.driverInstancePoolId,
    workload_type: d.workloadType,
    data_security_mode: d.dataSecurityMode,
    runtime_engine: d.runtimeEngine,
    kind: d.kind,
    use_ml_runtime: d.useMlRuntime,
    is_single_node: d.isSingleNode,
    remote_disk_throughput: d.remoteDiskThroughput,
    total_initial_remote_disk_size: d.totalInitialRemoteDiskSize,
  }));

export const marshalEnforcePolicyComplianceForClusterRequestSchema: z.ZodType =
  z
    .object({
      clusterId: z.string().optional(),
      validateOnly: z.boolean().optional(),
    })
    .transform(d => ({
      cluster_id: d.clusterId,
      validate_only: d.validateOnly,
    }));

export const marshalGcpAttributesSchema: z.ZodType = z
  .object({
    usePreemptibleExecutors: z.boolean().optional(),
    googleServiceAccount: z.string().optional(),
    bootDiskSize: z.number().optional(),
    availability: z.enum(GcpAvailability).optional(),
    zoneId: z.string().optional(),
    localSsdCount: z.number().optional(),
    firstOnDemand: z.number().optional(),
    confidentialComputeType: z.enum(ConfidentialComputeType).optional(),
  })
  .transform(d => ({
    use_preemptible_executors: d.usePreemptibleExecutors,
    google_service_account: d.googleServiceAccount,
    boot_disk_size: d.bootDiskSize,
    availability: d.availability,
    zone_id: d.zoneId,
    local_ssd_count: d.localSsdCount,
    first_on_demand: d.firstOnDemand,
    confidential_compute_type: d.confidentialComputeType,
  }));

export const marshalGcsStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalInitScriptInfoSchema: z.ZodType = z
  .object({
    storageInfo: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dbfs'),
          dbfs: z.lazy(() => marshalDbfsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('s3'),
          s3: z.lazy(() => marshalS3StorageInfoSchema),
        }),
        z.object({
          $case: z.literal('file'),
          file: z.lazy(() => marshalLocalFileInfoSchema),
        }),
        z.object({
          $case: z.literal('gcs'),
          gcs: z.lazy(() => marshalGcsStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('abfss'),
          abfss: z.lazy(() => marshalAdlsgen2InfoSchema),
        }),
        z.object({
          $case: z.literal('workspace'),
          workspace: z.lazy(() => marshalWorkspaceStorageInfoSchema),
        }),
        z.object({
          $case: z.literal('volumes'),
          volumes: z.lazy(() => marshalVolumesStorageInfoSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.storageInfo?.$case === 'dbfs' && {dbfs: d.storageInfo.dbfs}),
    ...(d.storageInfo?.$case === 's3' && {s3: d.storageInfo.s3}),
    ...(d.storageInfo?.$case === 'file' && {file: d.storageInfo.file}),
    ...(d.storageInfo?.$case === 'gcs' && {gcs: d.storageInfo.gcs}),
    ...(d.storageInfo?.$case === 'abfss' && {abfss: d.storageInfo.abfss}),
    ...(d.storageInfo?.$case === 'workspace' && {
      workspace: d.storageInfo.workspace,
    }),
    ...(d.storageInfo?.$case === 'volumes' && {volumes: d.storageInfo.volumes}),
  }));

export const marshalListEventsRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    startTime: z.bigint().optional(),
    endTime: z.bigint().optional(),
    order: z.enum(GetEventsOrder).optional(),
    eventTypes: z.array(z.enum(ClusterEventType_ClusterEventType)).optional(),
    offset: z.bigint().optional(),
    limit: z.bigint().optional(),
    pageToken: z.string().optional(),
    pageSize: z.number().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    start_time: d.startTime,
    end_time: d.endTime,
    order: d.order,
    event_types: d.eventTypes,
    offset: d.offset,
    limit: d.limit,
    page_token: d.pageToken,
    page_size: d.pageSize,
  }));

export const marshalLocalFileInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalLogAnalyticsInfoSchema: z.ZodType = z
  .object({
    logAnalyticsWorkspaceId: z.string().optional(),
    logAnalyticsPrimaryKey: z.string().optional(),
  })
  .transform(d => ({
    log_analytics_workspace_id: d.logAnalyticsWorkspaceId,
    log_analytics_primary_key: d.logAnalyticsPrimaryKey,
  }));

export const marshalNodeTypeFlexibilitySchema: z.ZodType = z
  .object({
    alternateNodeTypeIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    alternate_node_type_ids: d.alternateNodeTypeIds,
  }));

export const marshalPermanentDeleteClusterRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
  }));

export const marshalPinClusterRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
  }));

export const marshalResizeClusterRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    size: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('numWorkers'), numWorkers: z.number()}),
        z.object({
          $case: z.literal('autoscale'),
          autoscale: z.lazy(() => marshalAutoScaleSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    ...(d.size?.$case === 'numWorkers' && {num_workers: d.size.numWorkers}),
    ...(d.size?.$case === 'autoscale' && {autoscale: d.size.autoscale}),
  }));

export const marshalRestartClusterRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    restartUser: z.string().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    restart_user: d.restartUser,
  }));

export const marshalS3StorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
    region: z.string().optional(),
    endpoint: z.string().optional(),
    enableEncryption: z.boolean().optional(),
    encryptionType: z.string().optional(),
    kmsKey: z.string().optional(),
    cannedAcl: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
    region: d.region,
    endpoint: d.endpoint,
    enable_encryption: d.enableEncryption,
    encryption_type: d.encryptionType,
    kms_key: d.kmsKey,
    canned_acl: d.cannedAcl,
  }));

export const marshalStartClusterRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
  }));

export const marshalUnpinClusterRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
  }));

export const marshalUpdateClusterRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    cluster: z
      .lazy(() => marshalUpdateClusterRequest_UpdateClusterResourceSchema)
      .optional(),
    updateMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    cluster: d.cluster,
    update_mask: d.updateMask,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateClusterRequest_UpdateClusterResourceSchema: z.ZodType =
  z
    .object({
      size: z
        .discriminatedUnion('$case', [
          z.object({$case: z.literal('numWorkers'), numWorkers: z.number()}),
          z.object({
            $case: z.literal('autoscale'),
            autoscale: z.lazy(() => marshalAutoScaleSchema),
          }),
        ])
        .optional(),
      clusterName: z.string().optional(),
      sparkVersion: z.string().optional(),
      sparkConf: z.record(z.string(), z.string()).optional(),
      awsAttributes: z.lazy(() => marshalAwsAttributesSchema).optional(),
      azureAttributes: z.lazy(() => marshalAzureAttributesSchema).optional(),
      gcpAttributes: z.lazy(() => marshalGcpAttributesSchema).optional(),
      nodeTypeId: z.string().optional(),
      driverNodeTypeId: z.string().optional(),
      workerNodeTypeFlexibility: z
        .lazy(() => marshalNodeTypeFlexibilitySchema)
        .optional(),
      driverNodeTypeFlexibility: z
        .lazy(() => marshalNodeTypeFlexibilitySchema)
        .optional(),
      sshPublicKeys: z.array(z.string()).optional(),
      customTags: z.record(z.string(), z.string()).optional(),
      clusterLogConf: z.lazy(() => marshalClusterLogConfSchema).optional(),
      sparkEnvVars: z.record(z.string(), z.string()).optional(),
      autoterminationMinutes: z.number().optional(),
      enableElasticDisk: z.boolean().optional(),
      initScripts: z
        .array(z.lazy(() => marshalInitScriptInfoSchema))
        .optional(),
      dockerImage: z.lazy(() => marshalDockerImageSchema).optional(),
      instancePoolId: z.string().optional(),
      singleUserName: z.string().optional(),
      policyId: z.string().optional(),
      enableLocalDiskEncryption: z.boolean().optional(),
      driverInstancePoolId: z.string().optional(),
      workloadType: z.lazy(() => marshalWorkloadTypeSchema).optional(),
      dataSecurityMode: z.enum(DataSecurityMode).optional(),
      runtimeEngine: z.enum(RuntimeEngine).optional(),
      kind: z.enum(ComputeKind).optional(),
      useMlRuntime: z.boolean().optional(),
      isSingleNode: z.boolean().optional(),
      remoteDiskThroughput: z.number().optional(),
      totalInitialRemoteDiskSize: z.number().optional(),
    })
    .transform(d => ({
      ...(d.size?.$case === 'numWorkers' && {num_workers: d.size.numWorkers}),
      ...(d.size?.$case === 'autoscale' && {autoscale: d.size.autoscale}),
      cluster_name: d.clusterName,
      spark_version: d.sparkVersion,
      spark_conf: d.sparkConf,
      aws_attributes: d.awsAttributes,
      azure_attributes: d.azureAttributes,
      gcp_attributes: d.gcpAttributes,
      node_type_id: d.nodeTypeId,
      driver_node_type_id: d.driverNodeTypeId,
      worker_node_type_flexibility: d.workerNodeTypeFlexibility,
      driver_node_type_flexibility: d.driverNodeTypeFlexibility,
      ssh_public_keys: d.sshPublicKeys,
      custom_tags: d.customTags,
      cluster_log_conf: d.clusterLogConf,
      spark_env_vars: d.sparkEnvVars,
      autotermination_minutes: d.autoterminationMinutes,
      enable_elastic_disk: d.enableElasticDisk,
      init_scripts: d.initScripts,
      docker_image: d.dockerImage,
      instance_pool_id: d.instancePoolId,
      single_user_name: d.singleUserName,
      policy_id: d.policyId,
      enable_local_disk_encryption: d.enableLocalDiskEncryption,
      driver_instance_pool_id: d.driverInstancePoolId,
      workload_type: d.workloadType,
      data_security_mode: d.dataSecurityMode,
      runtime_engine: d.runtimeEngine,
      kind: d.kind,
      use_ml_runtime: d.useMlRuntime,
      is_single_node: d.isSingleNode,
      remote_disk_throughput: d.remoteDiskThroughput,
      total_initial_remote_disk_size: d.totalInitialRemoteDiskSize,
    }));

export const marshalVolumesStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

export const marshalWorkloadTypeSchema: z.ZodType = z
  .object({
    clients: z.lazy(() => marshalWorkloadType_ClientsTypesSchema).optional(),
  })
  .transform(d => ({
    clients: d.clients,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalWorkloadType_ClientsTypesSchema: z.ZodType = z
  .object({
    notebooks: z.boolean().optional(),
    jobs: z.boolean().optional(),
  })
  .transform(d => ({
    notebooks: d.notebooks,
    jobs: d.jobs,
  }));

export const marshalWorkspaceStorageInfoSchema: z.ZodType = z
  .object({
    destination: z.string().optional(),
  })
  .transform(d => ({
    destination: d.destination,
  }));

const autoScaleFieldMaskSchema: FieldMaskSchema = {
  maxWorkers: {wire: 'max_workers'},
  minWorkers: {wire: 'min_workers'},
};

const awsAttributesFieldMaskSchema: FieldMaskSchema = {
  availability: {wire: 'availability'},
  ebsVolumeCount: {wire: 'ebs_volume_count'},
  ebsVolumeIops: {wire: 'ebs_volume_iops'},
  ebsVolumeSize: {wire: 'ebs_volume_size'},
  ebsVolumeThroughput: {wire: 'ebs_volume_throughput'},
  ebsVolumeType: {wire: 'ebs_volume_type'},
  firstOnDemand: {wire: 'first_on_demand'},
  instanceProfileArn: {wire: 'instance_profile_arn'},
  spotBidPricePercent: {wire: 'spot_bid_price_percent'},
  zoneId: {wire: 'zone_id'},
};

const azureAttributesFieldMaskSchema: FieldMaskSchema = {
  availability: {wire: 'availability'},
  firstOnDemand: {wire: 'first_on_demand'},
  logAnalyticsInfo: {
    wire: 'log_analytics_info',
    children: () => logAnalyticsInfoFieldMaskSchema,
  },
  spotBidMaxPrice: {wire: 'spot_bid_max_price'},
};

const clusterLogConfFieldMaskSchema: FieldMaskSchema = {
  dbfs: {wire: 'dbfs', children: () => dbfsStorageInfoFieldMaskSchema},
  s3: {wire: 's3', children: () => s3StorageInfoFieldMaskSchema},
  volumes: {wire: 'volumes', children: () => volumesStorageInfoFieldMaskSchema},
};

const dbfsStorageInfoFieldMaskSchema: FieldMaskSchema = {
  destination: {wire: 'destination'},
};

const dockerBasicAuthFieldMaskSchema: FieldMaskSchema = {
  password: {wire: 'password'},
  username: {wire: 'username'},
};

const dockerImageFieldMaskSchema: FieldMaskSchema = {
  basicAuth: {
    wire: 'basic_auth',
    children: () => dockerBasicAuthFieldMaskSchema,
  },
  url: {wire: 'url'},
};

const gcpAttributesFieldMaskSchema: FieldMaskSchema = {
  availability: {wire: 'availability'},
  bootDiskSize: {wire: 'boot_disk_size'},
  confidentialComputeType: {wire: 'confidential_compute_type'},
  firstOnDemand: {wire: 'first_on_demand'},
  googleServiceAccount: {wire: 'google_service_account'},
  localSsdCount: {wire: 'local_ssd_count'},
  usePreemptibleExecutors: {wire: 'use_preemptible_executors'},
  zoneId: {wire: 'zone_id'},
};

const logAnalyticsInfoFieldMaskSchema: FieldMaskSchema = {
  logAnalyticsPrimaryKey: {wire: 'log_analytics_primary_key'},
  logAnalyticsWorkspaceId: {wire: 'log_analytics_workspace_id'},
};

const nodeTypeFlexibilityFieldMaskSchema: FieldMaskSchema = {
  alternateNodeTypeIds: {wire: 'alternate_node_type_ids'},
};

const s3StorageInfoFieldMaskSchema: FieldMaskSchema = {
  cannedAcl: {wire: 'canned_acl'},
  destination: {wire: 'destination'},
  enableEncryption: {wire: 'enable_encryption'},
  encryptionType: {wire: 'encryption_type'},
  endpoint: {wire: 'endpoint'},
  kmsKey: {wire: 'kms_key'},
  region: {wire: 'region'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const updateClusterRequest_UpdateClusterResourceFieldMaskSchema: FieldMaskSchema =
  {
    autoscale: {wire: 'autoscale', children: () => autoScaleFieldMaskSchema},
    autoterminationMinutes: {wire: 'autotermination_minutes'},
    awsAttributes: {
      wire: 'aws_attributes',
      children: () => awsAttributesFieldMaskSchema,
    },
    azureAttributes: {
      wire: 'azure_attributes',
      children: () => azureAttributesFieldMaskSchema,
    },
    clusterLogConf: {
      wire: 'cluster_log_conf',
      children: () => clusterLogConfFieldMaskSchema,
    },
    clusterName: {wire: 'cluster_name'},
    customTags: {wire: 'custom_tags'},
    dataSecurityMode: {wire: 'data_security_mode'},
    dockerImage: {
      wire: 'docker_image',
      children: () => dockerImageFieldMaskSchema,
    },
    driverInstancePoolId: {wire: 'driver_instance_pool_id'},
    driverNodeTypeFlexibility: {
      wire: 'driver_node_type_flexibility',
      children: () => nodeTypeFlexibilityFieldMaskSchema,
    },
    driverNodeTypeId: {wire: 'driver_node_type_id'},
    enableElasticDisk: {wire: 'enable_elastic_disk'},
    enableLocalDiskEncryption: {wire: 'enable_local_disk_encryption'},
    gcpAttributes: {
      wire: 'gcp_attributes',
      children: () => gcpAttributesFieldMaskSchema,
    },
    initScripts: {wire: 'init_scripts'},
    instancePoolId: {wire: 'instance_pool_id'},
    isSingleNode: {wire: 'is_single_node'},
    kind: {wire: 'kind'},
    nodeTypeId: {wire: 'node_type_id'},
    numWorkers: {wire: 'num_workers'},
    policyId: {wire: 'policy_id'},
    remoteDiskThroughput: {wire: 'remote_disk_throughput'},
    runtimeEngine: {wire: 'runtime_engine'},
    singleUserName: {wire: 'single_user_name'},
    sparkConf: {wire: 'spark_conf'},
    sparkEnvVars: {wire: 'spark_env_vars'},
    sparkVersion: {wire: 'spark_version'},
    sshPublicKeys: {wire: 'ssh_public_keys'},
    totalInitialRemoteDiskSize: {wire: 'total_initial_remote_disk_size'},
    useMlRuntime: {wire: 'use_ml_runtime'},
    workerNodeTypeFlexibility: {
      wire: 'worker_node_type_flexibility',
      children: () => nodeTypeFlexibilityFieldMaskSchema,
    },
    workloadType: {
      wire: 'workload_type',
      children: () => workloadTypeFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function updateClusterRequest_UpdateClusterResourceFieldMask(
  ...paths: string[]
): FieldMask<UpdateClusterRequest_UpdateClusterResource> {
  return FieldMask.build<UpdateClusterRequest_UpdateClusterResource>(
    paths,
    updateClusterRequest_UpdateClusterResourceFieldMaskSchema
  );
}

const volumesStorageInfoFieldMaskSchema: FieldMaskSchema = {
  destination: {wire: 'destination'},
};

const workloadTypeFieldMaskSchema: FieldMaskSchema = {
  clients: {
    wire: 'clients',
    children: () => workloadType_ClientsTypesFieldMaskSchema,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const workloadType_ClientsTypesFieldMaskSchema: FieldMaskSchema = {
  jobs: {wire: 'jobs'},
  notebooks: {wire: 'notebooks'},
};
