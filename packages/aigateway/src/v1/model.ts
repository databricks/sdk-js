// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/**
 * Controls which fields are populated on each McpService in the response.
 * The server treats unset / VIEW_UNSPECIFIED as BASIC. Callers needing the
 * full configuration must request it explicitly with `view = FULL`.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ListMcpServicesRequest_View = {
  /** Server treats as BASIC. */
  VIEW_UNSPECIFIED: 'VIEW_UNSPECIFIED',
  /**
   * All fields populated, including the fully resolved `config`
   * (connection details) and rate-limit principal names.
   */
  FULL: 'FULL',
  /**
   * Envelope only: identifiers, ownership, timestamps, plus the persisted
   * `config` scalars (`include_tool_selectors`, `rate_limits` without
   * `principal`); `config.source_connection` is unset.
   */
  BASIC: 'BASIC',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ListMcpServicesRequest_View =
  | (typeof ListMcpServicesRequest_View)[keyof typeof ListMcpServicesRequest_View]
  | (string & {});

/**
 * Controls which fields are populated on each ModelProviderService in the
 * response. The server treats unset / VIEW_UNSPECIFIED as BASIC. Callers
 * needing the full configuration must request it explicitly with `view = FULL`.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ListModelProviderServicesRequest_View = {
  /** Server treats as BASIC. */
  VIEW_UNSPECIFIED: 'VIEW_UNSPECIFIED',
  /**
   * All fields populated, including the fully resolved `config`
   * (inference-table details) and rate-limit principal names.
   */
  FULL: 'FULL',
  /**
   * Envelope only: identifiers, ownership, timestamps, plus the persisted
   * `config` scalars (`targets`, `allow_all_targets`, `rate_limits` without
   * `principal`); the inference-table details are unset.
   */
  BASIC: 'BASIC',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ListModelProviderServicesRequest_View =
  | (typeof ListModelProviderServicesRequest_View)[keyof typeof ListModelProviderServicesRequest_View]
  | (string & {});

/**
 * Controls which fields are populated on each ModelService in the response.
 * The server treats unset / VIEW_UNSPECIFIED as BASIC. Callers needing the
 * full configuration must request it explicitly with `view = FULL`.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ListModelServicesRequest_View = {
  /** Server treats as BASIC. */
  VIEW_UNSPECIFIED: 'VIEW_UNSPECIFIED',
  /**
   * All fields populated, including the fully resolved `config`
   * (destinations and inference-table details) and rate-limit principal
   * names.
   */
  FULL: 'FULL',
  /**
   * Envelope only: identifiers, ownership, timestamps, plus the persisted
   * `config` scalars (`routing_strategy`, `rate_limits` without `principal`);
   * `destinations` and the inference-table details are unset.
   */
  BASIC: 'BASIC',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ListModelServicesRequest_View =
  | (typeof ListModelServicesRequest_View)[keyof typeof ListModelServicesRequest_View]
  | (string & {});

/**
 * Which Anthropic subscription tier the relayed OAuth token belongs to.
 * Immutable after Create (switching tiers changes which governance controls
 * the platform enforces). Only MAX and TEAM_ENTERPRISE differ in the
 * governance surface the gateway can enforce, not in how the token is
 * relayed.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ModelProviderServiceConfig_AnthropicProviderRelayedConfig_AnthropicRelayedPlanType =
  {
    /**
     * Personal Claude Max/Pro subscription. No gateway-enforced governance:
     * model selection, per-principal rate limits, and service policies (guard-
     * rails) cannot be enforced on a personal subscription and are rejected.
     */
    ANTHROPIC_RELAYED_PLAN_TYPE_MAX: 'ANTHROPIC_RELAYED_PLAN_TYPE_MAX',
    /**
     * Claude for Teams / Enterprise organization subscription. Supports the
     * full gateway governance surface: model allowlist (`targets` /
     * `allow_all_targets`), rate limits, and service policies.
     */
    ANTHROPIC_RELAYED_PLAN_TYPE_TEAM_ENTERPRISE:
      'ANTHROPIC_RELAYED_PLAN_TYPE_TEAM_ENTERPRISE',
  } as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ModelProviderServiceConfig_AnthropicProviderRelayedConfig_AnthropicRelayedPlanType =

    | (typeof ModelProviderServiceConfig_AnthropicProviderRelayedConfig_AnthropicRelayedPlanType)[keyof typeof ModelProviderServiceConfig_AnthropicProviderRelayedConfig_AnthropicRelayedPlanType]
    | (string & {});

/** External LLM provider for an EXTERNAL_FOUNDATION_MODEL destination. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ModelProviderServiceConfig_ExternalModelProviderType = {
  /** OpenAI (api.openai.com). Auth via API key. */
  EXTERNAL_MODEL_PROVIDER_TYPE_OPENAI: 'EXTERNAL_MODEL_PROVIDER_TYPE_OPENAI',
  /** Azure OpenAI Service. Auth via API key or Entra ID service principal. */
  EXTERNAL_MODEL_PROVIDER_TYPE_AZURE_OPENAI:
    'EXTERNAL_MODEL_PROVIDER_TYPE_AZURE_OPENAI',
  /** Anthropic (api.anthropic.com). Auth via API key. */
  EXTERNAL_MODEL_PROVIDER_TYPE_ANTHROPIC:
    'EXTERNAL_MODEL_PROVIDER_TYPE_ANTHROPIC',
  /** Amazon Bedrock. Auth via AWS credentials (access key + secret) or assumed role. */
  EXTERNAL_MODEL_PROVIDER_TYPE_AMAZON_BEDROCK:
    'EXTERNAL_MODEL_PROVIDER_TYPE_AMAZON_BEDROCK',
  /**
   * Custom OpenAI-compatible provider (any endpoint that speaks the OpenAI HTTP API).
   * Configured by `base_url` + API key.
   */
  EXTERNAL_MODEL_PROVIDER_TYPE_CUSTOM: 'EXTERNAL_MODEL_PROVIDER_TYPE_CUSTOM',
  /** Microsoft AI Foundry. Auth via API key plus Foundry endpoint URL. */
  EXTERNAL_MODEL_PROVIDER_TYPE_MICROSOFT_FOUNDRY:
    'EXTERNAL_MODEL_PROVIDER_TYPE_MICROSOFT_FOUNDRY',
  /** Google Gemini Enterprise. Auth via API key. */
  EXTERNAL_MODEL_PROVIDER_TYPE_GEMINI_ENTERPRISE:
    'EXTERNAL_MODEL_PROVIDER_TYPE_GEMINI_ENTERPRISE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ModelProviderServiceConfig_ExternalModelProviderType =
  | (typeof ModelProviderServiceConfig_ExternalModelProviderType)[keyof typeof ModelProviderServiceConfig_ExternalModelProviderType]
  | (string & {});

/** Backing-model category for a model service destination. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ModelServiceConfig_DestinationConfig_DestinationType = {
  /** A <Databricks> foundation model billed per token. */
  DESTINATION_TYPE_PAY_PER_TOKEN_FOUNDATION_MODEL:
    'DESTINATION_TYPE_PAY_PER_TOKEN_FOUNDATION_MODEL',
  /** A <Databricks> foundation model with provisioned throughput. */
  DESTINATION_TYPE_PROVISIONED_THROUGHPUT_FOUNDATION_MODEL:
    'DESTINATION_TYPE_PROVISIONED_THROUGHPUT_FOUNDATION_MODEL',
  /** An external LLM provider (OpenAI, Anthropic, Azure OpenAI, Bedrock, ...). */
  DESTINATION_TYPE_EXTERNAL_FOUNDATION_MODEL:
    'DESTINATION_TYPE_EXTERNAL_FOUNDATION_MODEL',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ModelServiceConfig_DestinationConfig_DestinationType =
  | (typeof ModelServiceConfig_DestinationConfig_DestinationType)[keyof typeof ModelServiceConfig_DestinationConfig_DestinationType]
  | (string & {});

/** Scope key for a rate limit. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RateLimit_RateLimitKey = {
  /** Rate limit applies to a specific user (matched on `principal`). */
  RATE_LIMIT_KEY_USER: 'RATE_LIMIT_KEY_USER',
  /** Rate limit applies to all members of a group (matched on `principal`). */
  RATE_LIMIT_KEY_USER_GROUP: 'RATE_LIMIT_KEY_USER_GROUP',
  /** Rate limit applies to a specific service principal (matched on `principal`). */
  RATE_LIMIT_KEY_SERVICE_PRINCIPAL: 'RATE_LIMIT_KEY_SERVICE_PRINCIPAL',
  /**
   * Rate limit applies to the parent service (ModelService or McpService) as a
   * whole, across all callers. Domain-neutral so the same enum can scope a
   * service-wide quota on either securable.
   */
  RATE_LIMIT_KEY_SERVICE: 'RATE_LIMIT_KEY_SERVICE',
  /** Default per-user rate limit applied when no more-specific rule matches. */
  RATE_LIMIT_KEY_USER_DEFAULT: 'RATE_LIMIT_KEY_USER_DEFAULT',
  /**
   * Rate limit scoped to a request tag (matched on `request_tag_key` and
   * optionally `request_tag_value`), independent of the caller principal.
   */
  RATE_LIMIT_KEY_REQUEST_TAG: 'RATE_LIMIT_KEY_REQUEST_TAG',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type RateLimit_RateLimitKey =
  | (typeof RateLimit_RateLimitKey)[keyof typeof RateLimit_RateLimitKey]
  | (string & {});

/** Renewal period for a rate limit. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const RateLimit_RateLimitRenewalPeriod = {
  /** Rate limit counters reset every minute. */
  RATE_LIMIT_RENEWAL_PERIOD_MINUTE: 'RATE_LIMIT_RENEWAL_PERIOD_MINUTE',
  /** Rate limit counters reset every hour. */
  RATE_LIMIT_RENEWAL_PERIOD_HOUR: 'RATE_LIMIT_RENEWAL_PERIOD_HOUR',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type RateLimit_RateLimitRenewalPeriod =
  | (typeof RateLimit_RateLimitRenewalPeriod)[keyof typeof RateLimit_RateLimitRenewalPeriod]
  | (string & {});

/** Request to create a new MCP service. */
export interface CreateMcpServiceRequest {
  /**
   * Name of the parent schema.
   * Format: `schemas/{catalog}.{schema}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  parent: string;
  /** Name for the MCP service, e.g. "my_mcp_service". */
  mcpServiceId: string;
  /**
   * The MCP service to create. The server populates `name` from `parent` +
   * `mcp_service_id`; clients should leave it unset.
   */
  mcpService: McpService;
}

/** Request to create a new model provider service. */
export interface CreateModelProviderServiceRequest {
  /**
   * Name of the parent schema.
   * Format: `schemas/{catalog}.{schema}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  parent: string;
  /** Name for the model provider service, e.g. "openai_prod". */
  modelProviderServiceId: string;
  /**
   * The model provider service to create. The server populates `name` from
   * `parent` + `model_provider_service_id`; clients should leave it unset.
   */
  modelProviderService: ModelProviderService;
}

/** Request to create a new model service. */
export interface CreateModelServiceRequest {
  /**
   * Name of the parent schema.
   * Format: `schemas/{catalog}.{schema}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  parent: string;
  /** Name for the model service, e.g. "my_model_service". */
  modelServiceId: string;
  /**
   * The model service to create. The server populates `name` from `parent` +
   * `model_service_id`; clients should leave it unset.
   */
  modelService: ModelService;
}

/** Request to delete an MCP service. */
export interface DeleteMcpServiceRequest {
  /**
   * Resource name of the MCP service.
   * Format: `mcp-services/{catalog}.{schema}.{mcp_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  name: string;
  /**
   * If-match precondition: when set, the delete proceeds only if the current
   * server-side etag matches. Empty means unconditional delete.
   */
  etag?: Uint8Array | undefined;
}

/** Request to delete a model provider service. */
export interface DeleteModelProviderServiceRequest {
  /**
   * Resource name of the model provider service.
   * Format: `model-provider-services/{catalog}.{schema}.{model_provider_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  name: string;
  /**
   * If-match precondition: when set, the delete proceeds only if the current
   * server-side etag matches. Empty means unconditional delete.
   */
  etag?: Uint8Array | undefined;
}

/** Request to delete a model service. */
export interface DeleteModelServiceRequest {
  /**
   * Resource name of the model service.
   * Format: `model-services/{catalog}.{schema}.{model_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  name: string;
  /**
   * If-match precondition: when set, the delete proceeds only if the current
   * server-side etag matches. Empty means unconditional delete.
   */
  etag?: Uint8Array | undefined;
}

/** Request to get an MCP service. */
export interface GetMcpServiceRequest {
  /**
   * Resource name of the MCP service.
   * Format: `mcp-services/{catalog}.{schema}.{mcp_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  name: string;
}

/** Request to get a model provider service. */
export interface GetModelProviderServiceRequest {
  /**
   * Resource name of the model provider service.
   * Format: `model-provider-services/{catalog}.{schema}.{model_provider_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  name: string;
}

/** Request to get a model service. */
export interface GetModelServiceRequest {
  /**
   * Resource name of the model service.
   * Format: `model-services/{catalog}.{schema}.{model_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  name: string;
}

/**
 * Inference table configuration for payload logging on a model service.
 *
 * `parent` is always REQUIRED when the sub-message is set; the destination
 * UC schema is needed to construct or rebind the payload TABLE regardless of
 * whether payload logging is currently active. Payload logging is active by
 * default; set `disabled = true` to pause runtime logging without dropping the
 * table or the binding.
 */
export interface InferenceTableConfig {
  /**
   * Parent UC schema where the inference table is created.
   * Format: `schemas/{catalog}.{schema}`. Set at create time and immutable
   * thereafter; changing it on an existing service is rejected.
   */
  parent: string;
  /**
   * Prefix for the inference-table's UC-registered name. The actual leaf name UC
   * stores is `<table_name_prefix>_payload`; the `_payload` suffix is appended
   * automatically. To find the actual UC table after Create, read the `table`
   * field on the response. Defaults to `<model_service_name>_payload` when unset.
   * Set at create time and immutable thereafter; changing it on an existing
   * service is rejected.
   */
  tableNamePrefix?: string | undefined;
  /**
   * Indicates whether payload logging is disabled (opt-out). Unset means that
   * payload logging is active (the on-by-default state coincides with the proto
   * zero-value, so the server never fills this field for a client that leaves it
   * unset). Set `disabled = true` to pause runtime logging while keeping the
   * sub-message attached (preserving `parent` and `table_name_prefix` for a
   * later flip back to active). `parent` remains required either way.
   */
  disabled?: boolean | undefined;
  /**
   * Resolved UC table for payload logs.
   * Format: `tables/{catalog}.{schema}.{table}`.
   */
  table?: string | undefined;
  /**
   * True when the bound inference TABLE has been deleted but the parent
   * service still references it. The dangling reference is surfaced (not
   * silently dropped) so callers can see the broken dependency. AI Gateway
   * payload logging fails closed in this state.
   */
  isDeleted?: boolean | undefined;
}

/**
 * Request to list MCP services. Accepts `parent`, `page_size`, and
 * `page_token`.
 */
export interface ListMcpServicesRequest {
  /**
   * Name of the parent schema to list within, as
   * `schemas/{catalog}.{schema}`. Each `{...}` component is capped at 255
   * characters individually.
   */
  parent?: string | undefined;
  /**
   * Maximum number of MCP services to return. Defaults to 100 when unset or 0;
   * the maximum is 100. Use `page_token` to retrieve additional pages.
   */
  pageSize?: number | undefined;
  /** Opaque pagination token from a previous request. */
  pageToken?: string | undefined;
  /**
   * View selector controlling which fields are populated per row. `FULL`
   * returns the full representation of the service; `BASIC` returns a more
   * compact version. Defaults to `BASIC` when unset.
   */
  view?: ListMcpServicesRequest_View | undefined;
}

/** Response for listing MCP services. */
export interface ListMcpServicesResponse {
  /** The list of MCP services. */
  mcpServices?: McpService[] | undefined;
  /** Pagination token for retrieving the next page of results. */
  nextPageToken?: string | undefined;
}

/**
 * Request to list model provider services. Accepts `parent`, `page_size`, and
 * `page_token`.
 */
export interface ListModelProviderServicesRequest {
  /**
   * Name of the parent schema to list within, as
   * `schemas/{catalog}.{schema}`. Each `{...}` component is capped at 255
   * characters individually.
   */
  parent?: string | undefined;
  /**
   * Maximum number of provider services to return. Defaults to 100 when unset or
   * 0; the maximum is 100. Use `page_token` to retrieve additional pages.
   */
  pageSize?: number | undefined;
  /** Opaque pagination token from a previous request. */
  pageToken?: string | undefined;
  /**
   * View selector controlling which fields are populated per row. `FULL`
   * returns the full representation of the service; `BASIC` returns a more
   * compact version. Defaults to `BASIC` when unset.
   */
  view?: ListModelProviderServicesRequest_View | undefined;
}

/** Response for listing model provider services. */
export interface ListModelProviderServicesResponse {
  /** The list of model provider services. */
  modelProviderServices?: ModelProviderService[] | undefined;
  /** Pagination token for retrieving the next page of results. */
  nextPageToken?: string | undefined;
}

/**
 * Request to list model services. Accepts `parent`, `page_size`, and
 * `page_token`.
 */
export interface ListModelServicesRequest {
  /**
   * Name of the parent schema to list within, as
   * `schemas/{catalog}.{schema}`. Each `{...}` component is capped at 255
   * characters individually.
   */
  parent?: string | undefined;
  /**
   * Maximum number of model services to return. Defaults to 100 when unset or 0;
   * the maximum is 100. Use `page_token` to retrieve additional pages.
   */
  pageSize?: number | undefined;
  /** Opaque pagination token from a previous request. */
  pageToken?: string | undefined;
  /**
   * View selector controlling which fields are populated per row. `FULL`
   * returns the full representation of the service; `BASIC` returns a more
   * compact version. Defaults to `BASIC` when unset.
   */
  view?: ListModelServicesRequest_View | undefined;
}

/** Response for listing model services. */
export interface ListModelServicesResponse {
  /** The list of model services. */
  modelServices?: ModelService[] | undefined;
  /** Pagination token for retrieving the next page of results. */
  nextPageToken?: string | undefined;
}

/**
 * A governed MCP server registration in Unity Catalog. Acts as a container
 * securable that references an MCP server -- customer-external via a UC
 * Connection, or <Databricks>-hosted via an internal server -- and
 * exposes its tools for discovery, authorization, and invocation.
 */
export interface McpService {
  /**
   * Resource name of the MCP service.
   * Format: `mcp-services/{catalog}.{schema}.{mcp_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   * Server-derived on Create from `parent` +
   * `mcp_service_id`; required and immutable on Update/Get/Delete.
   */
  name?: string | undefined;
  /** The owner of the MCP service. Write-only; read owner via effective_owner. */
  owner?: string | undefined;
  /**
   * The resolved owner of the MCP service. Falls back to the caller's identity
   * when `owner` is not explicitly set on creation.
   */
  effectiveOwner?: string | undefined;
  /** Metastore hosting the MCP service. */
  metastoreId?: string | undefined;
  /** When the MCP service was created. */
  createTime?: Temporal.Instant | undefined;
  /** Creator identity. */
  createdBy?: string | undefined;
  /** When the MCP service was last modified. */
  updateTime?: Temporal.Instant | undefined;
  /** Identity of the last updater. */
  updatedBy?: string | undefined;
  /** User-provided description. */
  comment?: string | undefined;
  /**
   * Operational configuration: connection, tool selectors, rate limit.
   * Required on CreateMcpService; on
   * UpdateMcpService it is required only when `config` (or a `config.*`
   * subpath) appears in `update_mask`.
   */
  config?: McpServiceConfig | undefined;
  /**
   * Optimistic concurrency control token. Server-generated from the
   * entity's state and returned on every read. To use it as an if-match
   * precondition on a mutation, echo the last-read value back via the dedicated
   * `etag` field on the Update / Delete request; the server rejects the mutation
   * if the stored etag differs.
   */
  etag?: Uint8Array | undefined;
}

/**
 * Operational configuration for an MCP service. Groups the source reference,
 * tool selectors, and rate limit -- the fields that configure how the MCP
 * service behaves at invocation time.
 */
export interface McpServiceConfig {
  /**
   * Polymorphic reference to where the MCP server lives. MCP_SERVICE is a
   * single-kind securable (`MCP_SERVICE_STANDARD`) with two source variants:
   * `source_connection` (a UC Connection FQN) and `internal` (a
   * <Databricks>-hosted MCP server).
   * (-- Future MANAGED variants (if introduced) would slot additional oneof
   * entries here. --)
   *
   * JSON shape: the active oneof variant appears as a sibling field on
   * `config` (proto JSON does not nest the oneof container name). E.g.:
   * { "config": {
   * "source_connection": {"name": "connections/main.default.gh"},
   * "include_tool_selectors": ["read_*"], ...
   * } }
   * { "config": { "internal": {"server": "sandbox"}, ... } }
   * Future variants slot in the same way: `{"config": {"app": {...}, ...}}`,
   * `{"config": {"genie": {...}, ...}}`, etc.
   * (-- The oneof shape lets future kinds add type-specific reference shapes
   * without a wire-format bump. --)
   */
  source?:
    | {
        $case: 'sourceConnection';
        /** UC Connection referencing the MCP server. */
        sourceConnection: McpServiceConfig_SourceConnection;
      }
    | undefined;
  /**
   * Glob or exact-match patterns selecting which tools from the MCP server
   * to expose. Prefix match for patterns with `*`, exact match otherwise.
   * An empty list means all tools are included. Per-element max 256 chars.
   */
  includeToolSelectors?: string[] | undefined;
  /**
   * Per-principal rate limits applied to tool invocations routed through this
   * MCP service. Repeated to support per-USER / USER_GROUP / SERVICE_PRINCIPAL
   * / SERVICE / USER_DEFAULT scopes simultaneously, mirroring the
   * `ModelServiceConfig.rate_limits` shape. Empty when no rate limit is
   * configured.
   */
  rateLimits?: RateLimit[] | undefined;
}

/**
 * UC Connection that hosts the MCP server. On create, provide `name` in the
 * schema-scoped form `connections/{catalog}.{schema}.{connection}`. On read,
 * the service populates the resolved connection metadata and preserves a
 * dangling source so callers can diagnose a deleted backing connection.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface McpServiceConfig_SourceConnection {
  /**
   * Name of the UC connection that hosts the MCP server, as
   * `connections/{catalog}.{schema}.{connection}`.
   */
  name: string;
  isDeleted?: boolean | undefined;
}

/**
 * A governed external model-provider connection stored in Unity Catalog (e.g.
 * an OpenAI API account, an Azure OpenAI deployment, an Amazon Bedrock
 * account). Owns the provider type and the auth/configuration the platform
 * needs to invoke that provider, and is referenced from
 * `ExternalModelConfig.model_provider_service` on a ModelService.
 *
 * One ModelProviderService can back many ModelServices (e.g. an `openai_prod`
 * provider serving multiple models); a single ModelService can fan out across
 * multiple ModelProviderServices for traffic split or failover.
 */
export interface ModelProviderService {
  /**
   * Resource name of the provider service.
   * Format: `model-provider-services/{catalog}.{schema}.{model_provider_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   * Server-derived on Create from `parent` +
   * `model_provider_service_id`; required and immutable on Update/Get/Delete.
   */
  name?: string | undefined;
  /**
   * The owner of the model provider service. Write-only; read owner via
   * effective_owner.
   */
  owner?: string | undefined;
  /**
   * The resolved owner of the model provider service. Falls back to the
   * caller's identity when `owner` is not explicitly set on creation.
   */
  effectiveOwner?: string | undefined;
  /** Metastore hosting the provider service. */
  metastoreId?: string | undefined;
  /** When the provider service was created. */
  createTime?: Temporal.Instant | undefined;
  /** Creator identity. */
  createdBy?: string | undefined;
  /** When the provider service was last modified. */
  updateTime?: Temporal.Instant | undefined;
  /** Identity of the last updater. */
  updatedBy?: string | undefined;
  /** User-provided description. */
  comment?: string | undefined;
  /**
   * Optimistic concurrency control token. Server-generated from the
   * entity's state and returned on every read. To use it as an if-match
   * precondition on a mutation, echo the last-read value back via the dedicated
   * `etag` field on the Update / Delete request; the server rejects the mutation
   * if the stored etag differs.
   */
  etag?: Uint8Array | undefined;
  /**
   * Behavioral configuration: provider connection, model catalog, and
   * passthrough policy. See `ModelProviderServiceConfig` for the per-field
   * contract. Required on CreateModelProviderService; on Update it is required
   * only when `config` (or a `config.*` subpath) appears in `update_mask`.
   */
  config?: ModelProviderServiceConfig | undefined;
}

/**
 * Behavioral configuration for a ModelProviderService: provider connection
 * (auth + provider-specific fields), the catalog of models this provider
 * service can route to, and the passthrough policy that governs how request
 * headers, query parameters, and unmanaged subpaths cross the trust boundary
 * to the upstream provider.
 */
export interface ModelProviderServiceConfig {
  /**
   * Provider type discriminator. Required at create time; immutable after.
   * Determines which variant of the `provider` oneof must be set. May not be
   * changed via Update; attempts to include `config.provider_type` in
   * `UpdateModelProviderServiceRequest.update_mask` are rejected.
   *
   * Required on CreateModelProviderService and immutable thereafter.
   */
  providerType?:
    | ModelProviderServiceConfig_ExternalModelProviderType
    | undefined;
  /**
   * Provider-specific configuration. Exactly one variant must be set, and it
   * must match `provider_type`; a request whose active variant disagrees with
   * `provider_type` is rejected with `INVALID_PARAMETER_VALUE`. Secret-bearing
   * fields nested inside each *DirectConfig (`api_key`, `aws_secret_access_key`,
   * `service_account_key`, ...) wrap a `ProviderSecret`: callers supply the
   * value as `ProviderSecret.plaintext` on writes, and the platform stores it
   * encrypted. Reads (Get and List) omit the plaintext; secret-bearing
   * fields appear in the response only as a presence indicator that a secret is
   * configured. Non-secret fields (`base_url`, `region`, `organization`,
   * `aws_access_key_id`, ...) round-trip directly.
   *
   * Declarative tooling (Terraform / DABs): the `plaintext` field is
   * INPUT_ONLY and never round-trips on reads, so a Terraform config that
   * supplies it will see a structural diff against the read state on every
   * `terraform plan` unless mitigated. Mitigations, in order of
   * preference: (a) use Terraform 1.11+ `WriteOnly` attribute on
   * `plaintext` in the <Databricks> provider schema; (b) add provider
   * `DiffSuppressFunc` for the secret field; (c) document
   * `lifecycle.ignore_changes = [<secret_field>]` for callers. The stored
   * secret is normally changed through `UpdateModelProviderService`.
   *
   * (-- Secrets are persisted as the encrypted credential of a per-MPS UC
   * SchemaConnection (`CONNECTION_HTTP_BEARER`). The auto-minted
   * SchemaConnection is user-owned but hidden from the user, so it is not
   * surfaced as a connection they manage directly even though the
   * credential could in principle be changed out of band. --)
   *
   * (-- Field-behavior on the per-provider config fields:
   * `(google.api.field_behavior) = OPTIONAL` everywhere on the
   * *DirectConfig descendants, with Create-time requirements enforced
   * in the validator. Proto-level REQUIRED is deliberately not used
   * per the `proto-required-vs-update-mask` guardrail: REQUIRED would
   * reject sparse Update requests that legitimately omit a field whose
   * value is unchanged, breaking AIP-134 partial-Update. The
   * user-facing javadoc on each field states which fields are required
   * on Create. --)
   */
  provider?:
    | {$case: 'openai'; openai: ModelProviderServiceConfig_OpenAiProviderConfig}
    | {
        $case: 'azureOpenai';
        azureOpenai: ModelProviderServiceConfig_AzureOpenAiProviderConfig;
      }
    | {
        $case: 'anthropic';
        anthropic: ModelProviderServiceConfig_AnthropicProviderConfig;
      }
    | {
        $case: 'amazonBedrock';
        amazonBedrock: ModelProviderServiceConfig_AmazonBedrockProviderConfig;
      }
    | {$case: 'custom'; custom: ModelProviderServiceConfig_CustomProviderConfig}
    | {
        $case: 'microsoftFoundry';
        microsoftFoundry: ModelProviderServiceConfig_MicrosoftFoundryProviderConfig;
      }
    | {
        $case: 'geminiEnterprise';
        geminiEnterprise: ModelProviderServiceConfig_GeminiEnterpriseProviderConfig;
      }
    | undefined;
  /**
   * When true, accepts any model exposed by the upstream provider; `targets`
   * is not required and does not restrict routability. When false, only
   * models listed in `targets` are routable.
   */
  allowAllTargets?: boolean | undefined;
  /**
   * Routing targets this provider service exposes (provider-side model
   * identifier + unified API types per entry). Required (>=1) when
   * `allow_all_targets = false`; optional and additive when
   * `allow_all_targets = true`. References from `ExternalModelConfig.target`
   * must match an entry here unless `allow_all_targets = true`.
   */
  targets?: ModelProviderServiceConfig_ModelTargetConfig[] | undefined;
  /**
   * Whether to forward incoming request headers to the upstream provider.
   * Applies to managed (multi-model) requests as well as passthrough requests
   * served by this provider service. Governance-level decision by the provider
   * service owner; not selectable per inference call.
   */
  forwardHeaders?: boolean | undefined;
  /**
   * Whether to forward incoming request query parameters to the upstream
   * provider. Same trust-boundary semantics as `forward_headers`.
   */
  forwardQueryParameters?: boolean | undefined;
  /**
   * Whether to forward request paths that fall outside this service's managed
   * API set to the upstream provider as opaque passthrough. When true,
   * requests addressed to subpaths not recognized by the managed API surface
   * are proxied to the upstream provider over the same provider connection.
   * When false, only managed-API paths are served. Governance-level decision
   * by the provider service owner; expanding this expands the trust boundary
   * that the ModelProviderService exposes.
   */
  forwardUnmanagedPaths?: boolean | undefined;
  /**
   * Rate limits applied when this provider service is invoked directly. When
   * it is invoked through a model service, the model service's own
   * `rate_limits` apply instead. Mirrors `ModelServiceConfig.rate_limits` /
   * `McpServiceConfig.rate_limits`.
   */
  rateLimits?: RateLimit[] | undefined;
  /**
   * Inference table configuration for payload logging when this provider
   * service is invoked directly. When it is invoked through a model service,
   * the model service's own inference table captures the invocation instead.
   * Mirrors `ModelServiceConfig.inference_table` /
   * `AgentServiceConfig.inference_table`.
   */
  inferenceTable?: InferenceTableConfig | undefined;
}

/** Amazon Bedrock provider configuration. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_AmazonBedrockProviderConfig {
  /**
   * Direct (inline-credentials) form: caller supplies AWS region + auth
   * (access-key pair) in the request body. Required on Create.
   * Provider configuration mode. Exactly one variant may be set.
   * (-- Wrapped in a oneof so future non-direct modes can be added as additional
   * variants without a breaking change. --)
   */
  providerMode?:
    | {
        $case: 'direct';
        direct: ModelProviderServiceConfig_AmazonBedrockProviderDirectConfig;
      }
    | undefined;
}

/**
 * Direct form of Amazon Bedrock provider config.
 *
 * Authentication is one of two mutually exclusive modes, exactly one of which
 * must be supplied on Create:
 * - Access keys: set `aws_access_key`, leave `service_credential` unset.
 * - UC service credential: set `service_credential.name` to the AIP-122
 * resource-name form `credentials/{name}`, leave `aws_access_key` unset. The
 * credential value lives in UC and is referenced by name, not held on this
 * message.
 * Setting more than one mode is rejected.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_AmazonBedrockProviderDirectConfig {
  /**
   * AWS region where the Bedrock endpoint is hosted (e.g., `us-east-1`).
   * Required on Create.
   */
  region?: string | undefined;
  /** Authentication mode. Exactly one variant may be set. */
  authMode?:
    | {
        $case: 'serviceCredential';
        /**
         * Reference to a UC service credential authorizing Bedrock requests. On
         * Create the caller supplies `service_credential.name` in the AIP-122
         * resource-name form `credentials/{name}`. Required on Create when using
         * UC-service-credential auth; mutually exclusive with `aws_access_key`. The
         * credential is referenced by name; its value is not carried here. On read the
         * resolved `id` and `is_deleted` are also populated. Only supported on AWS-hosted
         * workspaces; Create requests from other clouds are rejected with
         * INVALID_PARAMETER_VALUE.
         */
        serviceCredential: ModelProviderServiceConfig_ServiceCredential;
      }
    | {
        $case: 'awsAccessKey';
        /** AWS access-key-pair auth. Mutually exclusive with `service_credential`. */
        awsAccessKey: ModelProviderServiceConfig_AwsAccessKey;
      }
    | undefined;
}

/**
 * Anthropic provider configuration. Exactly one of `direct` or `relayed` must
 * be set on Create; the two are mutually exclusive.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_AnthropicProviderConfig {
  /**
   * Provider configuration mode. Exactly one variant may be set: an inline
   * credential (`direct`) or credential-less relaying (`relayed`).
   * (-- Anthropic is the only provider with a non-direct mode today. The oneof
   * enforces direct-vs-relayed exclusivity on the wire; the validator still
   * enforces that one of them is set on Create and per-mode completeness
   * (e.g. relayed.plan_type). --)
   */
  providerMode?:
    | {
        $case: 'direct';
        /**
         * Direct (inline-credentials) form: caller supplies the API key in the
         * request body. Required on Create unless `relayed` is set.
         */
        direct: ModelProviderServiceConfig_AnthropicProviderDirectConfig;
      }
    | {
        $case: 'relayed';
        /**
         * Relayed (credential-less) form: no Anthropic credential is stored. Each
         * inference request instead carries the caller's own OAuth token, which the
         * platform forwards to Anthropic on outbound requests. Mutually exclusive
         * with `direct`; no `api_key` is required or persisted.
         */
        relayed: ModelProviderServiceConfig_AnthropicProviderRelayedConfig;
      }
    | undefined;
}

/** Direct form of Anthropic provider config. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_AnthropicProviderDirectConfig {
  /**
   * Authentication mode. Exactly one variant may be set.
   * (-- Wrapped in a oneof so future auth modes (e.g. a UC service credential)
   * can be added as additional variants without a breaking change. --)
   */
  authMode?:
    | {
        $case: 'apiKey';
        /**
         * Anthropic API key. Required on Create. Sent as the `x-api-key` header on
         * outbound requests. Supplied as inline plaintext via
         * `ProviderSecret.plaintext`.
         */
        apiKey: ModelProviderServiceConfig_ProviderSecret;
      }
    | undefined;
}

/**
 * Relayed form of Anthropic provider config: no credential is stored.
 * Authentication is the caller's own OAuth token, forwarded to Anthropic on
 * outbound requests, so there is no persisted secret. Presence of this variant
 * is the signal that the provider service uses relayed auth; `plan_type`
 * further distinguishes which Anthropic subscription tier the token belongs to.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_AnthropicProviderRelayedConfig {
  /**
   * Which Anthropic subscription tier the relayed token belongs to. Optional;
   * when unset the MPS gets the full governance surface (see TEAM_ENTERPRISE).
   * Immutable after Create, so the tier cannot be flipped in place.
   */
  planType?:
    | ModelProviderServiceConfig_AnthropicProviderRelayedConfig_AnthropicRelayedPlanType
    | undefined;
}

/** AWS access-key-pair auth for Amazon Bedrock: a SigV4-signing key pair. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_AwsAccessKey {
  /**
   * AWS access key ID. Required on Create when using access-key auth. Treated as
   * username-equivalent (not a secret value): round-trips on reads and is
   * scrubbed from audit logs.
   */
  accessKeyId?: string | undefined;
  /**
   * AWS secret access key paired with `access_key_id`. Required on Create when
   * using access-key auth. Supplied as inline plaintext via
   * `ProviderSecret.plaintext`.
   */
  secretAccessKey?: ModelProviderServiceConfig_ProviderSecret | undefined;
}

/** Azure OpenAI provider configuration. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_AzureOpenAiProviderConfig {
  /**
   * Direct (inline-credentials) form: caller supplies the auth secrets and the
   * Azure endpoint base URL in the request body. Required on Create.
   * Provider configuration mode. Exactly one variant may be set.
   * (-- Wrapped in a oneof so future non-direct modes can be added as additional
   * variants without a breaking change. --)
   */
  providerMode?:
    | {
        $case: 'direct';
        direct: ModelProviderServiceConfig_AzureOpenAiProviderDirectConfig;
      }
    | undefined;
}

/**
 * Direct form of Azure OpenAI provider config. Exactly one of three
 * mutually-exclusive auth modes must be supplied on Create:
 * - API key: set `api_key`, leave `entra_service_principal` and
 * `service_credential` unset.
 * - Entra ID (service principal): set `entra_service_principal`, leave
 * `api_key` and `service_credential` unset.
 * - UC service credential: set `service_credential.name` to the AIP-122
 * resource-name form `credentials/{name}`, leave `api_key` and
 * `entra_service_principal` unset. The credential value lives in UC and is
 * referenced by name, not held on this message. Only supported on
 * Azure-hosted workspaces.
 * Setting more than one mode is rejected.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_AzureOpenAiProviderDirectConfig {
  /**
   * Full Azure OpenAI endpoint base URL, e.g.
   * `https://myresource.openai.azure.com`. Required on Create.
   */
  baseUrl?: string | undefined;
  /** Authentication mode. Exactly one variant may be set. */
  authMode?:
    | {
        $case: 'apiKey';
        /**
         * Azure OpenAI API key. Mutually exclusive with the Entra and
         * service-credential modes. Supplied as inline plaintext via
         * `ProviderSecret.plaintext`.
         */
        apiKey: ModelProviderServiceConfig_ProviderSecret;
      }
    | {
        $case: 'serviceCredential';
        /**
         * Reference to a UC service credential authorizing Azure OpenAI requests. On
         * Create the caller supplies `service_credential.name` in the AIP-122
         * resource-name form `credentials/{name}`. Required on Create when using
         * UC-service-credential auth; mutually exclusive with `api_key` and
         * `entra_service_principal`. The credential is
         * referenced by name; its value is not carried here. On read the resolved `id`
         * and `is_deleted` are also populated. Only supported on Azure-hosted
         * workspaces; Create requests from other clouds are rejected with
         * INVALID_PARAMETER_VALUE.
         */
        serviceCredential: ModelProviderServiceConfig_ServiceCredential;
      }
    | {
        $case: 'entraServicePrincipal';
        /**
         * Entra ID (service principal) auth. Mutually exclusive with `api_key` and
         * `service_credential`.
         */
        entraServicePrincipal: ModelProviderServiceConfig_EntraServicePrincipal;
      }
    | undefined;
}

/** Custom provider configuration: arbitrary HTTP endpoint with bearer-token auth. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_CustomProviderConfig {
  /**
   * Direct (inline-credentials) form: caller supplies the endpoint URL +
   * bearer token in the request body. Required on Create.
   * Provider configuration mode. Exactly one variant may be set.
   * (-- Wrapped in a oneof so future non-direct modes can be added as additional
   * variants without a breaking change. --)
   */
  providerMode?:
    | {
        $case: 'direct';
        direct: ModelProviderServiceConfig_CustomProviderDirectConfig;
      }
    | undefined;
}

/**
 * Direct form of custom provider config.
 *
 * Authentication is one of two mutually exclusive modes, exactly one of which
 * must be supplied on Create:
 * - Bearer: set `api_key`, leave `header_auth` unset. The secret is
 * forwarded as `Authorization: Bearer <secret>`.
 * - Header: set `header_auth`, leave `api_key` unset. The secret is
 * forwarded as `<api_key_name>: <api_key_value>`.
 * Setting both modes or neither mode is rejected.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_CustomProviderDirectConfig {
  /**
   * Endpoint URL of the OpenAI-compatible service (e.g.,
   * `https://api.example.com/v1`). Required on Create.
   */
  baseUrl?: string | undefined;
  /**
   * Authentication mode. Exactly one variant may be set.
   * (-- Mutual exclusivity is enforced by the oneof on the wire. --)
   */
  authMode?:
    | {
        $case: 'apiKey';
        /**
         * Bearer token forwarded as the `Authorization: Bearer ...` header on
         * outbound requests. Supplied as inline plaintext via
         * `ProviderSecret.plaintext`. Set this for bearer-token auth.
         */
        apiKey: ModelProviderServiceConfig_ProviderSecret;
      }
    | undefined;
}

/**
 * Entra ID (Azure AD) service-principal auth: AI Gateway exchanges the
 * `tenant_id` + `client_id` identify the service principal, and the `credential`
 * oneof proves that identity, exchanged for an Entra bearer token on outbound
 * requests via the OAuth2 client-credentials grant. Shared by the Azure OpenAI
 * and Microsoft Foundry provider configs.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_EntraServicePrincipal {
  /** Entra ID (Azure AD) tenant ID. Required on Create. */
  tenantId?: string | undefined;
  /** Entra ID client (application) ID. Required on Create. */
  clientId?: string | undefined;
  /**
   * How the service principal proves its identity. Exactly one variant must be
   * set on Create. Today only `client_secret` is supported.
   * (-- A oneof so additional proof mechanisms can be added as non-breaking
   * variants without changing the tenant_id / client_id identity fields. --)
   */
  credential?:
    | {
        $case: 'clientSecret';
        /**
         * Entra ID client secret. Supplied as inline plaintext via
         * `ProviderSecret.plaintext`.
         */
        clientSecret: ModelProviderServiceConfig_ProviderSecret;
      }
    | undefined;
}

/** Gemini Enterprise provider configuration. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_GeminiEnterpriseProviderConfig {
  /**
   * Direct (inline-credentials) form: caller supplies the API key in the
   * request body. Required on Create.
   * Provider configuration mode. Exactly one variant may be set.
   * (-- Wrapped in a oneof so future non-direct modes can be added as additional
   * variants without a breaking change. --)
   */
  providerMode?:
    | {
        $case: 'direct';
        direct: ModelProviderServiceConfig_GeminiEnterpriseProviderDirectConfig;
      }
    | undefined;
}

/**
 * Direct form of Gemini Enterprise provider config.
 *
 * Authentication is one of two mutually exclusive modes; exactly one must be
 * supplied on Create:
 * - API key: set `api_key`, leave `service_credential` unset.
 * - UC service credential: set `service_credential`, leave `api_key` unset.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_GeminiEnterpriseProviderDirectConfig {
  /** Authentication mode. Exactly one variant may be set. */
  authMode?:
    | {
        $case: 'apiKey';
        /**
         * Google Gemini Enterprise API key. Required on Create when using API-key
         * auth; mutually exclusive with `service_credential`. Supplied as inline
         * plaintext via `ProviderSecret.plaintext`.
         */
        apiKey: ModelProviderServiceConfig_ProviderSecret;
      }
    | undefined;
  /** GCP project ID hosting the Gemini Enterprise endpoint. Required on Create. */
  projectId?: string | undefined;
  /**
   * GCP region of the Gemini Enterprise endpoint (e.g., `us-central1`).
   * Required on Create.
   */
  region?: string | undefined;
}

/** Microsoft Foundry provider configuration. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_MicrosoftFoundryProviderConfig {
  /**
   * Direct (inline-credentials) form: caller supplies the Foundry endpoint
   * URL + API key in the request body. Required on Create.
   * Provider configuration mode. Exactly one variant may be set.
   * (-- Wrapped in a oneof so future non-direct modes can be added as additional
   * variants without a breaking change. --)
   */
  providerMode?:
    | {
        $case: 'direct';
        direct: ModelProviderServiceConfig_MicrosoftFoundryProviderDirectConfig;
      }
    | undefined;
}

/**
 * Direct form of Microsoft Foundry provider config.
 *
 * Authentication is one of three mutually exclusive modes, exactly one of which
 * must be supplied on Create:
 * - API key: set `api_key`, leave `entra_service_principal` and
 * `service_credential` unset.
 * - Entra ID (service principal): set `entra_service_principal`, leave
 * `api_key` and `service_credential` unset. AI Gateway exchanges these for
 * an Entra bearer token on outbound requests via the OAuth2
 * client-credentials grant.
 * - UC service credential: set `service_credential.name` to the AIP-122
 * resource-name form `credentials/{name}`, leave `api_key` and
 * `entra_service_principal` unset. The credential value lives in UC and is
 * referenced by name, not held on this message. Only supported on
 * Azure-hosted workspaces.
 * Setting more than one mode is rejected.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_MicrosoftFoundryProviderDirectConfig {
  /** Microsoft AI Foundry endpoint URL. Required on Create. */
  baseUrl?: string | undefined;
  /** Authentication mode. Exactly one variant may be set. */
  authMode?:
    | {
        $case: 'apiKey';
        /**
         * Microsoft AI Foundry API key. Mutually exclusive with the Entra and
         * service-credential modes. Supplied as inline plaintext via
         * `ProviderSecret.plaintext`.
         */
        apiKey: ModelProviderServiceConfig_ProviderSecret;
      }
    | {
        $case: 'serviceCredential';
        /**
         * Reference to a UC service credential authorizing Microsoft Foundry requests.
         * On Create the caller supplies `service_credential.name` in the AIP-122
         * resource-name form `credentials/{name}`. Required on Create when using
         * UC-service-credential auth; mutually exclusive with `api_key` and
         * `entra_service_principal`. The credential is
         * referenced by name; its value is not carried here. On read the resolved `id`
         * and `is_deleted` are also populated. Only supported on Azure-hosted
         * workspaces; Create requests from other clouds are rejected with
         * INVALID_PARAMETER_VALUE.
         */
        serviceCredential: ModelProviderServiceConfig_ServiceCredential;
      }
    | {
        $case: 'entraServicePrincipal';
        /**
         * Entra ID (service principal) auth. Mutually exclusive with `api_key` and
         * `service_credential`.
         */
        entraServicePrincipal: ModelProviderServiceConfig_EntraServicePrincipal;
      }
    | undefined;
}

/** Model target configuration for an external model destination. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_ModelTargetConfig {
  /**
   * Provider-side model identifier (e.g. "gpt-5", "claude-opus-4-7"). This is
   * a string on the LLM provider's side, not a UC entity. The UC governance
   * hook for external destinations is the ModelProviderService referenced by
   * `ExternalModelConfig.model_provider_service`, not the model itself.
   */
  model: string;
  /**
   * Provider-native API types the model supports (e.g.
   * "openai/v1/chat/completions"). Used by the platform for request/response
   * translation from the unified API type. At most 64 entries of at most 256
   * characters each; the list is persisted into the destination binding's
   * bounded storage envelope.
   */
  nativeApiTypes?: string[] | undefined;
}

/** OpenAI provider configuration. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_OpenAiProviderConfig {
  /**
   * Direct (inline-credentials) form: caller supplies the auth secrets in the
   * request body. Required on Create. Secret values are stored encrypted and
   * omitted from reads.
   * Provider configuration mode. Exactly one variant may be set.
   * (-- Wrapped in a oneof so future non-direct modes can be added as additional
   * variants without a breaking change. --)
   */
  providerMode?:
    | {
        $case: 'direct';
        direct: ModelProviderServiceConfig_OpenAiProviderDirectConfig;
      }
    | undefined;
}

/** Direct (inline-credentials) form of the OpenAI provider config. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_OpenAiProviderDirectConfig {
  /**
   * Authentication mode. Exactly one variant may be set.
   * (-- Wrapped in a oneof so future auth modes (e.g. a UC service credential)
   * can be added as additional variants without a breaking change. --)
   */
  authMode?:
    | {
        $case: 'apiKey';
        /**
         * OpenAI API key. Required on Create. Supplied as inline plaintext via
         * `ProviderSecret.plaintext`.
         */
        apiKey: ModelProviderServiceConfig_ProviderSecret;
      }
    | undefined;
  /**
   * Optional OpenAI organization ID. When set, the platform forwards it as
   * the `OpenAI-Organization` header.
   */
  organization?: string | undefined;
  /**
   * Optional custom base URL. Defaults to `https://api.openai.com/v1`. Use for
   * OpenAI-API-compatible third-party endpoints or in-network proxies.
   */
  baseUrl?: string | undefined;
}

/**
 * A secret value supplied as part of an inline provider config. The caller
 * supplies the value as inline `plaintext` on writes; the platform stores it
 * encrypted. The `plaintext` field is `INPUT_ONLY` and never round-trips on
 * reads.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_ProviderSecret {
  /**
   * How the credential value is supplied. Exactly one variant may be set.
   * (-- Wrapped in a oneof so a non-plaintext source can be added as an
   * additional variant without a breaking change; `secret_reference` is
   * that variant, and further sources can follow the same way. --)
   */
  value?:
    | {
        $case: 'plaintext';
        /**
         * Inline plaintext credential. INPUT_ONLY: the value never round-trips on
         * reads. Get and List responses omit `plaintext`; the field's presence in
         * the read shape only indicates that a secret is configured.
         */
        plaintext: string;
      }
    | undefined;
}

/**
 * ---- Provider configuration (nested; see the `provider` oneof below) ----
 * The customer-owned UC service credential a ModelProviderService uses to
 * authenticate to its provider, referenced by name.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelProviderServiceConfig_ServiceCredential {
  /**
   * Resource name of the bound UC service credential, in the AIP-122 form
   * `credentials/{name}` (a metastore-level single-part credential name). On
   * create the caller supplies the name here. On read it reflects the
   * credential's current name at read time.
   */
  name: string;
}

/**
 * A governed AI Gateway endpoint in Unity Catalog that routes inference
 * requests to one or more model destinations (for example a foundation model
 * or an external LLM reached through a ModelProviderService). Applies
 * centralized access control, rate limits, guardrails, and auditing to the
 * traffic it serves.
 */
export interface ModelService {
  /**
   * Resource name of the model service.
   * Format: `model-services/{catalog}.{schema}.{model_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   * Server-derived on Create from `parent` +
   * `model_service_id`; required and immutable on Update/Get/Delete.
   */
  name?: string | undefined;
  /** The owner of the model service. Write-only; read owner via effective_owner. */
  owner?: string | undefined;
  /**
   * The resolved owner of the ModelService. Falls back to the caller's identity
   * when `owner` is not explicitly set on creation.
   */
  effectiveOwner?: string | undefined;
  /** Metastore hosting the model service. */
  metastoreId?: string | undefined;
  /** When the model service was created. */
  createTime?: Temporal.Instant | undefined;
  /** Creator identity. */
  createdBy?: string | undefined;
  /** When the model service was last modified. */
  updateTime?: Temporal.Instant | undefined;
  /** Identity of the last updater. */
  updatedBy?: string | undefined;
  /** User-provided description. */
  comment?: string | undefined;
  /**
   * Operational configuration: destinations, routing, rate limits, inference
   * table. Required on CreateModelService; on UpdateModelService it is
   * required only when `config` (or a `config.*` subpath) appears in
   * `update_mask`.
   */
  config?: ModelServiceConfig | undefined;
  /**
   * Optimistic concurrency control token. Server-generated from the
   * entity's state and returned on every read. To use it as an if-match
   * precondition on a mutation, echo the last-read value back via the dedicated
   * `etag` field on the Update / Delete request; the server rejects the mutation
   * if the stored etag differs.
   */
  etag?: Uint8Array | undefined;
  /**
   * Unified API types this endpoint supports (e.g. "chat", "embeddings",
   * "completions"). Derived from the destinations' backing models / providers
   * at read time.
   */
  supportedApiTypes?: string[] | undefined;
}

/** Operational configuration wrapped around the ModelService resource. */
export interface ModelServiceConfig {
  /** Routing configuration: destinations, routing strategy, and fallback. */
  routing?: ModelServiceConfig_RoutingConfig | undefined;
  /** Rate limits applied to requests routed through this model service. */
  rateLimits?: RateLimit[] | undefined;
  /** Inference table config for payload logging. */
  inferenceTable?: InferenceTableConfig | undefined;
}

/**
 * A destination the model service can route traffic to. Exactly one of the
 * per-type configs inside `type_config` must be set, and it must match
 * `destination_type`.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelServiceConfig_DestinationConfig {
  /** User-facing label for this destination, used in routing references. */
  name: string;
  /** Backing-model category. Determines which oneof variant is populated. */
  destinationType: ModelServiceConfig_DestinationConfig_DestinationType;
  /**
   * Share of traffic sent to this destination, 0-100. Optional on fallback
   * destinations; see FallbackConfig.
   */
  trafficPercentage?: number | undefined;
  /** Destination-type-specific configuration. */
  typeConfig?:
    | {
        $case: 'payPerTokenConfig';
        payPerTokenConfig: ModelServiceConfig_PayPerTokenConfig;
      }
    | {
        $case: 'provisionedThroughputConfig';
        provisionedThroughputConfig: ModelServiceConfig_ProvisionedThroughputConfig;
      }
    | {
        $case: 'externalModelConfig';
        externalModelConfig: ModelServiceConfig_ExternalModelConfig;
      }
    | undefined;
  /**
   * True when the destination's backing UC entity (MODEL for foundation-model
   * destinations, MODEL_PROVIDER_SERVICE for external destinations) has been
   * deleted but the destination row still references it. The dangling
   * destination is surfaced (not silently dropped) so callers can see the
   * broken routing. Inference traffic through this destination fails closed
   * (BAD_REQUEST / FAILED_PRECONDITION).
   */
  isDeleted?: boolean | undefined;
}

/**
 * Configuration for an external-foundation-model destination. Provider auth
 * and provider-specific cloud configuration are owned by a separate, governed
 * ModelProviderService entity referenced via `model_provider_service`; the
 * platform resolves the provider at invocation time.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelServiceConfig_ExternalModelConfig {
  /**
   * Resource name of the governed ModelProviderService that owns provider
   * auth and provider-specific configuration. The referenced
   * ModelProviderService also carries the provider type, so this message
   * does not surface it directly.
   * Format: `model-provider-services/{catalog}.{schema}.{model_provider_service}`.
   * Each `{...}` component is capped at 255 characters individually.
   */
  modelProviderService: string;
  /**
   * Routing target for the destination: the provider-side model selected from
   * the referenced ModelProviderService's `targets` catalog, plus the unified
   * API types the platform should translate to/from at request time.
   */
  target: ModelProviderServiceConfig_ModelTargetConfig;
}

/**
 * Fallback routing, applied after the primary destination returns a retryable
 * error. Traversal is in list order; the attempt count is the length of the
 * list.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelServiceConfig_FallbackConfig {
  /**
   * Ordered list of fallback destinations. Traversal is in list order; the
   * attempt count is the length of the list. At most 5 are allowed.
   */
  destinations?: ModelServiceConfig_DestinationConfig[] | undefined;
}

/**
 * Configuration for a pay-per-token foundation-model destination. Identifies
 * the foundation model by its UC resource name; the platform resolves it to a
 * Model Serving endpoint at request time.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelServiceConfig_PayPerTokenConfig {
  /**
   * Resource name of the UC model.
   * Format: `models/{catalog}.{schema}.{model}`.
   */
  model: string;
}

/**
 * Configuration for a provisioned-throughput foundation-model destination.
 * References a pre-existing Model Serving endpoint that serves the model;
 * sizing (provisioned throughput, burst scaling, model version) is owned by
 * the Model Serving endpoint itself, not by this message.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelServiceConfig_ProvisionedThroughputConfig {
  /**
   * Name of the backing Model Serving endpoint serving the provisioned-
   * throughput foundation model, as the AIP-122 typed resource name
   * `serving-endpoints/{name}`. The same UC model can be served on multiple
   * Model Serving endpoints (different throughput / region / config); the
   * caller picks which one this destination routes to. The endpoint must
   * exist at create time.
   */
  modelServingEndpoint: string;
  /**
   * UC model FQN of the model served by the backing endpoint (e.g.,
   * `system.ai.databricks-claude-opus-4-6`). Resolved from Model Serving at
   * Create/Update time.
   */
  model?: string | undefined;
}

/**
 * Routing configuration for a model service, nesting destinations, routing
 * strategy, and fallback under a single sub-message.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ModelServiceConfig_RoutingConfig {
  /**
   * Primary routing destinations. At most 10 are allowed. At least one is
   * required on CreateModelService; on UpdateModelService it is required only
   * when `config.routing` (or a `config.routing.*` subpath) appears in
   * `update_mask`.
   */
  destinations?: ModelServiceConfig_DestinationConfig[] | undefined;
  /** Selects how requests are distributed across destinations. */
  routingStrategy?:
    | {
        $case: 'trafficSplitting';
        /**
         * Marker message selecting request-based traffic splitting. Traffic is
         * distributed according to each destination's traffic_percentage value;
         * no configuration lives on this message itself.
         */
        trafficSplitting: ModelServiceConfig_RoutingConfig_TrafficSplitting;
      }
    | undefined;
  /** Fallback routing config, applied after primary destinations fail. */
  fallback?: ModelServiceConfig_FallbackConfig | undefined;
  /**
   * Timeout for the first token of a streaming response. If a destination does
   * not return its first token within this duration, AI Gateway aborts the
   * attempt and fails over to the next destination. Applies to streaming
   * requests only. Leave unset for no first-token timeout.
   */
  firstTokenTimeout?: Temporal.Duration | undefined;
}

/**
 * Marker message selecting request-based traffic splitting across primary
 * destinations. Split weights are read from each DestinationConfig.traffic_percentage.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface ModelServiceConfig_RoutingConfig_TrafficSplitting {}

/**
 * A rate limit applied to service requests. Leave `requests` or `tokens`
 * unset to impose no limit on that dimension; set a value to cap that dimension
 * within the renewal period.
 */
export interface RateLimit {
  /** Scope key. Determines whether `principal` is required. */
  key: RateLimit_RateLimitKey;
  /** Renewal period. */
  renewalPeriod: RateLimit_RateLimitRenewalPeriod;
  /**
   * Principal this limit applies to: user email, group name, or service
   * principal application ID. Required unless `key` is
   * `RATE_LIMIT_KEY_SERVICE`, `RATE_LIMIT_KEY_USER_DEFAULT`, or
   * `RATE_LIMIT_KEY_REQUEST_TAG` (which must not set a principal).
   */
  principal?: string | undefined;
  /** Max requests allowed within a renewal period. Leave unset for no request limit. */
  requests?: bigint | undefined;
  /** Max tokens allowed within a renewal period. Leave unset for no token limit. */
  tokens?: bigint | undefined;
  /**
   * Request tag key this limit applies to. Required when `key` is
   * `RATE_LIMIT_KEY_REQUEST_TAG`, forbidden otherwise.
   */
  requestTagKey?: string | undefined;
  /**
   * Request tag value this limit applies to. Only valid when `key` is
   * `RATE_LIMIT_KEY_REQUEST_TAG`. Leave unset to apply the limit to every
   * value of `request_tag_key` (an any-value default); a set value is a
   * specific override for that value.
   */
  requestTagValue?: string | undefined;
}

/** Request to update an MCP service. `name` cannot appear in `update_mask`. */
export interface UpdateMcpServiceRequest {
  /**
   * The MCP service with the updated field values. `name` identifies the
   * resource (`mcp-services/{catalog}.{schema}.{mcp_service}`); only fields
   * listed in `update_mask` are applied.
   */
  mcpService: McpService;
  /**
   * The list of fields to update. The framework validates each path against
   * the `mcp_service` field above. Wildcard paths (`paths: ["*"]`) are not
   * supported; list each field path explicitly.
   */
  updateMask: FieldMask<McpService>;
  /**
   * If-match precondition: when set, the update proceeds only if the
   * current server-side etag matches. Empty means an unconditional update.
   */
  etag?: Uint8Array | undefined;
}

/**
 * Request to update a model provider service. `name` and `provider_type`
 * cannot appear in `update_mask`.
 */
export interface UpdateModelProviderServiceRequest {
  /**
   * The model provider service with the updated field values. `name`
   * identifies the resource
   * (`model-provider-services/{catalog}.{schema}.{model_provider_service}`);
   * only fields listed in `update_mask` are applied.
   */
  modelProviderService: ModelProviderService;
  /**
   * The list of fields to update. The framework validates each path against
   * the `model_provider_service` field above. Wildcard paths (`paths: ["*"]`)
   * are not supported; list each field path explicitly.
   */
  updateMask: FieldMask<ModelProviderService>;
  /**
   * If-match precondition: when set, the update proceeds only if the
   * current server-side etag matches. Empty means an unconditional update.
   */
  etag?: Uint8Array | undefined;
}

/**
 * Request to update a model service. `name` cannot appear in `update_mask`;
 * the model service name is immutable.
 */
export interface UpdateModelServiceRequest {
  /**
   * The model service with the updated field values. `name` identifies the
   * resource (`model-services/{catalog}.{schema}.{model_service}`); only
   * fields listed in `update_mask` are applied.
   */
  modelService: ModelService;
  /**
   * The list of fields to update. The framework validates each path against
   * the `model_service` field above. Wildcard paths (`paths: ["*"]`) are not
   * supported; list each field path explicitly.
   */
  updateMask: FieldMask<ModelService>;
  /**
   * If-match precondition: when set, the update proceeds only if the
   * current server-side etag matches. Empty means an unconditional update.
   */
  etag?: Uint8Array | undefined;
}

export const unmarshalInferenceTableConfigSchema: z.ZodType<InferenceTableConfig> =
  z
    .object({
      parent: z.string(),
      table_name_prefix: z.string().optional(),
      disabled: z.boolean().optional(),
      table: z.string().optional(),
      is_deleted: z.boolean().optional(),
    })
    .transform(d => ({
      parent: d.parent,
      tableNamePrefix: d.table_name_prefix,
      disabled: d.disabled,
      table: d.table,
      isDeleted: d.is_deleted,
    }));

export const unmarshalListMcpServicesResponseSchema: z.ZodType<ListMcpServicesResponse> =
  z
    .object({
      mcp_services: z.array(z.lazy(() => unmarshalMcpServiceSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      mcpServices: d.mcp_services,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListModelProviderServicesResponseSchema: z.ZodType<ListModelProviderServicesResponse> =
  z
    .object({
      model_provider_services: z
        .array(z.lazy(() => unmarshalModelProviderServiceSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      modelProviderServices: d.model_provider_services,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListModelServicesResponseSchema: z.ZodType<ListModelServicesResponse> =
  z
    .object({
      model_services: z
        .array(z.lazy(() => unmarshalModelServiceSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      modelServices: d.model_services,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMcpServiceSchema: z.ZodType<McpService> = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    effective_owner: z.string().optional(),
    metastore_id: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    created_by: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updated_by: z.string().optional(),
    comment: z.string().optional(),
    config: z.lazy(() => unmarshalMcpServiceConfigSchema).optional(),
    etag: z
      .string()
      .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    effectiveOwner: d.effective_owner,
    metastoreId: d.metastore_id,
    createTime: d.create_time,
    createdBy: d.created_by,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
    comment: d.comment,
    config: d.config,
    etag: d.etag,
  }));

export const unmarshalMcpServiceConfigSchema: z.ZodType<McpServiceConfig> = z
  .object({
    source_connection: z
      .lazy(() => unmarshalMcpServiceConfig_SourceConnectionSchema)
      .optional(),
    include_tool_selectors: z.array(z.string()).optional(),
    rate_limits: z.array(z.lazy(() => unmarshalRateLimitSchema)).optional(),
  })
  .transform(d => ({
    source:
      d.source_connection !== undefined
        ? {
            $case: 'sourceConnection' as const,
            sourceConnection: d.source_connection,
          }
        : undefined,
    includeToolSelectors: d.include_tool_selectors,
    rateLimits: d.rate_limits,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalMcpServiceConfig_SourceConnectionSchema: z.ZodType<McpServiceConfig_SourceConnection> =
  z
    .object({
      name: z.string(),
      is_deleted: z.boolean().optional(),
    })
    .transform(d => ({
      name: d.name,
      isDeleted: d.is_deleted,
    }));

export const unmarshalModelProviderServiceSchema: z.ZodType<ModelProviderService> =
  z
    .object({
      name: z.string().optional(),
      owner: z.string().optional(),
      effective_owner: z.string().optional(),
      metastore_id: z.string().optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      created_by: z.string().optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      updated_by: z.string().optional(),
      comment: z.string().optional(),
      etag: z
        .string()
        .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
        .optional(),
      config: z
        .lazy(() => unmarshalModelProviderServiceConfigSchema)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      owner: d.owner,
      effectiveOwner: d.effective_owner,
      metastoreId: d.metastore_id,
      createTime: d.create_time,
      createdBy: d.created_by,
      updateTime: d.update_time,
      updatedBy: d.updated_by,
      comment: d.comment,
      etag: d.etag,
      config: d.config,
    }));

export const unmarshalModelProviderServiceConfigSchema: z.ZodType<ModelProviderServiceConfig> =
  z
    .object({
      provider_type: z.string().optional(),
      openai: z
        .lazy(
          () => unmarshalModelProviderServiceConfig_OpenAiProviderConfigSchema
        )
        .optional(),
      azure_openai: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_AzureOpenAiProviderConfigSchema
        )
        .optional(),
      anthropic: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_AnthropicProviderConfigSchema
        )
        .optional(),
      amazon_bedrock: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_AmazonBedrockProviderConfigSchema
        )
        .optional(),
      custom: z
        .lazy(
          () => unmarshalModelProviderServiceConfig_CustomProviderConfigSchema
        )
        .optional(),
      microsoft_foundry: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_MicrosoftFoundryProviderConfigSchema
        )
        .optional(),
      gemini_enterprise: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_GeminiEnterpriseProviderConfigSchema
        )
        .optional(),
      allow_all_targets: z.boolean().optional(),
      targets: z
        .array(
          z.lazy(
            () => unmarshalModelProviderServiceConfig_ModelTargetConfigSchema
          )
        )
        .optional(),
      forward_headers: z.boolean().optional(),
      forward_query_parameters: z.boolean().optional(),
      forward_unmanaged_paths: z.boolean().optional(),
      rate_limits: z.array(z.lazy(() => unmarshalRateLimitSchema)).optional(),
      inference_table: z
        .lazy(() => unmarshalInferenceTableConfigSchema)
        .optional(),
    })
    .transform(d => ({
      providerType: d.provider_type,
      provider:
        d.openai !== undefined
          ? {$case: 'openai' as const, openai: d.openai}
          : d.azure_openai !== undefined
            ? {$case: 'azureOpenai' as const, azureOpenai: d.azure_openai}
            : d.anthropic !== undefined
              ? {$case: 'anthropic' as const, anthropic: d.anthropic}
              : d.amazon_bedrock !== undefined
                ? {
                    $case: 'amazonBedrock' as const,
                    amazonBedrock: d.amazon_bedrock,
                  }
                : d.custom !== undefined
                  ? {$case: 'custom' as const, custom: d.custom}
                  : d.microsoft_foundry !== undefined
                    ? {
                        $case: 'microsoftFoundry' as const,
                        microsoftFoundry: d.microsoft_foundry,
                      }
                    : d.gemini_enterprise !== undefined
                      ? {
                          $case: 'geminiEnterprise' as const,
                          geminiEnterprise: d.gemini_enterprise,
                        }
                      : undefined,
      allowAllTargets: d.allow_all_targets,
      targets: d.targets,
      forwardHeaders: d.forward_headers,
      forwardQueryParameters: d.forward_query_parameters,
      forwardUnmanagedPaths: d.forward_unmanaged_paths,
      rateLimits: d.rate_limits,
      inferenceTable: d.inference_table,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_AmazonBedrockProviderConfigSchema: z.ZodType<ModelProviderServiceConfig_AmazonBedrockProviderConfig> =
  z
    .object({
      direct: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_AmazonBedrockProviderDirectConfigSchema
        )
        .optional(),
    })
    .transform(d => ({
      providerMode:
        d.direct !== undefined
          ? {$case: 'direct' as const, direct: d.direct}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_AmazonBedrockProviderDirectConfigSchema: z.ZodType<ModelProviderServiceConfig_AmazonBedrockProviderDirectConfig> =
  z
    .object({
      region: z.string().optional(),
      service_credential: z
        .lazy(() => unmarshalModelProviderServiceConfig_ServiceCredentialSchema)
        .optional(),
      aws_access_key: z
        .lazy(() => unmarshalModelProviderServiceConfig_AwsAccessKeySchema)
        .optional(),
    })
    .transform(d => ({
      region: d.region,
      authMode:
        d.service_credential !== undefined
          ? {
              $case: 'serviceCredential' as const,
              serviceCredential: d.service_credential,
            }
          : d.aws_access_key !== undefined
            ? {$case: 'awsAccessKey' as const, awsAccessKey: d.aws_access_key}
            : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_AnthropicProviderConfigSchema: z.ZodType<ModelProviderServiceConfig_AnthropicProviderConfig> =
  z
    .object({
      direct: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_AnthropicProviderDirectConfigSchema
        )
        .optional(),
      relayed: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_AnthropicProviderRelayedConfigSchema
        )
        .optional(),
    })
    .transform(d => ({
      providerMode:
        d.direct !== undefined
          ? {$case: 'direct' as const, direct: d.direct}
          : d.relayed !== undefined
            ? {$case: 'relayed' as const, relayed: d.relayed}
            : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_AnthropicProviderDirectConfigSchema: z.ZodType<ModelProviderServiceConfig_AnthropicProviderDirectConfig> =
  z
    .object({
      api_key: z
        .lazy(() => unmarshalModelProviderServiceConfig_ProviderSecretSchema)
        .optional(),
    })
    .transform(d => ({
      authMode:
        d.api_key !== undefined
          ? {$case: 'apiKey' as const, apiKey: d.api_key}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_AnthropicProviderRelayedConfigSchema: z.ZodType<ModelProviderServiceConfig_AnthropicProviderRelayedConfig> =
  z
    .object({
      plan_type: z.string().optional(),
    })
    .transform(d => ({
      planType: d.plan_type,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_AwsAccessKeySchema: z.ZodType<ModelProviderServiceConfig_AwsAccessKey> =
  z
    .object({
      access_key_id: z.string().optional(),
      secret_access_key: z
        .lazy(() => unmarshalModelProviderServiceConfig_ProviderSecretSchema)
        .optional(),
    })
    .transform(d => ({
      accessKeyId: d.access_key_id,
      secretAccessKey: d.secret_access_key,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_AzureOpenAiProviderConfigSchema: z.ZodType<ModelProviderServiceConfig_AzureOpenAiProviderConfig> =
  z
    .object({
      direct: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_AzureOpenAiProviderDirectConfigSchema
        )
        .optional(),
    })
    .transform(d => ({
      providerMode:
        d.direct !== undefined
          ? {$case: 'direct' as const, direct: d.direct}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_AzureOpenAiProviderDirectConfigSchema: z.ZodType<ModelProviderServiceConfig_AzureOpenAiProviderDirectConfig> =
  z
    .object({
      base_url: z.string().optional(),
      api_key: z
        .lazy(() => unmarshalModelProviderServiceConfig_ProviderSecretSchema)
        .optional(),
      service_credential: z
        .lazy(() => unmarshalModelProviderServiceConfig_ServiceCredentialSchema)
        .optional(),
      entra_service_principal: z
        .lazy(
          () => unmarshalModelProviderServiceConfig_EntraServicePrincipalSchema
        )
        .optional(),
    })
    .transform(d => ({
      baseUrl: d.base_url,
      authMode:
        d.api_key !== undefined
          ? {$case: 'apiKey' as const, apiKey: d.api_key}
          : d.service_credential !== undefined
            ? {
                $case: 'serviceCredential' as const,
                serviceCredential: d.service_credential,
              }
            : d.entra_service_principal !== undefined
              ? {
                  $case: 'entraServicePrincipal' as const,
                  entraServicePrincipal: d.entra_service_principal,
                }
              : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_CustomProviderConfigSchema: z.ZodType<ModelProviderServiceConfig_CustomProviderConfig> =
  z
    .object({
      direct: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_CustomProviderDirectConfigSchema
        )
        .optional(),
    })
    .transform(d => ({
      providerMode:
        d.direct !== undefined
          ? {$case: 'direct' as const, direct: d.direct}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_CustomProviderDirectConfigSchema: z.ZodType<ModelProviderServiceConfig_CustomProviderDirectConfig> =
  z
    .object({
      base_url: z.string().optional(),
      api_key: z
        .lazy(() => unmarshalModelProviderServiceConfig_ProviderSecretSchema)
        .optional(),
    })
    .transform(d => ({
      baseUrl: d.base_url,
      authMode:
        d.api_key !== undefined
          ? {$case: 'apiKey' as const, apiKey: d.api_key}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_EntraServicePrincipalSchema: z.ZodType<ModelProviderServiceConfig_EntraServicePrincipal> =
  z
    .object({
      tenant_id: z.string().optional(),
      client_id: z.string().optional(),
      client_secret: z
        .lazy(() => unmarshalModelProviderServiceConfig_ProviderSecretSchema)
        .optional(),
    })
    .transform(d => ({
      tenantId: d.tenant_id,
      clientId: d.client_id,
      credential:
        d.client_secret !== undefined
          ? {$case: 'clientSecret' as const, clientSecret: d.client_secret}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_GeminiEnterpriseProviderConfigSchema: z.ZodType<ModelProviderServiceConfig_GeminiEnterpriseProviderConfig> =
  z
    .object({
      direct: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_GeminiEnterpriseProviderDirectConfigSchema
        )
        .optional(),
    })
    .transform(d => ({
      providerMode:
        d.direct !== undefined
          ? {$case: 'direct' as const, direct: d.direct}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_GeminiEnterpriseProviderDirectConfigSchema: z.ZodType<ModelProviderServiceConfig_GeminiEnterpriseProviderDirectConfig> =
  z
    .object({
      api_key: z
        .lazy(() => unmarshalModelProviderServiceConfig_ProviderSecretSchema)
        .optional(),
      project_id: z.string().optional(),
      region: z.string().optional(),
    })
    .transform(d => ({
      authMode:
        d.api_key !== undefined
          ? {$case: 'apiKey' as const, apiKey: d.api_key}
          : undefined,
      projectId: d.project_id,
      region: d.region,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_MicrosoftFoundryProviderConfigSchema: z.ZodType<ModelProviderServiceConfig_MicrosoftFoundryProviderConfig> =
  z
    .object({
      direct: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_MicrosoftFoundryProviderDirectConfigSchema
        )
        .optional(),
    })
    .transform(d => ({
      providerMode:
        d.direct !== undefined
          ? {$case: 'direct' as const, direct: d.direct}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_MicrosoftFoundryProviderDirectConfigSchema: z.ZodType<ModelProviderServiceConfig_MicrosoftFoundryProviderDirectConfig> =
  z
    .object({
      base_url: z.string().optional(),
      api_key: z
        .lazy(() => unmarshalModelProviderServiceConfig_ProviderSecretSchema)
        .optional(),
      service_credential: z
        .lazy(() => unmarshalModelProviderServiceConfig_ServiceCredentialSchema)
        .optional(),
      entra_service_principal: z
        .lazy(
          () => unmarshalModelProviderServiceConfig_EntraServicePrincipalSchema
        )
        .optional(),
    })
    .transform(d => ({
      baseUrl: d.base_url,
      authMode:
        d.api_key !== undefined
          ? {$case: 'apiKey' as const, apiKey: d.api_key}
          : d.service_credential !== undefined
            ? {
                $case: 'serviceCredential' as const,
                serviceCredential: d.service_credential,
              }
            : d.entra_service_principal !== undefined
              ? {
                  $case: 'entraServicePrincipal' as const,
                  entraServicePrincipal: d.entra_service_principal,
                }
              : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_ModelTargetConfigSchema: z.ZodType<ModelProviderServiceConfig_ModelTargetConfig> =
  z
    .object({
      model: z.string(),
      native_api_types: z.array(z.string()).optional(),
    })
    .transform(d => ({
      model: d.model,
      nativeApiTypes: d.native_api_types,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_OpenAiProviderConfigSchema: z.ZodType<ModelProviderServiceConfig_OpenAiProviderConfig> =
  z
    .object({
      direct: z
        .lazy(
          () =>
            unmarshalModelProviderServiceConfig_OpenAiProviderDirectConfigSchema
        )
        .optional(),
    })
    .transform(d => ({
      providerMode:
        d.direct !== undefined
          ? {$case: 'direct' as const, direct: d.direct}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_OpenAiProviderDirectConfigSchema: z.ZodType<ModelProviderServiceConfig_OpenAiProviderDirectConfig> =
  z
    .object({
      api_key: z
        .lazy(() => unmarshalModelProviderServiceConfig_ProviderSecretSchema)
        .optional(),
      organization: z.string().optional(),
      base_url: z.string().optional(),
    })
    .transform(d => ({
      authMode:
        d.api_key !== undefined
          ? {$case: 'apiKey' as const, apiKey: d.api_key}
          : undefined,
      organization: d.organization,
      baseUrl: d.base_url,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_ProviderSecretSchema: z.ZodType<ModelProviderServiceConfig_ProviderSecret> =
  z
    .object({
      plaintext: z.string().optional(),
    })
    .transform(d => ({
      value:
        d.plaintext !== undefined
          ? {$case: 'plaintext' as const, plaintext: d.plaintext}
          : undefined,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelProviderServiceConfig_ServiceCredentialSchema: z.ZodType<ModelProviderServiceConfig_ServiceCredential> =
  z
    .object({
      name: z.string(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const unmarshalModelServiceSchema: z.ZodType<ModelService> = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    effective_owner: z.string().optional(),
    metastore_id: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    created_by: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updated_by: z.string().optional(),
    comment: z.string().optional(),
    config: z.lazy(() => unmarshalModelServiceConfigSchema).optional(),
    etag: z
      .string()
      .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
      .optional(),
    supported_api_types: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    effectiveOwner: d.effective_owner,
    metastoreId: d.metastore_id,
    createTime: d.create_time,
    createdBy: d.created_by,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
    comment: d.comment,
    config: d.config,
    etag: d.etag,
    supportedApiTypes: d.supported_api_types,
  }));

export const unmarshalModelServiceConfigSchema: z.ZodType<ModelServiceConfig> =
  z
    .object({
      routing: z
        .lazy(() => unmarshalModelServiceConfig_RoutingConfigSchema)
        .optional(),
      rate_limits: z.array(z.lazy(() => unmarshalRateLimitSchema)).optional(),
      inference_table: z
        .lazy(() => unmarshalInferenceTableConfigSchema)
        .optional(),
    })
    .transform(d => ({
      routing: d.routing,
      rateLimits: d.rate_limits,
      inferenceTable: d.inference_table,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelServiceConfig_DestinationConfigSchema: z.ZodType<ModelServiceConfig_DestinationConfig> =
  z
    .object({
      name: z.string(),
      destination_type: z.string(),
      traffic_percentage: z.number().optional(),
      pay_per_token_config: z
        .lazy(() => unmarshalModelServiceConfig_PayPerTokenConfigSchema)
        .optional(),
      provisioned_throughput_config: z
        .lazy(
          () => unmarshalModelServiceConfig_ProvisionedThroughputConfigSchema
        )
        .optional(),
      external_model_config: z
        .lazy(() => unmarshalModelServiceConfig_ExternalModelConfigSchema)
        .optional(),
      is_deleted: z.boolean().optional(),
    })
    .transform(d => ({
      name: d.name,
      destinationType: d.destination_type,
      trafficPercentage: d.traffic_percentage,
      typeConfig:
        d.pay_per_token_config !== undefined
          ? {
              $case: 'payPerTokenConfig' as const,
              payPerTokenConfig: d.pay_per_token_config,
            }
          : d.provisioned_throughput_config !== undefined
            ? {
                $case: 'provisionedThroughputConfig' as const,
                provisionedThroughputConfig: d.provisioned_throughput_config,
              }
            : d.external_model_config !== undefined
              ? {
                  $case: 'externalModelConfig' as const,
                  externalModelConfig: d.external_model_config,
                }
              : undefined,
      isDeleted: d.is_deleted,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelServiceConfig_ExternalModelConfigSchema: z.ZodType<ModelServiceConfig_ExternalModelConfig> =
  z
    .object({
      model_provider_service: z.string(),
      target: z.lazy(
        () => unmarshalModelProviderServiceConfig_ModelTargetConfigSchema
      ),
    })
    .transform(d => ({
      modelProviderService: d.model_provider_service,
      target: d.target,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelServiceConfig_FallbackConfigSchema: z.ZodType<ModelServiceConfig_FallbackConfig> =
  z
    .object({
      destinations: z
        .array(
          z.lazy(() => unmarshalModelServiceConfig_DestinationConfigSchema)
        )
        .optional(),
    })
    .transform(d => ({
      destinations: d.destinations,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelServiceConfig_PayPerTokenConfigSchema: z.ZodType<ModelServiceConfig_PayPerTokenConfig> =
  z
    .object({
      model: z.string(),
    })
    .transform(d => ({
      model: d.model,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelServiceConfig_ProvisionedThroughputConfigSchema: z.ZodType<ModelServiceConfig_ProvisionedThroughputConfig> =
  z
    .object({
      model_serving_endpoint: z.string(),
      model: z.string().optional(),
    })
    .transform(d => ({
      modelServingEndpoint: d.model_serving_endpoint,
      model: d.model,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelServiceConfig_RoutingConfigSchema: z.ZodType<ModelServiceConfig_RoutingConfig> =
  z
    .object({
      destinations: z
        .array(
          z.lazy(() => unmarshalModelServiceConfig_DestinationConfigSchema)
        )
        .optional(),
      traffic_splitting: z
        .lazy(
          () => unmarshalModelServiceConfig_RoutingConfig_TrafficSplittingSchema
        )
        .optional(),
      fallback: z
        .lazy(() => unmarshalModelServiceConfig_FallbackConfigSchema)
        .optional(),
      first_token_timeout: z
        .string()
        .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
        .optional(),
    })
    .transform(d => ({
      destinations: d.destinations,
      routingStrategy:
        d.traffic_splitting !== undefined
          ? {
              $case: 'trafficSplitting' as const,
              trafficSplitting: d.traffic_splitting,
            }
          : undefined,
      fallback: d.fallback,
      firstTokenTimeout: d.first_token_timeout,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalModelServiceConfig_RoutingConfig_TrafficSplittingSchema: z.ZodType<ModelServiceConfig_RoutingConfig_TrafficSplitting> =
  z.object({});

export const unmarshalRateLimitSchema: z.ZodType<RateLimit> = z
  .object({
    key: z.string(),
    renewal_period: z.string(),
    principal: z.string().optional(),
    requests: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    tokens: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    request_tag_key: z.string().optional(),
    request_tag_value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    renewalPeriod: d.renewal_period,
    principal: d.principal,
    requests: d.requests,
    tokens: d.tokens,
    requestTagKey: d.request_tag_key,
    requestTagValue: d.request_tag_value,
  }));

export const marshalInferenceTableConfigSchema: z.ZodType = z
  .object({
    parent: z.string(),
    tableNamePrefix: z.string().optional(),
    disabled: z.boolean().optional(),
    table: z.string().optional(),
    isDeleted: z.boolean().optional(),
  })
  .transform(d => ({
    parent: d.parent,
    table_name_prefix: d.tableNamePrefix,
    disabled: d.disabled,
    table: d.table,
    is_deleted: d.isDeleted,
  }));

export const marshalMcpServiceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    effectiveOwner: z.string().optional(),
    metastoreId: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    createdBy: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.string().optional(),
    comment: z.string().optional(),
    config: z.lazy(() => marshalMcpServiceConfigSchema).optional(),
    etag: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    effective_owner: d.effectiveOwner,
    metastore_id: d.metastoreId,
    create_time: d.createTime,
    created_by: d.createdBy,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    comment: d.comment,
    config: d.config,
    etag: d.etag,
  }));

export const marshalMcpServiceConfigSchema: z.ZodType = z
  .object({
    source: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('sourceConnection'),
          sourceConnection: z.lazy(
            () => marshalMcpServiceConfig_SourceConnectionSchema
          ),
        }),
      ])
      .optional(),
    includeToolSelectors: z.array(z.string()).optional(),
    rateLimits: z.array(z.lazy(() => marshalRateLimitSchema)).optional(),
  })
  .transform(d => ({
    ...(d.source?.$case === 'sourceConnection' && {
      source_connection: d.source.sourceConnection,
    }),
    include_tool_selectors: d.includeToolSelectors,
    rate_limits: d.rateLimits,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalMcpServiceConfig_SourceConnectionSchema: z.ZodType = z
  .object({
    name: z.string(),
    isDeleted: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    is_deleted: d.isDeleted,
  }));

export const marshalModelProviderServiceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    effectiveOwner: z.string().optional(),
    metastoreId: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    createdBy: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.string().optional(),
    comment: z.string().optional(),
    etag: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
    config: z.lazy(() => marshalModelProviderServiceConfigSchema).optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    effective_owner: d.effectiveOwner,
    metastore_id: d.metastoreId,
    create_time: d.createTime,
    created_by: d.createdBy,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    comment: d.comment,
    etag: d.etag,
    config: d.config,
  }));

export const marshalModelProviderServiceConfigSchema: z.ZodType = z
  .object({
    providerType: z.string().optional(),
    provider: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('openai'),
          openai: z.lazy(
            () => marshalModelProviderServiceConfig_OpenAiProviderConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('azureOpenai'),
          azureOpenai: z.lazy(
            () =>
              marshalModelProviderServiceConfig_AzureOpenAiProviderConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('anthropic'),
          anthropic: z.lazy(
            () =>
              marshalModelProviderServiceConfig_AnthropicProviderConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('amazonBedrock'),
          amazonBedrock: z.lazy(
            () =>
              marshalModelProviderServiceConfig_AmazonBedrockProviderConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('custom'),
          custom: z.lazy(
            () => marshalModelProviderServiceConfig_CustomProviderConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('microsoftFoundry'),
          microsoftFoundry: z.lazy(
            () =>
              marshalModelProviderServiceConfig_MicrosoftFoundryProviderConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('geminiEnterprise'),
          geminiEnterprise: z.lazy(
            () =>
              marshalModelProviderServiceConfig_GeminiEnterpriseProviderConfigSchema
          ),
        }),
      ])
      .optional(),
    allowAllTargets: z.boolean().optional(),
    targets: z
      .array(
        z.lazy(() => marshalModelProviderServiceConfig_ModelTargetConfigSchema)
      )
      .optional(),
    forwardHeaders: z.boolean().optional(),
    forwardQueryParameters: z.boolean().optional(),
    forwardUnmanagedPaths: z.boolean().optional(),
    rateLimits: z.array(z.lazy(() => marshalRateLimitSchema)).optional(),
    inferenceTable: z.lazy(() => marshalInferenceTableConfigSchema).optional(),
  })
  .transform(d => ({
    provider_type: d.providerType,
    ...(d.provider?.$case === 'openai' && {openai: d.provider.openai}),
    ...(d.provider?.$case === 'azureOpenai' && {
      azure_openai: d.provider.azureOpenai,
    }),
    ...(d.provider?.$case === 'anthropic' && {anthropic: d.provider.anthropic}),
    ...(d.provider?.$case === 'amazonBedrock' && {
      amazon_bedrock: d.provider.amazonBedrock,
    }),
    ...(d.provider?.$case === 'custom' && {custom: d.provider.custom}),
    ...(d.provider?.$case === 'microsoftFoundry' && {
      microsoft_foundry: d.provider.microsoftFoundry,
    }),
    ...(d.provider?.$case === 'geminiEnterprise' && {
      gemini_enterprise: d.provider.geminiEnterprise,
    }),
    allow_all_targets: d.allowAllTargets,
    targets: d.targets,
    forward_headers: d.forwardHeaders,
    forward_query_parameters: d.forwardQueryParameters,
    forward_unmanaged_paths: d.forwardUnmanagedPaths,
    rate_limits: d.rateLimits,
    inference_table: d.inferenceTable,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_AmazonBedrockProviderConfigSchema: z.ZodType =
  z
    .object({
      providerMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('direct'),
            direct: z.lazy(
              () =>
                marshalModelProviderServiceConfig_AmazonBedrockProviderDirectConfigSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.providerMode?.$case === 'direct' && {
        direct: d.providerMode.direct,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_AmazonBedrockProviderDirectConfigSchema: z.ZodType =
  z
    .object({
      region: z.string().optional(),
      authMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('serviceCredential'),
            serviceCredential: z.lazy(
              () => marshalModelProviderServiceConfig_ServiceCredentialSchema
            ),
          }),
          z.object({
            $case: z.literal('awsAccessKey'),
            awsAccessKey: z.lazy(
              () => marshalModelProviderServiceConfig_AwsAccessKeySchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      region: d.region,
      ...(d.authMode?.$case === 'serviceCredential' && {
        service_credential: d.authMode.serviceCredential,
      }),
      ...(d.authMode?.$case === 'awsAccessKey' && {
        aws_access_key: d.authMode.awsAccessKey,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_AnthropicProviderConfigSchema: z.ZodType =
  z
    .object({
      providerMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('direct'),
            direct: z.lazy(
              () =>
                marshalModelProviderServiceConfig_AnthropicProviderDirectConfigSchema
            ),
          }),
          z.object({
            $case: z.literal('relayed'),
            relayed: z.lazy(
              () =>
                marshalModelProviderServiceConfig_AnthropicProviderRelayedConfigSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.providerMode?.$case === 'direct' && {
        direct: d.providerMode.direct,
      }),
      ...(d.providerMode?.$case === 'relayed' && {
        relayed: d.providerMode.relayed,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_AnthropicProviderDirectConfigSchema: z.ZodType =
  z
    .object({
      authMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('apiKey'),
            apiKey: z.lazy(
              () => marshalModelProviderServiceConfig_ProviderSecretSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.authMode?.$case === 'apiKey' && {api_key: d.authMode.apiKey}),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_AnthropicProviderRelayedConfigSchema: z.ZodType =
  z
    .object({
      planType: z.string().optional(),
    })
    .transform(d => ({
      plan_type: d.planType,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_AwsAccessKeySchema: z.ZodType = z
  .object({
    accessKeyId: z.string().optional(),
    secretAccessKey: z
      .lazy(() => marshalModelProviderServiceConfig_ProviderSecretSchema)
      .optional(),
  })
  .transform(d => ({
    access_key_id: d.accessKeyId,
    secret_access_key: d.secretAccessKey,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_AzureOpenAiProviderConfigSchema: z.ZodType =
  z
    .object({
      providerMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('direct'),
            direct: z.lazy(
              () =>
                marshalModelProviderServiceConfig_AzureOpenAiProviderDirectConfigSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.providerMode?.$case === 'direct' && {
        direct: d.providerMode.direct,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_AzureOpenAiProviderDirectConfigSchema: z.ZodType =
  z
    .object({
      baseUrl: z.string().optional(),
      authMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('apiKey'),
            apiKey: z.lazy(
              () => marshalModelProviderServiceConfig_ProviderSecretSchema
            ),
          }),
          z.object({
            $case: z.literal('serviceCredential'),
            serviceCredential: z.lazy(
              () => marshalModelProviderServiceConfig_ServiceCredentialSchema
            ),
          }),
          z.object({
            $case: z.literal('entraServicePrincipal'),
            entraServicePrincipal: z.lazy(
              () =>
                marshalModelProviderServiceConfig_EntraServicePrincipalSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      base_url: d.baseUrl,
      ...(d.authMode?.$case === 'apiKey' && {api_key: d.authMode.apiKey}),
      ...(d.authMode?.$case === 'serviceCredential' && {
        service_credential: d.authMode.serviceCredential,
      }),
      ...(d.authMode?.$case === 'entraServicePrincipal' && {
        entra_service_principal: d.authMode.entraServicePrincipal,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_CustomProviderConfigSchema: z.ZodType =
  z
    .object({
      providerMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('direct'),
            direct: z.lazy(
              () =>
                marshalModelProviderServiceConfig_CustomProviderDirectConfigSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.providerMode?.$case === 'direct' && {
        direct: d.providerMode.direct,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_CustomProviderDirectConfigSchema: z.ZodType =
  z
    .object({
      baseUrl: z.string().optional(),
      authMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('apiKey'),
            apiKey: z.lazy(
              () => marshalModelProviderServiceConfig_ProviderSecretSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      base_url: d.baseUrl,
      ...(d.authMode?.$case === 'apiKey' && {api_key: d.authMode.apiKey}),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_EntraServicePrincipalSchema: z.ZodType =
  z
    .object({
      tenantId: z.string().optional(),
      clientId: z.string().optional(),
      credential: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('clientSecret'),
            clientSecret: z.lazy(
              () => marshalModelProviderServiceConfig_ProviderSecretSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      tenant_id: d.tenantId,
      client_id: d.clientId,
      ...(d.credential?.$case === 'clientSecret' && {
        client_secret: d.credential.clientSecret,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_GeminiEnterpriseProviderConfigSchema: z.ZodType =
  z
    .object({
      providerMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('direct'),
            direct: z.lazy(
              () =>
                marshalModelProviderServiceConfig_GeminiEnterpriseProviderDirectConfigSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.providerMode?.$case === 'direct' && {
        direct: d.providerMode.direct,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_GeminiEnterpriseProviderDirectConfigSchema: z.ZodType =
  z
    .object({
      authMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('apiKey'),
            apiKey: z.lazy(
              () => marshalModelProviderServiceConfig_ProviderSecretSchema
            ),
          }),
        ])
        .optional(),
      projectId: z.string().optional(),
      region: z.string().optional(),
    })
    .transform(d => ({
      ...(d.authMode?.$case === 'apiKey' && {api_key: d.authMode.apiKey}),
      project_id: d.projectId,
      region: d.region,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_MicrosoftFoundryProviderConfigSchema: z.ZodType =
  z
    .object({
      providerMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('direct'),
            direct: z.lazy(
              () =>
                marshalModelProviderServiceConfig_MicrosoftFoundryProviderDirectConfigSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.providerMode?.$case === 'direct' && {
        direct: d.providerMode.direct,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_MicrosoftFoundryProviderDirectConfigSchema: z.ZodType =
  z
    .object({
      baseUrl: z.string().optional(),
      authMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('apiKey'),
            apiKey: z.lazy(
              () => marshalModelProviderServiceConfig_ProviderSecretSchema
            ),
          }),
          z.object({
            $case: z.literal('serviceCredential'),
            serviceCredential: z.lazy(
              () => marshalModelProviderServiceConfig_ServiceCredentialSchema
            ),
          }),
          z.object({
            $case: z.literal('entraServicePrincipal'),
            entraServicePrincipal: z.lazy(
              () =>
                marshalModelProviderServiceConfig_EntraServicePrincipalSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      base_url: d.baseUrl,
      ...(d.authMode?.$case === 'apiKey' && {api_key: d.authMode.apiKey}),
      ...(d.authMode?.$case === 'serviceCredential' && {
        service_credential: d.authMode.serviceCredential,
      }),
      ...(d.authMode?.$case === 'entraServicePrincipal' && {
        entra_service_principal: d.authMode.entraServicePrincipal,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_ModelTargetConfigSchema: z.ZodType =
  z
    .object({
      model: z.string(),
      nativeApiTypes: z.array(z.string()).optional(),
    })
    .transform(d => ({
      model: d.model,
      native_api_types: d.nativeApiTypes,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_OpenAiProviderConfigSchema: z.ZodType =
  z
    .object({
      providerMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('direct'),
            direct: z.lazy(
              () =>
                marshalModelProviderServiceConfig_OpenAiProviderDirectConfigSchema
            ),
          }),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.providerMode?.$case === 'direct' && {
        direct: d.providerMode.direct,
      }),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_OpenAiProviderDirectConfigSchema: z.ZodType =
  z
    .object({
      authMode: z
        .discriminatedUnion('$case', [
          z.object({
            $case: z.literal('apiKey'),
            apiKey: z.lazy(
              () => marshalModelProviderServiceConfig_ProviderSecretSchema
            ),
          }),
        ])
        .optional(),
      organization: z.string().optional(),
      baseUrl: z.string().optional(),
    })
    .transform(d => ({
      ...(d.authMode?.$case === 'apiKey' && {api_key: d.authMode.apiKey}),
      organization: d.organization,
      base_url: d.baseUrl,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_ProviderSecretSchema: z.ZodType =
  z
    .object({
      value: z
        .discriminatedUnion('$case', [
          z.object({$case: z.literal('plaintext'), plaintext: z.string()}),
        ])
        .optional(),
    })
    .transform(d => ({
      ...(d.value?.$case === 'plaintext' && {plaintext: d.value.plaintext}),
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelProviderServiceConfig_ServiceCredentialSchema: z.ZodType =
  z
    .object({
      name: z.string(),
    })
    .transform(d => ({
      name: d.name,
    }));

export const marshalModelServiceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    effectiveOwner: z.string().optional(),
    metastoreId: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    createdBy: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.string().optional(),
    comment: z.string().optional(),
    config: z.lazy(() => marshalModelServiceConfigSchema).optional(),
    etag: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
    supportedApiTypes: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    effective_owner: d.effectiveOwner,
    metastore_id: d.metastoreId,
    create_time: d.createTime,
    created_by: d.createdBy,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    comment: d.comment,
    config: d.config,
    etag: d.etag,
    supported_api_types: d.supportedApiTypes,
  }));

export const marshalModelServiceConfigSchema: z.ZodType = z
  .object({
    routing: z
      .lazy(() => marshalModelServiceConfig_RoutingConfigSchema)
      .optional(),
    rateLimits: z.array(z.lazy(() => marshalRateLimitSchema)).optional(),
    inferenceTable: z.lazy(() => marshalInferenceTableConfigSchema).optional(),
  })
  .transform(d => ({
    routing: d.routing,
    rate_limits: d.rateLimits,
    inference_table: d.inferenceTable,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelServiceConfig_DestinationConfigSchema: z.ZodType = z
  .object({
    name: z.string(),
    destinationType: z.string(),
    trafficPercentage: z.number().optional(),
    typeConfig: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('payPerTokenConfig'),
          payPerTokenConfig: z.lazy(
            () => marshalModelServiceConfig_PayPerTokenConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('provisionedThroughputConfig'),
          provisionedThroughputConfig: z.lazy(
            () => marshalModelServiceConfig_ProvisionedThroughputConfigSchema
          ),
        }),
        z.object({
          $case: z.literal('externalModelConfig'),
          externalModelConfig: z.lazy(
            () => marshalModelServiceConfig_ExternalModelConfigSchema
          ),
        }),
      ])
      .optional(),
    isDeleted: z.boolean().optional(),
  })
  .transform(d => ({
    name: d.name,
    destination_type: d.destinationType,
    traffic_percentage: d.trafficPercentage,
    ...(d.typeConfig?.$case === 'payPerTokenConfig' && {
      pay_per_token_config: d.typeConfig.payPerTokenConfig,
    }),
    ...(d.typeConfig?.$case === 'provisionedThroughputConfig' && {
      provisioned_throughput_config: d.typeConfig.provisionedThroughputConfig,
    }),
    ...(d.typeConfig?.$case === 'externalModelConfig' && {
      external_model_config: d.typeConfig.externalModelConfig,
    }),
    is_deleted: d.isDeleted,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelServiceConfig_ExternalModelConfigSchema: z.ZodType = z
  .object({
    modelProviderService: z.string(),
    target: z.lazy(
      () => marshalModelProviderServiceConfig_ModelTargetConfigSchema
    ),
  })
  .transform(d => ({
    model_provider_service: d.modelProviderService,
    target: d.target,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelServiceConfig_FallbackConfigSchema: z.ZodType = z
  .object({
    destinations: z
      .array(z.lazy(() => marshalModelServiceConfig_DestinationConfigSchema))
      .optional(),
  })
  .transform(d => ({
    destinations: d.destinations,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelServiceConfig_PayPerTokenConfigSchema: z.ZodType = z
  .object({
    model: z.string(),
  })
  .transform(d => ({
    model: d.model,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelServiceConfig_ProvisionedThroughputConfigSchema: z.ZodType =
  z
    .object({
      modelServingEndpoint: z.string(),
      model: z.string().optional(),
    })
    .transform(d => ({
      model_serving_endpoint: d.modelServingEndpoint,
      model: d.model,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelServiceConfig_RoutingConfigSchema: z.ZodType = z
  .object({
    destinations: z
      .array(z.lazy(() => marshalModelServiceConfig_DestinationConfigSchema))
      .optional(),
    routingStrategy: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('trafficSplitting'),
          trafficSplitting: z.lazy(
            () => marshalModelServiceConfig_RoutingConfig_TrafficSplittingSchema
          ),
        }),
      ])
      .optional(),
    fallback: z
      .lazy(() => marshalModelServiceConfig_FallbackConfigSchema)
      .optional(),
    firstTokenTimeout: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    destinations: d.destinations,
    ...(d.routingStrategy?.$case === 'trafficSplitting' && {
      traffic_splitting: d.routingStrategy.trafficSplitting,
    }),
    fallback: d.fallback,
    first_token_timeout: d.firstTokenTimeout,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalModelServiceConfig_RoutingConfig_TrafficSplittingSchema: z.ZodType =
  z.object({});

export const marshalRateLimitSchema: z.ZodType = z
  .object({
    key: z.string(),
    renewalPeriod: z.string(),
    principal: z.string().optional(),
    requests: z.bigint().optional(),
    tokens: z.bigint().optional(),
    requestTagKey: z.string().optional(),
    requestTagValue: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    renewal_period: d.renewalPeriod,
    principal: d.principal,
    requests: d.requests,
    tokens: d.tokens,
    request_tag_key: d.requestTagKey,
    request_tag_value: d.requestTagValue,
  }));

const inferenceTableConfigFieldMaskSchema: FieldMaskSchema = {
  disabled: {wire: 'disabled'},
  isDeleted: {wire: 'is_deleted'},
  parent: {wire: 'parent'},
  table: {wire: 'table'},
  tableNamePrefix: {wire: 'table_name_prefix'},
};

const mcpServiceFieldMaskSchema: FieldMaskSchema = {
  comment: {wire: 'comment'},
  config: {wire: 'config', children: () => mcpServiceConfigFieldMaskSchema},
  createTime: {wire: 'create_time'},
  createdBy: {wire: 'created_by'},
  effectiveOwner: {wire: 'effective_owner'},
  etag: {wire: 'etag'},
  metastoreId: {wire: 'metastore_id'},
  name: {wire: 'name'},
  owner: {wire: 'owner'},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by'},
};

export function mcpServiceFieldMask(...paths: string[]): FieldMask<McpService> {
  return FieldMask.build<McpService>(paths, mcpServiceFieldMaskSchema);
}

const mcpServiceConfigFieldMaskSchema: FieldMaskSchema = {
  includeToolSelectors: {wire: 'include_tool_selectors'},
  rateLimits: {wire: 'rate_limits'},
  sourceConnection: {
    wire: 'source_connection',
    children: () => mcpServiceConfig_SourceConnectionFieldMaskSchema,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const mcpServiceConfig_SourceConnectionFieldMaskSchema: FieldMaskSchema = {
  isDeleted: {wire: 'is_deleted'},
  name: {wire: 'name'},
};

const modelProviderServiceFieldMaskSchema: FieldMaskSchema = {
  comment: {wire: 'comment'},
  config: {
    wire: 'config',
    children: () => modelProviderServiceConfigFieldMaskSchema,
  },
  createTime: {wire: 'create_time'},
  createdBy: {wire: 'created_by'},
  effectiveOwner: {wire: 'effective_owner'},
  etag: {wire: 'etag'},
  metastoreId: {wire: 'metastore_id'},
  name: {wire: 'name'},
  owner: {wire: 'owner'},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by'},
};

export function modelProviderServiceFieldMask(
  ...paths: string[]
): FieldMask<ModelProviderService> {
  return FieldMask.build<ModelProviderService>(
    paths,
    modelProviderServiceFieldMaskSchema
  );
}

const modelProviderServiceConfigFieldMaskSchema: FieldMaskSchema = {
  allowAllTargets: {wire: 'allow_all_targets'},
  amazonBedrock: {
    wire: 'amazon_bedrock',
    children: () =>
      modelProviderServiceConfig_AmazonBedrockProviderConfigFieldMaskSchema,
  },
  anthropic: {
    wire: 'anthropic',
    children: () =>
      modelProviderServiceConfig_AnthropicProviderConfigFieldMaskSchema,
  },
  azureOpenai: {
    wire: 'azure_openai',
    children: () =>
      modelProviderServiceConfig_AzureOpenAiProviderConfigFieldMaskSchema,
  },
  custom: {
    wire: 'custom',
    children: () =>
      modelProviderServiceConfig_CustomProviderConfigFieldMaskSchema,
  },
  forwardHeaders: {wire: 'forward_headers'},
  forwardQueryParameters: {wire: 'forward_query_parameters'},
  forwardUnmanagedPaths: {wire: 'forward_unmanaged_paths'},
  geminiEnterprise: {
    wire: 'gemini_enterprise',
    children: () =>
      modelProviderServiceConfig_GeminiEnterpriseProviderConfigFieldMaskSchema,
  },
  inferenceTable: {
    wire: 'inference_table',
    children: () => inferenceTableConfigFieldMaskSchema,
  },
  microsoftFoundry: {
    wire: 'microsoft_foundry',
    children: () =>
      modelProviderServiceConfig_MicrosoftFoundryProviderConfigFieldMaskSchema,
  },
  openai: {
    wire: 'openai',
    children: () =>
      modelProviderServiceConfig_OpenAiProviderConfigFieldMaskSchema,
  },
  providerType: {wire: 'provider_type'},
  rateLimits: {wire: 'rate_limits'},
  targets: {wire: 'targets'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_AmazonBedrockProviderConfigFieldMaskSchema: FieldMaskSchema =
  {
    direct: {
      wire: 'direct',
      children: () =>
        modelProviderServiceConfig_AmazonBedrockProviderDirectConfigFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_AmazonBedrockProviderDirectConfigFieldMaskSchema: FieldMaskSchema =
  {
    awsAccessKey: {
      wire: 'aws_access_key',
      children: () => modelProviderServiceConfig_AwsAccessKeyFieldMaskSchema,
    },
    region: {wire: 'region'},
    serviceCredential: {
      wire: 'service_credential',
      children: () =>
        modelProviderServiceConfig_ServiceCredentialFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_AnthropicProviderConfigFieldMaskSchema: FieldMaskSchema =
  {
    direct: {
      wire: 'direct',
      children: () =>
        modelProviderServiceConfig_AnthropicProviderDirectConfigFieldMaskSchema,
    },
    relayed: {
      wire: 'relayed',
      children: () =>
        modelProviderServiceConfig_AnthropicProviderRelayedConfigFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_AnthropicProviderDirectConfigFieldMaskSchema: FieldMaskSchema =
  {
    apiKey: {
      wire: 'api_key',
      children: () => modelProviderServiceConfig_ProviderSecretFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_AnthropicProviderRelayedConfigFieldMaskSchema: FieldMaskSchema =
  {
    planType: {wire: 'plan_type'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_AwsAccessKeyFieldMaskSchema: FieldMaskSchema =
  {
    accessKeyId: {wire: 'access_key_id'},
    secretAccessKey: {
      wire: 'secret_access_key',
      children: () => modelProviderServiceConfig_ProviderSecretFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_AzureOpenAiProviderConfigFieldMaskSchema: FieldMaskSchema =
  {
    direct: {
      wire: 'direct',
      children: () =>
        modelProviderServiceConfig_AzureOpenAiProviderDirectConfigFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_AzureOpenAiProviderDirectConfigFieldMaskSchema: FieldMaskSchema =
  {
    apiKey: {
      wire: 'api_key',
      children: () => modelProviderServiceConfig_ProviderSecretFieldMaskSchema,
    },
    baseUrl: {wire: 'base_url'},
    entraServicePrincipal: {
      wire: 'entra_service_principal',
      children: () =>
        modelProviderServiceConfig_EntraServicePrincipalFieldMaskSchema,
    },
    serviceCredential: {
      wire: 'service_credential',
      children: () =>
        modelProviderServiceConfig_ServiceCredentialFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_CustomProviderConfigFieldMaskSchema: FieldMaskSchema =
  {
    direct: {
      wire: 'direct',
      children: () =>
        modelProviderServiceConfig_CustomProviderDirectConfigFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_CustomProviderDirectConfigFieldMaskSchema: FieldMaskSchema =
  {
    apiKey: {
      wire: 'api_key',
      children: () => modelProviderServiceConfig_ProviderSecretFieldMaskSchema,
    },
    baseUrl: {wire: 'base_url'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_EntraServicePrincipalFieldMaskSchema: FieldMaskSchema =
  {
    clientId: {wire: 'client_id'},
    clientSecret: {
      wire: 'client_secret',
      children: () => modelProviderServiceConfig_ProviderSecretFieldMaskSchema,
    },
    tenantId: {wire: 'tenant_id'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_GeminiEnterpriseProviderConfigFieldMaskSchema: FieldMaskSchema =
  {
    direct: {
      wire: 'direct',
      children: () =>
        modelProviderServiceConfig_GeminiEnterpriseProviderDirectConfigFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_GeminiEnterpriseProviderDirectConfigFieldMaskSchema: FieldMaskSchema =
  {
    apiKey: {
      wire: 'api_key',
      children: () => modelProviderServiceConfig_ProviderSecretFieldMaskSchema,
    },
    projectId: {wire: 'project_id'},
    region: {wire: 'region'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_MicrosoftFoundryProviderConfigFieldMaskSchema: FieldMaskSchema =
  {
    direct: {
      wire: 'direct',
      children: () =>
        modelProviderServiceConfig_MicrosoftFoundryProviderDirectConfigFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_MicrosoftFoundryProviderDirectConfigFieldMaskSchema: FieldMaskSchema =
  {
    apiKey: {
      wire: 'api_key',
      children: () => modelProviderServiceConfig_ProviderSecretFieldMaskSchema,
    },
    baseUrl: {wire: 'base_url'},
    entraServicePrincipal: {
      wire: 'entra_service_principal',
      children: () =>
        modelProviderServiceConfig_EntraServicePrincipalFieldMaskSchema,
    },
    serviceCredential: {
      wire: 'service_credential',
      children: () =>
        modelProviderServiceConfig_ServiceCredentialFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_OpenAiProviderConfigFieldMaskSchema: FieldMaskSchema =
  {
    direct: {
      wire: 'direct',
      children: () =>
        modelProviderServiceConfig_OpenAiProviderDirectConfigFieldMaskSchema,
    },
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_OpenAiProviderDirectConfigFieldMaskSchema: FieldMaskSchema =
  {
    apiKey: {
      wire: 'api_key',
      children: () => modelProviderServiceConfig_ProviderSecretFieldMaskSchema,
    },
    baseUrl: {wire: 'base_url'},
    organization: {wire: 'organization'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_ProviderSecretFieldMaskSchema: FieldMaskSchema =
  {
    plaintext: {wire: 'plaintext'},
  };

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelProviderServiceConfig_ServiceCredentialFieldMaskSchema: FieldMaskSchema =
  {
    name: {wire: 'name'},
  };

const modelServiceFieldMaskSchema: FieldMaskSchema = {
  comment: {wire: 'comment'},
  config: {wire: 'config', children: () => modelServiceConfigFieldMaskSchema},
  createTime: {wire: 'create_time'},
  createdBy: {wire: 'created_by'},
  effectiveOwner: {wire: 'effective_owner'},
  etag: {wire: 'etag'},
  metastoreId: {wire: 'metastore_id'},
  name: {wire: 'name'},
  owner: {wire: 'owner'},
  supportedApiTypes: {wire: 'supported_api_types'},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by'},
};

export function modelServiceFieldMask(
  ...paths: string[]
): FieldMask<ModelService> {
  return FieldMask.build<ModelService>(paths, modelServiceFieldMaskSchema);
}

const modelServiceConfigFieldMaskSchema: FieldMaskSchema = {
  inferenceTable: {
    wire: 'inference_table',
    children: () => inferenceTableConfigFieldMaskSchema,
  },
  rateLimits: {wire: 'rate_limits'},
  routing: {
    wire: 'routing',
    children: () => modelServiceConfig_RoutingConfigFieldMaskSchema,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelServiceConfig_FallbackConfigFieldMaskSchema: FieldMaskSchema = {
  destinations: {wire: 'destinations'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelServiceConfig_RoutingConfigFieldMaskSchema: FieldMaskSchema = {
  destinations: {wire: 'destinations'},
  fallback: {
    wire: 'fallback',
    children: () => modelServiceConfig_FallbackConfigFieldMaskSchema,
  },
  firstTokenTimeout: {wire: 'first_token_timeout'},
  trafficSplitting: {
    wire: 'traffic_splitting',
    children: () =>
      modelServiceConfig_RoutingConfig_TrafficSplittingFieldMaskSchema,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const modelServiceConfig_RoutingConfig_TrafficSplittingFieldMaskSchema: FieldMaskSchema =
  {};
