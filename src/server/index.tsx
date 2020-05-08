import express, { Application } from 'express'
import path from 'path'
import cors from 'cors'
import http from 'http'
import reload from 'reload'
import compression from 'compression'

import { isProd } from './utils'
import devMiddleware from './devMiddleware'
import prodMiddleware from './prodMiddleware'

const app: Application = express()

const PORT = process.env.PORT || 81

const buildPath = path.join(__dirname, '../../public')
const publicPath = path.join(__dirname, '../../../public')
const modulesPath = path.join(__dirname, '../node_modules')

app.use(cors('*'))

isProd && app.use(compression())

app.use(express.static(buildPath))
app.use(express.static(publicPath))
app.use('/assets', [express.static(modulesPath + '/node_modules/jquery/dist/')])

app.use(isProd ? prodMiddleware : devMiddleware)

// Error handling
app.use(function (err, req, res) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const httpServer = http.createServer(app)

const runServer = (): void =>
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
  })

const runDevelopmentServer = async (): Promise => {
  try {
    await reload(app)
    runServer()
  } catch (err) {
    console.error('Reload could not start, could not start server/sample app', err)
  }
}

isProd ? runServer() : runDevelopmentServer()
