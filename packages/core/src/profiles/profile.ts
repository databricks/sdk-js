/**
 * Profile interface and property mapping for Databricks configuration.
 *
 * @module
 */

import {Secret} from './secret';

/**
 * Holds configuration values resolved from a databrickscfg file and/or
 * environment variables. All fields are optional; an absent field means the
 * value was not configured.
 */
export interface Profile {
  /** Profile name (INI section name). */
  name?: string;

  /** Databricks workspace or Accounts API endpoint URL. */
  host?: string;

  /** Databricks Workspace ID, used with unified hosts. */
  workspaceId?: string;

  /** Databricks Account ID for Accounts API. */
  accountId?: string;

  /** Personal access token for PAT authentication. */
  token?: Secret;

  /** Selects a specific auth method when multiple credentials are available. */
  authType?: string;

  /** OAuth client ID for M2M authentication. */
  clientId?: string;

  /** OAuth client secret for M2M authentication. */
  clientSecret?: Secret;

  /** Path to the Databricks CLI binary (>= 0.100.0) for CLI-based auth. */
  databricksCliPath?: string;

  /**
   * INI keys not mapped to a known field. Only populated when loading from a
   * config file; environment variables do not contribute to extra.
   */
  extra?: Record<string, string>;
}

/** Configures the behavior of {@link resolve}. */
export interface ResolveOptions {
  /**
   * Path to the databrickscfg file. If not set, reads
   * DATABRICKS_CONFIG_FILE from the environment, falling back to
   * ~/.databrickscfg. Setting this implies withFile: true.
   */
  filePath?: string;

  /**
   * Profile name (INI section) to load. If not set, resolves from the
   * DATABRICKS_CONFIG_PROFILE environment variable, then the default_profile
   * key in the __settings__ section, then falls back to the DEFAULT section.
   * Setting this implies withFile: true.
   */
  profile?: string;

  /**
   * Whether to read from the config file. The default is context-dependent: a
   * bare {@link resolve} call with no options reads the config file, but once
   * any option is supplied this defaults to false unless explicitly set to
   * true. Setting filePath or profile implies withFile: true.
   */
  withFile?: boolean;

  /**
   * Whether to overlay environment variables on top of config file values.
   * When enabled, environment variables take precedence over file values. The
   * default is context-dependent: a bare {@link resolve} call with no options
   * overlays environment variables, but once any option is supplied this
   * defaults to false unless explicitly set to true.
   */
  withEnv?: boolean;
}

/**
 * Reserved INI section name for SDK settings. It is never treated as a
 * profile.
 */
export const SETTINGS_SECTION = '__settings__';

// ---------------------------------------------------------------------------
// Declarative property mapping
// ---------------------------------------------------------------------------

/**
 * Maps a {@link Profile} field to its environment variable and INI key,
 * with typed getter and setter closures. This avoids reflection while
 * keeping the mapping declarative, matching the Go SDK's approach.
 */
export interface PropertyDef {
  /** The Profile field name this property maps to. */
  readonly field: keyof Profile;
  readonly envVar: string;
  readonly iniKey: string;
  /** Sets the profile field from a raw INI/env string value. */
  readonly set: (profile: Profile, raw: string) => void;
  /** Returns the profile field as a string, or undefined if unset. */
  readonly get: (profile: Profile) => string | undefined;
}

/**
 * Declarative property mapping table for all known profile fields.
 */
export const PROPERTY_DEFS: readonly PropertyDef[] = [
  {
    field: 'host',
    envVar: 'DATABRICKS_HOST',
    iniKey: 'host',
    set: (p: Profile, v: string): void => {
      p.host = v;
    },
    get: (p: Profile): string | undefined => p.host,
  },
  {
    field: 'workspaceId',
    envVar: 'DATABRICKS_WORKSPACE_ID',
    iniKey: 'workspace_id',
    set: (p: Profile, v: string): void => {
      p.workspaceId = v;
    },
    get: (p: Profile): string | undefined => p.workspaceId,
  },
  {
    field: 'accountId',
    envVar: 'DATABRICKS_ACCOUNT_ID',
    iniKey: 'account_id',
    set: (p: Profile, v: string): void => {
      p.accountId = v;
    },
    get: (p: Profile): string | undefined => p.accountId,
  },
  {
    field: 'token',
    envVar: 'DATABRICKS_TOKEN',
    iniKey: 'token',
    set: (p: Profile, v: string): void => {
      p.token = new Secret(v);
    },
    get: (p: Profile): string | undefined => p.token?.value,
  },
  {
    field: 'authType',
    envVar: 'DATABRICKS_AUTH_TYPE',
    iniKey: 'auth_type',
    set: (p: Profile, v: string): void => {
      p.authType = v;
    },
    get: (p: Profile): string | undefined => p.authType,
  },
  {
    field: 'clientId',
    envVar: 'DATABRICKS_CLIENT_ID',
    iniKey: 'client_id',
    set: (p: Profile, v: string): void => {
      p.clientId = v;
    },
    get: (p: Profile): string | undefined => p.clientId,
  },
  {
    field: 'clientSecret',
    envVar: 'DATABRICKS_CLIENT_SECRET',
    iniKey: 'client_secret',
    set: (p: Profile, v: string): void => {
      p.clientSecret = new Secret(v);
    },
    get: (p: Profile): string | undefined => p.clientSecret?.value,
  },
  {
    field: 'databricksCliPath',
    envVar: 'DATABRICKS_CLI_PATH',
    iniKey: 'databricks_cli_path',
    set: (p: Profile, v: string): void => {
      p.databricksCliPath = v;
    },
    get: (p: Profile): string | undefined => p.databricksCliPath,
  },
];
