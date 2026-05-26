# Naming Audit: tagassignments

**Path:** `packages/tagassignments/src/v1/`
**Versions audited:** v1
**Inferred domain:** Tag assignment management for non-Unity-Catalog Databricks platform entities — specifically `apps`, `dashboards`, `geniespaces`, `notebooks`. Provides CRUD over (entityType, entityId, tagKey) -> tagValue triples through `/api/2.0/entity-tag-assignments`. Sister of `entitytagassignments` (Unity Catalog entities) and `tagpolicies` (governed tag definitions). Despite the package name and the URL path both being `entity-tag-assignments`-flavored, the primary type here is `TagAssignment` (no `Entity` prefix), unlike sister package `entitytagassignments`.
**Total weird names flagged:** 11

## Summary
| Severity | Count |
| --- | --- |
| High | 6 |
| Medium | 2 |
| Low | 0 |
| Observation | 3 |

## High severity

### 1. Package directory `tagassignments` vs. sister `entitytagassignments` and wire path `/entity-tag-assignments` — `package directory name`
- **Why weird:** This package is called `tagassignments` (no `entity` prefix). Its sister `entitytagassignments` shares the same wire path *prefix* and the same five operations. But its own HTTP path (line `client.ts:71`) is `/api/2.0/entity-tag-assignments` — so this package is named *without* `entity` even though the URL is *with* `entity`. The sister package is named *with* `entity` and its URL is `/api/2.1/unity-catalog/entity-tag-assignments`. The directory tokens do not predict the wire shape. Worse, both packages have a `Client` and the resource shape `(entityType, entityId-or-name, tagKey, tagValue)` is conceptually identical — only the entity universe (UC vs. apps/dashboards/etc.) differs.
- **Category:** 12 (duplicate concept across two packages), 1 (vague — what does `tagassignments` mean without `entity`?), 6 (misleading — name suggests "any tag assignment" but the package only covers four platform entity kinds).
- **Suggested name:** Rename to `platformtagassignments` or `appdashtags` to mark the scope, while renaming the sister `entitytagassignments` to `uctagassignments`. Alternatively, merge both into a unified `tagassignments` package with a discriminating `entityKind` field.
- **Rationale:** Two sister packages whose names diverge from their wire paths force users to memorize a name-to-API mapping. Without `entity` in this directory, the type `TagAssignment` here and `EntityTagAssignment` there look like different kinds of objects when they are not. Generator-level concern.

### 2. `TagAssignment` — `src/v1/model.ts:46`
- **Why weird:** The primary type `TagAssignment` is a tag assigned to an *entity* — every field on it (`entityType`, `entityId`, `tagKey`, `tagValue`) presupposes an entity. The name says "tag assignment" but the type really is "entity tag assignment". Yet sister package `entitytagassignments` does include the `Entity` prefix on its type. So the SDK has both `TagAssignment` and `EntityTagAssignment` for the same conceptual shape.
- **Category:** 1 (vague — assignment to what?), 12 (duplicate concept naming across siblings), 16 (no `Entity` prefix when sister package has it for the same concept).
- **Suggested name:** Either pick `EntityTagAssignment` here too (and rename type-collisions out at re-export), or rename the sister to drop `Entity` and use package-scoped imports. Pick one.
- **Rationale:** The naming asymmetry between sister types is the actual bug. Both should be the same name, with disambiguation via import.

### 3. `entityType: string` — `src/v1/model.ts:13,22,31,48`
- **Why weird:** Four occurrences of `entityType?: string | undefined`. The JSDoc lists allowed values inline: "apps, dashboards, geniespaces, notebooks". A closed set of four values lives in plain prose, not in the type. Users will pass typos with no compile-time check.
- **Category:** 1 (vague — `string` for what is really an enum), 19 (underspecified ID — what values are valid?), 6 (misleading — looks free-form, is actually constrained), 16 (field contradicts type — closed set typed as open string).
- **Suggested name:** Introduce `EntityKind = 'apps' | 'dashboards' | 'geniespaces' | 'notebooks'` and type the field as `entityKind?: EntityKind`. `Kind` reads cleaner than `Type` in TS (cf. `SyntaxKind` in TS compiler API).
- **Rationale:** The valid set is closed and documented; the type should reflect that. Generator anti-pattern: stringly-typed enums.

### 4. `Client` class — `src/v1/client.ts:41`
- **Why weird:** A class literally named `Client` re-exported through `index.ts:3` as plain `Client`. Sister packages `entitytagassignments` and `tagpolicies` ship `Client` classes of the same name. Three `Client`s across the tag-related sibling packages.
- **Category:** 1 (vague — `Client` is the most generic possible name), 15 (generic name losing meaning), 12 (duplicate concept across sister packages).
- **Suggested name:** `TagAssignmentsClient`. Forces aliasing only when co-imported, but reads as "the client for the tag-assignments surface".
- **Rationale:** Three `Client`s in three sister packages will collide on combined imports.

### 5. `pageSize` here vs. `maxResults` in sister `entitytagassignments` — `src/v1/model.ts:35` vs. `entitytagassignments/src/v1/model.ts:68`
- **Why weird:** Same concept, two different field names across sister packages. This package: `pageSize?: number`. Sister: `maxResults?: number`. The wire-side names also diverge (`page_size` here, `max_results` there). Within a single SDK, the page-size parameter has two names depending on which tag flavor you use.
- **Category:** 12 (duplicate concept named differently across siblings), 17 (inconsistency between sibling fields).
- **Suggested name:** Pick one. `pageSize` is the more conventional name (matches `nextPageToken` here). `maxResults` is older.
- **Rationale:** Cross-SDK pagination naming consistency. Worth flagging upstream — generator-wide concern.

### 6. `ListTagAssignmentsRequest.entityType` / `entityId` are functionally required but typed optional — `src/v1/model.ts:31,33` and used in URL at `client.ts:141`
- **Why weird:** The list URL is `/api/2.0/entity-tag-assignments/${entityType ?? ''}/${entityId ?? ''}/tags`. When either is undefined, the URL becomes `.../entity-tag-assignments///tags`. Both fields are typed `string | undefined`, but `entityType` and `entityId` are clearly required to address an entity. Same issue on `Get`/`Delete`/`Update`. The SDK silently produces malformed URLs.
- **Category:** 6 (misleading — optional in type but required in practice).
- **Suggested name:** Make path-component fields required (non-optional) on the request types.
- **Rationale:** The shape `req.entityType ?? ''` betrays the contract: nullable input cannot legally produce a valid URL. Generator-wide concern.

## Medium severity

### 7. `ListTagAssignmentsRequest` (plural) vs. `TagAssignment` (singular) — `src/v1/model.ts:29` vs. `src/v1/model.ts:46`
- **Why weird:** The plural appears only on list types. The HTTP resource on the wire is `/entity-tag-assignments` (plural) while the item type is singular `TagAssignment`. List response is `ListTagAssignmentsResponse` (plural).
- **Category:** 9 (singular/plural mismatch — present and intentional, but inconsistent vocabulary).
- **Suggested name:** Keep as-is (cross-SDK convention). Listed for completeness.
- **Rationale:** Rule 9 demands the flag even when intentional.

### 8. URL composition with `req.entityType ?? ''` etc. — `src/v1/client.ts:97,116,141,192`
- **Why weird:** Four endpoints silently fall back to empty string for missing path components. When `entityType` is undefined the URL becomes `.../entity-tag-assignments//entity-id/tags/key`. Same problem flagged in other packages; specific instance here.
- **Category:** 6 (misleading — silent malformed URLs).
- **Suggested name:** Make `entityType`/`entityId`/`tagKey` non-optional on path-bearing request types.
- **Rationale:** See #6. Generator-wide concern.

## Low severity

_None._

## Observations

### 9. Action verb consistency
The client uses `create`/`get`/`update`/`delete`/`list` — no `fetch`/`retrieve`. Consistent across this package and aligned with sister packages.

### 10. `tagassignments` lowercase package name vs. types and HTTP path
The package directory is `tagassignments` (single token, no separator). Types are `TagAssignment` (PascalCase, no compound). HTTP path is `/entity-tag-assignments` (kebab and *with* `entity`). Three different naming conventions for the same concept across three surface layers. Same problem as sister packages.
- **Category:** 3 (casing inconsistency between directory token, kebab wire path, and Pascal types), 1 (vague directory token).

### 11. Domain leakage between sister packages
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
