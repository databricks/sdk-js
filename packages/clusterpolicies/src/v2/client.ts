// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
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

  /** Creates a new policy with prescribed settings. */
  async createPolicy(
    req: CreatePolicy,
    options?: CallOptions
  ): Promise<CreatePolicy_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/create`;
    const body = marshalRequest(req, marshalCreatePolicySchema);
    let resp: CreatePolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreatePolicy_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a policy for a cluster. Clusters governed by this policy can still run, but cannot be edited. */
  async deletePolicy(
    req: DeletePolicy,
    options?: CallOptions
  ): Promise<DeletePolicy_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/delete`;
    const body = marshalRequest(req, marshalDeletePolicySchema);
    let resp: DeletePolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeletePolicy_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update an existing policy for cluster. This operation may make some clusters governed by the previous policy invalid. */
  async editPolicy(
    req: EditPolicy,
    options?: CallOptions
  ): Promise<EditPolicy_Response> {
    const url = `${this.host}/api/2.0/policies/clusters/edit`;
    const body = marshalRequest(req, marshalEditPolicySchema);
    let resp: EditPolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEditPolicy_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a cluster policy entity. Creation and editing is available to admins only. */
  async getPolicy(req: GetPolicy, options?: CallOptions): Promise<Policy> {
    const url = `${this.host}/api/2.0/policies/clusters/get`;
    const params = new URLSearchParams();
    if (req.policyId !== undefined) {
      params.append('policy_id', req.policyId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Policy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns a list of policies accessible by the requesting user. */
  async listPolicies(
    req: ListPolicies,
    options?: CallOptions
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
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListPolicies_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
