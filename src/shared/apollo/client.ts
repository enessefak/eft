import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { RestLink } from 'apollo-link-rest'

// setup your `RestLink` with your endpoint
const restLink = new RestLink({ uri: 'https://swapi.co/api/' })

// setup your client
const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
})
