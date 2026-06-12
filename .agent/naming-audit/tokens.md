# Naming Audit: tokens

**Path:** `packages/tokens/src/v1/`
**Versions audited:** v1
**Total weird names flagged:** 3

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Low | 1 |
| Observation | 1 |

## High severity

### 1. `PublicTokenInfo` type name — "public" is unmotivated — `model.ts:60-77`
- **Why weird:** Type is named `PublicTokenInfo` but the surrounding context contains no `PrivateTokenInfo`, `InternalTokenInfo`, or any other counterpart. The "Public" qualifier therefore communicates nothing to a TS reader. From the wire perspective, the Go SDK presumably has a parallel internal type that *isn't* exposed; in TS, that distinction is invisible. Compare to `tokenmanagement.AdminTokenInfo` (also "TokenInfo"-flavoured) — the package uses `Admin` to clarify the audience, but `Public` here doesn't.
- **Category:** 1 (vague qualifier), 6 (misleading — "Public" implies a public-vs-private dichotomy that doesn't surface in the SDK).
- **Suggested name:** `TokenInfo` (drop the `Public` prefix) or `UserTokenInfo` (parallel to `AdminTokenInfo` in `tokenmanagement`). The wire field `token_info` is bare anyway — the qualifier is purely cosmetic.
- **Rationale:** "Public" reads as a security qualifier (public-key, public-API) when the value is just "token metadata visible to the token owner". `UserTokenInfo` makes the audience explicit.

## Low severity

### 2. `publicTokenInfoFieldMask` exported helper — public-API field-mask builder — `model.ts:228`
- **Why weird:** The package exports `publicTokenInfoFieldMask(...)` as a top-level helper alongside the `Client`. Field-mask builders are an SDK-shape choice: making one a public export per type bakes the proto-FieldMask convention into the public API surface. Consumers writing `UpdateTokenRequest` payloads must learn this helper.
- **Category:** 8 (helper-as-public-API).
- **Suggested name:** Either hoist into a single `Client.updateToken` overload that accepts a partial payload and derives the mask, or document the helper prominently in `index.ts`.
- **Rationale:** Exporting per-type mask builders is a Go-port artefact; native TS would lean on `Partial<T>` + key inference.

## Observations

### 3. Method `updateToken` uses URL path interpolation on a potentially empty string — `client.ts:179`
`const url = \`${host}/api/2.0/token/${req.tokenId ?? ''}\`;` — when `req.tokenId` is unset, the URL becomes `${host}/api/2.0/token/` with a trailing slash, which the server may treat differently than a missing ID. Naming-adjacent: the type makes `tokenId` optional (`model.ts:93`), but the endpoint requires it. The TS surface doesn't enforce the required-ness. Not a naming issue per se — but a type-name fix (`tokenId: string` — required) would prevent the silent empty path.
