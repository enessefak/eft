/* eslint-plugin-disable @typescript-eslint */

const { commonExternal, isProd } = require('./utils')
const { typescript, commonPlugins } = require('./plugins')

const plugins = [
  typescript({
    check: isProd,
    tsconfigOverride: { module: 'commonjs', jsx: 'react' }
  }),
  ...commonPlugins
]

const input = 'src/entry.ssr.tsx'

const output = { name: 'ssr', file: 'dist/app.js', format: 'cjs', compact: true, sourcemap: !isProd }

const external = [...commonExternal, 'react-dom/server']

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
    include: 'src/**',
    skipWrite: false
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
