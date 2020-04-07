import path from 'path'
import http from 'http'
import compression from 'compression'
import express from 'express'
import reload from 'reload'
import reactDom from 'react-dom/server'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import pkg from '../package.json'

const app = express()
const port = process.env.PORT || 81
let isRunningServer = false

const GLOBAL_STATE = {
  text: 'Deneme'
}

const layout = {
  head: `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pkg.name} Fragment</title>
    <script>var GLOBAL_STATE = ${JSON.stringify(GLOBAL_STATE)}</script>
</head>

<body>
    <div id="root">`,
  foot: `</div>
  <script src="${pkg.name}.js"></script>
  <script src="/reload/reload.js"></script> 
</body>

</html>
`
}

const renderReact = () => {
  delete require.cache[require.resolve('./app')]
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Application = require('./app')

  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(<Application state={GLOBAL_STATE} />)
  const bodyStream = sheet.interleaveWithNodeStream(reactDom.renderToNodeStream(jsx))

  return bodyStream
}

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(compression())

app.get('/json', (req, res) => {
  res.json({
    html: '<div />',
    scripts: `<script>console.log('deneme')</script>`
  })
})

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Transfer-Encoding', 'chunked')

  res.write(layout.head)

  const bodyStream = renderReact()

  bodyStream.on('data', chunk => res.write(chunk))

  bodyStream.on('error', err => {
    console.error('react render error:', err)
  })

  bodyStream.on('end', () => {
    res.write(layout.foot)
    res.end()
  })
})

const httpServer = http.createServer(app)

export const run = async bundler => {
  try {
    if (!isRunningServer) {
      isRunningServer = true
      const reloadedServer = await reload(app)

      bundler(reloadedServer.reload)

      httpServer.listen(port, function () {
        console.info(`Web server listening on port ${port}`)
      })
    }
  } catch (err) {
    console.error(`Reload could not start, could not start server/sample app ${pkg.name}`, err)
  }
}

export const build = async bundler => {
  bundler(renderReact)
}
