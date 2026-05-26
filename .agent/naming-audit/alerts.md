# Naming Audit: alerts

**Path:** `packages/alerts/src/{v1,v2}/`
**Versions audited:** v1, v2
**Inferred domain:** SQL/Databricks alerts: a stored configuration that periodically evaluates a query result against a threshold and notifies subscribers when it triggers.
**Total weird names flagged:** 22 (0 fixed, 22 still present after rescan on 2026-05-26 post regen #156)

## Summary table

| # | Severity | Version | Location | Name | Category |
|---|----------|---------|----------|------|----------|
| 1 | High | v2 | `model.ts` enum | `Aggregation` | Vague/generic, no domain prefix |
| 2 | High | v2 | `model.ts` enum value | `AlertEvaluationState.UNKNOWN` | Inconsistent sentinel naming (`UNKNOWN` vs `UNSPECIFIED`) |
| 3 | High | v2 | `model.ts` interface | `AlertRunAs` | Verb-as-noun, reserved-word-feel |
| 4 | High | v2 | `model.ts` field | `Alert.runAsUserName` vs `Alert.runAs.userName` | Duplicate concept |
| 5 | High | v2 | `model.ts` field | `Alert.queryText` | Field contradicts type domain (alert holds raw SQL) |
| 6 | Medium | both | `client.ts` method | `trashAlert` | Inconsistent action verb (mixes with `delete`) |
| 7 | Medium | both | `model.ts` type | `TrashAlertRequest` | Inconsistent verb (rest of SDK uses `Delete`) |
| 8 | Medium | both | `model.ts` enum value | `AlertOperator.IS_NULL` / v2 `IS_NOT_NULL` | Long enum values inconsistent with binary ops |
| 9 | Medium | both | `model.ts` field | `Alert.notifyOnOk` | Acronym casing ambiguity (`Ok` vs `OK`) |
| 10 | Medium | v2 | `model.ts` interface | `CronSchedule` | Generic/global name in domain package |
| 11 | Medium | v2 | `model.ts` enum | `SchedulePauseStatus` | Boolean-shaped enum |
| 12 | Medium | v2 | `model.ts` field | `Alert.lifecycleState` documented as "Indicates whether the query is trashed" | Misleading (says query, means alert) |
| 13 | Medium | v2 | `model.ts` enum value | `AlertLifecycleState.DELETED` vs v1 `TRASHED` | v1→v2 rename break |
| 14 | Low | both | `model.ts` field | `pageToken` / `pageSize` / `nextPageToken` | Conventional; flagged only for completeness |
| 15 | Low | both | `model.ts` field | `ListAlertsRequest`/`ListAlertsResponse` plural vs `GetAlertRequest` singular | Consistent with REST norms |
| 16 | Low | v2 | `model.ts` enum value | `Aggregation.STDDEV` | Cryptic abbreviation |
| 17 | Low | v2 | `model.ts` enum value | `Aggregation.AVG` | Cryptic abbreviation |
| 18 | Low | v2 | `model.ts` field | `AlertEvaluation.threshold` typed as `AlertOperand` | Misleading type (threshold can be a column) |
| 19 | Low | v1 | `model.ts` enum | `LifecycleState` | Missing domain prefix (v2 fixes to `AlertLifecycleState`) |
| 20 | Low | both | `model.ts` field | `Alert.customBody` / `customSubject` (v1) vs `customSummary` / `customDescription` (v2) | v1→v2 rename — different email/text vocabulary |
| 21 | Low | v2 | `model.ts` field | `Alert.effectiveRunAs` | "Effective" prefix unexplained at first read |
| 22 | Low | both | `client.ts` | comment "Create Alert" / "Update alert" docstrings | Verb-tense / casing inconsistency in JSDoc |

## v1 vs v2 comparison

### Major renames

| v1 name | v2 name | Notes |
|---------|---------|-------|
| `AlertOperator` (enum) | `ComparisonOperator` (enum) | **Regression** — `AlertOperator` was self-describing within the alerts package; `ComparisonOperator` is generic and re-uses a name already common across SDK packages. The new enum also adds `IS_NOT_NULL` (good), but the rename obscures the domain. |
| `AlertOperator.IS_NULL` only | `ComparisonOperator.IS_NULL` + `IS_NOT_NULL` | Expansion (good) but introduces a unary/binary asymmetry inside an enum named "Comparison". |
| `LifecycleState` (enum) | `AlertLifecycleState` (enum) | **Improvement** — domain prefix added. |
| `LifecycleState.TRASHED` | `AlertLifecycleState.DELETED` | **Break** — `trashAlert` method (still named "trash") now yields a state called `DELETED`. The verb on the wire and the state vocabulary diverge, even though the docstring still says "soft deleted". |
| `AlertCondition` (type) | `AlertEvaluation` (type) | **Major rename** — shifts from "condition shape" to "evaluation snapshot." The new type co-mingles configuration (`comparisonOperator`, `threshold`, `notification`) with runtime telemetry (`state`, `lastEvaluatedAt`), which is a meaningful design regression for naming. |

### New in v2 (no v1 counterpart)

- `Aggregation` (enum) — top-level, no domain prefix.
- `SchedulePauseStatus` (enum) — partial domain prefix.
- `AlertNotification` (type)
- `AlertRunAs` (type) — verb-as-noun.
- `AlertSubscription` (type)
- `CronSchedule` (type) — generic name in a single-domain package.
- `Alert.queryText`, `Alert.runAsUserName`, `Alert.runAs`, `Alert.effectiveRunAs`, `Alert.schedule`, `Alert.customSummary`, `Alert.customDescription`.
- `TrashAlertRequest.purge` — new flag.

### Dropped in v2

- `Alert.queryId` (v1) — alert no longer references a Query by ID; v2 embeds raw `queryText` + `warehouseId`. **Regression** in normalization, **improvement** in name specificity.

### Net assessment

v2 has clear wins (`AlertLifecycleState` prefix; spelling out `comparisonOperator`) but also introduces several regressions (`AlertOperator` → `ComparisonOperator`, `condition` → `evaluation`, `LifecycleState.TRASHED` → `AlertLifecycleState.DELETED` while keeping the method `trashAlert`).

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

### 3. `AlertRunAs` — verb-as-noun (v2)

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

### 4. Duplicate concept — `runAsUserName` vs `runAs.userName` (v2)

**Location:** `src/v2/model.ts:77-99`

```ts
// Deprecated: Use `run_as` field instead. ...
runAsUserName?: string | undefined;
...
runAs?: AlertRunAs | undefined;
effectiveRunAs?: AlertRunAs | undefined;
```

The same data is expressible as either `runAsUserName` (legacy scalar) or `runAs.identity.userName` (new structured). The Alert type carries both. The deprecation is noted in JSDoc only — a TS user reading the type sees three "run as"-prefixed fields without IDE help.

### 5. `Alert.queryText` — field contradicts type domain (v2)

**Location:** `src/v2/model.ts:68-69`

```ts
/** Text of the query to be run. */
queryText?: string | undefined;
```

A type named `Alert` carrying a raw SQL string makes the alert object responsible for storage of its query — a v1→v2 change that conflates the alert configuration with the query content. v1 cleanly held `queryId` (FK to a Query resource). The name itself is fine; the placement on `Alert` is the smell.

## Medium severity

### 6. `trashAlert` — inconsistent action verb (both)

**Location:** `src/v1/client.ts:170-192`; `src/v2/client.ts:168-196`

```ts
/** Moves an alert to the trash. ... A trashed alert is permanently deleted after 30 days. */
async trashAlert(...) { ... DELETE ... }
```

The HTTP verb is `DELETE`, the docstring talks about "permanently deleted," but the method is `trashAlert`. Across the SDK this is the only place where soft-delete uses `trash`-prefix. Most resources use `deleteX` (and the v2 enum value is `AlertLifecycleState.DELETED`, not `TRASHED`).

### 7. `TrashAlertRequest` — same as 6, in the type layer (both)

**Location:** `src/v1/model.ts:187-189`; `src/v2/model.ts:218-222`

Same verb inconsistency at the type layer.

### 8. Long enum values with `_OR_` connectors

**Location:** `src/v1/model.ts:8-16`; `src/v2/model.ts:39-48`

```ts
GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
```

The wire format uses long, English-prose enum values where most SDKs use `GT`, `GTE`, `LT`, `LTE`. They are long and verbose, and v2 adds `IS_NOT_NULL` alongside `IS_NULL` — unary operators sharing an enum named `ComparisonOperator`.

### 9. `Alert.notifyOnOk` — acronym/initialism case ambiguity (both)

**Location:** `src/v1/model.ts:59`; `src/v2/model.ts:128`

```ts
notifyOnOk?: boolean | undefined;
```

`OK` is conventionally upper-case, so `notifyOnOK` would match the enum value `AlertEvaluationState.OK`. The field uses title-case `Ok`, mismatching the enum value casing in the same file.

### 10. `CronSchedule` — generic name in a single-domain package (v2)

**Location:** `src/v2/model.ts:181-195`

A top-level type called `CronSchedule` in a package whose only consumer is alerts. If/when another package wants its own cron schedule shape, the user has two `CronSchedule`s. `AlertSchedule` would domain-prefix consistently with the rest of v2.

### 11. `SchedulePauseStatus` — boolean-shaped enum (v2)

**Location:** `src/v2/model.ts:50-53`

```ts
export enum SchedulePauseStatus {
  UNPAUSED = 'UNPAUSED',
  PAUSED = 'PAUSED',
}
```

Two values for a boolean concept; `boolean paused` would be simpler.

### 12. `Alert.lifecycleState` — JSDoc contradicts the field (v2)

**Location:** `src/v2/model.ts:80-81`

```ts
/** Indicates whether the query is trashed. */
lifecycleState?: AlertLifecycleState | undefined;
```

JSDoc says "whether the query is trashed," but the field is on `Alert` and the enum is `AlertLifecycleState` with values `ACTIVE`/`DELETED`. The word "query" leaks from the underlying implementation (alerts wrap queries) into an `Alert` field's documentation.

### 13. `AlertLifecycleState.DELETED` vs v1 `LifecycleState.TRASHED` — vocabulary swap

**Location:** v1 `model.ts:24-27`; v2 `model.ts:34-37`

The method is still `trashAlert` (both versions), but in v1 the resulting state is `TRASHED` and in v2 it is `DELETED`. So in v2 you "trash" something and it becomes "deleted." The wire/JSDoc still references "trashed."

## Low severity

### 14. `pageToken` / `pageSize` / `nextPageToken` (both)

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

### 15. `ListAlertsRequest` plural vs `GetAlertRequest` singular (both)

Consistent with REST norms (`GET /alerts/{id}` singular, `GET /alerts` plural). No action recommended.

### 16. `Aggregation.STDDEV` — cryptic abbreviation (v2)

```ts
STDDEV = 'STDDEV',
```

`STANDARD_DEVIATION` or `STDEV` would be clearer; `STDDEV` is a SQL-server-ism.

### 17. `Aggregation.AVG` — cryptic abbreviation (v2)

`AVERAGE` would be consistent with `SUM`, `COUNT`, `MEDIAN`, `MIN`, `MAX`. The mix of short and full names inside one enum is the issue.

### 18. `AlertEvaluation.threshold` typed as `AlertOperand` — misleading (v2)

```ts
/** Threshold to user for alert evaluation, can be a column or a value. */
threshold?: AlertOperand | undefined;
```

The JSDoc admits the threshold can be a column — i.e., not actually a threshold value but another operand. The field name implies "fixed comparison number," the type allows "another column." The field name lies.

Also note the typo "Threshold to user" (should be "to use") — content, not naming, but worth fixing.

### 19. `LifecycleState` — missing domain prefix (v1)

v1 exports a global-looking `LifecycleState`. v2 corrects this to `AlertLifecycleState`.

### 20. `customBody` / `customSubject` (v1) vs `customSummary` / `customDescription` (v2)

Same data, different vocabulary. v1 = email metaphor, v2 = generic content metaphor. Users porting from v1 to v2 need a translation table.

### 21. `effectiveRunAs` (v2)

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

### 22. JSDoc verb/casing inconsistency (both)

**Location:** v2 `client.ts:68`, `client.ts:198`

```ts
/** Create Alert */
async createAlert(...) { ... }
/** Update alert */
async updateAlert(...) { ... }
```

`Create Alert` vs `Update alert` — different capitalization, different sentence shape, neither ends with a period (project rule). v1 uses full sentences (`/** Creates an alert. */`). Naming-adjacent.

## Observations

1. **Wire-format leakage.** Many names are direct translations of proto wire fields without consideration of how they read in TypeScript: `STDDEV`, `IS_NULL`, `UNKNOWN`. The audit rule "1:1 port" was followed faithfully but the language idioms suffer.

2. **v1→v2 vocabulary churn.** The package introduces multiple renames between versions (`AlertOperator` → `ComparisonOperator`, `LifecycleState` → `AlertLifecycleState`, `TRASHED` → `DELETED`, `AlertCondition` → `AlertEvaluation`, `customBody/Subject` → `customSummary/Description`). Some are improvements, some are lateral, some are regressions. Combined with `trashAlert` keeping its name while `TRASHED` becomes `DELETED`, the message-vs-method vocabulary is inconsistent.

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
