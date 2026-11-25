# Version changelog


## Release v0.0.9 (2026-11-25)

### Bug Fixes
* Send an unset request body field as JSON `null`, as the Go SDK does, so the server checks it, instead of failing before sending.

## Release v0.0.8 (2026-11-24)

### Bug Fixes
* Reject a response that sets more than one field of a oneof, a group of fields of which at most one can be set, instead of returning the field that the API lists first. The Go and Java SDKs already reject such a response.

## Release v0.0.7 (2026-11-23)

### Internal Changes
* Bump `options` to v0.52.1.

## Release v0.0.6 (2026-11-19)

## Release v0.0.5 (2026-11-17)

## Release v0.0.4 (2026-11-16)

## Release v0.0.3 (2026-11-11)

## Release v0.0.2 (2026-11-09)

## Release v0.0.1 (2026-11-04)
