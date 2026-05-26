# Naming Audit: entitytagassignments

**Path:** `packages/entitytagassignments/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog entity tag assignments — create/get/list/update/delete key/value tags on UC entities (tables, schemas, columns, volumes, etc.), with provenance (`sourceType`) metadata. Sister of `tagassignments` (non-UC entities: apps, dashboards, geniespaces, notebooks) and `tagpolicies` (governed tag definitions).
**Total weird names flagged:** 10

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 2 |
| Low | 0 |
| Observation | 3 |

## High severity

### 1. Package name `entitytagassignments` vs. sister `tagassignments` — `package directory name`
- **Why weird:** Two packages exist whose names differ only by the prefix `entity`: `entitytagassignments` (Unity Catalog tables/schemas/columns) and `tagassignments` (apps, dashboards, geniespaces, notebooks). Both model "a tag assigned to a thing", both expose the same five operations (Create/Get/List/Update/Delete), and both have a primary type called `(Entity)TagAssignment`. The split mirrors a backend HTTP-path split (`/api/2.1/unity-catalog/entity-tag-assignments` vs. `/api/2.0/tag-assignments`) that is invisible to TS users.
- **Category:** 12 (duplicate concept across two packages — overlapping responsibility), 1 (vague: what is a non-entity tag assignment?), 16 (the field `entityType` in `tagassignments` carries the *exact same* notion that the prefix `entity` carries here, so the disambiguating prefix is doubly redundant).
- **Suggested name:** Merge into a single package `tagassignments` keyed by `entityKind` ("uc" vs. "platform"), or rename to `uctagassignments` so the surface marker is "uc", not "entity". The non-UC sibling can drop its own `entityType` field discrimination and become `platformtagassignments`. As a smaller fix: `unitycatalogtags` here, `platformtags` there.
- **Rationale:** Two `Client` classes called `Client`, with two `TagAssignment` / `EntityTagAssignment` types, both shipping `tagKey`/`tagValue`/`entityType`, will collide in user imports and force aliasing on every co-use. The split exists for backend reasons but leaks raw into the SDK. Worth flagging upstream as a generator-level concern.

### 2. `TagAssignmentSourceType` — `src/v1/model.ts:9`
- **Why weird:** Three-word enum name `TagAssignmentSourceType`. "Source" + "Type" is a tautology — an enum *is* a type, so `*Type` suffix is filler. Combined with the surrounding type `EntityTagAssignment`, the relevant field is `sourceType: TagAssignmentSourceType` — five words to say "where did this come from".
- **Category:** 20 (type-suffix tautology — `Type` on an enum), 7 (overly verbose).
- **Suggested name:** `TagSource` (drop both `Assignment` and `Type`). Field becomes `source: TagSource`.
- **Rationale:** The shorter name is unambiguous in context (`EntityTagAssignment.source` reads better than `EntityTagAssignment.sourceType`). Sister Unity Catalog packages have analogous enums like `Privilege`, `SchemaType` — `Type` suffix is used inconsistently across the SDK.

### 3. `entityType: string` everywhere — `src/v1/model.ts:28,40,56,68`
- **Why weird:** Four occurrences of `entityType?: string | undefined` with no enum or string-literal union to constrain values. The JSDoc says "The type of the entity to which the tag is assigned" but never lists which values are valid (compare sister `tagassignments`: doc explicitly lists `apps, dashboards, geniespaces, notebooks`). For Unity Catalog entities, the actual valid set is something like `table`, `schema`, `catalog`, `column`, `volume`, `function`, `model` — none of which is documented or constrained in the type.
- **Category:** 1 (vague — `string` for what is really an enum), 19 (underspecified ID — what type strings are valid?), 6 (misleading — looks free-form, is actually constrained).
- **Suggested name:** `EntityKind` (string-literal union or enum) typed as the field. E.g. `entityKind?: 'table' | 'schema' | 'catalog' | 'column' | 'volume' | 'function' | 'model'`. The field name `Type` also collides with the JS reserved-ish word — `Kind` reads more cleanly.
- **Rationale:** Stringly-typed enum fields are a generator anti-pattern. The valid set is closed; the type should say so. `Type` as a noun is also overused — `Kind` is the convention in TS standard library (`SyntaxKind`, `NodeKind`).

### 4. `tagKey` field doc inconsistency: required marker on get/delete, not on `EntityTagAssignment` — `src/v1/model.ts:26,36,54`
- **Why weird:** `DeleteEntityTagAssignmentRequest.tagKey` says "Required. The key of the tag to delete". `GetEntityTagAssignmentRequest.tagKey` says "Required. The key of the tag". But `EntityTagAssignment.tagKey` (on the actual returned/created object) and `CreateEntityTagAssignmentRequest.tagAssignment.tagKey` are documented as just "The key of the tag" with no required marker — yet you cannot create or get a tag without a key. The `?: string | undefined` typing makes all of them optional in TS. Type and doc disagree.
- **Category:** 6 (misleading — type says optional, semantics says required), 17 (inconsistent — some docs say "Required.", others don't, for what is the same logical field).
- **Suggested name:** Keep `tagKey`; make non-optional (`tagKey: string`) and remove the "Required." doc preamble since the type enforces it. Apply uniformly across all four request types and the assignment type itself.
- **Rationale:** "Required." in a docstring while the type is optional is a generator smell. Honest required-ness should travel through the type.

### 5. `Client` class — `src/v1/client.ts:41`
- **Why weird:** A class literally named `Client` at the top level of the package's public API, re-exported through `index.ts:3` as just `Client`. The other tag packages (`tagassignments`, `tagpolicies`) ship their own `Client` class with the same name. Three `Client` classes in three sister packages.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name), 12 (duplicate concept across sister packages).
- **Suggested name:** `EntityTagAssignmentsClient` (or `UnityCatalogTagsClient`).
- **Rationale:** Three sister packages with three `Client`s will collide on combined imports and force aliasing. Generator-level concern.

## Medium severity

### 6. `ListEntityTagAssignmentsRequest` (plural) vs. `EntityTagAssignment` (singular) — `src/v1/model.ts:60` vs. `src/v1/model.ts:32`
- **Why weird:** The plural appears only on the list endpoint; the rest of the surface is singular. Singular/plural mix is consistent with the Go SDK and other packages, but worth flagging that the resource name on the wire is `/entity-tag-assignments` (plural) while the type name is singular `EntityTagAssignment`. The list response is `ListEntityTagAssignmentsResponse` (plural).
- **Category:** 9 (singular/plural mismatch — present and intentional, but inconsistent vocabulary).
- **Suggested name:** Keep as is (this is the cross-SDK convention). Listed for completeness.
- **Rationale:** Listed only to confirm: List endpoints use plural, item type is singular. No fix needed; flagged because rule 9 demands the audit.

### 7. `req.entityType ?? ''` / `req.entityName ?? ''` / `req.tagKey ?? ''` URL composition — `src/v1/client.ts:118,137,167,230`
- **Why weird:** Four endpoints silently substitute empty string for missing path components. `req.entityType` and `req.entityName` and `req.tagKey` are typed `string | undefined` but functionally required (URL is broken without them). When `entityType` is undefined the URL becomes `.../entity-tag-assignments//entity-name/tags/key`. Same problem flagged in `dataclassification` audit.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make path-component fields required (non-optional) on the request types.
- **Rationale:** Field name promises less than the API requires; the SDK silently produces malformed URLs.

## Low severity

_None._

## Observations

### 8. Action verb consistency
The client uses `create`/`get`/`update`/`delete`/`list` — no `fetch`/`retrieve`. Consistent across this package and aligned with sister packages.

### 9. Acronym casing
The file uses `HttpRequest`, `HttpResponse`, `HttpCallOptions` (Pascal `Http`), `URLSearchParams` (web standard `URL`), `userAgent` (camelCase). The `Http` vs. `URL` split is the JS-ecosystem norm. No `Id`/`Uri`/`UC` casing clashes encountered.
- **Category:** 3 (acronym casing — consistent within the file, ecosystem-divergent overall).

### 10. Domain leakage from sister packages
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
- `source type` — provenance of the assignment: user vs. data-classification (today, only `SYSTEM_DATA_CLASSIFICATION` is enumerated).

## File coverage
- `src/v1/model.ts` (161 lines): read fully.
- `src/v1/client.ts` (265 lines): read fully.
- `src/v1/utils.ts` (150 lines): read fully.
- `src/v1/index.ts` (15 lines): read fully.
