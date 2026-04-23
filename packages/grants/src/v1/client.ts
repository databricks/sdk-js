// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import type {
  EffectivePrivilegeAssignment,
  GetEffectivePermissions,
  GetEffectivePermissions_Response,
  GetPermissions,
  GetPermissions_Response,
  ListEffectivePrivilegeAssignmentsRequest,
  ListEffectivePrivilegeAssignmentsResponse,
  ListPrivilegeAssignmentsRequest,
  ListPrivilegeAssignmentsResponse,
  PrivilegeAssignment,
  UpdatePermissions,
  UpdatePermissions_Response,
} from './model';
import {
  marshalUpdatePermissionsSchema,
  unmarshalGetEffectivePermissions_ResponseSchema,
  unmarshalGetPermissions_ResponseSchema,
  unmarshalListEffectivePrivilegeAssignmentsResponseSchema,
  unmarshalListPrivilegeAssignmentsResponseSchema,
  unmarshalUpdatePermissions_ResponseSchema,
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
   * Gets the effective permissions for a securable. Includes inherited permissions from any parent securables.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async getEffectivePermissions(
    signal: AbortSignal | undefined,
    req: GetEffectivePermissions,
    options?: Options
  ): Promise<GetEffectivePermissions_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/effective-permissions/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.principal !== undefined) {
      params.append('principal', req.principal);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetEffectivePermissions_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetEffectivePermissions_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the permissions for a securable. Does not include inherited permissions.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async getPermissions(
    signal: AbortSignal | undefined,
    req: GetPermissions,
    options?: Options
  ): Promise<GetPermissions_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/permissions/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.principal !== undefined) {
      params.append('principal', req.principal);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeDeletedPrincipals !== undefined) {
      params.append(
        'include_deleted_principals',
        String(req.includeDeletedPrincipals)
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPermissions_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetPermissions_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the effective privilege assignments for a securable. Includes inherited privileges.
   * Paginated version of Get Effective Permissions API.
   */
  async listEffectivePrivilegeAssignments(
    signal: AbortSignal | undefined,
    req: ListEffectivePrivilegeAssignmentsRequest,
    options?: Options
  ): Promise<ListEffectivePrivilegeAssignmentsResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/effective-privilege-assignments/${req.securableType ?? ''}/${req.fullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.principal !== undefined) {
      params.append('principal', req.principal);
    }
    if (req.includeDeletedPrincipals !== undefined) {
      params.append(
        'include_deleted_principals',
        String(req.includeDeletedPrincipals)
      );
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListEffectivePrivilegeAssignmentsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListEffectivePrivilegeAssignmentsResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listEffectivePrivilegeAssignmentsIter(
    signal: AbortSignal | undefined,
    req: ListEffectivePrivilegeAssignmentsRequest,
    options?: Options
  ): AsyncGenerator<EffectivePrivilegeAssignment> {
    const pageReq: ListEffectivePrivilegeAssignmentsRequest = {...req};
    for (;;) {
      const resp = await this.listEffectivePrivilegeAssignments(
        signal,
        pageReq,
        options
      );
      for (const item of resp.effectivePrivilegeAssignments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Lists the privilege assignments for a securable. Does not include inherited privileges.
   * Paginated version of Get Permissions API.
   */
  async listPrivilegeAssignments(
    signal: AbortSignal | undefined,
    req: ListPrivilegeAssignmentsRequest,
    options?: Options
  ): Promise<ListPrivilegeAssignmentsResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/privilege-assignments/${req.securableType ?? ''}/${req.fullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.principal !== undefined) {
      params.append('principal', req.principal);
    }
    if (req.includeDeletedPrincipals !== undefined) {
      params.append(
        'include_deleted_principals',
        String(req.includeDeletedPrincipals)
      );
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPrivilegeAssignmentsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListPrivilegeAssignmentsResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listPrivilegeAssignmentsIter(
    signal: AbortSignal | undefined,
    req: ListPrivilegeAssignmentsRequest,
    options?: Options
  ): AsyncGenerator<PrivilegeAssignment> {
    const pageReq: ListPrivilegeAssignmentsRequest = {...req};
    for (;;) {
      const resp = await this.listPrivilegeAssignments(
        signal,
        pageReq,
        options
      );
      for (const item of resp.privilegeAssignments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates the permissions for a securable. */
  async updatePermissions(
    signal: AbortSignal | undefined,
    req: UpdatePermissions,
    options?: Options
  ): Promise<UpdatePermissions_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/permissions/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const body = marshalRequest(req, marshalUpdatePermissionsSchema);
    let resp: UpdatePermissions_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdatePermissions_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
