# Naming Audit: `budgets` (v1)

**Package:** `@databricks/sdk-budgets`
**Path:** `/home/parth.bansal/sdk-js/packages/budgets/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/index.ts`

This audit applies the 20 numbered concern categories from the audit
checklist. Each finding lists the offending identifier(s), the
category number, severity (`HIGH` / `MEDIUM` / `LOW`), and a concrete
rename suggestion. Findings are grouped by category.

---

## Inventory

### Enums (`model.ts`)

| Name                                    | Members |
| --------------------------------------- | ------- |
| `ActionConfigurationType`               | `EMAIL_NOTIFICATION` |
| `AlertConfigurationQuantityType`        | `LIST_PRICE_DOLLARS_USD` |
| `AlertConfigurationTimePeriod`          | `MONTH` |
| `AlertConfigurationTriggerType`         | `CUMULATIVE_SPENDING_EXCEEDED` |
| `BudgetConfigurationFilter_Operator`    | `IN` |

### Interfaces (`model.ts`)

`ActionConfiguration`, `AlertConfiguration`, `BudgetConfiguration`,
`BudgetConfigurationFilter`, `BudgetConfigurationFilter_Clause`,
`BudgetConfigurationFilter_TagClause`,
`BudgetConfigurationFilter_WorkspaceIdClause`,
`CreateBudgetConfigurationBudget`, `CreateBudgetConfigurationRequest`,
`CreateBudgetConfigurationRequest_Response`,
`DeleteBudgetConfigurationRequest`,
`DeleteBudgetConfigurationRequest_Response`,
`GetBudgetConfigurationRequest`,
`GetBudgetConfigurationRequest_Response`,
`ListBudgetConfigurationsRequest`,
`ListBudgetConfigurationsRequest_Response`,
`UpdateBudgetConfigurationBudget`,
`UpdateBudgetConfigurationRequest`,
`UpdateBudgetConfigurationRequest_Response`.

### Client methods (`client.ts`)

`createBudgetConfiguration`, `deleteBudgetConfiguration`,
`getBudgetConfiguration`, `listBudgetConfigurations`,
`listBudgetConfigurationsIter`, `updateBudgetConfiguration`.

---

## Findings

### 1. Vague / generic names

#### F1.1 — `ActionConfiguration` / `actionConfigurationId` / `actionType` (HIGH)
- **Where:** `model.ts:26-33`, `index.ts:14`.
- **Why flagged:** "Action" is one of the most generic nouns in
  software. Combined with "Configuration", it gives almost no clue
  about what the user is configuring. In context this type is
  exclusively the action attached to a budget *alert* (currently only
  email notifications). A reader of `ActionConfiguration` cannot tell
  whether it represents an HTTP action, a UI action, a workflow
  action, a permission action, or — as it actually is — an alert
  delivery method.
- **Suggestion:** Rename to `BudgetAlertAction` (or
  `BudgetNotificationAction`). The `Configuration` suffix is dead
  weight here (see also F7). If the type *must* keep the "Config"
  word, `BudgetAlertActionConfig` is shorter and clearer.

#### F1.2 — `Client` class name (MEDIUM)
- **Where:** `client.ts:49`, `index.ts:3`.
- **Why flagged:** Every package in this SDK exports a `Client`.
  Re-exported in a barrel like
  `import {Client as BudgetsClient} from '@databricks/sdk-budgets'`
  it is fine, but unqualified `Client` symbol-shadows aggressively.
  This is a project-wide pattern, not a budgets-specific issue.
- **Suggestion:** Either keep `Client` and document the
  package-qualified import convention, or rename to
  `BudgetsClient` consistently across packages. Cross-cutting.

#### F1.3 — `req` parameter name on every client method (LOW)
- **Where:** `client.ts:80, 112, 140, 174, 216, 234`.
- **Why flagged:** `req` is a Go-ism (see category 14). It is also
  generic — a reader has to look at the type to know what the
  request is.
- **Suggestion:** Use a domain-meaningful parameter name:
  `createBudgetConfiguration(budgetToCreate)` or simply `request`
  for stylistic consistency with `options`.

---

### 2. Redundant enum prefixes

_None._

---

### 3. Acronym casing inconsistencies

_None._

---

### 4. Underscores in TS identifiers

_None._

---

### 5. Cryptic abbreviations

#### F5.1 — `req` (LOW, Go-ism)
- **Where:** `client.ts` every method.
- Already flagged under F1.3.

---

### 6. Misleading names

_None._

---

### 7. Overly verbose

#### F7.1 — `BudgetConfiguration` (HIGH)
- **Where:** `model.ts:50`.
- **Why flagged:** Within a package literally named `budgets`, every
  type is about budgets. The "Configuration" suffix doesn't add
  signal — a budget IS a configuration on the account. Compare Go's
  `budgets.Budget` (typical Go SDK convention).
- **Suggestion:** Rename to `Budget`. Users would write
  `import {Budget} from '@databricks/sdk-budgets'`. The
  package name carries the qualifier. Combined with F7.2 / F7.3
  this collapses naming significantly.

#### F7.2 — `CreateBudgetConfigurationRequest`,
  `GetBudgetConfigurationRequest`,
  `UpdateBudgetConfigurationRequest`,
  `DeleteBudgetConfigurationRequest`,
  `ListBudgetConfigurationsRequest` (HIGH)
- **Where:** `model.ts:118, 133, 143, 156, 195`; `index.ts:22-31`.
- **Why flagged:** Long request type names. Combined with method
  names that already say `createBudgetConfiguration(...)`, the
  argument type is highly redundant. Compare typical TS SDK
  patterns: `client.budgets.create(req: CreateBudgetRequest)`.
- **Suggestion:** Drop the `Configuration` token from request types:
  `CreateBudgetRequest`, `GetBudgetRequest`, `UpdateBudgetRequest`,
  `DeleteBudgetRequest`, `ListBudgetsRequest`.

#### F7.3 — `CreateBudgetConfigurationBudget` and
  `UpdateBudgetConfigurationBudget` (HIGH)
- **Where:** `model.ts:98, 175`; `index.ts:21, 30`.
- **Why flagged:** These types are literally `<Verb>BudgetConfiguration` +
  the noun `Budget`. The name is `Budget` repeated twice plus
  `Configuration`. Reads as
  "Create-Budget-Configuration-Budget".
- **Suggestion:** Replace with the existing `BudgetConfiguration`
  (or renamed `Budget`) directly. Inspection shows these types are
  byte-for-byte identical to `BudgetConfiguration`:

  ```ts
  // BudgetConfiguration
  budgetConfigurationId, accountId, createTime, updateTime,
  alertConfigurations, filter, displayName

  // CreateBudgetConfigurationBudget — identical
  budgetConfigurationId, accountId, createTime, updateTime,
  alertConfigurations, filter, displayName

  // UpdateBudgetConfigurationBudget — identical
  budgetConfigurationId, accountId, createTime, updateTime,
  alertConfigurations, filter, displayName
  ```
  The duplication serves no schema purpose. Delete both wrapper
  types and have `Create.../Update...` request types embed
  `BudgetConfiguration` (or `Budget`) directly. See also F10 / F11.

---

### 8. Singular / plural mismatches

#### F8.1 — `alertConfigurations: AlertConfiguration[]` plural but
  semantically singular (HIGH)
- **Where:** `model.ts:59-60, 107-108, 184-185`.
- **Why flagged:** JSDoc states "Budgets must have exactly one alert
  configuration." Field is plural array.
- **Suggestion:** API-shape concern; document the invariant or
  switch to singular `alertConfiguration: AlertConfiguration` when
  the API allows.

---

### 9. Reserved-word / built-in collisions

_None._

---

### 10. Empty / trivial wrapper types

_None._

---

### 11. Duplicate concepts

#### F11.1 — `BudgetConfiguration` vs `CreateBudgetConfigurationBudget`
  vs `UpdateBudgetConfigurationBudget` (HIGH)
- **Where:** `model.ts:50, 98, 175`.
- **Why flagged:** Three types with byte-for-byte identical fields.
  Already noted in F7.3. They exist because the API contract
  *might* diverge later (e.g. `Update` strips server-managed fields),
  but today they are duplicates.
- **Suggestion:** Collapse to a single `BudgetConfiguration` (or
  `Budget`) where the spec allows. If the spec mandates separate
  shapes, document *why* each is distinct in JSDoc.

#### F11.2 — `BudgetConfigurationFilter_Clause` and
  `BudgetConfigurationFilter_WorkspaceIdClause` are the same shape
  with `values` typed differently (MEDIUM)
- **Where:** `model.ts:81, 93`.
- **Why flagged:** Two near-identical types differ only in
  `values: string[]` vs `values: number[]`. In TS this is a perfect
  case for a generic: `Clause<T> { operator?: Operator; values?: T[] }`.
  The proto duplication is preserved verbatim.
- **Suggestion:** If parity with proto matters, leave alone. If not,
  collapse to a generic clause type — but only if the generator
  supports it.

#### F11.3 — `accountId` declared on both the request envelope and
  the inner `Budget` (LOW)
- **Where:**
  - `CreateBudgetConfigurationBudget.accountId` (model.ts:102)
  - `UpdateBudgetConfigurationBudget.accountId` (model.ts:179)
  - `DeleteBudgetConfigurationRequest.accountId` (model.ts:137)
  - `GetBudgetConfigurationRequest.accountId` (model.ts:147)
  - `ListBudgetConfigurationsRequest.accountId` (model.ts:158)
  - `UpdateBudgetConfigurationRequest` has no top-level `accountId`; it
    pulls from `req.budget?.accountId` (`client.ts:237`)
  - `CreateBudgetConfigurationRequest` likewise uses
    `req.budget?.accountId` (`client.ts:83`)
- **Why flagged:** Inconsistent location of `accountId` between
  request types. Some have it at the top level, some require it
  nested under `budget`. Reader can't tell from the type which to
  set. The fallback `this.accountId ?? ''` in
  `delete/get/list` masks the inconsistency.
- **Suggestion:** Standardize: lift `accountId` to the top-level
  request envelope for *all* methods. The Go/proto layer can keep
  nesting; the TS client should flatten.

#### F11.4 — `budgetId` on
  `Delete/Get/UpdateBudgetConfigurationRequest` vs
  `budgetConfigurationId` on `BudgetConfiguration` and
  `Create/UpdateBudgetConfigurationBudget` (HIGH)
- **Where:**
  - `DeleteBudgetConfigurationRequest.budgetId` (model.ts:135)
  - `GetBudgetConfigurationRequest.budgetId` (model.ts:145)
  - `UpdateBudgetConfigurationRequest.budgetId` (model.ts:197)
  - `BudgetConfiguration.budgetConfigurationId` (model.ts:52)
  - `CreateBudgetConfigurationBudget.budgetConfigurationId`
    (model.ts:100)
  - `UpdateBudgetConfigurationBudget.budgetConfigurationId`
    (model.ts:177)
- **Why flagged:** Same conceptual ID, two different names. This is
  the prototypical "same thing, two names" duplicate concept. Most
  egregious example: `UpdateBudgetConfigurationRequest` has both
  `budgetId` (top-level) *and* the nested
  `budget.budgetConfigurationId`.
- **Suggestion:** Pick one. `budgetId` is shorter and matches the
  REST path segment (`/budgets/{budgetId}`). Rename
  `budgetConfigurationId → budgetId` everywhere. Combined with
  the F7.1 rename `BudgetConfiguration → Budget`, this is consistent.

---

### 12. Verb-tense inconsistency

_None._

---

### 13. Go / Java-style names

_None._

---

### 14. Generic field names losing meaning

#### F14.1 — `req` parameter on every client method (HIGH)
- See F1.3.

---

### 15. Field contradicting type domain

_None._

---

### 16. Inconsistent action verbs

_None._

---

### 17. Long enum values

_None._

---

### 18. Underspecified IDs

#### F18.1 — `budgetId` vs `budgetConfigurationId` for the same thing
  (HIGH)
- See F11.4. The `budgetId` form is *less* underspecified than
  `budgetConfigurationId` if the package name carries "budgets"
  context — both are unambiguous in this package; the issue is
  inconsistency.

---

## Package overlap: `budgets` vs `budgetpolicy`

This SDK exposes two separate packages whose names both start with
"budget":

- `@databricks/sdk-budgets` (this package)
- `@databricks/sdk-budgetpolicy` (sibling)

### F-OVERLAP.1 — `BudgetPolicy` vs `BudgetConfiguration` collision (HIGH)
- **Where:** `budgetpolicy/src/v1/model.ts:16` declares
  `BudgetPolicy` with fields `policyId`, `policyName`, `customTags`,
  `bindingWorkspaceIds`. This package's `BudgetConfiguration`
  declares `budgetConfigurationId`, `accountId`,
  `alertConfigurations`, `filter`, `displayName`. They are
  *different* concepts (one defines spend-limit alerts, the other
  defines workspace-binding policy tags) but a casual reader
  searching for "budget" in autocomplete will see both and likely
  conflate them.
- **Suggestion:**
  - Add a short JSDoc on `BudgetConfiguration` clarifying it is the
    spend-alert/notification budget. Cross-link to `BudgetPolicy`.
  - Consider naming this package's primary type `SpendBudget` or
    `UsageBudget` to disambiguate from `BudgetPolicy`. (`Budget`
    alone is ambiguous with `BudgetPolicy`.)
  - If staying with `Budget`, add a top-level index.ts JSDoc that
    explicitly contrasts the two packages.

### F-OVERLAP.2 — Both packages key off `accountId` and use similar
  filter/binding semantics (MEDIUM)
- `BudgetPolicy.bindingWorkspaceIds: number[]` (direct array).
- `BudgetConfigurationFilter_WorkspaceIdClause.values: number[]`
  (wrapped in a clause).
- Same data shape, different ergonomics. Cross-package
  inconsistency.
- **Suggestion:** When (if) renaming, align the two field shapes.

---

## Summary table

| # | Category                                | Findings |
| - | --------------------------------------- | -------- |
| 1 | Vague / generic                         | 3        |
| 2 | Redundant enum prefixes                 | 0 |
| 3 | Acronym casing                          | 0 |
| 4 | Underscores in TS identifiers           | 0 |
| 5 | Cryptic abbreviations                   | 1 |
| 6 | Misleading names                        | 0 |
| 7 | Overly verbose                          | 3 |
| 8 | Singular / plural mismatch              | 1 |
| 9 | Reserved-word collisions                | 0 |
| 10 | Empty / trivial wrappers               | 0 |
| 11 | Duplicate concepts                     | 4 |
| 12 | Verb-tense inconsistency               | 0 |
| 13 | Go / Java-style names                  | 0 |
| 14 | Generic field names                    | 1 |
| 15 | Field contradicting type domain        | 0 |
| 16 | Inconsistent action verbs              | 0 |
| 17 | Long enum values                       | 0 |
| 18 | Underspecified IDs                     | 1 |
| OVERLAP | budgets vs budgetpolicy             | 2 |

---

## Top highest-impact renames (recommended order)

1. **F11.4:** `budgetConfigurationId` → `budgetId` (or pick one
   universally). Same concept under two names is the worst smell here.
2. **F7.1 / F7.3 / F11.1:** Collapse `BudgetConfiguration`,
   `CreateBudgetConfigurationBudget`,
   `UpdateBudgetConfigurationBudget` into a single `Budget` type.
3. **F1.1:** Rename `ActionConfiguration` to `BudgetAlertAction`.
4. **F7.2:** Drop "Configuration" from request type names
   (`CreateBudgetRequest`).
5. **F11.3:** Lift `accountId` to top-level on all request types
   (currently nested under `budget` for create/update only).

---

## Notes / out-of-scope

- All findings above relate to **generated** code. Code-base rule:
  "Code generated from API definition by Databricks SDK Generator.
  DO NOT EDIT." The fixes belong upstream in the generator and
  spec. This audit is a backlog for that generator.
- This package has no `tests/` directory (verified by repo
  structure check), so the audit does not cover test naming.

---

## Proto / Architectural Leaks

### 1. `BudgetConfiguration` — model.ts:50

- **Why:** Repeated `Configuration` token threaded through nearly every
  type in the package (`BudgetConfiguration`, `BudgetConfigurationFilter`,
  `BudgetConfigurationFilter_Clause`,
  `BudgetConfigurationFilter_TagClause`,
  `BudgetConfigurationFilter_WorkspaceIdClause`,
  `BudgetConfigurationFilter_Operator`,
  `CreateBudgetConfigurationRequest`, etc.). Inside a package named
  `budgets`, the `Configuration` suffix carries no signal — it is a
  proto/RPC service-naming artifact, not a domain word.
- **Category:** Proto leak — repeated `Config`/`Configuration` suffix.
- **Suggested:** `Budget` (drop `Configuration`).
- **Rationale:** A budget is the domain noun; "configuration" is a proto
  naming convention bleeding through.

### 2. `AlertConfiguration` / `AlertConfigurationType` /
  `AlertConfigurationQuantityType` / `AlertConfigurationTimePeriod` /
  `AlertConfigurationTriggerType` — model.ts:9, 13, 17, 35

- **Why:** Same `Configuration` proto suffix repeated on the alert
  domain (and on every alert-related enum). The alert *is* a
  configuration, so the suffix is redundant.
- **Category:** Proto leak — repeated `Config`/`Configuration` suffix.
- **Suggested:** `Alert`, `AlertType`, `AlertQuantityType`,
  `AlertTimePeriod`, `AlertTriggerType`.
- **Rationale:** Drop `Configuration` — it's a proto-message-name
  artifact.

### 3. `ActionConfiguration` / `ActionConfigurationType` /
  `actionConfigurationId` / `actionType` — model.ts:5, 26

- **Why:** Repeated `Configuration` proto suffix on the action domain.
  `actionConfigurationId` is `<domain>Configuration<entity>Id` —
  three nouns where one would do.
- **Category:** Proto leak — repeated `Config`/`Configuration` suffix.
- **Suggested:** `Action`, `ActionType`, `actionId`.
- **Rationale:** `Configuration` adds no semantic value here.

### 4. `BudgetConfigurationFilter` /
  `BudgetConfigurationFilter_Clause` /
  `BudgetConfigurationFilter_TagClause` /
  `BudgetConfigurationFilter_WorkspaceIdClause` /
  `BudgetConfigurationFilter_Operator` — model.ts:22, 70, 81, 87, 93

- **Why:** The `BudgetConfiguration` proto-message prefix is dragged
  into the filter family even though every reader is already inside
  the budgets package. Nested-message scoping (`Filter_Clause`,
  `Filter_TagClause`, `Filter_WorkspaceIdClause`, `Filter_Operator`)
  is a proto/Go pattern — the underscore segregation exists only
  because Go nests message types as `Outer_Inner`.
- **Category:** Proto leak — proto-nested-message names + repeated
  `Configuration`.
- **Suggested:** `BudgetFilter`, `BudgetFilterClause`,
  `BudgetFilterTagClause`, `BudgetFilterWorkspaceClause`,
  `BudgetFilterOperator` (or simply `Filter*` inside the package).
- **Rationale:** TS does not need the proto outer-message qualifier;
  drop both `Configuration` and the underscore-nesting convention.

### 5. `CreateBudgetConfigurationBudget` /
  `UpdateBudgetConfigurationBudget` — model.ts:98, 175

- **Why:** Reads as `<Verb>-Budget-Configuration-Budget`. The
  `Configuration` proto token is wedged between the verb prefix and
  the domain noun it already qualifies. Pure proto-message-naming
  artifact.
- **Category:** Proto leak — `Configuration` infix duplicating domain.
- **Suggested:** Inline `Budget` (drop the wrapper entirely; see F7.3),
  or rename to `CreateBudget` / `UpdateBudget`.
- **Rationale:** The mid-position `Configuration` adds nothing the
  package name and outer type don't already convey.

### 6. `CreateBudgetConfigurationRequest` /
  `DeleteBudgetConfigurationRequest` /
  `GetBudgetConfigurationRequest` /
  `ListBudgetConfigurationsRequest` /
  `UpdateBudgetConfigurationRequest` — model.ts:118, 133, 143,
  156, 195

- **Why:** `Configuration` infix between verb and `Request`/`Response`
  is a proto/gRPC service-method naming artifact. TS request types
  rarely embed the inner message name verbatim.
- **Category:** Proto leak — repeated `Configuration` infix.
- **Suggested:** `CreateBudgetRequest`, `DeleteBudgetRequest`,
  `GetBudgetRequest`, `ListBudgetsRequest`, `UpdateBudgetRequest`.
- **Rationale:** Drop the proto inner-message qualifier — the verb +
  domain noun is sufficient.

### 7. `CreateBudgetConfigurationRequest_Response` /
  `DeleteBudgetConfigurationRequest_Response` /
  `GetBudgetConfigurationRequest_Response` /
  `ListBudgetConfigurationsRequest_Response` /
  `UpdateBudgetConfigurationRequest_Response` — model.ts:124, 141,
  152, 169, 203

- **Why:** Two proto leaks stacked: (a) `Configuration` infix
  duplicating domain, (b) `Request_Response` nested-message pattern
  where the underscore segregates a proto inner type. The
  `_Response` suffix in particular is the canonical proto-nested-type
  artifact (`<Service>.<RpcName>Request.Response` in proto IDL).
- **Category:** Proto leak — proto-nested `_Response` + `Configuration`
  infix.
- **Suggested:** `CreateBudgetResponse`, `DeleteBudgetResponse`,
  `GetBudgetResponse`, `ListBudgetsResponse`, `UpdateBudgetResponse`.
- **Rationale:** Drop both the `Configuration` token and the
  `Request_Response` proto nesting; use flat `<Verb><Domain>Response`.

---
