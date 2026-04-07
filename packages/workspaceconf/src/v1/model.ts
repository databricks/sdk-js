// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface GetWorkspaceConfRequest {
  keys?: string | undefined;
}

export interface WorkspaceConf {
  key?: string | undefined;
  value?: string | undefined;
}

export const unmarshalGetWorkspaceConfRequestSchema: z.ZodType<GetWorkspaceConfRequest> =
  z
    .object({
      keys: z.string().optional(),
    })
    .transform(d => ({
      keys: d.keys,
    }));

export const unmarshalWorkspaceConfSchema: z.ZodType<WorkspaceConf> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalGetWorkspaceConfRequestSchema: z.ZodType = z
  .object({
    keys: z.string().optional(),
  })
  .transform(d => ({
    keys: d.keys,
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
