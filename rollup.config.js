import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import { dependencies } from './package.json'

const external = [...Object.keys(dependencies), 'fs', 'path']
export default {
  input: 'src/index.js',
  output: {
    file: 'bin/weact',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  plugins: [
    commonjs({
      sourceMap: false,
      namedExports: {
        'src/transform.js': ['transform'],
      },
      ignore: [
        '@babel/traverse',
        '@babel/generator',
      ]
    }),
    uglify({}, minify),
  ],
  external,
}
