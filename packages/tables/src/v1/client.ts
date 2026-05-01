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
  CreateTable,
  CreateTableConstraint,
  DeleteTable,
  DeleteTableConstraint,
  DeleteTableConstraint_Response,
  DeleteTable_Response,
  GetTable,
  ListTableSummaries,
  ListTableSummaries_Response,
  ListTables,
  ListTables_Response,
  TableConstraint,
  TableExists,
  TableExists_Response,
  TableInfo,
  TableSummary,
  UpdateTable,
  UpdateTable_Response,
} from './model';
import {
  marshalCreateTableConstraintSchema,
  marshalCreateTableSchema,
  marshalUpdateTableSchema,
  unmarshalDeleteTableConstraint_ResponseSchema,
  unmarshalDeleteTable_ResponseSchema,
  unmarshalListTableSummaries_ResponseSchema,
  unmarshalListTables_ResponseSchema,
  unmarshalTableConstraintSchema,
  unmarshalTableExists_ResponseSchema,
  unmarshalTableInfoSchema,
  unmarshalUpdateTable_ResponseSchema,
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
    signal: AbortSignal | undefined,
    req: CreateTable,
    options?: Options
  ): Promise<TableInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/tables`;
    const body = marshalRequest(req, marshalCreateTableSchema);
    let resp: TableInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTableInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: CreateTableConstraint,
    options?: Options
  ): Promise<TableConstraint> {
    const url = `${this.host}/api/2.1/unity-catalog/constraints`;
    const body = marshalRequest(req, marshalCreateTableConstraintSchema);
    let resp: TableConstraint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTableConstraintSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: DeleteTable,
    options?: Options
  ): Promise<DeleteTable_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullNameArg ?? ''}`;
    let resp: DeleteTable_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteTable_ResponseSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: DeleteTableConstraint,
    options?: Options
  ): Promise<DeleteTableConstraint_Response> {
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
    let resp: DeleteTableConstraint_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteTableConstraint_ResponseSchema
      );
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetTable,
    options?: Options
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
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTableInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ListTableSummaries,
    options?: Options
  ): Promise<ListTableSummaries_Response> {
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
    let resp: ListTableSummaries_Response | undefined;
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
        unmarshalListTableSummaries_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listTableSummariesIter(
    signal: AbortSignal | undefined,
    req: ListTableSummaries,
    options?: Options
  ): AsyncGenerator<TableSummary> {
    const pageReq: ListTableSummaries = {...req};
    for (;;) {
      const resp = await this.listTableSummaries(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListTables,
    options?: Options
  ): Promise<ListTables_Response> {
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
    let resp: ListTables_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListTables_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listTablesIter(
    signal: AbortSignal | undefined,
    req: ListTables,
    options?: Options
  ): AsyncGenerator<TableInfo> {
    const pageReq: ListTables = {...req};
    for (;;) {
      const resp = await this.listTables(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: TableExists,
    options?: Options
  ): Promise<TableExists_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullNameArg ?? ''}/exists`;
    let resp: TableExists_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTableExists_ResponseSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateTable,
    options?: Options
  ): Promise<UpdateTable_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/tables/${req.fullNameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateTableSchema);
    let resp: UpdateTable_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateTable_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
