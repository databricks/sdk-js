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
  CreateFunctionRequest,
  DeleteFunctionRequest,
  DeleteFunctionRequest_Response,
  FunctionInfo,
  GetFunctionRequest,
  ListFunctionsRequest,
  ListFunctionsRequest_Response,
  UpdateFunctionRequest,
} from './model';
import {
  marshalCreateFunctionRequestSchema,
  marshalUpdateFunctionRequestSchema,
  unmarshalDeleteFunctionRequest_ResponseSchema,
  unmarshalFunctionInfoSchema,
  unmarshalListFunctionsRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
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
    this.workspaceId = options.workspaceId;
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
   * **WARNING: This API is experimental and will change in future versions**
   *
   * Creates a new function
   *
   * The user must have the following permissions in order for the function to be created:
   * - **USE_CATALOG** on the function's parent catalog
   * - **USE_SCHEMA** and **CREATE_FUNCTION** on the function's parent schema
   */
  async createFunction(
    req: CreateFunctionRequest,
    options?: CallOptions
  ): Promise<FunctionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/functions`;
    const body = marshalRequest(req, marshalCreateFunctionRequestSchema);
    let resp: FunctionInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalFunctionInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes the function that matches the supplied name.
   * For the deletion to succeed, the user must satisfy one of the following conditions:
   * - Is the owner of the function's parent catalog
   * - Is the owner of the function's parent schema and have the **USE_CATALOG** privilege on its parent catalog
   * - Is the owner of the function itself and have both the **USE_CATALOG** privilege on its parent catalog and the **USE_SCHEMA** privilege on its parent schema
   */
  async deleteFunction(
    req: DeleteFunctionRequest,
    options?: CallOptions
  ): Promise<DeleteFunctionRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/functions/${req.fullNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteFunctionRequest_Response | undefined;
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
        unmarshalDeleteFunctionRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a function from within a parent catalog and schema.
   * For the fetch to succeed, the user must satisfy one of the following requirements:
   * - Is a metastore admin
   * - Is an owner of the function's parent catalog
   * - Have the **USE_CATALOG** privilege on the function's parent catalog and be the owner of the function
   * - Have the **USE_CATALOG** privilege on the function's parent catalog, the **USE_SCHEMA** privilege on the function's parent schema, and the **EXECUTE** privilege on the function itself
   */
  async getFunction(
    req: GetFunctionRequest,
    options?: CallOptions
  ): Promise<FunctionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/functions/${req.fullNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: FunctionInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalFunctionInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * List functions within the specified parent catalog and schema.
   * If the user is a metastore admin, all functions are returned in the output list.
   * Otherwise, the user must have the **USE_CATALOG** privilege on the catalog and the **USE_SCHEMA** privilege on the schema, and the output list contains only functions for which either the user has the **EXECUTE** privilege or the user is the owner.
   * There is no guarantee of a specific ordering of the elements in the array.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listFunctions(
    req: ListFunctionsRequest,
    options?: CallOptions
  ): Promise<ListFunctionsRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/functions`;
    const params = new URLSearchParams();
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaName !== undefined) {
      params.append('schema_name', req.schemaName);
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFunctionsRequest_Response | undefined;
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
        unmarshalListFunctionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listFunctionsIter(
    req: ListFunctionsRequest,
    options?: CallOptions
  ): AsyncGenerator<FunctionInfo> {
    const pageReq: ListFunctionsRequest = {...req};
    for (;;) {
      const resp = await this.listFunctions(pageReq, options);
      for (const item of resp.functions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates the function that matches the supplied name.
   * Only the owner of the function can be updated. If the user is not a metastore admin, the user must be a member of the group that is the new function owner.
   * - Is a metastore admin
   * - Is the owner of the function's parent catalog
   * - Is the owner of the function's parent schema and has the **USE_CATALOG** privilege on its parent catalog
   * - Is the owner of the function itself and has the **USE_CATALOG** privilege on its parent catalog as well as the **USE_SCHEMA** privilege on the function's parent schema.
   */
  async updateFunction(
    req: UpdateFunctionRequest,
    options?: CallOptions
  ): Promise<FunctionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/functions/${req.fullNameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateFunctionRequestSchema);
    let resp: FunctionInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalFunctionInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
