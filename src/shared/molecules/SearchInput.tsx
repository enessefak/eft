import React from 'react'
import styled from 'styled-components'

import { Input, Button, Icon } from '@atoms'
import { ICON_NAME, COLORS } from '@constants'

const StyledSearch = styled.div.attrs(props => ({
  ...props
}))`
  grid-area: search;
  position: relative;
  width: 100%;
  max-width: 430px;
`

const StyledSearchInput = styled(Input).attrs(props => ({
  ...props
}))`
  border-radius: 21px;
`

const StyledSearchButton = styled(Button).attrs(props => ({
  ...props
}))`
  position: absolute;
  right: 5px;
  top: 0;
  height: 100%;
  padding: 10px;
`

const SearchInput: React.SFC = (...otherProps) => {
  return (
    <StyledSearch {...otherProps}>
      <StyledSearchInput placeholder="Aradığınız ürün, kategori veya markayı yazınız" />
      <StyledSearchButton transparent>
        <Icon name={ICON_NAME.SEARCH} size={20} color={COLORS.PRIMARY} />
      </StyledSearchButton>
    </StyledSearch>
  )
}

export default SearchInput
