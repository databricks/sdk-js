# Naming Audit: dataquality

**Path:** `packages/dataquality/src/v1/`
**Versions audited:** v1
**Inferred domain:** Data Quality monitoring on Unity Catalog schemas and tables. The package models two flavours of "Monitor" (Anomaly Detection for schemas, Data Profiling for tables), Refresh runs of the underlying monitoring pipeline, cron-style scheduling, baseline-vs-monitored drift metrics, custom metric definitions, and notification routing on failure.
**Total weird names flagged:** 41

## Summary
| Severity | Count |
| --- | --- |
| High | 11 |
| Medium | 17 |
| Low | 8 |
| Observation | 5 |

## High severity

### 1. `ListMonitorRequest` / `ListMonitorResponse` / `listMonitor` — `src/v1/model.ts:345,351`, `src/v1/client.ts:316`
- **Why weird:** Singular noun on a list operation. A list returns many monitors but the type and method names use the singular `Monitor`. The wire path is `/api/data-quality/v1/monitors` (plural), the response holds `monitors?: Monitor[]`, and the paginator yields a single `Monitor` — every concrete signal says plural; only the type/method name disagrees.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `ListMonitorsRequest` / `ListMonitorsResponse` / `listMonitors`.
- **Rationale:** REST conventions, the package's own field naming (`monitors`, `refreshes`), and the URL path all use plural. The singular form here is generator template noise, not intent. Same fix applies to refreshes (#2).

### 2. `ListRefreshRequest` / `ListRefreshResponse` / `listRefresh` — `src/v1/model.ts:357,377`, `src/v1/client.ts:378`
- **Why weird:** Same singular-on-list problem as #1. The wire path is `/refreshes` and the response holds `refreshes?: Refresh[]`.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `ListRefreshesRequest` / `ListRefreshesResponse` / `listRefreshes`.
- **Rationale:** Internal consistency: every other place in this file uses the plural `refreshes`. Only the type and method name break the pattern.

### 3. `RefreshState` uses `_UNKNOWN` sentinel instead of `_UNSPECIFIED` — `src/v1/model.ts:72-84`
- **Why weird:** `RefreshState` includes `MONITOR_REFRESH_STATE_UNKNOWN` while every other enum in this file uses `_UNSPECIFIED` (e.g. `DataProfilingStatus.DATA_PROFILING_STATUS_UNSPECIFIED`). Inconsistent sentinel naming across sibling enums on the same type.
- **Category:** 17 (inconsistent sentinel — `UNKNOWN` vs `UNSPECIFIED` in sibling enums).
- **Suggested name:** Normalise the unset member to `_UNSPECIFIED`.
- **Rationale:** The `UNKNOWN`/`UNSPECIFIED` inconsistency with `RefreshTrigger.MONITOR_REFRESH_TRIGGER_UNKNOWN` vs `DataProfilingStatus.DATA_PROFILING_STATUS_UNSPECIFIED` will trip API users who write `===` checks against the sentinel.

### 4. `RefreshTrigger` uses `_UNKNOWN` sentinel instead of `_UNSPECIFIED` — `src/v1/model.ts:87-95`
- **Why weird:** Same sentinel inconsistency as #3. `RefreshTrigger` uses `_UNKNOWN` for the unset value while sibling enums use `_UNSPECIFIED`.
- **Category:** 17 (sentinel inconsistency).
- **Suggested name:** Normalise the unset member to `_UNSPECIFIED`.
- **Rationale:** Same as #3.

### 5. `CronSchedulePauseStatus` enum + `pauseStatus` field — `src/v1/model.ts:33-39,152`
- **Why weird:** A two-state on/off concept (`UNPAUSED` vs `PAUSED`) modelled as an enum. The `pauseStatus` field on `CronSchedule` is read-only (per JSDoc), but nothing in the type marks it as such. A boolean `paused: boolean` would model the same thing in one byte of cognitive load.
- **Category:** 11 (trivially-enum where boolean suffices), 6 (misleading: field is read-only but typing does not enforce).
- **Suggested name:** Collapse to `paused?: boolean` (output-only).
- **Rationale:** "Paused" is binary. The `CRON_SCHEDULE_PAUSE_STATUS_*` enum adds no information over a boolean. Sister packages (`jobs`, `alerts`) already use boolean `paused` fields.

### 6. `Monitor.objectType` + `Monitor.objectId` (and every request type that copies them) — `src/v1/model.ts:383-405,385,397` and 6 other request types
- **Why weird:** `objectType` is a free-form `string` typed as the values `"schema"` or `"table"`. The discriminator is implicit in a `string`. The companion `objectId` is a `string` whose actual content depends on what `objectType` says ("It is `schema_id` for `schema`, and `table_id` for `table`"). This is a stringly-typed sum type. Every single request and response in the package copies these two fields verbatim with copy-pasted JSDoc (43 lines of the same boilerplate per type, 6+ types).
- **Category:** 1 (vague — `objectType` could be anything), 6 (misleading — stringly-typed sum), 15 (generic field name losing meaning), 19 (underspecified ID — `objectId` shape depends on a sibling field's value).
- **Suggested name:** Model as a discriminated union: `target: {kind: 'schema', schemaId: string} | {kind: 'table', tableId: string}`. Or at minimum, type `objectType: 'schema' | 'table'`.
- **Rationale:** TypeScript's strength is exhaustive discriminated unions. Leaving these as `string` defeats the type system and forces every caller to read the JSDoc. The current copy-paste of the same 40-line doc across `CancelRefreshRequest`, `DeleteMonitorRequest`, `DeleteRefreshRequest`, `GetMonitorRequest`, `GetRefreshRequest`, `ListRefreshRequest`, `Refresh`, `UpdateMonitorRequest`, `UpdateRefreshRequest` is a smoking gun for missing abstraction.

### 7. `Client` class — `src/v1/client.ts:55`
- **Why weird:** A class literally named `Client` at the top of the package's public surface. A user importing two SDK packages (e.g., `@databricks/sdk-dataquality` and `@databricks/sdk-dataclassification`) cannot import both as `Client`. The package name is already in the import path, but in IDE go-to-symbol the name appears unqualified.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name).
- **Suggested name:** `DataQualityClient`.
- **Rationale:** Cross-package import collisions force users to alias. Generator-wide concern but worth flagging.

### 8. `DataProfilingConfig.analysisConfig` discriminated-union — `src/v1/model.ts:165-181`
- **Why weird:** A field called `analysisConfig` is a three-arm union of `InferenceLogConfig` / `TimeSeriesConfig` / `SnapshotConfig`. The outer name (`analysisConfig`) and one arm's type (`SnapshotConfig`) end in the same suffix; the discriminator `$case` values are `inferenceLog` / `timeSeries` / `snapshot` — three different naming bases for three different concepts (`InferenceLog`, `TimeSeries`, `Snapshot`). The arm payloads are also `inferenceLog: InferenceLogConfig` (camelCase) — collision-prone with the discriminator string.
- **Category:** 1 (vague — "analysis" vs "config" is the wrong abstraction), 12 (duplicate concept — `Config` appears twice), 17 (inconsistent verb tense — `InferenceLog` is a noun, `TimeSeries` is a noun, but the type name reads `Inference` + `Log` + `Config`).
- **Suggested name:** Field: `analysis`. Type: keep `InferenceLogConfig` etc., or rename to `InferenceLogAnalysis`/`TimeSeriesAnalysis`/`SnapshotAnalysis` and call the field `analysis`. The TS-level discriminator should follow the type name: `kind: 'inferenceLog' | 'timeSeries' | 'snapshot'`.
- **Rationale:** The current pattern forces callers to write `{analysisConfig: {$case: 'inferenceLog', inferenceLog: {...}}}` — three names for one nesting level. Discriminated unions read better when the discriminator value matches the arm payload's key precisely.

### 9. `DataProfilingConfig.skipBuiltinDashboard` — `src/v1/model.ts:204`
- **Why weird:** Negative boolean field name. Reading `skipBuiltinDashboard: true` requires a mental NOT-flip. Positive form is clearer: `builtinDashboard: false` or `enableBuiltinDashboard: false`. Also: the verb `skip` (sound only on a transient action) does not capture that this is a persistent configuration.
- **Category:** 6 (misleading — looks like a transient flag, is configuration), 13 (verb-tense — `skip` is action, but the field is state).
- **Suggested name:** `disableBuiltinDashboard` (matches the existing negative semantics with a clearer verb), or invert to `createBuiltinDashboard: boolean` (default true).
- **Rationale:** Boolean fields should be named in their positive form unless the negative form is the natural English phrasing. The "skip" prefix is a tell from migrating Go SDK semantics directly.

### 10. `DataProfilingConfig.assetsDir` — `src/v1/model.ts:163`
- **Why weird:** `assets` is generic and undefined in this context (which assets? the monitor's? the dashboard's? the metric tables'?). `Dir` is an abbreviation. The JSDoc says "absolute path to a custom directory to store data-monitoring assets" — the type should advertise that.
- **Category:** 1 (vague — `assets` of what?), 5 (cryptic abbreviation — `Dir` for `Directory`).
- **Suggested name:** `assetsDirectory`, or better, `dataMonitoringAssetsPath`.
- **Rationale:** Fields holding an absolute path should call out either "path" or "directory" without abbreviation. `assets` alone is too generic for a top-level field on a config that already has `monitoredTableName`, `profileMetricsTableName`, `driftMetricsTableName`, etc.

### 11. `Refresh.startTimeMs` / `Refresh.endTimeMs` — `src/v1/model.ts:442,444`
- **Why weird:** `Ms` suffix to indicate "milliseconds since epoch", but it ignores the local convention of `Date` and `bigint` for UTC timestamps in modern TS. The field is `number` — JavaScript numbers lose precision beyond 2^53, but milliseconds-since-epoch fits, so the type itself is fine. The `Ms` suffix tells the reader to do arithmetic with `new Date(x)`; meanwhile `creation_time` / `last_updated` elsewhere in the SDK uses `bigint` with explicit precision. Inconsistent unit handling across the SDK.
- **Category:** 5 (cryptic abbreviation — `Ms`), 14 (Go-style suffix — Go SDK uses `int64` with `Ms` everywhere; TS would use `Date`).
- **Suggested name:** Leave on the wire as `start_time_ms` but on the TS side use `startedAt: Date` / `endedAt: Date` (transformed in unmarshal).
- **Rationale:** Idiomatic TS uses `Date` for UTC instants. Forcing every caller to write `new Date(refresh.startTimeMs)` to display a timestamp is a paper cut. Other Databricks SDK packages have moved to this. (Generator-wide concern.)

## Medium severity

### 12. `CancelRefreshResponse.refresh` JSDoc says "The refresh to cancel" — `src/v1/model.ts:125`
- **Why weird:** JSDoc on `CancelRefreshResponse.refresh` says "The refresh to cancel" but this is the response (the refresh that *was* cancelled). The doc verb tense contradicts the type name. Listed as naming because the field's contextual meaning is shaped by stale request-side docs.
- **Category:** 13 (verb tense — "to cancel" is forward-looking; "cancelled" / "the cancelled refresh" is past-tense).
- **Suggested name:** Field stays `refresh`; doc should read "The cancelled refresh."
- **Rationale:** Documentation accuracy. The current text implies user intent rather than response state.

### 13. `DeleteRefreshRequest` doc-block typo "Request to delete a ronitor." — `src/v1/model.ts:270`
- **Why weird:** Doc string typo "ronitor" (should be "monitor" or "refresh"). Affects discoverability via IDE tooltip search. Plus, the doc text says "monitor" but the type's purpose is deleting a refresh — meta-error.
- **Category:** 6 (misleading — typo invites confusion about the type's purpose).
- **Suggested name:** Doc should read "Request to delete a refresh."
- **Rationale:** Generator-emitted typo. Listed because the doc is the first thing IDE users see.

### 14. `AnomalyDetectionConfig.excludedTableFullNames` — `src/v1/model.ts:100`
- **Why weird:** "Full names" is jargon; the JSDoc says "fully qualified table names". The shorter form drops the qualifying word that gives the name its meaning ("full" alone is ambiguous — full path? full description?). Other Databricks SDK packages use `fullName` consistently for UC three-part names.
- **Category:** 1 (vague — "full" alone is generic), 5 (abbreviated jargon).
- **Suggested name:** `excludedTables` (since the values are by definition UC fully-qualified table names), or `excludedTableFullyQualifiedNames` for absolute clarity.
- **Rationale:** Across the SDK, `fullName` is well-known UC vocabulary, so the proposal is the *minor* rename to `excludedTables` since the type (string[]) plus parent context (anomaly detection on UC objects) already implies fully-qualified.

### 15. `DataProfilingConfig.outputSchemaId` vs `monitoredTableName` vs `dashboardId` vs `warehouseId` — `src/v1/model.ts:158,211,224,209`
- **Why weird:** Identifier fields mix three reference styles in one type: `Id` (UC UUIDs: schema, dashboard, warehouse), `FullName` (table), and bare `Name` (output schema is by ID, but `assetsDir` is a path). The user reading `DataProfilingConfig` must remember that to set the *target* of the monitor you use `monitoredTableName` (a three-part name) but to set the *destination* of the metric tables you use `outputSchemaId` (a UUID). The pattern is wire-driven, not user-led.
- **Category:** 17 (inconsistent reference styles), 19 (underspecified IDs — `outputSchemaId` is a UUID but `monitoredTableName` is a three-part qualified name).
- **Suggested name:** Document both clearly in the JSDoc; consider a normalised pair `outputSchema: {id?: string, fullName?: string}` and `monitoredTable: {fullName: string}`. Or rename `monitoredTableName` to `monitoredTableFullName` (matches the JSDoc).
- **Rationale:** UC has a stable convention: `*FullName` for three-part references, `*Id` for UUIDs. Following that convention everywhere reduces caller errors.

### 16. `DataProfilingConfig.warehouseId` and `DataProfilingConfig.effectiveWarehouseId` — `src/v1/model.ts:209,232`
- **Why weird:** Two parallel fields: user-provided `warehouseId` (optional input — falls back to "the first running warehouse" per doc) and `effectiveWarehouseId` (the warehouse actually used). Same shape as `dataclassification.autoTagConfigs` vs `effectiveAutoTagConfigs` (audited finding #6 in that package). The "effective" prefix is not marked output-only; a caller can set `effectiveWarehouseId` thinking it overrides `warehouseId`. Also: `effectiveWarehouseId` has no JSDoc trailer period ("The warehouse for dashboard creation" — missing period).
- **Category:** 1 (vague — "effective" undermarked), 6 (misleading — output-only not enforced by typing), and (style nit) missing period.
- **Suggested name:** Mark with JSDoc `@readonly`; or rename to `resolvedWarehouseId`. The minor doc-style miss (no period) is a CLAUDE.md rule violation: "Comments should always be proper sentences ending with a period."
- **Rationale:** Same pattern as the `effective*` audit findings in other packages. Output-only state should be visually distinct from input state.

### 17. `DataProfilingConfig.monitoredTableName` — `src/v1/model.ts:211`
- **Why weird:** Half-redundant. `DataProfilingConfig` is a per-table config; the table being configured is "the monitored table". JSDoc says "Format: `catalog.schema.table_name`" — confirming this is a UC three-part name. Calling it `monitoredTableName` is fine, but it's the only "monitored" field on the type, so the prefix gives little signal. Compare with `Monitor.objectId` which holds the same data conceptually.
- **Category:** 1 (vague modifier — `monitored` adds nothing), 7 (overly verbose).
- **Suggested name:** `tableFullName` (or rely on `Monitor.objectId` and remove the duplicate field entirely).
- **Rationale:** The package already carries the target identity on `Monitor.objectId`. Duplicating it inside the config is a wire artifact, not a TS-level design choice.

### 18. `DataProfilingConfig.latestMonitorFailureMessage` — `src/v1/model.ts:215`
- **Why weird:** Five-word field name on a type whose name is `DataProfilingConfig` — "latest" + "monitor" + "failure" + "message" + field is on `Monitor`. "Monitor" appears in the path: `monitor.dataProfilingConfig.latestMonitorFailureMessage`.
- **Category:** 7 (overly verbose), 8 (redundant suffix — `Monitor` is in the access path).
- **Suggested name:** `latestFailureMessage`.
- **Rationale:** Field path already gives the Monitor context; the field's own name should drop it.

### 19. `DataProfilingConfig.profileMetricsTableName` / `driftMetricsTableName` — `src/v1/model.ts:217,219`
- **Why weird:** A pair where one is "profile metrics" and the other is "drift metrics", but the JSDoc is identical down to the punctuation ("Table that stores [profile|drift] metrics data. Format: `catalog.schema.table_name`."). The only diff between the field names is the leading noun, but the type name `DataProfilingConfig` already says "profiling" — so `profileMetricsTableName` reads slightly redundant.
- **Category:** 7 (overly verbose), 17 (inconsistent — drop "profile" prefix to match `driftMetricsTableName` shape, or add a profile/drift prefix universally).
- **Suggested name:** `profileMetricsTable` + `driftMetricsTable` (drop `Name` since wire is the same, and the type itself names a wire reference).
- **Rationale:** Consistent prefixing within a paired feature. Listed medium because the rename is risky for back-compat reasons.

### 20. `DataProfilingConfig.slicingExprs` — `src/v1/model.ts:190`
- **Why weird:** `Exprs` abbreviation. The JSDoc is 8 lines explaining what `slicing_exprs` does; the field name reduces "expressions" to four characters of cryptic shorthand. Mixed-case: would be `slicingExprs` in TS but the wire field is `slicing_exprs` (Python-style).
- **Category:** 5 (cryptic abbreviation — `Exprs` for `Expressions`).
- **Suggested name:** `slicingExpressions` (or, given the doc explains they are "column expressions", `columnSlicingExpressions`).
- **Rationale:** Length is rarely an issue in TS — modern IDEs autocomplete. Cryptic abbreviation, however, costs readability forever.

### 21. `DataProfilingConfig.customMetrics: DataProfilingCustomMetric[]` — `src/v1/model.ts:192`
- **Why weird:** Type name `DataProfilingCustomMetric` repeats the parent type's prefix (`DataProfiling`). Same field/type-name asymmetry called out in `dataclassification` (autoTag vs AutoTagging). Field `customMetrics` is fine; the type's prefix is the noise.
- **Category:** 7 (overly verbose), 8 (redundant suffix).
- **Suggested name:** `CustomMetric` (drop the `DataProfiling` prefix) — namespace via TS module if needed.
- **Rationale:** Inside the `dataquality` package, "custom metric" can only mean one thing (a profiling metric definition). The `DataProfiling` prefix is dead context.

### 22. `DataProfilingCustomMetric.outputDataType: string` — `src/v1/model.ts:247`
- **Why weird:** Field name is `outputDataType` and JSDoc says "The output type of the custom metric." — the JSDoc drops `Data`. Field is typed `string`, no enum. Compare with `type: DataProfilingCustomMetricType` which is enum and is the *kind* of metric, not its *data type*. The reader must parse two `type` fields on the same type.
- **Category:** 1 (vague — `outputDataType` vs `type`), 12 (duplicate concept — two `type`s), 17 (inconsistent — one is enum, one is string).
- **Suggested name:** `outputSqlType` (since the value is a SQL type like `DOUBLE`), or `outputColumnType`.
- **Rationale:** Two `type`-like fields on the same struct is a code-smell; making one specifically `Sql` or `Column` removes the ambiguity.

### 23. `DataProfilingStatus` has both `ERROR` and `FAILED` members; `DELETE_PENDING` word order — `src/v1/model.ts:57`
- **Why weird:** The enum has six values (`UNSPECIFIED`, `ACTIVE`, `PENDING`, `DELETE_PENDING`, `ERROR`, `FAILED`) — `ERROR` and `FAILED` likely mean the same thing in practice but are modelled separately, with no JSDoc distinguishing them. Separately, `DELETE_PENDING` orders the tokens verb-then-state where most APIs write `PENDING_DELETE` (state-modified-by-action).
- **Category:** 12 (duplicate concept — `ERROR` and `FAILED`), 17 (inconsistent word order vs sibling `PENDING`).
- **Suggested name:** Either merge `ERROR` and `FAILED` into a single member, or document the difference in JSDoc. Reorder `DELETE_PENDING` to `PENDING_DELETE`.
- **Rationale:** The implicit duplicate of `ERROR`/`FAILED` makes this enum harder to reason about than it should be; two synonymous terminal states force callers to handle both. `PENDING_DELETE` mirrors the existing `PENDING` member's modifier-suffix shape.

### 24. `Monitor.anomalyDetectionConfig` and `Monitor.dataProfilingConfig` — `src/v1/model.ts:399,404`
- **Why weird:** Two top-level fields, exactly one of which must be populated based on `objectType`. The relationship is documented in JSDoc but not in the type. This is the second un-modelled discriminated union in the package (the first being `objectType` itself, #8). A user reading the type sees two optional fields and has no idea both could be set at once (or neither).
- **Category:** 6 (misleading — type says both optional, semantics say exactly one), 11 (missing union — should be discriminated).
- **Suggested name:** Model as: `configuration: {kind: 'schema', anomalyDetection: AnomalyDetectionConfig} | {kind: 'table', dataProfiling: DataProfilingConfig}`. Then drop `objectType` (the discriminator becomes implicit).
- **Rationale:** This is the same anti-pattern as `objectType` — using the type system to model business rules instead of relying on doc strings.

### 25. `CronSchedule.quartzCronExpression` and `CronSchedule.timezoneId` — `src/v1/model.ts:144,150`
- **Why weird:** Field is qualified with `Quartz` (the scheduling library) leaking implementation detail; users do not need to know the schedule is parsed by Quartz on the server side. `timezoneId` collides with the IANA tz database vocabulary ("timezone ID" is not standard; "IANA timezone name" or just "timezone" is).
- **Category:** 14 (implementation-detail leak — `Quartz` is a Java library reference), 5 (jargon — `timezoneId` vs the JS-standard `timeZone`).
- **Suggested name:** `cronExpression` + `timezone`.
- **Rationale:** The doc already says "Java timezone id"; the field name should be neutral.

### 26. `NotificationSettings.onFailure: NotificationDestination` — `src/v1/model.ts:416`
- **Why weird:** Field name `onFailure` with type `NotificationDestination` — `Notification` repeated in both parent type and the destination type. The JSDoc says "Destinations to send notifications on failure/timeout." — failure *and* timeout, but the field name only says failure.
- **Category:** 1 (vague — name says `failure`, doc says `failure/timeout`), 8 (redundant prefix in the type).
- **Suggested name:** Field: `onFailureOrTimeout` (matches doc), or `onFailure` (matches name; update doc). Type: `Destination` (drop the `Notification` prefix since the type is only used here).
- **Rationale:** Field name and JSDoc should agree on whether timeouts are included.

### 27. `Refresh.message` — `src/v1/model.ts:440`
- **Why weird:** `message` is the most generic possible name on a `Refresh` object. JSDoc clarifies: "An optional message to give insight into the current state of the refresh (e.g. FAILURE messages)" — so this is really an error message or status message, not just any message.
- **Category:** 1 (vague — `message` could be anything), 15 (generic field name).
- **Suggested name:** `statusMessage` or `stateMessage`.
- **Rationale:** Field on a typed object should be self-describing.

### 28. Pervasive `Config` suffix on sibling domain types — `src/v1/model.ts:98,156,329,451,454`
- **Why weird:** Five sibling types all end in `Config`: `AnomalyDetectionConfig`, `DataProfilingConfig`, `InferenceLogConfig`, `TimeSeriesConfig`, `SnapshotConfig`. The `Config` suffix is a proto-style architectural label — it adds no semantic information once you know the type is a configuration record. The Go reference SDK uses these names because protobuf's `*Config` messages map 1:1 to Go structs, but TS does not need to carry that scaffolding. The leak is most visible at the call site `DataProfilingConfig.analysisConfig` (already flagged in #8) where three `Config`-suffixed arms nest inside a `Config`-suffixed field on a `Config`-suffixed type — triple `Config` nesting in a single access path.
- **Category:** proto-architectural-leak (repeated `Config` mid/suffix), 8 (redundant suffix), 12 (duplicate concept).
- **Suggested name:** Drop the `Config` suffix on the analysis-arm types: `InferenceLog`, `TimeSeries`, `Snapshot`. Keep `AnomalyDetectionConfig` / `DataProfilingConfig` as the top-level monitor configurations (they are genuinely "the config" of a `Monitor`). Or rename uniformly to `AnomalyDetectionSettings` / `DataProfilingSettings` and use `Analysis` for the arm types.
- **Rationale:** `Config` is generator-template noise inherited from `.proto` message names. Removing it produces names that read as the domain concept they represent (`InferenceLog`, `TimeSeries`, `Snapshot`) rather than as scaffolding.

## Low severity

### 29. `flattenQueryParams` exported but unused — `src/v1/utils.ts:123`
- **Why weird:** Exported helper that is never called from `client.ts`. The package's two list endpoints handle pagination params (`pageToken`, `pageSize`) inline rather than via `flattenQueryParams`. Dead exported surface.
- **Category:** 6 (misleading — looks like it's used; isn't).
- **Suggested name:** N/A — should be unexported (or moved to a shared utils package — generator-wide concern).
- **Rationale:** Same as `dataclassification` finding #19.

### 30. `executeCall` vs `executeHttpCall` — `src/v1/utils.ts:26,65`
- **Why weird:** Layering not visible from names; identical to `dataclassification` finding #15.
- **Category:** 1, 12, 17.
- **Suggested name:** `runWithRetry` (outer) + `sendHttpRequest` (inner).
- **Rationale:** Layering should be readable from the names without opening the source.

### 31. `buildHttpRequest` — `src/v1/utils.ts:96`
- **Why weird:** Same as `dataclassification` finding #16; "build" suggests builder pattern, the function spreads literals.
- **Category:** 1, 6.
- **Suggested name:** `makeHttpRequest`.
- **Rationale:** "Make" matches the simpler reality.

### 32. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Identical to `dataclassification` finding #20; "readAll" does not say "drain a stream".
- **Category:** 1, 5.
- **Suggested name:** `drainStream`.
- **Rationale:** Self-describing name for stream draining.

### 33. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Same as `dataclassification` finding #21; internal context bag called `Options`.
- **Category:** 1, 8.
- **Suggested name:** `HttpCallContext`.
- **Rationale:** Reserve `Options` for user-tunable knobs.

### 34. `PACKAGE_SEGMENT` — `src/v1/client.ts:50`
- **Why weird:** Same as `dataclassification` finding #22; unspecific noun for a User-Agent identity object.
- **Category:** 1.
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Add the missing domain word.

### 35. `Call` type + `call` variable — `src/v1/client.ts:96, 135, 169, 207, 226, 261, 297, 331, 393, 453, 491`
- **Why weird:** Same as `dataclassification` finding #24; variable named `call` of type `Call` repeated 11 times across the client.
- **Category:** 1, 12.
- **Suggested name:** `request` (variable) — reserve `Call` for the type.
- **Rationale:** Type/variable collision is common in Go idioms; TS prefers distinct names.

### 36. `req.objectId ?? ''` / `req.objectType ?? ''` URL composition — `src/v1/client.ts:93, 166, 206, 225, 259, 295, 382, 444, 482`
- **Why weird:** Same as `dataclassification` finding #25 — `objectType`/`objectId` typed optional but required in practice. Silently substitutes empty string producing malformed URLs like `/api/data-quality/v1/monitors//`.
- **Category:** 6.
- **Suggested name:** Make `objectType` and `objectId` non-optional on every request type that constructs a URL from them.
- **Rationale:** Type shape should match runtime requirement.

## Observations

### 37. Heavy boilerplate dominates the file
`model.ts` is 1030 lines for ~16 user-facing types; ~520 lines (~50%) are `marshal*` / `unmarshal*` / `*FieldMaskSchema` scaffolding. Same shape as every audited package.

### 38. Action verbs in `Client`
The client uses `Create`/`Get`/`Update`/`Delete`/`List`/`Cancel` for monitor and refresh operations. Verbs are consistent within the package. (Listed per rule 17 to note the absence of inconsistency.)

### 39. Acronym casing
Mixed conventions, all generator-emitted: `Id` (PascalCase-capital-then-lower in `objectId`, `refreshId`), `Ms` (capital-then-lower in `startTimeMs`), `Http` (capital-then-lower in `HttpClient`, `HttpRequest`), `URL`-style ALLCAPS only via the imported web standard `URLSearchParams`. No within-package collisions.
- **Category:** 3 (acronym casing).

### 40. Tense / nominalisation drift in enum naming
`AnomalyDetection` (gerund), `DataProfiling` (gerund), `DataClassification` (noun) — at the package boundary the gerund/noun choice tracks the API team's preference. Within `dataquality` the choice is consistent (both gerunds), good.

### 41. `dataquality` lowercase package name vs `data-quality` wire path vs `DataQuality` types
Same shape as the `dataclassification` casing observation (#32 in that package): directory is one collapsed word, types are PascalCase compounded, wire path is kebab. SDK-wide convention question, not local.
- **Category:** 3 (casing inconsistency).

## Domain glossary
- `uc` / Unity Catalog — implicit across the package (the monitored resource is a UC schema or UC table).
- `wkt` — Well-Known Types (import path `@databricks/sdk-core/wkt`, used for `FieldMask<Monitor>` and `FieldMask<Refresh>`).
- `quartz` — Apache Quartz Scheduler (Java library) — the cron expression dialect used server-side; surfaces as `quartzCronExpression`.
- `inference log` — predictions + labels + (optional) probabilities for a deployed ML model, used to compute drift on inputs and accuracy on outputs.
- `time series` — analysis configuration where rows have a timestamp column and are bucketed by `AggregationGranularity`.
- `snapshot` — analysis configuration with no time dimension; the table is treated as a single snapshot.
- `refresh` — a single run of the data-monitoring pipeline; produces metric rows in `profileMetricsTableName` / `driftMetricsTableName`.
- `monitor` — the long-lived configuration entity (one per UC schema or table); contains either an `anomalyDetectionConfig` or a `dataProfilingConfig`.
- `baseline table` — a separate table whose statistics drift is computed against (per `baselineTableName`).
- `profile metrics` / `drift metrics` — two distinct output tables; profile = per-window distribution stats, drift = same stats compared against baseline or the previous window.
- `effective` — server-resolved value of an input field (e.g. `effectiveWarehouseId` is the warehouse chosen when the user left `warehouseId` blank).
- `oss`, `m2m`/`u2m`/`pat`, `iam`, `abac` — not encountered in this package.

## File coverage
- `src/v1/model.ts` (1030 lines): read fully.
- `src/v1/client.ts` (515 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (42 lines): read fully.

## Fixed
- #14 `PercentNullValidityCheck` / `RangeValidityCheck` / `UniquenessValidityCheck` / `ValidityCheckConfiguration` (originally cited at `src/v1/model.ts:440-501,552`): Fixed in regeneration on 2026-05-20 — all validity-check types and the `ValidityCheckConfiguration` container have been removed from the model entirely.
- #17 `AnomalyDetectionConfig.anomalyDetectionWorkflowId` (originally cited at `src/v1/model.ts:111`): Fixed in regeneration on 2026-05-20 — field removed; `AnomalyDetectionConfig` now only carries `excludedTableFullNames`.
