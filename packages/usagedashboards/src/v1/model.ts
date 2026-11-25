// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const UsageDashboardMajorVersion = {
  USAGE_DASHBOARD_MAJOR_VERSION_UNSPECIFIED:
    'USAGE_DASHBOARD_MAJOR_VERSION_UNSPECIFIED',
  USAGE_DASHBOARD_MAJOR_VERSION_1: 'USAGE_DASHBOARD_MAJOR_VERSION_1',
  USAGE_DASHBOARD_MAJOR_VERSION_2: 'USAGE_DASHBOARD_MAJOR_VERSION_2',
} as const;
export type UsageDashboardMajorVersion =
  | (typeof UsageDashboardMajorVersion)[keyof typeof UsageDashboardMajorVersion]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const UsageDashboardType = {
  USAGE_DASHBOARD_TYPE_UNSPECIFIED: 'USAGE_DASHBOARD_TYPE_UNSPECIFIED',
  USAGE_DASHBOARD_TYPE_WORKSPACE: 'USAGE_DASHBOARD_TYPE_WORKSPACE',
  USAGE_DASHBOARD_TYPE_GLOBAL: 'USAGE_DASHBOARD_TYPE_GLOBAL',
} as const;
export type UsageDashboardType =
  | (typeof UsageDashboardType)[keyof typeof UsageDashboardType]
  | (string & {});

export interface CreateBillingUsageDashboardRequest {
  /**
   * The ID of the workspace to import the usage dashboard into. The workspace must be running, belong
   * to the account, and not be a disaster recovery secondary.
   */
  workspaceId?: bigint | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /**
   * Workspace level usage dashboard shows usage data for the specified workspace ID. Global level usage dashboard shows usage data for all workspaces in the account.
   * The request fails if the type is not set.
   */
  dashboardType?: UsageDashboardType | undefined;
  /**
   * The major version of the usage dashboard template to import. Version 2 adds cost forecasting and
   * object-level cost drill-down.
   */
  majorVersion?: UsageDashboardMajorVersion | undefined;
}

export interface CreateBillingUsageDashboardResponse {
  /** The ID of the AI/BI dashboard that was created. */
  dashboardId?: string | undefined;
}

export interface GetBillingUsageDashboardRequest {
  /**
   * The ID of the workspace that contains the usage dashboard. If omitted, the most recently created
   * dashboard of the given type across all workspaces in the account is returned.
   */
  workspaceId?: bigint | undefined;
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /**
   * Workspace level usage dashboard shows usage data for the specified workspace ID. Global level usage dashboard shows usage data for all workspaces in the account.
   * The request fails if the type is not set.
   */
  dashboardType?: UsageDashboardType | undefined;
}

export interface GetBillingUsageDashboardResponse {
  /** The ID of the AI/BI dashboard. The ID is empty if no matching dashboard is found. */
  dashboardId?: string | undefined;
  /** The URL of the dashboard in its workspace. The URL is empty if no matching dashboard is found. */
  dashboardUrl?: string | undefined;
}

export const unmarshalCreateBillingUsageDashboardResponseSchema: z.ZodType<CreateBillingUsageDashboardResponse> =
  z
    .object({
      dashboard_id: z.string().optional(),
    })
    .transform(d => ({
      dashboardId: d.dashboard_id,
    }));

export const unmarshalGetBillingUsageDashboardResponseSchema: z.ZodType<GetBillingUsageDashboardResponse> =
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
    dashboardType: z.string().optional(),
    majorVersion: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    account_id: d.accountId,
    dashboard_type: d.dashboardType,
    major_version: d.majorVersion,
  }));

export const marshalCreateBillingUsageDashboardResponseSchema: z.ZodType = z
  .object({
    dashboardId: z.string().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
  }));

export const marshalGetBillingUsageDashboardRequestSchema: z.ZodType = z
  .object({
    workspaceId: z.bigint().optional(),
    accountId: z.string().optional(),
    dashboardType: z.string().optional(),
  })
  .transform(d => ({
    workspace_id: d.workspaceId,
    account_id: d.accountId,
    dashboard_type: d.dashboardType,
  }));

export const marshalGetBillingUsageDashboardResponseSchema: z.ZodType = z
  .object({
    dashboardId: z.string().optional(),
    dashboardUrl: z.string().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
    dashboard_url: d.dashboardUrl,
  }));
