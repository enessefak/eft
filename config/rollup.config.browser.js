/* eslint-plugin-disable @typescript-eslint */

const { pkg, isProd, commonExternal, builtinModules, extensions } = require('./utils')
const { typescript, replace, visualizer, uglify, commonPlugins, resolve } = require('./plugins')

const plugins = [
  resolve({
    extensions,
    preferBuiltins: true,
    browser: true
  }),
  typescript({ check: false }), // TODO (enes sefa) isProd
  ...commonPlugins,
  replace({
    'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
  }),
  isProd && visualizer(),
  isProd && uglify()
]

const input = 'src/browser/index.tsx'

const output = {
  name: 'client',
  entryFileNames: `${pkg.name}.js`,
  dir: 'dist/public',
  format: 'iife',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
    'styled-components': 'styled',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'isomorphic-fetch': 'fetch'
  }
}

const external = isProd ? [...commonExternal, 'react-dom'] : [...builtinModules]

const options = {
  cache: true,
  treeshake: false,
  external,
  onwarn(warning, warn) {
    // skip certain warnings
    if (warning.code === 'UNRESOLVED_IMPORT' || warning.code === 'EVAL') return

    // Use default for everything else
    warn(warning)
  }
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
