import {defineConfig} from 'tsdown';

// Dual ESM+CJS bundling for the hand-written auth package. Each public subpath
// export is its own entry; browser variants are separate entries exposed via
// the explicit /browser subpaths. @databricks/sdk-core and zod stay external.
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'credentials/index': 'src/credentials/index.ts',
    'credentials/index.browser': 'src/credentials/index.browser.ts',
    'oidc/index': 'src/oidc/index.ts',
    'oidc/index.browser': 'src/oidc/index.browser.ts',
  },
  outDir: 'dist',
  format: ['esm', 'cjs'],
  platform: 'neutral',
  dts: true,
  sourcemap: true,
  clean: true,
  hash: false,
  tsconfig: './tsconfig.json',
});
