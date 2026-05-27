// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum UsageDashboardMajorVersion {
  USAGE_DASHBOARD_MAJOR_VERSION_UNSPECIFIED = 'USAGE_DASHBOARD_MAJOR_VERSION_UNSPECIFIED',
  USAGE_DASHBOARD_MAJOR_VERSION_1 = 'USAGE_DASHBOARD_MAJOR_VERSION_1',
  USAGE_DASHBOARD_MAJOR_VERSION_2 = 'USAGE_DASHBOARD_MAJOR_VERSION_2',
}

export enum UsageDashboardType {
  USAGE_DASHBOARD_TYPE_UNSPECIFIED = 'USAGE_DASHBOARD_TYPE_UNSPECIFIED',
  USAGE_DASHBOARD_TYPE_WORKSPACE = 'USAGE_DASHBOARD_TYPE_WORKSPACE',
  USAGE_DASHBOARD_TYPE_GLOBAL = 'USAGE_DASHBOARD_TYPE_GLOBAL',
}

export interface CreateBillingUsageDashboardRequest {
  /** The workspace ID of the workspace in which the usage dashboard is created. */
  workspaceId?: bigint | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** Workspace level usage dashboard shows usage data for the specified workspace ID. Global level usage dashboard shows usage data for all workspaces in the account. */
  dashboardType?: UsageDashboardType | undefined;
  /** The major version of the usage dashboard template to use. Defaults to VERSION_1. */
  majorVersion?: UsageDashboardMajorVersion | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateBillingUsageDashboardRequest_Response {
  /** The unique id of the usage dashboard. */
  dashboardId?: string | undefined;
}

export interface GetBillingUsageDashboardRequest {
  /** The workspace ID of the workspace in which the usage dashboard is created. */
  workspaceId?: bigint | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** Workspace level usage dashboard shows usage data for the specified workspace ID. Global level usage dashboard shows usage data for all workspaces in the account. */
  dashboardType?: UsageDashboardType | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetBillingUsageDashboardRequest_Response {
  /** The unique id of the usage dashboard. */
  dashboardId?: string | undefined;
  /** The URL of the usage dashboard. */
  dashboardUrl?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateBillingUsageDashboardRequest_ResponseSchema: z.ZodType<CreateBillingUsageDashboardRequest_Response> =
  z
    .object({
      dashboard_id: z.string().optional(),
    })
    .transform(d => ({
      dashboardId: d.dashboard_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetBillingUsageDashboardRequest_ResponseSchema: z.ZodType<GetBillingUsageDashboardRequest_Response> =
  z
    .object({
      dashboard_id: z.string().optional(),
      dashboard_url: z.string().optional(),
    })
    .transform(d => ({
      dashboardId: d.dashboard_id,
      dashboardUrl: d.dashboard_url,
    }));

export const marshalCreateBillingUsageDashboardRequestSchema: z.ZodType = z
  .object({
    workspaceId: z.bigint().optional(),
    accountId: z.string().optional(),
    dashboardType: z.enum(UsageDashboardType).optional(),
    majorVersion: z.enum(UsageDashboardMajorVersion).optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    account_id: d.accountId,
    dashboard_type: d.dashboardType,
    major_version: d.majorVersion,
  }));
