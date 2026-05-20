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
  AccountsCreateMetastoreAssignmentPublicRequest,
  AccountsCreateMetastoreAssignmentPublicRequest_Response,
  AccountsCreateMetastorePublicRequest,
  AccountsCreateMetastorePublicRequest_Response,
  AccountsDeleteMetastoreAssignmentPublicRequest,
  AccountsDeleteMetastoreAssignmentPublicRequest_Response,
  AccountsDeleteMetastorePublicRequest,
  AccountsDeleteMetastorePublicRequest_Response,
  AccountsGetMetastoreAssignmentPublicRequest,
  AccountsGetMetastoreAssignmentPublicRequest_Response,
  AccountsGetMetastorePublicRequest,
  AccountsGetMetastorePublicRequest_Response,
  AccountsListMetastoresPublicRequest,
  AccountsListMetastoresPublicRequest_Response,
  AccountsListWorkspaceIdsForMetastorePublicRequest,
  AccountsListWorkspaceIdsForMetastorePublicRequest_Response,
  AccountsUpdateMetastoreAssignmentPublicRequest,
  AccountsUpdateMetastoreAssignmentPublicRequest_Response,
  AccountsUpdateMetastorePublicRequest,
  AccountsUpdateMetastorePublicRequest_Response,
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
  marshalAccountsCreateMetastoreAssignmentPublicRequestSchema,
  marshalAccountsCreateMetastorePublicRequestSchema,
  marshalAccountsUpdateMetastoreAssignmentPublicRequestSchema,
  marshalAccountsUpdateMetastorePublicRequestSchema,
  marshalCreateMetastoreAssignmentRequestSchema,
  marshalCreateMetastoreRequestSchema,
  marshalUpdateMetastoreAssignmentRequestSchema,
  marshalUpdateMetastoreRequestSchema,
  unmarshalAccountsCreateMetastoreAssignmentPublicRequest_ResponseSchema,
  unmarshalAccountsCreateMetastorePublicRequest_ResponseSchema,
  unmarshalAccountsDeleteMetastoreAssignmentPublicRequest_ResponseSchema,
  unmarshalAccountsDeleteMetastorePublicRequest_ResponseSchema,
  unmarshalAccountsGetMetastoreAssignmentPublicRequest_ResponseSchema,
  unmarshalAccountsGetMetastorePublicRequest_ResponseSchema,
  unmarshalAccountsListMetastoresPublicRequest_ResponseSchema,
  unmarshalAccountsListWorkspaceIdsForMetastorePublicRequest_ResponseSchema,
  unmarshalAccountsUpdateMetastoreAssignmentPublicRequest_ResponseSchema,
  unmarshalAccountsUpdateMetastorePublicRequest_ResponseSchema,
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

  /** Creates a Unity Catalog metastore. */
  async createAccountsMetastore(
    req: AccountsCreateMetastorePublicRequest,
    options?: CallOptions
  ): Promise<AccountsCreateMetastorePublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores`;
    const body = marshalRequest(
      req,
      marshalAccountsCreateMetastorePublicRequestSchema
    );
    let resp: AccountsCreateMetastorePublicRequest_Response | undefined;
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
        unmarshalAccountsCreateMetastorePublicRequest_ResponseSchema
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
    req: AccountsCreateMetastoreAssignmentPublicRequest,
    options?: CallOptions
  ): Promise<AccountsCreateMetastoreAssignmentPublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastores/${req.metastoreId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsCreateMetastoreAssignmentPublicRequestSchema
    );
    let resp:
      | AccountsCreateMetastoreAssignmentPublicRequest_Response
      | undefined;
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
        unmarshalAccountsCreateMetastoreAssignmentPublicRequest_ResponseSchema
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
    req: AccountsDeleteMetastorePublicRequest,
    options?: CallOptions
  ): Promise<AccountsDeleteMetastorePublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: AccountsDeleteMetastorePublicRequest_Response | undefined;
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
        unmarshalAccountsDeleteMetastorePublicRequest_ResponseSchema
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
    req: AccountsDeleteMetastoreAssignmentPublicRequest,
    options?: CallOptions
  ): Promise<AccountsDeleteMetastoreAssignmentPublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastores/${req.metastoreId ?? ''}`;
    let resp:
      | AccountsDeleteMetastoreAssignmentPublicRequest_Response
      | undefined;
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
        unmarshalAccountsDeleteMetastoreAssignmentPublicRequest_ResponseSchema
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
    req: AccountsGetMetastorePublicRequest,
    options?: CallOptions
  ): Promise<AccountsGetMetastorePublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}`;
    let resp: AccountsGetMetastorePublicRequest_Response | undefined;
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
        unmarshalAccountsGetMetastorePublicRequest_ResponseSchema
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
    req: AccountsGetMetastoreAssignmentPublicRequest,
    options?: CallOptions
  ): Promise<AccountsGetMetastoreAssignmentPublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    let resp: AccountsGetMetastoreAssignmentPublicRequest_Response | undefined;
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
        unmarshalAccountsGetMetastoreAssignmentPublicRequest_ResponseSchema
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
    req: AccountsListMetastoresPublicRequest,
    options?: CallOptions
  ): Promise<AccountsListMetastoresPublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores`;
    let resp: AccountsListMetastoresPublicRequest_Response | undefined;
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
        unmarshalAccountsListMetastoresPublicRequest_ResponseSchema
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
    req: AccountsListWorkspaceIdsForMetastorePublicRequest,
    options?: CallOptions
  ): Promise<AccountsListWorkspaceIdsForMetastorePublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}/workspaces`;
    let resp:
      | AccountsListWorkspaceIdsForMetastorePublicRequest_Response
      | undefined;
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
        unmarshalAccountsListWorkspaceIdsForMetastorePublicRequest_ResponseSchema
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
    req: AccountsUpdateMetastorePublicRequest,
    options?: CallOptions
  ): Promise<AccountsUpdateMetastorePublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsUpdateMetastorePublicRequestSchema
    );
    let resp: AccountsUpdateMetastorePublicRequest_Response | undefined;
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
        unmarshalAccountsUpdateMetastorePublicRequest_ResponseSchema
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
    req: AccountsUpdateMetastoreAssignmentPublicRequest,
    options?: CallOptions
  ): Promise<AccountsUpdateMetastoreAssignmentPublicRequest_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastores/${req.metastoreId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsUpdateMetastoreAssignmentPublicRequestSchema
    );
    let resp:
      | AccountsUpdateMetastoreAssignmentPublicRequest_Response
      | undefined;
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
        unmarshalAccountsUpdateMetastoreAssignmentPublicRequest_ResponseSchema
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
