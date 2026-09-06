# Naming Audit: systemschemas

**Path:** `packages/uc/systemschemas/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog *system schemas* (curated, server-managed schemas such as `access`, `billing`, `lineage`, `query`) — enable/disable a system schema in a metastore and list the system schemas under a metastore.
**Total weird names flagged:** 3

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 1 |
| Low | 1 |

## High severity

### 1. `SystemSchemaInfo` — `src/v1/model.ts:52`
- **Why weird:** `Info` is a generic, content-free suffix on the package's central domain entity. This is *the* system schema — it should just be `SystemSchema`. The `Info` suffix is on the vague-suffix list in `typescript.mdc`. It also infects the field name (`schemas: SystemSchemaInfo[]`) which awkwardly reads as "an array of info".
- **Category:** 1 (vague `Info`), 8 (redundant type suffix).
- **Suggested name:** `SystemSchema`.
- **Rationale:** `SystemSchema` is the noun consumers think about. `schemas: SystemSchema[]` reads cleanly; `schemas: SystemSchemaInfo[]` does not.

## Medium severity

### 2. `DisableSystemSchemaRequest.metastoreId: string | undefined` is in fact required — `src/v1/model.ts:9`
- **Why weird:** Marked optional, but `client.ts:77` template-interpolates `${req.metastoreId ?? ''}` straight into the URL path `metastores/.../systemschemas/...`. An empty path segment yields a malformed URL (or a 404). The "optional" annotation is misleading. Same pattern on `EnableSystemSchemaRequest.metastoreId`, `DisableSystemSchemaRequest.schema`, `EnableSystemSchemaRequest.schema`, `ListSystemSchemasRequest.metastoreId`.
- **Category:** 6 (misleading optionality), 16 (field type contradicts domain — these are mandatory path params).
- **Suggested name:** Keep names; change type to non-optional. (Out of scope for a *naming* audit, but the optionality leaks into how the names should be interpreted.)
- **Rationale:** Path-required fields must be required. Treating them as optional weakens the contract; the name `metastoreId` reads as "the metastore id" but the type says "you can omit this".

## Low severity

### 3. `nextPageToken` is `string | undefined` but server may also return empty-string — `src/v1/model.ts:49`, `client.ts:192`
- **Why weird:** `listSystemSchemasIter` (client.ts:192) checks `resp.nextPageToken === undefined || resp.nextPageToken === ''` to know it's done — i.e., the wire uses an empty string as a sentinel. The TS type `nextPageToken: string | undefined` doesn't capture this contract; readers must inspect the iterator code to learn that `''` is a terminator.
- **Category:** 6 (misleading — type allows `''` but doc says "Absent if there are no more pages"), 16 (field-vs-doc mismatch).
- **Suggested name:** Keep the name; tighten the contract by replacing `''` with `undefined` in the zod transform (model.ts:76-79) so callers see a consistent sentinel.
- **Rationale:** A naming review surfaces the contract drift even though the renaming target is the marshaller, not the field.
