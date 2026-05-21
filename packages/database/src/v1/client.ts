// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {retryOn} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from './transport';
import {buildHttpRequest, executeCall, executeHttpCall, marshalRequest, parseResponse} from './utils';
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
  UpdateSyncedDatabaseTableRequest,
} from './model';
import {
  DatabaseInstance_State,
  marshalDatabaseCatalogSchema,
  marshalDatabaseInstanceRoleSchema,
  marshalDatabaseInstanceSchema,
  marshalDatabaseTableSchema,
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
  async createDatabaseCatalog(req: CreateDatabaseCatalogRequest, options?: CallOptions): Promise<DatabaseCatalog> {
    const url = `${this.host}/api/2.0/database/catalogs`;
    const body = marshalRequest(req.catalog, marshalDatabaseCatalogSchema);
    let resp: DatabaseCatalog | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseCatalogSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a Database Instance. */
  async createDatabaseInstance(req: CreateDatabaseInstanceRequest, options?: CallOptions): Promise<DatabaseInstance> {
    const url = `${this.host}/api/2.0/database/instances`;
    const body = marshalRequest(req.databaseInstance, marshalDatabaseInstanceSchema);
    let resp: DatabaseInstance | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseInstanceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

async createDatabaseInstanceWaiter(
    req: CreateDatabaseInstanceRequest,
    options?: CallOptions
  ): Promise<CreateDatabaseInstanceWaiter> {
    const resp = await this.createDatabaseInstance(req, options);
    if (resp.name === undefined) {
      throw new Error(
        'response field name required for polling is missing'
      );
    }
    return new CreateDatabaseInstanceWaiter(
      this,
      resp.name,
    );
  }

  /** Create a role for a Database Instance. */
  async createDatabaseInstanceRole(req: CreateDatabaseInstanceRoleRequest, options?: CallOptions): Promise<DatabaseInstanceRole> {
    const url = `${this.host}/api/2.0/database/instances/${req.instanceName ?? ''}/roles`;
    const params = new URLSearchParams();
    if (req.databaseInstanceName !== undefined) {
      params.append('database_instance_name', req.databaseInstanceName);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.databaseInstanceRole, marshalDatabaseInstanceRoleSchema);
    let resp: DatabaseInstanceRole | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseInstanceRoleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Create a Database Table. Useful for registering pre-existing PG tables in UC.
   * See CreateSyncedDatabaseTable for creating synced tables in PG from a source table in UC.
   */
  async createDatabaseTable(req: CreateDatabaseTableRequest, options?: CallOptions): Promise<DatabaseTable> {
    const url = `${this.host}/api/2.0/database/tables`;
    const body = marshalRequest(req.table, marshalDatabaseTableSchema);
    let resp: DatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseTableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a Synced Database Table. */
  async createSyncedDatabaseTable(req: CreateSyncedDatabaseTableRequest, options?: CallOptions): Promise<SyncedDatabaseTable> {
    const url = `${this.host}/api/2.0/database/synced_tables`;
    const body = marshalRequest(req.syncedTable, marshalSyncedDatabaseTableSchema);
    let resp: SyncedDatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalSyncedDatabaseTableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a Database Catalog. */
  async deleteDatabaseCatalog(req: DeleteDatabaseCatalogRequest, options?: CallOptions): Promise<void> {
    const url = `${this.host}/api/2.0/database/catalogs/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await executeCall(call, options);
  }

  /** Delete a Database Instance. */
  async deleteDatabaseInstance(req: DeleteDatabaseInstanceRequest, options?: CallOptions): Promise<void> {
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
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await executeCall(call, options);
  }

  /** Deletes a role for a Database Instance. */
  async deleteDatabaseInstanceRole(req: DeleteDatabaseInstanceRoleRequest, options?: CallOptions): Promise<void> {
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
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await executeCall(call, options);
  }

  /** Delete a Database Table. */
  async deleteDatabaseTable(req: DeleteDatabaseTableRequest, options?: CallOptions): Promise<void> {
    const url = `${this.host}/api/2.0/database/tables/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await executeCall(call, options);
  }

  /** Delete a Synced Database Table. */
  async deleteSyncedDatabaseTable(req: DeleteSyncedDatabaseTableRequest, options?: CallOptions): Promise<void> {
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
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await executeCall(call, options);
  }

  /** Find a Database Instance by uid. */
  async findDatabaseInstanceByUid(req: FindDatabaseInstanceByUidRequest, options?: CallOptions): Promise<DatabaseInstance> {
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
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseInstanceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Generates a credential that can be used to access database instances. */
  async generateDatabaseCredential(req: GenerateDatabaseCredentialRequest, options?: CallOptions): Promise<DatabaseCredential> {
    const url = `${this.host}/api/2.0/database/credentials`;
    const body = marshalRequest(req, marshalGenerateDatabaseCredentialRequestSchema);
    let resp: DatabaseCredential | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseCredentialSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database Catalog. */
  async getDatabaseCatalog(req: GetDatabaseCatalogRequest, options?: CallOptions): Promise<DatabaseCatalog> {
    const url = `${this.host}/api/2.0/database/catalogs/${req.name ?? ''}`;
    let resp: DatabaseCatalog | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseCatalogSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database Instance. */
  async getDatabaseInstance(req: GetDatabaseInstanceRequest, options?: CallOptions): Promise<DatabaseInstance> {
    const url = `${this.host}/api/2.0/database/instances/${req.name ?? ''}`;
    let resp: DatabaseInstance | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseInstanceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a role for a Database Instance. */
  async getDatabaseInstanceRole(req: GetDatabaseInstanceRoleRequest, options?: CallOptions): Promise<DatabaseInstanceRole> {
    const url = `${this.host}/api/2.0/database/instances/${req.instanceName ?? ''}/roles/${req.name ?? ''}`;
    let resp: DatabaseInstanceRole | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseInstanceRoleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database Table. */
  async getDatabaseTable(req: GetDatabaseTableRequest, options?: CallOptions): Promise<DatabaseTable> {
    const url = `${this.host}/api/2.0/database/tables/${req.name ?? ''}`;
    let resp: DatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseTableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Synced Database Table. */
  async getSyncedDatabaseTable(req: GetSyncedDatabaseTableRequest, options?: CallOptions): Promise<SyncedDatabaseTable> {
    const url = `${this.host}/api/2.0/database/synced_tables/${req.name ?? ''}`;
    let resp: SyncedDatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalSyncedDatabaseTableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** This API is currently unimplemented, but exposed for Terraform support. */
  async listDatabaseCatalogs(req: ListDatabaseCatalogsRequest, options?: CallOptions): Promise<ListDatabaseCatalogsResponse> {
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
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListDatabaseCatalogsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listDatabaseCatalogsIter(req: ListDatabaseCatalogsRequest, options?: CallOptions): AsyncGenerator<DatabaseCatalog> {
    const pageReq: ListDatabaseCatalogsRequest = {...req};
    for (;;) {
      const resp = await this.listDatabaseCatalogs(pageReq, options);
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
  async listDatabaseInstanceRoles(req: ListDatabaseInstanceRolesRequest, options?: CallOptions): Promise<ListDatabaseInstanceRolesResponse> {
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
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListDatabaseInstanceRolesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listDatabaseInstanceRolesIter(req: ListDatabaseInstanceRolesRequest, options?: CallOptions): AsyncGenerator<DatabaseInstanceRole> {
    const pageReq: ListDatabaseInstanceRolesRequest = {...req};
    for (;;) {
      const resp = await this.listDatabaseInstanceRoles(pageReq, options);
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
  async listDatabaseInstances(req: ListDatabaseInstancesRequest, options?: CallOptions): Promise<ListDatabaseInstancesResponse> {
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
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListDatabaseInstancesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listDatabaseInstancesIter(req: ListDatabaseInstancesRequest, options?: CallOptions): AsyncGenerator<DatabaseInstance> {
    const pageReq: ListDatabaseInstancesRequest = {...req};
    for (;;) {
      const resp = await this.listDatabaseInstances(pageReq, options);
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
  async listSyncedDatabaseTables(req: ListSyncedDatabaseTablesRequest, options?: CallOptions): Promise<ListSyncedDatabaseTablesResponse> {
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
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListSyncedDatabaseTablesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listSyncedDatabaseTablesIter(req: ListSyncedDatabaseTablesRequest, options?: CallOptions): AsyncGenerator<SyncedDatabaseTable> {
    const pageReq: ListSyncedDatabaseTablesRequest = {...req};
    for (;;) {
      const resp = await this.listSyncedDatabaseTables(pageReq, options);
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
  async updateDatabaseCatalog(req: UpdateDatabaseCatalogRequest, options?: CallOptions): Promise<DatabaseCatalog> {
    const url = `${this.host}/api/2.0/database/catalogs/${req.databaseCatalog?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.databaseCatalog, marshalDatabaseCatalogSchema);
    let resp: DatabaseCatalog | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseCatalogSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a Database Instance. */
  async updateDatabaseInstance(req: UpdateDatabaseInstanceRequest, options?: CallOptions): Promise<DatabaseInstance> {
    const url = `${this.host}/api/2.0/database/instances/${req.databaseInstance?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.databaseInstance, marshalDatabaseInstanceSchema);
    let resp: DatabaseInstance | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDatabaseInstanceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** This API is currently unimplemented, but exposed for Terraform support. */
  async updateSyncedDatabaseTable(req: UpdateSyncedDatabaseTableRequest, options?: CallOptions): Promise<SyncedDatabaseTable> {
    const url = `${this.host}/api/2.0/database/synced_tables/${req.syncedTable?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.syncedTable, marshalSyncedDatabaseTableSchema);
    let resp: SyncedDatabaseTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalSyncedDatabaseTableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CreateDatabaseInstanceWaiter {
  constructor(
    private readonly client: Client,
    readonly name: string,
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<DatabaseInstance> {
    let result: DatabaseInstance | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getDatabaseInstance(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getDatabaseInstance(
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
