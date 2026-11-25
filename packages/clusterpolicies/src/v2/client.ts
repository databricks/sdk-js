// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  encodePathVariable,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  ComputePolicy,
  CreateComputePolicyRequest,
  CreatePolicyRequest,
  CreatePolicyResponse,
  DeleteComputePolicyRequest,
  DeletePolicyRequest,
  DeletePolicyResponse,
  EditPolicyRequest,
  EditPolicyResponse,
  GetComputePolicyRequest,
  GetPolicyRequest,
  ListComputePoliciesRequest,
  ListComputePoliciesResponse,
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListServerlessComputesRequest,
  ListServerlessComputesResponse,
  Policy,
  ServerlessCompute,
  UpdateComputePolicyRequest,
} from './model';
import {
  marshalComputePolicySchema,
  marshalCreatePolicyRequestSchema,
  marshalDeletePolicyRequestSchema,
  marshalEditPolicyRequestSchema,
  unmarshalComputePolicySchema,
  unmarshalCreatePolicyResponseSchema,
  unmarshalDeletePolicyResponseSchema,
  unmarshalEditPolicyResponseSchema,
  unmarshalListComputePoliciesResponseSchema,
  unmarshalListPoliciesResponseSchema,
  unmarshalListServerlessComputesResponseSchema,
  unmarshalPolicySchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ClusterPoliciesClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
    return this.config;
  }

  /** Creates a new policy with prescribed settings. */
  async createPolicy(
    req: CreatePolicyRequest,
    options?: CallOptions
  ): Promise<CreatePolicyResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/clusters/create`;
    const body = marshalRequest(req, marshalCreatePolicyRequestSchema);
    let resp: CreatePolicyResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreatePolicyResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a policy for a cluster. Clusters governed by this policy can still run, but cannot be edited. */
  async deletePolicy(
    req: DeletePolicyRequest,
    options?: CallOptions
  ): Promise<DeletePolicyResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/clusters/delete`;
    const body = marshalRequest(req, marshalDeletePolicyRequestSchema);
    let resp: DeletePolicyResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeletePolicyResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update an existing policy for cluster. This operation may make some clusters governed by the previous policy invalid. */
  async editPolicy(
    req: EditPolicyRequest,
    options?: CallOptions
  ): Promise<EditPolicyResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/clusters/edit`;
    const body = marshalRequest(req, marshalEditPolicyRequestSchema);
    let resp: EditPolicyResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEditPolicyResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a cluster policy entity. Creation and editing is available to admins only. */
  async getPolicy(
    req: GetPolicyRequest,
    options?: CallOptions
  ): Promise<Policy> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/clusters/get`;
    const params = new URLSearchParams();
    if (req.policyId !== undefined) {
      params.append('policy_id', req.policyId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Policy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Returns a list of policies accessible by the requesting user. */
  async listPolicies(
    req: ListPoliciesRequest,
    options?: CallOptions
  ): Promise<ListPoliciesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/clusters/list`;
    const params = new URLSearchParams();
    if (req.sortOrder !== undefined) {
      params.append('sort_order', req.sortOrder);
    }
    if (req.sortColumn !== undefined) {
      params.append('sort_column', req.sortColumn);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPoliciesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListPoliciesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a custom compute policy in the workspace. */
  async createComputePolicy(
    req: CreateComputePolicyRequest,
    options?: CallOptions
  ): Promise<ComputePolicy> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/compute`;
    const body =
      req.computePolicy === undefined
        ? 'null'
        : marshalRequest(req.computePolicy, marshalComputePolicySchema);
    let resp: ComputePolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalComputePolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a custom compute policy in the workspace. Default (system-provisioned) policies cannot
   * be deleted.
   */
  async deleteComputePolicy(
    req: DeleteComputePolicyRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.computePolicyId === undefined) {
      throw new Error('path parameter "compute_policy_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/compute/${encodePathVariable(req.computePolicyId)}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Retrieves a compute policy by its ID. */
  async getComputePolicy(
    req: GetComputePolicyRequest,
    options?: CallOptions
  ): Promise<ComputePolicy> {
    if (req.computePolicyId === undefined) {
      throw new Error('path parameter "compute_policy_id" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/compute/${encodePathVariable(req.computePolicyId)}`;
    let resp: ComputePolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalComputePolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists compute policies in the workspace. Results are returned in an unspecified order; callers
   * should sort client-side if a specific order is needed.
   */
  async listComputePolicies(
    req: ListComputePoliciesRequest,
    options?: CallOptions
  ): Promise<ListComputePoliciesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/compute`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListComputePoliciesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListComputePoliciesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listComputePoliciesIter(
    req: ListComputePoliciesRequest,
    options?: CallOptions
  ): AsyncGenerator<ComputePolicy> {
    const pageReq: ListComputePoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listComputePolicies(pageReq, options);
      for (const item of resp.computePolicies ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Lists Interactive serverless computes that the caller can use or manage.
   * Results are returned in an unspecified order.
   */
  async listServerlessComputes(
    req: ListServerlessComputesRequest,
    options?: CallOptions
  ): Promise<ListServerlessComputesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serverless-compute`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListServerlessComputesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListServerlessComputesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listServerlessComputesIter(
    req: ListServerlessComputesRequest,
    options?: CallOptions
  ): AsyncGenerator<ServerlessCompute> {
    const pageReq: ListServerlessComputesRequest = {...req};
    for (;;) {
      const resp = await this.listServerlessComputes(pageReq, options);
      for (const item of resp.serverlessComputes ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates a custom compute policy in the workspace. The display_name and allowed_compute_products
   * are mutable; use update_mask to control which fields change. Default (system-provisioned)
   * policies cannot be updated.
   */
  async updateComputePolicy(
    req: UpdateComputePolicyRequest,
    options?: CallOptions
  ): Promise<ComputePolicy> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/compute/${encodePathVariable(req.computePolicy?.computePolicyId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.computePolicy === undefined
        ? 'null'
        : marshalRequest(req.computePolicy, marshalComputePolicySchema);
    let resp: ComputePolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalComputePolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
