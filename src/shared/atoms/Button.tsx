import styled, { css } from 'styled-components'

const transparentButton = css`
  background: transparent;
`

const StyledButton = styled.button.attrs(props => ({
  ...props
}))`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  padding: 12px 10px;

  ${props => props.transparent && transparentButton}
  ${props =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `}

  &:focus {
    outline: none;
  }

  &:hover {
    ${props => `cursor: ${props.disabled ? 'not-allowed' : 'pointer'}`}
  }
`

export default StyledButton
