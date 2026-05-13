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
  AccountsCreateMetastoreAssignmentPublic,
  AccountsCreateMetastoreAssignmentPublic_Response,
  AccountsCreateMetastorePublic,
  AccountsCreateMetastorePublic_Response,
  AccountsDeleteMetastoreAssignmentPublic,
  AccountsDeleteMetastoreAssignmentPublic_Response,
  AccountsDeleteMetastorePublic,
  AccountsDeleteMetastorePublic_Response,
  AccountsGetMetastoreAssignmentPublic,
  AccountsGetMetastoreAssignmentPublic_Response,
  AccountsGetMetastorePublic,
  AccountsGetMetastorePublic_Response,
  AccountsListMetastoresPublic,
  AccountsListMetastoresPublic_Response,
  AccountsListWorkspaceIdsForMetastorePublic,
  AccountsListWorkspaceIdsForMetastorePublic_Response,
  AccountsUpdateMetastoreAssignmentPublic,
  AccountsUpdateMetastoreAssignmentPublic_Response,
  AccountsUpdateMetastorePublic,
  AccountsUpdateMetastorePublic_Response,
  CreateMetastore,
  CreateMetastoreAssignment,
  CreateMetastoreAssignment_Response,
  DeleteMetastore,
  DeleteMetastoreAssignment,
  DeleteMetastoreAssignment_Response,
  DeleteMetastore_Response,
  GetCurrentMetastoreAssignment,
  GetMetastore,
  GetMetastoreSummary,
  GetMetastoreSummary_Response,
  ListMetastores,
  ListMetastores_Response,
  MetastoreAssignment,
  MetastoreInfo,
  UpdateMetastore,
  UpdateMetastoreAssignment,
  UpdateMetastoreAssignment_Response,
} from './model';
import {
  marshalAccountsCreateMetastoreAssignmentPublicSchema,
  marshalAccountsCreateMetastorePublicSchema,
  marshalAccountsUpdateMetastoreAssignmentPublicSchema,
  marshalAccountsUpdateMetastorePublicSchema,
  marshalCreateMetastoreAssignmentSchema,
  marshalCreateMetastoreSchema,
  marshalUpdateMetastoreAssignmentSchema,
  marshalUpdateMetastoreSchema,
  unmarshalAccountsCreateMetastoreAssignmentPublic_ResponseSchema,
  unmarshalAccountsCreateMetastorePublic_ResponseSchema,
  unmarshalAccountsDeleteMetastoreAssignmentPublic_ResponseSchema,
  unmarshalAccountsDeleteMetastorePublic_ResponseSchema,
  unmarshalAccountsGetMetastoreAssignmentPublic_ResponseSchema,
  unmarshalAccountsGetMetastorePublic_ResponseSchema,
  unmarshalAccountsListMetastoresPublic_ResponseSchema,
  unmarshalAccountsListWorkspaceIdsForMetastorePublic_ResponseSchema,
  unmarshalAccountsUpdateMetastoreAssignmentPublic_ResponseSchema,
  unmarshalAccountsUpdateMetastorePublic_ResponseSchema,
  unmarshalCreateMetastoreAssignment_ResponseSchema,
  unmarshalDeleteMetastoreAssignment_ResponseSchema,
  unmarshalDeleteMetastore_ResponseSchema,
  unmarshalGetMetastoreSummary_ResponseSchema,
  unmarshalListMetastores_ResponseSchema,
  unmarshalMetastoreAssignmentSchema,
  unmarshalMetastoreInfoSchema,
  unmarshalUpdateMetastoreAssignment_ResponseSchema,
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
    req: AccountsCreateMetastorePublic,
    options?: CallOptions
  ): Promise<AccountsCreateMetastorePublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores`;
    const body = marshalRequest(
      req,
      marshalAccountsCreateMetastorePublicSchema
    );
    let resp: AccountsCreateMetastorePublic_Response | undefined;
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
        unmarshalAccountsCreateMetastorePublic_ResponseSchema
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
    req: AccountsCreateMetastoreAssignmentPublic,
    options?: CallOptions
  ): Promise<AccountsCreateMetastoreAssignmentPublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastores/${req.metastoreId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsCreateMetastoreAssignmentPublicSchema
    );
    let resp: AccountsCreateMetastoreAssignmentPublic_Response | undefined;
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
        unmarshalAccountsCreateMetastoreAssignmentPublic_ResponseSchema
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
    req: AccountsDeleteMetastorePublic,
    options?: CallOptions
  ): Promise<AccountsDeleteMetastorePublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: AccountsDeleteMetastorePublic_Response | undefined;
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
        unmarshalAccountsDeleteMetastorePublic_ResponseSchema
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
    req: AccountsDeleteMetastoreAssignmentPublic,
    options?: CallOptions
  ): Promise<AccountsDeleteMetastoreAssignmentPublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastores/${req.metastoreId ?? ''}`;
    let resp: AccountsDeleteMetastoreAssignmentPublic_Response | undefined;
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
        unmarshalAccountsDeleteMetastoreAssignmentPublic_ResponseSchema
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
    req: AccountsGetMetastorePublic,
    options?: CallOptions
  ): Promise<AccountsGetMetastorePublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}`;
    let resp: AccountsGetMetastorePublic_Response | undefined;
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
        unmarshalAccountsGetMetastorePublic_ResponseSchema
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
    req: AccountsGetMetastoreAssignmentPublic,
    options?: CallOptions
  ): Promise<AccountsGetMetastoreAssignmentPublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    let resp: AccountsGetMetastoreAssignmentPublic_Response | undefined;
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
        unmarshalAccountsGetMetastoreAssignmentPublic_ResponseSchema
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
    req: AccountsListMetastoresPublic,
    options?: CallOptions
  ): Promise<AccountsListMetastoresPublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores`;
    let resp: AccountsListMetastoresPublic_Response | undefined;
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
        unmarshalAccountsListMetastoresPublic_ResponseSchema
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
    req: AccountsListWorkspaceIdsForMetastorePublic,
    options?: CallOptions
  ): Promise<AccountsListWorkspaceIdsForMetastorePublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}/workspaces`;
    let resp: AccountsListWorkspaceIdsForMetastorePublic_Response | undefined;
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
        unmarshalAccountsListWorkspaceIdsForMetastorePublic_ResponseSchema
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
    req: AccountsUpdateMetastorePublic,
    options?: CallOptions
  ): Promise<AccountsUpdateMetastorePublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/metastores/${req.metastoreId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsUpdateMetastorePublicSchema
    );
    let resp: AccountsUpdateMetastorePublic_Response | undefined;
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
        unmarshalAccountsUpdateMetastorePublic_ResponseSchema
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
    req: AccountsUpdateMetastoreAssignmentPublic,
    options?: CallOptions
  ): Promise<AccountsUpdateMetastoreAssignmentPublic_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/workspaces/${String(req.workspaceId ?? '')}/metastores/${req.metastoreId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsUpdateMetastoreAssignmentPublicSchema
    );
    let resp: AccountsUpdateMetastoreAssignmentPublic_Response | undefined;
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
        unmarshalAccountsUpdateMetastoreAssignmentPublic_ResponseSchema
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
    req: CreateMetastore,
    options?: CallOptions
  ): Promise<MetastoreInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores`;
    const body = marshalRequest(req, marshalCreateMetastoreSchema);
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
    req: CreateMetastoreAssignment,
    options?: CallOptions
  ): Promise<CreateMetastoreAssignment_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    const body = marshalRequest(req, marshalCreateMetastoreAssignmentSchema);
    let resp: CreateMetastoreAssignment_Response | undefined;
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
        unmarshalCreateMetastoreAssignment_ResponseSchema
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
    req: DeleteMetastore,
    options?: CallOptions
  ): Promise<DeleteMetastore_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.id ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteMetastore_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteMetastore_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a metastore assignment. The caller must be an account administrator. */
  async deleteMetastoreAssignment(
    req: DeleteMetastoreAssignment,
    options?: CallOptions
  ): Promise<DeleteMetastoreAssignment_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    const params = new URLSearchParams();
    if (req.metastoreId !== undefined) {
      params.append('metastore_id', req.metastoreId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteMetastoreAssignment_Response | undefined;
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
        unmarshalDeleteMetastoreAssignment_ResponseSchema
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
    _req: GetCurrentMetastoreAssignment,
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
    req: GetMetastore,
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
    _req: GetMetastoreSummary,
    options?: CallOptions
  ): Promise<GetMetastoreSummary_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastore_summary`;
    let resp: GetMetastoreSummary_Response | undefined;
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
        unmarshalGetMetastoreSummary_ResponseSchema
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
    req: ListMetastores,
    options?: CallOptions
  ): Promise<ListMetastores_Response> {
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
    let resp: ListMetastores_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListMetastores_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listMetastoresIter(
    req: ListMetastores,
    options?: CallOptions
  ): AsyncGenerator<MetastoreInfo> {
    const pageReq: ListMetastores = {...req};
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
    req: UpdateMetastore,
    options?: CallOptions
  ): Promise<MetastoreInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateMetastoreSchema);
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
    req: UpdateMetastoreAssignment,
    options?: CallOptions
  ): Promise<UpdateMetastoreAssignment_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    const body = marshalRequest(req, marshalUpdateMetastoreAssignmentSchema);
    let resp: UpdateMetastoreAssignment_Response | undefined;
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
        unmarshalUpdateMetastoreAssignment_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
