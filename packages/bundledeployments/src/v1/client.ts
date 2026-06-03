// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CompleteVersionRequest,
  CreateDeploymentRequest,
  CreateOperationRequest,
  CreateVersionRequest,
  DeleteDeploymentRequest,
  Deployment,
  GetDeploymentRequest,
  GetOperationRequest,
  GetResourceRequest,
  GetVersionRequest,
  HeartbeatRequest,
  HeartbeatResponse,
  ListDeploymentsRequest,
  ListDeploymentsResponse,
  ListOperationsRequest,
  ListOperationsResponse,
  ListResourcesRequest,
  ListResourcesResponse,
  ListVersionsRequest,
  ListVersionsResponse,
  Operation,
  Resource,
  Version,
} from './model';
import {
  marshalCompleteVersionRequestSchema,
  marshalDeploymentSchema,
  marshalHeartbeatRequestSchema,
  marshalOperationSchema,
  marshalVersionSchema,
  unmarshalDeploymentSchema,
  unmarshalHeartbeatResponseSchema,
  unmarshalListDeploymentsResponseSchema,
  unmarshalListOperationsResponseSchema,
  unmarshalListResourcesResponseSchema,
  unmarshalListVersionsResponseSchema,
  unmarshalOperationSchema,
  unmarshalResourceSchema,
  unmarshalVersionSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class BundleDeploymentsClient {
  private readonly host: string;
  // Workspace ID used to route workspace-level calls on unified hosts (SPOG).
  // When set, workspace-level methods send X-Databricks-Org-Id on every
  // request.
  private readonly workspaceId: string | undefined;
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
    this.workspaceId = options.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Marks a version as complete and releases the deployment lock.
   *
   * The server atomically:
   * 1. Sets the version status to the provided terminal status.
   * 2. Sets `complete_time` to the current server timestamp.
   * 3. Releases the lock on the parent deployment.
   * 4. Updates the parent deployment's `status` and `last_version_id`.
   */
  async completeVersion(
    req: CompleteVersionRequest,
    options?: CallOptions
  ): Promise<Version> {
    const url = `${this.host}/api/2.0/bundle/${req.name ?? ''}/complete`;
    const body = marshalRequest(req, marshalCompleteVersionRequestSchema);
    let resp: Version | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalVersionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new deployment in the workspace.
   *
   * The caller must provide a `deployment_id` which becomes the final
   * component of the deployment's resource name. If a deployment with the
   * same ID already exists, the server returns `ALREADY_EXISTS`.
   */
  async createDeployment(
    req: CreateDeploymentRequest,
    options?: CallOptions
  ): Promise<Deployment> {
    const url = `${this.host}/api/2.0/bundle/deployments`;
    const params = new URLSearchParams();
    if (req.deploymentId !== undefined) {
      params.append('deployment_id', req.deploymentId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.deployment, marshalDeploymentSchema);
    let resp: Deployment | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeploymentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a resource operation under a version.
   *
   * The caller must provide a `resource_key` which becomes the final
   * component of the operation's name. If an operation with the same key
   * already exists under the version, the server returns `ALREADY_EXISTS`.
   *
   * On success the server also updates the corresponding deployment-level
   * Resource (creating it if this is the first operation for that
   * resource_key, or removing it if action_type is DELETE).
   */
  async createOperation(
    req: CreateOperationRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/bundle/${req.parent ?? ''}/operations`;
    const params = new URLSearchParams();
    if (req.resourceKey !== undefined) {
      params.append('resource_key', req.resourceKey);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.operation, marshalOperationSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new version under a deployment.
   *
   * Creating a version acquires an exclusive lock on the deployment,
   * preventing concurrent deploys. The caller provides a `version_id`
   * which the server validates equals `last_version_id + 1` on the
   * deployment.
   */
  async createVersion(
    req: CreateVersionRequest,
    options?: CallOptions
  ): Promise<Version> {
    const url = `${this.host}/api/2.0/bundle/${req.parent ?? ''}/versions`;
    const params = new URLSearchParams();
    if (req.versionId !== undefined) {
      params.append('version_id', req.versionId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.version, marshalVersionSchema);
    let resp: Version | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalVersionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a deployment.
   *
   * The deployment is marked as deleted. It and all its children (versions
   * and their operations) will be permanently deleted after the retention
   * policy expires. If the deployment has an in-progress version, the
   * server returns `RESOURCE_CONFLICT`.
   */
  async deleteDeployment(
    req: DeleteDeploymentRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/bundle/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Retrieves a deployment by its resource name. */
  async getDeployment(
    req: GetDeploymentRequest,
    options?: CallOptions
  ): Promise<Deployment> {
    const url = `${this.host}/api/2.0/bundle/${req.name ?? ''}`;
    let resp: Deployment | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeploymentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves a resource operation by its resource name. */
  async getOperation(
    req: GetOperationRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/bundle/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves a deployment resource by its resource name. */
  async getResource(
    req: GetResourceRequest,
    options?: CallOptions
  ): Promise<Resource> {
    const url = `${this.host}/api/2.0/bundle/${req.name ?? ''}`;
    let resp: Resource | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResourceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves a version by its resource name. */
  async getVersion(
    req: GetVersionRequest,
    options?: CallOptions
  ): Promise<Version> {
    const url = `${this.host}/api/2.0/bundle/${req.name ?? ''}`;
    let resp: Version | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalVersionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Sends a heartbeat to renew the lock held by a version.
   *
   * The server validates that the version is the active (non-terminal)
   * version on the parent deployment and resets the lock expiry. If the
   * lock has already expired or the version is no longer active, the
   * server returns `ABORTED`.
   */
  async heartbeat(
    req: HeartbeatRequest,
    options?: CallOptions
  ): Promise<HeartbeatResponse> {
    const url = `${this.host}/api/2.0/bundle/${req.name ?? ''}/heartbeat`;
    const body = marshalRequest(req, marshalHeartbeatRequestSchema);
    let resp: HeartbeatResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalHeartbeatResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists deployments in the workspace. */
  async listDeployments(
    req: ListDeploymentsRequest,
    options?: CallOptions
  ): Promise<ListDeploymentsResponse> {
    const url = `${this.host}/api/2.0/bundle/deployments`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDeploymentsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListDeploymentsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listDeploymentsIter(
    req: ListDeploymentsRequest,
    options?: CallOptions
  ): AsyncGenerator<Deployment> {
    const pageReq: ListDeploymentsRequest = {...req};
    for (;;) {
      const resp = await this.listDeployments(pageReq, options);
      for (const item of resp.deployments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists resource operations under a version. */
  async listOperations(
    req: ListOperationsRequest,
    options?: CallOptions
  ): Promise<ListOperationsResponse> {
    const url = `${this.host}/api/2.0/bundle/${req.parent ?? ''}/operations`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListOperationsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListOperationsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listOperationsIter(
    req: ListOperationsRequest,
    options?: CallOptions
  ): AsyncGenerator<Operation> {
    const pageReq: ListOperationsRequest = {...req};
    for (;;) {
      const resp = await this.listOperations(pageReq, options);
      for (const item of resp.operations ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists resources under a deployment. */
  async listResources(
    req: ListResourcesRequest,
    options?: CallOptions
  ): Promise<ListResourcesResponse> {
    const url = `${this.host}/api/2.0/bundle/${req.parent ?? ''}/resources`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListResourcesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListResourcesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listResourcesIter(
    req: ListResourcesRequest,
    options?: CallOptions
  ): AsyncGenerator<Resource> {
    const pageReq: ListResourcesRequest = {...req};
    for (;;) {
      const resp = await this.listResources(pageReq, options);
      for (const item of resp.resources ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Lists versions under a deployment, ordered by version_id descending
   * (most recent first).
   */
  async listVersions(
    req: ListVersionsRequest,
    options?: CallOptions
  ): Promise<ListVersionsResponse> {
    const url = `${this.host}/api/2.0/bundle/${req.parent ?? ''}/versions`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListVersionsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListVersionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listVersionsIter(
    req: ListVersionsRequest,
    options?: CallOptions
  ): AsyncGenerator<Version> {
    const pageReq: ListVersionsRequest = {...req};
    for (;;) {
      const resp = await this.listVersions(pageReq, options);
      for (const item of resp.versions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }
}
