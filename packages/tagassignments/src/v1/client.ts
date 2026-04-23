// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
import type {
  CreateTagAssignmentRequest,
  DeleteTagAssignmentRequest,
  GetTagAssignmentRequest,
  ListTagAssignmentsRequest,
  ListTagAssignmentsResponse,
  TagAssignment,
  UpdateTagAssignmentRequest,
} from './model';
import {
  marshalTagAssignmentSchema,
  unmarshalListTagAssignmentsResponseSchema,
  unmarshalTagAssignmentSchema,
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

  /** Create a tag assignment */
  async createTagAssignment(signal: AbortSignal | undefined, req: CreateTagAssignmentRequest, options?: Options): Promise<TagAssignment> {
    const url = `${this.host}/api/2.0/entity-tag-assignments`;
    const body = marshalRequest(req.tagAssignment, marshalTagAssignmentSchema);
    let resp: TagAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalTagAssignmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a tag assignment */
  async deleteTagAssignment(signal: AbortSignal | undefined, req: DeleteTagAssignmentRequest, options?: Options): Promise<void> {
    const url = `${this.host}/api/2.0/entity-tag-assignments/${req.entityType ?? ''}/${req.entityId ?? ''}/tags/${req.tagKey ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await execute(signal, call, options);
  }

  /** Get a tag assignment */
  async getTagAssignment(signal: AbortSignal | undefined, req: GetTagAssignmentRequest, options?: Options): Promise<TagAssignment> {
    const url = `${this.host}/api/2.0/entity-tag-assignments/${req.entityType ?? ''}/${req.entityId ?? ''}/tags/${req.tagKey ?? ''}`;
    let resp: TagAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalTagAssignmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List the tag assignments for an entity */
  async listTagAssignments(signal: AbortSignal | undefined, req: ListTagAssignmentsRequest, options?: Options): Promise<ListTagAssignmentsResponse> {
    const url = `${this.host}/api/2.0/entity-tag-assignments/${req.entityType ?? ''}/${req.entityId ?? ''}/tags`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListTagAssignmentsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListTagAssignmentsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listTagAssignmentsIter(signal: AbortSignal | undefined, req: ListTagAssignmentsRequest, options?: Options): AsyncGenerator<TagAssignment> {
    const pageReq: ListTagAssignmentsRequest = {...req};
    for (;;) {
      const resp = await this.listTagAssignments(signal, pageReq, options);
      for (const item of resp.tagAssignments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }


  /** Update a tag assignment */
  async updateTagAssignment(signal: AbortSignal | undefined, req: UpdateTagAssignmentRequest, options?: Options): Promise<TagAssignment> {
    const url = `${this.host}/api/2.0/entity-tag-assignments/${req.tagAssignment?.entityType ?? ''}/${req.tagAssignment?.entityId ?? ''}/tags/${req.tagAssignment?.tagKey ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.tagAssignment, marshalTagAssignmentSchema);
    let resp: TagAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalTagAssignmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
