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
  CatalogInfo,
  CreateCatalog,
  DeleteCatalog,
  DeleteCatalog_Response,
  GetCatalog,
  ListCatalogs,
  ListCatalogs_Response,
  UpdateCatalog,
} from './model';
import {
  marshalCreateCatalogSchema,
  marshalUpdateCatalogSchema,
  unmarshalCatalogInfoSchema,
  unmarshalDeleteCatalog_ResponseSchema,
  unmarshalListCatalogs_ResponseSchema,
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

  /** Creates a new catalog instance in the parent metastore if the caller is a metastore admin or has the **CREATE_CATALOG** privilege. */
  async createCatalog(
    signal: AbortSignal | undefined,
    req: CreateCatalog,
    options?: Options
  ): Promise<CatalogInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/catalogs`;
    const body = marshalRequest(req, marshalCreateCatalogSchema);
    let resp: CatalogInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the catalog that matches the supplied name. The caller must be a metastore admin or the owner of the catalog. */
  async deleteCatalog(
    signal: AbortSignal | undefined,
    req: DeleteCatalog,
    options?: Options
  ): Promise<DeleteCatalog_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/catalogs/${req.nameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteCatalog_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteCatalog_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the specified catalog in a metastore.
   * The caller must be a metastore admin, the owner of the catalog, or a user that has the **USE_CATALOG** privilege set for their account.
   */
  async getCatalog(
    signal: AbortSignal | undefined,
    req: GetCatalog,
    options?: Options
  ): Promise<CatalogInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/catalogs/${req.nameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: CatalogInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of catalogs in the metastore.
   * If the caller is the metastore admin, all catalogs will be retrieved.
   * Otherwise, only catalogs owned by the caller (or for which the caller has the **USE_CATALOG** privilege) will be retrieved.
   * There is no guarantee of a specific ordering of the elements in the array.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listCatalogs(
    signal: AbortSignal | undefined,
    req: ListCatalogs,
    options?: Options
  ): Promise<ListCatalogs_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/catalogs`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeUnbound !== undefined) {
      params.append('include_unbound', String(req.includeUnbound));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCatalogs_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListCatalogs_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCatalogsIter(
    signal: AbortSignal | undefined,
    req: ListCatalogs,
    options?: Options
  ): AsyncGenerator<CatalogInfo> {
    const pageReq: ListCatalogs = {...req};
    for (;;) {
      const resp = await this.listCatalogs(signal, pageReq, options);
      for (const item of resp.catalogs ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates the catalog that matches the supplied name.
   * The caller must be either the owner of the catalog, or a metastore admin (when changing the owner field of the catalog).
   */
  async updateCatalog(
    signal: AbortSignal | undefined,
    req: UpdateCatalog,
    options?: Options
  ): Promise<CatalogInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/catalogs/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateCatalogSchema);
    let resp: CatalogInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
