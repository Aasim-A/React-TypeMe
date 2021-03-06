import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default {
  input: pkg.main,
  output: {
    name: 'TypeMe',
    file: pkg.browser,
    format: 'umd',
    exports: 'named',
    globals: {
      react: 'React'
    }
  },
  external: ['react'],
  plugins: [
    replace({
      "process.env.NODE_ENV": 'development'
    }),
    babel({
      exclude: ['node_modules/**']
    }),
    resolve(),
    commonjs(),
    filesize(),
  ]
};
