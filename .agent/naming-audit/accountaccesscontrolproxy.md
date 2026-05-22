# Naming Audit: accountaccesscontrolproxy

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/accountaccesscontrolproxy/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level access control via rule sets that bind roles
to principals (users, groups, service principals, tag policies), exposed as a
"proxy" variant whose surface area is indistinguishable from the sibling
`accountaccesscontrol` package.
**Total weird names flagged:** 0

---

## Summary table

_None._

---

## High severity (must fix)

_None._

---

## Medium severity (worth pushing back on)

_None._

---

## Low severity (nits)

_None._

---

## Observations (not flags)

- **Package source removed.** As of 2026-05-20, `packages/accountaccesscontrolproxy/src/`
  no longer exists in the tree (only `.turbo/` log artifacts remain under the
  package directory). All findings in this audit refer to symbols that are no
  longer present; they have been moved to the `## Fixed` section below.

---

## Fixed

- #1 package `accountaccesscontrolproxy` (originally cited at (package)): Fixed in regeneration on 2026-05-20 — Package source removed; surface duplicate no longer exists.
- #2 package `accountaccesscontrolproxy` (originally cited at (package)): Fixed in regeneration on 2026-05-20 — Package source removed; long compound name no longer exposed.
- #3 `GetAssignableRolesForResourceRequest` (originally cited at model.ts:5): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #4 `GetAssignableRolesForResourceResponse` (originally cited at model.ts:21): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #5 `Role.name` (originally cited at model.ts:70): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #6 `GetRuleSetRequest.name` (originally cited at model.ts:38): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #7 `GetRuleSetRequest.etag` (originally cited at model.ts:51): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #8 `GetRuleSetRequest` shape (originally cited at model.ts:25): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #9 `GrantRule` (originally cited at model.ts:54): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #10 `GrantRule.principals` (originally cited at model.ts:63): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #11 `GrantRule.role` (originally cited at model.ts:65): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #12 `RuleSet` (originally cited at model.ts:73): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #13 `RuleSet.name` (originally cited at model.ts:75): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #14 `RuleSet.etag` (originally cited at model.ts:85): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #15 `RuleSet.grantRules` (originally cited at model.ts:86): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #16 `RuleSetUpdateRequest` (originally cited at model.ts:89): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #17 `RuleSetUpdateRequest` vs `UpdateRuleSetRequest` (originally cited at model.ts:89, 105): Fixed in regeneration on 2026-05-20 — Both symbols removed with package source.
- #18 `UpdateRuleSetRequest.name` (originally cited at model.ts:109): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #19 `UpdateRuleSetRequest.ruleSet` (originally cited at model.ts:110): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #20 `Client` (originally cited at client.ts:39): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #21 `Client.getAssignableRolesForResource` (originally cited at client.ts:72): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #22 `HttpCallOptions` (originally cited at utils.ts:15): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #23 `executeCall` vs `executeHttpCall` (originally cited at utils.ts:26, 65): Fixed in regeneration on 2026-05-20 — Both symbols removed with package source.
- #24 `flattenQueryParams` (originally cited at utils.ts:123): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.
- #25 `PACKAGE_SEGMENT` (originally cited at client.ts:34): Fixed in regeneration on 2026-05-20 — Symbol removed with package source.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
