/**
 * Normalizes a client configuration so its host and credentials derive from a
 * single source and can never reference different profiles.
 *
 * @packageDocumentation
 */

/** Caller-supplied options consumed by {@link resolveClientConfig}. */
export interface ClientConfigInput {
  /** Host explicitly set by the caller; wins over the profile host. */
  host?: string;

  /** Workspace ID explicitly set by the caller; wins over the profile. */
  workspaceId?: string;

  /** Account ID explicitly set by the caller; wins over the profile. */
  accountId?: string;

  /** Config profile to resolve. When omitted, the default profile is used. */
  profile?: string;
}

/**
 * A normalized client configuration. The host and the profile travel together
 * so credentials authenticate against the same profile the client resolved.
 */
export interface ResolvedClientConfig {
  /** Resolved host, or undefined when the caller set none. */
  host?: string;

  /** Resolved workspace ID. */
  workspaceId?: string;

  /** Resolved account ID. */
  accountId?: string;

  /**
   * Profile name threaded to credentials so they authenticate against the
   * same profile the client resolved.
   */
  profile?: string;
}

/**
 * Normalizes caller options into a single config. The profile name travels
 * with the host so credentials reuse the same profile, preventing the host
 * and credentials from drifting apart.
 */
export function resolveClientConfig(
  options: ClientConfigInput
): ResolvedClientConfig {
  return {
    ...(options.host !== undefined && {host: options.host}),
    ...(options.workspaceId !== undefined && {workspaceId: options.workspaceId}),
    ...(options.accountId !== undefined && {accountId: options.accountId}),
    ...(options.profile !== undefined && {profile: options.profile}),
  };
}
