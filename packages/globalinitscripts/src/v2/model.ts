// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export interface CreateGlobalInitScript {
  /** The name of the script */
  name?: string | undefined;
  /** The Base64-encoded content of the script. */
  script?: Uint8Array | undefined;
  /**
   * The position of a global init script, where 0 represents the first script to run, 1 is the second script to run, in ascending order.
   *
   * If you omit the numeric position for a new global init script, it defaults to last position. It will run after all current scripts.
   * Setting any value greater than the position of the last script is equivalent to the last position. Example: Take three existing scripts with positions 0, 1, and 2. Any position of (3) or greater puts the script in the last position.
   * If an explicit position value conflicts with an existing script value, your request succeeds, but the original script at that position and all later scripts have their positions incremented by 1.
   */
  position?: number | undefined;
  /** Specifies whether the script is enabled. The script runs only if enabled. */
  enabled?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateGlobalInitScript_Response {
  /** The global init script ID. */
  scriptId?: string | undefined;
}

export interface DeleteGlobalInitScript {
  /** The ID of the global init script. */
  scriptId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteGlobalInitScript_Response {}

export interface GetGlobalInitScript {
  /** The ID of the global init script. */
  scriptId?: string | undefined;
}

export interface GlobalInitScriptDetails {
  /** The global init script ID. */
  scriptId?: string | undefined;
  /** The name of the script */
  name?: string | undefined;
  /** The position of a script, where 0 represents the first script to run, 1 is the second script to run, in ascending order. */
  position?: number | undefined;
  /** Specifies whether the script is enabled. The script runs only if enabled. */
  enabled?: boolean | undefined;
  /** The username of the user who created the script. */
  createdBy?: string | undefined;
  /** Time when the script was created, represented as a Unix timestamp in milliseconds. */
  createdAt?: number | undefined;
  /** The username of the user who last updated the script */
  updatedBy?: string | undefined;
  /** Time when the script was updated, represented as a Unix timestamp in milliseconds. */
  updatedAt?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListGlobalInitScripts {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListGlobalInitScripts_Response {
  scripts?: GlobalInitScriptDetails[] | undefined;
}

export interface UpdateGlobalInitScript {
  /** The ID of the global init script. */
  scriptId?: string | undefined;
  /** The name of the script */
  name?: string | undefined;
  /** The Base64-encoded content of the script. */
  script?: Uint8Array | undefined;
  /**
   * The position of a script, where 0 represents the first script to run,
   * 1 is the second script to run, in ascending order.
   * To move the script to run first, set its position to 0.
   *
   * To move the script to the end, set its position to any value
   * greater or equal to the position of the last script.
   * Example, three existing scripts with positions 0, 1, and 2.
   * Any position value of 2 or greater puts the script in the last position (2).
   *
   * If an explicit position value conflicts with an existing script, your request succeeds,
   * but the original script at that position and all later scripts have their positions
   * incremented by 1.
   */
  position?: number | undefined;
  /** Specifies whether the script is enabled. The script runs only if enabled. */
  enabled?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface UpdateGlobalInitScript_Response {}

export const unmarshalCreateGlobalInitScriptSchema: z.ZodType<CreateGlobalInitScript> =
  z
    .object({
      name: z.string().optional(),
      script: z
        .string()
        .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
        .optional(),
      position: z.number().optional(),
      enabled: z.boolean().optional(),
    })
    .transform(d => ({
      name: d.name,
      script: d.script,
      position: d.position,
      enabled: d.enabled,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateGlobalInitScript_ResponseSchema: z.ZodType<CreateGlobalInitScript_Response> =
  z
    .object({
      script_id: z.string().optional(),
    })
    .transform(d => ({
      scriptId: d.script_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteGlobalInitScript_ResponseSchema: z.ZodType<DeleteGlobalInitScript_Response> =
  z.object({});

export const unmarshalGlobalInitScriptDetailsSchema: z.ZodType<GlobalInitScriptDetails> =
  z
    .object({
      script_id: z.string().optional(),
      name: z.string().optional(),
      position: z.number().optional(),
      enabled: z.boolean().optional(),
      created_by: z.string().optional(),
      created_at: z.number().optional(),
      updated_by: z.string().optional(),
      updated_at: z.number().optional(),
    })
    .transform(d => ({
      scriptId: d.script_id,
      name: d.name,
      position: d.position,
      enabled: d.enabled,
      createdBy: d.created_by,
      createdAt: d.created_at,
      updatedBy: d.updated_by,
      updatedAt: d.updated_at,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListGlobalInitScripts_ResponseSchema: z.ZodType<ListGlobalInitScripts_Response> =
  z
    .object({
      scripts: z
        .array(z.lazy(() => unmarshalGlobalInitScriptDetailsSchema))
        .optional(),
    })
    .transform(d => ({
      scripts: d.scripts,
    }));

export const unmarshalUpdateGlobalInitScriptSchema: z.ZodType<UpdateGlobalInitScript> =
  z
    .object({
      script_id: z.string().optional(),
      name: z.string().optional(),
      script: z
        .string()
        .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
        .optional(),
      position: z.number().optional(),
      enabled: z.boolean().optional(),
    })
    .transform(d => ({
      scriptId: d.script_id,
      name: d.name,
      script: d.script,
      position: d.position,
      enabled: d.enabled,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateGlobalInitScript_ResponseSchema: z.ZodType<UpdateGlobalInitScript_Response> =
  z.object({});

export const marshalCreateGlobalInitScriptSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    script: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
    position: z.number().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    script: d.script,
    position: d.position,
    enabled: d.enabled,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCreateGlobalInitScript_ResponseSchema: z.ZodType = z
  .object({
    scriptId: z.string().optional(),
  })
  .transform(d => ({
    script_id: d.scriptId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteGlobalInitScript_ResponseSchema: z.ZodType = z.object(
  {}
);

export const marshalGlobalInitScriptDetailsSchema: z.ZodType = z
  .object({
    scriptId: z.string().optional(),
    name: z.string().optional(),
    position: z.number().optional(),
    enabled: z.boolean().optional(),
    createdBy: z.string().optional(),
    createdAt: z.number().optional(),
    updatedBy: z.string().optional(),
    updatedAt: z.number().optional(),
  })
  .transform(d => ({
    script_id: d.scriptId,
    name: d.name,
    position: d.position,
    enabled: d.enabled,
    created_by: d.createdBy,
    created_at: d.createdAt,
    updated_by: d.updatedBy,
    updated_at: d.updatedAt,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListGlobalInitScripts_ResponseSchema: z.ZodType = z
  .object({
    scripts: z
      .array(z.lazy(() => marshalGlobalInitScriptDetailsSchema))
      .optional(),
  })
  .transform(d => ({
    scripts: d.scripts,
  }));

export const marshalUpdateGlobalInitScriptSchema: z.ZodType = z
  .object({
    scriptId: z.string().optional(),
    name: z.string().optional(),
    script: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
    position: z.number().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    script_id: d.scriptId,
    name: d.name,
    script: d.script,
    position: d.position,
    enabled: d.enabled,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateGlobalInitScript_ResponseSchema: z.ZodType = z.object(
  {}
);

const createGlobalInitScriptFieldMaskSchema: FieldMaskSchema = {
  enabled: {wire: 'enabled'},
  name: {wire: 'name'},
  position: {wire: 'position'},
  script: {wire: 'script'},
};

export function createGlobalInitScriptFieldMask(
  ...paths: string[]
): FieldMask<CreateGlobalInitScript> {
  return FieldMask.build<CreateGlobalInitScript>(
    paths,
    createGlobalInitScriptFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const createGlobalInitScript_ResponseFieldMaskSchema: FieldMaskSchema = {
  scriptId: {wire: 'script_id'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function createGlobalInitScript_ResponseFieldMask(
  ...paths: string[]
): FieldMask<CreateGlobalInitScript_Response> {
  return FieldMask.build<CreateGlobalInitScript_Response>(
    paths,
    createGlobalInitScript_ResponseFieldMaskSchema
  );
}

const deleteGlobalInitScriptFieldMaskSchema: FieldMaskSchema = {
  scriptId: {wire: 'script_id'},
};

export function deleteGlobalInitScriptFieldMask(
  ...paths: string[]
): FieldMask<DeleteGlobalInitScript> {
  return FieldMask.build<DeleteGlobalInitScript>(
    paths,
    deleteGlobalInitScriptFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const deleteGlobalInitScript_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function deleteGlobalInitScript_ResponseFieldMask(
  ...paths: string[]
): FieldMask<DeleteGlobalInitScript_Response> {
  return FieldMask.build<DeleteGlobalInitScript_Response>(
    paths,
    deleteGlobalInitScript_ResponseFieldMaskSchema
  );
}

const getGlobalInitScriptFieldMaskSchema: FieldMaskSchema = {
  scriptId: {wire: 'script_id'},
};

export function getGlobalInitScriptFieldMask(
  ...paths: string[]
): FieldMask<GetGlobalInitScript> {
  return FieldMask.build<GetGlobalInitScript>(
    paths,
    getGlobalInitScriptFieldMaskSchema
  );
}

const globalInitScriptDetailsFieldMaskSchema: FieldMaskSchema = {
  createdAt: {wire: 'created_at'},
  createdBy: {wire: 'created_by'},
  enabled: {wire: 'enabled'},
  name: {wire: 'name'},
  position: {wire: 'position'},
  scriptId: {wire: 'script_id'},
  updatedAt: {wire: 'updated_at'},
  updatedBy: {wire: 'updated_by'},
};

export function globalInitScriptDetailsFieldMask(
  ...paths: string[]
): FieldMask<GlobalInitScriptDetails> {
  return FieldMask.build<GlobalInitScriptDetails>(
    paths,
    globalInitScriptDetailsFieldMaskSchema
  );
}

const listGlobalInitScriptsFieldMaskSchema: FieldMaskSchema = {};

export function listGlobalInitScriptsFieldMask(
  ...paths: string[]
): FieldMask<ListGlobalInitScripts> {
  return FieldMask.build<ListGlobalInitScripts>(
    paths,
    listGlobalInitScriptsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const listGlobalInitScripts_ResponseFieldMaskSchema: FieldMaskSchema = {
  scripts: {wire: 'scripts'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function listGlobalInitScripts_ResponseFieldMask(
  ...paths: string[]
): FieldMask<ListGlobalInitScripts_Response> {
  return FieldMask.build<ListGlobalInitScripts_Response>(
    paths,
    listGlobalInitScripts_ResponseFieldMaskSchema
  );
}

const updateGlobalInitScriptFieldMaskSchema: FieldMaskSchema = {
  enabled: {wire: 'enabled'},
  name: {wire: 'name'},
  position: {wire: 'position'},
  script: {wire: 'script'},
  scriptId: {wire: 'script_id'},
};

export function updateGlobalInitScriptFieldMask(
  ...paths: string[]
): FieldMask<UpdateGlobalInitScript> {
  return FieldMask.build<UpdateGlobalInitScript>(
    paths,
    updateGlobalInitScriptFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const updateGlobalInitScript_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function updateGlobalInitScript_ResponseFieldMask(
  ...paths: string[]
): FieldMask<UpdateGlobalInitScript_Response> {
  return FieldMask.build<UpdateGlobalInitScript_Response>(
    paths,
    updateGlobalInitScript_ResponseFieldMaskSchema
  );
}
