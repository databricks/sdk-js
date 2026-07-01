// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateAccountFederationPolicyRequest,
  CreateServicePrincipalFederationPolicyRequest,
  CreateServicePrincipalSecretRequest,
  CreateServicePrincipalSecretResponse,
  DeleteAccountFederationPolicyRequest,
  DeleteServicePrincipalFederationPolicyRequest,
  DeleteServicePrincipalSecretRequest,
  DeleteServicePrincipalSecretResponse,
  FederationPolicy,
  GetAccountFederationPolicyRequest,
  GetServicePrincipalFederationPolicyRequest,
  ListAccountFederationPoliciesRequest,
  ListFederationPoliciesResponse,
  ListServicePrincipalFederationPoliciesRequest,
  ListServicePrincipalSecretsRequest,
  ListServicePrincipalSecretsResponse,
  ServicePrincipalSecret,
  UpdateAccountFederationPolicyRequest,
  UpdateServicePrincipalFederationPolicyRequest,
} from './model';
import {
  marshalCreateServicePrincipalSecretRequestSchema,
  marshalFederationPolicySchema,
  unmarshalCreateServicePrincipalSecretResponseSchema,
  unmarshalDeleteServicePrincipalSecretResponseSchema,
  unmarshalFederationPolicySchema,
  unmarshalListFederationPoliciesResponseSchema,
  unmarshalListServicePrincipalSecretsResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class AuthenticationClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /** Create account federation policy. */
  async createAccountFederationPolicy(
    req: CreateAccountFederationPolicyRequest,
    options?: CallOptions
  ): Promise<FederationPolicy> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/federationPolicies`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create account federation policy. */
  async createServicePrincipalFederationPolicy(
    req: CreateServicePrincipalFederationPolicyRequest,
    options?: CallOptions
  ): Promise<FederationPolicy> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies`;
    const params = new URLSearchParams();
    if (req.policyId !== undefined) {
      params.append('policy_id', req.policyId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalFederationPolicySchema);
    let resp: FederationPolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete account federation policy. */
  async deleteAccountFederationPolicy(
    req: DeleteAccountFederationPolicyRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/federationPolicies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.servicePrincipalId !== undefined) {
      params.append('service_principal_id', String(req.servicePrincipalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Delete account federation policy. */
  async deleteServicePrincipalFederationPolicy(
    req: DeleteServicePrincipalFederationPolicyRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies/${req.policyId ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Get account federation policy. */
  async getAccountFederationPolicy(
    req: GetAccountFederationPolicyRequest,
    options?: CallOptions
  ): Promise<FederationPolicy> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/federationPolicies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.servicePrincipalId !== undefined) {
      params.append('service_principal_id', String(req.servicePrincipalId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: FederationPolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get account federation policy. */
  async getServicePrincipalFederationPolicy(
    req: GetServicePrincipalFederationPolicyRequest,
    options?: CallOptions
  ): Promise<FederationPolicy> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies/${req.policyId ?? ''}`;
    let resp: FederationPolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List account federation policies. */
  async listAccountFederationPolicies(
    req: ListAccountFederationPoliciesRequest,
    options?: CallOptions
  ): Promise<ListFederationPoliciesResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/federationPolicies`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListFederationPoliciesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listAccountFederationPoliciesIter(
    req: ListAccountFederationPoliciesRequest,
    options?: CallOptions
  ): AsyncGenerator<FederationPolicy> {
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
  async listServicePrincipalFederationPolicies(
    req: ListServicePrincipalFederationPoliciesRequest,
    options?: CallOptions
  ): Promise<ListFederationPoliciesResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListFederationPoliciesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listServicePrincipalFederationPoliciesIter(
    req: ListServicePrincipalFederationPoliciesRequest,
    options?: CallOptions
  ): AsyncGenerator<FederationPolicy> {
    const pageReq: ListServicePrincipalFederationPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listServicePrincipalFederationPolicies(
        pageReq,
        options
      );
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
  async updateAccountFederationPolicy(
    req: UpdateAccountFederationPolicyRequest,
    options?: CallOptions
  ): Promise<FederationPolicy> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/federationPolicies/${req.policyId ?? ''}`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update account federation policy. */
  async updateServicePrincipalFederationPolicy(
    req: UpdateServicePrincipalFederationPolicyRequest,
    options?: CallOptions
  ): Promise<FederationPolicy> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${String(req.servicePrincipalId ?? '')}/federationPolicies/${req.policyId ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.policy, marshalFederationPolicySchema);
    let resp: FederationPolicy | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a secret for the given service principal. */
  async createServicePrincipalSecret(
    req: CreateServicePrincipalSecretRequest,
    options?: CallOptions
  ): Promise<CreateServicePrincipalSecretResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const body = marshalRequest(
      req,
      marshalCreateServicePrincipalSecretRequestSchema
    );
    let resp: CreateServicePrincipalSecretResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateServicePrincipalSecretResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a secret for the given service principal. */
  async createServicePrincipalSecretProxy(
    req: CreateServicePrincipalSecretRequest,
    options?: CallOptions
  ): Promise<CreateServicePrincipalSecretResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const body = marshalRequest(
      req,
      marshalCreateServicePrincipalSecretRequestSchema
    );
    let resp: CreateServicePrincipalSecretResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateServicePrincipalSecretResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a secret from the given service principal. */
  async deleteServicePrincipalSecret(
    req: DeleteServicePrincipalSecretRequest,
    options?: CallOptions
  ): Promise<DeleteServicePrincipalSecretResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets/${req.secretId ?? ''}`;
    let resp: DeleteServicePrincipalSecretResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteServicePrincipalSecretResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a secret from the given service principal. */
  async deleteServicePrincipalSecretProxy(
    req: DeleteServicePrincipalSecretRequest,
    options?: CallOptions
  ): Promise<DeleteServicePrincipalSecretResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets/${req.secretId ?? ''}`;
    let resp: DeleteServicePrincipalSecretResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteServicePrincipalSecretResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List all secrets associated with the given service principal. This operation only returns information about the secrets themselves and does not include the secret values. */
  async listServicePrincipalSecrets(
    req: ListServicePrincipalSecretsRequest,
    options?: CallOptions
  ): Promise<ListServicePrincipalSecretsResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListServicePrincipalSecretsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListServicePrincipalSecretsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listServicePrincipalSecretsIter(
    req: ListServicePrincipalSecretsRequest,
    options?: CallOptions
  ): AsyncGenerator<ServicePrincipalSecret> {
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
  async listServicePrincipalSecretsProxy(
    req: ListServicePrincipalSecretsRequest,
    options?: CallOptions
  ): Promise<ListServicePrincipalSecretsResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListServicePrincipalSecretsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListServicePrincipalSecretsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listServicePrincipalSecretsProxyIter(
    req: ListServicePrincipalSecretsRequest,
    options?: CallOptions
  ): AsyncGenerator<ServicePrincipalSecret> {
    const pageReq: ListServicePrincipalSecretsRequest = {...req};
    for (;;) {
      const resp = await this.listServicePrincipalSecretsProxy(
        pageReq,
        options
      );
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
