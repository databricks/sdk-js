# Naming Audit: logdelivery

**Path:** `packages/logdelivery/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level CRUD for log delivery configurations
(`POST/GET/PATCH /api/2.0/accounts/{account_id}/log-delivery`). A log
delivery configuration ties a `credentialsId` (AWS IAM role) and a
`storageConfigurationId` (S3 bucket) to a log type (`BILLABLE_USAGE` or
`AUDIT_LOGS`), optionally scoped by a workspace-IDs filter. There is no
delete endpoint by design — the API only supports disabling via the
update (`PATCH`) method.
**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 5 |
| Low | 3 |
| Observation | 1 |

## High severity

### 1. `LogDeliveryStatusEnum` — type name carries `Enum` suffix — `src/v1/model.ts:39`
- **Why weird:** `LogDeliveryStatusEnum` is the only type in the package whose name ends in `Enum`. The three sibling enums (`LogDeliveryConfigStatus` at line 12, `LogDeliveryOutputFormat` at line 23, `LogDeliveryType` at line 56) carry no such suffix. The `Enum` tail exists because the simpler name `LogDeliveryStatus` is already claimed by the wrapper *interface* at `model.ts:208` (which holds `lastAttemptTime`, `lastSuccessfulAttemptTime`, `message`, and `status`).
- **Category:** 20 (type-suffix tautology), 12 (duplicate concept — `LogDeliveryStatus` interface and `LogDeliveryStatusEnum` enum coexist).
- **Suggested name:** Rename the wrapper interface `LogDeliveryStatus` → `LogDeliveryAttempt` (it models the most-recent attempt, not the status per se), and rename the enum `LogDeliveryStatusEnum` → `LogDeliveryAttemptStatus`. The field site then reads `attempt.status: LogDeliveryAttemptStatus` instead of `logDeliveryStatus.status: LogDeliveryStatusEnum`.
- **Rationale:** The `Enum` suffix is unique to this one type and signals that the underlying noun is overloaded. Splitting the noun ("attempt" for the wrapper, "attempt status" for the values) removes the suffix and the conflation in one rename.

### 2. `LogDeliveryConfigStatus` vs `LogDeliveryStatusEnum` — two enums named "status" of "log delivery" for orthogonal facets — `src/v1/model.ts:12,39`
- **Why weird:** Both enums describe "status" of "log delivery", but their domains are unrelated:
  - `LogDeliveryConfigStatus`: `ENABLED` / `DISABLED` — whether the configuration is active.
  - `LogDeliveryStatusEnum`: `CREATED` / `SUCCEEDED` / `USER_FAILURE` / `SYSTEM_FAILURE` / `NOT_FOUND` — whether the most recent delivery attempt worked.

  Inside `LogDeliveryConfiguration` both surface as `status` fields one level apart: `LogDeliveryConfiguration.status: LogDeliveryConfigStatus` (line 199) and `LogDeliveryConfiguration.logDeliveryStatus.status: LogDeliveryStatusEnum` (line 217). A reviewer cannot tell at a glance which `status` is meant.
- **Category:** 12 (duplicate concept), 6 (misleading — same noun for incompatible domains).
- **Suggested name:** Rename to expose the distinction: `LogDeliveryConfigStatus` → `LogDeliveryEnablement` (`ENABLED` / `DISABLED`) and `LogDeliveryStatusEnum` → `LogDeliveryAttemptStatus` (`CREATED` / `SUCCEEDED` / ...).
- **Rationale:** Identical nouns for incompatible domains are a classic bug source. Differentiated nouns ("enablement" vs "attempt status") make the two enums distinguishable at the call site.

### 3. `GetLogDeliveryConfigurationRequest.configId` / `accountId` are required path params typed optional — `src/v1/model.ts:124-129,230-237`
- **Why weird:** `GetLogDeliveryConfigurationRequest` has two fields, both typed `string | undefined`, both required path params in the URL (`/api/2.0/accounts/${accountId}/log-delivery/${configId}` — `client.ts:126,218`). The client substitutes them via `?? ''` (`client.ts:126,218`), so a caller who forgets `configId` silently produces a request to `/log-delivery/`. Same pattern on `UpdateLogDeliveryConfigurationRequest` at `model.ts:230-237`. The JSDoc on `configId` (`model.ts:125`) reads "The log delivery configuration id of customer" — the "of customer" phrase is meaningless boilerplate (a config belongs to an account, not a customer).
- **Category:** 6 (misleading — type signature says optional, runtime requires non-empty), 7 (overly verbose / boilerplate JSDoc).
- **Suggested name:** Drop `| undefined` on `configId` — it is a required path parameter. `accountId` may remain optional iff the client falls back to `ClientOptions.accountId` (which it does for `get`/`list`/`update`, but *not* for `create`). Rewrite the JSDoc to "The unique UUID of the log delivery configuration to fetch."
- **Rationale:** Required path params should have required types. The current shape silently produces malformed URLs at runtime. The "of customer" prose is generator-emitted boilerplate worth removing globally.

### 4. `updateLogDeliveryConfiguration` does not "update" — it only flips ENABLED ↔ DISABLED — `src/v1/client.ts:214,230-237`
- **Why weird:** The method name says "update arbitrary fields of the configuration". The request body (`UpdateLogDeliveryConfigurationRequest` at `model.ts:230-237`) carries exactly three fields: `configId`, `accountId`, `status` — you cannot rewrite `credentialsId`, `storageConfigurationId`, `workspaceIdsFilter`, or anything else. The JSDoc on the method (`client.ts:209-213`) calls it out: "Enables or disables a log delivery configuration." The Go SDK names this method `PatchStatus`, which is honest about its surface; the TS port renames it to `updateLogDeliveryConfiguration`, which is not.
- **Category:** 6 (misleading), 17 (verb inconsistency — Go uses `PatchStatus`, TS paraphrases as `update`).
- **Suggested name:** `patchStatus` (matches Go and the HTTP verb at `client.ts:227`), or `setStatus`, or `updateStatus`. Rename the request type to `UpdateLogDeliveryConfigurationStatusRequest` correspondingly.
- **Rationale:** "Update" implies multi-field mutation. A caller writing `updateLogDeliveryConfiguration({configId, status, deliveryPathPrefix: '/new'})` will be surprised — `deliveryPathPrefix` is not on the DTO so TS will type-error, but only after the user reads the type. The verb is a footgun and the existing JSDoc admits it. Naming should match capability.

## Medium severity

### 5. `Client` class is unprefixed — `src/v1/client.ts:46`, exported at `src/v1/index.ts:3`
- **Why weird:** A user importing the package writes `import {Client} from '@databricks/sdk-logdelivery/v1'` and must alias (`import {Client as LogDeliveryClient}`) to compose with any other Databricks SDK client. Consistent across the SDK; flagged once per package.
- **Category:** 1 (vague), 12 (duplicate concept — every Databricks SDK package exports its own `Client`).
- **Suggested name:** `LogDeliveryClient` (or expose a namespace and let `logDelivery.Client` be the qualified name).
- **Rationale:** Every audited package has this finding. Worth normalising at generator level.

### 6. `listLogDeliveryConfiguration` — singular method on a collection result — `src/v1/client.ts:150,192`
- **Why weird:** The method name is singular ("Configuration") but it returns a collection — the response body field is `logDeliveryConfigurations` (plural, `model.ts:160`). Adjacent packages use plural method names for list endpoints (e.g., `listBudgetConfigurations` in `packages/budgets/src/v1/client.ts`).
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `listLogDeliveryConfigurations` (plural). The `*Iter` pagination helper should match: `listLogDeliveryConfigurationsIter`.
- **Rationale:** Method-name pluralisation should match the data shape it yields.

### 7. `ListLogDeliveryConfigurationRequest` — singular request type for a list operation — `src/v1/model.ts:141`
- **Why weird:** Same shape mismatch as finding 6, applied to the request DTO. The class-level JSDoc on line 138 also says "List Log Delivery Configuration" (singular). Compare with `budgets.ListBudgetConfigurationsRequest` (plural) at `packages/budgets/src/v1/model.ts`.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `ListLogDeliveryConfigurationsRequest` (and the `_Response` partner correspondingly).
- **Rationale:** Pluralisation is the standard signal for a collection-returning method/type pair.

### 8. `logDeliveryStatus` field, `LogDeliveryStatus` type, `LogDeliveryStatusEnum` enum — triple-conflation of one noun — `src/v1/model.ts:103,205,208,217`
- **Why weird:** Reading `LogDeliveryConfiguration.logDeliveryStatus.status` traverses three types whose names all carry "Status":
  - `LogDeliveryConfiguration` (the resource).
  - `LogDeliveryStatus` (wrapper for the last-attempt fields).
  - `LogDeliveryStatusEnum` (the actual enum values).

  Each layer adds the same noun with different meaning. The field name `logDeliveryStatus` is also redundant inside a `LogDeliveryConfiguration` — the `LogDelivery` prefix is implied by the parent type.
- **Category:** 12 (duplicate concept), 15 (generic field name losing meaning).
- **Suggested name:** Rename field `logDeliveryStatus` → `lastAttempt`. Rename wrapper interface `LogDeliveryStatus` → `LogDeliveryAttempt` (with fields `status`, `lastAttemptTime`, `lastSuccessfulAttemptTime`, `message`). Rename enum `LogDeliveryStatusEnum` → `LogDeliveryAttemptStatus`. The call site becomes `config.lastAttempt.status === 'SUCCEEDED'` — three concrete nouns instead of three "Status" repetitions.
- **Rationale:** "Status" is too generic to triple-stack. Aligns with findings 1 and 2.

### 9. `workspaceIdsFilter: number[]` — int64 wire field stored as JS `number` — `src/v1/model.ts:91,193`
- **Why weird:** The JSDoc explicitly says "each one is an `int64`". JavaScript `number` is a double-precision float — only safe up to 2^53 − 1. Databricks workspace IDs are int64 server-side; transmitting an ID above the safe range silently loses precision in the JSON wire round-trip.
- **Category:** 6 (misleading — TS type cannot represent the wire's int64 safely), 19 (under-specified id type).
- **Suggested name:** `workspaceIds: bigint[]` (matches int64 wire). Alternative: brand the IDs as `WorkspaceId` via `type WorkspaceId = bigint & {__brand: 'WorkspaceId'}`.
- **Rationale:** Cross-package finding — every `*Id: number` typed against an int64 wire has the same hazard. Generator-level fix: emit `bigint` for `int64` fields.

## Low severity

### 10. `LogDeliveryType` values `BILLABLE_USAGE` vs `AUDIT_LOGS` — singular/plural mismatch — `src/v1/model.ts:58-60`
- **Why weird:** `BILLABLE_USAGE` is singular; `AUDIT_LOGS` is plural. Both are types of logs delivered by this configuration. Pair-wise consistency would be either `BILLABLE_USAGE_LOGS` + `AUDIT_LOGS` (both plural with `_LOGS`) or `BILLABLE_USAGE` + `AUDIT` (both singular without).
- **Category:** 9 (singular/plural mismatch), 18 (long enum values).
- **Suggested name:** `BILLABLE_USAGE` + `AUDIT` (drop `_LOGS` — the enum is `LogDeliveryType` so "logs" is implicit).
- **Rationale:** Pair-wise consistency. The implicit-noun pattern (rely on the enclosing type) is shorter.

### 11. `LogDeliveryStatusEnum.NOT_FOUND` collides with HTTP 404 semantics — `src/v1/model.ts:48-49`
- **Why weird:** `NOT_FOUND` reads as "this resource does not exist" — a 404-style state — but the JSDoc on line 37 says it means "the log delivery status as the configuration has been disabled since the release of this feature or there are no workspaces in the account". That is "no data to report", not "resource missing".
- **Category:** 6 (misleading — value name suggests an HTTP error state, semantics are operational).
- **Suggested name:** `NO_DATA`, `NOT_APPLICABLE`, or `DISABLED_AT_RELEASE` — anything that does not read as 404.
- **Rationale:** A monitoring dashboard surfacing `status === 'NOT_FOUND'` would mislead an operator into thinking the configuration was deleted.

### 12. `req` / `resp` / `opts` / `httpReq` abbreviations — `src/v1/client.ts:90,99,103,127,153,170,193,196,215,223`
- **Why weird:** Three-letter abbreviations on parameter and local names across every method. The repo style guide (`.agent/rules/typescript.mdc`) discourages cryptic short abbreviations.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `request`, `response`, `options`, `httpRequest`, `httpResponse`.
- **Rationale:** Spelling them out costs nothing and removes the need to learn package-local shorthand. Same finding cross-package.

## Observations

### 13. `outputFormat` is always derivable from `logType` — `src/v1/model.ts:79-83,181-185`
The JSDoc on `outputFormat` explicitly says: `If log_type is BILLABLE_USAGE, this value must be CSV. … If log_type is AUDIT_LOGS, this value must be JSON.` The field is therefore redundant on the request DTO — the caller cannot pick freely. Carrying it on the response DTO (for clarity) is defensible. Not a name problem; flagged because the API surface is wider than the API contract.
