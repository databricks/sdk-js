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
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
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
  CreateDatabaseRequest,
  CreateEndpointRequest,
  CreateProjectRequest,
  CreateRoleRequest,
  CreateSyncedTableRequest,
  Database,
  DatabaseCredential,
  DatabaseOperationMetadata,
  DeleteBranchRequest,
  DeleteCatalogRequest,
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
  UpdateDatabaseRequest,
  UpdateEndpointRequest,
  UpdateProjectRequest,
  UpdateRoleRequest,
} from './model';
import {
  marshalBranchSchema,
  marshalCatalogSchema,
  marshalDatabaseSchema,
  marshalEndpointSchema,
  marshalGenerateDatabaseCredentialRequestSchema,
  marshalProjectSchema,
  marshalRoleSchema,
  marshalSyncedTableSchema,
  marshalUndeleteBranchRequestSchema,
  marshalUndeleteProjectRequestSchema,
  unmarshalBranchOperationMetadataSchema,
  unmarshalBranchSchema,
  unmarshalCatalogOperationMetadataSchema,
  unmarshalCatalogSchema,
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

export class Client {
  private readonly host: string;
  // Workspace ID used to route workspace-level calls on unified hosts (SPOG).
  // When set, workspace-level methods send X-Databricks-Org-Id on every
  // request.
  private readonly workspaceId: string | undefined;
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
    this.workspaceId = options.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    let info = createDefault().with(PACKAGE_SEGMENT);
    if (options.credentials !== undefined) {
      info = info
        .with({key: 'sdk-js-auth', value: AUTH_VERSION})
        .with({key: 'auth', value: options.credentials.name()});
    }
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Creates a new database branch in the project. */
  async createBranch(
    req: CreateBranchRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/branches`;
    const params = new URLSearchParams();
    if (req.branchId !== undefined) {
      params.append('branch_id', req.branchId);
    }
    if (req.replaceExisting !== undefined) {
      params.append('replace_existing', String(req.replaceExisting));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.branch, marshalBranchSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createBranchOperation(
    req: CreateBranchRequest,
    options?: CallOptions
  ): Promise<CreateBranchOperation> {
    const op = await this.createBranch(req, options);
    return new CreateBranchOperation(this, op);
  }

  /** Register a Postgres database in the Unity Catalog. */
  async createCatalog(
    req: CreateCatalogRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/catalogs`;
    const params = new URLSearchParams();
    if (req.catalogId !== undefined) {
      params.append('catalog_id', req.catalogId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.catalog, marshalCatalogSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createCatalogOperation(
    req: CreateCatalogRequest,
    options?: CallOptions
  ): Promise<CreateCatalogOperation> {
    const op = await this.createCatalog(req, options);
    return new CreateCatalogOperation(this, op);
  }

  /**
   * Create a Database.
   *
   * Creates a database in the specified branch. A branch can have multiple databases.
   */
  async createDatabase(
    req: CreateDatabaseRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/databases`;
    const params = new URLSearchParams();
    if (req.databaseId !== undefined) {
      params.append('database_id', req.databaseId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.database, marshalDatabaseSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createDatabaseOperation(
    req: CreateDatabaseRequest,
    options?: CallOptions
  ): Promise<CreateDatabaseOperation> {
    const op = await this.createDatabase(req, options);
    return new CreateDatabaseOperation(this, op);
  }

  /** Creates a new compute endpoint in the branch. */
  async createEndpoint(
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/endpoints`;
    const params = new URLSearchParams();
    if (req.endpointId !== undefined) {
      params.append('endpoint_id', req.endpointId);
    }
    if (req.replaceExisting !== undefined) {
      params.append('replace_existing', String(req.replaceExisting));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.endpoint, marshalEndpointSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createEndpointOperation(
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<CreateEndpointOperation> {
    const op = await this.createEndpoint(req, options);
    return new CreateEndpointOperation(this, op);
  }

  /** Creates a new Lakebase Autoscaling Postgres database project, which contains branches and compute endpoints. */
  async createProject(
    req: CreateProjectRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/projects`;
    const params = new URLSearchParams();
    if (req.projectId !== undefined) {
      params.append('project_id', req.projectId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.project, marshalProjectSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createProjectOperation(
    req: CreateProjectRequest,
    options?: CallOptions
  ): Promise<CreateProjectOperation> {
    const op = await this.createProject(req, options);
    return new CreateProjectOperation(this, op);
  }

  /** Creates a new Postgres role in the branch. */
  async createRole(
    req: CreateRoleRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/roles`;
    const params = new URLSearchParams();
    if (req.roleId !== undefined) {
      params.append('role_id', req.roleId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.role, marshalRoleSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createRoleOperation(
    req: CreateRoleRequest,
    options?: CallOptions
  ): Promise<CreateRoleOperation> {
    const op = await this.createRole(req, options);
    return new CreateRoleOperation(this, op);
  }

  /** Create a Synced Table. */
  async createSyncedTable(
    req: CreateSyncedTableRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/synced_tables`;
    const params = new URLSearchParams();
    if (req.syncedTableId !== undefined) {
      params.append('synced_table_id', req.syncedTableId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.syncedTable, marshalSyncedTableSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createSyncedTableOperation(
    req: CreateSyncedTableRequest,
    options?: CallOptions
  ): Promise<CreateSyncedTableOperation> {
    const op = await this.createSyncedTable(req, options);
    return new CreateSyncedTableOperation(this, op);
  }

  /** Deletes the specified database branch. */
  async deleteBranch(
    req: DeleteBranchRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.purge !== undefined) {
      params.append('purge', String(req.purge));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteBranchOperation(
    req: DeleteBranchRequest,
    options?: CallOptions
  ): Promise<DeleteBranchOperation> {
    const op = await this.deleteBranch(req, options);
    return new DeleteBranchOperation(this, op);
  }

  /** Delete a Database Catalog. */
  async deleteCatalog(
    req: DeleteCatalogRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteCatalogOperation(
    req: DeleteCatalogRequest,
    options?: CallOptions
  ): Promise<DeleteCatalogOperation> {
    const op = await this.deleteCatalog(req, options);
    return new DeleteCatalogOperation(this, op);
  }

  /** Delete a Database. */
  async deleteDatabase(
    req: DeleteDatabaseRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteDatabaseOperation(
    req: DeleteDatabaseRequest,
    options?: CallOptions
  ): Promise<DeleteDatabaseOperation> {
    const op = await this.deleteDatabase(req, options);
    return new DeleteDatabaseOperation(this, op);
  }

  /** Deletes the specified compute endpoint. */
  async deleteEndpoint(
    req: DeleteEndpointRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteEndpointOperation(
    req: DeleteEndpointRequest,
    options?: CallOptions
  ): Promise<DeleteEndpointOperation> {
    const op = await this.deleteEndpoint(req, options);
    return new DeleteEndpointOperation(this, op);
  }

  /** Deletes the specified database project. */
  async deleteProject(
    req: DeleteProjectRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.purge !== undefined) {
      params.append('purge', String(req.purge));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteProjectOperation(
    req: DeleteProjectRequest,
    options?: CallOptions
  ): Promise<DeleteProjectOperation> {
    const op = await this.deleteProject(req, options);
    return new DeleteProjectOperation(this, op);
  }

  /** Deletes the specified Postgres role. */
  async deleteRole(
    req: DeleteRoleRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.reassignOwnedTo !== undefined) {
      params.append('reassign_owned_to', req.reassignOwnedTo);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteRoleOperation(
    req: DeleteRoleRequest,
    options?: CallOptions
  ): Promise<DeleteRoleOperation> {
    const op = await this.deleteRole(req, options);
    return new DeleteRoleOperation(this, op);
  }

  /** Delete a Synced Table. */
  async deleteSyncedTable(
    req: DeleteSyncedTableRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteSyncedTableOperation(
    req: DeleteSyncedTableRequest,
    options?: CallOptions
  ): Promise<DeleteSyncedTableOperation> {
    const op = await this.deleteSyncedTable(req, options);
    return new DeleteSyncedTableOperation(this, op);
  }

  /** Generate OAuth credentials for a Postgres database. */
  async generateDatabaseCredential(
    req: GenerateDatabaseCredentialRequest,
    options?: CallOptions
  ): Promise<DatabaseCredential> {
    const url = `${this.host}/api/2.0/postgres/credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateDatabaseCredentialRequestSchema
    );
    let resp: DatabaseCredential | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalDatabaseCredentialSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified database branch. */
  async getBranch(
    req: GetBranchRequest,
    options?: CallOptions
  ): Promise<Branch> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Branch | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBranchSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database Catalog. */
  async getCatalog(
    req: GetCatalogRequest,
    options?: CallOptions
  ): Promise<Catalog> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Catalog | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database. */
  async getDatabase(
    req: GetDatabaseRequest,
    options?: CallOptions
  ): Promise<Database> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Database | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified compute endpoint, including its connection details and operational state. */
  async getEndpoint(
    req: GetEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the status of a long-running operation. */
  async getOperation(
    req: GetOperationRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified database project. */
  async getProject(
    req: GetProjectRequest,
    options?: CallOptions
  ): Promise<Project> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Project | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalProjectSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified Postgres role, including its authentication method and permissions. */
  async getRole(req: GetRoleRequest, options?: CallOptions): Promise<Role> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Role | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRoleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Synced Table. */
  async getSyncedTable(
    req: GetSyncedTableRequest,
    options?: CallOptions
  ): Promise<SyncedTable> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: SyncedTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSyncedTableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns a paginated list of database branches in the project. */
  async listBranches(
    req: ListBranchesRequest,
    options?: CallOptions
  ): Promise<ListBranchesResponse> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/branches`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalListBranchesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/databases`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalListDatabasesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/endpoints`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalListEndpointsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    const url = `${this.host}/api/2.0/postgres/projects`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalListProjectsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/roles`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalListRolesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  async undeleteBranch(
    req: UndeleteBranchRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}/undelete`;
    const body = marshalRequest(req, marshalUndeleteBranchRequestSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async undeleteBranchOperation(
    req: UndeleteBranchRequest,
    options?: CallOptions
  ): Promise<UndeleteBranchOperation> {
    const op = await this.undeleteBranch(req, options);
    return new UndeleteBranchOperation(this, op);
  }

  /** Undeletes a soft-deleted project. */
  async undeleteProject(
    req: UndeleteProjectRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}/undelete`;
    const body = marshalRequest(req, marshalUndeleteProjectRequestSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async undeleteProjectOperation(
    req: UndeleteProjectRequest,
    options?: CallOptions
  ): Promise<UndeleteProjectOperation> {
    const op = await this.undeleteProject(req, options);
    return new UndeleteProjectOperation(this, op);
  }

  /** Updates the specified database branch. You can set this branch as the project's default branch, or protect/unprotect it. */
  async updateBranch(
    req: UpdateBranchRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.branch?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.branch, marshalBranchSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateBranchOperation(
    req: UpdateBranchRequest,
    options?: CallOptions
  ): Promise<UpdateBranchOperation> {
    const op = await this.updateBranch(req, options);
    return new UpdateBranchOperation(this, op);
  }

  /** Update a Database. */
  async updateDatabase(
    req: UpdateDatabaseRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.database?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.database, marshalDatabaseSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateDatabaseOperation(
    req: UpdateDatabaseRequest,
    options?: CallOptions
  ): Promise<UpdateDatabaseOperation> {
    const op = await this.updateDatabase(req, options);
    return new UpdateDatabaseOperation(this, op);
  }

  /** Updates the specified compute endpoint. You can update autoscaling limits, suspend timeout, or enable/disable the compute endpoint. */
  async updateEndpoint(
    req: UpdateEndpointRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.endpoint?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.endpoint, marshalEndpointSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateEndpointOperation(
    req: UpdateEndpointRequest,
    options?: CallOptions
  ): Promise<UpdateEndpointOperation> {
    const op = await this.updateEndpoint(req, options);
    return new UpdateEndpointOperation(this, op);
  }

  /** Updates the specified database project. */
  async updateProject(
    req: UpdateProjectRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.project?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.project, marshalProjectSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateProjectOperation(
    req: UpdateProjectRequest,
    options?: CallOptions
  ): Promise<UpdateProjectOperation> {
    const op = await this.updateProject(req, options);
    return new UpdateProjectOperation(this, op);
  }

  /** Update a role for a branch. */
  async updateRole(
    req: UpdateRoleRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.role?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.role, marshalRoleSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateRoleOperation(
    req: UpdateRoleRequest,
    options?: CallOptions
  ): Promise<UpdateRoleOperation> {
    const op = await this.updateRole(req, options);
    return new UpdateRoleOperation(this, op);
  }
}

export class CreateBranchOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Branch> {
    const errStillRunning = new Error('operation still in progress');
    let result: Branch | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class CreateCatalogOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Catalog> {
    const errStillRunning = new Error('operation still in progress');
    let result: Catalog | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class CreateDatabaseOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Database> {
    const errStillRunning = new Error('operation still in progress');
    let result: Database | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class CreateEndpointOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Endpoint> {
    const errStillRunning = new Error('operation still in progress');
    let result: Endpoint | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class CreateProjectOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Project> {
    const errStillRunning = new Error('operation still in progress');
    let result: Project | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class CreateRoleOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Role> {
    const errStillRunning = new Error('operation still in progress');
    let result: Role | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class CreateSyncedTableOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<SyncedTable> {
    const errStillRunning = new Error('operation still in progress');
    let result: SyncedTable | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class DeleteBranchOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class DeleteCatalogOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class DeleteDatabaseOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class DeleteEndpointOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class DeleteProjectOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class DeleteRoleOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class DeleteSyncedTableOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UndeleteBranchOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UndeleteProjectOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UpdateBranchOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Branch> {
    const errStillRunning = new Error('operation still in progress');
    let result: Branch | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UpdateDatabaseOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Database> {
    const errStillRunning = new Error('operation still in progress');
    let result: Database | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UpdateEndpointOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Endpoint> {
    const errStillRunning = new Error('operation still in progress');
    let result: Endpoint | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UpdateProjectOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Project> {
    const errStillRunning = new Error('operation still in progress');
    let result: Project | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UpdateRoleOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<Role> {
    const errStillRunning = new Error('operation still in progress');
    let result: Role | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}
