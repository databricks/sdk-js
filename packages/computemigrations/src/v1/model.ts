// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {z} from 'zod';

/**
 * Type of a migration asset: the Classic asset being migrated, or an asset the migration agent
 * created for it. Migrations can only be created for JOB assets.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Migration_AssetType = {
  /** A Databricks job. */
  JOB: 'JOB',
  /** A Databricks Interactive notebook. */
  INTERACTIVE: 'INTERACTIVE',
  /** A workspace file. */
  FILE: 'FILE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type Migration_AssetType =
  | (typeof Migration_AssetType)[keyof typeof Migration_AssetType]
  | (string & {});

/** Role of the migration initiator, determining approval authority. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Migration_Initiator_Role = {
  /** A workspace administrator. */
  WORKSPACE_ADMIN: 'WORKSPACE_ADMIN',
  /** A job administrator or owner. */
  JOB_ADMIN: 'JOB_ADMIN',
  /** An account administrator. */
  ACCOUNT_ADMIN: 'ACCOUNT_ADMIN',
  /** System-initiated migration (e.g., campaign-driven). */
  SYSTEM: 'SYSTEM',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type Migration_Initiator_Role =
  | (typeof Migration_Initiator_Role)[keyof typeof Migration_Initiator_Role]
  | (string & {});

/** The state of a migration in its lifecycle. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Migration_State = {
  /** Migration created. Pending planning-work scheduling. */
  PLANNING_PENDING: 'PLANNING_PENDING',
  /** Planning work is scheduled and actively running. */
  PLANNING_RUNNING: 'PLANNING_RUNNING',
  /** Legacy state retained for compatibility; not entered by the scheduler. */
  PLANNING_REVIEW: 'PLANNING_REVIEW',
  /**
   * User rejected the current plan and requested changes; the migration loops back for
   * re-planning.
   */
  REVISION_PENDING: 'REVISION_PENDING',
  /**
   * User accepted the plan. Pending translation scheduling, where the workload is translated into
   * a working copy.
   */
  TRANSLATION_PENDING: 'TRANSLATION_PENDING',
  /** The workload is being translated into a working copy. */
  TRANSLATION_CREATING: 'TRANSLATION_CREATING',
  /** The working copy is ready for the user to review before it is validated. */
  TRANSLATION_READY: 'TRANSLATION_READY',
  /**
   * User finished validating the artifacts. Presented for review; the user can confirm
   * migration execution or request changes.
   */
  MIGRATION_REVIEW: 'MIGRATION_REVIEW',
  /** User confirmed migration execution. Pending execution scheduling. */
  MIGRATION_PENDING: 'MIGRATION_PENDING',
  /** Migration execution is scheduled and actively running. */
  MIGRATION_RUNNING: 'MIGRATION_RUNNING',
  /**
   * Migration successfully executed. Under observation for the rollback-eligible baking
   * period.
   */
  MIGRATION_OBSERVATION: 'MIGRATION_OBSERVATION',
  /** The baking / rollback-eligible period has passed. The migration is complete. */
  MIGRATION_COMPLETE: 'MIGRATION_COMPLETE',
  /**
   * Migration planning determined the workload ineligible for migration due to a
   * non-resolvable incompatibility (e.g. feature gap, missing workspace admin action).
   */
  NOT_SUPPORTED: 'NOT_SUPPORTED',
  /** Encountered a fatal error during the current state. */
  FAILED: 'FAILED',
  /** User cancelled the migration. */
  CANCELLED: 'CANCELLED',
  /**
   * Working copy submitted for a validation run to verify it executes successfully. Follows
   * TRANSLATION_READY.
   */
  VALIDATION_SCHEDULING: 'VALIDATION_SCHEDULING',
  /**
   * The validation run is executing. On success the migration advances to MIGRATION_REVIEW; on
   * failure it returns to REVISION_PENDING.
   */
  VALIDATION_RUNNING: 'VALIDATION_RUNNING',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type Migration_State =
  | (typeof Migration_State)[keyof typeof Migration_State]
  | (string & {});

/** A request to approve migration execution at the MIGRATION_REVIEW gate. */
export interface ApproveMigrationExecutionRequest {
  /** The ID of the migration to approve for execution. */
  migrationId?: string | undefined;
  /**
   * Optional resource version for optimistic concurrency control.
   * If supplied, it must match the current server value.
   */
  etag?: string | undefined;
  /**
   * Optional free-text feedback or instructions the user provides along with the approval, carried
   * into the next stage of the migration.
   */
  additionalFeedback?: string | undefined;
}

/** A request to approve the working copy at the TRANSLATION_READY gate. */
export interface ApproveMigrationTranslationRequest {
  /** The ID of the migration to approve. */
  migrationId?: string | undefined;
  /**
   * Optional resource version for optimistic concurrency control.
   * If supplied, it must match the current server value.
   */
  etag?: string | undefined;
  /**
   * Optional free-text feedback or instructions the user provides along with the approval, carried
   * into the next stage of the migration.
   */
  additionalFeedback?: string | undefined;
}

/** Configuration for the baking window (post-execution production monitoring). */
export interface BakingConfig {
  /** Number of successful production runs required before the migration reaches MIGRATION_COMPLETE. Default applied by the server (configurable). */
  runCount?: number | undefined;
  /**
   * Maximum baking window duration in hours. If the required run_count has not been reached
   * within this window, the migration transitions to FAILED. Default applied by the server (configurable).
   */
  timeWindowHours?: number | undefined;
}

/** Summary of baking metrics after the baking window completes. */
export interface BakingReport {
  /** Number of runs observed during the baking window. */
  totalRuns?: number | undefined;
  /** Number of successful runs. */
  successfulRuns?: number | undefined;
}

/** A request to cancel a migration from any non-terminal state. */
export interface CancelMigrationRequest {
  /** The ID of the migration to cancel. */
  migrationId?: string | undefined;
  /**
   * Optional resource version for optimistic concurrency control.
   * If supplied, it must match the current server value.
   */
  etag?: string | undefined;
  /** Optional free-text reason for the cancellation. */
  cancellationReason?: string | undefined;
}

/** A request to create a new migration. */
export interface CreateMigrationRequest {
  /**
   * The migration to create. The server generates `migration_id` and sets `state`
   * to PLANNING_PENDING. Required fields: `asset_type`, `asset_uri`.
   */
  migration?: Migration | undefined;
  /**
   * Client-generated request ID for idempotent request deduplication. The server
   * de-duplicates requests with the same request_id for at least 24 hours, returning
   * the existing migration instead of creating a duplicate.
   */
  requestId?: string | undefined;
}

/** A request to cancel (soft-delete) a migration. */
export interface DeleteMigrationRequest {
  /** The ID of the migration to cancel. */
  migrationId?: string | undefined;
  /** If nonempty, must match the current resource etag or the request fails with ABORTED. */
  etag?: string | undefined;
}

/** A request to retrieve a Migration. */
export interface GetMigrationRequest {
  /** The ID of the migration to retrieve. */
  migrationId?: string | undefined;
}

/** A request to list migrations in the caller's workspace. */
export interface ListMigrationsRequest {
  /** Maximum number of migrations to return. Default: 50, maximum: 1000. */
  pageSize?: number | undefined;
  /**
   * Page token from a previous ListMigrations call. When paginating, all other
   * parameters must match the call that provided the page token.
   */
  pageToken?: string | undefined;
  /** Filter by asset type. */
  assetType?: Migration_AssetType | undefined;
  /** Filter by migration state. Returns migrations in any of the specified states. */
  states?: Migration_State[] | undefined;
}

/** Response containing a paginated list of migrations matching the request filters. */
export interface ListMigrationsResponse {
  /** The migrations matching the request filters. */
  migrations?: Migration[] | undefined;
  /** Token for the next page. Omitted if there are no more results. */
  nextPageToken?: string | undefined;
}

/**
 * A persistent object tracking the full lifecycle of migrating one Classic compute asset
 * to Serverless. Each Migration has a well-defined state machine and is the unit of
 * orchestration, approval, and rollback.
 */
export interface Migration {
  /** Server-generated unique identifier for this migration. */
  migrationId?: string | undefined;
  /** Type of Classic compute asset being migrated. Cannot be changed after creation. */
  assetType?: Migration_AssetType | undefined;
  /** URI of the source asset (e.g., "jobs/12345"). Cannot be changed after creation. */
  assetUri?: string | undefined;
  /** Current state of the migration in the state machine. Managed by the server. */
  state?: Migration_State | undefined;
  /** The user who initiated this migration and their role. Set at creation. */
  initiator?: Migration_Initiator | undefined;
  /** Agent-produced validation results from sandbox execution. */
  validationReport?: ValidationReport | undefined;
  /** Baking window configuration. Mutable via UpdateMigration before baking starts. */
  bakingConfig?: BakingConfig | undefined;
  /** Timestamp when the migration was created. */
  createTime?: Temporal.Instant | undefined;
  /** Summary of baking metrics after the baking window completes. */
  bakingReport?: BakingReport | undefined;
  /**
   * History of state transitions, ordered chronologically. Each entry records the state
   * entered and the timestamp of the transition.
   */
  stateHistory?: Migration_StateTransition[] | undefined;
  /**
   * Resource version for optimistic concurrency control. Clients read this from GetMigration or ListMigrations
   * and pass it back as the request `etag` on update, delete, approve, reject, and cancel methods.
   */
  etag?: string | undefined;
  /**
   * When true, the server skips the translation review (TRANSLATION_READY) instead of waiting for
   * an explicit ApproveMigrationTranslation. MIGRATION_REVIEW is never skipped. Unset/false means the
   * translation review requires explicit user action. Set at creation; cannot be changed
   * afterward. Does not suppress cancellation or terminal failures.
   */
  autoApprove?: boolean | undefined;
  /** Agent-produced planning report, presented to the user at the review gates. */
  migrationReport?: MigrationReport | undefined;
  /**
   * When true, Databricks runs the working copy to validate it after the translation review.
   * Unset/false skips the run, so the migration goes from the translation review straight to
   * execution review. Whether the translation review waits for the user is controlled by
   * `auto_approve`, not this field. Set at creation; cannot be changed afterward.
   */
  runValidation?: boolean | undefined;
}

/** The initiator of a migration, including their role and user identity. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Migration_Initiator {
  /**
   * The role of the initiator, determining approval authority. Set by the server: the role is
   * resolved from the caller's identity and permissions on the asset, never taken from the
   * request, since a caller must not be able to assert its own approval authority.
   */
  role?: Migration_Initiator_Role | undefined;
  /** The user ID of the initiator. Set by the server from the request context. */
  userId?: bigint | undefined;
}

/** A record of a state transition in the migration lifecycle. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Migration_StateTransition {
  /** The state that was entered. */
  state?: Migration_State | undefined;
  /** Timestamp when this state was entered. */
  transitionTime?: Temporal.Instant | undefined;
  /**
   * Free-text the initiating user supplied at a user-driven transition — reviewer feedback on an
   * approval, or the reason for a rejection or cancellation. Empty for transitions the service
   * drives internally.
   */
  userComment?: string | undefined;
  /**
   * Free-text the service recorded for this transition — e.g. an internally-determined
   * cancellation or failure reason. Empty for user-driven transitions.
   */
  internalComment?: string | undefined;
}

/** A working copy (job or notebook) the migration agent created for the migration. */
export interface MigrationAsset {
  /** Type of asset this working copy represents. */
  assetType?: Migration_AssetType | undefined;
  /** Link to the asset, e.g. "jobs/12345". */
  uri?: string | undefined;
  /** Identifier of the asset. */
  id?: string | undefined;
}

/** Agent-produced planning report, presented to the user at the review gates. */
export interface MigrationReport {
  /** The primary asset the agent created — the entry point / validation target. */
  primaryAsset?: MigrationAsset | undefined;
  /** Additional assets the agent created (e.g. notebooks or jobs the primary asset invokes). */
  secondaryAssets?: MigrationAsset[] | undefined;
}

/**
 * A request to reject migration execution at the MIGRATION_REVIEW gate, looping back to
 * REVISION_PENDING.
 */
export interface RejectMigrationExecutionRequest {
  /** The ID of the migration to reject. */
  migrationId?: string | undefined;
  /**
   * Optional resource version for optimistic concurrency control.
   * If supplied, it must match the current server value.
   */
  etag?: string | undefined;
  /**
   * Required free-text reason for the rejection, fed back into re-planning so the next plan can
   * address the user's concerns.
   */
  rejectionReason?: string | undefined;
}

/**
 * A request to reject the working copy at the TRANSLATION_READY gate, looping back to
 * REVISION_PENDING.
 */
export interface RejectMigrationTranslationRequest {
  /** The ID of the migration to reject. */
  migrationId?: string | undefined;
  /**
   * Optional resource version for optimistic concurrency control.
   * If supplied, it must match the current server value.
   */
  etag?: string | undefined;
  /**
   * Required free-text reason for the rejection, fed back into re-planning so the next plan can
   * address the user's concerns.
   */
  rejectionReason?: string | undefined;
}

/** Validation results from running the translated workload in the sandbox. */
export interface ValidationReport {
  /**
   * Databricks-internal recommendation on whether to proceed with the migration, based on the
   * validation run. May differ from run_status: a run can succeed while the recommendation is
   * negative, or vice versa.
   */
  passed?: boolean | undefined;
  /**
   * Duration of the sandbox validation run in milliseconds. Pair with start_time
   * to derive the end time.
   */
  durationMs?: bigint | undefined;
  /** Timestamp when validation started in the sandbox. */
  startTime?: Temporal.Instant | undefined;
  /**
   * Status of the validation run itself (the objective run outcome), as reported by the run
   * system, e.g. "SUCCESS" / "FAILED" / "TIMED_OUT".
   */
  runStatus?: string | undefined;
  /** Link to the validation run (job or notebook). */
  runUrl?: string | undefined;
}

export const unmarshalBakingConfigSchema: z.ZodType<BakingConfig> = z
  .object({
    run_count: z.number().optional(),
    time_window_hours: z.number().optional(),
  })
  .transform(d => ({
    runCount: d.run_count,
    timeWindowHours: d.time_window_hours,
  }));

export const unmarshalBakingReportSchema: z.ZodType<BakingReport> = z
  .object({
    total_runs: z.number().optional(),
    successful_runs: z.number().optional(),
  })
  .transform(d => ({
    totalRuns: d.total_runs,
    successfulRuns: d.successful_runs,
  }));

export const unmarshalListMigrationsResponseSchema: z.ZodType<ListMigrationsResponse> =
  z
    .object({
      migrations: z.array(z.lazy(() => unmarshalMigrationSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      migrations: d.migrations,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMigrationSchema: z.ZodType<Migration> = z
  .object({
    migration_id: z.string().optional(),
    asset_type: z.string().optional(),
    asset_uri: z.string().optional(),
    state: z.string().optional(),
    initiator: z.lazy(() => unmarshalMigration_InitiatorSchema).optional(),
    validation_report: z.lazy(() => unmarshalValidationReportSchema).optional(),
    baking_config: z.lazy(() => unmarshalBakingConfigSchema).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    baking_report: z.lazy(() => unmarshalBakingReportSchema).optional(),
    state_history: z
      .array(z.lazy(() => unmarshalMigration_StateTransitionSchema))
      .optional(),
    etag: z.string().optional(),
    auto_approve: z.boolean().optional(),
    migration_report: z.lazy(() => unmarshalMigrationReportSchema).optional(),
    run_validation: z.boolean().optional(),
  })
  .transform(d => ({
    migrationId: d.migration_id,
    assetType: d.asset_type,
    assetUri: d.asset_uri,
    state: d.state,
    initiator: d.initiator,
    validationReport: d.validation_report,
    bakingConfig: d.baking_config,
    createTime: d.create_time,
    bakingReport: d.baking_report,
    stateHistory: d.state_history,
    etag: d.etag,
    autoApprove: d.auto_approve,
    migrationReport: d.migration_report,
    runValidation: d.run_validation,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalMigration_InitiatorSchema: z.ZodType<Migration_Initiator> =
  z
    .object({
      role: z.string().optional(),
      user_id: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      role: d.role,
      userId: d.user_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalMigration_StateTransitionSchema: z.ZodType<Migration_StateTransition> =
  z
    .object({
      state: z.string().optional(),
      transition_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      user_comment: z.string().optional(),
      internal_comment: z.string().optional(),
    })
    .transform(d => ({
      state: d.state,
      transitionTime: d.transition_time,
      userComment: d.user_comment,
      internalComment: d.internal_comment,
    }));

export const unmarshalMigrationAssetSchema: z.ZodType<MigrationAsset> = z
  .object({
    asset_type: z.string().optional(),
    uri: z.string().optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    assetType: d.asset_type,
    uri: d.uri,
    id: d.id,
  }));

export const unmarshalMigrationReportSchema: z.ZodType<MigrationReport> = z
  .object({
    primary_asset: z.lazy(() => unmarshalMigrationAssetSchema).optional(),
    secondary_assets: z
      .array(z.lazy(() => unmarshalMigrationAssetSchema))
      .optional(),
  })
  .transform(d => ({
    primaryAsset: d.primary_asset,
    secondaryAssets: d.secondary_assets,
  }));

export const unmarshalValidationReportSchema: z.ZodType<ValidationReport> = z
  .object({
    passed: z.boolean().optional(),
    duration_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    start_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    run_status: z.string().optional(),
    run_url: z.string().optional(),
  })
  .transform(d => ({
    passed: d.passed,
    durationMs: d.duration_ms,
    startTime: d.start_time,
    runStatus: d.run_status,
    runUrl: d.run_url,
  }));

export const marshalApproveMigrationExecutionRequestSchema: z.ZodType = z
  .object({
    migrationId: z.string().optional(),
    etag: z.string().optional(),
    additionalFeedback: z.string().optional(),
  })
  .transform(d => ({
    migration_id: d.migrationId,
    etag: d.etag,
    additional_feedback: d.additionalFeedback,
  }));

export const marshalApproveMigrationTranslationRequestSchema: z.ZodType = z
  .object({
    migrationId: z.string().optional(),
    etag: z.string().optional(),
    additionalFeedback: z.string().optional(),
  })
  .transform(d => ({
    migration_id: d.migrationId,
    etag: d.etag,
    additional_feedback: d.additionalFeedback,
  }));

export const marshalBakingConfigSchema: z.ZodType = z
  .object({
    runCount: z.number().optional(),
    timeWindowHours: z.number().optional(),
  })
  .transform(d => ({
    run_count: d.runCount,
    time_window_hours: d.timeWindowHours,
  }));

export const marshalBakingReportSchema: z.ZodType = z
  .object({
    totalRuns: z.number().optional(),
    successfulRuns: z.number().optional(),
  })
  .transform(d => ({
    total_runs: d.totalRuns,
    successful_runs: d.successfulRuns,
  }));

export const marshalCancelMigrationRequestSchema: z.ZodType = z
  .object({
    migrationId: z.string().optional(),
    etag: z.string().optional(),
    cancellationReason: z.string().optional(),
  })
  .transform(d => ({
    migration_id: d.migrationId,
    etag: d.etag,
    cancellation_reason: d.cancellationReason,
  }));

export const marshalMigrationSchema: z.ZodType = z
  .object({
    migrationId: z.string().optional(),
    assetType: z.string().optional(),
    assetUri: z.string().optional(),
    state: z.string().optional(),
    initiator: z.lazy(() => marshalMigration_InitiatorSchema).optional(),
    validationReport: z.lazy(() => marshalValidationReportSchema).optional(),
    bakingConfig: z.lazy(() => marshalBakingConfigSchema).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    bakingReport: z.lazy(() => marshalBakingReportSchema).optional(),
    stateHistory: z
      .array(z.lazy(() => marshalMigration_StateTransitionSchema))
      .optional(),
    etag: z.string().optional(),
    autoApprove: z.boolean().optional(),
    migrationReport: z.lazy(() => marshalMigrationReportSchema).optional(),
    runValidation: z.boolean().optional(),
  })
  .transform(d => ({
    migration_id: d.migrationId,
    asset_type: d.assetType,
    asset_uri: d.assetUri,
    state: d.state,
    initiator: d.initiator,
    validation_report: d.validationReport,
    baking_config: d.bakingConfig,
    create_time: d.createTime,
    baking_report: d.bakingReport,
    state_history: d.stateHistory,
    etag: d.etag,
    auto_approve: d.autoApprove,
    migration_report: d.migrationReport,
    run_validation: d.runValidation,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalMigration_InitiatorSchema: z.ZodType = z
  .object({
    role: z.string().optional(),
    userId: z.bigint().optional(),
  })
  .transform(d => ({
    role: d.role,
    user_id: d.userId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalMigration_StateTransitionSchema: z.ZodType = z
  .object({
    state: z.string().optional(),
    transitionTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    userComment: z.string().optional(),
    internalComment: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
    transition_time: d.transitionTime,
    user_comment: d.userComment,
    internal_comment: d.internalComment,
  }));

export const marshalMigrationAssetSchema: z.ZodType = z
  .object({
    assetType: z.string().optional(),
    uri: z.string().optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    asset_type: d.assetType,
    uri: d.uri,
    id: d.id,
  }));

export const marshalMigrationReportSchema: z.ZodType = z
  .object({
    primaryAsset: z.lazy(() => marshalMigrationAssetSchema).optional(),
    secondaryAssets: z
      .array(z.lazy(() => marshalMigrationAssetSchema))
      .optional(),
  })
  .transform(d => ({
    primary_asset: d.primaryAsset,
    secondary_assets: d.secondaryAssets,
  }));

export const marshalRejectMigrationExecutionRequestSchema: z.ZodType = z
  .object({
    migrationId: z.string().optional(),
    etag: z.string().optional(),
    rejectionReason: z.string().optional(),
  })
  .transform(d => ({
    migration_id: d.migrationId,
    etag: d.etag,
    rejection_reason: d.rejectionReason,
  }));

export const marshalRejectMigrationTranslationRequestSchema: z.ZodType = z
  .object({
    migrationId: z.string().optional(),
    etag: z.string().optional(),
    rejectionReason: z.string().optional(),
  })
  .transform(d => ({
    migration_id: d.migrationId,
    etag: d.etag,
    rejection_reason: d.rejectionReason,
  }));

export const marshalValidationReportSchema: z.ZodType = z
  .object({
    passed: z.boolean().optional(),
    durationMs: z.bigint().optional(),
    startTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    runStatus: z.string().optional(),
    runUrl: z.string().optional(),
  })
  .transform(d => ({
    passed: d.passed,
    duration_ms: d.durationMs,
    start_time: d.startTime,
    run_status: d.runStatus,
    run_url: d.runUrl,
  }));
