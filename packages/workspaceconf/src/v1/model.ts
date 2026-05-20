// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface GetWorkspaceConfRequest {
  keys?: string | undefined;
}

export interface WorkspaceConfRequest {
  key?: string | undefined;
  value?: string | undefined;
}

export const unmarshalWorkspaceConfRequestSchema: z.ZodType<WorkspaceConfRequest> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const marshalWorkspaceConfRequestSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));
