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
  marshalCreateMetastoreAssignmentSchema,
  marshalCreateMetastoreSchema,
  marshalUpdateMetastoreAssignmentSchema,
  marshalUpdateMetastoreSchema,
  unmarshalCreateMetastoreAssignment_ResponseSchema,
  unmarshalDeleteMetastoreAssignment_ResponseSchema,
  unmarshalDeleteMetastore_ResponseSchema,
  unmarshalGetMetastoreSummary_ResponseSchema,
  unmarshalListMetastores_ResponseSchema,
  unmarshalMetastoreAssignmentSchema,
  unmarshalMetastoreInfoSchema,
  unmarshalUpdateMetastoreAssignment_ResponseSchema,
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
   * Creates a new metastore based on a provided name and optional storage root path.
   * By default (if the __owner__ field is not set), the owner of the new metastore is the user calling
   * the __createMetastore__ API.  If the __owner__ field is set to the empty string (**""**), the ownership is
   * assigned to the System User instead.
   */
  async createMetastore(
    signal: AbortSignal | undefined,
    req: CreateMetastore,
    options?: Options
  ): Promise<MetastoreInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores`;
    const body = marshalRequest(req, marshalCreateMetastoreSchema);
    let resp: MetastoreInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMetastoreInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: CreateMetastoreAssignment,
    options?: Options
  ): Promise<CreateMetastoreAssignment_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    const body = marshalRequest(req, marshalCreateMetastoreAssignmentSchema);
    let resp: CreateMetastoreAssignment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a metastore. The caller must be a metastore admin. */
  async deleteMetastore(
    signal: AbortSignal | undefined,
    req: DeleteMetastore,
    options?: Options
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
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteMetastore_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a metastore assignment. The caller must be an account administrator. */
  async deleteMetastoreAssignment(
    signal: AbortSignal | undefined,
    req: DeleteMetastoreAssignment,
    options?: Options
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
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the metastore assignment for the workspace being accessed. */
  async getCurrentMetastoreAssignment(
    signal: AbortSignal | undefined,
    _req: GetCurrentMetastoreAssignment,
    options?: Options
  ): Promise<MetastoreAssignment> {
    const url = `${this.host}/api/2.1/unity-catalog/current-metastore-assignment`;
    let resp: MetastoreAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMetastoreAssignmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a metastore that matches the supplied ID. The caller must be a metastore admin to retrieve this info. */
  async getMetastore(
    signal: AbortSignal | undefined,
    req: GetMetastore,
    options?: Options
  ): Promise<MetastoreInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.id ?? ''}`;
    let resp: MetastoreInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMetastoreInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    _req: GetMetastoreSummary,
    options?: Options
  ): Promise<GetMetastoreSummary_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastore_summary`;
    let resp: GetMetastoreSummary_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ListMetastores,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListMetastores_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listMetastoresIter(
    signal: AbortSignal | undefined,
    req: ListMetastores,
    options?: Options
  ): AsyncGenerator<MetastoreInfo> {
    const pageReq: ListMetastores = {...req};
    for (;;) {
      const resp = await this.listMetastores(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: UpdateMetastore,
    options?: Options
  ): Promise<MetastoreInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateMetastoreSchema);
    let resp: MetastoreInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMetastoreInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateMetastoreAssignment,
    options?: Options
  ): Promise<UpdateMetastoreAssignment_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/workspaces/${String(req.workspaceId ?? '')}/metastore`;
    const body = marshalRequest(req, marshalUpdateMetastoreAssignmentSchema);
    let resp: UpdateMetastoreAssignment_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
