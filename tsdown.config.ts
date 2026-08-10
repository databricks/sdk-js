import {defineConfig} from 'tsdown';

export default defineConfig({
  entry: {
    '*': 'src/**/*.ts',
  },
  outDir: 'dist',
  format: 'esm',
  platform: 'neutral',
  target: 'es2024',
  minify: false,
  dts: {
    resolver: 'tsc',
    sourcemap: true,
  },
  sourcemap: true,
  clean: false,
  unbundle: true,
  hash: false,
  external: id => /^[^./]/.test(id),
  tsconfig: './tsconfig.json',
  outExtensions: () => ({
    js: '.js',
  }),
});
