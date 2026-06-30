// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {defineConfig} from 'tsdown';

export default defineConfig({
  entry: {
    'v1/index': 'src/v1/index.ts',
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
