/* eslint-plugin-disable @typescript-eslint */

const { isProd, pkg } = require('./config/utils')
process.env.NODE_ENV = isProd ? 'production' : 'development'
process.env.BABEL_ENV = isProd ? 'production' : 'development'

const rollup = require('rollup')
const rimraf = require('rimraf')

const clientBundler = require('./config/rollup.config.browser')
const ssrBundler = require('./config/rollup.config.ssr')
const serverBundler = require('./config/rollup.config.server')

// Generate fragment json
const build = async () => {
  await rimraf.sync('dist')

  const fs = require('fs')
  const fragmentManifest = './dist/public'

  if (!fs.existsSync(fragmentManifest)) {
    await fs.mkdirSync(fragmentManifest, { recursive: true })
  }

  const low = require('lowdb')
  const FileSync = require('lowdb/adapters/FileSync')

  const adapter = new FileSync(`${fragmentManifest}/fragment.json`)
  const db = low(adapter)

  db.set('name', pkg.name).write()
  db.set('version', pkg.version).write()

  // Client side build
  const clientSideBuild = async () => {
    const bundle = await rollup.rollup(clientBundler.rollupInputOptions)
    const bundleOutput = await bundle.generate(clientBundler.rollupOutputOptions)

    for (const chunkOrAsset of bundleOutput.output) {
      if (chunkOrAsset.type === 'asset') {
        // console.log('Asset', chunkOrAsset)
      } else {
        db.set(chunkOrAsset.fileName, chunkOrAsset.code).write()
      }
    }

    await bundle.write(clientBundler.rollupOutputOptions)
  }

  // SSR Build
  const ssrBuild = async () => {
    const bundle = await rollup.rollup(ssrBundler.rollupInputOptions)

    await bundle.write(ssrBundler.rollupOutputOptions)

    const reactDomBodyStreamFile = require.resolve(`./${ssrBundler.rollupOutputOptions.file}`)
    if (reactDomBodyStreamFile) {
      let html

      const ReactDomBodyStream = require(reactDomBodyStreamFile)

      ReactDomBodyStream.on('data', chunk => (html += chunk.toString()))

      ReactDomBodyStream.on('end', () => db.set('html', `<div id="${pkg.name}-root">${html}</div>`).write())
    }
  }

  // Server Build
  const serverBuild = async () => {
    const bundle = await rollup.rollup(serverBundler.rollupInputOptions)
    await bundle.write(serverBundler.rollupOutputOptions)
  }

  await Promise.all([clientSideBuild(), ssrBuild()])
  await serverBuild()
}

const watch = async () => {
  await rimraf.sync('dist')

  const watcher = rollup.watch([clientBundler.watchOptions, ssrBundler.watchOptions, serverBundler.watchOptions])

  try {
    watcher.on('event', event => {
      if (event.code === 'ERROR') {
        console.error(event)
      } else if (event.code === 'BUNDLE_START' || event.code === 'BUNDLE_END') {
        console.info(`${event.code} ${event.input}`)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

isProd ? build() : watch()
