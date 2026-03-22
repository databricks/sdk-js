/**
 * Mock HttpClient for the Lakebase Postgres demo.
 *
 * Returns canned responses so the demo can run without a live workspace,
 * showcasing pagination, LRO polling transitions, and well-known types.
 */

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-databricks/transport';

/** Seed projects used by the pagination demo. */
const seedProjects = [
  makeProject('alpha', 'Project Alpha', 'uid-alpha'),
  makeProject('beta', 'Project Beta', 'uid-beta'),
  makeProject('gamma', 'Project Gamma', 'uid-gamma'),
];

function makeProject(
  id: string,
  displayName: string,
  uid: string
): Record<string, unknown> {
  return {
    name: `projects/${id}`,
    uid,
    create_time: '2026-03-01T10:00:00Z',
    update_time: '2026-03-01T10:00:01Z',
    spec: {
      display_name: displayName,
      pg_version: 17,
      history_retention_duration: '86400s',
    },
    status: {
      display_name: displayName,
      pg_version: 17,
      history_retention_duration: '86400s',
      branch_logical_size_limit_bytes: 10737418240,
    },
  };
}

/**
 * Creates a mock HttpClient that serves canned Postgres API responses.
 *
 * Tracks LRO state internally so that polling transitions from
 * done=false to done=true after two polls.
 */
export function createMockPostgresClient(): HttpClient {
  // Track poll counts per operation name to simulate LRO progression.
  const pollCounts = new Map<string, number>();
  // Track created projects by name for getProject lookups.
  const createdProjects = new Map<string, Record<string, unknown>>();

  return {
    async send(request: HttpRequest): Promise<HttpResponse> {
      const url = new URL(request.url);
      const path = url.pathname;

      // POST /api/2.0/postgres/projects — create project.
      if (request.method === 'POST' && path === '/api/2.0/postgres/projects') {
        const projectId =
          url.searchParams.get('project_id') ?? `mock-${Date.now()}`;
        const opName = `projects/${projectId}/operations/create-op-1`;

        // Parse the request body to extract the spec.
        let spec: Record<string, unknown> = {};
        if (request.body) {
          const bodyText =
            typeof request.body === 'string'
              ? request.body
              : new TextDecoder().decode(request.body as Uint8Array);
          const parsed = JSON.parse(bodyText) as Record<string, unknown>;
          spec = (parsed.spec as Record<string, unknown>) ?? {};
        }

        // Store the project for later getProject/getOperation calls.
        const now = new Date().toISOString();
        createdProjects.set(
          `projects/${projectId}`,
          makeProject(
            projectId,
            (spec.display_name as string) ?? `Project ${projectId}`,
            `uid-${projectId}`
          )
        );
        // Override timestamps to use current time.
        const proj = createdProjects.get(`projects/${projectId}`)!;
        proj.create_time = now;
        proj.update_time = now;

        pollCounts.set(opName, 0);
        return jsonResponse(200, {name: opName, metadata: {}, done: false});
      }

      // DELETE /api/2.0/postgres/projects/{id} — delete project.
      if (
        request.method === 'DELETE' &&
        path.match(/^\/api\/2\.0\/postgres\/projects\/[^/]+$/)
      ) {
        const projectName = path.replace('/api/2.0/postgres/', '');
        const opName = `${projectName}/operations/delete-op-1`;
        pollCounts.set(opName, 0);
        createdProjects.delete(projectName);
        return jsonResponse(200, {name: opName, metadata: {}, done: false});
      }

      // GET /api/2.0/postgres/projects/{id}/operations/{op} — poll operation.
      if (
        request.method === 'GET' &&
        path.match(/^\/api\/2\.0\/postgres\/projects\/[^/]+\/operations\//)
      ) {
        const opName = path.replace('/api/2.0/postgres/', '');
        const count = (pollCounts.get(opName) ?? 0) + 1;
        pollCounts.set(opName, count);

        // Transition to done after 2 polls.
        if (count < 2) {
          return jsonResponse(200, {name: opName, metadata: {}, done: false});
        }

        // Find the project associated with this operation.
        const projectName = opName.replace(/\/operations\/.*/, '');
        const project = createdProjects.get(projectName);

        return jsonResponse(200, {
          name: opName,
          metadata: {},
          done: true,
          response: project ?? {name: projectName, uid: 'uid-deleted'},
        });
      }

      // GET /api/2.0/postgres/projects/{id} — get project.
      if (
        request.method === 'GET' &&
        path.match(/^\/api\/2\.0\/postgres\/projects\/[^/]+$/)
      ) {
        const projectName = path.replace('/api/2.0/postgres/', '');

        // Check dynamically created projects first, then seed data.
        const project =
          createdProjects.get(projectName) ??
          seedProjects.find(p => p.name === projectName);
        if (project) {
          return jsonResponse(200, project);
        }
        return jsonResponse(404, {
          error_code: 'NOT_FOUND',
          message: `Project ${projectName} not found`,
        });
      }

      // GET /api/2.0/postgres/projects — list projects (with pagination).
      if (request.method === 'GET' && path === '/api/2.0/postgres/projects') {
        const pageToken = url.searchParams.get('page_token') ?? '';
        const pageSize = Number(url.searchParams.get('page_size') ?? '2');

        // Combine seed and created projects.
        const all = [
          ...seedProjects,
          ...Array.from(createdProjects.values()),
        ];

        // Find the starting index based on page token.
        let startIdx = 0;
        if (pageToken !== '') {
          startIdx = Number(pageToken);
        }

        const page = all.slice(startIdx, startIdx + pageSize);
        const nextIdx = startIdx + pageSize;
        const hasMore = nextIdx < all.length;

        return jsonResponse(200, {
          projects: page,
          ...(hasMore ? {next_page_token: String(nextIdx)} : {}),
        });
      }

      // Fallback.
      return jsonResponse(404, {
        error_code: 'NOT_FOUND',
        message: `Mock does not handle ${request.method} ${path}`,
      });
    },
  };
}

/** Builds an HttpResponse from a JSON-serializable body. */
function jsonResponse(
  statusCode: number,
  body: unknown
): HttpResponse {
  const bytes = new TextEncoder().encode(JSON.stringify(body));
  return {
    statusCode,
    headers: new Headers({'content-type': 'application/json'}),
    body: new ReadableStream({
      start(controller) {
        controller.enqueue(bytes);
        controller.close();
      },
    }),
  };
}
