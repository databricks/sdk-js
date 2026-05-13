# Naming Audit: tagpolicies

**Path:** `packages/tagpolicies/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level governed-tag definitions. A `TagPolicy` declares a `tagKey`, an allowed set of `values`, and optional `propagationConfig` (with conflict-resolution rules) so that a tag becomes "governed" across the account. Sister of `tagassignments` (apps/dashboards/geniespaces/notebooks K/V tags) and `entitytagassignments` (Unity Catalog K/V tags). The HTTP surface is `/api/2.1/tag-policies`, with the five standard verbs (create/get/list/update/delete) keyed by `tagKey`.
**Total weird names flagged:** 37

## Summary
| Severity | Count |
| --- | --- |
| High | 8 |
| Medium | 13 |
| Low | 11 |
| Observation | 5 |

## High severity

### 1. Three sister packages (`tagpolicies`, `tagassignments`, `entitytagassignments`) split the noun "tag" — package directory name
- **Why weird:** Three sibling packages each carry one slice of the "tag" domain — definitions (this package), assignments to platform entities (`tagassignments`), assignments to Unity Catalog entities (`entitytagassignments`) — and each ships its own `Client` class, its own primary type, and its own `tagKey` field. A user who wants to "manage tags" must import three packages and alias three `Client`s. The split mirrors backend RPC groupings, not a user mental model.
- **Category:** 12 (duplicate concept split across three packages), 1 (`tag*` as a package-name fragment is vague — which slice of tags?).
- **Suggested name:** Merge into a single `tags` (or `taxonomy`) package with sub-namespaces `tags.policies`, `tags.assignments.platform`, `tags.assignments.uc`. As a smaller fix, rename to `governedtags` (this package) and `governedtagvalues` (or similar) to make the role explicit.
- **Rationale:** Three `Client`s in three packages collide on combined imports. The user-facing surface should follow the user mental model ("I want to manage tags"), not the wire-side `/api/2.1/tag-policies` vs. `/api/2.0/tag-assignments` vs. `/api/2.1/unity-catalog/entity-tag-assignments` partition. Worth flagging as a generator-level structural concern.

### 2. `TagPolicy` — `src/v1/model.ts:62`
- **Why weird:** The primary type is "a policy for a tag", which is fine — but the type is keyed by `tagKey` (line 63) and the package is *named* after the tag's policy. Every reference is "the tag policy's tag key", "the tag policy's account ID", "the tag policy's values". The `Tag` prefix on the type is doing the work that the package directory already does. Sister types `TagAssignment` / `EntityTagAssignment` repeat the `Tag` noun identically. The name reads like Go.
- **Category:** 8 (redundant prefix — `Tag` repeats the universal subject of this package), 12 (duplicate concept naming pattern with sister types), 14 (Go-style — Go SDK needs the `Tag` prefix to distinguish from other `Policy` structs in the same Go package; TS module imports already do that disambiguation).
- **Suggested name:** `Policy` (rely on package-import disambiguation), or `GovernedTag` (since "governed" is the term used throughout the JSDoc — `client.ts:66,92,111,136,187`).
- **Rationale:** "Governed tag" is the canonical domain term that appears in every method's docstring; "tag policy" is the wire/proto-side term. SDK should expose the domain term.

### 3. Doubled `Policy` suffix in the conflict-resolution path — `src/v1/model.ts:9,11,13`
- **Why weird:** The outer type is `ConflictResolutionPolicy`, its field is named `policy`, and the only case-payload type is `DefaultValueOverridePolicy`. The token "policy" appears on the outer type, on the field, and on the payload — three uses of "Policy" in one tree to express "use this default when there's a conflict".
- **Category:** 8 (redundant suffix — `Policy` appears on the outer type, on the field, and on the payload), 20 (type-suffix tautology — `Policy` on the field of a `*Policy` of a `*Policy`).
- **Suggested name:** Drop one of the three. For example, rename the outer type to `ConflictResolution`, the field to `strategy`, and the payload to `DefaultValueOverride`.
- **Rationale:** `propagationConfig.conflictResolution.policy.$case === 'defaultValueOverride'` reads as type-noise; reducing the `Policy` repetition makes the path read naturally.

### 4. `Client` class — `src/v1/client.ts:41`
- **Why weird:** A class literally named `Client` at the top level of the package's public API, re-exported through `index.ts:3` as just `Client`. The sister packages (`tagassignments`, `entitytagassignments`) ship their own `Client` class with the same name. Three `Client` classes in three sister packages, plus this `Client` in the rest of the SDK's ~70 other packages.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name), 12 (duplicate concept across sister packages and the entire SDK).
- **Suggested name:** `TagPoliciesClient` (matches the package name) or `GovernedTagsClient` (matches domain language).
- **Rationale:** Three sister packages with three `Client`s will collide on combined imports and force aliasing on every co-use (`import {Client as TagPoliciesClient} from '@databricks/sdk-tagpolicies'`). Generator-level concern.

### 5. Method names `createTagPolicy` / `deleteTagPolicy` / `getTagPolicy` / `listTagPolicies` / `updateTagPolicy` — `src/v1/client.ts:67,93,112,137,188`
- **Why weird:** Every client method repeats the package name in its identifier. On `Client` already scoped by import to this package, `client.createTagPolicy(...)` reads as "package.subject.create.subject" — the noun is doubled. The shorter form `client.create(...)` / `client.list(...)` is what TS users expect when a client is single-purpose. Sister packages do the same.
- **Category:** 7 (overly verbose), 8 (redundant suffix — repeats `TagPolicy` five times when the client only manages `TagPolicy`).
- **Suggested name:** `create`, `delete`, `get`, `list`, `update` (and `listIter`).
- **Rationale:** A client class that ships exactly five methods all named after the same subject is repeating the subject. `TagPoliciesClient.create()` reads better than `client.createTagPolicy()`.

### 6. `tagKey` is both the resource identifier and a field on `TagPolicy` — `src/v1/model.ts:63` and `model.ts:31,35`
- **Why weird:** The thing that uniquely identifies a `TagPolicy` is its `tagKey` (string), but the same type *also* has an `id: string` field (`model.ts:64`). The wire URL is `/api/2.1/tag-policies/{tagKey}` — i.e., the path key is `tagKey`, not `id`. Two identifiers, no JSDoc saying which one is authoritative. Compare to `BudgetPolicy` (`policyId`, `policyName`) which has the same split — same problem.
- **Category:** 1 (vague — which field actually identifies the resource?), 6 (misleading — `id` looks like a primary key, but the URL uses `tagKey`), 19 (underspecified ID — what does `id` mean if the path uses `tagKey`?), 16 (field contradicts type domain).
- **Suggested name:** Document both fields explicitly. `tagKey` is the user-chosen primary key (the tag name itself); `id` is presumably an opaque server-generated handle. Suggest: keep both but JSDoc each, OR collapse to just `tagKey` if `id` is dead.
- **Rationale:** Two unlabeled IDs in a type is a recipe for caller confusion. The SDK should make plain which is the resource key.

### 7. `tagKey` field is `string | undefined` on `DeleteTagPolicyRequest` / `GetTagPolicyRequest` — `src/v1/model.ts:31,35`
- **Why weird:** `DeleteTagPolicyRequest.tagKey` and `GetTagPolicyRequest.tagKey` are both `string | undefined`. The URL is built as `${this.host}/api/2.1/tag-policies/${req.tagKey ?? ''}` (`client.ts:97,116`) — if `tagKey` is undefined, the path becomes `/tag-policies/` (trailing slash, empty key). That is a guaranteed 404 (or worse, a list-style request). The field is *required* in any meaningful call but typed optional. Sister `EntityTagAssignment` requests have the same problem (docs say "Required" but type is `?`).
- **Category:** 6 (misleading — type says optional, semantics says required), 19 (underspecified ID — what should `tagKey` look like? Constraints? Encoding?).
- **Suggested name:** Keep `tagKey`; make non-optional (`tagKey: string`) on get/delete/update. Add JSDoc describing valid keys.
- **Rationale:** Optional path parameters in REST clients are a generator anti-pattern. Honest required-ness should travel through the type, not through a `?? ''` fallback that produces a malformed URL.

### 8. `Value.name` field — `src/v1/model.ts:83`
- **Why weird:** Field on `Value` is `name?: string | undefined` (line 83), but conceptually the field holds the *value text* of an allowed tag value (e.g., `"prod"`, `"dev"`). Calling that text `name` collides with the domain meaning of "tag value": the value's `name` is the value. JSDoc is empty. There is no `displayName` or other field to disambiguate — `name` is the *only* field.
- **Category:** 1 (vague/generic — `name` for a string that is the value itself), 6 (misleading — `name` suggests a label distinct from the value), 15 (generic field name losing meaning), 16 (field name contradicts type domain — `Value.name` reads "the name of a value", but the value's name *is* the value).
- **Suggested name:** Rename to `Value.value` (still awkward) or `AllowedValue.text`.
- **Rationale:** `tagPolicy.values[0].name` reads as "the name of the first value of this tag policy", which is structurally absurd.

## Medium severity

### 9. `PropagationConfig` type — `src/v1/model.ts:55`
- **Why weird:** The type's two fields (`enabled?: boolean`, `conflictResolution?: ConflictResolutionPolicy`) describe how a tag's *value* propagates through lineage. The name `PropagationConfig` is generic — any system can have a propagation config. The JSDoc context "automatically propagated through data lineage" disappears once a user lands on the type.
- **Category:** 1 (vague — `PropagationConfig` could mean anything), 15 (generic name losing meaning), 20 (type-suffix tautology — `Config` on a config-shaped struct).
- **Suggested name:** `LineagePropagation` (carries the domain), `TagPropagation`, or `TagPolicyPropagation`.
- **Rationale:** Bare `PropagationConfig` is too thin to discover what it propagates. The wire field is `propagation_config`; the TS type can be more specific.

### 10. `propagationConfig.enabled` boolean shape — `src/v1/model.ts:57`
- **Why weird:** A boolean field literally named `enabled`. The pattern is `propagationConfig.enabled = true`. JS/TS booleans are conventionally `is*`/`has*` or scoped (`enabledForPropagation`). On a config object whose entire purpose is to describe propagation, a field called `enabled` is missing its scope qualifier — enabled to do *what*? (The answer is "propagate", but the field name is silent on that.)
- **Category:** 1 (vague), 15 (generic name), 17 (verb-tense/predicate inconsistency).
- **Suggested name:** `propagate?: boolean` (collapse the wrapper) or `isEnabled` if the wrapper stays.
- **Rationale:** `propagationConfig.enabled` reads as "the propagation config is enabled". A clearer shape would be `tagPolicy.propagate = true` directly.

### 11. `CreateTagPolicyRequest` / `DeleteTagPolicyRequest` / `GetTagPolicyRequest` / `ListTagPoliciesRequest` / `UpdateTagPolicyRequest` — `src/v1/model.ts:20,30,34,38,77`
- **Why weird:** Five request DTOs share a 12-char prefix `TagPolicy*Request`. Each is 24–32 characters; the common substring is repetition. In the package whose only subject is `TagPolicy`, every request type re-states that subject.
- **Category:** 7 (overly verbose), 8 (redundant suffix), 20 (type-suffix tautology — `*Request` plus an embedded noun).
- **Suggested name:** `CreateRequest` / `DeleteRequest` / `GetRequest` / `ListRequest` / `UpdateRequest`, or drop the `Request` suffix when the method signature is self-documenting.
- **Rationale:** Single-subject packages don't need to repeat the subject on every request DTO. Cross-SDK convention, but worth flagging.

### 12. `ListTagPoliciesRequest` (plural) vs. `TagPolicy` (singular) — `src/v1/model.ts:38` vs. `model.ts:62`
- **Why weird:** Plural only on list endpoint; singular elsewhere. The list response is `ListTagPoliciesResponse` (plural). The wire path is `/tag-policies` (plural). The convention is consistent with the Go SDK, but worth flagging that the resource name on the wire is plural while the item type is singular.
- **Category:** 9 (singular/plural mismatch — present and intentional, but inconsistent vocabulary within one type family).
- **Suggested name:** Keep as is (cross-SDK convention). Listed for completeness under rule 9.
- **Rationale:** Same as in `entitytagassignments` audit — flagged because rule 9 demands it.

### 13. `ListTagPoliciesResponse.tagPolicies` field — `src/v1/model.ts:50`
- **Why weird:** Response wraps the items in `tagPolicies: TagPolicy[]`. Re-states the type name on the field. Common pattern but mechanically dense: `resp.tagPolicies.forEach(p => p.tagKey)`. Alternatives like `items` or `policies` reads more cleanly.
- **Category:** 8 (redundant prefix — `Tag` repeats on the field of a response in `ListTagPolicies*Response`), 7 (overly verbose).
- **Suggested name:** `items: TagPolicy[]` or `policies: TagPolicy[]`.
- **Rationale:** Once the response type is `ListTagPoliciesResponse`, the field name doesn't need to re-state "tag policies".

### 14. `tagPolicies` / `tagPolicy` field naming asymmetry between Create/Update and List response — `src/v1/model.ts:21,50,78`
- **Why weird:** `CreateTagPolicyRequest.tagPolicy: TagPolicy` (singular field for singular subject), `UpdateTagPolicyRequest.tagPolicy: TagPolicy`, `ListTagPoliciesResponse.tagPolicies: TagPolicy[]`. The naming is consistent in form (singular/plural matches type cardinality), but in both cases the field re-states the type. Adding a body wrapper at create/update is asymmetric with the response side: the response has the array directly, the request has the singular wrapped — and the response *also* wraps in a separate `tagPolicies` field.
- **Category:** 17 (inconsistency — wrappers on request and response with different cardinality semantics).
- **Suggested name:** `policy` (request) and `policies` (response). Drop the `tag` prefix; preserve cardinality.
- **Rationale:** Reduces typing and makes the symmetry visible.

### 15. `defaultValueOverride` case identifier vs. type name — `src/v1/model.ts:13,15`
- **Why weird:** The discriminator case is `'defaultValueOverride'` (a string literal), the field that carries the payload is also `defaultValueOverride`, and the payload type is `DefaultValueOverridePolicy`. Three identifiers in one switch (`$case === 'defaultValueOverride'` ⇒ `defaultValueOverride.defaultValue`) that say the same thing.
- **Category:** 8 (redundant repetition — case literal, field name, and type all share a prefix), 7 (overly verbose).
- **Suggested name:** Drop the `Policy` suffix on the payload type (-> `DefaultValueOverride`).
- **Rationale:** Three identifiers in one switch (`$case === 'defaultValueOverride'` ⇒ `defaultValueOverride.defaultValue`) that say the same thing make for noisy type checks.

### 16. `tagPolicyFieldMask(...paths: string[])` exported helper — `src/v1/model.ts:281`
- **Why weird:** A free function `tagPolicyFieldMask` exported alongside the type system, with no class namespace. The user types `tagPolicyFieldMask('description', 'values')`. The lowercase camelCase clashes with the PascalCase convention for type-related exports. Re-stated in sister packages with the same shape (`tagAssignmentFieldMask`, etc.). Belongs in a `TagPolicy.fieldMask` static method or in a shared helper module.
- **Category:** 8 (redundant prefix `tagPolicy` on a function exported only from the `tagpolicies` package), 14 (Go-style top-level functions instead of class statics).
- **Suggested name:** `fieldMask` (let the import path supply scope), or `TagPolicy.fieldMask` (static method).
- **Rationale:** Free functions with the type name as prefix replicate Go's lack of methods on structs. TS supports static methods natively.

### 17. `marshalRequest` / `parseResponse` asymmetric verb pair — `src/v1/utils.ts:113,119`
- **Why weird:** Two functions that form a logical pair, named with mismatched verbs: `marshalRequest` (serialize TS → wire) and `parseResponse` (deserialize wire → TS). The corresponding inverse pair would be `marshalRequest`/`unmarshalResponse` or `serializeRequest`/`deserializeResponse`. Currently asymmetric: `marshal` ↔ `parse`.
- **Category:** 17 (inconsistent action verbs — marshal/unmarshal vs. marshal/parse).
- **Suggested name:** `marshalRequest` / `unmarshalResponse`, or `serializeRequest` / `deserializeResponse`.
- **Rationale:** Sibling helpers should use mirrored verbs. The mismatch is a generator-wide pattern but worth flagging.

### 18. `marshalRequest` is mis-named — `src/v1/utils.ts:119`
- **Why weird:** The function `marshalRequest(data, schema)` takes *any* data (not a "request"), parses it through the schema, and returns a JSON string. It is a generic JSON encoder; the name implies it only handles request bodies.
- **Category:** 6 (misleading — handles arbitrary data, not just requests), 1 (vague — `marshal` is non-specific in JS, where `JSON.stringify` is the convention).
- **Suggested name:** `toJsonString` or `marshal` (no `Request` suffix).
- **Rationale:** A name that overstates the function's coupling to "request" misleads callers who'd reuse it for response prep.

### 19. `parseResponse` is mis-named — `src/v1/utils.ts:113`
- **Why weird:** Same problem as `marshalRequest` — the function `parseResponse(body, schema)` parses *any* `Uint8Array` body, not specifically a response. Used to validate request bodies during testing as well.
- **Category:** 6 (misleading), 1 (vague).
- **Suggested name:** `parseJson` or `unmarshal`.
- **Rationale:** Drops the false coupling to "response".

### 20. `executeCall` vs. `executeHttpCall` confusion — `src/v1/utils.ts:26,65`
- **Why weird:** Two near-identical names with different purposes. `executeCall(call, options)` runs a `Call` through the retrier/rate-limiter; `executeHttpCall(opts)` issues a single HTTP request and reads the body. The names differ by one word (`Http`) but the responsibilities are radically different (orchestrator vs. transport). A user grepping for "execute" can't tell which one to use.
- **Category:** 1 (vague — the disambiguator is too thin), 17 (inconsistent verb scoping).
- **Suggested name:** `executeCall` (orchestrator) and `sendHttpRequest` (single-request transport).
- **Rationale:** Distinct responsibilities should have distinct verb roots, not a same-verb-different-noun split.

### 21. `flattenQueryParams` exported but unused — `src/v1/utils.ts:123`
- **Why weird:** Exported helper that this client does not invoke (the list endpoint uses individual `params.append(...)` calls instead — see `client.ts:143,146`). Dead-code-shaped helper.
- **Category:** 6 (misleading — implies the package uses it), 1 (vague — `flatten` is generic; this specific one only handles a subset of types).
- **Suggested name:** N/A — should live in a shared utils package, not be copied into every package.
- **Rationale:** Generator-wide concern: every package duplicates this helper, often without using it.

## Low severity

### 22. `createTime` and `updateTime` naming on `TagPolicy` — `src/v1/model.ts:68,70`
- **Why weird:** Verb tense / noun pair where the natural English is "created at" / "updated at". `createTime` reads as "the time to create" (a verb-noun); `createdAt` is the cross-language convention for "timestamp when it was created". Cross-SDK convention is `createTime`/`updateTime`, so this is consistent with the rest of the codebase, but is non-idiomatic JS/TS.
- **Category:** 13 (verb-tense inconsistency — `create` (infinitive) vs. `created` (past participle)), 14 (Go-style naming — Go uses `CreateTime`).
- **Suggested name:** `createdAt` / `updatedAt`.
- **Rationale:** Established SDK pattern, but rule 13/14 demand the flag. Mongo, PostgREST, Rails, GraphQL conventions all use `createdAt`.

### 23. `accountId: string` on `TagPolicy` — `src/v1/model.ts:74`
- **Why weird:** "The account ID that owns this tag policy." — generic. `accountId` is consistent across the SDK, but the SDK's bound to an account already (via `ClientOptions.accountId`), so this field is redundant *output* (the server tells you the account that owns the policy, which the client already knows).
- **Category:** 1 (vague — what kind of ID? account number? UUID?), 19 (underspecified ID — no format documented), 15 (generic field name losing meaning in the SDK context).
- **Suggested name:** Keep `accountId`; document that it's the Databricks account UUID.
- **Rationale:** Minor; flagged because all `*Id` fields without docs trigger rule 19.

### 24. `Temporal.Instant` for timestamps — `src/v1/model.ts:68,70`
- **Why weird:** Uses `Temporal.Instant` (from `@js-temporal/polyfill`), which is a great future-proof choice — but `Instant` is unfamiliar to most JS devs (who expect `Date` or string). The doc says "Timestamp when the tag policy was created" without explaining why it's an `Instant`.
- **Category:** 1 (slightly vague choice without doc support), 5 (cryptic to readers unfamiliar with Temporal proposal).
- **Suggested name:** Keep `Temporal.Instant`; add JSDoc explaining the type choice.
- **Rationale:** Generator-wide; flagged once.

### 25. `nextPageToken: string` empty-string semantics — `src/v1/client.ts:180,183`
- **Why weird:** The pagination loop terminates on `resp.nextPageToken === undefined || resp.nextPageToken === ''`. Two sentinel values for "end of pages": `undefined` (TS-native missing field) and `''` (proto-side default). Callers must remember the two cases. The schema converts both to `string | undefined`, but the wire emits `""` rather than dropping the field.
- **Category:** 6 (misleading — `nextPageToken: ''` looks like a valid token but means "no more pages"), 17 (inconsistent sentinel — two values mean the same thing).
- **Suggested name:** Keep `nextPageToken`; normalize empty string to `undefined` in the unmarshaller. The field is purely a continuation token; "" is not a token, it's a missing token.
- **Rationale:** Generator-wide pattern. Each `*Iter` method has to handle both sentinels.

### 26. `listTagPoliciesIter` method name — `src/v1/client.ts:170`
- **Why weird:** `Iter` suffix is Go-style (sister `listTagPoliciesIter` matches `Go ListTagPoliciesIterator`). In JS/TS, the standard is to expose `[Symbol.asyncIterator]()` on a class, or to name a generator function with a noun phrase (e.g., `tagPolicies()`). `Iter` is also a cryptic three-letter abbreviation.
- **Category:** 14 (Go-style naming), 5 (cryptic abbreviation — `Iter` shortens `Iterator`).
- **Suggested name:** `listAll(...)` or `iterateTagPolicies(...)`, or make the class an `AsyncIterable` directly.
- **Rationale:** TS has built-in support for `for await...of`; the iterator method should match those expectations.

### 27. `pageSize` upper-bound documented in doc, not enforced in type — `src/v1/model.ts:43-44`
- **Why weird:** JSDoc says "The maximum value is 1000; values above 1000 will be coerced down to 1000." but the field is typed `number | undefined`. A caller passing `pageSize: 100000` silently gets clipped to 1000. The constraint travels only via the docstring.
- **Category:** 6 (misleading — type does not match contract).
- **Suggested name:** Keep `pageSize`; consider a branded type or a runtime validator. At minimum, restate the limit clearly.
- **Rationale:** Generator-wide; flagged because docs lie about wire behaviour.

### 28. `pageSize` and `pageToken` are camelCase but wire is `page_size` / `page_token` — `src/v1/client.ts:144,147`
- **Why weird:** The TS request shape uses `pageSize` / `pageToken`, but the URL builder hard-codes the wire names `page_size` / `page_token` (`client.ts:144,147`) — i.e., the client serializes TS field names *manually* into snake_case query strings. If a future request adds new query params, every new param requires another two-name mapping.
- **Category:** 17 (inconsistency — request fields camelCase, URL builder snake_case, no shared mapping table).
- **Suggested name:** N/A; flag as generator-side smell. A field-mask or marshal-schema-driven URL builder would avoid the dual-name maintenance.
- **Rationale:** Each new query param doubles the bug surface.

### 29. `updateMask` field type `FieldMask<TagPolicy>` — `src/v1/model.ts:79`
- **Why weird:** `FieldMask<TagPolicy>` is a generic type carrying the masked-shape as a type parameter. The name `updateMask` is wire-standard (proto FieldMask) but cryptic to TS users — "mask" usually means a bitmask. The JSDoc is missing.
- **Category:** 5 (cryptic — `mask` for TS users means bitmask), 14 (proto-style — FieldMask is a proto concept).
- **Suggested name:** Keep `updateMask`; add JSDoc explaining it's a path-based selector for partial updates.
- **Rationale:** Generator-wide name; flag once.

### 30. `id` field on `TagPolicy` — `src/v1/model.ts:64`
- **Why weird:** Field name `id` with no JSDoc on what it represents — server-generated UUID? Hashed `tagKey`? Path key for some other endpoint? See #6 for the duplicate-identifier critique; this is the underspecified-`id`-name flag separately.
- **Category:** 1 (vague), 19 (underspecified ID), 15 (generic name).
- **Suggested name:** `policyId` or `governedTagId`; add JSDoc.
- **Rationale:** Sibling `BudgetPolicy.policyId` uses the prefix; `TagPolicy.id` does not. Cross-SDK inconsistency.

### 31. `description` field doc missing — `src/v1/model.ts:65`
- **Why weird:** Just `description?: string | undefined` with no JSDoc. Width limits? Mandatory? Format?
- **Category:** 1 (vague — no contract on the field).
- **Suggested name:** Keep `description`; add JSDoc.
- **Rationale:** Common pattern, but flagged because rule 1 demands it.

### 32. `host` constructor field with trailing-slash stripping — `src/v1/client.ts:42,54`
- **Why weird:** The constructor strips trailing `/` from `options.host` (`client.ts:54`). Field is `host`, not `baseUrl` or `endpoint`. The TS field `host` is a string like `https://workspace.cloud.databricks.com`, which is by convention "the base URL" not "the host" (the host would be `workspace.cloud.databricks.com` without scheme).
- **Category:** 6 (misleading — "host" usually means hostname-only).
- **Suggested name:** `baseUrl` or `endpoint`.
- **Rationale:** RFC 3986 §3.2 defines "host" as the authority component without scheme. The SDK's `host` is the full URL.

## Observations

### 33. Wire/TS divergence dominates the file
The `model.ts` file is 284 lines for ~9 user-facing types; ~140 lines are `marshal`/`unmarshal`/`FieldMaskSchema` scaffolding. Same pattern as other audited packages.

### 34. Action verb consistency
The client uses `create`/`get`/`update`/`delete`/`list` (plus `listIter`) — no `fetch`/`retrieve`. Consistent across this package and aligned with sister packages.

### 35. Acronym casing
File uses `HttpRequest`, `HttpResponse`, `HttpCallOptions` (Pascal `Http`), `URLSearchParams` (web standard `URL`), `userAgent` (camelCase). The `Http` vs. `URL` split is the JS-ecosystem norm. No `Id`/`Uri` casing clashes encountered within the file.
- **Category:** 3 (acronym casing — consistent within the file, ecosystem-divergent overall).

### 36. `tagpolicies` lowercase package name
Package directory is `tagpolicies` (single token, no separator), but every type uses `TagPolicy*` and the HTTP path uses `tag-policies`. Same problem as `dataclassification`, `tagassignments`, `entitytagassignments` — SDK-wide convention issue.
- **Category:** 3 (casing inconsistency between directory token, kebab wire path, and Pascal types).

### 37. Domain leakage from sister packages
Three packages — `tagpolicies`, `tagassignments`, `entitytagassignments` — all collide on the noun "tag". Each ships its own `Client`, its own `tag*` types, and its own `tagKey`. Co-import requires extensive aliasing. `tagpolicies` differs in that it defines the *policy* over the tag, while the assignment packages attach a `tagKey` + `tagValue` to entities — but a user can't tell from the name; "tag policies" sounds like it could be policies *for* tag assignments.
- **Category:** 12 (duplicate concept across siblings).

## Domain glossary
- `tag policy` — a governed-tag definition with allowed values and propagation rules.
- `governed tag` — a tag whose key has an active `TagPolicy` (JSDoc on every method mentions this).
- `tag key` — the user-chosen identifier of a tag (e.g., `"environment"`). Doubles as the path-key for the resource (`/tag-policies/{tagKey}`).
- `tag value` — one of the allowed strings for a tag (e.g., `"prod"`, `"dev"`) — wrapped in a `Value` type that has a single `name` field.
- `propagation` — automatic carry-over of a tag from one entity to another via Unity Catalog lineage.
- `conflict resolution` — the rule applied when multiple upstream entities provide different tag values during propagation.
- `default value override` — the only currently supported conflict-resolution strategy: use a specified default value.
- `account id` — Databricks account UUID; tag policies are account-scoped.
- `Terraform documentation` — JSDoc on every method links to the matching `terraform-provider-databricks` page.

## File coverage
- `src/v1/model.ts` (284 lines): read fully.
- `src/v1/client.ts` (224 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (20 lines): read fully.
