import React from 'react'
import styled from 'styled-components'

import iconsDefinitions from '@assets/icons.json'
import { ICON_NAME } from '@constants'

interface IconPropTypes {
  name: ICON_NAME
  size: number
  color: string
}

const getPath = (iconName: string): string => {
  const icon = iconsDefinitions.icons.find(icon => icon.tags.includes(iconName))

  if (icon) return icon.paths.join(' ')

  console.warn(`icon ${iconName} does not exist.`)
  return ''
}

const StyledIcon = styled.svg`
  display: inline-block;
  vertical-align: middle;

  path {
    fill: ${({ color }: { color: string }): string => color};
  }
`

const Icon: React.FC<IconPropTypes> = ({ name, size, color }) => (
  <StyledIcon width={`${size}px`} height={`${size}px`} color={color} viewBox="0 0 1024 1024">
    <path d={getPath(name)}></path>
  </StyledIcon>
)

Icon.defaultProps = {
  size: 20,
  color: '#000'
}

export default Icon
