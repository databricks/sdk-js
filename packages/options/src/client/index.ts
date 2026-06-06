/**
 * Options used to configure Databricks API clients.
 *
 * @packageDocumentation
 */

import type {Credentials} from '@databricks/sdk-auth';
import type {HttpClient} from '@databricks/sdk-core/http';
import type {Logger} from '@databricks/sdk-core/logger';
import type {ProfileOptions} from '@databricks/sdk-core/profiles';

/** Options that configure a Databricks API client. */
export interface ClientOptions {
  /** Host for the client. */
  host?: string;

  /**
   * Default Databricks account ID for account-level API paths that contain
   * an `{account_id}` segment. The request's own `accountId` field takes
   * precedence; this option is only consulted when the request leaves it
   * unset.
   */
  accountId?: string;

  /**
   * Databricks workspace ID used to route workspace-level API calls on
   * unified hosts (SPOG). When set, workspace-level methods send the
   * `X-Databricks-Org-Id` header on every request. Ignored by clients that
   * only expose account-level methods.
   */
  workspaceId?: string;

  /**
   * Base HTTP client used as the transport. Replaces the default fetch-based
   * client (e.g. for a proxy, custom TLS, or instrumentation).
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

  /**
   * Controls how a configuration profile fills the options left unset above.
   *
   * Profile resolution is enabled by default: the config file
   * (~/.databrickscfg or `$DATABRICKS_CONFIG_FILE`) and DATABRICKS_*
   * environment variables supply `host`, `accountId`, `workspaceId`, and
   * credentials whenever the caller does not set them explicitly. Explicit
   * values always win. Disable the file with `noProfile`, the environment
   * with `disableEnv`, or select a specific `profile`/`configFile`.
   */
  profileOptions?: ProfileOptions;
}
