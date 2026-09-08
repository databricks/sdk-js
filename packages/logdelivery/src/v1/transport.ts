// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Credentials} from '@databricks/sdk-auth';
import {defaultCredentials} from '@databricks/sdk-auth/credentials';
import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';
import {newFetchHttpClient} from '@databricks/sdk-core/http';
import type {Profile} from '@databricks/sdk-core/profiles';
import {resolve} from '@databricks/sdk-core/profiles';
import type {ClientOptions} from '@databricks/sdk-options/client';

/**
 * The configuration a client needs to issue requests, resolved from
 * {@link ClientOptions} and a configuration profile.
 */
export interface ResolvedClientConfig {
  /** Host with any trailing slash removed. */
  host: string;

  /**
   * Default account ID for account-level paths that contain an account_id
   * segment. A request's own accountId still wins.
   */
  accountId?: string;

  /**
   * Workspace ID used to route workspace-level calls on unified hosts (SPOG).
   */
  workspaceId?: string;

  /** HTTP client with authentication, and any configured timeout, applied. */
  httpClient: HttpClient;
}

/**
 * Resolves {@link ClientOptions} into a {@link ResolvedClientConfig}.
 *
 * A configuration profile is always resolved from the config file and
 * environment variables (per options.profileOptions); it supplies host,
 * accountId, workspaceId, and credentials wherever the caller did not set them
 * explicitly. Explicit options always take precedence.
 *
 * @throws if host is neither provided nor present in the resolved profile.
 */
export async function resolveClientConfig(
  options: ClientOptions
): Promise<ResolvedClientConfig> {
  const profile: Profile = await resolve(options.profileOptions);

  const host = normalizeHost(options.host ?? profile.host);
  if (host === undefined) {
    throw new Error('Host is required.');
  }

  // The provided httpClient (or the default fetch client) is the base wire;
  // authentication and the optional timeout are layered on top of it. The
  // default credential chain reuses the profile resolved above so that the
  // same profileOptions govern host and authentication alike.
  const base = options.httpClient ?? newFetchHttpClient();
  const credentials =
    options.credentials ?? defaultCredentials({profile: {...profile, host}});
  let httpClient: HttpClient = new AuthHttpClient(base, credentials);
  if (options.timeout !== undefined) {
    httpClient = new TimeoutHttpClient(httpClient, options.timeout);
  }

  const accountId = options.accountId ?? profile.accountId;
  const workspaceId = options.workspaceId ?? profile.workspaceId;

  return {
    host,
    httpClient,
    ...(accountId !== undefined && {accountId}),
    ...(workspaceId !== undefined && {workspaceId}),
  };
}

function normalizeHost(host: string | undefined): string | undefined {
  const trimmed = host?.trim();
  if (trimmed === undefined || trimmed === '') {
    return undefined;
  }
  const absolute = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  return absolute.replace(/\/$/, '');
}

/** Wraps an HttpClient and adds authentication headers to requests. */
class AuthHttpClient implements HttpClient {
  constructor(
    private readonly base: HttpClient,
    private readonly credentials: Credentials
  ) {}

  async send(request: HttpRequest): Promise<HttpResponse> {
    const authHeaders = await this.credentials.authHeaders();
    // Do not modify the original request.
    const headers = new Headers(request.headers);
    for (const h of authHeaders) {
      headers.set(h.key, h.value);
    }
    return this.base.send({...request, headers});
  }
}

/** Wraps an HttpClient and applies a default timeout to requests. */
class TimeoutHttpClient implements HttpClient {
  constructor(
    private readonly base: HttpClient,
    private readonly timeout: number
  ) {}

  async send(request: HttpRequest): Promise<HttpResponse> {
    const timeoutSignal = AbortSignal.timeout(this.timeout);
    const signal =
      request.signal !== undefined
        ? AbortSignal.any([request.signal, timeoutSignal])
        : timeoutSignal;
    return this.base.send({...request, signal});
  }
}
