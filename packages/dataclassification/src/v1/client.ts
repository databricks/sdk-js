// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CatalogConfig,
  CreateCatalogConfigRequest,
  DeleteCatalogConfigRequest,
  GetCatalogConfigRequest,
  RescanCatalogRequest,
  RescanCatalogResponse,
  UpdateCatalogConfigRequest,
} from './model';
import {
  marshalCatalogConfigSchema,
  marshalRescanCatalogRequestSchema,
  unmarshalCatalogConfigSchema,
  unmarshalRescanCatalogResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class DataClassificationClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
    return this.config;
  }

  /**
   * Create Data Classification configuration for a catalog.
   *
   * Creates a new config resource, which enables Data Classification
   * for the specified catalog. The catalog must not already have a config. Creating the config
   * starts a scan of the selected schemas and schedules recurring scans.
   */
  async createCatalogConfig(
    req: CreateCatalogConfigRequest,
    options?: CallOptions
  ): Promise<CatalogConfig> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/data-classification/v1/${req.parent ?? ''}/config`;
    const body = marshalRequest(req.catalogConfig, marshalCatalogConfigSchema);
    let resp: CatalogConfig | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Delete Data Classification configuration for a catalog.
   *
   * Deleting the config disables Data Classification for the catalog and stops its scheduled
   * scans. Tags that auto-tagging already applied to columns are not removed. Deleting a config
   * that does not exist succeeds.
   */
  async deleteCatalogConfig(
    req: DeleteCatalogConfigRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/data-classification/v1/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Get the Data Classification configuration for a catalog. */
  async getCatalogConfig(
    req: GetCatalogConfigRequest,
    options?: CallOptions
  ): Promise<CatalogConfig> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/data-classification/v1/${req.name ?? ''}`;
    let resp: CatalogConfig | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Rescan the tables in a catalog's Data Classification scope that changed since their last scan.
   *
   * The rescan uses the catalog's current classifiers and follows its config (schema selection)
   * and SKIP tags. Tables with no commits since their last scan are skipped. Views and tables
   * without a Delta commit history keep their regular rescan schedule. The call returns once the
   * rescan is scheduled; scanning runs in the background. If a scan of the catalog is running, the
   * call cancels it and starts a new run.
   * - Data Classification must be enabled for the catalog.
   * - The call must come from the workspace where Data Classification was enabled.
   */
  async rescanCatalog(
    req: RescanCatalogRequest,
    options?: CallOptions
  ): Promise<RescanCatalogResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/data-classification/v1/${req.name ?? ''}/rescan`;
    const body = marshalRequest(req, marshalRescanCatalogRequestSchema);
    let resp: RescanCatalogResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRescanCatalogResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Update the Data Classification configuration for a catalog.
   *
   * The config must already exist for the catalog. Only the fields named in `update_mask`
   * change; the other fields keep their current values.
   */
  async updateCatalogConfig(
    req: UpdateCatalogConfigRequest,
    options?: CallOptions
  ): Promise<CatalogConfig> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/data-classification/v1/${req.catalogConfig?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.catalogConfig, marshalCatalogConfigSchema);
    let resp: CatalogConfig | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
