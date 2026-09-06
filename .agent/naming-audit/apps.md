# Naming Audit: `@databricks/sdk-apps` (v1)

**Package:** `apps` (`packages/apps/src/v1/`)
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `index.ts`, `transport.ts`

## Summary

| Severity | Count |
| -------- | ----- |
| Medium   |     6 |
| Low      |     2 |
| Observation | 2 |
| **Total** | **10** |

---

## Medium-severity findings

### M1. `EnvVar` — too short
- **File:** `model.ts:1229`, also `index.ts:85`
- **Category:** Cryptic abbreviations (5)
- **Issue:** `EnvVar` reads as Go-style. Full TS conventions prefer
  `EnvironmentVariable` or, since it carries both name and source, more
  precisely `EnvironmentVariableSetting`. The Go SDK uses `EnvVar` because
  Go conventionally abbreviates more aggressively; the TS port doesn't
  inherit that.
- **Suggestion:** Rename to `EnvironmentVariable`. Note: this is contested by
  the `feedback_no_extra_abstractions.md` memory entry — if the rule is
  strict 1:1 with Go names, leave as-is.

### M2. `AsyncUpdateAppRequest.appName` carrying a redundant nesting
- **File:** `model.ts:1150-1154`
- **Category:** Redundant suffixes (8)
- **Issue:** `AsyncUpdateAppRequest` already contains an `app: App` field, and
  separately an `appName: string` field that's just `req.app.name`. This is
  visible at `client.ts:127`: `${this.host}/api/2.0/apps/${req.appName ?? ''}`
  with no consultation of `req.app?.name`.
- **Suggestion:** Drop `appName` from `AsyncUpdateAppRequest` and read
  `req.app?.name` (as `updateApp` already does at `client.ts:927`). This is a
  semantic change; flag for discussion. Alternative: keep both and document
  which wins on conflict.

### M3. `UnityCatalog` interface — generic name, no role suffix
- **File:** `model.ts:1504-1511`, also `index.ts:110`
- **Category:** Vague/generic (1)
- **Issue:** `UnityCatalog` is exported as a public type. The interface has
  three table-name fields (`logsTable`, `metricsTable`, `tracesTable`) and is
  used only as a telemetry-export destination. Exporting a type called
  `UnityCatalog` at the package boundary suggests "the Unity Catalog itself",
  which it isn't.
- **Suggestion:** Rename to `UnityCatalogTelemetryDestination` or
  `UnityCatalogTables`. Inline if not reused.

### M4. `Operation.result` carries `error` and `response` arms
- **File:** `model.ts:1413-1424`
- **Category:** Vague/generic (1)
- **Issue:** The `response` arm holds `Record<string, unknown>` — a totally
  untyped payload. The consumer at `client.ts:1128` immediately re-parses it
  through `unmarshalSpaceSchema`. The name `response` and the unknown type
  conceal what's actually inside.
- **Suggestion:** Use generics: `Operation<TResponse>` with `result: ... |
  {$case: 'response'; response: TResponse}`. Or split into
  `SpaceCreateOperation`, `SpaceDeleteOperation`, etc. Today the field name
  promises nothing.

### M5. Method name verb inconsistency: `asyncUpdateApp` is verb-prefixed but `updateSpace` returns an `Operation` too
- **File:** `client.ts:122, 1012`
- **Category:** Inconsistent action verbs (17), Verb-tense inconsistency (13)
- **Issue:** Both `asyncUpdateApp` and `updateSpace` are asynchronous,
  long-running operations that return an `AppUpdate`/`Operation` and have a
  corresponding `*Waiter`/`*Operation` companion. But `asyncUpdateApp` is
  prefixed with `async`, while `updateSpace` is not. Either both should be
  prefixed (`asyncUpdateSpace`) or neither.
- **Suggestion:** Drop the `async` prefix from `asyncUpdateApp` to match
  `updateSpace`, or add `asyncUpdateSpace` for symmetry.

### M6. `createSpaceOperation`, `deleteSpaceOperation`, `updateSpaceOperation` — `*Operation` suffix is confusing alongside the `Operation` type
- **File:** `client.ts:321, 438, 1053`
- **Category:** Type-suffix tautology (20)
- **Issue:** Methods named `createSpaceOperation()` return a
  `CreateSpaceOperation` wrapper (not an `Operation` directly). A reader
  scanning autocomplete sees both `createSpace()` and
  `createSpaceOperation()` and has to read the doc to disambiguate.
- **Suggestion:** Rename the wrapper-returning method to
  `createSpaceAndWait()` or `createSpaceLongRunning()`. The `*Operation` class
  could be `*LongRunning` (mirroring the `Operation` type's role).

---

## Low-severity findings

### L1. `appFieldMask(...paths)` and `spaceFieldMask(...paths)` — global helpers
- **File:** `model.ts:3041, 3119`
- **Category:** Vague/generic (1) — qualified by entity, but
- **Issue:** Inconsistent that only `App` and `Space` get an exported helper —
  no `appDeploymentFieldMask`, despite the `AppDeployment` having an internal
  schema. Suggests the API is incomplete.
- **Suggestion:** Either expose helpers for every entity with a field-mask
  schema, or none.

### L2. `getSpaceOperation` (method) vs `GetOperationRequest`
- **File:** `client.ts:588-614`
- **Category:** Type-suffix tautology (20)
- **Issue:** `getSpaceOperation(req: GetOperationRequest)` — the method tells
  you it's a space operation, but the request type doesn't. Mismatch.
- **Suggestion:** Either `getOperation` (matching `GetOperationRequest`) or
  `GetSpaceOperationRequest` (matching the method name). The current pairing
  is asymmetric.

---

## Observations (not necessarily problems)

### O1. `Operation` lifecycle wrappers come in two flavours: `*Operation` and `*Waiter`
- `CreateSpaceOperation`, `DeleteSpaceOperation`, `UpdateSpaceOperation` —
  driven by `google.longrunning.Operation` (poll a separate endpoint).
- `AsyncUpdateAppWaiter`, `CreateAppDeploymentWaiter`, `CreateAppWaiter`,
  `StartAppWaiter`, `StopAppWaiter` — driven by polling the entity itself.

The two flavours are confusing as named. Consider renaming
`*Operation` -> `*LongRunning` so the difference (LRO vs status-poll) is
visible.

### O2. `CustomTemplate` doesn't carry "App" in its name, but it's an app template
The doc and methods make this clear (`createCustomTemplate` ->
`/api/2.0/apps-settings/templates`), but the type name is ambiguous.
Consider `AppTemplate` or `CustomAppTemplate`.
