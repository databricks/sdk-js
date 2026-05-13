# Naming Audit: `forecasting` (v1)

**Package:** `@databricks/sdk-forecasting`
**Path:** `/home/parth.bansal/sdk-js/packages/forecasting/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/utils.ts`
- `src/v1/index.ts`

This audit applies the 20 numbered concern categories from the audit
checklist. Each finding lists the offending identifier(s), the
category number, severity (`HIGH` / `MEDIUM` / `LOW`), and a concrete
rename suggestion. Findings are grouped by category. Generator-driven
items (such as the proto-style underscored nested-message names and
`marshal`/`unmarshal` schema prefixes) are flagged as `LOW` because
they are codified across the entire generated SDK surface — they
should be fixed at the generator, not by hand-editing this package.

---

## Inventory

### Enums (`model.ts`)

| Name                          | Members |
| ----------------------------- | ------- |
| `ForecastingExperiment_State` | `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`, `CANCELLED` |

### Interfaces (`model.ts`)

`CreateForecastingExperimentRequest`,
`CreateForecastingExperimentResponse`, `ForecastingExperiment`,
`GetForecastingExperimentRequest`.

### Schemas (`model.ts`)

`unmarshalCreateForecastingExperimentResponseSchema`,
`unmarshalForecastingExperimentSchema`,
`marshalCreateForecastingExperimentRequestSchema`.

### Client classes and methods (`client.ts`)

- Class `Client`
  - Method `createForecastingExperiment`
  - Method `createForecastingExperimentWaiter`
  - Method `getForecastingExperiment`
- Class `CreateForecastingExperimentWaiter`
  - Field `experimentId`
  - Method `wait`
  - Method `done`
- Local helper class `StillRunningError`

### Utility functions (`utils.ts`)

`executeCall`, `readAll`, `executeHttpCall`, `buildHttpRequest`,
`parseResponse`, `marshalRequest`, `flattenQueryParams`.

### Utility types/interfaces (`utils.ts`)

`HttpCallOptions`.

---

## Findings

### 1. Vague / generic names

#### F1.1 — `Client` class name (MEDIUM)
- **Where:** `client.ts:42`, `index.ts:3`.
- **Why flagged:** Every package in this SDK exports a `Client`.
  Re-exported in a barrel like
  `import {Client as ForecastingClient} from '@databricks/sdk-forecasting'`
  it is fine, but unqualified `Client` symbol-shadows aggressively.
  This is a project-wide pattern, not a forecasting-specific issue.
- **Suggestion:** Either keep `Client` and document the
  package-qualified import convention, or rename to
  `ForecastingClient` consistently across packages. Cross-cutting.

#### F1.2 — `req` parameter on every client method (LOW)
- **Where:** `client.ts:69, 100, 114`.
- **Why flagged:** `req` is a Go-ism (see category 14). It is also
  generic — a reader has to look at the type to know what the
  request is.
- **Suggestion:** Use a domain-meaningful parameter name
  (`experiment`, `request`) for stylistic consistency with `options`.

#### F1.3 — `primaryMetric: string` (MEDIUM)
- **Where:** `model.ts:34`.
- **Why flagged:** "Primary metric" without enumeration is vague.
  JSDoc says only "The evaluation metric used to optimize the
  forecasting model" with no enumeration of permitted values. By
  contrast, `forecastGranularity` JSDoc lists allowed values inline.
  The user has no way to know what to pass.
- **Suggestion:** Document allowed values in JSDoc (e.g. `mae`, `mse`,
  `rmse`, `mape`, `mdape`, `smape`), or introduce a string-literal
  union type `PrimaryMetric = 'mae' | 'mse' | …`. Naming itself is
  fine; signal loss happens at the field level.

#### F1.4 — `state` field on `ForecastingExperiment` (LOW)
- **Where:** `model.ts:78`.
- **Why flagged:** "state" alone is generic. Consistent with proto
  enum naming so likely acceptable. In TS, `status` is more idiomatic
  for read-only lifecycle indicators returned by an API; "state" is
  more common for owned/mutable state. Minor.
- **Suggestion:** Keep for parity with Go/proto. Note that the
  internal poll variable in `client.ts:160, 202` is named `status`,
  exposing the field/local terminology drift.

#### F1.5 — `target` is *not* present here (note)
- Unlike many sibling packages, this package's request payload uses
  domain-specific column names (`targetColumn`, `splitColumn`,
  `timeColumn`, `customWeightsColumn`) which is *good* and is the
  pattern other packages should follow. Worth noting as a positive
  example.

---

### 2. Redundant enum prefixes

#### F2.1 — `ForecastingExperiment_State` members (acceptable)
- **Where:** `model.ts:6-17`.
- **Why flagged:** The members are `PENDING`, `RUNNING`, `SUCCEEDED`,
  `FAILED`, `CANCELLED`. None of them re-prefix the enum name (e.g.
  no `STATE_PENDING`). Good shape.
- **Suggestion:** No change.

---

### 3. Acronym casing inconsistencies

#### F3.1 — `Id` vs `ID` (LOW, cross-cutting)
- **Where:** `model.ts:68, 74, 83`, `client.ts:104-109, 141, 155, 197`,
  `index.ts:12`.
- **Why flagged:** This SDK uses **lower-camel `Id`** consistently
  (`experimentId`). That is internally consistent within the package.
  The TS/JS community is split — DOM uses `nodeId`/`HTMLElement`,
  TypeScript itself uses `id`/`uuid` — so `Id` is defensible.
- **Suggestion:** Keep `Id`. The cross-package convention is already
  in place.

#### F3.2 — `URL` / `Url` consistency (acceptable)
- `client.ts` consistently uses `url` (lowercase) as a local var.
  `experimentPageUrl` (model.ts:76) uses `Url`. No casing
  inconsistency observed within the file.

#### F3.3 — `HTTP` / `Http` (acceptable for this file)
- `utils.ts` consistently uses `Http` PascalCase (`HttpClient`,
  `HttpRequest`, `HttpResponse`, `HttpCallOptions`,
  `executeHttpCall`, `buildHttpRequest`). `client.ts:81, 122` uses
  `httpReq` (lowercase prefix, PascalCase noun). Consistent.

#### F3.4 — `RPC` in JSDoc (LOW)
- **Where:** `client.ts:112` — JSDoc "Public RPC to get forecasting
  experiment".
- **Why flagged:** Documentation, not an identifier. Mentioning
  "RPC" leaks the Go/proto vocabulary into user-facing JSDoc;
  TS users do not typically think of method calls as "RPCs".
  See also F14 for Go-ism flavor.
- **Suggestion:** Rewrite JSDoc as "Fetches a forecasting
  experiment by ID."

---

### 4. Underscores in TS identifiers

> The TypeScript style guide (Google) and the SDK's own
> `typescript.mdc` disallow `snake_case` and underscores in
> identifiers. The generator emits proto-style "outer_inner" names
> as `Outer_Inner` to disambiguate nested messages — but TS would
> normally fold these into namespaces or flat PascalCase.

#### F4.1 — `ForecastingExperiment_State` (HIGH, cross-cutting,
  generator concern)
- **Where:** `model.ts:6`, `client.ts:28, 166, 169-170, 208-210`,
  `index.ts:5`.
- **Why flagged:** Requires
  `eslint-disable-next-line @typescript-eslint/naming-convention`
  (model.ts:5). That alone is a smell. The TypeScript-idiomatic
  equivalents would be either a nested namespace
  (`namespace ForecastingExperiment { export enum State { … } }`) or
  flat PascalCase (`ForecastingExperimentState`).
- **Suggestion:** Drop the underscore at the generator level. Two
  viable shapes:
  1. **Flat PascalCase** — `ForecastingExperimentState`.
  2. **Namespace nesting** — keep parent name, drop underscore:
     `ForecastingExperiment.State`.
  Approach (1) is more straightforward for tree-shaking and module
  re-exports; approach (2) more closely mirrors the proto nesting.

#### F4.2 — Wire-protocol snake_case in `marshal`/`unmarshal` body
  (acceptable)
- **Where:** `model.ts:89, 98-99, 110-145`.
- **Why flagged:** Field names like `experiment_id`, `train_data_path`
  inside the `z.object({...})` are wire shapes, not identifiers.
  Required for JSON parsing.
- **Suggestion:** Leave as-is. They are correctly scoped to the
  schema definition.

#### F4.3 — JSDoc comment "double-slash" artifact in
  `splitColumn` (LOW)
- **Where:** `model.ts:41`.
- **Why flagged:** The JSDoc reads `/** // The column ... */` — an
  extra `//` was carried through from the source. Cosmetic bug;
  not strictly a naming issue but noticed during inventory.
- **Suggestion:** Fix at generator: strip leading `// ` from JSDoc
  text.

---

### 5. Cryptic abbreviations

#### F5.1 — `req` (LOW, Go-ism)
- **Where:** `client.ts:69, 100, 104, 114, 117`.
- Already flagged under F1.2 / F14.1.

#### F5.2 — `resp` (LOW, Go-ism)
- **Where:** `client.ts:77, 87, 103-104, 118, 128, 153, 160,
  167, 195, 202`; `utils.ts:73, 81, 83, 88`.
- See F14.2.

#### F5.3 — `respBody` (LOW)
- **Where:** `client.ts:82, 123`.
- **Why flagged:** "resp" abbreviation. Spell out `responseBody`
  for clarity in TS where verbosity is cheap.
- **Suggestion:** `responseBody`.

#### F5.4 — `httpReq` (LOW)
- **Where:** `client.ts:81, 122`.
- **Why flagged:** `httpRequest` is clearer and matches the type
  `HttpRequest` exactly.
- **Suggestion:** `httpRequest`.

#### F5.5 — `apiErr` (LOW)
- **Where:** `utils.ts:88, 89`.
- **Why flagged:** `apiError` reads better; "err" is a Go-ism.
- **Suggestion:** `apiError`.

#### F5.6 — `pkgJson` (LOW)
- **Where:** `client.ts:20, 36, 37`.
- **Why flagged:** "pkg" abbreviation. `packageJson` is two extra
  characters and unambiguous.
- **Suggestion:** `packageJson`.

#### F5.7 — `msg` (LOW)
- **Where:** `client.ts:171, 172`.
- **Why flagged:** `const msg = '(no message)';` — short variable
  name for a one-shot constant. Marginal.
- **Suggestion:** Either inline the literal
  (`` `terminal state ${status}: (no message)` ``) or rename to
  `message`. The variable currently exists for no reason — its
  initializer is a literal and it is used once.

#### F5.8 — `opts`, `e`, `acc`, `val` (LOW)
- **Where:** `utils.ts:30, 55, 76, 137`.
- **Why flagged:**
  - `acc` (utils.ts:55) — reduce accumulator, conventional. OK.
  - `val` (utils.ts:137) — local destructure, OK.
  - `opts` (utils.ts:66, 68, 73, 75, 81, 83, 88) — Go-ism;
    `options` is preferred but `opts` is widely used in JS
    libraries. **Inconsistent with itself:** the public parameter
    name is `options` (utils.ts:28) but the internal one is `opts`
    (utils.ts:30, 66). Pick one.
  - `e` for the caught exception (utils.ts:76) — TS guidance
    accepts `err`/`error`/`e`; match the file's other usages
    (`apiErr`).
- **Suggestion:** rename `opts → options` inside `executeHttpCall`
  for consistency; leave `acc`, `val`, `e` alone.

#### F5.9 — `resp` as a poll-result variable (LOW)
- **Where:** `client.ts:103, 153, 167, 195` — `pollResp`.
- **Why flagged:** `pollResp` is a doubly-truncated name. Either
  `pollResponse` or `poll` would read more naturally.
- **Suggestion:** `pollResponse` (matches expansion of `resp`) or
  inline the call entirely.

---

### 6. Misleading names

#### F6.1 — `state` returned vs `status` used internally (LOW)
- **Where:** `model.ts:78`, `client.ts:160, 162, 202, 204`.
- **Why flagged:** The wire field is `state`, decoded into
  `ForecastingExperiment.state`. Inside the waiter, the value is
  reassigned to a local named `status` and the error message says
  "response missing required status field". This is misleading —
  the field that is required is `state`, not `status`.
- **Suggestion:** Rename the locals to `state` to match the
  domain term, or rename the field to `status` (less invasive in
  TS but breaks parity).

#### F6.2 — `done` method on the waiter does not return a boolean of
  "I'm done waiting" but "operation has reached a terminal state"
  (LOW)
- **Where:** `client.ts:194-215`.
- **Why flagged:** Method `done()` returns `Promise<boolean>` and
  performs a poll. A naive reader might assume `done()` reflects
  internal waiter state (similar to `Promise.resolve(done)` or
  `IteratorResult.done`). It actually issues an HTTP `GET`.
- **Suggestion:** Rename to `isTerminal()`, `isFinished()`, or
  `checkDone()` to signal that it polls the server. The JSDoc
  ("Checks whether the operation has reached a terminal state.")
  does clarify this, but the name does not.

#### F6.3 — `createForecastingExperimentWaiter` returns the waiter,
  not the response (LOW)
- **Where:** `client.ts:99-110`.
- **Why flagged:** The method name suggests "create a waiter," but
  it actually performs the *create* call first and then wraps the
  result. The return type
  (`CreateForecastingExperimentWaiter`) suggests the second
  interpretation correctly, but the verb `create` is overloaded:
  the same word is used for the API call and the waiter
  instantiation.
- **Suggestion:** Rename to
  `createForecastingExperimentAndWait` (mirroring "AndWait"
  patterns) or `startForecastingExperiment` (and have the waiter
  type be `ForecastingExperimentRun` or similar). The current name
  reads as if it merely *constructs* a waiter without side effects.

#### F6.4 — `(no message)` placeholder string (LOW, doc/UX)
- **Where:** `client.ts:171-172`.
- **Why flagged:** Not strictly naming. The thrown error has the
  literal text `(no message)`. There is no field on
  `ForecastingExperiment` that carries a failure message, so the
  waiter cannot do better — but the placeholder is a code smell.
- **Suggestion:** Either add a `message`/`error` field to
  `ForecastingExperiment` (server contract) or drop the placeholder
  and throw `new Error(``terminal state ${status}``)`.

#### F6.5 — `flattenQueryParams` is exported but unused in this
  package (LOW)
- **Where:** `utils.ts:123-150`.
- **Why flagged:** The name suggests it is a query-param helper for
  this client; the client does not call it (only `POST` with body
  and `GET` with path param, no `URLSearchParams` usage). The
  function is dead code inside this package. Either there is an
  intended caller that has not landed, or the helper should not be
  in this package.
- **Suggestion:** Move shared helpers to `@databricks/sdk-core` or
  delete from this package's `utils.ts`.

#### F6.6 — `createDefault` in client construction (LOW)
- **Where:** `client.ts:6, 57`.
- **Why flagged:** Documentation, not identifier. The imported
  function is `createDefault` from `clientinfo`. The name
  `createDefault` is vague at the import site — without reading
  the source, it is unclear that it creates a *user-agent
  client-info builder*. Imported in every package.
- **Suggestion:** Cross-cutting upstream rename
  (`createClientInfo` / `defaultClientInfo`). Out of scope here.

---

### 7. Overly verbose

#### F7.1 — `ForecastingExperiment` (MEDIUM)
- **Where:** `model.ts:72`.
- **Why flagged:** Inside a package literally named `forecasting`,
  every type is about forecasting. The `Forecasting` prefix doesn't
  add signal. Users will write
  `import {ForecastingExperiment} from '@databricks/sdk-forecasting'`
  — the `Forecasting` is said twice.
- **Suggestion:** Rename to `Experiment`. The package name carries
  the qualifier. Combined with F7.2 / F7.3 this collapses naming
  significantly. **Caveat:** `Experiment` is the same name used by
  the MLflow `experiments` API. If both packages are likely to be
  imported together, the qualification helps. Worth a cross-package
  review.

#### F7.2 — `CreateForecastingExperimentRequest`,
  `CreateForecastingExperimentResponse`,
  `GetForecastingExperimentRequest` (MEDIUM)
- **Where:** `model.ts:19, 66, 81`; `index.ts:8-12`.
- **Why flagged:** 33-34 character type names. Combined with method
  names that already say `createForecastingExperiment(...)`, the
  argument type is highly redundant. Compare typical TS SDK patterns:
  `client.forecasting.create(req: CreateRequest)` or
  `client.experiments.create(...)`.
- **Suggestion:** Drop the `Forecasting` token from request types:
  `CreateExperimentRequest`, `CreateExperimentResponse`,
  `GetExperimentRequest`. Or, if collapsed to a single client method
  per verb, just `CreateRequest`/`CreateResponse`/`GetRequest`.

#### F7.3 — `CreateForecastingExperimentWaiter` (HIGH)
- **Where:** `client.ts:138`, `index.ts:3`.
- **Why flagged:** 34 characters. Reads as
  "Create-Forecasting-Experiment-Waiter". With `Forecasting` removed
  (F7.1), it becomes `CreateExperimentWaiter` — still long but
  workable. Alternative: drop `Create` since the waiter exists only
  for create-style long-running operations, and name it
  `ExperimentRun` or `Operation`.
- **Suggestion:** Rename to `ExperimentRun` (analogous to
  `LongRunningOperation` in other SDKs). Combined with F6.3, the
  flow becomes
  `const run = await client.forecasting.startExperiment(req);
  await run.wait();`.

#### F7.4 — `createForecastingExperimentWaiter` method (HIGH)
- **Where:** `client.ts:99`.
- **Why flagged:** 35 character method name. Same issue as F7.3.
- **Suggestion:** Rename to `startExperiment` (or `createAndWait`)
  to match a renamed waiter.

#### F7.5 — `getForecastingExperiment` / `createForecastingExperiment`
  methods (MEDIUM)
- **Where:** `client.ts:68, 113`.
- **Why flagged:** Inside a `Forecasting` client, the `Forecasting`
  suffix is repetitive. Compare typical TS SDK shape:
  `forecasting.experiments.create(...)`,
  `forecasting.experiments.get(...)`.
- **Suggestion:** Either nest `experiments` as a sub-client
  (`forecasting.experiments.create`) or simplify to `create`,
  `get`. The class itself already conveys "forecasting".
  Cross-cutting convention.

#### F7.6 — `marshalCreateForecastingExperimentRequestSchema` and
  `unmarshalCreateForecastingExperimentResponseSchema` (LOW)
- **Where:** `model.ts:86, 108`.
- **Why flagged:** 47 / 51 character schema constant names. Long
  but mechanical. Inherits length from the underlying type name
  plus `marshal`/`Schema` affixes.
- **Suggestion:** Once F7.1/F7.2 are applied at generator level,
  these collapse to `marshalCreateExperimentRequestSchema` etc.
  Cross-cutting.

#### F7.7 — `timeseriesIdentifierColumns` (LOW)
- **Where:** `model.ts:50`.
- **Why flagged:** 27 character field name. "Time series identifier
  columns" is long-form; "series ID columns" or `seriesIdColumns`
  is shorter. The Go wire field is `timeseries_identifier_columns`,
  so parity is the constraint.
- **Suggestion:** Keep for parity with Go/proto. Note the verbose
  shape for future generator-level optimization.

---

### 8. Redundant suffixes

#### F8.1 — `Request` / `Response` on every request/response type
  (acceptable)
- **Where:** `model.ts:19, 66, 81`.
- **Why flagged:** `CreateForecastingExperimentRequest`,
  `CreateForecastingExperimentResponse`,
  `GetForecastingExperimentRequest` — these suffixes are
  generator-uniform and disambiguate request from response (which
  share a verb). Standard SDK convention.
- **Suggestion:** Keep, but apply with F7.2 to drop `Forecasting`.

#### F8.2 — `Waiter` suffix on `CreateForecastingExperimentWaiter`
  (LOW)
- **Where:** `client.ts:138`.
- **Why flagged:** `Waiter` is a Go SDK pattern for long-running
  operations. In TS/JS the more common terms are `Operation`,
  `Poller`, `Run`, or `Tracker`. `Waiter` isn't wrong but it is
  Go-flavored.
- **Suggestion:** Rename suffix to `Operation` or `Run` (e.g.
  `ExperimentRun`). See F7.3.

#### F8.3 — `Schema` suffix on Zod constants (acceptable)
- **Where:** `model.ts:86, 95, 108`.
- The `…Schema` suffix matches Zod community convention. No issue.

---

### 9. Singular / plural mismatches

#### F9.1 — `holidayRegions: string[]` (LOW)
- **Where:** `model.ts:48`.
- **Why flagged:** JSDoc says "The region code(s) to automatically
  add holiday features. **Currently supports only one region.**"
  The field is a plural array but server semantics are singular.
- **Suggestion:** API-shape concern; the spec retains a list for
  forward-compat. Document the invariant clearly. Not a TS rename
  issue.

#### F9.2 — `trainingFrameworks: string[]` (acceptable)
- Plural-array, no mismatch.

#### F9.3 — `includeFeatures: string[]` (acceptable)
- Plural-array, no mismatch.

#### F9.4 — `timeseriesIdentifierColumns: string[]` (acceptable)
- Plural-array, plural meaning.

#### F9.5 — `experiments` collection method missing (note)
- The client exposes `getForecastingExperiment` (singular) but no
  `listForecastingExperiments` (plural). This is an API-completeness
  observation, not a naming finding — if `list` is later added it
  should be named consistently.

---

### 10. Reserved-word / built-in collisions

#### F10.1 — `state` field (LOW)
- **Where:** `model.ts:78`.
- **Why flagged:** `state` shadows nothing reserved in JS/TS but
  is a popular React property name. Acceptable here because the
  field is on `ForecastingExperiment`, not on an array or
  component.
- **Suggestion:** Keep; not worth churn.

#### F10.2 — `done` method on `CreateForecastingExperimentWaiter` (MEDIUM)
- **Where:** `client.ts:194`.
- **Why flagged:** `done` shadows `IteratorResult.done` (the boolean
  property returned by iterator `next()`). Defining a `done()`
  *method* on a non-iterator class is mildly misleading. A reader
  encountering `waiter.done` might first think of iteration.
- **Suggestion:** Rename to `isTerminal()` / `isFinished()` (see
  F6.2).

#### F10.3 — `wait` method (acceptable)
- `wait` is not reserved in JS/TS but is the name of an Atomics
  primitive (`Atomics.wait`). Unlikely to be a real collision.
  Keep.

#### F10.4 — `Headers`, `URLSearchParams`, `TextDecoder`, `Error`,
  `JSON` (acceptable)
- Used as global classes/objects, no shadowing.

---

### 11. Empty / trivial wrapper types

#### F11.1 — `StillRunningError` private throw-marker class (LOW)
- **Where:** `client.ts:40`.
- **Why flagged:** A zero-body subclass of `Error` used only as a
  signal value for the retrier. This is the JS analog of Go's
  sentinel error pattern. Acceptable, but a more idiomatic TS
  approach is a tagged object or a symbol returned from the
  predicate.
- **Suggestion:** Acceptable as written. If renamed, document
  the contract.

---

### 12. Duplicate concepts

#### F12.1 — `experimentId` declared on both
  `ForecastingExperiment`,
  `CreateForecastingExperimentResponse`, and
  `GetForecastingExperimentRequest` (LOW)
- **Where:** `model.ts:68, 74, 83`.
- **Why flagged:** Same conceptual ID name and type. Consistent —
  this is *not* a naming issue, but a duplicate-field pattern.
  Worth noting because some other packages (e.g. `budgets`) use
  conflicting names for the same ID.
- **Suggestion:** No change. This is the desired state.

#### F12.2 — Per-method header construction duplicated (LOW, code
  style)
- **Where:** `client.ts:79-81, 120-122`.
- **Why flagged:** Every method runs:
  ```ts
  const headers = new Headers(...);
  headers.set('User-Agent', this.userAgent);
  ```
  Could be a private helper `this.buildHeaders(...)`. Not a naming
  issue, but a code-duplication smell.
- **Suggestion:** Out of scope for naming audit. Mentioned for
  completeness.

#### F12.3 — `experimentPath` (request) vs `experimentPageUrl`
  (response) — two URL-ish fields (LOW)
- **Where:** `model.ts:38, 76`.
- **Why flagged:** `experimentPath` is a *workspace* path
  (`/Users/alice/myexperiment`) where the experiment is *stored*;
  `experimentPageUrl` is the absolute UI URL. The semantic distinction
  is real but the names are close enough that a casual reader could
  conflate "path" and "URL".
- **Suggestion:** Keep, but ensure JSDoc on each makes the
  distinction explicit. The current JSDoc on `experimentPath`
  ("The path in the workspace to store the created experiment.")
  is correct.

#### F12.4 — `trainDataPath`, `predictionDataPath`,
  `futureFeatureDataPath` (acceptable, but observe pattern)
- **Where:** `model.ts:21, 52, 63`.
- **Why flagged:** All three are "fully qualified path of a Unity
  Catalog table." The pattern is consistent. Worth observing that
  these aren't "paths" in the workspace sense — they're
  catalog-schema-table identifiers (`catalog.schema.table`).
  Calling them `Path` is mildly confusing because
  `experimentPath` is *literally* a workspace path string.
  See F16.1.

---

### 13. Verb-tense inconsistency

#### F13.1 — Method verbs (acceptable)
- `create*`, `get*` — uniform imperative present. Good.

#### F13.2 — `marshalRequest` / `parseResponse` (LOW, asymmetry)
- **Where:** `utils.ts:113, 119`.
- **Why flagged:** `parse` vs `marshal` use different verbs for the
  same kind of operation (JSON conversion).
- **Suggestion:** Use the same axis: either `marshal/unmarshal`
  or `encode/decode` or `serialize/deserialize`. Cross-cutting.

#### F13.3 — `unmarshalXSchema` / `marshalXSchema` constants (LOW)
- **Where:** `model.ts:86, 95, 108`.
- **Why flagged:** Naming pattern is correct (verb + noun + Schema),
  but the verb form makes them read like functions, not constants.
  They *are* values (`z.ZodType` objects).
- **Suggestion:** Rename to nouns: `createExperimentRequestSchema`
  for marshalling, `experimentSchema` for unmarshalling. Cross-
  cutting; tied to generator.

#### F13.4 — `wait` vs `done` on the waiter (acceptable)
- Both are imperative single-word verbs. Match. Subject to F6.2
  / F10.2.

---

### 14. Go / Java-style names

#### F14.1 — `req`, `resp`, `err`, `Waiter`, `httpReq`, `apiErr`,
  `pkgJson`, `opts`, `msg`, `pollResp` (HIGH, but cross-cutting)
- **Where:**
  - `req` everywhere in `client.ts`
  - `resp` everywhere in `client.ts` and `utils.ts:73, 81`
  - `e` in `utils.ts:76` (with rethrow)
  - `Waiter` suffix in `CreateForecastingExperimentWaiter`
  - `httpReq` in client.ts:81, 122
  - `apiErr` in utils.ts:88
  - `pkgJson` in client.ts:20
  - `opts` in utils.ts:30, 66
  - `msg` in client.ts:171
  - `pollResp` in client.ts:153, 167, 195, 202
- **Why flagged:** These are all classic Go idioms ported verbatim.
  TS convention favors spelled-out names (`request`, `response`,
  `error`, `httpRequest`, `apiError`, `packageJson`, `options`,
  `message`, `pollResponse`). The `Waiter` pattern itself is also
  Go-style; TS/JS generally uses "operation," "poller," or "run."
- **Suggestion:** Spell them out. Trivial diff, large readability
  gain. This is a porting-convention decision and should be made
  globally at the generator level.

#### F14.2 — `marshal*` / `unmarshal*` schema prefixes (LOW)
- **Where:** `model.ts:86, 95, 108`.
- **Why flagged:** `marshal`/`unmarshal` is a Go term
  (encoding/json). The JS/TS world says "serialize"/"deserialize"
  or "encode"/"decode". `JSON.parse`/`JSON.stringify` is the
  vernacular. `marshal` is recognizable but Go-flavored.
- **Suggestion:** Rename to `encode`/`decode` or
  `serialize`/`deserialize`. Generator-level decision.

#### F14.3 — `Schema` suffix on Zod constants (acceptable)
- The `…Schema` suffix matches Zod community convention.

#### F14.4 — `_State` underscore-pseudo-nesting (HIGH)
- See F4.1. Underscores are foreign to TS.

#### F14.5 — `Public RPC to get forecasting experiment` JSDoc (LOW)
- See F3.4.

#### F14.6 — `terminal state` error message style (LOW)
- **Where:** `client.ts:172`.
- **Why flagged:** "terminal state" is Go-flavored language; TS/JS
  user-facing errors more commonly say "operation failed" or
  "experiment is in failed state."
- **Suggestion:** Rephrase the thrown error message for clarity.

---

### 15. Generic field names losing meaning

#### F15.1 — `state` (LOW)
- **Where:** `model.ts:78`. See F1.4 and F6.1.

#### F15.2 — `primaryMetric: string` (MEDIUM)
- **Where:** `model.ts:34`. See F1.3.

#### F15.3 — `req` parameter on every client method (HIGH)
- See F1.2 and F14.1.

#### F15.4 — `registerTo: string` (MEDIUM)
- **Where:** `model.ts:46`.
- **Why flagged:** `registerTo` is a verb-phrase masquerading as a
  noun field. The JSDoc clarifies it is "the fully qualified path
  of a Unity Catalog model … used to store the best model." But the
  name `registerTo` doesn't tell you *what* to register or *as what*.
- **Suggestion:** Rename to `modelRegistrationPath` /
  `modelTargetName` / `registeredModelName`. Cross-cutting if other
  packages share the pattern.

#### F15.5 — `maxRuntime: number` (LOW)
- **Where:** `model.ts:40`.
- **Why flagged:** Units are missing from the field name. JSDoc says
  minutes, but `maxRuntime: number` doesn't.
- **Suggestion:** Rename to `maxRuntimeMinutes`, or change the type
  to a duration string (`ISO 8601` PT1H, etc.) if the API supports
  it. Common SDK convention: suffix the unit on the field name.

#### F15.6 — `forecastHorizon: number` (LOW)
- **Where:** `model.ts:32`.
- **Why flagged:** Similar units issue. The JSDoc explains "The
  number of time steps into the future to make predictions,
  calculated as a multiple of forecast_granularity." Units are
  derived from another field — not from the name.
- **Suggestion:** Leave (units depend on granularity), but
  ensure JSDoc is the source of truth.

---

### 16. Field contradicting type domain

#### F16.1 — `*Path` fields holding three-part catalog names (MEDIUM)
- **Where:** `model.ts:21 (trainDataPath), 52 (predictionDataPath),
  63 (futureFeatureDataPath)`.
- **Why flagged:** "Path" suggests a hierarchical workspace or
  filesystem path. The values here are Unity Catalog three-part
  names (`catalog.schema.table`), which are *not* slash-delimited
  paths. The `experimentPath` field on the same type *is* a path
  (workspace path). Domain dissonance within the same type.
- **Suggestion:** Rename `*Path` → `*Table` /
  `*TableFullName` / `*TableName`. E.g. `trainingDataTable`,
  `predictionDataTable`. Or use UC's term: `*Reference`
  (`trainingDataReference`).

#### F16.2 — `forecastGranularity: string` (LOW)
- **Where:** `model.ts:30`.
- **Why flagged:** Type is `string` but JSDoc enumerates discrete
  values like `'1 second'`, `'Hourly'`, `'Yearly'`. This is a
  string-typed enum. Compare F1.3.
- **Suggestion:** Introduce a string-literal union type
  `ForecastGranularity = '1 second' | '1 minute' | … | 'Yearly'`,
  or document acceptable strings in JSDoc more rigorously.

#### F16.3 — `customWeightsColumn: string` (acceptable)
- Column name field with `string` type. Domain matches.

---

### 17. Inconsistent action verbs

#### F17.1 — `Get` vs `Create` (acceptable)
- Standard REST verbs. Good.

#### F17.2 — `wait` vs `done` (LOW)
- **Where:** `client.ts:149, 194`.
- **Why flagged:** `wait()` is an action (returns when terminal);
  `done()` is a query (returns bool now). Different axes — verb
  and predicate. Common pattern, but the predicate name `done`
  doesn't start with `is` or `has`, masking that it is a query.
- **Suggestion:** Rename `done` → `isDone` or `isTerminal`. See
  F6.2 / F10.2.

#### F17.3 — `createForecastingExperiment` vs
  `createForecastingExperimentWaiter` (LOW)
- **Where:** `client.ts:68, 99`.
- **Why flagged:** Both start with `create`. The first creates an
  experiment, the second creates a waiter (which itself triggers
  creation as a side effect). Verb overloaded. See F6.3.
- **Suggestion:** Rename second to `startForecastingExperiment`
  or `createAndWaitForecastingExperiment`.

#### F17.4 — `marshal` / `unmarshal` vs `parse` (LOW)
- See F13.2 / F14.2.

---

### 18. Long enum values

#### F18.1 — `ForecastingExperiment_State` members (acceptable)
- **Where:** `model.ts:8-16`.
- **Why flagged:** Members are `PENDING`, `RUNNING`, `SUCCEEDED`,
  `FAILED`, `CANCELLED`. Range 6-9 characters. Concise.
- **Suggestion:** None.

---

### 19. Underspecified IDs

#### F19.1 — `experimentId` (acceptable in this package)
- **Where:** `model.ts:68, 74, 83`.
- **Why flagged:** `experimentId` is the only ID in this package
  and is consistent. Inside a `forecasting` package the term
  "experiment" implies a forecasting experiment. **However**, the
  MLflow `experiments` API also issues experiment IDs and has
  type `Experiment`/`experimentId`. Cross-package confusion is
  possible if both clients are in use.
- **Suggestion:** Acceptable as-is. If renamed in the future, a
  domain qualifier such as `forecastingExperimentId` resolves the
  ambiguity at the cost of verbosity.

#### F19.2 — `experimentPath` (LOW)
- **Where:** `model.ts:38`.
- **Why flagged:** Workspace path. Unambiguous in context, but
  competes for "experiment" mindshare with `experimentId`.
  Marginal.
- **Suggestion:** Keep.

---

### 20. Type-suffix tautology

#### F20.1 — `ForecastingExperiment_State` enum + `state` field on
  `ForecastingExperiment` (LOW)
- **Where:** `model.ts:6, 78`.
- **Why flagged:** Three layers of "Forecasting" / "Experiment" /
  "State": `ForecastingExperiment.state:
  ForecastingExperiment_State`. With underscore removal and
  `Forecasting`-prefix drop, becomes
  `Experiment.state: ExperimentState`. Tolerable.
- **Suggestion:** Tie to F4.1 / F7.1.

#### F20.2 — Generic `*Schema` suffix (LOW)
- **Where:** `model.ts:86, 95, 108`.
- **Why flagged:**
  `unmarshalCreateForecastingExperimentResponseSchema` is 51
  characters with "Schema" suffixed onto an already-typed
  `z.ZodType<...>`. The `Schema` suffix is conventional in Zod
  ecosystems though.
- **Suggestion:** Acceptable; tied to generator.

---

## Package overlap: `forecasting` vs `experiments`

This SDK ships both `@databricks/sdk-forecasting` and an MLflow-style
`experiments` API in `@databricks/sdk-experiments` (verify path).
The forecasting concept of an "experiment" is distinct from MLflow's
generic experiment but uses the same term and the same ID name.

### F-OVERLAP.1 — `ForecastingExperiment` vs MLflow `Experiment`
  (MEDIUM)
- **Why flagged:** Naive autocomplete on "Experiment" surfaces both
  types. The forecasting experiment is a
  *long-running training job* tracked by AutoML; the MLflow
  experiment is a *grouping* of runs. Semantically very different.
- **Suggestion:** Keep `ForecastingExperiment` (do not drop the
  qualifier from the type, despite F7.1 above) to maintain
  disambiguation. Or, namespace this package's types under
  `forecasting.Experiment` if the package adopts nested exports.

### F-OVERLAP.2 — `experimentId` naming collision (LOW)
- Same field name used in both APIs but the IDs are not
  interchangeable. Users should not pass an MLflow experiment ID to
  forecasting or vice versa.
- **Suggestion:** Document explicitly in JSDoc that the ID is the
  forecasting/AutoML experiment ID, not an MLflow experiment ID.

---

## Summary table

| # | Category                                | Findings |
| - | --------------------------------------- | -------- |
| 1 | Vague / generic                         | 5 (1 acceptable note) |
| 2 | Redundant enum prefixes                 | 1 (acceptable) |
| 3 | Acronym casing                          | 4 (2 acceptable) |
| 4 | Underscores in TS identifiers           | 3 (1 acceptable) |
| 5 | Cryptic abbreviations                   | 9 |
| 6 | Misleading names                        | 6 |
| 7 | Overly verbose                          | 7 |
| 8 | Redundant suffixes                      | 3 (2 acceptable) |
| 9 | Singular / plural mismatch              | 5 (3 acceptable + 1 note) |
| 10 | Reserved-word collisions               | 4 (2 acceptable) |
| 11 | Empty / trivial wrappers               | 1 |
| 12 | Duplicate concepts                     | 4 |
| 13 | Verb-tense inconsistency               | 4 (2 acceptable) |
| 14 | Go / Java-style names                  | 6 |
| 15 | Generic field names                    | 6 |
| 16 | Field contradicting type domain        | 3 (1 acceptable) |
| 17 | Inconsistent action verbs              | 4 (1 acceptable) |
| 18 | Long enum values                       | 1 (acceptable) |
| 19 | Underspecified IDs                     | 2 (1 acceptable) |
| 20 | Type-suffix tautology                  | 2 |
| OVERLAP | forecasting vs experiments         | 2 |

---

## Top 10 highest-impact renames (recommended order)

1. **F4.1 / F14.4:** Replace underscored `ForecastingExperiment_State`
   with flat PascalCase `ForecastingExperimentState` or
   namespace nesting. Eliminates the `eslint-disable` comment.
2. **F6.3 / F7.4 / F17.3:** Rename
   `createForecastingExperimentWaiter` to
   `startForecastingExperiment` (or `createAndWait…`) to remove the
   "create" verb overload. Rename `CreateForecastingExperimentWaiter`
   class to `ForecastingExperimentRun` or `…Operation` (F7.3 / F8.2).
3. **F6.2 / F10.2 / F17.2:** Rename waiter `done()` method to
   `isTerminal()` (or `isDone()`) to signal that it is a
   server-poll predicate, not iterator state.
4. **F16.1:** Rename `*Path` fields that hold Unity Catalog
   three-part names to `*Table` (e.g. `trainDataPath →
   trainingDataTable`, `predictionDataPath →
   predictionsTable`, `futureFeatureDataPath →
   futureFeaturesTable`). Distinguishes them from `experimentPath`
   which is a real workspace path.
5. **F15.4:** Rename `registerTo` to
   `registeredModelName` (or `modelRegistrationTarget`). The
   verb-phrase field name is confusing.
6. **F15.5:** Rename `maxRuntime` → `maxRuntimeMinutes` to embed
   units in the name.
7. **F1.3 / F16.2:** Introduce string-literal union types for
   `primaryMetric` and `forecastGranularity`. Improves
   discoverability and type safety.
8. **F6.1:** Align waiter local variable name (`status`) with the
   field it reads (`state`). Update error message wording.
9. **F14.1 / F5.x:** Spell out `req`/`resp`/`err`/`opts`/
   `pkgJson`/`msg`/`pollResp`/`httpReq`/`apiErr` across all
   generated code.
10. **F7.1 / F7.2:** Drop the redundant `Forecasting` token from
    type names where the package qualifier already conveys domain
    (`ForecastingExperiment` → `Experiment`,
    `CreateForecastingExperimentRequest` → `CreateExperimentRequest`,
    etc.) — subject to the cross-package conflict noted in
    F-OVERLAP.1.

---

## Notes / out-of-scope

- All findings above relate to **generated** code. Code-base rule:
  "Code generated from API definition by Databricks SDK Generator.
  DO NOT EDIT." The fixes belong upstream in the generator and
  spec. This audit is a backlog for that generator.
- The `utils.ts` file contains the same generic helpers
  (`executeCall`, `parseResponse`, `marshalRequest`,
  `flattenQueryParams`, `executeHttpCall`, `buildHttpRequest`,
  `readAll`) that every generated package duplicates. The
  duplication itself is not a naming issue, but the *names*
  (`marshal/unmarshal`) are Go-flavored and inconsistent
  (`parseResponse` vs `marshalRequest`).
- This package has no `tests/` directory (verified by repo
  structure check), so the audit does not cover test naming.
- The `flattenQueryParams` helper in `utils.ts` is exported but
  never used in this package — see F6.5.
- The JSDoc on `splitColumn` (`model.ts:41`) has a stray `//`
  prefix from the source — generator bug, see F4.3.
