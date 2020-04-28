import React from 'react'
import useCounter from './useCounter'

const Counter = (props): React.FC => {
  const { decrementAction, incrementAction, count } = useCounter(props)

  return (
    <>
      Count: {count}
      <button onClick={decrementAction}>-</button>
      <button onClick={incrementAction}>+</button>
    </>
  )
}

export default Counter
