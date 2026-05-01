// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
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
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  ArtifactAllowlistInfo,
  GetArtifactAllowlist,
  SetArtifactAllowlist,
} from './model';
import {
  marshalSetArtifactAllowlistSchema,
  unmarshalArtifactAllowlistInfoSchema,
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
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
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
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
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
