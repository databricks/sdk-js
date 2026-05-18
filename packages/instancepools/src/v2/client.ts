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

  /** Creates a new instance pool using idle and ready-to-use cloud instances. */
  async createInstancePool(
    req: CreateInstancePool,
    options?: CallOptions
  ): Promise<CreateInstancePool_Response> {
    const url = `${this.host}/api/2.0/instance-pools/create`;
    const body = marshalRequest(req, marshalCreateInstancePoolSchema);
    let resp: CreateInstancePool_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateInstancePool_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the instance pool permanently. The idle instances in the pool are terminated asynchronously. */
  async deleteInstancePool(
    req: DeleteInstancePool,
    options?: CallOptions
  ): Promise<DeleteInstancePool_Response> {
    const url = `${this.host}/api/2.0/instance-pools/delete`;
    const body = marshalRequest(req, marshalDeleteInstancePoolSchema);
    let resp: DeleteInstancePool_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteInstancePool_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Modifies the configuration of an existing instance pool. */
  async editInstancePool(
    req: EditInstancePool,
    options?: CallOptions
  ): Promise<EditInstancePool_Response> {
    const url = `${this.host}/api/2.0/instance-pools/edit`;
    const body = marshalRequest(req, marshalEditInstancePoolSchema);
    let resp: EditInstancePool_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEditInstancePool_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieve the information for an instance pool based on its identifier. */
  async getInstancePool(
    req: GetInstancePool,
    options?: CallOptions
  ): Promise<GetInstancePool_Response> {
    const url = `${this.host}/api/2.0/instance-pools/get`;
    const params = new URLSearchParams();
    if (req.instancePoolId !== undefined) {
      params.append('instance_pool_id', req.instancePoolId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetInstancePool_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetInstancePool_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a list of instance pools with their statistics. */
  async listInstancePools(
    _req: ListInstancePools,
    options?: CallOptions
  ): Promise<ListInstancePools_Response> {
    const url = `${this.host}/api/2.0/instance-pools/list`;
    let resp: ListInstancePools_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListInstancePools_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
