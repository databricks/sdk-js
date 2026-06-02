import {Temporal} from '@js-temporal/polyfill';
import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';
import {PostgresClient} from '@databricks/sdk-postgres/v1';

import {main} from '../src/oneof';

const PROJECT_NAME = 'projects/sdkjs-oneof-demo';

// A single-project list page as the server returns it on the wire (snake_case
// keys). The first project's default endpoint settings carry the
// `suspend_timeout_duration` arm of the suspension oneof — a proto Duration
// serialized as the string "86400s", which the SDK lifts into a
// Temporal.Duration. Omitting next_page_token marks this the last (only) page.
const PROJECT_LIST_WIRE = {
  projects: [
    {
      name: PROJECT_NAME,
      status: {
        display_name: 'JS SDK OneOf Demo Project',
        default_endpoint_settings: {
          suspend_timeout_duration: '86400s',
        },
      },
    },
  ],
};

// Wraps a JS value as a 200 HttpResponse with a streamed JSON body.
function jsonResponse(body: unknown): HttpResponse {
  return {
    statusCode: 200,
    headers: new Headers({'content-type': 'application/json'}),
    body: new Response(JSON.stringify(body)).body,
  };
}

// A stub transport that serves the single-project list page for the projects
// list endpoint and rejects anything else.
function listProjectsClient(): HttpClient {
  return {
    send(request: HttpRequest): Promise<HttpResponse> {
      const url = new URL(request.url);
      if (
        request.method === 'GET' &&
        url.pathname === '/api/2.0/postgres/projects'
      ) {
        expect(url.searchParams.get('page_size')).toBe('1');
        return Promise.resolve(jsonResponse(PROJECT_LIST_WIRE));
      }
      throw new Error(`unexpected request: ${request.method} ${url.pathname}`);
    },
  };
}

describe('oneof example', () => {
  it('decodes the suspension oneof into the suspendTimeoutDuration variant', async () => {
    const host = 'https://test.cloud.databricks.com';
    const client = new PostgresClient({host, httpClient: listProjectsClient()});

    // Pull the first project the same way the example does, then inspect the
    // discriminated union the wire JSON decodes into.
    let project: Awaited<ReturnType<typeof client.getProject>> | undefined;
    for await (const p of client.listProjectsIter({pageSize: 1})) {
      project = p;
      break;
    }

    const suspension = project?.status?.defaultEndpointSettings?.suspension;
    // The "86400s" wire value selects the suspendTimeoutDuration arm, not
    // noSuspension.
    expect(suspension?.$case).toBe('suspendTimeoutDuration');
    if (suspension?.$case !== 'suspendTimeoutDuration') {
      throw new Error('expected the suspendTimeoutDuration variant');
    }

    // The narrowed payload is a Temporal.Duration of exactly 86400 seconds.
    expect(suspension.suspendTimeoutDuration).toBeInstanceOf(Temporal.Duration);
    expect(suspension.suspendTimeoutDuration.total({unit: 'seconds'})).toBe(
      86400
    );
  });

  it('runs main() against the stub transport without throwing', async () => {
    const host = 'https://test.cloud.databricks.com';
    await expect(
      main({host, httpClient: listProjectsClient()})
    ).resolves.toBeUndefined();
  });
});
