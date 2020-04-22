import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Counter from './components/counter/counterView'

const APP_BAR_COLOR_SETTING_QUERY = gql`
  query appBarColorSetting {
    appBarColorSetting @client {
      id @client
      name @client
      setting @client
    }
  }
`

const Home = () => {
  const { loading, data } = useQuery(APP_BAR_COLOR_SETTING_QUERY)

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
