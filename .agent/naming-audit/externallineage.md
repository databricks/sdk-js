# Naming Audit: externallineage

**Path:** `packages/uc/externallineage/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 2

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Low | 1 |

## High severity

### 1. `ExternalLineageRelationshipObject.tpe` discriminator — `src/v1/model.ts:130`
- **Why weird:** Field literally spelled `tpe` (three letters, missing the `y`). `type` is a reserved-ish word in TS but is allowed as a property name; this is a workaround for something that doesn't need a workaround. The marshalling code at `model.ts:550-557` confirms this is the *only* discriminator field — wire payload has no `tpe` key, it's spread into `table`/`path`/`model_version`/`external_metadata` directly.
- **Category:** 5 (cryptic abbreviation), 10 (reserved-word collision-avoidance).
- **Suggested name:** Use a TS discriminated union with `$case` directly (no outer `tpe` field): `ExternalLineageRelationshipObject = {$case: 'table', table: ...} | {$case: 'path', path: ...} | ...`. If the wrapper must stay, name the field `kind` or `objectType`.
- **Rationale:** TS allows `type` as a property name, so the cryptic `tpe` solves a problem TS does not have.

## Low severity

### 2. `LineageFileInfo.securableName`, `securableType`, `storageLocation` — `src/v1/model.ts:169-173`
- **Why weird:** Type is `LineageFileInfo` but three of its four data-bearing fields are about a *securable* (which the JSDoc says lives "on the path"). The type is mostly about the securable, not the file. Three fields named with `securable*` on a type called `*FileInfo` looks like the type name was chosen too early.
- **Category:** 6 (misleading type name — `FileInfo` advertises "info about a file" but it's "info about a securable on a file").
- **Suggested name:** `LineageFileSecurableInfo`, to reflect that the type is mostly about the securable rather than the file.
- **Rationale:** Type name should reflect the dominant content; current name is misleading.
