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
  CreateTagPolicyRequest,
  DeleteTagPolicyRequest,
  GetTagPolicyRequest,
  ListTagPoliciesRequest,
  ListTagPoliciesResponse,
  TagPolicy,
  UpdateTagPolicyRequest,
} from './model';
import {
  marshalTagPolicySchema,
  unmarshalListTagPoliciesResponseSchema,
  unmarshalTagPolicySchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class TagPoliciesClient {
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

  /** Creates a new tag policy, making the associated tag key governed. For Terraform usage, see the [Tag Policy Terraform documentation](https://registry.terraform.io/providers/databricks/databricks/latest/docs/resources/tag_policy). To manage permissions for tag policies, use the [Account Access Control Proxy API](https://docs.databricks.com/api/workspace/accountaccesscontrolproxy). */
  async createTagPolicy(
    req: CreateTagPolicyRequest,
    options?: CallOptions
  ): Promise<TagPolicy> {
    const url = `${this.host}/api/2.1/tag-policies`;
    const body = marshalRequest(req.tagPolicy, marshalTagPolicySchema);
    let resp: TagPolicy | undefined;
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
      resp = parseResponse(respBody, unmarshalTagPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a tag policy by its associated governed tag's key, leaving that tag key ungoverned. For Terraform usage, see the [Tag Policy Terraform documentation](https://registry.terraform.io/providers/databricks/databricks/latest/docs/resources/tag_policy). */
  async deleteTagPolicy(
    req: DeleteTagPolicyRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.1/tag-policies/${req.tagKey ?? ''}`;
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

  /** Gets a single tag policy by its associated governed tag's key. For Terraform usage, see the [Tag Policy Terraform documentation](https://registry.terraform.io/providers/databricks/databricks/latest/docs/data-sources/tag_policy). To list granted permissions for tag policies, use the [Account Access Control Proxy API](https://docs.databricks.com/api/workspace/accountaccesscontrolproxy). */
  async getTagPolicy(
    req: GetTagPolicyRequest,
    options?: CallOptions
  ): Promise<TagPolicy> {
    const url = `${this.host}/api/2.1/tag-policies/${req.tagKey ?? ''}`;
    let resp: TagPolicy | undefined;
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
      resp = parseResponse(respBody, unmarshalTagPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists the tag policies for all governed tags in the account. For Terraform usage, see the [Tag Policy Terraform documentation](https://registry.terraform.io/providers/databricks/databricks/latest/docs/data-sources/tag_policies). To list granted permissions for tag policies, use the [Account Access Control Proxy API](https://docs.databricks.com/api/workspace/accountaccesscontrolproxy). */
  async listTagPolicies(
    req: ListTagPoliciesRequest,
    options?: CallOptions
  ): Promise<ListTagPoliciesResponse> {
    const url = `${this.host}/api/2.1/tag-policies`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListTagPoliciesResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListTagPoliciesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listTagPoliciesIter(
    req: ListTagPoliciesRequest,
    options?: CallOptions
  ): AsyncGenerator<TagPolicy> {
    const pageReq: ListTagPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listTagPolicies(pageReq, options);
      for (const item of resp.tagPolicies ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates an existing tag policy for a single governed tag. For Terraform usage, see the [Tag Policy Terraform documentation](https://registry.terraform.io/providers/databricks/databricks/latest/docs/resources/tag_policy). To manage permissions for tag policies, use the [Account Access Control Proxy API](https://docs.databricks.com/api/workspace/accountaccesscontrolproxy). */
  async updateTagPolicy(
    req: UpdateTagPolicyRequest,
    options?: CallOptions
  ): Promise<TagPolicy> {
    const url = `${this.host}/api/2.1/tag-policies/${req.tagPolicy?.tagKey ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.tagPolicy, marshalTagPolicySchema);
    let resp: TagPolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
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
      resp = parseResponse(respBody, unmarshalTagPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
