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
  CreateFunctionRequest,
  DeleteFunction,
  DeleteFunction_Response,
  FunctionInfo,
  GetFunction,
  ListFunctions,
  ListFunctions_Response,
  UpdateFunction,
} from './model';
import {
  marshalCreateFunctionRequestSchema,
  marshalUpdateFunctionSchema,
  unmarshalDeleteFunction_ResponseSchema,
  unmarshalFunctionInfoSchema,
  unmarshalListFunctions_ResponseSchema,
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
   * **WARNING: This API is experimental and will change in future versions**
   *
   * Creates a new function
   *
   * The user must have the following permissions in order for the function to be created:
   * - **USE_CATALOG** on the function's parent catalog
   * - **USE_SCHEMA** and **CREATE_FUNCTION** on the function's parent schema
   */
  async createFunction(
    signal: AbortSignal | undefined,
    req: CreateFunctionRequest,
    options?: Options
  ): Promise<FunctionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/functions`;
    const body = marshalRequest(req, marshalCreateFunctionRequestSchema);
    let resp: FunctionInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFunctionInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: DeleteFunction,
    options?: Options
  ): Promise<DeleteFunction_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/functions/${req.fullNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteFunction_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteFunction_ResponseSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetFunction,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFunctionInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ListFunctions,
    options?: Options
  ): Promise<ListFunctions_Response> {
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
    let resp: ListFunctions_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListFunctions_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listFunctionsIter(
    signal: AbortSignal | undefined,
    req: ListFunctions,
    options?: Options
  ): AsyncGenerator<FunctionInfo> {
    const pageReq: ListFunctions = {...req};
    for (;;) {
      const resp = await this.listFunctions(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: UpdateFunction,
    options?: Options
  ): Promise<FunctionInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/functions/${req.fullNameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateFunctionSchema);
    let resp: FunctionInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFunctionInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
