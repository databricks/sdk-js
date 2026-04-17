// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
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

  /** Deletes the workspace permissions assignment in a given account and workspace for the specified principal. */
  async deleteWorkspacePermissionAssignment(signal: AbortSignal | undefined, req: DeleteWorkspacePermissionAssignment, options?: Options): Promise<DeleteWorkspacePermissionAssignment_Response> {
    const url = `${this.host}/api/2.0/accounts//workspaces/${String(req.workspaceId ?? '')}/permissionassignments/principals/${String(req.principalId ?? '')}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteWorkspacePermissionAssignment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDeleteWorkspacePermissionAssignment_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the permission assignments for the specified <Account> and <Workspace>. */
  async getWorkspacePermissionAssignments(signal: AbortSignal | undefined, req: GetWorkspacePermissionAssignments, options?: Options): Promise<GetWorkspacePermissionAssignments_Response> {
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGetWorkspacePermissionAssignments_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get an array of workspace permissions for the specified account and workspace. */
  async listWorkspacePermissions(signal: AbortSignal | undefined, req: ListWorkspacePermissions, options?: Options): Promise<ListWorkspacePermissions_Response> {
    const url = `${this.host}/api/2.0/accounts//workspaces/${String(req.workspaceId ?? '')}/permissionassignments/permissions`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListWorkspacePermissions_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListWorkspacePermissions_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates or updates the workspace permissions assignment in a given account and workspace for the specified principal. */
  async updateWorkspacePermissionAssignment(signal: AbortSignal | undefined, req: UpdateWorkspacePermissionAssignment, options?: Options): Promise<WorkspacePermissionAssignmentOutput> {
    const url = `${this.host}/api/2.0/accounts//workspaces/${String(req.workspaceId ?? '')}/permissionassignments/principals/${String(req.principalId ?? '')}`;
    const body = marshalRequest(req, marshalUpdateWorkspacePermissionAssignmentSchema);
    let resp: WorkspacePermissionAssignmentOutput | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalWorkspacePermissionAssignmentOutputSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
