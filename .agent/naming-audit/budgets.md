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
- **Where:** `model.ts:27-34`, `index.ts:14`.
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
  weight here (see also F3). If the type *must* keep the "Config"
  word, `BudgetAlertActionConfig` is shorter and clearer.

#### F1.2 — `req` parameter name on every client method (LOW)
- **Where:** `client.ts:77, 109, 137, 171, 213, 231`.
- **Why flagged:** `req` is a Go-ism (see category 4). It is also
  generic — a reader has to look at the type to know what the
  request is.
- **Suggestion:** Use a domain-meaningful parameter name:
  `createBudgetConfiguration(budgetToCreate)` or simply `request`
  for stylistic consistency with `options`.

---

### 2. Cryptic abbreviations

#### F2.1 — `req` (LOW, Go-ism)
- **Where:** `client.ts` every method.
- Already flagged under F1.2.

---

### 3. Overly verbose

#### F3.1 — `BudgetConfiguration` (HIGH)
- **Where:** `model.ts:51`.
- **Why flagged:** Within a package literally named `budgets`, every
  type is about budgets. The "Configuration" suffix doesn't add
  signal — a budget IS a configuration on the account. Compare Go's
  `budgets.Budget` (typical Go SDK convention).
- **Suggestion:** Rename to `Budget`. Users would write
  `import {Budget} from '@databricks/sdk-budgets'`. The
  package name carries the qualifier. Combined with F3.2 this
  collapses naming significantly.

#### F3.2 — `CreateBudgetConfigurationRequest`,
  `GetBudgetConfigurationRequest`,
  `UpdateBudgetConfigurationRequest`,
  `DeleteBudgetConfigurationRequest`,
  `ListBudgetConfigurationsRequest` (HIGH)
- **Where:** `model.ts:119, 143, 193, 133, 155`; `index.ts:22-31`.
- **Why flagged:** Long request type names. Combined with method
  names that already say `createBudgetConfiguration(...)`, the
  argument type is highly redundant. Compare typical TS SDK
  patterns: `client.budgets.create(req: CreateBudgetRequest)`.
- **Suggestion:** Drop the `Configuration` token from request types:
  `CreateBudgetRequest`, `GetBudgetRequest`, `UpdateBudgetRequest`,
  `DeleteBudgetRequest`, `ListBudgetsRequest`.

---

### 4. Generic field names losing meaning

#### F4.1 — `req` parameter on every client method (HIGH)
- See F1.2.

---

## Summary table

| # | Category                                | Findings |
| - | --------------------------------------- | -------- |
| 1 | Vague / generic                         | 2 |
| 2 | Cryptic abbreviations                   | 1 |
| 3 | Overly verbose                          | 2 |
| 4 | Generic field names                     | 1 |

---

## Proto / Architectural Leaks

### 1. `BudgetConfiguration` — model.ts:51

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
  `AlertConfigurationTriggerType` — model.ts:10, 14, 18, 36

- **Why:** Same `Configuration` proto suffix repeated on the alert
  domain (and on every alert-related enum). The alert *is* a
  configuration, so the suffix is redundant.
- **Category:** Proto leak — repeated `Config`/`Configuration` suffix.
- **Suggested:** `Alert`, `AlertType`, `AlertQuantityType`,
  `AlertTimePeriod`, `AlertTriggerType`.
- **Rationale:** Drop `Configuration` — it's a proto-message-name
  artifact.

### 3. `ActionConfiguration` / `ActionConfigurationType` — model.ts:6, 27

- **Why:** Repeated `Configuration` proto suffix on the action domain.
- **Category:** Proto leak — repeated `Config`/`Configuration` suffix.
- **Suggested:** `Action`, `ActionType`.
- **Rationale:** `Configuration` adds no semantic value here.

### 4. `BudgetConfigurationFilter` /
  `BudgetConfigurationFilter_Clause` /
  `BudgetConfigurationFilter_TagClause` /
  `BudgetConfigurationFilter_WorkspaceIdClause` /
  `BudgetConfigurationFilter_Operator` — model.ts:23, 71, 82, 88, 94

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
  `UpdateBudgetConfigurationBudget` — model.ts:99, 173

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
  `UpdateBudgetConfigurationRequest` — model.ts:119, 133, 143,
  155, 193

- **Why:** `Configuration` infix between verb and `Request`/`Response`
  is a proto/gRPC service-method naming artifact. TS request types
  rarely embed the inner message name verbatim.
- **Category:** Proto leak — repeated `Configuration` infix.
- **Suggested:** `CreateBudgetRequest`, `DeleteBudgetRequest`,
  `GetBudgetRequest`, `ListBudgetsRequest`, `UpdateBudgetRequest`.
- **Rationale:** Drop the proto inner-message qualifier — the verb +
  domain noun is sufficient.
