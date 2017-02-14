const initialState = false

export default function errorReducer (state = initialState, action) {
  const { type, error } = action

  if (type === 'RESET_ERROR') {
    return initialState
  } else if (error) {
    return action.error
  }

  return state
}
