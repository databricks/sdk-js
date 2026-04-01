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

  /** Username for basic authentication. */
  username?: string;

  /** Password for basic authentication. */
  password?: Secret;

  /** Selects a specific auth method when multiple credentials are available. */
  authType?: string;

  /** OAuth client ID for M2M authentication. */
  clientId?: string;

  /** OAuth client secret for M2M authentication. */
  clientSecret?: Secret;

  /** Path to the Databricks CLI binary (>= 0.100.0) for CLI-based auth. */
  databricksCliPath?: string;

  /** URL of a metadata service that provides authentication credentials. */
  metadataServiceUrl?: Secret;

  /** GitHub Actions URL for requesting an OIDC token. */
  actionsIdTokenRequestUrl?: string;

  /** Bearer token for the GitHub Actions OIDC provider. */
  actionsIdTokenRequestToken?: Secret;

  /** Name of an environment variable containing an OIDC ID token. */
  oidcTokenEnv?: string;

  /** Path to a file containing an OIDC ID token. */
  oidcTokenFilePath?: string;

  /** Audience for Workload Identity Federation ID token requests. */
  tokenAudience?: string;

  /** OpenID Connect discovery URL override. */
  discoveryUrl?: string;

  /** Azure AD application (client) ID. */
  azureClientId?: string;

  /** Azure AD client secret. */
  azureClientSecret?: Secret;

  /** Azure AD tenant ID. */
  azureTenantId?: string;

  /** Azure Resource Manager ID for an Azure Databricks workspace. */
  azureResourceId?: string;

  /** Azure cloud environment (PUBLIC, USGOVERNMENT, CHINA). */
  azureEnvironment?: string;

  /**
   * Azure Login Application ID.
   *
   * @deprecated This field no longer has any effect.
   */
  azureLoginAppId?: string;

  /** Whether to use Azure Managed Service Identity authentication. */
  azureUseMsi?: boolean;

  /** GCP service account credentials JSON. */
  googleCredentials?: Secret;

  /** GCP service account email for Google ID-based authentication. */
  googleServiceAccount?: string;

  /** Default Databricks cluster ID for compute operations. */
  clusterId?: string;

  /** Default Databricks SQL warehouse ID. */
  warehouseId?: string;

  /** Default serverless compute resource ID. */
  serverlessComputeId?: string;

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

  /** Whether to read from the config file. Default: true. */
  withFile?: boolean;

  /**
   * Whether to overlay environment variables on top of config file values.
   * When enabled, environment variables take precedence over file values.
   * Default: true.
   */
  withEnv?: boolean;
}

/**
 * Reserved INI section name for SDK settings. It is never treated as a
 * profile.
 */
export const SETTINGS_SECTION = '__settings__';

/** Maps a {@link Profile} field to its environment variable and INI key. */
export interface Property {
  readonly envVar: string;
  readonly iniKey: string;
  set(profile: Profile, value: string): void;
  get(profile: Profile): string;
}

/**
 * Parses a boolean string value using the same rules as Go's
 * strconv.ParseBool.
 */
function parseBool(value: string): boolean {
  switch (value) {
    case '1':
    case 't':
    case 'T':
    case 'TRUE':
    case 'true':
    case 'True':
      return true;
    case '0':
    case 'f':
    case 'F':
    case 'FALSE':
    case 'false':
    case 'False':
      return false;
    default:
      throw new Error(`invalid boolean value: "${value}"`);
  }
}

/** Property mapping table for all known profile fields. */
export const PROPERTIES: readonly Property[] = [
  {
    envVar: 'DATABRICKS_HOST',
    iniKey: 'host',
    set(p: Profile, v: string): void {
      p.host = v;
    },
    get(p: Profile): string {
      return p.host ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_WORKSPACE_ID',
    iniKey: 'workspace_id',
    set(p: Profile, v: string): void {
      p.workspaceId = v;
    },
    get(p: Profile): string {
      return p.workspaceId ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_ACCOUNT_ID',
    iniKey: 'account_id',
    set(p: Profile, v: string): void {
      p.accountId = v;
    },
    get(p: Profile): string {
      return p.accountId ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_TOKEN',
    iniKey: 'token',
    set(p: Profile, v: string): void {
      p.token = new Secret(v);
    },
    get(p: Profile): string {
      return p.token?.value ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_USERNAME',
    iniKey: 'username',
    set(p: Profile, v: string): void {
      p.username = v;
    },
    get(p: Profile): string {
      return p.username ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_PASSWORD',
    iniKey: 'password',
    set(p: Profile, v: string): void {
      p.password = new Secret(v);
    },
    get(p: Profile): string {
      return p.password?.value ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_AUTH_TYPE',
    iniKey: 'auth_type',
    set(p: Profile, v: string): void {
      p.authType = v;
    },
    get(p: Profile): string {
      return p.authType ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_CLIENT_ID',
    iniKey: 'client_id',
    set(p: Profile, v: string): void {
      p.clientId = v;
    },
    get(p: Profile): string {
      return p.clientId ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_CLIENT_SECRET',
    iniKey: 'client_secret',
    set(p: Profile, v: string): void {
      p.clientSecret = new Secret(v);
    },
    get(p: Profile): string {
      return p.clientSecret?.value ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_CLI_PATH',
    iniKey: 'databricks_cli_path',
    set(p: Profile, v: string): void {
      p.databricksCliPath = v;
    },
    get(p: Profile): string {
      return p.databricksCliPath ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_METADATA_SERVICE_URL',
    iniKey: 'metadata_service_url',
    set(p: Profile, v: string): void {
      p.metadataServiceUrl = new Secret(v);
    },
    get(p: Profile): string {
      return p.metadataServiceUrl?.value ?? '';
    },
  },
  {
    envVar: 'ACTIONS_ID_TOKEN_REQUEST_URL',
    iniKey: 'actions_id_token_request_url',
    set(p: Profile, v: string): void {
      p.actionsIdTokenRequestUrl = v;
    },
    get(p: Profile): string {
      return p.actionsIdTokenRequestUrl ?? '';
    },
  },
  {
    envVar: 'ACTIONS_ID_TOKEN_REQUEST_TOKEN',
    iniKey: 'actions_id_token_request_token',
    set(p: Profile, v: string): void {
      p.actionsIdTokenRequestToken = new Secret(v);
    },
    get(p: Profile): string {
      return p.actionsIdTokenRequestToken?.value ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_OIDC_TOKEN_ENV',
    iniKey: 'oidc_token_env',
    set(p: Profile, v: string): void {
      p.oidcTokenEnv = v;
    },
    get(p: Profile): string {
      return p.oidcTokenEnv ?? '';
    },
  },
  {
    // Intentional mismatch between envVar and iniKey for backward
    // compatibility.
    envVar: 'DATABRICKS_OIDC_TOKEN_FILEPATH',
    iniKey: 'databricks_id_token_filepath',
    set(p: Profile, v: string): void {
      p.oidcTokenFilePath = v;
    },
    get(p: Profile): string {
      return p.oidcTokenFilePath ?? '';
    },
  },
  {
    // Intentional mismatch between envVar and iniKey for backward
    // compatibility.
    envVar: 'DATABRICKS_TOKEN_AUDIENCE',
    iniKey: 'audience',
    set(p: Profile, v: string): void {
      p.tokenAudience = v;
    },
    get(p: Profile): string {
      return p.tokenAudience ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_DISCOVERY_URL',
    iniKey: 'discovery_url',
    set(p: Profile, v: string): void {
      p.discoveryUrl = v;
    },
    get(p: Profile): string {
      return p.discoveryUrl ?? '';
    },
  },
  {
    envVar: 'ARM_CLIENT_ID',
    iniKey: 'azure_client_id',
    set(p: Profile, v: string): void {
      p.azureClientId = v;
    },
    get(p: Profile): string {
      return p.azureClientId ?? '';
    },
  },
  {
    envVar: 'ARM_CLIENT_SECRET',
    iniKey: 'azure_client_secret',
    set(p: Profile, v: string): void {
      p.azureClientSecret = new Secret(v);
    },
    get(p: Profile): string {
      return p.azureClientSecret?.value ?? '';
    },
  },
  {
    envVar: 'ARM_TENANT_ID',
    iniKey: 'azure_tenant_id',
    set(p: Profile, v: string): void {
      p.azureTenantId = v;
    },
    get(p: Profile): string {
      return p.azureTenantId ?? '';
    },
  },
  {
    // Intentional mismatch between envVar and iniKey for backward
    // compatibility.
    envVar: 'DATABRICKS_AZURE_RESOURCE_ID',
    iniKey: 'azure_workspace_resource_id',
    set(p: Profile, v: string): void {
      p.azureResourceId = v;
    },
    get(p: Profile): string {
      return p.azureResourceId ?? '';
    },
  },
  {
    envVar: 'ARM_ENVIRONMENT',
    iniKey: 'azure_environment',
    set(p: Profile, v: string): void {
      p.azureEnvironment = v;
    },
    get(p: Profile): string {
      return p.azureEnvironment ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_AZURE_LOGIN_APP_ID',
    iniKey: 'azure_login_app_id',
    set(p: Profile, v: string): void {
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- Required for backward compatibility.
      p.azureLoginAppId = v;
    },
    get(p: Profile): string {
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- Required for backward compatibility.
      return p.azureLoginAppId ?? '';
    },
  },
  {
    envVar: 'ARM_USE_MSI',
    iniKey: 'azure_use_msi',
    set(p: Profile, v: string): void {
      p.azureUseMsi = parseBool(v);
    },
    get(p: Profile): string {
      if (p.azureUseMsi === undefined) {
        return '';
      }
      return String(p.azureUseMsi);
    },
  },
  {
    envVar: 'GOOGLE_CREDENTIALS',
    iniKey: 'google_credentials',
    set(p: Profile, v: string): void {
      p.googleCredentials = new Secret(v);
    },
    get(p: Profile): string {
      return p.googleCredentials?.value ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_GOOGLE_SERVICE_ACCOUNT',
    iniKey: 'google_service_account',
    set(p: Profile, v: string): void {
      p.googleServiceAccount = v;
    },
    get(p: Profile): string {
      return p.googleServiceAccount ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_CLUSTER_ID',
    iniKey: 'cluster_id',
    set(p: Profile, v: string): void {
      p.clusterId = v;
    },
    get(p: Profile): string {
      return p.clusterId ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_WAREHOUSE_ID',
    iniKey: 'warehouse_id',
    set(p: Profile, v: string): void {
      p.warehouseId = v;
    },
    get(p: Profile): string {
      return p.warehouseId ?? '';
    },
  },
  {
    envVar: 'DATABRICKS_SERVERLESS_COMPUTE_ID',
    iniKey: 'serverless_compute_id',
    set(p: Profile, v: string): void {
      p.serverlessComputeId = v;
    },
    get(p: Profile): string {
      return p.serverlessComputeId ?? '';
    },
  },
];
