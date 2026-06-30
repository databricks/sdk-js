import {defineConfig} from 'tsdown';

// Dual ESM+CJS bundling for the hand-written options package. Each public
// subpath export is its own entry. @databricks/sdk-auth and @databricks/sdk-core
// stay external.
export default defineConfig({
  entry: {
    'client/index': 'src/client/index.ts',
    'call/index': 'src/call/index.ts',
    'lro/index': 'src/lro/index.ts',
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
