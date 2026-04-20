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
   * Creates a new account access identity rule for a given account.
   * This allows administrators to explicitly allow or deny specific principals from accessing the account.
   */
  async createAccountAccessIdentityRule(
    signal: AbortSignal | undefined,
    req: CreateAccountAccessIdentityRuleRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountAccessIdentityRuleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes an account access identity rule for a given principal. */
  async deleteAccountAccessIdentityRule(
    signal: AbortSignal | undefined,
    req: DeleteAccountAccessIdentityRuleRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/${req.parent ?? ''}/account-access-identity-rules/${req.externalPrincipalId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Gets an account access identity rule for a given principal. */
  async getAccountAccessIdentityRule(
    signal: AbortSignal | undefined,
    req: GetAccountAccessIdentityRuleRequest,
    options?: Options
  ): Promise<AccountAccessIdentityRule> {
    const url = `${this.host}/api/2.0/${req.parent ?? ''}/account-access-identity-rules/${req.externalPrincipalId ?? ''}`;
    let resp: AccountAccessIdentityRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountAccessIdentityRuleSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ListAccountAccessIdentityRulesRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a group membership (assigns a principal to a group). */
  async createDirectGroupMember(
    signal: AbortSignal | undefined,
    req: CreateDirectGroupMemberRequest,
    options?: Options
  ): Promise<DirectGroupMember> {
    const url = `${this.host}/api/2.0/identity/accounts//groups/${String(req.groupId ?? '')}/direct-members`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.directGroupMember,
      marshalDirectGroupMemberSchema
    );
    let resp: DirectGroupMember | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDirectGroupMemberSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a group membership (assigns a principal to a group). */
  async createDirectGroupMemberProxy(
    signal: AbortSignal | undefined,
    req: CreateDirectGroupMemberProxyRequest,
    options?: Options
  ): Promise<DirectGroupMember> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.groupId ?? '')}/direct-members`;
    const body = marshalRequest(
      req.directGroupMember,
      marshalDirectGroupMemberSchema
    );
    let resp: DirectGroupMember | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDirectGroupMemberSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createGroup(
    signal: AbortSignal | undefined,
    req: CreateGroupRequest,
    options?: Options
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/accounts/{account_id}/groups`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.group, marshalGroupSchema);
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createGroupProxy(
    signal: AbortSignal | undefined,
    req: CreateGroupProxyRequest,
    options?: Options
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/groups`;
    const body = marshalRequest(req.group, marshalGroupSchema);
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a group membership (unassigns a principal from a group). */
  async deleteDirectGroupMember(
    signal: AbortSignal | undefined,
    req: DeleteDirectGroupMemberRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts//groups/${String(req.groupId ?? '')}/direct-members/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Deletes a group membership (unassigns a principal from a group). */
  async deleteDirectGroupMemberProxy(
    signal: AbortSignal | undefined,
    req: DeleteDirectGroupMemberProxyRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.groupId ?? '')}/direct-members/${String(req.principalId ?? '')}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** TODO: Write description later when this method is implemented */
  async deleteGroup(
    signal: AbortSignal | undefined,
    req: DeleteGroupRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts//groups/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** TODO: Write description later when this method is implemented */
  async deleteGroupProxy(
    signal: AbortSignal | undefined,
    req: DeleteGroupProxyRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.internalId ?? '')}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Gets a provisioned direct member of a group. */
  async getDirectGroupMember(
    signal: AbortSignal | undefined,
    req: GetDirectGroupMemberRequest,
    options?: Options
  ): Promise<DirectGroupMember> {
    const url = `${this.host}/api/2.0/identity/accounts//groups/${String(req.groupId ?? '')}/direct-members/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DirectGroupMember | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDirectGroupMemberSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a provisioned direct member of a group. */
  async getDirectGroupMemberProxy(
    signal: AbortSignal | undefined,
    req: GetDirectGroupMemberProxyRequest,
    options?: Options
  ): Promise<DirectGroupMember> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.groupId ?? '')}/direct-members/${String(req.principalId ?? '')}`;
    let resp: DirectGroupMember | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDirectGroupMemberSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async getGroup(
    signal: AbortSignal | undefined,
    req: GetGroupRequest,
    options?: Options
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/accounts//groups/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async getGroupProxy(
    signal: AbortSignal | undefined,
    req: GetGroupProxyRequest,
    options?: Options
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.internalId ?? '')}`;
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists provisioned direct members of a group with their membership source (internal or from identity provider). */
  async listDirectGroupMembers(
    signal: AbortSignal | undefined,
    req: ListDirectGroupMembersRequest,
    options?: Options
  ): Promise<ListDirectGroupMembersResponse> {
    const url = `${this.host}/api/2.0/identity/accounts//groups/${String(req.groupId ?? '')}/direct-members`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists provisioned direct members of a group with their membership source (internal or from identity provider). */
  async listDirectGroupMembersProxy(
    signal: AbortSignal | undefined,
    req: ListDirectGroupMembersProxyRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listGroups(
    signal: AbortSignal | undefined,
    req: ListGroupsRequest,
    options?: Options
  ): Promise<ListGroupsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/{account_id}/groups`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListGroupsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listGroupsProxy(
    signal: AbortSignal | undefined,
    req: ListGroupsProxyRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListGroupsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all transitive parent groups of a principal. */
  async listTransitiveParentGroups(
    signal: AbortSignal | undefined,
    req: ListTransitiveParentGroupsRequest,
    options?: Options
  ): Promise<ListTransitiveParentGroupsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts//principals/${String(req.principalId ?? '')}/transitive-parent-groups`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all transitive parent groups of a principal. */
  async listTransitiveParentGroupsProxy(
    signal: AbortSignal | undefined,
    req: ListTransitiveParentGroupsProxyRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ResolveGroupRequest,
    options?: Options
  ): Promise<ResolveGroupResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/{account_id}/groups/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveGroupRequestSchema);
    let resp: ResolveGroupResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResolveGroupResponseSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ResolveGroupProxyRequest,
    options?: Options
  ): Promise<ResolveGroupResponse> {
    const url = `${this.host}/api/2.0/identity/groups/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveGroupProxyRequestSchema);
    let resp: ResolveGroupResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResolveGroupResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateGroup(
    signal: AbortSignal | undefined,
    req: UpdateGroupRequest,
    options?: Options
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/accounts//groups/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.group, marshalGroupSchema);
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateGroupProxy(
    signal: AbortSignal | undefined,
    req: UpdateGroupProxyRequest,
    options?: Options
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/identity/groups/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.group, marshalGroupSchema);
    let resp: Group | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGroupSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createServicePrincipal(
    signal: AbortSignal | undefined,
    req: CreateServicePrincipalRequest,
    options?: Options
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/accounts/{account_id}/servicePrincipals`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.servicePrincipal,
      marshalServicePrincipalSchema
    );
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createServicePrincipalProxy(
    signal: AbortSignal | undefined,
    req: CreateServicePrincipalProxyRequest,
    options?: Options
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals`;
    const body = marshalRequest(
      req.servicePrincipal,
      marshalServicePrincipalSchema
    );
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async deleteServicePrincipal(
    signal: AbortSignal | undefined,
    req: DeleteServicePrincipalRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts//servicePrincipals/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** TODO: Write description later when this method is implemented */
  async deleteServicePrincipalProxy(
    signal: AbortSignal | undefined,
    req: DeleteServicePrincipalProxyRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals/${String(req.internalId ?? '')}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** TODO: Write description later when this method is implemented */
  async getServicePrincipal(
    signal: AbortSignal | undefined,
    req: GetServicePrincipalRequest,
    options?: Options
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/accounts//servicePrincipals/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async getServicePrincipalProxy(
    signal: AbortSignal | undefined,
    req: GetServicePrincipalProxyRequest,
    options?: Options
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals/${String(req.internalId ?? '')}`;
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listServicePrincipals(
    signal: AbortSignal | undefined,
    req: ListServicePrincipalsRequest,
    options?: Options
  ): Promise<ListServicePrincipalsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/{account_id}/servicePrincipals`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listServicePrincipalsProxy(
    signal: AbortSignal | undefined,
    req: ListServicePrincipalsProxyRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ResolveServicePrincipalRequest,
    options?: Options
  ): Promise<ResolveServicePrincipalResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/{account_id}/servicePrincipals/resolveByExternalId`;
    const body = marshalRequest(
      req,
      marshalResolveServicePrincipalRequestSchema
    );
    let resp: ResolveServicePrincipalResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ResolveServicePrincipalProxyRequest,
    options?: Options
  ): Promise<ResolveServicePrincipalResponse> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals/resolveByExternalId`;
    const body = marshalRequest(
      req,
      marshalResolveServicePrincipalProxyRequestSchema
    );
    let resp: ResolveServicePrincipalResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateServicePrincipal(
    signal: AbortSignal | undefined,
    req: UpdateServicePrincipalRequest,
    options?: Options
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/accounts//servicePrincipals/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.servicePrincipal,
      marshalServicePrincipalSchema
    );
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateServicePrincipalProxy(
    signal: AbortSignal | undefined,
    req: UpdateServicePrincipalProxyRequest,
    options?: Options
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.servicePrincipal,
      marshalServicePrincipalSchema
    );
    let resp: ServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalServicePrincipalSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createUser(
    signal: AbortSignal | undefined,
    req: CreateUserRequest,
    options?: Options
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/accounts/{account_id}/users`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.user, marshalUserSchema);
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async createUserProxy(
    signal: AbortSignal | undefined,
    req: CreateUserProxyRequest,
    options?: Options
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/users`;
    const body = marshalRequest(req.user, marshalUserSchema);
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async deleteUser(
    signal: AbortSignal | undefined,
    req: DeleteUserRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts//users/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** TODO: Write description later when this method is implemented */
  async deleteUserProxy(
    signal: AbortSignal | undefined,
    req: DeleteUserProxyRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/users/${String(req.internalId ?? '')}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** TODO: Write description later when this method is implemented */
  async getUser(
    signal: AbortSignal | undefined,
    req: GetUserRequest,
    options?: Options
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/accounts//users/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async getUserProxy(
    signal: AbortSignal | undefined,
    req: GetUserProxyRequest,
    options?: Options
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/users/${String(req.internalId ?? '')}`;
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listUsers(
    signal: AbortSignal | undefined,
    req: ListUsersRequest,
    options?: Options
  ): Promise<ListUsersResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/{account_id}/users`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListUsersResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listUsersProxy(
    signal: AbortSignal | undefined,
    req: ListUsersProxyRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListUsersResponseSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ResolveUserRequest,
    options?: Options
  ): Promise<ResolveUserResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/{account_id}/users/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveUserRequestSchema);
    let resp: ResolveUserResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResolveUserResponseSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ResolveUserProxyRequest,
    options?: Options
  ): Promise<ResolveUserResponse> {
    const url = `${this.host}/api/2.0/identity/users/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveUserProxyRequestSchema);
    let resp: ResolveUserResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResolveUserResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateUser(
    signal: AbortSignal | undefined,
    req: UpdateUserRequest,
    options?: Options
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/accounts//users/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.user, marshalUserSchema);
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async updateUserProxy(
    signal: AbortSignal | undefined,
    req: UpdateUserProxyRequest,
    options?: Options
  ): Promise<User> {
    const url = `${this.host}/api/2.0/identity/users/${String(req.internalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.user, marshalUserSchema);
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetWorkspaceAccessDetailRequest,
    options?: Options
  ): Promise<WorkspaceAccessDetail> {
    const url = `${this.host}/api/2.0/identity/accounts//workspaces/${String(req.workspaceId ?? '')}/workspaceAccessDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: WorkspaceAccessDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAccessDetailSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetWorkspaceAccessDetailLocalRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAccessDetailSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listWorkspaceAccessDetails(
    signal: AbortSignal | undefined,
    req: ListWorkspaceAccessDetailsRequest,
    options?: Options
  ): Promise<ListWorkspaceAccessDetailsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts//workspaces/${String(req.workspaceId ?? '')}/workspaceAccessDetails`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** TODO: Write description later when this method is implemented */
  async listWorkspaceAccessDetailsLocal(
    signal: AbortSignal | undefined,
    req: ListWorkspaceAccessDetailsLocalRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: CreateWorkspaceAssignmentDetailRequest,
    options?: Options
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/accounts//workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.workspaceAssignmentDetail,
      marshalWorkspaceAssignmentDetailSchema
    );
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: CreateWorkspaceAssignmentDetailProxyRequest,
    options?: Options
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails`;
    const body = marshalRequest(
      req.workspaceAssignmentDetail,
      marshalWorkspaceAssignmentDetailSchema
    );
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: DeleteWorkspaceAssignmentDetailRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts//workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /**
   * Deletes a workspace assignment detail for a principal (workspace-level proxy), revoking all
   * associated entitlements. Entitlement revocations are applied individually and non-atomically
   * — if a failure occurs partway through, the principal remains assigned with a subset of its
   * original entitlements, and the operation is safe to retry.
   */
  async deleteWorkspaceAssignmentDetailProxy(
    signal: AbortSignal | undefined,
    req: DeleteWorkspaceAssignmentDetailProxyRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Returns the assignment details for a principal in a workspace. */
  async getWorkspaceAssignmentDetail(
    signal: AbortSignal | undefined,
    req: GetWorkspaceAssignmentDetailRequest,
    options?: Options
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/accounts//workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the assignment details for a principal in a workspace (workspace-level proxy). */
  async getWorkspaceAssignmentDetailProxy(
    signal: AbortSignal | undefined,
    req: GetWorkspaceAssignmentDetailProxyRequest,
    options?: Options
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists workspace assignment details for a workspace. */
  async listWorkspaceAssignmentDetails(
    signal: AbortSignal | undefined,
    req: ListWorkspaceAssignmentDetailsRequest,
    options?: Options
  ): Promise<ListWorkspaceAssignmentDetailsResponse> {
    const url = `${this.host}/api/2.0/identity/accounts//workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists workspace assignment details for a workspace (workspace-level proxy). */
  async listWorkspaceAssignmentDetailsProxy(
    signal: AbortSignal | undefined,
    req: ListWorkspaceAssignmentDetailsProxyRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateWorkspaceAssignmentDetailRequest,
    options?: Options
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/accounts//workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.workspaceAssignmentDetail,
      marshalWorkspaceAssignmentDetailSchema
    );
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateWorkspaceAssignmentDetailProxyRequest,
    options?: Options
  ): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.workspaceAssignmentDetail,
      marshalWorkspaceAssignmentDetailSchema
    );
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the identity details for a principal in a workspace. */
  async getWorkspaceIdentityDetail(
    signal: AbortSignal | undefined,
    req: GetWorkspaceIdentityDetailRequest,
    options?: Options
  ): Promise<WorkspaceIdentityDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceIdentityDetails/${String(req.principalId ?? '')}`;
    let resp: WorkspaceIdentityDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceIdentityDetailSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a workspace identity detail for a principal. */
  async updateWorkspaceIdentityDetail(
    signal: AbortSignal | undefined,
    req: UpdateWorkspaceIdentityDetailRequest,
    options?: Options
  ): Promise<WorkspaceIdentityDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceIdentityDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.workspaceIdentityDetail,
      marshalWorkspaceIdentityDetailSchema
    );
    let resp: WorkspaceIdentityDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceIdentityDetailSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
