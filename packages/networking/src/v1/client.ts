// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import {z} from 'zod';
import type {
  AccountNetworkPolicy,
  CreateEndpointRequest,
  CreateIpAccessList,
  CreateIpAccessList_Response,
  CreateNccPrivateEndpointRuleRequest,
  CreateNetworkConnectivityConfigPublicRequest,
  CreateNetworkPolicyRequest,
  CreateNetworkPublicRequest,
  CreatePrivateAccessSettingsPublicRequest,
  CreateVpcEndpointPublicRequest,
  CustomerFacingNetworkConnectivityConfig,
  CustomerFacingPrivateAccessSettings,
  CustomerFacingVpcEndpoint,
  DeleteEndpointRequest,
  DeleteIpAccessList,
  DeleteIpAccessList_Response,
  DeleteNccPrivateEndpointRuleRequest,
  DeleteNetworkConnectivityConfigPublicRequest,
  DeleteNetworkPolicyRequest,
  DeleteNetworkPublicRequest,
  DeletePrivateAccessSettingsPublicRequest,
  DeleteVpcEndpointPublicRequest,
  Endpoint,
  GetEndpointRequest,
  GetIpAccessList,
  GetIpAccessList_Response,
  GetNccPrivateEndpointRuleRequest,
  GetNetworkConnectivityConfigPublicRequest,
  GetNetworkPolicyRequest,
  GetNetworkPublicRequest,
  GetPrivateAccessSettingsPublicRequest,
  GetVpcEndpointPublicRequest,
  GetWorkspaceNetworkOptionRequest,
  ListEndpointsRequest,
  ListEndpointsResponse,
  ListIpAccessLists,
  ListIpAccessLists_Response,
  ListNccPrivateEndpointRulesRequest,
  ListNccPrivateEndpointRulesResponse,
  ListNetworkConnectivityConfigsPublicRequest,
  ListNetworkConnectivityConfigsPublicResponse,
  ListNetworkPoliciesRequest,
  ListNetworkPoliciesResponse,
  ListNetworkPublicRequest,
  ListNetworkPublicResponse,
  ListPrivateAccessSettingsPublicRequest,
  ListPrivateAccessSettingsPublicResponse,
  ListVpcEndpointPublicRequest,
  ListVpcEndpointPublicResponse,
  NccPrivateEndpointRule,
  Network,
  ReplaceIpAccessList,
  ReplaceIpAccessList_Response,
  UpdateIpAccessList,
  UpdateIpAccessList_Response,
  UpdateNccPrivateEndpointRuleRequest,
  UpdateNetworkPolicyRequest,
  UpdatePrivateAccessSettingsPublicRequest,
  UpdateWorkspaceNetworkOptionRequest,
  WorkspaceNetworkOption,
} from './model';
import {
  marshalAccountNetworkPolicySchema,
  marshalCreateIpAccessListSchema,
  marshalCreateNetworkConnectivityConfigurationSchema,
  marshalCreateNetworkPublicRequestSchema,
  marshalCreatePrivateAccessSettingsPublicRequestSchema,
  marshalCreatePrivateEndpointRuleSchema,
  marshalCreateVpcEndpointPublicRequestSchema,
  marshalCustomerFacingPrivateAccessSettingsSchema,
  marshalEndpointSchema,
  marshalReplaceIpAccessListSchema,
  marshalUpdateIpAccessListSchema,
  marshalUpdatePrivateEndpointRuleSchema,
  marshalWorkspaceNetworkOptionSchema,
  unmarshalAccountNetworkPolicySchema,
  unmarshalCreateIpAccessList_ResponseSchema,
  unmarshalCustomerFacingNetworkConnectivityConfigSchema,
  unmarshalCustomerFacingPrivateAccessSettingsSchema,
  unmarshalCustomerFacingVpcEndpointSchema,
  unmarshalDeleteIpAccessList_ResponseSchema,
  unmarshalEndpointSchema,
  unmarshalGetIpAccessList_ResponseSchema,
  unmarshalListEndpointsResponseSchema,
  unmarshalListIpAccessLists_ResponseSchema,
  unmarshalListNccPrivateEndpointRulesResponseSchema,
  unmarshalListNetworkConnectivityConfigsPublicResponseSchema,
  unmarshalListNetworkPoliciesResponseSchema,
  unmarshalNccPrivateEndpointRuleSchema,
  unmarshalNetworkSchema,
  unmarshalReplaceIpAccessList_ResponseSchema,
  unmarshalUpdateIpAccessList_ResponseSchema,
  unmarshalWorkspaceNetworkOptionSchema,
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

  /**
   * Creates a new network connectivity endpoint that enables private connectivity
   * between your network resources and <Databricks> services.
   *
   * After creation, the endpoint is initially in the PENDING state. The <Databricks>
   * endpoint service automatically reviews and approves the endpoint within a few
   * minutes. Use the GET method to retrieve the latest endpoint state.
   *
   * An endpoint can be used only after it reaches the APPROVED state.
   */
  async createEndpoint(
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const url = `${this.host}/api/networking/v1/${req.parent ?? ''}/endpoints`;
    const body = marshalRequest(req.endpoint, marshalEndpointSchema);
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a network endpoint. This will remove the endpoint configuration from <Databricks>.
   * Depending on the endpoint type and use case, you may also need to delete corresponding network resources
   * in your cloud provider account.
   */
  async deleteEndpoint(
    req: DeleteEndpointRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/networking/v1/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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

  /** Gets details of a specific network endpoint. */
  async getEndpoint(
    req: GetEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const url = `${this.host}/api/networking/v1/${req.name ?? ''}`;
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all network connectivity endpoints for the account. */
  async listEndpoints(
    req: ListEndpointsRequest,
    options?: CallOptions
  ): Promise<ListEndpointsResponse> {
    const url = `${this.host}/api/networking/v1/${req.parent ?? ''}/endpoints`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListEndpointsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListEndpointsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listEndpointsIter(
    req: ListEndpointsRequest,
    options?: CallOptions
  ): AsyncGenerator<Endpoint> {
    const pageReq: ListEndpointsRequest = {...req};
    for (;;) {
      const resp = await this.listEndpoints(pageReq, options);
      for (const item of resp.items ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Creates an IP access list for the account.
   *
   * A list can be an allow list or a block list. See the top of this file for a description of
   * how the server treats allow lists and block lists at runtime.
   *
   * When creating or updating an IP access list:
   *
   * * For all allow lists and block lists combined, the API supports a maximum of 1000
   * IP/CIDR values, where one CIDR counts as a single value. Attempts to exceed that number
   * return error 400 with `error_code` value `QUOTA_EXCEEDED`.
   * * If the new list would block the calling user's current IP, error 400 is returned with
   * `error_code` value `INVALID_STATE`.
   *
   * It can take a few minutes for the changes to take effect.
   */
  async createIpAccessList(
    req: CreateIpAccessList,
    options?: CallOptions
  ): Promise<CreateIpAccessList_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/ip-access-lists`;
    const body = marshalRequest(req, marshalCreateIpAccessListSchema);
    let resp: CreateIpAccessList_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateIpAccessList_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes an IP access list, specified by its list ID. */
  async deleteIpAccessList(
    req: DeleteIpAccessList,
    options?: CallOptions
  ): Promise<DeleteIpAccessList_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/ip-access-lists/${req.listId ?? ''}`;
    let resp: DeleteIpAccessList_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteIpAccessList_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets an IP access list, specified by its list ID. */
  async getIpAccessList(
    req: GetIpAccessList,
    options?: CallOptions
  ): Promise<GetIpAccessList_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/ip-access-lists/${req.listId ?? ''}`;
    let resp: GetIpAccessList_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetIpAccessList_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets all IP access lists for the specified account. */
  async listIpAccessLists(
    req: ListIpAccessLists,
    options?: CallOptions
  ): Promise<ListIpAccessLists_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/ip-access-lists`;
    let resp: ListIpAccessLists_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListIpAccessLists_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Replaces an IP access list, specified by its ID.
   *
   * A list can include allow lists and block lists. See the top of this file for a description
   * of how the server treats allow lists and block lists at run time. When replacing an IP
   * access list:
   * * For all allow lists and block lists combined, the API supports a maximum of 1000 IP/CIDR values,
   * where one CIDR counts as a single value. Attempts to exceed that number return error 400 with `error_code`
   * value `QUOTA_EXCEEDED`.
   * * If the resulting list would block the calling user's current IP, error 400 is returned with `error_code`
   * value `INVALID_STATE`.
   * It can take a few minutes for the changes to take effect.
   */
  async replaceIpAccessList(
    req: ReplaceIpAccessList,
    options?: CallOptions
  ): Promise<ReplaceIpAccessList_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/ip-access-lists/${req.listId ?? ''}`;
    const body = marshalRequest(req, marshalReplaceIpAccessListSchema);
    let resp: ReplaceIpAccessList_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalReplaceIpAccessList_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates an existing IP access list, specified by its ID.
   *
   * A list can include allow lists and block lists. See the top of this file for a description
   * of how the server treats allow lists and block lists at run time.
   *
   * When updating an IP access list:
   *
   * * For all allow lists and block lists combined, the API supports a maximum of 1000
   * IP/CIDR values, where one CIDR counts as a single value. Attempts to exceed that number
   * return error 400 with `error_code` value `QUOTA_EXCEEDED`.
   * * If the updated list would block the calling user's current IP, error 400 is returned
   * with `error_code` value `INVALID_STATE`.
   *
   * It can take a few minutes for the changes to take effect.
   */
  async updateIpAccessList(
    req: UpdateIpAccessList,
    options?: CallOptions
  ): Promise<UpdateIpAccessList_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/ip-access-lists/${req.listId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateIpAccessListSchema);
    let resp: UpdateIpAccessList_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateIpAccessList_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a network connectivity configuration (NCC), which provides stable Azure service
   * subnets when accessing your Azure Storage accounts. You can also use a network connectivity configuration to create
   * <Databricks> managed private endpoints so that <Databricks> serverless compute resources privately access your
   * resources.
   *
   * **IMPORTANT**: After you create the network connectivity configuration, you must assign one or more workspaces to the new network connectivity configuration.
   * You can share one network connectivity configuration with multiple workspaces from the same Azure region within
   * the same <Databricks> account.
   * See [configure serverless secure connectivity](https://learn.microsoft.com/azure/databricks/security/network/serverless-network-security).
   */
  async createNetworkConnectivityConfigPublic(
    req: CreateNetworkConnectivityConfigPublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingNetworkConnectivityConfig> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-connectivity-configs`;
    const body = marshalRequest(
      req.networkConnectivityConfig,
      marshalCreateNetworkConnectivityConfigurationSchema
    );
    let resp: CustomerFacingNetworkConnectivityConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCustomerFacingNetworkConnectivityConfigSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a network connectivity configuration. */
  async deleteNetworkConnectivityConfigPublic(
    req: DeleteNetworkConnectivityConfigPublicRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-connectivity-configs/${req.networkConnectivityConfigId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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

  /** Gets a network connectivity configuration. */
  async getNetworkConnectivityConfigPublic(
    req: GetNetworkConnectivityConfigPublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingNetworkConnectivityConfig> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-connectivity-configs/${req.networkConnectivityConfigId ?? ''}`;
    let resp: CustomerFacingNetworkConnectivityConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCustomerFacingNetworkConnectivityConfigSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets an array of network connectivity configurations. */
  async listNetworkConnectivityConfigsPublic(
    req: ListNetworkConnectivityConfigsPublicRequest,
    options?: CallOptions
  ): Promise<ListNetworkConnectivityConfigsPublicResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-connectivity-configs`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListNetworkConnectivityConfigsPublicResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListNetworkConnectivityConfigsPublicResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listNetworkConnectivityConfigsPublicIter(
    req: ListNetworkConnectivityConfigsPublicRequest,
    options?: CallOptions
  ): AsyncGenerator<CustomerFacingNetworkConnectivityConfig> {
    const pageReq: ListNetworkConnectivityConfigsPublicRequest = {...req};
    for (;;) {
      const resp = await this.listNetworkConnectivityConfigsPublic(
        pageReq,
        options
      );
      for (const item of resp.items ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Create a private endpoint rule for the specified network connectivity config object.
   * Once the object is created, <Databricks> asynchronously provisions a new Azure private endpoint to your
   * specified Azure resource.
   *
   * **IMPORTANT**: You must use Azure portal or other Azure tools to approve the private endpoint to complete the
   * connection. To get the information of the private endpoint created, make a `GET` request on the new private
   * endpoint rule. See [serverless private link](https://learn.microsoft.com/azure/databricks/security/network/serverless-network-security/serverless-private-link).
   */
  async createNccPrivateEndpointRule(
    req: CreateNccPrivateEndpointRuleRequest,
    options?: CallOptions
  ): Promise<NccPrivateEndpointRule> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-connectivity-configs/${req.networkConnectivityConfigId ?? ''}/private-endpoint-rules`;
    const body = marshalRequest(
      req.privateEndpointRule,
      marshalCreatePrivateEndpointRuleSchema
    );
    let resp: NccPrivateEndpointRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNccPrivateEndpointRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Initiates deleting a private endpoint rule. If the connection state is PENDING or EXPIRED,
   * the private endpoint is immediately deleted. Otherwise, the private endpoint is deactivated
   * and will be deleted after one day of deactivation. When a private endpoint is deactivated,
   * the `deactivated` field is set to `true` and the private endpoint is not
   * available to your serverless compute resources.
   */
  async deleteNccPrivateEndpointRule(
    req: DeleteNccPrivateEndpointRuleRequest,
    options?: CallOptions
  ): Promise<NccPrivateEndpointRule> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-connectivity-configs/${req.networkConnectivityConfigId ?? ''}/private-endpoint-rules/${req.privateEndpointRuleId ?? ''}`;
    let resp: NccPrivateEndpointRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNccPrivateEndpointRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the private endpoint rule. */
  async getNccPrivateEndpointRule(
    req: GetNccPrivateEndpointRuleRequest,
    options?: CallOptions
  ): Promise<NccPrivateEndpointRule> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-connectivity-configs/${req.networkConnectivityConfigId ?? ''}/private-endpoint-rules/${req.privateEndpointRuleId ?? ''}`;
    let resp: NccPrivateEndpointRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNccPrivateEndpointRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets an array of private endpoint rules. */
  async listNccPrivateEndpointRules(
    req: ListNccPrivateEndpointRulesRequest,
    options?: CallOptions
  ): Promise<ListNccPrivateEndpointRulesResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-connectivity-configs/${req.networkConnectivityConfigId ?? ''}/private-endpoint-rules`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListNccPrivateEndpointRulesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListNccPrivateEndpointRulesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listNccPrivateEndpointRulesIter(
    req: ListNccPrivateEndpointRulesRequest,
    options?: CallOptions
  ): AsyncGenerator<NccPrivateEndpointRule> {
    const pageReq: ListNccPrivateEndpointRulesRequest = {...req};
    for (;;) {
      const resp = await this.listNccPrivateEndpointRules(pageReq, options);
      for (const item of resp.items ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates a private endpoint rule. Currently only a private endpoint rule to customer-managed resources is allowed to be updated. */
  async updateNccPrivateEndpointRule(
    req: UpdateNccPrivateEndpointRuleRequest,
    options?: CallOptions
  ): Promise<NccPrivateEndpointRule> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-connectivity-configs/${req.networkConnectivityConfigId ?? ''}/private-endpoint-rules/${req.privateEndpointRuleId ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.privateEndpointRule,
      marshalUpdatePrivateEndpointRuleSchema
    );
    let resp: NccPrivateEndpointRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNccPrivateEndpointRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new network policy to manage which network destinations can be accessed from the <Databricks>
   * environment.
   */
  async createNetworkPolicyRpc(
    req: CreateNetworkPolicyRequest,
    options?: CallOptions
  ): Promise<AccountNetworkPolicy> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-policies`;
    const body = marshalRequest(
      req.networkPolicy,
      marshalAccountNetworkPolicySchema
    );
    let resp: AccountNetworkPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountNetworkPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a network policy. Cannot be called on 'default-policy'. */
  async deleteNetworkPolicyRpc(
    req: DeleteNetworkPolicyRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-policies/${req.networkPolicyId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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

  /** Gets a network policy. */
  async getNetworkPolicyRpc(
    req: GetNetworkPolicyRequest,
    options?: CallOptions
  ): Promise<AccountNetworkPolicy> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-policies/${req.networkPolicyId ?? ''}`;
    let resp: AccountNetworkPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountNetworkPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets an array of network policies. */
  async listNetworkPoliciesRpc(
    req: ListNetworkPoliciesRequest,
    options?: CallOptions
  ): Promise<ListNetworkPoliciesResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-policies`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListNetworkPoliciesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListNetworkPoliciesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listNetworkPoliciesRpcIter(
    req: ListNetworkPoliciesRequest,
    options?: CallOptions
  ): AsyncGenerator<AccountNetworkPolicy> {
    const pageReq: ListNetworkPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listNetworkPoliciesRpc(pageReq, options);
      for (const item of resp.items ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates a network policy. This allows you to modify the configuration of a network policy. */
  async updateNetworkPolicyRpc(
    req: UpdateNetworkPolicyRequest,
    options?: CallOptions
  ): Promise<AccountNetworkPolicy> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/network-policies/${req.networkPolicyId ?? ''}`;
    const body = marshalRequest(
      req.networkPolicy,
      marshalAccountNetworkPolicySchema
    );
    let resp: AccountNetworkPolicy | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountNetworkPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a <Databricks> network configuration that represents an VPC and its resources. The VPC will be used for new <Databricks> clusters. This requires a pre-existing VPC and subnets. */
  async createNetworkPublic(
    req: CreateNetworkPublicRequest,
    options?: CallOptions
  ): Promise<Network> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/networks`;
    const body = marshalRequest(req, marshalCreateNetworkPublicRequestSchema);
    let resp: Network | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNetworkSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a private access settings configuration, which represents
   * network access restrictions for workspace resources. Private access
   * settings configure whether workspaces can be accessed from the public
   * internet or only from private endpoints.
   */
  async createPrivateAccessSettingsPublic(
    req: CreatePrivateAccessSettingsPublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingPrivateAccessSettings> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/private-access-settings`;
    const body = marshalRequest(
      req,
      marshalCreatePrivateAccessSettingsPublicRequestSchema
    );
    let resp: CustomerFacingPrivateAccessSettings | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCustomerFacingPrivateAccessSettingsSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a VPC endpoint configuration, which represents a
   * [VPC endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html)
   * object in AWS used to communicate privately with <Databricks> over
   * [AWS PrivateLink](https://aws.amazon.com/privatelink).
   *
   * After you create the VPC endpoint configuration, the <Databricks>
   * [endpoint service](https://docs.aws.amazon.com/vpc/latest/privatelink/privatelink-share-your-services.html)
   * automatically accepts the VPC endpoint.
   *
   * Before configuring PrivateLink, read the
   * [<Databricks> article about PrivateLink](https://docs.databricks.com/administration-guide/cloud-configurations/aws/privatelink.html).
   */
  async createVpcEndpointPublic(
    req: CreateVpcEndpointPublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingVpcEndpoint> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/vpc-endpoints`;
    const body = marshalRequest(
      req,
      marshalCreateVpcEndpointPublicRequestSchema
    );
    let resp: CustomerFacingVpcEndpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomerFacingVpcEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a <Databricks> network configuration, which represents a cloud VPC and its resources. You cannot delete a network that is associated with a workspace.
   *
   * This operation is available only if your account is on the E2 version of the platform.
   */
  async deleteNetworkPublic(
    req: DeleteNetworkPublicRequest,
    options?: CallOptions
  ): Promise<Network> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/networks/${req.networkId ?? ''}`;
    let resp: Network | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNetworkSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a <Databricks> private access settings configuration, both specified by ID. */
  async deletePrivateAccessSettingsPublic(
    req: DeletePrivateAccessSettingsPublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingPrivateAccessSettings> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/private-access-settings/${req.privateAccessSettingsId ?? ''}`;
    let resp: CustomerFacingPrivateAccessSettings | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCustomerFacingPrivateAccessSettingsSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a Databricks VPC endpoint configuration. You cannot delete a VPC endpoint configuration that is associated with any workspace. */
  async deleteVpcEndpointPublic(
    req: DeleteVpcEndpointPublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingVpcEndpoint> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/vpc-endpoints/${req.vpcEndpointId ?? ''}`;
    let resp: CustomerFacingVpcEndpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomerFacingVpcEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a <Databricks> network configuration, which represents a cloud VPC and its resources. */
  async getNetworkPublic(
    req: GetNetworkPublicRequest,
    options?: CallOptions
  ): Promise<Network> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/networks/${req.networkId ?? ''}`;
    let resp: Network | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalNetworkSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a <Databricks> private access settings configuration, both specified by ID. */
  async getPrivateAccessSettingsPublic(
    req: GetPrivateAccessSettingsPublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingPrivateAccessSettings> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/private-access-settings/${req.privateAccessSettingsId ?? ''}`;
    let resp: CustomerFacingPrivateAccessSettings | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCustomerFacingPrivateAccessSettingsSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a VPC endpoint configuration, which represents
   * a [VPC endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html)
   * object in AWS used to communicate privately with <Databricks> over
   * [AWS PrivateLink](https://aws.amazon.com/privatelink).
   */
  async getVpcEndpointPublic(
    req: GetVpcEndpointPublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingVpcEndpoint> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/vpc-endpoints/${req.vpcEndpointId ?? ''}`;
    let resp: CustomerFacingVpcEndpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomerFacingVpcEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists <Databricks> network configurations for an account. */
  async listNetworkPublic(
    req: ListNetworkPublicRequest,
    options?: CallOptions
  ): Promise<ListNetworkPublicResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/networks`;
    let resp: ListNetworkPublicResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = {
        networks: parseResponse(
          respBody,
          z.array(z.lazy(() => unmarshalNetworkSchema))
        ),
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists <Databricks> private access settings for an account. */
  async listPrivateAccessSettingsPublic(
    req: ListPrivateAccessSettingsPublicRequest,
    options?: CallOptions
  ): Promise<ListPrivateAccessSettingsPublicResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/private-access-settings`;
    let resp: ListPrivateAccessSettingsPublicResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = {
        privateAccessSettings: parseResponse(
          respBody,
          z.array(
            z.lazy(() => unmarshalCustomerFacingPrivateAccessSettingsSchema)
          )
        ),
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists Databricks VPC endpoint configurations for an account. */
  async listVpcEndpointPublic(
    req: ListVpcEndpointPublicRequest,
    options?: CallOptions
  ): Promise<ListVpcEndpointPublicResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/vpc-endpoints`;
    let resp: ListVpcEndpointPublicResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = {
        vpcEndpoints: parseResponse(
          respBody,
          z.array(z.lazy(() => unmarshalCustomerFacingVpcEndpointSchema))
        ),
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates an existing private access settings object, which specifies how your workspace is accessed over AWS PrivateLink. To use AWS PrivateLink, a workspace must have a private access settings object referenced by ID in the workspace's private_access_settings_id property.
   * This operation completely overwrites your existing private access settings object attached to your workspaces. All workspaces attached to the private access settings are affected by any change. If public_access_enabled, private_access_level, or allowed_vpc_endpoint_ids are updated, effects of these changes might take several minutes to propagate to the workspace API.
   * You can share one private access settings object with multiple workspaces in a single account. However, private access settings are specific to AWS regions, so only workspaces in the same AWS region can use a given private access settings object.
   * Before configuring PrivateLink, read the <Databricks> article about PrivateLink.
   */
  async updatePrivateAccessSettingsPublic(
    req: UpdatePrivateAccessSettingsPublicRequest,
    options?: CallOptions
  ): Promise<CustomerFacingPrivateAccessSettings> {
    const url = `${this.host}/api/2.0/accounts/${req.customerFacingPrivateAccessSettings?.accountId ?? ''}/private-access-settings/${req.customerFacingPrivateAccessSettings?.privateAccessSettingsId ?? ''}`;
    const body = marshalRequest(
      req.customerFacingPrivateAccessSettings,
      marshalCustomerFacingPrivateAccessSettingsSchema
    );
    let resp: CustomerFacingPrivateAccessSettings | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCustomerFacingPrivateAccessSettingsSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the network option for a workspace. Every workspace has exactly one network policy binding,
   * with 'default-policy' used if no explicit assignment exists.
   */
  async getWorkspaceNetworkOptionRpc(
    req: GetWorkspaceNetworkOptionRequest,
    options?: CallOptions
  ): Promise<WorkspaceNetworkOption> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/network`;
    let resp: WorkspaceNetworkOption | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceNetworkOptionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the network option for a workspace. This operation associates the workspace with the specified network policy.
   * To revert to the default policy, specify 'default-policy' as the network_policy_id.
   */
  async updateWorkspaceNetworkOptionRpc(
    req: UpdateWorkspaceNetworkOptionRequest,
    options?: CallOptions
  ): Promise<WorkspaceNetworkOption> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/network`;
    const body = marshalRequest(
      req.workspaceNetworkOption,
      marshalWorkspaceNetworkOptionSchema
    );
    let resp: WorkspaceNetworkOption | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceNetworkOptionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
