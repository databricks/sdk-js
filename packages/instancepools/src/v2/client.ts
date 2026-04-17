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
  CreateInstancePool,
  CreateInstancePool_Response,
  DeleteInstancePool,
  DeleteInstancePool_Response,
  EditInstancePool,
  EditInstancePool_Response,
  GetInstancePool,
  GetInstancePool_Response,
  ListInstancePools,
  ListInstancePools_Response,
} from './model';
import {
  marshalCreateInstancePoolSchema,
  marshalDeleteInstancePoolSchema,
  marshalEditInstancePoolSchema,
  unmarshalCreateInstancePool_ResponseSchema,
  unmarshalDeleteInstancePool_ResponseSchema,
  unmarshalEditInstancePool_ResponseSchema,
  unmarshalGetInstancePool_ResponseSchema,
  unmarshalListInstancePools_ResponseSchema,
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

  /** Creates a new instance pool using idle and ready-to-use cloud instances. */
  async createInstancePool(signal: AbortSignal | undefined, req: CreateInstancePool, options?: Options): Promise<CreateInstancePool_Response> {
    const url = `${this.host}/api/2.0/instance-pools/create`;
    const body = marshalRequest(req, marshalCreateInstancePoolSchema);
    let resp: CreateInstancePool_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCreateInstancePool_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the instance pool permanently. The idle instances in the pool are terminated asynchronously. */
  async deleteInstancePool(signal: AbortSignal | undefined, req: DeleteInstancePool, options?: Options): Promise<DeleteInstancePool_Response> {
    const url = `${this.host}/api/2.0/instance-pools/delete`;
    const body = marshalRequest(req, marshalDeleteInstancePoolSchema);
    let resp: DeleteInstancePool_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDeleteInstancePool_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Modifies the configuration of an existing instance pool. */
  async editInstancePool(signal: AbortSignal | undefined, req: EditInstancePool, options?: Options): Promise<EditInstancePool_Response> {
    const url = `${this.host}/api/2.0/instance-pools/edit`;
    const body = marshalRequest(req, marshalEditInstancePoolSchema);
    let resp: EditInstancePool_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalEditInstancePool_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieve the information for an instance pool based on its identifier. */
  async getInstancePool(signal: AbortSignal | undefined, req: GetInstancePool, options?: Options): Promise<GetInstancePool_Response> {
    const url = `${this.host}/api/2.0/instance-pools/get`;
    const params = new URLSearchParams();
    if (req.instancePoolId !== undefined) {
      params.append('instance_pool_id', req.instancePoolId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetInstancePool_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGetInstancePool_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a list of instance pools with their statistics. */
  async listInstancePools(signal: AbortSignal | undefined, _req: ListInstancePools, options?: Options): Promise<ListInstancePools_Response> {
    const url = `${this.host}/api/2.0/instance-pools/list`;
    let resp: ListInstancePools_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListInstancePools_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
