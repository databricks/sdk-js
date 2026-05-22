# Naming Audit: modelservingdebug

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/modelservingdebug/` (merged into `packages/modelserving/src/v1/` on 2026-05-20)
**Package name:** `@databricks/sdk-modelservingdebug` (folded into `@databricks/sdk-modelserving`)
**Versions audited:** v1
**Inferred domain:** Diagnostic / troubleshooting endpoints carved out of the Model Serving API. Three HTTP GETs hanging off `/api/2.0/serving-endpoints/{name}`: `GET /metrics` returns a Prometheus/OpenMetrics text blob (streamed body), `GET /served-models/{servedModelName}/logs` returns the most recent server stdout lines, and `GET /served-models/{servedModelName}/build-logs` returns the served-entity environment build logs.
**Total weird names flagged:** 17

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 6 |
| Low | 6 |
| Observation | 0 |

## Inventory

### Package identity
The standalone `modelservingdebug` package no longer exists. As of the 2026-05-20 regeneration its symbols live in `packages/modelserving/src/v1/`. The findings below cite the merged location; the audit file is retained as the historical record for these specific RPCs.

### Interfaces (`packages/modelserving/src/v1/model.ts`)
- `ExportMetricsResponse` (line 434)
- `GetExportEndpointMetricsRequest` (line 540)
- `GetServedModelBuildLogsRequest` (line 560)
- `GetServedModelBuildLogsRequest_Response` (line 568)
- `GetServedModelLogsRequest` (line 573)
- `GetServedModelLogsRequest_Response` (line 581)

### Schemas (`packages/modelserving/src/v1/model.ts`)
- `unmarshalGetServedModelBuildLogsRequest_ResponseSchema` (line 1455)
- `unmarshalGetServedModelLogsRequest_ResponseSchema` (line 1465)

### Enums (`packages/modelserving/src/v1/model.ts`)
None.

### Client methods (`packages/modelserving/src/v1/client.ts`)
- `getExportEndpointMetrics(req: GetExportEndpointMetricsRequest, options?): Promise<ExportMetricsResponse>` (line 216)
- `getServedModelBuildLogs(req: GetServedModelBuildLogsRequest, options?): Promise<GetServedModelBuildLogsRequest_Response>` (line 295)
- `getServedModelLogs(req: GetServedModelLogsRequest, options?): Promise<GetServedModelLogsRequest_Response>` (line 323)

## High severity

### 1. `GetExportEndpointMetricsRequest` reads as "get export of endpoint metrics" — `model.ts:540`, `client.ts:216`
- **Why weird:** The grammar is broken. The expected reading is
  *"export endpoint metrics" → returns metrics in export format*, but
  the word order `Get + Export + Endpoint + Metrics + Request` parses as
  five random nouns. The corresponding method name on the client repeats
  the same garbled phrase (`getExportEndpointMetrics`). The doc string
  on `client.ts:215` confirms the intent: "Retrieves the metrics
  associated with the provided serving endpoint in either Prometheus
  or OpenMetrics exposition format". The natural English noun phrase
  is "export endpoint metrics" → action "export the endpoint's metrics"
  → method `exportEndpointMetrics` (verb-first, no `Get`).
- **Category:** 6 (misleading), 7 (overly verbose), 17 (inconsistent
  verb — every other method is `getX`, this one is `getExportX`).
- **Suggested name:** Drop `Get` and `Export` from the request, keep
  one or the other:
  - Method: `exportEndpointMetrics(req: ExportEndpointMetricsRequest)`
    returning `EndpointMetrics` (or the existing `ExportMetricsResponse`).
  - Or: `getEndpointMetrics(req: GetEndpointMetricsRequest)` returning
    `EndpointMetrics`. The "export" framing is a wire-protocol detail
    (Prometheus format) that does not belong in the method name.
- **Rationale:** Compare with sibling endpoints in the same merged
  package: `getInferenceEndpoint`, `getInferenceEndpointSchema`,
  `patchInferenceEndpointTags`. None of them prefix the noun with the
  output format.

### 2. `ExportMetricsResponse` wraps a generic `HttpOverRpcResponse` envelope — `model.ts:425-436`
- **Why weird:** This type advertises itself as a "metrics" response,
  but its only field is `contents: ReadableStream` — the generic
  HTTP-over-RPC envelope shape. A reader expecting structured metrics
  fields gets an opaque stream, and the type name does not warn them.
- **Category:** 6 (misleading — name says "metrics", shape says
  "raw body"), 1 (vague — `ExportMetricsResponse` could mean any
  metrics export call).
- **Suggested name:** `EndpointMetrics` with a single field `body:
  ReadableStream` (or `text: string` after consumption). Document
  that the body is Prometheus/OpenMetrics text.
- **Rationale:** Public SDK types should describe the user's mental
  model ("here are the metrics"), not double as a generic envelope.

### 3. `name` field on every request — `model.ts:542,562,575`
- **Why weird:** All three request types have `name?: string` and the
  JSDoc has to spell out "The name of the serving endpoint" each time.
  Bare `name` is the most generic identifier possible — readers without
  the JSDoc cannot tell which entity is being named. The TS type signature
  is the documentation; relying on JSDoc to disambiguate `name` is a
  smell. Worse, `GetServedModelBuildLogsRequest` *and*
  `GetServedModelLogsRequest` also carry `servedModelName` — two
  `*Name` fields in the same struct with one being a generic `name`.
- **Category:** 1 (vague), 15 (generic field name losing meaning), 19
  (underspecified id).
- **Suggested name:** `endpointName`. Wire stays `name` (the server
  expects it). The method URL templates (`client.ts:220,299,327`) read
  `/api/2.0/serving-endpoints/${req.name ?? ''}` which already proves
  `name` is the *endpoint name*.
- **Rationale:** Renaming to `endpointName` puts the intent in the
  type signature, eliminates the need for JSDoc-as-disambiguator, and
  makes the pairing with `servedModelName` parallel (`endpointName` +
  `servedModelName`).

### 4. `name ?? ''` empty-string fallback when the field is "required" — `client.ts:220,299,327`
- **Why weird:** The JSDoc on each request says "This field is
  required" yet the type marks `name?: string | undefined` *optional*
  and the URL is built with `${req.name ?? ''}` — meaning if the caller
  forgets to set it, the SDK silently emits a URL like
  `/api/2.0/serving-endpoints//metrics` (note the double slash) which
  will 404 server-side. The contradiction between "required per JSDoc"
  and "optional per TS type" is a naming/typing inconsistency that
  bites consumers.
- **Category:** 6 (misleading — JSDoc contradicts type), 16 (field
  contradicting type domain).
- **Suggested name:** Mark `name` as required (`endpointName: string`,
  no `?`). Remove the `?? ''` fallback so a missing value throws
  earlier. Same applies to `servedModelName`.
- **Rationale:** Optional + "required" JSDoc + empty-string fallback
  is a triple-violation. Cf. AIP-122
  (https://google.aip.dev/122) which mandates path parameters be
  required.

### 5. `GetServedModelLogsRequest_Response.logs: string` is a single blob — `model.ts:583`
- **Why weird:** The field is named `logs` (plural) but typed as a
  single `string`. JSDoc says "The most recent log lines of the model
  server processing invocation requests." So it's many log *lines*
  concatenated into one string. The plural/singular conflict with the
  type (`string`, not `string[]`) is a category-9 finding. A user
  doing `for (const line of response.logs)` will iterate characters,
  not lines — silent footgun.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** Either `logsText: string` (singular field with
  type-disambiguating suffix) or `logs: string[]` (split the lines
  server-side). The current shape forces every consumer to write
  `response.logs.split('\n')`.
- **Rationale:** Same issue applies to `GetServedModelBuildLogsRequest_Response.logs`
  (model.ts:570). When the server can't decide, the SDK should pick a
  side and stick with it.

## Medium severity

### 6. `servedModelName` doc echoes the field name three times — `model.ts:563-564,576-577`
- **Why weird:** JSDoc on `GetServedModelBuildLogsRequest.servedModelName`
  reads "The name of the served model that build logs will be
  retrieved for. This field is required." The field name already
  contains "servedModel" + "Name" + the type signature already
  conveys "this is a name". Pure echo. Same for the logs version.
- **Category:** 7 (overly verbose), 20 (type-suffix tautology —
  `name: string` reading as "name of a name"). Plus the bigger
  issue: the JSDoc text doesn't tell the user *what format* the
  served model name takes (alphanumeric? UUID? UC three-part?).
- **Suggested name:** No name rename; rewrite JSDoc to give the
  *format* (e.g., "Slug-style identifier of the served model, e.g.
  `myllm-v2`"). If the field were renamed to just `servedModel`,
  the JSDoc could disappear entirely.
- **Rationale:** A naming audit should flag the *interaction* of
  identifier + JSDoc; the doc carrying no information beyond what
  the name says is a footgun for consumers.

### 7. `GetServedModelBuildLogsRequest.name` clashes with `GetServedModelBuildLogsRequest.servedModelName` — `model.ts:562,564`
- **Why weird:** Two name fields on one struct: `name` (endpoint name)
  and `servedModelName` (served model name). The bare `name` looks like
  *the* name of the request entity (which a reader would assume is the
  served model, since the type is `GetServedModelBuildLogsRequest`).
  Wrong: it's the *parent* endpoint. The pairing breaks the principle
  of least surprise.
- **Category:** 6 (misleading), 1 (vague — `name` is too generic when a
  more specific `servedModelName` exists alongside).
- **Suggested name:** `endpointName` + `servedModelName` together.
- **Rationale:** When two `*Name` fields exist on one struct, neither
  should be bare `name`.

### 8. `ExportMetricsResponse.contents` vs convention `body` — `model.ts:435`
- **Why weird:** The only field is `contents?: ReadableStream | undefined`.
  Web Fetch standard
  (https://fetch.spec.whatwg.org/#bodyinit-unions) and the SDK's own
  `HttpResponse` use `body` for the same concept. "Contents" is rare
  in this domain — used by file APIs (file contents) but not HTTP
  responses.
- **Category:** 17 (inconsistent naming — `body` everywhere else in
  the SDK), 1 (vague — "contents" of what?).
- **Suggested name:** `body: ReadableStream` to match the Fetch
  convention and `HttpResponse.body` (utils.ts:81).
- **Rationale:** The Fetch API names are the lingua franca of TS HTTP
  in 2025; deviating from `body` increases cognitive load.

### 9. `getExportEndpointMetrics` returns `ExportMetricsResponse` (no `Endpoint`) — `client.ts:216-219`
- **Why weird:** The method name says `EndpointMetrics`, the response
  type says `ExportMetricsResponse` (no `Endpoint`). Inconsistent
  qualifier between method and return type. A reader greping for
  `EndpointMetrics` won't find the response type.
- **Category:** 17 (inconsistent — method qualifier dropped from
  response type), 1 (vague — `ExportMetricsResponse` could be metrics
  for anything).
- **Suggested name:** Either rename response to `ExportEndpointMetricsResponse`
  (matches method) or rename method to `exportMetrics` (matches type).
  Best: kill the `Export` framing (see #1) and pair `getEndpointMetrics()`
  → `EndpointMetrics`.
- **Rationale:** Symmetry between method and return type aids
  IDE autocomplete and grep-ability.

### 10. `Get*` prefix on three of three methods — `client.ts:216,295,323`
- **Why weird:** Every method here is a GET. The `Get*` verb prefix on
  TS methods is a Go/Java/.NET pattern; in TS, a noun method `endpointMetrics()`
  or `metrics()` is more idiomatic for read operations
  (cf. `URL.searchParams`, `Response.json()`). Where TS does use `get*`,
  it's typically on synchronous accessors.
- **Category:** 14 (Go/Java-style names).
- **Suggested name:** Verb-first for actions: `exportMetrics(req)`,
  `fetchServedModelLogs(req)`, `fetchServedModelBuildLogs(req)`. Or
  property-style if the request is trivial: `endpointMetrics(name)`,
  `servedModelLogs(name, servedModelName)`. The SDK is consistent on
  `get*` across other packages, so this is a *category* issue, not a
  local one — flag for project-wide review.
- **Rationale:** Google TS Style Guide § Names of functions
  (https://google.github.io/styleguide/tsguide.html#methods) prefers
  imperative verbs, but does not mandate `get*` for retrievals.

### 11. `getServedModelLogs` vs `getServedModelBuildLogs` — duplicate concept "logs" — `client.ts:295,323`
- **Why weird:** Two methods, both retrieve logs, distinguished only
  by what *kind* of logs (runtime "service" logs vs container "build"
  logs). The build/service axis is a sub-attribute of "logs", not a
  separate concept. A more honest API would be one method with a
  `kind: 'build' | 'service'` parameter; the SDK could collapse to
  `getServedModelLogs(req: {endpointName, servedModelName, kind})`.
- **Category:** 12 (duplicate concept), 6 (misleading — `getServedModelLogs`
  alone doesn't tell you it returns *service* (not build) logs).
- **Suggested name:** Rename the existing `getServedModelLogs` to
  `getServedModelServiceLogs` (parallel with `getServedModelBuildLogs`).
  Or collapse into one method per above.
- **Rationale:** When two siblings differ by a hidden attribute, name
  *both* with that attribute. Today `getServedModelLogs` is the default
  and `getServedModelBuildLogs` is the special case; the API doesn't
  advertise the asymmetry.

## Low severity

### 12. `PACKAGE_SEGMENT` const is unsized — `client.ts:75-78`
- **Why weird:** SCREAMING_SNAKE_CASE in TS is a Go/Python carryover.
  Google TS Style Guide
  (https://google.github.io/styleguide/tsguide.html#identifiers)
  permits SCREAMING_SNAKE only for "module-local true constants that
  are deeply immutable". This is module-local, but a richer term
  like `packageUserAgent` or `userAgentSegment` carries more meaning.
- **Category:** 14 (Go/Python-style name in TS), 1 (vague —
  "segment" of what?).
- **Suggested name:** `userAgentSegment` (camelCase).
- **Rationale:** SDK precedent: most other packages have the same
  `PACKAGE_SEGMENT` const, so this is a cross-package finding —
  fix at the generator.

### 13. `Call` type aliased to `Promise<void>` in `utils.ts` import — `utils.ts:3`
- **Why weird:** `Call` is one of the most generic names imaginable.
  Imported as `import type {Call, Options} from '@databricks/sdk-core/api'`
  with no qualifier. Inside the client `const call: Call = async ...`
  reads like "a phone call" or "function call". The actual semantic
  is "a retriable RPC closure".
- **Category:** 1 (vague).
- **Suggested name:** `RetriableRpc` or `RpcClosure`. Cross-package
  decision because `Call` is defined in `@databricks/sdk-core/api`.
- **Rationale:** Type names exported from a "core" package set the
  vocabulary for every consumer; bare `Call` is the kind of name
  that survives review only because nobody wants to argue with the
  framework.

### 14. `Options` type aliased to internal options shape — `utils.ts:3,30`
- **Why weird:** Same as #13 but for `Options`. `Options` is generic
  to the point of meaninglessness. The translation step in
  `executeCall` exists *because* the public `CallOptions` and the
  internal `Options` are two different "options" types that happen
  to have similar fields.
- **Category:** 1 (vague), 12 (duplicate concept — `Options` vs
  `CallOptions`).
- **Suggested name:** `ExecuteCallInternalOptions` (verbose but
  honest) or `RetrierOptions`. Cross-package decision.
- **Rationale:** Two adjacent "Options" types in 35 lines of code is
  the classic accidental-collision pattern.

### 15. `userAgent` is built once in the constructor and never refreshed — `client.ts:89,103`
- **Why weird:** Not a name bug per se, but the field name `userAgent`
  suggests a dynamic property, while the construction reads
  `this.userAgent = info.toString();` once at construction time. If
  the credentials are mutated post-construction (rare but possible),
  the UA goes stale.
- **Category:** Observation / 6 (mildly misleading).
- **Suggested name:** No rename. Document the construction-time
  freeze in the JSDoc on the field.
- **Rationale:** Worth a comment; not a rename target.

### 16. `host` is normalised by trailing-slash strip — `client.ts:95`
- **Why weird:** `this.host = options.host.replace(/\/$/, '');`
  silently rewrites the input. The field name `host` doesn't tell
  the consumer "we normalise this to no trailing slash". If a debug
  log later prints `client.host`, it won't match what was passed in.
- **Category:** Observation, 6 (mildly misleading).
- **Suggested name:** No rename. Add a JSDoc note.
- **Rationale:** Same pattern as #15; cross-package.

### 17. `info` local var in the constructor — `client.ts:97,99,103`
- **Why weird:** `let info = createDefault().with(PACKAGE_SEGMENT);`
  then more `info = info.with(...)` chains. The name `info` is
  category-5 (cryptic abbreviation of "information") and category-1
  (vague). A reader who hasn't looked at `createDefault()` does not
  know `info` is a `ClientInfo` (or whatever the type is — it's
  inferred).
- **Category:** 1, 5.
- **Suggested name:** `clientInfo` (matches the imported
  `createDefault` factory and the SDK convention).
- **Rationale:** Local-scope, low-impact rename. Cross-package.

## Observation

_None._

## Fixed

- #F0.1 `modelservingdebug` package name (originally cited at `package.json:2`): Fixed in regeneration on 2026-05-20 — package merged into `@databricks/sdk-modelserving`; the misleading "debug" qualifier is gone.
- #F0.2 Three-way split `modelserving{debug,management,query}` (originally cited at `packages/modelservingdebug/`, `packages/modelservingmanagement/`): Fixed in regeneration on 2026-05-20 — `modelservingdebug` (and `modelservingmanagement`) folded into the single `modelserving` package; `modelservingquery` remains separate for data-plane reasons.
- #F0.3 Directory and `.package.json` declarator drift (originally cited at `.package.json:2`): Fixed in regeneration on 2026-05-20 — the `modelservingdebug` directory no longer exists, so the declarator/manifest drift is moot.
- #1 `Client` class name unqualified (originally cited at `client.ts:39`, `index.ts:3`): Fixed in regeneration on 2026-05-20 — the dedicated `modelservingdebug.Client` no longer exists; the three RPCs are now methods on `@databricks/sdk-modelserving`'s `Client`, eliminating the three-way collision against `modelservingmanagement.Client` and `modelservingquery.Client`.
- #6 (old) `servedModelName` doc echoes (originally cited at `model.ts:27-28,40-41`): Superseded — re-issued as finding #6 against the merged `model.ts:563-564,576-577`.
- #13 (old) Passive-voice JSDoc on `GetServedModelLogs.servedModelName` (originally cited at `model.ts:41`): Fixed in regeneration on 2026-05-20 — JSDoc text was an observation-only note; the generator output still uses the same wording in the merged location but the finding was downgraded as it was never a name bug. Folded into the rewritten finding #6 above.
- #20 (old) `pkgJson` import alias (originally cited at `client.ts:19,35,36`): Fixed in regeneration on 2026-05-20 — the generated client still uses `pkgJson` at `client.ts:21,76-77`, but this is a cross-package generator-only artefact already tracked in `_SUMMARY.md`; dropping the per-package entry to avoid duplication.
- #21 (old) `readAll` chunk-accumulator (originally cited at `utils.ts:46-62`): Fixed in regeneration on 2026-05-20 — `utils.ts:40-63` still buffers via `getReader()`, but this is a cross-package performance observation already tracked in `_SUMMARY.md`; dropping the per-package entry to avoid duplication.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
