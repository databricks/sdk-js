# Naming Audit: queries

**Path:** `packages/queries/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace SQL queries — a stored, named SQL statement bound to a SQL warehouse, with parameterisable values, a "Run as" identity, visualizations attached to it, and a soft-delete (trash) lifecycle.
**Total weird names flagged:** 39

## Summary table

| # | Severity | Location | Name | Category |
|---|----------|----------|------|----------|
| 1 | High | `model.ts` interface | `Query` | Vague/generic — top-level name for what is really a "workspace SQL query" |
| 2 | High | `model.ts` interfaces | `CreateQueryRequestQuery`, `UpdateQueryRequestQuery`, `ListQueryObjectsResponseQuery` | Go/Java-style nested-message names |
| 3 | High | `model.ts` interface | `ListQueryObjectsResponseQuery` | Cryptic/Go-style: leaking proto inner-message + `Objects` filler word |
| 4 | High | package vs siblings | `queries` package vs `queryexecution`, `queryhistory`, `modelservingquery` | Duplicate concept across 4 packages, no shared prefix |
| 5 | High | `model.ts` enum value | `LifecycleState.TRASHED` vs method `trashQuery` | Inconsistent verb — most of the SDK uses `delete`; only the SQL surface uses `trash` |
| 6 | High | `model.ts` enum names | `LifecycleState`, `RunAsMode`, `DatePrecision` | Missing domain prefix (no `Query*`) — collide with identical enums in `alerts` package |
| 7 | High | `model.ts` enum names | `DateRangeValue_DynamicDateRange`, `DateValue_DynamicDate` | Proto-style `_` underscores in TypeScript identifiers |
| 8 | High | `model.ts` field | `Query.queryText` | Type-suffix tautology (`Query.queryText`) |
| 9 | High | `model.ts` field | `Query.parameters` of type `QueryParameter[]` | Inconsistent action verb: `QueryParameter` re-uses `Query` prefix while sibling types (`TextValue`, `NumericValue`, `EnumValue`) don't |
| 10 | High | `model.ts` interface | `QueryBackedValue` | Misleading — name says "backed by a query" but it's a dropdown parameter source |
| 11 | High | `model.ts` field | `QueryParameter.parameterValue` (oneof key) | Type-suffix tautology |
| 12 | High | `model.ts` interface | `EnumValue` | Vague/generic top-level name — generic word `enum` reused as identifier |
| 13 | High | `model.ts` field | `Query.schema` | Reserved-word collision (`schema` is a top-level keyword in JSON Schema/Zod terminology used throughout this file) |
| 14 | High | `model.ts` field | `QueryParameter.title` vs `.name` | Misleading: docs call `name` the parameter marker and `title` the user-facing label — pair should be `(marker, label)` |
| 15 | High | `model.ts` field | `Query.queryText` JSDoc says "Text of the query to be run" on a type already called `Query` | Type-suffix tautology + redundant doc |
| 16 | Medium | `client.ts` method | `trashQuery` | Inconsistent action verb (HTTP `DELETE`, docs say "permanently deleted after 30 days", but method named `trash`) |
| 17 | Medium | `model.ts` interface | `TrashQueryRequest` | Same verb inconsistency at the type layer |
| 18 | Medium | `client.ts` method | `listQueriesIter`, `listVisualizationsForQueryIter` | Cryptic abbreviation (`Iter` from Go/Rust) |
| 19 | Medium | `client.ts` method | `listVisualizationsForQuery` | Overly verbose vs sibling `listQueries`; "ForQuery" is a Go-style nested-resource pattern |
| 20 | Medium | `model.ts` interface | `Visualization` | Vague/generic top-level name (no `Query` prefix) — `QueryVisualization` would mirror `QueryParameter` |
| 21 | Medium | `model.ts` field | `Query.warehouseId` | Underspecified ID — `sqlWarehouseId` would match the JSDoc ("SQL warehouse") |
| 22 | Medium | `model.ts` field | `Query.ownerUserName`, `lastModifierUserName` | Inconsistent action verb — `owner` is a noun, `lastModifier` is an agent noun; mismatched grammar |
| 23 | Medium | `model.ts` field | `Query.lastModifierUserName` | Overly verbose — `lastModifiedBy` would parse more naturally |
| 24 | Medium | `model.ts` enum value | `LifecycleState.TRASHED` | Verb-tense inconsistency vs imperative method `trashQuery` |
| 25 | Medium | `model.ts` enum | `RunAsMode` | Verb-as-noun; `Mode` is filler since the enum has only two values |
| 26 | Medium | `model.ts` enum values | `DatePrecision.DAY_PRECISION`, `MINUTE_PRECISION`, `SECOND_PRECISION` | Redundant enum prefix (enum already named `DatePrecision`) |
| 27 | Medium | `model.ts` enum | `DateRangeValue_DynamicDateRange` | Long enum values + Go/Java-style `_` separator |
| 28 | Medium | `model.ts` enum values | `LAST_8_HOURS`, `LAST_24_HOURS`, `LAST_14_DAYS`, `LAST_30_DAYS`, etc. | Long enum values — numeric suffix per-bucket forms an open-ended discrete enum |
| 29 | Medium | `model.ts` field | `Query.applyAutoLimit` | Misleading — the JSDoc explains it's a 1000-row cap, but `applyAutoLimit` reads as a verb predicate |
| 30 | Medium | `model.ts` field | `Query.runAsMode` of type `RunAsMode` | Type-suffix tautology |
| 31 | Medium | `model.ts` field | `Query.parentPath` | Underspecified ID (path of what?) — JSDoc clarifies it is workspace-folder path |
| 32 | Medium | `model.ts` interface | `MultiValuesOptions` | Singular/plural mismatch — `MultiValueOptions` or `MultiSelectOptions` reads naturally |
| 33 | Medium | `model.ts` field | `MultiValuesOptions.prefix`, `.separator`, `.suffix` | Generic field names losing meaning outside the `MultiValuesOptions` context |
| 34 | Medium | `model.ts` field | `Visualization.type` | Reserved-word collision (`type` is a TS keyword; field is typed `string`) |
| 35 | Medium | `model.ts` field | `Visualization.serializedQueryPlan`, `.serializedOptions` | Misleading — the JSDoc admits "is unsupported" and "do not modify directly"; the names suggest internal-only fields the user must still construct |
| 36 | Medium | `model.ts` field | `DateRangeValue.startDayOfWeek` | Underspecified type (int 0–6? string? Mon-first or Sun-first?) |
| 37 | Low | `model.ts` field | `Query.id`, `Visualization.id`, `QueryBackedValue.queryId` | Underspecified IDs at field level — `queryId`/`visualizationId` would be self-documenting |
| 38 | Low | `model.ts` fields | `pageToken`, `pageSize`, `nextPageToken` | Conventional; flagged for completeness only |
| 39 | Low | `model.ts` enum value | `DateValue_DynamicDate.NOW` and `YESTERDAY` | Singular/plural mismatch with sibling `DateRangeValue_DynamicDateRange.YESTERDAY` (same value lives in both enums) |
| 40 | Low | `model.ts` JSDoc | snake_case identifiers in JSDoc (e.g. "`dynamic_date_value` or `date_value`") | Wire-format leakage into TS docstrings |

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

**Location:** `src/v1/model.ts:14-17`, `src/v1/client.ts:227-249`

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

### 7. Proto-style underscores in TS identifiers — `DateRangeValue_DynamicDateRange`, `DateValue_DynamicDate`

**Location:** `src/v1/model.ts:24-49`

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum DateRangeValue_DynamicDateRange { ... }

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum DateValue_DynamicDate { ... }
```

TS exports two enums whose names contain underscores. The eslint suppression comment acknowledges this is non-idiomatic. The names are direct ports of protobuf's nested-message naming (parent message `DateRangeValue`, nested enum `DynamicDateRange`). In hand-written TS this would be `DateRangeValueDynamicDateRange` or, better, simply `DynamicDateRange` (since `DateRangeValue` is the only consumer). The underscores will also confuse downstream tooling (autocomplete will treat them as snake_case constants).

### 8. `Query.queryText` — type-suffix tautology

**Location:** `src/v1/model.ts:234-235`, `model.ts:175-176`, `model.ts:235`

```ts
export interface Query {
  ...
  /** Text of the query to be run. */
  queryText?: string | undefined;
  ...
}
```

A field on `Query` named `queryText` — the access pattern is `q.queryText` where the `q` already implies "query." Inside an `Alert`, `queryText` is meaningful (it disambiguates from `alertText`). Inside `Query`, the `query` prefix is redundant. `text`, `sql`, or `statement` would suffice.

### 9. `QueryParameter` vs sibling value types — inconsistent prefixing

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

### 10. `QueryBackedValue` — misleading

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

### 11. `QueryParameter.parameterValue` (oneof key) — type-suffix tautology

**Location:** `src/v1/model.ts:268-306`

```ts
export interface QueryParameter {
  ...
  /** Only one of the following fields may be set, depending on the type of parameter. */
  parameterValue?:
    | { $case: 'textValue'; textValue: TextValue }
    | { $case: 'numericValue'; numericValue: NumericValue }
    | { $case: 'enumValue'; enumValue: EnumValue }
    | { $case: 'dateValue'; dateValue: DateValue }
    | { $case: 'dateRangeValue'; dateRangeValue: DateRangeValue }
    | { $case: 'queryBackedValue'; queryBackedValue: QueryBackedValue }
    | undefined;
}
```

`QueryParameter.parameterValue` repeats "parameter" — access pattern `p.parameterValue` where `p` is already `QueryParameter`. The plain `value` would suffice (mirroring `AlertOperand.operand` from the alerts audit — same anti-pattern, opposite name).

### 12. `EnumValue` — vague/generic top-level name

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

### 13. `Query.schema` — reserved-word/local-keyword collision

**Location:** `src/v1/model.ts:255-256`

```ts
/** Name of the schema where this query will be executed. */
schema?: string | undefined;
```

`schema` is a Unity-Catalog *schema* name. But the same file uses the word `schema` ~30 times to mean `z.ZodType` (`marshalQuerySchema`, `unmarshalQuerySchema`, `updateQueryRequestQueryFieldMaskSchema`). The collision is internal-only, but for a reader the noun `schema` ambiguously means UC-schema OR Zod-schema depending on context. `databaseSchema` or `unityCatalogSchema` would disambiguate. (Same package has `catalog` as a sibling field — together they would be `query.unityCatalogCatalog` which is itself ridiculous; the right fix is to keep `catalog` and `schema` but rename the Zod schemas.)

### 14. `QueryParameter.title` vs `.name` — misleading pair

**Location:** `src/v1/model.ts:268-272`

```ts
export interface QueryParameter {
  /** Text displayed in the user-facing parameter widget in the UI. */
  title?: string | undefined;
  /** Literal parameter marker that appears between double curly braces in the query text. */
  name?: string | undefined;
  ...
}
```

Reading the field names alone, `name` is the identifier and `title` is a richer/longer display string. The JSDoc inverts this: `name` is the literal `{{marker}}` text that appears in the SQL, and `title` is the human-readable widget label. The conventional pairing in this codebase (and most others) is `(name, displayName)`. Here it is `(name, title)` *and* `name` plays the role most SDK shapes give to `key`/`marker`/`identifier` and `title` plays the role of `displayName`. A reader has to consult JSDoc to tell which is which.

### 15. `Query.queryText` JSDoc — "Text of the query to be run" on a type already called `Query`

**Location:** `src/v1/model.ts:68-69`, `174-175`, `234-235`, `335-336`

```ts
export interface Query {
  ...
  /** Text of the query to be run. */
  queryText?: string | undefined;
  ...
}
```

Both the field name and the JSDoc embed the word "query" on a type called `Query`. The field exists on four near-identical interfaces (see #2), so the redundancy multiplies. The same field is the *only* part of `Query` that is actually a SQL statement — pulling it up as `Query.text` or `Query.sql` would simplify both name and doc.

## Medium severity

### 16. `trashQuery` — inconsistent action verb (`trash` vs SDK-wide `delete`)

**Location:** `src/v1/client.ts:227-250`

```ts
/** Moves a query to the trash. Trashed queries immediately disappear from searches and list views, and cannot be used for alerts. You can restore a trashed query through the UI. A trashed query is permanently deleted after 30 days. */
async trashQuery(
  req: TrashQueryRequest,
  options?: CallOptions
): Promise<Empty> { ... DELETE ... }
```

The HTTP verb is `DELETE`, the docstring talks about "permanently deleted," but the method is `trashQuery`. Across the SDK this is the only place where soft-delete uses `trash`-prefix outside `alerts`. The standard SDK shape is `deleteX` with a flag for `permanent: true/false` or two endpoints (`deleteX` + `purgeX`).

### 17. `TrashQueryRequest` — same as #16, in the type layer

**Location:** `src/v1/model.ts:312-314`

```ts
export interface TrashQueryRequest {
  id?: string | undefined;
}
```

Same verb inconsistency at the type layer. Carries only `id`.

### 18. `listQueriesIter`, `listVisualizationsForQueryIter` — cryptic abbreviation

**Location:** `src/v1/client.ts:156-171`, `210-225`

```ts
async *listQueriesIter(
  req: ListQueriesRequest,
  options?: CallOptions
): AsyncGenerator<ListQueryObjectsResponseQuery> { ... }

async *listVisualizationsForQueryIter(
  req: ListVisualizationsForQueryRequest,
  options?: CallOptions
): AsyncGenerator<Visualization> { ... }
```

`Iter` reads as a Go/Rust port (Go SDK uses `*Iterator`, Rust uses `iter()`). Idiomatic TS would name this `listAllQueries`, `iterateQueries`, or simply make `listQueries` return an async iterable.

### 19. `listVisualizationsForQuery` — overly verbose

**Location:** `src/v1/client.ts:173-208`

```ts
async listVisualizationsForQuery(
  req: ListVisualizationsForQueryRequest,
  options?: CallOptions
): Promise<ListVisualizationsForQueryResponse> { ... }
```

`For` infixed between the resource and its parent is a Go-style nested-resource pattern. REST endpoint is `/api/2.0/sql/queries/{id}/visualizations` — TypeScript naming would more naturally be `listVisualizations(req: ListVisualizationsRequest)` where the request shape has `queryId` (or the method lives on a sub-client `client.queries(id).visualizations.list()`). The current name is 28 characters.

### 20. `Visualization` — vague/generic top-level name

**Location:** `src/v1/model.ts:360-377`

```ts
export interface Visualization { ... }
```

`Visualization` is a top-level export in a package about *query* visualizations. The sibling type `QueryParameter` has a domain prefix; `Visualization` does not. `QueryVisualization` would mirror `QueryParameter` and avoid collisions with the visualizations exposed by Lakeview, Dashboards, MLflow, etc.

### 21. `Query.warehouseId` — underspecified ID

**Location:** `src/v1/model.ts:66-67`, `172-173`, `232-233`, `333-334`

```ts
/** ID of the SQL warehouse attached to the query. */
warehouseId?: string | undefined;
```

The JSDoc says "SQL warehouse"; the field says `warehouseId`. Databricks has data warehouses, Lakehouse, SQL warehouses, etc. `sqlWarehouseId` would self-document.

### 22. `Query.ownerUserName`, `Query.lastModifierUserName` — inconsistent agent-noun grammar

**Location:** `src/v1/model.ts:64-65`, `74-75`

```ts
/** Username of the user that owns the query. */
ownerUserName?: string | undefined;
...
/** Username of the user who last saved changes to this query. */
lastModifierUserName?: string | undefined;
```

`owner` is a noun. `lastModifier` is an agent noun constructed from the verb "modify." The pairing is mismatched — either both should be agent nouns (`ownerUserName`, `lastModifierUserName`) or both should be participial (`ownedBy`, `lastModifiedBy`). The Go convention is the former; idiomatic TS leans toward the latter. Also note the JSDoc inconsistency: "the user that owns" vs "the user who last saved" — different relative pronouns.

### 23. `Query.lastModifierUserName` — overly verbose

**Location:** `src/v1/model.ts:74-75`

```ts
lastModifierUserName?: string | undefined;
```

21 characters for what is, semantically, "last-modified-by." `lastModifiedBy` is 14 characters and more natural English.

### 24. `LifecycleState.TRASHED` — verb-tense inconsistency

**Location:** `src/v1/model.ts:14-17`

The enum value is past-participle (`TRASHED`), the method is imperative (`trashQuery`). When the SDK adds future lifecycle values like `ARCHIVED`, the new value will match this pattern, but the lifecycle vocabulary will diverge further from the verb vocabulary (`trash`/`archive`/`restore`).

### 25. `RunAsMode` — verb-as-noun, filler `Mode`

**Location:** `src/v1/model.ts:19-22`

```ts
export enum RunAsMode {
  OWNER = 'OWNER',
  VIEWER = 'VIEWER',
}
```

`RunAs` is an imperative phrase pressed into noun service (see same flag in `alerts` audit). `Mode` is filler — the enum has only two values and they describe *who* the query runs as, not *how*. `RunAsIdentity`, `Authority`, or even `runAs: 'OWNER' | 'VIEWER'` (a string literal union) would be cleaner.

### 26. `DatePrecision.DAY_PRECISION`, `MINUTE_PRECISION`, `SECOND_PRECISION` — redundant enum prefix

**Location:** `src/v1/model.ts:8-12`

```ts
export enum DatePrecision {
  DAY_PRECISION = 'DAY_PRECISION',
  MINUTE_PRECISION = 'MINUTE_PRECISION',
  SECOND_PRECISION = 'SECOND_PRECISION',
}
```

Access is `DatePrecision.DAY_PRECISION` — the enum name already says "precision." `DAY`/`MINUTE`/`SECOND` would suffice.

### 27. `DateRangeValue_DynamicDateRange` — long enum + Go-style underscore

**Location:** `src/v1/model.ts:24-43`

The enum *name* has a `_` separator (see #7 high). Beyond that, the enum *values* like `LAST_8_HOURS`, `LAST_24_HOURS` discretize a continuous space — only 16 fixed buckets.

### 28. Open-ended discrete enum — `LAST_8_HOURS`, `LAST_24_HOURS`, `LAST_14_DAYS`, ...

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

### 29. `Query.applyAutoLimit` — misleading verb predicate

**Location:** `src/v1/model.ts:85-87`

```ts
/** Whether to apply a 1000 row limit to the query result. */
applyAutoLimit?: boolean | undefined;
```

The name reads as an imperative action ("apply the auto limit!") rather than a flag. `autoLimit` (boolean) or `autoLimitRows` (number) would parse more naturally as state. The "1000" rule is in the JSDoc, not the type — `autoLimit: number` with the convention "1000 if true, 0 if disabled" would surface the magic number.

### 30. `Query.runAsMode` — type-suffix tautology

**Location:** `src/v1/model.ts:70-71`

```ts
/** Sets the "Run as" role for the object. */
runAsMode?: RunAsMode | undefined;
```

Field of type `RunAsMode` named `runAsMode`. `runAs` would suffice (the type already encodes "mode").

### 31. `Query.parentPath` — underspecified

**Location:** `src/v1/model.ts:76-77`

```ts
/** Workspace path of the workspace folder containing the object. */
parentPath?: string | undefined;
```

"Parent" of what? The JSDoc clarifies it is the workspace-folder path. `workspaceFolderPath` would self-document. `parentPath` reads like a filesystem path or a Git ref to first-time readers. (The same field appears in `alerts` — flagged there too.)

### 32. `MultiValuesOptions` — singular/plural mismatch

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

### 33. `MultiValuesOptions.prefix`, `separator`, `suffix` — fields lose meaning outside context

**Location:** `src/v1/model.ts:210-217`

`prefix`, `separator`, `suffix` are completely generic outside the surrounding type. The JSDoc says "Character that prefixes each selected parameter value" — they are not characters, they are arbitrary strings (typed `string`). `valuePrefix`, `valueSeparator`, `valueSuffix` would be self-documenting and the type-level `MultiValuesOptions` could drop the leading "Multi-Values" altogether.

### 34. `Visualization.type` — reserved-word collision

**Location:** `src/v1/model.ts:365-366`

```ts
/** The type of visualization: counter, table, funnel, and so on. */
type?: string | undefined;
```

`type` is a TS keyword (used in `type Foo = …`) and a generic field name. The JSDoc admits it is "counter, table, funnel, and so on" — i.e., an open-ended string enum (no domain enum is defined). `visualizationType` or `kind` would avoid the keyword issue.

### 35. `Visualization.serializedQueryPlan`, `.serializedOptions` — misleading

**Location:** `src/v1/model.ts:371-374`

```ts
/** The visualization query plan varies widely from one visualization type to the next and is unsupported. Databricks does not recommend modifying the visualization query plan directly. */
serializedQueryPlan?: string | undefined;
/** The visualization options varies widely from one visualization type to the next and is unsupported. Databricks does not recommend modifying visualization options directly. */
serializedOptions?: string | undefined;
```

Field names imply "the data, in serialized form." JSDoc admits the format is undocumented and the field should not be modified. If users are not supposed to construct these, they should not be on a public type (or they should be typed `Readonly<unknown>` with a clear name like `internalQueryPlan`/`opaqueOptions`).

### 36. `DateRangeValue.startDayOfWeek` — underspecified type

**Location:** `src/v1/model.ts:113`

```ts
startDayOfWeek?: number | undefined;
```

`number` with no JSDoc — is this 0-indexed or 1-indexed? Monday-first (ISO) or Sunday-first (US)? A `DayOfWeek` enum (`MONDAY`, `TUESDAY`, ...) or a typed alias would be self-documenting.

## Low severity

### 37. `Query.id`, `Visualization.id`, `QueryBackedValue.queryId` — id-vs-queryId inconsistency

**Location:** `src/v1/model.ts:58-59`, `362-363`, `262-263`

Top-level types use bare `id`; cross-referencing types use `queryId`. `Query.queryId` would be consistent with `Visualization.queryId` and `QueryBackedValue.queryId`. Currently `Query.id`, `Visualization.id`, `QueryBackedValue.queryId` means there are two conventions side-by-side.

### 38. `pageToken`, `pageSize`, `nextPageToken` — conventional pagination

**Location:** `src/v1/model.ts:153-156`, `158-161`

Standard Google AIP-158 names. Flagged for completeness; no action recommended.

### 39. `DateValue_DynamicDate.NOW`, `YESTERDAY` — sibling enum overlap

**Location:** `src/v1/model.ts:45-49`

```ts
export enum DateValue_DynamicDate {
  NOW = 'NOW',
  YESTERDAY = 'YESTERDAY',
}
```

`YESTERDAY` appears here *and* in `DateRangeValue_DynamicDateRange`. The two enums share at least one literal value but are not assignable to each other (TS enums are nominal). A shared `RelativeDate` enum (`NOW`, `YESTERDAY`, `LAST_HOUR`, ...) with sub-grouping would avoid the duplication.

### 40. snake_case in JSDoc — `dynamic_date_value`, `date_value`, etc.

**Location:** `src/v1/model.ts:292`, `297`

```ts
/** Date query parameter value. Can only specify one of `dynamic_date_value` or `date_value`. */
dateValue: DateValue;
/** Date-range query parameter value. Can only specify one of `dynamic_date_range_value` or `date_range_value`. */
dateRangeValue: DateRangeValue;
```

The JSDoc references wire-format field names (snake_case) but the user is writing TS code that uses camelCase (`dynamicDateValue`, `dateValue`). Wire-format leakage; doc should reference the TS oneof discriminator names.

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
- **Proto `_` leakage.** `queryhistory.ListQueries_Response`, `queryhistory.ExternalQuerySource_JobInfo`, `modelservingquery.QueryEndpointInput_ExtraParamsEntry` all use the same underscore-naming as `queries.DateRangeValue_DynamicDateRange`. The pattern is package-wide; flag at the generator level.

## Observations

1. **`Query` overload.** `Query` is one of the broadest words in any SQL SDK. This package's `Query` is a *saved* configuration; `queryexecution`'s implicit "query" is a *running statement*; `queryhistory`'s `QueryInfo` is a *historical record*. None reference each other. A future cleanup might rename this package's `Query` → `SavedQuery` or `WorkspaceQuery`.

2. **Wire-format leakage.** Direct proto-to-TS port shows in `DateRangeValue_DynamicDateRange`, `DateValue_DynamicDate` and snake_case identifiers in JSDoc. The "1:1 port" rule is satisfied but TypeScript ergonomics suffer.

3. **Soft-delete verb is `trash`, not `delete`.** `trashQuery` and `LifecycleState.TRASHED` are the only places in the SDK using "trash." This will diverge from the rest of the resource lifecycle vocabulary as the SDK grows.

4. **Top-level type pollution.** `TextValue`, `NumericValue`, `EnumValue`, `DateValue`, `DateRange`, `DateRangeValue`, `MultiValuesOptions`, `Visualization` are all unprefixed and exported. A user importing `import { TextValue } from '@databricks/sdk-queries'` gets a generically-named type that competes with their own code.

5. **`utils.ts` is well-named and unchanged.** Exports (`executeCall`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`, `marshalRequest`, `flattenQueryParams`) are domain-neutral and not flagged. `flattenQueryParams` is exported but unused in `client.ts` (orphaned export) — not a naming issue, but worth noting.

6. **`Iter` suffix.** `listQueriesIter`, `listVisualizationsForQueryIter` — Go/Rust-flavoured method names. Will appear in every generated package; flag at the generator level.

7. **`schema` ambiguity.** The file uses `schema` to mean both a Unity-Catalog schema (field on `Query`) and a Zod schema (`marshalQuerySchema`, etc.). The two never collide at the type level but the prose-level overloading hurts code review.

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
