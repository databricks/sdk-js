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
  DeleteRequest,
  DeleteRequest_Response,
  ExportRequest,
  ExportRequest_Response,
  GetStatusRequest,
  ImportRequest,
  ImportRequest_Response,
  ListRequest,
  ListRequest_Response,
  MkdirsRequest,
  MkdirsRequest_Response,
  ObjectInfo,
} from './model';
import {
  marshalDeleteRequestSchema,
  marshalImportRequestSchema,
  marshalMkdirsRequestSchema,
  unmarshalDeleteRequest_ResponseSchema,
  unmarshalExportRequest_ResponseSchema,
  unmarshalImportRequest_ResponseSchema,
  unmarshalListRequest_ResponseSchema,
  unmarshalMkdirsRequest_ResponseSchema,
  unmarshalObjectInfoSchema,
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
   * Deletes an object or a directory (and optionally recursively deletes all objects in the directory).
   * * If `path` does not exist, this call returns an error `RESOURCE_DOES_NOT_EXIST`.
   * * If `path` is a non-empty directory and `recursive` is set to `false`, this call returns an error `DIRECTORY_NOT_EMPTY`.
   *
   * Object deletion cannot be undone and deleting a directory recursively is not atomic.
   */
  async delete(
    req: DeleteRequest,
    options?: CallOptions
  ): Promise<DeleteRequest_Response> {
    const url = `${this.host}/api/2.0/workspace/delete`;
    const body = marshalRequest(req, marshalDeleteRequestSchema);
    let resp: DeleteRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalDeleteRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<ExportRequest_Response> {
    const url = `${this.host}/api/2.0/workspace/export`;
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
    let resp: ExportRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalExportRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    const url = `${this.host}/api/2.0/workspace/get-status`;
    const params = new URLSearchParams();
    if (req.path !== undefined) {
      params.append('path', req.path);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ObjectInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalObjectInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<ImportRequest_Response> {
    const url = `${this.host}/api/2.0/workspace/import`;
    const body = marshalRequest(req, marshalImportRequestSchema);
    let resp: ImportRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalImportRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the contents of a directory, or the object if it is not a directory.
   * If the input path does not exist, this call returns an error `RESOURCE_DOES_NOT_EXIST`.
   */
  async list(
    req: ListRequest,
    options?: CallOptions
  ): Promise<ListRequest_Response> {
    const url = `${this.host}/api/2.0/workspace/list`;
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
    let resp: ListRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalListRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<MkdirsRequest_Response> {
    const url = `${this.host}/api/2.0/workspace/mkdirs`;
    const body = marshalRequest(req, marshalMkdirsRequestSchema);
    let resp: MkdirsRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalMkdirsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
