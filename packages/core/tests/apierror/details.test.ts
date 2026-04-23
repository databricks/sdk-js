import {describe, it, expect} from 'vitest';
import {parseErrorDetails} from '../../src/apierror/details';
import type {ErrorDetails} from '../../src/apierror/details';

describe('parseErrorDetails', () => {
  const testCases: {
    name: string;
    rawDetails: unknown[];
    want: ErrorDetails;
  }[] = [
    {
      name: 'empty details',
      rawDetails: [],
      want: {unknownDetails: []},
    },
    {
      name: 'all known error details types',
      rawDetails: [
        {
          '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
          reason: 'reason',
          domain: 'domain',
          metadata: {k1: 'v1', k2: 'v2'},
        },
        {
          '@type': 'type.googleapis.com/google.rpc.RequestInfo',
          request_id: 'req42',
          serving_data: 'data',
        },
        {
          '@type': 'type.googleapis.com/google.rpc.RetryInfo',
          retry_delay: '42.000000001s',
        },
        {
          '@type': 'type.googleapis.com/google.rpc.DebugInfo',
          stack_entries: ['entry1', 'entry2'],
          detail: 'detail',
        },
        {
          '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
          violations: [{subject: 'subject', description: 'description'}],
        },
        {
          '@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
          violations: [
            {type: 'type', subject: 'subject', description: 'description'},
          ],
        },
        {
          '@type': 'type.googleapis.com/google.rpc.BadRequest',
          field_violations: [{field: 'field', description: 'description'}],
        },
        {
          '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
          resource_type: 'resource_type',
          resource_name: 'resource_name',
          owner: 'owner',
          description: 'description',
        },
        {
          '@type': 'type.googleapis.com/google.rpc.Help',
          links: [{description: 'description', url: 'url'}],
        },
      ],
      want: {
        errorInfo: {
          reason: 'reason',
          domain: 'domain',
          metadata: {k1: 'v1', k2: 'v2'},
        },
        requestInfo: {
          requestId: 'req42',
          servingData: 'data',
        },
        retryInfo: {
          // 42.000000001 seconds = 42000.000001 milliseconds.
          retryDelayMs: 42.000000001 * 1000,
        },
        debugInfo: {
          stackEntries: ['entry1', 'entry2'],
          detail: 'detail',
        },
        quotaFailure: {
          violations: [{subject: 'subject', description: 'description'}],
        },
        preconditionFailure: {
          violations: [
            {type: 'type', subject: 'subject', description: 'description'},
          ],
        },
        badRequest: {
          fieldViolations: [{field: 'field', description: 'description'}],
        },
        resourceInfo: {
          resourceType: 'resource_type',
          resourceName: 'resource_name',
          owner: 'owner',
          description: 'description',
        },
        help: {
          links: [{description: 'description', url: 'url'}],
        },
        unknownDetails: [],
      },
    },
    {
      name: 'unknown error details type',
      rawDetails: [{'@type': 'foo', reason: 'reason'}],
      want: {
        unknownDetails: [{'@type': 'foo', reason: 'reason'}],
      },
    },
    {
      name: 'invalid error details - not an object',
      rawDetails: [42, 'foobar'],
      want: {
        unknownDetails: [42, 'foobar'],
      },
    },
    {
      name: 'invalid error details - object without @type',
      rawDetails: [{foo: 'bar'}],
      want: {
        unknownDetails: [{foo: 'bar'}],
      },
    },
    {
      name: 'invalid error details - known type with invalid fields',
      rawDetails: [
        {
          '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
          reason: 0,
        },
        {
          '@type': 'type.googleapis.com/google.rpc.RequestInfo',
          request_id: 0,
        },
        {
          '@type': 'type.googleapis.com/google.rpc.RetryInfo',
          retry_delay: 0,
        },
        {
          '@type': 'type.googleapis.com/google.rpc.DebugInfo',
          stack_entries: 0,
        },
        {
          '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
          violations: 0,
        },
        {
          '@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
          violations: 0,
        },
        {
          '@type': 'type.googleapis.com/google.rpc.BadRequest',
          field_violations: 0,
        },
        {
          '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
          resource_type: 0,
        },
        {
          '@type': 'type.googleapis.com/google.rpc.Help',
          links: 0,
        },
      ],
      want: {
        unknownDetails: [
          {'@type': 'type.googleapis.com/google.rpc.ErrorInfo', reason: 0},
          {
            '@type': 'type.googleapis.com/google.rpc.RequestInfo',
            request_id: 0,
          },
          {
            '@type': 'type.googleapis.com/google.rpc.RetryInfo',
            retry_delay: 0,
          },
          {
            '@type': 'type.googleapis.com/google.rpc.DebugInfo',
            stack_entries: 0,
          },
          {
            '@type': 'type.googleapis.com/google.rpc.QuotaFailure',
            violations: 0,
          },
          {
            '@type': 'type.googleapis.com/google.rpc.PreconditionFailure',
            violations: 0,
          },
          {
            '@type': 'type.googleapis.com/google.rpc.BadRequest',
            field_violations: 0,
          },
          {
            '@type': 'type.googleapis.com/google.rpc.ResourceInfo',
            resource_type: 0,
          },
          {'@type': 'type.googleapis.com/google.rpc.Help', links: 0},
        ],
      },
    },
    {
      name: 'only keep the last error details of a type',
      rawDetails: [
        {
          '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
          reason: 'first',
        },
        {
          '@type': 'type.googleapis.com/google.rpc.ErrorInfo',
          reason: 'second',
        },
      ],
      want: {
        errorInfo: {reason: 'second', domain: '', metadata: {}},
        unknownDetails: [],
      },
    },
    {
      name: 'RetryInfo with invalid duration format',
      rawDetails: [
        {
          '@type': 'type.googleapis.com/google.rpc.RetryInfo',
          retry_delay: 'invalid',
        },
      ],
      want: {
        unknownDetails: [
          {
            '@type': 'type.googleapis.com/google.rpc.RetryInfo',
            retry_delay: 'invalid',
          },
        ],
      },
    },
  ];

  it.each(testCases)('$name', ({rawDetails, want}) => {
    const got = parseErrorDetails(rawDetails);
    expect(got).toStrictEqual(want);
  });
});
