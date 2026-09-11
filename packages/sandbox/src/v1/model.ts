// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Terminal status of a unary command execution. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ExecuteCommandStatus = {
  /** Default; never set on a response. */
  EXECUTE_COMMAND_STATUS_UNSPECIFIED: 'EXECUTE_COMMAND_STATUS_UNSPECIFIED',
  /** The command ran to completion; `exit_code` is populated. */
  EXECUTE_COMMAND_STATUS_COMPLETED: 'EXECUTE_COMMAND_STATUS_COMPLETED',
  /** The command was terminated because `timeout` elapsed. */
  EXECUTE_COMMAND_STATUS_TIMED_OUT: 'EXECUTE_COMMAND_STATUS_TIMED_OUT',
  /**
   * The command failed to start or was terminated without a normal exit;
   * `exit_code` is unset.
   */
  EXECUTE_COMMAND_STATUS_FAILED: 'EXECUTE_COMMAND_STATUS_FAILED',
} as const;
export type ExecuteCommandStatus =
  | (typeof ExecuteCommandStatus)[keyof typeof ExecuteCommandStatus]
  | (string & {});

/**
 * Lifecycle state of a Sandbox resource. STOPPING is the transient state while the
 * sandbox is being stopped -- by a Stop request or inactivity auto-termination
 * -- and settles to STOPPED once the operation completes.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SandboxState = {
  SANDBOX_STATE_UNSPECIFIED: 'SANDBOX_STATE_UNSPECIFIED',
  SANDBOX_STATE_PENDING: 'SANDBOX_STATE_PENDING',
  SANDBOX_STATE_RUNNING: 'SANDBOX_STATE_RUNNING',
  SANDBOX_STATE_STOPPED: 'SANDBOX_STATE_STOPPED',
  SANDBOX_STATE_STOPPING: 'SANDBOX_STATE_STOPPING',
} as const;
export type SandboxState =
  | (typeof SandboxState)[keyof typeof SandboxState]
  | (string & {});

export interface ComputeSpec {
  /** Idle duration after which the sandbox is automatically terminated. */
  inactivityTimeout?: Temporal.Duration | undefined;
}

/** A request to create a Sandbox. */
export interface CreateSandboxRequest {
  /** The sandbox to create. */
  sandbox?: Sandbox | undefined;
  /** Client-supplied ID that becomes the final path segment of the resource name. */
  sandboxId?: string | undefined;
}

/** A request to delete a Sandbox. */
export interface DeleteSandboxRequest {
  name?: string | undefined;
}

/** Request to run a command in the given sandbox and wait for it to finish. */
export interface ExecuteCommandSyncRequest {
  /**
   * Resource name of the sandbox to run the command in, in the form
   * `sandboxes/{sandbox_id}`. Bound from the URL path.
   */
  name?: string | undefined;
  /** Executable or command to run (e.g. `/bin/echo`, `python3`). */
  cmd?: string | undefined;
  /** Arguments passed to `cmd`. */
  args?: string[] | undefined;
  /**
   * Extra environment variables for the command's process, merged over the
   * sandbox's default environment.
   */
  envs?: Record<string, string> | undefined;
  /**
   * Maximum time to wait for the command to finish. When it elapses the
   * command is terminated and the response carries status `TIMED_OUT`. The
   * server applies a default when unset and clamps to an upper bound; negative
   * or otherwise invalid durations are rejected with `INVALID_ARGUMENT`.
   */
  executionTimeout?: Temporal.Duration | undefined;
}

/**
 * Result of a completed unary command execution: captured output, exit code,
 * and terminal status.
 */
export interface ExecuteCommandSyncResponse {
  /**
   * Process exit code. Unset when the process was terminated by a signal
   * (e.g. on `TIMED_OUT`) or never started (`FAILED`) rather than exiting
   * normally.
   */
  exitCode?: number | undefined;
  /**
   * Terminal status of the command execution. Always set on a successful
   * response; never `EXECUTE_COMMAND_STATUS_UNSPECIFIED`.
   */
  status?: ExecuteCommandStatus | undefined;
  /**
   * Captured standard output as UTF-8 text. Invalid UTF-8 bytes are replaced
   * with the Unicode replacement character (U+FFFD).
   */
  stdout?: string | undefined;
  /** Captured standard error, with the same UTF-8 semantics as `stdout`. */
  stderr?: string | undefined;
  /**
   * Daemon-generated identifier for this command execution, for correlation
   * (for example in `ListCommands`).
   */
  commandId?: string | undefined;
  /**
   * True when `stdout` / `stderr` were truncated because the captured output
   * exceeded the server's per-response size cap. The dropped output is not
   * included in this response and is not recoverable through this unary API.
   */
  truncated?: boolean | undefined;
}

/** A request to retrieve a Sandbox. */
export interface GetSandboxRequest {
  name?: string | undefined;
}

/** A request to list Sandboxes. */
export interface ListSandboxesRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

/** A list of Sandboxes. */
export interface ListSandboxesResponse {
  sandboxes?: Sandbox[] | undefined;
  nextPageToken?: string | undefined;
}

/** A Sandbox resource representing an execution environment. */
export interface Sandbox {
  /** The desired configuration of the sandbox, supplied by the caller at creation time. */
  spec?: SandboxSpec | undefined;
  /** The observed runtime state of the sandbox, populated by the server. */
  status?: SandboxStatus | undefined;
  /**
   * The sandbox resource name, in the form `sandboxes/{sandbox_id}`. Derived from
   * `sandbox_id`; any value supplied in a create or update request body is ignored.
   */
  name?: string | undefined;
  /** Output only. The creation time of the sandbox. */
  createTime?: Temporal.Instant | undefined;
  /** Output only. The last update time of the sandbox metadata and spec. */
  updateTime?: Temporal.Instant | undefined;
  /** Human-readable display label for the sandbox. At most 256 characters. */
  displayName?: string | undefined;
}

export interface SandboxSpec {
  /** Compute configuration (size, inactivity timeout) requested for the sandbox. */
  compute?: ComputeSpec | undefined;
}

export interface SandboxStatus {
  /** Lifecycle state of the sandbox. */
  state?: SandboxState | undefined;
}

/** A request to start a Sandbox. */
export interface StartSandboxRequest {
  /** Resource name of the sandbox to start, in the form `sandboxes/{sandbox_id}`. */
  name?: string | undefined;
}

/** A request to stop a Sandbox. */
export interface StopSandboxRequest {
  /** Resource name of the sandbox to stop, in the form `sandboxes/{sandbox_id}`. */
  name?: string | undefined;
}

/** A request to update mutable fields on a Sandbox. */
export interface UpdateSandboxRequest {
  /** Resource name of the sandbox to update, in the form `sandboxes/{sandbox_id}`. */
  name?: string | undefined;
  /**
   * The Sandbox resource carrying new field values. Only fields named in
   * `update_mask` are read; unmasked fields are ignored.
   */
  sandbox?: Sandbox | undefined;
  /**
   * Field paths to update. Must be a non-empty subset of:
   * - display_name
   * - spec.compute.inactivity_timeout
   * Any other path returns INVALID_PARAMETER_VALUE.
   */
  updateMask?: FieldMask<Sandbox> | undefined;
}

export const unmarshalComputeSpecSchema: z.ZodType<ComputeSpec> = z
  .object({
    inactivity_timeout: z
      .string()
      .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
      .optional(),
  })
  .transform(d => ({
    inactivityTimeout: d.inactivity_timeout,
  }));

export const unmarshalExecuteCommandSyncResponseSchema: z.ZodType<ExecuteCommandSyncResponse> =
  z
    .object({
      exit_code: z.number().optional(),
      status: z.string().optional(),
      stdout: z.string().optional(),
      stderr: z.string().optional(),
      command_id: z.string().optional(),
      truncated: z.boolean().optional(),
    })
    .transform(d => ({
      exitCode: d.exit_code,
      status: d.status,
      stdout: d.stdout,
      stderr: d.stderr,
      commandId: d.command_id,
      truncated: d.truncated,
    }));

export const unmarshalListSandboxesResponseSchema: z.ZodType<ListSandboxesResponse> =
  z
    .object({
      sandboxes: z.array(z.lazy(() => unmarshalSandboxSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      sandboxes: d.sandboxes,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSandboxSchema: z.ZodType<Sandbox> = z
  .object({
    spec: z.lazy(() => unmarshalSandboxSpecSchema).optional(),
    status: z.lazy(() => unmarshalSandboxStatusSchema).optional(),
    name: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    display_name: z.string().optional(),
  })
  .transform(d => ({
    spec: d.spec,
    status: d.status,
    name: d.name,
    createTime: d.create_time,
    updateTime: d.update_time,
    displayName: d.display_name,
  }));

export const unmarshalSandboxSpecSchema: z.ZodType<SandboxSpec> = z
  .object({
    compute: z.lazy(() => unmarshalComputeSpecSchema).optional(),
  })
  .transform(d => ({
    compute: d.compute,
  }));

export const unmarshalSandboxStatusSchema: z.ZodType<SandboxStatus> = z
  .object({
    state: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const marshalComputeSpecSchema: z.ZodType = z
  .object({
    inactivityTimeout: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    inactivity_timeout: d.inactivityTimeout,
  }));

export const marshalExecuteCommandSyncRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    cmd: z.string().optional(),
    args: z.array(z.string()).optional(),
    envs: z.record(z.string(), z.string()).optional(),
    executionTimeout: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    cmd: d.cmd,
    args: d.args,
    envs: d.envs,
    execution_timeout: d.executionTimeout,
  }));

export const marshalSandboxSchema: z.ZodType = z
  .object({
    spec: z.lazy(() => marshalSandboxSpecSchema).optional(),
    status: z.lazy(() => marshalSandboxStatusSchema).optional(),
    name: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    displayName: z.string().optional(),
  })
  .transform(d => ({
    spec: d.spec,
    status: d.status,
    name: d.name,
    create_time: d.createTime,
    update_time: d.updateTime,
    display_name: d.displayName,
  }));

export const marshalSandboxSpecSchema: z.ZodType = z
  .object({
    compute: z.lazy(() => marshalComputeSpecSchema).optional(),
  })
  .transform(d => ({
    compute: d.compute,
  }));

export const marshalSandboxStatusSchema: z.ZodType = z
  .object({
    state: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
  }));

export const marshalStartSandboxRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalStopSandboxRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

const computeSpecFieldMaskSchema: FieldMaskSchema = {
  inactivityTimeout: {wire: 'inactivity_timeout'},
};

const sandboxFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  displayName: {wire: 'display_name'},
  name: {wire: 'name'},
  spec: {wire: 'spec', children: () => sandboxSpecFieldMaskSchema},
  status: {wire: 'status', children: () => sandboxStatusFieldMaskSchema},
  updateTime: {wire: 'update_time'},
};

export function sandboxFieldMask(...paths: string[]): FieldMask<Sandbox> {
  return FieldMask.build<Sandbox>(paths, sandboxFieldMaskSchema);
}

const sandboxSpecFieldMaskSchema: FieldMaskSchema = {
  compute: {wire: 'compute', children: () => computeSpecFieldMaskSchema},
};

const sandboxStatusFieldMaskSchema: FieldMaskSchema = {
  state: {wire: 'state'},
};
