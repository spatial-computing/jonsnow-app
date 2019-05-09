import AppNavigation from '../Navigation/AppNavigation'

//replace createNavigationReducer reducer

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)

  // Simply return the original `state` if `nextState` is null or undefined.
  return newState || state
}
