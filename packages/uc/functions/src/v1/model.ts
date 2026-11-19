// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ColumnTypeName = {
  BOOLEAN: 'BOOLEAN',
  BYTE: 'BYTE',
  SHORT: 'SHORT',
  INT: 'INT',
  LONG: 'LONG',
  FLOAT: 'FLOAT',
  DOUBLE: 'DOUBLE',
  DATE: 'DATE',
  TIMESTAMP: 'TIMESTAMP',
  STRING: 'STRING',
  BINARY: 'BINARY',
  DECIMAL: 'DECIMAL',
  INTERVAL: 'INTERVAL',
  ARRAY: 'ARRAY',
  STRUCT: 'STRUCT',
  MAP: 'MAP',
  CHAR: 'CHAR',
  NULL: 'NULL',
  USER_DEFINED_TYPE: 'USER_DEFINED_TYPE',
  TIMESTAMP_NTZ: 'TIMESTAMP_NTZ',
  VARIANT: 'VARIANT',
  GEOMETRY: 'GEOMETRY',
  GEOGRAPHY: 'GEOGRAPHY',
  TABLE_TYPE: 'TABLE_TYPE',
} as const;
export type ColumnTypeName =
  | (typeof ColumnTypeName)[keyof typeof ColumnTypeName]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FunctionParameterMode = {
  IN: 'IN',
} as const;
export type FunctionParameterMode =
  | (typeof FunctionParameterMode)[keyof typeof FunctionParameterMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FunctionParameterType = {
  PARAM: 'PARAM',
  COLUMN: 'COLUMN',
} as const;
export type FunctionParameterType =
  | (typeof FunctionParameterType)[keyof typeof FunctionParameterType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FunctionInfo_ParameterStyle = {
  S: 'S',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type FunctionInfo_ParameterStyle =
  | (typeof FunctionInfo_ParameterStyle)[keyof typeof FunctionInfo_ParameterStyle]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FunctionInfo_RoutineBody = {
  SQL: 'SQL',
  /**
   * When `EXTERNAL` is used,
   * * The language of the routine function should be specified in the `external_language` field.
   * * The TABLE return type, and so return_params, is supported only when external_language is Python.
   * * The `sql_data_access` field must be `NO_SQL`.
   */
  EXTERNAL: 'EXTERNAL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type FunctionInfo_RoutineBody =
  | (typeof FunctionInfo_RoutineBody)[keyof typeof FunctionInfo_RoutineBody]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FunctionInfo_SecurityType = {
  DEFINER: 'DEFINER',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type FunctionInfo_SecurityType =
  | (typeof FunctionInfo_SecurityType)[keyof typeof FunctionInfo_SecurityType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const FunctionInfo_SqlDataAccess = {
  CONTAINS_SQL: 'CONTAINS_SQL',
  READS_SQL_DATA: 'READS_SQL_DATA',
  NO_SQL: 'NO_SQL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type FunctionInfo_SqlDataAccess =
  | (typeof FunctionInfo_SqlDataAccess)[keyof typeof FunctionInfo_SqlDataAccess]
  | (string & {});

/** A connection that is dependent on a SQL object. */
export interface ConnectionDependency {
  /** Full name of the dependent connection, in the form of __connection_name__. */
  connectionName?: string | undefined;
}

/**
 * A user-defined function (UDF) registered in Unity Catalog. A function belongs to a schema and is referenced as
 * catalog_name.schema_name.function_name. Its body is either a SQL expression or query, or source code in an
 * external language such as Python. See https://docs.databricks.com/aws/en/udf/unity-catalog for an overview.
 */
export interface CreateFunction {
  /** Name of function, relative to parent schema. */
  name?: string | undefined;
  /** Name of parent Catalog. */
  catalogName?: string | undefined;
  /** Name of parent Schema relative to its parent Catalog. */
  schemaName?: string | undefined;
  /**
   * Input parameters of the function. When it is set, parameters must contain at least
   * one entry. A function that takes no arguments omits input_params, even though the Create request schema marks it
   * as required.
   */
  inputParams?: FunctionParameterInfos | undefined;
  /**
   * Data type of the value the function returns. A table function uses TABLE_TYPE
   * and describes its result columns in return_params, except for a polymorphic Python UDTF, which omits them.
   */
  dataType?: ColumnTypeName | undefined;
  /**
   * Return data type of the function in SQL syntax, including any type parameters
   * such as precision and scale.
   */
  fullDataType?: string | undefined;
  /**
   * Language of the function body. SQL means that routine_definition holds a SQL
   * expression or query. EXTERNAL means that it holds source code in the language named by external_language, and
   * sql_data_access must then be NO_SQL.
   */
  routineBody?: FunctionInfo_RoutineBody | undefined;
  /**
   * Body of the function. For a SQL function it is the expression or query that
   * computes the result; for an EXTERNAL function it is the source code of the function. It is omitted when the
   * caller can only browse the function.
   */
  routineDefinition?: string | undefined;
  /**
   * How arguments are passed to the function body. S means that each argument is
   * passed as a single scalar value.
   */
  parameterStyle?: FunctionInfo_ParameterStyle | undefined;
  /**
   * Whether the function returns the same result for the same arguments. It
   * corresponds to the DETERMINISTIC characteristic of CREATE FUNCTION.
   */
  isDeterministic?: boolean | undefined;
  /**
   * How the function body interacts with SQL data. CONTAINS_SQL means that the body
   * contains SQL but reads no table or view, READS_SQL_DATA means that it reads a table or view, and NO_SQL is
   * required for EXTERNAL functions.
   */
  sqlDataAccess?: FunctionInfo_SqlDataAccess | undefined;
  /**
   * Whether the function is a null-call function in the sense of the SQL standard,
   * which returns NULL whenever any argument is NULL.
   */
  isNullCall?: boolean | undefined;
  /**
   * Whose privileges the function body runs with. DEFINER runs it with the privileges
   * of the function owner.
   */
  securityType?: FunctionInfo_SecurityType | undefined;
  /** Specific name of the function. Set it to the same value as name. */
  specificName?: string | undefined;
  /**
   * Result columns of a table function. Set it when data_type is TABLE_TYPE, except
   * for a polymorphic Python UDTF (an EXTERNAL Python function with full_data_type "()"), which must not set it.
   */
  returnParams?: FunctionParameterInfos | undefined;
  /** Name of the function in its external language. It is reserved for future use. */
  externalName?: string | undefined;
  /**
   * Language of the function body for an EXTERNAL function. It is required when
   * routine_body is EXTERNAL.
   */
  externalLanguage?: string | undefined;
  /** List of schemas whose objects can be referenced without qualification. */
  sqlPath?: string | undefined;
  /** Username of current owner of the function. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** JSON-serialized key-value pair map, encoded (escaped) as a string. */
  properties?: string | undefined;
  /**
   * Function dependencies. For external UDFs, dependencies may
   * contain only credential, secret, or volume objects.
   */
  routineDependencies?: DependencyList | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of Function, in form of **catalog_name**.**schema_name**.**function_name** */
  fullName?: string | undefined;
  /** Time at which this function was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of function creator. */
  createdBy?: string | undefined;
  /** Time at which this function was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified the function. */
  updatedBy?: string | undefined;
  /** Id of Function, relative to parent schema. */
  functionId?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

export interface CreateFunctionRequest {
  /** Partial __FunctionInfo__ specifying the function to be created. */
  functionInfo?: CreateFunction | undefined;
}

/** A credential that is dependent on a SQL object. */
export interface CredentialDependency {
  /** Full name of the dependent credential, in the form of __credential_name__. */
  credentialName?: string | undefined;
}

export interface DeleteFunctionRequest {
  /** The fully-qualified name of the function (of the form __catalog_name__.__schema_name__.__function_name__). */
  fullNameArg?: string | undefined;
  /** Force deletion even if the function is not empty. */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteFunctionResponse {}

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

/**
 * A user-defined function (UDF) registered in Unity Catalog. A function belongs to a schema and is referenced as
 * catalog_name.schema_name.function_name. Its body is either a SQL expression or query, or source code in an
 * external language such as Python. See https://docs.databricks.com/aws/en/udf/unity-catalog for an overview.
 */
export interface FunctionInfo {
  /** Name of function, relative to parent schema. */
  name?: string | undefined;
  /** Name of parent Catalog. */
  catalogName?: string | undefined;
  /** Name of parent Schema relative to its parent Catalog. */
  schemaName?: string | undefined;
  /**
   * Input parameters of the function. When it is set, parameters must contain at least
   * one entry. A function that takes no arguments omits input_params, even though the Create request schema marks it
   * as required.
   */
  inputParams?: FunctionParameterInfos | undefined;
  /**
   * Data type of the value the function returns. A table function uses TABLE_TYPE
   * and describes its result columns in return_params, except for a polymorphic Python UDTF, which omits them.
   */
  dataType?: ColumnTypeName | undefined;
  /**
   * Return data type of the function in SQL syntax, including any type parameters
   * such as precision and scale.
   */
  fullDataType?: string | undefined;
  /**
   * Language of the function body. SQL means that routine_definition holds a SQL
   * expression or query. EXTERNAL means that it holds source code in the language named by external_language, and
   * sql_data_access must then be NO_SQL.
   */
  routineBody?: FunctionInfo_RoutineBody | undefined;
  /**
   * Body of the function. For a SQL function it is the expression or query that
   * computes the result; for an EXTERNAL function it is the source code of the function. It is omitted when the
   * caller can only browse the function.
   */
  routineDefinition?: string | undefined;
  /**
   * How arguments are passed to the function body. S means that each argument is
   * passed as a single scalar value.
   */
  parameterStyle?: FunctionInfo_ParameterStyle | undefined;
  /**
   * Whether the function returns the same result for the same arguments. It
   * corresponds to the DETERMINISTIC characteristic of CREATE FUNCTION.
   */
  isDeterministic?: boolean | undefined;
  /**
   * How the function body interacts with SQL data. CONTAINS_SQL means that the body
   * contains SQL but reads no table or view, READS_SQL_DATA means that it reads a table or view, and NO_SQL is
   * required for EXTERNAL functions.
   */
  sqlDataAccess?: FunctionInfo_SqlDataAccess | undefined;
  /**
   * Whether the function is a null-call function in the sense of the SQL standard,
   * which returns NULL whenever any argument is NULL.
   */
  isNullCall?: boolean | undefined;
  /**
   * Whose privileges the function body runs with. DEFINER runs it with the privileges
   * of the function owner.
   */
  securityType?: FunctionInfo_SecurityType | undefined;
  /** Specific name of the function. Set it to the same value as name. */
  specificName?: string | undefined;
  /**
   * Result columns of a table function. Set it when data_type is TABLE_TYPE, except
   * for a polymorphic Python UDTF (an EXTERNAL Python function with full_data_type "()"), which must not set it.
   */
  returnParams?: FunctionParameterInfos | undefined;
  /** Name of the function in its external language. It is reserved for future use. */
  externalName?: string | undefined;
  /**
   * Language of the function body for an EXTERNAL function. It is required when
   * routine_body is EXTERNAL.
   */
  externalLanguage?: string | undefined;
  /** List of schemas whose objects can be referenced without qualification. */
  sqlPath?: string | undefined;
  /** Username of current owner of the function. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** JSON-serialized key-value pair map, encoded (escaped) as a string. */
  properties?: string | undefined;
  /**
   * Function dependencies. For external UDFs, dependencies may
   * contain only credential, secret, or volume objects.
   */
  routineDependencies?: DependencyList | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of Function, in form of **catalog_name**.**schema_name**.**function_name** */
  fullName?: string | undefined;
  /** Time at which this function was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of function creator. */
  createdBy?: string | undefined;
  /** Time at which this function was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified the function. */
  updatedBy?: string | undefined;
  /** Id of Function, relative to parent schema. */
  functionId?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
}

export interface FunctionParameterInfo {
  /** Name of Parameter. */
  name?: string | undefined;
  /**
   * Data type of the parameter in SQL syntax, including any type parameters such
   * as precision and scale.
   */
  typeText?: string | undefined;
  /**
   * Data type of the parameter as the JSON representation of a Spark SQL struct
   * field, with name, type, nullable and metadata keys.
   */
  typeJson?: string | undefined;
  /** Name of type (INT, STRUCT, MAP, etc.) */
  typeName?: ColumnTypeName | undefined;
  /** Digits of precision; required on Create for DecimalTypes. */
  typePrecision?: number | undefined;
  /** Digits to right of decimal; Required on Create for DecimalTypes. */
  typeScale?: number | undefined;
  /**
   * Unit range of the data type for INTERVAL parameters. It is unset for other
   * types.
   */
  typeIntervalType?: string | undefined;
  /**
   * Zero-based position of the parameter in the parameter list. Positions must be
   * unique and consecutive.
   */
  position?: number | undefined;
  /**
   * Direction of the parameter. Only IN parameters, which pass a value into the
   * function, are supported.
   */
  parameterMode?: FunctionParameterMode | undefined;
  /**
   * Whether the entry is an input parameter (PARAM) or a result column of a table
   * function (COLUMN).
   */
  parameterType?: FunctionParameterType | undefined;
  /**
   * Default value of the parameter as a SQL expression, used when a call omits the
   * argument.
   */
  parameterDefault?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
}

export interface FunctionParameterInfos {
  /** The parameters that make up the list, ordered by position. */
  parameters?: FunctionParameterInfo[] | undefined;
}

export interface GetFunctionRequest {
  /** The fully-qualified name of the function (of the form __catalog_name__.__schema_name__.__function_name__). */
  fullNameArg?: string | undefined;
  /** Whether to include functions in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface ListFunctionsRequest {
  /** Name of parent catalog for functions of interest. */
  catalogName?: string | undefined;
  /** Parent schema of functions. */
  schemaName?: string | undefined;
  /** Whether to include functions in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
  /**
   * Maximum number of functions to return.
   * If not set, all the functions are returned (not recommended).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListFunctionsResponse {
  /** An array of function information objects. */
  functions?: FunctionInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

/** A table that is dependent on a SQL object. */
export interface TableDependency {
  /** Full name of the dependent table, in the form of __catalog_name__.__schema_name__.__table_name__. */
  tableFullName?: string | undefined;
}

export interface UpdateFunctionRequest {
  /** The fully-qualified name of the function (of the form __catalog_name__.__schema_name__.__function_name__). */
  fullNameArg?: string | undefined;
  /** Name of function, relative to parent schema. */
  name?: string | undefined;
  /** Name of parent Catalog. */
  catalogName?: string | undefined;
  /** Name of parent Schema relative to its parent Catalog. */
  schemaName?: string | undefined;
  /**
   * Input parameters of the function. When it is set, parameters must contain at least
   * one entry. A function that takes no arguments omits input_params, even though the Create request schema marks it
   * as required.
   */
  inputParams?: FunctionParameterInfos | undefined;
  /**
   * Data type of the value the function returns. A table function uses TABLE_TYPE
   * and describes its result columns in return_params, except for a polymorphic Python UDTF, which omits them.
   */
  dataType?: ColumnTypeName | undefined;
  /**
   * Return data type of the function in SQL syntax, including any type parameters
   * such as precision and scale.
   */
  fullDataType?: string | undefined;
  /**
   * Language of the function body. SQL means that routine_definition holds a SQL
   * expression or query. EXTERNAL means that it holds source code in the language named by external_language, and
   * sql_data_access must then be NO_SQL.
   */
  routineBody?: FunctionInfo_RoutineBody | undefined;
  /**
   * Body of the function. For a SQL function it is the expression or query that
   * computes the result; for an EXTERNAL function it is the source code of the function. It is omitted when the
   * caller can only browse the function.
   */
  routineDefinition?: string | undefined;
  /**
   * How arguments are passed to the function body. S means that each argument is
   * passed as a single scalar value.
   */
  parameterStyle?: FunctionInfo_ParameterStyle | undefined;
  /**
   * Whether the function returns the same result for the same arguments. It
   * corresponds to the DETERMINISTIC characteristic of CREATE FUNCTION.
   */
  isDeterministic?: boolean | undefined;
  /**
   * How the function body interacts with SQL data. CONTAINS_SQL means that the body
   * contains SQL but reads no table or view, READS_SQL_DATA means that it reads a table or view, and NO_SQL is
   * required for EXTERNAL functions.
   */
  sqlDataAccess?: FunctionInfo_SqlDataAccess | undefined;
  /**
   * Whether the function is a null-call function in the sense of the SQL standard,
   * which returns NULL whenever any argument is NULL.
   */
  isNullCall?: boolean | undefined;
  /**
   * Whose privileges the function body runs with. DEFINER runs it with the privileges
   * of the function owner.
   */
  securityType?: FunctionInfo_SecurityType | undefined;
  /** Specific name of the function. Set it to the same value as name. */
  specificName?: string | undefined;
  /**
   * Result columns of a table function. Set it when data_type is TABLE_TYPE, except
   * for a polymorphic Python UDTF (an EXTERNAL Python function with full_data_type "()"), which must not set it.
   */
  returnParams?: FunctionParameterInfos | undefined;
  /** Name of the function in its external language. It is reserved for future use. */
  externalName?: string | undefined;
  /**
   * Language of the function body for an EXTERNAL function. It is required when
   * routine_body is EXTERNAL.
   */
  externalLanguage?: string | undefined;
  /** List of schemas whose objects can be referenced without qualification. */
  sqlPath?: string | undefined;
  /** Username of current owner of the function. */
  owner?: string | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /** JSON-serialized key-value pair map, encoded (escaped) as a string. */
  properties?: string | undefined;
  /**
   * Function dependencies. For external UDFs, dependencies may
   * contain only credential, secret, or volume objects.
   */
  routineDependencies?: DependencyList | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Full name of Function, in form of **catalog_name**.**schema_name**.**function_name** */
  fullName?: string | undefined;
  /** Time at which this function was created, in epoch milliseconds. */
  createdAt?: bigint | undefined;
  /** Username of function creator. */
  createdBy?: string | undefined;
  /** Time at which this function was last modified, in epoch milliseconds. */
  updatedAt?: bigint | undefined;
  /** Username of user who last modified the function. */
  updatedBy?: string | undefined;
  /** Id of Function, relative to parent schema. */
  functionId?: string | undefined;
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

export const unmarshalDeleteFunctionResponseSchema: z.ZodType<DeleteFunctionResponse> =
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

export const unmarshalFunctionInfoSchema: z.ZodType<FunctionInfo> = z
  .object({
    name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    input_params: z
      .lazy(() => unmarshalFunctionParameterInfosSchema)
      .nullish()
      .transform(v => v ?? undefined),
    data_type: z.string().optional(),
    full_data_type: z.string().optional(),
    routine_body: z.string().optional(),
    routine_definition: z.string().optional(),
    parameter_style: z.string().optional(),
    is_deterministic: z.boolean().optional(),
    sql_data_access: z.string().optional(),
    is_null_call: z.boolean().optional(),
    security_type: z.string().optional(),
    specific_name: z.string().optional(),
    return_params: z
      .lazy(() => unmarshalFunctionParameterInfosSchema)
      .nullish()
      .transform(v => v ?? undefined),
    external_name: z.string().optional(),
    external_language: z.string().optional(),
    sql_path: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    properties: z.string().optional(),
    routine_dependencies: z
      .lazy(() => unmarshalDependencyListSchema)
      .nullish()
      .transform(v => v ?? undefined),
    metastore_id: z.string().optional(),
    full_name: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    created_by: z.string().optional(),
    updated_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    updated_by: z.string().optional(),
    function_id: z.string().optional(),
    browse_only: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    inputParams: d.input_params,
    dataType: d.data_type,
    fullDataType: d.full_data_type,
    routineBody: d.routine_body,
    routineDefinition: d.routine_definition,
    parameterStyle: d.parameter_style,
    isDeterministic: d.is_deterministic,
    sqlDataAccess: d.sql_data_access,
    isNullCall: d.is_null_call,
    securityType: d.security_type,
    specificName: d.specific_name,
    returnParams: d.return_params,
    externalName: d.external_name,
    externalLanguage: d.external_language,
    sqlPath: d.sql_path,
    owner: d.owner,
    comment: d.comment,
    properties: d.properties,
    routineDependencies: d.routine_dependencies,
    metastoreId: d.metastore_id,
    fullName: d.full_name,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
    functionId: d.function_id,
    browseOnly: d.browse_only,
  }));

export const unmarshalFunctionParameterInfoSchema: z.ZodType<FunctionParameterInfo> =
  z
    .object({
      name: z.string().optional(),
      type_text: z.string().optional(),
      type_json: z.string().optional(),
      type_name: z.string().optional(),
      type_precision: z.number().optional(),
      type_scale: z.number().optional(),
      type_interval_type: z.string().optional(),
      position: z.number().optional(),
      parameter_mode: z.string().optional(),
      parameter_type: z.string().optional(),
      parameter_default: z.string().optional(),
      comment: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      typeText: d.type_text,
      typeJson: d.type_json,
      typeName: d.type_name,
      typePrecision: d.type_precision,
      typeScale: d.type_scale,
      typeIntervalType: d.type_interval_type,
      position: d.position,
      parameterMode: d.parameter_mode,
      parameterType: d.parameter_type,
      parameterDefault: d.parameter_default,
      comment: d.comment,
    }));

export const unmarshalFunctionParameterInfosSchema: z.ZodType<FunctionParameterInfos> =
  z
    .object({
      parameters: z
        .array(z.lazy(() => unmarshalFunctionParameterInfoSchema))
        .optional(),
    })
    .transform(d => ({
      parameters: d.parameters,
    }));

export const unmarshalListFunctionsResponseSchema: z.ZodType<ListFunctionsResponse> =
  z
    .object({
      functions: z.array(z.lazy(() => unmarshalFunctionInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      functions: d.functions,
      nextPageToken: d.next_page_token,
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

export const marshalCreateFunctionSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    inputParams: z.lazy(() => marshalFunctionParameterInfosSchema).optional(),
    dataType: z.string().optional(),
    fullDataType: z.string().optional(),
    routineBody: z.string().optional(),
    routineDefinition: z.string().optional(),
    parameterStyle: z.string().optional(),
    isDeterministic: z.boolean().optional(),
    sqlDataAccess: z.string().optional(),
    isNullCall: z.boolean().optional(),
    securityType: z.string().optional(),
    specificName: z.string().optional(),
    returnParams: z.lazy(() => marshalFunctionParameterInfosSchema).optional(),
    externalName: z.string().optional(),
    externalLanguage: z.string().optional(),
    sqlPath: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    properties: z.string().optional(),
    routineDependencies: z.lazy(() => marshalDependencyListSchema).optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    functionId: z.string().optional(),
    browseOnly: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    input_params: d.inputParams,
    data_type: d.dataType,
    full_data_type: d.fullDataType,
    routine_body: d.routineBody,
    routine_definition: d.routineDefinition,
    parameter_style: d.parameterStyle,
    is_deterministic: d.isDeterministic,
    sql_data_access: d.sqlDataAccess,
    is_null_call: d.isNullCall,
    security_type: d.securityType,
    specific_name: d.specificName,
    return_params: d.returnParams,
    external_name: d.externalName,
    external_language: d.externalLanguage,
    sql_path: d.sqlPath,
    owner: d.owner,
    comment: d.comment,
    properties: d.properties,
    routine_dependencies: d.routineDependencies,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    function_id: d.functionId,
    browse_only: d.browseOnly,
  }));

export const marshalCreateFunctionRequestSchema: z.ZodType = z
  .object({
    functionInfo: z.lazy(() => marshalCreateFunctionSchema).optional(),
  })
  .transform(d => ({
    function_info: d.functionInfo,
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

export const marshalFunctionParameterInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    typeText: z.string().optional(),
    typeJson: z.string().optional(),
    typeName: z.string().optional(),
    typePrecision: z.number().optional(),
    typeScale: z.number().optional(),
    typeIntervalType: z.string().optional(),
    position: z.number().optional(),
    parameterMode: z.string().optional(),
    parameterType: z.string().optional(),
    parameterDefault: z.string().optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    type_text: d.typeText,
    type_json: d.typeJson,
    type_name: d.typeName,
    type_precision: d.typePrecision,
    type_scale: d.typeScale,
    type_interval_type: d.typeIntervalType,
    position: d.position,
    parameter_mode: d.parameterMode,
    parameter_type: d.parameterType,
    parameter_default: d.parameterDefault,
    comment: d.comment,
  }));

export const marshalFunctionParameterInfosSchema: z.ZodType = z
  .object({
    parameters: z
      .array(z.lazy(() => marshalFunctionParameterInfoSchema))
      .optional(),
  })
  .transform(d => ({
    parameters: d.parameters,
  }));

export const marshalTableDependencySchema: z.ZodType = z
  .object({
    tableFullName: z.string().optional(),
  })
  .transform(d => ({
    table_full_name: d.tableFullName,
  }));

export const marshalUpdateFunctionRequestSchema: z.ZodType = z
  .object({
    fullNameArg: z.string().optional(),
    name: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    inputParams: z.lazy(() => marshalFunctionParameterInfosSchema).optional(),
    dataType: z.string().optional(),
    fullDataType: z.string().optional(),
    routineBody: z.string().optional(),
    routineDefinition: z.string().optional(),
    parameterStyle: z.string().optional(),
    isDeterministic: z.boolean().optional(),
    sqlDataAccess: z.string().optional(),
    isNullCall: z.boolean().optional(),
    securityType: z.string().optional(),
    specificName: z.string().optional(),
    returnParams: z.lazy(() => marshalFunctionParameterInfosSchema).optional(),
    externalName: z.string().optional(),
    externalLanguage: z.string().optional(),
    sqlPath: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    properties: z.string().optional(),
    routineDependencies: z.lazy(() => marshalDependencyListSchema).optional(),
    metastoreId: z.string().optional(),
    fullName: z.string().optional(),
    createdAt: z.bigint().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.bigint().optional(),
    updatedBy: z.string().optional(),
    functionId: z.string().optional(),
    browseOnly: z.boolean().optional(),
  })
  .transform(d => ({
    full_name_arg: d.fullNameArg,
    name: d.name,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    input_params: d.inputParams,
    data_type: d.dataType,
    full_data_type: d.fullDataType,
    routine_body: d.routineBody,
    routine_definition: d.routineDefinition,
    parameter_style: d.parameterStyle,
    is_deterministic: d.isDeterministic,
    sql_data_access: d.sqlDataAccess,
    is_null_call: d.isNullCall,
    security_type: d.securityType,
    specific_name: d.specificName,
    return_params: d.returnParams,
    external_name: d.externalName,
    external_language: d.externalLanguage,
    sql_path: d.sqlPath,
    owner: d.owner,
    comment: d.comment,
    properties: d.properties,
    routine_dependencies: d.routineDependencies,
    metastore_id: d.metastoreId,
    full_name: d.fullName,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    function_id: d.functionId,
    browse_only: d.browseOnly,
  }));
