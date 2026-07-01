// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  ClusterLibraryStatuses,
  ClusterStatusRequest,
  InstallLibrariesRequest,
  InstallLibrariesResponse,
  ListAllClusterLibraryStatusesRequest,
  ListAllClusterLibraryStatusesResponse,
  UninstallLibrariesRequest,
  UninstallLibrariesResponse,
} from './model';
import {
  marshalInstallLibrariesRequestSchema,
  marshalUninstallLibrariesRequestSchema,
  unmarshalClusterLibraryStatusesSchema,
  unmarshalInstallLibrariesResponseSchema,
  unmarshalListAllClusterLibraryStatusesResponseSchema,
  unmarshalUninstallLibrariesResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ClusterLibrariesClient {
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
   * Get the status of all libraries on all clusters. A status is returned for all libraries installed on this cluster
   * via the API or the libraries UI.
   */
  async allClusterStatuses(
    _req: ListAllClusterLibraryStatusesRequest,
    options?: CallOptions
  ): Promise<ListAllClusterLibraryStatusesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/libraries/all-cluster-statuses`;
    let resp: ListAllClusterLibraryStatusesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListAllClusterLibraryStatusesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get the status of libraries on a cluster. A status is returned for all libraries installed on this cluster via the API
   * or the libraries UI.
   * The order of returned libraries is as follows:
   * 1. Libraries set to be installed on this cluster, in the order that the libraries were added
   * to the cluster, are returned first.
   * 2. Libraries that were previously requested to be installed on this cluster or,
   * but are now marked for removal, in no particular order, are returned last.
   */
  async clusterStatus(
    req: ClusterStatusRequest,
    options?: CallOptions
  ): Promise<ClusterLibraryStatuses> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/libraries/cluster-status`;
    const params = new URLSearchParams();
    if (req.clusterId !== undefined) {
      params.append('cluster_id', req.clusterId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ClusterLibraryStatuses | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalClusterLibraryStatusesSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Add libraries to install on a cluster. The installation is asynchronous; it happens in
   * the background after the completion of this request.
   */
  async installLibraries(
    req: InstallLibrariesRequest,
    options?: CallOptions
  ): Promise<InstallLibrariesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/libraries/install`;
    const body = marshalRequest(req, marshalInstallLibrariesRequestSchema);
    let resp: InstallLibrariesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInstallLibrariesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Set libraries to uninstall from a cluster. The libraries won't be uninstalled until
   * the cluster is restarted. A request to uninstall a library that is not currently installed is ignored.
   */
  async uninstallLibraries(
    req: UninstallLibrariesRequest,
    options?: CallOptions
  ): Promise<UninstallLibrariesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/libraries/uninstall`;
    const body = marshalRequest(req, marshalUninstallLibrariesRequestSchema);
    let resp: UninstallLibrariesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUninstallLibrariesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
