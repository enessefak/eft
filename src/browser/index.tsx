import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-common'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import App from '../shared/App'

const counter = {
  count: 0
}

const cache = new InMemoryCache({
  freezeResults: true
})

const typeDefs = gql`
  type Counter {
    count: Number
  }
  type Query {
    counter: Counter
  }
  type Mutation {
    incrementAction(count: Number!): Counter!
    decrementAction(count: Number!): Counter!
  }
`

cache.writeData({
  data: counter
})

const resolvers = {
  Query: {
    counter: () => counter
  },
  Mutation: {
    incrementAction: (_, { count }) => {
      return count + 1
    },
    decrementAction: (_, { count }) => {
      return count - 1
    }
  }
}

const client = new ApolloClient({
  cache,
  typeDefs,
  resolvers,
  assumeImmutableResults: true
})

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
