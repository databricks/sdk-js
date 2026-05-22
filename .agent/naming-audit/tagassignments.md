# Naming Audit: tagassignments

**Path:** `packages/tagassignments/src/v1/`
**Versions audited:** v1
**Inferred domain:** Tag assignment management for non-Unity-Catalog Databricks platform entities — specifically `apps`, `dashboards`, `geniespaces`, `notebooks`. Provides CRUD over (entityType, entityId, tagKey) -> tagValue triples through `/api/2.0/entity-tag-assignments`. Sister of `entitytagassignments` (Unity Catalog entities) and `tagpolicies` (governed tag definitions). Despite the package name and the URL path both being `entity-tag-assignments`-flavored, the primary type here is `TagAssignment` (no `Entity` prefix), unlike sister package `entitytagassignments`.
**Total weird names flagged:** 29

## Summary
| Severity | Count |
| --- | --- |
| High | 10 |
| Medium | 12 |
| Low | 4 |
| Observation | 3 |

## High severity

### 1. Package directory `tagassignments` vs. sister `entitytagassignments` and wire path `/entity-tag-assignments` — `package directory name`
- **Why weird:** This package is called `tagassignments` (no `entity` prefix). Its sister `entitytagassignments` shares the same wire path *prefix* and the same five operations. But its own HTTP path (line `client.ts:71`) is `/api/2.0/entity-tag-assignments` — so this package is named *without* `entity` even though the URL is *with* `entity`. The sister package is named *with* `entity` and its URL is `/api/2.1/unity-catalog/entity-tag-assignments`. The directory tokens do not predict the wire shape. Worse, both packages have a `Client` and the resource shape `(entityType, entityId-or-name, tagKey, tagValue)` is conceptually identical — only the entity universe (UC vs. apps/dashboards/etc.) differs.
- **Category:** 12 (duplicate concept across two packages), 1 (vague — what does `tagassignments` mean without `entity`?), 6 (misleading — name suggests "any tag assignment" but the package only covers four platform entity kinds).
- **Suggested name:** Rename to `platformtagassignments` or `appdashtags` to mark the scope, while renaming the sister `entitytagassignments` to `uctagassignments`. Alternatively, merge both into a unified `tagassignments` package with a discriminating `entityKind` field.
- **Rationale:** Two sister packages whose names diverge from their wire paths force users to memorize a name-to-API mapping. Without `entity` in this directory, the type `TagAssignment` here and `EntityTagAssignment` there look like different kinds of objects when they are not. Generator-level concern.

### 2. `TagAssignment` field shape vs. sister `EntityTagAssignment` shape — `src/v1/model.ts:46-55` vs. `entitytagassignments/src/v1/model.ts:32-49`
- **Why weird:** The two sister types model the same conceptual object using divergent identifiers. This package has `entityId: string` (with doc "For apps, the entity_id is the app name"). Sister has `entityName: string` (with doc "fully qualified name"). The wire-side names are `entity_id` vs. `entity_name`. The doc for `entityId` admits it can be a name — so it is sometimes an id and sometimes a name. A user porting code between the two packages must change every field reference even though the data is the same.
- **Category:** 12 (duplicate concept with divergent naming), 17 (inconsistency between siblings), 16 (field name contradicts type domain — calling it `entityId` when it is "the app name" is misleading).
- **Suggested name:** Unify on `entityRef`, `entity`, or `entityKey` for both packages. At minimum, rename one to match the other. The doc-confessed "id is actually a name" case is exactly why a neutral identifier name is needed.
- **Rationale:** Splitting "name vs id" by sister package, when both fields hold the same logical thing (an entity identifier — sometimes literally a name), is poor cross-package developer experience.

### 3. `TagAssignment` — `src/v1/model.ts:46`
- **Why weird:** The primary type `TagAssignment` is a tag assigned to an *entity* — every field on it (`entityType`, `entityId`, `tagKey`, `tagValue`) presupposes an entity. The name says "tag assignment" but the type really is "entity tag assignment". Yet sister package `entitytagassignments` does include the `Entity` prefix on its type. So the SDK has both `TagAssignment` and `EntityTagAssignment` for the same conceptual shape.
- **Category:** 1 (vague — assignment to what?), 12 (duplicate concept naming across siblings), 16 (no `Entity` prefix when sister package has it for the same concept).
- **Suggested name:** Either pick `EntityTagAssignment` here too (and rename type-collisions out at re-export), or rename the sister to drop `Entity` and use package-scoped imports. Pick one.
- **Rationale:** The naming asymmetry between sister types is the actual bug. Both should be the same name, with disambiguation via import.

### 4. `entityType: string` — `src/v1/model.ts:13,22,31,48`
- **Why weird:** Four occurrences of `entityType?: string | undefined`. The JSDoc lists allowed values inline: "apps, dashboards, geniespaces, notebooks". A closed set of four values lives in plain prose, not in the type. Users will pass typos with no compile-time check.
- **Category:** 1 (vague — `string` for what is really an enum), 19 (underspecified ID — what values are valid?), 6 (misleading — looks free-form, is actually constrained), 16 (field contradicts type — closed set typed as open string).
- **Suggested name:** Introduce `EntityKind = 'apps' | 'dashboards' | 'geniespaces' | 'notebooks'` and type the field as `entityKind?: EntityKind`. `Kind` reads cleaner than `Type` in TS (cf. `SyntaxKind` in TS compiler API).
- **Rationale:** The valid set is closed and documented; the type should reflect that. Generator anti-pattern: stringly-typed enums.

### 5. `entityId: string` doc inconsistency — `src/v1/model.ts:15,23,33,49`
- **Why weird:** Four occurrences of `entityId?: string | undefined`. The JSDoc reads: "The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name." So `entityId` is sometimes a name, sometimes an id, and the doc carves out one of the four entity kinds explicitly. There is no rule for what `entityId` looks like for `dashboards`/`geniespaces`/`notebooks`.
- **Category:** 6 (misleading — labelled `Id` but is "the app name" for apps), 19 (underspecified — what does it look like for the other three kinds?), 16 (field contradicts type domain — "id" suggests an opaque handle, but for apps it is a human-readable name).
- **Suggested name:** `entityRef` or `entity` (neutral). Combined with `EntityKind` from #4, the meaning of `entityRef` is "the identifier appropriate for this kind".
- **Rationale:** A field whose semantics changes per `entityType` should not be named after one of those semantics.

### 6. `Client` class — `src/v1/client.ts:41`
- **Why weird:** A class literally named `Client` re-exported through `index.ts:3` as plain `Client`. Sister packages `entitytagassignments` and `tagpolicies` ship `Client` classes of the same name. Three `Client`s across the tag-related sibling packages.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name losing meaning), 12 (duplicate concept across sister packages).
- **Suggested name:** `TagAssignmentsClient`. Forces aliasing only when co-imported, but reads as "the client for the tag-assignments surface".
- **Rationale:** Three `Client`s in three sister packages will collide on combined imports.

### 7. `createTagAssignment` / `deleteTagAssignment` / `getTagAssignment` / `listTagAssignments` / `updateTagAssignment` method names — `src/v1/client.ts:67,93,112,137,188`
- **Why weird:** Every method repeats the package's subject in the identifier. `client.createTagAssignment(...)` on a `Client` whose only job is tag assignments reads as "package.subject.create.subject". Sister package does the same with `createEntityTagAssignment`.
- **Category:** 7 (overly verbose), 8 (redundant suffix — repeats `TagAssignment` on every method when the client only manages `TagAssignment`).
- **Suggested name:** `create`, `delete`, `get`, `list`, `update` (drop the noun). Or `createAssignment` / `deleteAssignment` if the noun is desired.
- **Rationale:** Single-purpose clients should not repeat the subject. `TagAssignmentsClient.create()` reads cleaner.

### 8. `pageSize` here vs. `maxResults` in sister `entitytagassignments` — `src/v1/model.ts:35` vs. `entitytagassignments/src/v1/model.ts:68`
- **Why weird:** Same concept, two different field names across sister packages. This package: `pageSize?: number`. Sister: `maxResults?: number`. The wire-side names also diverge (`page_size` here, `max_results` there). Within a single SDK, the page-size parameter has two names depending on which tag flavor you use.
- **Category:** 12 (duplicate concept named differently across siblings), 17 (inconsistency between sibling fields).
- **Suggested name:** Pick one. `pageSize` is the more conventional name (matches `nextPageToken` here). `maxResults` is older.
- **Rationale:** Cross-SDK pagination naming consistency. Worth flagging upstream — generator-wide concern.

### 9. `tagKey` and `tagValue` on `TagAssignment` — `src/v1/model.ts:52,54`
- **Why weird:** The type is `TagAssignment` and the fields are `tagKey`/`tagValue`. Inside a `TagAssignment`, the `tag` prefix is redundant: `assignment.tagKey` reads as "the assignment's tag's key" when the assignment *is* a tag. Same in sister packages.
- **Category:** 8 (redundant prefix — `tag` within `TagAssignment`).
- **Suggested name:** `key` and `value` (drop the `tag` prefix). Wire stays `tag_key` / `tag_value`.
- **Rationale:** Fields should not re-state their container's noun. `assignment.key` reads cleaner.

### 10. `ListTagAssignmentsRequest.entityType` / `entityId` are functionally required but typed optional — `src/v1/model.ts:31,33` and used in URL at `client.ts:141`
- **Why weird:** The list URL is `/api/2.0/entity-tag-assignments/${entityType ?? ''}/${entityId ?? ''}/tags`. When either is undefined, the URL becomes `.../entity-tag-assignments///tags`. Both fields are typed `string | undefined`, but `entityType` and `entityId` are clearly required to address an entity. Same issue on `Get`/`Delete`/`Update`. The SDK silently produces malformed URLs.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make path-component fields required (non-optional) on the request types.
- **Rationale:** The shape `req.entityType ?? ''` betrays the contract: nullable input cannot legally produce a valid URL. Generator-wide concern.

## Medium severity

### 11. `CreateTagAssignmentRequest` etc. — five request DTOs share a 17-char prefix — `src/v1/model.ts:7,11,20,29,57`
- **Why weird:** `CreateTagAssignmentRequest`, `DeleteTagAssignmentRequest`, `GetTagAssignmentRequest`, `ListTagAssignmentsRequest`, `UpdateTagAssignmentRequest`. Every request type re-states `TagAssignment` in a package whose only subject *is* the tag assignment.
- **Category:** 7 (overly verbose), 8 (redundant suffix), 20 (type-suffix tautology — `*Request` plus an embedded noun).
- **Suggested name:** `CreateRequest`, `DeleteRequest`, `GetRequest`, `ListRequest`, `UpdateRequest`. Or drop the noun.
- **Rationale:** Single-subject packages do not need to repeat the subject on every request DTO.

### 12. `ListTagAssignmentsRequest` (plural) vs. `TagAssignment` (singular) — `src/v1/model.ts:29` vs. `src/v1/model.ts:46`
- **Why weird:** The plural appears only on list types. The HTTP resource on the wire is `/entity-tag-assignments` (plural) while the item type is singular `TagAssignment`. List response is `ListTagAssignmentsResponse` (plural).
- **Category:** 9 (singular/plural mismatch — present and intentional, but inconsistent vocabulary).
- **Suggested name:** Keep as-is (cross-SDK convention). Listed for completeness.
- **Rationale:** Rule 9 demands the flag even when intentional.

### 13. `executeCall` vs. `executeHttpCall` — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions named "execute". `executeCall` wraps retry/rate-limit policy; `executeHttpCall` does the actual HTTP send. In every client method both appear:
  ```ts
  const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
    ...
    const respBody = await executeHttpCall({...});
  };
  await executeCall(call, options);
  ```
  Names do not reveal the layering.
- **Category:** 1 (vague), 12 (duplicate concept — both "execute"), 17 (inconsistent layering name).
- **Suggested name:** `runWithPolicies(call, options)` for outer, `sendHttpRequest(opts)` for inner.
- **Rationale:** Layering should be readable from names. Generator-wide concern.

### 14. `Call` type and `call` variable — `src/v1/client.ts:74,98,118,152,201` and `src/v1/utils.ts:27`
- **Why weird:** Variable `call` of type `Call`, passed to `executeCall`. Same word as variable, type, and verb. Inside one method scope we have `req`, `call`, `httpReq`, `resp` — four roles, three of which abbreviate.
- **Category:** 1 (vague), 12 (duplicate concept).
- **Suggested name:** `runRequest`/`sendRequest` for the variable; keep `Call` as the type.
- **Rationale:** Variable-type collisions are tolerable but obscure prose.

### 15. URL composition with `req.entityType ?? ''` etc. — `src/v1/client.ts:97,116,141,192`
- **Why weird:** Four endpoints silently fall back to empty string for missing path components. When `entityType` is undefined the URL becomes `.../entity-tag-assignments//entity-id/tags/key`. Same problem flagged in other packages; specific instance here.
- **Category:** 6 (misleading — silent malformed URLs).
- **Suggested name:** Make `entityType`/`entityId`/`tagKey` non-optional on path-bearing request types.
- **Rationale:** See #10. Generator-wide concern.

### 16. `respBody` (bytes) vs. `resp` (parsed) — `src/v1/client.ts:78-83,122-128,156-161,211-216`
- **Why weird:** `respBody: Uint8Array` and `resp: TagAssignment` differ only by suffix. Both abbreviate "response"; the reader must remember which is bytes and which is parsed. There is no `reqBody` sibling for symmetry.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistency — only response abbreviates with `Body`).
- **Suggested name:** `rawBody`/`result`, or `responseBytes`/`response`.
- **Rationale:** Stage differences should be communicated by meaningful nouns, not suffix variations.

### 17. `httpReq` local variable — `src/v1/client.ts:77,101,121,155,204`
- **Why weird:** Inside methods that already have `req: <RequestType>`, a second variable `httpReq: HttpRequest` shares the `req` root. Two `req`s in the same scope.
- **Category:** 5 (cryptic abbreviation), 12 (duplicate concept — two `req`s).
- **Suggested name:** `httpRequest` (no abbreviation), or `wireRequest`.
- **Rationale:** Forking the same identifier across layers is hard to read.

### 18. `pageReq` clone variable in paginated list — `src/v1/client.ts:174`
- **Why weird:** A clone of `req` is named `pageReq`. The `Req` abbreviation gets re-applied with a `page` modifier; outer `req` is the parameter.
- **Category:** 5 (cryptic), 8 (redundant prefix — `page` in a pagination loop is implicit).
- **Suggested name:** `current` or `cursor` (describes its role as iterator state).
- **Rationale:** A variable that mutates a clone of the input should describe its role.

### 19. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Type called `Options` but it is an internal context bag (request + http client + logger), not a user-tunable options struct. The user-facing options type is `CallOptions` (different file). Two different `Options` types for two different concepts.
- **Category:** 1 (vague suffix `Options`), 8 (redundant suffix — internal bags should not be called `Options`).
- **Suggested name:** `HttpCallContext` or `HttpCallArgs`.
- **Rationale:** Reserve `Options` for caller-tunable knobs; use `Context`/`Args` for internal bags.

### 20. `buildHttpRequest` is just object-spread — `src/v1/utils.ts:96`
- **Why weird:** Pure object-literal-with-optional-fields helper named "build". "Build" suggests builder-pattern construction; the function just spreads fields into a struct.
- **Category:** 1 (vague — "build" suggests heavyweight construction), 6 (misleading — implies builder pattern).
- **Suggested name:** `makeHttpRequest` or inline at call sites.
- **Rationale:** "Build" carries Java/JS Builder-pattern connotations.

### 21. `AuthHttpClient` — `src/v1/transport.ts:43`
- **Why weird:** Class name encodes its implementation pattern: it is an `HttpClient` whose role is "wraps another HttpClient and injects auth headers". The JSDoc on line 42 literally reads "Wraps an HttpClient and adds authentication headers to requests." That is the Decorator/Wrapper architectural pattern leaking into the type name. The name describes the *how* (HTTP client decorator), not the *what* (authenticated transport).
- **Category:** proto-architectural-leak — `Wrapper`/`Adapter` style class whose name advertises a decorator implementation rather than the domain role.
- **Suggested name:** `AuthenticatingTransport`, `AuthenticatedTransport`, or `AuthInjector`. Drops the `HttpClient` infix that just restates the base interface it decorates.
- **Rationale:** A class whose only job is to add auth headers should be named for that job, not the wrapping mechanism. Sister packages all duplicate this class verbatim — generator-wide concern.

### 22. `TimeoutHttpClient` — `src/v1/transport.ts:61`
- **Why weird:** Same wrapper-name pattern as #21. JSDoc line 60: "Wraps an HttpClient and applies a default timeout to requests." Name encodes the wrapping mechanism (`HttpClient` suffix) plus the cross-cutting concern (`Timeout` prefix). Reads as `<concern><wrapped-type>` — a classic Decorator naming tell.
- **Category:** proto-architectural-leak — `Wrapper`/`Adapter` class whose name advertises a decorator-of-HttpClient implementation rather than the domain role.
- **Suggested name:** `TimeoutTransport`, `RequestTimeout`, or merge the timeout behavior into the base `newFetchHttpClient` so a separate type is unneeded.
- **Rationale:** `TimeoutHttpClient` is two architectural words concatenated: the concern (`Timeout`) and the wrapped interface (`HttpClient`). Domain names should describe behavior, not the OO pattern. Generator-wide concern — every package repeats this.

## Low severity

### 23. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Exported but unused in `client.ts`. This package's `listTagAssignments` uses individual `params.append(...)` calls (line 142-148) instead. Dead-shaped helper in shared scaffolding.
- **Category:** 6 (misleading — implies the package uses it).
- **Suggested name:** N/A — should not live here at all. Belongs in a shared utils package.
- **Rationale:** Generator-wide concern: every package duplicates this helper.

### 24. `readAll(body)` — `src/v1/utils.ts:40`
- **Why weird:** `readAll` is too generic; the function specifically drains a `ReadableStream<Uint8Array>` into a single buffer. The name does not say "drain a stream into a buffer".
- **Category:** 1 (vague), 5 (cryptic — `readAll` is JS-conventional but not self-describing).
- **Suggested name:** `drainStream` or `readStreamToUint8Array`.
- **Rationale:** Reads like it might take a file path or array.

### 25. `PACKAGE_SEGMENT` — `src/v1/client.ts:36`
- **Why weird:** `SEGMENT` is unspecific; the value is `{key, value}` for the User-Agent identity. The single word "segment" provides no domain context.
- **Category:** 1 (vague — `Segment` of what?).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT` or `PACKAGE_USER_AGENT_ID`.
- **Rationale:** Comment above the constant does the work the name should.

### 26. `tagValue` field doc empty — `src/v1/model.ts:53,54`
- **Why weird:** `tagValue?: string | undefined` is documented as "The value of the tag" — a tautology. Compare the rich docs on `entityType`/`entityId`/`tagKey` (with character-class rules). The doc is doing zero work.
- **Category:** 1 (vague — doc says nothing the field name does not), 15 (generic field doc).
- **Suggested name:** Document what makes a `tagValue` valid (max length? character set? same restrictions as `tagKey`?).
- **Rationale:** Asymmetric documentation: three fields have rules, one is silent.

## Observations

### 27. Action verb consistency
The client uses `create`/`get`/`update`/`delete`/`list` — no `fetch`/`retrieve`. Consistent across this package and aligned with sister packages.

### 28. `tagassignments` lowercase package name vs. types and HTTP path
The package directory is `tagassignments` (single token, no separator). Types are `TagAssignment` (PascalCase, no compound). HTTP path is `/entity-tag-assignments` (kebab and *with* `entity`). Three different naming conventions for the same concept across three surface layers. Same problem as sister packages.
- **Category:** 3 (casing inconsistency between directory token, kebab wire path, and Pascal types), 1 (vague directory token).

### 29. Domain leakage between sister packages
Three packages — `tagassignments`, `entitytagassignments`, `tagpolicies` — collide on the noun "tag". Each ships its own `Client`, its own `*TagAssignment`/`TagPolicy` type, and its own `tagKey`/`tagValue`. Co-import requires aliasing. The split aligns to wire-side API groupings (different HTTP paths and product surfaces), not to a user mental model of "tag tools". Worth flagging upstream as a structure-level concern, not just naming.
- **Category:** 12 (duplicate concept across siblings).

## Domain glossary
- `entity` — a Databricks platform resource being tagged. In this package, restricted to `apps`, `dashboards`, `geniespaces`, `notebooks` (per the JSDoc).
- `entity type` — string discriminator naming the kind of entity (closed set of 4 values, typed as open string).
- `entity id` — identifier of the entity. For apps, this is the app name. For the other three kinds, not documented in this package.
- `tag key` — string with character-class restrictions (no `,` `.` `:` `/` `-` `=` and no leading/trailing spaces).
- `tag value` — string with no documented constraints in this file.
- `tag assignment` — the (entityType, entityId, tagKey) -> tagValue triple.
- `tag policy` — a separate governed-tag concept; see sister package `tagpolicies`.
- `unity catalog entity tag assignment` — a separate but conceptually identical assignment over UC entities; see sister package `entitytagassignments`.

## File coverage
- `src/v1/model.ts` (115 lines): read fully.
- `src/v1/client.ts` (224 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (16 lines): read fully.
