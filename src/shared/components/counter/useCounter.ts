import { useReducer } from 'react'

const DECREMENT = 'DECREMENT'
const INCREMENT = 'INCREMENT'

interface Icounter {
  count: number
}

interface IcounterViewModel {
  decrementAction: () => void
  incrementAction: () => void
  state: Icounter
}

interface Idecrement {
  type: typeof DECREMENT
}

interface Iincrement {
  type: typeof INCREMENT
}

// Initial State
const initialState: Icounter = { count: 0 }

// Action Creator
const decrementActionCreator = (): Idecrement => ({
  type: DECREMENT
})

const incrementActionCreator = (): Iincrement => ({
  type: INCREMENT
})

// Reducer
const reducer = (state: Icounter, action): Icounter => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 }
    case DECREMENT:
      return { count: state.count - 1 }
    default:
      return state
  }
}

const useCounter = (props: Icounter): IcounterViewModel => {
  const [{ count }, dispatch] = useReducer(reducer, { ...initialState, ...props })

  // Action and Dispatcher
  const decrementAction = (): void => dispatch(decrementActionCreator())
  const incrementAction = (): void => dispatch(incrementActionCreator())

  return {
    decrementAction,
    incrementAction,
    count
  }
}

export default useCounter
