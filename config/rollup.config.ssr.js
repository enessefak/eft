import { commonExternal, isProd } from './utils'
import { typescript, commonPlugins } from './plugins'

const plugins = [
  typescript({
    check: isProd,
    tsconfigOverride: { module: 'commonjs', jsx: 'react' }
  }),
  ...commonPlugins
]

const input = 'src/app.tsx'

const output = { name: 'ssr', file: 'dist/app.js', format: 'cjs', compact: true }

const external = [...commonExternal]

const options = {
  cache: true,
  treeshake: false,
  external
}

const ssrConfig = {
  input,
  output,
  plugins,
  ...options,
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}

export default ssrConfig
