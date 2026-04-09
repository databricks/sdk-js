/**
 * Files service client for the Databricks SDK.
 */

import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {
  HttpClient,
  HttpRequest,
} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';

import type {UploadRequest} from './model';
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
    const url = new URL(`${this.host}/api/2.0/fs/files${encodedPath}`);
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
      ...(signal !== undefined && {signal}),
    };

    await sendAndCheckError({
      request: httpReq,
      httpClient: this.httpClient,
      logger: this.logger,
    });
  }
}
