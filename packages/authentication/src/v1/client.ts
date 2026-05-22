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
import {buildHttpRequest, executeCall, executeHttpCall, marshalRequest, parseResponse} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateAccountFederationPolicyRequest,
  CreateServicePrincipalFederationPolicyRequest,
  CreateServicePrincipalSecretRequest,
  CreateServicePrincipalSecretResponse,
  DeleteAccountFederationPolicyRequest,
  DeleteServicePrincipalFederationPolicyRequest,
  DeleteServicePrincipalSecretRequest,
  DeleteServicePrincipalSecretRequest_Response,
  FederationPolicy,
  GetAccountFederationPolicyRequest,
  GetServicePrincipalFederationPolicyRequest,
  ListAccountFederationPoliciesRequest,
  ListFederationPoliciesResponse,
  ListServicePrincipalFederationPoliciesRequest,
  ListServicePrincipalSecretsRequest,
  ListServicePrincipalSecretsRequest_Response,
  ServicePrincipalSecret,
  UpdateAccountFederationPolicyRequest,
  UpdateServicePrincipalFederationPolicyRequest,
} from './model';
import {
  marshalCreateServicePrincipalSecretRequestSchema,
  marshalFederationPolicySchema,
  unmarshalCreateServicePrincipalSecretResponseSchema,
  unmarshalDeleteServicePrincipalSecretRequest_ResponseSchema,
  unmarshalFederationPolicySchema,
  unmarshalListFederationPoliciesResponseSchema,
  unmarshalListServicePrincipalSecretsRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
  // Fallback for endpoints whose path contains {account_id}. If the request
  // already carries an accountId, that value wins.
  private readonly accountId: string | undefined;
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
    this.accountId = options.accountId;
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

  /** Create account federation policy. */
  async createAccountFederationPolicy(req: CreateAccountFederationPolicyRequest, options?: CallOptions): Promise<FederationPolicy> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/federationPolicies`;
    const params = new URLSearchParams();
    if (req.servicePrincipalId !== undefined) {
      params.append('service_principal_id', String(req.servicePrincipalId));
    }
    if (req.policyId !== undefined) {
      params.append('policy_id', req.policyId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalFederationPolicySchema);
    let resp: FederationPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create account federation policy. */
  async createServicePrincipalFederationPolicy(req: CreateServicePrincipalFederationPolicyRequest, options?: CallOptions): Promise<FederationPolicy> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies`;
    const params = new URLSearchParams();
    if (req.policyId !== undefined) {
      params.append('policy_id', req.policyId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalFederationPolicySchema);
    let resp: FederationPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete account federation policy. */
  async deleteAccountFederationPolicy(req: DeleteAccountFederationPolicyRequest, options?: CallOptions): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/federationPolicies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.servicePrincipalId !== undefined) {
      params.append('service_principal_id', String(req.servicePrincipalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await executeCall(call, options);
  }

  /** Delete account federation policy. */
  async deleteServicePrincipalFederationPolicy(req: DeleteServicePrincipalFederationPolicyRequest, options?: CallOptions): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies/${req.policyId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await executeCall(call, options);
  }

  /** Get account federation policy. */
  async getAccountFederationPolicy(req: GetAccountFederationPolicyRequest, options?: CallOptions): Promise<FederationPolicy> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/federationPolicies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.servicePrincipalId !== undefined) {
      params.append('service_principal_id', String(req.servicePrincipalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: FederationPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get account federation policy. */
  async getServicePrincipalFederationPolicy(req: GetServicePrincipalFederationPolicyRequest, options?: CallOptions): Promise<FederationPolicy> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies/${req.policyId ?? ''}`;
    let resp: FederationPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List account federation policies. */
  async listAccountFederationPolicies(req: ListAccountFederationPoliciesRequest, options?: CallOptions): Promise<ListFederationPoliciesResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/federationPolicies`;
    const params = new URLSearchParams();
    if (req.servicePrincipalId !== undefined) {
      params.append('service_principal_id', String(req.servicePrincipalId));
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFederationPoliciesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListFederationPoliciesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listAccountFederationPoliciesIter(req: ListAccountFederationPoliciesRequest, options?: CallOptions): AsyncGenerator<FederationPolicy> {
    const pageReq: ListAccountFederationPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listAccountFederationPolicies(pageReq, options);
      for (const item of resp.policies ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }


  /** List account federation policies. */
  async listServicePrincipalFederationPolicies(req: ListServicePrincipalFederationPoliciesRequest, options?: CallOptions): Promise<ListFederationPoliciesResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFederationPoliciesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListFederationPoliciesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listServicePrincipalFederationPoliciesIter(req: ListServicePrincipalFederationPoliciesRequest, options?: CallOptions): AsyncGenerator<FederationPolicy> {
    const pageReq: ListServicePrincipalFederationPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listServicePrincipalFederationPolicies(pageReq, options);
      for (const item of resp.policies ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }


  /** Update account federation policy. */
  async updateAccountFederationPolicy(req: UpdateAccountFederationPolicyRequest, options?: CallOptions): Promise<FederationPolicy> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/federationPolicies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.servicePrincipalId !== undefined) {
      params.append('service_principal_id', String(req.servicePrincipalId));
    }
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalFederationPolicySchema);
    let resp: FederationPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update account federation policy. */
  async updateServicePrincipalFederationPolicy(req: UpdateServicePrincipalFederationPolicyRequest, options?: CallOptions): Promise<FederationPolicy> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalFederationPolicySchema);
    let resp: FederationPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a secret for the given service principal. */
  async createServicePrincipalSecret(req: CreateServicePrincipalSecretRequest, options?: CallOptions): Promise<CreateServicePrincipalSecretResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const body = marshalRequest(req, marshalCreateServicePrincipalSecretRequestSchema);
    let resp: CreateServicePrincipalSecretResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCreateServicePrincipalSecretResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a secret for the given service principal. */
  async createServicePrincipalSecretProxy(req: CreateServicePrincipalSecretRequest, options?: CallOptions): Promise<CreateServicePrincipalSecretResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const body = marshalRequest(req, marshalCreateServicePrincipalSecretRequestSchema);
    let resp: CreateServicePrincipalSecretResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCreateServicePrincipalSecretResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a secret from the given service principal. */
  async deleteServicePrincipalSecret(req: DeleteServicePrincipalSecretRequest, options?: CallOptions): Promise<DeleteServicePrincipalSecretRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets/${req.secretId ?? ''}`;
    let resp: DeleteServicePrincipalSecretRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDeleteServicePrincipalSecretRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a secret from the given service principal. */
  async deleteServicePrincipalSecretProxy(req: DeleteServicePrincipalSecretRequest, options?: CallOptions): Promise<DeleteServicePrincipalSecretRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets/${req.secretId ?? ''}`;
    let resp: DeleteServicePrincipalSecretRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDeleteServicePrincipalSecretRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List all secrets associated with the given service principal. This operation only returns information about the secrets themselves and does not include the secret values. */
  async listServicePrincipalSecrets(req: ListServicePrincipalSecretsRequest, options?: CallOptions): Promise<ListServicePrincipalSecretsRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListServicePrincipalSecretsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListServicePrincipalSecretsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listServicePrincipalSecretsIter(req: ListServicePrincipalSecretsRequest, options?: CallOptions): AsyncGenerator<ServicePrincipalSecret> {
    const pageReq: ListServicePrincipalSecretsRequest = {...req};
    for (;;) {
      const resp = await this.listServicePrincipalSecrets(pageReq, options);
      for (const item of resp.secrets ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }


  /** List all secrets associated with the given service principal. This operation only returns information about the secrets themselves and does not include the secret values. */
  async listServicePrincipalSecretsProxy(req: ListServicePrincipalSecretsRequest, options?: CallOptions): Promise<ListServicePrincipalSecretsRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListServicePrincipalSecretsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListServicePrincipalSecretsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listServicePrincipalSecretsProxyIter(req: ListServicePrincipalSecretsRequest, options?: CallOptions): AsyncGenerator<ServicePrincipalSecret> {
    const pageReq: ListServicePrincipalSecretsRequest = {...req};
    for (;;) {
      const resp = await this.listServicePrincipalSecretsProxy(pageReq, options);
      for (const item of resp.secrets ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

}
