// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  flattenQueryParams,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  ApproveMigrationExecutionRequest,
  ApproveMigrationTranslationRequest,
  CancelMigrationRequest,
  CreateMigrationRequest,
  DeleteMigrationRequest,
  GetMigrationRequest,
  ListMigrationsRequest,
  ListMigrationsResponse,
  Migration,
  RejectMigrationExecutionRequest,
  RejectMigrationTranslationRequest,
} from './model';
import {
  marshalApproveMigrationExecutionRequestSchema,
  marshalApproveMigrationTranslationRequestSchema,
  marshalCancelMigrationRequestSchema,
  marshalMigrationSchema,
  marshalRejectMigrationExecutionRequestSchema,
  marshalRejectMigrationTranslationRequestSchema,
  unmarshalListMigrationsResponseSchema,
  unmarshalMigrationSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ComputeMigrationsClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /**
   * Approves migration execution at the MIGRATION_REVIEW gate, advancing to execution.
   *
   * Valid only when the migration is in MIGRATION_REVIEW. If supplied, the `etag` must match
   * the current server value.
   *
   * Returns NOT_FOUND if the migration does not exist.
   * Returns FAILED_PRECONDITION if the migration is not in MIGRATION_REVIEW.
   * Returns ABORTED if the etag does not match the current resource version.
   */
  async approveMigrationExecution(
    req: ApproveMigrationExecutionRequest,
    options?: CallOptions
  ): Promise<Migration> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/compute-migrations/v1/migrations/${req.migrationId ?? ''}/approveExecution`;
    const body = marshalRequest(
      req,
      marshalApproveMigrationExecutionRequestSchema
    );
    let resp: Migration | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMigrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Approves the working copy at the TRANSLATION_READY gate. If the migration was created with
   * `run_validation`, the working copy is then run to verify it executes successfully before the
   * migration is presented for execution review; otherwise it advances straight to
   * MIGRATION_REVIEW.
   *
   * Valid only when the migration is in TRANSLATION_READY. If supplied, the `etag` must match
   * the current server value.
   *
   * Returns NOT_FOUND if the migration does not exist.
   * Returns FAILED_PRECONDITION if the migration is not in TRANSLATION_READY.
   * Returns ABORTED if the etag does not match the current resource version.
   */
  async approveMigrationTranslation(
    req: ApproveMigrationTranslationRequest,
    options?: CallOptions
  ): Promise<Migration> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/compute-migrations/v1/migrations/${req.migrationId ?? ''}/approveTranslation`;
    const body = marshalRequest(
      req,
      marshalApproveMigrationTranslationRequestSchema
    );
    let resp: Migration | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMigrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Cancels the migration, transitioning it to CANCELLED.
   *
   * Valid from any non-terminal state, unlike the review-gate transitions, which each require a
   * specific state. Any in-flight agent work is abandoned and the migration stops advancing. The
   * resource is retained for auditability.
   *
   * Returns NOT_FOUND if the migration does not exist.
   * Returns FAILED_PRECONDITION if the migration is already in a terminal state.
   * Returns ABORTED if the etag does not match the current resource version.
   */
  async cancelMigration(
    req: CancelMigrationRequest,
    options?: CallOptions
  ): Promise<Migration> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/compute-migrations/v1/migrations/${req.migrationId ?? ''}/cancel`;
    const body = marshalRequest(req, marshalCancelMigrationRequestSchema);
    let resp: Migration | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMigrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new migration for a Classic compute asset.
   *
   * The migration is created in PLANNING_PENDING and advances through the state machine as
   * planning work is scheduled. The caller must have appropriate permissions: workspace admin for
   * infrastructure-scoped migrations, job owner/admin for individual workload migrations.
   *
   * At most one migration may hold an asset. Returns ALREADY_EXISTS if the asset has a migration
   * in flight, or one that already migrated it successfully; a migration that ended without
   * succeeding, or was deleted, releases the asset so it can be migrated again.
   * Returns INVALID_PARAMETER_VALUE if the asset is not eligible for migration.
   */
  async createMigration(
    req: CreateMigrationRequest,
    options?: CallOptions
  ): Promise<Migration> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/compute-migrations/v1/migrations`;
    const params = new URLSearchParams();
    if (req.requestId !== undefined) {
      params.append('request_id', req.requestId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.migration, marshalMigrationSchema);
    let resp: Migration | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMigrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a migration (soft-delete).
   *
   * Allowed from any state. Deleting a migration marks the record deleted only — it does not roll
   * back a migration that already ran, and resources created during the migration are not cleaned
   * up. The migration resource is retained for auditability. To stop an in-flight migration (agent
   * teardown, transition to CANCELLED), use CancelMigration instead.
   *
   * Returns NOT_FOUND if the migration does not exist, or was already deleted: a deleted migration
   * is hidden from every method (Get, Update, List, and Delete), so it cannot be deleted again.
   * Returns ABORTED if a supplied nonempty request etag does not match the resource version.
   */
  async deleteMigration(
    req: DeleteMigrationRequest,
    options?: CallOptions
  ): Promise<Migration> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/compute-migrations/v1/migrations/${req.migrationId ?? ''}`;
    const params = new URLSearchParams();
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Migration | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMigrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Retrieves a migration by its ID.
   *
   * Returns the current state, configuration, and output artifacts of the migration.
   * Use this to poll migration progress or inspect artifacts after state transitions.
   * Returns NOT_FOUND if the migration does not exist in the caller's workspace.
   */
  async getMigration(
    req: GetMigrationRequest,
    options?: CallOptions
  ): Promise<Migration> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/compute-migrations/v1/migrations/${req.migrationId ?? ''}`;
    let resp: Migration | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMigrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists migrations in the caller's workspace, ordered by migration ID, with cursor-based
   * pagination and filtering by asset type and state.
   *
   * Eventually consistent: results are read from a cache, and pagination is not a point-in-time
   * snapshot, so a migration created during a List may not appear until a subsequent one.
   */
  async listMigrations(
    req: ListMigrationsRequest,
    options?: CallOptions
  ): Promise<ListMigrationsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/compute-migrations/v1/migrations`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.assetType !== undefined) {
      params.append('asset_type', req.assetType);
    }
    if (req.states !== undefined) {
      flattenQueryParams('states', req.states, params);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListMigrationsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListMigrationsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listMigrationsIter(
    req: ListMigrationsRequest,
    options?: CallOptions
  ): AsyncGenerator<Migration> {
    const pageReq: ListMigrationsRequest = {...req};
    for (;;) {
      const resp = await this.listMigrations(pageReq, options);
      for (const item of resp.migrations ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Rejects migration execution at the MIGRATION_REVIEW gate, sending the migration to
   * REVISION_PENDING to loop back for re-planning.
   *
   * Valid only when the migration is in MIGRATION_REVIEW. If supplied, the `etag` must match
   * the current server value.
   *
   * Returns NOT_FOUND if the migration does not exist.
   * Returns FAILED_PRECONDITION if the migration is not in MIGRATION_REVIEW.
   * Returns ABORTED if the etag does not match the current resource version.
   */
  async rejectMigrationExecution(
    req: RejectMigrationExecutionRequest,
    options?: CallOptions
  ): Promise<Migration> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/compute-migrations/v1/migrations/${req.migrationId ?? ''}/rejectExecution`;
    const body = marshalRequest(
      req,
      marshalRejectMigrationExecutionRequestSchema
    );
    let resp: Migration | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMigrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Rejects the working copy at the TRANSLATION_READY gate, sending the migration to
   * REVISION_PENDING to loop back for re-planning.
   *
   * Valid only when the migration is in TRANSLATION_READY. If supplied, the `etag` must match
   * the current server value.
   *
   * Returns NOT_FOUND if the migration does not exist.
   * Returns FAILED_PRECONDITION if the migration is not in TRANSLATION_READY.
   * Returns ABORTED if the etag does not match the current resource version.
   */
  async rejectMigrationTranslation(
    req: RejectMigrationTranslationRequest,
    options?: CallOptions
  ): Promise<Migration> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/compute-migrations/v1/migrations/${req.migrationId ?? ''}/rejectTranslation`;
    const body = marshalRequest(
      req,
      marshalRejectMigrationTranslationRequestSchema
    );
    let resp: Migration | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMigrationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
