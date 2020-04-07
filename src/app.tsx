import React from 'react'
import styled from 'styled-components'
import imgSource from './assets/deneme.png'
import imgSource2 from './assets/deneme.jpg'

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`

const App = ({ state }) => {
  return (
    <Wrapper>
      <p>It, work</p>
      <p>{state.text}</p>
      <img src={imgSource} />
      <img src={imgSource2} />
    </Wrapper>
  )
}

export default App
