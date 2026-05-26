# Naming Audit: tagpolicies

**Path:** `packages/tagpolicies/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level governed-tag definitions. A `TagPolicy` declares a `tagKey`, an allowed set of `values`, and an optional `id`/timestamps so that a tag becomes "governed" across the account. Sister of `tagassignments` (apps/dashboards/geniespaces/notebooks K/V tags) and `entitytagassignments` (Unity Catalog K/V tags). The HTTP surface is `/api/2.1/tag-policies`, with the five standard verbs (create/get/list/update/delete) keyed by `tagKey`.
**Total weird names flagged:** 11

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 2 |
| Low | 1 |
| Observation | 4 |

## High severity

### 1. Three sister packages (`tagpolicies`, `tagassignments`, `entitytagassignments`) split the noun "tag" — package directory name
- **Why weird:** Three sibling packages each carry one slice of the "tag" domain — definitions (this package), assignments to platform entities (`tagassignments`), assignments to Unity Catalog entities (`entitytagassignments`) — and each ships its own `Client` class, its own primary type, and its own `tagKey` field. A user who wants to "manage tags" must import three packages and alias three `Client`s. The split mirrors backend RPC groupings, not a user mental model.
- **Category:** 12 (duplicate concept split across three packages), 1 (`tag*` as a package-name fragment is vague — which slice of tags?).
- **Suggested name:** Merge into a single `tags` (or `taxonomy`) package with sub-namespaces `tags.policies`, `tags.assignments.platform`, `tags.assignments.uc`. As a smaller fix, rename to `governedtags` (this package) and `governedtagvalues` (or similar) to make the role explicit.
- **Rationale:** Three `Client`s in three packages collide on combined imports. The user-facing surface should follow the user mental model ("I want to manage tags"), not the wire-side `/api/2.1/tag-policies` vs. `/api/2.0/tag-assignments` vs. `/api/2.1/unity-catalog/entity-tag-assignments` partition. Worth flagging as a generator-level structural concern.

### 2. `TagPolicy` exposes the wire-side term instead of the domain term — `src/v1/model.ts:36`
- **Why weird:** The primary type is named `TagPolicy`, but the JSDoc on every client method talks about "governed tags" (`client.ts:66,92,111,136,187`). "Governed tag" is the canonical domain term; "tag policy" is the wire/proto-side term that mirrors the `/api/2.1/tag-policies` path. The SDK should expose the domain term, not the wire-side noun.
- **Category:** 14 (Go-style — Go SDK keeps the wire-side noun; TS users would benefit from the domain term).
- **Suggested name:** `GovernedTag` (matches domain language used throughout the JSDoc).
- **Rationale:** The user-facing concept is "this tag is governed", not "this tag has a policy attached". Cross-SDK consistency vs. domain readability trade-off.

### 3. `Client` class — `src/v1/client.ts:41`
- **Why weird:** A class literally named `Client` at the top level of the package's public API, re-exported through `index.ts:3` as just `Client`. The sister packages (`tagassignments`, `entitytagassignments`) ship their own `Client` class with the same name. Three `Client` classes in three sister packages, plus this `Client` in the rest of the SDK's ~70 other packages.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name), 12 (duplicate concept across sister packages and the entire SDK).
- **Suggested name:** `TagPoliciesClient` (matches the package name) or `GovernedTagsClient` (matches domain language).
- **Rationale:** Three sister packages with three `Client`s will collide on combined imports and force aliasing on every co-use (`import {Client as TagPoliciesClient} from '@databricks/sdk-tagpolicies'`). Generator-level concern.

### 4. `tagKey` field is `string | undefined` on `DeleteTagPolicyRequest` / `GetTagPolicyRequest` — `src/v1/model.ts:13,17`
- **Why weird:** `DeleteTagPolicyRequest.tagKey` and `GetTagPolicyRequest.tagKey` are both `string | undefined`. The URL is built as `${this.host}/api/2.1/tag-policies/${req.tagKey ?? ''}` (`client.ts:97,116`) — if `tagKey` is undefined, the path becomes `/tag-policies/` (trailing slash, empty key). That is a guaranteed 404 (or worse, a list-style request). The field is *required* in any meaningful call but typed optional. Sister `EntityTagAssignment` requests have the same problem (docs say "Required" but type is `?`).
- **Category:** 6 (misleading — type says optional, semantics says required), 19 (underspecified ID — what should `tagKey` look like? Constraints? Encoding?).
- **Suggested name:** Keep `tagKey`; make non-optional (`tagKey: string`) on get/delete/update. Add JSDoc describing valid keys.
- **Rationale:** Optional path parameters in REST clients are a generator anti-pattern. Honest required-ness should travel through the type, not through a `?? ''` fallback that produces a malformed URL.

## Medium severity

### 5. `ListTagPoliciesRequest` (plural) vs. `TagPolicy` (singular) — `src/v1/model.ts:20` vs. `model.ts:36`
- **Why weird:** Plural only on list endpoint; singular elsewhere. The list response is `ListTagPoliciesResponse` (plural). The wire path is `/tag-policies` (plural). The convention is consistent with the Go SDK, but worth flagging that the resource name on the wire is plural while the item type is singular.
- **Category:** 9 (singular/plural mismatch — present and intentional, but inconsistent vocabulary within one type family).
- **Suggested name:** Keep as is (cross-SDK convention). Listed for completeness under rule 9.
- **Rationale:** Same as in `entitytagassignments` audit — flagged because rule 9 demands it.

### 6. Create/update wrap the subject in a body field while the list response also wraps in an array field — `src/v1/model.ts:9,32,48`
- **Why weird:** `CreateTagPolicyRequest.tagPolicy: TagPolicy` (singular wrapper) and `UpdateTagPolicyRequest.tagPolicy: TagPolicy` (singular wrapper) both put the subject inside a one-field body. `ListTagPoliciesResponse.tagPolicies: TagPolicy[]` does the analogous thing for the response. Each wrapper is a single-field envelope around the actual payload, which means every caller writes `client.create({tagPolicy: {...}})` instead of `client.create({...})`. The envelope is consistent in cardinality (singular/plural matches the type), but it adds a level of indirection on every call.
- **Category:** 17 (inconsistency — request and response both wrap, but callers must remember the wrapper field name on each side).
- **Suggested name:** N/A — the wrapper envelopes are dictated by wire-side proto shape. Flagged as a generator-level consideration.
- **Rationale:** Single-field body envelopes show up across the generated SDK; this package is one instance.

## Low severity

### 7. `pageSize` upper-bound documented in doc, not enforced in type — `src/v1/model.ts:22-25`
- **Why weird:** JSDoc says "The maximum value is 1000; values above 1000 will be coerced down to 1000." but the field is typed `number | undefined`. A caller passing `pageSize: 100000` silently gets clipped to 1000. The constraint travels only via the docstring.
- **Category:** 6 (misleading — type does not match contract).
- **Suggested name:** Keep `pageSize`; consider a branded type or a runtime validator. At minimum, restate the limit clearly.
- **Rationale:** Generator-wide; flagged because docs lie about wire behaviour.

## Observations

### 8. Action verb consistency
The client uses `create`/`get`/`update`/`delete`/`list` — no `fetch`/`retrieve`. Consistent across this package and aligned with sister packages.

### 9. Acronym casing
File uses `HttpRequest`, `HttpResponse`, `HttpCallOptions` (Pascal `Http`), `URLSearchParams` (web standard `URL`), `userAgent` (camelCase). The `Http` vs. `URL` split is the JS-ecosystem norm. No `Id`/`Uri` casing clashes encountered within the file.
- **Category:** 3 (acronym casing — consistent within the file, ecosystem-divergent overall).

### 10. `tagpolicies` lowercase package name
Package directory is `tagpolicies` (single token, no separator), but every type uses `TagPolicy*` and the HTTP path uses `tag-policies`. Same problem as `dataclassification`, `tagassignments`, `entitytagassignments` — SDK-wide convention issue.
- **Category:** 3 (casing inconsistency between directory token, kebab wire path, and Pascal types).

### 11. Domain leakage from sister packages
Three packages — `tagpolicies`, `tagassignments`, `entitytagassignments` — all collide on the noun "tag". Each ships its own `Client`, its own `tag*` types, and its own `tagKey`. Co-import requires extensive aliasing. `tagpolicies` differs in that it defines the *policy* over the tag, while the assignment packages attach a `tagKey` + `tagValue` to entities — but a user can't tell from the name; "tag policies" sounds like it could be policies *for* tag assignments.
- **Category:** 12 (duplicate concept across siblings).

## Domain glossary
- `tag policy` — a governed-tag definition with allowed values.
- `governed tag` — a tag whose key has an active `TagPolicy` (JSDoc on every method mentions this).
- `tag key` — the user-chosen identifier of a tag (e.g., `"environment"`). Doubles as the path-key for the resource (`/tag-policies/{tagKey}`).
- `tag value` — one of the allowed strings for a tag (e.g., `"prod"`, `"dev"`) — wrapped in a `Value` type that has a single `name` field.
- `Terraform documentation` — JSDoc on every method links to the matching `terraform-provider-databricks` page.

## File coverage
- `src/v1/model.ts` (143 lines): read fully.
- `src/v1/client.ts` (224 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (17 lines): read fully.
