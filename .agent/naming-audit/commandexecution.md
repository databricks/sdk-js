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
| 3 | high | 17. Inconsistent action verbs | `client.ts:256` vs URL `contexts/destroy` | `destroy()` vs Go SDK convention `delete` | Pick one; SDK-wide rule should drive choice |
| 4 | high | 17. Inconsistent action verbs | `client.ts:139,176` | `commandStatus()`, `contextStatus()` | `getCommandStatus()`, `getContextStatus()` (matches request-type prefix) |
| 5 | high | 16. Field contradicts type domain | `model.ts:117-143` | `Results` (plural) for single-command result | `Result` |
| 6 | medium | 7. Overly verbose | `model.ts:99,111` | `GetCommandStatusResponse`, `GetContextStatusResponse` | `CommandStatusResponse`, `ContextStatusResponse` (HTTP verb shouldn't leak into type) |
| 7 | medium | 20. Type-suffix tautology | `model.ts:55,82,93,106` | `CancelCommandRequest`, `ExecuteCommandRequest`, etc. | Acceptable here (request DTOs); flagged for review only |
| 8 | medium | 13. Verb-tense inconsistency | `model.ts:23-28` | `CANCELLED`, `CANCELLING`, `ERROR`, `FINISHED`, `QUEUED`, `RUNNING` | Mix of past, present, and noun. Normalise to a single form (e.g. `Failed` in place of `Error` so every member is a past/present participle). |
| 9 | medium | 12. Duplicate concepts | `client.ts:286,289` | `execute()` returns `CreateResponse` | Type repurpose conflates "context created" vs "command queued" |
| 10 | medium | 14. Go/Java-style names | `model.ts:74` + `client.ts:256` | `DestroyContextRequest` / `destroy()` | "Destroy" is unusual in JS/TS REST clients; `delete` is more idiomatic — but match Go SDK |
| 11 | medium | 8. Redundant suffix — call-out | `client.ts:333, 417, 498` | `CancelWaiter`, `CreateWaiter`, `ExecuteWaiter` | OK if intentional waiter pattern, but `CreateWaiter` is for *context* creation not command creation; ambiguous |
| 12 | medium | 6. Misleading name | `client.ts:417` | `CreateWaiter` | Waits for **context** to become RUNNING; not for "create" success. Rename `CreateContextWaiter`. |
| 13 | medium | 6. Misleading name | `client.ts:333` | `CancelWaiter` | Waits for **command** cancellation. Rename `CancelCommandWaiter`. |
| 14 | medium | 6. Misleading name | `client.ts:498` | `ExecuteWaiter` | Waits for **command** completion. Rename `ExecuteCommandWaiter`. |
| 15 | medium | 17. Inconsistent action verbs | `client.ts:86,256` | `cancel()` vs `destroy()` | Two destroy-like verbs for different resources (cancel command, destroy context). Acceptable but tone-deaf for JS users. |
| 16 | low | 15. Generic field losing meaning | `model.ts:67,87` | `language?: Language` | OK, but pair the values `R`, `SQL` (single-letter / acronym) — call out below |
| 17 | low | 3. Acronym casing | `model.ts:42-43` | `SQL`, `R` enum values | Mixed-length acronym/single-letter values; `Sql` and `R` if camelCased — keep all-caps consistently |

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
**Proposed:** split into `CreateContextResponse` and
`ExecuteCommandResponse`.

---

### Finding 3 — High — Cat 17 (Inconsistent action verbs)
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

### Finding 4 — High — Cat 17 (Inconsistent action verbs)
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

### Finding 5 — High — Cat 16 (Field contradicts type domain) & Cat 9 (Plural mismatch)
**Location:** `src/v2/model.ts:117-143`
```ts
export interface Results { ... }
```
The type is called `Results` (plural) but represents **one** command's
result — a single `cause`, single `summary`, single `resultType`, single
`data` object. The plurality comes from the wire-level `fileNames` array
inside it, not from multiple results.
**Proposed:** rename to `Result` (singular).

---

### Finding 6 — Medium — Cat 7 (Overly verbose)
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

### Finding 7 — Medium — Cat 20 (Type-suffix tautology) — call-out only
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

### Finding 8 — Medium — Cat 13 (Verb-tense inconsistency)
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

### Finding 9 — Medium — Cat 12 (Duplicate concepts)
**Location:** `src/v2/client.ts:286-309`
**Issue:** `execute()` returns `Promise<CreateResponse>`. The conflation
of "create a context" and "execute returns an id" is artificial. See #2.

---

### Finding 10 — Medium — Cat 14 (Go/Java-style names)
**Location:** `src/v2/model.ts:74` + `client.ts:256`
**Issue:** `destroy` is unusual for a REST SDK. JS conventions favour
`delete` (e.g. `clusters.delete`, `jobs.delete`). However the backend
path is `/contexts/destroy`, so renaming the *method* would diverge.
**Proposed:** confirm with the Go SDK reference; if Go uses `Destroy`,
keep parity. Otherwise rename method to `delete()` (collides with TS
reserved word in expressions — typically requires bracket access).

---

### Finding 11 — Medium — Cat 8 (Redundant suffix) — call-out
**Location:** `src/v2/client.ts:333, 417, 498`
**Issue:** Three classes named `*Waiter`. Acceptable if waiter is a
recognised pattern in this SDK (it is, see Go SDK `awaitable.go`). The
issue is what they wait *for*: see #12-#14.

---

### Finding 12 — Medium — Cat 6 (Misleading name)
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

### Finding 13 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:333`
**Issue:** `CancelWaiter` waits for *command* cancellation.
**Proposed:** `CancelCommandWaiter`.

---

### Finding 14 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:498`
**Issue:** `ExecuteWaiter` waits for *command* completion.
**Proposed:** `ExecuteCommandWaiter`.

---

### Finding 15 — Medium — Cat 17 (Inconsistent action verbs) — call-out
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

### Finding 16 — Low — Cat 15 (Generic field) — call-out
**Location:** `src/v2/model.ts:67, 87`
`language?: Language` is correct.

---

### Finding 17 — Low — Cat 3 (Acronym casing in enum string values)
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

## Top Themes

1. **Enum identifier casing** — SHOUTY_SNAKE_CASE enum identifiers
   (`COMMAND_CANCELLED`, `IMAGES_RESULT`, `PYTHON`) violate the
   TypeScript convention that reserves `SCREAMING_SNAKE_CASE` for
   constants. PascalCase identifiers with the wire string preserved as
   the value restore idiomatic TS while keeping serialisation intact.

2. **Verb inconsistency** — `cancel` (command), `destroy` (context),
   `commandStatus` (no verb), `contextStatus` (no verb), `execute` (vs
   `run`), `create`/`delete`/`destroy` mixing. Add `getCommandStatus` /
   `getContextStatus` and pick one of `destroy`/`delete` to settle this.

3. **Waiter-class names** — `CancelWaiter`, `CreateWaiter`,
   `ExecuteWaiter` are too short to convey what they wait for and are
   genericised against the resource axis. Renaming with the resource
   (`CancelCommandWaiter`, `CreateContextWaiter`, `ExecuteCommandWaiter`)
   removes a recurring source of confusion.

4. **Type reuse across operations** — `CreateResponse` is reused for both
   context creation and command execution. Splitting into
   `CreateContextResponse` and `ExecuteCommandResponse` clarifies the
   public surface.

---
