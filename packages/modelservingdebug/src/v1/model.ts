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
  status?: number | undefined;
  rawContent?: ReadableStream | undefined;
  headers?: Header[] | undefined;
}

export interface ExportServedModelServiceLogFile {
  /** The name of the serving endpoint that the served model belongs to. This field is required. */
  name?: string | undefined;
  /** The deployment ID of the served model. This field is required. */
  deploymentId?: string | undefined;
  /** Filter log files by date in the format "YYYY-MM-DD". This field is required. */
  date?: string | undefined;
  /** The instance ID that the log file belongs to. This field is required. */
  instanceId?: string | undefined;
  /** The name of the log file to export. This field is required. */
  fileName?: string | undefined;
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

export interface Header {
  name?: string | undefined;
  value?: string | undefined;
}

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
export interface HttpOverRpcProtoResponse {
  status?: number | undefined;
  rawContent?: ReadableStream | undefined;
  headers?: Header[] | undefined;
}

export interface ListEndpointServiceLogFiles {
  /** The name of the serving endpoint that the served model belongs to. This field is required. */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListEndpointServiceLogFiles_Response {
  name?: string | undefined;
  files?:
    | ListEndpointServiceLogFiles_Response_ServedModelServiceLogFile[]
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListEndpointServiceLogFiles_Response_ServedModelServiceLogFile {
  servedEntityName?: string | undefined;
  servedEntityVersion?: string | undefined;
  deploymentId?: string | undefined;
  fileName?: string | undefined;
  size?: number | undefined;
  date?: string | undefined;
  instanceId?: string | undefined;
}

export const unmarshalExportMetricsResponseSchema: z.ZodType<ExportMetricsResponse> =
  z
    .object({
      status: z.number().optional(),
      raw_content: z.any().optional(),
      headers: z.array(z.lazy(() => unmarshalHeaderSchema)).optional(),
    })
    .transform(d => ({
      status: d.status,
      rawContent: d.raw_content,
      headers: d.headers,
    }));

export const unmarshalExportServedModelServiceLogFileSchema: z.ZodType<ExportServedModelServiceLogFile> =
  z
    .object({
      name: z.string().optional(),
      deployment_id: z.string().optional(),
      date: z.string().optional(),
      instance_id: z.string().optional(),
      file_name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      deploymentId: d.deployment_id,
      date: d.date,
      instanceId: d.instance_id,
      fileName: d.file_name,
    }));

export const unmarshalGetExportEndpointMetricsSchema: z.ZodType<GetExportEndpointMetrics> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalGetServedModelBuildLogsSchema: z.ZodType<GetServedModelBuildLogs> =
  z
    .object({
      name: z.string().optional(),
      served_model_name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      servedModelName: d.served_model_name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetServedModelBuildLogs_ResponseSchema: z.ZodType<GetServedModelBuildLogs_Response> =
  z
    .object({
      logs: z.string().optional(),
    })
    .transform(d => ({
      logs: d.logs,
    }));

export const unmarshalGetServedModelLogsSchema: z.ZodType<GetServedModelLogs> =
  z
    .object({
      name: z.string().optional(),
      served_model_name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      servedModelName: d.served_model_name,
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

export const unmarshalHeaderSchema: z.ZodType<Header> = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    value: d.value,
  }));

export const unmarshalHttpOverRpcProtoResponseSchema: z.ZodType<HttpOverRpcProtoResponse> =
  z
    .object({
      status: z.number().optional(),
      raw_content: z.any().optional(),
      headers: z.array(z.lazy(() => unmarshalHeaderSchema)).optional(),
    })
    .transform(d => ({
      status: d.status,
      rawContent: d.raw_content,
      headers: d.headers,
    }));

export const unmarshalListEndpointServiceLogFilesSchema: z.ZodType<ListEndpointServiceLogFiles> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListEndpointServiceLogFiles_ResponseSchema: z.ZodType<ListEndpointServiceLogFiles_Response> =
  z
    .object({
      name: z.string().optional(),
      files: z
        .array(
          z.lazy(
            () =>
              unmarshalListEndpointServiceLogFiles_Response_ServedModelServiceLogFileSchema
          )
        )
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      files: d.files,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListEndpointServiceLogFiles_Response_ServedModelServiceLogFileSchema: z.ZodType<ListEndpointServiceLogFiles_Response_ServedModelServiceLogFile> =
  z
    .object({
      served_entity_name: z.string().optional(),
      served_entity_version: z.string().optional(),
      deployment_id: z.string().optional(),
      file_name: z.string().optional(),
      size: z.number().optional(),
      date: z.string().optional(),
      instance_id: z.string().optional(),
    })
    .transform(d => ({
      servedEntityName: d.served_entity_name,
      servedEntityVersion: d.served_entity_version,
      deploymentId: d.deployment_id,
      fileName: d.file_name,
      size: d.size,
      date: d.date,
      instanceId: d.instance_id,
    }));

export const marshalExportMetricsResponseSchema = z
  .object({
    status: z.number().optional(),
    rawContent: z.any().optional(),
    headers: z.array(z.lazy(() => marshalHeaderSchema)).optional(),
  })
  .transform(d => ({
    status: d.status,
    raw_content: d.rawContent,
    headers: d.headers,
  }));

export const marshalExportServedModelServiceLogFileSchema = z
  .object({
    name: z.string().optional(),
    deploymentId: z.string().optional(),
    date: z.string().optional(),
    instanceId: z.string().optional(),
    fileName: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    deployment_id: d.deploymentId,
    date: d.date,
    instance_id: d.instanceId,
    file_name: d.fileName,
  }));

export const marshalGetExportEndpointMetricsSchema = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalGetServedModelBuildLogsSchema = z
  .object({
    name: z.string().optional(),
    servedModelName: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    served_model_name: d.servedModelName,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetServedModelBuildLogs_ResponseSchema = z
  .object({
    logs: z.string().optional(),
  })
  .transform(d => ({
    logs: d.logs,
  }));

export const marshalGetServedModelLogsSchema = z
  .object({
    name: z.string().optional(),
    servedModelName: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    served_model_name: d.servedModelName,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetServedModelLogs_ResponseSchema = z
  .object({
    logs: z.string().optional(),
  })
  .transform(d => ({
    logs: d.logs,
  }));

export const marshalHeaderSchema = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    value: d.value,
  }));

export const marshalHttpOverRpcProtoResponseSchema = z
  .object({
    status: z.number().optional(),
    rawContent: z.any().optional(),
    headers: z.array(z.lazy(() => marshalHeaderSchema)).optional(),
  })
  .transform(d => ({
    status: d.status,
    raw_content: d.rawContent,
    headers: d.headers,
  }));

export const marshalListEndpointServiceLogFilesSchema = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListEndpointServiceLogFiles_ResponseSchema = z
  .object({
    name: z.string().optional(),
    files: z
      .array(
        z.lazy(
          () =>
            marshalListEndpointServiceLogFiles_Response_ServedModelServiceLogFileSchema
        )
      )
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    files: d.files,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListEndpointServiceLogFiles_Response_ServedModelServiceLogFileSchema =
  z
    .object({
      servedEntityName: z.string().optional(),
      servedEntityVersion: z.string().optional(),
      deploymentId: z.string().optional(),
      fileName: z.string().optional(),
      size: z.number().optional(),
      date: z.string().optional(),
      instanceId: z.string().optional(),
    })
    .transform(d => ({
      served_entity_name: d.servedEntityName,
      served_entity_version: d.servedEntityVersion,
      deployment_id: d.deploymentId,
      file_name: d.fileName,
      size: d.size,
      date: d.date,
      instance_id: d.instanceId,
    }));
