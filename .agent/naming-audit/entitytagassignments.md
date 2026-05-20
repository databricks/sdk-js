# Naming Audit: entitytagassignments

**Path:** `packages/entitytagassignments/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog entity tag assignments — create/get/list/update/delete key/value tags on UC entities (tables, schemas, columns, volumes, etc.), with provenance (`sourceType`) and inheritance (`inherited` / `includeInherited`) metadata. Sister of `tagassignments` (non-UC entities: apps, dashboards, geniespaces, notebooks) and `tagpolicies` (governed tag definitions).
**Total weird names flagged:** 31

## Summary
| Severity | Count |
| --- | --- |
| High | 11 |
| Medium | 10 |
| Low | 6 |
| Observation | 4 |

## High severity

### 1. Package name `entitytagassignments` vs. sister `tagassignments` — `package directory name`
- **Why weird:** Two packages exist whose names differ only by the prefix `entity`: `entitytagassignments` (Unity Catalog tables/schemas/columns) and `tagassignments` (apps, dashboards, geniespaces, notebooks). Both model "a tag assigned to a thing", both expose the same five operations (Create/Get/List/Update/Delete), and both have a primary type called `(Entity)TagAssignment`. The split mirrors a backend HTTP-path split (`/api/2.1/unity-catalog/entity-tag-assignments` vs. `/api/2.0/tag-assignments`) that is invisible to TS users.
- **Category:** 12 (duplicate concept across two packages — overlapping responsibility), 1 (vague: what is a non-entity tag assignment?), 16 (the field `entityType` in `tagassignments` carries the *exact same* notion that the prefix `entity` carries here, so the disambiguating prefix is doubly redundant).
- **Suggested name:** Merge into a single package `tagassignments` keyed by `entityKind` ("uc" vs. "platform"), or rename to `uctagassignments` so the surface marker is "uc", not "entity". The non-UC sibling can drop its own `entityType` field discrimination and become `platformtagassignments`. As a smaller fix: `unitycatalogtags` here, `platformtags` there.
- **Rationale:** Two `Client` classes called `Client`, with two `TagAssignment` / `EntityTagAssignment` types, both shipping `tagKey`/`tagValue`/`entityType`, will collide in user imports and force aliasing on every co-use. The split exists for backend reasons but leaks raw into the SDK. Worth flagging upstream as a generator-level concern.

### 2. `EntityTagAssignment` — `src/v1/model.ts:32`
- **Why weird:** The redundant "Entity" prefix on the primary type. Every assignment is an assignment of a tag to an *entity*; there is no non-entity tag assignment. Within this package, `Entity` adds nothing beyond what `TagAssignment` already implies, and the package directory already carries the namespace. Inside `tagassignments`, the same concept is plainly `TagAssignment`.
- **Category:** 8 (redundant prefix — `Entity` repeats the universal subject), 12 (duplicate concept — `TagAssignment` already exists in `tagassignments`).
- **Suggested name:** `TagAssignment`. Rely on package-import disambiguation: `import {TagAssignment as UcTagAssignment} from '@databricks/sdk-entitytagassignments'`.
- **Rationale:** A noun that re-states its only possible subject is filler. The Go SDK names it `EntityTagAssignment` to disambiguate from a different proto type in the same Go package; TS module imports already do that disambiguation.

### 3. `EntityTagAssignment` field shape vs. sister `TagAssignment` shape — `src/v1/model.ts:32-49` vs. `tagassignments/src/v1/model.ts:46-55`
- **Why weird:** The two sister types model the same conceptual object using different identifier fields: this package's `EntityTagAssignment` has `entityName: string`, while `tagassignments.TagAssignment` has `entityId: string`. Same column conceptually (the thing being tagged), different field name. A user porting code between the two has to translate. The JSDoc here says "fully qualified name" while the sister says "identifier"; the wire-side names are `entity_name` vs. `entity_id`.
- **Category:** 12 (duplicate concept with divergent naming), 17 (verb/noun inconsistency across siblings), 16 (field contradicts type domain — "name" suggests a label, "id" suggests an opaque handle, but both fields are fully-qualified resource identifiers).
- **Suggested name:** Unify on `entityFullName` (matches Unity Catalog vocabulary like `catalogs.fullName`, `tables.fullName`) or `entity` for both packages. At minimum, both packages should agree.
- **Rationale:** Splitting "name vs id" by package makes the cross-package developer experience worse. The Unity Catalog product surface consistently calls these `full_name`/`fullName` (see `catalogs`, `schemas`, `tables`); using `entityName` here breaks that convention silently.

### 4. `TagAssignmentSourceType` — `src/v1/model.ts:9`
- **Why weird:** Three-word enum name `TagAssignmentSourceType`. "Source" + "Type" is a tautology — an enum *is* a type, so `*Type` suffix is filler. Combined with the surrounding type `EntityTagAssignment`, the relevant field is `sourceType: TagAssignmentSourceType` — five words to say "where did this come from".
- **Category:** 20 (type-suffix tautology — `Type` on an enum), 8 (redundant prefix — every member is prefixed `TAG_ASSIGNMENT_SOURCE_TYPE_*`), 7 (overly verbose).
- **Suggested name:** `TagSource` (drop both `Assignment` and `Type`). Field becomes `source: TagSource`.
- **Rationale:** The shorter name is unambiguous in context (`EntityTagAssignment.source` reads better than `EntityTagAssignment.sourceType`). Sister Unity Catalog packages have analogous enums like `Privilege`, `SchemaType` — `Type` suffix is used inconsistently across the SDK.

### 5. `TagAssignmentSourceType` enum members carry the full enum name as prefix — `src/v1/model.ts:11-13`
- **Why weird:** Every enum member is prefixed with `TAG_ASSIGNMENT_SOURCE_TYPE_*`. The TS access is `TagAssignmentSourceType.TAG_ASSIGNMENT_SOURCE_TYPE_SYSTEM_DATA_CLASSIFICATION` — the user types `TagAssignmentSourceType` twice in one expression.
- **Category:** 2 (redundant enum prefix on every member).
- **Suggested name:** Drop the redundant prefix from each member so access reads `TagAssignmentSourceType.SystemDataClassification`.
- **Rationale:** TS enum members are already namespaced by the enum identifier; re-prefixing every value with the enum name adds nothing. Compare canonical TS enums (`Severity.High`, `Color.Red`).

### 6. `entityName: string` doc says "fully qualified name" but type does not enforce — `src/v1/model.ts:24,34,53,66`
- **Why weird:** Five places in this file have a field called `entityName` whose JSDoc says "The fully qualified name of the entity to which the tag is assigned". The shape `name?: string | undefined` cannot enforce qualification; users will pass bare names. Compare Unity Catalog convention `fullName` (used in `catalogs`, `schemas`, `tables`).
- **Category:** 1 (vague — "name" is too generic), 6 (misleading — looks settable to a bare name, is actually structured), 15 (generic field name losing meaning), 19 (underspecified ID — what makes it "fully qualified"?).
- **Suggested name:** `entityFullName` (or `entity`/`entityFqn`). Matches sister UC packages.
- **Rationale:** "fully qualified" is wire-side; the SDK type should make the constraint visible in the identifier. A field literally called `entityName` reads as a display name to most TS users.

### 7. `entityType: string` everywhere — `src/v1/model.ts:28,40,58,72`
- **Why weird:** Four occurrences of `entityType?: string | undefined` with no enum or string-literal union to constrain values. The JSDoc says "The type of the entity to which the tag is assigned" but never lists which values are valid (compare sister `tagassignments`: doc explicitly lists `apps, dashboards, geniespaces, notebooks`). For Unity Catalog entities, the actual valid set is something like `table`, `schema`, `catalog`, `column`, `volume`, `function`, `model` — none of which is documented or constrained in the type.
- **Category:** 1 (vague — `string` for what is really an enum), 19 (underspecified ID — what type strings are valid?), 6 (misleading — looks free-form, is actually constrained).
- **Suggested name:** `EntityKind` (string-literal union or enum) typed as the field. E.g. `entityKind?: 'table' | 'schema' | 'catalog' | 'column' | 'volume' | 'function' | 'model'`. The field name `Type` also collides with the JS reserved-ish word — `Kind` reads more cleanly.
- **Rationale:** Stringly-typed enum fields are a generator anti-pattern. The valid set is closed; the type should say so. `Type` as a noun is also overused — `Kind` is the convention in TS standard library (`SyntaxKind`, `NodeKind`).

### 8. `tagKey` field doc inconsistency: required marker on get/delete, not on `EntityTagAssignment` — `src/v1/model.ts:26,36,55`
- **Why weird:** `DeleteEntityTagAssignmentRequest.tagKey` says "Required. The key of the tag to delete". `GetEntityTagAssignmentRequest.tagKey` says "Required. The key of the tag". But `EntityTagAssignment.tagKey` (on the actual returned/created object) and `CreateEntityTagAssignmentRequest.tagAssignment.tagKey` are documented as just "The key of the tag" with no required marker — yet you cannot create or get a tag without a key. The `?: string | undefined` typing makes all of them optional in TS. Type and doc disagree.
- **Category:** 6 (misleading — type says optional, semantics says required), 17 (inconsistent — some docs say "Required.", others don't, for what is the same logical field).
- **Suggested name:** Keep `tagKey`; make non-optional (`tagKey: string`) and remove the "Required." doc preamble since the type enforces it. Apply uniformly across all four request types and the assignment type itself.
- **Rationale:** "Required." in a docstring while the type is optional is a generator smell. Honest required-ness should travel through the type.

### 9. `includeInherited` boolean doc is wrong — `src/v1/model.ts:60,74`
- **Why weird:** The JSDoc on `GetEntityTagAssignmentRequest.includeInherited` and `ListEntityTagAssignmentsRequest.includeInherited` reads "Boolean which indicates whether this tag is inherited." That is the doc for `EntityTagAssignment.inherited` (a read-side, per-row marker). The request-side `includeInherited` is a *filter* meaning "include inherited tags in the response", not a per-tag inheritance marker. The same wrong doc is copy-pasted onto a settings flag with different semantics.
- **Category:** 6 (misleading — doc says one thing, field does another), 12 (duplicate concept naming — `inherited` (the marker) vs. `includeInherited` (the filter) both documented identically), 17 (inconsistent prose for sibling fields).
- **Suggested name:** Keep `includeInherited` on the request types; fix the doc to "If true, include inherited tag assignments in the result." Keep `inherited` on `EntityTagAssignment`.
- **Rationale:** Doc-code mismatch produces incorrect SDK behaviour at the agent level. Even if it's a generator issue, this audit must flag it.

### 10. `Client` class — `src/v1/client.ts:41`
- **Why weird:** A class literally named `Client` at the top level of the package's public API, re-exported through `index.ts:3` as just `Client`. The other tag packages (`tagassignments`, `tagpolicies`) ship their own `Client` class with the same name. Three `Client` classes in three sister packages.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name), 12 (duplicate concept across sister packages).
- **Suggested name:** `EntityTagAssignmentsClient` (or `UnityCatalogTagsClient`).
- **Rationale:** Three sister packages with three `Client`s will collide on combined imports and force aliasing. Generator-level concern.

### 11. Method names `createEntityTagAssignment` / `deleteEntityTagAssignment` / `getEntityTagAssignment` / `listEntityTagAssignments` / `updateEntityTagAssignment` — `src/v1/client.ts:76,114,133,169,235`
- **Why weird:** Every client method repeats the package name in its identifier. On `Client` already scoped by import to this package, `client.createEntityTagAssignment(...)` reads as "package.subject.create.subject" — the noun is doubled. Sister package `tagassignments` does the same with `createTagAssignment`. The shorter form `client.create(...)` / `client.list(...)` is what TS users expect when a client is single-purpose.
- **Category:** 7 (overly verbose), 8 (redundant suffix — repeats `EntityTagAssignment` four/five times when the client only manages `EntityTagAssignment`).
- **Suggested name:** `create`, `delete`, `get`, `list`, `update`. Or shorter `createAssignment` / `deleteAssignment` / etc.
- **Rationale:** A client class that ships exactly five methods all named after the same subject is repeating the subject. `EntityTagAssignmentsClient.create()` is the more readable shape.

## Medium severity

### 12. `CreateEntityTagAssignmentRequest` etc. — five request DTOs share a 25-char prefix — `src/v1/model.ts:17,22,52,64,85`
- **Why weird:** `CreateEntityTagAssignmentRequest`, `DeleteEntityTagAssignmentRequest`, `GetEntityTagAssignmentRequest`, `ListEntityTagAssignmentsRequest`, `UpdateEntityTagAssignmentRequest`. Each is 33 characters; the common prefix `EntityTagAssignment` is 19 chars of repetition. In the package whose only subject is the entity tag assignment, every request type re-states that subject.
- **Category:** 7 (overly verbose), 8 (redundant suffix), 20 (type-suffix tautology — `*Request` plus an embedded noun).
- **Suggested name:** `CreateRequest` / `DeleteRequest` / `GetRequest` / `ListRequest` / `UpdateRequest`. Or drop just the noun: `CreateRequest` etc.
- **Rationale:** Single-subject packages don't need to repeat the subject on every request DTO. Listed as medium because the inconsistency with the rest of the SDK matters.

### 13. `ListEntityTagAssignmentsRequest` (plural) vs. `EntityTagAssignment` (singular) — `src/v1/model.ts:64` vs. `src/v1/model.ts:32`
- **Why weird:** The plural appears only on the list endpoint; the rest of the surface is singular. Singular/plural mix is consistent with the Go SDK and other packages, but worth flagging that the resource name on the wire is `/entity-tag-assignments` (plural) while the type name is singular `EntityTagAssignment`. The list response is `ListEntityTagAssignmentsResponse` (plural).
- **Category:** 9 (singular/plural mismatch — present and intentional, but inconsistent vocabulary).
- **Suggested name:** Keep as is (this is the cross-SDK convention). Listed for completeness.
- **Rationale:** Listed only to confirm: List endpoints use plural, item type is singular. No fix needed; flagged because rule 9 demands the audit.

### 14. `executeCall` vs. `executeHttpCall` — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions named "execute" — `executeCall` runs the retry/rate-limit shell, `executeHttpCall` does the actual HTTP send. They appear together in every client method:
  ```ts
  const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
    ...
    const respBody = await executeHttpCall({...});
    ...
  };
  await executeCall(call, options);
  ```
  Reading just the names, a developer cannot tell which wraps which.
- **Category:** 1 (vague), 12 (duplicate concept — both "execute"), 17 (inconsistent layering name).
- **Suggested name:** `runWithPolicies(call, options)` for outer, `sendHttpRequest(opts)` for inner.
- **Rationale:** Names should reveal the layering, not require code-diving. Generator-wide concern.

### 15. `Call` type and `call` variable — `src/v1/client.ts:86,119,145,187,251` and `src/v1/utils.ts:27`
- **Why weird:** Variable `call` of type `Call`, called inside `executeCall(call, options)`. The same word is the variable, the type, and the verb. Inside one method scope we have `req`, `call`, `httpReq` — three layered names where one of them collides with its type.
- **Category:** 1 (vague), 12 (duplicate concept).
- **Suggested name:** `runRequest` / `sendRequest` for the variable; reserve `Call` for the type.
- **Rationale:** Type-name collisions are tolerable but obscure prose-style code.

### 16. `req.entityType ?? ''` / `req.entityName ?? ''` / `req.tagKey ?? ''` URL composition — `src/v1/client.ts:118,137,173,239`
- **Why weird:** Four endpoints silently substitute empty string for missing path components. `req.entityType` and `req.entityName` and `req.tagKey` are typed `string | undefined` but functionally required (URL is broken without them). When `entityType` is undefined the URL becomes `.../entity-tag-assignments//entity-name/tags/key`. Same problem flagged in `dataclassification` audit.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make path-component fields required (non-optional) on the request types.
- **Rationale:** Field name promises less than the API requires; the SDK silently produces malformed URLs.

### 17. `respBody` (raw bytes) vs. `resp` (parsed object) — `src/v1/client.ts:90-95, 149-155, 194-199, 261-266`
- **Why weird:** Two stages produce `respBody: Uint8Array` then `resp: EntityTagAssignment`. The names differ only by `Body`. Both are short for "response". The reader has to track which is bytes, which is parsed. Compare `req` (parameter, request) — also abbreviated, but no `reqBody` sibling.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency — `respBody` keeps `Body`, `resp` drops the implied `Parsed`).
- **Suggested name:** `rawBody` + `result`, or `responseBytes` + `response`.
- **Rationale:** Distinguish stages by meaningful nouns, not by suffix differences on the same root.

### 18. `httpReq` local variable — `src/v1/client.ts:89,122,148,190,254`
- **Why weird:** Inside a method that already has `req: CreateEntityTagAssignmentRequest`, a second variable `httpReq: HttpRequest` shares the `req` root. Two `req`s in the same scope.
- **Category:** 5 (cryptic abbreviation), 12 (duplicate concept — two `req`s).
- **Suggested name:** `httpRequest` (no abbreviation), or `wireRequest`.
- **Rationale:** Avoid forking the same identifier across two layers in one scope.

### 19. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Type called `Options` but it is an internal context bag (request + http client + logger), not a user-tunable options struct. The user-facing options type is `CallOptions` (different file). Two different `Options` types for two different concepts.
- **Category:** 1 (vague suffix `Options`), 8 (redundant suffix — internal context bags should not be called `Options`).
- **Suggested name:** `HttpCallContext` or `HttpCallArgs`.
- **Rationale:** Reserve `Options` for caller-tunable knobs; use `Context`/`Args` for internal bags.

### 20. `buildHttpRequest` returns `HttpRequest` — `src/v1/utils.ts:96`
- **Why weird:** Pure object-literal-with-optional-fields helper named "build". "Build" suggests builder-pattern construction; the function just spreads fields into a struct.
- **Category:** 1 (vague — "build" suggests heavyweight construction), 6 (misleading — implies builder pattern, is just an object literal).
- **Suggested name:** `makeHttpRequest` or inline at call sites.
- **Rationale:** "Build" carries connotations from Java/JS Builder patterns; this is just shorthand.

### 21. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** The function is exported but unused in `client.ts` (this package's list endpoint uses individual `params.append(...)` calls instead). Dead-code-shaped helper in shared scaffolding.
- **Category:** 6 (misleading — implies the package uses it), 18 (carry-over from a different template).
- **Suggested name:** N/A — should not live here at all. Belongs in a shared utils package.
- **Rationale:** Generator-wide concern: every package duplicates this helper.

## Low severity

### 22. `readAll(body)` — `src/v1/utils.ts:40`
- **Why weird:** `readAll` is generic enough to read anything; here it specifically drains a `ReadableStream<Uint8Array>` into a single buffer. The name does not say "drain a stream into a buffer".
- **Category:** 1 (vague), 5 (cryptic — `readAll` is JS-conventional but not self-describing).
- **Suggested name:** `drainStream` or `readStreamToUint8Array`.
- **Rationale:** A name like `readAll` reads as if it took a file path or array.

### 23. `PACKAGE_SEGMENT` — `src/v1/client.ts:36`
- **Why weird:** `SEGMENT` is unspecific; the value is `{key, value}` for the User-Agent identity. Constant is `UPPER_SNAKE_CASE` in a TS file otherwise dominated by camelCase. Casing is appropriate for a module constant; the noun is weak.
- **Category:** 1 (vague — `Segment` of what?).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PACKAGE_USER_AGENT_ID`.
- **Rationale:** Single word "segment" gives no domain; the comment above it does the work the name should.

### 24. `inherited` (boolean) on `EntityTagAssignment` — `src/v1/model.ts:48`
- **Why weird:** A boolean called `inherited`. The participle works (the tag is in an inherited state), but boolean fields are conventionally `is*`/`has*` in TS (`isInherited`). The sibling filter `includeInherited` uses a verb prefix; the marker drops the prefix. Asymmetric.
- **Category:** 17 (inconsistent — `inherited` (no prefix) vs. `includeInherited` (verb-prefixed) in same file).
- **Suggested name:** `isInherited` on the result type.
- **Rationale:** TS booleans usually carry an `is`/`has` prefix to read as predicates. The current name reads grammatically as an adjective on the assignment.

### 25. `tagKey` and `tagValue` co-located on `EntityTagAssignment` — `src/v1/model.ts:36,38`
- **Why weird:** The pair encodes a `(key, value)` tag — that part is fine. But the type is *already* called `EntityTagAssignment`, so the `tag` prefix on each field is redundant within scope: `assignment.tagKey` reads as "the assignment's tag's key" when the assignment *is* a tag.
- **Category:** 8 (redundant prefix — `tag` within `EntityTagAssignment`).
- **Suggested name:** `key` and `value` (drop the `tag` prefix). Wire stays `tag_key` / `tag_value`.
- **Rationale:** Field names should not re-state their containing type's noun. `assignment.key` / `assignment.value` reads cleaner.

### 26. `updateTime` and `updatedBy` paired field naming — `src/v1/model.ts:42,44`
- **Why weird:** Verb tense pair: `updateTime` (noun-noun, gerund stripped) vs. `updatedBy` (past participle). Cross-SDK convention should pick one. Compare: `createTime` (noun-noun) often pairs with `createdBy` (past participle) in Databricks — the same asymmetry. It is consistent across the SDK, but worth noting under rule 13.
- **Category:** 13 (verb-tense inconsistency within a paired field).
- **Suggested name:** `updateTime`/`updateBy` or `updatedTime`/`updatedBy`. Either works; the asymmetry is the issue.
- **Rationale:** Established SDK pattern, but rule 13 demands the flag.

### 27. `sourceType` vs. `source` (on the enum) — `src/v1/model.ts:46` and `src/v1/model.ts:9`
- **Why weird:** Field is `sourceType: TagAssignmentSourceType`. The field name re-states `Type`, and the type name re-states `SourceType`. The user types "source", "Type", "Source", "Type" — four times in one declaration: `sourceType?: TagAssignmentSourceType | undefined`.
- **Category:** 20 (type-suffix tautology), 8 (redundant suffix).
- **Suggested name:** `source: TagSource` (drop both `Type`s).
- **Rationale:** See #4. The compound effect makes the line read as type-noise.

## Observations

### 28. Action verb consistency
The client uses `create`/`get`/`update`/`delete`/`list` — no `fetch`/`retrieve`. Consistent across this package and aligned with sister packages.

### 29. Acronym casing
The file uses `HttpRequest`, `HttpResponse`, `HttpCallOptions` (Pascal `Http`), `URLSearchParams` (web standard `URL`), `userAgent` (camelCase). The `Http` vs. `URL` split is the JS-ecosystem norm. No `Id`/`Uri`/`UC` casing clashes encountered.
- **Category:** 3 (acronym casing — consistent within the file, ecosystem-divergent overall).

### 30. `entitytagassignments` lowercase package name
The package directory is `entitytagassignments` (single token, no separator), but every type uses `EntityTagAssignment` and the HTTP path uses `entity-tag-assignments`. Same problem as `dataclassification`. SDK-wide convention issue.
- **Category:** 3 (casing inconsistency between directory token, kebab wire path, and Pascal types).

### 31. Domain leakage from sister packages
Three packages — `entitytagassignments`, `tagassignments`, `tagpolicies` — all collide on the noun "tag". Each ships its own `Client`, its own `*TagAssignment` (or `TagPolicy`) type, and its own `tagKey`/`tagValue`. Co-import requires extensive aliasing. The split aligns to wire-side API groupings, not to a user mental model of "tag tools". Worth flagging upstream as a structure-level concern, not just naming.
- **Category:** 12 (duplicate concept across siblings).

## Domain glossary
- `uc` / Unity Catalog — implicit across the package; the HTTP path includes `/unity-catalog/entity-tag-assignments`.
- `entity` — generic UC resource: catalog, schema, table, column, volume, function, model (never enumerated in this package's types).
- `entity name` — wire docs say "fully qualified name" — i.e., dotted form like `catalog.schema.table` (or column ref).
- `entity type` — string discriminator for the kind of entity (no enum in this package).
- `tag key` / `tag value` — string key/value pair attached to an entity (the "tag" itself).
- `tag policy` — governed tag definition with constraints/values (a separate sister package).
- `governed tag` — a tag whose key matches an active `TagPolicy`. JSDoc mentions ASSIGN/MANAGE permissions on the tag policy.
- `inherited` — flag on a returned assignment indicating it was inherited from a parent (catalog/schema), not directly assigned.
- `source type` — provenance of the assignment: user vs. data-classification (today, only `SYSTEM_DATA_CLASSIFICATION` is enumerated).

## File coverage
- `src/v1/model.ts` (173 lines): read fully.
- `src/v1/client.ts` (275 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (16 lines): read fully.
