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
  // Resolved glob order must not choose the order of shared external imports.
  inputOptions(options) {
    const input = options.input;
    if (input && typeof input === 'object' && !Array.isArray(input)) {
      options.input = Object.fromEntries(
        Object.entries(input).sort(([left], [right]) =>
          left < right ? -1 : left > right ? 1 : 0
        )
      );
    }
  },
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
