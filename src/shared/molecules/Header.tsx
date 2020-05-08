import React from 'react'
import styled from 'styled-components'

import { Container, Logo, ButtonGroup } from '@atoms'
import { respondTo } from '@utils'
import { ICON_NAME, FLEX_DIRECTION } from '@constants'
import { HeaderProps } from '@types'

import SearchInput from './SearchInput'
import IconButton from './IconButton'

const StyledButtonGroup = styled(ButtonGroup)`
  grid-area: user;
  justify-content: flex-end;
`

const StyledSearchInput = styled(SearchInput)`
  justify-self: center;
`

const StyledHeader = styled.div`
  padding: 10px 0px;
  background-color: #faf9f9;

  ${respondTo.xs`
    background-color: #fff;
	`}
`

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'logo user' 'search search';
  align-items: center;
  grid-gap: 5px;

  ${respondTo.sm`
    grid-template-columns: auto auto auto;
    grid-template-areas: 'logo search user';
	`}

  ${respondTo.md`
    grid-template-columns: 1fr 2fr 1fr;
	`}
`

const Header: SFC<HeaderProps> = () => (
  <StyledHeader>
    <StyledContainer>
      <Logo className="logo" />
      <StyledSearchInput />
      <StyledButtonGroup>
        <IconButton direction={FLEX_DIRECTION.COLUMN} iconName={ICON_NAME.USER} transparent>
          Giriş yap
        </IconButton>
        <IconButton direction={FLEX_DIRECTION.COLUMN} iconName={ICON_NAME.HEART} transparent>
          Favorilerim
        </IconButton>
        <IconButton direction={FLEX_DIRECTION.COLUMN} iconName={ICON_NAME.BASKET} transparent>
          Sepetim
        </IconButton>
      </StyledButtonGroup>
    </StyledContainer>
  </StyledHeader>
)

export default Header
