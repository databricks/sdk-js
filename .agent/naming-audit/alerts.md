# Naming Audit: alerts

**Path:** `packages/alerts/src/{v1,v2}/`
**Versions audited:** v1, v2
**Inferred domain:** SQL/Databricks alerts: a stored configuration that periodically evaluates a query result against a threshold and notifies subscribers when it triggers.
**Total weird names flagged:** 35

## Summary table

| # | Severity | Version | Location | Name | Category |
|---|----------|---------|----------|------|----------|
| 1 | High | v2 | `model.ts` enum | `Aggregation` | Vague/generic, no domain prefix |
| 2 | High | v2 | `model.ts` enum value | `AlertEvaluationState.UNKNOWN` | Inconsistent sentinel naming (`UNKNOWN` vs `UNSPECIFIED`) |
| 3 | High | v1 | `model.ts` field | `AlertCondition.op` | Cryptic abbreviation |
| 4 | High | v1 | `model.ts` field | `Alert.secondsToRetrigger` / v2 `AlertNotification.retriggerSeconds` | Singular/plural mismatch & cross-version regression in word order |
| 5 | High | v2 | `model.ts` interface | `AlertRunAs` | Verb-as-noun, reserved-word-feel |
| 6 | High | v2 | `model.ts` field | `Alert.runAsUserName` vs `Alert.runAs.userName` | Duplicate concept |
| 7 | High | v2 | `model.ts` field | `Alert.queryText` | Field contradicts type domain (alert holds raw SQL) |
| 8 | Medium | both | `client.ts` method | `trashAlert` | Inconsistent action verb (mixes with `delete`) |
| 9 | Medium | both | `model.ts` type | `TrashAlertRequest` | Inconsistent verb (rest of SDK uses `Delete`) |
| 10 | Medium | both | `model.ts` enum value | `AlertOperator.IS_NULL` / v2 `IS_NOT_NULL` | Long enum values inconsistent with binary ops |
| 11 | Medium | both | `model.ts` field | `Alert.notifyOnOk` | Acronym casing ambiguity (`Ok` vs `OK`) |
| 12 | Medium | v1 | `model.ts` field | `Alert.triggerTime` (v1) — disappears in v2 | Underspecified time field |
| 13 | Medium | v2 | `model.ts` field | `AlertEvaluation.lastEvaluatedAt` | Inconsistent time suffix (`At` vs `Time`) |
| 14 | Medium | v2 | `model.ts` field | `AlertOperandColumn.display` | Vague (display what?) |
| 15 | Medium | v2 | `model.ts` field | `Alert.warehouseId` | Underspecified ID |
| 16 | Medium | v2 | `model.ts` field | `CronSchedule.timezoneId` | Underspecified ID (timezone name, not numeric) |
| 17 | Medium | v2 | `model.ts` field | `CronSchedule.quartzCronSchedule` | Type-suffix tautology |
| 18 | Medium | v2 | `model.ts` interface | `CronSchedule` | Generic/global name in domain package |
| 19 | Medium | v2 | `model.ts` enum | `SchedulePauseStatus` | Boolean-shaped enum |
| 20 | Medium | v2 | `model.ts` field | `Alert.evaluation` (no domain qualifier) | Generic field name |
| 21 | Medium | v2 | `model.ts` field | `Alert.lifecycleState` documented as "Indicates whether the query is trashed" | Misleading (says query, means alert) |
| 22 | Medium | v2 | `model.ts` enum value | `AlertLifecycleState.DELETED` vs v1 `TRASHED` | v1→v2 rename break |
| 23 | Medium | v2 | `model.ts` field | `AlertSubscription.subscriptionType` | Type-suffix tautology |
| 24 | Low | both | `model.ts` field | `pageToken` / `pageSize` / `nextPageToken` | Conventional; flagged only for completeness |
| 25 | Low | both | `model.ts` field | `ListAlertsRequest`/`ListAlertsResponse` plural vs `GetAlertRequest` singular | Consistent with REST norms |
| 26 | Low | v2 | `model.ts` enum value | `Aggregation.STDDEV` | Cryptic abbreviation |
| 27 | Low | v2 | `model.ts` enum value | `Aggregation.AVG` | Cryptic abbreviation |
| 28 | Low | v1 | `model.ts` field | `AlertCondition.emptyResultState` | Underspecified (state of what when empty) |
| 29 | Low | v2 | `model.ts` field | `AlertEvaluation.source` | Vague/generic |
| 30 | Low | v2 | `model.ts` field | `AlertEvaluation.threshold` typed as `AlertOperand` | Misleading type (threshold can be a column) |
| 31 | Low | v1 | `model.ts` enum | `LifecycleState` | Missing domain prefix (v2 fixes to `AlertLifecycleState`) |
| 32 | Low | both | `model.ts` field | `Alert.customBody` / `customSubject` (v1) vs `customSummary` / `customDescription` (v2) | v1→v2 rename — different email/text vocabulary |
| 33 | Low | v2 | `model.ts` field | `Alert.effectiveRunAs` | "Effective" prefix unexplained at first read |
| 34 | Low | v2 | `model.ts` field | `Alert.id`, `Alert.queryText` co-located | "id" alone underspecified at field level (docs clarify) |
| 35 | Low | both | `client.ts` | comment "Create Alert" / "Update alert" docstrings | Verb-tense / casing inconsistency in JSDoc |

## v1 vs v2 comparison

### Major renames

| v1 name | v2 name | Notes |
|---------|---------|-------|
| `AlertOperator` (enum) | `ComparisonOperator` (enum) | **Regression** — `AlertOperator` was self-describing within the alerts package; `ComparisonOperator` is generic and re-uses a name already common across SDK packages. The new enum also adds `IS_NOT_NULL` (good), but the rename obscures the domain. |
| `AlertOperator.IS_NULL` only | `ComparisonOperator.IS_NULL` + `IS_NOT_NULL` | Expansion (good) but introduces a unary/binary asymmetry inside an enum named "Comparison". |
| `LifecycleState` (enum) | `AlertLifecycleState` (enum) | **Improvement** — domain prefix added. |
| `LifecycleState.TRASHED` | `AlertLifecycleState.DELETED` | **Break** — `trashAlert` method (still named "trash") now yields a state called `DELETED`. The verb on the wire and the state vocabulary diverge, even though the docstring still says "soft deleted". |
| `AlertCondition` (type) | `AlertEvaluation` (type) | **Major rename** — shifts from "condition shape" to "evaluation snapshot." The new type co-mingles configuration (`comparisonOperator`, `threshold`, `notification`) with runtime telemetry (`state`, `lastEvaluatedAt`), which is a meaningful design regression for naming. |
| `AlertCondition.op` | `AlertEvaluation.comparisonOperator` | **Improvement** — no longer cryptic. |
| `AlertCondition.operand` | `AlertEvaluation.source` | **Regression** — `source` is even vaguer than `operand`. |
| `AlertCondition.threshold` (`AlertOperand`) | `AlertEvaluation.threshold` (`AlertOperand`) | Identical name and type; OK. |
| `Alert.secondsToRetrigger` | `AlertNotification.retriggerSeconds` | **Regression** — word order changed (good: matches Go field), but: (a) two versions now use opposite orderings, (b) field moved into a sub-message, (c) v1 had grammatical singular/plural mismatch ("seconds … to retrigger" reads better than "retrigger seconds"). |
| `Alert.customBody`, `Alert.customSubject` | `Alert.customSummary`, `Alert.customDescription` | **Vocabulary swap** — v1 borrows email vocabulary (body/subject), v2 borrows article/incident vocabulary (summary/description). Both apply to the same notification text — there is no semantic reason for the change; an existing user has to re-learn the field names. |
| `Alert.triggerTime` | dropped; moved into `AlertEvaluation.lastEvaluatedAt` | Renamed and re-located. Time-suffix convention changes from `Time` to `At`. |
| `Alert.condition` | `Alert.evaluation` | Mirror of the type rename. |

### New in v2 (no v1 counterpart)

- `Aggregation` (enum) — top-level, no domain prefix.
- `SchedulePauseStatus` (enum) — partial domain prefix.
- `AlertNotification` (type)
- `AlertOperandColumn.display`, `.aggregation` (new fields)
- `AlertRunAs` (type) — verb-as-noun.
- `AlertSubscription` (type)
- `CronSchedule` (type) — generic name in a single-domain package.
- `Alert.queryText`, `Alert.warehouseId`, `Alert.runAsUserName`, `Alert.runAs`, `Alert.effectiveRunAs`, `Alert.schedule`, `Alert.evaluation`, `Alert.customSummary`, `Alert.customDescription`.
- `TrashAlertRequest.purge` — new flag.

### Dropped in v2

- `Alert.queryId` (v1) — alert no longer references a Query by ID; v2 embeds raw `queryText` + `warehouseId`. **Regression** in normalization, **improvement** in name specificity.

### Net assessment

v2 has clear wins (`AlertLifecycleState` prefix; spelling out `comparisonOperator`) but also introduces several regressions (`AlertOperator` → `ComparisonOperator`, `operand` → `source`, `condition` → `evaluation`, `customBody/Subject` → `customSummary/Description`, `secondsToRetrigger` → `retriggerSeconds`, `LifecycleState.TRASHED` → `AlertLifecycleState.DELETED` while keeping the method `trashAlert`).

## High severity

### 1. `Aggregation` — vague/generic top-level name (v2)

**Location:** `src/v2/model.ts:8-17`

```ts
export enum Aggregation {
  SUM = 'SUM',
  COUNT = 'COUNT',
  COUNT_DISTINCT = 'COUNT_DISTINCT',
  AVG = 'AVG',
  MEDIAN = 'MEDIAN',
  MIN = 'MIN',
  MAX = 'MAX',
  STDDEV = 'STDDEV',
}
```

Exported at the package root without an `Alert` or `Column` prefix. The same word is overloaded across SQL, stats, monitoring, and ML domains. `AlertOperandAggregation` or `ColumnAggregation` would be unambiguous.

### 2. `AlertEvaluationState.UNKNOWN` — inconsistent sentinel naming and deprecated value (v2)

**Location:** `src/v2/model.ts:26-32`

```ts
/**
 * UNSPECIFIED - default unspecify value for proto enum, do not use it in the code
 * UNKNOWN - alert not yet evaluated
 * ...
 */
export enum AlertEvaluationState {
  /** Deprecated. Please avoid using `UNKNOWN` as empty_result_state. */
  UNKNOWN = 'UNKNOWN',
  TRIGGERED = 'TRIGGERED',
  OK = 'OK',
  ERROR = 'ERROR',
}
```

This enum exposes a value (`UNKNOWN`) that the inline JSDoc tells the user to avoid: "Deprecated. Please avoid using `UNKNOWN` as empty_result_state." Shipping a deprecated value as part of the public enum surface is a naming/API smell — consumers reading the type cannot tell which values are valid without the JSDoc. Additionally, this enum's zero-value sentinel is named `UNSPECIFIED` while other enums in the package use `UNKNOWN` for the same role; the package-wide sentinel convention is inconsistent.

### 3. `AlertCondition.op` — cryptic abbreviation (v1)

**Location:** `src/v1/model.ts:62-71`

```ts
export interface AlertCondition {
  /** Operator used for comparison in alert evaluation. */
  op?: AlertOperator | undefined;
  ...
}
```

`op` is opaque without reading the JSDoc. v2 renames to `comparisonOperator` (good), but v1 keeps the two-letter wire shorthand.

### 4. `secondsToRetrigger` vs `retriggerSeconds` — singular/plural & cross-version reorder

**Location:** `src/v1/model.ts:38-39`; `src/v2/model.ts:122-126`

```ts
// v1
secondsToRetrigger?: number | undefined;
// v2
retriggerSeconds?: number | undefined;
```

`secondsToRetrigger` reads as "the seconds it takes to retrigger" but actually means "the wait period before retriggering is allowed." `retriggerSeconds` is closer to "number-of-seconds-typed-as-retrigger." Neither is great; both encode the unit in the name which is a smell when there's no companion `*Millis`/`*Minutes`. The same conceptual field changes name across versions.

### 5. `AlertRunAs` — verb-as-noun (v2)

**Location:** `src/v2/model.ts:155-168`

```ts
export interface AlertRunAs {
  identity?:
    | { $case: 'userName'; userName: string }
    | { $case: 'servicePrincipalName'; servicePrincipalName: string }
    | undefined;
}
```

`RunAs` is an imperative verb phrase used as a type name. `AlertIdentity`, `AlertRunner`, or `RunAsIdentity` would parse as nouns. Also note: the *field* inside is named `identity` — a clearer type name would let the field name be more specific (or vice versa).

### 6. Duplicate concept — `runAsUserName` vs `runAs.userName` (v2)

**Location:** `src/v2/model.ts:77-99`

```ts
// Deprecated: Use `run_as` field instead. ...
runAsUserName?: string | undefined;
...
runAs?: AlertRunAs | undefined;
effectiveRunAs?: AlertRunAs | undefined;
```

The same data is expressible as either `runAsUserName` (legacy scalar) or `runAs.identity.userName` (new structured). The Alert type carries both. The deprecation is noted in JSDoc only — a TS user reading the type sees three "run as"-prefixed fields without IDE help.

### 7. `Alert.queryText` — field contradicts type domain (v2)

**Location:** `src/v2/model.ts:68-69`

```ts
/** Text of the query to be run. */
queryText?: string | undefined;
```

A type named `Alert` carrying a raw SQL string makes the alert object responsible for storage of its query — a v1→v2 change that conflates the alert configuration with the query content. v1 cleanly held `queryId` (FK to a Query resource). The name itself is fine; the placement on `Alert` is the smell.

## Medium severity

### 8. `trashAlert` — inconsistent action verb (both)

**Location:** `src/v1/client.ts:170-192`; `src/v2/client.ts:168-196`

```ts
/** Moves an alert to the trash. ... A trashed alert is permanently deleted after 30 days. */
async trashAlert(...) { ... DELETE ... }
```

The HTTP verb is `DELETE`, the docstring talks about "permanently deleted," but the method is `trashAlert`. Across the SDK this is the only place where soft-delete uses `trash`-prefix. Most resources use `deleteX` (and the v2 enum value is `AlertLifecycleState.DELETED`, not `TRASHED`).

### 9. `TrashAlertRequest` — same as 8, in the type layer (both)

**Location:** `src/v1/model.ts:187-189`; `src/v2/model.ts:218-222`

Same verb inconsistency at the type layer.

### 10. Long enum values with `_OR_` connectors

**Location:** `src/v1/model.ts:8-16`; `src/v2/model.ts:39-48`

```ts
GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
```

The wire format uses long, English-prose enum values where most SDKs use `GT`, `GTE`, `LT`, `LTE`. They are long and verbose, and v2 adds `IS_NOT_NULL` alongside `IS_NULL` — unary operators sharing an enum named `ComparisonOperator`.

### 11. `Alert.notifyOnOk` — acronym/initialism case ambiguity (both)

**Location:** `src/v1/model.ts:59`; `src/v2/model.ts:128`

```ts
notifyOnOk?: boolean | undefined;
```

`OK` is conventionally upper-case, so `notifyOnOK` would match the enum value `AlertEvaluationState.OK`. The field uses title-case `Ok`, mismatching the enum value casing in the same file.

### 12. `Alert.triggerTime` — underspecified time (v1)

**Location:** `src/v1/model.ts:42-43`

```ts
/** Timestamp when the alert was last triggered, if the alert has been triggered before. */
triggerTime?: Temporal.Instant | undefined;
```

"Trigger time" could be "next scheduled trigger," "first trigger," or "last trigger" — the doc clarifies it's "last triggered." `lastTriggerTime` or `lastTriggeredAt` (v2 uses `lastEvaluatedAt` for a related concept) would be unambiguous.

### 13. `AlertEvaluation.lastEvaluatedAt` — inconsistent time suffix (v2)

**Location:** `src/v2/model.ts:113-114`

```ts
lastEvaluatedAt?: Temporal.Instant | undefined;
```

Every other timestamp in v2 uses the `*Time` suffix (`createTime`, `updateTime`). `lastEvaluatedAt` mixes conventions in the same file.

### 14. `AlertOperandColumn.display` — vague (v2)

**Location:** `src/v2/model.ts:139-144`

```ts
export interface AlertOperandColumn {
  name?: string | undefined;
  display?: string | undefined;
  aggregation?: Aggregation | undefined;
}
```

`display` with no JSDoc is ambiguous: display name? display label? display order? — without inspection of the wire payload one can't tell. `displayName` or `label` would clarify.

### 15. `Alert.warehouseId` — underspecified ID (v2)

**Location:** `src/v2/model.ts:70-71`

```ts
/** ID of the SQL warehouse attached to the alert. */
warehouseId?: string | undefined;
```

In a different package this might be a data warehouse, a logical warehouse, etc. The JSDoc clarifies, but the bare name does not. `sqlWarehouseId` would match the docstring and the rest of the Databricks SQL surface area.

### 16. `CronSchedule.timezoneId` — underspecified ID (v2)

**Location:** `src/v2/model.ts:187-192`

```ts
/** A Java timezone id. ... */
timezoneId?: string | undefined;
```

A timezone is named (e.g., `"America/Los_Angeles"`), not numerically identified. `timezone` or `timezoneName` reads less like a foreign key. The Go SDK and protobuf wire spell it `timezone_id`, but that doesn't make it accurate.

### 17. `CronSchedule.quartzCronSchedule` — type-suffix tautology (v2)

**Location:** `src/v2/model.ts:181-186`

```ts
export interface CronSchedule {
  quartzCronSchedule?: string | undefined;
  ...
}
```

The type is `CronSchedule`, the field is `quartzCronSchedule`. The user writes `schedule.quartzCronSchedule` where the outer access already implies "schedule." `quartzExpression` or `quartz` would suffice.

### 18. `CronSchedule` — generic name in a single-domain package (v2)

**Location:** `src/v2/model.ts:181-195`

A top-level type called `CronSchedule` in a package whose only consumer is alerts. If/when another package wants its own cron schedule shape, the user has two `CronSchedule`s. `AlertSchedule` would domain-prefix consistently with the rest of v2.

### 19. `SchedulePauseStatus` — boolean-shaped enum (v2)

**Location:** `src/v2/model.ts:50-53`

```ts
export enum SchedulePauseStatus {
  UNPAUSED = 'UNPAUSED',
  PAUSED = 'PAUSED',
}
```

Two values for a boolean concept; `boolean paused` would be simpler.

### 20. `Alert.evaluation` — generic field name (v2)

**Location:** `src/v2/model.ts:78`

```ts
evaluation?: AlertEvaluation | undefined;
```

The type already conveys "alert evaluation." The field would be clearer as `condition` (mirroring v1 semantics) or `trigger`, since `AlertEvaluation` actually carries both configuration (operator/threshold) and runtime telemetry (state/lastEvaluatedAt).

### 21. `Alert.lifecycleState` — JSDoc contradicts the field (v2)

**Location:** `src/v2/model.ts:80-81`

```ts
/** Indicates whether the query is trashed. */
lifecycleState?: AlertLifecycleState | undefined;
```

JSDoc says "whether the query is trashed," but the field is on `Alert` and the enum is `AlertLifecycleState` with values `ACTIVE`/`DELETED`. The word "query" leaks from the underlying implementation (alerts wrap queries) into an `Alert` field's documentation.

### 22. `AlertLifecycleState.DELETED` vs v1 `LifecycleState.TRASHED` — vocabulary swap

**Location:** v1 `model.ts:24-27`; v2 `model.ts:34-37`

The method is still `trashAlert` (both versions), but in v1 the resulting state is `TRASHED` and in v2 it is `DELETED`. So in v2 you "trash" something and it becomes "deleted." The wire/JSDoc still references "trashed."

### 23. `AlertSubscription.subscriptionType` — type-suffix tautology (v2)

**Location:** `src/v2/model.ts:170-175`

```ts
export interface AlertSubscription {
  subscriptionType?: ... ;
}
```

The field name re-states the type name. `target` or `recipient` would describe what the discriminator carries.

## Low severity

### 24. `pageToken` / `pageSize` / `nextPageToken` (both)

```ts
export interface ListAlertsRequest {
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}
export interface ListAlertsResponse {
  ...
  nextPageToken?: string | undefined;
}
```

Conventional Google AIP-158 pagination names. Flagged only because the rule list asks for completeness; no action recommended.

### 25. `ListAlertsRequest` plural vs `GetAlertRequest` singular (both)

Consistent with REST norms (`GET /alerts/{id}` singular, `GET /alerts` plural). No action recommended.

### 26. `Aggregation.STDDEV` — cryptic abbreviation (v2)

```ts
STDDEV = 'STDDEV',
```

`STANDARD_DEVIATION` or `STDEV` would be clearer; `STDDEV` is a SQL-server-ism.

### 27. `Aggregation.AVG` — cryptic abbreviation (v2)

`AVERAGE` would be consistent with `SUM`, `COUNT`, `MEDIAN`, `MIN`, `MAX`. The mix of short and full names inside one enum is the issue.

### 28. `AlertCondition.emptyResultState` — underspecified (v1)

```ts
/** Alert state if result is empty. */
emptyResultState?: AlertState | undefined;
```

Reads as "the empty-result state." `stateWhenEmptyResult` or `emptyResultBehavior` parses left-to-right. Minor.

### 29. `AlertEvaluation.source` — vague (v2)

```ts
/** Source column from result to use to evaluate alert */
source?: AlertOperandColumn | undefined;
```

`source` is generic; `operandColumn` (matching the type), `inputColumn`, or `column` would be clearer.

### 30. `AlertEvaluation.threshold` typed as `AlertOperand` — misleading (v2)

```ts
/** Threshold to user for alert evaluation, can be a column or a value. */
threshold?: AlertOperand | undefined;
```

The JSDoc admits the threshold can be a column — i.e., not actually a threshold value but another operand. The field name implies "fixed comparison number," the type allows "another column." The field name lies.

Also note the typo "Threshold to user" (should be "to use") — content, not naming, but worth fixing.

### 31. `LifecycleState` — missing domain prefix (v1)

v1 exports a global-looking `LifecycleState`. v2 corrects this to `AlertLifecycleState`.

### 32. `customBody` / `customSubject` (v1) vs `customSummary` / `customDescription` (v2)

Same data, different vocabulary. v1 = email metaphor, v2 = generic content metaphor. Users porting from v1 to v2 need a translation table.

### 33. `effectiveRunAs` (v2)

**Location:** `src/v2/model.ts:94-99`

```ts
/**
 * The actual identity that will be used to execute the alert.
 * This is an output-only field that shows the resolved run-as identity after applying
 * permissions and defaults.
 */
effectiveRunAs?: AlertRunAs | undefined;
```

The "effective" prefix is a Databricks convention for "value after applying inheritance/permissions." First-time readers will not know what `effectiveX` means without docs. Established convention, but flagged. (Previously also cited `effectiveParentPath`; that field was removed in regeneration.)

### 34. `Alert.id` (both)

The name alone (`id`) is underspecified at type level — `alertId` would be clearer when constructing a request that takes both `req.id` and the alert's id. The JSDoc covers it; the field doesn't.

### 35. JSDoc verb/casing inconsistency (both)

**Location:** v2 `client.ts:68`, `client.ts:198`

```ts
/** Create Alert */
async createAlert(...) { ... }
/** Update alert */
async updateAlert(...) { ... }
```

`Create Alert` vs `Update alert` — different capitalization, different sentence shape, neither ends with a period (project rule). v1 uses full sentences (`/** Creates an alert. */`). Naming-adjacent.

## Observations

1. **Wire-format leakage.** Many names are direct translations of proto wire fields without consideration of how they read in TypeScript: `op`, `STDDEV`, `IS_NULL`, `UNKNOWN`, `quartzCronSchedule`, `timezoneId`. The audit rule "1:1 port" was followed faithfully but the language idioms suffer.

2. **v1→v2 vocabulary churn.** The package introduces 8+ renames between versions (`AlertOperator` → `ComparisonOperator`, `LifecycleState` → `AlertLifecycleState`, `TRASHED` → `DELETED`, `op` → `comparisonOperator`, `condition` → `evaluation`, `operand` → `source`, `triggerTime` → `lastEvaluatedAt`, `secondsToRetrigger` → `retriggerSeconds`, `customBody/Subject` → `customSummary/Description`). Some are improvements, some are lateral, some are regressions. Combined with `trashAlert` keeping its name while `TRASHED` becomes `DELETED`, the message-vs-method vocabulary is inconsistent.

3. **Verb-as-noun proliferation in v2.** `AlertRunAs`, `effectiveRunAs`, `runAs.identity`, `runAsUserName` — a single concept ("which identity executes this alert") spreads across four names with overlapping semantics.

4. **`Alert.evaluation` mixes config and telemetry.** `AlertEvaluation` carries both inputs (`comparisonOperator`, `threshold`, `notification`) and outputs (`state`, `lastEvaluatedAt`). The name suggests "a run/event," but the type is really "evaluation configuration + last-run snapshot." Splitting into `AlertEvaluationConfig` + `AlertEvaluationStatus` (or moving `state`/`lastEvaluatedAt` onto `Alert` directly, where they used to live in v1) would make the naming honest.

5. **Top-level type pollution in v2.** v2 exports `Aggregation`, `ComparisonOperator`, `CronSchedule`, `SchedulePauseStatus`, `AlertEvaluationState`, `AlertLifecycleState` plus 9 message types from a single package. Several have no `Alert` prefix and read as if they belong to a shared domain library. Prefixing them all uniformly (`AlertAggregation`, `AlertScheduleCron`, `AlertSchedulePauseStatus`) would isolate the package.

## Domain glossary

| Term | Meaning in this package |
|------|------------------------|
| Alert | A stored configuration that runs a SQL query on a schedule and notifies subscribers when the result satisfies a comparison against a threshold. |
| Trigger | The state transition from "not satisfying the condition" to "satisfying the condition." |
| Re-trigger | Re-firing of notifications after the alert has already triggered (gated by a cooldown). |
| Evaluation | A single run of the alert's query + comparison; produces a state. |
| Operand | One side of the comparison; can be a column reference or a literal value. |
| Threshold | The value (or column) the source column is compared against. v2 misuses the word — it's really the second operand. |
| Lifecycle state | `ACTIVE` (visible to user) or trashed/`DELETED` (soft-deleted; auto-purged after 30 days). |
| Run-as | The identity (user or service principal) under which the query executes. |
| Effective X | The value of X after applying permission inheritance / server defaults. |

## File coverage

| File | Lines | Read in full |
|------|-------|--------------|
| `src/v1/model.ts` | 620 | yes |
| `src/v1/client.ts` | 219 | yes |
| `src/v1/utils.ts` | 150 | yes |
| `src/v1/index.ts` | 23 | yes |
| `src/v2/model.ts` | 669 | yes |
| `src/v2/client.ts` | 235 | yes |
| `src/v2/utils.ts` | 150 | yes |
| `src/v2/index.ts` | 30 | yes |
