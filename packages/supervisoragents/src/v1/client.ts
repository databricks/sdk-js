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
  CreateExampleRequest,
  CreateSupervisorAgentRequest,
  CreateToolRequest,
  DeleteExampleRequest,
  DeleteSupervisorAgentRequest,
  DeleteToolRequest,
  Example,
  GetExampleRequest,
  GetSupervisorAgentRequest,
  GetToolRequest,
  ListExamplesRequest,
  ListExamplesResponse,
  ListSupervisorAgentsRequest,
  ListSupervisorAgentsResponse,
  ListToolsRequest,
  ListToolsResponse,
  SupervisorAgent,
  Tool,
  UpdateExampleRequest,
  UpdateSupervisorAgentRequest,
  UpdateToolRequest,
} from './model';
import {
  marshalExampleSchema,
  marshalSupervisorAgentSchema,
  marshalToolSchema,
  unmarshalExampleSchema,
  unmarshalListExamplesResponseSchema,
  unmarshalListSupervisorAgentsResponseSchema,
  unmarshalListToolsResponseSchema,
  unmarshalSupervisorAgentSchema,
  unmarshalToolSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class SupervisorAgentsClient {
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

  /** Creates an example for a Supervisor Agent. */
  async createExample(
    req: CreateExampleRequest,
    options?: CallOptions
  ): Promise<Example> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.parent)}/examples`;
    const body =
      req.example === undefined
        ? 'null'
        : marshalRequest(req.example, marshalExampleSchema);
    let resp: Example | undefined;
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
      resp = parseResponse(respBody, unmarshalExampleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a Supervisor Agent together with its serving endpoint and MLflow experiment. Tools and
   * subagents are added to the agent afterwards with the Tool methods.
   */
  async createSupervisorAgent(
    req: CreateSupervisorAgentRequest,
    options?: CallOptions
  ): Promise<SupervisorAgent> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/supervisor-agents`;
    const body =
      req.supervisorAgent === undefined
        ? 'null'
        : marshalRequest(req.supervisorAgent, marshalSupervisorAgentSchema);
    let resp: SupervisorAgent | undefined;
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
      resp = parseResponse(respBody, unmarshalSupervisorAgentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Creates a Tool under a Supervisor Agent. Specify one of "genie_space", "knowledge_assistant", "uc_function", "uc_connection", "app", "volume", "dashboard", "table", "vector_search_index", "catalog", "schema", "supervisor_agent", "databricks_web_search", "skill" in the request body. The legacy values "lakeview_dashboard", "uc_table", and "web_search" are also accepted and remain equivalent to "dashboard", "table", and "databricks_web_search" respectively. The "databricks_web_search" tool_type maps to the `web_search` spec field. */
  async createTool(
    req: CreateToolRequest,
    options?: CallOptions
  ): Promise<Tool> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.parent)}/tools`;
    const params = new URLSearchParams();
    if (req.toolId !== undefined) {
      params.append('tool_id', req.toolId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.tool === undefined
        ? 'null'
        : marshalRequest(req.tool, marshalToolSchema);
    let resp: Tool | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
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
      resp = parseResponse(respBody, unmarshalToolSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes an example from a Supervisor Agent. */
  async deleteExample(
    req: DeleteExampleRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.name)}`;
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
   * Deletes a Supervisor Agent together with the resources created for it, including its tools,
   * examples, serving endpoint and MLflow experiment.
   */
  async deleteSupervisorAgent(
    req: DeleteSupervisorAgentRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.name)}`;
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

  /** Deletes a Tool. */
  async deleteTool(
    req: DeleteToolRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.name)}`;
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

  /** Gets an example from a Supervisor Agent. */
  async getExample(
    req: GetExampleRequest,
    options?: CallOptions
  ): Promise<Example> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.name)}`;
    let resp: Example | undefined;
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
      resp = parseResponse(respBody, unmarshalExampleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a Supervisor Agent. */
  async getSupervisorAgent(
    req: GetSupervisorAgentRequest,
    options?: CallOptions
  ): Promise<SupervisorAgent> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.name)}`;
    let resp: SupervisorAgent | undefined;
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
      resp = parseResponse(respBody, unmarshalSupervisorAgentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a Tool. */
  async getTool(req: GetToolRequest, options?: CallOptions): Promise<Tool> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.name)}`;
    let resp: Tool | undefined;
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
      resp = parseResponse(respBody, unmarshalToolSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists examples under a Supervisor Agent. */
  async listExamples(
    req: ListExamplesRequest,
    options?: CallOptions
  ): Promise<ListExamplesResponse> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.parent)}/examples`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListExamplesResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListExamplesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listExamplesIter(
    req: ListExamplesRequest,
    options?: CallOptions
  ): AsyncGenerator<Example> {
    const pageReq: ListExamplesRequest = {...req};
    for (;;) {
      const resp = await this.listExamples(pageReq, options);
      for (const item of resp.examples ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists the Supervisor Agents in the workspace that the caller has permission to view. */
  async listSupervisorAgents(
    req: ListSupervisorAgentsRequest,
    options?: CallOptions
  ): Promise<ListSupervisorAgentsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/supervisor-agents`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSupervisorAgentsResponse | undefined;
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
        unmarshalListSupervisorAgentsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listSupervisorAgentsIter(
    req: ListSupervisorAgentsRequest,
    options?: CallOptions
  ): AsyncGenerator<SupervisorAgent> {
    const pageReq: ListSupervisorAgentsRequest = {...req};
    for (;;) {
      const resp = await this.listSupervisorAgents(pageReq, options);
      for (const item of resp.supervisorAgents ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists Tools under a Supervisor Agent. */
  async listTools(
    req: ListToolsRequest,
    options?: CallOptions
  ): Promise<ListToolsResponse> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.parent)}/tools`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListToolsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListToolsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listToolsIter(
    req: ListToolsRequest,
    options?: CallOptions
  ): AsyncGenerator<Tool> {
    const pageReq: ListToolsRequest = {...req};
    for (;;) {
      const resp = await this.listTools(pageReq, options);
      for (const item of resp.tools ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates an example in a Supervisor Agent. */
  async updateExample(
    req: UpdateExampleRequest,
    options?: CallOptions
  ): Promise<Example> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.name)}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.example === undefined
        ? 'null'
        : marshalRequest(req.example, marshalExampleSchema);
    let resp: Example | undefined;
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
      resp = parseResponse(respBody, unmarshalExampleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a Supervisor Agent. Only the fields listed in `update_mask` are changed. All other fields
   * keep their current values.
   */
  async updateSupervisorAgent(
    req: UpdateSupervisorAgentRequest,
    options?: CallOptions
  ): Promise<SupervisorAgent> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.supervisorAgent?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.supervisorAgent === undefined
        ? 'null'
        : marshalRequest(req.supervisorAgent, marshalSupervisorAgentSchema);
    let resp: SupervisorAgent | undefined;
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
      resp = parseResponse(respBody, unmarshalSupervisorAgentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a Tool. Only the `description` field can be updated.
   * To change immutable fields such as tool type, spec, or tool ID, delete the tool and recreate it.
   */
  async updateTool(
    req: UpdateToolRequest,
    options?: CallOptions
  ): Promise<Tool> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/${encodePathVariable(req.tool?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.tool === undefined
        ? 'null'
        : marshalRequest(req.tool, marshalToolSchema);
    let resp: Tool | undefined;
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
      resp = parseResponse(respBody, unmarshalToolSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
