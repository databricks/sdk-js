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
  CleanRoomAutoApprovalRule,
  CreateCleanRoomAutoApprovalRuleRequest,
  DeleteCleanRoomAutoApprovalRuleRequest,
  GetCleanRoomAutoApprovalRuleRequest,
  ListCleanRoomAutoApprovalRulesRequest,
  ListCleanRoomAutoApprovalRulesResponse,
  UpdateCleanRoomAutoApprovalRuleRequest,
} from './model';
import {
  marshalCleanRoomAutoApprovalRuleSchema,
  marshalCreateCleanRoomAutoApprovalRuleRequestSchema,
  unmarshalCleanRoomAutoApprovalRuleSchema,
  unmarshalListCleanRoomAutoApprovalRulesResponseSchema,
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

  /** Create an auto-approval rule */
  async createCleanRoomAutoApprovalRule(
    signal: AbortSignal | undefined,
    req: CreateCleanRoomAutoApprovalRuleRequest,
    options?: Options
  ): Promise<CleanRoomAutoApprovalRule> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.autoApprovalRule?.cleanRoomName ?? ''}/auto-approval-rules`;
    const body = marshalRequest(
      req,
      marshalCreateCleanRoomAutoApprovalRuleRequestSchema
    );
    let resp: CleanRoomAutoApprovalRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAutoApprovalRuleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a auto-approval rule by rule ID */
  async deleteCleanRoomAutoApprovalRule(
    signal: AbortSignal | undefined,
    req: DeleteCleanRoomAutoApprovalRuleRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/auto-approval-rules/${req.ruleId ?? ''}`;
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

  /** Get a auto-approval rule by rule ID */
  async getCleanRoomAutoApprovalRule(
    signal: AbortSignal | undefined,
    req: GetCleanRoomAutoApprovalRuleRequest,
    options?: Options
  ): Promise<CleanRoomAutoApprovalRule> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/auto-approval-rules/${req.ruleId ?? ''}`;
    let resp: CleanRoomAutoApprovalRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAutoApprovalRuleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List all auto-approval rules for the caller */
  async listCleanRoomAutoApprovalRules(
    signal: AbortSignal | undefined,
    req: ListCleanRoomAutoApprovalRulesRequest,
    options?: Options
  ): Promise<ListCleanRoomAutoApprovalRulesResponse> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.cleanRoomName ?? ''}/auto-approval-rules`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCleanRoomAutoApprovalRulesResponse | undefined;
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
        unmarshalListCleanRoomAutoApprovalRulesResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCleanRoomAutoApprovalRulesIter(
    signal: AbortSignal | undefined,
    req: ListCleanRoomAutoApprovalRulesRequest,
    options?: Options
  ): AsyncGenerator<CleanRoomAutoApprovalRule> {
    const pageReq: ListCleanRoomAutoApprovalRulesRequest = {...req};
    for (;;) {
      const resp = await this.listCleanRoomAutoApprovalRules(
        signal,
        pageReq,
        options
      );
      for (const item of resp.rules ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Update a auto-approval rule by rule ID */
  async updateCleanRoomAutoApprovalRule(
    signal: AbortSignal | undefined,
    req: UpdateCleanRoomAutoApprovalRuleRequest,
    options?: Options
  ): Promise<CleanRoomAutoApprovalRule> {
    const url = `${this.host}/api/2.0/clean-rooms/${req.autoApprovalRule?.cleanRoomName ?? ''}/auto-approval-rules/${req.autoApprovalRule?.ruleId ?? ''}`;
    const body = marshalRequest(
      req.autoApprovalRule,
      marshalCleanRoomAutoApprovalRuleSchema
    );
    let resp: CleanRoomAutoApprovalRule | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCleanRoomAutoApprovalRuleSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
