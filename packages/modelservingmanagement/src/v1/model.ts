// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum Behavior {
  BEHAVIOR_UNSPECIFIED = 'BEHAVIOR_UNSPECIFIED',
  NONE = 'NONE',
  BLOCK = 'BLOCK',
  MASK = 'MASK',
}

export enum FoundationModelProduct {
  FOUNDATION_MODEL_PRODUCT_UNSPECIFIED = 'FOUNDATION_MODEL_PRODUCT_UNSPECIFIED',
  PPT = 'PPT',
  PT = 'PT',
  BATCH = 'BATCH',
}

export enum ServedModelDeploymentState {
  DEPLOYMENT_UNKNOWN = 'DEPLOYMENT_UNKNOWN',
  DEPLOYMENT_CREATING = 'DEPLOYMENT_CREATING',
  DEPLOYMENT_RECOVERING = 'DEPLOYMENT_RECOVERING',
  DEPLOYMENT_READY = 'DEPLOYMENT_READY',
  DEPLOYMENT_FAILED = 'DEPLOYMENT_FAILED',
  DEPLOYMENT_ABORTED = 'DEPLOYMENT_ABORTED',
  DEPLOYMENT_STOPPED = 'DEPLOYMENT_STOPPED',
}

export enum ServingEndpointDetailedPermissionLevel {
  CAN_MANAGE = 'CAN_MANAGE',
  CAN_QUERY = 'CAN_QUERY',
  CAN_VIEW = 'CAN_VIEW',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ExternalFunctionRequest_HttpMethod {
  HTTP_METHOD_UNSPECIFIED = 'HTTP_METHOD_UNSPECIFIED',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum InferenceEndpointState_ConfigUpdateState {
  CONFIG_UPDATE_STATE_UNSPECIFIED = 'CONFIG_UPDATE_STATE_UNSPECIFIED',
  NOT_UPDATING = 'NOT_UPDATING',
  IN_PROGRESS = 'IN_PROGRESS',
  UPDATE_FAILED = 'UPDATE_FAILED',
  UPDATE_CANCELED = 'UPDATE_CANCELED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum InferenceEndpointState_ReadyState {
  READY_STATE_UNSPECIFIED = 'READY_STATE_UNSPECIFIED',
  READY = 'READY',
  NOT_READY = 'NOT_READY',
}

export interface Ai21LabsConfig {
  /**
   * The <Databricks> secret key reference for an AI21 Labs API key. If you
   * prefer to paste your API key directly, see `ai21labs_api_key_plaintext`.
   * You must provide an API key using one of the following fields:
   * `ai21labs_api_key` or `ai21labs_api_key_plaintext`.
   */
  ai21labsApiKey?: string | undefined;
  /**
   * An AI21 Labs API key provided as a plaintext string. If you prefer to
   * reference your key using Databricks Secrets, see `ai21labs_api_key`. You
   * must provide an API key using one of the following fields:
   * `ai21labs_api_key` or `ai21labs_api_key_plaintext`.
   */
  ai21labsApiKeyPlaintext?: string | undefined;
}

export interface AiGatewayConfig {
  /**
   * Configuration to enable usage tracking using system tables.
   * These tables allow you to monitor operational usage on endpoints and their associated costs.
   */
  usageTrackingConfig?: UsageTrackingConfig | undefined;
  /**
   * Configuration for payload logging using inference tables.
   * Use these tables to monitor and audit data being sent to and received from model APIs and to improve model quality.
   */
  inferenceTableConfig?: InferenceTableConfig | undefined;
  /** Configuration for rate limits which can be set to limit endpoint traffic. */
  rateLimits?: AiGatewayRateLimit[] | undefined;
  /** Configuration for AI Guardrails to prevent unwanted data and unsafe data in requests and responses. */
  guardrails?: AiGuardrails | undefined;
  /**
   * Configuration for traffic fallback which auto fallbacks to other served entities if the request to a served
   * entity fails with certain error codes, to increase availability.
   */
  fallbackConfig?: FallbackConfig | undefined;
}

export interface AiGatewayRateLimit {
  /** Used to specify how many calls are allowed for a key within the renewal_period. */
  calls?: number | undefined;
  /**
   * Key field for a rate limit. Currently, 'user', 'user_group, 'service_principal', and 'endpoint' are supported,
   * with 'endpoint' being the default if not specified.
   */
  key?: string | undefined;
  /** Renewal period field for a rate limit. Currently, only 'minute' is supported. */
  renewalPeriod?: string | undefined;
  /** Principal field for a user, user group, or service principal to apply rate limiting to. Accepts a user email, group name, or service principal application ID. */
  principal?: string | undefined;
  /** Used to specify how many tokens are allowed for a key within the renewal_period. */
  tokens?: number | undefined;
}

export interface AiGuardrailParameters {
  /** Indicates whether the safety filter is enabled. */
  safety?: boolean | undefined;
  /** Configuration for guardrail PII filter. */
  pii?: PiiSettings | undefined;
  /**
   * The list of allowed topics.
   * Given a chat request, this guardrail flags the request if its topic is not in the allowed topics.
   */
  validTopics?: string[] | undefined;
  /**
   * List of invalid keywords.
   * AI guardrail uses keyword or string matching to decide if the keyword exists in the request or response content.
   */
  invalidKeywords?: string[] | undefined;
}

export interface AiGuardrails {
  /** Configuration for input guardrail filters. */
  input?: AiGuardrailParameters | undefined;
  /** Configuration for output guardrail filters. */
  output?: AiGuardrailParameters | undefined;
}

export interface AmazonBedrockConfig {
  /** The AWS region to use. Bedrock has to be enabled there. */
  awsRegion?: string | undefined;
  /**
   * The <Databricks> secret key reference for an AWS access key ID with
   * permissions to interact with Bedrock services. If you prefer to paste
   * your API key directly, see `aws_access_key_id_plaintext`. You must provide an API
   * key using one of the following fields: `aws_access_key_id` or
   * `aws_access_key_id_plaintext`.
   */
  awsAccessKeyId?: string | undefined;
  /**
   * The <Databricks> secret key reference for an AWS secret access key paired
   * with the access key ID, with permissions to interact with Bedrock
   * services. If you prefer to paste your API key directly, see
   * `aws_secret_access_key_plaintext`. You must provide an API key using one
   * of the following fields: `aws_secret_access_key` or
   * `aws_secret_access_key_plaintext`.
   */
  awsSecretAccessKey?: string | undefined;
  /**
   * The underlying provider in Amazon Bedrock. Supported values (case
   * insensitive) include: Anthropic, Cohere, AI21Labs, Amazon.
   */
  bedrockProvider?: string | undefined;
  /**
   * An AWS access key ID with permissions to interact with Bedrock services
   * provided as a plaintext string. If you prefer to reference your key using
   * Databricks Secrets, see `aws_access_key_id`. You must provide an API key
   * using one of the following fields: `aws_access_key_id` or
   * `aws_access_key_id_plaintext`.
   */
  awsAccessKeyIdPlaintext?: string | undefined;
  /**
   * An AWS secret access key paired with the access key ID, with permissions
   * to interact with Bedrock services provided as a plaintext string. If you
   * prefer to reference your key using Databricks Secrets, see
   * `aws_secret_access_key`. You must provide an API key using one of the
   * following fields: `aws_secret_access_key` or
   * `aws_secret_access_key_plaintext`.
   */
  awsSecretAccessKeyPlaintext?: string | undefined;
  /**
   * ARN of the instance profile that the external model will use to access AWS resources.
   * You must authenticate using an instance profile or access keys.
   * If you prefer to authenticate using access keys, see `aws_access_key_id`,
   * `aws_access_key_id_plaintext`, `aws_secret_access_key` and `aws_secret_access_key_plaintext`.
   */
  instanceProfileArn?: string | undefined;
  ucServiceCredentialName?: string | undefined;
}

export interface AnthropicConfig {
  /**
   * The <Databricks> secret key reference for an Anthropic API key. If you
   * prefer to paste your API key directly, see `anthropic_api_key_plaintext`.
   * You must provide an API key using one of the following fields:
   * `anthropic_api_key` or `anthropic_api_key_plaintext`.
   */
  anthropicApiKey?: string | undefined;
  /**
   * The Anthropic API key provided as a plaintext string. If you prefer to
   * reference your key using Databricks Secrets, see `anthropic_api_key`. You
   * must provide an API key using one of the following fields:
   * `anthropic_api_key` or `anthropic_api_key_plaintext`.
   */
  anthropicApiKeyPlaintext?: string | undefined;
}

export interface ApiKeyAuth {
  /** The name of the API key parameter used for authentication. */
  key?: string | undefined;
  /**
   * The <Databricks> secret key reference for an API Key.
   * If you prefer to paste your token directly, see `value_plaintext`.
   */
  value?: string | undefined;
  /**
   * The API Key provided as a plaintext string. If you prefer to reference your
   * token using Databricks Secrets, see `value`.
   */
  valuePlaintext?: string | undefined;
}

export interface AutoCaptureConfig {
  /** The name of the catalog in Unity Catalog. NOTE: On update, you cannot change the catalog name if the inference table is already enabled. */
  catalogName?: string | undefined;
  /** The name of the schema in Unity Catalog. NOTE: On update, you cannot change the schema name if the inference table is already enabled. */
  schemaName?: string | undefined;
  /** The prefix of the table in Unity Catalog. NOTE: On update, you cannot change the prefix name if the inference table is already enabled. */
  tableNamePrefix?: string | undefined;
  state?: AutoCaptureState | undefined;
  /** Indicates whether the inference table is enabled. */
  enabled?: boolean | undefined;
}

export interface AutoCaptureState {
  payloadTable?: PayloadTable | undefined;
}

export interface BearerTokenAuth {
  /**
   * The <Databricks> secret key reference for a token.
   * If you prefer to paste your token directly, see `token_plaintext`.
   */
  token?: string | undefined;
  /**
   * The token provided as a plaintext string. If you prefer to reference your
   * token using Databricks Secrets, see `token`.
   */
  tokenPlaintext?: string | undefined;
}

export interface CohereConfig {
  /**
   * The <Databricks> secret key reference for a Cohere API key. If you prefer
   * to paste your API key directly, see `cohere_api_key_plaintext`. You must
   * provide an API key using one of the following fields: `cohere_api_key` or
   * `cohere_api_key_plaintext`.
   */
  cohereApiKey?: string | undefined;
  /**
   * The Cohere API key provided as a plaintext string. If you prefer to
   * reference your key using Databricks Secrets, see `cohere_api_key`. You
   * must provide an API key using one of the following fields:
   * `cohere_api_key` or `cohere_api_key_plaintext`.
   */
  cohereApiKeyPlaintext?: string | undefined;
  /**
   * This is an optional field to provide a customized base URL for the Cohere
   * API. If left unspecified, the standard Cohere base URL is used.
   */
  cohereApiBase?: string | undefined;
}

export interface Content {
  schema?: Schema | undefined;
}

export interface CreateInferenceEndpoint {
  /**
   * The name of the serving endpoint. This field is required and must be unique across a <Workspace>.
   * An endpoint name can consist of alphanumeric characters, dashes, and underscores.
   */
  name?: string | undefined;
  /** The core config of the serving endpoint. */
  config?: EndpointCoreConfig | undefined;
  /** Tags to be attached to the serving endpoint and automatically propagated to billing logs. */
  tags?: EndpointTag[] | undefined;
  /** Enable route optimization for the serving endpoint. */
  routeOptimized?: boolean | undefined;
  /** Rate limits to be applied to the serving endpoint. NOTE: this field is deprecated, please use AI Gateway to manage rate limits. */
  rateLimits?: RateLimit[] | undefined;
  /** The AI Gateway configuration for the serving endpoint. NOTE: External model, provisioned throughput, and pay-per-token endpoints are fully supported; agent endpoints currently only support inference tables. */
  aiGateway?: AiGatewayConfig | undefined;
  /** The budget policy to be applied to the serving endpoint. */
  budgetPolicyId?: string | undefined;
  /** Email notification settings. */
  emailNotifications?: EmailNotifications | undefined;
  description?: string | undefined;
}

export interface CreatePtEndpoint {
  /**
   * The name of the serving endpoint. This field is required and must be unique across a <Workspace>.
   * An endpoint name can consist of alphanumeric characters, dashes, and underscores.
   */
  name?: string | undefined;
  /** The core config of the serving endpoint. */
  config?: PtEndpointCoreConfig | undefined;
  /** Tags to be attached to the serving endpoint and automatically propagated to billing logs. */
  tags?: EndpointTag[] | undefined;
  /** The AI Gateway configuration for the serving endpoint. */
  aiGateway?: AiGatewayConfig | undefined;
  /** The budget policy associated with the endpoint. */
  budgetPolicyId?: string | undefined;
  /** Email notification settings. */
  emailNotifications?: EmailNotifications | undefined;
}

/** Configs needed to create a custom provider model route. */
export interface CustomProviderConfig {
  /** This is a field to provide the URL of the custom provider API. */
  customProviderUrl?: string | undefined;
  /**
   * This is a field to provide bearer token authentication for the custom provider API.
   * You can only specify one authentication method.
   */
  bearerTokenAuth?: BearerTokenAuth | undefined;
  /**
   * This is a field to provide API key authentication for the custom provider API.
   * You can only specify one authentication method.
   */
  apiKeyAuth?: ApiKeyAuth | undefined;
}

/** Details necessary to query this object's API through the DataPlane APIs. */
export interface DataPlaneInfo {
  /** The URL of the endpoint for this operation in the dataplane. */
  endpointUrl?: string | undefined;
  /** Authorization details as a string. */
  authorizationDetails?: string | undefined;
}

export interface DatabricksModelServingConfig {
  /**
   * The <Databricks> secret key reference for a Databricks API token that
   * corresponds to a user or service principal with Can Query access to the
   * model serving endpoint pointed to by this external model. If you prefer
   * to paste your API key directly, see `databricks_api_token_plaintext`. You
   * must provide an API key using one of the following fields:
   * `databricks_api_token` or `databricks_api_token_plaintext`.
   */
  databricksApiToken?: string | undefined;
  /**
   * The URL of the <Databricks> workspace containing the model serving endpoint
   * pointed to by this external model.
   */
  databricksWorkspaceUrl?: string | undefined;
  /**
   * The Databricks API token that corresponds to a user or service principal
   * with Can Query access to the model serving endpoint pointed to by this
   * external model provided as a plaintext string. If you prefer to reference
   * your key using Databricks Secrets, see `databricks_api_token`. You must
   * provide an API key using one of the following fields:
   * `databricks_api_token` or `databricks_api_token_plaintext`.
   */
  databricksApiTokenPlaintext?: string | undefined;
}

export interface DeleteInferenceEndpoint {
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteInferenceEndpoint_Response {}

export interface EmailNotifications {
  /** A list of email addresses to be notified when an endpoint successfully updates its configuration or state. */
  onUpdateSuccess?: string[] | undefined;
  /** A list of email addresses to be notified when an endpoint fails to update its configuration or state. */
  onUpdateFailure?: string[] | undefined;
}

export interface EndpointCoreConfig {
  /** The list of served entities under the serving endpoint config. */
  servedEntities?: ServedModel[] | undefined;
  /** (Deprecated, use served_entities instead) The list of served models under the serving endpoint config. */
  servedModels?: ServedModel[] | undefined;
  /** The traffic configuration associated with the serving endpoint config. */
  trafficConfig?: TrafficConfig | undefined;
  /**
   * Configuration for Inference Tables which automatically logs requests and responses to Unity Catalog.
   * Note: this field is deprecated for creating new provisioned throughput endpoints,
   * or updating existing provisioned throughput endpoints that never have inference table configured;
   * in these cases please use AI Gateway to manage inference tables.
   */
  autoCaptureConfig?: AutoCaptureConfig | undefined;
}

export interface EndpointCoreConfigOutput {
  /** The config version that the serving endpoint is currently serving. */
  configVersion?: number | undefined;
  /** The list of served entities under the serving endpoint config. */
  servedEntities?: ServedModel[] | undefined;
  /** (Deprecated, use served_entities instead) The list of served models under the serving endpoint config. */
  servedModels?: ServedModel[] | undefined;
  /** The traffic configuration associated with the serving endpoint config. */
  trafficConfig?: TrafficConfig | undefined;
  /**
   * Configuration for Inference Tables which automatically logs requests and responses to Unity Catalog.
   * Note: this field is deprecated for creating new provisioned throughput endpoints,
   * or updating existing provisioned throughput endpoints that never have inference table configured;
   * in these cases please use AI Gateway to manage inference tables.
   */
  autoCaptureConfig?: AutoCaptureConfig | undefined;
}

export interface EndpointCoreConfigSummary {
  /** The list of served entities under the serving endpoint config. */
  servedEntities?: ServedModelLite[] | undefined;
  /** (Deprecated, use served_entities instead) The list of served models under the serving endpoint config. */
  servedModels?: ServedModelLite[] | undefined;
}

export interface EndpointTag {
  /** Key field for a serving endpoint tag. */
  key?: string | undefined;
  /** Optional value field for a serving endpoint tag. */
  value?: string | undefined;
}

/** Simple Proto message for testing */
export interface ExternalFunctionRequest {
  /** The connection name to use. This is required to identify the external connection. */
  connectionName?: string | undefined;
  /** The HTTP method to use (e.g., 'GET', 'POST'). */
  method?: ExternalFunctionRequest_HttpMethod | undefined;
  /** The relative path for the API endpoint. This is required. */
  path?: string | undefined;
  /** The JSON payload to send in the request body. */
  json?: string | undefined;
  /** Additional headers for the request. If not provided, only auth headers from connections would be passed. */
  headers?: string | undefined;
  /** Query parameters for the request. */
  params?: string | undefined;
  /**
   * Optional subdomain to prepend to the connection URL's host. If provided, this will be
   * added as a prefix to the connection URL's host. For example, if the connection URL is
   * `https://api.example.com/v1` and `sub_domain` is `"custom"`, the resulting URL will be
   * `https://custom.api.example.com/v1`.
   */
  subDomain?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ExternalFunctionResponse {}

export interface ExternalModel {
  /** The name of the provider for the external model. Currently, the supported providers are 'ai21labs', 'anthropic', 'amazon-bedrock', 'cohere', 'databricks-model-serving', 'google-cloud-vertex-ai', 'openai', 'palm', and 'custom'. */
  provider?: string | undefined;
  /** The name of the external model. */
  name?: string | undefined;
  /** The task type of the external model. */
  task?: string | undefined;
  /** AI21Labs Config. Only required if the provider is 'ai21labs'. */
  ai21labsConfig?: Ai21LabsConfig | undefined;
  /** Anthropic Config. Only required if the provider is 'anthropic'. */
  anthropicConfig?: AnthropicConfig | undefined;
  /** Amazon Bedrock Config. Only required if the provider is 'amazon-bedrock'. */
  amazonBedrockConfig?: AmazonBedrockConfig | undefined;
  /** Cohere Config. Only required if the provider is 'cohere'. */
  cohereConfig?: CohereConfig | undefined;
  /** Google Cloud Vertex AI Config. Only required if the provider is 'google-cloud-vertex-ai'. */
  googleCloudVertexAiConfig?: GoogleCloudVertexAiConfig | undefined;
  /** Databricks Model Serving Config. Only required if the provider is 'databricks-model-serving'. */
  databricksModelServingConfig?: DatabricksModelServingConfig | undefined;
  /** OpenAI Config. Only required if the provider is 'openai'. */
  openaiConfig?: OpenAiConfig | undefined;
  /** PaLM Config. Only required if the provider is 'palm'. */
  palmConfig?: PaLmConfig | undefined;
  /** Custom Provider Config. Only required if the provider is 'custom'. */
  customProviderConfig?: CustomProviderConfig | undefined;
}

export interface FallbackConfig {
  /**
   * Whether to enable traffic fallback. When a served entity in the serving endpoint returns specific error
   * codes (e.g. 500), the request will automatically be round-robin attempted with other served entities in the same
   * endpoint, following the order of served entity list, until a successful response is returned.
   * If all attempts fail, return the last response with the error code.
   */
  enabled?: boolean | undefined;
}

/** All fields are not sensitive as they are hard-coded in the system and made available to customers. */
export interface FoundationModel {
  name?: string | undefined;
  displayName?: string | undefined;
  docs?: string | undefined;
  description?: string | undefined;
}

export interface GetInferenceEndpoint {
  /** The name of the serving endpoint. This field is required. */
  name?: string | undefined;
}

export interface GetInferenceEndpointSchema {
  /** The name of the serving endpoint that the served model belongs to. This field is required. */
  name?: string | undefined;
}

/** The top level proto message that represents an OpenAPI 3.0 document. */
export interface GetOpenApiResponse {
  openapi?: string | undefined;
  info?: Info | undefined;
  servers?: Server[] | undefined;
  paths?: Record<string, PathItem> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetOpenApiResponse_PathsEntry {
  key?: string | undefined;
  value?: PathItem | undefined;
}

export interface GoogleCloudVertexAiConfig {
  /**
   * The <Databricks> secret key reference for a private key for the service
   * account which has access to the Google Cloud Vertex AI Service. See [Best
   * practices for managing service account keys]. If you prefer to paste your
   * API key directly, see `private_key_plaintext`. You must provide an API
   * key using one of the following fields: `private_key` or
   * `private_key_plaintext`
   *
   * [Best practices for managing service account keys]: https://cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys
   */
  privateKey?: string | undefined;
  /**
   * This is the Google Cloud project id that the service account is
   * associated with.
   */
  projectId?: string | undefined;
  /**
   * This is the region for the Google Cloud Vertex AI Service. See [supported
   * regions] for more details. Some models are only available in specific
   * regions.
   *
   * [supported regions]: https://cloud.google.com/vertex-ai/docs/general/locations
   */
  region?: string | undefined;
  /**
   * The private key for the service account which has access to the Google
   * Cloud Vertex AI Service provided as a plaintext secret. See [Best
   * practices for managing service account keys]. If you prefer to reference
   * your key using Databricks Secrets, see `private_key`. You must provide an
   * API key using one of the following fields: `private_key` or
   * `private_key_plaintext`.
   *
   * [Best practices for managing service account keys]: https://cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys
   */
  privateKeyPlaintext?: string | undefined;
}

export interface InferenceEndpoint {
  /** The name of the serving endpoint. */
  name?: string | undefined;
  /** The email of the user who created the serving endpoint. */
  creator?: string | undefined;
  /** The timestamp when the endpoint was created in Unix time. */
  creationTimestamp?: number | undefined;
  /** The timestamp when the endpoint was last updated by a user in Unix time. */
  lastUpdatedTimestamp?: number | undefined;
  /** Information corresponding to the state of the serving endpoint. */
  state?: InferenceEndpointState | undefined;
  /** The config that is currently being served by the endpoint. */
  config?: EndpointCoreConfigSummary | undefined;
  /** Tags attached to the serving endpoint. */
  tags?: EndpointTag[] | undefined;
  /** System-generated ID of the endpoint, included to be used by the Permissions API. */
  id?: string | undefined;
  /** The task type of the serving endpoint. */
  task?: string | undefined;
  /** The AI Gateway configuration for the serving endpoint. NOTE: External model, provisioned throughput, and pay-per-token endpoints are fully supported; agent endpoints currently only support inference tables. */
  aiGateway?: AiGatewayConfig | undefined;
  /** The budget policy associated with the endpoint. */
  budgetPolicyId?: string | undefined;
  /** Description of the endpoint */
  description?: string | undefined;
  /** The usage policy associated with serving endpoint. */
  usagePolicyId?: string | undefined;
}

export interface InferenceEndpointDetailed {
  /** The name of the serving endpoint. */
  name?: string | undefined;
  /** The email of the user who created the serving endpoint. */
  creator?: string | undefined;
  /** The timestamp when the endpoint was created in Unix time. */
  creationTimestamp?: number | undefined;
  /** The timestamp when the endpoint was last updated by a user in Unix time. */
  lastUpdatedTimestamp?: number | undefined;
  /** Information corresponding to the state of the serving endpoint. */
  state?: InferenceEndpointState | undefined;
  /** The config that is currently being served by the endpoint. */
  config?: EndpointCoreConfigOutput | undefined;
  /** The config that the endpoint is attempting to update to. */
  pendingConfig?: PendingConfig | undefined;
  /** System-generated ID of the endpoint. This is used to refer to the endpoint in the Permissions API */
  id?: string | undefined;
  /** The permission level of the principal making the request. */
  permissionLevel?: ServingEndpointDetailedPermissionLevel | undefined;
  /** Tags attached to the serving endpoint. */
  tags?: EndpointTag[] | undefined;
  /** The task type of the serving endpoint. */
  task?: string | undefined;
  /** Boolean representing if route optimization has been enabled for the endpoint */
  routeOptimized?: boolean | undefined;
  /** Endpoint invocation url if route optimization is enabled for endpoint */
  endpointUrl?: string | undefined;
  /** Information required to query DataPlane APIs. */
  dataPlaneInfo?: ModelDataPlaneInfo | undefined;
  /** The AI Gateway configuration for the serving endpoint. NOTE: External model, provisioned throughput, and pay-per-token endpoints are fully supported; agent endpoints currently only support inference tables. */
  aiGateway?: AiGatewayConfig | undefined;
  /** The budget policy associated with the endpoint. */
  budgetPolicyId?: string | undefined;
  /** Email notification settings. */
  emailNotifications?: EmailNotifications | undefined;
  /** Description of the serving model */
  description?: string | undefined;
}

export interface InferenceEndpointState {
  /**
   * The state of an endpoint, indicating whether or not the endpoint is queryable. An endpoint is READY if all of
   * the served entities in its active configuration are ready. If any of the actively served entities are in a
   * non-ready state, the endpoint state will be NOT_READY.
   */
  ready?: InferenceEndpointState_ReadyState | undefined;
  /**
   * The state of an endpoint's config update. This informs the user if the pending_config is in progress, if the
   * update failed, or if there is no update in progress. Note that if the endpoint's config_update state value is
   * IN_PROGRESS, another update can not be made until the update completes or fails.
   */
  configUpdate?: InferenceEndpointState_ConfigUpdateState | undefined;
}

export interface InferenceTableConfig {
  /**
   * The name of the catalog in Unity Catalog. Required when enabling inference tables.
   * NOTE: On update, you have to disable inference table first in order to change the catalog name.
   */
  catalogName?: string | undefined;
  /**
   * The name of the schema in Unity Catalog. Required when enabling inference tables.
   * NOTE: On update, you have to disable inference table first in order to change the schema name.
   */
  schemaName?: string | undefined;
  /**
   * The prefix of the table in Unity Catalog.
   * NOTE: On update, you have to disable inference table first in order to change the prefix name.
   */
  tableNamePrefix?: string | undefined;
  /** Indicates whether the inference table is enabled. */
  enabled?: boolean | undefined;
}

/**
 * The object provides metadata about the API. The metadata MAY be used by the clients if needed,
 * and MAY be presented in editing or documentation generation tools for convenience.
 */
export interface Info {
  title?: string | undefined;
  description?: string | undefined;
  version?: string | undefined;
  summary?: string | undefined;
}

export interface ListFoundationModelEndpoints {
  /** Product type filter. Defaults to PPT (pay-per-token). */
  product?: FoundationModelProduct | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListFoundationModelEndpoints_Response {
  /** The list of foundation model endpoints. */
  endpoints?: InferenceEndpoint[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListInferenceEndpoints {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListInferenceEndpoints_Response {
  /** The list of endpoints. */
  endpoints?: InferenceEndpoint[] | undefined;
}

/** A representation of all DataPlaneInfo for operations that can be done on a model through Data Plane APIs. */
export interface ModelDataPlaneInfo {
  /** Information required to query DataPlane API 'query' endpoint. */
  queryInfo?: DataPlaneInfo | undefined;
}

/** Configs needed to create an OpenAI model route. */
export interface OpenAiConfig {
  /**
   * The <Databricks> secret key reference for an OpenAI API key using the
   * OpenAI or Azure service. If you prefer to paste your API key directly,
   * see `openai_api_key_plaintext`. You must provide an API key using one of
   * the following fields: `openai_api_key` or `openai_api_key_plaintext`.
   */
  openaiApiKey?: string | undefined;
  /**
   * This is an optional field to specify the type of OpenAI API to use. For
   * Azure OpenAI, this field is required, and adjust this parameter to
   * represent the preferred security access validation protocol. For access
   * token validation, use azure. For authentication using Azure Active
   * Directory (Azure AD) use, azuread.
   */
  openaiApiType?: string | undefined;
  /**
   * This is a field to provide a customized base URl for the OpenAI API. For
   * Azure OpenAI, this field is required, and is the base URL for the Azure
   * OpenAI API service provided by Azure. For other OpenAI API types, this
   * field is optional, and if left unspecified, the standard OpenAI base URL
   * is used.
   */
  openaiApiBase?: string | undefined;
  /**
   * This is an optional field to specify the OpenAI API version. For Azure
   * OpenAI, this field is required, and is the version of the Azure OpenAI
   * service to utilize, specified by a date.
   */
  openaiApiVersion?: string | undefined;
  /**
   * This field is only required for Azure OpenAI and is the name of the
   * deployment resource for the Azure OpenAI service.
   */
  openaiDeploymentName?: string | undefined;
  /**
   * This is an optional field to specify the organization in OpenAI or Azure
   * OpenAI.
   */
  openaiOrganization?: string | undefined;
  /**
   * This field is only required for Azure AD OpenAI and is the Microsoft
   * Entra Tenant ID.
   */
  microsoftEntraTenantId?: string | undefined;
  /**
   * This field is only required for Azure AD OpenAI and is the Microsoft
   * Entra Client ID.
   */
  microsoftEntraClientId?: string | undefined;
  /**
   * The <Databricks> secret key reference for a client secret used for
   * Microsoft Entra ID authentication. If you prefer to paste your client
   * secret directly, see `microsoft_entra_client_secret_plaintext`. You must
   * provide an API key using one of the following fields:
   * `microsoft_entra_client_secret` or
   * `microsoft_entra_client_secret_plaintext`.
   */
  microsoftEntraClientSecret?: string | undefined;
  /**
   * The OpenAI API key using the OpenAI or Azure service provided as a
   * plaintext string. If you prefer to reference your key using Databricks
   * Secrets, see `openai_api_key`. You must provide an API key using one of
   * the following fields: `openai_api_key` or `openai_api_key_plaintext`.
   */
  openaiApiKeyPlaintext?: string | undefined;
  /**
   * The client secret used for Microsoft Entra ID authentication provided as
   * a plaintext string. If you prefer to reference your key using Databricks
   * Secrets, see `microsoft_entra_client_secret`. You must provide an API key
   * using one of the following fields: `microsoft_entra_client_secret` or
   * `microsoft_entra_client_secret_plaintext`.
   */
  microsoftEntraClientSecretPlaintext?: string | undefined;
}

/** Describes a single API operation on a path. */
export interface Operation {
  tags?: string[] | undefined;
  summary?: string | undefined;
  description?: string | undefined;
  requestBody?: RequestBody | undefined;
  /** Key is status code, e.g. "200" */
  responses?: Record<string, Response> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Operation_ResponsesEntry {
  key?: string | undefined;
  value?: Response | undefined;
}

export interface PaLmConfig {
  /**
   * The <Databricks> secret key reference for a PaLM API key. If you prefer to
   * paste your API key directly, see `palm_api_key_plaintext`. You must
   * provide an API key using one of the following fields: `palm_api_key` or
   * `palm_api_key_plaintext`.
   */
  palmApiKey?: string | undefined;
  /**
   * The PaLM API key provided as a plaintext string. If you prefer to
   * reference your key using Databricks Secrets, see `palm_api_key`. You must
   * provide an API key using one of the following fields: `palm_api_key` or
   * `palm_api_key_plaintext`.
   */
  palmApiKeyPlaintext?: string | undefined;
}

export interface PatchInferenceEndpointBudgetPolicy {
  /** The name of the serving endpoint whose budget policy is being updated. This field is required. */
  name?: string | undefined;
  /** The ID of the budget policy to be applied to the serving endpoint. This field is required. */
  budgetPolicyId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PatchInferenceEndpointBudgetPolicy_Response {
  budgetPolicyId?: string | undefined;
  effectiveBudgetPolicyId?: string | undefined;
}

export interface PatchInferenceEndpointDescription {
  /** Endpoint name */
  name?: string | undefined;
  /** The description to be set for the endpoint. */
  description?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PatchInferenceEndpointDescription_Response {
  description?: string | undefined;
}

export interface PatchInferenceEndpointTags {
  /** The name of the serving endpoint who's tags to patch. This field is required. */
  name?: string | undefined;
  /** List of endpoint tags to add */
  addTags?: EndpointTag[] | undefined;
  /** List of tag keys to delete */
  deleteTags?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PatchInferenceEndpointTags_Response {
  tags?: EndpointTag[] | undefined;
}

export interface PatchInferenceEndpointUsagePolicy {
  /** The name of the serving endpoint whose usage policy is being updated. This field is required. */
  name?: string | undefined;
  /** The ID of the usage policy to be applied to the serving endpoint. This field is required. */
  usagePolicyId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PatchInferenceEndpointUsagePolicy_Response {
  usagePolicyId?: string | undefined;
  effectiveUsagePolicyId?: string | undefined;
}

/**
 * Describes the operations available on a single path. A Path Item MAY be empty, due to ACL
 * constraints. The path itself is still exposed to the documentation viewer but they will not know
 * which operations and parameters are available.
 */
export interface PathItem {
  summary?: string | undefined;
  description?: string | undefined;
  get?: Operation | undefined;
  put?: Operation | undefined;
  post?: Operation | undefined;
  delete?: Operation | undefined;
  options?: Operation | undefined;
  head?: Operation | undefined;
  patch?: Operation | undefined;
  trace?: Operation | undefined;
}

export interface PayloadTable {
  name?: string | undefined;
  status?: string | undefined;
  statusMessage?: string | undefined;
}

export interface PendingConfig {
  /** The list of served entities belonging to the last issued update to the serving endpoint. */
  servedEntities?: ServedModel[] | undefined;
  /** (Deprecated, use served_entities instead) The list of served models belonging to the last issued update to the serving endpoint. */
  servedModels?: ServedModel[] | undefined;
  /** The traffic config defining how invocations to the serving endpoint should be routed. */
  trafficConfig?: TrafficConfig | undefined;
  /** The config version that the serving endpoint is currently serving. */
  configVersion?: number | undefined;
  /** The timestamp when the update to the pending config started. */
  startTime?: number | undefined;
  /**
   * Configuration for Inference Tables which automatically logs requests and responses to Unity Catalog.
   * Note: this field is deprecated for creating new provisioned throughput endpoints,
   * or updating existing provisioned throughput endpoints that never have inference table configured;
   * in these cases please use AI Gateway to manage inference tables.
   */
  autoCaptureConfig?: AutoCaptureConfig | undefined;
}

export interface PiiSettings {
  /** Configuration for input guardrail filters. */
  behavior?: Behavior | undefined;
}

export interface PtEndpointCoreConfig {
  /** The list of served entities under the serving endpoint config. */
  servedEntities?: PtServedModel[] | undefined;
  trafficConfig?: TrafficConfig | undefined;
}

export interface PtServedModel {
  /** The name of a served entity. It must be unique across an endpoint. A served entity name can consist of alphanumeric characters, dashes, and underscores. If not specified for an external model, this field defaults to external_model.name, with '.' and ':' replaced with '-', and if not specified for other entities, it defaults to entity_name-entity_version. */
  name?: string | undefined;
  /** The name of the entity to be served. The entity may be a model in the Databricks Model Registry, a model in the Unity Catalog (UC), or a function of type FEATURE_SPEC in the UC. If it is a UC object, the full name of the object should be given in the form of **catalog_name.schema_name.model_name**. */
  entityName?: string | undefined;
  entityVersion?: string | undefined;
  /** The number of model units to be provisioned. */
  provisionedModelUnits?: number | undefined;
  /**
   * Whether burst scaling is enabled. When enabled (default), the endpoint can automatically
   * scale up beyond provisioned capacity to handle traffic spikes. When disabled, the endpoint
   * maintains fixed capacity at provisioned_model_units.
   */
  burstScalingEnabled?: boolean | undefined;
}

export interface PutInferenceEndpointAiGateway {
  /** The name of the serving endpoint whose AI Gateway is being updated. This field is required. */
  name?: string | undefined;
  /**
   * Configuration to enable usage tracking using system tables.
   * These tables allow you to monitor operational usage on endpoints and their associated costs.
   */
  usageTrackingConfig?: UsageTrackingConfig | undefined;
  /**
   * Configuration for payload logging using inference tables.
   * Use these tables to monitor and audit data being sent to and received from model APIs and to improve model quality.
   */
  inferenceTableConfig?: InferenceTableConfig | undefined;
  /** Configuration for rate limits which can be set to limit endpoint traffic. */
  rateLimits?: AiGatewayRateLimit[] | undefined;
  /** Configuration for AI Guardrails to prevent unwanted data and unsafe data in requests and responses. */
  guardrails?: AiGuardrails | undefined;
  /**
   * Configuration for traffic fallback which auto fallbacks to other served entities if the request to a served
   * entity fails with certain error codes, to increase availability.
   */
  fallbackConfig?: FallbackConfig | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PutInferenceEndpointAiGateway_Response {
  /**
   * Configuration to enable usage tracking using system tables.
   * These tables allow you to monitor operational usage on endpoints and their associated costs.
   */
  usageTrackingConfig?: UsageTrackingConfig | undefined;
  /**
   * Configuration for payload logging using inference tables.
   * Use these tables to monitor and audit data being sent to and received from model APIs and to improve model quality.
   */
  inferenceTableConfig?: InferenceTableConfig | undefined;
  /** Configuration for rate limits which can be set to limit endpoint traffic. */
  rateLimits?: AiGatewayRateLimit[] | undefined;
  /** Configuration for AI Guardrails to prevent unwanted data and unsafe data in requests and responses. */
  guardrails?: AiGuardrails | undefined;
  /**
   * Configuration for traffic fallback which auto fallbacks to other served entities if the request to a served
   * entity fails with certain error codes, to increase availability.
   */
  fallbackConfig?: FallbackConfig | undefined;
}

export interface PutInferenceEndpointConfig {
  /** The name of the serving endpoint to update. This field is required. */
  name?: string | undefined;
  /** The list of served entities under the serving endpoint config. */
  servedEntities?: ServedModel[] | undefined;
  /** (Deprecated, use served_entities instead) The list of served models under the serving endpoint config. */
  servedModels?: ServedModel[] | undefined;
  /** The traffic configuration associated with the serving endpoint config. */
  trafficConfig?: TrafficConfig | undefined;
  /**
   * Configuration for Inference Tables which automatically logs requests and responses to Unity Catalog.
   * Note: this field is deprecated for creating new provisioned throughput endpoints,
   * or updating existing provisioned throughput endpoints that never have inference table configured;
   * in these cases please use AI Gateway to manage inference tables.
   */
  autoCaptureConfig?: AutoCaptureConfig | undefined;
}

export interface PutInferenceEndpointRateLimits {
  /** The name of the serving endpoint whose rate limits are being updated. This field is required. */
  name?: string | undefined;
  /** The list of endpoint rate limits. */
  rateLimits?: RateLimit[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface PutInferenceEndpointRateLimits_Response {
  /** The list of endpoint rate limits. */
  rateLimits?: RateLimit[] | undefined;
}

export interface PutPtEndpointConfig {
  /** The name of the pt endpoint to update. This field is required. */
  name?: string | undefined;
  config?: PtEndpointCoreConfig | undefined;
}

export interface RateLimit {
  /** Used to specify how many calls are allowed for a key within the renewal_period. */
  calls?: number | undefined;
  /** Key field for a serving endpoint rate limit. Currently, only 'user' and 'endpoint' are supported, with 'endpoint' being the default if not specified. */
  key?: string | undefined;
  /** Renewal period field for a serving endpoint rate limit. Currently, only 'minute' is supported. */
  renewalPeriod?: string | undefined;
}

/** Describes a single request body. */
export interface RequestBody {
  description?: string | undefined;
  /** Key is a media type, e.g. "application/json" */
  content?: Record<string, Content> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface RequestBody_ContentEntry {
  key?: string | undefined;
  value?: Content | undefined;
}

export interface Response {
  description?: string | undefined;
  content?: Record<string, Content> | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Response_ContentEntry {
  key?: string | undefined;
  value?: Content | undefined;
}

export interface Route {
  /** The name of the served model this route configures traffic for. */
  servedModelName?: string | undefined;
  /** The percentage of endpoint traffic to send to this route. It must be an integer between 0 and 100 inclusive. */
  trafficPercentage?: number | undefined;
  servedEntityName?: string | undefined;
}

/** An object representing the request or response body. */
export interface Schema {
  description?: string | undefined;
  required?: string[] | undefined;
  type?: string | undefined;
  format?: string | undefined;
  example?: unknown | undefined;
  allOf?: Schema[] | undefined;
  oneOf?: Schema[] | undefined;
  anyOf?: Schema[] | undefined;
  items?: Schema | undefined;
  properties?: Record<string, Schema> | undefined;
  additionalProperties?: Schema | undefined;
  /** Used to represent the input columns in dataframe_split format. */
  enum?: string[] | undefined;
  /** Define the datatype of the array items. */
  prefixItems?: Schema[] | undefined;
  nullable?: boolean | undefined;
  default?: string | undefined;
  /** Minimum size of an array. */
  minItems?: number | undefined;
  /** Maximum size of an array. */
  maxItems?: number | undefined;
  examples?: unknown[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Schema_PropertiesEntry {
  key?: string | undefined;
  value?: Schema | undefined;
}

export interface ServedModel {
  /** The name of a served entity. It must be unique across an endpoint. A served entity name can consist of alphanumeric characters, dashes, and underscores. If not specified for an external model, this field defaults to external_model.name, with '.' and ':' replaced with '-', and if not specified for other entities, it defaults to entity_name-entity_version. */
  name?: string | undefined;
  /** The external model to be served. NOTE: Only one of external_model and (entity_name, entity_version, workload_size, workload_type, and scale_to_zero_enabled) can be specified with the latter set being used for custom model serving for a <Databricks> registered model. For an existing endpoint with external_model, it cannot be updated to an endpoint without external_model. If the endpoint is created without external_model, users cannot update it to add external_model later. The task type of all external models within an endpoint must be the same. */
  externalModel?: ExternalModel | undefined;
  /** The name of the entity to be served. The entity may be a model in the Databricks Model Registry, a model in the Unity Catalog (UC), or a function of type FEATURE_SPEC in the UC. If it is a UC object, the full name of the object should be given in the form of **catalog_name.schema_name.model_name**. */
  entityName?: string | undefined;
  entityVersion?: string | undefined;
  /** The minimum tokens per second that the endpoint can scale down to. */
  minProvisionedThroughput?: number | undefined;
  /** The maximum tokens per second that the endpoint can scale up to. */
  maxProvisionedThroughput?: number | undefined;
  /** The minimum provisioned concurrency that the endpoint can scale down to. Do not use if workload_size is specified. */
  minProvisionedConcurrency?: number | undefined;
  /** The maximum provisioned concurrency that the endpoint can scale up to. Do not use if workload_size is specified. */
  maxProvisionedConcurrency?: number | undefined;
  /** The workload size of the served entity. The workload size corresponds to a range of provisioned concurrency that the compute autoscales between. A single unit of provisioned concurrency can process one request at a time. Valid workload sizes are "Small" (4 - 4 provisioned concurrency), "Medium" (8 - 16 provisioned concurrency), and "Large" (16 - 64 provisioned concurrency). Additional custom workload sizes can also be used when available in the workspace. If scale-to-zero is enabled, the lower bound of the provisioned concurrency for each workload size is 0. Do not use if min_provisioned_concurrency and max_provisioned_concurrency are specified. */
  workloadSize?: string | undefined;
  /** The number of model units provisioned. */
  provisionedModelUnits?: number | undefined;
  /**
   * Whether burst scaling is enabled. When enabled (default), the endpoint can automatically
   * scale up beyond provisioned capacity to handle traffic spikes. When disabled, the endpoint
   * maintains fixed capacity at provisioned_model_units.
   */
  burstScalingEnabled?: boolean | undefined;
  /** Whether the compute resources for the served entity should scale down to zero. */
  scaleToZeroEnabled?: boolean | undefined;
  modelName?: string | undefined;
  modelVersion?: string | undefined;
  /** An object containing a set of optional, user-specified environment variable key-value pairs used for serving this entity. Note: this is an experimental feature and subject to change. Example entity environment variables that refer to <Databricks> secrets: `{"OPENAI_API_KEY": "{{secrets/my_scope/my_key}}", "DATABRICKS_TOKEN": "{{secrets/my_scope2/my_key2}}"}` */
  environmentVars?: Record<string, string> | undefined;
  /** ARN of the instance profile that the served entity uses to access AWS resources. */
  instanceProfileArn?: string | undefined;
  foundationModel?: FoundationModel | undefined;
  state?: ServedModelState | undefined;
  creator?: string | undefined;
  creationTimestamp?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ServedModel_EnvironmentVarsEntry {
  /** Name of the environment variable (e.g., OPENAI_API_KEY). */
  key?: string | undefined;
  /**
   * Value of the environment variable. To set secret environment variable that loads and uses
   * databricks secret, the value format must be "{{secrets/secret_scope/secret_key}}".
   * The secret_scope must be replaced with the scope of the secret and secret_key
   * must be replaced with the key of the secret.
   */
  value?: string | undefined;
}

export interface ServedModelLite {
  name?: string | undefined;
  /** Only one of model_name and entity_name should be populated */
  modelName?: string | undefined;
  entityName?: string | undefined;
  /** Only one of model_version and entity_version should be populated */
  modelVersion?: string | undefined;
  entityVersion?: string | undefined;
  externalModel?: ExternalModel | undefined;
  foundationModel?: FoundationModel | undefined;
}

export interface ServedModelState {
  deployment?: ServedModelDeploymentState | undefined;
  deploymentStateMessage?: string | undefined;
}

/** An object representing a Server. */
export interface Server {
  url?: string | undefined;
  description?: string | undefined;
}

export interface TrafficConfig {
  /** The list of routes that define traffic to each served entity. */
  routes?: Route[] | undefined;
}

export interface UpdateInferenceEndpointNotifications {
  /** The name of the serving endpoint whose notifications are being updated. This field is required. */
  name?: string | undefined;
  /** The email notification settings to update. Specify email addresses to notify when endpoint state changes occur. */
  emailNotifications?: EmailNotifications | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateInferenceEndpointNotifications_Response {
  name?: string | undefined;
  emailNotifications?: EmailNotifications | undefined;
}

export interface UsageTrackingConfig {
  /** Whether to enable usage tracking. */
  enabled?: boolean | undefined;
}

export const unmarshalAi21LabsConfigSchema: z.ZodType<Ai21LabsConfig> = z
  .object({
    ai21labs_api_key: z.string().optional(),
    ai21labs_api_key_plaintext: z.string().optional(),
  })
  .transform(d => ({
    ai21labsApiKey: d.ai21labs_api_key,
    ai21labsApiKeyPlaintext: d.ai21labs_api_key_plaintext,
  }));

export const unmarshalAiGatewayConfigSchema: z.ZodType<AiGatewayConfig> = z
  .object({
    usage_tracking_config: z
      .lazy(() => unmarshalUsageTrackingConfigSchema)
      .optional(),
    inference_table_config: z
      .lazy(() => unmarshalInferenceTableConfigSchema)
      .optional(),
    rate_limits: z
      .array(z.lazy(() => unmarshalAiGatewayRateLimitSchema))
      .optional(),
    guardrails: z.lazy(() => unmarshalAiGuardrailsSchema).optional(),
    fallback_config: z.lazy(() => unmarshalFallbackConfigSchema).optional(),
  })
  .transform(d => ({
    usageTrackingConfig: d.usage_tracking_config,
    inferenceTableConfig: d.inference_table_config,
    rateLimits: d.rate_limits,
    guardrails: d.guardrails,
    fallbackConfig: d.fallback_config,
  }));

export const unmarshalAiGatewayRateLimitSchema: z.ZodType<AiGatewayRateLimit> =
  z
    .object({
      calls: z.number().optional(),
      key: z.string().optional(),
      renewal_period: z.string().optional(),
      principal: z.string().optional(),
      tokens: z.number().optional(),
    })
    .transform(d => ({
      calls: d.calls,
      key: d.key,
      renewalPeriod: d.renewal_period,
      principal: d.principal,
      tokens: d.tokens,
    }));

export const unmarshalAiGuardrailParametersSchema: z.ZodType<AiGuardrailParameters> =
  z
    .object({
      safety: z.boolean().optional(),
      pii: z.lazy(() => unmarshalPiiSettingsSchema).optional(),
      valid_topics: z.array(z.string()).optional(),
      invalid_keywords: z.array(z.string()).optional(),
    })
    .transform(d => ({
      safety: d.safety,
      pii: d.pii,
      validTopics: d.valid_topics,
      invalidKeywords: d.invalid_keywords,
    }));

export const unmarshalAiGuardrailsSchema: z.ZodType<AiGuardrails> = z
  .object({
    input: z.lazy(() => unmarshalAiGuardrailParametersSchema).optional(),
    output: z.lazy(() => unmarshalAiGuardrailParametersSchema).optional(),
  })
  .transform(d => ({
    input: d.input,
    output: d.output,
  }));

export const unmarshalAmazonBedrockConfigSchema: z.ZodType<AmazonBedrockConfig> =
  z
    .object({
      aws_region: z.string().optional(),
      aws_access_key_id: z.string().optional(),
      aws_secret_access_key: z.string().optional(),
      bedrock_provider: z.string().optional(),
      aws_access_key_id_plaintext: z.string().optional(),
      aws_secret_access_key_plaintext: z.string().optional(),
      instance_profile_arn: z.string().optional(),
      uc_service_credential_name: z.string().optional(),
    })
    .transform(d => ({
      awsRegion: d.aws_region,
      awsAccessKeyId: d.aws_access_key_id,
      awsSecretAccessKey: d.aws_secret_access_key,
      bedrockProvider: d.bedrock_provider,
      awsAccessKeyIdPlaintext: d.aws_access_key_id_plaintext,
      awsSecretAccessKeyPlaintext: d.aws_secret_access_key_plaintext,
      instanceProfileArn: d.instance_profile_arn,
      ucServiceCredentialName: d.uc_service_credential_name,
    }));

export const unmarshalAnthropicConfigSchema: z.ZodType<AnthropicConfig> = z
  .object({
    anthropic_api_key: z.string().optional(),
    anthropic_api_key_plaintext: z.string().optional(),
  })
  .transform(d => ({
    anthropicApiKey: d.anthropic_api_key,
    anthropicApiKeyPlaintext: d.anthropic_api_key_plaintext,
  }));

export const unmarshalApiKeyAuthSchema: z.ZodType<ApiKeyAuth> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
    value_plaintext: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
    valuePlaintext: d.value_plaintext,
  }));

export const unmarshalAutoCaptureConfigSchema: z.ZodType<AutoCaptureConfig> = z
  .object({
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    table_name_prefix: z.string().optional(),
    state: z.lazy(() => unmarshalAutoCaptureStateSchema).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    tableNamePrefix: d.table_name_prefix,
    state: d.state,
    enabled: d.enabled,
  }));

export const unmarshalAutoCaptureStateSchema: z.ZodType<AutoCaptureState> = z
  .object({
    payload_table: z.lazy(() => unmarshalPayloadTableSchema).optional(),
  })
  .transform(d => ({
    payloadTable: d.payload_table,
  }));

export const unmarshalBearerTokenAuthSchema: z.ZodType<BearerTokenAuth> = z
  .object({
    token: z.string().optional(),
    token_plaintext: z.string().optional(),
  })
  .transform(d => ({
    token: d.token,
    tokenPlaintext: d.token_plaintext,
  }));

export const unmarshalCohereConfigSchema: z.ZodType<CohereConfig> = z
  .object({
    cohere_api_key: z.string().optional(),
    cohere_api_key_plaintext: z.string().optional(),
    cohere_api_base: z.string().optional(),
  })
  .transform(d => ({
    cohereApiKey: d.cohere_api_key,
    cohereApiKeyPlaintext: d.cohere_api_key_plaintext,
    cohereApiBase: d.cohere_api_base,
  }));

export const unmarshalContentSchema: z.ZodType<Content> = z
  .object({
    schema: z.lazy(() => unmarshalSchemaSchema).optional(),
  })
  .transform(d => ({
    schema: d.schema,
  }));

export const unmarshalCreateInferenceEndpointSchema: z.ZodType<CreateInferenceEndpoint> =
  z
    .object({
      name: z.string().optional(),
      config: z.lazy(() => unmarshalEndpointCoreConfigSchema).optional(),
      tags: z.array(z.lazy(() => unmarshalEndpointTagSchema)).optional(),
      route_optimized: z.boolean().optional(),
      rate_limits: z.array(z.lazy(() => unmarshalRateLimitSchema)).optional(),
      ai_gateway: z.lazy(() => unmarshalAiGatewayConfigSchema).optional(),
      budget_policy_id: z.string().optional(),
      email_notifications: z
        .lazy(() => unmarshalEmailNotificationsSchema)
        .optional(),
      description: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      config: d.config,
      tags: d.tags,
      routeOptimized: d.route_optimized,
      rateLimits: d.rate_limits,
      aiGateway: d.ai_gateway,
      budgetPolicyId: d.budget_policy_id,
      emailNotifications: d.email_notifications,
      description: d.description,
    }));

export const unmarshalCreatePtEndpointSchema: z.ZodType<CreatePtEndpoint> = z
  .object({
    name: z.string().optional(),
    config: z.lazy(() => unmarshalPtEndpointCoreConfigSchema).optional(),
    tags: z.array(z.lazy(() => unmarshalEndpointTagSchema)).optional(),
    ai_gateway: z.lazy(() => unmarshalAiGatewayConfigSchema).optional(),
    budget_policy_id: z.string().optional(),
    email_notifications: z
      .lazy(() => unmarshalEmailNotificationsSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    config: d.config,
    tags: d.tags,
    aiGateway: d.ai_gateway,
    budgetPolicyId: d.budget_policy_id,
    emailNotifications: d.email_notifications,
  }));

export const unmarshalCustomProviderConfigSchema: z.ZodType<CustomProviderConfig> =
  z
    .object({
      custom_provider_url: z.string().optional(),
      bearer_token_auth: z
        .lazy(() => unmarshalBearerTokenAuthSchema)
        .optional(),
      api_key_auth: z.lazy(() => unmarshalApiKeyAuthSchema).optional(),
    })
    .transform(d => ({
      customProviderUrl: d.custom_provider_url,
      bearerTokenAuth: d.bearer_token_auth,
      apiKeyAuth: d.api_key_auth,
    }));

export const unmarshalDataPlaneInfoSchema: z.ZodType<DataPlaneInfo> = z
  .object({
    endpoint_url: z.string().optional(),
    authorization_details: z.string().optional(),
  })
  .transform(d => ({
    endpointUrl: d.endpoint_url,
    authorizationDetails: d.authorization_details,
  }));

export const unmarshalDatabricksModelServingConfigSchema: z.ZodType<DatabricksModelServingConfig> =
  z
    .object({
      databricks_api_token: z.string().optional(),
      databricks_workspace_url: z.string().optional(),
      databricks_api_token_plaintext: z.string().optional(),
    })
    .transform(d => ({
      databricksApiToken: d.databricks_api_token,
      databricksWorkspaceUrl: d.databricks_workspace_url,
      databricksApiTokenPlaintext: d.databricks_api_token_plaintext,
    }));

export const unmarshalDeleteInferenceEndpointSchema: z.ZodType<DeleteInferenceEndpoint> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteInferenceEndpoint_ResponseSchema: z.ZodType<DeleteInferenceEndpoint_Response> =
  z.object({});

export const unmarshalEmailNotificationsSchema: z.ZodType<EmailNotifications> =
  z
    .object({
      on_update_success: z.array(z.string()).optional(),
      on_update_failure: z.array(z.string()).optional(),
    })
    .transform(d => ({
      onUpdateSuccess: d.on_update_success,
      onUpdateFailure: d.on_update_failure,
    }));

export const unmarshalEndpointCoreConfigSchema: z.ZodType<EndpointCoreConfig> =
  z
    .object({
      served_entities: z
        .array(z.lazy(() => unmarshalServedModelSchema))
        .optional(),
      served_models: z
        .array(z.lazy(() => unmarshalServedModelSchema))
        .optional(),
      traffic_config: z.lazy(() => unmarshalTrafficConfigSchema).optional(),
      auto_capture_config: z
        .lazy(() => unmarshalAutoCaptureConfigSchema)
        .optional(),
    })
    .transform(d => ({
      servedEntities: d.served_entities,
      servedModels: d.served_models,
      trafficConfig: d.traffic_config,
      autoCaptureConfig: d.auto_capture_config,
    }));

export const unmarshalEndpointCoreConfigOutputSchema: z.ZodType<EndpointCoreConfigOutput> =
  z
    .object({
      config_version: z.number().optional(),
      served_entities: z
        .array(z.lazy(() => unmarshalServedModelSchema))
        .optional(),
      served_models: z
        .array(z.lazy(() => unmarshalServedModelSchema))
        .optional(),
      traffic_config: z.lazy(() => unmarshalTrafficConfigSchema).optional(),
      auto_capture_config: z
        .lazy(() => unmarshalAutoCaptureConfigSchema)
        .optional(),
    })
    .transform(d => ({
      configVersion: d.config_version,
      servedEntities: d.served_entities,
      servedModels: d.served_models,
      trafficConfig: d.traffic_config,
      autoCaptureConfig: d.auto_capture_config,
    }));

export const unmarshalEndpointCoreConfigSummarySchema: z.ZodType<EndpointCoreConfigSummary> =
  z
    .object({
      served_entities: z
        .array(z.lazy(() => unmarshalServedModelLiteSchema))
        .optional(),
      served_models: z
        .array(z.lazy(() => unmarshalServedModelLiteSchema))
        .optional(),
    })
    .transform(d => ({
      servedEntities: d.served_entities,
      servedModels: d.served_models,
    }));

export const unmarshalEndpointTagSchema: z.ZodType<EndpointTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalExternalFunctionRequestSchema: z.ZodType<ExternalFunctionRequest> =
  z
    .object({
      connection_name: z.string().optional(),
      method: z.enum(ExternalFunctionRequest_HttpMethod).optional(),
      path: z.string().optional(),
      json: z.string().optional(),
      headers: z.string().optional(),
      params: z.string().optional(),
      sub_domain: z.string().optional(),
    })
    .transform(d => ({
      connectionName: d.connection_name,
      method: d.method,
      path: d.path,
      json: d.json,
      headers: d.headers,
      params: d.params,
      subDomain: d.sub_domain,
    }));

export const unmarshalExternalFunctionResponseSchema: z.ZodType<ExternalFunctionResponse> =
  z.object({});

export const unmarshalExternalModelSchema: z.ZodType<ExternalModel> = z
  .object({
    provider: z.string().optional(),
    name: z.string().optional(),
    task: z.string().optional(),
    ai21labs_config: z.lazy(() => unmarshalAi21LabsConfigSchema).optional(),
    anthropic_config: z.lazy(() => unmarshalAnthropicConfigSchema).optional(),
    amazon_bedrock_config: z
      .lazy(() => unmarshalAmazonBedrockConfigSchema)
      .optional(),
    cohere_config: z.lazy(() => unmarshalCohereConfigSchema).optional(),
    google_cloud_vertex_ai_config: z
      .lazy(() => unmarshalGoogleCloudVertexAiConfigSchema)
      .optional(),
    databricks_model_serving_config: z
      .lazy(() => unmarshalDatabricksModelServingConfigSchema)
      .optional(),
    openai_config: z.lazy(() => unmarshalOpenAiConfigSchema).optional(),
    palm_config: z.lazy(() => unmarshalPaLmConfigSchema).optional(),
    custom_provider_config: z
      .lazy(() => unmarshalCustomProviderConfigSchema)
      .optional(),
  })
  .transform(d => ({
    provider: d.provider,
    name: d.name,
    task: d.task,
    ai21labsConfig: d.ai21labs_config,
    anthropicConfig: d.anthropic_config,
    amazonBedrockConfig: d.amazon_bedrock_config,
    cohereConfig: d.cohere_config,
    googleCloudVertexAiConfig: d.google_cloud_vertex_ai_config,
    databricksModelServingConfig: d.databricks_model_serving_config,
    openaiConfig: d.openai_config,
    palmConfig: d.palm_config,
    customProviderConfig: d.custom_provider_config,
  }));

export const unmarshalFallbackConfigSchema: z.ZodType<FallbackConfig> = z
  .object({
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
  }));

export const unmarshalFoundationModelSchema: z.ZodType<FoundationModel> = z
  .object({
    name: z.string().optional(),
    display_name: z.string().optional(),
    docs: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    displayName: d.display_name,
    docs: d.docs,
    description: d.description,
  }));

export const unmarshalGetInferenceEndpointSchema: z.ZodType<GetInferenceEndpoint> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalGetInferenceEndpointSchemaSchema: z.ZodType<GetInferenceEndpointSchema> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalGetOpenApiResponseSchema: z.ZodType<GetOpenApiResponse> =
  z
    .object({
      openapi: z.string().optional(),
      info: z.lazy(() => unmarshalInfoSchema).optional(),
      servers: z.array(z.lazy(() => unmarshalServerSchema)).optional(),
      paths: z
        .record(
          z.string(),
          z.lazy(() => unmarshalPathItemSchema)
        )
        .optional(),
    })
    .transform(d => ({
      openapi: d.openapi,
      info: d.info,
      servers: d.servers,
      paths: d.paths,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetOpenApiResponse_PathsEntrySchema: z.ZodType<GetOpenApiResponse_PathsEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.lazy(() => unmarshalPathItemSchema).optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalGoogleCloudVertexAiConfigSchema: z.ZodType<GoogleCloudVertexAiConfig> =
  z
    .object({
      private_key: z.string().optional(),
      project_id: z.string().optional(),
      region: z.string().optional(),
      private_key_plaintext: z.string().optional(),
    })
    .transform(d => ({
      privateKey: d.private_key,
      projectId: d.project_id,
      region: d.region,
      privateKeyPlaintext: d.private_key_plaintext,
    }));

export const unmarshalInferenceEndpointSchema: z.ZodType<InferenceEndpoint> = z
  .object({
    name: z.string().optional(),
    creator: z.string().optional(),
    creation_timestamp: z.number().optional(),
    last_updated_timestamp: z.number().optional(),
    state: z.lazy(() => unmarshalInferenceEndpointStateSchema).optional(),
    config: z.lazy(() => unmarshalEndpointCoreConfigSummarySchema).optional(),
    tags: z.array(z.lazy(() => unmarshalEndpointTagSchema)).optional(),
    id: z.string().optional(),
    task: z.string().optional(),
    ai_gateway: z.lazy(() => unmarshalAiGatewayConfigSchema).optional(),
    budget_policy_id: z.string().optional(),
    description: z.string().optional(),
    usage_policy_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    creator: d.creator,
    creationTimestamp: d.creation_timestamp,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    state: d.state,
    config: d.config,
    tags: d.tags,
    id: d.id,
    task: d.task,
    aiGateway: d.ai_gateway,
    budgetPolicyId: d.budget_policy_id,
    description: d.description,
    usagePolicyId: d.usage_policy_id,
  }));

export const unmarshalInferenceEndpointDetailedSchema: z.ZodType<InferenceEndpointDetailed> =
  z
    .object({
      name: z.string().optional(),
      creator: z.string().optional(),
      creation_timestamp: z.number().optional(),
      last_updated_timestamp: z.number().optional(),
      state: z.lazy(() => unmarshalInferenceEndpointStateSchema).optional(),
      config: z.lazy(() => unmarshalEndpointCoreConfigOutputSchema).optional(),
      pending_config: z.lazy(() => unmarshalPendingConfigSchema).optional(),
      id: z.string().optional(),
      permission_level: z
        .enum(ServingEndpointDetailedPermissionLevel)
        .optional(),
      tags: z.array(z.lazy(() => unmarshalEndpointTagSchema)).optional(),
      task: z.string().optional(),
      route_optimized: z.boolean().optional(),
      endpoint_url: z.string().optional(),
      data_plane_info: z
        .lazy(() => unmarshalModelDataPlaneInfoSchema)
        .optional(),
      ai_gateway: z.lazy(() => unmarshalAiGatewayConfigSchema).optional(),
      budget_policy_id: z.string().optional(),
      email_notifications: z
        .lazy(() => unmarshalEmailNotificationsSchema)
        .optional(),
      description: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      creator: d.creator,
      creationTimestamp: d.creation_timestamp,
      lastUpdatedTimestamp: d.last_updated_timestamp,
      state: d.state,
      config: d.config,
      pendingConfig: d.pending_config,
      id: d.id,
      permissionLevel: d.permission_level,
      tags: d.tags,
      task: d.task,
      routeOptimized: d.route_optimized,
      endpointUrl: d.endpoint_url,
      dataPlaneInfo: d.data_plane_info,
      aiGateway: d.ai_gateway,
      budgetPolicyId: d.budget_policy_id,
      emailNotifications: d.email_notifications,
      description: d.description,
    }));

export const unmarshalInferenceEndpointStateSchema: z.ZodType<InferenceEndpointState> =
  z
    .object({
      ready: z.enum(InferenceEndpointState_ReadyState).optional(),
      config_update: z
        .enum(InferenceEndpointState_ConfigUpdateState)
        .optional(),
    })
    .transform(d => ({
      ready: d.ready,
      configUpdate: d.config_update,
    }));

export const unmarshalInferenceTableConfigSchema: z.ZodType<InferenceTableConfig> =
  z
    .object({
      catalog_name: z.string().optional(),
      schema_name: z.string().optional(),
      table_name_prefix: z.string().optional(),
      enabled: z.boolean().optional(),
    })
    .transform(d => ({
      catalogName: d.catalog_name,
      schemaName: d.schema_name,
      tableNamePrefix: d.table_name_prefix,
      enabled: d.enabled,
    }));

export const unmarshalInfoSchema: z.ZodType<Info> = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    version: z.string().optional(),
    summary: z.string().optional(),
  })
  .transform(d => ({
    title: d.title,
    description: d.description,
    version: d.version,
    summary: d.summary,
  }));

export const unmarshalListFoundationModelEndpointsSchema: z.ZodType<ListFoundationModelEndpoints> =
  z
    .object({
      product: z.enum(FoundationModelProduct).optional(),
    })
    .transform(d => ({
      product: d.product,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListFoundationModelEndpoints_ResponseSchema: z.ZodType<ListFoundationModelEndpoints_Response> =
  z
    .object({
      endpoints: z
        .array(z.lazy(() => unmarshalInferenceEndpointSchema))
        .optional(),
    })
    .transform(d => ({
      endpoints: d.endpoints,
    }));

export const unmarshalListInferenceEndpointsSchema: z.ZodType<ListInferenceEndpoints> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListInferenceEndpoints_ResponseSchema: z.ZodType<ListInferenceEndpoints_Response> =
  z
    .object({
      endpoints: z
        .array(z.lazy(() => unmarshalInferenceEndpointSchema))
        .optional(),
    })
    .transform(d => ({
      endpoints: d.endpoints,
    }));

export const unmarshalModelDataPlaneInfoSchema: z.ZodType<ModelDataPlaneInfo> =
  z
    .object({
      query_info: z.lazy(() => unmarshalDataPlaneInfoSchema).optional(),
    })
    .transform(d => ({
      queryInfo: d.query_info,
    }));

export const unmarshalOpenAiConfigSchema: z.ZodType<OpenAiConfig> = z
  .object({
    openai_api_key: z.string().optional(),
    openai_api_type: z.string().optional(),
    openai_api_base: z.string().optional(),
    openai_api_version: z.string().optional(),
    openai_deployment_name: z.string().optional(),
    openai_organization: z.string().optional(),
    microsoft_entra_tenant_id: z.string().optional(),
    microsoft_entra_client_id: z.string().optional(),
    microsoft_entra_client_secret: z.string().optional(),
    openai_api_key_plaintext: z.string().optional(),
    microsoft_entra_client_secret_plaintext: z.string().optional(),
  })
  .transform(d => ({
    openaiApiKey: d.openai_api_key,
    openaiApiType: d.openai_api_type,
    openaiApiBase: d.openai_api_base,
    openaiApiVersion: d.openai_api_version,
    openaiDeploymentName: d.openai_deployment_name,
    openaiOrganization: d.openai_organization,
    microsoftEntraTenantId: d.microsoft_entra_tenant_id,
    microsoftEntraClientId: d.microsoft_entra_client_id,
    microsoftEntraClientSecret: d.microsoft_entra_client_secret,
    openaiApiKeyPlaintext: d.openai_api_key_plaintext,
    microsoftEntraClientSecretPlaintext:
      d.microsoft_entra_client_secret_plaintext,
  }));

export const unmarshalOperationSchema: z.ZodType<Operation> = z
  .object({
    tags: z.array(z.string()).optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    requestBody: z.lazy(() => unmarshalRequestBodySchema).optional(),
    responses: z
      .record(
        z.string(),
        z.lazy(() => unmarshalResponseSchema)
      )
      .optional(),
  })
  .transform(d => ({
    tags: d.tags,
    summary: d.summary,
    description: d.description,
    requestBody: d.requestBody,
    responses: d.responses,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalOperation_ResponsesEntrySchema: z.ZodType<Operation_ResponsesEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.lazy(() => unmarshalResponseSchema).optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalPaLmConfigSchema: z.ZodType<PaLmConfig> = z
  .object({
    palm_api_key: z.string().optional(),
    palm_api_key_plaintext: z.string().optional(),
  })
  .transform(d => ({
    palmApiKey: d.palm_api_key,
    palmApiKeyPlaintext: d.palm_api_key_plaintext,
  }));

export const unmarshalPatchInferenceEndpointBudgetPolicySchema: z.ZodType<PatchInferenceEndpointBudgetPolicy> =
  z
    .object({
      name: z.string().optional(),
      budget_policy_id: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      budgetPolicyId: d.budget_policy_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPatchInferenceEndpointBudgetPolicy_ResponseSchema: z.ZodType<PatchInferenceEndpointBudgetPolicy_Response> =
  z
    .object({
      budget_policy_id: z.string().optional(),
      effective_budget_policy_id: z.string().optional(),
    })
    .transform(d => ({
      budgetPolicyId: d.budget_policy_id,
      effectiveBudgetPolicyId: d.effective_budget_policy_id,
    }));

export const unmarshalPatchInferenceEndpointDescriptionSchema: z.ZodType<PatchInferenceEndpointDescription> =
  z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      description: d.description,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPatchInferenceEndpointDescription_ResponseSchema: z.ZodType<PatchInferenceEndpointDescription_Response> =
  z
    .object({
      description: z.string().optional(),
    })
    .transform(d => ({
      description: d.description,
    }));

export const unmarshalPatchInferenceEndpointTagsSchema: z.ZodType<PatchInferenceEndpointTags> =
  z
    .object({
      name: z.string().optional(),
      add_tags: z.array(z.lazy(() => unmarshalEndpointTagSchema)).optional(),
      delete_tags: z.array(z.string()).optional(),
    })
    .transform(d => ({
      name: d.name,
      addTags: d.add_tags,
      deleteTags: d.delete_tags,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPatchInferenceEndpointTags_ResponseSchema: z.ZodType<PatchInferenceEndpointTags_Response> =
  z
    .object({
      tags: z.array(z.lazy(() => unmarshalEndpointTagSchema)).optional(),
    })
    .transform(d => ({
      tags: d.tags,
    }));

export const unmarshalPatchInferenceEndpointUsagePolicySchema: z.ZodType<PatchInferenceEndpointUsagePolicy> =
  z
    .object({
      name: z.string().optional(),
      usage_policy_id: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      usagePolicyId: d.usage_policy_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPatchInferenceEndpointUsagePolicy_ResponseSchema: z.ZodType<PatchInferenceEndpointUsagePolicy_Response> =
  z
    .object({
      usage_policy_id: z.string().optional(),
      effective_usage_policy_id: z.string().optional(),
    })
    .transform(d => ({
      usagePolicyId: d.usage_policy_id,
      effectiveUsagePolicyId: d.effective_usage_policy_id,
    }));

export const unmarshalPathItemSchema: z.ZodType<PathItem> = z
  .object({
    summary: z.string().optional(),
    description: z.string().optional(),
    get: z.lazy(() => unmarshalOperationSchema).optional(),
    put: z.lazy(() => unmarshalOperationSchema).optional(),
    post: z.lazy(() => unmarshalOperationSchema).optional(),
    delete: z.lazy(() => unmarshalOperationSchema).optional(),
    options: z.lazy(() => unmarshalOperationSchema).optional(),
    head: z.lazy(() => unmarshalOperationSchema).optional(),
    patch: z.lazy(() => unmarshalOperationSchema).optional(),
    trace: z.lazy(() => unmarshalOperationSchema).optional(),
  })
  .transform(d => ({
    summary: d.summary,
    description: d.description,
    get: d.get,
    put: d.put,
    post: d.post,
    delete: d.delete,
    options: d.options,
    head: d.head,
    patch: d.patch,
    trace: d.trace,
  }));

export const unmarshalPayloadTableSchema: z.ZodType<PayloadTable> = z
  .object({
    name: z.string().optional(),
    status: z.string().optional(),
    status_message: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    status: d.status,
    statusMessage: d.status_message,
  }));

export const unmarshalPendingConfigSchema: z.ZodType<PendingConfig> = z
  .object({
    served_entities: z
      .array(z.lazy(() => unmarshalServedModelSchema))
      .optional(),
    served_models: z.array(z.lazy(() => unmarshalServedModelSchema)).optional(),
    traffic_config: z.lazy(() => unmarshalTrafficConfigSchema).optional(),
    config_version: z.number().optional(),
    start_time: z.number().optional(),
    auto_capture_config: z
      .lazy(() => unmarshalAutoCaptureConfigSchema)
      .optional(),
  })
  .transform(d => ({
    servedEntities: d.served_entities,
    servedModels: d.served_models,
    trafficConfig: d.traffic_config,
    configVersion: d.config_version,
    startTime: d.start_time,
    autoCaptureConfig: d.auto_capture_config,
  }));

export const unmarshalPiiSettingsSchema: z.ZodType<PiiSettings> = z
  .object({
    behavior: z.enum(Behavior).optional(),
  })
  .transform(d => ({
    behavior: d.behavior,
  }));

export const unmarshalPtEndpointCoreConfigSchema: z.ZodType<PtEndpointCoreConfig> =
  z
    .object({
      served_entities: z
        .array(z.lazy(() => unmarshalPtServedModelSchema))
        .optional(),
      traffic_config: z.lazy(() => unmarshalTrafficConfigSchema).optional(),
    })
    .transform(d => ({
      servedEntities: d.served_entities,
      trafficConfig: d.traffic_config,
    }));

export const unmarshalPtServedModelSchema: z.ZodType<PtServedModel> = z
  .object({
    name: z.string().optional(),
    entity_name: z.string().optional(),
    entity_version: z.string().optional(),
    provisioned_model_units: z.number().optional(),
    burst_scaling_enabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    entityName: d.entity_name,
    entityVersion: d.entity_version,
    provisionedModelUnits: d.provisioned_model_units,
    burstScalingEnabled: d.burst_scaling_enabled,
  }));

export const unmarshalPutInferenceEndpointAiGatewaySchema: z.ZodType<PutInferenceEndpointAiGateway> =
  z
    .object({
      name: z.string().optional(),
      usage_tracking_config: z
        .lazy(() => unmarshalUsageTrackingConfigSchema)
        .optional(),
      inference_table_config: z
        .lazy(() => unmarshalInferenceTableConfigSchema)
        .optional(),
      rate_limits: z
        .array(z.lazy(() => unmarshalAiGatewayRateLimitSchema))
        .optional(),
      guardrails: z.lazy(() => unmarshalAiGuardrailsSchema).optional(),
      fallback_config: z.lazy(() => unmarshalFallbackConfigSchema).optional(),
    })
    .transform(d => ({
      name: d.name,
      usageTrackingConfig: d.usage_tracking_config,
      inferenceTableConfig: d.inference_table_config,
      rateLimits: d.rate_limits,
      guardrails: d.guardrails,
      fallbackConfig: d.fallback_config,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPutInferenceEndpointAiGateway_ResponseSchema: z.ZodType<PutInferenceEndpointAiGateway_Response> =
  z
    .object({
      usage_tracking_config: z
        .lazy(() => unmarshalUsageTrackingConfigSchema)
        .optional(),
      inference_table_config: z
        .lazy(() => unmarshalInferenceTableConfigSchema)
        .optional(),
      rate_limits: z
        .array(z.lazy(() => unmarshalAiGatewayRateLimitSchema))
        .optional(),
      guardrails: z.lazy(() => unmarshalAiGuardrailsSchema).optional(),
      fallback_config: z.lazy(() => unmarshalFallbackConfigSchema).optional(),
    })
    .transform(d => ({
      usageTrackingConfig: d.usage_tracking_config,
      inferenceTableConfig: d.inference_table_config,
      rateLimits: d.rate_limits,
      guardrails: d.guardrails,
      fallbackConfig: d.fallback_config,
    }));

export const unmarshalPutInferenceEndpointConfigSchema: z.ZodType<PutInferenceEndpointConfig> =
  z
    .object({
      name: z.string().optional(),
      served_entities: z
        .array(z.lazy(() => unmarshalServedModelSchema))
        .optional(),
      served_models: z
        .array(z.lazy(() => unmarshalServedModelSchema))
        .optional(),
      traffic_config: z.lazy(() => unmarshalTrafficConfigSchema).optional(),
      auto_capture_config: z
        .lazy(() => unmarshalAutoCaptureConfigSchema)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      servedEntities: d.served_entities,
      servedModels: d.served_models,
      trafficConfig: d.traffic_config,
      autoCaptureConfig: d.auto_capture_config,
    }));

export const unmarshalPutInferenceEndpointRateLimitsSchema: z.ZodType<PutInferenceEndpointRateLimits> =
  z
    .object({
      name: z.string().optional(),
      rate_limits: z.array(z.lazy(() => unmarshalRateLimitSchema)).optional(),
    })
    .transform(d => ({
      name: d.name,
      rateLimits: d.rate_limits,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPutInferenceEndpointRateLimits_ResponseSchema: z.ZodType<PutInferenceEndpointRateLimits_Response> =
  z
    .object({
      rate_limits: z.array(z.lazy(() => unmarshalRateLimitSchema)).optional(),
    })
    .transform(d => ({
      rateLimits: d.rate_limits,
    }));

export const unmarshalPutPtEndpointConfigSchema: z.ZodType<PutPtEndpointConfig> =
  z
    .object({
      name: z.string().optional(),
      config: z.lazy(() => unmarshalPtEndpointCoreConfigSchema).optional(),
    })
    .transform(d => ({
      name: d.name,
      config: d.config,
    }));

export const unmarshalRateLimitSchema: z.ZodType<RateLimit> = z
  .object({
    calls: z.number().optional(),
    key: z.string().optional(),
    renewal_period: z.string().optional(),
  })
  .transform(d => ({
    calls: d.calls,
    key: d.key,
    renewalPeriod: d.renewal_period,
  }));

export const unmarshalRequestBodySchema: z.ZodType<RequestBody> = z
  .object({
    description: z.string().optional(),
    content: z
      .record(
        z.string(),
        z.lazy(() => unmarshalContentSchema)
      )
      .optional(),
  })
  .transform(d => ({
    description: d.description,
    content: d.content,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRequestBody_ContentEntrySchema: z.ZodType<RequestBody_ContentEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.lazy(() => unmarshalContentSchema).optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalResponseSchema: z.ZodType<Response> = z
  .object({
    description: z.string().optional(),
    content: z
      .record(
        z.string(),
        z.lazy(() => unmarshalContentSchema)
      )
      .optional(),
  })
  .transform(d => ({
    description: d.description,
    content: d.content,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalResponse_ContentEntrySchema: z.ZodType<Response_ContentEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.lazy(() => unmarshalContentSchema).optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalRouteSchema: z.ZodType<Route> = z
  .object({
    served_model_name: z.string().optional(),
    traffic_percentage: z.number().optional(),
    served_entity_name: z.string().optional(),
  })
  .transform(d => ({
    servedModelName: d.served_model_name,
    trafficPercentage: d.traffic_percentage,
    servedEntityName: d.served_entity_name,
  }));

export const unmarshalSchemaSchema: z.ZodType<Schema> = z
  .object({
    description: z.string().optional(),
    required: z.array(z.string()).optional(),
    type: z.string().optional(),
    format: z.string().optional(),
    example: z.unknown().optional(),
    allOf: z.array(z.lazy(() => unmarshalSchemaSchema)).optional(),
    oneOf: z.array(z.lazy(() => unmarshalSchemaSchema)).optional(),
    anyOf: z.array(z.lazy(() => unmarshalSchemaSchema)).optional(),
    items: z.lazy(() => unmarshalSchemaSchema).optional(),
    properties: z
      .record(
        z.string(),
        z.lazy(() => unmarshalSchemaSchema)
      )
      .optional(),
    additionalProperties: z.lazy(() => unmarshalSchemaSchema).optional(),
    enum: z.array(z.string()).optional(),
    prefixItems: z.array(z.lazy(() => unmarshalSchemaSchema)).optional(),
    nullable: z.boolean().optional(),
    default: z.string().optional(),
    minItems: z.number().optional(),
    maxItems: z.number().optional(),
    examples: z.array(z.unknown()).optional(),
  })
  .transform(d => ({
    description: d.description,
    required: d.required,
    type: d.type,
    format: d.format,
    example: d.example,
    allOf: d.allOf,
    oneOf: d.oneOf,
    anyOf: d.anyOf,
    items: d.items,
    properties: d.properties,
    additionalProperties: d.additionalProperties,
    enum: d.enum,
    prefixItems: d.prefixItems,
    nullable: d.nullable,
    default: d.default,
    minItems: d.minItems,
    maxItems: d.maxItems,
    examples: d.examples,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSchema_PropertiesEntrySchema: z.ZodType<Schema_PropertiesEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.lazy(() => unmarshalSchemaSchema).optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalServedModelSchema: z.ZodType<ServedModel> = z
  .object({
    name: z.string().optional(),
    external_model: z.lazy(() => unmarshalExternalModelSchema).optional(),
    entity_name: z.string().optional(),
    entity_version: z.string().optional(),
    min_provisioned_throughput: z.number().optional(),
    max_provisioned_throughput: z.number().optional(),
    min_provisioned_concurrency: z.number().optional(),
    max_provisioned_concurrency: z.number().optional(),
    workload_size: z.string().optional(),
    provisioned_model_units: z.number().optional(),
    burst_scaling_enabled: z.boolean().optional(),
    scale_to_zero_enabled: z.boolean().optional(),
    model_name: z.string().optional(),
    model_version: z.string().optional(),
    environment_vars: z.record(z.string(), z.string()).optional(),
    instance_profile_arn: z.string().optional(),
    foundation_model: z.lazy(() => unmarshalFoundationModelSchema).optional(),
    state: z.lazy(() => unmarshalServedModelStateSchema).optional(),
    creator: z.string().optional(),
    creation_timestamp: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    externalModel: d.external_model,
    entityName: d.entity_name,
    entityVersion: d.entity_version,
    minProvisionedThroughput: d.min_provisioned_throughput,
    maxProvisionedThroughput: d.max_provisioned_throughput,
    minProvisionedConcurrency: d.min_provisioned_concurrency,
    maxProvisionedConcurrency: d.max_provisioned_concurrency,
    workloadSize: d.workload_size,
    provisionedModelUnits: d.provisioned_model_units,
    burstScalingEnabled: d.burst_scaling_enabled,
    scaleToZeroEnabled: d.scale_to_zero_enabled,
    modelName: d.model_name,
    modelVersion: d.model_version,
    environmentVars: d.environment_vars,
    instanceProfileArn: d.instance_profile_arn,
    foundationModel: d.foundation_model,
    state: d.state,
    creator: d.creator,
    creationTimestamp: d.creation_timestamp,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalServedModel_EnvironmentVarsEntrySchema: z.ZodType<ServedModel_EnvironmentVarsEntry> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalServedModelLiteSchema: z.ZodType<ServedModelLite> = z
  .object({
    name: z.string().optional(),
    model_name: z.string().optional(),
    entity_name: z.string().optional(),
    model_version: z.string().optional(),
    entity_version: z.string().optional(),
    external_model: z.lazy(() => unmarshalExternalModelSchema).optional(),
    foundation_model: z.lazy(() => unmarshalFoundationModelSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    modelName: d.model_name,
    entityName: d.entity_name,
    modelVersion: d.model_version,
    entityVersion: d.entity_version,
    externalModel: d.external_model,
    foundationModel: d.foundation_model,
  }));

export const unmarshalServedModelStateSchema: z.ZodType<ServedModelState> = z
  .object({
    deployment: z.enum(ServedModelDeploymentState).optional(),
    deployment_state_message: z.string().optional(),
  })
  .transform(d => ({
    deployment: d.deployment,
    deploymentStateMessage: d.deployment_state_message,
  }));

export const unmarshalServerSchema: z.ZodType<Server> = z
  .object({
    url: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    url: d.url,
    description: d.description,
  }));

export const unmarshalTrafficConfigSchema: z.ZodType<TrafficConfig> = z
  .object({
    routes: z.array(z.lazy(() => unmarshalRouteSchema)).optional(),
  })
  .transform(d => ({
    routes: d.routes,
  }));

export const unmarshalUpdateInferenceEndpointNotificationsSchema: z.ZodType<UpdateInferenceEndpointNotifications> =
  z
    .object({
      name: z.string().optional(),
      email_notifications: z
        .lazy(() => unmarshalEmailNotificationsSchema)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      emailNotifications: d.email_notifications,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateInferenceEndpointNotifications_ResponseSchema: z.ZodType<UpdateInferenceEndpointNotifications_Response> =
  z
    .object({
      name: z.string().optional(),
      email_notifications: z
        .lazy(() => unmarshalEmailNotificationsSchema)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      emailNotifications: d.email_notifications,
    }));

export const unmarshalUsageTrackingConfigSchema: z.ZodType<UsageTrackingConfig> =
  z
    .object({
      enabled: z.boolean().optional(),
    })
    .transform(d => ({
      enabled: d.enabled,
    }));

export const marshalAi21LabsConfigSchema = z
  .object({
    ai21labsApiKey: z.string().optional(),
    ai21labsApiKeyPlaintext: z.string().optional(),
  })
  .transform(d => ({
    ai21labs_api_key: d.ai21labsApiKey,
    ai21labs_api_key_plaintext: d.ai21labsApiKeyPlaintext,
  }));

export const marshalAiGatewayConfigSchema = z
  .object({
    usageTrackingConfig: z
      .lazy(() => marshalUsageTrackingConfigSchema)
      .optional(),
    inferenceTableConfig: z
      .lazy(() => marshalInferenceTableConfigSchema)
      .optional(),
    rateLimits: z
      .array(z.lazy(() => marshalAiGatewayRateLimitSchema))
      .optional(),
    guardrails: z.lazy(() => marshalAiGuardrailsSchema).optional(),
    fallbackConfig: z.lazy(() => marshalFallbackConfigSchema).optional(),
  })
  .transform(d => ({
    usage_tracking_config: d.usageTrackingConfig,
    inference_table_config: d.inferenceTableConfig,
    rate_limits: d.rateLimits,
    guardrails: d.guardrails,
    fallback_config: d.fallbackConfig,
  }));

export const marshalAiGatewayRateLimitSchema = z
  .object({
    calls: z.number().optional(),
    key: z.string().optional(),
    renewalPeriod: z.string().optional(),
    principal: z.string().optional(),
    tokens: z.number().optional(),
  })
  .transform(d => ({
    calls: d.calls,
    key: d.key,
    renewal_period: d.renewalPeriod,
    principal: d.principal,
    tokens: d.tokens,
  }));

export const marshalAiGuardrailParametersSchema = z
  .object({
    safety: z.boolean().optional(),
    pii: z.lazy(() => marshalPiiSettingsSchema).optional(),
    validTopics: z.array(z.string()).optional(),
    invalidKeywords: z.array(z.string()).optional(),
  })
  .transform(d => ({
    safety: d.safety,
    pii: d.pii,
    valid_topics: d.validTopics,
    invalid_keywords: d.invalidKeywords,
  }));

export const marshalAiGuardrailsSchema = z
  .object({
    input: z.lazy(() => marshalAiGuardrailParametersSchema).optional(),
    output: z.lazy(() => marshalAiGuardrailParametersSchema).optional(),
  })
  .transform(d => ({
    input: d.input,
    output: d.output,
  }));

export const marshalAmazonBedrockConfigSchema = z
  .object({
    awsRegion: z.string().optional(),
    awsAccessKeyId: z.string().optional(),
    awsSecretAccessKey: z.string().optional(),
    bedrockProvider: z.string().optional(),
    awsAccessKeyIdPlaintext: z.string().optional(),
    awsSecretAccessKeyPlaintext: z.string().optional(),
    instanceProfileArn: z.string().optional(),
    ucServiceCredentialName: z.string().optional(),
  })
  .transform(d => ({
    aws_region: d.awsRegion,
    aws_access_key_id: d.awsAccessKeyId,
    aws_secret_access_key: d.awsSecretAccessKey,
    bedrock_provider: d.bedrockProvider,
    aws_access_key_id_plaintext: d.awsAccessKeyIdPlaintext,
    aws_secret_access_key_plaintext: d.awsSecretAccessKeyPlaintext,
    instance_profile_arn: d.instanceProfileArn,
    uc_service_credential_name: d.ucServiceCredentialName,
  }));

export const marshalAnthropicConfigSchema = z
  .object({
    anthropicApiKey: z.string().optional(),
    anthropicApiKeyPlaintext: z.string().optional(),
  })
  .transform(d => ({
    anthropic_api_key: d.anthropicApiKey,
    anthropic_api_key_plaintext: d.anthropicApiKeyPlaintext,
  }));

export const marshalApiKeyAuthSchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
    valuePlaintext: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
    value_plaintext: d.valuePlaintext,
  }));

export const marshalAutoCaptureConfigSchema = z
  .object({
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    tableNamePrefix: z.string().optional(),
    state: z.lazy(() => marshalAutoCaptureStateSchema).optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    table_name_prefix: d.tableNamePrefix,
    state: d.state,
    enabled: d.enabled,
  }));

export const marshalAutoCaptureStateSchema = z
  .object({
    payloadTable: z.lazy(() => marshalPayloadTableSchema).optional(),
  })
  .transform(d => ({
    payload_table: d.payloadTable,
  }));

export const marshalBearerTokenAuthSchema = z
  .object({
    token: z.string().optional(),
    tokenPlaintext: z.string().optional(),
  })
  .transform(d => ({
    token: d.token,
    token_plaintext: d.tokenPlaintext,
  }));

export const marshalCohereConfigSchema = z
  .object({
    cohereApiKey: z.string().optional(),
    cohereApiKeyPlaintext: z.string().optional(),
    cohereApiBase: z.string().optional(),
  })
  .transform(d => ({
    cohere_api_key: d.cohereApiKey,
    cohere_api_key_plaintext: d.cohereApiKeyPlaintext,
    cohere_api_base: d.cohereApiBase,
  }));

export const marshalContentSchema = z
  .object({
    schema: z.lazy(() => marshalSchemaSchema).optional(),
  })
  .transform(d => ({
    schema: d.schema,
  }));

export const marshalCreateInferenceEndpointSchema = z
  .object({
    name: z.string().optional(),
    config: z.lazy(() => marshalEndpointCoreConfigSchema).optional(),
    tags: z.array(z.lazy(() => marshalEndpointTagSchema)).optional(),
    routeOptimized: z.boolean().optional(),
    rateLimits: z.array(z.lazy(() => marshalRateLimitSchema)).optional(),
    aiGateway: z.lazy(() => marshalAiGatewayConfigSchema).optional(),
    budgetPolicyId: z.string().optional(),
    emailNotifications: z
      .lazy(() => marshalEmailNotificationsSchema)
      .optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    config: d.config,
    tags: d.tags,
    route_optimized: d.routeOptimized,
    rate_limits: d.rateLimits,
    ai_gateway: d.aiGateway,
    budget_policy_id: d.budgetPolicyId,
    email_notifications: d.emailNotifications,
    description: d.description,
  }));

export const marshalCreatePtEndpointSchema = z
  .object({
    name: z.string().optional(),
    config: z.lazy(() => marshalPtEndpointCoreConfigSchema).optional(),
    tags: z.array(z.lazy(() => marshalEndpointTagSchema)).optional(),
    aiGateway: z.lazy(() => marshalAiGatewayConfigSchema).optional(),
    budgetPolicyId: z.string().optional(),
    emailNotifications: z
      .lazy(() => marshalEmailNotificationsSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    config: d.config,
    tags: d.tags,
    ai_gateway: d.aiGateway,
    budget_policy_id: d.budgetPolicyId,
    email_notifications: d.emailNotifications,
  }));

export const marshalCustomProviderConfigSchema = z
  .object({
    customProviderUrl: z.string().optional(),
    bearerTokenAuth: z.lazy(() => marshalBearerTokenAuthSchema).optional(),
    apiKeyAuth: z.lazy(() => marshalApiKeyAuthSchema).optional(),
  })
  .transform(d => ({
    custom_provider_url: d.customProviderUrl,
    bearer_token_auth: d.bearerTokenAuth,
    api_key_auth: d.apiKeyAuth,
  }));

export const marshalDataPlaneInfoSchema = z
  .object({
    endpointUrl: z.string().optional(),
    authorizationDetails: z.string().optional(),
  })
  .transform(d => ({
    endpoint_url: d.endpointUrl,
    authorization_details: d.authorizationDetails,
  }));

export const marshalDatabricksModelServingConfigSchema = z
  .object({
    databricksApiToken: z.string().optional(),
    databricksWorkspaceUrl: z.string().optional(),
    databricksApiTokenPlaintext: z.string().optional(),
  })
  .transform(d => ({
    databricks_api_token: d.databricksApiToken,
    databricks_workspace_url: d.databricksWorkspaceUrl,
    databricks_api_token_plaintext: d.databricksApiTokenPlaintext,
  }));

export const marshalDeleteInferenceEndpointSchema = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteInferenceEndpoint_ResponseSchema = z.object({});

export const marshalEmailNotificationsSchema = z
  .object({
    onUpdateSuccess: z.array(z.string()).optional(),
    onUpdateFailure: z.array(z.string()).optional(),
  })
  .transform(d => ({
    on_update_success: d.onUpdateSuccess,
    on_update_failure: d.onUpdateFailure,
  }));

export const marshalEndpointCoreConfigSchema = z
  .object({
    servedEntities: z.array(z.lazy(() => marshalServedModelSchema)).optional(),
    servedModels: z.array(z.lazy(() => marshalServedModelSchema)).optional(),
    trafficConfig: z.lazy(() => marshalTrafficConfigSchema).optional(),
    autoCaptureConfig: z.lazy(() => marshalAutoCaptureConfigSchema).optional(),
  })
  .transform(d => ({
    served_entities: d.servedEntities,
    served_models: d.servedModels,
    traffic_config: d.trafficConfig,
    auto_capture_config: d.autoCaptureConfig,
  }));

export const marshalEndpointCoreConfigOutputSchema = z
  .object({
    configVersion: z.number().optional(),
    servedEntities: z.array(z.lazy(() => marshalServedModelSchema)).optional(),
    servedModels: z.array(z.lazy(() => marshalServedModelSchema)).optional(),
    trafficConfig: z.lazy(() => marshalTrafficConfigSchema).optional(),
    autoCaptureConfig: z.lazy(() => marshalAutoCaptureConfigSchema).optional(),
  })
  .transform(d => ({
    config_version: d.configVersion,
    served_entities: d.servedEntities,
    served_models: d.servedModels,
    traffic_config: d.trafficConfig,
    auto_capture_config: d.autoCaptureConfig,
  }));

export const marshalEndpointCoreConfigSummarySchema = z
  .object({
    servedEntities: z
      .array(z.lazy(() => marshalServedModelLiteSchema))
      .optional(),
    servedModels: z
      .array(z.lazy(() => marshalServedModelLiteSchema))
      .optional(),
  })
  .transform(d => ({
    served_entities: d.servedEntities,
    served_models: d.servedModels,
  }));

export const marshalEndpointTagSchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalExternalFunctionRequestSchema = z
  .object({
    connectionName: z.string().optional(),
    method: z.enum(ExternalFunctionRequest_HttpMethod).optional(),
    path: z.string().optional(),
    json: z.string().optional(),
    headers: z.string().optional(),
    params: z.string().optional(),
    subDomain: z.string().optional(),
  })
  .transform(d => ({
    connection_name: d.connectionName,
    method: d.method,
    path: d.path,
    json: d.json,
    headers: d.headers,
    params: d.params,
    sub_domain: d.subDomain,
  }));

export const marshalExternalFunctionResponseSchema = z.object({});

export const marshalExternalModelSchema = z
  .object({
    provider: z.string().optional(),
    name: z.string().optional(),
    task: z.string().optional(),
    ai21labsConfig: z.lazy(() => marshalAi21LabsConfigSchema).optional(),
    anthropicConfig: z.lazy(() => marshalAnthropicConfigSchema).optional(),
    amazonBedrockConfig: z
      .lazy(() => marshalAmazonBedrockConfigSchema)
      .optional(),
    cohereConfig: z.lazy(() => marshalCohereConfigSchema).optional(),
    googleCloudVertexAiConfig: z
      .lazy(() => marshalGoogleCloudVertexAiConfigSchema)
      .optional(),
    databricksModelServingConfig: z
      .lazy(() => marshalDatabricksModelServingConfigSchema)
      .optional(),
    openaiConfig: z.lazy(() => marshalOpenAiConfigSchema).optional(),
    palmConfig: z.lazy(() => marshalPaLmConfigSchema).optional(),
    customProviderConfig: z
      .lazy(() => marshalCustomProviderConfigSchema)
      .optional(),
  })
  .transform(d => ({
    provider: d.provider,
    name: d.name,
    task: d.task,
    ai21labs_config: d.ai21labsConfig,
    anthropic_config: d.anthropicConfig,
    amazon_bedrock_config: d.amazonBedrockConfig,
    cohere_config: d.cohereConfig,
    google_cloud_vertex_ai_config: d.googleCloudVertexAiConfig,
    databricks_model_serving_config: d.databricksModelServingConfig,
    openai_config: d.openaiConfig,
    palm_config: d.palmConfig,
    custom_provider_config: d.customProviderConfig,
  }));

export const marshalFallbackConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
  }));

export const marshalFoundationModelSchema = z
  .object({
    name: z.string().optional(),
    displayName: z.string().optional(),
    docs: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    display_name: d.displayName,
    docs: d.docs,
    description: d.description,
  }));

export const marshalGetInferenceEndpointSchema = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalGetInferenceEndpointSchemaSchema = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalGetOpenApiResponseSchema = z
  .object({
    openapi: z.string().optional(),
    info: z.lazy(() => marshalInfoSchema).optional(),
    servers: z.array(z.lazy(() => marshalServerSchema)).optional(),
    paths: z
      .record(
        z.string(),
        z.lazy(() => marshalPathItemSchema)
      )
      .optional(),
  })
  .transform(d => ({
    openapi: d.openapi,
    info: d.info,
    servers: d.servers,
    paths: d.paths,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetOpenApiResponse_PathsEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.lazy(() => marshalPathItemSchema).optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalGoogleCloudVertexAiConfigSchema = z
  .object({
    privateKey: z.string().optional(),
    projectId: z.string().optional(),
    region: z.string().optional(),
    privateKeyPlaintext: z.string().optional(),
  })
  .transform(d => ({
    private_key: d.privateKey,
    project_id: d.projectId,
    region: d.region,
    private_key_plaintext: d.privateKeyPlaintext,
  }));

export const marshalInferenceEndpointSchema = z
  .object({
    name: z.string().optional(),
    creator: z.string().optional(),
    creationTimestamp: z.number().optional(),
    lastUpdatedTimestamp: z.number().optional(),
    state: z.lazy(() => marshalInferenceEndpointStateSchema).optional(),
    config: z.lazy(() => marshalEndpointCoreConfigSummarySchema).optional(),
    tags: z.array(z.lazy(() => marshalEndpointTagSchema)).optional(),
    id: z.string().optional(),
    task: z.string().optional(),
    aiGateway: z.lazy(() => marshalAiGatewayConfigSchema).optional(),
    budgetPolicyId: z.string().optional(),
    description: z.string().optional(),
    usagePolicyId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    creator: d.creator,
    creation_timestamp: d.creationTimestamp,
    last_updated_timestamp: d.lastUpdatedTimestamp,
    state: d.state,
    config: d.config,
    tags: d.tags,
    id: d.id,
    task: d.task,
    ai_gateway: d.aiGateway,
    budget_policy_id: d.budgetPolicyId,
    description: d.description,
    usage_policy_id: d.usagePolicyId,
  }));

export const marshalInferenceEndpointDetailedSchema = z
  .object({
    name: z.string().optional(),
    creator: z.string().optional(),
    creationTimestamp: z.number().optional(),
    lastUpdatedTimestamp: z.number().optional(),
    state: z.lazy(() => marshalInferenceEndpointStateSchema).optional(),
    config: z.lazy(() => marshalEndpointCoreConfigOutputSchema).optional(),
    pendingConfig: z.lazy(() => marshalPendingConfigSchema).optional(),
    id: z.string().optional(),
    permissionLevel: z.enum(ServingEndpointDetailedPermissionLevel).optional(),
    tags: z.array(z.lazy(() => marshalEndpointTagSchema)).optional(),
    task: z.string().optional(),
    routeOptimized: z.boolean().optional(),
    endpointUrl: z.string().optional(),
    dataPlaneInfo: z.lazy(() => marshalModelDataPlaneInfoSchema).optional(),
    aiGateway: z.lazy(() => marshalAiGatewayConfigSchema).optional(),
    budgetPolicyId: z.string().optional(),
    emailNotifications: z
      .lazy(() => marshalEmailNotificationsSchema)
      .optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    creator: d.creator,
    creation_timestamp: d.creationTimestamp,
    last_updated_timestamp: d.lastUpdatedTimestamp,
    state: d.state,
    config: d.config,
    pending_config: d.pendingConfig,
    id: d.id,
    permission_level: d.permissionLevel,
    tags: d.tags,
    task: d.task,
    route_optimized: d.routeOptimized,
    endpoint_url: d.endpointUrl,
    data_plane_info: d.dataPlaneInfo,
    ai_gateway: d.aiGateway,
    budget_policy_id: d.budgetPolicyId,
    email_notifications: d.emailNotifications,
    description: d.description,
  }));

export const marshalInferenceEndpointStateSchema = z
  .object({
    ready: z.enum(InferenceEndpointState_ReadyState).optional(),
    configUpdate: z.enum(InferenceEndpointState_ConfigUpdateState).optional(),
  })
  .transform(d => ({
    ready: d.ready,
    config_update: d.configUpdate,
  }));

export const marshalInferenceTableConfigSchema = z
  .object({
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    tableNamePrefix: z.string().optional(),
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    table_name_prefix: d.tableNamePrefix,
    enabled: d.enabled,
  }));

export const marshalInfoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    version: z.string().optional(),
    summary: z.string().optional(),
  })
  .transform(d => ({
    title: d.title,
    description: d.description,
    version: d.version,
    summary: d.summary,
  }));

export const marshalListFoundationModelEndpointsSchema = z
  .object({
    product: z.enum(FoundationModelProduct).optional(),
  })
  .transform(d => ({
    product: d.product,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListFoundationModelEndpoints_ResponseSchema = z
  .object({
    endpoints: z.array(z.lazy(() => marshalInferenceEndpointSchema)).optional(),
  })
  .transform(d => ({
    endpoints: d.endpoints,
  }));

export const marshalListInferenceEndpointsSchema = z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListInferenceEndpoints_ResponseSchema = z
  .object({
    endpoints: z.array(z.lazy(() => marshalInferenceEndpointSchema)).optional(),
  })
  .transform(d => ({
    endpoints: d.endpoints,
  }));

export const marshalModelDataPlaneInfoSchema = z
  .object({
    queryInfo: z.lazy(() => marshalDataPlaneInfoSchema).optional(),
  })
  .transform(d => ({
    query_info: d.queryInfo,
  }));

export const marshalOpenAiConfigSchema = z
  .object({
    openaiApiKey: z.string().optional(),
    openaiApiType: z.string().optional(),
    openaiApiBase: z.string().optional(),
    openaiApiVersion: z.string().optional(),
    openaiDeploymentName: z.string().optional(),
    openaiOrganization: z.string().optional(),
    microsoftEntraTenantId: z.string().optional(),
    microsoftEntraClientId: z.string().optional(),
    microsoftEntraClientSecret: z.string().optional(),
    openaiApiKeyPlaintext: z.string().optional(),
    microsoftEntraClientSecretPlaintext: z.string().optional(),
  })
  .transform(d => ({
    openai_api_key: d.openaiApiKey,
    openai_api_type: d.openaiApiType,
    openai_api_base: d.openaiApiBase,
    openai_api_version: d.openaiApiVersion,
    openai_deployment_name: d.openaiDeploymentName,
    openai_organization: d.openaiOrganization,
    microsoft_entra_tenant_id: d.microsoftEntraTenantId,
    microsoft_entra_client_id: d.microsoftEntraClientId,
    microsoft_entra_client_secret: d.microsoftEntraClientSecret,
    openai_api_key_plaintext: d.openaiApiKeyPlaintext,
    microsoft_entra_client_secret_plaintext:
      d.microsoftEntraClientSecretPlaintext,
  }));

export const marshalOperationSchema = z
  .object({
    tags: z.array(z.string()).optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    requestBody: z.lazy(() => marshalRequestBodySchema).optional(),
    responses: z
      .record(
        z.string(),
        z.lazy(() => marshalResponseSchema)
      )
      .optional(),
  })
  .transform(d => ({
    tags: d.tags,
    summary: d.summary,
    description: d.description,
    requestBody: d.requestBody,
    responses: d.responses,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalOperation_ResponsesEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.lazy(() => marshalResponseSchema).optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalPaLmConfigSchema = z
  .object({
    palmApiKey: z.string().optional(),
    palmApiKeyPlaintext: z.string().optional(),
  })
  .transform(d => ({
    palm_api_key: d.palmApiKey,
    palm_api_key_plaintext: d.palmApiKeyPlaintext,
  }));

export const marshalPatchInferenceEndpointBudgetPolicySchema = z
  .object({
    name: z.string().optional(),
    budgetPolicyId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    budget_policy_id: d.budgetPolicyId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPatchInferenceEndpointBudgetPolicy_ResponseSchema = z
  .object({
    budgetPolicyId: z.string().optional(),
    effectiveBudgetPolicyId: z.string().optional(),
  })
  .transform(d => ({
    budget_policy_id: d.budgetPolicyId,
    effective_budget_policy_id: d.effectiveBudgetPolicyId,
  }));

export const marshalPatchInferenceEndpointDescriptionSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPatchInferenceEndpointDescription_ResponseSchema = z
  .object({
    description: z.string().optional(),
  })
  .transform(d => ({
    description: d.description,
  }));

export const marshalPatchInferenceEndpointTagsSchema = z
  .object({
    name: z.string().optional(),
    addTags: z.array(z.lazy(() => marshalEndpointTagSchema)).optional(),
    deleteTags: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    add_tags: d.addTags,
    delete_tags: d.deleteTags,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPatchInferenceEndpointTags_ResponseSchema = z
  .object({
    tags: z.array(z.lazy(() => marshalEndpointTagSchema)).optional(),
  })
  .transform(d => ({
    tags: d.tags,
  }));

export const marshalPatchInferenceEndpointUsagePolicySchema = z
  .object({
    name: z.string().optional(),
    usagePolicyId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    usage_policy_id: d.usagePolicyId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPatchInferenceEndpointUsagePolicy_ResponseSchema = z
  .object({
    usagePolicyId: z.string().optional(),
    effectiveUsagePolicyId: z.string().optional(),
  })
  .transform(d => ({
    usage_policy_id: d.usagePolicyId,
    effective_usage_policy_id: d.effectiveUsagePolicyId,
  }));

export const marshalPathItemSchema = z
  .object({
    summary: z.string().optional(),
    description: z.string().optional(),
    get: z.lazy(() => marshalOperationSchema).optional(),
    put: z.lazy(() => marshalOperationSchema).optional(),
    post: z.lazy(() => marshalOperationSchema).optional(),
    delete: z.lazy(() => marshalOperationSchema).optional(),
    options: z.lazy(() => marshalOperationSchema).optional(),
    head: z.lazy(() => marshalOperationSchema).optional(),
    patch: z.lazy(() => marshalOperationSchema).optional(),
    trace: z.lazy(() => marshalOperationSchema).optional(),
  })
  .transform(d => ({
    summary: d.summary,
    description: d.description,
    get: d.get,
    put: d.put,
    post: d.post,
    delete: d.delete,
    options: d.options,
    head: d.head,
    patch: d.patch,
    trace: d.trace,
  }));

export const marshalPayloadTableSchema = z
  .object({
    name: z.string().optional(),
    status: z.string().optional(),
    statusMessage: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    status: d.status,
    status_message: d.statusMessage,
  }));

export const marshalPendingConfigSchema = z
  .object({
    servedEntities: z.array(z.lazy(() => marshalServedModelSchema)).optional(),
    servedModels: z.array(z.lazy(() => marshalServedModelSchema)).optional(),
    trafficConfig: z.lazy(() => marshalTrafficConfigSchema).optional(),
    configVersion: z.number().optional(),
    startTime: z.number().optional(),
    autoCaptureConfig: z.lazy(() => marshalAutoCaptureConfigSchema).optional(),
  })
  .transform(d => ({
    served_entities: d.servedEntities,
    served_models: d.servedModels,
    traffic_config: d.trafficConfig,
    config_version: d.configVersion,
    start_time: d.startTime,
    auto_capture_config: d.autoCaptureConfig,
  }));

export const marshalPiiSettingsSchema = z
  .object({
    behavior: z.enum(Behavior).optional(),
  })
  .transform(d => ({
    behavior: d.behavior,
  }));

export const marshalPtEndpointCoreConfigSchema = z
  .object({
    servedEntities: z
      .array(z.lazy(() => marshalPtServedModelSchema))
      .optional(),
    trafficConfig: z.lazy(() => marshalTrafficConfigSchema).optional(),
  })
  .transform(d => ({
    served_entities: d.servedEntities,
    traffic_config: d.trafficConfig,
  }));

export const marshalPtServedModelSchema = z
  .object({
    name: z.string().optional(),
    entityName: z.string().optional(),
    entityVersion: z.string().optional(),
    provisionedModelUnits: z.number().optional(),
    burstScalingEnabled: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    entity_name: d.entityName,
    entity_version: d.entityVersion,
    provisioned_model_units: d.provisionedModelUnits,
    burst_scaling_enabled: d.burstScalingEnabled,
  }));

export const marshalPutInferenceEndpointAiGatewaySchema = z
  .object({
    name: z.string().optional(),
    usageTrackingConfig: z
      .lazy(() => marshalUsageTrackingConfigSchema)
      .optional(),
    inferenceTableConfig: z
      .lazy(() => marshalInferenceTableConfigSchema)
      .optional(),
    rateLimits: z
      .array(z.lazy(() => marshalAiGatewayRateLimitSchema))
      .optional(),
    guardrails: z.lazy(() => marshalAiGuardrailsSchema).optional(),
    fallbackConfig: z.lazy(() => marshalFallbackConfigSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    usage_tracking_config: d.usageTrackingConfig,
    inference_table_config: d.inferenceTableConfig,
    rate_limits: d.rateLimits,
    guardrails: d.guardrails,
    fallback_config: d.fallbackConfig,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPutInferenceEndpointAiGateway_ResponseSchema = z
  .object({
    usageTrackingConfig: z
      .lazy(() => marshalUsageTrackingConfigSchema)
      .optional(),
    inferenceTableConfig: z
      .lazy(() => marshalInferenceTableConfigSchema)
      .optional(),
    rateLimits: z
      .array(z.lazy(() => marshalAiGatewayRateLimitSchema))
      .optional(),
    guardrails: z.lazy(() => marshalAiGuardrailsSchema).optional(),
    fallbackConfig: z.lazy(() => marshalFallbackConfigSchema).optional(),
  })
  .transform(d => ({
    usage_tracking_config: d.usageTrackingConfig,
    inference_table_config: d.inferenceTableConfig,
    rate_limits: d.rateLimits,
    guardrails: d.guardrails,
    fallback_config: d.fallbackConfig,
  }));

export const marshalPutInferenceEndpointConfigSchema = z
  .object({
    name: z.string().optional(),
    servedEntities: z.array(z.lazy(() => marshalServedModelSchema)).optional(),
    servedModels: z.array(z.lazy(() => marshalServedModelSchema)).optional(),
    trafficConfig: z.lazy(() => marshalTrafficConfigSchema).optional(),
    autoCaptureConfig: z.lazy(() => marshalAutoCaptureConfigSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    served_entities: d.servedEntities,
    served_models: d.servedModels,
    traffic_config: d.trafficConfig,
    auto_capture_config: d.autoCaptureConfig,
  }));

export const marshalPutInferenceEndpointRateLimitsSchema = z
  .object({
    name: z.string().optional(),
    rateLimits: z.array(z.lazy(() => marshalRateLimitSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    rate_limits: d.rateLimits,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPutInferenceEndpointRateLimits_ResponseSchema = z
  .object({
    rateLimits: z.array(z.lazy(() => marshalRateLimitSchema)).optional(),
  })
  .transform(d => ({
    rate_limits: d.rateLimits,
  }));

export const marshalPutPtEndpointConfigSchema = z
  .object({
    name: z.string().optional(),
    config: z.lazy(() => marshalPtEndpointCoreConfigSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    config: d.config,
  }));

export const marshalRateLimitSchema = z
  .object({
    calls: z.number().optional(),
    key: z.string().optional(),
    renewalPeriod: z.string().optional(),
  })
  .transform(d => ({
    calls: d.calls,
    key: d.key,
    renewal_period: d.renewalPeriod,
  }));

export const marshalRequestBodySchema = z
  .object({
    description: z.string().optional(),
    content: z
      .record(
        z.string(),
        z.lazy(() => marshalContentSchema)
      )
      .optional(),
  })
  .transform(d => ({
    description: d.description,
    content: d.content,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRequestBody_ContentEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.lazy(() => marshalContentSchema).optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalResponseSchema = z
  .object({
    description: z.string().optional(),
    content: z
      .record(
        z.string(),
        z.lazy(() => marshalContentSchema)
      )
      .optional(),
  })
  .transform(d => ({
    description: d.description,
    content: d.content,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalResponse_ContentEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.lazy(() => marshalContentSchema).optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalRouteSchema = z
  .object({
    servedModelName: z.string().optional(),
    trafficPercentage: z.number().optional(),
    servedEntityName: z.string().optional(),
  })
  .transform(d => ({
    served_model_name: d.servedModelName,
    traffic_percentage: d.trafficPercentage,
    served_entity_name: d.servedEntityName,
  }));

export const marshalSchemaSchema = z
  .object({
    description: z.string().optional(),
    required: z.array(z.string()).optional(),
    type: z.string().optional(),
    format: z.string().optional(),
    example: z.unknown().optional(),
    allOf: z.array(z.lazy(() => marshalSchemaSchema)).optional(),
    oneOf: z.array(z.lazy(() => marshalSchemaSchema)).optional(),
    anyOf: z.array(z.lazy(() => marshalSchemaSchema)).optional(),
    items: z.lazy(() => marshalSchemaSchema).optional(),
    properties: z
      .record(
        z.string(),
        z.lazy(() => marshalSchemaSchema)
      )
      .optional(),
    additionalProperties: z.lazy(() => marshalSchemaSchema).optional(),
    enum: z.array(z.string()).optional(),
    prefixItems: z.array(z.lazy(() => marshalSchemaSchema)).optional(),
    nullable: z.boolean().optional(),
    default: z.string().optional(),
    minItems: z.number().optional(),
    maxItems: z.number().optional(),
    examples: z.array(z.unknown()).optional(),
  })
  .transform(d => ({
    description: d.description,
    required: d.required,
    type: d.type,
    format: d.format,
    example: d.example,
    allOf: d.allOf,
    oneOf: d.oneOf,
    anyOf: d.anyOf,
    items: d.items,
    properties: d.properties,
    additionalProperties: d.additionalProperties,
    enum: d.enum,
    prefixItems: d.prefixItems,
    nullable: d.nullable,
    default: d.default,
    minItems: d.minItems,
    maxItems: d.maxItems,
    examples: d.examples,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalSchema_PropertiesEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.lazy(() => marshalSchemaSchema).optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalServedModelSchema = z
  .object({
    name: z.string().optional(),
    externalModel: z.lazy(() => marshalExternalModelSchema).optional(),
    entityName: z.string().optional(),
    entityVersion: z.string().optional(),
    minProvisionedThroughput: z.number().optional(),
    maxProvisionedThroughput: z.number().optional(),
    minProvisionedConcurrency: z.number().optional(),
    maxProvisionedConcurrency: z.number().optional(),
    workloadSize: z.string().optional(),
    provisionedModelUnits: z.number().optional(),
    burstScalingEnabled: z.boolean().optional(),
    scaleToZeroEnabled: z.boolean().optional(),
    modelName: z.string().optional(),
    modelVersion: z.string().optional(),
    environmentVars: z.record(z.string(), z.string()).optional(),
    instanceProfileArn: z.string().optional(),
    foundationModel: z.lazy(() => marshalFoundationModelSchema).optional(),
    state: z.lazy(() => marshalServedModelStateSchema).optional(),
    creator: z.string().optional(),
    creationTimestamp: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    external_model: d.externalModel,
    entity_name: d.entityName,
    entity_version: d.entityVersion,
    min_provisioned_throughput: d.minProvisionedThroughput,
    max_provisioned_throughput: d.maxProvisionedThroughput,
    min_provisioned_concurrency: d.minProvisionedConcurrency,
    max_provisioned_concurrency: d.maxProvisionedConcurrency,
    workload_size: d.workloadSize,
    provisioned_model_units: d.provisionedModelUnits,
    burst_scaling_enabled: d.burstScalingEnabled,
    scale_to_zero_enabled: d.scaleToZeroEnabled,
    model_name: d.modelName,
    model_version: d.modelVersion,
    environment_vars: d.environmentVars,
    instance_profile_arn: d.instanceProfileArn,
    foundation_model: d.foundationModel,
    state: d.state,
    creator: d.creator,
    creation_timestamp: d.creationTimestamp,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalServedModel_EnvironmentVarsEntrySchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalServedModelLiteSchema = z
  .object({
    name: z.string().optional(),
    modelName: z.string().optional(),
    entityName: z.string().optional(),
    modelVersion: z.string().optional(),
    entityVersion: z.string().optional(),
    externalModel: z.lazy(() => marshalExternalModelSchema).optional(),
    foundationModel: z.lazy(() => marshalFoundationModelSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    model_name: d.modelName,
    entity_name: d.entityName,
    model_version: d.modelVersion,
    entity_version: d.entityVersion,
    external_model: d.externalModel,
    foundation_model: d.foundationModel,
  }));

export const marshalServedModelStateSchema = z
  .object({
    deployment: z.enum(ServedModelDeploymentState).optional(),
    deploymentStateMessage: z.string().optional(),
  })
  .transform(d => ({
    deployment: d.deployment,
    deployment_state_message: d.deploymentStateMessage,
  }));

export const marshalServerSchema = z
  .object({
    url: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    url: d.url,
    description: d.description,
  }));

export const marshalTrafficConfigSchema = z
  .object({
    routes: z.array(z.lazy(() => marshalRouteSchema)).optional(),
  })
  .transform(d => ({
    routes: d.routes,
  }));

export const marshalUpdateInferenceEndpointNotificationsSchema = z
  .object({
    name: z.string().optional(),
    emailNotifications: z
      .lazy(() => marshalEmailNotificationsSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    email_notifications: d.emailNotifications,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalUpdateInferenceEndpointNotifications_ResponseSchema = z
  .object({
    name: z.string().optional(),
    emailNotifications: z
      .lazy(() => marshalEmailNotificationsSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    email_notifications: d.emailNotifications,
  }));

export const marshalUsageTrackingConfigSchema = z
  .object({
    enabled: z.boolean().optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
  }));
