// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum ModelVersionStatus {
  MODEL_VERSION_STATUS_UNKNOWN = 'MODEL_VERSION_STATUS_UNKNOWN',
  /** Request to register a new model version is pending as client uploads model files. */
  PENDING_REGISTRATION = 'PENDING_REGISTRATION',
  /** Request to register a new model version has failed. */
  FAILED_REGISTRATION = 'FAILED_REGISTRATION',
  /** Model version is ready for use. */
  READY = 'READY',
}

/** A connection that is dependent on a SQL object. */
export interface ConnectionDependency {
  /** Full name of the dependent connection, in the form of __connection_name__. */
  connectionName?: string | undefined;
}

export interface CreateRegisteredModel {
  /** The name of the registered model */
  name?: string | undefined;
  /** The name of the catalog where the schema and the registered model reside */
  catalogName?: string | undefined;
  /** The name of the schema where the registered model resides */
  schemaName?: string | undefined;
  /** The identifier of the user who owns the registered model */
  owner?: string | undefined;
  /** The comment attached to the registered model */
  comment?: string | undefined;
  /** The storage location on the cloud under which model version data files are stored */
  storageLocation?: string | undefined;
  /** The unique identifier of the metastore */
  metastoreId?: string | undefined;
  /** The three-level (fully qualified) name of the registered model */
  fullName?: string | undefined;
  /** Creation timestamp of the registered model in milliseconds since the Unix epoch */
  createdAt?: number | undefined;
  /** The identifier of the user who created the registered model */
  createdBy?: string | undefined;
  /** Last-update timestamp of the registered model in milliseconds since the Unix epoch */
  updatedAt?: number | undefined;
  /** The identifier of the user who updated the registered model last time */
  updatedBy?: string | undefined;
  /** List of aliases associated with the registered model */
  aliases?: RegisteredModelAliasInfo[] | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

/** A credential that is dependent on a SQL object. */
export interface CredentialDependency {
  /** Full name of the dependent credential, in the form of __credential_name__. */
  credentialName?: string | undefined;
}

export interface DeleteModelVersion {
  /** The three-level (fully qualified) name of the model version */
  fullNameArg?: string | undefined;
  /** The integer version number of the model version */
  versionArg?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteModelVersion_Response {}

export interface DeleteRegisteredModel {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteRegisteredModel_Response {}

export interface DeleteRegisteredModelAlias {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
  /** The name of the alias */
  aliasArg?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteRegisteredModelAlias_Response {}

/**
 * A dependency of a SQL object. One of the following fields must be defined:
 * __table__, __function__, __connection__, __credential__, __volume__, or __secret__.
 */
export interface Dependency {
  table?: TableDependency | undefined;
  function?: FunctionDependency | undefined;
  connection?: ConnectionDependency | undefined;
  credential?: CredentialDependency | undefined;
  /** A dependency on a Unity Catalog volume. */
  volume?: VolumeDependency | undefined;
  /** A dependency on a Unity Catalog secret. */
  secret?: SecretDependency | undefined;
}

/** A list of dependencies. */
export interface DependencyList {
  /** Array of dependencies. */
  dependencies?: Dependency[] | undefined;
}

/** A function that is dependent on a SQL object. */
export interface FunctionDependency {
  /** Full name of the dependent function, in the form of __catalog_name__.__schema_name__.__function_name__. */
  functionFullName?: string | undefined;
}

export interface GetModelVersion {
  /** The three-level (fully qualified) name of the model version */
  fullNameArg?: string | undefined;
  /** The integer version number of the model version */
  versionArg?: number | undefined;
  /** Whether to include aliases associated with the model version in the response */
  includeAliases?: boolean | undefined;
  /** Whether to include model versions in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface GetModelVersionByAlias {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
  /** The name of the alias */
  aliasArg?: string | undefined;
  /** Whether to include aliases associated with the model version in the response */
  includeAliases?: boolean | undefined;
}

export interface GetRegisteredModel {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
  /** Whether to include registered model aliases in the response */
  includeAliases?: boolean | undefined;
  /** Whether to include registered models in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface ListModelVersions {
  /** The full three-level name of the registered model under which to list model versions */
  fullNameArg?: string | undefined;
  /**
   * Maximum number of model versions to return.
   * If not set, the page length is set to a server configured value (100, as of 1/3/2024).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value(1000, as of 1/3/2024);
   * - when set to 0, the page length is set to a server configured value (100, as of 1/3/2024) (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
  /** Whether to include model versions in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListModelVersions_Response {
  modelVersions?: ModelVersionInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListRegisteredModels {
  /**
   * The identifier of the catalog under which to list registered models.
   * If specified, schema_name must be specified.
   */
  catalogName?: string | undefined;
  /**
   * The identifier of the schema under which to list registered models.
   * If specified, catalog_name must be specified.
   */
  schemaName?: string | undefined;
  /** Whether to include registered models in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
  /**
   * Max number of registered models to return.
   * 
   * If both catalog and schema are specified:
   * - when max_results is not specified, the page length is set to a server configured value (10000, as of 4/2/2024).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value (10000, as of 4/2/2024);
   * - when set to 0, the page length is set to a server configured value (10000, as of 4/2/2024);
   * - when set to a value less than 0, an invalid parameter error is returned;
   * 
   * If neither schema nor catalog is specified:
   * - when max_results is not specified, the page length is set to a server configured value (100, as of 4/2/2024).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value (1000, as of 4/2/2024);
   * - when set to 0, the page length is set to a server configured value (100, as of 4/2/2024);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: number | undefined;
  /** Opaque token to send for the next page of results (pagination). */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListRegisteredModels_Response {
  registeredModels?: RegisteredModelInfo[] | undefined;
  /**
   * Opaque token for pagination. Omitted if there are no more results. page_token should
   * be set to this value for fetching the next page.
   */
  nextPageToken?: string | undefined;
}

export interface ModelVersionInfo {
  /** The name of the parent registered model of the model version, relative to parent schema */
  modelName?: string | undefined;
  /** The name of the catalog containing the model version */
  catalogName?: string | undefined;
  /** The name of the schema containing the model version, relative to parent catalog */
  schemaName?: string | undefined;
  /** URI indicating the location of the source artifacts (files) for the model version */
  source?: string | undefined;
  /** The comment attached to the model version */
  comment?: string | undefined;
  /**
   * MLflow run ID used when creating the model version, if ``source`` was generated by an
   * experiment run stored in an MLflow tracking server
   */
  runId?: string | undefined;
  /**
   * ID of the <Databricks> workspace containing the MLflow run that generated this model
   * version, if applicable
   */
  runWorkspaceId?: number | undefined;
  /** Model version dependencies, for feature-store packaged models */
  modelVersionDependencies?: DependencyList | undefined;
  /**
   * Current status of the model version. Newly created model versions start in
   * PENDING_REGISTRATION status, then move to READY status once the model version files are uploaded and
   * the model version is finalized. Only model versions in READY status can be loaded for inference or
   * served.
   */
  status?: ModelVersionStatus | undefined;
  /** Integer model version number, used to reference the model version in API requests. */
  version?: number | undefined;
  /** The storage location on the cloud under which model version data files are stored */
  storageLocation?: string | undefined;
  /** The unique identifier of the metastore containing the model version */
  metastoreId?: string | undefined;
  createdAt?: number | undefined;
  /** The identifier of the user who created the model version */
  createdBy?: string | undefined;
  updatedAt?: number | undefined;
  /** The identifier of the user who updated the model version last time */
  updatedBy?: string | undefined;
  /** The unique identifier of the model version */
  id?: string | undefined;
  /** List of aliases associated with the model version */
  aliases?: RegisteredModelAliasInfo[] | undefined;
}

export interface RegisteredModelAliasInfo {
  /** Name of the alias, e.g. 'champion' or 'latest_stable' */
  aliasName?: string | undefined;
  /** Integer version number of the model version to which this alias points. */
  versionNum?: number | undefined;
  /** The unique identifier of the alias */
  id?: string | undefined;
  /** The name of the parent registered model of the model version, relative to parent schema */
  modelName?: string | undefined;
  /** The name of the catalog containing the model version */
  catalogName?: string | undefined;
  /** The name of the schema containing the model version, relative to parent catalog */
  schemaName?: string | undefined;
}

export interface RegisteredModelInfo {
  /** The name of the registered model */
  name?: string | undefined;
  /** The name of the catalog where the schema and the registered model reside */
  catalogName?: string | undefined;
  /** The name of the schema where the registered model resides */
  schemaName?: string | undefined;
  /** The identifier of the user who owns the registered model */
  owner?: string | undefined;
  /** The comment attached to the registered model */
  comment?: string | undefined;
  /** The storage location on the cloud under which model version data files are stored */
  storageLocation?: string | undefined;
  /** The unique identifier of the metastore */
  metastoreId?: string | undefined;
  /** The three-level (fully qualified) name of the registered model */
  fullName?: string | undefined;
  /** Creation timestamp of the registered model in milliseconds since the Unix epoch */
  createdAt?: number | undefined;
  /** The identifier of the user who created the registered model */
  createdBy?: string | undefined;
  /** Last-update timestamp of the registered model in milliseconds since the Unix epoch */
  updatedAt?: number | undefined;
  /** The identifier of the user who updated the registered model last time */
  updatedBy?: string | undefined;
  /** List of aliases associated with the registered model */
  aliases?: RegisteredModelAliasInfo[] | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

/** A secret that is dependent on a SQL object. */
export interface SecretDependency {
  /** Full name of the dependent secret, in the form of __catalog_name__.__schema_name__.__secret_name__. */
  secretFullName?: string | undefined;
}

export interface SetRegisteredModelAlias {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
  /** The name of the alias */
  aliasArg?: string | undefined;
  /** The version number of the model version to which the alias points */
  versionNum?: number | undefined;
}

/** A table that is dependent on a SQL object. */
export interface TableDependency {
  /** Full name of the dependent table, in the form of __catalog_name__.__schema_name__.__table_name__. */
  tableFullName?: string | undefined;
}

export interface UpdateModelVersion {
  /** The three-level (fully qualified) name of the model version */
  fullNameArg?: string | undefined;
  /** The integer version number of the model version */
  versionArg?: number | undefined;
  /** The name of the parent registered model of the model version, relative to parent schema */
  modelName?: string | undefined;
  /** The name of the catalog containing the model version */
  catalogName?: string | undefined;
  /** The name of the schema containing the model version, relative to parent catalog */
  schemaName?: string | undefined;
  /** URI indicating the location of the source artifacts (files) for the model version */
  source?: string | undefined;
  /** The comment attached to the model version */
  comment?: string | undefined;
  /**
   * MLflow run ID used when creating the model version, if ``source`` was generated by an
   * experiment run stored in an MLflow tracking server
   */
  runId?: string | undefined;
  /**
   * ID of the <Databricks> workspace containing the MLflow run that generated this model
   * version, if applicable
   */
  runWorkspaceId?: number | undefined;
  /** Model version dependencies, for feature-store packaged models */
  modelVersionDependencies?: DependencyList | undefined;
  /**
   * Current status of the model version. Newly created model versions start in
   * PENDING_REGISTRATION status, then move to READY status once the model version files are uploaded and
   * the model version is finalized. Only model versions in READY status can be loaded for inference or
   * served.
   */
  status?: ModelVersionStatus | undefined;
  /** Integer model version number, used to reference the model version in API requests. */
  version?: number | undefined;
  /** The storage location on the cloud under which model version data files are stored */
  storageLocation?: string | undefined;
  /** The unique identifier of the metastore containing the model version */
  metastoreId?: string | undefined;
  createdAt?: number | undefined;
  /** The identifier of the user who created the model version */
  createdBy?: string | undefined;
  updatedAt?: number | undefined;
  /** The identifier of the user who updated the model version last time */
  updatedBy?: string | undefined;
  /** The unique identifier of the model version */
  id?: string | undefined;
  /** List of aliases associated with the model version */
  aliases?: RegisteredModelAliasInfo[] | undefined;
}

export interface UpdateRegisteredModel {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
  /** New name for the registered model. */
  newName?: string | undefined;
  /** The name of the registered model */
  name?: string | undefined;
  /** The name of the catalog where the schema and the registered model reside */
  catalogName?: string | undefined;
  /** The name of the schema where the registered model resides */
  schemaName?: string | undefined;
  /** The identifier of the user who owns the registered model */
  owner?: string | undefined;
  /** The comment attached to the registered model */
  comment?: string | undefined;
  /** The storage location on the cloud under which model version data files are stored */
  storageLocation?: string | undefined;
  /** The unique identifier of the metastore */
  metastoreId?: string | undefined;
  /** The three-level (fully qualified) name of the registered model */
  fullName?: string | undefined;
  /** Creation timestamp of the registered model in milliseconds since the Unix epoch */
  createdAt?: number | undefined;
  /** The identifier of the user who created the registered model */
  createdBy?: string | undefined;
  /** Last-update timestamp of the registered model in milliseconds since the Unix epoch */
  updatedAt?: number | undefined;
  /** The identifier of the user who updated the registered model last time */
  updatedBy?: string | undefined;
  /** List of aliases associated with the registered model */
  aliases?: RegisteredModelAliasInfo[] | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

/** A volume that is dependent on a SQL object. */
export interface VolumeDependency {
  /** Full name of the dependent volume, in the form of __catalog_name__.__schema_name__.__volume_name__. */
  volumeFullName?: string | undefined;
}

export const unmarshalConnectionDependencySchema: z.ZodType<ConnectionDependency> = z
  .object({
    connection_name: z.string().optional(),
  })
  .transform(d => ({
    connectionName: d.connection_name,
  }));

export const unmarshalCreateRegisteredModelSchema: z.ZodType<CreateRegisteredModel> = z
  .object({
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_location: z.string().optional(),
    metastore_id: z.string().optional(),
    full_name: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    aliases: z.array(z.lazy(() => unmarshalRegisteredModelAliasInfoSchema)).optional(),
    browse_only: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    owner: d.owner,
    comment: d.comment,
    storageLocation: d.storage_location,
    metastoreId: d.metastore_id,
    fullName: d.full_name,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    aliases: d.aliases,
    browseOnly: d.browse_only,
  }));

export const unmarshalCredentialDependencySchema: z.ZodType<CredentialDependency> = z
  .object({
    credential_name: z.string().optional(),
  })
  .transform(d => ({
    credentialName: d.credential_name,
  }));

export const unmarshalDeleteModelVersionSchema: z.ZodType<DeleteModelVersion> = z
  .object({
    full_name_arg: z.string().optional(),
    version_arg: z.number().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    versionArg: d.version_arg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteModelVersion_ResponseSchema: z.ZodType<DeleteModelVersion_Response> = z
  .object({
  });

export const unmarshalDeleteRegisteredModelSchema: z.ZodType<DeleteRegisteredModel> = z
  .object({
    full_name_arg: z.string().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteRegisteredModel_ResponseSchema: z.ZodType<DeleteRegisteredModel_Response> = z
  .object({
  });

export const unmarshalDeleteRegisteredModelAliasSchema: z.ZodType<DeleteRegisteredModelAlias> = z
  .object({
    full_name_arg: z.string().optional(),
    alias_arg: z.string().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    aliasArg: d.alias_arg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteRegisteredModelAlias_ResponseSchema: z.ZodType<DeleteRegisteredModelAlias_Response> = z
  .object({
  });

export const unmarshalDependencySchema: z.ZodType<Dependency> = z
  .object({
    table: z.lazy(() => unmarshalTableDependencySchema).optional(),
    function: z.lazy(() => unmarshalFunctionDependencySchema).optional(),
    connection: z.lazy(() => unmarshalConnectionDependencySchema).optional(),
    credential: z.lazy(() => unmarshalCredentialDependencySchema).optional(),
    volume: z.lazy(() => unmarshalVolumeDependencySchema).optional(),
    secret: z.lazy(() => unmarshalSecretDependencySchema).optional(),
  })
  .transform(d => ({
    table: d.table,
    function: d.function,
    connection: d.connection,
    credential: d.credential,
    volume: d.volume,
    secret: d.secret,
  }));

export const unmarshalDependencyListSchema: z.ZodType<DependencyList> = z
  .object({
    dependencies: z.array(z.lazy(() => unmarshalDependencySchema)).optional(),
  })
  .transform(d => ({
    dependencies: d.dependencies,
  }));

export const unmarshalFunctionDependencySchema: z.ZodType<FunctionDependency> = z
  .object({
    function_full_name: z.string().optional(),
  })
  .transform(d => ({
    functionFullName: d.function_full_name,
  }));

export const unmarshalGetModelVersionSchema: z.ZodType<GetModelVersion> = z
  .object({
    full_name_arg: z.string().optional(),
    version_arg: z.number().optional(),
    include_aliases: z.boolean().optional(),
    include_browse: z.boolean().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    versionArg: d.version_arg,
    includeAliases: d.include_aliases,
    includeBrowse: d.include_browse,
  }));

export const unmarshalGetModelVersionByAliasSchema: z.ZodType<GetModelVersionByAlias> = z
  .object({
    full_name_arg: z.string().optional(),
    alias_arg: z.string().optional(),
    include_aliases: z.boolean().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    aliasArg: d.alias_arg,
    includeAliases: d.include_aliases,
  }));

export const unmarshalGetRegisteredModelSchema: z.ZodType<GetRegisteredModel> = z
  .object({
    full_name_arg: z.string().optional(),
    include_aliases: z.boolean().optional(),
    include_browse: z.boolean().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    includeAliases: d.include_aliases,
    includeBrowse: d.include_browse,
  }));

export const unmarshalListModelVersionsSchema: z.ZodType<ListModelVersions> = z
  .object({
    full_name_arg: z.string().optional(),
    max_results: z.number().optional(),
    page_token: z.string().optional(),
    include_browse: z.boolean().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    maxResults: d.max_results,
    pageToken: d.page_token,
    includeBrowse: d.include_browse,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListModelVersions_ResponseSchema: z.ZodType<ListModelVersions_Response> = z
  .object({
    model_versions: z.array(z.lazy(() => unmarshalModelVersionInfoSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    modelVersions: d.model_versions,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListRegisteredModelsSchema: z.ZodType<ListRegisteredModels> = z
  .object({
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    include_browse: z.boolean().optional(),
    max_results: z.number().optional(),
    page_token: z.string().optional(),
  })
  .transform(d => ({
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    includeBrowse: d.include_browse,
    maxResults: d.max_results,
    pageToken: d.page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListRegisteredModels_ResponseSchema: z.ZodType<ListRegisteredModels_Response> = z
  .object({
    registered_models: z.array(z.lazy(() => unmarshalRegisteredModelInfoSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    registeredModels: d.registered_models,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalModelVersionInfoSchema: z.ZodType<ModelVersionInfo> = z
  .object({
    model_name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    source: z.string().optional(),
    comment: z.string().optional(),
    run_id: z.string().optional(),
    run_workspace_id: z.number().optional(),
    model_version_dependencies: z.lazy(() => unmarshalDependencyListSchema).optional(),
    status: z.enum(ModelVersionStatus).optional(),
    version: z.number().optional(),
    storage_location: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    id: z.string().optional(),
    aliases: z.array(z.lazy(() => unmarshalRegisteredModelAliasInfoSchema)).optional(),
  })
  .transform(d => ({
    modelName: d.model_name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    source: d.source,
    comment: d.comment,
    runId: d.run_id,
    runWorkspaceId: d.run_workspace_id,
    modelVersionDependencies: d.model_version_dependencies,
    status: d.status,
    version: d.version,
    storageLocation: d.storage_location,
    metastoreId: d.metastore_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    id: d.id,
    aliases: d.aliases,
  }));

export const unmarshalRegisteredModelAliasInfoSchema: z.ZodType<RegisteredModelAliasInfo> = z
  .object({
    alias_name: z.string().optional(),
    version_num: z.number().optional(),
    id: z.string().optional(),
    model_name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
  })
  .transform(d => ({
    aliasName: d.alias_name,
    versionNum: d.version_num,
    id: d.id,
    modelName: d.model_name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
  }));

export const unmarshalRegisteredModelInfoSchema: z.ZodType<RegisteredModelInfo> = z
  .object({
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_location: z.string().optional(),
    metastore_id: z.string().optional(),
    full_name: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    aliases: z.array(z.lazy(() => unmarshalRegisteredModelAliasInfoSchema)).optional(),
    browse_only: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    owner: d.owner,
    comment: d.comment,
    storageLocation: d.storage_location,
    metastoreId: d.metastore_id,
    fullName: d.full_name,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    aliases: d.aliases,
    browseOnly: d.browse_only,
  }));

export const unmarshalSecretDependencySchema: z.ZodType<SecretDependency> = z
  .object({
    secret_full_name: z.string().optional(),
  })
  .transform(d => ({
    secretFullName: d.secret_full_name,
  }));

export const unmarshalSetRegisteredModelAliasSchema: z.ZodType<SetRegisteredModelAlias> = z
  .object({
    full_name_arg: z.string().optional(),
    alias_arg: z.string().optional(),
    version_num: z.number().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    aliasArg: d.alias_arg,
    versionNum: d.version_num,
  }));

export const unmarshalTableDependencySchema: z.ZodType<TableDependency> = z
  .object({
    table_full_name: z.string().optional(),
  })
  .transform(d => ({
    tableFullName: d.table_full_name,
  }));

export const unmarshalUpdateModelVersionSchema: z.ZodType<UpdateModelVersion> = z
  .object({
    full_name_arg: z.string().optional(),
    version_arg: z.number().optional(),
    model_name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    source: z.string().optional(),
    comment: z.string().optional(),
    run_id: z.string().optional(),
    run_workspace_id: z.number().optional(),
    model_version_dependencies: z.lazy(() => unmarshalDependencyListSchema).optional(),
    status: z.enum(ModelVersionStatus).optional(),
    version: z.number().optional(),
    storage_location: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    id: z.string().optional(),
    aliases: z.array(z.lazy(() => unmarshalRegisteredModelAliasInfoSchema)).optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    versionArg: d.version_arg,
    modelName: d.model_name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    source: d.source,
    comment: d.comment,
    runId: d.run_id,
    runWorkspaceId: d.run_workspace_id,
    modelVersionDependencies: d.model_version_dependencies,
    status: d.status,
    version: d.version,
    storageLocation: d.storage_location,
    metastoreId: d.metastore_id,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    id: d.id,
    aliases: d.aliases,
  }));

export const unmarshalUpdateRegisteredModelSchema: z.ZodType<UpdateRegisteredModel> = z
  .object({
    full_name_arg: z.string().optional(),
    new_name: z.string().optional(),
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storage_location: z.string().optional(),
    metastore_id: z.string().optional(),
    full_name: z.string().optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
    aliases: z.array(z.lazy(() => unmarshalRegisteredModelAliasInfoSchema)).optional(),
    browse_only: z.boolean().optional(),
  })
  .transform(d => ({
    fullNameArg: d.full_name_arg,
    newName: d.new_name,
    name: d.name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    owner: d.owner,
    comment: d.comment,
    storageLocation: d.storage_location,
    metastoreId: d.metastore_id,
    fullName: d.full_name,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    aliases: d.aliases,
    browseOnly: d.browse_only,
  }));

export const unmarshalVolumeDependencySchema: z.ZodType<VolumeDependency> = z
  .object({
    volume_full_name: z.string().optional(),
  })
  .transform(d => ({
    volumeFullName: d.volume_full_name,
  }));

export const marshalConnectionDependencySchema: z.ZodType = z
  .object({
    connectionName: z.string().optional(),
  })
  .transform(d => ({
    connection_name: d.connectionName,
  }));

export const marshalCreateRegisteredModelSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageLocation: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    aliases: z.array(z.lazy(() => marshalRegisteredModelAliasInfoSchema)).optional(),
    browseOnly: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    owner: d.owner,
    comment: d.comment,
    storage_location: d.storageLocation,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    aliases: d.aliases,
    browse_only: d.browseOnly,
  }));

export const marshalCredentialDependencySchema: z.ZodType = z
  .object({
    credentialName: z.string().optional(),
  })
  .transform(d => ({
    credential_name: d.credentialName,
  }));

export const marshalDeleteModelVersionSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    versionArg: z.number().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    version_arg: d.versionArg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteModelVersion_ResponseSchema: z.ZodType = z
  .object({
  });

export const marshalDeleteRegisteredModelSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteRegisteredModel_ResponseSchema: z.ZodType = z
  .object({
  });

export const marshalDeleteRegisteredModelAliasSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    aliasArg: z.string().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    alias_arg: d.aliasArg,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteRegisteredModelAlias_ResponseSchema: z.ZodType = z
  .object({
  });

export const marshalDependencySchema: z.ZodType = z
  .object({
    table: z.lazy(() => marshalTableDependencySchema).optional(),
    function: z.lazy(() => marshalFunctionDependencySchema).optional(),
    connection: z.lazy(() => marshalConnectionDependencySchema).optional(),
    credential: z.lazy(() => marshalCredentialDependencySchema).optional(),
    volume: z.lazy(() => marshalVolumeDependencySchema).optional(),
    secret: z.lazy(() => marshalSecretDependencySchema).optional(),
  })
  .transform(d => ({
    table: d.table,
    function: d.function,
    connection: d.connection,
    credential: d.credential,
    volume: d.volume,
    secret: d.secret,
  }));

export const marshalDependencyListSchema: z.ZodType = z
  .object({
    dependencies: z.array(z.lazy(() => marshalDependencySchema)).optional(),
  })
  .transform(d => ({
    dependencies: d.dependencies,
  }));

export const marshalFunctionDependencySchema: z.ZodType = z
  .object({
    functionFullName: z.string().optional(),
  })
  .transform(d => ({
    function_full_name: d.functionFullName,
  }));

export const marshalGetModelVersionSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    versionArg: z.number().optional(),
    includeAliases: z.boolean().optional(),
    includeBrowse: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    version_arg: d.versionArg,
    include_aliases: d.includeAliases,
    include_browse: d.includeBrowse,
  }));

export const marshalGetModelVersionByAliasSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    aliasArg: z.string().optional(),
    includeAliases: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    alias_arg: d.aliasArg,
    include_aliases: d.includeAliases,
  }));

export const marshalGetRegisteredModelSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    includeAliases: z.boolean().optional(),
    includeBrowse: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    include_aliases: d.includeAliases,
    include_browse: d.includeBrowse,
  }));

export const marshalListModelVersionsSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
    includeBrowse: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    max_results: d.maxResults,
    page_token: d.pageToken,
    include_browse: d.includeBrowse,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListModelVersions_ResponseSchema: z.ZodType = z
  .object({
    modelVersions: z.array(z.lazy(() => marshalModelVersionInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    model_versions: d.modelVersions,
    next_page_token: d.nextPageToken,
  }));

export const marshalListRegisteredModelsSchema: z.ZodType = z
  .object({
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    includeBrowse: z.boolean().optional(),
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    include_browse: d.includeBrowse,
    max_results: d.maxResults,
    page_token: d.pageToken,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListRegisteredModels_ResponseSchema: z.ZodType = z
  .object({
    registeredModels: z.array(z.lazy(() => marshalRegisteredModelInfoSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    registered_models: d.registeredModels,
    next_page_token: d.nextPageToken,
  }));

export const marshalModelVersionInfoSchema: z.ZodType = z
  .object({
    modelName: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    source: z.string().optional(),
    comment: z.string().optional(),
    runId: z.string().optional(),
    runWorkspaceId: z.number().optional(),
    modelVersionDependencies: z.lazy(() => marshalDependencyListSchema).optional(),
    status: z.enum(ModelVersionStatus).optional(),
    version: z.number().optional(),
    storageLocation: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    id: z.string().optional(),
    aliases: z.array(z.lazy(() => marshalRegisteredModelAliasInfoSchema)).optional(),
  })
  .transform(d => ({
    model_name: d.modelName,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    source: d.source,
    comment: d.comment,
    run_id: d.runId,
    run_workspace_id: d.runWorkspaceId,
    model_version_dependencies: d.modelVersionDependencies,
    status: d.status,
    version: d.version,
    storage_location: d.storageLocation,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    id: d.id,
    aliases: d.aliases,
  }));

export const marshalRegisteredModelAliasInfoSchema: z.ZodType = z
  .object({
    aliasName: z.string().optional(),
    versionNum: z.number().optional(),
    id: z.string().optional(),
    modelName: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
  })
  .transform(d => ({
    alias_name: d.aliasName,
    version_num: d.versionNum,
    id: d.id,
    model_name: d.modelName,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
  }));

export const marshalRegisteredModelInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageLocation: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    aliases: z.array(z.lazy(() => marshalRegisteredModelAliasInfoSchema)).optional(),
    browseOnly: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    owner: d.owner,
    comment: d.comment,
    storage_location: d.storageLocation,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    aliases: d.aliases,
    browse_only: d.browseOnly,
  }));

export const marshalSecretDependencySchema: z.ZodType = z
  .object({
    secretFullName: z.string().optional(),
  })
  .transform(d => ({
    secret_full_name: d.secretFullName,
  }));

export const marshalSetRegisteredModelAliasSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    aliasArg: z.string().optional(),
    versionNum: z.number().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    alias_arg: d.aliasArg,
    version_num: d.versionNum,
  }));

export const marshalTableDependencySchema: z.ZodType = z
  .object({
    tableFullName: z.string().optional(),
  })
  .transform(d => ({
    table_full_name: d.tableFullName,
  }));

export const marshalUpdateModelVersionSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    versionArg: z.number().optional(),
    modelName: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    source: z.string().optional(),
    comment: z.string().optional(),
    runId: z.string().optional(),
    runWorkspaceId: z.number().optional(),
    modelVersionDependencies: z.lazy(() => marshalDependencyListSchema).optional(),
    status: z.enum(ModelVersionStatus).optional(),
    version: z.number().optional(),
    storageLocation: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    id: z.string().optional(),
    aliases: z.array(z.lazy(() => marshalRegisteredModelAliasInfoSchema)).optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    version_arg: d.versionArg,
    model_name: d.modelName,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    source: d.source,
    comment: d.comment,
    run_id: d.runId,
    run_workspace_id: d.runWorkspaceId,
    model_version_dependencies: d.modelVersionDependencies,
    status: d.status,
    version: d.version,
    storage_location: d.storageLocation,
    metastore_id: d.metastoreId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    id: d.id,
    aliases: d.aliases,
  }));

export const marshalUpdateRegisteredModelSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    newName: z.string().optional(),
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageLocation: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    aliases: z.array(z.lazy(() => marshalRegisteredModelAliasInfoSchema)).optional(),
    browseOnly: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    new_name: d.newName,
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    owner: d.owner,
    comment: d.comment,
    storage_location: d.storageLocation,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    aliases: d.aliases,
    browse_only: d.browseOnly,
  }));

export const marshalVolumeDependencySchema: z.ZodType = z
  .object({
    volumeFullName: z.string().optional(),
  })
  .transform(d => ({
    volume_full_name: d.volumeFullName,
  }));
