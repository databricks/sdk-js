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
  DeleteWorkspacePermissionAssignment,
  DeleteWorkspacePermissionAssignment_Response,
  GetWorkspacePermissionAssignments,
  GetWorkspacePermissionAssignments_Response,
  ListWorkspacePermissions,
  ListWorkspacePermissions_Response,
  UpdateWorkspacePermissionAssignment,
  WorkspacePermissionAssignmentOutput,
} from './model';
import {
  marshalUpdateWorkspacePermissionAssignmentSchema,
  unmarshalDeleteWorkspacePermissionAssignment_ResponseSchema,
  unmarshalGetWorkspacePermissionAssignments_ResponseSchema,
  unmarshalListWorkspacePermissions_ResponseSchema,
  unmarshalWorkspacePermissionAssignmentOutputSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
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

  /** Deletes the workspace permissions assignment in a given account and workspace for the specified principal. */
  async deleteWorkspacePermissionAssignment(
    req: DeleteWorkspacePermissionAssignment,
    options?: CallOptions
  ): Promise<DeleteWorkspacePermissionAssignment_Response> {
    const url = `${this.host}/api/2.0/accounts//workspaces/${String(req.workspaceId ?? '')}/permissionassignments/principals/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteWorkspacePermissionAssignment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteWorkspacePermissionAssignment_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the permission assignments for the specified <Account> and <Workspace>. */
  async getWorkspacePermissionAssignments(
    req: GetWorkspacePermissionAssignments,
    options?: CallOptions
  ): Promise<GetWorkspacePermissionAssignments_Response> {
    const url = `${this.host}/api/2.0/accounts//workspaces/${String(req.workspaceId ?? '')}/permissionassignments`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetWorkspacePermissionAssignments_Response | undefined;
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
        unmarshalGetWorkspacePermissionAssignments_ResponseSchema
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
    req: ListWorkspacePermissions,
    options?: CallOptions
  ): Promise<ListWorkspacePermissions_Response> {
    const url = `${this.host}/api/2.0/accounts//workspaces/${String(req.workspaceId ?? '')}/permissionassignments/permissions`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListWorkspacePermissions_Response | undefined;
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
        unmarshalListWorkspacePermissions_ResponseSchema
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
    req: UpdateWorkspacePermissionAssignment,
    options?: CallOptions
  ): Promise<WorkspacePermissionAssignmentOutput> {
    const url = `${this.host}/api/2.0/accounts//workspaces/${String(req.workspaceId ?? '')}/permissionassignments/principals/${String(req.principalId ?? '')}`;
    const body = marshalRequest(
      req,
      marshalUpdateWorkspacePermissionAssignmentSchema
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
}
