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
  DisableSystemSchema,
  DisableSystemSchema_Response,
  EnableSystemSchema,
  EnableSystemSchema_Response,
  ListSystemSchemas,
  ListSystemSchemas_Response,
  SystemSchemaInfo,
} from './model';
import {
  marshalEnableSystemSchemaSchema,
  unmarshalDisableSystemSchema_ResponseSchema,
  unmarshalEnableSystemSchema_ResponseSchema,
  unmarshalListSystemSchemas_ResponseSchema,
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
   * Disables the system schema and removes it from the system catalog.
   * The caller must be an account admin or a metastore admin.
   */
  async disableSystemSchema(signal: AbortSignal | undefined, req: DisableSystemSchema, options?: Options): Promise<DisableSystemSchema_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.metastoreId ?? ''}/systemschemas/${req.schema ?? ''}`;
    let resp: DisableSystemSchema_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDisableSystemSchema_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Enables the system schema and adds it to the system catalog.
   * The caller must be an account admin or a metastore admin.
   */
  async enableSystemSchema(signal: AbortSignal | undefined, req: EnableSystemSchema, options?: Options): Promise<EnableSystemSchema_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.metastoreId ?? ''}/systemschemas/${req.schema ?? ''}`;
    const body = marshalRequest(req, marshalEnableSystemSchemaSchema);
    let resp: EnableSystemSchema_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalEnableSystemSchema_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of system schemas for a metastore.
   * The caller must be an account admin or a metastore admin.
   * 
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   * 
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listSystemSchemas(signal: AbortSignal | undefined, req: ListSystemSchemas, options?: Options): Promise<ListSystemSchemas_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.metastoreId ?? ''}/systemschemas`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSystemSchemas_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListSystemSchemas_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listSystemSchemasIter(signal: AbortSignal | undefined, req: ListSystemSchemas, options?: Options): AsyncGenerator<SystemSchemaInfo> {
    const pageReq: ListSystemSchemas = {...req};
    for (;;) {
      const resp = await this.listSystemSchemas(signal, pageReq, options);
      for (const item of resp.schemas ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

}
