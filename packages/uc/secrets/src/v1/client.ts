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
  CreateSecretRequest,
  DeleteSecretRequest,
  GetSecretRequest,
  ListSecretsRequest,
  ListSecretsResponse,
  Secret,
  UpdateSecretRequest,
} from './model';
import {
  marshalSecretSchema,
  unmarshalListSecretsResponseSchema,
  unmarshalSecretSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class SecretsClient {
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

  /**
   * Creates a new secret in Unity Catalog.
   *
   * You must be the owner of the parent schema or have the **CREATE_SECRET** and **USE SCHEMA**
   * privileges on the parent schema and **USE CATALOG** on the parent catalog.
   *
   * The secret is stored in the specified catalog and schema, and the **value** field
   * contains the sensitive data to be securely stored.
   */
  async createSecret(
    req: CreateSecretRequest,
    options?: CallOptions
  ): Promise<Secret> {
    const url = `${this.host}/api/2.1/unity-catalog/secrets`;
    const body = marshalRequest(req.secret, marshalSecretSchema);
    let resp: Secret | undefined;
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
      resp = parseResponse(respBody, unmarshalSecretSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a secret by its three-level (fully qualified) name.
   *
   * You must be the owner of the secret or a metastore admin.
   */
  async deleteSecret(
    req: DeleteSecretRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.1/unity-catalog/secrets/${req.fullName ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Gets a secret by its three-level (fully qualified) name.
   *
   * You must be a metastore admin, the owner of the secret, or have the **MANAGE**
   * privilege on the secret.
   *
   * The secret value isn't returned by default. To retrieve it, you must also have the
   * **READ_SECRET** privilege and set **include_value** to true in the request.
   */
  async getSecret(
    req: GetSecretRequest,
    options?: CallOptions
  ): Promise<Secret> {
    const url = `${this.host}/api/2.1/unity-catalog/secrets/${req.fullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Secret | undefined;
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
      resp = parseResponse(respBody, unmarshalSecretSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists secrets in Unity Catalog.
   *
   * You must be a metastore admin, the owner of the secret, or have the
   * **MANAGE** privilege on the secret.
   *
   * Both **catalog_name** and **schema_name** must be specified together to filter secrets within
   * a specific schema. Results are paginated; use the **page_token** field from the response
   * to retrieve subsequent pages.
   */
  async listSecrets(
    req: ListSecretsRequest,
    options?: CallOptions
  ): Promise<ListSecretsResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/secrets`;
    const params = new URLSearchParams();
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaName !== undefined) {
      params.append('schema_name', req.schemaName);
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSecretsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListSecretsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listSecretsIter(
    req: ListSecretsRequest,
    options?: CallOptions
  ): AsyncGenerator<Secret> {
    const pageReq: ListSecretsRequest = {...req};
    for (;;) {
      const resp = await this.listSecrets(pageReq, options);
      for (const item of resp.secrets ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates an existing secret in Unity Catalog.
   *
   * You must be the owner of the secret or a metastore admin. If you are a metastore
   * admin, only the **owner** field can be changed.
   *
   * Use the **update_mask** field to specify which fields to update. Supported updatable fields
   * include **value**, **comment**, **owner**, and **expire_time**.
   */
  async updateSecret(
    req: UpdateSecretRequest,
    options?: CallOptions
  ): Promise<Secret> {
    const url = `${this.host}/api/2.1/unity-catalog/secrets/${req.fullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.secret, marshalSecretSchema);
    let resp: Secret | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalSecretSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
