// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {LroOptions} from '@databricks/sdk-options/lro';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  ChangeClusterOwnerRequest,
  ChangeClusterOwnerResponse,
  ClusterCompliance,
  ClusterEvent,
  ClusterInfo,
  CreateClusterRequest,
  CreateClusterResponse,
  DeleteClusterRequest,
  DeleteClusterResponse,
  EditClusterRequest,
  EditClusterResponse,
  EnforcePolicyComplianceForClusterRequest,
  EnforcePolicyComplianceForClusterResponse,
  GetClusterRequest,
  GetEventsResponse,
  GetPolicyComplianceForClusterRequest,
  GetPolicyComplianceForClusterResponse,
  GetSparkVersionsRequest,
  GetSparkVersionsResponse,
  ListAvailableZonesRequest,
  ListAvailableZonesResponse,
  ListClusterComplianceForPolicyRequest,
  ListClusterComplianceForPolicyResponse,
  ListClustersRequest,
  ListClustersResponse,
  ListEventsRequest,
  ListNodeTypesRequest,
  ListNodeTypesResponse,
  PermanentDeleteClusterRequest,
  PermanentDeleteClusterResponse,
  PinClusterRequest,
  PinClusterResponse,
  ResizeClusterRequest,
  ResizeClusterResponse,
  RestartClusterRequest,
  RestartClusterResponse,
  StartClusterRequest,
  StartClusterResponse,
  UnpinClusterRequest,
  UnpinClusterResponse,
  UpdateClusterRequest,
  UpdateClusterResponse,
} from './model';
import {
  ClusterState_ClusterState,
  marshalChangeClusterOwnerRequestSchema,
  marshalCreateClusterRequestSchema,
  marshalDeleteClusterRequestSchema,
  marshalEditClusterRequestSchema,
  marshalEnforcePolicyComplianceForClusterRequestSchema,
  marshalListEventsRequestSchema,
  marshalPermanentDeleteClusterRequestSchema,
  marshalPinClusterRequestSchema,
  marshalResizeClusterRequestSchema,
  marshalRestartClusterRequestSchema,
  marshalStartClusterRequestSchema,
  marshalUnpinClusterRequestSchema,
  marshalUpdateClusterRequestSchema,
  unmarshalChangeClusterOwnerResponseSchema,
  unmarshalClusterInfoSchema,
  unmarshalCreateClusterResponseSchema,
  unmarshalDeleteClusterResponseSchema,
  unmarshalEditClusterResponseSchema,
  unmarshalEnforcePolicyComplianceForClusterResponseSchema,
  unmarshalGetEventsResponseSchema,
  unmarshalGetPolicyComplianceForClusterResponseSchema,
  unmarshalGetSparkVersionsResponseSchema,
  unmarshalListAvailableZonesResponseSchema,
  unmarshalListClusterComplianceForPolicyResponseSchema,
  unmarshalListClustersResponseSchema,
  unmarshalListNodeTypesResponseSchema,
  unmarshalPermanentDeleteClusterResponseSchema,
  unmarshalPinClusterResponseSchema,
  unmarshalResizeClusterResponseSchema,
  unmarshalRestartClusterResponseSchema,
  unmarshalStartClusterResponseSchema,
  unmarshalUnpinClusterResponseSchema,
  unmarshalUpdateClusterResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ClustersClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /**
   * Retrieves a list of events about the activity of a cluster.
   * This API is paginated. If there are more events to read, the response includes all the
   * parameters necessary to request the next page of events.
   */
  async listEvents(
    req: ListEventsRequest,
    options?: CallOptions
  ): Promise<GetEventsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/events`;
    const body = marshalRequest(req, marshalListEventsRequestSchema);
    let resp: GetEventsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetEventsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listEventsIter(
    req: ListEventsRequest,
    options?: CallOptions
  ): AsyncGenerator<ClusterEvent> {
    const pageReq: ListEventsRequest = {...req};
    for (;;) {
      const resp = await this.listEvents(pageReq, options);
      for (const item of resp.events ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Change the owner of the cluster. You must be an admin and the cluster must be terminated to perform this operation. The service principal application ID can be supplied as an argument to `owner_username`. */
  async changeClusterOwner(
    req: ChangeClusterOwnerRequest,
    options?: CallOptions
  ): Promise<ChangeClusterOwnerResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/change-owner`;
    const body = marshalRequest(req, marshalChangeClusterOwnerRequestSchema);
    let resp: ChangeClusterOwnerResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalChangeClusterOwnerResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
   * [create compute UI](https://docs.databricks.com/compute/configure.html) and then copying the generated JSON definition from the UI.
   */
  private async createClusterBase(
    req: CreateClusterRequest,
    options?: CallOptions
  ): Promise<CreateClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/create`;
    const body = marshalRequest(req, marshalCreateClusterRequestSchema);
    let resp: CreateClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateClusterResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    req: CreateClusterRequest,
    options?: CallOptions
  ): Promise<CreateClusterWaiter> {
    const resp = await this.createClusterBase(req, options);
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
  private async deleteClusterBase(
    req: DeleteClusterRequest,
    options?: CallOptions
  ): Promise<DeleteClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/delete`;
    const body = marshalRequest(req, marshalDeleteClusterRequestSchema);
    let resp: DeleteClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteClusterResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Terminates the Spark cluster with the specified ID. The cluster is removed asynchronously.
   * Once the termination has completed, the cluster will be in a `TERMINATED` state.
   * If the cluster is already in a `TERMINATING` or `TERMINATED` state, nothing will happen.
   */
  async deleteCluster(
    req: DeleteClusterRequest,
    options?: CallOptions
  ): Promise<DeleteClusterWaiter> {
    await this.deleteClusterBase(req, options);
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
  private async editClusterBase(
    req: EditClusterRequest,
    options?: CallOptions
  ): Promise<EditClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/edit`;
    const body = marshalRequest(req, marshalEditClusterRequestSchema);
    let resp: EditClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEditClusterResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
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
    req: EditClusterRequest,
    options?: CallOptions
  ): Promise<EditClusterWaiter> {
    await this.editClusterBase(req, options);
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
    req: GetClusterRequest,
    options?: CallOptions
  ): Promise<ClusterInfo> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/get`;
    const params = new URLSearchParams();
    if (req.clusterId !== undefined) {
      params.append('cluster_id', req.clusterId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ClusterInfo | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalClusterInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Returns a list of availability zones where clusters can be created in (For example, us-west-2a).
   * These zones can be used to launch a cluster.
   */
  async listAvailableZones(
    _req: ListAvailableZonesRequest,
    options?: CallOptions
  ): Promise<ListAvailableZonesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/list-zones`;
    let resp: ListAvailableZonesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListAvailableZonesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Return information about all pinned and active clusters, and all clusters terminated within the last 30 days. Clusters terminated prior to this period are not included. */
  async listClusters(
    req: ListClustersRequest,
    options?: CallOptions
  ): Promise<ListClustersResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/list`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListClustersResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListClustersResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listClustersIter(
    req: ListClustersRequest,
    options?: CallOptions
  ): AsyncGenerator<ClusterInfo> {
    const pageReq: ListClustersRequest = {...req};
    for (;;) {
      const resp = await this.listClusters(pageReq, options);
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
    _req: ListNodeTypesRequest,
    options?: CallOptions
  ): Promise<ListNodeTypesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/list-node-types`;
    let resp: ListNodeTypesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListNodeTypesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Returns the list of available Spark versions. These versions can be used to launch a cluster. */
  async listSparkVersions(
    _req: GetSparkVersionsRequest,
    options?: CallOptions
  ): Promise<GetSparkVersionsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/spark-versions`;
    let resp: GetSparkVersionsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetSparkVersionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    req: PermanentDeleteClusterRequest,
    options?: CallOptions
  ): Promise<PermanentDeleteClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/permanent-delete`;
    const body = marshalRequest(
      req,
      marshalPermanentDeleteClusterRequestSchema
    );
    let resp: PermanentDeleteClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPermanentDeleteClusterResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Pinning a cluster ensures that the cluster will always be returned by the ListClusters API.
   * Pinning a cluster that is already pinned will have no effect.
   * This API can only be called by workspace admins.
   */
  async pinCluster(
    req: PinClusterRequest,
    options?: CallOptions
  ): Promise<PinClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/pin`;
    const body = marshalRequest(req, marshalPinClusterRequestSchema);
    let resp: PinClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPinClusterResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Resizes a cluster to have a desired number of workers. This will fail unless the cluster is in a `RUNNING` state. */
  private async resizeClusterBase(
    req: ResizeClusterRequest,
    options?: CallOptions
  ): Promise<ResizeClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/resize`;
    const body = marshalRequest(req, marshalResizeClusterRequestSchema);
    let resp: ResizeClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResizeClusterResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Resizes a cluster to have a desired number of workers. This will fail unless the cluster is in a `RUNNING` state. */
  async resizeCluster(
    req: ResizeClusterRequest,
    options?: CallOptions
  ): Promise<ResizeClusterWaiter> {
    await this.resizeClusterBase(req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    return new ResizeClusterWaiter(this, req.clusterId);
  }

  /** Restarts a Spark cluster with the supplied ID. If the cluster is not currently in a `RUNNING` state, nothing will happen. */
  private async restartClusterBase(
    req: RestartClusterRequest,
    options?: CallOptions
  ): Promise<RestartClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/restart`;
    const body = marshalRequest(req, marshalRestartClusterRequestSchema);
    let resp: RestartClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestartClusterResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Restarts a Spark cluster with the supplied ID. If the cluster is not currently in a `RUNNING` state, nothing will happen. */
  async restartCluster(
    req: RestartClusterRequest,
    options?: CallOptions
  ): Promise<RestartClusterWaiter> {
    await this.restartClusterBase(req, options);
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
  private async startClusterBase(
    req: StartClusterRequest,
    options?: CallOptions
  ): Promise<StartClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/start`;
    const body = marshalRequest(req, marshalStartClusterRequestSchema);
    let resp: StartClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStartClusterResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
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
    req: StartClusterRequest,
    options?: CallOptions
  ): Promise<StartClusterWaiter> {
    await this.startClusterBase(req, options);
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
    req: UnpinClusterRequest,
    options?: CallOptions
  ): Promise<UnpinClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/unpin`;
    const body = marshalRequest(req, marshalUnpinClusterRequestSchema);
    let resp: UnpinClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUnpinClusterResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
  private async updateClusterBase(
    req: UpdateClusterRequest,
    options?: CallOptions
  ): Promise<UpdateClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/clusters/update`;
    const body = marshalRequest(req, marshalUpdateClusterRequestSchema);
    let resp: UpdateClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateClusterResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    req: UpdateClusterRequest,
    options?: CallOptions
  ): Promise<UpdateClusterWaiter> {
    await this.updateClusterBase(req, options);
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
    req: EnforcePolicyComplianceForClusterRequest,
    options?: CallOptions
  ): Promise<EnforcePolicyComplianceForClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/clusters/enforce-compliance`;
    const body = marshalRequest(
      req,
      marshalEnforcePolicyComplianceForClusterRequestSchema
    );
    let resp: EnforcePolicyComplianceForClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalEnforcePolicyComplianceForClusterResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the policy compliance status of a cluster. Clusters could be out
   * of compliance if their policy was updated after the cluster was last edited.
   */
  async getPolicyComplianceForCluster(
    req: GetPolicyComplianceForClusterRequest,
    options?: CallOptions
  ): Promise<GetPolicyComplianceForClusterResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/clusters/get-compliance`;
    const params = new URLSearchParams();
    if (req.clusterId !== undefined) {
      params.append('cluster_id', req.clusterId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPolicyComplianceForClusterResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPolicyComplianceForClusterResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the policy compliance status of all clusters that use a
   * given policy. Clusters could be out of compliance if their policy was
   * updated after the cluster was last edited.
   */
  async listClusterComplianceForPolicy(
    req: ListClusterComplianceForPolicyRequest,
    options?: CallOptions
  ): Promise<ListClusterComplianceForPolicyResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/clusters/list-compliance`;
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
    let resp: ListClusterComplianceForPolicyResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListClusterComplianceForPolicyResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listClusterComplianceForPolicyIter(
    req: ListClusterComplianceForPolicyRequest,
    options?: CallOptions
  ): AsyncGenerator<ClusterCompliance> {
    const pageReq: ListClusterComplianceForPolicyRequest = {...req};
    for (;;) {
      const resp = await this.listClusterComplianceForPolicy(pageReq, options);
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
    private readonly client: ClustersClient,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        {
          clusterId: this.clusterId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getCluster(
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
    private readonly client: ClustersClient,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        {
          clusterId: this.clusterId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getCluster(
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
    private readonly client: ClustersClient,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        {
          clusterId: this.clusterId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getCluster(
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
    private readonly client: ClustersClient,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        {
          clusterId: this.clusterId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getCluster(
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
    private readonly client: ClustersClient,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        {
          clusterId: this.clusterId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getCluster(
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
    private readonly client: ClustersClient,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        {
          clusterId: this.clusterId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getCluster(
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
    private readonly client: ClustersClient,
    readonly clusterId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<ClusterInfo> {
    let result: ClusterInfo | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getCluster(
        {
          clusterId: this.clusterId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getCluster(
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
