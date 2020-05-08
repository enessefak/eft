import styled, { css } from 'styled-components'

const StyledButtonGroup = styled.div.attrs(props => ({
  ...props
}))`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: none;

  ${props =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `}
`

export default StyledButtonGroup
