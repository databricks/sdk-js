# Cross-Package Naming Audit — Executive Summary

**Packages audited:** 87 active API packages (every package under `packages/<pkg>/src/<vN>/`). The 24 orphan audit files that previously existed for packages retired in the 2026-05-22 regen were deleted on 2026-05-26 (see Prune note 8); per-package audits are now strictly limited to packages with live source.
**Total active findings across all 87 active audits:** **1,598** (down from 2,891 before the 2026-05-26 cleanup pass — a 45% reduction. Earlier waypoints: 2,926 before the 2026-05-22 Theme 2 prune; 3,572 before the 2026-05-22 regen + rescan; 3,273 before the 2026-05-20 proto-architectural-leak pass; 5,322 in the original sweep.) The 2026-05-26 cleanup pass removed ~1,500 findings via five Workflow B prune passes (AIP `name`, sibling-state-enum, field-rename, doc-change, SDK-internal + non-TS), the deletion of 23 orphan audit files, and the removal of `## Fixed` sections from every audit (a small note in this summary now captures the historical "fixed" delta).
**Source files:** `/home/parth.bansal/sdk-js/.agent/naming-audit/<package>.md`
**Last source state:** Rebase onto main + rescan on 2026-05-26 against generator regen #156 + acronym renames (PR #148). Upstream API version `0555d6a59265799ed8ea12f355eee662e739430d`.

> **Prune note 1.** The original audit included a cross-cutting theme
> "Empty / trivial wrapper interfaces" (empty `*_Response` interfaces,
> single-field-primitive wrapper types, and proto outer-message wrappers
> retained only to anchor a nested enum). Per user direction these have
> been removed from every per-package audit: the wrapper types are kept
> on the public surface deliberately, for forward compatibility — adding
> a field later is a non-breaking change for a wrapper type but a
> breaking change if the response was previously `void` or a bare
> primitive. The 321 pruned findings are reflected in the totals,
> theme list, and Top-50 below.

> **Prune note 2.** A second cross-cutting theme,
> "`marshal` / `unmarshal` / `Schema` suffix vocabulary is Go-isms"
> (`marshalCreatePolicySchema`, `unmarshalGetMetastoreSummary_ResponseSchema`,
> etc.), has now also been pruned per user direction. These Zod
> encoder/decoder helpers are SDK-internal — they are emitted into
> per-package `utils.ts` and `model.ts` but are not part of the public
> contract that callers import against. Renaming them carries zero
> external risk and is therefore not a public-surface naming concern.
> The 457 pruned findings from this pass are reflected in the totals,
> theme list (Theme 8 removed), generator recommendations (§8.7
> removed), and by-the-numbers table below.

> **Prune note 3.** A third cross-cutting theme,
> "Pagination `Iter` suffix on every paginating method"
> (`listPoliciesIter`, `listCatalogsIter`, `listWarehousesIter`, etc.),
> has now been promoted to a generator-only recommendation per user
> direction. The duplicate-method pattern is emitted by every generated
> package; the fix is one template change, not per-package work. Rather
> than carry the same finding in 98 per-package audits, the rule is
> recorded once in the new `## Generator-only recommendations` section
> below. The 42 pruned findings from this pass are reflected in the
> totals, theme list (the former Theme 8 removed), generator
> recommendations (§8.10 removed), and by-the-numbers table below.

> **Prune note 4.** A fourth cross-cutting theme,
> "Underscore-in-identifier (proto `Outer_Inner` / `Foo_Response`)" —
> e.g. `ClusterState_ClusterState`, `PipelineState_PipelineState`,
> `DeletePolicy_Response`, `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol` —
> has now been pruned per user direction. The proto-style underscored
> identifier convention is intentional and correct: it preserves the
> mapping between TS identifiers and protobuf nested-message paths,
> keeps codegen deterministic, and the `// eslint-disable` line that
> each identifier carries is acceptable cost. Renaming would break the
> wire ↔ TS correspondence that downstream tooling relies on. The 584
> pruned findings from this pass are reflected in the totals, theme
> list (the former Theme 1 removed), generator recommendations (§8.2
> removed), and by-the-numbers table below. This was the single
> largest category by package incidence (~85/98).

> **Prune note 5.** A fifth cross-cutting theme,
> "Redundant enum-name prefix on every member" — e.g.
> `PolicyType.POLICY_TYPE_ROW_FILTER`,
> `DestinationType.DESTINATION_TYPE_EMAIL`,
> `CommandStatus.COMMAND_CANCELLED`, `IsolationMode.ISOLATION_MODE_OPEN_IN_ACCOUNT` —
> has been pruned per user direction. The proto-style `Foo.FOO_BAR_BAZ`
> shape is intentional: TS enum member names mirror the protobuf wire
> identifier exactly, which keeps codegen deterministic and preserves
> the wire ↔ TS correspondence. Stripping the prefix on the TS side
> would force a per-enum translation table and break the symmetry that
> generators and downstream tooling rely on. The pruned findings are
> reflected in the totals, theme list (the former Theme 1 removed),
> generator recommendations (§8.1 removed), and by-the-numbers table
> below.

> **Prune note 6.** A sixth cross-cutting theme,
> "`*_UNSPECIFIED` proto sentinel values in every enum" — e.g.
> `STATE_UNSPECIFIED`, `POLICY_TYPE_UNSPECIFIED`,
> `COMPUTE_KIND_UNSPECIFIED`, `RUN_LIFE_CYCLE_STATE_UNSPECIFIED`,
> `DAY_OF_WEEK_UNSPECIFIED` — has been pruned per user direction.
> proto3 mandates that every enum carry a zero value, and the
> `*_UNSPECIFIED` member is semantically distinct from `undefined`:
> it means "explicitly set to absent/default" on the wire, whereas
> field-optional `?:` `undefined` means "not present in this message".
> Dropping the sentinel would conflate those two states and silently
> break round-tripping. The pruned findings are reflected in the
> totals, theme list (the former Theme 2 removed), and by-the-numbers
> table below.

> **Prune pass 7 (2026-05-22) — Theme 2 retired.** Workflow B prune
> of "Type-name prefix repeats the package" per user direction
> ("Many type names re-state the package's domain noun. I don't fix
> it, it is fine as it is."). ~34 findings removed across 20
> packages. Biggest removals: instancepools (5),
> notificationdestinations (4), entitytagassignments (3),
> customllms/externallineage/pipelines/queries/registeredmodels/tagassignments
> (2 each). The remaining 32 candidate audits had no matching
> findings — `Foo*`-prefixed types in those audits were flagged for
> OTHER primary issues (`Info` suffix, proto-architectural leak,
> vague names, cross-package duplicates) and retained. The pruned
> findings are reflected in the totals, theme 2 description below
> (marked retired in place), generator recommendations (§8.6
> removed), Top-50, and by-the-numbers table below.

> **Prune pass 8 (2026-05-26) — corpus cleanup.** Combined rebase +
> rescan + orphan deletion + five Workflow B prune passes. Combined
> removals ~1,500 findings (2,891 → 1,598). Components, in
> chronological order:
>
> 1. **Rebase + rescan against regen #156 + acronym renames
>    (PR #148).** All 87 active audits rescanned. `logdelivery`
>    moved one finding to `Fixed`; remaining audits had minor line
>    drift only.
> 2. **`## Fixed` sections removed from every audit** per user
>    direction ("remove the entries which are fixed... I think it's
>    good to just have a small note in the summary.md which we
>    already have"). Audit files now only carry active findings; the
>    historical "fixed" delta is summarised in this document.
> 3. **23 orphan / retired audit files deleted** per user direction
>    ("Please remove the complete file if there is no issue in
>    it... do it for every packages like this"). The 23 deleted:
>    `accountaccesscontrol`, `accountaccesscontrolproxy`,
>    `accountsettings`, `cleanroomassets`,
>    `cleanroomautoapprovalrules`, `cleanroomtaskruns`, `endpoints`,
>    `indexes`, `logdeliveryconfigurations`, `materializedfeatures`,
>    `modelservingdebug`, `modelservingmanagement`,
>    `oauthcustomappintegration`, `oauthpublishedapp`,
>    `permissions`, `qualitymonitor`, `qualitymonitors`,
>    `queryexecution`, `serviceprincipalsecrets`,
>    `serviceprincipalsecretsproxy`, `workspace`,
>    `workspaceassignment`, `workspaceconf`, `workspacesettings`.
>    (Note: `serviceprincipalsecretsproxy` had already been deleted
>    earlier; the active count of deleted files in this pass is
>    23.) The "Retired audits" table at the bottom of §6 is now
>    historical reference only.
> 4. **AIP `name` pattern prune** — ~20 findings removed across the
>    31-package scope per user direction ("the name pattern is well
>    established in the AIP"). Findings citing the AIP-mandated
>    `name` field on Get/Update/Delete requests are no longer
>    flagged.
> 5. **Sibling-state-enum prune** — ~5 findings removed across the
>    6-package scope per user direction ("not possible to fix
>    without changing the api"). Cross-package state-enum
>    duplicates that would require an API change to fix are no
>    longer flagged.
> 6. **Field-rename prune** — ~773 findings removed across all 87
>    audits per user direction ("if i change the field name it
>    would make the sdk quite different from the api itself").
>    Field-level rename findings (the single largest category by
>    incidence) are no longer in scope. Field-name vocabulary drift
>    and underspecified-ID findings that boil down to a rename are
>    out.
> 7. **Doc-change prune** — ~300 findings removed across all 87
>    audits per user direction ("those can be anytime"). JSDoc
>    text, banner-comment, and prose-deprecation findings are no
>    longer flagged: the doc surface is a follow-up sweep, not part
>    of the structural naming corpus.
> 8. **SDK-internal prune** — ~400 findings removed for
>    identifiers that are never re-exported. Coverage: `utils.ts`
>    helpers (`executeCall`, `executeHttpCall`, `flattenQueryParams`,
>    `readAll`, `HttpCallOptions`, `buildHttpRequest`,
>    `PACKAGE_SEGMENT`, `Call`, `pkgJson`), local variables in
>    `client.ts` (`req`, `resp`, `opts`), and other internal
>    plumbing. Per user direction ("they don't get reexported").
> 9. **Non-TS prune** — ~70 findings removed for `CHANGELOG.md`,
>    `NEXT_CHANGELOG.md`, `package.json`, build / lint workflows,
>    and other non-source files. Per user direction ("make sure for
>    all packages that recommendations are strictly for the ts
>    code").
>
> The combined pass shrunk every category. The dominant remaining
> findings are now structural type-level issues:
> reserved-word collisions, brand drift, post-merge friction in
> the consolidated packages, cross-package duplicate concepts, and
> proto-architectural leaks that survived the regen.

> **Rescan note (2026-05-20).** The generator was re-run and the
> per-package audits were rescanned against the new source state. The
> rescan dropped **710 findings net** and closed out several structural
> pain points in the wire ↔ TS mapping:
>
> - **`Request` suffix wave (Theme 3, former).** The generator now
>   emits every request DTO with a `Request` suffix
>   (`DeletePolicyRequest`, `ListSecretsRequest`, `ExportRequest`,
>   etc.). Verb-phrase request types — the previous Theme 3, cited in
>   ~80/98 packages — are no longer the dominant concern. Residual
>   instances in `bundle`, `files`, `marketplaces`, and a few others
>   are tracked per-package. The former §8.5 generator rule has been retired
>   as **Done** in §7 below.
> - **14 packages deleted, merged, or renamed.** Five removed outright
>   (`accountaccesscontrol`, `accountaccesscontrolproxy`,
>   `serviceprincipalsecrets`, `serviceprincipalsecretsproxy`,
>   `queryexecution`). Nine consolidated:
>   `cleanroomassets` + `cleanroomautoapprovalrules` +
>   `cleanroomtaskruns` → `cleanrooms`; `endpoints` + `indexes` →
>   `vectorsearch`; `oauthcustomappintegration` + `oauthpublishedapp`
>   → `oauth`; `modelservingdebug` + `modelservingmanagement` →
>   `modelserving`; `workspaceassignment` → `accessmanagement`.
>   Three packages renamed in place: `permissions` →
>   `accessmanagement`, `workspace` → `workspaceobjects`,
>   `logdeliveryconfigurations` → `logdelivery`.
> - **Themes that shrank materially.** The "verb-phrase request types"
>   theme has been retired and is now footnote-level. The "Package-name
>   prefix repeats package" (e.g. `OAuthAppIntegration*`,
>   `CleanRoom*`, `Pipelines*`, `Genie*`) theme shrank ~30% because
>   several offending packages were merged or renamed. The
>   "byte-identical `*proxy` packages" pain point is gone (both
>   `*Proxy` packages were deleted).
> - **Carried-over findings.** Findings that were *still present* after
>   the regeneration kept their position in `High`/`Medium`/`Low`. Line
>   numbers were updated in place. Audits whose package was deleted
>   have all findings under `## Fixed` and zero active total.

> **Audit-pass note 7 (proto-architectural-leak scan).** A ~93-agent
> pass scanned every API package for mid-position infix tokens that
> betray internal proto/service-tier ownership: `*Public*Request`,
> `*Proto` suffix, `*Service*` / `*Manager*` / `*Backend*` / `*Handler*`
> mid-position, `*Internal*`, `*Wrapper*`, `*CustomerFacing*` qualifier,
> mid-position `*V2*` (e.g. `RunLifecycleStateV2`), and JSDoc leaks of
> "Public RPC" / "Wrapper message" / "Public facing RPC requests and
> responses" verbatim banners. Findings were appended to each per-package
> audit under a new "Proto-architectural leak" category and added ~300
> findings net (3,273 → 3,572). The pass also created seven
> previously-missing audits for packages absorbed from the account-API
> split during the 2026-05-20 regen: `authentication`, `keyconfigurations`,
> `networking`, `scim`, `sharing`, `storageconfigurations`, `workspaces`.

> **Audit-pass note 8 (2026-05-21 — Google TS acronym renames applied).**
> Adopted the Google TS Style Guide acronym-as-whole-word rule (already
> documented at `.agent/rules/typescript.mdc:184`). Renamed 105 files:
> 11 hand-written (`auth`, `core`, `examples`) + 94 generated `utils.ts`
> import updates. `OAuth*`, `OIDC*`, and JS built-ins kept under the
> platform-name exception.

> **Audit-pass note 9 (2026-05-22 — Generator regen + rescan).** The
> generator was re-run against upstream API version
> `0555d6a59265799ed8ea12f355eee662e739430d`. All 81 active audits
> were rescanned and 6 newly-created audits cover packages that the
> regen consolidated from smaller siblings:
>
> - `accessmanagement` (NEW, 38 findings) — supersedes `permissions`,
>   `accountaccesscontrol`, `accountaccesscontrolproxy`, and
>   `workspaceassignment`. Single umbrella for object permissions,
>   permission levels, rule sets, and workspace assignments.
> - `logdelivery` (NEW, 28 findings) — renamed from
>   `logdeliveryconfigurations`. The legacy long name was a clean
>   rename target.
> - `modelserving` (NEW, 47 findings) — supersedes
>   `modelservingmanagement` and absorbed the former `modelservingdebug`.
>   `modelservingquery` remains separate.
> - `oauth` (NEW, 11 findings) — supersedes
>   `oauthcustomappintegration` and `oauthpublishedapp`. Single
>   package for both Custom and Published app integrations plus
>   the published-app catalog.
> - `vectorsearch` (NEW, 28 findings) — supersedes `endpoints` and
>   `indexes`. Single endpoint+index surface for Vector Search.
> - `workspaceobjects` (NEW, 29 findings) — renamed from
>   `workspace`. The bare name was the most-overloaded in the SDK;
>   the rename clarifies the package scope as the workspace
>   filesystem (notebooks/folders/files).
>
> **24 audit files marked as removed/consolidated.** Their findings
> are excluded from the active total. Source packages no longer
> exist:
> `accountaccesscontrol`, `accountaccesscontrolproxy`,
> `accountsettings`, `cleanroomassets`, `cleanroomautoapprovalrules`,
> `cleanroomtaskruns`, `endpoints`, `indexes`,
> `logdeliveryconfigurations`, `materializedfeatures`,
> `modelservingdebug`, `modelservingmanagement`,
> `oauthcustomappintegration`, `oauthpublishedapp`, `permissions`,
> `qualitymonitor`, `qualitymonitors`, `queryexecution`,
> `serviceprincipalsecrets`, `serviceprincipalsecretsproxy`,
> `workspace`, `workspaceassignment`, `workspaceconf`,
> `workspacesettings`. Each retired audit carries a status banner at
> the top of the file noting the 2026-05-22 consolidation date and
> retains the original findings as historical record.
>
> **~81 findings moved to Fixed in this regen** — overwhelmingly
> proto-architectural-leak `*Public*Request` and `*PublicRequest_Response`
> patterns that the regen renamed across the account-tier packages.
> The largest per-package shifts:
> `metastores` (20 fixed), `networking` (17 fixed), `workspaces` (16
> fixed), `credentials` (~10 fixed), `storageconfigurations` (~10
> fixed), `cleanrooms` (4 fixed), `jobs` (2 fixed), `keyconfigurations`
> (2 fixed). These renames retroactively validate generator rule
> §8.2 ("Strip proto-architectural-tier markers"). The rule is **not**
> marked Done — `*CustomerFacing*` qualifiers in `networking` and a
> handful of `Proto` suffixes (e.g. `TriggerStateProto`,
> `DatabricksServiceExceptionProto`) still survive in active audits.

This document synthesises the per-package audits into the patterns that the
upstream generator (and a smaller number of API team decisions) should fix
to deliver an idiomatic TypeScript SDK. The vast majority of the findings are
template-driven — fix the template once and the symptoms disappear from every
package.

The 87 active packages are a 1:1 port of `databricks/sdk-go`, so most defects
flow from Go/protobuf idioms that do not translate to TypeScript. Idiomatic
TS SDKs (AWS, Azure, Stripe, Octokit) deliberately diverge from their wire
formats; the Databricks JS SDK currently does not.

---

## 1. Top cross-cutting themes

Ranked by approximate package incidence. Each theme is a generator-level
defect — one template change fixes ~87 packages.

### Theme 1. `Info` (and other vague) suffix on the canonical entity — ~30/87 packages (shrunk by the 2026-05-26 field-rename prune)

The Go SDK uses `<Domain>Info` to name "details of an X" because Go does not
have package-qualified imports for types. TS does, and `<Domain>` alone
suffices. The 2026-05-26 field-rename prune removed the field-side
incidence of this theme (e.g. `repo?: RepoInfo` is no longer flagged as a
field-name issue) but the type-name incidence survives. Examples that
remain flagged at the type level:

- `RepoInfo` → `Repo` / `GitFolder` (brand drift — see Theme 3).
- `PolicyInfo` → `Policy`.
- `EndpointInfo` → `Endpoint` (in `warehouses`, brand mismatch — see Theme 3).
- `SchemaInfo` → `Schema`.
- `CredentialInfo` → `Credential`.
- `MetastoreInfo` → `Metastore`.
- `CatalogInfo` → `Catalog`.
- `RegisteredModelInfo`, `ModelVersionInfo`, `RegisteredModelAliasInfo`,
  `TableInfo`, `FunctionInfo`, `ConnectionInfo`, `VolumeInfo`,
  `OnlineTableInfo`.

Same problem with other vague suffixes (type-side only after the prune):
- `*Spec` / `*Details` / `*Config` / `*Status` / `*Data` / `*Metadata` used inconsistently — sometimes for the entity, sometimes for a sub-property, sometimes for both. `apps.ApplicationStatus` and `App.appStatus` (the field is no longer flagged but the type-name divergence remains).

**Generator fix:** Strip the `Info` suffix when the type is the canonical
domain entity. (Heuristic: if `<Foo>Info` is the only `<Foo>*` type that
isn't a request/response, drop `Info`.) Same for redundant `Options`/`Spec`
suffixes on tagged-union arms when the parent has a discriminator. Field
renames are out of scope per user direction (would deviate the SDK from
the underlying API).

### Theme 2. Inconsistent acronym casing across the SDK — 87/87 packages

> **Status (2026-05-21):** Policy adopted (Google TS Style Guide:
> "treat acronyms as whole words"). The rule was already at
> `.agent/rules/typescript.mdc:184`. All hand-written-package renames
> listed in 2b have been applied. Theme 2a generated-code outliers
> remain — `OAuth*` is documented as a platform-name exception per
> RFC 6749 (kept).

The SDK has no project-wide acronym-casing policy. The inconsistencies
appear on two distinct surfaces, each with a different cause and fix path.

#### 2a. Generated code — 87/87 packages

The generator already uses **`Pascal-then-lower`** very consistently for
TS identifiers (`Url`, `Id`, `Json`, `Sql`, `Http`, `Oauth`, `Aws`,
`Gcp`, `Llm`, `Dbfs`, `Iam`, `Sse`, `Pii`, `Aibi`, `Dbr`, `Uri`). A scan
of all generated packages found:

| Acronym | TS identifiers (Pascal-then-lower) | `ALL_CAPS` form — where it appears |
|---|---|---|
| URL  | `Url` — 445 hits / 63 pkgs | `URLSearchParams` (JS built-in, every `client.ts`); `'URL'` enum value in `rfa` |
| ID   | `Id` — 3303 hits / 71 pkgs | `'ID'` enum value in ~10 pkgs (e.g. `IpAccessListType.ID`, `GenieAttachment.ID`); `ACCOUNT_ID` (`SCREAMING_SNAKE` constant — different style class) |
| JSON | `Json` — 208 hits / 65 pkgs | `JSON.parse`/`JSON.stringify` (JS built-in, every `utils.ts`); occasional `'JSON'` enum value |
| SQL  | `Sql` — 132 hits / 7 pkgs | `'SQL'` enum values; `DATABRICKS_SQL_ACCESS` (`SCREAMING_SNAKE` constant) |
| HTTP | `Http` — 2156 hits / 65 pkgs | `'HTTP request'` log strings in `utils.ts`; `HTTPS URL` in JSDoc |
| OAuth | `Oauth` — 29 hits in `oauth` pkg | **`OAuthAppIntegration`/`CustomOAuthAppIntegration` identifiers also in `oauth` pkg** — real mixed-form inconsistency in the same package |
| AWS  | `Aws` — 120 hits / 7 pkgs | `AWS_SSE_S3` and friends (`SCREAMING_SNAKE` enum values) |
| GCP  | `Gcp` — 198 hits / 7 pkgs | `'GCP'` JSDoc / enum string |
| IAM  | (no `Iam*` TS identifiers — only `Iam`-prefixed model types in 2 pkgs) | `IAM role`, `IAM` in JSDoc comments in 4 pkgs — comment text only, not identifiers |
| URI  | `Uri` — 27 hits / 6 pkgs | `URI` in JSDoc comments in 4 pkgs — comment text only |
| LLM  | `Llm` — 147 hits / 4 pkgs | `LLM` in JSDoc / occasional enum string |
| DBFS | `Dbfs` — 76 hits / 3 pkgs | `DBFS` in JSDoc comments |
| ETag | `etag` field name | RFC 7232 §2.3 says `ETag` — minor canonical-form mismatch |
| RPC  | `Rpc` — 5 hits / 3 pkgs | `RPC` in JSDoc comments — comment text only |

**The apparent `ALL_CAPS` leaks in identifiers across the generated
packages are almost entirely:**

- **JS built-ins** (`URLSearchParams`, `JSON.parse`/`JSON.stringify`,
  `encodeURIComponent`) — part of the JavaScript standard library; the
  SDK cannot rename them.
- **JSDoc comment text** copied from upstream proto comments (`IAM role`,
  `S3 URI`, `HTTPS URL`, `OAuth scopes`, `DBFS`) — not identifiers.
- **Wire-format enum string values** (`'URL' = 'URL'`, `'SQL' = 'SQL'`,
  `'ID' = 'ID'`) — preserved as-is from the upstream proto; the JSON
  wire shape requires the literal uppercase strings.
- **`SCREAMING_SNAKE_CASE` constants** (`AWS_SSE_S3`,
  `DATABRICKS_SQL_ACCESS`) — a different style class (SCREAMING_SNAKE
  constants), not "ALL_CAPS acronym" leaks.

**The one real generated-code identifier inconsistency** is `OAuth`
vs `Oauth` mixed within the `oauth` package itself
(`OAuthAppIntegration`, `CustomOAuthAppIntegration` vs `Oauth` field
positions).

**Generator fix:** Adopt one policy in `typescript.mdc` and converge the
small number of `OAuth*` identifiers. The two consistent options:
1. **Google TS style guide (`Pascal-then-lower`):** `Url`, `Id`, `Sql`, `Json`, `Oauth`. Pro: matches what the generator already emits for ~99% of identifiers; lowest-churn path. Con: `Oauth` deviates slightly from the brand spelling `OAuth`.
2. **.NET / Microsoft (`ALL_CAPS` for ≤2-letter, `Pascal-then-lower` for ≥3):** `URL`, `ID`, `Sql`, `Json`, `OAuth`. Pro: matches HTTP/RFC casing and the brand. Con: requires renaming ~3300 `*Id` identifiers and ~445 `*Url` identifiers across the whole corpus — major generator+spec change.

#### 2b. Hand-written code — 5/5 packages (`auth`, `core`, `databricks`, `sdk`, `options`)

**Status: Fixed (2026-05-21).** The renames listed below were applied.
The historical table and prose are retained as a record of the BEFORE
state.

The hand-written packages mixed the two styles within the same file.
The real inconsistencies (excluding JS built-ins and `SCREAMING_SNAKE`
constants) were:

- **`core/apierror/`** mixed `HttpClient`/`HttpRequest`/`HttpResponse` (Pascal) with `HTTPBody`/`HTTPHeader`/`HTTPStatusCode` (ALL_CAPS) within the same module.
- **`auth/credentials/`** used `IDToken`/`IDTokenProvider` (ALL_CAPS) alongside `clientId`/`fetchCliToken` (Pascal) for short acronyms.
- **`core/apierror/APIError`** used ALL_CAPS for `API` while the rest of the codebase used Pascal-then-lower.

> **Resolved:** all real identifier renames listed above were applied
> (105 files: 11 hand-written + 94 generated `utils.ts`).
> `APIError` → `ApiError` rename touched 105 files.
> `IDToken`/`IDTokenProvider` → `IdToken`/`IdTokenProvider`.
> `HTTPStatusCode`/`HTTPHeader`/`HTTPBody` → `httpStatusCode`/`httpHeader`/`httpBody`.
> `OAuthAuthorizationServer`, `OIDC*` and JS built-ins
> (`URLSearchParams`, `JSON.parse`, `encodeURIComponent`) kept under
> the platform-name exception. `SCREAMING_SNAKE_CASE` constants
> unaffected.

### Theme 3. Brand drift / rebrand leakage — ~6/87 packages (stable across the 2026-05-26 prune)

Several products were rebranded but the TS surface still carries the old
codename:

- `warehouses` — every TS type is `Endpoint*` (legacy "SQL Endpoints" name) despite the package being named for the modern "SQL Warehouses" product.
- `pipelines` — uses `Update` as the noun for "pipeline run" (DLT-era terminology); the product is now "Lakeflow Declarative Pipelines".
- `lakeview` — the package name is the old codename; the product is "AI/BI Dashboards".
- `repos` — package name is legacy; the product is "Git folders". The type `RepoInfo` should be `GitFolder`.
- `experiments` — MLflow experiments; cross-package overlap with `forecasting` ML APIs.
- `genie` — codename for "AI/BI Genie" / "Genie Spaces".

**Generator fix:** Per-product spec needs updates; the rename can land via a
generator alias map (`Endpoint` → `Warehouse` in `warehouses` only, etc.).

### Theme 4. Proto-architectural-leak infixes — ~8/87 packages (further shrunk by the 2026-05-26 doc + SDK-internal prunes)

Internal proto / service-tier identifiers leak through the codegen and show
up as mid-position infix tokens that have no meaning to a TS SDK consumer.
The 2026-05-22 generator regen retroactively validated generator rule §8.2
and renamed the dominant `*Public*Request` sub-pattern. The 2026-05-26 prune
further removed the JSDoc-banner sub-cases (out of scope per the doc-change
prune) and SDK-internal `utils.ts` plumbing (out of scope per the
SDK-internal prune). What remains is the type-name surface only.

**Status after the 2026-05-26 prune:**

- The `*Public*Request` sub-pattern is fixed (2026-05-22 regen).
- **`*CustomerFacing*` qualifier still survives in `networking`** — 40+
  identifiers (`CustomerFacingIngressNetworkPolicy`,
  `CustomerFacingVpcEndpointUseCase`, etc.) in active source. Not yet
  scanned as findings because the regen left them untouched.
- **`*Proto` suffix** still active in a handful of identifiers:
  `TriggerStateProto` (`jobs`), `DatabricksServiceExceptionProto`,
  `DatabricksServiceExceptionWithDetailsProto` (`apps`).
- **`*Service*` mid-position infix.** `ServiceErrorCode` / `ServiceError`
  in `statementexecution`.
- **`*Handler` suffix.** `listCleanRoomNotebookTaskRunsHandler` /
  `listCleanRoomNotebookTaskRunsHandlerIter` in `cleanrooms/client.ts`.
- **`*V2*` mid-position.** `RunLifecycleStateV2` (jobs).
- **JSDoc banners pruned.** "Public RPC", "Wrapper message", and "Public
  facing RPC requests and responses *****" comments no longer flagged
  (doc-change prune, 2026-05-26).

**Generator fix:** Strip proto-architectural-tier markers from the public
TS surface emit. The set is small and closed: `Public`, `Internal`,
`Proto`, `Service` (when mid-position and not the domain word), `Backend`,
`Manager`, `Handler`, `Impl`, `Rpc`, `Grpc`, `Wrapper`, `CustomerFacing`,
mid-position `V<N>`. Carried as a single generator-only rule in §8.2 below.

---

## 2. Cross-package duplication & overlap

The audits surfaced ~20 pairs/triplets/quartets of packages that overlap
on a single underlying concept. Each row is a real user-facing pain point:
"I want to do X — which of these N packages do I import?"

### 2.1 Settings (2-way overlap — was a 4-way)

The 2026-05-22 regen consolidated the previous 4-way fanout
(`settings` + `accountsettings` + `workspacesettings` + `workspaceconf`)
into:

| Package | Style | What it really is |
|---|---|---|
| `settings` (v2) | Generic polymorphic value | Account- and workspace-scoped settings under the unified v2 surface |
| Retired | — | `accountsettings`, `workspacesettings`, `workspaceconf` were retired in the regen; their findings are in the orphan audits |

`settings/v2/model.ts` now carries 84 active findings — the cross-package
duplicates (`BooleanMessage`, `StringMessage`, `RestrictWorkspaceAdminsMessage`,
`PersonalComputeMessage`) are now collapsed into a single surface but the
type-naming friction remains.

### 2.2 Secrets (2-way overlap, was 4-way)

The 2026-05-20 regeneration deleted both `serviceprincipalsecrets` and
`serviceprincipalsecretsproxy`. The remaining secrets surface is:

| Package | What it really is |
|---|---|
| `secrets` | Workspace-level Secret Manager (scopes + key/value) |
| `secretsuc` | Unity Catalog three-level-namespaced secrets |

Both packages still export a class literally named `Client` and a type
literally named `Secret`. The previous byte-identical `*proxy` duplicate
no longer exists.

### 2.3 Credentials (3-way overlap)

| Package | What it really is |
|---|---|
| `@databricks/sdk-auth/credentials/` | SDK *user-auth* credentials (PAT, U2M, M2M) |
| `credentials` | Unity Catalog cloud-storage credentials (AWS IAM, Azure SP, GCP SA) |
| `gitcredentials` | Per-workspace Git provider credentials (GitHub/GitLab PATs) |

The bare type name `Credential` exists in two of these and `Credentials`
exists in the third.

### 2.4 Identity / IAM (shrunk further by the 2026-05-22 regen)

- `iam` still exposes `*` + `*Proxy` versions of every method (e.g.
  `createGroup` + `createGroupProxy`, etc.) — 17 endpoint pairs.
- `accessmanagement` (NEW in the 2026-05-22 regen) is the consolidated
  umbrella for what used to be `permissions`, `accountaccesscontrol`,
  `accountaccesscontrolproxy`, and `workspaceassignment`. Covers object
  permissions, permission levels, rule sets, and workspace assignments
  in a single import path.

### 2.5 Tokens

| Package | What it really is |
|---|---|
| `tokens` | User-self PAT management |
| `tokenmanagement` | Admin-of-others PAT management |

Both export `Client`, both export request types named identically. They
duplicate the entire `AutoscopeState` enum verbatim.

### 2.6 Tags (3-way split)

| Package | What it really is |
|---|---|
| `tagpolicies` | Account-level governed-tag definitions |
| `tagassignments` | Tag assignments on `apps`/`dashboards`/`geniespaces`/`notebooks` (non-UC) |
| `entitytagassignments` | Tag assignments on UC entities (tables/schemas/columns/volumes) |

Three packages, three `Client` classes, three near-identical
`TagAssignment` / `EntityTagAssignment` types. The non-UC variant has
`entityId: string`, the UC variant has `entityName: string` — same logical
field, different name, both string.

### 2.7 Quality / Data monitoring (consolidated to one)

The 2026-05-22 regen retired `qualitymonitor` and `qualitymonitors` (both
deprecated). The only active surface is `dataquality`. Two former orphans
no longer contribute to the active total.

### 2.8 Model Registry

| Package | What it really is |
|---|---|
| `modelregistry` | Workspace-level MLflow registry (legacy) |
| `registeredmodels` | Unity Catalog model registry (modern) |

The legacy package has the canonical-sounding name; the UC replacement is
hidden behind a plural noun.

### 2.9 Model Serving (consolidated)

The three-way fragmentation
(`modelservingmanagement` + `modelservingquery` + `modelservingdebug`)
collapsed to two packages in the 2026-05-22 regen:

| Package | What it really is |
|---|---|
| `modelserving` | CRUD over serving endpoints (was `modelservingmanagement`); absorbed the former `modelservingdebug` |
| `modelservingquery` | Inference / `POST /invocations` |

The type-naming friction remains: `InferenceEndpoint` (in `modelserving`)
vs `Endpoint` (in `modelservingquery`) vs the URL `serving-endpoints`.

### 2.10 Cluster compute (overlapping warehouses)

- `warehouses` exposes SQL Warehouses (formerly "SQL Endpoints"); the
  TS types still spell `Endpoint*` (e.g. `EndpointInfo`, `EndpointState`).
- `vectorsearch` (consolidated from `endpoints` + `indexes`) exposes
  Vector Search endpoints with type names like `Endpoint`, `EndpointType`,
  `EndpointStatus`.

Two packages, two `Endpoint*` type families, different products.

### 2.11 Database (Lakebase)

| Package | What it really is |
|---|---|
| `database` | Lakebase / managed Postgres (`DatabaseInstance`, etc.) |
| `postgres` | Same Lakebase OLTP surface from a different angle |

Both expose `SyncedTable`, `DatabaseInstance`, and other heavily-nested
types covering the same wire object.

### 2.12 Features

| Package | What it really is |
|---|---|
| `features` | Feature definitions |
| `featurestore` | Online stores / publishing |

The third sibling (`materializedfeatures`) was retired in the 2026-05-22
regen; its surface is folded into `features` (`MaterializedFeature` types
already live there).

### 2.13 Budget / Usage policy

| Package | What it really is |
|---|---|
| `budgetpolicy` | `/api/2.0/accounts/{accountId}/budget-policies` |
| `usagepolicy` | `/api/2.1/accounts/{accountId}/usage-policies` |

`usagepolicy/v1/model.ts` is `budgetpolicy/v1/model.ts` with the word
"Budget" substituted for "Usage". The JSDoc on `UsagePolicy.policyId` even
admits it: "(same structure as BudgetPolicy)". Reserved tag keys still say
`"budget-policy-name"` in the usage-policy clone.

### 2.14 Workspace (2-package fanout, was 5)

The 2026-05-22 regen retired three of the previous five
(`workspace` → `workspaceobjects` rename, `workspaceassignment` →
`accessmanagement`, and both `workspaceconf` and `workspacesettings`
retired). The remaining set:

| Package | What it really is |
|---|---|
| `workspaceobjects` | Workspace filesystem (notebooks/folders/files) |
| `workspacebindings` | Securable-to-workspace bindings |

The bare name `workspace` was the most-overloaded; renaming to
`workspaceobjects` resolves the principal-vs-filesystem confusion.

### 2.15 Schemas (UC overlap)

| Package | What it really is |
|---|---|
| `schemas` | User-defined UC schemas (full CRUD) |
| `systemschemas` | Server-managed UC system schemas (enable/disable) |

### 2.16 OAuth (consolidated)

The 2026-05-22 regen merged `oauthcustomappintegration` and
`oauthpublishedapp` into a single `oauth` package, ending the
singular-plural split and the misleading "custom" name. The new package
covers both Custom and Published app integrations as well as the
published-app catalog.

### 2.17 Statement / Query / Command execution

`queryexecution` was deleted in the 2026-05-20 regeneration. The
remaining surfaces:

| Package | What it really is |
|---|---|
| `statementexecution` | Ad-hoc SQL on a SQL Warehouse |
| `commandexecution` | Python/SQL/Scala/R via Clusters REPL |
| `queries` | Saved-query CRUD |
| `queryhistory` | Read-only query history list |

Four packages, three near-synonyms in the names (query/statement/command),
disjoint scopes that the names do not telegraph.

### 2.18 Account API cluster (consolidated in the 2026-05-22 regen)

The 2026-05-20 regen first absorbed account-tier APIs into seven
previously-unaudited packages. The 2026-05-22 regen then renamed the
`*Public*Request` family across every one of them — ~81 findings moved to
`Fixed`. The remaining surface is the consolidated set:

| Package | Account-tier surface |
|---|---|
| `workspaces` | Create/update/delete an account-managed workspace |
| `networking` | NCC, networks, private access settings, VPC endpoints, network policies |
| `storageconfigurations` | Account-level cloud storage configs (S3 root buckets) |
| `keyconfigurations` | Account-level customer-managed key configurations |
| `credentials` (account half) | `AccountsCreate*` family (the `*Public*` suffix has been removed) |
| `metastores` (account half) | `AccountsCreate*` family (the `*Public*` suffix has been removed) |
| `authentication` | Account-level token federation policies |
| `scim` | Account-level SCIM 2.0 user/group provisioning |
| `sharing` | Account-level Delta Sharing provider config |
| `accessmanagement` | Object permissions, permission levels, rule sets, workspace assignments (consolidated) |
| `logdelivery` | Account-level log delivery configs (was `logdeliveryconfigurations`) |

The `*Public*Request` proto-leak that previously dominated this cluster is
no longer a concern. Residual `*CustomerFacing*` qualifiers in `networking`
are not yet flagged but match generator rule §8.2.

### 2.19 Other notable overlaps

- `lakeview` (the rebranded "AI/BI Dashboards" — name uses old codename).
- `cleanrooms` absorbed `cleanroomassets` + `cleanroomautoapprovalrules` +
  `cleanroomtaskruns`; the four-package fanout is now a single package.
- `supervisoragents` + `knowledgeassistants` + `customllms` —
  three packages in the LLM-orchestration space with bare-generic top-level
  type names (`SupervisorAgent`, `KnowledgeAssistant`, `CustomLlm`).

---

## 3. Cryptic abbreviations glossary

The user-facing TS surface uses these abbreviations, mostly without
expansion in code or JSDoc. A first-time user has to guess.

| Abbreviation | Meaning | Visibility | Notes |
|---|---|---|---|
| `rfa` | Request For Access | Package name only | `packages/rfa/` — no expansion in any TS identifier or JSDoc. The wire URL `/api/3.0/rfa/...` is the only other carrier. |
| `uc` | Unity Catalog | Package suffix (`secretsuc`), URL `/unity-catalog/`, comment references | Never appears as a type prefix. |
| `sp` | Service Principal | Field prefixes (`accountSpStatus`, `spId`) | Inconsistent — sometimes spelled out (`servicePrincipal`), sometimes `sp`. |
| `conf` | Configuration | `EndpointConfPair` (type) (legacy `workspaceconf` package retired in 2026-05-22 regen) | One four-letter abbreviation that the rest of the SDK consistently spells out. |
| `dbu` | Databricks Unit | Cluster docs only | Not in type names. |
| `dbr` | Databricks Runtime | `TerminationCode.DBR_IMAGE_RESOLUTION_FAILURE`, `K8S_DBR_CLUSTER_LAUNCH_TIMEOUT` | Acronym not expanded. |
| `dbfs` | Databricks File System | `DbfsStorageInfo`, `disableLegacyDbfs` | Casing varies (`Dbfs` vs `DBFS` in JSDoc). |
| `dlt` | Delta Live Tables | Comment references | The product was renamed to "Lakeflow Declarative Pipelines"; the type `Update` still reflects the DLT-era name. |
| `csp` | Compliance Security Profile | `CspEnablementAccountSetting`, `Csp*` family | `Csp` casing is uniform; the acronym is not expanded. |
| `esm` | Enhanced Security Monitoring | `EsmEnablementAccountSetting`, `Esm*` family | Same as CSP. |
| `dcp` | (settings v1 internal acronym) | `DcpAccountEnableMessage` | Flagged as cryptic. |
| `llm` | Large Language Model | `CustomLlm`, `LlmProxyPartnerPoweredAccount`, `Llm*` family | `Llm` casing is uniform across SDK. |
| `sdp` | Serverless Declarative Pipelines | Comments | Internal acronym. |
| `ldp` | Lakeflow Declarative Pipelines | Comments | Internal acronym. |
| `dab` | Databricks Asset Bundles | `bundle` package only | Spelled out in package. |
| `m2m` | Machine-to-Machine | `auth/credentials/m2m.ts` | OAuth grant type. |
| `u2m` | User-to-Machine | `auth/credentials/u2m.ts` | OAuth grant type. |
| `pat` | Personal Access Token | `auth/credentials/pat.ts`, `tokens` package | OAuth-adjacent. |
| `abac` | Attribute-Based Access Control | Package name `abacpolicies` only | Never appears in code or types. |
| `iam` | Identity and Access Management | Package name | Conventional. |
| `wkt` | Well-Known Types | `@databricks/sdk-core/wkt` import | Proto term, not exposed to users. |
| `aibi` | AI/BI Dashboards | `AibiDashboard*` family | Internal codename for the "AI/BI" product brand. |
| `byok` | Bring Your Own Key | `TerminationCode.AZURE_BYOK_KEY_PERMISSION_FAILURE` | Not expanded. |
| `npip` | No Public IP | `TerminationCode.NPIP_TUNNEL_*` | Internal Databricks networking term. |
| `cmv2` | Cluster Manager v2 | `TerminationCode.K8S_DBR_CLUSTER_LAUNCH_TIMEOUT` JSDoc | Internal term ("CMv2") leaked into enum doc. |
| `aqs`/`sqs` | Azure Queue Storage / AWS SQS | `AwsSqsQueue`, `AzureQueueStorage` | Audit flagged a doc copy-paste error: AWS SQS JSDoc says "AQS queue url". |
| `cprf` | Control Plane Request Failure | `TerminationCode.CONTROL_PLANE_REQUEST_FAILURE` JSDoc | Internal acronym in user-facing JSDoc. |
| `gke` | Google Kubernetes Engine | `TerminationCode.GKE_BASED_CLUSTER_TERMINATION` | Cloud-specific abbreviation. |
| `n` (single letter) | Number of completions (LLM API) | `QueryEndpointInput.n` | One-character field name on a public model. |
| `expr` | Expression | `FunctionArgExpression.expr` discriminator | Three-letter abbreviation when `expression` would do. |
| `arg` | Argument | `fullNameArg`, `nameArg`, `versionArg`, `aliasArg` | Path-parameter suffix; surfaced in 5+ UC packages (`tables`, `schemas`, `catalogs`, `functions`, `registeredmodels`). |
| `tpe` | Type | `externallineage.ExternalLineageRelationshipObject.tpe` | Likely typo for `type` — but is a discriminator key. |
| `req` / `resp` | Request / Response | Local variable names in `client.ts` files | Go-ism. |
| `etag` / `eTag` / `ETag` | Entity Tag (HTTP) | Field name varies | RFC 7232 §2.3 specifies `ETag`. |

---

## 4. Acronym-casing inconsistencies

The SDK currently has no enforced casing policy. The same acronym appears in
multiple casings across packages — sometimes within the same file.

| Acronym | Found casings | Sample sites |
|---|---|---|
| **URL** | `Url`, `URL`, `url` | `webhookUrl` (field), `URL` (enum value in `rfa.DestinationType`), `URLSearchParams` (import). Note: `URL` collides with the JS built-in. |
| **ID** | `Id`, `ID`, `id` | `userId`, `runId`, `policyId` (field side) vs `ID` (enum value) vs raw `id` (bare field). |
| **URI** | `Uri`, `URI` | `endpointUri` vs JSDoc "URI". |
| **SQL** | `Sql`, `SQL` | `SqlWarehouseSpec` (type), `DATABRICKS_SQL_ACCESS` (enum). |
| **JSON** | `Json`, `JSON` | `JsonValue`, `JsonObject` (wkt types) vs `JSON.stringify` (built-in). |
| **OAuth** | `Oauth`, `OAuth` | Package `oauth` (lowercased), type `OAuthAppIntegration` (PascalCase). |
| **PyPI** | `Pypi`, `PyPI` | `PypiLibrary` (type), JSDoc spells `PyPI`. |
| **AWS** | `Aws`, `AWS` | `AwsAttributes` (type), `AWS_SSE_S3` (enum). |
| **GCP** | `Gcp`, `GCP` | `GcpAvailability` (type), `GCP_QUOTA_EXCEEDED` (enum). |
| **Azure** | `Azure` | Consistent. |
| **LLM** | `Llm`, `LLM` | `CustomLlm` (type, field), JSDoc says `LLM`. |
| **HTTP** | `Http`, `HTTP` | `HttpClient` (type) vs JSDoc and headers. Hand-written packages converged on Pascal-then-lower (`httpStatusCode`, `httpHeader`, `httpBody`) on 2026-05-21. |
| **HTTPS** | `Https` | Consistent. |
| **DBFS** | `Dbfs`, `DBFS` | `DbfsStorageInfo` vs `disableLegacyDbfs` vs JSDoc "DBFS". |
| **DBR** | `Dbr`, `DBR` | Enum members all-caps. |
| **PII** | `Pii`, `PII` | `Pii` casing in types; JSDoc varies. |
| **CSP** | `Csp`, `CSP` | Type `Csp*`, JSDoc "CSP". |
| **ESM** | `Esm`, `ESM` | Type `Esm*`, JSDoc "ESM". |
| **IdP** | `Idp`, `IdP` | `idp*` fields, JSDoc "IdP". |
| **ETag** | `etag`, `eTag`, `ETag` | Three casings within one JSDoc comment block (formerly `accountaccesscontrolproxy`, now in `accessmanagement`). |
| **ODBC** | `Odbc` | `OdbcParams`. |
| **JDBC** | `Jdbc`, `JDBC` | Doc references only. |
| **AI/BI** | `Aibi`, `AI/BI` | `AibiDashboard*` types, JSDoc says "AI/BI". |
| **SSE** | `Sse`, `SSE` | `SseEncryptionAlgorithm` (type), `SSE_ENCRYPTION_ALGORITHM_UNSPECIFIED` (enum). |
| **TLS** | `Tls`, `TLS` | Rare; `Tls` in field names. |
| **OAuth2** | varied | `oauth2` (path), `OAuth` (types). |

**Recommendation:** Pick one rule. The Google TypeScript Style Guide
specifies `Pascal-then-lower` (`Url`, `Id`, `Json`, `Sql`) — this is the
current majority in the SDK. The hand-written packages were converged on
this rule on 2026-05-21. Document the choice in
`.agent/rules/typescript.mdc` § 3 and enforce in CI. Wire format unchanged.

---

## 5. Top highest-impact surviving findings

Picked from the post-2026-05-26-prune corpus. Entries that depended on
field-rename, doc-change, SDK-internal, or non-TS findings (now all
out-of-scope) have been removed. The retained entries are
structural type-level issues — type names, reserved-word collisions,
brand drift, cross-package duplicate concepts, and the surviving
proto-architectural leaks. Each entry: file + symbol + the generator
pattern it exemplifies.

| # | Package | File:Line | Symbol / Issue | Pattern |
|---|---|---|---|---|
| 1 | `jobs` | `model.ts:3399, 3491, 3852, 3866, 4261, 908, 3875` | `Run` overloaded across 7 shapes (`Run`, `BaseRun`, `RunTask`, `Run_JobLevelParameters`, `RunState`, `RunStatus`, `RunTriggerInfo`). | Vague/duplicate concepts |
| 2 | `jobs` | `model.ts:150, 280, 1464, 1835` | `Format`, `Source`, `Compute`, `Environment` — top-level types collide with JS/TS built-ins and DOM globals. | Reserved-word collision |
| 3 | `jobs` | `model.ts` | `TriggerStateProto` — `Proto` suffix is a wire-format architectural leak that survived the 2026-05-22 regen. | Proto-architectural leak (`Proto` suffix) |
| 4 | `warehouses` | `model.ts:passim` | Every `Endpoint*` type leaks the legacy "SQL Endpoints" brand into the modern "SQL Warehouses" surface. | Brand drift / rebrand leakage |
| 5 | `pipelines` | `model.ts:283, 1091, 1689, 2738, 2879` | `Update` is the noun "pipeline run" — collides with HTTP `update()` verb across 9 types/methods. | Rebrand leakage (DLT → Lakeflow) |
| 6 | `iam` | `client.ts:309-2150` | Every method exists as `*` + `*Proxy` pair (17 endpoint duplicates). | Proxy routing in method names |
| 7 | `iam` | `model.ts:41-48` | `State` (top-level enum) — collides with React `setState`/state-machine libraries. | Generic top-level enum |
| 8 | `iam` | `model.ts:13-21` | `Entitlement` — vague enum mixing presence and permission semantics. | Vague enum |
| 9 | `abacpolicies` | `model.ts:137` | `PolicyInfo` — `Info` suffix on the canonical entity. | `Info` suffix |
| 10 | `tables` | `model.ts:849` | `TableSummary` vs `TableInfo` — two near-identical shapes. | Duplicate concept |
| 11 | `apps` | `model.ts:693, 1054` | `ApplicationStatus` on `App` — two vocabularies for one product. | Vocabulary drift |
| 12 | `apps` | `model.ts:606, 962` | `AppResourceApp.AppPermission` — `App` token thrice on the type path. | Redundant prefix |
| 13 | `apps` | `model.ts` | `DatabricksServiceExceptionProto`, `DatabricksServiceExceptionWithDetailsProto` — `Proto` suffix. | Proto-architectural leak (`Proto` suffix) |
| 14 | `genie` | `client.ts:131, 1019, 1038` | 28 of 30 methods prefixed `genie*`, 2 not; one `Trash*` instead of `Delete*`. | Inconsistent action verbs |
| 15 | `commandexecution` | model.ts vs client.ts | `CreateResponse` reused for both `create()` (context id) and `execute()` (command queued). | Type repurposing |
| 16 | `commandexecution` | `client.ts:256` | `client.destroy()` — verb collision; Go SDK uses `delete`. | Verb inconsistency |
| 17 | `commandexecution` | `client.ts:333, 417, 498` | `CancelWaiter`, `CreateWaiter`, `ExecuteWaiter` — too short to convey what they wait for. | Waiter-class genericity |
| 18 | `secrets` | `client.ts:passim` | `Put` for ACLs/secrets, `Create` for scopes, `Delete` for both — inconsistent mutation verbs. | Inconsistent action verbs |
| 19 | `dataquality` | model.ts | `ListMonitorRequest` singular for a list-of-monitors request. | Singular/plural mismatch |
| 20 | `modelserving` | `model.ts:passim` | Package says "model serving"; types say `InferenceEndpoint*`; URL says `serving-endpoints`. | Three names for one noun |
| 21 | `modelserving` | `model.ts:960` | `ServedModel` actually holds non-model entities (`servedEntities: ServedModel[]`). | Type-name contradicts content |
| 22 | `oauth` | `model.ts:passim` | After the merge, `OAuthAppIntegration*` vs `CustomOAuthAppIntegration*` consolidation friction. | Post-merge consolidation friction |
| 23 | `accessmanagement` | model.ts | After the `permissions` rename + `workspaceassignment` absorption, type-name overlap with `iam` and `grants` is still present. | Cross-package fragmentation |
| 24 | `tokens` | `model.ts:13-21` | `AutoscopeState` duplicated verbatim in `tokenmanagement`. | Cross-package duplicate type |
| 25 | `tokens` + `tokenmanagement` | package | Two packages for one PAT resource; both export `Client`. | Cross-package collisions |
| 26 | `usagepolicy` | model.ts | 1:1 clone of `budgetpolicy` with `Budget` → `Usage`. | Whole-package duplicate |
| 27 | `customllms` | every file | `CustomLlm` — generic name with cryptic-acronym body. | Generic naming + cryptic abbreviation |
| 28 | `supervisoragents` | `model.ts:219` | `SupervisorAgent` — two extremely generic nouns combined. | Generic naming |
| 29 | `supervisoragents` | `model.ts:251` | `Tool` — bare generic for discriminated union over 14 resource kinds. | Stringly-typed sum |
| 30 | `cleanrooms` | `client.ts:662, 704` | `listCleanRoomNotebookTaskRunsHandler` / `listCleanRoomNotebookTaskRunsHandlerIter` — `Handler` suffix proto-leak. | Proto-architectural leak (`Handler` suffix) |
| 31 | `database` + `postgres` | model.ts | Two packages, one product (Lakebase managed Postgres); `SyncedTable`/`DatabaseInstance` duplicated across both. | Duplicate package |
| 32 | `experiments` | `model.ts:219, 712` | `Run`, `Experiment`, `Metric`, `Param`, `LoggedModel` — single-word top-level types. | Generic naming |
| 33 | `repos` | `model.ts:111` | `RepoInfo` — `Info` suffix on the canonical entity; product re-branded to "Git folders". | `Info` suffix + brand drift |
| 34 | `repos` | package + types | "Repos" is legacy; product is "Git folders". | Brand drift |
| 35 | `notificationdestinations` | `model.ts:17, 13` | `Config` top-level interface; `DestinationType` vague enum. | Generic top-level name |
| 36 | `disasterrecovery` | `model.ts:91, 10` | `FailoverFailoverGroupRequest` — token "Failover" twice. | Generator stutter |
| 37 | `marketplaces` | `model.ts:passim` | `Listing` vs `ExchangeListing` vs `ListingSummary` vs `ListingDetail` — four overlapping "listing" shapes. | Duplicate concept |
| 38 | `externalmetadata` | `model.ts:10-32` | `SystemType` enum with 22 values mixing case styles (`POWER_BI`, `STREAM_NATIVE`, `POSTGRESQL`, `MICROSOFT_SQL_SERVER`). | Brand-value casing |
| 39 | `clusters` | `model.ts:175-734` | `TerminationCode` enum with 150+ values mixing case styles. | Brand-value casing |
| 40 | `lakeview` | package | Old codename; product is now "AI/BI Dashboards". | Brand drift |
| 41 | `bundle` | package + types | Bare "bundle" word collides with Webpack/Vite/Rollup. | Generic package name |
| 42 | `instancepools` | `model.ts:passim` | Structural duplication of `Create*`/`Edit*`/`*AndStats`. | Duplicate concept |
| 43 | `externallineage` | `model.ts:passim` | `Direction_LineageDirection` stutter. | Generator stutter |
| 44 | `settings` | `model.ts:passim` | Post-consolidation v2 surface carries acronym soup (`Csp*`, `Esm*`, `Llm*`, `Dcp*`) and `BooleanMessage`/`StringMessage` wrappers. | Generic + cryptic |
| 45 | `statementexecution` | `model.ts:passim` | `ServiceErrorCode` / `ServiceError` — `Service` mid-position is a proto/gRPC architectural-layer noun. | Proto-architectural leak (`Service` infix) |
| 46 | `networking` | `model.ts:passim` | 40+ `CustomerFacing*` identifiers remain in active source. Not flagged in the rescan but match generator rule §8.2. | Proto-architectural leak (`CustomerFacing` qualifier) |
| 47 | `marketplaces` | `model.ts:passim` | `Exchange` vs `Listing` vocabulary tension within a single package. | Vocabulary drift |
| 48 | `forecasting` | `client.ts` | `CreateForecastingExperimentWaiter` + Go-style `Waiter.done()` predicate. | Go-style waiter pattern |

---

## 6. By-the-numbers (all 87 active packages, sorted by total findings)

| # | Package | Findings | Top theme |
|---|---|---|---|
| 1 | jobs | 97 | Generic enum/interface names (`Run`, `Format`, `Source`, `Compute`); `Run` overload across 7 shapes; `TriggerStateProto` proto-suffix |
| 2 | warehouses | 75 | Legacy `Endpoint*` brand surviving the SQL-Warehouse rebrand |
| 3 | instancepools | 64 | Structural duplication of `Create*`/`Edit*`/`*AndStats` |
| 4 | catalogs | 41 | `*_OptionsEntry`/`*_PropertiesEntry`; Create-with-read-only-fields; cross-package SecurableType collisions |
| 5 | functions | 38 | `function` reserved-word; cryptic single-letter enum variants |
| 6 | statementexecution | 37 | `ServiceErrorCode` infix; package name overlaps `commandexecution`/`queries` |
| 7 | instanceprofiles | 37 | Bare verb request types; vague identifiers |
| 8 | pipelines | 36 | `Update` noun = pipeline run (DLT → Lakeflow rebrand) |
| 9 | features | 36 | Sibling-package fragmentation (now 2 after `materializedfeatures` retirement) |
| 10 | genie | 35 | Inconsistent method prefixing (28/30 with `genie*`); `GenieSpace` opaque term |
| 11 | settings | 34 | Post-consolidation v2 surface; acronym soup (`Csp`/`Esm`/`Llm`/`Dcp`); `*Message` wrapper sprawl |
| 12 | schemas | 33 | `_OptionsEntry`/`_PropertiesEntry`; cross-package SecurableType collisions; vs `systemschemas` |
| 13 | marketplaces | 32 | `Listing`/`ExchangeListing`/`ListingSummary`/`ListingDetail` overlap |
| 14 | globalinitscripts | 31 | Verb-as-noun requests; proto suffix |
| 15 | modelregistry | 30 | Workspace vs UC duplicate (`registeredmodels`); MLflow vocabulary |
| 16 | apps | 30 | `App` vs `Application` vocabularies; `AppResourceApp_AppPermission` triple-tautology; `*Proto` suffix |
| 17 | tables | 28 | `TableInfo` vs `TableSummary`; cross-package `Dependency` family duplication |
| 18 | postgres | 28 | Quad-nested `SyncedTable_*` shapes; cross-package duplicate of `database` |
| 19 | modelserving | 28 | `InferenceEndpoint` vs `Endpoint` vs `serving-endpoints` terminology |
| 20 | policyfamilies | 27 | "Family" + "Policy Family" mixed; underscored enums |
| 21 | metastores | 25 | Structural duplicate of `MetastoreInfo`; `UpdateMetastoreRequest` four name-like fields |
| 22 | experiments | 25 | Single-word top-level types (`Run`, `Metric`, `Experiment`) |
| 23 | accessmanagement | 25 | Permissions/grants/rule-sets fragmentation; absorbed account access control |
| 24 | clusterpolicies | 24 | Verb-as-noun requests; `Family` vocabulary mismatch with `policyfamilies` |
| 25 | registeredmodels | 23 | Cross-package overlap with `modelregistry`; `Info`-suffix entities |
| 26 | credentials | 22 | UC vs auth duplicate; `Accounts*` family |
| 27 | queries | 20 | Three-package overlap with `queryhistory`/`statementexecution` |
| 28 | clusters | 20 | 150-member `TerminationCode` brand-value casing |
| 29 | database | 19 | Package name overlaps `postgres`; deep proto nesting |
| 30 | bundle | 18 | Generic package name (`bundle`) |
| 31 | alerts | 18 | Mixed v1/v2 |
| 32 | commandexecution | 17 | Three resources (Command/Context/Cluster) mixed; verb collision (`destroy`/`delete`) |
| 33 | usagepolicy | 16 | 1:1 clone of `budgetpolicy` |
| 34 | rfa | 16 | 3-letter cryptic package name |
| 35 | modelservingquery | 16 | `QueryEndpointInput` has 7 mutually-exclusive input fields, no oneof |
| 36 | forecasting | 16 | Generic-named `Waiter` API; cross-package overlap with `experiments` |
| 37 | budgets | 16 | Budget vs `budgetpolicy` duplication |
| 38 | repos | 15 | "Repos" legacy term; product is "Git folders" |
| 39 | featurestore | 15 | Cross-package duplicates with `onlinetables` (`DeleteOnlineTableRequest`) |
| 40 | dataquality | 15 | `ListMonitorRequest` singular for list of monitors |
| 41 | clusterlibraries | 15 | `Library.lib` field; "Full" suffix without "Partial" counterpart |
| 42 | vectorsearch | 14 | `Endpoint*` and `VectorIndex*` overlap |
| 43 | lakeview | 14 | Old codename (rebrand to "AI/BI Dashboards") |
| 44 | iam | 14 | `*Proxy` method duplicates; `State`/`Entitlement` generic enums |
| 45 | connections | 14 | `UNKNOWN_*` sentinels; `ConnectionType` value casing inconsistencies |
| 46 | supervisoragents | 13 | Generic `SupervisorAgent`; `Tool` bare type for 14-arm union |
| 47 | secretsuc | 13 | `uc` cryptic suffix; collides with `secrets` |
| 48 | queryhistory | 13 | Vague `Query` types; cross-package overlap with `queries` |
| 49 | logdelivery | 13 | Renamed; legacy long name fixed |
| 50 | externalmetadata | 13 | `SystemType` casing; brand-value casing (`POWER_BI`, `STREAM_NATIVE`); `V2` mid-position |
| 51 | gitcredentials | 12 | Three "Credentials" packages with different meanings |
| 52 | files | 12 | `Read`/`Move`/`Put`/`Delete` legacy DBFS verb-as-noun residue |
| 53 | usagedashboards | 11 | Vague type names |
| 54 | tagpolicies | 11 | Three sibling tag packages with overlapping vocab |
| 55 | tagassignments | 11 | Three-package tag split |
| 56 | secrets | 11 | Mutation-verb inconsistency (`Put`/`Create`/`Delete`) |
| 57 | knowledgeassistants | 11 | Generic `KnowledgeAssistant`; bare `Tool`/`Resource` type names |
| 58 | workspaceobjects | 10 | Filesystem scope clarified by rename |
| 59 | tokens | 10 | Cross-package duplicate of `tokenmanagement` |
| 60 | scim | 10 | Account-tier SCIM 2.0 user/group provisioning |
| 61 | environments | 10 | `Environment` generic name |
| 62 | entitytagassignments | 10 | `EntityTagAssignment` vs `TagAssignment` cross-package collision |
| 63 | customllms | 10 | `Llm` cryptic-acronym usage throughout |
| 64 | grants | 9 | Verb-phrase request types |
| 65 | externallocations | 9 | Cross-cloud queue type naming (`AwsSqsQueue`/`AzureQueueStorage`/`GcpPubsub`) |
| 66 | externallineage | 9 | `Direction_LineageDirection`; `tpe` typo |
| 67 | disasterrecovery | 9 | `FailoverFailoverGroupRequest` stutter |
| 68 | cleanrooms | 9 | `*Handler` suffix proto-leak; misleading `accessRestricted` enum |
| 69 | volumes | 8 | Verb-as-noun requests |
| 70 | tokenmanagement | 8 | Overlap with `tokens`; duplicate `AutoscopeState` enum |
| 71 | systemschemas | 8 | Sibling-package collision with `schemas` |
| 72 | notificationdestinations | 8 | `Config`/`config` self-reference; `DestinationType` vague enum |
| 73 | billableusagedownload | 8 | Verb in package name (`download`) |
| 74 | workspacebindings | 7 | Bare verb requests |
| 75 | budgetpolicy | 7 | Sibling clone in `usagepolicy` |
| 76 | abacpolicies | 7 | `PolicyInfo`; `MatchColumn` verb-as-noun |
| 77 | resourcequotas | 6 | Vague type names |
| 78 | artifactallowlists | 6 | Vague type names |
| 79 | sharing | 5 | Account-tier Delta Sharing provider config |
| 80 | workspaces | 4 | Residue after `*Public*Request` regen fixes |
| 81 | storageconfigurations | 4 | Sparse account-tier residue |
| 82 | networking | 4 | Residue; ~40 active `CustomerFacing*` identifiers not yet flagged |
| 83 | authentication | 4 | Account-tier token federation policies |
| 84 | oauth | 3 | OAuth Custom + Published app integrations consolidated |
| 85 | dataclassification | 2 | Tag-domain overlap |
| 86 | keyconfigurations | 1 | `ListCustomerManagedKeyRequest` singular residue |
| 87 | onlinetables | 0 | No active findings after the 2026-05-26 prune |
| — | **Total** | **1,598** | Across all 87 active audits |

### Retired audits — historical reference

The 24 audit files for packages retired in the 2026-05-20 or 2026-05-22
regen were **deleted on 2026-05-26** (see Prune note 8, step 3). The
audit directory now contains exactly 87 per-package files plus this
summary. The table below is preserved as a historical reference of which
packages were retired and where their findings went.

| Retired audit (file deleted) | Successor (where applicable) |
|---|---|
| `accountaccesscontrol` | merged into `accessmanagement` |
| `accountaccesscontrolproxy` | removed (proxy package retired) |
| `accountsettings` | merged into `settings` |
| `cleanroomassets` | merged into `cleanrooms` |
| `cleanroomautoapprovalrules` | merged into `cleanrooms` |
| `cleanroomtaskruns` | merged into `cleanrooms` |
| `endpoints` | merged into `vectorsearch` |
| `indexes` | merged into `vectorsearch` |
| `logdeliveryconfigurations` | renamed to `logdelivery` |
| `materializedfeatures` | merged into `features` |
| `modelservingdebug` | merged into `modelserving` |
| `modelservingmanagement` | merged into `modelserving` |
| `oauthcustomappintegration` | merged into `oauth` |
| `oauthpublishedapp` | merged into `oauth` |
| `permissions` | renamed to `accessmanagement` |
| `qualitymonitor` | deprecated; replaced by `dataquality` |
| `qualitymonitors` | deprecated; replaced by `dataquality` |
| `queryexecution` | removed outright |
| `serviceprincipalsecrets` | removed outright |
| `serviceprincipalsecretsproxy` | removed outright (deleted before 2026-05-26) |
| `workspace` | renamed to `workspaceobjects` |
| `workspaceassignment` | merged into `accessmanagement` |
| `workspaceconf` | merged into `settings` |
| `workspacesettings` | merged into `settings` |

---

## 7. Generator-level recommendations

The previous §§8.1–8.6 recommendations have all been retired:

- The enum-name-prefix recommendation (former §8.1) is withdrawn — see prune
  note 5 (TS member names mirror the wire identifier intentionally).
- The `Info`/`Spec`/`Details` suffix recommendation (former §8.2) is an
  API-team decision, not a generator template change. Field-side instances
  are out of scope per the 2026-05-26 field-rename prune; type-side
  instances remain cataloged in Theme 1 above.
- The acronym-casing policy recommendation (former §8.3) is dropped at the
  generator level; the inconsistencies are still cataloged in §4 as an
  observational reference.
- The `Client` rename recommendation (former §8.4) is a product decision,
  not a generator concern.
- The `Request` suffix recommendation (former §8.5) is **Done**: every
  request DTO is now emitted with a `Request` suffix.
- The strip-package-name-prefix recommendation (former §8.6) is **withdrawn**
  per prune-pass 7 (2026-05-22): the package-name prefix is now considered
  intentional. Neither a generator change nor an API-team rename is planned.

### 7.1 Surface deprecations as `@deprecated` JSDoc tags (deferred)

Fields whose JSDoc text says "deprecated" in prose but does not carry the
`@deprecated` tag (so IDEs do not strike them through). This is a
doc-only template change; it is out of the current naming-audit corpus
per the 2026-05-26 doc-change prune ("those can be anytime"). Retained
here as a follow-up note rather than an open finding.

---

## 8. Generator-only recommendations

The following recommendations are template-level fixes that the
generator emits identically across every package. Rather than carry the
same finding in 87 per-package audits, each rule is recorded once here.
Each item names the rule, why it is generator-only, the approximate
package count it appeared in before promotion, and an illustrative
example.

### 8.1 Drop the duplicate `list*Iter()` paginator method

**Rule:** Drop the duplicate `list*Iter()` paginator method. Make
`list*()` return `AsyncIterable<T>` natively and add a `.firstPage()`
escape hatch for callers who need the raw page response. Modeled on
Octokit, Azure SDK, AWS SDK v3.

**Why it's generator-only:** The duplicate-method pattern is emitted by
every generated package; the fix is one template change, not per-package
work.

**Approximate package count where it appeared before pruning:** ~57/87
packages (every package that has a paginating list endpoint).

**Illustrative example:** `listCatalogsIter` in `catalogs/v1/client.ts`
(and parallel methods in `vectorsearch`, `warehouses`, `jobs`, etc.).

### 8.2 Strip proto-architectural-tier markers from the public TS surface

**Rule:** When emitting a public TS identifier on the exported surface,
strip any mid-position or suffix token whose only purpose is to
disambiguate proto/service tiers on the server. The closed set is:
`Public`, `Internal`, `Proto`, `Service` (when mid-position and not the
domain word), `Backend`, `Manager`, `Handler`, `Impl`, `Rpc`, `Grpc`,
`Wrapper`, `CustomerFacing`, and mid-position version markers like
`V2`/`V3`.

JSDoc banner comments are out of scope per the 2026-05-26 doc-change
prune; SDK-internal identifiers (`utils.ts` schema helpers, etc.) are
out of scope per the 2026-05-26 SDK-internal prune. The rule covers
the public exported surface only.

**Why it's generator-only:** The TS SDK exports exactly one tier
(the public one); these qualifiers exist solely to navigate the
proto definition and have no caller-side meaning. The same template
emits them across every account-tier package, so a single template
fix replaces hundreds of per-package findings.

**Status (2026-05-26):** The `*Public*Request` sub-pattern has shipped
across every account-tier package via the 2026-05-22 generator regen.
This is a retroactive validation of the rule. The rule remains open
because the following public-surface instances survive:

- `CustomerFacing*` qualifier is **still emitted** in `networking`
  (40+ active identifiers in `model.ts`, e.g.
  `CustomerFacingIngressNetworkPolicy`, `CustomerFacingVpcEndpointUseCase`).
  Not yet flagged in the rescan — should land in a follow-up pass.
- `*Proto` suffix survives on a handful of public types:
  `TriggerStateProto` (`jobs`), `DatabricksServiceExceptionProto`
  (`apps`), `DatabricksServiceExceptionWithDetailsProto` (`apps`).
- `*Service*` mid-position infix in `statementexecution`
  (`ServiceErrorCode` / `ServiceError`).
- `*Handler` suffix in `cleanrooms/client.ts` on
  `listCleanRoomNotebookTaskRunsHandler` and its `*Iter` companion.
- Mid-position `V<N>` in `jobs` (`RunLifecycleStateV2`).

**Approximate package count where it appears today:** ~8/87 packages
on the exported surface.

**Illustrative example (pre-regen):**
`CreateNetworkConnectivityConfigPublicRequest` →
`CreateNetworkConnectivityConfigRequest`. The 2026-05-22 regen
shipped this rename; the remaining gap is the `CustomerFacing*`
qualifier and the `*Proto`/`*Service*`/`*Handler`/`V<N>` tails.

---

## Appendix: Categories (from the per-package audits)

The audits used a shared 20-category rubric. Several categories have been
retired as cross-cutting themes via prune passes: Category 2 "Redundant
enum prefix" (prune note 5), Category 11 "Empty / trivial wrapper types"
(prune note 1), and Category 4 "Underscores in TS identifiers" (prune
note 4). A new category was added in the 2026-05-20 proto-architectural-leak
scan (audit-pass note 7): "Proto-architectural leak" — mid-position
proto/service-tier infixes; the 2026-05-22 regen moved most of its
`*Public*Request` cases to `Fixed`.

The 2026-05-26 prune pass narrowed the rubric significantly:

- **Category 15 "Generic field names losing meaning"** and **Category 19
  "Underspecified IDs"** are now out of scope — both boil down to field
  renames (field-rename prune).
- **Category 14 "Go / Java-style names"** field-name instances (`req`,
  `resp`, local var names) are out of scope — they are SDK-internal
  identifiers (SDK-internal prune).
- **Category 16 "Field contradicting type domain"** is significantly
  reduced — field-side instances are out (field-rename prune); only
  type-name-vs-content contradictions remain (e.g.
  `ServedModel.servedEntities`).
- JSDoc-only findings (banner comments, "deprecated in prose without
  @deprecated tag") are out of scope across all categories
  (doc-change prune).

The most-cited remaining categories on the type-level surface across
all 87 active audits:

| # | Category | Surviving on type level |
|---|---|---|
| 1 | Vague / generic names (type level) | ~80 |
| 6 | Misleading names (type level) | ~75 |
| 12 | Duplicate concepts (cross-package, type-level) | ~70 |
| 20 | Type-suffix tautology | ~60 |
| 17 | Inconsistent action verbs (method names) | ~50 |
| 7 | Overly verbose type names | ~50 |
| 8 | Redundant suffix (`Info`, `Spec`, `Details`) | ~45 |
| 9 | Singular/plural mismatches (type level) | ~40 |
| 5 | Cryptic abbreviations (in type names) | ~35 |
| 3 | Acronym casing (type level, post-2026-05-21 acronym renames) | ~30 |
| 13 | Verb-tense inconsistency | ~25 |
| 18 | Long enum values | ~25 |
| Proto | Proto-architectural leak (`*Proto`/`*Handler`/`*Service*`/`*CustomerFacing*`) | ~8 |
