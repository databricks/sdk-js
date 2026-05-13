// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
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
   * Creates a tag assignment for an Unity Catalog entity.
   *
   * To add tags to Unity Catalog entities, you must own the entity or have the following privileges:
   * - **APPLY TAG** on the entity
   * - **USE SCHEMA** on the entity's parent schema
   * - **USE CATALOG** on the entity's parent catalog
   *
   * To add a governed tag to Unity Catalog entities, you must also have the **ASSIGN** or **MANAGE** permission on the tag policy. See [Manage tag policy permissions](https://docs.databricks.com/aws/en/admin/tag-policies/manage-permissions).
   */
  async createEntityTagAssignment(
    req: CreateEntityTagAssignmentRequest,
    options?: CallOptions
  ): Promise<EntityTagAssignment> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments`;
    const body = marshalRequest(
      req.tagAssignment,
      marshalEntityTagAssignmentSchema
    );
    let resp: EntityTagAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEntityTagAssignmentSchema);
    };
    await executeCall(call, options);
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
  async deleteEntityTagAssignment(
    req: DeleteEntityTagAssignmentRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments/${req.entityType ?? ''}/${req.entityName ?? ''}/tags/${req.tagKey ?? ''}`;
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
    await executeCall(call, options);
  }

  /** Gets a tag assignment for an Unity Catalog entity by tag key. */
  async getEntityTagAssignment(
    req: GetEntityTagAssignmentRequest,
    options?: CallOptions
  ): Promise<EntityTagAssignment> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments/${req.entityType ?? ''}/${req.entityName ?? ''}/tags/${req.tagKey ?? ''}`;
    let resp: EntityTagAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEntityTagAssignmentSchema);
    };
    await executeCall(call, options);
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
  async listEntityTagAssignments(
    req: ListEntityTagAssignmentsRequest,
    options?: CallOptions
  ): Promise<ListEntityTagAssignmentsResponse> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments/${req.entityType ?? ''}/${req.entityName ?? ''}/tags`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListEntityTagAssignmentsResponse | undefined;
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
        unmarshalListEntityTagAssignmentsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listEntityTagAssignmentsIter(
    req: ListEntityTagAssignmentsRequest,
    options?: CallOptions
  ): AsyncGenerator<EntityTagAssignment> {
    const pageReq: ListEntityTagAssignmentsRequest = {...req};
    for (;;) {
      const resp = await this.listEntityTagAssignments(pageReq, options);
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
  async updateEntityTagAssignment(
    req: UpdateEntityTagAssignmentRequest,
    options?: CallOptions
  ): Promise<EntityTagAssignment> {
    const url = `${this.host}/api/2.1/unity-catalog/entity-tag-assignments/${req.tagAssignment?.entityType ?? ''}/${req.tagAssignment?.entityName ?? ''}/tags/${req.tagAssignment?.tagKey ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.tagAssignment,
      marshalEntityTagAssignmentSchema
    );
    let resp: EntityTagAssignment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      resp = parseResponse(respBody, unmarshalEntityTagAssignmentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
