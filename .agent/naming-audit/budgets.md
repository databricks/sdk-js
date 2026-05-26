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

#### F3.1 — `Id` vs `ID` (acceptable)
- **Where:** `model.ts:28, 37, 52, 54, 100, 102, 135, 137, 145, 147,
  158, 177, 179, 197`; `client.ts:53, 66, 83, 115, 143, 177, 237`.
- **Why flagged:** This SDK uses **lower-camel `Id`** consistently
  (`accountId`, `budgetId`, `budgetConfigurationId`,
  `actionConfigurationId`, `alertConfigurationId`, `workspaceId`,
  `nextPageToken`, `pageToken`). That is internally consistent and
  fine. The TS/JS community is split — DOM uses `nodeId`/`HTMLElement`,
  TypeScript itself uses `id`/`uuid` — so `Id` is defensible.
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
  redundant — USD already is dollars. See F7.1.

---

### 4. Underscores in TS identifiers

_None._

---

### 5. Cryptic abbreviations

#### F5.1 — `req` (LOW, Go-ism)
- **Where:** `client.ts` every method, `utils.ts:103`.
- Already flagged under F1.7 / F13.1.

#### F5.2 — `resp` (LOW, Go-ism)
- **Where:** `client.ts:88, 116, 150, 193, 242`; `utils.ts:73, 75, 81, 84, 88`.
- See F13.1.

#### F5.3 — `respBody` (LOW)
- **Where:** `client.ts:93, 121, 155, 198, 247`.
- **Why flagged:** "resp" abbreviation. Spell out `responseBody`
  for clarity in TS where verbosity is cheap.
- **Suggestion:** `responseBody`.

#### F5.4 — `httpReq` (LOW)
- **Where:** `client.ts:92, 120, 154, 197, 246`.
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
- **Where:** `utils.ts:55, 137, 30, 66-92, 76`.
- **Why flagged:**
  - `acc` (utils.ts:55) — reduce accumulator, conventional. OK.
  - `val` (utils.ts:137) — local destructure, OK.
  - `opts` (utils.ts:30, 37, 66, 68, 69, 70, 75, 77, 83) — Go-ism;
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
  See also F8.1.

#### F6.4 — `flattenQueryParams` is exported but unused in this
  package (LOW)
- **Where:** `utils.ts:123-150`.
- **Why flagged:** The name suggests it is a query-param helper for
  this client; the client does not call it (lines 144-148, 178-190
  use `URLSearchParams.append` directly). The function is dead code
  inside this package. Either there is an intended caller that has
  not landed, or the helper should not be in this package.
- **Suggestion:** Move shared helpers to `@databricks/sdk-core` or
  delete from this package's `utils.ts`.

#### F6.5 — JSDoc "previous get all budget configurations call"
  (`pageToken` on `ListBudgetConfigurationsRequest`) (LOW)
- **Where:** `model.ts:160-162`.
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

#### F7.4 — `LIST_PRICE_DOLLARS_USD` doubly redundant (LOW)
- **Where:** `model.ts:10`.
- **Why flagged:** `DOLLARS_USD` is tautological — USD *is* dollars.
  This is a wire-protocol value, so the SDK cannot change it
  unilaterally, but worth noting upstream. See also F17.2.
- **Suggestion:** Wire protocol; leave with a comment.

---

### 8. Singular / plural mismatches

#### F8.1 — `alertConfigurations: AlertConfiguration[]` plural but
  semantically singular (HIGH)
- **Where:** `model.ts:59-60, 107-108, 184-185`.
- **Why flagged:** JSDoc states "Budgets must have exactly one alert
  configuration." Field is plural array. Documented earlier (F6.3) as
  misleading.
- **Suggestion:** API-shape concern; document the invariant or
  switch to singular `alertConfiguration: AlertConfiguration` when
  the API allows.

#### F8.2 — `actionConfigurations: ActionConfiguration[]` (acceptable)
- **Where:** `model.ts:47`.
- **Why flagged:** No mismatch — multiple actions per alert are
  allowed. Plural is correct.

#### F8.3 — `tags: BudgetConfigurationFilter_TagClause[]` (acceptable)
- Plural-array, no mismatch.

#### F8.4 — `workspaceId: BudgetConfigurationFilter_WorkspaceIdClause`
  on `BudgetConfigurationFilter` (HIGH)
- **Where:** `model.ts:72`.
- **Why flagged:** The field is singular `workspaceId` but its type
  is a clause whose `values: number[]` holds *multiple* workspace IDs.
  Reading `filter.workspaceId.values` is confusing — you would expect
  `workspaceId` to be one ID, but it's a clause.
- **Suggestion:** Rename the field to `workspaceIds`, `workspaceFilter`,
  or `workspaces`. Pair with renaming the type from
  `WorkspaceIdClause` to `WorkspaceFilter`. The whole clause
  abstraction is unnecessary in TS — see F10.

#### F8.5 — `budgets` field in `ListBudgetConfigurationsRequest_Response`
  (acceptable)
- Plural, correct.

---

### 9. Reserved-word / built-in collisions

#### F9.1 — `filter` field (LOW)
- **Where:** `model.ts:65, 113, 190`.
- **Why flagged:** `filter` is `Array.prototype.filter` — not a
  reserved word, but shadowing a built-in causes mental hiccups
  during code review. Acceptable here because the field is on
  `BudgetConfiguration`, not on an array.
- **Suggestion:** Keep; not worth churn.

#### F9.2 — `target` field (LOW)
- **Where:** `model.ts:32`.
- **Why flagged:** `target` collides with `EventTarget` /
  `event.target` semantics in DOM. Minor.
- **Suggestion:** See F1.2 — rename to `recipient` resolves both.

#### F9.3 — `values` (LOW)
- **Where:** `model.ts:83, 95`.
- **Why flagged:** `Object.values` is a popular built-in. Property
  shadowing only, not a true collision.
- **Suggestion:** See F1.4 — specialize per type.

#### F9.4 — `Headers` constructor use vs DOM `Headers` (acceptable)
- **Where:** `client.ts:90, 118, 152, 195, 244`.
- The code intentionally uses the global `Headers`. No new identifier
  shadows it. Fine.

#### F9.5 — `URLSearchParams`, `TextDecoder` (acceptable)
- Used as global classes, no shadowing.

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

#### F11.3 — Per-method header construction duplicated (LOW, code style)
- **Where:** `client.ts:90, 118, 152, 195, 244`.
- **Why flagged:** Every method runs:
  ```ts
  const headers = new Headers(...);
  headers.set('User-Agent', this.userAgent);
  ```
  Could be a private helper `this.buildHeaders(...)`. Not a naming
  issue, but a code-duplication smell.
- **Suggestion:** Out of scope for naming audit. Mentioned for
  completeness.

#### F11.4 — `accountId` declared on both the request envelope and
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

#### F11.5 — `budgetId` on
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

#### F12.1 — Method verbs (acceptable)
- `create*`, `delete*`, `get*`, `list*`, `update*` — uniform
  imperative present. Good.

#### F12.2 — `createTime`, `updateTime` vs `created_at`/`updated_at`
  conventions (LOW)
- **Where:** `model.ts:56-58, 104-106, 181-183`.
- **Why flagged:** Past-tense `createdTime` / `updatedTime` (or
  `createdAt`/`updatedAt`) is more idiomatic; current form reads
  as imperative ("create the time"). This is a noun form ("the
  time of creation"), which is fine but ambiguous on first read.
  This matches Google API conventions, so it is defensible.
- **Suggestion:** Keep for parity with Go/proto and Google API
  convention. Just note that `createdTime`/`updatedTime` would read
  more naturally in TS.

---

### 13. Go / Java-style names

#### F13.1 — `req`, `resp`, `err`, `httpReq`, `apiErr`,
  `pkgJson`, `opts` (HIGH, but cross-cutting)
- **Where:**
  - `req` everywhere in `client.ts`
  - `resp` everywhere in `client.ts` and `utils.ts:73, 75, 81, 84, 88`
  - `e` in `utils.ts:76` (with rethrow)
  - `httpReq` in client.ts
  - `apiErr` in utils.ts:88
  - `pkgJson` in client.ts:19
  - `opts` in utils.ts:30, 66
- **Why flagged:** These are all classic Go idioms ported verbatim.
  TS convention favors spelled-out names (`request`, `response`,
  `error`, `httpRequest`, `apiError`, `packageJson`, `options`).
- **Suggestion:** Spell them out. Trivial diff, large readability
  gain. This is a porting-convention decision and should be made
  globally at the generator level.

#### F13.2 — Comment style (acceptable)
- Comments are sentences. Good — but the file-top comment is the
  generator banner.

---

### 14. Generic field names losing meaning

#### F14.1 — `target` on `ActionConfiguration` (HIGH)
- See F1.2 / F1.3.

#### F14.2 — `values` on Clauses (MEDIUM)
- See F1.4.

#### F14.3 — `operator` on Clauses (LOW)
- See F1.5.

#### F14.4 — `key` and `value` on `BudgetConfigurationFilter_TagClause`
  (LOW)
- **Where:** `model.ts:88-89`.
- **Why flagged:** "key/value" is generic enough that without the
  wrapping type, readers can't tell it is a *tag* key. Acceptable
  because the wrapping type's name supplies context, but
  `tagKey`/`tagValue` would be self-documenting.
- **Suggestion:** Optional rename to `tagKey`/`tagValue`. Wire field
  is `key`/`value`, so renaming costs an extra mapping in the
  marshaller.

#### F14.5 — `req` parameter on every client method (HIGH)
- See F1.7.

---

### 15. Field contradicting type domain

#### F15.1 — `ActionConfiguration.target` (HIGH)
- **Where:** `model.ts:32`.
- **Why flagged:** Type domain is "alert action" (currently
  email-only); field name is the generic "target". JSDoc admits "For
  example, an email address." Type-domain dissonance.
- **Suggestion:** `recipient` (or `emailAddress` if email-only is
  hard-wired). See F1.2.

#### F15.2 — `BudgetConfigurationFilter_WorkspaceIdClause` typed
  as `number[]` (MEDIUM)
- **Where:** `model.ts:95`. See F6.1.

#### F15.3 — `LIST_PRICE_DOLLARS_USD` member on
  `AlertConfigurationQuantityType` (LOW)
- **Where:** `model.ts:10`.
- **Why flagged:** Name implies *currency*, type is "quantity type".
  The "quantity" in the API is a dollar amount. Minor domain
  mismatch — could be `Currency`, `Cost`, or `Price` enum.
- **Suggestion:** Out of scope for TS rename; wire value.

---

### 16. Inconsistent action verbs

#### F16.1 — `Get` vs `List` for read endpoints (acceptable)
- `get` for single, `list` for collection. Standard REST verbs.

---

### 17. Long enum values

#### F17.1 — `CUMULATIVE_SPENDING_EXCEEDED` (MEDIUM)
- **Where:** `model.ts:18`.
- **Why flagged:** 28 characters. Long but informative.
- **Suggestion:** Wire value; cannot rename in TS without losing
  parity. Acceptable.

#### F17.2 — `LIST_PRICE_DOLLARS_USD` (MEDIUM)
- **Where:** `model.ts:10`.
- **Why flagged:** 22 characters; `DOLLARS_USD` is doubly redundant
  (F7.4). Could be `LIST_PRICE_USD` or `USD`.
- **Suggestion:** Wire value; report upstream.

#### F17.3 — `EMAIL_NOTIFICATION` (LOW)
- **Where:** `model.ts:6`. 18 characters; reasonable.

---

### 18. Underspecified IDs

#### F18.1 — `budgetId` vs `budgetConfigurationId` for the same thing
  (HIGH)
- See F11.5. The `budgetId` form is *less* underspecified than
  `budgetConfigurationId` if the package name carries "budgets"
  context — both are unambiguous in this package; the issue is
  inconsistency.

#### F18.2 — `actionConfigurationId`, `alertConfigurationId` (LOW)
- **Where:** `model.ts:28, 37`.
- **Why flagged:** Long. If `ActionConfiguration` renames to
  `BudgetAlertAction`, the ID becomes `budgetAlertActionId`
  (still long) or just `actionId` inside its parent.
- **Suggestion:** Inside the parent, the local field name can be
  just `id`. The full form is only needed when referenced
  externally.

#### F18.3 — `accountId` (acceptable)
- Specific enough; matches platform-wide convention.

#### F18.4 — `workspaceId` on `BudgetConfigurationFilter` field, but
  the field holds a *clause* not an ID (HIGH)
- See F8.4. The name *says* it is one ID; it isn't.

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
| 2 | Redundant enum prefixes                 | 0 |
| 3 | Acronym casing                          | 4 (4 acceptable) |
| 4 | Underscores in TS identifiers           | 0 |
| 5 | Cryptic abbreviations                   | 7 |
| 6 | Misleading names                        | 5 |
| 7 | Overly verbose                          | 4 |
| 8 | Singular / plural mismatch              | 5 (3 acceptable) |
| 9 | Reserved-word collisions                | 5 (3 acceptable) |
| 10 | Empty / trivial wrappers               | 0 |
| 11 | Duplicate concepts                     | 5 |
| 12 | Verb-tense inconsistency               | 2 (1 acceptable) |
| 13 | Go / Java-style names                  | 2 (1 acceptable) |
| 14 | Generic field names                    | 5 |
| 15 | Field contradicting type domain        | 3 |
| 16 | Inconsistent action verbs              | 1 (1 acceptable) |
| 17 | Long enum values                       | 3 |
| 18 | Underspecified IDs                     | 4 (1 acceptable) |
| OVERLAP | budgets vs budgetpolicy             | 3 |

---

## Top highest-impact renames (recommended order)

1. **F11.5:** `budgetConfigurationId` → `budgetId` (or pick one
   universally). Same concept under two names is the worst smell here.
2. **F7.1 / F7.3 / F11.1:** Collapse `BudgetConfiguration`,
   `CreateBudgetConfigurationBudget`,
   `UpdateBudgetConfigurationBudget` into a single `Budget` type.
3. **F8.4 / F18.4:** Rename
   `BudgetConfigurationFilter.workspaceId` to `workspaces` (and
   its type to `WorkspaceFilter`); fix singular-noun-for-plural-clause
   mismatch.
4. **F1.1 / F1.2 / F15.1:** Rename `ActionConfiguration`
   to `BudgetAlertAction`, `target` to `recipient`.
5. **F7.2:** Drop "Configuration" from request type names
   (`CreateBudgetRequest`).
6. **F11.4:** Lift `accountId` to top-level on all request types
   (currently nested under `budget` for create/update only).
7. **F13.1 / F5.x:** Spell out `req`/`resp`/`err`/`opts`/
   `pkgJson` etc. across all generated code.

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

## Fixed

_None._
