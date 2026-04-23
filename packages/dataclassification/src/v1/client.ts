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
  CatalogConfig,
  CreateCatalogConfigRequest,
  DeleteCatalogConfigRequest,
  GetCatalogConfigRequest,
  UpdateCatalogConfigRequest,
} from './model';
import {
  marshalCatalogConfigSchema,
  unmarshalCatalogConfigSchema,
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
   * Create Data Classification configuration for a catalog.
   *
   * Creates a new config resource, which enables Data Classification
   * for the specified catalog.
   * - The config must not already exist for the catalog.
   */
  async createCatalogConfig(
    signal: AbortSignal | undefined,
    req: CreateCatalogConfigRequest,
    options?: Options
  ): Promise<CatalogConfig> {
    const url = `${this.host}/api/data-classification/v1/${req.parent ?? ''}/config`;
    const body = marshalRequest(req.catalogConfig, marshalCatalogConfigSchema);
    let resp: CatalogConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogConfigSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete Data Classification configuration for a catalog. */
  async deleteCatalogConfig(
    signal: AbortSignal | undefined,
    req: DeleteCatalogConfigRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/data-classification/v1/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Get the Data Classification configuration for a catalog. */
  async getCatalogConfig(
    signal: AbortSignal | undefined,
    req: GetCatalogConfigRequest,
    options?: Options
  ): Promise<CatalogConfig> {
    const url = `${this.host}/api/data-classification/v1/${req.name ?? ''}`;
    let resp: CatalogConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogConfigSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Update the Data Classification configuration for a catalog.
   * - The config must already exist for the catalog.
   * - Updates fields specified in the update_mask.  Use update_mask field to perform partial updates of the configuration.
   */
  async updateCatalogConfig(
    signal: AbortSignal | undefined,
    req: UpdateCatalogConfigRequest,
    options?: Options
  ): Promise<CatalogConfig> {
    const url = `${this.host}/api/data-classification/v1/${req.catalogConfig?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.catalogConfig, marshalCatalogConfigSchema);
    let resp: CatalogConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogConfigSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
