import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-core/http';

import {main} from '../src/long-running-operations';
import {testCredentials} from './helpers';

// Wire-format names for the operation handles and the project the create LRO
// resolves to. Operation names double as the resource path the poller GETs.
const CREATE_OP_NAME = 'operations/op-create-1';
const DELETE_OP_NAME = 'operations/op-delete-1';
const PROJECT_NAME = 'projects/sdkjs-demo-proj';

// The terminal Project the create operation carries in its `response`, exactly
// as the server returns it on the wire (snake_case keys; create_time is an
// RFC3339 string the SDK lifts into a Temporal.Instant).
const PROJECT_WIRE = {
  name: PROJECT_NAME,
  create_time: '2026-06-02T12:52:44Z',
  status: {
    display_name: 'JS SDK LRO Demo Project',
    owner: 'demo-user@example.com',
  },
};

// Wraps a JS value as a 200 HttpResponse with a streamed JSON body.
function jsonResponse(body: unknown): HttpResponse {
  return {
    statusCode: 200,
    headers: new Headers({'content-type': 'application/json'}),
    body: new Response(JSON.stringify(body)).body,
  };
}

describe('long-running-operations example', () => {
  it('creates and waits for a project, then deletes and waits', async () => {
    // Each call is keyed by method + path. Both create and delete return a
    // not-yet-done operation; the first poll of each returns the terminal
    // operation, so wait() resolves immediately.
    const calls: {method: string; path: string}[] = [];
    const httpClient: HttpClient = {
      send(request: HttpRequest): Promise<HttpResponse> {
        const url = new URL(request.url);
        calls.push({method: request.method, path: url.pathname});

        // Create: POST /api/2.0/postgres/projects?project_id=…
        if (
          request.method === 'POST' &&
          url.pathname === '/api/2.0/postgres/projects'
        ) {
          expect(url.searchParams.get('project_id')).toMatch(/^sdkjs-demo-/);
          return Promise.resolve(
            jsonResponse({name: CREATE_OP_NAME, done: false})
          );
        }

        // Poll the create operation → terminal, carries the Project.
        if (
          request.method === 'GET' &&
          url.pathname === `/api/2.0/postgres/${CREATE_OP_NAME}`
        ) {
          return Promise.resolve(
            jsonResponse({
              name: CREATE_OP_NAME,
              done: true,
              response: PROJECT_WIRE,
            })
          );
        }

        // Delete: DELETE /api/2.0/postgres/{project.name}?purge=true
        if (
          request.method === 'DELETE' &&
          url.pathname === `/api/2.0/postgres/${PROJECT_NAME}`
        ) {
          expect(url.searchParams.get('purge')).toBe('true');
          return Promise.resolve(
            jsonResponse({name: DELETE_OP_NAME, done: false})
          );
        }

        // Poll the delete operation → terminal, no response payload.
        if (
          request.method === 'GET' &&
          url.pathname === `/api/2.0/postgres/${DELETE_OP_NAME}`
        ) {
          return Promise.resolve(
            jsonResponse({name: DELETE_OP_NAME, done: true})
          );
        }

        throw new Error(
          `unexpected request: ${request.method} ${url.pathname}`
        );
      },
    };

    await main({
      host: 'https://test.cloud.databricks.com',
      httpClient,
      credentials: testCredentials,
    });

    // The full lifecycle: create POST, poll the create op to done, delete
    // DELETE, then poll the delete op to done.
    expect(calls).toEqual([
      {method: 'POST', path: '/api/2.0/postgres/projects'},
      {method: 'GET', path: `/api/2.0/postgres/${CREATE_OP_NAME}`},
      {method: 'DELETE', path: `/api/2.0/postgres/${PROJECT_NAME}`},
      {method: 'GET', path: `/api/2.0/postgres/${DELETE_OP_NAME}`},
    ]);
  });
});
