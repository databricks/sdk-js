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
  CreateEntityTagAssignmentRequest,
  DeleteEntityTagAssignmentRequest,
  EntityTagAssignment,
  GetEntityTagAssignmentRequest,
  ListEntityTagAssignmentsRequest,
  ListEntityTagAssignmentsResponse,
  UpdateEntityTagAssignmentRequest,
} from './model';
import {
  marshalEntityTagAssignmentSchema,
  unmarshalEntityTagAssignmentSchema,
  unmarshalListEntityTagAssignmentsResponseSchema,
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

  /**
   * Creates a tag assignment for an Unity Catalog entity.
   * 
   * To add tags to Unity Catalog entities, you must own the entity or have the following privileges:
   * - **APPLY TAG** on the entity
   * - **USE SCHEMA** on the entity's parent schema
   * - **USE CATALOG** on the entity's parent catalog
   * 
   * To add a governed tag to Unity Catalog entities, you must also have the **ASSIGN** or **MANAGE** permission on the tag policy. See [Manage tag policy permissions](https://docs.databricks.com/aws/en/admin/tag-policies/manage-permissions).
   */
  async createEntityTagAssignment(signal: AbortSignal | undefined, req: CreateEntityTagAssignmentRequest, options?: Options): Promise<EntityTagAssignment> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments`;
    const body = marshalRequest(req.tagAssignment, marshalEntityTagAssignmentSchema);
    let resp: EntityTagAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalEntityTagAssignmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a tag assignment for an Unity Catalog entity by its key.
   * 
   * To delete tags from Unity Catalog entities, you must own the entity or have the following privileges:
   * - **APPLY TAG** on the entity
   * - **USE_SCHEMA** on the entity's parent schema
   * - **USE_CATALOG** on the entity's parent catalog
   * 
   * To delete a governed tag from Unity Catalog entities, you must also have the **ASSIGN** or **MANAGE** permission on the tag policy. See [Manage tag policy permissions](https://docs.databricks.com/aws/en/admin/tag-policies/manage-permissions).
   */
  async deleteEntityTagAssignment(signal: AbortSignal | undefined, req: DeleteEntityTagAssignmentRequest, options?: Options): Promise<void> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments/${req.entityType ?? ''}/${req.entityName ?? ''}/tags/${req.tagKey ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
    };
    await execute(signal, call, options);
  }

  /** Gets a tag assignment for an Unity Catalog entity by tag key. */
  async getEntityTagAssignment(signal: AbortSignal | undefined, req: GetEntityTagAssignmentRequest, options?: Options): Promise<EntityTagAssignment> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments/${req.entityType ?? ''}/${req.entityName ?? ''}/tags/${req.tagKey ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeInherited !== undefined) {
      params.append('include_inherited', String(req.includeInherited));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: EntityTagAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalEntityTagAssignmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * List tag assignments for an Unity Catalog entity
   * 
   * PAGINATION BEHAVIOR: The API is by default paginated, a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listEntityTagAssignments(signal: AbortSignal | undefined, req: ListEntityTagAssignmentsRequest, options?: Options): Promise<ListEntityTagAssignmentsResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments/${req.entityType ?? ''}/${req.entityName ?? ''}/tags`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.includeInherited !== undefined) {
      params.append('include_inherited', String(req.includeInherited));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListEntityTagAssignmentsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListEntityTagAssignmentsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listEntityTagAssignmentsIter(signal: AbortSignal | undefined, req: ListEntityTagAssignmentsRequest, options?: Options): AsyncGenerator<EntityTagAssignment> {
    const pageReq: ListEntityTagAssignmentsRequest = {...req};
    for (;;) {
      const resp = await this.listEntityTagAssignments(signal, pageReq, options);
      for (const item of resp.tagAssignments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }


  /**
   * Updates an existing tag assignment for an Unity Catalog entity.
   * 
   * To update tags to Unity Catalog entities, you must own the entity or have the following privileges:
   * - **APPLY TAG** on the entity
   * - **USE SCHEMA** on the entity's parent schema
   * - **USE CATALOG** on the entity's parent catalog
   * 
   * To update a governed tag to Unity Catalog entities, you must also have the **ASSIGN** or **MANAGE** permission on the tag policy. See [Manage tag policy permissions](https://docs.databricks.com/aws/en/admin/tag-policies/manage-permissions).
   */
  async updateEntityTagAssignment(signal: AbortSignal | undefined, req: UpdateEntityTagAssignmentRequest, options?: Options): Promise<EntityTagAssignment> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments/${req.tagAssignment?.entityType ?? ''}/${req.tagAssignment?.entityName ?? ''}/tags/${req.tagAssignment?.tagKey ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.tagAssignment, marshalEntityTagAssignmentSchema);
    let resp: EntityTagAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', fullUrl, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalEntityTagAssignmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
