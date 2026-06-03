import {describe, it, expect} from 'vitest';
import {ApiError, toCode} from '../../src/apierror/apierror';
import {Code} from '../../src/apierror/codes';
import type {ErrorDetails} from '../../src/apierror/details';

// Helper to encode a string as Uint8Array.
function encode(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

const emptyDetails: ErrorDetails = {unknownDetails: []};

describe('ApiError non-HTTP getters', () => {
  const testCases: {
    name: string;
    apiErr: ApiError;
    wantCode: Code;
    wantMessage: string;
    wantDetails: ErrorDetails;
  }[] = [
    {
      name: 'basic fields',
      apiErr: new ApiError({
        code: Code.UNKNOWN,
        message: '',
        details: emptyDetails,
      }),
      wantCode: Code.UNKNOWN,
      wantMessage: '',
      wantDetails: emptyDetails,
    },
    {
      name: 'explicit values',
      apiErr: new ApiError({
        code: Code.INVALID_ARGUMENT,
        message: 'Invalid request',
        details: {
          errorInfo: {
            reason: 'bad_param',
            domain: 'databricks.com',
            metadata: {},
          },
          unknownDetails: [],
        },
      }),
      wantCode: Code.INVALID_ARGUMENT,
      wantMessage: 'Invalid request',
      wantDetails: {
        errorInfo: {
          reason: 'bad_param',
          domain: 'databricks.com',
          metadata: {},
        },
        unknownDetails: [],
      },
    },
  ];

  it.each(testCases)(
    '$name',
    ({apiErr, wantCode, wantMessage, wantDetails}) => {
      expect(apiErr.code).toBe(wantCode);
      expect(apiErr.message).toBe(wantMessage);
      expect(apiErr.details).toStrictEqual(wantDetails);
    }
  );
});

describe('ApiError HTTP getters', () => {
  const header = new Headers({'Content-Type': 'application/json'});
  const body = encode(
    '{"error_code": "INVALID_ARGUMENT", "message": "Invalid request"}'
  );

  const testCases: {
    name: string;
    apiErr: ApiError;
    wantStatusCode: number;
    wantHeader: Headers | undefined;
    wantBody: Uint8Array | undefined;
  }[] = [
    {
      name: 'no HTTP error returns defaults',
      apiErr: new ApiError({
        code: Code.UNKNOWN,
        message: '',
        details: emptyDetails,
      }),
      wantStatusCode: -1,
      wantHeader: undefined,
      wantBody: undefined,
    },
    {
      name: 'with HTTP error returns stored values',
      apiErr: new ApiError({
        code: Code.UNKNOWN,
        message: '',
        details: emptyDetails,
        httpStatusCode: 400,
        httpHeader: header,
        httpBody: body,
      }),
      wantStatusCode: 400,
      wantHeader: header,
      wantBody: body,
    },
  ];

  it.each(testCases)(
    '$name',
    ({apiErr, wantStatusCode, wantHeader, wantBody}) => {
      expect(apiErr.httpStatusCode).toBe(wantStatusCode);
      expect(apiErr.httpHeader).toBe(wantHeader);
      if (wantBody === undefined) {
        expect(apiErr.httpBody).toBeUndefined();
      } else {
        expect(apiErr.httpBody).toStrictEqual(wantBody);
      }
    }
  );
});

describe('fromHttpError', () => {
  const testCases: {
    desc: string;
    statusCode: number;
    header?: Headers;
    body?: Uint8Array;
    want?: ApiError;
  }[] = [
    {
      desc: '200 returns undefined',
      statusCode: 200,
    },
    {
      desc: '201 returns undefined',
      statusCode: 201,
    },
    {
      desc: '204 returns undefined',
      statusCode: 204,
    },
    {
      desc: 'empty body with status',
      statusCode: 400,
      want: new ApiError({
        code: Code.INVALID_ARGUMENT,
        message: '',
        details: emptyDetails,
      }),
    },
    {
      desc: 'empty body with status and headers',
      statusCode: 404,
      header: new Headers({'Content-Type': 'application/json'}),
      want: new ApiError({
        code: Code.NOT_FOUND,
        message: '',
        details: emptyDetails,
      }),
    },
    {
      desc: 'HTML body',
      statusCode: 502,
      body: encode('<html><body>Bad Gateway</body></html>'),
      want: new ApiError({
        code: Code.INTERNAL,
        message: '',
        details: emptyDetails,
      }),
    },
    {
      desc: 'malformed JSON',
      statusCode: 400,
      body: encode('{not valid json'),
      want: new ApiError({
        code: Code.INVALID_ARGUMENT,
        message: '',
        details: emptyDetails,
      }),
    },
    {
      desc: 'standard error no details',
      statusCode: 404,
      body: encode(
        '{"error_code": "NOT_FOUND", "message": "Job 123 not found"}'
      ),
      want: new ApiError({
        code: Code.NOT_FOUND,
        errorCode: 'NOT_FOUND',
        message: 'Job 123 not found',
        details: emptyDetails,
      }),
    },
    {
      desc: 'standard error with details',
      statusCode: 404,
      body: encode(
        JSON.stringify({
          error_code: 'NOT_FOUND',
          message: 'Job 123 not found',
          details: [
            {
              '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
              reason: 'bad_param',
              domain: 'databricks.com',
            },
          ],
        })
      ),
      want: new ApiError({
        code: Code.NOT_FOUND,
        errorCode: 'NOT_FOUND',
        message: 'Job 123 not found',
        details: {
          errorInfo: {
            reason: 'bad_param',
            domain: 'databricks.com',
            metadata: {},
          },
          unknownDetails: [],
        },
      }),
    },
    {
      desc: 'Databricks-specific error_code falls back to status code',
      statusCode: 404,
      body: encode(
        '{"error_code": "CATALOG_DOES_NOT_EXIST", "message": "Catalog not found"}'
      ),
      want: new ApiError({
        code: Code.NOT_FOUND,
        errorCode: 'CATALOG_DOES_NOT_EXIST',
        message: 'Catalog not found',
        details: emptyDetails,
      }),
    },
    {
      desc: 'standard error with missing error_code',
      statusCode: 403,
      body: encode('{"message": "Access denied"}'),
      want: new ApiError({
        code: Code.PERMISSION_DENIED,
        message: 'Access denied',
        details: emptyDetails,
      }),
    },
    {
      desc: 'standard error with integer error_code',
      statusCode: 400,
      body: encode('{"error_code": 42, "message": "Invalid request"}'),
      want: new ApiError({
        code: Code.INVALID_ARGUMENT,
        message: 'Invalid request',
        details: emptyDetails,
      }),
    },
    {
      desc: 'legacy API 1.2 error field',
      statusCode: 400,
      body: encode('{"error": "Invalid parameter"}'),
      want: new ApiError({
        code: Code.INVALID_ARGUMENT,
        message: 'Invalid parameter',
        details: emptyDetails,
      }),
    },
    {
      desc: 'message takes precedence over error field',
      statusCode: 400,
      body: encode('{"message": "New message", "error": "Old error"}'),
      want: new ApiError({
        code: Code.INVALID_ARGUMENT,
        message: 'New message',
        details: emptyDetails,
      }),
    },
    {
      desc: 'SCIM error with detail',
      statusCode: 404,
      body: encode('{"detail": "User not found", "scimType": "invalidValue"}'),
      want: new ApiError({
        code: Code.NOT_FOUND,
        message: 'User not found',
        details: emptyDetails,
      }),
    },
    {
      desc: 'SCIM error with only scimType',
      statusCode: 400,
      body: encode('{"scimType": "uniqueness"}'),
      want: new ApiError({
        code: Code.INVALID_ARGUMENT,
        message: 'uniqueness',
        details: emptyDetails,
      }),
    },
    {
      desc: 'message takes precedence over SCIM detail',
      statusCode: 400,
      body: encode('{"message": "Standard message", "detail": "SCIM detail"}'),
      want: new ApiError({
        code: Code.INVALID_ARGUMENT,
        message: 'Standard message',
        details: emptyDetails,
      }),
    },
  ];

  it.each(testCases)('$desc', tc => {
    const got = ApiError.fromHttpError(tc.statusCode, tc.header, tc.body);

    if (tc.want === undefined) {
      expect(got).toBeUndefined();
      return;
    }

    if (got === undefined) {
      expect.fail('expected fromHttpError to return an ApiError');
    }

    expect(got.code).toBe(tc.want.code);
    expect(got.errorCode).toBe(tc.want.errorCode);
    expect(got.message).toBe(tc.want.message);
    expect(got.details).toStrictEqual(tc.want.details);
    expect(got.httpStatusCode).toBe(tc.statusCode);
    expect(got.httpHeader).toBe(tc.header);
    if (tc.body === undefined) {
      expect(got.httpBody).toBeUndefined();
    } else {
      expect(got.httpBody).toStrictEqual(tc.body);
    }
  });
});

describe('toCode', () => {
  const testCases: {
    httpCode: number;
    want: Code;
  }[] = [
    // Direct mappings.
    {httpCode: 200, want: Code.OK},
    {httpCode: 400, want: Code.INVALID_ARGUMENT},
    {httpCode: 401, want: Code.UNAUTHENTICATED},
    {httpCode: 403, want: Code.PERMISSION_DENIED},
    {httpCode: 404, want: Code.NOT_FOUND},
    {httpCode: 409, want: Code.ABORTED},
    {httpCode: 416, want: Code.OUT_OF_RANGE},
    {httpCode: 429, want: Code.RESOURCE_EXHAUSTED},
    {httpCode: 504, want: Code.DEADLINE_EXCEEDED},
    {httpCode: 501, want: Code.UNIMPLEMENTED},
    {httpCode: 503, want: Code.UNAVAILABLE},

    // Fallback ranges.
    {httpCode: 201, want: Code.OK},
    {httpCode: 204, want: Code.OK},
    {httpCode: 418, want: Code.FAILED_PRECONDITION},
    {httpCode: 500, want: Code.INTERNAL},
    {httpCode: 599, want: Code.INTERNAL},

    // Unknown (valid).
    {httpCode: 100, want: Code.UNKNOWN},
    {httpCode: 300, want: Code.UNKNOWN},

    // Unknown (invalid).
    {httpCode: -1, want: Code.UNKNOWN},
    {httpCode: 0, want: Code.UNKNOWN},
    {httpCode: 42, want: Code.UNKNOWN},
    {httpCode: 600, want: Code.UNKNOWN},
    {httpCode: 1337, want: Code.UNKNOWN},
  ];

  it.each(testCases)('status $httpCode', ({httpCode, want}) => {
    expect(toCode(httpCode)).toBe(want);
  });
});
