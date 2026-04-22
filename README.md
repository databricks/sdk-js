# Databricks Modular SDKs for JavaScript

> [!WARNING]
> ## PREVIEW - NOT FOR PRODUCTION USE
>
> **This SDK is in preview and is subject to change without notice.**
>
> - **Do NOT use in production environments**
> - **Breaking changes may occur at any time**
> - **APIs are experimental and unstable**
> - **Use for development and testing only**

## Design Notes

### FieldMask — Deferred Ergonomics Decisions

The current `FieldMask` implementation validates paths against a per-message
schema inside `FieldMask.build`, throws on mismatch, and stores the
wire-format paths privately so `toString()` produces the server-facing
comma-separated string. Construction entry point today is a **per-message
factory function** generated alongside each message — e.g.
`alertFieldMask('displayName', 'condition.op')` — which supplies the schema
and message name and delegates to `FieldMask.build`. This section records
two refinements we've discussed but deferred; they do not change the
validation semantics, only the call-site shape.

#### Q1 — Call-site ergonomics

**Current (Option C, per-message factory):**

```ts
import {alertFieldMask} from '@databricks/sdk-alerts/v1';
const mask = alertFieldMask('displayName', 'condition.op');
```

- Pros: best discoverability (auto-complete on import), single-argument call,
  error messages name the target message, and users never think about
  schemas or message names.
- Cons: one generated factory per message (~60+ across the SDK). Each is a
  thin one-liner, but they multiply with every new message.

**Option A — raw `FieldMask.build` at the call site:**

```ts
import {FieldMask} from '@databricks/sdk-core/wkt';
import {Alert, alertFieldMaskSchema} from '@databricks/sdk-alerts/v1';

const mask = FieldMask.build<Alert>(
  ['displayName', 'condition.op'],
  alertFieldMaskSchema,
);
```

- Pros: zero helper functions anywhere. Only `FieldMask.build` exists.
- Cons: two-argument low-level call at every usage site. Users must
  import the schema explicitly and know which schema pairs with which
  type.

**Option B — one generic helper in `sdk-core`:**

```ts
import {fieldMask} from '@databricks/sdk-core/wkt';
import {Alert} from '@databricks/sdk-alerts/v1';

const mask = fieldMask(Alert, 'displayName', 'condition.op');
```

- Pros: a single `fieldMask(...)` replaces the ~60+ per-message factories.
  `Alert` supplies both the schema and the message name as properties on
  itself, so the call site stays one argument plus paths.
- Cons: requires `Alert` the import to be **both** a TypeScript type and a
  runtime descriptor value on the same name. See Q2 below.

#### Q2 — Interface + const declaration merging on the message name

A TypeScript pattern that lets one exported identifier occupy both the
type-space and the value-space:

```ts
// Type — describes instance shape. Zero runtime cost.
export interface Alert {
  displayName?: string;
  condition?: Condition;
}

// Runtime value — carries the schema under the same name.
export const Alert: MessageDescriptor<Alert> = {
  fieldMaskSchema: {
    displayName: {wire: 'display_name'},
    condition:   {wire: 'condition', children: () => Condition.fieldMaskSchema},
  },
};
```

Usage after this change:

```ts
const a: Alert = {displayName: 'foo'};        // Alert as a type (literal shape)
const s = Alert.fieldMaskSchema;              // Alert as a value (runtime)
const mask = fieldMask(Alert, 'displayName'); // Option B unblocked
```

TypeScript supports this via
[declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).
`interface X` occupies type-space, `const X` occupies value-space; they do
not collide. The same pattern shows up in `lib.dom.d.ts`, `Promise`, and
various DI libraries.

- Pros: single import, natural `Alert.fieldMaskSchema` access, enables
  Option B without asking users to remember a separate `AlertSchema` name.
- Cons: the pattern is less common in everyday TS and can surprise readers
  who expect classes for anything with static-like members. The alternative
  is to use a distinct name — e.g. `AlertSchema` or `AlertDescriptor` — for
  the runtime value, at the cost of one extra identifier to learn per
  message.

#### Why we haven't landed Q1/Q2 yet

Both are call-site ergonomics refactors; neither changes the validation
semantics or the per-message schema generation. We want the current
`FieldMask.build` path (validate, translate, store wire paths privately,
`toString()` joins) to settle before adjusting the call-site shape, so
the two axes of change don't churn simultaneously. When we revisit, the
likely landing is **Option B + Option Q2** together — one generic
`fieldMask()` plus the interface+const merge, which most closely matches
what similar TypeScript validation libraries (Zod, Valibot, TypeBox, etc.)
expose while staying consistent with the SDK's existing interface-first
convention for message types.
