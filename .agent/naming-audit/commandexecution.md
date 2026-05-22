# Naming Audit: `@databricks/sdk-commandexecution` (v2)

**Package:** `@databricks/sdk-commandexecution`
**Path:** `/home/parth.bansal/sdk-js/packages/commandexecution/`
**Audited version:** `v2`
**Files audited:** `src/v2/model.ts`, `src/v2/client.ts`, `src/v2/utils.ts`,
`src/v2/index.ts`.

This audit flags naming issues using the 20-category framework. Each finding
has: ID, location, current name, category, severity, problem, and proposed
name. Severity scale: **high** (public API confusing, blocks readability), **medium**
(inconsistency, minor cognitive load), **low** (polish).

The domain centres on a `Command` (Python/SQL/Scala/R code), executed inside a
`Context` (REPL session) on a `Cluster`. Three resources mix freely in names —
**this is the dominant source of naming pain.**

---

## Summary of Findings

| # | Severity | Category | Location | Current | Proposed |
| -- | -------- | -------- | -------- | ------- | -------- |
| 1 | high | 4. Underscores in TS identifiers | every enum member | `COMMAND_CANCELLED`, `PYTHON`, `IMAGES_RESULT` | `Cancelled`, `Python`, `Images` |
| 2 | high | 12. Duplicate concepts | `model.ts:70` vs `client.ts:286-309` | `CreateResponse` reused for `execute()` | Split: `CreateContextResponse`, `ExecuteCommandResponse` |
| 3 | high | 15. Generic field on container | `model.ts:71`, `model.ts:100,112` | `id?: string` (three different IDs) | `contextId`, `commandId` (typed by domain) |
| 4 | high | 17. Inconsistent action verbs | `client.ts:256` vs URL `contexts/destroy` | `destroy()` vs Go SDK convention `delete` | Pick one; SDK-wide rule should drive choice |
| 5 | high | 17. Inconsistent action verbs | `client.ts:139,176` | `commandStatus()`, `contextStatus()` | `getCommandStatus()`, `getContextStatus()` (matches request-type prefix) |
| 6 | high | 1. Vague/generic | `model.ts:89` | `command?: string` (field, inside `ExecuteCommandRequest`) | `code` |
| 7 | high | 16. Field contradicts type domain | `model.ts:117-143` | `Results` (plural) for single-command result | `Result` |
| 8 | medium | 9. Singular/plural mismatch | `model.ts:102,116-143` | `results?: Results` (`Results` is one object) | `result?: Result` |
| 9 | medium | 1. Vague/generic | `model.ts:119` | `data?: JsonValue` | Inline rename to domain (e.g. `tableData`), or document semantics |
| 10 | medium | 16. Field contradicts type domain | `model.ts:129,131` | `fileName`, `fileNames` (used for image data URLs) | `imageData`, `imageDataList` (or `image`, `images`) |
| 11 | medium | 1. Vague/generic | `model.ts:135` | `pos?: number` | `position` (also rename comment to public-friendly) |
| 12 | medium | 1. Vague/generic | `model.ts:138` | `schema?: JsonObject[]` | `tableSchema` (qualify what schema) |
| 13 | medium | 19. Underspecified IDs | `model.ts:71,100,112` | `id?: string` | `contextId` / `commandId` per response |
| 14 | medium | 19. Underspecified IDs | `client.ts:336,337,338` | `clusterId`, `contextId`, `commandId` (fine, but match in `Results.id`) | Audit pass for consistency |
| 15 | medium | 7. Overly verbose | `model.ts:99,111` | `GetCommandStatusResponse`, `GetContextStatusResponse` | `CommandStatusResponse`, `ContextStatusResponse` (HTTP verb shouldn't leak into type) |
| 16 | medium | 20. Type-suffix tautology | `model.ts:55,82,93,106` | `CancelCommandRequest`, `ExecuteCommandRequest`, etc. | Acceptable here (request DTOs); flagged for review only |
| 17 | medium | 13. Verb-tense inconsistency | `model.ts:23-28` | `CANCELLED`, `CANCELLING`, `ERROR`, `FINISHED`, `QUEUED`, `RUNNING` | Mix of past, present, and noun. Normalise to a single form (e.g. `Failed` in place of `Error` so every member is a past/present participle). |
| 18 | medium | 3. Acronym casing inconsistency | `model.ts:133` | `isJsonSchema` | OK (Json compound); contrast with `JsonValue`, `JsonObject` from wkt — confirm casing rule |
| 19 | medium | 12. Duplicate concepts | `client.ts:286,289` | `execute()` returns `CreateResponse` | Type repurpose conflates "context created" vs "command queued" |
| 20 | medium | 14. Go/Java-style names | `model.ts:74` + `client.ts:256` | `DestroyContextRequest` / `destroy()` | "Destroy" is unusual in JS/TS REST clients; `delete` is more idiomatic — but match Go SDK |
| 21 | medium | 8. Redundant suffix — call-out | `client.ts:333, 417, 498` | `CancelWaiter`, `CreateWaiter`, `ExecuteWaiter` | OK if intentional waiter pattern, but `CreateWaiter` is for *context* creation not command creation; ambiguous |
| 22 | medium | 6. Misleading name | `client.ts:417` | `CreateWaiter` | Waits for **context** to become RUNNING; not for "create" success. Rename `CreateContextWaiter`. |
| 23 | medium | 6. Misleading name | `client.ts:333` | `CancelWaiter` | Waits for **command** cancellation. Rename `CancelCommandWaiter`. |
| 24 | medium | 6. Misleading name | `client.ts:498` | `ExecuteWaiter` | Waits for **command** completion. Rename `ExecuteCommandWaiter`. |
| 25 | medium | 17. Inconsistent action verbs | `client.ts:86,256` | `cancel()` vs `destroy()` | Two destroy-like verbs for different resources (cancel command, destroy context). Acceptable but tone-deaf for JS users. |
| 26 | low | 1. Vague/generic | `model.ts:118` | `cause?: string` | Acceptable, but JSDoc says "The cause of the error" — better as `errorCause` or document under `Results.cause` |
| 27 | low | 1. Vague/generic | `model.ts:140` | `summary?: string` | Doc says "summary of the error" — rename `errorSummary` or move into a nested `error` object |
| 28 | low | 1. Vague/generic | `model.ts:142` | `truncated?: boolean` | OK, but document what is truncated |
| 29 | low | 1. Vague/generic | `client.ts:54` | `StillRunningError` | Acceptable; private |
| 30 | low | 3. Acronym casing | `client.ts:50,77` | `userAgent` (good) but the package-segment key is `'sdk-auth'` and `'auth'` — distinct from camelCase API conventions | Hyphenated identifier-like keys are intentional (HTTP User-Agent tokens) — leave |
| 31 | low | 10. Reserved-word collision | `model.ts:138` | `schema` as field name | Not reserved, but very generic globally — see #12 |
| 32 | low | 14. Go/Java-style | `client.ts:54` | `StillRunningError` | Idiomatic JS uses suffix `Error`; this is fine |
| 33 | low | 15. Generic field losing meaning | `model.ts:89` | `command` inside `ExecuteCommandRequest` | The string is the *source code*, not "the command" — see #6 |
| 34 | low | 15. Generic field losing meaning | `model.ts:67,87` | `language?: Language` | OK, but pair the values `R`, `SQL` (single-letter / acronym) — call out below |
| 35 | low | 3. Acronym casing | `model.ts:42-43` | `SQL`, `R` enum values | Mixed-length acronym/single-letter values; `Sql` and `R` if camelCased — keep all-caps consistently |
| 36 | low | 9. Singular/plural mismatch | `model.ts:131` | `fileNames?: string[]` (plural) but used for *images*, not arbitrary files | See #10 |

---

## Detailed Findings

### Finding 1 — High — Cat 4 (Underscores in TS identifiers)
**Location:** every enum member in `model.ts:22-53`.
**Issue:** TS identifier convention is PascalCase for type-namespace
members. `COMMAND_CANCELLED`, `IMAGES_RESULT`, `PYTHON`, `SCALA` are all
SHOUTY_SNAKE_CASE, which violates the Google TypeScript style guide
(`SCREAMING_SNAKE_CASE` only for *constants*, not enum members).
**Proposed:** convert every enum identifier to PascalCase. The string value
may retain the wire format (`COMMAND_CANCELLED`) to preserve serialisation,
but the *identifier* should be `Cancelled`. Example:
```ts
export enum CommandStatus {
  CommandStatusUnspecified = 'COMMAND_STATUS_UNSPECIFIED',
  CommandCancelled = 'COMMAND_CANCELLED',
  CommandCancelling = 'COMMAND_CANCELLING',
  CommandError = 'COMMAND_ERROR',
  CommandFinished = 'COMMAND_FINISHED',
  CommandQueued = 'COMMAND_QUEUED',
  CommandRunning = 'COMMAND_RUNNING',
}
```

---

### Finding 2 — High — Cat 12 (Duplicate concepts)
**Location:** `src/v2/model.ts:70` and `src/v2/client.ts:289`
```ts
export interface CreateResponse {
  id?: string | undefined;
}
...
async execute(req: ExecuteCommandRequest, ...): Promise<CreateResponse>
```
`CreateResponse` is used for *both* `create()` (returns a context id) and
`execute()` (returns a command id). The type's name implies "creation",
but `execute()` is not a creation operation in the public-API sense — the
shared shape is incidental, not semantic. Reusing the type forces a
caller reading `response.id` to know the operation to interpret it.
**Proposed:** split into `CreateContextResponse { contextId?: string }` and
`ExecuteCommandResponse { commandId?: string }`. Each typed `id` field by
its true domain (see #3/#13).

---

### Finding 3 — High — Cat 15 (Generic field loses meaning)
**Location:** `src/v2/model.ts:71, 100, 112`
```ts
export interface CreateResponse { id?: string | undefined; }
export interface GetCommandStatusResponse { id?: string | undefined; ... }
export interface GetContextStatusResponse { id?: string | undefined; ... }
```
The field name `id` is meaning-free outside its container, and the
container's name doesn't disambiguate (`CreateResponse` is used for two
different create-like operations — see #2). A caller writing `resp.id`
cannot tell whether it is a command id or a context id.
**Proposed:** rename per-response: `contextId` / `commandId`. This couples
the schema to the resource, eliminating ambiguity.

---

### Finding 4 — High — Cat 17 (Inconsistent action verbs)
**Location:** `src/v2/client.ts:256`
```ts
/** Deletes an execution context. */
async destroy(req: DestroyContextRequest, ...)
```
The JSDoc says "Deletes" while the method is named `destroy`. The URL is
`/api/1.2/contexts/destroy`. Three different verbs (`destroy`, `delete`, plus
`cancel` for commands) live in the same domain.
**Proposed:** keep `destroy` if the backend route is canonical; otherwise
align with the Go SDK convention. At minimum, edit the JSDoc to say
"Destroys" so name and doc agree.

---

### Finding 5 — High — Cat 17 (Inconsistent action verbs)
**Location:** `src/v2/client.ts:139, 176`
```ts
async commandStatus(req: GetCommandStatusRequest, ...)
async contextStatus(req: GetContextStatusRequest, ...)
```
The *request types* are `GetCommandStatusRequest` / `GetContextStatusRequest`
(with `Get` prefix), but the methods drop the verb. Now `commandStatus` and
`contextStatus` read like getters/properties, not methods. Inconsistent with
`cancel`, `create`, `destroy`, `execute` which all start with a verb.
**Proposed:** rename `getCommandStatus()` and `getContextStatus()`. Matches
the request-type name and is verb-led like the other methods.

---

### Finding 6 — High — Cat 1 & Cat 15 (Vague / generic field name)
**Location:** `src/v2/model.ts:89`
```ts
/** Executable code */
command?: string | undefined;
```
The field is named `command` and lives in `ExecuteCommandRequest`. The
container says "command", the field says "command" — yet the value is
source code, not the abstract command. A user reading
`req.command = "print(1+1)"` has to mentally bridge "the string content of
the command".
**Proposed:** rename `code`. The JSDoc already says "Executable code". This
also matches the conceptual model: a `Command` *contains* `code`.

---

### Finding 7 — High — Cat 16 (Field contradicts type domain) & Cat 9 (Plural mismatch)
**Location:** `src/v2/model.ts:117-143`
```ts
export interface Results { ... }
```
The type is called `Results` (plural) but represents **one** command's
result — a single `cause`, single `summary`, single `resultType`, single
`data` object. The plurality comes from the wire-level `fileNames` array
inside it, not from multiple results.
**Proposed:** rename to `Result` (singular). The field
`GetCommandStatusResponse.results` becomes `result` (see #8).

---

### Finding 8 — Medium — Cat 9 (Singular/plural mismatch)
**Location:** `src/v2/model.ts:102` (field) and `model.ts:116` (type)
```ts
results?: Results | undefined;
```
Pairs with #7. The field name and the type are both pluralised but
represent a singular result.
**Proposed:** `result?: Result;` once #7 is applied.

---

### Finding 9 — Medium — Cat 1 (Vague/generic)
**Location:** `src/v2/model.ts:119`
```ts
data?: JsonValue | undefined;
```
`data` is the most generic field name possible. The shape `JsonValue`
gives no help. According to API docs, this is typically the table/text data
returned by the command.
**Proposed:** investigate intended payload. Likely `tableData` or split per
`resultType` discriminant. As a minimum, JSDoc must explain the polymorphism
("payload of `result.data` is determined by `resultType`: …").

---

### Finding 10 — Medium — Cat 16 (Field contradicts type domain)
**Location:** `src/v2/model.ts:129, 131`
```ts
/** The image data in one of the following formats:
 * 1. A Data URL with base64-encoded image data: `data:image/{type};base64,...`
 * 2. A FileStore file path for large images: `/plots/{filename}.png`
 */
fileName?: string | undefined;
/** List of image data for multiple images. ... */
fileNames?: string[] | undefined;
```
The JSDoc explicitly says "image data" — yet the fields are called
`fileName(s)`. The values are not file names: case 1 is a `data:` URL
literal, case 2 is a path. Either way the *content* is image data,
not a filename.
**Proposed:** `imageData` / `imageDataList` (or `image` / `images`). This
is a public API; mis-named fields will outlive their fix window.

---

### Finding 11 — Medium — Cat 1 (Cryptic abbreviation / vague)
**Location:** `src/v2/model.ts:135`
```ts
/** internal field used by SDK */
pos?: number | undefined;
```
`pos` is cryptic (Cat 5 — cryptic abbreviation). The comment "internal
field used by SDK" suggests this should not be on the public type at all.
**Proposed:** either expand to `position` and document, or drop from the
public interface entirely. Internal fields belong on private types.

---

### Finding 12 — Medium — Cat 1 (Vague/generic)
**Location:** `src/v2/model.ts:138`
```ts
/** The table schema */
schema?: JsonObject[] | undefined;
```
`schema` is colliding with a globally overloaded term — also see zod's own
`schema` used heavily in the file. Within a polymorphic `Result`, the
*kind* of schema must be clear.
**Proposed:** `tableSchema` (matches JSDoc); confirm whether it is
populated for non-table result types.

---

### Finding 13 — Medium — Cat 19 (Underspecified IDs)
**Location:** `src/v2/model.ts:71, 100, 112`
**Issue:** Same as #3. Every response that carries an identifier uses
`id?: string` with no domain qualifier.
**Proposed:** Rename per-response (`contextId`, `commandId`). Public-API
clarity outweighs minor breakage.

---

### Finding 14 — Medium — Cat 19 (Underspecified IDs) — consistency only
**Location:** `src/v2/client.ts:336-338, 417-422, 498-503` (Waiter fields)
**Issue:** Waiter classes correctly use `clusterId`, `contextId`,
`commandId`. The inconsistency is only in `Results` / `*Response` (#3/#13).
**Proposed:** apply the same explicit-id pattern to all response types so
the public surface is uniform.

---

### Finding 15 — Medium — Cat 7 (Overly verbose)
**Location:** `src/v2/model.ts:99, 111`
```ts
export interface GetCommandStatusResponse { ... }
export interface GetContextStatusResponse { ... }
```
`Get*Response` is a common Go/protobuf pattern. In TS the HTTP verb does
not need to leak into the type name: the type's role is "the value
returned", not "the response to a GET".
**Proposed:** `CommandStatusResponse`, `ContextStatusResponse` (or simply
`CommandStatus`, but that collides with the enum — keep `*Response`).

---

### Finding 16 — Medium — Cat 20 (Type-suffix tautology) — call-out only
**Location:** `src/v2/model.ts:55, 64, 74, 82, 93, 106`
```ts
CancelCommandRequest, CreateContextRequest, DestroyContextRequest,
ExecuteCommandRequest, GetCommandStatusRequest, GetContextStatusRequest
```
**Issue:** `*Request` is a request type — the suffix repeats what the type
class already says. However, for *request DTOs* (named arguments) the
convention is widely accepted across REST SDKs.
**Proposed:** leave as-is; flagged only for SDK-wide consistency review.

---

### Finding 17 — Medium — Cat 13 (Verb-tense inconsistency)
**Location:** `src/v2/model.ts:23-28`
The `CommandStatus` members mix forms:
- `CANCELLED` — past participle
- `CANCELLING` — present participle (transitional)
- `ERROR` — noun
- `FINISHED` — past participle
- `QUEUED` — past participle
- `RUNNING` — present participle

`ERROR` is a noun; everything else is a verbal form. The odd-one-out
should be `FAILED` (past participle) to match the pattern.
**Proposed:** rename the `ERROR` member to `FAILED`. (Same applies to
`CONTEXT_ERROR` in `ContextStatus`.)

---

### Finding 18 — Medium — Cat 3 (Acronym casing)
**Location:** `src/v2/model.ts:133`
```ts
isJsonSchema?: boolean | undefined;
```
`Json` is treated as a compound (PascalCase). Cross-package
`@databricks/sdk-core/wkt` uses `JsonValue`, `JsonObject` — consistent.
Project convention: treat JSON as `Json`, not `JSON`. Confirm the rule is
recorded in `.agent/rules/typescript.mdc`.
**Proposed:** keep as-is; document the rule.

---

### Finding 19 — Medium — Cat 12 (Duplicate concepts)
**Location:** `src/v2/client.ts:286-309`
**Issue:** `execute()` returns `Promise<CreateResponse>`. The conflation
of "create a context" and "execute returns an id" is artificial. See #2.

---

### Finding 20 — Medium — Cat 14 (Go/Java-style names)
**Location:** `src/v2/model.ts:74` + `client.ts:256`
**Issue:** `destroy` is unusual for a REST SDK. JS conventions favour
`delete` (e.g. `clusters.delete`, `jobs.delete`). However the backend
path is `/contexts/destroy`, so renaming the *method* would diverge.
**Proposed:** confirm with the Go SDK reference; if Go uses `Destroy`,
keep parity. Otherwise rename method to `delete()` (collides with TS
reserved word in expressions — typically requires bracket access).

---

### Finding 21 — Medium — Cat 8 (Redundant suffix) — call-out
**Location:** `src/v2/client.ts:333, 417, 498`
**Issue:** Three classes named `*Waiter`. Acceptable if waiter is a
recognised pattern in this SDK (it is, see Go SDK `awaitable.go`). The
issue is what they wait *for*: see #22-#24.

---

### Finding 22 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:417`
```ts
export class CreateWaiter { ... }
```
The class waits for a *context* to reach `CONTEXT_RUNNING`. The name
"CreateWaiter" implies it waits for "create" to finish, but the
operation it's bound to (`createWaiter()`) returns immediately after
the context create call; the *waiter* polls a different endpoint
(`contextStatus`) for terminal state.
**Proposed:** `CreateContextWaiter` or `ContextWaiter` (parallel to the
target endpoint).

---

### Finding 23 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:333`
**Issue:** `CancelWaiter` waits for *command* cancellation.
**Proposed:** `CancelCommandWaiter`.

---

### Finding 24 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:498`
**Issue:** `ExecuteWaiter` waits for *command* completion.
**Proposed:** `ExecuteCommandWaiter`.

---

### Finding 25 — Medium — Cat 17 (Inconsistent action verbs) — call-out
**Location:** `src/v2/client.ts:86, 256`
**Issue:** This package uses three lifecycle verbs:
- `cancel()` on a command,
- `destroy()` on a context,
- `delete` (in JSDoc) on a context.
Three verbs for two lifecycle actions reads awkward.
**Proposed:** keep `cancel` (correct for commands — cancel is the right
verb for in-flight async work). Reconcile `destroy`/`delete` per the
Go-SDK alignment decision.

---

### Finding 26 — Low — Cat 1 (Vague/generic)
**Location:** `src/v2/model.ts:117-118`
```ts
/** The cause of the error */
cause?: string | undefined;
```
`cause` is fine as a JSDoc-clarified concept, but it lives flat on a
`Result` that may *not* be an error. Coupling `cause`/`summary` to the
`resultType === ERROR_RESULT` discriminant would clarify.
**Proposed:** consider an `error?: { cause: string; summary: string }`
sub-object; or keep flat and document conditional presence.

---

### Finding 27 — Low — Cat 1 (Vague/generic)
**Location:** `src/v2/model.ts:139-140`
```ts
/** The summary of the error */
summary?: string | undefined;
```
Same as #26. The field is generic; the JSDoc reveals it's
error-specific.

---

### Finding 28 — Low — Cat 1 (Underspecified)
**Location:** `src/v2/model.ts:141-142`
```ts
/** true if partial results are returned. */
truncated?: boolean | undefined;
```
Acceptable but ambiguous: truncated *what*? table rows? text length?
**Proposed:** document the truncation unit.

---

### Finding 29 — Low — Cat 1 (Vague/generic) — call-out
**Location:** `src/v2/client.ts:54`
```ts
class StillRunningError extends Error {}
```
Private, OK. Idiomatic for waiter polling patterns.

---

### Finding 30 — Low — Cat 3 (Acronym casing) — non-issue
**Location:** `src/v2/client.ts:49-52`
```ts
const PACKAGE_SEGMENT = { key: pkgJson.name.replace(...), value: pkgJson.version };
```
`PACKAGE_SEGMENT` is a true constant (SCREAMING_SNAKE_CASE is correct).
Mixed with `userAgent` (camelCase method-scope variable). Both are
correctly cased per the project rules.

---

### Finding 31 — Low — Cat 10 (Reserved-word collision) — borderline
**Location:** `src/v2/model.ts:138`
**Issue:** `schema` is not a TS reserved word but is heavily aliased
across libraries (zod, JSON schema, table schema, GraphQL schema). See #12.

---

### Finding 32 — Low — Cat 14 — non-issue
**Location:** `src/v2/client.ts:54`
**Issue:** `StillRunningError` is named in idiomatic TS style
(`*Error` suffix on classes extending Error).

---

### Finding 33 — Low — duplicate of #6
**Location:** `src/v2/model.ts:89`
Same finding as #6.

---

### Finding 34 — Low — Cat 15 (Generic field) — call-out
**Location:** `src/v2/model.ts:67, 87`
`language?: Language` is correct.

---

### Finding 35 — Low — Cat 3 (Acronym casing in enum string values)
**Location:** `src/v2/model.ts:42-43`
```ts
SQL = 'SQL',
R = 'R',
```
Identifier `SQL` is all-caps (3 letters → standard "≤3 letter acronym
all caps") in the language enum. `R` is single-letter — naturally all
caps. Apply the casing rule (#1) and these become `Sql` (if the rule is
"acronyms PascalCase") or remain `SQL`/`R` (if "≤3 letters all caps").
**Proposed:** consult `typescript.mdc`; pick a rule and apply globally.

---

### Finding 36 — Low — duplicate of #10
**Location:** `src/v2/model.ts:131`
`fileNames?: string[]` for images — same as #10.

---

## Top Themes

1. **Three-resource ambiguity** — `Cluster`, `Context`, `Command` are easy
   to confuse, but the public types use the generic field `id` and reuse
   `CreateResponse` for two unrelated operations. Findings #2, #3, #6,
   #7, #8, #10, #13, #15, #22-#24 all stem from one decision: **never
   say "id" when "commandId" or "contextId" would do, and never reuse a
   response shape across resources**. Splitting `CreateResponse` into
   `CreateContextResponse` and `ExecuteCommandResponse` cascades to fix
   four other findings.

2. **Enum identifier casing** — SHOUTY_SNAKE_CASE enum identifiers
   (`COMMAND_CANCELLED`, `IMAGES_RESULT`, `PYTHON`) violate the
   TypeScript convention that reserves `SCREAMING_SNAKE_CASE` for
   constants. PascalCase identifiers with the wire string preserved as
   the value restore idiomatic TS while keeping serialisation intact.

3. **Verb inconsistency** — `cancel` (command), `destroy` (context),
   `commandStatus` (no verb), `contextStatus` (no verb), `execute` (vs
   `run`), `create`/`delete`/`destroy` mixing. Add `getCommandStatus` /
   `getContextStatus` and pick one of `destroy`/`delete` to settle this.

4. **Waiter-class names** — `CancelWaiter`, `CreateWaiter`,
   `ExecuteWaiter` are too short to convey what they wait for and are
   genericised against the resource axis. Renaming with the resource
   (`CancelCommandWaiter`, `CreateContextWaiter`, `ExecuteCommandWaiter`)
   removes a recurring source of confusion.

---

## Fixed

_None._
