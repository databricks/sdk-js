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
import type {
  AccountAccessIdentityRule,
  CreateAccountAccessIdentityRuleRequest,
  CreateDirectGroupMemberProxyRequest,
  CreateDirectGroupMemberRequest,
  CreateGroupProxyRequest,
  CreateGroupRequest,
  CreateServicePrincipalProxyRequest,
  CreateServicePrincipalRequest,
  CreateUserProxyRequest,
  CreateUserRequest,
  CreateWorkspaceAssignmentDetailProxyRequest,
  CreateWorkspaceAssignmentDetailRequest,
  DeleteAccountAccessIdentityRuleRequest,
  DeleteDirectGroupMemberProxyRequest,
  DeleteDirectGroupMemberRequest,
  DeleteGroupProxyRequest,
  DeleteGroupRequest,
  DeleteServicePrincipalProxyRequest,
  DeleteServicePrincipalRequest,
  DeleteUserProxyRequest,
  DeleteUserRequest,
  DeleteWorkspaceAssignmentDetailProxyRequest,
  DeleteWorkspaceAssignmentDetailRequest,
  DirectGroupMember,
  GetAccountAccessIdentityRuleRequest,
  GetDirectGroupMemberProxyRequest,
  GetDirectGroupMemberRequest,
  GetGroupProxyRequest,
  GetGroupRequest,
  GetServicePrincipalProxyRequest,
  GetServicePrincipalRequest,
  GetUserProxyRequest,
  GetUserRequest,
  GetWorkspaceAccessDetailLocalRequest,
  GetWorkspaceAccessDetailRequest,
  GetWorkspaceAssignmentDetailProxyRequest,
  GetWorkspaceAssignmentDetailRequest,
  GetWorkspaceIdentityDetailRequest,
  Group,
  ListAccountAccessIdentityRulesRequest,
  ListAccountAccessIdentityRulesResponse,
  ListDirectGroupMembersProxyRequest,
  ListDirectGroupMembersRequest,
  ListDirectGroupMembersResponse,
  ListGroupsProxyRequest,
  ListGroupsRequest,
  ListGroupsResponse,
  ListServicePrincipalsProxyRequest,
  ListServicePrincipalsRequest,
  ListServicePrincipalsResponse,
  ListTransitiveParentGroupsProxyRequest,
  ListTransitiveParentGroupsRequest,
  ListTransitiveParentGroupsResponse,
  ListUsersProxyRequest,
  ListUsersRequest,
  ListUsersResponse,
  ListWorkspaceAccessDetailsLocalRequest,
  ListWorkspaceAccessDetailsRequest,
  ListWorkspaceAccessDetailsResponse,
  ListWorkspaceAssignmentDetailsProxyRequest,
  ListWorkspaceAssignmentDetailsRequest,
  ListWorkspaceAssignmentDetailsResponse,
  ResolveGroupProxyRequest,
  ResolveGroupRequest,
  ResolveGroupResponse,
  ResolveServicePrincipalProxyRequest,
  ResolveServicePrincipalRequest,
  ResolveServicePrincipalResponse,
  ResolveUserProxyRequest,
  ResolveUserRequest,
  ResolveUserResponse,
  ServicePrincipal,
  UpdateGroupProxyRequest,
  UpdateGroupRequest,
  UpdateServicePrincipalProxyRequest,
  UpdateServicePrincipalRequest,
  UpdateUserProxyRequest,
  UpdateUserRequest,
  UpdateWorkspaceAssignmentDetailProxyRequest,
  UpdateWorkspaceAssignmentDetailRequest,
  UpdateWorkspaceIdentityDetailRequest,
  User,
  WorkspaceAccessDetail,
  WorkspaceAssignmentDetail,
  WorkspaceIdentityDetail,
} from './model';
import {
  marshalAccountAccessIdentityRuleSchema,
  marshalDirectGroupMemberSchema,
  marshalGroupSchema,
  marshalResolveGroupProxyRequestSchema,
  marshalResolveGroupRequestSchema,
  marshalResolveServicePrincipalProxyRequestSchema,
  marshalResolveServicePrincipalRequestSchema,
  marshalResolveUserProxyRequestSchema,
  marshalResolveUserRequestSchema,
  marshalServicePrincipalSchema,
  marshalUserSchema,
  marshalWorkspaceAssignmentDetailSchema,
  marshalWorkspaceIdentityDetailSchema,
  unmarshalAccountAccessIdentityRuleSchema,
  unmarshalDirectGroupMemberSchema,
  unmarshalGroupSchema,
  unmarshalListAccountAccessIdentityRulesResponseSchema,
  unmarshalListDirectGroupMembersResponseSchema,
  unmarshalListGroupsResponseSchema,
  unmarshalListServicePrincipalsResponseSchema,
  unmarshalListTransitiveParentGroupsResponseSchema,
  unmarshalListUsersResponseSchema,
  unmarshalListWorkspaceAccessDetailsResponseSchema,
  unmarshalListWorkspaceAssignmentDetailsResponseSchema,
  unmarshalResolveGroupResponseSchema,
  unmarshalResolveServicePrincipalResponseSchema,
  unmarshalResolveUserResponseSchema,
  unmarshalServicePrincipalSchema,
  unmarshalUserSchema,
  unmarshalWorkspaceAccessDetailSchema,
  unmarshalWorkspaceAssignmentDetailSchema,
  unmarshalWorkspaceIdentityDetailSchema,
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
   * Creates a new account access identity rule for a given account.
   * This allows administrators to explicitly allow or deny specific principals from accessing the account.
   */
  async createAccountAccessIdentityRule(
    req: CreateAccountAccessIdentityRuleRequest,
    options?: CallOptions
  ): Promise<AccountAccessIdentityRule> {
    const url = `${this.host}/api/2.0/${req.parent ?? ''}/account-access-identity-rules`;
    const params = new URLSearchParams();
    if (req.externalPrincipalId !== undefined) {
      params.append('external_principal_id', req.externalPrincipalId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.accountAccessIdentityRule,
      marshalAccountAccessIdentityRuleSchema
    );
    let resp: AccountAccessIdentityRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountAccessIdentityRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes an account access identity rule for a given principal. */
  async deleteAccountAccessIdentityRule(
    req: DeleteAccountAccessIdentityRuleRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/${req.parent ?? ''}/account-access-identity-rules/${req.externalPrincipalId ?? ''}`;
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

  /** Gets an account access identity rule for a given principal. */
  async getAccountAccessIdentityRule(
    req: GetAccountAccessIdentityRuleRequest,
    options?: CallOptions
  ): Promise<AccountAccessIdentityRule> {
    const url = `${this.host}/api/2.0/${req.parent ?? ''}/account-access-identity-rules/${req.externalPrincipalId ?? ''}`;
    let resp: AccountAccessIdentityRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountAccessIdentityRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Lists all account access identity rules for a given account.
   * These rules control which principals (users, service principals, groups) from the customer's IdP
   * are allowed or denied access to the <Databricks> account.
   */
  async listAccountAccessIdentityRules(
    req: ListAccountAccessIdentityRulesRequest,
    options?: CallOptions
  ): Promise<ListAccountAccessIdentityRulesResponse> {
    const url = `${this.host}/api/2.0/${req.parent ?? ''}/account-access-identity-rules`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAccountAccessIdentityRulesResponse | undefined;
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
        unmarshalListAccountAccessIdentityRulesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a group membership (assigns a principal to a group). */
  async createDirectGroupMember(
    req: CreateDirectGroupMemberRequest,
    options?: CallOptions
  ): Promise<DirectGroupMember> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups/${String(req.groupId ?? '')}/direct-members`;
    const body = marshalRequest(
      req.directGroupMember,
      marshalDirectGroupMemberSchema
    );
    let resp: DirectGroupMember | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDirectGroupMemberSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a group membership (assigns a principal to a group). */
  async createDirectGroupMemberProxy(
    req: CreateDirectGroupMemberProxyRequest,
    options?: CallOptions
  ): Promise<DirectGroupMember> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.groupId ?? '')}/direct-members`;
    const body = marshalRequest(
      req.directGroupMember,
      marshalDirectGroupMemberSchema
    );
    let resp: DirectGroupMember | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDirectGroupMemberSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createGroup(
    req: CreateGroupRequest,
    options?: CallOptions
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups`;
    const body = marshalRequest(req.group, marshalGroupSchema);
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createGroupProxy(
    req: CreateGroupProxyRequest,
    options?: CallOptions
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/groups`;
    const body = marshalRequest(req.group, marshalGroupSchema);
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a group membership (unassigns a principal from a group). */
  async deleteDirectGroupMember(
    req: DeleteDirectGroupMemberRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups/${String(req.groupId ?? '')}/direct-members/${String(req.principalId ?? '')}`;
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

  /** Deletes a group membership (unassigns a principal from a group). */
  async deleteDirectGroupMemberProxy(
    req: DeleteDirectGroupMemberProxyRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.groupId ?? '')}/direct-members/${String(req.principalId ?? '')}`;
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

  /** TODO: Write description later when this method is implemented */
  async deleteGroup(
    req: DeleteGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups/${String(req.internalId ?? '')}`;
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

  /** TODO: Write description later when this method is implemented */
  async deleteGroupProxy(
    req: DeleteGroupProxyRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.internalId ?? '')}`;
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

  /** Gets a provisioned direct member of a group. */
  async getDirectGroupMember(
    req: GetDirectGroupMemberRequest,
    options?: CallOptions
  ): Promise<DirectGroupMember> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups/${String(req.groupId ?? '')}/direct-members/${String(req.principalId ?? '')}`;
    let resp: DirectGroupMember | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDirectGroupMemberSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a provisioned direct member of a group. */
  async getDirectGroupMemberProxy(
    req: GetDirectGroupMemberProxyRequest,
    options?: CallOptions
  ): Promise<DirectGroupMember> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.groupId ?? '')}/direct-members/${String(req.principalId ?? '')}`;
    let resp: DirectGroupMember | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDirectGroupMemberSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async getGroup(req: GetGroupRequest, options?: CallOptions): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups/${String(req.internalId ?? '')}`;
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async getGroupProxy(
    req: GetGroupProxyRequest,
    options?: CallOptions
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.internalId ?? '')}`;
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists provisioned direct members of a group with their membership source (internal or from identity provider). */
  async listDirectGroupMembers(
    req: ListDirectGroupMembersRequest,
    options?: CallOptions
  ): Promise<ListDirectGroupMembersResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups/${String(req.groupId ?? '')}/direct-members`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDirectGroupMembersResponse | undefined;
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
        unmarshalListDirectGroupMembersResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists provisioned direct members of a group with their membership source (internal or from identity provider). */
  async listDirectGroupMembersProxy(
    req: ListDirectGroupMembersProxyRequest,
    options?: CallOptions
  ): Promise<ListDirectGroupMembersResponse> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.groupId ?? '')}/direct-members`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDirectGroupMembersResponse | undefined;
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
        unmarshalListDirectGroupMembersResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listGroups(
    req: ListGroupsRequest,
    options?: CallOptions
  ): Promise<ListGroupsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListGroupsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListGroupsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listGroupsProxy(
    req: ListGroupsProxyRequest,
    options?: CallOptions
  ): Promise<ListGroupsResponse> {
    const url = `${this.host}/api/2.0/identity/groups`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListGroupsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListGroupsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all transitive parent groups of a principal. */
  async listTransitiveParentGroups(
    req: ListTransitiveParentGroupsRequest,
    options?: CallOptions
  ): Promise<ListTransitiveParentGroupsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/principals/${String(req.principalId ?? '')}/transitive-parent-groups`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListTransitiveParentGroupsResponse | undefined;
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
        unmarshalListTransitiveParentGroupsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all transitive parent groups of a principal. */
  async listTransitiveParentGroupsProxy(
    req: ListTransitiveParentGroupsProxyRequest,
    options?: CallOptions
  ): Promise<ListTransitiveParentGroupsResponse> {
    const url = `${this.host}/api/2.0/identity/principals/${String(req.principalId ?? '')}/transitive-parent-groups`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListTransitiveParentGroupsResponse | undefined;
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
        unmarshalListTransitiveParentGroupsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Resolves a group with the given external ID from the customer's IdP. If the group does not exist, it will be created in the account.
   * If the customer is not onboarded onto Automatic Identity Management (AIM), this will return an error.
   */
  async resolveGroup(
    req: ResolveGroupRequest,
    options?: CallOptions
  ): Promise<ResolveGroupResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveGroupRequestSchema);
    let resp: ResolveGroupResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResolveGroupResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Resolves a group with the given external ID from the customer's IdP. If the group does not exist, it will be created in the account.
   * If the customer is not onboarded onto Automatic Identity Management (AIM), this will return an error.
   */
  async resolveGroupProxy(
    req: ResolveGroupProxyRequest,
    options?: CallOptions
  ): Promise<ResolveGroupResponse> {
    const url = `${this.host}/api/2.0/identity/groups/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveGroupProxyRequestSchema);
    let resp: ResolveGroupResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResolveGroupResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateGroup(
    req: UpdateGroupRequest,
    options?: CallOptions
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.group, marshalGroupSchema);
    let resp: Group | undefined;
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
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateGroupProxy(
    req: UpdateGroupProxyRequest,
    options?: CallOptions
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.group, marshalGroupSchema);
    let resp: Group | undefined;
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
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createServicePrincipal(
    req: CreateServicePrincipalRequest,
    options?: CallOptions
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals`;
    const body = marshalRequest(
      req.servicePrincipal,
      marshalServicePrincipalSchema
    );
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createServicePrincipalProxy(
    req: CreateServicePrincipalProxyRequest,
    options?: CallOptions
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals`;
    const body = marshalRequest(
      req.servicePrincipal,
      marshalServicePrincipalSchema
    );
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async deleteServicePrincipal(
    req: DeleteServicePrincipalRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${String(req.internalId ?? '')}`;
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

  /** TODO: Write description later when this method is implemented */
  async deleteServicePrincipalProxy(
    req: DeleteServicePrincipalProxyRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals/${String(req.internalId ?? '')}`;
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

  /** TODO: Write description later when this method is implemented */
  async getServicePrincipal(
    req: GetServicePrincipalRequest,
    options?: CallOptions
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${String(req.internalId ?? '')}`;
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async getServicePrincipalProxy(
    req: GetServicePrincipalProxyRequest,
    options?: CallOptions
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals/${String(req.internalId ?? '')}`;
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listServicePrincipals(
    req: ListServicePrincipalsRequest,
    options?: CallOptions
  ): Promise<ListServicePrincipalsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListServicePrincipalsResponse | undefined;
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
        unmarshalListServicePrincipalsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listServicePrincipalsProxy(
    req: ListServicePrincipalsProxyRequest,
    options?: CallOptions
  ): Promise<ListServicePrincipalsResponse> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListServicePrincipalsResponse | undefined;
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
        unmarshalListServicePrincipalsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Resolves an SP with the given external ID from the customer's IdP. If the SP does not exist, it will be created.
   * If the customer is not onboarded onto Automatic Identity Management (AIM), this will return an error.
   */
  async resolveServicePrincipal(
    req: ResolveServicePrincipalRequest,
    options?: CallOptions
  ): Promise<ResolveServicePrincipalResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/resolveByExternalId`;
    const body = marshalRequest(
      req,
      marshalResolveServicePrincipalRequestSchema
    );
    let resp: ResolveServicePrincipalResponse | undefined;
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
        unmarshalResolveServicePrincipalResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Resolves an SP with the given external ID from the customer's IdP. If the SP does not exist, it will be created.
   * If the customer is not onboarded onto Automatic Identity Management (AIM), this will return an error.
   */
  async resolveServicePrincipalProxy(
    req: ResolveServicePrincipalProxyRequest,
    options?: CallOptions
  ): Promise<ResolveServicePrincipalResponse> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals/resolveByExternalId`;
    const body = marshalRequest(
      req,
      marshalResolveServicePrincipalProxyRequestSchema
    );
    let resp: ResolveServicePrincipalResponse | undefined;
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
        unmarshalResolveServicePrincipalResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateServicePrincipal(
    req: UpdateServicePrincipalRequest,
    options?: CallOptions
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.servicePrincipal,
      marshalServicePrincipalSchema
    );
    let resp: ServicePrincipal | undefined;
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
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateServicePrincipalProxy(
    req: UpdateServicePrincipalProxyRequest,
    options?: CallOptions
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.servicePrincipal,
      marshalServicePrincipalSchema
    );
    let resp: ServicePrincipal | undefined;
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
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createUser(
    req: CreateUserRequest,
    options?: CallOptions
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/users`;
    const body = marshalRequest(req.user, marshalUserSchema);
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createUserProxy(
    req: CreateUserProxyRequest,
    options?: CallOptions
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/users`;
    const body = marshalRequest(req.user, marshalUserSchema);
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async deleteUser(
    req: DeleteUserRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/users/${String(req.internalId ?? '')}`;
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

  /** TODO: Write description later when this method is implemented */
  async deleteUserProxy(
    req: DeleteUserProxyRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/users/${String(req.internalId ?? '')}`;
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

  /** TODO: Write description later when this method is implemented */
  async getUser(req: GetUserRequest, options?: CallOptions): Promise<User> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/users/${String(req.internalId ?? '')}`;
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async getUserProxy(
    req: GetUserProxyRequest,
    options?: CallOptions
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/users/${String(req.internalId ?? '')}`;
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listUsers(
    req: ListUsersRequest,
    options?: CallOptions
  ): Promise<ListUsersResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/users`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListUsersResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListUsersResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listUsersProxy(
    req: ListUsersProxyRequest,
    options?: CallOptions
  ): Promise<ListUsersResponse> {
    const url = `${this.host}/api/2.0/identity/users`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListUsersResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListUsersResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Resolves a user with the given external ID from the customer's IdP. If the user does not exist, it will be created.
   * If the customer is not onboarded onto Automatic Identity Management (AIM), this will return an error.
   */
  async resolveUser(
    req: ResolveUserRequest,
    options?: CallOptions
  ): Promise<ResolveUserResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/users/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveUserRequestSchema);
    let resp: ResolveUserResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResolveUserResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Resolves a user with the given external ID from the customer's IdP. If the user does not exist, it will be created.
   * If the customer is not onboarded onto Automatic Identity Management (AIM), this will return an error.
   */
  async resolveUserProxy(
    req: ResolveUserProxyRequest,
    options?: CallOptions
  ): Promise<ResolveUserResponse> {
    const url = `${this.host}/api/2.0/identity/users/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveUserProxyRequestSchema);
    let resp: ResolveUserResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResolveUserResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateUser(
    req: UpdateUserRequest,
    options?: CallOptions
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/users/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.user, marshalUserSchema);
    let resp: User | undefined;
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
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateUserProxy(
    req: UpdateUserProxyRequest,
    options?: CallOptions
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/users/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.user, marshalUserSchema);
    let resp: User | undefined;
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
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the access details for a principal in a workspace. Allows for checking access details for any
   * provisioned principal (user, service principal, or group) in a workspace.
   * * Provisioned principal here refers to one that has been synced into <Databricks> from the customer's IdP or
   * added explicitly to <Databricks> via SCIM/UI.
   * Allows for passing in a "view" parameter to control what fields are returned (BASIC by default or FULL).
   */
  async getWorkspaceAccessDetail(
    req: GetWorkspaceAccessDetailRequest,
    options?: CallOptions
  ): Promise<WorkspaceAccessDetail> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAccessDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: WorkspaceAccessDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAccessDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the access details for a principal in the current workspace. Allows for checking access details for any
   * provisioned principal (user, service principal, or group) in the current workspace.
   * * Provisioned principal here refers to one that has been synced into <Databricks> from the customer's IdP or
   * added explicitly to <Databricks> via SCIM/UI.
   * Allows for passing in a "view" parameter to control what fields are returned (BASIC by default or FULL).
   */
  async getWorkspaceAccessDetailLocal(
    req: GetWorkspaceAccessDetailLocalRequest,
    options?: CallOptions
  ): Promise<WorkspaceAccessDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAccessDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: WorkspaceAccessDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAccessDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listWorkspaceAccessDetails(
    req: ListWorkspaceAccessDetailsRequest,
    options?: CallOptions
  ): Promise<ListWorkspaceAccessDetailsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAccessDetails`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListWorkspaceAccessDetailsResponse | undefined;
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
        unmarshalListWorkspaceAccessDetailsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listWorkspaceAccessDetailsLocal(
    req: ListWorkspaceAccessDetailsLocalRequest,
    options?: CallOptions
  ): Promise<ListWorkspaceAccessDetailsResponse> {
    const url = `${this.host}/api/2.0/identity/workspaceAccessDetails`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListWorkspaceAccessDetailsResponse | undefined;
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
        unmarshalListWorkspaceAccessDetailsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a workspace assignment detail for a principal. Entitlement grants are applied
   * individually and non-atomically — if a failure occurs partway through, the principal will be
   * assigned to the workspace but with only a subset of the requested entitlements. Use
   * GetWorkspaceAssignmentDetail to confirm which entitlements were successfully granted.
   */
  async createWorkspaceAssignmentDetail(
    req: CreateWorkspaceAssignmentDetailRequest,
    options?: CallOptions
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails`;
    const body = marshalRequest(
      req.workspaceAssignmentDetail,
      marshalWorkspaceAssignmentDetailSchema
    );
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a workspace assignment detail for a principal (workspace-level proxy). Entitlement
   * grants are applied individually and non-atomically — if a failure occurs partway through, the
   * principal will be assigned to the workspace but with only a subset of the requested
   * entitlements. Use GetWorkspaceAssignmentDetail to confirm which entitlements were successfully
   * granted.
   */
  async createWorkspaceAssignmentDetailProxy(
    req: CreateWorkspaceAssignmentDetailProxyRequest,
    options?: CallOptions
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails`;
    const body = marshalRequest(
      req.workspaceAssignmentDetail,
      marshalWorkspaceAssignmentDetailSchema
    );
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a workspace assignment detail for a principal, revoking all associated entitlements.
   * Entitlement revocations are applied individually and non-atomically — if a failure occurs
   * partway through, the principal remains assigned with a subset of its original entitlements,
   * and the operation is safe to retry.
   */
  async deleteWorkspaceAssignmentDetail(
    req: DeleteWorkspaceAssignmentDetailRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
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

  /**
   * Deletes a workspace assignment detail for a principal (workspace-level proxy), revoking all
   * associated entitlements. Entitlement revocations are applied individually and non-atomically
   * — if a failure occurs partway through, the principal remains assigned with a subset of its
   * original entitlements, and the operation is safe to retry.
   */
  async deleteWorkspaceAssignmentDetailProxy(
    req: DeleteWorkspaceAssignmentDetailProxyRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
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

  /** Returns the assignment details for a principal in a workspace. */
  async getWorkspaceAssignmentDetail(
    req: GetWorkspaceAssignmentDetailRequest,
    options?: CallOptions
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the assignment details for a principal in a workspace (workspace-level proxy). */
  async getWorkspaceAssignmentDetailProxy(
    req: GetWorkspaceAssignmentDetailProxyRequest,
    options?: CallOptions
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists workspace assignment details for a workspace. */
  async listWorkspaceAssignmentDetails(
    req: ListWorkspaceAssignmentDetailsRequest,
    options?: CallOptions
  ): Promise<ListWorkspaceAssignmentDetailsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListWorkspaceAssignmentDetailsResponse | undefined;
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
        unmarshalListWorkspaceAssignmentDetailsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists workspace assignment details for a workspace (workspace-level proxy). */
  async listWorkspaceAssignmentDetailsProxy(
    req: ListWorkspaceAssignmentDetailsProxyRequest,
    options?: CallOptions
  ): Promise<ListWorkspaceAssignmentDetailsResponse> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListWorkspaceAssignmentDetailsResponse | undefined;
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
        unmarshalListWorkspaceAssignmentDetailsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the entitlements of a directly assigned principal in a workspace. Entitlement changes
   * are applied individually and non-atomically — if a failure occurs partway through, only a
   * subset of the requested changes may have been applied. Use GetWorkspaceAssignmentDetail to
   * confirm the final state.
   */
  async updateWorkspaceAssignmentDetail(
    req: UpdateWorkspaceAssignmentDetailRequest,
    options?: CallOptions
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.workspaceAssignmentDetail,
      marshalWorkspaceAssignmentDetailSchema
    );
    let resp: WorkspaceAssignmentDetail | undefined;
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
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the entitlements of a directly assigned principal in a workspace (workspace-level
   * proxy). Entitlement changes are applied individually and non-atomically — if a failure occurs
   * partway through, only a subset of the requested changes may have been applied. Use
   * GetWorkspaceAssignmentDetail to confirm the final state.
   */
  async updateWorkspaceAssignmentDetailProxy(
    req: UpdateWorkspaceAssignmentDetailProxyRequest,
    options?: CallOptions
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.workspaceAssignmentDetail,
      marshalWorkspaceAssignmentDetailSchema
    );
    let resp: WorkspaceAssignmentDetail | undefined;
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
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the identity details for a principal in a workspace. */
  async getWorkspaceIdentityDetail(
    req: GetWorkspaceIdentityDetailRequest,
    options?: CallOptions
  ): Promise<WorkspaceIdentityDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceIdentityDetails/${String(req.principalId ?? '')}`;
    let resp: WorkspaceIdentityDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceIdentityDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a workspace identity detail for a principal. */
  async updateWorkspaceIdentityDetail(
    req: UpdateWorkspaceIdentityDetailRequest,
    options?: CallOptions
  ): Promise<WorkspaceIdentityDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceIdentityDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.workspaceIdentityDetail,
      marshalWorkspaceIdentityDetailSchema
    );
    let resp: WorkspaceIdentityDetail | undefined;
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
      resp = parseResponse(respBody, unmarshalWorkspaceIdentityDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
