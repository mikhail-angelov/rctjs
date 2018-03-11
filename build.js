const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

const inputOptions = {
  input: 'src/index.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
const outputOptions = {
  file: 'dist/rctjs.js',
  format: 'cjs'
};

async function build() {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
  console.log('done!');
}

build();