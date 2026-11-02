# Version changelog

## Release v0.1.0 (2026-11-02)

### Breaking Changes
* Require Node.js 22.23.4, 24.22.1, 26.12.1 or a later release in the same line. Installing on any other Node.js release fails when the package manager enforces `engines` (Yarn 1, or npm and pnpm with `engine-strict`); otherwise it prints a warning. These releases fix a vulnerability in the Brotli decoder that Node.js bundles.

### Internal Changes
* Bump `auth` to v0.56.0.
* Bump `core` to v0.52.0.
* Bump `options` to v0.52.0.

## Release v0.0.6 (2026-10-27)

## Release v0.0.5 (2026-10-26)

### Internal Changes
* Bump `auth` to v0.55.0.
* Bump `options` to v0.51.4.

## Release v0.0.4 (2026-10-20)

### Internal Changes
* Bump `auth` to v0.54.0.
* Bump `options` to v0.51.3.

## Release v0.0.3 (2026-10-19)

## Release v0.0.2 (2026-10-15)

### Internal Changes
* Bump `auth` to v0.53.0.
* Bump `core` to v0.51.2.
* Bump `options` to v0.51.2.

## Release v0.0.1 (2026-10-13)
