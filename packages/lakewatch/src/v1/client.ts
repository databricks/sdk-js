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
  encodePathVariable,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  AlertConfig,
  BuiltinParser,
  BuiltinParserVersion,
  CommonConfig,
  CreateDatasourceRequest,
  CreateParserRequest,
  CreateParserVersionRequest,
  CreateRuleRequest,
  Datasource,
  DatasourceConfig,
  DeleteDatasourceRequest,
  DeleteParserRequest,
  DeleteParserVersionRequest,
  DeleteRuleRequest,
  GetAlertConfigRequest,
  GetBuiltinParserRequest,
  GetBuiltinParserVersionRequest,
  GetCommonConfigRequest,
  GetDatasourceConfigRequest,
  GetDatasourceRequest,
  GetParserRequest,
  GetParserVersionRequest,
  GetRuleConfigRequest,
  GetRuleRequest,
  ListBuiltinParserVersionsRequest,
  ListBuiltinParserVersionsResponse,
  ListBuiltinParsersRequest,
  ListBuiltinParsersResponse,
  ListDatasourcesRequest,
  ListDatasourcesResponse,
  ListParserVersionsRequest,
  ListParserVersionsResponse,
  ListParsersRequest,
  ListParsersResponse,
  ListRulesRequest,
  ListRulesResponse,
  Parser,
  ParserVersion,
  Rule,
  RuleConfig,
  UpdateAlertConfigRequest,
  UpdateCommonConfigRequest,
  UpdateDatasourceConfigRequest,
  UpdateDatasourceRequest,
  UpdateRuleConfigRequest,
  UpdateRuleRequest,
} from './model';
import {
  marshalAlertConfigSchema,
  marshalCommonConfigSchema,
  marshalDatasourceConfigSchema,
  marshalDatasourceSchema,
  marshalParserSchema,
  marshalParserVersionSchema,
  marshalRuleConfigSchema,
  marshalRuleSchema,
  unmarshalAlertConfigSchema,
  unmarshalBuiltinParserSchema,
  unmarshalBuiltinParserVersionSchema,
  unmarshalCommonConfigSchema,
  unmarshalDatasourceConfigSchema,
  unmarshalDatasourceSchema,
  unmarshalListBuiltinParserVersionsResponseSchema,
  unmarshalListBuiltinParsersResponseSchema,
  unmarshalListDatasourcesResponseSchema,
  unmarshalListParserVersionsResponseSchema,
  unmarshalListParsersResponseSchema,
  unmarshalListRulesResponseSchema,
  unmarshalParserSchema,
  unmarshalParserVersionSchema,
  unmarshalRuleConfigSchema,
  unmarshalRuleSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class LakewatchClient {
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
   * Returns a built-in parser's identity and latest-version
   * pointer. Does not return the spec.
   */
  async getBuiltinParser(
    req: GetBuiltinParserRequest,
    options?: CallOptions
  ): Promise<BuiltinParser> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: BuiltinParser | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBuiltinParserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Returns one version of a built-in parser, including its spec. */
  async getBuiltinParserVersion(
    req: GetBuiltinParserVersionRequest,
    options?: CallOptions
  ): Promise<BuiltinParserVersion> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: BuiltinParserVersion | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalBuiltinParserVersionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists a built-in parser's published versions, oldest first
   * (ascending 1..resource_revision), without their specs.
   */
  async listBuiltinParserVersions(
    req: ListBuiltinParserVersionsRequest,
    options?: CallOptions
  ): Promise<ListBuiltinParserVersionsResponse> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.parent)}/versions`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListBuiltinParserVersionsResponse | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalListBuiltinParserVersionsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listBuiltinParserVersionsIter(
    req: ListBuiltinParserVersionsRequest,
    options?: CallOptions
  ): AsyncGenerator<BuiltinParserVersion> {
    const pageReq: ListBuiltinParserVersionsRequest = {...req};
    for (;;) {
      const resp = await this.listBuiltinParserVersions(pageReq, options);
      for (const item of resp.builtinParserVersions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Lists the built-in parsers Databricks publishes, without their
   * specs.
   */
  async listBuiltinParsers(
    req: ListBuiltinParsersRequest,
    options?: CallOptions
  ): Promise<ListBuiltinParsersResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/builtin-parsers`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListBuiltinParsersResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListBuiltinParsersResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listBuiltinParsersIter(
    req: ListBuiltinParsersRequest,
    options?: CallOptions
  ): AsyncGenerator<BuiltinParser> {
    const pageReq: ListBuiltinParsersRequest = {...req};
    for (;;) {
      const resp = await this.listBuiltinParsers(pageReq, options);
      for (const item of resp.builtinParsers ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Returns the alert delivery configuration for a catalog. */
  async getAlertConfig(
    req: GetAlertConfigRequest,
    options?: CallOptions
  ): Promise<AlertConfig> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: AlertConfig | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAlertConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Returns the common Lakewatch configuration for a catalog. */
  async getCommonConfig(
    req: GetCommonConfigRequest,
    options?: CallOptions
  ): Promise<CommonConfig> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: CommonConfig | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCommonConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Returns the datasource ingestion configuration for a catalog. */
  async getDatasourceConfig(
    req: GetDatasourceConfigRequest,
    options?: CallOptions
  ): Promise<DatasourceConfig> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: DatasourceConfig | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatasourceConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Returns the detection-rule configuration for a catalog. */
  async getRuleConfig(
    req: GetRuleConfigRequest,
    options?: CallOptions
  ): Promise<RuleConfig> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: RuleConfig | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the alert delivery configuration for a catalog. */
  async updateAlertConfig(
    req: UpdateAlertConfigRequest,
    options?: CallOptions
  ): Promise<AlertConfig> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.alertConfig?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.alertConfig === undefined
        ? 'null'
        : marshalRequest(req.alertConfig, marshalAlertConfigSchema);
    let resp: AlertConfig | undefined;
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
      resp = parseResponse(respBody, unmarshalAlertConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the common Lakewatch configuration for a catalog. */
  async updateCommonConfig(
    req: UpdateCommonConfigRequest,
    options?: CallOptions
  ): Promise<CommonConfig> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.commonConfig?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.commonConfig === undefined
        ? 'null'
        : marshalRequest(req.commonConfig, marshalCommonConfigSchema);
    let resp: CommonConfig | undefined;
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
      resp = parseResponse(respBody, unmarshalCommonConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the datasource ingestion configuration for a catalog. */
  async updateDatasourceConfig(
    req: UpdateDatasourceConfigRequest,
    options?: CallOptions
  ): Promise<DatasourceConfig> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.datasourceConfig?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.datasourceConfig === undefined
        ? 'null'
        : marshalRequest(req.datasourceConfig, marshalDatasourceConfigSchema);
    let resp: DatasourceConfig | undefined;
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
      resp = parseResponse(respBody, unmarshalDatasourceConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the detection-rule configuration for a catalog. */
  async updateRuleConfig(
    req: UpdateRuleConfigRequest,
    options?: CallOptions
  ): Promise<RuleConfig> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.ruleConfig?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.ruleConfig === undefined
        ? 'null'
        : marshalRequest(req.ruleConfig, marshalRuleConfigSchema);
    let resp: RuleConfig | undefined;
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
      resp = parseResponse(respBody, unmarshalRuleConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a new datasource. */
  async createDatasource(
    req: CreateDatasourceRequest,
    options?: CallOptions
  ): Promise<Datasource> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/datasources`;
    const body =
      req.datasource === undefined
        ? 'null'
        : marshalRequest(req.datasource, marshalDatasourceSchema);
    let resp: Datasource | undefined;
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
      resp = parseResponse(respBody, unmarshalDatasourceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a datasource by its resource name. */
  async deleteDatasource(
    req: DeleteDatasourceRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
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

  /** Returns a single datasource by its resource name. */
  async getDatasource(
    req: GetDatasourceRequest,
    options?: CallOptions
  ): Promise<Datasource> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: Datasource | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDatasourceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the datasources in a Unity Catalog catalog, optionally narrowed to one schema or
   * filtered by name. Results are paginated. Datasources that are still being created or
   * deleted are not listed.
   */
  async listDatasources(
    req: ListDatasourcesRequest,
    options?: CallOptions
  ): Promise<ListDatasourcesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/datasources`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaName !== undefined) {
      params.append('schema_name', req.schemaName);
    }
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListDatasourcesResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListDatasourcesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listDatasourcesIter(
    req: ListDatasourcesRequest,
    options?: CallOptions
  ): AsyncGenerator<Datasource> {
    const pageReq: ListDatasourcesRequest = {...req};
    for (;;) {
      const resp = await this.listDatasources(pageReq, options);
      for (const item of resp.datasources ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates an existing datasource. */
  async updateDatasource(
    req: UpdateDatasourceRequest,
    options?: CallOptions
  ): Promise<Datasource> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.datasource?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.datasource === undefined
        ? 'null'
        : marshalRequest(req.datasource, marshalDatasourceSchema);
    let resp: Datasource | undefined;
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
      resp = parseResponse(respBody, unmarshalDatasourceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a parser and its first version in one call. */
  async createParser(
    req: CreateParserRequest,
    options?: CallOptions
  ): Promise<Parser> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/parsers`;
    const body =
      req.parser === undefined
        ? 'null'
        : marshalRequest(req.parser, marshalParserSchema);
    let resp: Parser | undefined;
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
      resp = parseResponse(respBody, unmarshalParserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Appends a new immutable version, advancing the parser's latest-version
   * pointer. This is how a parser is edited; versions are never
   * changed in place.
   */
  async createParserVersion(
    req: CreateParserVersionRequest,
    options?: CallOptions
  ): Promise<ParserVersion> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.parent)}/versions`;
    const body =
      req.parserVersion === undefined
        ? 'null'
        : marshalRequest(req.parserVersion, marshalParserVersionSchema);
    let resp: ParserVersion | undefined;
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
      resp = parseResponse(respBody, unmarshalParserVersionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a parser and all of its versions. Refused while any
   * data source references it.
   */
  async deleteParser(
    req: DeleteParserRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
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
   * Deletes one version of a parser. Returns NOT_FOUND when the parser or the
   * version does not exist, and a conflict (HTTP 409) only while a data source
   * references the version. Deleting the last version leaves the parser in place
   * with no versions.
   */
  async deleteParserVersion(
    req: DeleteParserVersionRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
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
   * Returns a parser's identity and latest-version pointer. Does
   * not return the spec; read a spec with GetParserVersion.
   */
  async getParser(
    req: GetParserRequest,
    options?: CallOptions
  ): Promise<Parser> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: Parser | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalParserSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Returns one version of a parser, including its spec. */
  async getParserVersion(
    req: GetParserVersionRequest,
    options?: CallOptions
  ): Promise<ParserVersion> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: ParserVersion | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalParserVersionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists a parser's versions, oldest first, without their specs. */
  async listParserVersions(
    req: ListParserVersionsRequest,
    options?: CallOptions
  ): Promise<ListParserVersionsResponse> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.parent)}/versions`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListParserVersionsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListParserVersionsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listParserVersionsIter(
    req: ListParserVersionsRequest,
    options?: CallOptions
  ): AsyncGenerator<ParserVersion> {
    const pageReq: ListParserVersionsRequest = {...req};
    for (;;) {
      const resp = await this.listParserVersions(pageReq, options);
      for (const item of resp.parserVersions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists parsers in a catalog, without their specs. */
  async listParsers(
    req: ListParsersRequest,
    options?: CallOptions
  ): Promise<ListParsersResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/parsers`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaName !== undefined) {
      params.append('schema_name', req.schemaName);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListParsersResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListParsersResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listParsersIter(
    req: ListParsersRequest,
    options?: CallOptions
  ): AsyncGenerator<Parser> {
    const pageReq: ListParsersRequest = {...req};
    for (;;) {
      const resp = await this.listParsers(pageReq, options);
      for (const item of resp.parsers ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Creates a new rule. */
  async createRule(
    req: CreateRuleRequest,
    options?: CallOptions
  ): Promise<Rule> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/rules`;
    const body =
      req.rule === undefined
        ? 'null'
        : marshalRequest(req.rule, marshalRuleSchema);
    let resp: Rule | undefined;
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
      resp = parseResponse(respBody, unmarshalRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a rule by its resource name. */
  async deleteRule(
    req: DeleteRuleRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
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

  /** Returns a single rule by its resource name. */
  async getRule(req: GetRuleRequest, options?: CallOptions): Promise<Rule> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.name)}`;
    let resp: Rule | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists rules, with optional filtering and pagination. */
  async listRules(
    req: ListRulesRequest,
    options?: CallOptions
  ): Promise<ListRulesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/rules`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaName !== undefined) {
      params.append('schema_name', req.schemaName);
    }
    if (req.view !== undefined) {
      params.append('view', req.view);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListRulesResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListRulesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listRulesIter(
    req: ListRulesRequest,
    options?: CallOptions
  ): AsyncGenerator<Rule> {
    const pageReq: ListRulesRequest = {...req};
    for (;;) {
      const resp = await this.listRules(pageReq, options);
      for (const item of resp.rules ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates an existing rule. */
  async updateRule(
    req: UpdateRuleRequest,
    options?: CallOptions
  ): Promise<Rule> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/lakewatch/${encodePathVariable(req.rule?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.rule === undefined
        ? 'null'
        : marshalRequest(req.rule, marshalRuleSchema);
    let resp: Rule | undefined;
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
      resp = parseResponse(respBody, unmarshalRuleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
