import {z} from 'zod';

import {Code} from './codes';
import type {ErrorDetails} from './details';
import {parseErrorDetails} from './details';

// Reusable schema fragment for nullish string fields.
const nullishString = z
  .string()
  .nullish()
  .transform(v => v ?? '');

// Zod schema for parsing the JSON error response body. The schema is lenient
// to handle the various Databricks API error formats (standard, legacy, SCIM).
const errorResponseSchema = z.object({
  message: nullishString,
  details: z
    .array(z.unknown())
    .nullish()
    .transform(v => v ?? []),
  // Some Databricks APIs incorrectly return the HTTP status code as an
  // integer rather than the actual error code as a string.
  error_code: z.unknown().optional(),
  // Legacy Databricks APIs (e.g. version 1.2 and earlier) used "error"
  // instead of "message".
  error: nullishString,
  // SCIM error fields (RFC7644 section 3.7.3).
  // The "status" field is intentionally omitted; it duplicates HTTP status.
  detail: nullishString,
  scimType: nullishString,
});

// Constructor options for ApiError.
interface ApiErrorOptions {
  code: Code;
  message: string;
  details: ErrorDetails;
  httpStatusCode?: number | undefined;
  httpHeader?: Headers | undefined;
  httpBody?: Uint8Array | undefined;
  cause?: unknown;
}

/** ApiError is a transport-agnostic error representing a Databricks API error. */
export class ApiError extends Error {
  /**
   * The error code of the error.
   */
  readonly code: Code;

  /**
   * The structured error details of the error. This is left empty if the
   * error response is not a standard Databricks API error.
   */
  readonly details: ErrorDetails;

  // The raw HTTP error details, undefined if this is not an HTTP error.
  private readonly httpErr?: {
    readonly statusCode: number;
    readonly header: Headers | undefined;
    readonly body: Uint8Array | undefined;
  };

  /**
   * Do not use this constructor directly. Use {@link ApiError.fromHttpError}
   * instead. This constructor is only meant for internal and testing use.
   * TODO: Make this constructor private.
   *
   * @private
   */
  constructor(options: ApiErrorOptions) {
    super(options.message, {cause: options.cause});
    this.name = 'ApiError';
    this.code = options.code;
    this.details = options.details;
    if (options.httpStatusCode !== undefined) {
      this.httpErr = {
        statusCode: options.httpStatusCode,
        header: options.httpHeader,
        body: options.httpBody,
      };
    }
  }

  /**
   * Returns the ApiError's HTTP status code. If the ApiError is not an HTTP
   * error, returns -1.
   */
  get httpStatusCode(): number {
    if (this.httpErr === undefined) {
      return -1;
    }
    return this.httpErr.statusCode;
  }

  /**
   * Returns the ApiError's HTTP headers. If the ApiError is not an HTTP
   * error, returns undefined.
   */
  get httpHeader(): Headers | undefined {
    if (this.httpErr === undefined) {
      return undefined;
    }
    return this.httpErr.header;
  }

  /**
   * Returns the ApiError's HTTP body. If the ApiError is not an HTTP error,
   * returns undefined.
   */
  get httpBody(): Uint8Array | undefined {
    if (this.httpErr === undefined) {
      return undefined;
    }
    return this.httpErr.body;
  }

  /**
   * Parses an HTTP error response into an ApiError. Returns undefined if the
   * status code is 2xx.
   */
  static fromHttpError(
    statusCode: number,
    header: Headers | undefined,
    body: Uint8Array | undefined
  ): ApiError | undefined {
    if (statusCode >= 200 && statusCode < 300) {
      return undefined;
    }

    const emptyDetails: ErrorDetails = {unknownDetails: []};

    if (body === undefined || body.length === 0) {
      return new ApiError({
        code: Code.UNKNOWN,
        message: '',
        details: emptyDetails,
        httpStatusCode: statusCode,
        httpHeader: header,
        httpBody: body,
      });
    }

    // Decode the body to a string for JSON parsing.
    let parsed: unknown;
    try {
      parsed = JSON.parse(new TextDecoder().decode(body));
    } catch (e: unknown) {
      // The JSON error is simply swallowed, this typically happens when the
      // error does not come directly from a Databricks API. A typical example
      // is when the error is returned by a proxy.
      return new ApiError({
        code: Code.UNKNOWN,
        message: '',
        details: emptyDetails,
        httpStatusCode: statusCode,
        httpHeader: header,
        httpBody: body,
        cause: e instanceof Error ? e : undefined,
      });
    }

    const result = errorResponseSchema.safeParse(parsed);
    if (!result.success) {
      return new ApiError({
        code: Code.UNKNOWN,
        message: '',
        details: emptyDetails,
        httpStatusCode: statusCode,
        httpHeader: header,
        httpBody: body,
        cause: result.error,
      });
    }

    const errResp = result.data;

    // code carries the error_code string verbatim: a canonical code (e.g.
    // "NOT_FOUND") matches a named Code member, while a Databricks
    // product-specific code (e.g. "CATALOG_DOES_NOT_EXIST") is an open Code
    // value. It is Code.UNKNOWN when the response carries no string error_code
    // (missing or an integer); the HTTP status is never used to infer a code,
    // since it may not reflect the true error semantic, so callers fall back to
    // httpStatusCode.
    const code: Code =
      typeof errResp.error_code === 'string' && errResp.error_code !== ''
        ? errResp.error_code
        : Code.UNKNOWN;

    // Determine the error message from available fields.
    let errorMessage = '';
    if (errResp.message !== '') {
      errorMessage = errResp.message;
    } else if (errResp.error !== '') {
      errorMessage = errResp.error;
    } else if (errResp.detail !== '') {
      errorMessage = errResp.detail;
    } else if (errResp.scimType !== '') {
      errorMessage = errResp.scimType;
    }

    return new ApiError({
      code,
      message: errorMessage,
      details: parseErrorDetails(errResp.details),
      httpStatusCode: statusCode,
      httpHeader: header,
      httpBody: body,
    });
  }
}
