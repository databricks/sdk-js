// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
import type {
  AddBlock,
  AddBlock_Response,
  Close,
  Close_Response,
  Create,
  Create_Response,
  Delete,
  Delete_Response,
  GetStatus,
  GetStatus_Response,
  ListStatus,
  ListStatus_Response,
  MkDirs,
  MkDirs_Response,
  Move,
  Move_Response,
  Put,
  Put_Response,
  Read,
  Read_Response,
} from './model';
import {
  marshalAddBlockSchema,
  marshalCloseSchema,
  marshalCreateSchema,
  marshalDeleteSchema,
  marshalMkDirsSchema,
  marshalMoveSchema,
  marshalPutSchema,
  unmarshalAddBlock_ResponseSchema,
  unmarshalClose_ResponseSchema,
  unmarshalCreate_ResponseSchema,
  unmarshalDelete_ResponseSchema,
  unmarshalGetStatus_ResponseSchema,
  unmarshalListStatus_ResponseSchema,
  unmarshalMkDirs_ResponseSchema,
  unmarshalMove_ResponseSchema,
  unmarshalPut_ResponseSchema,
  unmarshalRead_ResponseSchema,
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
   * Appends a block of data to the stream specified by the input handle. If the handle does not
   * exist, this call will throw an exception with ``RESOURCE_DOES_NOT_EXIST``.
   * 
   * If the block of data exceeds 1 MB, this call will throw an exception with ``MAX_BLOCK_SIZE_EXCEEDED``.
   */
  async addBlock(signal: AbortSignal | undefined, req: AddBlock, options?: Options): Promise<AddBlock_Response> {
    const url = `${this.host}/api/2.0/dbfs/add-block`;
    const body = marshalRequest(req, marshalAddBlockSchema);
    let resp: AddBlock_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalAddBlock_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Closes the stream specified by the input handle. If the handle does not exist, this call
   * throws an exception with ``RESOURCE_DOES_NOT_EXIST``.
   */
  async close(signal: AbortSignal | undefined, req: Close, options?: Options): Promise<Close_Response> {
    const url = `${this.host}/api/2.0/dbfs/close`;
    const body = marshalRequest(req, marshalCloseSchema);
    let resp: Close_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalClose_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Opens a stream to write to a file and returns a handle to this stream.
   * There is a 10 minute idle timeout on this handle. If a file or directory already exists on the given path
   * and __overwrite__ is set to false, this call will throw an exception with ``RESOURCE_ALREADY_EXISTS``.
   * 
   * A typical workflow for file upload would be:
   * 
   * 1. Issue a ``create`` call and get a handle.
   * 2. Issue one or more ``add-block`` calls with the handle you have.
   * 3. Issue a ``close`` call with the handle you have.
   */
  async create(signal: AbortSignal | undefined, req: Create, options?: Options): Promise<Create_Response> {
    const url = `${this.host}/api/2.0/dbfs/create`;
    const body = marshalRequest(req, marshalCreateSchema);
    let resp: Create_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCreate_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Delete the file or directory (optionally recursively delete all files in the directory).
   * This call throws an exception with `IO_ERROR` if the path is a non-empty directory and `recursive` is set to
   * `false` or on other similar errors.
   * 
   * When you delete a large number of files, the delete operation is done in increments. The call returns
   * a response after approximately 45 seconds with an error message (503 Service Unavailable) asking you to
   * re-invoke the delete operation until the directory structure is fully deleted.
   * 
   * For operations that delete more than 10K files, we discourage using the DBFS REST API, but advise you to
   * perform such operations in the context of a cluster, using
   * the [File system utility (dbutils.fs)](/dev-tools/databricks-utils.html#dbutils-fs). `dbutils.fs`
   * covers the functional scope of the DBFS REST API, but from notebooks. Running such operations using notebooks
   * provides better control and manageability, such as selective deletes, and the possibility to automate periodic
   * delete jobs.
   */
  async delete(signal: AbortSignal | undefined, req: Delete, options?: Options): Promise<Delete_Response> {
    const url = `${this.host}/api/2.0/dbfs/delete`;
    const body = marshalRequest(req, marshalDeleteSchema);
    let resp: Delete_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDelete_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the file information for a file or directory.
   * If the file or directory does not exist, this call throws an exception with `RESOURCE_DOES_NOT_EXIST`.
   */
  async getStatus(signal: AbortSignal | undefined, req: GetStatus, options?: Options): Promise<GetStatus_Response> {
    const url = `${this.host}/api/2.0/dbfs/get-status`;
    const params = new URLSearchParams();
    if (req.path !== undefined) {
      params.append('path', req.path);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetStatus_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGetStatus_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * List the contents of a directory, or details of the file. If the file or directory does not exist, this call
   * throws an exception with `RESOURCE_DOES_NOT_EXIST`.
   * 
   * When calling list on a large directory, the list operation will time out after approximately 60 seconds.
   * We strongly recommend using list only on directories containing less than 10K files and discourage using
   * the DBFS REST API for operations that list more than 10K files. Instead, we recommend that you perform such
   * operations in the context of a cluster, using
   * the [File system utility (dbutils.fs)](/dev-tools/databricks-utils.html#dbutils-fs), which provides the same
   * functionality without timing out.
   */
  async list(signal: AbortSignal | undefined, req: ListStatus, options?: Options): Promise<ListStatus_Response> {
    const url = `${this.host}/api/2.0/dbfs/list`;
    const params = new URLSearchParams();
    if (req.path !== undefined) {
      params.append('path', req.path);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListStatus_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListStatus_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates the given directory and necessary parent directories if they do not exist.
   * If a file (not a directory) exists at any prefix of the input path, this call throws an exception with `RESOURCE_ALREADY_EXISTS`.
   * **Note**: If this operation fails, it might have succeeded in creating some of the necessary parent directories.
   */
  async mkdirs(signal: AbortSignal | undefined, req: MkDirs, options?: Options): Promise<MkDirs_Response> {
    const url = `${this.host}/api/2.0/dbfs/mkdirs`;
    const body = marshalRequest(req, marshalMkDirsSchema);
    let resp: MkDirs_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalMkDirs_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Moves a file from one location to another location within DBFS.
   * If the source file does not exist, this call throws an exception with `RESOURCE_DOES_NOT_EXIST`.
   * If a file already exists in the destination path, this call throws an exception with `RESOURCE_ALREADY_EXISTS`.
   * If the given source path is a directory, this call always recursively moves all files.
   */
  async move(signal: AbortSignal | undefined, req: Move, options?: Options): Promise<Move_Response> {
    const url = `${this.host}/api/2.0/dbfs/move`;
    const body = marshalRequest(req, marshalMoveSchema);
    let resp: Move_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalMove_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Uploads a file through the use of multipart form post.
   * It is mainly used for streaming uploads, but can also be used as a convenient single call for data upload.
   * 
   * Alternatively you can pass contents as base64 string.
   * 
   * The amount of data that can be passed (when not streaming) using the __contents__  parameter is limited to 1 MB.
   * `MAX_BLOCK_SIZE_EXCEEDED` will be thrown if this limit is exceeded.
   * 
   * If you want to upload large files, use the streaming upload. For details, see :method:dbfs/create,
   * :method:dbfs/addBlock, :method:dbfs/close.
   */
  async put(signal: AbortSignal | undefined, req: Put, options?: Options): Promise<Put_Response> {
    const url = `${this.host}/api/2.0/dbfs/put`;
    const body = marshalRequest(req, marshalPutSchema);
    let resp: Put_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalPut_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the contents of a file. If the file does not exist, this call throws an exception with `RESOURCE_DOES_NOT_EXIST`.
   * If the path is a directory, the read length is negative, or if the offset is negative, this call throws an exception with
   * `INVALID_PARAMETER_VALUE`. If the read length exceeds 1 MB, this call throws an
   * exception with `MAX_READ_SIZE_EXCEEDED`.
   * 
   * If `offset + length` exceeds the number of bytes in a file, it reads the contents until the end of file.
   */
  async read(signal: AbortSignal | undefined, req: Read, options?: Options): Promise<Read_Response> {
    const url = `${this.host}/api/2.0/dbfs/read`;
    const params = new URLSearchParams();
    if (req.path !== undefined) {
      params.append('path', req.path);
    }
    if (req.offset !== undefined) {
      params.append('offset', String(req.offset));
    }
    if (req.length !== undefined) {
      params.append('length', String(req.length));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Read_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalRead_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
