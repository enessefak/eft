import React, { useState } from 'react'

const Counter = (): React.FC => {
  const [count, setCount] = useState(0)

  const decrementAction = (): void => setCount(currentCount => (currentCount -= 1))
  const incrementAction = (): void => setCount(currentCount => (currentCount += 1))

  return (
    <>
      Count: {count}
      <button onClick={decrementAction}>-</button>
      <button onClick={incrementAction}>+</button>
    </>
  )
}

export default Counter
