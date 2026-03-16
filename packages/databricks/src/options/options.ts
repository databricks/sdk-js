/**
 * Client options for configuring Databricks API clients.
 *
 * @packageDocumentation
 */

import type {Credentials} from '@databricks/sdk-auth';
import type {Logger} from '../logger/logger';
import type {HttpClient} from '../transport/http';

/** Options to configure Databricks API clients. */
export interface ClientOptions {
  /** The Databricks host URL. */
  host?: string;

  /**
   * A specific HTTP client to use for requests.
   *
   * Important: When set, this option ignores all other options.
   */
  httpClient?: HttpClient;

  /** Credentials to use for authentication. */
  credentials?: Credentials;

  /** Default timeout for API calls, in milliseconds. */
  timeout?: number;

  /** Logger for diagnostic messages. */
  logger?: Logger;
}
