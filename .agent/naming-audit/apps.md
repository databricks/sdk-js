# Naming Audit: `@databricks/sdk-apps` (v1)

**Package:** `apps` (`packages/apps/src/v1/`)
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `index.ts`, `transport.ts`

## Summary

| Severity | Count |
| -------- | ----- |
| Medium   |     6 |
| Low      |     2 |
| Observation | 5 |
| **Total** | **13** |

---

## Medium-severity findings

### M1. `EnvVar` — too short
- **File:** `model.ts:1116`, also `index.ts:85`
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
- **File:** `model.ts:1037-1041`
- **Category:** Redundant suffixes (8)
- **Issue:** `AsyncUpdateAppRequest` already contains an `app: App` field, and
  separately an `appName: string` field that's just `req.app.name`. This is
  visible at `client.ts:127`: `${this.host}/api/2.0/apps/${req.appName ?? ''}`
  with no consultation of `req.app?.name`.
- **Suggestion:** Drop `appName` from `AsyncUpdateAppRequest` and read
  `req.app?.name` (as `updateApp` already does at `client.ts:902`). This is a
  semantic change; flag for discussion. Alternative: keep both and document
  which wins on conflict.

### M3. `UnityCatalog` interface — generic name, no role suffix
- **File:** `model.ts:1391-1398`, also `index.ts:110`
- **Category:** Vague/generic (1)
- **Issue:** `UnityCatalog` is exported as a public type. The interface has
  three table-name fields (`logsTable`, `metricsTable`, `tracesTable`) and is
  used only as a telemetry-export destination. Exporting a type called
  `UnityCatalog` at the package boundary suggests "the Unity Catalog itself",
  which it isn't.
- **Suggestion:** Rename to `UnityCatalogTelemetryDestination` or
  `UnityCatalogTables`. Inline if not reused.

### M4. `Operation.result` carries `error` and `response` arms
- **File:** `model.ts:1300-1311`
- **Category:** Vague/generic (1)
- **Issue:** The `response` arm holds `Record<string, unknown>` — a totally
  untyped payload. The consumer at `client.ts:1095` immediately re-parses it
  through `unmarshalSpaceSchema`. The name `response` and the unknown type
  conceal what's actually inside.
- **Suggestion:** Use generics: `Operation<TResponse>` with `result: ... |
  {$case: 'response'; response: TResponse}`. Or split into
  `SpaceCreateOperation`, `SpaceDeleteOperation`, etc. Today the field name
  promises nothing.

### M5. Method name verb inconsistency: `asyncUpdateApp` is verb-prefixed but `updateSpace` returns an `Operation` too
- **File:** `client.ts:123, 985`
- **Category:** Inconsistent action verbs (17), Verb-tense inconsistency (13)
- **Issue:** Both `asyncUpdateApp` and `updateSpace` are asynchronous,
  long-running operations that return an `AppUpdate`/`Operation` and have a
  corresponding `*Waiter`/`*Operation` companion. But `asyncUpdateApp` is
  prefixed with `async`, while `updateSpace` is not. Either both should be
  prefixed (`asyncUpdateSpace`) or neither.
- **Suggestion:** Drop the `async` prefix from `asyncUpdateApp` to match
  `updateSpace`, or add `asyncUpdateSpace` for symmetry.

### M6. `createSpaceOperation`, `deleteSpaceOperation`, `updateSpaceOperation` — `*Operation` suffix is confusing alongside the `Operation` type
- **File:** `client.ts:317, 428, 1025`
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
- **File:** `model.ts:2964, 3041`
- **Category:** Vague/generic (1) — qualified by entity, but
- **Issue:** Inconsistent that only `App` and `Space` get an exported helper —
  no `appDeploymentFieldMask`, despite the `AppDeployment` having an internal
  schema. Suggests the API is incomplete.
- **Suggestion:** Either expose helpers for every entity with a field-mask
  schema, or none.

### L2. `getSpaceOperation` (method) vs `GetOperationRequest`
- **File:** `client.ts:571-596`
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

### O2. Field-mask helpers exist for `App` and `Space` only
`appFieldMask()` and `spaceFieldMask()` are exported; equivalents for
`AppDeployment` etc. are not. Probably intentional (only `App` and `Space`
have an update endpoint that takes a mask), but worth confirming.

### O3. `CustomTemplate` doesn't carry "App" in its name, but it's an app template
The doc and methods make this clear (`createCustomTemplate` ->
`/api/2.0/apps-settings/templates`), but the type name is ambiguous.
Consider `AppTemplate` or `CustomAppTemplate`.

### O4. `ListSpacesRequest` doesn't take a `space` filter the way `ListAppsRequest` takes a `space` filter
Asymmetry but probably intentional.

### O5. `index.ts` exports
- 27 enums
- 69 type aliases
- 9 named exports from `./client` (1 class + 8 wrapper classes)

That's 105 top-level exports, plus the two field-mask helper functions
(`appFieldMask`, `spaceFieldMask`). Worth checking whether the wrapper classes
(`*Operation`, `*Waiter`) need to be public or if they're implementation
detail.
