// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ChannelName = {
  CHANNEL_NAME_UNSPECIFIED: '',
  CHANNEL_NAME_PREVIEW: 'CHANNEL_NAME_PREVIEW',
  CHANNEL_NAME_CURRENT: 'CHANNEL_NAME_CURRENT',
  CHANNEL_NAME_PREVIOUS: 'CHANNEL_NAME_PREVIOUS',
  CHANNEL_NAME_CUSTOM: 'CHANNEL_NAME_CUSTOM',
} as const;
export type ChannelName =
  | (typeof ChannelName)[keyof typeof ChannelName]
  | (string & {});

/** Type of default warehouse override behavior. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DefaultWarehouseOverrideType = {
  /** Unspecified default warehouse override type. */
  DEFAULT_WAREHOUSE_OVERRIDE_TYPE_UNSPECIFIED: '',
  /** The user should remember their last-selected warehouse. */
  LAST_SELECTED: 'LAST_SELECTED',
  /** The user should use a specific warehouse. */
  CUSTOM: 'CUSTOM',
} as const;
export type DefaultWarehouseOverrideType =
  | (typeof DefaultWarehouseOverrideType)[keyof typeof DefaultWarehouseOverrideType]
  | (string & {});

/** Security policy to be used for warehouses */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointSecurityPolicy = {
  /** No passthrough or Table ACLs support */
  NONE: 'NONE',
  /** Support only Table ACLs */
  DATA_ACCESS_CONTROL: 'DATA_ACCESS_CONTROL',
  /** Support only ADLS / IAM passthrough */
  PASSTHROUGH: 'PASSTHROUGH',
} as const;
export type EndpointSecurityPolicy =
  | (typeof EndpointSecurityPolicy)[keyof typeof EndpointSecurityPolicy]
  | (string & {});

/**
 * EndpointSpotInstancePolicy configures whether the endpoint should use spot
 * instances.
 *
 * The breakdown of how the EndpointSpotInstancePolicy converts to per cloud
 * configurations is:
 *
 * +-------+--------------------------------------+--------------------------------+
 * | Cloud |            COST_OPTIMIZED            |     RELIABILITY_OPTIMIZED |
 * +-------+--------------------------------------+--------------------------------+
 * | AWS   | On Demand Driver with Spot Executors | On Demand Driver and
 * Executors | | AZURE | On Demand Driver and Executors       | On Demand Driver
 * and Executors |
 * +-------+--------------------------------------+--------------------------------+
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointSpotInstancePolicy = {
  /**
   * UNSPECIFIED if no value is set by the caller.
   * Consult endpoint docs to learn about the defaults that kick in if
   * UNSPECIFIED.
   *
   * Protobuf enums should start with INVALID/UNSPECIFIED=0
   * (https://github.com/uber/prototool/tree/dev/style#enums), but since proto
   * enum values must be unique within a proto package so protobuf recommends
   * prefixing enum with enum name
   * (https://buf.build/docs/lint-checkers/#enum_value_prefix). We do not want
   * to do that because it makes for unergonomic customer facing JSON api
   * {"spot_instance_policy": "ENDPOINT_SPOT_INSTANCE_POLICY_UNSPECIFIED"}.
   *
   * As a compromise between protobuf rules (i.e., package unique enum values)
   * and JSON friendliness, we prevent UNSPECIFIED collision but hope that the
   * rest of the enums do not collide.
   *
   * This follows Google APIs:
   * https://cloud.google.com/apis/design/design_patterns#enum_default_value.
   */
  POLICY_UNSPECIFIED: '',
  /** COST_OPTIMIZED to prefer spot instance. */
  COST_OPTIMIZED: 'COST_OPTIMIZED',
  /** RELIABILITY_OPTIMIZED to prefer on demand instance. */
  RELIABILITY_OPTIMIZED: 'RELIABILITY_OPTIMIZED',
} as const;
export type EndpointSpotInstancePolicy =
  | (typeof EndpointSpotInstancePolicy)[keyof typeof EndpointSpotInstancePolicy]
  | (string & {});

/**
 * *
 * State of a warehouse.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointState = {
  /** Indicates that the endpoint is in the process of starting */
  STARTING: 'STARTING',
  /** Indicates the starting process is done, and the endpoint is ready to use */
  RUNNING: 'RUNNING',
  /** Indicates the endpoint is in the process of destroying */
  STOPPING: 'STOPPING',
  /** Indicates the endpoint is stopped, but can be started by calling start */
  STOPPED: 'STOPPED',
  /** Indicates the endpoint is in the process of destroying */
  DELETING: 'DELETING',
  /** Indicates an endpoint is deleted, and can not be recovered */
  DELETED: 'DELETED',
} as const;
export type EndpointState =
  | (typeof EndpointState)[keyof typeof EndpointState]
  | (string & {});

/** The status code indicating why the cluster was terminated */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TerminationCode = {
  /** Default when there is no termination code. */
  UNKNOWN: 'UNKNOWN',
  /**
   * A user terminated the cluster directly. Parameters should include a ``username`` field
   * that indicates the specific user who terminated the cluster.
   */
  USER_REQUEST: 'USER_REQUEST',
  /** This cluster was launched by a Job, and terminated when the Job completed. */
  JOB_FINISHED: 'JOB_FINISHED',
  /** This cluster was terminated since it was idle. */
  INACTIVITY: 'INACTIVITY',
  /**
   * The instance that hosted the spark driver was terminated by the cloud provider. In AWS, for
   * example, AWS may retire instances and directly shut them down.
   * Parameters should include an ``aws_instance_state_reason`` field indicating the AWS-provided
   * reason why the instance was terminated.
   */
  CLOUD_PROVIDER_SHUTDOWN: 'CLOUD_PROVIDER_SHUTDOWN',
  /**
   * Databricks may lose connection to services on the driver instance. One such case is when
   * problems arise in cloud networking infrastructure, or when the instance itself becomes
   * unhealthy.
   */
  COMMUNICATION_LOST: 'COMMUNICATION_LOST',
  /**
   * Databricks may hit cloud provider failures when requesting instances to launch clusters.
   * For example, AWS limits the number of running instances and EBS volumes. If you ask Databricks
   * to launch a cluster that requires instances or EBS volumes that exceed your AWS limit, the
   * cluster will fail with this status code.
   * Parameters should include one of ``aws_api_error_code``, ``aws_instance_state_reason``, or
   * ``aws_spot_request_status`` to indicate the AWS-provided reason why Databricks could not
   * request the required instances for the cluster.
   */
  CLOUD_PROVIDER_LAUNCH_FAILURE: 'CLOUD_PROVIDER_LAUNCH_FAILURE',
  /**
   * Databricks cannot load and execute a cluster-scoped init script on one of the cluster's nodes,
   * or the init script terminates with a non-zero exit code or there was a general failure during
   * the loading/executing of init scripts that does not pertain to any specific script.
   */
  INIT_SCRIPT_FAILURE: 'INIT_SCRIPT_FAILURE',
  /**
   * The Spark driver failed to start. Possible reasons may include incompatible libraries and
   * initialization scripts that corrupted the Spark container.
   */
  SPARK_STARTUP_FAILURE: 'SPARK_STARTUP_FAILURE',
  /**
   * Cannot launch the cluster because the user specified an invalid argument.  For example,
   * the use might specify an invalid spark version for the cluster.
   */
  INVALID_ARGUMENT: 'INVALID_ARGUMENT',
  /**
   * While launching this cluster, Databricks failed to complete critical setup steps, terminating
   * the cluster.
   */
  UNEXPECTED_LAUNCH_FAILURE: 'UNEXPECTED_LAUNCH_FAILURE',
  /**
   * Databricks encountered an unexpected error which forced the running cluster to be terminated.
   * Please contact Databricks support for additional details.
   */
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  /**
   * Databricks was not able to access instances in order to start the cluster. This can be a
   * transient networking issue. If the problem persists, this usually indicates a networking
   * environment misconfiguration.
   */
  INSTANCE_UNREACHABLE: 'INSTANCE_UNREACHABLE',
  /**
   * Blocked upsize requests for the workspace according to
   * https://databricks.atlassian.net/wiki/spaces/UN/pages/934088320/Banning+Workspace+Upsize+Runbook
   */
  REQUEST_REJECTED: 'REQUEST_REJECTED',
  /** The cluster was terminated because it was running in a trial workspace that expired. */
  TRIAL_EXPIRED: 'TRIAL_EXPIRED',
  /**
   * The cluster was terminated because no response from the chauffeur could be received. We name
   * this "DRIVER_" instead of "CHAUFFEUR_" since chauffeur is non-external terminology
   */
  DRIVER_UNREACHABLE: 'DRIVER_UNREACHABLE',
  /** Spark error on startup */
  SPARK_ERROR: 'SPARK_ERROR',
  /** Driver unresponsive */
  DRIVER_UNRESPONSIVE: 'DRIVER_UNRESPONSIVE',
  /** Metastore component unhealthy */
  METASTORE_COMPONENT_UNHEALTHY: 'METASTORE_COMPONENT_UNHEALTHY',
  /** DBFS component unhealthy */
  DBFS_COMPONENT_UNHEALTHY: 'DBFS_COMPONENT_UNHEALTHY',
  /** Execution component unhealthy */
  EXECUTION_COMPONENT_UNHEALTHY: 'EXECUTION_COMPONENT_UNHEALTHY',
  /**
   * Databricks may hit the azure resource manager request limit. Which will keep the Azure SDK
   * from issuing any read or write request to Azure resource manager. The request limit is applied
   * to each subscription every hour, thus retry after an hour or changing to a smaller cluster size
   * might help to resolve the issue. Please check the following link for more information:
   * https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-request-limits
   */
  AZURE_RESOURCE_MANAGER_THROTTLING: 'AZURE_RESOURCE_MANAGER_THROTTLING',
  /**
   * Databricks may hit the azure resource provider request limit. Specifically, the API request
   * rate to the specific resource type (Compute, Network, etc..) can't exceed the limit. Retry
   * might help to resolve the issue. Please check the following link for more information:
   * https://docs.microsoft.com/en-us/azure/virtual-machines/troubleshooting/
   * troubleshooting-throttling-errors
   */
  AZURE_RESOURCE_PROVIDER_THROTTLING: 'AZURE_RESOURCE_PROVIDER_THROTTLING',
  /** The cluster was terminated due to an error in the network configuration. */
  NETWORK_CONFIGURATION_FAILURE: 'NETWORK_CONFIGURATION_FAILURE',
  /**
   * Databricks encountered an unexpected error while launching containers on worker nodes for the
   * cluster, terminating the cluster.
   */
  CONTAINER_LAUNCH_FAILURE: 'CONTAINER_LAUNCH_FAILURE',
  /** Instance pool backed cluster specific failure */
  INSTANCE_POOL_CLUSTER_FAILURE: 'INSTANCE_POOL_CLUSTER_FAILURE',
  /** Cluster start successfully completed but skipped some instances which were slow to launch */
  SKIPPED_SLOW_NODES: 'SKIPPED_SLOW_NODES',
  /** Attach projects failure */
  ATTACH_PROJECT_FAILURE: 'ATTACH_PROJECT_FAILURE',
  /** Attach projects failure */
  UPDATE_INSTANCE_PROFILE_FAILURE: 'UPDATE_INSTANCE_PROFILE_FAILURE',
  /** Cluster terminated due to database failure */
  DATABASE_CONNECTION_FAILURE: 'DATABASE_CONNECTION_FAILURE',
  /**
   * Databricks cannot handle the request at this moment. Please try again later
   * and contact Databricks if the problem persists.
   */
  REQUEST_THROTTLED: 'REQUEST_THROTTLED',
  /** SelfBootstrap failure. Either self-bootstrap fast fail or node daemon ping timeout */
  SELF_BOOTSTRAP_FAILURE: 'SELF_BOOTSTRAP_FAILURE',
  /**
   * Databricks cannot load and execute a global init script on one of the cluster's nodes,
   * or the init script terminates with a non-zero exit code.
   */
  GLOBAL_INIT_SCRIPT_FAILURE: 'GLOBAL_INIT_SCRIPT_FAILURE',
  /**
   * Container launch timed out downloading the spark image. This can happen if the customer
   * has byo-vpc/vnet and the download of large files is being throttled.
   */
  SLOW_IMAGE_DOWNLOAD: 'SLOW_IMAGE_DOWNLOAD',
  /** Container setup failed due to an invalid Spark image. */
  INVALID_SPARK_IMAGE: 'INVALID_SPARK_IMAGE',
  /**
   * If the ngrok tunnel token provisioning fails for any reason, for example hitting the
   * max capacity of allowed ngrok tokens.  (ES-32083)
   */
  NPIP_TUNNEL_TOKEN_FAILURE: 'NPIP_TUNNEL_TOKEN_FAILURE',
  /** Hive Metastore provisioning failue in launch container step */
  HIVE_METASTORE_PROVISIONING_FAILURE: 'HIVE_METASTORE_PROVISIONING_FAILURE',
  /**
   * Occurs when the deployment template we submit to Azure violates their requirements.
   * Typical scenarios:
   * - Wrong parameter key/value used
   * - Exceed the limit for certain parameter
   */
  AZURE_INVALID_DEPLOYMENT_TEMPLATE: 'AZURE_INVALID_DEPLOYMENT_TEMPLATE',
  /**
   * The set of un-categorized failure responses from Azure when we launch instance resources
   * using deployment template
   */
  AZURE_UNEXPECTED_DEPLOYMENT_TEMPLATE_FAILURE:
    'AZURE_UNEXPECTED_DEPLOYMENT_TEMPLATE_FAILURE',
  /** Subnet (typically Azure vnet injected) has run out of ip addresses */
  SUBNET_EXHAUSTED_FAILURE: 'SUBNET_EXHAUSTED_FAILURE',
  /**
   * Timeout to ping the nodeDaemon, possible reason: nodeDaemon didn't start (configuration issue),
   * network connectivity issue
   */
  BOOTSTRAP_TIMEOUT: 'BOOTSTRAP_TIMEOUT',
  /** Bootstrap timeout due to script download failure */
  STORAGE_DOWNLOAD_FAILURE: 'STORAGE_DOWNLOAD_FAILURE',
  /** Bootstrap timeout due to get runbook failure */
  CONTROL_PLANE_REQUEST_FAILURE: 'CONTROL_PLANE_REQUEST_FAILURE',
  /** Bootstrap timeout due to Azure Extension Service Failure */
  BOOTSTRAP_TIMEOUT_CLOUD_PROVIDER_EXCEPTION:
    'BOOTSTRAP_TIMEOUT_CLOUD_PROVIDER_EXCEPTION',
  /** Could not find enough of the requested instance type in the requested AZ. Often related to Auto AZ. */
  AWS_INSUFFICIENT_INSTANCE_CAPACITY_FAILURE:
    'AWS_INSUFFICIENT_INSTANCE_CAPACITY_FAILURE',
  /** Container setup failure due to docker image pulling failure */
  DOCKER_IMAGE_PULL_FAILURE: 'DOCKER_IMAGE_PULL_FAILURE',
  /**
   * Failures during azure vnet configuration. For example, a workspace with VNet injection had
   * incorrect DNS settings that blocked access to worker artifacts.
   */
  AZURE_VNET_CONFIGURATION_FAILURE: 'AZURE_VNET_CONFIGURATION_FAILURE',
  /**
   * Bootstrap failure due to Ngrok tunnel setup timeout or failure. For example, if the worker
   * node is unable to reach the Ngrok tunnel domain.
   */
  NPIP_TUNNEL_SETUP_FAILURE: 'NPIP_TUNNEL_SETUP_FAILURE',
  /**
   * Lack authorization for cluster operation.
   * For example, awsApiErrorCode: 'AccessDenied' or 'UnauthorizedOperation'.
   */
  AWS_AUTHORIZATION_FAILURE: 'AWS_AUTHORIZATION_FAILURE',
  /** request comes form Nephos resource pool auto management */
  NEPHOS_RESOURCE_MANAGEMENT: 'NEPHOS_RESOURCE_MANAGEMENT',
  /**
   * Container setup failed during container registration to security daemon due to STS endpoint
   * connection error.
   */
  STS_CLIENT_SETUP_FAILURE: 'STS_CLIENT_SETUP_FAILURE',
  /** Container setup failed during registration to security daemon due to an unspecified error. */
  SECURITY_DAEMON_REGISTRATION_EXCEPTION:
    'SECURITY_DAEMON_REGISTRATION_EXCEPTION',
  /** The maximum request rate permitted by the Amazon EC2 APIs has been exceeded for your account. */
  AWS_REQUEST_LIMIT_EXCEEDED: 'AWS_REQUEST_LIMIT_EXCEEDED',
  /** We don't have enough addresses in the subnet for the instances in the request. */
  AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE:
    'AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE',
  /** The request is not supported (This is a vague error code that can be thrown for a lot of reasons.) */
  AWS_UNSUPPORTED_FAILURE: 'AWS_UNSUPPORTED_FAILURE',
  /** Could not find enough azure resources to fulfill the request. */
  AZURE_QUOTA_EXCEEDED_EXCEPTION: 'AZURE_QUOTA_EXCEEDED_EXCEPTION',
  /** NOTE: This is currently used by exceptions with messages that are classified as user errors. */
  AZURE_OPERATION_NOT_ALLOWED_EXCEPTION:
    'AZURE_OPERATION_NOT_ALLOWED_EXCEPTION',
  /** Failure when mounting remote NFS to container */
  NFS_MOUNT_FAILURE: 'NFS_MOUNT_FAILURE',
  /** K8S failed to upscale to acquire new nodes */
  K8S_AUTOSCALING_FAILURE: 'K8S_AUTOSCALING_FAILURE',
  /** DBR Cluster launched on K8s (i.e. CMv2) has failed to start up in time */
  K8S_DBR_CLUSTER_LAUNCH_TIMEOUT: 'K8S_DBR_CLUSTER_LAUNCH_TIMEOUT',
  /**
   * Container launch failed while downloading the spark image. Catch all for if anything
   * goes wrong while downloading and extracting the spark tarball.
   */
  SPARK_IMAGE_DOWNLOAD_FAILURE: 'SPARK_IMAGE_DOWNLOAD_FAILURE',
  /** Azure VM Extension failure during instance bootstrap */
  AZURE_VM_EXTENSION_FAILURE: 'AZURE_VM_EXTENSION_FAILURE',
  /** Workspace was cancelled hence deny/terminate the cluster */
  WORKSPACE_CANCELLED_ERROR: 'WORKSPACE_CANCELLED_ERROR',
  /** The spot instance count in an account has exceeded the limit */
  AWS_MAX_SPOT_INSTANCE_COUNT_EXCEEDED_FAILURE:
    'AWS_MAX_SPOT_INSTANCE_COUNT_EXCEEDED_FAILURE',
  /**
   * Cluster is terminated because the services are temporarily unavailable.
   * This normally happens when CM is restarting and draining execution contexts,
   * or IM/Delegate is overloaded, so that it will not be able to retry the instance launch request.
   */
  TEMPORARILY_UNAVAILABLE: 'TEMPORARILY_UNAVAILABLE',
  /**
   * Bootstrap failure due to error during worker setup, usually due to an issue with
   * disk or gpu setup. See SetupCommandBuilder for other possible causes
   */
  WORKER_SETUP_FAILURE: 'WORKER_SETUP_FAILURE',
  /**
   * Cluster failure due to IP space exhaustion. For example on CMv2, Kubernetes will fail to scale
   * up new nodes if the pod IP CIDR block is exhausted.
   */
  IP_EXHAUSTION_FAILURE: 'IP_EXHAUSTION_FAILURE',
  /**
   * Could not find enough GCP resources to fulfill the request.
   * TODO: It's very unfortunate that we have per-cloud termination reasons while we should have
   * cloud-agnostic termination reasons. For example, we should consolidate
   * {AZURE_QUOTA_EXCEEDED_EXCEPTION, AWS_REQUEST_LIMIT_EXCEEDED and GCP_QUOTA_EXCEEDED},
   * {AWS_INSUFFICIENT_FREE_ADDRESSES_IN_SUBNET_FAILURE, IP_EXHAUSTION_FAILURE}, etc.
   */
  GCP_QUOTA_EXCEEDED: 'GCP_QUOTA_EXCEEDED',
  /** Cloud provider is undergoing a transient resource throttling. This is retryable. */
  CLOUD_PROVIDER_RESOURCE_STOCKOUT: 'CLOUD_PROVIDER_RESOURCE_STOCKOUT',
  /** The GCP service account associated with the DBR cluster is deleted. */
  GCP_SERVICE_ACCOUNT_DELETED: 'GCP_SERVICE_ACCOUNT_DELETED',
  /** Legit cluster termination in Azure caused by customer revoking the key permission used for managed-disks encryption */
  AZURE_BYOK_KEY_PERMISSION_FAILURE: 'AZURE_BYOK_KEY_PERMISSION_FAILURE',
  /** Termination because of spot instance terminated by cloud provider */
  SPOT_INSTANCE_TERMINATION: 'SPOT_INSTANCE_TERMINATION',
  /** Termination because of unsupported azure ephemeral os disk setup */
  AZURE_EPHEMERAL_DISK_FAILURE: 'AZURE_EPHEMERAL_DISK_FAILURE',
  /**
   * The cluster was terminated because we detected an abusive runtime behavior that violated
   * Terms of Service or Acceptable Use Policy.
   */
  ABUSE_DETECTED: 'ABUSE_DETECTED',
  /** Failed to pull DBR images due to permission error. */
  IMAGE_PULL_PERMISSION_DENIED: 'IMAGE_PULL_PERMISSION_DENIED',
  /** Workspace configuration is in error state due to configuration issue or ACL modification by the customer side */
  WORKSPACE_CONFIGURATION_ERROR: 'WORKSPACE_CONFIGURATION_ERROR',
  /**
   * Catch all error for all secret resolution issues in cluster launch. This should be alerted on,
   * and is considered a server error. This can be split out into other cases if there are client
   * errors - for e.g. INVALID_ARGUMENT is used for secrets that don't exist and permission issues
   */
  SECRET_RESOLUTION_ERROR: 'SECRET_RESOLUTION_ERROR',
  /**
   * Failure due to an instance being of an unsupported type. This is used when an instance in
   * an EC2 fleet is of an unrecognized type, or an invalid type (i.e. graviton when we don't
   * want graviton instances). This should be alerted on.
   */
  UNSUPPORTED_INSTANCE_TYPE: 'UNSUPPORTED_INSTANCE_TYPE',
  /** Failed during instance bootstrap with error code Cannot convert NVMe-based dev id */
  CLOUD_PROVIDER_DISK_SETUP_FAILURE: 'CLOUD_PROVIDER_DISK_SETUP_FAILURE',
  /** Exception when setting up instances using ssh bootstrap */
  SSH_BOOTSTRAP_FAILURE: 'SSH_BOOTSTRAP_FAILURE',
  /** Failed during instance bootstrap with error code Cannot convert NVMe-based dev id */
  AWS_INACCESSIBLE_KMS_KEY_FAILURE: 'AWS_INACCESSIBLE_KMS_KEY_FAILURE',
  /**
   * The bootstrapping init-containers in Spark failed or timed out, blocking the Spark container
   * from bootstrapping. This is a refinement of `SPARK_STARTUP_FAILURE`.
   * (init-containers are a bootstrapping step owned by Databricks)
   */
  INIT_CONTAINER_NOT_FINISHED: 'INIT_CONTAINER_NOT_FINISHED',
  /**
   * Container launch failed due to storage servers throttling our download of spark images. Can
   * happen due to transient spikes of downloads overloading storage servers or gradual increase in
   * usage. In the latter case we need to increase the number of storage servers in the region to
   * help spread load.
   */
  SPARK_IMAGE_DOWNLOAD_THROTTLED: 'SPARK_IMAGE_DOWNLOAD_THROTTLED',
  /**
   * The spark image specified for the cluster was not found when attempting to download. Usually
   * due to the customer custom specifying a bad image.
   */
  SPARK_IMAGE_NOT_FOUND: 'SPARK_IMAGE_NOT_FOUND',
  /**
   * Indicates that the cloud provider operations performed for the cluster were dropped due to
   * an influx in load in the cloud provider and had to be dropped from our end to alleviate
   * pressure within the DelegateRpcClient. Please see go/cmloadshedding for more.
   */
  CLUSTER_OPERATION_THROTTLED: 'CLUSTER_OPERATION_THROTTLED',
  /**
   * The error code can be used to indicate a request misses its deadline. Can be used for either request timeouts
   * or missed deadlines (i.e. a request is not completed as it was processed after its specified deadline)
   */
  CLUSTER_OPERATION_TIMEOUT: 'CLUSTER_OPERATION_TIMEOUT',
  /**
   * This error code is used to terminate long-running Generic compute jobs in Serverless Environment
   * as part of the NephosLongRunning watcher running in Cluster Monitor Service.
   */
  SERVERLESS_LONG_RUNNING_TERMINATED: 'SERVERLESS_LONG_RUNNING_TERMINATED',
  /**
   * This error code is used when the cluster is terminated due to its instances fail with partial failure from Azure
   * packed deployments. In Azure, we might pack multiple launch requests in one deployment template in order
   * to avoid the 800 templates limit on Azure side. If the packed deployment fails multiple times, the cluster could
   * be terminated by this [[AZURE_PACKED_DEPLOYMENT_PARTIAL_FAILURE]] termination code.
   */
  AZURE_PACKED_DEPLOYMENT_PARTIAL_FAILURE:
    'AZURE_PACKED_DEPLOYMENT_PARTIAL_FAILURE',
  /**
   * The instances acquired from a pool in IMv2 do not have a valid worker image to be used in the
   * cluster launch. This usually occurs after AMI/VHD upgrades, worker branch updates, etc.
   */
  INVALID_WORKER_IMAGE_FAILURE: 'INVALID_WORKER_IMAGE_FAILURE',
  /** Worker environment version was changed due to workspace network or CMK update. */
  WORKSPACE_UPDATE: 'WORKSPACE_UPDATE',
  /** The parameter user specified or the user account to create the cluster is invalid according to AWS. */
  INVALID_AWS_PARAMETER: 'INVALID_AWS_PARAMETER',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   *
   * k8s evicted the driver pod due to disk pressure on the driver node. This is likely due to a
   * customer job consuming too much disk and so this is classified as a customer issue.
   */
  DRIVER_OUT_OF_DISK: 'DRIVER_OUT_OF_DISK',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   *
   * k8s evicted the driver pod due to memory pressure on the driver node. A customer job consuming
   * significant amounts of memory should not be able to trigger this as the driver container would
   * OOM first (we set memory limits on our pods). Thus this termination reason will be considered
   * a databricks issue.
   */
  DRIVER_OUT_OF_MEMORY: 'DRIVER_OUT_OF_MEMORY',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   * Original driver pod took too long to become ready and timed out.
   */
  DRIVER_LAUNCH_TIMEOUT: 'DRIVER_LAUNCH_TIMEOUT',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   * Unexpected failure during driver pod launch.
   */
  DRIVER_UNEXPECTED_FAILURE: 'DRIVER_UNEXPECTED_FAILURE',
  /**
   * ** Only relevant on k8s dataplanes (i.e. clusters launched with CMv2 - not CMv1).
   * Unexpected new driver pod created
   */
  UNEXPECTED_POD_RECREATION: 'UNEXPECTED_POD_RECREATION',
  /** Failure due to disabled or inaccessible CMK. */
  GCP_INACCESSIBLE_KMS_KEY_FAILURE: 'GCP_INACCESSIBLE_KMS_KEY_FAILURE',
  /** Failure due to missing/incorrect permission setup on CMK. */
  GCP_KMS_KEY_PERMISSION_DENIED: 'GCP_KMS_KEY_PERMISSION_DENIED',
  /** Driver pod evicted in Nephos */
  DRIVER_EVICTION: 'DRIVER_EVICTION',
  /** User request for termination directly to cloud */
  USER_INITIATED_VM_TERMINATION: 'USER_INITIATED_VM_TERMINATION',
  /** GCP Specific IAM API timeout issues during Workload Idenitity (Cluster Identity) binding process */
  GCP_IAM_TIMEOUT: 'GCP_IAM_TIMEOUT',
  /** Could not find enough AWS resources to fulfill the request */
  AWS_RESOURCE_QUOTA_EXCEEDED: 'AWS_RESOURCE_QUOTA_EXCEEDED',
  /** Cloud account setup has some error (e.g. pending email verification, blocked) */
  CLOUD_ACCOUNT_SETUP_FAILURE: 'CLOUD_ACCOUNT_SETUP_FAILURE',
  /** The specified key pair name does not exist. */
  AWS_INVALID_KEY_PAIR: 'AWS_INVALID_KEY_PAIR',
  /** Driver pod creation failure in nephos */
  DRIVER_POD_CREATION_FAILURE: 'DRIVER_POD_CREATION_FAILURE',
  /** Cluster terminated manually by on-call due to emergency maintenance */
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
  /** Nephos internal error due to insufficient provisioned k8s capacity or insufficient cloud quota */
  INTERNAL_CAPACITY_FAILURE: 'INTERNAL_CAPACITY_FAILURE',
  /** Nephos: could not acquire executor pods from pod pool */
  EXECUTOR_POD_UNSCHEDULED: 'EXECUTOR_POD_UNSCHEDULED',
  /** Artifact download failed because it was too slow */
  STORAGE_DOWNLOAD_FAILURE_SLOW: 'STORAGE_DOWNLOAD_FAILURE_SLOW',
  /** Artifact download failed because it was throttled by the download server */
  STORAGE_DOWNLOAD_FAILURE_THROTTLED: 'STORAGE_DOWNLOAD_FAILURE_THROTTLED',
  /** The cluster was terminated because the size of the dynamic spark conf exceeded the limit. */
  DYNAMIC_SPARK_CONF_SIZE_EXCEEDED: 'DYNAMIC_SPARK_CONF_SIZE_EXCEEDED',
  /** Failure to update the instance profile for the cluster. */
  AWS_INSTANCE_PROFILE_UPDATE_FAILURE: 'AWS_INSTANCE_PROFILE_UPDATE_FAILURE',
  /** The instance pool did not exist when the cluster was launched. */
  INSTANCE_POOL_NOT_FOUND: 'INSTANCE_POOL_NOT_FOUND',
  /** Attempting to launch more instances was rejected as it would exceed the pool's max capacity. */
  INSTANCE_POOL_MAX_CAPACITY_REACHED: 'INSTANCE_POOL_MAX_CAPACITY_REACHED',
  /** The KMS key provided is in an incorrect state. */
  AWS_INVALID_KMS_KEY_STATE: 'AWS_INVALID_KMS_KEY_STATE',
  /** Insufficient capacity failure from GCE API. */
  GCP_INSUFFICIENT_CAPACITY: 'GCP_INSUFFICIENT_CAPACITY',
  /** Rate quota exceeded for GCP API (e.g. Read requests per minute per region). */
  GCP_API_RATE_QUOTA_EXCEEDED: 'GCP_API_RATE_QUOTA_EXCEEDED',
  /** Resource quota exceeded (e.g. # of n1 vCPUs in a region). */
  GCP_RESOURCE_QUOTA_EXCEEDED: 'GCP_RESOURCE_QUOTA_EXCEEDED',
  /** Subnet IP space exhausted. */
  GCP_IP_SPACE_EXHAUSTED: 'GCP_IP_SPACE_EXHAUSTED',
  /** Missing permissions to launch VM with service account. */
  GCP_SERVICE_ACCOUNT_ACCESS_DENIED: 'GCP_SERVICE_ACCOUNT_ACCESS_DENIED',
  /** VM attempting to launch with non-existent service account. */
  GCP_SERVICE_ACCOUNT_NOT_FOUND: 'GCP_SERVICE_ACCOUNT_NOT_FOUND',
  /** Forbidden (403) returned by GCP API. */
  GCP_FORBIDDEN: 'GCP_FORBIDDEN',
  /** Not found (404) returned by GCP API. */
  GCP_NOT_FOUND: 'GCP_NOT_FOUND',
  /** Gatekeeper indicated the cluster should be shutdown */
  RESOURCE_USAGE_BLOCKED: 'RESOURCE_USAGE_BLOCKED',
  /** The data access config of the workspace has changed, and clusters using outdated config will be terminated. */
  DATA_ACCESS_CONFIG_CHANGED: 'DATA_ACCESS_CONFIG_CHANGED',
  /** Failed to fetch internal PAT token required for init script installation from WSFS/UC volumes */
  ACCESS_TOKEN_FAILURE: 'ACCESS_TOKEN_FAILURE',
  /**
   * It indicates there is a placement v2 protocol rollout/rollback event for the corresponding workspace when
   * processing the placement session on the instance-manager side. A retry will fix the issue by switching back
   * to the correct placement protocol.
   */
  INVALID_INSTANCE_PLACEMENT_PROTOCOL: 'INVALID_INSTANCE_PLACEMENT_PROTOCOL',
  /** The cluster was terminated as it failed to resolve budget policy. */
  BUDGET_POLICY_RESOLUTION_FAILURE: 'BUDGET_POLICY_RESOLUTION_FAILURE',
  /**
   * This customer/error combination is a known issue and is intentionally excluded from termination
   * metrics
   */
  IN_PENALTY_BOX: 'IN_PENALTY_BOX',
  /**
   * The cluster was terminated when the primary workspace failed over to the secondary workspace.
   * This is expected because there is no data plane in the secondary workspace.
   */
  DISASTER_RECOVERY_REPLICATION: 'DISASTER_RECOVERY_REPLICATION',
  /** A bootstrap timeout that was caused by misconfiguration on the customer's side */
  BOOTSTRAP_TIMEOUT_DUE_TO_MISCONFIG: 'BOOTSTRAP_TIMEOUT_DUE_TO_MISCONFIG',
  /** Instance unreachable, but due to misconfiguration on the customer's side */
  INSTANCE_UNREACHABLE_DUE_TO_MISCONFIG:
    'INSTANCE_UNREACHABLE_DUE_TO_MISCONFIG',
  /** Bootstrap timeout due to script download failure, but due to misconfiguration on the customer's side */
  STORAGE_DOWNLOAD_FAILURE_DUE_TO_MISCONFIG:
    'STORAGE_DOWNLOAD_FAILURE_DUE_TO_MISCONFIG',
  /** CPRF, but due to misconfiguration on the customer's side */
  CONTROL_PLANE_REQUEST_FAILURE_DUE_TO_MISCONFIG:
    'CONTROL_PLANE_REQUEST_FAILURE_DUE_TO_MISCONFIG',
  /** CPLF, but due to misconfiguration on the customer's side */
  CLOUD_PROVIDER_LAUNCH_FAILURE_DUE_TO_MISCONFIG:
    'CLOUD_PROVIDER_LAUNCH_FAILURE_DUE_TO_MISCONFIG',
  /** GCP subnet is in transient "resourceNotReady" state. */
  GCP_SUBNET_NOT_READY: 'GCP_SUBNET_NOT_READY',
  /** The operation on the cloud provider was cancelled. Possibly due to a user action. */
  CLOUD_OPERATION_CANCELLED: 'CLOUD_OPERATION_CANCELLED',
  /**
   * If cloud provider indicates instance creation was a success, yet the instance is never created.
   * This can happen in certain edge cases like quota exhaustion on GCP. We have an open bug here:
   * https://partnerissuetracker.corp.google.com/issues/339061883
   */
  CLOUD_PROVIDER_INSTANCE_NOT_LAUNCHED: 'CLOUD_PROVIDER_INSTANCE_NOT_LAUNCHED',
  /** GCP Databricks VM Machine Image is blocked by customer organization policy. */
  GCP_TRUSTED_IMAGE_PROJECTS_VIOLATED: 'GCP_TRUSTED_IMAGE_PROJECTS_VIOLATED',
  /** cluster terminate can happened when a budget policy limit enforcement activated */
  BUDGET_POLICY_LIMIT_ENFORCEMENT_ACTIVATED:
    'BUDGET_POLICY_LIMIT_ENFORCEMENT_ACTIVATED',
  EOS_SPARK_IMAGE: 'EOS_SPARK_IMAGE',
  /** Serverless only. There are no eligible K8s for the cluster. */
  NO_MATCHED_K8S: 'NO_MATCHED_K8S',
  /** Lazy allocation timeout. Timeout before any internal DBR clusters were allocated. */
  LAZY_ALLOCATION_TIMEOUT: 'LAZY_ALLOCATION_TIMEOUT',
  /** CMv2 unable to contact chauffeur or node-daemon on the driver node. */
  DRIVER_NODE_UNREACHABLE: 'DRIVER_NODE_UNREACHABLE',
  /** Dynamic secret generation failed. */
  SECRET_CREATION_FAILURE: 'SECRET_CREATION_FAILURE',
  /** Driver or executor pod failed to be scheduled. */
  POD_SCHEDULING_FAILURE: 'POD_SCHEDULING_FAILURE',
  /** Driver or executor pod failed to finish assigning. */
  POD_ASSIGNMENT_FAILURE: 'POD_ASSIGNMENT_FAILURE',
  /** Lazy allocation timeout with unknown reason. */
  ALLOCATION_TIMEOUT: 'ALLOCATION_TIMEOUT',
  /** Lazy allocation timeout. Maps to NoUnallocatedDbrCluster. */
  ALLOCATION_TIMEOUT_NO_UNALLOCATED_CLUSTERS:
    'ALLOCATION_TIMEOUT_NO_UNALLOCATED_CLUSTERS',
  /** Lazy allocation timeout. Maps to NoMatchedUnallocatedDbrCluster. */
  ALLOCATION_TIMEOUT_NO_MATCHED_CLUSTERS:
    'ALLOCATION_TIMEOUT_NO_MATCHED_CLUSTERS',
  /** Lazy allocation timeout. Maps to NoUnallocatedReadyDbrCluster. */
  ALLOCATION_TIMEOUT_NO_READY_CLUSTERS: 'ALLOCATION_TIMEOUT_NO_READY_CLUSTERS',
  /** Lazy allocation timeout. Maps to NoMatchedUnallocatedWarmedUpDbrCluster. */
  ALLOCATION_TIMEOUT_NO_WARMED_UP_CLUSTERS:
    'ALLOCATION_TIMEOUT_NO_WARMED_UP_CLUSTERS',
  /** Lazy allocation timeout. Maps to NoCandidatesWithNodeDaemonK8sReady. */
  ALLOCATION_TIMEOUT_NODE_DAEMON_NOT_READY:
    'ALLOCATION_TIMEOUT_NODE_DAEMON_NOT_READY',
  /** Lazy allocation timeout. Maps to NoCandidatesHealthy. */
  ALLOCATION_TIMEOUT_NO_HEALTHY_CLUSTERS:
    'ALLOCATION_TIMEOUT_NO_HEALTHY_CLUSTERS',
  /**
   * When nephos blocking wait for netvisor setup ready signal, terminated by timeout.
   * This error code only applies to clusters with the attribute should_block_for_network_readiness: true
   */
  NETVISOR_SETUP_TIMEOUT: 'NETVISOR_SETUP_TIMEOUT',
  /** Serverless only. The preselected K8s for the cluster is not eligible. */
  NO_MATCHED_K8S_TESTING_TAG: 'NO_MATCHED_K8S_TESTING_TAG',
  /** The customer's repeatedly attempting to launch clusters with some configuration that the CSP's not able to provide */
  CLOUD_PROVIDER_RESOURCE_STOCKOUT_DUE_TO_MISCONFIG:
    'CLOUD_PROVIDER_RESOURCE_STOCKOUT_DUE_TO_MISCONFIG',
  /** For the GCP CMv1 Migration, we will terminate all CMv2 based clusters with this failure. */
  GKE_BASED_CLUSTER_TERMINATION: 'GKE_BASED_CLUSTER_TERMINATION',
  /** Lazy allocation timeout. Maps to NoCandidatesHealthyAndWarmedUp. */
  ALLOCATION_TIMEOUT_NO_HEALTHY_AND_WARMED_UP_CLUSTERS:
    'ALLOCATION_TIMEOUT_NO_HEALTHY_AND_WARMED_UP_CLUSTERS',
  /** Docker container's OS was not valid. */
  DOCKER_INVALID_OS_EXCEPTION: 'DOCKER_INVALID_OS_EXCEPTION',
  /** Something went wrong during the creation of the docker container. */
  DOCKER_CONTAINER_CREATION_EXCEPTION: 'DOCKER_CONTAINER_CREATION_EXCEPTION',
  /** Customer passed in a docker image that's too large for the instance. */
  DOCKER_IMAGE_TOO_LARGE_FOR_INSTANCE_EXCEPTION:
    'DOCKER_IMAGE_TOO_LARGE_FOR_INSTANCE_EXCEPTION',
  /** The cluster was terminated because the DNS resolution failed. */
  DNS_RESOLUTION_ERROR: 'DNS_RESOLUTION_ERROR',
  /** Org policy is preventing a GCE API operation from being executed. */
  GCP_DENIED_BY_ORG_POLICY: 'GCP_DENIED_BY_ORG_POLICY',
  /** Customer passed in a secret that they do not have permissions to resolve. */
  SECRET_PERMISSION_DENIED: 'SECRET_PERMISSION_DENIED',
  /** Start of network health check generated failures */
  NETWORK_CHECK_NIC_FAILURE: 'NETWORK_CHECK_NIC_FAILURE',
  NETWORK_CHECK_DNS_SERVER_FAILURE: 'NETWORK_CHECK_DNS_SERVER_FAILURE',
  NETWORK_CHECK_STORAGE_FAILURE: 'NETWORK_CHECK_STORAGE_FAILURE',
  NETWORK_CHECK_METADATA_ENDPOINT_FAILURE:
    'NETWORK_CHECK_METADATA_ENDPOINT_FAILURE',
  NETWORK_CHECK_CONTROL_PLANE_FAILURE: 'NETWORK_CHECK_CONTROL_PLANE_FAILURE',
  NETWORK_CHECK_MULTIPLE_COMPONENTS_FAILURE:
    'NETWORK_CHECK_MULTIPLE_COMPONENTS_FAILURE',
  /** Driver has been down or unresponsive for an extended period of time */
  DRIVER_UNHEALTHY: 'DRIVER_UNHEALTHY',
  /** cluster request is denied due to disallowed usage policy entitlement */
  USAGE_POLICY_ENTITLEMENT_DENIED: 'USAGE_POLICY_ENTITLEMENT_DENIED',
  /** Request exceeded MAX_ACTIVE_DBR_PODS_PER_K8S_CLUSTER quota - too many active pods on the K8s cluster */
  K8S_ACTIVE_POD_QUOTA_EXCEEDED: 'K8S_ACTIVE_POD_QUOTA_EXCEEDED',
  /** Request exceeded MAX_PODS_PER_CLOUD_ACCOUNT quota - subscription/cloud account pod limit reached */
  CLOUD_ACCOUNT_POD_QUOTA_EXCEEDED: 'CLOUD_ACCOUNT_POD_QUOTA_EXCEEDED',
  /** Start of network health check generated failures due to misconfiguration */
  NETWORK_CHECK_NIC_FAILURE_DUE_TO_MISCONFIG:
    'NETWORK_CHECK_NIC_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_DNS_SERVER_FAILURE_DUE_TO_MISCONFIG:
    'NETWORK_CHECK_DNS_SERVER_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_STORAGE_FAILURE_DUE_TO_MISCONFIG:
    'NETWORK_CHECK_STORAGE_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_METADATA_ENDPOINT_FAILURE_DUE_TO_MISCONFIG:
    'NETWORK_CHECK_METADATA_ENDPOINT_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_CONTROL_PLANE_FAILURE_DUE_TO_MISCONFIG:
    'NETWORK_CHECK_CONTROL_PLANE_FAILURE_DUE_TO_MISCONFIG',
  NETWORK_CHECK_MULTIPLE_COMPONENTS_FAILURE_DUE_TO_MISCONFIG:
    'NETWORK_CHECK_MULTIPLE_COMPONENTS_FAILURE_DUE_TO_MISCONFIG',
  /**
   * CMv2 could not resolve the DBR image for versionless workloads (REPL, GENERIC).
   * This typically happens when no spark version is found from the channel mapping
   * and the workload is versionless-enabled.
   */
  DBR_IMAGE_RESOLUTION_FAILURE: 'DBR_IMAGE_RESOLUTION_FAILURE',
  CONTROL_PLANE_CONNECTION_FAILURE: 'CONTROL_PLANE_CONNECTION_FAILURE',
  CONTROL_PLANE_CONNECTION_FAILURE_DUE_TO_MISCONFIG:
    'CONTROL_PLANE_CONNECTION_FAILURE_DUE_TO_MISCONFIG',
  RATE_LIMITED: 'RATE_LIMITED',
  /** The cluster was terminated because mutual TLS port 8443 check failed. */
  MTLS_PORT_CONNECTIVITY_FAILURE: 'MTLS_PORT_CONNECTIVITY_FAILURE',
  /** The cluster was terminated because hivemetastore connectivity check failed. */
  HIVEMETASTORE_CONNECTIVITY_FAILURE: 'HIVEMETASTORE_CONNECTIVITY_FAILURE',
} as const;
export type TerminationCode =
  | (typeof TerminationCode)[keyof typeof TerminationCode]
  | (string & {});

/** type of the termination */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TerminationType = {
  /** Termination succeeded normally */
  SUCCESS: 'SUCCESS',
  /** Non-retryable. Client must fix parameters before reattempting the cluster creation */
  CLIENT_ERROR: 'CLIENT_ERROR',
  /** Databricks service issue. Clients may retry */
  SERVICE_FAULT: 'SERVICE_FAULT',
  /** AWS or Azure infrastructure issue. Clients may retry after the underlying cloud issue is resolved */
  CLOUD_FAILURE: 'CLOUD_FAILURE',
} as const;
export type TerminationType =
  | (typeof TerminationType)[keyof typeof TerminationType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const WarehouseType = {
  /** UNDOCUMENTED. Indicates no value is specified. */
  TYPE_UNSPECIFIED: '',
  /** Classic warehouse type */
  CLASSIC: 'CLASSIC',
  /** Pro warehouse type */
  PRO: 'PRO',
} as const;
export type WarehouseType =
  | (typeof WarehouseType)[keyof typeof WarehouseType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EndpointHealth_Status = {
  /** UNDOCUMENTED. Indicates no value is specified. An implementation detail. */
  STATUS_UNSPECIFIED: '',
  /** Endpoint is functioning normally and there are no known issues. */
  HEALTHY: 'HEALTHY',
  /**
   * Endpoint might be functional, but there are some known issues.
   * Performance might be affected.
   */
  DEGRADED: 'DEGRADED',
  /** Endpoint is severely affected. Likely will not be able to serve queries. */
  FAILED: 'FAILED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type EndpointHealth_Status =
  | (typeof EndpointHealth_Status)[keyof typeof EndpointHealth_Status]
  | (string & {});

/** Configures the channel name and DBSQL version of the warehouse. CHANNEL_NAME_CUSTOM should be chosen only when `dbsql_version` is specified. */
export interface Channel {
  name?: ChannelName | undefined;
  dbsqlVersion?: string | undefined;
}

/** Request message for CreateDefaultWarehouseOverride. */
export interface CreateDefaultWarehouseOverrideRequest {
  /**
   * Required. The ID to use for the override, which will become the final component
   * of the override's resource name.
   * Can be a numeric user ID or the literal string "me" for the current user.
   */
  defaultWarehouseOverrideId?: string | undefined;
  /** Required. The default warehouse override to create. */
  defaultWarehouseOverride?: DefaultWarehouseOverride | undefined;
}

/** Creates a new SQL warehouse. */
export interface CreateWarehouseRequest {
  /**
   * Logical name for the cluster.
   *
   * Supported values:
   * - Must be unique within an org.
   * - Must be less than 100 characters.
   */
  name?: string | undefined;
  /**
   * Size of the clusters allocated for this warehouse.
   * Increasing the size of a spark cluster allows you to run larger queries on
   * it. If you want to increase the number of concurrent queries, please tune
   * max_num_clusters.
   *
   * Supported values:
   * - 2X-Small
   * - X-Small
   * - Small
   * - Medium
   * - Large
   * - X-Large
   * - 2X-Large
   * - 3X-Large
   * - 4X-Large
   * - 5X-Large
   */
  clusterSize?: string | undefined;
  /**
   * Minimum number of available clusters that will be maintained for this SQL
   * warehouse. Increasing this will ensure that a larger number of clusters are
   * always running and therefore may reduce the cold start time for new
   * queries. This is similar to reserved vs. revocable cores in a resource
   * manager.
   *
   * Supported values:
   * - Must be > 0
   * - Must be <= min(max_num_clusters, 30)
   *
   * Defaults to 1
   */
  minNumClusters?: number | undefined;
  /**
   * Maximum number of clusters that the autoscaler will create to handle
   * concurrent queries.
   *
   * Supported values:
   * - Must be >= min_num_clusters
   * - Must be <= 40.
   *
   * Defaults to min_clusters if unset.
   */
  maxNumClusters?: number | undefined;
  /**
   * The amount of time in minutes that a SQL warehouse must be idle (i.e., no
   * RUNNING queries) before it is automatically stopped.
   *
   * Supported values:
   * - Must be == 0 or >= 10 mins
   * - 0 indicates no autostop.
   *
   * Defaults to 120 mins
   */
  autoStopMins?: number | undefined;
  /** warehouse creator name */
  creatorName?: string | undefined;
  /** Deprecated. Instance profile used to pass IAM role to the cluster */
  instanceProfileArn?: string | undefined;
  /**
   * A set of key-value pairs that will be tagged on all resources (e.g., AWS instances and EBS volumes) associated
   * with this SQL warehouse.
   *
   * Supported values:
   * - Number of tags < 45.
   */
  tags?: EndpointTags | undefined;
  /** Configurations whether the endpoint should use spot instances. */
  spotInstancePolicy?: EndpointSpotInstancePolicy | undefined;
  /**
   * Configures whether the warehouse should use Photon optimized clusters.
   *
   * Defaults to true.
   */
  enablePhoton?: boolean | undefined;
  /** Channel Details */
  channel?: Channel | undefined;
  /** Configures whether the warehouse should use serverless compute */
  enableServerlessCompute?: boolean | undefined;
  /**
   * Warehouse type: `PRO` or `CLASSIC`. If you want to use serverless compute,
   * you must set to `PRO` and also set the field `enable_serverless_compute` to `true`.
   */
  warehouseType?: WarehouseType | undefined;
}

export interface CreateWarehouseResponse {
  /**
   * Id for the SQL warehouse.
   * This value is unique across all SQL warehouses.
   */
  id?: string | undefined;
}

/**
 * Represents a per-user default warehouse override configuration.
 * This resource allows users or administrators to customize how a user's
 * default warehouse is selected for SQL operations.
 * If no override exists for a user, the workspace default warehouse will be used.
 */
export interface DefaultWarehouseOverride {
  /**
   * The resource name of the default warehouse override.
   * Format: default-warehouse-overrides/{default_warehouse_override_id}
   */
  name?: string | undefined;
  /** The ID component of the resource name (user ID). */
  defaultWarehouseOverrideId?: string | undefined;
  /** The type of override behavior. */
  type?: DefaultWarehouseOverrideType | undefined;
  /**
   * The specific warehouse ID when type is CUSTOM.
   * Not set for LAST_SELECTED type.
   */
  warehouseId?: string | undefined;
}

/** Request message for DeleteDefaultWarehouseOverride. */
export interface DeleteDefaultWarehouseOverrideRequest {
  /**
   * Required. The resource name of the default warehouse override to delete.
   * Format: default-warehouse-overrides/{default_warehouse_override_id}
   * The default_warehouse_override_id can be a numeric user ID or the literal string "me" for the current user.
   */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteWarehouseResponse {}

/**
 * This is an incremental edit functionality, so all fields except id are optional. If a field is set, the corresponding
 * configuration in the SQL warehouse is modified. If a field is unset, the existing configuration value in the SQL
 * warehouse is retained. Thus, this API is not idempotent.
 */
export interface EditWarehouseRequest {
  /** Required. Id of the warehouse to configure. */
  id?: string | undefined;
  /**
   * Logical name for the cluster.
   *
   * Supported values:
   * - Must be unique within an org.
   * - Must be less than 100 characters.
   */
  name?: string | undefined;
  /**
   * Size of the clusters allocated for this warehouse.
   * Increasing the size of a spark cluster allows you to run larger queries on
   * it. If you want to increase the number of concurrent queries, please tune
   * max_num_clusters.
   *
   * Supported values:
   * - 2X-Small
   * - X-Small
   * - Small
   * - Medium
   * - Large
   * - X-Large
   * - 2X-Large
   * - 3X-Large
   * - 4X-Large
   * - 5X-Large
   */
  clusterSize?: string | undefined;
  /**
   * Minimum number of available clusters that will be maintained for this SQL
   * warehouse. Increasing this will ensure that a larger number of clusters are
   * always running and therefore may reduce the cold start time for new
   * queries. This is similar to reserved vs. revocable cores in a resource
   * manager.
   *
   * Supported values:
   * - Must be > 0
   * - Must be <= min(max_num_clusters, 30)
   *
   * Defaults to 1
   */
  minNumClusters?: number | undefined;
  /**
   * Maximum number of clusters that the autoscaler will create to handle
   * concurrent queries.
   *
   * Supported values:
   * - Must be >= min_num_clusters
   * - Must be <= 40.
   *
   * Defaults to min_clusters if unset.
   */
  maxNumClusters?: number | undefined;
  /**
   * The amount of time in minutes that a SQL warehouse must be idle (i.e., no
   * RUNNING queries) before it is automatically stopped.
   *
   * Supported values:
   * - Must be == 0 or >= 10 mins
   * - 0 indicates no autostop.
   *
   * Defaults to 120 mins
   */
  autoStopMins?: number | undefined;
  /** warehouse creator name */
  creatorName?: string | undefined;
  /** Deprecated. Instance profile used to pass IAM role to the cluster */
  instanceProfileArn?: string | undefined;
  /**
   * A set of key-value pairs that will be tagged on all resources (e.g., AWS instances and EBS volumes) associated
   * with this SQL warehouse.
   *
   * Supported values:
   * - Number of tags < 45.
   */
  tags?: EndpointTags | undefined;
  /** Configurations whether the endpoint should use spot instances. */
  spotInstancePolicy?: EndpointSpotInstancePolicy | undefined;
  /**
   * Configures whether the warehouse should use Photon optimized clusters.
   *
   * Defaults to true.
   */
  enablePhoton?: boolean | undefined;
  /** Channel Details */
  channel?: Channel | undefined;
  /** Configures whether the warehouse should use serverless compute */
  enableServerlessCompute?: boolean | undefined;
  /**
   * Warehouse type: `PRO` or `CLASSIC`. If you want to use serverless compute,
   * you must set to `PRO` and also set the field `enable_serverless_compute` to `true`.
   */
  warehouseType?: WarehouseType | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EditWarehouseResponse {}

export interface EndpointConfPair {
  key?: string | undefined;
  value?: string | undefined;
}

export interface EndpointHealth {
  /** Health status of the endpoint. */
  status?: EndpointHealth_Status | undefined;
  /** Deprecated. split into summary and details for security */
  message?: string | undefined;
  /** The reason for failure to bring up clusters for this warehouse. This is available when status is 'FAILED' and sometimes when it is DEGRADED. */
  failureReason?: TerminationReason | undefined;
  /** A short summary of the health status in case of degraded/failed warehouses. */
  summary?: string | undefined;
  /** Details about errors that are causing current degraded/failed status. */
  details?: string | undefined;
}

export interface EndpointInfo {
  /** unique identifier for warehouse */
  id?: string | undefined;
  /**
   * Logical name for the cluster.
   *
   * Supported values:
   * - Must be unique within an org.
   * - Must be less than 100 characters.
   */
  name?: string | undefined;
  /**
   * Size of the clusters allocated for this warehouse.
   * Increasing the size of a spark cluster allows you to run larger queries on
   * it. If you want to increase the number of concurrent queries, please tune
   * max_num_clusters.
   *
   * Supported values:
   * - 2X-Small
   * - X-Small
   * - Small
   * - Medium
   * - Large
   * - X-Large
   * - 2X-Large
   * - 3X-Large
   * - 4X-Large
   * - 5X-Large
   */
  clusterSize?: string | undefined;
  /**
   * Minimum number of available clusters that will be maintained for this SQL
   * warehouse. Increasing this will ensure that a larger number of clusters are
   * always running and therefore may reduce the cold start time for new
   * queries. This is similar to reserved vs. revocable cores in a resource
   * manager.
   *
   * Supported values:
   * - Must be > 0
   * - Must be <= min(max_num_clusters, 30)
   *
   * Defaults to 1
   */
  minNumClusters?: number | undefined;
  /**
   * Maximum number of clusters that the autoscaler will create to handle
   * concurrent queries.
   *
   * Supported values:
   * - Must be >= min_num_clusters
   * - Must be <= 40.
   *
   * Defaults to min_clusters if unset.
   */
  maxNumClusters?: number | undefined;
  /**
   * The amount of time in minutes that a SQL warehouse must be idle (i.e., no
   * RUNNING queries) before it is automatically stopped.
   *
   * Supported values:
   * - Must be == 0 or >= 10 mins
   * - 0 indicates no autostop.
   *
   * Defaults to 120 mins
   */
  autoStopMins?: number | undefined;
  /** warehouse creator name */
  creatorName?: string | undefined;
  /** Deprecated. Instance profile used to pass IAM role to the cluster */
  instanceProfileArn?: string | undefined;
  /**
   * A set of key-value pairs that will be tagged on all resources (e.g., AWS instances and EBS volumes) associated
   * with this SQL warehouse.
   *
   * Supported values:
   * - Number of tags < 45.
   */
  tags?: EndpointTags | undefined;
  /** Configurations whether the endpoint should use spot instances. */
  spotInstancePolicy?: EndpointSpotInstancePolicy | undefined;
  /**
   * Configures whether the warehouse should use Photon optimized clusters.
   *
   * Defaults to true.
   */
  enablePhoton?: boolean | undefined;
  /** Channel Details */
  channel?: Channel | undefined;
  /** Configures whether the warehouse should use serverless compute */
  enableServerlessCompute?: boolean | undefined;
  /**
   * Warehouse type: `PRO` or `CLASSIC`. If you want to use serverless compute,
   * you must set to `PRO` and also set the field `enable_serverless_compute` to `true`.
   */
  warehouseType?: WarehouseType | undefined;
  /** current number of clusters running for the service */
  numClusters?: number | undefined;
  /** Deprecated. current number of active sessions for the warehouse */
  numActiveSessions?: bigint | undefined;
  /** state of the endpoint */
  state?: EndpointState | undefined;
  /** the jdbc connection string for this warehouse */
  jdbcUrl?: string | undefined;
  /** ODBC parameters for the SQL warehouse */
  odbcParams?: OdbcParams | undefined;
  /** Optional health status. Assume the warehouse is healthy if this field is not set. */
  health?: EndpointHealth | undefined;
}

export interface EndpointTagPair {
  key?: string | undefined;
  value?: string | undefined;
}

export interface EndpointTags {
  customTags?: EndpointTagPair[] | undefined;
}

/** Request message for GetDefaultWarehouseOverride. */
export interface GetDefaultWarehouseOverrideRequest {
  /**
   * Required. The resource name of the default warehouse override to retrieve.
   * Format: default-warehouse-overrides/{default_warehouse_override_id}
   * The default_warehouse_override_id can be a numeric user ID or the literal string "me" for the current user.
   */
  name?: string | undefined;
}

/** Fetches the warehouse info for a single SQL warehouse. */
export interface GetWarehouseRequest {
  /** Required. Id of the SQL warehouse. */
  id?: string | undefined;
}

export interface GetWarehouseResponse {
  /** unique identifier for warehouse */
  id?: string | undefined;
  /**
   * Logical name for the cluster.
   *
   * Supported values:
   * - Must be unique within an org.
   * - Must be less than 100 characters.
   */
  name?: string | undefined;
  /**
   * Size of the clusters allocated for this warehouse.
   * Increasing the size of a spark cluster allows you to run larger queries on
   * it. If you want to increase the number of concurrent queries, please tune
   * max_num_clusters.
   *
   * Supported values:
   * - 2X-Small
   * - X-Small
   * - Small
   * - Medium
   * - Large
   * - X-Large
   * - 2X-Large
   * - 3X-Large
   * - 4X-Large
   * - 5X-Large
   */
  clusterSize?: string | undefined;
  /**
   * Minimum number of available clusters that will be maintained for this SQL
   * warehouse. Increasing this will ensure that a larger number of clusters are
   * always running and therefore may reduce the cold start time for new
   * queries. This is similar to reserved vs. revocable cores in a resource
   * manager.
   *
   * Supported values:
   * - Must be > 0
   * - Must be <= min(max_num_clusters, 30)
   *
   * Defaults to 1
   */
  minNumClusters?: number | undefined;
  /**
   * Maximum number of clusters that the autoscaler will create to handle
   * concurrent queries.
   *
   * Supported values:
   * - Must be >= min_num_clusters
   * - Must be <= 40.
   *
   * Defaults to min_clusters if unset.
   */
  maxNumClusters?: number | undefined;
  /**
   * The amount of time in minutes that a SQL warehouse must be idle (i.e., no
   * RUNNING queries) before it is automatically stopped.
   *
   * Supported values:
   * - Must be == 0 or >= 10 mins
   * - 0 indicates no autostop.
   *
   * Defaults to 120 mins
   */
  autoStopMins?: number | undefined;
  /** warehouse creator name */
  creatorName?: string | undefined;
  /** Deprecated. Instance profile used to pass IAM role to the cluster */
  instanceProfileArn?: string | undefined;
  /**
   * A set of key-value pairs that will be tagged on all resources (e.g., AWS instances and EBS volumes) associated
   * with this SQL warehouse.
   *
   * Supported values:
   * - Number of tags < 45.
   */
  tags?: EndpointTags | undefined;
  /** Configurations whether the endpoint should use spot instances. */
  spotInstancePolicy?: EndpointSpotInstancePolicy | undefined;
  /**
   * Configures whether the warehouse should use Photon optimized clusters.
   *
   * Defaults to true.
   */
  enablePhoton?: boolean | undefined;
  /** Channel Details */
  channel?: Channel | undefined;
  /** Configures whether the warehouse should use serverless compute */
  enableServerlessCompute?: boolean | undefined;
  /**
   * Warehouse type: `PRO` or `CLASSIC`. If you want to use serverless compute,
   * you must set to `PRO` and also set the field `enable_serverless_compute` to `true`.
   */
  warehouseType?: WarehouseType | undefined;
  /** current number of clusters running for the service */
  numClusters?: number | undefined;
  /** Deprecated. current number of active sessions for the warehouse */
  numActiveSessions?: bigint | undefined;
  /** state of the endpoint */
  state?: EndpointState | undefined;
  /** the jdbc connection string for this warehouse */
  jdbcUrl?: string | undefined;
  /** ODBC parameters for the SQL warehouse */
  odbcParams?: OdbcParams | undefined;
  /** Optional health status. Assume the warehouse is healthy if this field is not set. */
  health?: EndpointHealth | undefined;
}

/**
 * Fetches the workspace level SQL warehouse configurations. These are the configurations that are set centrally and
 * shared by all SQL warehouses in a workspace.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetWorkspaceWarehouseConfigRequest {}

export interface GetWorkspaceWarehouseConfigResponse {
  /** Security policy for warehouses */
  securityPolicy?: EndpointSecurityPolicy | undefined;
  /**
   * Spark confs for external hive metastore configuration
   * JSON serialized size must be less than <= 512K
   */
  dataAccessConfig?: EndpointConfPair[] | undefined;
  /**
   * AWS Only: The instance profile used to pass an IAM role to the SQL
   * warehouses. This configuration is also applied to the workspace's
   * serverless compute for notebooks and jobs.
   */
  instanceProfileArn?: string | undefined;
  /** Optional: Channel selection details */
  channel?: Channel | undefined;
  /** Deprecated: only setting this to true is allowed. */
  enableServerlessCompute?: boolean | undefined;
  /** Deprecated: Use sql_configuration_parameters */
  globalParam?: RepeatedEndpointConfPairs | undefined;
  /** Deprecated: Use sql_configuration_parameters */
  configParam?: RepeatedEndpointConfPairs | undefined;
  /** SQL configuration parameters */
  sqlConfigurationParameters?: RepeatedEndpointConfPairs | undefined;
  /**
   * GCP only: Google Service Account used to pass to cluster to access Google
   * Cloud Storage
   */
  googleServiceAccount?: string | undefined;
  /**
   * List of Warehouse Types allowed in this workspace (limits allowed value of
   * the type field in CreateWarehouse and EditWarehouse). Note: Some types
   * cannot be disabled, they don't need to be specified
   * in SetWorkspaceWarehouseConfig.
   * Note: Disabling a type may cause existing warehouses to be converted to
   * another type. Used by frontend to save specific type availability in the
   * warehouse create and edit form UI.
   */
  enabledWarehouseTypes?: WarehouseTypePair[] | undefined;
}

/** Request message for ListDefaultWarehouseOverrides. */
export interface ListDefaultWarehouseOverridesRequest {
  /**
   * The maximum number of overrides to return. The service may return fewer than
   * this value.
   * If unspecified, at most 100 overrides will be returned.
   * The maximum value is 1000; values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListDefaultWarehouseOverrides` call.
   * Provide this to retrieve the subsequent page.
   *
   * When paginating, all other parameters provided to `ListDefaultWarehouseOverrides`
   * must match the call that provided the page token.
   */
  pageToken?: string | undefined;
}

/** Response message for ListDefaultWarehouseOverrides. */
export interface ListDefaultWarehouseOverridesResponse {
  /** The default warehouse overrides in the workspace. */
  defaultWarehouseOverrides?: DefaultWarehouseOverride[] | undefined;
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

export interface ListWarehousesResponse {
  /** A list of warehouses and their configurations. */
  warehouses?: EndpointInfo[] | undefined;
  /**
   * A token, which can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

export interface OdbcParams {
  hostname?: string | undefined;
  path?: string | undefined;
  protocol?: string | undefined;
  port?: number | undefined;
}

export interface RepeatedEndpointConfPairs {
  /** Deprecated: Use configuration_pairs */
  configPair?: EndpointConfPair[] | undefined;
  configurationPairs?: EndpointConfPair[] | undefined;
}

/**
 * Sets the workspace level warehouse configuration that is shared by all SQL warehouses in this workspace.
 *
 * This is idempotent.
 */
export interface SetWorkspaceWarehouseConfigRequest {
  /** Security policy for warehouses */
  securityPolicy?: EndpointSecurityPolicy | undefined;
  /**
   * Spark confs for external hive metastore configuration
   * JSON serialized size must be less than <= 512K
   */
  dataAccessConfig?: EndpointConfPair[] | undefined;
  /**
   * AWS Only: The instance profile used to pass an IAM role to the SQL
   * warehouses. This configuration is also applied to the workspace's
   * serverless compute for notebooks and jobs.
   */
  instanceProfileArn?: string | undefined;
  /** Optional: Channel selection details */
  channel?: Channel | undefined;
  /** Deprecated: only setting this to true is allowed. */
  enableServerlessCompute?: boolean | undefined;
  /** Deprecated: Use sql_configuration_parameters */
  globalParam?: RepeatedEndpointConfPairs | undefined;
  /** Deprecated: Use sql_configuration_parameters */
  configParam?: RepeatedEndpointConfPairs | undefined;
  /** SQL configuration parameters */
  sqlConfigurationParameters?: RepeatedEndpointConfPairs | undefined;
  /**
   * GCP only: Google Service Account used to pass to cluster to access Google
   * Cloud Storage
   */
  googleServiceAccount?: string | undefined;
  /**
   * List of Warehouse Types allowed in this workspace (limits allowed value of
   * the type field in CreateWarehouse and EditWarehouse). Note: Some types
   * cannot be disabled, they don't need to be specified
   * in SetWorkspaceWarehouseConfig.
   * Note: Disabling a type may cause existing warehouses to be converted to
   * another type. Used by frontend to save specific type availability in the
   * warehouse create and edit form UI.
   */
  enabledWarehouseTypes?: WarehouseTypePair[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SetWorkspaceWarehouseConfigResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StartResponse {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface StopResponse {}

export interface TerminationReason {
  /** status code indicating why the cluster was terminated */
  code?: TerminationCode | undefined;
  /** type of the termination */
  type?: TerminationType | undefined;
  /** list of parameters that provide additional information about why the cluster was terminated */
  parameters?: Record<string, string> | undefined;
}

/** Request message for UpdateDefaultWarehouseOverride. */
export interface UpdateDefaultWarehouseOverrideRequest {
  /**
   * Required. The default warehouse override to update.
   * The name field must be set in the format: default-warehouse-overrides/{default_warehouse_override_id}
   * The default_warehouse_override_id can be a numeric user ID or the literal string "me" for the current user.
   */
  defaultWarehouseOverride?: DefaultWarehouseOverride | undefined;
  /**
   * Required. Field mask specifying which fields to update.
   * Only the fields specified in the mask will be updated.
   * Use "*" to update all fields.
   * When allow_missing is true, this field is ignored and all fields are applied.
   */
  updateMask?: FieldMask<DefaultWarehouseOverride> | undefined;
  /**
   * If set to true, and the override is not found, a new override will be created.
   * In this situation, `update_mask` is ignored and all fields are applied.
   * Defaults to false.
   */
  allowMissing?: boolean | undefined;
}

/**
 * *
 * Configuration values to enable or disable the access to specific warehouse
 * types in the workspace.
 */
export interface WarehouseTypePair {
  warehouseType?: WarehouseType | undefined;
  /**
   * If set to false the specific warehouse type will not be allowed as a
   * value for warehouse_type in CreateWarehouse and EditWarehouse
   */
  enabled?: boolean | undefined;
}

/**
 * Deletes a warehouse.
 * This API is idempotent.
 */
export interface DeleteWarehouseRequest {
  /** Required. Id of the SQL warehouse. */
  id?: string | undefined;
}

/**
 * Lists all of the SQL warehouses.
 * TODO: consider paginating to limit the number of warehouses returned.
 */
export interface ListWarehousesRequest {
  /**
   * Deprecated: this field is ignored by the server.
   * Service Principal which will be used to fetch the list of endpoints.
   * If not specified, SQL Gateway will use the user from the session header.
   */
  runAsUserId?: bigint | undefined;
  /** The max number of warehouses to return. */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListWarehouses` call.
   * Provide this to retrieve the subsequent page; otherwise the first
   * will be retrieved.
   *
   * When paginating, all other parameters provided to `ListWarehouses` must match
   * the call that provided the page token.
   */
  pageToken?: string | undefined;
}

/**
 * Starts a SQL warehouse.
 * This API is idempotent.
 */
export interface StartRequest {
  /** Required. Id of the SQL warehouse. */
  id?: string | undefined;
}

/**
 * Stops a SQL warehouse.
 * This API is idempotent.
 */
export interface StopRequest {
  /** Required. Id of the SQL warehouse. */
  id?: string | undefined;
}

export const unmarshalChannelSchema: z.ZodType<Channel> = z
  .object({
    name: z.string().optional(),
    dbsql_version: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    dbsqlVersion: d.dbsql_version,
  }));

export const unmarshalCreateWarehouseResponseSchema: z.ZodType<CreateWarehouseResponse> =
  z
    .object({
      id: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
    }));

export const unmarshalDefaultWarehouseOverrideSchema: z.ZodType<DefaultWarehouseOverride> =
  z
    .object({
      name: z.string().optional(),
      default_warehouse_override_id: z.string().optional(),
      type: z.string().optional(),
      warehouse_id: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      defaultWarehouseOverrideId: d.default_warehouse_override_id,
      type: d.type,
      warehouseId: d.warehouse_id,
    }));

export const unmarshalDeleteWarehouseResponseSchema: z.ZodType<DeleteWarehouseResponse> =
  z.object({});

export const unmarshalEditWarehouseResponseSchema: z.ZodType<EditWarehouseResponse> =
  z.object({});

export const unmarshalEndpointConfPairSchema: z.ZodType<EndpointConfPair> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalEndpointHealthSchema: z.ZodType<EndpointHealth> = z
  .object({
    status: z.string().optional(),
    message: z.string().optional(),
    failure_reason: z.lazy(() => unmarshalTerminationReasonSchema).optional(),
    summary: z.string().optional(),
    details: z.string().optional(),
  })
  .transform(d => ({
    status: d.status,
    message: d.message,
    failureReason: d.failure_reason,
    summary: d.summary,
    details: d.details,
  }));

export const unmarshalEndpointInfoSchema: z.ZodType<EndpointInfo> = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    cluster_size: z.string().optional(),
    min_num_clusters: z.number().optional(),
    max_num_clusters: z.number().optional(),
    auto_stop_mins: z.number().optional(),
    creator_name: z.string().optional(),
    instance_profile_arn: z.string().optional(),
    tags: z.lazy(() => unmarshalEndpointTagsSchema).optional(),
    spot_instance_policy: z.string().optional(),
    enable_photon: z.boolean().optional(),
    channel: z.lazy(() => unmarshalChannelSchema).optional(),
    enable_serverless_compute: z.boolean().optional(),
    warehouse_type: z.string().optional(),
    num_clusters: z.number().optional(),
    num_active_sessions: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    state: z.string().optional(),
    jdbc_url: z.string().optional(),
    odbc_params: z.lazy(() => unmarshalOdbcParamsSchema).optional(),
    health: z.lazy(() => unmarshalEndpointHealthSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    clusterSize: d.cluster_size,
    minNumClusters: d.min_num_clusters,
    maxNumClusters: d.max_num_clusters,
    autoStopMins: d.auto_stop_mins,
    creatorName: d.creator_name,
    instanceProfileArn: d.instance_profile_arn,
    tags: d.tags,
    spotInstancePolicy: d.spot_instance_policy,
    enablePhoton: d.enable_photon,
    channel: d.channel,
    enableServerlessCompute: d.enable_serverless_compute,
    warehouseType: d.warehouse_type,
    numClusters: d.num_clusters,
    numActiveSessions: d.num_active_sessions,
    state: d.state,
    jdbcUrl: d.jdbc_url,
    odbcParams: d.odbc_params,
    health: d.health,
  }));

export const unmarshalEndpointTagPairSchema: z.ZodType<EndpointTagPair> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalEndpointTagsSchema: z.ZodType<EndpointTags> = z
  .object({
    custom_tags: z
      .array(z.lazy(() => unmarshalEndpointTagPairSchema))
      .optional(),
  })
  .transform(d => ({
    customTags: d.custom_tags,
  }));

export const unmarshalGetWarehouseResponseSchema: z.ZodType<GetWarehouseResponse> =
  z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      cluster_size: z.string().optional(),
      min_num_clusters: z.number().optional(),
      max_num_clusters: z.number().optional(),
      auto_stop_mins: z.number().optional(),
      creator_name: z.string().optional(),
      instance_profile_arn: z.string().optional(),
      tags: z.lazy(() => unmarshalEndpointTagsSchema).optional(),
      spot_instance_policy: z.string().optional(),
      enable_photon: z.boolean().optional(),
      channel: z.lazy(() => unmarshalChannelSchema).optional(),
      enable_serverless_compute: z.boolean().optional(),
      warehouse_type: z.string().optional(),
      num_clusters: z.number().optional(),
      num_active_sessions: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      state: z.string().optional(),
      jdbc_url: z.string().optional(),
      odbc_params: z.lazy(() => unmarshalOdbcParamsSchema).optional(),
      health: z.lazy(() => unmarshalEndpointHealthSchema).optional(),
    })
    .transform(d => ({
      id: d.id,
      name: d.name,
      clusterSize: d.cluster_size,
      minNumClusters: d.min_num_clusters,
      maxNumClusters: d.max_num_clusters,
      autoStopMins: d.auto_stop_mins,
      creatorName: d.creator_name,
      instanceProfileArn: d.instance_profile_arn,
      tags: d.tags,
      spotInstancePolicy: d.spot_instance_policy,
      enablePhoton: d.enable_photon,
      channel: d.channel,
      enableServerlessCompute: d.enable_serverless_compute,
      warehouseType: d.warehouse_type,
      numClusters: d.num_clusters,
      numActiveSessions: d.num_active_sessions,
      state: d.state,
      jdbcUrl: d.jdbc_url,
      odbcParams: d.odbc_params,
      health: d.health,
    }));

export const unmarshalGetWorkspaceWarehouseConfigResponseSchema: z.ZodType<GetWorkspaceWarehouseConfigResponse> =
  z
    .object({
      security_policy: z.string().optional(),
      data_access_config: z
        .array(z.lazy(() => unmarshalEndpointConfPairSchema))
        .optional(),
      instance_profile_arn: z.string().optional(),
      channel: z.lazy(() => unmarshalChannelSchema).optional(),
      enable_serverless_compute: z.boolean().optional(),
      global_param: z
        .lazy(() => unmarshalRepeatedEndpointConfPairsSchema)
        .optional(),
      config_param: z
        .lazy(() => unmarshalRepeatedEndpointConfPairsSchema)
        .optional(),
      sql_configuration_parameters: z
        .lazy(() => unmarshalRepeatedEndpointConfPairsSchema)
        .optional(),
      google_service_account: z.string().optional(),
      enabled_warehouse_types: z
        .array(z.lazy(() => unmarshalWarehouseTypePairSchema))
        .optional(),
    })
    .transform(d => ({
      securityPolicy: d.security_policy,
      dataAccessConfig: d.data_access_config,
      instanceProfileArn: d.instance_profile_arn,
      channel: d.channel,
      enableServerlessCompute: d.enable_serverless_compute,
      globalParam: d.global_param,
      configParam: d.config_param,
      sqlConfigurationParameters: d.sql_configuration_parameters,
      googleServiceAccount: d.google_service_account,
      enabledWarehouseTypes: d.enabled_warehouse_types,
    }));

export const unmarshalListDefaultWarehouseOverridesResponseSchema: z.ZodType<ListDefaultWarehouseOverridesResponse> =
  z
    .object({
      default_warehouse_overrides: z
        .array(z.lazy(() => unmarshalDefaultWarehouseOverrideSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      defaultWarehouseOverrides: d.default_warehouse_overrides,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListWarehousesResponseSchema: z.ZodType<ListWarehousesResponse> =
  z
    .object({
      warehouses: z.array(z.lazy(() => unmarshalEndpointInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      warehouses: d.warehouses,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalOdbcParamsSchema: z.ZodType<OdbcParams> = z
  .object({
    hostname: z.string().optional(),
    path: z.string().optional(),
    protocol: z.string().optional(),
    port: z.number().optional(),
  })
  .transform(d => ({
    hostname: d.hostname,
    path: d.path,
    protocol: d.protocol,
    port: d.port,
  }));

export const unmarshalRepeatedEndpointConfPairsSchema: z.ZodType<RepeatedEndpointConfPairs> =
  z
    .object({
      config_pair: z
        .array(z.lazy(() => unmarshalEndpointConfPairSchema))
        .optional(),
      configuration_pairs: z
        .array(z.lazy(() => unmarshalEndpointConfPairSchema))
        .optional(),
    })
    .transform(d => ({
      configPair: d.config_pair,
      configurationPairs: d.configuration_pairs,
    }));

export const unmarshalSetWorkspaceWarehouseConfigResponseSchema: z.ZodType<SetWorkspaceWarehouseConfigResponse> =
  z.object({});

export const unmarshalStartResponseSchema: z.ZodType<StartResponse> = z.object(
  {}
);

export const unmarshalStopResponseSchema: z.ZodType<StopResponse> = z.object(
  {}
);

export const unmarshalTerminationReasonSchema: z.ZodType<TerminationReason> = z
  .object({
    code: z.string().optional(),
    type: z.string().optional(),
    parameters: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    code: d.code,
    type: d.type,
    parameters: d.parameters,
  }));

export const unmarshalWarehouseTypePairSchema: z.ZodType<WarehouseTypePair> = z
  .object({
    warehouse_type: z.string().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    warehouseType: d.warehouse_type,
    enabled: d.enabled,
  }));

export const marshalChannelSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    dbsqlVersion: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    dbsql_version: d.dbsqlVersion,
  }));

export const marshalCreateWarehouseRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    clusterSize: z.string().optional(),
    minNumClusters: z.number().optional(),
    maxNumClusters: z.number().optional(),
    autoStopMins: z.number().optional(),
    creatorName: z.string().optional(),
    instanceProfileArn: z.string().optional(),
    tags: z.lazy(() => marshalEndpointTagsSchema).optional(),
    spotInstancePolicy: z.string().optional(),
    enablePhoton: z.boolean().optional(),
    channel: z.lazy(() => marshalChannelSchema).optional(),
    enableServerlessCompute: z.boolean().optional(),
    warehouseType: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    cluster_size: d.clusterSize,
    min_num_clusters: d.minNumClusters,
    max_num_clusters: d.maxNumClusters,
    auto_stop_mins: d.autoStopMins,
    creator_name: d.creatorName,
    instance_profile_arn: d.instanceProfileArn,
    tags: d.tags,
    spot_instance_policy: d.spotInstancePolicy,
    enable_photon: d.enablePhoton,
    channel: d.channel,
    enable_serverless_compute: d.enableServerlessCompute,
    warehouse_type: d.warehouseType,
  }));

export const marshalDefaultWarehouseOverrideSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    defaultWarehouseOverrideId: z.string().optional(),
    type: z.string().optional(),
    warehouseId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    default_warehouse_override_id: d.defaultWarehouseOverrideId,
    type: d.type,
    warehouse_id: d.warehouseId,
  }));

export const marshalEditWarehouseRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    clusterSize: z.string().optional(),
    minNumClusters: z.number().optional(),
    maxNumClusters: z.number().optional(),
    autoStopMins: z.number().optional(),
    creatorName: z.string().optional(),
    instanceProfileArn: z.string().optional(),
    tags: z.lazy(() => marshalEndpointTagsSchema).optional(),
    spotInstancePolicy: z.string().optional(),
    enablePhoton: z.boolean().optional(),
    channel: z.lazy(() => marshalChannelSchema).optional(),
    enableServerlessCompute: z.boolean().optional(),
    warehouseType: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    cluster_size: d.clusterSize,
    min_num_clusters: d.minNumClusters,
    max_num_clusters: d.maxNumClusters,
    auto_stop_mins: d.autoStopMins,
    creator_name: d.creatorName,
    instance_profile_arn: d.instanceProfileArn,
    tags: d.tags,
    spot_instance_policy: d.spotInstancePolicy,
    enable_photon: d.enablePhoton,
    channel: d.channel,
    enable_serverless_compute: d.enableServerlessCompute,
    warehouse_type: d.warehouseType,
  }));

export const marshalEndpointConfPairSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalEndpointTagPairSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalEndpointTagsSchema: z.ZodType = z
  .object({
    customTags: z.array(z.lazy(() => marshalEndpointTagPairSchema)).optional(),
  })
  .transform(d => ({
    custom_tags: d.customTags,
  }));

export const marshalRepeatedEndpointConfPairsSchema: z.ZodType = z
  .object({
    configPair: z.array(z.lazy(() => marshalEndpointConfPairSchema)).optional(),
    configurationPairs: z
      .array(z.lazy(() => marshalEndpointConfPairSchema))
      .optional(),
  })
  .transform(d => ({
    config_pair: d.configPair,
    configuration_pairs: d.configurationPairs,
  }));

export const marshalSetWorkspaceWarehouseConfigRequestSchema: z.ZodType = z
  .object({
    securityPolicy: z.string().optional(),
    dataAccessConfig: z
      .array(z.lazy(() => marshalEndpointConfPairSchema))
      .optional(),
    instanceProfileArn: z.string().optional(),
    channel: z.lazy(() => marshalChannelSchema).optional(),
    enableServerlessCompute: z.boolean().optional(),
    globalParam: z
      .lazy(() => marshalRepeatedEndpointConfPairsSchema)
      .optional(),
    configParam: z
      .lazy(() => marshalRepeatedEndpointConfPairsSchema)
      .optional(),
    sqlConfigurationParameters: z
      .lazy(() => marshalRepeatedEndpointConfPairsSchema)
      .optional(),
    googleServiceAccount: z.string().optional(),
    enabledWarehouseTypes: z
      .array(z.lazy(() => marshalWarehouseTypePairSchema))
      .optional(),
  })
  .transform(d => ({
    security_policy: d.securityPolicy,
    data_access_config: d.dataAccessConfig,
    instance_profile_arn: d.instanceProfileArn,
    channel: d.channel,
    enable_serverless_compute: d.enableServerlessCompute,
    global_param: d.globalParam,
    config_param: d.configParam,
    sql_configuration_parameters: d.sqlConfigurationParameters,
    google_service_account: d.googleServiceAccount,
    enabled_warehouse_types: d.enabledWarehouseTypes,
  }));

export const marshalWarehouseTypePairSchema: z.ZodType = z
  .object({
    warehouseType: z.string().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    warehouse_type: d.warehouseType,
    enabled: d.enabled,
  }));

export const marshalStartRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalStopRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

const defaultWarehouseOverrideFieldMaskSchema: FieldMaskSchema = {
  defaultWarehouseOverrideId: {wire: 'default_warehouse_override_id'},
  name: {wire: 'name'},
  type: {wire: 'type'},
  warehouseId: {wire: 'warehouse_id'},
};

export function defaultWarehouseOverrideFieldMask(
  ...paths: string[]
): FieldMask<DefaultWarehouseOverride> {
  return FieldMask.build<DefaultWarehouseOverride>(
    paths,
    defaultWarehouseOverrideFieldMaskSchema
  );
}
