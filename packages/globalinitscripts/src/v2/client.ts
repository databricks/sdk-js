// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
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
} from './utils';
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

  /** Creates a new global init script in this workspace. */
  async createGlobalInitScript(
    signal: AbortSignal | undefined,
    req: CreateGlobalInitScript,
    options?: Options
  ): Promise<CreateGlobalInitScript_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts`;
    const body = marshalRequest(req, marshalCreateGlobalInitScriptSchema);
    let resp: CreateGlobalInitScript_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a global init script. */
  async deleteGlobalInitScript(
    signal: AbortSignal | undefined,
    req: DeleteGlobalInitScript,
    options?: Options
  ): Promise<DeleteGlobalInitScript_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts/${req.scriptId ?? ''}`;
    let resp: DeleteGlobalInitScript_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets all the details of a script, including its Base64-encoded contents. */
  async getGlobalInitScript(
    signal: AbortSignal | undefined,
    req: GetGlobalInitScript,
    options?: Options
  ): Promise<GlobalInitScriptDetails> {
    const url = `${this.host}/api/2.0/global-init-scripts/${req.scriptId ?? ''}`;
    let resp: GlobalInitScriptDetails | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGlobalInitScriptDetailsSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    _req: ListGlobalInitScripts,
    options?: Options
  ): Promise<ListGlobalInitScripts_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts`;
    let resp: ListGlobalInitScripts_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateGlobalInitScript,
    options?: Options
  ): Promise<UpdateGlobalInitScript_Response> {
    const url = `${this.host}/api/2.0/global-init-scripts/${req.scriptId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateGlobalInitScriptSchema);
    let resp: UpdateGlobalInitScript_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
