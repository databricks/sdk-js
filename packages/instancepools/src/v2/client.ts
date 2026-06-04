// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import {DEFAULT_DEBUG_TRUNCATE_BYTES} from '@databricks/sdk-core/logger/debug';
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
  CreateInstancePoolRequest,
  CreateInstancePoolResponse,
  DeleteInstancePoolRequest,
  DeleteInstancePoolResponse,
  EditInstancePoolRequest,
  EditInstancePoolResponse,
  GetInstancePoolRequest,
  GetInstancePoolResponse,
  ListInstancePoolsRequest,
  ListInstancePoolsResponse,
} from './model';
import {
  marshalCreateInstancePoolRequestSchema,
  marshalDeleteInstancePoolRequestSchema,
  marshalEditInstancePoolRequestSchema,
  unmarshalCreateInstancePoolResponseSchema,
  unmarshalDeleteInstancePoolResponseSchema,
  unmarshalEditInstancePoolResponseSchema,
  unmarshalGetInstancePoolResponseSchema,
  unmarshalListInstancePoolsResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class InstancePoolsClient {
  private readonly host: string;
  // Workspace ID used to route workspace-level calls on unified hosts (SPOG).
  // When set, workspace-level methods send X-Databricks-Org-Id on every
  // request.
  private readonly workspaceId: string | undefined;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;
  // Resolved debug-logging toggles passed into each HTTP call.
  private readonly debugHeaders: boolean;
  private readonly debugTruncateBytes: number;
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
    this.debugHeaders = options.debugHeaders ?? false;
    this.debugTruncateBytes =
      options.debugTruncateBytes ?? DEFAULT_DEBUG_TRUNCATE_BYTES;
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Creates a new instance pool using idle and ready-to-use cloud instances. */
  async createInstancePool(
    req: CreateInstancePoolRequest,
    options?: CallOptions
  ): Promise<CreateInstancePoolResponse> {
    const url = `${this.host}/api/2.0/instance-pools/create`;
    const body = marshalRequest(req, marshalCreateInstancePoolRequestSchema);
    let resp: CreateInstancePoolResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalCreateInstancePoolResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes the instance pool permanently. The idle instances in the pool are terminated asynchronously. */
  async deleteInstancePool(
    req: DeleteInstancePoolRequest,
    options?: CallOptions
  ): Promise<DeleteInstancePoolResponse> {
    const url = `${this.host}/api/2.0/instance-pools/delete`;
    const body = marshalRequest(req, marshalDeleteInstancePoolRequestSchema);
    let resp: DeleteInstancePoolResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalDeleteInstancePoolResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Modifies the configuration of an existing instance pool. */
  async editInstancePool(
    req: EditInstancePoolRequest,
    options?: CallOptions
  ): Promise<EditInstancePoolResponse> {
    const url = `${this.host}/api/2.0/instance-pools/edit`;
    const body = marshalRequest(req, marshalEditInstancePoolRequestSchema);
    let resp: EditInstancePoolResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalEditInstancePoolResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieve the information for an instance pool based on its identifier. */
  async getInstancePool(
    req: GetInstancePoolRequest,
    options?: CallOptions
  ): Promise<GetInstancePoolResponse> {
    const url = `${this.host}/api/2.0/instance-pools/get`;
    const params = new URLSearchParams();
    if (req.instancePoolId !== undefined) {
      params.append('instance_pool_id', req.instancePoolId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetInstancePoolResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalGetInstancePoolResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a list of instance pools with their statistics. */
  async listInstancePools(
    _req: ListInstancePoolsRequest,
    options?: CallOptions
  ): Promise<ListInstancePoolsResponse> {
    const url = `${this.host}/api/2.0/instance-pools/list`;
    let resp: ListInstancePoolsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalListInstancePoolsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
