import React, { useReducer } from 'react'

const DECREMENT = 'DECREMENT'
const INCREMENT = 'INCREMENT'

const initialState = { count: 0 }

const counterReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 }
    case DECREMENT:
      return { count: state.count - 1 }
    default:
      return state
  }
}

const Counter = (): React.FC => {
  const [{ count }, dispatch] = useReducer(counterReducer, { ...initialState })

  // Action and Dispatcher
  const decrementAction = (): void => dispatch({ type: DECREMENT })
  const incrementAction = (): void => dispatch({ type: INCREMENT })

  return (
    <>
      Count: {count}
      <button onClick={decrementAction}>-</button>
      <button onClick={incrementAction}>+</button>
    </>
  )
}

export default Counter
