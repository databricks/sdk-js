# Naming Audit: modelservingdebug

**Path:** `packages/modelservingdebug/src/v1/`
**Package name:** `@databricks/sdk-modelservingdebug`
**Versions audited:** v1
**Inferred domain:** Diagnostic / troubleshooting endpoints carved out of the Model Serving API. Three HTTP GETs hanging off `/api/2.0/serving-endpoints/{name}`: `GET /metrics` returns a Prometheus/OpenMetrics text blob (streamed body), `GET /served-models/{servedModelName}/logs` returns the most recent server stdout lines, and `GET /served-models/{servedModelName}/build-logs` returns the served-entity environment build logs.
**Total weird names flagged:** 22

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 7 |
| Low | 6 |
| Observation | 1 |

## Inventory

### Package identity
| Item            | Value                                            |
| --------------- | ------------------------------------------------ |
| Package name    | `@databricks/sdk-modelservingdebug`              |
| Directory       | `packages/modelservingdebug/`                    |
| Subpath export  | `./v1`                                           |
| REST base       | `/api/2.0/serving-endpoints/...`                 |
| Sibling pkgs    | `modelservingmanagement`, `modelservingquery`    |

### Interfaces (`model.ts`)
- `ExportMetricsResponse` (line 15)
- `GetExportEndpointMetrics` (line 19)
- `GetServedModelBuildLogs` (line 24)
- `GetServedModelBuildLogs_Response` (line 32)
- `GetServedModelLogs` (line 37)
- `GetServedModelLogs_Response` (line 45)

### Schemas (`model.ts`)
- `unmarshalGetServedModelBuildLogs_ResponseSchema` (line 51)
- `unmarshalGetServedModelLogs_ResponseSchema` (line 61)

### Enums (`model.ts`)
None.

### Client class & methods (`client.ts`)
- `Client` (line 39)
  - `getExportEndpointMetrics(req: GetExportEndpointMetrics, options?): Promise<ExportMetricsResponse>` (line 65)
  - `getServedModelBuildLogs(req: GetServedModelBuildLogs, options?): Promise<GetServedModelBuildLogs_Response>` (line 92)
  - `getServedModelLogs(req: GetServedModelLogs, options?): Promise<GetServedModelLogs_Response>` (line 120)
- `PACKAGE_SEGMENT` const (line 34)
- Private state: `host`, `httpClient`, `logger`, `userAgent`.

### Utility surface (`utils.ts`)
- `HttpCallOptions` interface
- `executeCall`, `readAll` (private), `executeHttpCall`, `buildHttpRequest`,
  `parseResponse`, `marshalRequest`, `flattenQueryParams`, `sendAndCheckError`.

### Re-exports (`index.ts`)
- `Client`
- `ExportMetricsResponse`, `GetExportEndpointMetrics`,
  `GetServedModelBuildLogs`, `GetServedModelBuildLogs_Response`,
  `GetServedModelLogs`, `GetServedModelLogs_Response`.

---

## F0 — Package-level: `debug` is the wrong qualifier for these three operations

This is the single highest-leverage finding and informs every renaming
suggestion below.

### F0.1 — Package name `modelservingdebug` is misleading (HIGH)
- **Where:** `package.json:2` (`@databricks/sdk-modelservingdebug`),
  directory `packages/modelservingdebug/`, and the `.package.json`
  declarator at line 2.
- **Why weird:** The word "debug" in software engineering almost
  universally means *interactive* debugging: breakpoints, attach-to-process,
  reading variables in a paused state (cf. Node's `--inspect`, Chrome
  DevTools, gdb). Nothing in this package does that. All three methods
  are read-only retrieval of *observability* artefacts:
  - `GET /metrics` — Prometheus/OpenMetrics text feed.
  - `GET /logs` — service stdout/stderr lines from the model server.
  - `GET /build-logs` — container/environment build output.
  The CNCF Observability Whitepaper
  (https://github.com/cncf/tag-observability/blob/main/whitepaper.md)
  defines the three pillars as metrics, logs, and traces; this package
  delivers two of them. The natural label is "observability" or
  "telemetry", not "debug".
- **Category:** 6 (misleading), 1 (vague).
- **Suggested name:** `modelservingtelemetry`, `modelservingobservability`,
  or — best — fold these three methods back into `modelservingmanagement`
  as `getEndpointMetrics`, `getServedModelLogs`, `getServedModelBuildLogs`.
  The split into a separate package buys nothing because the same
  `name` (serving endpoint) keys both packages and a real consumer
  always wants both surfaces.
- **Rationale:** Package names are the single hardest naming choice to
  reverse — they appear in every consumer's `package.json`, `import` and
  lockfile. Today an autocomplete on `import {Client} from
  '@databricks/sdk-modelservingdebug'` suggests an interactive debugger
  which is not what this package offers.

### F0.2 — Three-way split `modelserving{debug,management,query}` has no consistent rationale (MEDIUM, cross-package)
- **Where:** `packages/modelservingdebug/`,
  `packages/modelservingmanagement/`,
  `packages/modelservingquery/`.
- **Why weird:** The split mixes axes:
  - `modelservingmanagement` = control plane (create/update/delete
    endpoints, configure AI gateway).
  - `modelservingquery` = data plane invoke (chat/embeddings/completion).
  - `modelservingdebug` = *also* control-plane reads (metrics & logs)
    on the same `/api/2.0/serving-endpoints/{name}/...` URL tree.
  All three live under the same REST prefix. `modelservingdebug.Client`
  even reuses `req.name` to identify the endpoint — exactly the same key
  `modelservingmanagement.Client.getInferenceEndpoint` uses. The boundary
  between "management" and "debug" is API-team housekeeping, not user-facing.
- **Category:** 12 (duplicate concepts across packages).
- **Suggested name:** Merge `modelservingdebug` into `modelservingmanagement`.
  Keep `modelservingquery` separate because it is data-plane (different
  auth, different rate-limit semantics, often a separate host).
- **Rationale:** Users always want the metrics and logs alongside the
  endpoint they manage. Forcing a second `import` and a second `Client`
  constructor just to read `/metrics` is friction for zero benefit.

### F0.3 — Directory and `.package.json` declarator drift from npm name (LOW)
- **Where:** `.package.json:2` says `"package": "modelservingdebug"`
  but `package.json:2` says `"name": "@databricks/sdk-modelservingdebug"`.
- **Why weird:** Two sources of truth for the package identity. The
  internal declarator uses one form, the npm manifest uses another.
  The `PACKAGE_SEGMENT` regex strip in `client.ts:34-37` exists solely
  to bridge the two.
- **Category:** 17 (inconsistent action verbs / forms).
- **Suggested name:** Pick one form. Recommend dropping `.package.json`
  if it is generator-only metadata that the build does not need.
- **Rationale:** Two-name systems eventually drift; the regex strip is
  evidence of that drift already.

---

## High severity

### 1. `Client` class name is unqualified — `client.ts:39`, `index.ts:3`
- **Why weird:** Every package in this SDK exports `Client`. A consumer
  who uses `modelservingdebug` *and* `modelservingmanagement` *and*
  `modelservingquery` ends up writing
  `import {Client as DebugClient} from '@databricks/sdk-modelservingdebug';
   import {Client as MgmtClient} from '@databricks/sdk-modelservingmanagement';
   import {Client as QueryClient} from '@databricks/sdk-modelservingquery';`
  every time. Three-way collision is the *expected* case here, not an
  edge case.
- **Category:** 1 (vague/generic), 12 (duplicate across packages).
- **Suggested name:** `ModelServingDebugClient` (or
  `ModelServingObservabilityClient` if F0.1 is adopted). Or, better,
  collapse to a single `ModelServingClient` per F0.2.
- **Rationale:** Pkg-prefixed client class names are the established
  pattern across the Databricks Java SDK (`ServingEndpointsAPI`),
  Go SDK (`ServingEndpointsAPI`), and Python SDK (`ServingEndpointsAPI`).
  TS is the odd one out for stopping at `Client`.

### 2. `GetExportEndpointMetrics` reads as "get export of endpoint metrics" — `model.ts:19`, `client.ts:65`
- **Why weird:** The grammar is broken. The expected reading is
  *"export endpoint metrics" → returns metrics in export format*, but
  the word order `Get + Export + Endpoint + Metrics` parses as four
  random nouns. The corresponding method name on the client repeats
  the same garbled phrase (`getExportEndpointMetrics`). The doc string
  on `client.ts:64` confirms the intent: "Retrieves the metrics
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
- **Rationale:** Compare with sibling endpoints in
  `modelservingmanagement`: `getInferenceEndpoint`, `getOpenApi`,
  `patchInferenceEndpointTags`. None of them prefix the noun with the
  output format.

### 3. `ExportMetricsResponse` lives in a debug package but the JSDoc says "Proto version of com.databricks.rpc.HttpOverRpcResponse" — `model.ts:5-15`
- **Why weird:** This type name claims to be a "metrics" response,
  but its JSDoc reveals it's a generic
  `com.databricks.rpc.HttpOverRpcResponse` envelope — a wire-level
  HTTP tunnelling primitive whose only field is `contents: ReadableStream`.
  The Java/proto plumbing (UnaryRpcService, JettyRPC,
  `CustomHandlingForHttpOverRpcProtoResponse`) is leaking into the
  user-facing TS surface. Consumers do not need to know that
  Databricks' RPC layer special-cases HTTP-over-RPC.
- **Category:** 14 (Go/Java/proto-style names leaking into TS), 6
  (misleading — the comment describes RPC, not metrics), 1 (vague —
  `ExportMetricsResponse` could mean "response from any export-metrics
  call", which is exactly what `HttpOverRpcResponse` is at the proto
  layer).
- **Suggested name:** `EndpointMetrics` with a single field `body:
  ReadableStream` (or `text: string` after consumption). Strip the
  proto JSDoc entirely; the consumer should be told "Prometheus or
  OpenMetrics text in the body stream" instead. The doc warning
  "Don't add/modify the fields before being aware of the implications"
  is a server-team note that does not belong in a public TS SDK.
- **Rationale:** Public SDK types should describe the user's mental
  model ("here are the metrics"), not the server's wire envelope.

### 4. `GetServedModelBuildLogs_Response` and `GetServedModelLogs_Response` underscore-suffixed pseudo-nested types — `model.ts:32,45`
- **Why weird:** The trailing `_Response` with an underscore is a
  proto convention encoding nested message names
  (`GetServedModelLogs.Response`). TypeScript has no nesting at the
  type level, so the generator produced `GetServedModelLogs_Response`.
  Each occurrence has to carry an
  `eslint-disable-next-line @typescript-eslint/naming-convention --
  Proto-style nested message name.` directive (lines 31, 44, 50, 60).
  The eslint suppression count alone (4 in a 69-line file) is a
  smell.
- **Category:** 4 (underscores in TS identifiers), 14 (proto-style
  names in TS).
- **Suggested name:** `ServedModelBuildLogs`, `ServedModelLogs`
  (request types stay `GetServedModelBuildLogsRequest`,
  `GetServedModelLogsRequest`, see #5). The generator should be
  fixed once, project-wide.
- **Rationale:** `_Response` with an underscore is rule-4 violation
  per the audit checklist; the broader rule is "underscores belong
  to proto messages, not TS identifiers" — Google TypeScript Style
  Guide § Identifiers
  (https://google.github.io/styleguide/tsguide.html#identifiers).

### 5. `name` field on every request — `model.ts:21,26,39`
- **Why weird:** All three request types have `name?: string` and the
  JSDoc has to spell out "The name of the serving endpoint" each time.
  Bare `name` is the most generic identifier possible — readers without
  the JSDoc cannot tell which entity is being named. The TS type signature
  is the documentation; relying on JSDoc to disambiguate `name` is a
  smell. Worse, `GetServedModelBuildLogs` *and* `GetServedModelLogs`
  also carry `servedModelName` — two `*Name` fields in the same struct
  with one being a generic `name`.
- **Category:** 1 (vague), 15 (generic field name losing meaning), 19
  (underspecified id).
- **Suggested name:** `endpointName`. Wire stays `name` (the server
  expects it). The method URL templates (`client.ts:69,96,124`) read
  `/api/2.0/serving-endpoints/${req.name ?? ''}` which already proves
  `name` is the *endpoint name*.
- **Rationale:** Renaming to `endpointName` puts the intent in the
  type signature, eliminates the need for JSDoc-as-disambiguator, and
  makes the pairing with `servedModelName` parallel (`endpointName` +
  `servedModelName`).

### 6. `name ?? ''` empty-string fallback when the field is "required" — `client.ts:69,96,124`
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

### 7. `servedModelName` doc echoes the field name three times — `model.ts:27-28,40-41`
- **Why weird:** JSDoc on `GetServedModelBuildLogs.servedModelName`
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

### 8. `GetServedModelLogs_Response.logs: string` is a single blob — `model.ts:47`
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
- **Rationale:** Same issue applies to `GetServedModelBuildLogs_Response.logs`
  (model.ts:34). When the server can't decide, the SDK should pick a
  side and stick with it.

## Medium severity

### 9. `GetServedModelBuildLogs.name` clashes with `GetServedModelBuildLogs.servedModelName` — `model.ts:26,28`
- **Why weird:** Two name fields on one struct: `name` (endpoint name)
  and `servedModelName` (served model name). The bare `name` looks like
  *the* name of the request entity (which a reader would assume is the
  served model, since the type is `GetServedModelBuildLogs`). Wrong:
  it's the *parent* endpoint. The pairing breaks the principle of
  least surprise.
- **Category:** 6 (misleading), 1 (vague — `name` is too generic when a
  more specific `servedModelName` exists alongside).
- **Suggested name:** `endpointName` + `servedModelName` together.
- **Rationale:** When two `*Name` fields exist on one struct, neither
  should be bare `name`.

### 10. `ExportMetricsResponse.contents` vs convention `body` — `model.ts:16`
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

### 11. `getExportEndpointMetrics` returns `ExportMetricsResponse` (no `Endpoint`) — `client.ts:65-68`
- **Why weird:** The method name says `EndpointMetrics`, the response
  type says `ExportMetricsResponse` (no `Endpoint`). Inconsistent
  qualifier between method and return type. A reader greping for
  `EndpointMetrics` won't find the response type.
- **Category:** 17 (inconsistent — method qualifier dropped from
  response type), 1 (vague — `ExportMetricsResponse` could be metrics
  for anything).
- **Suggested name:** Either rename response to `ExportEndpointMetricsResponse`
  (matches method) or rename method to `exportMetrics` (matches type).
  Best: kill the `Export` framing (see #2) and pair `getEndpointMetrics()`
  → `EndpointMetrics`.
- **Rationale:** Symmetry between method and return type aids
  IDE autocomplete and grep-ability.

### 12. `Get*` prefix on three of three methods — `client.ts:65,92,120`
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

### 13. `getServedModelLogs` vs `getServedModelBuildLogs` — duplicate concept "logs" — `client.ts:92,120`
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

### 14. `GetServedModelLogs.servedModelName` doc says "The name of the served model that logs will be retrieved for" — passive voice — `model.ts:41`
- **Why weird:** Passive voice "that logs will be retrieved for"
  reads like a phrase translated from a proto comment. Active voice
  is shorter: "The served model whose logs to retrieve." Pure JSDoc
  hygiene, but the same passive form appears on the build-logs request
  (line 27) so it's a systemic pattern.
- **Category:** Observation — not a name bug per se, but a generator
  artefact worth flagging.
- **Suggested name:** No rename; rewrite JSDoc in active voice.
- **Rationale:** API surface clarity. Not blocking.

### 15. `PACKAGE_SEGMENT` const is unsized — `client.ts:34-37`
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

## Low severity

### 16. `Call` type aliased to `Promise<void>` in `utils.ts` import — `utils.ts:3`
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

### 17. `Options` type aliased to internal options shape — `utils.ts:3,30`
- **Why weird:** Same as #16 but for `Options`. `Options` is generic
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

### 18. `userAgent` is built once in the constructor and never refreshed — `client.ts:46,60`
- **Why weird:** Not a name bug per se, but the field name `userAgent`
  suggests a dynamic property, while the construction reads
  `this.userAgent = info.toString();` once at construction time. If
  the credentials are mutated post-construction (rare but possible),
  the UA goes stale.
- **Category:** Observation / 6 (mildly misleading).
- **Suggested name:** No rename. Document the construction-time
  freeze in the JSDoc on line 43-46.
- **Rationale:** Worth a comment; not a rename target.

### 19. `host` is normalised by trailing-slash strip — `client.ts:52`
- **Why weird:** `this.host = options.host.replace(/\/$/, '');`
  silently rewrites the input. The field name `host` doesn't tell
  the consumer "we normalise this to no trailing slash". If a debug
  log later prints `client.host`, it won't match what was passed in.
- **Category:** Observation, 6 (mildly misleading).
- **Suggested name:** No rename. Add a JSDoc note.
- **Rationale:** Same pattern as #18; cross-package.

### 20. `info` local var in the constructor — `client.ts:54,56,57,58,60`
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

### 21. `pkgJson` import alias for package.json — `client.ts:19,35,36`
- **Why weird:** `import pkgJson from '../../package.json' with {type:
  'json'};`. The alias name `pkgJson` is cryptic; readers who don't
  know `pkg` is "package" will guess. The line is unique-per-package
  in the generated code.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `packageManifest` or `packageJson` (camelCase).
- **Rationale:** Trivial fix; cross-package.

## Observation

### 22. `getReader()` chunk-accumulator in `readAll` is a hot-path candidate — `utils.ts:46-62`
- **Why weird:** `readAll` is the buffering implementation used by
  every method (including `getServedModelLogs` which can return many
  KB of text). The chunk-collection loop allocates many intermediate
  `Uint8Array`s and then copies them all into one. For a metrics
  blob streamed at 1 MB/s this is wasteful. The name `readAll`
  doesn't hint at the buffering semantics.
- **Category:** Observation.
- **Suggested name:** No rename. Flag for performance review; consider
  exposing `executeStreamingHttpCall` for the metrics endpoint so
  consumers can iterate the stream.
- **Rationale:** Not a naming bug, but the audit covers the function
  by virtue of its inclusion in `utils.ts`. Worth a note.
