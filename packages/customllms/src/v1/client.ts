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
  CancelCustomLlmOptimizationRunRequest,
  CreateCustomLlmRequest,
  CustomLlm,
  DeleteCustomLlmRequest,
  GetCustomLlmRequest,
  StartCustomLlmOptimizationRunRequest,
  UpdateCustomLlmRequest,
} from './model';
import {
  marshalCancelCustomLlmOptimizationRunRequestSchema,
  marshalCreateCustomLlmRequestSchema,
  marshalStartCustomLlmOptimizationRunRequestSchema,
  marshalUpdateCustomLlmRequestSchema,
  unmarshalCustomLlmSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class CustomllmsClient {
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
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Cancel a Custom LLM Optimization Run. */
  async cancelCustomLlmOptimizationRun(
    req: CancelCustomLlmOptimizationRunRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/custom-llms/${req.id ?? ''}/optimize/cancel`;
    const body = marshalRequest(
      req,
      marshalCancelCustomLlmOptimizationRunRequestSchema
    );
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Create a Custom LLM. */
  async createCustomLlm(
    req: CreateCustomLlmRequest,
    options?: CallOptions
  ): Promise<CustomLlm> {
    const url = `${this.host}/api/2.0/custom-llms`;
    const body = marshalRequest(req, marshalCreateCustomLlmRequestSchema);
    let resp: CustomLlm | undefined;
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
      resp = parseResponse(respBody, unmarshalCustomLlmSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a Custom LLM. */
  async deleteCustomLlm(
    req: DeleteCustomLlmRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/custom-llms/${req.id ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Get a Custom LLM. */
  async getCustomLlm(
    req: GetCustomLlmRequest,
    options?: CallOptions
  ): Promise<CustomLlm> {
    const url = `${this.host}/api/2.0/custom-llms/${req.id ?? ''}`;
    let resp: CustomLlm | undefined;
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
      resp = parseResponse(respBody, unmarshalCustomLlmSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Start a Custom LLM Optimization Run. */
  async startCustomLlmOptimizationRun(
    req: StartCustomLlmOptimizationRunRequest,
    options?: CallOptions
  ): Promise<CustomLlm> {
    const url = `${this.host}/api/2.0/custom-llms/${req.id ?? ''}/optimize`;
    const body = marshalRequest(
      req,
      marshalStartCustomLlmOptimizationRunRequestSchema
    );
    let resp: CustomLlm | undefined;
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
      resp = parseResponse(respBody, unmarshalCustomLlmSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a Custom LLM. */
  async updateCustomLlm(
    req: UpdateCustomLlmRequest,
    options?: CallOptions
  ): Promise<CustomLlm> {
    const url = `${this.host}/api/2.0/custom-llms/${req.id ?? ''}`;
    const body = marshalRequest(req, marshalUpdateCustomLlmRequestSchema);
    let resp: CustomLlm | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomLlmSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
