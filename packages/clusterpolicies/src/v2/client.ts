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
  CreatePolicy_Response,
  DeletePolicy,
  DeletePolicy_Response,
  EditPolicy,
  EditPolicy_Response,
  GetPolicy,
  ListPolicies,
  ListPolicies_Response,
  Policy,
} from './model';
import {
  marshalCreatePolicySchema,
  marshalDeletePolicySchema,
  marshalEditPolicySchema,
  unmarshalCreatePolicy_ResponseSchema,
  unmarshalDeletePolicy_ResponseSchema,
  unmarshalEditPolicy_ResponseSchema,
  unmarshalListPolicies_ResponseSchema,
  unmarshalPolicySchema,
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

  /** Creates a new policy with prescribed settings. */
  async createPolicy(
    signal: AbortSignal | undefined,
    req: CreatePolicy,
    options?: Options
  ): Promise<CreatePolicy_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/create`;
    const body = marshalRequest(req, marshalCreatePolicySchema);
    let resp: CreatePolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreatePolicy_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a policy for a cluster. Clusters governed by this policy can still run, but cannot be edited. */
  async deletePolicy(
    signal: AbortSignal | undefined,
    req: DeletePolicy,
    options?: Options
  ): Promise<DeletePolicy_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/delete`;
    const body = marshalRequest(req, marshalDeletePolicySchema);
    let resp: DeletePolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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

  /** Update an existing policy for cluster. This operation may make some clusters governed by the previous policy invalid. */
  async editPolicy(
    signal: AbortSignal | undefined,
    req: EditPolicy,
    options?: Options
  ): Promise<EditPolicy_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/edit`;
    const body = marshalRequest(req, marshalEditPolicySchema);
    let resp: EditPolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEditPolicy_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a cluster policy entity. Creation and editing is available to admins only. */
  async getPolicy(
    signal: AbortSignal | undefined,
    req: GetPolicy,
    options?: Options
  ): Promise<Policy> {
    const url = `${this.host}/api/2.0/policies/clusters/get`;
    const params = new URLSearchParams();
    if (req.policyId !== undefined) {
      params.append('policy_id', req.policyId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Policy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPolicySchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns a list of policies accessible by the requesting user. */
  async listPolicies(
    signal: AbortSignal | undefined,
    req: ListPolicies,
    options?: Options
  ): Promise<ListPolicies_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/list`;
    const params = new URLSearchParams();
    if (req.sortOrder !== undefined) {
      params.append('sort_order', req.sortOrder);
    }
    if (req.sortColumn !== undefined) {
      params.append('sort_column', req.sortColumn);
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
}
