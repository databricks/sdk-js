# Naming Audit: lakeview

**Path:** `packages/lakeview/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks AI/BI Dashboards (formerly named "Lakeview"). CRUD of draft dashboards, publish/unpublish, schedule periodic refresh, and email subscriptions tied to schedules. Also includes a one-way migration entry point from the older "classic SQL" dashboards.
**Total weird names flagged:** 42

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 8     |
| Medium      | 17    |
| Low         | 11    |
| Observation | 6     |

## Summary table

| #  | Severity    | Location                              | Name                                                                                            | Category   |
| -- | ----------- | ------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| 1  | High        | package name                          | `lakeview`                                                                                      | 6          |
| 2  | High        | `model.ts` enum                       | `DashboardView`                                                                                 | 1, 18      |
| 3  | High        | `model.ts` enum                       | `LifecycleState`                                                                                | 1, 12      |
| 4  | High        | `model.ts` enum value                 | `LifecycleState.TRASHED` vs method `trashDashboard`                                             | 17         |
| 5  | High        | `model.ts` interface                  | `Dashboard`                                                                                     | 1, 15      |
| 6  | High        | `model.ts` interface                  | `PublishedDashboard`                                                                            | 12         |
| 7  | High        | `model.ts` interface (nested)         | `AuthorizationDetails_GrantRule`                                                                | 4, 14      |
| 8  | High        | `model.ts` interface (nested triplet) | `Subscription_Subscriber`, `Subscription_Subscriber_User`, `Subscription_Subscriber_Destination` | 4, 14      |
| 9  | Medium      | `model.ts` interface                  | `CronSchedule`                                                                                  | 1          |
| 10 | Medium      | `model.ts` field                      | `CronSchedule.quartzCronExpression`                                                             | 14, 20     |
| 11 | Medium      | `model.ts` field                      | `CronSchedule.timezoneId`                                                                       | 19         |
| 12 | Medium      | `model.ts` field                      | `Schedule.cronSchedule`                                                                         | 20         |
| 13 | Medium      | `model.ts` enum                       | `SchedulePauseStatus`                                                                           | 1, 7       |
| 14 | Medium      | `model.ts` field                      | `Schedule.pauseStatus`                                                                          | 6, 20      |
| 15 | Medium      | `model.ts` interface                  | `MigrateDashboardRequest`                                                                       | 17         |
| 16 | Medium      | `model.ts` field                      | `MigrateDashboardRequest.sourceDashboardId`                                                     | 16         |
| 17 | Medium      | `model.ts` field                      | `MigrateDashboardRequest.updateParameterSyntax`                                                 | 6, 13, 15  |
| 18 | Medium      | `client.ts` method                    | `trashDashboard` vs everywhere else `delete...`                                                 | 17         |
| 19 | Medium      | `model.ts` interface                  | `PublishDashboardRequest` & `PublishedDashboard`                                                | 6, 12      |
| 20 | Medium      | `model.ts` interface                  | `GetPublishedDashboardEmbeddedRequest`                                                          | 1, 7       |
| 21 | Medium      | `model.ts` field                      | `GetPublishedDashboardTokenInfoResponse.customClaim`                                            | 15         |
| 22 | Medium      | `model.ts` field                      | `AuthorizationDetails.type`                                                                     | 10, 15     |
| 23 | Medium      | `model.ts` field                      | `AuthorizationDetails.resourceLegacyAclPath`                                                    | 6, 14, 16  |
| 24 | Medium      | `model.ts` field                      | `Subscription.skipNotify`                                                                       | 1, 14      |
| 25 | Medium      | `model.ts` field                      | `Subscription.createdByUserId` typed `number`                                                   | 19, 16     |
| 26 | Medium      | `model.ts` field                      | `Subscription_Subscriber_User.userId` typed `number`                                            | 19, 16     |
| 27 | Low         | `model.ts` field                      | `Dashboard.warehouseId`                                                                         | 19         |
| 28 | Low         | `model.ts` field                      | `Schedule.warehouseId`                                                                          | 19, 12     |
| 29 | Low         | `model.ts` field                      | `Dashboard.etag` / `Schedule.etag` / `Subscription.etag`                                        | 3          |
| 30 | Low         | `model.ts` field                      | `Dashboard.path` and `Dashboard.parentPath`                                                     | 15, 6      |
| 31 | Low         | `model.ts` field                      | `Dashboard.serializedDashboard`                                                                 | 20         |
| 32 | Low         | `model.ts` field                      | `Dashboard.lifecycleState`                                                                      | 15         |
| 33 | Low         | `model.ts` field                      | `Dashboard.createTime` / `updateTime` & `Schedule.*` / `Subscription.*`                         | 9          |
| 34 | Low         | `model.ts` field                      | `PublishedDashboard.revisionCreateTime`                                                         | 15         |
| 35 | Low         | `model.ts` field                      | `PublishDashboardRequest.embedCredentials`                                                      | 7          |
| 36 | Low         | `model.ts` field                      | `ListDashboardsRequest.showTrashed`                                                             | 13, 17     |
| 37 | Low         | `model.ts` field                      | `DashboardView.DASHBOARD_VIEW_BASIC`                                                            | 2, 18      |
| 38 | Observation | `model.ts` field                      | `Dashboard.dashboardId` (tautology in `dashboard.dashboardId`)                                  | 8, 20      |
| 39 | Observation | `model.ts` field                      | `CreateDashboardRequest.datasetCatalog`/`datasetSchema`                                         | 15         |
| 40 | Observation | `model.ts` field                      | `ListSchedulesRequest.dashboardId` doc typo                                                     | 9          |
| 41 | Observation | `model.ts` field                      | `Subscription_Subscriber.userSubscriber` / `destinationSubscriber`                              | 8, 20      |
| 42 | Observation | `index.ts`                            | Mixed `export {...}` for enums and `export type {...}` for interfaces                           | n/a        |
| 43 | Observation | URL paths                             | `/api/2.0/lakeview/...` URL prefix still uses old name                                          | 6          |

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

### 2. `DashboardView` — enum with a single value (`DASHBOARD_VIEW_BASIC`)

**Location:** `src/v1/model.ts:6-9`

```ts
export enum DashboardView {
  /** Includes summary metadata from the dashboard. */
  DASHBOARD_VIEW_BASIC = 'DASHBOARD_VIEW_BASIC',
}
```

The enum has only one member, and the member's name is prefixed with the enum name (proto-style "always include the type name in every value"). The literal `DashboardView.DASHBOARD_VIEW_BASIC` reads twice: `DashboardView` then `DASHBOARD_VIEW_BASIC`. The enum exists only because the API anticipates further view modes (`DASHBOARD_VIEW_FULL`, etc.) — but until those exist the enum is a confusing single-value gate.

`View` is also a generic name in a Dashboards package (it overloads the HTML/UI sense of "view" with the "field mask" sense — e.g. `proto3` partial-response style).

**Category:** 1 (vague), 18 (long enum value).

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

### 4. `LifecycleState.TRASHED` vs `trashDashboard()` — split vocabulary inside one package

**Location:** `src/v1/model.ts:15`, `src/v1/client.ts:653` (`trashDashboard`), `src/v1/model.ts:429` (`TrashDashboardRequest`)

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

**Location:** `src/v1/model.ts:323-332`

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

### 7. `AuthorizationDetails_GrantRule` — proto nested-message style leaking into TS

**Location:** `src/v1/model.ts:45-52`

```ts
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface AuthorizationDetails_GrantRule {
  permissionSet?: string | undefined;
}
```

Underscore-separated identifier in a TS interface name. The comment acknowledges the violation. The choice preserves the protobuf path (`message AuthorizationDetails.GrantRule`) and helps with grep'ing through generated code, but for consumers the type appears as `AuthorizationDetails_GrantRule` everywhere — an uncomfortable identifier to type and read.

The same package re-exports it from `index.ts`, so the underscore is part of the public API surface.

**Category:** 4 (underscores in TS identifiers), 14 (Go/Java/proto-style name).

**Suggested name:** `GrantRule` (top-level) or `AuthorizationGrantRule`. There is no other `GrantRule` in this package, so the bare name is unambiguous. If naming nesting is desired, namespace-merging is the idiomatic TS pattern:

```ts
export interface AuthorizationDetails { ... }
export namespace AuthorizationDetails {
  export interface GrantRule { ... }
}
// Use site: AuthorizationDetails.GrantRule
```

**Rationale:** TypeScript supports namespace-merging for exactly this case. The underscore form is grep-friendly but ugly; the namespace form is grep-friendly *and* readable.

### 8. `Subscription_Subscriber`, `Subscription_Subscriber_User`, `Subscription_Subscriber_Destination` — three nested levels of underscore-named types

**Location:** `src/v1/model.ts:403-427`

```ts
export interface Subscription_Subscriber { ... }
export interface Subscription_Subscriber_Destination { ... }
export interface Subscription_Subscriber_User { ... }
```

Three more proto-nested types with underscores. The naming becomes especially awkward when used: `Subscription_Subscriber_User.userId`, `Subscription_Subscriber_Destination.destinationId`. Each layer of nesting adds a `_Subscriber`, doubling the prefix length. The double `_Subscriber_Subscriber` flavor (`Subscription_Subscriber` itself is the discriminated union, and `Subscription_Subscriber_User` is a variant of it) is especially confusing — at a glance you can't tell which one is the union and which is the leg.

Together with `AuthorizationDetails_GrantRule` (above), this is the dominant naming smell in the file: four public types whose names violate `@typescript-eslint/naming-convention` and require suppressions.

**Category:** 4, 14.

**Suggested name:** `Subscriber`, `UserSubscriber`, `DestinationSubscriber` — and a top-level discriminated union `Subscriber = UserSubscriber | DestinationSubscriber`. Or namespace-merging under `Subscription` as in #7.

**Rationale:** A real discriminated union in TS is more useful than a `oneof`-style "both fields optional, only one is set" interface. The current type allows both `userSubscriber` and `destinationSubscriber` to be undefined or both populated simultaneously — the type system does not enforce the "mutually exclusive" rule that the JSDoc claims.

---

## Medium severity

### 9. `CronSchedule` — generic type name in a single-domain package

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

### 10. `CronSchedule.quartzCronExpression` — implementation-detail leak and type-suffix tautology

**Location:** `src/v1/model.ts:85`

```ts
/**
 * A cron expression using quartz syntax. EX: `0 0 8 * * ?` represents everyday at 8am.
 */
quartzCronExpression?: string | undefined;
```

Two concerns:

1. `quartz` exposes the JVM scheduler library (Quartz Scheduler). A TypeScript SDK user will not know what "Quartz syntax" is, and even if they do, the *only* cron syntax the API accepts is Quartz — calling it out by name only serves to confuse beginners who write standard cron (5 fields instead of 6).
2. `cronExpression` is a type-suffix tautology — the field is on a type called `CronSchedule`; calling the field `expression` (or even just `cron`) is enough.

**Category:** 14 (Java implementation detail leak), 20 (type-suffix tautology).

**Suggested name:** `expression` (with the doc clarifying "Quartz 6-field cron syntax: `seconds minutes hours dayOfMonth month dayOfWeek`"). The doc, not the field name, should explain the dialect.

**Rationale:** The wire format `quartz_cron_expression` is locked, but the TS name is not. A simple, accurate field name with the dialect in the doc is more usable.

### 11. `CronSchedule.timezoneId` — "Id" suffix is misleading

**Location:** `src/v1/model.ts:90`

```ts
/**
 * A Java timezone id. The schedule will be resolved with respect to this timezone.
 */
timezoneId?: string | undefined;
```

The field carries an IANA timezone name like `"America/Los_Angeles"`. That is not an "id" in any normal sense (no numeric handle, no opaque token); it's a string identifier in a documented registry. The doc also locks the value space to "Java timezone id" — meaning the JVM TZ database, which is IANA-compatible but not guaranteed identical (some abbreviations like `EST`, `PST` are accepted in Java but ambiguous in IANA).

**Category:** 19 (underspecified ID — actually a string name).

**Suggested name:** `timezone` (or `tz`), with the doc specifying "IANA timezone name (e.g. 'America/Los_Angeles' or 'UTC')". Drop the "Java" qualifier — JS users do not need to know the backend's runtime.

**Rationale:** `timezoneId` makes callers think there's a separate `getTimezones()` API that returns IDs.

### 12. `Schedule.cronSchedule` — type-suffix tautology

**Location:** `src/v1/model.ts:358`

```ts
export interface Schedule {
  ...
  cronSchedule?: CronSchedule | undefined;
  ...
}
```

The field name and type name are the same. `schedule.cronSchedule.expression` reads as "schedule's cron-schedule's expression" — the middle term is redundant. Compare to `Schedule.cron` or `Schedule.cronExpression` (with `CronSchedule` as the type), which read as `schedule.cron.expression`.

**Category:** 20 (type-suffix tautology).

**Suggested name:** `cron: CronSchedule`. Field shows up at use sites as `schedule.cron.expression`, which is the intended mental model.

**Rationale:** Field names should describe the *role* the value plays in the parent, not echo the type. The role is "the cron part of this schedule".

### 13. `SchedulePauseStatus` — domain prefix only partially applied

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

### 14. `Schedule.pauseStatus` — field describes a control input, not a status

**Location:** `src/v1/model.ts:360`

```ts
/** The status indicates whether this schedule is paused or not. */
pauseStatus?: SchedulePauseStatus | undefined;
```

"Status" implies read-only state (something the system reports). But this field is also writable — clients send `pauseStatus: PAUSED` to *cause* the pause. The field is therefore the pause *setting*, not the pause *status*. The doc reinforces the misuse ("indicates whether…").

**Category:** 6 (misleading), 20 (the type ends in `Status` and the field starts with `pauseStatus` — overlap).

**Suggested name:** `paused: boolean` (see #13), or `pauseSetting`/`pauseMode`. Reserve `*Status` for read-only state.

**Rationale:** Read/write distinction. If the user only learns the field name, they will not predict that setting `UNPAUSED` is how you un-pause.

### 15. `MigrateDashboardRequest` / `migrateDashboard` — vague action verb

**Location:** `src/v1/model.ts:293`, `src/v1/client.ts:574`

"Migrate" can mean (a) copy and convert, (b) move-and-delete-source, (c) rewrite-in-place. The JSDoc on the method ("Migrates a classic SQL dashboard to Lakeview.") suggests (a): the source dashboard remains, a new AI/BI dashboard is created. The verb does not encode this.

**Category:** 17 (inconsistent action verb across the SDK).

**Suggested name:** `convertToLakeviewDashboard` / `importFromClassicSql` / `cloneFromClassicSql`. The verb should distinguish from `move`/`migrate-and-replace`.

**Rationale:** The other Databricks "migrate" endpoints (e.g. `tables.migrate`, `permissions.migrate`) actually move state. This one creates a new asset. Same verb, two operations.

### 16. `MigrateDashboardRequest.sourceDashboardId` — domain mismatch

**Location:** `src/v1/model.ts:295`

```ts
/** UUID of the dashboard to be migrated. */
sourceDashboardId?: string | undefined;
```

The package documents `dashboardId` as identifying a Lakeview / AI/BI dashboard. `sourceDashboardId` here is a **classic SQL dashboard** ID — a different ID space, fetched from a different API (`/api/2.0/sql/dashboards/{id}`). Using the same `dashboardId` type-name suggests they are interchangeable; they are not.

**Category:** 16 (field contradicting type domain).

**Suggested name:** `sourceLegacyDashboardId` / `classicSqlDashboardId` / `sqlDashboardId`. JSDoc should call out the ID space explicitly.

**Rationale:** Cross-API IDs that share a name are a frequent source of integration bugs.

### 17. `MigrateDashboardRequest.updateParameterSyntax` — confusing default + leaky implementation hint

**Location:** `src/v1/model.ts:300-304`

```ts
/**
 * Flag to indicate if mustache parameter syntax ({{ param }}) should be auto-updated
 * to named syntax (:param) when converting datasets in the dashboard.
 */
updateParameterSyntax?: boolean | undefined;
```

Issues:

1. The default behavior (when omitted) is undocumented. From the wire form, server defaults are likely `false`, meaning the migration will leave mustache placeholders intact and break the query — which is the opposite of what most callers want.
2. The doc invokes "mustache" (a template-engine name) without explanation; a TS reader who hasn't worked in classic SQL Dashboards will not know what `{{ param }}` is.
3. "Update" is vague: it's actually a *rewrite* — `:param` is not an "update" of `{{ param }}` but a syntax replacement.

**Category:** 6 (misleading), 13 (verb tense inconsistency: "update" vs "rewrite"), 15 (generic field name losing meaning).

**Suggested name:** `rewriteParametersAsNamed: boolean` (verb explicit) or `mustacheCompatibilityMode: boolean` (opposite polarity, clearer default). Doc should state the default and provide an example.

**Rationale:** Migration is a one-way operation; setting this wrong is hard to recover from.

### 18. `trashDashboard` — see #4. Also: only soft-delete method in the entire package

**Location:** `src/v1/client.ts:653`

Beyond the verb-mismatch with `LifecycleState.TRASHED`, the `trashDashboard` method is paired with no `restoreDashboard` or `untrashDashboard`. The method moves the dashboard into `TRASHED` lifecycle state, but the API doesn't expose how to undo it via the SDK — a caller has to use `updateDashboard({ dashboard: { lifecycleState: ACTIVE } })`. Discovery from method names alone gives no hint that "restore" exists.

**Category:** 17 (inconsistent action verb), see #4.

**Suggested name:** `deleteDashboard` (semantics-clear). Add `restoreDashboard` (or document `updateDashboard` as the restoration path in the `trashDashboard` JSDoc).

**Rationale:** Symmetry. `deletePermanently` is also unavailable here — soft-delete is the only delete.

### 19. `PublishDashboardRequest` vs `PublishedDashboard` — adjacent names with different roles

**Location:** `src/v1/model.ts:307`, `src/v1/model.ts:323`

`PublishDashboardRequest` is the input to `publishDashboard()`. `PublishedDashboard` is the response. The names are one letter apart (`Publish*` vs `Published*`). A code reader picking either out of an auto-complete list can grab the wrong one and the compiler will not immediately tell them apart at construction time — both are records with `warehouseId?: string`.

**Category:** 6 (misleading visual similarity), 12 (overlapping concepts).

**Suggested name:** `PublishDashboardRequest` → `PublishDashboardOptions` or `PublishDashboardInput`. The "Request" suffix doesn't distinguish on the auto-complete; an `Input`/`Options` suffix does.

**Rationale:** Reduce typo bugs. The Databricks SDK already uses `*Options` in `ClientOptions`, `CallOptions`, so the pattern is precedented.

### 20. `GetPublishedDashboardEmbeddedRequest` / `getPublishedDashboardEmbedded` — adjective-as-method-suffix

**Location:** `src/v1/model.ts:169-175`, `src/v1/client.ts:301`

```ts
async getPublishedDashboardEmbedded(req: ...): Promise<GetPublishedDashboardEmbeddedResponse>
```

41 characters in the method name; the suffix "Embedded" is an adjective stuck on the end of `getPublishedDashboard`. The natural English form is "get an embedded view of the published dashboard". The pairing `getPublishedDashboard` + `getPublishedDashboardEmbedded` suggests these are alternative *views* of the same resource — which is what flags 2, 5, and 6 hint at: the SDK uses three separate names for what is conceptually `getPublishedDashboard(mode: 'metadata' | 'embedded' | 'tokenInfo')`.

**Category:** 1 (vague suffix), 7 (overly verbose).

**Suggested name:** `getPublishedDashboardForEmbedding` or restructure as `getPublishedDashboard({ mode: 'embedded' })`.

**Rationale:** Method name should hint at side effect or return shape; an adjective suffix does neither.

### 21. `GetPublishedDashboardTokenInfoResponse.customClaim` — undescriptive field for opaque blob

**Location:** `src/v1/model.ts:196`

```ts
/**
 * Custom claim generated from external_value and external_viewer_id.
 * Format: `urn:aibi:external_data:<external_value>:<external_viewer_id>:<dashboard_id>`
 */
customClaim?: string | undefined;
```

The doc string is the only place that defines what the field is — a URN with a specific format. The field name `customClaim` is generic JWT-speak (a "custom claim" in OAuth/OIDC is any non-standard claim). The actual value is a *Databricks AI/BI external-data URN*. Two layers of indirection from the name.

**Category:** 15 (generic field name).

**Suggested name:** `externalDataUrn` or `embeddingUrn` (with `customClaim` mentioned in JSDoc as "this URN is embedded as a custom claim in the issued OAuth token").

**Rationale:** Distinct from the OIDC sense of "custom claim".

### 22. `AuthorizationDetails.type` — collides with TS reserved feeling

**Location:** `src/v1/model.ts:28`

```ts
type?: string | undefined;
```

`type` is not a reserved word in TypeScript, but it is a *contextual* keyword (used in `type X = ...` declarations and in `import type { ... }`). Using `type` as a field name is legal but creates friction in tooling — auto-complete and rename-symbol can mis-fire.

The field's documented value space is also limited: `"workspace_rule_set"` is the only documented constant; the rest is open. So the field is closer to a tag (`discriminator: 'workspace_rule_set'`) than a free string.

**Category:** 10 (reserved-word-feel collision), 15 (generic).

**Suggested name:** `kind` (matches K8s convention for discriminator fields), or `constraintType` to keep "type" but specialize it.

**Rationale:** Avoid syntax-coloring confusion (`type: string` reads ambiguously) and signal that the field is a discriminator.

### 23. `AuthorizationDetails.resourceLegacyAclPath` — legacy compatibility field in current API

**Location:** `src/v1/model.ts:36`

```ts
/** The acl path of the tree store resource resource. */
resourceLegacyAclPath?: string | undefined;
```

Three issues:

1. The field name advertises `Legacy` — meaning a field deliberately kept around for backwards compatibility. There is no documented sunset date or replacement field. A public API surface that hard-codes "legacy" in the field name will be locked into supporting it forever (since the name itself is a contract).
2. The doc has a typo: "tree store resource resource" — duplicated "resource".
3. `acl` is lowercase (compare to the more common `Acl`/`ACL` in the SDK).

**Category:** 6 (misleading — "legacy" is permanent here), 14 (TreeStore is an internal Databricks system, leaking implementation), 16 (field contradicts type domain).

**Suggested name:** `legacyAclPath` (drop the duplicate "resource"; rename does not really fix the long-term problem, only the doc string typo).

**Rationale:** Cosmetic doc fix is cheap; the structural issue is that the field name preserves an internal compat detail in the public API.

### 24. `Subscription.skipNotify` — negative polarity boolean

**Location:** `src/v1/model.ts:400`

```ts
/**
 * Controls whether notifications are sent to the subscriber for scheduled dashboard refreshes.
 * If not defined, defaults to false in the backend to match the current behavior (refresh and notify)
 */
skipNotify?: boolean | undefined;
```

Negative-polarity booleans are an antipattern: callers must invert the meaning mentally (`subscription.skipNotify = false` means "do notify"). Combined with `?:` optionality, the field has three meaningful states (`undefined` = backend default = notify; `false` = notify; `true` = don't notify), where two of them mean the same thing.

The doc also leaks "in the backend" — the default is the backend's, not the SDK's.

**Category:** 1 (vague), 14 (the backend-leak phrasing).

**Suggested name:** `notify?: boolean` (positive polarity) or `silent?: boolean`. Document the inverted default.

**Rationale:** Positive-polarity booleans halve the cognitive load.

### 25. `Subscription.createdByUserId` typed as `number`

**Location:** `src/v1/model.ts:386`

```ts
/** UserId of the user who adds subscribers (users or notification destinations) to the dashboard's schedule. */
createdByUserId?: number | undefined;
```

User IDs in Databricks are 64-bit integers; storing them as JS `number` overflows above 2^53. The Databricks JS SDK has the same problem elsewhere, but it surfaces visibly here because the field is part of every Subscription response.

Also, the doc string is past-tense verb plus present-tense ("adds") — inconsistent.

**Category:** 19 (underspecified ID — `number` is wrong storage), 16 (field contradicts wire format which is int64).

**Suggested name:** Keep `createdByUserId`, change type to `string` (matching the SCIM API's `users/<id>` convention) or `bigint`. JSDoc should clarify the format.

**Rationale:** Silent overflow is the worst kind of bug.

### 26. `Subscription_Subscriber_User.userId` typed as `number` — same issue

**Location:** `src/v1/model.ts:426`

Same `number` overflow risk. Also: the field is buried three names deep (`Subscription_Subscriber_User.userId`) which obscures the issue at the use site.

**Category:** 19, 16.

**Suggested name:** Change to `string` or `bigint`. Combined with the fix from #8 (rename to `UserSubscriber`), the field becomes `userSubscriber.userId`.

---

## Low severity

### 27. `Dashboard.warehouseId` — underspecified ID

**Location:** `src/v1/model.ts:112`

`warehouseId` is a SQL Warehouse ID. The field doc says "warehouse ID used to run the dashboard". Format isn't specified — it's an alphanumeric like `1abc2d3456e789f`. Common across the SDK.

**Category:** 19.

**Suggested name:** Keep `warehouseId`, but JSDoc should specify "SQL Warehouse ID (alphanumeric, found at `/sql/warehouses/{id}` in the UI)".

### 28. `Schedule.warehouseId` — duplicate concept with `Dashboard.warehouseId`

**Location:** `src/v1/model.ts:373`

```ts
/** The warehouse id to run the dashboard with for the schedule. */
warehouseId?: string | undefined;
```

A schedule can override the dashboard's default warehouse. This is fine, but the field name does not signal "override" — at first read it looks like the dashboard's warehouse is being duplicated into the schedule.

**Category:** 19 (underspecified), 12 (overlap with `Dashboard.warehouseId`).

**Suggested name:** `warehouseIdOverride` or `overrideWarehouseId`.

### 29. `Dashboard.etag`, `Schedule.etag`, `Subscription.etag` — `etag` lowercase casing

**Location:** `src/v1/model.ts:118`, `src/v1/model.ts:367`, `src/v1/model.ts:391`

Consistent within the package, but the HTTP spec spells it `ETag`. Most TS SDKs use lowercase, so it's defensible. Flagged for whole-codebase consistency (compare `alerts.md` #14 on `notifyOnOk` for similar acronym-casing concerns).

**Category:** 3.

**Suggested name:** Keep `etag`. Note the project convention.

### 30. `Dashboard.path` vs `Dashboard.parentPath` — overlap

**Location:** `src/v1/model.ts:99`, `src/v1/model.ts:135`

```ts
path?: string | undefined;          // workspace path of the dashboard asset, including the file name
parentPath?: string | undefined;    // workspace path of the folder containing the dashboard
```

`path = parentPath + '/' + filename`. The two fields are derivable from each other (given a known filename rule). Maintaining both is convenient for clients but means clients must keep them in sync on writes. Field names give no hint about the relationship.

**Category:** 15 (generic), 6 (silently redundant).

**Suggested name:** Keep both. Either rename `path → fullPath` for symmetry, or document the relationship in JSDoc on both fields.

### 31. `Dashboard.serializedDashboard` — type-suffix tautology

**Location:** `src/v1/model.ts:127`

```ts
serializedDashboard?: string | undefined;
```

Field is on `Dashboard`; suffix repeats the type name. The field holds a JSON string of the dashboard's layout — a stringified payload.

**Category:** 20.

**Suggested name:** `serialized` or `content` or `layoutJson`. The dashboard's "content" is a more useful description.

### 32. `Dashboard.lifecycleState` — generic field name

**Location:** `src/v1/model.ts:129`

The field is typed `LifecycleState` (already flagged in #3). The field name doesn't add new information. Fine in isolation, but with the rename suggested in #3 (`DashboardLifecycleState`), the field becomes more readable: `dashboard.lifecycleState: DashboardLifecycleState`.

**Category:** 15.

### 33. `createTime`/`updateTime` suffix `Time` — convention question

**Location:** Many fields on `Dashboard`, `Schedule`, `Subscription`

The package uses `*Time` suffix (`createTime`, `updateTime`). The alerts v2 package uses `*At` (`lastEvaluatedAt`). Inconsistency across the SDK. The field type here is `Temporal.Instant`, which is point-in-time — `*At` reads more naturally for instants in English.

**Category:** 9 (related; suffix-grammar inconsistency).

**Suggested name:** Pick a project-wide convention. Recommend `*At` for instants (`createdAt`, `updatedAt`). Aligns with idiomatic JS/TS and the Rails-influenced ecosystem.

### 34. `PublishedDashboard.revisionCreateTime` — over-qualified

**Location:** `src/v1/model.ts:331`

```ts
/** The timestamp of when the published dashboard was last revised. */
revisionCreateTime?: Temporal.Instant | undefined;
```

"Revision Create Time" reads as "the create time of the revision", i.e. when the latest revision was published. The field name carries three nouns (`revision`, `create`, `time`).

**Category:** 15 (generic, layered).

**Suggested name:** `publishedAt` or `lastPublishedAt`. Captures the user's mental model directly.

### 35. `PublishDashboardRequest.embedCredentials` — verb-as-field is fine; flag for adjacency

**Location:** `src/v1/model.ts:315`

```ts
embedCredentials?: boolean | undefined;
```

Reads as "embed [the publisher's] credentials". Adjacent to `Dashboard.serializedDashboard` semantically — both control whether the response carries embedded content. Different concepts but visually parallel.

**Category:** 7 (mild verbosity).

**Suggested name:** Keep. Document the security tradeoff inline.

### 36. `ListDashboardsRequest.showTrashed` — verb mismatch with state name

**Location:** `src/v1/model.ts:235`

```ts
showTrashed?: boolean | undefined;
```

The field is named `showTrashed`, but the lifecycle state is `TRASHED`. Consistent within "trash vocabulary", but inconsistent if the rename in #4 lands (`DELETED` lifecycle would imply `showDeleted` flag).

**Category:** 13 (verb tense across vocabulary), 17 (action verb consistency).

**Suggested name:** Tie to whichever vocabulary wins. If `delete`/`DELETED`, then `includeDeleted`. The `show` prefix is also UI-flavored (compare `include`/`with` prefixes in REST APIs).

### 37. `DashboardView.DASHBOARD_VIEW_BASIC` — long enum value (see #2 for the enum itself)

**Location:** `src/v1/model.ts:8`

Member is `DASHBOARD_VIEW_BASIC = 'DASHBOARD_VIEW_BASIC'` — both Pascal-prefix and the literal value carry `DASHBOARD_VIEW_`. The wire format is locked, but the TS member name need not echo the enum prefix: `BASIC = 'DASHBOARD_VIEW_BASIC'` is sufficient.

**Category:** 2 (redundant enum prefix), 18 (long).

**Suggested name:** `DashboardView.BASIC = 'DASHBOARD_VIEW_BASIC'`.

---

## Observations

### 38. `Dashboard.dashboardId` — tautology at use site

**Location:** `src/v1/model.ts:95`

```ts
export interface Dashboard {
  dashboardId?: string | undefined;
  ...
}
```

Caller writes `dashboard.dashboardId`. Inside a type already named `Dashboard`, the field could be `id`. Many SDKs prefer the prefix-form for unambiguous logs and reflection, but the *consumer-facing* readability is poorer.

**Category:** 8 (field name == type name with `Id` suffix), 20.

**Suggested name:** `Dashboard.id` (and similarly `Schedule.id`, `Subscription.id`). Marshal/unmarshal already remaps to/from `dashboard_id`.

### 39. `CreateDashboardRequest.datasetCatalog`/`datasetSchema` — generic prefix

**Location:** `src/v1/model.ts:61,67`

```ts
datasetCatalog?: string | undefined;
datasetSchema?: string | undefined;
```

`Catalog` and `Schema` are Unity Catalog concepts. The prefix `dataset` is what scopes them (apply only to datasets in this dashboard). Without the prefix the fields would be ambiguous with workspace-level catalog/schema. The current names are accurate but a developer reading the field for the first time might think `datasetSchema` is a structural/JSON schema for the dataset — *Schema* is overloaded.

**Suggested name:** Keep. Add JSDoc clarifying "this is the Unity Catalog *catalog* / *schema* applied to dataset queries". Done already in the JSDoc, but worth flagging.

### 40. `ListSchedulesRequest.dashboardId` doc typo

**Location:** `src/v1/model.ts:250`

```ts
/** UUID identifying the dashboard to which the schedules belongs. */
dashboardId?: string | undefined;
```

"schedules belongs" — verb agreement error. Same on `ListSubscriptionsRequest.dashboardId` line 271 ("subscriptions belongs") and 273 ("subscriptions belongs"). Generated-code artifact; fix at template level.

**Category:** 9 (plural verb agreement).

### 41. `Subscription_Subscriber.userSubscriber` / `destinationSubscriber` — field name == type-tail

**Location:** `src/v1/model.ts:409,414`

```ts
userSubscriber?: Subscription_Subscriber_User | undefined;
destinationSubscriber?: Subscription_Subscriber_Destination | undefined;
```

Field name suffix `Subscriber` echoes the parent type `Subscriber`. If the parent renames per #8 to `Subscriber`, the fields become `subscriber.user`, `subscriber.destination` — much cleaner.

**Category:** 8 (field name overlap with parent), 20.

### 42. `index.ts` — mixed `export {...}` and `export type {...}`

**Location:** `src/v1/index.ts:5,7-47`

```ts
export {DashboardView, LifecycleState, SchedulePauseStatus} from './model';
export type {AuthorizationDetails, ...} from './model';
```

Enums are exported as values (correct — they have runtime representation); interfaces are exported as types (correct — type-only). The pattern is right; flagging only because a reader scanning the index file might miss the distinction. Consistent with other SDK packages.

### 43. URL paths still use `lakeview`

**Location:** Every method's URL constant in `client.ts`, e.g. line 112: `/api/2.0/lakeview/dashboards`

Wire-format. The SDK cannot rename the URL without server cooperation. Flagged so that the rebrand mismatch noted in #1 is understood as partial (TS name is the lever; URLs are not).

**Category:** 6.

---

## Net assessment

Lakeview / AI/BI Dashboards is a relatively small surface (5 enums-and-resources, 19 client methods) but the naming smells cluster around:

1. **The rebrand from "Lakeview" to "AI/BI Dashboards"** is incomplete — the package name and URLs preserve the old codename, while the JSDoc mixes the two.
2. **Proto nested-message names** (`AuthorizationDetails_GrantRule`, `Subscription_Subscriber*`) reach four levels deep, requiring ESLint suppressions throughout.
3. **The trash/delete vocabulary split** (#4, #18, #36) is inherited from the alerts package's pre-v2 design — already fixed in alerts v2 but not in lakeview.
4. **Generic top-level type names** (`Dashboard`, `LifecycleState`, `CronSchedule`, `SchedulePauseStatus`) overlap with other packages in the SDK monorepo and force consumers to import-rename.
5. **`Schedule.pauseStatus` enum is a binary boolean** (#13, #14) — `paused: boolean` would be more idiomatic TS.
6. **64-bit user IDs typed as `number`** (#25, #26) silently truncate above 2^53. Same issue exists in other packages but is unsurfaced here.

If only one change were possible, fixing the proto-nested type names (replacing `Subscription_Subscriber*` and `AuthorizationDetails_GrantRule` with namespace-merging or top-level types) would remove the most visible naming noise from the public API.
