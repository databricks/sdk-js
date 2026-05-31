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
  flattenQueryParams,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CheckPolicyRequest,
  CheckPolicyResponse,
  DeleteWorkspacePermissionAssignmentRequest,
  DeleteWorkspacePermissionAssignmentRequest_Response,
  GetObjectPermissionsRequest,
  GetRuleSetRequest,
  ListAssignableRolesForResourceRequest,
  ListAssignableRolesForResourceResponse,
  ListPermissionLevelsRequest,
  ListPermissionLevelsRequest_Response,
  ListWorkspacePermissionAssignmentsRequest,
  ListWorkspacePermissionAssignmentsRequest_Response,
  ListWorkspacePermissionsRequest,
  ListWorkspacePermissionsRequest_Response,
  PermissionsResponse,
  RuleSet,
  SetObjectPermissionsRequest,
  UpdateObjectPermissionsRequest,
  UpdateRuleSetRequest,
  UpdateWorkspacePermissionAssignmentRequest,
  WorkspacePermissionAssignmentOutput,
} from './model';
import {
  marshalActorSchema,
  marshalConsistencyTokenSchema,
  marshalResourceInfoSchema,
  marshalSetObjectPermissionsRequestSchema,
  marshalUpdateObjectPermissionsRequestSchema,
  marshalUpdateRuleSetRequestSchema,
  marshalUpdateWorkspacePermissionAssignmentRequestSchema,
  unmarshalCheckPolicyResponseSchema,
  unmarshalDeleteWorkspacePermissionAssignmentRequest_ResponseSchema,
  unmarshalListAssignableRolesForResourceResponseSchema,
  unmarshalListPermissionLevelsRequest_ResponseSchema,
  unmarshalListWorkspacePermissionAssignmentsRequest_ResponseSchema,
  unmarshalListWorkspacePermissionsRequest_ResponseSchema,
  unmarshalPermissionsResponseSchema,
  unmarshalRuleSetSchema,
  unmarshalWorkspacePermissionAssignmentOutputSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class AccessManagementClient {
  private readonly host: string;
  // Fallback for endpoints whose path contains {account_id}. If the request
  // already carries an accountId, that value wins.
  private readonly accountId: string | undefined;
  // Workspace ID used to route workspace-level calls on unified hosts (SPOG).
  // When set, workspace-level methods send X-Databricks-Org-Id on every
  // request.
  private readonly workspaceId: string | undefined;
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
    this.workspaceId = options.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Deletes the workspace permissions assignment in a given account and workspace for the specified principal. */
  async deleteWorkspacePermissionAssignment(
    req: DeleteWorkspacePermissionAssignmentRequest,
    options?: CallOptions
  ): Promise<DeleteWorkspacePermissionAssignmentRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/permissionassignments/principals/${String(req.principalId ?? '')}`;
    let resp: DeleteWorkspacePermissionAssignmentRequest_Response | undefined;
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
        unmarshalDeleteWorkspacePermissionAssignmentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the permission assignments for the specified <Account> and <Workspace>. */
  async listWorkspacePermissionAssignments(
    req: ListWorkspacePermissionAssignmentsRequest,
    options?: CallOptions
  ): Promise<ListWorkspacePermissionAssignmentsRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/permissionassignments`;
    let resp: ListWorkspacePermissionAssignmentsRequest_Response | undefined;
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
        unmarshalListWorkspacePermissionAssignmentsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get an array of workspace permissions for the specified account and workspace. */
  async listWorkspacePermissions(
    req: ListWorkspacePermissionsRequest,
    options?: CallOptions
  ): Promise<ListWorkspacePermissionsRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/permissionassignments/permissions`;
    let resp: ListWorkspacePermissionsRequest_Response | undefined;
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
        unmarshalListWorkspacePermissionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates or updates the workspace permissions assignment in a given account and workspace for the specified principal. */
  async updateWorkspacePermissionAssignment(
    req: UpdateWorkspacePermissionAssignmentRequest,
    options?: CallOptions
  ): Promise<WorkspacePermissionAssignmentOutput> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/permissionassignments/principals/${String(req.principalId ?? '')}`;
    const body = marshalRequest(
      req,
      marshalUpdateWorkspacePermissionAssignmentRequestSchema
    );
    let resp: WorkspacePermissionAssignmentOutput | undefined;
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
        unmarshalWorkspacePermissionAssignmentOutputSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Get a rule set by its name. A rule set is always attached to a resource and contains a list of access rules on the
   * said resource. Currently only a default rule set for each resource is supported.
   */
  async getRuleSet(
    req: GetRuleSetRequest,
    options?: CallOptions
  ): Promise<RuleSet> {
    const url = `${this.host}/api/2.0/preview/accounts/${req.accountId ?? this.accountId ?? ''}/access-control/rule-sets`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: RuleSet | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleSetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Get a rule set by its name. A rule set is always attached to a resource and contains a list of access rules on the
   * said resource. Currently only a default rule set for each resource is supported.
   */
  async getRuleSetProxy(
    req: GetRuleSetRequest,
    options?: CallOptions
  ): Promise<RuleSet> {
    const url = `${this.host}/api/2.0/preview/accounts/${req.accountId ?? this.accountId ?? ''}/access-control/rule-sets`;
    const params = new URLSearchParams();
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: RuleSet | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleSetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets all the roles that can be granted on an account level resource. A role is grantable if the rule set on the
   * resource can contain an access rule of the role.
   */
  async listAssignableRolesForResource(
    req: ListAssignableRolesForResourceRequest,
    options?: CallOptions
  ): Promise<ListAssignableRolesForResourceResponse> {
    const url = `${this.host}/api/2.0/preview/accounts/${req.accountId ?? this.accountId ?? ''}/access-control/assignable-roles`;
    const params = new URLSearchParams();
    if (req.resource !== undefined) {
      params.append('resource', req.resource);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAssignableRolesForResourceResponse | undefined;
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
        unmarshalListAssignableRolesForResourceResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets all the roles that can be granted on an account level resource. A role is grantable if the rule set on the
   * resource can contain an access rule of the role.
   */
  async listAssignableRolesForResourceProxy(
    req: ListAssignableRolesForResourceRequest,
    options?: CallOptions
  ): Promise<ListAssignableRolesForResourceResponse> {
    const url = `${this.host}/api/2.0/preview/accounts/${req.accountId ?? this.accountId ?? ''}/access-control/assignable-roles`;
    const params = new URLSearchParams();
    if (req.resource !== undefined) {
      params.append('resource', req.resource);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAssignableRolesForResourceResponse | undefined;
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
        unmarshalListAssignableRolesForResourceResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Replace the rules of a rule set. First, use get to read the current version of the rule set before modifying it.
   * This pattern helps prevent conflicts between concurrent updates.
   */
  async updateRuleSet(
    req: UpdateRuleSetRequest,
    options?: CallOptions
  ): Promise<RuleSet> {
    const url = `${this.host}/api/2.0/preview/accounts/${req.accountId ?? this.accountId ?? ''}/access-control/rule-sets`;
    const body = marshalRequest(req, marshalUpdateRuleSetRequestSchema);
    let resp: RuleSet | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleSetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Replace the rules of a rule set. First, use get to read the current version of the rule set before modifying it.
   * This pattern helps prevent conflicts between concurrent updates.
   */
  async updateRuleSetProxy(
    req: UpdateRuleSetRequest,
    options?: CallOptions
  ): Promise<RuleSet> {
    const url = `${this.host}/api/2.0/preview/accounts/${req.accountId ?? this.accountId ?? ''}/access-control/rule-sets`;
    const body = marshalRequest(req, marshalUpdateRuleSetRequestSchema);
    let resp: RuleSet | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleSetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the permissions of an object. Objects can inherit permissions from their parent objects or root object. */
  async getObjectPermissions(
    req: GetObjectPermissionsRequest,
    options?: CallOptions
  ): Promise<PermissionsResponse> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}`;
    let resp: PermissionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the permission levels that a user can have on an object. */
  async listPermissionLevels(
    req: ListPermissionLevelsRequest,
    options?: CallOptions
  ): Promise<ListPermissionLevelsRequest_Response> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}/permissionLevels`;
    let resp: ListPermissionLevelsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListPermissionLevelsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Sets permissions on an object, replacing existing permissions if they exist. Deletes all direct permissions if none are specified. Objects can inherit permissions from their parent objects or root object. */
  async setObjectPermissions(
    req: SetObjectPermissionsRequest,
    options?: CallOptions
  ): Promise<PermissionsResponse> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}`;
    const body = marshalRequest(req, marshalSetObjectPermissionsRequestSchema);
    let resp: PermissionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the permissions on an object. Objects can inherit permissions from their parent objects or root object. */
  async updateObjectPermissions(
    req: UpdateObjectPermissionsRequest,
    options?: CallOptions
  ): Promise<PermissionsResponse> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateObjectPermissionsRequestSchema
    );
    let resp: PermissionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Check access policy to a resource. */
  async checkPolicy(
    req: CheckPolicyRequest,
    options?: CallOptions
  ): Promise<CheckPolicyResponse> {
    const url = `${this.host}/api/2.0/access-control/check-policy-v2`;
    const params = new URLSearchParams();
    if (req.actor !== undefined) {
      flattenQueryParams('actor', marshalActorSchema.parse(req.actor), params);
    }
    if (req.permission !== undefined) {
      params.append('permission', req.permission);
    }
    if (req.resource !== undefined) {
      params.append('resource', req.resource);
    }
    if (req.consistencyToken !== undefined) {
      flattenQueryParams(
        'consistency_token',
        marshalConsistencyTokenSchema.parse(req.consistencyToken),
        params
      );
    }
    if (req.authzIdentity !== undefined) {
      params.append('authz_identity', req.authzIdentity);
    }
    if (req.resourceInfo !== undefined) {
      flattenQueryParams(
        'resource_info',
        marshalResourceInfoSchema.parse(req.resourceInfo),
        params
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: CheckPolicyResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCheckPolicyResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
