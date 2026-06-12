# Naming Audit: queries

**Path:** `packages/queries/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace SQL queries — a stored, named SQL statement bound to a SQL warehouse, with parameterisable values, a "Run as" identity, visualizations attached to it, and a soft-delete (trash) lifecycle.
**Total weird names flagged:** 11

## Summary table

| # | Severity | Location | Name | Category |
|---|----------|----------|------|----------|
| 1 | High | `model.ts` interface | `Query` | Vague/generic — top-level name for what is really a "workspace SQL query" |
| 2 | High | `model.ts` interface | `ListQueryObjectsResponseQuery` | Cryptic/Go-style: leaking proto inner-message + `Objects` filler word |
| 3 | High | `client.ts` method | `trashQuery` | Inconsistent verb — most of the SDK uses `delete`; only the SQL surface uses `trash` |
| 4 | High | `model.ts` interface | `QueryBackedValue` | Misleading — name says "backed by a query" but it's a dropdown parameter source |
| 5 | High | `model.ts` interface | `EnumValue` | Vague/generic top-level name — generic word `enum` reused as identifier |
| 6 | Medium | `client.ts` method | `trashQuery` | Inconsistent action verb (HTTP `DELETE`, docs say "permanently deleted after 30 days", but method named `trash`) |
| 7 | Medium | `model.ts` interface | `TrashQueryRequest` | Same verb inconsistency at the type layer |
| 8 | Medium | `client.ts` method | `listVisualizationsForQuery` | Overly verbose vs sibling `listQueries`; "ForQuery" is a Go-style nested-resource pattern |
| 9 | Medium | `model.ts` interface | `Visualization` | Vague/generic top-level name (no `Query` prefix) — `QueryVisualization` would mirror `QueryParameter` |
| 10 | Medium | `model.ts` const | `RunAsMode` | Verb-as-noun; `Mode` is filler since the type has only two values |
| 11 | Medium | `model.ts` interface | `MultiValuesOptions` | Singular/plural mismatch — `MultiValueOptions` or `MultiSelectOptions` reads naturally |

## High severity

### 1. `Query` — vague/generic top-level name

**Location:** `src/v1/model.ts:243-277`

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

### 2. `ListQueryObjectsResponseQuery` — Go-style + filler word

**Location:** `src/v1/model.ts:183-217`

```ts
export interface ListQueryObjectsResponseQuery { ... }
```

The "Objects" infix between `Query` and `Response` is filler — the RPC is `ListQueries`, the response wraps a list of queries; there is no separate "QueryObject" concept. Combined with the trailing `Query` repeat, this is one of the most verbose generated names in the package (29 chars, four query-related morphemes).

### 3. `trashQuery` — inconsistent action verb (`trash` vs SDK-wide `delete`)

**Location:** `src/v1/client.ts:245-271`

```ts
/** Moves a query to the trash. Trashed queries immediately disappear from searches and list views, ... A trashed query is permanently deleted after 30 days. */
async trashQuery(req: TrashQueryRequest, options?: CallOptions): Promise<Empty> {
  ...
}
```

The HTTP verb is `DELETE`, the docstring talks about "permanently deleted after 30 days," but the method is `trashQuery`. Across the SDK, `trash` is unique to the SQL surface (queries, alerts); every other resource uses `deleteX`. A v2 of `alerts` already broke this verb consistency (it kept `trashAlert` even as the rest of the SDK standardised on `delete`); `queries` v1 may face the same trap. The standard SDK shape is `deleteX` with a flag for `permanent: true/false` or two endpoints (`deleteX` + `purgeX`).

### 4. `QueryBackedValue` — misleading

**Location:** `src/v1/model.ts:279-286`

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

### 5. `EnumValue` — vague/generic top-level name

**Location:** `src/v1/model.ts:160-167`

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

## Medium severity

### 6. `trashQuery` — inconsistent action verb (`trash` vs SDK-wide `delete`)

**Location:** `src/v1/client.ts:245-271`

```ts
/** Moves a query to the trash. Trashed queries immediately disappear from searches and list views, and cannot be used for alerts. You can restore a trashed query through the UI. A trashed query is permanently deleted after 30 days. */
async trashQuery(
  req: TrashQueryRequest,
  options?: CallOptions
): Promise<Empty> { ... DELETE ... }
```

The HTTP verb is `DELETE`, the docstring talks about "permanently deleted," but the method is `trashQuery`. Across the SDK this is the only place where soft-delete uses `trash`-prefix outside `alerts`. The standard SDK shape is `deleteX` with a flag for `permanent: true/false` or two endpoints (`deleteX` + `purgeX`).

### 7. `TrashQueryRequest` — same as #6, in the type layer

**Location:** `src/v1/model.ts:332-334`

```ts
export interface TrashQueryRequest {
  id?: string | undefined;
}
```

Same verb inconsistency at the type layer. Carries only `id`.

### 8. `listVisualizationsForQuery` — overly verbose

**Location:** `src/v1/client.ts:187-225`

```ts
async listVisualizationsForQuery(
  req: ListVisualizationsForQueryRequest,
  options?: CallOptions
): Promise<ListVisualizationsForQueryResponse> { ... }
```

`For` infixed between the resource and its parent is a Go-style nested-resource pattern. REST endpoint is `/api/2.0/sql/queries/{id}/visualizations` — TypeScript naming would more naturally be `listVisualizations(req: ListVisualizationsRequest)` where the request shape has `queryId` (or the method lives on a sub-client `client.queries(id).visualizations.list()`). The current name is 28 characters.

### 9. `Visualization` — vague/generic top-level name

**Location:** `src/v1/model.ts:380-397`

```ts
export interface Visualization { ... }
```

`Visualization` is a top-level export in a package about *query* visualizations. The sibling type `QueryParameter` has a domain prefix; `Visualization` does not. `QueryVisualization` would mirror `QueryParameter` and avoid collisions with the visualizations exposed by Lakeview, Dashboards, MLflow, etc.

### 10. `RunAsMode` — verb-as-noun, filler `Mode`

**Location:** `src/v1/model.ts:28-34`

```ts
export const RunAsMode = {
  OWNER: 'OWNER',
  VIEWER: 'VIEWER',
} as const;
export type RunAsMode =
  | (typeof RunAsMode)[keyof typeof RunAsMode]
  | (string & {});
```

`RunAs` is an imperative phrase pressed into noun service (see same flag in `alerts` audit). `Mode` is filler — the type has only two values and they describe *who* the query runs as, not *how*. `RunAsIdentity` or `Authority` would be cleaner.

### 11. `MultiValuesOptions` — singular/plural mismatch

**Location:** `src/v1/model.ts:230-237`

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
