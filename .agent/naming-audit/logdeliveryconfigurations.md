# Naming Audit: `logdeliveryconfigurations` (v1)

**Package:** `@databricks/sdk-logdeliveryconfigurations`
**Path:** `/home/parth.bansal/sdk-js/packages/logdeliveryconfigurations/`
**Version audited:** `v1`
**Files audited:**
- `src/v1/model.ts` (404 lines)
- `src/v1/client.ts` (245 lines)
- `src/v1/utils.ts` (151 lines)
- `src/v1/index.ts` (25 lines)

**Inferred domain:** Account-level CRUD for log delivery configurations
(REST: `POST/GET/PATCH /api/2.0/accounts/{account_id}/log-delivery`).
A log delivery configuration ties a `credentialsId` (AWS IAM role) and a
`storageConfigurationId` (S3 bucket) to a log type (`BILLABLE_USAGE` or
`AUDIT_LOGS`), optionally scoped by workspace IDs. There is no delete
endpoint by design — the API only supports disabling via the update
method.

**Total weird names flagged: 36**

## Summary

| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 12 |
| Low | 10 |
| Observation | 7 |

---

## High severity

### H1. Package name `logdeliveryconfigurations` is overly verbose — `packages/logdeliveryconfigurations/`
- **File:** package directory.
- **Category:** 7 (overly verbose), 9 (singular/plural mismatch — pluralised package while every type inside is singular), 14 (Go/proto-style names).
- **Why weird:** 25 characters of all-lowercase concatenation — the longest single-domain package name in the workspace (compare `usagepolicy`, `usagedashboards`, `accountsettings`, `accountaccesscontrol`). The plural `configurations` is unique among sibling account packages, all of which use singular nouns (`accountsettings`, `usagepolicy`, `usagedashboards`, `billableusagedownload`). Users importing this package write `import {Client} from '@databricks/sdk-logdeliveryconfigurations/v1'` — 47 characters of specifier just to reach `Client`.
- **Suggested name:** `logdelivery` (singular, 11 chars, matches the URL path segment `/log-delivery` and the Go SDK service name `LogDelivery`). The doc comments inside this file already use "log delivery" as the noun phrase (`Client/Create`, `LogDelivery/PatchStatus` in `client.ts:88,213`).
- **Rationale:** Singular service noun is the cross-SDK convention. The TS types are already singular (`LogDeliveryConfiguration`, not `LogDeliveryConfigurations`). The trailing `s` produces a plural/singular mismatch between the package name and the dominant type. Fix at generator level since it affects every package.

### H2. `LogDeliveryStatusEnum` — type-name carries `Enum` suffix — `model.ts:39`
- **File:** `model.ts:39-50`, exported in `index.ts:8`.
- **Category:** 20 (type-suffix tautology), 12 (duplicate concept — two enums with overlapping prefixes).
- **Why weird:** `LogDeliveryStatusEnum` is the *only* type in the audited package (and one of the few across the workspace) whose name ends in `Enum`. Every other enum here is just `LogDeliveryConfigStatus`, `LogDeliveryType`, `LogDeliveryOutputFormat` — no suffix. The `Enum` tail exists because the simpler name `LogDeliveryStatus` was already claimed by the wrapper *interface* at `model.ts:208`. The wire-side schemas use `z.enum(LogDeliveryStatusEnum)` and `z.lazy(() => unmarshalLogDeliveryStatusSchema)` — the cognitive load of remembering which is enum, which is interface, and which is `Schema` is high.
- **Suggested name:** Rename the wrapper interface to `LogDeliveryAttempt` (it actually holds attempt fields: `lastAttemptTime`, `lastSuccessfulAttemptTime`, `message`, `status`), freeing `LogDeliveryStatus` for the enum. Alternatively, rename the enum to `LogDeliveryAttemptStatus` (drops `Enum`, matches the fields it describes).
- **Rationale:** A field typed `attempt.status: LogDeliveryAttemptStatus` reads better than `logDeliveryStatus.status: LogDeliveryStatusEnum`. The `Enum` suffix is type-suffix tautology and is unique to this one type — a clear smell that the underlying noun is overloaded.

### H3. `LogDeliveryConfigStatus` vs `LogDeliveryStatusEnum` — two near-identical enum names for unrelated concepts — `model.ts:12,39`
- **File:** `model.ts:12-17`, `model.ts:39-50`.
- **Category:** 12 (duplicate concept), 6 (misleading — both contain "status" + "log delivery").
- **Why weird:** Both enums describe "status" of "log delivery", but cover orthogonal facets:
  - `LogDeliveryConfigStatus`: `ENABLED` / `DISABLED` — whether the configuration is active.
  - `LogDeliveryStatusEnum`: `CREATED` / `SUCCEEDED` / `USER_FAILURE` / `SYSTEM_FAILURE` / `NOT_FOUND` — whether the most recent delivery attempt worked.
  A reader sees `status?: LogDeliveryConfigStatus` on `LogDeliveryConfiguration.status` (line 199) and `status?: LogDeliveryStatusEnum` on `LogDeliveryStatus.status` (line 217). The two `status` fields live one level apart in the same response payload, with totally different domains. The class-doc on `LogDeliveryConfigStatus` (line 8-10) even mis-describes them: "ENABLED: All dependencies have executed and succeeded. DISABLED: At least one dependency has succeeded." That is nonsense — it appears to be JSDoc copy-pasted from another type.
- **Suggested name:** `LogDeliveryConfigStatus` → `LogDeliveryEnablement` (`ENABLED` / `DISABLED`). `LogDeliveryStatusEnum` → `LogDeliveryAttemptStatus` (`CREATED` / `SUCCEEDED` / ...). The differentiated nouns ("enablement" vs "attempt status") make the two enums distinguishable at the call site.
- **Rationale:** Identical noun ("Status") for incompatible domains is a classic source of bugs: a reviewer cannot tell at a glance whether `status === 'CREATED'` is checking the config or the last-delivery state. Renaming forces the distinction.

### H4. `LogDeliveryConfigStatus` JSDoc is wrong — `model.ts:8-10`
- **File:** `model.ts:5-11`.
- **Category:** 6 (misleading — JSDoc claim contradicts type domain).
- **Why weird:** Class-level JSDoc says:
  ```
  Log Delivery Status
  `ENABLED`: All dependencies have executed and succeeded
  `DISABLED`: At least one dependency has succeeded
  ```
  But the enum values are `ENABLED` / `DISABLED` of a *configuration*, with the actual member docs reading "Configuration is enabled" / "Configuration is disabled". The class doc appears imported from a Workflows-domain enum (DLT pipelines have "dependencies"). The leading bare `*` on line 6 is also stray (likely an artefact of the generator emitting `/** * */` blocks).
- **Suggested name:** Rewrite JSDoc to "Whether this log delivery configuration is currently active. Set via the patch-status endpoint."
- **Rationale:** Misleading JSDoc is worse than no JSDoc — IDE tooltips, hover-help, and generated API reference will all display the wrong meaning. Same finding for `LogDeliveryOutputFormat` (line 22) and `LogDeliveryType` (line 54) — all three carry the stray `* ` on the second line. Across the SDK this is a generator artefact worth fixing globally.

### H5. `LogDeliveryConfiguration.configId` and `.configName` use the cryptic abbreviation `config` — `model.ts:171,173`
- **File:** `model.ts:171,173` (also `model.ts:83,85`, `model.ts:126`, `model.ts:232`, `client.ts:94,126,154,218`).
- **Category:** 5 (cryptic abbreviation), 19 (underspecified ID — `configId` of what?).
- **Why weird:** The field is named `configId`, not `logDeliveryConfigurationId`. Because the surrounding type is `LogDeliveryConfiguration`, the wire field is `config_id`, and the doc says "The unique UUID of log delivery configuration", the truncation is acceptable in context — but on its own, `configId` is generic. A consumer pattern-matching on `configId` across multiple Databricks SDK packages cannot tell which "config" is meant. The wire path `/log-delivery/${req.configId}` in `client.ts:126,218` makes the same identifier look domain-detached.
- **Suggested name:** Either:
  1. Keep `configId` (short, matches wire) and rely on the surrounding type for context — but then JSDoc should say "The UUID of this log delivery configuration" (drop "the").
  2. Rename to `id` and let `LogDeliveryConfiguration.id` carry meaning by type context — matches `databricks-sdk-go` resource-id idiom.
- **Rationale:** Pattern (2) is what Stripe / GitHub / Google APIs do (`Customer.id`, `Repository.id`). Pattern (1) is what the Databricks Go SDK does. Pick one and apply globally. As written, `configId` is the worst of both — a half-abbreviation that's neither a generic `id` nor a fully qualified `logDeliveryConfigurationId`.

### H6. `GetLogDeliveryConfiguration` and `UpdateLogDeliveryConfiguration` repeat path/body fields with redundant naming — `model.ts:124-129,230-237`
- **File:** `model.ts:124-129` (`GetLogDeliveryConfiguration`), `model.ts:230-237` (`UpdateLogDeliveryConfiguration`).
- **Category:** 7 (overly verbose), 5 (cryptic — `configId` again), 6 (misleading — both fields are required path params but typed optional).
- **Why weird:** `GetLogDeliveryConfiguration` has exactly two fields, both optional: `configId` and `accountId`. The doc says "The log delivery configuration id of customer" — "of customer" reads like a Hindi/Indian-English idiom and is meaningless in this context (a config has no "of customer" — it belongs to an account). Both fields are part of the URL path (`/api/2.0/accounts/${accountId}/log-delivery/${configId}` — see `client.ts:126,218`); marking them `?: undefined` then falling back to `??' '` in the URL template produces silent bad requests (the client will hit `/api/2.0/accounts//log-delivery/` if `accountId` is absent).
- **Suggested name:** Rename "of customer" away (`The unique UUID of the log delivery configuration to fetch`). Drop `| undefined` on `configId` — it is required. `accountId` is fine as optional only if the client falls back to `ClientOptions.accountId` (which it does at `client.ts:126`); document that explicitly.
- **Rationale:** The current design type-checks fine but blows up at runtime with an unintuitive URL. Required path params should be required types. The "of customer" prose is generator-emitted boilerplate worth removing.

### H7. `unmarshal*_ResponseSchema` and `marshal*Schema` — underscore in TS identifiers — `model.ts:243,255,267,332`
- **File:** `model.ts:243,255,267,332` (also interface names `CreateLogDeliveryConfiguration_Response` at `model.ts:72`, `GetLogDeliveryConfiguration_Response` at `model.ts:132`, `ListLogDeliveryConfiguration_Response` at `model.ts:158`, `UpdateLogDeliveryConfiguration_Response` at `model.ts:240`).
- **Category:** 4 (underscores in TS identifiers), 14 (Go/proto-style names — these are protobuf `Nested.Response` messages).
- **Why weird:** TypeScript convention is PascalCase / camelCase — no underscores. The generator emits `CreateLogDeliveryConfiguration_Response` because the wire proto has `message CreateLogDeliveryConfiguration { message Response {...} }`. Every offending type carries an eslint-disable comment (`// eslint-disable-next-line @typescript-eslint/naming-convention`). This is the same generator-level concern flagged in every prior audit, here amplified because every response type is underscored.
- **Suggested name:** Flatten the nested message: `CreateLogDeliveryConfigurationResponse` (no underscore). Same for `Get*Response`, `List*Response`, `Update*Response` and their schemas.
- **Rationale:** Fix at generator level — applies to every package. The eslint-disable suppression is itself a clue that the generator is fighting the TS convention rather than respecting it.

---

## Medium severity

### M10. `Client` class is unprefixed — `client.ts:46`
- **File:** `client.ts:46`, exported at `index.ts:3`.
- **Category:** 1 (vague), 12 (duplicate concept across packages — every Databricks SDK package exports its own `Client`).
- **Why weird:** A user importing this package writes `import {Client} from '@databricks/sdk-logdeliveryconfigurations/v1'` and immediately must alias (`import {Client as LogDeliveryClient}`) to compose multiple Databricks clients. Consistent across the SDK but worth flagging.
- **Suggested name:** `LogDeliveryClient` or `LogDeliveryConfigurationsClient`. Or expose only a namespace (`import * as logDelivery from '@databricks/sdk-logdeliveryconfigurations/v1'` then `logDelivery.Client`).
- **Rationale:** Cross-SDK consistency may justify keeping `Client`, but in practice every user re-aliases. Same finding as `billableusagedownload` audit #8.

### M11. Client method names embed the noun three times — `client.ts:90,122,150,214`
- **File:** `client.ts:90,122,150,192,214`.
- **Category:** 7 (overly verbose), 17 (inconsistent action verbs vs sibling packages).
- **Why weird:** `client.createLogDeliveryConfiguration(...)` is 27 characters. With the package prefix and the request type, a single call line reads:
  ```ts
  await client.createLogDeliveryConfiguration({logDeliveryConfiguration: {...}})
  ```
  That is "logDeliveryConfiguration" repeated three times in one expression. The Go SDK uses short method names (`Create`, `Get`, `List`, `PatchStatus`) because the noun comes from the receiver type. The TS port replicates the full noun. Sibling packages like `billableusagedownload.Client.download()` and `accountsettings.Client.disableLegacyFeatures()` use shorter names.
- **Suggested name:** `client.create()`, `client.get()`, `client.list()`, `client.listIter()`, `client.updateStatus()`. The receiver type (`LogDeliveryClient`) already provides the noun.
- **Rationale:** TS method names should not repeat the type they live on. Once `Client` is renamed `LogDeliveryClient` (M10), the shorter forms are unambiguous. Note that the Go SDK uses `PatchStatus` (the actual HTTP verb is `PATCH`) — the TS `updateLogDeliveryConfiguration` is already a paraphrase, so consistency with Go is partly already lost.

### M12. `updateLogDeliveryConfiguration` does not actually "update" — it only patches status — `client.ts:209-243`
- **File:** `client.ts:209-243`, `UpdateLogDeliveryConfiguration` at `model.ts:230`.
- **Category:** 6 (misleading), 17 (inconsistent verb — Go uses `PatchStatus`, TS uses `update`).
- **Why weird:** The method name `updateLogDeliveryConfiguration` suggests "update arbitrary fields of the config". In reality the request body only contains `configId`, `accountId`, and `status` (see `UpdateLogDeliveryConfiguration` interface at `model.ts:230-237`) — you can only flip ENABLED <-> DISABLED. The JSDoc on the method (`client.ts:209-212`) calls it out: "Enables or disables a log delivery configuration." The Go SDK method is named `PatchStatus`, which is honest.
- **Suggested name:** `patchStatus`, or `setStatus`, or `updateStatus`. The current name oversells the surface.
- **Rationale:** "Update" implies multi-field mutation. If a caller writes `client.updateLogDeliveryConfiguration({configId, status, deliveryPathPrefix: '/new-prefix'})` they will be silently surprised — the `deliveryPathPrefix` is not part of the request DTO so it will not type-check (in TS strict mode), but they would have to read the type to learn that. The verb is a footgun.

### M13. `listLogDeliveryConfigurationIter` — singular noun on a method returning multiple — `client.ts:192`
- **File:** `client.ts:192`.
- **Category:** 9 (singular/plural mismatch), 1 (vague — `Iter` suffix is opaque).
- **Why weird:** `listLogDeliveryConfigurationIter` is singular ("Configuration") but the iterator yields multiple configurations one by one (returns `AsyncGenerator<LogDeliveryConfiguration>`). Sibling packages use `list*sIter` (plural) — e.g., `listBudgetConfigurationsIter` in `budgets/src/v1/client.ts`. Also, `Iter` is an unhelpful abbreviation — TS users expect `AsyncIterable` or `streamAll` or `pageThrough`.
- **Suggested name:** `iterateLogDeliveryConfigurations` (plural noun, verb-prefix); or simply `listAll` (clean, returns generator).
- **Rationale:** Adjacent package `budgets` uses `listBudgetConfigurationsIter` (plural). Within this package, the non-iterator `listLogDeliveryConfiguration` is also singular but returns a `*Response` whose body field is `logDeliveryConfigurations` (plural — `model.ts:160`). The singular method name fights the plural data shape.

### M14. `ListLogDeliveryConfiguration` (request type) is singular — `model.ts:141`
- **File:** `model.ts:141-155`.
- **Category:** 9 (singular/plural mismatch).
- **Why weird:** Same issue as M13 for the request DTO. The interface name says "List one configuration" but the method actually lists many. The class-level JSDoc says "List Log Delivery Configuration" (singular). Compare with `budgets.ListBudgetConfigurations` (plural) at `packages/budgets/src/v1/model.ts`.
- **Suggested name:** `ListLogDeliveryConfigurationsRequest` (plural + `Request` suffix for clarity).
- **Rationale:** Naming should match data shape. Pluralisation is the standard signal that a method returns a collection. Cross-package inconsistency.

### M15. `logDeliveryStatus` field vs `LogDeliveryStatus` type vs `LogDeliveryStatusEnum` enum — three identifiers conflated — `model.ts:117,205,217`
- **File:** `model.ts:117,205` (field `logDeliveryStatus: LogDeliveryStatus`), `model.ts:208` (interface `LogDeliveryStatus`), `model.ts:217` (`status?: LogDeliveryStatusEnum`).
- **Category:** 12 (duplicate concept), 15 (generic field name losing meaning).
- **Why weird:** A reader looking at `LogDeliveryConfiguration.logDeliveryStatus.status` traverses three types:
  - `LogDeliveryConfiguration` (the resource).
  - `LogDeliveryStatus` (the wrapper holding attempt metadata).
  - `LogDeliveryStatusEnum` (the actual ENABLED/CREATED-style enum).
  Each layer adds the noun "Status" with different meaning. The field name `logDeliveryStatus` is redundant inside a `LogDeliveryConfiguration` (the prefix is implied) and clashes with the type-level prefix.
- **Suggested name:** Field: `lastAttempt: LogDeliveryAttempt`. Wrapper type: `LogDeliveryAttempt` (with fields `status`, `lastAttemptTime`, `lastSuccessfulAttemptTime`, `message` — drop `last` prefix once nested). Enum: `LogDeliveryAttemptStatus`. Result reads as `config.lastAttempt.status === 'SUCCEEDED'`.
- **Rationale:** "Status" is too generic to triple-stack. Renaming the wrapper to "Attempt" (its actual semantics) breaks the conflation cleanly.

### M16. `creationTime` / `updateTime` — verb-tense inconsistency, type misleads as ISO timestamp — `model.ts:113-115,201-203`
- **File:** `model.ts:113-115,201-203`.
- **Category:** 13 (verb-tense inconsistency — `creation` is a noun, `update` is a verb), 6 (misleading — `number` type with JSDoc "epoch milliseconds").
- **Why weird:** `creationTime: number` and `updateTime: number`. The first is noun-form ("creation"), the second is verb-form ("update"). Pair-wise they should match: `createdTime`/`updatedTime` (past participle) or `creationTime`/`updateTime` (noun). Also, both are `number` (epoch ms) but neither type signals "this is a unix timestamp in milliseconds"; the JSDoc carries that information. Across the SDK, audited packages have flagged similar issues.
- **Suggested name:** `createdAt: number` / `updatedAt: number` (canonical SaaS convention — Stripe/GitHub/Salesforce/Atlassian all use *At). Brand the type as `EpochMillis` for compile-time safety.
- **Rationale:** "*At" is the industry standard for timestamps. Same finding in many other audited packages (`budgets`, `apps`, etc.) — fix at generator level.

### M17. `deliveryStartTime: string` for YYYY-MM — misleading type — `model.ts:109,197`
- **File:** `model.ts:108-109,196-197`.
- **Category:** 6 (misleading — type contradicts domain), 1 (vague — "delivery start time" sounds like a timestamp).
- **Why weird:** The field is `string`, but the JSDoc says "specified in YYYY-MM format". That is a year-month string, not a time. Compare with `creationTime: number` (which is an epoch-ms timestamp). The same word "Time" is used for two different formats. A `string` for "YYYY-MM" should be branded or use a `Temporal.YearMonth` from `@js-temporal/polyfill` (already a dependency at `package.json:23`).
- **Suggested name:** `deliveryStartMonth` (clarifies granularity), typed `Temporal.PlainYearMonth | string`.
- **Rationale:** "Time" implies high-resolution. The domain is monthly billing buckets, so "Month" is the right granularity. Same convention as `Stripe.Invoice.period_start` (epoch) vs `Stripe.UsageRecord.period.start` (date-only).

### M18. `workspaceIdsFilter` — pluralised collection name mixed with `Filter` suffix — `model.ts:105,193`
- **File:** `model.ts:104-105,192-193`.
- **Category:** 7 (overly verbose), 9 (singular/plural mix), 15 (generic suffix).
- **Why weird:** The field is `workspaceIdsFilter: number[]`. The plural `Ids` says "this is a list of IDs". The `Filter` suffix says "this is a filter". A `number[]` already conveys "list of ints". Calling it `workspaceIdsFilter` adds redundant `Filter` noise; calling it just `workspaceIds` (the actual content) would be clearer. Compare with `ListLogDeliveryConfiguration.credentialsId: string` (singular, no `Filter` suffix at `model.ts:145`) which serves the same conceptual role.
- **Suggested name:** `workspaceIds: number[]` (drop `Filter`). Or `filterByWorkspaceIds` if intent must be made explicit.
- **Rationale:** Type-driven inference: a `number[]` named after the entity is unambiguous. `Filter` is generic ceremony.

### M19. `workspaceIdsFilter: number[]` — IDs typed as `number` is dangerous — `model.ts:105,193`
- **File:** `model.ts:104-105,192-193`.
- **Category:** 6 (misleading), 19 (underspecified ID).
- **Why weird:** The JSDoc explicitly says "each one is an `int64`". JavaScript `number` is a double precision float — only safe up to 2^53 - 1. Databricks workspace IDs are int64 server-side; sending an ID greater than 2^53 will silently lose precision in the JSON wire. The TS type should be `bigint[]` or `(number | bigint)[]` or branded.
- **Suggested name:** `workspaceIds: bigint[]` (matches the int64 wire). Or `workspaceIds: WorkspaceId[]` with a branded `type WorkspaceId = number & {__brand: 'WorkspaceId'}`.
- **Rationale:** Cross-package issue. Same finding will recur on every `*Id: number` field that maps to an int64 wire. Fix at generator level: emit `bigint` for `int64`.

### M20. `host` field on `Client` lacks domain context — `client.ts:47`
- **File:** `client.ts:47,62`.
- **Category:** 1 (vague), 15 (generic field name).
- **Why weird:** `private readonly host: string` — without context, `host` could be any URL or hostname. The setter at line 62 trims trailing slash. The semantically correct name is `databricksHost` or `workspaceUrl` or `baseUrl` (the actual content is `https://.../`, not just a hostname like `example.com`).
- **Suggested name:** `baseUrl` (matches the actual content — a URL including scheme).
- **Rationale:** Same pattern across every package's `Client`. Fix at generator. Same finding as `billableusagedownload` audit #?.

### M21. `parseResponse` / `marshalRequest` verb asymmetry — `utils.ts:113,119`
- **File:** `utils.ts:113-117` (`parseResponse`), `utils.ts:119-121` (`marshalRequest`).
- **Category:** 17 (inconsistent action verbs).
- **Why weird:** `parseResponse` (the inverse of `marshalRequest`) uses `parse`; the request side uses `marshal`. The verbs do not pair — they read as different layers. Pair would be `unmarshalResponse`/`marshalRequest` or `parseResponse`/`serializeRequest`.
- **Suggested name:** `unmarshalResponse`/`marshalRequest` (already the verb used on the schema names: `unmarshal*Schema` / `marshal*Schema`).
- **Rationale:** The schemas are already named `unmarshal*Schema`/`marshal*Schema` (lines 243, 280, 335). The utility functions should match.

---

## Low severity

### L22. `LogDeliveryType` enum values `BILLABLE_USAGE` / `AUDIT_LOGS` — singular/plural mismatch — `model.ts:58-60`
- **File:** `model.ts:56-61`.
- **Category:** 9 (singular/plural mismatch), 18 (long enum values).
- **Why weird:** `BILLABLE_USAGE` is singular; `AUDIT_LOGS` is plural. Both are types of logs delivered. They should match — either `BILLABLE_USAGE_LOGS` / `AUDIT_LOGS` (both plural) or `BILLABLE_USAGE` / `AUDIT` (both singular).
- **Suggested name:** `BILLABLE_USAGE` / `AUDIT` (drop the `_LOGS` — the enum is `LogDeliveryType` so "logs" is implied).
- **Rationale:** Pair-wise consistency. The implicit-noun pattern (rely on the type name) is cleaner.

### L23. `LogDeliveryOutputFormat.CSV` / `.JSON` — acronym casing OK but enum is binary, no need — `model.ts:25-27`
- **File:** `model.ts:23-28`.
- **Category:** 3 (acronym casing — fine here since it matches the wire), Observation.
- **Why weird:** Two-value enum where `log_type === 'BILLABLE_USAGE'` forces `output_format === 'CSV'` and `log_type === 'AUDIT_LOGS'` forces `'JSON'` (see JSDoc on `outputFormat` at `model.ts:93-96`). The field is therefore *always* derivable from `logType` — making it a redundant field, not a redundant enum, but worth flagging.
- **Suggested name:** Drop `outputFormat` from the request DTO (it can be derived server-side). Keep on the response DTO for clarity.
- **Rationale:** Not strictly a naming issue, but reduces API surface area.

### L24. `LogDeliveryConfigStatus.ENABLED` / `.DISABLED` enum-member doc strings are tautological — `model.ts:13-16`
- **File:** `model.ts:13-16`.
- **Category:** 1 (vague).
- **Why weird:** `/** Configuration is enabled */ ENABLED = 'ENABLED'` — the doc says exactly what the name says. JSDoc should add information, not echo identifiers.
- **Suggested name:** Either delete the JSDoc, or describe behavior: "Logs are actively delivered to the configured S3 bucket."
- **Rationale:** Cross-cutting generator concern.

### L25. `LogDeliveryStatusEnum.NOT_FOUND` is a confusing terminal state — `model.ts:48-49`
- **File:** `model.ts:48-49`.
- **Category:** 6 (misleading).
- **Why weird:** `NOT_FOUND` reads as "this resource does not exist" — a 404-style state — but the JSDoc says it actually means "configuration has been disabled since the release of this feature or there are no workspaces in the account". That's not "not found"; it's "no logs to deliver because account state".
- **Suggested name:** `NO_DATA` or `NOT_APPLICABLE` or `DISABLED_AT_RELEASE` — anything that doesn't sound like a 404.
- **Rationale:** API value names should not collide with HTTP semantics that mean something different. A monitoring dashboard surfacing `status === 'NOT_FOUND'` will mislead an operator into thinking the config was deleted.

### L26. `PACKAGE_SEGMENT` constant — `client.ts:41`
- **File:** `client.ts:41-44`.
- **Category:** 1 (vague), 15 (generic).
- **Why weird:** `Segment` is a generic CS term. The comment "Package identity segment for this client to be used in the User-Agent header" (`client.ts:40`) is the disambiguator; without it the constant name does not communicate what it is.
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PKG_USER_AGENT_SEGMENT`.
- **Rationale:** Cross-package consistency — same finding in every audited package. Worth normalising at generator level. Same as `billableusagedownload` audit #10.

### L27. `httpClient: HttpClient` field — type-suffix tautology — `client.ts:51`
- **File:** `client.ts:51,72`.
- **Category:** 20 (type-suffix tautology).
- **Why weird:** Field name and type both end in `Client`. Convention is widespread but flagged per rule 20.
- **Suggested name:** `transport: HttpClient` (matches the imported package `@databricks/sdk-databricks/transport`).
- **Rationale:** `transport` is what HTTP layers are usually named in language-agnostic SDK terminology (gRPC, GraphQL clients, etc.). It avoids the `Client/Client` echo. Tolerable as-is.

### L28. `req` / `resp` / `opts` / `httpReq` abbreviations — `client.ts:91,99,103,127,153,170,193,196,215,223`
- **File:** `client.ts:91,99,103,...` (every method).
- **Category:** 5 (cryptic abbreviation).
- **Why weird:** Three-letter abbreviations for parameter and local names. The codebase guideline (typescript.mdc) discourages cryptic short abbreviations.
- **Suggested name:** `request`, `response`, `options`, `httpRequest`, `httpResponse`.
- **Rationale:** Spelling out costs nothing and improves readability. Same finding across every audit.

### L29. `pageReq` local in `listLogDeliveryConfigurationIter` — `client.ts:196`
- **File:** `client.ts:196`.
- **Category:** 5 (cryptic), 1 (vague — `pageReq` is shorthand for "request for next page").
- **Why weird:** Variable holds the *modified* request for each page (with `pageToken` updated). `pageReq` reads as "page request" — a noun describing the page itself.
- **Suggested name:** `currentRequest` or `paginatedRequest`. Or unify with `request` if you adopt option-bag style.
- **Rationale:** Low; loop-local variable.

### L30. `executeCall` / `executeHttpCall` near-duplicate names — `utils.ts:26,65`
- **File:** `utils.ts:26-38,65-94`.
- **Category:** 1 (vague), 17 (inconsistent layer naming).
- **Why weird:** Two functions named almost identically doing very different things. `executeCall` wraps the call in retry/rate-limit; `executeHttpCall` does the raw HTTP send + decode + APIError. Within the same file the naming distinction is too subtle.
- **Suggested name:** `runWithCallOptions` / `sendHttp` (or `dispatchHttp`). Or just `wrapRetry` / `sendHttp`.
- **Rationale:** Same finding as `billableusagedownload` audit #13. Cross-package generator concern.

### L31. `HttpCallOptions` — `utils.ts:15`
- **File:** `utils.ts:15-19`.
- **Category:** 1 (vague suffix `Options`), 12 (duplicate `Options` naming).
- **Why weird:** The word `Options` is reused throughout the SDK for unrelated concepts (`ClientOptions`, `CallOptions`, `Options` from `@databricks/sdk-core/api` imported at line 3). The local interface shadows the imported one cognitively. The field is not user-facing — it is an internal bag.
- **Suggested name:** `HttpCallContext` (it is not user-tunable options; it is an internal context bag).
- **Rationale:** Distinguish internal context bags from user-tunable option structs. Same finding as `billableusagedownload` audit #14.

---

## Observations

### O32. `flattenQueryParams` is exported but unused — `utils.ts:123`
`client.ts` does its own query-param construction inline (lines 155-167) using `new URLSearchParams()` and four `params.append(...)` calls. The exported `flattenQueryParams` helper in `utils.ts` is never called by this package. This is a generator artefact — every generated package ships this helper.

### O33. `parseResponse` is unused — `utils.ts:113`
Actually, `parseResponse` *is* used (4 call sites in `client.ts:109,137,180,233`). Not dead. Correction to prior packages' findings: in `logdeliveryconfigurations`, parseResponse is actively in use.

### O34. `marshalRequest` is used twice — `client.ts:95,219`
Used for `createLogDeliveryConfiguration` and `updateLogDeliveryConfiguration`. Not dead.

### O35. `accountId` URL fallback — `client.ts:94,126,154,218`
`createLogDeliveryConfiguration` (line 94) reads `req.logDeliveryConfiguration?.accountId ?? ''` (no client fallback!), while the other three methods do `req.accountId ?? this.accountId ?? ''`. The create path silently differs — if `ClientOptions.accountId` is set but the caller forgets to put it inside `logDeliveryConfiguration`, the URL becomes `/api/2.0/accounts//log-delivery`. This is a correctness bug surfaced by a naming/structure inconsistency: the request DTO nests the account ID one level deeper than the others.
- **Category:** 6 (misleading), 16 (field placement contradicts wire-level convention).
- **Suggested fix:** Make `req.accountId ?? this.accountId ?? ''` consistent across all four methods (the create path should reach the top-level `accountId` and the client-options fallback, not just the nested wrapper field).

### O36. `marshalCreateLogDeliveryConfigurationSchema` typed as bare `z.ZodType` (not parameterised) — `model.ts:335,345,379,393`
None of the four marshal schemas carry a type parameter: `z.ZodType` instead of `z.ZodType<MyType>`. The unmarshal schemas *are* parameterised (`z.ZodType<LogDeliveryConfiguration>` at line 280, etc.). The asymmetry is invisible to callers but means `marshal*Schema.parse(input)` returns `unknown` rather than a known type. Generator concern.
- **Category:** 6 (misleading — type appears typed but is in fact `any`-equivalent).

### O37. JSDoc artefacts (`* *`, `<Databricks>` template) — `model.ts:6,20,32,53,64,77,120,137,165,225`
Every multi-line JSDoc block in `model.ts` starts with a stray ` * *` on the first line (e.g., line 6:
```
 * *
 * Log Delivery Status
```
). Looks like the generator emits an empty paragraph break that renders as `*`. Also, `<Databricks>` appears in raw form throughout (e.g., `model.ts:98,127,142,186`); it should be a literal "Databricks" or substituted at generation time. Neither is a name issue per se but both pollute the docs.

### O38. `host: string` vs `accountId: string | undefined` — initialisation imbalance — `client.ts:47-50,58-72`
The constructor throws if `options.host` is undefined (`client.ts:59-61`) but happily accepts `accountId: undefined` (line 63). Then `accountId` is later substituted into URL paths via `??` fallbacks. This is fine for `get`/`list`/`update` (which fall back to the client-level value) but problematic for `create` (which doesn't fall back — see O35). The naming of `accountId` as "optional" in the type lies about the runtime requirement.

---

## Domain glossary

- **`account`** — Databricks account; the top-level billing/identity boundary. Surfaces as `accountId: string` (uuid-shaped) in every interface and as `ClientOptions.accountId` (`client.ts:50,63`).
- **`workspace`** — A Databricks workspace under an account; `int64` ID on the wire (lossy as `number` in TS — see M19).
- **`credentials`** — Refers to `Credentials.Create` (cross-package) — a stored AWS IAM role with policy/trust relationship. The `credentialsId` field (`model.ts:101,189`) links a log delivery config to a previously-created credentials resource.
- **`storage configuration`** — Refers to `Storage.Create` (cross-package) — a stored S3 bucket descriptor. The `storageConfigurationId` field (`model.ts:103,191`) links a log delivery config to a bucket.
- **`log delivery configuration`** — The resource modelled by this package: a tuple of `(credentialsId, storageConfigurationId, logType, outputFormat, workspaceIdsFilter, status)` that tells Databricks to write certain logs to a bucket.
- **`log type`** — One of `BILLABLE_USAGE` / `AUDIT_LOGS` — what kind of logs to deliver.
- **`output format`** — `CSV` (for billable usage) or `JSON` (for audit logs). Always derivable from `log type`.
- **`delivery path prefix`** — S3 key prefix; defaults to bucket root. Restricted: no leading or trailing slash.
- **`delivery start time`** — `YYYY-MM` string; only applies to billable usage; lower bound is `2019-03`.
- **`config status`** — `ENABLED` / `DISABLED`. The config is never deleted — only disabled (see `client.ts:88,211`).
- **`attempt status`** — `CREATED` / `SUCCEEDED` / `USER_FAILURE` / `SYSTEM_FAILURE` / `NOT_FOUND`. Reflects the state of the most recent delivery attempt; surfaced as `LogDeliveryStatus.status` (i.e., `LogDeliveryConfiguration.logDeliveryStatus.status`).
- **`E2`** — Databricks deployment architecture (newer multi-region account model). Mentioned in `UpdateLogDeliveryConfiguration.accountId` JSDoc (`model.ts:233`).
- **`int64`** — Wire-level 64-bit signed integer; appears in `workspaceIdsFilter` JSDoc but typed `number` in TS (M19).
- **`PATCH`** — HTTP verb used by the update endpoint (`client.ts:227`); the Go SDK calls this method `PatchStatus`, the TS port renames it `updateLogDeliveryConfiguration` (M12).

---

## File coverage

- `src/v1/model.ts` (404 lines): read fully.
- `src/v1/client.ts` (245 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (25 lines): read fully.
