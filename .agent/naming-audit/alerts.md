# Naming Audit: alerts

**Path:** `packages/alerts/src/{v1,v2}/`
**Versions audited:** v1, v2
**Total weird names flagged:** 7 (rescan on 2026-05-28; wire-identifier renames pruned on 2026-06-02)

## Summary table

| # | Severity | Version | Location | Name | Category |
|---|----------|---------|----------|------|----------|
| 1 | High | v2 | `model.ts` enum | `Aggregation` | Vague/generic, no domain prefix |
| 2 | High | v2 | `model.ts` interface | `AlertRunAs` | Verb-as-noun, reserved-word-feel |
| 3 | High | v2 | `model.ts` field | `Alert.queryText` | Field contradicts type domain (alert holds raw SQL) |
| 4 | Medium | both | `client.ts` method | `trashAlert` | Inconsistent action verb (mixes with `delete`) |
| 5 | Medium | both | `model.ts` type | `TrashAlertRequest` | Inconsistent verb (rest of SDK uses `Delete`) |
| 6 | Medium | v2 | `model.ts` interface | `CronSchedule` | Generic/global name in domain package |
| 7 | Low | v1 | `model.ts` enum | `LifecycleState` | Missing domain prefix (v2 fixes to `AlertLifecycleState`) |

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

### 2. `AlertRunAs` — verb-as-noun (v2)

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

### 3. `Alert.queryText` — field contradicts type domain (v2)

**Location:** `src/v2/model.ts:68-69`

```ts
/** Text of the query to be run. */
queryText?: string | undefined;
```

A type named `Alert` carrying a raw SQL string makes the alert object responsible for storage of its query — a v1→v2 change that conflates the alert configuration with the query content. v1 cleanly held `queryId` (FK to a Query resource). The name itself is fine; the placement on `Alert` is the smell.

## Medium severity

### 4. `trashAlert` — inconsistent action verb (both)

**Location:** `src/v1/client.ts:180-206`; `src/v2/client.ts:178-210`

```ts
/** Moves an alert to the trash. ... A trashed alert is permanently deleted after 30 days. */
async trashAlert(...) { ... DELETE ... }
```

The HTTP verb is `DELETE`, the docstring talks about "permanently deleted," but the method is `trashAlert`. Across the SDK this is the only place where soft-delete uses `trash`-prefix. Most resources use `deleteX` (and the v2 enum value is `AlertLifecycleState.DELETED`, not `TRASHED`).

### 5. `TrashAlertRequest` — same as 4, in the type layer (both)

**Location:** `src/v1/model.ts:187-189`; `src/v2/model.ts:218-222`

Same verb inconsistency at the type layer.

### 6. `CronSchedule` — generic name in a single-domain package (v2)

**Location:** `src/v2/model.ts:181-195`

A top-level type called `CronSchedule` in a package whose only consumer is alerts. If/when another package wants its own cron schedule shape, the user has two `CronSchedule`s. `AlertSchedule` would domain-prefix consistently with the rest of v2.

## Low severity

### 7. `LifecycleState` — missing domain prefix (v1)

**Location:** `src/v1/model.ts:24-27`

v1 exports a global-looking `LifecycleState`. v2 corrects this to `AlertLifecycleState`.
