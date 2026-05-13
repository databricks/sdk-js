# Naming Audit: serviceprincipalsecretsproxy

**Path:** `packages/serviceprincipalsecretsproxy/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level CRUD over OAuth client secrets attached to a
service principal (create, list, delete), exposed as a "proxy" variant whose
surface area is byte-identical to the sibling `serviceprincipalsecrets`
package.
**Total weird names flagged:** 33

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `serviceprincipalsecretsproxy` | (package) | package | High | 12 Duplicate concepts | Byte-identical to sibling `serviceprincipalsecrets` — every v1 source file (`client.ts`, `model.ts`, `utils.ts`, `index.ts`) has the same MD5; only the npm package name differs. |
| 2 | package `serviceprincipalsecretsproxy` | (package) | package | High | 7 Overly verbose, 14 Go/Java-style names not idiomatic TS | 33-character, undelimited compound. Already the longest package name in the SDK; the "proxy" suffix piles onto an already-long base. Consider `sp-secrets-proxy` or a subpath of `serviceprincipalsecrets`. |
| 3 | package `serviceprincipalsecretsproxy` | (package) | package | Medium | 6 Misleading names | "Proxy" appears nowhere in the model, client, or URL (`/api/2.0/accounts/.../servicePrincipals/.../credentials/secrets` is the same path used by the non-proxy package). The package name promises a different transport that does not exist in the code. |
| 4 | `CreateServicePrincipalSecret` | model.ts:6 | interface | Medium | 7 Overly verbose, 13 Verb-tense inconsistency | 29-char identifier; lacks the `Request` suffix that the rest of the SDK uses for input shapes (`DeleteServicePrincipalSecret` and `ListServicePrincipalSecrets` have the same problem — see #11/#16). The name reads like an action (verb phrase) rather than a request payload. |
| 5 | `CreateServicePrincipalSecret.servicePrincipal` | model.ts:10 | field | High | 19 Underspecified IDs, 15 Generic field names losing meaning, 16 Field contradicting type domain | Field is `servicePrincipal: string` but the JSDoc says "The service principal ID" — the value is an ID, not the full SP object. Should be `servicePrincipalId`. Same offender in `DeleteServicePrincipalSecret` and `ListServicePrincipalSecrets`. |
| 6 | `CreateServicePrincipalSecret.lifetime` | model.ts:12 | field | Low | 1 Vague/generic without domain context | `lifetime: Temporal.Duration` — generic; `secretLifetime` or `ttl` would be clearer. The default-730-days note is essential and lives only in JSDoc. |
| 7 | `CreateServicePrincipalSecretResponse` | model.ts:15 | interface | Medium | 7 Overly verbose, 12 Duplicate concepts | 37-char identifier and structurally identical to `ServicePrincipalSecret` (model.ts:66) — same seven fields in the same order with the same JSDoc. One of the two is redundant; the response wrapper could be `type CreateServicePrincipalSecretResponse = ServicePrincipalSecret`. |
| 8 | `CreateServicePrincipalSecretResponse.id` | model.ts:17 | field | Medium | 19 Underspecified IDs, 15 Generic field names losing meaning | `id?: string` — what is the ID of? The JSDoc clarifies "ID of the secret"; rename to `secretId` to match `DeleteServicePrincipalSecret.secretId`. Same issue in `ServicePrincipalSecret.id`. |
| 9 | `CreateServicePrincipalSecretResponse.secret` | model.ts:19 | field | Medium | 1 Vague/generic without domain context, 15 Generic field names losing meaning | `secret?: string` inside `ServicePrincipalSecret` reads as `ServicePrincipalSecret.secret` — meaningless self-reference. Rename to `secretValue` (the JSDoc already calls it "Secret Value"). |
| 10 | `CreateServicePrincipalSecretResponse.secretHash` | model.ts:21 | field | Low | 1 Vague/generic without domain context | Plain `secretHash: string` — no hash algorithm noted. The wire JSON sends `secret_hash`; doc does not specify SHA-256, SHA-512, etc. |
| 11 | `CreateServicePrincipalSecretResponse.status` | model.ts:27 | field | Medium | 1 Vague/generic without domain context, 4 Underscores in TS identifiers (wire) | `status?: string` — completely untyped. Likely an enum on the server (`ACTIVE`/`REVOKED`/`EXPIRED`), but TS callers see a free-form string with zero discoverability. |
| 12 | `CreateServicePrincipalSecretResponse.createTime` / `updateTime` | model.ts:23, 25 | field | Medium | 16 Field contradicting type domain | Typed as `string` while the sibling `expireTime` (model.ts:29) is `Temporal.Instant`. Wire form is the same ISO-8601 timestamp for all three — the asymmetric typing is a generator bug, not an intentional API choice. |
| 13 | `CreateServicePrincipalSecretResponse.expireTime` | model.ts:29 | field | Low | 3 Acronym casing inconsistencies | Inconsistent with `createTime` / `updateTime` typing (see #12). |
| 14 | `DeleteServicePrincipalSecret` | model.ts:32 | interface | Medium | 7 Overly verbose, 13 Verb-tense inconsistency | Same problem as #4: name is a verb phrase ("Delete a SP secret"), not a payload type; lacks `Request` suffix. |
| 15 | `DeleteServicePrincipalSecret.secretId` | model.ts:38 | field | Low | 19 Underspecified IDs | Good in isolation, but the request also carries `servicePrincipal: string` which is *also* an ID — naming asymmetry: one field has `Id`, the other doesn't (see #5). |
| 16 | `DeleteServicePrincipalSecret_Response` | model.ts:42 | interface | High | 4 Underscores in TS identifiers, 14 Go/Java-style names not idiomatic TS | Protobuf-style underscore in the TS identifier; requires `eslint-disable-next-line @typescript-eslint/naming-convention`. Should be `DeleteServicePrincipalSecretResponse` (PascalCase, no underscore). |
| 17 | `ListServicePrincipalSecrets` | model.ts:44 | interface | Medium | 7 Overly verbose, 13 Verb-tense inconsistency, 9 Singular/plural mismatches | Plural form ("ListServicePrincipalSecret*s*") is a verb phrase, not a request payload type. Singular vs plural inconsistency with the other two requests in the same file. Rename to `ListServicePrincipalSecretsRequest`. |
| 18 | `ListServicePrincipalSecrets.pageToken` | model.ts:54 | field | Low | 18 Long enum values (analogous) | Field is fine, but the JSDoc is 358 chars long for one field — out of proportion. Worth surfacing on the type itself or in package docs. |
| 19 | `ListServicePrincipalSecrets.pageSize` | model.ts:55 | field | Low | 1 Vague/generic without domain context | Field has no JSDoc at all (unlike `pageToken` which has 4 lines). Inconsistent within the same interface. |
| 20 | `ListServicePrincipalSecrets_Response` | model.ts:59 | interface | High | 4 Underscores in TS identifiers, 14 Go/Java-style names not idiomatic TS | Protobuf-style underscore in TS identifier; needs an `eslint-disable-next-line` for `@typescript-eslint/naming-convention`. Should be `ListServicePrincipalSecretsResponse`. |
| 21 | `ListServicePrincipalSecrets_Response.secrets` | model.ts:61 | field | Low | 9 Singular/plural mismatches | Plural is correct. JSDoc says "List of the secrets" — phrasing nit, "List of secrets" would read better. |
| 22 | `ServicePrincipalSecret` | model.ts:66 | interface | Medium | 12 Duplicate concepts | Structurally identical to `CreateServicePrincipalSecretResponse` (see #7). Two names for one shape. |
| 23 | `ServicePrincipalSecret.id` / `secret` / `secretHash` / `status` | model.ts:68, 70, 72, 78 | field | Medium | 1 Vague/generic without domain context | Same vague-field issues as the response copy (#8-#11). |
| 24 | `unmarshalCreateServicePrincipalSecretResponseSchema` | model.ts:83 | const | Medium | 7 Overly verbose, 20 Type-suffix tautology | 50-char identifier. `Schema` suffix is redundant with the `z.ZodType<...>` annotation; the leading `unmarshal` is Go-idiom (see #29). |
| 25 | `unmarshalDeleteServicePrincipalSecret_ResponseSchema` | model.ts:108 | const | High | 4 Underscores in TS identifiers, 7 Overly verbose | 52-char identifier that includes an embedded underscore; needs `eslint-disable-next-line @typescript-eslint/naming-convention`. |
| 26 | `unmarshalListServicePrincipalSecrets_ResponseSchema` | model.ts:112 | const | High | 4 Underscores in TS identifiers, 7 Overly verbose | Same underscore + verbosity issue as #25. |
| 27 | `unmarshalServicePrincipalSecretSchema` | model.ts:125 | const | Low | 20 Type-suffix tautology | `Schema` suffix is tautological with the `z.ZodType<ServicePrincipalSecret>` annotation. |
| 28 | `marshalCreateServicePrincipalSecretSchema` | model.ts:149 | const | Low | 17 Inconsistent action verbs, 20 Type-suffix tautology | Same as #27, plus: pairing is `marshal*`/`unmarshal*` (Go-idiom — TS norm would be `encode`/`decode` or `serialize`/`deserialize`). Note this const has type `z.ZodType` *without* a generic argument while every sibling unmarshal const supplies one. |
| 29 | `marshal`/`unmarshal` verbs (whole file) | model.ts:83, 108, 112, 125, 149 | naming pattern | Low | 14 Go/Java-style names not idiomatic TS, 17 Inconsistent action verbs | Direct Go transliteration. TS ecosystem uses `JSON.stringify` / `JSON.parse`, `encode` / `decode`, or `serialize` / `deserialize`. |
| 30 | `Client` | client.ts:42 | class | Medium | 1 Vague/generic without domain context | Top-level `Client` with no qualifier. Once two Databricks clients are imported in the same module, every one is just `Client`. Should be `ServicePrincipalSecretsProxyClient` or aliased on export. |
| 31 | `Client.createServicePrincipalSecret` / `deleteServicePrincipalSecret` / `listServicePrincipalSecrets` | client.ts:72, 101, 129 | method | Medium | 7 Overly verbose | Inside a class named `Client` (let alone a class that should be `ServicePrincipalSecretsClient`), repeating `ServicePrincipalSecret` in every method name is stutter. `create(req)` / `delete(req)` / `list(req)` would read cleanly. |
| 32 | `Client.listServicePrincipalSecretsIter` | client.ts:165 | method | Medium | 7 Overly verbose, 14 Go/Java-style names not idiomatic TS, 5 Cryptic abbreviations | `Iter` suffix is a Go-idiom (`func ListSomethingIter()`). TS `AsyncGenerator` returns are conventionally named without suffixes, or with `*All` / `*Stream`. Combined with the already-verbose method root, this is a 37-character identifier. |
| 33 | `PACKAGE_SEGMENT` | client.ts:37 | const | Low | 1 Vague/generic without domain context | Used only to assemble the User-Agent header. `USER_AGENT_PACKAGE_SEGMENT` makes the call site self-explanatory. |

---

## High severity (must fix)

### H1. Whole-package duplication: `serviceprincipalsecretsproxy` vs `serviceprincipalsecrets`

The two packages are **byte-identical** for every v1 source file:

```
0ba0e7b4804049f95901c6ab28544f4c  serviceprincipalsecretsproxy/src/v1/client.ts
0ba0e7b4804049f95901c6ab28544f4c  serviceprincipalsecrets/src/v1/client.ts

646849b8cf7ab85f40ddf9b739edfada  serviceprincipalsecretsproxy/src/v1/index.ts
646849b8cf7ab85f40ddf9b739edfada  serviceprincipalsecrets/src/v1/index.ts

f9014e9e042313f049de187a2cd772d1  serviceprincipalsecretsproxy/src/v1/model.ts
f9014e9e042313f049de187a2cd772d1  serviceprincipalsecrets/src/v1/model.ts

0a0a7cd6d9c9e2d5424595de5ffb3630  serviceprincipalsecretsproxy/src/v1/utils.ts
0a0a7cd6d9c9e2d5424595de5ffb3630  serviceprincipalsecrets/src/v1/utils.ts
```

Same seven exported types
(`CreateServicePrincipalSecret`,
`CreateServicePrincipalSecretResponse`,
`DeleteServicePrincipalSecret`,
`DeleteServicePrincipalSecret_Response`,
`ListServicePrincipalSecrets`,
`ListServicePrincipalSecrets_Response`,
`ServicePrincipalSecret`), same four client methods (`createServicePrincipalSecret`,
`deleteServicePrincipalSecret`, `listServicePrincipalSecrets`,
`listServicePrincipalSecretsIter`), same URL path
(`/api/2.0/accounts/<id>/servicePrincipals/<sp>/credentials/secrets`).

The user instruction calls out: *"Pay extra attention: the 'proxy' variant
should be flagged for being a duplicate of `serviceprincipalsecrets`."*
Confirmed in the strongest possible way — there is literally no code-level
difference. The only thing distinguishing the two packages is the npm name
(`@databricks/sdk-serviceprincipalsecrets` vs
`@databricks/sdk-serviceprincipalsecretsproxy`). Either:

- Merge the two packages, or
- Surface the proxy semantics in the types/URL (`ProxyClient`, a different
  path, additional fields).

Until that is done, every consumer must guess which package to import; once
imported, the symbols collide on re-export.

### H2. `servicePrincipal: string` is an ID, not the principal

```ts
export interface CreateServicePrincipalSecret {
  servicePrincipal?: string | undefined; // JSDoc: "The service principal ID."
}
```

Same field appears in `DeleteServicePrincipalSecret` (model.ts:35) and
`ListServicePrincipalSecrets` (model.ts:48). The field's name asserts the
value is a `ServicePrincipal` object but it is actually an ID string. This is
also internally inconsistent with `DeleteServicePrincipalSecret.secretId`
(model.ts:38) — same file, one ID field has `Id`, another doesn't.

Rename to `servicePrincipalId` everywhere.

### H3. Protobuf-style underscore identifiers leak into TS

Three identifiers carry an embedded `_` that requires `eslint-disable-next-line`
comments at every declaration:

- `DeleteServicePrincipalSecret_Response` (model.ts:42)
- `ListServicePrincipalSecrets_Response` (model.ts:59)
- `unmarshalDeleteServicePrincipalSecret_ResponseSchema` (model.ts:108)
- `unmarshalListServicePrincipalSecrets_ResponseSchema` (model.ts:112)

This is category 4 (underscores in TS identifiers) and category 14
(Go/Java-style names not idiomatic TS). The inline comments
(`// Proto-style nested message name.`) acknowledge that the names exist only
to preserve the wire-message hierarchy from protobuf — there is no TS-side
reason to keep them. Rename to PascalCase
(`DeleteServicePrincipalSecretResponse`, `ListServicePrincipalSecretsResponse`)
and drop the eslint disables.

---

## Medium severity (worth pushing back on)

### M1. Request types lack the `Request` suffix

Every input payload in this package is named as a verb phrase, not a payload:

- `CreateServicePrincipalSecret` (model.ts:6)
- `DeleteServicePrincipalSecret` (model.ts:32)
- `ListServicePrincipalSecrets` (model.ts:44)

Most of the rest of the Databricks SDK uses a `*Request` suffix for input
payloads (e.g. `GetRuleSetRequest` in `accountaccesscontrol`). The
`*Response` siblings here use the suffix; only the request side omits it.
Suggested: `CreateServicePrincipalSecretRequest`,
`DeleteServicePrincipalSecretRequest`,
`ListServicePrincipalSecretsRequest`.

### M2. `CreateServicePrincipalSecretResponse` and `ServicePrincipalSecret` are duplicates

```ts
export interface CreateServicePrincipalSecretResponse {
  id?, secret?, secretHash?, createTime?, updateTime?, status?, expireTime?
}

export interface ServicePrincipalSecret {
  id?, secret?, secretHash?, createTime?, updateTime?, status?, expireTime?
}
```

Seven fields each, same names, same JSDoc, same wire decoders. Reduce to one
type or `type CreateServicePrincipalSecretResponse = ServicePrincipalSecret`.

### M3. `id` and `secret` are vague

`ServicePrincipalSecret.id` is the secret's ID; rename to `secretId`.
`ServicePrincipalSecret.secret` is the secret's value; rename to `secretValue`.
The current shape forces every callsite to read
`secret.secret` and `secret.id`, which is unhelpful.

### M4. `status: string` is an undocumented enum

The field is typed as a free-form string but is almost certainly an enum on
the server side (`ACTIVE` / `EXPIRED` / `REVOKED` is the typical pattern for
secret lifecycle). The TS surface gives callers no discoverability — no enum,
no JSDoc enumeration of values, no link to backend docs.

### M5. `createTime` / `updateTime` are `string` while `expireTime` is `Temporal.Instant`

```ts
createTime?: string | undefined;
updateTime?: string | undefined;
expireTime?: Temporal.Instant | undefined;
```

Wire format is the same ISO-8601 timestamp for all three. The typing
asymmetry forces callers to handle three timestamps three different ways. Pick
one (presumably `Temporal.Instant`) and apply consistently.

### M6. `Client` is unqualified

```ts
export class Client { ... }
```

A consumer that imports `{Client}` from `@databricks/sdk-serviceprincipalsecretsproxy`
*and* from `@databricks/sdk-serviceprincipalsecrets` *and* from
`@databricks/sdk-accountaccesscontrol` has to alias every one. Export as
`ServicePrincipalSecretsProxyClient` or rely on namespace imports.

### M7. Method names stutter

```ts
class Client {
  createServicePrincipalSecret(req, ...)
  deleteServicePrincipalSecret(req, ...)
  listServicePrincipalSecrets(req, ...)
  listServicePrincipalSecretsIter(req, ...)
}
```

The receiver is already the secrets client. Methods could be `create`,
`delete`, `list`, `listAll` (or `list` returning an iterable). Even keeping
the long names, the consistent stutter is worth flagging since the package
name is already 33 characters.

### M8. `listServicePrincipalSecretsIter` uses a Go-idiom suffix

`*Iter` is Go convention (`func ListSomethingIter() iter.Seq`). TS code
typically returns `AsyncIterable` without suffix, or uses `*Stream` /
`iter*()`. Other audited packages have flagged the same pattern.

---

## Low severity (nits)

### L1. `lifetime` is generic

`CreateServicePrincipalSecret.lifetime: Temporal.Duration` — `secretLifetime`
or `ttl` would make the call site self-documenting.

### L2. `secretHash` does not name the algorithm

The wire field is `secret_hash` and the doc is "Secret Hash". Callers cannot
verify hashes without knowing the algorithm (almost certainly SHA-256 given
Databricks norms, but the SDK does not say).

### L3. `Schema` suffix tautology

Every zod constant is named `unmarshal*Schema` / `marshal*Schema`. The
`Schema` suffix duplicates the `z.ZodType<...>` annotation. Cross-SDK
generator concern, not unique to this package.

### L4. `marshal` / `unmarshal` are Go-idioms

```ts
unmarshalCreateServicePrincipalSecretResponseSchema = z.object(...).transform(...)
marshalCreateServicePrincipalSecretSchema = z.object(...).transform(...)
```

TS ecosystem norm is `encode` / `decode`, `serialize` / `deserialize`, or
just `parse` / `stringify`. Go's `encoding/json` uses `Marshal`/`Unmarshal`;
TS does not.

### L5. `marshalCreateServicePrincipalSecretSchema` lacks a generic argument

```ts
export const marshalCreateServicePrincipalSecretSchema: z.ZodType = z.object(...);
```

Every sibling unmarshal const supplies a generic argument
(`z.ZodType<ServicePrincipalSecret>`). The marshal const drops it, weakening
type safety on the call to `marshalRequest(req, marshalCreateServicePrincipalSecretSchema)`.

### L6. `PACKAGE_SEGMENT`

Used only for the User-Agent header. Rename to
`USER_AGENT_PACKAGE_SEGMENT` so the call site
(`createDefault().with(PACKAGE_SEGMENT)` → `.with(USER_AGENT_PACKAGE_SEGMENT)`)
is self-explanatory.

### L7. `HttpCallOptions`

Internal `interface` with `{request, httpClient, logger}`. Generic name. If
it ever leaks beyond `utils.ts`, `ExecuteHttpCallParams` would self-document.
(This shape and name is shared verbatim with sibling packages — generator-wide.)

### L8. `parseResponse` vs `marshalRequest`

`utils.ts` mixes `parse` / `marshal` action verbs. Pick one pair
(`parse` / `format`, or `marshal` / `unmarshal`) and stay consistent.

### L9. `flattenQueryParams` exported but never imported

`utils.ts:123` exports `flattenQueryParams`. `client.ts` builds query strings
inline via `URLSearchParams` (client.ts:134-141). Either:
- Use it (current inline code reproduces a subset of its logic), or
- Remove it (dead code).

### L10. `req` parameter naming in client methods

Every public method uses `req: <RequestType>` — Go-idiom. TS conventions
prefer `request` or `params`. Stylistic only.

### L11. `pageToken` JSDoc is enormous

```ts
/**
 * An opaque page token which was the `next_page_token` in the response of
 * the previous request to list the secrets for this service principal.
 * Provide this token to retrieve the next page of secret entries.
 * When providing a `page_token`, all other parameters provided to the
 * request must match the previous request.
 * To list all of the secrets for a service principal, it is necessary to
 * continue requesting pages of entries until the response contains no
 * `next_page_token`. Note that the number of entries returned must not be
 * used to determine when the listing is complete.
 */
pageToken?: string | undefined;
```

A four-sentence pagination contract attached to a single field. `pageSize`
on the very next line has zero JSDoc. Move the contract to the type-level
JSDoc or package docs; keep the field-level note short.

### L12. `accountId` in path templates falls back silently

```ts
const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/servicePrincipals/${req.servicePrincipal ?? ''}/credentials/secrets`;
```

If neither `req.accountId` nor `this.accountId` is provided, the URL is
emitted with an empty segment — a 404-bound HTTP call rather than an SDK
validation error. Not a naming issue per se, but a result of the underspecified
`accountId` field. (Same pattern across all sibling packages.)

---

## Observations (not flags)

- **Generator marker:** Every file is prefixed with `// Code generated from
  API definition by Databricks SDK Generator. DO NOT EDIT.`, so all
  naming issues must be fixed upstream in the generator / OpenAPI spec.
- **No enums.** The package has zero enum types, so categories 2 (redundant
  enum prefixes) and 18 (long enum values) do not apply. The `status` field
  (#11/#23) is a likely enum that was generated as a free-form string.
- **No `Url`/`URL`, `Sql`, `Json`, `Oauth` casing collisions.** `accountId`
  (camelCase) and `secretId` are the only acronyms in the public surface.
- **No reserved-word collisions** — no `delete`, `class`, `new`, etc. as
  field names. Note `Client.deleteServicePrincipalSecret` is a method
  (not a field) so `delete` is not a collision here.
- **Optionality model:** every field is `T | undefined`. Matches the rest of
  the SDK and `exactOptionalPropertyTypes`. No issue.
- **Versioning:** only `v1` exists; nothing to compare across versions.
- **Tests:** there is no `tests/` directory; `package.json` declares
  `"test": "echo 'no tests'"`.
- **`index.ts` re-export style:** All seven types are re-exported as
  `export type {...}`, which is correct under `verbatimModuleSyntax`.
  There is a stray `export {} from './model';` (index.ts:5) — a no-op
  re-export that does nothing. Either dead code or generator residue.
- **`Client` constructor throws plain `Error`** for missing `host`
  (client.ts:55-57). Consistent with sibling packages, but not a naming
  concern.

---

## Domain glossary (as inferred from this code)

| Term | Meaning in this package |
|------|-------------------------|
| **Account ID** | The numeric Databricks account identifier (path parameter `<account_id>`). |
| **Service principal** | Modeled as a string ID field (`servicePrincipal: string`) — the field name asserts an object but the value is the SP's ID. |
| **Secret** | An OAuth client secret bound to a service principal. Has an `id`, a one-time-visible `secret` value, a `secretHash`, lifecycle timestamps (`createTime`, `updateTime`, `expireTime`), and a `status`. |
| **Lifetime** | Server-side TTL for a newly-created secret, supplied as a `Temporal.Duration`; default is 730 days when omitted. |
| **Status** | Free-form string on the TS side; presumed to be an enum on the server (likely `ACTIVE` / `EXPIRED` / `REVOKED`). |
| **Secret hash** | Server-computed digest of the secret value; algorithm not stated by the SDK. |
| **Page token** | Opaque continuation cursor returned as `nextPageToken` and sent back as `pageToken`. |
| **Proxy** | Not visible anywhere in the API surface — the package name is the only signal. See H1. |

---

## File coverage

| File | Lines | Exports counted | Audited |
|------|-------|-----------------|---------|
| `src/v1/model.ts` | 162 | 7 interfaces, 5 zod consts | yes |
| `src/v1/client.ts` | 181 | 1 class, 4 public methods (3 request + 1 iterator) | yes |
| `src/v1/utils.ts` | 150 | 1 interface, 5 functions | yes |
| `src/v1/index.ts` | 15 | 1 class re-export, 7 type re-exports, 1 no-op `export {}` | yes |

Every type, field, enum value (none), and method enumerated above is
accounted for.
