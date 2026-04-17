// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.


import {Temporal} from '@js-temporal/polyfill';
import {FieldMask, type FieldPaths} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export enum DatePrecision {
  DAY_PRECISION = 'DAY_PRECISION',
  MINUTE_PRECISION = 'MINUTE_PRECISION',
  SECOND_PRECISION = 'SECOND_PRECISION',
}

export enum LifecycleState {
  ACTIVE = 'ACTIVE',
  TRASHED = 'TRASHED',
}

export enum RunAsMode {
  OWNER = 'OWNER',
  VIEWER = 'VIEWER',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum DateRangeValue_DynamicDateRange {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  THIS_WEEK = 'THIS_WEEK',
  THIS_MONTH = 'THIS_MONTH',
  THIS_YEAR = 'THIS_YEAR',
  LAST_WEEK = 'LAST_WEEK',
  LAST_MONTH = 'LAST_MONTH',
  LAST_YEAR = 'LAST_YEAR',
  LAST_HOUR = 'LAST_HOUR',
  LAST_8_HOURS = 'LAST_8_HOURS',
  LAST_24_HOURS = 'LAST_24_HOURS',
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_14_DAYS = 'LAST_14_DAYS',
  LAST_30_DAYS = 'LAST_30_DAYS',
  LAST_60_DAYS = 'LAST_60_DAYS',
  LAST_90_DAYS = 'LAST_90_DAYS',
  LAST_12_MONTHS = 'LAST_12_MONTHS',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum DateValue_DynamicDate {
  NOW = 'NOW',
  YESTERDAY = 'YESTERDAY',
}

export interface CreateQueryRequest {
  query?: CreateQueryRequestQuery | undefined;
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

export interface DateRange {
  start?: string | undefined;
  end?: string | undefined;
}

export interface DateRangeValue {
  /** Dynamic date-time range value based on current date-time. */
  dynamicDateRangeValue?: DateRangeValue_DynamicDateRange | undefined;
  /** Manually specified date-time range value. */
  dateRangeValue?: DateRange | undefined;
  /** Date-time precision to format the value into when the query is run. Defaults to DAY_PRECISION (YYYY-MM-DD). */
  precision?: DatePrecision | undefined;
  startDayOfWeek?: number | undefined;
}

export interface DateValue {
  /** Dynamic date-time value based on current date-time. */
  dynamicDateValue?: DateValue_DynamicDate | undefined;
  /** Manually specified date-time value. */
  dateValue?: string | undefined;
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
  /** Text query parameter value. */
  textValue?: TextValue | undefined;
  /** Numeric query parameter value. */
  numericValue?: NumericValue | undefined;
  /** Dropdown query parameter value. */
  enumValue?: EnumValue | undefined;
  /** Date query parameter value. Can only specify one of `dynamic_date_value` or `date_value`. */
  dateValue?: DateValue | undefined;
  /** Date-range query parameter value. Can only specify one of `dynamic_date_range_value` or `date_range_value`. */
  dateRangeValue?: DateRangeValue | undefined;
  /** Query-based dropdown query parameter value. */
  queryBackedValue?: QueryBackedValue | undefined;
}

export interface TextValue {
  value?: string | undefined;
}

export interface TrashQueryRequest {
  id?: string | undefined;
}

export interface UpdateQueryRequest {
  query?: UpdateQueryRequestQuery | undefined;
  updateMask?: FieldMask<FieldPaths<UpdateQueryRequestQuery>> | undefined;
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

export const unmarshalCreateQueryRequestSchema: z.ZodType<CreateQueryRequest> = z
  .object({
    query: z.lazy(() => unmarshalCreateQueryRequestQuerySchema).optional(),
    auto_resolve_display_name: z.boolean().optional(),
  })
  .transform(d => ({
    query: d.query,
    autoResolveDisplayName: d.auto_resolve_display_name,
  }));

export const unmarshalCreateQueryRequestQuerySchema: z.ZodType<CreateQueryRequestQuery> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    description: z.string().optional(),
    owner_user_name: z.string().optional(),
    warehouse_id: z.string().optional(),
    query_text: z.string().optional(),
    run_as_mode: z.enum(RunAsMode).optional(),
    lifecycle_state: z.enum(LifecycleState).optional(),
    last_modifier_user_name: z.string().optional(),
    parent_path: z.string().optional(),
    tags: z.array(z.string()).optional(),
    create_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
    update_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
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
    dynamic_date_range_value: z.enum(DateRangeValue_DynamicDateRange).optional(),
    date_range_value: z.lazy(() => unmarshalDateRangeSchema).optional(),
    precision: z.enum(DatePrecision).optional(),
    start_day_of_week: z.number().optional(),
  })
  .transform(d => ({
    dynamicDateRangeValue: d.dynamic_date_range_value,
    dateRangeValue: d.date_range_value,
    precision: d.precision,
    startDayOfWeek: d.start_day_of_week,
  }));

export const unmarshalDateValueSchema: z.ZodType<DateValue> = z
  .object({
    dynamic_date_value: z.enum(DateValue_DynamicDate).optional(),
    date_value: z.string().optional(),
    precision: z.enum(DatePrecision).optional(),
  })
  .transform(d => ({
    dynamicDateValue: d.dynamic_date_value,
    dateValue: d.date_value,
    precision: d.precision,
  }));

export const unmarshalEmptySchema: z.ZodType<Empty> = z
  .object({
  });

export const unmarshalEnumValueSchema: z.ZodType<EnumValue> = z
  .object({
    values: z.array(z.string()).optional(),
    enum_options: z.string().optional(),
    multi_values_options: z.lazy(() => unmarshalMultiValuesOptionsSchema).optional(),
  })
  .transform(d => ({
    values: d.values,
    enumOptions: d.enum_options,
    multiValuesOptions: d.multi_values_options,
  }));

export const unmarshalGetQueryRequestSchema: z.ZodType<GetQueryRequest> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const unmarshalListQueriesRequestSchema: z.ZodType<ListQueriesRequest> = z
  .object({
    page_token: z.string().optional(),
    page_size: z.number().optional(),
  })
  .transform(d => ({
    pageToken: d.page_token,
    pageSize: d.page_size,
  }));

export const unmarshalListQueriesResponseSchema: z.ZodType<ListQueriesResponse> = z
  .object({
    results: z.array(z.lazy(() => unmarshalListQueryObjectsResponseQuerySchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    results: d.results,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListQueryObjectsResponseQuerySchema: z.ZodType<ListQueryObjectsResponseQuery> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    description: z.string().optional(),
    owner_user_name: z.string().optional(),
    warehouse_id: z.string().optional(),
    query_text: z.string().optional(),
    run_as_mode: z.enum(RunAsMode).optional(),
    lifecycle_state: z.enum(LifecycleState).optional(),
    last_modifier_user_name: z.string().optional(),
    parent_path: z.string().optional(),
    tags: z.array(z.string()).optional(),
    create_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
    update_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
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

export const unmarshalListVisualizationsForQueryRequestSchema: z.ZodType<ListVisualizationsForQueryRequest> = z
  .object({
    id: z.string().optional(),
    page_token: z.string().optional(),
    page_size: z.number().optional(),
  })
  .transform(d => ({
    id: d.id,
    pageToken: d.page_token,
    pageSize: d.page_size,
  }));

export const unmarshalListVisualizationsForQueryResponseSchema: z.ZodType<ListVisualizationsForQueryResponse> = z
  .object({
    results: z.array(z.lazy(() => unmarshalVisualizationSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    results: d.results,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalMultiValuesOptionsSchema: z.ZodType<MultiValuesOptions> = z
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
    run_as_mode: z.enum(RunAsMode).optional(),
    lifecycle_state: z.enum(LifecycleState).optional(),
    last_modifier_user_name: z.string().optional(),
    parent_path: z.string().optional(),
    tags: z.array(z.string()).optional(),
    create_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
    update_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
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
    multi_values_options: z.lazy(() => unmarshalMultiValuesOptionsSchema).optional(),
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
    query_backed_value: z.lazy(() => unmarshalQueryBackedValueSchema).optional(),
  })
  .transform(d => ({
    title: d.title,
    name: d.name,
    textValue: d.text_value,
    numericValue: d.numeric_value,
    enumValue: d.enum_value,
    dateValue: d.date_value,
    dateRangeValue: d.date_range_value,
    queryBackedValue: d.query_backed_value,
  }));

export const unmarshalTextValueSchema: z.ZodType<TextValue> = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalTrashQueryRequestSchema: z.ZodType<TrashQueryRequest> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const unmarshalUpdateQueryRequestSchema: z.ZodType<UpdateQueryRequest> = z
  .object({
    query: z.lazy(() => unmarshalUpdateQueryRequestQuerySchema).optional(),
    update_mask: z.string().transform(s => FieldMask.of(...(s === '' ? [] : s.split(','))) as FieldMask<FieldPaths<UpdateQueryRequestQuery>>).optional(),
    id: z.string().optional(),
    auto_resolve_display_name: z.boolean().optional(),
  })
  .transform(d => ({
    query: d.query,
    updateMask: d.update_mask,
    id: d.id,
    autoResolveDisplayName: d.auto_resolve_display_name,
  }));

export const unmarshalUpdateQueryRequestQuerySchema: z.ZodType<UpdateQueryRequestQuery> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    description: z.string().optional(),
    owner_user_name: z.string().optional(),
    warehouse_id: z.string().optional(),
    query_text: z.string().optional(),
    run_as_mode: z.enum(RunAsMode).optional(),
    lifecycle_state: z.enum(LifecycleState).optional(),
    last_modifier_user_name: z.string().optional(),
    parent_path: z.string().optional(),
    tags: z.array(z.string()).optional(),
    create_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
    update_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
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

export const unmarshalVisualizationSchema: z.ZodType<Visualization> = z
  .object({
    id: z.string().optional(),
    display_name: z.string().optional(),
    type: z.string().optional(),
    create_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
    update_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
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

export const marshalCreateQueryRequestSchema: z.ZodType = z
  .object({
    query: z.lazy(() => marshalCreateQueryRequestQuerySchema).optional(),
    autoResolveDisplayName: z.boolean().optional(),
  })
  .transform(d => ({
    query: d.query,
    auto_resolve_display_name: d.autoResolveDisplayName,
  }));

export const marshalCreateQueryRequestQuerySchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    ownerUserName: z.string().optional(),
    warehouseId: z.string().optional(),
    queryText: z.string().optional(),
    runAsMode: z.enum(RunAsMode).optional(),
    lifecycleState: z.enum(LifecycleState).optional(),
    lastModifierUserName: z.string().optional(),
    parentPath: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    updateTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    parameters: z.array(z.lazy(() => marshalQueryParameterSchema)).optional(),
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

export const marshalDateRangeSchema: z.ZodType = z
  .object({
    start: z.string().optional(),
    end: z.string().optional(),
  })
  .transform(d => ({
    start: d.start,
    end: d.end,
  }));

export const marshalDateRangeValueSchema: z.ZodType = z
  .object({
    dynamicDateRangeValue: z.enum(DateRangeValue_DynamicDateRange).optional(),
    dateRangeValue: z.lazy(() => marshalDateRangeSchema).optional(),
    precision: z.enum(DatePrecision).optional(),
    startDayOfWeek: z.number().optional(),
  })
  .transform(d => ({
    dynamic_date_range_value: d.dynamicDateRangeValue,
    date_range_value: d.dateRangeValue,
    precision: d.precision,
    start_day_of_week: d.startDayOfWeek,
  }));

export const marshalDateValueSchema: z.ZodType = z
  .object({
    dynamicDateValue: z.enum(DateValue_DynamicDate).optional(),
    dateValue: z.string().optional(),
    precision: z.enum(DatePrecision).optional(),
  })
  .transform(d => ({
    dynamic_date_value: d.dynamicDateValue,
    date_value: d.dateValue,
    precision: d.precision,
  }));

export const marshalEmptySchema: z.ZodType = z
  .object({
  });

export const marshalEnumValueSchema: z.ZodType = z
  .object({
    values: z.array(z.string()).optional(),
    enumOptions: z.string().optional(),
    multiValuesOptions: z.lazy(() => marshalMultiValuesOptionsSchema).optional(),
  })
  .transform(d => ({
    values: d.values,
    enum_options: d.enumOptions,
    multi_values_options: d.multiValuesOptions,
  }));

export const marshalGetQueryRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalListQueriesRequestSchema: z.ZodType = z
  .object({
    pageToken: z.string().optional(),
    pageSize: z.number().optional(),
  })
  .transform(d => ({
    page_token: d.pageToken,
    page_size: d.pageSize,
  }));

export const marshalListQueriesResponseSchema: z.ZodType = z
  .object({
    results: z.array(z.lazy(() => marshalListQueryObjectsResponseQuerySchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    results: d.results,
    next_page_token: d.nextPageToken,
  }));

export const marshalListQueryObjectsResponseQuerySchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    ownerUserName: z.string().optional(),
    warehouseId: z.string().optional(),
    queryText: z.string().optional(),
    runAsMode: z.enum(RunAsMode).optional(),
    lifecycleState: z.enum(LifecycleState).optional(),
    lastModifierUserName: z.string().optional(),
    parentPath: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    updateTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    parameters: z.array(z.lazy(() => marshalQueryParameterSchema)).optional(),
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

export const marshalListVisualizationsForQueryRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    pageToken: z.string().optional(),
    pageSize: z.number().optional(),
  })
  .transform(d => ({
    id: d.id,
    page_token: d.pageToken,
    page_size: d.pageSize,
  }));

export const marshalListVisualizationsForQueryResponseSchema: z.ZodType = z
  .object({
    results: z.array(z.lazy(() => marshalVisualizationSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    results: d.results,
    next_page_token: d.nextPageToken,
  }));

export const marshalMultiValuesOptionsSchema: z.ZodType = z
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

export const marshalNumericValueSchema: z.ZodType = z
  .object({
    value: z.number().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalQuerySchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    ownerUserName: z.string().optional(),
    warehouseId: z.string().optional(),
    queryText: z.string().optional(),
    runAsMode: z.enum(RunAsMode).optional(),
    lifecycleState: z.enum(LifecycleState).optional(),
    lastModifierUserName: z.string().optional(),
    parentPath: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    updateTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    parameters: z.array(z.lazy(() => marshalQueryParameterSchema)).optional(),
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

export const marshalQueryBackedValueSchema: z.ZodType = z
  .object({
    values: z.array(z.string()).optional(),
    queryId: z.string().optional(),
    multiValuesOptions: z.lazy(() => marshalMultiValuesOptionsSchema).optional(),
  })
  .transform(d => ({
    values: d.values,
    query_id: d.queryId,
    multi_values_options: d.multiValuesOptions,
  }));

export const marshalQueryParameterSchema: z.ZodType = z
  .object({
    title: z.string().optional(),
    name: z.string().optional(),
    textValue: z.lazy(() => marshalTextValueSchema).optional(),
    numericValue: z.lazy(() => marshalNumericValueSchema).optional(),
    enumValue: z.lazy(() => marshalEnumValueSchema).optional(),
    dateValue: z.lazy(() => marshalDateValueSchema).optional(),
    dateRangeValue: z.lazy(() => marshalDateRangeValueSchema).optional(),
    queryBackedValue: z.lazy(() => marshalQueryBackedValueSchema).optional(),
  })
  .transform(d => ({
    title: d.title,
    name: d.name,
    text_value: d.textValue,
    numeric_value: d.numericValue,
    enum_value: d.enumValue,
    date_value: d.dateValue,
    date_range_value: d.dateRangeValue,
    query_backed_value: d.queryBackedValue,
  }));

export const marshalTextValueSchema: z.ZodType = z
  .object({
    value: z.string().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalTrashQueryRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalUpdateQueryRequestSchema: z.ZodType = z
  .object({
    query: z.lazy(() => marshalUpdateQueryRequestQuerySchema).optional(),
    updateMask: z.any().transform((d: FieldMask<FieldPaths<UpdateQueryRequestQuery>>) => d.paths.join(',')).optional(),
    id: z.string().optional(),
    autoResolveDisplayName: z.boolean().optional(),
  })
  .transform(d => ({
    query: d.query,
    update_mask: d.updateMask,
    id: d.id,
    auto_resolve_display_name: d.autoResolveDisplayName,
  }));

export const marshalUpdateQueryRequestQuerySchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    ownerUserName: z.string().optional(),
    warehouseId: z.string().optional(),
    queryText: z.string().optional(),
    runAsMode: z.enum(RunAsMode).optional(),
    lifecycleState: z.enum(LifecycleState).optional(),
    lastModifierUserName: z.string().optional(),
    parentPath: z.string().optional(),
    tags: z.array(z.string()).optional(),
    createTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    updateTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    parameters: z.array(z.lazy(() => marshalQueryParameterSchema)).optional(),
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

export const marshalVisualizationSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    displayName: z.string().optional(),
    type: z.string().optional(),
    createTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    updateTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    serializedQueryPlan: z.string().optional(),
    serializedOptions: z.string().optional(),
    queryId: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    display_name: d.displayName,
    type: d.type,
    create_time: d.createTime,
    update_time: d.updateTime,
    serialized_query_plan: d.serializedQueryPlan,
    serialized_options: d.serializedOptions,
    query_id: d.queryId,
  }));
