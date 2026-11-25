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
  CreatePolicyRequest,
  DeletePolicyRequest,
  DeletePolicyResponse,
  GetPolicyRequest,
  ListPoliciesRequest,
  ListPoliciesResponse,
  PolicyInfo,
  UpdatePolicyRequest,
} from './model';
import {
  marshalPolicyInfoSchema,
  unmarshalDeletePolicyResponseSchema,
  unmarshalListPoliciesResponseSchema,
  unmarshalPolicyInfoSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class AbacPoliciesClient {
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

  /**
   * Creates a new policy on a securable.
   * The new policy applies to the securable and all its descendants.
   */
  async createPolicy(
    req: CreatePolicyRequest,
    options?: CallOptions
  ): Promise<PolicyInfo> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/policies`;
    const body =
      req.policyInfo === undefined
        ? 'null'
        : marshalRequest(req.policyInfo, marshalPolicyInfoSchema);
    let resp: PolicyInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalPolicyInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete an ABAC policy defined on a securable. */
  async deletePolicy(
    req: DeletePolicyRequest,
    options?: CallOptions
  ): Promise<DeletePolicyResponse> {
    if (req.onSecurableType === undefined) {
      throw new Error('path parameter "on_securable_type" is required');
    }
    if (req.onSecurableFullname === undefined) {
      throw new Error('path parameter "on_securable_fullname" is required');
    }
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/policies/${encodePathVariable(req.onSecurableType)}/${encodePathVariable(req.onSecurableFullname)}/${encodePathVariable(req.name)}`;
    let resp: DeletePolicyResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
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

  /** Get the policy definition on a securable */
  async getPolicy(
    req: GetPolicyRequest,
    options?: CallOptions
  ): Promise<PolicyInfo> {
    if (req.onSecurableType === undefined) {
      throw new Error('path parameter "on_securable_type" is required');
    }
    if (req.onSecurableFullname === undefined) {
      throw new Error('path parameter "on_securable_fullname" is required');
    }
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/policies/${encodePathVariable(req.onSecurableType)}/${encodePathVariable(req.onSecurableFullname)}/${encodePathVariable(req.name)}`;
    let resp: PolicyInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalPolicyInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * List all policies defined on a securable.
   * Optionally, the list can include inherited policies defined on the securable's parent schema or catalog.
   *
   * PAGINATION BEHAVIOR: The API is by default paginated, a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listPolicies(
    req: ListPoliciesRequest,
    options?: CallOptions
  ): Promise<ListPoliciesResponse> {
    if (req.onSecurableType === undefined) {
      throw new Error('path parameter "on_securable_type" is required');
    }
    if (req.onSecurableFullname === undefined) {
      throw new Error('path parameter "on_securable_fullname" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/policies/${encodePathVariable(req.onSecurableType)}/${encodePathVariable(req.onSecurableFullname)}`;
    const params = new URLSearchParams();
    if (req.includeInherited !== undefined) {
      params.append('include_inherited', String(req.includeInherited));
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
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

  async *listPoliciesIter(
    req: ListPoliciesRequest,
    options?: CallOptions
  ): AsyncGenerator<PolicyInfo> {
    const pageReq: ListPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listPolicies(pageReq, options);
      for (const item of resp.policies ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Update an ABAC policy on a securable. */
  async updatePolicy(
    req: UpdatePolicyRequest,
    options?: CallOptions
  ): Promise<PolicyInfo> {
    if (req.onSecurableType === undefined) {
      throw new Error('path parameter "on_securable_type" is required');
    }
    if (req.onSecurableFullname === undefined) {
      throw new Error('path parameter "on_securable_fullname" is required');
    }
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/policies/${encodePathVariable(req.onSecurableType)}/${encodePathVariable(req.onSecurableFullname)}/${encodePathVariable(req.name)}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.policyInfo === undefined
        ? 'null'
        : marshalRequest(req.policyInfo, marshalPolicyInfoSchema);
    let resp: PolicyInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalPolicyInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
