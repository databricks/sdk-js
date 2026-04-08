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

// ---------------------------------------------------------------------------
// Declarative property mapping
// ---------------------------------------------------------------------------

/** Maps a {@link Profile} field to its environment variable and INI key. */
export interface PropertyDef {
  readonly field: keyof Profile;
  readonly envVar: string;
  readonly iniKey: string;
  /** Converts an INI/env string value to the profile field value. */
  readonly parse: (raw: string) => unknown;
  /** Converts a profile field value back to a string for writing. */
  readonly serialize: (value: unknown) => string | undefined;
}

/** Converter pair shared by all plain string properties. */
type PropertyConverters = Pick<PropertyDef, 'parse' | 'serialize'>;

const STRING_PROPERTY: PropertyConverters = {
  parse: (raw: string): unknown => raw,
  serialize: (value: unknown): string | undefined => {
    if (typeof value !== 'string' || value === '') {
      return undefined;
    }
    return value;
  },
};

const SECRET_PROPERTY: PropertyConverters = {
  parse: (raw: string): unknown => new Secret(raw),
  serialize: (value: unknown): string | undefined => {
    if (!(value instanceof Secret)) {
      return undefined;
    }
    return value.value === '' ? undefined : value.value;
  },
};

/**
 * Parses common boolean string representations (true/false, 1/0, t/f and
 * their case variants).
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

const BOOLEAN_PROPERTY: PropertyConverters = {
  parse: (raw: string): unknown => parseBool(raw),
  serialize: (value: unknown): string | undefined => {
    if (typeof value !== 'boolean') {
      return undefined;
    }
    return String(value);
  },
};

/** Sets a profile field from a raw INI/env string value. */
export function setProfileField(
  profile: Profile,
  def: PropertyDef,
  rawValue: string
): void {
  Object.assign(profile, {[def.field]: def.parse(rawValue)});
}

/**
 * Reads a profile field and returns its string representation, or
 * undefined if the field is absent or empty.
 */
export function getProfileField(
  profile: Profile,
  def: PropertyDef
): string | undefined {
  return def.serialize(profile[def.field]);
}

/**
 * Declarative property mapping table for all known profile fields.
 *
 * Three entries have intentional mismatches between envVar and iniKey for
 * backward compatibility with existing config files:
 * - DATABRICKS_OIDC_TOKEN_FILEPATH / databricks_id_token_filepath
 * - DATABRICKS_TOKEN_AUDIENCE / audience
 * - DATABRICKS_AZURE_RESOURCE_ID / azure_workspace_resource_id
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated -- The table includes azureLoginAppId for backward compatibility.
export const PROPERTY_DEFS: readonly PropertyDef[] = [
  {
    field: 'host',
    envVar: 'DATABRICKS_HOST',
    iniKey: 'host',
    ...STRING_PROPERTY,
  },
  {
    field: 'workspaceId',
    envVar: 'DATABRICKS_WORKSPACE_ID',
    iniKey: 'workspace_id',
    ...STRING_PROPERTY,
  },
  {
    field: 'accountId',
    envVar: 'DATABRICKS_ACCOUNT_ID',
    iniKey: 'account_id',
    ...STRING_PROPERTY,
  },
  {
    field: 'token',
    envVar: 'DATABRICKS_TOKEN',
    iniKey: 'token',
    ...SECRET_PROPERTY,
  },
  {
    field: 'username',
    envVar: 'DATABRICKS_USERNAME',
    iniKey: 'username',
    ...STRING_PROPERTY,
  },
  {
    field: 'password',
    envVar: 'DATABRICKS_PASSWORD',
    iniKey: 'password',
    ...SECRET_PROPERTY,
  },
  {
    field: 'authType',
    envVar: 'DATABRICKS_AUTH_TYPE',
    iniKey: 'auth_type',
    ...STRING_PROPERTY,
  },
  {
    field: 'clientId',
    envVar: 'DATABRICKS_CLIENT_ID',
    iniKey: 'client_id',
    ...STRING_PROPERTY,
  },
  {
    field: 'clientSecret',
    envVar: 'DATABRICKS_CLIENT_SECRET',
    iniKey: 'client_secret',
    ...SECRET_PROPERTY,
  },
  {
    field: 'databricksCliPath',
    envVar: 'DATABRICKS_CLI_PATH',
    iniKey: 'databricks_cli_path',
    ...STRING_PROPERTY,
  },
  {
    field: 'metadataServiceUrl',
    envVar: 'DATABRICKS_METADATA_SERVICE_URL',
    iniKey: 'metadata_service_url',
    ...SECRET_PROPERTY,
  },
  {
    field: 'actionsIdTokenRequestUrl',
    envVar: 'ACTIONS_ID_TOKEN_REQUEST_URL',
    iniKey: 'actions_id_token_request_url',
    ...STRING_PROPERTY,
  },
  {
    field: 'actionsIdTokenRequestToken',
    envVar: 'ACTIONS_ID_TOKEN_REQUEST_TOKEN',
    iniKey: 'actions_id_token_request_token',
    ...SECRET_PROPERTY,
  },
  {
    field: 'oidcTokenEnv',
    envVar: 'DATABRICKS_OIDC_TOKEN_ENV',
    iniKey: 'oidc_token_env',
    ...STRING_PROPERTY,
  },
  // Intentional mismatch between envVar and iniKey for backward compatibility.
  {
    field: 'oidcTokenFilePath',
    envVar: 'DATABRICKS_OIDC_TOKEN_FILEPATH',
    iniKey: 'databricks_id_token_filepath',
    ...STRING_PROPERTY,
  },
  // Intentional mismatch between envVar and iniKey for backward compatibility.
  {
    field: 'tokenAudience',
    envVar: 'DATABRICKS_TOKEN_AUDIENCE',
    iniKey: 'audience',
    ...STRING_PROPERTY,
  },
  {
    field: 'discoveryUrl',
    envVar: 'DATABRICKS_DISCOVERY_URL',
    iniKey: 'discovery_url',
    ...STRING_PROPERTY,
  },
  {
    field: 'azureClientId',
    envVar: 'ARM_CLIENT_ID',
    iniKey: 'azure_client_id',
    ...STRING_PROPERTY,
  },
  {
    field: 'azureClientSecret',
    envVar: 'ARM_CLIENT_SECRET',
    iniKey: 'azure_client_secret',
    ...SECRET_PROPERTY,
  },
  {
    field: 'azureTenantId',
    envVar: 'ARM_TENANT_ID',
    iniKey: 'azure_tenant_id',
    ...STRING_PROPERTY,
  },
  // Intentional mismatch between envVar and iniKey for backward compatibility.
  {
    field: 'azureResourceId',
    envVar: 'DATABRICKS_AZURE_RESOURCE_ID',
    iniKey: 'azure_workspace_resource_id',
    ...STRING_PROPERTY,
  },
  {
    field: 'azureEnvironment',
    envVar: 'ARM_ENVIRONMENT',
    iniKey: 'azure_environment',
    ...STRING_PROPERTY,
  },
  {
    field: 'azureLoginAppId',
    envVar: 'DATABRICKS_AZURE_LOGIN_APP_ID',
    iniKey: 'azure_login_app_id',
    ...STRING_PROPERTY,
  },
  {
    field: 'azureUseMsi',
    envVar: 'ARM_USE_MSI',
    iniKey: 'azure_use_msi',
    ...BOOLEAN_PROPERTY,
  },
  {
    field: 'googleCredentials',
    envVar: 'GOOGLE_CREDENTIALS',
    iniKey: 'google_credentials',
    ...SECRET_PROPERTY,
  },
  {
    field: 'googleServiceAccount',
    envVar: 'DATABRICKS_GOOGLE_SERVICE_ACCOUNT',
    iniKey: 'google_service_account',
    ...STRING_PROPERTY,
  },
  {
    field: 'clusterId',
    envVar: 'DATABRICKS_CLUSTER_ID',
    iniKey: 'cluster_id',
    ...STRING_PROPERTY,
  },
  {
    field: 'warehouseId',
    envVar: 'DATABRICKS_WAREHOUSE_ID',
    iniKey: 'warehouse_id',
    ...STRING_PROPERTY,
  },
  {
    field: 'serverlessComputeId',
    envVar: 'DATABRICKS_SERVERLESS_COMPUTE_ID',
    iniKey: 'serverless_compute_id',
    ...STRING_PROPERTY,
  },
];
