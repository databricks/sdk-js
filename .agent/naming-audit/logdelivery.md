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
**Total weird names flagged:** 7

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 2 |
| Low | 1 |
| Observation | 1 |

## High severity

### 1. `LogDeliveryStatusEnum` — type name carries `Enum` suffix — `src/v1/model.ts:39`
- **Why weird:** `LogDeliveryStatusEnum` is the only type in the package whose name ends in `Enum`. The three sibling enums (`LogDeliveryConfigStatus` at line 12, `LogDeliveryOutputFormat` at line 23, `LogDeliveryType` at line 56) carry no such suffix. The `Enum` tail exists because the simpler name `LogDeliveryStatus` is already claimed by the wrapper *interface* at `model.ts:205` (which holds `lastAttemptTime`, `lastSuccessfulAttemptTime`, `message`, and `status`).
- **Category:** 20 (type-suffix tautology), 12 (duplicate concept — `LogDeliveryStatus` interface and `LogDeliveryStatusEnum` enum coexist).
- **Suggested name:** Rename the wrapper interface `LogDeliveryStatus` → `LogDeliveryAttempt` (it models the most-recent attempt, not the status per se), and rename the enum `LogDeliveryStatusEnum` → `LogDeliveryAttemptStatus`. The field site then reads `attempt.status: LogDeliveryAttemptStatus` instead of `logDeliveryStatus.status: LogDeliveryStatusEnum`.
- **Rationale:** The `Enum` suffix is unique to this one type and signals that the underlying noun is overloaded. Splitting the noun ("attempt" for the wrapper, "attempt status" for the values) removes the suffix and the conflation in one rename.

### 2. `GetLogDeliveryConfigurationRequest.configId` / `accountId` are required path params typed optional — `src/v1/model.ts:123-128,227-234`
- **Why weird:** `GetLogDeliveryConfigurationRequest` has two fields, both typed `string | undefined`, both required path params in the URL (`/api/2.0/accounts/${accountId}/log-delivery/${configId}` — `client.ts:123,215`). The client substitutes them via `?? ''` (`client.ts:123,215`), so a caller who forgets `configId` silently produces a request to `/log-delivery/`. Same pattern on `UpdateLogDeliveryConfigurationRequest` at `model.ts:227-234`. The JSDoc on `configId` (`model.ts:125`) reads "The log delivery configuration id of customer" — the "of customer" phrase is meaningless boilerplate (a config belongs to an account, not a customer).
- **Category:** 6 (misleading — type signature says optional, runtime requires non-empty), 7 (overly verbose / boilerplate JSDoc).
- **Suggested name:** Drop `| undefined` on `configId` — it is a required path parameter. `accountId` may remain optional iff the client falls back to `ClientOptions.accountId` (which it does for `get`/`list`/`update`, but *not* for `create`). Rewrite the JSDoc to "The unique UUID of the log delivery configuration to fetch."
- **Rationale:** Required path params should have required types. The current shape silently produces malformed URLs at runtime. The "of customer" prose is generator-emitted boilerplate worth removing globally.

### 3. `updateLogDeliveryConfiguration` does not "update" — it only flips ENABLED ↔ DISABLED — `src/v1/client.ts:211`, `src/v1/model.ts:227-234`
- **Why weird:** The method name says "update arbitrary fields of the configuration". The request body (`UpdateLogDeliveryConfigurationRequest` at `model.ts:227-234`) carries exactly three fields: `configId`, `accountId`, `status` — you cannot rewrite `credentialsId`, `storageConfigurationId`, `workspaceIdsFilter`, or anything else. The JSDoc on the method (`client.ts:206-210`) calls it out: "Enables or disables a log delivery configuration." The Go SDK names this method `PatchStatus`, which is honest about its surface; the TS port renames it to `updateLogDeliveryConfiguration`, which is not.
- **Category:** 6 (misleading), 17 (verb inconsistency — Go uses `PatchStatus`, TS paraphrases as `update`).
- **Suggested name:** `patchStatus` (matches Go and the HTTP verb at `client.ts:224`), or `setStatus`, or `updateStatus`. Rename the request type to `UpdateLogDeliveryConfigurationStatusRequest` correspondingly.
- **Rationale:** "Update" implies multi-field mutation. A caller writing `updateLogDeliveryConfiguration({configId, status, deliveryPathPrefix: '/new'})` will be surprised — `deliveryPathPrefix` is not on the DTO so TS will type-error, but only after the user reads the type. The verb is a footgun and the existing JSDoc admits it. Naming should match capability.

## Medium severity

### 4. `listLogDeliveryConfiguration` — singular method on a collection result — `src/v1/client.ts:147,189`
- **Why weird:** The method name is singular ("Configuration") but it returns a collection — the response body field is `logDeliveryConfigurations` (plural, `model.ts:157`). Adjacent packages use plural method names for list endpoints (e.g., `listBudgetConfigurations` in `packages/budgets/src/v1/client.ts`).
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `listLogDeliveryConfigurations` (plural). The `*Iter` pagination helper should match: `listLogDeliveryConfigurationsIter`.
- **Rationale:** Method-name pluralisation should match the data shape it yields.

### 5. `ListLogDeliveryConfigurationRequest` — singular request type for a list operation — `src/v1/model.ts:139`
- **Why weird:** Same shape mismatch as finding 4, applied to the request DTO. The class-level JSDoc on line 137 also says "List Log Delivery Configuration" (singular). Compare with `budgets.ListBudgetConfigurationsRequest` (plural) at `packages/budgets/src/v1/model.ts`.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `ListLogDeliveryConfigurationsRequest` (and the `_Response` partner correspondingly).
- **Rationale:** Pluralisation is the standard signal for a collection-returning method/type pair.

## Low severity

### 6. `req` / `resp` / `httpReq` / `pageReq` abbreviations — `src/v1/client.ts:88,96,100,120,128,148,167,171,190,193,212,224`
- **Why weird:** Short abbreviations on parameter and local names across every method (`req` for the request parameter, `resp` for the response local, `httpReq` for the built HTTP request, `pageReq` for the pagination request). The repo style guide (`.agent/rules/typescript.mdc`) discourages cryptic short abbreviations.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `request`, `response`, `httpRequest`, `pageRequest`.
- **Rationale:** Spelling them out costs nothing and removes the need to learn package-local shorthand. Same finding cross-package.

## Observations

### 7. `outputFormat` is always derivable from `logType` — `src/v1/model.ts:78-83,177-182`
The JSDoc on `outputFormat` explicitly says: `If log_type is BILLABLE_USAGE, this value must be CSV. … If log_type is AUDIT_LOGS, this value must be JSON.` The field is therefore redundant on the request DTO — the caller cannot pick freely. Carrying it on the response DTO (for clarity) is defensible. Not a name problem; flagged because the API surface is wider than the API contract.
