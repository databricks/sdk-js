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
  CancelRefreshRequest,
  CancelRefreshRequest_Response,
  CreateMonitorRequest,
  DataMonitorInfo,
  DeleteMonitorRequest,
  DeleteMonitorRequest_Response,
  GetMonitorRequest,
  GetRefreshRequest,
  ListRefreshesRequest,
  ListRefreshesRequest_Response,
  RefreshInfo,
  RegenerateDashboardRequest,
  RegenerateDashboardRequest_Response,
  RunRefreshRequest,
  UpdateMonitorRequest,
} from './model';
import {
  marshalCancelRefreshRequestSchema,
  marshalCreateMonitorRequestSchema,
  marshalRegenerateDashboardRequestSchema,
  marshalRunRefreshRequestSchema,
  marshalUpdateMonitorRequestSchema,
  unmarshalCancelRefreshRequest_ResponseSchema,
  unmarshalDataMonitorInfoSchema,
  unmarshalDeleteMonitorRequest_ResponseSchema,
  unmarshalListRefreshesRequest_ResponseSchema,
  unmarshalRefreshInfoSchema,
  unmarshalRegenerateDashboardRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
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
        .with({key: 'sdk-js-auth', value: AUTH_VERSION})
        .with({key: 'auth', value: options.credentials.name()});
    }
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors).
   * Cancels an already-initiated refresh job.
   */
  async cancelRefresh(
    req: CancelRefreshRequest,
    options?: CallOptions
  ): Promise<CancelRefreshRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullTableNameArg ?? ''}/monitor/refreshes/${String(req.refreshId ?? '')}/cancel`;
    const body = marshalRequest(req, marshalCancelRefreshRequestSchema);
    let resp: CancelRefreshRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalCancelRefreshRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors).
   * Creates a new monitor for the specified table.
   *
   * The caller must either:
   * 1. be an owner of the table's parent catalog, have **USE_SCHEMA** on the table's parent schema, and have **SELECT** access on the table
   * 2. have **USE_CATALOG** on the table's parent catalog, be an owner of the table's parent schema, and have **SELECT** access on the table.
   * 3. have the following permissions:
   * - **USE_CATALOG** on the table's parent catalog
   * - **USE_SCHEMA** on the table's parent schema
   * - be an owner of the table.
   *
   * Workspace assets, such as the dashboard, will be created in the workspace where
   * this call was made.
   */
  async createMonitor(
    req: CreateMonitorRequest,
    options?: CallOptions
  ): Promise<DataMonitorInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullTableNameArg ?? ''}/monitor`;
    const body = marshalRequest(req, marshalCreateMonitorRequestSchema);
    let resp: DataMonitorInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalDataMonitorInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors).
   * Deletes a monitor for the specified table.
   *
   * The caller must either:
   * 1. be an owner of the table's parent catalog
   * 2. have **USE_CATALOG** on the table's parent catalog and be an owner of the table's parent schema
   * 3. have the following permissions:
   * - **USE_CATALOG** on the table's parent catalog
   * - **USE_SCHEMA** on the table's parent schema
   * - be an owner of the table.
   *
   * Additionally, the call must be made from the workspace where the monitor was created.
   *
   * Note that the metric tables and dashboard will not be deleted as part of this call; those
   * assets must be manually cleaned up (if desired).
   */
  async deleteMonitor(
    req: DeleteMonitorRequest,
    options?: CallOptions
  ): Promise<DeleteMonitorRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullTableNameArg ?? ''}/monitor`;
    let resp: DeleteMonitorRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteMonitorRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors).
   * Gets a monitor for the specified table.
   *
   * The caller must either:
   * 1. be an owner of the table's parent catalog
   * 2. have **USE_CATALOG** on the table's parent catalog and be an owner of the table's parent schema.
   * 3. have the following permissions:
   * - **USE_CATALOG** on the table's parent catalog
   * - **USE_SCHEMA** on the table's parent schema
   * - **SELECT** privilege on the table.
   *
   * The returned information includes configuration values, as well as information on
   * assets created by the monitor. Some information (e.g., dashboard) may be filtered out
   * if the caller is in a different workspace than where the monitor was created.
   */
  async getMonitor(
    req: GetMonitorRequest,
    options?: CallOptions
  ): Promise<DataMonitorInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullTableNameArg ?? ''}/monitor`;
    let resp: DataMonitorInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDataMonitorInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors).
   * Gets info about a specific monitor refresh using the given refresh ID.
   *
   * The caller must either:
   * 1. be an owner of the table's parent catalog
   * 2. have **USE_CATALOG** on the table's parent catalog and be an owner of the table's parent schema
   * 3. have the following permissions:
   * - **USE_CATALOG** on the table's parent catalog
   * - **USE_SCHEMA** on the table's parent schema
   * - **SELECT** privilege on the table.
   *
   * Additionally, the call must be made from the workspace where the monitor was created.
   */
  async getRefresh(
    req: GetRefreshRequest,
    options?: CallOptions
  ): Promise<RefreshInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullTableNameArg ?? ''}/monitor/refreshes/${String(req.refreshId ?? '')}`;
    let resp: RefreshInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRefreshInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors).
   * Gets an array containing the history of the most recent refreshes (up to 25) for this table.
   *
   * The caller must either:
   * 1. be an owner of the table's parent catalog
   * 2. have **USE_CATALOG** on the table's parent catalog and be an owner of the table's parent schema
   * 3. have the following permissions:
   * - **USE_CATALOG** on the table's parent catalog
   * - **USE_SCHEMA** on the table's parent schema
   * - **SELECT** privilege on the table.
   *
   * Additionally, the call must be made from the workspace where the monitor was created.
   */
  async listRefreshes(
    req: ListRefreshesRequest,
    options?: CallOptions
  ): Promise<ListRefreshesRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullTableNameArg ?? ''}/monitor/refreshes`;
    let resp: ListRefreshesRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListRefreshesRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors).
   * Regenerates the monitoring dashboard for the specified table.
   *
   * The caller must either:
   * 1. be an owner of the table's parent catalog
   * 2. have **USE_CATALOG** on the table's parent catalog and be an owner of the table's parent schema
   * 3. have the following permissions:
   * - **USE_CATALOG** on the table's parent catalog
   * - **USE_SCHEMA** on the table's parent schema
   * - be an owner of the table
   *
   * The call must be made from the workspace where the monitor was created. The dashboard will be regenerated in
   * the assets directory that was specified when the monitor was created.
   */
  async regenerateDashboard(
    req: RegenerateDashboardRequest,
    options?: CallOptions
  ): Promise<RegenerateDashboardRequest_Response> {
    const url = `${this.host}/api/2.1/quality-monitoring/tables/${req.fullTableNameArg ?? ''}/monitor/dashboard`;
    const body = marshalRequest(req, marshalRegenerateDashboardRequestSchema);
    let resp: RegenerateDashboardRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalRegenerateDashboardRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors).
   * Queues a metric refresh on the monitor for the specified table.
   * The refresh will execute in the background.
   *
   * The caller must either:
   * 1. be an owner of the table's parent catalog
   * 2. have **USE_CATALOG** on the table's parent catalog and be an owner of the table's parent schema
   * 3. have the following permissions:
   * - **USE_CATALOG** on the table's parent catalog
   * - **USE_SCHEMA** on the table's parent schema
   * - be an owner of the table
   *
   * Additionally, the call must be made from the workspace where the monitor was created.
   */
  async runRefresh(
    req: RunRefreshRequest,
    options?: CallOptions
  ): Promise<RefreshInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullTableNameArg ?? ''}/monitor/refreshes`;
    const body = marshalRequest(req, marshalRunRefreshRequestSchema);
    let resp: RefreshInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalRefreshInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deprecated: Use Data Quality Monitors API instead (/api/data-quality/v1/monitors).
   * Updates a monitor for the specified table.
   *
   * The caller must either:
   * 1. be an owner of the table's parent catalog
   * 2. have **USE_CATALOG** on the table's parent catalog and be an owner of the table's parent schema
   * 3. have the following permissions:
   * - **USE_CATALOG** on the table's parent catalog
   * - **USE_SCHEMA** on the table's parent schema
   * - be an owner of the table.
   *
   * Additionally, the call must be made from the workspace where the monitor was created, and the caller must be
   * the original creator of the monitor.
   *
   * Certain configuration fields, such as output asset identifiers, cannot be updated.
   */
  async updateMonitor(
    req: UpdateMonitorRequest,
    options?: CallOptions
  ): Promise<DataMonitorInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullTableNameArg ?? ''}/monitor`;
    const body = marshalRequest(req, marshalUpdateMonitorRequestSchema);
    let resp: DataMonitorInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDataMonitorInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
