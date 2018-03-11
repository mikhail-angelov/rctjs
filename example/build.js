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
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
  console.log('done!');
}

build();
