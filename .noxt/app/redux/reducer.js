import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import errorReducer from './modules/error/errorReducer'

import customReducers from 'app/reducers'

export default combineReducers({
  routing: routerReducer,
  error: errorReducer,
  ...customReducers
})
