import { Request, Response } from 'express'
import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'
import { ApolloProvider } from '@apollo/react-common'
import { getDataFromTree } from '@apollo/react-ssr'
import pkg from '@pkg'

import App from '../shared/App'
import apolloClient from '../shared/apollo-setup'

enum FragmentResponseType {
  State = 'state',
  Script = 'script',
  Style = 'style',
  Content = 'content'
}

const writeFragmentResponse = (res: Response, type: FragmentResponseType, content: any): void => {
  res.write(
    JSON.stringify({
      name: pkg.name,
      type,
      content
    })
  )
}

const prodMiddleware = async (req: Request, res: Response, next): any => {
  res.setHeader('Content-Type', 'application/json')

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

    writeFragmentResponse(res, FragmentResponseType.State, initialState)

    writeFragmentResponse(res, FragmentResponseType.Content, `<div id="eft">`)

    bodyStream.on('data', async chunk => writeFragmentResponse(res, FragmentResponseType.Content, chunk.toString()))

    bodyStream.on('end', () => {
      writeFragmentResponse(res, FragmentResponseType.Content, `</div>`)
      writeFragmentResponse(res, FragmentResponseType.Script, `http://localhost:81/${pkg.name}.js`)
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

export default prodMiddleware
