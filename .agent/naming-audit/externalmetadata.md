# Naming Audit: externalmetadata

**Path:** `packages/externalmetadata/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 4

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Observation | 1 |

## High severity

### 1. `ExternalMetadata` — `src/v1/model.ts:43`
- **Why weird:** The central domain entity is named after the package, which is a noun phrase but not a noun ("External Metadata" is more an adjective+noun phrase than a thing). Compare: `Catalog`, `Connection`, `Schema` are crisp nouns; `ExternalMetadata` reads like a category, not an instance. Also: every field has the doc-string suffix "external metadata object" — the type is essentially `XxxObject` without the suffix, but the docs need it because the bare type name lacks objecthood.
- **Category:** 1 (vague — what is "an External Metadata"?), 6 (misleading: name reads as a kind, not an instance).
- **Suggested name:** `ExternalAsset` or `ExternalEntity` (the type already has a `entityType` field describing what shape of external thing it is). Alternatively, embrace the proto-canonical name with `ExternalMetadataObject`.
- **Rationale:** Reading `const x: ExternalMetadata = ...` does not communicate that `x` is a single named external asset. The JSDoc fix ("external metadata object") betrays that the type name needs help to read as a noun. Worth raising upstream.

### 2. `ListExternalMetadataResponseV2` — `src/v1/model.ts:94`
- **Why weird:** Type name carries the API version suffix `V2`, but the enclosing file is already `v1/model.ts` and the package is mounted at `./v1`. Version is encoded twice — once in the directory, once in the type. If the user later imports a hypothetical `v2/`, they would get `V3`? Versioning the entity name within the version namespace creates an off-by-one collision risk.
- **Category:** 8 (redundant suffix — version is in the path), 20 (type-suffix tautology between version-in-path and version-in-name), 14 (Go/proto-style — Go SDK carries the `V2` per RPC name; TS doesn't need it).
- **Suggested name:** `ListExternalMetadataResponse` (drop `V2`).
- **Rationale:** The directory is the namespace. Embedding the wire RPC version into the TS type name leaks an internal detail of the generator. If the package later gets a `v2/` directory, every type there ends up `V3` (one ahead of the dir), which is worse than the original problem.

### 3. `ExternalMetadataClient.createExternalMetadataV2` / `deleteExternalMetadataV2` / `getExternalMetadataV2` / `listExternalMetadataV2` / `updateExternalMetadataV2` / `listExternalMetadataV2Iter` — `src/v1/client.ts:72,107,132,165,204,226`
- **Why weird:** Every public method on `ExternalMetadataClient` ends with `V2`, but the directory is `v1/`. The version suffix is wire-RPC-name leakage (the upstream API is `ExternalMetadataServiceV2.Create`, hence `createExternalMetadataV2`). User code reads `client.createExternalMetadataV2(...)` for a method on a `v1/` import — confusing on first read.
- **Category:** 8 (redundant suffix), 14 (Go/proto-style name leak), 20 (type/version suffix tautology).
- **Suggested name:** `createExternalMetadata`, `deleteExternalMetadata`, etc. (drop `V2`).
- **Rationale:** The user's call site is `import {Client} from '@databricks/sdk-externalmetadata/v1'; client.createExternalMetadataV2(...)` — `V2` is wire-RPC noise. Version belongs in the import path, not the method name. Same problem as #2; generator-wide concern.

## Observations

### 4. Action-verb conventions in `Client`
The client uses `Create`/`Get`/`Update`/`Delete`/`List` consistently — no `Fetch`/`Retrieve`/`Read`/`Remove`. Verb consistency is good.
