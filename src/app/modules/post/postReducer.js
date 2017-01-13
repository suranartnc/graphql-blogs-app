const initialState = {}

export default function postReducer (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DATA_1':
    case 'FETCH_DATA_2':
      return action.response
    default:
      return state
  }
}
