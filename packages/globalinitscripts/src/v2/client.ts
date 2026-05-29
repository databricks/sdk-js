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
  CreateGlobalInitScriptRequest,
  CreateGlobalInitScriptRequest_Response,
  DeleteGlobalInitScriptRequest,
  DeleteGlobalInitScriptRequest_Response,
  GetGlobalInitScriptRequest,
  GlobalInitScriptDetails,
  ListGlobalInitScriptsRequest,
  ListGlobalInitScriptsRequest_Response,
  UpdateGlobalInitScriptRequest,
  UpdateGlobalInitScriptRequest_Response,
} from './model';
import {
  marshalCreateGlobalInitScriptRequestSchema,
  marshalUpdateGlobalInitScriptRequestSchema,
  unmarshalCreateGlobalInitScriptRequest_ResponseSchema,
  unmarshalDeleteGlobalInitScriptRequest_ResponseSchema,
  unmarshalGlobalInitScriptDetailsSchema,
  unmarshalListGlobalInitScriptsRequest_ResponseSchema,
  unmarshalUpdateGlobalInitScriptRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class GlobalinitscriptsClient {
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

  /** Creates a new global init script in this workspace. */
  async createGlobalInitScript(
    req: CreateGlobalInitScriptRequest,
    options?: CallOptions
  ): Promise<CreateGlobalInitScriptRequest_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts`;
    const body = marshalRequest(
      req,
      marshalCreateGlobalInitScriptRequestSchema
    );
    let resp: CreateGlobalInitScriptRequest_Response | undefined;
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
        unmarshalCreateGlobalInitScriptRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a global init script. */
  async deleteGlobalInitScript(
    req: DeleteGlobalInitScriptRequest,
    options?: CallOptions
  ): Promise<DeleteGlobalInitScriptRequest_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts/${req.scriptId ?? ''}`;
    let resp: DeleteGlobalInitScriptRequest_Response | undefined;
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
        unmarshalDeleteGlobalInitScriptRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets all the details of a script, including its Base64-encoded contents. */
  async getGlobalInitScript(
    req: GetGlobalInitScriptRequest,
    options?: CallOptions
  ): Promise<GlobalInitScriptDetails> {
    const url = `${this.host}/api/2.0/global-init-scripts/${req.scriptId ?? ''}`;
    let resp: GlobalInitScriptDetails | undefined;
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
      resp = parseResponse(respBody, unmarshalGlobalInitScriptDetailsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Get a list of all global init scripts for this workspace. This returns all properties for each script but **not** the script contents.
   * To retrieve the contents of a script, use the [get a global init script](:method:globalinitscripts/get) operation.
   */
  async listGlobalInitScripts(
    _req: ListGlobalInitScriptsRequest,
    options?: CallOptions
  ): Promise<ListGlobalInitScriptsRequest_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts`;
    let resp: ListGlobalInitScriptsRequest_Response | undefined;
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
        unmarshalListGlobalInitScriptsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a global init script, specifying only the fields to change. All fields are optional.
   * Unspecified fields retain their current value.
   */
  async updateGlobalInitScript(
    req: UpdateGlobalInitScriptRequest,
    options?: CallOptions
  ): Promise<UpdateGlobalInitScriptRequest_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts/${req.scriptId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateGlobalInitScriptRequestSchema
    );
    let resp: UpdateGlobalInitScriptRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalUpdateGlobalInitScriptRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
