// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {LroOptions} from '@databricks/sdk-options/lro';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import {z} from 'zod';
import type {
  Branch,
  BranchOperationMetadata,
  Catalog,
  CatalogOperationMetadata,
  CreateBranchRequest,
  CreateCatalogRequest,
  CreateDataApiRequest,
  CreateDatabaseRequest,
  CreateEndpointRequest,
  CreateProjectRequest,
  CreateRoleRequest,
  CreateSyncedTableRequest,
  DataApi,
  DataApiOperationMetadata,
  Database,
  DatabaseCredential,
  DatabaseOperationMetadata,
  DeleteBranchRequest,
  DeleteCatalogRequest,
  DeleteDataApiRequest,
  DeleteDatabaseRequest,
  DeleteEndpointRequest,
  DeleteProjectRequest,
  DeleteRoleRequest,
  DeleteSyncedTableRequest,
  Endpoint,
  EndpointOperationMetadata,
  GenerateDatabaseCredentialRequest,
  GetBranchRequest,
  GetCatalogRequest,
  GetDataApiRequest,
  GetDatabaseRequest,
  GetEndpointRequest,
  GetOperationRequest,
  GetProjectRequest,
  GetRoleRequest,
  GetSyncedTableRequest,
  ListBranchesRequest,
  ListBranchesResponse,
  ListDatabasesRequest,
  ListDatabasesResponse,
  ListEndpointsRequest,
  ListEndpointsResponse,
  ListProjectsRequest,
  ListProjectsResponse,
  ListRolesRequest,
  ListRolesResponse,
  Operation,
  Project,
  ProjectOperationMetadata,
  Role,
  RoleOperationMetadata,
  SyncedTable,
  SyncedTableOperationMetadata,
  UndeleteBranchRequest,
  UndeleteProjectRequest,
  UpdateBranchRequest,
  UpdateDataApiRequest,
  UpdateDatabaseRequest,
  UpdateEndpointRequest,
  UpdateProjectRequest,
  UpdateRoleRequest,
} from './model';
import {
  marshalCreateBranchSchema,
  marshalCreateCatalogSchema,
  marshalCreateDataApiSchema,
  marshalCreateDatabaseSchema,
  marshalCreateEndpointSchema,
  marshalCreateProjectSchema,
  marshalCreateRoleSchema,
  marshalCreateSyncedTableSchema,
  marshalGenerateDatabaseCredentialRequestSchema,
  marshalUndeleteBranchRequestSchema,
  marshalUndeleteProjectRequestSchema,
  marshalUpdateBranchSchema,
  marshalUpdateDataApiSchema,
  marshalUpdateDatabaseSchema,
  marshalUpdateEndpointSchema,
  marshalUpdateProjectSchema,
  marshalUpdateRoleSchema,
  unmarshalBranchOperationMetadataSchema,
  unmarshalBranchSchema,
  unmarshalCatalogOperationMetadataSchema,
  unmarshalCatalogSchema,
  unmarshalDataApiOperationMetadataSchema,
  unmarshalDataApiSchema,
  unmarshalDatabaseCredentialSchema,
  unmarshalDatabaseOperationMetadataSchema,
  unmarshalDatabaseSchema,
  unmarshalEndpointOperationMetadataSchema,
  unmarshalEndpointSchema,
  unmarshalListBranchesResponseSchema,
  unmarshalListDatabasesResponseSchema,
  unmarshalListEndpointsResponseSchema,
  unmarshalListProjectsResponseSchema,
  unmarshalListRolesResponseSchema,
  unmarshalOperationSchema,
  unmarshalProjectOperationMetadataSchema,
  unmarshalProjectSchema,
  unmarshalRoleOperationMetadataSchema,
  unmarshalRoleSchema,
  unmarshalSyncedTableOperationMetadataSchema,
  unmarshalSyncedTableSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class PostgresClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /** Creates a new database branch in the project. */
  private async createBranchBase(
    req: CreateBranchRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.parent ?? ''}/branches`;
    const params = new URLSearchParams();
    if (req.branchId !== undefined) {
      params.append('branch_id', req.branchId);
    }
    if (req.replaceExisting !== undefined) {
      params.append('replace_existing', String(req.replaceExisting));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.branch, marshalCreateBranchSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a new database branch in the project. */
  async createBranch(
    req: CreateBranchRequest,
    options?: CallOptions
  ): Promise<CreateBranchOperation> {
    const op = await this.createBranchBase(req, options);
    return new CreateBranchOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Register a Postgres database in the Unity Catalog. */
  private async createCatalogBase(
    req: CreateCatalogRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/catalogs`;
    const params = new URLSearchParams();
    if (req.catalogId !== undefined) {
      params.append('catalog_id', req.catalogId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.catalog, marshalCreateCatalogSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Register a Postgres database in the Unity Catalog. */
  async createCatalog(
    req: CreateCatalogRequest,
    options?: CallOptions
  ): Promise<CreateCatalogOperation> {
    const op = await this.createCatalogBase(req, options);
    return new CreateCatalogOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Enable Data API for a database. */
  private async createDataApiBase(
    req: CreateDataApiRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.parent ?? ''}/data-api`;
    const body = marshalRequest(req.dataApi, marshalCreateDataApiSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Enable Data API for a database. */
  async createDataApi(
    req: CreateDataApiRequest,
    options?: CallOptions
  ): Promise<CreateDataApiOperation> {
    const op = await this.createDataApiBase(req, options);
    return new CreateDataApiOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /**
   * Create a Database.
   *
   * Creates a database in the specified branch. A branch can have multiple databases.
   */
  private async createDatabaseBase(
    req: CreateDatabaseRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.parent ?? ''}/databases`;
    const params = new URLSearchParams();
    if (req.databaseId !== undefined) {
      params.append('database_id', req.databaseId);
    }
    if (req.replaceExisting !== undefined) {
      params.append('replace_existing', String(req.replaceExisting));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.database, marshalCreateDatabaseSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Create a Database.
   *
   * Creates a database in the specified branch. A branch can have multiple databases.
   */
  async createDatabase(
    req: CreateDatabaseRequest,
    options?: CallOptions
  ): Promise<CreateDatabaseOperation> {
    const op = await this.createDatabaseBase(req, options);
    return new CreateDatabaseOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Creates a new compute endpoint in the branch. */
  private async createEndpointBase(
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.parent ?? ''}/endpoints`;
    const params = new URLSearchParams();
    if (req.endpointId !== undefined) {
      params.append('endpoint_id', req.endpointId);
    }
    if (req.replaceExisting !== undefined) {
      params.append('replace_existing', String(req.replaceExisting));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.endpoint, marshalCreateEndpointSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a new compute endpoint in the branch. */
  async createEndpoint(
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<CreateEndpointOperation> {
    const op = await this.createEndpointBase(req, options);
    return new CreateEndpointOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Creates a new Lakebase Autoscaling Postgres database project, which contains branches and compute endpoints. */
  private async createProjectBase(
    req: CreateProjectRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/projects`;
    const params = new URLSearchParams();
    if (req.projectId !== undefined) {
      params.append('project_id', req.projectId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.project, marshalCreateProjectSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a new Lakebase Autoscaling Postgres database project, which contains branches and compute endpoints. */
  async createProject(
    req: CreateProjectRequest,
    options?: CallOptions
  ): Promise<CreateProjectOperation> {
    const op = await this.createProjectBase(req, options);
    return new CreateProjectOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Creates a new Postgres role in the branch. */
  private async createRoleBase(
    req: CreateRoleRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.parent ?? ''}/roles`;
    const params = new URLSearchParams();
    if (req.roleId !== undefined) {
      params.append('role_id', req.roleId);
    }
    if (req.replaceExisting !== undefined) {
      params.append('replace_existing', String(req.replaceExisting));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.role, marshalCreateRoleSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a new Postgres role in the branch. */
  async createRole(
    req: CreateRoleRequest,
    options?: CallOptions
  ): Promise<CreateRoleOperation> {
    const op = await this.createRoleBase(req, options);
    return new CreateRoleOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Create a Synced Table. */
  private async createSyncedTableBase(
    req: CreateSyncedTableRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/synced_tables`;
    const params = new URLSearchParams();
    if (req.syncedTableId !== undefined) {
      params.append('synced_table_id', req.syncedTableId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.syncedTable,
      marshalCreateSyncedTableSchema
    );
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a Synced Table. */
  async createSyncedTable(
    req: CreateSyncedTableRequest,
    options?: CallOptions
  ): Promise<CreateSyncedTableOperation> {
    const op = await this.createSyncedTableBase(req, options);
    return new CreateSyncedTableOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Deletes the specified database branch. */
  private async deleteBranchBase(
    req: DeleteBranchRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.purge !== undefined) {
      params.append('purge', String(req.purge));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified database branch. */
  async deleteBranch(
    req: DeleteBranchRequest,
    options?: CallOptions
  ): Promise<DeleteBranchOperation> {
    const op = await this.deleteBranchBase(req, options);
    return new DeleteBranchOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Delete a Database Catalog. */
  private async deleteCatalogBase(
    req: DeleteCatalogRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a Database Catalog. */
  async deleteCatalog(
    req: DeleteCatalogRequest,
    options?: CallOptions
  ): Promise<DeleteCatalogOperation> {
    const op = await this.deleteCatalogBase(req, options);
    return new DeleteCatalogOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Disable Data API for a database. */
  private async deleteDataApiBase(
    req: DeleteDataApiRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Disable Data API for a database. */
  async deleteDataApi(
    req: DeleteDataApiRequest,
    options?: CallOptions
  ): Promise<DeleteDataApiOperation> {
    const op = await this.deleteDataApiBase(req, options);
    return new DeleteDataApiOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Delete a Database. */
  private async deleteDatabaseBase(
    req: DeleteDatabaseRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a Database. */
  async deleteDatabase(
    req: DeleteDatabaseRequest,
    options?: CallOptions
  ): Promise<DeleteDatabaseOperation> {
    const op = await this.deleteDatabaseBase(req, options);
    return new DeleteDatabaseOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Deletes the specified compute endpoint. */
  private async deleteEndpointBase(
    req: DeleteEndpointRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified compute endpoint. */
  async deleteEndpoint(
    req: DeleteEndpointRequest,
    options?: CallOptions
  ): Promise<DeleteEndpointOperation> {
    const op = await this.deleteEndpointBase(req, options);
    return new DeleteEndpointOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Deletes the specified database project. */
  private async deleteProjectBase(
    req: DeleteProjectRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.purge !== undefined) {
      params.append('purge', String(req.purge));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified database project. */
  async deleteProject(
    req: DeleteProjectRequest,
    options?: CallOptions
  ): Promise<DeleteProjectOperation> {
    const op = await this.deleteProjectBase(req, options);
    return new DeleteProjectOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Deletes the specified Postgres role. */
  private async deleteRoleBase(
    req: DeleteRoleRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.reassignOwnedTo !== undefined) {
      params.append('reassign_owned_to', req.reassignOwnedTo);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified Postgres role. */
  async deleteRole(
    req: DeleteRoleRequest,
    options?: CallOptions
  ): Promise<DeleteRoleOperation> {
    const op = await this.deleteRoleBase(req, options);
    return new DeleteRoleOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Delete a Synced Table. */
  private async deleteSyncedTableBase(
    req: DeleteSyncedTableRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Delete a Synced Table. */
  async deleteSyncedTable(
    req: DeleteSyncedTableRequest,
    options?: CallOptions
  ): Promise<DeleteSyncedTableOperation> {
    const op = await this.deleteSyncedTableBase(req, options);
    return new DeleteSyncedTableOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Generate OAuth credentials for a Postgres database. */
  async generateDatabaseCredential(
    req: GenerateDatabaseCredentialRequest,
    options?: CallOptions
  ): Promise<DatabaseCredential> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateDatabaseCredentialRequestSchema
    );
    let resp: DatabaseCredential | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseCredentialSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified database branch. */
  async getBranch(
    req: GetBranchRequest,
    options?: CallOptions
  ): Promise<Branch> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Branch | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBranchSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a Database Catalog. */
  async getCatalog(
    req: GetCatalogRequest,
    options?: CallOptions
  ): Promise<Catalog> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Catalog | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get Data API configuration for a database. */
  async getDataApi(
    req: GetDataApiRequest,
    options?: CallOptions
  ): Promise<DataApi> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: DataApi | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDataApiSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a Database. */
  async getDatabase(
    req: GetDatabaseRequest,
    options?: CallOptions
  ): Promise<Database> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Database | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified compute endpoint, including its connection details and operational state. */
  async getEndpoint(
    req: GetEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Endpoint | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves the status of a long-running operation. */
  private async getOperation(
    req: GetOperationRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified database project. */
  async getProject(
    req: GetProjectRequest,
    options?: CallOptions
  ): Promise<Project> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Project | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalProjectSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified Postgres role, including its authentication method and permissions. */
  async getRole(req: GetRoleRequest, options?: CallOptions): Promise<Role> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Role | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRoleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a Synced Table. */
  async getSyncedTable(
    req: GetSyncedTableRequest,
    options?: CallOptions
  ): Promise<SyncedTable> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: SyncedTable | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSyncedTableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Returns a paginated list of database branches in the project. */
  async listBranches(
    req: ListBranchesRequest,
    options?: CallOptions
  ): Promise<ListBranchesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.parent ?? ''}/branches`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.showDeleted !== undefined) {
      params.append('show_deleted', String(req.showDeleted));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListBranchesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListBranchesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listBranchesIter(
    req: ListBranchesRequest,
    options?: CallOptions
  ): AsyncGenerator<Branch> {
    const pageReq: ListBranchesRequest = {...req};
    for (;;) {
      const resp = await this.listBranches(pageReq, options);
      for (const item of resp.branches ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List Databases. */
  async listDatabases(
    req: ListDatabasesRequest,
    options?: CallOptions
  ): Promise<ListDatabasesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.parent ?? ''}/databases`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDatabasesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListDatabasesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listDatabasesIter(
    req: ListDatabasesRequest,
    options?: CallOptions
  ): AsyncGenerator<Database> {
    const pageReq: ListDatabasesRequest = {...req};
    for (;;) {
      const resp = await this.listDatabases(pageReq, options);
      for (const item of resp.databases ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Returns a paginated list of compute endpoints in the branch. */
  async listEndpoints(
    req: ListEndpointsRequest,
    options?: CallOptions
  ): Promise<ListEndpointsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.parent ?? ''}/endpoints`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListEndpointsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListEndpointsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listEndpointsIter(
    req: ListEndpointsRequest,
    options?: CallOptions
  ): AsyncGenerator<Endpoint> {
    const pageReq: ListEndpointsRequest = {...req};
    for (;;) {
      const resp = await this.listEndpoints(pageReq, options);
      for (const item of resp.endpoints ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Returns a paginated list of database projects in the workspace that the user has permission to access. */
  async listProjects(
    req: ListProjectsRequest,
    options?: CallOptions
  ): Promise<ListProjectsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/projects`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.showDeleted !== undefined) {
      params.append('show_deleted', String(req.showDeleted));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListProjectsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListProjectsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listProjectsIter(
    req: ListProjectsRequest,
    options?: CallOptions
  ): AsyncGenerator<Project> {
    const pageReq: ListProjectsRequest = {...req};
    for (;;) {
      const resp = await this.listProjects(pageReq, options);
      for (const item of resp.projects ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Returns a paginated list of Postgres roles in the branch. */
  async listRoles(
    req: ListRolesRequest,
    options?: CallOptions
  ): Promise<ListRolesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.parent ?? ''}/roles`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListRolesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListRolesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listRolesIter(
    req: ListRolesRequest,
    options?: CallOptions
  ): AsyncGenerator<Role> {
    const pageReq: ListRolesRequest = {...req};
    for (;;) {
      const resp = await this.listRoles(pageReq, options);
      for (const item of resp.roles ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Undeletes the specified database branch. */
  private async undeleteBranchBase(
    req: UndeleteBranchRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}/undelete`;
    const body = marshalRequest(req, marshalUndeleteBranchRequestSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Undeletes the specified database branch. */
  async undeleteBranch(
    req: UndeleteBranchRequest,
    options?: CallOptions
  ): Promise<UndeleteBranchOperation> {
    const op = await this.undeleteBranchBase(req, options);
    return new UndeleteBranchOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Undeletes a soft-deleted project. */
  private async undeleteProjectBase(
    req: UndeleteProjectRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.name ?? ''}/undelete`;
    const body = marshalRequest(req, marshalUndeleteProjectRequestSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Undeletes a soft-deleted project. */
  async undeleteProject(
    req: UndeleteProjectRequest,
    options?: CallOptions
  ): Promise<UndeleteProjectOperation> {
    const op = await this.undeleteProjectBase(req, options);
    return new UndeleteProjectOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Updates the specified database branch. You can set this branch as the project's default branch, or protect/unprotect it. */
  private async updateBranchBase(
    req: UpdateBranchRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.branch?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.branch, marshalUpdateBranchSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the specified database branch. You can set this branch as the project's default branch, or protect/unprotect it. */
  async updateBranch(
    req: UpdateBranchRequest,
    options?: CallOptions
  ): Promise<UpdateBranchOperation> {
    const op = await this.updateBranchBase(req, options);
    return new UpdateBranchOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Update Data API configuration for a database. */
  private async updateDataApiBase(
    req: UpdateDataApiRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.dataApi?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.dataApi, marshalUpdateDataApiSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update Data API configuration for a database. */
  async updateDataApi(
    req: UpdateDataApiRequest,
    options?: CallOptions
  ): Promise<UpdateDataApiOperation> {
    const op = await this.updateDataApiBase(req, options);
    return new UpdateDataApiOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Update a Database. */
  private async updateDatabaseBase(
    req: UpdateDatabaseRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.database?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.database, marshalUpdateDatabaseSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update a Database. */
  async updateDatabase(
    req: UpdateDatabaseRequest,
    options?: CallOptions
  ): Promise<UpdateDatabaseOperation> {
    const op = await this.updateDatabaseBase(req, options);
    return new UpdateDatabaseOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Updates the specified compute endpoint. You can update autoscaling limits, suspend timeout, or enable/disable the compute endpoint. */
  private async updateEndpointBase(
    req: UpdateEndpointRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.endpoint?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.endpoint, marshalUpdateEndpointSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the specified compute endpoint. You can update autoscaling limits, suspend timeout, or enable/disable the compute endpoint. */
  async updateEndpoint(
    req: UpdateEndpointRequest,
    options?: CallOptions
  ): Promise<UpdateEndpointOperation> {
    const op = await this.updateEndpointBase(req, options);
    return new UpdateEndpointOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Updates the specified database project. */
  private async updateProjectBase(
    req: UpdateProjectRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.project?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.project, marshalUpdateProjectSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the specified database project. */
  async updateProject(
    req: UpdateProjectRequest,
    options?: CallOptions
  ): Promise<UpdateProjectOperation> {
    const op = await this.updateProjectBase(req, options);
    return new UpdateProjectOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /** Update a role for a branch. */
  private async updateRoleBase(
    req: UpdateRoleRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/postgres/${req.role?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.role, marshalUpdateRoleSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Update a role for a branch. */
  async updateRole(
    req: UpdateRoleRequest,
    options?: CallOptions
  ): Promise<UpdateRoleOperation> {
    const op = await this.updateRoleBase(req, options);
    return new UpdateRoleOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }
}

export class CreateBranchOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<BranchOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalBranchOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Branch> {
    let result: Branch | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalBranchSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class CreateCatalogOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<CatalogOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalCatalogOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Catalog> {
    let result: Catalog | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalCatalogSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class CreateDataApiOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<DataApiOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalDataApiOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<DataApi> {
    let result: DataApi | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalDataApiSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class CreateDatabaseOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<DatabaseOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalDatabaseOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Database> {
    let result: Database | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalDatabaseSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class CreateEndpointOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<EndpointOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalEndpointOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Endpoint> {
    let result: Endpoint | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalEndpointSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class CreateProjectOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<ProjectOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalProjectOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Project> {
    let result: Project | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalProjectSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class CreateRoleOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<RoleOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalRoleOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Role> {
    let result: Role | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalRoleSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class CreateSyncedTableOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<SyncedTableOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalSyncedTableOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<SyncedTable> {
    let result: SyncedTable | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z
        .lazy(() => unmarshalSyncedTableSchema)
        .parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class DeleteBranchOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<BranchOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalBranchOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class DeleteCatalogOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<CatalogOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalCatalogOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class DeleteDataApiOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<DataApiOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalDataApiOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class DeleteDatabaseOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<DatabaseOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalDatabaseOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class DeleteEndpointOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<EndpointOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalEndpointOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class DeleteProjectOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<ProjectOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalProjectOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class DeleteRoleOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<RoleOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalRoleOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class DeleteSyncedTableOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<SyncedTableOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalSyncedTableOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class UndeleteBranchOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<BranchOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalBranchOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class UndeleteProjectOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<ProjectOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalProjectOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<void> {
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    await executeWait(call, options);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class UpdateBranchOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<BranchOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalBranchOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Branch> {
    let result: Branch | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalBranchSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class UpdateDataApiOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<DataApiOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalDataApiOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<DataApi> {
    let result: DataApi | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalDataApiSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class UpdateDatabaseOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<DatabaseOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalDatabaseOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Database> {
    let result: Database | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalDatabaseSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class UpdateEndpointOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<EndpointOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalEndpointOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Endpoint> {
    let result: Endpoint | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalEndpointSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class UpdateProjectOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<ProjectOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalProjectOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Project> {
    let result: Project | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalProjectSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}

export class UpdateRoleOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<RoleOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalRoleOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<Role> {
    let result: Role | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalRoleSchema).parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.getOperation({name: this.operation.name}, options);
    this.operation = op;
    return op.done;
  }
}
