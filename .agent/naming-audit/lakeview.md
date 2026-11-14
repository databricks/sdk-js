# Naming Audit: lakeview

**Path:** `packages/lakeview/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks AI/BI Dashboards (formerly named "Lakeview"). CRUD of draft dashboards, publish/unpublish, schedule periodic refresh, and email subscriptions tied to schedules. Also includes a one-way migration entry point from the older "classic SQL" dashboards.
**Total weird names flagged:** 6

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 3     |
| Medium      | 3     |

## Summary table

| #  | Severity    | Location                              | Name                                                                                            | Category   |
| -- | ----------- | ------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| 1  | High        | package name                          | `lakeview`                                                                                      | 6          |
| 2  | High        | `model.ts` enum                       | `DashboardView`                                                                                 | 1          |
| 3  | High        | `client.ts` method / `model.ts` type  | `trashDashboard` / `TrashDashboardRequest` vs everywhere else `delete...`                       | 17         |
| 4  | Medium      | `model.ts` interface                  | `MigrateDashboardRequest`                                                                       | 17         |
| 5  | Medium      | `client.ts` method                    | `trashDashboard` vs everywhere else `delete...`                                                 | 17         |
| 6  | Medium      | `model.ts` interface                  | `PublishDashboardRequest` & `PublishedDashboard`                                                | 6, 12      |

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

**Location:** `src/v1/model.ts:7-13`

```ts
export const DashboardView = {
  /** Includes summary metadata from the dashboard. */
  DASHBOARD_VIEW_BASIC: 'DASHBOARD_VIEW_BASIC',
} as const;
export type DashboardView =
  | (typeof DashboardView)[keyof typeof DashboardView]
  | (string & {});
```

The type has only one member. It exists because the API anticipates further view modes (`DASHBOARD_VIEW_FULL`, etc.).

`View` is also a generic name in a Dashboards package (it overloads the HTML/UI sense of "view" with the "field mask" sense — e.g. `proto3` partial-response style).

**Category:** 1 (vague).

**Suggested name:** Rename to `DashboardFieldMask` / `DashboardResponseMode` (closer to its actual role: a partial-response selector).

**Rationale:** Without the doc comment on `ListDashboardsRequest.view`, the type name does not communicate that this is a "give me only summary fields" selector.

### 3. `trashDashboard()` / `TrashDashboardRequest` — verb diverges from the SDK-wide `delete`

**Location:** `src/v1/client.ts:687` (`trashDashboard`), `src/v1/model.ts:432` (`TrashDashboardRequest`)

The method uses `trash` and the type uses `Trash`, while CRUD-style endpoints elsewhere in the Databricks SDK use `Delete`/`delete`. The same `trash` method/type vocabulary survives only in `alerts` (`trashAlert` / `TrashAlertRequest`, both v1 and v2, flagged in `alerts.md`) and `queries` (`trashQuery`) — a three-package island against the SDK-wide `delete` verb.

The `trashDashboard()` method (verb `trash`) soft-deletes a dashboard. So the method verb and the type-name suffix share a vocabulary that none of the rest of the SDK uses.

**Category:** 17 (inconsistent action verb).

**Suggested name:** Rename the method and type to `deleteDashboard` / `DeleteDashboardRequest` so the verb matches the rest of the SDK. The cleanest is to rename method + type together.

**Rationale:** A single coherent verb. The `alerts`, `queries`, and `lakeview` soft-delete endpoints are the only places in the SDK that spell delete as `trash`.

---

## Medium severity

### 4. `MigrateDashboardRequest` / `migrateDashboard` — vague action verb

**Location:** `src/v1/model.ts:297`, `src/v1/client.ts:597`

"Migrate" can mean (a) copy and convert, (b) move-and-delete-source, (c) rewrite-in-place. The JSDoc on the method ("Migrates a classic SQL dashboard to Lakeview.") suggests (a): the source dashboard remains, a new AI/BI dashboard is created. The verb does not encode this.

**Category:** 17 (inconsistent action verb across the SDK).

**Suggested name:** `convertToLakeviewDashboard` / `importFromClassicSql` / `cloneFromClassicSql`. The verb should distinguish from `move`/`migrate-and-replace`.

**Rationale:** The other Databricks "migrate" endpoints (e.g. `tables.migrate`, `permissions.migrate`) actually move state. This one creates a new asset. Same verb, two operations.

### 5. `trashDashboard` — soft-delete method without a paired restore (see also #3)

**Location:** `src/v1/client.ts:687`

Beyond the verb-mismatch flagged in #3, the `trashDashboard` method is paired with no `restoreDashboard` or `untrashDashboard`. The method soft-deletes the dashboard, but the API doesn't expose how to undo it via the SDK — a caller has to use `updateDashboard(...)` to reactivate it. Discovery from method names alone gives no hint that "restore" exists.

**Category:** 17 (inconsistent action verb), see #3.

**Suggested name:** `deleteDashboard` (semantics-clear). Add `restoreDashboard` (or document `updateDashboard` as the restoration path in the `trashDashboard` JSDoc).

**Rationale:** Symmetry. `deletePermanently` is also unavailable here — soft-delete is the only delete.

### 6. `PublishDashboardRequest` vs `PublishedDashboard` — adjacent names with different roles

**Location:** `src/v1/model.ts:311`, `src/v1/model.ts:327`

`PublishDashboardRequest` is the input to `publishDashboard()`. `PublishedDashboard` is the response. The names are one letter apart (`Publish*` vs `Published*`). A code reader picking either out of an auto-complete list can grab the wrong one and the compiler will not immediately tell them apart at construction time — both are records with `warehouseId?: string`.

**Category:** 6 (misleading visual similarity), 12 (overlapping concepts).

**Suggested name:** `PublishDashboardRequest` → `PublishDashboardOptions` or `PublishDashboardInput`. The "Request" suffix doesn't distinguish on the auto-complete; an `Input`/`Options` suffix does.

**Rationale:** Reduce typo bugs. The Databricks SDK already uses `*Options` in `ClientOptions`, `CallOptions`, so the pattern is precedented.
