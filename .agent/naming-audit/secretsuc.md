# Naming Audit: secretsuc

**Path:** `packages/uc/secrets/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog (UC) secrets — three-level namespaced (`catalog.schema.secret`) credential objects that store passwords/tokens/keys. Distinct from the workspace-level `secrets` package (scopes + key/value pairs). REST root is `/api/2.1/unity-catalog/secrets`.
**Total weird names flagged:** 6

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 3 |
| Observation | 2 |

## High severity

### 1. `fullName` is the routing key but marked optional — `src/v1/model.ts:23,32,115,152`
- **Why weird:** `fullName` is the only routing identifier for `DeleteSecret`, `GetSecret`, and `UpdateSecret` (the URL path is `/api/2.1/unity-catalog/secrets/${req.fullName ?? ''}` — `client.ts:114,144,258`). When unset, the client substitutes the empty string, producing a `DELETE /api/2.1/unity-catalog/secrets/` request that quietly hits the wrong endpoint. The TS type marks it `string | undefined`. Same field on `Secret` is also optional, which is correct for a returned object but wrong for the request DTO.
- **Category:** 6 (misleading — looks optional, isn't), 16 (field type contradicts domain — required key marked optional).
- **Suggested name:** Keep the name, drop `| undefined` on the three request DTOs (or split: `Secret.fullName?` for responses, `SecretRef.fullName` required for requests).
- **Rationale:** This is a routing identifier; the TS type system can prevent a whole class of "I forgot the name" bugs and the SDK can stop substituting empty strings.

## Medium severity

### 2. `ListSecretsRequest.catalogName` + `schemaName` as filters but documented as required-when-paired — `src/v1/model.ts:46,51`
- **Why weird:** JSDoc says "Both **catalog_name** and **schema_name** must be specified together". TS type marks both optional. The "must be specified together" constraint is enforced at the server, not in the type. A more honest shape would be `{ scope?: {catalogName: string; schemaName: string} | undefined }` so the pair must be set atomically.
- **Category:** 16 (field type contradicts domain — "must be together" not expressible).
- **Suggested name:** Keep names, group into a `scope` sub-object so paired-ness is type-enforced.
- **Rationale:** Internal grouping fix; not strictly a naming finding. Listed because the field names alone don't communicate the constraint, and the type system isn't carrying the weight.

### 3. `pageToken` / `nextPageToken` asymmetry — `src/v1/model.ts:61,81`
- **Why weird:** Request uses `pageToken`, response uses `nextPageToken`. Internally consistent with conventions across the SDK, but the asymmetry between "what I send" and "what I receive next time" is something the type system can't help with. The pagination iterator (`client.ts:241`) bridges them via `pageReq.pageToken = resp.nextPageToken`.
- **Category:** 17 (action-verb / qualifier asymmetry between request and response).
- **Suggested name:** Accept the convention (`nextPageToken` is the next page; you copy it to `pageToken` on the next request). Listed for completeness.
- **Rationale:** Generator convention; this isn't really a naming defect — flagged because rules 14 and 17 both ask about cross-DTO consistency.

### 4. `pageSize` semantic overloading: 0/negative/positive have distinct meanings — `src/v1/model.ts:62-70`
- **Why weird:** JSDoc enumerates four meanings of `pageSize`: unset = 10000, positive = min(value, 10000), zero = 10000, negative = error. The field type is `number | undefined` which expresses none of those. A reader of the type signature alone would believe any number works.
- **Category:** 16 (type contradicts domain — should be `positive integer | undefined`), 6 (misleading — zero has special meaning).
- **Suggested name:** Keep the name; consider a Zod refinement (`z.number().int().nonnegative()`) and document the zero-means-default specially.
- **Rationale:** API-level concern (the upstream API conflates "use default" and "0"); flagging at the SDK level because the type system is silent.

## Observations

### 5. Action-verb convention in `Client`
`createSecret` / `deleteSecret` / `getSecret` / `listSecrets` / `updateSecret` — fully consistent CRUDL verbs. No mixed `fetch`/`retrieve`. (Good.)

### 6. No enums in this package
No enum types are defined. (`secrets` workspace package has `AclPermission` and `ScopeBackendType`; this package exposes none.) This avoids the enum-prefix and enum-value-length problems that other audited packages have. Worth noting because the audit checklist asks about enum issues.
