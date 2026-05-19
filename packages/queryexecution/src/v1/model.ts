// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * cancel query request for published Dashboards. Since published dashboards have the option of running
 * as the publisher (as opposed to the viewer), the cancel request require additional parameters
 * (dashboardName and dashboardRevisionId) to retrieve the corresponding user context for rpc calls
 * to sql-exec-api
 */
export interface CancelPublishedQueryExecutionRequest {
  /** Example: EC0A..ChAB7WCEn_4Qo4vkLqEbXsxxEgh3Y2pbWw45WhoQXgZSQo9aS5q2ZvFcbvbx9CgA-PAEAQ */
  tokens?: string[] | undefined;
  dashboardName?: string | undefined;
  dashboardRevisionId?: string | undefined;
}

export interface CancelQueryExecutionResponse {
  status?: CancelQueryExecutionResponseStatus[] | undefined;
}

export interface CancelQueryExecutionResponseStatus {
  /**
   * The token to poll for result asynchronously
   * Example: EC0A..ChAB7WCEn_4Qo4vkLqEbXsxxEgh3Y2pbWw45WhoQXgZSQo9aS5q2ZvFcbvbx9CgA-PAEAQ
   */
  dataToken?: string | undefined;
  status?:
    | {$case: 'success'; success: Empty}
    | {$case: 'pending'; pending: Empty}
    | undefined;
}

/**
 * Represents an empty message, similar to google.protobuf.Empty, which is not available in the firm
 * right now.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Empty {}

/**
 * Execute query request for published Dashboards. Since published dashboards have the option of running
 * as the publisher, the datasets, warehouse_id are excluded from the request and instead read
 * from the source (lakeview-config) via the additional parameters (dashboardName and dashboardRevisionId)
 */
export interface ExecutePublishedDashboardQueryRequest {
  /**
   * Dashboard name and revision_id is required to retrieve PublishedDatasetDataModel which contains
   * the list of datasets, warehouse_id, and embedded_credentials
   */
  dashboardName?: string | undefined;
  dashboardRevisionId?: string | undefined;
  /** A dashboard schedule can override the warehouse used as compute for processing the published dashboard queries */
  overrideWarehouseId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExecuteQueryResponse {}

export interface PendingStatus {
  /**
   * The token to poll for result asynchronously
   * Example: EC0A..ChAB7WCEn_4Qo4vkLqEbXsxxEgh3Y2pbWw45WhoQXgZSQo9aS5q2ZvFcbvbx9CgA-PAEAQ
   */
  dataToken?: string | undefined;
}

/**
 * poll query request for published Dashboards. Since published dashboards have the option of running
 * as the publisher (as opposed to the viewer), the polling request require additional parameters
 * (dashboardName and dashboardRevisionId) to retrieve the corresponding user context for rpc calls
 * to sql-exec-api
 */
export interface PollPublishedQueryStatusRequest {
  /** Example: EC0A..ChAB7WCEn_4Qo4vkLqEbXsxxEgh3Y2pbWw45WhoQXgZSQo9aS5q2ZvFcbvbx9CgA-PAEAQ */
  tokens?: string[] | undefined;
  dashboardName?: string | undefined;
  dashboardRevisionId?: string | undefined;
}

export interface PollQueryStatusResponse {
  data?: PollQueryStatusResponseData[] | undefined;
}

export interface PollQueryStatusResponseData {
  status?: QueryResponseStatus | undefined;
}

export interface QueryResponseStatus {
  status?:
    | {$case: 'success'; success: SuccessStatus}
    | {$case: 'pending'; pending: PendingStatus}
    | {$case: 'canceled'; canceled: Empty}
    | {$case: 'closed'; closed: Empty}
    | undefined;
  /**
   * The statement id
   * in format(01eef5da-c56e-1f36-bafa-21906587d6ba)
   * The statement_id should be identical to data_token in SuccessStatus and PendingStatus.
   * This field is created for audit logging purpose to record the statement_id of all QueryResponseStatus.
   */
  statementId?: string | undefined;
}

export interface SuccessStatus {
  /**
   * The token to poll for result asynchronously
   * Example: EC0A..ChAB7WCEn_4Qo4vkLqEbXsxxEgh3Y2pbWw45WhoQXgZSQo9aS5q2ZvFcbvbx9CgA-PAEAQ
   */
  dataToken?: string | undefined;
  /** Whether the query result is truncated (either by byte limit or row limit) */
  truncated?: boolean | undefined;
}

export const unmarshalCancelQueryExecutionResponseSchema: z.ZodType<CancelQueryExecutionResponse> =
  z
    .object({
      status: z
        .array(z.lazy(() => unmarshalCancelQueryExecutionResponseStatusSchema))
        .optional(),
    })
    .transform(d => ({
      status: d.status,
    }));

export const unmarshalCancelQueryExecutionResponseStatusSchema: z.ZodType<CancelQueryExecutionResponseStatus> =
  z
    .object({
      data_token: z.string().optional(),
      success: z.lazy(() => unmarshalEmptySchema).optional(),
      pending: z.lazy(() => unmarshalEmptySchema).optional(),
    })
    .transform(d => ({
      dataToken: d.data_token,
      status:
        d.success !== undefined
          ? {$case: 'success' as const, success: d.success}
          : d.pending !== undefined
            ? {$case: 'pending' as const, pending: d.pending}
            : undefined,
    }));

export const unmarshalEmptySchema: z.ZodType<Empty> = z.object({});

export const unmarshalExecuteQueryResponseSchema: z.ZodType<ExecuteQueryResponse> =
  z.object({});

export const unmarshalPendingStatusSchema: z.ZodType<PendingStatus> = z
  .object({
    data_token: z.string().optional(),
  })
  .transform(d => ({
    dataToken: d.data_token,
  }));

export const unmarshalPollQueryStatusResponseSchema: z.ZodType<PollQueryStatusResponse> =
  z
    .object({
      data: z
        .array(z.lazy(() => unmarshalPollQueryStatusResponseDataSchema))
        .optional(),
    })
    .transform(d => ({
      data: d.data,
    }));

export const unmarshalPollQueryStatusResponseDataSchema: z.ZodType<PollQueryStatusResponseData> =
  z
    .object({
      status: z.lazy(() => unmarshalQueryResponseStatusSchema).optional(),
    })
    .transform(d => ({
      status: d.status,
    }));

export const unmarshalQueryResponseStatusSchema: z.ZodType<QueryResponseStatus> =
  z
    .object({
      success: z.lazy(() => unmarshalSuccessStatusSchema).optional(),
      pending: z.lazy(() => unmarshalPendingStatusSchema).optional(),
      canceled: z.lazy(() => unmarshalEmptySchema).optional(),
      closed: z.lazy(() => unmarshalEmptySchema).optional(),
      statement_id: z.string().optional(),
    })
    .transform(d => ({
      status:
        d.success !== undefined
          ? {$case: 'success' as const, success: d.success}
          : d.pending !== undefined
            ? {$case: 'pending' as const, pending: d.pending}
            : d.canceled !== undefined
              ? {$case: 'canceled' as const, canceled: d.canceled}
              : d.closed !== undefined
                ? {$case: 'closed' as const, closed: d.closed}
                : undefined,
      statementId: d.statement_id,
    }));

export const unmarshalSuccessStatusSchema: z.ZodType<SuccessStatus> = z
  .object({
    data_token: z.string().optional(),
    truncated: z.boolean().optional(),
  })
  .transform(d => ({
    dataToken: d.data_token,
    truncated: d.truncated,
  }));

export const marshalExecutePublishedDashboardQueryRequestSchema: z.ZodType = z
  .object({
    dashboardName: z.string().optional(),
    dashboardRevisionId: z.string().optional(),
    overrideWarehouseId: z.string().optional(),
  })
  .transform(d => ({
    dashboard_name: d.dashboardName,
    dashboard_revision_id: d.dashboardRevisionId,
    override_warehouse_id: d.overrideWarehouseId,
  }));
