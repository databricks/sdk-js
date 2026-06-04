// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {JsonValue} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.number(),
    z.string(),
    z.boolean(),
    z.record(z.string(), jsonValueSchema),
    z.array(jsonValueSchema),
  ])
);

/** The role of the message. One of [system, user, assistant]. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ChatMessageRole = {
  CHAT_MESSAGE_ROLE_UNSPECIFIED: 'CHAT_MESSAGE_ROLE_UNSPECIFIED',
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
} as const;
export type ChatMessageRole =
  | (typeof ChatMessageRole)[keyof typeof ChatMessageRole]
  | (string & {});

/** This will always be 'embedding'. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const EmbeddingsV1ResponseEmbeddingElementObject = {
  EMBEDDINGS_V1_RESPONSE_EMBEDDING_ELEMENT_OBJECT_UNSPECIFIED:
    'EMBEDDINGS_V1_RESPONSE_EMBEDDING_ELEMENT_OBJECT_UNSPECIFIED',
  EMBEDDING: 'embedding',
} as const;
export type EmbeddingsV1ResponseEmbeddingElementObject =
  | (typeof EmbeddingsV1ResponseEmbeddingElementObject)[keyof typeof EmbeddingsV1ResponseEmbeddingElementObject]
  | (string & {});

/**
 * The type of object returned by the __external/foundation model__ serving endpoint, one of
 * [text_completion, chat.completion, list (of embeddings)].
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const QueryEndpointResponseObject = {
  QUERY_ENDPOINT_RESPONSE_OBJECT_UNSPECIFIED:
    'QUERY_ENDPOINT_RESPONSE_OBJECT_UNSPECIFIED',
  TEXT_COMPLETION: 'text_completion',
  CHAT_COMPLETION: 'chat.completion',
  LIST: 'list',
} as const;
export type QueryEndpointResponseObject =
  | (typeof QueryEndpointResponseObject)[keyof typeof QueryEndpointResponseObject]
  | (string & {});

export interface ChatMessage {
  /** The role of the message. One of [system, user, assistant]. */
  role?: ChatMessageRole | undefined;
  /** The content of the message. */
  content?: string | undefined;
}

export interface DataframeSplitInput {
  /** Index array for the dataframe */
  index?: number[] | undefined;
  /** Columns array for the dataframe */
  columns?: JsonValue[] | undefined;
  /** Data array for the dataframe */
  data?: JsonValue[] | undefined;
}

export interface EmbeddingsV1ResponseEmbeddingElement {
  /** The embedding vector */
  embedding?: number[] | undefined;
  /** The index of the embedding in the response. */
  index?: number | undefined;
  /** This will always be 'embedding'. */
  object?: EmbeddingsV1ResponseEmbeddingElementObject | undefined;
}

export interface ExternalModelUsageElement {
  /** The number of tokens in the prompt. */
  promptTokens?: number | undefined;
  /** The number of tokens in the chat/completions response. */
  completionTokens?: number | undefined;
  /** The total number of tokens in the prompt and response. */
  totalTokens?: number | undefined;
}

export interface QueryEndpointInputRequest {
  /** The name of the serving endpoint. This field is required and is provided via the path parameter. */
  name?: string | undefined;
  /**
   * The prompt string (or array of strings) field used ONLY for __completions external & foundation model__
   * serving endpoints and should only be used with other completions query fields.
   */
  prompt?: JsonValue | undefined;
  /**
   * The input string (or array of strings) field used ONLY for __embeddings external & foundation model__
   * serving endpoints and is the only field (along with extra_params if needed) used by embeddings queries.
   */
  input?: JsonValue | undefined;
  /**
   * The messages field used ONLY for __chat external & foundation model__ serving endpoints.
   * This is an array of ChatMessage objects and should only be used with other chat query fields.
   */
  messages?: ChatMessage[] | undefined;
  /**
   * The temperature field used ONLY for __completions__ and __chat external & foundation model__ serving
   * endpoints. This is a float between 0.0 and 2.0 with a default of 1.0 and should only be used with other
   * chat/completions query fields.
   */
  temperature?: number | undefined;
  /**
   * The stop sequences field used ONLY for __completions__ and __chat external & foundation model__ serving
   * endpoints. This is a list of strings and should only be used with other chat/completions query fields.
   */
  stop?: string[] | undefined;
  /**
   * The max tokens field used ONLY for __completions__ and __chat external & foundation model__ serving
   * endpoints. This is an integer and should only be used with other chat/completions query fields.
   */
  maxTokens?: number | undefined;
  /**
   * The n (number of candidates) field used ONLY for __completions__ and __chat external & foundation model__
   * serving endpoints. This is an integer between 1 and 5 with a default of 1 and should only be used with
   * other chat/completions query fields.
   */
  n?: number | undefined;
  /**
   * The stream field used ONLY for __completions__ and __chat external & foundation model__ serving endpoints.
   * This is a boolean defaulting to false and should only be used with other chat/completions query fields.
   */
  stream?: boolean | undefined;
  /**
   * The extra parameters field used ONLY for __completions, chat,__ and __embeddings external & foundation
   * model__ serving endpoints. This is a map of strings and should only be used with other external/foundation
   * model query fields.
   */
  extraParams?: Record<string, string> | undefined;
  /** Pandas Dataframe input in the records orientation. */
  dataframeRecords?: JsonValue[] | undefined;
  /** Pandas Dataframe input in the split orientation. */
  dataframeSplit?: DataframeSplitInput | undefined;
  /** Tensor-based input in row format. */
  instances?: JsonValue[] | undefined;
  /** Tensor-based input in columnar format. */
  inputs?: JsonValue | undefined;
  /** Optional user-provided request identifier that will be recorded in the inference table and the usage tracking table. */
  clientRequestId?: string | undefined;
  /** Optional user-provided context that will be recorded in the usage tracking table. */
  usageContext?: Record<string, string> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface QueryEndpointInputRequest_ExtraParamsEntry {
  key?: string | undefined;
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface QueryEndpointInputRequest_UsageContextEntry {
  key?: string | undefined;
  value?: string | undefined;
}

export interface QueryEndpointResponse {
  /** The list of choices returned by the __chat or completions external/foundation model__ serving endpoint. */
  choices?: V1ResponseChoiceElement[] | undefined;
  /** The list of the embeddings returned by the __embeddings external/foundation model__ serving endpoint. */
  data?: EmbeddingsV1ResponseEmbeddingElement[] | undefined;
  /**
   * The name of the __external/foundation model__ used for querying. This is the name of the model that was
   * specified in the endpoint config.
   */
  model?: string | undefined;
  /**
   * The usage object that may be returned by the __external/foundation model__ serving endpoint. This
   * contains information about the number of tokens used in the prompt and response.
   */
  usage?: ExternalModelUsageElement | undefined;
  /** The ID of the query that may be returned by a __completions or chat external/foundation model__ serving endpoint. */
  id?: string | undefined;
  /** The timestamp in seconds when the query was created in Unix time returned by a __completions or chat external/foundation model__ serving endpoint. */
  created?: bigint | undefined;
  /**
   * The type of object returned by the __external/foundation model__ serving endpoint, one of
   * [text_completion, chat.completion, list (of embeddings)].
   */
  object?: QueryEndpointResponseObject | undefined;
  /** The predictions returned by the serving endpoint. */
  predictions?: JsonValue[] | undefined;
  /** The outputs of the feature serving endpoint. */
  outputs?: JsonValue[] | undefined;
  /** The name of the served model that served the request. This is useful when there are multiple models behind the same endpoint with traffic split. */
  servedModelName?: string | undefined;
}

export interface V1ResponseChoiceElement {
  /** The text response from the __completions__ endpoint. */
  text?: string | undefined;
  /** The message response from the __chat__ endpoint. */
  message?: ChatMessage | undefined;
  /** The index of the choice in the __chat or completions__ response. */
  index?: number | undefined;
  /** The finish reason returned by the endpoint. */
  finishReason?: string | undefined;
  /** The logprobs returned only by the __completions__ endpoint. */
  logprobs?: number | undefined;
}

export const unmarshalChatMessageSchema: z.ZodType<ChatMessage> = z
  .object({
    role: z.string().optional(),
    content: z.string().optional(),
  })
  .transform(d => ({
    role: d.role,
    content: d.content,
  }));

export const unmarshalEmbeddingsV1ResponseEmbeddingElementSchema: z.ZodType<EmbeddingsV1ResponseEmbeddingElement> =
  z
    .object({
      embedding: z.array(z.number()).optional(),
      index: z.number().optional(),
      object: z.string().optional(),
    })
    .transform(d => ({
      embedding: d.embedding,
      index: d.index,
      object: d.object,
    }));

export const unmarshalExternalModelUsageElementSchema: z.ZodType<ExternalModelUsageElement> =
  z
    .object({
      prompt_tokens: z.number().optional(),
      completion_tokens: z.number().optional(),
      total_tokens: z.number().optional(),
    })
    .transform(d => ({
      promptTokens: d.prompt_tokens,
      completionTokens: d.completion_tokens,
      totalTokens: d.total_tokens,
    }));

export const unmarshalQueryEndpointResponseSchema: z.ZodType<QueryEndpointResponse> =
  z
    .object({
      choices: z
        .array(z.lazy(() => unmarshalV1ResponseChoiceElementSchema))
        .optional(),
      data: z
        .array(
          z.lazy(() => unmarshalEmbeddingsV1ResponseEmbeddingElementSchema)
        )
        .optional(),
      model: z.string().optional(),
      usage: z.lazy(() => unmarshalExternalModelUsageElementSchema).optional(),
      id: z.string().optional(),
      created: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      object: z.string().optional(),
      predictions: z.array(jsonValueSchema).optional(),
      outputs: z.array(jsonValueSchema).optional(),
      'served-model-name': z.string().optional(),
    })
    .transform(d => ({
      choices: d.choices,
      data: d.data,
      model: d.model,
      usage: d.usage,
      id: d.id,
      created: d.created,
      object: d.object,
      predictions: d.predictions,
      outputs: d.outputs,
      servedModelName: d['served-model-name'],
    }));

export const unmarshalV1ResponseChoiceElementSchema: z.ZodType<V1ResponseChoiceElement> =
  z
    .object({
      text: z.string().optional(),
      message: z.lazy(() => unmarshalChatMessageSchema).optional(),
      index: z.number().optional(),
      finishReason: z.string().optional(),
      logprobs: z.number().optional(),
    })
    .transform(d => ({
      text: d.text,
      message: d.message,
      index: d.index,
      finishReason: d.finishReason,
      logprobs: d.logprobs,
    }));

export const marshalChatMessageSchema: z.ZodType = z
  .object({
    role: z.string().optional(),
    content: z.string().optional(),
  })
  .transform(d => ({
    role: d.role,
    content: d.content,
  }));

export const marshalDataframeSplitInputSchema: z.ZodType = z
  .object({
    index: z.array(z.number()).optional(),
    columns: z.array(jsonValueSchema).optional(),
    data: z.array(jsonValueSchema).optional(),
  })
  .transform(d => ({
    index: d.index,
    columns: d.columns,
    data: d.data,
  }));

export const marshalQueryEndpointInputRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    prompt: jsonValueSchema.optional(),
    input: jsonValueSchema.optional(),
    messages: z.array(z.lazy(() => marshalChatMessageSchema)).optional(),
    temperature: z.number().optional(),
    stop: z.array(z.string()).optional(),
    maxTokens: z.number().optional(),
    n: z.number().optional(),
    stream: z.boolean().optional(),
    extraParams: z.record(z.string(), z.string()).optional(),
    dataframeRecords: z.array(jsonValueSchema).optional(),
    dataframeSplit: z.lazy(() => marshalDataframeSplitInputSchema).optional(),
    instances: z.array(jsonValueSchema).optional(),
    inputs: jsonValueSchema.optional(),
    clientRequestId: z.string().optional(),
    usageContext: z.record(z.string(), z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    prompt: d.prompt,
    input: d.input,
    messages: d.messages,
    temperature: d.temperature,
    stop: d.stop,
    max_tokens: d.maxTokens,
    n: d.n,
    stream: d.stream,
    extra_params: d.extraParams,
    dataframe_records: d.dataframeRecords,
    dataframe_split: d.dataframeSplit,
    instances: d.instances,
    inputs: d.inputs,
    client_request_id: d.clientRequestId,
    usage_context: d.usageContext,
  }));
