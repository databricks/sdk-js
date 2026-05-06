/**
 * Options used to configure Databricks API clients.
 *
 * @packageDocumentation
 */

import type {Credentials} from '@databricks/sdk-auth';
import type {HttpClient} from '@databricks/sdk-core/http';
import type {Logger} from '@databricks/sdk-core/logger';

/** Options that configure a Databricks API client. */
export interface ClientOptions {
  /** Host for the client. */
  host?: string;

  /**
   * A pre-configured HTTP client to use when making HTTP requests.
   *
   * Important: When set, this option ignores all other options.
   */
  httpClient?: HttpClient;

  /** Credentials used to authenticate requests. */
  credentials?: Credentials;

  /**
   * Overall API call timeout, in milliseconds, applied by default to every
   * request issued through the client.
   */
  timeout?: number;

  /** Logger used to record diagnostic messages. */
  logger?: Logger;
}
