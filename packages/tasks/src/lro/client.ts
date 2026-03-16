import type {Call, Option} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';

import {
  buildHttpRequest,
  buildUrl,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './genhelper';
import type {
  BranchOperationMetadata,
  CancelOperationRequest,
  CreateBranchRequest,
  GetOperationRequest,
  Operation,
} from './model';
import {
  branchOperationMetadataSchema,
  marshalCreateBranchRequestSchema,
  operationSchema,
} from './model';

/**
 * Creates a new Postgres client from the given options. At minimum, `host`
 * must be provided.
 */
function newPostgresClient(options: ClientOptions): PostgresClient {
  if (options.host === undefined) {
    throw new Error('Host is required.');
  }

  // Strip trailing slash for consistent URL construction.
  const host = options.host.replace(/\/$/, '');
  const logger = options.logger ?? new NoOpLogger();
  const httpClient = newHttpClient(options);

  return new PostgresClient(host, httpClient, logger);
}

class PostgresClient {
  constructor(
    private readonly host: string,
    private readonly httpClient: HttpClient,
    private readonly logger: Logger
  ) {}

  async createBranch(
    signal: AbortSignal | undefined,
    req: CreateBranchRequest,
    ...opts: Option[]
  ): Promise<Operation> {
    const url = buildUrl(this.host, '/api/2.0/postgres/branches');
    const body = marshalRequest(req, marshalCreateBranchRequestSchema);
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
    await execute(signal, call, ...opts);
    if (resp === undefined) {
      throw new Error('response not set after successful execution');
    }
    return resp;
  }

  async createBranchOperation(
    signal: AbortSignal | undefined,
    req: CreateBranchRequest,
    ...opts: Option[]
  ): Promise<CreateBranchOperation> {
    const op = await this.createBranch(signal, req, ...opts);
    return new CreateBranchOperation(op);
  }

  async getOperation(
    signal: AbortSignal | undefined,
    req: GetOperationRequest,
    ...opts: Option[]
  ): Promise<Operation> {
    const url = buildUrl(
      this.host,
      `/api/2.0/postgres/operations/${encodeURIComponent(req.name)}`
    );
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
    await execute(signal, call, ...opts);
    if (resp === undefined) {
      throw new Error('response not set after successful execution');
    }
    return resp;
  }

  async cancelOperation(
    signal: AbortSignal | undefined,
    req: CancelOperationRequest,
    ...opts: Option[]
  ): Promise<void> {
    const url = buildUrl(
      this.host,
      `/api/2.0/postgres/operations/${encodeURIComponent(req.name)}:cancel`
    );
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, ...opts);
  }
}

class CreateBranchOperation {
  constructor(
    // private readonly client: PostgresClient, // not used, will uncomment once other methods are added.
    private operation: Operation
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string> {
    return Promise.resolve(this.operation.name);
  }

  /**
   * Returns metadata associated with the long-running operation, or
   * undefined if metadata is not present.
   */
  metadata(): Promise<BranchOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      branchOperationMetadataSchema.parse(this.operation.metadata)
    );
  }
}

export {CreateBranchOperation, PostgresClient, newPostgresClient};
