# Naming Audit: lakeview

**Path:** `packages/lakeview/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks AI/BI Dashboards (formerly named "Lakeview"). CRUD of draft dashboards, publish/unpublish, schedule periodic refresh, and email subscriptions tied to schedules. Also includes a one-way migration entry point from the older "classic SQL" dashboards.
**Total weird names flagged:** 16

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 6     |
| Medium      | 5     |
| Low         | 2     |
| Observation | 3     |

## Summary table

| #  | Severity    | Location                              | Name                                                                                            | Category   |
| -- | ----------- | ------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| 1  | High        | package name                          | `lakeview`                                                                                      | 6          |
| 2  | High        | `model.ts` enum                       | `DashboardView`                                                                                 | 1, 7       |
| 3  | High        | `model.ts` enum                       | `LifecycleState`                                                                                | 1, 12      |
| 4  | High        | `model.ts` enum value                 | `LifecycleState.TRASHED` vs method `trashDashboard`                                             | 17         |
| 5  | High        | `model.ts` interface                  | `Dashboard`                                                                                     | 1, 15      |
| 6  | High        | `model.ts` interface                  | `PublishedDashboard`                                                                            | 12         |
| 7  | Medium      | `model.ts` interface                  | `CronSchedule`                                                                                  | 1          |
| 8  | Medium      | `model.ts` enum                       | `SchedulePauseStatus`                                                                           | 1, 7       |
| 9  | Medium      | `model.ts` interface                  | `MigrateDashboardRequest`                                                                       | 17         |
| 10 | Medium      | `client.ts` method                    | `trashDashboard` vs everywhere else `delete...`                                                 | 17         |
| 11 | Medium      | `model.ts` interface                  | `PublishDashboardRequest` & `PublishedDashboard`                                                | 6, 12      |
| 12 | Low         | `model.ts` field                      | `Subscription.createdByUserId` typed `number`                                                   | 19, 16     |
| 13 | Low         | `model.ts` field                      | `Dashboard.etag` / `Schedule.etag` / `Subscription.etag`                                        | 3          |
| 14 | Observation | `model.ts` field                      | `Dashboard.path` and `Dashboard.parentPath`                                                     | 15, 6      |
| 15 | Observation | `index.ts`                            | Mixed `export {...}` for enums and `export type {...}` for interfaces                           | n/a        |
| 16 | Observation | URL paths                             | `/api/2.0/lakeview/...` URL prefix still uses old name                                          | 6          |

---

## High severity

### 1. `lakeview` — package name uses the old codename (rebrand mismatch)

**Location:** `packages/lakeview/`, `index.ts`, `client.ts`, all URL paths `/api/2.0/lakeview/...`

The product is documented and marketed as "AI/BI Dashboards" (formerly "Lakeview"). The codename `lakeview` survives at every level of the SDK surface:

- The npm/workspace package name is `lakeview`.
- The URL paths embed `lakeview` (`/api/2.0/lakeview/dashboards`), which is a wire-format concern the SDK cannot change.
- Documentation strings still use both names interchangeably — e.g. `MigrateDashboardRequest.displayName`: "Display name for the new Lakeview dashboard." and `MigrateDashboardRequest.parentPath`: "the migrated Lakeview dashboard".
- Exported file extension `.lvdash.json` (referenced in `Dashboard.path` doc) preserves the old prefix.

**Category:** 6 (misleading — old name persists).

**Suggested name:** Either rename the package to `aibidashboards` / `dashboards` (with a re-export shim under the old name during deprecation), or accept the URL constraint and document the rename explicitly in the package-level JSDoc (`This package wraps the AI/BI Dashboards API. The wire path /api/2.0/lakeview/... preserves the original codename.`). Today the package gives no hint that "Lakeview" and "AI/BI Dashboards" are the same product, so search hits for the marketing name return nothing.

**Rationale:** Discoverability. A user reading Databricks docs for "AI/BI Dashboards" will not find this package by name search. The Go SDK has the same problem, but TS has the chance to fix the surface visible to TS users at construction time (`new Client(...)`).

### 2. `DashboardView` — single-value enum with a generic, role-obscuring name

**Location:** `src/v1/model.ts:6-9`

```ts
export enum DashboardView {
  /** Includes summary metadata from the dashboard. */
  DASHBOARD_VIEW_BASIC = 'DASHBOARD_VIEW_BASIC',
}
```

The enum has only one member. It exists because the API anticipates further view modes (`DASHBOARD_VIEW_FULL`, etc.) — but until those exist the enum is a confusing single-value gate.

`View` is also a generic name in a Dashboards package (it overloads the HTML/UI sense of "view" with the "field mask" sense — e.g. `proto3` partial-response style).

**Category:** 1 (vague), 7 (overengineering for binary).

**Suggested name:** Either rename to `DashboardFieldMask` / `DashboardResponseMode` (closer to its actual role: a partial-response selector), or, until there is a second value, replace `view?: DashboardView` with `summaryOnly?: boolean` and delete the enum.

**Rationale:** Without the doc comment on `ListDashboardsRequest.view`, the type name does not communicate that this is a "give me only summary fields" selector.

### 3. `LifecycleState` — domain-detached enum that overlaps with other packages

**Location:** `src/v1/model.ts:11-16`

```ts
export enum LifecycleState {
  /** The dashboard is in an active state (not-trashed). */
  ACTIVE = 'ACTIVE',
  /** The dashboard is in a trashed state. */
  TRASHED = 'TRASHED',
}
```

`LifecycleState` is a top-level export with no domain prefix. Other Databricks SDK packages also use the name (e.g. `alerts.LifecycleState`, `queries.LifecycleState`) — same name, different sets of values. Cross-package imports clash:

```ts
import {LifecycleState as DashLifecycle} from '@databricks/sdk-lakeview';
import {LifecycleState as AlertLifecycle} from '@databricks/sdk-alerts';
```

**Category:** 1 (vague), 12 (duplicate concepts across packages).

**Suggested name:** `DashboardLifecycleState` (matches the v2 alerts pattern `AlertLifecycleState`).

**Rationale:** Eliminates the import-rename ritual. Consistent with the rest of the SDK after the alerts v2 refactor.

### 4. `LifecycleState.TRASHED` vs `trashDashboard()` — split vocabulary inherited from pre-v2 alerts

**Location:** `src/v1/model.ts:15`, `src/v1/client.ts:592` (`trashDashboard`), `src/v1/model.ts:403` (`TrashDashboardRequest`)

The enum uses `TRASHED`, the method uses `trash`, the type uses `Trash`. **Same package, same operation, three forms**. Meanwhile every other CRUD-style endpoint in the Databricks SDK uses `Delete`/`delete`. Alerts has the *exact* same issue (flagged in `alerts.md` #11 and #12); it was kept in v1 and renamed to `DELETED` in alerts v2 — leaving Lakeview as an outlier.

The `LifecycleState.TRASHED` value is paired with a method called `trashDashboard()` (verb `trash`) and a method `getDashboard()` that returns `lifecycleState: TRASHED` after a soft-delete. So the lifecycle word, the method verb, and the type-name suffix all share a vocabulary that none of the rest of the SDK uses.

**Category:** 17 (inconsistent action verb).

**Suggested name:** Either keep `trashDashboard` and rename `TRASHED → DELETED` (mirrors alerts v2 — but then the method verb mismatches its own state) or rename both to `deleteDashboard` + `DELETED`. The cleanest is to rename method + type + state value to `delete`/`Delete`/`DELETED` together.

**Rationale:** A single coherent verb. The Trash → Delete migration is partially complete in other packages and lakeview is behind.

### 5. `Dashboard` — overloaded top-level type

**Location:** `src/v1/model.ts:93-136`

`Dashboard` is the top-level type for the *draft* dashboard. The package then exposes `PublishedDashboard` as a *different* shape for the published-state mirror. A user reading the API thinks `Dashboard` means "any dashboard"; in fact it means "draft dashboard". The `lifecycleState` field on `Dashboard` is `ACTIVE`/`TRASHED` — and never `PUBLISHED`, because a published dashboard is the wholly separate `PublishedDashboard` type. Nothing in the type name conveys "draft".

This is compounded by Databricks having (1) classic SQL dashboards (a separate API), (2) AI/BI dashboards / lakeview dashboards (this API), (3) genie dashboards, (4) usage dashboards. The bare name `Dashboard` is therefore severely overloaded both within the company and within the SDK.

**Category:** 1 (vague/generic), 15 (generic type losing meaning at site).

**Suggested name:** `DraftDashboard` (paired with `PublishedDashboard`). Both are draft and published views of the same underlying resource, so the symmetry is desirable.

**Rationale:** Without the rename the API is asymmetric: `getDashboard()` returns "the draft view", `getPublishedDashboard()` returns "the published view", but only one of those calls makes the draft/published nature explicit.

### 6. `PublishedDashboard` — projection sibling of `Dashboard`, missing structural identity

**Location:** `src/v1/model.ts:315-324`

```ts
export interface PublishedDashboard {
  displayName?: string | undefined;
  warehouseId?: string | undefined;
  embedCredentials?: boolean | undefined;
  revisionCreateTime?: Temporal.Instant | undefined;
}
```

No `dashboardId`. No `etag`. No `serializedDashboard`. No reference back to the parent `Dashboard`. So `PublishedDashboard` is a *partial mirror* of the draft `Dashboard` resource, but the only thing tying them together is the URL path the user used to fetch it. The name `PublishedDashboard` implies "a full dashboard in the published state", but the type is in practice "the metadata of the latest publish action".

**Category:** 12 (duplicate concept relative to `Dashboard`).

**Suggested name:** `PublishedDashboardSnapshot` or `PublishMetadata`. If the long-term intent is for the type to contain the full published content, the type name is fine but it should at least carry the `dashboardId` of its parent.

**Rationale:** Today every caller of `getPublishedDashboard()` has to remember the `dashboardId` they passed in to use the response. The type should round-trip.

---

## Medium severity

### 7. `CronSchedule` — generic type name in a single-domain package

**Location:** `src/v1/model.ts:80-91`

```ts
export interface CronSchedule {
  quartzCronExpression?: string | undefined;
  timezoneId?: string | undefined;
}
```

The package exports a top-level `CronSchedule`. The same name appears in `alerts/v2`, `jobs` (similar concept), `pipelines` (similar concept). Each defines its own. Across the SDK there is no shared "this is a cron expression with a timezone" type — every team duplicates the two-field interface.

**Category:** 1 (generic name in domain package).

**Suggested name:** Either accept the duplication (matches Go SDK's package-local types) and rename to `DashboardCronSchedule`, or extract a shared core type. The audit recommends `DashboardCronSchedule` since the user-facing concept is "a cron schedule that the dashboards service understands".

**Rationale:** Future-proofing: the field set may diverge from other services' cron-schedule types (some add a `pauseStatus`, some add a `nextFireTime`). A domain-prefixed name prevents `import { CronSchedule } from '@databricks/sdk-lakeview'` from being a confusing rename.

### 8. `SchedulePauseStatus` — domain prefix only partially applied

**Location:** `src/v1/model.ts:18-21`

```ts
export enum SchedulePauseStatus {
  UNPAUSED = 'UNPAUSED',
  PAUSED = 'PAUSED',
}
```

Same enum-name shape as `alerts/v2.SchedulePauseStatus` — i.e. the prefix is `Schedule`, not `Dashboard` or `Lakeview`. So we have a `Schedule`-prefixed enum inside the lakeview package and an identical-looking enum inside the alerts package. The two are not interchangeable but they look identical at the type level — a developer copying code between packages might think they are.

Also: a two-value enum named `*Status` for two paused-or-not states is overengineering. A boolean (`paused: boolean`) reads more naturally and prevents the case where a future `SUSPENDED` value silently changes paused-checks.

**Category:** 1 (overly generic prefix), 7 (overly verbose for binary).

**Suggested name:** Either rename to `DashboardSchedulePauseStatus` (preserves enum), or collapse to `Schedule.paused?: boolean`. The former retains the option for a third state; the latter is what most users will expect.

**Rationale:** Binary status enums are an anti-pattern in TS where booleans are first-class. The Go SDK is constrained to enums (no booleans for proto), but the TS SDK is not.

### 9. `MigrateDashboardRequest` / `migrateDashboard` — vague action verb

**Location:** `src/v1/model.ts:285`, `src/v1/client.ts:540`

"Migrate" can mean (a) copy and convert, (b) move-and-delete-source, (c) rewrite-in-place. The JSDoc on the method ("Migrates a classic SQL dashboard to Lakeview.") suggests (a): the source dashboard remains, a new AI/BI dashboard is created. The verb does not encode this.

**Category:** 17 (inconsistent action verb across the SDK).

**Suggested name:** `convertToLakeviewDashboard` / `importFromClassicSql` / `cloneFromClassicSql`. The verb should distinguish from `move`/`migrate-and-replace`.

**Rationale:** The other Databricks "migrate" endpoints (e.g. `tables.migrate`, `permissions.migrate`) actually move state. This one creates a new asset. Same verb, two operations.

### 10. `trashDashboard` — soft-delete method without a paired restore (see also #4)

**Location:** `src/v1/client.ts:592`

Beyond the verb-mismatch with `LifecycleState.TRASHED`, the `trashDashboard` method is paired with no `restoreDashboard` or `untrashDashboard`. The method moves the dashboard into `TRASHED` lifecycle state, but the API doesn't expose how to undo it via the SDK — a caller has to use `updateDashboard({ dashboard: { lifecycleState: ACTIVE } })`. Discovery from method names alone gives no hint that "restore" exists.

**Category:** 17 (inconsistent action verb), see #4.

**Suggested name:** `deleteDashboard` (semantics-clear). Add `restoreDashboard` (or document `updateDashboard` as the restoration path in the `trashDashboard` JSDoc).

**Rationale:** Symmetry. `deletePermanently` is also unavailable here — soft-delete is the only delete.

### 11. `PublishDashboardRequest` vs `PublishedDashboard` — adjacent names with different roles

**Location:** `src/v1/model.ts:299`, `src/v1/model.ts:315`

`PublishDashboardRequest` is the input to `publishDashboard()`. `PublishedDashboard` is the response. The names are one letter apart (`Publish*` vs `Published*`). A code reader picking either out of an auto-complete list can grab the wrong one and the compiler will not immediately tell them apart at construction time — both are records with `warehouseId?: string`.

**Category:** 6 (misleading visual similarity), 12 (overlapping concepts).

**Suggested name:** `PublishDashboardRequest` → `PublishDashboardOptions` or `PublishDashboardInput`. The "Request" suffix doesn't distinguish on the auto-complete; an `Input`/`Options` suffix does.

**Rationale:** Reduce typo bugs. The Databricks SDK already uses `*Options` in `ClientOptions`, `CallOptions`, so the pattern is precedented.

---

## Low severity

### 12. `Subscription.createdByUserId` typed as `number`

**Location:** `src/v1/model.ts:360`

```ts
/** UserId of the user who adds subscribers (users or notification destinations) to the dashboard's schedule. */
createdByUserId?: number | undefined;
```

User IDs in Databricks are 64-bit integers; storing them as JS `number` overflows above 2^53. The Databricks JS SDK has the same problem elsewhere, but it surfaces visibly here because the field is part of every Subscription response.

Also, the doc string is past-tense verb plus present-tense ("adds") — inconsistent.

**Category:** 19 (underspecified ID — `number` is wrong storage), 16 (field contradicts wire format which is int64).

**Suggested name:** Keep `createdByUserId`, change type to `string` (matching the SCIM API's `users/<id>` convention) or `bigint`. JSDoc should clarify the format.

**Rationale:** Silent overflow is the worst kind of bug.

### 13. `Dashboard.etag`, `Schedule.etag`, `Subscription.etag` — `etag` lowercase casing

**Location:** `src/v1/model.ts:118`, `src/v1/model.ts:341`, `src/v1/model.ts:365`

Consistent within the package, but the HTTP spec spells it `ETag`. Most TS SDKs use lowercase, so it's defensible. Flagged for whole-codebase consistency (compare `alerts.md` #14 on `notifyOnOk` for similar acronym-casing concerns).

**Category:** 3.

**Suggested name:** Keep `etag`. Note the project convention.

---

## Observations

### 14. `Dashboard.path` vs `Dashboard.parentPath` — overlap

**Location:** `src/v1/model.ts:103`, `src/v1/model.ts:135`

```ts
path?: string | undefined;          // workspace path of the dashboard asset, including the file name
parentPath?: string | undefined;    // workspace path of the folder containing the dashboard
```

`path = parentPath + '/' + filename`. The two fields are derivable from each other (given a known filename rule). Maintaining both is convenient for clients but means clients must keep them in sync on writes. Field names give no hint about the relationship.

**Category:** 15 (generic), 6 (silently redundant).

**Suggested name:** Keep both. Either rename `path → fullPath` for symmetry, or document the relationship in JSDoc on both fields.

### 15. `index.ts` — mixed `export {...}` and `export type {...}`

**Location:** `src/v1/index.ts:5,7-43`

```ts
export {DashboardView, LifecycleState, SchedulePauseStatus} from './model';
export type {AuthorizationDetails, ...} from './model';
```

Enums are exported as values (correct — they have runtime representation); interfaces are exported as types (correct — type-only). The pattern is right; flagging only because a reader scanning the index file might miss the distinction. Consistent with other SDK packages.

### 16. URL paths still use `lakeview`

**Location:** Every method's URL constant in `client.ts`, e.g. line 105: `/api/2.0/lakeview/dashboards`

Wire-format. The SDK cannot rename the URL without server cooperation. Flagged so that the rebrand mismatch noted in #1 is understood as partial (TS name is the lever; URLs are not).

**Category:** 6.

---

## Net assessment

Lakeview / AI/BI Dashboards is a relatively small surface (5 enums-and-resources, 19 client methods) but the naming smells cluster around:

1. **The rebrand from "Lakeview" to "AI/BI Dashboards"** is incomplete — the package name and URLs preserve the old codename, while the JSDoc mixes the two.
2. **The trash/delete vocabulary split** (#4, #10) is inherited from the alerts package's pre-v2 design — already fixed in alerts v2 but not in lakeview.
3. **Generic top-level type names** (`Dashboard`, `LifecycleState`, `CronSchedule`, `SchedulePauseStatus`) overlap with other packages in the SDK monorepo and force consumers to import-rename.
4. **64-bit user IDs typed as `number`** (#12) silently truncate above 2^53. Same issue exists in other packages but is unsurfaced here.

If only one change were possible, completing the trash/delete vocabulary unification (renaming `trashDashboard` + `TRASHED` to the `delete`/`DELETED` family used by alerts v2) would remove the most visible inconsistency.

---
