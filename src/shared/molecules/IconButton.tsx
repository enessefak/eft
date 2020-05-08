import React from 'react'
import styled from 'styled-components'

import { Button, Icon } from '@atoms'
import { respondTo } from '@utils'
import { ICON_NAME } from '@constants'

interface IconButtonProps {
  iconName: ICON_NAME
}

const StyledText = styled.span`
  display: none;

  ${respondTo.xxs`
    display: inline-block;
    margin-top: 5px;
  `}
`

const IconButton: React.SFC<IconButtonProps> = ({ children, iconName, ...otherProps }) => (
  <Button {...otherProps}>
    <Icon name={iconName} />
    <StyledText>{children}</StyledText>
  </Button>
)

export default IconButton
