import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import {
  version,
  homepage,
  author,
  license,
  main,
  module,
  browser,
  style
} from './package.json';

const name = 'A11YSlider';
const isProduction = !process.env.ROLLUP_WATCH;
const sourcemap = !isProduction ? 'inline' : false;
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const preamble = `/* a11y-slider - v${version}
* ${homepage}
* Copyright (c) ${new Date().getFullYear()} ${author}. Licensed ${license} */`;

export default (async () => ({
  input: './src/index.ts',
  output: [
    {
      file: main,
      format: 'cjs',
      sourcemap: false
    },
    {
      file: module,
      format: 'esm',
      sourcemap: false
    },
    {
      name,
      file: browser,
      format: 'umd',
      sourcemap: false
    }
  ],
  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
    // Compile TypeScript/JavaScript files
    babel({
      babelrc: false,
      extensions,
      exclude: ['node_modules/**', '[/\/core-js\//]'],
      runtimeHelpers: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: 'IE 11'
            },
            useBuiltIns: 'entry',
            corejs: '3.2'
          }
        ],
        '@babel/typescript'
      ],
      plugins: [
        '@babel/plugin-transform-typescript',
        '@babel/plugin-proposal-class-properties'
      ]
      // include: ['src/**/*']
    }),
    // Extract CSS and create separate file
    postcss({
      extract: style,
      minimize: true
    }),
    // Minify JS if production build
    isProduction &&
      terser({
        output: { preamble }
      }),
    // Dev server
    !isProduction &&
      serve({
        contentBase: ['test', 'dist'],
        open: true
      }),
    // Live reloading for dev server
    !isProduction && livereload()
  ]
}))();
