import { commonExternal, isProd } from './utils'
import { typescript, commonPlugins } from './plugins'

const plugins = [
  typescript({
    check: isProd,
    tsconfigOverride: { module: 'commonjs', jsx: 'react' }
  }),
  ...commonPlugins
]

const input = 'src/server.tsx'

const output = { name: 'server', file: 'dist/server.js', format: 'cjs', compact: true }

const external = [...commonExternal, 'react-dom/server', 'express', 'path', 'http', 'reload', 'compression', './app']

const options = {
  cache: true,
  treeshake: false,
  external
}

const serverConfig = {
  input,
  output,
  plugins,
  ...options,
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}

export default serverConfig
