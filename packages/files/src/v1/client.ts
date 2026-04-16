/**
 * Files service client for the Databricks SDK.
 */

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {
  HttpClient,
  HttpRequest,
} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';

import type {DownloadRequest, DownloadResponse, UploadRequest} from './model';
import {encodeFilePath, sendAndCheckError} from './utils';

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
   * Uploads a file to the specified path in the Databricks workspace.
   *
   * Because the request body is a ReadableStream which can only be consumed
   * once, this method does not retry on failure. If the upload fails the
   * caller must construct a new ReadableStream and call upload again.
   */
  async upload(
    signal: AbortSignal | undefined,
    req: UploadRequest
  ): Promise<void> {
    const encodedPath = encodeFilePath(req.filePath);
    const url = new URL(`${this.host}/api/2.0/fs/files/${encodedPath}`);
    if (req.overwrite === true) {
      url.searchParams.set('overwrite', 'true');
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/octet-stream');

    const httpReq: HttpRequest = {
      url: url.toString(),
      method: 'PUT',
      headers,
      body: req.contents,
    };
    if (signal !== undefined) {
      httpReq.signal = signal;
    }

    await sendAndCheckError({
      request: httpReq,
      httpClient: this.httpClient,
      logger: this.logger,
    });
  }

  /**
   * Downloads a file from the specified path in the Databricks workspace.
   *
   * The response contains a ReadableStream with the file contents. The caller
   * is responsible for consuming or cancelling the stream.
   */
  async download(
    signal: AbortSignal | undefined,
    req: DownloadRequest,
    options?: Options
  ): Promise<DownloadResponse> {
    const encodedPath = encodeFilePath(req.filePath);
    const url = `${this.host}/api/2.0/fs/files/${encodedPath}`;

    let result: DownloadResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('Accept', 'application/octet-stream');

      const httpReq: HttpRequest = {
        url,
        method: 'GET',
        headers,
      };
      if (callSignal !== undefined) {
        httpReq.signal = callSignal;
      }

      const httpResp = await sendAndCheckError({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });

      const contentLengthHeader = httpResp.headers.get('content-length');
      const contentTypeHeader = httpResp.headers.get('content-type');
      const lastModifiedHeader = httpResp.headers.get('last-modified');

      result = {
        contents:
          httpResp.body ??
          new ReadableStream<Uint8Array>({
            start(controller): void {
              controller.close();
            },
          }),
        ...(contentLengthHeader !== null && {
          contentLength: parseInt(contentLengthHeader, 10),
        }),
        ...(contentTypeHeader !== null && {
          contentType: contentTypeHeader,
        }),
        ...(lastModifiedHeader !== null && {
          lastModified: lastModifiedHeader,
        }),
      };
    };

    await execute(signal, call, options);

    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }
}
