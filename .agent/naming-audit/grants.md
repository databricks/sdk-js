# Naming Audit: grants

**Path:** `packages/uc/grants/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 1

## Summary
| Severity | Count |
| --- | --- |
| Medium | 1 |

---

## Medium severity

### 1. `EffectivePrivilegeAssignment` — `src/v1/model.ts:20`
- **Why weird:** Three-word PascalCase name (`Effective` + `Privilege` + `Assignment`) that on first read parses as "Effective Privilege" / "Assignment" but on second read could parse as "Effective" / "Privilege Assignment". The conceptual model is "the privilege assignment that effectively applies (because of inheritance)", which the doc-comment confirms — but the name doesn't disambiguate.
- **Category:** 7 (overly verbose).
- **Suggested name:** Possibly leave as-is; alternative is `EffectiveAssignment` (drop `Privilege` since `Assignment` is privilege-specific in this file).
- **Rationale:** Marginal; flagged for symmetry with `EffectivePrivilege` (line 5).

---
