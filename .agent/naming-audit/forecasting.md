# Naming Audit: `forecasting` (v1)

**Package:** `@databricks/sdk-forecasting`
**Path:** `/home/parth.bansal/sdk-js/packages/forecasting/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/index.ts`
- `src/v1/transport.ts`
- `src/v1/utils.ts`

---

## Findings

### 1. Misleading names

#### F1.1 — `done` method on the waiter does not return a boolean of
  "I'm done waiting" but "operation has reached a terminal state"
  (LOW)
- **Where:** `client.ts:197-218`.
- **Why flagged:** Method `done()` returns `Promise<boolean>` and
  performs a poll. A naive reader might assume `done()` reflects
  internal waiter state (similar to `Promise.resolve(done)` or
  `IteratorResult.done`). It actually issues an HTTP `GET`.
- **Suggestion:** Rename to `isTerminal()`, `isFinished()`, or
  `checkDone()` to signal that it polls the server. The JSDoc
  ("Checks whether the operation has reached a terminal state.")
  does clarify this, but the name does not.

---

### 2. Overly verbose

#### F2.1 — `ForecastingExperiment` (MEDIUM)
- **Where:** `model.ts:76`.
- **Why flagged:** Inside a package literally named `forecasting`,
  every type is about forecasting. The `Forecasting` prefix doesn't
  add signal. Users will write
  `import {ForecastingExperiment} from '@databricks/sdk-forecasting'`
  — the `Forecasting` is said twice.
- **Suggestion:** Rename to `Experiment`. The package name carries
  the qualifier. Combined with F2.2 / F2.3 this collapses naming
  significantly. **Caveat:** `Experiment` is the same name used by
  the MLflow `experiments` API. If both packages are likely to be
  imported together, the qualification helps. Worth a cross-package
  review.

#### F2.2 — `CreateForecastingExperimentRequest`,
  `CreateForecastingExperimentResponse`,
  `GetForecastingExperimentRequest` (MEDIUM)
- **Where:** `model.ts:23, 70, 85`; `index.ts:8-12`.
- **Why flagged:** 33-34 character type names. Combined with method
  names that already say `createForecastingExperiment(...)`, the
  argument type is highly redundant. Compare typical TS SDK patterns:
  `client.forecasting.create(req: CreateRequest)` or
  `client.experiments.create(...)`.
- **Suggestion:** Drop the `Forecasting` token from request types:
  `CreateExperimentRequest`, `CreateExperimentResponse`,
  `GetExperimentRequest`. Or, if collapsed to a single client method
  per verb, just `CreateRequest`/`CreateResponse`/`GetRequest`.

#### F2.3 — `CreateForecastingExperimentWaiter` (HIGH)
- **Where:** `client.ts:148`, `index.ts:3`.
- **Why flagged:** 34 characters. Reads as
  "Create-Forecasting-Experiment-Waiter". With `Forecasting` removed
  (F2.1), it becomes `CreateExperimentWaiter` — still long but
  workable. The `Waiter` suffix itself is a Go SDK pattern; in TS/JS
  the more common terms are `Operation`, `Poller`, `Run`, or
  `Tracker`. Alternative: drop `Create` since the waiter exists only
  for create-style long-running operations, and name it
  `ExperimentRun` or `Operation`.
- **Suggestion:** Rename to `ExperimentRun` (analogous to
  `LongRunningOperation` in other SDKs), so the flow reads
  `const run = await client.createForecastingExperiment(req);
  await run.wait();`.

#### F2.4 — `getForecastingExperiment` / `createForecastingExperiment`
  methods (MEDIUM)
- **Where:** `client.ts:105, 119`.
- **Why flagged:** Inside a `Forecasting` client, the `Forecasting`
  suffix is repetitive. Compare typical TS SDK shape:
  `forecasting.experiments.create(...)`,
  `forecasting.experiments.get(...)`.
- **Suggestion:** Either nest `experiments` as a sub-client
  (`forecasting.experiments.create`) or simplify to `create`,
  `get`. The class itself already conveys "forecasting".
  Cross-cutting convention.

---

### 3. Go-style `Waiter` pattern

#### F3.1 — `Waiter` suffix on `CreateForecastingExperimentWaiter`
  (LOW)
- **Where:** `client.ts:148`.
- **Why flagged:** `Waiter` is a Go SDK pattern for long-running
  operations. In TS/JS the more common terms are `Operation`,
  `Poller`, `Run`, or `Tracker`. `Waiter` isn't wrong but it is
  Go-flavored.
- **Suggestion:** Rename suffix to `Operation` or `Run` (e.g.
  `ExperimentRun`). See F2.3.

---

### 4. Reserved-word / built-in collisions

#### F4.1 — `done` method on `CreateForecastingExperimentWaiter` (MEDIUM)
- **Where:** `client.ts:197`.
- **Why flagged:** `done` shadows `IteratorResult.done` (the boolean
  property returned by iterator `next()`). Defining a `done()`
  *method* on a non-iterator class is mildly misleading. A reader
  encountering `waiter.done` might first think of iteration.
- **Suggestion:** Rename to `isTerminal()` / `isFinished()` (see
  F1.1).

---

### 5. Proto / architectural leaks

#### F5.1 — `ForecastingExperiment_State` — `model.ts:6`
- **Why flagged:** The `Foo_Bar` underscore identifier is a verbatim
  proto-generated nested-enum form (`ForecastingExperiment.State` in
  the original proto). The underscore form leaks the proto IDL
  encoding into a public TS symbol. The accompanying eslint-disable
  comment "Proto-style nested enum name" makes the leak explicit.
- **Category:** Proto architectural leak (nested-enum underscore form).
- **Suggested:** `ExperimentState` (or `ForecastingExperimentState`
  if the qualifier is kept).
- **Rationale:** TS has no first-class nested-enum syntax matching
  proto's `Foo.Bar`. The flat camel/Pascal form removes the IDL
  artifact and the eslint-disable.

---

## Summary table

| # | Category                                | Findings |
| - | --------------------------------------- | -------- |
| 1 | Misleading names                        | 1 |
| 2 | Overly verbose                          | 4 |
| 3 | Go-style `Waiter` pattern               | 1 |
| 4 | Reserved-word collisions                | 1 |
| 5 | Proto / architectural leaks             | 1 |
