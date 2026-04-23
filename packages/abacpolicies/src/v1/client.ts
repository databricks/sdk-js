// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import type {
  CreatePolicy,
  DeletePolicy,
  DeletePolicy_Response,
  GetPolicy,
  ListPolicies,
  ListPolicies_Response,
  PolicyInfo,
  UpdatePolicy,
} from './model';
import {
  marshalPolicyInfoSchema,
  unmarshalDeletePolicy_ResponseSchema,
  unmarshalListPolicies_ResponseSchema,
  unmarshalPolicyInfoSchema,
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

  /**
   * Creates a new policy on a securable.
   * The new policy applies to the securable and all its descendants.
   */
  async createPolicy(
    signal: AbortSignal | undefined,
    req: CreatePolicy,
    options?: Options
  ): Promise<PolicyInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/policies`;
    const body = marshalRequest(req.policyInfo, marshalPolicyInfoSchema);
    let resp: PolicyInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPolicyInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete an ABAC policy defined on a securable. */
  async deletePolicy(
    signal: AbortSignal | undefined,
    req: DeletePolicy,
    options?: Options
  ): Promise<DeletePolicy_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/policies/${req.onSecurableType ?? ''}/${req.onSecurableFullname ?? ''}/${req.name ?? ''}`;
    let resp: DeletePolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeletePolicy_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the policy definition on a securable */
  async getPolicy(
    signal: AbortSignal | undefined,
    req: GetPolicy,
    options?: Options
  ): Promise<PolicyInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/policies/${req.onSecurableType ?? ''}/${req.onSecurableFullname ?? ''}/${req.name ?? ''}`;
    let resp: PolicyInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPolicyInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: ListPolicies,
    options?: Options
  ): Promise<ListPolicies_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/policies/${req.onSecurableType ?? ''}/${req.onSecurableFullname ?? ''}`;
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
    let resp: ListPolicies_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListPolicies_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listPoliciesIter(
    signal: AbortSignal | undefined,
    req: ListPolicies,
    options?: Options
  ): AsyncGenerator<PolicyInfo> {
    const pageReq: ListPolicies = {...req};
    for (;;) {
      const resp = await this.listPolicies(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: UpdatePolicy,
    options?: Options
  ): Promise<PolicyInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/policies/${req.onSecurableType ?? ''}/${req.onSecurableFullname ?? ''}/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policyInfo, marshalPolicyInfoSchema);
    let resp: PolicyInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPolicyInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
