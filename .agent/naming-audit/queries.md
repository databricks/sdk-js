# Naming Audit: queries

**Path:** `packages/queries/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace SQL queries — a stored, named SQL statement bound to a SQL warehouse, with parameterisable values, a "Run as" identity, visualizations attached to it, and a soft-delete (trash) lifecycle.
**Total weird names flagged:** 20 (last rescanned 2026-05-26)

## Summary table

| # | Severity | Location | Name | Category |
|---|----------|----------|------|----------|
| 1 | High | `model.ts` interface | `Query` | Vague/generic — top-level name for what is really a "workspace SQL query" |
| 2 | High | `model.ts` interfaces | `CreateQueryRequestQuery`, `UpdateQueryRequestQuery`, `ListQueryObjectsResponseQuery` | Go/Java-style nested-message names |
| 3 | High | `model.ts` interface | `ListQueryObjectsResponseQuery` | Cryptic/Go-style: leaking proto inner-message + `Objects` filler word |
| 4 | High | package vs siblings | `queries` package vs `queryexecution`, `queryhistory`, `modelservingquery` | Duplicate concept across 4 packages, no shared prefix |
| 5 | High | `model.ts` enum value | `LifecycleState.TRASHED` vs method `trashQuery` | Inconsistent verb — most of the SDK uses `delete`; only the SQL surface uses `trash` |
| 6 | High | `model.ts` enum names | `LifecycleState`, `RunAsMode`, `DatePrecision` | Missing domain prefix (no `Query*`) — collide with identical enums in `alerts` package |
| 7 | High | `model.ts` field | `Query.parameters` of type `QueryParameter[]` | Inconsistent action verb: `QueryParameter` re-uses `Query` prefix while sibling types (`TextValue`, `NumericValue`, `EnumValue`) don't |
| 8 | High | `model.ts` interface | `QueryBackedValue` | Misleading — name says "backed by a query" but it's a dropdown parameter source |
| 9 | High | `model.ts` interface | `EnumValue` | Vague/generic top-level name — generic word `enum` reused as identifier |
| 10 | High | `model.ts` interface | `Empty` | Proto architectural leak — `google.protobuf.Empty` surfaced as a TS export |
| 11 | Medium | `client.ts` method | `trashQuery` | Inconsistent action verb (HTTP `DELETE`, docs say "permanently deleted after 30 days", but method named `trash`) |
| 12 | Medium | `model.ts` interface | `TrashQueryRequest` | Same verb inconsistency at the type layer |
| 13 | Medium | `client.ts` method | `listVisualizationsForQuery` | Overly verbose vs sibling `listQueries`; "ForQuery" is a Go-style nested-resource pattern |
| 14 | Medium | `model.ts` interface | `Visualization` | Vague/generic top-level name (no `Query` prefix) — `QueryVisualization` would mirror `QueryParameter` |
| 15 | Medium | `model.ts` enum value | `LifecycleState.TRASHED` | Verb-tense inconsistency vs imperative method `trashQuery` |
| 16 | Medium | `model.ts` enum | `RunAsMode` | Verb-as-noun; `Mode` is filler since the enum has only two values |
| 17 | Medium | `model.ts` enum values | `LAST_8_HOURS`, `LAST_24_HOURS`, `LAST_14_DAYS`, `LAST_30_DAYS`, etc. | Long enum values — numeric suffix per-bucket forms an open-ended discrete enum |
| 18 | Medium | `model.ts` interface | `MultiValuesOptions` | Singular/plural mismatch — `MultiValueOptions` or `MultiSelectOptions` reads naturally |
| 19 | Medium | `model.ts` field | `DateRangeValue.startDayOfWeek` | Underspecified type (int 0–6? string? Mon-first or Sun-first?) |
| 20 | Low | `model.ts` fields | `pageToken`, `pageSize`, `nextPageToken` | Conventional; flagged for completeness only |

## High severity

### 1. `Query` — vague/generic top-level name

**Location:** `src/v1/model.ts:223-257`

```ts
export interface Query {
  /** UUID identifying the query. */
  id?: string | undefined;
  /** Display name of the query that appears in list views, widget headings, and on the query page. */
  displayName?: string | undefined;
  ...
}
```

`Query` is the single most generic noun in a SQL SDK. Every Databricks consumer eventually has its own `Query` type. The same package also exposes `QueryParameter`, `QueryBackedValue`, and the sibling packages `queryexecution`, `queryhistory`, `modelservingquery` all surface `Query*` concepts. A user importing `Query` from `@databricks/sdk-queries` and another `Query` from `@databricks/sdk-queryhistory` faces an immediate naming collision.

A domain-anchored name like `WorkspaceQuery` or `SavedQuery` (this is, in fact, a *saved/stored* SQL query, not a runtime query execution) would distinguish it from the runtime `Query` concept in `queryexecution`.

### 2. Go/Java-style nested-message types

**Location:** `src/v1/model.ts:57-91`, `163-197`, `324-358`

- `CreateQueryRequestQuery`
- `UpdateQueryRequestQuery`
- `ListQueryObjectsResponseQuery`

These three interfaces share the bulk of `Query`'s fields and originate from protobuf's `MessageA_MessageB` flattening. The naming forces the user to choose which `Query`-like type to construct depending on which call they want to make. This is the exact problem `alerts` v2 solved by collapsing back to `Alert`.

### 3. `ListQueryObjectsResponseQuery` — Go-style + filler word

**Location:** `src/v1/model.ts:163-197`

```ts
export interface ListQueryObjectsResponseQuery { ... }
```

The "Objects" infix between `Query` and `Response` is filler — the RPC is `ListQueries`, the response wraps a list of queries; there is no separate "QueryObject" concept. Combined with the trailing `Query` repeat, this is one of the most verbose generated names in the package (29 chars, four query-related morphemes).

### 4. Duplicate concept across 4 packages — `queries`, `queryexecution`, `queryhistory`, `modelservingquery`

**Location:** package boundaries

The Databricks SDK ships four query-flavoured packages with no shared prefix:

- `queries` — *saved* SQL queries (this package).
- `queryexecution` — running a query against a published dashboard.
- `queryhistory` — past query executions (with metrics, timing).
- `modelservingquery` — querying a served ML model.

There is no obvious entry point for "I want to run a SQL query" — the user has to guess which package owns which verb. A namespace like `sql.queries`, `sql.executions`, `sql.history` (and `ml.servingQueries`) would group them. Inside this package, `Query` returned by `getQuery` is *not* the same `Query`-prefixed type that `queryhistory.ListQueries` returns (which is named `ListQueries` — see below).

### 5. `LifecycleState.TRASHED` vs method `trashQuery` — verb/state inconsistency

**Location:** `src/v1/model.ts:14-17`, `src/v1/client.ts:228-250`

```ts
export enum LifecycleState {
  ACTIVE = 'ACTIVE',
  TRASHED = 'TRASHED',
}

/** Moves a query to the trash. Trashed queries immediately disappear from searches and list views, ... A trashed query is permanently deleted after 30 days. */
async trashQuery(req: TrashQueryRequest, options?: CallOptions): Promise<Empty> {
  ...
}
```

The HTTP verb is `DELETE`, the docstring talks about "permanently deleted after 30 days," but the method is `trashQuery` and the resulting enum value is `TRASHED`. Across the SDK, `trash` is unique to the SQL surface (queries, alerts); every other resource uses `deleteX`. A v2 of `alerts` already broke this consistency (it renamed `TRASHED` → `DELETED` but kept `trashAlert`); `queries` v1 may face the same trap.

### 6. Missing domain prefix on enums

**Location:** `src/v1/model.ts:8-22`

```ts
export enum DatePrecision { ... }
export enum LifecycleState { ... }
export enum RunAsMode { ... }
```

Three top-level enums in a domain-specific package, none prefixed with `Query*`. The same package also indirectly uses an identical `LifecycleState` concept that exists with the same values (`ACTIVE`/`TRASHED`) in `alerts` v1; when a user imports both they collide by name. `QueryLifecycleState`, `QueryRunAsMode`, `QueryDatePrecision` (or simply re-using shared `LifecycleState` from a common package) would address this; the current state is the worst of both worlds.

### 7. `QueryParameter` vs sibling value types — inconsistent prefixing

**Location:** `src/v1/model.ts:268-306`, `308-310`, `219-221`, `140-147`

```ts
export interface QueryParameter { ... }   // prefixed
export interface TextValue { ... }        // unprefixed
export interface NumericValue { ... }     // unprefixed
export interface EnumValue { ... }        // unprefixed
export interface DateValue { ... }        // unprefixed
export interface DateRangeValue { ... }   // unprefixed
export interface QueryBackedValue { ... } // prefixed
```

Some value-type wrappers are prefixed (`Query*`), others are not. The choice appears to be based on whether the type "feels generic" — but `EnumValue`, `DateValue`, `DateRange` are arguably even more generic than `QueryParameter`. The package picks `QueryParameter` and `QueryBackedValue` for prefixing, while leaving `TextValue`, `NumericValue`, `EnumValue`, `DateValue`, `DateRangeValue` unprefixed. Result: importing this package brings ambient types like `EnumValue` and `TextValue` into the user's scope.

### 8. `QueryBackedValue` — misleading

**Location:** `src/v1/model.ts:259-266`

```ts
export interface QueryBackedValue {
  /** List of selected query parameter values. */
  values?: string[] | undefined;
  /** UUID of the query that provides the parameter values. */
  queryId?: string | undefined;
  /** If specified, allows multiple values to be selected for this parameter. */
  multiValuesOptions?: MultiValuesOptions | undefined;
}
```

The name reads as "a value that is backed by a query" — implying the value itself comes from query state. The actual semantics, per JSDoc, is: a dropdown widget whose options are populated by running another saved query. `QuerySourcedDropdownParameter`, `QueryBackedDropdown`, or `DropdownFromQuery` would describe the actual concept. As written, the name is at the same abstraction level as `QueryBackedView` or `QueryBackedTable` — neither of which describes what this is.

### 9. `EnumValue` — vague/generic top-level name

**Location:** `src/v1/model.ts:140-147`

```ts
export interface EnumValue {
  /** List of selected query parameter values. */
  values?: string[] | undefined;
  /** List of valid query parameter values, newline delimited. */
  enumOptions?: string | undefined;
  /** If specified, allows multiple values to be selected for this parameter. */
  multiValuesOptions?: MultiValuesOptions | undefined;
}
```

`EnumValue` exported at the package root. `enum` is a TypeScript keyword and a generic concept; the type is in fact a *dropdown* parameter source (a list of valid options + the selected subset). `DropdownParameter`, `EnumParameter`, or `QueryEnumParameter` would name the actual concept.

### 10. `Empty` — proto architectural leak

**Location:** `src/v1/model.ts:133-138`

```ts
/**
 * Represents an empty message, similar to google.protobuf.Empty, which is not available in the firm
 * right now.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Empty {}
```

**Why:** Proto/RPC architectural leak — `google.protobuf.Empty` is a wire-format construct used by code generators to express "no body." The JSDoc explicitly admits this ("similar to google.protobuf.Empty"). Exporting it as a public TS interface forces every `Promise<Empty>` return type (e.g. `trashQuery`, see #11) to surface the proto abstraction to callers.

**Category:** Proto architectural leak.

**Suggested:** Drop the type entirely; have methods return `Promise<void>`. If a placeholder is needed, do not export it — TS already has `void` and `undefined` as native equivalents.

**Rationale:** `Empty` exists only because protobuf has no native "no return value" concept. TypeScript does. Surfacing the proto workaround as a named export pollutes the package's public API with a wire-format artefact that has no domain meaning. Users see `Promise<Empty>` and reasonably ask "what's in `Empty`?" — the answer is "nothing, it's a proto thing." That answer should never be visible.

## Medium severity

### 11. `trashQuery` — inconsistent action verb (`trash` vs SDK-wide `delete`)

**Location:** `src/v1/client.ts:228-250`

```ts
/** Moves a query to the trash. Trashed queries immediately disappear from searches and list views, and cannot be used for alerts. You can restore a trashed query through the UI. A trashed query is permanently deleted after 30 days. */
async trashQuery(
  req: TrashQueryRequest,
  options?: CallOptions
): Promise<Empty> { ... DELETE ... }
```

The HTTP verb is `DELETE`, the docstring talks about "permanently deleted," but the method is `trashQuery`. Across the SDK this is the only place where soft-delete uses `trash`-prefix outside `alerts`. The standard SDK shape is `deleteX` with a flag for `permanent: true/false` or two endpoints (`deleteX` + `purgeX`).

### 12. `TrashQueryRequest` — same as #11, in the type layer

**Location:** `src/v1/model.ts:312-314`

```ts
export interface TrashQueryRequest {
  id?: string | undefined;
}
```

Same verb inconsistency at the type layer. Carries only `id`.

### 13. `listVisualizationsForQuery` — overly verbose

**Location:** `src/v1/client.ts:174-208`

```ts
async listVisualizationsForQuery(
  req: ListVisualizationsForQueryRequest,
  options?: CallOptions
): Promise<ListVisualizationsForQueryResponse> { ... }
```

`For` infixed between the resource and its parent is a Go-style nested-resource pattern. REST endpoint is `/api/2.0/sql/queries/{id}/visualizations` — TypeScript naming would more naturally be `listVisualizations(req: ListVisualizationsRequest)` where the request shape has `queryId` (or the method lives on a sub-client `client.queries(id).visualizations.list()`). The current name is 28 characters.

### 14. `Visualization` — vague/generic top-level name

**Location:** `src/v1/model.ts:360-377`

```ts
export interface Visualization { ... }
```

`Visualization` is a top-level export in a package about *query* visualizations. The sibling type `QueryParameter` has a domain prefix; `Visualization` does not. `QueryVisualization` would mirror `QueryParameter` and avoid collisions with the visualizations exposed by Lakeview, Dashboards, MLflow, etc.

### 15. `LifecycleState.TRASHED` — verb-tense inconsistency

**Location:** `src/v1/model.ts:14-17`

The enum value is past-participle (`TRASHED`), the method is imperative (`trashQuery`). When the SDK adds future lifecycle values like `ARCHIVED`, the new value will match this pattern, but the lifecycle vocabulary will diverge further from the verb vocabulary (`trash`/`archive`/`restore`).

### 16. `RunAsMode` — verb-as-noun, filler `Mode`

**Location:** `src/v1/model.ts:19-22`

```ts
export enum RunAsMode {
  OWNER = 'OWNER',
  VIEWER = 'VIEWER',
}
```

`RunAs` is an imperative phrase pressed into noun service (see same flag in `alerts` audit). `Mode` is filler — the enum has only two values and they describe *who* the query runs as, not *how*. `RunAsIdentity`, `Authority`, or even `runAs: 'OWNER' | 'VIEWER'` (a string literal union) would be cleaner.

### 17. Open-ended discrete enum — `LAST_8_HOURS`, `LAST_24_HOURS`, `LAST_14_DAYS`, ...

**Location:** `src/v1/model.ts:25-42`

```ts
LAST_HOUR = 'LAST_HOUR',
LAST_8_HOURS = 'LAST_8_HOURS',
LAST_24_HOURS = 'LAST_24_HOURS',
LAST_7_DAYS = 'LAST_7_DAYS',
LAST_14_DAYS = 'LAST_14_DAYS',
LAST_30_DAYS = 'LAST_30_DAYS',
LAST_60_DAYS = 'LAST_60_DAYS',
LAST_90_DAYS = 'LAST_90_DAYS',
LAST_12_MONTHS = 'LAST_12_MONTHS',
```

The user gets 16 hard-coded time windows. If they want "last 45 days," there is no value. A `{ unit: 'DAY' | 'HOUR' | ...; n: number }` shape would express the same thing without the enum-value explosion. (Acknowledged that the underlying API likely accepts only these buckets — but the API design itself is the smell.)

### 18. `MultiValuesOptions` — singular/plural mismatch

**Location:** `src/v1/model.ts:210-217`

```ts
export interface MultiValuesOptions {
  /** Character that prefixes each selected parameter value. */
  prefix?: string | undefined;
  /** Character that separates each selected parameter value. Defaults to a comma. */
  separator?: string | undefined;
  /** Character that suffixes each selected parameter value. */
  suffix?: string | undefined;
}
```

`MultiValuesOptions` (plural-values, singular-options) is grammatically inconsistent. `MultiValueOptions` or `MultiSelectOptions` would be conventional. The type expresses "options for a multi-value selection" — option (singular for each field) of multi-value (one feature).

### 19. `DateRangeValue.startDayOfWeek` — underspecified type

**Location:** `src/v1/model.ts:113`

```ts
startDayOfWeek?: number | undefined;
```

`number` with no JSDoc — is this 0-indexed or 1-indexed? Monday-first (ISO) or Sunday-first (US)? A `DayOfWeek` enum (`MONDAY`, `TUESDAY`, ...) or a typed alias would be self-documenting.

## Low severity

### 20. `pageToken`, `pageSize`, `nextPageToken` — conventional pagination

**Location:** `src/v1/model.ts:153-156`, `158-161`

Standard Google AIP-158 names. Flagged for completeness; no action recommended.

## Cross-package overlap

The four query-flavoured packages share concept space without sharing types:

| Package | Top-level `Query`-prefixed types |
|---------|----------------------------------|
| `queries` (this) | `Query`, `QueryParameter`, `QueryBackedValue`, `CreateQueryRequest`, `UpdateQueryRequest`, `ListQueriesRequest`, `GetQueryRequest`, `TrashQueryRequest`, `ListQueriesResponse`, `ListQueryObjectsResponseQuery`, `ListVisualizationsForQueryRequest`, `ListVisualizationsForQueryResponse` |
| `queryexecution` | `CancelQueryExecutionResponse`, `CancelQueryExecutionResponseStatus`, `ExecuteQueryResponse`, `PollQueryStatusResponse`, `PollQueryStatusResponseData`, `QueryResponseStatus`, `ExecutePublishedDashboardQueryRequest`, `PollPublishedQueryStatusRequest`, `CancelPublishedQueryExecutionRequest` |
| `queryhistory` | `QueryStatementType`, `QueryStatus`, `ListQueries`, `ListQueries_Response`, `QueryFilter`, `QueryInfo`, `QueryMetrics`, `QueryTag`, `ExternalQuerySource`, `ExternalQuerySource_JobInfo` |
| `modelservingquery` | `QueryEndpointInput`, `QueryEndpointInput_ExtraParamsEntry`, `QueryEndpointInput_UsageContextEntry`, `QueryEndpointResponse`, `QueryEndpointResponseObject` |

Observations:

- **`Query` is overloaded.** This package's `Query` is a saved SQL artefact. `queryhistory.QueryInfo` is a runtime execution record. `queryexecution`'s nameless concept (no `Query` type) is a dashboard parameterised query run. The four packages do not cross-reference each other's types.
- **`ListQueries` collides cross-package.** `queries.ListQueriesRequest` and `queryhistory.ListQueries` are entirely different shapes returning entirely different data, both with the same human-readable name.
- **No shared enums.** `queries.LifecycleState`, `queryhistory.QueryStatus`, `queryexecution.PendingStatus` / `SuccessStatus` are unrelated. A consumer building a query dashboard would have to manually correlate them.

## Observations

1. **`Query` overload.** `Query` is one of the broadest words in any SQL SDK. This package's `Query` is a *saved* configuration; `queryexecution`'s implicit "query" is a *running statement*; `queryhistory`'s `QueryInfo` is a *historical record*. None reference each other. A future cleanup might rename this package's `Query` → `SavedQuery` or `WorkspaceQuery`.

2. **Soft-delete verb is `trash`, not `delete`.** `trashQuery` and `LifecycleState.TRASHED` are the only places in the SDK using "trash." This will diverge from the rest of the resource lifecycle vocabulary as the SDK grows.

3. **Top-level type pollution.** `TextValue`, `NumericValue`, `EnumValue`, `DateValue`, `DateRange`, `DateRangeValue`, `MultiValuesOptions`, `Visualization` are all unprefixed and exported. A user importing `import { TextValue } from '@databricks/sdk-queries'` gets a generically-named type that competes with their own code.

4. **`utils.ts` is well-named and unchanged.** Exports (`executeCall`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`, `marshalRequest`, `flattenQueryParams`) are domain-neutral and not flagged. `flattenQueryParams` is exported but unused in `client.ts` (orphaned export) — not a naming issue, but worth noting.

## Domain glossary

| Term | Meaning in this package |
|------|------------------------|
| Query | A stored, named SQL statement saved in the workspace (not a running execution). |
| Query text | The raw SQL of the saved query. |
| Parameter | A placeholder in the SQL text (between `{{ }}` markers) that gets substituted at run time; has a typed value (text / numeric / enum / date / date-range / query-backed). |
| Query-backed value | A dropdown parameter whose options come from running another saved query. |
| Visualization | A view definition (counter, table, funnel, etc.) attached to a query. |
| Run-as | The identity (`OWNER` of the query or current `VIEWER`) under which the SQL executes. |
| Lifecycle state | `ACTIVE` (visible) or `TRASHED` (soft-deleted; permanently deleted after 30 days). |
| Auto-limit | A 1000-row cap automatically applied to query results when `applyAutoLimit=true`. |
| Parent path | The workspace folder path containing the saved query. |
| Catalog / schema | Unity-Catalog three-part-name prefix (`catalog.schema.table`) used as the default for unqualified table references in the SQL. |

## File coverage

| File | Lines | Read in full |
|------|-------|--------------|
| `src/v1/model.ts` | 996 | yes |
| `src/v1/client.ts` | 278 | yes |
| `src/v1/utils.ts` | 151 | yes |
| `src/v1/index.ts` | 38 | yes |
