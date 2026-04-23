// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
import type {
  CancelStatementRequest,
  CancelStatementResponse,
  ExecuteStatementRequest,
  GetResultDataRequest,
  GetStatementResultRequest,
  ResultData,
  StatementResponse,
} from './model';
import {
  marshalCancelStatementRequestSchema,
  marshalExecuteStatementRequestSchema,
  unmarshalCancelStatementResponseSchema,
  unmarshalResultDataSchema,
  unmarshalStatementResponseSchema,
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
   * Requests that an executing statement be canceled. Callers must poll for status to see the
   * terminal state. Cancel response is empty; receiving response indicates successful receipt.
   */
  async cancelStatement(signal: AbortSignal | undefined, req: CancelStatementRequest, options?: Options): Promise<CancelStatementResponse> {
    const url = `${this.host}/api/2.0/sql/statements/${req.statementId ?? ''}/cancel`;
    const body = marshalRequest(req, marshalCancelStatementRequestSchema);
    let resp: CancelStatementResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCancelStatementResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Execute a SQL statement and optionally await its results for a specified time.
   * 
   * **Use case: small result sets with INLINE + JSON_ARRAY**
   * 
   * For flows that generate small and predictable result sets (<= 25 MiB), `INLINE` responses of `JSON_ARRAY` result
   * data are typically the simplest way to execute and fetch result data.
   * 
   * **Use case: large result sets with EXTERNAL_LINKS**
   * 
   * Using `EXTERNAL_LINKS` to fetch result data allows you to fetch large result sets efficiently.
   * The main differences from using `INLINE` disposition are that the result data is accessed
   * with  URLs, and
   * that there are 3 supported formats: `JSON_ARRAY`, `ARROW_STREAM` and `CSV` compared to only `JSON_ARRAY` with
   * `INLINE`.
   * 
   * ** URLs**
   * 
   * External links point to data stored within your workspace's internal storage, in the form of
   * a  URL. The URLs are valid for only a short
   * period, <= 15 minutes. Alongside each `external_link` is an expiration field indicating the time at which the URL
   * is no longer valid. In `EXTERNAL_LINKS` mode, chunks can be resolved and fetched multiple times and in parallel.
   * 
   * ----
   * 
   * ### **Warning: Databricks strongly recommends that you protect the URLs that are returned by the `EXTERNAL_LINKS` disposition.**
   * 
   * When you use the `EXTERNAL_LINKS` disposition, a
   * short-lived,  URL is generated, which can be
   * used to download the results directly
   * from . As a
   * short-lived  is
   * embedded in this  URL, you should protect
   * the URL.
   * 
   * Because  URLs are already generated with
   * embedded temporary s,
   * you must not set an `Authorization` header in the download requests.
   * 
   * The `EXTERNAL_LINKS` disposition can be disabled upon request by creating a support
   * case.
   * 
   * See also [Security best practices](/sql/admin/sql-execution-tutorial.html#security-best-practices).
   * 
   * ----
   * 
   * StatementResponse contains `statement_id` and `status`; other fields might be absent or present depending on
   * context. If the SQL warehouse fails to execute the provided statement, a 200 response is returned with
   * `status.state` set to `FAILED` (in contrast to a failure when accepting the request, which results in a non-200
   * response). Details of the error can be found at `status.error` in case of execution failures.
   */
  async executeStatement(signal: AbortSignal | undefined, req: ExecuteStatementRequest, options?: Options): Promise<StatementResponse> {
    const url = `${this.host}/api/2.0/sql/statements/`;
    const body = marshalRequest(req, marshalExecuteStatementRequestSchema);
    let resp: StatementResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalStatementResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * After the statement execution has `SUCCEEDED`, this request can be used to fetch any chunk by
   * index. Whereas the first chunk with `chunk_index=0` is typically fetched with
   * :method:statementexecution/executeStatement or :method:statementexecution/getStatement, this
   * request can be used to fetch subsequent chunks. The response structure is identical to the
   * nested `result` element described in the :method:statementexecution/getStatement request, and
   * similarly includes the `next_chunk_index` and `next_chunk_internal_link` fields for simple
   * iteration through the result set. Depending on `disposition`, the response returns chunks of
   * data either inline, or as links.
   */
  async getResultData(signal: AbortSignal | undefined, req: GetResultDataRequest, options?: Options): Promise<ResultData> {
    const url = `${this.host}/api/2.0/sql/statements/${req.statementId ?? ''}/result/chunks/${String(req.chunkIndex ?? '')}`;
    let resp: ResultData | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalResultDataSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * This request can be used to poll for the statement's status. StatementResponse contains
   * `statement_id` and `status`; other fields might be absent or present depending on context.
   * When the `status.state` field is `SUCCEEDED` it will also return the result manifest and the
   * first chunk of the result data. When the statement is in the terminal states `CANCELED`,
   * `CLOSED` or `FAILED`, it returns HTTP 200 with the state set. After at least 12 hours in
   * terminal state, the statement is removed from the warehouse and further calls will receive an
   * HTTP 404 response.
   * 
   * **NOTE**
   * This call currently might take up to 5 seconds to get the latest status and result.
   */
  async getStatementResult(signal: AbortSignal | undefined, req: GetStatementResultRequest, options?: Options): Promise<StatementResponse> {
    const url = `${this.host}/api/2.0/sql/statements/${req.statementId ?? ''}`;
    let resp: StatementResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalStatementResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
