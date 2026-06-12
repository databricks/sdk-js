# Naming Audit: modelregistry

**Path:** `packages/modelregistry/src/v1/`
**Versions audited:** v1
**Inferred domain:** MLflow Model Registry (workspace-scoped, "classic"
MLflow). Registers ML models, model versions, stage transitions (None /
Staging / Production / Archived), transition-approval workflow, comments,
tags, latest-version lookups, registry webhooks, and Databricks-specific
permission/ACL extensions. Distinct from `registeredmodels` package which
is the Unity-Catalog-scoped successor.
**Total weird names flagged:** 15

## Summary
| Severity | Count |
| --- | --- |
| High | 13 |
| Medium | 1 |
| Low | 1 |

## High severity

### 1. `ActivityAction` enum and `availableActions` field — `model.ts:21-35, 221`
- **Why weird:** The field on `Activity` is named
  `availableActions: ActivityAction[]`, so the *type* is "actions". The
  enum mixes two unrelated domains (transition-request lifecycle + comment
  editing) into one type, and the docstring says so explicitly ("For
  activities…For comments…").
- **Category:** 17 (mixed-domain enum).
- **Suggested name:** Split into two enums: `TransitionRequestAction` and
  `CommentAction`.
- **Rationale:** A single enum forced to cover two domains becomes a
  bag-of-strings. Users typing `ActivityAction.` get suggested
  values that may be illegal for their actual context.

### 2. `RegistryEmailSubscriptionType` enum — `model.ts:123-131`
- **Why weird:** Enum name says `Type` but values are *states*
  (`ALL_EVENTS`, `DEFAULT`, `SUBSCRIBED`, `UNSUBSCRIBED`). `DEFAULT` and
  `ALL_EVENTS` overlap in meaning. The class doc-comment marks it
  Experimental. Also `Type` is a vague suffix.
- **Category:** 1 (vague `Type` suffix), 6 (misleading: not a "type",
  is a state).
- **Suggested name:** `RegistryEmailSubscriptionStatus` (matching the
  field name `emailSubscriptionStatus` on `ModelVersionDatabricks`).
- **Rationale:** The field consuming the enum is already called
  `emailSubscriptionStatus`; the enum should match.

### 3. `CommentObject` — `model.ts:260`
- **Why weird:** `Object` is the most generic suffix possible in TS
  (everything is an object). The type is already a TS object, so the
  suffix conveys nothing.
- **Category:** 1 (vague `Object` suffix), 20 (type-suffix tautology).
- **Suggested name:** `Comment`.
- **Rationale:** `Object` adds nothing; the type is already a TS object.

### 4. `GetRegisteredModelDatabricksRequest`, `RegisteredModelDatabricks`,
   `TransitionModelVersionStageDatabricksRequest`, `ModelVersionDatabricks` —
   `model.ts:559, 778, 996, 710`
- **Why weird:** `Databricks` as a type suffix. The whole SDK is the
  Databricks SDK; everything is "Databricks". The suffix is used to
  distinguish workspace-Databricks extensions from upstream MLflow
  fields, but that distinction is opaque to anyone who hasn't read the
  upstream MLflow spec.
- **Category:** 1 (vague suffix), 6 (misleading: implies non-Databricks
  variants exist in this SDK).
- **Suggested name:** Drop `Databricks` suffix; if a workspace-specific
  variant is needed, prefix with `Workspace`: `WorkspaceRegisteredModel`,
  `WorkspaceModelVersion`. Or fold the extra fields into the base type
  and gate by capability.
- **Rationale:** Either the field is supported (then merge) or it isn't
  (then split by capability). The current "shadow type per extension"
  is a generator artefact, not a user-friendly API.

### 5. `TransitionModelVersionStageDatabricksRequest` — `model.ts:996`
- **Why weird:** Six-word PascalCase identifier with awkward word
  order. Reads as "transition[verb]
  model-version-stage[object]-databricks[suffix]-request[suffix]". For a
  TS type, it should be a noun. Also functions identically to the
  `ApproveTransitionRequest` API (transitions a model version's stage)
  but uses a totally different naming scheme.
- **Category:** 6 (misleading verb-as-noun), 7 (overly verbose), 17
  (inconsistent action verbs).
- **Suggested name:** `WorkspaceTransitionStageRequest` or fold into
  `ApproveTransitionRequest` (the operations are very close).
- **Rationale:** Right now the SDK has `approveTransitionRequest` and
  `transitionModelVersionStageDatabricks` as sibling client methods
  performing similar workspace operations; the asymmetric names obscure
  this.

### 6. `GetRegisteredModelDatabricksRequest` request DTO — `model.ts:559`
- **Why weird:** Verb-phrase request type name (`GetX`) is OK if used
  consistently, but `GetRegisteredModelDatabricksRequest` is the only
  method the SDK exposes to fetch a registered model — there is no plain
  `GetRegisteredModelRequest`. The `Databricks` infix dangles in the
  public API for a feature that has no non-Databricks counterpart
  visible.
- **Category:** 6 (misleading), 8 (redundant suffix).
- **Suggested name:** `GetRegisteredModelRequest` (drop `Databricks`).
- **Rationale:** No need for the disambiguation suffix when there's no
  sibling.

### 7. `ListTransitionRequest` / `ListTransitionResponse` types vs
   `listTransitionRequests` method — `model.ts:666, 673`, `client.ts:535`
- **Why weird:** The client method is `listTransitionRequests` and its
  doc comment says "Gets a list of all open stage transition requests",
  so the operation lists *transition requests* (plural). But the request
  DTO is `ListTransitionRequest` (singular "Transition", missing the
  "Requests" noun) and the response is `ListTransitionResponse`, so the
  type names disagree with the method that consumes them. Sibling
  request DTOs in this file name the full operation noun (e.g.
  `CreateCommentRequest`, `DeleteRegistryWebhookRequest`,
  `RenameRegisteredModelRequest`); `ListTransitionRequest` reads instead
  as "a request to list a transition".
- **Category:** 9 (singular/plural mismatch), 6 (misleading), 20
  (type suffix tautology if renamed to `ListTransitionRequestsRequest`).
- **Suggested name:** Request type `ListTransitionRequestsRequest`;
  response type `ListTransitionRequestsResponse`.
- **Rationale:** The DTO names should describe the collection being
  listed — "transition requests", plural — matching the
  `listTransitionRequests` method.

### 8. `RegistryWebhook` vs `Webhook` — `model.ts:807`
- **Why weird:** Type is `RegistryWebhook` but client methods, paths,
  and request types alternate: `CreateRegistryWebhookRequest`,
  `ListRegistryWebhooksRequest`, `UpdateRegistryWebhookRequest`,
  `DeleteRegistryWebhookRequest`, `TestRegistryWebhookRequest`. Once
  you're inside the modelregistry package, every webhook *is* a registry
  webhook — the prefix is redundant.
- **Category:** 8 (redundant suffix/prefix), 7 (overly verbose).
- **Suggested name:** `Webhook`, `CreateWebhookRequest`,
  `ListWebhooksRequest`, `UpdateWebhookRequest`, `DeleteWebhookRequest`,
  `TestWebhookRequest`.
- **Rationale:** Package name already establishes the registry context.

### 9. `HttpUrlSpec` / `JobSpec` — `model.ts:568, 579`
- **Why weird:** `Spec` is a vague suffix shared by every config-bag
  in the SDK. Two sibling types in the same package, only the `Spec`
  suffix distinguishing them. `HttpUrlSpec` is the *target* of a webhook
  (URL + auth + TLS settings), `JobSpec` is the *target* of a webhook (job
  ID + workspace). They are two implementations of a "webhook
  destination", and the naming hides that.
- **Category:** 1 (vague `Spec` suffix), 6 (misleading).
- **Suggested name:** `HttpUrlTarget` / `JobTarget`, or
  `WebhookHttpTarget` / `WebhookJobTarget`.
- **Rationale:** The two together discriminate the webhook
  destination kind; the naming should make that obvious.

### 10. `LinkedFeature` — `model.ts:589`
- **Why weird:** Nothing about the type is "linked": its fields
  (`featureTableName`, `featureName`, `featureTableId`) are just
  identifiers pointing at a feature in the feature store, and the doc
  comment says only "Feature for model version." Even the package's own
  usage drops the prefix — `FeatureList.features` is typed
  `LinkedFeature[]` (`model.ts:525`).
- **Category:** 1 (vague), 6 (misleading: nothing "linked" about a
  feature-table-name + feature-name pair).
- **Suggested name:** `ModelFeatureReference` or just `FeatureRef`.
- **Rationale:** "Linked" doesn't describe anything specific to this
  type; the fields are identifiers referencing a feature-store entry.

### 11. `Databricks` as a suffix is overused
- **Why weird:** Distinct type names still end in `Databricks` (see #4):
  `RegisteredModelDatabricks`, `ModelVersionDatabricks`. Two more retain
  `Databricks` as an infix inside the new `Request` suffix
  (`GetRegisteredModelDatabricksRequest`,
  `TransitionModelVersionStageDatabricksRequest`). Each one is a
  workspace-specific extension. The `Databricks` token appearing inside
  the *Databricks SDK* is tautological.
- **Category:** 8 (redundant suffix), 20 (type-suffix tautology).
- **Suggested name:** See #4.
- **Rationale:** See #4.

### 12. `getRegisteredModelDatabricks` client method — `client.ts:430`
- **Why weird:** Method name carries `Databricks` mid-position (between
  the noun `RegisteredModel` and any conceptual suffix). The whole SDK
  is the Databricks SDK; embedding `Databricks` inside a method name is
  a proto/backend-architectural leak (the upstream proto distinguishes
  Databricks-flavoured RPCs from upstream-MLflow ones, but TS callers
  never see the non-Databricks variant). Compare to the sibling
  `getRegisteredModel`-shaped method that does *not* exist here — the
  `Databricks` infix dangles without a partner. Doc comment even reads
  "This is a `<Databricks>` workspace version of the [MLflow endpoint]",
  acknowledging the leak.
- **Category:** proto-architectural-leak (`Databricks` mid-position), 8
  (redundant infix), 14 (proto-style leakage into surface API).
- **Suggested name:** `getWorkspaceRegisteredModel` (scope-prefixed) or
  fold into `getRegisteredModel` and gate Databricks-only fields via
  capability. As a minimal change, drop the `Databricks` token:
  `getRegisteredModel`.
- **Rationale:** The infix encodes a proto-level distinction that has
  no analogue in this TS surface; remove it.

### 13. `transitionModelVersionStageDatabricks` client method —
   `client.ts:643`
- **Why weird:** Same `Databricks` mid-position leak as #12. The token
  sits between `Stage` and the implicit method suffix, marking the
  method as the workspace-extension variant of an upstream MLflow RPC.
  Method-name length (six words, 38 chars) is also a symptom: the verb
  `transition` + object `ModelVersionStage` + scope `Databricks` are
  all glued together. Doc comment repeats the proto leak: "This is a
  `<Databricks>` workspace version of the MLflow endpoint."
- **Category:** proto-architectural-leak (`Databricks` mid-position), 7
  (overly verbose), 14 (proto-style leakage into surface API).
- **Suggested name:** `transitionModelVersionStage` (drop the infix) or
  fold into `approveTransitionRequest`-style verbs since the operations
  overlap (see #5).
- **Rationale:** Same as #12 — the infix encodes a generator-side
  distinction that callers do not need.

## Medium severity

### 14. `listLatestVersions` / `ListLatestVersionsRequest` — `client.ts:1051`,
   `model.ts:598`
- **Why weird:** The method returns *one* version per stage, not "the
  latest version" globally. The name reads as "list the latest versions"
  (plural overall) but the meaning is "give me the latest one for each
  stage". The docstring on the method (`client.ts:1050`) says "Gets the
  latest version of a registered model" (singular) — that's *wrong*; the
  actual response returns a list keyed by stage.
- **Category:** 6 (misleading), 9 (singular/plural confusion).
- **Suggested name:** `listLatestVersionPerStage` or
  `listLatestVersionsByStage`.
- **Rationale:** Conveys the per-stage semantics.

## Low severity

### 15. `newName: string` on `RenameRegisteredModelRequest` — `model.ts:881`
- **Why weird:** Field doc says "If provided, updates the name for this
  `registered_model`." Slightly confusing because
  `RenameRegisteredModelRequest` is *the* rename operation — "if
  provided" implies optional, but rename without a new name is
  meaningless.
- **Category:** 6 (misleading semantics).
- **Suggested name:** Make it required (drop `?`), or document that
  omission is a no-op.
- **Rationale:** Optional-but-required-in-practice fields confuse users.
