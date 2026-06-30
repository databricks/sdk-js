import {defineConfig} from 'tsdown';

// Dual ESM+CJS bundling for the hand-written core package. Each public subpath
// export is its own entry so consumers' subpath imports keep resolving; the
// browser variants are separate entries selected via the `browser` export
// condition. node: builtins and declared dependencies are externalized.
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'profiles/index': 'src/profiles/index.ts',
    'profiles/index.browser': 'src/profiles/index.browser.ts',
    'wkt/index': 'src/wkt/index.ts',
    'clientinfo/index': 'src/clientinfo/index.ts',
    'clientinfo/index.browser': 'src/clientinfo/index.browser.ts',
    'http/index': 'src/http/index.ts',
    'logger/index': 'src/logger/index.ts',
    'ops/index': 'src/ops/index.ts',
    'apierror/index': 'src/apierror/index.ts',
    'apierror/codes/index': 'src/apierror/codes/index.ts',
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
