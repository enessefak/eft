import { DEFAULT_EXTENSIONS } from '@babel/core'
import path from 'path'
import fs from 'fs'
import rollup from 'rollup'
import replace from '@rollup/plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import visualizer from 'rollup-plugin-visualizer'
import filesize from 'rollup-plugin-filesize'
import progress from 'rollup-plugin-progress'
import json from '@rollup/plugin-json'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

const resolverPlugin = () => ({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  resolveId(source, importer) {
    if (/\.(gif|jpe?g|tiff|png|svg|webp|bmp)$/i.test(source)) {
      return path.resolve(path.dirname(importer), source)
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load(id) {
    if (/\.(gif|jpe?g|tiff|png|svg|webp|bmp)$/i.test(id)) {
      const referenceId = this.emitFile({
        type: 'asset',
        name: path.basename(id),
        source: fs.readFileSync(id)
      })
      return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`
    }
  }
})

const isProd = process.env.BUILD === 'production'
process.env.NODE_ENV = isProd ? 'production' : 'development'
process.env.BABEL_ENV = isProd ? 'production' : 'development'

const reactNamedExports = [
  'Children',
  'Component',
  'Fragment',
  'Profiler',
  'PureComponent',
  'StrictMode',
  'Suspense',
  '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
  'cloneElement',
  'createContext',
  'createElement',
  'createFactory',
  'createRef',
  'forwardRef',
  'isValidElement',
  'lazy',
  'memo',
  'useCallback',
  'useContext',
  'useDebugValue',
  'useEffect',
  'useImperativeHandle',
  'useLayoutEffect',
  'useMemo',
  'useReducer',
  'useRef',
  'useState',
  'version'
]

const reactDOMNamedExports = [
  '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
  'createPortal',
  'findDOMNode',
  'flushSync',
  'hydrate',
  'render',
  'unmountComponentAtNode',
  'unstable_batchedUpdates',
  'unstable_createPortal',
  'unstable_renderSubtreeIntoContainer',
  'version'
]

const reactIsNamedExports = [
  'AsyncMode',
  'ConcurrentMode',
  'ContextConsumer',
  'ContextProvider',
  'Element',
  'ForwardRef',
  'Fragment',
  'Lazy',
  'Memo',
  'Portal',
  'Profiler',
  'StrictMode',
  'Suspense',
  'isAsyncMode',
  'isConcurrentMode',
  'isContextConsumer',
  'isContextProvider',
  'isElement',
  'isForwardRef',
  'isFragment',
  'isLazy',
  'isMemo',
  'isPortal',
  'isProfiler',
  'isStrictMode',
  'isSuspense',
  'isValidElementType',
  'typeOf'
]

const extensions = [...DEFAULT_EXTENSIONS, '.jsx', '.ts', '.tsx', '.png']

const commonExternal = ['react', 'react-is', 'styled-components']

const commonPlugins = [
  commonjs({
    include: 'node_modules/**',
    exclude: ['node_modules/process-es6/**'],
    extensions,
    namedExports: {
      react: reactNamedExports,
      'react-dom': reactDOMNamedExports,
      'react-is': reactIsNamedExports
    }
  }),
  resolve({
    extensions,
    preferBuiltins: true
  }),
  babel({
    extensions,
    exclude: 'node_modules/**'
  }),
  json({
    compact: true,
    namedExports: false
  }),
  isProd &&
    progress({
      clearLine: false
    }),
  isProd && filesize()
]

const commonOptions = {
  cache: true,
  treeshake: false
}

// Browser Rendering frontend application file bundle
const clientConfig = {
  ...commonOptions,
  input: 'src/entry.tsx',
  external: isProd && [...commonExternal, 'react-dom', 'prop-types'],
  output: {
    name: pkg.name,
    entryFileNames: `${pkg.name}.js`,
    dir: 'dist/public',
    format: 'iife',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'styled-components': 'styled'
    }
  },
  plugins: [
    typescript({ check: isProd }),
    ...commonPlugins,
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
    }),
    isProd && visualizer(),
    isProd && uglify()
  ],
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}

// SSR Rendering frontend application file bundle
const appConfig = {
  input: 'src/app.tsx',
  ...commonOptions,
  external: [...commonExternal],
  output: { file: 'dist/app.js', format: 'cjs', compact: true },
  plugins: [typescript({ check: isProd, tsconfigOverride: { module: 'commonjs', jsx: 'react' } }), ...commonPlugins],
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}

const rollupBundler = hotReload => {
  const watcher = rollup.watch([clientConfig, appConfig])

  watcher.on('event', event => {
    console.log(event)
    // event.code can be one of:
    //   START        — the watcher is (re)starting
    //   BUNDLE_START — building an individual bundle
    //   BUNDLE_END   — finished building a bundle
    //   END          — finished building all bundles
    //   ERROR        — encountered an error while bundling

    if (event.code === 'ERROR') {
      console.error(event)
    } else if (event.code === 'BUNDLE_START' || event.code === 'BUNDLE_END') {
      console.info(`${event.code}: ${event.input}`)
    } else if (event.code === 'END') hotReload()
  })
}

const rollupBuild = reactRender => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const low = require('lowdb')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const FileSync = require('lowdb/adapters/FileSync')

  const adapter = new FileSync(`./dist/public/${pkg.name}.json`)
  const db = low(adapter)

  db.set('name', pkg.name).write()
  db.set('version', pkg.version).write()

  const bodyStream = reactRender()
  let html
  bodyStream.on('data', chunk => (html += chunk.toString()))

  bodyStream.on('end', () => db.set('html', `<div id="${pkg.name}-root">${html}</div>`).write())

  const build = async () => {
    const bundle = await rollup.rollup({
      ...commonOptions,
      input: 'src/entry.tsx',
      external: isProd && [...commonExternal, 'react-dom', 'prop-types'],
      plugins: [
        resolverPlugin(),
        typescript(),
        ...commonPlugins,
        replace({
          'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
        }),
        isProd && visualizer(),
        isProd && uglify()
      ]
    })

    const { output } = await bundle.generate(clientConfig.output)

    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === 'asset') {
        // For assets, this contains
        // {
        //   fileName: string,              // the asset file name
        //   source: string | Uint8Array    // the asset source
        //   type: 'asset'                  // signifies that this is an asset
        // }
        // console.log('Asset', chunkOrAsset)
      } else {
        // For chunks, this contains
        // {
        //   code: string,                  // the generated JS code
        //   dynamicImports: string[],      // external modules imported dynamically by the chunk
        //   exports: string[],             // exported variable names
        //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
        //   fileName: string,              // the chunk file name
        //   imports: string[],             // external modules imported statically by the chunk
        //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
        //   isEntry: boolean,              // is this chunk a static entry point
        //   map: string | null,            // sourcemaps if present
        //   modules: {                     // information about the modules in this chunk
        //     [id: string]: {
        //       renderedExports: string[]; // exported variable names that were included
        //       removedExports: string[];  // exported variable names that were removed
        //       renderedLength: number;    // the length of the remaining code in this module
        //       originalLength: number;    // the original length of the code in this module
        //     };
        //   },
        //   name: string                   // the name of this chunk as used in naming patterns
        //   type: 'chunk',                 // signifies that this is a chunk
        // }
        db.set(chunkOrAsset.fileName, chunkOrAsset.code).write()
      }
    }
  }

  build()
}

const runServer = () => ({
  name: 'server-run',
  writeBundle: ({ file }) => {
    const bundleServerPath = require.resolve(`./${file}`)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { run, build } = require(bundleServerPath)
    if (!isProd) run(rollupBundler)
    else build(rollupBuild)
  }
})

// Express app es6 typescript syntax
const serverConfig = {
  ...commonOptions,
  input: 'src/server.tsx',
  external: [...commonExternal, 'react-dom/server', 'express', 'path', 'http', 'reload', 'compression', './app'],
  output: { file: 'dist/server.js', format: 'cjs', compact: true, plugins: [runServer()] },
  plugins: [
    typescript({
      check: isProd,
      tsconfigOverride: { module: 'commonjs', jsx: 'react' }
    }),
    ...commonPlugins
  ],
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}

export default serverConfig
