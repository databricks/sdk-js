// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {defineConfig} from 'tsdown';

export default defineConfig({
  entry: {
    'v2/index': 'src/v2/index.ts',
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
