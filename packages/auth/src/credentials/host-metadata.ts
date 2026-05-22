import {z} from 'zod';

/**
 * HostMetadata holds the parsed response from the
 * /.well-known/databricks-config discovery endpoint.
 */
export interface HostMetadata {
  /**
   * oidcEndpoint is the OIDC discovery URL for this host. For account hosts,
   * this may contain an {account_id} placeholder that callers must
   * substitute.
   */
  oidcEndpoint: string;

  /**
   * accountId is the Databricks account ID associated with this host, if
   * available.
   */
  accountId?: string;

  /**
   * workspaceId is the Databricks workspace ID associated with this host, if
   * available.
   */
  workspaceId?: string;
}

/**
 * getHostMetadata fetches the raw Databricks well-known configuration from
 * {host}/.well-known/databricks-config. The returned HostMetadata contains
 * raw values with no substitution (e.g., {account_id} placeholders are left
 * as-is). Callers are responsible for interpreting the result.
 */
export async function getHostMetadata(host: string): Promise<HostMetadata> {
  const url = `${trimTrailingSlash(host)}/.well-known/databricks-config`;
  let response: Response;
  try {
    response = await fetch(url);
  } catch (e) {
    throw new Error(
      `fetching host metadata from ${url} failed: ${stringifyError(e)}`
    );
  }
  if (!response.ok) {
    const text = await safeReadText(response);
    throw new Error(
      `fetching host metadata from ${url} failed with status ` +
        `${response.status.toString()}: ${text}`
    );
  }
  let raw: unknown;
  try {
    raw = await response.json();
  } catch (e) {
    throw new Error(
      `parsing host metadata from ${url} failed: ${stringifyError(e)}`
    );
  }
  const parsed = hostMetadataSchema.parse(raw);
  return {
    oidcEndpoint: parsed.oidc_endpoint,
    ...(parsed.account_id !== undefined && {accountId: parsed.account_id}),
    ...(parsed.workspace_id !== undefined && {
      workspaceId: parsed.workspace_id,
    }),
  };
}

/**
 * resolveTokenEndpoint resolves the OAuth `token_endpoint` for the given
 * Databricks host via a two-step discovery:
 *
 * 1. `GET {host}/.well-known/databricks-config` to obtain the OIDC root.
 * 2. `GET {oidcRoot}/.well-known/oauth-authorization-server` to obtain the
 *    RFC 8414 authorization server metadata.
 *
 * If the OIDC root contains an `{account_id}` placeholder, it is substituted
 * with the first defined value from: `configAccountId` (caller-supplied),
 * then the `account_id` field returned by the host metadata response.
 * Throws when any step fails, required fields are missing, or the placeholder
 * cannot be resolved.
 */
export async function resolveTokenEndpoint(
  host: string,
  configAccountId?: string
): Promise<string> {
  const meta = await getHostMetadata(host);
  // Precedence mirrors the legacy SDK: a caller-supplied account ID
  // overrides any value returned by the host metadata. The metadata
  // back-fills only when the caller did not provide one.
  const accountId =
    configAccountId !== undefined && configAccountId !== ''
      ? configAccountId
      : meta.accountId;
  let oidcRoot = meta.oidcEndpoint;
  if (oidcRoot.includes('{account_id}')) {
    if (accountId === undefined || accountId === '') {
      throw new Error(
        'host metadata oidc_endpoint contains {account_id} placeholder but ' +
          'no account_id was provided or returned by the metadata response'
      );
    }
    oidcRoot = oidcRoot.replaceAll('{account_id}', accountId);
  }
  const discoveryUrl = `${trimTrailingSlash(oidcRoot)}/.well-known/oauth-authorization-server`;
  let response: Response;
  try {
    response = await fetch(discoveryUrl);
  } catch (e) {
    throw new Error(
      `fetching oauth authorization server metadata from ${discoveryUrl} ` +
        `failed: ${stringifyError(e)}`
    );
  }
  if (!response.ok) {
    const text = await safeReadText(response);
    throw new Error(
      `fetching oauth authorization server metadata from ${discoveryUrl} ` +
        `failed with status ${response.status.toString()}: ${text}`
    );
  }
  let raw: unknown;
  try {
    raw = await response.json();
  } catch (e) {
    throw new Error(
      `parsing oauth authorization server metadata from ${discoveryUrl} ` +
        `failed: ${stringifyError(e)}`
    );
  }
  const parsed = oauthServerSchema.parse(raw);
  return parsed.token_endpoint;
}

const hostMetadataSchema = z.object({
  oidc_endpoint: z.string(),
  account_id: z.string().optional(),
  workspace_id: z.string().optional(),
});

const oauthServerSchema = z.object({
  token_endpoint: z.string(),
});

function trimTrailingSlash(s: string): string {
  let end = s.length;
  while (end > 0 && s.charAt(end - 1) === '/') {
    end--;
  }
  return s.slice(0, end);
}

async function safeReadText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return '';
  }
}

function stringifyError(e: unknown): string {
  if (e instanceof Error) {
    return e.message;
  }
  return String(e);
}
