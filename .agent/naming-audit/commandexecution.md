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
| 2 | high | 16. Field contradicts type domain | `model.ts:130-157` | `Results` (plural) for single-command result | `Result` |
| 3 | medium | 7. Overly verbose | `model.ts:113,125` | `GetCommandStatusResponse`, `GetContextStatusResponse` | `CommandStatusResponse`, `ContextStatusResponse` (HTTP verb shouldn't leak into type) |
| 4 | medium | 14. Go/Java-style names | `model.ts:88` + `client.ts:200` | `DestroyContextRequest` / `destroy()` | "Destroy" is unusual in JS/TS REST clients; `delete` is more idiomatic — but match Go SDK |
| 5 | medium | 6. Misleading name | `client.ts:450` | `CreateWaiter` | Waits for **context** to become RUNNING; not for "create" success. Rename `CreateContextWaiter`. |
| 6 | medium | 6. Misleading name | `client.ts:373` | `CancelWaiter` | Waits for **command** cancellation. Rename `CancelCommandWaiter`. |
| 7 | medium | 6. Misleading name | `client.ts:524` | `ExecuteWaiter` | Waits for **command** completion. Rename `ExecuteCommandWaiter`. |

---

## Detailed Findings

### Finding 1 — High — Cat 4 (Underscores in TS identifiers)
**Location:** every enum-style member key in `model.ts:22-67`.
**Issue:** TS identifier convention is PascalCase for type-namespace
members. The enums are emitted as `const` objects whose keys —
`COMMAND_CANCELLED`, `IMAGES_RESULT`, `PYTHON`, `SCALA` — are all
SHOUTY_SNAKE_CASE, which violates the Google TypeScript style guide
(`SCREAMING_SNAKE_CASE` only for *constants*, not enum members).
**Proposed:** convert every member key to PascalCase. The string value
may retain the wire format (`Cancelled`) to preserve serialisation, but
the *key* should be `Cancelled`. Example:
```ts
export const CommandStatus = {
  CommandStatusUnspecified: 'COMMAND_STATUS_UNSPECIFIED',
  Cancelled: 'Cancelled',
  Cancelling: 'Cancelling',
  Error: 'Error',
  Finished: 'Finished',
  Queued: 'Queued',
  Running: 'Running',
} as const;
```

---

### Finding 2 — High — Cat 16 (Field contradicts type domain) & Cat 9 (Plural mismatch)
**Location:** `src/v2/model.ts:130-157`
```ts
export interface Results { ... }
```
The type is called `Results` (plural) but represents **one** command's
result — a single `cause`, single `summary`, single `resultType`, single
`data` object. The plurality comes from the wire-level `fileNames` array
inside it, not from multiple results.
**Proposed:** rename to `Result` (singular).

---

### Finding 3 — Medium — Cat 7 (Overly verbose)
**Location:** `src/v2/model.ts:113, 125`
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

### Finding 4 — Medium — Cat 14 (Go/Java-style names)
**Location:** `src/v2/model.ts:88` + `client.ts:200`
**Issue:** `destroy` is unusual for a REST SDK. JS conventions favour
`delete` (e.g. `clusters.delete`, `jobs.delete`). However the backend
path is `/contexts/destroy`, so renaming the *method* would diverge.
**Proposed:** confirm with the Go SDK reference; if Go uses `Destroy`,
keep parity. Otherwise rename method to `delete()` (collides with TS
reserved word in expressions — typically requires bracket access).

---

### Finding 5 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:450`
```ts
export class CreateWaiter { ... }
```
The class waits for a *context* to reach `CONTEXT_RUNNING`. The name
"CreateWaiter" implies it waits for "create" to finish, but the
operation it's bound to (`create()`) returns immediately after
the context create call; the *waiter* polls a different endpoint
(`getContextStatus`) for terminal state.
**Proposed:** `CreateContextWaiter` or `ContextWaiter` (parallel to the
target endpoint).

---

### Finding 6 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:373`
**Issue:** `CancelWaiter` waits for *command* cancellation.
**Proposed:** `CancelCommandWaiter`.

---

### Finding 7 — Medium — Cat 6 (Misleading name)
**Location:** `src/v2/client.ts:524`
**Issue:** `ExecuteWaiter` waits for *command* completion.
**Proposed:** `ExecuteCommandWaiter`.
