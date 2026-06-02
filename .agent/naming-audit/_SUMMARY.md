# Cross-Package Naming Audit — Executive Summary

**Packages audited:** 79 active API packages (every package under `packages/<pkg>/src/<vN>/`). The 2026-06-02 prune pass deleted one more audit file (`oauth` — its sole remaining finding was a wire-field rename, leaving zero findings; see Prune pass 12), down from 80. Per-package audits are strictly limited to packages with live source.
**Total active findings across all 79 active audits:** **712** (down from 791 reported before the 2026-06-02 category-prune pass. Earlier waypoints: 1,372 before the 2026-06-02 combined prune pass; 1,376 before the 2026-06-01 single-variant-union prune; 1,420 before the 2026-06-01 regen rescan; 1,598 before the 2026-05-28 rescan-and-prune pass; 2,891 before the 2026-05-26 cleanup pass; 2,926 before the 2026-05-22 Theme 2 prune; 3,572 before the 2026-05-22 regen + rescan; 3,273 before the 2026-05-20 proto-architectural-leak pass; 5,322 in the original sweep.) The latest pass (Prune pass 13) applied three Workflow-B category prunes (field-ordering / grouping findings, data-type-retype findings, and empty / do-nothing wrapper-deletion findings). Net effect: 791 / 79 → 712 / 79.
**Source files:** `/home/parth.bansal/sdk-js/.agent/naming-audit/<package>.md`
**Last source state:** Rescan on 2026-06-02 against the regenerated generated client (proto-nested `*Request_Response` collapsed to clean `*Response`, the `ApiError` swap, many `number` → `bigint` ID-precision conversions, and package-prefixed client class names; the `bundle`, `usagepolicy`, and `billableusagedownload` packages were removed). Prior baseline: rescan on 2026-06-01 against generator regen #167 ("Update SDK API…") + #168 ("Update SDK to latest State of Generator").

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

> **Prune pass 9 (2026-05-28) — rescan + two prunes + four deletions.**
> Combined removals ~180 findings (1,598 → 1,420). Components, in order:
>
> 1. **Full Workflow-A rescan.** Every source-backed audit was
>    re-validated against the current generated source. Findings whose
>    symbol is gone, was already renamed to the suggested name, or whose
>    concern no longer applies were **deleted outright** (no `## Fixed`
>    sections were created or kept). Many resolved findings were
>    `number` → `bigint` ID-precision conversions that the generator now
>    emits correctly. Line numbers were refreshed in place for findings
>    that are still present.
> 2. **Prune A — generic top-level `Client` class name (DEFERRED).** The
>    "the exported `Client` class is too generic / collides across every
>    package / rename to `<Package>Client`" finding was removed from
>    every package that carried it (~45 packages). The user is deferring
>    this fix (verbatim: "i will fix this later") — it is most likely a
>    single generator-level rename rather than per-package work. It is
>    **not** lost: it is tracked in the "Deferred (user will fix later)"
>    note below so the user can act on it in one place. Example: the
>    now-deleted `dataclassification` package's `Client` would become
>    `DataClassificationClient`.
> 3. **Prune B — acronym casing (category 3) RESOLVED.** Every
>    acronym-casing finding (the "treat acronyms as whole words" rule:
>    `Http`/`HTTP`, `Url`/`URL`, `Id`/`ID`, `Uc`/`UC`, `Api`/`API`,
>    `Sql`/`SQL`, `PyPi`/`PyPI`, etc.) was removed from every package
>    that carried it (~47 packages). The user has resolved acronym
>    casing on the public interface (verbatim: "i have already resolved
>    this from the public interface"), so this theme is closed/retired —
>    see the "Resolved / retired themes" note below.
> 4. **Four audit files deleted.** Each was removed from the corpus:
>    - `iam` — orphan; `packages/iam/` source no longer exists (its
>      domain moved to `accessmanagement`).
>    - `workspaceobjects` — orphan; the `/api/2.0/workspace/` filesystem
>      service was dropped from the public-filtered descriptor.
>    - `dataclassification` — emptied by the two prunes (its only two
>      findings were a `Client`-class item and an acronym-casing item),
>      then deleted as an empty audit.
>    - `onlinetables` — already had zero findings, deleted as an empty
>      audit.
>
> **Deferred → RESOLVED upstream (see Prune pass 10):** the generic
> top-level `Client` class-name rename was deferred here on 2026-05-28
> (user: "i will fix this later"). It has since shipped at the generator
> level — the 2026-06-01 regen (#167/#168) emits package-prefixed client
> classes (`AccessManagementClient`, `FeaturesClient`, `CredentialsClient`,
> `JobsClient`, `WarehousesClient`, …) instead of a bare `Client`. The
> fix is no longer pending; it is recorded as resolved under Prune pass 10.
>
> **Resolved / retired themes:** acronym casing (former Theme 2 / §4 /
> Appendix category 3) is **resolved** — pruned from every package this
> pass after the user fixed acronym casing on the public interface. It is
> retained below only as a historical reference, marked resolved in place.

> **Prune pass 10 (2026-06-01) — regen rescan + three orphan deletions.**
> Net removal 44 findings (1,420 → 1,376). Components, in order:
>
> 1. **Generator regen (#167/#168).** The generated client was regenerated
>    upstream — commit #167 ("Update SDK API…") and commit #168 ("Update
>    SDK to latest State of Generator"). A full Workflow-A rescan ran
>    across every source-backed package.
> 2. **Full Workflow-A rescan.** Every finding was re-validated against the
>    current generated source. Resolved findings were **deleted outright**
>    (no `## Fixed` sections were created or kept), line numbers were
>    refreshed in place, and a few findings were superseded-rewritten.
>    Most packages had line-number corrections only. The rescan dropped
>    **8 findings** inside surviving audits, all where the regen fixed the
>    underlying issue: several `number` → `bigint` 64-bit ID-precision
>    conversions (`jobs`, `metastores`, `registeredmodels`, and
>    experiments-adjacent types), `getMetricHistory` → `listMetricHistory`
>    (`experiments`), `get*` → `list*WorkspacePermissionAssignments` /
>    `listAssignableRoles*` (`accessmanagement`), `getLatestVersions` →
>    `listLatestVersions` (`modelregistry`, superseded-rewritten in place,
>    no net change), and a stale `Call` import (`instancepools`). The
>    per-package net deltas: `jobs` 83 → 79, `experiments` 24 → 23,
>    `accessmanagement` 22 → 21, `instancepools` 61 → 60,
>    `registeredmodels` 21 → 20.
> 3. **Three orphan audit files deleted** (source removed by the regen) —
>    36 findings excluded from the total:
>    - `bundle` — `packages/bundle/` no longer exists.
>    - `usagepolicy` — `packages/usagepolicy/` no longer exists.
>    - `billableusagedownload` — `packages/billableusagedownload/` has no
>      TypeScript source anymore.
>    No surviving audit was emptied this pass, so no additional empty-file
>    deletions were needed.
> 4. **Generic `Client` rename — RESOLVED upstream.** The generic
>    top-level `Client` class-name rename that the 2026-05-28 pass pruned
>    and **deferred** ("i will fix this later", likely generator-level) has
>    now shipped: the regen emits package-prefixed client classes
>    (`AccessManagementClient`, `FeaturesClient`, `CredentialsClient`,
>    `JobsClient`, `WarehousesClient`, …) instead of a bare `Client`. The
>    per-package audits already carry no such finding; the deferred note
>    under Prune pass 9 is updated to mark the fix resolved at the
>    generator level.

> **Prune pass 11 (2026-06-01) — single-variant union flatten retired.**
> Workflow B prune. Pruned the single-variant discriminated-union flatten
> recommendation (flatten `{ $case: 'x'; ... } | undefined` to a bare
> field). Rejected by the user as not forward-compatible — re-introducing
> the union when a second variant is added is a breaking type change.
> Removed from 2 packages (`accessmanagement` `Actor.kind`, `volumes`
> `EncryptionDetails`). Both findings had been filed under the
> proto-architectural-leak / unnecessary-structure category. All other
> `$case`/`oneof` findings were kept: they are multi-variant unions,
> discriminator-name concerns, proto-leak `_Response`/`_Entry`/`_State`
> types, or recommendations to *introduce* a union — none matched the
> rejected "flatten single-variant union" class. No audit was emptied, so
> no files were deleted this pass. Net −2 findings (1,374 → 1,372); the
> headline figure moves from the previously reported 1,376 because
> re-summing the corpus also corrected a stale `featurestore` tally
> (13 in-file, 15 in the old summary).

> **Prune pass 12 (2026-06-02) — regen rescan + six category prunes +
> scaffolding cleanup.** Combined removals 581 findings net (1,372 → 791).
> Components, in order:
>
> 1. **Workflow-A rescan after generator regen.** Every source-backed audit
>    was re-validated against the regenerated client. The regen collapsed
>    the proto-nested `*Request_Response` types into clean `*Response`
>    types, swapped the error type to `ApiError`, converted many `number`
>    fields to `bigint` for 64-bit ID precision, and emitted
>    package-prefixed client class names. The packages `bundle`,
>    `usagepolicy`, and `billableusagedownload` were removed (their audit
>    files had already been deleted in Prune pass 10).
> 2. **Pruned the `ErrorCode`-centralization recommendation class.** Removed
>    every finding recommending that a package stop shipping the large
>    global `ErrorCode` enum locally / move it to a shared core
>    `apierror/codes` package (candidates: `apps`, `credentials`,
>    `environments`, `genie`, `postgres`, `statementexecution`).
> 3. **Pruned the generic-`Operation`-LRO-type recommendation class.**
>    Removed every finding recommending that the top-level `Operation`
>    long-running-operation type be renamed to `<Domain>Operation` or moved
>    to shared core, including the `GetOperationRequest` generic-name angle
>    (candidates: `apps`, `environments`, `forecasting`, `postgres`).
> 4. **Pruned the boolean-shaped-two-value-enum recommendation class.**
>    Removed every finding recommending that a two-value enum whose other
>    value is an absence/`NO_*` sentinel be modeled as a `boolean` (e.g.
>    `accessRestricted?: CleanRoom_AccessRestricted`).
> 5. **Pruned the duplicate-concept / naming-consistency recommendation
>    class.** Removed every finding recommending that generated
>    types/enums/fields modeling the same or a related concept be
>    renamed, consolidated, or disambiguated (e.g. two `Status` enums,
>    `creator` vs `collaborators`, `CleanRoomCollaborator` vs
>    `CollaboratorJobRunInfo`).
> 6. **Stripped non-finding scaffolding sections.** Removed the
>    `## Inventory`, `## File coverage`, `## Domain glossary`,
>    `## Comparison` / cross-audit tables, priority-order lists, file
>    indexes, and scope-note preambles from every audit, keeping only the
>    metadata, the summary table, and the findings.
> 7. **Pruned documentation-only findings.** Removed every finding whose
>    fix is JSDoc/comment content, a soft-deprecation note needing the
>    `@deprecated` tag, or a doc-markup leak — anything that can be changed
>    at any time without a backward-incompatible change (e.g.
>    `agentArtifactPath` doc wording).
> 8. **Removed empty `_None._` section stubs throughout.** Where a prior
>    prune had emptied a section, the leftover header + `_None._` line was
>    deleted and any index/summary table that referenced it was reconciled.
> 9. **Pruned wire-identifier-rename findings.** Removed every finding whose
>    core fix renames a JSON field/property name or an enum member value.
>    KEPT type/interface/class renames, method-name fixes, and `string` →
>    enum retyping.
>
> **Net effect: 1,372 / 80 → 791 / 79.** The `oauth.md` audit was deleted
> because its sole remaining finding was a wire-field rename, which the
> wire-identifier-rename prune removed, leaving the file with zero findings.

> **Prune pass 13 (2026-06-02) — three category prunes.** Combined removals
> 79 findings net (791 → 712). Three Workflow-B category prunes were applied,
> in order:
>
> 1. **Pruned the field-ordering / grouping recommendation class** (category
>    17 "reorder fields so related fields sit adjacent"). Removed every
>    finding whose only fix is cosmetic source-order — reordering fields in
>    a type so related fields sit next to each other. Source-order has no
>    effect on the public contract or the wire format.
> 2. **Pruned the data-type-retype recommendation class.** Removed every
>    finding whose fix retypes a field's primitive type: a `string` that
>    should be an enum/union, a `number` that should be a `Date` or
>    `bigint`, or a `string` that should be a branded/opaque type. This
>    **reverses the earlier keep-`string` → enum stance** recorded in
>    Prune pass 12 (the wire-identifier-rename prune had explicitly KEPT
>    `string` → enum retyping). KEPT all structural findings — optionality,
>    cardinality, discriminated unions, and non-empty wrapper reshape — and
>    all renames.
> 3. **Pruned the empty / do-nothing wrapper-deletion recommendation class.**
>    Removed every finding recommending that an EMPTY interface or a
>    proto-namespace-anchor wrapper be deleted. Empty messages are kept for
>    forward-compatibility: adding a field later is a non-breaking change for
>    a wrapper type but a breaking change if the response was previously
>    `void`. Note: proto MAP-ENTRY types (`*_Entry` = `{ key, value }` for
>    `map<K,V>` fields) are KEPT — they are non-empty wrappers, not
>    do-nothing anchors. The `catalogs` (6) and `features` (1) map-entry
>    findings were briefly over-removed in this pass and then restored.
>
> **Net effect: 791 / 79 → 712 / 79.** No audit was emptied, so no files
> were deleted this pass; the package count holds at 79.

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

The 79 active packages are a 1:1 port of `databricks/sdk-go`, so most defects
flow from Go/protobuf idioms that do not translate to TypeScript. Idiomatic
TS SDKs (AWS, Azure, Stripe, Octokit) deliberately diverge from their wire
formats; the Databricks JS SDK currently does not.

---

## 1. Top cross-cutting themes

Ranked by approximate package incidence. Each theme is a generator-level
defect — one template change fixes most of the 79 active packages.

The table below tallies the theme tags carried by the 79 per-package audits,
counting the number of packages each tag appears in (a package is counted
once per tag regardless of how many findings carry it). The curated narrative
themes (Theme 1–4) follow.

| Theme | Packages |
|---|---|
| Type-shape / cardinality (unions, optionality, wrappers) | 48 |
| Method / operation naming | 47 |
| Vague / generic type name | 38 |
| Redundant `*Info`/`*Details`/`*Spec` type suffix | 36 |
| Misleading type name | 32 |
| Proto `Foo_Bar` type-name leak (incl. map-entry types) | 21 |
| Architectural leak (`Public`/`Proxy`/`Handler`) | 18 |
| `*Request`/`*Response` envelope rename | 18 |
| Package name | 11 |

### Theme 1. `Info` (and other vague) suffix on the canonical entity — ~30/79 packages (shrunk by the 2026-05-26 field-rename prune)

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
  `TableInfo`, `FunctionInfo`, `ConnectionInfo`, `VolumeInfo`.

Same problem with other vague suffixes (type-side only after the prune):
- `*Spec` / `*Details` / `*Config` / `*Status` / `*Data` / `*Metadata` used inconsistently — sometimes for the entity, sometimes for a sub-property, sometimes for both. `apps.ApplicationStatus` and `App.appStatus` (the field is no longer flagged but the type-name divergence remains).

**Generator fix:** Strip the `Info` suffix when the type is the canonical
domain entity. (Heuristic: if `<Foo>Info` is the only `<Foo>*` type that
isn't a request/response, drop `Info`.) Same for redundant `Options`/`Spec`
suffixes on tagged-union arms when the parent has a discriminator. Field
renames are out of scope per user direction (would deviate the SDK from
the underlying API).

### Theme 2. Inconsistent acronym casing across the SDK — RETIRED (RESOLVED 2026-05-28)

> **Status (2026-05-28): RESOLVED — theme retired.** The user has
> resolved acronym casing on the public interface (verbatim: "i have
> already resolved this from the public interface"). Every
> acronym-casing finding (the "treat acronyms as whole words" rule:
> `Http`/`HTTP`, `Url`/`URL`, `Id`/`ID`, `Uc`/`UC`, `Api`/`API`,
> `Sql`/`SQL`, `PyPi`/`PyPI`, etc.) was pruned from every per-package
> audit in the 2026-05-28 Prune B pass (~47 packages). This theme is no
> longer an active cross-cutting concern; it is retained here only as a
> historical pointer.
>
> Earlier history: the Google TS Style Guide rule
> (`.agent/rules/typescript.mdc:184`) was adopted on 2026-05-21, the
> hand-written-package renames (105 files: `APIError` → `ApiError`,
> `IDToken` → `IdToken`, `HTTPStatusCode`/`HTTPHeader`/`HTTPBody` →
> `httpStatusCode`/`httpHeader`/`httpBody`, etc.) were applied then, and
> `OAuth*`/`OIDC*` plus JS built-ins (`URLSearchParams`, `JSON.parse`,
> `encodeURIComponent`) were kept under the platform-name exception. The
> 2026-05-28 pass closed out the remaining generated-code surface. The
> observational casing inventory that used to live here is preserved in
> §4 below, marked resolved in place.

### Theme 3. Brand drift / rebrand leakage — ~6/79 packages (stable across the 2026-05-26 prune)

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

### Theme 4. Proto-architectural-leak infixes — ~8/79 packages (further shrunk by the 2026-05-26 doc + SDK-internal prunes; single-variant `oneof`-wrapper sub-case pruned 2026-06-01)

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
- **Single-variant `oneof`-wrapper sub-case pruned (2026-06-01).** A
  structural proto-leak variant — a `oneof` rendered as a single-variant
  discriminated union (`{ $case: 'x'; ... } | undefined`) or a one-field
  wrapper message kept only to carry that union — was previously flagged
  with a recommendation to flatten it to a bare field. The user rejected
  flattening as not forward-compatible (re-introducing the union when a
  second variant is added is a breaking type change), so the two findings
  (`accessmanagement` `Actor.kind`, `volumes` `EncryptionDetails`) were
  removed in Prune pass 11. This sub-case never contributed to the ~8/80
  infix-token incidence above — it is structural, not one of the
  `*Proto`/`*Service*`/`*Handler`/`*CustomerFacing*`/`V<N>` tokens — so the
  package count is unchanged; only the global finding total drops by 2.

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

`settings/v2/model.ts` now carries 30 active findings — the cross-package
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

### 2.4 Identity / IAM (consolidated; `iam` audit deleted 2026-05-28)

- The `iam` package source no longer exists; its domain moved to
  `accessmanagement`, so the `iam` audit file was deleted on 2026-05-28.
  (The former `iam` pain points — `*` + `*Proxy` method pairs, the
  generic top-level `State`/`Entitlement` enums — are no longer tracked.)
- `accessmanagement` is the consolidated umbrella for what used to be
  `permissions`, `accountaccesscontrol`, `accountaccesscontrolproxy`, and
  `workspaceassignment`. Covers object permissions, permission levels,
  rule sets, and workspace assignments in a single import path.

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

### 2.8 Model Registry

| Package | What it really is |
|---|---|
| `modelregistry` | Workspace-level MLflow registry (legacy) |
| `registeredmodels` | Unity Catalog model registry (modern) |

The legacy package has the canonical-sounding name; the UC replacement is
hidden behind a plural noun.

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

### 2.13 Budget policy (was a Budget / Usage-policy 2-way overlap)

| Package | What it really is |
|---|---|
| `budgetpolicy` | `/api/2.0/accounts/{accountId}/budget-policies` |

The 2026-06-01 regen (#167/#168) removed the `usagepolicy` package source,
so its audit was deleted as an orphan (Prune pass 10) and the overlap is
gone. For the record, `usagepolicy/v1/model.ts` had been a 1:1 clone of
`budgetpolicy/v1/model.ts` with the word "Budget" substituted for "Usage" —
the JSDoc on `UsagePolicy.policyId` even admitted it ("same structure as
BudgetPolicy"). The remaining `budgetpolicy` package stands alone.

### 2.14 Workspace (now a single package, was 5)

The 2026-05-22 regen retired three of the previous five
(`workspace` → `workspaceobjects` rename, `workspaceassignment` →
`accessmanagement`, and both `workspaceconf` and `workspacesettings`
retired). The 2026-05-28 pass then deleted the `workspaceobjects` audit
as an orphan: the `/api/2.0/workspace/` filesystem service was dropped
from the public-filtered descriptor, so that source no longer exists. The
remaining audited package in this space is:

| Package | What it really is |
|---|---|
| `workspacebindings` | Securable-to-workspace bindings |

The bare name `workspace` was the most-overloaded; the workspace
filesystem surface (notebooks/folders/files) is no longer part of the
public-filtered SDK.

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
| `dab` | Databricks Asset Bundles | formerly the `bundle` package (removed by the 2026-06-01 regen) | Was spelled out in the package name. |
| `m2m` | Machine-to-Machine | `auth/credentials/m2m.ts` | OAuth grant type. |
| `u2m` | User-to-Machine | `auth/credentials/u2m.ts` | OAuth grant type. |
| `pat` | Personal Access Token | `auth/credentials/pat.ts`, `tokens` package | OAuth-adjacent. |
| `abac` | Attribute-Based Access Control | Package name `abacpolicies` only | Never appears in code or types. |
| `iam` | Identity and Access Management | Former package name (audit deleted 2026-05-28); still appears in JSDoc/identifiers elsewhere | Conventional. |
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

## 4. Acronym-casing inconsistencies — RESOLVED (2026-05-28)

> **Resolved / retired.** The user has fixed acronym casing on the public
> interface (verbatim: "i have already resolved this from the public
> interface"). The corresponding per-package findings (category 3) were
> pruned everywhere in the 2026-05-28 Prune B pass. The table below is
> retained as a historical inventory of the BEFORE state only; it is no
> longer an active set of findings.

The SDK previously had no enforced casing policy. The same acronym appeared in
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

**Outcome (resolved).** The chosen rule is the Google TypeScript Style
Guide `Pascal-then-lower` form (`Url`, `Id`, `Json`, `Sql`), already
documented at `.agent/rules/typescript.mdc`. The hand-written packages
were converged on 2026-05-21 and the user has since resolved the
remaining public-interface casing; the per-package acronym-casing
findings were pruned on 2026-05-28. Wire format unchanged.

---

## 5. Top highest-impact surviving findings

Picked from the post-2026-06-01-rescan corpus. Entries that depended on
field-rename, doc-change, SDK-internal, non-TS, generic-`Client`-class,
or acronym-casing findings (all now out-of-scope or resolved) have been
removed. The generic-`Client`-class issue is now resolved upstream (the
regen emits `<Package>Client` names), and the `bundle` and `usagepolicy`
entries are dropped because the 2026-06-01 regen removed those packages.
The retained entries are structural type-level issues — type names,
reserved-word collisions, brand drift, cross-package duplicate concepts,
and the surviving proto-architectural leaks. Each entry: file + symbol +
the generator pattern it exemplifies.

| # | Package | File:Line | Symbol / Issue | Pattern |
|---|---|---|---|---|
| 1 | `jobs` | `model.ts:3399, 3491, 3852, 3866, 4261, 908, 3875` | `Run` overloaded across 7 shapes (`Run`, `BaseRun`, `RunTask`, `Run_JobLevelParameters`, `RunState`, `RunStatus`, `RunTriggerInfo`). | Vague/duplicate concepts |
| 2 | `jobs` | `model.ts:150, 280, 1464, 1835` | `Format`, `Source`, `Compute`, `Environment` — top-level types collide with JS/TS built-ins and DOM globals. | Reserved-word collision |
| 3 | `jobs` | `model.ts` | `TriggerStateProto` — `Proto` suffix is a wire-format architectural leak that survived the 2026-05-22 regen. | Proto-architectural leak (`Proto` suffix) |
| 4 | `warehouses` | `model.ts:passim` | Every `Endpoint*` type leaks the legacy "SQL Endpoints" brand into the modern "SQL Warehouses" surface. | Brand drift / rebrand leakage |
| 5 | `pipelines` | `model.ts:283, 1091, 1689, 2738, 2879` | `Update` is the noun "pipeline run" — collides with HTTP `update()` verb across 9 types/methods. | Rebrand leakage (DLT → Lakeflow) |
| 6 | `abacpolicies` | `model.ts:137` | `PolicyInfo` — `Info` suffix on the canonical entity. | `Info` suffix |
| 7 | `tables` | `model.ts:849` | `TableSummary` vs `TableInfo` — two near-identical shapes. | Duplicate concept |
| 8 | `apps` | `model.ts:693, 1054` | `ApplicationStatus` on `App` — two vocabularies for one product. | Vocabulary drift |
| 9 | `apps` | `model.ts:606, 962` | `AppResourceApp.AppPermission` — `App` token thrice on the type path. | Redundant prefix |
| 10 | `apps` | `model.ts` | `DatabricksServiceExceptionProto`, `DatabricksServiceExceptionWithDetailsProto` — `Proto` suffix. | Proto-architectural leak (`Proto` suffix) |
| 11 | `genie` | `client.ts:131, 1019, 1038` | 28 of 30 methods prefixed `genie*`, 2 not; one `Trash*` instead of `Delete*`. | Inconsistent action verbs |
| 12 | `commandexecution` | model.ts vs client.ts | `CreateResponse` reused for both `create()` (context id) and `execute()` (command queued). | Type repurposing |
| 13 | `commandexecution` | `client.ts:256` | `client.destroy()` — verb collision; Go SDK uses `delete`. | Verb inconsistency |
| 14 | `commandexecution` | `client.ts:333, 417, 498` | `CancelWaiter`, `CreateWaiter`, `ExecuteWaiter` — too short to convey what they wait for. | Waiter-class genericity |
| 15 | `secrets` | `client.ts:passim` | `Put` for ACLs/secrets, `Create` for scopes, `Delete` for both — inconsistent mutation verbs. | Inconsistent action verbs |
| 16 | `dataquality` | model.ts | `ListMonitorRequest` singular for a list-of-monitors request. | Singular/plural mismatch |
| 17 | `modelserving` | `model.ts:passim` | Package says "model serving"; types say `InferenceEndpoint*`; URL says `serving-endpoints`. | Three names for one noun |
| 18 | `modelserving` | `model.ts:960` | `ServedModel` actually holds non-model entities (`servedEntities: ServedModel[]`). | Type-name contradicts content |
| 19 | — | — | _Removed 2026-06-02: the `oauth` audit was deleted (its sole remaining finding was a wire-field rename, pruned in Prune pass 12)._ | Post-merge consolidation friction (retired) |
| 20 | `accessmanagement` | model.ts | After the `permissions` rename + `workspaceassignment` absorption, type-name overlap with `grants` is still present. | Cross-package fragmentation |
| 21 | `tokens` | `model.ts:13-21` | `AutoscopeState` duplicated verbatim in `tokenmanagement`. | Cross-package duplicate type |
| 22 | `tokens` + `tokenmanagement` | package | Two packages for one PAT resource, with duplicated request/enum shapes. (The shared bare-`Client` export was resolved upstream — the regen now emits `TokensClient` / `TokenManagementClient`.) | Cross-package collisions |
| 23 | — | — | _Removed 2026-06-01: the `usagepolicy` 1:1 clone of `budgetpolicy` is gone — the regen removed the `usagepolicy` package source._ | Whole-package duplicate (retired) |
| 24 | `customllms` | every file | `CustomLlm` — generic name with cryptic-acronym body. | Generic naming + cryptic abbreviation |
| 25 | `supervisoragents` | `model.ts:219` | `SupervisorAgent` — two extremely generic nouns combined. | Generic naming |
| 26 | `supervisoragents` | `model.ts:251` | `Tool` — bare generic for discriminated union over 14 resource kinds. | Stringly-typed sum |
| 27 | `cleanrooms` | `client.ts:662, 704` | `listCleanRoomNotebookTaskRunsHandler` / `listCleanRoomNotebookTaskRunsHandlerIter` — `Handler` suffix proto-leak. | Proto-architectural leak (`Handler` suffix) |
| 28 | `database` + `postgres` | model.ts | Two packages, one product (Lakebase managed Postgres); `SyncedTable`/`DatabaseInstance` duplicated across both. | Duplicate package |
| 29 | `experiments` | `model.ts:219, 712` | `Run`, `Experiment`, `Metric`, `Param`, `LoggedModel` — single-word top-level types. | Generic naming |
| 30 | `repos` | `model.ts:111` | `RepoInfo` — `Info` suffix on the canonical entity; product re-branded to "Git folders". | `Info` suffix + brand drift |
| 31 | `repos` | package + types | "Repos" is legacy; product is "Git folders". | Brand drift |
| 32 | `notificationdestinations` | `model.ts:17, 13` | `Config` top-level interface; `DestinationType` vague enum. | Generic top-level name |
| 33 | `disasterrecovery` | `model.ts:91, 10` | `FailoverFailoverGroupRequest` — token "Failover" twice. | Generator stutter |
| 34 | `marketplaces` | `model.ts:passim` | `Listing` vs `ExchangeListing` vs `ListingSummary` vs `ListingDetail` — four overlapping "listing" shapes. | Duplicate concept |
| 35 | `externalmetadata` | `model.ts:10-32` | `SystemType` enum with 22 values mixing case styles (`POWER_BI`, `STREAM_NATIVE`, `POSTGRESQL`, `MICROSOFT_SQL_SERVER`). | Brand-value casing |
| 36 | `clusters` | `model.ts:175-734` | `TerminationCode` enum with 150+ values mixing case styles. | Brand-value casing |
| 37 | `lakeview` | package | Old codename; product is now "AI/BI Dashboards". | Brand drift |
| 38 | — | — | _Removed 2026-06-01: the bare-`bundle` package-name collision is gone — the regen removed the `bundle` package source._ | Generic package name (retired) |
| 39 | `instancepools` | `model.ts:passim` | Structural duplication of `Create*`/`Edit*`/`*AndStats`. | Duplicate concept |
| 40 | `externallineage` | `model.ts:passim` | `Direction_LineageDirection` stutter. | Generator stutter |
| 41 | `settings` | `model.ts:passim` | Post-consolidation v2 surface carries acronym soup (`Csp*`, `Esm*`, `Llm*`, `Dcp*`) and `BooleanMessage`/`StringMessage` wrappers. | Generic + cryptic |
| 42 | `statementexecution` | `model.ts:passim` | `ServiceErrorCode` / `ServiceError` — `Service` mid-position is a proto/gRPC architectural-layer noun. | Proto-architectural leak (`Service` infix) |
| 43 | `networking` | `model.ts:passim` | 40+ `CustomerFacing*` identifiers remain in active source. Not flagged in the rescan but match generator rule §8.2. | Proto-architectural leak (`CustomerFacing` qualifier) |
| 44 | `marketplaces` | `model.ts:passim` | `Exchange` vs `Listing` vocabulary tension within a single package. | Vocabulary drift |
| 45 | `forecasting` | `client.ts` | `CreateForecastingExperimentWaiter` + Go-style `Waiter.done()` predicate. | Go-style waiter pattern |

---

## 6. By-the-numbers (all 79 active packages, sorted by total findings)

Counts reflect each per-package audit's current declared total (or, for
the audits that use category-numbered sections instead of an H/M/L/Obs
table, that file's own consistent finding count) after the 2026-06-02
category-prune pass (Prune pass 13). The column sums to **712**
(verified: the 79 per-package totals add up to 712 exactly — see the
arithmetic check below the table).

| # | Package | Findings | Top theme |
|---|---|---|---|
| 1 | jobs | 55 | Generic enum/interface names (`Run`, `Format`, `Source`, `Compute`); `Run` overload across 7 shapes; `TriggerStateProto` proto-suffix |
| 2 | warehouses | 50 | Legacy `Endpoint*` brand surviving the SQL-Warehouse rebrand |
| 3 | instancepools | 33 | Structural duplication of `Create*`/`Edit*`/`*AndStats` |
| 4 | instanceprofiles | 28 | Bare verb request types; vague identifiers |
| 5 | features | 24 | Sibling-package fragmentation (now 2 after `materializedfeatures` retirement) |
| 6 | pipelines | 20 | `Update` noun = pipeline run (DLT → Lakeflow rebrand) |
| 7 | settings | 20 | Post-consolidation v2 surface; acronym soup (`Csp`/`Esm`/`Llm`/`Dcp`); `*Message` wrapper sprawl |
| 8 | statementexecution | 20 | `ServiceErrorCode` infix; package name overlaps `commandexecution`/`queries` |
| 9 | genie | 18 | Inconsistent method prefixing (28/30 with `genie*`); `GenieSpace` opaque term |
| 10 | modelregistry | 17 | Workspace vs UC duplicate (`registeredmodels`); MLflow vocabulary |
| 11 | tables | 16 | `TableInfo` vs `TableSummary`; cross-package `Dependency` family duplication |
| 12 | functions | 14 | `function` reserved-word; cryptic single-letter enum variants |
| 13 | marketplaces | 14 | `Listing`/`ExchangeListing`/`ListingSummary`/`ListingDetail` overlap |
| 14 | apps | 13 | `App` vs `Application` vocabularies; `AppResourceApp_AppPermission` triple-tautology; `*Proto` suffix |
| 15 | budgets | 13 | Budget vs `budgetpolicy` duplication |
| 16 | catalogs | 13 | `*_OptionsEntry`/`*_PropertiesEntry`; Create-with-read-only-fields; cross-package SecurableType collisions |
| 17 | accessmanagement | 12 | Permissions/grants/rule-sets fragmentation; absorbed account access control |
| 18 | commandexecution | 12 | Three resources (Command/Context/Cluster) mixed; verb collision (`destroy`/`delete`) |
| 19 | experiments | 12 | Single-word top-level types (`Run`, `Metric`, `Experiment`) |
| 20 | queries | 12 | Three-package overlap with `queryhistory`/`statementexecution` |
| 21 | database | 11 | Package name overlaps `postgres`; deep proto nesting |
| 22 | forecasting | 11 | Generic-named `Waiter` API; cross-package overlap with `experiments` |
| 23 | policyfamilies | 11 | "Family" + "Policy Family" mixed; underscored enums |
| 24 | modelserving | 10 | `InferenceEndpoint` vs `Endpoint` vs `serving-endpoints` terminology |
| 25 | featurestore | 9 | Cross-package duplicate of `database`/online-store surface |
| 26 | rfa | 9 | 3-letter cryptic package name |
| 27 | clusterlibraries | 8 | `Library.lib` field; "Full" suffix without "Partial" counterpart |
| 28 | dataquality | 8 | `ListMonitorRequest` singular for list of monitors |
| 29 | modelservingquery | 8 | `QueryEndpointInput` has 7 mutually-exclusive input fields, no oneof |
| 30 | schemas | 8 | `_OptionsEntry`/`_PropertiesEntry`; cross-package SecurableType collisions; vs `systemschemas` |
| 31 | alerts | 7 | Mixed v1/v2 |
| 32 | logdelivery | 7 | Renamed; legacy long name fixed |
| 33 | metastores | 7 | Structural duplicate of `MetastoreInfo`; `UpdateMetastoreRequest` four name-like fields |
| 34 | usagedashboards | 7 | Vague type names |
| 35 | customllms | 6 | `Llm` cryptic-acronym usage throughout |
| 36 | disasterrecovery | 6 | `FailoverFailoverGroupRequest` stutter |
| 37 | knowledgeassistants | 6 | Generic `KnowledgeAssistant`; bare `Tool`/`Resource` type names |
| 38 | lakeview | 6 | Old codename (rebrand to "AI/BI Dashboards") |
| 39 | registeredmodels | 6 | Cross-package overlap with `modelregistry`; `Info`-suffix entities |
| 40 | repos | 6 | "Repos" legacy term; product is "Git folders" |
| 41 | secretsuc | 6 | `uc` cryptic suffix; collides with `secrets` |
| 42 | connections | 5 | `UNKNOWN_*` sentinels; `ConnectionType` value casing inconsistencies |
| 43 | entitytagassignments | 5 | `EntityTagAssignment` vs `TagAssignment` cross-package collision |
| 44 | notificationdestinations | 5 | `Config`/`config` self-reference; `DestinationType` vague enum |
| 45 | postgres | 5 | Quad-nested `SyncedTable_*` shapes; cross-package duplicate of `database` |
| 46 | scim | 5 | Account-tier SCIM 2.0 user/group provisioning |
| 47 | secrets | 5 | Mutation-verb inconsistency (`Put`/`Create`/`Delete`) |
| 48 | tagassignments | 5 | Three-package tag split |
| 49 | volumes | 5 | Verb-as-noun requests |
| 50 | artifactallowlists | 4 | Vague type names |
| 51 | clusters | 4 | 150-member `TerminationCode` brand-value casing |
| 52 | credentials | 4 | UC vs auth duplicate; `Accounts*` family |
| 53 | externalmetadata | 4 | `SystemType` casing; brand-value casing (`POWER_BI`, `STREAM_NATIVE`); `V2` mid-position |
| 54 | gitcredentials | 4 | Three "Credentials" packages with different meanings |
| 55 | globalinitscripts | 4 | Verb-as-noun requests; proto suffix |
| 56 | networking | 4 | Residue; ~40 active `CustomerFacing*` identifiers not yet flagged |
| 57 | queryhistory | 4 | Vague `Query` types; cross-package overlap with `queries` |
| 58 | resourcequotas | 4 | Vague type names |
| 59 | storageconfigurations | 4 | Sparse account-tier residue |
| 60 | supervisoragents | 4 | Generic `SupervisorAgent`; `Tool` bare type for 14-arm union |
| 61 | systemschemas | 4 | Sibling-package collision with `schemas` |
| 62 | tokenmanagement | 4 | Overlap with `tokens`; duplicate `AutoscopeState` enum |
| 63 | vectorsearch | 4 | `Endpoint*` and `VectorIndex*` overlap |
| 64 | workspaces | 4 | Residue after `*Public*Request` regen fixes |
| 65 | budgetpolicy | 3 | Account budget-policy CRUD (its `usagepolicy` clone was removed by the regen) |
| 66 | cleanrooms | 3 | `*Handler` suffix proto-leak; misleading `accessRestricted` enum |
| 67 | clusterpolicies | 3 | Verb-as-noun requests; `Family` vocabulary mismatch with `policyfamilies` |
| 68 | sharing | 3 | Account-tier Delta Sharing provider config |
| 69 | tagpolicies | 3 | Three sibling tag packages with overlapping vocab |
| 70 | tokens | 3 | Cross-package duplicate of `tokenmanagement` |
| 71 | abacpolicies | 2 | `PolicyInfo`; `MatchColumn` verb-as-noun |
| 72 | environments | 2 | `Environment` generic name |
| 73 | externallineage | 2 | `Direction_LineageDirection`; `tpe` typo |
| 74 | externallocations | 2 | Cross-cloud queue type naming (`AwsSqsQueue`/`AzureQueueStorage`/`GcpPubsub`) |
| 75 | files | 2 | `Read`/`Move`/`Put`/`Delete` legacy DBFS verb-as-noun residue |
| 76 | workspacebindings | 2 | Bare verb requests |
| 77 | authentication | 1 | Account-tier token federation policies |
| 78 | grants | 1 | Verb-phrase request types |
| 79 | keyconfigurations | 1 | `ListCustomerManagedKeyRequest` singular residue |
| — | **Total** | **712** | Across all 79 active audits |

**Arithmetic check.** Summing the 79 per-package totals gives exactly
**712**, matching the grand total. (Spot check: the top 11 packages
55 + 50 + 33 + 28 + 24 + 20 + 20 + 20 + 18 + 17 + 16 = 301; the remaining
68 packages sum to 411; 301 + 411 = 712.) The 79-finding drop from the
previously reported 791 is the 2026-06-02 category-prune pass (Prune
pass 13): three Workflow-B category prunes (field-ordering / grouping
findings, data-type-retype findings — a `string` that should be an
enum/union, a `number` that should be a `Date`/`bigint`, a `string` that
should be branded/opaque — and empty / do-nothing wrapper-deletion
findings). No audit was emptied, so the package count holds at 79.

### Retired audits — historical reference

The 24 audit files for packages retired in the 2026-05-20 or 2026-05-22
regen were **deleted on 2026-05-26** (see Prune note 8, step 3). A further
four audit files were **deleted on 2026-05-28** (see Prune pass 9): `iam`
and `workspaceobjects` (orphaned — source no longer exists),
`dataclassification` (emptied by the two prunes), and `onlinetables`
(already empty). The 2026-06-01 regen then orphaned three more, **deleted
on 2026-06-01** (see Prune pass 10): `bundle`, `usagepolicy`, and
`billableusagedownload` — each lost its source package. The 2026-06-02
combined prune pass (see Prune pass 12) then deleted one more: `oauth`,
whose sole remaining finding was a wire-field rename that the
wire-identifier-rename prune removed, leaving it with zero findings. The
audit directory now contains exactly 79 per-package files plus this
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
| `workspace` | renamed to `workspaceobjects` (audit later deleted 2026-05-28 — see below) |
| `workspaceassignment` | merged into `accessmanagement` |
| `workspaceconf` | merged into `settings` |
| `workspacesettings` | merged into `settings` |
| `iam` | deleted 2026-05-28 (orphan; domain moved to `accessmanagement`) |
| `workspaceobjects` | deleted 2026-05-28 (orphan; `/api/2.0/workspace/` filesystem service dropped from the public-filtered descriptor) |
| `dataclassification` | deleted 2026-05-28 (emptied by the `Client`-class + acronym-casing prunes) |
| `onlinetables` | deleted 2026-05-28 (already empty after the 2026-05-26 prune) |
| `bundle` | deleted 2026-06-01 (orphan; `packages/bundle/` removed by the regen) |
| `usagepolicy` | deleted 2026-06-01 (orphan; `packages/usagepolicy/` removed by the regen) |
| `billableusagedownload` | deleted 2026-06-01 (orphan; no TypeScript source after the regen) |
| `oauth` | deleted 2026-06-02 (emptied — its sole wire-field-rename finding was pruned) |

---

## 7. Generator-level recommendations

The previous §§8.1–8.6 recommendations have all been retired:

- The enum-name-prefix recommendation (former §8.1) is withdrawn — see prune
  note 5 (TS member names mirror the wire identifier intentionally).
- The `Info`/`Spec`/`Details` suffix recommendation (former §8.2) is an
  API-team decision, not a generator template change. Field-side instances
  are out of scope per the 2026-05-26 field-rename prune; type-side
  instances remain cataloged in Theme 1 above.
- The acronym-casing policy recommendation (former §8.3) is **resolved**
  (2026-05-28): the user fixed acronym casing on the public interface, the
  per-package acronym-casing findings were pruned everywhere, and §4 below
  is retained only as a historical reference.
- The `Client` rename recommendation (former §8.4) is **resolved**
  (2026-06-01): deferred on 2026-05-28 (verbatim: "i will fix this
  later"), it shipped at the generator level in the 2026-06-01 regen
  (#167/#168), which now emits package-prefixed client classes
  (`AccessManagementClient`, `FeaturesClient`, `CredentialsClient`,
  `JobsClient`, `WarehousesClient`, …) instead of a bare `Client`. See
  Prune pass 10 above.
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
same finding in 79 per-package audits, each rule is recorded once here.
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

**Approximate package count where it appears today:** ~8/79 packages
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
(prune note 1), Category 4 "Underscores in TS identifiers" (prune note
4), and Category 3 "Acronym casing" (resolved 2026-05-28 — Prune pass 9).
A new category was added in the 2026-05-20 proto-architectural-leak
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

The 2026-05-28 prune pass narrowed the rubric further:

- **Category 3 "Acronym casing"** is **resolved / retired** — the user
  fixed acronym casing on the public interface and the findings were
  pruned from every package.
- The **generic top-level `Client` class-name** finding (a Category 1 /
  12 sub-case) was pruned from every package and deferred by the user on
  2026-05-28; it is now **resolved** upstream — the 2026-06-01 regen
  (#167/#168) emits `<Package>Client` names. See Prune pass 10.

The most-cited remaining categories on the type-level surface across
all 79 active audits:

| # | Category | Surviving on type level |
|---|---|---|
| 1 | Vague / generic names (type level) | ~78 |
| 6 | Misleading names (type level) | ~73 |
| 12 | Duplicate concepts (cross-package, type-level) | ~68 |
| 20 | Type-suffix tautology | ~58 |
| 17 | Inconsistent action verbs (method names) | ~48 |
| 7 | Overly verbose type names | ~48 |
| 8 | Redundant suffix (`Info`, `Spec`, `Details`) | ~44 |
| 9 | Singular/plural mismatches (type level) | ~38 |
| 5 | Cryptic abbreviations (in type names) | ~34 |
| 13 | Verb-tense inconsistency | ~24 |
| 18 | Long enum values | ~24 |
| Proto | Proto-architectural leak (`*Proto`/`*Handler`/`*Service*`/`*CustomerFacing*`) | ~8 |
