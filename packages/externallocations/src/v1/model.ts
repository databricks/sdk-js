// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export enum IsolationMode {
  ISOLATION_MODE_UNSPECIFIED = 'ISOLATION_MODE_UNSPECIFIED',
  ISOLATION_MODE_OPEN = 'ISOLATION_MODE_OPEN',
  ISOLATION_MODE_ISOLATED = 'ISOLATION_MODE_ISOLATED',
  ISOLATION_MODE_OPEN_IN_ACCOUNT = 'ISOLATION_MODE_OPEN_IN_ACCOUNT',
}

export enum SseEncryptionAlgorithm {
  SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED = 'SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED',
  AWS_SSE_S3 = 'AWS_SSE_S3',
  AWS_SSE_KMS = 'AWS_SSE_KMS',
}

export interface AwsSqsQueue {
  /**
   * The AQS queue url in the format https://sqs.{region}.amazonaws.com/{account id}/{queue name}.
   * Only required for provided_sqs.
   */
  queueUrl?: string | undefined;
  /** Unique identifier included in the name of file events managed cloud resources. */
  managedResourceId?: string | undefined;
}

export interface AzureQueueStorage {
  /**
   * The AQS queue url in the format https://{storage account}.queue.core.windows.net/{queue name}
   * Only required for provided_aqs.
   */
  queueUrl?: string | undefined;
  /**
   * Optional subscription id for the queue, event grid subscription, and external location storage
   * account.
   * Required for locations with a service principal storage credential
   */
  subscriptionId?: string | undefined;
  /**
   * Optional resource group for the queue, event grid subscription, and external location storage
   * account.
   * Only required for locations with a service principal storage credential
   */
  resourceGroup?: string | undefined;
  /** Unique identifier included in the name of file events managed cloud resources. */
  managedResourceId?: string | undefined;
}

export interface CreateExternalLocation {
  /** Skips validation of the storage credential associated with the external location. */
  skipValidation?: boolean | undefined;
  /** Name of the external location. */
  name?: string | undefined;
  /** Path URL of the external location. */
  url?: string | undefined;
  /** Name of the storage credential used with this location. */
  credentialName?: string | undefined;
  /** Indicates whether the external location is read-only. */
  readOnly?: boolean | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /**
   * Whether to enable file events on this external location. Default to `true`. Set to `false` to disable file events.
   * The actual applied value may differ due to server-side defaults; check `effective_enable_file_events` for the effective state.
   */
  enableFileEvents?: boolean | undefined;
  /** File event queue settings. If `enable_file_events` is not `false`, must be defined and have exactly one of the documented properties. */
  fileEventQueue?: FileEventQueue | undefined;
  /** The owner of the external location. */
  owner?: string | undefined;
  encryptionDetails?: EncryptionDetails | undefined;
  /** Unique identifier of metastore hosting the external location. */
  metastoreId?: string | undefined;
  /** Unique ID of the location's storage credential. */
  credentialId?: string | undefined;
  /** Time at which this external location was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of external location creator. */
  createdBy?: string | undefined;
  /** Time at which external location this was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the external location. */
  updatedBy?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  isolationMode?: IsolationMode | undefined;
  /** Indicates whether fallback mode is enabled for this external location. When fallback mode is enabled, the access to the location falls back to cluster credentials if UC credentials are not sufficient. */
  fallback?: boolean | undefined;
  /** The effective value of `enable_file_events` after applying server-side defaults. */
  effectiveEnableFileEvents?: boolean | undefined;
  /**
   * The effective file event queue configuration after applying server-side defaults.
   * Always populated when a queue is provisioned, regardless of whether the user explicitly
   * set `enable_file_events`. Use this field instead of `file_event_queue` for reading
   * the actual queue state.
   */
  effectiveFileEventQueue?: FileEventQueue | undefined;
}

export interface DeleteExternalLocation {
  /** Name of the external location. */
  nameArg?: string | undefined;
  /** Force deletion even if there are dependent external tables or mounts. */
  force?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteExternalLocation_Response {}

/** Encryption options that apply to clients connecting to cloud storage. */
export interface EncryptionDetails {
  /** Server-Side Encryption properties for clients communicating with AWS s3. */
  sseEncryptionDetails?: SseEncryptionDetails | undefined;
}

export interface ExternalLocationInfo {
  /** Name of the external location. */
  name?: string | undefined;
  /** Path URL of the external location. */
  url?: string | undefined;
  /** Name of the storage credential used with this location. */
  credentialName?: string | undefined;
  /** Indicates whether the external location is read-only. */
  readOnly?: boolean | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /**
   * Whether to enable file events on this external location. Default to `true`. Set to `false` to disable file events.
   * The actual applied value may differ due to server-side defaults; check `effective_enable_file_events` for the effective state.
   */
  enableFileEvents?: boolean | undefined;
  /** File event queue settings. If `enable_file_events` is not `false`, must be defined and have exactly one of the documented properties. */
  fileEventQueue?: FileEventQueue | undefined;
  /** The owner of the external location. */
  owner?: string | undefined;
  encryptionDetails?: EncryptionDetails | undefined;
  /** Unique identifier of metastore hosting the external location. */
  metastoreId?: string | undefined;
  /** Unique ID of the location's storage credential. */
  credentialId?: string | undefined;
  /** Time at which this external location was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of external location creator. */
  createdBy?: string | undefined;
  /** Time at which external location this was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the external location. */
  updatedBy?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  isolationMode?: IsolationMode | undefined;
  /** Indicates whether fallback mode is enabled for this external location. When fallback mode is enabled, the access to the location falls back to cluster credentials if UC credentials are not sufficient. */
  fallback?: boolean | undefined;
  /** The effective value of `enable_file_events` after applying server-side defaults. */
  effectiveEnableFileEvents?: boolean | undefined;
  /**
   * The effective file event queue configuration after applying server-side defaults.
   * Always populated when a queue is provisioned, regardless of whether the user explicitly
   * set `enable_file_events`. Use this field instead of `file_event_queue` for reading
   * the actual queue state.
   */
  effectiveFileEventQueue?: FileEventQueue | undefined;
}

export interface FileEventQueue {
  providedAqs?: AzureQueueStorage | undefined;
  providedSqs?: AwsSqsQueue | undefined;
  providedPubsub?: GcpPubsub | undefined;
  managedAqs?: AzureQueueStorage | undefined;
  managedSqs?: AwsSqsQueue | undefined;
  managedPubsub?: GcpPubsub | undefined;
}

export interface GcpPubsub {
  /**
   * The Pub/Sub subscription name in the format projects/{project}/subscriptions/{subscription name}.
   * Only required for provided_pubsub.
   */
  subscriptionName?: string | undefined;
  /** Unique identifier included in the name of file events managed cloud resources. */
  managedResourceId?: string | undefined;
}

export interface GetExternalLocation {
  /** Name of the external location. */
  nameArg?: string | undefined;
  /** Whether to include external locations in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
}

export interface ListExternalLocations {
  /** Whether to include external locations in the response for which the principal can only access selective metadata for */
  includeBrowse?: boolean | undefined;
  /**
   * Maximum number of external locations to return.
   * If not set, all the external locations are returned (not recommended).
   * - when set to a value greater than 0, the page length is the minimum of this value and a server configured value;
   * - when set to 0, the page length is set to a server configured value (recommended);
   * - when set to a value less than 0, an invalid parameter error is returned;
   */
  maxResults?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
  /**
   * Whether to include external locations not bound to the workspace.
   * Effective only if the user has permission to update the location–workspace binding.
   */
  includeUnbound?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListExternalLocations_Response {
  /** An array of external locations. */
  externalLocations?: ExternalLocationInfo[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * __page_token__ should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

/** Server-Side Encryption properties for clients communicating with AWS s3. */
export interface SseEncryptionDetails {
  /** Sets the value of the 'x-amz-server-side-encryption' header in S3 request. */
  algorithm?: SseEncryptionAlgorithm | undefined;
  /**
   * Optional. The ARN of the SSE-KMS key used with the S3 location, when algorithm = "SSE-KMS".
   * Sets the value of the 'x-amz-server-side-encryption-aws-kms-key-id' header.
   */
  awsKmsKeyArn?: string | undefined;
}

export interface UpdateExternalLocation {
  /** Name of the external location. */
  nameArg?: string | undefined;
  /** New name for the external location. */
  newName?: string | undefined;
  /** Force update even if changing url invalidates dependent external tables or mounts. */
  force?: boolean | undefined;
  /** Skips validation of the storage credential associated with the external location. */
  skipValidation?: boolean | undefined;
  /** Name of the external location. */
  name?: string | undefined;
  /** Path URL of the external location. */
  url?: string | undefined;
  /** Name of the storage credential used with this location. */
  credentialName?: string | undefined;
  /** Indicates whether the external location is read-only. */
  readOnly?: boolean | undefined;
  /** User-provided free-form text description. */
  comment?: string | undefined;
  /**
   * Whether to enable file events on this external location. Default to `true`. Set to `false` to disable file events.
   * The actual applied value may differ due to server-side defaults; check `effective_enable_file_events` for the effective state.
   */
  enableFileEvents?: boolean | undefined;
  /** File event queue settings. If `enable_file_events` is not `false`, must be defined and have exactly one of the documented properties. */
  fileEventQueue?: FileEventQueue | undefined;
  /** The owner of the external location. */
  owner?: string | undefined;
  encryptionDetails?: EncryptionDetails | undefined;
  /** Unique identifier of metastore hosting the external location. */
  metastoreId?: string | undefined;
  /** Unique ID of the location's storage credential. */
  credentialId?: string | undefined;
  /** Time at which this external location was created, in epoch milliseconds. */
  createdAt?: number | undefined;
  /** Username of external location creator. */
  createdBy?: string | undefined;
  /** Time at which external location this was last modified, in epoch milliseconds. */
  updatedAt?: number | undefined;
  /** Username of user who last modified the external location. */
  updatedBy?: string | undefined;
  /** Indicates whether the principal is limited to retrieving metadata for the associated object through the BROWSE privilege when include_browse is enabled in the request. */
  browseOnly?: boolean | undefined;
  isolationMode?: IsolationMode | undefined;
  /** Indicates whether fallback mode is enabled for this external location. When fallback mode is enabled, the access to the location falls back to cluster credentials if UC credentials are not sufficient. */
  fallback?: boolean | undefined;
  /** The effective value of `enable_file_events` after applying server-side defaults. */
  effectiveEnableFileEvents?: boolean | undefined;
  /**
   * The effective file event queue configuration after applying server-side defaults.
   * Always populated when a queue is provisioned, regardless of whether the user explicitly
   * set `enable_file_events`. Use this field instead of `file_event_queue` for reading
   * the actual queue state.
   */
  effectiveFileEventQueue?: FileEventQueue | undefined;
}

export const unmarshalAwsSqsQueueSchema: z.ZodType<AwsSqsQueue> = z
  .object({
    queue_url: z.string().optional(),
    managed_resource_id: z.string().optional(),
  })
  .transform(d => ({
    queueUrl: d.queue_url,
    managedResourceId: d.managed_resource_id,
  }));

export const unmarshalAzureQueueStorageSchema: z.ZodType<AzureQueueStorage> = z
  .object({
    queue_url: z.string().optional(),
    subscription_id: z.string().optional(),
    resource_group: z.string().optional(),
    managed_resource_id: z.string().optional(),
  })
  .transform(d => ({
    queueUrl: d.queue_url,
    subscriptionId: d.subscription_id,
    resourceGroup: d.resource_group,
    managedResourceId: d.managed_resource_id,
  }));

export const unmarshalCreateExternalLocationSchema: z.ZodType<CreateExternalLocation> =
  z
    .object({
      skip_validation: z.boolean().optional(),
      name: z.string().optional(),
      url: z.string().optional(),
      credential_name: z.string().optional(),
      read_only: z.boolean().optional(),
      comment: z.string().optional(),
      enable_file_events: z.boolean().optional(),
      file_event_queue: z.lazy(() => unmarshalFileEventQueueSchema).optional(),
      owner: z.string().optional(),
      encryption_details: z
        .lazy(() => unmarshalEncryptionDetailsSchema)
        .optional(),
      metastore_id: z.string().optional(),
      credential_id: z.string().optional(),
      created_at: z.number().optional(),
      created_by: z.string().optional(),
      updated_at: z.number().optional(),
      updated_by: z.string().optional(),
      browse_only: z.boolean().optional(),
      isolation_mode: z.enum(IsolationMode).optional(),
      fallback: z.boolean().optional(),
      effective_enable_file_events: z.boolean().optional(),
      effective_file_event_queue: z
        .lazy(() => unmarshalFileEventQueueSchema)
        .optional(),
    })
    .transform(d => ({
      skipValidation: d.skip_validation,
      name: d.name,
      url: d.url,
      credentialName: d.credential_name,
      readOnly: d.read_only,
      comment: d.comment,
      enableFileEvents: d.enable_file_events,
      fileEventQueue: d.file_event_queue,
      owner: d.owner,
      encryptionDetails: d.encryption_details,
      metastoreId: d.metastore_id,
      credentialId: d.credential_id,
      createdAt: d.created_at,
      createdBy: d.created_by,
      updatedAt: d.updated_at,
      updatedBy: d.updated_by,
      browseOnly: d.browse_only,
      isolationMode: d.isolation_mode,
      fallback: d.fallback,
      effectiveEnableFileEvents: d.effective_enable_file_events,
      effectiveFileEventQueue: d.effective_file_event_queue,
    }));

export const unmarshalDeleteExternalLocationSchema: z.ZodType<DeleteExternalLocation> =
  z
    .object({
      name_arg: z.string().optional(),
      force: z.boolean().optional(),
    })
    .transform(d => ({
      nameArg: d.name_arg,
      force: d.force,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteExternalLocation_ResponseSchema: z.ZodType<DeleteExternalLocation_Response> =
  z.object({});

export const unmarshalEncryptionDetailsSchema: z.ZodType<EncryptionDetails> = z
  .object({
    sse_encryption_details: z
      .lazy(() => unmarshalSseEncryptionDetailsSchema)
      .optional(),
  })
  .transform(d => ({
    sseEncryptionDetails: d.sse_encryption_details,
  }));

export const unmarshalExternalLocationInfoSchema: z.ZodType<ExternalLocationInfo> =
  z
    .object({
      name: z.string().optional(),
      url: z.string().optional(),
      credential_name: z.string().optional(),
      read_only: z.boolean().optional(),
      comment: z.string().optional(),
      enable_file_events: z.boolean().optional(),
      file_event_queue: z.lazy(() => unmarshalFileEventQueueSchema).optional(),
      owner: z.string().optional(),
      encryption_details: z
        .lazy(() => unmarshalEncryptionDetailsSchema)
        .optional(),
      metastore_id: z.string().optional(),
      credential_id: z.string().optional(),
      created_at: z.number().optional(),
      created_by: z.string().optional(),
      updated_at: z.number().optional(),
      updated_by: z.string().optional(),
      browse_only: z.boolean().optional(),
      isolation_mode: z.enum(IsolationMode).optional(),
      fallback: z.boolean().optional(),
      effective_enable_file_events: z.boolean().optional(),
      effective_file_event_queue: z
        .lazy(() => unmarshalFileEventQueueSchema)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      url: d.url,
      credentialName: d.credential_name,
      readOnly: d.read_only,
      comment: d.comment,
      enableFileEvents: d.enable_file_events,
      fileEventQueue: d.file_event_queue,
      owner: d.owner,
      encryptionDetails: d.encryption_details,
      metastoreId: d.metastore_id,
      credentialId: d.credential_id,
      createdAt: d.created_at,
      createdBy: d.created_by,
      updatedAt: d.updated_at,
      updatedBy: d.updated_by,
      browseOnly: d.browse_only,
      isolationMode: d.isolation_mode,
      fallback: d.fallback,
      effectiveEnableFileEvents: d.effective_enable_file_events,
      effectiveFileEventQueue: d.effective_file_event_queue,
    }));

export const unmarshalFileEventQueueSchema: z.ZodType<FileEventQueue> = z
  .object({
    provided_aqs: z.lazy(() => unmarshalAzureQueueStorageSchema).optional(),
    provided_sqs: z.lazy(() => unmarshalAwsSqsQueueSchema).optional(),
    provided_pubsub: z.lazy(() => unmarshalGcpPubsubSchema).optional(),
    managed_aqs: z.lazy(() => unmarshalAzureQueueStorageSchema).optional(),
    managed_sqs: z.lazy(() => unmarshalAwsSqsQueueSchema).optional(),
    managed_pubsub: z.lazy(() => unmarshalGcpPubsubSchema).optional(),
  })
  .transform(d => ({
    providedAqs: d.provided_aqs,
    providedSqs: d.provided_sqs,
    providedPubsub: d.provided_pubsub,
    managedAqs: d.managed_aqs,
    managedSqs: d.managed_sqs,
    managedPubsub: d.managed_pubsub,
  }));

export const unmarshalGcpPubsubSchema: z.ZodType<GcpPubsub> = z
  .object({
    subscription_name: z.string().optional(),
    managed_resource_id: z.string().optional(),
  })
  .transform(d => ({
    subscriptionName: d.subscription_name,
    managedResourceId: d.managed_resource_id,
  }));

export const unmarshalGetExternalLocationSchema: z.ZodType<GetExternalLocation> =
  z
    .object({
      name_arg: z.string().optional(),
      include_browse: z.boolean().optional(),
    })
    .transform(d => ({
      nameArg: d.name_arg,
      includeBrowse: d.include_browse,
    }));

export const unmarshalListExternalLocationsSchema: z.ZodType<ListExternalLocations> =
  z
    .object({
      include_browse: z.boolean().optional(),
      max_results: z.number().optional(),
      page_token: z.string().optional(),
      include_unbound: z.boolean().optional(),
    })
    .transform(d => ({
      includeBrowse: d.include_browse,
      maxResults: d.max_results,
      pageToken: d.page_token,
      includeUnbound: d.include_unbound,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListExternalLocations_ResponseSchema: z.ZodType<ListExternalLocations_Response> =
  z
    .object({
      external_locations: z
        .array(z.lazy(() => unmarshalExternalLocationInfoSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      externalLocations: d.external_locations,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSseEncryptionDetailsSchema: z.ZodType<SseEncryptionDetails> =
  z
    .object({
      algorithm: z.enum(SseEncryptionAlgorithm).optional(),
      aws_kms_key_arn: z.string().optional(),
    })
    .transform(d => ({
      algorithm: d.algorithm,
      awsKmsKeyArn: d.aws_kms_key_arn,
    }));

export const unmarshalUpdateExternalLocationSchema: z.ZodType<UpdateExternalLocation> =
  z
    .object({
      name_arg: z.string().optional(),
      new_name: z.string().optional(),
      force: z.boolean().optional(),
      skip_validation: z.boolean().optional(),
      name: z.string().optional(),
      url: z.string().optional(),
      credential_name: z.string().optional(),
      read_only: z.boolean().optional(),
      comment: z.string().optional(),
      enable_file_events: z.boolean().optional(),
      file_event_queue: z.lazy(() => unmarshalFileEventQueueSchema).optional(),
      owner: z.string().optional(),
      encryption_details: z
        .lazy(() => unmarshalEncryptionDetailsSchema)
        .optional(),
      metastore_id: z.string().optional(),
      credential_id: z.string().optional(),
      created_at: z.number().optional(),
      created_by: z.string().optional(),
      updated_at: z.number().optional(),
      updated_by: z.string().optional(),
      browse_only: z.boolean().optional(),
      isolation_mode: z.enum(IsolationMode).optional(),
      fallback: z.boolean().optional(),
      effective_enable_file_events: z.boolean().optional(),
      effective_file_event_queue: z
        .lazy(() => unmarshalFileEventQueueSchema)
        .optional(),
    })
    .transform(d => ({
      nameArg: d.name_arg,
      newName: d.new_name,
      force: d.force,
      skipValidation: d.skip_validation,
      name: d.name,
      url: d.url,
      credentialName: d.credential_name,
      readOnly: d.read_only,
      comment: d.comment,
      enableFileEvents: d.enable_file_events,
      fileEventQueue: d.file_event_queue,
      owner: d.owner,
      encryptionDetails: d.encryption_details,
      metastoreId: d.metastore_id,
      credentialId: d.credential_id,
      createdAt: d.created_at,
      createdBy: d.created_by,
      updatedAt: d.updated_at,
      updatedBy: d.updated_by,
      browseOnly: d.browse_only,
      isolationMode: d.isolation_mode,
      fallback: d.fallback,
      effectiveEnableFileEvents: d.effective_enable_file_events,
      effectiveFileEventQueue: d.effective_file_event_queue,
    }));

export const marshalAwsSqsQueueSchema = z
  .object({
    queueUrl: z.string().optional(),
    managedResourceId: z.string().optional(),
  })
  .transform(d => ({
    queue_url: d.queueUrl,
    managed_resource_id: d.managedResourceId,
  }));

export const marshalAzureQueueStorageSchema = z
  .object({
    queueUrl: z.string().optional(),
    subscriptionId: z.string().optional(),
    resourceGroup: z.string().optional(),
    managedResourceId: z.string().optional(),
  })
  .transform(d => ({
    queue_url: d.queueUrl,
    subscription_id: d.subscriptionId,
    resource_group: d.resourceGroup,
    managed_resource_id: d.managedResourceId,
  }));

export const marshalCreateExternalLocationSchema = z
  .object({
    skipValidation: z.boolean().optional(),
    name: z.string().optional(),
    url: z.string().optional(),
    credentialName: z.string().optional(),
    readOnly: z.boolean().optional(),
    comment: z.string().optional(),
    enableFileEvents: z.boolean().optional(),
    fileEventQueue: z.lazy(() => marshalFileEventQueueSchema).optional(),
    owner: z.string().optional(),
    encryptionDetails: z.lazy(() => marshalEncryptionDetailsSchema).optional(),
    metastoreId: z.string().optional(),
    credentialId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    browseOnly: z.boolean().optional(),
    isolationMode: z.enum(IsolationMode).optional(),
    fallback: z.boolean().optional(),
    effectiveEnableFileEvents: z.boolean().optional(),
    effectiveFileEventQueue: z
      .lazy(() => marshalFileEventQueueSchema)
      .optional(),
  })
  .transform(d => ({
    skip_validation: d.skipValidation,
    name: d.name,
    url: d.url,
    credential_name: d.credentialName,
    read_only: d.readOnly,
    comment: d.comment,
    enable_file_events: d.enableFileEvents,
    file_event_queue: d.fileEventQueue,
    owner: d.owner,
    encryption_details: d.encryptionDetails,
    metastore_id: d.metastoreId,
    credential_id: d.credentialId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    browse_only: d.browseOnly,
    isolation_mode: d.isolationMode,
    fallback: d.fallback,
    effective_enable_file_events: d.effectiveEnableFileEvents,
    effective_file_event_queue: d.effectiveFileEventQueue,
  }));

export const marshalDeleteExternalLocationSchema = z
  .object({
    nameArg: z.string().optional(),
    force: z.boolean().optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    force: d.force,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteExternalLocation_ResponseSchema = z.object({});

export const marshalEncryptionDetailsSchema = z
  .object({
    sseEncryptionDetails: z
      .lazy(() => marshalSseEncryptionDetailsSchema)
      .optional(),
  })
  .transform(d => ({
    sse_encryption_details: d.sseEncryptionDetails,
  }));

export const marshalExternalLocationInfoSchema = z
  .object({
    name: z.string().optional(),
    url: z.string().optional(),
    credentialName: z.string().optional(),
    readOnly: z.boolean().optional(),
    comment: z.string().optional(),
    enableFileEvents: z.boolean().optional(),
    fileEventQueue: z.lazy(() => marshalFileEventQueueSchema).optional(),
    owner: z.string().optional(),
    encryptionDetails: z.lazy(() => marshalEncryptionDetailsSchema).optional(),
    metastoreId: z.string().optional(),
    credentialId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    browseOnly: z.boolean().optional(),
    isolationMode: z.enum(IsolationMode).optional(),
    fallback: z.boolean().optional(),
    effectiveEnableFileEvents: z.boolean().optional(),
    effectiveFileEventQueue: z
      .lazy(() => marshalFileEventQueueSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    url: d.url,
    credential_name: d.credentialName,
    read_only: d.readOnly,
    comment: d.comment,
    enable_file_events: d.enableFileEvents,
    file_event_queue: d.fileEventQueue,
    owner: d.owner,
    encryption_details: d.encryptionDetails,
    metastore_id: d.metastoreId,
    credential_id: d.credentialId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    browse_only: d.browseOnly,
    isolation_mode: d.isolationMode,
    fallback: d.fallback,
    effective_enable_file_events: d.effectiveEnableFileEvents,
    effective_file_event_queue: d.effectiveFileEventQueue,
  }));

export const marshalFileEventQueueSchema = z
  .object({
    providedAqs: z.lazy(() => marshalAzureQueueStorageSchema).optional(),
    providedSqs: z.lazy(() => marshalAwsSqsQueueSchema).optional(),
    providedPubsub: z.lazy(() => marshalGcpPubsubSchema).optional(),
    managedAqs: z.lazy(() => marshalAzureQueueStorageSchema).optional(),
    managedSqs: z.lazy(() => marshalAwsSqsQueueSchema).optional(),
    managedPubsub: z.lazy(() => marshalGcpPubsubSchema).optional(),
  })
  .transform(d => ({
    provided_aqs: d.providedAqs,
    provided_sqs: d.providedSqs,
    provided_pubsub: d.providedPubsub,
    managed_aqs: d.managedAqs,
    managed_sqs: d.managedSqs,
    managed_pubsub: d.managedPubsub,
  }));

export const marshalGcpPubsubSchema = z
  .object({
    subscriptionName: z.string().optional(),
    managedResourceId: z.string().optional(),
  })
  .transform(d => ({
    subscription_name: d.subscriptionName,
    managed_resource_id: d.managedResourceId,
  }));

export const marshalGetExternalLocationSchema = z
  .object({
    nameArg: z.string().optional(),
    includeBrowse: z.boolean().optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    include_browse: d.includeBrowse,
  }));

export const marshalListExternalLocationsSchema = z
  .object({
    includeBrowse: z.boolean().optional(),
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
    includeUnbound: z.boolean().optional(),
  })
  .transform(d => ({
    include_browse: d.includeBrowse,
    max_results: d.maxResults,
    page_token: d.pageToken,
    include_unbound: d.includeUnbound,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListExternalLocations_ResponseSchema = z
  .object({
    externalLocations: z
      .array(z.lazy(() => marshalExternalLocationInfoSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    external_locations: d.externalLocations,
    next_page_token: d.nextPageToken,
  }));

export const marshalSseEncryptionDetailsSchema = z
  .object({
    algorithm: z.enum(SseEncryptionAlgorithm).optional(),
    awsKmsKeyArn: z.string().optional(),
  })
  .transform(d => ({
    algorithm: d.algorithm,
    aws_kms_key_arn: d.awsKmsKeyArn,
  }));

export const marshalUpdateExternalLocationSchema = z
  .object({
    nameArg: z.string().optional(),
    newName: z.string().optional(),
    force: z.boolean().optional(),
    skipValidation: z.boolean().optional(),
    name: z.string().optional(),
    url: z.string().optional(),
    credentialName: z.string().optional(),
    readOnly: z.boolean().optional(),
    comment: z.string().optional(),
    enableFileEvents: z.boolean().optional(),
    fileEventQueue: z.lazy(() => marshalFileEventQueueSchema).optional(),
    owner: z.string().optional(),
    encryptionDetails: z.lazy(() => marshalEncryptionDetailsSchema).optional(),
    metastoreId: z.string().optional(),
    credentialId: z.string().optional(),
    createdAt: z.number().optional(),
    createdBy: z.string().optional(),
    updatedAt: z.number().optional(),
    updatedBy: z.string().optional(),
    browseOnly: z.boolean().optional(),
    isolationMode: z.enum(IsolationMode).optional(),
    fallback: z.boolean().optional(),
    effectiveEnableFileEvents: z.boolean().optional(),
    effectiveFileEventQueue: z
      .lazy(() => marshalFileEventQueueSchema)
      .optional(),
  })
  .transform(d => ({
    name_arg: d.nameArg,
    new_name: d.newName,
    force: d.force,
    skip_validation: d.skipValidation,
    name: d.name,
    url: d.url,
    credential_name: d.credentialName,
    read_only: d.readOnly,
    comment: d.comment,
    enable_file_events: d.enableFileEvents,
    file_event_queue: d.fileEventQueue,
    owner: d.owner,
    encryption_details: d.encryptionDetails,
    metastore_id: d.metastoreId,
    credential_id: d.credentialId,
    created_at: d.createdAt,
    created_by: d.createdBy,
    updated_at: d.updatedAt,
    updated_by: d.updatedBy,
    browse_only: d.browseOnly,
    isolation_mode: d.isolationMode,
    fallback: d.fallback,
    effective_enable_file_events: d.effectiveEnableFileEvents,
    effective_file_event_queue: d.effectiveFileEventQueue,
  }));
