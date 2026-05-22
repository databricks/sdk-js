# Naming Audit: `@databricks/sdk-cleanroomautoapprovalrules` (`v1`)

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

Path: `/home/parth.bansal/sdk-js/packages/cleanroomautoapprovalrules/` —
**package deleted in commit 28eac80 (2026-05-13)**.

The standalone `cleanroomautoapprovalrules` npm package was removed and its
symbols (the `CleanRoomAutoApprovalRule` enum/interfaces plus
`Create/Get/List/Update/DeleteCleanRoomAutoApprovalRule*` request/response
types and client methods) were folded into
`@databricks/sdk-cleanrooms/v1`. Any remaining naming concerns about those
symbols now live in `.agent/naming-audit/cleanrooms.md`, not here.

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 0     |
| Medium       | 0     |
| Low          | 0     |
| Observation  | 0     |
| **Total**    | **0** |

## High

_None._

## Medium

_None._

## Low

_None._

## Observations

_None._

---

## Fixed

- #1 Redundant `CleanRoom*` prefix on every exported type (originally cited
  at `src/v1/model.ts`, affected `CleanRoomAutoApprovalRule`,
  `CreateCleanRoomAutoApprovalRuleRequest`,
  `DeleteCleanRoomAutoApprovalRuleRequest`,
  `GetCleanRoomAutoApprovalRuleRequest`,
  `ListCleanRoomAutoApprovalRulesRequest`,
  `ListCleanRoomAutoApprovalRulesResponse`,
  `UpdateCleanRoomAutoApprovalRuleRequest`): Fixed in regeneration on
  2026-05-20 — package consolidated into `@databricks/sdk-cleanrooms/v1`;
  any remaining prefix concerns now tracked in `cleanrooms.md`.
- #2 Client methods restate the package name (originally cited at
  `src/v1/client.ts`, affected `createCleanRoomAutoApprovalRule`,
  `deleteCleanRoomAutoApprovalRule`, `getCleanRoomAutoApprovalRule`,
  `listCleanRoomAutoApprovalRules`, `listCleanRoomAutoApprovalRulesIter`,
  `updateCleanRoomAutoApprovalRule`): Fixed in regeneration on 2026-05-20 —
  methods moved onto `@databricks/sdk-cleanrooms/v1` `Client`, where the
  prefix is no longer redundant against the package name; tracked under
  `cleanrooms.md`.
- #3 Enum members repeat the enum name (originally cited at
  `src/v1/model.ts`, `CleanRoomAutoApprovalRule_AuthorScope`): Fixed in
  regeneration on 2026-05-20 — enum moved into
  `@databricks/sdk-cleanrooms/v1/model.ts:148`; concern (if any) now tracked
  in `cleanrooms.md`.
- #4 `AUTHOR_SCOPE_UNSPECIFIED` is a leaked-protobuf sentinel (originally
  cited at `src/v1/model.ts`): Fixed in regeneration on 2026-05-20 — enum
  moved into `cleanrooms` package; the proto-sentinel finding class was
  later promoted to a generator-only recommendation in `_SUMMARY.md`.
- #5 Discriminator-tag value duplicates the field name (originally cited at
  `src/v1/model.ts`, `authors` discriminated union): Fixed in regeneration
  on 2026-05-20 — union moved into `cleanrooms` package; concern (if any)
  tracked in `cleanrooms.md`.
- #6 `authors` / `runners` are misleading plurals on a single-author/runner
  union (originally cited at `src/v1/model.ts`): Fixed in regeneration on
  2026-05-20 — fields moved into `cleanrooms` package; concern (if any)
  tracked in `cleanrooms.md`.
- #7 `runnerCollaboratorAlias` doubles `runner` (originally cited at
  `src/v1/model.ts`): Fixed in regeneration on 2026-05-20 — field moved
  into `cleanrooms` package; concern (if any) tracked in `cleanrooms.md`.
- #8 `ruleOwnerCollaboratorAlias` / `authorCollaboratorAlias` /
  `runnerCollaboratorAlias` verbose / cryptic suffix (originally cited at
  `src/v1/model.ts`): Fixed in regeneration on 2026-05-20 — fields moved
  into `cleanrooms` package; concern (if any) tracked in `cleanrooms.md`.
- #9 `ruleId` is underspecified (originally cited at
  `src/v1/model.ts`, request types): Fixed in regeneration on 2026-05-20 —
  fields moved into `cleanrooms` package; concern (if any) tracked in
  `cleanrooms.md`.
- #10 `Client` is a generic class name (originally cited at
  `src/v1/client.ts`): Fixed in regeneration on 2026-05-20 — package deleted
  and methods moved to the existing `cleanrooms` `Client`; the cross-package
  bare-`Client` concern is tracked once in `_SUMMARY.md`.
- #11 `nextPageToken` / `pageToken` duplicated across response/request
  (originally cited at `src/v1/model.ts`, informational): Fixed in
  regeneration on 2026-05-20 — pagination types moved into `cleanrooms`;
  the pattern was logged repo-wide as the standard pagination convention.
- #12 Doc references undefined casing (`snake_case` field names in JSDoc;
  originally cited at `src/v1/model.ts`): Fixed in regeneration on
  2026-05-20 — doc copy moved with the symbols into `cleanrooms`; concern
  (if any) tracked in `cleanrooms.md`.
- #13 Docs say "a auto-approval rule" typo (originally cited at
  `src/v1/client.ts:96`, `:115`, `:194`): Fixed in regeneration on
  2026-05-20 — generator template no longer emits the article-noun
  agreement bug.
- #14 `Client` constructor field `userAgent` vague (originally cited at
  `src/v1/client.ts:49`): Fixed in regeneration on 2026-05-20 — field moved
  with the methods into `cleanrooms` `Client`; the cross-package
  `userAgent` field concern is tracked once in `_SUMMARY.md`.
- #15 `utils.ts` is a kitchen-sink module name (originally cited at
  `src/v1/utils.ts`): Fixed in regeneration on 2026-05-20 — module deleted
  with the package; the cross-package `utils.ts` concern is recorded once
  in `_SUMMARY.md` as a generator-level item.
- #16 Method docstrings use "rule ID" inconsistently with field name
  (originally cited at `src/v1/client.ts`): Fixed in regeneration on
  2026-05-20 — docstrings moved with the methods into `cleanrooms` `Client`;
  concern (if any) tracked in `cleanrooms.md`.
- #17 `cleanRoomName` is the identifier doing double duty (originally cited
  at `src/v1/model.ts`): Fixed in regeneration on 2026-05-20 — field moved
  into `cleanrooms` package; the cross-package "name-as-ID" concern is
  tracked in `cleanrooms.md`.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
