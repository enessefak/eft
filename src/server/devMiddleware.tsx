import { Request, Response } from 'express'
import React from 'react'
import { renderToNodeStream, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import { ApolloProvider } from '@apollo/react-common'
import { getDataFromTree } from '@apollo/react-ssr'

import App from '../shared/App'
import NotFound from '@pages/NotFound'
import apolloClient from '../shared/apollo-setup'
import * as layout from './layout'

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

const appMiddleware = async (req: Request, res: Response, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  const sheet = new ServerStyleSheet()
  const Markup = (
    <ApolloProvider client={apolloClient}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  )

  // Apollo initial state
  await getDataFromTree(Markup)
  const initialState = apolloClient.extract()

  try {
    const styledMarkup = sheet.collectStyles(Markup)
    const bodyStream = sheet.interleaveWithNodeStream(renderToNodeStream(styledMarkup))

    res.write(layout.top({ state: initialState }))

    bodyStream.on('data', async chunk => res.write(chunk))

    bodyStream.on('end', () => {
      res.write(layout.bottom())
      res.end()
    })

    bodyStream.on('error', err => {
      console.error('react render error:', err)
    })
  } catch (error) {
    console.log('error', error)
    next(error)
  }
}

// // Not found
// router.use((req: Request, res: Response) => {
//   const sheet = new ServerStyleSheet()

//   try {
//     const html = renderToStaticMarkup(sheet.collectStyles(<NotFound />))
//     const styleTags = sheet.getStyleTags()

//     res.status(404).send(layout.staticLayout({ styleTags, content: html }))
//   } catch (error) {
//     console.error(error)
//   } finally {
//     sheet.seal()
//   }
// })

export default appMiddleware
