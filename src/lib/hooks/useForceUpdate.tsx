import { useState, useCallback } from 'react'

/**
 * A hook that forces a re-render when called.
 */
const useForceUpdate = () => {
  const [, setTick] = useState(0)

  // This function will update the state, triggering a re-render.
  const forceUpdate = useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])

  return forceUpdate
}

export default useForceUpdate
