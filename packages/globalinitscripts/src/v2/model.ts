// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface CreateGlobalInitScriptRequest {
  /** The name of the script */
  name: string;
  /** The Base64-encoded content of the script. */
  script: Uint8Array;
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

export interface CreateGlobalInitScriptResponse {
  /** The global init script ID. */
  scriptId?: string | undefined;
}

export interface DeleteGlobalInitScriptRequest {
  /** The ID of the global init script. */
  scriptId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteGlobalInitScriptResponse {}

export interface GetGlobalInitScriptRequest {
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
  createdAt?: bigint | undefined;
  /** The username of the user who last updated the script */
  updatedBy?: string | undefined;
  /** Time when the script was updated, represented as a Unix timestamp in milliseconds. */
  updatedAt?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListGlobalInitScriptsRequest {}

export interface ListGlobalInitScriptsResponse {
  scripts?: GlobalInitScriptDetails[] | undefined;
}

export interface UpdateGlobalInitScriptRequest {
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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UpdateGlobalInitScriptResponse {}

export const unmarshalCreateGlobalInitScriptResponseSchema: z.ZodType<CreateGlobalInitScriptResponse> =
  z
    .object({
      script_id: z.string().optional(),
    })
    .transform(d => ({
      scriptId: d.script_id,
    }));

export const unmarshalDeleteGlobalInitScriptResponseSchema: z.ZodType<DeleteGlobalInitScriptResponse> =
  z.object({});

export const unmarshalGlobalInitScriptDetailsSchema: z.ZodType<GlobalInitScriptDetails> =
  z
    .object({
      script_id: z.string().optional(),
      name: z.string().optional(),
      position: z.number().optional(),
      enabled: z.boolean().optional(),
      created_by: z.string().optional(),
      created_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      updated_by: z.string().optional(),
      updated_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
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

export const unmarshalListGlobalInitScriptsResponseSchema: z.ZodType<ListGlobalInitScriptsResponse> =
  z
    .object({
      scripts: z
        .array(z.lazy(() => unmarshalGlobalInitScriptDetailsSchema))
        .optional(),
    })
    .transform(d => ({
      scripts: d.scripts,
    }));

export const unmarshalUpdateGlobalInitScriptResponseSchema: z.ZodType<UpdateGlobalInitScriptResponse> =
  z.object({});

export const marshalCreateGlobalInitScriptRequestSchema: z.ZodType = z
  .object({
    name: z.string(),
    script: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      ),
    position: z.number().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    script: d.script,
    position: d.position,
    enabled: d.enabled,
  }));

export const marshalUpdateGlobalInitScriptRequestSchema: z.ZodType = z
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
