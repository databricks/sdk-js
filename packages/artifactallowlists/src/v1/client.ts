// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import type {
  ArtifactAllowlistInfo,
  GetArtifactAllowlist,
  SetArtifactAllowlist,
} from './model';
import {
  marshalSetArtifactAllowlistSchema,
  unmarshalArtifactAllowlistInfoSchema,
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
   * Get the artifact allowlist of a certain artifact type.
   * The caller must be a metastore admin or have the **MANAGE ALLOWLIST** privilege
   * on the metastore.
   */
  async getArtifactAllowlist(
    signal: AbortSignal | undefined,
    req: GetArtifactAllowlist,
    options?: Options
  ): Promise<ArtifactAllowlistInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/artifact-allowlists/${req.artifactType ?? ''}`;
    let resp: ArtifactAllowlistInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalArtifactAllowlistInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Set the artifact allowlist of a certain artifact type.
   * The whole artifact allowlist is replaced with the new allowlist.
   * The caller must be a metastore admin or have the **MANAGE ALLOWLIST** privilege
   * on the metastore.
   */
  async setArtifactAllowlist(
    signal: AbortSignal | undefined,
    req: SetArtifactAllowlist,
    options?: Options
  ): Promise<ArtifactAllowlistInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/artifact-allowlists/${req.artifactType ?? ''}`;
    const body = marshalRequest(req, marshalSetArtifactAllowlistSchema);
    let resp: ArtifactAllowlistInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalArtifactAllowlistInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
