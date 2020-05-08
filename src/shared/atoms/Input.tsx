import styled from 'styled-components'
import { respondTo } from '@utils'

const StyledInput = styled.input.attrs(props => ({
  ...props,
  type: 'text'
}))`
  width: 100%;
  max-width: 430px;
  font-size: 14px;
  color: #999;
  border: 1px solid #e0e0e0;
  padding: 10px 40px 10px 15px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  ${respondTo.xs`
    background-color: #faf9f9;
	`}
`

export default StyledInput
