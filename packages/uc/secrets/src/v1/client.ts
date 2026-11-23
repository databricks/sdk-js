// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
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
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
    return this.config;
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/secrets`;
    const body = marshalRequest(req.secret, marshalSecretSchema);
    let resp: Secret | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
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
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/secrets/${req.fullName ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Gets a secret by its three-level (fully qualified) name.
   *
   * You must be a metastore admin or the owner of the secret, or have the **MANAGE** privilege on
   * the secret (together with **USE CATALOG** on its catalog and **USE SCHEMA** on its schema), on
   * its schema (together with **USE CATALOG** on its catalog), or on its catalog. Alternatively,
   * you can have the **READ_SECRET**, **WRITE_SECRET**, or **REFERENCE_SECRET** privilege on the
   * secret, its schema, or its catalog, together with **USE CATALOG** on its catalog and
   * **USE SCHEMA** on its schema.
   *
   * The secret value isn't returned by default. To retrieve it, set **include_value** to true in
   * the request; this requires ownership of the secret or the **READ_SECRET** privilege.
   */
  async getSecret(
    req: GetSecretRequest,
    options?: CallOptions
  ): Promise<Secret> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/secrets/${req.fullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeValue !== undefined) {
      params.append('include_value', String(req.includeValue));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Secret | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
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
   * Lists the secrets in a schema.
   *
   * With **USE CATALOG** on the catalog and **USE SCHEMA** on the schema, the response contains the
   * secrets that you own or hold a privilege on. Metastore admins, principals with the **MANAGE**
   * privilege on the catalog, and principals with the **MANAGE** privilege on the schema together
   * with **USE CATALOG** on the catalog see every secret in the schema.
   *
   * Secrets are listed within a single schema, so both **catalog_name** and **schema_name** must
   * be specified. Results are paginated; pass the **next_page_token** value from the response as
   * **page_token** to retrieve the next page.
   */
  async listSecrets(
    req: ListSecretsRequest,
    options?: CallOptions
  ): Promise<ListSecretsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/secrets`;
    const params = new URLSearchParams();
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaName !== undefined) {
      params.append('schema_name', req.schemaName);
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
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
   * To change **value**, you must be the owner of the secret, or have the **WRITE_SECRET**
   * privilege on it together with **USE CATALOG** on its catalog and **USE SCHEMA** on its schema.
   * To change **comment** or **expire_time**, you must be the owner or have the **MANAGE**
   * privilege on the secret (together with **USE CATALOG** on its catalog and **USE SCHEMA** on its
   * schema), on its schema (together with **USE CATALOG** on its catalog), or on its catalog. To
   * change **owner**, you must be the owner, a metastore admin, or have the **MANAGE** privilege on
   * the secret (together with **USE CATALOG** on its catalog and **USE SCHEMA** on its schema), on
   * its schema (together with **USE CATALOG** on its catalog), or on its catalog. A metastore admin
   * can change only the **owner** field.
   *
   * Use the **update_mask** field to specify which fields to update.
   */
  async updateSecret(
    req: UpdateSecretRequest,
    options?: CallOptions
  ): Promise<Secret> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/secrets/${req.fullName ?? ''}`;
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
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
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
