// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** States of Custom LLM optimization lifecycle. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const State = {
  STATE_UNSPECIFIED: '',
  CREATED: 'CREATED',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
} as const;
export type State = (typeof State)[keyof typeof State] | (string & {});

export interface CancelCustomLlmOptimizationRunRequest {
  id?: string | undefined;
}

export interface CreateCustomLlmRequest {
  /** Name of the custom LLM. Only alphanumeric characters and dashes allowed. */
  name?: string | undefined;
  /** Instructions for the custom LLM to follow */
  instructions?: string | undefined;
  /**
   * Datasets used for training and evaluating the model, not for inference.
   * Currently, only 1 dataset is accepted.
   */
  datasets?: Dataset[] | undefined;
  /** Guidelines for the custom LLM to adhere to */
  guidelines?: string[] | undefined;
  /**
   * This will soon be deprecated!!
   * Optional: UC path for agent artifacts. If you are using a dataset that you only have read permissions,
   * please provide a destination path where you have write permissions. Please provide this in catalog.schema format.
   */
  agentArtifactPath?: string | undefined;
}

export interface CustomLlm {
  id?: string | undefined;
  /** Name of the custom LLM */
  name?: string | undefined;
  /** Name of the endpoint that will be used to serve the custom LLM */
  endpointName?: string | undefined;
  /** Instructions for the custom LLM to follow */
  instructions?: string | undefined;
  /** Datasets used for training and evaluating the model, not for inference */
  datasets?: Dataset[] | undefined;
  /** Guidelines for the custom LLM to adhere to */
  guidelines?: string[] | undefined;
  /** If optimization is kicked off, tracks the state of the custom LLM */
  optimizationState?: State | undefined;
  /** Creator of the custom LLM */
  creator?: string | undefined;
  /** Creation timestamp of the custom LLM */
  creationTime?: Temporal.Instant | undefined;
  agentArtifactPath?: string | undefined;
}

export interface Dataset {
  table?: Table | undefined;
}

export interface DeleteCustomLlmRequest {
  /** The id of the custom llm */
  id?: string | undefined;
}

export interface GetCustomLlmRequest {
  /** The id of the custom llm */
  id?: string | undefined;
}

export interface StartCustomLlmOptimizationRunRequest {
  /** The Id of the tile. */
  id?: string | undefined;
}

export interface Table {
  /** Full UC table path in catalog.schema.table_name format */
  tablePath?: string | undefined;
  /** Name of the request column */
  requestCol?: string | undefined;
  /** Optional: Name of the response column if the data is labeled */
  responseCol?: string | undefined;
}

export interface UpdateCustomLlmRequest {
  /** The id of the custom llm */
  id?: string | undefined;
  /** The CustomLlm containing the fields which should be updated. */
  customLlm?: CustomLlm | undefined;
  /** The list of the CustomLlm fields to update. These should correspond to the values (or lack thereof) present in `custom_llm`. */
  updateMask?: FieldMask<CustomLlm> | undefined;
}

export const unmarshalCustomLlmSchema: z.ZodType<CustomLlm> = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    endpoint_name: z.string().optional(),
    instructions: z.string().optional(),
    datasets: z.array(z.lazy(() => unmarshalDatasetSchema)).optional(),
    guidelines: z.array(z.string()).optional(),
    optimization_state: z.string().optional(),
    creator: z.string().optional(),
    creation_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    agent_artifact_path: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    endpointName: d.endpoint_name,
    instructions: d.instructions,
    datasets: d.datasets,
    guidelines: d.guidelines,
    optimizationState: d.optimization_state,
    creator: d.creator,
    creationTime: d.creation_time,
    agentArtifactPath: d.agent_artifact_path,
  }));

export const unmarshalDatasetSchema: z.ZodType<Dataset> = z
  .object({
    table: z.lazy(() => unmarshalTableSchema).optional(),
  })
  .transform(d => ({
    table: d.table,
  }));

export const unmarshalTableSchema: z.ZodType<Table> = z
  .object({
    table_path: z.string().optional(),
    request_col: z.string().optional(),
    response_col: z.string().optional(),
  })
  .transform(d => ({
    tablePath: d.table_path,
    requestCol: d.request_col,
    responseCol: d.response_col,
  }));

export const marshalCancelCustomLlmOptimizationRunRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalCreateCustomLlmRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    instructions: z.string().optional(),
    datasets: z.array(z.lazy(() => marshalDatasetSchema)).optional(),
    guidelines: z.array(z.string()).optional(),
    agentArtifactPath: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    instructions: d.instructions,
    datasets: d.datasets,
    guidelines: d.guidelines,
    agent_artifact_path: d.agentArtifactPath,
  }));

export const marshalCustomLlmSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    endpointName: z.string().optional(),
    instructions: z.string().optional(),
    datasets: z.array(z.lazy(() => marshalDatasetSchema)).optional(),
    guidelines: z.array(z.string()).optional(),
    optimizationState: z.string().optional(),
    creator: z.string().optional(),
    creationTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    agentArtifactPath: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    endpoint_name: d.endpointName,
    instructions: d.instructions,
    datasets: d.datasets,
    guidelines: d.guidelines,
    optimization_state: d.optimizationState,
    creator: d.creator,
    creation_time: d.creationTime,
    agent_artifact_path: d.agentArtifactPath,
  }));

export const marshalDatasetSchema: z.ZodType = z
  .object({
    table: z.lazy(() => marshalTableSchema).optional(),
  })
  .transform(d => ({
    table: d.table,
  }));

export const marshalStartCustomLlmOptimizationRunRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalTableSchema: z.ZodType = z
  .object({
    tablePath: z.string().optional(),
    requestCol: z.string().optional(),
    responseCol: z.string().optional(),
  })
  .transform(d => ({
    table_path: d.tablePath,
    request_col: d.requestCol,
    response_col: d.responseCol,
  }));

export const marshalUpdateCustomLlmRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    customLlm: z.lazy(() => marshalCustomLlmSchema).optional(),
    updateMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    id: d.id,
    custom_llm: d.customLlm,
    update_mask: d.updateMask,
  }));

const customLlmFieldMaskSchema: FieldMaskSchema = {
  agentArtifactPath: {wire: 'agent_artifact_path'},
  creationTime: {wire: 'creation_time'},
  creator: {wire: 'creator'},
  datasets: {wire: 'datasets'},
  endpointName: {wire: 'endpoint_name'},
  guidelines: {wire: 'guidelines'},
  id: {wire: 'id'},
  instructions: {wire: 'instructions'},
  name: {wire: 'name'},
  optimizationState: {wire: 'optimization_state'},
};

export function customLlmFieldMask(...paths: string[]): FieldMask<CustomLlm> {
  return FieldMask.build<CustomLlm>(paths, customLlmFieldMaskSchema);
}
