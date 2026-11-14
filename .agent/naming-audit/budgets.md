# Naming Audit: `budgets` (v1)

**Package:** `@databricks/sdk-budgets`
**Path:** `/home/parth.bansal/sdk-js/packages/budgets/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/index.ts`

---

## Findings

### 1. Vague / generic names

#### F1.1 — `ActionConfiguration` / `actionConfigurationId` / `actionType` (HIGH)
- **Where:** `model.ts:47-54`, `index.ts:14`.
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
  weight here (see also F2.1 and F2.2). If the type *must* keep the
  "Config" word, `BudgetAlertActionConfig` is shorter and clearer.

---

### 2. Overly verbose

#### F2.1 — `BudgetConfiguration` (HIGH)
- **Where:** `model.ts:71`.
- **Why flagged:** Within a package literally named `budgets`, every
  type is about budgets. The "Configuration" suffix doesn't add
  signal — a budget IS a configuration on the account. Compare Go's
  `budgets.Budget` (typical Go SDK convention).
- **Suggestion:** Rename to `Budget`. Users would write
  `import {Budget} from '@databricks/sdk-budgets'`. The
  package name carries the qualifier. Combined with F2.2 this
  collapses naming significantly.

#### F2.2 — `CreateBudgetConfigurationRequest`,
  `GetBudgetConfigurationRequest`,
  `UpdateBudgetConfigurationRequest`,
  `DeleteBudgetConfigurationRequest`,
  `ListBudgetConfigurationsRequest` (HIGH)
- **Where:** `model.ts:139, 163, 213, 153, 175`; `index.ts:22-31`.
- **Why flagged:** Long request type names. Combined with method
  names that already say `createBudgetConfiguration(...)`, the
  argument type is highly redundant. Compare typical TS SDK
  patterns: `client.budgets.create(req: CreateBudgetRequest)`.
- **Suggestion:** Drop the `Configuration` token from request types:
  `CreateBudgetRequest`, `GetBudgetRequest`, `UpdateBudgetRequest`,
  `DeleteBudgetRequest`, `ListBudgetsRequest`.

---

## Summary table

| # | Category                                | Findings |
| - | --------------------------------------- | -------- |
| 1 | Vague / generic                         | 1 |
| 2 | Overly verbose                          | 2 |
| — | Proto / architectural leaks             | 6 |

---

## Proto / Architectural Leaks

### 1. `BudgetConfiguration` — model.ts:71

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

### 2. `AlertConfiguration` / `AlertConfigurationQuantityType` /
  `AlertConfigurationTimePeriod` / `AlertConfigurationTriggerType`
  — model.ts:56, 15, 23, 31

- **Why:** Same `Configuration` proto suffix repeated on the alert
  domain (and on every alert-related enum). The alert *is* a
  configuration, so the suffix is redundant.
- **Category:** Proto leak — repeated `Config`/`Configuration` suffix.
- **Suggested:** `Alert`, `AlertQuantityType`,
  `AlertTimePeriod`, `AlertTriggerType`.
- **Rationale:** Drop `Configuration` — it's a proto-message-name
  artifact.

### 3. `ActionConfiguration` / `ActionConfigurationType` — model.ts:47, 7

- **Why:** Repeated `Configuration` proto suffix on the action domain.
- **Category:** Proto leak — repeated `Config`/`Configuration` suffix.
- **Suggested:** `Action`, `ActionType`.
- **Rationale:** `Configuration` adds no semantic value here.

### 4. `BudgetConfigurationFilter` /
  `BudgetConfigurationFilter_Clause` /
  `BudgetConfigurationFilter_TagClause` /
  `BudgetConfigurationFilter_WorkspaceIdClause` /
  `BudgetConfigurationFilter_Operator` — model.ts:91, 102, 108, 114, 39

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
  `UpdateBudgetConfigurationBudget` — model.ts:119, 193

- **Why:** Reads as `<Verb>-Budget-Configuration-Budget`. The
  `Configuration` proto token is wedged between the verb prefix and
  the domain noun it already qualifies. Pure proto-message-naming
  artifact.
- **Category:** Proto leak — `Configuration` infix duplicating domain.
- **Suggested:** Inline `Budget` (drop the wrapper entirely), or
  rename to `CreateBudget` / `UpdateBudget`.
- **Rationale:** The mid-position `Configuration` adds nothing the
  package name and outer type don't already convey.

### 6. `CreateBudgetConfigurationRequest` /
  `DeleteBudgetConfigurationRequest` /
  `GetBudgetConfigurationRequest` /
  `ListBudgetConfigurationsRequest` /
  `UpdateBudgetConfigurationRequest` — model.ts:139, 153, 163,
  175, 213

- **Why:** `Configuration` infix between verb and `Request`/`Response`
  is a proto/gRPC service-method naming artifact. TS request types
  rarely embed the inner message name verbatim.
- **Category:** Proto leak — repeated `Configuration` infix.
- **Suggested:** `CreateBudgetRequest`, `DeleteBudgetRequest`,
  `GetBudgetRequest`, `ListBudgetsRequest`, `UpdateBudgetRequest`.
- **Rationale:** Drop the proto inner-message qualifier — the verb +
  domain noun is sufficient.
