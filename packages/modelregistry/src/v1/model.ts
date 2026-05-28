// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * An action that a user (with sufficient permissions) could take on an activity or comment.
 *
 * For activities, valid values are:
 * * `APPROVE_TRANSITION_REQUEST`: Approve a transition request
 *
 * * `REJECT_TRANSITION_REQUEST`: Reject a transition request
 *
 * * `CANCEL_TRANSITION_REQUEST`: Cancel (delete) a transition request
 *
 * For comments, valid values are:
 * * `EDIT_COMMENT`: Edit the comment
 *
 * * `DELETE_COMMENT`: Delete the comment
 */
export enum ActivityAction {
  /** Approve a transition request. Available to users with sufficient permissions. */
  APPROVE_TRANSITION_REQUEST = 'APPROVE_TRANSITION_REQUEST',
  /** Reject a transition request. Available to users with sufficient permissions. */
  REJECT_TRANSITION_REQUEST = 'REJECT_TRANSITION_REQUEST',
  /** Cancel a transition request. Available to the user who created the request. */
  CANCEL_TRANSITION_REQUEST = 'CANCEL_TRANSITION_REQUEST',
  /** Edit the comment */
  EDIT_COMMENT = 'EDIT_COMMENT',
  /** Delete the comment */
  DELETE_COMMENT = 'DELETE_COMMENT',
}

/**
 * Type of activity. Valid values are:
 * * `APPLIED_TRANSITION`: User applied the corresponding stage transition.
 *
 * * `REQUESTED_TRANSITION`: User requested the corresponding stage transition.
 *
 * * `CANCELLED_REQUEST`: User cancelled an existing transition request.
 *
 * * `APPROVED_REQUEST`: User approved the corresponding stage transition.
 *
 * * `REJECTED_REQUEST`: User rejected the coressponding stage transition.
 *
 * * `SYSTEM_TRANSITION`: For events performed as a side effect, such as archiving existing model versions in a stage.
 */
export enum ActivityType {
  /** Indicates that the corresponding stage transition was applied by user. */
  APPLIED_TRANSITION = 'APPLIED_TRANSITION',
  /** Corresponding stage transition was requested by user. */
  REQUESTED_TRANSITION = 'REQUESTED_TRANSITION',
  /** User cancelled an existing request. */
  CANCELLED_REQUEST = 'CANCELLED_REQUEST',
  /** Corresponding transition request was approved by user. */
  APPROVED_REQUEST = 'APPROVED_REQUEST',
  /** Corresponding transition request was rejected by user. */
  REJECTED_REQUEST = 'REJECTED_REQUEST',
  /** User posted a new comment */
  NEW_COMMENT = 'NEW_COMMENT',
  /** Corresponding transition for events such as archiving existing model versions */
  SYSTEM_TRANSITION = 'SYSTEM_TRANSITION',
}

/**
 * The status of the model version. Valid values are:
 * * `PENDING_REGISTRATION`: Request to register a new model version is pending as server performs background tasks.
 *
 * * `FAILED_REGISTRATION`: Request to register a new model version has failed.
 *
 * * `READY`: Model version is ready for use.
 */
export enum ModelVersionStatus {
  /** Request to register a new model version is pending as server performs background tasks. */
  PENDING_REGISTRATION = 'PENDING_REGISTRATION',
  /** Request to register a new model version has failed. */
  FAILED_REGISTRATION = 'FAILED_REGISTRATION',
  /** Model version is ready for use. */
  READY = 'READY',
}

/** Permission level of the requesting user on the object. For what is allowed at each level, see [MLflow Model permissions](..). */
export enum PermissionLevel {
  CAN_MANAGE = 'CAN_MANAGE',
  /** reserved 1;  // IS_OWNER = 1; was DEPRECATED */
  CAN_EDIT = 'CAN_EDIT',
  CAN_READ = 'CAN_READ',
  CAN_MANAGE_STAGING_VERSIONS = 'CAN_MANAGE_STAGING_VERSIONS',
  CAN_MANAGE_PRODUCTION_VERSIONS = 'CAN_MANAGE_PRODUCTION_VERSIONS',
  /**
   * Only applicable to the root ACL path, for which it is the default value if no permissions are
   * set explicitly for the user. It is the default set by the MLflow service and The ACL database
   * does not understand this value.
   */
  CAN_CREATE_REGISTERED_MODEL = 'CAN_CREATE_REGISTERED_MODEL',
}

/**
 * .. note::
 * Experimental: This entity may change or be removed in a future release without warning.
 * Email subscription types for registry notifications:
 * - `ALL_EVENTS`: Subscribed to all events.
 * - `DEFAULT`: Default subscription type.
 * - `SUBSCRIBED`: Subscribed to notifications.
 * - `UNSUBSCRIBED`: Not subscribed to notifications.
 */
export enum RegistryEmailSubscriptionType {
  ALL_EVENTS = 'ALL_EVENTS',
  DEFAULT = 'DEFAULT',
  SUBSCRIBED = 'SUBSCRIBED',
  UNSUBSCRIBED = 'UNSUBSCRIBED',
}

export enum RegistryWebhookEvent {
  MODEL_VERSION_CREATED = 'MODEL_VERSION_CREATED',
  MODEL_VERSION_TRANSITIONED_STAGE = 'MODEL_VERSION_TRANSITIONED_STAGE',
  TRANSITION_REQUEST_CREATED = 'TRANSITION_REQUEST_CREATED',
  COMMENT_CREATED = 'COMMENT_CREATED',
  REGISTERED_MODEL_CREATED = 'REGISTERED_MODEL_CREATED',
  MODEL_VERSION_TAG_SET = 'MODEL_VERSION_TAG_SET',
  MODEL_VERSION_TRANSITIONED_TO_STAGING = 'MODEL_VERSION_TRANSITIONED_TO_STAGING',
  MODEL_VERSION_TRANSITIONED_TO_PRODUCTION = 'MODEL_VERSION_TRANSITIONED_TO_PRODUCTION',
  MODEL_VERSION_TRANSITIONED_TO_ARCHIVED = 'MODEL_VERSION_TRANSITIONED_TO_ARCHIVED',
  TRANSITION_REQUEST_TO_STAGING_CREATED = 'TRANSITION_REQUEST_TO_STAGING_CREATED',
  TRANSITION_REQUEST_TO_PRODUCTION_CREATED = 'TRANSITION_REQUEST_TO_PRODUCTION_CREATED',
  TRANSITION_REQUEST_TO_ARCHIVED_CREATED = 'TRANSITION_REQUEST_TO_ARCHIVED_CREATED',
}

/**
 * Enable or disable triggering the webhook, or put the webhook into test mode. The default is `ACTIVE`:
 * * `ACTIVE`: Webhook is triggered when an associated event happens.
 *
 * * `DISABLED`: Webhook is not triggered.
 *
 * * `TEST_MODE`: Webhook can be triggered through the test endpoint, but is not triggered on a real event.
 */
export enum RegistryWebhookStatus {
  /** Event and test triggers will be sent. */
  ACTIVE = 'ACTIVE',
  /** No triggers will be sent. */
  DISABLED = 'DISABLED',
  /** Test triggers will be sent, but not actual events. */
  TEST_MODE = 'TEST_MODE',
}

/**
 * For activities, this contains the activity recorded for the action.
 * For comments, this contains the comment details.
 * For transition requests, this contains the transition request details.
 */
export interface Activity {
  /** Creation time of the object, as a Unix timestamp in milliseconds. */
  creationTimestamp?: bigint | undefined;
  /** The username of the user that created the object. */
  userId?: string | undefined;
  activityType?: ActivityType | undefined;
  /** User-provided comment associated with the activity, comment, or transition request. */
  comment?: string | undefined;
  /** Time of the object at last update, as a Unix timestamp in milliseconds. */
  lastUpdatedTimestamp?: bigint | undefined;
  /**
   * Source stage of the transition (if the activity is stage transition related). Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  fromStage?: string | undefined;
  /**
   * Target stage of the transition (if the activity is stage transition related). Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  toStage?: string | undefined;
  /** Comment made by system, for example explaining an activity of type `SYSTEM_TRANSITION`. It usually describes a side effect, such as a version being archived as part of another version's stage transition, and may not be returned for some activity types. */
  systemComment?: string | undefined;
  /** Array of actions on the activity allowed for the current viewer. */
  availableActions?: ActivityAction[] | undefined;
  /** Unique identifier for the object. */
  id?: string | undefined;
}

/** Details required to identify and approve a model version stage transition request. */
export interface ApproveTransitionRequest {
  /** Name of the model. */
  name?: string | undefined;
  /** Version of the model. */
  version?: string | undefined;
  /**
   * Target stage of the transition. Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  stage?: string | undefined;
  /** Specifies whether to archive all current model versions in the target stage. */
  archiveExistingVersions?: boolean | undefined;
  /** User-provided comment on the action. */
  comment?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ApproveTransitionRequest_Response {
  /** New activity generated as a result of this operation. */
  activity?: Activity | undefined;
}

/**
 * For activities, this contains the activity recorded for the action.
 * For comments, this contains the comment details.
 * For transition requests, this contains the transition request details.
 */
export interface CommentObject {
  /** Creation time of the object, as a Unix timestamp in milliseconds. */
  creationTimestamp?: bigint | undefined;
  /** The username of the user that created the object. */
  userId?: string | undefined;
  activityType?: ActivityType | undefined;
  /** User-provided comment associated with the activity, comment, or transition request. */
  comment?: string | undefined;
  /** Time of the object at last update, as a Unix timestamp in milliseconds. */
  lastUpdatedTimestamp?: bigint | undefined;
  /**
   * Source stage of the transition (if the activity is stage transition related). Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  fromStage?: string | undefined;
  /**
   * Target stage of the transition (if the activity is stage transition related). Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  toStage?: string | undefined;
  /** Comment made by system, for example explaining an activity of type `SYSTEM_TRANSITION`. It usually describes a side effect, such as a version being archived as part of another version's stage transition, and may not be returned for some activity types. */
  systemComment?: string | undefined;
  /** Array of actions on the activity allowed for the current viewer. */
  availableActions?: ActivityAction[] | undefined;
  /** Unique identifier for the object. */
  id?: string | undefined;
}

/** Details required to create a comment on a model version. */
export interface CreateCommentRequest {
  /** Name of the model. */
  name?: string | undefined;
  /** Version of the model. */
  version?: string | undefined;
  /** User-provided comment on the action. */
  comment?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateCommentRequest_Response {
  /** New comment object */
  comment?: CommentObject | undefined;
}

export interface CreateModelVersionRequest {
  /** Register model under this name */
  name?: string | undefined;
  /** URI indicating the location of the model artifacts. */
  source?: string | undefined;
  /**
   * MLflow run ID for correlation, if `source` was generated by an experiment run in
   * MLflow tracking server
   */
  runId?: string | undefined;
  /** Additional metadata for model version. */
  tags?: ModelVersionTag[] | undefined;
  /**
   * MLflow run link - this is the exact link of the run that generated this model version,
   * potentially hosted at another instance of MLflow.
   */
  runLink?: string | undefined;
  /** Optional description for model version. */
  description?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateModelVersionRequest_Response {
  /** Return new version number generated for this model in registry. */
  modelVersion?: ModelVersion | undefined;
}

export interface CreateRegisteredModelRequest {
  /** Register models under this name */
  name?: string | undefined;
  /** Additional metadata for registered model. */
  tags?: RegisteredModelTag[] | undefined;
  /** Optional description for registered model. */
  description?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateRegisteredModelRequest_Response {
  registeredModel?: RegisteredModel | undefined;
}

/** Details required to create a registry webhook. */
export interface CreateRegistryWebhookRequest {
  /** If model name is not specified, a registry-wide webhook is created that listens for the specified events across all versions of all registered models. */
  modelName?: string | undefined;
  /**
   * Events that can trigger a registry webhook:
   * * `MODEL_VERSION_CREATED`: A new model version was created for the associated model.
   *
   * * `MODEL_VERSION_TRANSITIONED_STAGE`: A model version’s stage was changed.
   *
   * * `TRANSITION_REQUEST_CREATED`: A user requested a model version’s stage be transitioned.
   *
   * * `COMMENT_CREATED`: A user wrote a comment on a registered model.
   *
   * * `REGISTERED_MODEL_CREATED`: A new registered model was created. This event type can only be specified for a registry-wide webhook, which can be created by not specifying a model name in the create request.
   *
   * * `MODEL_VERSION_TAG_SET`: A user set a tag on the model version.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_STAGING`: A model version was transitioned to staging.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_PRODUCTION`: A model version was transitioned to production.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_ARCHIVED`: A model version was archived.
   *
   * * `TRANSITION_REQUEST_TO_STAGING_CREATED`: A user requested a model version be transitioned to staging.
   *
   * * `TRANSITION_REQUEST_TO_PRODUCTION_CREATED`: A user requested a model version be transitioned to production.
   *
   * * `TRANSITION_REQUEST_TO_ARCHIVED_CREATED`: A user requested a model version be archived.
   */
  events?: RegistryWebhookEvent[] | undefined;
  /** User-specified description for the webhook. */
  description?: string | undefined;
  /**
   * Enable or disable triggering the webhook, or put the webhook into test mode. The default is `ACTIVE`:
   * * `ACTIVE`: Webhook is triggered when an associated event happens.
   *
   * * `DISABLED`: Webhook is not triggered.
   *
   * * `TEST_MODE`: Webhook can be triggered through the test endpoint, but is not triggered on a real event.
   */
  status?: RegistryWebhookStatus | undefined;
  /** External HTTPS URL called on event trigger (by using a POST request). */
  httpUrlSpec?: HttpUrlSpec | undefined;
  /** ID of the job that the webhook runs. */
  jobSpec?: JobSpec | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateRegistryWebhookRequest_Response {
  webhook?: RegistryWebhook | undefined;
}

/** Details required to create a model version stage transition request. */
export interface CreateTransitionRequest {
  /** Name of the model. */
  name?: string | undefined;
  /** Version of the model. */
  version?: string | undefined;
  /**
   * Target stage of the transition. Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  stage?: string | undefined;
  /** User-provided comment on the action. */
  comment?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateTransitionRequest_Response {
  /** New activity generated for stage transition request. */
  request?: TransitionRequest | undefined;
}

export interface DeleteCommentRequest {
  /** Unique identifier of an activity */
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteCommentRequest_Response {}

export interface DeleteModelVersionRequest {
  /** Name of the registered model */
  name?: string | undefined;
  /** Model version number */
  version?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteModelVersionRequest_Response {}

export interface DeleteModelVersionTagRequest {
  /** Name of the registered model that the tag was logged under. */
  name?: string | undefined;
  /** Model version number that the tag was logged under. */
  version?: string | undefined;
  /** Name of the tag. The name must be an exact match; wild-card deletion is not supported. Maximum size is 250 bytes. */
  key?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteModelVersionTagRequest_Response {}

export interface DeleteRegisteredModelRequest {
  /** Registered model unique name identifier. */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteRegisteredModelRequest_Response {}

export interface DeleteRegisteredModelTagRequest {
  /** Name of the registered model that the tag was logged under. */
  name?: string | undefined;
  /** Name of the tag. The name must be an exact match; wild-card deletion is not supported. Maximum size is 250 bytes. */
  key?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteRegisteredModelTagRequest_Response {}

/**
 * .. note::
 * Experimental: This entity may change or be removed in a future release without warning.
 */
export interface DeleteRegistryWebhookRequest {
  /** Webhook ID required to delete a registry webhook. */
  id?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteRegistryWebhookRequest_Response {}

export interface DeleteTransitionRequest {
  /** Name of the model. */
  name?: string | undefined;
  /** Version of the model. */
  version?: string | undefined;
  /**
   * Target stage of the transition request. Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  stage?: string | undefined;
  /** Username of the user who created this request. Of the transition requests matching the specified details, only the one transition created by this user will be deleted. */
  creator?: string | undefined;
  /** User-provided comment on the action. */
  comment?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface DeleteTransitionRequest_Response {
  /** New activity generated as a result of this operation. */
  activity?: Activity | undefined;
}

/** Feature list wrap all the features for a model version */
export interface FeatureList {
  features?: LinkedFeature[] | undefined;
}

export interface GetLatestVersionsRequest {
  /** Registered model unique name identifier. */
  name?: string | undefined;
  /** List of stages. */
  stages?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetLatestVersionsRequest_Response {
  /**
   * Latest version models for each requests stage. Only return models with current `READY` status.
   * If no `stages` provided, returns the latest version for each stage, including `"None"`.
   */
  modelVersions?: ModelVersion[] | undefined;
}

export interface GetModelVersionDownloadUriRequest {
  /** Name of the registered model */
  name?: string | undefined;
  /** Model version number */
  version?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetModelVersionDownloadUriRequest_Response {
  /** URI corresponding to where artifacts for this model version are stored. */
  artifactUri?: string | undefined;
}

export interface GetModelVersionRequest {
  /** Name of the registered model */
  name?: string | undefined;
  /** Model version number */
  version?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetModelVersionRequest_Response {
  modelVersion?: ModelVersion | undefined;
}

export interface GetRegisteredModelDatabricksRequest {
  /** Registered model unique name identifier. */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetRegisteredModelDatabricksRequest_Response {
  registeredModelDatabricks?: RegisteredModelDatabricks | undefined;
}

export interface HttpUrlSpec {
  /** External HTTPS URL called on event trigger (by using a POST request). */
  url?: string | undefined;
  /** Enable/disable SSL certificate validation. Default is true. For self-signed certificates, this field must be false AND the destination server must disable certificate validation as well. For security purposes, it is encouraged to perform secret validation with the HMAC-encoded portion of the payload and acknowledge the risk associated with disabling hostname validation whereby it becomes more likely that requests can be maliciously routed to an unintended host. */
  enableSslVerification?: boolean | undefined;
  /** Shared secret required for HMAC encoding payload. The HMAC-encoded payload will be sent in the header as: { "X-Databricks-Signature": $encoded_payload }. */
  secret?: string | undefined;
  /** Value of the authorization header that should be sent in the request sent by the wehbook. It should be of the form `"<auth type> <credentials>"`. If set to an empty string, no authorization header will be included in the request. */
  authorization?: string | undefined;
}

export interface JobSpec {
  /** ID of the job that the webhook runs. */
  jobId?: string | undefined;
  /** URL of the workspace containing the job that this webhook runs. If not specified, the job’s workspace URL is assumed to be the same as the workspace where the webhook is created. */
  workspaceUrl?: string | undefined;
  /** The personal access token used to authorize webhook's job runs. */
  accessToken?: string | undefined;
}

/** Feature for model version. ([ML-57150] Renamed from Feature to LinkedFeature) */
export interface LinkedFeature {
  /** Feature table name */
  featureTableName?: string | undefined;
  /** Feature name */
  featureName?: string | undefined;
  /** Feature table id */
  featureTableId?: string | undefined;
}

export interface ListRegisteredModelsRequest {
  /** Maximum number of registered models desired. Max threshold is 1000. */
  maxResults?: bigint | undefined;
  /** Pagination token to go to the next page based on a previous query. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListRegisteredModelsRequest_Response {
  registeredModels?: RegisteredModel[] | undefined;
  /** Pagination token to request next page of models for the same query. */
  nextPageToken?: string | undefined;
}

export interface ListRegistryWebhooksRequest {
  /**
   * Registered model name
   * If not specified, all webhooks associated with the specified events are listed, regardless of their associated model.
   */
  modelName?: string | undefined;
  /**
   * Events that trigger the webhook.
   * * `MODEL_VERSION_CREATED`: A new model version was created for the associated model.
   *
   * * `MODEL_VERSION_TRANSITIONED_STAGE`: A model version’s stage was changed.
   *
   * * `TRANSITION_REQUEST_CREATED`: A user requested a model version’s stage be transitioned.
   *
   * * `COMMENT_CREATED`: A user wrote a comment on a registered model.
   *
   * * `REGISTERED_MODEL_CREATED`: A new registered model was created. This event type can only be specified for a registry-wide webhook, which can be created by not specifying a model name in the create request.
   *
   * * `MODEL_VERSION_TAG_SET`: A user set a tag on the model version.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_STAGING`: A model version was transitioned to staging.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_PRODUCTION`: A model version was transitioned to production.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_ARCHIVED`: A model version was archived.
   *
   * * `TRANSITION_REQUEST_TO_STAGING_CREATED`: A user requested a model version be transitioned to staging.
   *
   * * `TRANSITION_REQUEST_TO_PRODUCTION_CREATED`: A user requested a model version be transitioned to production.
   *
   * * `TRANSITION_REQUEST_TO_ARCHIVED_CREATED`: A user requested a model version be archived.
   *
   * If `events` is specified, any webhook with one or more of the specified trigger events is included in the output.
   * If `events` is not specified, webhooks of all event types are included in the output.
   */
  events?: RegistryWebhookEvent[] | undefined;
  /** Token indicating the page of artifact results to fetch */
  pageToken?: string | undefined;
  maxResults?: bigint | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListRegistryWebhooksRequest_Response {
  /** Array of registry webhooks. */
  webhooks?: RegistryWebhook[] | undefined;
  /** Token that can be used to retrieve the next page of artifact results */
  nextPageToken?: string | undefined;
}

export interface ListTransitionRequest {
  /** Name of the registered model. */
  name?: string | undefined;
  /** Version of the model. */
  version?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListTransitionRequest_Response {
  /** Array of open transition requests. */
  requests?: Activity[] | undefined;
}

export interface ModelVersion {
  /** Unique name of the model */
  name?: string | undefined;
  /** Model's version number. */
  version?: string | undefined;
  /** Timestamp recorded when this `model_version` was created. */
  creationTimestamp?: bigint | undefined;
  /** Timestamp recorded when metadata for this `model_version` was last updated. */
  lastUpdatedTimestamp?: bigint | undefined;
  /** User that created this `model_version`. */
  userId?: string | undefined;
  /** Current stage for this `model_version`. */
  currentStage?: string | undefined;
  /** Description of this `model_version`. */
  description?: string | undefined;
  /** URI indicating the location of the source model artifacts, used when creating `model_version` */
  source?: string | undefined;
  /**
   * MLflow run ID used when creating `model_version`, if `source` was generated by an
   * experiment run stored in MLflow tracking server.
   */
  runId?: string | undefined;
  /** Current status of `model_version` */
  status?: ModelVersionStatus | undefined;
  /** Details on current `status`, if it is pending or failed. */
  statusMessage?: string | undefined;
  /** Tags: Additional metadata key-value pairs for this `model_version`. */
  tags?: ModelVersionTag[] | undefined;
  /** Run Link: Direct link to the run that generated this version */
  runLink?: string | undefined;
}

export interface ModelVersionDatabricks {
  /** Name of the model. */
  name?: string | undefined;
  /** Version of the model. */
  version?: string | undefined;
  /** Creation time of the object, as a Unix timestamp in milliseconds. */
  creationTimestamp?: bigint | undefined;
  /** Time of the object at last update, as a Unix timestamp in milliseconds. */
  lastUpdatedTimestamp?: bigint | undefined;
  /** The username of the user that created the object. */
  userId?: string | undefined;
  currentStage?: string | undefined;
  /** User-specified description for the object. */
  description?: string | undefined;
  /** URI that indicates the location of the source model artifacts. This is used when creating the model version. */
  source?: string | undefined;
  /** Unique identifier for the MLflow tracking run associated with the source model artifacts. */
  runId?: string | undefined;
  status?: ModelVersionStatus | undefined;
  /** Details on the current status, for example why registration failed. */
  statusMessage?: string | undefined;
  /**
   * Open requests for this `model_versions`.
   * Gap in sequence number is intentional and is done in order to
   * match field sequence numbers of `ModelVersion` proto message
   */
  openRequests?: Activity[] | undefined;
  permissionLevel?: PermissionLevel | undefined;
  /** Array of tags that are associated with the model version. */
  tags?: ModelVersionTag[] | undefined;
  /** URL of the run associated with the model artifacts. This field is set at model version creation time only for model versions whose source run is from a tracking server that is different from the registry server. */
  runLink?: string | undefined;
  /**
   * Email Subscription Status: This is the subscription status of the user to the model version
   * Users get subscribed by interacting with the model version.
   */
  emailSubscriptionStatus?: RegistryEmailSubscriptionType | undefined;
  /** Feature lineage of `model_version`. */
  featureList?: FeatureList | undefined;
}

export interface ModelVersionTag {
  /** The tag key. */
  key?: string | undefined;
  /** The tag value. */
  value?: string | undefined;
}

export interface RegisteredModel {
  /** Unique name for the model. */
  name?: string | undefined;
  /** Timestamp recorded when this `registered_model` was created. */
  creationTimestamp?: bigint | undefined;
  /** Timestamp recorded when metadata for this `registered_model` was last updated. */
  lastUpdatedTimestamp?: bigint | undefined;
  /** User that created this `registered_model` */
  userId?: string | undefined;
  /** Description of this `registered_model`. */
  description?: string | undefined;
  /**
   * Collection of latest model versions for each stage.
   * Only contains models with current `READY` status.
   */
  latestVersions?: ModelVersion[] | undefined;
  /** Tags: Additional metadata key-value pairs for this `registered_model`. */
  tags?: RegisteredModelTag[] | undefined;
}

export interface RegisteredModelDatabricks {
  /** Name of the model. */
  name?: string | undefined;
  /** Creation time of the object, as a Unix timestamp in milliseconds. */
  creationTimestamp?: bigint | undefined;
  /** Last update time of the object, as a Unix timestamp in milliseconds. */
  lastUpdatedTimestamp?: bigint | undefined;
  /** The username of the user that created the object. */
  userId?: string | undefined;
  /** User-specified description for the object. */
  description?: string | undefined;
  /** Array of model versions, each the latest version for its stage. */
  latestVersions?: ModelVersion[] | undefined;
  /** Unique identifier for the object. */
  id?: string | undefined;
  /** Permission level granted for the requesting user on this registered model */
  permissionLevel?: PermissionLevel | undefined;
  /** Array of tags associated with the model. */
  tags?: RegisteredModelTag[] | undefined;
}

/** Tag for a registered model */
export interface RegisteredModelTag {
  /** The tag key. */
  key?: string | undefined;
  /** The tag value. */
  value?: string | undefined;
}

export interface RegistryWebhook {
  /** Webhook ID */
  id?: string | undefined;
  /**
   * Events that can trigger a registry webhook:
   * * `MODEL_VERSION_CREATED`: A new model version was created for the associated model.
   *
   * * `MODEL_VERSION_TRANSITIONED_STAGE`: A model version’s stage was changed.
   *
   * * `TRANSITION_REQUEST_CREATED`: A user requested a model version’s stage be transitioned.
   *
   * * `COMMENT_CREATED`: A user wrote a comment on a registered model.
   *
   * * `REGISTERED_MODEL_CREATED`: A new registered model was created. This event type can only be specified for a registry-wide webhook, which can be created by not specifying a model name in the create request.
   *
   * * `MODEL_VERSION_TAG_SET`: A user set a tag on the model version.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_STAGING`: A model version was transitioned to staging.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_PRODUCTION`: A model version was transitioned to production.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_ARCHIVED`: A model version was archived.
   *
   * * `TRANSITION_REQUEST_TO_STAGING_CREATED`: A user requested a model version be transitioned to staging.
   *
   * * `TRANSITION_REQUEST_TO_PRODUCTION_CREATED`: A user requested a model version be transitioned to production.
   *
   * * `TRANSITION_REQUEST_TO_ARCHIVED_CREATED`: A user requested a model version be archived.
   */
  events?: RegistryWebhookEvent[] | undefined;
  /** Creation time of the object, as a Unix timestamp in milliseconds. */
  creationTimestamp?: bigint | undefined;
  /** Time of the object at last update, as a Unix timestamp in milliseconds. */
  lastUpdatedTimestamp?: bigint | undefined;
  /** User-specified description for the webhook. */
  description?: string | undefined;
  status?: RegistryWebhookStatus | undefined;
  httpUrlSpec?: HttpUrlSpec | undefined;
  jobSpec?: JobSpec | undefined;
  /** Name of the model whose events would trigger this webhook. */
  modelName?: string | undefined;
}

/** Details required to identify and reject a model version stage transition request. */
export interface RejectTransitionRequest {
  /** Name of the model. */
  name?: string | undefined;
  /** Version of the model. */
  version?: string | undefined;
  /**
   * Target stage of the transition. Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  stage?: string | undefined;
  /** User-provided comment on the action. */
  comment?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface RejectTransitionRequest_Response {
  /** New activity generated as a result of this operation. */
  activity?: Activity | undefined;
}

export interface RenameRegisteredModelRequest {
  /** Registered model unique name identifier. */
  name?: string | undefined;
  /** If provided, updates the name for this `registered_model`. */
  newName?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface RenameRegisteredModelRequest_Response {
  registeredModel?: RegisteredModel | undefined;
}

export interface SearchModelVersionsRequest {
  /**
   * String filter condition, like "name='my-model-name'". Must be a single boolean condition,
   * with string values wrapped in single quotes.
   */
  filter?: string | undefined;
  /** Maximum number of models desired. Max threshold is 10K. */
  maxResults?: bigint | undefined;
  /**
   * List of columns to be ordered by including model name, version, stage with an
   * optional "DESC" or "ASC" annotation, where "ASC" is the default.
   * Tiebreaks are done by latest stage transition timestamp, followed by name ASC, followed by
   * version DESC.
   */
  orderBy?: string[] | undefined;
  /** Pagination token to go to next page based on previous search query. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SearchModelVersionsRequest_Response {
  /** Models that match the search criteria */
  modelVersions?: ModelVersion[] | undefined;
  /** Pagination token to request next page of models for the same search query. */
  nextPageToken?: string | undefined;
}

export interface SearchRegisteredModelsRequest {
  /**
   * String filter condition, like "name LIKE 'my-model-name'".
   * Interpreted in the backend automatically as "name LIKE '%my-model-name%'".
   * Single boolean condition, with string values wrapped in single quotes.
   */
  filter?: string | undefined;
  /** Maximum number of models desired. Default is 100. Max threshold is 1000. */
  maxResults?: bigint | undefined;
  /**
   * List of columns for ordering search results, which can include model name and last updated
   * timestamp with an optional "DESC" or "ASC" annotation, where "ASC" is the default.
   * Tiebreaks are done by model name ASC.
   */
  orderBy?: string[] | undefined;
  /** Pagination token to go to the next page based on a previous search query. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface SearchRegisteredModelsRequest_Response {
  /** Registered Models that match the search criteria. */
  registeredModels?: RegisteredModel[] | undefined;
  /** Pagination token to request the next page of models. */
  nextPageToken?: string | undefined;
}

export interface SetModelVersionTagRequest {
  /** Unique name of the model. */
  name?: string | undefined;
  /** Model version number. */
  version?: string | undefined;
  /**
   * Name of the tag. Maximum size depends on storage backend.
   * If a tag with this name already exists, its preexisting value will be replaced by the specified `value`.
   * All storage backends are guaranteed to support key values up to 250 bytes in size.
   */
  key?: string | undefined;
  /**
   * String value of the tag being logged. Maximum size depends on storage backend.
   * All storage backends are guaranteed to support key values up to 5000 bytes in size.
   */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface SetModelVersionTagRequest_Response {}

export interface SetRegisteredModelTagRequest {
  /** Unique name of the model. */
  name?: string | undefined;
  /**
   * Name of the tag. Maximum size depends on storage backend.
   * If a tag with this name already exists, its preexisting value will be replaced by the specified `value`.
   * All storage backends are guaranteed to support key values up to 250 bytes in size.
   */
  key?: string | undefined;
  /**
   * String value of the tag being logged. Maximum size depends on storage backend.
   * All storage backends are guaranteed to support key values up to 5000 bytes in size.
   */
  value?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface SetRegisteredModelTagRequest_Response {}

/** Details required to test a registry webhook. */
export interface TestRegistryWebhookRequest {
  /** Webhook ID */
  id?: string | undefined;
  /** If `event` is specified, the test trigger uses the specified event. If `event` is not specified, the test trigger uses a randomly chosen event associated with the webhook. */
  event?: RegistryWebhookEvent | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface TestRegistryWebhookRequest_Response {
  /** Status code returned by the webhook URL */
  statusCode?: number | undefined;
  /** Body of the response from the webhook URL */
  body?: string | undefined;
}

/** Details required to transition a model version's stage. */
export interface TransitionModelVersionStageDatabricksRequest {
  /** Name of the model. */
  name?: string | undefined;
  /** Version of the model. */
  version?: string | undefined;
  /**
   * Target stage of the transition. Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  stage?: string | undefined;
  /** Specifies whether to archive all current model versions in the target stage. */
  archiveExistingVersions?: boolean | undefined;
  /** User-provided comment on the action. */
  comment?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface TransitionModelVersionStageDatabricksRequest_Response {
  /** Updated model version */
  modelVersionDatabricks?: ModelVersionDatabricks | undefined;
}

/**
 * For activities, this contains the activity recorded for the action.
 * For comments, this contains the comment details.
 * For transition requests, this contains the transition request details.
 */
export interface TransitionRequest {
  /** Creation time of the object, as a Unix timestamp in milliseconds. */
  creationTimestamp?: bigint | undefined;
  /** The username of the user that created the object. */
  userId?: string | undefined;
  activityType?: ActivityType | undefined;
  /** User-provided comment associated with the activity, comment, or transition request. */
  comment?: string | undefined;
  /** Time of the object at last update, as a Unix timestamp in milliseconds. */
  lastUpdatedTimestamp?: bigint | undefined;
  /**
   * Source stage of the transition (if the activity is stage transition related). Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  fromStage?: string | undefined;
  /**
   * Target stage of the transition (if the activity is stage transition related). Valid values are:
   *
   * * `None`: The initial stage of a model version.
   *
   * * `Staging`: Staging or pre-production stage.
   *
   * * `Production`: Production stage.
   *
   * * `Archived`: Archived stage.
   */
  toStage?: string | undefined;
  /** Comment made by system, for example explaining an activity of type `SYSTEM_TRANSITION`. It usually describes a side effect, such as a version being archived as part of another version's stage transition, and may not be returned for some activity types. */
  systemComment?: string | undefined;
  /** Array of actions on the activity allowed for the current viewer. */
  availableActions?: ActivityAction[] | undefined;
  /** Unique identifier for the object. */
  id?: string | undefined;
}

/** Details required to edit a comment on a model version. */
export interface UpdateCommentRequest {
  /** Unique identifier of an activity */
  id?: string | undefined;
  /** User-provided comment on the action. */
  comment?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateCommentRequest_Response {
  /** Updated comment object */
  comment?: CommentObject | undefined;
}

export interface UpdateModelVersionRequest {
  /** Name of the registered model */
  name?: string | undefined;
  /** Model version number */
  version?: string | undefined;
  /** If provided, updates the description for this `registered_model`. */
  description?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateModelVersionRequest_Response {
  /** Return new version number generated for this model in registry. */
  modelVersion?: ModelVersion | undefined;
}

export interface UpdateRegisteredModelRequest {
  /** Registered model unique name identifier. */
  name?: string | undefined;
  /** If provided, updates the description for this `registered_model`. */
  description?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateRegisteredModelRequest_Response {
  registeredModel?: RegisteredModel | undefined;
}

/** Details required to update a registry webhook. Only the fields that need to be updated should be specified, and both `http_url_spec` and `job_spec` should not be specified in the same request. */
export interface UpdateRegistryWebhookRequest {
  /** Webhook ID */
  id?: string | undefined;
  /**
   * Events that can trigger a registry webhook:
   * * `MODEL_VERSION_CREATED`: A new model version was created for the associated model.
   *
   * * `MODEL_VERSION_TRANSITIONED_STAGE`: A model version’s stage was changed.
   *
   * * `TRANSITION_REQUEST_CREATED`: A user requested a model version’s stage be transitioned.
   *
   * * `COMMENT_CREATED`: A user wrote a comment on a registered model.
   *
   * * `REGISTERED_MODEL_CREATED`: A new registered model was created. This event type can only be specified for a registry-wide webhook, which can be created by not specifying a model name in the create request.
   *
   * * `MODEL_VERSION_TAG_SET`: A user set a tag on the model version.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_STAGING`: A model version was transitioned to staging.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_PRODUCTION`: A model version was transitioned to production.
   *
   * * `MODEL_VERSION_TRANSITIONED_TO_ARCHIVED`: A model version was archived.
   *
   * * `TRANSITION_REQUEST_TO_STAGING_CREATED`: A user requested a model version be transitioned to staging.
   *
   * * `TRANSITION_REQUEST_TO_PRODUCTION_CREATED`: A user requested a model version be transitioned to production.
   *
   * * `TRANSITION_REQUEST_TO_ARCHIVED_CREATED`: A user requested a model version be archived.
   */
  events?: RegistryWebhookEvent[] | undefined;
  /** User-specified description for the webhook. */
  description?: string | undefined;
  status?: RegistryWebhookStatus | undefined;
  httpUrlSpec?: HttpUrlSpec | undefined;
  jobSpec?: JobSpec | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface UpdateRegistryWebhookRequest_Response {
  webhook?: RegistryWebhook | undefined;
}

export const unmarshalActivitySchema: z.ZodType<Activity> = z
  .object({
    creation_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    user_id: z.string().optional(),
    activity_type: z.enum(ActivityType).optional(),
    comment: z.string().optional(),
    last_updated_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    from_stage: z.string().optional(),
    to_stage: z.string().optional(),
    system_comment: z.string().optional(),
    available_actions: z.array(z.enum(ActivityAction)).optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    creationTimestamp: d.creation_timestamp,
    userId: d.user_id,
    activityType: d.activity_type,
    comment: d.comment,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    fromStage: d.from_stage,
    toStage: d.to_stage,
    systemComment: d.system_comment,
    availableActions: d.available_actions,
    id: d.id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalApproveTransitionRequest_ResponseSchema: z.ZodType<ApproveTransitionRequest_Response> =
  z
    .object({
      activity: z.lazy(() => unmarshalActivitySchema).optional(),
    })
    .transform(d => ({
      activity: d.activity,
    }));

export const unmarshalCommentObjectSchema: z.ZodType<CommentObject> = z
  .object({
    creation_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    user_id: z.string().optional(),
    activity_type: z.enum(ActivityType).optional(),
    comment: z.string().optional(),
    last_updated_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    from_stage: z.string().optional(),
    to_stage: z.string().optional(),
    system_comment: z.string().optional(),
    available_actions: z.array(z.enum(ActivityAction)).optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    creationTimestamp: d.creation_timestamp,
    userId: d.user_id,
    activityType: d.activity_type,
    comment: d.comment,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    fromStage: d.from_stage,
    toStage: d.to_stage,
    systemComment: d.system_comment,
    availableActions: d.available_actions,
    id: d.id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateCommentRequest_ResponseSchema: z.ZodType<CreateCommentRequest_Response> =
  z
    .object({
      comment: z.lazy(() => unmarshalCommentObjectSchema).optional(),
    })
    .transform(d => ({
      comment: d.comment,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateModelVersionRequest_ResponseSchema: z.ZodType<CreateModelVersionRequest_Response> =
  z
    .object({
      model_version: z.lazy(() => unmarshalModelVersionSchema).optional(),
    })
    .transform(d => ({
      modelVersion: d.model_version,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateRegisteredModelRequest_ResponseSchema: z.ZodType<CreateRegisteredModelRequest_Response> =
  z
    .object({
      registered_model: z.lazy(() => unmarshalRegisteredModelSchema).optional(),
    })
    .transform(d => ({
      registeredModel: d.registered_model,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateRegistryWebhookRequest_ResponseSchema: z.ZodType<CreateRegistryWebhookRequest_Response> =
  z
    .object({
      webhook: z.lazy(() => unmarshalRegistryWebhookSchema).optional(),
    })
    .transform(d => ({
      webhook: d.webhook,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateTransitionRequest_ResponseSchema: z.ZodType<CreateTransitionRequest_Response> =
  z
    .object({
      request: z.lazy(() => unmarshalTransitionRequestSchema).optional(),
    })
    .transform(d => ({
      request: d.request,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteCommentRequest_ResponseSchema: z.ZodType<DeleteCommentRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteModelVersionRequest_ResponseSchema: z.ZodType<DeleteModelVersionRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteModelVersionTagRequest_ResponseSchema: z.ZodType<DeleteModelVersionTagRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteRegisteredModelRequest_ResponseSchema: z.ZodType<DeleteRegisteredModelRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteRegisteredModelTagRequest_ResponseSchema: z.ZodType<DeleteRegisteredModelTagRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteRegistryWebhookRequest_ResponseSchema: z.ZodType<DeleteRegistryWebhookRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteTransitionRequest_ResponseSchema: z.ZodType<DeleteTransitionRequest_Response> =
  z
    .object({
      activity: z.lazy(() => unmarshalActivitySchema).optional(),
    })
    .transform(d => ({
      activity: d.activity,
    }));

export const unmarshalFeatureListSchema: z.ZodType<FeatureList> = z
  .object({
    features: z.array(z.lazy(() => unmarshalLinkedFeatureSchema)).optional(),
  })
  .transform(d => ({
    features: d.features,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetLatestVersionsRequest_ResponseSchema: z.ZodType<GetLatestVersionsRequest_Response> =
  z
    .object({
      model_versions: z
        .array(z.lazy(() => unmarshalModelVersionSchema))
        .optional(),
    })
    .transform(d => ({
      modelVersions: d.model_versions,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetModelVersionDownloadUriRequest_ResponseSchema: z.ZodType<GetModelVersionDownloadUriRequest_Response> =
  z
    .object({
      artifact_uri: z.string().optional(),
    })
    .transform(d => ({
      artifactUri: d.artifact_uri,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetModelVersionRequest_ResponseSchema: z.ZodType<GetModelVersionRequest_Response> =
  z
    .object({
      model_version: z.lazy(() => unmarshalModelVersionSchema).optional(),
    })
    .transform(d => ({
      modelVersion: d.model_version,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetRegisteredModelDatabricksRequest_ResponseSchema: z.ZodType<GetRegisteredModelDatabricksRequest_Response> =
  z
    .object({
      registered_model_databricks: z
        .lazy(() => unmarshalRegisteredModelDatabricksSchema)
        .optional(),
    })
    .transform(d => ({
      registeredModelDatabricks: d.registered_model_databricks,
    }));

export const unmarshalHttpUrlSpecSchema: z.ZodType<HttpUrlSpec> = z
  .object({
    url: z.string().optional(),
    enable_ssl_verification: z.boolean().optional(),
    secret: z.string().optional(),
    authorization: z.string().optional(),
  })
  .transform(d => ({
    url: d.url,
    enableSslVerification: d.enable_ssl_verification,
    secret: d.secret,
    authorization: d.authorization,
  }));

export const unmarshalJobSpecSchema: z.ZodType<JobSpec> = z
  .object({
    job_id: z.string().optional(),
    workspace_url: z.string().optional(),
    access_token: z.string().optional(),
  })
  .transform(d => ({
    jobId: d.job_id,
    workspaceUrl: d.workspace_url,
    accessToken: d.access_token,
  }));

export const unmarshalLinkedFeatureSchema: z.ZodType<LinkedFeature> = z
  .object({
    feature_table_name: z.string().optional(),
    feature_name: z.string().optional(),
    feature_table_id: z.string().optional(),
  })
  .transform(d => ({
    featureTableName: d.feature_table_name,
    featureName: d.feature_name,
    featureTableId: d.feature_table_id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListRegisteredModelsRequest_ResponseSchema: z.ZodType<ListRegisteredModelsRequest_Response> =
  z
    .object({
      registered_models: z
        .array(z.lazy(() => unmarshalRegisteredModelSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      registeredModels: d.registered_models,
      nextPageToken: d.next_page_token,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListRegistryWebhooksRequest_ResponseSchema: z.ZodType<ListRegistryWebhooksRequest_Response> =
  z
    .object({
      webhooks: z
        .array(z.lazy(() => unmarshalRegistryWebhookSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      webhooks: d.webhooks,
      nextPageToken: d.next_page_token,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListTransitionRequest_ResponseSchema: z.ZodType<ListTransitionRequest_Response> =
  z
    .object({
      requests: z.array(z.lazy(() => unmarshalActivitySchema)).optional(),
    })
    .transform(d => ({
      requests: d.requests,
    }));

export const unmarshalModelVersionSchema: z.ZodType<ModelVersion> = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
    creation_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    last_updated_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    user_id: z.string().optional(),
    current_stage: z.string().optional(),
    description: z.string().optional(),
    source: z.string().optional(),
    run_id: z.string().optional(),
    status: z.enum(ModelVersionStatus).optional(),
    status_message: z.string().optional(),
    tags: z.array(z.lazy(() => unmarshalModelVersionTagSchema)).optional(),
    run_link: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    creationTimestamp: d.creation_timestamp,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    userId: d.user_id,
    currentStage: d.current_stage,
    description: d.description,
    source: d.source,
    runId: d.run_id,
    status: d.status,
    statusMessage: d.status_message,
    tags: d.tags,
    runLink: d.run_link,
  }));

export const unmarshalModelVersionDatabricksSchema: z.ZodType<ModelVersionDatabricks> =
  z
    .object({
      name: z.string().optional(),
      version: z.string().optional(),
      creation_timestamp: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      last_updated_timestamp: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      user_id: z.string().optional(),
      current_stage: z.string().optional(),
      description: z.string().optional(),
      source: z.string().optional(),
      run_id: z.string().optional(),
      status: z.enum(ModelVersionStatus).optional(),
      status_message: z.string().optional(),
      open_requests: z.array(z.lazy(() => unmarshalActivitySchema)).optional(),
      permission_level: z.enum(PermissionLevel).optional(),
      tags: z.array(z.lazy(() => unmarshalModelVersionTagSchema)).optional(),
      run_link: z.string().optional(),
      email_subscription_status: z
        .enum(RegistryEmailSubscriptionType)
        .optional(),
      feature_list: z.lazy(() => unmarshalFeatureListSchema).optional(),
    })
    .transform(d => ({
      name: d.name,
      version: d.version,
      creationTimestamp: d.creation_timestamp,
      lastUpdatedTimestamp: d.last_updated_timestamp,
      userId: d.user_id,
      currentStage: d.current_stage,
      description: d.description,
      source: d.source,
      runId: d.run_id,
      status: d.status,
      statusMessage: d.status_message,
      openRequests: d.open_requests,
      permissionLevel: d.permission_level,
      tags: d.tags,
      runLink: d.run_link,
      emailSubscriptionStatus: d.email_subscription_status,
      featureList: d.feature_list,
    }));

export const unmarshalModelVersionTagSchema: z.ZodType<ModelVersionTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalRegisteredModelSchema: z.ZodType<RegisteredModel> = z
  .object({
    name: z.string().optional(),
    creation_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    last_updated_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    user_id: z.string().optional(),
    description: z.string().optional(),
    latest_versions: z
      .array(z.lazy(() => unmarshalModelVersionSchema))
      .optional(),
    tags: z.array(z.lazy(() => unmarshalRegisteredModelTagSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    creationTimestamp: d.creation_timestamp,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    userId: d.user_id,
    description: d.description,
    latestVersions: d.latest_versions,
    tags: d.tags,
  }));

export const unmarshalRegisteredModelDatabricksSchema: z.ZodType<RegisteredModelDatabricks> =
  z
    .object({
      name: z.string().optional(),
      creation_timestamp: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      last_updated_timestamp: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      user_id: z.string().optional(),
      description: z.string().optional(),
      latest_versions: z
        .array(z.lazy(() => unmarshalModelVersionSchema))
        .optional(),
      id: z.string().optional(),
      permission_level: z.enum(PermissionLevel).optional(),
      tags: z.array(z.lazy(() => unmarshalRegisteredModelTagSchema)).optional(),
    })
    .transform(d => ({
      name: d.name,
      creationTimestamp: d.creation_timestamp,
      lastUpdatedTimestamp: d.last_updated_timestamp,
      userId: d.user_id,
      description: d.description,
      latestVersions: d.latest_versions,
      id: d.id,
      permissionLevel: d.permission_level,
      tags: d.tags,
    }));

export const unmarshalRegisteredModelTagSchema: z.ZodType<RegisteredModelTag> =
  z
    .object({
      key: z.string().optional(),
      value: z.string().optional(),
    })
    .transform(d => ({
      key: d.key,
      value: d.value,
    }));

export const unmarshalRegistryWebhookSchema: z.ZodType<RegistryWebhook> = z
  .object({
    id: z.string().optional(),
    events: z.array(z.enum(RegistryWebhookEvent)).optional(),
    creation_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    last_updated_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    description: z.string().optional(),
    status: z.enum(RegistryWebhookStatus).optional(),
    http_url_spec: z.lazy(() => unmarshalHttpUrlSpecSchema).optional(),
    job_spec: z.lazy(() => unmarshalJobSpecSchema).optional(),
    model_name: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    events: d.events,
    creationTimestamp: d.creation_timestamp,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    description: d.description,
    status: d.status,
    httpUrlSpec: d.http_url_spec,
    jobSpec: d.job_spec,
    modelName: d.model_name,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRejectTransitionRequest_ResponseSchema: z.ZodType<RejectTransitionRequest_Response> =
  z
    .object({
      activity: z.lazy(() => unmarshalActivitySchema).optional(),
    })
    .transform(d => ({
      activity: d.activity,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRenameRegisteredModelRequest_ResponseSchema: z.ZodType<RenameRegisteredModelRequest_Response> =
  z
    .object({
      registered_model: z.lazy(() => unmarshalRegisteredModelSchema).optional(),
    })
    .transform(d => ({
      registeredModel: d.registered_model,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSearchModelVersionsRequest_ResponseSchema: z.ZodType<SearchModelVersionsRequest_Response> =
  z
    .object({
      model_versions: z
        .array(z.lazy(() => unmarshalModelVersionSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      modelVersions: d.model_versions,
      nextPageToken: d.next_page_token,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSearchRegisteredModelsRequest_ResponseSchema: z.ZodType<SearchRegisteredModelsRequest_Response> =
  z
    .object({
      registered_models: z
        .array(z.lazy(() => unmarshalRegisteredModelSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      registeredModels: d.registered_models,
      nextPageToken: d.next_page_token,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSetModelVersionTagRequest_ResponseSchema: z.ZodType<SetModelVersionTagRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalSetRegisteredModelTagRequest_ResponseSchema: z.ZodType<SetRegisteredModelTagRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalTestRegistryWebhookRequest_ResponseSchema: z.ZodType<TestRegistryWebhookRequest_Response> =
  z
    .object({
      status_code: z.number().optional(),
      body: z.string().optional(),
    })
    .transform(d => ({
      statusCode: d.status_code,
      body: d.body,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalTransitionModelVersionStageDatabricksRequest_ResponseSchema: z.ZodType<TransitionModelVersionStageDatabricksRequest_Response> =
  z
    .object({
      model_version_databricks: z
        .lazy(() => unmarshalModelVersionDatabricksSchema)
        .optional(),
    })
    .transform(d => ({
      modelVersionDatabricks: d.model_version_databricks,
    }));

export const unmarshalTransitionRequestSchema: z.ZodType<TransitionRequest> = z
  .object({
    creation_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    user_id: z.string().optional(),
    activity_type: z.enum(ActivityType).optional(),
    comment: z.string().optional(),
    last_updated_timestamp: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    from_stage: z.string().optional(),
    to_stage: z.string().optional(),
    system_comment: z.string().optional(),
    available_actions: z.array(z.enum(ActivityAction)).optional(),
    id: z.string().optional(),
  })
  .transform(d => ({
    creationTimestamp: d.creation_timestamp,
    userId: d.user_id,
    activityType: d.activity_type,
    comment: d.comment,
    lastUpdatedTimestamp: d.last_updated_timestamp,
    fromStage: d.from_stage,
    toStage: d.to_stage,
    systemComment: d.system_comment,
    availableActions: d.available_actions,
    id: d.id,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateCommentRequest_ResponseSchema: z.ZodType<UpdateCommentRequest_Response> =
  z
    .object({
      comment: z.lazy(() => unmarshalCommentObjectSchema).optional(),
    })
    .transform(d => ({
      comment: d.comment,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateModelVersionRequest_ResponseSchema: z.ZodType<UpdateModelVersionRequest_Response> =
  z
    .object({
      model_version: z.lazy(() => unmarshalModelVersionSchema).optional(),
    })
    .transform(d => ({
      modelVersion: d.model_version,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateRegisteredModelRequest_ResponseSchema: z.ZodType<UpdateRegisteredModelRequest_Response> =
  z
    .object({
      registered_model: z.lazy(() => unmarshalRegisteredModelSchema).optional(),
    })
    .transform(d => ({
      registeredModel: d.registered_model,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUpdateRegistryWebhookRequest_ResponseSchema: z.ZodType<UpdateRegistryWebhookRequest_Response> =
  z
    .object({
      webhook: z.lazy(() => unmarshalRegistryWebhookSchema).optional(),
    })
    .transform(d => ({
      webhook: d.webhook,
    }));

export const marshalApproveTransitionRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
    stage: z.string().optional(),
    archiveExistingVersions: z.boolean().optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    stage: d.stage,
    archive_existing_versions: d.archiveExistingVersions,
    comment: d.comment,
  }));

export const marshalCreateCommentRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    comment: d.comment,
  }));

export const marshalCreateModelVersionRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    source: z.string().optional(),
    runId: z.string().optional(),
    tags: z.array(z.lazy(() => marshalModelVersionTagSchema)).optional(),
    runLink: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    source: d.source,
    run_id: d.runId,
    tags: d.tags,
    run_link: d.runLink,
    description: d.description,
  }));

export const marshalCreateRegisteredModelRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    tags: z.array(z.lazy(() => marshalRegisteredModelTagSchema)).optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    tags: d.tags,
    description: d.description,
  }));

export const marshalCreateRegistryWebhookRequestSchema: z.ZodType = z
  .object({
    modelName: z.string().optional(),
    events: z.array(z.enum(RegistryWebhookEvent)).optional(),
    description: z.string().optional(),
    status: z.enum(RegistryWebhookStatus).optional(),
    httpUrlSpec: z.lazy(() => marshalHttpUrlSpecSchema).optional(),
    jobSpec: z.lazy(() => marshalJobSpecSchema).optional(),
  })
  .transform(d => ({
    model_name: d.modelName,
    events: d.events,
    description: d.description,
    status: d.status,
    http_url_spec: d.httpUrlSpec,
    job_spec: d.jobSpec,
  }));

export const marshalCreateTransitionRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
    stage: z.string().optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    stage: d.stage,
    comment: d.comment,
  }));

export const marshalGetLatestVersionsRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    stages: z.array(z.string()).optional(),
  })
  .transform(d => ({
    name: d.name,
    stages: d.stages,
  }));

export const marshalHttpUrlSpecSchema: z.ZodType = z
  .object({
    url: z.string().optional(),
    enableSslVerification: z.boolean().optional(),
    secret: z.string().optional(),
    authorization: z.string().optional(),
  })
  .transform(d => ({
    url: d.url,
    enable_ssl_verification: d.enableSslVerification,
    secret: d.secret,
    authorization: d.authorization,
  }));

export const marshalJobSpecSchema: z.ZodType = z
  .object({
    jobId: z.string().optional(),
    workspaceUrl: z.string().optional(),
    accessToken: z.string().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    workspace_url: d.workspaceUrl,
    access_token: d.accessToken,
  }));

export const marshalModelVersionTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalRegisteredModelTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalRejectTransitionRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
    stage: z.string().optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    stage: d.stage,
    comment: d.comment,
  }));

export const marshalRenameRegisteredModelRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    newName: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    new_name: d.newName,
  }));

export const marshalSetModelVersionTagRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    key: d.key,
    value: d.value,
  }));

export const marshalSetRegisteredModelTagRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    key: d.key,
    value: d.value,
  }));

export const marshalTestRegistryWebhookRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    event: z.enum(RegistryWebhookEvent).optional(),
  })
  .transform(d => ({
    id: d.id,
    event: d.event,
  }));

export const marshalTransitionModelVersionStageDatabricksRequestSchema: z.ZodType =
  z
    .object({
      name: z.string().optional(),
      version: z.string().optional(),
      stage: z.string().optional(),
      archiveExistingVersions: z.boolean().optional(),
      comment: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
      version: d.version,
      stage: d.stage,
      archive_existing_versions: d.archiveExistingVersions,
      comment: d.comment,
    }));

export const marshalUpdateCommentRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    comment: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    comment: d.comment,
  }));

export const marshalUpdateModelVersionRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
    description: d.description,
  }));

export const marshalUpdateRegisteredModelRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
  }));

export const marshalUpdateRegistryWebhookRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    events: z.array(z.enum(RegistryWebhookEvent)).optional(),
    description: z.string().optional(),
    status: z.enum(RegistryWebhookStatus).optional(),
    httpUrlSpec: z.lazy(() => marshalHttpUrlSpecSchema).optional(),
    jobSpec: z.lazy(() => marshalJobSpecSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    events: d.events,
    description: d.description,
    status: d.status,
    http_url_spec: d.httpUrlSpec,
    job_spec: d.jobSpec,
  }));
