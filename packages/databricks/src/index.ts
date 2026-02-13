/**
 * Databricks SDK core infrastructure for JavaScript/TypeScript.
 *
 * This package provides the foundational building blocks for the Databricks
 * SDK: API call execution with retry and rate limiting, structured error
 * handling, client configuration, and HTTP transport.
 *
 * @packageDocumentation
 */

// API call execution.
export type {Call} from './api';
export {execute} from './api';

// API call options.
export type {Option, Options, Limiter} from './api';
export {
  withRetrier,
  withDisableRetry,
  withTimeout as withCallTimeout,
  withLimiter,
} from './api';

// Retry logic.
export type {RetryDecision, Retrier, BackoffPolicyOptions} from './api';
export {retryOnCodes, retryOn, BackoffPolicy} from './api';

// Error codes.
export {Code, codeFromString, codeToString, codeFromHttpStatus} from './apierr';

// Structured error details.
export type {
  ErrorDetails,
  ErrorInfo,
  RequestInfo,
  RetryInfo,
  DebugInfo,
  QuotaFailure,
  QuotaFailureViolation,
  PreconditionFailure,
  PreconditionFailureViolation,
  BadRequest,
  BadRequestFieldViolation,
  ResourceInfo,
  Help,
  HelpLink,
} from './apierr';
export {parseErrorDetails} from './apierr';

// API error class.
export {APIError, errorCode, fromHttpError} from './apierr';

// Client options.
export type {
  HttpClientFn,
  Logger,
  ClientOptions,
  ClientOption,
} from './options';
export {
  withHost,
  withHttpClient,
  withCredentials,
  withTimeout,
  withLogger,
  resolveOptions,
} from './options';

// HTTP transport.
export type {FetchFn} from './transport';
export {resolveClientOptions} from './transport';
