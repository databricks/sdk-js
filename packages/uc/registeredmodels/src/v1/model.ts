// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ModelVersionStatus = {
  MODEL_VERSION_STATUS_UNKNOWN: 'MODEL_VERSION_STATUS_UNKNOWN',
  /** Request to register a new model version is pending as client uploads model files. */
  PENDING_REGISTRATION: 'PENDING_REGISTRATION',
  /** Request to register a new model version has failed. */
  FAILED_REGISTRATION: 'FAILED_REGISTRATION',
  /** Model version is ready for use. */
  READY: 'READY',
} as const;
export type ModelVersionStatus =
  | (typeof ModelVersionStatus)[keyof typeof ModelVersionStatus]
  | (string & {});

/** A connection that is dependent on a SQL object. */
export interface ConnectionDependency {
  /** Full name of the dependent connection, in the form of __connection_name__. */
  connectionName?: string | undefined;
}

export interface CreateRegisteredModelRequest {
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
  createdAt?: bigint | undefined;
  /** The identifier of the user who created the registered model */
  createdBy?: string | undefined;
  /** Last-update timestamp of the registered model in milliseconds since the Unix epoch */
  updatedAt?: bigint | undefined;
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

export interface DeleteModelVersionRequest {
  /** The three-level (fully qualified) name of the model version */
  fullNameArg?: string | undefined;
  /** The integer version number of the model version */
  versionArg?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteModelVersionResponse {}

export interface DeleteRegisteredModelAliasRequest {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
  /** The name of the alias */
  aliasArg?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteRegisteredModelAliasResponse {}

export interface DeleteRegisteredModelRequest {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteRegisteredModelResponse {}

/**
 * A dependency of a SQL object. One of the following fields must be defined:
 * __table__, __function__, __connection__, __credential__, __volume__, or __secret__.
 */
export interface Dependency {
  value?:
    | {$case: 'table'; table: TableDependency}
    | {$case: 'function'; function: FunctionDependency}
    | {$case: 'connection'; connection: ConnectionDependency}
    | {$case: 'credential'; credential: CredentialDependency}
    | undefined;
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

export interface GetModelVersionByAliasRequest {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
  /** The name of the alias */
  aliasArg?: string | undefined;
  /** Whether to include aliases associated with the model version in the response */
  includeAliases?: boolean | undefined;
}

export interface GetModelVersionRequest {
  /** The three-level (fully qualified) name of the model version */
  fullNameArg?: string | undefined;
  /** The integer version number of the model version */
  versionArg?: bigint | undefined;
  /** Whether to include aliases associated with the model version in the response */
  includeAliases?: boolean | undefined;
  /** Whether to include model versions in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface GetRegisteredModelRequest {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
  /** Whether to include registered model aliases in the response */
  includeAliases?: boolean | undefined;
  /** Whether to include registered models in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface ListModelVersionsRequest {
  /** The full three-level name of the registered model under which to list model versions */
  fullNameArg?: string | undefined;
  /**
   * Maximum number of model versions to return.
   * If not set, the page length is set to a server configured value (100, as of 1/3/2024).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value(1000, as of 1/3/2024);
   * - when set to 0, the page length is set to a server configured value (100, as of 1/3/2024) (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: bigint | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
  /** Whether to include model versions in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface ListModelVersionsResponse {
  modelVersions?: ModelVersionInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export interface ListRegisteredModelsRequest {
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
  maxResults?: bigint | undefined;
  /** Opaque token to send for the next page of results (pagination). */
  pageToken?: string | undefined;
}

export interface ListRegisteredModelsResponse {
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
  runWorkspaceId?: bigint | undefined;
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
  version?: bigint | undefined;
  /** The storage location on the cloud under which model version data files are stored */
  storageLocation?: string | undefined;
  /** The unique identifier of the metastore containing the model version */
  metastoreId?: string | undefined;
  createdAt?: bigint | undefined;
  /** The identifier of the user who created the model version */
  createdBy?: string | undefined;
  updatedAt?: bigint | undefined;
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
  versionNum?: bigint | undefined;
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
  createdAt?: bigint | undefined;
  /** The identifier of the user who created the registered model */
  createdBy?: string | undefined;
  /** Last-update timestamp of the registered model in milliseconds since the Unix epoch */
  updatedAt?: bigint | undefined;
  /** The identifier of the user who updated the registered model last time */
  updatedBy?: string | undefined;
  /** List of aliases associated with the registered model */
  aliases?: RegisteredModelAliasInfo[] | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

export interface SetRegisteredModelAliasRequest {
  /** The three-level (fully qualified) name of the registered model */
  fullNameArg?: string | undefined;
  /** The name of the alias */
  aliasArg?: string | undefined;
  /** The version number of the model version to which the alias points */
  versionNum?: bigint | undefined;
}

/** A table that is dependent on a SQL object. */
export interface TableDependency {
  /** Full name of the dependent table, in the form of __catalog_name__.__schema_name__.__table_name__. */
  tableFullName?: string | undefined;
}

export interface UpdateModelVersionRequest {
  /** The three-level (fully qualified) name of the model version */
  fullNameArg?: string | undefined;
  /** The integer version number of the model version */
  versionArg?: bigint | undefined;
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
  runWorkspaceId?: bigint | undefined;
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
  version?: bigint | undefined;
  /** The storage location on the cloud under which model version data files are stored */
  storageLocation?: string | undefined;
  /** The unique identifier of the metastore containing the model version */
  metastoreId?: string | undefined;
  createdAt?: bigint | undefined;
  /** The identifier of the user who created the model version */
  createdBy?: string | undefined;
  updatedAt?: bigint | undefined;
  /** The identifier of the user who updated the model version last time */
  updatedBy?: string | undefined;
  /** The unique identifier of the model version */
  id?: string | undefined;
  /** List of aliases associated with the model version */
  aliases?: RegisteredModelAliasInfo[] | undefined;
}

export interface UpdateRegisteredModelRequest {
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
  createdAt?: bigint | undefined;
  /** The identifier of the user who created the registered model */
  createdBy?: string | undefined;
  /** Last-update timestamp of the registered model in milliseconds since the Unix epoch */
  updatedAt?: bigint | undefined;
  /** The identifier of the user who updated the registered model last time */
  updatedBy?: string | undefined;
  /** List of aliases associated with the registered model */
  aliases?: RegisteredModelAliasInfo[] | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

export const unmarshalConnectionDependencySchema: z.ZodType<ConnectionDependency> =
  z
    .object({
      connection_name: z.string().optional(),
    })
    .transform(d => ({
      connectionName: d.connection_name,
    }));

export const unmarshalCredentialDependencySchema: z.ZodType<CredentialDependency> =
  z
    .object({
      credential_name: z.string().optional(),
    })
    .transform(d => ({
      credentialName: d.credential_name,
    }));

export const unmarshalDeleteModelVersionResponseSchema: z.ZodType<DeleteModelVersionResponse> =
  z.object({});

export const unmarshalDeleteRegisteredModelAliasResponseSchema: z.ZodType<DeleteRegisteredModelAliasResponse> =
  z.object({});

export const unmarshalDeleteRegisteredModelResponseSchema: z.ZodType<DeleteRegisteredModelResponse> =
  z.object({});

export const unmarshalDependencySchema: z.ZodType<Dependency> = z
  .object({
    table: z.lazy(() => unmarshalTableDependencySchema).optional(),
    function: z.lazy(() => unmarshalFunctionDependencySchema).optional(),
    connection: z.lazy(() => unmarshalConnectionDependencySchema).optional(),
    credential: z.lazy(() => unmarshalCredentialDependencySchema).optional(),
  })
  .transform(d => ({
    value:
      d.table !== undefined
        ? {$case: 'table' as const, table: d.table}
        : d.function !== undefined
          ? {$case: 'function' as const, function: d.function}
          : d.connection !== undefined
            ? {$case: 'connection' as const, connection: d.connection}
            : d.credential !== undefined
              ? {$case: 'credential' as const, credential: d.credential}
              : undefined,
  }));

export const unmarshalDependencyListSchema: z.ZodType<DependencyList> = z
  .object({
    dependencies: z.array(z.lazy(() => unmarshalDependencySchema)).optional(),
  })
  .transform(d => ({
    dependencies: d.dependencies,
  }));

export const unmarshalFunctionDependencySchema: z.ZodType<FunctionDependency> =
  z
    .object({
      function_full_name: z.string().optional(),
    })
    .transform(d => ({
      functionFullName: d.function_full_name,
    }));

export const unmarshalListModelVersionsResponseSchema: z.ZodType<ListModelVersionsResponse> =
  z
    .object({
      model_versions: z
        .array(z.lazy(() => unmarshalModelVersionInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      modelVersions: d.model_versions,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListRegisteredModelsResponseSchema: z.ZodType<ListRegisteredModelsResponse> =
  z
    .object({
      registered_models: z
        .array(z.lazy(() => unmarshalRegisteredModelInfoSchema))
        .optional(),
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
    run_workspace_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    model_version_dependencies: z
      .lazy(() => unmarshalDependencyListSchema)
      .optional(),
    status: z.string().optional(),
    version: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    storage_location: z.string().optional(),
    metastore_id: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z.string().optional(),
    updated_at: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z.string().optional(),
    id: z.string().optional(),
    aliases: z
      .array(z.lazy(() => unmarshalRegisteredModelAliasInfoSchema))
      .optional(),
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

export const unmarshalRegisteredModelAliasInfoSchema: z.ZodType<RegisteredModelAliasInfo> =
  z
    .object({
      alias_name: z.string().optional(),
      version_num: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
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

export const unmarshalRegisteredModelInfoSchema: z.ZodType<RegisteredModelInfo> =
  z
    .object({
      name: z.string().optional(),
      catalog_name: z.string().optional(),
      schema_name: z.string().optional(),
      owner: z.string().optional(),
      comment: z.string().optional(),
      storage_location: z.string().optional(),
      metastore_id: z.string().optional(),
      full_name: z.string().optional(),
      created_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      created_by: z.string().optional(),
      updated_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      updated_by: z.string().optional(),
      aliases: z
        .array(z.lazy(() => unmarshalRegisteredModelAliasInfoSchema))
        .optional(),
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

export const unmarshalTableDependencySchema: z.ZodType<TableDependency> = z
  .object({
    table_full_name: z.string().optional(),
  })
  .transform(d => ({
    tableFullName: d.table_full_name,
  }));

export const marshalConnectionDependencySchema: z.ZodType = z
  .object({
    connectionName: z.string().optional(),
  })
  .transform(d => ({
    connection_name: d.connectionName,
  }));

export const marshalCreateRegisteredModelRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    storageLocation: z.string().optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    aliases: z
      .array(z.lazy(() => marshalRegisteredModelAliasInfoSchema))
      .optional(),
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

export const marshalDependencySchema: z.ZodType = z
  .object({
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('table'),
          table: z.lazy(() => marshalTableDependencySchema),
        }),
        z.object({
          $case: z.literal('function'),
          function: z.lazy(() => marshalFunctionDependencySchema),
        }),
        z.object({
          $case: z.literal('connection'),
          connection: z.lazy(() => marshalConnectionDependencySchema),
        }),
        z.object({
          $case: z.literal('credential'),
          credential: z.lazy(() => marshalCredentialDependencySchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.value?.$case === 'table' && {table: d.value.table}),
    ...(d.value?.$case === 'function' && {function: d.value.function}),
    ...(d.value?.$case === 'connection' && {connection: d.value.connection}),
    ...(d.value?.$case === 'credential' && {credential: d.value.credential}),
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

export const marshalRegisteredModelAliasInfoSchema: z.ZodType = z
  .object({
    aliasName: z.string().optional(),
    versionNum: z.bigint().optional(),
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

export const marshalSetRegisteredModelAliasRequestSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    aliasArg: z.string().optional(),
    versionNum: z.bigint().optional(),
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

export const marshalUpdateModelVersionRequestSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    versionArg: z.bigint().optional(),
    modelName: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    source: z.string().optional(),
    comment: z.string().optional(),
    runId: z.string().optional(),
    runWorkspaceId: z.bigint().optional(),
    modelVersionDependencies: z
      .lazy(() => marshalDependencyListSchema)
      .optional(),
    status: z.string().optional(),
    version: z.bigint().optional(),
    storageLocation: z.string().optional(),
    metastoreId: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    id: z.string().optional(),
    aliases: z
      .array(z.lazy(() => marshalRegisteredModelAliasInfoSchema))
      .optional(),
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

export const marshalUpdateRegisteredModelRequestSchema: z.ZodType = z
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
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    aliases: z
      .array(z.lazy(() => marshalRegisteredModelAliasInfoSchema))
      .optional(),
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
