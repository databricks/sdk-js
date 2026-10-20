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
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  DeleteRequest,
  DeleteResponse,
  ExportRequest,
  ExportResponse,
  GetStatusRequest,
  ImportRequest,
  ImportResponse,
  ListRequest,
  ListResponse,
  MkdirsRequest,
  MkdirsResponse,
  ObjectInfo,
} from './model';
import {
  marshalDeleteRequestSchema,
  marshalImportRequestSchema,
  marshalMkdirsRequestSchema,
  unmarshalDeleteResponseSchema,
  unmarshalExportResponseSchema,
  unmarshalImportResponseSchema,
  unmarshalListResponseSchema,
  unmarshalMkdirsResponseSchema,
  unmarshalObjectInfoSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class WorkspaceFilesClient {
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
   * Deletes an object or a directory (and optionally recursively deletes all objects in the directory).
   * * If `path` does not exist, this call returns an error `RESOURCE_DOES_NOT_EXIST`.
   * * If `path` is a non-empty directory and `recursive` is set to `false`, this call returns an error `DIRECTORY_NOT_EMPTY`.
   *
   * Object deletion cannot be undone and deleting a directory recursively is not atomic.
   */
  async delete(
    req: DeleteRequest,
    options?: CallOptions
  ): Promise<DeleteResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/workspace/delete`;
    const body = marshalRequest(req, marshalDeleteRequestSchema);
    let resp: DeleteResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalDeleteResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Exports an object or the contents of an entire directory.
   *
   * If `path` does not exist, this call returns an error `RESOURCE_DOES_NOT_EXIST`.
   *
   * If the exported data would exceed size limit, this call returns `MAX_NOTEBOOK_SIZE_EXCEEDED`.
   * Currently, this API does not support exporting a library.
   */
  async export(
    req: ExportRequest,
    options?: CallOptions
  ): Promise<ExportResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/workspace/export`;
    const params = new URLSearchParams();
    if (req.path !== undefined) {
      params.append('path', req.path);
    }
    if (req.format !== undefined) {
      params.append('format', req.format);
    }
    if (req.directDownload !== undefined) {
      params.append('direct_download', String(req.directDownload));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ExportResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalExportResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the status of an object or a directory.
   * If `path` does not exist, this call returns an error `RESOURCE_DOES_NOT_EXIST`.
   */
  async getStatus(
    req: GetStatusRequest,
    options?: CallOptions
  ): Promise<ObjectInfo> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/workspace/get-status`;
    const params = new URLSearchParams();
    if (req.path !== undefined) {
      params.append('path', req.path);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ObjectInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalObjectInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Imports a workspace object (for example, a notebook or file) or the contents of an entire directory.
   * If `path` already exists and `overwrite` is set to `false`, this call returns an error `RESOURCE_ALREADY_EXISTS`.
   * To import a directory, you can use either the `DBC` format or the `SOURCE` format with the `language` field unset.
   * To import a single file as `SOURCE`, you must set the `language` field.
   * Zip files within directories are not supported.
   */
  async import(
    req: ImportRequest,
    options?: CallOptions
  ): Promise<ImportResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/workspace/import`;
    const body = marshalRequest(req, marshalImportRequestSchema);
    let resp: ImportResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalImportResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the contents of a directory, or the object if it is not a directory.
   * If the input path does not exist, this call returns an error `RESOURCE_DOES_NOT_EXIST`.
   */
  async list(req: ListRequest, options?: CallOptions): Promise<ListResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/workspace/list`;
    const params = new URLSearchParams();
    if (req.path !== undefined) {
      params.append('path', req.path);
    }
    if (req.notebooksModifiedAfter !== undefined) {
      params.append(
        'notebooks_modified_after',
        String(req.notebooksModifiedAfter)
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates the specified directory (and necessary parent directories if they do not exist).
   * If there is an object (not a directory) at any prefix of the input path, this call returns
   * an error `RESOURCE_ALREADY_EXISTS`.
   *
   * Note that if this operation fails it may have succeeded in creating some of the necessary parent directories.
   */
  async mkdirs(
    req: MkdirsRequest,
    options?: CallOptions
  ): Promise<MkdirsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/workspace/mkdirs`;
    const body = marshalRequest(req, marshalMkdirsRequestSchema);
    let resp: MkdirsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalMkdirsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
