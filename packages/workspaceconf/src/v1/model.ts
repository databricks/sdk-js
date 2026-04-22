// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
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

const getWorkspaceConfRequestFieldMaskSchema: FieldMaskSchema = {
  keys: {wire: 'keys'},
};

export function getWorkspaceConfRequestFieldMask(
  ...paths: string[]
): FieldMask<GetWorkspaceConfRequest> {
  return FieldMask.build<GetWorkspaceConfRequest>(
    paths,
    getWorkspaceConfRequestFieldMaskSchema
  );
}

const workspaceConfFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

export function workspaceConfFieldMask(
  ...paths: string[]
): FieldMask<WorkspaceConf> {
  return FieldMask.build<WorkspaceConf>(paths, workspaceConfFieldMaskSchema);
}
