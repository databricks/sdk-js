// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import type {
  CreateSchema,
  DeleteSchema,
  DeleteSchema_Response,
  GetSchema,
  ListSchemas,
  ListSchemas_Response,
  SchemaInfo,
  UpdateSchema,
} from './model';
import {
  marshalCreateSchemaSchema,
  marshalUpdateSchemaSchema,
  unmarshalDeleteSchema_ResponseSchema,
  unmarshalListSchemas_ResponseSchema,
  unmarshalSchemaInfoSchema,
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
   * Creates a new schema for catalog in the Metastore.
   * The caller must be a metastore admin, or have the **CREATE_SCHEMA** privilege in the parent catalog.
   */
  async createSchema(
    signal: AbortSignal | undefined,
    req: CreateSchema,
    options?: Options
  ): Promise<SchemaInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/schemas`;
    const body = marshalRequest(req, marshalCreateSchemaSchema);
    let resp: SchemaInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSchemaInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes the specified schema from the parent catalog.
   * The caller must be the owner of the schema or an owner of the parent catalog.
   */
  async deleteSchema(
    signal: AbortSignal | undefined,
    req: DeleteSchema,
    options?: Options
  ): Promise<DeleteSchema_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/schemas/${req.fullNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteSchema_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteSchema_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the specified schema within the metastore.
   * The caller must be a metastore admin, the owner of the schema, or a user that has the **USE_SCHEMA** privilege on the schema.
   */
  async getSchema(
    signal: AbortSignal | undefined,
    req: GetSchema,
    options?: Options
  ): Promise<SchemaInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/schemas/${req.fullNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: SchemaInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSchemaInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of schemas for a catalog in the metastore.
   * If the caller is the metastore admin or the owner of the parent catalog, all schemas for the catalog will be retrieved.
   * Otherwise, only schemas owned by the caller (or for which the caller has the **USE_SCHEMA** privilege) will be retrieved.
   * There is no guarantee of a specific ordering of the elements in the array.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listSchemas(
    signal: AbortSignal | undefined,
    req: ListSchemas,
    options?: Options
  ): Promise<ListSchemas_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/schemas`;
    const params = new URLSearchParams();
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSchemas_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListSchemas_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listSchemasIter(
    signal: AbortSignal | undefined,
    req: ListSchemas,
    options?: Options
  ): AsyncGenerator<SchemaInfo> {
    const pageReq: ListSchemas = {...req};
    for (;;) {
      const resp = await this.listSchemas(signal, pageReq, options);
      for (const item of resp.schemas ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates a schema for a catalog. The caller must be the owner of the schema or a metastore admin.
   * If the caller is a metastore admin, only the __owner__ field can be changed in the update.
   * If the __name__ field must be updated, the caller must be a metastore admin or have the **CREATE_SCHEMA** privilege on the parent catalog.
   */
  async updateSchema(
    signal: AbortSignal | undefined,
    req: UpdateSchema,
    options?: Options
  ): Promise<SchemaInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/schemas/${req.fullNameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateSchemaSchema);
    let resp: SchemaInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSchemaInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
