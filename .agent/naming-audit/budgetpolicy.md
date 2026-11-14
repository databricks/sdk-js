# Naming Audit: budgetpolicy

**Path:** `packages/budgetpolicy/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 3

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 2 |

## High severity

### 1. `Filter` (bare top-level type) — `src/v1/model.ts:79`
- **Why weird:** Re-exported from `index.ts` as a bare top-level type. `Filter` is one of the most overloaded words in JS/TS (Array#filter, RxJS filter, content filters, etc.) and the type is package-scoped, so the name carries no hint of what it filters.
- **Category:** 1 (vague/generic).
- **Suggested name:** `BudgetPolicyFilter` (mirror `BudgetConfigurationFilter` in the `budgets` package).
- **Rationale:** A bare `Filter` provides zero discoverability. The sibling `budgets` package solves the same problem by exporting `BudgetConfigurationFilter`; this package should follow the same convention so the import surface is self-describing.

## Medium severity

### 1. `SortSpec` type — `src/v1/model.ts:151`
- **Why weird:** `Spec` is a generic suffix — every type is a spec of something. The suffix communicates nothing about what kind of specification this is or how it differs from a plain options bag.
- **Category:** 1 (vague suffix `Spec`).
- **Suggested name:** `SortOptions` or `SortOrder`.
- **Rationale:** `Spec` adds no information. A name that says what the type *describes* (sort options / sort order) is more direct.

### 2. `SortSpec_Field` enum name — `src/v1/model.ts:6`
- **Why weird:** Proto-architectural-leak: the underscore-joined `ParentType_NestedType` form is the protobuf/Go-SDK convention for emitting nested enum types into a flat namespace. TS already supports namespaces and modules natively, so the underscore is a wire-protocol artifact bleeding into the public TS API. The eslint-disable comment on the prior line even labels it "Proto-style nested enum name", confirming the generator knows it is non-idiomatic.
- **Category:** Proto-architectural leak (proto-style nested-type encoding leaking into TS identifiers).
- **Suggested name:** `SortField` (drop the `Spec_` prefix entirely; the enum stands on its own as the set of sortable fields) or `SortSpecField` (camel-join, no underscore).
- **Rationale:** TS consumers should not need to learn that `SortSpec.field`'s enum lives under a underscored sibling type. The proto nesting is invisible at the wire level — only the generator emits the `_`.
