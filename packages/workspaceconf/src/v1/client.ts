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
  GetWorkspaceConfRequest,
  WorkspaceConf,
} from './model';
import {
  marshalWorkspaceConfSchema,
  unmarshalWorkspaceConfSchema,
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

  /** Gets the configuration status for a workspace. */
  async getWorkspaceConf(signal: AbortSignal | undefined, req: GetWorkspaceConfRequest, options?: Options): Promise<WorkspaceConf> {
    const url = `${this.host}/api/2.0/workspace-conf`;
    const params = new URLSearchParams();
    if (req.keys !== undefined) {
      params.append('keys', req.keys);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: WorkspaceConf | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalWorkspaceConfSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Sets the configuration status for a workspace, including enabling or disabling it. */
  async updateWorkspaceConf(signal: AbortSignal | undefined, req: WorkspaceConf, options?: Options): Promise<void> {
    const url = `${this.host}/api/2.0/workspace-conf`;
    const body = marshalRequest(req, marshalWorkspaceConfSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await execute(signal, call, options);
  }
}
