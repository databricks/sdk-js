// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute, retryOn} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import type {
  ChangeClusterOwner,
  ChangeClusterOwner_Response,
  ClusterCompliance,
  ClusterInfo,
  CreateCluster,
  CreateCluster_Response,
  DeleteCluster,
  DeleteCluster_Response,
  EditCluster,
  EditCluster_Response,
  EnforcePolicyComplianceForCluster,
  EnforcePolicyComplianceForCluster_Response,
  GetCluster,
  GetPolicyComplianceForCluster,
  GetPolicyComplianceForCluster_Response,
  GetSparkVersions,
  GetSparkVersions_Response,
  ListAvailableZones,
  ListAvailableZones_Response,
  ListClusterComplianceForPolicy,
  ListClusterComplianceForPolicy_Response,
  ListClusters,
  ListClusters_Response,
  ListNodeTypes,
  ListNodeTypes_Response,
  PermanentDeleteCluster,
  PermanentDeleteCluster_Response,
  PinCluster,
  PinCluster_Response,
  ResizeCluster,
  ResizeCluster_Response,
  RestartCluster,
  RestartCluster_Response,
  StartCluster,
  StartCluster_Response,
  UnpinCluster,
  UnpinCluster_Response,
  UpdateCluster,
  UpdateCluster_Response,
} from './model';
import {
  ClusterState_ClusterState,
  marshalChangeClusterOwnerSchema,
  marshalCreateClusterSchema,
  marshalDeleteClusterSchema,
  marshalEditClusterSchema,
  marshalEnforcePolicyComplianceForClusterSchema,
  marshalPermanentDeleteClusterSchema,
  marshalPinClusterSchema,
  marshalResizeClusterSchema,
  marshalRestartClusterSchema,
  marshalStartClusterSchema,
  marshalUnpinClusterSchema,
  marshalUpdateClusterSchema,
  unmarshalChangeClusterOwner_ResponseSchema,
  unmarshalClusterInfoSchema,
  unmarshalCreateCluster_ResponseSchema,
  unmarshalDeleteCluster_ResponseSchema,
  unmarshalEditCluster_ResponseSchema,
  unmarshalEnforcePolicyComplianceForCluster_ResponseSchema,
  unmarshalGetPolicyComplianceForCluster_ResponseSchema,
  unmarshalGetSparkVersions_ResponseSchema,
  unmarshalListAvailableZones_ResponseSchema,
  unmarshalListClusterComplianceForPolicy_ResponseSchema,
  unmarshalListClusters_ResponseSchema,
  unmarshalListNodeTypes_ResponseSchema,
  unmarshalPermanentDeleteCluster_ResponseSchema,
  unmarshalPinCluster_ResponseSchema,
  unmarshalResizeCluster_ResponseSchema,
  unmarshalRestartCluster_ResponseSchema,
  unmarshalStartCluster_ResponseSchema,
  unmarshalUnpinCluster_ResponseSchema,
  unmarshalUpdateCluster_ResponseSchema,
} from './model';

class StillRunningError extends Error {}

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    this.httpClient = newHttpClient(options);
  }

  /** Change the owner of the cluster. You must be an admin and the cluster must be terminated to perform this operation. The service principal application ID can be supplied as an argument to `owner_username`. */
  async changeClusterOwner(
    signal: AbortSignal | undefined,
    req: ChangeClusterOwner,
    options?: Options
  ): Promise<ChangeClusterOwner_Response> {
    const url = `${this.host}/api/2.1/clusters/change-owner`;
    const body = marshalRequest(req, marshalChangeClusterOwnerSchema);
    let resp: ChangeClusterOwner_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalChangeClusterOwner_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new Spark cluster. This method will acquire new instances from the cloud provider
   * if necessary. This method is asynchronous; the returned ``cluster_id`` can be used to poll the
   * cluster status. When this method returns, the cluster will be in
   * a ``PENDING`` state. The cluster will be usable once it enters a ``RUNNING`` state.
   * Note: <Databricks> may not be able to acquire some of the requested nodes, due to cloud provider
   * limitations (account limits, spot price, etc.) or transient network issues.
   *
   * If <Databricks> acquires at least 85% of the requested on-demand nodes, cluster creation will succeed.
   * Otherwise the cluster will terminate with an informative error message.
   *
   * Rather than authoring the cluster's JSON definition from scratch, Databricks recommends filling out the
   * [create compute UI](/compute/configure.html) and then copying the generated JSON definition from the UI.
   */
  async createCluster(
    signal: AbortSignal | undefined,
    req: CreateCluster,
    options?: Options
  ): Promise<CreateCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/create`;
    const body = marshalRequest(req, marshalCreateClusterSchema);
    let resp: CreateCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateCluster_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createClusterWaiter(
    signal: AbortSignal | undefined,
    req: CreateCluster,
    options?: Options
  ): Promise<CreateClusterWaiter> {
    const resp = await this.createCluster(signal, req, options);
    if (resp.clusterId === undefined) {
      throw new Error(
        'response field clusterId required for polling is missing'
      );
    }
    return new CreateClusterWaiter(this, resp.clusterId);
  }

  /**
   * Terminates the Spark cluster with the specified ID. The cluster is removed asynchronously.
   * Once the termination has completed, the cluster will be in a `TERMINATED` state.
   * If the cluster is already in a `TERMINATING` or `TERMINATED` state, nothing will happen.
   */
  async deleteCluster(
    signal: AbortSignal | undefined,
    req: DeleteCluster,
    options?: Options
  ): Promise<DeleteCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/delete`;
    const body = marshalRequest(req, marshalDeleteClusterSchema);
    let resp: DeleteCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteCluster_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteClusterWaiter(
    signal: AbortSignal | undefined,
    req: DeleteCluster,
    options?: Options
  ): Promise<DeleteClusterWaiter> {
    await this.deleteCluster(signal, req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    return new DeleteClusterWaiter(this, req.clusterId);
  }

  /**
   * Updates the configuration of a cluster to match the provided attributes and size.
   * A cluster can be updated if it is in a `RUNNING` or `TERMINATED` state.
   *
   * If a cluster is updated while in a `RUNNING` state, it will be restarted so that the new attributes can take effect.
   *
   * If a cluster is updated while in a `TERMINATED` state, it will remain `TERMINATED`.
   * The next time it is started using the `clusters/start` API, the new attributes will take effect.
   * Any attempt to update a cluster in any other state will be rejected with an `INVALID_STATE` error code.
   *
   * Clusters created by the Databricks Jobs service cannot be edited.
   */
  async editCluster(
    signal: AbortSignal | undefined,
    req: EditCluster,
    options?: Options
  ): Promise<EditCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/edit`;
    const body = marshalRequest(req, marshalEditClusterSchema);
    let resp: EditCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEditCluster_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async editClusterWaiter(
    signal: AbortSignal | undefined,
    req: EditCluster,
    options?: Options
  ): Promise<EditClusterWaiter> {
    await this.editCluster(signal, req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    return new EditClusterWaiter(this, req.clusterId);
  }

  /**
   * Retrieves the information for a cluster given its identifier.
   * Clusters can be described while they are running, or up to 60 days after they are terminated.
   */
  async getCluster(
    signal: AbortSignal | undefined,
    req: GetCluster,
    options?: Options
  ): Promise<ClusterInfo> {
    const url = `${this.host}/api/2.1/clusters/get`;
    const params = new URLSearchParams();
    if (req.clusterId !== undefined) {
      params.append('cluster_id', req.clusterId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ClusterInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalClusterInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Returns a list of availability zones where clusters can be created in (For example, us-west-2a).
   * These zones can be used to launch a cluster.
   */
  async listAvailableZones(
    signal: AbortSignal | undefined,
    _req: ListAvailableZones,
    options?: Options
  ): Promise<ListAvailableZones_Response> {
    const url = `${this.host}/api/2.1/clusters/list-zones`;
    let resp: ListAvailableZones_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListAvailableZones_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Return information about all pinned and active clusters, and all clusters terminated within the last 30 days. Clusters terminated prior to this period are not included. */
  async listClusters(
    signal: AbortSignal | undefined,
    req: ListClusters,
    options?: Options
  ): Promise<ListClusters_Response> {
    const url = `${this.host}/api/2.1/clusters/list`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListClusters_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListClusters_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listClustersIter(
    signal: AbortSignal | undefined,
    req: ListClusters,
    options?: Options
  ): AsyncGenerator<ClusterInfo> {
    const pageReq: ListClusters = {...req};
    for (;;) {
      const resp = await this.listClusters(signal, pageReq, options);
      for (const item of resp.clusters ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Returns a list of supported Spark node types. These node types can be used to launch a cluster. */
  async listNodeTypes(
    signal: AbortSignal | undefined,
    _req: ListNodeTypes,
    options?: Options
  ): Promise<ListNodeTypes_Response> {
    const url = `${this.host}/api/2.1/clusters/list-node-types`;
    let resp: ListNodeTypes_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListNodeTypes_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the list of available Spark versions. These versions can be used to launch a cluster. */
  async listSparkVersions(
    signal: AbortSignal | undefined,
    _req: GetSparkVersions,
    options?: Options
  ): Promise<GetSparkVersions_Response> {
    const url = `${this.host}/api/2.1/clusters/spark-versions`;
    let resp: GetSparkVersions_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetSparkVersions_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Permanently deletes a Spark cluster. This cluster is terminated and resources are asynchronously removed.
   *
   * In addition, users will no longer see permanently deleted clusters in the cluster list, and API users can no longer
   * perform any action on permanently deleted clusters.
   */
  async permanentDeleteCluster(
    signal: AbortSignal | undefined,
    req: PermanentDeleteCluster,
    options?: Options
  ): Promise<PermanentDeleteCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/permanent-delete`;
    const body = marshalRequest(req, marshalPermanentDeleteClusterSchema);
    let resp: PermanentDeleteCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPermanentDeleteCluster_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Pinning a cluster ensures that the cluster will always be returned by the ListClusters API.
   * Pinning a cluster that is already pinned will have no effect.
   * This API can only be called by workspace admins.
   */
  async pinCluster(
    signal: AbortSignal | undefined,
    req: PinCluster,
    options?: Options
  ): Promise<PinCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/pin`;
    const body = marshalRequest(req, marshalPinClusterSchema);
    let resp: PinCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPinCluster_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Resizes a cluster to have a desired number of workers. This will fail unless the cluster is in a `RUNNING` state. */
  async resizeCluster(
    signal: AbortSignal | undefined,
    req: ResizeCluster,
    options?: Options
  ): Promise<ResizeCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/resize`;
    const body = marshalRequest(req, marshalResizeClusterSchema);
    let resp: ResizeCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResizeCluster_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async resizeClusterWaiter(
    signal: AbortSignal | undefined,
    req: ResizeCluster,
    options?: Options
  ): Promise<ResizeClusterWaiter> {
    await this.resizeCluster(signal, req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    return new ResizeClusterWaiter(this, req.clusterId);
  }

  /** Restarts a Spark cluster with the supplied ID. If the cluster is not currently in a `RUNNING` state, nothing will happen. */
  async restartCluster(
    signal: AbortSignal | undefined,
    req: RestartCluster,
    options?: Options
  ): Promise<RestartCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/restart`;
    const body = marshalRequest(req, marshalRestartClusterSchema);
    let resp: RestartCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestartCluster_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async restartClusterWaiter(
    signal: AbortSignal | undefined,
    req: RestartCluster,
    options?: Options
  ): Promise<RestartClusterWaiter> {
    await this.restartCluster(signal, req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    return new RestartClusterWaiter(this, req.clusterId);
  }

  /**
   * Starts a terminated Spark cluster with the supplied ID. This works similar to `createCluster` except:
   * - The previous cluster id and attributes are preserved.
   * - The cluster starts with the last specified cluster size.
   * - If the previous cluster was an autoscaling cluster, the current cluster starts with
   * the minimum number of nodes.
   * - If the cluster is not currently in a ``TERMINATED`` state, nothing will happen.
   * - Clusters launched to run a job cannot be started.
   */
  async startCluster(
    signal: AbortSignal | undefined,
    req: StartCluster,
    options?: Options
  ): Promise<StartCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/start`;
    const body = marshalRequest(req, marshalStartClusterSchema);
    let resp: StartCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStartCluster_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async startClusterWaiter(
    signal: AbortSignal | undefined,
    req: StartCluster,
    options?: Options
  ): Promise<StartClusterWaiter> {
    await this.startCluster(signal, req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    return new StartClusterWaiter(this, req.clusterId);
  }

  /**
   * Unpinning a cluster will allow the cluster to eventually be removed from the ListClusters API.
   * Unpinning a cluster that is not pinned will have no effect.
   * This API can only be called by workspace admins.
   */
  async unpinCluster(
    signal: AbortSignal | undefined,
    req: UnpinCluster,
    options?: Options
  ): Promise<UnpinCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/unpin`;
    const body = marshalRequest(req, marshalUnpinClusterSchema);
    let resp: UnpinCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUnpinCluster_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the configuration of a cluster to match the partial set of attributes and size.
   * Denote which fields to update using the `update_mask` field in the request body.
   * A cluster can be updated if it is in a `RUNNING` or `TERMINATED` state.
   * If a cluster is updated while in a `RUNNING` state, it will be restarted so that the new attributes can take effect.
   * If a cluster is updated while in a `TERMINATED` state, it will remain `TERMINATED`.
   * The updated attributes will take effect the next time the cluster is started using the `clusters/start` API.
   * Attempts to update a cluster in any other state will be rejected with an `INVALID_STATE` error code.
   * Clusters created by the Databricks Jobs service cannot be updated.
   */
  async updateCluster(
    signal: AbortSignal | undefined,
    req: UpdateCluster,
    options?: Options
  ): Promise<UpdateCluster_Response> {
    const url = `${this.host}/api/2.1/clusters/update`;
    const body = marshalRequest(req, marshalUpdateClusterSchema);
    let resp: UpdateCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateCluster_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateClusterWaiter(
    signal: AbortSignal | undefined,
    req: UpdateCluster,
    options?: Options
  ): Promise<UpdateClusterWaiter> {
    await this.updateCluster(signal, req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    return new UpdateClusterWaiter(this, req.clusterId);
  }

  /**
   * Updates a cluster to be compliant with the current version of its policy.
   * A cluster can be updated if it is in a `RUNNING` or `TERMINATED` state.
   *
   * If a cluster is updated while in a `RUNNING` state, it will be restarted so that the new attributes can take effect.
   *
   * If a cluster is updated while in a `TERMINATED` state, it will remain `TERMINATED`.
   * The next time the cluster is started, the new attributes will take effect.
   *
   * Clusters created by the Databricks Jobs, SDP, or Models services cannot be enforced by this API.
   * Instead, use the "Enforce job policy compliance" API to enforce policy compliance on jobs.
   */
  async enforcePolicyComplianceForCluster(
    signal: AbortSignal | undefined,
    req: EnforcePolicyComplianceForCluster,
    options?: Options
  ): Promise<EnforcePolicyComplianceForCluster_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/enforce-compliance`;
    const body = marshalRequest(
      req,
      marshalEnforcePolicyComplianceForClusterSchema
    );
    let resp: EnforcePolicyComplianceForCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalEnforcePolicyComplianceForCluster_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the policy compliance status of a cluster. Clusters could be out
   * of compliance if their policy was updated after the cluster was last edited.
   */
  async getPolicyComplianceForCluster(
    signal: AbortSignal | undefined,
    req: GetPolicyComplianceForCluster,
    options?: Options
  ): Promise<GetPolicyComplianceForCluster_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/get-compliance`;
    const params = new URLSearchParams();
    if (req.clusterId !== undefined) {
      params.append('cluster_id', req.clusterId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPolicyComplianceForCluster_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPolicyComplianceForCluster_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the policy compliance status of all clusters that use a
   * given policy. Clusters could be out of compliance if their policy was
   * updated after the cluster was last edited.
   */
  async listClusterComplianceForPolicy(
    signal: AbortSignal | undefined,
    req: ListClusterComplianceForPolicy,
    options?: Options
  ): Promise<ListClusterComplianceForPolicy_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/list-compliance`;
    const params = new URLSearchParams();
    if (req.policyId !== undefined) {
      params.append('policy_id', req.policyId);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListClusterComplianceForPolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListClusterComplianceForPolicy_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listClusterComplianceForPolicyIter(
    signal: AbortSignal | undefined,
    req: ListClusterComplianceForPolicy,
    options?: Options
  ): AsyncGenerator<ClusterCompliance> {
    const pageReq: ListClusterComplianceForPolicy = {...req};
    for (;;) {
      const resp = await this.listClusterComplianceForPolicy(
        signal,
        pageReq,
        options
      );
      for (const item of resp.clusters ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }
}

export class CreateClusterWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        callSignal,
        {
          clusterId: this.clusterId,
        },
        options
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ClusterState_ClusterState.RUNNING:
          result = pollResp;
          return;
        case ClusterState_ClusterState.ERROR:
        case ClusterState_ClusterState.TERMINATED: {
          const msg = pollResp.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getCluster(
      signal,
      {
        clusterId: this.clusterId,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ClusterState_ClusterState.RUNNING:
      case ClusterState_ClusterState.ERROR:
      case ClusterState_ClusterState.TERMINATED:
        return true;
      default:
        return false;
    }
  }
}

export class DeleteClusterWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        callSignal,
        {
          clusterId: this.clusterId,
        },
        options
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ClusterState_ClusterState.TERMINATED:
          result = pollResp;
          return;
        case ClusterState_ClusterState.ERROR: {
          const msg = pollResp.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getCluster(
      signal,
      {
        clusterId: this.clusterId,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ClusterState_ClusterState.TERMINATED:
      case ClusterState_ClusterState.ERROR:
        return true;
      default:
        return false;
    }
  }
}

export class EditClusterWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        callSignal,
        {
          clusterId: this.clusterId,
        },
        options
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ClusterState_ClusterState.RUNNING:
          result = pollResp;
          return;
        case ClusterState_ClusterState.ERROR:
        case ClusterState_ClusterState.TERMINATED: {
          const msg = pollResp.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getCluster(
      signal,
      {
        clusterId: this.clusterId,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ClusterState_ClusterState.RUNNING:
      case ClusterState_ClusterState.ERROR:
      case ClusterState_ClusterState.TERMINATED:
        return true;
      default:
        return false;
    }
  }
}

export class ResizeClusterWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        callSignal,
        {
          clusterId: this.clusterId,
        },
        options
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ClusterState_ClusterState.RUNNING:
          result = pollResp;
          return;
        case ClusterState_ClusterState.ERROR:
        case ClusterState_ClusterState.TERMINATED: {
          const msg = pollResp.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getCluster(
      signal,
      {
        clusterId: this.clusterId,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ClusterState_ClusterState.RUNNING:
      case ClusterState_ClusterState.ERROR:
      case ClusterState_ClusterState.TERMINATED:
        return true;
      default:
        return false;
    }
  }
}

export class RestartClusterWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        callSignal,
        {
          clusterId: this.clusterId,
        },
        options
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ClusterState_ClusterState.RUNNING:
          result = pollResp;
          return;
        case ClusterState_ClusterState.ERROR:
        case ClusterState_ClusterState.TERMINATED: {
          const msg = pollResp.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getCluster(
      signal,
      {
        clusterId: this.clusterId,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ClusterState_ClusterState.RUNNING:
      case ClusterState_ClusterState.ERROR:
      case ClusterState_ClusterState.TERMINATED:
        return true;
      default:
        return false;
    }
  }
}

export class StartClusterWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        callSignal,
        {
          clusterId: this.clusterId,
        },
        options
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ClusterState_ClusterState.RUNNING:
          result = pollResp;
          return;
        case ClusterState_ClusterState.ERROR:
        case ClusterState_ClusterState.TERMINATED: {
          const msg = pollResp.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getCluster(
      signal,
      {
        clusterId: this.clusterId,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ClusterState_ClusterState.RUNNING:
      case ClusterState_ClusterState.ERROR:
      case ClusterState_ClusterState.TERMINATED:
        return true;
      default:
        return false;
    }
  }
}

export class UpdateClusterWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        callSignal,
        {
          clusterId: this.clusterId,
        },
        options
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ClusterState_ClusterState.RUNNING:
          result = pollResp;
          return;
        case ClusterState_ClusterState.ERROR:
        case ClusterState_ClusterState.TERMINATED: {
          const msg = pollResp.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getCluster(
      signal,
      {
        clusterId: this.clusterId,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ClusterState_ClusterState.RUNNING:
      case ClusterState_ClusterState.ERROR:
      case ClusterState_ClusterState.TERMINATED:
        return true;
      default:
        return false;
    }
  }
}
