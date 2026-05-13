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
  GetWorkspaceAccessDetailLocalRequest,
  GetWorkspaceAccessDetailRequest,
  ResolveGroupProxyRequest,
  ResolveGroupRequest,
  ResolveGroupResponse,
  ResolveServicePrincipalProxyRequest,
  ResolveServicePrincipalRequest,
  ResolveServicePrincipalResponse,
  ResolveUserProxyRequest,
  ResolveUserRequest,
  ResolveUserResponse,
  WorkspaceAccessDetail,
} from './model';
import {
  marshalResolveGroupProxyRequestSchema,
  marshalResolveGroupRequestSchema,
  marshalResolveServicePrincipalProxyRequestSchema,
  marshalResolveServicePrincipalRequestSchema,
  marshalResolveUserProxyRequestSchema,
  marshalResolveUserRequestSchema,
  unmarshalResolveGroupResponseSchema,
  unmarshalResolveServicePrincipalResponseSchema,
  unmarshalResolveUserResponseSchema,
  unmarshalWorkspaceAccessDetailSchema,
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
}
