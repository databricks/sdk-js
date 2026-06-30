// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DatePrecision = {
  DAY_PRECISION: 'DAY_PRECISION',
  MINUTE_PRECISION: 'MINUTE_PRECISION',
  SECOND_PRECISION: 'SECOND_PRECISION',
} as const;
export type DatePrecision =
  | (typeof DatePrecision)[keyof typeof DatePrecision]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const LifecycleState = {
  ACTIVE: 'ACTIVE',
  TRASHED: 'TRASHED',
} as const;
export type LifecycleState =
  | (typeof LifecycleState)[keyof typeof LifecycleState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RunAsMode = {
  OWNER: 'OWNER',
  VIEWER: 'VIEWER',
} as const;
export type RunAsMode =
  | (typeof RunAsMode)[keyof typeof RunAsMode]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DateRangeValue_DynamicDateRange = {
  TODAY: 'TODAY',
  YESTERDAY: 'YESTERDAY',
  THIS_WEEK: 'THIS_WEEK',
  THIS_MONTH: 'THIS_MONTH',
  THIS_YEAR: 'THIS_YEAR',
  LAST_WEEK: 'LAST_WEEK',
  LAST_MONTH: 'LAST_MONTH',
  LAST_YEAR: 'LAST_YEAR',
  LAST_HOUR: 'LAST_HOUR',
  LAST_8_HOURS: 'LAST_8_HOURS',
  LAST_24_HOURS: 'LAST_24_HOURS',
  LAST_7_DAYS: 'LAST_7_DAYS',
  LAST_14_DAYS: 'LAST_14_DAYS',
  LAST_30_DAYS: 'LAST_30_DAYS',
  LAST_60_DAYS: 'LAST_60_DAYS',
  LAST_90_DAYS: 'LAST_90_DAYS',
  LAST_12_MONTHS: 'LAST_12_MONTHS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DateRangeValue_DynamicDateRange =
  | (typeof DateRangeValue_DynamicDateRange)[keyof typeof DateRangeValue_DynamicDateRange]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DateValue_DynamicDate = {
  NOW: 'NOW',
  YESTERDAY: 'YESTERDAY',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DateValue_DynamicDate =
  | (typeof DateValue_DynamicDate)[keyof typeof DateValue_DynamicDate]
  | (string & {});

export interface CreateCreateQueryRequestQuery {
  /** UUID identifying the query. */
  id?: string | undefined;
  /** Display name of the query that appears in list views, widget headings, and on the query page. */
  displayName?: string | undefined;
  /** General description that conveys additional information about this query such as usage notes. */
  description?: string | undefined;
  /** Username of the user that owns the query. */
  ownerUserName?: string | undefined;
  /** ID of the SQL warehouse attached to the query. */
  warehouseId?: string | undefined;
  /** Text of the query to be run. */
  queryText?: string | undefined;
  /** Sets the "Run as" role for the object. */
  runAsMode?: RunAsMode | undefined;
  /** Indicates whether the query is trashed. */
  lifecycleState?: LifecycleState | undefined;
  /** Username of the user who last saved changes to this query. */
  lastModifierUserName?: string | undefined;
  /** Workspace path of the workspace folder containing the object. */
  parentPath?: string | undefined;
  tags?: string[] | undefined;
  /** Timestamp when this query was created. */
  createTime?: Temporal.Instant | undefined;
  /** Timestamp when this query was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** List of query parameter definitions. */
  parameters?: CreateQueryParameter[] | undefined;
  /** Whether to apply a 1000 row limit to the query result. */
  applyAutoLimit?: boolean | undefined;
  /** Name of the catalog where this query will be executed. */
  catalog?: string | undefined;
  /** Name of the schema where this query will be executed. */
  schema?: string | undefined;
}

export interface CreateDateRange {
  start: string;
  end: string;
}

export interface CreateDateRangeValue {
  value?:
    | {
        $case: 'dynamicDateRangeValue';
        /** Dynamic date-time range value based on current date-time. */
        dynamicDateRangeValue: DateRangeValue_DynamicDateRange;
      }
    | {
        $case: 'dateRangeValue';
        /** Manually specified date-time range value. */
        dateRangeValue: CreateDateRange;
      }
    | undefined;
  /** Date-time precision to format the value into when the query is run. Defaults to DAY_PRECISION (YYYY-MM-DD). */
  precision?: DatePrecision | undefined;
  startDayOfWeek?: number | undefined;
}

export interface CreateDateValue {
  value?:
    | {
        $case: 'dynamicDateValue';
        /** Dynamic date-time value based on current date-time. */
        dynamicDateValue: DateValue_DynamicDate;
      }
    | {
        $case: 'dateValue';
        /** Manually specified date-time value. */
        dateValue: string;
      }
    | undefined;
  /** Date-time precision to format the value into when the query is run. Defaults to DAY_PRECISION (YYYY-MM-DD). */
  precision?: DatePrecision | undefined;
}

export interface CreateEnumValue {
  /** List of selected query parameter values. */
  values?: string[] | undefined;
  /** List of valid query parameter values, newline delimited. */
  enumOptions?: string | undefined;
  /** If specified, allows multiple values to be selected for this parameter. */
  multiValuesOptions?: CreateMultiValuesOptions | undefined;
}

export interface CreateMultiValuesOptions {
  /** Character that prefixes each selected parameter value. */
  prefix?: string | undefined;
  /** Character that separates each selected parameter value. Defaults to a comma. */
  separator?: string | undefined;
  /** Character that suffixes each selected parameter value. */
  suffix?: string | undefined;
}

export interface CreateNumericValue {
  value?: number | undefined;
}

export interface CreateQueryBackedValue {
  /** List of selected query parameter values. */
  values?: string[] | undefined;
  /** UUID of the query that provides the parameter values. */
  queryId?: string | undefined;
  /** If specified, allows multiple values to be selected for this parameter. */
  multiValuesOptions?: CreateMultiValuesOptions | undefined;
}

export interface CreateQueryParameter {
  /** Text displayed in the user-facing parameter widget in the UI. */
  title?: string | undefined;
  /** Literal parameter marker that appears between double curly braces in the query text. */
  name?: string | undefined;
  /** Only one of the following fields may be set, depending on the type of parameter. */
  parameterValue?:
    | {
        $case: 'textValue';
        /** Text query parameter value. */
        textValue: CreateTextValue;
      }
    | {
        $case: 'numericValue';
        /** Numeric query parameter value. */
        numericValue: CreateNumericValue;
      }
    | {
        $case: 'enumValue';
        /** Dropdown query parameter value. */
        enumValue: CreateEnumValue;
      }
    | {
        $case: 'dateValue';
        /** Date query parameter value. Can only specify one of `dynamic_date_value` or `date_value`. */
        dateValue: CreateDateValue;
      }
    | {
        $case: 'dateRangeValue';
        /** Date-range query parameter value. Can only specify one of `dynamic_date_range_value` or `date_range_value`. */
        dateRangeValue: CreateDateRangeValue;
      }
    | {
        $case: 'queryBackedValue';
        /** Query-based dropdown query parameter value. */
        queryBackedValue: CreateQueryBackedValue;
      }
    | undefined;
}

export interface CreateQueryRequest {
  query?: CreateCreateQueryRequestQuery | undefined;
  /** If true, automatically resolve query display name conflicts. Otherwise, fail the request if the query's display name conflicts with an existing query's display name. */
  autoResolveDisplayName?: boolean | undefined;
}

export interface CreateQueryRequestQuery {
  /** UUID identifying the query. */
  id?: string | undefined;
  /** Display name of the query that appears in list views, widget headings, and on the query page. */
  displayName?: string | undefined;
  /** General description that conveys additional information about this query such as usage notes. */
  description?: string | undefined;
  /** Username of the user that owns the query. */
  ownerUserName?: string | undefined;
  /** ID of the SQL warehouse attached to the query. */
  warehouseId?: string | undefined;
  /** Text of the query to be run. */
  queryText?: string | undefined;
  /** Sets the "Run as" role for the object. */
  runAsMode?: RunAsMode | undefined;
  /** Indicates whether the query is trashed. */
  lifecycleState?: LifecycleState | undefined;
  /** Username of the user who last saved changes to this query. */
  lastModifierUserName?: string | undefined;
  /** Workspace path of the workspace folder containing the object. */
  parentPath?: string | undefined;
  tags?: string[] | undefined;
  /** Timestamp when this query was created. */
  createTime?: Temporal.Instant | undefined;
  /** Timestamp when this query was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** List of query parameter definitions. */
  parameters?: QueryParameter[] | undefined;
  /** Whether to apply a 1000 row limit to the query result. */
  applyAutoLimit?: boolean | undefined;
  /** Name of the catalog where this query will be executed. */
  catalog?: string | undefined;
  /** Name of the schema where this query will be executed. */
  schema?: string | undefined;
}

export interface CreateTextValue {
  value?: string | undefined;
}

export interface DateRange {
  start?: string | undefined;
  end?: string | undefined;
}

export interface DateRangeValue {
  value?:
    | {
        $case: 'dynamicDateRangeValue';
        /** Dynamic date-time range value based on current date-time. */
        dynamicDateRangeValue: DateRangeValue_DynamicDateRange;
      }
    | {
        $case: 'dateRangeValue';
        /** Manually specified date-time range value. */
        dateRangeValue: DateRange;
      }
    | undefined;
  /** Date-time precision to format the value into when the query is run. Defaults to DAY_PRECISION (YYYY-MM-DD). */
  precision?: DatePrecision | undefined;
  startDayOfWeek?: number | undefined;
}

export interface DateValue {
  value?:
    | {
        $case: 'dynamicDateValue';
        /** Dynamic date-time value based on current date-time. */
        dynamicDateValue: DateValue_DynamicDate;
      }
    | {
        $case: 'dateValue';
        /** Manually specified date-time value. */
        dateValue: string;
      }
    | undefined;
  /** Date-time precision to format the value into when the query is run. Defaults to DAY_PRECISION (YYYY-MM-DD). */
  precision?: DatePrecision | undefined;
}

/**
 * Represents an empty message, similar to google.protobuf.Empty, which is not available in the firm
 * right now.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Empty {}

export interface EnumValue {
  /** List of selected query parameter values. */
  values?: string[] | undefined;
  /** List of valid query parameter values, newline delimited. */
  enumOptions?: string | undefined;
  /** If specified, allows multiple values to be selected for this parameter. */
  multiValuesOptions?: MultiValuesOptions | undefined;
}

export interface GetQueryRequest {
  id?: string | undefined;
}

export interface ListQueriesRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListQueriesResponse {
  results?: ListQueryObjectsResponseQuery[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListQueryObjectsResponseQuery {
  /** UUID identifying the query. */
  id?: string | undefined;
  /** Display name of the query that appears in list views, widget headings, and on the query page. */
  displayName?: string | undefined;
  /** General description that conveys additional information about this query such as usage notes. */
  description?: string | undefined;
  /** Username of the user that owns the query. */
  ownerUserName?: string | undefined;
  /** ID of the SQL warehouse attached to the query. */
  warehouseId?: string | undefined;
  /** Text of the query to be run. */
  queryText?: string | undefined;
  /** Sets the "Run as" role for the object. */
  runAsMode?: RunAsMode | undefined;
  /** Indicates whether the query is trashed. */
  lifecycleState?: LifecycleState | undefined;
  /** Username of the user who last saved changes to this query. */
  lastModifierUserName?: string | undefined;
  /** Workspace path of the workspace folder containing the object. */
  parentPath?: string | undefined;
  tags?: string[] | undefined;
  /** Timestamp when this query was created. */
  createTime?: Temporal.Instant | undefined;
  /** Timestamp when this query was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** List of query parameter definitions. */
  parameters?: QueryParameter[] | undefined;
  /** Whether to apply a 1000 row limit to the query result. */
  applyAutoLimit?: boolean | undefined;
  /** Name of the catalog where this query will be executed. */
  catalog?: string | undefined;
  /** Name of the schema where this query will be executed. */
  schema?: string | undefined;
}

export interface ListVisualizationsForQueryRequest {
  id?: string | undefined;
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

export interface ListVisualizationsForQueryResponse {
  results?: Visualization[] | undefined;
  nextPageToken?: string | undefined;
}

export interface MultiValuesOptions {
  /** Character that prefixes each selected parameter value. */
  prefix?: string | undefined;
  /** Character that separates each selected parameter value. Defaults to a comma. */
  separator?: string | undefined;
  /** Character that suffixes each selected parameter value. */
  suffix?: string | undefined;
}

export interface NumericValue {
  value?: number | undefined;
}

export interface Query {
  /** UUID identifying the query. */
  id?: string | undefined;
  /** Display name of the query that appears in list views, widget headings, and on the query page. */
  displayName?: string | undefined;
  /** General description that conveys additional information about this query such as usage notes. */
  description?: string | undefined;
  /** Username of the user that owns the query. */
  ownerUserName?: string | undefined;
  /** ID of the SQL warehouse attached to the query. */
  warehouseId?: string | undefined;
  /** Text of the query to be run. */
  queryText?: string | undefined;
  /** Sets the "Run as" role for the object. */
  runAsMode?: RunAsMode | undefined;
  /** Indicates whether the query is trashed. */
  lifecycleState?: LifecycleState | undefined;
  /** Username of the user who last saved changes to this query. */
  lastModifierUserName?: string | undefined;
  /** Workspace path of the workspace folder containing the object. */
  parentPath?: string | undefined;
  tags?: string[] | undefined;
  /** Timestamp when this query was created. */
  createTime?: Temporal.Instant | undefined;
  /** Timestamp when this query was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** List of query parameter definitions. */
  parameters?: QueryParameter[] | undefined;
  /** Whether to apply a 1000 row limit to the query result. */
  applyAutoLimit?: boolean | undefined;
  /** Name of the catalog where this query will be executed. */
  catalog?: string | undefined;
  /** Name of the schema where this query will be executed. */
  schema?: string | undefined;
}

export interface QueryBackedValue {
  /** List of selected query parameter values. */
  values?: string[] | undefined;
  /** UUID of the query that provides the parameter values. */
  queryId?: string | undefined;
  /** If specified, allows multiple values to be selected for this parameter. */
  multiValuesOptions?: MultiValuesOptions | undefined;
}

export interface QueryParameter {
  /** Text displayed in the user-facing parameter widget in the UI. */
  title?: string | undefined;
  /** Literal parameter marker that appears between double curly braces in the query text. */
  name?: string | undefined;
  /** Only one of the following fields may be set, depending on the type of parameter. */
  parameterValue?:
    | {
        $case: 'textValue';
        /** Text query parameter value. */
        textValue: TextValue;
      }
    | {
        $case: 'numericValue';
        /** Numeric query parameter value. */
        numericValue: NumericValue;
      }
    | {
        $case: 'enumValue';
        /** Dropdown query parameter value. */
        enumValue: EnumValue;
      }
    | {
        $case: 'dateValue';
        /** Date query parameter value. Can only specify one of `dynamic_date_value` or `date_value`. */
        dateValue: DateValue;
      }
    | {
        $case: 'dateRangeValue';
        /** Date-range query parameter value. Can only specify one of `dynamic_date_range_value` or `date_range_value`. */
        dateRangeValue: DateRangeValue;
      }
    | {
        $case: 'queryBackedValue';
        /** Query-based dropdown query parameter value. */
        queryBackedValue: QueryBackedValue;
      }
    | undefined;
}

export interface TextValue {
  value?: string | undefined;
}

export interface TrashQueryRequest {
  id?: string | undefined;
}

export interface UpdateDateRange {
  start?: string | undefined;
  end?: string | undefined;
}

export interface UpdateDateRangeValue {
  value?:
    | {
        $case: 'dynamicDateRangeValue';
        /** Dynamic date-time range value based on current date-time. */
        dynamicDateRangeValue: DateRangeValue_DynamicDateRange;
      }
    | {
        $case: 'dateRangeValue';
        /** Manually specified date-time range value. */
        dateRangeValue: UpdateDateRange;
      }
    | undefined;
  /** Date-time precision to format the value into when the query is run. Defaults to DAY_PRECISION (YYYY-MM-DD). */
  precision?: DatePrecision | undefined;
  startDayOfWeek?: number | undefined;
}

export interface UpdateDateValue {
  value?:
    | {
        $case: 'dynamicDateValue';
        /** Dynamic date-time value based on current date-time. */
        dynamicDateValue: DateValue_DynamicDate;
      }
    | {
        $case: 'dateValue';
        /** Manually specified date-time value. */
        dateValue: string;
      }
    | undefined;
  /** Date-time precision to format the value into when the query is run. Defaults to DAY_PRECISION (YYYY-MM-DD). */
  precision?: DatePrecision | undefined;
}

export interface UpdateEnumValue {
  /** List of selected query parameter values. */
  values?: string[] | undefined;
  /** List of valid query parameter values, newline delimited. */
  enumOptions?: string | undefined;
  /** If specified, allows multiple values to be selected for this parameter. */
  multiValuesOptions?: UpdateMultiValuesOptions | undefined;
}

export interface UpdateMultiValuesOptions {
  /** Character that prefixes each selected parameter value. */
  prefix?: string | undefined;
  /** Character that separates each selected parameter value. Defaults to a comma. */
  separator?: string | undefined;
  /** Character that suffixes each selected parameter value. */
  suffix?: string | undefined;
}

export interface UpdateNumericValue {
  value?: number | undefined;
}

export interface UpdateQueryBackedValue {
  /** List of selected query parameter values. */
  values?: string[] | undefined;
  /** UUID of the query that provides the parameter values. */
  queryId?: string | undefined;
  /** If specified, allows multiple values to be selected for this parameter. */
  multiValuesOptions?: UpdateMultiValuesOptions | undefined;
}

export interface UpdateQueryParameter {
  /** Text displayed in the user-facing parameter widget in the UI. */
  title?: string | undefined;
  /** Literal parameter marker that appears between double curly braces in the query text. */
  name?: string | undefined;
  /** Only one of the following fields may be set, depending on the type of parameter. */
  parameterValue?:
    | {
        $case: 'textValue';
        /** Text query parameter value. */
        textValue: UpdateTextValue;
      }
    | {
        $case: 'numericValue';
        /** Numeric query parameter value. */
        numericValue: UpdateNumericValue;
      }
    | {
        $case: 'enumValue';
        /** Dropdown query parameter value. */
        enumValue: UpdateEnumValue;
      }
    | {
        $case: 'dateValue';
        /** Date query parameter value. Can only specify one of `dynamic_date_value` or `date_value`. */
        dateValue: UpdateDateValue;
      }
    | {
        $case: 'dateRangeValue';
        /** Date-range query parameter value. Can only specify one of `dynamic_date_range_value` or `date_range_value`. */
        dateRangeValue: UpdateDateRangeValue;
      }
    | {
        $case: 'queryBackedValue';
        /** Query-based dropdown query parameter value. */
        queryBackedValue: UpdateQueryBackedValue;
      }
    | undefined;
}

export interface UpdateQueryRequest {
  query?: UpdateUpdateQueryRequestQuery | undefined;
  updateMask?: FieldMask<UpdateUpdateQueryRequestQuery> | undefined;
  id?: string | undefined;
  /** If true, automatically resolve alert display name conflicts. Otherwise, fail the request if the alert's display name conflicts with an existing alert's display name. */
  autoResolveDisplayName?: boolean | undefined;
}

export interface UpdateQueryRequestQuery {
  /** UUID identifying the query. */
  id?: string | undefined;
  /** Display name of the query that appears in list views, widget headings, and on the query page. */
  displayName?: string | undefined;
  /** General description that conveys additional information about this query such as usage notes. */
  description?: string | undefined;
  /** Username of the user that owns the query. */
  ownerUserName?: string | undefined;
  /** ID of the SQL warehouse attached to the query. */
  warehouseId?: string | undefined;
  /** Text of the query to be run. */
  queryText?: string | undefined;
  /** Sets the "Run as" role for the object. */
  runAsMode?: RunAsMode | undefined;
  /** Indicates whether the query is trashed. */
  lifecycleState?: LifecycleState | undefined;
  /** Username of the user who last saved changes to this query. */
  lastModifierUserName?: string | undefined;
  /** Workspace path of the workspace folder containing the object. */
  parentPath?: string | undefined;
  tags?: string[] | undefined;
  /** Timestamp when this query was created. */
  createTime?: Temporal.Instant | undefined;
  /** Timestamp when this query was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** List of query parameter definitions. */
  parameters?: QueryParameter[] | undefined;
  /** Whether to apply a 1000 row limit to the query result. */
  applyAutoLimit?: boolean | undefined;
  /** Name of the catalog where this query will be executed. */
  catalog?: string | undefined;
  /** Name of the schema where this query will be executed. */
  schema?: string | undefined;
}

export interface UpdateTextValue {
  value?: string | undefined;
}

export interface UpdateUpdateQueryRequestQuery {
  /** UUID identifying the query. */
  id?: string | undefined;
  /** Display name of the query that appears in list views, widget headings, and on the query page. */
  displayName?: string | undefined;
  /** General description that conveys additional information about this query such as usage notes. */
  description?: string | undefined;
  /** Username of the user that owns the query. */
  ownerUserName?: string | undefined;
  /** ID of the SQL warehouse attached to the query. */
  warehouseId?: string | undefined;
  /** Text of the query to be run. */
  queryText?: string | undefined;
  /** Sets the "Run as" role for the object. */
  runAsMode?: RunAsMode | undefined;
  /** Indicates whether the query is trashed. */
  lifecycleState?: LifecycleState | undefined;
  /** Username of the user who last saved changes to this query. */
  lastModifierUserName?: string | undefined;
  /** Workspace path of the workspace folder containing the object. */
  parentPath?: string | undefined;
  tags?: string[] | undefined;
  /** Timestamp when this query was created. */
  createTime?: Temporal.Instant | undefined;
  /** Timestamp when this query was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** List of query parameter definitions. */
  parameters?: UpdateQueryParameter[] | undefined;
  /** Whether to apply a 1000 row limit to the query result. */
  applyAutoLimit?: boolean | undefined;
  /** Name of the catalog where this query will be executed. */
  catalog?: string | undefined;
  /** Name of the schema where this query will be executed. */
  schema?: string | undefined;
}

export interface Visualization {
  /** UUID identifying the visualization. */
  id?: string | undefined;
  /** The display name of the visualization. */
  displayName?: string | undefined;
  /** The type of visualization: counter, table, funnel, and so on. */
  type?: string | undefined;
  /** The timestamp indicating when the visualization was created. */
  createTime?: Temporal.Instant | undefined;
  /** The timestamp indicating when the visualization was updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The visualization query plan varies widely from one visualization type to the next and is unsupported. Databricks does not recommend modifying the visualization query plan directly. */
  serializedQueryPlan?: string | undefined;
  /** The visualization options varies widely from one visualization type to the next and is unsupported. Databricks does not recommend modifying visualization options directly. */
  serializedOptions?: string | undefined;
  /** UUID of the query that the visualization is attached to. */
  queryId?: string | undefined;
}

export const unmarshalDateRangeSchema: z.ZodType<DateRange> = z
  .object({
    start: z.string().optional(),
    end: z.string().optional(),
  })
  .transform(d => ({
    start: d.start,
    end: d.end,
  }));

export const unmarshalDateRangeValueSchema: z.ZodType<DateRangeValue> = z
  .object({
    dynamic_date_range_value: z.string().optional(),
    date_range_value: z.lazy(() => unmarshalDateRangeSchema).optional(),
    precision: z.string().optional(),
    start_day_of_week: z.number().optional(),
  })
  .transform(d => ({
    value:
      d.dynamic_date_range_value !== undefined
        ? {
            $case: 'dynamicDateRangeValue' as const,
            dynamicDateRangeValue: d.dynamic_date_range_value,
          }
        : d.date_range_value !== undefined
          ? {
              $case: 'dateRangeValue' as const,
              dateRangeValue: d.date_range_value,
            }
          : undefined,
    precision: d.precision,
    startDayOfWeek: d.start_day_of_week,
  }));

export const unmarshalDateValueSchema: z.ZodType<DateValue> = z
  .object({
    dynamic_date_value: z.string().optional(),
    date_value: z.string().optional(),
    precision: z.string().optional(),
  })
  .transform(d => ({
    value:
      d.dynamic_date_value !== undefined
        ? {
            $case: 'dynamicDateValue' as const,
            dynamicDateValue: d.dynamic_date_value,
          }
        : d.date_value !== undefined
          ? {$case: 'dateValue' as const, dateValue: d.date_value}
          : undefined,
    precision: d.precision,
  }));

export const unmarshalEmptySchema: z.ZodType<Empty> = z.object({});

export const unmarshalEnumValueSchema: z.ZodType<EnumValue> = z
  .object({
    values: z.array(z.string()).optional(),
    enum_options: z.string().optional(),
    multi_values_options: z
      .lazy(() => unmarshalMultiValuesOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    values: d.values,
    enumOptions: d.enum_options,
    multiValuesOptions: d.multi_values_options,
  }));

export const unmarshalListQueriesResponseSchema: z.ZodType<ListQueriesResponse> =
  z
    .object({
      results: z
        .array(z.lazy(() => unmarshalListQueryObjectsResponseQuerySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      results: d.results,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListQueryObjectsResponseQuerySchema: z.ZodType<ListQueryObjectsResponseQuery> =
  z
    .object({
      id: z.string().optional(),
      display_name: z.string().optional(),
      description: z.string().optional(),
      owner_user_name: z.string().optional(),
      warehouse_id: z.string().optional(),
      query_text: z.string().optional(),
      run_as_mode: z.string().optional(),
      lifecycle_state: z.string().optional(),
      last_modifier_user_name: z.string().optional(),
      parent_path: z.string().optional(),
      tags: z.array(z.string()).optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      parameters: z
        .array(z.lazy(() => unmarshalQueryParameterSchema))
        .optional(),
      apply_auto_limit: z.boolean().optional(),
      catalog: z.string().optional(),
      schema: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      displayName: d.display_name,
      description: d.description,
      ownerUserName: d.owner_user_name,
      warehouseId: d.warehouse_id,
      queryText: d.query_text,
      runAsMode: d.run_as_mode,
      lifecycleState: d.lifecycle_state,
      lastModifierUserName: d.last_modifier_user_name,
      parentPath: d.parent_path,
      tags: d.tags,
      createTime: d.create_time,
      updateTime: d.update_time,
      parameters: d.parameters,
      applyAutoLimit: d.apply_auto_limit,
      catalog: d.catalog,
      schema: d.schema,
    }));

export const unmarshalListVisualizationsForQueryResponseSchema: z.ZodType<ListVisualizationsForQueryResponse> =
  z
    .object({
      results: z.array(z.lazy(() => unmarshalVisualizationSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      results: d.results,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMultiValuesOptionsSchema: z.ZodType<MultiValuesOptions> =
  z
    .object({
      prefix: z.string().optional(),
      separator: z.string().optional(),
      suffix: z.string().optional(),
    })
    .transform(d => ({
      prefix: d.prefix,
      separator: d.separator,
      suffix: d.suffix,
    }));

export const unmarshalNumericValueSchema: z.ZodType<NumericValue> = z
  .object({
    value: z.number().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalQuerySchema: z.ZodType<Query> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    description: z.string().optional(),
    owner_user_name: z.string().optional(),
    warehouse_id: z.string().optional(),
    query_text: z.string().optional(),
    run_as_mode: z.string().optional(),
    lifecycle_state: z.string().optional(),
    last_modifier_user_name: z.string().optional(),
    parent_path: z.string().optional(),
    tags: z.array(z.string()).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    parameters: z.array(z.lazy(() => unmarshalQueryParameterSchema)).optional(),
    apply_auto_limit: z.boolean().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    displayName: d.display_name,
    description: d.description,
    ownerUserName: d.owner_user_name,
    warehouseId: d.warehouse_id,
    queryText: d.query_text,
    runAsMode: d.run_as_mode,
    lifecycleState: d.lifecycle_state,
    lastModifierUserName: d.last_modifier_user_name,
    parentPath: d.parent_path,
    tags: d.tags,
    createTime: d.create_time,
    updateTime: d.update_time,
    parameters: d.parameters,
    applyAutoLimit: d.apply_auto_limit,
    catalog: d.catalog,
    schema: d.schema,
  }));

export const unmarshalQueryBackedValueSchema: z.ZodType<QueryBackedValue> = z
  .object({
    values: z.array(z.string()).optional(),
    query_id: z.string().optional(),
    multi_values_options: z
      .lazy(() => unmarshalMultiValuesOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    values: d.values,
    queryId: d.query_id,
    multiValuesOptions: d.multi_values_options,
  }));

export const unmarshalQueryParameterSchema: z.ZodType<QueryParameter> = z
  .object({
    title: z.string().optional(),
    name: z.string().optional(),
    text_value: z.lazy(() => unmarshalTextValueSchema).optional(),
    numeric_value: z.lazy(() => unmarshalNumericValueSchema).optional(),
    enum_value: z.lazy(() => unmarshalEnumValueSchema).optional(),
    date_value: z.lazy(() => unmarshalDateValueSchema).optional(),
    date_range_value: z.lazy(() => unmarshalDateRangeValueSchema).optional(),
    query_backed_value: z
      .lazy(() => unmarshalQueryBackedValueSchema)
      .optional(),
  })
  .transform(d => ({
    title: d.title,
    name: d.name,
    parameterValue:
      d.text_value !== undefined
        ? {$case: 'textValue' as const, textValue: d.text_value}
        : d.numeric_value !== undefined
          ? {$case: 'numericValue' as const, numericValue: d.numeric_value}
          : d.enum_value !== undefined
            ? {$case: 'enumValue' as const, enumValue: d.enum_value}
            : d.date_value !== undefined
              ? {$case: 'dateValue' as const, dateValue: d.date_value}
              : d.date_range_value !== undefined
                ? {
                    $case: 'dateRangeValue' as const,
                    dateRangeValue: d.date_range_value,
                  }
                : d.query_backed_value !== undefined
                  ? {
                      $case: 'queryBackedValue' as const,
                      queryBackedValue: d.query_backed_value,
                    }
                  : undefined,
  }));

export const unmarshalTextValueSchema: z.ZodType<TextValue> = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalVisualizationSchema: z.ZodType<Visualization> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    type: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    serialized_query_plan: z.string().optional(),
    serialized_options: z.string().optional(),
    query_id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    displayName: d.display_name,
    type: d.type,
    createTime: d.create_time,
    updateTime: d.update_time,
    serializedQueryPlan: d.serialized_query_plan,
    serializedOptions: d.serialized_options,
    queryId: d.query_id,
  }));

export const marshalCreateCreateQueryRequestQuerySchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    ownerUserName: z.string().optional(),
    warehouseId: z.string().optional(),
    queryText: z.string().optional(),
    runAsMode: z.string().optional(),
    lifecycleState: z.string().optional(),
    lastModifierUserName: z.string().optional(),
    parentPath: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    parameters: z
      .array(z.lazy(() => marshalCreateQueryParameterSchema))
      .optional(),
    applyAutoLimit: z.boolean().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    display_name: d.displayName,
    description: d.description,
    owner_user_name: d.ownerUserName,
    warehouse_id: d.warehouseId,
    query_text: d.queryText,
    run_as_mode: d.runAsMode,
    lifecycle_state: d.lifecycleState,
    last_modifier_user_name: d.lastModifierUserName,
    parent_path: d.parentPath,
    tags: d.tags,
    create_time: d.createTime,
    update_time: d.updateTime,
    parameters: d.parameters,
    apply_auto_limit: d.applyAutoLimit,
    catalog: d.catalog,
    schema: d.schema,
  }));

export const marshalCreateDateRangeSchema: z.ZodType = z
  .object({
    start: z.string(),
    end: z.string(),
  })
  .transform(d => ({
    start: d.start,
    end: d.end,
  }));

export const marshalCreateDateRangeValueSchema: z.ZodType = z
  .object({
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dynamicDateRangeValue'),
          dynamicDateRangeValue: z.string(),
        }),
        z.object({
          $case: z.literal('dateRangeValue'),
          dateRangeValue: z.lazy(() => marshalCreateDateRangeSchema),
        }),
      ])
      .optional(),
    precision: z.string().optional(),
    startDayOfWeek: z.number().optional(),
  })
  .transform(d => ({
    ...(d.value?.$case === 'dynamicDateRangeValue' && {
      dynamic_date_range_value: d.value.dynamicDateRangeValue,
    }),
    ...(d.value?.$case === 'dateRangeValue' && {
      date_range_value: d.value.dateRangeValue,
    }),
    precision: d.precision,
    start_day_of_week: d.startDayOfWeek,
  }));

export const marshalCreateDateValueSchema: z.ZodType = z
  .object({
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dynamicDateValue'),
          dynamicDateValue: z.string(),
        }),
        z.object({$case: z.literal('dateValue'), dateValue: z.string()}),
      ])
      .optional(),
    precision: z.string().optional(),
  })
  .transform(d => ({
    ...(d.value?.$case === 'dynamicDateValue' && {
      dynamic_date_value: d.value.dynamicDateValue,
    }),
    ...(d.value?.$case === 'dateValue' && {date_value: d.value.dateValue}),
    precision: d.precision,
  }));

export const marshalCreateEnumValueSchema: z.ZodType = z
  .object({
    values: z.array(z.string()).optional(),
    enumOptions: z.string().optional(),
    multiValuesOptions: z
      .lazy(() => marshalCreateMultiValuesOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    values: d.values,
    enum_options: d.enumOptions,
    multi_values_options: d.multiValuesOptions,
  }));

export const marshalCreateMultiValuesOptionsSchema: z.ZodType = z
  .object({
    prefix: z.string().optional(),
    separator: z.string().optional(),
    suffix: z.string().optional(),
  })
  .transform(d => ({
    prefix: d.prefix,
    separator: d.separator,
    suffix: d.suffix,
  }));

export const marshalCreateNumericValueSchema: z.ZodType = z
  .object({
    value: z.number().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalCreateQueryBackedValueSchema: z.ZodType = z
  .object({
    values: z.array(z.string()).optional(),
    queryId: z.string().optional(),
    multiValuesOptions: z
      .lazy(() => marshalCreateMultiValuesOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    values: d.values,
    query_id: d.queryId,
    multi_values_options: d.multiValuesOptions,
  }));

export const marshalCreateQueryParameterSchema: z.ZodType = z
  .object({
    title: z.string().optional(),
    name: z.string().optional(),
    parameterValue: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('textValue'),
          textValue: z.lazy(() => marshalCreateTextValueSchema),
        }),
        z.object({
          $case: z.literal('numericValue'),
          numericValue: z.lazy(() => marshalCreateNumericValueSchema),
        }),
        z.object({
          $case: z.literal('enumValue'),
          enumValue: z.lazy(() => marshalCreateEnumValueSchema),
        }),
        z.object({
          $case: z.literal('dateValue'),
          dateValue: z.lazy(() => marshalCreateDateValueSchema),
        }),
        z.object({
          $case: z.literal('dateRangeValue'),
          dateRangeValue: z.lazy(() => marshalCreateDateRangeValueSchema),
        }),
        z.object({
          $case: z.literal('queryBackedValue'),
          queryBackedValue: z.lazy(() => marshalCreateQueryBackedValueSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    title: d.title,
    name: d.name,
    ...(d.parameterValue?.$case === 'textValue' && {
      text_value: d.parameterValue.textValue,
    }),
    ...(d.parameterValue?.$case === 'numericValue' && {
      numeric_value: d.parameterValue.numericValue,
    }),
    ...(d.parameterValue?.$case === 'enumValue' && {
      enum_value: d.parameterValue.enumValue,
    }),
    ...(d.parameterValue?.$case === 'dateValue' && {
      date_value: d.parameterValue.dateValue,
    }),
    ...(d.parameterValue?.$case === 'dateRangeValue' && {
      date_range_value: d.parameterValue.dateRangeValue,
    }),
    ...(d.parameterValue?.$case === 'queryBackedValue' && {
      query_backed_value: d.parameterValue.queryBackedValue,
    }),
  }));

export const marshalCreateQueryRequestSchema: z.ZodType = z
  .object({
    query: z.lazy(() => marshalCreateCreateQueryRequestQuerySchema).optional(),
    autoResolveDisplayName: z.boolean().optional(),
  })
  .transform(d => ({
    query: d.query,
    auto_resolve_display_name: d.autoResolveDisplayName,
  }));

export const marshalCreateTextValueSchema: z.ZodType = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalUpdateDateRangeSchema: z.ZodType = z
  .object({
    start: z.string().optional(),
    end: z.string().optional(),
  })
  .transform(d => ({
    start: d.start,
    end: d.end,
  }));

export const marshalUpdateDateRangeValueSchema: z.ZodType = z
  .object({
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dynamicDateRangeValue'),
          dynamicDateRangeValue: z.string(),
        }),
        z.object({
          $case: z.literal('dateRangeValue'),
          dateRangeValue: z.lazy(() => marshalUpdateDateRangeSchema),
        }),
      ])
      .optional(),
    precision: z.string().optional(),
    startDayOfWeek: z.number().optional(),
  })
  .transform(d => ({
    ...(d.value?.$case === 'dynamicDateRangeValue' && {
      dynamic_date_range_value: d.value.dynamicDateRangeValue,
    }),
    ...(d.value?.$case === 'dateRangeValue' && {
      date_range_value: d.value.dateRangeValue,
    }),
    precision: d.precision,
    start_day_of_week: d.startDayOfWeek,
  }));

export const marshalUpdateDateValueSchema: z.ZodType = z
  .object({
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('dynamicDateValue'),
          dynamicDateValue: z.string(),
        }),
        z.object({$case: z.literal('dateValue'), dateValue: z.string()}),
      ])
      .optional(),
    precision: z.string().optional(),
  })
  .transform(d => ({
    ...(d.value?.$case === 'dynamicDateValue' && {
      dynamic_date_value: d.value.dynamicDateValue,
    }),
    ...(d.value?.$case === 'dateValue' && {date_value: d.value.dateValue}),
    precision: d.precision,
  }));

export const marshalUpdateEnumValueSchema: z.ZodType = z
  .object({
    values: z.array(z.string()).optional(),
    enumOptions: z.string().optional(),
    multiValuesOptions: z
      .lazy(() => marshalUpdateMultiValuesOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    values: d.values,
    enum_options: d.enumOptions,
    multi_values_options: d.multiValuesOptions,
  }));

export const marshalUpdateMultiValuesOptionsSchema: z.ZodType = z
  .object({
    prefix: z.string().optional(),
    separator: z.string().optional(),
    suffix: z.string().optional(),
  })
  .transform(d => ({
    prefix: d.prefix,
    separator: d.separator,
    suffix: d.suffix,
  }));

export const marshalUpdateNumericValueSchema: z.ZodType = z
  .object({
    value: z.number().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalUpdateQueryBackedValueSchema: z.ZodType = z
  .object({
    values: z.array(z.string()).optional(),
    queryId: z.string().optional(),
    multiValuesOptions: z
      .lazy(() => marshalUpdateMultiValuesOptionsSchema)
      .optional(),
  })
  .transform(d => ({
    values: d.values,
    query_id: d.queryId,
    multi_values_options: d.multiValuesOptions,
  }));

export const marshalUpdateQueryParameterSchema: z.ZodType = z
  .object({
    title: z.string().optional(),
    name: z.string().optional(),
    parameterValue: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('textValue'),
          textValue: z.lazy(() => marshalUpdateTextValueSchema),
        }),
        z.object({
          $case: z.literal('numericValue'),
          numericValue: z.lazy(() => marshalUpdateNumericValueSchema),
        }),
        z.object({
          $case: z.literal('enumValue'),
          enumValue: z.lazy(() => marshalUpdateEnumValueSchema),
        }),
        z.object({
          $case: z.literal('dateValue'),
          dateValue: z.lazy(() => marshalUpdateDateValueSchema),
        }),
        z.object({
          $case: z.literal('dateRangeValue'),
          dateRangeValue: z.lazy(() => marshalUpdateDateRangeValueSchema),
        }),
        z.object({
          $case: z.literal('queryBackedValue'),
          queryBackedValue: z.lazy(() => marshalUpdateQueryBackedValueSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    title: d.title,
    name: d.name,
    ...(d.parameterValue?.$case === 'textValue' && {
      text_value: d.parameterValue.textValue,
    }),
    ...(d.parameterValue?.$case === 'numericValue' && {
      numeric_value: d.parameterValue.numericValue,
    }),
    ...(d.parameterValue?.$case === 'enumValue' && {
      enum_value: d.parameterValue.enumValue,
    }),
    ...(d.parameterValue?.$case === 'dateValue' && {
      date_value: d.parameterValue.dateValue,
    }),
    ...(d.parameterValue?.$case === 'dateRangeValue' && {
      date_range_value: d.parameterValue.dateRangeValue,
    }),
    ...(d.parameterValue?.$case === 'queryBackedValue' && {
      query_backed_value: d.parameterValue.queryBackedValue,
    }),
  }));

export const marshalUpdateQueryRequestSchema: z.ZodType = z
  .object({
    query: z.lazy(() => marshalUpdateUpdateQueryRequestQuerySchema).optional(),
    updateMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
    id: z.string().optional(),
    autoResolveDisplayName: z.boolean().optional(),
  })
  .transform(d => ({
    query: d.query,
    update_mask: d.updateMask,
    id: d.id,
    auto_resolve_display_name: d.autoResolveDisplayName,
  }));

export const marshalUpdateTextValueSchema: z.ZodType = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalUpdateUpdateQueryRequestQuerySchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    ownerUserName: z.string().optional(),
    warehouseId: z.string().optional(),
    queryText: z.string().optional(),
    runAsMode: z.string().optional(),
    lifecycleState: z.string().optional(),
    lastModifierUserName: z.string().optional(),
    parentPath: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    parameters: z
      .array(z.lazy(() => marshalUpdateQueryParameterSchema))
      .optional(),
    applyAutoLimit: z.boolean().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    display_name: d.displayName,
    description: d.description,
    owner_user_name: d.ownerUserName,
    warehouse_id: d.warehouseId,
    query_text: d.queryText,
    run_as_mode: d.runAsMode,
    lifecycle_state: d.lifecycleState,
    last_modifier_user_name: d.lastModifierUserName,
    parent_path: d.parentPath,
    tags: d.tags,
    create_time: d.createTime,
    update_time: d.updateTime,
    parameters: d.parameters,
    apply_auto_limit: d.applyAutoLimit,
    catalog: d.catalog,
    schema: d.schema,
  }));

const updateUpdateQueryRequestQueryFieldMaskSchema: FieldMaskSchema = {
  applyAutoLimit: {wire: 'apply_auto_limit'},
  catalog: {wire: 'catalog'},
  createTime: {wire: 'create_time'},
  description: {wire: 'description'},
  displayName: {wire: 'display_name'},
  id: {wire: 'id'},
  lastModifierUserName: {wire: 'last_modifier_user_name'},
  lifecycleState: {wire: 'lifecycle_state'},
  ownerUserName: {wire: 'owner_user_name'},
  parameters: {wire: 'parameters'},
  parentPath: {wire: 'parent_path'},
  queryText: {wire: 'query_text'},
  runAsMode: {wire: 'run_as_mode'},
  schema: {wire: 'schema'},
  tags: {wire: 'tags'},
  updateTime: {wire: 'update_time'},
  warehouseId: {wire: 'warehouse_id'},
};

export function updateUpdateQueryRequestQueryFieldMask(
  ...paths: string[]
): FieldMask<UpdateUpdateQueryRequestQuery> {
  return FieldMask.build<UpdateUpdateQueryRequestQuery>(
    paths,
    updateUpdateQueryRequestQueryFieldMaskSchema
  );
}
