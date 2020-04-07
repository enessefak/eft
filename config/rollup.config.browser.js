/* eslint-plugin-disable @typescript-eslint */

const { pkg, isProd, commonExternal } = require('./utils')
const { typescript, replace, visualizer, uglify, commonPlugins } = require('./plugins')

const plugins = [
  typescript({ check: isProd }),
  ...commonPlugins,
  replace({
    'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
  }),
  isProd && visualizer(),
  isProd && uglify()
]

const input = 'src/entry.tsx'

const output = {
  name: 'client',
  entryFileNames: `${pkg.name}.js`,
  dir: 'dist/public',
  format: 'iife',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
    'styled-components': 'styled'
  }
}

const external = isProd && [...commonExternal, 'react-dom', 'prop-types']

const options = {
  cache: true,
  treeshake: false,
  external
}

const watchOptions = {
  input,
  output,
  plugins,
  ...options,
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}

const rollupInputOptions = {
  input,
  ...options,
  plugins
}

const rollupOutputOptions = output

module.exports = {
  watchOptions,
  rollupInputOptions,
  rollupOutputOptions
}
