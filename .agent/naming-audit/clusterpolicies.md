# Naming Audit: `clusterpolicies` (v2)

**Package:** `@databricks/sdk-clusterpolicies`
**Path:** `/home/parth.bansal/sdk-js/packages/clusterpolicies/`
**Version audited:** `v2`
**Files audited:**

- `src/v2/model.ts`
- `src/v2/client.ts`
- `src/v2/index.ts`

---

## Summary

| Severity  | Count |
| --------- | ----- |
| High      | 0     |
| Medium    | 3     |
| Low       | 0     |
| **Total** | **3** |

Total weird names flagged: 3.

---

## Medium

### 1. `MavenLibrary` (`model.ts:193`)

Type-suffix tautology. The type already lives in a `Library` discriminated
union; the `Library` suffix is redundant when accessed as
`library.lib.$case === 'maven' ? library.lib.maven : ...` — the value's
*position* in the union already identifies it as a library variant.
`MavenSpec` or just `Maven` would suffice.

### 2. `PythonPyPiLibrary` (`model.ts:257`)

Type-suffix tautology. Same as finding 1. Could be `PyPISpec`.

### 3. `RCranLibrary` (`model.ts:270`)

Type-suffix tautology. Same as finding 1. Could be `CRANSpec`.
