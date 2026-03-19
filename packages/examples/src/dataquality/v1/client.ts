import type {Call, Options} from '@databricks/sdk-databricks/api';
import {retryOn} from '@databricks/sdk-databricks/api';
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
} from './genhelper';
import type {
  CancelOperationRequest,
  CancelRefreshRequest,
  CancelRefreshResponse,
  CreateDataQualityRequest,
  CreateMonitorRequest,
  CreateRefreshRequest,
  DeleteMonitorRequest,
  DeleteRefreshRequest,
  GetMonitorRequest,
  GetOperationRequest,
  GetRefreshRequest,
  ListMonitorRequest,
  ListMonitorResponse,
  ListRefreshRequest,
  ListRefreshResponse,
  Monitor,
  Operation,
  Refresh,
  UpdateMonitorRequest,
  UpdateRefreshRequest,
} from './model';
import {
  cancelRefreshResponseSchema,
  listMonitorResponseSchema,
  listRefreshResponseSchema,
  marshalCancelRefreshRequestSchema,
  marshalCreateDataQualityRequestSchema,
  marshalMonitorSchema,
  marshalRefreshSchema,
  monitorSchema,
  operationSchema,
  refreshSchema,
} from './model';

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;

  /**
   * Creates a new data quality monitoring client from the given options.
   * At minimum, `credentials` must be provided (or a pre-configured
   * `httpClient`).
   */
  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }

    // Strip trailing slash for consistent URL construction.
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Cancels a data quality monitor refresh. Currently only supported for the
   * `table` `object_type`. The call must be made in the same workspace as where
   * the monitor was created.
   *
   * The caller must have either of the following sets of permissions: 1.
   * **MANAGE** and **USE_CATALOG** on the table's parent catalog. 2.
   * **USE_CATALOG** on the table's parent catalog, and **MANAGE** and
   * **USE_SCHEMA** on the table's parent schema. 3. **USE_CATALOG** on the
   * table's parent catalog, **USE_SCHEMA** on the table's parent schema, and
   * **MANAGE** on the table.
   */
  async cancelRefresh(
    signal: AbortSignal | undefined,
    req: CancelRefreshRequest,
    options?: Options
  ): Promise<CancelRefreshResponse> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType}/${req.objectId}/refreshes/${String(req.refreshId)}/cancel`;
    const body = marshalRequest(req, marshalCancelRefreshRequestSchema);

    let resp: CancelRefreshResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, cancelRefreshResponseSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Create a data quality monitor on a Unity Catalog object. The caller must
   * provide either `anomaly_detection_config` for a schema monitor or
   * `data_profiling_config` for a table monitor.
   *
   * For the `table` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the table's parent
   * catalog, **USE_SCHEMA** on the table's parent schema, and **SELECT** on the
   * table 2. **USE_CATALOG** on the table's parent catalog, **MANAGE** and
   * **USE_SCHEMA** on the table's parent schema, and **SELECT** on the table. 3.
   * **USE_CATALOG** on the table's parent catalog, **USE_SCHEMA** on the table's
   * parent schema, and **MANAGE** and **SELECT** on the table.
   *
   * Workspace assets, such as the dashboard, will be created in the workspace
   * where this call was made.
   *
   * For the `schema` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the schema's parent
   * catalog. 2. **USE_CATALOG** on the schema's parent catalog, and **MANAGE**
   * and **USE_SCHEMA** on the schema.
   */
  async createMonitor(
    signal: AbortSignal | undefined,
    req: CreateMonitorRequest,
    options?: Options
  ): Promise<Monitor> {
    const url = `${this.host}/api/data-quality/v1/monitors`;
    const body = marshalRequest(req.monitor, marshalMonitorSchema);

    let resp: Monitor | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, monitorSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a refresh. Currently only supported for the `table` `object_type`.
   * The call must be made in the same workspace as where the monitor was created.
   *
   * The caller must have either of the following sets of permissions: 1.
   * **MANAGE** and **USE_CATALOG** on the table's parent catalog. 2.
   * **USE_CATALOG** on the table's parent catalog, and **MANAGE** and
   * **USE_SCHEMA** on the table's parent schema. 3. **USE_CATALOG** on the
   * table's parent catalog, **USE_SCHEMA** on the table's parent schema, and
   * **MANAGE** on the table.
   */
  async createRefresh(
    signal: AbortSignal | undefined,
    req: CreateRefreshRequest,
    options?: Options
  ): Promise<Refresh> {
    const refresh = req.refresh;
    const url = `${this.host}/api/data-quality/v1/monitors/${refresh?.objectType ?? ''}/${refresh?.objectId ?? ''}/refreshes`;
    const body = marshalRequest(refresh, marshalRefreshSchema);

    let resp: Refresh | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, refreshSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Delete a data quality monitor on Unity Catalog object.
   *
   * For the `table` `object_type`, the caller must have either of the following
   * sets of permissions: **MANAGE** and **USE_CATALOG** on the table's parent
   * catalog. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and
   * **USE_SCHEMA** on the table's parent schema. **USE_CATALOG** on the table's
   * parent catalog, **USE_SCHEMA** on the table's parent schema, and **MANAGE**
   * on the table.
   *
   * Note that the metric tables and dashboard will not be deleted as part of this
   * call; those assets must be manually cleaned up (if desired).
   *
   * For the `schema` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the schema's parent
   * catalog. 2. **USE_CATALOG** on the schema's parent catalog, and **MANAGE**
   * and **USE_SCHEMA** on the schema.
   */
  async deleteMonitor(
    signal: AbortSignal | undefined,
    req: DeleteMonitorRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType}/${req.objectId}`;

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

  /** (Unimplemented) Delete a refresh */
  async deleteRefresh(
    signal: AbortSignal | undefined,
    req: DeleteRefreshRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType}/${req.objectId}/refreshes/${String(req.refreshId)}`;

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

  /**
   * Read a data quality monitor on a Unity Catalog object.
   *
   * For the `table` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the table's parent
   * catalog. 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and
   * **USE_SCHEMA** on the table's parent schema. 3. **USE_CATALOG** on the
   * table's parent catalog, **USE_SCHEMA** on the table's parent schema, and
   * **SELECT** on the table.
   *
   * For the `schema` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the schema's parent
   * catalog. 2. **USE_CATALOG** on the schema's parent catalog, and
   * **USE_SCHEMA** on the schema.
   *
   * The returned information includes configuration values on the entity and
   * parent entity as well as information on assets created by the monitor. Some
   * information (e.g. dashboard) may be filtered out if the caller is in a
   * different workspace than where the monitor was created.
   */
  async getMonitor(
    signal: AbortSignal | undefined,
    req: GetMonitorRequest,
    options?: Options
  ): Promise<Monitor> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType}/${req.objectId}`;

    let resp: Monitor | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, monitorSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Get data quality monitor refresh. The call must be made in the same workspace
   * as where the monitor was created.
   *
   * For the `table` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the table's parent
   * catalog. 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and
   * **USE_SCHEMA** on the table's parent schema. 3. **USE_CATALOG** on the
   * table's parent catalog, **USE_SCHEMA** on the table's parent schema, and
   * **SELECT** on the table.
   *
   * For the `schema` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the schema's parent
   * catalog. 2. **USE_CATALOG** on the schema's parent catalog, and
   * **USE_SCHEMA** on the schema.
   */
  async getRefresh(
    signal: AbortSignal | undefined,
    req: GetRefreshRequest,
    options?: Options
  ): Promise<Refresh> {
    const url = `${this.host}/api/data-quality/v1/monitors/${req.objectType}/${req.objectId}/refreshes/${String(req.refreshId)}`;

    let resp: Refresh | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, refreshSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** (Unimplemented) List data quality monitors. */
  async listMonitor(
    signal: AbortSignal | undefined,
    req: ListMonitorRequest,
    options?: Options
  ): Promise<ListMonitorResponse> {
    const baseUrl = `${this.host}/api/data-quality/v1/monitors`;
    const queryParams = new URLSearchParams();
    if (req.pageToken !== undefined) {
      queryParams.set('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      queryParams.set('page_size', String(req.pageSize));
    }
    const query = queryParams.toString();
    const url = query !== '' ? `${baseUrl}?${query}` : baseUrl;

    let resp: ListMonitorResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, listMonitorResponseSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listMonitorIter(
    signal: AbortSignal | undefined,
    req: ListMonitorRequest,
    options?: Options
  ): AsyncGenerator<Monitor> {
    // Shallow copy to avoid mutating the caller's request.
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
   * List data quality monitor refreshes. The call must be made in the same
   * workspace as where the monitor was created.
   *
   * For the `table` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the table's parent
   * catalog. 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and
   * **USE_SCHEMA** on the table's parent schema. 3. **USE_CATALOG** on the
   * table's parent catalog, **USE_SCHEMA** on the table's parent schema, and
   * **SELECT** on the table.
   *
   * For the `schema` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the schema's parent
   * catalog. 2. **USE_CATALOG** on the schema's parent catalog, and
   * **USE_SCHEMA** on the schema.
   */
  async listRefresh(
    signal: AbortSignal | undefined,
    req: ListRefreshRequest,
    options?: Options
  ): Promise<ListRefreshResponse> {
    const baseUrl = `${this.host}/api/data-quality/v1/monitors/${req.objectType}/${req.objectId}/refreshes`;
    const queryParams = new URLSearchParams();
    if (req.pageToken !== undefined) {
      queryParams.set('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      queryParams.set('page_size', String(req.pageSize));
    }
    const query = queryParams.toString();
    const url = query !== '' ? `${baseUrl}?${query}` : baseUrl;

    let resp: ListRefreshResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, listRefreshResponseSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listRefreshIter(
    signal: AbortSignal | undefined,
    req: ListRefreshRequest,
    options?: Options
  ): AsyncGenerator<Refresh> {
    // Shallow copy to avoid mutating the caller's request.
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
   * For the `table` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the table's parent
   * catalog. 2. **USE_CATALOG** on the table's parent catalog, and **MANAGE** and
   * **USE_SCHEMA** on the table's parent schema. 3. **USE_CATALOG** on the
   * table's parent catalog, **USE_SCHEMA** on the table's parent schema, and
   * **MANAGE** on the table.
   *
   * For the `schema` `object_type`, the caller must have either of the following
   * sets of permissions: 1. **MANAGE** and **USE_CATALOG** on the schema's parent
   * catalog. 2. **USE_CATALOG** on the schema's parent catalog, and **MANAGE**
   * and **USE_SCHEMA** on the schema.
   */
  async updateMonitor(
    signal: AbortSignal | undefined,
    req: UpdateMonitorRequest,
    options?: Options
  ): Promise<Monitor> {
    const baseUrl = `${this.host}/api/data-quality/v1/monitors/${req.objectType}/${req.objectId}`;
    const queryParams = new URLSearchParams();
    if (req.updateMask !== undefined) {
      queryParams.set('update_mask', req.updateMask);
    }
    const query = queryParams.toString();
    const url = query !== '' ? `${baseUrl}?${query}` : baseUrl;
    const body = marshalRequest(req.monitor, marshalMonitorSchema);

    let resp: Monitor | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, monitorSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** (Unimplemented) Update a refresh */
  async updateRefresh(
    signal: AbortSignal | undefined,
    req: UpdateRefreshRequest,
    options?: Options
  ): Promise<Refresh> {
    const baseUrl = `${this.host}/api/data-quality/v1/monitors/${req.objectType}/${req.objectId}/refreshes/${String(req.refreshId)}`;
    const queryParams = new URLSearchParams();
    if (req.updateMask !== undefined) {
      queryParams.set('update_mask', req.updateMask);
    }
    const query = queryParams.toString();
    const url = query !== '' ? `${baseUrl}?${query}` : baseUrl;
    const body = marshalRequest(req.refresh, marshalRefreshSchema);

    let resp: Refresh | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, refreshSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  // -------------------------------------------------------------------------
  // LRO methods.
  // -------------------------------------------------------------------------

  /**
   * Creates a data quality pipeline. This is a long-running operation that
   * returns an Operation object.
   */
  async createDataQuality(
    signal: AbortSignal | undefined,
    req: CreateDataQualityRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/data-quality/v1/dataquality`;
    const body = marshalRequest(req, marshalCreateDataQualityRequestSchema);

    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, operationSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a data quality pipeline and returns an operation handle that
   * can be used to poll for completion or cancel the operation.
   */
  async createDataQualityOperation(
    signal: AbortSignal | undefined,
    req: CreateDataQualityRequest,
    options?: Options
  ): Promise<CreateDataQualityOperation> {
    const op = await this.createDataQuality(signal, req, options);
    return new CreateDataQualityOperation(this, op);
  }

  /** Fetches the current state of a long-running operation by name. */
  async getOperation(
    signal: AbortSignal | undefined,
    req: GetOperationRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/data-quality/v1/operations/${encodeURIComponent(req.name)}`;

    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, operationSchema);
    };

    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Starts asynchronous cancellation on a long-running operation. */
  async cancelOperation(
    signal: AbortSignal | undefined,
    req: CancelOperationRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/data-quality/v1/operations/${encodeURIComponent(req.name)}:cancel`;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };

    await execute(signal, call, options);
  }
}

/**
 * Handle for a long-running createMonitor operation. Provides methods to
 * poll for completion, inspect metadata, or cancel the operation.
 */
export class CreateDataQualityOperation {
  private operation: Operation;

  constructor(
    private readonly client: Client,
    operation: Operation
  ) {
    this.operation = operation;
  }

  /** Returns the server-assigned name of the long-running operation. */
  name(): string {
    return this.operation.name;
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<Monitor> {
    const errStillRunning = new Error('operation still in progress');
    let result: Monitor | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        callSignal,
        {
          name: this.operation.name,
        },
        options
      );
      this.operation = op;

      if (!op.done) {
        throw errStillRunning;
      }

      if (op.error !== undefined) {
        const msg =
          op.error.message !== undefined && op.error.message !== ''
            ? op.error.message
            : 'unknown error';
        const errorMsg =
          op.error.errorCode !== undefined
            ? `[${op.error.errorCode}] ${msg}`
            : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: op.error,
        });
      }

      if (op.response === undefined) {
        throw new Error('operation completed without a response');
      }

      result = monitorSchema.parse(op.response);
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const op = await this.client.getOperation(
      signal,
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }

  /** Starts asynchronous cancellation on the long-running operation. */
  async cancel(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<void> {
    await this.client.cancelOperation(
      signal,
      {name: this.operation.name},
      options
    );
  }
}
