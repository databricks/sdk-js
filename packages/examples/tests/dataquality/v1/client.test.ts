import {describe, expect, it} from 'vitest';

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@databricks/sdk-databricks/transport';

import {
  Client,
  DataProfilingStatus,
  RefreshState,
  RefreshTrigger,
} from '../../../src/dataquality/v1';
import type {
  CancelRefreshRequest,
  CreateMonitorRequest,
  CreateRefreshRequest,
  DeleteMonitorRequest,
  GetMonitorRequest,
  GetRefreshRequest,
  ListMonitorRequest,
  ListRefreshRequest,
  Refresh,
  UpdateMonitorRequest,
} from '../../../src/dataquality/v1';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Creates a mock HttpClient that captures the request and returns a
// pre-configured response. The mock is the only thing faked in these tests;
// serialization, Zod parsing, and the execute framework all run for real.
function mockHttpClient(
  responseBody: unknown,
  statusCode = 200
): {httpClient: HttpClient; lastRequest: () => HttpRequest | undefined} {
  let captured: HttpRequest | undefined;
  const httpClient: HttpClient = {
    send(request: HttpRequest): Promise<HttpResponse> {
      captured = request;
      const body = new TextEncoder().encode(JSON.stringify(responseBody));
      const stream = new ReadableStream<Uint8Array>({
        start(controller): void {
          controller.enqueue(body);
          controller.close();
        },
      });
      return Promise.resolve({
        statusCode,
        headers: new Headers({'Content-Type': 'application/json'}),
        body: stream,
      });
    },
  };
  return {httpClient, lastRequest: () => captured};
}

// Builds a Client wired to the given mock HttpClient.
function buildClient(mock: {httpClient: HttpClient}): Client {
  return new Client({
    host: 'https://test.databricks.com',
    httpClient: mock.httpClient,
  });
}

// Parses the captured request body from snake_case JSON back into a plain
// object so assertions can verify the wire format directly.
function parseCapturedBody(req: HttpRequest | undefined): unknown {
  if (req?.body === undefined || req.body === null) {
    return undefined;
  }
  const text =
    typeof req.body === 'string'
      ? req.body
      : new TextDecoder().decode(req.body as Uint8Array);
  return JSON.parse(text) as unknown;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Client', () => {
  describe('createMonitor', () => {
    it('should serialize the request as snake_case and deserialize the response as camelCase', async () => {
      // The server returns snake_case JSON.
      const wireResponse = {
        object_type: 'table',
        object_id: 'main.default.my_table',
        data_profiling_config: {
          output_schema_id: 'main.default',
          status: 'DATA_PROFILING_STATUS_PENDING',
          snapshot: {},
        },
      };

      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      // The SDK consumer uses camelCase.
      const req: CreateMonitorRequest = {
        monitor: {
          objectType: 'table',
          objectId: 'main.default.my_table',
          dataProfilingConfig: {
            outputSchemaId: 'main.default',
            snapshot: {},
          },
        },
      };

      const monitor = await client.createMonitor(undefined, req);

      // Verify the response was deserialized to camelCase.
      expect(monitor.objectType).toBe('table');
      expect(monitor.objectId).toBe('main.default.my_table');
      expect(monitor.dataProfilingConfig?.outputSchemaId).toBe('main.default');
      expect(monitor.dataProfilingConfig?.status).toBe(
        DataProfilingStatus.PENDING
      );
      expect(monitor.dataProfilingConfig?.snapshot).toStrictEqual({});

      // Verify the request was serialized to snake_case on the wire.
      const sent = parseCapturedBody(mock.lastRequest());
      expect(sent).toStrictEqual({
        object_type: 'table',
        object_id: 'main.default.my_table',
        data_profiling_config: {
          output_schema_id: 'main.default',
          snapshot: {},
        },
      });

      // Verify URL and method.
      const captured = mock.lastRequest();
      expect(captured?.method).toBe('POST');
      expect(captured?.url).toBe(
        'https://test.databricks.com/api/data-quality/v1/monitors'
      );

      // Verify Content-Type header was set.
      expect(captured?.headers.get('Content-Type')).toBe('application/json');
    });
  });

  describe('getMonitor', () => {
    it('should send a GET request and deserialize the response', async () => {
      const wireResponse = {
        object_type: 'table',
        object_id: 'main.default.my_table',
        data_profiling_config: {
          output_schema_id: 'main.default',
          status: 'DATA_PROFILING_STATUS_ACTIVE',
          snapshot: {},
        },
      };

      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const req: GetMonitorRequest = {
        objectType: 'table',
        objectId: 'main.default.my_table',
      };

      const monitor = await client.getMonitor(undefined, req);

      expect(monitor.objectType).toBe('table');
      expect(monitor.objectId).toBe('main.default.my_table');
      expect(monitor.dataProfilingConfig?.status).toBe(
        DataProfilingStatus.ACTIVE
      );

      const captured = mock.lastRequest();
      expect(captured?.method).toBe('GET');
      expect(captured?.url).toBe(
        'https://test.databricks.com/api/data-quality/v1/monitors/table/main.default.my_table'
      );
    });
  });

  describe('updateMonitor', () => {
    it('should serialize the monitor body and pass update_mask as a query parameter', async () => {
      const wireResponse = {
        object_type: 'table',
        object_id: 'main.default.my_table',
        data_profiling_config: {
          output_schema_id: 'main.default',
          status: 'DATA_PROFILING_STATUS_ACTIVE',
          snapshot: {},
          schedule: {
            quartz_cron_expression: '0 0 12 * * ?',
            timezone_id: 'UTC',
          },
        },
      };

      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const req: UpdateMonitorRequest = {
        objectType: 'table',
        objectId: 'main.default.my_table',
        updateMask: 'data_profiling_config.schedule',
        monitor: {
          objectType: 'table',
          objectId: 'main.default.my_table',
          dataProfilingConfig: {
            outputSchemaId: 'main.default',
            snapshot: {},
            schedule: {
              quartzCronExpression: '0 0 12 * * ?',
              timezoneId: 'UTC',
            },
          },
        },
      };

      const monitor = await client.updateMonitor(undefined, req);

      // Verify deserialized schedule fields.
      expect(monitor.dataProfilingConfig?.schedule?.quartzCronExpression).toBe(
        '0 0 12 * * ?'
      );
      expect(monitor.dataProfilingConfig?.schedule?.timezoneId).toBe('UTC');

      // Verify the update_mask was sent as a query parameter.
      const captured = mock.lastRequest();
      expect(captured?.method).toBe('PATCH');
      expect(captured?.url).toContain(
        'update_mask=data_profiling_config.schedule'
      );

      // Verify the body was serialized to snake_case.
      const sent = parseCapturedBody(captured);
      expect(sent).toStrictEqual({
        object_type: 'table',
        object_id: 'main.default.my_table',
        data_profiling_config: {
          output_schema_id: 'main.default',
          snapshot: {},
          schedule: {
            quartz_cron_expression: '0 0 12 * * ?',
            timezone_id: 'UTC',
          },
        },
      });
    });
  });

  describe('deleteMonitor', () => {
    it('should send a DELETE request with no body', async () => {
      const mock = mockHttpClient({});
      const client = buildClient(mock);

      const req: DeleteMonitorRequest = {
        objectType: 'table',
        objectId: 'main.default.my_table',
      };

      await client.deleteMonitor(undefined, req);

      const captured = mock.lastRequest();
      expect(captured?.method).toBe('DELETE');
      expect(captured?.url).toBe(
        'https://test.databricks.com/api/data-quality/v1/monitors/table/main.default.my_table'
      );
      // DELETE sends no body.
      expect(captured?.body).toBeUndefined();
    });
  });

  describe('createRefresh', () => {
    it('should serialize the refresh body and deserialize the response', async () => {
      const wireResponse = {
        object_type: 'table',
        object_id: 'main.default.my_table',
        refresh_id: 42,
        state: 'MONITOR_REFRESH_STATE_PENDING',
        trigger: 'MONITOR_REFRESH_TRIGGER_MANUAL',
      };

      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const req: CreateRefreshRequest = {
        refresh: {
          objectType: 'table',
          objectId: 'main.default.my_table',
        },
      };

      const refresh = await client.createRefresh(undefined, req);

      // Verify camelCase deserialization.
      expect(refresh.objectType).toBe('table');
      expect(refresh.objectId).toBe('main.default.my_table');
      expect(refresh.refreshId).toBe(42);
      expect(refresh.state).toBe(RefreshState.PENDING);
      expect(refresh.trigger).toBe(RefreshTrigger.MANUAL);

      // Verify snake_case serialization on the wire.
      const sent = parseCapturedBody(mock.lastRequest());
      expect(sent).toStrictEqual({
        object_type: 'table',
        object_id: 'main.default.my_table',
      });

      // Verify the URL includes the object path from the refresh body.
      const captured = mock.lastRequest();
      expect(captured?.url).toBe(
        'https://test.databricks.com/api/data-quality/v1/monitors/table/main.default.my_table/refreshes'
      );
    });
  });

  describe('getRefresh', () => {
    it('should send a GET request with the refresh ID in the URL', async () => {
      const wireResponse = {
        object_type: 'table',
        object_id: 'main.default.my_table',
        refresh_id: 7,
        state: 'MONITOR_REFRESH_STATE_SUCCESS',
        start_time_ms: 1000,
        end_time_ms: 2000,
        trigger: 'MONITOR_REFRESH_TRIGGER_SCHEDULE',
      };

      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const req: GetRefreshRequest = {
        objectType: 'table',
        objectId: 'main.default.my_table',
        refreshId: 7,
      };

      const refresh = await client.getRefresh(undefined, req);

      expect(refresh.refreshId).toBe(7);
      expect(refresh.state).toBe(RefreshState.SUCCESS);
      expect(refresh.startTimeMs).toBe(1000);
      expect(refresh.endTimeMs).toBe(2000);
      expect(refresh.trigger).toBe(RefreshTrigger.SCHEDULE);

      const captured = mock.lastRequest();
      expect(captured?.method).toBe('GET');
      expect(captured?.url).toBe(
        'https://test.databricks.com/api/data-quality/v1/monitors/table/main.default.my_table/refreshes/7'
      );
    });
  });

  describe('cancelRefresh', () => {
    it('should serialize the request and deserialize the nested refresh response', async () => {
      const wireResponse = {
        refresh: {
          object_type: 'table',
          object_id: 'main.default.my_table',
          refresh_id: 3,
          state: 'MONITOR_REFRESH_STATE_CANCELED',
        },
      };

      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const req: CancelRefreshRequest = {
        objectType: 'table',
        objectId: 'main.default.my_table',
        refreshId: 3,
      };

      const resp = await client.cancelRefresh(undefined, req);

      expect(resp.refresh?.objectType).toBe('table');
      expect(resp.refresh?.refreshId).toBe(3);
      expect(resp.refresh?.state).toBe(RefreshState.CANCELED);

      // Verify the wire body was snake_case.
      const sent = parseCapturedBody(mock.lastRequest());
      expect(sent).toStrictEqual({
        object_type: 'table',
        object_id: 'main.default.my_table',
        refresh_id: 3,
      });

      const captured = mock.lastRequest();
      expect(captured?.url).toBe(
        'https://test.databricks.com/api/data-quality/v1/monitors/table/main.default.my_table/refreshes/3/cancel'
      );
    });
  });

  describe('listMonitor', () => {
    it('should pass pagination as query parameters and deserialize a list response', async () => {
      const wireResponse = {
        monitors: [
          {
            object_type: 'table',
            object_id: 'main.default.t1',
          },
          {
            object_type: 'table',
            object_id: 'main.default.t2',
          },
        ],
        next_page_token: 'token-abc',
      };

      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const req: ListMonitorRequest = {
        pageSize: 2,
      };

      const resp = await client.listMonitor(undefined, req);

      expect(resp.monitors).toHaveLength(2);
      expect(resp.monitors?.[0]?.objectId).toBe('main.default.t1');
      expect(resp.monitors?.[1]?.objectId).toBe('main.default.t2');
      expect(resp.nextPageToken).toBe('token-abc');

      const captured = mock.lastRequest();
      expect(captured?.method).toBe('GET');
      expect(captured?.url).toContain('page_size=2');
    });
  });

  describe('listRefresh', () => {
    it('should deserialize refreshes with all fields', async () => {
      const wireResponse = {
        refreshes: [
          {
            object_type: 'table',
            object_id: 'main.default.my_table',
            refresh_id: 1,
            state: 'MONITOR_REFRESH_STATE_SUCCESS',
            trigger: 'MONITOR_REFRESH_TRIGGER_MANUAL',
          },
          {
            object_type: 'table',
            object_id: 'main.default.my_table',
            refresh_id: 2,
            state: 'MONITOR_REFRESH_STATE_PENDING',
            trigger: 'MONITOR_REFRESH_TRIGGER_SCHEDULE',
          },
        ],
      };

      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const req: ListRefreshRequest = {
        objectType: 'table',
        objectId: 'main.default.my_table',
      };

      const resp = await client.listRefresh(undefined, req);

      expect(resp.refreshes).toHaveLength(2);
      expect(resp.refreshes?.[0]?.refreshId).toBe(1);
      expect(resp.refreshes?.[0]?.state).toBe(RefreshState.SUCCESS);
      expect(resp.refreshes?.[1]?.refreshId).toBe(2);
      expect(resp.refreshes?.[1]?.state).toBe(RefreshState.PENDING);
      expect(resp.nextPageToken).toBeUndefined();

      const captured = mock.lastRequest();
      expect(captured?.url).toBe(
        'https://test.databricks.com/api/data-quality/v1/monitors/table/main.default.my_table/refreshes'
      );
    });
  });

  describe('listRefreshIter', () => {
    it('should paginate across multiple pages and yield all items', async () => {
      let callCount = 0;
      const httpClient: HttpClient = {
        send(_request: HttpRequest): Promise<HttpResponse> {
          callCount++;
          // First page returns two items with a next_page_token.
          // Second page returns one item with no token.
          const responseBody =
            callCount === 1
              ? {
                  refreshes: [
                    {refresh_id: 1, state: 'MONITOR_REFRESH_STATE_SUCCESS'},
                    {refresh_id: 2, state: 'MONITOR_REFRESH_STATE_FAILED'},
                  ],
                  next_page_token: 'page-2',
                }
              : {
                  refreshes: [
                    {refresh_id: 3, state: 'MONITOR_REFRESH_STATE_PENDING'},
                  ],
                };

          const body = new TextEncoder().encode(JSON.stringify(responseBody));
          const stream = new ReadableStream<Uint8Array>({
            start(controller): void {
              controller.enqueue(body);
              controller.close();
            },
          });
          return Promise.resolve({
            statusCode: 200,
            headers: new Headers(),
            body: stream,
          });
        },
      };

      const client = new Client({
        host: 'https://test.databricks.com',
        httpClient,
      });

      const refreshes: Refresh[] = [];
      for await (const r of client.listRefreshIter(undefined, {
        objectType: 'table',
        objectId: 'main.default.my_table',
      })) {
        refreshes.push(r);
      }

      expect(refreshes).toHaveLength(3);
      expect(refreshes[0]?.refreshId).toBe(1);
      expect(refreshes[0]?.state).toBe(RefreshState.SUCCESS);
      expect(refreshes[1]?.refreshId).toBe(2);
      expect(refreshes[1]?.state).toBe(RefreshState.FAILED);
      expect(refreshes[2]?.refreshId).toBe(3);
      expect(refreshes[2]?.state).toBe(RefreshState.PENDING);

      // Verify two HTTP calls were made (one per page).
      expect(callCount).toBe(2);
    });
  });

  describe('error handling', () => {
    it('should throw an APIError when the server returns a non-2xx status', async () => {
      const errorBody = {
        error_code: 'NOT_FOUND',
        message: 'Monitor not found.',
      };

      const mock = mockHttpClient(errorBody, 404);
      const client = buildClient(mock);

      const req: GetMonitorRequest = {
        objectType: 'table',
        objectId: 'does.not.exist',
      };

      await expect(client.getMonitor(undefined, req)).rejects.toThrow(
        'Monitor not found.'
      );
    });
  });

  describe('newClient validation', () => {
    it('should throw when host is not provided', () => {
      expect(() => new Client({})).toThrow('Host is required');
    });

    it('should throw when credentials are not provided', () => {
      expect(() => new Client({host: 'https://example.com'})).toThrow(
        'no credentials provided'
      );
    });
  });

  describe('nested model round-trip', () => {
    it('should correctly serialize and deserialize deeply nested structures', async () => {
      // Wire response with deeply nested snake_case fields.
      const wireResponse = {
        object_type: 'table',
        object_id: 'main.default.my_table',
        data_profiling_config: {
          output_schema_id: 'main.default',
          custom_metrics: [
            {
              name: 'null_rate',
              definition: 'COUNT(*) FILTER (WHERE col IS NULL)',
              input_columns: ['col_a', 'col_b'],
              output_data_type: 'DOUBLE',
              type: 'DATA_PROFILING_CUSTOM_METRIC_TYPE_AGGREGATE',
            },
          ],
          notification_settings: {
            on_failure: {
              email_addresses: ['team@example.com'],
            },
          },
          schedule: {
            quartz_cron_expression: '0 0 * * * ?',
            timezone_id: 'America/Los_Angeles',
            pause_status: 'CRON_SCHEDULE_PAUSE_STATUS_UNPAUSED',
          },
        },
      };

      const mock = mockHttpClient(wireResponse);
      const client = buildClient(mock);

      const monitor = await client.getMonitor(undefined, {
        objectType: 'table',
        objectId: 'main.default.my_table',
      });

      // Verify deeply nested fields were deserialized to camelCase.
      const config = monitor.dataProfilingConfig;
      expect(config?.customMetrics).toHaveLength(1);

      const metric = config?.customMetrics?.[0];
      expect(metric?.name).toBe('null_rate');
      expect(metric?.inputColumns).toStrictEqual(['col_a', 'col_b']);
      expect(metric?.outputDataType).toBe('DOUBLE');

      const notif = config?.notificationSettings;
      expect(notif?.onFailure?.emailAddresses).toStrictEqual([
        'team@example.com',
      ]);

      const schedule = config?.schedule;
      expect(schedule?.quartzCronExpression).toBe('0 0 * * * ?');
      expect(schedule?.timezoneId).toBe('America/Los_Angeles');

      // Now create a monitor with the same nested structure and verify the
      // request body is serialized back to snake_case.
      const createMock = mockHttpClient(wireResponse);
      const createClient = buildClient(createMock);

      const createReq: CreateMonitorRequest = {
        monitor: {
          objectType: 'table',
          objectId: 'main.default.my_table',
          dataProfilingConfig: {
            outputSchemaId: 'main.default',
            customMetrics: [
              {
                name: 'null_rate',
                definition: 'COUNT(*) FILTER (WHERE col IS NULL)',
                inputColumns: ['col_a', 'col_b'],
                outputDataType: 'DOUBLE',
              },
            ],
            notificationSettings: {
              onFailure: {
                emailAddresses: ['team@example.com'],
              },
            },
            schedule: {
              quartzCronExpression: '0 0 * * * ?',
              timezoneId: 'America/Los_Angeles',
            },
          },
        },
      };

      await createClient.createMonitor(undefined, createReq);

      // Verify the deeply nested wire body is snake_case.
      const sent = parseCapturedBody(createMock.lastRequest());
      expect(sent).toStrictEqual({
        object_type: 'table',
        object_id: 'main.default.my_table',
        data_profiling_config: {
          output_schema_id: 'main.default',
          custom_metrics: [
            {
              name: 'null_rate',
              definition: 'COUNT(*) FILTER (WHERE col IS NULL)',
              input_columns: ['col_a', 'col_b'],
              output_data_type: 'DOUBLE',
            },
          ],
          notification_settings: {
            on_failure: {
              email_addresses: ['team@example.com'],
            },
          },
          schedule: {
            quartz_cron_expression: '0 0 * * * ?',
            timezone_id: 'America/Los_Angeles',
          },
        },
      });
    });
  });
});
