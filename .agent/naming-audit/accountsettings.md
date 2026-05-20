# Naming Audit: accountsettings

**Path:** `/home/parth.bansal/sdk-js/packages/accountsettings/`
**Versions audited:** v1
**Inferred domain:** Account-level Databricks settings governing compliance profiles, IP access toggles, legacy-feature flags, ESM/CSP enablement, LLM-proxy partner-powered AI, and the Personal Compute default policy.
**Total weird names flagged:** 42

## Summary table

| # | Severity | Category | Identifier | File:line |
|---|----------|----------|------------|-----------|
| 1 | High | Redundant enum prefix | `COMPLIANCE_STANDARD_UNSPECIFIED` | `model.ts:10` |
| 2 | High | Acronym casing / cryptic abbreviation | `DcpAccountEnableMessage` (DCP) | `model.ts:61,126` |
| 3 | High | Cryptic abbreviation | `Csp*` (CSP) family | `model.ts:92-124,286-300,454-463` |
| 4 | High | Cryptic abbreviation | `Esm*` (ESM) family | `model.ts:242-268,318-332,478-487` |
| 5 | High | Cryptic abbreviation | `Llm*` (LLM) family | `model.ts:334-364,382-418,490-511` |
| 6 | High | Generic field name | `value` (everywhere on `*Setting` types) | `model.ts:82-85, 118-124, 127, 236-239, 262-268, 398, 417, 436-439` |
| 7 | High | Generic + cryptic field | `acctIpAclEnable` | `model.ts:83-84` |
| 8 | High | Generic field name | `booleanVal` discriminator | `model.ts:398, 417` |
| 9 | High | Underspecified ID | `accountId` (no type/format hint) | `model.ts:131,161,191,271,...` |
| 10 | High | Domain-redundant suffix | `*Setting` suffix duplicating `Settings` package | `model.ts:102,246,420` and elsewhere |
| 11 | Medium | Type-suffix tautology | `CspEnablementAccountSetting` | `model.ts:102` |
| 12 | Medium | Type-suffix tautology | `EsmEnablementAccountSetting` | `model.ts:246` |
| 13 | Medium | Type-suffix tautology | `PersonalComputeSetting` | `model.ts:420` |
| 14 | Medium | Duplicate concept | `*Account` vs `*AccountSetting` parallel naming | `model.ts:92 vs 102; 242 vs 246` |
| 15 | Medium | Misleading | `LlmProxyPartnerPoweredEnforce` | `model.ts:401` |
| 16 | Medium | Misleading | `LlmProxyPartnerPoweredAccount` | `model.ts:382` |
| 17 | Medium | Verb-tense / action verb | `AccountIpAccessEnable` (verb as noun) | `model.ts:66` |
| 18 | Medium | Verb-tense / action verb | `DisableLegacyFeatures` (verb-phrase as noun) | `model.ts:220` |
| 19 | Medium | Verb-tense / action verb | `DcpAccountEnableMessage` (verb in noun position) | `model.ts:126` |
| 20 | Medium | Inconsistent action verbs | `delete*` reverts to default (not actual delete) | `client.ts:104,184` |
| 21 | Medium | Singular/plural mismatch | `complianceStandards` array on type named `CspEnablementAccount` (no list role implied) | `model.ts:99` |
| 22 | Medium | Misleading | `settingName` always coerced to `"default"` server-side | `model.ts:81,117,...; client.ts:109,...` |
| 23 | Medium | Misleading | `settingTypeName` ignored (path param wins) | `client.ts:111-113` (no doc) |
| 24 | Medium | Vague / overly verbose | `*EnablementAccount` family naming | `model.ts:92,242` |
| 25 | Medium | Overly verbose | `UpdateLlmProxyPartnerPoweredEnforceRequest` | `model.ts:502` |
| 26 | Medium | Overly verbose | `UpdateCspEnablementAccountSettingRequest` | `model.ts:454` |
| 27 | Medium | Acronym casing | `Ip` vs `IP` in `AccountIpAccessEnable` | `model.ts:66` |
| 28 | Medium | Acronym casing | `Id` vs `ID` in `accountId` | `model.ts:131,...` |
| 29 | Medium | Method name redundancy | `getCspEnablementAccountSetting` / etc. | `client.ts:262,302,...` |
| 30 | Medium | Method name redundancy | `updatePersonalComputeSetting` | `client.ts:682` |
| 31 | Medium | Duplicate concept | `Account` repeated in nearly every type | `model.ts` passim |
| 32 | Low | Acronym casing | `etag` field cased as `etag` everywhere but doc says "eTag" | `model.ts:68,75` |
| 33 | Low | Cryptic abbreviation | `acct_ip_acl_enable` wire key | `model.ts:530,541-543`; `client.ts:109,229,500` |
| 34 | Low | Cryptic abbreviation | `dcp_acct_enable` wire key | `client.ts:189,463,686` |
| 35 | Low | Cryptic abbreviation | `shield_csp_enablement_ac` / `shield_esm_enablement_ac` (trailing `_ac`) | `client.ts:266,343,529,590` |
| 36 | Low | Long enum value | `COMPLIANCE_STANDARD_UNSPECIFIED` | `model.ts:10` |
| 37 | Low | Long enum value | `CYBER_ESSENTIAL_PLUS`, `CANADA_PROTECTED_B`, `GERMANY_TISAX`, `FEDRAMP_MODERATE` | `model.ts:19-53` |
| 38 | Low | Verb-tense inconsistency | `Enable` (imperative) vs `Enablement` (noun) co-exist | `model.ts:66 vs 92,102` |
| 39 | Low | Singular/plural mismatch | `DisableLegacyFeatures` (plural type with singular boolean) | `model.ts:220-239` |
| 40 | Low | Acronym casing | `Url` vs `URL` in `httpReq.url` (field defined upstream) | `utils.ts:71,103` |
| 41 | Low | Inconsistent action verbs | `revert` semantics doc'd, but method named `delete*` | `client.ts:104,184` |
| 42 | Low | Vague / generic field | `setting?` on update requests | `model.ts:449,461,473,485,497,509,521` |

---

## High severity

### 1. `COMPLIANCE_STANDARD_UNSPECIFIED` — redundant enum prefix
- **File:line:** `model.ts:10`
- **Category:** Redundant enum prefix (`X_X_Y` pattern)
- **Suggestion:** Just `UNSPECIFIED`.
- **Rationale:** The enum is already named `ComplianceStandard`, so `ComplianceStandard.COMPLIANCE_STANDARD_UNSPECIFIED` triple-stutters the namespace. TypeScript enums are accessed via the enum identifier; the redundant prefix is a proto3-wire artefact that should not bleed into the TS surface. (All other members — `HIPAA`, `PCI_DSS`, etc. — correctly omit the prefix, making the inconsistency starker.)

### 2. `DcpAccountEnableMessage` — undocumented cryptic acronym ("DCP")
- **File:line:** `model.ts:61, 126`
- **Category:** Cryptic abbreviation
- **Suggestion:** `DefaultComputePolicy` or, at minimum, attach a doc comment explaining the acronym. The whole type is a wrapper around a 2-value enum and could be inlined as `PersonalComputeAccess` with values `ON | DELEGATE`.
- **Rationale:** "DCP" is not defined anywhere in this package. From the surrounding wire path `dcp_acct_enable` and the doc on `PersonalComputeSetting`, it appears to mean "default Personal Compute policy" — but a reader has to reverse-engineer that. A 1:1 port may have to keep the type for compatibility, but the JSDoc must explain the acronym.

### 3. `Csp*` family — undocumented cryptic acronym ("CSP")
- **File:line:** `model.ts:92, 102` and request variants
- **Category:** Cryptic abbreviation
- **Suggestion:** Spell out `ComplianceSecurityProfile` in the type names or add a top-of-file JSDoc glossary. The first comment on line 96 finally expands "Compliance Security Profile (CSP)" but only in passing — the type name itself stays cryptic.
- **Rationale:** "CSP" overloads heavily in web context (Content Security Policy), so the abbreviation is misleading as well as cryptic. The expansion is documented but only deep inside a field comment.

### 4. `Esm*` family — undocumented cryptic acronym ("ESM")
- **File:line:** `model.ts:242, 246`
- **Category:** Cryptic abbreviation
- **Suggestion:** `EnhancedSecurityMonitoring*` or attach an inline doc. The method JSDoc on `client.ts:338` finally expands it ("enhanced security monitoring") — but the type itself never does.
- **Rationale:** Same problem as CSP. The reader has to grep the client to find the expansion.

### 5. `Llm*` family — cryptic / underspecified acronym ("LLM")
- **File:line:** `model.ts:334-418, 490-511`
- **Category:** Cryptic abbreviation + verbose stacking
- **Suggestion:** `LargeLanguageModelProxyPartnerPowered*` is unwieldy, but a domain-specific short name like `AiProxyPartnerPowered*` or `ModelProxyPartnerPowered*` would at least drop the redundant "Llm" capitalization issue. Better: a single top-level type `PartnerPoweredAi*` with sub-fields.
- **Rationale:** "Llm" mixes acronym + token-casing rules: TypeScript style says either `LLM` (acronym-case for known acronyms) or `Llm` (Pascal-token-case). The codebase consistently uses `Llm`, but the larger problem is stacking cryptic + cryptic + ambiguous — "LlmProxyPartnerPoweredEnforce" parses with several plausible bracketings.

### 6. `value` field on every `*Setting` discriminated union — generic field name losing meaning
- **File:line:** `model.ts:82, 118, 127, 236, 262, 398, 417, 436`
- **Category:** Generic field name losing meaning
- **Suggestion:** Name the field after what it discriminates: `payload`, or after the specific domain concept (e.g. `enabled`, `personalCompute`) per use site.
- **Rationale:** Eight different types in this package use a `value?: {...}` field, each with a discriminated union of `$case: '<x>'`. Because the field name is identical across all of them, IDE autocomplete and code review provide no hint about what the field actually represents at any given use site — `setting.value` reads identically whether the underlying meaning is "IP ACL toggle", "legacy features disabled", or "partner-powered AI enforcement".

### 7. `acctIpAclEnable` — cryptic + abbreviated discriminator value
- **File:line:** `model.ts:83-84`
- **Category:** Cryptic abbreviation, generic field name
- **Suggestion:** `accountIpAclEnabled` (or simply `enabled`).
- **Rationale:** `acct` is a non-standard abbreviation of `account` that saves three characters. Inside a TypeScript SDK there is no length-budget reason to abbreviate. The fact that the parent type is already `AccountIpAccessEnable` makes the abbreviation noise.

### 8. `booleanVal` — generic discriminator value
- **File:line:** `model.ts:398, 417`
- **Category:** Generic field name losing meaning
- **Suggestion:** `enabled` (it is, in fact, a boolean toggle of partner-powered AI features per the method doc).
- **Rationale:** `booleanVal` describes the *type* not the *meaning* of the field. In a domain-specific union case, the case name should describe what it represents. (`acctIpAclEnable` and `disableLegacyFeatures` and `personalCompute` follow domain naming; `booleanVal` does not.)

### 9. `accountId` — underspecified ID
- **File:line:** `model.ts:131, 161, 191, 271, 287, 303, 319, 335, 351, 367, 443, 455, 467, 479, 491, 503, 515`
- **Category:** Underspecified ID
- **Suggestion:** Add a doc comment that names the type (UUID? numeric? Databricks-internal?). Currently the `UpdateAccountIpAccessEnableRequest.accountId` is documented (`<Databricks> account ID of the account being managed.`) but the others are not.
- **Rationale:** "accountId" leaves the reader unsure whether to pass `"123"`, `"abcd-...-uuid"`, or `"my-account@databricks.com"`. The doc inconsistency (only the update variants document it) makes this worse.

### 10. `*Setting` suffix vs package name `accountsettings`
- **File:line:** package level
- **Category:** Redundant suffix in domain
- **Suggestion:** Drop the `Setting` suffix from type names within the `accountsettings` package, or drop the trailing `s` from the package name. (Compare: a package called `users` whose types are all `UserUser`, `UserAccountUser`.) E.g. `CspEnablementAccountSetting` -> `CspEnablementAccount` (which already exists as a sub-type).
- **Rationale:** Every consumer reaches these types via `accountsettings.X`, so `accountsettings.PersonalComputeSetting` triple-stutters the domain.

---

## Medium severity

### 11–13. `CspEnablementAccountSetting`, `EsmEnablementAccountSetting`, `PersonalComputeSetting` — type-suffix tautology
- **File:line:** `model.ts:102, 246, 420`
- **Category:** Type-suffix tautology
- **Suggestion:** Drop `Setting` (see #10). For ESM/CSP the inner type already drops it (`CspEnablementAccount`, `EsmEnablementAccount`).
- **Rationale:** The package is `accountsettings`, the method is `getCspEnablementAccountSetting`, returning a `CspEnablementAccountSetting`. The word "setting" appears three times in one call. This is the classic Go-port symptom — Go has no such namespace, so the redundancy is required there; in TS it is gratuitous.

### 14. `*Account` vs `*AccountSetting` — duplicate-concept parallel naming
- **File:line:** `model.ts:92 vs 102; 242 vs 246`
- **Category:** Duplicate concept
- **Suggestion:** Rename one half of each pair so the two types describe distinct concepts at a glance, or document the relationship in both JSDocs.
- **Rationale:** Two types differing by one suffix (`CspEnablementAccount` vs `CspEnablementAccountSetting`) invite bugs where the consumer references the wrong one — the distinction between "data" and "envelope" is invisible from the name alone.

### 15. `LlmProxyPartnerPoweredEnforce` — misleading
- **File:line:** `model.ts:401`
- **Category:** Misleading / verb-tense in noun position
- **Suggestion:** `LlmProxyPartnerPoweredEnforcement` (noun), and the method should be `getLlmProxyPartnerPoweredEnforcement`.
- **Rationale:** `Enforce` is the imperative verb; the type represents the *enforcement setting state*. The doc on `client.ts:418` reads `Gets the enforcement status of partner powered AI features account setting` — confirming the type is a noun-of-enforcement, not the verb.

### 16. `LlmProxyPartnerPoweredAccount` — misleading
- **File:line:** `model.ts:382`
- **Category:** Misleading
- **Suggestion:** `LlmProxyPartnerPoweredEnabled` (or drop "Account" — every type in the package is account-scoped, the qualifier adds no information).
- **Rationale:** "Account" here doesn't refer to a sub-account or an account entity — it means "scoped to the account level," which is already true of every type in the package. The name suggests an Account *object* rather than an *enablement state*.

### 17. `AccountIpAccessEnable` — verb-as-noun
- **File:line:** `model.ts:66`
- **Category:** Verb-tense inconsistency
- **Suggestion:** `AccountIpAccessToggle` (matches the method doc on `client.ts:104` "the account IP access toggle setting"), or `AccountIpAccessEnabled` (state).
- **Rationale:** Types should be nouns. `Enable` is an imperative verb. The wire field name `acct_ip_acl_enable` likewise reads as a command, not a state. The doc itself calls this a "toggle setting" — that name would be far more idiomatic.

### 18. `DisableLegacyFeatures` — verb-phrase as type name
- **File:line:** `model.ts:220`
- **Category:** Verb-tense inconsistency
- **Suggestion:** `LegacyFeaturesDisabled` or `LegacyFeaturesToggle`.
- **Rationale:** `DisableLegacyFeatures` parses as "an action that disables legacy features." Types describing the *state of the toggle* should read as such.

### 19. `DcpAccountEnableMessage` — verb in noun position
- **File:line:** `model.ts:126`
- **Category:** Verb-tense inconsistency
- **Suggestion:** `PersonalComputeAccess` (since this is in fact the personal compute policy state); drop the `Enable` imperative verb.
- **Rationale:** `Enable` is an imperative verb; the type represents a state. Types describing the state of a toggle should read as nouns.

### 20 / 41. `delete*` methods that actually revert
- **File:line:** `client.ts:104 (deleteAccountIpAccessEnable doc: "Reverts the value..."), 184 (deletePersonalComputeSetting doc: "Reverts back ... to default (ON)")`
- **Category:** Inconsistent action verbs / misleading
- **Suggestion:** `reset*ToDefault()` (the semantics are reset-to-default, not destruction). At minimum, the method JSDoc and the verb should agree.
- **Rationale:** A `delete` HTTP verb is being used to reset state — that is the *server's* idiom. The SDK can hide it with a more accurate verb. The doc literally says "Reverts" — a reader scanning method names will not see that.

### 21. `complianceStandards` array on `CspEnablementAccount` (singular type, plural field)
- **File:line:** `model.ts:99`
- **Category:** Singular/plural mismatch (mild — the field is plural because it's a list, which is correct; the audit checklist asks me to flag interactions). Actually this is fine — flagged only to note it's *consistent*.
- **Suggestion:** No change.

### 22. `settingName` documented to be ignored, "must be `default`"
- **File:line:** `model.ts:81, 117, 235, 261, 397, 416, 435`
- **Category:** Misleading
- **Suggestion:** Either remove the field from the TS surface (since the doc says it will not be respected on requests and is always `"default"` server-side) or rename to `settingName_readOnly` and mark it `readonly`.
- **Rationale:** Exposing a field that the API explicitly ignores invites confused user code. The doc says verbatim: "This field is populated in the response, but it will not be respected even if it's set in the request body. The setting name in the path parameter will be respected instead."

### 23. `settingTypeName` query param has no purpose
- **File:line:** `client.ts:111-113` (and every other method that appends it as a query param)
- **Category:** Misleading / vague
- **Suggestion:** Remove from request types (the actual type is hard-coded into the URL path) or document that it is informational only.
- **Rationale:** The URL already encodes `types/acct_ip_acl_enable`; appending `?setting_type_name=acct_ip_acl_enable` is at best a no-op. If it's required for some legacy reason, that needs a comment.

### 24. `*EnablementAccount` family — verbose and weak
- **File:line:** `model.ts:92, 242`
- **Category:** Vague / overly verbose
- **Suggestion:** Drop `Enablement` — it adds no information beyond "this thing represents whether the feature is enabled," which is already implied by the boolean fields. `CspAccount` / `EsmAccount`, or better, `CspState` / `EsmState`.
- **Rationale:** "Enablement" is an awkward noun coined to allow modeling "the state of enablement of X." Standard English would say "X enabled" (adjective) or just "X" with a bool field.

### 25–26. `UpdateLlmProxyPartnerPoweredEnforceRequest` / `UpdateCspEnablementAccountSettingRequest` — overly verbose
- **File:line:** `model.ts:502, 454`
- **Category:** Overly verbose
- **Suggestion:** Shorter forms like `UpdateLlmProxyEnforcementRequest` / `UpdateCspRequest`, paired with the renames in #14 and #24.
- **Rationale:** 38 characters in `UpdateLlmProxyPartnerPoweredEnforceRequest` is too long to scan, and most of it is fixed boilerplate ("PartnerPowered", "Account", "Setting", "Request").

### 27. `Ip` vs `IP` acronym casing
- **File:line:** `model.ts:66` (and references)
- **Category:** Acronym casing inconsistency
- **Suggestion:** Pick one. TypeScript's de-facto style (and the Google TS style guide) treats 2-letter acronyms as PascalCase tokens (`Ip`), so `AccountIpAccessEnable` is actually correct by that rule. But the Go SDK uses `IP`; the JS SDK is consistent with TS conventions here. Just note for the audit.
- **Rationale:** Within this package the choice is consistent; cross-package consistency should be verified.

### 28. `Id` vs `ID` acronym casing
- **File:line:** `model.ts:131, 161, 191, ...`
- **Category:** Acronym casing inconsistency
- **Suggestion:** Same as #27 — `Id` matches TS conventions.
- **Rationale:** Same as #27.

### 29. Method-name redundancy: `getCspEnablementAccountSetting`
- **File:line:** `client.ts:262, 302, 339, 379, 419, 459`
- **Category:** Method name redundancy
- **Suggestion:** Drop `Setting` from method names (the `Client` is already account-settings-scoped; `client.getCsp()` is unambiguous in context).
- **Rationale:** `accountsettings.Client.getCspEnablementAccountSetting()` repeats "setting" in package + method. Compare similar SDKs where `settings.Client.getCsp()` is the norm.

### 30. `updatePersonalComputeSetting` — same redundancy
- **File:line:** `client.ts:682`
- **Category:** Method name redundancy
- **Suggestion:** `updatePersonalCompute()`.
- **Rationale:** Same as #29.

### 31. `Account` repeated in nearly every type
- **File:line:** `model.ts` passim
- **Category:** Duplicate concept (package scope already implies account-level)
- **Suggestion:** Drop the `Account` prefix/suffix where the package name (`accountsettings`) already conveys it.
- **Rationale:** `CspEnablementAccount` → `CspEnablement`. `EsmEnablementAccount` → `EsmEnablement`. `AccountIpAccessEnable` → `IpAccessEnable`. The current scheme reads like the Go SDK's flat namespace, where the prefix is needed; in a packaged TS SDK it is purely stutter.

---

## Low severity

### 32. `etag` field cased as `etag` but JSDoc consistently says "eTag"
- **File:line:** `model.ts:68 (field: `etag`), 75 (doc: "as the eTag provided")`
- **Category:** Acronym casing inconsistency
- **Suggestion:** Pick `etag` everywhere (HTTP standard is `ETag` per RFC 7232 but most code uses `etag`).
- **Rationale:** Within a single JSDoc block, line 68 declares `etag?: string` and line 70 capitalizes it as `eTag`. Trivial inconsistency.

### 33. `acct_ip_acl_enable` wire key
- **File:line:** `model.ts:530, 541-543`; `client.ts:109, 229, 500`
- **Category:** Cryptic abbreviation (server-controlled, but leaks via the discriminator `$case: 'acctIpAclEnable'`)
- **Suggestion:** Server side can keep wire keys; the TS-facing discriminator `$case: 'acctIpAclEnable'` should be `accountIpAclEnable` or `enabled`.
- **Rationale:** Users have to type the `$case` string literal, so abbreviations cost real ergonomics.

### 34. `dcp_acct_enable` wire key
- **File:line:** `client.ts:189, 463, 686`
- **Category:** Cryptic abbreviation (server-side path)
- **Suggestion:** N/A (server URL is fixed). Note for observability.

### 35. `shield_csp_enablement_ac` / `shield_esm_enablement_ac` wire keys
- **File:line:** `client.ts:266, 343, 529, 590`
- **Category:** Cryptic abbreviation (server-side path)
- **Suggestion:** N/A. The trailing `_ac` (presumably "account") is an artefact of server naming.

### 36. `COMPLIANCE_STANDARD_UNSPECIFIED` — long enum value
- **File:line:** `model.ts:10`
- **Category:** Long enum value
- **Suggestion:** See #1.

### 37. Long enum values (`CYBER_ESSENTIAL_PLUS`, `CANADA_PROTECTED_B`, `GERMANY_TISAX`, `FEDRAMP_MODERATE`, `FEDRAMP_HIGH`, `FEDRAMP_IL5`, `ITAR_EAR`, `GERMANY_C5`, `ISMAP`, `HITRUST`, `K_FSI`, `ARC_AMPE`)
- **File:line:** `model.ts:19-53`
- **Category:** Long enum values
- **Suggestion:** Keep — these are well-known compliance standard names where the string literal *is* the canonical form. Flagging only for completeness.
- **Rationale:** Compliance standards have official names. Shortening `FEDRAMP_MODERATE` to `FEDRAMP_MOD` would be a regression.

### 38. `Enable` (verb) vs `Enablement` (noun) co-exist
- **File:line:** `model.ts:66 (AccountIpAccessEnable) vs 92, 102 (CspEnablement...) vs 220 (DisableLegacyFeatures)`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Standardize: either `*Enabled` (boolean adjective) or `*Toggle` (noun) across all toggle types.
- **Rationale:** Within one package, three different lexical forms describe the same concept ("a boolean toggle"). A reader can't predict the form for a new toggle.

### 39. `DisableLegacyFeatures` — plural noun, singular boolean
- **File:line:** `model.ts:220-239`
- **Category:** Singular/plural mismatch (mild)
- **Suggestion:** `DisableLegacyFeaturesToggle` (it's a single bool, not a list of features).
- **Rationale:** The bare plural reads as "a list of disable-legacy-feature entries"; the type body shows it's a single bool.

### 40. `Url` vs `URL` casing
- **File:line:** `utils.ts:71, 103` (HttpRequest field used as `url`)
- **Category:** Acronym casing inconsistency
- **Suggestion:** Conforms to TS convention (`url`/`Url`). Note for the audit.

### 41. (see #20)

### 42. `setting?` on every update request — vague
- **File:line:** `model.ts:449, 461, 473, 485, 497, 509, 521`
- **Category:** Vague / generic field name
- **Suggestion:** Name the field after its type (`personalCompute?: PersonalComputeSetting`) — when there's exactly one payload type per request, the parameter name should reflect it.
- **Rationale:** `req.setting` is so generic the IDE auto-complete tells the user nothing. `req.personalCompute` would.

---

## Observations

1. **Acronym soup.** Within the file you encounter CSP, ESM, DCP, LLM, IP, ACL, ESC (Enhanced Security Compliance), CMS (Centers for Medicare & Medicaid Services), ITAR/EAR, ISMAP, HITRUST, K-FSI, C5, TISAX, ARC-AMPE — without a single glossary. The compliance-standard acronyms have JSDoc, but the type-name acronyms (CSP, ESM, DCP, LLM) do not. A top-of-file `@module` doc that expands these would be high-ROI.

2. **`Setting` suffix is gratuitous.** The package is `accountsettings`, the client is `Client`, and the methods are `getX`/`updateX`. The `Setting` suffix repeats in 7 of 11 main types. Even keeping a 1:1 port from Go, a TS-idiomatic façade could re-export these with cleaner names.

3. **`settingName` is documented to be ignored.** Exposing a field on a request where the docstring says "this field…will not be respected even if it's set" is hostile to consumers. Either remove it or mark it `readonly` and explain.

4. **`Enable` vs `Enablement` vs `Disable` vs `DisableLegacyFeatures`.** Within one package, four different verb/noun forms describe boolean toggles. A small style decision (every toggle type ends in `Toggle` or every toggle exposes `enabled: boolean`) would tighten the surface considerably.

5. **`Delete` HTTP verb is named `delete` in the SDK but means "reset to default."** Method JSDoc says "Reverts the value...to default (ON)." A more honest method name (`reset*ToDefault`) would help consumers reason about what is destroyed.

6. **`accountId` is the only field that varies across requests, and it is optional everywhere** because the client constructor accepts an `accountId` fallback. That coupling is good UX. But the JSDoc explanation only appears on update requests, not get/delete — a small inconsistency.

7. **Field-mask functions (`accountIpAccessEnableFieldMask`, etc.) follow a clear lowerCamelCase pattern**, but the leading `acct` in `acct_ip_acl_enable` (wire) does not propagate (TS surface uses `accountIpAclEnable`). Good — but it means the wire-to-TS rename rules are non-obvious.

---

## Domain glossary

| Acronym / token | Expansion | Mentioned in code? |
|-----------------|-----------|--------------------|
| **CSP** | Compliance Security Profile | Yes, `model.ts:96` (one-time) |
| **ESM** | Enhanced Security Monitoring | Only in method JSDoc `client.ts:338` |
| **ESC** | Enhanced Security Compliance | Yes, `model.ts:13` |
| **DCP** | (Default) Personal Compute policy | No (inferred from wire key `dcp_acct_enable` + neighbouring docs) |
| **LLM** | Large Language Model | No |
| **ACL** | Access Control List | Yes (wire only, `acct_ip_acl_enable`) |
| **IP** | Internet Protocol (network address) | Implicit |
| **AIP** | API Improvement Proposals (Google) | `model.ts:447` ("Added for AIP compliance.") — undocumented |
| **etag** | Entity tag (HTTP cache validator, RFC 7232) | Yes (in field doc) |
| **SHIELD** | Databricks security product line | `model.ts:7` (one-time, undefined) |

---

## File coverage

| File | Lines read | Coverage |
|------|-----------|----------|
| `src/v1/index.ts` | 40 (full) | 100% — exports inventory only, no naming surprises beyond the type names already audited from `model.ts`. |
| `src/v1/model.ts` | 1204 (full) | 100% — all 23 types, 2 enums, 16 zod schemas, 7 field-mask helpers audited. |
| `src/v1/client.ts` | 710 (full) | 100% — all 13 client methods, constructor, and private fields audited. |
| `src/v1/utils.ts` | 151 (full) | 100% — utility functions reviewed; `HttpCallOptions`, `executeCall`, `parseResponse`, `marshalRequest`, `flattenQueryParams` have no naming issues worth flagging (they are infrastructure shared across packages and follow consistent conventions). |
