import path from 'path'
import express from 'express'
import reactDom from 'react-dom/server'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'
import pkg from '../package.json'

const app = express()
const port = 81

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
</body>

</html>
`
}

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Transfer-Encoding', 'chunked')

  delete require.cache[require.resolve('./app')]
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Application = require('./app')

  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(<Application state={GLOBAL_STATE} />)
  const bodyStream = sheet.interleaveWithNodeStream(reactDom.renderToNodeStream(jsx))

  res.write(layout.head)

  bodyStream.on('data', chunk => res.write(chunk))

  bodyStream.on('error', err => {
    console.error('react render error:', err)
  })

  bodyStream.on('end', () => {
    res.write(layout.foot)
    res.end()
  })
})

app.listen(port, () => console.log(`${pkg.name} app listening on port ${port}!`))
