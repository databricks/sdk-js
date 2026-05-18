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
  AccountGroup,
  AccountServicePrincipal,
  AccountUser,
  CreateAccountGroupRequest,
  CreateAccountServicePrincipalRequest,
  CreateAccountUserRequest,
  CreateGroupRequest,
  CreateServicePrincipalRequest,
  CreateUserRequest,
  DeleteAccountGroupRequest,
  DeleteAccountServicePrincipalRequest,
  DeleteAccountUserRequest,
  DeleteGroupRequest,
  DeleteServicePrincipalRequest,
  DeleteUserRequest,
  GetAccountGroupRequest,
  GetAccountServicePrincipalRequest,
  GetAccountUserRequest,
  GetGroupRequest,
  GetPasswordPermissionLevelsRequest,
  GetPasswordPermissionLevelsResponse,
  GetPasswordPermissionsRequest,
  GetServicePrincipalRequest,
  GetUserRequest,
  Group,
  ListAccountGroupsRequest,
  ListAccountGroupsResponse,
  ListAccountServicePrincipalsRequest,
  ListAccountServicePrincipalsResponse,
  ListAccountUsersRequest,
  ListAccountUsersResponse,
  ListGroupsRequest,
  ListGroupsResponse,
  ListServicePrincipalResponse,
  ListServicePrincipalsRequest,
  ListUsersRequest,
  ListUsersResponse,
  MeRequest,
  PasswordPermissions,
  PasswordPermissionsRequest,
  PatchAccountGroupRequest,
  PatchAccountServicePrincipalRequest,
  PatchAccountUserRequest,
  PatchGroupRequest,
  PatchServicePrincipalRequest,
  PatchUserRequest,
  ServicePrincipal,
  UpdateAccountGroupRequest,
  UpdateAccountServicePrincipalRequest,
  UpdateAccountUserRequest,
  UpdateGroupRequest,
  UpdateServicePrincipalRequest,
  UpdateUserRequest,
  User,
} from './model';
import {
  marshalCreateAccountGroupRequestSchema,
  marshalCreateAccountServicePrincipalRequestSchema,
  marshalCreateAccountUserRequestSchema,
  marshalCreateGroupRequestSchema,
  marshalCreateServicePrincipalRequestSchema,
  marshalCreateUserRequestSchema,
  marshalPasswordPermissionsRequestSchema,
  marshalPatchAccountGroupRequestSchema,
  marshalPatchAccountServicePrincipalRequestSchema,
  marshalPatchAccountUserRequestSchema,
  marshalPatchGroupRequestSchema,
  marshalPatchServicePrincipalRequestSchema,
  marshalPatchUserRequestSchema,
  marshalUpdateAccountGroupRequestSchema,
  marshalUpdateAccountServicePrincipalRequestSchema,
  marshalUpdateAccountUserRequestSchema,
  marshalUpdateGroupRequestSchema,
  marshalUpdateServicePrincipalRequestSchema,
  marshalUpdateUserRequestSchema,
  unmarshalAccountGroupSchema,
  unmarshalAccountServicePrincipalSchema,
  unmarshalAccountUserSchema,
  unmarshalGetPasswordPermissionLevelsResponseSchema,
  unmarshalGroupSchema,
  unmarshalListAccountGroupsResponseSchema,
  unmarshalListAccountServicePrincipalsResponseSchema,
  unmarshalListAccountUsersResponseSchema,
  unmarshalListGroupsResponseSchema,
  unmarshalListServicePrincipalResponseSchema,
  unmarshalListUsersResponseSchema,
  unmarshalPasswordPermissionsSchema,
  unmarshalServicePrincipalSchema,
  unmarshalUserSchema,
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

  /** Creates a group in the <Databricks> account with a unique name, using the supplied group details. */
  async createAccountGroup(
    req: CreateAccountGroupRequest,
    options?: CallOptions
  ): Promise<AccountGroup> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Groups`;
    const body = marshalRequest(req, marshalCreateAccountGroupRequestSchema);
    let resp: AccountGroup | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a group from the <Databricks> account. */
  async deleteAccountGroup(
    req: DeleteAccountGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Groups/${req.id ?? ''}`;
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

  /** Gets the information for a specific group in the <Databricks> account. */
  async getAccountGroup(
    req: GetAccountGroupRequest,
    options?: CallOptions
  ): Promise<AccountGroup> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Groups/${req.id ?? ''}`;
    let resp: AccountGroup | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets all details of the groups associated with the <Databricks> account. As of 08/22/2025,
   * this endpoint will no longer return members. Instead, members should be retrieved by
   * iterating through `Get group details`. Existing accounts that rely on this attribute
   * will not be impacted and will continue receiving member data as before.
   */
  async listAccountGroups(
    req: ListAccountGroupsRequest,
    options?: CallOptions
  ): Promise<ListAccountGroupsResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Groups`;
    const params = new URLSearchParams();
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.attributes !== undefined) {
      params.append('attributes', req.attributes);
    }
    if (req.excludedAttributes !== undefined) {
      params.append('excludedAttributes', req.excludedAttributes);
    }
    if (req.startIndex !== undefined) {
      params.append('startIndex', String(req.startIndex));
    }
    if (req.count !== undefined) {
      params.append('count', String(req.count));
    }
    if (req.sortBy !== undefined) {
      params.append('sortBy', req.sortBy);
    }
    if (req.sortOrder !== undefined) {
      params.append('sortOrder', req.sortOrder);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAccountGroupsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListAccountGroupsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAccountGroupsIter(
    req: ListAccountGroupsRequest,
    options?: CallOptions
  ): AsyncGenerator<AccountGroup> {
    const pageReq: ListAccountGroupsRequest = {...req};
    for (;;) {
      const resp = await this.listAccountGroups(pageReq, options);
      const items = resp.resources ?? [];
      for (const item of items) {
        yield item;
      }
      if (items.length === 0) {
        return;
      }
      pageReq.startIndex = (resp.startIndex ?? 0) + items.length;
    }
  }

  /** Partially updates the details of a group. */
  async patchAccountGroup(
    req: PatchAccountGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Groups/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalPatchAccountGroupRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Updates the details of a group by replacing the entire group entity. */
  async updateAccountGroup(
    req: UpdateAccountGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Groups/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateAccountGroupRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Creates a new service principal in the <Databricks> account. */
  async createAccountServicePrincipal(
    req: CreateAccountServicePrincipalRequest,
    options?: CallOptions
  ): Promise<AccountServicePrincipal> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/ServicePrincipals`;
    const body = marshalRequest(
      req,
      marshalCreateAccountServicePrincipalRequestSchema
    );
    let resp: AccountServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountServicePrincipalSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a single service principal in the <Databricks> account. */
  async deleteAccountServicePrincipal(
    req: DeleteAccountServicePrincipalRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/ServicePrincipals/${req.id ?? ''}`;
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

  /** Gets the details for a single service principal define in the <Databricks> account. */
  async getAccountServicePrincipal(
    req: GetAccountServicePrincipalRequest,
    options?: CallOptions
  ): Promise<AccountServicePrincipal> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/ServicePrincipals/${req.id ?? ''}`;
    let resp: AccountServicePrincipal | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountServicePrincipalSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the set of service principals associated with a <Databricks> account. */
  async listAccountServicePrincipals(
    req: ListAccountServicePrincipalsRequest,
    options?: CallOptions
  ): Promise<ListAccountServicePrincipalsResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/ServicePrincipals`;
    const params = new URLSearchParams();
    if (req.attributes !== undefined) {
      params.append('attributes', req.attributes);
    }
    if (req.count !== undefined) {
      params.append('count', String(req.count));
    }
    if (req.excludedAttributes !== undefined) {
      params.append('excludedAttributes', req.excludedAttributes);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.sortBy !== undefined) {
      params.append('sortBy', req.sortBy);
    }
    if (req.sortOrder !== undefined) {
      params.append('sortOrder', req.sortOrder);
    }
    if (req.startIndex !== undefined) {
      params.append('startIndex', String(req.startIndex));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAccountServicePrincipalsResponse | undefined;
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
        unmarshalListAccountServicePrincipalsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAccountServicePrincipalsIter(
    req: ListAccountServicePrincipalsRequest,
    options?: CallOptions
  ): AsyncGenerator<AccountServicePrincipal> {
    const pageReq: ListAccountServicePrincipalsRequest = {...req};
    for (;;) {
      const resp = await this.listAccountServicePrincipals(pageReq, options);
      const items = resp.resources ?? [];
      for (const item of items) {
        yield item;
      }
      if (items.length === 0) {
        return;
      }
      pageReq.startIndex = (resp.startIndex ?? 0) + items.length;
    }
  }

  /** Partially updates the details of a single service principal in the <Databricks> account. */
  async patchAccountServicePrincipal(
    req: PatchAccountServicePrincipalRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/ServicePrincipals/${req.id ?? ''}`;
    const body = marshalRequest(
      req,
      marshalPatchAccountServicePrincipalRequestSchema
    );
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Updates the details of a single service principal.
   *
   * This action replaces the existing service principal with the same name.
   */
  async updateAccountServicePrincipal(
    req: UpdateAccountServicePrincipalRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/ServicePrincipals/${req.id ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateAccountServicePrincipalRequestSchema
    );
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Creates a new user in the <Databricks> account. This new user will also be added to the <Databricks> account. */
  async createAccountUser(
    req: CreateAccountUserRequest,
    options?: CallOptions
  ): Promise<AccountUser> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Users`;
    const body = marshalRequest(req, marshalCreateAccountUserRequestSchema);
    let resp: AccountUser | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountUserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a user. Deleting a user from a <Databricks> account also removes objects associated with the user. */
  async deleteAccountUser(
    req: DeleteAccountUserRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Users/${req.id ?? ''}`;
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

  /** Gets information for a specific user in <Databricks> account. */
  async getAccountUser(
    req: GetAccountUserRequest,
    options?: CallOptions
  ): Promise<AccountUser> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Users/${req.id ?? ''}`;
    const params = new URLSearchParams();
    if (req.attributes !== undefined) {
      params.append('attributes', req.attributes);
    }
    if (req.count !== undefined) {
      params.append('count', String(req.count));
    }
    if (req.excludedAttributes !== undefined) {
      params.append('excludedAttributes', req.excludedAttributes);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.sortBy !== undefined) {
      params.append('sortBy', req.sortBy);
    }
    if (req.sortOrder !== undefined) {
      params.append('sortOrder', req.sortOrder);
    }
    if (req.startIndex !== undefined) {
      params.append('startIndex', String(req.startIndex));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: AccountUser | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountUserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets details for all the users associated with a <Databricks> account. */
  async listAccountUsers(
    req: ListAccountUsersRequest,
    options?: CallOptions
  ): Promise<ListAccountUsersResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Users`;
    const params = new URLSearchParams();
    if (req.attributes !== undefined) {
      params.append('attributes', req.attributes);
    }
    if (req.count !== undefined) {
      params.append('count', String(req.count));
    }
    if (req.excludedAttributes !== undefined) {
      params.append('excludedAttributes', req.excludedAttributes);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.sortBy !== undefined) {
      params.append('sortBy', req.sortBy);
    }
    if (req.sortOrder !== undefined) {
      params.append('sortOrder', req.sortOrder);
    }
    if (req.startIndex !== undefined) {
      params.append('startIndex', String(req.startIndex));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAccountUsersResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListAccountUsersResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAccountUsersIter(
    req: ListAccountUsersRequest,
    options?: CallOptions
  ): AsyncGenerator<AccountUser> {
    const pageReq: ListAccountUsersRequest = {...req};
    for (;;) {
      const resp = await this.listAccountUsers(pageReq, options);
      const items = resp.resources ?? [];
      for (const item of items) {
        yield item;
      }
      if (items.length === 0) {
        return;
      }
      pageReq.startIndex = (resp.startIndex ?? 0) + items.length;
    }
  }

  /** Partially updates a user resource by applying the supplied operations on specific user attributes. */
  async patchAccountUser(
    req: PatchAccountUserRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Users/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalPatchAccountUserRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Replaces a user's information with the data supplied in request. */
  async updateAccountUser(
    req: UpdateAccountUserRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/scim/v2/Users/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateAccountUserRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Get details about the current method caller's identity. */
  async me(_req: MeRequest, options?: CallOptions): Promise<User> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Me`;
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

  /** Creates a group in the <Databricks> workspace with a unique name, using the supplied group details. */
  async createGroup(
    req: CreateGroupRequest,
    options?: CallOptions
  ): Promise<Group> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Groups`;
    const body = marshalRequest(req, marshalCreateGroupRequestSchema);
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

  /** Deletes a group from the <Databricks> workspace. */
  async deleteGroup(
    req: DeleteGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Groups/${req.id ?? ''}`;
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

  /** Gets the information for a specific group in the <Databricks> workspace. */
  async getGroup(req: GetGroupRequest, options?: CallOptions): Promise<Group> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Groups/${req.id ?? ''}`;
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

  /** Gets all details of the groups associated with the <Databricks> workspace. */
  async listGroups(
    req: ListGroupsRequest,
    options?: CallOptions
  ): Promise<ListGroupsResponse> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Groups`;
    const params = new URLSearchParams();
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.attributes !== undefined) {
      params.append('attributes', req.attributes);
    }
    if (req.excludedAttributes !== undefined) {
      params.append('excludedAttributes', req.excludedAttributes);
    }
    if (req.startIndex !== undefined) {
      params.append('startIndex', String(req.startIndex));
    }
    if (req.count !== undefined) {
      params.append('count', String(req.count));
    }
    if (req.sortBy !== undefined) {
      params.append('sortBy', req.sortBy);
    }
    if (req.sortOrder !== undefined) {
      params.append('sortOrder', req.sortOrder);
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

  async *listGroupsIter(
    req: ListGroupsRequest,
    options?: CallOptions
  ): AsyncGenerator<Group> {
    const pageReq: ListGroupsRequest = {...req};
    for (;;) {
      const resp = await this.listGroups(pageReq, options);
      const items = resp.resources ?? [];
      for (const item of items) {
        yield item;
      }
      if (items.length === 0) {
        return;
      }
      pageReq.startIndex = (resp.startIndex ?? 0) + items.length;
    }
  }

  /** Partially updates the details of a group. */
  async patchGroup(
    req: PatchGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Groups/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalPatchGroupRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Updates the details of a group by replacing the entire group entity. */
  async updateGroup(
    req: UpdateGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Groups/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateGroupRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Creates a new service principal in the <Databricks> workspace. */
  async createServicePrincipal(
    req: CreateServicePrincipalRequest,
    options?: CallOptions
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/preview/scim/v2/ServicePrincipals`;
    const body = marshalRequest(
      req,
      marshalCreateServicePrincipalRequestSchema
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

  /** Delete a single service principal in the <Databricks> workspace. */
  async deleteServicePrincipal(
    req: DeleteServicePrincipalRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/preview/scim/v2/ServicePrincipals/${req.id ?? ''}`;
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

  /** Gets the details for a single service principal define in the <Databricks> workspace. */
  async getServicePrincipal(
    req: GetServicePrincipalRequest,
    options?: CallOptions
  ): Promise<ServicePrincipal> {
    const url = `${this.host}/api/2.0/preview/scim/v2/ServicePrincipals/${req.id ?? ''}`;
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

  /** Gets the set of service principals associated with a <Databricks> workspace. */
  async listServicePrincipals(
    req: ListServicePrincipalsRequest,
    options?: CallOptions
  ): Promise<ListServicePrincipalResponse> {
    const url = `${this.host}/api/2.0/preview/scim/v2/ServicePrincipals`;
    const params = new URLSearchParams();
    if (req.attributes !== undefined) {
      params.append('attributes', req.attributes);
    }
    if (req.count !== undefined) {
      params.append('count', String(req.count));
    }
    if (req.excludedAttributes !== undefined) {
      params.append('excludedAttributes', req.excludedAttributes);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.sortBy !== undefined) {
      params.append('sortBy', req.sortBy);
    }
    if (req.sortOrder !== undefined) {
      params.append('sortOrder', req.sortOrder);
    }
    if (req.startIndex !== undefined) {
      params.append('startIndex', String(req.startIndex));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListServicePrincipalResponse | undefined;
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
        unmarshalListServicePrincipalResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listServicePrincipalsIter(
    req: ListServicePrincipalsRequest,
    options?: CallOptions
  ): AsyncGenerator<ServicePrincipal> {
    const pageReq: ListServicePrincipalsRequest = {...req};
    for (;;) {
      const resp = await this.listServicePrincipals(pageReq, options);
      const items = resp.resources ?? [];
      for (const item of items) {
        yield item;
      }
      if (items.length === 0) {
        return;
      }
      pageReq.startIndex = (resp.startIndex ?? 0) + items.length;
    }
  }

  /** Partially updates the details of a single service principal in the <Databricks> workspace. */
  async patchServicePrincipal(
    req: PatchServicePrincipalRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/preview/scim/v2/ServicePrincipals/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalPatchServicePrincipalRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Updates the details of a single service principal.
   *
   * This action replaces the existing service principal with the same name.
   */
  async updateServicePrincipal(
    req: UpdateServicePrincipalRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/preview/scim/v2/ServicePrincipals/${req.id ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateServicePrincipalRequestSchema
    );
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Creates a new user in the <Databricks> workspace. This new user will also be added to the <Databricks> account. */
  async createUser(
    req: CreateUserRequest,
    options?: CallOptions
  ): Promise<User> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Users`;
    const body = marshalRequest(req, marshalCreateUserRequestSchema);
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

  /** Deletes a user. Deleting a user from a <Databricks> workspace also removes objects associated with the user. */
  async deleteUser(
    req: DeleteUserRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Users/${req.id ?? ''}`;
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

  /** Gets the permission levels that a user can have on an object. */
  async getPermissionLevels(
    _req: GetPasswordPermissionLevelsRequest,
    options?: CallOptions
  ): Promise<GetPasswordPermissionLevelsResponse> {
    const url = `${this.host}/api/2.0/permissions/authorization/passwords/permissionLevels`;
    let resp: GetPasswordPermissionLevelsResponse | undefined;
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
        unmarshalGetPasswordPermissionLevelsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the permissions of all passwords. Passwords can inherit permissions from their root object. */
  async getPermissions(
    _req: GetPasswordPermissionsRequest,
    options?: CallOptions
  ): Promise<PasswordPermissions> {
    const url = `${this.host}/api/2.0/permissions/authorization/passwords`;
    let resp: PasswordPermissions | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPasswordPermissionsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets information for a specific user in <Databricks> workspace. */
  async getUser(req: GetUserRequest, options?: CallOptions): Promise<User> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Users/${req.id ?? ''}`;
    const params = new URLSearchParams();
    if (req.attributes !== undefined) {
      params.append('attributes', req.attributes);
    }
    if (req.count !== undefined) {
      params.append('count', String(req.count));
    }
    if (req.excludedAttributes !== undefined) {
      params.append('excludedAttributes', req.excludedAttributes);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.sortBy !== undefined) {
      params.append('sortBy', req.sortBy);
    }
    if (req.sortOrder !== undefined) {
      params.append('sortOrder', req.sortOrder);
    }
    if (req.startIndex !== undefined) {
      params.append('startIndex', String(req.startIndex));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: User | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
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

  /** Gets details for all the users associated with a <Databricks> workspace. */
  async listUsers(
    req: ListUsersRequest,
    options?: CallOptions
  ): Promise<ListUsersResponse> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Users`;
    const params = new URLSearchParams();
    if (req.attributes !== undefined) {
      params.append('attributes', req.attributes);
    }
    if (req.count !== undefined) {
      params.append('count', String(req.count));
    }
    if (req.excludedAttributes !== undefined) {
      params.append('excludedAttributes', req.excludedAttributes);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.sortBy !== undefined) {
      params.append('sortBy', req.sortBy);
    }
    if (req.sortOrder !== undefined) {
      params.append('sortOrder', req.sortOrder);
    }
    if (req.startIndex !== undefined) {
      params.append('startIndex', String(req.startIndex));
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

  async *listUsersIter(
    req: ListUsersRequest,
    options?: CallOptions
  ): AsyncGenerator<User> {
    const pageReq: ListUsersRequest = {...req};
    for (;;) {
      const resp = await this.listUsers(pageReq, options);
      const items = resp.resources ?? [];
      for (const item of items) {
        yield item;
      }
      if (items.length === 0) {
        return;
      }
      pageReq.startIndex = (resp.startIndex ?? 0) + items.length;
    }
  }

  /** Partially updates a user resource by applying the supplied operations on specific user attributes. */
  async patchUser(req: PatchUserRequest, options?: CallOptions): Promise<void> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Users/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalPatchUserRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Sets permissions on an object, replacing existing permissions if they exist. Deletes all direct permissions if none are specified. Objects can inherit permissions from their root object. */
  async setPermissions(
    req: PasswordPermissionsRequest,
    options?: CallOptions
  ): Promise<PasswordPermissions> {
    const url = `${this.host}/api/2.0/permissions/authorization/passwords`;
    const body = marshalRequest(req, marshalPasswordPermissionsRequestSchema);
    let resp: PasswordPermissions | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPasswordPermissionsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the permissions on all passwords. Passwords can inherit permissions from their root object. */
  async updatePermissions(
    req: PasswordPermissionsRequest,
    options?: CallOptions
  ): Promise<PasswordPermissions> {
    const url = `${this.host}/api/2.0/permissions/authorization/passwords`;
    const body = marshalRequest(req, marshalPasswordPermissionsRequestSchema);
    let resp: PasswordPermissions | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPasswordPermissionsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Replaces a user's information with the data supplied in request. */
  async updateUser(
    req: UpdateUserRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/preview/scim/v2/Users/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateUserRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }
}
