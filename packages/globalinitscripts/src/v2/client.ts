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
  CreateGlobalInitScript,
  CreateGlobalInitScript_Response,
  DeleteGlobalInitScript,
  DeleteGlobalInitScript_Response,
  GetGlobalInitScript,
  GlobalInitScriptDetails,
  ListGlobalInitScripts,
  ListGlobalInitScripts_Response,
  UpdateGlobalInitScript,
  UpdateGlobalInitScript_Response,
} from './model';
import {
  marshalCreateGlobalInitScriptSchema,
  marshalUpdateGlobalInitScriptSchema,
  unmarshalCreateGlobalInitScript_ResponseSchema,
  unmarshalDeleteGlobalInitScript_ResponseSchema,
  unmarshalGlobalInitScriptDetailsSchema,
  unmarshalListGlobalInitScripts_ResponseSchema,
  unmarshalUpdateGlobalInitScript_ResponseSchema,
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

  /** Creates a new global init script in this workspace. */
  async createGlobalInitScript(
    req: CreateGlobalInitScript,
    options?: CallOptions
  ): Promise<CreateGlobalInitScript_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts`;
    const body = marshalRequest(req, marshalCreateGlobalInitScriptSchema);
    let resp: CreateGlobalInitScript_Response | undefined;
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
        unmarshalCreateGlobalInitScript_ResponseSchema
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
    req: DeleteGlobalInitScript,
    options?: CallOptions
  ): Promise<DeleteGlobalInitScript_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts/${req.scriptId ?? ''}`;
    let resp: DeleteGlobalInitScript_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteGlobalInitScript_ResponseSchema
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
    req: GetGlobalInitScript,
    options?: CallOptions
  ): Promise<GlobalInitScriptDetails> {
    const url = `${this.host}/api/2.0/global-init-scripts/${req.scriptId ?? ''}`;
    let resp: GlobalInitScriptDetails | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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
    _req: ListGlobalInitScripts,
    options?: CallOptions
  ): Promise<ListGlobalInitScripts_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts`;
    let resp: ListGlobalInitScripts_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListGlobalInitScripts_ResponseSchema
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
    req: UpdateGlobalInitScript,
    options?: CallOptions
  ): Promise<UpdateGlobalInitScript_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts/${req.scriptId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateGlobalInitScriptSchema);
    let resp: UpdateGlobalInitScript_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateGlobalInitScript_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
