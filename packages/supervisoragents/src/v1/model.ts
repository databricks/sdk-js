// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** <Databricks> app. Supported app: custom mcp, custom agent. */
export interface App {
  /** App name */
  name?: string | undefined;
}

/** Create an example. */
export interface CreateExampleRequest {
  /**
   * Parent resource where this example will be created.
   * Format: supervisor-agents/{supervisor_agent_id}
   */
  parent?: string | undefined;
  /** The example to create under the parent Supervisor Agent. */
  example?: Example | undefined;
}

export interface CreateSupervisorAgentRequest {
  /** The Supervisor Agent to create. */
  supervisorAgent?: SupervisorAgent | undefined;
}

export interface CreateToolRequest {
  /**
   * Parent resource where this tool will be created.
   * Format: supervisor-agents/{supervisor_agent_id}
   */
  parent?: string | undefined;
  tool?: Tool | undefined;
  /**
   * The ID to use for the tool, which will become the final component of
   * the tool's resource name.
   */
  toolId?: string | undefined;
}

/** Delete an example. */
export interface DeleteExampleRequest {
  /**
   * The resource name of the example to delete.
   * Format: supervisor-agents/{supervisor_agent_id}/examples/{example_id}
   */
  name?: string | undefined;
}

export interface DeleteSupervisorAgentRequest {
  /**
   * The resource name of the Supervisor Agent.
   * Format: supervisor-agents/{supervisor_agent_id}
   */
  name?: string | undefined;
}

export interface DeleteToolRequest {
  /**
   * The resource name of the Tool.
   * Format: supervisor-agents/{supervisor_agent_id}/tools/{tool_id}
   */
  name?: string | undefined;
}

/**
 * An example associated with a Supervisor Agent.
 * Contains a question and guidelines for how the agent should respond.
 */
export interface Example {
  /**
   * Full resource name:
   * supervisor-agents/{supervisor_agent_id}/examples/{example_id}
   */
  name?: string | undefined;
  /** The example question. */
  question?: string | undefined;
  /** Guidelines for answering the question. */
  guidelines?: string[] | undefined;
  /** The universally unique identifier (UUID) of the example. */
  exampleId?: string | undefined;
}

export interface GenieSpace {
  /**
   * Deprecated: use space_id instead. Still REQUIRED for backward compatibility
   * until a future API version removes it.
   */
  id?: string | undefined;
}

/** Get an example. */
export interface GetExampleRequest {
  /**
   * The resource name of the example.
   * Format: supervisor-agents/{supervisor_agent_id}/examples/{example_id}
   */
  name?: string | undefined;
}

export interface GetSupervisorAgentRequest {
  /**
   * The resource name of the Supervisor Agent.
   * Format: supervisor-agents/{supervisor_agent_id}
   */
  name?: string | undefined;
}

export interface GetToolRequest {
  /**
   * The resource name of the Tool.
   * Format: supervisor-agents/{supervisor_agent_id}/tools/{tool_id}
   */
  name?: string | undefined;
}

export interface KnowledgeAssistant {
  /** Deprecated: use knowledge_assistant_id instead. */
  servingEndpointName?: string | undefined;
  /** The ID of the knowledge assistant. */
  knowledgeAssistantId?: string | undefined;
}

/** List examples. */
export interface ListExamplesRequest {
  /**
   * Parent resource to list from.
   * Format: supervisor-agents/{supervisor_agent_id}
   */
  parent?: string | undefined;
  /**
   * The maximum number of examples to return.
   * If unspecified, at most 100 examples will be returned.
   * The maximum value is 100; values above 100 will be coerced to 100.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListExamples` call.
   * Provide this to retrieve the subsequent page.
   * If unspecified, the first page will be returned.
   */
  pageToken?: string | undefined;
}

/** A list of Supervisor Agent examples. */
export interface ListExamplesResponse {
  examples?: Example[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListSupervisorAgentsRequest {
  /**
   * The maximum number of supervisor agents to return.
   * If unspecified, at most 100 supervisor agents will be returned.
   * The maximum value is 100; values above 100 will be coerced to 100.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListSupervisorAgents` call.
   * Provide this to retrieve the subsequent page.
   * If unspecified, the first page will be returned.
   */
  pageToken?: string | undefined;
}

export interface ListSupervisorAgentsResponse {
  supervisorAgents?: SupervisorAgent[] | undefined;
  /**
   * A token that can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

export interface ListToolsRequest {
  /**
   * Parent resource to list from.
   * Format: supervisor-agents/{supervisor_agent_id}
   */
  parent?: string | undefined;
  pageSize?: number | undefined;
  pageToken?: string | undefined;
}

export interface ListToolsResponse {
  tools?: Tool[] | undefined;
  nextPageToken?: string | undefined;
}

export interface SupervisorAgent {
  /**
   * The resource name of the SupervisorAgent.
   * Format: supervisor-agents/{supervisor_agent_id}
   */
  name?: string | undefined;
  /** The display name of the Supervisor Agent, unique at workspace level. */
  displayName?: string | undefined;
  /** Description of what this agent can do (user-facing). */
  description?: string | undefined;
  /** Optional natural-language instructions for the supervisor agent. */
  instructions?: string | undefined;
  /** Deprecated: Use supervisor_agent_id instead. */
  id?: string | undefined;
  /** The universally unique identifier (UUID) of the Supervisor Agent. */
  supervisorAgentId?: string | undefined;
  /** The creator of the Supervisor Agent. */
  creator?: string | undefined;
  /** Creation timestamp. */
  createTime?: Temporal.Instant | undefined;
  /** The name of the supervisor agent's serving endpoint. */
  endpointName?: string | undefined;
  /** The MLflow experiment ID. */
  experimentId?: string | undefined;
}

export interface Tool {
  /**
   * Full resource name:
   * supervisor-agents/{supervisor_agent_id}/tools/{tool_id}
   */
  name?: string | undefined;
  /** Deprecated: Use tool_id instead. */
  id?: string | undefined;
  /** Tool type. Must be one of: "genie_space", "knowledge_assistant", "uc_function", "uc_connection", "uc_mcp", "app", "volume", "dashboard", "serving_endpoint", "table", "vector_search_index", "catalog", "schema", "supervisor_agent", "web_search", "skill". The legacy values "lakeview_dashboard" and "uc_table" are also accepted and remain equivalent to "dashboard" and "table" respectively. */
  toolType?: string | undefined;
  /** Specification for the tool type. */
  spec?:
    | {$case: 'genieSpace'; genieSpace: GenieSpace}
    | {$case: 'knowledgeAssistant'; knowledgeAssistant: KnowledgeAssistant}
    | {$case: 'ucFunction'; ucFunction: UcFunction}
    | {$case: 'app'; app: App}
    | {$case: 'volume'; volume: Volume}
    | {$case: 'ucConnection'; ucConnection: UcConnection}
    | undefined;
  /** Description of what this tool does (user-facing). */
  description?: string | undefined;
  /** User specified id of the Tool. */
  toolId?: string | undefined;
}

/** Databricks UC connection. Supported connection: external mcp server. */
export interface UcConnection {
  name?: string | undefined;
}

export interface UcFunction {
  /** Full uc function name */
  name?: string | undefined;
}

/** Update an example. */
export interface UpdateExampleRequest {
  /**
   * The resource name of the example to update.
   * Format: supervisor-agents/{supervisor_agent_id}/examples/{example_id}
   */
  name?: string | undefined;
  example?: Example | undefined;
  /**
   * Comma-delimited list of fields to update on the example.
   * Allowed values: `question`, `guidelines`.
   * Examples:
   * - `question`
   * - `question,guidelines`
   */
  updateMask?: FieldMask<Example> | undefined;
}

export interface UpdateSupervisorAgentRequest {
  /** The SupervisorAgent to update. */
  supervisorAgent?: SupervisorAgent | undefined;
  /** Field mask for fields to be updated. */
  updateMask?: FieldMask<SupervisorAgent> | undefined;
}

export interface UpdateToolRequest {
  /** The Tool to update. */
  tool?: Tool | undefined;
  /** Field mask for fields to be updated. */
  updateMask?: FieldMask<Tool> | undefined;
}

export interface Volume {
  /** Full uc volume name */
  name?: string | undefined;
}

export const unmarshalAppSchema: z.ZodType<App> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalExampleSchema: z.ZodType<Example> = z
  .object({
    name: z.string().optional(),
    question: z.string().optional(),
    guidelines: z.array(z.string()).optional(),
    example_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    question: d.question,
    guidelines: d.guidelines,
    exampleId: d.example_id,
  }));

export const unmarshalGenieSpaceSchema: z.ZodType<GenieSpace> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const unmarshalKnowledgeAssistantSchema: z.ZodType<KnowledgeAssistant> =
  z
    .object({
      serving_endpoint_name: z.string().optional(),
      knowledge_assistant_id: z.string().optional(),
    })
    .transform(d => ({
      servingEndpointName: d.serving_endpoint_name,
      knowledgeAssistantId: d.knowledge_assistant_id,
    }));

export const unmarshalListExamplesResponseSchema: z.ZodType<ListExamplesResponse> =
  z
    .object({
      examples: z.array(z.lazy(() => unmarshalExampleSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      examples: d.examples,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSupervisorAgentsResponseSchema: z.ZodType<ListSupervisorAgentsResponse> =
  z
    .object({
      supervisor_agents: z
        .array(z.lazy(() => unmarshalSupervisorAgentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      supervisorAgents: d.supervisor_agents,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListToolsResponseSchema: z.ZodType<ListToolsResponse> = z
  .object({
    tools: z.array(z.lazy(() => unmarshalToolSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    tools: d.tools,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalSupervisorAgentSchema: z.ZodType<SupervisorAgent> = z
  .object({
    name: z.string().optional(),
    display_name: z.string().optional(),
    description: z.string().optional(),
    instructions: z.string().optional(),
    id: z.string().optional(),
    supervisor_agent_id: z.string().optional(),
    creator: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    endpoint_name: z.string().optional(),
    experiment_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    displayName: d.display_name,
    description: d.description,
    instructions: d.instructions,
    id: d.id,
    supervisorAgentId: d.supervisor_agent_id,
    creator: d.creator,
    createTime: d.create_time,
    endpointName: d.endpoint_name,
    experimentId: d.experiment_id,
  }));

export const unmarshalToolSchema: z.ZodType<Tool> = z
  .object({
    name: z.string().optional(),
    id: z.string().optional(),
    tool_type: z.string().optional(),
    genie_space: z.lazy(() => unmarshalGenieSpaceSchema).optional(),
    knowledge_assistant: z
      .lazy(() => unmarshalKnowledgeAssistantSchema)
      .optional(),
    uc_function: z.lazy(() => unmarshalUcFunctionSchema).optional(),
    app: z.lazy(() => unmarshalAppSchema).optional(),
    volume: z.lazy(() => unmarshalVolumeSchema).optional(),
    uc_connection: z.lazy(() => unmarshalUcConnectionSchema).optional(),
    description: z.string().optional(),
    tool_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    id: d.id,
    toolType: d.tool_type,
    spec:
      d.genie_space !== undefined
        ? {$case: 'genieSpace' as const, genieSpace: d.genie_space}
        : d.knowledge_assistant !== undefined
          ? {
              $case: 'knowledgeAssistant' as const,
              knowledgeAssistant: d.knowledge_assistant,
            }
          : d.uc_function !== undefined
            ? {$case: 'ucFunction' as const, ucFunction: d.uc_function}
            : d.app !== undefined
              ? {$case: 'app' as const, app: d.app}
              : d.volume !== undefined
                ? {$case: 'volume' as const, volume: d.volume}
                : d.uc_connection !== undefined
                  ? {
                      $case: 'ucConnection' as const,
                      ucConnection: d.uc_connection,
                    }
                  : undefined,
    description: d.description,
    toolId: d.tool_id,
  }));

export const unmarshalUcConnectionSchema: z.ZodType<UcConnection> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalUcFunctionSchema: z.ZodType<UcFunction> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalVolumeSchema: z.ZodType<Volume> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalAppSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalExampleSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    question: z.string().optional(),
    guidelines: z.array(z.string()).optional(),
    exampleId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    question: d.question,
    guidelines: d.guidelines,
    example_id: d.exampleId,
  }));

export const marshalGenieSpaceSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const marshalKnowledgeAssistantSchema: z.ZodType = z
  .object({
    servingEndpointName: z.string().optional(),
    knowledgeAssistantId: z.string().optional(),
  })
  .transform(d => ({
    serving_endpoint_name: d.servingEndpointName,
    knowledge_assistant_id: d.knowledgeAssistantId,
  }));

export const marshalSupervisorAgentSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    instructions: z.string().optional(),
    id: z.string().optional(),
    supervisorAgentId: z.string().optional(),
    creator: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    endpointName: z.string().optional(),
    experimentId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    display_name: d.displayName,
    description: d.description,
    instructions: d.instructions,
    id: d.id,
    supervisor_agent_id: d.supervisorAgentId,
    creator: d.creator,
    create_time: d.createTime,
    endpoint_name: d.endpointName,
    experiment_id: d.experimentId,
  }));

export const marshalToolSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    id: z.string().optional(),
    toolType: z.string().optional(),
    spec: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('genieSpace'),
          genieSpace: z.lazy(() => marshalGenieSpaceSchema),
        }),
        z.object({
          $case: z.literal('knowledgeAssistant'),
          knowledgeAssistant: z.lazy(() => marshalKnowledgeAssistantSchema),
        }),
        z.object({
          $case: z.literal('ucFunction'),
          ucFunction: z.lazy(() => marshalUcFunctionSchema),
        }),
        z.object({
          $case: z.literal('app'),
          app: z.lazy(() => marshalAppSchema),
        }),
        z.object({
          $case: z.literal('volume'),
          volume: z.lazy(() => marshalVolumeSchema),
        }),
        z.object({
          $case: z.literal('ucConnection'),
          ucConnection: z.lazy(() => marshalUcConnectionSchema),
        }),
      ])
      .optional(),
    description: z.string().optional(),
    toolId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    id: d.id,
    tool_type: d.toolType,
    ...(d.spec?.$case === 'genieSpace' && {genie_space: d.spec.genieSpace}),
    ...(d.spec?.$case === 'knowledgeAssistant' && {
      knowledge_assistant: d.spec.knowledgeAssistant,
    }),
    ...(d.spec?.$case === 'ucFunction' && {uc_function: d.spec.ucFunction}),
    ...(d.spec?.$case === 'app' && {app: d.spec.app}),
    ...(d.spec?.$case === 'volume' && {volume: d.spec.volume}),
    ...(d.spec?.$case === 'ucConnection' && {
      uc_connection: d.spec.ucConnection,
    }),
    description: d.description,
    tool_id: d.toolId,
  }));

export const marshalUcConnectionSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalUcFunctionSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalVolumeSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

const appFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

const exampleFieldMaskSchema: FieldMaskSchema = {
  exampleId: {wire: 'example_id'},
  guidelines: {wire: 'guidelines'},
  name: {wire: 'name'},
  question: {wire: 'question'},
};

export function exampleFieldMask(...paths: string[]): FieldMask<Example> {
  return FieldMask.build<Example>(paths, exampleFieldMaskSchema);
}

const genieSpaceFieldMaskSchema: FieldMaskSchema = {
  id: {wire: 'id'},
};

const knowledgeAssistantFieldMaskSchema: FieldMaskSchema = {
  knowledgeAssistantId: {wire: 'knowledge_assistant_id'},
  servingEndpointName: {wire: 'serving_endpoint_name'},
};

const supervisorAgentFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  creator: {wire: 'creator'},
  description: {wire: 'description'},
  displayName: {wire: 'display_name'},
  endpointName: {wire: 'endpoint_name'},
  experimentId: {wire: 'experiment_id'},
  id: {wire: 'id'},
  instructions: {wire: 'instructions'},
  name: {wire: 'name'},
  supervisorAgentId: {wire: 'supervisor_agent_id'},
};

export function supervisorAgentFieldMask(
  ...paths: string[]
): FieldMask<SupervisorAgent> {
  return FieldMask.build<SupervisorAgent>(
    paths,
    supervisorAgentFieldMaskSchema
  );
}

const toolFieldMaskSchema: FieldMaskSchema = {
  app: {wire: 'app', children: () => appFieldMaskSchema},
  description: {wire: 'description'},
  genieSpace: {wire: 'genie_space', children: () => genieSpaceFieldMaskSchema},
  id: {wire: 'id'},
  knowledgeAssistant: {
    wire: 'knowledge_assistant',
    children: () => knowledgeAssistantFieldMaskSchema,
  },
  name: {wire: 'name'},
  toolId: {wire: 'tool_id'},
  toolType: {wire: 'tool_type'},
  ucConnection: {
    wire: 'uc_connection',
    children: () => ucConnectionFieldMaskSchema,
  },
  ucFunction: {wire: 'uc_function', children: () => ucFunctionFieldMaskSchema},
  volume: {wire: 'volume', children: () => volumeFieldMaskSchema},
};

export function toolFieldMask(...paths: string[]): FieldMask<Tool> {
  return FieldMask.build<Tool>(paths, toolFieldMaskSchema);
}

const ucConnectionFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

const ucFunctionFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

const volumeFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};
