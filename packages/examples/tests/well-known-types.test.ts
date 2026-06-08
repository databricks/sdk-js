import {Temporal} from '@js-temporal/polyfill';
import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';
import {PostgresClient} from '@databricks/sdk-postgres/v1';

import {main} from '../src/well-known-types';
import {testCredentials} from './helpers';

// The host the example and the direct iterator both target.
const HOST = 'https://test.cloud.databricks.com';

// A single page of two projects exactly as the server returns it on the wire:
// snake_case keys, Timestamp fields as RFC3339 strings, and the Duration field
// as a protobuf duration string (a number of seconds with a trailing "s").
// `next_page_token` is omitted so the iterator stops after this page.
const PROJECTS_PAGE: unknown = {
  projects: [
    {
      name: 'projects/alpha',
      create_time: '2024-01-15T10:30:00Z',
      update_time: '2024-02-20T08:00:00Z',
      status: {
        display_name: 'Alpha',
        pg_version: 16,
        owner: 'alice@example.com',
        // 604800s == 7 days of point-in-time-recovery history.
        history_retention_duration: '604800s',
      },
    },
    {
      name: 'projects/beta',
      create_time: '2024-03-01T12:00:00Z',
      update_time: '2024-03-02T12:00:00Z',
      status: {
        display_name: 'Beta',
        pg_version: 15,
        owner: 'bob@example.com',
        history_retention_duration: '172800s',
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

// A stub transport that asserts the projects request shape, then serves the
// fixed single page above for every call.
function projectsHttpClient(): HttpClient {
  return {
    send(request: HttpRequest): Promise<HttpResponse> {
      const url = new URL(request.url);
      expect(request.method).toBe('GET');
      expect(url.pathname).toBe('/api/2.0/postgres/projects');
      expect(url.searchParams.get('page_size')).toBe('5');
      return Promise.resolve(jsonResponse(PROJECTS_PAGE));
    },
  };
}

describe('well-known-types example', () => {
  it('decodes Timestamp as Instant and Duration as Duration', async () => {
    // Drive the same iterator the example uses, against the same stub, so we
    // can inspect the typed fields the SDK produced from the wire JSON.
    const client = new PostgresClient({
      host: HOST,
      httpClient: projectsHttpClient(),
      credentials: testCredentials,
    });
    const names: string[] = [];
    let first: {
      createTime: Temporal.Instant | undefined;
      historyRetentionDuration: Temporal.Duration | undefined;
    } = {createTime: undefined, historyRetentionDuration: undefined};
    for await (const project of client.listProjectsIter({pageSize: 5})) {
      if (project.name !== undefined) {
        names.push(project.name);
      }
      if (names.length === 1) {
        first = {
          createTime: project.createTime,
          historyRetentionDuration: project.status?.historyRetentionDuration,
        };
      }
    }

    // The iterator yields both projects from the single served page.
    expect(names).toEqual(['projects/alpha', 'projects/beta']);

    // createTime is a Temporal.Instant parsed from the RFC3339 string, and it
    // round-trips back to the same canonical wire value.
    expect(first.createTime).toBeInstanceOf(Temporal.Instant);
    expect(first.createTime?.toString()).toBe('2024-01-15T10:30:00Z');

    // historyRetentionDuration is a Temporal.Duration parsed from "604800s".
    expect(first.historyRetentionDuration).toBeInstanceOf(Temporal.Duration);
    expect(first.historyRetentionDuration?.total({unit: 'seconds'})).toBe(
      604800
    );
  });

  it('runs the example without throwing', async () => {
    await expect(
      main({
        host: HOST,
        httpClient: projectsHttpClient(),
        credentials: testCredentials,
      })
    ).resolves.toBeUndefined();
  });
});
