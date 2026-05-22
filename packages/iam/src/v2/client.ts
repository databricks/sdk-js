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
  CreateWorkspaceAssignmentDetailProxyRequest,
  CreateWorkspaceAssignmentDetailRequest,
  DeleteWorkspaceAssignmentDetailProxyRequest,
  DeleteWorkspaceAssignmentDetailRequest,
  GetWorkspaceAccessDetailLocalRequest,
  GetWorkspaceAccessDetailRequest,
  GetWorkspaceAssignmentDetailProxyRequest,
  GetWorkspaceAssignmentDetailRequest,
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
  UpdateWorkspaceAssignmentDetailProxyRequest,
  UpdateWorkspaceAssignmentDetailRequest,
  WorkspaceAccessDetail,
  WorkspaceAssignmentDetail,
} from './model';
import {
  marshalResolveGroupProxyRequestSchema,
  marshalResolveGroupRequestSchema,
  marshalResolveServicePrincipalProxyRequestSchema,
  marshalResolveServicePrincipalRequestSchema,
  marshalResolveUserProxyRequestSchema,
  marshalResolveUserRequestSchema,
  marshalWorkspaceAssignmentDetailSchema,
  unmarshalListWorkspaceAssignmentDetailsResponseSchema,
  unmarshalResolveGroupResponseSchema,
  unmarshalResolveServicePrincipalResponseSchema,
  unmarshalResolveUserResponseSchema,
  unmarshalWorkspaceAccessDetailSchema,
  unmarshalWorkspaceAssignmentDetailSchema,
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
   * Resolves a group with the given external ID from the customer's IdP. If the group does not exist, it will be created in the account.
   * If the customer is not onboarded onto Automatic Identity Management (AIM), this will return an error.
   */
  async resolveGroup(req: ResolveGroupRequest, options?: CallOptions): Promise<ResolveGroupResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/groups/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveGroupRequestSchema);
    let resp: ResolveGroupResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
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
  async resolveGroupProxy(req: ResolveGroupProxyRequest, options?: CallOptions): Promise<ResolveGroupResponse> {
    const url = `${this.host}/api/2.0/identity/groups/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveGroupProxyRequestSchema);
    let resp: ResolveGroupResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalResolveGroupResponseSchema);
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
  async resolveServicePrincipal(req: ResolveServicePrincipalRequest, options?: CallOptions): Promise<ResolveServicePrincipalResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveServicePrincipalRequestSchema);
    let resp: ResolveServicePrincipalResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalResolveServicePrincipalResponseSchema);
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
  async resolveServicePrincipalProxy(req: ResolveServicePrincipalProxyRequest, options?: CallOptions): Promise<ResolveServicePrincipalResponse> {
    const url = `${this.host}/api/2.0/identity/servicePrincipals/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveServicePrincipalProxyRequestSchema);
    let resp: ResolveServicePrincipalResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalResolveServicePrincipalResponseSchema);
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
  async resolveUser(req: ResolveUserRequest, options?: CallOptions): Promise<ResolveUserResponse> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/users/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveUserRequestSchema);
    let resp: ResolveUserResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
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
  async resolveUserProxy(req: ResolveUserProxyRequest, options?: CallOptions): Promise<ResolveUserResponse> {
    const url = `${this.host}/api/2.0/identity/users/resolveByExternalId`;
    const body = marshalRequest(req, marshalResolveUserProxyRequestSchema);
    let resp: ResolveUserResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalResolveUserResponseSchema);
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
  async getWorkspaceAccessDetail(req: GetWorkspaceAccessDetailRequest, options?: CallOptions): Promise<WorkspaceAccessDetail> {
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
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
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
  async getWorkspaceAccessDetailLocal(req: GetWorkspaceAccessDetailLocalRequest, options?: CallOptions): Promise<WorkspaceAccessDetail> {
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
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalWorkspaceAccessDetailSchema);
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
  async createWorkspaceAssignmentDetail(req: CreateWorkspaceAssignmentDetailRequest, options?: CallOptions): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails`;
    const body = marshalRequest(req.workspaceAssignmentDetail, marshalWorkspaceAssignmentDetailSchema);
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
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
  async createWorkspaceAssignmentDetailProxy(req: CreateWorkspaceAssignmentDetailProxyRequest, options?: CallOptions): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails`;
    const body = marshalRequest(req.workspaceAssignmentDetail, marshalWorkspaceAssignmentDetailSchema);
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
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
  async deleteWorkspaceAssignmentDetail(req: DeleteWorkspaceAssignmentDetailRequest, options?: CallOptions): Promise<void> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await executeCall(call, options);
  }

  /**
   * Deletes a workspace assignment detail for a principal (workspace-level proxy), revoking all
   * associated entitlements. Entitlement revocations are applied individually and non-atomically
   * — if a failure occurs partway through, the principal remains assigned with a subset of its
   * original entitlements, and the operation is safe to retry.
   */
  async deleteWorkspaceAssignmentDetailProxy(req: DeleteWorkspaceAssignmentDetailProxyRequest, options?: CallOptions): Promise<void> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await executeCall(call, options);
  }

  /** Returns the assignment details for a principal in a workspace. */
  async getWorkspaceAssignmentDetail(req: GetWorkspaceAssignmentDetailRequest, options?: CallOptions): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the assignment details for a principal in a workspace (workspace-level proxy). */
  async getWorkspaceAssignmentDetailProxy(req: GetWorkspaceAssignmentDetailProxyRequest, options?: CallOptions): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists workspace assignment details for a workspace. */
  async listWorkspaceAssignmentDetails(req: ListWorkspaceAssignmentDetailsRequest, options?: CallOptions): Promise<ListWorkspaceAssignmentDetailsResponse> {
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
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListWorkspaceAssignmentDetailsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists workspace assignment details for a workspace (workspace-level proxy). */
  async listWorkspaceAssignmentDetailsProxy(req: ListWorkspaceAssignmentDetailsProxyRequest, options?: CallOptions): Promise<ListWorkspaceAssignmentDetailsResponse> {
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
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListWorkspaceAssignmentDetailsResponseSchema);
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
  async updateWorkspaceAssignmentDetail(req: UpdateWorkspaceAssignmentDetailRequest, options?: CallOptions): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.workspaceAssignmentDetail, marshalWorkspaceAssignmentDetailSchema);
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
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
  async updateWorkspaceAssignmentDetailProxy(req: UpdateWorkspaceAssignmentDetailProxyRequest, options?: CallOptions): Promise<WorkspaceAssignmentDetail> {
    const url = `${this.host}/api/2.0/identity/workspaceAssignmentDetails/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.workspaceAssignmentDetail, marshalWorkspaceAssignmentDetailSchema);
    let resp: WorkspaceAssignmentDetail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalWorkspaceAssignmentDetailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
