import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { COLORS } from '@constants'

const StyledLink = styled(NavLink).attrs({
  activeStyle: {
    color: '#fff',
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY
  }
})`
  text-decoration: none;
  display: inline-block;
  padding: 10px 15px;
  color: #333;
  box-sizing: border-box;
  border: 1px solid transparent;

  &:hover {
    color: ${COLORS.PRIMARY};
    border-bottom-color: ${COLORS.PRIMARY};
  }
`

export default StyledLink
