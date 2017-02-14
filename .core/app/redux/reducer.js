import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import errorReducer from './modules/error/errorReducer'

import customReducers from 'app/reducers'

export default client => combineReducers({
  routing: routerReducer,
  apollo: client.reducer(),
  error: errorReducer,
  ...customReducers
})
