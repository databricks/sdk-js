/**
 * Defines structured error detail types for API errors.
 *
 * @packageDocumentation
 */

import {z} from 'zod';

/**
 * ErrorDetails contains the error details of an API error. It is the union of
 * known error details types and unknown details.
 */
export interface ErrorDetails {
  errorInfo?: ErrorInfo;
  requestInfo?: RequestInfo;
  retryInfo?: RetryInfo;
  debugInfo?: DebugInfo;
  quotaFailure?: QuotaFailure;
  preconditionFailure?: PreconditionFailure;
  badRequest?: BadRequest;
  resourceInfo?: ResourceInfo;
  help?: Help;

  /**
   * UnknownDetails contains error details that cannot be parsed into one of
   * the known types above.
   */
  unknownDetails: unknown[];
}

/** ErrorInfo describes the cause of the error with structured details. */
export interface ErrorInfo {
  /**
   * The reason of the error. This is a constant value that identifies the
   * proximate cause of the error.
   */
  reason: string;

  /** The logical grouping to which the "reason" belongs. */
  domain: string;

  /** Additional structured details about this error. */
  metadata: Record<string, string>;
}

/**
 * RequestInfo contains metadata about the request that clients can attach when
 * filing a bug or providing other forms of feedback.
 */
export interface RequestInfo {
  /**
   * An opaque string that should only be interpreted by the service that
   * generated it. For example, it can be used to identify requests in the
   * service's logs.
   */
  requestId: string;

  /**
   * Any data that was used to serve this request. For example, an encrypted
   * stack trace that can be sent back to the service provider for debugging.
   */
  servingData: string;
}

/**
 * RetryInfo describes when the clients can retry a failed request. Clients
 * could ignore the recommendation here or retry when this information is
 * missing from error responses.
 *
 * It's always recommended that clients should use exponential backoff when
 * retrying.
 *
 * Clients should wait until `retryDelayMs` amount of time has passed since
 * receiving the error response before retrying. If retrying requests also
 * fail, clients should use an exponential backoff scheme to gradually increase
 * the delay between retries based on `retryDelayMs`, until either a maximum
 * number of retries have been reached or a maximum retry delay cap has been
 * reached.
 */
export interface RetryInfo {
  /** Clients should wait at least this long between retrying the same request, in milliseconds. */
  retryDelayMs: number;
}

/** Describes additional debugging info. */
export interface DebugInfo {
  /** The stack trace entries indicating where the error occurred. */
  stackEntries: string[];

  /** Additional debugging information provided by the server. */
  detail: string;
}

/**
 * Describes how a quota check failed.
 *
 * For example if a daily limit was exceeded for the calling project,
 * a service could respond with a QuotaFailure detail containing the project
 * id and the description of the quota limit that was exceeded. If the
 * calling project hasn't enabled the service in the developer console, then
 * a service could respond with the project id and set `service_disabled`
 * to true.
 *
 * Also see RetryInfo and Help types for other details about handling a
 * quota failure.
 */
export interface QuotaFailure {
  /** Describes all quota violations. */
  violations: QuotaFailureViolation[];
}

export interface QuotaFailureViolation {
  /** The subject on which the quota check failed. */
  subject: string;

  /**
   * A description of how the quota check failed. Clients can use this
   * description to find more about the quota configuration in the service's
   * public documentation, or find the relevant quota limit to adjust through
   * developer console.
   *
   * For example: "Service disabled" or "Daily Limit for read operations
   * exceeded".
   */
  description: string;
}

/** Describes what preconditions have failed. */
export interface PreconditionFailure {
  /** Describes all precondition violations. */
  violations: PreconditionFailureViolation[];
}

export interface PreconditionFailureViolation {
  /** The type of PreconditionFailure. */
  type: string;

  /** The subject, relative to the type, that failed. */
  subject: string;

  /**
   * A description of how the precondition failed. Developers can use this
   * description to understand how to fix the failure.
   *
   * For example: "Terms of service not accepted".
   */
  description: string;
}

/**
 * Describes violations in a client request. This error type focuses on the
 * syntactic aspects of the request.
 */
export interface BadRequest {
  fieldViolations: BadRequestFieldViolation[];
}

export interface BadRequestFieldViolation {
  /** A path leading to a field in the request body. */
  field: string;

  /** A description of why the request element is bad. */
  description: string;
}

/** Describes the resource that is being accessed. */
export interface ResourceInfo {
  /** A name for the type of resource being accessed. */
  resourceType: string;

  /** The name of the resource being accessed. */
  resourceName: string;

  /** The owner of the resource (optional). */
  owner: string;

  /** Describes what error is encountered when accessing this resource. */
  description: string;
}

/**
 * Provides links to documentation or for performing an out of band action.
 *
 * For example, if a quota check failed with an error indicating the calling
 * project hasn't enabled the accessed service, this can contain a URL pointing
 * directly to the right place in the developer console to flip the bit.
 */
export interface Help {
  /** URL(s) pointing to additional information on handling the current error. */
  links: HelpLink[];
}

export interface HelpLink {
  /** Describes what the link offers. */
  description: string;

  /** The URL of the link. */
  url: string;
}

// ---------------------------------------------------------------------------
// Zod schemas for the wire format (snake_case JSON from the API).
//
// Each schema validates the snake_case wire format from the API and transforms
// it into the camelCase TypeScript interface. Nullish fields default to their
// zero values (empty string, empty array, empty record) when absent or null.
// ---------------------------------------------------------------------------

// Reusable schema fragments. Nullish fields default to their zero values
// (empty string, empty array, empty record) when absent or null.
const nullishString = z
  .string()
  .nullish()
  .transform(v => v ?? '');

const errorInfoSchema = z.object({
  reason: nullishString,
  domain: nullishString,
  metadata: z
    .record(z.string(), z.string())
    .nullish()
    .transform(v => v ?? {}),
});

const requestInfoSchema = z
  .object({
    request_id: nullishString,
    serving_data: nullishString,
  })
  .transform(d => ({
    requestId: d.request_id,
    servingData: d.serving_data,
  }));

// Parses a protobuf Duration string (e.g. "42.000000001s") into milliseconds.
// Null/undefined defaults to 0. Invalid format causes a Zod validation failure.
const nullishProtoDuration = z
  .string()
  .nullish()
  .transform((v, ctx) => {
    if (v === null || v === undefined) {
      return 0;
    }
    const ms = parseProtoDuration(v);
    if (ms === undefined) {
      ctx.addIssue({code: 'custom', message: 'Invalid protobuf duration.'});
      return z.NEVER;
    }
    return ms;
  });

const retryInfoSchema = z
  .object({
    retry_delay: nullishProtoDuration,
  })
  .transform(d => ({
    retryDelayMs: d.retry_delay,
  }));

const debugInfoSchema = z
  .object({
    stack_entries: z
      .array(z.string())
      .nullish()
      .transform(v => v ?? []),
    detail: nullishString,
  })
  .transform(d => ({
    stackEntries: d.stack_entries,
    detail: d.detail,
  }));

const quotaViolationSchema = z.object({
  subject: nullishString,
  description: nullishString,
});

const quotaFailureSchema = z.object({
  violations: z
    .array(quotaViolationSchema)
    .nullish()
    .transform(v => v ?? []),
});

const preconditionViolationSchema = z.object({
  type: nullishString,
  subject: nullishString,
  description: nullishString,
});

const preconditionFailureSchema = z.object({
  violations: z
    .array(preconditionViolationSchema)
    .nullish()
    .transform(v => v ?? []),
});

const fieldViolationSchema = z.object({
  field: nullishString,
  description: nullishString,
});

const badRequestSchema = z
  .object({
    field_violations: z
      .array(fieldViolationSchema)
      .nullish()
      .transform(v => v ?? []),
  })
  .transform(d => ({
    fieldViolations: d.field_violations,
  }));

const resourceInfoSchema = z
  .object({
    resource_type: nullishString,
    resource_name: nullishString,
    owner: nullishString,
    description: nullishString,
  })
  .transform(d => ({
    resourceType: d.resource_type,
    resourceName: d.resource_name,
    owner: d.owner,
    description: d.description,
  }));

const helpLinkSchema = z.object({
  description: nullishString,
  url: nullishString,
});

const helpSchema = z.object({
  links: z
    .array(helpLinkSchema)
    .nullish()
    .transform(v => v ?? []),
});

// Google RPC type URLs used to identify error detail types in the wire format.
const ERROR_INFO_TYPE = 'type.googleapis.com/google.rpc.ErrorInfo';
const REQUEST_INFO_TYPE = 'type.googleapis.com/google.rpc.RequestInfo';
const RETRY_INFO_TYPE = 'type.googleapis.com/google.rpc.RetryInfo';
const DEBUG_INFO_TYPE = 'type.googleapis.com/google.rpc.DebugInfo';
const QUOTA_FAILURE_TYPE = 'type.googleapis.com/google.rpc.QuotaFailure';
const PRECONDITION_FAILURE_TYPE =
  'type.googleapis.com/google.rpc.PreconditionFailure';
const BAD_REQUEST_TYPE = 'type.googleapis.com/google.rpc.BadRequest';
const RESOURCE_INFO_TYPE = 'type.googleapis.com/google.rpc.ResourceInfo';
const HELP_TYPE = 'type.googleapis.com/google.rpc.Help';

// Checks whether a value is a plain object (not null, not an array).
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Parses a protobuf Duration string (e.g. "42.000000001s") into milliseconds.
// Returns undefined if the format is invalid.
function parseProtoDuration(s: string): number | undefined {
  if (!s.endsWith('s')) {
    return undefined;
  }
  const seconds = Number(s.slice(0, -1));
  if (Number.isNaN(seconds)) {
    return undefined;
  }
  return seconds * 1000;
}

// Attempts to parse a single detail and assign it to the right ErrorDetails
// field. Returns true if the detail was recognized and valid, false otherwise.
function tryAssignDetail(
  ed: ErrorDetails,
  type: string,
  raw: unknown
): boolean {
  switch (type) {
    case ERROR_INFO_TYPE: {
      const r = errorInfoSchema.safeParse(raw);
      if (!r.success) return false;
      ed.errorInfo = r.data;
      return true;
    }
    case REQUEST_INFO_TYPE: {
      const r = requestInfoSchema.safeParse(raw);
      if (!r.success) return false;
      ed.requestInfo = r.data;
      return true;
    }
    case RETRY_INFO_TYPE: {
      const r = retryInfoSchema.safeParse(raw);
      if (!r.success) return false;
      ed.retryInfo = r.data;
      return true;
    }
    case DEBUG_INFO_TYPE: {
      const r = debugInfoSchema.safeParse(raw);
      if (!r.success) return false;
      ed.debugInfo = r.data;
      return true;
    }
    case QUOTA_FAILURE_TYPE: {
      const r = quotaFailureSchema.safeParse(raw);
      if (!r.success) return false;
      ed.quotaFailure = r.data;
      return true;
    }
    case PRECONDITION_FAILURE_TYPE: {
      const r = preconditionFailureSchema.safeParse(raw);
      if (!r.success) return false;
      ed.preconditionFailure = r.data;
      return true;
    }
    case BAD_REQUEST_TYPE: {
      const r = badRequestSchema.safeParse(raw);
      if (!r.success) return false;
      ed.badRequest = r.data;
      return true;
    }
    case RESOURCE_INFO_TYPE: {
      const r = resourceInfoSchema.safeParse(raw);
      if (!r.success) return false;
      ed.resourceInfo = r.data;
      return true;
    }
    case HELP_TYPE: {
      const r = helpSchema.safeParse(raw);
      if (!r.success) return false;
      ed.help = r.data;
      return true;
    }
    default:
      return false;
  }
}

/**
 * Parses an array of raw error detail values into a structured ErrorDetails
 * object. If multiple details of the same known type are present, the last
 * one wins.
 */
export function parseErrorDetails(rawDetails: unknown[]): ErrorDetails {
  const ed: ErrorDetails = {unknownDetails: []};
  for (const rd of rawDetails) {
    if (!isRecord(rd)) {
      ed.unknownDetails.push(rd);
      continue;
    }
    const type = rd['@type'];
    if (typeof type !== 'string') {
      ed.unknownDetails.push(rd);
      continue;
    }
    if (!tryAssignDetail(ed, type, rd)) {
      ed.unknownDetails.push(rd);
    }
  }
  return ed;
}
