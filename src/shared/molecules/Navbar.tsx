import React from 'react'
import styled from 'styled-components'

import { Link, Container } from '@atoms'

const StyledNavbar = styled.div`
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
`

const StyledLink = styled(Link)`
  padding: 0;
`

const StyledListItem = styled.li``

const StyledList = styled.ul`
  list-style: none;

  ${props =>
    !props.sublist &&
    `
    position: relative;
    display: flex;

    > ${StyledListItem}:hover {
      > ${StyledList} {
        display: flex;
      }
    }
  `}

  ${props =>
    props.sublist &&
    `
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 350px;
    display: none;
    align-items: flex-start;
    background-color: #fff;
    border: solid 1px #ebebeb;
    z-index: 900;
  `}
`

const StyledListBox = styled.ul`
  list-style: none;
`

const StyledNav = styled.nav``

const categories = [
  {
    path: '/kadin',
    text: 'Kadın',
    subCategories: [
      {
        path: '/giyim',
        text: 'Giyim',
        subCategories: [
          {
            path: '/elbise',
            text: 'Elbise'
          },
          {
            path: '/t-shirt',
            text: 'T-Shirt'
          }
        ]
      },
      {
        path: '/giyim2',
        text: 'Giyim2',
        subCategories: [
          {
            path: '/elbise2',
            text: 'Elbise'
          },
          {
            path: '/t-shirt2',
            text: 'T-Shirt2'
          }
        ]
      }
    ]
  },
  {
    path: '/erkek',
    text: 'Erkek',
    subCategories: [
      {
        path: '/giyim',
        text: 'Giyim',
        subCategories: [
          {
            path: '/elbise',
            text: 'Elbise'
          },
          {
            path: '/t-shirt',
            text: 'T-Shirt'
          }
        ]
      }
    ]
  }
]

const ListBox = ({ categories }) => (
  <StyledListBox sublist>
    {categories.map(({ path, text, subCategories }) => (
      <StyledListItem key={path}>
        <StyledLink key={path} to={path}>
          {text}
        </StyledLink>

        {subCategories && subCategories.length > 0 && <ListBox sublist categories={subCategories} />}
      </StyledListItem>
    ))}
  </StyledListBox>
)

const CategoryNavbar: React.SFC = ({ categories, sublist = false }) => (
  <StyledList sublist={sublist}>
    {categories.map(({ path, text, subCategories }) => (
      <StyledListItem key={path}>
        {React.createElement(sublist ? StyledLink : Link, { key: path, to: path }, text)}

        {subCategories &&
          subCategories.length > 0 &&
          React.createElement(
            sublist ? ListBox : CategoryNavbar,
            { sublist: !sublist, categories: subCategories },
            null
          )}
      </StyledListItem>
    ))}
  </StyledList>
)

const Navbar: React.SFC = () => (
  <StyledNavbar>
    <Container>
      <StyledNav>
        <CategoryNavbar categories={categories} />
      </StyledNav>
    </Container>
  </StyledNavbar>
)

export default Navbar
