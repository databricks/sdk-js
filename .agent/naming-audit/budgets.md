# Naming Audit: `budgets` (v1)

**Package:** `@databricks/sdk-budgets`
**Path:** `/home/parth.bansal/sdk-js/packages/budgets/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts`
- `src/v1/client.ts`
- `src/v1/utils.ts`
- `src/v1/index.ts`

This audit applies the 20 numbered concern categories from the audit
checklist. Each finding lists the offending identifier(s), the
category number, severity (`HIGH` / `MEDIUM` / `LOW`), and a concrete
rename suggestion. Findings are grouped by category. Generator-driven
items (such as the `_Response` suffix and underscored proto-style
nested-message names) are flagged as `LOW` because they are
codified across the entire generated SDK surface — they should be
fixed at the generator, not by hand-editing this package.

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
`CreateBudgetConfiguration`, `CreateBudgetConfiguration_Response`,
`CreateBudgetConfigurationBudget`, `DeleteBudgetConfiguration`,
`DeleteBudgetConfiguration_Response`, `GetBudgetConfiguration`,
`GetBudgetConfiguration_Response`, `ListBudgetConfigurations`,
`ListBudgetConfigurations_Response`, `UpdateBudgetConfiguration`,
`UpdateBudgetConfiguration_Response`,
`UpdateBudgetConfigurationBudget`.

### Schemas (`model.ts`)

`unmarshalActionConfigurationSchema`,
`unmarshalAlertConfigurationSchema`,
`unmarshalBudgetConfigurationSchema`,
`unmarshalBudgetConfigurationFilterSchema`,
`unmarshalBudgetConfigurationFilter_ClauseSchema`,
`unmarshalBudgetConfigurationFilter_TagClauseSchema`,
`unmarshalBudgetConfigurationFilter_WorkspaceIdClauseSchema`,
`unmarshalCreateBudgetConfiguration_ResponseSchema`,
`unmarshalDeleteBudgetConfiguration_ResponseSchema`,
`unmarshalGetBudgetConfiguration_ResponseSchema`,
`unmarshalListBudgetConfigurations_ResponseSchema`,
`unmarshalUpdateBudgetConfiguration_ResponseSchema`,
`marshalActionConfigurationSchema`, `marshalAlertConfigurationSchema`,
`marshalBudgetConfigurationFilterSchema`,
`marshalBudgetConfigurationFilter_ClauseSchema`,
`marshalBudgetConfigurationFilter_TagClauseSchema`,
`marshalBudgetConfigurationFilter_WorkspaceIdClauseSchema`,
`marshalCreateBudgetConfigurationSchema`,
`marshalCreateBudgetConfigurationBudgetSchema`,
`marshalUpdateBudgetConfigurationSchema`,
`marshalUpdateBudgetConfigurationBudgetSchema`.

### Client methods (`client.ts`)

`createBudgetConfiguration`, `deleteBudgetConfiguration`,
`getBudgetConfiguration`, `listBudgetConfigurations`,
`listBudgetConfigurationsIter`, `updateBudgetConfiguration`.

### Utility functions (`utils.ts`)

`executeCall`, `readAll`, `executeHttpCall`, `buildHttpRequest`,
`parseResponse`, `marshalRequest`, `flattenQueryParams`.

### Utility types/interfaces (`utils.ts`)

`HttpCallOptions`.

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

#### F1.2 — `target` field of `ActionConfiguration` (MEDIUM)
- **Where:** `model.ts:32`.
- **Why flagged:** "target" alone is generic — it could be a URL,
  Slack channel, account ID, etc. The JSDoc clarifies "For example,
  an email address," but the field name does not. Compare to similar
  webhook-style "target" fields elsewhere in the SDK.
- **Suggestion:** `recipient` or `destination`. If the value really is
  always an email today, `emailAddress` is unambiguous; `recipient`
  is more future-proof.

#### F1.3 — `target` (cont.): also generic at the type-domain level (LOW)
- **Where:** `model.ts:32`.
- See category 16 (F16.1) for the contradiction angle — "target" is
  also too generic *and* implies a generic destination when the
  domain is narrower.

#### F1.4 — `values` (`BudgetConfigurationFilter_Clause`,
  `BudgetConfigurationFilter_WorkspaceIdClause`) (LOW)
- **Where:** `model.ts:83, 95`.
- **Why flagged:** "values" is generic. Inside a clause it is
  acceptable because the operator/values pair is a well-known proto
  pattern, but a more descriptive name (`workspaceIds`, `tagValues`)
  would document intent without a JSDoc.
- **Suggestion:** Leave for parity with proto/Go, but consider
  specializing in TS:
  `BudgetConfigurationFilter_WorkspaceIdClause.values → workspaceIds`,
  `BudgetConfigurationFilter_Clause.values → tagValues`.

#### F1.5 — `operator` (LOW)
- **Where:** `model.ts:82, 94`.
- **Why flagged:** Generic given there is only one allowed value
  (`IN`). Acceptable for forward-compat but worth a JSDoc note.
- **Suggestion:** Keep, but add JSDoc clarifying allowed values and
  semantics (currently has none).

#### F1.6 — `Client` class name (MEDIUM)
- **Where:** `client.ts:49`, `index.ts:3`.
- **Why flagged:** Every package in this SDK exports a `Client`.
  Re-exported in a barrel like
  `import {Client as BudgetsClient} from '@databricks/sdk-budgets'`
  it is fine, but unqualified `Client` symbol-shadows aggressively.
  This is a project-wide pattern, not a budgets-specific issue.
- **Suggestion:** Either keep `Client` and document the
  package-qualified import convention, or rename to
  `BudgetsClient` consistently across packages. Cross-cutting.

#### F1.7 — `req` parameter name on every client method (LOW)
- **Where:** `client.ts:80, 109, 137, 171, 213, 231`.
- **Why flagged:** `req` is a Go-ism (see category 14). It is also
  generic — a reader has to look at the type to know what the
  request is.
- **Suggestion:** Use a domain-meaningful parameter name:
  `createBudgetConfiguration(budgetToCreate)` or simply `request`
  for stylistic consistency with `options`.

---

### 2. Redundant enum prefixes

#### F2.1 — `BudgetConfigurationFilter_Operator.IN` (LOW)
- **Where:** `model.ts:22-24`.
- **Why flagged:** Single value, so there is no real redundancy
  *yet*. But the enum prefix `BudgetConfigurationFilter_Operator`
  has 4 levels (`Budget`, `Configuration`, `Filter`, `Operator`)
  before reaching the value. Consider whether `FilterOperator` (or
  even just `Operator` inside a `Filter` namespace) is enough.
- **Suggestion:** If proto-style nested names are dropped (see
  F4.1), this becomes `FilterOperator.IN`, which is fine. No member
  rename needed; the redundancy is in the enum name not the values.

#### F2.2 — `ActionConfigurationType.EMAIL_NOTIFICATION` (LOW)
- **Where:** `model.ts:5-7`.
- **Why flagged:** Not redundant with the enum name, but
  `EMAIL_NOTIFICATION` could be `EMAIL` since this enum is
  scoped under "action" — the "_NOTIFICATION" suffix is the
  enum's role, not the member's role. Compare `Color.RED` vs
  `Color.RED_COLOR`.
- **Suggestion:** Treat as wire-protocol value; do not rename in
  TS unless the API spec changes. Leave with a comment.

#### F2.3 — `AlertConfigurationTimePeriod.MONTH` (acceptable)
- No redundancy. `MONTH` is concise.

#### F2.4 — `AlertConfigurationTriggerType.CUMULATIVE_SPENDING_EXCEEDED` (acceptable)
- Long but descriptive; the redundancy is not with the enum name. See
  F18.

#### F2.5 — `AlertConfigurationQuantityType.LIST_PRICE_DOLLARS_USD` (acceptable)
- Long; see F18.

---

### 3. Acronym casing inconsistencies

#### F3.1 — `Id` vs `ID` (HIGH, cross-cutting)
- **Where:** `model.ts:28, 37, 52, 54, 72, 111, 113, 135, 137, 145,
  147, 157, 177, 190, 192`; `client.ts:53, 66, 83, 112, 140, 174,
  234`.
- **Why flagged:** This SDK uses **lower-camel `Id`** consistently
  (`accountId`, `budgetId`, `budgetConfigurationId`,
  `actionConfigurationId`, `alertConfigurationId`, `workspaceId`,
  `nextPageToken`, `pageToken`). That is internally consistent and
  fine. The TS/JS community is split — DOM uses `nodeId`/`HTMLElement`,
  TypeScript itself uses `id`/`uuid` — so `Id` is defensible.
  **The flag here is not against `Id`**, but against the *interaction*
  with the proto-style `BudgetConfigurationFilter_WorkspaceIdClause`
  identifier, where the suffix becomes
  `WorkspaceIdClause`. Reading `WorkspaceIdClause` left-to-right
  parses as "WorkspaceId-Clause", but a TS reader who is unfamiliar
  with the type domain might parse it as "Workspace-IdClause"
  (i.e. an "ID clause" for workspaces). Slight ambiguity.
- **Suggestion:** Keep `Id`. Add a brief project-level note in
  `typescript.mdc` documenting the convention so reviewers stop
  re-litigating it.

#### F3.2 — `URL` / `Url` consistency (acceptable)
- `client.ts` consistently uses `url` (lowercase) as a local var
  name. No casing inconsistency observed.

#### F3.3 — `HTTP` / `Http` (acceptable for this file)
- `utils.ts` consistently uses `Http` PascalCase (`HttpClient`,
  `HttpRequest`, `HttpResponse`, `HttpCallOptions`,
  `executeHttpCall`, `buildHttpRequest`). One file is consistent;
  flag is cross-package only.

#### F3.4 — `USD` in enum value `LIST_PRICE_DOLLARS_USD` (LOW)
- Wire value, leave as-is. But note that `DOLLARS_USD` is doubly
  redundant — USD already is dollars. See F8.2.

---

### 4. Underscores in TS identifiers

> The TypeScript style guide (Google) and the SDK's own
> `typescript.mdc` disallow `snake_case` and underscores in
> identifiers. The generator emits proto-style "outer_inner" names
> as `Outer_Inner` to disambiguate nested messages — but TS would
> normally fold these into namespaces or flat PascalCase.

#### F4.1 — Proto-style underscore types (HIGH, cross-cutting,
  generator concern)
- **Where:**
  - `BudgetConfigurationFilter_Operator` (enum) `model.ts:22`
  - `BudgetConfigurationFilter_Clause` (interface) `model.ts:81`
  - `BudgetConfigurationFilter_TagClause` (interface) `model.ts:87`
  - `BudgetConfigurationFilter_WorkspaceIdClause` (interface)
    `model.ts:93`
  - `CreateBudgetConfiguration_Response` `model.ts:104`
  - `DeleteBudgetConfiguration_Response` `model.ts:141`
  - `GetBudgetConfiguration_Response` `model.ts:152`
  - `ListBudgetConfigurations_Response` `model.ts:169`
  - `UpdateBudgetConfiguration_Response` `model.ts:183`
  - All `marshal*` / `unmarshal*` schema constants of the above.
  - Re-exported through `index.ts:10, 18-31`.
- **Why flagged:** Each of these requires an
  `eslint-disable-next-line @typescript-eslint/naming-convention`
  comment. That alone is a smell. The TypeScript-idiomatic
  equivalents would be either nested namespaces
  (`namespace BudgetConfigurationFilter { export interface Clause … }`)
  or flat PascalCase (`BudgetConfigurationFilterClause`).
- **Suggestion:** Drop underscores at the generator level. Two viable
  shapes:
  1. **Flat PascalCase** —
     `BudgetConfigurationFilterClause`,
     `BudgetConfigurationFilterTagClause`,
     `BudgetConfigurationFilterWorkspaceIdClause`,
     `BudgetConfigurationFilterOperator`,
     `CreateBudgetConfigurationResponse`, etc.
  2. **Namespace nesting** — keep parent name, drop underscore:
     `BudgetConfigurationFilter.Clause`, etc.
  Approach (1) is more straightforward for tree-shaking and module
  re-exports; approach (2) more closely mirrors the proto nesting.

#### F4.2 — Comment in `client.ts:52`: "Fallback for endpoints whose
  path contains {account_id}." (LOW)
- **Where:** `client.ts:52`.
- **Why flagged:** This is a comment, not an identifier — but it
  refers to the *wire* placeholder `{account_id}` in snake_case,
  which is fine. No action.

---

### 5. Cryptic abbreviations

#### F5.1 — `req` (LOW, Go-ism)
- **Where:** `client.ts` every method, `utils.ts:103`.
- Already flagged under F1.7 / F14.1.

#### F5.2 — `resp` (LOW, Go-ism)
- **Where:** `client.ts:85, 113, 147, 190, 236`; `utils.ts:73, 81`.
- See F14.2.

#### F5.3 — `respBody` (LOW)
- **Where:** `client.ts:90, 118, 152, 195, 241`.
- **Why flagged:** "resp" abbreviation. Spell out `responseBody`
  for clarity in TS where verbosity is cheap.
- **Suggestion:** `responseBody`.

#### F5.4 — `httpReq` (LOW)
- **Where:** `client.ts:89, 117, 151, 194, 240`.
- **Why flagged:** `httpRequest` is clearer and matches the type
  `HttpRequest` exactly.
- **Suggestion:** `httpRequest`.

#### F5.5 — `apiErr` (LOW)
- **Where:** `utils.ts:88`.
- **Why flagged:** `apiError` reads better; "err" is a Go-ism.
- **Suggestion:** `apiError`.

#### F5.6 — `pkgJson` (LOW)
- **Where:** `client.ts:19`.
- **Why flagged:** "pkg" abbreviation. `packageJson` is two extra
  characters and unambiguous.
- **Suggestion:** `packageJson`.

#### F5.7 — `acc`, `val`, `opts`, `e` (LOW)
- **Where:** `utils.ts:55, 137, 30, 68-92, 76`.
- **Why flagged:**
  - `acc` (utils.ts:55) — reduce accumulator, conventional. OK.
  - `val` (utils.ts:137) — local destructure, OK.
  - `opts` (utils.ts:30, 68, 73, 75, 81, 83, 88) — Go-ism;
    `options` is preferred but `opts` is also widely used in JS
    libraries. **Inconsistent with itself:** the public parameter
    is `options` (utils.ts:28) but the internal one is `opts`. Pick
    one.
  - `e` for the caught exception (utils.ts:76) — TS guidance is
    `err`/`error`/`e` are all acceptable. Match the file's other
    usages (`apiErr`).
- **Suggestion:** rename `opts → options` inside `executeHttpCall`
  for consistency; leave `acc`, `val`, `e` alone.

---

### 6. Misleading names

#### F6.1 — `BudgetConfigurationFilter_WorkspaceIdClause.values:
  number[]` (MEDIUM)
- **Where:** `model.ts:95`.
- **Why flagged:** Workspace IDs are 64-bit integers on Databricks.
  TypeScript `number` cannot safely represent values > 2^53. Other
  packages in this SDK use `string` for IDs that overflow. This is a
  *type* issue, not a *naming* issue — but the field name `values:
  number[]` does not signal that it is the wrong width. Worth a
  cross-reference (the v1 spec presumably uses int64).
- **Suggestion:** Confirm with the Go reference; if it is `int64`,
  the TS port should be `string[]` or `bigint[]`. If `number` is
  intentional (sometimes IDs fit in 53 bits), document it. Not
  strictly a naming finding, included because it shows up as a
  field-domain mismatch.

#### F6.2 — `quantityThreshold` typed as `string` (LOW)
- **Where:** `model.ts:45`, JSDoc: "The threshold for the budget
  alert to determine if it is in a triggered state."
- **Why flagged:** A "quantity threshold" sounds numeric, yet it is
  a string (probably to preserve precision for currency). The name
  does not signal the string-encoded-decimal contract.
- **Suggestion:** Either rename to `quantityThresholdString` (ugly)
  or add JSDoc noting "Decimal string (preserves precision)" — the
  latter is the standard fix.

#### F6.3 — `BudgetConfiguration.alertConfigurations: AlertConfiguration[]`
  array, but JSDoc says "Budgets must have exactly one alert
  configuration." (MEDIUM)
- **Where:** `model.ts:59-60`, `client.ts:78` JSDoc reuses budget docs.
- **Why flagged:** The plural type contradicts the singular semantics.
  Misleading at the type level.
- **Suggestion:** This is API-shape, not a TS rename concern. Flag for
  the source spec to fix; in TS, document the invariant in JSDoc and
  consider a tuple `[AlertConfiguration]` (overkill in practice).
  See also F9.1.

#### F6.4 — `flattenQueryParams` is exported but unused in this
  package (LOW)
- **Where:** `utils.ts:123-150`.
- **Why flagged:** The name suggests it is a query-param helper for
  this client; the client does not call it (lines 141-145, 175-187
  use `URLSearchParams.append` directly). The function is dead code
  inside this package. Either there is an intended caller that has
  not landed, or the helper should not be in this package.
- **Suggestion:** Move shared helpers to `@databricks/sdk-core` or
  delete from this package's `utils.ts`.

#### F6.5 — JSDoc "previous get all budget configurations call"
  (`pageToken` on `ListBudgetConfigurations`) (LOW)
- **Where:** `model.ts:160-163`.
- **Why flagged:** Documentation, not identifier. The method is
  `listBudgetConfigurations`, not "get all". JSDoc text is stale
  vs. the method name.
- **Suggestion:** Rewrite JSDoc: "A page token received from a
  previous `listBudgetConfigurations` call."

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

#### F7.2 — `CreateBudgetConfiguration`, `GetBudgetConfiguration`,
  `UpdateBudgetConfiguration`, `DeleteBudgetConfiguration`,
  `ListBudgetConfigurations` (HIGH)
- **Where:** `model.ts:98, 133, 143, 156, 175`; `index.ts:21-31`.
- **Why flagged:** Long request type names. Combined with method
  names that already say `createBudgetConfiguration(...)`, the
  argument type is highly redundant. Compare typical TS SDK
  patterns: `client.budgets.create(req: CreateBudgetRequest)`.
- **Suggestion:** Drop the `Configuration` token from request types:
  `CreateBudgetRequest`, `GetBudgetRequest`, `UpdateBudgetRequest`,
  `DeleteBudgetRequest`, `ListBudgetsRequest`. Note the addition of
  an explicit `Request` suffix to match the existing `_Response`
  pattern — see F8.1 / F20.

#### F7.3 — `CreateBudgetConfigurationBudget` and
  `UpdateBudgetConfigurationBudget` (HIGH)
- **Where:** `model.ts:109, 188`; `index.ts:23, 32`.
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
  `BudgetConfiguration` (or `Budget`) directly. See also F11 / F12.

#### F7.4 — Method names mirror request types (MEDIUM)
- **Where:** `client.ts:79, 108, 136, 170, 230`.
- **Why flagged:** Methods are
  `createBudgetConfiguration`, `deleteBudgetConfiguration`,
  `getBudgetConfiguration`, `listBudgetConfigurations`,
  `updateBudgetConfiguration`. Inside a `Budgets` client, the
  `Budget`/`Budgets` suffix is repetitive. Compare typical TS SDK
  shape: `budgets.create(...)`, `budgets.list(...)`.
- **Suggestion:** `create`, `delete`, `get`, `list`, `listIter`,
  `update`. The class itself already conveys "budgets". This is a
  cross-package convention to decide once.

#### F7.5 — `listBudgetConfigurationsIter` (MEDIUM)
- **Where:** `client.ts:212`.
- **Why flagged:** 30 characters, with `Configurations` repeated. The
  `Iter` suffix is also Go-style; in TS the idiomatic alternative
  is an async iterator method (`[Symbol.asyncIterator]`) or a name
  like `listAll` / `streamBudgets`.
- **Suggestion:** Tied to F7.4: collapse to `listIter` or
  better, `iterate`/`stream`/`listAll` — and decide cross-package.

#### F7.6 — `BudgetConfigurationFilter_WorkspaceIdClause` (LOW)
- **Where:** `model.ts:93`.
- **Why flagged:** 43 characters. Even after un-underscoring it remains
  `BudgetConfigurationFilterWorkspaceIdClause` — readable but heavy.
- **Suggestion:** Inside a renamed `Budget.Filter` namespace,
  `WorkspaceIdClause` is fine. If kept flat, `BudgetFilterWorkspaceClause`
  is shorter and equally clear (drop `Id`).

---

### 8. Redundant suffixes

#### F8.1 — `_Response` suffix on every response type (LOW,
  cross-cutting generator concern)
- **Where:** `model.ts:104, 141, 152, 169, 183`.
- **Why flagged:** Every response type uses `_Response`. Underscore
  aside (F4.1), `Response` on a type already on the return path is
  partially redundant — but here it disambiguates from the
  same-named request type, which is fine. The flag is on the
  *underscore*, not the suffix itself.
- **Suggestion:** Drop the underscore (`CreateBudgetResponse`,
  `DeleteBudgetResponse`, etc.) or drop the request token entirely
  (just `BudgetResponse`, `BudgetListResponse`). With F7.2 the
  request types become `CreateBudgetRequest` etc., so this
  resolves naturally.

#### F8.2 — `LIST_PRICE_DOLLARS_USD` (LOW)
- **Where:** `model.ts:10`.
- **Why flagged:** `DOLLARS_USD` is tautological — USD *is* dollars.
  This is a wire-protocol value, so the SDK cannot change it
  unilaterally, but worth noting upstream.
- **Suggestion:** Wire protocol; leave with a comment.

#### F8.3 — `ActionConfigurationType` enum name (LOW)
- **Where:** `model.ts:5`.
- **Why flagged:** `ConfigurationType` is partially tautological with
  the wrapping `ActionConfiguration` type — `ActionConfiguration.actionType:
  ActionConfigurationType`. Reads as
  "actionType: ActionConfigurationType" with "action" said three times.
- **Suggestion:** Rename enum to `ActionType` (within an
  `ActionConfiguration` parent, or after renaming the parent to
  `BudgetAlertAction`, the enum becomes `BudgetAlertAction.Type` or
  simply `BudgetAlertActionType`).

#### F8.4 — `AlertConfigurationQuantityType`,
  `AlertConfigurationTimePeriod`, `AlertConfigurationTriggerType` (LOW)
- **Where:** `model.ts:9, 13, 17`.
- **Why flagged:** Same pattern as F8.3 — `AlertConfiguration` parent +
  `QuantityType`/`TimePeriod`/`TriggerType` suffix. With parent renamed to
  `BudgetAlert` (see F7), suffixes become reasonable:
  `BudgetAlertQuantityType`, `BudgetAlertTimePeriod`,
  `BudgetAlertTriggerType`.
- **Suggestion:** Tie to F7.

---

### 9. Singular / plural mismatches

#### F9.1 — `alertConfigurations: AlertConfiguration[]` plural but
  semantically singular (HIGH)
- **Where:** `model.ts:59-60, 118-119, 197-198`.
- **Why flagged:** JSDoc states "Budgets must have exactly one alert
  configuration." Field is plural array. Documented earlier (F6.3) as
  misleading.
- **Suggestion:** API-shape concern; document the invariant or
  switch to singular `alertConfiguration: AlertConfiguration` when
  the API allows.

#### F9.2 — `actionConfigurations: ActionConfiguration[]` (acceptable)
- **Where:** `model.ts:47`.
- **Why flagged:** No mismatch — multiple actions per alert are
  allowed. Plural is correct.

#### F9.3 — `tags: BudgetConfigurationFilter_TagClause[]` (acceptable)
- Plural-array, no mismatch.

#### F9.4 — `workspaceId: BudgetConfigurationFilter_WorkspaceIdClause`
  on `BudgetConfigurationFilter` (HIGH)
- **Where:** `model.ts:72`.
- **Why flagged:** The field is singular `workspaceId` but its type
  is a clause whose `values: number[]` holds *multiple* workspace IDs.
  Reading `filter.workspaceId.values` is confusing — you would expect
  `workspaceId` to be one ID, but it's a clause.
- **Suggestion:** Rename the field to `workspaceIds`, `workspaceFilter`,
  or `workspaces`. Pair with renaming the type from
  `WorkspaceIdClause` to `WorkspaceFilter`. The whole clause
  abstraction is unnecessary in TS — see F11.

#### F9.5 — `budgets` field in `ListBudgetConfigurations_Response`
  (acceptable)
- Plural, correct.

#### F9.6 — `listBudgetConfigurations` vs `listBudgetConfigurationsIter`
  (acceptable)
- Plural form is correct here.

---

### 10. Reserved-word / built-in collisions

#### F10.1 — `filter` field (LOW)
- **Where:** `model.ts:65, 124, 203`.
- **Why flagged:** `filter` is `Array.prototype.filter` — not a
  reserved word, but shadowing a built-in causes mental hiccups
  during code review. Acceptable here because the field is on
  `BudgetConfiguration`, not on an array.
- **Suggestion:** Keep; not worth churn.

#### F10.2 — `target` field (LOW)
- **Where:** `model.ts:32`.
- **Why flagged:** `target` collides with `EventTarget` /
  `event.target` semantics in DOM. Minor.
- **Suggestion:** See F1.2 — rename to `recipient` resolves both.

#### F10.3 — `values` (LOW)
- **Where:** `model.ts:83, 95`.
- **Why flagged:** `Object.values` is a popular built-in. Property
  shadowing only, not a true collision.
- **Suggestion:** See F1.4 — specialize per type.

#### F10.4 — `Headers` constructor use vs DOM `Headers` (acceptable)
- **Where:** `client.ts:87, 115, 149, 192, 238`.
- The code intentionally uses the global `Headers`. No new identifier
  shadows it. Fine.

#### F10.5 — `URLSearchParams`, `TextDecoder` (acceptable)
- Used as global classes, no shadowing.

---

### 11. Empty / trivial wrapper types

_None._

---

### 12. Duplicate concepts

#### F12.1 — `BudgetConfiguration` vs `CreateBudgetConfigurationBudget`
  vs `UpdateBudgetConfigurationBudget` (HIGH)
- **Where:** `model.ts:50, 109, 188`.
- **Why flagged:** Three types with byte-for-byte identical fields.
  Already noted in F7.3. They exist because the API contract
  *might* diverge later (e.g. `Update` strips server-managed fields),
  but today they are duplicates.
- **Suggestion:** Collapse to a single `BudgetConfiguration` (or
  `Budget`) where the spec allows. If the spec mandates separate
  shapes, document *why* each is distinct in JSDoc.

#### F12.2 — `BudgetConfigurationFilter_Clause` and
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

#### F12.3 — Per-method header construction duplicated (LOW, code style)
- **Where:** `client.ts:87, 115, 149, 192, 238`.
- **Why flagged:** Every method runs:
  ```ts
  const headers = new Headers(...);
  headers.set('User-Agent', this.userAgent);
  ```
  Could be a private helper `this.buildHeaders(...)`. Not a naming
  issue, but a code-duplication smell.
- **Suggestion:** Out of scope for naming audit. Mentioned for
  completeness.

#### F12.4 — `accountId` declared on both the request envelope and
  the inner `Budget` (LOW)
- **Where:**
  - `CreateBudgetConfigurationBudget.accountId` (model.ts:113)
  - `UpdateBudgetConfigurationBudget.accountId` (model.ts:192)
  - `DeleteBudgetConfiguration.accountId` (model.ts:137)
  - `GetBudgetConfiguration.accountId` (model.ts:147)
  - `ListBudgetConfigurations.accountId` (model.ts:158)
  - `UpdateBudgetConfiguration` has no top-level `accountId`; it
    pulls from `req.budget?.accountId` (`client.ts:234`)
  - `CreateBudgetConfiguration` likewise uses
    `req.budget?.accountId` (`client.ts:83`)
- **Why flagged:** Inconsistent location of `accountId` between
  request types. Some have it at the top level, some require it
  nested under `budget`. Reader can't tell from the type which to
  set. The fallback `this.accountId ?? ''` in
  `delete/get/list` masks the inconsistency.
- **Suggestion:** Standardize: lift `accountId` to the top-level
  request envelope for *all* methods. The Go/proto layer can keep
  nesting; the TS client should flatten.

#### F12.5 — `budgetId` on
  `Delete/Get/UpdateBudgetConfiguration` vs `budgetConfigurationId`
  on `BudgetConfiguration` and
  `Create/UpdateBudgetConfigurationBudget` (HIGH)
- **Where:**
  - `DeleteBudgetConfiguration.budgetId` (model.ts:135)
  - `GetBudgetConfiguration.budgetId` (model.ts:145)
  - `UpdateBudgetConfiguration.budgetId` (model.ts:177)
  - `BudgetConfiguration.budgetConfigurationId` (model.ts:52)
  - `CreateBudgetConfigurationBudget.budgetConfigurationId`
    (model.ts:111)
  - `UpdateBudgetConfigurationBudget.budgetConfigurationId`
    (model.ts:190)
- **Why flagged:** Same conceptual ID, two different names. This is
  the prototypical "same thing, two names" duplicate concept. Most
  egregious example: `UpdateBudgetConfiguration` has both
  `budgetId` (top-level) *and* the nested `budget.budgetConfigurationId`.
- **Suggestion:** Pick one. `budgetId` is shorter and matches the
  REST path segment (`/budgets/{budgetId}`). Rename
  `budgetConfigurationId → budgetId` everywhere. Combined with
  the F7.1 rename `BudgetConfiguration → Budget`, this is consistent.

---

### 13. Verb-tense inconsistency

#### F13.1 — Method verbs (acceptable)
- `create*`, `delete*`, `get*`, `list*`, `update*` — uniform
  imperative present. Good.

#### F13.2 — `marshalRequest` / `parseResponse` (acceptable)
- `marshalRequest` (utils.ts:119) is imperative; `parseResponse`
  (utils.ts:113) is imperative. Consistent.

#### F13.3 — `unmarshalXSchema` constants (LOW, code style)
- **Where:** `model.ts:208, 221, 242, …` and all `marshal…Schema`.
- **Why flagged:** Naming pattern is correct (verb + noun + Schema),
  but the verb form makes them read like functions, not constants.
  They *are* values (`z.ZodType` objects). The Zod community
  conventionally exports schemas as PascalCase nouns
  (`BudgetSchema`) or `budgetSchema` in camelCase. Verb prefix is
  unusual.
- **Suggestion:** Rename to `budgetWireSchema` / `budgetReadSchema`
  or pair `budgetEncoder` / `budgetDecoder`. Cross-cutting; tied to
  generator.

#### F13.4 — `createTime`, `updateTime` vs `created_at`/`updated_at`
  conventions (LOW)
- **Where:** `model.ts:56-58, 115-117, 194-196`.
- **Why flagged:** Past-tense `createdTime` / `updatedTime` (or
  `createdAt`/`updatedAt`) is more idiomatic; current form reads
  as imperative ("create the time"). This is a noun form ("the
  time of creation"), which is fine but ambiguous on first read.
  This matches Google API conventions, so it is defensible.
- **Suggestion:** Keep for parity with Go/proto and Google API
  convention. Just note that `createdTime`/`updatedTime` would read
  more naturally in TS.

---

### 14. Go / Java-style names

#### F14.1 — `req`, `resp`, `err`, `Iter`, `httpReq`, `apiErr`,
  `pkgJson`, `opts` (HIGH, but cross-cutting)
- **Where:**
  - `req` everywhere in `client.ts`
  - `resp` everywhere in `client.ts` and `utils.ts:73, 81`
  - `e` in `utils.ts:76` (with rethrow)
  - `Iter` suffix in `listBudgetConfigurationsIter`
  - `httpReq` in client.ts
  - `apiErr` in utils.ts:88
  - `pkgJson` in client.ts:19
  - `opts` in utils.ts:30, 68
- **Why flagged:** These are all classic Go idioms ported verbatim.
  TS convention favors spelled-out names (`request`, `response`,
  `error`, `iterator`/`stream`/`listAll`, `httpRequest`,
  `apiError`, `packageJson`, `options`).
- **Suggestion:** Spell them out. Trivial diff, large readability
  gain. This is a porting-convention decision and should be made
  globally at the generator level.

#### F14.2 — `unmarshal*` / `marshal*` schema prefixes (LOW)
- **Where:** All schema exports.
- **Why flagged:** `marshal`/`unmarshal` is a Go term
  (encoding/json). The JS/TS world says "serialize"/"deserialize"
  or "encode"/"decode". `JSON.parse`/`JSON.stringify` is the
  vernacular. `marshal` is recognizable but Go-flavored.
- **Suggestion:** Rename to `encode`/`decode` or
  `serialize`/`deserialize`. Generator-level decision.

#### F14.3 — `Schema` suffix on Zod constants (acceptable)
- The `…Schema` suffix matches Zod community convention.

#### F14.4 — `_Response` (and other) underscore-pseudo-nesting (HIGH)
- See F4.1. Underscores are foreign to TS.

#### F14.5 — Comment style (acceptable)
- Comments are sentences. Good — but the file-top comment is the
  generator banner.

---

### 15. Generic field names losing meaning

#### F15.1 — `target` on `ActionConfiguration` (HIGH)
- See F1.2 / F1.3.

#### F15.2 — `values` on Clauses (MEDIUM)
- See F1.4.

#### F15.3 — `operator` on Clauses (LOW)
- See F1.5.

#### F15.4 — `key` and `value` on `BudgetConfigurationFilter_TagClause`
  (LOW)
- **Where:** `model.ts:88-89`.
- **Why flagged:** "key/value" is generic enough that without the
  wrapping type, readers can't tell it is a *tag* key. Acceptable
  because the wrapping type's name supplies context, but
  `tagKey`/`tagValue` would be self-documenting.
- **Suggestion:** Optional rename to `tagKey`/`tagValue`. Wire field
  is `key`/`value`, so renaming costs an extra mapping in the
  marshaller.

#### F15.5 — `req` parameter on every client method (HIGH)
- See F1.7.

---

### 16. Field contradicting type domain

#### F16.1 — `ActionConfiguration.target` (HIGH)
- **Where:** `model.ts:32`.
- **Why flagged:** Type domain is "alert action" (currently
  email-only); field name is the generic "target". JSDoc admits "For
  example, an email address." Type-domain dissonance.
- **Suggestion:** `recipient` (or `emailAddress` if email-only is
  hard-wired). See F1.2.

#### F16.2 — `BudgetConfigurationFilter_WorkspaceIdClause` typed
  as `number[]` (MEDIUM)
- **Where:** `model.ts:95`. See F6.1.

#### F16.3 — `LIST_PRICE_DOLLARS_USD` member on
  `AlertConfigurationQuantityType` (LOW)
- **Where:** `model.ts:10`.
- **Why flagged:** Name implies *currency*, type is "quantity type".
  The "quantity" in the API is a dollar amount. Minor domain
  mismatch — could be `Currency`, `Cost`, or `Price` enum.
- **Suggestion:** Out of scope for TS rename; wire value.

---

### 17. Inconsistent action verbs

#### F17.1 — `Get` vs `List` for read endpoints (acceptable)
- `get` for single, `list` for collection. Standard REST verbs.

#### F17.2 — `listBudgetConfigurationsIter` (MEDIUM)
- **Where:** `client.ts:212`.
- **Why flagged:** `Iter` is not a verb; it is a suffix attached to
  `list`. In TS the pattern `list` returns a single page, `listAll`
  or `stream*` returns an async iterator. `listIter` is fine but
  inconsistent across SDKs.
- **Suggestion:** Pick `listAll` or `iterate` or expose
  `[Symbol.asyncIterator]` on a paginator object. Cross-cutting.

#### F17.3 — `marshal` / `unmarshal` (Go-style verbs, LOW)
- See F14.2.

#### F17.4 — `parseResponse` vs `marshalRequest` (LOW, asymmetry)
- **Where:** `utils.ts:113, 119`.
- **Why flagged:** `parse` vs `marshal` use different verbs for the
  same kind of operation (JSON conversion). Inconsistent verb
  choice.
- **Suggestion:** Use the same axis throughout: either
  `marshal/unmarshal` or `encode/decode` or `serialize/deserialize`.

---

### 18. Long enum values

#### F18.1 — `CUMULATIVE_SPENDING_EXCEEDED` (MEDIUM)
- **Where:** `model.ts:18`.
- **Why flagged:** 28 characters. Long but informative.
- **Suggestion:** Wire value; cannot rename in TS without losing
  parity. Acceptable.

#### F18.2 — `LIST_PRICE_DOLLARS_USD` (MEDIUM)
- **Where:** `model.ts:10`.
- **Why flagged:** 22 characters; `DOLLARS_USD` is doubly redundant
  (F8.2). Could be `LIST_PRICE_USD` or `USD`.
- **Suggestion:** Wire value; report upstream.

#### F18.3 — `EMAIL_NOTIFICATION` (LOW)
- **Where:** `model.ts:6`. 18 characters; reasonable.

---

### 19. Underspecified IDs

#### F19.1 — `budgetId` vs `budgetConfigurationId` for the same thing
  (HIGH)
- See F12.5. The `budgetId` form is *less* underspecified than
  `budgetConfigurationId` if the package name carries "budgets"
  context — both are unambiguous in this package; the issue is
  inconsistency.

#### F19.2 — `actionConfigurationId`, `alertConfigurationId` (LOW)
- **Where:** `model.ts:28, 37`.
- **Why flagged:** Long. If `ActionConfiguration` renames to
  `BudgetAlertAction`, the ID becomes `budgetAlertActionId`
  (still long) or just `actionId` inside its parent.
- **Suggestion:** Inside the parent, the local field name can be
  just `id`. The full form is only needed when referenced
  externally.

#### F19.3 — `accountId` (acceptable)
- Specific enough; matches platform-wide convention.

#### F19.4 — `workspaceId` on `BudgetConfigurationFilter` field, but
  the field holds a *clause* not an ID (HIGH)
- See F9.4. The name *says* it is one ID; it isn't.

---

### 20. Type-suffix tautology

#### F20.1 — `ActionConfigurationType` enum + `actionType` field on
  `ActionConfiguration` (MEDIUM)
- **Where:** `model.ts:5, 30`.
- **Why flagged:** Three layers of "action":
  `ActionConfiguration.actionType: ActionConfigurationType`. The
  type name has "ActionConfiguration" twice, the field name has
  "action" + "Type". Drop tokens.
- **Suggestion:** With `BudgetAlertAction` parent renamed, the field
  is `type: BudgetAlertActionType` (or use a discriminated union
  if there are sub-shapes).

#### F20.2 — `AlertConfigurationQuantityType` enum +
  `quantityType` field (MEDIUM)
- **Where:** `model.ts:9, 43`.
- **Why flagged:** `quantityType: AlertConfigurationQuantityType`
  reads with "quantity" said three times.
- **Suggestion:** Rename enum to `BudgetAlertQuantityType`; field
  remains `quantityType`. Acceptable shape.

#### F20.3 — `AlertConfigurationTriggerType` enum + `triggerType`
  field (LOW)
- **Where:** `model.ts:17, 41`.
- Same pattern as F20.2.

#### F20.4 — `AlertConfigurationTimePeriod` enum + `timePeriod` field
  (LOW)
- **Where:** `model.ts:13, 39`. Same pattern.

#### F20.5 — Generic `_ResponseSchema` on every wrap (LOW)
- **Where:** `model.ts:319, 329, 333, 343, 357`.
- **Why flagged:** `unmarshalCreateBudgetConfiguration_ResponseSchema`
  is 51 characters with "Schema" suffixed onto an already-typed
  `z.ZodType<...>`. The `Schema` suffix is conventional in Zod
  ecosystems though.
- **Suggestion:** Acceptable; tied to generator.

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

### F-OVERLAP.3 — Package directory name `budgets` (plural) vs
  `budgetpolicy` (singular) (LOW)
- Cross-package naming pluralization inconsistency. Other examples
  in the repo: `clusters` vs `clusterpolicies` vs `budgetpolicy`.
  Mixed.
- **Suggestion:** Cross-cutting style decision. Pick one.

---

## Summary table

| # | Category                                | Findings |
| - | --------------------------------------- | -------- |
| 1 | Vague / generic                         | 7        |
| 2 | Redundant enum prefixes                 | 5 (3 acceptable) |
| 3 | Acronym casing                          | 4 (3 acceptable) |
| 4 | Underscores in TS identifiers           | 2 |
| 5 | Cryptic abbreviations                   | 7 |
| 6 | Misleading names                        | 5 |
| 7 | Overly verbose                          | 6 |
| 8 | Redundant suffixes                      | 4 |
| 9 | Singular / plural mismatch              | 6 (4 acceptable) |
| 10 | Reserved-word collisions               | 5 (3 acceptable) |
| 11 | Empty / trivial wrappers               | 0 |
| 12 | Duplicate concepts                     | 5 |
| 13 | Verb-tense inconsistency               | 4 (2 acceptable) |
| 14 | Go / Java-style names                  | 5 |
| 15 | Generic field names                    | 5 |
| 16 | Field contradicting type domain        | 3 |
| 17 | Inconsistent action verbs              | 4 (1 acceptable) |
| 18 | Long enum values                       | 3 |
| 19 | Underspecified IDs                     | 4 (1 acceptable) |
| 20 | Type-suffix tautology                  | 5 |
| OVERLAP | budgets vs budgetpolicy             | 3 |

---

## Top highest-impact renames (recommended order)

1. **F12.5:** `budgetConfigurationId` → `budgetId` (or pick one
   universally). Same concept under two names is the worst smell here.
2. **F7.1 / F7.3 / F12.1:** Collapse `BudgetConfiguration`,
   `CreateBudgetConfigurationBudget`,
   `UpdateBudgetConfigurationBudget` into a single `Budget` type.
3. **F9.4 / F19.4:** Rename
   `BudgetConfigurationFilter.workspaceId` to `workspaces` (and
   its type to `WorkspaceFilter`); fix singular-noun-for-plural-clause
   mismatch.
4. **F1.1 / F1.2 / F16.1 / F20.1:** Rename `ActionConfiguration`
   to `BudgetAlertAction`, `target` to `recipient`,
   `ActionConfigurationType` to `BudgetAlertActionType`.
5. **F7.2 / F7.4:** Drop "Configuration" from request type names
   (`CreateBudgetRequest`) and method names
   (`budgets.create(...)`); document explicit `Request`/`Response`
   suffix convention.
6. **F4.1 / F14.4:** Replace underscored proto-style names with
   flat PascalCase or namespaces; eliminates all
   `eslint-disable-next-line` for `naming-convention`.
7. **F12.4:** Lift `accountId` to top-level on all request types
   (currently nested under `budget` for create/update only).
8. **F14.1 / F5.x:** Spell out `req`/`resp`/`err`/`Iter`/`opts`/
   `pkgJson` etc. across all generated code.

---

## Notes / out-of-scope

- All findings above relate to **generated** code. Code-base rule:
  "Code generated from API definition by Databricks SDK Generator.
  DO NOT EDIT." The fixes belong upstream in the generator and
  spec. This audit is a backlog for that generator.
- The `utils.ts` file contains the same generic helpers
  (`executeCall`, `parseResponse`, `marshalRequest`,
  `flattenQueryParams`, `executeHttpCall`, `buildHttpRequest`,
  `readAll`) that every generated package duplicates. The
  duplication itself is not a naming issue, but the *names*
  (`marshal/unmarshal`) are Go-flavored and inconsistent
  (`parseResponse` vs `marshalRequest`).
- This package has no `tests/` directory (verified by repo
  structure check), so the audit does not cover test naming.
