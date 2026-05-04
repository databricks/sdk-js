// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute, retryOn} from '@databricks/sdk-core/api';
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
  CreateDatabaseCatalogRequest,
  CreateDatabaseInstanceRequest,
  CreateDatabaseInstanceRoleRequest,
  CreateDatabaseTableRequest,
  CreateSyncedDatabaseTableRequest,
  DatabaseCatalog,
  DatabaseCredential,
  DatabaseInstance,
  DatabaseInstanceRole,
  DatabaseTable,
  DeleteDatabaseCatalogRequest,
  DeleteDatabaseInstanceRequest,
  DeleteDatabaseInstanceRoleRequest,
  DeleteDatabaseTableRequest,
  DeleteSyncedDatabaseTableRequest,
  FailoverDatabaseInstanceRequest,
  FindDatabaseInstanceByUidRequest,
  GenerateDatabaseCredentialRequest,
  GetDatabaseCatalogRequest,
  GetDatabaseInstanceRequest,
  GetDatabaseInstanceRoleRequest,
  GetDatabaseTableRequest,
  GetSyncedDatabaseTableRequest,
  ListDatabaseCatalogsRequest,
  ListDatabaseCatalogsResponse,
  ListDatabaseInstanceRolesRequest,
  ListDatabaseInstanceRolesResponse,
  ListDatabaseInstancesRequest,
  ListDatabaseInstancesResponse,
  ListSyncedDatabaseTablesRequest,
  ListSyncedDatabaseTablesResponse,
  SyncedDatabaseTable,
  UpdateDatabaseCatalogRequest,
  UpdateDatabaseInstanceRequest,
  UpdateDatabaseInstanceRoleRequest,
  UpdateSyncedDatabaseTableRequest,
  UpgradeInstanceToAutoscalingRequest,
} from './model';
import {
  DatabaseInstance_State,
  marshalDatabaseCatalogSchema,
  marshalDatabaseInstanceRoleSchema,
  marshalDatabaseInstanceSchema,
  marshalDatabaseTableSchema,
  marshalFailoverDatabaseInstanceRequestSchema,
  marshalGenerateDatabaseCredentialRequestSchema,
  marshalSyncedDatabaseTableSchema,
  unmarshalDatabaseCatalogSchema,
  unmarshalDatabaseCredentialSchema,
  unmarshalDatabaseInstanceRoleSchema,
  unmarshalDatabaseInstanceSchema,
  unmarshalDatabaseTableSchema,
  unmarshalListDatabaseCatalogsResponseSchema,
  unmarshalListDatabaseInstanceRolesResponseSchema,
  unmarshalListDatabaseInstancesResponseSchema,
  unmarshalListSyncedDatabaseTablesResponseSchema,
  unmarshalSyncedDatabaseTableSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

class StillRunningError extends Error {}

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

  /** Create a Database Catalog. */
  async createDatabaseCatalog(
    signal: AbortSignal | undefined,
    req: CreateDatabaseCatalogRequest,
    options?: Options
  ): Promise<DatabaseCatalog> {
    const url = `${this.host}/api/2.0/database/catalogs`;
    const body = marshalRequest(req.catalog, marshalDatabaseCatalogSchema);
    let resp: DatabaseCatalog | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseCatalogSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a Database Instance. */
  async createDatabaseInstance(
    signal: AbortSignal | undefined,
    req: CreateDatabaseInstanceRequest,
    options?: Options
  ): Promise<DatabaseInstance> {
    const url = `${this.host}/api/2.0/database/instances`;
    const body = marshalRequest(
      req.databaseInstance,
      marshalDatabaseInstanceSchema
    );
    let resp: DatabaseInstance | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseInstanceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createDatabaseInstanceWaiter(
    signal: AbortSignal | undefined,
    req: CreateDatabaseInstanceRequest,
    options?: Options
  ): Promise<CreateDatabaseInstanceWaiter> {
    const resp = await this.createDatabaseInstance(signal, req, options);
    if (resp.name === undefined) {
      throw new Error('response field name required for polling is missing');
    }
    return new CreateDatabaseInstanceWaiter(this, resp.name);
  }

  /** Create a role for a Database Instance. */
  async createDatabaseInstanceRole(
    signal: AbortSignal | undefined,
    req: CreateDatabaseInstanceRoleRequest,
    options?: Options
  ): Promise<DatabaseInstanceRole> {
    const url = `${this.host}/api/2.0/database/instances/${req.instanceName ?? ''}/roles`;
    const params = new URLSearchParams();
    if (req.databaseInstanceName !== undefined) {
      params.append('database_instance_name', req.databaseInstanceName);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.databaseInstanceRole,
      marshalDatabaseInstanceRoleSchema
    );
    let resp: DatabaseInstanceRole | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseInstanceRoleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Create a Database Table. Useful for registering pre-existing PG tables in UC.
   * See CreateSyncedDatabaseTable for creating synced tables in PG from a source table in UC.
   */
  async createDatabaseTable(
    signal: AbortSignal | undefined,
    req: CreateDatabaseTableRequest,
    options?: Options
  ): Promise<DatabaseTable> {
    const url = `${this.host}/api/2.0/database/tables`;
    const body = marshalRequest(req.table, marshalDatabaseTableSchema);
    let resp: DatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a Synced Database Table. */
  async createSyncedDatabaseTable(
    signal: AbortSignal | undefined,
    req: CreateSyncedDatabaseTableRequest,
    options?: Options
  ): Promise<SyncedDatabaseTable> {
    const url = `${this.host}/api/2.0/database/synced_tables`;
    const body = marshalRequest(
      req.syncedTable,
      marshalSyncedDatabaseTableSchema
    );
    let resp: SyncedDatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSyncedDatabaseTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a Database Catalog. */
  async deleteDatabaseCatalog(
    signal: AbortSignal | undefined,
    req: DeleteDatabaseCatalogRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/database/catalogs/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Delete a Database Instance. */
  async deleteDatabaseInstance(
    signal: AbortSignal | undefined,
    req: DeleteDatabaseInstanceRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/database/instances/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    if (req.purge !== undefined) {
      params.append('purge', String(req.purge));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Deletes a role for a Database Instance. */
  async deleteDatabaseInstanceRole(
    signal: AbortSignal | undefined,
    req: DeleteDatabaseInstanceRoleRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/database/instances/${req.instanceName ?? ''}/roles/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.reassignOwnedTo !== undefined) {
      params.append('reassign_owned_to', req.reassignOwnedTo);
    }
    if (req.allowMissing !== undefined) {
      params.append('allow_missing', String(req.allowMissing));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Delete a Database Table. */
  async deleteDatabaseTable(
    signal: AbortSignal | undefined,
    req: DeleteDatabaseTableRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/database/tables/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Delete a Synced Database Table. */
  async deleteSyncedDatabaseTable(
    signal: AbortSignal | undefined,
    req: DeleteSyncedDatabaseTableRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/database/synced_tables/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.purgeData !== undefined) {
      params.append('purge_data', String(req.purgeData));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Failover the primary node of a Database Instance to a secondary. */
  async failoverDatabaseInstance(
    signal: AbortSignal | undefined,
    req: FailoverDatabaseInstanceRequest,
    options?: Options
  ): Promise<DatabaseInstance> {
    const url = `${this.host}/api/2.0/database/instances/${req.name ?? ''}/failover`;
    const body = marshalRequest(
      req,
      marshalFailoverDatabaseInstanceRequestSchema
    );
    let resp: DatabaseInstance | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseInstanceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Find a Database Instance by uid. */
  async findDatabaseInstanceByUid(
    signal: AbortSignal | undefined,
    req: FindDatabaseInstanceByUidRequest,
    options?: Options
  ): Promise<DatabaseInstance> {
    const url = `${this.host}/api/2.0/database/instances:findByUid`;
    const params = new URLSearchParams();
    if (req.uid !== undefined) {
      params.append('uid', req.uid);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DatabaseInstance | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseInstanceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Generates a credential that can be used to access database instances. */
  async generateDatabaseCredential(
    signal: AbortSignal | undefined,
    req: GenerateDatabaseCredentialRequest,
    options?: Options
  ): Promise<DatabaseCredential> {
    const url = `${this.host}/api/2.0/database/credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateDatabaseCredentialRequestSchema
    );
    let resp: DatabaseCredential | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseCredentialSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database Catalog. */
  async getDatabaseCatalog(
    signal: AbortSignal | undefined,
    req: GetDatabaseCatalogRequest,
    options?: Options
  ): Promise<DatabaseCatalog> {
    const url = `${this.host}/api/2.0/database/catalogs/${req.name ?? ''}`;
    let resp: DatabaseCatalog | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseCatalogSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database Instance. */
  async getDatabaseInstance(
    signal: AbortSignal | undefined,
    req: GetDatabaseInstanceRequest,
    options?: Options
  ): Promise<DatabaseInstance> {
    const url = `${this.host}/api/2.0/database/instances/${req.name ?? ''}`;
    let resp: DatabaseInstance | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseInstanceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a role for a Database Instance. */
  async getDatabaseInstanceRole(
    signal: AbortSignal | undefined,
    req: GetDatabaseInstanceRoleRequest,
    options?: Options
  ): Promise<DatabaseInstanceRole> {
    const url = `${this.host}/api/2.0/database/instances/${req.instanceName ?? ''}/roles/${req.name ?? ''}`;
    let resp: DatabaseInstanceRole | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseInstanceRoleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database Table. */
  async getDatabaseTable(
    signal: AbortSignal | undefined,
    req: GetDatabaseTableRequest,
    options?: Options
  ): Promise<DatabaseTable> {
    const url = `${this.host}/api/2.0/database/tables/${req.name ?? ''}`;
    let resp: DatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Synced Database Table. */
  async getSyncedDatabaseTable(
    signal: AbortSignal | undefined,
    req: GetSyncedDatabaseTableRequest,
    options?: Options
  ): Promise<SyncedDatabaseTable> {
    const url = `${this.host}/api/2.0/database/synced_tables/${req.name ?? ''}`;
    let resp: SyncedDatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSyncedDatabaseTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** This API is currently unimplemented, but exposed for Terraform support. */
  async listDatabaseCatalogs(
    signal: AbortSignal | undefined,
    req: ListDatabaseCatalogsRequest,
    options?: Options
  ): Promise<ListDatabaseCatalogsResponse> {
    const url = `${this.host}/api/2.0/database/instances/${req.instanceName ?? ''}/catalogs`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDatabaseCatalogsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListDatabaseCatalogsResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listDatabaseCatalogsIter(
    signal: AbortSignal | undefined,
    req: ListDatabaseCatalogsRequest,
    options?: Options
  ): AsyncGenerator<DatabaseCatalog> {
    const pageReq: ListDatabaseCatalogsRequest = {...req};
    for (;;) {
      const resp = await this.listDatabaseCatalogs(signal, pageReq, options);
      for (const item of resp.databaseCatalogs ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * START OF PG ROLE APIs Section
   * These APIs are marked a PUBLIC with stage < PUBLIC_PREVIEW. With more recent Lakebase V2 plans, we don't plan to
   * ever advance these to PUBLIC_PREVIEW. These APIs will remain effectively undocumented/UI-only and we'll aim for a
   * new public roles API as part of V2 PuPr.
   */
  async listDatabaseInstanceRoles(
    signal: AbortSignal | undefined,
    req: ListDatabaseInstanceRolesRequest,
    options?: Options
  ): Promise<ListDatabaseInstanceRolesResponse> {
    const url = `${this.host}/api/2.0/database/instances/${req.instanceName ?? ''}/roles`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDatabaseInstanceRolesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListDatabaseInstanceRolesResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listDatabaseInstanceRolesIter(
    signal: AbortSignal | undefined,
    req: ListDatabaseInstanceRolesRequest,
    options?: Options
  ): AsyncGenerator<DatabaseInstanceRole> {
    const pageReq: ListDatabaseInstanceRolesRequest = {...req};
    for (;;) {
      const resp = await this.listDatabaseInstanceRoles(
        signal,
        pageReq,
        options
      );
      for (const item of resp.databaseInstanceRoles ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List Database Instances. */
  async listDatabaseInstances(
    signal: AbortSignal | undefined,
    req: ListDatabaseInstancesRequest,
    options?: Options
  ): Promise<ListDatabaseInstancesResponse> {
    const url = `${this.host}/api/2.0/database/instances`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDatabaseInstancesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListDatabaseInstancesResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listDatabaseInstancesIter(
    signal: AbortSignal | undefined,
    req: ListDatabaseInstancesRequest,
    options?: Options
  ): AsyncGenerator<DatabaseInstance> {
    const pageReq: ListDatabaseInstancesRequest = {...req};
    for (;;) {
      const resp = await this.listDatabaseInstances(signal, pageReq, options);
      for (const item of resp.databaseInstances ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** This API is currently unimplemented, but exposed for Terraform support. */
  async listSyncedDatabaseTables(
    signal: AbortSignal | undefined,
    req: ListSyncedDatabaseTablesRequest,
    options?: Options
  ): Promise<ListSyncedDatabaseTablesResponse> {
    const url = `${this.host}/api/2.0/database/instances/${req.instanceName ?? ''}/synced_tables`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSyncedDatabaseTablesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListSyncedDatabaseTablesResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listSyncedDatabaseTablesIter(
    signal: AbortSignal | undefined,
    req: ListSyncedDatabaseTablesRequest,
    options?: Options
  ): AsyncGenerator<SyncedDatabaseTable> {
    const pageReq: ListSyncedDatabaseTablesRequest = {...req};
    for (;;) {
      const resp = await this.listSyncedDatabaseTables(
        signal,
        pageReq,
        options
      );
      for (const item of resp.syncedTables ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** This API is currently unimplemented, but exposed for Terraform support. */
  async updateDatabaseCatalog(
    signal: AbortSignal | undefined,
    req: UpdateDatabaseCatalogRequest,
    options?: Options
  ): Promise<DatabaseCatalog> {
    const url = `${this.host}/api/2.0/database/catalogs/${req.databaseCatalog?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.databaseCatalog,
      marshalDatabaseCatalogSchema
    );
    let resp: DatabaseCatalog | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      });
      resp = parseResponse(respBody, unmarshalDatabaseCatalogSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a Database Instance. */
  async updateDatabaseInstance(
    signal: AbortSignal | undefined,
    req: UpdateDatabaseInstanceRequest,
    options?: Options
  ): Promise<DatabaseInstance> {
    const url = `${this.host}/api/2.0/database/instances/${req.databaseInstance?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.databaseInstance,
      marshalDatabaseInstanceSchema
    );
    let resp: DatabaseInstance | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      });
      resp = parseResponse(respBody, unmarshalDatabaseInstanceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a role for a Database Instance. */
  async updateDatabaseInstanceRole(
    signal: AbortSignal | undefined,
    req: UpdateDatabaseInstanceRoleRequest,
    options?: Options
  ): Promise<DatabaseInstanceRole> {
    const url = `${this.host}/api/2.0/database/instances/${req.instanceName ?? ''}/roles/${req.databaseInstanceRole?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.databaseInstanceName !== undefined) {
      params.append('database_instance_name', req.databaseInstanceName);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.databaseInstanceRole,
      marshalDatabaseInstanceRoleSchema
    );
    let resp: DatabaseInstanceRole | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      });
      resp = parseResponse(respBody, unmarshalDatabaseInstanceRoleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** This API is currently unimplemented, but exposed for Terraform support. */
  async updateSyncedDatabaseTable(
    signal: AbortSignal | undefined,
    req: UpdateSyncedDatabaseTableRequest,
    options?: Options
  ): Promise<SyncedDatabaseTable> {
    const url = `${this.host}/api/2.0/database/synced_tables/${req.syncedTable?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.syncedTable,
      marshalSyncedDatabaseTableSchema
    );
    let resp: SyncedDatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      });
      resp = parseResponse(respBody, unmarshalSyncedDatabaseTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Upgrade a Database Instance to Autoscaling. */
  async upgradeInstanceToAutoscaling(
    signal: AbortSignal | undefined,
    req: UpgradeInstanceToAutoscalingRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/database/instances/${req.name ?? ''}/upgrade`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }
}

export class CreateDatabaseInstanceWaiter {
  constructor(
    private readonly client: Client,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<DatabaseInstance> {
    let result: DatabaseInstance | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getDatabaseInstance(
        callSignal,
        {
          name: this.name,
        },
        options
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case DatabaseInstance_State.AVAILABLE:
          result = pollResp;
          return;
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getDatabaseInstance(
      signal,
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case DatabaseInstance_State.AVAILABLE:
        return true;
      default:
        return false;
    }
  }
}
