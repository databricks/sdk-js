# Naming Audit: tagpolicies

**Path:** `packages/tagpolicies/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level governed-tag definitions. A `TagPolicy` declares a `tagKey`, an allowed set of `values`, and an optional `id`/timestamps so that a tag becomes "governed" across the account. Sister of `tagassignments` (apps/dashboards/geniespaces/notebooks K/V tags) and `entitytagassignments` (Unity Catalog K/V tags). The HTTP surface is `/api/2.1/tag-policies`, with the five standard verbs (create/get/list/update/delete) keyed by `tagKey`.
**Total weird names flagged:** 2

## Summary
| Severity | Count |
| --- | --- |
| High | 2 |

## High severity

### 1. `TagPolicy` exposes the wire-side term instead of the domain term — `src/v1/model.ts:36`
- **Why weird:** The primary type is named `TagPolicy`, but the JSDoc on every client method talks about "governed tags" (`client.ts:67,97,120,149,204`). "Governed tag" is the canonical domain term; "tag policy" is the wire/proto-side term that mirrors the `/api/2.1/tag-policies` path. The SDK should expose the domain term, not the wire-side noun.
- **Category:** 14 (Go-style — Go SDK keeps the wire-side noun; TS users would benefit from the domain term).
- **Suggested name:** `GovernedTag` (matches domain language used throughout the JSDoc).
- **Rationale:** The user-facing concept is "this tag is governed", not "this tag has a policy attached". Cross-SDK consistency vs. domain readability trade-off.

### 2. `tagKey` field is `string | undefined` on `DeleteTagPolicyRequest` / `GetTagPolicyRequest` — `src/v1/model.ts:13,17`
- **Why weird:** `DeleteTagPolicyRequest.tagKey` and `GetTagPolicyRequest.tagKey` are both `string | undefined`. The URL is built as `${host}/api/2.1/tag-policies/${req.tagKey ?? ''}` (`client.ts:103,126`) — if `tagKey` is undefined, the path becomes `/tag-policies/` (trailing slash, empty key). That is a guaranteed 404 (or worse, a list-style request). The field is *required* in any meaningful call but typed optional. Sister `EntityTagAssignment` requests have the same problem (docs say "Required" but type is `?`).
- **Category:** 6 (misleading — type says optional, semantics says required), 19 (underspecified ID — what should `tagKey` look like? Constraints? Encoding?).
- **Suggested name:** Keep `tagKey`; make non-optional (`tagKey: string`) on get/delete/update. Add JSDoc describing valid keys.
- **Rationale:** Optional path parameters in REST clients are a generator anti-pattern. Honest required-ness should travel through the type, not through a `?? ''` fallback that produces a malformed URL.
