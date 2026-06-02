# Naming Audit: dataquality

**Path:** `packages/dataquality/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 8

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 3 |
| Low | 1 |
| Observation | 1 |

## High severity

### 1. `ListMonitorRequest` / `ListMonitorResponse` / `listMonitor` — `src/v1/model.ts:345,351`, `src/v1/client.ts:339`
- **Why weird:** Singular noun on a list operation. A list returns many monitors but the type and method names use the singular `Monitor`. The wire path is `/api/data-quality/v1/monitors` (plural), the response holds `monitors?: Monitor[]`, and the paginator yields a single `Monitor` — every concrete signal says plural; only the type/method name disagrees.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `ListMonitorsRequest` / `ListMonitorsResponse` / `listMonitors`.
- **Rationale:** REST conventions, the package's own field naming (`monitors`, `refreshes`), and the URL path all use plural. The singular form here is generator template noise, not intent. Same fix applies to refreshes (#2).

### 2. `ListRefreshRequest` / `ListRefreshResponse` / `listRefresh` — `src/v1/model.ts:357,377`, `src/v1/client.ts:404`
- **Why weird:** Same singular-on-list problem as #1. The wire path is `/refreshes` and the response holds `refreshes?: Refresh[]`.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `ListRefreshesRequest` / `ListRefreshesResponse` / `listRefreshes`.
- **Rationale:** Internal consistency: every other place in this file uses the plural `refreshes`. Only the type and method name break the pattern.

### 3. `Monitor.objectType` + `Monitor.objectId` (and every request type that copies them) — `src/v1/model.ts:383-405,385,397` and 6 other request types
- **Why weird:** `objectType` is a free-form `string` typed as the values `"schema"` or `"table"`. The discriminator is implicit in a `string`. The companion `objectId` is a `string` whose actual content depends on what `objectType` says ("It is `schema_id` for `schema`, and `table_id` for `table`"). This is a stringly-typed sum type. Every single request and response in the package copies these two fields verbatim with copy-pasted JSDoc (43 lines of the same boilerplate per type, 6+ types).
- **Category:** 1 (vague — `objectType` could be anything), 6 (misleading — stringly-typed sum), 15 (generic field name losing meaning), 19 (underspecified ID — `objectId` shape depends on a sibling field's value).
- **Suggested name:** Model as a discriminated union: `target: {kind: 'schema', schemaId: string} | {kind: 'table', tableId: string}`.
- **Rationale:** TypeScript's strength is exhaustive discriminated unions. Leaving these as `string` defeats the type system and forces every caller to read the JSDoc. The current copy-paste of the same 40-line doc across `CancelRefreshRequest`, `DeleteMonitorRequest`, `DeleteRefreshRequest`, `GetMonitorRequest`, `GetRefreshRequest`, `ListRefreshRequest`, `Refresh`, `UpdateMonitorRequest`, `UpdateRefreshRequest` is a smoking gun for missing abstraction.

## Medium severity

### 4. `Monitor.anomalyDetectionConfig` and `Monitor.dataProfilingConfig` — `src/v1/model.ts:399,404`
- **Why weird:** Two top-level fields, exactly one of which must be populated based on `objectType`. The relationship is documented in JSDoc but not in the type. This is the second un-modelled discriminated union in the package (the first being `objectType` itself, #3). A user reading the type sees two optional fields and has no idea both could be set at once (or neither).
- **Category:** 6 (misleading — type says both optional, semantics say exactly one), 11 (missing union — should be discriminated).
- **Suggested name:** Model as: `configuration: {kind: 'schema', anomalyDetection: AnomalyDetectionConfig} | {kind: 'table', dataProfiling: DataProfilingConfig}`. Then drop `objectType` (the discriminator becomes implicit).
- **Rationale:** This is the same anti-pattern as `objectType` — using the type system to model business rules instead of relying on doc strings.

### 5. `NotificationSettings.onFailure: NotificationDestination` — `src/v1/model.ts:416`
- **Why weird:** Field name `onFailure` with type `NotificationDestination` — `Notification` repeated in both parent type and the destination type. The JSDoc says "Destinations to send notifications on failure/timeout." — failure *and* timeout, but the field name only says failure.
- **Category:** 1 (vague — name says `failure`, doc says `failure/timeout`), 8 (redundant prefix in the type).
- **Suggested name:** Type: `Destination` (drop the `Notification` prefix since the type is only used here). Field stays `onFailure`; update doc to clarify timeout semantics.
- **Rationale:** Field name and JSDoc should agree on whether timeouts are included; type name should not repeat its parent's noun.

### 6. Pervasive `Config` suffix on sibling domain types — `src/v1/model.ts:98,156,329,451,454`
- **Why weird:** Five sibling types all end in `Config`: `AnomalyDetectionConfig`, `DataProfilingConfig`, `InferenceLogConfig`, `TimeSeriesConfig`, `SnapshotConfig`. The `Config` suffix is a proto-style architectural label — it adds no semantic information once you know the type is a configuration record. The Go reference SDK uses these names because protobuf's `*Config` messages map 1:1 to Go structs, but TS does not need to carry that scaffolding. The leak is most visible at the call site `DataProfilingConfig.analysisConfig` where three `Config`-suffixed arms nest inside a `Config`-suffixed field on a `Config`-suffixed type — triple `Config` nesting in a single access path.
- **Category:** proto-architectural-leak (repeated `Config` mid/suffix), 8 (redundant suffix), 12 (duplicate concept).
- **Suggested name:** Drop the `Config` suffix on the analysis-arm types: `InferenceLog`, `TimeSeries`, `Snapshot`. Keep `AnomalyDetectionConfig` / `DataProfilingConfig` as the top-level monitor configurations (they are genuinely "the config" of a `Monitor`). Or rename uniformly to `AnomalyDetectionSettings` / `DataProfilingSettings` and use `Analysis` for the arm types.
- **Rationale:** `Config` is generator-template noise inherited from `.proto` message names. Removing it produces names that read as the domain concept they represent (`InferenceLog`, `TimeSeries`, `Snapshot`) rather than as scaffolding.

## Low severity

### 7. `req.objectId ?? ''` / `req.objectType ?? ''` URL composition — `src/v1/client.ts:95, 174, 217, 239, 276, 315, 408, 473, 514`
- **Why weird:** Same as `dataclassification` finding #25 — `objectType`/`objectId` typed optional but required in practice. Silently substitutes empty string producing malformed URLs like `/api/data-quality/v1/monitors//`.
- **Category:** 6.
- **Suggested name:** Make `objectType` and `objectId` non-optional on every request type that constructs a URL from them.
- **Rationale:** Type shape should match runtime requirement.

## Observations

### 8. Action verbs in `Client`
The client uses `Create`/`Get`/`Update`/`Delete`/`List`/`Cancel` for monitor and refresh operations. Verbs are consistent within the package. (Listed per rule 17 to note the absence of inconsistency.)
