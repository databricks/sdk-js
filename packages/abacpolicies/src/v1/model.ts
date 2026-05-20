// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export enum PolicyType {
  /** For detecting field not being set to a supported value */
  POLICY_TYPE_UNSPECIFIED = 'POLICY_TYPE_UNSPECIFIED',
  POLICY_TYPE_ROW_FILTER = 'POLICY_TYPE_ROW_FILTER',
  POLICY_TYPE_COLUMN_MASK = 'POLICY_TYPE_COLUMN_MASK',
}

/** The type of Unity Catalog securable. */
export enum SecurableType {
  CATALOG = 'CATALOG',
  SCHEMA = 'SCHEMA',
  TABLE = 'TABLE',
  STORAGE_CREDENTIAL = 'STORAGE_CREDENTIAL',
  EXTERNAL_LOCATION = 'EXTERNAL_LOCATION',
  FUNCTION = 'FUNCTION',
  SHARE = 'SHARE',
  PROVIDER = 'PROVIDER',
  RECIPIENT = 'RECIPIENT',
  CLEAN_ROOM = 'CLEAN_ROOM',
  METASTORE = 'METASTORE',
  PIPELINE = 'PIPELINE',
  VOLUME = 'VOLUME',
  CONNECTION = 'CONNECTION',
  CREDENTIAL = 'CREDENTIAL',
  EXTERNAL_METADATA = 'EXTERNAL_METADATA',
  /** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */
  STAGING_TABLE = 'STAGING_TABLE',
}

export interface ColumnMaskOptions {
  /**
   * The fully qualified name of the column mask function.
   * The function is called on each row of the target table.
   * The function's first argument and its return type should match the type of the masked column.
   * Required on create and update.
   */
  functionName?: string | undefined;
  /**
   * The alias of the column to be masked. The alias must refer to one of matched columns.
   * The values of the column is passed to the column mask function as the first argument.
   * Required on create and update.
   */
  onColumn?: string | undefined;
  /**
   * Optional list of column aliases or constant literals to be passed as additional arguments to the column mask function.
   * The type of each column should match the positional argument of the column mask function.
   */
  using?: FunctionArgument[] | undefined;
}

export interface CreatePolicyRequest {
  /** Required. The policy to create. */
  policyInfo?: PolicyInfo | undefined;
}

export interface DeletePolicyRequest {
  /** Required. The type of the securable to delete the policy from. */
  onSecurableType?: string | undefined;
  /** Required. The fully qualified name of the securable to delete the policy from. */
  onSecurableFullname?: string | undefined;
  /** Required. The name of the policy to delete */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeletePolicyRequest_Response {}

export interface FunctionArgument {
  /** A positional argument pass to a row filter or column mask function. */
  arg?:
    | {
        $case: 'alias';
        /** The alias of a matched column. */
        alias: string;
      }
    | {
        $case: 'constant';
        /** A constant literal. */
        constant: string;
      }
    | undefined;
}

export interface GetPolicyRequest {
  /** Required. The type of the securable to retrieve the policy for. */
  onSecurableType?: string | undefined;
  /** Required. The fully qualified name of securable to retrieve policy for. */
  onSecurableFullname?: string | undefined;
  /** Required. The name of the policy to retrieve. */
  name?: string | undefined;
}

export interface ListPoliciesRequest {
  /** Required. The type of the securable to list policies for. */
  onSecurableType?: string | undefined;
  /** Required. The fully qualified name of securable to list policies for. */
  onSecurableFullname?: string | undefined;
  /**
   * Optional. Whether to include policies defined on parent securables.
   * By default, the inherited policies are not included.
   */
  includeInherited?: boolean | undefined;
  /**
   * Optional.  Maximum number of policies to return on a single page (page length).
   * - When not set or set to 0, the page length is set to a server configured value (recommended);
   * - When set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   */
  maxResults?: number | undefined;
  /** Optional. Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListPoliciesRequest_Response {
  /** The list of retrieved policies. */
  policies?: PolicyInfo[] | undefined;
  /**
   * Optional opaque token for continuing pagination. `page_token` should be set to this value for
   * the next request to retrieve the next page of results.
   */
  nextPageToken?: string | undefined;
}

export interface MatchColumn {
  /** The condition expression used to match a table column. */
  condition?: string | undefined;
  /** Optional alias of the matched column. */
  alias?: string | undefined;
}

export interface PolicyInfo {
  /** Unique identifier of the policy. This field is output only and is generated by the system. */
  id?: string | undefined;
  /**
   * Type of the securable on which the policy is defined.
   * Only `CATALOG`, `SCHEMA` and `TABLE` are supported at this moment.
   * Required on create.
   */
  onSecurableType?: SecurableType | undefined;
  /**
   * Full name of the securable on which the policy is defined.
   * Required on create.
   */
  onSecurableFullname?: string | undefined;
  /**
   * Name of the policy. Required on create and optional on update.
   * To rename the policy, set `name` to a different value on update.
   */
  name?: string | undefined;
  /** Optional description of the policy. */
  comment?: string | undefined;
  /**
   * List of user or group names that the policy applies to.
   * Required on create and optional on update.
   */
  toPrincipals?: string[] | undefined;
  /** Optional list of user or group names that should be excluded from the policy. */
  exceptPrincipals?: string[] | undefined;
  /**
   * Type of securables that the policy should take effect on.
   * Only `TABLE` is supported at this moment.
   * Required on create and optional on update.
   */
  forSecurableType?: SecurableType | undefined;
  /** Optional condition when the policy should take effect. */
  whenCondition?: string | undefined;
  /** Type of the policy. Required on create. */
  policyType?: PolicyType | undefined;
  /**
   * (--[Create:REQ Update:OPT] Type-specific options for the Policy--)
   * Type-specific options for the policy.
   */
  options?:
    | {
        $case: 'rowFilter';
        /**
         * Options for row filter policies. Valid only if `policy_type` is `POLICY_TYPE_ROW_FILTER`.
         * Required on create and optional on update. When specified on update,
         * the new options will replace the existing options as a whole.
         */
        rowFilter: RowFilterOptions;
      }
    | {
        $case: 'columnMask';
        /**
         * Options for column mask policies. Valid only if `policy_type` is `POLICY_TYPE_COLUMN_MASK`.
         * Required on create and optional on update. When specified on update,
         * the new options will replace the existing options as a whole.
         */
        columnMask: ColumnMaskOptions;
      }
    | undefined;
  /**
   * Optional list of condition expressions used to match table columns.
   * Only valid when `for_securable_type` is `TABLE`.
   * When specified, the policy only applies to tables whose columns satisfy all match conditions.
   */
  matchColumns?: MatchColumn[] | undefined;
  /** Time at which the policy was created, in epoch milliseconds. Output only. */
  createdAt?: number | undefined;
  /** Username of the user who created the policy. Output only. */
  createdBy?: string | undefined;
  /** Time at which the policy was last modified, in epoch milliseconds. Output only. */
  updatedAt?: number | undefined;
  /** Username of the user who last modified the policy. Output only. */
  updatedBy?: string | undefined;
}

export interface RowFilterOptions {
  /**
   * The fully qualified name of the row filter function.
   * The function is called on each row of the target table. It should return a boolean value
   * indicating whether the row should be visible to the user.
   * Required on create and update.
   */
  functionName?: string | undefined;
  /**
   * Optional list of column aliases or constant literals to be passed as arguments to the row filter function.
   * The type of each column should match the positional argument of the row filter function.
   */
  using?: FunctionArgument[] | undefined;
}

export interface UpdatePolicyRequest {
  /** Required. The type of the securable to update the policy for. */
  onSecurableType?: string | undefined;
  /** Required. The fully qualified name of the securable to update the policy for. */
  onSecurableFullname?: string | undefined;
  /** Required. The name of the policy to update. */
  name?: string | undefined;
  /**
   * Optional fields to update. This is the request body for updating a policy.
   * Use `update_mask` field to specify which fields in the request is to be updated.
   * - If `update_mask` is empty or "*", all specified fields will be updated.
   * - If `update_mask` is specified, only the fields specified in the `update_mask` will be updated.
   * If a field is specified in `update_mask` and not set in the request, the field will be cleared.
   * Users can use the update mask to explicitly unset optional fields such as
   * `exception_principals` and `when_condition`.
   */
  policyInfo?: PolicyInfo | undefined;
  /**
   * Optional. The update mask field for specifying user intentions on which
   * fields to update in the request.
   */
  updateMask?: FieldMask<PolicyInfo> | undefined;
}

export const unmarshalColumnMaskOptionsSchema: z.ZodType<ColumnMaskOptions> = z
  .object({
    function_name: z.string().optional(),
    on_column: z.string().optional(),
    using: z.array(z.lazy(() => unmarshalFunctionArgumentSchema)).optional(),
  })
  .transform(d => ({
    functionName: d.function_name,
    onColumn: d.on_column,
    using: d.using,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeletePolicyRequest_ResponseSchema: z.ZodType<DeletePolicyRequest_Response> =
  z.object({});

export const unmarshalFunctionArgumentSchema: z.ZodType<FunctionArgument> = z
  .object({
    alias: z.string().optional(),
    constant: z.string().optional(),
  })
  .transform(d => ({
    arg:
      d.alias !== undefined
        ? {$case: 'alias' as const, alias: d.alias}
        : d.constant !== undefined
          ? {$case: 'constant' as const, constant: d.constant}
          : undefined,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListPoliciesRequest_ResponseSchema: z.ZodType<ListPoliciesRequest_Response> =
  z
    .object({
      policies: z.array(z.lazy(() => unmarshalPolicyInfoSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      policies: d.policies,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMatchColumnSchema: z.ZodType<MatchColumn> = z
  .object({
    condition: z.string().optional(),
    alias: z.string().optional(),
  })
  .transform(d => ({
    condition: d.condition,
    alias: d.alias,
  }));

export const unmarshalPolicyInfoSchema: z.ZodType<PolicyInfo> = z
  .object({
    id: z.string().optional(),
    on_securable_type: z.enum(SecurableType).optional(),
    on_securable_fullname: z.string().optional(),
    name: z.string().optional(),
    comment: z.string().optional(),
    to_principals: z.array(z.string()).optional(),
    except_principals: z.array(z.string()).optional(),
    for_securable_type: z.enum(SecurableType).optional(),
    when_condition: z.string().optional(),
    policy_type: z.enum(PolicyType).optional(),
    row_filter: z.lazy(() => unmarshalRowFilterOptionsSchema).optional(),
    column_mask: z.lazy(() => unmarshalColumnMaskOptionsSchema).optional(),
    match_columns: z.array(z.lazy(() => unmarshalMatchColumnSchema)).optional(),
    created_at: z.number().optional(),
    created_by: z.string().optional(),
    updated_at: z.number().optional(),
    updated_by: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    onSecurableType: d.on_securable_type,
    onSecurableFullname: d.on_securable_fullname,
    name: d.name,
    comment: d.comment,
    toPrincipals: d.to_principals,
    exceptPrincipals: d.except_principals,
    forSecurableType: d.for_securable_type,
    whenCondition: d.when_condition,
    policyType: d.policy_type,
    options:
      d.row_filter !== undefined
        ? {$case: 'rowFilter' as const, rowFilter: d.row_filter}
        : d.column_mask !== undefined
          ? {$case: 'columnMask' as const, columnMask: d.column_mask}
          : undefined,
    matchColumns: d.match_columns,
    createdAt: d.created_at,
    createdBy: d.created_by,
    updatedAt: d.updated_at,
    updatedBy: d.updated_by,
  }));

export const unmarshalRowFilterOptionsSchema: z.ZodType<RowFilterOptions> = z
  .object({
    function_name: z.string().optional(),
    using: z.array(z.lazy(() => unmarshalFunctionArgumentSchema)).optional(),
  })
  .transform(d => ({
    functionName: d.function_name,
    using: d.using,
  }));

export const marshalColumnMaskOptionsSchema: z.ZodType = z
  .object({
    functionName: z.string().optional(),
    onColumn: z.string().optional(),
    using: z.array(z.lazy(() => marshalFunctionArgumentSchema)).optional(),
  })
  .transform(d => ({
    function_name: d.functionName,
    on_column: d.onColumn,
    using: d.using,
  }));

export const marshalFunctionArgumentSchema: z.ZodType = z
  .object({
    arg: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('alias'), alias: z.string()}),
        z.object({$case: z.literal('constant'), constant: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.arg?.$case === 'alias' && {alias: d.arg.alias}),
    ...(d.arg?.$case === 'constant' && {constant: d.arg.constant}),
  }));

export const marshalMatchColumnSchema: z.ZodType = z
  .object({
    condition: z.string().optional(),
    alias: z.string().optional(),
  })
  .transform(d => ({
    condition: d.condition,
    alias: d.alias,
  }));

export const marshalPolicyInfoSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    onSecurableType: z.enum(SecurableType).optional(),
    onSecurableFullname: z.string().optional(),
    name: z.string().optional(),
    comment: z.string().optional(),
    toPrincipals: z.array(z.string()).optional(),
    exceptPrincipals: z.array(z.string()).optional(),
    forSecurableType: z.enum(SecurableType).optional(),
    whenCondition: z.string().optional(),
    policyType: z.enum(PolicyType).optional(),
    options: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('rowFilter'),
          rowFilter: z.lazy(() => marshalRowFilterOptionsSchema),
        }),
        z.object({
          $case: z.literal('columnMask'),
          columnMask: z.lazy(() => marshalColumnMaskOptionsSchema),
        }),
      ])
      .optional(),
    matchColumns: z.array(z.lazy(() => marshalMatchColumnSchema)).optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    on_securable_type: d.onSecurableType,
    on_securable_fullname: d.onSecurableFullname,
    name: d.name,
    comment: d.comment,
    to_principals: d.toPrincipals,
    except_principals: d.exceptPrincipals,
    for_securable_type: d.forSecurableType,
    when_condition: d.whenCondition,
    policy_type: d.policyType,
    ...(d.options?.$case === 'rowFilter' && {row_filter: d.options.rowFilter}),
    ...(d.options?.$case === 'columnMask' && {
      column_mask: d.options.columnMask,
    }),
    match_columns: d.matchColumns,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
  }));

export const marshalRowFilterOptionsSchema: z.ZodType = z
  .object({
    functionName: z.string().optional(),
    using: z.array(z.lazy(() => marshalFunctionArgumentSchema)).optional(),
  })
  .transform(d => ({
    function_name: d.functionName,
    using: d.using,
  }));

const columnMaskOptionsFieldMaskSchema: FieldMaskSchema = {
  functionName: {wire: 'function_name'},
  onColumn: {wire: 'on_column'},
  using: {wire: 'using'},
};

const policyInfoFieldMaskSchema: FieldMaskSchema = {
  columnMask: {
    wire: 'column_mask',
    children: () => columnMaskOptionsFieldMaskSchema,
  },
  comment: {wire: 'comment'},
  createdAt: {wire: 'created_at'},
  createdBy: {wire: 'created_by'},
  exceptPrincipals: {wire: 'except_principals'},
  forSecurableType: {wire: 'for_securable_type'},
  id: {wire: 'id'},
  matchColumns: {wire: 'match_columns'},
  name: {wire: 'name'},
  onSecurableFullname: {wire: 'on_securable_fullname'},
  onSecurableType: {wire: 'on_securable_type'},
  policyType: {wire: 'policy_type'},
  rowFilter: {
    wire: 'row_filter',
    children: () => rowFilterOptionsFieldMaskSchema,
  },
  toPrincipals: {wire: 'to_principals'},
  updatedAt: {wire: 'updated_at'},
  updatedBy: {wire: 'updated_by'},
  whenCondition: {wire: 'when_condition'},
};

export function policyInfoFieldMask(...paths: string[]): FieldMask<PolicyInfo> {
  return FieldMask.build<PolicyInfo>(paths, policyInfoFieldMaskSchema);
}

const rowFilterOptionsFieldMaskSchema: FieldMaskSchema = {
  functionName: {wire: 'function_name'},
  using: {wire: 'using'},
};
