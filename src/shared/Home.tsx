import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Counter from './components/counter/counterView'

const COUNTER_QUERY = gql`
  query counter {
    counter @client {
      count @client
    }
  }
`

const Home = () => {
  const { loading, data } = useQuery(COUNTER_QUERY)

  if (loading) return <h2>Loading...</h2>

  console.log(data)

  return (
    <>
      <div>Select a Language</div>
      <Counter count={10} />
    </>
  )
}

export default Home
