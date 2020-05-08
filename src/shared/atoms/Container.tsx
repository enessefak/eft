import styled from 'styled-components'

const StyledContainer = styled.div.attrs(props => ({
  ...props
}))`
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1080px;
  width: 100%;
`

export default StyledContainer
