import fs from 'fs'
import path from 'path'
import http from 'http'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import reload from 'reload'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import serialize from 'serialize-javascript'

import pkg from '../../package.json'
import App from '../shared/App'
import routes from '../shared/routes'

const app: Application = express()
const port = process.env.PORT || 81
const isProd = process.env.BUILD === 'production'
const publicPath = path.join(__dirname, 'public')
const server = http.createServer(app)

app.use(cors())
app.use(express.static(publicPath))
const paths = routes.map(({ path }) => path)

let scriptData
if (!scriptData) scriptData = fs.readFileSync(path.join(publicPath, `${pkg.name}.js`), { encoding: 'utf8' })

!isProd &&
  app.get(paths, async (req: Request, res: Response, next) => {
    res.setHeader('Content-Type', 'application/json')

    const fragment = {
      name: pkg.name,
      version: pkg.version,
      html: '',
      script: scriptData
    }

    const activeRoute = routes.find(route => matchPath(req.url, route)) || {}

    const data = (await activeRoute.fetchInitialData) ? activeRoute.fetchInitialData(req.path) : Promise.resolve()

    try {
      const { context } = data

      const sheet = new ServerStyleSheet()
      const markup = sheet.collectStyles(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      )

      const bodyStream = sheet.interleaveWithNodeStream(renderToNodeStream(markup))

      fragment.html += `<script>window.__INITIAL_DATA__ = ${serialize(data)}</script><div id="root">`
      res.write(JSON.stringify(fragment))

      bodyStream.on('data', chunk => {
        fragment.html += chunk.toString()
        res.write(JSON.stringify(fragment))
      })

      bodyStream.on('end', () => {
        fragment.html += `</div>`
        res.write(JSON.stringify(fragment))
        res.end()
      })

      bodyStream.on('error', err => {
        console.error('react render error:', err)
      })
    } catch (error) {
      next(error)
    }
  })

isProd &&
  app.get(paths, async (req: Request, res: Response, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    const activeRoute = routes.find(route => matchPath(req.url, route)) || {}

    const data = (await activeRoute.fetchInitialData) ? activeRoute.fetchInitialData(req.path) : Promise.resolve()

    try {
      const { context } = data

      const sheet = new ServerStyleSheet()
      const markup = sheet.collectStyles(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      )

      const bodyStream = sheet.interleaveWithNodeStream(renderToNodeStream(markup))

      res.write(`<!DOCTYPE html>
      <html>
        <head>
          <title>${pkg.name} v${pkg.version}</title>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>
        <body>
          <div id="root">`)

      bodyStream.on('data', chunk => res.write(chunk))

      bodyStream.on('end', () => {
        res.write(`</div>
          <script src="/reload/reload.js"></script>
          <script type="text/javascript" src="/${pkg.name}.js"></script>
        </body>
      </html>`)
        res.end()
      })

      bodyStream.on('error', err => {
        console.error('react render error:', err)
      })
    } catch (error) {
      next(error)
    }
  })

const runHttpServer = async (): Promise => {
  try {
    await reload(app)
    server.listen(port, () => {
      console.log(`Server is listening on port: ${port}`)
    })
  } catch (err) {
    console.error('Reload could not start, could not start server/sample app', err)
  }
}

runHttpServer()
