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
  CancelRefreshRequest,
  CancelRefreshResponse,
  CreateMonitorRequest,
  CreateRefreshRequest,
  DeleteMonitorRequest,
  DeleteRefreshRequest,
  GetMonitorRequest,
  GetRefreshRequest,
  ListMonitorRequest,
  ListMonitorResponse,
  ListRefreshRequest,
  ListRefreshResponse,
  Monitor,
  Refresh,
  UpdateMonitorRequest,
  UpdateRefreshRequest,
} from './model';
import {
  marshalCancelRefreshRequestSchema,
  marshalMonitorSchema,
  marshalRefreshSchema,
  unmarshalCancelRefreshResponseSchema,
  unmarshalListMonitorResponseSchema,
  unmarshalListRefreshResponseSchema,
  unmarshalMonitorSchema,
  unmarshalRefreshSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
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
   * Cancels a data quality monitor refresh. Currently only supported for the `table` `object_type`.
   * The call must be made in the same workspace as where the monitor was created.
   *
   * The caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the table's parent catalog.
   * 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and **USE_SCHEMA** on the table's parent schema.
   * 3. **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's parent schema, and **MANAGE** on the table.
   */
  async cancelRefresh(
    signal: AbortSignal | undefined,
    req: CancelRefreshRequest,
    options?: CallOptions
  ): Promise<CancelRefreshResponse> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType ?? ''}/${req.objectId ?? ''}/refreshes/${String(req.refreshId ?? '')}/cancel`;
    const body = marshalRequest(req, marshalCancelRefreshRequestSchema);
    let resp: CancelRefreshResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCancelRefreshResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Create a data quality monitor on a Unity Catalog object. The caller must provide either `anomaly_detection_config` for a schema monitor or `data_profiling_config` for a table monitor.
   *
   * For the `table` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's parent schema, and **SELECT** on the table
   * 2. **USE_CATALOG** on the table's parent catalog, **MANAGE** and **USE_SCHEMA** on the table's parent schema, and **SELECT** on the table.
   * 3. **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's parent schema, and **MANAGE** and **SELECT** on the table.
   *
   * Workspace assets, such as the dashboard, will be created in the workspace where this call was made.
   *
   * For the `schema` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the schema's parent catalog.
   * 2. **USE_CATALOG** on the schema's parent catalog, and **MANAGE** and **USE_SCHEMA** on the schema.
   */
  async createMonitor(
    signal: AbortSignal | undefined,
    req: CreateMonitorRequest,
    options?: CallOptions
  ): Promise<Monitor> {
    const url = `${this.host}/api/data-quality/v1/monitors`;
    const body = marshalRequest(req.monitor, marshalMonitorSchema);
    let resp: Monitor | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMonitorSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a refresh. Currently only supported for the `table` `object_type`.
   * The call must be made in the same workspace as where the monitor was created.
   *
   * The caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the table's parent catalog.
   * 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and **USE_SCHEMA** on the table's parent schema.
   * 3. **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's parent schema, and **MANAGE** on the table.
   */
  async createRefresh(
    signal: AbortSignal | undefined,
    req: CreateRefreshRequest,
    options?: CallOptions
  ): Promise<Refresh> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.refresh?.objectType ?? ''}/${req.refresh?.objectId ?? ''}/refreshes`;
    const body = marshalRequest(req.refresh, marshalRefreshSchema);
    let resp: Refresh | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRefreshSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Delete a data quality monitor on Unity Catalog object.
   *
   * For the `table` `object_type`, the caller must have either of the following sets of permissions:
   * **MANAGE** and **USE_CATALOG** on the table's parent catalog.
   * **USE_CATALOG** on the table's parent catalog, and **MANAGE** and **USE_SCHEMA** on the table's parent schema.
   * **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's parent schema, and **MANAGE** on the table.
   *
   * Note that the metric tables and dashboard will not be deleted as part of this call; those
   * assets must be manually cleaned up (if desired).
   *
   * For the `schema` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the schema's parent catalog.
   * 2. **USE_CATALOG** on the schema's parent catalog, and **MANAGE** and **USE_SCHEMA** on the schema.
   */
  async deleteMonitor(
    signal: AbortSignal | undefined,
    req: DeleteMonitorRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType ?? ''}/${req.objectId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(signal, call, options);
  }

  /** (Unimplemented) Delete a refresh */
  async deleteRefresh(
    signal: AbortSignal | undefined,
    req: DeleteRefreshRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType ?? ''}/${req.objectId ?? ''}/refreshes/${String(req.refreshId ?? '')}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(signal, call, options);
  }

  /**
   * Read a data quality monitor on a Unity Catalog object.
   *
   * For the `table` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the table's parent catalog.
   * 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and **USE_SCHEMA** on the table's parent schema.
   * 3. **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's parent schema, and **SELECT** on the table.
   *
   * For the `schema` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the schema's parent catalog.
   * 2. **USE_CATALOG** on the schema's parent catalog, and **USE_SCHEMA** on the schema.
   *
   * The returned information includes configuration values on the entity and parent entity as well as information on
   * assets created by the monitor. Some information (e.g. dashboard) may be filtered out
   * if the caller is in a different workspace than where the monitor was created.
   */
  async getMonitor(
    signal: AbortSignal | undefined,
    req: GetMonitorRequest,
    options?: CallOptions
  ): Promise<Monitor> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType ?? ''}/${req.objectId ?? ''}`;
    let resp: Monitor | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMonitorSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Get data quality monitor refresh. The call must be made in the same workspace as where the monitor was created.
   *
   * For the `table` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the table's parent catalog.
   * 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and **USE_SCHEMA** on the table's parent schema.
   * 3. **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's parent schema, and **SELECT** on the table.
   *
   * For the `schema` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the schema's parent catalog.
   * 2. **USE_CATALOG** on the schema's parent catalog, and **USE_SCHEMA** on the schema.
   */
  async getRefresh(
    signal: AbortSignal | undefined,
    req: GetRefreshRequest,
    options?: CallOptions
  ): Promise<Refresh> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType ?? ''}/${req.objectId ?? ''}/refreshes/${String(req.refreshId ?? '')}`;
    let resp: Refresh | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRefreshSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** (Unimplemented) List data quality monitors. */
  async listMonitor(
    signal: AbortSignal | undefined,
    req: ListMonitorRequest,
    options?: CallOptions
  ): Promise<ListMonitorResponse> {
    const url = `${this.host}/api/data-quality/v1/monitors`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListMonitorResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListMonitorResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listMonitorIter(
    signal: AbortSignal | undefined,
    req: ListMonitorRequest,
    options?: CallOptions
  ): AsyncGenerator<Monitor> {
    const pageReq: ListMonitorRequest = {...req};
    for (;;) {
      const resp = await this.listMonitor(signal, pageReq, options);
      for (const item of resp.monitors ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * List data quality monitor refreshes. The call must be made in the same workspace as where the monitor was created.
   *
   * For the `table` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the table's parent catalog.
   * 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and **USE_SCHEMA** on the table's parent schema.
   * 3. **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's parent schema, and **SELECT** on the table.
   *
   * For the `schema` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the schema's parent catalog.
   * 2. **USE_CATALOG** on the schema's parent catalog, and **USE_SCHEMA** on the schema.
   */
  async listRefresh(
    signal: AbortSignal | undefined,
    req: ListRefreshRequest,
    options?: CallOptions
  ): Promise<ListRefreshResponse> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType ?? ''}/${req.objectId ?? ''}/refreshes`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListRefreshResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListRefreshResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listRefreshIter(
    signal: AbortSignal | undefined,
    req: ListRefreshRequest,
    options?: CallOptions
  ): AsyncGenerator<Refresh> {
    const pageReq: ListRefreshRequest = {...req};
    for (;;) {
      const resp = await this.listRefresh(signal, pageReq, options);
      for (const item of resp.refreshes ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Update a data quality monitor on Unity Catalog object.
   *
   * For the `table` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the table's parent catalog.
   * 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and **USE_SCHEMA** on the table's parent schema.
   * 3. **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's parent schema, and **MANAGE** on the table.
   *
   * For the `schema` `object_type`, the caller must have either of the following sets of permissions:
   * 1. **MANAGE** and **USE_CATALOG** on the schema's parent catalog.
   * 2. **USE_CATALOG** on the schema's parent catalog, and **MANAGE** and **USE_SCHEMA** on the schema.
   */
  async updateMonitor(
    signal: AbortSignal | undefined,
    req: UpdateMonitorRequest,
    options?: CallOptions
  ): Promise<Monitor> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType ?? ''}/${req.objectId ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.monitor, marshalMonitorSchema);
    let resp: Monitor | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMonitorSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** (Unimplemented) Update a refresh */
  async updateRefresh(
    signal: AbortSignal | undefined,
    req: UpdateRefreshRequest,
    options?: CallOptions
  ): Promise<Refresh> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType ?? ''}/${req.objectId ?? ''}/refreshes/${String(req.refreshId ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.refresh, marshalRefreshSchema);
    let resp: Refresh | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRefreshSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
