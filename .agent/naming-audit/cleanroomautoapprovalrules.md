# Naming Audit: `@databricks/sdk-cleanroomautoapprovalrules` (`v1`)

Path: `/home/parth.bansal/sdk-js/packages/cleanroomautoapprovalrules/`
Files audited: `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`.

## Inventory

### Enums

| Name | Members |
| ---- | ------- |
| `CleanRoomAutoApprovalRule_AuthorScope` | `AUTHOR_SCOPE_UNSPECIFIED`, `ANY_AUTHOR` |

### Interfaces (data model)

- `CleanRoomAutoApprovalRule`
  - `cleanRoomName?: string`
  - `ruleId?: string`
  - `ruleOwnerCollaboratorAlias?: string`
  - `authors?` — discriminated union with `$case` of
    `'authorCollaboratorAlias'` (`authorCollaboratorAlias: string`) or
    `'authorScope'` (`authorScope: CleanRoomAutoApprovalRule_AuthorScope`)
  - `runners?` — discriminated union with `$case` of
    `'runnerCollaboratorAlias'` (`runnerCollaboratorAlias: string`)
  - `createdAt?: number`

### Interfaces (requests/responses)

- `CreateCleanRoomAutoApprovalRuleRequest` (`autoApprovalRule?:
  CleanRoomAutoApprovalRule`)
- `DeleteCleanRoomAutoApprovalRuleRequest` (`cleanRoomName?: string`,
  `ruleId?: string`)
- `GetCleanRoomAutoApprovalRuleRequest` (`cleanRoomName?: string`,
  `ruleId?: string`)
- `ListCleanRoomAutoApprovalRulesRequest` (`cleanRoomName?: string`,
  `pageSize?: number`, `pageToken?: string`)
- `ListCleanRoomAutoApprovalRulesResponse` (`rules?:
  CleanRoomAutoApprovalRule[]`, `nextPageToken?: string`)
- `UpdateCleanRoomAutoApprovalRuleRequest` (`autoApprovalRule?:
  CleanRoomAutoApprovalRule`)

### `client.ts`

- `class Client`
  - `host`, `httpClient`, `logger`, `userAgent` (private fields)
  - `createCleanRoomAutoApprovalRule`
  - `deleteCleanRoomAutoApprovalRule`
  - `getCleanRoomAutoApprovalRule`
  - `listCleanRoomAutoApprovalRules`
  - `listCleanRoomAutoApprovalRulesIter`
  - `updateCleanRoomAutoApprovalRule`

### `utils.ts`

- `interface HttpCallOptions`
- Internal HTTP helpers (request building, response handling, query
  flattening, etc.).

### `index.ts`

Re-exports `Client`, `CleanRoomAutoApprovalRule_AuthorScope`, and the
request/response/model types.

---

## Findings

The package name itself (`cleanroomautoapprovalrules`) is already long. The
following findings examine whether the inside of the package further redoubles
the `CleanRoom` / `AutoApproval` prefixes against the surface that consumers
actually see when calling `new Client(...)` and method/type names.

### 1. Redundant `CleanRoom*` prefix on every exported type — Category 7 (overly verbose) / Category 14 (Go/Java-style names)

Every interface in this package starts with `CleanRoom` or
`CleanRoomAutoApproval`. In Go, this is conventional because every type
shares a flat package namespace. In TypeScript these symbols are already
inside `@databricks/sdk-cleanroomautoapprovalrules/v1`; consumers always
disambiguate via the import path or a namespace import.

Affected symbols:

- `CleanRoomAutoApprovalRule` → could be `AutoApprovalRule` (or just `Rule`).
- `CreateCleanRoomAutoApprovalRuleRequest` → `CreateRuleRequest`.
- `DeleteCleanRoomAutoApprovalRuleRequest` → `DeleteRuleRequest`.
- `GetCleanRoomAutoApprovalRuleRequest` → `GetRuleRequest`.
- `ListCleanRoomAutoApprovalRulesRequest` → `ListRulesRequest`.
- `ListCleanRoomAutoApprovalRulesResponse` → `ListRulesResponse`.
- `UpdateCleanRoomAutoApprovalRuleRequest` → `UpdateRuleRequest`.

A representative consumer call today reads:

```typescript
import * as approvals from '@databricks/sdk-cleanroomautoapprovalrules/v1';
const req: approvals.CreateCleanRoomAutoApprovalRuleRequest = { ... };
await client.createCleanRoomAutoApprovalRule(req);
```

The string `CleanRoomAutoApproval` appears three times for a single call.
The package name already carries that information.

### 2. Client methods restate the package name — Category 7 (overly verbose) / Category 14 (Go-style names)

All six `Client` methods repeat `CleanRoomAutoApprovalRule(s)`:

- `createCleanRoomAutoApprovalRule`
- `deleteCleanRoomAutoApprovalRule`
- `getCleanRoomAutoApprovalRule`
- `listCleanRoomAutoApprovalRules`
- `listCleanRoomAutoApprovalRulesIter`
- `updateCleanRoomAutoApprovalRule`

Inside `new Client(...)` from this package, the resource is implied; the
shorter `create`, `get`, `list`, `listIter`, `update`, `delete` (or
`createRule`, `getRule`, etc.) communicate the same information without the
21-character prefix. This is the same pattern used by other JS SDKs (e.g.,
the AWS JS SDK v3 uses `Send` of a single-purpose command rather than a
verbose method name).

### 3. Enum name doubles up on its parent type — Category 2 (redundant enum prefix) / Category 14 (Go/Java-style names)

`CleanRoomAutoApprovalRule_AuthorScope` carries the parent interface name
plus `CleanRoom` and `AutoApproval`. In TypeScript, the enum is referenced
as a top-level export from `model.ts` and re-exported from `index.ts`. It
does not need the parent-type prefix; `AuthorScope` (or, if disambiguation
is desired, `RuleAuthorScope`) is sufficient. The proto-style underscore
join already required disabling
`@typescript-eslint/naming-convention` (`model.ts:5`), which is a smell.

### 4. Enum members repeat the enum name — Category 2 (redundant enum prefix) / Category 18 (long enum values)

```typescript
export enum CleanRoomAutoApprovalRule_AuthorScope {
  AUTHOR_SCOPE_UNSPECIFIED = 'AUTHOR_SCOPE_UNSPECIFIED',
  ANY_AUTHOR = 'ANY_AUTHOR',
}
```

`AUTHOR_SCOPE_UNSPECIFIED` repeats `AuthorScope` (which is also the enum
name). The serialized wire values are out of our control, but the TS
identifiers can be `UNSPECIFIED` and `ANY` (or `ANY_AUTHOR` if disambiguation
within `AuthorScope` matters); when used at call sites they read
`AuthorScope.UNSPECIFIED` / `AuthorScope.ANY`, which is clearer than
`AuthorScope.AUTHOR_SCOPE_UNSPECIFIED`.

### 5. `AUTHOR_SCOPE_UNSPECIFIED` is a leaked-protobuf sentinel — Category 14 (Go/Java-style names)

The presence of an `_UNSPECIFIED` member is a protobuf-3 convention (every
enum must have a `0` value). It has no meaning in JS — passing
`UNSPECIFIED` is effectively the same as omitting `authorScope`. Either drop
it from the public surface or document explicitly that it is a wire-only
default no caller should pass. As written, IntelliSense advertises it as a
real value alongside `ANY_AUTHOR`.

### 6. Discriminator-tag value duplicates the field name — Category 12 (duplicate concepts)

```typescript
authors?:
  | { $case: 'authorCollaboratorAlias'; authorCollaboratorAlias: string }
  | { $case: 'authorScope'; authorScope: CleanRoomAutoApprovalRule_AuthorScope };
```

The `$case` literal and the only payload key inside each variant are the
same string. The information is encoded twice; the variant could simply
hold the value:

```typescript
authors?:
  | { $case: 'collaboratorAlias'; value: string }
  | { $case: 'scope'; value: CleanRoomAutoApprovalRule_AuthorScope };
```

This is at least a consistency concern: the field name `authors` is plural,
but the discriminant talks about a single author. (See finding 7.) The
inner `author` prefix is also redundant once the parent field is already
named `authors`.

### 7. `authors` / `runners` are misleading plurals on a single-author/runner union — Category 9 (singular/plural mismatches) / Category 6 (misleading names)

The field types only ever carry one author or one runner per rule:

- `authorCollaboratorAlias` is a single string.
- `authorScope` is a single enum value (the doc says it covers a scope, but
  the value is one scalar).
- `runnerCollaboratorAlias` is a single string.

The plural names imply a list. Reasonable singular alternatives:
`author` and `runner`. If the intent is to keep the proto's `oneof` group
name, document it; otherwise the plural reads as a bug.

### 8. `runnerCollaboratorAlias` doubles `runner` — Category 8 (redundant suffix) / Category 12 (duplicate concepts)

Combined with finding 6, the variant's payload key restates the discriminant:
`{ $case: 'runnerCollaboratorAlias'; runnerCollaboratorAlias: string }`. Once
inside the variant, just `value` or `alias` would do.

### 9. `ruleOwnerCollaboratorAlias` / `authorCollaboratorAlias` / `runnerCollaboratorAlias` — Category 7 (overly verbose) / Category 5 (cryptic abbreviation)

Three different fields encode "this string is a collaborator alias". Two
options:

- Introduce a type alias `type CollaboratorAlias = string` and rename
  fields to `ruleOwner`, `author`, `runner`. Then the *type* documents the
  semantics rather than the *name* dragging the same suffix three times.
- Or keep the names and shorten: `ownerAlias`, `authorAlias`, `runnerAlias`
  (the "collaborator" qualifier is implied by the clean-rooms domain).

"alias" by itself is also a slightly cryptic term outside the clean-rooms
context; a JSDoc note explaining it identifies a collaborator would help.

### 10. `ruleId` is underspecified — Category 19 (underspecified ID)

Every `ruleId` in `Delete/Get/UpdateCleanRoomAutoApprovalRuleRequest` is just
`string`. The comment on `CleanRoomAutoApprovalRule.ruleId` says "A generated
UUID". Either the type should reflect that (`type RuleId = string` with a
JSDoc tag, or zod schema validating UUID format) or the doc should be
elsewhere. Today every callsite has to know via documentation that it is a
UUID, not an arbitrary string.

### 11. `Client` is a generic class name — Category 1 (vague/generic)

`Client` collides conceptually with the `Client` in every other API package
(`@databricks/sdk-cleanrooms/v1` also exports `Client`, etc.). Inside a
file this is fine, but at consumer sites it forces a rename on import:

```typescript
import {Client as AutoApprovalRulesClient}
  from '@databricks/sdk-cleanroomautoapprovalrules/v1';
```

Two consistent options: (a) keep `Client` everywhere and document that
consumers will rename on import (current state, by convention), or (b)
export a more specific name (`AutoApprovalRulesClient`,
`CleanRoomAutoApprovalRulesClient`). Either way, this is a *package-wide*
decision; this audit just flags that the bare `Client` name is generic.

### 12. `nextPageToken` / `pageToken` are duplicated across the response and request — Category 12 (duplicate concepts) [informational]

`ListCleanRoomAutoApprovalRulesResponse.nextPageToken` and
`ListCleanRoomAutoApprovalRulesRequest.pageToken` are wire-mandated and
match the Databricks pagination convention. This is *not* a finding to act
on — it is the standard pagination shape used across all packages. Logged
for completeness because the prompt asks for an exhaustive scan.

### 13. Doc references undefined casing — Category 16 (field contradicting type domain) [minor]

The JSDoc on `authorCollaboratorAlias` says:

```
Only one of `author_collaborator_alias` and `author_scope` can be set.
```

The fields named in the doc are `snake_case` (wire names), but the
TypeScript fields are `authorCollaboratorAlias` and `authorScope`. This is
a leaked-from-proto doc; a TS-side comment should say "Only one of
`authorCollaboratorAlias` and `authorScope` can be set" (or "exactly one
arm of `authors` should be populated"). Same issue on line 25 of
`model.ts` for the second arm. The doc on
`ListCleanRoomAutoApprovalRulesResponse.nextPageToken` says "`page_token`
should be set", which should read `pageToken`.

### 14. Docs say "a auto-approval rule" — typo (not naming, but on JSDoc) [minor]

`client.ts:96`, `client.ts:115`, `client.ts:194` use `Delete a
auto-approval`, `Get a auto-approval`, `Update a auto-approval`. The
article should be `an`. This is generated text; flag it for the
generator. Not strictly a naming issue, but it sits in the same area.

### 15. `Client` constructor field `userAgent` — Category 1 (vague) [minor]

`private readonly userAgent: string` (`client.ts:49`) holds the *value* of
the `User-Agent` header. The name reads as a thing rather than a header
value. `userAgentHeader` or `userAgentValue` is unambiguous. Minor — the
JSDoc above the field explains it — but consistent with the audit's brief.

### 16. `utils.ts` is a kitchen-sink module name — Category 1 (vague/generic)

The package's internal helpers all live in a single `utils.ts`. Per the SDK's
existing breakdown (see `@databricks/sdk-core/api`, `.../apierror`,
`.../http`, `.../logger`), these helpers would normally live in a named
module (e.g., `http.ts`, `request.ts`). All sibling API packages emit the
same `utils.ts`, so this is a generator-level concern, not a per-package
one. Flagged because the brief asks about generic names.

### 17. Method docstrings use "rule ID" inconsistently with field name — Category 6 (misleading names) [minor]

JSDocs say "Delete a auto-approval rule by rule ID", "Get a auto-approval
rule by rule ID", "Update a auto-approval rule by rule ID". The request
fields are `ruleId` (camelCase). A reader scanning the docs sees "rule ID"
and may search for a field called "rule ID" or "ID". Either keep "ruleId"
verbatim in the prose or just say "by ID".

### 18. `cleanRoomName` is the identifier doing double duty — Category 19 (underspecified ID) [minor]

The path identifier is the `cleanRoomName` (a URL segment). In other
packages this is sometimes `cleanRoomId` (UUID) or a `metastoreId`. Here it
is consistently a name. The doc on
`CleanRoomAutoApprovalRule.cleanRoomName` is clear, but the field type is
`string`, so there is nothing stopping a caller from passing the UUID by
mistake. A type-aliased name (`CleanRoomName`) would help. Same flag as
finding 10.

---

## Themes / suggested resolution priority

1. **Verbosity from the package name leaking into every symbol.** Findings
   1, 2, 3, 4. This is the dominant issue: `CleanRoomAutoApproval`
   appears in every type and method name even though it is already in the
   package import path. Strip the prefix and the surface area becomes about
   half as wide on screen.
2. **Proto/Go ergonomics surfacing in TS.** Findings 3, 4, 5, 6.
   `_`-joined enum names and `_UNSPECIFIED` sentinels are conventions
   imported from protobuf/Go that have no payoff in TypeScript.
3. **Field-name ambiguity around identifiers and aliases.** Findings 7, 8,
   9, 10, 18. `authors`/`runners` are plural but always single;
   collaborator aliases are typed `string`; `ruleId` is a UUID typed
   `string`. Type aliases plus singular field names would cover all of
   these.
4. **Doc/identifier drift from the wire format.** Findings 13, 14, 17. JSDoc
   text references `snake_case` field names and includes generated-text
   typos. These are docs-only fixes but they bear on naming clarity.
5. **Module-shape concerns** (only logged for awareness because the prompt
   asked for an exhaustive sweep): findings 11, 15, 16.

---

## Out of scope for this audit

- Whether the package should exist as a separate npm package at all
  (versus folding the rule CRUD into `@databricks/sdk-cleanrooms`). That is
  a package-shape decision, not a naming one.
- Wire-format names (`page_token`, `next_page_token`, `clean_room_name`,
  etc.). These are dictated by the API and not part of the TS surface.
- The `_` underscore in `CleanRoomAutoApprovalRule_AuthorScope` is already
  documented (and explicitly lint-disabled) as a proto-style nested enum
  name; the *suffix* portion (`AuthorScope`) is what finding 3 targets.
