// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  encodePathVariable,
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
  CreateRestrictedSharingGroupRequest,
  DeleteRestrictedSharingGroupRequest,
  DeleteWorkspacePermissionAssignmentRequest,
  DeleteWorkspacePermissionAssignmentResponse,
  GetObjectPermissionsRequest,
  GetRestrictedSharingGroupRequest,
  GetRuleSetRequest,
  ListAssignableRolesForResourceRequest,
  ListAssignableRolesForResourceResponse,
  ListPermissionLevelsRequest,
  ListPermissionLevelsResponse,
  ListRestrictedSharingGroupsRequest,
  ListRestrictedSharingGroupsResponse,
  ListWorkspacePermissionAssignmentsRequest,
  ListWorkspacePermissionAssignmentsResponse,
  ListWorkspacePermissionsRequest,
  ListWorkspacePermissionsResponse,
  MigratePermissionsRequest,
  MigratePermissionsResponse,
  PermissionsResponse,
  RestrictedSharingGroup,
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
  marshalMigratePermissionsRequestSchema,
  marshalResourceInfoSchema,
  marshalRestrictedSharingGroupSchema,
  marshalSetObjectPermissionsRequestSchema,
  marshalUpdateObjectPermissionsRequestSchema,
  marshalUpdateRuleSetRequestSchema,
  marshalUpdateWorkspacePermissionAssignmentRequestSchema,
  unmarshalCheckPolicyResponseSchema,
  unmarshalDeleteWorkspacePermissionAssignmentResponseSchema,
  unmarshalListAssignableRolesForResourceResponseSchema,
  unmarshalListPermissionLevelsResponseSchema,
  unmarshalListRestrictedSharingGroupsResponseSchema,
  unmarshalListWorkspacePermissionAssignmentsResponseSchema,
  unmarshalListWorkspacePermissionsResponseSchema,
  unmarshalMigratePermissionsResponseSchema,
  unmarshalPermissionsResponseSchema,
  unmarshalRestrictedSharingGroupSchema,
  unmarshalRuleSetSchema,
  unmarshalWorkspacePermissionAssignmentOutputSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class AccessManagementClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
    return this.config;
  }

  /** Deletes the workspace permissions assignment in a given account and workspace for the specified principal. */
  async deleteWorkspacePermissionAssignment(
    req: DeleteWorkspacePermissionAssignmentRequest,
    options?: CallOptions
  ): Promise<DeleteWorkspacePermissionAssignmentResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${encodePathVariable(req.accountId ?? accountId ?? '')}/workspaces/${String(req.workspaceId ?? '')}/permissionassignments/principals/${String(req.principalId ?? '')}`;
    let resp: DeleteWorkspacePermissionAssignmentResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteWorkspacePermissionAssignmentResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get the permission assignments for the specified <Account> and <Workspace>. */
  async listWorkspacePermissionAssignments(
    req: ListWorkspacePermissionAssignmentsRequest,
    options?: CallOptions
  ): Promise<ListWorkspacePermissionAssignmentsResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${encodePathVariable(req.accountId ?? accountId ?? '')}/workspaces/${String(req.workspaceId ?? '')}/permissionassignments`;
    let resp: ListWorkspacePermissionAssignmentsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListWorkspacePermissionAssignmentsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get an array of workspace permissions for the specified account and workspace. */
  async listWorkspacePermissions(
    req: ListWorkspacePermissionsRequest,
    options?: CallOptions
  ): Promise<ListWorkspacePermissionsResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${encodePathVariable(req.accountId ?? accountId ?? '')}/workspaces/${String(req.workspaceId ?? '')}/permissionassignments/permissions`;
    let resp: ListWorkspacePermissionsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListWorkspacePermissionsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates or updates the workspace permissions assignment in a given account and workspace for the specified principal. */
  async updateWorkspacePermissionAssignment(
    req: UpdateWorkspacePermissionAssignmentRequest,
    options?: CallOptions
  ): Promise<WorkspacePermissionAssignmentOutput> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${encodePathVariable(req.accountId ?? accountId ?? '')}/workspaces/${String(req.workspaceId ?? '')}/permissionassignments/principals/${String(req.principalId ?? '')}`;
    const body = marshalRequest(
      req,
      marshalUpdateWorkspacePermissionAssignmentRequestSchema
    );
    let resp: WorkspacePermissionAssignmentOutput | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalWorkspacePermissionAssignmentOutputSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/preview/accounts/${encodePathVariable(req.accountId ?? accountId ?? '')}/access-control/rule-sets`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleSetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/preview/accounts/access-control/rule-sets`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: RuleSet | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleSetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/preview/accounts/${encodePathVariable(req.accountId ?? accountId ?? '')}/access-control/assignable-roles`;
    const params = new URLSearchParams();
    if (req.resource !== undefined) {
      params.append('resource', req.resource);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAssignableRolesForResourceResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListAssignableRolesForResourceResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/preview/accounts/access-control/assignable-roles`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.resource !== undefined) {
      params.append('resource', req.resource);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAssignableRolesForResourceResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListAssignableRolesForResourceResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/preview/accounts/${encodePathVariable(req.accountId ?? accountId ?? '')}/access-control/rule-sets`;
    const body = marshalRequest(req, marshalUpdateRuleSetRequestSchema);
    let resp: RuleSet | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleSetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/preview/accounts/access-control/rule-sets`;
    const body = marshalRequest(req, marshalUpdateRuleSetRequestSchema);
    let resp: RuleSet | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleSetSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Adds a group to the workspace's restricted list. The workspace allows at
   * most 100 restricted sharing groups. Requires workspace admin.
   */
  async createRestrictedSharingGroup(
    req: CreateRestrictedSharingGroupRequest,
    options?: CallOptions
  ): Promise<RestrictedSharingGroup> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/access-control/restricted-sharing-groups`;
    const params = new URLSearchParams();
    if (req.restrictedSharingGroupId !== undefined) {
      params.append(
        'restricted_sharing_group_id',
        req.restrictedSharingGroupId
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.restrictedSharingGroup === undefined
        ? 'null'
        : marshalRequest(
            req.restrictedSharingGroup,
            marshalRestrictedSharingGroupSchema
          );
    let resp: RestrictedSharingGroup | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      resp = parseResponse(respBody, unmarshalRestrictedSharingGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Removes a group from the workspace's restricted list. Requires workspace
   * admin.
   */
  async deleteRestrictedSharingGroup(
    req: DeleteRestrictedSharingGroupRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/access-control/${encodePathVariable(req.name)}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Gets a restricted sharing group in the workspace. Use it to check whether
   * a group is on the workspace's restricted list. Requires workspace admin.
   */
  async getRestrictedSharingGroup(
    req: GetRestrictedSharingGroupRequest,
    options?: CallOptions
  ): Promise<RestrictedSharingGroup> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/access-control/${encodePathVariable(req.name)}`;
    let resp: RestrictedSharingGroup | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRestrictedSharingGroupSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the restricted sharing groups in the workspace. Requires workspace
   * admin.
   */
  async listRestrictedSharingGroups(
    req: ListRestrictedSharingGroupsRequest,
    options?: CallOptions
  ): Promise<ListRestrictedSharingGroupsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/access-control/restricted-sharing-groups`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListRestrictedSharingGroupsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListRestrictedSharingGroupsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listRestrictedSharingGroupsIter(
    req: ListRestrictedSharingGroupsRequest,
    options?: CallOptions
  ): AsyncGenerator<RestrictedSharingGroup> {
    const pageReq: ListRestrictedSharingGroupsRequest = {...req};
    for (;;) {
      const resp = await this.listRestrictedSharingGroups(pageReq, options);
      for (const item of resp.restrictedSharingGroups ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Migrate Permissions. */
  async migratePermissions(
    req: MigratePermissionsRequest,
    options?: CallOptions
  ): Promise<MigratePermissionsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/permissionmigration`;
    const body = marshalRequest(req, marshalMigratePermissionsRequestSchema);
    let resp: MigratePermissionsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMigratePermissionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets the permissions of an object. Objects can inherit permissions from their parent objects or root object. */
  async getObjectPermissions(
    req: GetObjectPermissionsRequest,
    options?: CallOptions
  ): Promise<PermissionsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/permissions/${encodePathVariable(req.requestObjectType ?? '')}/${encodePathVariable(req.requestObjectId ?? '')}`;
    let resp: PermissionsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets the permission levels that a user can have on an object. */
  async listPermissionLevels(
    req: ListPermissionLevelsRequest,
    options?: CallOptions
  ): Promise<ListPermissionLevelsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/permissions/${encodePathVariable(req.requestObjectType ?? '')}/${encodePathVariable(req.requestObjectId ?? '')}/permissionLevels`;
    let resp: ListPermissionLevelsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListPermissionLevelsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Sets permissions on an object, replacing all direct permissions with the ones in the request. Principals that are not in the request lose their direct permissions on the object, and all direct permissions are deleted if none are specified. Objects can inherit permissions from their parent objects or root object. */
  async setObjectPermissions(
    req: SetObjectPermissionsRequest,
    options?: CallOptions
  ): Promise<PermissionsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/permissions/${encodePathVariable(req.requestObjectType ?? '')}/${encodePathVariable(req.requestObjectId ?? '')}`;
    const body = marshalRequest(req, marshalSetObjectPermissionsRequestSchema);
    let resp: PermissionsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the permissions on an object by adding or changing the permissions of the principals in the request. Principals that are not in the request keep their existing permissions. Objects can inherit permissions from their parent objects or root object. */
  async updateObjectPermissions(
    req: UpdateObjectPermissionsRequest,
    options?: CallOptions
  ): Promise<PermissionsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/permissions/${encodePathVariable(req.requestObjectType ?? '')}/${encodePathVariable(req.requestObjectId ?? '')}`;
    const body = marshalRequest(
      req,
      marshalUpdateObjectPermissionsRequestSchema
    );
    let resp: PermissionsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Check access policy to a resource. */
  async checkPolicy(
    req: CheckPolicyRequest,
    options?: CallOptions
  ): Promise<CheckPolicyResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/access-control/check-policy-v2`;
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
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCheckPolicyResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
