/**
 * Files service client for the Databricks SDK.
 */

import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';

export class Client {
  // @ts-expect-error Used once methods are added.
  private readonly host: string;
  // @ts-expect-error Used once methods are added.
  private readonly httpClient: HttpClient;
  // @ts-expect-error Used once methods are added.
  private readonly logger: Logger;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    this.httpClient = newHttpClient(options);
  }
}
