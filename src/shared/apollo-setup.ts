import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { RestLink } from 'apollo-link-rest'
import isomorphicFetch from 'isomorphic-fetch'

const isServer = typeof window === 'undefined'

const cache = isServer ? new InMemoryCache() : new InMemoryCache().restore(window.EFT__INITIAL_STATE__)

const restLink = new RestLink({
  endpoints: { github: 'github.com' },
  uri: 'api.com',
  customFetch: isomorphicFetch,
  credentials: 'same-origin'
})

const apolloClient = new ApolloClient({
  ssrMode: isServer,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    restLink
  ]),
  cache
})

export default apolloClient
