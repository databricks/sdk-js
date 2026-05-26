# Naming Audit: `forecasting` (v1)

**Package:** `@databricks/sdk-forecasting`
**Path:** `/home/parth.bansal/sdk-js/packages/forecasting/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/utils.ts`
- `src/v1/index.ts`

This audit applies the audit checklist categories. Each finding lists
the offending identifier(s), the category, severity
(`HIGH` / `MEDIUM` / `LOW`), and a concrete rename suggestion.
Findings are grouped by category.

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

#### F1.2 — `primaryMetric: string` (MEDIUM)
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

#### F1.3 — `target` is *not* present here (note)
- Unlike many sibling packages, this package's request payload uses
  domain-specific column names (`targetColumn`, `splitColumn`,
  `timeColumn`, `customWeightsColumn`) which is *good* and is the
  pattern other packages should follow. Worth noting as a positive
  example.

---

### 2. Redundant enum prefixes

_None._

---

### 3. Acronym casing inconsistencies

_None._

---

### 4. Misleading names

#### F4.1 — `done` method on the waiter does not return a boolean of
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

#### F4.2 — `createForecastingExperimentWaiter` returns the waiter,
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

---

### 5. Overly verbose

#### F5.1 — `ForecastingExperiment` (MEDIUM)
- **Where:** `model.ts:72`.
- **Why flagged:** Inside a package literally named `forecasting`,
  every type is about forecasting. The `Forecasting` prefix doesn't
  add signal. Users will write
  `import {ForecastingExperiment} from '@databricks/sdk-forecasting'`
  — the `Forecasting` is said twice.
- **Suggestion:** Rename to `Experiment`. The package name carries
  the qualifier. Combined with F5.2 / F5.3 this collapses naming
  significantly. **Caveat:** `Experiment` is the same name used by
  the MLflow `experiments` API. If both packages are likely to be
  imported together, the qualification helps. Worth a cross-package
  review.

#### F5.2 — `CreateForecastingExperimentRequest`,
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

#### F5.3 — `CreateForecastingExperimentWaiter` (HIGH)
- **Where:** `client.ts:138`, `index.ts:3`.
- **Why flagged:** 34 characters. Reads as
  "Create-Forecasting-Experiment-Waiter". With `Forecasting` removed
  (F5.1), it becomes `CreateExperimentWaiter` — still long but
  workable. The `Waiter` suffix itself is a Go SDK pattern; in TS/JS
  the more common terms are `Operation`, `Poller`, `Run`, or
  `Tracker`. Alternative: drop `Create` since the waiter exists only
  for create-style long-running operations, and name it
  `ExperimentRun` or `Operation`.
- **Suggestion:** Rename to `ExperimentRun` (analogous to
  `LongRunningOperation` in other SDKs). Combined with F4.2, the
  flow becomes
  `const run = await client.forecasting.startExperiment(req);
  await run.wait();`.

#### F5.4 — `createForecastingExperimentWaiter` method (HIGH)
- **Where:** `client.ts:99`.
- **Why flagged:** 35 character method name. Same issue as F5.3.
- **Suggestion:** Rename to `startExperiment` (or `createAndWait`)
  to match a renamed waiter.

#### F5.5 — `getForecastingExperiment` / `createForecastingExperiment`
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

---

### 6. Go-style `Waiter` pattern

#### F6.1 — `Waiter` suffix on `CreateForecastingExperimentWaiter`
  (LOW)
- **Where:** `client.ts:138`.
- **Why flagged:** `Waiter` is a Go SDK pattern for long-running
  operations. In TS/JS the more common terms are `Operation`,
  `Poller`, `Run`, or `Tracker`. `Waiter` isn't wrong but it is
  Go-flavored.
- **Suggestion:** Rename suffix to `Operation` or `Run` (e.g.
  `ExperimentRun`). See F5.3.

---

### 7. Reserved-word / built-in collisions

#### F7.1 — `done` method on `CreateForecastingExperimentWaiter` (MEDIUM)
- **Where:** `client.ts:194`.
- **Why flagged:** `done` shadows `IteratorResult.done` (the boolean
  property returned by iterator `next()`). Defining a `done()`
  *method* on a non-iterator class is mildly misleading. A reader
  encountering `waiter.done` might first think of iteration.
- **Suggestion:** Rename to `isTerminal()` / `isFinished()` (see
  F4.1).

---

### 8. Generic field names losing meaning

#### F8.1 — `primaryMetric: string` (MEDIUM)
- **Where:** `model.ts:34`. See F1.2.

---

### 9. Untyped string for closed enum

#### F9.1 — `forecastGranularity: string` (LOW)
- **Where:** `model.ts:30`.
- **Why flagged:** Type is `string` but JSDoc enumerates discrete
  values like `'1 second'`, `'Hourly'`, `'Yearly'`. This is a
  string-typed enum. Compare F1.2.
- **Suggestion:** Introduce a string-literal union type
  `ForecastGranularity = '1 second' | '1 minute' | … | 'Yearly'`,
  or document acceptable strings in JSDoc more rigorously.

---

### 10. `*Path` fields contradicting type domain

_None._

---

### 11. Proto / architectural leaks

#### F11.1 — `ForecastingExperiment_State` — `model.ts:6`
- **Why flagged:** The `Foo_Bar` underscore identifier is a verbatim
  proto-generated nested-enum form (`ForecastingExperiment.State` in
  the original proto). The underscore form leaks the proto IDL
  encoding into a public TS symbol. The accompanying eslint-disable
  comment "Proto-style nested enum name" makes the leak explicit.
- **Category:** Proto architectural leak (nested-enum underscore form).
- **Suggested:** `ExperimentState` (or `ForecastingExperimentState`
  if the qualifier is kept per F-OVERLAP.1).
- **Rationale:** TS has no first-class nested-enum syntax matching
  proto's `Foo.Bar`. The flat camel/Pascal form removes the IDL
  artifact and the eslint-disable.

#### F11.2 — "Public RPC" in JSDoc — `client.ts:112`
- **Why flagged:** The JSDoc `/** Public RPC to get forecasting
  experiment */` exposes the server-side classification
  (`Public` vs `Internal` RPC) and the transport term `RPC` to SDK
  consumers. Users of an HTTP SDK do not need to know the call
  is dispatched as a "public RPC" inside the backend.
- **Category:** Proto/RPC architectural leak (`Public` mid-position
  classifier + `RPC` transport noun in user-facing doc).
- **Suggested:** Replace with a behavioural description, e.g.
  `/** Gets a forecasting experiment by ID. */`.
- **Rationale:** Public-API JSDoc should describe what the method
  does for the caller, not how the backend routes it.

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
  qualifier from the type, despite F5.1 above) to maintain
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
| 1 | Vague / generic                         | 3 (1 acceptable note) |
| 2 | Redundant enum prefixes                 | 0 |
| 3 | Acronym casing                          | 0 |
| 4 | Misleading names                        | 2 |
| 5 | Overly verbose                          | 5 |
| 6 | Go-style `Waiter` pattern               | 1 |
| 7 | Reserved-word collisions                | 1 |
| 8 | Generic field names                     | 1 |
| 9 | Untyped string for closed enum          | 1 |
| 10 | `*Path` fields contradicting domain    | 0 |
| 11 | Proto / architectural leaks            | 2 |
| OVERLAP | forecasting vs experiments         | 2 |

---

## Top renames (recommended order)

1. **F4.2 / F5.4:** Rename
   `createForecastingExperimentWaiter` to
   `startForecastingExperiment` (or `createAndWait…`) to remove the
   "create" verb overload. Rename `CreateForecastingExperimentWaiter`
   class to `ForecastingExperimentRun` or `…Operation` (F5.3 / F6.1).
2. **F4.1 / F7.1:** Rename waiter `done()` method to
   `isTerminal()` (or `isDone()`) to signal that it is a
   server-poll predicate, not iterator state.
3. **F1.2 / F9.1:** Introduce string-literal union types for
   `primaryMetric` and `forecastGranularity`. Improves
   discoverability and type safety.
4. **F5.1 / F5.2:** Drop the redundant `Forecasting` token from
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
- This package has no `tests/` directory (verified by repo
  structure check), so the audit does not cover test naming.
