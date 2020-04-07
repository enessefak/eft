import path from 'path'
import fs from 'fs'
import { isProd, extensions, reactNamedExports, reactDOMNamedExports, reactIsNamedExports, eventEmitter } from './utils'

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

const bundleEvent = () => ({
  name: 'bundle-event',
  writeBundle: options => {
    // const bundleServerPath = require.resolve(`./${file}`)
    // // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const { run, build } = require(bundleServerPath)
    // if (!isProd) run(rollupBundler)
    // else build(rollupBuild)
    eventEmitter.emit('bundle', options.name)
  }
})

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
  resolverPlugin(),
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
  isProd && filesize(),
  bundleEvent()
]

export {
  replace,
  typescript,
  babel,
  commonjs,
  resolve,
  visualizer,
  filesize,
  progress,
  json,
  uglify,
  resolverPlugin,
  commonPlugins
}
