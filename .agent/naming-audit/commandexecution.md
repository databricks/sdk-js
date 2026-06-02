# Naming Audit: `@databricks/sdk-commandexecution` (v2)

**Package:** `@databricks/sdk-commandexecution`
**Path:** `/home/parth.bansal/sdk-js/packages/commandexecution/`
**Audited version:** `v2`
**Files audited:** `src/v2/model.ts`, `src/v2/client.ts`, `src/v2/utils.ts`,
`src/v2/index.ts`.

---

## Summary of Findings

| # | Severity | Category | Location | Current | Proposed |
| -- | -------- | -------- | -------- | ------- | -------- |
| 1 | high | 4. Underscores in TS identifiers | every enum member | `COMMAND_CANCELLED`, `PYTHON`, `IMAGES_RESULT` | `Cancelled`, `Python`, `Images` |
| 2 | high | 17. Inconsistent action verbs | `client.ts:144,184` | `commandStatus()`, `contextStatus()` | `getCommandStatus()`, `getContextStatus()` (matches request-type prefix) |
| 3 | high | 16. Field contradicts type domain | `model.ts:116-143` | `Results` (plural) for single-command result | `Result` |
| 4 | medium | 7. Overly verbose | `model.ts:99,111` | `GetCommandStatusResponse`, `GetContextStatusResponse` | `CommandStatusResponse`, `ContextStatusResponse` (HTTP verb shouldn't leak into type) |
| 5 | medium | 20. Type-suffix tautology | `model.ts:55,82,93,106` | `CancelCommandRequest`, `ExecuteCommandRequest`, etc. | Acceptable here (request DTOs); flagged for review only |
| 6 | medium | 14. Go/Java-style names | `model.ts:74` + `client.ts:270` | `DestroyContextRequest` / `destroy()` | "Destroy" is unusual in JS/TS REST clients; `delete` is more idiomatic — but match Go SDK |
| 7 | medium | 8. Redundant suffix — call-out | `client.ts:353, 430, 504` | `CancelWaiter`, `CreateWaiter`, `ExecuteWaiter` | OK if intentional waiter pattern, but `CreateWaiter` is for *context* creation not command creation; ambiguous |
| 8 | medium | 6. Misleading name | `client.ts:430` | `CreateWaiter` | Waits for **context** to become RUNNING; not for "create" success. Rename `CreateContextWaiter`. |
| 9 | medium | 6. Misleading name | `client.ts:353` | `CancelWaiter` | Waits for **command** cancellation. Rename `CancelCommandWaiter`. |
| 10 | medium | 6. Misleading name | `client.ts:504` | `ExecuteWaiter` | Waits for **command** completion. Rename `ExecuteCommandWaiter`. |
| 11 | medium | 17. Inconsistent action verbs | `client.ts:88,270` | `cancel()` vs `destroy()` | Two destroy-like verbs for different resources (cancel command, destroy context). Acceptable but tone-deaf for JS users. |
| 12 | low | 15. Generic field losing meaning | `model.ts:67,87` | `language?: Language` | OK, but pair the values `R`, `SQL` (single-letter / acronym) — call out below |

---

## Detailed Findings

### Finding 1 — High — Cat 4 (Underscores in TS identifiers)
**Location:** every enum member in `model.ts:22-52`.
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

### Finding 2 — High — Cat 17 (Inconsistent action verbs)
**Location:** `src/v2/client.ts:144, 184`
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

### Finding 3 — High — Cat 16 (Field contradicts type domain) & Cat 9 (Plural mismatch)
**Location:** `src/v2/model.ts:116-143`
```ts
export interface Results { ... }
```
The type is called `Results` (plural) but represents **one** command's
result — a single `cause`, single `summary`, single `resultType`, single
`data` object. The plurality comes from the wire-level `fileNames` array
inside it, not from multiple results.
**Proposed:** rename to `Result` (singular).

---

### Finding 4 — Medium — Cat 7 (Overly verbose)
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

### Finding 5 — Medium — Cat 20 (Type-suffix tautology) — call-out only
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

### Finding 6 — Medium — Cat 14 (Go/Java-style names)
**Location:** `src/v2/model.ts:74` + `client.ts:270`
**Issue:** `destroy` is unusual for a REST SDK. JS conventions favour
`delete` (e.g. `clusters.delete`, `jobs.delete`). However the backend
path is `/contexts/destroy`, so renaming the *method* would diverge.
**Proposed:** confirm with the Go SDK reference; if Go uses `Destroy`,
keep parity. Otherwise rename method to `delete()` (collides with TS
reserved word in expressions — typically requires bracket access).

---

### Finding 7 — Medium — Cat 8 (Redundant suffix) — call-out
**Location:** `src/v2/client.ts:353, 430, 504`
**Issue:** Three classes named `*Waiter`. Acceptable if waiter is a
recognised pattern in this SDK (it is, see Go SDK `awaitable.go`). The
issue is what they wait *for*: see #8-#10.

---

### Finding 8 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:430`
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

### Finding 9 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:353`
**Issue:** `CancelWaiter` waits for *command* cancellation.
**Proposed:** `CancelCommandWaiter`.

---

### Finding 10 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:504`
**Issue:** `ExecuteWaiter` waits for *command* completion.
**Proposed:** `ExecuteCommandWaiter`.

---

### Finding 11 — Medium — Cat 17 (Inconsistent action verbs) — call-out
**Location:** `src/v2/client.ts:88, 270`
**Issue:** This package uses three lifecycle verbs:
- `cancel()` on a command,
- `destroy()` on a context,
- `delete` on a context.
Three verbs for two lifecycle actions reads awkward.
**Proposed:** keep `cancel` (correct for commands — cancel is the right
verb for in-flight async work). Reconcile `destroy`/`delete` per the
Go-SDK alignment decision.

---

### Finding 12 — Low — Cat 15 (Generic field) — call-out
**Location:** `src/v2/model.ts:67, 87`
`language?: Language` is correct.
