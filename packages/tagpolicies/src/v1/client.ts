// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
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

  /** Creates a new tag policy, making the associated tag key governed. For Terraform usage, see the [Tag Policy Terraform documentation](https://registry.terraform.io/providers/databricks/databricks/latest/docs/resources/tag_policy). To manage permissions for tag policies, use the [Account Access Control Proxy API](https://docs.databricks.com/api/workspace/accountaccesscontrolproxy). */
  async createTagPolicy(signal: AbortSignal | undefined, req: CreateTagPolicyRequest, options?: Options): Promise<TagPolicy> {
    const url = `${this.host}/api/2.1/tag-policies`;
    const body = marshalRequest(req.tagPolicy, marshalTagPolicySchema);
    let resp: TagPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalTagPolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a tag policy by its associated governed tag's key, leaving that tag key ungoverned. For Terraform usage, see the [Tag Policy Terraform documentation](https://registry.terraform.io/providers/databricks/databricks/latest/docs/resources/tag_policy). */
  async deleteTagPolicy(signal: AbortSignal | undefined, req: DeleteTagPolicyRequest, options?: Options): Promise<void> {
    const url = `${this.host}/api/2.1/tag-policies/${req.tagKey ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await execute(signal, call, options);
  }

  /** Gets a single tag policy by its associated governed tag's key. For Terraform usage, see the [Tag Policy Terraform documentation](https://registry.terraform.io/providers/databricks/databricks/latest/docs/data-sources/tag_policy). To list granted permissions for tag policies, use the [Account Access Control Proxy API](https://docs.databricks.com/api/workspace/accountaccesscontrolproxy). */
  async getTagPolicy(signal: AbortSignal | undefined, req: GetTagPolicyRequest, options?: Options): Promise<TagPolicy> {
    const url = `${this.host}/api/2.1/tag-policies/${req.tagKey ?? ''}`;
    let resp: TagPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalTagPolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists the tag policies for all governed tags in the account. For Terraform usage, see the [Tag Policy Terraform documentation](https://registry.terraform.io/providers/databricks/databricks/latest/docs/data-sources/tag_policies). To list granted permissions for tag policies, use the [Account Access Control Proxy API](https://docs.databricks.com/api/workspace/accountaccesscontrolproxy). */
  async listTagPolicies(signal: AbortSignal | undefined, req: ListTagPoliciesRequest, options?: Options): Promise<ListTagPoliciesResponse> {
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListTagPoliciesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listTagPoliciesIter(signal: AbortSignal | undefined, req: ListTagPoliciesRequest, options?: Options): AsyncGenerator<TagPolicy> {
    const pageReq: ListTagPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listTagPolicies(signal, pageReq, options);
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
  async updateTagPolicy(signal: AbortSignal | undefined, req: UpdateTagPolicyRequest, options?: Options): Promise<TagPolicy> {
    const url = `${this.host}/api/2.1/tag-policies/${req.tagPolicy?.tagKey ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.paths.join(','));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.tagPolicy, marshalTagPolicySchema);
    let resp: TagPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalTagPolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
