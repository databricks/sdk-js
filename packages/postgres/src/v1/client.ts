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
  Branch,
  Catalog,
  ComputeInstance,
  CreateBranchRequest,
  CreateCatalogRequest,
  CreateDatabaseRequest,
  CreateEndpointRequest,
  CreateProjectRequest,
  CreateRoleRequest,
  CreateSyncedTableRequest,
  CreateTableRequest,
  Database,
  DatabaseCredential,
  DeleteBranchRequest,
  DeleteCatalogRequest,
  DeleteDatabaseRequest,
  DeleteEndpointRequest,
  DeleteProjectRequest,
  DeleteRoleRequest,
  DeleteSyncedTableRequest,
  DeleteTableRequest,
  DisableForwardEtlRequest,
  DisableForwardEtlResponse,
  Endpoint,
  ForwardEtlMetadata,
  ForwardEtlStatus,
  GenerateDatabaseCredentialRequest,
  GetBranchRequest,
  GetCatalogRequest,
  GetComputeInstanceRequest,
  GetDatabaseRequest,
  GetEndpointRequest,
  GetForwardEtlMetadataRequest,
  GetForwardEtlStatusRequest,
  GetOperationRequest,
  GetProjectRequest,
  GetRoleRequest,
  GetSyncedTableRequest,
  GetTableRequest,
  ListBranchesRequest,
  ListBranchesResponse,
  ListComputeInstancesRequest,
  ListComputeInstancesResponse,
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
  Role,
  SyncedTable,
  Table,
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
  marshalTableSchema,
  unmarshalBranchSchema,
  unmarshalCatalogSchema,
  unmarshalComputeInstanceSchema,
  unmarshalDatabaseCredentialSchema,
  unmarshalDatabaseSchema,
  unmarshalDisableForwardEtlResponseSchema,
  unmarshalEndpointSchema,
  unmarshalForwardEtlMetadataSchema,
  unmarshalForwardEtlStatusSchema,
  unmarshalListBranchesResponseSchema,
  unmarshalListComputeInstancesResponseSchema,
  unmarshalListDatabasesResponseSchema,
  unmarshalListEndpointsResponseSchema,
  unmarshalListProjectsResponseSchema,
  unmarshalListRolesResponseSchema,
  unmarshalOperationSchema,
  unmarshalProjectSchema,
  unmarshalRoleSchema,
  unmarshalSyncedTableSchema,
  unmarshalTableSchema,
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

  /** Creates a new database branch in the project. */
  async createBranch(
    signal: AbortSignal | undefined,
    req: CreateBranchRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/branches`;
    const params = new URLSearchParams();
    if (req.branchId !== undefined) {
      params.append('branch_id', req.branchId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.branch, marshalBranchSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Register a Postgres database in the Unity Catalog. */
  async createCatalog(
    signal: AbortSignal | undefined,
    req: CreateCatalogRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Create a Database.
   *
   * Creates a database in the specified branch. A branch can have multiple databases.
   */
  async createDatabase(
    signal: AbortSignal | undefined,
    req: CreateDatabaseRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a new compute endpoint in the branch. */
  async createEndpoint(
    signal: AbortSignal | undefined,
    req: CreateEndpointRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/endpoints`;
    const params = new URLSearchParams();
    if (req.endpointId !== undefined) {
      params.append('endpoint_id', req.endpointId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.endpoint, marshalEndpointSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a new Lakebase Autoscaling Postgres database project, which contains branches and compute endpoints. */
  async createProject(
    signal: AbortSignal | undefined,
    req: CreateProjectRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a new Postgres role in the branch. */
  async createRole(
    signal: AbortSignal | undefined,
    req: CreateRoleRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a Synced Table. */
  async createSyncedTable(
    signal: AbortSignal | undefined,
    req: CreateSyncedTableRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('POST', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a Table (non-synced database table for Autoscaling v2 Lakebase projects). */
  async createTable(
    signal: AbortSignal | undefined,
    req: CreateTableRequest,
    options?: Options
  ): Promise<Table> {
    const url = `${this.host}/api/2.0/postgres/tables`;
    const body = marshalRequest(req.table, marshalTableSchema);
    let resp: Table | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified database branch. */
  async deleteBranch(
    signal: AbortSignal | undefined,
    req: DeleteBranchRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a Database Catalog. */
  async deleteCatalog(
    signal: AbortSignal | undefined,
    req: DeleteCatalogRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a Database. */
  async deleteDatabase(
    signal: AbortSignal | undefined,
    req: DeleteDatabaseRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified compute endpoint. */
  async deleteEndpoint(
    signal: AbortSignal | undefined,
    req: DeleteEndpointRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified database project. */
  async deleteProject(
    signal: AbortSignal | undefined,
    req: DeleteProjectRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified Postgres role. */
  async deleteRole(
    signal: AbortSignal | undefined,
    req: DeleteRoleRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a Synced Table. */
  async deleteSyncedTable(
    signal: AbortSignal | undefined,
    req: DeleteSyncedTableRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a Table (non-synced database table for Autoscaling v2 Lakebase projects). */
  async deleteTable(
    signal: AbortSignal | undefined,
    req: DeleteTableRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/postgres/tables/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Disable Forward ETL for a branch. */
  async disableForwardEtl(
    signal: AbortSignal | undefined,
    req: DisableForwardEtlRequest,
    options?: Options
  ): Promise<DisableForwardEtlResponse> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/forward-etl`;
    const params = new URLSearchParams();
    if (req.tenantId !== undefined) {
      params.append('tenant_id', req.tenantId);
    }
    if (req.timelineId !== undefined) {
      params.append('timeline_id', req.timelineId);
    }
    if (req.pgDatabaseOid !== undefined) {
      params.append('pg_database_oid', String(req.pgDatabaseOid));
    }
    if (req.pgSchemaOid !== undefined) {
      params.append('pg_schema_oid', String(req.pgSchemaOid));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DisableForwardEtlResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDisableForwardEtlResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Generate OAuth credentials for a Postgres database. */
  async generateDatabaseCredential(
    signal: AbortSignal | undefined,
    req: GenerateDatabaseCredentialRequest,
    options?: Options
  ): Promise<DatabaseCredential> {
    const url = `${this.host}/api/2.0/postgres/credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateDatabaseCredentialRequestSchema
    );
    let resp: DatabaseCredential | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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

  /** Retrieves information about the specified database branch. */
  async getBranch(
    signal: AbortSignal | undefined,
    req: GetBranchRequest,
    options?: Options
  ): Promise<Branch> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Branch | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBranchSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database Catalog. */
  async getCatalog(
    signal: AbortSignal | undefined,
    req: GetCatalogRequest,
    options?: Options
  ): Promise<Catalog> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Catalog | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCatalogSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the specific compute instance under an endpoint.
   * Note: ComputeInstances are managed via the parent Endpoint resource, and cannot be created, updated, or deleted directly.
   */
  async getComputeInstance(
    signal: AbortSignal | undefined,
    req: GetComputeInstanceRequest,
    options?: Options
  ): Promise<ComputeInstance> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: ComputeInstance | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalComputeInstanceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Database. */
  async getDatabase(
    signal: AbortSignal | undefined,
    req: GetDatabaseRequest,
    options?: Options
  ): Promise<Database> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Database | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatabaseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified compute endpoint, including its connection details and operational state. */
  async getEndpoint(
    signal: AbortSignal | undefined,
    req: GetEndpointRequest,
    options?: Options
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get Forward ETL metadata (database and schema OIDs). */
  async getForwardEtlMetadata(
    signal: AbortSignal | undefined,
    req: GetForwardEtlMetadataRequest,
    options?: Options
  ): Promise<ForwardEtlMetadata> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/forward-etl/metadata`;
    const params = new URLSearchParams();
    if (req.tenantId !== undefined) {
      params.append('tenant_id', req.tenantId);
    }
    if (req.timelineId !== undefined) {
      params.append('timeline_id', req.timelineId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ForwardEtlMetadata | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalForwardEtlMetadataSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get Forward ETL configuration and status for a branch. */
  async getForwardEtlStatus(
    signal: AbortSignal | undefined,
    req: GetForwardEtlStatusRequest,
    options?: Options
  ): Promise<ForwardEtlStatus> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/forward-etl`;
    const params = new URLSearchParams();
    if (req.tenantId !== undefined) {
      params.append('tenant_id', req.tenantId);
    }
    if (req.timelineId !== undefined) {
      params.append('timeline_id', req.timelineId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ForwardEtlStatus | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalForwardEtlStatusSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the status of a long-running operation. */
  async getOperation(
    signal: AbortSignal | undefined,
    req: GetOperationRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified database project. */
  async getProject(
    signal: AbortSignal | undefined,
    req: GetProjectRequest,
    options?: Options
  ): Promise<Project> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Project | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalProjectSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information about the specified Postgres role, including its authentication method and permissions. */
  async getRole(
    signal: AbortSignal | undefined,
    req: GetRoleRequest,
    options?: Options
  ): Promise<Role> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: Role | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRoleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Synced Table. */
  async getSyncedTable(
    signal: AbortSignal | undefined,
    req: GetSyncedTableRequest,
    options?: Options
  ): Promise<SyncedTable> {
    const url = `${this.host}/api/2.0/postgres/${req.name ?? ''}`;
    let resp: SyncedTable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSyncedTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a Table (non-synced database table for Autoscaling v2 Lakebase projects). */
  async getTable(
    signal: AbortSignal | undefined,
    req: GetTableRequest,
    options?: Options
  ): Promise<Table> {
    const url = `${this.host}/api/2.0/postgres/tables/${req.name ?? ''}`;
    let resp: Table | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTableSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns a paginated list of database branches in the project. */
  async listBranches(
    signal: AbortSignal | undefined,
    req: ListBranchesRequest,
    options?: Options
  ): Promise<ListBranchesResponse> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/branches`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListBranchesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListBranchesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listBranchesIter(
    signal: AbortSignal | undefined,
    req: ListBranchesRequest,
    options?: Options
  ): AsyncGenerator<Branch> {
    const pageReq: ListBranchesRequest = {...req};
    for (;;) {
      const resp = await this.listBranches(signal, pageReq, options);
      for (const item of resp.branches ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Lists all compute instances that have been created under the specified endpoint.
   * Note: ComputeInstances are managed via the parent Endpoint resource, and cannot be created, updated, or deleted directly.
   */
  async listComputeInstances(
    signal: AbortSignal | undefined,
    req: ListComputeInstancesRequest,
    options?: Options
  ): Promise<ListComputeInstancesResponse> {
    const url = `${this.host}/api/2.0/postgres/${req.parent ?? ''}/compute-instances`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListComputeInstancesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListComputeInstancesResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listComputeInstancesIter(
    signal: AbortSignal | undefined,
    req: ListComputeInstancesRequest,
    options?: Options
  ): AsyncGenerator<ComputeInstance> {
    const pageReq: ListComputeInstancesRequest = {...req};
    for (;;) {
      const resp = await this.listComputeInstances(signal, pageReq, options);
      for (const item of resp.computeInstances ?? []) {
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
    signal: AbortSignal | undefined,
    req: ListDatabasesRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListDatabasesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listDatabasesIter(
    signal: AbortSignal | undefined,
    req: ListDatabasesRequest,
    options?: Options
  ): AsyncGenerator<Database> {
    const pageReq: ListDatabasesRequest = {...req};
    for (;;) {
      const resp = await this.listDatabases(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListEndpointsRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListEndpointsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listEndpointsIter(
    signal: AbortSignal | undefined,
    req: ListEndpointsRequest,
    options?: Options
  ): AsyncGenerator<Endpoint> {
    const pageReq: ListEndpointsRequest = {...req};
    for (;;) {
      const resp = await this.listEndpoints(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListProjectsRequest,
    options?: Options
  ): Promise<ListProjectsResponse> {
    const url = `${this.host}/api/2.0/postgres/projects`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListProjectsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListProjectsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listProjectsIter(
    signal: AbortSignal | undefined,
    req: ListProjectsRequest,
    options?: Options
  ): AsyncGenerator<Project> {
    const pageReq: ListProjectsRequest = {...req};
    for (;;) {
      const resp = await this.listProjects(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListRolesRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListRolesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listRolesIter(
    signal: AbortSignal | undefined,
    req: ListRolesRequest,
    options?: Options
  ): AsyncGenerator<Role> {
    const pageReq: ListRolesRequest = {...req};
    for (;;) {
      const resp = await this.listRoles(signal, pageReq, options);
      for (const item of resp.roles ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates the specified database branch. You can set this branch as the project's default branch, or protect/unprotect it. */
  async updateBranch(
    signal: AbortSignal | undefined,
    req: UpdateBranchRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.branch?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.branch, marshalBranchSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a Database. */
  async updateDatabase(
    signal: AbortSignal | undefined,
    req: UpdateDatabaseRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.database?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.database, marshalDatabaseSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the specified compute endpoint. You can update autoscaling limits, suspend timeout, or enable/disable the compute endpoint. */
  async updateEndpoint(
    signal: AbortSignal | undefined,
    req: UpdateEndpointRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.endpoint?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.endpoint, marshalEndpointSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the specified database project. */
  async updateProject(
    signal: AbortSignal | undefined,
    req: UpdateProjectRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.project?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.project, marshalProjectSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a role for a branch. */
  async updateRole(
    signal: AbortSignal | undefined,
    req: UpdateRoleRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/postgres/${req.role?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.role, marshalRoleSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
