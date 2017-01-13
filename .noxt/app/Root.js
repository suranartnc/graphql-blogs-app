import React from 'react'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'
import { syncHistoryWithStore } from 'react-router-redux'

import { Provider } from 'react-redux'
import getRoutes from 'noxt/app/routes'
import createStore from 'noxt/app/redux/createStore'

const initialState = window.__INITIAL_STATE__
const store = createStore(initialState);
const routes = getRoutes(store)
const history = syncHistoryWithStore(browserHistory, store);

const Root = () => (
  <Provider store={store} key="provider">
    <Router
      history={history}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
    />
  </Provider>
)

export default Root
