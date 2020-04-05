import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`

const App = ({ state }) => {
  return (
    <Wrapper>
      <p>It, work</p>
      <p>{state.text}</p>
    </Wrapper>
  )
}

export default App
