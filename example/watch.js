const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const jsx = require('rollup-plugin-jsx')
const uglify = require('rollup-plugin-uglify')

// see below for details on the options
const inputOptions = {
  input: './example/app.js',
  plugins: [
    jsx({ factory: 'h' }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}
const outputOptions = {
  file: './dist/app.js',
  format: 'cjs'
}

const watchOptions = Object.assign({ output: [outputOptions] }, inputOptions);
const watcher = rollup.watch(watchOptions);
watcher.on('event', event => {
  console.log('rollup: ', event)
  // event.code can be one of:
  //   START        — the watcher is (re)starting
  //   BUNDLE_START — building an individual bundle
  //   BUNDLE_END   — finished building a bundle
  //   END          — finished building all bundles
  //   ERROR        — encountered an error while bundling
  //   FATAL        — encountered an unrecoverable error
})