const isProd = process.env.BUILD === 'production'
process.env.NODE_ENV = isProd ? 'production' : 'development'
process.env.BABEL_ENV = isProd ? 'production' : 'development'

import { eventEmitter } from './config/utils'
import clientConfig from './config/rollup.config.browser'
import ssrConfig from './config/rollup.config.ssr'
import serverConfig from './config/rollup.config.server'

eventEmitter.on('bundle', file => {
  console.log('Tetiklendi...', file)
})

export default [serverConfig, ssrConfig, clientConfig]

// const rollupBundler = hotReload => {
//   const watcher = rollup.watch([clientConfig, appConfig])

//   watcher.on('event', event => {
//     // event.code can be one of:
//     //   START        — the watcher is (re)starting
//     //   BUNDLE_START — building an individual bundle
//     //   BUNDLE_END   — finished building a bundle
//     //   END          — finished building all bundles
//     //   ERROR        — encountered an error while bundling

//     if (event.code === 'ERROR') {
//       console.error(event)
//     } else if (event.code === 'BUNDLE_START' || event.code === 'BUNDLE_END') {
//       console.info(`${event.code}: ${event.input}`)
//     } else if (event.code === 'END') hotReload()
//   })
// }

// const rollupBuild = reactRender => {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const low = require('lowdb')
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const FileSync = require('lowdb/adapters/FileSync')

//   const adapter = new FileSync(`./dist/public/${pkg.name}.json`)
//   const db = low(adapter)

//   db.set('name', pkg.name).write()
//   db.set('version', pkg.version).write()

//   const bodyStream = reactRender()
//   let html
//   bodyStream.on('data', chunk => (html += chunk.toString()))

//   bodyStream.on('end', () => db.set('html', `<div id="${pkg.name}-root">${html}</div>`).write())

//   const build = async () => {
//     const bundle = await rollup.rollup({
//       ...commonOptions,
//       input: 'src/entry.tsx',
//       external: isProd && [...commonExternal, 'react-dom', 'prop-types'],
//       plugins: [
//         resolverPlugin(),
//         typescript(),
//         ...commonPlugins,
//         replace({
//           'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
//         }),
//         isProd && visualizer(),
//         isProd && uglify()
//       ]
//     })

//     const { output } = await bundle.generate(clientConfig.output)

//     for (const chunkOrAsset of output) {
//       if (chunkOrAsset.type === 'asset') {
//         // For assets, this contains
//         // {
//         //   fileName: string,              // the asset file name
//         //   source: string | Uint8Array    // the asset source
//         //   type: 'asset'                  // signifies that this is an asset
//         // }
//         // console.log('Asset', chunkOrAsset)
//       } else {
//         // For chunks, this contains
//         // {
//         //   code: string,                  // the generated JS code
//         //   dynamicImports: string[],      // external modules imported dynamically by the chunk
//         //   exports: string[],             // exported variable names
//         //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
//         //   fileName: string,              // the chunk file name
//         //   imports: string[],             // external modules imported statically by the chunk
//         //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
//         //   isEntry: boolean,              // is this chunk a static entry point
//         //   map: string | null,            // sourcemaps if present
//         //   modules: {                     // information about the modules in this chunk
//         //     [id: string]: {
//         //       renderedExports: string[]; // exported variable names that were included
//         //       removedExports: string[];  // exported variable names that were removed
//         //       renderedLength: number;    // the length of the remaining code in this module
//         //       originalLength: number;    // the original length of the code in this module
//         //     };
//         //   },
//         //   name: string                   // the name of this chunk as used in naming patterns
//         //   type: 'chunk',                 // signifies that this is a chunk
//         // }
//         db.set(chunkOrAsset.fileName, chunkOrAsset.code).write()
//       }
//     }
//   }

//   build()
// }

// const runServer = () => ({
//   name: 'server-run',
//   writeBundle: ({ file }) => {
//     const bundleServerPath = require.resolve(`./${file}`)
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const { run, build } = require(bundleServerPath)
//     if (!isProd) run(rollupBundler)
//     else build(rollupBuild)
//   }
// })
