// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';


export interface GetWorkspaceConfRequest {
  keys?: string | undefined;
}

export interface WorkspaceConf {
  key?: string | undefined;
  value?: string | undefined;
}

export const unmarshalWorkspaceConfSchema: z.ZodType<WorkspaceConf> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalWorkspaceConfSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));
