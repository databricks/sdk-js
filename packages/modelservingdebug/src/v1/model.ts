// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * *
 * Proto version of com.databricks.rpc.HttpOverRpcResponse.
 *
 * This message can be specially handled in UnaryRpcService with JettyRPC when the advanced feature
 * CustomHandlingForHttpOverRpcProtoResponse is enabled - bypass the RPC serializer and populate
 * HTTP status, response headers and response body from the proto message directly.
 *
 * Don't add/modify the fields before being aware of the implications.
 */
export interface ExportMetricsResponse {
  contents?: ReadableStream | undefined;
}

export interface GetExportEndpointMetrics {
  /** The name of the serving endpoint to retrieve metrics for. This field is required. */
  name?: string | undefined;
}

export interface GetServedModelBuildLogs {
  /** The name of the serving endpoint that the served model belongs to. This field is required. */
  name?: string | undefined;
  /** The name of the served model that build logs will be retrieved for. This field is required. */
  servedModelName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetServedModelBuildLogs_Response {
  /** The logs associated with building the served entity's environment. */
  logs?: string | undefined;
}

export interface GetServedModelLogs {
  /** The name of the serving endpoint that the served model belongs to. This field is required. */
  name?: string | undefined;
  /** The name of the served model that logs will be retrieved for. This field is required. */
  servedModelName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetServedModelLogs_Response {
  /** The most recent log lines of the model server processing invocation requests. */
  logs?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetServedModelBuildLogs_ResponseSchema: z.ZodType<GetServedModelBuildLogs_Response> =
  z
    .object({
      logs: z.string().optional(),
    })
    .transform(d => ({
      logs: d.logs,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetServedModelLogs_ResponseSchema: z.ZodType<GetServedModelLogs_Response> =
  z
    .object({
      logs: z.string().optional(),
    })
    .transform(d => ({
      logs: d.logs,
    }));
