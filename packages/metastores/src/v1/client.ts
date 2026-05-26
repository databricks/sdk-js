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
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  AccountsCreateMetastoreAssignmentRequest,
  AccountsCreateMetastoreAssignmentRequest_Response,
  AccountsCreateMetastoreRequest,
  AccountsCreateMetastoreRequest_Response,
  AccountsDeleteMetastoreAssignmentRequest,
  AccountsDeleteMetastoreAssignmentRequest_Response,
  AccountsDeleteMetastoreRequest,
  AccountsDeleteMetastoreRequest_Response,
  AccountsGetMetastoreAssignmentRequest,
  AccountsGetMetastoreAssignmentRequest_Response,
  AccountsGetMetastoreRequest,
  AccountsGetMetastoreRequest_Response,
  AccountsListMetastoresRequest,
  AccountsListMetastoresRequest_Response,
  AccountsListWorkspaceIdsForMetastoreRequest,
  AccountsListWorkspaceIdsForMetastoreRequest_Response,
  AccountsUpdateMetastoreAssignmentRequest,
  AccountsUpdateMetastoreAssignmentRequest_Response,
  AccountsUpdateMetastoreRequest,
  AccountsUpdateMetastoreRequest_Response,
  CreateMetastoreAssignmentRequest,
  CreateMetastoreAssignmentRequest_Response,
  CreateMetastoreRequest,
  DeleteMetastoreAssignmentRequest,
  DeleteMetastoreAssignmentRequest_Response,
  DeleteMetastoreRequest,
  DeleteMetastoreRequest_Response,
  GetCurrentMetastoreAssignmentRequest,
  GetMetastoreRequest,
  GetMetastoreSummaryRequest,
  GetMetastoreSummaryRequest_Response,
  ListMetastoresRequest,
  ListMetastoresRequest_Response,
  MetastoreAssignment,
  MetastoreInfo,
  UpdateMetastoreAssignmentRequest,
  UpdateMetastoreAssignmentRequest_Response,
  UpdateMetastoreRequest,
} from './model';
import {
  marshalAccountsCreateMetastoreAssignmentRequestSchema,
  marshalAccountsCreateMetastoreRequestSchema,
  marshalAccountsUpdateMetastoreAssignmentRequestSchema,
  marshalAccountsUpdateMetastoreRequestSchema,
  marshalCreateMetastoreAssignmentRequestSchema,
  marshalCreateMetastoreRequestSchema,
  marshalUpdateMetastoreAssignmentRequestSchema,
  marshalUpdateMetastoreRequestSchema,
  unmarshalAccountsCreateMetastoreAssignmentRequest_ResponseSchema,
  unmarshalAccountsCreateMetastoreRequest_ResponseSchema,
  unmarshalAccountsDeleteMetastoreAssignmentRequest_ResponseSchema,
  unmarshalAccountsDeleteMetastoreRequest_ResponseSchema,
  unmarshalAccountsGetMetastoreAssignmentRequest_ResponseSchema,
  unmarshalAccountsGetMetastoreRequest_ResponseSchema,
  unmarshalAccountsListMetastoresRequest_ResponseSchema,
  unmarshalAccountsListWorkspaceIdsForMetastoreRequest_ResponseSchema,
  unmarshalAccountsUpdateMetastoreAssignmentRequest_ResponseSchema,
  unmarshalAccountsUpdateMetastoreRequest_ResponseSchema,
  unmarshalCreateMetastoreAssignmentRequest_ResponseSchema,
  unmarshalDeleteMetastoreAssignmentRequest_ResponseSchema,
  unmarshalDeleteMetastoreRequest_ResponseSchema,
  unmarshalGetMetastoreSummaryRequest_ResponseSchema,
  unmarshalListMetastoresRequest_ResponseSchema,
  unmarshalMetastoreAssignmentSchema,
  unmarshalMetastoreInfoSchema,
  unmarshalUpdateMetastoreAssignmentRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class Client {
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
    let info = createDefault().with(PACKAGE_SEGMENT);
    if (options.credentials !== undefined) {
      info = info
        .with({key: 'sdk-js-auth', value: AUTH_VERSION})
        .with({key: 'auth', value: options.credentials.name()});
    }
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Creates a Unity Catalog metastore. */
  async createAccountsMetastore(
    req: AccountsCreateMetastoreRequest,
    options?: CallOptions
  ): Promise<AccountsCreateMetastoreRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores`;
    const body = marshalRequest(
      req,
      marshalAccountsCreateMetastoreRequestSchema
    );
    let resp: AccountsCreateMetastoreRequest_Response | undefined;
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
        unmarshalAccountsCreateMetastoreRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates an assignment to a metastore for a workspace */
  async createAccountsMetastoreAssignment(
    req: AccountsCreateMetastoreAssignmentRequest,
    options?: CallOptions
  ): Promise<AccountsCreateMetastoreAssignmentRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastores/${req.metastoreId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsCreateMetastoreAssignmentRequestSchema
    );
    let resp: AccountsCreateMetastoreAssignmentRequest_Response | undefined;
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
        unmarshalAccountsCreateMetastoreAssignmentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a Unity Catalog metastore for an account, both specified by ID. */
  async deleteAccountsMetastore(
    req: AccountsDeleteMetastoreRequest,
    options?: CallOptions
  ): Promise<AccountsDeleteMetastoreRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: AccountsDeleteMetastoreRequest_Response | undefined;
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
        unmarshalAccountsDeleteMetastoreRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a metastore assignment to a workspace, leaving the workspace with no metastore. */
  async deleteAccountsMetastoreAssignment(
    req: AccountsDeleteMetastoreAssignmentRequest,
    options?: CallOptions
  ): Promise<AccountsDeleteMetastoreAssignmentRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastores/${req.metastoreId ?? ''}`;
    let resp: AccountsDeleteMetastoreAssignmentRequest_Response | undefined;
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
        unmarshalAccountsDeleteMetastoreAssignmentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a Unity Catalog metastore from an account, both specified by ID. */
  async getAccountsMetastore(
    req: AccountsGetMetastoreRequest,
    options?: CallOptions
  ): Promise<AccountsGetMetastoreRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}`;
    let resp: AccountsGetMetastoreRequest_Response | undefined;
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
        unmarshalAccountsGetMetastoreRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the metastore assignment, if any, for the workspace specified by ID.
   * If the workspace is assigned a metastore, the mapping will be returned.
   * If no metastore is assigned to the workspace, the assignment will not be
   * found and a 404 returned.
   */
  async getMetastoreAssignment(
    req: AccountsGetMetastoreAssignmentRequest,
    options?: CallOptions
  ): Promise<AccountsGetMetastoreAssignmentRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    let resp: AccountsGetMetastoreAssignmentRequest_Response | undefined;
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
        unmarshalAccountsGetMetastoreAssignmentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets all Unity Catalog metastores associated with an account specified by ID. */
  async listAccountsMetastores(
    req: AccountsListMetastoresRequest,
    options?: CallOptions
  ): Promise<AccountsListMetastoresRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores`;
    let resp: AccountsListMetastoresRequest_Response | undefined;
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
        unmarshalAccountsListMetastoresRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a list of all <Databricks> workspace IDs that have been assigned to given metastore. */
  async listMetastoreAssignments(
    req: AccountsListWorkspaceIdsForMetastoreRequest,
    options?: CallOptions
  ): Promise<AccountsListWorkspaceIdsForMetastoreRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}/workspaces`;
    let resp: AccountsListWorkspaceIdsForMetastoreRequest_Response | undefined;
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
        unmarshalAccountsListWorkspaceIdsForMetastoreRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates an existing Unity Catalog metastore. */
  async updateAccountsMetastore(
    req: AccountsUpdateMetastoreRequest,
    options?: CallOptions
  ): Promise<AccountsUpdateMetastoreRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsUpdateMetastoreRequestSchema
    );
    let resp: AccountsUpdateMetastoreRequest_Response | undefined;
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
        unmarshalAccountsUpdateMetastoreRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates an assignment to a metastore for a workspace. Currently, only the default catalog may be updated. */
  async updateAccountsMetastoreAssignment(
    req: AccountsUpdateMetastoreAssignmentRequest,
    options?: CallOptions
  ): Promise<AccountsUpdateMetastoreAssignmentRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastores/${req.metastoreId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsUpdateMetastoreAssignmentRequestSchema
    );
    let resp: AccountsUpdateMetastoreAssignmentRequest_Response | undefined;
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
        unmarshalAccountsUpdateMetastoreAssignmentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new metastore based on a provided name and optional storage root path.
   * By default (if the __owner__ field is not set), the owner of the new metastore is the user calling
   * the __createMetastore__ API.  If the __owner__ field is set to the empty string (**""**), the ownership is
   * assigned to the System User instead.
   */
  async createMetastore(
    req: CreateMetastoreRequest,
    options?: CallOptions
  ): Promise<MetastoreInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores`;
    const body = marshalRequest(req, marshalCreateMetastoreRequestSchema);
    let resp: MetastoreInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMetastoreInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new metastore assignment.
   * If an assignment for the same __workspace_id__ exists, it will be overwritten by the new __metastore_id__ and
   * __default_catalog_name__. The caller must be an account admin.
   */
  async createMetastoreAssignment(
    req: CreateMetastoreAssignmentRequest,
    options?: CallOptions
  ): Promise<CreateMetastoreAssignmentRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    const body = marshalRequest(
      req,
      marshalCreateMetastoreAssignmentRequestSchema
    );
    let resp: CreateMetastoreAssignmentRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalCreateMetastoreAssignmentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a metastore. The caller must be a metastore admin. */
  async deleteMetastore(
    req: DeleteMetastoreRequest,
    options?: CallOptions
  ): Promise<DeleteMetastoreRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.id ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteMetastoreRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteMetastoreRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a metastore assignment. The caller must be an account administrator. */
  async deleteMetastoreAssignment(
    req: DeleteMetastoreAssignmentRequest,
    options?: CallOptions
  ): Promise<DeleteMetastoreAssignmentRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    const params = new URLSearchParams();
    if (req.metastoreId !== undefined) {
      params.append('metastore_id', req.metastoreId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteMetastoreAssignmentRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteMetastoreAssignmentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the metastore assignment for the workspace being accessed. */
  async getCurrentMetastoreAssignment(
    _req: GetCurrentMetastoreAssignmentRequest,
    options?: CallOptions
  ): Promise<MetastoreAssignment> {
    const url = `${this.host}/api/2.1/unity-catalog/current-metastore-assignment`;
    let resp: MetastoreAssignment | undefined;
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
      resp = parseResponse(respBody, unmarshalMetastoreAssignmentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a metastore that matches the supplied ID. The caller must be a metastore admin to retrieve this info. */
  async getMetastore(
    req: GetMetastoreRequest,
    options?: CallOptions
  ): Promise<MetastoreInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.id ?? ''}`;
    let resp: MetastoreInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalMetastoreInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets information about a metastore.
   * This summary includes the storage credential, the cloud vendor, the cloud region, and the global metastore ID.
   */
  async getMetastoreSummary(
    _req: GetMetastoreSummaryRequest,
    options?: CallOptions
  ): Promise<GetMetastoreSummaryRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastore_summary`;
    let resp: GetMetastoreSummaryRequest_Response | undefined;
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
        unmarshalGetMetastoreSummaryRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of the available metastores (as __MetastoreInfo__ objects). The caller must be an admin to retrieve this info.
   * There is no guarantee of a specific ordering of the elements in the array.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listMetastores(
    req: ListMetastoresRequest,
    options?: CallOptions
  ): Promise<ListMetastoresRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListMetastoresRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalListMetastoresRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listMetastoresIter(
    req: ListMetastoresRequest,
    options?: CallOptions
  ): AsyncGenerator<MetastoreInfo> {
    const pageReq: ListMetastoresRequest = {...req};
    for (;;) {
      const resp = await this.listMetastores(pageReq, options);
      for (const item of resp.metastores ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates information for a specific metastore. The caller must be a metastore admin.
   * If the __owner__ field is set to the empty string (**""**), the ownership is updated
   * to the System User.
   */
  async updateMetastore(
    req: UpdateMetastoreRequest,
    options?: CallOptions
  ): Promise<MetastoreInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateMetastoreRequestSchema);
    let resp: MetastoreInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalMetastoreInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a metastore assignment. This operation can be used to update __metastore_id__ or __default_catalog_name__
   * for a specified Workspace, if the Workspace is already assigned a metastore.
   * The caller must be an account admin to update __metastore_id__; otherwise, the caller can be a Workspace admin.
   */
  async updateMetastoreAssignment(
    req: UpdateMetastoreAssignmentRequest,
    options?: CallOptions
  ): Promise<UpdateMetastoreAssignmentRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    const body = marshalRequest(
      req,
      marshalUpdateMetastoreAssignmentRequestSchema
    );
    let resp: UpdateMetastoreAssignmentRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalUpdateMetastoreAssignmentRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
