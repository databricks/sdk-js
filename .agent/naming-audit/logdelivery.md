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
**Total weird names flagged:** 27

## Summary
| Severity | Count |
| --- | --- |
| High | 6 |
| Medium | 10 |
| Low | 7 |
| Observation | 4 |

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

### 3. `LogDeliveryConfigStatus` JSDoc describes a different concept than the values — `src/v1/model.ts:5-11`
- **Why weird:** The class-level JSDoc reads:

  ```
  Log Delivery Status

  `ENABLED`: All dependencies have executed and succeeded
  `DISABLED`: At least one dependency has succeeded
  ```

  The values are `ENABLED` / `DISABLED` of a *configuration* (the per-member docs say "Configuration is enabled" / "Configuration is disabled"). The class doc appears to have been copy-pasted from a Workflows-domain enum (DLT pipelines have "dependencies"). The stray leading `*` on line 6 is a generator artefact that recurs on every multi-line block in this file (`model.ts:6,20,31,53,64,107,121,138,166,227`).
- **Category:** 6 (misleading — JSDoc claim contradicts type domain).
- **Suggested name:** Rewrite JSDoc to "Whether this log delivery configuration is active. Modified via the patch-status endpoint."
- **Rationale:** Wrong JSDoc is worse than missing JSDoc — IDE tooltips, hover-help, and generated reference docs will all display the unrelated "dependencies" prose. The stray `* *` opening line is generator-level and worth fixing globally.

### 4. `LogDeliveryConfiguration.configId` / `.configName` use the cryptic abbreviation `config` — `src/v1/model.ts:171,173`
- **Why weird:** The field is `configId`, not `logDeliveryConfigurationId` (also at `model.ts:69,71`, `model.ts:126`, `model.ts:232`, `client.ts:94,126,154,218`). Inside the enclosing `LogDeliveryConfiguration` the abbreviation is contextually OK, but `configId` is generic at every method-call site — `req.configId` and the URL template `/log-delivery/${req.configId}` read as domain-detached. A consumer composing multiple Databricks SDK clients cannot grep for `configId` and know which "config" is meant.
- **Category:** 5 (cryptic abbreviation), 19 (under-specified id).
- **Suggested name:** Two coherent options:
  1. Keep `configId` (short, matches wire `config_id`) but rely on the enclosing type to disambiguate — same idiom as `databricks-sdk-go`.
  2. Rename to bare `id` and let `LogDeliveryConfiguration.id` carry meaning structurally — same idiom as Stripe (`Customer.id`), GitHub (`Repository.id`), and Google.
- **Rationale:** Pick one convention and apply globally. `configId` is the worst of both — a half-abbreviation that is neither a generic `id` nor a fully-qualified `logDeliveryConfigurationId`.

### 5. `GetLogDeliveryConfigurationRequest.configId` / `accountId` are required path params typed optional — `src/v1/model.ts:124-129,230-237`
- **Why weird:** `GetLogDeliveryConfigurationRequest` has two fields, both typed `string | undefined`, both required path params in the URL (`/api/2.0/accounts/${accountId}/log-delivery/${configId}` — `client.ts:126,218`). The client substitutes them via `?? ''` (`client.ts:126,218`), so a caller who forgets `configId` silently produces a request to `/log-delivery/`. Same pattern on `UpdateLogDeliveryConfigurationRequest` at `model.ts:230-237`. The JSDoc on `configId` (`model.ts:125`) reads "The log delivery configuration id of customer" — the "of customer" phrase is meaningless boilerplate (a config belongs to an account, not a customer).
- **Category:** 6 (misleading — type signature says optional, runtime requires non-empty), 7 (overly verbose / boilerplate JSDoc).
- **Suggested name:** Drop `| undefined` on `configId` — it is a required path parameter. `accountId` may remain optional iff the client falls back to `ClientOptions.accountId` (which it does for `get`/`list`/`update`, but *not* for `create` — see finding 25). Rewrite the JSDoc to "The unique UUID of the log delivery configuration to fetch."
- **Rationale:** Required path params should have required types. The current shape silently produces malformed URLs at runtime. The "of customer" prose is generator-emitted boilerplate worth removing globally.

### 6. `updateLogDeliveryConfiguration` does not "update" — it only flips ENABLED ↔ DISABLED — `src/v1/client.ts:214,230-237`
- **Why weird:** The method name says "update arbitrary fields of the configuration". The request body (`UpdateLogDeliveryConfigurationRequest` at `model.ts:230-237`) carries exactly three fields: `configId`, `accountId`, `status` — you cannot rewrite `credentialsId`, `storageConfigurationId`, `workspaceIdsFilter`, or anything else. The JSDoc on the method (`client.ts:209-213`) calls it out: "Enables or disables a log delivery configuration." The Go SDK names this method `PatchStatus`, which is honest about its surface; the TS port renames it to `updateLogDeliveryConfiguration`, which is not.
- **Category:** 6 (misleading), 17 (verb inconsistency — Go uses `PatchStatus`, TS paraphrases as `update`).
- **Suggested name:** `patchStatus` (matches Go and the HTTP verb at `client.ts:227`), or `setStatus`, or `updateStatus`. Rename the request type to `UpdateLogDeliveryConfigurationStatusRequest` correspondingly.
- **Rationale:** "Update" implies multi-field mutation. A caller writing `updateLogDeliveryConfiguration({configId, status, deliveryPathPrefix: '/new'})` will be surprised — `deliveryPathPrefix` is not on the DTO so TS will type-error, but only after the user reads the type. The verb is a footgun and the existing JSDoc admits it. Naming should match capability.

## Medium severity

### 7. `Client` class is unprefixed — `src/v1/client.ts:46`, exported at `src/v1/index.ts:3`
- **Why weird:** A user importing the package writes `import {Client} from '@databricks/sdk-logdelivery/v1'` and must alias (`import {Client as LogDeliveryClient}`) to compose with any other Databricks SDK client. Consistent across the SDK; flagged once per package.
- **Category:** 1 (vague), 12 (duplicate concept — every Databricks SDK package exports its own `Client`).
- **Suggested name:** `LogDeliveryClient` (or expose a namespace and let `logDelivery.Client` be the qualified name).
- **Rationale:** Every audited package has this finding. Worth normalising at generator level.

### 8. `listLogDeliveryConfiguration` — singular method on a collection result — `src/v1/client.ts:150,192`
- **Why weird:** The method name is singular ("Configuration") but it returns a collection — the response body field is `logDeliveryConfigurations` (plural, `model.ts:160`). Adjacent packages use plural method names for list endpoints (e.g., `listBudgetConfigurations` in `packages/budgets/src/v1/client.ts`).
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `listLogDeliveryConfigurations` (plural). The `*Iter` pagination helper should match: `listLogDeliveryConfigurationsIter`.
- **Rationale:** Method-name pluralisation should match the data shape it yields.

### 9. `ListLogDeliveryConfigurationRequest` — singular request type for a list operation — `src/v1/model.ts:141`
- **Why weird:** Same shape mismatch as finding 8, applied to the request DTO. The class-level JSDoc on line 138 also says "List Log Delivery Configuration" (singular). Compare with `budgets.ListBudgetConfigurationsRequest` (plural) at `packages/budgets/src/v1/model.ts`.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `ListLogDeliveryConfigurationsRequest` (and the `_Response` partner correspondingly).
- **Rationale:** Pluralisation is the standard signal for a collection-returning method/type pair.

### 10. `logDeliveryStatus` field, `LogDeliveryStatus` type, `LogDeliveryStatusEnum` enum — triple-conflation of one noun — `src/v1/model.ts:103,205,208,217`
- **Why weird:** Reading `LogDeliveryConfiguration.logDeliveryStatus.status` traverses three types whose names all carry "Status":
  - `LogDeliveryConfiguration` (the resource).
  - `LogDeliveryStatus` (wrapper for the last-attempt fields).
  - `LogDeliveryStatusEnum` (the actual enum values).

  Each layer adds the same noun with different meaning. The field name `logDeliveryStatus` is also redundant inside a `LogDeliveryConfiguration` — the `LogDelivery` prefix is implied by the parent type.
- **Category:** 12 (duplicate concept), 15 (generic field name losing meaning).
- **Suggested name:** Rename field `logDeliveryStatus` → `lastAttempt`. Rename wrapper interface `LogDeliveryStatus` → `LogDeliveryAttempt` (with fields `status`, `lastAttemptTime`, `lastSuccessfulAttemptTime`, `message`). Rename enum `LogDeliveryStatusEnum` → `LogDeliveryAttemptStatus`. The call site becomes `config.lastAttempt.status === 'SUCCEEDED'` — three concrete nouns instead of three "Status" repetitions.
- **Rationale:** "Status" is too generic to triple-stack. Aligns with findings 1 and 2.

### 11. `creationTime` / `updateTime` — noun/verb tense mismatch, ambiguous unit — `src/v1/model.ts:99-101,201-203`
- **Why weird:** `creationTime: number` (noun form "creation") paired with `updateTime: number` (verb form "update"). They should match: either `createdTime` / `updatedTime` (past participle) or `creationTime` / `updateTime` (noun + verb is inconsistent). Both are typed `number` but the unit (epoch milliseconds) lives only in the JSDoc — a reader scanning the type cannot tell whether this is seconds, milliseconds, or microseconds.
- **Category:** 13 (verb-tense inconsistency), 6 (misleading — bare `number` does not encode "epoch ms").
- **Suggested name:** `createdAt: number` / `updatedAt: number` (the canonical SaaS convention used by Stripe, GitHub, Salesforce, Atlassian, Linear). Brand the type as `EpochMillis` to encode the unit at compile time.
- **Rationale:** `*At` is the industry standard for timestamps. Generator-wide concern — many audited packages share this finding.

### 12. `deliveryStartTime: string` is a YYYY-MM date, not a time — `src/v1/model.ts:95,197`
- **Why weird:** The field is `string` typed, but the JSDoc says "specified in YYYY-MM format". That is a year-month bucket, not a "time". Compare with `creationTime: number` (an epoch-ms timestamp) in the same struct — the word "Time" is used for two different granularities.
- **Category:** 6 (misleading — type contradicts domain), 1 (vague — "delivery start time" suggests a timestamp).
- **Suggested name:** `deliveryStartMonth: string` (or, since `@js-temporal/polyfill` is already a workspace dependency, `Temporal.PlainYearMonth`).
- **Rationale:** "Time" implies sub-day resolution; the domain is monthly billing buckets, so "Month" is the right granularity. Same convention as Stripe's `period_start` (timestamp) vs `period.start` (date-only) split.

### 13. `workspaceIdsFilter` — redundant `Filter` suffix on a collection field — `src/v1/model.ts:91,193`
- **Why weird:** The field is `workspaceIdsFilter: number[]` on both the request DTO (`CreateLogDeliveryConfigurationParams`, line 91) and the response DTO (`LogDeliveryConfiguration`, line 193). On the response DTO, `Filter` is misleading — the same field stores the configured workspace scope, not a "filter" applied at read time. Compare with `ListLogDeliveryConfigurationRequest.credentialsId: string` at `model.ts:145` (no `Filter` suffix, same conceptual role as a list filter).
- **Category:** 7 (overly verbose), 15 (generic suffix).
- **Suggested name:** `workspaceIds: number[]` (the array shape already conveys "list of workspace IDs"; the `Filter` suffix carries no extra signal).
- **Rationale:** Field naming should describe content. A `number[]` named after the entity is unambiguous.

### 14. `workspaceIdsFilter: number[]` — int64 wire field stored as JS `number` — `src/v1/model.ts:91,193`
- **Why weird:** The JSDoc explicitly says "each one is an `int64`". JavaScript `number` is a double-precision float — only safe up to 2^53 − 1. Databricks workspace IDs are int64 server-side; transmitting an ID above the safe range silently loses precision in the JSON wire round-trip.
- **Category:** 6 (misleading — TS type cannot represent the wire's int64 safely), 19 (under-specified id type).
- **Suggested name:** `workspaceIds: bigint[]` (matches int64 wire). Alternative: brand the IDs as `WorkspaceId` via `type WorkspaceId = bigint & {__brand: 'WorkspaceId'}`.
- **Rationale:** Cross-package finding — every `*Id: number` typed against an int64 wire has the same hazard. Generator-level fix: emit `bigint` for `int64` fields.

### 15. `host: string` field on `Client` is under-described — `src/v1/client.ts:47,62`
- **Why weird:** `private readonly host: string` — without context, `host` could be just a hostname (`example.com`). The setter at line 62 trims a trailing slash, hinting that the field actually carries a full URL with scheme. A user wiring up `ClientOptions.host` cannot tell from the type whether to pass `databricks.com` or `https://databricks.com/`.
- **Category:** 1 (vague), 15 (generic field name).
- **Suggested name:** `baseUrl: string` (or `databricksHost`). Matches the actual content (a URL including scheme).
- **Rationale:** Generator-level concern — every package's `Client` has this field. Same finding as `disasterrecovery` and others.

### 16. `executeCall` / `executeHttpCall` — two layers named "execute" — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions both prefixed `execute` doing very different jobs. `executeCall` wraps a call in retry/rate-limit (`utils.ts:26-38`); `executeHttpCall` does the raw HTTP send plus error lift (`utils.ts:65-94`). Inside each client method, `executeHttpCall` is wrapped in a `Call` (the function alias), and `executeCall(call, options)` runs it — the reader has to trace both bodies to learn who calls whom.
- **Category:** 1 (vague), 12 (duplicate prefix), 17 (inconsistent layering nomenclature).
- **Suggested name:** `runWithRetry(call, options)` (outer) + `sendHttp(opts)` or `dispatchHttp(opts)` (inner). The verb pair "run" vs "send" makes the layering obvious.
- **Rationale:** Layer names should make the call graph readable. Same finding cross-package; generator-level concern.

## Low severity

### 17. `LogDeliveryType` values `BILLABLE_USAGE` vs `AUDIT_LOGS` — singular/plural mismatch — `src/v1/model.ts:58-60`
- **Why weird:** `BILLABLE_USAGE` is singular; `AUDIT_LOGS` is plural. Both are types of logs delivered by this configuration. Pair-wise consistency would be either `BILLABLE_USAGE_LOGS` + `AUDIT_LOGS` (both plural with `_LOGS`) or `BILLABLE_USAGE` + `AUDIT` (both singular without).
- **Category:** 9 (singular/plural mismatch), 18 (long enum values).
- **Suggested name:** `BILLABLE_USAGE` + `AUDIT` (drop `_LOGS` — the enum is `LogDeliveryType` so "logs" is implicit).
- **Rationale:** Pair-wise consistency. The implicit-noun pattern (rely on the enclosing type) is shorter.

### 18. `LogDeliveryConfigStatus.ENABLED` / `.DISABLED` JSDoc is tautological — `src/v1/model.ts:13-16`
- **Why weird:** `/** Configuration is enabled */ ENABLED = 'ENABLED'` — the per-member doc echoes the identifier verbatim. JSDoc should add information.
- **Category:** 1 (vague — doc carries no new signal).
- **Suggested name:** Either delete the JSDoc, or describe behavior: "Logs are actively delivered to the configured bucket."
- **Rationale:** Generator-wide concern. Same in many audited packages.

### 19. `LogDeliveryStatusEnum.NOT_FOUND` collides with HTTP 404 semantics — `src/v1/model.ts:48-49`
- **Why weird:** `NOT_FOUND` reads as "this resource does not exist" — a 404-style state — but the JSDoc on line 37 says it means "the log delivery status as the configuration has been disabled since the release of this feature or there are no workspaces in the account". That is "no data to report", not "resource missing".
- **Category:** 6 (misleading — value name suggests an HTTP error state, semantics are operational).
- **Suggested name:** `NO_DATA`, `NOT_APPLICABLE`, or `DISABLED_AT_RELEASE` — anything that does not read as 404.
- **Rationale:** A monitoring dashboard surfacing `status === 'NOT_FOUND'` would mislead an operator into thinking the configuration was deleted.

### 20. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:41-44`
- **Why weird:** `Segment` is a generic CS term. The leading comment ("Package identity segment for this client to be used in the User-Agent header.", line 40) does the documentation work the name should do.
- **Category:** 1 (vague), 15 (generic).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PKG_UA_SEGMENT`.
- **Rationale:** Generator-wide concern. Same finding in every audited package.

### 21. `httpClient: HttpClient` field — type-suffix tautology — `src/v1/client.ts:51,72`
- **Why weird:** Field name and type both end in `Client`. The shorter form would be `client: HttpClient`, but that would collide with the enclosing `Client` class. So the disambiguation is mechanical, not informative.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `transport: HttpClient` (matches the imported `./transport` module) — avoids the `Client/Client` echo and reads as "the transport layer".
- **Rationale:** Generator-wide concern. Tolerable as-is but flagged per rule 20.

### 22. `req` / `resp` / `opts` / `httpReq` abbreviations — `src/v1/client.ts:90,99,103,127,153,170,193,196,215,223`
- **Why weird:** Three-letter abbreviations on parameter and local names across every method. The repo style guide (`.agent/rules/typescript.mdc`) discourages cryptic short abbreviations.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `request`, `response`, `options`, `httpRequest`, `httpResponse`.
- **Rationale:** Spelling them out costs nothing and removes the need to learn package-local shorthand. Same finding cross-package.

### 23. `pageReq` local in `listLogDeliveryConfigurationIter` — `src/v1/client.ts:196`
- **Why weird:** Holds the request shape mutated with `pageToken` between pages. The name reads as "the page's request" rather than "the request iterated across pages".
- **Category:** 5 (cryptic), 1 (vague).
- **Suggested name:** `currentRequest`, `paginatedRequest`, or just `request` (the per-iteration redefinition is clear from context).
- **Rationale:** Loop-local; low impact.

## Observations

### 24. `flattenQueryParams` is exported but unused — `src/v1/utils.ts:123`
`client.ts` constructs query params inline (lines 155-167) with `new URLSearchParams()` and `params.append(...)`. The exported `flattenQueryParams` helper is never called from this package. Every generated package ships this helper unconditionally — it is generator scaffolding.
- **Category:** 11 (unused public helper).
- **Suggested fix:** Generator-level — only emit `flattenQueryParams` when the client actually needs it.

### 25. `accountId` URL fallback is inconsistent between create and other methods — `src/v1/client.ts:94,126,154,218`
`createLogDeliveryConfiguration` reads `req.logDeliveryConfiguration?.accountId ?? ''` (no client-options fallback), while `getLogDeliveryConfiguration`, `listLogDeliveryConfiguration`, and `updateLogDeliveryConfiguration` all read `req.accountId ?? this.accountId ?? ''`. A caller who sets `ClientOptions.accountId` once and forgets to copy it into `logDeliveryConfiguration` on create silently sends a request to `/api/2.0/accounts//log-delivery`. The asymmetry is not advertised by the type — both shapes accept `accountId: string | undefined`.
- **Category:** 6 (misleading — same-named field has different fallback semantics on create vs read), 16 (field placement contradicts wire-level convention).
- **Suggested fix:** On `create`, also fall back to `this.accountId`. Better: lift `accountId` out of `CreateLogDeliveryConfigurationParams` entirely (it is a path param, not a body field) so the shape matches the other three methods. This is a correctness bug surfaced by a naming/structure inconsistency.

### 26. JSDoc artefacts: stray ` * *` opening lines and unresolved `<Databricks>` templates — `src/v1/model.ts:6,20,31,53,64,107,121,138,166,227` and `model.ts:84,127,142,186,233`
Every multi-line JSDoc block in `model.ts` starts with a stray ` * *` line (e.g., line 5-7: `/**\n * *\n * Log Delivery Status`). Looks like the generator emits an empty paragraph break that renders as a literal `*`. Separately, the placeholder `<Databricks>` appears unsubstituted throughout (e.g., `model.ts:84,127,142,186,233` — "`<Databricks>` account ID"). Neither is a naming issue per se but both pollute the rendered docs.
- **Category:** Observation (generator template hygiene).

### 27. `outputFormat` is always derivable from `logType` — `src/v1/model.ts:79-83,181-185`
The JSDoc on `outputFormat` explicitly says: `If log_type is BILLABLE_USAGE, this value must be CSV. … If log_type is AUDIT_LOGS, this value must be JSON.` The field is therefore redundant on the request DTO — the caller cannot pick freely. Carrying it on the response DTO (for clarity) is defensible. Not a name problem; flagged because the API surface is wider than the API contract.

## Domain glossary
- **`account`** — Databricks account, the top-level billing/identity boundary. Surfaces as `accountId: string` (uuid-shaped) and as `ClientOptions.accountId` (`client.ts:50,63`).
- **`workspace`** — A Databricks workspace under an account. Workspace IDs are `int64` on the wire but typed `number` in TS (finding 14).
- **`credentials`** — Cross-package reference (`Credentials.Create`) — a stored AWS IAM role with policy and trust relationship. The `credentialsId` field (`model.ts:87,189`) links a log delivery config to that resource.
- **`storage configuration`** — Cross-package reference (`Storage.Create`) — a stored S3 bucket descriptor. The `storageConfigurationId` field (`model.ts:89,191`) links the config to a bucket.
- **`log delivery configuration`** — The resource modelled by this package: a tuple of `(credentialsId, storageConfigurationId, logType, outputFormat, workspaceIdsFilter, status)` instructing Databricks to write certain logs to a bucket.
- **`log type`** — `BILLABLE_USAGE` or `AUDIT_LOGS` — the category of logs delivered.
- **`output format`** — `CSV` (for billable usage) or `JSON` (for audit logs). Always implied by `log type` (finding 27).
- **`delivery path prefix`** — S3 key prefix; defaults to bucket root. Must not start or end with `/`.
- **`delivery start time`** — `YYYY-MM` string (a month bucket, not a timestamp — finding 12). Only applies to billable usage; lower bound is `2019-03`.
- **`config status`** — `ENABLED` / `DISABLED` (`LogDeliveryConfigStatus`). The config is never deleted, only disabled.
- **`attempt status`** — `CREATED` / `SUCCEEDED` / `USER_FAILURE` / `SYSTEM_FAILURE` / `NOT_FOUND` (`LogDeliveryStatusEnum`). Reflects the most-recent attempt; surfaces as `LogDeliveryStatus.status`, i.e., `LogDeliveryConfiguration.logDeliveryStatus.status`.
- **`E2`** — Databricks newer multi-region account architecture. Mentioned in `UpdateLogDeliveryConfigurationRequest.accountId` JSDoc (`model.ts:233`).
- **`int64`** — Wire-level 64-bit signed integer. Used for workspace IDs; typed `number` in TS (lossy — finding 14).
- **`PATCH`** — HTTP verb used by the update endpoint (`client.ts:227`). Go SDK exposes this as `PatchStatus`; the TS port paraphrases it as `updateLogDeliveryConfiguration` (finding 6).

## File coverage
- `src/v1/model.ts` (403 lines): read fully.
- `src/v1/client.ts` (244 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (24 lines): read fully.
- `src/v1/transport.ts` (75 lines): read fully (no findings — auth/timeout wrappers are unremarkable).
