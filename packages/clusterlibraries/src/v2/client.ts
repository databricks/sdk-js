// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
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
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  ClusterLibraryStatuses,
  ClusterStatus,
  CreateDefaultBaseEnvironmentRequest,
  DefaultBaseEnvironment,
  DeleteDefaultBaseEnvironmentRequest,
  GetDefaultBaseEnvironmentRequest,
  InstallLibraries,
  InstallLibraries_Response,
  ListAllClusterLibraryStatuses,
  ListAllClusterLibraryStatuses_Response,
  ListDefaultBaseEnvironmentsRequest,
  ListDefaultBaseEnvironmentsResponse,
  RefreshDefaultBaseEnvironmentsRequest,
  RefreshDefaultBaseEnvironmentsResponse,
  UninstallLibraries,
  UninstallLibraries_Response,
  UpdateDefaultBaseEnvironmentRequest,
  UpdateDefaultDefaultBaseEnvironmentRequest,
} from './model';
import {
  marshalCreateDefaultBaseEnvironmentRequestSchema,
  marshalInstallLibrariesSchema,
  marshalRefreshDefaultBaseEnvironmentsRequestSchema,
  marshalUninstallLibrariesSchema,
  marshalUpdateDefaultBaseEnvironmentRequestSchema,
  marshalUpdateDefaultDefaultBaseEnvironmentRequestSchema,
  unmarshalClusterLibraryStatusesSchema,
  unmarshalDefaultBaseEnvironmentSchema,
  unmarshalInstallLibraries_ResponseSchema,
  unmarshalListAllClusterLibraryStatuses_ResponseSchema,
  unmarshalListDefaultBaseEnvironmentsResponseSchema,
  unmarshalRefreshDefaultBaseEnvironmentsResponseSchema,
  unmarshalUninstallLibraries_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    let info = createDefault().with(PACKAGE_SEGMENT);
    if (options.credentials !== undefined) {
      info = info
        .with({key: 'sdk-auth', value: AUTH_VERSION})
        .with({key: 'auth', value: options.credentials.name()});
    }
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Get the status of all libraries on all clusters. A status is returned for all libraries installed on this cluster
   * via the API or the libraries UI.
   */
  async allClusterStatuses(
    signal: AbortSignal | undefined,
    _req: ListAllClusterLibraryStatuses,
    options?: Options
  ): Promise<ListAllClusterLibraryStatuses_Response> {
    const url = `${this.host}/api/2.0/libraries/all-cluster-statuses`;
    let resp: ListAllClusterLibraryStatuses_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListAllClusterLibraryStatuses_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: ClusterStatus,
    options?: Options
  ): Promise<ClusterLibraryStatuses> {
    const url = `${this.host}/api/2.0/libraries/cluster-status`;
    const params = new URLSearchParams();
    if (req.clusterId !== undefined) {
      params.append('cluster_id', req.clusterId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ClusterLibraryStatuses | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalClusterLibraryStatusesSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Create a default base environment within workspaces to define the environment version and a list of dependencies
   * to be used in serverless notebooks and jobs. This process will asynchronously generate a cache to
   * optimize dependency resolution.
   */
  async createDefaultBaseEnvironment(
    signal: AbortSignal | undefined,
    req: CreateDefaultBaseEnvironmentRequest,
    options?: Options
  ): Promise<DefaultBaseEnvironment> {
    const url = `${this.host}/api/2.0/default-base-environments`;
    const body = marshalRequest(
      req,
      marshalCreateDefaultBaseEnvironmentRequestSchema
    );
    let resp: DefaultBaseEnvironment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultBaseEnvironmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Delete the default base environment given an ID. The default base environment may be used by downstream workloads.
   * Please ensure that the deletion is intentional.
   */
  async deleteDefaultBaseEnvironment(
    signal: AbortSignal | undefined,
    req: DeleteDefaultBaseEnvironmentRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/default-base-environments/${req.id ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Return the default base environment details for a given ID. */
  async getDefaultBaseEnvironment(
    signal: AbortSignal | undefined,
    req: GetDefaultBaseEnvironmentRequest,
    options?: Options
  ): Promise<DefaultBaseEnvironment> {
    const url = `${this.host}/api/2.0/default-base-environments:getDefaultBaseEnvironment`;
    const params = new URLSearchParams();
    if (req.id !== undefined) {
      params.append('id', req.id);
    }
    if (req.traceId !== undefined) {
      params.append('trace_id', req.traceId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DefaultBaseEnvironment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultBaseEnvironmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Add libraries to install on a cluster. The installation is asynchronous; it happens in
   * the background after the completion of this request.
   */
  async installLibraries(
    signal: AbortSignal | undefined,
    req: InstallLibraries,
    options?: Options
  ): Promise<InstallLibraries_Response> {
    const url = `${this.host}/api/2.0/libraries/install`;
    const body = marshalRequest(req, marshalInstallLibrariesSchema);
    let resp: InstallLibraries_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInstallLibraries_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List default base environments defined in the workspaces for the requested user. */
  async listDefaultBaseEnvironments(
    signal: AbortSignal | undefined,
    req: ListDefaultBaseEnvironmentsRequest,
    options?: Options
  ): Promise<ListDefaultBaseEnvironmentsResponse> {
    const url = `${this.host}/api/2.0/default-base-environments`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDefaultBaseEnvironmentsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListDefaultBaseEnvironmentsResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listDefaultBaseEnvironmentsIter(
    signal: AbortSignal | undefined,
    req: ListDefaultBaseEnvironmentsRequest,
    options?: Options
  ): AsyncGenerator<DefaultBaseEnvironment> {
    const pageReq: ListDefaultBaseEnvironmentsRequest = {...req};
    for (;;) {
      const resp = await this.listDefaultBaseEnvironments(
        signal,
        pageReq,
        options
      );
      for (const item of resp.defaultBaseEnvironments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Refresh the cached default base environments for the given IDs. This process will asynchronously regenerate the caches.
   * The existing caches remains available until it expires.
   */
  async refreshDefaultBaseEnvironments(
    signal: AbortSignal | undefined,
    req: RefreshDefaultBaseEnvironmentsRequest,
    options?: Options
  ): Promise<RefreshDefaultBaseEnvironmentsResponse> {
    const url = `${this.host}/api/2.0/default-base-environments/refresh`;
    const body = marshalRequest(
      req,
      marshalRefreshDefaultBaseEnvironmentsRequestSchema
    );
    let resp: RefreshDefaultBaseEnvironmentsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalRefreshDefaultBaseEnvironmentsResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Set libraries to uninstall from a cluster. The libraries won't be uninstalled until
   * the cluster is restarted. A request to uninstall a library that is not currently installed is ignored.
   */
  async uninstallLibraries(
    signal: AbortSignal | undefined,
    req: UninstallLibraries,
    options?: Options
  ): Promise<UninstallLibraries_Response> {
    const url = `${this.host}/api/2.0/libraries/uninstall`;
    const body = marshalRequest(req, marshalUninstallLibrariesSchema);
    let resp: UninstallLibraries_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUninstallLibraries_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Update the default base environment for the given ID. This process will asynchronously regenerate the cache.
   * The existing cache remains available until it expires.
   */
  async updateDefaultBaseEnvironment(
    signal: AbortSignal | undefined,
    req: UpdateDefaultBaseEnvironmentRequest,
    options?: Options
  ): Promise<DefaultBaseEnvironment> {
    const url = `${this.host}/api/2.0/default-base-environments/${req.id ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateDefaultBaseEnvironmentRequestSchema
    );
    let resp: DefaultBaseEnvironment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultBaseEnvironmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Set the default base environment for the workspace. This marks the specified DBE as the workspace default. */
  async updateDefaultDefaultBaseEnvironment(
    signal: AbortSignal | undefined,
    req: UpdateDefaultDefaultBaseEnvironmentRequest,
    options?: Options
  ): Promise<DefaultBaseEnvironment> {
    const url = `${this.host}/api/2.0/default-base-environments:setDefault`;
    const body = marshalRequest(
      req,
      marshalUpdateDefaultDefaultBaseEnvironmentRequestSchema
    );
    let resp: DefaultBaseEnvironment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultBaseEnvironmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
