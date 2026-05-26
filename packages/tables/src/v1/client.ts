// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
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
import type {
  CreateTableConstraintRequest,
  CreateTableRequest,
  DeleteTableConstraintRequest,
  DeleteTableConstraintRequest_Response,
  DeleteTableRequest,
  DeleteTableRequest_Response,
  GetTableRequest,
  ListTableSummariesRequest,
  ListTableSummariesRequest_Response,
  ListTablesRequest,
  ListTablesRequest_Response,
  TableConstraint,
  TableExistsRequest,
  TableExistsRequest_Response,
  TableInfo,
  TableSummary,
  UpdateTableRequest,
  UpdateTableRequest_Response,
} from './model';
import {
  marshalCreateTableConstraintRequestSchema,
  marshalCreateTableRequestSchema,
  marshalUpdateTableRequestSchema,
  unmarshalDeleteTableConstraintRequest_ResponseSchema,
  unmarshalDeleteTableRequest_ResponseSchema,
  unmarshalListTableSummariesRequest_ResponseSchema,
  unmarshalListTablesRequest_ResponseSchema,
  unmarshalTableConstraintSchema,
  unmarshalTableExistsRequest_ResponseSchema,
  unmarshalTableInfoSchema,
  unmarshalUpdateTableRequest_ResponseSchema,
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

  /**
   * Creates a new table in the specified catalog and schema.
   *
   * To create an external delta table, the caller must have the **EXTERNAL_USE_SCHEMA** privilege on the parent schema
   * and the **EXTERNAL_USE_LOCATION** privilege on the external location. These privileges must always be granted explicitly,
   * and cannot be inherited through ownership or **ALL_PRIVILEGES**.
   *
   * Standard UC permissions needed to create tables still apply: **USE_CATALOG** on the parent catalog (or ownership of
   * the parent catalog), **CREATE_TABLE** and **USE_SCHEMA** on the parent schema (or ownership of the parent schema),
   * and **CREATE_EXTERNAL_TABLE** on external location.
   *
   * The **columns** field needs to be in a Spark compatible format, so we recommend you use Spark to create these tables.
   * The API itself does not validate the correctness of the column spec. If the spec is not Spark compatible,
   * the tables may not be readable by Databricks Runtime.
   *
   *
   *
   *
   *
   *
   *
   * NOTE: The Create Table API for external clients only supports creating **external delta tables**. The values shown
   * in the respective enums are all values supported by <Databricks>, however for this specific Create Table API,
   * only **table_type** **EXTERNAL** and **data_source_format** **DELTA** are supported. Additionally, column masks
   * are not supported when creating tables through this API.
   */
  async createTable(
    req: CreateTableRequest,
    options?: CallOptions
  ): Promise<TableInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/tables`;
    const body = marshalRequest(req, marshalCreateTableRequestSchema);
    let resp: TableInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalTableInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new table constraint.
   *
   * For the table constraint creation to succeed, the user must satisfy both of these conditions:
   * - the user must have the **USE_CATALOG** privilege on the table's parent catalog,
   * the **USE_SCHEMA** privilege on the table's parent schema, and be the owner of the table.
   * - if the new constraint is a __ForeignKeyConstraint__,
   * the user must have the **USE_CATALOG** privilege on the referenced parent table's catalog,
   * the **USE_SCHEMA** privilege on the referenced parent table's schema,
   * and be the owner of the referenced parent table.
   */
  async createTableConstraint(
    req: CreateTableConstraintRequest,
    options?: CallOptions
  ): Promise<TableConstraint> {
    const url = `${this.host}/api/2.1/unity-catalog/constraints`;
    const body = marshalRequest(req, marshalCreateTableConstraintRequestSchema);
    let resp: TableConstraint | undefined;
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
      resp = parseResponse(respBody, unmarshalTableConstraintSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a table from the specified parent catalog and schema.
   * The caller must be the owner of the parent catalog, have the **USE_CATALOG** privilege on the parent catalog and be the owner of the parent schema,
   * or be the owner of the table and have the **USE_CATALOG** privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   */
  async deleteTable(
    req: DeleteTableRequest,
    options?: CallOptions
  ): Promise<DeleteTableRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullNameArg ?? ''}`;
    let resp: DeleteTableRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalDeleteTableRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a table constraint.
   *
   * For the table constraint deletion to succeed, the user must satisfy both of these conditions:
   * - the user must have the **USE_CATALOG** privilege on the table's parent catalog,
   * the **USE_SCHEMA** privilege on the table's parent schema, and be the owner of the table.
   * - if __cascade__ argument is **true**, the user must have the following permissions on all of the child tables:
   * the **USE_CATALOG** privilege on the table's catalog,
   * the **USE_SCHEMA** privilege on the table's schema,
   * and be the owner of the table.
   */
  async deleteTableConstraint(
    req: DeleteTableConstraintRequest,
    options?: CallOptions
  ): Promise<DeleteTableConstraintRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/constraints/${req.fullNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.constraintName !== undefined) {
      params.append('constraint_name', req.constraintName);
    }
    if (req.cascade !== undefined) {
      params.append('cascade', String(req.cascade));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteTableConstraintRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalDeleteTableConstraintRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a table from the metastore for a specific catalog and schema.
   * The caller must satisfy one of the following requirements:
   * * Be a metastore admin
   * * Be the owner of the parent catalog
   * * Be the owner of the parent schema and have the **USE_CATALOG** privilege on the parent catalog
   * * Have the **USE_CATALOG** privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema,
   * and either be the table owner or have the **SELECT** privilege on the table.
   */
  async getTable(
    req: GetTableRequest,
    options?: CallOptions
  ): Promise<TableInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeDeltaMetadata !== undefined) {
      params.append('include_delta_metadata', String(req.includeDeltaMetadata));
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.includeManifestCapabilities !== undefined) {
      params.append(
        'include_manifest_capabilities',
        String(req.includeManifestCapabilities)
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: TableInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalTableInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of summaries for tables for a schema and catalog within the metastore. The table summaries returned are either:
   *
   * * summaries for tables (within the current metastore and parent catalog and schema), when the user is a metastore admin, or:
   * * summaries for tables and schemas (within the current metastore and parent catalog)
   * for which the user has ownership or the **SELECT** privilege on the table and ownership or **USE_SCHEMA** privilege on the schema,
   * provided that the user also has ownership or the **USE_CATALOG** privilege on the parent catalog.
   *
   * There is no guarantee of a specific ordering of the elements in the array.
   *
   * PAGINATION BEHAVIOR: The API is by default paginated, a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listTableSummaries(
    req: ListTableSummariesRequest,
    options?: CallOptions
  ): Promise<ListTableSummariesRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/table-summaries`;
    const params = new URLSearchParams();
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaNamePattern !== undefined) {
      params.append('schema_name_pattern', req.schemaNamePattern);
    }
    if (req.tableNamePattern !== undefined) {
      params.append('table_name_pattern', req.tableNamePattern);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeManifestCapabilities !== undefined) {
      params.append(
        'include_manifest_capabilities',
        String(req.includeManifestCapabilities)
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListTableSummariesRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalListTableSummariesRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listTableSummariesIter(
    req: ListTableSummariesRequest,
    options?: CallOptions
  ): AsyncGenerator<TableSummary> {
    const pageReq: ListTableSummariesRequest = {...req};
    for (;;) {
      const resp = await this.listTableSummaries(pageReq, options);
      for (const item of resp.tables ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Gets an array of all tables for the current metastore under the parent catalog and schema.
   * The caller must be a metastore admin or an owner of (or have the **SELECT** privilege on) the table.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG** privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   * There is no guarantee of a specific ordering of the elements in the array.
   *
   * NOTE: **view_dependencies** and **table_constraints** are not returned by ListTables queries.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listTables(
    req: ListTablesRequest,
    options?: CallOptions
  ): Promise<ListTablesRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables`;
    const params = new URLSearchParams();
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaName !== undefined) {
      params.append('schema_name', req.schemaName);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.omitColumns !== undefined) {
      params.append('omit_columns', String(req.omitColumns));
    }
    if (req.omitProperties !== undefined) {
      params.append('omit_properties', String(req.omitProperties));
    }
    if (req.omitUsername !== undefined) {
      params.append('omit_username', String(req.omitUsername));
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.includeManifestCapabilities !== undefined) {
      params.append(
        'include_manifest_capabilities',
        String(req.includeManifestCapabilities)
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListTablesRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalListTablesRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listTablesIter(
    req: ListTablesRequest,
    options?: CallOptions
  ): AsyncGenerator<TableInfo> {
    const pageReq: ListTablesRequest = {...req};
    for (;;) {
      const resp = await this.listTables(pageReq, options);
      for (const item of resp.tables ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Gets if a table exists in the metastore for a specific catalog and schema.
   * The caller must satisfy one of the following requirements:
   * * Be a metastore admin
   * * Be the owner of the parent catalog
   * * Be the owner of the parent schema and have the **USE_CATALOG** privilege on the parent catalog
   * * Have the **USE_CATALOG** privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema,
   * and either be the table owner or have the **SELECT** privilege on the table.
   * * Have **BROWSE** privilege on the parent catalog
   * * Have **BROWSE** privilege on the parent schema
   */
  async tableExists(
    req: TableExistsRequest,
    options?: CallOptions
  ): Promise<TableExistsRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullNameArg ?? ''}/exists`;
    let resp: TableExistsRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalTableExistsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Change the owner of the table.
   * The caller must be the owner of the parent catalog, have the **USE_CATALOG** privilege on the parent catalog and be the owner of the parent schema,
   * or be the owner of the table and have the **USE_CATALOG** privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   */
  async updateTable(
    req: UpdateTableRequest,
    options?: CallOptions
  ): Promise<UpdateTableRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullNameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateTableRequestSchema);
    let resp: UpdateTableRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateTableRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
