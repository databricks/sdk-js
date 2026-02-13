/**
 * Client options for configuring Databricks API clients.
 */

import type {Credentials} from '@databricks/sdk-auth';

/**
 * A fetch-compatible function type for making HTTP requests.
 */
export type HttpClientFn = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

/**
 * Logger interface for SDK diagnostics. Compatible with console and
 * structured loggers.
 */
export interface Logger {
  /** Logs a debug-level message. */
  debug(message: string, ...args: unknown[]): void;
  /** Logs an informational message. */
  info(message: string, ...args: unknown[]): void;
  /** Logs a warning. */
  warn(message: string, ...args: unknown[]): void;
  /** Logs an error. */
  error(message: string, ...args: unknown[]): void;
}

/**
 * Internal client options that can be set via ClientOption functions.
 */
export interface ClientOptions {
  /** The Databricks host URL. */
  host?: string;

  /** A pre-built fetch-compatible client to use as-is. */
  httpClient?: HttpClientFn;

  /** Credentials for authenticating API requests. */
  credentials?: Credentials;

  /** Overall timeout in milliseconds for API calls. */
  timeoutMs?: number;

  /** Logger for SDK diagnostic messages. */
  logger?: Logger;
}

/**
 * A function that configures a ClientOptions instance.
 */
export type ClientOption = (opts: ClientOptions) => void;

/**
 * Returns a ClientOption that sets the Databricks host URL.
 */
export function withHost(h: string): ClientOption {
  return (opts: ClientOptions): void => {
    opts.host = h;
  };
}

/**
 * Returns a ClientOption to use a specific fetch-compatible client.
 *
 * When set, this option takes precedence and ignores other transport options.
 */
export function withHttpClient(c: HttpClientFn): ClientOption {
  return (opts: ClientOptions): void => {
    opts.httpClient = c;
  };
}

/**
 * Returns a ClientOption that sets the credentials for authentication.
 */
export function withCredentials(c: Credentials): ClientOption {
  return (opts: ClientOptions): void => {
    opts.credentials = c;
  };
}

/**
 * Returns a ClientOption that sets the default API call timeout.
 */
export function withTimeout(ms: number): ClientOption {
  return (opts: ClientOptions): void => {
    opts.timeoutMs = ms;
  };
}

/**
 * Returns a ClientOption that sets the logger for SDK diagnostics.
 */
export function withLogger(l: Logger): ClientOption {
  return (opts: ClientOptions): void => {
    opts.logger = l;
  };
}

/**
 * Applies all ClientOptions and returns the resolved configuration.
 */
export function resolveOptions(...opts: ClientOption[]): ClientOptions {
  const result: ClientOptions = {};
  for (const opt of opts) {
    opt(result);
  }
  return result;
}
