import { pkg, isProd, commonExternal } from './utils'
import { typescript, replace, visualizer, uglify, commonPlugins } from './plugins'

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

const clientConfig = {
  input,
  output,
  plugins,
  ...options,
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}

export default clientConfig
