import React from 'react'
import styled from 'styled-components'

const StyledLogo = styled.h1.attrs(props => ({
  className: 'logo',
  ...props
}))`
  grid-area: logo;
  font-size: 30px;
`

const Logo: React.SFC = (...otherProps) => <StyledLogo {...otherProps}>Logo</StyledLogo>

export default Logo
